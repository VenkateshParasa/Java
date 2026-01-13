export default {
  title: "Day 17: First Selenium Script - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key browser automation concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all first Selenium script topics"
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Section A: Multiple Choice Questions',
      description: 'Choose the best answer for each question',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to launch a URL in Selenium WebDriver?',
          options: [
            'open()',
            'navigate()',
            'get()',
            'launch()'
          ],
          correctAnswer: 2,
          explanation: 'driver.get(url) is the primary method to navigate to a URL in Selenium WebDriver. It loads a new web page in the current browser window.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the difference between close() and quit() methods?',
          options: [
            'Both do the same thing',
            'close() closes current window, quit() closes all windows and ends session',
            'close() ends session, quit() closes current window',
            'Neither closes the browser'
          ],
          correctAnswer: 1,
          explanation: 'driver.close() closes only the current browser window, while driver.quit() closes all windows associated with the WebDriver session and terminates the session.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method returns the title of the current page?',
          options: [
            'getPageTitle()',
            'title()',
            'getTitle()',
            'fetchTitle()'
          ],
          correctAnswer: 2,
          explanation: 'driver.getTitle() returns the title of the current page as a String.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you maximize the browser window in Selenium?',
          options: [
            'driver.maximize()',
            'driver.window().maximize()',
            'driver.manage().window().maximize()',
            'driver.setMaximize()'
          ],
          correctAnswer: 2,
          explanation: 'driver.manage().window().maximize() maximizes the browser window to fill the screen.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method is used to navigate back to the previous page?',
          options: [
            'driver.back()',
            'driver.navigate().back()',
            'driver.goBack()',
            'driver.previous()'
          ],
          correctAnswer: 1,
          explanation: 'driver.navigate().back() navigates back to the previous page in browser history.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'What does getCurrentUrl() method return?',
          options: [
            'The title of the page',
            'The URL of the current page',
            'The page source code',
            'The browser name'
          ],
          correctAnswer: 1,
          explanation: 'driver.getCurrentUrl() returns the URL of the current page as a String.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which statement correctly creates a ChromeDriver instance?',
          options: [
            'ChromeDriver driver = new WebDriver();',
            'WebDriver driver = new ChromeDriver();',
            'WebDriver driver = ChromeDriver.create();',
            'driver = new ChromeDriver();'
          ],
          correctAnswer: 1,
          explanation: 'WebDriver driver = new ChromeDriver(); is the correct way to create a ChromeDriver instance using the WebDriver interface.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the refresh() method do?',
          options: [
            'Closes the browser',
            'Reloads the current page',
            'Navigates to a new URL',
            'Clears browser cache'
          ],
          correctAnswer: 1,
          explanation: 'driver.navigate().refresh() reloads the current page, similar to pressing F5 or the browser refresh button.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method moves the browser forward to the next page in history?',
          options: [
            'driver.forward()',
            'driver.navigate().forward()',
            'driver.goForward()',
            'driver.next()'
          ],
          correctAnswer: 1,
          explanation: 'driver.navigate().forward() moves forward to the next page in browser history.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of getPageSource() method?',
          options: [
            'To get the browser name',
            'To get the complete HTML source of the page',
            'To get the page title',
            'To get the page URL'
          ],
          correctAnswer: 1,
          explanation: 'driver.getPageSource() returns the complete HTML source code of the current page as a String.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which is the recommended approach for browser cleanup?',
          options: [
            'Use driver.close() in finally block',
            'Use driver.quit() in finally block',
            'No cleanup needed',
            'Use driver.close() in try block'
          ],
          correctAnswer: 1,
          explanation: 'driver.quit() in a finally block is the recommended approach to ensure proper browser cleanup even if exceptions occur.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens when you call driver.manage().window().fullscreen()?',
          options: [
            'Minimizes the window',
            'Sets window to fullscreen mode (F11)',
            'Maximizes the window',
            'Closes the window'
          ],
          correctAnswer: 1,
          explanation: 'driver.manage().window().fullscreen() puts the browser in fullscreen mode, similar to pressing F11.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you set a specific window size in Selenium?',
          options: [
            'driver.setSize(width, height)',
            'driver.window().setSize(width, height)',
            'driver.manage().window().setSize(new Dimension(width, height))',
            'driver.resize(width, height)'
          ],
          correctAnswer: 2,
          explanation: 'driver.manage().window().setSize(new Dimension(width, height)) sets the browser window to a specific size.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the difference between driver.get() and driver.navigate().to()?',
          options: [
            'No difference in functionality',
            'get() is faster',
            'navigate().to() stores history, get() does not',
            'get() can only open local files'
          ],
          correctAnswer: 0,
          explanation: 'Both driver.get() and driver.navigate().to() load a new page and function identically. navigate().to() is part of the Navigation interface.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method call chain gets the window size?',
          options: [
            'driver.getSize()',
            'driver.window().getSize()',
            'driver.manage().window().getSize()',
            'driver.size()'
          ],
          correctAnswer: 2,
          explanation: 'driver.manage().window().getSize() returns a Dimension object containing the width and height of the browser window.',
          points: 2,
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: True/False Questions',
      description: 'Determine if each statement is true or false',
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'The driver.quit() method should always be called in a finally block.',
          correctAnswer: true,
          explanation: 'True. Placing driver.quit() in a finally block ensures the browser is closed even if an exception occurs during test execution.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'driver.get() method waits for the page to load completely before proceeding.',
          correctAnswer: true,
          explanation: 'True. driver.get() waits for the page load event to fire before returning control, ensuring the page is loaded.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'driver.close() and driver.quit() can be used interchangeably.',
          correctAnswer: false,
          explanation: 'False. driver.close() closes only the current window, while driver.quit() closes all windows and ends the WebDriver session.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'The navigate().refresh() method reloads the current page.',
          correctAnswer: true,
          explanation: 'True. driver.navigate().refresh() reloads the current page, equivalent to pressing F5.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'You can navigate to a URL using both driver.get() and driver.navigate().to().',
          correctAnswer: true,
          explanation: 'True. Both methods navigate to a URL and function identically in most cases.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'maximize() and fullscreen() methods produce the same result.',
          correctAnswer: false,
          explanation: 'False. maximize() resizes window to fit the screen while showing OS taskbar. fullscreen() enters fullscreen mode hiding the taskbar (like F11).',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'getPageSource() returns only the visible content of the page.',
          correctAnswer: false,
          explanation: 'False. getPageSource() returns the complete HTML source code of the page, including hidden elements.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'FirefoxDriver and ChromeDriver have different methods for browser control.',
          correctAnswer: false,
          explanation: 'False. Both implement the WebDriver interface, so they have the same methods for browser control.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'You must call WebDriverManager.chromedriver().setup() before creating ChromeDriver instance.',
          correctAnswer: true,
          explanation: 'True. WebDriverManager setup must be called before creating the driver instance to download and configure the driver.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'After calling driver.quit(), you can continue using the same driver instance.',
          correctAnswer: false,
          explanation: 'False. After quit(), the WebDriver session is terminated and the driver instance cannot be reused. You must create a new instance.',
          points: 2,
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Fill in the Blanks',
      description: 'Complete each statement with the correct term',
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ method is used to navigate to a URL in Selenium.',
          correctAnswer: 'get()',
          acceptedAnswers: ['get()', 'get', 'driver.get()'],
          explanation: 'driver.get(url) is the primary method to navigate to a URL.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'To maximize the browser window, use driver.manage().window()._____()',
          correctAnswer: 'maximize()',
          acceptedAnswers: ['maximize()', 'maximize'],
          explanation: 'The maximize() method maximizes the browser window.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ method closes all browser windows and ends the WebDriver session.',
          correctAnswer: 'quit()',
          acceptedAnswers: ['quit()', 'quit', 'driver.quit()'],
          explanation: 'driver.quit() closes all windows and terminates the WebDriver session.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'To navigate back to the previous page, use driver.navigate()._____()',
          correctAnswer: 'back()',
          acceptedAnswers: ['back()', 'back'],
          explanation: 'The back() method navigates to the previous page in browser history.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The method _____ returns the current URL of the page.',
          correctAnswer: 'getCurrentUrl()',
          acceptedAnswers: ['getCurrentUrl()', 'getCurrentUrl', 'driver.getCurrentUrl()'],
          explanation: 'driver.getCurrentUrl() returns the URL of the current page.',
          points: 2,
          difficulty: 'easy'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Section D: Short Answer Questions',
      description: 'Provide brief answers to the following questions',
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Explain the difference between driver.close() and driver.quit() methods.',
          sampleAnswer: 'driver.close() closes only the current browser window/tab that has focus, while driver.quit() closes all browser windows/tabs associated with the WebDriver session and terminates the WebDriver session completely. quit() is recommended for proper cleanup.',
          keywords: ['close', 'quit', 'current window', 'all windows', 'session', 'terminate'],
          minKeywords: 4,
          explanation: 'close() closes current window; quit() closes all windows and ends the session.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the three main browser navigation methods and their purposes?',
          sampleAnswer: 'The three main navigation methods are: 1) back() - navigates to the previous page in browser history, 2) forward() - navigates to the next page in browser history, and 3) refresh() - reloads the current page. These methods are accessed through driver.navigate().',
          keywords: ['back', 'forward', 'refresh', 'navigate', 'history', 'reload', 'previous', 'next'],
          minKeywords: 5,
          explanation: 'back(), forward(), and refresh() control browser navigation through history.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Why should driver.quit() be placed in a finally block?',
          sampleAnswer: 'driver.quit() should be placed in a finally block to ensure the browser is closed and WebDriver session is terminated even if an exception occurs during test execution. The finally block always executes, guaranteeing proper resource cleanup and preventing orphaned browser processes.',
          keywords: ['finally', 'exception', 'cleanup', 'always executes', 'browser', 'session', 'terminate'],
          minKeywords: 4,
          explanation: 'Finally block ensures cleanup happens even when exceptions occur.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What information retrieval methods does WebDriver provide, and what do they return?',
          sampleAnswer: 'WebDriver provides: 1) getTitle() - returns the page title as String, 2) getCurrentUrl() - returns the current URL as String, and 3) getPageSource() - returns the complete HTML source code as String. These methods help verify page navigation and content.',
          keywords: ['getTitle', 'getCurrentUrl', 'getPageSource', 'title', 'URL', 'source', 'HTML', 'String'],
          minKeywords: 5,
          explanation: 'getTitle(), getCurrentUrl(), and getPageSource() retrieve page information.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Write the complete code to launch Chrome browser, navigate to google.com, and close the browser.',
          sampleAnswer: 'WebDriverManager.chromedriver().setup();\nWebDriver driver = new ChromeDriver();\ntry {\n    driver.get("https://www.google.com");\n} finally {\n    driver.quit();\n}',
          keywords: ['WebDriverManager', 'setup', 'ChromeDriver', 'get', 'quit', 'finally', 'new'],
          minKeywords: 4,
          explanation: 'Setup driver manager, create driver, navigate with get(), cleanup with quit() in finally.',
          points: 4,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
