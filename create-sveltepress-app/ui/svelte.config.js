import { optimizeImports } from 'carbon-preprocess-svelte';
import sveltePreprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: node(),
	},
	preprocess: [
		optimizeImports(),
		sveltePreprocess({
			scss: true,
			sass: true,
			replace: [
				[
					"import '$lib/styles/global.scss'",
					process.env.NODE_ENV === 'production'
						? "import '$lib/styles/global.scss'"
						: "import 'carbon-components-svelte/css/all.css';import '$lib/styles/patches.scss'"
				]
			]
		})
	]
};

export default config;
