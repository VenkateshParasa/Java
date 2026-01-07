// Import all day assessments
import day1 from './java/day1.js';

// Export assessments object
export const assessments = {
  'java-day1': day1,
  // Add more assessments as they are created
  // 'java-day2': day2,
  // 'java-day3': day3,
  // ... up to day30
  // 'selenium-day1': seleniumDay1,
  // ... up to day45
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

export default assessments;