'use strict';

var process = require('child_process');

/**
 * Watch for changes in TypeScript
 */
watchProject([
    __dirname,
]);

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