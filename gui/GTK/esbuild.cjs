const fs = require('fs-extra');

const prod = process.argv.includes('--prod');

/** @type {import('esbuild').BuildOptions} */
const options = {
	entryPoints: ['src/index.js'],
	bundle: true,
	platform: 'node',
	outdir: 'dist',
	loader: Object.fromEntries(
		['png', 'svg', 'jpg', 'jpeg', 'gif', 'glade'].map((ext) => [`.${ext}`, 'file'])
	),
	minify: prod,
	external: ['nock', 'aws-sdk', 'mock-aws-s3', 'node-gtk'],
	format: 'cjs',
	outExtension: { '.js': '.cjs' }
};

fs.emptyDirSync(options.outdir);

require('esbuild')
	.build(options)
	.catch(() => process.exit(1));
