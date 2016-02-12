module.exports = {
  server: [
    './app.js',
    './models/**/*.js',
    './controllers/**/*.js'
  ],
  gulp: [
    './gulpfile.js',
    './gulp/**/**'
  ],
  lib: ['./lib/**/*.js'],
  setup: ['./setup/**/*.js'],
  test: ['./tests/**/*test.js']
};
