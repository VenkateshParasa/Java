export default {
  title: "Day 7: Basic Framework Setup & Week 1 Review Assessment",
  description: "Comprehensive assessment covering TestNG basics, Maven setup, project structure, and Week 1 concepts",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 12,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 30,
      timeLimit: 30,
      sections: ['section-a', 'section-b', 'section-c', 'section-d', 'section-e']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Multiple Choice Questions - TestNG Basics',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is TestNG?',
          options: [
            'A Java IDE',
            'A testing framework inspired by JUnit',
            'A build automation tool',
            'A browser driver'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'TestNG (Test Next Generation) is a testing framework inspired by JUnit but with more powerful features for test configuration and execution.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which annotation runs before each test method?',
          options: [
            '@BeforeClass',
            '@BeforeTest',
            '@BeforeMethod',
            '@BeforeSuite'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: '@BeforeMethod runs before each @Test method, making it ideal for setup that needs to run before every test.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'What is the correct annotation to mark a method as a test in TestNG?',
          options: [
            '@TestMethod',
            '@Test',
            '@TestCase',
            '@RunTest'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: '@Test annotation marks a method as a test method that will be executed by TestNG.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which annotation runs once before all tests in a class?',
          options: [
            '@BeforeMethod',
            '@BeforeTest',
            '@BeforeClass',
            '@BeforeSuite'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: '@BeforeClass runs once before any test methods in the current class, useful for expensive setup operations.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What is the execution order of TestNG annotations?',
          options: [
            '@BeforeMethod → @BeforeClass → @Test',
            '@BeforeSuite → @BeforeTest → @BeforeClass → @BeforeMethod → @Test',
            '@BeforeClass → @BeforeTest → @BeforeMethod → @Test',
            '@Test → @BeforeMethod → @BeforeClass'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'TestNG execution order: @BeforeSuite → @BeforeTest → @BeforeClass → @BeforeMethod → @Test → @AfterMethod → @AfterClass → @AfterTest → @AfterSuite'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'How do you configure TestNG tests to run in parallel?',
          options: [
            'Using @Parallel annotation',
            'In testng.xml with parallel attribute',
            'In pom.xml',
            'Using @Concurrent annotation'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Parallel execution is configured in testng.xml using the parallel attribute (methods, tests, classes, or instances).'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the purpose of testng.xml?',
          options: [
            'To define dependencies',
            'To configure and organize test execution',
            'To compile Java code',
            'To manage browser drivers'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'testng.xml is used to configure test suites, define test execution order, set parameters, and organize test runs.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'Which attribute makes a test dependent on another test in TestNG?',
          options: [
            'requires',
            'dependsOn',
            'dependsOnMethods',
            'after'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: '@Test(dependsOnMethods={"testMethod"}) makes the test dependent on successful execution of specified methods.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'What is Maven?',
          options: [
            'A testing framework',
            'A build automation and dependency management tool',
            'An IDE for Java',
            'A version control system'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Maven is a build automation tool that manages project dependencies, compiles code, runs tests, and packages applications.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'Which file contains Maven project configuration?',
          options: [
            'build.xml',
            'pom.xml',
            'config.xml',
            'maven.xml'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'pom.xml (Project Object Model) contains all Maven project configuration including dependencies, plugins, and build settings.'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'Where should test source code be placed in a Maven project?',
          options: [
            'src/main/java',
            'src/test/java',
            'test/java',
            'src/java/test'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Maven convention places test code in src/test/java directory, separate from main application code in src/main/java.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'Which Maven command compiles and runs tests?',
          options: [
            'mvn compile',
            'mvn run',
            'mvn test',
            'mvn execute'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'mvn test compiles the code and runs all tests in the src/test/java directory.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Multiple Choice Questions - Week 1 Review',
      questions: [
        {
          id: 'q13',
          type: 'mcq',
          question: 'Which locator strategy is most reliable and fastest?',
          options: [
            'XPath',
            'CSS Selector',
            'ID',
            'Class Name'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'ID is the fastest and most reliable locator because IDs should be unique and browsers can find them quickly.'
        },
        {
          id: 'q14',
          type: 'mcq',
          question: 'What is the main difference between driver.get() and driver.navigate().to()?',
          options: [
            'get() is faster',
            'navigate().to() provides access to browser history methods',
            'They are identical',
            'get() supports only HTTP'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'navigate().to() provides access to back(), forward(), and refresh() methods for browser navigation.'
        },
        {
          id: 'q15',
          type: 'mcq',
          question: 'Which wait type applies globally to all findElement calls?',
          options: [
            'Explicit wait',
            'Fluent wait',
            'Implicit wait',
            'Thread.sleep'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'Implicit wait is set once and applies to all findElement() and findElements() calls throughout the session.'
        },
        {
          id: 'q16',
          type: 'mcq',
          question: 'Which method is used to handle dropdown selections in Selenium?',
          options: [
            'WebElement click',
            'Select class',
            'Actions class',
            'JavascriptExecutor'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Select class provides methods like selectByVisibleText(), selectByValue(), and selectByIndex() for dropdown handling.'
        },
        {
          id: 'q17',
          type: 'mcq',
          question: 'What happens when findElement() cannot locate an element?',
          options: [
            'Returns null',
            'Returns empty string',
            'Throws NoSuchElementException',
            'Waits indefinitely'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'easy',
          explanation: 'findElement() throws NoSuchElementException if it cannot locate the element within the implicit wait time.'
        },
        {
          id: 'q18',
          type: 'mcq',
          question: 'How do you switch back to main content from a frame?',
          options: [
            'driver.switchTo().parent()',
            'driver.switchTo().defaultContent()',
            'driver.exitFrame()',
            'driver.switchTo().main()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'driver.switchTo().defaultContent() switches back to the main page content from any frame.'
        },
        {
          id: 'q19',
          type: 'mcq',
          question: 'Which interface must be implemented to take screenshots?',
          options: [
            'Screenshot',
            'TakesScreenshot',
            'CaptureScreen',
            'ImageCapture'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Cast WebDriver to TakesScreenshot interface to access screenshot functionality.'
        },
        {
          id: 'q20',
          type: 'mcq',
          question: 'What is the purpose of clear() method?',
          options: [
            'Clear browser cache',
            'Clear text from input fields',
            'Clear cookies',
            'Clear browser history'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'element.clear() removes text content from input fields and textareas.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q21',
          type: 'true-false',
          question: '@AfterMethod runs after each test method completes.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. @AfterMethod executes after each @Test method, useful for cleanup operations like closing browsers.'
        },
        {
          id: 'q22',
          type: 'true-false',
          question: 'TestNG allows test prioritization using the priority attribute.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. @Test(priority=1) sets execution order. Lower priority values execute first.'
        },
        {
          id: 'q23',
          type: 'true-false',
          question: 'Maven requires manual download of all dependencies.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. Maven automatically downloads dependencies specified in pom.xml from central repositories.'
        },
        {
          id: 'q24',
          type: 'true-false',
          question: 'Implicit and explicit waits should be mixed for best results.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. Mixing implicit and explicit waits can cause unpredictable wait times and is not recommended.'
        },
        {
          id: 'q25',
          type: 'true-false',
          question: 'You can interact with page elements while an alert is present.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. Alerts must be handled (accepted or dismissed) before interacting with page elements.'
        },
        {
          id: 'q26',
          type: 'true-false',
          question: 'driver.quit() should always be called in @AfterMethod or @AfterClass.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Proper cleanup with driver.quit() in teardown methods ensures browser resources are freed.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q27',
          type: 'fill-blank',
          question: 'The annotation ________ marks a method to run once before all test methods in a class.',
          correctAnswer: '@BeforeClass',
          points: 2,
          difficulty: 'easy',
          explanation: '@BeforeClass annotation runs once before all test methods in the current class.'
        },
        {
          id: 'q28',
          type: 'fill-blank',
          question: 'Maven stores downloaded dependencies in the local ________ repository.',
          correctAnswer: '.m2',
          points: 2,
          difficulty: 'medium',
          explanation: 'Maven stores dependencies in the .m2 directory (usually in user home directory) as a local cache.'
        }
      ]
    },
    {
      id: 'section-e',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q29',
          type: 'short',
          question: 'Explain the complete TestNG annotation lifecycle with @BeforeSuite, @BeforeTest, @BeforeClass, @BeforeMethod, @Test, and their After counterparts.',
          sampleAnswer: 'TestNG Annotation Lifecycle (execution order): 1) @BeforeSuite - Runs once before all tests in the suite. Use: One-time setup for entire test suite. 2) @BeforeTest - Runs before each <test> tag in testng.xml. Use: Setup for test groups. 3) @BeforeClass - Runs once before first test method in current class. Use: Class-level initialization like WebDriver setup. 4) @BeforeMethod - Runs before each @Test method. Use: Method-level setup like navigating to URL. 5) @Test - The actual test method. Multiple @Test methods can exist. 6) @AfterMethod - Runs after each @Test method. Use: Cleanup like taking screenshots. 7) @AfterClass - Runs once after all tests in class complete. Use: driver.quit(), resource cleanup. 8) @AfterTest - Runs after each <test> tag completes. 9) @AfterSuite - Runs once after all tests in suite complete. Use: Final cleanup, report generation. Example: Suite → Test → Class → Method → @Test → Method → Class → Test → Suite. Best Practice: Use @BeforeClass for driver initialization, @AfterClass for driver.quit().',
          points: 5,
          difficulty: 'hard',
          keywords: ['BeforeSuite', 'BeforeTest', 'BeforeClass', 'BeforeMethod', 'AfterMethod', 'AfterClass', 'lifecycle', 'execution order', 'setup', 'cleanup']
        },
        {
          id: 'q30',
          type: 'short',
          question: 'Describe the standard Maven project structure for a Selenium TestNG project and explain the purpose of each directory.',
          sampleAnswer: 'Standard Maven-Selenium-TestNG Project Structure: 1) project-root/ - Root directory containing pom.xml. 2) pom.xml - Maven configuration file with dependencies (selenium-java, testng, webdrivermanager), plugins (maven-surefire-plugin for test execution), project metadata. 3) src/main/java/ - Main application code (if any). For test-only projects, may be empty. 4) src/main/resources/ - Resources like configuration files, property files. 5) src/test/java/ - All test classes go here. Package structure: com.project.tests. TestNG test classes with @Test annotations. 6) src/test/resources/ - Test resources: testng.xml (test suite configuration), test data files (Excel, JSON), log4j.properties for logging. 7) target/ - Generated by Maven: compiled classes (target/classes, target/test-classes), test reports (target/surefire-reports), JAR/WAR files. 8) .m2/repository/ - Local Maven repository (in user home). Best Practices: Follow Maven conventions, keep test and main code separate, use testng.xml for test organization, add target/ to .gitignore.',
          points: 5,
          difficulty: 'hard',
          keywords: ['Maven', 'src/test/java', 'src/main/java', 'pom.xml', 'testng.xml', 'resources', 'target', 'project structure', 'dependencies']
        }
      ]
    }
  ],
  week: 1,
  day: 7,
  topic: "Basic Framework Setup & Week 1 Review"
};
