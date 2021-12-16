<script context="module">
	export async function load({ fetch }) {
		const create = await fetch('http://localhost:8080/api/create', {
			method: 'GET',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer'
		}).then((r) => r.json());

		if (create?.type === 'error') {
			return create.redirect;
		}

		return {
			props: { create }
		};
	}
</script>

<script>
	import {
		Tile,
		Grid,
		Row,
		Column,
		TextInput,
		Button,
		Select,
		SelectItem,
		CodeSnippet,
		Loading
	} from 'carbon-components-svelte';

	import Editor from 'cl-editor/src/Editor.svelte';
	import Save32 from 'carbon-icons-svelte/lib/Save32';

	export let create;

	let groupName = create.data.index.grandParents?.[0] ?? 'Awesome Blog';
	let parentName =
		create.data.index.grandParents?.[0] &&
		create.data.index.parents?.[create.data.index.grandParents?.[0]]?.[0]
			? create.data.index.parents?.[create.data.index.grandParents?.[0]]?.[0]
			: 'Awesome Posts';
	let postName = 'My new awesome post';
	let editorHtml = 'Interesting content!';
	const editorActions = ['b', 'i', 'ul', 'ol', 'h1', 'h2', 'blockquote', 'a', 'image'];

	const safeName = (name) => name.replace(/[^a-z0-9 -]/gi, '').replaceAll(' ', '-');
	let groupCustom = create.data.index.grandParents.length === 0;
	let parentCustom = create.data.index.parents.length === 0;

	$: selectedPath = {
		group: {
			internal: groupCustom ? safeName(groupName) : groupName,
			name: groupName
		},
		parent: {
			internal: parentCustom ? safeName(parentName) : parentName,
			name: parentName
		},
		post: {
			internal: safeName(postName),
			name: postName
		},
		html: editorHtml
	};

	import Modal from '$lib/components/modal.svelte';

	let infoModal = false;
	let infoModalTitle;
	let infoModalContent;
	let infoModalError = '';

	function infoModalHandler(type, msg) {
		infoModalTitle = 'Success';
		infoModalContent = 'Your post was created';
		infoModalError = '';
		if (type === 'error') {
			infoModalTitle = 'Error';
			infoModalContent = 'Please check the terminal you ran the UI from for the command output.';
			infoModalError = msg;
		}
		infoModal = true;
	}

	function savePost() {
		modalHandler(
			'The post is about to be made. Please check the terminal you started the UI from for the logs, including any errors.',
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
		const res = await fetch('http://localhost:8080/api/create', {
			method: 'POST',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(selectedPath)
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

<h1 style="margin-bottom: 2rem">Create a Post</h1>

<Grid noGutter padding>
	<Row class="path">
		<Column
			><Tile>
				{#if groupCustom}
					<TextInput
						labelText="GrandParent"
						helperText="The top-level category of your post."
						invalid={safeName(groupName).length === 0}
						invalidText="Cannot be empty"
						bind:value={groupName}
					/>
				{:else}
					<Select labelText="GrandParent" bind:selected={groupName}>
						{#each create.data.index.grandParents as group}
							<SelectItem value={group} text={group} />
						{/each}
					</Select>
				{/if}
				<Button
					style="margin-top:1rem"
					kind="secondary"
					on:click={() => {
						groupCustom = !groupCustom;
						groupName = groupCustom ? groupName : create.data.index.grandParents[0];
						parentCustom = groupCustom;
					}}>{groupCustom ? 'Select an existing one' : 'Create a new one'}</Button
				>
			</Tile></Column
		>
		<Column
			><Tile>
				{#if parentCustom || !create.data.index.parents.hasOwnProperty(groupName) || groupCustom}
					<TextInput
						labelText="Parent"
						helperText="The subcategory of your post. (Empty allowed)."
						bind:value={parentName}
					/>
				{:else}
					<Select labelText="Parent" bind:selected={parentName}>
						{#each create.data.index.parents[groupName] || [] as parent}
							<SelectItem value={parent} text={parent} />
						{/each}
					</Select>
				{/if}

				{#if create.data.index.parents.hasOwnProperty(groupName) && !groupCustom}
					<Button
						style="margin-top:1rem"
						kind="secondary"
						on:click={() => (parentCustom = !parentCustom)}
						>{parentCustom ? 'Select an existing one' : 'Create a new one'}</Button
					>
				{/if}
			</Tile></Column
		>
		<Column
			><Tile
				><TextInput
					labelText="Post title"
					invalid={postName.length === 0}
					invalidText="Cannot be empty"
					bind:value={postName}
				/></Tile
			>
		</Column>
	</Row>
	<Row class="user-content">
		<Tile><h1>{postName}</h1></Tile>
	</Row>
	<Row class="user-content user-content-body">
		<Tile
			><Editor
				height="500px"
				on:change={(evt) => (editorHtml = evt.detail)}
				html={editorHtml}
				actions={editorActions}
			/></Tile
		>
		<Button
			icon={Save32}
			size="xl"
			style="margin-top:1rem;flex-grow:1;"
			kind="primary"
			on:click={() => savePost()}>Save</Button
		>
	</Row>
</Grid>

<style lang="scss">
	:global(.user-content > .bx--tile) {
		word-break: break-all;
		width: 100%;
	}
	:global(.user-content.user-content-body) {
		color: black;
	}
	:global(.user-content.user-content-body blockquote) {
		background-color: grey;
	}
	:global(.path .bx--tile) {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
