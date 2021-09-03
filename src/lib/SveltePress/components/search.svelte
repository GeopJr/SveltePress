<script context="module">
	import FlexSearch from 'flexsearch';
	import searchIndex from '$lib/SveltePress/db/sveltePressIndex';

	const index = new FlexSearch.Index({ tokenize: 'forward' });

	for (const [key, value] of searchIndex) {
		index.add(key, value);
	}
</script>

<script>
	import { dev } from '$app/env';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Search from '$lib/SveltePress/theme/components/search.svelte';
	import sidebar from '$lib/SveltePress/db/sveltePressSidebar';

	const parent = $page.params?.group?.split('/')[0];

	function search(text) {
		// Search is disabled on dev mode
		// to avoid performance issues
		if (dev ?? true) return [];
		// Only show for same GRANDPARENT unless there's none
		const results = index.search(text).filter((x) => (parent ? x.split('/')[0] === parent : true));
		return results.length > 0 ? prepareResults(results) : [];
	}

	function prepareResults(results) {
		const response = [];
		for (let i = 0; i < results.length; i++) {
			const fullPath = '/' + results[i].replace(/\.[^/.]+$/, '');
			const grandParent = results[i].split('/')[0];
			let title = '';
			for (const [, value] of sidebar.get(grandParent)) {
				if (value.files.has(results[i])) {
					title = value.files.get(results[i]);
					break;
				}
			}
			response.push({
				href: fullPath,
				text: title
			});
		}
		return response;
	}

	let value = '';
	let selectedHref = '';

	export let isOpen;

	$: results = search(value);

	$: if (selectedHref && selectedHref.length > 0) {
		goto(selectedHref);
		isOpen = false;
	}
</script>

<Search bind:value bind:isOpen {results} bind:selectedHref />
