import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'

function Search() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState([])
  const { search } = useSearch()
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length > 1) {
      const searchResults = search(query)
      setResults(searchResults.slice(0, 10))
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, search])

  const handleSelect = () => {
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Search content"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <Link
              key={index}
              to={result.path}
              onClick={handleSelect}
              className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <div className="font-medium text-gray-900 dark:text-white mb-1">
                {result.title}
              </div>
              {result.excerpt && (
                <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {result.excerpt}
                </div>
              )}
              {result.tags && result.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {result.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
          <p className="text-gray-600 dark:text-gray-400 text-center">No results found</p>
        </div>
      )}
    </div>
  )
}

export default Search
