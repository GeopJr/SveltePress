---
postName: Flutter
---

# Flutter

Just like the others, there are functions that prepare the index from the sidebar as well as importing the current title from the SveltePress config.

Flutter lazy loads the ListView items allowing it to handle long Lists with ease.

Flutter uses `flutter_html` to render the HTML which supports both local and external assets with little to no modifications.

Html gets updated using `ValueListenableBuilder` so we avoid rebuilding the whole widget.

Lastly, using `flutter_launcher_icons` it auto generates all the icons needed from the root one!
