<script>
	import Navbar from '$lib/SveltePress/theme/components/navbar.svelte';
	import ConfigSP from '$lib/SveltePress/sveltePress.config';
	import { session } from '$app/stores';

	let nav = ConfigSP.nav.overwrite
		? ConfigSP.nav.items || []
		: $session.get('navbar').concat(ConfigSP.nav.items || []);

	export let isSideNavOpen;
	export let sidebar;
</script>

<Navbar {sidebar} bind:isSideNavOpen {nav} />
