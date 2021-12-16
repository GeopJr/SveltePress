<script>
	import { Modal } from 'carbon-components-svelte';

	export let title = 'Are you sure?';
	export let secBtn = 'Cancel';
	export let primBtn = 'Confirm';
	export let open = false;
	export let primaryButtonDisabled = false;
	export let passiveModal = false;
</script>

<Modal
	{passiveModal}
	preventCloseOnClickOutside
	bind:open
	modalHeading={title}
	primaryButtonText={primBtn}
	secondaryButtonText={secBtn}
	on:click:button--secondary
	on:open
	on:close
	on:submit
	{primaryButtonDisabled}
>
	<slot />
</Modal>
