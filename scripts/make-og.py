#!/usr/bin/env python3
"""Generates 1200x630 social preview images for both editions into public/og/.
Run from the project root: python3 scripts/make-og.py
Requires Pillow. Uses public/images/manny-800.webp.
"""
from PIL import Image, ImageDraw, ImageFont
import os

BG = (7, 10, 18)
PANEL = (14, 20, 36)
AMBER = (124, 196, 255)
TEXT = (238, 242, 250)
MUTED = (147, 160, 184)

def font(size, bold=False, mono=False):
    cands = []
    if mono:
        cands += ["/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
                  "/System/Library/Fonts/Menlo.ttc"]
    else:
        cands += ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
                  "/System/Library/Fonts/Helvetica.ttc"]
    for c in cands:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def wrap(d, text, f, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=f) <= width:
            cur = t
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines

def make(path, label, headline):
    img = Image.new("RGB", (1200, 630), BG)
    d = ImageDraw.Draw(img)
    # dot grid
    for y in range(20, 630, 28):
        for x in range(20, 1200, 28):
            d.rectangle([x, y, x + 1, y + 1], fill=(24, 30, 46))
    # portrait panel
    px, py, ps = 810, 105, 320
    d.rectangle([px - 14, py - 14, px + ps + 14, py + ps + 56], fill=PANEL, outline=(40, 50, 78))
    p = Image.open("public/images/manny-800.webp").convert("RGB").resize((ps, ps))
    img.paste(p, (px, py))
    d.text((px, py + ps + 18), "Head of Product", font=font(16), fill=MUTED)
    for (cx, cy, dx, dy) in [(px - 14, py - 14, 1, 1), (px + ps + 14, py - 14, -1, 1), (px - 14, py + ps + 56, 1, -1), (px + ps + 14, py + ps + 56, -1, -1)]:
        d.line([cx, cy, cx + 22 * dx, cy], fill=AMBER, width=3)
        d.line([cx, cy, cx, cy + 22 * dy], fill=AMBER, width=3)
    # text
    d.text((70, 80), "MANNY GUERRERO" + ("  |  " + label if label else ""), font=font(20, mono=True), fill=AMBER)
    f = font(52, bold=True)
    y = 150
    for line in wrap(d, headline, f, 660):
        d.text((70, y), line, font=f, fill=TEXT)
        y += 66
    d.text((70, 540), "Head of Product", font=font(26), fill=MUTED)
    img.save(path, optimize=True)

os.makedirs("public/og", exist_ok=True)
make("public/og/og-clients.png", "", "How I lead product, build teams, and ship in the agent era.")
make("public/og/og-peers.png", "PEERS", "How I lead product, build teams, and ship in the agent era.")
print("wrote public/og/og-clients.png and og-peers.png")
