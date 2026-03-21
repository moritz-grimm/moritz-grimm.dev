import { resolve } from "node:path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                impressum: resolve(__dirname, "impressum.html"),
            },
        },
    },
});
