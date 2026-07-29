import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import pkg from "./package.json";
import { readFileSync } from "node:fs";

const PARTIALS = resolve(__dirname, "src/partials");
function partials(): Plugin {
    return {
        name: "partials",
        transformIndexHtml: {
            order: "pre",
            handler(html: string): string {
                return html.replace(
                    /<!--\s*include:\s*([\w-]+\.html)\s*-->/g,
                    (_, file: string) => readFileSync(resolve(PARTIALS, file), "utf8"),
                );
            },
        },
        configureServer(server): void {
            server.watcher.add(PARTIALS);
            server.watcher.on("change", (path) => {
                if (path.startsWith(PARTIALS)) {
                    server.ws.send({ type: "full-reload" });
                }
            });
        },
    };
}

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
    plugins: [partials(), sitemap()],
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                impressum: resolve(__dirname, "impressum.html"),
                privacyPolicy: resolve(__dirname, "privacy-policy.html"),
                404: resolve(__dirname, "404.html"),
            },
        },
    },
});
