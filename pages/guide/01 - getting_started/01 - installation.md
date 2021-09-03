---
postName: Installation, Running & Building
---

# Installation

The best way to install SveltePress is by using [degit](https://github.com/Rich-Harris/degit). degit works similarly to git but uses only the latest commit (plus can be configured to delete some files), you can read more about it on its repo page.

```bash
# Replace `my-sveltepress-project` with the name you desire
npx degit GeopJr/SveltePress my-sveltepress-project
# or by using create-sveltepress-app (which wraps the above)
npx create-sveltepress-app create my-sveltepress-project

# Change directory to the folder from the previous step
cd my-sveltepress-project

# Install dependencies
# PNPM is recommended but both YARN and NPM will do
pnpm install
```

> Note: `src/routes/index.svelte` is self-contained, feel free to delete, modify or leave it as is.

# Running

> Handled by SvelteKit

```bash
# PNPM/YARN/NPM
pnpm run dev -- --open
```

# Building

> Handled by SvelteKit

Open `svelte.config.js` and choose your preferred adapter (the comments will guide you).

```bash
# PNPM/YARN/NPM
pnpm run build

# Preview your build
pnpm run preview
```

> Note: Both `pnpm/yarn/npm run build` & `pnpm/yarn/npm run dev` run a small script that generates some index databases before running the svelte-kit command.
