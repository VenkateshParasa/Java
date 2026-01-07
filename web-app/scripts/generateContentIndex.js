#!/usr/bin/env node

/**
 * Content Index Generator
 *
 * This script scans the parent directory for markdown files and generates
 * a content index used by the application for navigation and search.
 *
 * Usage: node scripts/generateContentIndex.js
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Root content directory (parent of web-app)
const CONTENT_ROOT = path.resolve(__dirname, '../../')
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/contentIndex.json')

// Folders to scan
const FOLDERS_TO_SCAN = [
  '00_Getting_Started',
  '01_Core_Courses',
  '02_Detailed_Topics',
  '03_BEGINNER_FRIENDLY_Exercises',
  '04_Assessments',
]

// Files to include at root level
const ROOT_FILES = [
  'README_START_HERE.md',
  'FOLDER_STRUCTURE_GUIDE.md',
  'COMPREHENSIVE_PROGRESS_TRACKER.md',
]

async function extractMetadata(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const { data, content: markdownContent } = matter(content)

    // Extract title from front-matter or first H1
    let title = data.title
    if (!title) {
      const h1Match = markdownContent.match(/^#\s+(.+)$/m)
      title = h1Match ? h1Match[1] : path.basename(filePath, '.md')
    }

    // Extract description from front-matter or first paragraph
    let description = data.description
    if (!description) {
      const paraMatch = markdownContent.match(/^[^#\n].+$/m)
      description = paraMatch ? paraMatch[0].substring(0, 150) + '...' : ''
    }

    return {
      title,
      description,
      tags: data.tags || [],
      estimatedTime: data.estimatedTime || '',
      exercises: data.exercises || 0,
      lastUpdated: data.lastUpdated || '',
    }
  } catch (err) {
    console.warn(`Failed to extract metadata from ${filePath}:`, err.message)
    return {
      title: path.basename(filePath, '.md'),
      description: '',
      tags: [],
    }
  }
}

async function scanDirectory(dirPath, basePath = '') {
  const items = []

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      const relativePath = path.join(basePath, entry.name)

      if (entry.isDirectory()) {
        // Skip certain directories
        if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'web-app') {
          continue
        }

        const children = await scanDirectory(fullPath, relativePath)

        if (children.length > 0) {
          items.push({
            id: relativePath.replace(/\//g, '-').toLowerCase(),
            title: formatTitle(entry.name),
            path: `/content/${relativePath}`,
            type: 'folder',
            children,
          })
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const metadata = await extractMetadata(fullPath)
        const pathWithoutExt = relativePath.replace(/\.md$/, '')

        items.push({
          id: pathWithoutExt.replace(/\//g, '-').toLowerCase(),
          title: metadata.title,
          description: metadata.description,
          path: `/content/${pathWithoutExt}`,
          type: 'file',
          tags: metadata.tags,
          estimatedTime: metadata.estimatedTime,
          exercises: metadata.exercises,
          lastUpdated: metadata.lastUpdated,
        })
      }
    }
  } catch (err) {
    console.error(`Error scanning directory ${dirPath}:`, err.message)
  }

  return items
}

function formatTitle(str) {
  // Convert folder/file names to readable titles
  return str
    .replace(/^\d+_/, '') // Remove leading numbers
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

async function generateIndex() {
  console.log('🔍 Scanning content directories...\n')

  const sections = []

  // Scan each top-level folder
  for (const folder of FOLDERS_TO_SCAN) {
    const folderPath = path.join(CONTENT_ROOT, folder)

    try {
      await fs.access(folderPath)
      console.log(`📁 Scanning ${folder}...`)

      const children = await scanDirectory(folderPath, folder)

      sections.push({
        id: folder.toLowerCase().replace(/_/g, '-'),
        title: formatTitle(folder),
        path: `/content/${folder}`,
        children,
      })
    } catch (err) {
      console.warn(`⚠️  Folder ${folder} not found, skipping...`)
    }
  }

  // Scan root-level files
  console.log('\n📄 Scanning root files...')
  for (const file of ROOT_FILES) {
    const filePath = path.join(CONTENT_ROOT, file)

    try {
      await fs.access(filePath)
      const metadata = await extractMetadata(filePath)
      const pathWithoutExt = file.replace(/\.md$/, '')

      // Add to Getting Started section or create new section
      const gettingStartedSection = sections.find(s => s.id === '00-getting-started')

      if (gettingStartedSection) {
        gettingStartedSection.children.unshift({
          id: pathWithoutExt.toLowerCase().replace(/[_\s]/g, '-'),
          title: metadata.title,
          description: metadata.description,
          path: `/content/${pathWithoutExt}`,
          type: 'file',
          tags: metadata.tags,
        })
      }
    } catch (err) {
      console.warn(`⚠️  File ${file} not found, skipping...`)
    }
  }

  const index = {
    sections,
    generatedAt: new Date().toISOString(),
    totalFiles: countFiles(sections),
  }

  // Ensure data directory exists
  const dataDir = path.dirname(OUTPUT_FILE)
  await fs.mkdir(dataDir, { recursive: true })

  // Write index file
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf-8')

  console.log(`\n✅ Content index generated successfully!`)
  console.log(`📊 Total files indexed: ${index.totalFiles}`)
  console.log(`💾 Output: ${OUTPUT_FILE}`)
}

function countFiles(sections) {
  let count = 0

  function traverse(items) {
    for (const item of items) {
      if (item.type === 'file') count++
      if (item.children) traverse(item.children)
    }
  }

  traverse(sections)
  return count
}

// Run the generator
generateIndex().catch(err => {
  console.error('❌ Failed to generate content index:', err)
  process.exit(1)
})
