export default {
  title: "Day 13: Advanced Scenarios Assessment",
  description: "Test your understanding of advanced scenarios like modal dialogs, shadow DOM, iframes, and browser notifications",
  passingScore: 70,
  timeLimit: 24, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 26,
      timeLimit: 24,
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
          question: 'What is a modal dialog in web applications?',
          options: [
            'A JavaScript alert',
            'A dialog box that blocks interaction with the rest of the page',
            'A popup window',
            'A browser notification'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A modal dialog is an overlay that blocks interaction with the underlying page content until the dialog is dismissed.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'How do you handle a modal dialog in Selenium?',
          options: [
            'Use driver.switchTo().alert()',
            'Treat it as regular element and interact',
            'Use Robot class',
            'Cannot be handled'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Modal dialogs are HTML/CSS elements, not browser alerts. Handle them by finding and interacting with their elements like regular page elements.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is Shadow DOM?',
          options: [
            'A security feature',
            'An encapsulated DOM tree attached to an element',
            'A hidden iframe',
            'A type of modal dialog'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Shadow DOM is a web standard that provides encapsulation for DOM and CSS, creating a separate DOM tree attached to an element.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Why cannot Selenium directly access Shadow DOM elements?',
          options: [
            'Shadow DOM is encrypted',
            'Shadow DOM elements are in separate, encapsulated scope',
            'Selenium does not support modern features',
            'Shadow DOM is invisible'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Shadow DOM creates an encapsulated scope separate from the main DOM tree, preventing regular Selenium locators from accessing it directly.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'How do you access Shadow DOM in Selenium?',
          options: [
            'Use driver.switchTo().shadowDom()',
            'Use JavascriptExecutor with shadowRoot property',
            'Use special locator By.shadowDom()',
            'Use Selenium 4 built-in method'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'Access Shadow DOM using JavascriptExecutor: js.executeScript("return arguments[0].shadowRoot.querySelector(\'selector\')", shadowHost);'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What is an iframe?',
          options: [
            'A JavaScript frame',
            'An inline frame that embeds another HTML document',
            'A type of dialog',
            'A browser feature'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'An iframe (inline frame) is an HTML element that embeds another HTML document within the current document.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'How do you switch to an iframe in Selenium?',
          options: [
            'driver.switchTo().frame()',
            'driver.enterFrame()',
            'driver.iframe()',
            'Automatic, no switching needed'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Use driver.switchTo().frame() with index, name/id, or WebElement to switch Selenium context to the iframe.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'How do you switch back to the main page from an iframe?',
          options: [
            'driver.switchTo().parent()',
            'driver.switchTo().defaultContent()',
            'driver.exitFrame()',
            'driver.switchTo().mainPage()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Use driver.switchTo().defaultContent() to switch back to the main page from any iframe. Use parentFrame() to go to immediate parent frame.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'What are the three ways to switch to an iframe?',
          options: [
            'Index, name, id',
            'Index, name/id, WebElement',
            'XPath, CSS, ID',
            'Number, string, object'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Three ways to switch to iframe: by index (0,1,2...), by name or id attribute, or by passing the iframe WebElement.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What is a browser notification?',
          options: [
            'A JavaScript alert',
            'A system-level notification from browser',
            'An error message',
            'A modal dialog'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Browser notifications are system-level notifications that appear outside the browser window, typically in the OS notification area.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'How do you handle browser notification prompts in Selenium?',
          options: [
            'Click Allow/Block buttons',
            'Set browser preferences to auto-allow or block',
            'Use switchTo().notification()',
            'Cannot be handled'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Handle notification prompts by setting browser preferences/options before starting the browser to automatically allow or block notifications.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'What is an overlay in web applications?',
          options: [
            'A type of iframe',
            'A semi-transparent layer covering page content',
            'A browser feature',
            'A security warning'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'An overlay is a UI element (usually semi-transparent) that covers part or all of the page, often used for loading screens or modal backgrounds.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'How do you handle an overlay blocking an element?',
          options: [
            'Wait for overlay to disappear',
            'Use JavascriptExecutor to click through',
            'Close the overlay first',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Handle overlays by waiting for them to disappear, clicking close button, or using JavaScript to click through or remove the overlay.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'What is CAPTCHA in web applications?',
          options: [
            'A security test to distinguish humans from bots',
            'A type of dialog',
            'An error message',
            'A form validation'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) is designed to prevent automated access.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'How should you handle CAPTCHA in automation?',
          options: [
            'Use OCR to solve it',
            'Disable CAPTCHA in test environment',
            'Use third-party CAPTCHA solving services',
            'B is the best practice'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Best practice is to disable CAPTCHA in test environments. Solving CAPTCHA defeats its purpose and is unreliable. Some use whitelist IPs or test accounts.'
        },
        {
          id: 'q16',
          type: 'mcq',
          question: 'How do you handle SSL certificate errors in Chrome?',
          options: [
            'Click through manually',
            'Set ChromeOptions to accept insecure certificates',
            'Use Robot class',
            'Cannot be handled'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Set ChromeOptions capability: options.setAcceptInsecureCerts(true) or options.addArguments("--ignore-certificate-errors") to handle SSL errors.'
        },
        {
          id: 'q17',
          type: 'mcq',
          question: 'What is a StaleElementReferenceException?',
          options: [
            'Element not found',
            'Element reference is no longer valid in DOM',
            'Element is hidden',
            'Timeout exception'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'StaleElementReferenceException occurs when an element was found but is no longer attached to the DOM (page refresh, dynamic update, etc.).'
        },
        {
          id: 'q18',
          type: 'mcq',
          question: 'How do you prevent StaleElementReferenceException?',
          options: [
            'Find element again when needed',
            'Use explicit waits',
            'Store element reference properly',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Prevent stale element exceptions by re-finding elements before use, using explicit waits, and being aware of DOM changes that invalidate references.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q19',
          type: 'true-false',
          question: 'Modal dialogs require driver.switchTo().alert() to handle.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. Modal dialogs are HTML elements handled like regular elements. Only JavaScript alerts need switchTo().alert().'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'Shadow DOM provides encapsulation and isolation for components.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Shadow DOM provides encapsulation, isolating component DOM and CSS from the main document.'
        },
        {
          id: 'q21',
          type: 'true-false',
          question: 'You must switch to an iframe before interacting with elements inside it.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Selenium cannot interact with iframe content without first switching context using switchTo().frame().'
        },
        {
          id: 'q22',
          type: 'true-false',
          question: 'Selenium 4 has built-in support for Shadow DOM.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. Selenium 4 introduced getShadowRoot() method for better Shadow DOM support without requiring JavaScript execution.'
        },
        {
          id: 'q23',
          type: 'true-false',
          question: 'Browser notifications can be clicked and dismissed using Selenium.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. Browser notifications are OS-level and outside browser control. Selenium cannot interact with them. Handle via browser preferences.'
        },
        {
          id: 'q24',
          type: 'true-false',
          question: 'StaleElementReferenceException can be avoided by storing elements in variables.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. Storing in variables does not prevent staleness. If the DOM updates, stored references become stale. Re-find elements after DOM changes.'
        },
        {
          id: 'q25',
          type: 'true-false',
          question: 'CAPTCHA should be solved programmatically in automation tests.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. CAPTCHA exists to prevent automation. Best practice is to disable CAPTCHA in test environments or use test accounts with CAPTCHA bypass.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q26',
          type: 'fill-blank',
          question: 'To switch back to main page from an iframe, use driver.switchTo().________.',
          correctAnswer: 'defaultContent',
          points: 2,
          difficulty: 'easy',
          explanation: 'The defaultContent() method switches the context back to the main page from any iframe level.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q27',
          type: 'short',
          question: 'Explain how to handle nested iframes and Shadow DOM within iframes.',
          sampleAnswer: 'Handling nested iframes and Shadow DOM: 1) Nested iframes approach - Switch through iframe hierarchy: driver.switchTo().frame("parentFrame"); Switch to parent iframe first. driver.switchTo().frame("childFrame"); Then switch to nested child iframe. Interact with elements inside child iframe. driver.switchTo().parentFrame(); Go back one level. driver.switchTo().defaultContent(); Return to main page. 2) Shadow DOM in iframe - First switch to iframe: driver.switchTo().frame(frameElement); Then access Shadow DOM using JavaScript: WebElement shadowHost = driver.findElement(By.cssSelector("shadow-host")); WebElement shadowRoot = (WebElement)js.executeScript("return arguments[0].shadowRoot", shadowHost); WebElement element = (WebElement)js.executeScript("return arguments[0].querySelector(\'selector\')", shadowRoot); Or in Selenium 4: SearchContext shadowRoot = shadowHost.getShadowRoot(); WebElement element = shadowRoot.findElement(By.cssSelector("selector")); 3) Complex scenario - Combine techniques: switch to iframe, access shadow host, get shadow root, find elements. Always switch back when done. Use explicit waits at each level for dynamic content.',
          points: 4,
          difficulty: 'hard',
          keywords: ['iframe', 'switchTo', 'frame', 'nested', 'shadowRoot', 'querySelector', 'defaultContent', 'parentFrame', 'getShadowRoot', 'hierarchy']
        }
      ]
    }
  ]
};
