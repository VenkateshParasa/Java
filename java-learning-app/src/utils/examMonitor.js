// Exam Mode Monitoring System

/**
 * Violation types
 */
export const VIOLATION_TYPES = {
  TAB_SWITCH: 'tab_switch',
  WINDOW_BLUR: 'window_blur',
  FULLSCREEN_EXIT: 'fullscreen_exit',
  CONTEXT_MENU: 'context_menu',
  COPY_ATTEMPT: 'copy_attempt',
  PASTE_ATTEMPT: 'paste_attempt',
  DEVTOOLS_OPEN: 'devtools_open',
};

/**
 * Violation severity levels
 */
export const VIOLATION_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

/**
 * Get violation severity
 * @param {string} type - Violation type
 * @returns {string} - Severity level
 */
const getViolationSeverity = (type) => {
  switch (type) {
    case VIOLATION_TYPES.TAB_SWITCH:
    case VIOLATION_TYPES.WINDOW_BLUR:
      return VIOLATION_SEVERITY.HIGH;
    case VIOLATION_TYPES.FULLSCREEN_EXIT:
      return VIOLATION_SEVERITY.CRITICAL;
    case VIOLATION_TYPES.COPY_ATTEMPT:
    case VIOLATION_TYPES.PASTE_ATTEMPT:
      return VIOLATION_SEVERITY.MEDIUM;
    case VIOLATION_TYPES.CONTEXT_MENU:
    case VIOLATION_TYPES.DEVTOOLS_OPEN:
      return VIOLATION_SEVERITY.LOW;
    default:
      return VIOLATION_SEVERITY.LOW;
  }
};

/**
 * Create exam monitor instance
 * @param {Function} onViolation - Callback when violation occurs
 * @returns {Object} - Monitor instance
 */
export const createExamMonitor = (onViolation) => {
  let violations = [];
  let isMonitoring = false;
  let listeners = [];

  /**
   * Record a violation
   * @param {string} type - Violation type
   * @param {Object} details - Additional details
   */
  const recordViolation = (type, details = {}) => {
    const violation = {
      type,
      severity: getViolationSeverity(type),
      timestamp: new Date().toISOString(),
      details,
    };

    violations.push(violation);

    if (onViolation) {
      onViolation(violation, violations.length);
    }
  };

  /**
   * Handle visibility change (tab switch)
   */
  const handleVisibilityChange = () => {
    if (document.hidden && isMonitoring) {
      recordViolation(VIOLATION_TYPES.TAB_SWITCH, {
        message: 'User switched to another tab',
      });
    }
  };

  /**
   * Handle window blur
   */
  const handleWindowBlur = () => {
    if (isMonitoring) {
      recordViolation(VIOLATION_TYPES.WINDOW_BLUR, {
        message: 'Window lost focus',
      });
    }
  };

  /**
   * Handle fullscreen change
   */
  const handleFullscreenChange = () => {
    if (isMonitoring && !document.fullscreenElement) {
      recordViolation(VIOLATION_TYPES.FULLSCREEN_EXIT, {
        message: 'User exited fullscreen mode',
      });
    }
  };

  /**
   * Handle context menu (right-click)
   */
  const handleContextMenu = (e) => {
    if (isMonitoring) {
      e.preventDefault();
      recordViolation(VIOLATION_TYPES.CONTEXT_MENU, {
        message: 'User attempted to open context menu',
      });
    }
  };

  /**
   * Handle copy attempt
   */
  const handleCopy = (e) => {
    if (isMonitoring) {
      e.preventDefault();
      recordViolation(VIOLATION_TYPES.COPY_ATTEMPT, {
        message: 'User attempted to copy content',
      });
    }
  };

  /**
   * Handle paste attempt
   */
  const handlePaste = (e) => {
    if (isMonitoring) {
      e.preventDefault();
      recordViolation(VIOLATION_TYPES.PASTE_ATTEMPT, {
        message: 'User attempted to paste content',
      });
    }
  };

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = (e) => {
    if (!isMonitoring) return;

    // Detect DevTools shortcuts
    const isDevToolsShortcut =
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
      (e.key === 'F12');

    if (isDevToolsShortcut) {
      e.preventDefault();
      recordViolation(VIOLATION_TYPES.DEVTOOLS_OPEN, {
        message: 'User attempted to open developer tools',
      });
    }

    // Prevent other potentially problematic shortcuts
    if (e.ctrlKey || e.metaKey) {
      const preventKeys = ['s', 'p', 'f', 'g', 'h', 'u'];
      if (preventKeys.includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    }
  };

  /**
   * Start monitoring
   */
  const startMonitoring = () => {
    if (isMonitoring) return;

    isMonitoring = true;

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('keydown', handleKeyDown);

    // Store listeners for cleanup
    listeners = [
      { target: document, event: 'visibilitychange', handler: handleVisibilityChange },
      { target: window, event: 'blur', handler: handleWindowBlur },
      { target: document, event: 'fullscreenchange', handler: handleFullscreenChange },
      { target: document, event: 'contextmenu', handler: handleContextMenu },
      { target: document, event: 'copy', handler: handleCopy },
      { target: document, event: 'paste', handler: handlePaste },
      { target: document, event: 'keydown', handler: handleKeyDown },
    ];
  };

  /**
   * Stop monitoring
   */
  const stopMonitoring = () => {
    if (!isMonitoring) return;

    isMonitoring = false;

    // Remove all event listeners
    listeners.forEach(({ target, event, handler }) => {
      target.removeEventListener(event, handler);
    });

    listeners = [];
  };

  /**
   * Get all violations
   * @returns {Array} - Violations array
   */
  const getViolations = () => [...violations];

  /**
   * Get violation count
   * @returns {number} - Total violations
   */
  const getViolationCount = () => violations.length;

  /**
   * Get violation summary
   * @returns {Object} - Summary by type
   */
  const getViolationSummary = () => {
    const summary = {
      total: violations.length,
      byType: {},
      bySeverity: {},
    };

    violations.forEach((violation) => {
      // Count by type
      summary.byType[violation.type] = (summary.byType[violation.type] || 0) + 1;
      
      // Count by severity
      summary.bySeverity[violation.severity] = (summary.bySeverity[violation.severity] || 0) + 1;
    });

    return summary;
  };

  /**
   * Clear violations
   */
  const clearViolations = () => {
    violations = [];
  };

  /**
   * Check if monitoring is active
   * @returns {boolean} - Monitoring status
   */
  const isActive = () => isMonitoring;

  return {
    startMonitoring,
    stopMonitoring,
    getViolations,
    getViolationCount,
    getViolationSummary,
    clearViolations,
    isActive,
  };
};

/**
 * Check if exam mode is supported
 * @returns {Object} - Support status and reasons
 */
export const checkExamModeSupport = () => {
  const support = {
    fullscreen: document.fullscreenEnabled || document.webkitFullscreenEnabled,
    visibilityAPI: typeof document.hidden !== 'undefined',
    localStorage: typeof Storage !== 'undefined',
  };

  const isSupported = Object.values(support).every(Boolean);

  return {
    isSupported,
    support,
    message: isSupported
      ? 'Exam mode is fully supported'
      : 'Some exam mode features may not work in this browser',
  };
};

export default {
  createExamMonitor,
  checkExamModeSupport,
  VIOLATION_TYPES,
  VIOLATION_SEVERITY,
};