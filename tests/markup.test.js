import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('portfolio markup exposes all navigable sections', async () => {
  const html = await readFile('index.html', 'utf8');

  for (const id of ['about', 'experience', 'skills', 'projects', 'contacts']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test('hero markup provides the requested Vanta.NET dependencies and container', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.match(html, /three@0\.134\.0\/build\/three\.min\.js/);
  assert.match(html, /vanta@latest\/dist\/vanta\.net\.min\.js/);
  assert.match(html, /id="vanta-network"/);
});

test('page includes a decorative initial preloader', async () => {
  const html = await readFile('index.html', 'utf8');
  assert.match(html, /id="page-preloader"/);
  assert.match(html, /class="page-preloader"/);
});
