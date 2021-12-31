#! /usr/bin/env node

import express from 'express';
import { handler } from '../build/handler.js';
import { readdirSync, existsSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { resolve, parse, relative, join as pathJoin } from 'path';
import { execSync } from 'child_process';
import turndown from 'turndown';
import open from 'open';

const turndownService = new turndown({
	emDelimiter: '*',
	headingStyle: 'atx',
	bulletListMarker: '-'
});

const root = parse(process.cwd()).root;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The project path
let workDir = '';

// Available external commands
const commands = {
	degit: 'npx --yes degit',
	csa: 'npx create-sveltepress-app@2'
};

/**
 * @typedef {Object} lsObj A folder's items
 * @property {string[]} folders The folder's sub-folders
 * @property {string[]} files The folder's files
 * @property {string} pwd The folder's full path
 * @property {boolean} root Whether the folder path is the same as the one SPUI started in
 */

/**
 * Get a folder's items
 * @param {string} dirPath the folder
 * @param {string} [pwd] the current location
 * @returns {lsObj} A folder's items
 */
function getDir(dirPath = '.', pwd) {
	const response = {};
	let endPath = dirPath;
	if (pwd) endPath = resolve(pwd, dirPath);
	if (!existsSync(endPath)) return {};
	const dir = readdirSync(endPath, { withFileTypes: true });
	response.folders = dir
		.filter((x) => x.isDirectory())
		.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()))
		.map((x) => x.name);
	response.files = dir
		.filter((x) => x.isFile())
		.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()))
		.map((x) => x.name);
	response.pwd = resolve(endPath);
	response.root = root === response.pwd;
	return response;
}

/**
 * Run external commands
 * @param {string} command The command
 * @param {string} args The arguments
 * @returns {number} The exit code
 */
function runCommand(command, args) {
	if (command === commands.degit) {
		return runInTerm(`${command} ${args}`);
	}
}

/**
 * Spawns the child command
 * @param {string} command The full command
 * @returns {number} The exit code
 */
function runInTerm(command) {
	console.log('🏃 About to run: ' + command);
	try {
		execSync(command, { stdio: 'inherit' });
		return 0;
	} catch (e) {
		console.error(e);
		return 1;
	}
}

/**
 * @typedef {Object} postStats The project's stats
 * @property {number} grandParents Amount of grandparents
 * @property {number} parents Amount of parents
 * @property {number} posts Amount of posts
 */

/**
 * @returns {postStats} Stats about the project
 */
function postStats() {
	const response = {
		grandParents: 0,
		parents: 0,
		posts: 0
	};
	const grandParents = readdirSync(pathJoin(workDir, 'pages'), {
		withFileTypes: true
	}).filter((x) => x.isDirectory());
	response.grandParents = grandParents.length;
	grandParents.forEach((x) => {
		const result = countPosts(pathJoin(workDir, 'pages', x.name));
		response.parents = response.parents + result.parents;
		response.posts = response.posts + result.posts;
	});

	return response;
}

/**
 * @typedef {Object} parentCNames The project's parent names
 * @property {string[]} - Children of grandparent
 */

/**
 * @typedef {Object} categoryNames The project's category names
 * @property {string[]} grandParents List of grandparent names
 * @property {parentCNames} parents List of parents
 */

/**
 * @returns {categoryNames}
 */
function parentNames() {
	let response = {
		grandParents: [],
		parents: {}
	};
	const grandParents = readdirSync(pathJoin(workDir, 'pages'), {
		withFileTypes: true
	}).filter((x) => x.isDirectory());
	response.grandParents = grandParents.map((x) => x.name);

	grandParents.forEach((x) => {
		const children = getParents(
			pathJoin(workDir, 'pages', x.name),
			pathJoin(workDir, 'pages', x.name)
		);
		response.parents[x.name] = children;
	});

	return response;
}

/**
 * Returns an arary of all parents
 * @param {string} source Where to start looking for parents
 * @param {string} grandparent Variable transferred between runs for sub-parents
 * @returns {string[]} Parents
 */
