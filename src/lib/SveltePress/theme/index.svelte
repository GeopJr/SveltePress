<script>
	// index.svelte has to be as self-contained as possible
	// so users can easily remove it

	import Typewriter from 'svelte-typewriter';
	import Config from '$lib/SveltePress/sveltePress.config';

	import { Button, Tile, Grid, Row, Column } from 'carbon-components-svelte';
	import ArrowRight32 from 'carbon-icons-svelte/lib/ArrowRight32';
	import ArrowDown32 from 'carbon-icons-svelte/lib/ArrowDown32';

	import { session } from '$app/stores';

	$: nav = Config.nav.overwrite
		? Config.nav.items || []
		: $session.get('navbar').concat(Config.nav.items || []);

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
	<div class="sp--header">
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
					<Button
						icon={ArrowRight32}
						size="lg"
						href={nav.length > 0 ? nav[0].link : $session.get('navbar')[0]?.link}
						style="margin-top: 3rem">Let's get started</Button
					>
				</Column>
			</Row>
		</Grid>
		<Grid padding condensed>
			<Row class="sp--header--tiles">
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
							Replacable themes, markdown converters, components, pages, functions... SveltePress
							was made for you.
						</h4></Tile
					>
				</Column>
			</Row>
			<Row class="sp--arrow--down">
				<ArrowDown32 />
			</Row>
		</Grid>
	</div>
	<Grid padding class="sp--grid sp--features">
		<Row class="sp--feature">
			<Column md sm={12}>
				<img
					src="https://i.imgur.com/KidDqUy.png"
					alt="a terminal showing the output of the tree command, output includes a file structure of markdown files and SveltePress sidebar generated using the previous structure"
				/>
			</Column>
			<Column class="sp--feature--card" md sm={12}
				><Tile class="sp--tile"
					><h2 class="tile--title">Filesystem based Structure</h2>
					<h4>Folders become categories, files become posts. Simple as that.</h4></Tile
				></Column
			>
		</Row>
		<Row class="sp--feature" style="flex-wrap: wrap-reverse;">
			<Column class="sp--feature--card" md sm={12}
				><Tile class="sp--tile"
					><h2 class="tile--title">Themable</h2>
					<h4>
						With a theming API with almost zero restrictions, you can modify everything to fit your
						needs.
					</h4></Tile
				></Column
			>
			<Column md sm={12}>
				<img
					src="https://i.imgur.com/SG5iPrc.png"
					alt="the cakepop official theme in front of the carbon one"
				/>
			</Column>
		</Row>
		<Row class="sp--feature">
			<Column md sm={12}>
				<img
					src="https://i.imgur.com/YCuLvMP.png"
					alt="screenshots of multiple guis of sveltepress (gtk, qt, flutter (desktop & mobile)"
				/>
			</Column>
			<Column class="sp--feature--card" md sm={12}
				><Tile class="sp--tile"
					><h2 class="tile--title">Compile to native</h2>
					<h4>
						Desktop, Mobile, e-books & more. With the power of Flutter, GTK, QT & Pandoc you can
						target Web, Linux, MacOS, Windows, Android, iOS, .epub, .pdf, .docx & a whole lot more
						from one codebase.
					</h4></Tile
				></Column
			>
		</Row>
	</Grid>
	<footer>
		<span class="pd" /> 2021{currentYear === 2021 ? '' : ' - ' + currentYear} -
		<a class="sp--link" href="https://geopjr.dev/">GeopJr</a>
	</footer>
</div>

<style lang="scss">
	:global(.sp--arrow--down) {
		display: flex;
		justify-content: center;
		align-content: center;
		margin: 3rem 0;
	}

	:global(.sp--header) {
		min-height: 100vh;
		max-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	:global(.sp--grid) {
		margin-bottom: 1rem !important;
	}

	:global(.sp--features) {
		height: 100%;
		width: 100%;
		:global(.sp--feature) {
			align-items: center;
			text-align: center;
			justify-content: center;

			:global(.sp--feature--card) {
				text-align: left;
			}
			img {
				max-width: 100%;
			}
		}
	}

	:global(.sp--tile) {
		height: 100%;
	}

	.pd {
		display: inline-flex;
		width: 18px;
		height: 18px;
		vertical-align: middle;
		text-align: center;
		justify-content: center;
	}

	.pd::after {
		content: '🚫';
		display: block;
		position: absolute;
		font-size: 100%;
	}
	.pd::before {
		content: '\00a9';
		display: block;
		position: absolute;
		font-size: 100%;
	}

	.sp--link {
		color: var(--cds-interactive-01);
		text-decoration: none;
	}
	.main {
		padding-top: 3rem;
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

	/* md */
	@media only screen and (min-width: 673px) {
		:global(.sp--grid) {
			margin-bottom: 5rem;
		}

		.subTitle {
			flex-direction: row;
			justify-content: center;
		}
	}
</style>
