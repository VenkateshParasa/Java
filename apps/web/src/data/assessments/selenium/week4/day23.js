export default {
  title: "Day 23: Waits - Part 1 (Implicit & Explicit) - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key wait concepts and strategies"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all implicit and explicit wait techniques"
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
          question: 'What is the primary purpose of waits in Selenium?',
          options: [
            'To slow down test execution',
            'To handle synchronization between script and web page',
            'To pause the browser',
            'To increase test coverage'
          ],
          correctAnswer: 1,
          explanation: 'Waits handle synchronization between test script and web application, ensuring elements are ready before interaction.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which type of wait applies globally to all element lookups?',
          options: [
            'Explicit Wait',
            'Implicit Wait',
            'Fluent Wait',
            'Thread.sleep()'
          ],
          correctAnswer: 1,
          explanation: 'Implicit wait applies globally to all findElement() and findElements() calls throughout the WebDriver session.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you set an implicit wait in Selenium?',
          options: [
            'driver.wait(10)',
            'driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS)',
            'driver.implicitWait(10)',
            'WebDriverWait wait = new WebDriverWait(driver, 10)'
          ],
          correctAnswer: 1,
          explanation: 'driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10)) sets implicit wait for all element lookups.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the default implicit wait timeout in Selenium?',
          options: [
            '5 seconds',
            '10 seconds',
            '0 seconds (no wait)',
            '30 seconds'
          ],
          correctAnswer: 2,
          explanation: 'The default implicit wait is 0 seconds. WebDriver does not wait unless explicitly configured.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which class is used to implement explicit waits?',
          options: [
            'ImplicitWait',
            'WebDriverWait',
            'ExplicitWait',
            'WaitCondition'
          ],
          correctAnswer: 1,
          explanation: 'WebDriverWait class implements explicit waits: WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which class provides predefined wait conditions for explicit waits?',
          options: [
            'WaitConditions',
            'ExpectedConditions',
            'WaitHelper',
            'SeleniumConditions'
          ],
          correctAnswer: 1,
          explanation: 'ExpectedConditions class provides predefined conditions like visibilityOfElementLocated(), elementToBeClickable().',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which ExpectedCondition waits for an element to be visible and enabled?',
          options: [
            'visibilityOfElementLocated()',
            'presenceOfElementLocated()',
            'elementToBeClickable()',
            'elementToBeSelected()'
          ],
          correctAnswer: 2,
          explanation: 'elementToBeClickable() waits for an element to be both visible (displayed) and enabled for interaction.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the difference between presenceOfElementLocated() and visibilityOfElementLocated()?',
          options: [
            'No difference',
            'presence checks DOM; visibility checks DOM and display',
            'visibility is faster',
            'presence is deprecated'
          ],
          correctAnswer: 1,
          explanation: 'presenceOfElementLocated() waits for element in DOM only. visibilityOfElementLocated() waits for element in DOM AND visible (not hidden).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct syntax for explicit wait with WebDriverWait?',
          options: [
            'wait.until(By.id("element"))',
            'wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")))',
            'wait.waitFor(ExpectedConditions.visible("element"))',
            'wait.checkElement(By.id("element"))'
          ],
          correctAnswer: 1,
          explanation: 'Correct syntax: wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'What exception is thrown when an explicit wait times out?',
          options: [
            'NoSuchElementException',
            'TimeoutException',
            'WaitException',
            'ElementNotFoundException'
          ],
          correctAnswer: 1,
          explanation: 'When explicit wait times out, WebDriver throws TimeoutException from org.openqa.selenium package.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the polling interval for WebDriverWait by default?',
          options: [
            '100 milliseconds',
            '500 milliseconds',
            '1 second',
            '250 milliseconds'
          ],
          correctAnswer: 1,
          explanation: 'WebDriverWait polls every 500 milliseconds (0.5 seconds) by default to check if the condition is met.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which ExpectedCondition waits for alert to be present?',
          options: [
            'alertPresent()',
            'alertIsPresent()',
            'alertToBePresent()',
            'presenceOfAlert()'
          ],
          correctAnswer: 1,
          explanation: 'ExpectedConditions.alertIsPresent() waits for alert to appear and returns Alert object when present.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you wait for page title to contain specific text?',
          options: [
            'wait.until(ExpectedConditions.titleContains("text"))',
            'wait.until(ExpectedConditions.pageTitleIs("text"))',
            'wait.until(ExpectedConditions.titleEquals("text"))',
            'wait.forTitle("text")'
          ],
          correctAnswer: 0,
          explanation: 'ExpectedConditions.titleContains("text") waits for page title to contain specified text.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which ExpectedCondition waits for element to be invisible?',
          options: [
            'elementToBeHidden()',
            'invisibilityOfElementLocated()',
            'elementNotVisible()',
            'waitForInvisible()'
          ],
          correctAnswer: 1,
          explanation: 'ExpectedConditions.invisibilityOfElementLocated() waits for element to become invisible or absent from DOM.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the recommended best practice for waits in Selenium?',
          options: [
            'Use Thread.sleep() everywhere',
            'Use only implicit waits',
            'Use explicit waits for specific conditions',
            'Never use any waits'
          ],
          correctAnswer: 2,
          explanation: 'Best practice: Use explicit waits for specific conditions. They are more reliable, flexible, and apply to specific elements.',
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
          question: 'Implicit wait is set once and applies to all findElement() calls in the session.',
          correctAnswer: true,
          explanation: 'True. Implicit wait is set globally once and applies to all element lookups throughout the WebDriver session.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'Explicit waits can be used for specific elements and conditions.',
          correctAnswer: true,
          explanation: 'True. Explicit waits are applied to specific elements/conditions using WebDriverWait and ExpectedConditions.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'Thread.sleep() is the recommended way to handle waits in Selenium.',
          correctAnswer: false,
          explanation: 'False. Thread.sleep() is NOT recommended. It causes unnecessary delays. Use implicit or explicit waits instead.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can combine implicit and explicit waits in the same test.',
          correctAnswer: false,
          explanation: 'False. Mixing implicit and explicit waits can cause unpredictable behavior and longer wait times. Use one approach consistently.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'WebDriverWait polls the condition repeatedly until timeout or condition is met.',
          correctAnswer: true,
          explanation: 'True. WebDriverWait polls every 500ms by default, checking if the expected condition is satisfied.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'presenceOfElementLocated() waits for element to be visible.',
          correctAnswer: false,
          explanation: 'False. presenceOfElementLocated() waits only for element in DOM, not visibility. Use visibilityOfElementLocated() for visible elements.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'elementToBeClickable() ensures element is both visible and enabled.',
          correctAnswer: true,
          explanation: 'True. elementToBeClickable() waits for element to be displayed (visible) and enabled for interaction.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Explicit waits override implicit waits when used together.',
          correctAnswer: false,
          explanation: 'False. They do NOT override. They combine and can cause longer wait times. Avoid mixing implicit and explicit waits.',
          points: 2,
          difficulty: 'hard'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'TimeoutException is thrown when explicit wait condition is not met within timeout.',
          correctAnswer: true,
          explanation: 'True. WebDriverWait throws TimeoutException when the expected condition is not satisfied within the specified timeout.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Implicit wait waits for elements to be clickable.',
          correctAnswer: false,
          explanation: 'False. Implicit wait only waits for element presence in DOM, not clickability. Use explicit wait elementToBeClickable() for that.',
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
          mode: ['quick', 'full'],
          question: 'The _____ class is used to implement explicit waits in Selenium.',
          correctAnswer: 'WebDriverWait',
          acceptedAnswers: ['WebDriverWait', 'webdriverwait'],
          explanation: 'WebDriverWait class is used to create explicit wait instances: WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ class provides predefined wait conditions like visibilityOfElementLocated().',
          correctAnswer: 'ExpectedConditions',
          acceptedAnswers: ['ExpectedConditions', 'expectedconditions'],
          explanation: 'ExpectedConditions class contains predefined conditions: ExpectedConditions.visibilityOfElementLocated(By.id("element"));',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To set implicit wait, use driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(_____));',
          correctAnswer: '10',
          acceptedAnswers: ['10', 'n', 'time', 'seconds'],
          explanation: 'Example: driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10)); sets 10 second implicit wait.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'When an explicit wait times out, _____ exception is thrown.',
          correctAnswer: 'TimeoutException',
          acceptedAnswers: ['TimeoutException', 'timeoutexception'],
          explanation: 'WebDriverWait throws TimeoutException when the expected condition is not met within the timeout period.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The ExpectedCondition _____ waits for an element to be visible and enabled for interaction.',
          correctAnswer: 'elementToBeClickable()',
          acceptedAnswers: ['elementToBeClickable()', 'elementToBeClickable', 'elementtobeclickable'],
          explanation: 'elementToBeClickable() waits for element to be displayed and enabled: ExpectedConditions.elementToBeClickable(By.id("btn"));',
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
          question: 'Explain the difference between implicit wait and explicit wait.',
          sampleAnswer: 'Implicit wait is set globally once and applies to all findElement() calls throughout the WebDriver session. It waits for element presence in DOM. Explicit wait is applied to specific elements/conditions using WebDriverWait and ExpectedConditions. It can wait for specific conditions like visibility, clickability, or custom conditions. Explicit waits are more flexible and recommended for production tests.',
          keywords: ['implicit', 'explicit', 'global', 'specific', 'findElement', 'WebDriverWait', 'ExpectedConditions', 'flexible', 'condition'],
          minKeywords: 5,
          explanation: 'Implicit wait is global for all elements; explicit wait is for specific elements/conditions with more flexibility.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'What is the difference between presenceOfElementLocated() and visibilityOfElementLocated()?',
          sampleAnswer: 'presenceOfElementLocated() waits only for the element to be present in the DOM, regardless of visibility. The element can be hidden (display:none or visibility:hidden) and the condition is still met. visibilityOfElementLocated() waits for the element to be both present in DOM AND visible (not hidden). It checks that element height and width are greater than 0.',
          keywords: ['presenceOfElementLocated', 'visibilityOfElementLocated', 'DOM', 'visible', 'hidden', 'display', 'present', 'visibility'],
          minKeywords: 5,
          explanation: 'presenceOfElementLocated() waits for DOM presence only; visibilityOfElementLocated() waits for DOM presence AND visibility.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write the complete code to create a WebDriverWait with 10 seconds timeout and wait for element with id "submit" to be clickable.',
          sampleAnswer: 'WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); WebElement submitBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit"))); submitBtn.click(); You need to import: org.openqa.selenium.support.ui.WebDriverWait, org.openqa.selenium.support.ui.ExpectedConditions, java.time.Duration.',
          keywords: ['WebDriverWait', 'Duration.ofSeconds', 'until', 'ExpectedConditions', 'elementToBeClickable', 'By.id', 'submit', 'import'],
          minKeywords: 5,
          explanation: 'Create WebDriverWait object with timeout, use until() with elementToBeClickable() condition for specific element.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'List three ExpectedConditions methods and explain when to use each.',
          sampleAnswer: '1) visibilityOfElementLocated(By locator) - Use when element must be visible before interaction. 2) elementToBeClickable(By locator) - Use when element must be visible AND enabled for clicking. 3) presenceOfElementLocated(By locator) - Use when you only need element in DOM, visibility not required. Other useful conditions: alertIsPresent(), titleContains(), invisibilityOfElementLocated().',
          keywords: ['visibilityOfElementLocated', 'elementToBeClickable', 'presenceOfElementLocated', 'visible', 'clickable', 'DOM', 'enabled', 'interaction'],
          minKeywords: 6,
          explanation: 'visibilityOfElementLocated() for visible elements, elementToBeClickable() for clickable elements, presenceOfElementLocated() for DOM presence.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Why is it not recommended to mix implicit and explicit waits?',
          sampleAnswer: 'Mixing implicit and explicit waits causes unpredictable behavior and longer wait times. When both are used together, they do not override each other but combine. For example, if implicit wait is 10 seconds and explicit wait is 20 seconds, total wait could be up to 30 seconds. This leads to inconsistent test execution times and makes debugging difficult. Best practice is to choose one approach (preferably explicit waits) and use it consistently.',
          keywords: ['mix', 'combine', 'unpredictable', 'longer', 'wait', 'implicit', 'explicit', 'override', 'consistent', 'best practice'],
          minKeywords: 5,
          explanation: 'Mixing waits causes unpredictable behavior and longer wait times as they combine rather than override each other.',
          points: 4,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
