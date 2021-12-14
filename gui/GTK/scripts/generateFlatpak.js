import Config from '../../../sveltePress.config.js';
import { writeFileSync } from 'fs';
const name = Config.title.replace(/[^a-z0-9]/gi, '');
const nameSafe = name.replace(/[^a-z]/gi, '').toLowerCase();

const recipe = {
	'app-id': `dev.geopjr.sveltepress.${nameSafe}`,
	runtime: 'org.gnome.Platform',
	'runtime-version': '40',
	sdk: 'org.gnome.Sdk',
	command: `${nameSafe}.sh`,
	'finish-args': ['--socket=wayland', '--socket=fallback-x11', '--share=ipc'],
	modules: [
		{
			name: 'nodejs',
			cleanup: [
				'/include',
				'/share',
				'/app/lib/node_modules/npm/changelogs',
				'/app/lib/node_modules/npm/doc',
				'/app/lib/node_modules/npm/html',
				'/app/lib/node_modules/npm/man',
				'/app/lib/node_modules/npm/scripts'
			],
			sources: [
				{
					type: 'archive',
					url: 'https://nodejs.org/dist/v16.6.2/node-v16.6.2-linux-x64.tar.xz',
					sha256: '90c88cf6ca06dcd6d20c2b6dba5ff84d1f831446c25ef650f86e86bb94239353'
				}
			]
		},
		{
			name: 'sveltepress-gtk',
			buildsystem: 'simple',
			'build-commands': [
				'npm install --prefix=electron-quick-start --offline --cache=$FLATPAK_BUILDER_BUILDDIR/flatpak-node/npm-cache',
				'npm run build',
				'mkdir /app/bin',
				'cp -ra dist/* /app/main/',
				`desktop-file-edit --set-key=Name --set-value='${name}' /app/share/applications/dev.geopjr.sveltepress.${nameSafe}.desktop`,
				`desktop-file-edit --set-key=Exec --set-value='${nameSafe}.sh %F' /app/share/applications/dev.geopjr.sveltepress.${nameSafe}.desktop`,
				'install -D -m 0755 dist/ /app/bin/dist/',
				`install -D -m 0644 dev.geopjr.sveltepress.${nameSafe}.png /app/share/icons/hicolor/0x0/apps/dev.geopjr.sveltepress.${nameSafe}.png`
			],
			sources: [
				{
					type: 'script',
					'dest-filename': `${nameSafe}.sh`,
					commands: ['node /app/main/index.cjs']
				},
				'generated-sources.json',
				{
					type: 'file',
					path: '../../sveltepresslogo.png',
					'dest-filename': `dev.geopjr.sveltepress.${nameSafe}.png`
				},
				{
					type: 'file',
					path: 'extra/app.desktop',
					'dest-filename': `dev.geopjr.sveltepress.${nameSafe}.desktop`
				}
			]
		}
	]
};

writeFileSync(`dev.geopjr.sveltepress.${nameSafe}.json`, JSON.stringify(recipe, null, 2));
