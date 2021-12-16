<script context="module">
	export async function load({ fetch }) {
		const ls = await fetch('http://localhost:8080/api/ls', {
			method: 'POST',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				path: '.'
			})
		}).then((r) => r.json());

		if (ls?.type === 'error') {
			return {
				status: ls.status,
				error:
					ls.status === 404
						? 'Folder not found'
						: 'There was an error while trying to read current folder'
			};
		}
		if (ls?.alreadySet) {
			return {
				status: 302,
				redirect: '/dashboard'
			};
		}

		return {
			props: { ls }
		};
	}
</script>

<script>
	import {
		Tile,
		Breadcrumb,
		BreadcrumbItem,
		Grid,
		Row,
		Column,
		DataTable,
		Button,
		OverflowMenu,
		OverflowMenuItem,
		DataTableSkeleton,
		CodeSnippet,
		TextInput,
		Loading
	} from 'carbon-components-svelte';

	import Folder16 from 'carbon-icons-svelte/lib/Folder16';
	import FolderParent16 from 'carbon-icons-svelte/lib/FolderParent16';
	import DocumentBlank16 from 'carbon-icons-svelte/lib/DocumentBlank16';
	import Add16 from 'carbon-icons-svelte/lib/Add16';

	import Modal from '$lib/components/modal.svelte';
	import { workDir } from '../stores';
	import { goto } from '$app/navigation';

	let skeleton = false;
	export let ls = [];

	async function list(dirPath, fullPath = false) {
		// Too fast to require skeleton
		// skeleton = true;
		const bodyData = {
			path: `${dirPath}`
		};
		if (!fullPath) bodyData.pwd = `${ls.pwd}`;
		ls = await fetch('http://localhost:8080/api/ls', {
			method: 'POST',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(bodyData)
		}).then((r) => r.json());
		// skeleton = false;
	}

	$: breadcrumbs = ls.pwd
		.split(/\/|\\/g)
		.filter((n) => n) // removes non-value
		.map((x, i, arr) => {
			return { name: x, path: `/${arr.slice(0, i).join('/')}/${x}` };
		});

	$: rows = [
		...[
			{
				id: '../',
				name: '../',
				type: 'Folder'
			}
		].filter((_) => !ls.root),
		...ls.folders.map((x) => {
			return { id: x + '/', name: x + '/', type: 'Folder' };
		}),
		...ls.files.map((x) => {
			return { id: x, name: x, type: 'File' };
		})
	];

	let openModal = false;
	let laodingModal = false;

	let modalMsg = '';

	let modalConfirm;

	let modalCode = false;

	function modalHandler(msg = '', confirmCallback) {
		modalMsg = msg;
		modalConfirm = confirmCallback;
		modalCode = false;
		openModal = true;
	}

	async function confirmWorkDir({ spuiPath }) {
		const projPath = spuiPath ?? ls.pwd;
		workDir.set(projPath);
		const res = await fetch('http://localhost:8080/api/setworkdir', {
			method: 'POST',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				workdir: projPath
			})
		}).then((r) => r.json());
		openModal = false;

		res.type === 'success' ? nextStep() : infoModalHandler(res.type, res.msg);
	}

	let projectName = 'my-sveltepress-project';

	$: safeProjectName = projectName.replace(/[^a-z0-9 -]/gi, '').replaceAll(' ', '-');
	$: commandCSA = `npx degit GeopJr/SveltePress ${safeProjectName}`;

	function createSPapp() {
		modalHandler(
			'The following command will run. Please check the terminal you started the UI from for the logs, including any errors.',
			runCommand
		);
		modalCode = true;
	}

	async function runCommand() {
		openModal = false;
		laodingModal = true;
		const bodyData = {
			command: 'degit',
			args: `GeopJr/SveltePress ${safeProjectName}`
		};
		const res = await fetch('http://localhost:8080/api/runCommand', {
			method: 'POST',
			cache: 'no-cache',

			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(bodyData)
		}).then((r) => r.json());

		laodingModal = false;
		infoModalHandler(res.type, res.msg);
		if (res.type === 'success') confirmWorkDir({ spuiPath: `${ls.pwd}/${safeProjectName}` });
	}

	function nextStep() {
		openModal = false;
		goto('/dashboard');
	}

	let infoModal = false;
	let infoModalTitle;
	let infoModalContent;
	let infoModalError = '';

	function infoModalHandler(type, msg) {
		infoModalTitle = 'Success';
		infoModalContent = 'You will now be redirected to the dashboard!';
		infoModalError = '';
		if (type === 'error') {
			infoModalTitle = 'Error';
			infoModalContent = 'Please check the terminal you ran the UI from for the command output.';
			infoModalError = msg;
		}
		infoModal = true;
	}
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
		Command is currently running. <Loading withOverlay={false} small style="display:inline-block" />
	</p>
	<p>Check the terminal you ran UI from for the output.</p>
