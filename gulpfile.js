'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');

//打包shaders
const shaderPack = require("../feng3d/ShaderPack.js");
shaderPack.shaderPack("../feng3d");

/**
 * Watch for changes in TypeScript
 */
watchProject("../feng3d-loadModule", "../feng3d", ".");

function watchProject(...projects)
{
    var tasks = [];
    projects.forEach((element) =>
    {
        var taskName = "watch-" + element;
        tasks.push(taskName);
        gulp.task(taskName, shell.task([
            'tsc -w -p ' + element,
        ]))
    });
    gulp.task('watch', tasks);
}

gulp.task('build', ['watch']);

gulp.task('default', ['build']);