import { symlinkSync, existsSync } from 'fs';
// import { execSync } from 'child_process';

const isWin = process.platform === 'win32';

const paths = {
	'./sveltePress.config.js': './src/lib/SveltePress/sveltePress.config.js',
	'./gui/Flutter/assets': '../../static/',
	'./gui/QT/assets': '../../static/',
	'./gui/GTK/assets': '../../static/'
};

function createSymLinks(win = isWin) {
	for (const dest of Object.keys(paths)) {
		const target = paths[dest];
		const isFolder = target.endsWith('/');
		// Skip if paths dont exist
		if (!existsSync(isFolder ? dest.split('/').slice(0, -1).join('/') : target)) continue;
		try {
			symlinkSync(target, dest, isFolder ? 'dir' : 'file');
		} catch (e) {
			if (e.code === 'EPERM' && win) {
				console.log('\x1b[31m%s\x1b[0m', `Windows requires Admin to make symlinks`);
				console.log(
					'\x1b[31m%s\x1b[0m',
					`Please run 'node generateSymlinks.js' on an terminal with Admin Privileges`
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

createSymLinks(isWin);
