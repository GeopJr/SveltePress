<script context="module">
	export async function load({ page, fetch, session }) {
		const { group, slug } = page.params;

		// if theres a slug but not a group, redirect to the first
		// slugs' item (in this case the slug is the group)
		if (session.has(slug) && (!group || group?.length === 0)) {
			return {
				status: 307,
				redirect: session
					.get(slug)
					.values()
					.next()
					.value.files.keys()
					.next()
					.value.replace(/\.[^/.]+$/, '')
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

<Content pagination={post.pagination}>
	{@html post.body}
</Content>
