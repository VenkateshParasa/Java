// Week 2: Advanced WebDriver Techniques
// Days 8-14: Actions Class, Drag/Drop, Tables, File Operations, JavaScript Executor, Advanced Scenarios

import day8 from './day8.js';
import day9 from './day9.js';
import day10 from './day10.js';
import day11 from './day11.js';
import day12 from './day12.js';
import day13 from './day13.js';
import day14 from './day14.js';

/**
 * Week 2 Assessments
 * Topics: Actions Class, Drag and Drop, Web Tables, File Upload/Download,
 * JavaScript Executor Advanced, Pop-ups & Shadow DOM, Week Review
 */
export const week2Assessments = {
  'selenium-day8': day8,
  'selenium-day9': day9,
  'selenium-day10': day10,
  'selenium-day11': day11,
  'selenium-day12': day12,
  'selenium-day13': day13,
  'selenium-day14': day14,
};

/**
 * Week 2 Information
 */
export const week2Info = {
  weekNumber: 2,
  title: 'Advanced WebDriver Techniques',
  days: 7,
  topics: [
    'Actions Class - Mouse and Keyboard Operations',
    'Drag and Drop, Sliders, and Resizing',
    'Working with Web Tables',
    'File Upload and Download Handling',
    'JavaScript Executor Advanced Techniques',
    'Handling Pop-ups, Shadow DOM, and Advanced Scenarios',
    'Week 2 Review and Mini Project'
  ],
  totalQuestions: 179, // Total across all 7 days
  totalPoints: 430,    // Approximate total points
  description: 'Master advanced Selenium WebDriver techniques including complex interactions, ' +
               'table handling, file operations, JavaScript execution, and challenging web element scenarios. ' +
               'Conclude with a comprehensive review and mini project integration.'
};

// Also export as default for convenience
export default week2Assessments;
