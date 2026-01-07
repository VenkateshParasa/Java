#!/usr/bin/env node

/**
 * Content Copy Script
 * 
 * Copies all markdown files from the parent directory to public/content
 * for serving via the web application.
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SOURCE_DIR = path.resolve(__dirname, '../../')
const DEST_DIR = path.resolve(__dirname, '../public/content')

// Folders to copy
const FOLDERS_TO_COPY = [
  '00_Getting_Started',
  '01_Core_Courses',
  '02_Detailed_Topics',
  '03_BEGINNER_FRIENDLY_Exercises',
  '04_Assessments',
]

// Root files to copy
const ROOT_FILES = [
  'COMPREHENSIVE_PROGRESS_TRACKER.md',
  'PROJECT_TODO_TRACKER.md',
  'VISUAL_ELEMENTS_TRACKER.md',
]

async function copyFile(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true })
  await fs.copyFile(src, dest)
}

async function copyDirectory(src, dest) {
  try {
    const entries = await fs.readdir(src, { withFileTypes: true })
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)
      
      if (entry.isDirectory()) {
        // Skip certain directories
        if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'web-app') {
          continue
        }
        await copyDirectory(srcPath, destPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        await copyFile(srcPath, destPath)
        console.log(`  ✓ ${path.relative(SOURCE_DIR, srcPath)}`)
      }
    }
  } catch (err) {
    console.error(`Error copying directory ${src}:`, err.message)
  }
}

async function main() {
  console.log('📋 Copying markdown content files...\n')
  
  // Clean destination directory
  try {
    await fs.rm(DEST_DIR, { recursive: true, force: true })
  } catch (err) {
    // Directory might not exist, that's okay
  }
  
  await fs.mkdir(DEST_DIR, { recursive: true })
  
  let fileCount = 0
  
  // Copy folders
  for (const folder of FOLDERS_TO_COPY) {
    const srcPath = path.join(SOURCE_DIR, folder)
    const destPath = path.join(DEST_DIR, folder)
    
    try {
      await fs.access(srcPath)
      console.log(`📁 Copying ${folder}...`)
      await copyDirectory(srcPath, destPath)
      fileCount++
    } catch (err) {
      console.warn(`⚠️  Folder ${folder} not found, skipping...`)
    }
  }
  
  // Copy root files
  console.log('\n📄 Copying root files...')
  for (const file of ROOT_FILES) {
    const srcPath = path.join(SOURCE_DIR, file)
    const destPath = path.join(DEST_DIR, file)
    
    try {
      await fs.access(srcPath)
      await copyFile(srcPath, destPath)
      console.log(`  ✓ ${file}`)
      fileCount++
    } catch (err) {
      console.warn(`⚠️  File ${file} not found, skipping...`)
    }
  }
  
  console.log(`\n✅ Content copy complete!`)
  console.log(`📊 Copied content to: ${DEST_DIR}`)
}

main().catch(err => {
  console.error('❌ Failed to copy content:', err)
  process.exit(1)
})