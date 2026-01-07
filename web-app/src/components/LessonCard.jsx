import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

function LessonCard({ lesson }) {
  const { getProgress } = useProgress()
  const progress = getProgress(lesson.id)
  const completed = progress?.completed || false
  const progressPercent = progress?.progress || 0

  return (
    <Link
      to={lesson.path}
      className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
          {lesson.title}
        </h3>
        {completed && (
          <svg
            className="w-6 h-6 text-green-500 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {lesson.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {lesson.description}
        </p>
      )}

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          {lesson.estimatedTime && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden sm:inline">Est. time:</span>
              {lesson.estimatedTime}
            </span>
          )}
          {lesson.exercises && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {lesson.exercises} exercises
            </span>
          )}
        </div>

        {lesson.tags && (
          <div className="flex gap-2">
            {lesson.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {progressPercent > 0 && progressPercent < 100 && (
        <div className="mt-4">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {progressPercent}% complete
          </p>
        </div>
      )}
    </Link>
  )
}

export default LessonCard
