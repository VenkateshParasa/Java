import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'

function Exercise({ title, instructions, solution, hints }) {
  const [showSolution, setShowSolution] = useState(false)
  const [showHints, setShowHints] = useState(false)

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 my-6 bg-white dark:bg-gray-800">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-primary-600 dark:text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
        </div>
      </div>

      <div className="prose dark:prose-dark max-w-none mb-4">
        <ReactMarkdown>{instructions}</ReactMarkdown>
      </div>

      <div className="flex gap-3">
        {hints && (
          <button
            onClick={() => setShowHints(!showHints)}
            className="px-4 py-2 rounded-md bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
          >
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
        )}

        {solution && (
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-4 py-2 rounded-md bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        )}
      </div>

      {showHints && hints && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
          <h4 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
            💡 Hints:
          </h4>
          <div className="prose dark:prose-dark max-w-none">
            <ReactMarkdown>{hints}</ReactMarkdown>
          </div>
        </div>
      )}

      {showSolution && solution && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 rounded animate-fade-in">
          <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">
            ✅ Solution:
          </h4>
          <div className="prose dark:prose-dark max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  if (!inline && match) {
                    return <CodeBlock code={String(children)} language={match[1]} />
                  }
                  return <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded" {...props}>{children}</code>
                }
              }}
            >
              {solution}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default Exercise
