var gulp = require('gulp');
var mocha = require('gulp-mocha');
var paths = require('./paths');

gulp.task('test', function() {
  return test(paths.test);
});

function test(paths) {
  process.env.NODE_ENV = 'test';

  return gulp.src(paths)
    .pipe(mocha())
    .once('error', function(err){
      console.log(err);
      process.exit(1);
    }).once('end', function() {
      process.exit(0);
    });
}
