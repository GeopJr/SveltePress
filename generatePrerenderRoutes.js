import sidebar from './src/lib/SveltePress/db/sveltePressSidebar.js';

export default function generatePrerenderRoutes() {
	const routes = [];

	for (const [, value] of sidebar) {
		for (const [, valueP] of value) {
			for (const [keyC] of valueP.files) {
				routes.push('/' + encodeURI(keyC.replace(/\.[^/.]+$/, '')));
			}
		}
	}

	console.log('\x1b[33m%s\x1b[0m', '[SveltePress]: Generated prerender routes');

	return routes;
}
