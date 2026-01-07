// Content loader utility
// This loads the content index and individual markdown files

import contentIndexData from '../data/contentIndex.json'

// Cache for the content index
let contentIndexCache = null

/**
 * Load the content index from the generated JSON file
 * @returns {Promise<Object>} The content index
 */
export async function loadContentIndex() {
  // Return cached index if available
  if (contentIndexCache) {
    return contentIndexCache
  }

  try {
    // Load the generated content index
    contentIndexCache = contentIndexData
    return contentIndexCache
  } catch (err) {
    console.error('Failed to load content index:', err)
    throw new Error('Failed to load content index. Please run "npm run generate-index" to create it.')
  }
}

/**
 * Clear the content index cache (useful for development)
 */
export function clearContentIndexCache() {
  contentIndexCache = null
}

export function findContentByPath(contentIndex, path) {
  const search = (items) => {
    for (const item of items) {
      if (item.path === path) return item
      if (item.children) {
        const found = search(item.children)
        if (found) return found
      }
    }
    return null
  }

  return search(contentIndex.sections || [])
}

export function getAllContent(contentIndex) {
  const result = []

  const traverse = (items) => {
    for (const item of items) {
      result.push(item)
      if (item.children) {
        traverse(item.children)
      }
    }
  }

  traverse(contentIndex.sections || [])
  return result
}
