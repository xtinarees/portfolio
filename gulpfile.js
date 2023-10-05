// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');

// Compile Our Sass
function doStyles() {
  return gulp.src('scss/style.scss')
    .pipe(sass({}))
    .pipe(autoprefixer('last 5 version'))
    .pipe(gulp.dest('.'));
}

// Concatenate & Minify JS
function doScripts() {
  return gulp.src(['js/jquery.js', 'js/lodash.custom.min.js', 'js/main.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
}

// Pug to HTML
function doViews() {
  return gulp.src('views/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('.'));
}

// Watch Files For Changes
function watch() {
  gulp.watch('js/*.js', doScripts);
  gulp.watch(['scss/*.scss', 'scss/*/*.scss', 'scss/*/*/*.scss'], doStyles);
  gulp.watch('views/*.pug', doViews);
}


// Default Task
gulp.task('default', watch);
gulp.task('build', gulp.series(doScripts, doStyles, doViews));