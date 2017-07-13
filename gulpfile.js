require('es6-promise').polyfill();

/**
 * Project variables
 */
var project = 'wpenv';
var url = 'http://localhost/wp_environment/'; //'wpenv.dev';

/**
 * Load plugins
 */
var gulp = require('gulp');
var environments = require('gulp-environments');
var development = environments.development;
var production = environments.production;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var notify = require('gulp-notify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var scsslint = require('gulp-scss-lint');
var phpcs = require('gulp-phpcs');

/**
 * Error checking
 *
 */
var onError = function (err) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
};

/**
 * Styles
 */
gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
        .pipe(scsslint())
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass(
            {
                errLogToConsole: true,
                //outputStyle: 'compressed',
                outputStyle: 'compact',
                // outputStyle: 'nested',
                // outputStyle: 'expanded',
                precision: 10
            }
        ))
        .pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(development(sourcemaps.write('./maps')))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./')) // Output RTL stylesheets (rtl.css)
        .pipe(production(rename({suffix: '.min'})))
        .pipe(production(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        })))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify({message: 'Styles task complete', onLast: true}));
});

/**
 * PHP Code Sniffer
 */
gulp.task('phpcs', function () {
    return gulp.src(['inc/**/*.php', '!src/vendor/**/*.*'])
    // Validate files using PHP Code Sniffer
        .pipe(phpcs({
            bin: '',
            standard: 'PSR2',
            warningSeverity: 0
        }))
        // Log all problems that was found
        .pipe(phpcs.reporter('log'));
});

/**
 * Gulp watch
 */
gulp.task('watch', function () {
    browserSync.init({
        files: ['./**/*.php'],
        proxy: url,
        injectChanges: true
    });

    gulp.watch('./sass/**/*.scss', ['sass', reload]);
    gulp.watch('./js/*.js', ['js', reload]);
});

/**
 * Gulp default task
 */
gulp.task('default', ['sass', 'js', 'images', 'phpcs', 'watch']);

/**
 * JS
 *
 * Concatenating many JavaScript files into a single file.
 * Checking code errors with JSHint.
 * Minifying code to get a much smaller file size.
 */
gulp.task('js', function () {
    return gulp.src(['./js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./'))
        .pipe(production(rename({suffix: '.min'})))
        .pipe(production(uglify()))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify({message: 'Scripts task complete', onLast: true}));
});

/**
 * Images : optimize images
 *
 * /images/src: Source folder contains the original images.
 * /images/dest: Destination folder contains the optimized images.
 */
gulp.task('images', function () {
    return gulp.src('./images/src/*')
        .pipe(plumber({errorHandler: onError}))
        .pipe(imagemin({optimizationLevel: 7, progressive: true}))
        .pipe(gulp.dest('./images/dist'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify({message: 'Images task complete', onLast: true}));
});
