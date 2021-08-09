---
postName: Drafts
---

# Drafts

You can mark a post or a group as a draft by setting the `draft` frontmatter key to true.

E.g.

Post:
```md
---
postName: Drafts
draft: true
---
```

Group:
```md
---
groupName: Writing
draft: true
---
```

Doing so will remove the post (or the group & all its sub-groups and their posts) from everywhere.

> Note: In dev mode, files are being read from disk (to avoid reloading and generating index), which means that a draft might be accessible from the address bar.
