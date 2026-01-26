export default {
  title: "Day 33: TestNG Part 4 - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key TestNG Listeners and Reports concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all TestNG Listeners and Reports topics"
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
          question: 'What is a TestNG Listener?',
          options: [
            'A class that listens to test execution events',
            'A method that runs before tests',
            'A configuration file',
            'A reporting tool'
          ],
          correctAnswer: 0,
          explanation: 'A TestNG Listener is a class that implements listener interfaces to listen to test execution events and perform actions at different stages.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which is the most commonly used listener interface in TestNG?',
          options: [
            'ITestResult',
            'ITestListener',
            'IReporter',
            'ISuiteListener'
          ],
          correctAnswer: 1,
          explanation: 'ITestListener is the most commonly used listener interface, providing methods to listen to test start, success, failure, skip, and other events.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you implement a custom listener in TestNG?',
          options: [
            'Extend TestListenerAdapter',
            'Implement ITestListener interface',
            'Both A and B are correct',
            'Use @Listener annotation only'
          ],
          correctAnswer: 2,
          explanation: 'You can implement a custom listener by either implementing ITestListener interface directly or extending TestListenerAdapter class.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'Which ITestListener method is called when a test method succeeds?',
          options: [
            'onTestSuccess(ITestResult result)',
            'onTestPass(ITestResult result)',
            'onSuccess(ITestResult result)',
            'onTestComplete(ITestResult result)'
          ],
          correctAnswer: 0,
          explanation: 'onTestSuccess(ITestResult result) is called when a test method passes successfully without throwing any exceptions.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method is called when a test method fails?',
          options: [
            'onFailure(ITestResult result)',
            'onTestFailure(ITestResult result)',
            'onFail(ITestResult result)',
            'onError(ITestResult result)'
          ],
          correctAnswer: 1,
          explanation: 'onTestFailure(ITestResult result) is called when a test method fails due to an assertion failure or exception.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method is called when a test is skipped?',
          options: [
            'onSkip(ITestResult result)',
            'onTestSkipped(ITestResult result)',
            'onTestSkip(ITestResult result)',
            'onSkipped(ITestResult result)'
          ],
          correctAnswer: 1,
          explanation: 'onTestSkipped(ITestResult result) is called when a test is skipped, either due to dependencies or when marked with enabled=false.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you attach a listener to a test class?',
          options: [
            '@Listeners({ListenerClass.class})',
            '@Listener(ListenerClass.class)',
            '@UseListener(ListenerClass.class)',
            '@AttachListener(ListenerClass.class)'
          ],
          correctAnswer: 0,
          explanation: '@Listeners annotation is used at class level to attach one or more listener classes: @Listeners({MyListener.class})',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Which ITestResult method returns the test method name?',
          options: [
            'result.getName()',
            'result.getMethodName()',
            'result.getTestName()',
            'result.getMethod().getMethodName()'
          ],
          correctAnswer: 0,
          explanation: 'result.getName() returns the name of the test method. Alternatively, result.getMethod().getMethodName() also works.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method returns the exception/error message when a test fails?',
          options: [
            'result.getError()',
            'result.getException()',
            'result.getThrowable().getMessage()',
            'result.getFailureMessage()'
          ],
          correctAnswer: 2,
          explanation: 'result.getThrowable().getMessage() returns the exception or error message when a test fails.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which TestNG default report is generated in HTML format?',
          options: [
            'testng-results.xml',
            'index.html',
            'emailable-report.html',
            'Both B and C'
          ],
          correctAnswer: 3,
          explanation: 'TestNG generates both index.html (detailed report) and emailable-report.html (summary report) in the test-output folder.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'Where are TestNG default reports stored?',
          options: [
            'reports/ folder',
            'test-output/ folder',
            'target/surefire-reports/ folder',
            'build/ folder'
          ],
          correctAnswer: 1,
          explanation: 'TestNG stores all default reports in the test-output/ folder in the project root directory.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is Extent Reports?',
          options: [
            'A built-in TestNG report',
            'A third-party reporting library',
            'A test execution framework',
            'A logging tool'
          ],
          correctAnswer: 1,
          explanation: 'Extent Reports is a popular third-party HTML reporting library that provides rich, interactive, and detailed test execution reports.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which class is used to create an Extent Report instance?',
          options: [
            'ExtentReports',
            'ExtentTest',
            'ExtentHtmlReporter',
            'ExtentManager'
          ],
          correctAnswer: 0,
          explanation: 'ExtentReports class is used to create the main reporting object. ExtentHtmlReporter configures the HTML report.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which Extent Reports method creates a test in the report?',
          options: [
            'extent.createTest("Test Name")',
            'extent.addTest("Test Name")',
            'extent.newTest("Test Name")',
            'extent.startTest("Test Name")'
          ],
          correctAnswer: 0,
          explanation: 'extent.createTest("Test Name") creates a test entry in the Extent Report and returns an ExtentTest object.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method logs a pass status in Extent Reports?',
          options: [
            'test.pass("Message")',
            'test.log(Status.PASS, "Message")',
            'Both A and B',
            'test.logPass("Message")'
          ],
          correctAnswer: 2,
          explanation: 'Both test.pass("Message") and test.log(Status.PASS, "Message") can be used to log a pass status in Extent Reports.',
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
          question: 'Listeners can be implemented to capture screenshots on test failure.',
          correctAnswer: true,
          explanation: 'True. Listeners, especially onTestFailure() method in ITestListener, are commonly used to capture screenshots when tests fail.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'ITestListener interface must implement all its methods.',
          correctAnswer: false,
          explanation: 'False. From Java 8 onwards, ITestListener has default implementations, so you only need to override methods you want to customize.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'Multiple listeners can be attached to a single test class.',
          correctAnswer: true,
          explanation: 'True. You can attach multiple listeners using @Listeners({Listener1.class, Listener2.class, Listener3.class})',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'TestListenerAdapter is an abstract class that implements ITestListener.',
          correctAnswer: true,
          explanation: 'True. TestListenerAdapter is a convenient adapter class that implements ITestListener with empty method bodies for easy extension.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'onStart() method is called before each test method.',
          correctAnswer: false,
          explanation: 'False. onStart() is called before the <test> tag execution starts, not before each test method. Use onTestStart() for each test method.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'ITestResult provides access to test method parameters.',
          correctAnswer: true,
          explanation: 'True. ITestResult.getParameters() returns an array of parameters passed to the test method via data providers or parameters.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'TestNG default reports can be customized without external libraries.',
          correctAnswer: false,
          explanation: 'False. TestNG default reports (index.html, emailable-report.html) have limited customization. External libraries like Extent Reports are used for custom reports.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Extent Reports must be flushed using extent.flush() to generate the report file.',
          correctAnswer: true,
          explanation: 'True. extent.flush() writes all logged information to the report file. Without it, the report will not be generated.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Listeners can be configured in testng.xml file.',
          correctAnswer: true,
          explanation: 'True. Listeners can be configured in testng.xml using <listeners> tag, which applies them to all tests in the suite.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'ISuiteListener listens to individual test method events.',
          correctAnswer: false,
          explanation: 'False. ISuiteListener listens to suite-level events (onStart, onFinish), not individual test methods. Use ITestListener for test method events.',
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
          question: 'The _____ interface is the most commonly used listener interface in TestNG.',
          correctAnswer: 'ITestListener',
          acceptedAnswers: ['ITestListener', 'itestlistener'],
          explanation: 'ITestListener is the most commonly used listener interface that provides methods for test lifecycle events.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The method _____ is called when a test method fails.',
          correctAnswer: 'onTestFailure',
          acceptedAnswers: ['onTestFailure', 'onTestFailure()', 'ontestfailure'],
          explanation: 'onTestFailure(ITestResult result) method is invoked when a test method fails.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'TestNG default reports are stored in the _____ folder.',
          correctAnswer: 'test-output',
          acceptedAnswers: ['test-output', 'test-output/'],
          explanation: 'TestNG generates all default reports in the test-output/ folder by default.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ method must be called to write Extent Reports to file.',
          correctAnswer: 'flush',
          acceptedAnswers: ['flush', 'flush()', 'extent.flush', 'extent.flush()'],
          explanation: 'extent.flush() method writes all test information to the report file and must be called to generate the report.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ annotation is used to attach listeners to a test class.',
          correctAnswer: '@Listeners',
          acceptedAnswers: ['@Listeners', 'Listeners', '@listeners'],
          explanation: '@Listeners annotation is used at class level to attach one or more listener classes to test execution.',
          points: 3,
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
          question: 'Explain the purpose of TestNG Listeners and list three commonly used listener interfaces.',
          sampleAnswer: 'TestNG Listeners are used to listen to test execution events and perform custom actions at different stages of test execution. They help in logging, reporting, taking screenshots, and customizing test behavior. Three commonly used listener interfaces are: 1) ITestListener - listens to test method events (start, success, failure, skip), 2) ISuiteListener - listens to suite-level events (before/after suite execution), 3) IReporter - generates custom reports after all tests complete.',
          keywords: ['events', 'execution', 'ITestListener', 'ISuiteListener', 'IReporter', 'logging', 'reporting', 'custom'],
          minKeywords: 4,
          explanation: 'Listeners monitor test execution events and enable custom actions like logging, reporting, and screenshots at different lifecycle stages.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Write the code to implement a custom listener that prints a message when a test fails.',
          sampleAnswer: 'public class MyListener implements ITestListener {\n    @Override\n    public void onTestFailure(ITestResult result) {\n        System.out.println("Test Failed: " + result.getName());\n        System.out.println("Error: " + result.getThrowable().getMessage());\n    }\n}\nTo use: @Listeners({MyListener.class}) at class level or configure in testng.xml.',
          keywords: ['implements', 'ITestListener', 'onTestFailure', 'ITestResult', 'getName', 'getThrowable', '@Listeners', 'class'],
          minKeywords: 5,
          explanation: 'Implement ITestListener interface and override onTestFailure() method to handle test failure events.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'List and explain five methods available in the ITestListener interface.',
          sampleAnswer: '1) onTestStart(ITestResult result) - called before test method execution begins, 2) onTestSuccess(ITestResult result) - called when test passes successfully, 3) onTestFailure(ITestResult result) - called when test fails with exception or assertion, 4) onTestSkipped(ITestResult result) - called when test is skipped due to dependencies or enabled=false, 5) onTestFailedButWithinSuccessPercentage(ITestResult result) - called when test fails but within success percentage threshold.',
          keywords: ['onTestStart', 'onTestSuccess', 'onTestFailure', 'onTestSkipped', 'ITestResult', 'execution', 'fails', 'passes', 'skipped'],
          minKeywords: 6,
          explanation: 'ITestListener provides methods for various test lifecycle events: start, success, failure, skip, and partial success scenarios.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the difference between TestNG default reports and Extent Reports.',
          sampleAnswer: 'TestNG default reports (index.html, emailable-report.html, testng-results.xml) are automatically generated with basic information but limited customization. They provide simple pass/fail statistics. Extent Reports is a third-party library that provides rich, interactive, customizable HTML reports with detailed logs, screenshots, charts, system information, and better visualization. Extent Reports requires manual setup but offers professional-looking reports with extensive customization options like themes, logos, and custom information.',
          keywords: ['default', 'index.html', 'emailable-report', 'Extent Reports', 'third-party', 'customizable', 'interactive', 'screenshots', 'visualization'],
          minKeywords: 5,
          explanation: 'TestNG default reports are basic and auto-generated; Extent Reports provides rich, customizable, interactive reports with advanced features.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write the basic setup code for Extent Reports including initialization and test creation.',
          sampleAnswer: 'ExtentHtmlReporter htmlReporter = new ExtentHtmlReporter("reports/extent.html");\nExtentReports extent = new ExtentReports();\nextent.attachReporter(htmlReporter);\n\n// Create test\nExtentTest test = extent.createTest("Test Name", "Test Description");\ntest.log(Status.INFO, "Test started");\ntest.pass("Test passed successfully");\n\n// Must flush to generate report\nextent.flush();\n\nThis initializes Extent Reports, creates HTML reporter, creates a test, logs information, and flushes to generate the report file.',
          keywords: ['ExtentHtmlReporter', 'ExtentReports', 'attachReporter', 'createTest', 'log', 'pass', 'flush', 'extent'],
          minKeywords: 6,
          explanation: 'Initialize ExtentHtmlReporter and ExtentReports, attach reporter, create tests with createTest(), log status, and call flush() to generate report.',
          points: 5,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
