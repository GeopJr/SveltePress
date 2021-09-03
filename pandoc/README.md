<p align="center">
  <img alt="SveltePress along with Pandoc's logo" src="https://i.imgur.com/afTjJIK.png">
</p>
<h1 align="center">SveltePress-Pandoc</h1>
<h4 align="center">Documentation for humans in more formats.</h4>
<h4 align="center">Powered by <a href="https://pandoc.org/">pandoc</a>.</h4>
<p align="center">
  <br />
    <a href="https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="Code Of Conduct" /></a>
    <a href="https://github.com/GeopJr/SveltePress/blob/main/UNLICENSE"><img src="https://img.shields.io/badge/LICENSE-UNLICENSE-ff3e00.svg?style=for-the-badge&labelColor=ffd0bf" alt="UNLICENSE" /></a>
</p>

#

## Warning

Just like the GUIs, this uses parts created during **production builds**. You need to have done at least one prod build of SveltePress.

#

## Dependencies

The main one is pandoc: https://pandoc.org/installing.html

Apart from that, additional dependencies might be required based on the desired output (eg. pdf).

#

## Installing

Using create-sveltepress-app:

```bash
# If you have SveltePress installed already
npx create-sveltepress-app add --pandoc

# If you don't have SveltePress installed you
# can include this by adding the `--pandoc` flag
# eg.
npx create-sveltepress-app create my-sveltepress-project --pandoc
```

Using degit:

```bash
# has to be done after installing SveltePress
# aka this is only for adding it
npx degit GeopJr/SveltePress/pandoc ./pandoc
```

After adding:

```bash
# Use of PNPM is encouraged
pnpm i
# Build epubs
pnpm run pandoc
```

#

## Info Tables

Additional Scripts:

| Name              | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `preparePosts.js` | Compiles posts into a unified HTML (per GRANDPARENT) |
| `runPandoc.js`    | Runs pandoc for you with some defaults               |

NPM Scripts:

| Name      | Description                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `prepare` | Runs `preparePosts.js`                                                                                                                          |
| `pandoc`  | Runs `runPandoc.js`. It accepts a `-o` flag used to specify output type (eg. `pnpm run pandoc -- -o .epub` or `-o something.epub` or `-o epub`) |

> Run using `pnpm run {Script Name}`

#

## Notes

- Feel free to modify the `runPandoc.js` file to meet your desired outcome.

#

## Contributing

1. Read the [Code of Conduct](https://github.com/GeopJr/SveltePress/blob/main/CODE_OF_CONDUCT.md)
2. Fork it ( https://github.com/GeopJr/SveltePress/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request
