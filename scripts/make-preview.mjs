#!/usr/bin/env node
/**
 * Makes self-contained preview HTML files (CSS, fonts and images inlined, no scripts)
 * from ./out, for quick visual review in any viewer. Scripts are removed, so motion
 * and the hero canvas do not run, but layout and content are exact.
 * Usage: node scripts/make-preview.mjs [outDir]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const OUT = "out";
const dest = process.argv[2] || "preview";
mkdirSync(dest, { recursive: true });

const mime = { ".woff2": "font/woff2", ".woff": "font/woff", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
const dataUri = (p) => {
  const file = join(OUT, p.replace(/^\//, "").split("?")[0]);
  if (!existsSync(file)) return null;
  return `data:${mime[extname(file)] || "application/octet-stream"};base64,${readFileSync(file).toString("base64")}`;
};

function build(htmlPath, name) {
  let html = readFileSync(htmlPath, "utf8");
  html = html.replace(/<link[^>]+rel="stylesheet"[^>]*>/g, (tag) => {
    const href = (tag.match(/href="([^"]+)"/) || [])[1];
    if (!href) return "";
    let css = readFileSync(join(OUT, href.replace(/^\//, "")), "utf8");
    css = css.replace(/url\(([^)]+)\)/g, (m, u) => {
      const clean = u.replace(/["']/g, "");
      if (clean.startsWith("data:")) return m;
      const p = clean.startsWith("/") ? clean : "/_next/static/css/" + clean;
      const norm = p.replace(/\/_next\/static\/css\/\.\.\//, "/_next/static/");
      const d = dataUri(norm);
      return d ? `url(${d})` : m;
    });
    return `<style>${css}</style>`;
  });
  html = html.replace(/<link[^>]+rel="preload"[^>]*>/g, "");
  html = html.replace(/<script[\s\S]*?<\/script>/g, "");
  html = html.replace(/src="(\/images\/[^"]+)"/g, (m, p) => `src="${dataUri(p) || p}"`);
  writeFileSync(join(dest, name), html);
  console.log("wrote", join(dest, name));
}

build(join(OUT, "index.html"), "preview-clients.html");
build(join(OUT, "peers", "index.html"), "preview-peers.html");
