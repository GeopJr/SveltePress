import sveltePreprocess from 'svelte-preprocess';
import generatePrerenderRoutes from './generatePrerenderRoutes.js';
import { config as themeConfig } from './src/lib/SveltePress/theme/meta/svelte.config.js';
// Pick one of the adapters listed below
// or install and use others
import node from '@sveltejs/adapter-node';
import vercel from '@sveltejs/adapter-vercel';
import netlify from '@sveltejs/adapter-netlify';
import staticAdptr from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Use your desired adapter
		adapter: vercel(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#SveltePress',
		vite: () => ({
			// Purges too much, disabled for now
			// plugins: [process.env.NODE_ENV === 'production' && optimizeCss()],
			server: {
				watch: {
					ignored: ['./gui/', './create-sveltepress-app', './pandoc/']
				}
			},
			...themeConfig.kit?.vite?.()
		})
	},
	preprocess: [
		sveltePreprocess({
			scss: true,
			sass: true
		}),
		...themeConfig.preprocess
	],
};

if (config.kit?.adapter?.name === '@sveltejs/adapter-static') {
	config.kit.prerender = {
		crawl: true,
		enabled: true,
		pages: generatePrerenderRoutes()
	};
}

export default config;
