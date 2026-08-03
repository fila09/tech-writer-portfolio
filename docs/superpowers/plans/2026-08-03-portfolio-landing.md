# Portfolio Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive Russian technical-writer portfolio from the approved design reference, including accessible navigation and restrained motion.

**Architecture:** The page is a standalone `index.html` with content and semantic landmarks. `assets/styles.css` contains the responsive visual system, while `assets/app.js` owns progressive enhancements: canvas rendering, section-state calculation, and reveal behavior. Pure viewport-independent helper functions are exported from `assets/site-utils.js` and tested by Node’s built-in test runner.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner.

## Global Constraints

- Do not introduce a framework, build step, or external dependency.
- Keep the page readable and all anchor navigation usable with JavaScript disabled.
- Use near-black, charcoal, white, muted-gray, and orange as the color system.
- Contact links use explicit temporary placeholders until real destinations are provided.
- Honour `prefers-reduced-motion: reduce` for all animation.
- Validate desktop and narrow mobile layouts manually in a browser.

---

### Task 1: Create deterministic UI helpers and tests

**Files:**
- Create: `package.json`
- Create: `assets/site-utils.js`
- Create: `tests/site-utils.test.js`

**Interfaces:**
- Produces `getActiveSection(sections, scrollY, viewportHeight): string` and `shouldReduceMotion(mediaQueryMatches): boolean`.
- `assets/app.js` consumes these exports to update the active header link and choose static versus animated canvas behavior.

- [ ] **Step 1: Write the failing tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getActiveSection, shouldReduceMotion } from '../assets/site-utils.js';

test('returns the last section whose top has passed the viewport marker', () => {
  const sections = [
    { id: 'about', top: 500 },
    { id: 'experience', top: 1200 },
  ];
  assert.equal(getActiveSection(sections, 800, 800), 'about');
});

