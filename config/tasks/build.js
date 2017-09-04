const clean = require('../tools/clean');
const js = require('../tools/js');
const sass = require('../tools/sass');
const assemble = require('../tools/assemble');
const copy = require('../tools/copy');

module.exports = function (gulp, plugins) {
  return gulp.task('build', () => {

    return clean(process.env.BUILD_PATH + '/**/*.*').then(js)
                  .then(sass)
                  .then(assemble)
                  .then(copy);
  });
};
