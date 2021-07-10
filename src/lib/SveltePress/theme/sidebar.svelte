<script>
	import { page } from '$app/stores';

	import {
		SideNav,
		SideNavItems,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		SideNavMenu
	} from 'carbon-components-svelte';

	import { getName, getUrl } from '$lib/SveltePress/components/sidebar';

	export let isSideNavOpen;
	export let groupMap;

	// SideNavLinks and SideNavMenuItems
	// should have on:click={() => (isSideNavOpen = false)}
	// but only on `md` else desktop wont be able to reopen
	// the sidebar
</script>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		{#each groupMap as [, valueP], i}
			{#if i === 0}
				<SideNavLink class="sp--sidebar-grandparent" text={getName(valueP)} />
				{#if valueP && [...valueP.files].length > 0}
					<SideNavDivider />
					{#each [...valueP.files] as [key, value]}
						<SideNavLink
							sveltekit:prefetch
							text={getName(value)}
							href={getUrl(key, value)}
							isSelected={'/' + Object.values($page.params).join('/') === getUrl(key, value)}
						/>
					{/each}
				{/if}
			{:else}
				<SideNavMenu text={getName(valueP)} expanded="true">
					{#each [...valueP.files] as [key, value]}
						<SideNavMenuItem
							sveltekit:prefetch
							text={getName(value)}
							href={getUrl(key, value)}
							isSelected={'/' + Object.values($page.params).join('/') === getUrl(key, value)}
						/>
					{/each}
				</SideNavMenu>
			{/if}
			<SideNavDivider />
		{/each}
	</SideNavItems>
</SideNav>
