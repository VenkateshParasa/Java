export default {
  title: "Day 28: JavaScript Executor - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key JavaScript Executor concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all JavaScript Executor topics"
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
          question: 'What is JavascriptExecutor in Selenium?',
          options: [
            'A JavaScript framework',
            'An interface to execute JavaScript code in the browser',
            'A browser plugin',
            'A JavaScript testing tool'
          ],
          correctAnswer: 1,
          explanation: 'JavascriptExecutor is an interface in Selenium that allows execution of JavaScript code directly in the browser context during test automation.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to execute JavaScript code in JavascriptExecutor?',
          options: [
            'runScript()',
            'executeScript()',
            'runJavaScript()',
            'performScript()'
          ],
          correctAnswer: 1,
          explanation: 'executeScript() is the primary method in JavascriptExecutor interface to execute JavaScript code in the browser.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you cast a WebDriver instance to JavascriptExecutor?',
          options: [
            'JavascriptExecutor js = (JavascriptExecutor) driver;',
            'JavascriptExecutor js = new JavascriptExecutor(driver);',
            'JavascriptExecutor js = driver.getJsExecutor();',
            'JavascriptExecutor js = WebDriver.toJsExecutor(driver);'
          ],
          correctAnswer: 0,
          explanation: 'You cast the WebDriver instance to JavascriptExecutor using explicit type casting: (JavascriptExecutor) driver.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of executeAsyncScript() method?',
          options: [
            'To execute scripts faster',
            'To execute scripts that require waiting for callbacks or asynchronous operations',
            'To execute multiple scripts simultaneously',
            'To execute scripts in background'
          ],
          correctAnswer: 1,
          explanation: 'executeAsyncScript() is used for JavaScript code that involves asynchronous operations like AJAX calls, where you need to wait for callbacks to complete.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which JavaScript code scrolls to the bottom of the page?',
          options: [
            'window.scrollTo(0, 0);',
            'window.scrollTo(0, document.body.scrollHeight);',
            'window.scrollToTop();',
            'document.scrollToEnd();'
          ],
          correctAnswer: 1,
          explanation: 'window.scrollTo(0, document.body.scrollHeight) scrolls to the bottom of the page by setting the vertical position to the total scroll height.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you pass a WebElement as an argument to executeScript()?',
          options: [
            'executeScript("script", element.toString())',
            'executeScript("script", "element")',
            'executeScript("script", element)',
            'executeScript("script", element.getId())'
          ],
          correctAnswer: 2,
          explanation: 'WebElement objects can be passed directly as arguments to executeScript(). Selenium automatically converts them to DOM elements in the JavaScript context.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the following code do?\njs.executeScript("arguments[0].click();", element);',
          options: [
            'Returns the element',
            'Clicks on the element using JavaScript',
            'Highlights the element',
            'Scrolls to the element'
          ],
          correctAnswer: 1,
          explanation: 'This code clicks on the element using JavaScript. arguments[0] refers to the first argument passed (element), and .click() triggers a click event.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'When should you use JavascriptExecutor instead of regular Selenium methods?',
          options: [
            'Always, as it is faster',
            'Never, Selenium methods are sufficient',
            'When elements are hidden, disabled, or regular methods fail',
            'Only for scrolling operations'
          ],
          correctAnswer: 2,
          explanation: 'JavascriptExecutor should be used when regular Selenium methods fail, such as with hidden elements, disabled buttons, or when you need direct DOM manipulation.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method returns a value from JavaScript execution?',
          options: [
            'Only executeAsyncScript()',
            'Only executeScript()',
            'Both executeScript() and executeAsyncScript()',
            'Neither method returns values'
          ],
          correctAnswer: 2,
          explanation: 'Both executeScript() and executeAsyncScript() can return values. The return type is Object, which you can cast to the appropriate type.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you scroll an element into view using JavascriptExecutor?',
          options: [
            'js.executeScript("arguments[0].scrollIntoView();", element);',
            'js.executeScript("arguments[0].scroll();", element);',
            'js.executeScript("scrollTo(element);");',
            'js.executeScript("element.view();", element);'
          ],
          correctAnswer: 0,
          explanation: 'arguments[0].scrollIntoView() is the correct JavaScript method to scroll an element into the visible area of the browser window.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the return type of executeScript() method?',
          options: [
            'String',
            'void',
            'Object',
            'WebElement'
          ],
          correctAnswer: 2,
          explanation: 'executeScript() returns Object, which can be cast to specific types like String, Long, Boolean, WebElement, or List depending on what the JavaScript returns.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you get the page title using JavascriptExecutor?',
          options: [
            'js.executeScript("return document.title;");',
            'js.executeScript("document.getTitle();");',
            'js.executeScript("window.title;");',
            'js.executeScript("page.title();");'
          ],
          correctAnswer: 0,
          explanation: 'document.title is the JavaScript property that contains the page title. Use "return" to get the value back to Selenium.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which JavaScript code changes the background color of an element?',
          options: [
            'arguments[0].color = "red";',
            'arguments[0].style.backgroundColor = "red";',
            'arguments[0].setColor("red");',
            'arguments[0].background = "red";'
          ],
          correctAnswer: 1,
          explanation: 'arguments[0].style.backgroundColor is the correct way to change the background color of an element using JavaScript.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the following code return?\njs.executeScript("return document.readyState;");',
          options: [
            'The page URL',
            'The loading state of the page',
            'The page source',
            'The page size'
          ],
          correctAnswer: 1,
          explanation: 'document.readyState returns the loading state of the page, which can be "loading", "interactive", or "complete".',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'How can you enter text into a disabled input field using JavascriptExecutor?',
          options: [
            'js.executeScript("arguments[0].sendKeys(\\'text\\');", element);',
            'js.executeScript("arguments[0].value=\\'text\\';", element);',
            'js.executeScript("arguments[0].setText(\\'text\\');", element);',
            'js.executeScript("arguments[0].input=\\'text\\';", element);'
          ],
          correctAnswer: 1,
          explanation: 'Setting arguments[0].value="text" directly changes the value property of the input field, bypassing disabled state.',
          points: 3,
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
          question: 'JavascriptExecutor can interact with hidden elements that are not visible on the page.',
          correctAnswer: true,
          explanation: 'True. JavascriptExecutor can interact with hidden elements by directly manipulating the DOM, bypassing visibility checks.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'executeScript() method is synchronous by default.',
          correctAnswer: true,
          explanation: 'True. executeScript() is synchronous and waits for the script to complete before returning control to the next statement.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'You can pass multiple arguments to executeScript() method.',
          correctAnswer: true,
          explanation: 'True. executeScript() accepts variable arguments. Pass multiple arguments after the script string, and access them as arguments[0], arguments[1], etc.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'JavascriptExecutor is a class in Selenium.',
          correctAnswer: false,
          explanation: 'False. JavascriptExecutor is an interface, not a class. WebDriver implementations provide the actual implementation.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'JavaScript executed via JavascriptExecutor runs in the context of the current page.',
          correctAnswer: true,
          explanation: 'True. The JavaScript code runs in the same context as the current page, with access to all DOM elements and JavaScript variables.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'executeScript() can only execute one line of JavaScript code at a time.',
          correctAnswer: false,
          explanation: 'False. You can execute multi-line JavaScript code by passing a complete script block to executeScript().',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'JavascriptExecutor clicks are faster than WebElement clicks.',
          correctAnswer: false,
          explanation: 'False. JavascriptExecutor clicks are not necessarily faster. They are used as an alternative when regular clicks fail, not for performance.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can retrieve WebElement objects from JavaScript execution.',
          correctAnswer: true,
          explanation: 'True. JavaScript can return DOM elements, which Selenium automatically converts to WebElement objects.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'JavascriptExecutor can execute jQuery code if jQuery is loaded on the page.',
          correctAnswer: true,
          explanation: 'True. If the page has jQuery loaded, you can execute jQuery code using JavascriptExecutor.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'JavascriptExecutor should be the first choice for all interactions.',
          correctAnswer: false,
          explanation: 'False. Regular Selenium methods should be preferred. Use JavascriptExecutor only when needed, as it bypasses some browser events and validations.',
          points: 2,
          difficulty: 'easy'
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
          question: 'To use JavascriptExecutor, you must cast WebDriver to _____ interface.',
          correctAnswer: 'JavascriptExecutor',
          acceptedAnswers: ['JavascriptExecutor', 'javascriptexecutor'],
          explanation: 'You must cast the WebDriver instance to JavascriptExecutor interface: (JavascriptExecutor) driver.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The method _____ is used to execute JavaScript code and return a value.',
          correctAnswer: 'executeScript()',
          acceptedAnswers: ['executeScript()', 'executeScript', 'executescript'],
          explanation: 'executeScript() is the primary method to execute JavaScript code in JavascriptExecutor.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'In JavaScript executor, arguments are accessed using the _____ array.',
          correctAnswer: 'arguments',
          acceptedAnswers: ['arguments', 'Arguments'],
          explanation: 'The arguments array in JavaScript contains all parameters passed to executeScript() after the script string.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The JavaScript method _____ scrolls an element into the visible area of the browser window.',
          correctAnswer: 'scrollIntoView()',
          acceptedAnswers: ['scrollIntoView()', 'scrollIntoView', 'scrollintoview'],
          explanation: 'scrollIntoView() is the JavaScript method that scrolls an element into the visible area of the browser window.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The JavaScript property _____ returns the current URL of the page.',
          correctAnswer: 'window.location.href',
          acceptedAnswers: ['window.location.href', 'location.href', 'document.URL', 'document.url'],
          explanation: 'window.location.href or document.URL returns the current URL of the page in JavaScript.',
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
          question: 'Explain three scenarios where JavascriptExecutor is preferred over regular Selenium methods.',
          sampleAnswer: 'JavascriptExecutor is preferred in these scenarios: 1) Clicking hidden or disabled elements that regular click() cannot interact with, 2) Scrolling to specific positions or elements when scrollIntoView is needed, 3) Handling elements with complex JavaScript events or when regular methods fail due to timing or overlay issues. It provides direct DOM manipulation capabilities.',
          keywords: ['hidden', 'disabled', 'scroll', 'click', 'DOM', 'fail', 'events', 'overlay'],
          minKeywords: 3,
          explanation: 'JavascriptExecutor is useful for interacting with hidden elements, scrolling operations, and when regular Selenium methods fail.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write the code to scroll to the bottom of a page using JavascriptExecutor.',
          sampleAnswer: 'JavascriptExecutor js = (JavascriptExecutor) driver;\njs.executeScript("window.scrollTo(0, document.body.scrollHeight);");\nThis code casts the driver to JavascriptExecutor and executes JavaScript to scroll the window to the bottom by setting the vertical scroll position to the total scroll height.',
          keywords: ['JavascriptExecutor', 'executeScript', 'window.scrollTo', 'scrollHeight', 'cast', 'driver'],
          minKeywords: 4,
          explanation: 'Cast driver to JavascriptExecutor and use window.scrollTo(0, document.body.scrollHeight) to scroll to the bottom.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the difference between executeScript() and executeAsyncScript()?',
          sampleAnswer: 'executeScript() is synchronous and executes JavaScript immediately, waiting for completion before returning. executeAsyncScript() is for asynchronous operations like AJAX calls, timers, or callbacks. It requires a callback function and waits until the callback is invoked. executeAsyncScript() is useful when dealing with async operations that take time to complete.',
          keywords: ['synchronous', 'asynchronous', 'AJAX', 'callback', 'wait', 'timing', 'complete'],
          minKeywords: 3,
          explanation: 'executeScript() is synchronous while executeAsyncScript() handles asynchronous operations with callbacks.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How do you highlight an element using JavascriptExecutor? Explain the approach.',
          sampleAnswer: 'To highlight an element, use JavascriptExecutor to change the element\'s border or background color: js.executeScript("arguments[0].style.border=\'3px solid red\'", element); or js.executeScript("arguments[0].style.backgroundColor=\'yellow\'", element); This directly modifies the element\'s CSS style properties via DOM manipulation, making it visually stand out during test execution.',
          keywords: ['style', 'border', 'backgroundColor', 'arguments', 'executeScript', 'CSS', 'color', 'highlight'],
          minKeywords: 3,
          explanation: 'Use executeScript() to modify the element\'s style.border or style.backgroundColor property for highlighting.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Why should JavascriptExecutor be used as a last resort rather than the primary interaction method?',
          sampleAnswer: 'JavascriptExecutor should be a last resort because: 1) It bypasses browser events (like mouse hover, focus) that regular interactions trigger, 2) It doesn\'t simulate real user behavior, which may miss bugs, 3) It can interact with elements that users cannot, making tests less realistic, 4) Regular Selenium methods include better error handling and wait mechanisms. Use it only when standard methods fail.',
          keywords: ['bypass', 'events', 'user behavior', 'realistic', 'last resort', 'standard methods', 'error handling'],
          minKeywords: 3,
          explanation: 'JavascriptExecutor bypasses normal browser events and user interactions, making tests less realistic and potentially missing bugs.',
          points: 4,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
