var del = require('del');
const util = require('gulp-util');

module.exports = (path) => {
    return new Promise((resolve) => {
        util.log(util.colors.gray('Starting ') + util.colors.cyan('clean'));
        del(path, { force: true }).then(function (paths) { // returns a promise; https://github.com/sindresorhus/del
            //console.log("Deleted files and folders: \n", paths.join('\n'));
            util.log(util.colors.gray('Finished ') + util.colors.cyan('clean... '));
            resolve();
        }, function (reason) {
            //console.log("Failed to delete files " + reason);
            resolve();
        });
    });
};
