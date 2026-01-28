import { useState } from 'react';
import { Link } from 'react-router-dom';
import CodePlayground from '../components/CodePlayground';
import './PlaygroundPage.css';

const PlaygroundPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('java');

  const examples = {
    java: {
      hello: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      fibonacci: `public class Main {
    public static void main(String[] args) {
        int n = 10;
        System.out.println("Fibonacci Series up to " + n + " terms:");

        int first = 0, second = 1;
        System.out.print(first + " " + second);

        for (int i = 2; i < n; i++) {
            int next = first + second;
            System.out.print(" " + next);
            first = second;
            second = next;
        }
    }
}`,
      array: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 9, 1, 7, 6, 3};

        System.out.println("Original array:");
        printArray(numbers);

        // Bubble sort
        for (int i = 0; i < numbers.length - 1; i++) {
            for (int j = 0; j < numbers.length - i - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    int temp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = temp;
                }
            }
        }

        System.out.println("\\nSorted array:");
        printArray(numbers);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,
      oop: `class Student {
    private String name;
    private int age;
    private double gpa;

    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
        System.out.println("Status: " + getStatus());
    }

    private String getStatus() {
        if (gpa >= 3.5) return "Excellent";
        else if (gpa >= 3.0) return "Good";
        else if (gpa >= 2.0) return "Average";
        else return "Needs Improvement";
    }
}

public class Main {
    public static void main(String[] args) {
        Student student1 = new Student("Alice", 20, 3.8);
        Student student2 = new Student("Bob", 21, 2.9);

        System.out.println("Student 1:");
        student1.displayInfo();

        System.out.println("\\nStudent 2:");
        student2.displayInfo();
    }
}`
    }
  };

  const [selectedExample, setSelectedExample] = useState('hello');

  return (
    <div className="playground-page">
      <div className="playground-page-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1 className="page-title">
          <span className="title-icon">{'</>'}</span>
          Interactive Code Playground
        </h1>
        <p className="page-subtitle">
          Write, run, and test your Java code directly in the browser
        </p>
      </div>

      <div className="playground-controls">
        <div className="control-group">
          <label className="control-label">Choose Example:</label>
          <div className="example-buttons">
            <button
              className={`example-btn ${selectedExample === 'hello' ? 'active' : ''}`}
              onClick={() => setSelectedExample('hello')}
            >
              Hello World
            </button>
            <button
              className={`example-btn ${selectedExample === 'fibonacci' ? 'active' : ''}`}
              onClick={() => setSelectedExample('fibonacci')}
            >
              Fibonacci Series
            </button>
            <button
              className={`example-btn ${selectedExample === 'array' ? 'active' : ''}`}
              onClick={() => setSelectedExample('array')}
            >
              Array Sorting
            </button>
            <button
              className={`example-btn ${selectedExample === 'oop' ? 'active' : ''}`}
              onClick={() => setSelectedExample('oop')}
            >
              OOP Example
            </button>
          </div>
        </div>
      </div>

      <CodePlayground
        initialCode={examples[selectedLanguage][selectedExample]}
        language={selectedLanguage}
        title={`Java Code Playground - ${selectedExample.charAt(0).toUpperCase() + selectedExample.slice(1).replace(/([A-Z])/g, ' $1')}`}
      />

      <div className="playground-info">
        <div className="info-card">
          <h3>📝 How to Use</h3>
          <ol>
            <li>Write your Java code in the editor on the left</li>
            <li>Click the "Run" button or press Ctrl/Cmd + Enter</li>
            <li>View the output or errors on the right</li>
            <li>Use the "Reset" button to restore default code</li>
            <li>Use the "Copy" button to copy your code</li>
          </ol>
        </div>

        <div className="info-card">
          <h3>⚡ Features</h3>
          <ul>
            <li>Real-time code execution powered by Judge0</li>
            <li>Syntax highlighting and code completion</li>
            <li>Error detection and helpful error messages</li>
            <li>Pre-loaded examples to learn from</li>
            <li>Responsive design works on all devices</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>💡 Tips</h3>
          <ul>
            <li>All Java code must be in a class with a <code>main</code> method</li>
            <li>Use <code>System.out.println()</code> to see output</li>
            <li>Compilation errors will show in red with helpful messages</li>
            <li>Try modifying the examples to experiment and learn</li>
            <li>Save your work externally - code is not persisted</li>
          </ul>
        </div>

        <div className="info-card setup-card">
          <h3>🔧 API Setup (Optional)</h3>
          <p>
            For unlimited code execution, get a free RapidAPI key:
          </p>
          <ol>
            <li>Visit <a href="https://rapidapi.com/judge0-official/api/judge0-ce" target="_blank" rel="noopener noreferrer">RapidAPI Judge0</a></li>
            <li>Sign up for a free account</li>
            <li>Subscribe to the free tier (100 requests/day)</li>
            <li>Copy your API key and add it to <code>CodePlayground.jsx</code></li>
          </ol>
          <p className="note">
            <strong>Note:</strong> Without an API key, the playground runs in limited mode with basic JavaScript execution only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
