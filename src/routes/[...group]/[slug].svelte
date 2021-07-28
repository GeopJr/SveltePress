<script context="module">
	export async function load({ page, fetch, session }) {
		const { group, slug } = page.params;

		// if theres a slug but not a group, redirect to the first
		// slugs' item (in this case the slug is the group)
		if (session.get('sidebar').has(slug) && (!group || group?.length === 0)) {
			let defaultFile;

			for (const [, value] of session.get('sidebar').get(slug)) {
				for (const [keyC] of value.files) {
					defaultFile = keyC;
					break;
				}
				if (defaultFile) break;
			}

			if (!defaultFile) {
				return {
					status: 400,
					error: 'No posts available'
				};
			}

			return {
				status: 307,
				redirect: defaultFile.replace(/\.[^/.]+$/, '')
			};
		}

		// needs to be post so slug and group are passed
		// from here
		const post = await fetch(`${slug}.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(page.params)
		}).then((r) => r.json());

		if (post?.error) {
			return {
				status: post.status,
				error: post.status === 404 ? 'Post not found' : 'Server Error'
			};
		}
		return {
			props: { post }
		};
	}
</script>

<script>
	import Content from '$lib/SveltePress/components/content.svelte';
	import Config from '$lib/SveltePress/sveltePress.config';

	export let post;
</script>

<svelte:head>
	<meta name="og:title" content={post.meta.postName + ' - ' + Config.title} />
	<title>{post.meta.postName + ' - ' + Config.title}</title>
</svelte:head>

<Content pagination={post.pagination} meta={post.meta}>
	{@html post.body}
</Content>
