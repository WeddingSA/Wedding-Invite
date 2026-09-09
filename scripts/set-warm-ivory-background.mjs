import fs from 'node:fs';
const path='index.html';
let html=fs.readFileSync(path,'utf8');
const original=html;
html=html.replace('background:#fffdf7;border:1px solid rgba(91,104,80,.16);','background:#f8f4e9;border:1px solid rgba(91,104,80,.16);');
if(html===original) throw new Error('Current invitation background not found');
fs.writeFileSync(path,html);
