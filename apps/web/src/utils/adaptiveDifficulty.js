// Adaptive Difficulty Engine for Assessments

/**
 * Difficulty levels
 */
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

/**
 * Default adaptive settings
 */
const DEFAULT_SETTINGS = {
  enabled: true,
  startDifficulty: DIFFICULTY_LEVELS.MEDIUM,
  adjustmentThreshold: 3, // Number of questions before adjusting
  accuracyThresholds: {
    increaseToHard: 0.8, // 80% accuracy to increase to hard
    decreaseToEasy: 0.4, // Below 40% accuracy to decrease to easy
  },
  timeThresholds: {
    fast: 30, // seconds - considered fast
    slow: 120, // seconds - considered slow
  },
};

/**
 * Create an adaptive difficulty engine
 * @param {Object} assessment - Assessment object
 * @param {string} mode - Assessment mode
 * @returns {Object} - Adaptive engine instance
 */
export const createAdaptiveEngine = (assessment, mode = 'full') => {
  const settings = assessment.adaptiveSettings || DEFAULT_SETTINGS;
  
  let currentDifficulty = settings.startDifficulty || DIFFICULTY_LEVELS.MEDIUM;
  let performanceHistory = [];
  let difficultyTransitions = [];
  let questionCount = 0;

  /**
   * Record answer and adjust difficulty
   * @param {string} questionId - Question ID
   * @param {boolean} isCorrect - Whether answer was correct
   * @param {number} timeSpent - Time spent on question (seconds)
   */
  const recordAnswer = (questionId, isCorrect, timeSpent) => {
    questionCount++;

    // Record performance
    performanceHistory.push({
      questionId,
      isCorrect,
      timeSpent,
      difficulty: currentDifficulty,
      timestamp: Date.now(),
    });

    // Check if we should adjust difficulty
    if (questionCount % settings.adjustmentThreshold === 0) {
      const recentPerformance = performanceHistory.slice(-settings.adjustmentThreshold);
      const accuracy = recentPerformance.filter(p => p.isCorrect).length / recentPerformance.length;
      const avgTime = recentPerformance.reduce((sum, p) => sum + p.timeSpent, 0) / recentPerformance.length;

      const newDifficulty = calculateNewDifficulty(accuracy, avgTime, currentDifficulty, settings);

      if (newDifficulty !== currentDifficulty) {
        difficultyTransitions.push({
          from: currentDifficulty,
          to: newDifficulty,
          questionNumber: questionCount,
          accuracy,
          avgTime,
          timestamp: Date.now(),
        });
        currentDifficulty = newDifficulty;
      }
    }
  };

  /**
   * Get current difficulty level
   * @returns {string} - Current difficulty
   */
  const getCurrentDifficulty = () => currentDifficulty;

  /**
   * Get performance history
   * @returns {Array} - Performance records
   */
  const getPerformanceHistory = () => [...performanceHistory];

  /**
   * Get difficulty progression
   * @returns {Object} - Difficulty progression data
   */
  const getDifficultyProgression = () => ({
    started: settings.startDifficulty,
    ended: currentDifficulty,
    transitions: [...difficultyTransitions],
  });

  /**
   * Get statistics
   * @returns {Object} - Performance statistics
   */
  const getStatistics = () => {
    if (performanceHistory.length === 0) {
      return {
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        avgTimePerQuestion: 0,
        startedAt: settings.startDifficulty,
        currentDifficulty,
        transitionCount: difficultyTransitions.length,
      };
    }

    const correctAnswers = performanceHistory.filter(p => p.isCorrect).length;
    const totalTime = performanceHistory.reduce((sum, p) => sum + p.timeSpent, 0);

    return {
      totalQuestions: performanceHistory.length,
      correctAnswers,
      accuracy: Math.round((correctAnswers / performanceHistory.length) * 100),
      avgTimePerQuestion: Math.round(totalTime / performanceHistory.length),
      startedAt: settings.startDifficulty,
      currentDifficulty,
      transitionCount: difficultyTransitions.length,
    };
  };

  /**
   * Get next question based on current difficulty
   * @param {Array} questions - Available questions
   * @returns {Object|null} - Next question or null
   */
  const getNextQuestion = (questions) => {
    // Filter questions by current difficulty
    const suitableQuestions = questions.filter(
      q => q.difficulty === currentDifficulty && !performanceHistory.find(p => p.questionId === q.id)
    );

    if (suitableQuestions.length > 0) {
      return suitableQuestions[0];
    }

    // If no questions at current difficulty, try adjacent difficulties
    const adjacentDifficulties = getAdjacentDifficulties(currentDifficulty);
    for (const difficulty of adjacentDifficulties) {
      const questions = questions.filter(
        q => q.difficulty === difficulty && !performanceHistory.find(p => p.questionId === q.id)
      );
      if (questions.length > 0) {
        return questions[0];
      }
    }

    // Return any unanswered question
    const unanswered = questions.filter(
      q => !performanceHistory.find(p => p.questionId === q.id)
    );
    return unanswered.length > 0 ? unanswered[0] : null;
  };

  return {
    recordAnswer,
    getCurrentDifficulty,
    getPerformanceHistory,
    getDifficultyProgression,
    getStatistics,
    getNextQuestion,
  };
};

