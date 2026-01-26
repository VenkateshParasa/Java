import { useState } from 'react';
import { ChevronDown, ChevronRight, Code, CheckCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Exercise.css';

/**
 * Exercise Component
 * Displays programming exercises with problem statements and collapsible solutions
 * 
 * @param {Object} props
 * @param {string} props.title - Exercise title
 * @param {string} props.description - Problem description
 * @param {Array<string>} props.requirements - List of requirements
 * @param {Array<Object>} props.testCases - Array of test case objects with input and output
 * @param {string} props.solutionCode - Complete solution code
 * @param {string} props.language - Programming language (default: 'java')
 */
function Exercise({ 
  title, 
  description, 
  requirements = [], 
  testCases = [], 
  solutionCode, 
  language = 'java',
  hints = []
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="exercise-container">
      {/* Exercise Header */}
      <div className="exercise-header">
        <h3 className="exercise-title">
          <Code size={20} />
          {title}
        </h3>
      </div>

      {/* Problem Statement */}
      <div className="exercise-content">
        <div className="problem-statement">
          <h4>📝 Problem Statement</h4>
          <p className="description">{description}</p>

          {/* Requirements */}
          {requirements.length > 0 && (
            <div className="requirements-section">
              <h5>Requirements:</h5>
              <ul className="requirements-list">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Test Cases */}
          {testCases.length > 0 && (
            <div className="test-cases-section">
              <h5>📊 Sample Test Cases:</h5>
              {testCases.map((testCase, index) => (
                <div key={index} className="test-case">
                  <div className="test-case-header">Test Case {index + 1}:</div>
                  <div className="test-case-content">
                    <div className="test-input">
                      <strong>Input:</strong>
                      <pre>{testCase.input}</pre>
                    </div>
                    <div className="test-output">
                      <strong>Expected Output:</strong>
                      <pre>{testCase.output}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hints Section (Optional) */}
          {hints.length > 0 && (
            <div className="hints-section">
              <button 
                className="hints-toggle"
                onClick={() => setShowHints(!showHints)}
              >
                {showHints ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                💡 Need a hint? ({hints.length} available)
              </button>
              {showHints && (
                <ul className="hints-list">
                  {hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Solution Section (Collapsible) */}
        <div className="solution-section">
          <button 
            className={`solution-toggle ${isExpanded ? 'expanded' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <CheckCircle size={18} />
            <span>{isExpanded ? 'Hide Solution' : 'View Solution Code'}</span>
          </button>

          {isExpanded && (
            <div className="solution-content">
              <div className="solution-warning">
                ⚠️ Try solving the problem yourself before viewing the solution!
              </div>
              {solutionCode && solutionCode.trim() ? (
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    borderRadius: '8px',
                    fontSize: '14px',
                    maxWidth: '100%',
                    overflowX: 'auto'
                  }}
                >
                  {solutionCode.trim()}
                </SyntaxHighlighter>
              ) : (
                <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px', color: '#666' }}>
                  No solution code available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Exercise;