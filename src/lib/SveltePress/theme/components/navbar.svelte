<script>
	import { page } from '$app/stores';
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		SkipToContent,
		HeaderUtilities,
		HeaderNavMenu,
		HeaderAction,
		Button,
		HeaderPanelDivider,
		HeaderPanelLinks,
		HeaderPanelLink
	} from 'carbon-components-svelte';
	import Search from '$lib/SveltePress/components/search.svelte';
	import { theme } from '../../../../stores';

	import RadioButton20 from 'carbon-icons-svelte/lib/RadioButton20';
	import Contrast20 from 'carbon-icons-svelte/lib/Contrast20';
	import Sun20 from 'carbon-icons-svelte/lib/Sun20';
	import Moon20 from 'carbon-icons-svelte/lib/Moon20';

	const themes = {
		light: ['g10', 'white'],
		dark: ['g90', 'g100']
	};

	function hasContrast(themeName) {
		return ['g90', 'g10'].includes(themeName);
	}
	function isDark(themeName) {
		return ['g100', 'g90'].includes(themeName);
	}

	function setTheme(toggleTheme = true) {
		let themeType = isDark($theme) ? 'dark' : 'light';
		let contrastType = hasContrast($theme) ? 0 : 1;
		if (toggleTheme) {
			themeType = themeType === 'dark' ? 'light' : 'dark';
		} else {
			contrastType = contrastType === 1 ? 0 : 1;
		}
		theme.set(themes[themeType][contrastType]);
	}

	function isExternal(link) {
		const host = 'https://' + $page.host;
		return new URL(link, host).origin !== host;
	}

	$: contrastIcon = hasContrast($theme) ? RadioButton20 : Contrast20;
	$: themeIcon = isDark($theme) ? Sun20 : Moon20;

	let isOpen = false;

	export let isSideNavOpen;
	export let nav;
</script>

<Header company="Svelte" platformName="Press" href="/" bind:isSideNavOpen>
	<div slot="skip-to-content">
		<SkipToContent />
	</div>

	<HeaderNav>
		{#if nav.length > 5}
			<HeaderNavMenu text="Pages">
				{#each nav as navItem}
					<HeaderNavItem
						href={navItem.link}
						text={navItem.name}
						target={isExternal(navItem.link) ? '_blank' : undefined}
						rel={isExternal(navItem.link) ? 'noopener' : undefined}
						sveltekit:prefetch={!isExternal(navItem.link) ? true : null}
					/>
				{/each}
			</HeaderNavMenu>
		{:else}
			{#each nav as navItem}
				<HeaderNavItem
					href={navItem.link}
					text={navItem.name}
					target={isExternal(navItem.link) ? '_blank' : undefined}
					rel={isExternal(navItem.link) ? 'noopener' : undefined}
					sveltekit:prefetch={!isExternal(navItem.link) ? true : null}
				/>
			{/each}
		{/if}
	</HeaderNav>
	<HeaderUtilities>
		<Search />
		<div class="sp--theme-switcher-button">
			<Button
				iconDescription="Toggle Contrast"
				icon={contrastIcon}
				kind="secondary"
				on:click={() => setTheme(false)}
			/>
			<Button
				iconDescription="Toggle Theme"
				icon={themeIcon}
				kind="secondary"
				on:click={() => setTheme()}
				tooltipAlignment="end"
			/>
		</div>
		<div class="sp--app-menu">
			<HeaderAction bind:isOpen>
				<HeaderPanelLinks>
					{#each nav as navItem}
						<HeaderPanelLink
							href={navItem.link}
							target={isExternal(navItem.link) ? '_blank' : undefined}
							rel={isExternal(navItem.link) ? 'noopener' : undefined}
							sveltekit:prefetch={!isExternal(navItem.link) ? true : null}
							>{navItem.name}</HeaderPanelLink
						>
					{/each}
					<HeaderPanelDivider />
					<HeaderPanelLink on:click={() => setTheme(false)}>Toggle Contrast</HeaderPanelLink>
					<HeaderPanelLink on:click={() => setTheme()}>Toggle Theme</HeaderPanelLink>
				</HeaderPanelLinks>
			</HeaderAction>
		</div>
	</HeaderUtilities>
</Header>

<style lang="scss">
	.sp--theme-switcher-button {
		display: none;
		@media only screen and (min-width: 1056px) {
			display: inline-flex;
		}
	}
	.sp--app-menu {
		display: inline-flex;
		@media only screen and (min-width: 1056px) {
			display: none;
		}
	}
</style>
