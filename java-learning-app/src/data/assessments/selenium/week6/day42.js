export default {
  title: "Day 42: Exception Handling in Framework - Assessment",
  passingScore: 70,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45
    }
  },
  sections: [
    {
      title: "Section A: Multiple Choice Questions",
      description: "Choose the best answer for each question (3 points each)",
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Selenium exception is thrown when an element is not found in the DOM?',
          options: [
            'NoSuchElementException',
            'ElementNotFoundException',
            'ElementNotPresentException',
            'MissingElementException'
          ],
          correctAnswer: 0,
          explanation: 'NoSuchElementException is thrown by Selenium when it cannot locate an element using the given locator strategy. This is one of the most common exceptions in Selenium automation.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What causes a StaleElementReferenceException?',
          options: [
            'Element is not visible on the page',
            'Element reference is no longer valid in the DOM',
            'Element is outside the viewport',
            'Element has incorrect locator'
          ],
          correctAnswer: 1,
          explanation: 'StaleElementReferenceException occurs when an element reference is no longer attached to the DOM. This typically happens when the DOM is refreshed or the element is removed and re-added after the reference was obtained.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a try-catch-finally block for Selenium tests, what is the primary purpose of the finally block?',
          options: [
            'To handle exceptions',
            'To retry failed operations',
            'To execute cleanup code regardless of exception occurrence',
            'To log error messages'
          ],
          correctAnswer: 2,
          explanation: 'The finally block is used to execute cleanup code that must run regardless of whether an exception occurred or not. This includes closing resources, taking screenshots, or resetting states.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which approach is BEST for handling exceptions in Page Object Model?',
          options: [
            'Catch all exceptions in page objects and return null',
            'Let exceptions propagate to test methods for proper handling',
            'Suppress all exceptions to avoid test failures',
            'Convert all exceptions to RuntimeException'
          ],
          correctAnswer: 1,
          explanation: 'It is best practice to let exceptions propagate from page objects to test methods. This allows test methods to handle exceptions appropriately based on test context and provides better error reporting.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct TestNG annotation to specify an expected exception?',
          options: [
            '@Test(exception = NoSuchElementException.class)',
            '@Test(expectedException = NoSuchElementException.class)',
            '@Test(expectedExceptions = NoSuchElementException.class)',
            '@Test(throws = NoSuchElementException.class)'
          ],
          correctAnswer: 2,
          explanation: 'TestNG uses @Test(expectedExceptions = ExceptionClass.class) to declare that a test method is expected to throw a specific exception. The test passes only if that exception is thrown.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which exception is thrown when a WebDriver command takes longer than the specified timeout?',
          options: [
            'TimeoutException',
            'CommandTimeoutException',
            'WebDriverTimeoutException',
            'TimeExpiredException'
          ],
          correctAnswer: 0,
          explanation: 'TimeoutException is thrown by Selenium when a command or wait condition does not complete within the specified timeout period. This is commonly seen with explicit waits and FluentWait.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the recommended approach for taking screenshots when exceptions occur?',
          options: [
            'Take screenshots only in test methods',
            'Implement screenshot capture in a centralized exception handler or listener',
            'Take screenshots manually after each test',
            'Avoid screenshots as they slow down execution'
          ],
          correctAnswer: 1,
          explanation: 'The best practice is to implement screenshot capture in a centralized exception handler or TestNG/JUnit listener. This ensures consistent screenshot capture across all test failures without duplicating code.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which design pattern is most suitable for implementing retry logic for flaky tests?',
          options: [
            'Singleton Pattern',
            'Factory Pattern',
            'Retry Pattern with exponential backoff',
            'Observer Pattern'
          ],
          correctAnswer: 2,
          explanation: 'The Retry Pattern with exponential backoff is ideal for handling flaky tests. It attempts to re-execute failed operations with increasing delays between retries, which helps handle transient failures.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'When creating custom exceptions in a framework, which class should they typically extend?',
          options: [
            'Exception',
            'RuntimeException',
            'Throwable',
            'Error'
          ],
          correctAnswer: 1,
          explanation: 'Custom exceptions in automation frameworks typically extend RuntimeException (unchecked exceptions) to avoid forcing every method to declare throws clauses, making the framework API cleaner and more flexible.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of logging exceptions in an automation framework?',
          options: [
            'To slow down test execution',
            'To provide detailed diagnostic information for debugging failures',
            'To replace test reports',
            'To prevent exceptions from occurring'
          ],
          correctAnswer: 1,
          explanation: 'Logging exceptions provides detailed diagnostic information including stack traces, context, and timing which is essential for debugging test failures, especially in CI/CD environments where tests run unattended.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'Which exception occurs when trying to interact with an element that is present in DOM but not visible?',
          options: [
            'NoSuchElementException',
            'ElementNotVisibleException',
            'ElementNotInteractableException',
            'HiddenElementException'
          ],
          correctAnswer: 2,
          explanation: 'ElementNotInteractableException is thrown when an element is present in the DOM but cannot be interacted with, typically because it is not visible, not enabled, or is obscured by another element.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the best practice for handling NoSuchElementException in framework design?',
          options: [
            'Always catch and suppress the exception',
            'Implement explicit waits before element interactions',
            'Increase implicit wait to maximum',
            'Use Thread.sleep() before every action'
          ],
          correctAnswer: 1,
          explanation: 'Implementing explicit waits (WebDriverWait with ExpectedConditions) before element interactions is the best practice. This provides intelligent waiting that polls for conditions, avoiding NoSuchElementException.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'In a Page Object Model, where should exception recovery logic ideally be placed?',
          options: [
            'In page object methods',
            'In utility/helper classes or base test classes',
            'In test data files',
            'In locator definitions'
          ],
          correctAnswer: 1,
          explanation: 'Exception recovery logic should be placed in utility/helper classes or base test classes. This centralizes error handling, makes it reusable, and keeps page objects focused on page interactions.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which logging level is most appropriate for logging caught exceptions?',
          options: [
            'INFO',
            'DEBUG',
            'ERROR',
            'TRACE'
          ],
          correctAnswer: 2,
          explanation: 'ERROR level is most appropriate for logging exceptions as they represent error conditions that need attention. This helps in quickly identifying and filtering critical issues in logs.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the recommended maximum number of retry attempts for a flaky test?',
          options: [
            '1-2 retries',
            '10-15 retries',
            'Unlimited retries',
            'No retries, fix the test instead'
          ],
          correctAnswer: 0,
          explanation: 'Best practice is 1-2 retries maximum for genuinely flaky tests. More retries mask underlying issues. The real focus should be on fixing flaky tests rather than relying heavily on retry mechanisms.',
          points: 3
        }
      ]
    },
    {
      title: "Section B: True/False Questions",
      description: "Indicate whether each statement is true or false (2 points each)",
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'A finally block in Java is always executed, even if an exception is thrown in the try block.',
          correctAnswer: true,
          explanation: 'True. The finally block always executes regardless of whether an exception is thrown or caught, making it ideal for cleanup operations like closing resources or taking screenshots.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'StaleElementReferenceException can be resolved by re-locating the element after the DOM changes.',
          correctAnswer: true,
          explanation: 'True. When a StaleElementReferenceException occurs, the element needs to be re-located using the locator strategy to get a fresh reference from the current DOM state.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'Custom exceptions should always be checked exceptions (extend Exception class).',
          correctAnswer: false,
          explanation: 'False. In automation frameworks, custom exceptions typically extend RuntimeException (unchecked) to avoid cluttering method signatures with throws declarations and provide more flexibility.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'Using try-catch blocks around every line of code is considered a best practice in automation frameworks.',
          correctAnswer: false,
          explanation: 'False. Excessive try-catch blocks make code hard to read and maintain. Exceptions should be handled at appropriate abstraction levels, typically at test method or framework utility level.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'TestNG IRetryAnalyzer interface can be used to implement automatic retry logic for failed tests.',
          correctAnswer: true,
          explanation: 'True. TestNG provides IRetryAnalyzer interface which allows implementing custom retry logic. Failed tests can be automatically retried based on the logic defined in the retry method.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Screenshots should be taken before throwing an exception to capture the exact failure state.',
          correctAnswer: true,
          explanation: 'True. Screenshots should be captured at the point of failure, before the exception propagates. This provides the exact visual state when the error occurred, which is crucial for debugging.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'It is acceptable to use empty catch blocks to suppress exceptions in production framework code.',
          correctAnswer: false,
          explanation: 'False. Empty catch blocks (swallowing exceptions) are poor practice. They hide errors, make debugging difficult, and can lead to unexpected behavior. Always log or handle exceptions appropriately.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'WebDriverException is the parent class for all Selenium-specific exceptions.',
          correctAnswer: true,
          explanation: 'True. WebDriverException is the base exception class in Selenium. All Selenium-specific exceptions like NoSuchElementException, TimeoutException, etc., extend from WebDriverException.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Exception handling can completely eliminate flaky tests in automation frameworks.',
          correctAnswer: false,
          explanation: 'False. Exception handling helps manage failures gracefully but cannot eliminate flakiness. Flaky tests are caused by timing issues, environment instability, or poor synchronization which require root cause fixes.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'The @Test(expectedExceptions) annotation causes a test to pass when the specified exception is thrown.',
          correctAnswer: true,
          explanation: 'True. When using @Test(expectedExceptions = ExceptionClass.class), TestNG expects that specific exception to be thrown. The test passes if it is thrown and fails if it is not thrown.',
          points: 2
        }
      ]
    },
    {
      title: "Section C: Fill in the Blanks",
      description: "Complete each statement with the correct term (4 points each)",
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ exception is thrown when a frame or window target cannot be found in Selenium.',
          correctAnswer: 'NoSuchFrameException',
          explanation: 'NoSuchFrameException is thrown when WebDriver attempts to switch to a frame or window that does not exist. This commonly occurs when frame indexes, names, or window handles are incorrect.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In TestNG, the __________ interface is implemented to provide custom retry logic for failed test methods.',
          correctAnswer: 'IRetryAnalyzer',
          explanation: 'IRetryAnalyzer is a TestNG interface that allows implementing custom retry logic. By implementing the retry() method, you can control how many times and under what conditions a failed test should be retried.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ class is used to capture screenshots in Selenium when exceptions occur.',
          correctAnswer: 'TakesScreenshot',
          explanation: 'TakesScreenshot is an interface in Selenium that provides the getScreenshotAs() method to capture screenshots. WebDriver instance is cast to TakesScreenshot to capture failure screenshots.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ pattern with increasing delays between retries is recommended for handling transient failures in automation.',
          correctAnswer: 'exponential backoff',
          explanation: 'Exponential backoff is a retry pattern where the wait time between retry attempts increases exponentially. This prevents overwhelming the system and gives more time for transient issues to resolve.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'In a framework, __________ exceptions extend RuntimeException and are used to represent domain-specific error conditions.',
          correctAnswer: 'custom',
          explanation: 'Custom exceptions are framework-specific exceptions that extend RuntimeException. They represent domain-specific errors like InvalidTestDataException, PageLoadException, etc., providing meaningful error context.',
          points: 4
        }
      ]
    },
    {
      title: "Section D: Short Answer Questions",
      description: "Provide detailed answers for each question (8 points each)",
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the strategy for handling StaleElementReferenceException in a robust automation framework. Include at least three specific techniques.',
          keywords: ['re-locate', 'retry', 'ExpectedConditions', 'wait', 'explicit', 'FluentWait', 'staleness', 'refresh', 'DOM', 'wrapper', 'method'],
          minKeywords: 2,
          sampleAnswer: 'To handle StaleElementReferenceException in a robust framework: (1) Implement a retry mechanism that catches the exception and re-locates the element using the original locator strategy, attempting the action again with the fresh reference. (2) Use explicit waits with ExpectedConditions.refreshed() or ExpectedConditions.stalenessOf() to wait for elements to become stale and then re-locate them. (3) Create wrapper methods in a base page class that automatically handle element staleness by catching the exception and retrying the operation. (4) Minimize DOM manipulations and ensure proper synchronization using WebDriverWait before interactions. (5) Avoid storing element references for long periods; instead, use By locators and locate elements fresh when needed.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to implement a centralized exception handling mechanism using TestNG listeners. What are the key methods to override?',
          keywords: ['ITestListener', 'onTestFailure', 'ITestResult', 'screenshot', 'Throwable', 'logging', 'extent', 'report', 'getThrowable', 'TestNG', 'annotation'],
          minKeywords: 2,
          sampleAnswer: 'To implement centralized exception handling using TestNG listeners: Create a class that implements ITestListener interface. Override the onTestFailure(ITestResult result) method which is called when a test fails. Inside this method, retrieve the exception using result.getThrowable(), capture screenshots using TakesScreenshot, and log the exception details including stack trace and test context. Also override onTestSkipped() for handling skipped tests. The listener can be registered using @Listeners annotation at class level or in testng.xml. Additional methods like onTestStart(), onTestSuccess() can be overridden for comprehensive test lifecycle management. This approach centralizes failure handling, screenshot capture, and logging without duplicating code in test methods.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the best practices for creating and using custom exceptions in a Selenium automation framework? Provide specific examples.',
          keywords: ['RuntimeException', 'extend', 'meaningful', 'message', 'constructor', 'cause', 'context', 'domain-specific', 'custom', 'PageLoadException', 'TestDataException', 'hierarchy'],
          minKeywords: 2,
          sampleAnswer: 'Best practices for custom exceptions in Selenium frameworks: (1) Extend RuntimeException rather than Exception to avoid cluttering method signatures with throws declarations. (2) Create domain-specific exceptions like PageLoadException, InvalidTestDataException, ElementNotReadyException that provide meaningful context. (3) Provide multiple constructors accepting message and cause (Throwable) to chain exceptions. (4) Include relevant context information in exception messages like element locators, page URLs, or test data. (5) Create an exception hierarchy with a base FrameworkException class that all custom exceptions extend. (6) Override getMessage() to provide detailed, actionable error messages. Example: public class ElementNotReadyException extends RuntimeException { public ElementNotReadyException(String locator, Throwable cause) { super("Element not ready: " + locator, cause); } }',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement an intelligent retry mechanism with exponential backoff for handling flaky Selenium tests. Include code structure.',
          keywords: ['retry', 'exponential', 'backoff', 'delay', 'Thread.sleep', 'attempt', 'maxRetries', 'loop', 'catch', 'increasing', 'interval', 'IRetryAnalyzer', 'count'],
          minKeywords: 2,
          sampleAnswer: 'To implement retry with exponential backoff: Create a retry method that accepts the operation (as lambda or functional interface), maximum retry attempts, and initial delay. Use a loop that catches exceptions and retries with increasing delays. The delay doubles with each retry (exponential backoff): delay = initialDelay * Math.pow(2, attemptNumber). Example structure: public <T> T retryWithBackoff(Supplier<T> operation, int maxRetries, long initialDelay) { int attempt = 0; while (attempt < maxRetries) { try { return operation.get(); } catch (Exception e) { attempt++; if (attempt >= maxRetries) throw e; long delay = initialDelay * (long)Math.pow(2, attempt); Thread.sleep(delay); } } }. For TestNG, implement IRetryAnalyzer with similar logic in the retry() method, tracking retry count and applying backoff delays.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe a comprehensive strategy for exception logging in an automation framework. What information should be logged and what logging framework should be used?',
          keywords: ['Log4j', 'SLF4J', 'logger', 'ERROR', 'stack trace', 'timestamp', 'test name', 'screenshot', 'context', 'printStackTrace', 'getMessage', 'level', 'file', 'console'],
          minKeywords: 2,
          sampleAnswer: 'A comprehensive exception logging strategy should: (1) Use a logging framework like Log4j2 or SLF4J with Logback for structured logging. (2) Log at appropriate levels - ERROR for exceptions, WARN for recoverable issues, INFO for test flow. (3) Include essential information: exception type and message, complete stack trace, timestamp, test method name, thread ID, and test context (browser, environment). (4) Capture and reference screenshot paths in logs. (5) Configure separate log files for different concerns (errors, all tests, performance). (6) Use MDC (Mapped Diagnostic Context) to add contextual information like test ID. Example: logger.error("Test failed: {} | Browser: {} | Screenshot: {}", testName, browser, screenshotPath, exception). (7) Implement a custom logger wrapper that automatically includes framework context. (8) Configure log rotation and retention policies for CI/CD environments.',
          points: 8
        }
      ]
    }
  ]
};
