export default {
  title: "Day 12: JavaScript Executor Advanced Assessment",
  description: "Test your understanding of advanced JavaScript Executor operations in Selenium",
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
          question: 'What is JavascriptExecutor in Selenium?',
          options: [
            'A JavaScript testing framework',
            'An interface to execute JavaScript code in browser',
            'A method to debug JavaScript',
            'A browser automation tool'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'JavascriptExecutor is an interface in Selenium that allows execution of JavaScript code directly in the browser context.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'How do you create a JavascriptExecutor object?',
          options: [
            'JavascriptExecutor js = new JavascriptExecutor();',
            'JavascriptExecutor js = (JavascriptExecutor) driver;',
            'JavascriptExecutor js = driver.getJsExecutor();',
            'JavascriptExecutor js = JavascriptExecutor.create(driver);'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'JavascriptExecutor is created by casting the WebDriver instance: JavascriptExecutor js = (JavascriptExecutor) driver;'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which method executes JavaScript and returns a value?',
          options: [
            'executeScript()',
            'executeAsyncScript()',
            'runScript()',
            'Both A and B'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Both executeScript() for synchronous execution and executeAsyncScript() for asynchronous execution can return values from JavaScript.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'How do you scroll to the bottom of a page using JavaScript?',
          options: [
            'js.executeScript("window.scrollTo(0, 0)");',
            'js.executeScript("window.scrollTo(0, document.body.scrollHeight)");',
            'js.executeScript("window.scroll(bottom)");',
            'js.executeScript("scrollToBottom()");"'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'window.scrollTo(0, document.body.scrollHeight) scrolls to the bottom by setting the vertical position to the total height of the document body.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'How do you scroll to a specific element using JavaScript?',
          options: [
            'js.executeScript("arguments[0].scrollIntoView();", element);',
            'js.executeScript("scrollTo(element);", element);',
            'js.executeScript("element.scroll();", element);',
            'js.executeScript("window.scrollToElement(element);");'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'scrollIntoView() is the JavaScript method that scrolls the element into the visible area. Pass element as arguments[0].'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How do you click an element using JavascriptExecutor?',
          options: [
            'js.executeScript("arguments[0].click();", element);',
            'js.executeScript("click(element);", element);',
            'js.executeScript("element.performClick();", element);',
            'js.executeScript("arguments[0].doClick();", element);'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Execute arguments[0].click() where arguments[0] refers to the WebElement passed as the second parameter.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'How do you change the value of an input field using JavaScript?',
          options: [
            'js.executeScript("arguments[0].value=\'text\';", element);',
            'js.executeScript("arguments[0].setValue(\'text\');", element);',
            'js.executeScript("arguments[0].text=\'text\';", element);',
            'js.executeScript("arguments[0].input(\'text\');", element);'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Set the value property of the element using arguments[0].value=\'text\' to change input field values.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'What does arguments[0] represent in executeScript()?',
          options: [
            'The first line of JavaScript',
            'The first parameter passed after the script',
            'The driver object',
            'The return value'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'arguments[0] represents the first parameter (usually WebElement) passed after the JavaScript string in executeScript().'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'How do you get the page title using JavascriptExecutor?',
          options: [
            'js.executeScript("return document.title;");',
            'js.executeScript("return page.title;");',
            'js.executeScript("return window.title;");',
            'js.executeScript("return browser.title;");'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Use document.title to get the page title. The return keyword is necessary to return the value to Selenium.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'How do you make an element visible that is hidden?',
          options: [
            'js.executeScript("arguments[0].style.display=\'block\';", element);',
            'js.executeScript("arguments[0].show();", element);',
            'js.executeScript("arguments[0].visible=true;", element);',
            'js.executeScript("arguments[0].unhide();", element);'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Change the CSS display property to \'block\' or \'inline\' to make hidden elements visible: style.display=\'block\'.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'How do you access the Shadow DOM using JavaScript?',
          options: [
            'element.shadowRoot',
            'element.getShadowRoot()',
            'element.shadow',
            'element.shadowDOM'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'hard',
          explanation: 'Access Shadow DOM using the shadowRoot property: element.shadowRoot returns the shadow root of the element.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'How do you find an element inside Shadow DOM?',
          options: [
            'Use regular Selenium findElement',
            'Use js.executeScript to access shadowRoot.querySelector',
            'Use XPath',
            'Shadow DOM elements cannot be accessed'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'Use JavaScript to access shadowRoot and then use querySelector: js.executeScript("return arguments[0].shadowRoot.querySelector(\'selector\')", element);'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'How do you get the page load time using JavaScript?',
          options: [
            'js.executeScript("return performance.timing.loadEventEnd - performance.timing.navigationStart;");',
            'js.executeScript("return window.loadTime;");',
            'js.executeScript("return document.loadTime;");',
            'js.executeScript("return page.timing;");'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'hard',
          explanation: 'Use the Performance Timing API: performance.timing.loadEventEnd - performance.timing.navigationStart gives page load time in milliseconds.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'How do you disable an input field using JavaScript?',
          options: [
            'js.executeScript("arguments[0].disabled=true;", element);',
            'js.executeScript("arguments[0].enable=false;", element);',
            'js.executeScript("arguments[0].setDisabled(true);", element);',
            'js.executeScript("arguments[0].active=false;", element);'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Set the disabled property to true: arguments[0].disabled=true disables form elements.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'How do you get an element attribute using JavaScript?',
          options: [
            'js.executeScript("return arguments[0].getAttribute(\'attr\');", element);',
            'js.executeScript("return arguments[0].attr;", element);',
            'js.executeScript("return arguments[0].attribute(\'attr\');", element);',
            'js.executeScript("return arguments[0][\'attr\'];", element);'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Use the getAttribute() method: return arguments[0].getAttribute(\'attributeName\') to get element attributes.'
        },
        {
          id: 'q16',
          type: 'mcq',
          question: 'When should you use JavascriptExecutor over regular Selenium methods?',
          options: [
            'When regular methods fail',
            'For hidden elements',
            'For better performance',
            'All of the above'
          ],
          correctAnswer: 3,
          points: 2,
          difficulty: 'medium',
          explanation: 'Use JavascriptExecutor when regular methods fail, for hidden elements, for direct DOM manipulation, and sometimes for better performance.'
        },
        {
          id: 'q17',
          type: 'mcq',
          question: 'How do you zoom the page using JavaScript?',
          options: [
            'js.executeScript("document.body.style.zoom=\'150%\';");',
            'js.executeScript("window.zoom(150);");',
            'js.executeScript("page.zoom=1.5;");',
            'js.executeScript("document.setZoom(150);");'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Set the zoom CSS property on document.body: document.body.style.zoom=\'150%\' to zoom the page.'
        },
        {
          id: 'q18',
          type: 'mcq',
          question: 'How do you remove an element from DOM using JavaScript?',
          options: [
            'js.executeScript("arguments[0].remove();", element);',
            'js.executeScript("arguments[0].delete();", element);',
            'js.executeScript("arguments[0].destroy();", element);',
            'js.executeScript("DOM.remove(arguments[0]);", element);'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: 'Use the remove() method: arguments[0].remove() removes the element from the DOM.'
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
          question: 'JavascriptExecutor can interact with hidden elements that Selenium cannot.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. JavascriptExecutor can interact with hidden elements by directly manipulating the DOM, bypassing visibility checks.'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'executeScript() can return values from JavaScript code.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Using the return keyword in JavaScript, executeScript() can return values to the Java/Selenium code.'
        },
        {
          id: 'q21',
          type: 'true-false',
          question: 'arguments[0] in JavaScript refers to the WebDriver instance.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. arguments[0] refers to the first parameter passed after the JavaScript string, typically a WebElement, not the driver.'
        },
        {
          id: 'q22',
          type: 'true-false',
          question: 'JavascriptExecutor can access elements inside Shadow DOM.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. JavaScript can access Shadow DOM using element.shadowRoot.querySelector(), which regular Selenium cannot do directly.'
        },
        {
          id: 'q23',
          type: 'true-false',
          question: 'scrollIntoView() always scrolls the element to the top of the viewport.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. scrollIntoView() can take parameters like scrollIntoView(true) for top or scrollIntoView(false) for bottom alignment.'
        },
        {
          id: 'q24',
          type: 'true-false',
          question: 'JavascriptExecutor clicks do not trigger JavaScript event handlers.',
          correctAnswer: false,
          points: 2,
          difficulty: 'hard',
          explanation: 'False. JavaScript clicks using element.click() do trigger event handlers and behave like real clicks in most cases.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q25',
          type: 'fill-blank',
          question: 'To execute JavaScript code in Selenium, cast WebDriver to ________ interface.',
          correctAnswer: 'JavascriptExecutor',
          points: 2,
          difficulty: 'easy',
          explanation: 'Cast WebDriver to JavascriptExecutor interface: (JavascriptExecutor) driver to execute JavaScript code.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q26',
          type: 'short',
          question: 'Explain different scrolling techniques using JavascriptExecutor with examples.',
          sampleAnswer: 'JavaScript scrolling techniques: 1) Scroll to bottom: js.executeScript("window.scrollTo(0, document.body.scrollHeight);"); Scrolls to maximum height. 2) Scroll to top: js.executeScript("window.scrollTo(0, 0);"); Resets to top. 3) Scroll by pixels: js.executeScript("window.scrollBy(0, 500);"); Scrolls down 500 pixels from current position. 4) Scroll to element: js.executeScript("arguments[0].scrollIntoView(true);", element); Scrolls element to viewport, true=top, false=bottom. 5) Smooth scroll: js.executeScript("arguments[0].scrollIntoView({behavior: \'smooth\', block: \'center\'});", element); Smooth animation, centers element. Use cases: Infinite scroll needs bottom scroll, lazy loading needs element scroll, testing sticky headers needs scroll by pixels. Best practice: Add waits after scrolling for dynamic content to load. For large pages, scroll in increments with pauses.',
          points: 4,
          difficulty: 'hard',
          keywords: ['scrollTo', 'scrollBy', 'scrollIntoView', 'window', 'document.body.scrollHeight', 'arguments', 'smooth', 'behavior', 'pixels']
        }
      ]
    }
  ]
};
