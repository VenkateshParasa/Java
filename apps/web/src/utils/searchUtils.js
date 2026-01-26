/**
 * Search through course content by title, day number, or week
 * @param {string} query - Search query string
 * @param {Array} courseStructure - Course structure array
 * @returns {Array} Array of matching day objects with week context
 */
export const searchCourseContent = (query, courseStructure) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  courseStructure.forEach((week) => {
    week.days.forEach((day) => {
      let matchType = null;
      let matchScore = 0;

      // Check for day number match (e.g., "day 1", "day1", "1")
      const dayNumberString = `day ${day.dayNumber}`;
      const dayNumberAlt = `day${day.dayNumber}`;
      if (
        dayNumberString.includes(lowerQuery) ||
        dayNumberAlt.includes(lowerQuery) ||
        day.dayNumber.toString() === lowerQuery
      ) {
        matchType = 'day-number';
        matchScore = 100; // Highest priority for exact day number matches
      }

      // Check for title match
      if (day.title.toLowerCase().includes(lowerQuery)) {
        if (!matchType) matchType = 'title';
        matchScore = Math.max(matchScore, 80);
      }

      // Check for week title match
      if (week.weekTitle.toLowerCase().includes(lowerQuery)) {
        if (!matchType) matchType = 'week';
        matchScore = Math.max(matchScore, 60);
      }

      // Check for week number match (e.g., "week 1", "week1")
      const weekNumberString = `week ${week.weekNumber}`;
      const weekNumberAlt = `week${week.weekNumber}`;
      if (
        weekNumberString.includes(lowerQuery) ||
        weekNumberAlt.includes(lowerQuery)
      ) {
        if (!matchType) matchType = 'week-number';
        matchScore = Math.max(matchScore, 70);
      }

      // If we have a match, add to results
      if (matchType) {
        results.push({
          ...day,
          weekTitle: week.weekTitle,
          weekNumber: week.weekNumber,
          matchType,
          matchScore,
        });
      }
    });
  });

  // Sort results by match score (highest first)
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results;
};

/**
 * Get day by day number
 * @param {number} dayNumber - Day number (1-30)
 * @param {Array} courseStructure - Course structure array
 * @returns {Object|null} Day object with week context or null
 */
export const getDayByNumber = (dayNumber, courseStructure) => {
  for (const week of courseStructure) {
    const day = week.days.find((d) => d.dayNumber === dayNumber);
    if (day) {
      return {
        ...day,
        weekTitle: week.weekTitle,
        weekNumber: week.weekNumber,
      };
    }
  }
  return null;
};

/**
 * Get all days for a specific week
 * @param {number} weekNumber - Week number (1-4)
 * @param {Array} courseStructure - Course structure array
 * @returns {Array} Array of day objects
 */
export const getDaysByWeek = (weekNumber, courseStructure) => {
  const week = courseStructure.find((w) => w.weekNumber === weekNumber);
  return week ? week.days : [];
};

/**
 * Highlight matching text in a string
 * @param {string} text - Text to highlight in
 * @param {string} query - Search query
 * @returns {string} Text with <mark> tags around matches
 */
export const highlightMatch = (text, query) => {
  if (!query || !text) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

/**
 * Get search suggestions based on partial input
 * @param {string} query - Partial search query
 * @param {Array} courseStructure - Course structure array
 * @returns {Array} Array of suggestion strings
 */
export const getSearchSuggestions = (query, courseStructure) => {
  if (!query || query.trim().length < 1) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const suggestions = new Set();

  courseStructure.forEach((week) => {
    // Add week titles as suggestions
    if (week.weekTitle.toLowerCase().includes(lowerQuery)) {
      suggestions.add(`Week ${week.weekNumber}: ${week.weekTitle}`);
    }

    week.days.forEach((day) => {
      // Add day titles as suggestions
      if (day.title.toLowerCase().includes(lowerQuery)) {
        suggestions.add(`Day ${day.dayNumber}: ${day.title}`);
      }

      // Add day numbers as suggestions
      if (`day ${day.dayNumber}`.includes(lowerQuery)) {
        suggestions.add(`Day ${day.dayNumber}`);
      }
    });
  });

  return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
};
