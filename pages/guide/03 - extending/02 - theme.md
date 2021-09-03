---
postName: Themes
---

# Themes

SveltePress has a simple theming API(?) making theme creation a breeze!

### To get this out of the way, if you are a user, you can replace your current theme using CSA (create-sveltepress-app) (>= 2.0.0).

Here's some examples (CSA also provides examples on its help menu):

```bash
# Create a new SveltePress with the cakepop theme
npx create-sveltepress-app create my-sveltepress-project --theme=GeopJr/cakepop
# Replace your current theme with cakepop and add pandoc (assumes you are at the root of your Sveltepress project)
npx create-sveltepress-app add --theme=GeopJr/cakepop --pandoc
# Restore to the default theme
npx create-sveltepress-app add --theme=GeopJr/SveltePress/src/lib/SveltePress/theme/
```

As you might have noticed from that last example, the `--theme` arg takes anything degit accepts.
That means that you can point it at branches, subfolders, tags, handle `degit.json` and more!

### Now, for theme creators.

For starters there are two 'official' themes that you can use as examples or base your own theme on:

`sveltepress-carbon`: The default one. Uses Carbon Design System. (It's on the main repo).
`cakepop`: Uses Tailwind (well... Windi) & daisyUI. ([https://github.com/GeopJr/cakepop](https://github.com/GeopJr/cakepop))

#### Structure

```bash
tree ../cakepop/
../cakepop/
├── components
│   ├── content.svelte
│   ├── modal.svelte
│   ├── navbar.svelte
│   ├── search.svelte
│   └── sidebar.svelte
├── degit.json
├── index.svelte
├── meta
│   ├── package.json
│   ├── root
│   │   └── windi.config.js
│   └── svelte.config.js
└── styles
    ├── global.scss
    └── patches.scss

4 directories, 12 files
```

Let's start from the top:

##### Components

The required ones are `content`, `navbar`, `search`, `sidebar`. Those interact with the wrappers located at `lib/SveltePress/components`.
They **MUST** exist. However, as you can see in the cakepop example, those can have sub-components (in this case, `modal`).

The wrappers pass the required info to them, you don't have to consume everything. Feel free to log/debug them to handle them correctly.

Another important piece of info is that eg. navbar is always in view and in the case of cakepop, I was able to pass `import "virtual:windi.css";` in it.

##### Theme modes

Navbar is responsible for toggling the current theme in store. To enforce a similar experience to users, there are 4 themes (inherited from Carbon):

`white`: Light, no contrast
`g10`: Light, contrast
`g90`: Dark, contrast
`g100`: Dark, no contrast

These are being set at root `theme="g100" data-theme="g100"` so you can target them in (s)css using `:root[theme='g100']`.
To read more on how theme mode works, take a look at the [internal docs](https://sveltepress.geopjr.dev/internals/01%20-%20SveltePress/07%20-%20Theme), but in summary, initially it uses the `prefers-color-scheme` media and sets it in localstorage (and the store).

##### degit.json

Since the themes are getting installed using degit, you can configure it to delete certain files or clone additional. Popular files include `LICENSE`, `README.md`, `CODE_OF_CONDUCT.md` & more since they are not usually needed in the user's folder.

##### index.svelte

Well, thats the index.svelte which will **REPLACE** the one at `src/routes/` folder of the project.

##### meta/package.json

Include your dependencies here. SveltePress only needs the `devDependencies` and/or `dependencies` keys, feel free to fill the rest with anything you'd like (eg. author, name, version etc.). Any scripts won't be ran by SveltePress.

The dependencies will be added to the package.json at root.

##### meta/root/

Anything in this folder will be copied to the root BUT it **WON'T OVERWRITE** anything that already exists. cakepop uses it to move the windi config.

##### svelte.config.js

`svelte.config.js` is **REQUIRED**.
To avoid themes overriding user options and the default ones, only the `config.kit.vite` and `config.preprocess` keys are being used by SveltePress.
However don't let this restrict you, you can do a whole lot of things with vite! For example, `sveltepress-carbon` rewrites the imported style when in dev mode to a precompiled one, so you don't waste time compiling the theme over and over again!

> Note: the keys get combined with the ones already in config. So eg. you don't need to use svelte preprocess if you don't want to extend it, as it's already been used by default.

##### styles/

`global.scss` is **REQUIRED**.
Leave it empty if you don't plan on using it.
It's the main style import from `__layout`. You can split it however you want as long as it's the main entry. (`sveltepress-carbon` imports a `patches.scss` in it).

### That's all

If you require extra info from the wrappers, feel free to open an issue.
As always, there are no restrictions to `sveltepress-carbon` or `cakepop`, modify as you please!
