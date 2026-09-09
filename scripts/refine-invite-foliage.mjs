import fs from 'node:fs';

const path = 'index.html';
let html = fs.readFileSync(path, 'utf8');

html = html.replace(/\.floral-corner\{[^\n]*\}\n?/, '.floral-corner{position:absolute;z-index:2;pointer-events:none;opacity:.72;width:175px;height:auto;filter:saturate(.82)}.floral-corner.top-left{left:-8px;top:-8px}.floral-corner.bottom-right{right:-8px;bottom:-8px;transform:rotate(180deg)}\n');
html = html.replace(/@media\(max-width:760px\)\{([^}]*)\.floral-corner\{width:[^}]*\}\.floral-corner\.top-right\{[^}]*\}\.floral-corner\.bottom-left\{[^}]*\}/, (m,prefix) => `@media(max-width:760px){${prefix}.floral-corner{width:125px}.floral-corner.top-left{left:-5px;top:-5px}.floral-corner.bottom-right{right:-5px;bottom:-5px}`);

const topSvg = `<svg class="floral-corner top-left" viewBox="0 0 220 220" aria-hidden="true"><g fill="none" stroke="#7b846f" stroke-width="1.7" stroke-linecap="round" opacity=".8"><path d="M2 8 C38 31 58 53 76 82 C92 108 110 128 142 150"/><path d="M25 4 C46 22 62 39 72 58"/><path d="M3 48 C28 61 44 76 56 94"/></g><g fill="#9ea690" opacity=".72"><ellipse cx="26" cy="25" rx="7" ry="18" transform="rotate(-48 26 25)"/><ellipse cx="44" cy="42" rx="7" ry="17" transform="rotate(44 44 42)"/><ellipse cx="59" cy="57" rx="7" ry="18" transform="rotate(-43 59 57)"/><ellipse cx="74" cy="75" rx="7" ry="17" transform="rotate(46 74 75)"/><ellipse cx="88" cy="94" rx="7" ry="18" transform="rotate(-38 88 94)"/><ellipse cx="104" cy="113" rx="7" ry="17" transform="rotate(49 104 113)"/><ellipse cx="37" cy="66" rx="6" ry="15" transform="rotate(-58 37 66)"/><ellipse cx="51" cy="81" rx="6" ry="14" transform="rotate(37 51 81)"/><ellipse cx="40" cy="18" rx="6" ry="14" transform="rotate(-20 40 18)"/><ellipse cx="57" cy="33" rx="6" ry="13" transform="rotate(58 57 33)"/></g><g fill="#c8bd83" opacity=".55"><circle cx="17" cy="53" r="2.3"/><circle cx="31" cy="63" r="1.9"/><circle cx="82" cy="84" r="2.1"/></g></svg>`;
const bottomSvg = `<svg class="floral-corner bottom-right" viewBox="0 0 220 220" aria-hidden="true"><g fill="none" stroke="#7b846f" stroke-width="1.7" stroke-linecap="round" opacity=".8"><path d="M2 8 C38 31 58 53 76 82 C92 108 110 128 142 150"/><path d="M25 4 C46 22 62 39 72 58"/><path d="M3 48 C28 61 44 76 56 94"/></g><g fill="#9ea690" opacity=".72"><ellipse cx="26" cy="25" rx="7" ry="18" transform="rotate(-48 26 25)"/><ellipse cx="44" cy="42" rx="7" ry="17" transform="rotate(44 44 42)"/><ellipse cx="59" cy="57" rx="7" ry="18" transform="rotate(-43 59 57)"/><ellipse cx="74" cy="75" rx="7" ry="17" transform="rotate(46 74 75)"/><ellipse cx="88" cy="94" rx="7" ry="18" transform="rotate(-38 88 94)"/><ellipse cx="104" cy="113" rx="7" ry="17" transform="rotate(49 104 113)"/><ellipse cx="37" cy="66" rx="6" ry="15" transform="rotate(-58 37 66)"/><ellipse cx="51" cy="81" rx="6" ry="14" transform="rotate(37 51 81)"/><ellipse cx="40" cy="18" rx="6" ry="14" transform="rotate(-20 40 18)"/><ellipse cx="57" cy="33" rx="6" ry="13" transform="rotate(58 57 33)"/></g><g fill="#c8bd83" opacity=".55"><circle cx="17" cy="53" r="2.3"/><circle cx="31" cy="63" r="1.9"/><circle cx="82" cy="84" r="2.1"/></g></svg>`;

html = html.replace(/<svg class="floral-corner top-right"[\s\S]*?<\/svg>\n<svg class="floral-corner bottom-left"[\s\S]*?<\/svg>/, `${topSvg}\n${bottomSvg}`);

if (!html.includes('floral-corner top-left') || !html.includes('floral-corner bottom-right')) {
  throw new Error('Foliage replacement did not apply');
}

fs.writeFileSync(path, html);
