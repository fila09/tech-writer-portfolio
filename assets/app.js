import { getActiveSection, shouldReduceMotion } from './site-utils.js';

document.documentElement.classList.add('js-enabled');
window.requestAnimationFrame(() => document.body.classList.add('is-loaded'));

const hidePreloader = () => document.querySelector('#page-preloader')?.classList.add('is-hidden');
window.addEventListener('load', hidePreloader, { once: true });
window.setTimeout(hidePreloader, 4000);

const reduceMotion = shouldReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

function setUpReveals() {
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}

function setUpNavigation() {
  const links = [...document.querySelectorAll('[data-nav-link]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const updateActiveLink = () => {
    const sectionData = sections.map((section) => ({ id: section.id, top: section.offsetTop }));
    const activeId = getActiveSection(sectionData, window.scrollY, window.innerHeight);

    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.toggleAttribute('aria-current', isActive);
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink);
  updateActiveLink();
}

function setUpVantaNetwork() {
  if (reduceMotion || !window.VANTA?.NET) return;

  window.VANTA.NET({
    el: '#vanta-network',
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1,
    scaleMobile: 1,
    color: 0xff6b27,
    backgroundColor: 0x03010e,
    maxDistance: 21,
    spacing: 13,
  });
}

setUpReveals();
setUpNavigation();
setUpVantaNetwork();
