import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CollapsibleCode.css';

/**
 * CollapsibleCode Component
 * Makes code blocks collapsible with a toggle button
 */
function CollapsibleCode({ code, language = 'java', title = 'View Solution Code' }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="collapsible-code">
      <button 
        className={`code-toggle ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        <span>{isExpanded ? 'Hide Solution' : title}</span>
      </button>

      {isExpanded && (
        <div className="code-content">
          <div className="code-warning">
            ⚠️ Try solving the problem yourself before viewing the solution!
          </div>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

export default CollapsibleCode;