# Portfolio landing page — design

## Goal

Create a responsive one-page portfolio in Russian that closely follows the supplied dark, orange-accent design reference. The page presents Alexander Filyushin as a technical writer and provides direct contact links.

## Technology and delivery

- Standalone HTML, CSS, and vanilla JavaScript; no build step or external framework.
- A root `index.html` that opens in a browser directly.
- Local JavaScript drives animation and UI enhancements; content remains readable if JavaScript is unavailable.

## Page structure

1. Fixed/translucent header with logo, anchor navigation, and a CTA that scrolls to contacts.
2. Hero: technical-writer eyebrow, large two-tone name, value proposition, “view work” link, and animated network background.
3. About section with short introduction and four benefit cards.
4. Experience section with two role cards and technology tags.
5. Skills section with three grouped tag cards and a code-style panel.
6. Projects section with two detailed examples and one concise additional-work panel.
7. Contact footer with email, Telegram, and GitHub buttons.

## Visual system

- Near-black page background, charcoal cards, white primary copy, muted gray secondary copy, and orange accents.
- Condensed bold display typography for headings; a reliable sans-serif fallback stack avoids external font loading.
- Generous desktop gutters and a single-column mobile layout. Cards use subtle borders, shadows, and rounded corners.

## Interaction and motion

- The hero always fills the viewport (`100vh`) while retaining enough safe space for its content.
- The hero background uses Vanta.NET, loaded from CDN together with Three.js r134. The orange interactive network reacts to mouse and touch input, while a wide, local dark gradient behind the copy preserves text contrast.
- Hero text enters on load with short staggered opacity/translation transitions.
- Sections and cards reveal once on entering the viewport using `IntersectionObserver`, with a restrained stagger for grouped cards.
- Navigation links scroll smoothly to their corresponding anchors; the current section is visually reflected in the header.
- All sustained/reveal animation is disabled or minimized when `prefers-reduced-motion: reduce` is enabled.

## Contacts

- Contact buttons initially use clearly marked placeholder destinations for email, Telegram, and GitHub, as requested.
- Destinations will be isolated in the markup for simple replacement with final URLs later.

## Error handling and accessibility

- Vanta.NET loading failure, reduced-motion preference, or JavaScript unavailability leaves a readable static hero.
- Semantic headings, labelled navigation, keyboard-visible focus styles, sufficient color contrast, and sensible external-link attributes are required.

## Revision: typography and spatial rhythm

- All display headings use Oswald with `font-weight: 700`, with the existing condensed system font as fallback if the remote font cannot load.
- H1 uses 120px/90% on desktop; H2 uses 44px/110%; H3 uses 30px/140%; menu links use 16px/120%; paragraph copy uses 18px/130%. Mobile breakpoints reduce only the display sizes to prevent horizontal overflow.
- Desktop vertical section spacing increases from 112px to 150px; mobile spacing increases from 72px to 96px.

## Revision: loading and card interaction

- A full-screen preloader with orange brand treatment covers the page until the load event, then fades out. A timeout removes it if external scripts stall.
- Cards lift slightly on hover and show a thin orange left border and stronger shadow. This effect is disabled on touch-only devices.

## Verification

- Check HTML structure and local asset paths.
- Test desktop and narrow mobile layouts in a browser.
- Confirm navigation, contact placeholders, reveals, and reduced-motion behavior.
