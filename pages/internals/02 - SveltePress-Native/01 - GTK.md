---
postName: GTK
---

# GTK

The GTK version uses [node-gtk](https://github.com/romgrk/node-gtk) along with a Glade file to generate the UI. The Widgets in Glade get populated with SveltePress data using handlebars.

`prepareGlade.js` reads the Sidebar from SveltePress and gives handlebars a correctly formatted object to build the Glade file.

Markdown gets converted by calling `MDConverter.js` real-time! The HTML then gets sent to the WebView which renders it.

That's pretty much all there is to this. There's also tiny webpack config used when running and building.
