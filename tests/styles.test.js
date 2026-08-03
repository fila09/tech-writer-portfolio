import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('stylesheet includes a narrow-screen layout and reduced-motion rule', async () => {
  const css = await readFile('assets/styles.css', 'utf8');
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test('reveal elements remain visible until JavaScript enables animations', async () => {
  const css = await readFile('assets/styles.css', 'utf8');
  assert.match(css, /\.js-enabled \.reveal \{ opacity:0/);
  assert.doesNotMatch(css, /(^|\n)\.reveal \{ opacity:0/);
});

test('hero styling uses full viewport height and Oswald bold headings', async () => {
  const css = await readFile('assets/styles.css', 'utf8');
  assert.match(css, /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Oswald/);
  assert.match(css, /min-height:100vh/);
  assert.match(css, /font-family:Oswald/);
  assert.match(css, /font-weight:700/);
  assert.match(css, /\.hero::after/);
  assert.match(css, /\.section \{ padding:150px 0/);
  assert.match(css, /\.section \{ padding:96px 0/);
  assert.match(css, /transition-delay/);
});

test('typography and card hover match the approved scale', async () => {
  const css = await readFile('assets/styles.css', 'utf8');
  assert.match(css, /\.hero__title \{[^}]*font-size:120px[^}]*line-height:\.9/);
  assert.match(css, /h2 \{[^}]*font-size:44px[^}]*line-height:1\.1/);
  assert.match(css, /h3 \{[^}]*font-size:30px[^}]*line-height:1\.4/);
  assert.match(css, /\.site-nav a \{[^}]*font-size:16px[^}]*line-height:1\.2/);
  assert.match(css, /p \{[^}]*font-size:18px[^}]*line-height:1\.3/);
  assert.match(css, /@media \(hover: hover\)/);
  assert.match(css, /box-shadow:inset 3px 0 0 var\(--orange\)/);
});
