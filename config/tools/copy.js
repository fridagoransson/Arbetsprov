const gulp = require('gulp');
const runSequence = require('run-sequence');
const flatten = require('gulp-flatten');
const util = require('gulp-util');

require('dotenv').config();

module.exports = () => {

  //COPY.IMAGES
  const copyImages = () => {
    return new Promise((resolve, reject) => {
      gulp.src(process.env.IMAGES_PATH + '**/*', { base: process.env.IMAGES_PATH })
        .pipe(gulp.dest(process.env.BUILD_PATH + 'images'))
        .on('end', resolve)
        .on('error', reject);
      });
  };

  //COPY
  util.log(util.colors.gray('Starting ') + util.colors.cyan('copy...'));

  return copyImages().then(() => {
    util.log(util.colors.gray('Finished ') + util.colors.cyan('copy...'));
  });

};
