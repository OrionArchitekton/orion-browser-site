import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('built page identifies the tool and exposes canonical source and guide without JS', () => {
  assert.match(html, /rel="canonical" href="https:\/\/www\.danmercede\.com\/works\/orion-browser\/"/);
  assert.match(html, /<h1>orion-browser<\/h1>/);
  assert.match(html, /github\.com\/OrionArchitekton\/orion-browser-oss/);
  assert.match(html, /guides\/multi-agent-browser-pool/);
  assert.match(html, /not a sandbox/);
  assert.match(html, /orion-browser setup/);
  assert.match(html, /orion-browser --json lease anon --holder agent-42/);
  assert.match(html, /orion-browser --json release anon --holder agent-42/);
  assert.doesNotMatch(html, /mcp-context-budget|pypi\.org|v0\.4\.0/);
});

test('every built script and stylesheet lives at the proxy prefix and exists at the stripped origin', () => {
  const assets = [...html.matchAll(/(?:src|href)="(\/works\/orion-browser\/assets\/[^"?#]+)"/g)].map(m => m[1]);
  assert.ok(assets.some(a => a.endsWith('.js')));
  assert.ok(assets.some(a => a.endsWith('.css')));
  for (const asset of assets) {
    assert.ok(existsSync(new URL('../dist/' + asset.replace('/works/orion-browser/', ''), import.meta.url)), asset);
  }
});

test('manifest icons and start route resolve under the product subpath', () => {
  const manifest = JSON.parse(readFileSync(new URL('../dist/site.webmanifest', import.meta.url), 'utf8'));
  assert.equal(manifest.start_url, '/works/orion-browser/');
  for (const icon of manifest.icons) assert.ok(icon.src.startsWith('/works/orion-browser/'));
});
