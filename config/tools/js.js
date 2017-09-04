const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const flatten = require('gulp-flatten');
const watchify = require('watchify');
const util = require('gulp-util');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const clean = require('../tools/clean');
require('dotenv').config();

module.exports = () => {
    util.log(util.colors.gray('Starting ') + util.colors.cyan('js...'));
    const build = () => {
        return browserify('app/framework/js/app.js', {
            cache: {},
            packageCache: {},
            fullPaths: true,
            transform: babelify.configure({
                presets: ['es2015', 'react'],
                compact: false
            }),
        });
    };

    const bundle = (bundler, resolve, watch) => {
        //util.log(util.colors.green('Bundling scripts...'));
        return bundler.bundle()
          .on('end', () => {
              util.log(util.colors.gray('Finished ') + util.colors.cyan('js...'));
              resolve();
          })
          .on('error', (err) => {
              util.log(util.colors.red('Browserify Error'));
              util.log(err.message);
              util.log('\n', err.codeFrame);
              util.beep();
          })
          .pipe(source('app/framework/js/app.js'))
          .pipe(buffer())
          .pipe(flatten())
          .pipe(gulp.dest(process.env.BUILD_PATH + 'js'))
          .pipe(uglify())
          .pipe(flatten())
          .pipe(gulp.dest(process.env.BUILD_PATH + 'js'));
    };

    const dev = (resolve) => {
        const bundler = watchify(build());
        //Js build changed, bundle packages again
        bundler.on('update', () => {
            gulp.start('build');
        })

        //Build js
        bundle(bundler, resolve, false);
    };

    const prod = (resolve) => {
        const bundler = build();
        bundle(bundler, resolve, false);
    };

    return new Promise((resolve) => {
        if (process.env.WATCH === 'watch') {
            dev(resolve);
        } else {
            prod(resolve);
        }
    });

};
