---
postName: Production
---

# Production

So what's the point of these "databases" in the `db/` folder?
They are getting generated so we don't waste time and resources running all the generators in production every time a user accesses the website. They are being used in `SveltePressData.js` which returns them based on the build mode.

All functions that depend on them, they actually call the wrappers in `SveltePressData.js`.

They are being generated with [jsesc](https://www.npmjs.com/package/jsesc), which exports them into their own ES Modules.
