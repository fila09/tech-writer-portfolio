# Typography, Preloader, and Card Interaction Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved typography scale, add a resilient initial preloader, and improve desktop card hover feedback.

**Architecture:** CSS owns fixed desktop type values and responsive display-size overrides. `index.html` contains an accessible visual-only preloader. `assets/app.js` removes it after window load or a bounded timeout. Card hover styles use a desktop pointer media query so touch interfaces are unaffected.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner.

## Global Constraints

- H1 desktop: 120px/90%; H2: 44px/110%; H3: 30px/140%.
- Menu: 16px/120%; paragraphs: 18px/130%.
- Preloader cannot block content beyond a 4-second timeout.
- Card hover uses an orange left accent only for hover-capable pointers.
- Keep `prefers-reduced-motion: reduce` free of loader and card transitions.

---

### Task 1: Add failing UI contract tests

**Files:**
- Modify: `tests/styles.test.js`
- Modify: `tests/markup.test.js`
- Modify: `tests/app.test.js`

**Interfaces:**
- Produces checks for exact typography, preloader markup, resilient removal, and hover media query.

- [ ] **Step 1: Write type and hover checks**

```js
assert.match(css, /\.hero__title \{[^}]*font-size:120px[^}]*line-height:\.9/);
assert.match(css, /h2 \{[^}]*font-size:44px[^}]*line-height:1\.1/);
assert.match(css, /h3 \{[^}]*font-size:30px[^}]*line-height:1\.4/);
assert.match(css, /@media \(hover: hover\)/);
```

- [ ] **Step 2: Run tests to verify failure**

Run: `node --test tests/styles.test.js tests/markup.test.js tests/app.test.js`

Expected: failure because none of the new contracts exist.

### Task 2: Implement the approved visual updates

**Files:**
- Modify: `index.html`
- Modify: `assets/styles.css`
- Modify: `assets/app.js`

**Interfaces:**
- Consumes `#page-preloader` from HTML and controls its `.is-hidden` state in JavaScript.
- Produces responsive typography, a removable preloader, and hover-capable card affordances.

- [ ] **Step 1: Add preloader markup**

Add `<div id="page-preloader" class="page-preloader" aria-hidden="true">` immediately inside body with a logo and decorative loading line.

- [ ] **Step 2: Apply CSS rules**

Set the specified type values. Use a `@media (hover: hover)` rule to add a left inset orange accent, a slight upward transform, and stronger shadow to the existing card selectors. Add a fixed preloader state and an `.is-hidden` fade-out state.

- [ ] **Step 3: Add bounded preloader dismissal**

```js
const hidePreloader = () => document.querySelector('#page-preloader')?.classList.add('is-hidden');
window.addEventListener('load', hidePreloader, { once: true });
window.setTimeout(hidePreloader, 4000);
```

- [ ] **Step 4: Run full tests**

Run: `node --test tests/*.test.js && node --check assets/app.js`

Expected: all tests pass.

### Task 3: Final verification and package update

**Files:**
- Update: `outputs/technical-writer-portfolio.zip`

**Interfaces:**
- Consumes all modified site assets.
- Produces an updated archive.

- [ ] **Step 1: Run fresh verification**

Run: `npm.cmd test && node --check assets/app.js`

Expected: all tests pass.

- [ ] **Step 2: Update distributable**

Run: `Compress-Archive -Path index.html,package.json,assets,tests,docs -Update -DestinationPath outputs\\technical-writer-portfolio.zip`

- [ ] **Step 3: Report outcome**

State the passing test count and the location of the updated archive.
