export function getActiveSection(sections, scrollY, viewportHeight) {
  const marker = scrollY + viewportHeight * 0.4;
  return sections.filter((section) => section.top <= marker).at(-1)?.id ?? '';
}

export function shouldReduceMotion(mediaQueryMatches) {
  return Boolean(mediaQueryMatches);
}
