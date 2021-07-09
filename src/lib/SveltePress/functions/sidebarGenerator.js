import createPressData from './dataGenerator.js';
import { writeFileSync } from 'fs';
import path from 'path';
import Jsesc from 'jsesc';

function createSidebarFolder(folder) {
	let response = new Map();
	const defaultBody = folder.get('default');
	if (defaultBody.size > 0) {
		const defaultPath = defaultBody.get('relativePath');

		const body = {};
		body['isGroup'] = true;

		const pathGroups = defaultPath.split('/');
		const index = pathGroups.length + (pathGroups.length > 1 ? -2 : -1);
		body['name'] = defaultBody.get('name') || pathGroups[index];

		response.set(defaultPath, body);
	}

	for (const [, value] of folder.get('files')) {
		response.set(value.get('relativePath'), value.get('postName'));
	}

	for (const [, value] of folder.get('folders')) {
		response = new Map([...response, ...createSidebarFolder(value)]);
	}

	return response;
}

export default function createSidebar(generateIndex = false) {
	const data = createPressData(path.resolve('pages/'))[0];
	const parentMap = new Map();
	const sidebar = new Map();

	for (const [key, value] of data.get('folders')) {
		parentMap.set(key, createSidebarFolder(value));
	}

	for (const [keyP, valueP] of parentMap) {
		let lastFolder;
		const tmpMap = new Map();

		for (const [key, value] of valueP) {
			const filePath = key.toLowerCase();
			if (
				(filePath.endsWith('/readme.md') || (typeof value === 'object' && value !== null)) &&
				lastFolder !== key
			) {
				value['files'] = new Map();
				tmpMap.set(key, value);
				lastFolder = key;
			} else {
				tmpMap.get(lastFolder)['files'].set(key, value);
			}
		}
		sidebar.set(keyP, tmpMap);
	}
	if (generateIndex) {
		writeFileSync(
			'./src/lib/SveltePress/db/sveltePressSidebar.js',
			'export default ' + Jsesc(sidebar, { compact: true, es6: true })
		);
	}
	return sidebar;
}
