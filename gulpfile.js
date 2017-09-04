/// <binding AfterBuild='default' />
var gulp = require("gulp"),
    plugins = require('gulp-load-plugins')({scope: ['dependencies']});

const build = require('./config/tasks/build')(gulp, plugins);
const watch = require('./config/tasks/watch')(gulp, plugins);
const develop = require('./config/tasks/develop')(gulp, plugins);
