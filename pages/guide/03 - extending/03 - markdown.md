---
postName: Marked
---

# Markdown to HTML

SveltePress uses 3 tools to deal with markdown: Marked, front-matter & sanitize-html.

The only thing SveltePress depends on is the existence of Front Matter parse (handled in `MD2FM.js`). This means that you can replace everything with any tool you want, as long as Front Matter is parsed and returned in `MD2FM.js`. You can replace Marked and sanitize-html in the `MD2HTML.js` file.
