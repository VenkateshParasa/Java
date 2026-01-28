import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import axios from 'axios';
import './CodePlayground.css';

const CodePlayground = ({ initialCode = '', language = 'java', title = 'Code Playground' }) => {
  const [code, setCode] = useState(initialCode || getDefaultCode(language));
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const editorRef = useRef(null);

  // JDoodle API configuration (Free - No Credit Card Required!)
  const JDOODLE_API = import.meta.env.VITE_USE_PROXY
    ? 'http://localhost:3001/api/execute'  // Via proxy server
    : 'https://api.jdoodle.com/v1/execute';  // Direct API
  const CLIENT_ID = 'be0be62c61de987a7601b220e281a518'; // ⚠️ Get free from https://www.jdoodle.com/compiler-api
  const CLIENT_SECRET = '7420e8f95b6cb03d85e24371a6a39ef1e505afc585a68099276efeb50978ee79'; // ⚠️ Get free from https://www.jdoodle.com/compiler-api

  // Language configurations for JDoodle
  const languageConfig = {
    'java': { language: 'java', versionIndex: '4' },  // Java JDK 17
    'python': { language: 'python3', versionIndex: '4' },
    'javascript': { language: 'nodejs', versionIndex: '4' },
    'cpp': { language: 'cpp17', versionIndex: '0' },
    'c': { language: 'c', versionIndex: '5' }
  };

  function getDefaultCode(lang) {
    const defaults = {
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        // Write your Java code here
        int sum = 5 + 10;
        System.out.println("Sum: " + sum);
    }
}`,
      python: `# Write your Python code here
print("Hello, World!")

# Example
sum = 5 + 10
print(f"Sum: {sum}")`,
      javascript: `// Write your JavaScript code here
console.log("Hello, World!");

// Example
const sum = 5 + 10;
console.log(\`Sum: \${sum}\`);`
    };
    return defaults[lang] || defaults.java;
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');

    // Validate API credentials
    if (CLIENT_ID === 'YOUR_CLIENT_ID' || CLIENT_SECRET === 'YOUR_CLIENT_SECRET') {
      setError('JDoodle API not configured.\n\nPlease add your free JDoodle credentials:\n1. Visit: https://www.jdoodle.com/compiler-api\n2. Sign up (no credit card required!)\n3. Get your Client ID and Client Secret\n4. Update CLIENT_ID and CLIENT_SECRET in CodePlayground.jsx');
      setIsRunning(false);
      return;
    }

    try {
      // Get language configuration
      const config = languageConfig[language] || languageConfig.java;

      // Execute code using JDoodle API
      const response = await axios.post(
        JDOODLE_API,
        {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          script: code,
          language: config.language,
          versionIndex: config.versionIndex
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const result = response.data;

      // Handle JDoodle response
      // statusCode: 200 = success, 1 = compilation error, others = runtime error
      if (result.statusCode === 200) {
        // Success
        setOutput(result.output || 'Program executed successfully (no output)');
      } else if (result.statusCode === 1) {
        // Compilation Error
        setError(`Compilation Error:\n${result.output || 'Unknown compilation error'}`);
      } else {
        // Runtime or other errors
        setError(`Error (Status ${result.statusCode}):\n${result.output || 'Unknown error occurred'}`);
      }
    } catch (err) {
      console.error('Error running code:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);

      if (err.response?.status === 429) {
        setError('Rate limit exceeded. Please wait a moment and try again.\n\nJDoodle free tier: 200 requests/day');
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Authentication failed. Please check your JDoodle credentials.\n\nEnsure CLIENT_ID and CLIENT_SECRET are correct in CodePlayground.jsx');
      } else if (err.response?.data) {
        // Show the actual error response from JDoodle
        setError(`JDoodle API Error:\n${JSON.stringify(err.response.data, null, 2)}\n\nStatus: ${err.response.status}`);
      } else if (err.message.includes('Network Error') || err.code === 'ERR_NETWORK') {
        // Fallback: Use a simpler execution method for development
        setError('API connection error. Running in local mode (limited features)...');

        // For development: simulate execution for simple cases
        setTimeout(() => {
          try {
            if (language === 'javascript') {
              // Can actually run JavaScript in browser
              const originalLog = console.log;
              const logs = [];
              console.log = (...args) => logs.push(args.join(' '));

              eval(code);

              console.log = originalLog;
              setOutput(logs.join('\n') || 'Executed successfully');
              setError('');
            } else {
              setError('JDoodle API not accessible. Please check:\n\n1. Internet connection\n2. JDoodle API credentials\n3. Network firewall settings\n\nGet free credentials at: https://www.jdoodle.com/compiler-api');
            }
          } catch (e) {
            setError(`Error: ${e.message}`);
          }
          setIsRunning(false);
        }, 500);
        return;
      } else {
        setError(`Failed to execute code: ${err.message}\n\nPlease ensure you have valid JDoodle credentials configured.\nGet free credentials at: https://www.jdoodle.com/compiler-api`);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(getDefaultCode(language));
    setOutput('');
    setError('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-playground">
      <div className="playground-header">
        <h3 className="playground-title">
          <span className="code-icon">{'</>'}</span>
          {title}
        </h3>
        <div className="playground-actions">
          <button
            className="playground-btn copy-btn"
            onClick={copyCode}
            title="Copy code"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className="playground-btn reset-btn"
            onClick={resetCode}
            title="Reset to default"
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <button
            className="playground-btn run-btn"
            onClick={runCode}
            disabled={isRunning}
            title="Run code (Ctrl/Cmd + Enter)"
          >
            <Play size={18} />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      <div className="playground-content">
        <div className="editor-section">
          <div className="section-label">Code Editor</div>
          <Editor
            height="400px"
            defaultLanguage={language}
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'on'
            }}
          />
        </div>

        <div className="output-section">
          <div className="section-label">
            Output
            {isRunning && <span className="loading-indicator">Running...</span>}
          </div>
          <div className={`output-content ${error ? 'has-error' : ''}`}>
            {isRunning && (
              <div className="loading-message">
                <div className="spinner"></div>
                <span>Executing code...</span>
              </div>
            )}
            {!isRunning && !output && !error && (
              <div className="empty-message">
                Click "Run" to execute your code
              </div>
            )}
            {error && (
              <div className="error-output">
                <div className="error-label">❌ Error</div>
                <pre>{error}</pre>
              </div>
            )}
            {output && !error && (
              <div className="success-output">
                <div className="success-label">✅ Success</div>
                <pre>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="playground-footer">
        <div className="footer-info">
          <span className="info-item">
            <strong>Language:</strong> {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
          <span className="info-item">
            <strong>Shortcut:</strong> Ctrl/Cmd + Enter to run
          </span>
        </div>
        <div className="footer-note">
          Powered by JDoodle API
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
