import Handlebars from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';
import Config from '../../sveltePress.config.js';

const title = Config.title;
const safeTitle = title.replace(/[^a-z]/gi, '').toLowerCase();

const editables = [
	{
		input: './lib/title.dart',
		template: { title: title }
	},
	{
		input: './android/app/src/main/AndroidManifest.xml',
		template: { title: title }
	},
	{
		input: './ios/Flutter/AppFrameworkInfo.plist',
		template: {
			title: title,
			bundle: 'dev.geopjr.sveltepress.' + safeTitle
		}
	},
	{
		input: './linux/default.desktop',
		template: {
			title: title,
			exec: safeTitle
		}
	},
	{
		input: './web/manifest.json',
		template: {
			title: title,
			short: safeTitle
		}
	}
];

for (let i = 0; i < editables.length; i++) {
	const hbsString = readFileSync(editables[i].input + '.hbs', 'utf8');
	const template = Handlebars.compile(hbsString);
	const compiled = template(editables[i].template);

	writeFileSync(editables[i].input, compiled);
}
