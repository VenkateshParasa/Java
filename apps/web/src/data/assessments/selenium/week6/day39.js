export default {
  title: "Day 39: Logging & Reporting Part 2 - Extent Reports & Allure - Assessment",
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
      description: "Choose the correct answer for each question (3 points each)",
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which class is used to create the HTML report in ExtentReports 5?',
          options: [
            'ExtentSparkReporter',
            'ExtentHtmlReporter',
            'ExtentReporter',
            'SparkReporter'
          ],
          correctAnswer: 0,
          explanation: 'ExtentSparkReporter is the reporter class used in ExtentReports 5 to generate HTML reports. ExtentHtmlReporter was used in version 3 but has been replaced by ExtentSparkReporter in version 5.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct method to attach a screenshot to an ExtentTest?',
          options: [
            'test.addScreenshot(path)',
            'test.addScreenCapture(path)',
            'test.attachScreenshot(path)',
            'test.log(Status.INFO, path)'
          ],
          correctAnswer: 1,
          explanation: 'The addScreenCapture() method is used to attach screenshots to ExtentTest reports. It takes the file path of the screenshot as a parameter and embeds it in the report.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In Allure, which annotation is used to mark a method as a step in the test report?',
          options: [
            '@TestStep',
            '@Step',
            '@AllureStep',
            '@ReportStep'
          ],
          correctAnswer: 1,
          explanation: 'The @Step annotation from Allure framework is used to mark methods as steps in the test report. This helps create detailed, readable test reports with step-by-step execution details.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct way to initialize ExtentReports?',
          options: [
            'ExtentReports extent = ExtentReports.getInstance()',
            'ExtentReports extent = new ExtentReports()',
            'ExtentReports extent = ExtentReports.create()',
            'ExtentReports extent = ExtentReporter.initialize()'
          ],
          correctAnswer: 1,
          explanation: 'ExtentReports is initialized using the constructor: new ExtentReports(). After initialization, you need to attach a reporter (like ExtentSparkReporter) to it before creating tests.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Allure severity level indicates a test that blocks the entire system?',
          options: [
            '@Severity(SeverityLevel.CRITICAL)',
            '@Severity(SeverityLevel.BLOCKER)',
            '@Severity(SeverityLevel.MAJOR)',
            '@Severity(SeverityLevel.HIGHEST)'
          ],
          correctAnswer: 1,
          explanation: 'BLOCKER severity level in Allure indicates tests that block the entire system or critical functionality. The hierarchy is: BLOCKER > CRITICAL > NORMAL > MINOR > TRIVIAL.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'How do you attach a reporter to ExtentReports instance?',
          options: [
            'extent.setReporter(sparkReporter)',
            'extent.attachReporter(sparkReporter)',
            'extent.addReporter(sparkReporter)',
            'extent.configureReporter(sparkReporter)'
          ],
          correctAnswer: 1,
          explanation: 'The attachReporter() method is used to attach one or more reporters to the ExtentReports instance. Multiple reporters can be attached to generate reports in different formats simultaneously.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to create a test in ExtentReports?',
          options: [
            'extent.addTest("Test Name")',
            'extent.createTest("Test Name")',
            'extent.newTest("Test Name")',
            'extent.startTest("Test Name")'
          ],
          correctAnswer: 1,
          explanation: 'The createTest() method is used to create a new test in ExtentReports. It returns an ExtentTest object that can be used to log test steps, status, and other information.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In Allure, which method attaches a text file to the report?',
          options: [
            'Allure.addAttachment("title", "text/plain", content)',
            'Allure.attach("title", "text/plain", content, ".txt")',
            'Allure.attachFile("title", content)',
            'Allure.addTextFile("title", content)'
          ],
          correctAnswer: 1,
          explanation: 'Allure.attach() is used to attach various types of content to the report. The parameters are: name, MIME type, content, and file extension. For text files, use "text/plain" as MIME type.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct method to assign a category to a test in ExtentReports?',
          options: [
            'test.setCategory("Smoke")',
            'test.assignCategory("Smoke")',
            'test.category("Smoke")',
            'test.addCategory("Smoke")'
          ],
          correctAnswer: 1,
          explanation: 'The assignCategory() method is used to assign one or more categories to a test in ExtentReports. Categories help organize and filter tests in the report, such as "Smoke", "Regression", "Sanity", etc.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which command generates the Allure report after test execution?',
          options: [
            'allure generate',
            'allure serve',
            'allure report',
            'allure create'
          ],
          correctAnswer: 1,
          explanation: 'The "allure serve" command generates and opens the Allure report in a web browser. Alternatively, "allure generate" can be used to just generate the report without opening it.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct way to log a passed step in ExtentTest?',
          options: [
            'test.pass("Step description")',
            'test.log(Status.PASS, "Step description")',
            'test.logPass("Step description")',
            'Both A and B'
          ],
          correctAnswer: 3,
          explanation: 'Both test.pass() and test.log(Status.PASS, ...) can be used to log a passed step in ExtentReports. The pass() method is a convenience method that internally calls log() with Status.PASS.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'In Allure, which annotation is used to provide a custom test name?',
          options: [
            '@TestName("Custom Name")',
            '@DisplayName("Custom Name")',
            '@Description(value = "Custom Name")',
            '@TestCase("Custom Name")'
          ],
          correctAnswer: 2,
          explanation: 'The @Description annotation with the value parameter is used to provide a custom name for tests in Allure reports. It can also be used to add detailed descriptions to tests and methods.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which ExtentReports configuration sets the document title in the HTML report?',
          options: [
            'sparkReporter.config().setTitle("Report Title")',
            'sparkReporter.config().setDocumentTitle("Report Title")',
            'sparkReporter.setTitle("Report Title")',
            'extent.setDocumentTitle("Report Title")'
          ],
          correctAnswer: 1,
          explanation: 'The setDocumentTitle() method on the reporter configuration object sets the document title that appears in the browser tab. The setReportName() method sets the report name displayed on the report page.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of the categories.json file in Allure?',
          options: [
            'To define test categories for organization',
            'To categorize test failures by error types',
            'To set severity categories',
            'To configure report sections'
          ],
          correctAnswer: 1,
          explanation: 'The categories.json file in Allure is used to categorize test failures based on error messages or exception types. This helps identify patterns in failures, such as "Product defects", "Test defects", etc.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you add system information to ExtentReports?',
          options: [
            'extent.addSystemInfo("OS", "Windows")',
            'extent.setSystemInfo("OS", "Windows")',
            'sparkReporter.config().setSystemInfo("OS", "Windows")',
            'extent.config().addSystemInfo("OS", "Windows")'
          ],
          correctAnswer: 1,
          explanation: 'The setSystemInfo() method on the ExtentReports instance is used to add system/environment information to the report, such as OS, Browser, Environment, etc. This information appears in the report dashboard.',
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
          question: 'ExtentReports version 5 uses ExtentHtmlReporter as the primary reporter.',
          correctAnswer: false,
          explanation: 'False. ExtentReports version 5 uses ExtentSparkReporter, not ExtentHtmlReporter. ExtentHtmlReporter was used in version 3 but has been deprecated and replaced by ExtentSparkReporter in version 5.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'Allure reports require a separate server to view the generated HTML reports.',
          correctAnswer: true,
          explanation: 'True. Allure reports need to be served using a web server. The "allure serve" command starts a built-in Jetty server to display the report. Simply opening the HTML files directly in a browser will not work properly due to CORS restrictions.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'In ExtentReports, you must call extent.flush() to write the report data to the file.',
          correctAnswer: true,
          explanation: 'True. The flush() method is essential in ExtentReports as it writes all logged information to the destination file. Without calling flush(), the report will not be generated or will be incomplete.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'The @Step annotation in Allure can only be used on test methods.',
          correctAnswer: false,
          explanation: 'False. The @Step annotation can be used on any method, not just test methods. It is commonly used on helper methods, page object methods, and utility methods to create detailed step-by-step reports.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'ExtentReports supports parallel test execution without any additional configuration.',
          correctAnswer: false,
          explanation: 'False. When running tests in parallel, ExtentReports requires thread-safe handling. You need to use ThreadLocal<ExtentTest> to ensure each thread has its own test instance, preventing concurrent modification issues.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Allure automatically generates pie charts and graphs for test results.',
          correctAnswer: true,
          explanation: 'True. Allure framework automatically generates various visual representations including pie charts, trend graphs, timelines, and other widgets based on test execution data, making it easy to understand test results at a glance.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'In ExtentReports, you can attach multiple screenshots to a single test step.',
          correctAnswer: true,
          explanation: 'True. ExtentReports allows attaching multiple screenshots to a single test or test step using the addScreenCapture() method multiple times. Each screenshot can be associated with different log entries.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Allure requires TestNG or JUnit to function and cannot work with other test frameworks.',
          correctAnswer: false,
          explanation: 'False. While Allure has excellent integration with TestNG and JUnit, it also supports other frameworks like Cucumber, pytest, and can be used with custom frameworks through its API.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'ExtentReports allows adding custom JavaScript and CSS to customize report appearance.',
          correctAnswer: true,
          explanation: 'True. ExtentReports allows customization through CSS and JavaScript injection using the config().setCSS() and config().setJS() methods, enabling you to modify the report appearance and behavior.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'In Allure, the @Link annotation can be used to add references to bug tracking systems.',
          correctAnswer: true,
          explanation: 'True. The @Link annotation in Allure can be used to add hyperlinks to external resources like bug tracking systems (JIRA), test management tools, or documentation. There are also specialized annotations like @Issue and @TmsLink.',
          points: 2
        }
      ]
    },
    {
      title: "Section C: Fill in the Blank Questions",
      description: "Complete each statement with the correct term (4 points each)",
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'To generate Allure results during test execution, you need to specify the ________ directory in the TestNG listener or Maven configuration.',
          correctAnswer: 'allure-results',
          explanation: 'The allure-results directory is where Allure stores the raw JSON files during test execution. This directory is then used by the "allure generate" or "allure serve" commands to create the HTML report.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In ExtentReports, the ________ method is used to create a child node under a parent test.',
          correctAnswer: 'createNode',
          explanation: 'The createNode() method creates a child test node under a parent test in ExtentReports. This is useful for creating hierarchical test structures, such as organizing test steps or grouping related tests.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The Allure annotation ________ is used to group tests by features or user stories.',
          correctAnswer: '@Feature',
          explanation: 'The @Feature annotation in Allure is used to group tests by features or functional areas. It works in conjunction with @Story annotation to create a hierarchical structure in the report.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'In ExtentReports, the ________ class enum is used to define the status of a log entry, such as PASS, FAIL, or SKIP.',
          correctAnswer: 'Status',
          explanation: 'The Status enum in ExtentReports defines different log statuses: PASS, FAIL, SKIP, WARNING, and INFO. It is used with the log() method to indicate the outcome of test steps.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To capture screenshots in Allure using Selenium WebDriver, you can use the ________ class to take the screenshot and then attach it using Allure.addAttachment().',
          correctAnswer: 'TakesScreenshot',
          explanation: 'The TakesScreenshot interface in Selenium WebDriver is used to capture screenshots. The WebDriver instance is cast to TakesScreenshot, and the getScreenshotAs() method is called to capture the screenshot, which can then be attached to Allure reports.',
          points: 4
        }
      ]
    },
    {
      title: "Section D: Short Answer Questions",
      description: "Provide detailed answers demonstrating your understanding (8 points each)",
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to set up ExtentReports for parallel test execution in a TestNG framework. What considerations are important to avoid report corruption?',
          keywords: ['ThreadLocal', 'ExtentTest', 'synchronized', 'thread-safe', 'flush', 'concurrent', 'parallel'],
          minKeywords: 3,
          sampleAnswer: 'To set up ExtentReports for parallel test execution in TestNG, you need to ensure thread-safety. First, declare ExtentTest as ThreadLocal<ExtentTest> to maintain separate test instances for each thread. In the @BeforeMethod, use ThreadLocal.set() to create a new test for each thread. Make the ExtentReports and reporter initialization synchronized or use a singleton pattern to ensure only one instance exists. Use ThreadLocal.get() to retrieve the test instance in test methods. In @AfterMethod, log the test status and call ThreadLocal.remove() to prevent memory leaks. Finally, call extent.flush() in @AfterSuite to write all data to the report. The key considerations are: using ThreadLocal to prevent concurrent modification, synchronizing shared resources like ExtentReports instance, properly cleaning up ThreadLocal variables, and ensuring flush() is called only once after all tests complete.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe the process of integrating Allure with a Maven-based Selenium TestNG project. Include the necessary dependencies and configuration steps.',
          keywords: ['allure-testng', 'aspectjweaver', 'maven-surefire-plugin', 'listener', 'pom.xml', 'dependency', 'properties'],
          minKeywords: 3,
          sampleAnswer: 'To integrate Allure with a Maven-based Selenium TestNG project, follow these steps: First, add the allure-testng dependency in pom.xml with the appropriate version. Also add aspectjweaver dependency which is required for Allure annotations to work. Configure the maven-surefire-plugin in the build section and add AllureTestNG as a listener in the plugin configuration. Set the argLine property to include the aspectjweaver javaagent. Define Allure version properties in the properties section. Create an allure.properties file in src/test/resources if custom configuration is needed. Add the allure-maven plugin to generate reports using Maven commands. Run tests using "mvn clean test" which generates results in the allure-results directory. Finally, generate and view the report using "mvn allure:serve" or "allure serve target/allure-results". This setup ensures Allure captures test execution data and generates comprehensive reports.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Compare ExtentReports and Allure reporting frameworks. Discuss at least three key differences in terms of features, setup complexity, and report visualization.',
          keywords: ['ExtentReports', 'Allure', 'setup', 'visualization', 'real-time', 'server', 'customization', 'annotations'],
          minKeywords: 4,
          sampleAnswer: 'ExtentReports and Allure have several key differences: Setup Complexity - ExtentReports is simpler to set up, requiring just adding a dependency and writing code to initialize reporters, while Allure requires Maven/Gradle plugin configuration, AspectJ weaver, and command-line tools. Report Generation - ExtentReports generates static HTML files that can be opened directly in browsers, whereas Allure requires serving reports through a web server using "allure serve". Visualization - Allure provides more sophisticated visualizations including timelines, trends across builds, behavior-driven views, and detailed graphs, while ExtentReports offers cleaner, simpler reports with dashboard views. Customization - ExtentReports offers easier customization through CSS/JS injection and configuration methods, while Allure customization requires more configuration files and is less straightforward. Annotations - Allure has rich annotation support (@Step, @Feature, @Story, @Severity) that works with minimal code, while ExtentReports requires explicit method calls for similar functionality. Integration - Allure integrates better with CI/CD pipelines and has built-in history tracking, while ExtentReports is more suited for standalone test execution.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement a utility class for capturing screenshots and attaching them to both ExtentReports and Allure reports. What are the key methods required?',
          keywords: ['TakesScreenshot', 'getScreenshotAs', 'File', 'addScreenCapture', 'Allure.addAttachment', 'ByteArrayInputStream', 'MediaType'],
          minKeywords: 3,
          sampleAnswer: 'To implement a screenshot utility class for both ExtentReports and Allure, create a class with a method that accepts WebDriver and test name as parameters. First, cast the WebDriver to TakesScreenshot interface. Use getScreenshotAs(OutputType.FILE) to capture the screenshot as a file and save it to a designated folder with a timestamp and test name. For ExtentReports, return the file path and use test.addScreenCapture(path) to attach it. For Allure, use getScreenshotAs(OutputType.BYTES) to get the screenshot as a byte array, then use Allure.addAttachment("Screenshot", "image/png", new ByteArrayInputStream(bytes), ".png") to attach it. The utility class should handle exceptions gracefully and provide methods like captureScreenshot(), captureFailureScreenshot(), and captureElementScreenshot(). For element-specific screenshots, use the TakesScreenshot interface on WebElement. The key is to maintain separate methods or a flag to determine which reporting framework to use, or implement both simultaneously. Also, ensure thread-safety if used in parallel execution by using thread-specific file names.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to configure custom categories in Allure reports to classify test failures. Provide an example of the categories.json structure and explain its purpose.',
          keywords: ['categories.json', 'messageRegex', 'matchedStatuses', 'Product defects', 'Test defects', 'failure classification', 'traceRegex'],
          minKeywords: 3,
          sampleAnswer: 'Custom categories in Allure help classify test failures into meaningful groups for better analysis. Create a categories.json file in the root of the allure-results directory. The structure is an array of category objects, each with properties: "name" (category label), "matchedStatuses" (array of statuses like "failed", "broken"), "messageRegex" (regex to match error messages), and "traceRegex" (regex to match stack traces). For example: [{"name": "Product defects", "matchedStatuses": ["failed"], "messageRegex": ".*NoSuchElementException.*"}, {"name": "Test defects", "matchedStatuses": ["broken"], "messageRegex": ".*NullPointerException.*"}]. The purpose is to automatically categorize failures based on exception types or error messages, making it easier to identify whether issues are due to product bugs, test code problems, or infrastructure issues. This categorization appears on the Allure dashboard as a separate widget showing distribution of failures by category. You can define multiple categories with different patterns, and Allure will match failures to the first matching category. This helps QA teams prioritize bug fixes and identify patterns in test failures.',
          points: 8
        }
      ]
    }
  ]
};
