// Week 6: Advanced Framework Patterns & Best Practices
// Days 36-42: Advanced POM, Data-Driven Testing, Logging, Reporting, Configuration Management, Utility Classes, and Exception Handling

import day36 from './day36.js';
import day37 from './day37.js';
import day38 from './day38.js';
import day39 from './day39.js';
import day40 from './day40.js';
import day41 from './day41.js';
import day42 from './day42.js';

/**
 * Week 6 Assessments
 * Topics: Advanced POM, External Data, Logging & Reporting, Configuration Management, Utility Classes, Exception Handling
 */
export const week6Assessments = {
  'selenium-day36': day36,
  'selenium-day37': day37,
  'selenium-day38': day38,
  'selenium-day39': day39,
  'selenium-day40': day40,
  'selenium-day41': day41,
  'selenium-day42': day42,
};

/**
 * Week 6 Information
 */
export const week6Info = {
  weekNumber: 6,
  title: 'Advanced Framework Patterns & Best Practices',
  days: 7,
  topics: [
    'Page Object Model Part 2 - Advanced Patterns & Best Practices',
    'External Data Sources - Excel, CSV, JSON, Properties',
    'Logging & Reporting Part 1 - Log4j, TestNG Reports',
    'Logging & Reporting Part 2 - Extent Reports & Allure',
    'Configuration Management - Properties, YAML, Environment Config',
    'Utility Classes - Reusable Components & Helpers',
    'Exception Handling - Custom Exceptions & Framework Resilience'
  ],
  totalQuestions: 245, // 35 questions per day × 7 days
  totalPoints: 875,    // 125 points per day × 7 days
  description: 'Master advanced framework design patterns, data-driven testing, comprehensive logging and reporting, ' +
               'configuration management, and building robust, production-ready automation frameworks.'
};
