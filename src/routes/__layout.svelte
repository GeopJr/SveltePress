<script>
	import { page } from '$app/stores';
	import 'carbon-components-svelte/css/all.css';
	import 'highlight.js/styles/hybrid.css';

	import Theme from '$lib/SveltePress/Theme.svelte';

	import Navbar from '$lib/SveltePress/components/navbar.svelte';
	import Sidebar from '$lib/SveltePress/components/sidebar.svelte';

	// Whether to show the sidebar or not
	$: sidebar = $page.path !== '/';

	let isSideNavOpen = false;
</script>

<Theme />

<Navbar bind:isSideNavOpen />

{#if sidebar}
	<Sidebar bind:isSideNavOpen />
{/if}

<slot />

<style lang="css">
	:global(.sp--sidebar-grandparent) {
		pointer-events: none;
	}
	:global(.bx--btn) {
		overflow-wrap: anywhere;
		/* Safari & Opera */
		word-break: break-word;
	}
	:global(.bx--switcher__item-link:focus) {
		outline-color: var(--cds-button-primary);
	}
	:global(#main-content) :global(ul) {
		list-style-type: square;
	}
	:global(li) {
		line-height: var(--cds-body-long-02-line-height, 1.5);
	}
	:global(a) {
		color: var(--cds-button-primary);
		line-height: var(--cds-body-long-02-line-height, 1.5);
	}
	:global(blockquote) {
		background-color: var(--cds-ui-background);
		padding: 0.2rem 1rem;
		margin: 1rem 0;
	}
	:global(p) > :global(code) {
		background-color: var(--cds-ui-background);
	}
	:global(p) > :global(img) {
		max-width: 100%;
	}
	:global(pre) {
		background-color: var(--cds-ui-background);
		margin: 1.2rem 0;
		padding: 1rem;
	}
	:global(:root[theme='g10']) :global(pre),
	:global(:root[theme='white']) :global(pre) {
		background-color: var(--cds-ui-03);
	}
	:global(pre),
	:global(code) {
		white-space: pre-wrap;
	}
	:global(.bx--btn--primary:hover) {
		background-color: var(--cds-button-primary-hover);
	}
	:global(.bx--side-nav ~ .bx--content) {
		margin-left: 0;
	}
	:global(:root),
	:global(:root[theme='g10']),
	:global(:root[theme='g100']),
	:global(:root[theme='g90']),
	:global(:root[theme='white']) {
		--cds-body-long-02-line-height: 1.8;
		--cds-interactive-01: #ff3e00;
		--cds-button-primary: #ff3e00;
		--cds-button-primary-hover: #e23900;
		--cds-button-primary-active: #c23000;
		--cds-focus: var(--cds-button-primary);
	}
	:global(a.bx--side-nav__link[aria-current='page']::before),
	:global(a.bx--side-nav__link--current::before) {
		background-color: var(--cds-button-primary);
	}
	:global(a.bx--header__name:focus),
	:global(.bx--header__action:focus),
	:global(a.bx--header__menu-item:focus),
	:global(.bx--skip-to-content:focus) {
		border-color: var(--cds-button-primary);
	}

	:global([role='search'].active) {
		outline-color: var(--cds-button-primary) !important;
	}
</style>
