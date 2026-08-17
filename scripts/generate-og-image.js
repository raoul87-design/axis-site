'use strict';
/**
 * Axis OG/Twitter image generator — run with: node scripts/generate-og-image.js
 * Design: gradient-filled "axis" wordmark (Gloock), centered on #111311, 1200 × 630.
 *
 * background-clip: text doesn't exist in a static raster context, so the gradient
 * is applied natively as an SVG fill (fill="url(#grad)") — SVG text supports
 * gradient fills directly, no clip-path/mask indirection needed.
 */

const sharp = require('sharp');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PUBLIC = path.resolve(__dirname, '..', 'public');
const BG = '#111311';

// Same 4 stops as --grad in globals.css, 92deg converted to SVG objectBoundingBox coords.
const STOPS = [
  { offset: '0%', color: '#22c55e' },
  { offset: '36%', color: '#4f8df7' },
  { offset: '68%', color: '#e8b240' },
  { offset: '100%', color: '#b79cff' },
];
const GRAD_X1 = '0%', GRAD_Y1 = '48.3%', GRAD_X2 = '100%', GRAD_Y2 = '51.7%';

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
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Gloock&text=axis&display=block';
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
    ? `<style>@font-face{font-family:'Gloock';font-style:normal;font-weight:400;` +
      `src:url('data:font/woff2;base64,${gloockB64}') format('woff2');}</style>`
    : '';
  const ff = gloockB64 ? "'Gloock'" : "Georgia, serif";
  const stops = STOPS.map(s => `<stop offset="${s.offset}" stop-color="${s.color}"/>`).join('');

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${fontDefs}
    <linearGradient id="grad" x1="${GRAD_X1}" y1="${GRAD_Y1}" x2="${GRAD_X2}" y2="${GRAD_Y2}">
      ${stops}
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <text x="600" y="368" font-family="${ff}" font-weight="400" font-size="260"
    letter-spacing="-4" fill="url(#grad)" text-anchor="middle">axis</text>
</svg>`;
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
  await sharp(Buffer.from(svg)).png().toFile(path.join(PUBLIC, 'og-image.png'));
  console.log('✓  public/og-image.png  1200 × 630');
}

main().catch(err => { console.error(err.message); process.exit(1); });
