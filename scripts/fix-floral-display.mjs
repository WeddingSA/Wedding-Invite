import fs from 'node:fs';

const path = 'index.html';
let html = fs.readFileSync(path, 'utf8');

const oldTop = '<img class="floral-corner top-left" src="/assets/floral-top-left.webp" alt="" aria-hidden="true">';
const newTop = '<img class="floral-corner top-left" src="/assets/floral-top-left-transparent.png" alt="" aria-hidden="true">';
if (!html.includes(oldTop)) throw new Error('Top floral image reference not found; no changes made.');
html = html.replace(oldTop, newTop);

const oldDesktop = '.floral-corner{position:absolute;z-index:2;pointer-events:none;opacity:.98;width:330px;height:auto}.floral-corner.top-left{left:-8px;top:-8px}.floral-corner.bottom-right{right:-8px;bottom:-8px;transform:rotate(180deg)}';
const newDesktop = '.floral-corner{position:absolute;z-index:2;pointer-events:none;opacity:.98;height:auto;background:transparent}.floral-corner.top-left{left:-8px;top:-8px;width:330px}.floral-corner.bottom-right{right:-8px;bottom:-8px;width:180px;transform:rotate(180deg)}';
if (!html.includes(oldDesktop)) throw new Error('Desktop floral CSS not found; no changes made.');
html = html.replace(oldDesktop, newDesktop);

const oldMobile = '.floral-corner{width:215px}';
const newMobile = '.floral-corner.top-left{width:215px}.floral-corner.bottom-right{width:120px}';
if (!html.includes(oldMobile)) throw new Error('Mobile floral CSS not found; no changes made.');
html = html.replace(oldMobile, newMobile);

fs.writeFileSync(path, html);
