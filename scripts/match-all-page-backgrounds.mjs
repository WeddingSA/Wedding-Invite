import fs from 'node:fs';
const path='index.html';
let html=fs.readFileSync(path,'utf8');
const original=html;
html=html.replace('--paper:#fffdf7;','--paper:#f8f4e9;');
html=html.replace('background:rgba(255,253,247,.96);border:1px solid rgba(91,104,80,.16);','background:#f8f4e9;border:1px solid rgba(91,104,80,.16);');
if(html===original) throw new Error('Expected page background styles not found');
fs.writeFileSync(path,html);
// trigger workflow after workflow file exists
