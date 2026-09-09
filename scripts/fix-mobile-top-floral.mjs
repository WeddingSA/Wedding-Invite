import fs from 'node:fs';
const path='index.html';
let html=fs.readFileSync(path,'utf8');
const old='.floral-corner.top-left{left:0;top:0;width:165px}';
const next='.floral-corner.top-left{left:-6px;top:-4px;width:92px}';
if(!html.includes(old)) throw new Error('Expected mobile top-left floral rule not found');
html=html.replace(old,next);
fs.writeFileSync(path,html);
