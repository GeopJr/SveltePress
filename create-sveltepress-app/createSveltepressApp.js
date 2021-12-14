#! /usr/bin/env node
import * as minimist from 'minimist';
import * as degitCJS from 'degit';
import chalk from 'chalk';
import { existsSync, rmSync, mkdirSync } from 'fs';

const degit = degitCJS.default;
const argv = minimist.default(process.argv.slice(2));

const base = 'GeopJr/SveltePress';

const adders = {
	gui: '/gui',
	pandoc: '/pandoc'
};
const spLocation = argv._.length > 1 ? argv._[1] : './';

const options = ['create', 'add'];

if (
	['help', 'h'].includes(argv._[0]?.toLowerCase()) ||
	(argv.hasOwnProperty('h') && argv.h === true) ||
	(argv.hasOwnProperty('help') && argv.help === true)
) {
	printHelp();
} else if (argv._.length === 0 || !options.includes(argv._[0]?.toLowerCase())) {
	console.error(`${chalk.redBright('Missing or unknown option')}`);
	printHelp();
}

switch (argv._[0].toLowerCase()) {
	case 'add':
		handleAdd();
		break;
	case 'create':
		handleCreate();
		break;
	default:
		console.error(`${chalk.redBright('Unknown option')}`);
		printHelp();
}

function getEnabledArgs() {
	const enabledArgs = [];
	for (const arg of Object.keys(adders)) {
		if (argv.hasOwnProperty(arg) && argv[arg] === true) enabledArgs.push(adders[arg]);
	}
	return enabledArgs;
}

async function handleAdd() {
	let added = false;
	if (argv.hasOwnProperty('theme') && typeof argv.theme === 'string') {
		added = true;
		await themeCheck();
	}
	const enabledArgs = getEnabledArgs();
	if (enabledArgs.length > 0) {
		added = true;
		for (let i = 0; i < enabledArgs.length; i++) {
			clone(`${base}${enabledArgs[i]}`, `${spLocation}${enabledArgs[i]}`);
		}
	}

	if (!added) {
		console.error(`${chalk.redBright('Missing adder argument')}`);
		printHelp();
	}
}

async function handleCreate() {
	const enabledArgs = getEnabledArgs();

	await clone(base, spLocation, enabledArgs);
	if (argv.hasOwnProperty('theme') && typeof argv.theme === 'string') {
		await themeCheck();
	}
	process.exit(0);
}

async function themeCheck() {
	if (!argv.theme.includes('/')) {
		console.error(`${chalk.redBright('Theme not in repo format. Exited.')}`);
		return;
	}
	const themePath = `${spLocation}/src/lib/SveltePress/theme/`;
	if (!existsSync(themePath)) {
		console.error(
			`${chalk.redBright('Theme folder is missing')} ${chalk.yellow(
				'(' + themePath + ')'
			)}. ${chalk.redBright('Exited.')}`
		);
		return;
	}
	console.log(
		`${chalk.redBright('Theme folder')} ${chalk.yellow('(' + themePath + ')')} ${chalk.redBright(
			'will now be deleted. To revert to the default theme run'
		)} ${chalk.cyanBright(
			'create-sveltepress-app add --theme=' + base + '/src/lib/SveltePress/theme/'
		)}.`
	);
	rmSync(themePath, { recursive: true, force: true });
	mkdirSync(themePath);
	await clone(`${argv.theme}`, themePath);
}

async function clone(repo, path, enabledArgs = [], basePath = path) {
	const emitter = degit(repo, {
		cache: false,
		force: false
	});

	emitter.on('info', (info) => {
		console.log('[Degit]: ' + info.message);
	});

	await emitter
		.clone(path)
		.then(async () => {
			if (enabledArgs.length > 0) {
				const currentArg = enabledArgs.shift();
				await clone(`${base}${currentArg}`, basePath + currentArg, enabledArgs, basePath);
			}
		})
		.catch((err) => console.error('[Degit]: ' + err.message));
}

function printHelp() {
	console.log(`
${chalk.yellowBright('Usage')}
  create-sveltepress-app <option> [args]

${chalk.yellowBright('Options')}
  create [path] [args] Clones SveltePress to path (default: ./)
  add <args> Adds extensions/themes to SveltePress (assumes you are at its root) 

${chalk.yellowBright('Args')}
  --gui Adds the gui folder
  --pandoc Adds the pandoc folder
  --theme=REPO Changes the theme of your project

${chalk.yellowBright('Themes')}
  --theme=author/repo Takes anything degit accepts

${chalk.yellowBright('Examples')}
  create-sveltepress-app create --pandoc
  create-sveltepress-app create my-sveltepress-project --theme=GeopJr/cakepop
  create-sveltepress-app create my-sveltepress-project
  create-sveltepress-app create my-sveltepress-project --gui
  create-sveltepress-app add --gui
  create-sveltepress-app add --theme=GeopJr/cakepop --pandoc
`);
	process.exit(0);
}
