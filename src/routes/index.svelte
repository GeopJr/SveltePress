<script>
	// index.svelte has to be as self-contained as possible
	// so users can easily remove it

	import Typewriter from 'svelte-typewriter';
	import Config from '$lib/SveltePress/sveltePress.config';

	import { Button, Tile, Grid, Row, Column } from 'carbon-components-svelte';
	import ArrowRight32 from 'carbon-icons-svelte/lib/ArrowRight32';

	let currentYear = new Date().getFullYear();

	// Might be used for more in the future
	const breakpoints = {
		sm: 8
	};

	// Typewriter
	let people = ['humans', 'you', 'your relatives', 'everyone'];

	// Logo animation
	import { draw } from 'svelte/transition';

	let duration = 4000;
	let delay = 200;
	let condition = false;
	let finished = false;

	setTimeout(() => (condition = true));
	setTimeout(() => {
		finished = true;
	}, duration - 200); // Fill colors a bit earlier
</script>

<svelte:head>
	<meta name="og:title" content={Config.title} />
	<title>{Config.title}</title>
</svelte:head>

<div class="main">
	<Grid padding class="sp--grid">
		<Row>
			<Column style="text-align: center;">
				<svg
					shape-rendering="auto"
					width="250"
					height="250"
					viewBox="0 0 1000 1000"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<filter id="null">
							<feBlend mode="normal" in="SourceGraphic" />
						</filter>
					</defs>
					<g filter="url(#null)">
						{#if condition}
							<path
								class:filled-1={finished}
								in:draw={{ duration, delay }}
								d="M250 250v250h500v250H0v150a100 100 0 00100 100h800a100 100 0 00100-100V250H250z"
								fill="#ffd0bf"
							/><path
								class:filled-2={finished}
								in:draw={{ duration, delay }}
								d="M100 0A100 100 0 000 100v650h750V500H250V250h750V100A100 100 0 00900 0H100z"
								fill="#ff3e00"
							/>
						{/if}
					</g>
				</svg>
				<h1 style="margin-top: 1rem">Welcome to SveltePress</h1>
				<h2 class="subTitle">
					Documentation for 
					<Typewriter loop={3000} cursor="#ff3e00">
						{#each people as person}
							<span>{person}.</span>
						{/each}
						{' '}
					</Typewriter>
				</h2>
				<Button icon={ArrowRight32} size="lg" href={Config.default} style="margin-top: 3rem"
					>Let's get started</Button
				>
			</Column>
		</Row>
	</Grid>
	<Grid padding condensed class="sp--grid">
		<Row>
			<Column md sm={breakpoints.sm}>
				<Tile class="sp--tile">
					<h2 class="tile--title">Powered by SvelteKit</h2>
					<h4>
						SveltePress is built on top of SvelteKit, a powerful web framework, while taking
						advantage of Svelte's incredible performance and simplicity.
					</h4>
				</Tile>
			</Column>
			<Column md sm={breakpoints.sm}>
				<Tile class="sp--tile"
					><h2 class="tile--title">Made for humans</h2>
					<h4>
						Markdown files are structured according to the filesystem, shrinking the gap between
						File Manager and content creator.
					</h4></Tile
				>
			</Column>
			<Column md sm={breakpoints.sm}>
				<Tile class="sp--tile"
					><h2 class="tile--title">Customizability</h2>
					<h4>
						Replacable themes, markdown converters, components, pages, functions... SveltePress was
						made for you.
					</h4></Tile
				>
			</Column>
		</Row>
	</Grid>
	<Grid padding class="sp--grid">
		<Row>
			<Column md sm={breakpoints.sm} class="sp--imagePromo-wrapper">
				<img
					class="sp--imagePromo"
					alt="a terminal showing the output of the tree command, output includes a file structure of markdown files"
					src="https://i.imgur.com/JicfVWS.png"
				/>
			</Column>
			<Column md={1} sm={breakpoints.sm} class="sp--line-wrapper">
				<hr class="sp--line" />
			</Column>
			<Column md sm={breakpoints.sm} class="sp--imagePromo-wrapper">
				<img
					class="sp--imagePromo browser"
					alt="SveltePress sidebar generated using the previous structure"
					src="https://i.imgur.com/Eiy8q4i.png"
				/>
			</Column>
		</Row>
	</Grid>
	<footer>
		&copy;⃠ 2021{currentYear === 2021 ? '' : ' - ' + currentYear} -
		<a class="sp--link" href="https://geopjr.dev/">GeopJr</a>
	</footer>
</div>

<style>
	:global(.sp--grid) {
		margin-bottom: 2rem;
	}
	:global(.sp--line-wrapper) {
		height: 100px;
	}
	:global(.sp--imagePromo-wrapper) {
		text-align: center;
	}

	:global(.sp--tile) {
		height: 100%;
	}

	.sp--imagePromo {
		max-width: 100%;
		vertical-align: center;
		height: 100%;
		animation: pulseBorder 3s ease-in-out infinite alternate;
		-webkit-filter: drop-shadow(1px 1px 0 var(--cds-interactive-01))
			drop-shadow(-1px -1px 0 var(--cds-interactive-01));
		filter: drop-shadow(1px 1px 0 var(--cds-interactive-01))
			drop-shadow(-1px -1px 0 var(--cds-interactive-01));
	}

	.sp--imagePromo.browser {
		animation: pulseBorder 3s ease-in-out infinite alternate-reverse;
	}

	.sp--line {
		position: relative;
		width: 1px;
		height: 100%;
		/* top: 50%; */
		border-color: var(--cds-interactive-01);
		animation: pulse 2s ease-in-out infinite alternate;
	}

	.sp--link {
		color: var(--cds-interactive-01);
		text-decoration: none;
	}
	.main {
		margin-top: 6rem;
	}
	.subTitle {
		flex-direction: column;
		display: flex;
		margin-top: 1rem;
	}

	.tile--title {
		margin-bottom: 1rem;
	}

	footer {
		font-weight: bold;
		text-align: center;
		padding: 0 2rem 2rem;
	}

	path {
		stroke: black;
		fill: white;
		transition: 1.5s;
		stroke-width: 15;
	}
	path.filled-1 {
		stroke: unset;
		fill: #ffd0bf;
	}
	path.filled-2 {
		stroke: unset;
		fill: #ff3e00;
	}

	@keyframes pulse {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes pulseBorder {
		0% {
			-webkit-filter: drop-shadow(1px 1px 0 var(--cds-interactive-01))
				drop-shadow(-1px -1px 0 var(--cds-interactive-01));
			filter: drop-shadow(1px 1px 0 var(--cds-interactive-01))
				drop-shadow(-1px -1px 0 var(--cds-interactive-01));
		}
		100% {
			-webkit-filter: drop-shadow(1px 1px 0 #ffffff00) drop-shadow(-1px -1px 0 #ffffff00);
			filter: drop-shadow(1px 1px 0 #ffffff00) drop-shadow(-1px -1px 0 #ffffff00);
		}
	}

	/* md */
	@media only screen and (min-width: 673px) {
		:global(.sp--grid) {
			margin-bottom: 5rem;
		}

		:global(.sp--line-wrapper) {
			height: 509px;
		}
		.subTitle {
			flex-direction: row;
			justify-content: center;
		}
		.sp--line {
			position: relative;
			top: 50%;
			height: 1px;
			animation: grow 2s ease-in-out infinite alternate;
		}
		@keyframes grow {
			0% {
				width: 100%;
			}
			100% {
				width: 10%;
			}
		}
	}
</style>
