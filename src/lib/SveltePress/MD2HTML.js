import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js';
import md2fm from '$lib/SveltePress/MD2FM';
import { getContent } from '$lib/SveltePress/SveltePressData';

import { readFileSync, existsSync } from 'fs';
import path from 'path';

// sanitize-html options
const sanitizeOptions = {
	allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
	allowedClasses: {
		code: ['language-*', 'lang-*'],
		span: ['hljs-*']
	},
	selfClosing: []
};

// Marked options
marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: function (code, lang) {
		const language = hljs.getLanguage(lang) ? lang : 'plaintext';
		return hljs.highlight(code, { language }).value;
	},
	pedantic: false,
	gfm: true,
	breaks: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	xhtml: false
});

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
		// Here you can change the default markdown
		const content = marked(frontmatter.body);
		// Sanitize it
		// meta includes ALL fm attributes
		return {
			body: sanitizeHtml(content, sanitizeOptions),
			meta: frontmatter.attributes || {}
		};
	} catch (e) {
		return {
			error: true,
			status: 500
		};
	}
}
