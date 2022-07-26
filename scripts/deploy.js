const fs = require('fs-extra')

const copyfiles = [
    "node_modules/feng3d/dist",
    "libs",
    "out",
    "resources",
    "src",
    "examples.html",
    "examples.js",
    "index.html",
    "index.js"
];

copyfiles.forEach((v) =>
{
    fs.copy(v, `public/${v}`);
});