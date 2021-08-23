#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const degit = require('degit');

const args = {
	gui: '/gui'
};

if (argv.hasOwnProperty('add') && typeof argv.add === 'string') {
	switch (argv.add) {
		case 'gui':
			clone('GeopJr/SveltePress/gui', './gui');
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
	if (enabledArgs.length > 1) {
		console.log('Too many args. Exited.');
	} else {
		const arg = enabledArgs[0] ?? ""
		const path = argv._.length > 0 ? argv._[0] : './';
		clone('GeopJr/SveltePress' + arg, path);
	}
}

function clone(repo, path) {
	const emitter = degit(repo, {
		cache: false,
		force: false
	});

	emitter.on('info', (info) => {
		console.log(info.message);
	});

	emitter.clone(path).then(() => {
		process.exit(0);
	});
}

function printHelp() {
	console.log(`
	Usage
	  create-sveltepress-app [path]

	Options
	  --gui Includes the gui folder if project init
	  --add=ADDER Adds adder to the current project

	Adders
	  --add=gui Adds the gui folder

	Examples
	  create-sveltepress-app
	  create-sveltepress-app my-sveltepress-project
	  create-sveltepress-app my-sveltepress-project --gui
	  create-sveltepress-app --add=gui
`);
}
