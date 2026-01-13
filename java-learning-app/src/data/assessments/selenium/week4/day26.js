export default {
  title: "Day 26: Frames & Windows - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key frames and windows concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all frames and windows handling topics"
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
          question: 'Which method is used to switch to a frame using its index?',
          options: [
            'driver.frame(index)',
            'driver.switchTo().frame(index)',
            'driver.changeFrame(index)',
            'driver.selectFrame(index)'
          ],
          correctAnswer: 1,
          explanation: 'driver.switchTo().frame(index) is the correct method to switch to a frame using its index position. The index starts from 0.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct method to switch back to the main page from a frame?',
          options: [
            'driver.switchTo().parent()',
            'driver.switchTo().defaultContent()',
            'driver.exitFrame()',
            'driver.mainPage()'
          ],
          correctAnswer: 1,
          explanation: 'driver.switchTo().defaultContent() switches the focus back to the main page (default content) from any frame or nested frame.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method returns a Set containing all window handles?',
          options: [
            'driver.getAllWindows()',
            'driver.getWindowHandles()',
            'driver.listWindows()',
            'driver.getWindows()'
          ],
          correctAnswer: 1,
          explanation: 'driver.getWindowHandles() returns a Set<String> containing unique identifiers (handles) for all open browser windows and tabs.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you switch to a frame using its name or id attribute?',
          options: [
            'driver.switchTo().frame("frameName")',
            'driver.frame("frameName")',
            'driver.selectFrame("frameName")',
            'driver.changeToFrame("frameName")'
          ],
          correctAnswer: 0,
          explanation: 'driver.switchTo().frame("frameName") can accept a string parameter representing the name or id attribute of the frame.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the difference between driver.switchTo().defaultContent() and driver.switchTo().parentFrame()?',
          options: [
            'They are exactly the same',
            'defaultContent() goes to main page, parentFrame() goes to immediate parent frame',
            'parentFrame() goes to main page, defaultContent() goes to parent frame',
            'defaultContent() closes the frame, parentFrame() hides it'
          ],
          correctAnswer: 1,
          explanation: 'defaultContent() switches to the main page (top-level content), while parentFrame() switches to the immediate parent frame in nested frame scenarios.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you switch to a frame using a WebElement?',
          options: [
            'driver.switchTo().frame(frameElement)',
            'driver.frame(frameElement)',
            'driver.changeFrame(frameElement)',
            'WebElement cannot be used to switch frames'
          ],
          correctAnswer: 0,
          explanation: 'driver.switchTo().frame(WebElement) accepts a WebElement object representing the frame. This is useful when frames do not have name or id attributes.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does driver.getWindowHandle() return?',
          options: [
            'All window handles as a Set',
            'The current window handle as a String',
            'The number of open windows',
            'The window title'
          ],
          correctAnswer: 1,
          explanation: 'driver.getWindowHandle() returns a String representing the unique identifier (handle) of the current browser window or tab.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens if you try to interact with an element inside a frame without switching to it?',
          options: [
            'The element will be found and interacted with normally',
            'NoSuchElementException will be thrown',
            'The browser will automatically switch to the frame',
            'A warning will be displayed but interaction will work'
          ],
          correctAnswer: 1,
          explanation: 'Without switching to the frame first, Selenium cannot locate elements inside it and will throw NoSuchElementException.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'In nested frames, if you are in the innermost frame and call defaultContent(), where will you be?',
          options: [
            'In the immediate parent frame',
            'In the main page (top-level)',
            'Still in the innermost frame',
            'In the outermost frame but not main page'
          ],
          correctAnswer: 1,
          explanation: 'defaultContent() always switches directly to the main page (top-level content), regardless of how deeply nested the current frame is.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method is used to switch to a newly opened window using its handle?',
          options: [
            'driver.switchToWindow(handle)',
            'driver.window(handle)',
            'driver.switchTo().window(handle)',
            'driver.changeWindow(handle)'
          ],
          correctAnswer: 2,
          explanation: 'driver.switchTo().window(handle) is used to switch control to a different window or tab using its unique window handle.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the data type returned by getWindowHandles()?',
          options: [
            'List<String>',
            'Set<String>',
            'ArrayList<String>',
            'String[]'
          ],
          correctAnswer: 1,
          explanation: 'getWindowHandles() returns a Set<String> because window handles are unique identifiers and a Set ensures no duplicates.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you close only the current window without quitting the driver?',
          options: [
            'driver.quit()',
            'driver.close()',
            'driver.closeWindow()',
            'driver.exit()'
          ],
          correctAnswer: 1,
          explanation: 'driver.close() closes only the current window or tab. driver.quit() closes all windows and terminates the WebDriver session.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is an iframe in HTML?',
          options: [
            'A type of image format',
            'An inline frame used to embed another HTML document',
            'A Java interface for frames',
            'A browser window type'
          ],
          correctAnswer: 1,
          explanation: 'An iframe (inline frame) is an HTML element that embeds another HTML document within the current page. It creates a separate browsing context.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'When handling multiple windows, which approach is recommended to identify a specific window?',
          options: [
            'Using window index only',
            'Using window title or URL',
            'Using window size',
            'Using window position'
          ],
          correctAnswer: 1,
          explanation: 'Using window title (getTitle()) or URL (getCurrentUrl()) is the most reliable way to identify and switch to specific windows, as indices can be unpredictable.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What will happen if you call driver.quit() when multiple windows are open?',
          options: [
            'Only the current window closes',
            'All windows close and WebDriver session terminates',
            'Only the parent window closes',
            'An exception is thrown'
          ],
          correctAnswer: 1,
          explanation: 'driver.quit() closes all browser windows associated with the WebDriver session and terminates the session completely.',
          points: 2,
          difficulty: 'easy'
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
          question: 'You must switch to a frame before you can interact with elements inside it.',
          correctAnswer: true,
          explanation: 'True. Selenium cannot access elements inside a frame unless you explicitly switch to that frame using switchTo().frame().',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'getWindowHandle() and getWindowHandles() return the same type of data.',
          correctAnswer: false,
          explanation: 'False. getWindowHandle() returns a String (single window handle), while getWindowHandles() returns a Set<String> (all window handles).',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'Frame index starts from 1 in Selenium.',
          correctAnswer: false,
          explanation: 'False. Frame index starts from 0 in Selenium, just like array indices in Java.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'driver.switchTo().parentFrame() can be used to switch from a nested frame to its immediate parent.',
          correctAnswer: true,
          explanation: 'True. parentFrame() switches to the immediate parent frame, which is useful in nested frame scenarios.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Once you switch to a child window, you automatically lose focus of the parent window.',
          correctAnswer: true,
          explanation: 'True. When you switch to a child window using switchTo().window(), the driver focus moves to that window and you need to explicitly switch back to interact with the parent.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can switch to a frame using either index, name/id, or WebElement.',
          correctAnswer: true,
          explanation: 'True. Selenium provides three overloaded frame() methods accepting int (index), String (name/id), or WebElement as parameters.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'driver.close() and driver.quit() perform the same action.',
          correctAnswer: false,
          explanation: 'False. close() closes only the current window, while quit() closes all windows and terminates the WebDriver session.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Window handles are permanent and remain the same throughout the session.',
          correctAnswer: false,
          explanation: 'False. Window handles are unique but temporary identifiers generated for each browser window during a session. They change between different test runs.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'An iframe is treated as a separate document within the main HTML document.',
          correctAnswer: true,
          explanation: 'True. An iframe creates a separate browsing context with its own DOM, which is why you need to switch to it to interact with its elements.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can directly access elements in a nested frame without switching to parent frames first.',
          correctAnswer: false,
          explanation: 'False. For nested frames, you must switch to each parent frame in sequence before reaching the innermost frame.',
          points: 3,
          difficulty: 'hard'
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
          mode: ['quick', 'full'],
          question: 'To switch to a frame by its name attribute, use the method driver.switchTo()._____("frameName").',
          correctAnswer: 'frame',
          acceptedAnswers: ['frame', 'Frame'],
          explanation: 'driver.switchTo().frame("frameName") is used to switch to a frame using its name or id attribute.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The method _____ returns the window handle of the current browser window.',
          correctAnswer: 'getWindowHandle()',
          acceptedAnswers: ['getWindowHandle()', 'getWindowHandle', 'driver.getWindowHandle()'],
          explanation: 'getWindowHandle() returns a String representing the unique identifier of the current window.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To switch back to the main page from any frame, use driver.switchTo()._____().',
          correctAnswer: 'defaultContent()',
          acceptedAnswers: ['defaultContent()', 'defaultContent', 'default_content()'],
          explanation: 'defaultContent() switches the driver focus back to the main page (top-level content) from any frame.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The data type returned by getWindowHandles() is _____.',
          correctAnswer: 'Set<String>',
          acceptedAnswers: ['Set<String>', 'Set', 'Set of String', 'Set<string>'],
          explanation: 'getWindowHandles() returns a Set<String> containing all window handles because handles are unique identifiers.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'To switch from a nested frame to its immediate parent frame, use driver.switchTo()._____().',
          correctAnswer: 'parentFrame()',
          acceptedAnswers: ['parentFrame()', 'parentFrame', 'parent()'],
          explanation: 'parentFrame() switches to the immediate parent frame in nested frame scenarios.',
          points: 2,
          difficulty: 'medium'
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
          question: 'What are the three ways to switch to a frame in Selenium WebDriver?',
          sampleAnswer: 'The three ways to switch to a frame are: 1) Using frame index - driver.switchTo().frame(0), 2) Using frame name or id - driver.switchTo().frame("frameName"), and 3) Using WebElement - driver.switchTo().frame(frameElement). The WebElement approach is most reliable when frames lack name or id attributes.',
          keywords: ['index', 'name', 'id', 'WebElement', 'switchTo', 'frame', 'three'],
          minKeywords: 4,
          explanation: 'Selenium provides three methods to switch frames: by index (int), by name/id (String), or by WebElement reference.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Explain the difference between driver.close() and driver.quit().',
          sampleAnswer: 'driver.close() closes only the current browser window or tab that the driver is focused on, while driver.quit() closes all browser windows associated with the WebDriver session and terminates the entire session. After quit(), you cannot use the driver instance anymore without reinitializing it.',
          keywords: ['close', 'quit', 'current window', 'all windows', 'session', 'terminate', 'difference'],
          minKeywords: 4,
          explanation: 'close() closes one window, quit() closes all windows and ends the session completely.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How do you handle multiple windows in Selenium? Describe the process with key methods.',
          sampleAnswer: 'To handle multiple windows: 1) Store the parent window handle using getWindowHandle(), 2) Perform action that opens new window, 3) Get all window handles using getWindowHandles(), 4) Iterate through handles and switch to new window using switchTo().window(handle), 5) Identify the correct window using getTitle() or getCurrentUrl(), 6) Perform actions on new window, 7) Close new window if needed, 8) Switch back to parent window using the stored handle.',
          keywords: ['getWindowHandle', 'getWindowHandles', 'switchTo', 'window', 'handle', 'parent', 'iterate', 'title'],
          minKeywords: 5,
          explanation: 'Multiple window handling involves storing handles, getting all handles, iterating to find the target window, switching, and managing focus.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the difference between defaultContent() and parentFrame() in nested frame scenarios?',
          sampleAnswer: 'In nested frames, defaultContent() switches directly to the top-level main page, bypassing all frames regardless of nesting depth. In contrast, parentFrame() switches to the immediate parent frame, moving up one level in the frame hierarchy. For example, if you are in Frame C (inside Frame B, inside Frame A), defaultContent() takes you to the main page, while parentFrame() takes you to Frame B.',
          keywords: ['defaultContent', 'parentFrame', 'main page', 'parent', 'nested', 'hierarchy', 'immediate', 'top-level'],
          minKeywords: 5,
          explanation: 'defaultContent() goes to main page directly, parentFrame() goes up one level in frame hierarchy.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Why is using WebElement the most reliable method to switch to a frame?',
          sampleAnswer: 'Using WebElement is most reliable because it does not depend on frame attributes like name or id which may be missing or change. It also avoids issues with frame index which can be affected by dynamic page changes. With WebElement, you can use any locator strategy (xpath, css, etc.) to uniquely identify the frame, and you can add explicit waits to ensure the frame is available before switching.',
          keywords: ['WebElement', 'reliable', 'attribute', 'name', 'id', 'index', 'locator', 'wait', 'dynamic'],
          minKeywords: 4,
          explanation: 'WebElement approach is most reliable as it does not depend on frame attributes or indices, and supports locator strategies with waits.',
          points: 4,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
