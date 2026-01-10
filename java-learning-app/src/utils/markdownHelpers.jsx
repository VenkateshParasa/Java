import Exercise from '../components/Exercise';
import CommonMistakes from '../components/CommonMistakes';

/**
 * Custom Blockquote Component for Markdown
 * Handles special blockquote types like warnings, tips, mistakes, etc.
 */
export const CustomBlockquote = ({ children, node, ...props }) => {
  // Get the text content from the blockquote
  const getTextContent = (node) => {
    if (!node) return '';

    if (typeof node === 'string') return node;

    if (node.props && node.props.children) {
      if (Array.isArray(node.props.children)) {
        return node.props.children.map(child => getTextContent(child)).join('\n');
      }
      return getTextContent(node.props.children);
    }

    return '';
  };

  const content = getTextContent(children);

  // Check for [!MISTAKE] pattern
  if (content.includes('[!MISTAKE]')) {
    const lines = content.split('\n').filter(line => line.trim());

    // Parse mistake data
    const mistakeData = {
      title: '',
      wrong: '',
      wrongNote: '',
      right: '',
      rightNote: '',
      why: '',
      tip: ''
    };

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('[!MISTAKE]')) {
        mistakeData.title = trimmed.replace('[!MISTAKE]', '').trim();
      } else if (trimmed.startsWith('Wrong:')) {
        mistakeData.wrong = trimmed.substring(6).trim();
      } else if (trimmed.startsWith('WrongNote:')) {
        mistakeData.wrongNote = trimmed.substring(10).trim();
      } else if (trimmed.startsWith('Right:')) {
        mistakeData.right = trimmed.substring(6).trim();
      } else if (trimmed.startsWith('RightNote:')) {
        mistakeData.rightNote = trimmed.substring(10).trim();
      } else if (trimmed.startsWith('Why:')) {
        mistakeData.why = trimmed.substring(4).trim();
      } else if (trimmed.startsWith('Tip:')) {
        mistakeData.tip = trimmed.substring(4).trim();
      }
    }

    // Return CommonMistakes component with single mistake
    return <CommonMistakes title="" mistakes={[mistakeData]} />;
  }

  // Check for [!TIP] pattern
  if (content.includes('[!TIP]')) {
    return (
      <div className="tip-box">
        <div className="tip-header">💡 Tip</div>
        <div className="tip-content">
          {content.replace('[!TIP]', '').trim()}
        </div>
      </div>
    );
  }

  // Check for other simple patterns
  if (typeof content === 'string') {
    if (content.startsWith('⚠️') || content.startsWith('WARNING:')) {
      return <blockquote className="warning-blockquote" {...props}>{children}</blockquote>;
    }
    if (content.startsWith('💡') || content.startsWith('TIP:')) {
      return <blockquote className="tip-blockquote" {...props}>{children}</blockquote>;
    }
    if (content.startsWith('ℹ️') || content.startsWith('INFO:')) {
      return <blockquote className="info-blockquote" {...props}>{children}</blockquote>;
    }
  }

  return <blockquote {...props}>{children}</blockquote>;
};

/**
 * Parse Exercise Block from Markdown
 * Detects and parses custom exercise syntax in markdown
 * 
 * Format:
 * ```exercise
 * title: Exercise Title
 * description: Problem description here
 * requirements:
 * - Requirement 1
 * - Requirement 2
 * testcases:
 * - input: "num1 = 2, num2 = 3"
 *   output: "Addition: 5"
 * - input: "num1 = 10, num2 = 5"
 *   output: "Subtraction: 5"
 * hints:
 * - Hint 1
 * - Hint 2
 * solution:
 * ```java
 * // Solution code here
 * ```
 * ```
 */
export const parseExerciseBlock = (content) => {
  const exerciseRegex = /```exercise\n([\s\S]*?)```/g;
  const matches = [...content.matchAll(exerciseRegex)];
  
  return matches.map(match => {
    const blockContent = match[1];
    const lines = blockContent.split('\n');
    
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
    let inSolution = false;
    
    for (const line of lines) {
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
      } else if (trimmed.startsWith('```java')) {
        inSolution = true;
      } else if (trimmed === '```' && inSolution) {
        inSolution = false;
        exercise.solutionCode = solutionLines.join('\n');
      } else if (inSolution) {
        solutionLines.push(line);
      } else if (currentSection === 'description' && trimmed && !trimmed.startsWith('-')) {
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
    
    return exercise;
  });
};

/**
 * Custom Code Component that detects exercise blocks
 */
export const CustomCode = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  
  // Check if this is an exercise block
  if (language === 'exercise') {
    const content = String(children).replace(/\n$/, '');
    const exercises = parseExerciseBlock('```exercise\n' + content + '\n```');
    
    if (exercises.length > 0) {
      return <Exercise {...exercises[0]} />;
    }
  }
  
  // Return null for inline code or non-exercise blocks
  // (will be handled by parent component)
  return null;
};

/**
 * Helper function to extract exercise data from markdown heading + content pattern
 * This is an alternative approach that works with existing markdown structure
 */
export const extractExerciseFromHeading = (headingText, followingContent) => {
  // Match pattern: "Exercise N: Title"
  const exerciseMatch = headingText.match(/Exercise\s+(\d+):\s+(.+)/i);
  
  if (!exerciseMatch) return null;
  
  const exerciseNumber = exerciseMatch[1];
  const title = exerciseMatch[2];
  
  // Parse the following content for problem statement and code
  const lines = followingContent.split('\n');
  let description = '';
  let requirements = [];
  let testCases = [];
  let solutionCode = '';
  let inCodeBlock = false;
  let codeLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('```java')) {
      inCodeBlock = true;
      continue;
    }
    
    if (line === '```' && inCodeBlock) {
      solutionCode = codeLines.join('\n');
      break;
    }
    
    if (inCodeBlock) {
      codeLines.push(lines[i]);
    } else if (!solutionCode) {
      // Before code block, collect description
      if (line && !line.startsWith('#')) {
        description += line + ' ';
      }
    }
  }
  
  return {
    number: exerciseNumber,
    title: `Exercise ${exerciseNumber}: ${title}`,
    description: description.trim(),
    requirements,
    testCases,
    solutionCode: solutionCode.trim(),
    hints: []
  };
};
