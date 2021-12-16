<script>
	import { Header, SkipToContent, HeaderUtilities, Button } from 'carbon-components-svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	import { theme } from '../../stores';

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

	$: contrastIcon = hasContrast($theme) ? RadioButton20 : Contrast20;
	$: themeIcon = isDark($theme) ? Sun20 : Moon20;

	export let isSideNavOpen;
	export let hasSidebar = true;
	export let selectedPage;
</script>

<Header bind:isSideNavOpen company="Svelte" platformName="Press UI" href="/">
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
	<HeaderUtilities>
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
	</HeaderUtilities>
	{#if hasSidebar}
		<Sidebar bind:isSideNavOpen {selectedPage} />
	{/if}
</Header>
