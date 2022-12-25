// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import fg from 'fast-glob';

export default defineConfig({
    publicDir: 'resources',
    build: {
        rollupOptions: {
            input: getHtmlNamesObject(),
        }
    }
});

function getHtmlNamesObject()
{
    const entries = fg.sync(['index.html', 'src/**/*.html'], { dot: true });

    const obj = entries.reduce((pv, cv) =>
    {
        const ps = cv.split('.');

        if (ps[ps.length - 1] === 'html')
        {
            pv[cv] = resolve(__dirname, cv);
        }

        return pv;
    }, {});

    return obj;
}
