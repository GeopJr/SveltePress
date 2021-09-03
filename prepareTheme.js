// Require it all so we use exp functions
// only available in > 16
import fs from 'fs';
import { join, relative } from 'path';
// Combine package jsons
if (fs.existsSync('./src/lib/SveltePress/theme/meta/package.json')) {
	const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

	const themePakcageJson = JSON.parse(
		fs.readFileSync('./src/lib/SveltePress/theme/meta/package.json', 'utf8')
	);

	['devDependencies', 'dependencies'].forEach((x) => {
		if (themePakcageJson.hasOwnProperty(x))
			packageJson[x] = { ...packageJson[x], ...themePakcageJson[x] };
	});

	fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
}

// Write index.svelte
if (fs.existsSync('./src/lib/SveltePress/theme/index.svelte'))
	fs.writeFileSync(
		'./src/routes/index.svelte',
		fs.readFileSync('./src/lib/SveltePress/theme/index.svelte', 'utf8')
	);

if (fs.existsSync('./src/lib/SveltePress/theme/meta/root/')) {
	// if cpSync is available
	if (typeof fs.cpSync === 'function') {
		// Don't override anything.
		fs.cpSync('./src/lib/SveltePress/theme/meta/root/', './', { force: false, recursive: true });
	} else {
		// < 16
		copyFiles('./src/lib/SveltePress/theme/meta/root/');

		// Recursive function
		function copyFiles(source) {
			const files = fs.readdirSync(source, { withFileTypes: true });
			for (const item of files) {
				const fullPath = join(source, item.name);
				const rootRelative = join(
					'./',
					relative('./src/lib/SveltePress/theme/meta/root/', fullPath)
				);
				if (item.isDirectory()) {
					if (!fs.existsSync(rootRelative)) fs.mkdirSync(rootRelative);
					copyFiles(fullPath);
				} else {
					try {
						fs.copyFileSync(fullPath, rootRelative, fs.constants.COPYFILE_EXCL);
					} catch (e) {
						if (e.code === 'EEXIST') {
							console.log(`File '${rootRelative}' already exists, skipped.`);
						}
					}
				}
			}
		}
	}
}
