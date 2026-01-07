import { useProgress } from '../hooks/useProgress'

function ProgressTracker({ courseId, lessons }) {
  const { getProgress, getCourseProgress } = useProgress()
  const courseProgress = getCourseProgress(courseId)

  const completedCount = lessons?.filter((lesson) => getProgress(lesson.id)?.completed).length || 0
  const totalCount = lessons?.length || 0
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Your Progress
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Overall Completion</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {completedCount} / {totalCount}
            </span>
          </div>
          <div className="progress-bar h-3">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{progressPercent}% complete</p>
        </div>

        {courseProgress && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedCount}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {totalCount - completedCount}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {courseProgress.streak || 0}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
              </div>
            </div>
          </div>
        )}

        {completedCount > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Recent Activity
            </h4>
            <ul className="space-y-2">
              {lessons
                ?.filter((lesson) => getProgress(lesson.id)?.completed)
                .slice(0, 5)
                .map((lesson) => (
                  <li key={lesson.id} className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-green-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 truncate">
                      {lesson.title}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressTracker
