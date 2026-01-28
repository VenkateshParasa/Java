// Week 1: Java Fundamentals (Days 1-7)
// Topics: Setup, Variables, Operators, Control Flow, Loops, Arrays

// Import single-file assessments for all days
import day1 from './day1.js';
import day2 from './day2.js';
import day3 from './day3.js';
import day4 from './day4.js';
import day5 from './day5.js';
import day6 from './day6.js';
import day7 from './day7.js';

export const week1Assessments = {
  'java-day1': day1,
  'java-day2': day2,
  'java-day3': day3,
  'java-day4': day4,
  'java-day5': day5,
  'java-day6': day6,
  'java-day7': day7,
};

export const week1Info = {
  weekNumber: 1,
  title: 'Java Fundamentals',
  days: 7,
  topics: [
    'Introduction & Setup',
    'Variables & Data Types',
    'Operators & Expressions',
    'Control Flow - Conditional Statements',
    'Control Flow - Loops',
    'Arrays - Part 1',
    'Arrays - Part 2 & Week 1 Review'
  ],
  totalQuestions: 90,
  totalPoints: 297
};

// Removed default export to fix star export conflict
// export default week1Assessments;