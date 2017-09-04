const runSequence = require('run-sequence');

module.exports = (gulp, plugins) => {
  return gulp.task('default', () => {

    runSequence(
        'build'
    );
  });
};
