import fs from 'node:fs';

const path = 'index.html';
const html = fs.readFileSync(path, 'utf8');
const floralBlock = /<svg class="floral-corner top-left"[\s\S]*?<\/svg>\s*<svg class="floral-corner bottom-right"[\s\S]*?<\/svg>/;

if (!floralBlock.test(html)) {
  throw new Error('Expected first-page floral SVG block was not found; no changes made.');
}

const replacement = '<img class="floral-corner top-left" src="/assets/floral-top-left.webp" alt="" aria-hidden="true">\n<img class="floral-corner bottom-right" src="/assets/floral-bottom-right.webp" alt="" aria-hidden="true">';
const updated = html.replace(floralBlock, replacement);

if (updated === html) {
  throw new Error('No change made.');
}

fs.writeFileSync(path, updated);
