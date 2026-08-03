import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('app imports site utilities and sets up intersection observation', async () => {
  const js = await readFile('assets/app.js', 'utf8');
  assert.match(js, /from '.\/site-utils\.js'/);
  assert.match(js, /IntersectionObserver/);
});

test('Vanta background respects reduced-motion preference and uses the requested configuration', async () => {
  const js = await readFile('assets/app.js', 'utf8');
  assert.match(js, /if \(reduceMotion \|\| !window\.VANTA\?\.NET\) return/);
  assert.match(js, /window\.VANTA\.NET/);
  assert.match(js, /color: 0xff6b27/);
  assert.match(js, /backgroundColor: 0x03010e/);
  assert.match(js, /maxDistance: 21/);
  assert.match(js, /spacing: 13/);
});

test('preloader is dismissed after loading or a bounded timeout', async () => {
  const js = await readFile('assets/app.js', 'utf8');
  assert.match(js, /#page-preloader/);
  assert.match(js, /window\.addEventListener\('load', hidePreloader/);
  assert.match(js, /window\.setTimeout\(hidePreloader, 4000\)/);
});
