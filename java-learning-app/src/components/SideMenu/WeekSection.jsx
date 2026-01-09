import { ChevronDown, ChevronRight } from 'lucide-react';
import DayItem from './DayItem';
import { getWeekProgress } from '../../utils/progressStorage';
import courseStructure from '../../data/navigation/courseStructure';

function WeekSection({ week, isCollapsed, toggleCollapse, searchQuery }) {
  const weekProgress = getWeekProgress(week.weekNumber, courseStructure);

  return (
    <div className="week-section">
      <button
        className="week-header"
        onClick={toggleCollapse}
        aria-expanded={!isCollapsed}
        aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} Week ${week.weekNumber}`}
      >
        <div className="week-header-content">
          <span className="week-icon">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
          </span>
          <div className="week-info">
            <h3 className="week-title">
              Week {week.weekNumber}: {week.weekTitle}
            </h3>
            <div className="week-meta">
              <span>{week.totalQuestions} questions</span>
              <span className="meta-separator">•</span>
              <span>{week.totalPoints} points</span>
              <span className="meta-separator">•</span>
              <span className="week-progress-text">{weekProgress.percentage}% complete</span>
            </div>
          </div>
        </div>
      </button>

      {!isCollapsed && (
        <div className="week-days">
          {week.days.map((day) => (
            <DayItem
              key={day.dayNumber}
              day={day}
              highlight={
                searchQuery &&
                day.title.toLowerCase().includes(searchQuery.toLowerCase())
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WeekSection;
