import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import md2fm from '../markdown/MD2FM.js';
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

	// Loop through all files
	for (const item of pages) {
		const relativePath = path.relative('pages/', source + '/' + item.name);
		if (item.isDirectory()) {
			// Recursively get all sub-folders and files
			const nestedFolder = createPressData(
				path.join(source, item.name),
				generateIndex,
				generateSearchIndex,
				true
			);
			// If folder is draft, continue
			// This includes all sub-folders and their files inside the folder
			if (nestedFolder[0].get('default').size > 0 && nestedFolder[0].get('default').get('draft'))
				continue;

			// Add them to the data map
			data.get('folders').set(item.name, nestedFolder[0]);
			const folder = data.get('folders').get(item.name);
			// If there was no readme, set defaults
			if (folder.get('default').size === 0) {
				folder.set(
					'default',
					new Map([
						['name', item.name],
						['relativePath', relativePath],
						['draft', false]
					])
				);
			} else if (!folder.get('default').get('name')) {
				// If the readme has no custom name, set it as the filename
				folder.get('default').set('name', item.name);
			}

			// Add to search index
			index = new Map([...index, ...nestedFolder[1]]);
		} else if (item.isFile()) {
			// Set date as last modified unless it was set in the sorting section
			const date =
				item.date?.toGMTString() ?? statSync(path.join(source, item.name)).mtime.toGMTString();
			const noCase = item.name.replace(/\.[^/.]+$/, '');
			const fm = md2fm(readFileSync(`${source}/${noCase}.md`).toString());
			const body = new Map([
				['name', noCase],
				['postName', fm.attributes.postName || noCase],
				['relativePath', relativePath],
				['date', date]
			]);

			if (item.name.toLowerCase() === 'readme.md') {
				body.set('draft', fm.attributes.draft || false);
				body.set('name', fm.attributes.groupName || undefined);
				data.set('default', body);
			} else {
				// Continue if file is a draft
				if (fm.attributes.draft) continue;

				data.get('files').set(item.name, body);
				if (generateSearchIndex) {
					index.set(relativePath, fm.body);
				}
			}
		}
	}
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
