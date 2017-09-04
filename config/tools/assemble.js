const gulp = require('gulp');
const assemble = require('fabricator-assemble');
const runSequence = require('run-sequence');
const del = require('del');
const handlebars = require('handlebars');
const flatten = require('gulp-flatten');
const util = require('gulp-util');
const clean = require('../tools/clean');

require('dotenv').config();

//ASSEMBLE
module.exports = () => {

    const flattenstructure = () => {
      return new Promise((resolve, reject) => {
        gulp.src(process.env.BUILD_PATH + 'temphtml/**/*.html')
          .pipe(flatten())
          .pipe(gulp.dest(process.env.BUILD_PATH))
          .on('end', resolve);
      });
    };

    const buildmocks = () => {
        return new Promise((resolve, reject) => {
          const materials = process.env.COMPONENTS_PATH.split(',');
          const pages = [process.env.PAGES_PATH];
          const options = {
              layout: 'default',
              layouts: 'app/framework/*',
              layoutIncludes: 'app/framework/includes/*.html',
              views: pages,
              materials: materials,
              data: 'config/*.{json,yml}',
              docs: 'docs/**/*.md',
              keys: {
                  materials: 'materials',
                  views: 'views',
                  docs: 'docs',
              },
              logErrors: false,
              onError: (error) => {
                  console.log(error);
              },
              dest: process.env.BUILD_PATH + 'temphtml',
          };
          assemble(options);
          resolve();
        });
    };

    util.log(util.colors.gray('Starting ') + util.colors.cyan('assemble...'));

    return new Promise((resolve, reject) => {
      buildmocks();
      flattenstructure().then(() => {
          clean(process.env.BUILD_PATH + 'temphtml').then(() => {
              util.log(util.colors.gray('Finished ') + util.colors.cyan('assemble...'));
              resolve();
          });
      });
    });

};
