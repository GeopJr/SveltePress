import fs from 'fs';
import Handlebars from 'handlebars';
import { readFileSync, writeFileSync } from 'fs';
import Config from '../../sveltePress.config.js';

const currentName = JSON.parse(readFileSync('./deploy/config.json', 'utf8')).appName;
const title = Config.title;
const safeTitle = title.replace(/[^a-z]/gi, '').toLowerCase();

const editables = [
	{
		input: `./deploy/linux/${currentName}/default.desktop`,
		template: { title: title }
	},
	{
		input: `./deploy/darwin/${currentName}/Contents/Info.plist`,
		template: { bundle: safeTitle }
	}
];

for (let i = 0; i < editables.length; i++) {
	const hbsString = readFileSync(editables[i].input + '.hbs', 'utf8');
	const template = Handlebars.compile(hbsString);
	const compiled = template(editables[i].template);

	writeFileSync(editables[i].input, compiled);
}

writeFileSync('./deploy/config.json', JSON.stringify({ appName: title }));

const platforms = ['linux', 'win32', 'darwin'];
for (const folder of platforms) {
	// const mac = folder === "darwin" ? "/Contents" : ""
	fs.renameSync(
		`./deploy/${folder}/${currentName}/`,
		`./deploy/${folder}/${title.replace(/[^a-z0-9]/gi, '')}/`
	);
}
