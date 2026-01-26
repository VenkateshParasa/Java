import { useState, useEffect, useRef, useCallback } from 'react';
import { createExamMonitor } from '../utils/examMonitor';
import { createFullscreenManager } from '../utils/fullscreenManager';

/**
 * Custom hook for exam mode functionality
 * @param {boolean} isExamMode - Whether exam mode is active
 * @param {Function} onViolation - Callback when violation occurs
 * @returns {Object} - Exam mode state and methods
 */
export const useExamMode = (isExamMode = false, onViolation = null) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [currentViolation, setCurrentViolation] = useState(null);

  const monitorRef = useRef(null);
  const fullscreenManagerRef = useRef(null);
  const containerRef = useRef(null);

  /**
   * Handle violation
   */
  const handleViolation = useCallback((violation, count) => {
    setViolationCount(count);
    setCurrentViolation(violation);
    setShowWarning(true);

    // Call external callback if provided
    if (onViolation) {
      onViolation(violation, count);
    }
  }, [onViolation]);

  /**
   * Initialize exam mode
   */
  const initialize = useCallback(async (container) => {
    if (!isExamMode || isInitialized) return true;

    try {
      containerRef.current = container || document.documentElement;

      // Create fullscreen manager
      fullscreenManagerRef.current = createFullscreenManager(containerRef.current);

      // Set up fullscreen change listener
      fullscreenManagerRef.current.onChange(() => {
        setIsFullscreen(fullscreenManagerRef.current.isActive());
      });

      // Set up fullscreen error listener
      fullscreenManagerRef.current.onError((error) => {
        console.error('Fullscreen error:', error);
      });

      // Request fullscreen
      await fullscreenManagerRef.current.enter();

      // Create and start exam monitor
      monitorRef.current = createExamMonitor(handleViolation);
      monitorRef.current.startMonitoring();

      setIsInitialized(true);
      setIsFullscreen(true);

      return true;
    } catch (error) {
      console.error('Failed to initialize exam mode:', error);
      return false;
    }
  }, [isExamMode, isInitialized, handleViolation]);

  /**
   * Cleanup exam mode
   */
  const cleanup = useCallback(() => {
    if (monitorRef.current) {
      monitorRef.current.stopMonitoring();
      monitorRef.current = null;
    }

    if (fullscreenManagerRef.current) {
      if (fullscreenManagerRef.current.isActive()) {
        fullscreenManagerRef.current.exit().catch(console.error);
      }
      fullscreenManagerRef.current.cleanup();
      fullscreenManagerRef.current = null;
    }

    setIsInitialized(false);
    setIsFullscreen(false);
  }, []);

  /**
   * Acknowledge warning and resume
   */
  const acknowledgeWarning = useCallback(() => {
    setShowWarning(false);
    setCurrentViolation(null);

    // Re-enter fullscreen if needed
    if (fullscreenManagerRef.current && !fullscreenManagerRef.current.isActive()) {
      fullscreenManagerRef.current.enter().catch(console.error);
    }
  }, []);

  /**
   * Get exam data for storage
   */
  const getExamData = useCallback(() => {
    if (!monitorRef.current) {
      return null;
    }

    return {
      violations: monitorRef.current.getViolations(),
      violationSummary: monitorRef.current.getViolationSummary(),
      isFullscreenMaintained: isFullscreen,
    };
  }, [isFullscreen]);

  /**
   * Force fullscreen
   */
  const forceFullscreen = useCallback(async () => {
    if (fullscreenManagerRef.current && !fullscreenManagerRef.current.isActive()) {
      try {
        await fullscreenManagerRef.current.enter();
        return true;
      } catch (error) {
        console.error('Failed to enter fullscreen:', error);
        return false;
      }
    }
    return true;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Auto-initialize if exam mode is enabled
  useEffect(() => {
    if (isExamMode && !isInitialized) {
      // Wait for component to mount before initializing
      const timer = setTimeout(() => {
        initialize(containerRef.current);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isExamMode, isInitialized, initialize]);

  return {
    isInitialized,
    isFullscreen,
    violationCount,
    showWarning,
    currentViolation,
    initialize,
    cleanup,
    acknowledgeWarning,
    getExamData,
    forceFullscreen,
  };
};

export default useExamMode;