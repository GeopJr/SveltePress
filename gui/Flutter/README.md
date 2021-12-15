<p align="center">
  <img alt="SveltePress along with Flutter's logo" src="https://i.imgur.com/c1udvEW.png">
</p>
<h1 align="center">SveltePress-Flutter</h1>
<h4 align="center">Documentation for humans in QT.</h4>
<h4 align="center">Powered by <a href="https://flutter.dev/">Flutter</a>.</h4>
<p align="center">
  <br />
    <a href="https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.1-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="Code Of Conduct" /></a>
    <a href="https://github.com/GeopJr/SveltePress/blob/main/UNLICENSE"><img src="https://img.shields.io/badge/LICENSE-UNLICENSE-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="UNLICENSE" /></a>
</p>

<p align="center">
  <img width="256" alt="SveltePress Flutter mobile based GUI" src="https://i.imgur.com/dd8jyRy.png" />
</p>

#

## Dependencies

### My environment (Linux)

- Flutter: 2.5.0-5.2-pre
- Flutter Channel: beta
- Flutter Framework: 19c61fed0d
- Flutter Engine: 7a4c4505f6
- Dart: 2.14.0
- NodeJS: 16.7.0
- PNPM: 6.14.2

### All Platforms

- NodeJS >= 12.x
- PNPM >= 6.14.2
- Flutter >= 2.4.0-4.2.pre

> Please follow the instructions at https://flutter.dev/

### Requirements

- `flutter` & `dart` should be in PATH
- `flutter doctor` should be all ticked (minus Chrome if you don't care about Web)
- Flutter will probably need to switch to the beta channel using `flutter channel beta`
- PC targets require `flutter config` `--enable-linux-desktop` or `--enable-macos-desktop` or `--enable-windows-desktop`

#

## Installing

```bash
# Use of PNPM is encouraged
pnpm i
# Get dependencies
flutter pub get
# Prepare stuff
pnpm run prepare
pnpm run rename
```

#

## Info Tables

Abilities:

| Description     | Works on 🤖 | Works on 🍏 | Works on 🐧 | Works on 🍎 | Works on 🪟 | Works on 🌐 | Comments                                                                                                                         |
| --------------- | ----------- | ----------- | ----------- | ----------- | ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Build           | ✅          | 😕          | ✅          | 😕          | 😕         | ✅          | It should work on all platforms                                                                                                  |
| Pack            | ✅          | 😕          | ❌          | 😕          | 😕         | ✅          | PC targets _probably_ require manual packing                                                                                     |
| Icon            | ✅          | 😕          | ❌          | 😕          | 😕         | 😕          | Linux: requires packaging, macOS+Windows+Web: the icon generator plugin doesn't support these yet (soon) (need manual replacing) |
| Name            | ✅          | 😕          | ❌          | 😕          | 😕         | ✅          | iirc you can just rename the exe(?)                                                                                              |
| Local Assets    | ✅          | 😕          | ✅          | 😕          | 😕         | ✅          | It should work on all platforms, assets get copied from `../../static/`                                                          |
| External Assets | ✅          | 😕          | ✅          | 😕          | 😕         | ✅          | It should work on all platforms, Web: works only on HTML renderer (CORS)                                                         |

Additional Scripts:

| Name                | Description                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `prepareParents.js` | Creates a formatted index from the SveltePress ones, which then get's imported to Flutter |
| `prepareTitle.js`   | Compiles handlebars templates                                                             |
| `renamePackage.js`  | Renames the package name in the required files using `change_app_package_name`            |

NPM Scripts:

| Name                  | Description                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `start`               | Default `flutter run`                                                                                                    |
| `start:linux`         | Runs the linux version                                                                                                   |
| `start:macos`         | Runs the macos version                                                                                                   |
| `start:web`           | Runs the web version                                                                                                     |
| `start:web:html`      | Runs the web version (with html renderer)                                                                                |
| `start:web:canvaskit` | Runs the web version (with canvaskit (no external assets (CORS)))                                                        |
| `start:windows`       | Runs the windows version                                                                                                 |
| `build`               | Default `flutter build`                                                                                                  |
| `build:aab`           | Builds the appbundle                                                                                                     |
| `build:apk`           | Builds the apk (with `split-per-abi`)                                                                                    |
| `build:ipa`           | Builds the ipa                                                                                                           |
| `build:app`           | Builds the macOS app                                                                                                     |
| `build:linux`         | Builds the linux version                                                                                                 |
| `build:windows`       | Builds the windows version                                                                                               |
| `build:web:html`      | Builds the web (with html renderer)                                                                                      |
| `build:web:canvaskit` | Builds the web (with canvaskit (no external assets (CORS)))                                                              |
| `prepare`             | Runs prepareParents and then prepareTitle [Run every time posts get modified or the title in SveltePress config changes] |
| `rename`              | Runs renamePackage [Run every time the title in SveltePress config changes]                                              |
| `icongen`             | Generates icons using `flutter_launcher_icons`                                                                           |

> Run using `pnpm run {Script Name}`

#

## Notes

- If you use any of the target platforms, testing any untested feature, providing fixes for the failed tests or including any missing steps/dependencies would help a lot!
- Packing might require additional steps (in the case of Windows for example, you need to zip it yourself). These can be automated if indentified.
- Don't forget to follow [NodeGui's Docs](https://docs.nodegui.org/) for additional customization.

#

## Oher Screenshots

<h4 align="center">Flutter</h4>
<h5 align="center">Desktop</h5>
<p align="center">
  <img width="768" alt="SveltePress Flutter desktop based GUI" src="https://i.imgur.com/JqsBBwi.png" />
</p>
<h5 align="center">Web</h5>
<p align="center">
  <img width="768" alt="SveltePress Flutter web based GUI" src="https://i.imgur.com/6trfjJg.png" />
</p>

#

## Contributing

1. Read the [Code of Conduct](https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md)
2. Fork it ( https://github.com/GeopJr/SveltePress/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request
