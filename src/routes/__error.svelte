<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status,
				error: `${error.message}`
			}
		};
	}
</script>

<script>
	import Content from '$lib/SveltePress/components/content.svelte';
	export let status, error;
</script>

<Content>
	<h1 class="sp--error-status-code">{status}</h1>
	{error}
</Content>

<style>
	.sp--error-status-code {
		font-size: 5rem;
		font-weight: bold;
		color: var(--cds-button-primary, #ff3e00);
	}
</style>
