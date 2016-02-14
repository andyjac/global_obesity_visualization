module.exports = {
  server: [
    './app.js',
    './models/**/*.js',
    './controllers/**/*.js',
    './middlewares/**/*.js'
  ],
  gulp: [
    './gulpfile.js',
    './gulp/**/*.js'
  ],
  lib: ['./lib/**/*.js'],
  setup: ['./setup/**/*.js'],
  test: ['./tests/**/*test.js'],
  client: {
    html: ['./public/**/*.html'],
    css: ['./public/**/*.css'],
    js: ['./public/**/**.js']
  }
};
