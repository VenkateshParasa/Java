import { week1Assessments, week1Info } from './week1/index.js';
import { week3Assessments, week3Info } from './week3/index.js';
import { week4Assessments, week4Info } from './week4/index.js';

// Aggregate all selenium assessments
export const seleniumAssessments = {
  ...week1Assessments,
  ...week3Assessments,
  ...week4Assessments
};

// Week information
export const seleniumWeeks = {
  week1: week1Info,
  week3: week3Info,
  week4: week4Info
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
