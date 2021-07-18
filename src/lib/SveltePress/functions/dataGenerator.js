import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import md2fm from '../MD2FM.js';
import path from 'path';
import Jsesc from 'jsesc';
import Config from '../sveltePress.config.js';

export default function createPressData(
	source = 'pages/',
	generateIndex = false,
	generateSearchIndex = false,
	recursive = false
) {
	const data = new Map([
		['default', new Map()],
		['files', new Map()],
		['folders', new Map()]
	]);

	let index = new Map();

	let pages = readdirSync(source, { withFileTypes: true }).filter(
		(x) => x.name.toLowerCase().endsWith('.md') || x.isDirectory()
	);
	if (Config.sorting.type.toLowerCase() === 'modified') {
		pages.map((x) => (x.date = statSync(path.join(source, x.name)).mtime));
		pages = pages.sort((a, b) => b.date - a.date);
	} else {
		pages = pages.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()));
	}
	if (Config.sorting.reverse) {
		pages = pages.reverse();
	}

	pages.forEach((item) => {
		const relativePath = path.relative('pages/', source + '/' + item.name);
		if (item.isDirectory()) {
			const nestedFolder = createPressData(
				path.join(source, item.name),
				generateIndex,
				generateSearchIndex,
				true
			);
			data.get('folders').set(item.name, nestedFolder[0]);
			index = new Map([...index, ...nestedFolder[1]]);
			const folder = data.get('folders').get(item.name);
			if (folder.get('default').size === 0) {
				folder.set(
					'default',
					new Map([
						['name', item.name],
						['relativePath', relativePath]
					])
				);
			} else if (!folder.get('default').get('name')) {
				folder.get('default').set('name', item.name);
			}
		} else if (item.isFile()) {
			const date = item.date?.toGMTString() ?? statSync(path.join(source, item.name)).mtime.toGMTString();
			const noCase = item.name.replace(/\.[^/.]+$/, '');
			const fm = md2fm(readFileSync(`${source}/${noCase}.md`).toString());
			const body = new Map([
				['name', noCase],
				['postName', fm.attributes.postName || noCase],
				['relativePath', relativePath],
				['date', date]
			]);

			if (item.name.toLowerCase() === 'readme.md') {
				body.set('name', fm.attributes.groupName || undefined);
				data.set('default', body);
			} else {
				data.get('files').set(item.name, body);
				if (generateSearchIndex) {
					index.set(relativePath, fm.body);
				}
			}
		}
	});
	if (generateIndex && !recursive) {
		writeFileSync(
			'./src/lib/SveltePress/db/sveltePressData.js',
			'export default ' + Jsesc(data, { compact: true, es6: true })
		);
	}

	if (generateSearchIndex && !recursive) {
		writeFileSync(
			'./src/lib/SveltePress/db/sveltePressIndex.js',
			'export default ' + Jsesc(index, { compact: true, es6: true })
		);
	}
	return [data, index];
}
