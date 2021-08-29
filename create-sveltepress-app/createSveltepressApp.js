#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const degit = require('degit');

const args = {
	gui: '/gui',
	pandoc: '/pandoc'
};

if (argv.hasOwnProperty('add') && typeof argv.add === 'string') {
	switch (argv.add) {
		case 'gui':
			clone('GeopJr/SveltePress/gui', './gui');
			break;
		case 'pandoc':
			clone('GeopJr/SveltePress/pandoc', './pandoc');
			break;
		default:
			console.log('Unknown adder. Exited.');
	}
} else if (
	(argv.hasOwnProperty('h') && argv.h === true) ||
	(argv.hasOwnProperty('help') && argv.help === true)
) {
	printHelp();
} else {
	enabledArgs = [];
	for (const arg of Object.keys(args)) {
		if (argv.hasOwnProperty(arg) && argv[arg] === true) enabledArgs.push(args[arg]);
	}

	const path = argv._.length > 0 ? argv._[0] : './';
	clone('GeopJr/SveltePress', path, enabledArgs);
}

function clone(repo, path, enabledArgs = [], basePath = path) {
	const emitter = degit(repo, {
		cache: false,
		force: false
	});

	emitter.on('info', (info) => {
		console.log(info.message);
	});

	emitter.clone(path).then(() => {
		if (enabledArgs.length > 0) {
			const currentArg = enabledArgs.shift();
			clone('GeopJr/SveltePress' + currentArg, basePath + currentArg, enabledArgs, basePath);
		} else {
			process.exit(0);
		}
	});
}

function printHelp() {
	console.log(`
	Usage
	  create-sveltepress-app [path]

	Options
	  --gui Includes the gui folder if project init
	  --pandoc Includes the pandoc folder if project init
	  --add=ADDER Adds adder to the current project

	Adders
	  --add=gui Adds the gui folder
	  --add=pandoc Adds the pandoc folder

	Examples
	  create-sveltepress-app --pandoc
	  create-sveltepress-app my-sveltepress-project
	  create-sveltepress-app my-sveltepress-project --gui
	  create-sveltepress-app --add=gui
`);
}
