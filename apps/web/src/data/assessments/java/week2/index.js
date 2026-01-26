// Week 2: Object-Oriented Programming (Days 8-14)
// Topics: Classes, Objects, Constructors, Methods, Encapsulation, Inheritance, Polymorphism, Abstraction

import day8 from './day8.js';
import day9 from './day9.js';
import day10 from './day10.js';
import day11 from './day11.js';
import day12 from './day12.js';
import day13 from './day13.js';
import day14 from './day14.js';

export const week2Assessments = {
  'java-day8': day8,
  'java-day9': day9,
  'java-day10': day10,
  'java-day11': day11,
  'java-day12': day12,
  'java-day13': day13,
  'java-day14': day14,
};

export const week2Info = {
  weekNumber: 2,
  title: 'Object-Oriented Programming',
  days: 7,
  topics: [
    'Introduction to OOP & Classes',
    'Constructors & this Keyword',
    'Methods & Method Overloading',
    'Encapsulation & Access Modifiers',
    'Inheritance',
    'Polymorphism',
    'Abstraction - Abstract Classes & Interfaces & Week 2 Review'
  ],
  totalQuestions: 93,
  totalPoints: 318
};

// Removed default export to fix star export conflict
// export default week2Assessments;