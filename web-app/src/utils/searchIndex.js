import { loadContentIndex, getAllContent } from './contentLoader'
import { loadMarkdownContent } from './markdownParser'

export async function buildSearchIndex() {
  try {
    const contentIndex = await loadContentIndex()
    const allContent = getAllContent(contentIndex)

    const searchIndex = []

    for (const item of allContent) {
      try {
        // Try to load the actual markdown content
        const { content, metadata } = await loadMarkdownContent(item.path)

        // Extract first 500 characters as preview
        const preview = content
          .replace(/[#*`_]/g, '') // Remove markdown symbols
          .substring(0, 500)
          .trim()

        searchIndex.push({
          id: item.id,
          title: metadata?.title || item.title,
          description: metadata?.description || item.description || '',
          content: preview,
          path: item.path,
          tags: metadata?.tags || item.tags || [],
        })
      } catch (err) {
        // If we can't load the content, just use the metadata we have
        searchIndex.push({
          id: item.id,
          title: item.title,
          description: item.description || '',
          content: '',
          path: item.path,
          tags: item.tags || [],
        })
      }
    }

    return searchIndex
  } catch (err) {
    console.error('Failed to build search index:', err)
    return []
  }
}
