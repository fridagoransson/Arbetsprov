const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const flatten = require('gulp-flatten');
const util = require('gulp-util');

require('dotenv').config();

module.exports = () => {
    util.log(util.colors.gray('Starting ') + util.colors.cyan('css...'));
  return new Promise((resolve, reject) => {
      gulp.src('app/**/*.scss')
      .pipe(sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError))
      .pipe(flatten())
      .pipe(postcss([ autoprefixer() ]))
      .pipe(gulp.dest(process.env.BUILD_PATH + 'stylesheets'))
      .on('end', () => {
        util.log(util.colors.gray('Finished ') + util.colors.cyan('css...'));
        resolve();
      })
      .on('error', reject);
    });
};
