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
					'import \'$lib/SveltePress/theme/styles/global.scss\'',
					process.env.NODE_ENV === 'production'
						? 'import \'$lib/SveltePress/theme/styles/global.scss\''
						: 'import \'carbon-components-svelte/css/all.css\';import \'$lib/SveltePress/theme/styles/patches.scss\''
				]
			]
		})
	]
};