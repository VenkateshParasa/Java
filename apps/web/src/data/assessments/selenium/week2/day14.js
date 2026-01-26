export default {
  title: "Day 14: Week 2 Review Assessment",
  description: "Comprehensive review of Week 2 topics including Actions class, drag and drop, tables, file operations, JavaScript executor, and advanced scenarios",
  passingScore: 70,
  timeLimit: 25, // minutes
  modes: {
    quick: {
      questionCount: 12,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 30,
      timeLimit: 25,
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
          question: 'Which method is required to execute built Actions?',
          options: [
            'execute()',
            'perform()',
            'run()',
            'apply()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The perform() method is required to execute all actions built using the Actions class.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is the correct sequence for manual drag and drop?',
          options: [
            'click() -> move() -> release()',
            'clickAndHold() -> moveToElement() -> release()',
            'hold() -> drag() -> drop()',
            'press() -> moveToElement() -> drop()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Manual drag and drop uses clickAndHold() on source, moveToElement() to target, and release() to complete.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'How do you find a cell in row 3, column 2 of a table?',
          options: [
            '//table/tr[3]/td[2]',
            '//table/tr[2]/td[3]',
            '//table//tr[3]//td[2]',
            'Both A and C'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Both //table/tr[3]/td[2] and //table//tr[3]//td[2] work, with XPath using 1-based indexing.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What is the simplest method to upload a file?',
          options: [
            'Robot class',
            'sendKeys() with file path',
            'AutoIT',
            'JavaScript executor'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Using sendKeys() with absolute file path on <input type="file"> is the simplest and most reliable method.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'How do you scroll to bottom of page using JavaScript?',
          options: [
            'js.executeScript("window.scrollTo(0, 0)");',
            'js.executeScript("window.scrollTo(0, document.body.scrollHeight)");',
            'js.executeScript("scroll.bottom()");',
            'js.executeScript("window.scrollToBottom()");'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'window.scrollTo(0, document.body.scrollHeight) scrolls to the bottom by using the total document height.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How do you access Shadow DOM elements?',
          options: [
            'Regular findElement()',
            'JavascriptExecutor with shadowRoot',
            'XPath',
            'CSS Selector'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Shadow DOM requires JavascriptExecutor to access shadowRoot property or use Selenium 4 getShadowRoot() method.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'Which Action class method performs a right-click?',
          options: [
            'rightClick()',
            'contextClick()',
            'secondaryClick()',
            'menuClick()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'The contextClick() method performs a right-click operation to open context menus.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What does dragAndDropBy() method do?',
          options: [
            'Drags between two elements',
            'Drags element by pixel offset',
            'Validates drag operation',
            'Drags multiple elements'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'dragAndDropBy() drags an element from its current position by specified x and y pixel offsets.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'How do you get row count in a table?',
          options: [
            'table.getRowCount()',
            'driver.findElements(By.xpath("//table//tr")).size()',
            'table.rows.length',
            'table.countRows()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Find all rows using findElements() and call size() on the returned list to get the count.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'How do you set download location in Chrome?',
          options: [
            'Cannot be set',
            'Set ChromeOptions with download.default_directory',
            'Use File chooser dialog',
            'Set in browser settings manually'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Set ChromeOptions preference "download.default_directory" to specify the download location programmatically.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'What does arguments[0] represent in executeScript()?',
          options: [
            'First line of JavaScript',
            'First parameter passed to script',
            'WebDriver instance',
            'Return value'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'arguments[0] represents the first parameter (typically a WebElement) passed after the JavaScript string.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'How do you switch back to main page from iframe?',
          options: [
            'driver.switchTo().parent()',
            'driver.switchTo().defaultContent()',
            'driver.exitFrame()',
            'driver.mainPage()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.switchTo().defaultContent() switches back to the main page from any iframe level.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'When should you use JavascriptExecutor over regular Selenium?',
          options: [
            'When elements are hidden',
            'When regular methods fail',
            'For direct DOM manipulation',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Use JavascriptExecutor when dealing with hidden elements, when regular methods fail, for DOM manipulation, or for performance.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'How do you perform keyboard shortcut Ctrl+C?',
          options: [
            'actions.sendKeys(Keys.CONTROL + "c").perform();',
            'actions.keyDown(Keys.CONTROL).sendKeys("c").keyUp(Keys.CONTROL).perform();',
            'actions.shortcut(Keys.CONTROL, "c").perform();',
            'actions.pressKeys("CTRL+C").perform();'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Use keyDown() for modifier, sendKeys() for key, and keyUp() to release: keyDown(CONTROL).sendKeys("c").keyUp(CONTROL).perform();'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'Why might HTML5 drag and drop fail with Actions class?',
          options: [
            'Different event model',
            'Browser incompatibility',
            'Selenium bug',
            'Incorrect syntax'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'hard',
          explanation: 'HTML5 drag and drop uses different events (dragstart, dragover, drop) that Actions class may not trigger correctly.'
        },
        {
          id: 'q16',
          type: 'mcq',
          question: 'What is the best practice for handling CAPTCHA?',
          options: [
            'Solve it with OCR',
            'Use third-party services',
            'Disable in test environment',
            'Manual intervention'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Best practice is to disable CAPTCHA in test environments or whitelist test IPs rather than attempting to solve it.'
        },
        {
          id: 'q17',
          type: 'mcq',
          question: 'Which method moves mouse by pixel offset?',
          options: [
            'moveByOffset(x, y)',
            'moveMouse(x, y)',
            'mouseMove(x, y)',
            'offsetMove(x, y)'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'moveByOffset(xOffset, yOffset) moves the mouse from its current position by the specified pixel offset.'
        },
        {
          id: 'q18',
          type: 'mcq',
          question: 'How do you handle dynamic tables?',
          options: [
            'Use explicit waits',
            'Use dynamic XPath',
            'Loop through rows after load',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Dynamic tables require explicit waits for elements, dynamic locators, and iterating through rows after ensuring content is loaded.'
        },
        {
          id: 'q19',
          type: 'mcq',
          question: 'What causes StaleElementReferenceException?',
          options: [
            'Element not found',
            'Element no longer in DOM',
            'Timeout',
            'Element hidden'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'StaleElementReferenceException occurs when an element reference is no longer valid because DOM was updated/refreshed.'
        },
        {
          id: 'q20',
          type: 'mcq',
          question: 'How do you verify file download?',
          options: [
            'Check file exists',
            'Verify file size',
            'Check timestamp',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Verify downloads by checking file existence (exists()), size (length()), timestamp, and optionally content validation.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q21',
          type: 'true-false',
          question: 'Actions class can perform both mouse and keyboard operations.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Actions class handles both mouse operations (hover, click, drag) and keyboard operations (keyDown, keyUp, sendKeys).'
        },
        {
          id: 'q22',
          type: 'true-false',
          question: 'XPath indexing starts from 0.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. XPath uses 1-based indexing, meaning the first element is at position [1], not [0].'
        },
        {
          id: 'q23',
          type: 'true-false',
          question: 'Robot class works in headless browser mode.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. Robot class requires GUI and window focus, making it incompatible with headless browser execution.'
        },
        {
          id: 'q24',
          type: 'true-false',
          question: 'JavascriptExecutor can interact with hidden elements.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. JavaScript can directly manipulate DOM, allowing interaction with hidden elements that Selenium cannot normally access.'
        },
        {
          id: 'q25',
          type: 'true-false',
          question: 'You must switch to iframe before accessing its elements.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Selenium requires switching context to iframe using switchTo().frame() before interacting with elements inside it.'
        },
        {
          id: 'q26',
          type: 'true-false',
          question: 'Modal dialogs require switchTo().alert() to handle.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. Modal dialogs are HTML elements handled like regular page elements. Only JavaScript alerts use switchTo().alert().'
        },
        {
          id: 'q27',
          type: 'true-false',
          question: 'sendKeys() works with all file upload implementations.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. sendKeys() works with <input type="file"> but fails when native OS dialogs open or custom upload widgets are used.'
        },
        {
          id: 'q28',
          type: 'true-false',
          question: 'Selenium 4 has built-in Shadow DOM support.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. Selenium 4 introduced the getShadowRoot() method for better Shadow DOM support without JavaScript.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q29',
          type: 'fill-blank',
          question: 'The ________ method is used to hover over an element.',
          correctAnswer: 'moveToElement',
          points: 2,
          difficulty: 'easy',
          explanation: 'The moveToElement() method moves the mouse pointer to an element, creating a hover effect.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q30',
          type: 'short',
          question: 'Compare and contrast three different approaches to file upload in Selenium, including their advantages and limitations.',
          sampleAnswer: 'Three file upload approaches: 1) sendKeys() method - Simplest approach: driver.findElement(By.id("fileInput")).sendKeys("/absolute/path/file.txt"); Advantages: Simple, reliable, works cross-platform, no external dependencies. Limitations: Only works with <input type="file">, fails if OS dialog opens, requires absolute path. Best for: Standard file inputs. 2) Robot class - Programmatic keyboard/mouse control: Robot robot = new Robot(); Upload involves clicking button, waiting for dialog, typing path with robot.keyPress(), pressing Enter. Advantages: Handles OS dialogs, works when sendKeys fails. Limitations: Platform-dependent, requires focus, cannot run headless, slow, fragile with timing, not thread-safe for parallel execution. Best for: Native dialogs when sendKeys fails. 3) AutoIT - Windows automation tool: Create .exe script with AutoIT, execute from Java using Runtime.exec(). Advantages: Handles complex Windows dialogs, more reliable than Robot for Windows. Limitations: Windows-only, external dependency, separate script files to maintain, adds complexity. Best for: Windows-specific complex dialogs. Recommendation: Use sendKeys() as primary method (90% cases), Robot/AutoIT only when necessary. For test environments, consider API-based file upload or mocking file selection to avoid dialog issues.',
          points: 4,
          difficulty: 'hard',
          keywords: ['sendKeys', 'Robot', 'AutoIT', 'file upload', 'input type file', 'advantages', 'limitations', 'OS dialog', 'headless', 'platform']
        }
      ]
    }
  ]
};
