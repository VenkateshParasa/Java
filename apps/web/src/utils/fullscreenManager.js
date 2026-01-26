// Fullscreen Manager - Cross-browser fullscreen API wrapper

/**
 * Request fullscreen for an element
 * @param {HTMLElement} element - Element to make fullscreen
 * @returns {Promise} - Resolves when fullscreen is entered
 */
export const requestFullscreen = (element) => {
  if (!element) {
    return Promise.reject(new Error('Element is required'));
  }

  // Try different browser prefixes
  if (element.requestFullscreen) {
    return element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    return element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    return element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    return element.msRequestFullscreen();
  }

  return Promise.reject(new Error('Fullscreen API not supported'));
};

/**
 * Exit fullscreen
 * @returns {Promise} - Resolves when fullscreen is exited
 */
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    return document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    return document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    return document.msExitFullscreen();
  }

  return Promise.reject(new Error('Fullscreen API not supported'));
};

/**
 * Check if currently in fullscreen
 * @returns {boolean} - True if in fullscreen
 */
export const isFullscreen = () => {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
};

/**
 * Get current fullscreen element
 * @returns {HTMLElement|null} - Current fullscreen element
 */
export const getFullscreenElement = () => {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    null
  );
};

/**
 * Check if fullscreen is enabled/supported
 * @returns {boolean} - True if fullscreen is supported
 */
export const isFullscreenEnabled = () => {
  return !!(
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  );
};

/**
 * Add fullscreen change listener
 * @param {Function} callback - Callback function
 * @returns {Function} - Cleanup function
 */
export const addFullscreenChangeListener = (callback) => {
  const events = [
    'fullscreenchange',
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'MSFullscreenChange',
  ];

  events.forEach((event) => {
    document.addEventListener(event, callback);
  });

  // Return cleanup function
  return () => {
    events.forEach((event) => {
      document.removeEventListener(event, callback);
    });
  };
};

/**
 * Add fullscreen error listener
 * @param {Function} callback - Callback function
 * @returns {Function} - Cleanup function
 */
export const addFullscreenErrorListener = (callback) => {
  const events = [
    'fullscreenerror',
    'webkitfullscreenerror',
    'mozfullscreenerror',
    'MSFullscreenError',
  ];

  events.forEach((event) => {
    document.addEventListener(event, callback);
  });

  // Return cleanup function
  return () => {
    events.forEach((event) => {
      document.removeEventListener(event, callback);
    });
  };
};

/**
 * Toggle fullscreen
 * @param {HTMLElement} element - Element to toggle fullscreen
 * @returns {Promise} - Resolves when toggle is complete
 */
export const toggleFullscreen = (element) => {
  if (isFullscreen()) {
    return exitFullscreen();
  } else {
    return requestFullscreen(element);
  }
};

/**
 * Lock screen orientation (if supported)
 * @param {string} orientation - Orientation to lock ('portrait' or 'landscape')
 * @returns {Promise} - Resolves when orientation is locked
 */
export const lockOrientation = (orientation = 'landscape') => {
  if (screen.orientation && screen.orientation.lock) {
    return screen.orientation.lock(orientation);
  }
  return Promise.resolve(); // Silently succeed if not supported
};

/**
 * Unlock screen orientation
 * @returns {void}
 */
export const unlockOrientation = () => {
  if (screen.orientation && screen.orientation.unlock) {
    screen.orientation.unlock();
  }
};

/**
 * Create fullscreen manager instance
 * @param {HTMLElement} element - Element to manage
 * @returns {Object} - Manager instance
 */
export const createFullscreenManager = (element) => {
  let changeListener = null;
  let errorListener = null;

  /**
   * Enter fullscreen
   * @returns {Promise}
   */
  const enter = () => requestFullscreen(element);

  /**
   * Exit fullscreen
   * @returns {Promise}
   */
  const exit = () => exitFullscreen();

  /**
   * Toggle fullscreen
   * @returns {Promise}
   */
  const toggle = () => toggleFullscreen(element);

  /**
   * Check if in fullscreen
   * @returns {boolean}
   */
  const isActive = () => isFullscreen();

  /**
   * Set change listener
   * @param {Function} callback
   */
  const onChange = (callback) => {
    if (changeListener) {
      changeListener(); // Cleanup previous listener
    }
    changeListener = addFullscreenChangeListener(callback);
  };

  /**
   * Set error listener
   * @param {Function} callback
   */
  const onError = (callback) => {
    if (errorListener) {
      errorListener(); // Cleanup previous listener
    }
    errorListener = addFullscreenErrorListener(callback);
  };

  /**
   * Cleanup all listeners
   */
  const cleanup = () => {
    if (changeListener) {
      changeListener();
      changeListener = null;
    }
    if (errorListener) {
      errorListener();
      errorListener = null;
    }
  };

  return {
    enter,
    exit,
    toggle,
    isActive,
    onChange,
    onError,
    cleanup,
  };
};

export default {
  requestFullscreen,
  exitFullscreen,
  isFullscreen,
  getFullscreenElement,
  isFullscreenEnabled,
  addFullscreenChangeListener,
  addFullscreenErrorListener,
  toggleFullscreen,
  lockOrientation,
  unlockOrientation,
  createFullscreenManager,
};