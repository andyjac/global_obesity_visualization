var gulp = require('gulp');
var eslint = require('gulp-eslint');
var paths = require('./paths');
var helpers = require('../lib/helpers');

gulp.task('lint:server', function() {
  return lint(paths.server);
});

gulp.task('lint:gulp', function() {
  return lint(paths.gulp);
});

gulp.task('lint:lib', function() {
  return lint(paths.lib);
});

gulp.task('lint:test', function() {
  return lint(paths.test);
});

gulp.task('lint:setup', function() {
  return lint(paths.setup);
});

gulp.task('lint:client', function() {
  return lint(paths.client.js);
});

function lint(paths) {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
}
