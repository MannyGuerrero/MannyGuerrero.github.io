#!/usr/bin/env node
/**
 * Release guard. Scans the built site in ./out.
 *
 * Modes:
 *   node scripts/guard.mjs            preview: reports everything, only hard errors fail
 *   node scripts/guard.mjs --ci       fails on [CONFIRM] tags, dashes, emoji, plain email, employer leaks
 *   node scripts/guard.mjs --release  all of the above AND requires blocklist.local.txt
 *
 * blocklist.local.txt (gitignored) lists every real client, product and vendor name.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const args = new Set(process.argv.slice(2));
const release = args.has("--release");
const ci = args.has("--ci") || release;
const OUT = "out";

if (!existsSync(OUT)) {
  console.error("No ./out folder. Run `npm run build` first.");
  process.exit(2);
}

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const htmlFiles = walk(OUT).filter((f) => f.endsWith(".html"));
const errors = [];
const warns = [];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");

const textOf = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
  );

// Blocklist
let blocklist = [];
if (existsSync("blocklist.local.txt")) {
  blocklist = readFileSync("blocklist.local.txt", "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}
if (blocklist.length === 0) {
  (release ? errors : warns).push("blocklist.local.txt is missing or empty. Name scan did NOT run.");
}

// Unconfirmed copy is tracked in the source: every c("...") wrapper in src/content/site.ts.
const srcPath = "src/content/site.ts";
let pending = [];
if (existsSync(srcPath)) {
  readFileSync(srcPath, "utf8").split(/\r?\n/).forEach((line, i) => {
    if (/^export const c = /.test(line)) return;
    if (/\bc\(\s*["'`]/.test(line)) pending.push(`${srcPath}:${i + 1}`);
  });
}
if (pending.length) {
  (ci ? errors : warns).push(`${pending.length} unconfirmed c("...") item(s) in content. Verify each is true and approved, then remove the c() wrapper: ${pending.join(", ")}`);
}

const ALLOWED_EMPLOYER = "Umbrage (Bain & Company)";
const emojiRe = /\p{Extended_Pictographic}/u;
const arrowRe = /(→|←|⇒|->|=>)/;

for (const f of htmlFiles) {
  const raw = readFileSync(f, "utf8");
  const text = textOf(raw);
  const lower = (raw + " " + text).toLowerCase();

  for (const term of blocklist) {
    if (lower.includes(term.toLowerCase())) errors.push(`${f}: blocklisted name found: "${term}"`);
  }
  if (/[—–]/.test(text)) errors.push(`${f}: em or en dash in visible text`);
  if (/--/.test(text)) errors.push(`${f}: double hyphen in visible text`);
  if (arrowRe.test(text)) errors.push(`${f}: arrow in visible text`);
  // The copyright sign is classed as pictographic by Unicode but is not an emoji here.
  if (emojiRe.test(text.replace(/[©®™]/g, ""))) errors.push(`${f}: emoji in visible text`);
  if (/<img(?![^>]*\balt=)[^>]*>/i.test(raw)) errors.push(`${f}: <img> without alt`);

  const confirms = (text.match(/\[CONFIRM\]/g) || []).length;
  if (confirms) (ci ? errors : warns).push(`${f}: ${confirms} [CONFIRM] tag(s) still present`);

  const stripped = text.split(ALLOWED_EMPLOYER).join("");
  if (/\bUmbrage\b|\bBain\b/.test(stripped)) {
    errors.push(`${f}: employer or Bain named outside the role line`);
  }
}

// Robots gate
const robots = existsSync(join(OUT, "robots.txt")) ? readFileSync(join(OUT, "robots.txt"), "utf8") : "";
const homeHtml = existsSync(join(OUT, "index.html")) ? readFileSync(join(OUT, "index.html"), "utf8") : "";
const noindexMeta = /name="robots"[^>]*content="[^"]*noindex/i.test(homeHtml);
console.log(`Indexing: ${noindexMeta ? "NOINDEX (private mode)" : "INDEXABLE"}; robots.txt ${/Disallow:\s*\/\s*$/m.test(robots) ? "blocks all" : "allows"}`);

console.log(`Scanned ${htmlFiles.length} HTML files. Blocklist terms: ${blocklist.length}.`);
warns.forEach((w) => console.warn("WARN  " + w));
errors.forEach((e) => console.error("FAIL  " + e));

if (errors.length) {
  console.error(`\nGuard failed with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(warns.length ? "\nGuard passed with warnings (preview mode)." : "\nGuard passed.");
