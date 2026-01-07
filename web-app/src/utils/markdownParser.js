import matter from 'gray-matter'

// Cache for loaded content to avoid re-parsing
const contentCache = new Map()

/**
 * Load and parse markdown content from public/content directory
 * @param {string} path - The content path (e.g., '/content/00_Getting_Started/README_START_HERE')
 * @returns {Promise<{content: string, metadata: object}>}
 */
export async function loadMarkdownContent(path) {
  // Normalize path - remove /content/ prefix and leading slash
  const normalizedPath = path.replace('/content/', '').replace(/^\//, '')
  
  // Check cache first
  const cacheKey = normalizedPath
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)
  }

  try {
    // Construct the URL to fetch the markdown file from public/content
    const url = `/content/${normalizedPath}.md`
    
    // Fetch the markdown content
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const rawContent = await response.text()
    
    // Parse front matter and content
    const { data, content } = matter(rawContent)

    const result = {
      content,
      metadata: {
        title: data.title || extractTitleFromPath(normalizedPath),
        description: data.description || '',
        tags: data.tags || [],
        estimatedTime: data.estimatedTime || '',
        lastUpdated: data.lastUpdated || '',
        exercises: data.exercises || 0,
        ...data,
      },
    }

    // Cache the result
    contentCache.set(cacheKey, result)
    
    return result
  } catch (err) {
    console.error(`Failed to load content for ${normalizedPath}:`, err)
    throw new Error(`Failed to load content: ${err.message}`)
  }
}

/**
 * Extract a readable title from a file path
 * @param {string} path - File path
 * @returns {string} - Formatted title
 */
function extractTitleFromPath(path) {
  const filename = path.split('/').pop()
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/\.md$/, '')
    .replace(/\b\w/g, (l) => l.toUpperCase())
}

/**
 * Clear the content cache (useful for development/testing)
 */
export function clearContentCache() {
  contentCache.clear()
}
