import { week1Assessments, week1Info } from './week1/index.js';
import { week2Assessments, week2Info } from './week2/index.js';
import { week3Assessments, week3Info } from './week3/index.js';
import { week4Assessments, week4Info } from './week4/index.js';
import { week5Assessments, week5Info } from './week5/index.js';
import { week6Assessments, week6Info } from './week6/index.js';
import { week7Assessments, week7Info } from './week7/index.js';

// Aggregate all selenium assessments
export const seleniumAssessments = {
  ...week1Assessments,
  ...week2Assessments,
  ...week3Assessments,
  ...week4Assessments,
  ...week5Assessments,
  ...week6Assessments,
  ...week7Assessments
};

// Week information
export const seleniumWeeks = {
  week1: week1Info,
  week2: week2Info,
  week3: week3Info,
  week4: week4Info,
  week5: week5Info,
  week6: week6Info,
  week7: week7Info
};

// Helper function to get a specific selenium assessment
export function getSeleniumAssessment(assessmentId) {
  return seleniumAssessments[assessmentId] || null;
}

// Helper function to get all assessments for a week
export function getSeleniumWeekAssessments(week) {
  const weekKey = `week${week}`;
  return seleniumWeeks[weekKey] || null;
}

export default seleniumAssessments;
