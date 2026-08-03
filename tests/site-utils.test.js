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
  assert.equal(shouldReduceMotion(false), false);
});
