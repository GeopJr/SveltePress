<script>
	import { page } from '$app/stores';

	import '$lib/SveltePress/theme/styles/global.scss';

	import 'highlight.js/styles/hybrid.css';

	import Theme from '$lib/SveltePress/Theme.svelte';

	import Navbar from '$lib/SveltePress/components/navbar.svelte';
	import Sidebar from '$lib/SveltePress/components/sidebar.svelte';

	// Whether to show the sidebar or not
	$: sidebar = $page.path !== '/';

	let isSideNavOpen = false;
</script>

<Theme />

<Navbar {sidebar} bind:isSideNavOpen />

{#if sidebar}
	<Sidebar bind:isSideNavOpen />
{/if}

<slot />
