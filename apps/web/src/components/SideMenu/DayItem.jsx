import { Link, useLocation } from 'react-router-dom';
import { FileText, CheckCircle, Check } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';
import { calculateDayStatus, markDayComplete, unmarkDayComplete, getProgress } from '../../utils/progressStorage';

function DayItem({ day, highlight }) {
  const location = useLocation();
  const status = calculateDayStatus(day.assessmentId);
  const progress = getProgress();
  const isManuallyCompleted = progress[day.assessmentId]?.manuallyCompleted;

  const isActive =
    location.pathname === day.courseRoute || location.pathname === day.assessmentRoute;

  const handleToggleComplete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isManuallyCompleted) {
      unmarkDayComplete(day.assessmentId);
    } else {
      markDayComplete(day.assessmentId);
    }
  };

  return (
    <div className={`day-item ${highlight ? 'highlight' : ''} ${isActive ? 'active' : ''}`}>
      <ProgressIndicator status={status} />

      <div className="day-content">
        <div className="day-header">
          <span className="day-number">Day {day.dayNumber}</span>
          <span className="day-title">{day.title}</span>
        </div>

        <div className="day-links">
          <Link to={day.courseRoute} className="day-link course-link" title="View Course Content">
            <FileText size={16} />
            <span>Course</span>
          </Link>

          {day.hasAssessment && (
            <Link
              to={day.assessmentRoute}
              className="day-link assessment-link"
              title="Take Assessment"
            >
              <CheckCircle size={16} />
              <span>Quiz</span>
            </Link>
          )}

          <button
            className={`day-complete-btn ${isManuallyCompleted ? 'completed' : ''}`}
            onClick={handleToggleComplete}
            title={isManuallyCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            aria-label={isManuallyCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <Check size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DayItem;
