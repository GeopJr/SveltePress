<script>
	import { onMount, afterUpdate } from 'svelte';
	import { theme } from '../../stores';

	const key = 'theme';
	const themesArr = ['g100', 'g90', 'g10', 'white'];
	const isThemeAvailable = (x) => themesArr.includes(x);

	onMount(() => {
		const savedTheme = localStorage.getItem(key);
		let tmpTheme = themesArr[0];
		if (isThemeAvailable(savedTheme)) {
			tmpTheme = savedTheme;
		} else if (matchMedia('(prefers-color-scheme: light)')?.matches) {
			tmpTheme = themesArr[3];
		}
		theme.set(tmpTheme);
	});

	afterUpdate(() => {
		if (!isThemeAvailable($theme)) return;

		document.documentElement.setAttribute('theme', $theme);
		// Some themes use this attribute
		document.documentElement.setAttribute('data-theme', $theme);
		localStorage.setItem(key, $theme);
	});
</script>

<slot />
