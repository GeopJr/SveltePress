---
postName: Data Generator
---

# Data Generator

The main "magic" of SveltePress happens in `dataGenerator.js` and specifically the `createPressData` function.
`createPressData` is a recursive action that goes through all posts in `posts/` and creates the base structure that is being used internally to create the sidebar, index and everything else.
It generates a nested Map that gets quite complex. Thankfully, with the power of [jsesc](https://www.npmjs.com/package/jsesc) (more on jsesc later) we can have a look at it with ease by opening the `db/sveltePressData.js` file (it gets generated when you first run one of the `package.json` scripts).
Being recursive allows SveltePress to handle infinite-deep folders and display them correctly.

Lastly, `createPressData` is responsible for other stuff like ignoring posts that are marked as drafts and sorting the files based on the selecting sorting method.
