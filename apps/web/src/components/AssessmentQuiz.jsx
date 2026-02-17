
import { useState, useEffect, useRef } from 'react';
import './AssessmentQuiz.css';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Trophy,
  BookOpen,
  Shield,
  TrendingUp
} from 'lucide-react';
import { calculateScore } from '../data/assessments';
import { saveAssessmentResult, getAssessmentResult } from '../utils/assessmentStorage';
import { getAssessmentWithSections } from '../data/assessments';
import { randomizeAssessment, getDefaultRandomizationSettings } from '../utils/randomization';
import { createAdaptiveEngine } from '../utils/adaptiveDifficulty';
import { useExamMode } from '../hooks/useExamMode';
import ExamModeWarning from './ExamModeWarning';

const AssessmentQuiz = ({ assessment: propAssessment, dayId, onComplete, reviewMode = false, previousResult = null, mode = 'quick' }) => {
  // Get assessment with sections and mode
  const assessmentWithSections = getAssessmentWithSections ? getAssessmentWithSections(dayId, mode) : null;
  const hasSections = assessmentWithSections?.sections;

  // Use sectioned assessment if available, otherwise use prop
  const baseAssessment = hasSections ? assessmentWithSections : propAssessment;

  // Check if exam mode
  const isExamMode = mode === 'exam';

  // State
  const [assessment, setAssessment] = useState(baseAssessment);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [showResults, setShowResults] = useState(reviewMode);
  const [timeRemaining, setTimeRemaining] = useState(baseAssessment.timeLimit * 60);
  const [timerPaused, setTimerPaused] = useState(false);
  const [results, setResults] = useState(reviewMode ? previousResult : null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const navigate = useNavigate();

  // Adaptive difficulty engine
  const adaptiveEngineRef = useRef(null);
  const [adaptiveEnabled, setAdaptiveEnabled] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState('medium');

  // Exam mode
  const examModeHook = useExamMode(
    isExamMode,
    (violation, count) => {
      setTimerPaused(true); // Pause timer during warning
    }
  );

  // Container ref for fullscreen
  const containerRef = useRef(null);

  // Load previous answers if in review mode
  useEffect(() => {
    if (reviewMode && previousResult) {
      const savedResult = getAssessmentResult ? getAssessmentResult(dayId) : null;
      if (savedResult && savedResult.answers) {
        setAnswers(savedResult.answers);
      }
    }
  }, [reviewMode, previousResult, dayId]);

  // Initialize: Randomization, Adaptive Difficulty, Exam Mode
  useEffect(() => {
    const initialize = async () => {
      let processedAssessment = { ...baseAssessment };

      // 1. Apply Randomization
      const randomizationSettings = baseAssessment.randomizationSettings ||
        (getDefaultRandomizationSettings ? getDefaultRandomizationSettings(mode) : {});

      if (randomizationSettings.randomizeQuestionOrder ||
          randomizationSettings.randomizeOptionOrder ||
          randomizationSettings.randomizeSectionOrder) {
        processedAssessment = randomizeAssessment(processedAssessment, randomizationSettings);
      }

      setAssessment(processedAssessment);

      // 2. Setup Adaptive Difficulty
      const adaptiveSettings = processedAssessment.adaptiveSettings;
      if (adaptiveSettings && adaptiveSettings.enabled && !reviewMode && createAdaptiveEngine) {
        const engine = createAdaptiveEngine(processedAssessment, mode);
        adaptiveEngineRef.current = engine;
        setAdaptiveEnabled(true);
        setCurrentDifficulty(engine.getCurrentDifficulty());
      }

      // 3. Initialize Exam Mode
      if (isExamMode && !reviewMode && examModeHook) {
        const success = await examModeHook.initialize(containerRef.current);
        if (!success) {
          alert('Exam mode requires fullscreen. Please try again or contact support.');
        }
      }
    };

    initialize();

    // Cleanup on unmount
    return () => {
      if (isExamMode && examModeHook) {
        examModeHook.cleanup();
      }
    };
  }, []); // Only run once on mount

  // Get all questions (flattened from sections or direct)
  const allQuestions = hasSections
    ? assessment.sections.flatMap(section => section.questions)
    : assessment.questions;

  // Get current section's questions
  const currentSectionData = hasSections ? assessment.sections[currentSection] : null;
  const sectionQuestions = hasSections
    ? currentSectionData.questions
    : allQuestions;

  // Timer
  useEffect(() => {
    if (showResults || timerPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults, timerPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answer) => {
    const question = allQuestions.find(q => q.id === questionId);
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

    // Record in adaptive engine if enabled
    if (adaptiveEnabled && adaptiveEngineRef.current && question) {
      // Check if answer is correct
      const isCorrect = checkAnswer(question, answer);
      adaptiveEngineRef.current.recordAnswer(questionId, isCorrect, timeSpent);
      setCurrentDifficulty(adaptiveEngineRef.current.getCurrentDifficulty());
    }

    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    // Reset timer for next question
    setQuestionStartTime(Date.now());
  };

  const handleNext = () => {
    if (currentQuestion < sectionQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (hasSections && currentSection < assessment.sections.length - 1) {
      // Move to next section
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    }
    setQuestionStartTime(Date.now());
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (hasSections && currentSection > 0) {
      // Move to previous section
      setCurrentSection(prev => prev - 1);
      const prevSection = assessment.sections[currentSection - 1];
      setCurrentQuestion(prevSection.questions.length - 1);
    }
    setQuestionStartTime(Date.now());
  };

  const handleSectionChange = (sectionIndex) => {
    setCurrentSection(sectionIndex);
    setCurrentQuestion(0);
    setQuestionStartTime(Date.now());
  };

  const handleSubmit = () => {
    const assessmentForScore = {
      ...assessment,
      questions: allQuestions
    };
    const score = calculateScore ? calculateScore(answers, assessmentForScore) : { percentage: 0, passed: false };
    setResults(score);
    setShowResults(true);

    // Prepare extended result data
    const extendedResult = {
      ...score,
      answers,
      questions: allQuestions.length,
      mode,

      // Adaptive difficulty data
      adaptiveEnabled,
      performanceHistory: adaptiveEnabled && adaptiveEngineRef.current
        ? adaptiveEngineRef.current.getPerformanceHistory()
        : [],
      difficultyProgression: adaptiveEnabled && adaptiveEngineRef.current
        ? adaptiveEngineRef.current.getDifficultyProgression()
        : null,

      // Exam mode data
      examData: isExamMode && examModeHook ? examModeHook.getExamData() : null,

      // Randomization data
      randomizationApplied: assessment.randomizationApplied || null,

      // Timing data
      avgTimePerQuestion: adaptiveEnabled && adaptiveEngineRef.current
        ? Math.round(
            adaptiveEngineRef.current.getPerformanceHistory()
              .reduce((sum, r) => sum + r.timeSpent, 0) /
            adaptiveEngineRef.current.getPerformanceHistory().length
          )
        : 0,
    };

    if (saveAssessmentResult) {
      saveAssessmentResult(dayId, extendedResult);
    }

    // Cleanup exam mode
    if (isExamMode && examModeHook) {
      examModeHook.cleanup();
    }

    if (onComplete) {
      onComplete(score);
    }
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getSectionAnsweredCount = (section) => {
    return section.questions.filter(q => answers[q.id] !== undefined).length;
  };

  const getMarkedForReviewCount = () => {
    return Object.keys(markedForReview).filter(id => markedForReview[id]).length;
  };

  const toggleMarkForReview = (questionId) => {
    setMarkedForReview(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const question = sectionQuestions[currentQuestion];
  const isLastQuestionInSection = currentQuestion === sectionQuestions.length - 1;
  const isLastSection = !hasSections || currentSection === assessment.sections.length - 1;
  const answeredCount = getAnsweredCount();
  const totalQuestions = allQuestions.length;

  // Show results view
  if (showResults && results) {
    return (
      <ResultsView
        results={results}
        assessment={{...assessment, questions: allQuestions}}
        answers={answers}
        dayId={dayId}
        reviewMode={reviewMode}
        adaptiveEnabled={adaptiveEnabled}
        adaptiveStats={adaptiveEnabled && adaptiveEngineRef.current ? adaptiveEngineRef.current.getStatistics() : null}
        examData={isExamMode && examModeHook ? examModeHook.getExamData() : null}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto" ref={containerRef}>
      {/* Exam Mode Warning Modal */}
      {isExamMode && examModeHook && examModeHook.showWarning && examModeHook.currentViolation && (
        <ExamModeWarning
          violation={examModeHook.currentViolation}
          violationCount={examModeHook.violationCount}
          onAcknowledge={() => {
            examModeHook.acknowledgeWarning();
            setTimerPaused(false);
          }}
        />
      )}

      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{assessment.title}</h2>
              {isExamMode && (
                <div className="flex items-center gap-1 px-3 py-1 bg-red-100 border border-red-600 rounded-full">
                  <Shield className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-semibold text-red-600">EXAM MODE</span>
                </div>
              )}
              {adaptiveEnabled && (
                <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 border border-purple-600 rounded-full">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-600">
                    ADAPTIVE: {currentDifficulty.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            {hasSections && (
              <p className="text-sm text-gray-600 mt-1">
                {currentSectionData.title} - Question {currentQuestion + 1} of {sectionQuestions.length}
              </p>
            )}
            {!hasSections && (
              <p className="text-sm text-gray-600 mt-1">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {isExamMode && examModeHook && examModeHook.violationCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 border border-orange-600 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-600">
                  {examModeHook.violationCount} Violation{examModeHook.violationCount !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span className={`font-mono font-semibold ${timeRemaining < 60 ? 'text-red-600' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        {hasSections && (
          <div className="section-tabs-container">
            <div className="section-tabs">
              {assessment.sections.map((section, index) => {
                const sectionAnswered = getSectionAnsweredCount(section);
                const sectionTotal = section.questions.length;
                const isComplete = sectionAnswered === sectionTotal;

                return (
                  <button
                    key={`section-${section.id}-${index}`}
                    onClick={() => handleSectionChange(index)}
                    className={`section-tab-button ${currentSection === index ? 'active' : ''}`}
                  >
                    <div className="section-tab-content">
                      <span>{section.title.split(':')[0]}</span>
                      {isComplete && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                      <span className="section-tab-count">
                        ({sectionAnswered}/{sectionTotal})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Section Description */}
        {hasSections && currentSectionData.description && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">{currentSectionData.description}</p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{answeredCount} / {totalQuestions} answered</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-300"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card mb-6">
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="text-lg font-medium text-gray-900 flex-1">
                  {question.question}
                </p>
                <button
                  onClick={() => toggleMarkForReview(question.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all text-sm font-medium ${
                    markedForReview[question.id]
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                  title={markedForReview[question.id] ? 'Unmark for review' : 'Mark for review'}
                >
                  <BookOpen className="w-4 h-4" />
                  {markedForReview[question.id] ? 'Marked' : 'Mark for Review'}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {question.points} {question.points === 1 ? 'point' : 'points'}
                </span>
                {question.difficulty && (
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {question.difficulty.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Question Type Specific UI */}
          <div className="mt-6">
            {(question.type === 'mcq' || question.type === 'multiple-choice') && (
              <MCQQuestion
                question={question}
                answer={answers[question.id]}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
              />
            )}

            {(question.type === 'truefalse' || question.type === 'true-false') && (
              <TrueFalseQuestion
                question={question}
                answer={answers[question.id]}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
              />
            )}

            {(question.type === 'fillblank' || question.type === 'fill-blank') && (
              <FillBlankQuestion
                question={question}
                answer={answers[question.id]}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
              />
            )}

            {(question.type === 'shortanswer' || question.type === 'short-answer') && (
              <ShortAnswerQuestion
                question={question}
                answer={answers[question.id]}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0 && currentSection === 0}
          className="nav-button nav-button-secondary"
        >
          <ArrowLeft />
          Previous
        </button>

        <div className="flex flex-col items-center gap-2 text-sm">
          {answeredCount < totalQuestions && (
            <span className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="w-4 h-4" />
              {totalQuestions - answeredCount} unanswered
            </span>
          )}
          {getMarkedForReviewCount() > 0 && (
            <span className="flex items-center gap-2 text-blue-600">
              <BookOpen className="w-4 h-4" />
              {getMarkedForReviewCount()} marked for review
            </span>
          )}
        </div>

        {!(isLastQuestionInSection && isLastSection) ? (
          <button
            onClick={handleNext}
            className="nav-button nav-button-primary"
          >
            {isLastQuestionInSection ? 'Next Section' : 'Next'}
            <ArrowRight />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="nav-button nav-button-success"
          >
            Submit Assessment
            <CheckCircle2 />
          </button>
        )}
      </div>
    </div>
  );
};

// MCQ Question Component
const MCQQuestion = ({ question, answer, onAnswer }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(index)}
          className={`mcq-option-button ${answer === index ? 'selected' : ''}`}
        >
          <div className="mcq-option-content">
            <div className={`mcq-radio-circle ${answer === index ? 'selected' : ''}`}>
              {answer === index && (
                <div className="mcq-radio-inner" />
              )}
            </div>
            <span className="mcq-option-text">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

// True/False Question Component
const TrueFalseQuestion = ({ question, answer, onAnswer }) => {
  return (
    <div className="tf-container">
      <button
        onClick={() => onAnswer(true)}
        className={`tf-button ${answer === true ? 'selected-true' : ''}`}
      >
        <CheckCircle2 className={`tf-icon true-icon ${answer === true ? 'selected' : ''}`} />
        <span className="tf-label">True</span>
      </button>

      <button
        onClick={() => onAnswer(false)}
        className={`tf-button ${answer === false ? 'selected-false' : ''}`}
      >
        <XCircle className={`tf-icon false-icon ${answer === false ? 'selected' : ''}`} />
        <span className="tf-label">False</span>
      </button>
    </div>
  );
};

// Fill in the Blank Question Component
const FillBlankQuestion = ({ question, answer, onAnswer }) => {
  return (
    <div className="fib-container">
      <input
        type="text"
        value={answer || ''}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="fib-input"
      />
      <p className="fib-hint">
        Enter your answer in the blank above
      </p>
    </div>
  );
};

// Short Answer Question Component
const ShortAnswerQuestion = ({ question, answer, onAnswer }) => {
  return (
    <div className="sa-container">
      <textarea
        value={answer || ''}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="Type your answer here..."
        rows={4}
        className="sa-textarea"
      />
      <p className="sa-hint">
        Provide a detailed answer (minimum {question.minKeywords || 2} key points)
      </p>
    </div>
  );
};

// Results View Component
const ResultsView = ({ results, assessment, answers, dayId, reviewMode = false, adaptiveEnabled = false, adaptiveStats = null, examData = null }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <div className="card mb-6 text-center">
        <div className="mb-6">
          {results.passed ? (
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          ) : (
            <AlertCircle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
          )}

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {results.passed ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            {results.passed
              ? 'You have successfully passed this assessment!'
              : 'You need to score at least ' + assessment.passingScore + '% to pass.'
            }
          </p>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-primary-600">{results.percentage}%</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900">{results.grade}</div>
            <div className="text-sm text-gray-600">Grade</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{results.earnedPoints}</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-600">{results.totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
        </div>

        {/* Adaptive Difficulty Stats */}
        {adaptiveEnabled && adaptiveStats && (
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2 justify-center">
              <TrendingUp className="w-5 h-5" />
              Adaptive Difficulty Performance
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-purple-600">{adaptiveStats.accuracy}%</div>
                <div className="text-xs text-gray-600">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{adaptiveStats.startedAt}</div>
                <div className="text-xs text-gray-600">Start Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{adaptiveStats.currentDifficulty}</div>
                <div className="text-xs text-gray-600">End Level</div>
              </div>
            </div>
          </div>
        )}

        {/* Exam Mode Stats */}
        {examData && examData.violationSummary && (
          <div className={`mb-6 p-4 border rounded-lg ${
            examData.violationSummary.total === 0
              ? 'bg-green-50 border-green-200'
              : 'bg-orange-50 border-orange-200'
          }`}>
            <h3 className={`font-bold mb-3 flex items-center gap-2 justify-center ${
              examData.violationSummary.total === 0 ? 'text-green-900' : 'text-orange-900'
            }`}>
              <Shield className="w-5 h-5" />
              Exam Mode Summary
            </h3>
            {examData.violationSummary.total === 0 ? (
              <p className="text-green-700 font-semibold">
                ✓ No violations detected - Clean exam!
              </p>
            ) : (
              <div>
                <p className="text-orange-700 font-semibold mb-2">
                  {examData.violationSummary.total} Violation{examData.violationSummary.total !== 1 ? 's' : ''} Detected
                </p>
                <div className="text-sm text-gray-700">
                  {Object.entries(examData.violationSummary.byType).map(([type, count]) => (
                    <div key={type}>• {type.replace(/_/g, ' ')}: {count}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          {!reviewMode && (
            <>
              <button
                onClick={() => navigate('/assessments')}
                className="btn-primary"
              >
                Back to Lesson
              </button>
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Retake Assessment
              </button>
            </>
          )}
          {reviewMode && (
            <button
              onClick={() => navigate(`/assessment/${dayId.replace('java-', '')}`)}
              className="btn-primary"
            >
              Back to Assessment
            </button>
          )}
        </div>
      </div>

      {/* Detailed Results */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Review Your Answers</h3>
        <div className="space-y-6">
          {assessment.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = checkAnswer(question, userAnswer);

            return (
              <div key={question.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {question.question}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Your answer:</span> {formatUserAnswer(question, userAnswer)}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-semibold">Correct answer:</span> {formatCorrectAnswer(question)}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 italic">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const checkAnswer = (question, userAnswer) => {
  if (userAnswer === undefined || userAnswer === null) return false;

  if (question.type === 'mcq' || question.type === 'multiple-choice' || question.type === 'truefalse' || question.type === 'true-false') {
    return userAnswer === question.correctAnswer;
  } else if (question.type === 'fillblank' || question.type === 'fill-blank') {
    const acceptable = question.acceptableAnswers || [question.correctAnswer];
    const userAnswerNormalized = question.caseSensitive
      ? userAnswer.trim()
      : userAnswer.trim().toLowerCase();

    return acceptable.some(ans => {
      const ansNormalized = question.caseSensitive
        ? ans.trim()
        : ans.trim().toLowerCase();
      return userAnswerNormalized === ansNormalized;
    });
  } else if (question.type === 'shortanswer' || question.type === 'short-answer') {
    const userAnswerLower = userAnswer.toLowerCase();
    const matchedKeywords = question.keywords.filter(keyword =>
      userAnswerLower.includes(keyword.toLowerCase())
    );
    return matchedKeywords.length >= question.minKeywords;
  }

  return false;
};

const formatUserAnswer = (question, answer) => {
  if (answer === undefined || answer === null) return 'Not answered';

  if (question.type === 'mcq' || question.type === 'multiple-choice') {
    return question.options[answer] || 'Not answered';
  } else if (question.type === 'truefalse' || question.type === 'true-false') {
    return answer ? 'True' : 'False';
  } else {
    return answer;
  }
};

const formatCorrectAnswer = (question) => {
  if (question.type === 'mcq' || question.type === 'multiple-choice') {
    return question.options[question.correctAnswer];
  } else if (question.type === 'truefalse' || question.type === 'true-false') {
    return question.correctAnswer ? 'True' : 'False';
  } else if (question.type === 'fillblank' || question.type === 'fill-blank') {
    return question.correctAnswer;
  } else if (question.type === 'shortanswer' || question.type === 'short-answer') {
    return question.sampleAnswer;
  }
  return '';
};

export default AssessmentQuiz;