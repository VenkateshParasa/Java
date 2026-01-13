// Import week-based assessments for better organization
// Updated: Force cache refresh
import { week1Assessments, week1Info } from './java/week1/index.js';
import { week2Assessments, week2Info } from './java/week2/index.js';
import { week3Assessments, week3Info } from './java/week3/index.js';
import { week4Assessments, week4Info } from './java/week4/index.js';

// Import Selenium assessments
import {
  week1Assessments as seleniumWeek1Assessments,
  week1Info as seleniumWeek1Info
} from './selenium/week1/index.js';
import {
  week3Assessments as seleniumWeek3Assessments,
  week3Info as seleniumWeek3Info
} from './selenium/week3/index.js';
import {
  week4Assessments as seleniumWeek4Assessments,
  week4Info as seleniumWeek4Info
} from './selenium/week4/index.js';

// Import all day assessments (for backward compatibility)
import day1 from './java/week1/day1.js';
import day2 from './java/week1/day2.js';
import day3 from './java/week1/day3.js';
import day4 from './java/week1/day4.js';
import day5 from './java/week1/day5.js';
import day6 from './java/week1/day6.js';
import day7 from './java/week1/day7.js';
import day8 from './java/week2/day8.js';
import day9 from './java/week2/day9.js';
import day10 from './java/week2/day10.js';
import day11 from './java/week2/day11.js';
import day12 from './java/week2/day12.js';
import day13 from './java/week2/day13.js';
import day14 from './java/week2/day14.js';
import day15 from './java/week3/day15.js';
import day16 from './java/week3/day16.js';
import day17 from './java/week3/day17.js';
import day18 from './java/week3/day18.js';
import day19 from './java/week3/day19.js';
import day20 from './java/week3/day20.js';
import day21 from './java/week3/day21.js';
import day22 from './java/week4/day22.js';
import day23 from './java/week4/day23.js';
import day24 from './java/week4/day24.js';
import day25 from './java/week4/day25.js';
import day26 from './java/week4/day26.js';
import day27 from './java/week4/day27.js';
import day28 from './java/week4/day28.js';
// import day29 from './java/week4/day29.js';
// import day30 from './java/week4/day30.js';

// Import Selenium day assessments
import seleniumDay1 from './selenium/week1/day1.js';

// Export assessments object
export const assessments = {
  'java-day1': day1,
  'java-day2': day2,
  'java-day3': day3,
  'java-day4': day4,
  'java-day5': day5,
  'java-day6': day6,
  'java-day7': day7,
  'java-day8': day8,
  'java-day9': day9,
  'java-day10': day10,
  'java-day11': day11,
  'java-day12': day12,
  'java-day13': day13,
  'java-day14': day14,
  'java-day15': day15,
  'java-day16': day16,
  'java-day17': day17,
  'java-day18': day18,
  'java-day19': day19,
  'java-day20': day20,
  'java-day21': day21,
  'java-day22': day22,
  'java-day23': day23,
  'java-day24': day24,
  'java-day25': day25,
  'java-day26': day26,
  'java-day27': day27,
  'java-day28': day28,
  // 'java-day29': day29,
  // 'java-day30': day30,
  // Selenium Week 1 assessments
  'selenium-day1': seleniumDay1,
  // Selenium Week 3 assessments
  ...seleniumWeek3Assessments,
  // Selenium Week 4 assessments
  ...seleniumWeek4Assessments,
  // More Selenium weeks will be added as they are created
};

/**
 * Get assessment for a specific day with mode support
 * @param {string} dayId - Day identifier (e.g., 'java-day1', 'selenium-day1')
 * @param {string} mode - Assessment mode ('quick', 'full', 'exam')
 * @returns {Object|null} - Assessment object or null
 */
export const getAssessment = (dayId, mode = 'quick') => {
  const assessment = assessments[dayId];
  if (!assessment) return null;

  // Filter sections based on mode
  let sections = assessment.sections;
  if (mode === 'quick') {
    // Quick mode: exclude fullModeOnly sections
    sections = assessment.sections.filter(section => !section.fullModeOnly);
  }
  // Full mode and exam mode: include all sections

  // Get time limit based on mode
  const timeLimit = assessment.modes?.[mode]?.timeLimit || assessment.timeLimit;

  // If assessment has sections, flatten questions
  if (sections) {
    return {
      ...assessment,
      timeLimit,
      mode,
      questions: sections.flatMap(section => section.questions)
    };
  }

  return assessment;
};

/**
 * Get assessment with sections and mode support
 * @param {string} dayId - Day identifier
 * @param {string} mode - Assessment mode
 * @returns {Object|null} - Assessment with sections or null
 */
export const getAssessmentWithSections = (dayId, mode = 'quick') => {
  const assessment = assessments[dayId];
  if (!assessment) return null;

  // Filter sections based on mode
  let sections = assessment.sections;
  if (mode === 'quick') {
    // Quick mode: exclude fullModeOnly sections
    sections = assessment.sections.filter(section => !section.fullModeOnly);
  }

  // Get time limit based on mode
  const timeLimit = assessment.modes?.[mode]?.timeLimit || assessment.timeLimit;

  return {
    ...assessment,
    sections,
    timeLimit,
    mode
  };
};

