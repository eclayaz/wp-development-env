WordPress Theme Automation With Gulp
====================================
Easy environment configuration and conditional piping to Gulp

In this project I have integrated WordPress with Gulp to automate and enhance the theme development process by putting together an automated workflow.

Why Is It Important To Automate Your Development Workflow?
----------------------
Automating development workflow can be great reward for your development process. Here are some of the reasons to give it a go:

* It removes all those manual repetitive tasks, let a custom tool to handle it
* It saves a lot of time for doing other important core development work.
* It helps optimizes your website for performance by minifying and optimizing all assets like images

What's Inside?
--------------

* Underscores (_s) based theme. (http://underscores.me)

    npm packages
    -
    * gulp-environments
    * gulp-sass
    * gulp-autoprefixer
    * gulp-rtlcss
    * gulp-rename
    * gulp-plumber
    * gulp-util
    * gulp-concat
    * gulp-jshint
    * gulp-scss-lint
    * gulp-uglify
    * gulp-uglifycss
    * gulp-notify
    * gulp-imagemin
    * browser-sync
    * gulp-sourcemaps
    * gulp-phpcs

Getting Started with Underscores
---
If you want to keep it simple, head over to http://underscores.me and generate your _s based theme from there. You just input the name of the theme you want to create, click the "Generate" button, and you get your ready-to-awesomize starter theme.

### gulp-environment
Adds easy environment configuration and conditional piping to Gulp
By default, the library defines two environments: development and production.
In this project we use the same development and production environments 
```
    var development = environments.development;
    var production = environments.production;
```

sass sourcemaps is only running in the development environments. which is configured by the following line.
```   
   .pipe(development(sourcemaps.write('./maps')))
```

css and js minifications are only happen in production environments.
```
    .pipe(production(rename({suffix: '.min'})))
    .pipe(production(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
    })))
```
```
    .pipe(production(rename({suffix: '.min'})))
    .pipe(production(uglify()))
```

### Setting the environment
```
    gulp --env development
```
```
    gulp --env production
```

### Configure WordPress Coding Standards for PHP_CodeSniffer using Composer

Standards can be installed with the Composer dependency manager:
```
    composer create-project wp-coding-standards/wpcs --no-dev
```
**Running this command will:**

* Install WordPress standards into wpcs directory.
* Install PHP_CodeSniffer.
* Register WordPress standards in PHP_CodeSniffer configuration.
* Make phpcs command available from wpcs/vendor/bin.

How to setup a theme folder using this repository
==
* First, you need to install Gulp globally in your system
    ```http://gulpjs.com/```
* Create a new folder in as 'wp-development' in ```wp-content/themes``` directory 
* Clone this repository into the 'wp-development' folder
* Open console in the 'wp-development' folder and run following command 
    ```npm update```