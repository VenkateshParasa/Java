const ASSESSMENT_STORAGE_KEY = 'java-learning-assessments';

// Get all assessment results
export const getAssessmentResults = () => {
  try {
    const stored = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading assessment results:', error);
    return {};
  }
};

// Save assessment result
export const saveAssessmentResult = (dayId, result) => {
  try {
    const results = getAssessmentResults();

    // Store the result with timestamp and extended data
    results[dayId] = {
      ...result,
      completedAt: new Date().toISOString(),
      attempts: (results[dayId]?.attempts || 0) + 1,

      // Extended fields for new features
      mode: result.mode || 'quick', // 'quick' | 'full' | 'exam'

      // Adaptive difficulty tracking
      adaptiveEnabled: result.adaptiveEnabled || false,
      performanceHistory: result.performanceHistory || [],
      difficultyProgression: result.difficultyProgression || null,

      // Exam mode tracking
      examData: result.examData || null,

      // Randomization tracking
      randomizationApplied: result.randomizationApplied || null,

      // Per-question timing
      avgTimePerQuestion: result.avgTimePerQuestion || 0,
    };

    localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(results));

    // Dispatch event for other components to update
    window.dispatchEvent(new Event('assessmentUpdate'));

    return results[dayId];
  } catch (error) {
    console.error('Error saving assessment result:', error);
    return null;
  }
};

// Get assessment result for a specific day
export const getAssessmentResult = (dayId) => {
  const results = getAssessmentResults();
  return results[dayId] || null;
};

// Check if assessment is passed
export const isAssessmentPassed = (dayId) => {
  const result = getAssessmentResult(dayId);
  return result ? result.passed : false;
};

// Get assessment statistics
export const getAssessmentStats = () => {
  const results = getAssessmentResults();
  const dayIds = Object.keys(results);
  
  const passed = dayIds.filter(id => results[id].passed).length;
  const failed = dayIds.filter(id => !results[id].passed).length;
  const totalAttempts = dayIds.reduce((sum, id) => sum + (results[id].attempts || 1), 0);
  const averageScore = dayIds.length > 0
    ? Math.round(dayIds.reduce((sum, id) => sum + results[id].percentage, 0) / dayIds.length)
    : 0;
  
  return {
    totalAssessments: dayIds.length,
    passed,
    failed,
    totalAttempts,
    averageScore,
    passRate: dayIds.length > 0 ? Math.round((passed / dayIds.length) * 100) : 0
  };
};

// Reset assessment for a day (for retake)
export const resetAssessment = (dayId) => {
  try {
    const results = getAssessmentResults();
    delete results[dayId];
    localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(results));
    window.dispatchEvent(new Event('assessmentUpdate'));
    return true;
  } catch (error) {
    console.error('Error resetting assessment:', error);
    return false;
  }
};

// Reset all assessments
export const resetAllAssessments = () => {
  try {
    localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
    window.dispatchEvent(new Event('assessmentUpdate'));
    return true;
  } catch (error) {
    console.error('Error resetting all assessments:', error);
    return false;
  }
};

// Export assessment results as JSON
export const exportAssessmentResults = () => {
  const results = getAssessmentResults();
  const stats = getAssessmentStats();
  
  const exportData = {
    results,
    stats,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  return JSON.stringify(exportData, null, 2);
};

// Get best score for a day
export const getBestScore = (dayId) => {
  const result = getAssessmentResult(dayId);
  return result ? result.percentage : 0;
};

// Check if can retake assessment
export const canRetakeAssessment = (dayId, maxAttempts = 3) => {
  const result = getAssessmentResult(dayId);
  if (!result) return true;
  return result.attempts < maxAttempts;
};

// Get exam violations for a specific day
export const getExamViolations = (dayId) => {
  const result = getAssessmentResult(dayId);
  return result?.examData?.violations || [];
};

// Get exam violation summary for a specific day
export const getExamViolationSummary = (dayId) => {
  const result = getAssessmentResult(dayId);
  return result?.examData?.violationSummary || { total: 0, byType: {} };
};

// Get adaptive difficulty progression for a specific day
export const getDifficultyProgression = (dayId) => {
  const result = getAssessmentResult(dayId);
  return result?.difficultyProgression || null;
};

// Get performance history for a specific day
export const getPerformanceHistory = (dayId) => {
  const result = getAssessmentResult(dayId);
  return result?.performanceHistory || [];
};

// Check if assessment was taken in exam mode
export const isExamMode = (dayId) => {
  const result = getAssessmentResult(dayId);
  return result?.mode === 'exam';
};

// Get all exam mode results
export const getExamModeResults = () => {
  const results = getAssessmentResults();
  return Object.keys(results)
    .filter((dayId) => results[dayId].mode === 'exam')
    .map((dayId) => ({ dayId, ...results[dayId] }));
};

// Get adaptive difficulty statistics across all assessments
export const getAdaptiveDifficultyStats = () => {
  const results = getAssessmentResults();
  const adaptiveResults = Object.values(results).filter((r) => r.adaptiveEnabled);

  if (adaptiveResults.length === 0) {
    return {
      totalAdaptiveAssessments: 0,
      averageDifficultyTransitions: 0,
      mostCommonStartDifficulty: null,
      mostCommonEndDifficulty: null,
    };
  }

  const totalTransitions = adaptiveResults.reduce(
    (sum, r) => sum + (r.difficultyProgression?.transitions?.length || 0),
    0
  );

  const startDifficulties = adaptiveResults.map(
    (r) => r.difficultyProgression?.started || 'medium'
  );
  const endDifficulties = adaptiveResults.map(
    (r) => r.difficultyProgression?.ended || 'medium'
  );

  const mostCommonStart = getMostCommon(startDifficulties);
  const mostCommonEnd = getMostCommon(endDifficulties);

  return {
    totalAdaptiveAssessments: adaptiveResults.length,
    averageDifficultyTransitions: Math.round(totalTransitions / adaptiveResults.length),
    mostCommonStartDifficulty: mostCommonStart,
    mostCommonEndDifficulty: mostCommonEnd,
  };
};

// Get total violations across all exam mode assessments
export const getTotalExamViolations = () => {
  const results = getAssessmentResults();
  const examResults = Object.values(results).filter((r) => r.mode === 'exam');

  const totalViolations = examResults.reduce(
    (sum, r) => sum + (r.examData?.violationSummary?.total || 0),
    0
  );

  const violationsByType = examResults.reduce((acc, r) => {
    const byType = r.examData?.violationSummary?.byType || {};
    Object.keys(byType).forEach((type) => {
      acc[type] = (acc[type] || 0) + byType[type];
    });
    return acc;
  }, {});

  return {
    totalViolations,
    violationsByType,
    assessmentsWithViolations: examResults.filter(
      (r) => (r.examData?.violationSummary?.total || 0) > 0
    ).length,
    totalExamAssessments: examResults.length,
  };
};

// Helper function to get most common element in array
const getMostCommon = (arr) => {
  if (arr.length === 0) return null;
  const counts = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
};