import { ProductData } from './types';

export const PRODUCT_DATA: ProductData = {
  "name": "orion-browser",
  "tagline": "Signed-in browsers your agents can take turns owning.",
  "credibility": "MIT licensed · Linux + systemd · Persistent profiles · CLI + MCP",
  "canonical": "https://www.danmercede.com/works/orion-browser/",
  "metaDescription": "A local Chrome pool for cooperative AI agents: persistent profiles, independent virtual screens, exclusive leases, and CDP endpoints for your existing browser driver.",
  "problem": {
    "heading": "One browser. Too many hands.",
    "body": "Two agents share a signed-in browser. One changes the tab while the other fills a form. Focus moves, identity gets mixed up, and the operator has to untangle the work."
  },
  "whatItDoes": {
    "heading": "Give the browser an owner.",
    "body": "orion-browser runs one headful Chrome per configured identity, on an independent virtual screen. Each agent leases a browser, connects its existing driver to the returned DevTools endpoint, renews during long work, and releases when finished. Sign-in state stays in the profile across clean restarts."
  },
  "cta": {
    "primaryLabel": "View on GitHub",
    "primaryUrl": "https://github.com/OrionArchitekton/orion-browser-oss",
    "secondaryLabel": "Read the setup guide",
    "secondaryUrl": "https://www.danmercede.com/guides/multi-agent-browser-pool"
  },
  "quickstart": {
    "heading": "Start with two identities",
    "intro": "Requires Linux with a systemd user instance, Python 3.11+, Google Chrome stable, TigerVNC, noVNC, websockify, xdotool, and xwd. The guide covers prerequisites and operator sign-in.",
    "blocks": [
      {
        "title": "Install the tagged source",
        "note": "No PyPI package required",
        "command": "git clone --branch v0.1.0 https://github.com/OrionArchitekton/orion-browser-oss.git\ncd orion-browser-oss\npython3 -m venv .venv\n. .venv/bin/activate\npython -m pip install ."
      },
      {
        "title": "Prepare the pool",
        "command": "mkdir -p ~/.config/orion-browser\ncp config.example.toml ~/.config/orion-browser/config.toml\norion-browser setup"
      },
      {
        "title": "Lease, connect, release",
        "note": "Use the returned endpoint with your CDP driver",
        "command": "orion-browser --json lease anon --holder agent-42\n# Connect your driver to data.endpoint.\n# Complete the task, renewing the lease during long work.\norion-browser --json release anon --holder agent-42"
      }
    ]
  },
  "commands": [
    {
      "name": "setup",
      "description": "Check host dependencies and prepare owner-only state and profile directories."
    },
    {
      "name": "status",
      "description": "Read browser state, holder, and expiry. It does not hand out an endpoint."
    },
    {
      "name": "lease",
      "description": "Acquire or renew a browser lease and receive its DevTools endpoint."
    },
    {
      "name": "release",
      "description": "Close the session and give back the lease while keeping the profile."
    },
    {
      "name": "view",
      "description": "Open an operator watch view, or request an interactive link as the holder."
    }
  ],
  "demo": {
    "heading": "Two holders, one identity",
    "intro": "Illustrative command flow. A different identity can run in parallel; the same identity has one lease holder.",
    "lines": [
      {
        "kind": "command",
        "text": "orion-browser --json lease work --holder agent-a"
      },
      {
        "kind": "comment",
        "text": "Agent A receives the session endpoint and expiry."
      },
      {
        "kind": "command",
        "text": "orion-browser --json lease work --holder agent-b"
      },
      {
        "kind": "output",
        "text": "BUSY: agent-a holds the unexpired lease",
        "tone": "fail"
      },
      {
        "kind": "command",
        "text": "orion-browser --json lease anon --holder agent-b"
      },
      {
        "kind": "comment",
        "text": "Agent B can work independently in the anonymous browser."
      },
      {
        "kind": "command",
        "text": "orion-browser --json release work --holder agent-a"
      },
      {
        "kind": "comment",
        "text": "The pool closes Chrome and verifies shutdown before freeing the lease."
      }
    ]
  },
  "differentiators": {
    "heading": "The useful boundaries",
    "points": [
      {
        "title": "Your driver, a leased browser",
        "body": "Keep agent-browser or Playwright. The pool manages leases and lifecycle; the driver attaches directly over CDP."
      },
      {
        "title": "Profiles persist. Sessions turn over.",
        "body": "A new holder after expiry gets a replacement Chrome session. The old session must be shown gone first. Expiry alone does not stop Chrome."
      },
      {
        "title": "MCP ownership is explicit",
        "body": "One MCP server process is one holder, including its subagents. Parallel workers need different browsers or distinct CLI holders."
      },
      {
        "title": "Coordination on a trusted host",
        "body": "This is not a sandbox or publishing approval layer. Local processes can bypass leases, and signed-in browsers carry real account authority. Read SECURITY.md before use."
      }
    ]
  },
  "links": [
    {
      "label": "GitHub repository",
      "url": "https://github.com/OrionArchitekton/orion-browser-oss",
      "primary": true
    },
    {
      "label": "v0.1.0 release",
      "url": "https://github.com/OrionArchitekton/orion-browser-oss/releases/tag/v0.1.0",
      "primary": true
    },
    {
      "label": "Setup guide",
      "url": "https://www.danmercede.com/guides/multi-agent-browser-pool",
      "primary": true
    },
    {
      "label": "Security model",
      "url": "https://github.com/OrionArchitekton/orion-browser-oss/blob/main/SECURITY.md"
    },
    {
      "label": "Dan Mercede",
      "url": "https://www.danmercede.com"
    }
  ],
  "footerNote": "MIT licensed. Built by Dan Mercede. Chrome and system dependencies are installed separately."
};
