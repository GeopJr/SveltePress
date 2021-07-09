---
postName: Naming
---

# Naming

As mentioned before, (GRAND)PARENT and CHILD.md names don't only depend on their file names. This means that a file can be named `salad-review-01.md` but have it displayed as `Greek Salad Review` on the sidebar.

Filenames are being used for **sorting** (and if there isn't a custom name set). For example, the following two files, `salad-review-01.md`, `salad-review-02.md`, will be displayed in the following order on the sidebar:

```md
- salad-review-01
- salad-review-02
```

However their names can be:

```md
- Greek Salad Review
- Caesar Salad Review
```

They are sorted based on their filenames and not their custom names.

## CHILD.md - Post custom names

Markdown files can have metadata using Front Matter. In general, it's just a YAML object at the top of your file. SveltePress uses `postName` as the custom name for CHILD.md.

Eg.

```md
---
postName: Greek Salad Review
---

I liked it
```

## (GRAND)PARENT - Category custom names

Just like above, but there are 2 differences:

- It has to be in a file named `readme.md` at the root of the folder
- Instead of `postName` the key is `groupName`

#### Why readme.md?

Readme.md is a popular file name for a "cover" of a git repo. Usually it gets rendered along-side the client's explorer. This means that if the content is on a git repo, the user will be able to see this file rendered.

Eg. in the following sidebar

![SveltePress example sidebar](https://i.imgur.com/Eiy8q4i.png)

inside the `posts/blog/` folder there's a readme with the following content:

```md
---
groupName: Blog
---

This folder contains random blog posts I wrote!
```

apart from setting the custom name, it will look like this on a git client:
![screenshot of github readme](https://i.imgur.com/AWXCsi0.png)
