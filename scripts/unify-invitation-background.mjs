import fs from 'node:fs';
const path='index.html';
let html=fs.readFileSync(path,'utf8');
const original=html;
html=html.replace('background:linear-gradient(180deg,#fffdf7,#f8f4e9);border:1px solid rgba(91,104,80,.16);','background:#fffdf7;border:1px solid rgba(91,104,80,.16);');
html=html.replace(/\.invitation::before\{content:"";position:absolute;top:0;left:0;width:290px;height:290px;pointer-events:none;z-index:1;background:radial-gradient\(circle at top left,rgba\(255,253,247,1\) 0%,rgba\(250,247,239,\.96\) 48%,rgba\(248,244,233,\.70\) 72%,rgba\(248,244,233,0\) 100%\)\}/g,'');
html=html.replace('.invitation::before{width:220px;height:220px}','');
if(html===original) throw new Error('Expected invitation background styles not found');
fs.writeFileSync(path,html);
// trigger one-time workflow
