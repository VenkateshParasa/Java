import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ContentRenderer from './components/ContentRenderer'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSkeleton from './components/LoadingSkeleton'
import { loadContentIndex } from './utils/contentLoader'

function App() {
  const [contentIndex, setContentIndex] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('sidebarWidth')
    return saved ? parseInt(saved) : 320
  })
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load content index
    loadContentIndex().then(index => {
      setContentIndex(index)
      setLoading(false)
    }).catch(err => {
      console.error('Failed to load content index:', err)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 animate-pulse"></div>
        <div className="flex flex-1 pt-16">
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 animate-pulse"></div>
          <div className="flex-1 p-8">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      <Header
        toggleSidebar={toggleSidebar}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />

      <div className="flex flex-1 pt-16">
        <Navigation
          contentIndex={contentIndex}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          width={sidebarWidth}
          onWidthChange={(newWidth) => {
            setSidebarWidth(newWidth)
            localStorage.setItem('sidebarWidth', newWidth.toString())
          }}
        />

        <main
          id="main-content"
          className="flex-1 transition-all duration-300"
          style={{
            marginLeft: sidebarOpen ? `${sidebarWidth}px` : '0'
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<ContentRenderer path="README_START_HERE" />} />
              <Route path="/content/*" element={<ContentRenderer />} />
              <Route path="*" element={<ContentRenderer />} />
            </Routes>
          </div>
        </main>
      </div>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
