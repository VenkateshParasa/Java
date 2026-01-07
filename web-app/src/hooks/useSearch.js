import { useState, useEffect, useCallback } from 'react'
import Fuse from 'fuse.js'
import { buildSearchIndex } from '../utils/searchIndex'

export function useSearch() {
  const [fuse, setFuse] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Build search index on mount
    buildSearchIndex()
      .then((index) => {
        const fuseInstance = new Fuse(index, {
          keys: [
            { name: 'title', weight: 0.4 },
            { name: 'content', weight: 0.3 },
            { name: 'description', weight: 0.2 },
            { name: 'tags', weight: 0.1 },
          ],
          threshold: 0.3,
          includeScore: true,
          includeMatches: true,
          minMatchCharLength: 2,
        })
        setFuse(fuseInstance)
        setIsReady(true)
      })
      .catch((err) => {
        console.error('Failed to build search index:', err)
      })
  }, [])

  const search = useCallback(
    (query) => {
      if (!fuse || !query) return []

      const results = fuse.search(query)

      return results.map((result) => {
        const item = result.item
        const matches = result.matches || []

        // Extract excerpt from first match
        let excerpt = item.description || ''
        if (matches.length > 0 && matches[0].value) {
          const matchValue = matches[0].value
          const matchIndices = matches[0].indices[0] || [0, 100]
          const start = Math.max(0, matchIndices[0] - 50)
          const end = Math.min(matchValue.length, matchIndices[1] + 50)
          excerpt = '...' + matchValue.substring(start, end) + '...'
        }

        return {
          ...item,
          excerpt,
          score: result.score,
        }
      })
    },
    [fuse]
  )

  return {
    search,
    isReady,
  }
}
