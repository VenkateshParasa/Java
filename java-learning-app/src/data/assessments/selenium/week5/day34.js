export default {
  title: "Day 34: TestNG Part 5 - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key parallel execution and suite configuration concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all TestNG parallel execution and suite configuration topics"
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
          question: 'Which attribute in testng.xml is used to enable parallel execution?',
          options: [
            'parallel-mode',
            'parallel',
            'execution-mode',
            'threading'
          ],
          correctAnswer: 1,
          explanation: 'The parallel attribute in the <suite> or <test> tag is used to enable parallel execution in TestNG.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What are the valid values for the parallel attribute in TestNG?',
          options: [
            'methods, classes, tests, instances',
            'tests, methods, functions, suites',
            'parallel, sequential, mixed',
            'single, multi, distributed'
          ],
          correctAnswer: 0,
          explanation: 'TestNG supports parallel execution at four levels: methods, classes, tests, and instances.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which attribute controls the number of threads to be used for parallel execution?',
          options: [
            'thread-pool',
            'thread-count',
            'parallel-threads',
            'max-threads'
          ],
          correctAnswer: 1,
          explanation: 'The thread-count attribute specifies the maximum number of threads that TestNG should use for parallel execution.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'What does parallel="methods" mean in TestNG?',
          options: [
            'All test methods in all classes run in parallel',
            'Each test method runs in its own thread',
            'Methods from the same class run sequentially, different classes run in parallel',
            'Only @Test methods run in parallel, setup methods run sequentially'
          ],
          correctAnswer: 1,
          explanation: 'When parallel="methods", TestNG will run all test methods in separate threads. All methods, regardless of class, can run concurrently.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of ThreadLocal in parallel test execution?',
          options: [
            'To increase test execution speed',
            'To create thread-safe variables that have independent values per thread',
            'To limit the number of threads running',
            'To synchronize test execution'
          ],
          correctAnswer: 1,
          explanation: 'ThreadLocal provides thread-local variables where each thread has its own independent copy of the variable, preventing thread interference.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which TestNG annotation method runs once per thread when using parallel execution?',
          options: [
            '@BeforeSuite',
            '@BeforeClass',
            '@BeforeMethod',
            '@BeforeTest'
          ],
          correctAnswer: 1,
          explanation: '@BeforeClass runs once per class instance, and when using parallel="methods" or "instances", each thread may have its own class instance.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the difference between parallel="classes" and parallel="methods"?',
          options: [
            'No difference, both run tests in parallel',
            'classes runs test classes in parallel but methods within a class sequentially; methods runs all test methods in parallel',
            'classes is faster than methods',
            'methods requires ThreadLocal, classes does not'
          ],
          correctAnswer: 1,
          explanation: 'parallel="classes" runs different test classes in parallel but methods within each class run sequentially. parallel="methods" runs all test methods in parallel regardless of class.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you specify a thread pool size for a specific @Test method?',
          options: [
            '@Test(threadPoolSize = 5)',
            '@Test(threads = 5)',
            '@Test(parallel = 5)',
            '@Test(poolSize = 5)'
          ],
          correctAnswer: 0,
          explanation: 'The threadPoolSize attribute in @Test annotation creates a thread pool for that specific test method, running it multiple times concurrently.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the invocationCount attribute do when combined with threadPoolSize?',
          options: [
            'It limits the number of threads',
            'It specifies how many times the test method should be executed',
            'It sets the timeout for each invocation',
            'It determines the priority of execution'
          ],
          correctAnswer: 1,
          explanation: 'invocationCount specifies how many times a test method should run. When combined with threadPoolSize, these invocations are distributed across multiple threads.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which tag in testng.xml is used to group multiple <test> tags together?',
          options: [
            '<suite>',
            '<group>',
            '<tests>',
            '<collection>'
          ],
          correctAnswer: 0,
          explanation: 'The <suite> tag is the root element in testng.xml that contains one or more <test> tags and defines suite-level configuration.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the data-provider-thread-count attribute?',
          options: [
            'It controls how many tests can run in parallel',
            'It specifies the number of threads for data provider execution',
            'It limits the number of data sets',
            'It controls class instantiation'
          ],
          correctAnswer: 1,
          explanation: 'The data-provider-thread-count attribute specifies how many threads TestNG should use to run data provider methods in parallel.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'When using parallel="tests", what runs in parallel?',
          options: [
            'All test methods',
            'All test classes',
            'All <test> tags in the suite',
            'All test suites'
          ],
          correctAnswer: 2,
          explanation: 'When parallel="tests", TestNG runs all <test> tags defined in the XML file in parallel, but tests within each <test> tag run sequentially.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the main challenge when running Selenium tests in parallel?',
          options: [
            'TestNG does not support parallel execution',
            'Tests run slower in parallel',
            'Managing thread-safe WebDriver instances',
            'XML configuration is not supported'
          ],
          correctAnswer: 2,
          explanation: 'The main challenge is ensuring each thread has its own WebDriver instance to avoid conflicts. This is typically solved using ThreadLocal.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method is used to get the value from a ThreadLocal variable?',
          options: [
            'ThreadLocal.getValue()',
            'ThreadLocal.fetch()',
            'ThreadLocal.get()',
            'ThreadLocal.retrieve()'
          ],
          correctAnswer: 2,
          explanation: 'The get() method is used to retrieve the current thread\'s value of a ThreadLocal variable.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens if you do not specify thread-count when using parallel execution?',
          options: [
            'TestNG uses a default value of 5',
            'Parallel execution is disabled',
            'TestNG creates unlimited threads',
            'An error is thrown'
          ],
          correctAnswer: 0,
          explanation: 'If thread-count is not specified, TestNG uses a default value of 5 threads for parallel execution.',
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
          question: 'TestNG supports parallel execution at the suite level.',
          correctAnswer: true,
          explanation: 'True. TestNG supports parallel execution at multiple levels including suites, tests, classes, methods, and instances.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'ThreadLocal variables are shared across all threads in a parallel execution.',
          correctAnswer: false,
          explanation: 'False. ThreadLocal variables are thread-specific, meaning each thread has its own independent copy of the variable.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'When using parallel="classes", methods within the same class run in parallel.',
          correctAnswer: false,
          explanation: 'False. With parallel="classes", different classes run in parallel but methods within the same class run sequentially.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'The thread-count attribute can be specified at both suite and test levels.',
          correctAnswer: true,
          explanation: 'True. You can specify thread-count at the suite level for all tests, or override it at individual test levels.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Using ThreadLocal WebDriver requires calling remove() to prevent memory leaks.',
          correctAnswer: true,
          explanation: 'True. ThreadLocal.remove() should be called to clear the thread-local value and prevent memory leaks, especially in thread pool environments.',
          points: 2,
          difficulty: 'hard'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: '@BeforeSuite methods run in parallel when parallel execution is enabled.',
          correctAnswer: false,
          explanation: 'False. @BeforeSuite and @AfterSuite methods always run once per suite, not in parallel, regardless of parallel execution settings.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Parallel execution always improves test execution time.',
          correctAnswer: false,
          explanation: 'False. Parallel execution can reduce execution time but depends on factors like test independence, resource availability, and system capabilities.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'The parallel attribute can be set to "instances" to run data provider iterations in parallel.',
          correctAnswer: false,
          explanation: 'False. parallel="instances" creates a new instance of the test class for each test method. For data provider parallelization, use data-provider-thread-count.',
          points: 2,
          difficulty: 'hard'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can mix different parallel modes in the same testng.xml file for different test tags.',
          correctAnswer: true,
          explanation: 'True. Different <test> tags can have different parallel settings, allowing flexible execution strategies within the same suite.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'TestNG guarantees the order of test execution when using parallel execution.',
          correctAnswer: false,
          explanation: 'False. Parallel execution makes test order non-deterministic. Use dependencies or priority if order matters, but this may reduce parallelism.',
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
          question: 'To enable parallel execution in testng.xml, use the _____ attribute in the suite or test tag.',
          correctAnswer: 'parallel',
          acceptedAnswers: ['parallel', 'parallel attribute'],
          explanation: 'The parallel attribute is used to enable and configure parallel execution mode in TestNG.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The _____ class is used to create thread-safe variables where each thread has its own copy.',
          correctAnswer: 'ThreadLocal',
          acceptedAnswers: ['ThreadLocal', 'ThreadLocal<T>', 'ThreadLocal class'],
          explanation: 'ThreadLocal is a Java class that provides thread-local variables, ensuring each thread has an independent copy.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To set the number of threads for parallel execution, use the _____ attribute in testng.xml.',
          correctAnswer: 'thread-count',
          acceptedAnswers: ['thread-count', 'threadCount', 'thread count'],
          explanation: 'The thread-count attribute specifies the maximum number of threads TestNG should use for parallel execution.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'To store a value in a ThreadLocal variable, you call the _____ method.',
          correctAnswer: 'set()',
          acceptedAnswers: ['set()', 'set', 'set method'],
          explanation: 'The set() method is used to set the current thread\'s value for a ThreadLocal variable.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To run a test method 10 times with 3 threads, use @Test(invocationCount = 10, _____ = 3).',
          correctAnswer: 'threadPoolSize',
          acceptedAnswers: ['threadPoolSize', 'thread-pool-size'],
          explanation: 'The threadPoolSize attribute specifies how many threads should be used to execute the invocations of a test method.',
          points: 3,
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
          question: 'What are the four parallel execution modes supported by TestNG?',
          sampleAnswer: 'TestNG supports four parallel execution modes: 1) methods - all test methods run in parallel, 2) classes - all test classes run in parallel, 3) tests - all <test> tags run in parallel, and 4) instances - creates new instances of test classes for each method and runs them in parallel.',
          keywords: ['methods', 'classes', 'tests', 'instances', 'parallel', 'test methods', 'test classes'],
          minKeywords: 4,
          explanation: 'TestNG provides four levels of parallelism: methods, classes, tests, and instances, each offering different granularity of parallel execution.',
          points: 4,
          difficulty: 'easy'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Explain what ThreadLocal is and why it is important for parallel Selenium test execution.',
          sampleAnswer: 'ThreadLocal is a Java class that provides thread-local variables, where each thread accessing the variable has its own independent copy. In parallel Selenium testing, ThreadLocal is crucial for maintaining separate WebDriver instances for each thread, preventing thread interference and ensuring test isolation. Without ThreadLocal, multiple threads would share the same WebDriver instance, causing conflicts and unpredictable behavior.',
          keywords: ['ThreadLocal', 'thread-local', 'independent', 'WebDriver', 'thread', 'isolation', 'separate', 'copy', 'parallel'],
          minKeywords: 4,
          explanation: 'ThreadLocal ensures each thread has its own WebDriver instance, preventing conflicts in parallel execution.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How do you configure TestNG to run test methods in parallel with a maximum of 3 threads? Provide the XML configuration.',
          sampleAnswer: 'To run test methods in parallel with 3 threads, configure the testng.xml as follows: <suite name="Parallel Suite" parallel="methods" thread-count="3">. This sets the parallel attribute to "methods" to enable method-level parallelism and thread-count to "3" to limit execution to 3 concurrent threads.',
          keywords: ['suite', 'parallel', 'methods', 'thread-count', '3', 'testng.xml', 'XML', 'configuration'],
          minKeywords: 4,
          explanation: 'Use parallel="methods" and thread-count="3" in the <suite> tag to run test methods in parallel with 3 threads.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe the basic structure for implementing ThreadLocal WebDriver in a test class.',
          sampleAnswer: 'To implement ThreadLocal WebDriver: 1) Declare a private static ThreadLocal<WebDriver> variable: private static ThreadLocal<WebDriver> driver = new ThreadLocal<>(); 2) Create a method to initialize and set the driver: driver.set(new ChromeDriver()); 3) Create a getter method to retrieve the driver: return driver.get(); 4) In @AfterMethod or teardown, quit the driver and remove it: driver.get().quit(); driver.remove();',
          keywords: ['ThreadLocal', 'WebDriver', 'static', 'set', 'get', 'remove', 'private', 'quit', 'initialize'],
          minKeywords: 5,
          explanation: 'ThreadLocal WebDriver implementation requires declaration, set() for initialization, get() for retrieval, and remove() for cleanup.',
          points: 5,
          difficulty: 'hard'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the difference between using parallel="classes" versus parallel="methods", and when would you choose one over the other?',
          sampleAnswer: 'parallel="classes" runs different test classes in parallel, but methods within each class execute sequentially. This is useful when classes have shared state or sequential dependencies. parallel="methods" runs all test methods in parallel regardless of class, providing maximum parallelism but requiring complete test independence. Choose "classes" when tests within a class need to run in order or share setup/teardown. Choose "methods" when all tests are independent and you want fastest execution.',
          keywords: ['classes', 'methods', 'parallel', 'sequential', 'independent', 'shared state', 'dependencies', 'execution'],
          minKeywords: 4,
          explanation: 'classes mode runs classes in parallel but methods sequentially within each class; methods mode runs all methods in parallel for maximum speed.',
          points: 5,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
