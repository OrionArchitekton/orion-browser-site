import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('built page identifies the tool and exposes canonical source and guide without JS', () => {
  assert.match(html, /rel="canonical" href="https:\/\/www\.danmercede\.com\/works\/orion-browser\/"/);
  assert.match(html, /<h1\b[^>]*>orion-browser<\/h1>/);
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

test('visitors can watch the disclosed demo and read its transcript without JavaScript', () => {
  const video = html.match(/<video\b[^>]*>[\s\S]*?<\/video>/)?.[0];
  assert.ok(video, 'initial HTML must include the playable product demo');
  assert.equal((html.match(/>Download the demo video<\/a>/g) || []).length, 1);
  assert.match(html.replace(/<video\b[^>]*>[\s\S]*?<\/video>/g, ''), /<a\b[^>]*\bdownload=/);
  assert.match(video, /\bcontrols\b/);
  assert.match(video, /\bplaysinline\b/i);
  assert.match(video, /preload="none"/);
  assert.doesNotMatch(video, /\bautoplay\b/);
  const track = video.match(/<track\b[^>]*>/)?.[0];
  assert.ok(track, 'demo must include a captions track');
  assert.match(track, /kind="captions"/);
  assert.match(track, /srclang="en"/i);
  assert.match(track, /src="\/works\/orion-browser\/media\/[^"?#]+\.vtt"/);
  assert.match(video, /poster="\/works\/orion-browser\/media\/[^"?#]+\.jpg"/);
  const source = video.match(/<source\b[^>]*>/)?.[0];
  assert.ok(source, 'demo must include a playable source');
  assert.match(source, /src="\/works\/orion-browser\/media\/[^"?#]+\.mp4"/);
  assert.match(source, /type="video\/mp4"/);
  assert.match(html, /scripted workers and fictional accounts/);
  assert.match(html, /<summary\b[^>]*>Read the transcript<\/summary>/);
  assert.match(html, /Two AI agents can have separate conversations/);
  const media = [...html.matchAll(/(?:src|poster)="(\/works\/orion-browser\/media\/[^"?#]+)"/g)].map(m => m[1]);
  for (const extension of ['mp4', 'jpg', 'vtt']) {
    assert.ok(media.some(path => path.endsWith('.' + extension)), extension);
  }
  for (const asset of media) {
    assert.ok(existsSync(new URL('../dist/' + asset.replace('/works/orion-browser/', ''), import.meta.url)), asset);
  }
});
