export default {
  title: "Day 11: File Upload and Download Assessment",
  description: "Test your understanding of file upload and download operations in Selenium",
  passingScore: 70,
  timeLimit: 22, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 24,
      timeLimit: 22,
      sections: ['section-a', 'section-b', 'section-c', 'section-d']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is the simplest way to upload a file in Selenium?',
          options: [
            'Click the upload button',
            'Use sendKeys() with file path on input element',
            'Use Robot class',
            'Use JavaScript executor'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The simplest way is to use sendKeys() with the absolute file path on the <input type="file"> element, which directly sets the file path.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What type of input element is used for file uploads?',
          options: [
            '<input type="upload">',
            '<input type="file">',
            '<input type="attachment">',
            '<file-input>'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The <input type="file"> element is the standard HTML element for file upload functionality.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'When should you use Robot class for file uploads?',
          options: [
            'Always, it is the best method',
            'When sendKeys() does not work or upload dialog opens',
            'For faster execution',
            'Never, it is deprecated'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Robot class should be used when sendKeys() fails or when a native OS file dialog opens that Selenium cannot handle.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is AutoIT used for in Selenium?',
          options: [
            'Test automation framework',
            'Handling Windows-based dialogs and controls',
            'Database testing',
            'Performance testing'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'AutoIT is a Windows automation tool used to handle native Windows dialogs like file upload/download dialogs that Selenium cannot control.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is a limitation of using Robot class?',
          options: [
            'Cannot type text',
            'Platform dependent and requires focus on the window',
            'Slow execution',
            'Not available in Java'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Robot class is platform-dependent, requires the application window to have focus, and cannot run in headless mode, making it less reliable.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which file path should you provide to sendKeys() for file upload?',
          options: [
            'Relative path',
            'Absolute path',
            'URL',
            'File name only'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Always provide the absolute file path (complete path from root) to sendKeys() for reliable file uploads.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'How can you set the download location in Chrome?',
          options: [
            'Use browser settings manually',
            'Set ChromeOptions with download.default_directory preference',
            'Cannot be set programmatically',
            'Use Robot class'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Set download location using ChromeOptions by adding preference "download.default_directory" with the desired path.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'How do you verify if a file has been downloaded?',
          options: [
            'Check if file exists in download folder',
            'Verify file size',
            'Check download timestamp',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'File download can be verified by checking file existence, size, timestamp, and content to ensure successful download.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'What Java class is used to verify file existence?',
          options: [
            'FileSystem',
            'File',
            'Path',
            'FileVerifier'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The java.io.File class is used to represent files and verify existence using the exists() method.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'How do you disable the download prompt in browsers?',
          options: [
            'Use browser preferences/options',
            'Use Robot class to click Save',
            'Use JavaScript',
            'It cannot be disabled'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Disable download prompts by setting browser preferences like Chrome\'s "download.prompt_for_download" to false in browser options.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'What is the issue with parallel execution and file uploads?',
          options: [
            'Files may overwrite each other',
            'Robot class affects all windows',
            'Timing conflicts',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'hard',
          explanation: 'Parallel execution faces issues: files may overwrite, Robot class is not thread-safe and affects all windows, and timing conflicts occur.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'How can you upload multiple files at once?',
          options: [
            'Call sendKeys() multiple times',
            'Send all file paths separated by newline character',
            'Use multiple input elements',
            'Both B and C'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Multiple files can be uploaded by sending paths separated by \\n in sendKeys() (if supported) or by using multiple file input elements.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'What method verifies if a file exists in Java?',
          options: [
            'File.exists()',
            'file.isPresent()',
            'file.isAvailable()',
            'File.verify()'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'The exists() method of the File class returns true if the file exists at the specified path.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'How do you handle download wait times?',
          options: [
            'Use Thread.sleep()',
            'Poll the download directory until file appears',
            'Use explicit wait with custom condition',
            'Both B and C'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Best practices include polling the download directory or using explicit wait with custom ExpectedCondition to wait for file appearance.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'What is a disadvantage of using AutoIT?',
          options: [
            'Windows only',
            'Requires separate script files',
            'External dependency',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'AutoIT disadvantages: only works on Windows, requires maintaining separate .exe script files, and adds external dependency to tests.'
        },
        {
          id: 'q16',
          type: 'mcq',
          question: 'How do you get the download file name from Chrome?',
          options: [
            'Use Chrome DevTools Protocol',
            'Read from download manager',
            'Parse browser logs',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'hard',
          explanation: 'Download file names can be obtained using Chrome DevTools Protocol, reading from download manager, or parsing browser performance logs.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q17',
          type: 'true-false',
          question: 'sendKeys() method works with all types of file upload implementations.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. sendKeys() works with <input type="file"> elements but fails when native OS dialogs open or custom upload widgets are used.'
        },
        {
          id: 'q18',
          type: 'true-false',
          question: 'Robot class can be used in headless browser mode.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. Robot class requires GUI and focus on the application window, making it incompatible with headless browser execution.'
        },
        {
          id: 'q19',
          type: 'true-false',
          question: 'You must click the file input element before using sendKeys() for upload.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. You can directly call sendKeys() on the file input element without clicking it first. Clicking may trigger the OS dialog.'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'Downloaded files should be cleaned up after test execution.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Downloaded files should be deleted in test cleanup (tearDown/after) to prevent accumulation and ensure clean test environment.'
        },
        {
          id: 'q21',
          type: 'true-false',
          question: 'File paths in Windows use forward slashes (/).',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. Windows uses backslashes (\\) for file paths, though Java accepts forward slashes (/) for cross-platform compatibility.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q22',
          type: 'fill-blank',
          question: 'To upload a file in Selenium, use ________ method with the file path.',
          correctAnswer: 'sendKeys',
          points: 2,
          difficulty: 'easy',
          explanation: 'The sendKeys() method is used to set the file path on <input type="file"> elements for file uploads.'
        },
        {
          id: 'q23',
          type: 'fill-blank',
          question: 'The Java class ________ is used to check if a file exists.',
          correctAnswer: 'File',
          points: 2,
          difficulty: 'easy',
          explanation: 'The java.io.File class is used to represent files and directories and provides the exists() method.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q24',
          type: 'short',
          question: 'Explain the complete process of setting up and verifying file download in Chrome browser.',
          sampleAnswer: 'File download setup and verification process: 1) Set download preferences: ChromeOptions options = new ChromeOptions(); Map<String, Object> prefs = new HashMap<>(); prefs.put("download.default_directory", "/path/to/download"); prefs.put("download.prompt_for_download", false); options.setExperimentalOption("prefs", prefs); 2) Initialize driver: WebDriver driver = new ChromeDriver(options); 3) Navigate and trigger download: driver.get("url"); driver.findElement(By.id("downloadBtn")).click(); 4) Wait for download: Create custom wait to poll directory until file appears. Use ExpectedCondition or loop with sleep. 5) Verify file: File file = new File("/path/to/download/filename.ext"); Assert.assertTrue(file.exists()); Check file.length() for size validation. 6) Cleanup: Delete file in @After or tearDown method. Best practices: Use unique download directories per test for parallel execution, implement retry logic for slow downloads, validate file content not just existence.',
          points: 4,
          difficulty: 'hard',
          keywords: ['ChromeOptions', 'download', 'prefs', 'default_directory', 'File', 'exists', 'wait', 'verify', 'cleanup', 'delete']
        }
      ]
    }
  ]
};
