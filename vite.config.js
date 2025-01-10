import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
const { resolve } = require('path');

module.exports = defineConfig({
    root: resolve(__dirname, './src'),
    build: {
        rollupOptions: {
            emptyOutDir: true,
            input: {
                app: fileURLToPath(new URL('./src/js/app.js', import.meta.url)),
                style: fileURLToPath(new URL('./src/scss/app.scss', import.meta.url)),
            },
            output: {
                assetFileNames: (assetInfo) => {
                    var info = assetInfo.name.split(".");
                    var extType = info[info.length - 1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = "img";
                    } else if (/scss|css/.test(extType)) {
                        extType = "css";
                    } else if (/woff|woff2|ttf|html/.test(extType)) {
                        extType = "fonts";
                    }
                    return `${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: "js/[name]-[hash].js",
                entryFileNames: "js/[name]-[hash].js",

            },
        },
        outDir: resolve(__dirname, './dist'),
    },
});
