import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Check } from 'lucide-react';
import { markCourseViewed, markDayComplete, unmarkDayComplete, getProgress } from '../utils/progressStorage';
import { CustomBlockquote } from '../utils/markdownHelpers';
import Exercise from '../components/Exercise';
import CollapsibleCode from '../components/CollapsibleCode';
import './CoursePage.css';

function CoursePage({ course: courseProp }) {
  const { week, day } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Determine course from prop or default to 'java'
  const course = courseProp || 'java';

  // Map day numbers to actual filenames for Java
  const javaFileMap = {
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
    },
    'week3': {
      'day15': 'day15_strings',
      'day16': 'day16_packages_static',
      'day17': 'day17_exception_handling_part1',
      'day18': 'day18_exception_handling_part2',
      'day19': 'day19_collections_list_set',
      'day20': 'day20_collections_map',
      'day21': 'day21_generics'
    },
    'week4': {
      'day22': 'day22_file_io',
      'day23': 'day23_file_operations',
      'day24': 'day24_serialization',
      'day25': 'day25_multithreading_basics',
      'day26': 'day26_thread_synchronization',
      'day27': 'day27_lambda_expressions',
      'day28': 'day28_stream_api',
      'day29': 'day29_date_time_api',
      'day30': 'day30_final_review'
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
      
      let path;
      
      if (course === 'selenium') {
        // For Selenium, extract day number from URL parameter
        // URL will be like /selenium/day1, and day param will be "1"
        const dayNum = day || '1';
        const paddedDay = dayNum.padStart(2, '0');
        path = `/content/01_Core_Courses/Selenium_Automation_Daily/week1/day${paddedDay}_selenium_introduction.md`;
      } else {
        // For Java, use the existing file map
        const filename = javaFileMap[week]?.[day];
        if (!filename) {
          throw new Error('Invalid week or day');
        }
        path = `/content/01_Core_Courses/Core_Java_Daily/${week}/${filename}.md`;
      }
      
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

  // Parse exercise content from markdown
  const parseExerciseContent = (content) => {
    const lines = content.split('\n');
    const exercise = {
      title: '',
      description: '',
      requirements: [],
      testCases: [],
      hints: [],
      solutionCode: ''
    };
    
    let currentSection = null;
    let currentTestCase = null;
    let solutionLines = [];
    let inSolutionCodeBlock = false;
    let codeBlockCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (trimmed.startsWith('title:')) {
        exercise.title = trimmed.substring(6).trim();
      } else if (trimmed.startsWith('description:')) {
        exercise.description = trimmed.substring(12).trim();
        currentSection = 'description';
      } else if (trimmed === 'requirements:') {
        currentSection = 'requirements';
      } else if (trimmed === 'testcases:') {
        currentSection = 'testcases';
      } else if (trimmed === 'hints:') {
        currentSection = 'hints';
      } else if (trimmed === 'solution:') {
        currentSection = 'solution';
      } else if (currentSection === 'solution' && trimmed.startsWith('```java')) {
        inSolutionCodeBlock = true;
        codeBlockCount++;
      } else if (currentSection === 'solution' && trimmed === '```' && inSolutionCodeBlock) {
        inSolutionCodeBlock = false;
        // Don't break, continue to capture all code
      } else if (currentSection === 'solution' && inSolutionCodeBlock) {
        solutionLines.push(line);
      } else if (currentSection === 'description' && trimmed && !trimmed.startsWith('-') && !trimmed.startsWith('requirements:')) {
        exercise.description += ' ' + trimmed;
      } else if (currentSection === 'requirements' && trimmed.startsWith('-')) {
        exercise.requirements.push(trimmed.substring(1).trim());
      } else if (currentSection === 'testcases') {
        if (trimmed.startsWith('- input:')) {
          if (currentTestCase) {
            exercise.testCases.push(currentTestCase);
          }
          currentTestCase = {
            input: trimmed.substring(8).trim().replace(/^["']|["']$/g, ''),
            output: ''
          };
        } else if (trimmed.startsWith('output:') && currentTestCase) {
          currentTestCase.output = trimmed.substring(7).trim().replace(/^["']|["']$/g, '');
        }
      } else if (currentSection === 'hints' && trimmed.startsWith('-')) {
        exercise.hints.push(trimmed.substring(1).trim());
      }
    }
    
    // Add last test case if exists
    if (currentTestCase) {
      exercise.testCases.push(currentTestCase);
    }
    
    // Set solution code
    if (solutionLines.length > 0) {
      exercise.solutionCode = solutionLines.join('\n');
    }
    
    return exercise;
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
            h2({ node, children, ...props }) {
              // Track when we enter "Practical Exercises" section
              const text = String(children);
              // Only set flag for the MAIN "Practical Exercises" section with emoji
              if ((text.includes('💻') && text.includes('Practical Exercises')) ||
                  text === 'Practical Exercises') {
                if (typeof window !== 'undefined') {
                  window.__inExercisesSection = true;
                }
              } else if (text.match(/^(Key Takeaways|Common Mistakes|Navigation|Checklist|Additional Resources|🔑|⚠️|🧭|✅|📖)/)) {
                // Clear flag when we leave exercises section
                if (typeof window !== 'undefined') {
                  window.__inExercisesSection = false;
                }
              }
              return <h2 {...props}>{children}</h2>;
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              
              // Check if this is an exercise block
              if (!inline && match && match[1] === 'exercise') {
                const content = String(children).replace(/\n$/, '');
                const exercise = parseExerciseContent(content);
                
                if (exercise) {
                  return <Exercise {...exercise} />;
                }
              }
              
              // Make Java code blocks collapsible ONLY in exercises section
              if (!inline && match && match[1] === 'java') {
                const code = String(children).replace(/\n$/, '');
                const inExercises = typeof window !== 'undefined' && window.__inExercisesSection;
                
                if (inExercises) {
                  return <CollapsibleCode code={code} language="java" />;
                }
              }
              
              // Regular code blocks
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
            },
            blockquote: CustomBlockquote
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default CoursePage;