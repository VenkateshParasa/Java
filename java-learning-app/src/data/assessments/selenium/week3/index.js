// Week 3: Selenium WebDriver Basics (Days 16-21) + TestNG Part 5 (Day 22)
// Topics: Selenium Setup, First Script, Locators (Basic, XPath, CSS), WebElement Interactions, TestNG Advanced

import day16 from './day16.js';
import day17 from './day17.js';
import day18 from './day18.js';
import day19 from './day19.js';
import day20 from './day20.js';
import day21 from './day21.js';
import day22 from './day22.js';

export const week3Assessments = {
  'selenium-day16': day16,
  'selenium-day17': day17,
  'selenium-day18': day18,
  'selenium-day19': day19,
  'selenium-day20': day20,
  'selenium-day21': day21,
  'selenium-day22': day22,
};

export const week3Info = {
  weekNumber: 3,
  title: 'Selenium WebDriver Basics & TestNG Advanced',
  days: 7,
  topics: [
    'Selenium Introduction & Setup',
    'First Selenium Script',
    'Locators - Part 1 (Basic Locators)',
    'Locators - Part 2 (XPath)',
    'Locators - Part 3 (CSS Selector)',
    'WebElement Interactions',
    'TestNG Part 5 - Parallel Execution & Advanced Features'
  ],
  totalQuestions: 236, // 35 questions × 6 days + 26 questions for day 22
  totalPoints: 478 // Approximate based on 2-3 points per question
};
