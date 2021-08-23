<p align="center">
  <img alt="SveltePress along with GTK's logo" src="https://i.imgur.com/lSPZr68.png">
</p>
<h1 align="center">SveltePress-GTK</h1>
<h4 align="center">Documentation for humans in GTK.</h4>
<h4 align="center">Powered by <a href="https://github.com/romgrk/node-gtk">node-gtk</a>.</h4>
<p align="center">
  <br />
    <a href="https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="Code Of Conduct" /></a>
    <a href="https://github.com/GeopJr/SveltePress/blob/main/UNLICENSE"><img src="https://img.shields.io/badge/LICENSE-UNLICENSE-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="UNLICENSE" /></a>
</p>

<p align="center">
  <img width="768" alt="SveltePress GTK based GUI" src="https://i.imgur.com/EhOZ3x6.png" />
</p>

#

## Dependencies

### My environment (Linux)

- NodeJS: 16.7.0
- PNPM: 6.14.2

### Linux

- Prebuilt Binaries Available
- NodeJS >= 14.x
- PNPM >= 6.14.2

> More info: https://github.com/romgrk/node-gtk#installing-and-building

### MacOS

- Prebuilt Binaries Available
- NodeJS >= 14.x
- PNPM >= 6.14.2

> More info: https://github.com/romgrk/node-gtk#installing-and-building

### Windows

- Unsupported

#

## Installing

```bash
# Use of PNPM is encouraged
pnpm i
# Prepare stuff
pnpm run glade
```

#

## Info Tables

Abilities:

| Description     | Works on 🐧 | Works on 🍎 | Comments                                                                                 |
| --------------- | ----------- | ----------- | ---------------------------------------------------------------------------------------- |
| Build           | ✅          | 😕          | It should work on all platforms                                                          |
| Pack            | ❌          | ❌          | Not ready, probably flatpak                                                              |
| Icon            | ❌          | ❌          | Linux: .desktop file needs to get installed, macOS: has to be included in the package    |
| Name            | ❌          | ❌          | Handled by .desktop and package, however HeaderBar should show correct title as it's CSD |
| Local Assets    | ❌          | ❌          | WebKitGTK doesn't like them                                                              |
| External Assets | ✅          | ✅          | `WebKitGTK`                                                                              |

Additional Scripts:

| Name                 | Description                            |
| -------------------- | -------------------------------------- |
| `prepareGlade.js`    | Compiles the Glade file                |
| `generateFlatpak.js` | [Not ready] creates the flatpak config |

NPM Scripts:

| Name        | Description                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------ |
| `dev`       | Dev build                                                                                        |
| `dev:watch` | Dev build wrapped watched by nodemon                                                             |
| `build`     | Prod build                                                                                       |
| `glade`     | Runs prepareGlade [Run every time posts get modified or the title in SveltePress config changes] |
| `start`     | Starts the prod build                                                                            |

> Run using `pnpm run {Script Name}`

#

## Notes

- If you use any of the target platforms, testing any untested feature, providing fixes for the failed tests or including any missing steps/dependencies would help a lot!
- WebKitGTK doesn't exactly play nice. Apart from the local assets, it also seems to extend to infinity unless a max size is set, which might not be the best for supporting multiple screen sizes.
- Packing is tricky, I have no idea how to at least generate the basic pre-packed macOS structure and on Linux Flatpak requires lot's of dependencies to build it, maybe AppImage?
- The `extra/` folder will contain additional files like logo and .desktop.hbs when packing is ready.
- Don't forget to follow [node-gtk's Docs](https://github.com/romgrk/node-gtk/blob/master/doc/index.md) for additional customization.

#

## Contributing

1. Read the [Code of Conduct](https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md)
2. Fork it ( https://github.com/GeopJr/SveltePress/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request
