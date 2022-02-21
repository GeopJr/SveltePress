---
postName: Slug Route
---

# Slug Route

`[slug].svelte` on load reads the group and slug/post that got passed to it.

If there's not group but only a slug, that means that the url is probably something like `/guide`. So it needs to get the first available post. It does so by looping the sidebar until it finds a post. If it doesn't it redirects to 400. If it does it loads it (it will go through the same process and continue with the following case).

If a group was also available, it sends a POST request with all params to `${slug}.json`.

`${slug}.json` is responsible for generating pagination and converting markdown to html. It also handles the post attributes like dates and names. Then it returns it back to `[slug].svelte`.

`[slug].svelte` then (if it didn't error) renders the component.