test('returns true when reduced motion is requested', () => {
  assert.equal(shouldReduceMotion(true), true);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test tests/site-utils.test.js`

Expected: failure because `assets/site-utils.js` does not exist.

- [ ] **Step 3: Implement the minimal helpers**

```js
export function getActiveSection(sections, scrollY, viewportHeight) {
  const marker = scrollY + viewportHeight * 0.4;
  return sections.filter((section) => section.top <= marker).at(-1)?.id ?? '';
}

export function shouldReduceMotion(mediaQueryMatches) {
  return Boolean(mediaQueryMatches);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test tests/site-utils.test.js`

Expected: two passing tests.

- [ ] **Step 5: Record the change**

The workspace has no Git repository; do not attempt a commit. If a repository is later initialized, commit the three files with message `test: add site interaction helpers`.

### Task 2: Build semantic portfolio markup

**Files:**
- Create: `index.html`
- Create: `tests/markup.test.js`

**Interfaces:**
- Consumes: stylesheet at `assets/styles.css`, enhancement module at `assets/app.js`.
- Produces IDs `about`, `experience`, `skills`, `projects`, and `contacts` for header links and JavaScript.

- [ ] **Step 1: Write a failing structural check**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('portfolio markup exposes all navigable sections', async () => {
  const html = await readFile('index.html', 'utf8');
  for (const id of ['about', 'experience', 'skills', 'projects', 'contacts']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});
```

- [ ] **Step 2: Run the structural check to verify it fails**

Run: `node --test tests/markup.test.js`

Expected: failure because `index.html` does not exist.

- [ ] **Step 3: Implement the semantic document**

Create a Russian-language HTML document with a labelled header navigation, main hero, five identified sections, project articles, and a labelled contact footer. Include a decorative `<canvas id="hero-network" aria-hidden="true">`, `assets/styles.css`, and deferred `assets/app.js`.

- [ ] **Step 4: Run the structural check to verify it passes**

Run: `node --test tests/markup.test.js`

Expected: one passing test.

- [ ] **Step 5: Record the change**

No Git repository is present. If one becomes available, commit `index.html` and `tests/markup.test.js` with message `feat: add portfolio page structure`.

### Task 3: Add responsive visual system

**Files:**
- Create: `assets/styles.css`
- Create: `tests/styles.test.js`

**Interfaces:**
- Consumes: the class names and IDs in `index.html`.
- Produces: desktop two-column content areas and a single-column layout at `760px` and below.

- [ ] **Step 1: Write a failing style contract test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('stylesheet includes a narrow-screen layout and reduced-motion rule', async () => {
  const css = await readFile('assets/styles.css', 'utf8');
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
```

- [ ] **Step 2: Run the style contract test to verify it fails**

Run: `node --test tests/styles.test.js`

Expected: failure because `assets/styles.css` does not exist.

- [ ] **Step 3: Implement the stylesheet**

Define color custom properties, display and body typography, card treatments, focus-visible outlines, hero composition, tag styles, responsive grids, and the two required media queries. Keep canvas behind content and use CSS transitions only for entry/reveal states.

- [ ] **Step 4: Run the style contract test to verify it passes**

Run: `node --test tests/styles.test.js`

Expected: one passing test.

- [ ] **Step 5: Record the change**

No Git repository is present. If one becomes available, commit `assets/styles.css` and `tests/styles.test.js` with message `feat: style responsive portfolio`.

### Task 4: Add progressive animation and navigation enhancement

**Files:**
- Create: `assets/app.js`
- Create: `tests/app.test.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: `getActiveSection`, `shouldReduceMotion`, the hero canvas, `.reveal` elements, and `[data-nav-link]` header links.
- Produces: reduced-motion-safe canvas animation, one-time reveals, and active navigation states.

- [ ] **Step 1: Write a failing behavior contract test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('app imports site utilities and sets up intersection observation', async () => {
  const js = await readFile('assets/app.js', 'utf8');
  assert.match(js, /from '.\/site-utils\.js'/);
  assert.match(js, /IntersectionObserver/);
});
```

- [ ] **Step 2: Run the behavior contract test to verify it fails**

Run: `node --test tests/app.test.js`

Expected: failure because `assets/app.js` does not exist.

- [ ] **Step 3: Implement the enhancement layer**

Implement a small bounded canvas particle renderer that handles resize and only animates when reduced motion is not requested. Use `IntersectionObserver` to add `is-visible` to reveal targets. Update `aria-current="page"` on the active anchor with `getActiveSection` and safely skip optional features when queried elements are absent.

- [ ] **Step 4: Run the behavior contract test to verify it passes**

Run: `node --test tests/app.test.js`

Expected: one passing test.

- [ ] **Step 5: Record the change**

No Git repository is present. If one becomes available, commit `assets/app.js` and `tests/app.test.js` with message `feat: animate portfolio hero and sections`.

### Task 5: Validate the assembled site

**Files:**
- Verify: `index.html`, `assets/styles.css`, `assets/app.js`, `assets/site-utils.js`, `tests/*.test.js`

**Interfaces:**
- Consumes: all prior work.
- Produces: verified static site.

- [ ] **Step 1: Run all automated checks**

Run: `node --test tests/*.test.js`

Expected: all tests pass with no failures.

- [ ] **Step 2: Inspect desktop rendering**

Open `index.html` at a viewport near 1440px wide. Confirm hero copy is legible, cards align in two columns, canvas remains behind content, and anchor navigation reaches each section.

- [ ] **Step 3: Inspect mobile rendering**

Open `index.html` at 390px wide. Confirm navigation remains usable, cards are one column, no horizontal overflow occurs, and buttons remain tappable.

- [ ] **Step 4: Inspect reduced motion**

Emulate `prefers-reduced-motion: reduce`. Confirm the canvas is static and reveal transitions are absent while all content remains visible.

- [ ] **Step 5: Report results**

Report test output and any visual deviations. Do not make an unverified completion claim.
