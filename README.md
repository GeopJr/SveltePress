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
  -- Main Dish
  --- Pizza
  --- Spaghetti
```

#

## Installation

The best way to install SveltePress is by using [degit](https://github.com/Rich-Harris/degit). degit works similarly to git but uses only the latest commit (plus can be configured to delete some files), you can read more about it on its repo page.

```bash
# Replace `my-sveltepress-project` with the name you desire
npx degit GeopJr/SveltePress my-sveltepress-project

# Change directory to the folder from the previous step
cd my-sveltepress-project

# Install dependencies
# PNPM is recommended but both YARN and NPM will do
pnpm install
```

> For more info on how SveltePress works, how to set it up & more, visit [https://sveltepress.geopjr.dev/](https://sveltepress.geopjr.dev/)

#

<p align="center">
    <img alt="diagram of filesystem and the coresponding sidebar" src="https://i.imgur.com/nD87FA2.png">
</p>

#

## Contributing

1. Read the [Code of Conduct](https://github.com/GeopJr/argyle/blob/main/CODE_OF_CONDUCT.md)
2. Fork it ( https://github.com/GeopJr/SveltePress/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request
