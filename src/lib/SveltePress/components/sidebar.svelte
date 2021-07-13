<script>
	import { page, session } from '$app/stores';

	import Sidebar from '$lib/SveltePress/theme/sidebar.svelte';

	const parent = $page.params.group?.split('/');
	const guide = parent ? $session.get(parent[0]) : null;

	$: groupMap = guide ? [...guide] : [];

	export let isSideNavOpen;
</script>

{#if groupMap.length > 0}
	<Sidebar bind:isSideNavOpen {groupMap} />
{/if}
