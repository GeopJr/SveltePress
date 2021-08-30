// Use this file to override the main config
import { optimizeImports } from 'carbon-preprocess-svelte';
import sveltePreprocess from 'svelte-preprocess';

export const config = {
	preprocess: [
		optimizeImports(),
		sveltePreprocess({
			scss: true,
			sass: true,
			replace: [
				[
					'carbon-components-svelte/css/all.css',
					process.env.NODE_ENV === 'production'
						? '$lib/SveltePress/theme/styles/global.scss'
						: 'carbon-components-svelte/css/all.css'
				]
			]
		})
	]
};