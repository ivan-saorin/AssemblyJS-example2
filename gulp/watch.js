'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('app/styles/**/*.less', ['styles']);
  gulp.watch('app/scripts/**/*.tag', ['riot-tag']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
