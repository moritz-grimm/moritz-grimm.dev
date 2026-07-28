import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import pkg from "./package.json";

const SITE_URL = "https://www.moritz-grimm.dev/";

function sitemap(): Plugin {
    return {
        name: "sitemap",
        apply: "build",
        generateBundle(): void {
            this.emitFile({
                type: "asset",
                fileName: "sitemap.xml",
                source:
                    `<?xml version="1.0" encoding="UTF-8"?>
                    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                        <url>
                            <loc>${SITE_URL}</loc>
                            <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
                        </url>
                    </urlset>
                    `,
            });
        },
    };
}

export default defineConfig({
    plugins: [sitemap()],
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                impressum: resolve(__dirname, "impressum.html"),
                privacyPolicy: resolve(__dirname, "privacy-policy.html"),
            },
        },
    },
});