/**
 * Calculate new difficulty based on performance
 * @param {number} accuracy - Recent accuracy (0-1)
 * @param {number} avgTime - Average time per question
 * @param {string} currentDifficulty - Current difficulty level
 * @param {Object} settings - Adaptive settings
 * @returns {string} - New difficulty level
 */
const calculateNewDifficulty = (accuracy, avgTime, currentDifficulty, settings) => {
  const { accuracyThresholds, timeThresholds } = settings;

  // High accuracy and fast time -> increase difficulty
  if (accuracy >= accuracyThresholds.increaseToHard && avgTime < timeThresholds.fast) {
    if (currentDifficulty === DIFFICULTY_LEVELS.EASY) {
      return DIFFICULTY_LEVELS.MEDIUM;
    } else if (currentDifficulty === DIFFICULTY_LEVELS.MEDIUM) {
      return DIFFICULTY_LEVELS.HARD;
    }
  }

  // High accuracy but normal time -> slight increase
  if (accuracy >= accuracyThresholds.increaseToHard) {
    if (currentDifficulty === DIFFICULTY_LEVELS.EASY) {
      return DIFFICULTY_LEVELS.MEDIUM;
    }
  }

  // Low accuracy -> decrease difficulty
  if (accuracy < accuracyThresholds.decreaseToEasy) {
    if (currentDifficulty === DIFFICULTY_LEVELS.HARD) {
      return DIFFICULTY_LEVELS.MEDIUM;
    } else if (currentDifficulty === DIFFICULTY_LEVELS.MEDIUM) {
      return DIFFICULTY_LEVELS.EASY;
    }
  }

  // Slow time and low-medium accuracy -> decrease difficulty
  if (avgTime > timeThresholds.slow && accuracy < 0.6) {
    if (currentDifficulty === DIFFICULTY_LEVELS.HARD) {
      return DIFFICULTY_LEVELS.MEDIUM;
    } else if (currentDifficulty === DIFFICULTY_LEVELS.MEDIUM) {
      return DIFFICULTY_LEVELS.EASY;
    }
  }

  return currentDifficulty;
};

/**
 * Get adjacent difficulty levels
 * @param {string} difficulty - Current difficulty
 * @returns {Array} - Adjacent difficulties
 */
const getAdjacentDifficulties = (difficulty) => {
  switch (difficulty) {
    case DIFFICULTY_LEVELS.EASY:
      return [DIFFICULTY_LEVELS.MEDIUM, DIFFICULTY_LEVELS.HARD];
    case DIFFICULTY_LEVELS.MEDIUM:
      return [DIFFICULTY_LEVELS.EASY, DIFFICULTY_LEVELS.HARD];
    case DIFFICULTY_LEVELS.HARD:
      return [DIFFICULTY_LEVELS.MEDIUM, DIFFICULTY_LEVELS.EASY];
    default:
      return [DIFFICULTY_LEVELS.MEDIUM];
  }
};

/**
 * Assign difficulty levels to questions if not already assigned
 * @param {Array} questions - Questions array
 * @returns {Array} - Questions with difficulty levels
 */
export const assignDifficultyLevels = (questions) => {
  return questions.map((question, index) => {
    if (question.difficulty) {
      return question;
    }

    // Auto-assign based on question type and position
    let difficulty;
    const position = index / questions.length;

    if (question.type === 'shortanswer') {
      difficulty = DIFFICULTY_LEVELS.HARD;
    } else if (question.type === 'fillblank') {
      difficulty = position < 0.5 ? DIFFICULTY_LEVELS.MEDIUM : DIFFICULTY_LEVELS.HARD;
    } else if (question.type === 'truefalse') {
      difficulty = DIFFICULTY_LEVELS.EASY;
    } else {
      // MCQ - distribute based on position
      if (position < 0.33) {
        difficulty = DIFFICULTY_LEVELS.EASY;
      } else if (position < 0.67) {
        difficulty = DIFFICULTY_LEVELS.MEDIUM;
      } else {
        difficulty = DIFFICULTY_LEVELS.HARD;
      }
    }

    return {
      ...question,
      difficulty,
    };
  });
};

export default {
  createAdaptiveEngine,
  assignDifficultyLevels,
  DIFFICULTY_LEVELS,
};