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
gulp.task('sass', function() {
    return gulp.src('scss/style.scss')
        .pipe(sass({}))
        .pipe(autoprefixer('last 5 version'))
        .pipe(gulp.dest('.'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['js/flexslider.js', 'jquery.easypiechart.js', 'js/action.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


// Pug to HTML
gulp.task('views', function() {
  return gulp.src('views/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('.'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch(['scss/*.scss', 'scss/*/*.scss', 'scss/*/*/*.scss'], ['sass']);
    gulp.watch('views/*.pug', ['views']);
});


// Default Task
gulp.task('default', ['sass', 'scripts', 'watch']);