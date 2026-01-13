import day1 from './day1.js';

// Export week metadata
export const week1Info = {
  week: 1,
  title: "Getting Started with Selenium",
  description: "Introduction to Selenium WebDriver, setup, and basic automation concepts",
  days: 1, // Currently only day 1 implemented
  totalQuestions: 25,
  totalPoints: 59,
  topics: [
    "Introduction to Selenium",
    "WebDriver Setup",
    "Basic WebDriver Commands",
    "Browser Automation Basics"
  ]
};

// Export all assessments as an object (named export)
export const week1Assessments = {
  'selenium-day1': day1
};

// Also export as default for convenience
export default week1Assessments;