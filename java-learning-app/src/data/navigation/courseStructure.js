import { week1Info, week2Info, week3Info, week4Info } from '../assessments/index.js';

/**
 * Build navigation structure for the side menu
 * Combines week info with routing data
 */
const buildCourseStructure = () => {
  const weeksInfo = [week1Info, week2Info, week3Info, week4Info];
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
        courseRoute: `/course/${weekSlug}/${daySlug}`,
        assessmentRoute: `/assessment/${daySlug}`,
        assessmentId: daySlug,
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

export const courseStructure = buildCourseStructure();

export default courseStructure;