/**
 * Check if assessment has modes
 * @param {string} dayId - Day identifier
 * @returns {boolean} - True if assessment has modes
 */
export const hasAssessmentModes = (dayId) => {
  const assessment = assessments[dayId];
  return assessment && assessment.modes ? true : false;
};

/**
 * Get available modes for an assessment
 * @param {string} dayId - Day identifier
 * @returns {Object|null} - Modes object or null
 */
export const getAssessmentModes = (dayId) => {
  const assessment = assessments[dayId];
  return assessment?.modes || null;
};

/**
 * Check if day has assessment
 * @param {string} dayId - Day identifier
 * @returns {boolean} - True if assessment exists
 */
export const hasAssessment = (dayId) => {
  return assessments.hasOwnProperty(dayId);
};

/**
 * Calculate score for an assessment
 * @param {Object} answers - User answers object
 * @param {Object} assessment - Assessment object
 * @returns {Object} - Score results
 */
export const calculateScore = (answers, assessment) => {
  let totalPoints = 0;
  let earnedPoints = 0;

  assessment.questions.forEach((question) => {
    totalPoints += question.points;
    const userAnswer = answers[question.id];

    if (userAnswer !== undefined && userAnswer !== null) {
      if (question.type === 'mcq' || question.type === 'truefalse') {
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      } else if (question.type === 'fillblank') {
        const acceptable = question.acceptableAnswers || [question.correctAnswer];
        const userAnswerNormalized = question.caseSensitive
          ? userAnswer.trim()
          : userAnswer.trim().toLowerCase();

        const isCorrect = acceptable.some(ans => {
          const ansNormalized = question.caseSensitive
            ? ans.trim()
            : ans.trim().toLowerCase();
          return userAnswerNormalized === ansNormalized;
        });

        if (isCorrect) {
          earnedPoints += question.points;
        }
      } else if (question.type === 'shortanswer') {
        // For short answer, check if minimum keywords are present
        const userAnswerLower = userAnswer.toLowerCase();
        const matchedKeywords = question.keywords.filter(keyword =>
          userAnswerLower.includes(keyword.toLowerCase())
        );

        if (matchedKeywords.length >= question.minKeywords) {
          earnedPoints += question.points;
        }
      }
    }
  });

  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  const passed = percentage >= assessment.passingScore;

  return {
    earnedPoints,
    totalPoints,
    percentage,
    passed,
    grade: getGrade(percentage)
  };
};

/**
 * Get letter grade based on percentage
 * @param {number} percentage - Score percentage
 * @returns {string} - Letter grade
 */
const getGrade = (percentage) => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

/**
 * Get all assessments
 * @returns {Array} - Array of all assessment objects with IDs
 */
export const getAllAssessments = () => {
  return Object.keys(assessments).map(id => ({
    id,
    ...assessments[id]
  }));
};

/**
 * Get all available assessment IDs
 * @returns {Array} - Array of assessment IDs
 */
export const getAllAssessmentIds = () => {
  return Object.keys(assessments);
};

/**
 * Get assessments by course
 * @param {string} course - Course name ('java' or 'selenium')
 * @returns {Array} - Array of assessment objects
 */
export const getAssessmentsByCourse = (course) => {
  return Object.keys(assessments)
    .filter(id => id.startsWith(course))
    .map(id => ({ id, ...assessments[id] }));
};

/**
 * Get assessments by week
 * @param {number} weekNumber - Week number (1-4)
 * @returns {Object} - Week assessments and info
 */
export const getAssessmentsByWeek = (weekNumber) => {
  const weeks = {
    1: { assessments: week1Assessments, info: week1Info },
    2: { assessments: week2Assessments, info: week2Info },
    3: { assessments: week3Assessments, info: week3Info },
    4: { assessments: week4Assessments, info: week4Info }
  };
  return weeks[weekNumber] || null;
};

/**
 * Get all weeks information
 * @returns {Array} - Array of week info objects
 */
export const getAllWeeksInfo = () => {
  return [week1Info, week2Info, week3Info, week4Info];
};

/**
 * Get week number for a specific day
 * @param {number} dayNumber - Day number (1-30)
 * @returns {number} - Week number
 */
export const getWeekForDay = (dayNumber) => {
  if (dayNumber >= 1 && dayNumber <= 7) return 1;
  if (dayNumber >= 8 && dayNumber <= 14) return 2;
  if (dayNumber >= 15 && dayNumber <= 21) return 3;
  if (dayNumber >= 22 && dayNumber <= 30) return 4;
  return null;
};

// Export week-based assessments
export { week1Assessments, week1Info };
export { week2Assessments, week2Info };
export { week3Assessments, week3Info };
export { week4Assessments, week4Info };

// Export Selenium week assessments
export { seleniumWeek1Assessments, seleniumWeek1Info };
export { seleniumWeek3Assessments, seleniumWeek3Info };
export { seleniumWeek4Assessments, seleniumWeek4Info };

// Removed default export to fix "Importing binding name 'default' cannot be resolved by star export entries" error
// This conflict occurs when you have both re-exports and a default export
// export default assessments;