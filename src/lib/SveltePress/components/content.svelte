<script>
	import Content from '$lib/SveltePress/theme/content.svelte';

	export let pagination = {};
</script>

<Content {pagination}>
	<slot />
</Content>
