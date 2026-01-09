import { Link } from 'react-router-dom';
import { getAllAssessments, getAllWeeksInfo } from '../data/assessments';
import { getAssessmentResults } from '../utils/assessmentStorage';

function AssessmentList() {
  const assessments = getAllAssessments();
  const weeksInfo = getAllWeeksInfo();

  // Group assessments by week using proper day ranges
  const weeks = weeksInfo.map((weekInfo, index) => {
    // Calculate the starting index for this week
    const startDay = weeksInfo.slice(0, index).reduce((sum, w) => sum + w.days, 0);
    const endDay = startDay + weekInfo.days;

    return {
      title: `Week ${weekInfo.weekNumber}: ${weekInfo.title}`,
      description: weekInfo.topics.join(', ').substring(0, 100) + '...',
      totalQuestions: weekInfo.totalQuestions,
      totalPoints: weekInfo.totalPoints,
      days: assessments.slice(startDay, endDay)
    };
  });

  // Calculate total stats
  const totalAssessments = assessments.length;
  const totalQuestions = weeksInfo.reduce((sum, w) => sum + w.totalQuestions, 0);
  const totalPoints = weeksInfo.reduce((sum, w) => sum + w.totalPoints, 0);

  return (
    <div className="assessment-list-container">
      <div className="assessment-list-header">
        <h1>Java Core Fundamentals Assessments</h1>
        <p className="subtitle">
          Test your knowledge with {totalAssessments} comprehensive assessments covering 4 weeks of Java programming
        </p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-number">{totalAssessments}</div>
          <div className="stat-label">Total Assessments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalQuestions}</div>
          <div className="stat-label">Total Questions</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalPoints}</div>
          <div className="stat-label">Total Points</div>
        </div>
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="week-section">
          <div className="week-header">
            <h2>{week.title}</h2>
            <p>{week.totalQuestions} questions • {week.totalPoints} points</p>
          </div>

          <div className="assessments-grid">
            {week.days.map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AssessmentCard({ assessment }) {
  const results = getAssessmentResults(assessment.id);
  const hasAttempted = results && results.length > 0;
  const latestResult = hasAttempted ? results[results.length - 1] : null;

  const getStatusBadge = () => {
    if (!hasAttempted) {
      return <span className="status-badge not-started">Not Started</span>;
    }

    const percentage = latestResult.percentage;
    if (percentage >= 80) {
      return <span className="status-badge excellent">Excellent</span>;
    } else if (percentage >= 60) {
      return <span className="status-badge good">Good</span>;
    } else {
      return <span className="status-badge needs-improvement">Needs Improvement</span>;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'difficulty-beginner';
      case 'intermediate':
        return 'difficulty-intermediate';
      case 'advanced':
        return 'difficulty-advanced';
      default:
        return '';
    }
  };

  // Calculate total points if not provided
  const totalPoints = assessment.totalPoints ||
    (assessment.sections
      ? assessment.sections.reduce((total, section) =>
          total + section.questions.reduce((sum, q) => sum + (q.points || 0), 0), 0)
      : assessment.questions?.reduce((sum, q) => sum + (q.points || 0), 0) || 0);

  // Get difficulty from first question if not on assessment level
  const difficulty = assessment.difficulty ||
    (assessment.sections?.[0]?.questions?.[0]?.difficulty) ||
    (assessment.questions?.[0]?.difficulty) ||
    'beginner';

  // Strip 'java-' prefix from ID for route matching
  const routeId = assessment.id.replace('java-', '');
  
  return (
    <Link to={`/assessment/${routeId}`} className="assessment-card">
      <div className="card-header">
        <h3>{assessment.title}</h3>
        {getStatusBadge()}
      </div>

      {assessment.description && (
        <p className="card-description">{assessment.description}</p>
      )}

      <div className="card-meta">
        <div className="meta-item">
          <span className="meta-icon">📝</span>
          <span>
            {assessment.sections
              ? assessment.sections.reduce((total, section) => total + section.questions.length, 0)
              : assessment.questions?.length || 0} Questions
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⏱️</span>
          <span>{assessment.timeLimit} min</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">🎯</span>
          <span>{totalPoints} Points</span>
        </div>
      </div>

      <div className="card-footer">
        <span className={`difficulty-badge ${getDifficultyColor(difficulty)}`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>

        {hasAttempted && (
          <div className="previous-score">
            <span className="score-label">Latest Score:</span>
            <span className={`score-value ${latestResult.percentage >= 60 ? 'pass' : 'fail'}`}>
              {latestResult.score}/{latestResult.totalPoints} ({latestResult.percentage}%)
            </span>
          </div>
        )}
      </div>

      {hasAttempted && (
        <div className="attempt-info">
          <span className="attempt-count">
            Attempts: {results.length}
          </span>
          <span className="last-attempt">
            Last: {new Date(latestResult.completedAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </Link>
  );
}

export default AssessmentList;