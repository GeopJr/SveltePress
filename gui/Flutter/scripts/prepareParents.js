import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from '../../../src/lib/SveltePress/db/sveltePressSidebar.js';
import Index from '../../../src/lib/SveltePress/db/sveltePressIndex.js';
import { mdConverter } from '../../../src/lib/SveltePress/markdown/MDConverter.js';

const finArr = [];

for (const [key, value] of Sidebar) {
	const obj = {};
	const postsArr = [];
	let name = key;
	for (const [keyP, valueP] of value) {
		if (keyP.toLowerCase() === key + '/readme.md') {
			name = valueP.name;
		} else {
			postsArr.push({
				parent: true,
				name: valueP.name,
				html: '',
				id: ''
			});
		}
		for (const [keyC, valueC] of valueP.files) {
			postsArr.push({
				parent: false,
				name: valueC,
				html: mdConverter(Index.get(keyC)).replace(
					/\<img.+src=[\"|\'](?!https?:\/\/)(.+?)[\"|\']/gi,
					'<img src="asset:assets$1"'
				),
				id: uuidv4()
			});
		}
	}
	obj.name = name;
	obj.posts = postsArr;
	finArr.push(obj);
}

writeFileSync('./index.json', JSON.stringify(finArr));
