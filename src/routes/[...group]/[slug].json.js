import { md2html } from '$lib/SveltePress/markdown/MD2HTML';
import { getData } from '$lib/SveltePress/SveltePressData';

// Gets current folder from spData used to get the file
function getFolder(folderStructure) {
	let folder = getData();
	if (folderStructure.length > 0) {
		const folders = folderStructure.split('/');
		for (let i = 0; i < folders.length; i++) {
			folder = folder.get('folders').get(folders[i]);
			if (folder === undefined) break;
		}
		if (folder === undefined) return;
	}
	return folder;
}

// Gets the file based on the folder returned from getFolder
// and the slug
function getFile(folder, slug) {
	if (folder && folder.get('files').has(slug + '.md')) {
		return folder.get('files').get(slug + '.md');
	} else {
		return;
	}
}

// Creates pagination based on the folder returned from getFolder
function getPagination(folder, slug) {
	if (folder && folder.get('files').has(slug + '.md')) {
		const files = folder.get('files').entries();

		let previous, next;
		let found = false;
		for (const [, value] of files) {
			if (found) {
				next = value;
				break;
			}
			if (value.get('name') === slug) {
				found = true;
			} else {
				previous = value;
			}
		}

		return {
			previous,
			next
		};
	}
	return;
}

// Handle post request
export function post({ params, body }) {
	// Get slug and group either from post body
	// if avaliable, else from params (not always correct)
	const { slug, group } = body ?? params;

	let post = group + '/' + slug;

	const content = md2html(post);

	if (content.error) {
		return { body: content };
	}

	let folder = getFolder(group);

	let file = getFile(folder, slug);

	// Injects file date if not manually defined
	// this can be used in [slug].svelte
	if (!Object.prototype.hasOwnProperty.call(content.meta, 'date') && file) {
		content.meta.date = file.get('date');
	}

	// Same for postName
	if (!Object.prototype.hasOwnProperty.call(content.meta, 'postName') && file) {
		content.meta.postName = file.get('postName');
	}

	const pagination = getPagination(folder, slug);

	// Pagination can return undefined
	// if so, use the exact next available file for next
	let paginationBody = {
		previous: null,
		next: Object.fromEntries(folder.get('files').values().next().value ?? [])
	};

	if (pagination) {
		paginationBody = {
			previous: Object.fromEntries(pagination.previous ?? []),
			next: Object.fromEntries(pagination.next ?? [])
		};
	}

	// meta is all fm metadata
	const responseBody = {
		body: content.body,
		meta: content.meta,

		pagination: paginationBody
	};

	return {
		body: responseBody
	};
}
