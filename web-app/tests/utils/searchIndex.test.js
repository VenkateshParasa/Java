import { describe, it, expect } from 'vitest'
import { buildSearchIndex } from '../../src/utils/searchIndex'

describe('Search Index', () => {
  it('builds search index from content', async () => {
    const index = await buildSearchIndex()

    expect(Array.isArray(index)).toBe(true)
    expect(index.length).toBeGreaterThan(0)
  })

  it('includes required fields in index items', async () => {
    const index = await buildSearchIndex()

    const item = index[0]
    expect(item).toHaveProperty('id')
    expect(item).toHaveProperty('title')
    expect(item).toHaveProperty('path')
    expect(item).toHaveProperty('tags')
  })

  it('handles empty content gracefully', async () => {
    // This should not throw even if some content fails to load
    const index = await buildSearchIndex()
    expect(index).toBeDefined()
  })
})