</Modal>

<Modal
	bind:open={openModal}
	on:click:button--secondary={() => {
		openModal = false;
	}}
	on:open
	on:close
	on:submit={modalConfirm}
	primaryButtonDisabled={safeProjectName.length === 0}
>
	<p>{modalMsg}</p>
	{#if modalCode === true}
		<CodeSnippet style="height: auto" code={commandCSA} hideCopyButton />
		<p>Or change the folder name:</p>
		<TextInput
			helperText="Please be mindful and only use anything your OS can handle."
			hideLabel
			invalid={safeProjectName.length === 0}
			invalidText="Cannot be empty"
			bind:value={projectName}
		/>
	{/if}
</Modal>

<div style="text-align:center;">
	<h1>Welcome to SveltePress UI</h1>
	<p>
		To get started, please select your SveltePress project or start sveltepress-ui from the root of
		it.
	</p>
	<Tile>
		<Grid>
			<Row>
				<Column>
					<Breadcrumb {skeleton} count={3}>
						{#each breadcrumbs.slice(0, 4) as item, i}
							<BreadcrumbItem
								><Button
									size="small"
									kind={breadcrumbs.length === i + 1 ? 'tertiary' : 'ghost'}
									on:click={() => list(item.path, true)}>{item.name}</Button
								></BreadcrumbItem
							>
						{/each}
						{#if breadcrumbs.length > 4}
							{#if breadcrumbs.length !== 5}
								<BreadcrumbItem>
									<OverflowMenu>
										{#each breadcrumbs.slice(4, -1) as item}
											<OverflowMenuItem on:click={() => list(item.path, true)} text={item.name} />
										{/each}
									</OverflowMenu>
								</BreadcrumbItem>
							{/if}
							<BreadcrumbItem
								><Button
									size="small"
									kind="tertiary"
									on:click={() => list([...breadcrumbs].pop().path, true)}
									>{[...breadcrumbs].pop().name}</Button
								></BreadcrumbItem
							>
						{/if}
					</Breadcrumb>
				</Column>
			</Row>
			<Row>
				<Column>
					{#if skeleton}
						<DataTableSkeleton
							showHeader={false}
							showToolbar={false}
							headers={[{ value: 'Name' }, { value: 'Type' }]}
							rows={5}
						/>
					{:else}
						<DataTable
							headers={[
								{ key: 'name', value: 'Name' },
								{ key: 'type', value: 'Type' }
							]}
							{rows}
						>
							<span slot="cell" let:cell>
								{#if cell.key === 'name'}
									<Button
										kind="ghost"
										disabled={!cell.value.endsWith('/') && cell.value !== 'svelte.config.js'}
										icon={cell.value.endsWith('/')
											? cell.value === '../'
												? FolderParent16
												: Folder16
											: DocumentBlank16}
										on:click={() => {
											cell.value.endsWith('/')
												? list(cell.value)
												: modalHandler(
														'SveltePress will assume the current folder is the project root.',
														confirmWorkDir
												  );
										}}>{cell.value}</Button
									>
								{:else}{cell.value}{/if}
							</span>
						</DataTable>
					{/if}
				</Column>
			</Row>
			<Row padding
				><Column
					><Button icon={Add16} on:click={createSPapp}>Create a SveltePress project here</Button
					></Column
				></Row
			>
		</Grid>
	</Tile>
</div>
