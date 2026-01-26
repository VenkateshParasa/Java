export default {
  title: "Day 49: Capstone Project & Framework Review - Assessment",
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
          question: 'What is the primary benefit of implementing a complete automation framework architecture?',
          options: [
            'To increase the number of test cases',
            'To provide modularity, reusability, and maintainability for test automation',
            'To eliminate the need for manual testing',
            'To reduce the cost of software licenses'
          ],
          correctAnswer: 1,
          explanation: 'A complete automation framework provides modularity, reusability, and maintainability. It structures test code in a way that makes it easy to update, extend, and maintain while reducing code duplication and improving test reliability.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In the Page Object Model (POM) design pattern, what should page classes primarily contain?',
          options: [
            'Test methods and assertions',
            'Locators and methods representing page actions',
            'TestNG annotations and listeners',
            'Database connection logic'
          ],
          correctAnswer: 1,
          explanation: 'Page classes in POM should contain web element locators and methods that represent user actions on that page. Test logic and assertions should be in test classes, maintaining clear separation of concerns.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which framework layer is responsible for reading configuration files and managing properties?',
          options: [
            'Test Layer',
            'Page Object Layer',
            'Configuration Management Layer',
            'Reporting Layer'
          ],
          correctAnswer: 2,
          explanation: 'The Configuration Management Layer is responsible for reading and managing configuration properties from files like config.properties or application.yml. It centralizes environment-specific configurations.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the recommended approach for managing WebDriver instances in a parallel execution framework?',
          options: [
            'Use a single global WebDriver instance',
            'Use ThreadLocal<WebDriver> for thread safety',
            'Create new instances in each test method',
            'Store WebDriver in static variables'
          ],
          correctAnswer: 1,
          explanation: 'ThreadLocal<WebDriver> ensures each test thread has its own WebDriver instance, providing thread safety for parallel test execution. This prevents tests from interfering with each other during concurrent runs.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a comprehensive framework, where should explicit wait utilities be implemented?',
          options: [
            'In each test method',
            'In a centralized WaitUtil or helper class',
            'Directly in page object methods',
            'In TestNG configuration files'
          ],
          correctAnswer: 1,
          explanation: 'Explicit wait utilities should be implemented in a centralized WaitUtil class. This promotes code reusability, consistency across the framework, and easier maintenance of wait strategies.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which reporting tool integrates best with TestNG for generating detailed HTML reports with screenshots?',
          options: [
            'JUnit Reports',
            'Extent Reports',
            'Log4j',
            'Apache POI'
          ],
          correctAnswer: 1,
          explanation: 'Extent Reports is one of the most popular reporting frameworks for Selenium with TestNG. It provides rich, interactive HTML reports with screenshots, charts, and detailed test execution information.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of implementing a BasePage class in a framework?',
          options: [
            'To store test data',
            'To provide common methods and utilities that all page objects can inherit',
            'To execute test cases',
            'To generate reports'
          ],
          correctAnswer: 1,
          explanation: 'A BasePage class contains common methods and utilities (like waits, element interactions, JavaScript execution) that all page object classes can inherit, reducing code duplication and maintaining consistency.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a data-driven framework, which approach is BEST for managing test data?',
          options: [
            'Hardcode data in test methods',
            'Use external data sources like Excel, CSV, or JSON with @DataProvider',
            'Store data in class variables',
            'Use random data generation only'
          ],
          correctAnswer: 1,
          explanation: 'Using external data sources (Excel, CSV, JSON) with TestNG @DataProvider annotation is the best practice for data-driven testing. It separates test logic from test data, making tests more maintainable and scalable.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which CI/CD tool feature is essential for integrating Selenium tests into a continuous integration pipeline?',
          options: [
            'Manual test execution only',
            'Automated build triggers with test execution and reporting',
            'GUI-only test execution',
            'Email notification without reports'
          ],
          correctAnswer: 1,
          explanation: 'Automated build triggers with test execution and reporting are essential for CI/CD integration. This enables automatic test runs on code commits, scheduled executions, and immediate feedback through reports.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary advantage of using the Factory design pattern for WebDriver initialization?',
          options: [
            'It makes tests run faster',
            'It provides a centralized way to create browser instances based on configuration',
            'It eliminates the need for locators',
            'It automatically generates test reports'
          ],
          correctAnswer: 1,
          explanation: 'The Factory pattern provides a centralized mechanism to create different browser instances (Chrome, Firefox, Edge) based on configuration. This makes browser management flexible and easily configurable.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'Which approach ensures cross-browser compatibility in a Selenium framework?',
          options: [
            'Test only on Chrome browser',
            'Use browser-specific code in each test',
            'Implement a BrowserFactory with configuration-driven browser selection',
            'Avoid using WebDriver entirely'
          ],
          correctAnswer: 2,
          explanation: 'Implementing a BrowserFactory with configuration-driven browser selection allows tests to run on multiple browsers without code changes. The framework reads browser configuration and initializes the appropriate driver.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'In a mature framework, what is the purpose of implementing custom exceptions?',
          options: [
            'To replace all Selenium exceptions',
            'To provide meaningful, domain-specific error messages and better exception handling',
            'To hide all errors from reports',
            'To make tests pass automatically'
          ],
          correctAnswer: 1,
          explanation: 'Custom exceptions provide meaningful, domain-specific error messages that give better context about failures. They improve debugging by clearly indicating what went wrong in the framework or application.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which TestNG feature is most valuable for organizing and executing test suites in a framework?',
          options: [
            'Assert statements only',
            'testng.xml suite configuration with groups, parameters, and listeners',
            'Hard-coded test execution order',
            '@Test annotation only'
          ],
          correctAnswer: 1,
          explanation: 'testng.xml suite configuration allows comprehensive test organization with groups, parameters, parallel execution settings, and listeners. It provides flexible test execution management without code changes.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the recommended logging strategy for a production-grade automation framework?',
          options: [
            'Use System.out.println() throughout the code',
            'Implement Log4j2 or SLF4J with different log levels (DEBUG, INFO, ERROR) and separate log files',
            'Avoid logging to improve performance',
            'Log only in test methods'
          ],
          correctAnswer: 1,
          explanation: 'Using Log4j2 or SLF4J with different log levels provides professional logging capabilities. Separate log files for different concerns (errors, info, debug) help in troubleshooting and monitoring test execution.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'In a complete framework review, which component is responsible for retry logic and failure analysis?',
          options: [
            'Page Objects',
            'TestNG IRetryAnalyzer and ITestListener implementations',
            'Configuration files',
            'Locator repository'
          ],
          correctAnswer: 1,
          explanation: 'TestNG IRetryAnalyzer provides retry logic for failed tests, while ITestListener implementations handle failure analysis, screenshot capture, and reporting. These components work together for robust failure handling.',
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
          question: 'A well-designed automation framework should have clear separation between test logic, page objects, and utility functions.',
          correctAnswer: true,
          explanation: 'True. Separation of concerns is a fundamental principle of framework design. Test logic should be in test classes, page interactions in page objects, and reusable functions in utilities for better maintainability.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'Page Object classes should contain TestNG assertions to verify page states.',
          correctAnswer: false,
          explanation: 'False. Page Objects should only contain locators and action methods. Assertions and test logic should be in test classes to maintain clean separation of concerns and reusability of page objects.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'Configuration properties should be hard-coded in test classes for better performance.',
          correctAnswer: false,
          explanation: 'False. Configuration properties should be externalized in properties files or YAML files. This enables environment-specific configurations without code changes and follows the best practice of separating configuration from code.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'A BaseTest class typically contains setup and teardown methods along with common test utilities.',
          correctAnswer: true,
          explanation: 'True. BaseTest class provides common setup (@BeforeMethod/@BeforeClass) and teardown (@AfterMethod/@AfterClass) logic that all test classes inherit, ensuring consistent test initialization and cleanup.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Extent Reports automatically integrates with TestNG without requiring any custom listener implementation.',
          correctAnswer: false,
          explanation: 'False. While Extent Reports works well with TestNG, it requires implementing a custom listener (ITestListener) or using ExtentReports API calls to integrate test results, screenshots, and logs into the report.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Parallel test execution in TestNG requires thread-safe implementation of WebDriver using ThreadLocal.',
          correctAnswer: true,
          explanation: 'True. When running tests in parallel, each thread must have its own WebDriver instance. ThreadLocal ensures thread safety by maintaining separate WebDriver instances for each execution thread.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Implicit waits and explicit waits should be used together for optimal synchronization.',
          correctAnswer: false,
          explanation: 'False. Mixing implicit and explicit waits can lead to unpredictable wait times and flaky tests. Best practice is to use explicit waits (WebDriverWait) exclusively for predictable and reliable synchronization.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'A framework should include utility classes for common operations like screenshot capture, Excel reading, and date formatting.',
          correctAnswer: true,
          explanation: 'True. Utility classes encapsulate common reusable operations, reducing code duplication and improving maintainability. They are essential components of a well-structured automation framework.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Jenkins can execute Selenium tests by triggering Maven or TestNG commands through build steps.',
          correctAnswer: true,
          explanation: 'True. Jenkins integrates with Selenium tests through Maven goals (mvn test) or direct TestNG suite execution. Build steps can execute commands that run the tests and generate reports.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Exception handling should be implemented only at the test method level, not in page objects or utilities.',
          correctAnswer: false,
          explanation: 'False. Exception handling should be implemented at multiple levels - utilities handle low-level exceptions, page objects can handle specific page-related exceptions, and test methods handle test-level exceptions with appropriate logging and recovery.',
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
          question: 'The __________ design pattern separates page-specific code from test code by creating classes for each page with locators and action methods.',
          correctAnswer: 'Page Object Model',
          explanation: 'The Page Object Model (POM) design pattern creates a class for each web page containing its locators and methods. This separation makes tests more maintainable and reduces code duplication.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In TestNG, the __________ file is used to configure test suites, define parameters, set parallel execution, and specify listeners.',
          correctAnswer: 'testng.xml',
          explanation: 'testng.xml is the XML configuration file that defines test suite structure, execution parameters, parallel settings, groups, and listeners for TestNG test execution.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ class in Java provides thread-safe storage for WebDriver instances, ensuring each test thread has its own driver instance.',
          correctAnswer: 'ThreadLocal',
          explanation: 'ThreadLocal provides thread-local variables where each thread has its own independently initialized copy. This is essential for parallel test execution with separate WebDriver instances.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ pattern is used to create objects without specifying their exact class, commonly used for creating browser driver instances.',
          correctAnswer: 'Factory',
          explanation: 'The Factory pattern provides a way to create objects without specifying the exact class. In Selenium frameworks, it is used to create different browser driver instances based on configuration.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ annotation in TestNG provides test data to test methods, enabling data-driven testing with multiple datasets.',
          correctAnswer: '@DataProvider',
          explanation: '@DataProvider annotation in TestNG supplies data to test methods. It returns a two-dimensional Object array, allowing tests to run multiple times with different data sets.',
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
          question: 'Design a complete framework architecture for a Selenium automation project. Describe all major components (layers) and explain how they interact with each other. Include at least 6 key components.',
          keywords: ['Page Object Layer', 'Test Layer', 'Utility Layer', 'Configuration Management', 'Reporting', 'Data Management', 'Base Classes', 'Exception Handling', 'Listeners', 'WebDriver Factory', 'integration', 'separation of concerns'],
          minKeywords: 4,
          sampleAnswer: 'A complete Selenium framework architecture includes: (1) Page Object Layer - Contains page classes with locators and action methods for each application page, providing abstraction for UI elements. (2) Test Layer - Contains TestNG test classes with test methods, assertions, and test logic. (3) Base Classes - BaseTest and BasePage classes providing common setup/teardown and reusable page methods. (4) WebDriver Factory - Manages browser initialization using Factory pattern, supporting multiple browsers. (5) Configuration Management Layer - Reads properties files for environment-specific configurations (URLs, credentials, timeouts). (6) Utility Layer - Contains helper classes (ScreenshotUtil, ExcelUtil, WaitUtil, DateUtil) for common operations. (7) Data Management - Handles test data from Excel/JSON files with @DataProvider integration. (8) Exception Handling - Custom exceptions and centralized exception handling with logging. (9) Reporting Layer - Extent Reports or Allure integration with TestNG listeners. (10) Logging Framework - Log4j2 for structured logging across all layers. These components interact through clear interfaces: tests call page objects, page objects use utilities and base classes, listeners capture results for reporting, and configuration management provides settings to all layers.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement a robust Page Object Model with BasePage. Describe the structure of BasePage class and how page classes inherit from it. Include specific examples of methods that should be in BasePage.',
          keywords: ['BasePage', 'inheritance', 'WebDriver', 'PageFactory', 'explicit waits', 'common methods', 'click', 'sendKeys', 'getElement', 'waitForElement', 'JavaScript', 'constructor', 'reusability'],
          minKeywords: 3,
          sampleAnswer: 'A robust POM with BasePage implementation follows this structure: BasePage class contains a protected WebDriver instance and common methods that all page classes inherit. The BasePage constructor accepts WebDriver and initializes PageFactory.initElements(). Common methods include: waitForElementToBeClickable(), waitForElementVisible(), clickElement() with explicit wait, sendKeys() with wait and clear, getElementText(), scrollToElement() using JavaScript executor, isElementDisplayed(), and generic wait methods. Example: public void clickElement(By locator) { waitForElementToBeClickable(locator).click(); }. Page classes extend BasePage and pass driver to super constructor. Example: public class LoginPage extends BasePage { @FindBy(id="username") WebElement usernameField; public LoginPage(WebDriver driver) { super(driver); }}. This structure ensures: (1) All pages have access to common utilities without duplication. (2) WebDriver is managed consistently. (3) Wait strategies are standardized. (4) JavaScript execution is centralized. (5) Changes to common methods propagate to all pages. The BasePage may also include methods for handling alerts, switching frames, taking screenshots, and handling stale element references.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe a complete CI/CD integration strategy for Selenium tests. Include build configuration, test execution triggers, reporting, and notification mechanisms. Provide specific examples for Jenkins or GitHub Actions.',
          keywords: ['Jenkins', 'GitHub Actions', 'Maven', 'testng.xml', 'build triggers', 'scheduled execution', 'webhook', 'post-build actions', 'HTML Publisher', 'email notifications', 'artifacts', 'parallel execution', 'Docker', 'pipeline'],
          minKeywords: 4,
          sampleAnswer: 'A complete CI/CD strategy for Selenium tests includes: (1) Build Configuration - Create Jenkins pipeline or GitHub Actions workflow file defining build steps. For Jenkins: Configure Maven project with "mvn clean test" goal pointing to testng.xml suite. For GitHub Actions: Create .github/workflows/selenium-tests.yml with Java setup and Maven commands. (2) Execution Triggers - Configure SCM polling or webhooks to trigger builds on code commits. Add scheduled builds using cron syntax for nightly regression runs. (3) Test Execution - The pipeline executes "mvn clean test -Dsuite=testng.xml" which runs the test suite. Use parameters to pass environment variables (browser, environment). (4) Parallel Execution - Configure testng.xml with parallel="tests" thread-count="3" and ensure framework uses ThreadLocal for thread safety. (5) Reporting - Use Jenkins HTML Publisher plugin to publish Extent Reports or Allure reports. Archive test reports as build artifacts. For GitHub Actions, use actions/upload-artifact to store reports. (6) Notifications - Configure email notifications with Jenkins Email Extension plugin, including report attachments. For GitHub Actions, use Slack or email actions. (7) Docker Integration - Use Docker containers with Chrome/Firefox for consistent test environments. (8) Failure Handling - Configure build to mark as unstable (not failed) if tests fail, capture screenshots, and create JIRA tickets automatically for failures.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Design a comprehensive data-driven testing approach using Excel files with TestNG @DataProvider. Include ExcelUtil implementation, @DataProvider method structure, and how to handle multiple worksheets with different test scenarios.',
          keywords: ['@DataProvider', 'ExcelUtil', 'Apache POI', 'XSSFWorkbook', 'Object[][]', 'multiple sheets', 'parameterized tests', 'DataFormatter', 'test data', 'iteration', 'data provider name', 'sheet name', 'row iteration'],
          minKeywords: 4,
          sampleAnswer: 'A comprehensive data-driven approach with Excel includes: (1) ExcelUtil Class - Create utility with methods: getRowCount(), getCellData(), readSheet() returning Object[][] for @DataProvider. Use Apache POI XSSFWorkbook to open Excel, iterate rows using getLastRowNum(), read cells using getCell() with DataFormatter for type handling. Handle blank cells gracefully. (2) @DataProvider Implementation - Create a method returning Object[][]: @DataProvider(name="loginData") public Object[][] getLoginData() { return ExcelUtil.readSheet("TestData.xlsx", "LoginTests"); }. The 2D array represents rows and columns from Excel where each row is a test iteration. (3) Test Method - Annotate test method with @Test(dataProvider="loginData") and parameters matching Excel columns: public void loginTest(String username, String password, String expectedResult) {}. (4) Multiple Worksheets - Create separate @DataProvider methods for different sheets: getLoginData() for "LoginTests" sheet, getRegistrationData() for "RegistrationTests" sheet. Alternatively, create a generic provider: @DataProvider(name="excelData") public Object[][] getData(Method method) { return ExcelUtil.readSheet("TestData.xlsx", method.getName()); } - this automatically loads sheet matching test method name. (5) Data Structure - First row in Excel contains column headers, subsequent rows contain test data. Use meaningful column names that match test parameters. (6) Advanced Features - Implement data filtering to skip rows marked with "N" in "Execute" column. Add test priority column to control execution order. Include expected result column for assertion data.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain best practices for creating a production-ready Selenium automation framework. Cover at least 8 different aspects including coding standards, design patterns, error handling, reporting, and scalability considerations.',
          keywords: ['Page Object Model', 'design patterns', 'exception handling', 'logging', 'reporting', 'configuration management', 'code reusability', 'maintainability', 'scalability', 'thread safety', 'wait strategies', 'cross-browser', 'documentation', 'code review', 'version control'],
          minKeywords: 5,
          sampleAnswer: 'Best practices for production-ready frameworks: (1) Design Patterns - Implement Page Object Model for page abstraction, Singleton for WebDriver management, Factory for browser creation, and Builder pattern for complex object creation. (2) Code Organization - Maintain clear package structure: pages, tests, utilities, config, base, listeners. Follow naming conventions consistently. (3) Exception Handling - Create custom exceptions extending RuntimeException for domain-specific errors. Implement try-catch-finally blocks appropriately with detailed logging. Use IRetryAnalyzer for transient failures. (4) Wait Strategies - Use explicit waits exclusively (WebDriverWait with ExpectedConditions). Avoid Thread.sleep(). Implement custom wait methods in WaitUtil. Set appropriate timeouts in config. (5) Reporting and Logging - Integrate Extent Reports or Allure with TestNG listeners. Implement Log4j2 with different log levels. Capture screenshots on failure. Include detailed test descriptions. (6) Configuration Management - Externalize all configurations in properties/YAML files. Support multiple environments (dev, QA, prod). Use dependency injection where possible. (7) Data Management - Implement data-driven approach with Excel/JSON. Keep test data separate from test logic. Support parameterized execution. (8) Thread Safety - Use ThreadLocal for WebDriver in parallel execution. Ensure all shared resources are thread-safe. Configure TestNG parallel execution properly. (9) Cross-Browser Testing - Support multiple browsers through BrowserFactory. Use WebDriverManager for driver management. Configure browser options centrally. (10) Code Quality - Follow SOLID principles. Maintain DRY (Do not Repeat Yourself). Write meaningful comments and JavaDoc. Implement code review process. Use SonarQube for code quality checks. (11) Version Control - Maintain proper Git branching strategy. Write meaningful commit messages. Use .gitignore for excluding reports and logs. (12) Scalability - Design framework to handle growing number of tests. Implement proper suite organization with TestNG groups. Support distributed execution with Selenium Grid or cloud services (BrowserStack, Sauce Labs).',
          points: 8
        }
      ]
    }
  ]
};
