# Vanta Network Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the custom hero canvas network with the requested Vanta.NET effect while keeping readability and reduced-motion fallback.

**Architecture:** `index.html` loads Three.js r134 and Vanta.NET from stable CDN URLs after the page markup. The hero uses a dedicated decorative Vanta container. `assets/app.js` initializes Vanta only if its globals are present and motion is allowed; CSS retains the dark gradient and static fallback.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Three.js r134, Vanta.NET, Node.js built-in test runner.

## Global Constraints

- Use the Vanta.NET configuration supplied by the user: orange `0xff6b27`, background `0x03010e`, `maxDistance: 21`, and `spacing: 13`.
- Enable mouse and touch controls; keep gyro controls disabled.
- Do not initialize Vanta.NET under `prefers-reduced-motion: reduce`.
- Preserve readable hero copy if external scripts fail to load.

---

### Task 1: Add failing Vanta integration checks

**Files:**
- Modify: `tests/markup.test.js`
- Modify: `tests/app.test.js`

**Interfaces:**
- Produces checks for Vanta CDN script tags, a `#vanta-network` container, and reduced-motion-safe initialization.

- [ ] **Step 1: Write the checks**

```js
assert.match(html, /three@0\.134\.0\/build\/three\.min\.js/);
assert.match(html, /vanta@latest\/dist\/vanta\.net\.min\.js/);
assert.match(html, /id="vanta-network"/);
assert.match(js, /window\.VANTA\.NET/);
assert.match(js, /if \(reduceMotion \|\| !window\.VANTA\?\.NET\) return/);
```

- [ ] **Step 2: Run tests to verify failure**

Run: `node --test tests/markup.test.js tests/app.test.js`

Expected: failure because Vanta references and initialization do not yet exist.

### Task 2: Replace custom renderer with Vanta.NET

**Files:**
- Modify: `index.html`
- Modify: `assets/styles.css`
- Modify: `assets/app.js`

**Interfaces:**
- Consumes external `window.VANTA.NET` and the `#vanta-network` element.
- Produces a Vanta instance configured with the user-specified network settings.

- [ ] **Step 1: Update markup and CSS**

Replace the hero canvas with `<div id="vanta-network" aria-hidden="true"></div>`, load the two CDN scripts before `assets/app.js`, and update the existing network selector so the Vanta container stays behind the contrast overlay.

- [ ] **Step 2: Update JavaScript**

Replace `setUpNetwork()` with:

```js
function setUpVantaNetwork() {
  if (reduceMotion || !window.VANTA?.NET) return;
  window.VANTA.NET({ el: '#vanta-network', mouseControls: true, touchControls: true,
    gyroControls: false, minHeight: 200, minWidth: 200, scale: 1, scaleMobile: 1,
    color: 0xff6b27, backgroundColor: 0x03010e, maxDistance: 21, spacing: 13 });
}
```

- [ ] **Step 3: Run the full test suite**

Run: `node --test tests/*.test.js && node --check assets/app.js`

Expected: all tests pass and JavaScript syntax is valid.

### Task 3: Package and report

**Files:**
- Update: `outputs/technical-writer-portfolio.zip`

**Interfaces:**
- Consumes the validated site files.
- Produces a distributable archive containing the Vanta.NET integration.

- [ ] **Step 1: Run final verification**

Run: `npm.cmd test && node --check assets/app.js`

Expected: all tests pass.

- [ ] **Step 2: Update the archive**

Run: `Compress-Archive -Path index.html,package.json,assets,tests,docs -Update -DestinationPath outputs\\technical-writer-portfolio.zip`

- [ ] **Step 3: Report outcome**

State test count, Vanta.NET fallback behavior, and archive location.
