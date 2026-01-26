export default {
  title: "Day 24: Waits - Part 2 (Fluent Wait & Custom Conditions) - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key FluentWait and custom wait condition concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all FluentWait configuration, polling intervals, and custom conditions"
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
          question: 'What is the main advantage of FluentWait over WebDriverWait?',
          options: [
            'FluentWait is faster',
            'FluentWait provides more configuration options like polling interval and ignored exceptions',
            'FluentWait uses less memory',
            'FluentWait works only with explicit waits'
          ],
          correctAnswer: 1,
          explanation: 'FluentWait provides more flexibility through polling interval configuration, exception handling, and custom timeout messages.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the default polling interval for WebDriverWait?',
          options: [
            '100 milliseconds',
            '250 milliseconds',
            '500 milliseconds',
            '1 second'
          ],
          correctAnswer: 2,
          explanation: 'WebDriverWait polls every 500 milliseconds (0.5 seconds) by default. FluentWait allows you to customize this interval.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to set the polling interval in FluentWait?',
          options: [
            'setPolling()',
            'pollingEvery()',
            'withInterval()',
            'checkEvery()'
          ],
          correctAnswer: 1,
          explanation: 'wait.pollingEvery(Duration.ofMillis(200)) sets how frequently FluentWait checks the condition.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the ignoring() method do in FluentWait?',
          options: [
            'Ignores all exceptions',
            'Ignores specific exception types during polling',
            'Stops the wait immediately',
            'Resets the timeout'
          ],
          correctAnswer: 1,
          explanation: 'wait.ignoring(NoSuchElementException.class) tells FluentWait to ignore specific exceptions during polling and continue waiting.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you create a FluentWait instance?',
          options: [
            'new FluentWait(driver)',
            'new FluentWait<>(driver)',
            'FluentWait.create(driver)',
            'driver.fluentWait()'
          ],
          correctAnswer: 1,
          explanation: 'FluentWait requires generic type: Wait<WebDriver> wait = new FluentWait<>(driver);',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which interface must custom wait conditions implement?',
          options: [
            'Condition<T>',
            'Function<T, V>',
            'Predicate<T>',
            'WaitCondition'
          ],
          correctAnswer: 1,
          explanation: 'Custom wait conditions implement Function<WebDriver, Boolean> or ExpectedCondition<WebElement> which extends Function.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does the withMessage() method do in FluentWait?',
          options: [
            'Prints a message during polling',
            'Sets a custom timeout message',
            'Logs every check',
            'Sends notifications'
          ],
          correctAnswer: 1,
          explanation: 'wait.withMessage("Element not found") provides a custom error message when timeout occurs, making debugging easier.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the return type of the apply() method in Function<T, V>?',
          options: [
            'Always Boolean',
            'Always WebElement',
            'Generic type V',
            'void'
          ],
          correctAnswer: 2,
          explanation: 'In Function<T, V>, apply() returns type V. For example, Function<WebDriver, Boolean> returns Boolean.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'How often does FluentWait check the condition if polling is set to 200ms and timeout is 10 seconds?',
          options: [
            '10 times',
            '20 times',
            'Up to 50 times',
            '100 times'
          ],
          correctAnswer: 2,
          explanation: '10 seconds / 200ms = 50 checks maximum. FluentWait stops immediately when condition is met.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens if the condition in FluentWait returns null?',
          options: [
            'Continues waiting',
            'Throws exception immediately',
            'Returns null',
            'Uses default value'
          ],
          correctAnswer: 0,
          explanation: 'FluentWait treats null and false as "condition not met" and continues polling until timeout.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to apply the wait condition?',
          options: [
            'check()',
            'until()',
            'waitFor()',
            'apply()'
          ],
          correctAnswer: 1,
          explanation: 'wait.until(condition) applies the wait condition and returns the result when the condition is met.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the best practice for polling interval?',
          options: [
            'Set as low as possible (10ms)',
            'Always use default (500ms)',
            'Balance between responsiveness and CPU usage (100-300ms)',
            'Set as high as possible (5000ms)'
          ],
          correctAnswer: 2,
          explanation: 'Polling interval of 100-300ms balances quick detection with reasonable CPU usage. Too low causes overhead; too high delays detection.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Can you ignore multiple exception types in FluentWait?',
          options: [
            'No, only one exception type',
            'Yes, by chaining ignoring() calls',
            'Yes, but only with WebDriverWait',
            'No, must catch manually'
          ],
          correctAnswer: 1,
          explanation: 'Chain multiple ignoring() calls: wait.ignoring(NoSuchElementException.class).ignoring(StaleElementReferenceException.class)',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the signature of a custom condition using lambda?',
          options: [
            '(driver) -> { return true; }',
            'driver -> driver.findElement()',
            'Both A and B',
            'driver => condition'
          ],
          correctAnswer: 2,
          explanation: 'Lambda syntax: driver -> condition. Example: driver -> driver.findElement(By.id("btn")).isDisplayed()',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'When should you use FluentWait instead of WebDriverWait?',
          options: [
            'Always use FluentWait',
            'When you need custom polling, exception handling, or timeout messages',
            'Never, WebDriverWait is always better',
            'Only for implicit waits'
          ],
          correctAnswer: 1,
          explanation: 'Use FluentWait when you need fine-grained control over polling frequency, exception handling, or custom timeout messages.',
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
          question: 'FluentWait is more flexible than WebDriverWait.',
          correctAnswer: true,
          explanation: 'True. FluentWait provides more configuration options including polling interval, ignored exceptions, and custom messages.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'The default polling interval can be changed in FluentWait.',
          correctAnswer: true,
          explanation: 'True. Use pollingEvery(Duration.ofMillis(200)) to customize the polling interval.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'WebDriverWait is a subclass of FluentWait.',
          correctAnswer: true,
          explanation: 'True. WebDriverWait extends FluentWait<WebDriver>, inheriting all FluentWait functionality with preconfigured defaults.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'FluentWait can ignore multiple exception types simultaneously.',
          correctAnswer: true,
          explanation: 'True. Chain ignoring() calls: wait.ignoring(NoSuchElementException.class).ignoring(StaleElementReferenceException.class)',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Custom wait conditions must always return Boolean.',
          correctAnswer: false,
          explanation: 'False. Function<T, V> can return any type. For example, Function<WebDriver, WebElement> returns WebElement.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Lower polling intervals always improve test performance.',
          correctAnswer: false,
          explanation: 'False. Very low polling intervals (e.g., 10ms) increase CPU usage and can degrade performance. Balance is key.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'withMessage() must be called before until() in FluentWait.',
          correctAnswer: true,
          explanation: 'True. Configuration methods like withMessage() must be called before until() to take effect.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'FluentWait immediately stops polling when the condition returns true.',
          correctAnswer: true,
          explanation: 'True. FluentWait stops immediately when the condition is met, not waiting for the full timeout period.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can create custom conditions using lambda expressions.',
          correctAnswer: true,
          explanation: 'True. Lambda syntax: wait.until(driver -> driver.findElement(By.id("btn")).isDisplayed())',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'FluentWait requires you to import org.openqa.selenium.support.ui.FluentWait.',
          correctAnswer: true,
          explanation: 'True. Import org.openqa.selenium.support.ui.FluentWait and org.openqa.selenium.support.ui.Wait.',
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
          question: 'The _____ method sets how frequently FluentWait checks the condition.',
          correctAnswer: 'pollingEvery()',
          acceptedAnswers: ['pollingEvery()', 'pollingEvery'],
          explanation: 'wait.pollingEvery(Duration.ofMillis(200)) configures the polling interval.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The _____ method tells FluentWait to ignore specific exceptions during polling.',
          correctAnswer: 'ignoring()',
          acceptedAnswers: ['ignoring()', 'ignoring'],
          explanation: 'wait.ignoring(NoSuchElementException.class) prevents specific exceptions from stopping the wait.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'Custom wait conditions implement the _____ interface.',
          correctAnswer: 'Function',
          acceptedAnswers: ['Function', 'Function<T, V>', 'Function<WebDriver, Boolean>'],
          explanation: 'Custom conditions implement Function<T, V> where T is input type (usually WebDriver) and V is return type.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ method provides a custom error message when FluentWait times out.',
          correctAnswer: 'withMessage()',
          acceptedAnswers: ['withMessage()', 'withMessage'],
          explanation: 'wait.withMessage("Custom timeout message") improves debugging by providing context when timeout occurs.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The default polling interval for WebDriverWait is _____ milliseconds.',
          correctAnswer: '500',
          acceptedAnswers: ['500', '500ms', '500 milliseconds'],
          explanation: 'WebDriverWait polls every 500 milliseconds (0.5 seconds) by default.',
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
          question: 'Explain the difference between FluentWait and WebDriverWait.',
          sampleAnswer: 'FluentWait is the base class that provides maximum flexibility with configurable polling interval, exception handling, and custom timeout messages. WebDriverWait extends FluentWait with preconfigured defaults (500ms polling, ignores NotFoundException). Use WebDriverWait for standard scenarios and FluentWait when you need custom configuration like different polling intervals or specific exception handling.',
          keywords: ['FluentWait', 'WebDriverWait', 'extends', 'polling', 'flexibility', 'configuration', 'default'],
          minKeywords: 4,
          explanation: 'WebDriverWait extends FluentWait with defaults. FluentWait provides more configuration options.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Write a FluentWait configuration that waits 10 seconds, polls every 200ms, ignores NoSuchElementException, and has a custom message.',
          sampleAnswer: 'Wait<WebDriver> wait = new FluentWait<>(driver)\n  .withTimeout(Duration.ofSeconds(10))\n  .pollingEvery(Duration.ofMillis(200))\n  .ignoring(NoSuchElementException.class)\n  .withMessage("Element not found after 10 seconds");\nWebElement element = wait.until(driver -> driver.findElement(By.id("submit")));',
          keywords: ['FluentWait', 'withTimeout', 'pollingEvery', 'ignoring', 'withMessage', '10', '200', 'Duration'],
          minKeywords: 5,
          explanation: 'Configure FluentWait with timeout, polling, exception handling, and custom message using method chaining.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Create a custom wait condition using lambda that waits for an element to contain specific text.',
          sampleAnswer: 'Wait<WebDriver> wait = new FluentWait<>(driver)\n  .withTimeout(Duration.ofSeconds(10))\n  .pollingEvery(Duration.ofMillis(200));\n\nWebElement element = wait.until(driver -> {\n  WebElement elem = driver.findElement(By.id("status"));\n  if (elem.getText().contains("Success")) {\n    return elem;\n  }\n  return null;\n});',
          keywords: ['lambda', 'wait.until', 'driver ->', 'getText', 'contains', 'return', 'null', 'WebElement'],
          minKeywords: 5,
          explanation: 'Use lambda to create custom condition: wait.until(driver -> condition that returns element or null)',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Why would you want to customize the polling interval, and what are the trade-offs?',
          sampleAnswer: 'Customizing polling interval balances responsiveness vs. resource usage. Lower intervals (100-200ms) detect state changes faster, useful for fast-loading elements or animations, but increase CPU usage and network requests. Higher intervals (1-2s) reduce resource usage but may miss rapid changes or delay detection. The default 500ms is suitable for most cases. Adjust based on application behavior: use lower for fast UIs, higher for slow backend operations.',
          keywords: ['polling', 'responsiveness', 'CPU', 'resource', 'trade-off', 'faster', 'usage', 'balance'],
          minKeywords: 4,
          explanation: 'Lower polling = faster detection but more CPU usage. Higher polling = less resource usage but slower detection.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Demonstrate how to create a custom condition class that waits for an element to be clickable (displayed AND enabled).',
          sampleAnswer: 'public class ElementIsClickable implements Function<WebDriver, WebElement> {\n  private By locator;\n  \n  public ElementIsClickable(By locator) {\n    this.locator = locator;\n  }\n  \n  @Override\n  public WebElement apply(WebDriver driver) {\n    WebElement element = driver.findElement(locator);\n    if (element.isDisplayed() && element.isEnabled()) {\n      return element;\n    }\n    return null;\n  }\n}\n\nUsage: wait.until(new ElementIsClickable(By.id("submit")));',
          keywords: ['class', 'Function', 'apply', 'WebDriver', 'WebElement', 'isDisplayed', 'isEnabled', 'return', 'null'],
          minKeywords: 6,
          explanation: 'Create class implementing Function<WebDriver, WebElement> with apply() method that returns element when condition is met.',
          points: 5,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
