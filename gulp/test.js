var gulp = require('gulp');
var mocha = require('gulp-mocha');
var paths = require('./paths');

gulp.task('test', function() {
  return test(paths.test);
});

gulp.task('test:keep-alive', function() {
  return test(paths.test, true);
});

function test(paths, keepAlive) {
  process.env.NODE_ENV = 'test';
  process.env.PORT = 3001;

  var test = gulp.src(paths)
    .pipe(mocha())
    .once('error', function(err){
      console.log(err);
      process.exit(1);
    });

  if (!keepAlive) {
    test.once('end', function() {
      process.exit(0);
    });
  }

  return test;
}
