// Week 3: Advanced Java Concepts (Days 15-21)
// Topics: Strings, Packages, Exception Handling, Collections, Generics

import day15 from './day15.js';
import day16 from './day16.js';
import day17 from './day17.js';
import day18 from './day18.js';
import day19 from './day19.js';
import day20 from './day20.js';
import day21 from './day21.js';

export const week3Assessments = {
  'java-day15': day15,
  'java-day16': day16,
  'java-day17': day17,
  'java-day18': day18,
  'java-day19': day19,
  'java-day20': day20,
  'java-day21': day21,
};

export const week3Info = {
  weekNumber: 3,
  title: 'Advanced Java Concepts',
  days: 7,
  topics: [
    'Strings',
    'Packages & Static Keyword',
    'Exception Handling - Part 1',
    'Exception Handling - Part 2',
    'Collections Framework - List & Set',
    'Collections Framework - Map & Utilities',
    'Generics & Week 3 Review'
  ],
  totalQuestions: 93,
  totalPoints: 318
};

// Removed default export to fix star export conflict
// export default week3Assessments;