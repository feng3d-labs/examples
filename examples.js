var type = GetQueryString("type");

var loadpaths = [//
  "../feng3d/out/feng3d.js",
  "out/" + type + ".js",
];

for (var i = 0; i < loadpaths.length; i++) {
  loadpaths[i] = loadpaths[i] + "?version=" + Math.random();
}

feng3d.loadjs.loadjs({
  paths: loadpaths,
  success: () => {

  },
  error: (pathsNotFound) => {
    console.log(`无法加载 ${JSON.stringify(pathsNotFound)}`);
  }, numRetries: 5
});

if (top != window)
  top.feng3dWin = window;
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
}