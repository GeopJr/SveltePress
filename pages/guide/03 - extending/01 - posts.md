---
postName: Posts
---

# Extending Posts

As mentioned before, markdown files can have metadata using Front Matter.

SveltePress directly makes them available alongside the post. So let's add some stuff!

## Tags

Let's say we want to add tags on a post, first of all we need to add it to the markdown metadata:

```md
---
postName: Posts
tags:
  - Svelte
  - Press
  - JS
  - Vite
---
```

Inside `src/routes/[...group]/[slug].svelte` the tags will be available by calling `post.meta.tags`.

Let's now display them at the top, by creating a Svelte loop that will display each one:

```svelte
<Content pagination={post.pagination} meta={post.meta}>
	{#each post.meta.tags || [] as tag}
		<span style="margin-right: 5px; padding: 2px; background-color: green">{tag}</span>
	{/each}
	{@html post.body}
</Content>
```

This will instantly have the following outcome:

![screenshot showing the tags on the post](https://i.imgur.com/JCY6A1A.png)

## Date

Similarly, we can also do the same for the date the file was modified or made. SveltePress already passes the last modified date in metadata, however this can get overwritten if eg. this is an old blog post.

```svelte
<Content pagination={post.pagination} meta={post.meta}>
	{post.meta.date}
	{@html post.body}
</Content>
```

![screenshot showing the date on the post](https://i.imgur.com/KlkFrQK.png)

### Other metadata ideas

- Last commit
- Last editor
- Original author
- Time to read
- Rating
- Edit on Git button

> Note: Obviously this is a bit more advanced. The built-in theme doesn't have any extra components for most metadata ideas. The `Content` component passes all metadata to theme, you can manually use them there.
