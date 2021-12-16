<script>
	import { Content, Grid, Row, Column } from 'carbon-components-svelte';

	export let hasSidebar = true;
</script>

<Content style={hasSidebar ? 'padding-left: 5rem;' : undefined}>
	<Grid>
		<Row>
			<Column>
				<slot />
			</Column>
		</Row>
	</Grid>
</Content>
