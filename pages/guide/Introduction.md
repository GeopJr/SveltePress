# What's SveltePress?

SveltePress is a documentation tool built on top of [SvelteKit](https://kit.svelte.dev/), a "serverless-first" framework for building web applications for [Svelte](https://svelte.dev/).

SvelteKit & Svelte's simplicity allow the user to modify SveltePress to fit their needs with little to no effort while taking advantage of the incredible performance of both of them.

# How does SveltePress differ from other documentation tools?

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

As shown above, the sidebar is sorted alphabetically (or last modified) and categorized based on the folder structure. However, both category and post names do not only depend on the filename. This allows you to eg. have the following file names:

```md
01 - cream.md
02 - choco.md
```

but have them displayed as:

```md
- Ice Cream
- Chocolate
```

on the sidebar. More on that later.

# How does SveltePress work?

SveltePress relies on SvelteKit's [dynamic parameters](https://kit.svelte.dev/docs#routing-pages) to get the correct markdown file which then converts to HTML using [marked](https://github.com/markedjs/marked).

In production mode, all markdown files, get indexed for max performance while also enabling the search function powered by [FlexSearch](https://github.com/nextapps-de/flexsearch).

Deploying is handled by SvelteKit, which allows you to choose from a plethora of [adapters](https://kit.svelte.dev/docs#adapters) including node, Netlify, Vercel...

At the moment using the `static` adapter is not possible, as the dynamic routes won't get rendered.

# Credits

SveltePress wouldn't exist without the following:

- [Svelte](https://svelte.dev/)
- [SvelteKit](https://kit.svelte.dev/)
- [VuePress](https://vuepress.vuejs.org/)
- [Carbon Design System](https://www.carbondesignsystem.com/)

# Video (YouTube)

[![YouTube Video](https://img.youtube.com/vi/P23AeugwIFo/mqdefault.jpg)](https://www.youtube.com/watch?v=P23AeugwIFo&list=PLahj1xcdBwiHRLLS3ZPUoPLVNz6Fh3SnH)
