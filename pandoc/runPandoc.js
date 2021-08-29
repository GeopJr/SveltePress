#! /usr/bin/env node
import minimist from 'minimist';
import { execSync } from 'child_process';
import { readdirSync } from 'fs';
import Config from '../sveltePress.config.js';

const args = minimist(process.argv.slice(2));
const output = args?.o?.split('.').pop() ?? 'epub';

const title = Config.title;
const pages = readdirSync('./input/').filter((x) => x.toLowerCase().endsWith('.html'));

for (let i = 0; i < pages.length; i++) {
	execSync(
		`pandoc ./input/${pages[i]} -o ./output/${pages[i]
			.split('.')
			.shift()}.${output} --toc --self-contained --metadata title="${title}"`,
		{ stdio: 'inherit' }
	);
}
