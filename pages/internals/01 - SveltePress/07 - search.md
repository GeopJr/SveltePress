---
postName: Search
---

# Search

`dataGenerator.js` takes an argument that instructs it to generate an index. That index is a Map of Path => Markdown Body. As always you can see it by opening the `db/sveltePressIndex.js` file.

That Index is being used with [FlexSearch](https://github.com/nextapps-de/flexsearch) so it can quickly look through everything!
Obviously since this is a "heavy" function, it only runs once per script run and parts of it are disabled in dev.
 