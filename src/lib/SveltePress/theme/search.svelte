<script>
	import { HeaderSearch } from 'carbon-components-svelte';

	export let value;
	export let results;
	export let selectedHref = '';
</script>

<HeaderSearch
	placeholder="Search"
	bind:value
	{results}
	on:select={(e) => {
		selectedHref = e.detail.selectedResult.href;
	}}
/>
