import { useState, useCallback } from 'react'

const STORAGE_KEY = 'java-learning-progress'

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (err) {
      console.error('Failed to load progress:', err)
      return {}
    }
  })

  const saveProgress = useCallback((newProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
      setProgress(newProgress)
    } catch (err) {
      console.error('Failed to save progress:', err)
    }
  }, [])

  const markComplete = useCallback(
    (lessonId) => {
      const newProgress = {
        ...progress,
        [lessonId]: {
          completed: true,
          completedAt: new Date().toISOString(),
          progress: 100,
        },
      }
      saveProgress(newProgress)
    },
    [progress, saveProgress]
  )

  const markIncomplete = useCallback(
    (lessonId) => {
      const newProgress = {
        ...progress,
        [lessonId]: {
          completed: false,
          progress: 0,
        },
      }
      saveProgress(newProgress)
    },
    [progress, saveProgress]
  )

  const updateProgress = useCallback(
    (lessonId, percent) => {
      const newProgress = {
        ...progress,
        [lessonId]: {
          ...progress[lessonId],
          progress: percent,
          completed: percent >= 100,
          lastUpdated: new Date().toISOString(),
        },
      }
      saveProgress(newProgress)
    },
    [progress, saveProgress]
  )

  const getProgress = useCallback(
    (lessonId) => {
      return progress[lessonId] || { completed: false, progress: 0 }
    },
    [progress]
  )

  const isComplete = useCallback(
    (lessonId) => {
      return progress[lessonId]?.completed || false
    },
    [progress]
  )

  const getCourseProgress = useCallback(
    (courseId) => {
      // Calculate overall course progress based on lesson IDs that start with courseId
      const relevantLessons = Object.keys(progress).filter((key) => key.startsWith(courseId))
      const completedLessons = relevantLessons.filter(
        (key) => progress[key]?.completed
      ).length
      const totalLessons = relevantLessons.length

      // Calculate streak (consecutive days with completed lessons)
      const completions = relevantLessons
        .map((key) => progress[key]?.completedAt)
        .filter(Boolean)
        .sort()
        .reverse()

      let streak = 0
      let currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0)

      for (const completion of completions) {
        const completionDate = new Date(completion)
        completionDate.setHours(0, 0, 0, 0)
        const daysDiff = Math.floor(
          (currentDate - completionDate) / (1000 * 60 * 60 * 24)
        )

        if (daysDiff <= 1) {
          streak++
          currentDate = completionDate
        } else {
          break
        }
      }

      return {
        completed: completedLessons,
        total: totalLessons,
        percent: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        streak,
      }
    },
    [progress]
  )

  const clearProgress = useCallback(() => {
    saveProgress({})
  }, [saveProgress])

  return {
    progress,
    markComplete,
    markIncomplete,
    updateProgress,
    getProgress,
    isComplete,
    getCourseProgress,
    clearProgress,
  }
}
