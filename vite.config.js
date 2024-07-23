import { extname, resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import AutoImport from "unplugin-auto-import/vite"
import Inspect from "vite-plugin-inspect"

const cssExts = [".css", ".less", ".scss", "sass", ".stylus"]

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        AutoImport({
            include: [/\.jsx?$/],
            imports: ["react", "react-router-dom", "react-router"],
        }),
        Inspect({build: true, outputDir: ".vite-inspect"}),
    ],
    resolve: {
        alias: [
            {find: "@", replacement: resolve(__dirname, "src")},
        ],
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                chunkFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: "assets/js/[name].[hash].js",
                compact: true,
                assetFileNames: chunkInfo => {
                    const ext = extname(chunkInfo.name)

                    if (cssExts.includes(ext)) {
                        return `assets/css/[name].[hash].[ext]`
                    }

                    return `assets/images/[name].[hash].[ext]`
                },
            },
        },
        minify: true,
        // reportCompressedSize: false,
        cssCodeSplit: true,
        assetsInlineLimit: 1024 * 5,
        emptyOutDir: true,
    },
})
