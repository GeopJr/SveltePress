<script>
	import Content from '$lib/SveltePress/theme/content.svelte';

	export let pagination = {};
	export let meta = {};
</script>

<Content {pagination} {meta}>
	<slot />
</Content>
