import { optimizeImports } from 'carbon-preprocess-svelte';
import node from '@sveltejs/adapter-node';
import vercel from '@sveltejs/adapter-vercel';
import netlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: optimizeImports(),
	kit: {
		// Use your desired adapter
		// static is not currently supported
		// by SveltePress due to the slug
		adapter: vercel(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#SveltePress'
	}
};

export default config;
