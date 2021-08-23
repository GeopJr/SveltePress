---
postName: Marked
---

# Markdown to HTML

SveltePress uses 3 tools to deal with markdown: Marked, front-matter & sanitize-html.

The only thing SveltePress depends on is the existence of Front Matter parse (handled in `MD2FM.js`). This means that you can replace everything with any tool you want, as long as Front Matter is parsed and returned in `MD2FM.js`. You can replace Marked and sanitize-html in the `MDConverter.js` file.

# Video (YouTube)

[![YouTube Video](https://img.youtube.com/vi/8sZrkXx0Iww/mqdefault.jpg)](https://www.youtube.com/watch?v=8sZrkXx0Iww&list=PLahj1xcdBwiHRLLS3ZPUoPLVNz6Fh3SnH&index=4)
