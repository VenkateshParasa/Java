import { getAssessmentResult, isAssessmentPassed } from './assessmentStorage.js';

const PROGRESS_STORAGE_KEY = 'java-learning-progress';

/**
 * Get all progress data from localStorage
 * @returns {Object} Progress data object
 */
export const getProgress = () => {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading progress data:', error);
    return {};
  }
};

/**
 * Save progress data to localStorage
 * @param {Object} progress - Progress data object
 */
const saveProgress = (progress) => {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('progressUpdate'));
  } catch (error) {
    console.error('Error saving progress data:', error);
  }
};

/**
 * Mark a course as viewed
 * @param {string} dayId - Day identifier (e.g., 'day1', 'day2')
 */
export const markCourseViewed = (dayId) => {
  const progress = getProgress();
  if (!progress[dayId]) {
    progress[dayId] = {};
  }
  progress[dayId].courseViewed = true;
  progress[dayId].lastViewedAt = new Date().toISOString();
  saveProgress(progress);
};

/**
 * Manually mark a day as complete
 * @param {string} dayId - Day identifier (e.g., 'day1', 'day2')
 */
export const markDayComplete = (dayId) => {
  const progress = getProgress();
  if (!progress[dayId]) {
    progress[dayId] = {};
  }
  progress[dayId].manuallyCompleted = true;
  progress[dayId].completedAt = new Date().toISOString();
  saveProgress(progress);
};

/**
 * Unmark a day as complete
 * @param {string} dayId - Day identifier
 */
export const unmarkDayComplete = (dayId) => {
  const progress = getProgress();
  if (progress[dayId]) {
    progress[dayId].manuallyCompleted = false;
    delete progress[dayId].completedAt;
    saveProgress(progress);
  }
};

/**
 * Check if course has been viewed
 * @param {string} dayId - Day identifier
 * @returns {boolean} True if course has been viewed
 */
export const isCourseViewed = (dayId) => {
  const progress = getProgress();
  return progress[dayId]?.courseViewed || false;
};

/**
 * Calculate the status of a specific day
 * @param {string} dayId - Day identifier (e.g., 'day1', 'day2')
 * @returns {string} Status: 'not-started', 'in-progress', or 'completed'
 */
export const calculateDayStatus = (dayId) => {
  const progress = getProgress();
  const assessmentResult = getAssessmentResult(dayId);
  const courseViewed = isCourseViewed(dayId);
  const manuallyCompleted = progress[dayId]?.manuallyCompleted;

  // Completed: Assessment passed OR manually marked complete
  if ((assessmentResult && assessmentResult.passed) || manuallyCompleted) {
    return 'completed';
  }

  // In-progress: Course viewed OR assessment attempted (but not passed)
  if (courseViewed || assessmentResult) {
    return 'in-progress';
  }

  // Not started: No activity
  return 'not-started';
};

/**
 * Get progress for a specific week
 * @param {number} weekNumber - Week number (1-4)
 * @param {Array} courseStructure - Course structure array
 * @returns {Object} Week progress object with completed, total, and percentage
 */
export const getWeekProgress = (weekNumber, courseStructure) => {
  const week = courseStructure.find((w) => w.weekNumber === weekNumber);
  if (!week) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  let completed = 0;
  week.days.forEach((day) => {
    if (calculateDayStatus(day.assessmentId) === 'completed') {
      completed++;
    }
  });

  return {
    completed,
    total: week.days.length,
    percentage: week.days.length > 0 ? Math.round((completed / week.days.length) * 100) : 0,
  };
};

/**
 * Get overall progress across all days
 * @param {Array} courseStructure - Course structure array
 * @returns {Object} Overall progress object with completed, total, and percentage
 */
export const getOverallProgress = (courseStructure) => {
  let totalDays = 0;
  let completedDays = 0;
  let inProgressDays = 0;
  let notStartedDays = 0;

  courseStructure.forEach((week) => {
    week.days.forEach((day) => {
      totalDays++;
      const status = calculateDayStatus(day.assessmentId);
      if (status === 'completed') {
        completedDays++;
      } else if (status === 'in-progress') {
        inProgressDays++;
      } else {
        notStartedDays++;
      }
    });
  });

  return {
    completed: completedDays,
    inProgress: inProgressDays,
    notStarted: notStartedDays,
    total: totalDays,
    percentage: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
  };
};

/**
 * Get last accessed day
 * @returns {Object|null} Last accessed day info or null
 */
export const getLastAccessedDay = () => {
  const progress = getProgress();
  const dayIds = Object.keys(progress).filter((id) => progress[id].lastViewedAt);

  if (dayIds.length === 0) return null;

  // Sort by lastViewedAt descending and get the most recent
  const sortedDays = dayIds.sort((a, b) => {
    return new Date(progress[b].lastViewedAt) - new Date(progress[a].lastViewedAt);
  });

  const lastDayId = sortedDays[0];
  return {
    dayId: lastDayId,
    lastViewedAt: progress[lastDayId].lastViewedAt,
  };
};

/**
 * Reset all progress data
 */
export const resetProgress = () => {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    window.dispatchEvent(new Event('progressUpdate'));
    return true;
  } catch (error) {
    console.error('Error resetting progress:', error);
    return false;
  }
};

/**
 * Get progress statistics
 * @param {Array} courseStructure - Course structure array
 * @returns {Object} Progress statistics
 */
export const getProgressStats = (courseStructure) => {
  const overall = getOverallProgress(courseStructure);
  const weekProgress = courseStructure.map((week) => ({
    weekNumber: week.weekNumber,
    weekTitle: week.weekTitle,
    ...getWeekProgress(week.weekNumber, courseStructure),
  }));

  return {
    overall,
    weeks: weekProgress,
    lastAccessed: getLastAccessedDay(),
  };
};
