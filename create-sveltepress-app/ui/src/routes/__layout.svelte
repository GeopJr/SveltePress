<script>
	import Theme from '$lib/Theme.svelte';
	import Nav from '$lib/components/nav.svelte';
	import Content from '$lib/components/content.svelte';
	import { page } from '$app/stores';

	import '$lib/styles/global.scss';

	let isSideNavOpen = false;

	const pages = ['/dashboard', '/features', '/create'];
	$: hasSidebar = pages.includes($page.url.pathname.toLowerCase());
	$: selectedPage = hasSidebar ? $page.url.pathname.toLowerCase() : undefined;
</script>

<Theme />

<Nav {hasSidebar} {selectedPage} bind:isSideNavOpen />

<Content {hasSidebar}>
	<slot />
</Content>
