---
postName: Structure
---

# Structure

All markdown files **must** be inside the `posts/` folder and follow the following structure:

```bash
pages
└── GRANDPARENT
    ├── CHILD.md
    ├── PARENT
    │   ├── CHILD.md
    │   ├── CHILD.md
    │   ├── CHILD.md
    │   ├── PARENT
    │   │   ├── CHILD.md
    │   │   └── CHILD.md
    │   └── CHILD.md
    └── CHILD.md
```

At the root of the `pages` folder, there must be only GRANDPARENTs aka folders that act as bigger categories. Those are isolated allowing you to have setups likes: `blog, music_reviews, recipes` or `guide_en, guide_el, guide_it, guide_es`.

In the following screenshot, `Blog` is a GRANDPARENT, the active document is a CHILD.md in the root of GRANDPARENT, `music` is a PARENT and the items under it are CHILD.md.

![SveltePress sidebar generated using the previous structure](https://i.imgur.com/Eiy8q4i.png)

And the structure in file manager:

![Screenshot of file manager showing grandparents](https://i.imgur.com/82XGnF8.png)

![Screenshot of file manager showing parents](https://i.imgur.com/vSeThhH.png)

![Screenshot of file manager showing children](https://i.imgur.com/wIpnwGk.png)

> Note: PARENTs can have other PARENTs as children. SveltePress will handle them correctly.
