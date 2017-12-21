'use strict';

var process = require('child_process');
var fs = require("fs");
var path = require("path");

watchcopyDir("../feng3d/out", "libs");

/**
 * Watch for changes in TypeScript
 */
watchProject([
    __dirname,
]);

function watchcopyDir(srcdir, destdir)
{
    srcdir = path.join(__dirname, srcdir);
    destdir = path.join(__dirname, destdir);
    fs.readdir(srcdir, (err, files) =>
    {
        if (err) return;
        files.forEach(element =>
        {
            var src = `${srcdir}/${element}`;
            var dest = `${destdir}/${element}`;
            watchCopyFile(src, dest);
        });
    });
}

function watchCopyFile(src, dest)
{
    if (fs.existsSync(src))
    {
        fs.watchFile(src, () =>
        {
            fs.writeFileSync(dest, fs.readFileSync(src));
        });
        fs.writeFileSync(dest, fs.readFileSync(src));
    }
}

function watchProject(project)
{
    if (project instanceof Array)
    {
        for (var i = 0; i < project.length; i++)
        {
            watchProject(project[i]);
        }
        return;
    }

    var childProcess = process.exec('tsc -w -p ' + project, function (error, stdout, stderr)
    {
        if (error !== null)
        {
            console.log('exec error: ' + error);
        }
        console.log(stdout)
        console.log(stderr)
    });
    childProcess.stdout.on('data', function (data)
    {
        data = data.trim();
        console.log(data);
    });
    childProcess.stderr.on('data', function (data)
    {
        data = data.trim();
        console.error(data);
    });
}