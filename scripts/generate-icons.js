'use strict';
/**
 * Axis favicon generator — run with: node scripts/generate-icons.js
 * Design: the loose "a" in Gloock Regular, solid #F2F1EC on #111311.
 * Outputs:
 *   public/favicon.ico            multi-size (16/32/48)
 *   public/apple-touch-icon.png   180 × 180
 *   public/icon-192.png           192 × 192 (manifest)
 *   public/icon-512.png           512 × 512 (manifest)
 */

const sharp = require('sharp');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PUBLIC = path.resolve(__dirname, '..', 'public');
const BG = '#111311';
const FG = '#F2F1EC';

function httpGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        return httpGet(res.headers.location, headers).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => req.destroy(new Error('HTTP timeout')));
  });
}

async function fetchGloockBase64() {
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Gloock&text=a&display=block';
  const css = (await httpGet(cssUrl, {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
  })).toString('utf8');
  const match = css.match(/url\(([^)]+)\)\s*format\(['"]?woff2['"]?\)/);
  if (!match) throw new Error('no woff2 URL in Google Fonts response');
  const fontBuf = await httpGet(match[1].replace(/['"]/g, ''));
  return fontBuf.toString('base64');
}

function buildSVG(gloockB64) {
  const fontDefs = gloockB64
    ? `<defs><style>@font-face{font-family:'Gloock';font-style:normal;font-weight:400;` +
      `src:url('data:font/woff2;base64,${gloockB64}') format('woff2');}</style></defs>`
    : '';
  const ff = gloockB64 ? "'Gloock'" : "Georgia, serif";

  return `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
${fontDefs}
  <rect width="512" height="512" fill="${BG}"/>
  <text x="256" y="345" font-family="${ff}" font-weight="400" font-size="370"
    fill="${FG}" text-anchor="middle">a</text>
</svg>`;
}

function pngToIco(images) {
  const n = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(n, 4);

  let offset = 6 + n * 16;
  const dirs = [];
  const datas = [];
  for (const { size, buf } of images) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size === 256 ? 0 : size, 0);
    dir.writeUInt8(size === 256 ? 0 : size, 1);
    dir.writeUInt8(0, 2);
    dir.writeUInt8(0, 3);
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(buf.length, 8);
    dir.writeUInt32LE(offset, 12);
    offset += buf.length;
    dirs.push(dir);
    datas.push(buf);
  }
  return Buffer.concat([header, ...dirs, ...datas]);
}

async function main() {
  process.stdout.write('Fetching Gloock from Google Fonts … ');
  let gloockB64 = null;
  try {
    gloockB64 = await fetchGloockBase64();
    console.log('OK');
  } catch (err) {
    console.log(`skipped (${err.message}) — falling back to Georgia`);
  }

  const svg = buildSVG(gloockB64);
  const master = await sharp(Buffer.from(svg)).png().toBuffer();

  await sharp(master).resize(180, 180).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
  console.log('✓  public/apple-touch-icon.png   180 × 180');

  await sharp(master).resize(192, 192).png().toFile(path.join(PUBLIC, 'icon-192.png'));
  console.log('✓  public/icon-192.png           192 × 192');

  await sharp(master).resize(512, 512).png().toFile(path.join(PUBLIC, 'icon-512.png'));
  console.log('✓  public/icon-512.png           512 × 512');

  const icoSizes = [16, 32, 48];
  const icoImages = [];
  for (const size of icoSizes) {
    const buf = await sharp(master).resize(size, size, { kernel: sharp.kernel.lanczos3 }).png().toBuffer();
    icoImages.push({ size, buf });
  }
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), pngToIco(icoImages));
  console.log('✓  public/favicon.ico            16/32/48 multi-size');
}

main().catch(err => { console.error(err.message); process.exit(1); });
