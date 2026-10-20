# orion-browser product page

A developer arriving from Works understands the browser ownership problem, sees
the supported host requirements, and can open the source release or setup guide.

- The product is orion-browser, MIT licensed, with public source in orion-browser-oss.
- The page gives complete source-install and setup commands, with prerequisites.
- The page discloses that leases coordinate trusted local agents, do not approve
  account actions, and do not isolate hostile users.
- One MCP server process is one holder, including subagents.
- The canonical URL is https://www.danmercede.com/works/orion-browser/.
- The page and asset URLs work through a prefix-stripped hub proxy and at the
  origin with the corresponding asset path. No separate domain or DNS change.
- Product copy is present in initial HTML and in the React render. Mobile readers
  can scroll code blocks without making the document wider than the viewport.

Validate at the built HTML boundary and with desktop/mobile browser inspection.
Deployment and rollback are described in docs/runbooks/release.md.

## Product demo

A visitor can watch the existing human-narrated ownership demonstration before
the setup instructions, starting playback themselves. The recording demonstrates
the released version and discloses that it replays real browser captures with
scripted workers and fictional accounts.

- Playback, seeking, volume and fullscreen use standard browser controls.
- The page does not autoplay or preload the full recording.
- English captions and an expandable transcript accompany the recording.
- The same recording and disclosure are available without JavaScript.
- Video, poster and captions resolve through the Works subpath rewrite.
- Source, guide, quickstart and security information remain accessible.

Test seams: built-page checks for initial HTML and packaged assets, followed by
desktop/mobile playback and seeking with and without JavaScript.
