<script>
	import { Content, Grid, Row, Column, Button } from 'carbon-components-svelte';
	import ArrowRight32 from 'carbon-icons-svelte/lib/ArrowRight32';
	import ArrowLeft32 from 'carbon-icons-svelte/lib/ArrowLeft32';

	export let pagination = {};
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<slot />
			</Column>
		</Row>
	</Grid>
</Content>

<div class="pagination">
	{#if pagination.previous && pagination.previous.postName && pagination.previous.relativePath}
		<Button
			sveltekit:prefetch
			href={'/' + pagination.previous.relativePath.replace(/\.[^/.]+$/, '')}
			kind="secondary"
			size="xl"
			style="margin-right: auto;"
			icon={ArrowLeft32}
			>{pagination.previous.postName}
		</Button>
	{/if}
	{#if pagination.next && pagination.next.postName && pagination.next.relativePath}
		<Button
			sveltekit:prefetch
			href={'/' + pagination.next.relativePath.replace(/\.[^/.]+$/, '')}
			size="xl"
			style="margin-left: auto;"
			icon={ArrowRight32}>{pagination.next.postName}</Button
		>
	{/if}
</div>

<style lang="scss">
	.pagination {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		@media only screen and (min-width: 1056px) {
			margin-left: 16rem;
		}
	}
</style>
