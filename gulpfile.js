var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var concat = require('gulp-concat');

var paths = {
  sass: ['./scss/**/*.scss'],
  controllers: ['./www/js/controllers/*.js'],
  services: ['./www/js/services/*.js'],
};

gulp.task('default', ['sass', 'concat-controllers', 'concat-services', 'watch']);

gulp.task('sass', function(done) {
  gulp.src('./scss/cauz.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.controllers, ['concat-controllers']);
  gulp.watch(paths.services, ['concat-services']);
});


gulp.task('concat-controllers', function() {
  gulp.src('./www/js/controllers/*.js')
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('./www/js/'))
});

gulp.task('concat-services', function() {
  gulp.src('./www/js/services/*.js')
    .pipe(concat('services.js'))
    .pipe(gulp.dest('./www/js/'))
});
