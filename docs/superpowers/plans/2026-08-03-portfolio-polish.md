# Portfolio Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved hero, typography, network, animation, and spacing refinements to the portfolio page.

**Architecture:** Existing semantic HTML remains intact. The stylesheet owns font loading, `100vh` hero sizing, text contrast overlay, visual rhythm, and staggered reveal delays; the canvas renderer receives only the network contrast changes. The existing Node test suite gains contract checks for the new constraints.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner.

## Global Constraints

- Do not add a framework or build dependency.
- Set hero height to `100vh` on all viewports.
- Use Oswald at font weight 700 for display headings with a system fallback.
- Preserve readable hero copy using a local dark overlay over the animated network.
- Keep animation disabled under `prefers-reduced-motion: reduce`.
- Increase section spacing to 150px desktop and 96px mobile.

---

### Task 1: Add regression tests for visual contracts

**Files:**
- Modify: `tests/styles.test.js`
- Modify: `tests/app.test.js`

**Interfaces:**
- Produces checks for `100vh`, Oswald, contrast overlay, section spacing, staggered reveals, and brighter network styles.

- [ ] **Step 1: Write failing style checks**

```js
test('hero styling uses full viewport height and Oswald bold headings', async () => {
  const css = await readFile('assets/styles.css', 'utf8');
  assert.match(css, /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Oswald/);
  assert.match(css, /min-height:100vh/);
  assert.match(css, /font-family:Oswald/);
  assert.match(css, /font-weight:700/);
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `node --test tests/styles.test.js`

Expected: failure because the existing stylesheet has no Oswald import and uses a 720px hero.

- [ ] **Step 3: Write failing animation check**

```js
test('network renderer uses stronger connection visibility', async () => {
  const js = await readFile('assets/app.js', 'utf8');
  assert.match(js, /rgba\(255, 98, 0, \$\{0\.28/);
});
```

- [ ] **Step 4: Run test to verify failure**

Run: `node --test tests/app.test.js`

Expected: failure because the existing canvas opacity multiplier is 0.16.

### Task 2: Refine styling and motion

**Files:**
- Modify: `assets/styles.css`
- Modify: `assets/app.js`

**Interfaces:**
- Consumes existing hero, `.reveal`, and card classes.
- Produces a 100vh hero, readable dark text zone, Oswald headings, increased section rhythm, and staggered child reveals.

- [ ] **Step 1: Implement the minimal stylesheet update**

```css
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');

h1,h2 { font-family:Oswald,"Arial Narrow",sans-serif; font-weight:700; }
.hero,.hero__content { min-height:100vh; }
.hero::after { content:""; position:absolute; inset:0; background:radial-gradient(ellipse at 29% 53%,rgba(0,0,0,.96),rgba(0,0,0,.64) 27%,transparent 58%); pointer-events:none; }
.section { padding:150px 0; }
```

- [ ] **Step 2: Implement staggered reveal and canvas contrast update**

Add `transition-delay` values for direct card children and increase only the canvas line alpha multiplier from `0.16` to `0.28`. Keep the `prefers-reduced-motion` rule overriding stagger delays.

- [ ] **Step 3: Run all tests to verify success**

Run: `node --test tests/*.test.js`

Expected: all tests pass.

### Task 3: Verify final page behavior

**Files:**
- Verify: `index.html`, `assets/styles.css`, `assets/app.js`, `tests/*.test.js`

**Interfaces:**
- Consumes all revised page assets.
- Produces verified updated portfolio files.

- [ ] **Step 1: Run the full automated suite**

Run: `npm.cmd test && node --check assets/app.js`

Expected: all tests pass and JavaScript syntax check succeeds.

- [ ] **Step 2: Inspect source contracts**

Run: `rg -n "100vh|Oswald|150px|96px|hero::after|transition-delay" assets/styles.css`

Expected: all approved visual constraints appear in the stylesheet.

- [ ] **Step 3: Report outcome**

Report fresh test results and note any limitations of browser rendering checks.
