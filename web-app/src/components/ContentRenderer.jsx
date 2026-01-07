import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { loadMarkdownContent } from '../utils/markdownParser'
import Breadcrumbs from './Breadcrumbs'
import TableOfContents from './TableOfContents'
import CodeBlock from './CodeBlock'
import Exercise from './Exercise'
import Admonition from './Admonition'
import LoadingSkeleton from './LoadingSkeleton'
import { useProgress } from '../hooks/useProgress'

function ContentRenderer({ path }) {
  const location = useLocation()
  const [content, setContent] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { markComplete, isComplete } = useProgress()

  const currentPath = path || location.pathname.replace('/content/', '')

  useEffect(() => {
    setLoading(true)
    setError(null)

    loadMarkdownContent(currentPath)
      .then(({ content, metadata }) => {
        setContent(content)
        setMetadata(metadata)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [currentPath])

  const handleMarkComplete = () => {
    markComplete(currentPath)
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="max-w-4xl">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
          <div className="flex items-start">
            <svg
              className="w-8 h-8 text-red-500 mr-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
                Content Not Found
              </h2>
              <p className="text-red-700 dark:text-red-300 mb-4">
                {error}
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                The requested content could not be loaded. This might be because:
              </p>
              <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-400 space-y-1 mb-6">
                <li>The file doesn't exist in the repository</li>
                <li>The path is incorrect</li>
                <li>The content index needs to be regenerated</li>
              </ul>
              <div className="flex gap-3">
                <Link
                  to="/"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Go to Home
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''

      // Extract text content from children (handles both strings and arrays)
      const getTextContent = (child) => {
        if (typeof child === 'string') return child
        if (Array.isArray(child)) return child.map(getTextContent).join('')
        if (child?.props?.children) return getTextContent(child.props.children)
        return ''
      }

      if (!inline && language) {
        const codeString = getTextContent(children)
        return <CodeBlock code={codeString.replace(/\n$/, '')} language={language} />
      }

      return (
        <code
          className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-pink-600 dark:text-pink-400"
          {...props}
        >
          {children}
        </code>
      )
    },

    blockquote({ children }) {
      // Try to detect admonition type
      const text = children?.toString() || ''
      let type = 'note'

      if (text.toLowerCase().includes('tip:')) type = 'tip'
      else if (text.toLowerCase().includes('warning:')) type = 'warning'
      else if (text.toLowerCase().includes('danger:') || text.toLowerCase().includes('caution:'))
        type = 'danger'

      return <Admonition type={type}>{children}</Admonition>
    },

    table({ children }) {
      return (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse">{children}</table>
        </div>
      )
    },

    a({ href, children }) {
      const isExternal = href?.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary-600 dark:text-primary-400 hover:underline"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
          {isExternal && (
            <svg
              className="inline w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </a>
      )
    },

    h1: ({ children }) => (
      <h1 id={slugify(String(children))} className="scroll-mt-20">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 id={slugify(String(children))} className="scroll-mt-20">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={slugify(String(children))} className="scroll-mt-20">
        {children}
      </h3>
    ),
  }

  const completed = isComplete(currentPath)

  return (
    <article className="max-w-4xl">
      <Breadcrumbs path={currentPath} metadata={metadata} />

      {metadata?.title && (
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {metadata.title}
          </h1>
          {metadata?.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {metadata.description}
            </p>
          )}

          {metadata?.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {metadata.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleMarkComplete}
              className={`
                px-4 py-2 rounded-md font-medium transition-colors
                ${
                  completed
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }
              `}
            >
              {completed ? (
                <>
                  <svg className="inline w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Completed
                </>
              ) : (
                'Mark as Complete'
              )}
            </button>

            {metadata?.estimatedTime && (
              <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Estimated time: {metadata.estimatedTime}
              </span>
            )}
          </div>
        </header>
      )}

      <div className="flex gap-8">
        <div className="flex-1 prose dark:prose-dark max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
            components={components}
            skipHtml={true}
          >
            {content}
          </ReactMarkdown>
        </div>

        <aside className="hidden xl:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <TableOfContents content={content} />
          </div>
        </aside>
      </div>
    </article>
  )
}

// Helper function to create URL-friendly IDs from headings
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default ContentRenderer
