<script>
	import { page, session } from '$app/stores';

	import Sidebar from '$lib/SveltePress/theme/components/sidebar.svelte';

	$: parent = $page.params.group?.split('/');
	$: guide = parent ? $session.get('sidebar').get(parent[0]) : null;
	$: groupMap = guide ? [...guide] : [];

	export let isSideNavOpen;
</script>

{#if groupMap.length > 0}
	<Sidebar bind:isSideNavOpen {groupMap} />
{/if}
