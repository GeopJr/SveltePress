<script context="module">
	export async function load({ fetch }) {
		const features = await fetch('http://localhost:8080/api/features', {
			method: 'GET',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer'
		}).then((r) => r.json());

		if (features?.type === 'error') {
			return features.redirect;
		}

		return {
			props: { features }
		};
	}
</script>

<script>
	import { Tile, Grid, Row, Column, CodeSnippet, Loading } from 'carbon-components-svelte';

	import Checkmark32 from 'carbon-icons-svelte/lib/Checkmark32';
	import Close32 from 'carbon-icons-svelte/lib/Close32';

	export let features;

	let pandoc = features.data.features.pandoc;
	let gui = features.data.features.gui;

	$: result = {
		pandoc,
		gui
	};

	import Modal from '$lib/components/modal.svelte';

	let infoModal = false;
	let infoModalTitle;
	let infoModalContent;
	let infoModalError = '';

	function infoModalHandler(type, msg) {
		infoModalTitle = 'Success';
		infoModalContent = 'Feature toggled!';
		infoModalError = '';
		if (type === 'error') {
			infoModalTitle = 'Error';
			infoModalContent = 'Please check the terminal you ran the UI from for the command output.';
			infoModalError = msg;
		} else {
			features.data.features = result;
		}
		infoModal = true;
	}

	let last_toggle;

	function toggleFeature(feat = 'gui') {
		if (!['gui', 'pandoc'].includes(feat)) return;
		last_toggle = feat;
		modalHandler(
			`The feature '${feat.toUpperCase()}' will toggle. Disabling a feature means that its folder will be deleted. Please check the terminal you started the UI from for the logs, including any errors.`,
			runCommand
		);
	}

	function modalHandler(msg = '', confirmCallback) {
		modalMsg = msg;
		modalConfirm = confirmCallback;
		openModal = true;
	}

	async function runCommand() {
		openModal = false;
		laodingModal = true;
		const res = await fetch('http://localhost:8080/api/features', {
			method: 'POST',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({ [last_toggle]: result[last_toggle] })
		}).then((r) => r.json());

		laodingModal = false;
		infoModalHandler(res.type, res.msg);
	}

	let openModal = false;
	let laodingModal = false;

	let modalMsg = '';

	let modalConfirm;
</script>

<Modal passiveModal bind:open={infoModal} title={infoModalTitle}>
	{#if infoModalError.length > 0}
		<p>Server returned the following message:</p>
		<CodeSnippet style="height: auto" code={infoModalError} hideCopyButton />
	{/if}
	<p>{infoModalContent}</p>
</Modal>

<Modal passiveModal title="Loading" bind:open={laodingModal}>
	<p>
		Action is currently running. <Loading withOverlay={false} small style="display:inline-block" />
	</p>
	<p>Check the terminal you ran UI from for the output (if any).</p>
</Modal>

<Modal
	bind:open={openModal}
	on:click:button--secondary={() => {
		openModal = false;
	}}
	on:open
	on:close
	on:submit={modalConfirm}
>
	<p>{modalMsg}</p>
</Modal>

<h1 style="margin-bottom: 2rem">Toggle Features</h1>

<Grid noGutter padding>
	<Row>
		<Column
			><Tile
				on:click={() => {
					gui = !gui;
					toggleFeature();
				}}
				style="cursor: pointer;"
				>GUIs
				<h2 class="iconInside">
					<svelte:component this={features.data.features.gui ? Checkmark32 : Close32} />
				</h2></Tile
			></Column
		>
		<Column
			><Tile
				on:click={() => {
					pandoc = !pandoc;
					toggleFeature('pandoc');
				}}
				style="cursor: pointer;"
				>Pandoc
				<h2 class="iconInside">
					<svelte:component this={features.data.features.pandoc ? Checkmark32 : Close32} />
				</h2></Tile
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
</style>
