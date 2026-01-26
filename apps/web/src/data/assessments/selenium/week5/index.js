// Week 5: Advanced Selenium & TestNG
// Days 29-35: Screenshots, Browser Options, TestNG Framework, and Page Object Model

import day29 from './day29.js';
import day30 from './day30.js';
import day31 from './day31.js';
import day32 from './day32.js';
import day33 from './day33.js';
import day34 from './day34.js';
import day35 from './day35.js';

/**
 * Week 5 Assessments
 * Topics: Screenshots & Browser Options, TestNG (Parts 1-5), Page Object Model Part 1
 */
export const week5Assessments = {
  'selenium-day29': day29,
  'selenium-day30': day30,
  'selenium-day31': day31,
  'selenium-day32': day32,
  'selenium-day33': day33,
  'selenium-day34': day34,
  'selenium-day35': day35,
};

/**
 * Week 5 Information
 */
export const week5Info = {
  weekNumber: 5,
  title: 'Advanced Selenium & TestNG',
  days: 7,
  topics: [
    'Screenshots & Browser Options',
    'TestNG Part 1 - Introduction & Annotations',
    'TestNG Part 2 - Parameters & Data Providers',
    'TestNG Part 3 - Groups, Dependencies & Priorities',
    'TestNG Part 4 - Listeners & Reports',
    'TestNG Part 5 - Parallel Execution & Suite Configuration',
    'Page Object Model Part 1 - Introduction & Implementation'
  ],
  totalQuestions: 245, // 35 questions per day × 7 days
  totalPoints: 875,    // 125 points per day × 7 days
  description: 'Master advanced Selenium features including screenshot capture, browser configuration, ' +
               'the complete TestNG framework, and the Page Object Model design pattern.'
};
