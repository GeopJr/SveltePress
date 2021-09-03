---
postName: Installing
---

# Installing

You can either add the GUIs to your existing project or create a new one with them pre-included!

> Note: if your SveltePress is older, you will need to pass some settings to Vite so it doesn't watch this huge folder! See: `svelte.config.js`.

Using create-sveltepress-app:

```bash
# If you have SveltePress installed already
npx create-sveltepress-app add --gui

# If you don't have SveltePress installed you
# can include this by adding the `--gui` flag
# eg.
npx create-sveltepress-app create my-sveltepress-project --gui
```

Using degit:

```bash
# has to be done after installing SveltePress
# aka this is only for adding it
npx degit GeopJr/SveltePress/gui ./gui
```
