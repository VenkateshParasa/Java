import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

function Navigation({ contentIndex, isOpen, onClose, width = 320, onWidthChange }) {
  const location = useLocation()
  const { getProgress } = useProgress()
  const [expandedSections, setExpandedSections] = useState({})
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef(null)

  if (!contentIndex) return null

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return
      
      const newWidth = e.clientX
      // Constrain width between 200px and 600px
      if (newWidth >= 200 && newWidth <= 600) {
        onWidthChange?.(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, onWidthChange])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const renderNavItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedSections[item.id] !== false // default expanded
    const active = isActive(item.path)
    const progress = getProgress(item.id)
    const paddingLeft = `${level * 1}rem`

    return (
      <li key={item.id} className="mb-1">
        <div className="flex items-center">
          {hasChildren && (
            <button
              onClick={() => toggleSection(item.id)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <svg
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          <Link
            to={item.path}
            onClick={onClose}
            className={`
              flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm
              transition-colors
              ${active
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
            style={{ paddingLeft }}
          >
            {progress?.completed && (
              <svg
                className="w-4 h-4 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            <span className="flex-1 truncate">{item.title}</span>

            {item.tag && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                {item.tag}
              </span>
            )}
          </Link>
        </div>

        {hasChildren && isExpanded && (
          <ul className="mt-1 ml-2">
            {item.children.map(child => renderNavItem(child, level + 1))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`
          fixed top-16 left-0 bottom-0 bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          overflow-y-auto z-40 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        style={{ width: `${width}px` }}
        aria-label="Main navigation"
      >
        <div className="p-4">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Navigation
          </h2>

          <ul className="space-y-1">
            {contentIndex.sections?.map(section => renderNavItem(section))}
          </ul>
        </div>

        {/* Resize handle */}
        <div
          className="absolute top-0 right-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary-500 transition-colors group"
          onMouseDown={() => setIsResizing(true)}
          title="Drag to resize"
        >
          <div className="absolute inset-y-0 -right-1 w-3 group-hover:bg-primary-500/20" />
        </div>
      </nav>
    </>
  )
}

export default Navigation
