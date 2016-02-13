var gulp = require('gulp');
var paths = require('./paths');
var runSequence = require('run-sequence');

require('./lint');
require('./test');

gulp.task('watch:server', function() {
  gulp.watch(paths.server, ['lint:server']);
});

gulp.task('watch:gulp', function() {
  gulp.watch(paths.gulp, ['lint:gulp']);
});

gulp.task('watch:lib', function() {
  gulp.watch(paths.lib, ['lint:lib']);
});

gulp.task('watch:setup', function() {
  gulp.watch(paths.setup, ['lint:setup']);
});

gulp.task('watch:test', function() {
  gulp.watch(paths.test, ['lint:test']);
});
