import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookOpen, Award, Clock, AlertCircle, CheckCircle2, Eye, Zap, Target, Shield } from 'lucide-react';
import { getAssessment, hasAssessment, hasAssessmentModes, getAssessmentModes } from '../data/assessments';
import { getAssessmentResult, canRetakeAssessment } from '../utils/assessmentStorage';
import AssessmentQuiz from '../components/AssessmentQuiz';
import ExamPreCheckModal from '../components/ExamPreCheckModal';
import './AssessmentPage.css';

const AssessmentPage = ({ assessmentId: propAssessmentId }) => {
  const { dayId: paramDayId } = useParams();
  const navigate = useNavigate();
  
  const dayId = propAssessmentId || paramDayId;
  // Check if the ID already has a prefix (selenium- or java-)
  const assessmentId = dayId.includes('-') ? dayId : `java-${dayId}`;
  
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
      if (!hasAssessment || !hasAssessment(assessmentId)) {
        setLoading(false);
        return;
      }

      if (hasAssessmentModes && hasAssessmentModes(assessmentId)) {
        const modes = getAssessmentModes(assessmentId);
        setAssessmentModes(modes);
      } else {
        setAssessmentModes({
          quick: {
            title: "Quick Assessment",
            timeLimit: 15,
            description: "A quick 15-minute assessment covering key concepts"
          },
          full: {
            title: "Full Assessment",
            timeLimit: 45,
            description: "Comprehensive assessment covering all topics in depth"
          }
        });
      }

      const assessmentData = getAssessment ? getAssessment(assessmentId, selectedMode) : null;
      setAssessment(assessmentData);

      const result = getAssessmentResult ? getAssessmentResult(assessmentId) : null;
      setPreviousResult(result);

      setLoading(false);
    };

    loadAssessment();
    window.scrollTo(0, 0);
  }, [assessmentId, selectedMode]);

  const handleStartAssessment = (mode = selectedMode) => {
    if (mode === 'exam') {
      setSelectedMode(mode);
      const assessmentData = getAssessment ? getAssessment(assessmentId, mode) : null;
      setAssessment(assessmentData);
      setShowExamPreCheck(true);
      return;
    }

    const assessmentData = getAssessment ? getAssessment(assessmentId, mode) : null;
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
    setSelectedMode('quick');
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
          <Link to="/" className="btn-primary">Back to Home</Link>
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
            dayId={assessmentId}
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
          dayId={assessmentId}
          onComplete={handleCompleteAssessment}
          reviewMode={true}
          previousResult={previousResult}
          mode={selectedMode}
        />
      </div>
    );
  }

  return (
    <div className="assessment-container">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/assessments" className="hover:text-primary-600">Assessments</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Day {dayId.replace('day', '')}</span>
      </nav>

      {/* Header */}
      <div className="assessment-header">
        <h1 className="assessment-title">{assessment.title}</h1>
        <p className="assessment-subtitle">Test your knowledge and master the concepts</p>
      </div>

      {/* Mode Selector - Tabs */}
      {assessmentModes && !showQuiz && !showReview && (
        <div className="mode-selector">
          {/* Tab Buttons */}
          <div className="mode-tabs">
            <button
              onClick={() => {
                setSelectedMode('quick');
                const assessmentData = getAssessment ? getAssessment(assessmentId, 'quick') : null;
                setAssessment(assessmentData);
              }}
              className={`mode-tab ${selectedMode === 'quick' ? 'selected' : ''}`}
            >
              <span className="mode-tab-icon">⚡</span>
              Quick
            </button>

            <button
              onClick={() => {
                setSelectedMode('full');
                const assessmentData = getAssessment ? getAssessment(assessmentId, 'full') : null;
                setAssessment(assessmentData);
              }}
              className={`mode-tab ${selectedMode === 'full' ? 'selected' : ''}`}
            >
              <span className="mode-tab-icon">🎯</span>
              Full
            </button>

            <button
              onClick={() => {
                setSelectedMode('exam');
                const assessmentData = getAssessment ? getAssessment(assessmentId, 'exam') : null;
                setAssessment(assessmentData);
              }}
              className={`mode-tab exam-mode ${selectedMode === 'exam' ? 'selected' : ''}`}
            >
              <span className="mode-tab-icon">🛡️</span>
              Exam
              <span style={{
                fontSize: '0.625rem',
                background: '#e53e3e',
                color: 'white',
                padding: '0.125rem 0.375rem',
                borderRadius: '9999px',
                fontWeight: 'bold',
                marginLeft: '0.25rem'
              }}>MONITORED</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="mode-details">
            {selectedMode === 'quick' && (
              <>
                <h3 className="mode-details-title">
                  <Zap size={20} />
                  Quick Assessment
                </h3>
                <p className="mode-details-description">{assessmentModes.quick.description}</p>
                <div className="mode-details-meta">
                  <span className="mode-meta-item">
                    <Clock size={16} />
                    {assessmentModes.quick.timeLimit} minutes
                  </span>
                  <span className="mode-meta-item">
                    <BookOpen size={16} />
                    10 questions
                  </span>
                </div>
              </>
            )}

            {selectedMode === 'full' && (
              <>
                <h3 className="mode-details-title">
                  <Target size={20} />
                  Full Assessment
                </h3>
                <p className="mode-details-description">{assessmentModes.full.description}</p>
                <div className="mode-details-meta">
                  <span className="mode-meta-item">
                    <Clock size={16} />
                    {assessmentModes.full.timeLimit} minutes
                  </span>
                  <span className="mode-meta-item">
                    <BookOpen size={16} />
                    35 questions
                  </span>
                </div>
              </>
            )}

            {selectedMode === 'exam' && (
              <>
                <h3 className="mode-details-title">
                  <Shield size={20} />
                  Exam Mode - Monitored
                </h3>
                <p className="mode-details-description">Full certification simulation with strict monitoring</p>
                <div className="mode-details-meta">
                  <span className="mode-meta-item">
                    <Clock size={16} />
                    90 minutes
                  </span>
                  <span className="mode-meta-item">
                    <BookOpen size={16} />
                    50 questions
                  </span>
                </div>
                <div className="mode-features">
                  <h4 className="mode-features-title">Exam Features:</h4>
                  <div className="mode-features-list">
                    <span className="mode-feature-item">
                      <CheckCircle2 size={14} />
                      Full-screen required
                    </span>
                    <span className="mode-feature-item">
                      <CheckCircle2 size={14} />
                      Tab switch detection
                    </span>
                    <span className="mode-feature-item">
                      <CheckCircle2 size={14} />
                      Adaptive difficulty
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card" style={{background: 'white', border: '2px solid #e2e8f0'}}>
          <div className="stat-label" style={{color: '#2d3748'}}>📚 Questions</div>
          <div className="stat-value" style={{color: '#1a202c'}}>
            {selectedMode === 'quick' ? 10 : selectedMode === 'full' ? 35 : selectedMode === 'exam' ? 50 : (assessment.questions?.length || 10)}
          </div>
        </div>
        <div className="stat-card" style={{background: 'white', border: '2px solid #e2e8f0'}}>
          <div className="stat-label" style={{color: '#2d3748'}}>⏱️ Time Limit</div>
          <div className="stat-value" style={{color: '#1a202c'}}>
            {selectedMode === 'quick' ? 15 : selectedMode === 'full' ? 45 : selectedMode === 'exam' ? 90 : assessment.timeLimit}
            <span style={{fontSize: '1.5rem'}}> min</span>
          </div>
        </div>
        <div className="stat-card" style={{background: 'white', border: '2px solid #e2e8f0'}}>
          <div className="stat-label" style={{color: '#2d3748'}}>🎯 Passing Score</div>
          <div className="stat-value" style={{color: '#1a202c'}}>{assessment.passingScore}<span style={{fontSize: '1.5rem'}}> %</span></div>
        </div>
      </div>

      {/* Previous Result */}
      {previousResult && (
        <div className={`previous-result ${!previousResult.passed ? 'failed' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            {previousResult.passed ? (
              <CheckCircle2 size={32} color="#22543d" />
            ) : (
              <AlertCircle size={32} color="#7c2d12" />
            )}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                {previousResult.passed ? '✓ Previous Attempt: Passed' : 'Previous Attempt: Keep Trying!'}
              </h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                Score: <span className={`result-score ${!previousResult.passed ? 'failed' : ''}`}>{previousResult.percentage}%</span> • 
                Points: {previousResult.earnedPoints}/{previousResult.totalPoints} • 
                Grade: {previousResult.grade} • 
                Attempts: {previousResult.attempts || 1}/3
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="info-section">
        <h2 className="section-title">
          <span>📋</span>
          Instructions
        </h2>
        <ul className="instruction-list">
          <li className="instruction-item">
            <span className="instruction-icon">✓</span>
            <span>Answer all <strong>{assessment.questions?.length || 10} questions</strong> within <strong>{assessment.timeLimit} minutes</strong></span>
          </li>
          <li className="instruction-item">
            <span className="instruction-icon">✓</span>
            <span>You need to score at least <strong>{assessment.passingScore}%</strong> to pass</span>
          </li>
          <li className="instruction-item">
            <span className="instruction-icon">✓</span>
            <span>Navigate between questions using Previous/Next buttons</span>
          </li>
          <li className="instruction-item">
            <span className="instruction-icon">✓</span>
            <span>The assessment will auto-submit when time runs out</span>
          </li>
          <li className="instruction-item">
            <span className="instruction-icon">✓</span>
            <span>You can retake the assessment up to 3 times</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {canRetakeAssessment && canRetakeAssessment(assessmentId) ? (
          <button
            onClick={() => handleStartAssessment(selectedMode)}
            className="btn-start"
          >
            <Award size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            {previousResult 
              ? `Retake Assessment (${selectedMode === 'quick' ? 'Quick' : selectedMode === 'full' ? 'Full' : 'Exam'} Mode)` 
              : `Start Assessment (${selectedMode === 'quick' ? 'Quick' : selectedMode === 'full' ? 'Full' : 'Exam'} Mode)`
            }
          </button>
        ) : (
          <div style={{
            padding: '1rem 1.5rem',
            background: '#fed7d7',
            border: '2px solid #fc8181',
            borderRadius: '12px',
            color: '#742a2a',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={20} />
            <span>Maximum attempts reached (3/3)</span>
          </div>
        )}
        
        {previousResult && (
          <button
            onClick={handleReviewAnswers}
            className="btn-secondary"
          >
            <Eye size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Review Answers
          </button>
        )}
        
        <Link to="/assessments" className="btn-secondary">
          Back to Assessments
        </Link>
      </div>

      {/* Tips */}
      <div className="tips-section">
        <h2 className="section-title">
          <span>💡</span>
          Tips for Success
        </h2>
        <div className="tip-item">
          <span className="tip-icon">✓</span>
          <span><strong>Review</strong> the lesson content before starting the assessment</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">✓</span>
          <span><strong>Read carefully</strong> - understand each question before answering</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">✓</span>
          <span><strong>Manage time</strong> wisely - you have {selectedMode === 'quick' ? 15 : selectedMode === 'full' ? 45 : selectedMode === 'exam' ? 90 : assessment.timeLimit} minutes total</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">✓</span>
          <span><strong>Answer all</strong> questions - unanswered questions receive 0 points</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">✓</span>
          <span><strong>Review</strong> your answers before final submission</span>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;