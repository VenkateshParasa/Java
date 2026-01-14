export default {
  title: "Day 45: BDD with Cucumber - Assessment",
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
          question: 'What does BDD stand for in software development?',
          options: [
            'Behavior Driven Development',
            'Business Driven Development',
            'Browser Driven Development',
            'Backend Driven Development'
          ],
          correctAnswer: 0,
          explanation: 'BDD stands for Behavior Driven Development. It is a software development approach that focuses on defining the expected behavior of the system using examples in plain language that all stakeholders can understand.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which language is used to write feature files in Cucumber?',
          options: [
            'Java',
            'JavaScript',
            'Gherkin',
            'Python'
          ],
          correctAnswer: 2,
          explanation: 'Gherkin is a business-readable, domain-specific language used to write feature files in Cucumber. It uses keywords like Given, When, Then, And, But to describe software behavior without detailing how that behavior is implemented.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary purpose of a Feature file in Cucumber?',
          options: [
            'To store test data',
            'To define the expected behavior of a feature using scenarios',
            'To configure Cucumber options',
            'To implement step definitions'
          ],
          correctAnswer: 1,
          explanation: 'A Feature file describes the expected behavior of a software feature using scenarios written in Gherkin syntax. It serves as living documentation and test specifications that can be understood by all stakeholders.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Gherkin keyword is used to describe the initial context or preconditions of a scenario?',
          options: [
            'When',
            'Then',
            'Given',
            'And'
          ],
          correctAnswer: 2,
          explanation: 'The Given keyword is used to describe the initial context, state, or preconditions of the system before the user action. It sets up the test scenario by establishing the starting point.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of Step Definitions in Cucumber?',
          options: [
            'To write feature descriptions',
            'To map Gherkin steps to executable code',
            'To configure test execution',
            'To generate test reports'
          ],
          correctAnswer: 1,
          explanation: 'Step Definitions provide the implementation code that maps each Gherkin step (Given/When/Then) to actual executable actions. They bridge the gap between business-readable scenarios and technical automation code.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the difference between Scenario and Scenario Outline in Cucumber?',
          options: [
            'Scenario Outline is used for parallel execution only',
            'Scenario Outline allows parameterization with Examples table for data-driven testing',
            'Scenario is faster than Scenario Outline',
            'There is no difference, they are aliases'
          ],
          correctAnswer: 1,
          explanation: 'Scenario Outline is a template that can be executed multiple times with different sets of data provided in an Examples table. It enables data-driven testing, while a regular Scenario runs once with fixed values.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which annotation is used in Cucumber-JUnit to specify the location of feature files?',
          options: [
            '@Features',
            '@FeaturePath',
            '@CucumberOptions(features = "path")',
            '@FeatureLocation'
          ],
          correctAnswer: 2,
          explanation: '@CucumberOptions annotation is used to configure Cucumber execution. The features attribute specifies the path to feature files, while glue specifies the package containing step definitions.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of Tags in Cucumber?',
          options: [
            'To add comments to feature files',
            'To organize and selectively execute scenarios',
            'To define variables',
            'To import libraries'
          ],
          correctAnswer: 1,
          explanation: 'Tags (prefixed with @) are used to organize and categorize scenarios. They enable selective execution of specific scenarios (e.g., @smoke, @regression) and help manage test suites effectively.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Cucumber hook annotation runs before each scenario?',
          options: [
            '@BeforeScenario',
            '@Before',
            '@BeforeAll',
            '@PreScenario'
          ],
          correctAnswer: 1,
          explanation: '@Before annotation in Cucumber runs before each scenario. It is used for setup activities like initializing WebDriver, clearing test data, or preparing the test environment. @After runs after each scenario for cleanup.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the file extension for Cucumber feature files?',
          options: [
            '.cucumber',
            '.feature',
            '.gherkin',
            '.test'
          ],
          correctAnswer: 1,
          explanation: 'Feature files in Cucumber use the .feature extension. These files contain Gherkin syntax to describe features and scenarios, and they are stored in the features directory of the project.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What does the "glue" option in @CucumberOptions specify?',
          options: [
            'The path to feature files',
            'The package path where step definitions are located',
            'The test data location',
            'The report output directory'
          ],
          correctAnswer: 1,
          explanation: 'The glue option in @CucumberOptions specifies the package(s) containing step definition classes. Cucumber uses this to find and bind step definitions to Gherkin steps in feature files.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which keyword is used to describe the action or event in a Gherkin scenario?',
          options: [
            'Given',
            'When',
            'Then',
            'But'
          ],
          correctAnswer: 1,
          explanation: 'The When keyword describes the action or event that triggers the behavior being tested. It represents the key action that the user or system performs during the scenario execution.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is a Data Table in Cucumber?',
          options: [
            'A database table for storing test results',
            'A Gherkin feature to pass multiple rows of data to a step definition',
            'A reporting format',
            'A configuration file format'
          ],
          correctAnswer: 1,
          explanation: 'Data Tables in Cucumber allow passing multiple rows and columns of data to a step definition. They are defined using pipe (|) separators and can be accessed as DataTable or converted to List, Map, or custom objects.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you pass parameters to step definitions from feature files?',
          options: [
            'Using curly braces {parameter}',
            'Using double quotes "parameter" and regular expressions or Cucumber expressions',
            'Using square brackets [parameter]',
            'Using at symbol @parameter'
          ],
          correctAnswer: 1,
          explanation: 'Parameters are captured from feature file steps using double quotes for strings or regular expressions/Cucumber expressions in step definitions. For example: When I enter "username" matches @When("I enter {string}") or @When("^I enter \\"(.*)\\\"$").',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the best practice for writing Gherkin scenarios?',
          options: [
            'Include implementation details in scenarios',
            'Write scenarios from the user perspective focusing on behavior, not implementation',
            'Use technical jargon and code references',
            'Write as many steps as possible in one scenario'
          ],
          correctAnswer: 1,
          explanation: 'Best practice is to write scenarios from the user perspective, focusing on business behavior rather than technical implementation. Keep scenarios declarative, readable, and independent. Avoid UI-specific details and technical jargon.',
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
          question: 'BDD focuses on technical implementation details rather than business behavior.',
          correctAnswer: false,
          explanation: 'False. BDD focuses on business behavior and expected outcomes from the user perspective, not technical implementation details. It bridges the gap between technical and non-technical stakeholders.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'A Feature file can contain multiple scenarios.',
          correctAnswer: true,
          explanation: 'True. A Feature file can and typically does contain multiple scenarios that test different aspects or behaviors of the same feature. Each scenario should test a specific behavior or use case.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'The order of Given-When-Then steps in a scenario does not matter.',
          correctAnswer: false,
          explanation: 'False. The order matters and follows a specific pattern: Given (preconditions), When (action), Then (expected outcome). This structure makes scenarios logical and easy to understand.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'Step definitions can be reused across multiple scenarios and feature files.',
          correctAnswer: true,
          explanation: 'True. Step definitions are reusable. A single step definition can be used by multiple scenarios across different feature files, promoting code reuse and maintainability.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Background in Cucumber runs before every scenario in a feature file.',
          correctAnswer: true,
          explanation: 'True. The Background section contains steps that run before each scenario in a feature file. It is used to define common preconditions or setup steps that apply to all scenarios in that feature.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Tags can be applied at both Feature and Scenario levels.',
          correctAnswer: true,
          explanation: 'True. Tags can be applied to both features and individual scenarios. When applied at feature level, all scenarios in that feature inherit the tag. Scenarios can also have their own specific tags.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Cucumber can only be integrated with Selenium WebDriver for web testing.',
          correctAnswer: false,
          explanation: 'False. While Cucumber is commonly used with Selenium for web testing, it can be integrated with any testing framework or tool. It can be used for API testing, mobile testing, database testing, etc.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'The @After hook in Cucumber is ideal for cleanup activities like closing browser sessions.',
          correctAnswer: true,
          explanation: 'True. @After hooks run after each scenario and are perfect for cleanup activities such as closing browser sessions, deleting test data, taking screenshots on failure, and resetting application state.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Scenario Outline Examples table must have at least two columns.',
          correctAnswer: false,
          explanation: 'False. An Examples table can have just one column if only one parameter needs to vary. However, it must have at least one data row in addition to the header row to be valid.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Feature files serve as both executable specifications and living documentation.',
          correctAnswer: true,
          explanation: 'True. Feature files serve dual purposes: they are executable test specifications that can be run by Cucumber, and they also serve as living documentation that stays up-to-date with the system behavior.',
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
          question: 'The __________ keyword in Gherkin is used to describe the expected outcome or result of a scenario.',
          correctAnswer: 'Then',
          explanation: 'Then keyword is used to describe the expected outcome or result that should be observed after the action is performed. It represents the assertion or verification step in the scenario.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In Cucumber, the __________ annotation is used to specify the plugin for generating reports.',
          correctAnswer: '@CucumberOptions',
          explanation: '@CucumberOptions annotation is used to configure various Cucumber settings including plugin for reports (like "pretty", "html:target/cucumber-reports", "json:target/cucumber.json").',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ section in a feature file contains steps that run before every scenario in that feature.',
          correctAnswer: 'Background',
          explanation: 'Background section defines steps that are common to all scenarios in a feature file. It runs before each scenario and helps eliminate duplication of Given steps.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'In step definitions, the __________ class from io.cucumber.java.en package provides annotations like @Given, @When, and @Then.',
          correctAnswer: 'en',
          explanation: 'The io.cucumber.java.en package contains English language step definition annotations (@Given, @When, @Then, @And, @But). Cucumber also supports other languages with their respective packages.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To execute specific scenarios, you can use __________ notation (starting with @) to tag and filter them.',
          correctAnswer: 'tags',
          explanation: 'Tags are markers prefixed with @ symbol that are used to organize and selectively execute scenarios. They can be combined with logical operators (and, or, not) in @CucumberOptions for filtered execution.',
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
          question: 'Write a complete feature file for a login functionality with at least one Scenario and one Scenario Outline. Include proper Gherkin syntax with Given, When, Then steps and an Examples table.',
          keywords: ['Feature:', 'Scenario:', 'Scenario Outline:', 'Given', 'When', 'Then', 'Examples:', '|', 'login', 'username', 'password', '<', '>', 'Background'],
          minKeywords: 3,
          sampleAnswer: 'Feature: User Login\n  As a registered user\n  I want to login to the application\n  So that I can access my account\n\n  Background:\n    Given I am on the login page\n\n  Scenario: Successful login with valid credentials\n    When I enter username "validuser@test.com"\n    And I enter password "Password123"\n    And I click on login button\n    Then I should see the dashboard page\n    And I should see welcome message "Welcome, Valid User"\n\n  Scenario Outline: Login with different credentials\n    When I enter username "<username>"\n    And I enter password "<password>"\n    And I click on login button\n    Then I should see "<result>"\n\n    Examples:\n      | username           | password    | result                  |\n      | valid@test.com     | Pass123     | Dashboard               |\n      | invalid@test.com   | Wrong123    | Invalid credentials     |\n      | test@test.com      |             | Password is required    |',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement step definitions for Cucumber with Selenium WebDriver. Provide a code example showing how to map a Gherkin step to Java code including WebDriver initialization.',
          keywords: ['@Given', '@When', '@Then', 'public void', 'WebDriver', 'driver', 'ChromeDriver', 'findElement', 'By', 'sendKeys', 'click', 'step definition', 'annotation', 'parameter'],
          minKeywords: 3,
          sampleAnswer: 'Step definitions map Gherkin steps to Java code. First, create a step definition class and initialize WebDriver. Example:\n\npublic class LoginSteps {\n    WebDriver driver;\n\n    @Given("I am on the login page")\n    public void navigateToLoginPage() {\n        driver = new ChromeDriver();\n        driver.get("https://example.com/login");\n        driver.manage().window().maximize();\n    }\n\n    @When("I enter username {string}")\n    public void enterUsername(String username) {\n        driver.findElement(By.id("username")).sendKeys(username);\n    }\n\n    @When("I enter password {string}")\n    public void enterPassword(String password) {\n        driver.findElement(By.id("password")).sendKeys(password);\n    }\n\n    @When("I click on login button")\n    public void clickLogin() {\n        driver.findElement(By.id("loginBtn")).click();\n    }\n\n    @Then("I should see the dashboard page")\n    public void verifyDashboard() {\n        Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"));\n        driver.quit();\n    }\n}\n\nThe {string} captures parameters from feature file steps and passes them to methods.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to configure Cucumber with TestNG or JUnit. Include the runner class setup with @CucumberOptions explaining features, glue, plugin, and tags attributes.',
          keywords: ['@RunWith', 'CucumberOptions', 'features', 'glue', 'plugin', 'tags', 'runner', 'TestNG', 'JUnit', 'AbstractTestNGCucumberTests', 'Cucumber.class', 'report', 'json', 'html'],
          minKeywords: 3,
          sampleAnswer: 'To configure Cucumber with JUnit/TestNG, create a runner class:\n\nFor JUnit:\nimport org.junit.runner.RunWith;\nimport io.cucumber.junit.Cucumber;\nimport io.cucumber.junit.CucumberOptions;\n\n@RunWith(Cucumber.class)\n@CucumberOptions(\n    features = "src/test/resources/features",  // Path to feature files\n    glue = "stepDefinitions",  // Package containing step definitions\n    plugin = {  // Report generation plugins\n        "pretty",\n        "html:target/cucumber-reports/cucumber.html",\n        "json:target/cucumber-reports/cucumber.json",\n        "junit:target/cucumber-reports/cucumber.xml"\n    },\n    tags = "@smoke or @regression",  // Execute specific tagged scenarios\n    monochrome = true,  // Readable console output\n    dryRun = false  // Set true to check step definition mapping without execution\n)\npublic class TestRunner {\n}\n\nFor TestNG:\nimport io.cucumber.testng.AbstractTestNGCucumberTests;\n\n@CucumberOptions(...)\npublic class TestRunner extends AbstractTestNGCucumberTests {\n}\n\nThe features attribute specifies feature file location, glue specifies step definition packages, plugin generates reports in various formats, and tags filter scenarios for execution.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement Cucumber hooks (@Before and @After) for test setup and teardown. Provide examples showing WebDriver initialization, screenshot capture on failure, and resource cleanup.',
          keywords: ['@Before', '@After', 'hooks', 'Scenario', 'isFailed', 'WebDriver', 'driver', 'quit', 'TakesScreenshot', 'screenshot', 'setup', 'teardown', 'cleanup', 'tag', 'order'],
          minKeywords: 3,
          sampleAnswer: 'Cucumber hooks execute before/after scenarios for setup and cleanup:\n\nimport io.cucumber.java.Before;\nimport io.cucumber.java.After;\nimport io.cucumber.java.Scenario;\nimport org.openqa.selenium.WebDriver;\nimport org.openqa.selenium.chrome.ChromeDriver;\nimport org.openqa.selenium.TakesScreenshot;\nimport org.openqa.selenium.OutputType;\n\npublic class Hooks {\n    public static WebDriver driver;\n\n    @Before(order = 1)  // Runs before each scenario, order controls execution sequence\n    public void setup() {\n        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");\n        driver = new ChromeDriver();\n        driver.manage().window().maximize();\n        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);\n    }\n\n    @Before(value = "@database", order = 0)  // Conditional hook for specific tag\n    public void databaseSetup() {\n        // Database connection and test data setup\n    }\n\n    @After(order = 1)  // Runs after each scenario\n    public void tearDown(Scenario scenario) {\n        if (scenario.isFailed()) {\n            // Capture screenshot on failure\n            byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);\n            scenario.attach(screenshot, "image/png", scenario.getName());\n        }\n        driver.quit();  // Always close browser\n    }\n}\n\nHooks with tags run only for scenarios with matching tags. The order attribute controls execution sequence when multiple hooks exist.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the benefits of using BDD with Cucumber in automation frameworks? Discuss at least four advantages and how it improves collaboration between teams.',
          keywords: ['collaboration', 'communication', 'business', 'stakeholder', 'documentation', 'readable', 'reusable', 'maintainable', 'requirements', 'specification', 'living', 'test-first', 'behavior', 'non-technical'],
          minKeywords: 3,
          sampleAnswer: 'Benefits of BDD with Cucumber:\n\n1. Improved Collaboration: Bridges the gap between technical and non-technical stakeholders. Business analysts, developers, and testers collaborate using a common language (Gherkin) that everyone understands.\n\n2. Living Documentation: Feature files serve as executable specifications that stay synchronized with the actual system behavior. They document what the system does in a readable format accessible to all team members.\n\n3. Better Requirements Understanding: Writing scenarios in Given-When-Then format forces teams to think through requirements clearly before implementation, reducing ambiguity and misunderstandings.\n\n4. Reusability and Maintainability: Step definitions are reusable across multiple scenarios and features. Changes in implementation require updates only in step definitions, not in feature files.\n\n5. Early Defect Detection: Writing feature files before implementation (test-first approach) helps identify gaps and issues in requirements early in the development cycle.\n\n6. Better Test Coverage: Business-focused scenarios ensure testing from user perspective rather than technical perspective, leading to more meaningful test coverage.\n\n7. Easier Onboarding: New team members can understand system behavior by reading feature files without diving into code.\n\n8. Traceability: Direct mapping between business requirements and test scenarios provides clear traceability.',
          points: 8
        }
      ]
    }
  ]
};
