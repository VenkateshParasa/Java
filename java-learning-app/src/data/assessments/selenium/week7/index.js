// Week 7: Advanced Testing Patterns & Real-World Integration
// Days 43-49: Cross-Browser, CI/CD, BDD, API Testing, Database Testing, Mobile Web, Capstone Project

import day43 from './day43.js';
import day44 from './day44.js';
import day45 from './day45.js';
import day46 from './day46.js';
import day47 from './day47.js';
import day48 from './day48.js';
import day49 from './day49.js';

/**
 * Week 7 Assessments
 * Topics: Cross-Browser Testing, CI/CD Integration, BDD with Cucumber, API Testing Integration,
 * Database Testing, Mobile Web Testing, and Capstone Project
 */
export const week7Assessments = {
  'selenium-day43': day43,
  'selenium-day44': day44,
  'selenium-day45': day45,
  'selenium-day46': day46,
  'selenium-day47': day47,
  'selenium-day48': day48,
  'selenium-day49': day49,
};

/**
 * Week 7 Information
 */
export const week7Info = {
  weekNumber: 7,
  title: 'Advanced Testing Patterns & Real-World Integration',
  days: 7,
  topics: [
    'Cross-Browser Testing - Selenium Grid & Cloud Solutions',
    'CI/CD Integration - Jenkins, GitHub Actions, GitLab, Azure DevOps',
    'BDD with Cucumber - Behavior-Driven Development & Gherkin',
    'API Testing Integration - REST Assured & Hybrid Testing',
    'Database Testing - JDBC Integration & Validation',
    'Mobile Web Testing & Responsive Design Testing',
    'Capstone Project - Complete E2E Automation Framework'
  ],
  totalQuestions: 245, // 35 questions per day × 7 days
  totalPoints: 875,    // 125 points per day × 7 days
  description: 'Master advanced testing patterns including cross-browser testing, CI/CD pipelines, ' +
               'behavior-driven development, API integration, database validation, mobile web testing, ' +
               'and build a comprehensive end-to-end automation framework as your capstone project.'
};
