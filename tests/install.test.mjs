import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('built page installs the v0.1.1 PyPI release and names its MCP listings', () => {
  assert.match(html, /uv tool install orion-browser-oss==0\.1\.1/);
  assert.match(html, /python -m pip install orion-browser-oss==0\.1\.1/);
  assert.match(html, /raw\.githubusercontent\.com\/OrionArchitekton\/orion-browser-oss\/v0\.1\.1\/config\.example\.toml/);
  assert.match(html, /uvx --from orion-browser-oss==0\.1\.1 orion-browser-mcp/);
  assert.match(html, /io\.github\.OrionArchitekton\/orion-browser-oss/);
  assert.match(html, /gemini extensions install https:\/\/github\.com\/OrionArchitekton\/orion-browser-oss --ref v0\.1\.1/);
  assert.match(html, /releases\/tag\/v0\.1\.1/);
  assert.match(html, /"softwareVersion": "0\.1\.1"/);
  assert.doesNotMatch(html, /No PyPI package required|git clone --branch v0\.1\.0|releases\/tag\/v0\.1\.0|v0\.1\.0 release|"softwareVersion": "0\.1\.0"/);
});
