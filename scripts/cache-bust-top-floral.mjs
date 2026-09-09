import fs from 'node:fs';
const path='index.html';
let html=fs.readFileSync(path,'utf8');
const old='src="/assets/floral-top-left.webp"';
const next='src="/assets/floral-top-left-v2.webp"';
if(!html.includes(old)) throw new Error('Top-left floral source not found');
html=html.replace(old,next);
fs.writeFileSync(path,html);
