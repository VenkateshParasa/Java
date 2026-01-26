import {
  seleniumWeek1Info,
  seleniumWeek2Info,
  seleniumWeek3Info,
  seleniumWeek4Info,
  seleniumWeek5Info,
  seleniumWeek6Info,
  seleniumWeek7Info
} from '../assessments/index.js';

/**
 * Build Selenium navigation structure for the side menu
 * Follows same pattern as Java course structure
 */
const buildSeleniumCourseStructure = () => {
  const weeksInfo = [
    seleniumWeek1Info,
    seleniumWeek2Info,
    seleniumWeek3Info,
    seleniumWeek4Info,
    seleniumWeek5Info,
    seleniumWeek6Info,
    seleniumWeek7Info
  ];
  
  let currentDayNumber = 1;
  
  return weeksInfo.map((weekInfo) => {
    const days = weekInfo.topics.map((topic, index) => {
      const dayNumber = currentDayNumber++;
      const daySlug = `day${dayNumber}`;
      const weekSlug = `week${weekInfo.weekNumber}`;

      return {
        dayNumber,
        daySlug,
        title: topic,
        courseRoute: `/selenium/${daySlug}`,
        assessmentRoute: `/assessment/selenium-${daySlug}`,
        assessmentId: `selenium-${daySlug}`,
        hasAssessment: true,
      };
    });

    return {
      weekNumber: weekInfo.weekNumber,
      weekTitle: weekInfo.title,
      weekSlug: `week${weekInfo.weekNumber}`,
      totalQuestions: weekInfo.totalQuestions,
      totalPoints: weekInfo.totalPoints,
      days,
    };
  });
};

export const seleniumCourseStructure = buildSeleniumCourseStructure();

export default seleniumCourseStructure;