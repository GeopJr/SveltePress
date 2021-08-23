---
postName: Sidebar Generator
---

# Sidebar Generator

`sidebarGenerator.js` is responsible for generating the sidebars. Those are incredibly important too since many other functions depend on them.
sidebarGenerator's `createSidebar` function, also creates its own Map. That map makes it easy to handle relationships between `GRANDPARENTs`, `PARENTs` and `CHILD.md` and their desired names from FrontMatter. Just like in dataGenerator, you can see the structure at `db/sveltePressSidebar.js`.

You might wonder how are all those infinite-deep folders handled... It's easy, they get flattened! The main reason being that anything deeper than 2 levels is extremely difficult to display while still being easy to use.
