<script>
	import Content from '$lib/SveltePress/theme/components/content.svelte';

	export let pagination = {};
	export let meta = {};
</script>

<Content {pagination} {meta}>
	<slot />
</Content>
