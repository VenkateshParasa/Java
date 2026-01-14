export default {
  title: "Day 22: TestNG Part 5 - Parallel Execution & Advanced Features Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 12,
      description: "A quick 12-minute assessment covering key parallel execution and advanced TestNG concepts"
    },
    full: {
      title: "Full Assessment (26 questions)",
      timeLimit: 24,
      description: "Comprehensive 24-minute assessment covering all parallel execution, listeners, and advanced TestNG features"
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
          question: 'Which attribute in testng.xml is used to enable parallel test execution?',
          options: [
            'thread="parallel"',
            'parallel="tests"',
            'execution="parallel"',
            'mode="parallel"'
          ],
          correctAnswer: 1,
          explanation: 'The parallel attribute in the <suite> or <test> tag enables parallel execution. Example: <suite name="ParallelSuite" parallel="tests">',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['full'],
          question: 'What are the valid values for the parallel attribute in TestNG?',
          options: [
            'methods, tests, classes',
            'methods, tests, classes, instances',
            'threads, methods, classes',
            'tests, suites, methods'
          ],
          correctAnswer: 1,
          explanation: 'TestNG supports parallel execution at four levels: methods (test methods run in parallel), tests (test tags run in parallel), classes (test classes run in parallel), and instances (instances of the same class run in parallel).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which parallel mode runs all test methods within a suite in parallel?',
          options: [
            'parallel="tests"',
            'parallel="methods"',
            'parallel="classes"',
            'parallel="suite"'
          ],
          correctAnswer: 1,
          explanation: 'parallel="methods" runs all @Test methods in parallel across all test classes in the suite, providing the finest level of parallelism.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'Why is ThreadLocal<WebDriver> necessary for parallel test execution?',
          options: [
            'To improve performance',
            'To ensure each thread has its own WebDriver instance',
            'To share WebDriver between threads',
            'To reduce memory usage'
          ],
          correctAnswer: 1,
          explanation: 'ThreadLocal<WebDriver> ensures thread safety by giving each thread its own isolated WebDriver instance, preventing conflicts when tests run in parallel.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the TestNG ITestListener interface allow you to do?',
          options: [
            'Execute tests in parallel',
            'Listen to test events and customize behavior',
            'Configure test parameters',
            'Generate test data'
          ],
          correctAnswer: 1,
          explanation: 'ITestListener provides callback methods like onTestStart(), onTestSuccess(), onTestFailure() that allow you to listen to test execution events and perform custom actions.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which annotation is used to define a TestNG listener class?',
          options: [
            '@Listener',
            '@TestListener',
            '@Listeners',
            '@EventListener'
          ],
          correctAnswer: 2,
          explanation: '@Listeners annotation is used to attach listener classes to test classes. Example: @Listeners(MyTestListener.class)',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the IRetryAnalyzer interface in TestNG?',
          options: [
            'To analyze test performance',
            'To automatically retry failed tests',
            'To schedule test execution',
            'To group tests'
          ],
          correctAnswer: 1,
          explanation: 'IRetryAnalyzer allows you to implement custom retry logic for failed tests. It has a retry() method that returns true if the test should be retried.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What is a TestNG Factory (@Factory)?',
          options: [
            'A design pattern for creating test classes',
            'A way to create multiple instances of test classes at runtime',
            'A method to generate test reports',
            'A configuration for parallel execution'
          ],
          correctAnswer: 1,
          explanation: '@Factory allows you to create and return multiple instances of test classes dynamically at runtime, useful for running same tests with different configurations.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which class in TestNG provides soft assertion functionality?',
          options: [
            'Assert',
            'SoftAssert',
            'AssertAll',
            'ContinueAssert'
          ],
          correctAnswer: 1,
          explanation: 'SoftAssert class allows assertions to continue even after failures, collecting all failures to report at the end using assertAll().',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which listener method is called when a test starts executing?',
          options: [
            'onStart()',
            'onTestStart()',
            'beforeTest()',
            'testStarted()'
          ],
          correctAnswer: 1,
          explanation: 'The onTestStart(ITestResult result) method from ITestListener is called when a test method begins execution.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the difference between parallel="tests" and parallel="classes"?',
          options: [
            'No difference',
            'tests runs <test> tags in parallel, classes runs test classes in parallel',
            'tests is faster than classes',
            'classes can only run two threads'
          ],
          correctAnswer: 1,
          explanation: 'parallel="tests" runs different <test> tags from testng.xml in parallel. parallel="classes" runs test classes within tests in parallel.',
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
          id: 'q12',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'ThreadLocal ensures that each thread gets its own copy of a variable.',
          correctAnswer: true,
          explanation: 'True. ThreadLocal provides thread-local variables where each thread has its own independently initialized copy, ensuring thread safety in parallel execution.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q13',
          type: 'truefalse',
          mode: ['full'],
          question: 'Parallel execution always makes tests run faster.',
          correctAnswer: false,
          explanation: 'False. Parallel execution depends on available resources (CPU cores, memory). Too many parallel threads can cause resource contention and actually slow down execution.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'truefalse',
          mode: ['full'],
          question: 'SoftAssert must be created as a new instance in each test method.',
          correctAnswer: true,
          explanation: 'True. SoftAssert should be instantiated fresh in each test method to avoid assertion failures from one test affecting another test.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'ITestListener can be implemented to take screenshots on test failure.',
          correctAnswer: true,
          explanation: 'True. The onTestFailure() method in ITestListener is commonly used to capture screenshots when tests fail, providing visual debugging information.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'The thread-count attribute can be set at both suite and test level.',
          correctAnswer: true,
          explanation: 'True. thread-count can be specified in both <suite> and <test> tags, with test-level settings overriding suite-level settings.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'Suite-level parameters defined in testng.xml can be accessed using @Parameters annotation.',
          correctAnswer: true,
          explanation: 'True. Parameters defined in <suite> or <test> tags can be injected into test methods using @Parameters annotation.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'When using parallel execution, all tests must be completely independent.',
          correctAnswer: true,
          explanation: 'True. For parallel execution to work correctly, tests must be independent with no shared state or dependencies between them.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'IRetryAnalyzer retry() method should return false to retry a failed test.',
          correctAnswer: false,
          explanation: 'False. The retry() method should return true to retry the test, and false to stop retrying.',
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
          id: 'q20',
          type: 'fillblank',
          mode: ['full'],
          question: 'To enable parallel execution at method level, use parallel="_____" in testng.xml.',
          correctAnswer: 'methods',
          acceptedAnswers: ['methods', 'method'],
          explanation: 'parallel="methods" runs all test methods in parallel across the suite.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ attribute specifies the maximum number of threads for parallel execution.',
          correctAnswer: 'thread-count',
          acceptedAnswers: ['thread-count', 'threadCount'],
          explanation: 'thread-count attribute defines how many threads TestNG will use for parallel test execution.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q22',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The _____ class provides thread-local storage for variables like WebDriver.',
          correctAnswer: 'ThreadLocal',
          acceptedAnswers: ['ThreadLocal', 'threadlocal'],
          explanation: 'ThreadLocal<T> class provides thread-local variables, ensuring each thread has its own isolated copy.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q23',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ interface is used to implement custom test listeners in TestNG.',
          correctAnswer: 'ITestListener',
          acceptedAnswers: ['ITestListener', 'itestlistener'],
          explanation: 'ITestListener interface provides callback methods for various test execution events.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'When using SoftAssert, you must call _____ at the end to verify all assertions.',
          correctAnswer: 'assertAll()',
          acceptedAnswers: ['assertAll()', 'assertAll', 'softAssert.assertAll()'],
          explanation: 'assertAll() method throws an exception if any soft assertions failed during the test.',
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
          id: 'q25',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Explain the purpose of ThreadLocal in parallel test execution and provide an example.',
          sampleAnswer: 'ThreadLocal provides thread-local variables that are isolated for each thread, essential for parallel test execution. In Selenium automation, each test thread needs its own WebDriver instance. Example: private static ThreadLocal<WebDriver> driver = new ThreadLocal<>(); To set: driver.set(new ChromeDriver()); To get: driver.get().findElement(By.id("...")); This ensures each parallel test has its own browser instance without interference.',
          keywords: ['ThreadLocal', 'thread-local', 'WebDriver', 'parallel', 'isolated', 'set', 'get', 'instance'],
          minKeywords: 4,
          explanation: 'ThreadLocal ensures each thread has its own isolated copy of WebDriver, preventing conflicts in parallel execution.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q26',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Compare hard assertions (Assert) and soft assertions (SoftAssert) with use cases for each.',
          sampleAnswer: 'Hard assertions (Assert.assertEquals()) immediately stop test execution when assertion fails, marking the test as failed. Use when failure makes further testing meaningless (e.g., login failure). Soft assertions (SoftAssert) continue execution after failures, collecting all failures and reporting at end with assertAll(). Use for comprehensive validation where you want to check multiple conditions and report all failures together (e.g., validating multiple fields on a form). Example: SoftAssert soft = new SoftAssert(); soft.assertEquals(title, expected); soft.assertTrue(isDisplayed); soft.assertAll();',
          keywords: ['Assert', 'SoftAssert', 'stop', 'continue', 'immediately', 'assertAll', 'failure', 'hard', 'soft', 'multiple'],
          minKeywords: 5,
          explanation: 'Hard assertions stop immediately on failure; soft assertions collect all failures and report at end using assertAll().',
          points: 5,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
