export default {
  title: "Day 3: WebDriver Commands & Browser Interactions Assessment",
  description: "Test your understanding of navigation commands, window management, screenshots, JavaScript executor, and cookies",
  passingScore: 70,
  timeLimit: 22, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 23,
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
          question: 'What is the difference between driver.get() and driver.navigate().to()?',
          options: [
            'No difference, they work exactly the same',
            'navigate().to() maintains browser history, get() does not',
            'get() is faster than navigate().to()',
            'get() waits for page load, navigate().to() allows navigation methods'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'driver.get() waits for the page to load completely. driver.navigate().to() also loads pages but provides access to navigation methods like back(), forward(), and refresh().'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which method is used to navigate back to the previous page?',
          options: [
            'driver.back()',
            'driver.navigate().back()',
            'driver.goBack()',
            'driver.previous()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.navigate().back() simulates clicking the browser back button to navigate to the previous page in history.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What does driver.navigate().refresh() do?',
          options: [
            'Opens a new browser window',
            'Clears browser cache',
            'Reloads the current page',
            'Closes the current page'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.navigate().refresh() reloads/refreshes the current page, similar to pressing F5 or clicking the refresh button.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the key difference between driver.close() and driver.quit()?',
          options: [
            'close() closes current window, quit() closes all windows and ends session',
            'close() is faster than quit()',
            'quit() only works in Chrome',
            'They are identical in functionality'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.close() closes only the current browser window, while driver.quit() closes all windows opened by WebDriver and terminates the entire session.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which method returns the current page URL?',
          options: [
            'driver.getUrl()',
            'driver.getCurrentUrl()',
            'driver.url()',
            'driver.getPageUrl()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.getCurrentUrl() returns the URL of the current page as a String.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How do you maximize the browser window in Selenium?',
          options: [
            'driver.maximize()',
            'driver.window().maximize()',
            'driver.manage().window().maximize()',
            'driver.setSize("maximize")'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'driver.manage().window().maximize() maximizes the browser window to fill the screen.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which class is used to take screenshots in Selenium?',
          options: [
            'Screenshot',
            'TakesScreenshot',
            'CaptureScreen',
            'ScreenCapture'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'TakesScreenshot is the interface used to capture screenshots. The WebDriver object is cast to TakesScreenshot to use this functionality.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What is the purpose of JavascriptExecutor in Selenium?',
          options: [
            'To write JavaScript code',
            'To execute JavaScript code in the browser',
            'To debug JavaScript errors',
            'To validate JavaScript syntax'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'JavascriptExecutor allows you to execute JavaScript code directly in the browser, useful for scrolling, clicking hidden elements, or getting element properties.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'How do you scroll to the bottom of a page using JavaScript executor?',
          options: [
            'js.scroll("bottom")',
            'js.executeScript("window.scrollTo(0, 0)")',
            'js.executeScript("window.scrollTo(0, document.body.scrollHeight)")',
            'js.scrollDown()'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'hard',
          explanation: 'executeScript("window.scrollTo(0, document.body.scrollHeight)") scrolls to the bottom by setting the scroll position to the document height.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'Which method is used to get all cookies from the browser?',
          options: [
            'driver.getCookies()',
            'driver.manage().getCookies()',
            'driver.manage().getCookie()',
            'driver.manage().getCookies().getAll()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'driver.manage().getCookies() returns a Set of all cookies for the current domain.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'How do you delete all cookies in Selenium?',
          options: [
            'driver.deleteCookies()',
            'driver.manage().deleteAllCookies()',
            'driver.cookies().clear()',
            'driver.manage().clearCookies()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.manage().deleteAllCookies() deletes all cookies for the current domain.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'What does driver.getWindowHandle() return?',
          options: [
            'The title of the current window',
            'A unique identifier for the current window',
            'The URL of the current window',
            'The size of the current window'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'driver.getWindowHandle() returns a unique String identifier (handle) for the current browser window, used for switching between windows.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'Which method returns handles for all open browser windows?',
          options: [
            'driver.getAllWindows()',
            'driver.getWindowHandles()',
            'driver.getWindows()',
            'driver.getAllWindowHandles()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.getWindowHandles() returns a Set<String> containing handles for all windows currently opened by the WebDriver.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q14',
          type: 'true-false',
          question: 'driver.navigate().back() and driver.navigate().forward() maintain browser history.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. The navigate() methods work with browser history, allowing you to move backward and forward through visited pages.'
        },
        {
          id: 'q15',
          type: 'true-false',
          question: 'driver.quit() should always be called even if driver.close() is used.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. driver.quit() terminates the WebDriver session and frees resources. If you only use close() without quit(), the session may remain active.'
        },
        {
          id: 'q16',
          type: 'true-false',
          question: 'Screenshots can only capture the visible portion of a webpage.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. While the default screenshot captures the visible viewport, you can capture full page screenshots using specific techniques or by scrolling and stitching.'
        },
        {
          id: 'q17',
          type: 'true-false',
          question: 'JavascriptExecutor can interact with hidden elements that Selenium cannot click.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. JavaScript executor can click or interact with elements that are not visible or disabled, bypassing some Selenium restrictions.'
        },
        {
          id: 'q18',
          type: 'true-false',
          question: 'Cookies are shared across all browser windows opened by the same WebDriver session.',
          correctAnswer: true,
          points: 2,
          difficulty: 'hard',
          explanation: 'True. Cookies are stored at the browser session level, so all windows in the same session share the same cookies for a given domain.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q19',
          type: 'fill-blank',
          question: 'To take a screenshot, cast the driver to ________ interface.',
          correctAnswer: 'TakesScreenshot',
          points: 2,
          difficulty: 'medium',
          explanation: 'You must cast the WebDriver to TakesScreenshot interface: (TakesScreenshot)driver to access screenshot functionality.'
        },
        {
          id: 'q20',
          type: 'fill-blank',
          question: 'The method driver.manage().window().______() sets a custom window size.',
          correctAnswer: 'setSize',
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.manage().window().setSize(new Dimension(width, height)) sets a custom browser window size.'
        },
        {
          id: 'q21',
          type: 'fill-blank',
          question: 'To execute JavaScript, cast driver to ________ interface.',
          correctAnswer: 'JavascriptExecutor',
          points: 2,
          difficulty: 'easy',
          explanation: 'Cast the driver to JavascriptExecutor: (JavascriptExecutor)driver to execute JavaScript code.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q22',
          type: 'short',
          question: 'Explain the complete process of taking a screenshot and saving it to a file in Selenium.',
          sampleAnswer: 'Steps to take screenshot: 1) Cast WebDriver to TakesScreenshot: TakesScreenshot ts = (TakesScreenshot)driver; 2) Capture screenshot as File: File source = ts.getScreenshotAs(OutputType.FILE); 3) Define destination path: File destination = new File("path/screenshot.png"); 4) Copy file to destination: FileUtils.copyFile(source, destination); or Files.copy(source.toPath(), destination.toPath()). The screenshot captures the current viewport. Always handle IOException when copying files.',
          points: 4,
          difficulty: 'medium',
          keywords: ['TakesScreenshot', 'cast', 'getScreenshotAs', 'OutputType.FILE', 'copyFile', 'destination', 'IOException']
        },
        {
          id: 'q23',
          type: 'short',
          question: 'Describe three common use cases for JavascriptExecutor in Selenium automation.',
          sampleAnswer: 'Three JavascriptExecutor use cases: 1) Scrolling - executeScript("window.scrollTo(0, document.body.scrollHeight)") to scroll page, useful when elements need to be in viewport. 2) Clicking hidden/disabled elements - executeScript("arguments[0].click()", element) clicks elements that Selenium cannot click normally due to visibility/enabled state. 3) Getting element properties - executeScript("return arguments[0].innerHTML", element) retrieves properties not accessible via WebElement methods. Other uses include: highlighting elements, modifying attributes, removing readonly attributes from input fields.',
          points: 4,
          difficulty: 'hard',
          keywords: ['JavascriptExecutor', 'scroll', 'click', 'hidden', 'executeScript', 'arguments[0]', 'properties', 'innerHTML']
        }
      ]
    }
  ],
  week: 1,
  day: 3,
  topic: "WebDriver Commands & Browser Interactions"
};