function getParents(source, grandparent) {
	let response = [];

	const parents = readdirSync(source, { withFileTypes: true });
	parents.forEach((x) => {
		if (!x.isDirectory()) return;
		const newPath = pathJoin(source, x.name);
		response = [...response, relative(grandparent, newPath), ...getParents(newPath, grandparent)];
	});

	return response;
}

/**
 * @typedef {Object} postCount The project's amount of posts & parents
 * @property {number} parents Amount of parents
 * @property {number} posts Amount of posts
 */

/**
 * @param {string} source Where to start looking for parents & posts
 * @returns {postCount} Amount of parents & posts
 */
function countPosts(source) {
	const response = {
		parents: 0,
		posts: 0
	};

	const grandParent = readdirSync(source, { withFileTypes: true });
	grandParent.forEach((x) => {
		if (x.isDirectory()) {
			const parent = countPosts(pathJoin(source, x.name));
			response.parents = response.parents + parent.parents + 1; // this parent itself
			response.posts = response.posts + parent.posts;
		} else if (
			x.isFile() &&
			x.name.toLowerCase() !== 'readme.md' &&
			x.name.toLowerCase().endsWith('.md')
		) {
			response.posts = response.posts + 1;
		}
	});
	return response;
}

/**
 * @returns {string?} The theme name (if available)
 */
function getThemeName() {
	const themePkgJson = pathJoin(
		workDir,
		'src',
		'lib',
		'SveltePress',
		'theme',
		'meta',
		'package.json'
	);
	if (!existsSync(themePkgJson)) return 'Unknown';
	const parsedPkgJson = JSON.parse(readFileSync(themePkgJson, 'utf8'));
	if (!parsedPkgJson.hasOwnProperty('name') || parsedPkgJson?.name?.length === 0) return 'Unknown';
	return parsedPkgJson?.name;
}

/**
 * @typedef {Object} availableFeatures The project's available features
 * @property {boolean} gui Whether GUIs are enabled
 * @property {boolean} pandoc Whether pandoc is enabled
 */

/**
 * @returns {availableFeatures}
 */
function getFeatures() {
	const response = {
		gui: false,
		pandoc: false
	};
	response.gui = existsSync(pathJoin(workDir, 'gui'));
	response.pandoc = existsSync(pathJoin(workDir, 'pandoc'));
	return response;
}

app.post('/api/runCommand', (req, res) => {
	if (!req.body || !req.body.hasOwnProperty('command') || !req.body.hasOwnProperty('args')) {
		res.status(422);
		let whatsMissing = ['Command', 'Args'];
		if (!req.body.hasOwnProperty('command') && !req.body.hasOwnProperty('args')) {
			whatsMissing = `${whatsMissing[0]} & ${whatsMissing[1].toLowerCase()}`;
		} else {
			whatsMissing = whatsMissing[!req.body.hasOwnProperty('command') ? 0 : 1];
		}
		return res.json({
			type: 'error',
			msg: `${whatsMissing} is missing from POST body`
		});
	}
	const command = req.body.command.toLowerCase();
	if (!Object.keys(commands).includes(command)) {
		res.status(404);
		return res.json({
			type: 'error',
			msg: `Command '${command}' not found`
		});
	}
	const output = runCommand(commands[command], req.body.args);
	res.status(400);
	let response = { type: 'error', msg: `There was an error while running '${command}'` };
	if (output === 0) {
		res.status(200);
		response = {
			type: 'success'
		};
	}

	return res.json(response);
});

app.post('/api/ls', (req, res) => {
	if (!req.body || !req.body.hasOwnProperty('path')) {
		res.status(422);
		return res.json({
			type: 'error',
			msg: 'Path is missing from POST body'
		});
	}
	const response = getDir(req.body.path, req.body.pwd);
	if (Object.keys(response).length === 0) {
		res.status(404);
		return res.json({
			type: 'error',
			msg: "Folder doesn't exist"
		});
	}
	return res.json({
		type: 'success',
		alreadySet: !!workDir,
		...response
	});
});

