<script>
	import { SideNav, SideNavItems, SideNavLink } from 'carbon-components-svelte';
	import Dashboard24 from 'carbon-icons-svelte/lib/Dashboard24';
	import Edit24 from 'carbon-icons-svelte/lib/Edit24';
	import Gui24 from 'carbon-icons-svelte/lib/Gui24';

	export let isSideNavOpen;
	export let selectedPage;
</script>

<SideNav bind:isOpen={isSideNavOpen} rail>
	<SideNavItems>
		<SideNavLink
			sveltekit:prefetch
			icon={Dashboard24}
			text="Dashboard"
			href="/dashboard"
			isSelected={selectedPage === '/dashboard'}
		/>
		<SideNavLink
			sveltekit:prefetch
			icon={Edit24}
			text="Create a Post"
			href="/create"
			isSelected={selectedPage === '/create'}
		/>
		<SideNavLink
			sveltekit:prefetch
			icon={Gui24}
			text="Features"
			href="/features"
			isSelected={selectedPage === '/features'}
		/>
	</SideNavItems>
</SideNav>
