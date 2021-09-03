<p align="center">
  <img alt="SveltePress branding" src="https://i.imgur.com/k0MgzIl.png">
</p>
<h1 align="center">SveltePress</h1>
<h4 align="center">Documentation for humans.</h4>
<p align="center">
  <br />
    <a href="https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="Code Of Conduct" /></a>
    <a href="https://github.com/GeopJr/SveltePress/blob/main/UNLICENSE"><img src="https://img.shields.io/badge/LICENSE-UNLICENSE-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="UNLICENSE" /></a>
</p>

#

## What is SveltePress?

SveltePress is a documentation tool built on top of [SvelteKit](https://kit.svelte.dev/), a "serverless-first" framework for building web applications for [Svelte](https://svelte.dev/).

SvelteKit & Svelte's simplicity allow the user to modify SveltePress to fit their needs with little to no effort while taking advantage of the incredible performance of both of them.

Apart from all the super powers inherited from Svelte & SvelteKit, the main point of SveltePress is to allow less knowledgeable users to create and publish content. To achieve that, SveltePress uses a filesystem-based structure.

For example the following structure...

```bash
pages
└── cooking
    ├── allergies.md
    ├── main_dish
    │   ├── pizza.md
    │   └── spaghetti.md
    └── readme.md
```

will generate the following sidebar:

```md
- Cooking
- Allergies
- Main Dish
  - Pizza
  - Spaghetti
```

#

## Installation

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

# A post-install script will now create some symlinks
```

#### On Windows (non-WSL), creating symlinks requires Admin Privileges, the script will ask you to re-run it in an Admin terminal.

> For more info on how SveltePress works, how to set it up & more, visit [https://sveltepress.geopjr.dev/](https://sveltepress.geopjr.dev/)

#

## Themes

There's not a curated theme gallery, but any repo will do.
Themes are being handled by `create-sveltepress-app`:

```bash
# Create a new SveltePress with the cakepop theme
npx create-sveltepress-app create my-sveltepress-project --theme=GeopJr/cakepop

# Or replace your current theme with cakepop (assumes you are at the root of your Sveltepress project)
npx create-sveltepress-app add --theme=GeopJr/cakepop

# Or restore to the default theme
npx create-sveltepress-app add --theme=GeopJr/SveltePress/src/lib/SveltePress/theme/
```

The `--theme` argument accepts anything degit handles (including branches, folders, tags etc.).

[cakepop](https://github.com/GeopJr/cakepop) is an 'official' theme using Windi CSS.

#

## GUI

SveltePress can create native GUIs for Android, iOS, Linux, macOS & Windows automatically! Visit the [/gui folder](https://github.com/GeopJr/SveltePress/tree/main/gui) for more info!

#

## Pandoc

SveltePress can export to epub, pdf, docx [and a whole lot more formats using Pandoc](https://pandoc.org/). Visit the [/pandoc folder](https://github.com/GeopJr/SveltePress/tree/main/pandoc) for more info!

#

<p align="center">
    <img alt="diagram of filesystem and the coresponding sidebar" src="https://i.imgur.com/nD87FA2.png">
</p>

#

## Video Docs

<a href="https://www.youtube.com/watch?v=P23AeugwIFo&list=PLahj1xcdBwiHRLLS3ZPUoPLVNz6Fh3SnH">
  <img width="512" alt="youtube video" src="https://img.youtube.com/vi/P23AeugwIFo/maxresdefault.jpg" />
</a>

#

## Contributing

1. Read the [Code of Conduct](https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md)
2. Fork it ( https://github.com/GeopJr/SveltePress/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request
