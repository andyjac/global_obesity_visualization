var gulp = require('gulp');
var webpack = require('gulp-webpack');
var paths = require('./paths');
var runSequence = require('run-sequence');

gulp.task('build:html', function() {
  gulp.src(paths.client.html)
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:css', function() {
  gulp.src(paths.client.css)
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:js', function() {
  gulp.src(['./public/js/index.js'])
    .pipe(webpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react']
          }
        }]
      },
      output: {
        filename: 'bundle.js'
      }
    })).pipe(gulp.dest('./dist'));
});

gulp.task('build', function(cb) {
  runSequence(
    'build:html',
    'build:css',
    'build:js',
    cb);
});
