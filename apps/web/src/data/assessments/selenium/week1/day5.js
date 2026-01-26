export default {
  title: "Day 5: Waits in Selenium Assessment",
  description: "Test your understanding of implicit wait, explicit wait, fluent wait, and wait strategies",
  passingScore: 70,
  timeLimit: 24, // minutes
  modes: {
    quick: {
      questionCount: 10,
      timeLimit: 12,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 25,
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
          question: 'What is the purpose of waits in Selenium?',
          options: [
            'To slow down test execution',
            'To handle synchronization issues between test and application',
            'To make tests more readable',
            'To reduce browser memory usage'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Waits handle synchronization between test execution speed and application response time, ensuring elements are ready before interaction.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'How do you set implicit wait in Selenium?',
          options: [
            'driver.wait(10)',
            'driver.implicitlyWait(10, TimeUnit.SECONDS)',
            'driver.setWait(10)',
            'driver.setTimeout(10)'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS) sets the implicit wait time for the entire session.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the scope of implicit wait?',
          options: [
            'Single element',
            'Single page',
            'Entire WebDriver session',
            'Single test method'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Implicit wait applies to the entire WebDriver session and affects all findElement() and findElements() calls.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which class is used to implement explicit wait?',
          options: [
            'Wait',
            'WebDriverWait',
            'ExplicitWait',
            'ElementWait'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'WebDriverWait class is used to implement explicit waits with specific conditions for particular elements.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What does ExpectedConditions.visibilityOfElementLocated() wait for?',
          options: [
            'Element to exist in DOM',
            'Element to be visible and have non-zero dimensions',
            'Element to be clickable',
            'Element to be enabled'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'visibilityOfElementLocated() waits until the element is present in DOM, visible, and has height and width greater than 0.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What is the syntax for creating an explicit wait with 10 seconds timeout?',
          options: [
            'Wait wait = new Wait(driver, 10)',
            'WebDriverWait wait = new WebDriverWait(driver, 10)',
            'ExplicitWait wait = new ExplicitWait(driver, 10)',
            'Wait wait = WebDriverWait(10)'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'WebDriverWait wait = new WebDriverWait(driver, 10) creates an explicit wait with 10 seconds timeout.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the difference between implicit and explicit wait?',
          options: [
            'No difference',
            'Implicit is global, explicit is for specific conditions',
            'Implicit is faster',
            'Explicit is deprecated'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Implicit wait is global and applies to all elements, while explicit wait applies to specific conditions for particular elements with custom wait conditions.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'Which ExpectedCondition waits for an element to be clickable?',
          options: [
            'elementToBeVisible()',
            'elementToBeClickable()',
            'elementToBeEnabled()',
            'elementToBeInteractive()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'ExpectedConditions.elementToBeClickable() waits until element is visible, enabled, and ready to be clicked.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'What is fluent wait in Selenium?',
          options: [
            'A faster version of implicit wait',
            'A wait that polls at regular intervals with custom exceptions to ignore',
            'A wait only for fluid animations',
            'A deprecated wait method'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Fluent wait polls the DOM at regular intervals (polling frequency) and can ignore specific exceptions while waiting for a condition.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'What exception is thrown when an explicit wait times out?',
          options: [
            'WaitTimeoutException',
            'TimeoutException',
            'NoSuchElementException',
            'ElementNotVisibleException'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'TimeoutException is thrown when an explicit wait or fluent wait reaches its timeout without the expected condition being met.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'Why should you avoid Thread.sleep() in Selenium tests?',
          options: [
            'It causes compilation errors',
            'It always waits full time regardless of element readiness',
            'It only works in Java',
            'It is not supported in Selenium'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Thread.sleep() is a hard wait that always waits the full duration, wasting time even when elements are ready earlier. Use dynamic waits instead.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'What does ExpectedConditions.presenceOfElementLocated() check for?',
          options: [
            'Element is visible on page',
            'Element is present in DOM (may not be visible)',
            'Element is clickable',
            'Element text is present'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'presenceOfElementLocated() waits for element to be present in the DOM, regardless of visibility. The element may still be hidden.'
        },
        {
          id: 'q13',
          type: 'mcq',
          question: 'How do you set the polling interval in fluent wait?',
          options: [
            'withInterval()',
            'pollingEvery()',
            'setInterval()',
            'checkEvery()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'The pollingEvery() method sets how frequently fluent wait checks the condition during the timeout period.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'Can you mix implicit and explicit waits in the same test?',
          options: [
            'Yes, always recommended',
            'No, it can cause unpredictable wait times',
            'Yes, but only with fluent wait',
            'No, it causes compilation error'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'Mixing implicit and explicit waits is not recommended as it can lead to unpredictable wait times and unexpected TimeoutExceptions.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'Which ExpectedCondition waits for text to be present in an element?',
          options: [
            'textToBePresent()',
            'textToBePresentInElementLocated()',
            'elementContainsText()',
            'waitForText()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'ExpectedConditions.textToBePresentInElementLocated() waits until the specified text appears in the element.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q16',
          type: 'true-false',
          question: 'Implicit wait is applied only once at the beginning of the test.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. Implicit wait is applied to every findElement() and findElements() call throughout the entire WebDriver session.'
        },
        {
          id: 'q17',
          type: 'true-false',
          question: 'Explicit wait provides more control than implicit wait.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Explicit wait allows waiting for specific conditions on specific elements with custom timeout and conditions.'
        },
        {
          id: 'q18',
          type: 'true-false',
          question: 'FluentWait is a subclass of WebDriverWait.',
          correctAnswer: false,
          points: 2,
          difficulty: 'hard',
          explanation: 'False. WebDriverWait is actually a subclass of FluentWait. FluentWait is more generic and WebDriverWait is a specialized implementation.'
        },
        {
          id: 'q19',
          type: 'true-false',
          question: 'Thread.sleep() is the recommended way to handle waits in Selenium.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. Thread.sleep() is not recommended as it always waits the full time. Use dynamic waits (implicit or explicit) instead.'
        },
        {
          id: 'q20',
          type: 'true-false',
          question: 'ExpectedConditions is a utility class that provides ready-made wait conditions.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. ExpectedConditions class provides common wait conditions like visibility, clickability, presence, etc.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q21',
          type: 'fill-blank',
          question: 'To wait for an alert to be present, use ExpectedConditions.________().',
          correctAnswer: 'alertIsPresent',
          points: 2,
          difficulty: 'medium',
          explanation: 'ExpectedConditions.alertIsPresent() waits until an alert dialog appears on the page.'
        },
        {
          id: 'q22',
          type: 'fill-blank',
          question: 'The method ________.ignoring() in fluent wait specifies exceptions to ignore while waiting.',
          correctAnswer: 'withPollingStrategy',
          points: 2,
          difficulty: 'hard',
          explanation: 'Fluent wait uses ignoring() method to specify which exceptions to ignore during the polling period.'
        },
        {
          id: 'q23',
          type: 'fill-blank',
          question: 'WebDriverWait extends ________ class.',
          correctAnswer: 'FluentWait',
          points: 2,
          difficulty: 'medium',
          explanation: 'WebDriverWait extends FluentWait<WebDriver>, inheriting all fluent wait capabilities with WebDriver-specific defaults.'
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
          question: 'Explain the differences between implicit wait, explicit wait, and fluent wait with code examples.',
          sampleAnswer: 'Three types of waits: 1) Implicit Wait - Global wait for all elements. Set once, applies to all findElement calls. Code: driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS); Limitation: Cannot wait for specific conditions, fixed polling. 2) Explicit Wait - Waits for specific condition on specific element. Code: WebDriverWait wait = new WebDriverWait(driver, 10); wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element"))); Benefits: Custom conditions, element-specific. 3) Fluent Wait - Advanced explicit wait with custom polling and exception handling. Code: Wait<WebDriver> wait = new FluentWait<>(driver).withTimeout(30, SECONDS).pollingEvery(5, SECONDS).ignoring(NoSuchElementException.class); More flexible with custom polling intervals. Best Practice: Use explicit/fluent waits, avoid mixing with implicit.',
          points: 5,
          difficulty: 'hard',
          keywords: ['implicit', 'explicit', 'fluent', 'WebDriverWait', 'FluentWait', 'timeout', 'polling', 'ExpectedConditions', 'global', 'specific']
        },
        {
          id: 'q25',
          type: 'short',
          question: 'List and explain 5 commonly used ExpectedConditions methods with their use cases.',
          sampleAnswer: '5 ExpectedConditions methods: 1) presenceOfElementLocated(By locator) - Waits for element in DOM (may not be visible). Use: Wait for AJAX elements to load. 2) visibilityOfElementLocated(By locator) - Waits for element visible with non-zero size. Use: Before interacting with element. 3) elementToBeClickable(By locator) - Waits for element visible and enabled. Use: Before clicking buttons/links. 4) titleContains(String title) - Waits for page title to contain text. Use: Page navigation verification. 5) alertIsPresent() - Waits for alert dialog. Use: Before handling alerts. Code example: wait.until(ExpectedConditions.elementToBeClickable(By.id("btn"))).click(); Other useful: textToBePresentInElement(), frameToBeAvailableAndSwitchToIt(), invisibilityOfElement(). Choose based on specific wait requirement.',
          points: 4,
          difficulty: 'medium',
          keywords: ['ExpectedConditions', 'presenceOfElement', 'visibilityOfElement', 'elementToBeClickable', 'alertIsPresent', 'titleContains', 'wait', 'condition']
        }
      ]
    }
  ],
  week: 1,
  day: 5,
  topic: "Waits in Selenium"
};
