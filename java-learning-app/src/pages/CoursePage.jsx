import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const contentRef = useRef(null);
  
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

  // Map day numbers to actual filenames for Selenium (all 49 days across 7 weeks)
  const seleniumFileMap = {
    '1': { week: 'week1', file: 'day01_selenium_introduction' },
    '2': { week: 'week1', file: 'day02_selenium_locators' },
    '3': { week: 'week1', file: 'day03_webdriver_commands' },
    '4': { week: 'week1', file: 'day04_web_elements' },
    '5': { week: 'week1', file: 'day05_waits' },
    '6': { week: 'week1', file: 'day06_dropdowns_alerts_frames' },
    '7': { week: 'week1', file: 'day07_framework_setup_review' },
    '8': { week: 'week2', file: 'day08_actions_class' },
    '9': { week: 'week2', file: 'day09_drag_drop_sliders' },
    '10': { week: 'week2', file: 'day10_web_tables' },
    '11': { week: 'week2', file: 'day11_file_upload_download' },
    '12': { week: 'week2', file: 'day12_javascript_executor_advanced' },
    '13': { week: 'week2', file: 'day13_advanced_scenarios' },
    '14': { week: 'week2', file: 'day14_week2_review' },
    '15': { week: 'week3', file: 'day15_week2_review_transition' },
    '16': { week: 'week3', file: 'day16_screenshots_visual_testing' },
    '17': { week: 'week3', file: 'day17_browser_options_capabilities' },
    '18': { week: 'week3', file: 'day18_testng_part1' },
    '19': { week: 'week3', file: 'day19_testng_part2' },
    '20': { week: 'week3', file: 'day20_testng_part3' },
    '21': { week: 'week3', file: 'day21_testng_part4' },
    '22': { week: 'week3', file: 'day22_testng_part5' },
    '23': { week: 'week4', file: 'day23_pom_part1' },
    '24': { week: 'week4', file: 'day24_pom_part2' },
    '25': { week: 'week4', file: 'day25_properties_files' },
    '26': { week: 'week4', file: 'day26_excel_data_reading' },
    '27': { week: 'week4', file: 'day27_json_csv_data' },
    '28': { week: 'week4', file: 'day28_parallel_execution' },
    '29': { week: 'week4', file: 'day29_cross_browser_testing' },
    '30': { week: 'week5', file: 'day30_advanced_pom_patterns' },
    '31': { week: 'week5', file: 'day31_external_data' },
    '32': { week: 'week5', file: 'day32_logging_reporting_part1' },
    '33': { week: 'week5', file: 'day33_logging_reporting_part2' },
    '34': { week: 'week5', file: 'day34_configuration_management' },
    '35': { week: 'week5', file: 'day35_utility_classes' },
    '36': { week: 'week5', file: 'day36_exception_handling' },
    '37': { week: 'week6', file: 'day37_ci_cd_integration' },
    '38': { week: 'week6', file: 'day38_bdd_cucumber' },
    '39': { week: 'week6', file: 'day39_api_testing_integration' },
    '40': { week: 'week6', file: 'day40_database_testing' },
    '41': { week: 'week6', file: 'day41_performance_security_testing' },
    '42': { week: 'week6', file: 'day42_framework_best_practices' },
    '43': { week: 'week7', file: 'day43_cross_browser_testing' },
    '44': { week: 'week7', file: 'day44_mobile_web_testing' },
    '45': { week: 'week7', file: 'day45_docker_containerization' },
    '46': { week: 'week7', file: 'day46_cloud_testing' },
    '47': { week: 'week7', file: 'day47_visual_regression' },
    '48': { week: 'week7', file: 'day48_test_maintenance' },
    '49': { week: 'week7', file: 'day49_capstone_project' }
  };

  useEffect(() => {
    loadContent();
  }, [week, day, course]);

  // Handle hash navigation for deeplinks
  useEffect(() => {
    if (!loading && location.hash) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (!loading) {
      // Scroll to top when no hash
      window.scrollTo(0, 0);
    }
  }, [loading, location.hash]);

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
        // For Selenium, extract the day number from the day parameter
        // The day parameter will be like "day1", "day2", etc. or just "1", "2", etc.
        const dayNum = day ? day.replace('day', '') : '1';
        const seleniumDay = seleniumFileMap[dayNum];
        
        if (!seleniumDay) {
          throw new Error(`Invalid Selenium day: ${dayNum}`);
        }
        
        path = `/content/01_Core_Courses/Selenium_Automation_Daily/${seleniumDay.week}/${seleniumDay.file}.md`;
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
      
      let text = await response.text();
      
      // Remove YAML frontmatter if present
      text = removeFrontmatter(text);
      
      // Remove heading IDs like {#introduction}
      text = removeHeadingIds(text);
      
      setContent(text);
      console.log('Content loaded, length:', text.length, 'First 200 chars:', text.substring(0, 200));

      // Mark course as viewed for progress tracking
      markCourseViewed(day);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to remove YAML frontmatter from markdown
  const removeFrontmatter = (markdown) => {
    // Check if content starts with frontmatter delimiter
    if (markdown.trim().startsWith('---')) {
      // Find the closing delimiter
      const lines = markdown.split('\n');
      let endIndex = -1;
      
      // Start from line 1 (skip first ---)
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
          endIndex = i;
          break;
        }
      }
      
      // If we found the closing delimiter, remove frontmatter
      if (endIndex > 0) {
        return lines.slice(endIndex + 1).join('\n').trim();
      }
    }
    
    return markdown;
  };

  // Helper function to remove heading IDs like {#introduction}
  const removeHeadingIds = (markdown) => {
    // Remove {#id} patterns from headings
    return markdown.replace(/\s*\{#[\w-]+\}/g, '');
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
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm text-gray-600" style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: '#4b5563', padding: '0 2rem', paddingTop: '1rem' }}>
        <Link to="/" className="hover:text-primary-600" style={{ color: '#4b5563', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <Link to="/" className="hover:text-primary-600" style={{ color: '#4b5563', textDecoration: 'none' }}>
          {course === 'selenium' ? 'Selenium' : 'Java'}
        </Link>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        {course === 'java' && week && (
          <>
            <Link to={`/course/${week}/day1`} className="hover:text-primary-600" style={{ color: '#4b5563', textDecoration: 'none' }}>
              {week.charAt(0).toUpperCase() + week.slice(1)}
            </Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
          </>
        )}
        <span style={{ color: '#111827', fontWeight: '500' }}>
          {course === 'selenium'
            ? `Day ${day?.replace('day', '') || '1'}`
            : day ? day.charAt(0).toUpperCase() + day.slice(1) : 'Day 1'
          }
        </span>
      </nav>

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

      <div className="course-content markdown-body" ref={contentRef}>
        {console.log('Rendering ReactMarkdown with content length:', content.length)}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            input({ node, ...props }) {
              // Hide checkboxes - don't render them at all
              if (props.type === 'checkbox') {
                return null;
              }
              return <input {...props} />;
            },
            li({ node, children, className, ...props }) {
              // Check if this is a task list item (contains checkbox)
              const isTaskItem = node?.children?.some(
                child => child.type === 'element' && child.tagName === 'input' && child.properties?.type === 'checkbox'
              );
              
              if (isTaskItem) {
                // Convert task list item to regular list item (remove checkbox, keep text)
                // Filter out the checkbox input from children
                const filteredChildren = Array.isArray(children)
                  ? children.filter(child => {
                      // Remove checkbox inputs
                      if (child?.type?.name === 'input') return false;
                      return true;
                    })
                  : children;
                
                return (
                  <li className={className} {...props}>
                    {filteredChildren}
                  </li>
                );
              }
              
              return <li className={className} {...props}>{children}</li>;
            },
            h1({ node, children, ...props }) {
              // Generate ID from heading text for anchor links
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              return <h1 id={id} {...props}>{children}</h1>;
            },
            h2({ node, children, ...props }) {
              // Generate ID from heading text for anchor links
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              
              // Track when we enter "Practical Exercises" section
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
              return <h2 id={id} {...props}>{children}</h2>;
            },
            h3({ node, children, ...props }) {
              // Generate ID from heading text for anchor links
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              return <h3 id={id} {...props}>{children}</h3>;
            },
            h4({ node, children, ...props }) {
              // Generate ID from heading text for anchor links
              const text = String(children);
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              return <h4 id={id} {...props}>{children}</h4>;
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
              // Handle hash links (anchor links within the same page)
              if (href && href.startsWith('#')) {
                return (
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = href.replace('#', '');
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Update URL hash without triggering navigation
                        window.history.pushState(null, '', href);
                      }
                    }}
                    {...props}
                  >
                    {children}
                  </a>
                );
              }
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