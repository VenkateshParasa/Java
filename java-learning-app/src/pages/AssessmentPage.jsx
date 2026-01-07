import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookOpen, Award, Clock, AlertCircle, CheckCircle2, Eye, Zap, Target, Shield } from 'lucide-react';
import { getAssessment, hasAssessment, hasAssessmentModes, getAssessmentModes } from '../data/assessments';
import { getAssessmentResult, canRetakeAssessment } from '../utils/assessmentStorage';
import AssessmentQuiz from '../components/AssessmentQuiz';
import ExamPreCheckModal from '../components/ExamPreCheckModal';

const AssessmentPage = () => {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [assessmentModes, setAssessmentModes] = useState(null);
  const [selectedMode, setSelectedMode] = useState('quick');
  const [previousResult, setPreviousResult] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showExamPreCheck, setShowExamPreCheck] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssessment = () => {
      // For now, we'll handle this gracefully since data files aren't created yet
      if (!hasAssessment || !hasAssessment(dayId)) {
        setLoading(false);
        return;
      }

      // Check if assessment has modes
      if (hasAssessmentModes && hasAssessmentModes(dayId)) {
        const modes = getAssessmentModes(dayId);
        setAssessmentModes(modes);
      }

      const assessmentData = getAssessment ? getAssessment(dayId, selectedMode) : null;
      setAssessment(assessmentData);

      const result = getAssessmentResult ? getAssessmentResult(dayId) : null;
      setPreviousResult(result);

      setLoading(false);
    };

    loadAssessment();
    window.scrollTo(0, 0);
  }, [dayId]);

  const handleStartAssessment = (mode = selectedMode) => {
    // Show pre-check modal for exam mode
    if (mode === 'exam') {
      setSelectedMode(mode);
      const assessmentData = getAssessment ? getAssessment(dayId, mode) : null;
      setAssessment(assessmentData);
      setShowExamPreCheck(true);
      return;
    }

    // Reload assessment with selected mode
    const assessmentData = getAssessment ? getAssessment(dayId, mode) : null;
    setAssessment(assessmentData);
    setSelectedMode(mode);
    setShowQuiz(true);
    setShowReview(false);
  };

  const handleExamPreCheckComplete = () => {
    setShowExamPreCheck(false);
    setShowQuiz(true);
    setShowReview(false);
  };

  const handleExamPreCheckCancel = () => {
    setShowExamPreCheck(false);
    setSelectedMode('quick'); // Reset to quick mode
  };

  const handleCompleteAssessment = (results) => {
    setPreviousResult(results);
    setShowQuiz(false);
  };

  const handleReviewAnswers = () => {
    setShowReview(true);
    setShowQuiz(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="card text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Assessment Available</h2>
          <p className="text-gray-600 mb-6">
            This day doesn't have an assessment yet. Check back later!
          </p>
          <Link to={`/day/${dayId}`} className="btn-primary">Back to Lesson</Link>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <>
        {showExamPreCheck && (
          <ExamPreCheckModal
            assessment={assessment}
            onStart={handleExamPreCheckComplete}
            onCancel={handleExamPreCheckCancel}
          />
        )}
        <div className="px-4 py-8">
          <AssessmentQuiz
            assessment={assessment}
            dayId={dayId}
            onComplete={handleCompleteAssessment}
            mode={selectedMode}
          />
        </div>
      </>
    );
  }

  if (showReview && previousResult) {
    return (
      <div className="px-4 py-8">
        <AssessmentQuiz
          assessment={assessment}
          dayId={dayId}
          onComplete={handleCompleteAssessment}
          reviewMode={true}
          previousResult={previousResult}
          mode={selectedMode}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-gray-600">
          <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
          <li>/</li>
          <li><Link to={`/day/${dayId}`} className="hover:text-primary-600">Day {dayId}</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Assessment</li>
        </ol>
      </nav>

      {/* Mode Selector */}
      {assessmentModes && !showQuiz && !showReview && (
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Assessment Mode</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quick Mode */}
            <button
              onClick={() => {
                setSelectedMode('quick');
                const assessmentData = getAssessment ? getAssessment(dayId, 'quick') : null;
                setAssessment(assessmentData);
              }}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                selectedMode === 'quick'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <Zap className={`w-6 h-6 ${selectedMode === 'quick' ? 'text-primary-600' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {assessmentModes.quick.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {assessmentModes.quick.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {assessmentModes.quick.timeLimit} min
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      10 questions
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {/* Full Mode */}
            <button
              onClick={() => {
                setSelectedMode('full');
                const assessmentData = getAssessment ? getAssessment(dayId, 'full') : null;
                setAssessment(assessmentData);
              }}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                selectedMode === 'full'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <Target className={`w-6 h-6 ${selectedMode === 'full' ? 'text-primary-600' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {assessmentModes.full.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {assessmentModes.full.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {assessmentModes.full.timeLimit} min
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      35 questions
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {/* Exam Mode */}
            <button
              onClick={() => {
                setSelectedMode('exam');
                const assessmentData = getAssessment ? getAssessment(dayId, 'exam') : null;
                setAssessment(assessmentData);
              }}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                selectedMode === 'exam'
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <Shield className={`w-6 h-6 ${selectedMode === 'exam' ? 'text-red-600' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    Exam Mode
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">MONITORED</span>
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Full certification simulation with strict monitoring
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      90 min
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      50 questions
                    </span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Full-screen required</li>
                    <li>• Tab switch detection</li>
                    <li>• Adaptive difficulty</li>
                  </ul>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Assessment Info */}
      <div className="card mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {assessment.title}
            </h1>
            <p className="text-gray-600">
              Test your knowledge of Day {dayId}
            </p>
          </div>
        </div>

        {/* Assessment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm">Questions</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {assessment.questions?.length || 10}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Time Limit</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {assessment.timeLimit} min
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Award className="w-5 h-5" />
              <span className="text-sm">Passing Score</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {assessment.passingScore}%
            </div>
          </div>
        </div>

        {/* Previous Result */}
        {previousResult && (
          <div className={`p-4 rounded-lg mb-6 ${previousResult.passed ? 'bg-green-50 border-2 border-green-200' : 'bg-orange-50 border-2 border-orange-200'}`}>
            <div className="flex items-center gap-3">
              {previousResult.passed ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-orange-600" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {previousResult.passed ? 'Previous Attempt: Passed ✓' : 'Previous Attempt: Not Passed'}
                </p>
                <p className="text-sm text-gray-600">
                  Score: {previousResult.percentage}% ({previousResult.earnedPoints}/{previousResult.totalPoints} points) • 
                  Grade: {previousResult.grade} • 
                  Attempts: {previousResult.attempts || 1}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Answer all {assessment.questions?.length || 10} questions within {assessment.timeLimit} minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>You need to score at least {assessment.passingScore}% to pass</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>You can navigate between questions using Previous/Next buttons</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>The assessment will auto-submit when time runs out</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>You can retake the assessment up to 3 times</span>
            </li>
          </ul>
        </div>

        {/* Question Types */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Question Types:</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              Multiple Choice
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              True/False
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              Fill in the Blank
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              Short Answer
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {canRetakeAssessment && canRetakeAssessment(dayId) ? (
            <button
              onClick={() => handleStartAssessment(selectedMode)}
              className="btn-primary flex items-center gap-2"
            >
              {previousResult ? `Retake Assessment (${selectedMode === 'quick' ? 'Quick' : selectedMode === 'full' ? 'Full' : 'Exam'} Mode)` : `Start Assessment (${selectedMode === 'quick' ? 'Quick' : selectedMode === 'full' ? 'Full' : 'Exam'} Mode)`}
              <Award className="w-5 h-5" />
            </button>
          ) : (
            <div className="text-orange-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Maximum attempts reached (3/3)</span>
            </div>
          )}
          
          {previousResult && (
            <button
              onClick={handleReviewAnswers}
              className="btn-secondary flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Review Answers
            </button>
          )}
          
          <Link
            to={`/day/${dayId}`}
            className="btn-secondary"
          >
            Back to Lesson
          </Link>
        </div>
      </div>

      {/* Tips Card */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-3">💡 Tips for Success:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-0.5">✓</span>
            <span>Review the lesson content before starting the assessment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-0.5">✓</span>
            <span>Read each question carefully before answering</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-0.5">✓</span>
            <span>Manage your time wisely - you have {assessment.timeLimit} minutes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-0.5">✓</span>
            <span>Answer all questions - unanswered questions receive 0 points</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-0.5">✓</span>
            <span>Review your answers before submitting</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AssessmentPage;