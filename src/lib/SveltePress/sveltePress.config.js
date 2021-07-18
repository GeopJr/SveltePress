export default {
	// Nav Items shown at the navbar/app menu
	nav: [
		{
			link: '/guide',
			name: 'Guide'
		}
	],
	// This is used in the default index.svelte
	// for the main button. It's a href.
	default: '/guide',
	// Used in title meta tag
	title: 'SveltePress',
	// Sorting method
	// Types: alphabetically, modified
	// alphabetically => A-Z (reverse: Z-A) [default]
	// modified => last modified (reverse: first modified)
	sorting: {
		type: "alphabetically",
		reverse: false
	}
};
