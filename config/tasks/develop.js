const runSequence = require('run-sequence');
const server = require('../tools/server');

module.exports = function (gulp, plugins) {
  return gulp.task('develop', (cb) => {
    process.env.WATCH = 'watch';

    runSequence(
        'build',
        'watch',
        cb
    );

    server();

  });
};
