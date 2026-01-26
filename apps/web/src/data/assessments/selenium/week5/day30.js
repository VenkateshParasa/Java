export default {
  title: "Day 30: TestNG Part 1 - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key TestNG concepts and annotations"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all TestNG Part 1 topics"
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
          question: 'What is TestNG?',
          options: [
            'A Java compiler',
            'A testing framework inspired by JUnit and NUnit',
            'A web browser automation tool',
            'A Java IDE'
          ],
          correctAnswer: 1,
          explanation: 'TestNG is a testing framework for Java inspired by JUnit and NUnit, designed to cover all categories of tests including unit, functional, end-to-end, and integration testing.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which annotation is used to mark a method as a test method in TestNG?',
          options: [
            '@TestMethod',
            '@Test',
            '@TestCase',
            '@Execute'
          ],
          correctAnswer: 1,
          explanation: '@Test annotation is used to mark a method as a test method in TestNG. This is the most fundamental annotation in TestNG.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the execution order of the following TestNG annotations?\n1. @BeforeMethod\n2. @Test\n3. @AfterMethod\n4. @BeforeClass',
          options: [
            '@BeforeClass -> @BeforeMethod -> @Test -> @AfterMethod',
            '@BeforeMethod -> @BeforeClass -> @Test -> @AfterMethod',
            '@Test -> @BeforeClass -> @BeforeMethod -> @AfterMethod',
            '@BeforeClass -> @Test -> @BeforeMethod -> @AfterMethod'
          ],
          correctAnswer: 0,
          explanation: '@BeforeClass runs once before all test methods in a class, @BeforeMethod runs before each test method, @Test is the test method itself, and @AfterMethod runs after each test method.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'Which annotation executes once before all tests in the current test class?',
          options: [
            '@BeforeTest',
            '@BeforeClass',
            '@BeforeSuite',
            '@BeforeMethod'
          ],
          correctAnswer: 1,
          explanation: '@BeforeClass annotation runs once before the first test method in the current class. It is typically used for class-level initialization.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the @BeforeSuite annotation?',
          options: [
            'Runs before each test method',
            'Runs before all tests in all classes',
            'Runs before the first test in each class',
            'Runs before each test suite defined in testng.xml'
          ],
          correctAnswer: 3,
          explanation: '@BeforeSuite runs once before all tests in the suite. It is the first annotation to execute in the TestNG lifecycle when defined in testng.xml.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which TestNG attribute allows you to disable a test method without commenting it out?',
          options: [
            'skip = true',
            'enabled = false',
            'disabled = true',
            'ignore = true'
          ],
          correctAnswer: 1,
          explanation: 'The enabled = false attribute in @Test annotation disables the test method without removing or commenting the code: @Test(enabled = false).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the priority attribute in @Test annotation do?',
          options: [
            'Sets the importance level of the test',
            'Controls the execution order of test methods',
            'Defines how many times a test should run',
            'Sets the timeout for the test'
          ],
          correctAnswer: 1,
          explanation: 'The priority attribute controls the execution order of test methods. Lower priority values execute first: @Test(priority = 1) runs before @Test(priority = 2).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Which annotation runs after each test method in a class?',
          options: [
            '@AfterTest',
            '@AfterClass',
            '@AfterMethod',
            '@AfterSuite'
          ],
          correctAnswer: 2,
          explanation: '@AfterMethod annotation executes after each test method in the class. It is commonly used for cleanup operations after individual tests.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of testng.xml file?',
          options: [
            'To compile TestNG tests',
            'To configure and organize test execution',
            'To store test data',
            'To generate test reports only'
          ],
          correctAnswer: 1,
          explanation: 'testng.xml is a configuration file used to organize and execute TestNG tests. It allows you to define test suites, groups, parallel execution, and parameters.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which of the following is the correct hierarchy of TestNG execution levels?',
          options: [
            'Suite -> Test -> Method -> Class',
            'Suite -> Test -> Class -> Method',
            'Suite -> Class -> Test -> Method',
            'Test -> Suite -> Class -> Method'
          ],
          correctAnswer: 1,
          explanation: 'The TestNG hierarchy is: Suite (highest level, defined in testng.xml) -> Test -> Class -> Method (lowest level). This reflects the execution structure.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the description attribute in @Test annotation do?',
          options: [
            'Provides documentation for the test method',
            'Sets the test method name',
            'Defines test categories',
            'Controls test execution'
          ],
          correctAnswer: 0,
          explanation: 'The description attribute provides documentation for the test method and appears in test reports: @Test(description = "Verify login functionality").',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which annotation should be used for one-time setup before any test in the test tag runs?',
          options: [
            '@BeforeClass',
            '@BeforeTest',
            '@BeforeSuite',
            '@BeforeMethod'
          ],
          correctAnswer: 1,
          explanation: '@BeforeTest runs once before any test method belonging to the classes inside the <test> tag in testng.xml. It is test-level configuration.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the default behavior when multiple @Test methods exist without priority?',
          options: [
            'They run in alphabetical order',
            'They run in random order',
            'They run in the order they appear in the class',
            'They do not run'
          ],
          correctAnswer: 2,
          explanation: 'By default, when no priority is specified, TestNG executes test methods in the order they appear in the class file.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which TestNG assertion class is commonly used for verifying conditions?',
          options: [
            'TestAssert',
            'Verify',
            'Assert',
            'Check'
          ],
          correctAnswer: 2,
          explanation: 'Assert class from org.testng.Assert is used for verifying conditions in TestNG tests. It provides methods like assertEquals(), assertTrue(), assertFalse(), etc.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What happens when an assertion fails in a TestNG test?',
          options: [
            'The test continues execution',
            'The test is marked as failed and execution stops for that test method',
            'All tests in the suite stop',
            'The assertion is ignored'
          ],
          correctAnswer: 1,
          explanation: 'When an assertion fails, TestNG marks the test as failed and stops execution of that particular test method. Other test methods continue to execute.',
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
          question: '@BeforeClass annotation runs before every test method in the class.',
          correctAnswer: false,
          explanation: 'False. @BeforeClass runs only once before all test methods in the class, not before every test method. @BeforeMethod runs before every test method.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'TestNG allows you to execute tests in parallel.',
          correctAnswer: true,
          explanation: 'True. TestNG provides built-in support for parallel test execution, which can be configured in testng.xml using parallel attribute.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'The @Test annotation must be imported from org.testng.annotations package.',
          correctAnswer: true,
          explanation: 'True. All TestNG annotations including @Test must be imported from org.testng.annotations package.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: '@AfterSuite is the last annotation to execute in the TestNG lifecycle.',
          correctAnswer: true,
          explanation: 'True. @AfterSuite executes after all tests in the suite have completed. It is the last annotation in the TestNG execution lifecycle.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'TestNG requires a main method to run tests.',
          correctAnswer: false,
          explanation: 'False. TestNG does not require a main method. Tests can be executed directly using TestNG runners, Maven, or testng.xml configuration.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can have multiple @Test annotations in a single class.',
          correctAnswer: true,
          explanation: 'True. A TestNG class can contain multiple @Test methods. Each method annotated with @Test is treated as an independent test case.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'The priority attribute accepts negative values.',
          correctAnswer: true,
          explanation: 'True. Priority can be any integer value including negative numbers. Lower values (including negatives) execute first.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: '@BeforeMethod runs before @BeforeClass in the execution order.',
          correctAnswer: false,
          explanation: 'False. @BeforeClass executes first (once before all tests), then @BeforeMethod executes before each test method.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'TestNG automatically generates HTML reports after test execution.',
          correctAnswer: true,
          explanation: 'True. TestNG automatically generates detailed HTML reports in the test-output folder after test execution, including pass/fail status and execution time.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'TestNG assertions and JUnit assertions are identical and interchangeable.',
          correctAnswer: false,
          explanation: 'False. While similar, TestNG has its own Assert class (org.testng.Assert) with some differences from JUnit assertions. They should not be mixed in TestNG tests.',
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
          question: 'The _____ annotation is used to mark a method as a test method in TestNG.',
          correctAnswer: '@Test',
          acceptedAnswers: ['@Test', '@test', 'Test'],
          explanation: '@Test is the fundamental annotation in TestNG that marks a method as a test case.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The TestNG configuration file is named _____.',
          correctAnswer: 'testng.xml',
          acceptedAnswers: ['testng.xml', 'TestNG.xml', 'TESTNG.xml'],
          explanation: 'testng.xml is the XML configuration file used to organize and execute TestNG test suites.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ attribute in @Test annotation is used to control the execution order of test methods.',
          correctAnswer: 'priority',
          acceptedAnswers: ['priority', 'Priority'],
          explanation: 'The priority attribute controls test execution order. Lower priority values execute first.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ annotation executes once before all test methods in the current class.',
          correctAnswer: '@BeforeClass',
          acceptedAnswers: ['@BeforeClass', '@beforeclass', 'BeforeClass'],
          explanation: '@BeforeClass runs once before any test method in the class, typically used for class-level setup.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To disable a test without deleting it, use the _____ attribute set to false in @Test annotation.',
          correctAnswer: 'enabled',
          acceptedAnswers: ['enabled', 'Enabled'],
          explanation: 'The enabled attribute when set to false (@Test(enabled = false)) disables the test without removing the code.',
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
          question: 'Explain the purpose of @BeforeMethod and @AfterMethod annotations with an example scenario.',
          sampleAnswer: '@BeforeMethod executes before each test method in a class, used for test-level setup like initializing WebDriver or opening a browser. @AfterMethod executes after each test method, used for cleanup like closing browser or clearing data. For example, in Selenium testing: @BeforeMethod initializes WebDriver before each test, and @AfterMethod closes the browser after each test completes, ensuring clean state for every test.',
          keywords: ['BeforeMethod', 'AfterMethod', 'before each', 'after each', 'setup', 'cleanup', 'test method', 'initialize'],
          minKeywords: 4,
          explanation: '@BeforeMethod runs setup before each test method, while @AfterMethod performs cleanup after each test method.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'List the complete execution order of TestNG annotations from Suite level to Method level.',
          sampleAnswer: 'The complete execution order is: 1) @BeforeSuite - runs once before all tests in the suite, 2) @BeforeTest - runs before test tag execution, 3) @BeforeClass - runs once before first test in class, 4) @BeforeMethod - runs before each test method, 5) @Test - the actual test method, 6) @AfterMethod - runs after each test method, 7) @AfterClass - runs once after all tests in class, 8) @AfterTest - runs after test tag execution, 9) @AfterSuite - runs once after all tests in suite.',
          keywords: ['BeforeSuite', 'BeforeTest', 'BeforeClass', 'BeforeMethod', 'Test', 'AfterMethod', 'AfterClass', 'AfterTest', 'AfterSuite', 'order', 'execution'],
          minKeywords: 6,
          explanation: 'TestNG annotations execute in hierarchical order: Suite -> Test -> Class -> Method, with After annotations in reverse order.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain three advantages of TestNG over JUnit.',
          sampleAnswer: 'TestNG advantages over JUnit: 1) More powerful annotations like @BeforeSuite, @BeforeTest providing better test configuration hierarchy, 2) Built-in support for parallel test execution and thread-safe operations, 3) Advanced grouping capabilities to organize and execute related tests together, 4) Dependency testing where tests can depend on other tests, 5) Automatic report generation with detailed HTML reports, 6) Data-driven testing with @DataProvider annotation for parameterization.',
          keywords: ['annotations', 'parallel', 'execution', 'groups', 'dependency', 'reports', 'DataProvider', 'parameterization', 'configuration'],
          minKeywords: 4,
          explanation: 'TestNG offers advantages including better annotations, parallel execution, grouping, dependencies, and built-in reporting.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write a basic TestNG test class structure with proper annotations for setup and teardown.',
          sampleAnswer: 'import org.testng.annotations.*;\n\npublic class TestNGExample {\n  @BeforeClass\n  public void beforeClass() {\n    // Class-level setup\n  }\n  \n  @BeforeMethod\n  public void beforeMethod() {\n    // Method-level setup before each test\n  }\n  \n  @Test(priority = 1)\n  public void testOne() {\n    // First test case\n  }\n  \n  @Test(priority = 2)\n  public void testTwo() {\n    // Second test case\n  }\n  \n  @AfterMethod\n  public void afterMethod() {\n    // Cleanup after each test\n  }\n  \n  @AfterClass\n  public void afterClass() {\n    // Class-level cleanup\n  }\n}',
          keywords: ['import', 'org.testng.annotations', '@BeforeClass', '@BeforeMethod', '@Test', '@AfterMethod', '@AfterClass', 'class', 'public'],
          minKeywords: 5,
          explanation: 'A proper TestNG class includes imports, class declaration, and appropriate before/after annotations with @Test methods.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the difference between hard assertions and soft assertions in TestNG? When would you use each?',
          sampleAnswer: 'Hard assertions (using Assert class) stop test execution immediately when an assertion fails, marking the test as failed. Example: Assert.assertEquals(actual, expected). Soft assertions (using SoftAssert class) continue test execution even after assertion failures, collecting all failures and reporting at the end using assertAll(). Use hard assertions when a failure makes further testing meaningless. Use soft assertions when you want to validate multiple conditions and report all failures together, useful for comprehensive validation scenarios.',
          keywords: ['hard assertion', 'soft assertion', 'Assert', 'SoftAssert', 'stop', 'continue', 'execution', 'assertAll', 'failure', 'immediate'],
          minKeywords: 5,
          explanation: 'Hard assertions stop execution on failure, while soft assertions continue and collect all failures for reporting at the end.',
          points: 5,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