app.post('/api/setworkdir', (req, res) => {
	if (!req.body || !req.body.hasOwnProperty('workdir')) {
		res.status(422);
		return res.json({
			type: 'error',
			msg: 'Workdir is missing from POST body'
		});
	}
	const exists = existsSync(req.body.workdir);
	if (!exists) {
		res.status(404);
		return res.json({
			type: 'error',
			msg: "WorkDir doesn't exist"
		});
	}
	workDir = req.body.workdir;
	return res.json({
		type: 'success'
	});
});

app.get('/api/features', (req, res) => {
	if (!workDir) {
		res.status(404);
		return res.json({
			type: 'error',
			msg: 'Workdir is not set',
			redirect: {
				status: 302,
				redirect: '/'
			}
		});
	}
	return res.json({
		type: 'success',
		data: {
			features: getFeatures(),
			workdir: workDir
		}
	});
});

app.post('/api/features', (req, res) => {
	if (!req.body || ['pandoc', 'gui'].filter((x) => !req.body.hasOwnProperty(x)).length !== 1) {
		res.status(422);
		return res.json({
			type: 'error',
			msg: `Some fields are missing from POST body`
		});
	}

	const changed = Object.keys(req.body)[0];
	const current = getFeatures()[changed];

	if (req.body[changed] === current) {
		res.status(400);
		return res.json({
			type: 'error',
			msg: `Feature already ${req.body[changed] ? 'enabled' : 'disabled'}`
		});
	}

	const args = `GeopJr/SveltePress/${changed} ${pathJoin(workDir, `${changed}`)}`;

	if (req.body[changed]) {
		runCommand(commands.degit, args);
	} else {
		rmSync(pathJoin(workDir, `${changed}`), { recursive: true, force: true });
	}

	res.status(200);
	return res.json({
		type: 'success'
	});
});

app.get('/api/create', (req, res) => {
	if (!workDir) {
		res.status(404);
		return res.json({
			type: 'error',
			msg: 'Workdir is not set',
			redirect: {
				status: 302,
				redirect: '/'
			}
		});
	}
	return res.json({
		type: 'success',
		data: {
			index: parentNames(),
			workdir: workDir
		}
	});
});

app.post('/api/create', (req, res) => {
	if (
		!req.body ||
		['group', 'parent', 'post', 'html'].filter((x) => !req.body.hasOwnProperty(x)).length !== 0
	) {
		res.status(422);
		return res.json({
			type: 'error',
			msg: `Some fields are missing from POST body`
		});
	}
	const groupPath = pathJoin(workDir, 'pages', `${req.body.group.internal}`);
	const parentPath = pathJoin(groupPath, `${req.body.parent.internal}`);
	const postPath = pathJoin(parentPath, `${req.body.post.internal}.md`);
	if (!existsSync(groupPath)) {
		mkdirSync(groupPath, { recursive: true });
		writeFileSync(
			pathJoin(groupPath, 'readme.md'),
			`---\ngroupName: ${req.body.group.name}\n---\n`
		);
	}
	if (!existsSync(parentPath)) {
		mkdirSync(parentPath, { recursive: true });
		writeFileSync(
			pathJoin(parentPath, 'readme.md'),
			`---\ngroupName: ${req.body.parent.name}\n---\n`
		);
	}
	const markdown =
		`---\npostName: ${req.body.post.name}\n---\n\n# ${req.body.post.name}\n\n` +
		turndownService.turndown(req.body.html).replace(/^(#{1,5})/gm, '$1#') +
		'\n';
	writeFileSync(postPath, markdown);

	res.status(200);
	return res.json({
		type: 'success'
	});
});

app.get('/api/dashboard', (req, res) => {
	if (!workDir) {
		res.status(404);
		return res.json({
			type: 'error',
			msg: 'Workdir is not set',
			redirect: {
				status: 302,
				redirect: '/'
			}
		});
	}
	return res.json({
		type: 'success',
		data: {
			stats: postStats(),
			workdir: workDir,
			theme: getThemeName(),
			features: getFeatures()
		}
	});
});

app.use(handler);

app.listen('8080', () => {
	console.log(`🚀 SveltePress UI running at: http://localhost:8080 🚀`);
	open('http://localhost:8080');
});
