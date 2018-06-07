'use strict';

var process = require('child_process');
var fs = require("fs");
var path = require("path");

// watchcopyDir("../feng3d/out", "libs");

/**
 * Watch for changes in TypeScript
 */
watchProject([
    __dirname,
]);

function watchcopyDir(srcdir, destdir)
{
    var realsrcdir = path.join(__dirname, srcdir);
    var realdestdir = path.join(__dirname, destdir);
    fs.readdir(realsrcdir, (err, files) =>
    {
        if (err) return;
        files.forEach(element =>
        {
            var src = `${realsrcdir}/${element}`;
            var dest = `${realdestdir}/${element}`;
            watchCopyFile(src, dest);
        });
    });

    function watchCopyFile(src, dest)
    {
        if (fs.existsSync(src))
        {
            fs.watchFile(src, () =>
            {
                copyfile();
            });
            copyfile();
        }
        function copyfile()
        {
            var str = fs.readFileSync(src, "utf8");
            if (src.indexOf(".js.map") != -1)
            {
                str = str.replace(`"sourceRoot":""`, `"sourceRoot":"../${srcdir}/"`);
            }
            fs.writeFileSync(dest, str, "utf8");
        }
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