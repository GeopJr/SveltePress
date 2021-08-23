<p align="center">
  <img alt="SveltePress along with the GTK, Flutter and QT logos" src="https://i.imgur.com/GKH8OWf.png">
</p>
<h1 align="center">SveltePress-Native</h1>
<h4 align="center">Documentation for humans became native.</h4>
<p align="center">
  <br />
    <a href="https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="Code Of Conduct" /></a>
    <a href="https://github.com/GeopJr/SveltePress/blob/main/UNLICENSE"><img src="https://img.shields.io/badge/LICENSE-UNLICENSE-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="UNLICENSE" /></a>
</p>

#

## What is SveltePress Native?

SveltePress (at least on production) exports some internal maps into their own ES Modules (using [jsesc](https://www.npmjs.com/package/jsesc)) that it later imports for performance and technical reasons. Using these modules along with other exported functions (eg. the markdown to html converter function), you are able to "recreate" SveltePress using other libraries and tools. This project does that with GTK, QT & Flutter, targeting Linux, MacOS, Windows, Android and iOS!

#

## Warning

The tooling is a bit more difficult to handle, especially for newcomers to those libraries. Each folder will include specific instructions, dependencies and requirements. Please read them carefully!

Keep in mind that each one of them has its advantages and disadvantages. Each readme contains a table with what's available and what has been tested.

#

## Global info

Some info & assets are being used globally between all libraries.

| Filename                   | Explaination                             | Note                                     |
| -------------------------- | ---------------------------------------- | ---------------------------------------- |
| `./sveltepresslogo.png`    | logo that will be used as app icon       | png, square                              |
| `../sveltePress.config.js` | the title is being used for the app name | anything non-latin or digit gets cleared |

#

## Installing

Using create-sveltepress-app:

```bash
# If you have SveltePress installed already
npx create-sveltepress-app --add=gui

# If you don't have SveltePress installed you
# can include this by adding the `--gui` flag
# eg.
npx create-sveltepress-app my-sveltepress-project --gui
```

Using degit:

```bash
# has to be done after installing SveltePress
# aka this is only for adding it
npx degit GeopJr/SveltePress/gui ./gui
```

#

## Emojicode

Used in info tables.

```js
{
    platform: {
        "🐧": "Linux",
        "🍎": "macOS",
        "🪟": "Windows",
        "🤖": "Android",
        "🍏": "iOS",
        "🌐": "Web"
    },
    review: {
        "✅": "Tested/Known that it's true",
        "😕": "Not Tested/IDK"
        "❌": "Failed test/Known that it doesn't work"
    }
}
```

#

## Screenshots

<h4 align="center">GTK</h4>
<p align="center">
  <a href="/GTK/"><img width="768" alt="SveltePress GTK based GUI" src="https://i.imgur.com/EhOZ3x6.png" /></a>
</p>
<h4 align="center">QT</h4>
<p align="center">
  <a href="/QT/"><img width="768" alt="SveltePress QT based GUI" src="https://i.imgur.com/LCHAwsY.png" /></a>
</p>
<h4 align="center">Flutter</h4>
<h5 align="center">Mobile</h5>
<p align="center">
  <a href="/Flutter/"><img height="768" alt="SveltePress Flutter mobile based GUI" src="https://i.imgur.com/dd8jyRy.png" /></a>
</p>
<h5 align="center">Desktop</h5>
<p align="center">
  <a href="/Flutter/"><img width="768" alt="SveltePress Flutter desktop based GUI" src="https://i.imgur.com/JqsBBwi.png" /></a>
</p>
<h5 align="center">Web</h5>
<p align="center">
  <a href="/Flutter/"><img width="768" alt="SveltePress Flutter web based GUI" src="https://i.imgur.com/6trfjJg.png" /></a>
</p>

#

## Contributing

1. Read the [Code of Conduct](https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md)
2. Fork it ( https://github.com/GeopJr/SveltePress/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request
