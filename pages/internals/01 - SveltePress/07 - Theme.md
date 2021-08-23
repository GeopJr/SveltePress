---
postName: Theme
---

# Theme

`Theme.svelte` is responsible for setting the initial theme and handling changes. On mount it gets the current theme from localStorage (if set), checks if the theme is one of ours, if it is it sets it, if it's not, it then sets one based on the browser's prefers-color-scheme media query. On theme change, it adds it to the body element of the document and saves it in localStorage.
