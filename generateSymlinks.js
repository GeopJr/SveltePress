import { symlinkSync, existsSync } from 'fs';
import { resolve, join, dirname, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const paths = {
	'sveltePress.config.js': './src/lib/SveltePress/sveltePress.config.js',
	'gui/Flutter/assets': '../../static/',
	'gui/QT/assets': '../../static/',
	'gui/GTK/assets': '../../static/'
};

export function createSymLinks(win = process.platform === 'win32') {
	Object.keys(paths).forEach((key) => {
		paths[resolve(join(__dirname, key))] = paths[key];
		delete paths[key];
	});
	for (const dest of Object.keys(paths)) {
		const target = paths[dest];
		const isFolder = target.endsWith('/');
		if (isFolder && !existsSync(dest.split(sep).slice(0, -1).join(sep))) continue;

		try {
			symlinkSync(target, dest, isFolder ? 'dir' : 'file');
		} catch (e) {
			if (e.code === 'EPERM' && win) {
				console.log('\x1b[31m%s\x1b[0m', `Windows requires Admin to make symlinks`);
				console.log(
					'\x1b[31m%s\x1b[0m',
					`Please run 'node generateSymlinks.js' on a terminal with Admin Privileges from your SveltePress project root`
				);

				// Removed because admin requires a password (blank doesnt work)
				// execSync(
				//     'runas /user:Administrator "node generateSymlinks.js"',
				//     { stdio: 'inherit' }
				// );
				process.exit(1);
			} else if (e.code === 'EEXIST') {
				console.log(`Symlink '${dest}' already exists, skipped.`);
			}
		}
	}
}

createSymLinks();
