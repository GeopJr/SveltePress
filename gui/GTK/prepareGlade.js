import Handlebars from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';
import Sidebar from '../../src/lib/SveltePress/db/sveltePressSidebar.js';
import Config from '../../sveltePress.config.js';

const title = Config.title;

const hbsArr = [];

let id = 0;

for (const [key, value] of Sidebar) {
	const hbsObj = {};
	const posts = [];
	let name = key;
	for (const [keyP, valueP] of value) {
		if (keyP.toLowerCase() === key + '/readme.md') {
			name = valueP.name;
		} else {
			posts.push({
				parent: true,
				name: valueP.name,
				path: keyP, // useless
				pID: ++id
			});
		}
		for (const [keyC, valueC] of valueP.files) {
			posts.push({
				name: valueC,
				path: keyC,
				pID: ++id
			});
		}
	}
	hbsObj.name = name;
	hbsObj.posts = posts;
	hbsArr.push(hbsObj);
}

const glade = readFileSync('./ui.glade.hbs', 'utf8');
const template = Handlebars.compile(glade);
const compiled = template({ grandparents: hbsArr, title: title });

writeFileSync('./src/ui.glade', compiled);
