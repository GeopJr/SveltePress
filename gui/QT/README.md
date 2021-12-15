<p align="center">
  <img alt="SveltePress along with QT's logo" src="https://i.imgur.com/vgGJ8nn.png">
</p>
<h1 align="center">SveltePress-QT</h1>
<h4 align="center">Documentation for humans in QT.</h4>
<h4 align="center">Powered by <a href="https://nodegui.org">NodeGui</a>.</h4>
<p align="center">
  <br />
    <a href="https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.1-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="Code Of Conduct" /></a>
    <a href="https://github.com/GeopJr/SveltePress/blob/main/UNLICENSE"><img src="https://img.shields.io/badge/LICENSE-UNLICENSE-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="UNLICENSE" /></a>
</p>

<p align="center">
  <img width="768" alt="SveltePress QT based GUI" src="https://i.imgur.com/LCHAwsY.png" />
</p>

#

## Dependencies

### My environment (Linux)

- Make: 4.3
- GCC: 11.1.0
- NodeJS: 16.7.0
- PNPM: 6.14.2

### Linux

- Make, GCC v7
- CMake >= 3.1
- NodeJS >= 12.x
- PNPM >= 6.14.2

> From: https://docs.nodegui.org/docs/guides/getting-started#setting-up-on-linux

### macOS

- macOS >= 10.10 (64-bit)
- Make, GCC v7
- CMake >= 3.1
- NodeJS >= 14.x
- PNPM >= 6.14.2

> From: https://docs.nodegui.org/docs/guides/getting-started#setting-up-on-macos

### Windows

- Visual studio >= 2017
- CMake >= 3.1
- NodeJS >= 14.x
- PNPM >= 6.14.2

> From: https://docs.nodegui.org/docs/guides/getting-started#setting-up-on-windows

#

## Installing

```bash
# Use of PNPM is encouraged
pnpm i
# Prepare stuff
pnpm run prepare
```

#

## Info Tables

Abilities:

| Description     | Works on 🐧 | Works on 🍎 | Works on 🪟 | Comments                                                                |
| --------------- | ----------- | ----------- | ---------- | ----------------------------------------------------------------------- |
| Build           | ✅          | 😕          | 😕         | It should work on all platforms                                         |
| Pack            | ✅          | ✅          | ❌         | AppImage, dmg, unzipped folder                                          |
| Icon            | ✅          | 😕          | ❌         | macOS: no idea, Windows: an exe with no icon iirc                       |
| Name            | ✅          | ✅          | 😕         | iirc you can just rename the exe(?)                                     |
| Local Assets    | ✅          | 😕          | 😕         | It should work on all platforms, assets get copied from `../../static/` |
| External Assets | ❌          | ❌          | ❌         | `QTextBrowser`                                                          |

Additional Scripts:

| Name               | Description                     |
| ------------------ | ------------------------------- |
| `prepareAssets.js` | Moves assets from root to packs |
| `prepareMeta.mjs`  | Compiles handlebars templates   |

NPM Scripts:

| Name        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `dev`       | Dev build                                                                |
| `dev:watch` | Dev build wrapped watched by nodemon                                     |
| `debug`     | https://docs.nodegui.org/docs/guides/debugging                           |
| `build`     | Prod build                                                               |
| `prepare`   | Run prepareMeta [Run every time the title in SveltePress config changes] |
| `pack`      | Runs build, prepare, prepareAssets and then packer                       |

> Run using `pnpm run {Script Name}`

#

## Notes

- If you use any of the target platforms, testing any untested feature, providing fixes for the failed tests or including any missing steps/dependencies would help a lot!
- Packing might require additional steps (in the case of Windows for example, you need to zip it yourself). These can be automated if indentified.
- Don't forget to follow [NodeGui's Docs](https://docs.nodegui.org/) for additional customization.

#

## Contributing

1. Read the [Code of Conduct](https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md)
2. Fork it ( https://github.com/GeopJr/SveltePress/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request
