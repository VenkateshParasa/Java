import { seleniumWeek1Info } from '../assessments/index.js';

/**
 * Build Selenium navigation structure for the side menu
 * Follows same pattern as Java course structure
 */
const buildSeleniumCourseStructure = () => {
  const weeksInfo = [seleniumWeek1Info];
  
  return weeksInfo.map((weekInfo) => {
    const days = weekInfo.topics.map((topic, index) => {
      const dayNumber = index + 1;
      const daySlug = `day${dayNumber}`;
      const weekSlug = `week${weekInfo.week}`;

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
      weekNumber: weekInfo.week,
      weekTitle: weekInfo.title,
      weekSlug: `week${weekInfo.week}`,
      totalQuestions: weekInfo.totalQuestions,
      totalPoints: weekInfo.totalPoints,
      days,
    };
  });
};

export const seleniumCourseStructure = buildSeleniumCourseStructure();

export default seleniumCourseStructure;