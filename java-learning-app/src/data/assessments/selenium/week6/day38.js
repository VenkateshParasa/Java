export default {
  title: "Day 38: Logging & Reporting Part 1 - Log4j & SLF4J - Assessment",
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
      id: 'section-a',
      title: 'Section A: Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary advantage of using SLF4J over Log4j directly in a Selenium framework?',
          options: [
            'SLF4J provides a facade/abstraction layer allowing you to switch logging implementations without changing code',
            'SLF4J is faster than Log4j in all scenarios',
            'SLF4J automatically formats log messages better than Log4j',
            'SLF4J does not require any configuration files'
          ],
          correctAnswer: 0,
          explanation: 'SLF4J (Simple Logging Facade for Java) acts as an abstraction layer over various logging frameworks (Log4j, Logback, java.util.logging). This means you can switch the underlying logging implementation without changing your application code, providing flexibility and decoupling.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which is the correct way to initialize a Logger using Log4j2 in a test class?',
          options: [
            'Logger logger = Logger.getLogger(TestClass.class);',
            'private static final Logger logger = LogManager.getLogger(TestClass.class);',
            'Logger logger = new Logger(TestClass.class);',
            'private Logger logger = LogFactory.create(TestClass.class);'
          ],
          correctAnswer: 1,
          explanation: 'In Log4j2, the correct way to initialize a logger is using LogManager.getLogger(). It should be declared as private static final to ensure thread safety and to follow best practices. The logger is associated with the class for better log traceability.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct order of log levels from least to most severe in Log4j2?',
          options: [
            'TRACE < DEBUG < INFO < WARN < ERROR < FATAL',
            'DEBUG < TRACE < INFO < WARN < ERROR < FATAL',
            'INFO < DEBUG < TRACE < WARN < ERROR < FATAL',
            'TRACE < INFO < DEBUG < WARN < FATAL < ERROR'
          ],
          correctAnswer: 0,
          explanation: 'The correct order of log levels from least to most severe is: TRACE < DEBUG < INFO < WARN < ERROR < FATAL. TRACE provides the most detailed logging for fine-grained debugging, while FATAL represents the most critical errors that may cause application termination.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which appender should you use when you want to create a new log file when the current file reaches a certain size?',
          options: [
            'ConsoleAppender',
            'FileAppender',
            'RollingFileAppender',
            'AsyncAppender'
          ],
          correctAnswer: 2,
          explanation: 'RollingFileAppender is designed to roll over log files based on size or time-based policies. It creates new log files when certain criteria are met (like file size or date), which helps in managing disk space and organizing logs efficiently.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a log4j2.xml configuration, which element defines the pattern layout for log messages?',
          options: [
            '<Pattern>',
            '<Layout>',
            '<PatternLayout>',
            '<Format>'
          ],
          correctAnswer: 2,
          explanation: 'The <PatternLayout> element is used in log4j2.xml to define how log messages should be formatted. It contains a pattern attribute that specifies the layout using conversion patterns like %d for date, %level for log level, %msg for message, etc.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does the conversion pattern %d{yyyy-MM-dd HH:mm:ss} represent in Log4j2?',
          options: [
            'The duration of the test execution',
            'The date and time when the log entry was created',
            'The date when the log file was created',
            'The deployment date of the application'
          ],
          correctAnswer: 1,
          explanation: '%d{yyyy-MM-dd HH:mm:ss} is a date conversion pattern that outputs the timestamp when the log event occurred. The format specifies year-month-day hour:minute:second, providing precise timing information for each log entry.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which dependency is required to use SLF4J with Log4j2 as the implementation?',
          options: [
            'slf4j-log4j12',
            'log4j-slf4j-impl',
            'slf4j-simple',
            'logback-classic'
          ],
          correctAnswer: 1,
          explanation: 'log4j-slf4j-impl (or log4j-slf4j18-impl for newer versions) is the binding that connects SLF4J API to Log4j2 implementation. This adapter allows SLF4J calls to be routed to Log4j2 for actual logging.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of parameterized logging in SLF4J (e.g., logger.info("User {} logged in", username))?',
          options: [
            'It makes the code more readable',
            'It improves performance by avoiding string concatenation when the log level is disabled',
            'It automatically encrypts sensitive data',
            'It changes the log level dynamically'
          ],
          correctAnswer: 1,
          explanation: 'Parameterized logging improves performance because the string concatenation only occurs if the log level is enabled. If the log level is disabled, the parameters are not processed, avoiding unnecessary object creation and string operations.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In Log4j2, what is logger additivity?',
          options: [
            'The ability to add multiple appenders to a single logger',
            'Whether a logger inherits appenders from its parent loggers',
            'The feature that adds timestamps to log messages',
            'The capability to add custom log levels'
          ],
          correctAnswer: 1,
          explanation: 'Logger additivity in Log4j2 determines whether log events are passed to the appenders of parent loggers in the hierarchy. When additivity is true (default), log events will be logged by both the logger and its ancestors, potentially causing duplicate log entries.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which configuration file name is automatically detected by Log4j2 at startup?',
          options: [
            'log4j.properties',
            'log4j2.xml',
            'logging.properties',
            'logger.config'
          ],
          correctAnswer: 1,
          explanation: 'Log4j2 automatically looks for configuration files named log4j2.xml, log4j2.json, log4j2.yaml, or log4j2.properties in the classpath. The XML format (log4j2.xml) is the most commonly used and provides the most flexibility.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the difference between Log4j 1.x and Log4j2?',
          options: [
            'Log4j2 is just a minor update with bug fixes',
            'Log4j2 is a complete rewrite with improved performance, async logging support, and plugin architecture',
            'Log4j2 only supports XML configuration',
            'Log4j2 removed support for file appenders'
          ],
          correctAnswer: 1,
          explanation: 'Log4j2 is a complete rewrite of Log4j 1.x with significant improvements including better performance, asynchronous logging capabilities, plugin architecture, automatic configuration reloading, and Java 8 lambda support for lazy logging.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'In a Selenium test framework, at which log level should you log screenshot capture for failed tests?',
          options: [
            'TRACE',
            'DEBUG',
            'INFO',
            'ERROR'
          ],
          correctAnswer: 3,
          explanation: 'Screenshot capture for failed tests should be logged at ERROR level because it represents a test failure, which is an error condition. This makes it easier to identify and investigate failures when reviewing logs.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the RollingFileAppender\'s SizeBasedTriggeringPolicy?',
          options: [
            'To compress old log files',
            'To delete logs older than a specified date',
            'To create a new log file when the current file reaches a specified size',
            'To limit the total number of log files'
          ],
          correctAnswer: 2,
          explanation: 'SizeBasedTriggeringPolicy triggers a rollover (creation of a new log file) when the current log file reaches a specified size. This helps manage disk space and keeps individual log files at a manageable size.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which pattern conversion in Log4j2 prints the name of the thread that generated the logging event?',
          options: [
            '%t',
            '%thread',
            '%T',
            'Both %t and %thread'
          ],
          correctAnswer: 3,
          explanation: 'Both %t and %thread conversion patterns print the name of the thread that generated the logging event. This is particularly useful in multi-threaded applications and parallel test execution to track which thread generated which log entry.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the recommended approach for logging sensitive data (like passwords) in a Selenium framework?',
          options: [
            'Log them at TRACE level so they are hidden by default',
            'Never log sensitive data; use masking or redaction if logging is necessary',
            'Log them only in the console, not in files',
            'Encrypt the entire log file'
          ],
          correctAnswer: 1,
          explanation: 'Sensitive data should never be logged in plain text. If logging such data is absolutely necessary for debugging, it should be masked (e.g., "password: ****") or redacted. Logging sensitive information creates security vulnerabilities and compliance issues.',
          points: 3
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: True/False Questions',
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'Log4j2 automatically creates log directories if they do not exist.',
          correctAnswer: false,
          explanation: 'False. Log4j2 does NOT automatically create directories. If the directory path specified in the FileAppender does not exist, Log4j2 will fail to create the log file. You need to either ensure the directory exists or configure Log4j2 to create it using the createOnDemand attribute.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'SLF4J is a logging implementation like Log4j2 or Logback.',
          correctAnswer: false,
          explanation: 'False. SLF4J is NOT a logging implementation. It is a facade or abstraction layer that provides a common API for various logging frameworks. You need to bind it with an actual implementation like Log4j2, Logback, or java.util.logging.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'The FATAL log level is more severe than ERROR in Log4j2.',
          correctAnswer: true,
          explanation: 'True. FATAL is the highest severity level in Log4j2, indicating very severe error events that might lead to application termination. The hierarchy is: TRACE < DEBUG < INFO < WARN < ERROR < FATAL.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'When a logger is set to INFO level, DEBUG and TRACE messages will also be logged.',
          correctAnswer: false,
          explanation: 'False. When a logger is set to INFO level, only INFO, WARN, ERROR, and FATAL messages will be logged. DEBUG and TRACE messages, which are lower priority levels, will be filtered out and not logged.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'A single logger can have multiple appenders attached to it in Log4j2.',
          correctAnswer: true,
          explanation: 'True. A logger in Log4j2 can have multiple appenders attached, allowing log messages to be sent to different destinations simultaneously (e.g., console, file, database) based on your configuration.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Asynchronous logging in Log4j2 always improves application performance.',
          correctAnswer: false,
          explanation: 'False. While asynchronous logging can improve performance in many scenarios by offloading I/O operations to a separate thread, it is not always beneficial. In low-throughput applications, the overhead of async processing might outweigh benefits. Also, async logging can complicate debugging and may lose messages on abrupt shutdowns.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'The log4j2.xml file must be placed in the src/main/resources folder for Maven projects.',
          correctAnswer: true,
          explanation: 'True. For Maven projects, configuration files like log4j2.xml should be placed in src/main/resources so they are included in the classpath and can be automatically detected by Log4j2 at runtime.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Logger hierarchy in Log4j2 is based on the package structure of classes.',
          correctAnswer: true,
          explanation: 'True. Log4j2 logger hierarchy follows the Java package naming convention. A logger named "com.example.tests" is a child of "com.example" and inherits configuration from parent loggers. This allows fine-grained control over logging at different package levels.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'The root logger in Log4j2 is the ancestor of all other loggers.',
          correctAnswer: true,
          explanation: 'True. The root logger is at the top of the logger hierarchy and is the ancestor of all loggers in the application. If no specific logger configuration matches, the root logger configuration is used. Every logger inherits from the root logger.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Using string concatenation (e.g., logger.info("User " + username + " logged in")) is as efficient as parameterized logging in Log4j2.',
          correctAnswer: false,
          explanation: 'False. String concatenation happens before the logging call, regardless of whether the log level is enabled. Parameterized logging (logger.info("User {} logged in", username)) only constructs the string if the log level is enabled, making it more efficient.',
          points: 2
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Fill in the Blank Questions',
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'To use SLF4J with Log4j2, you need to add the __________ dependency as the binding adapter.',
          correctAnswer: 'log4j-slf4j-impl',
          explanation: 'The log4j-slf4j-impl (or log4j-slf4j18-impl) dependency acts as the bridge between SLF4J API and Log4j2 implementation, routing SLF4J logging calls to Log4j2.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The conversion pattern __________ is used to print the fully qualified class name in Log4j2 log messages.',
          correctAnswer: '%c',
          explanation: '%c (or %logger) prints the fully qualified name of the logger, which is typically the class name where the logger was instantiated. This helps in identifying the source of log messages.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ element in log4j2.xml defines where log messages should be sent (e.g., console, file).',
          correctAnswer: 'Appender',
          explanation: 'Appenders are responsible for delivering log events to their destination. Common appenders include ConsoleAppender, FileAppender, and RollingFileAppender, each sending logs to different targets.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'In Log4j2, the __________ attribute controls whether a logger passes log events to its parent loggers in the hierarchy.',
          correctAnswer: 'additivity',
          explanation: 'The additivity attribute (true/false) determines whether log events are propagated to ancestor loggers. Setting it to false prevents duplicate logging when both child and parent loggers have appenders.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The recommended log level for production environments is typically __________ to balance information and performance.',
          correctAnswer: 'INFO',
          explanation: 'INFO is the standard log level for production as it captures important runtime events without the verbosity of DEBUG/TRACE or the alarm-only nature of WARN/ERROR, providing a good balance of information and performance.',
          points: 4
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Section D: Short Answer Questions',
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how you would configure Log4j2 to write logs to both console and a rolling file with a maximum file size of 10MB. Describe the necessary configuration elements.',
          keywords: ['RollingFileAppender', 'ConsoleAppender', 'SizeBasedTriggeringPolicy', 'PatternLayout', 'appender-ref', 'root', '10MB'],
          minKeywords: 4,
          sampleAnswer: 'To configure Log4j2 for both console and rolling file output, you need to define two appenders in log4j2.xml. First, create a ConsoleAppender with a PatternLayout to format console output. Second, create a RollingFileAppender with a fileName attribute for the active log file and a filePattern for archived files. Add a SizeBasedTriggeringPolicy with size="10MB" to trigger rollover when the file reaches 10MB. Include a DefaultRolloverStrategy to control how many archived files to keep. Finally, in the root logger configuration, reference both appenders using appender-ref elements. This configuration ensures logs are written to both destinations simultaneously, with automatic file rotation based on size.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe the benefits of using SLF4J as a logging facade in a Selenium automation framework. Provide at least three specific advantages.',
          keywords: ['abstraction', 'flexibility', 'implementation-independent', 'parameterized', 'performance', 'switching', 'vendor-neutral', 'migration'],
          minKeywords: 3,
          sampleAnswer: 'SLF4J provides several key benefits for Selenium frameworks: First, it offers implementation independence, allowing you to switch between logging frameworks (Log4j2, Logback, java.util.logging) without changing test code, just by changing dependencies. Second, it provides parameterized logging syntax that improves performance by avoiding string concatenation when log levels are disabled. Third, it acts as a vendor-neutral facade, preventing framework lock-in and making future migrations easier. Fourth, it simplifies dependency management as team members can use different logging implementations during development. Finally, it provides a cleaner, more consistent API across different logging backends, making code more maintainable.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the best practices for implementing logging in Selenium test methods? Discuss log levels, what to log, and when to log.',
          keywords: ['INFO', 'ERROR', 'DEBUG', 'test-start', 'test-end', 'failure', 'screenshot', 'assertion', 'exception', 'navigation', 'meaningful'],
          minKeywords: 4,
          sampleAnswer: 'Best practices for Selenium test logging include: Use INFO level to log test start/end, major test steps, and navigation events. Use ERROR level for test failures, exceptions, and when capturing failure screenshots. Use DEBUG level for detailed element interactions and wait conditions useful during troubleshooting. Log meaningful information like test names, URLs being accessed, and critical data being used. Always log exceptions with stack traces using logger.error("message", exception). Avoid logging sensitive data like passwords or credentials. Log before and after critical operations to help identify failure points. Include context information like browser type and test environment. Use parameterized logging for performance. Implement logging in @BeforeMethod and @AfterMethod for test lifecycle tracking. Keep log messages concise but informative to facilitate debugging without overwhelming log files.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the concept of logger hierarchy in Log4j2 and how parent-child relationships affect logging configuration. Provide an example.',
          keywords: ['hierarchy', 'parent', 'child', 'inheritance', 'package', 'root', 'additivity', 'configuration', 'propagation'],
          minKeywords: 4,
          sampleAnswer: 'Logger hierarchy in Log4j2 follows the Java package structure using dot notation. A logger named "com.example.tests.login" is a child of "com.example.tests", which is a child of "com.example", all ultimately inheriting from the root logger. Child loggers inherit configuration from their parents, including log level and appenders. For example, if the root logger is set to INFO, all child loggers default to INFO unless explicitly configured otherwise. The additivity attribute controls whether log events propagate to parent appenders - when true (default), a log message is handled by both the child logger\'s appenders and all ancestor appenders, potentially causing duplicates. Setting additivity="false" on a child logger prevents propagation. This hierarchy enables fine-grained control: you can set "com.example.tests" to DEBUG for detailed test logging while keeping "com.example.utilities" at INFO, with the root logger at WARN for third-party libraries.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How would you integrate Log4j2 logging with TestNG listeners to automatically log test execution events? Describe the implementation approach.',
          keywords: ['ITestListener', 'onTestStart', 'onTestSuccess', 'onTestFailure', 'logger', 'LogManager', 'TestNG', 'listener', 'annotation'],
          minKeywords: 4,
          sampleAnswer: 'To integrate Log4j2 with TestNG, create a custom listener class that implements ITestListener interface. In this class, declare a static Logger using LogManager.getLogger(). Override key methods: onTestStart() to log when a test begins with INFO level including test name and description; onTestSuccess() to log successful test completion; onTestFailure() to log failures at ERROR level, including exception details and capturing screenshots; onTestSkipped() to log skipped tests. In each method, use the ITestResult parameter to extract test method name, class name, and other metadata. Register the listener either by adding @Listeners annotation at the test class level or by configuring it in testng.xml using the <listeners> tag. This approach provides centralized, consistent logging across all tests without duplicating logging code in each test method, and ensures all test lifecycle events are properly captured in logs for reporting and debugging.',
          points: 8
        }
      ]
    }
  ]
};
