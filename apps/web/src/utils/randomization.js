// Randomization utilities for assessments

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get default randomization settings based on mode
 * @param {string} mode - Assessment mode (quick, full, exam)
 * @returns {Object} - Randomization settings
 */
export const getDefaultRandomizationSettings = (mode) => {
  switch (mode) {
    case 'exam':
      return {
        randomizeQuestionOrder: true,
        randomizeOptionOrder: true,
        randomizeSectionOrder: false, // Keep sections in order for exam
      };
    case 'full':
      return {
        randomizeQuestionOrder: true,
        randomizeOptionOrder: true,
        randomizeSectionOrder: false,
      };
    case 'quick':
    default:
      return {
        randomizeQuestionOrder: false,
        randomizeOptionOrder: false,
        randomizeSectionOrder: false,
      };
  }
};

/**
 * Randomize question options (for MCQ questions)
 * @param {Object} question - Question object
 * @returns {Object} - Question with randomized options
 */
const randomizeQuestionOptions = (question) => {
  if (question.type !== 'mcq' || !question.options) {
    return question;
  }

  // Create array of option indices
  const indices = question.options.map((_, index) => index);
  const shuffledIndices = shuffleArray(indices);

  // Create mapping of old index to new index
  const indexMap = {};
  shuffledIndices.forEach((oldIndex, newIndex) => {
    indexMap[oldIndex] = newIndex;
  });

  // Shuffle options
  const shuffledOptions = shuffledIndices.map(index => question.options[index]);

  // Update correct answer index
  const newCorrectAnswer = indexMap[question.correctAnswer];

  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer,
    originalOptionOrder: indices, // Store original order for reference
  };
};

/**
 * Randomize questions within a section
 * @param {Object} section - Section object
 * @param {boolean} randomizeOptions - Whether to randomize options
 * @returns {Object} - Section with randomized questions
 */
const randomizeSectionQuestions = (section, randomizeOptions = false) => {
  let questions = [...section.questions];

  // Randomize options if needed
  if (randomizeOptions) {
    questions = questions.map(q => randomizeQuestionOptions(q));
  }

  // Shuffle questions
  const shuffledQuestions = shuffleArray(questions);

  return {
    ...section,
    questions: shuffledQuestions,
    originalQuestionOrder: section.questions.map(q => q.id), // Store original order
  };
};

/**
 * Randomize assessment sections and questions
 * @param {Object} assessment - Assessment object
 * @param {Object} settings - Randomization settings
 * @returns {Object} - Randomized assessment
 */
export const randomizeAssessment = (assessment, settings) => {
  const {
    randomizeQuestionOrder = false,
    randomizeOptionOrder = false,
    randomizeSectionOrder = false,
  } = settings;

  let sections = assessment.sections ? [...assessment.sections] : [];

  // Randomize questions within sections
  if (randomizeQuestionOrder || randomizeOptionOrder) {
    sections = sections.map(section =>
      randomizeSectionQuestions(section, randomizeOptionOrder)
    );
  }

  // Randomize section order
  if (randomizeSectionOrder && sections.length > 1) {
    sections = shuffleArray(sections);
  }

  // If no sections, randomize questions directly
  let questions = assessment.questions ? [...assessment.questions] : [];
  if (questions.length > 0) {
    if (randomizeOptionOrder) {
      questions = questions.map(q => randomizeQuestionOptions(q));
    }
    if (randomizeQuestionOrder) {
      questions = shuffleArray(questions);
    }
  }

  return {
    ...assessment,
    sections: sections.length > 0 ? sections : undefined,
    questions: questions.length > 0 ? questions : undefined,
    randomizationApplied: {
      questionOrder: randomizeQuestionOrder,
      optionOrder: randomizeOptionOrder,
      sectionOrder: randomizeSectionOrder,
      timestamp: new Date().toISOString(),
    },
  };
};

/**
 * Select random subset of questions for quick mode
 * @param {Array} questions - All questions
 * @param {number} count - Number of questions to select
 * @returns {Array} - Selected questions
 */
export const selectRandomQuestions = (questions, count) => {
  if (questions.length <= count) {
    return questions;
  }

  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
};

/**
 * Distribute questions evenly across sections for quick mode
 * @param {Array} sections - All sections
 * @param {number} totalQuestions - Total questions to select
 * @returns {Array} - Sections with selected questions
 */
export const selectQuestionsFromSections = (sections, totalQuestions) => {
  const questionsPerSection = Math.ceil(totalQuestions / sections.length);
  
  return sections.map(section => ({
    ...section,
    questions: selectRandomQuestions(section.questions, questionsPerSection),
  })).filter(section => section.questions.length > 0);
};

/**
 * Create a seed for reproducible randomization
 * @param {string} dayId - Day identifier
 * @param {string} userId - User identifier (optional)
 * @returns {number} - Seed value
 */
export const createRandomSeed = (dayId, userId = 'default') => {
  const str = `${dayId}-${userId}-${new Date().toDateString()}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

/**
 * Seeded random number generator (for reproducible randomization)
 * @param {number} seed - Seed value
 * @returns {Function} - Random number generator function
 */
export const seededRandom = (seed) => {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

export default {
  randomizeAssessment,
  getDefaultRandomizationSettings,
  selectRandomQuestions,
  selectQuestionsFromSections,
  createRandomSeed,
  seededRandom,
};