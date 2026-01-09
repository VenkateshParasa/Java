import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Check } from 'lucide-react';
import { markCourseViewed, markDayComplete, unmarkDayComplete, getProgress } from '../utils/progressStorage';
import './CoursePage.css';

function CoursePage() {
  const { week, day } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Map day numbers to actual filenames
  const dayFileMap = {
    'week1': {
      'day1': 'day01_introduction_setup',
      'day2': 'day02_variables_datatypes',
      'day3': 'day03_operators_expressions',
      'day4': 'day04_control_flow_conditionals',
      'day5': 'day05_control_flow_loops',
      'day6': 'day06_arrays_part1',
      'day7': 'day07_arrays_part2_review'
    },
    'week2': {
      'day8': 'day08_oop_classes',
      'day9': 'day09_constructors_this',
      'day10': 'day10_methods_overloading',
      'day11': 'day11_encapsulation',
      'day12': 'day12_inheritance',
      'day13': 'day13_polymorphism',
      'day14': 'day14_abstraction'
    }
  };

  useEffect(() => {
    loadContent();
  }, [week, day]);

  // Check if day is manually completed
  useEffect(() => {
    const progress = getProgress();
    setIsCompleted(progress[day]?.manuallyCompleted || false);

    // Listen for progress updates
    const handleProgressUpdate = () => {
      const updatedProgress = getProgress();
      setIsCompleted(updatedProgress[day]?.manuallyCompleted || false);
    };

    window.addEventListener('progressUpdate', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate);
  }, [day]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the actual filename from the map
      const filename = dayFileMap[week]?.[day];
      if (!filename) {
        throw new Error('Invalid week or day');
      }
      
      // Construct the path to the markdown file
      const path = `/content/01_Core_Courses/Core_Java_Daily/${week}/${filename}.md`;
      
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error('Content not found');
      }
      
      const text = await response.text();
      setContent(text);

      // Mark course as viewed for progress tracking
      markCourseViewed(day);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = () => {
    if (isCompleted) {
      unmarkDayComplete(day);
      setIsCompleted(false);
    } else {
      markDayComplete(day);
      setIsCompleted(true);
    }
  };

  if (loading) {
    return (
      <div className="course-page loading">
        <div className="loading-spinner">Loading course content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-page error">
        <h2>Content Not Available</h2>
        <p>{error}</p>
        <Link to="/" className="back-button">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="course-page">
      <div className="course-navigation">
        <div className="nav-left">
          <Link to="/" className="nav-button">← Home</Link>
          <Link to="/assessments" className="nav-button">View Assessments</Link>
        </div>
        <button
          className={`complete-button ${isCompleted ? 'completed' : ''}`}
          onClick={handleToggleComplete}
          title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <Check size={18} />
          <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
        </button>
      </div>

      <div className="course-content markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a({ node, children, href, ...props }) {
              // Handle internal links
              if (href && href.startsWith('/')) {
                return <Link to={href} {...props}>{children}</Link>;
              }
              return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default CoursePage;