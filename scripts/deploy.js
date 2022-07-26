const fs = require('fs-extra')

const copyfiles = [
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