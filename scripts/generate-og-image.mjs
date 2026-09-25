/**
 * Generates public/og-image.png — the site-wide Open Graph share image (M1.7).
 *
 * 1200x630, pure Node (no image library): raw RGBA buffer + zlib deflate +
 * hand-rolled PNG chunks. Brand red, "PRINTS THAT TALK" in a 5x7 bitmap font
 * with an offset ink shadow, gold "PRINTABILYA", location line, CMYK stripe.
 *
 * Re-run after any brand change:  npm run og
 */
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const W = 1200;
const H = 630;

// Brand tokens (keep in sync with src/index.css @theme)
const BRAND = [0xb3, 0x12, 0x1b];
const CREAM = [0xf3, 0xee, 0xe6];
const INK = [0x11, 0x10, 0x10];
const GOLD = [0xe9, 0xa2, 0x3b];
const STRIPES = [
  [0x00, 0xae, 0xef], // C
  [0xec, 0x00, 0x8c], // M
  [0xff, 0xe5, 0x00], // Y
  [0xb3, 0x12, 0x1b], // K slot = brand, matching the site's cmyk-bar
];

// --- 5x7 bitmap font (rows MSB-first, width 5) ----------------------------
const FONT = {
  A: [0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  B: [0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110],
  C: [0b01110, 0b10001, 0b10000, 0b10000, 0b10000, 0b10001, 0b01110],
  D: [0b11100, 0b10010, 0b10001, 0b10001, 0b10001, 0b10010, 0b11100],
  E: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111],
  F: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b10000],
  G: [0b01110, 0b10001, 0b10000, 0b10111, 0b10001, 0b10001, 0b01111],
  H: [0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  I: [0b01110, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
  J: [0b00111, 0b00010, 0b00010, 0b00010, 0b00010, 0b10010, 0b01100],
  K: [0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001],
  L: [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111],
  M: [0b10001, 0b11011, 0b10101, 0b10101, 0b10001, 0b10001, 0b10001],
  N: [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
  O: [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  P: [0b11110, 0b10001, 0b10001, 0b11110, 0b10000, 0b10000, 0b10000],
  Q: [0b01110, 0b10001, 0b10001, 0b10001, 0b10101, 0b10010, 0b01101],
  R: [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
  S: [0b01111, 0b10000, 0b10000, 0b01110, 0b00001, 0b00001, 0b11110],
  T: [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
  U: [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  V: [0b10001, 0b10001, 0b10001, 0b10001, 0b01010, 0b01010, 0b00100],
  W: [0b10001, 0b10001, 0b10001, 0b10101, 0b10101, 0b11011, 0b10001],
  X: [0b10001, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b10001],
  Y: [0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100, 0b00100],
  Z: [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0b11111],
  " ": [0, 0, 0, 0, 0, 0, 0],
  "·": [0, 0, 0, 0b00100, 0b00100, 0, 0],
  ".": [0, 0, 0, 0, 0, 0, 0b00100],
};

// --- Canvas ----------------------------------------------------------------
const px = Buffer.alloc(W * H * 4);

function fillRow(y, x0, x1, rgb) {
  for (let x = x0; x < x1; x++) {
    const i = (y * W + x) * 4;
    px[i] = rgb[0];
    px[i + 1] = rgb[1];
    px[i + 2] = rgb[2];
    px[i + 3] = 255;
  }
}

function rect(x, y, w, h, rgb) {
  for (let dy = 0; dy < h; dy++) {
    const yy = y + dy;
    if (yy < 0 || yy >= H) continue;
    fillRow(yy, Math.max(0, x), Math.min(W, x + w), rgb);
  }
}

function textWidth(text, scale) {
  return text.length * 6 * scale - scale;
}

function text(text, x, y, scale, rgb) {
  let cx = x;
  for (const ch of text.toUpperCase()) {
    const glyph = FONT[ch];
    if (glyph) {
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (glyph[row] >> (4 - col) & 1) rect(cx + col * scale, y + row * scale, scale, scale, rgb);
        }
      }
    }
    cx += 6 * scale;
  }
}

function centeredY(textStr, y, scale, rgb) {
  text(textStr, Math.round((W - textWidth(textStr, scale)) / 2), y, scale, rgb);
}

// --- Composition ------------------------------------------------------------
// Background: brand red
for (let y = 0; y < H; y++) fillRow(y, 0, W, BRAND);

// CMYK stripe along the bottom (matches .cmyk-bar)
const stripeH = 44;
for (let s = 0; s < 4; s++) {
  rect(Math.floor((W / 4) * s), H - stripeH, Math.ceil(W / 4) + 1, stripeH, STRIPES[s]);
}

// "PRINTS THAT TALK" — cream with offset ink shadow (sticker style)
const title = "PRINTS THAT TALK";
const titleScale = 12;
const titleX = Math.round((W - textWidth(title, titleScale)) / 2);
const titleY = 140;
text(title, titleX + 9, titleY + 9, titleScale, INK);
text(title, titleX, titleY, titleScale, CREAM);

// "PRINTABILYA" — gold
centeredY("PRINTABILYA", 320, 8, GOLD);

// "MAMBURAO · OCCIDENTAL MINDORO" — cream
centeredY("MAMBURAO · OCCIDENTAL MINDORO", 430, 6, CREAM);

// --- PNG encoding ------------------------------------------------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, "ascii");
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

// Add filter byte 0 (None) before each scanline
const raw = Buffer.alloc(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 4)] = 0;
  px.subarray(y * W * 4, (y + 1) * W * 4).copy(raw, y * (1 + W * 4) + 1);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // color type RGBA
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

writeFileSync(new URL("../public/og-image.png", import.meta.url), png);
console.log(`wrote public/og-image.png (${png.length} bytes, ${W}x${H})`);
