<script context="module">
	export async function load({ fetch }) {
		const dashboard = await fetch('http://localhost:8080/api/dashboard', {
			method: 'GET',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer'
		}).then((r) => r.json());

		if (dashboard?.type === 'error') {
			return dashboard.redirect;
		}

		return {
			props: { dashboard }
		};
	}
</script>

<script>
	import { Tile, Grid, Row, Column, CodeSnippet } from 'carbon-components-svelte';
	import Checkmark32 from 'carbon-icons-svelte/lib/Checkmark32';
	import Close32 from 'carbon-icons-svelte/lib/Close32';

	export let dashboard;
</script>

<h1 style="margin-bottom: 2rem">Dashboard</h1>

<Grid noGutter padding>
	<Row>
		<Column
			><Tile
				><strong>Total GRANDPARENTs</strong>
				<h2>{dashboard.data.stats.grandParents.toLocaleString()}</h2></Tile
			></Column
		>
		<Column
			><Tile
				><strong>Total PARENTs</strong>
				<h2>{dashboard.data.stats.parents.toLocaleString()}</h2></Tile
			></Column
		>
		<Column
			><Tile
				><strong>Total Posts</strong>
				<h2>{dashboard.data.stats.posts.toLocaleString()}</h2></Tile
			></Column
		>
	</Row>
	<Row>
		<Column
			><Tile
				><strong>Project Directory</strong>
				<CodeSnippet
					style="height: auto;width:100%;"
					code={dashboard.data.workdir}
					hideCopyButton
				/>
			</Tile></Column
		>
	</Row>
	<Row>
		<Column
			><Tile
				><strong>GUIs</strong>
				<h2 class="iconInside">
					<svelte:component this={dashboard.data.features.gui ? Checkmark32 : Close32} />
				</h2></Tile
			></Column
		>
		<Column
			><Tile
				><strong>Pandoc</strong>
				<h2 class="iconInside">
					<svelte:component this={dashboard.data.features.pandoc ? Checkmark32 : Close32} />
				</h2></Tile
			></Column
		>
		<Column
			><Tile style="height: 100%"
				><strong>Theme</strong>
				<h5 class="iconInside">
					{dashboard.data.theme}
				</h5></Tile
			></Column
		>
	</Row>
</Grid>

<style lang="scss">
	.iconInside {
		display: flex;
		align-items: center;
		height: 40px;
	}
	:global(.bx--snippet-container) {
		padding-left: 0px !important;
		:global(pre) {
			padding-right: 1rem !important;
		}
	}
</style>
