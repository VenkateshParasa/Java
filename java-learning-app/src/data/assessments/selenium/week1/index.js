import day1 from './day1.js';
import day2 from './day2.js';
import day3 from './day3.js';
import day4 from './day4.js';
import day5 from './day5.js';
import day6 from './day6.js';
import day7 from './day7.js';

// Export week metadata
export const week1Info = {
  week: 1,
  weekNumber: 1,
  title: "Selenium Fundamentals & Core Concepts",
  description: "Master the fundamentals of Selenium WebDriver including locators, commands, waits, and basic framework setup",
  days: 7,
  totalQuestions: 169, // Approximate total across all 7 days
  totalPoints: 405, // Approximate total points
  topics: [
    "Introduction to Selenium WebDriver",
    "Locator Strategies (ID, Name, Class, Tag, Link, CSS, XPath)",
    "WebDriver Commands & Browser Interactions",
    "Working with Web Elements",
    "Waits (Implicit, Explicit, Fluent)",
    "Handling Dropdowns, Alerts, and Frames",
    "Basic Test Framework Setup with TestNG"
  ]
};

// Export all assessments as an object (named export)
export const week1Assessments = {
  'selenium-day1': day1,
  'selenium-day2': day2,
  'selenium-day3': day3,
  'selenium-day4': day4,
  'selenium-day5': day5,
  'selenium-day6': day6,
  'selenium-day7': day7
};

// Also export as default for convenience
export default week1Assessments;