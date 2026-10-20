---
verified: 2026-10-19
review_after: 2027-01-19
topics: [orion-browser, product-page, release]
references: [vite.config.ts, vercel.json, constants.ts, index.html, docs/product-demo.md]
---

# Product page release

Run `npm ci`, `npm run build`, and `npm test`. Inspect desktop and mobile layouts.
Check built HTML for the product canonical, public repository, guide link, and
product copy. The social image is 1200 by 630 pixels.

The product demo is served from this site's `public/media/` directory. Follow
`docs/product-demo.md` for its source, integrity checks and refresh criteria.
Check native playback, seeking, captions and transcript at desktop and mobile
sizes, with JavaScript enabled and disabled. The MP4 must not autoplay or preload
before interaction. Creative and listening acceptance remains with Dan.

Deploy this project as its own external static site. Verify the local deployment
link belongs to this project before deployment. The origin must serve public HTML
without a login wall. Do not add a domain: the main site proxies this origin.

The hub needs an explicit bare `/works/orion-browser/` rewrite and a second asset
rewrite that strips that prefix. A no-slash URL redirects to the canonical slash.
Do not generate a physical hub page at the proxy path.

After the hub merge and deployment, check the final canonical URL, page title,
and one script URL for the correct JavaScript content type. An HTTP 200 serving
the hub homepage is a failed verification.

On the final Works URL, start the demo and seek to a later scene. Confirm the MP4
returns `video/mp4`, captions return WebVTT, and no request falls through to hub
HTML. A successful build or media HTTP response alone does not prove playback.
Only final-route verification establishes public availability.

Monitor those same responses after release. For rollback, restore the previous
site deployment and revert the hub routing/card change through its normal PR
flow. Preserve the source release and report any withdrawn link explicitly.
