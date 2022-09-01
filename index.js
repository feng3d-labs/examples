var files = {
    "base": [
        "Container3DTest",
        "FPSControllerTest",
        "BillboardTest",
        "MousePickTest",
        "SkyBoxTest",
        "FogTest",
        "ScriptTest",
    ],
    "material": [
        "ColorMaterialTest",
        "PointMaterialTest",
        "SegmentMaterialTest",
        "StandardMaterialTest",
        "TextureMaterialTest",
    ],
    "geometry": [
        "geometries_f",
        "geometries",
        "PrimitiveTest",
        "GeometryTest",
    ],
    "lights": [
        "PointLightTest",
        "physical",
    ],
    "animator": [
        "SceneLoadTest",
    ],
    "advanced": [
        "TerrainTest",
        "TerrainMergeTest",
    ],
    "away3d": [
        "Basic_View",
        "Basic_SkyBox",
        "Basic_Shading",
    ],
    "font": [
        "GeometryFontTest"
    ],
    "renderer": [
        "Basic",
        "DashedLine",
    ],
};

function extractQuery()
{
    var p = window.location.search.indexOf('?q=');
    if (p !== -1)
    {
        return window.location.search.substr(3);
    }
    return ''
}

var panel = document.getElementById('panel');
var content = document.getElementById('content');
var viewer = document.getElementById('viewer');

var filterInput = document.getElementById('filterInput');
var clearFilterButton = document.getElementById('clearFilterButton');

var expandButton = document.getElementById('expandButton');
expandButton.addEventListener('click', function (event)
{
    panel.classList.toggle('collapsed');
    event.preventDefault();
});

// iOS iframe auto-resize workaround

if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent))
{

    viewer.style.width = getComputedStyle(viewer).width;
    viewer.style.height = getComputedStyle(viewer).height;
    viewer.setAttribute('scrolling', 'no');

}

var container = document.createElement('div');
content.appendChild(container);

var button = document.createElement('div');
button.id = 'button';
button.textContent = 'View source';
button.addEventListener('click', function (event)
{

    window.open('https://gitlab.com/feng3d/feng3d-examples/tree/master/src/' + selected + '.ts');

}, false);
button.style.display = 'none';
document.body.appendChild(button);

var links = {};
var paths = {};
var selected = null;

for (var key in files)
{

    var section = files[key];

    var header = document.createElement('h2');
    header.textContent = key;
    header.setAttribute('data-category', key);
    container.appendChild(header);

    for (var i = 0; i < section.length; i++)
    {

        (function (file)
        {

            paths[file] = key + "/" + file;

            var link = document.createElement('a');
            link.className = 'link';
            link.textContent = file;
            link.href = "examples.html?type=" + paths[file] + "&v=" + Math.random();
            link.setAttribute('target', 'viewer');
            link.addEventListener('click', function (event)
            {

                if (event.button === 0)
                {

                    selectFile(file);

                }

            });
            container.appendChild(link);

            links[file] = link;

        })(section[i]);

    }

}

function loadFile(file)
{

    selectFile(file);
    viewer.src = "examples.html?type=" + paths[file];

}

function selectFile(file)
{

    if (selected !== null) links[selected].classList.remove('selected');

    links[file].classList.add('selected');

    window.location.hash = file;
    viewer.focus();

    button.style.display = '';
    panel.classList.toggle('collapsed');

    selected = file;

}

if (window.location.hash !== '')
{

    loadFile(window.location.hash.substring(1));

}

// filter

filterInput.addEventListener('input', function (e)
{

    updateFilter();

});

clearFilterButton.addEventListener('click', function (e)
{

    filterInput.value = '';
    updateFilter();
    e.preventDefault();

});

function updateFilter()
{

    var v = filterInput.value;
    if (v !== '')
    {
        window.history.replaceState({}, '', '?q=' + v + window.location.hash);
    } else
    {
        window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    }

    var exp = new RegExp(v, 'gi');

    for (var key in files)
    {

        var section = files[key];

        for (var i = 0; i < section.length; i++)
        {

            filterExample(section[i], exp);

        }

    }

    layoutList();

}

function filterExample(file, exp)
{

    var link = links[file];
    var res = file.match(exp);
    var text;

    if (res && res.length > 0)
    {

        link.classList.remove('filtered');

        for (var i = 0; i < res.length; i++)
        {
            text = file.replace(res[i], '<b>' + res[i] + '</b>');
        }

        link.innerHTML = text;

    } else
    {

        link.classList.add('filtered');
        link.innerHTML = file;

    }
}

function layoutList()
{

    for (var key in files)
    {

        var collapsed = true;

        var section = files[key];

        for (var i = 0; i < section.length; i++)
        {

            var file = section[i];

            if (!links[file].classList.contains('filtered'))
            {

                collapsed = false;
                break;

            }

        }

        var element = document.querySelector('h2[data-category="' + key + '"]');

        if (collapsed)
        {

            element.classList.add('filtered');

        } else
        {

            element.classList.remove('filtered');

        }

    }

}

filterInput.value = extractQuery();
updateFilter();