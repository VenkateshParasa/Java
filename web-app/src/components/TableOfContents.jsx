import { useState, useEffect } from 'react'

function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (!content) return

    // Extract headings from markdown content
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const matches = [...content.matchAll(headingRegex)]

    const extractedHeadings = matches.map((match, index) => {
      const level = match[1].length
      const text = match[2].replace(/\[(.+)\]\(.+\)/g, '$1') // Remove links
      const id = slugify(text)
      // Add index to ensure unique keys even if headings have same text
      return { level, text, id: `${id}-${index}`, originalId: id }
    })

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    )

    headings.forEach(({ originalId }) => {
      const element = document.getElementById(originalId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="toc" aria-label="Table of contents">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
        On This Page
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${heading.originalId}`}
              className={`
                block py-1 border-l-2 pl-3 transition-colors
                ${
                  activeId === heading.originalId
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500'
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default TableOfContents
