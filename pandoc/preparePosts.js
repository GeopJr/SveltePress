import Sidebar from '../src/lib/SveltePress/db/sveltePressSidebar.js';
import Index from '../src/lib/SveltePress/db/sveltePressIndex.js';
import { mdConverter } from '../src/lib/SveltePress/markdown/MDConverter.js';

import { writeFileSync } from 'fs';

const combinedGrandparents = [];

for (const [key, value] of Sidebar) {
	let grandparent = '';
	for (const [keyP, valueP] of value) {
		let isGrandparent = false;
		if (keyP.toLowerCase() !== key + '/readme.md') {
			grandparent += `<h1>${valueP.name}</h1>`;
		} else {
			isGrandparent = true;
		}
		for (const [keyC, valueC] of valueP.files) {
			// Used for top level posts
			if (isGrandparent == true) {
				isGrandparent = false;
				grandparent += `<h1>${valueC}</h1>`;
			}
			// Every Hx has to become H(x+1) for a better table of contents
			grandparent += mdConverter(Index.get(keyC).replace(/^(#{1,5})/gm, '$1#')).replace(
				/\<img.+src=[\"|\'](?!https?:\/\/)(.+?)[\"|\']/gi,
				'<img src="../static/$1"'
			);
		}
	}
	combinedGrandparents.push(grandparent);
}

for (let i = 0; i < combinedGrandparents.length; i++) {
	writeFileSync('input/' + i + '.html', combinedGrandparents[i]);
}
