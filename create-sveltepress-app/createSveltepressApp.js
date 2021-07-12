#! /usr/bin/env node
const degit = require('degit');

const emitter = degit('GeopJr/SveltePress', {
	cache: false,
	force: false
});

const path = process.argv.slice(2)[0] ?? './';

emitter.on('info', (info) => {
	console.log(info.message);
});

emitter.clone(path).then(() => {
	process.exit(0);
});
