import md2fm from '$lib/SveltePress/markdown/MD2FM';
import { mdConverter } from '$lib/SveltePress/markdown/MDConverter';
import { getContent } from '$lib/SveltePress/SveltePressData';

import { readFileSync, existsSync } from 'fs';
import path from 'path';

export function md2html(post) {
	try {
		let md = '';

		// First block handles dev mode
		// reads the file directly from disk
		// allowing md modifications without
		// the need to HMR
		// Second block handles prod
		// reads files from db
		if (!getContent()) {
			let fullPath = path.resolve(`pages/${post}.md`);
			if (!existsSync(fullPath)) {
				return {
					error: true,
					status: 404
				};
			}
			md = readFileSync(fullPath).toString();
		} else {
			let fullPath = getContent().has(`${post}.md`);
			if (!fullPath) {
				return {
					error: true,
					status: 404
				};
			}
			md = getContent().get(`${post}.md`);
		}

		const frontmatter = md2fm(md);
		const content = mdConverter(frontmatter.body);
		// meta includes ALL fm attributes
		return {
			body: content,
			meta: frontmatter.attributes || {}
		};
	} catch (e) {
		return {
			error: true,
			status: 500
		};
	}
}
