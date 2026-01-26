export default {
  title: "Day 16: Selenium Introduction & Setup - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key Selenium setup concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all Selenium introduction and setup topics"
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
          question: 'What is Selenium WebDriver?',
          options: [
            'A programming language',
            'A browser automation library',
            'An operating system',
            'A testing framework like TestNG'
          ],
          correctAnswer: 1,
          explanation: 'Selenium WebDriver is a browser automation library that allows you to control browsers programmatically. It is not a programming language, operating system, or testing framework.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which component of Selenium is recommended for professional automation testing?',
          options: [
            'Selenium IDE',
            'Selenium RC',
            'Selenium WebDriver',
            'Selenium Grid only'
          ],
          correctAnswer: 2,
          explanation: 'Selenium WebDriver is the recommended component for professional automation testing as it provides full programming capabilities, better maintenance, and CI/CD integration.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the purpose of WebDriverManager?',
          options: [
            'To create web pages',
            'To automatically download and setup browser drivers',
            'To manage test cases',
            'To generate test reports'
          ],
          correctAnswer: 1,
          explanation: 'WebDriverManager automatically downloads the correct browser driver version, matches it with the browser version, and sets up system properties.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which file is used to manage dependencies in a Maven project?',
          options: [
            'build.xml',
            'pom.xml',
            'config.xml',
            'dependencies.txt'
          ],
          correctAnswer: 1,
          explanation: 'pom.xml (Project Object Model) is the configuration file used by Maven to manage dependencies, build lifecycle, and project properties.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct groupId for Selenium Java dependency?',
          options: [
            'com.selenium.webdriver',
            'org.seleniumhq.selenium',
            'io.selenium.java',
            'selenium.org.java'
          ],
          correctAnswer: 1,
          explanation: 'The correct groupId for Selenium Java dependency is "org.seleniumhq.selenium" and artifactId is "selenium-java".',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the role of a browser driver (e.g., chromedriver.exe)?',
          options: [
            'To write test scripts',
            'To translate Selenium commands into browser-specific actions',
            'To create HTML reports',
            'To compile Java code'
          ],
          correctAnswer: 1,
          explanation: 'Browser drivers act as a translator between Selenium WebDriver and the browser, converting Selenium commands into browser-specific actions.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'WebDriver is a(n):',
          options: [
            'Class',
            'Interface',
            'Abstract class',
            'Enum'
          ],
          correctAnswer: 1,
          explanation: 'WebDriver is an interface in Java. It provides a contract that is implemented by browser-specific driver classes like ChromeDriver, FirefoxDriver, etc.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Which class implements the WebDriver interface for Chrome browser?',
          options: [
            'BrowserDriver',
            'ChromeDriver',
            'ChromeBrowser',
            'WebChromeDriver'
          ],
          correctAnswer: 1,
          explanation: 'ChromeDriver is the class that implements the WebDriver interface for controlling Chrome browser.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the advantage of using Selenium Grid?',
          options: [
            'Faster script writing',
            'Better locator strategies',
            'Parallel test execution across multiple browsers and machines',
            'Automatic test case generation'
          ],
          correctAnswer: 2,
          explanation: 'Selenium Grid enables parallel execution of tests on multiple machines and browsers simultaneously, significantly reducing test execution time.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which Selenium version introduced the W3C WebDriver protocol?',
          options: [
            'Selenium 2.0',
            'Selenium 3.0',
            'Selenium 4.0',
            'Selenium 1.0'
          ],
          correctAnswer: 2,
          explanation: 'Selenium 4.0 (released in 2021) introduced the W3C WebDriver protocol as the standard communication protocol between WebDriver and browsers.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What does the following Maven property specify?\n<maven.compiler.source>11</maven.compiler.source>',
          options: [
            'The Java version to compile source code',
            'The Maven version',
            'The Selenium version',
            'The browser version'
          ],
          correctAnswer: 0,
          explanation: 'This property specifies the Java version (11 in this case) to be used for compiling the source code.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'In Selenium architecture, which layer communicates directly with the browser?',
          options: [
            'Test Script',
            'WebDriver Interface',
            'Browser Driver',
            'HTTP Server'
          ],
          correctAnswer: 2,
          explanation: 'The Browser Driver (e.g., chromedriver.exe) is the layer that communicates directly with the browser using browser-specific protocols.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which of the following is NOT a component of the Selenium Suite?',
          options: [
            'Selenium IDE',
            'Selenium WebDriver',
            'Selenium Grid',
            'Selenium Compiler'
          ],
          correctAnswer: 3,
          explanation: 'Selenium Compiler is not a component of the Selenium Suite. The main components are Selenium IDE, WebDriver, and Grid.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the recommended approach for managing browser drivers in Selenium 4?',
          options: [
            'Manual download and system property setup',
            'Using WebDriverManager library',
            'Copying drivers to system PATH',
            'No driver management needed'
          ],
          correctAnswer: 1,
          explanation: 'Using WebDriverManager library is the recommended modern approach as it automatically handles driver downloads, version matching, and system property setup.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'Which programming languages are supported by Selenium WebDriver?',
          options: [
            'Only Java',
            'Java and Python only',
            'Java, Python, C#, Ruby, JavaScript, and more',
            'Only scripting languages'
          ],
          correctAnswer: 2,
          explanation: 'Selenium WebDriver supports multiple programming languages including Java, Python, C#, Ruby, JavaScript, and others, making it highly versatile.',
          points: 2,
          difficulty: 'easy'
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
          question: 'Selenium is an open-source automation tool.',
          correctAnswer: true,
          explanation: 'True. Selenium is completely open-source and free to use, which is one of its major advantages.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'You need to manually download chromedriver.exe when using WebDriverManager.',
          correctAnswer: false,
          explanation: 'False. WebDriverManager automatically downloads the appropriate driver version, so manual download is not required.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'Selenium IDE is recommended for professional automation testing projects.',
          correctAnswer: false,
          explanation: 'False. Selenium IDE is a record-and-playback tool best suited for quick demos and learning. Selenium WebDriver is recommended for professional projects.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'Maven automatically downloads all transitive dependencies specified in pom.xml.',
          correctAnswer: true,
          explanation: 'True. Maven automatically resolves and downloads all transitive dependencies (dependencies of dependencies) specified in pom.xml.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'WebDriver interface methods are the same across all browsers.',
          correctAnswer: true,
          explanation: 'True. The WebDriver interface provides a common set of methods that work consistently across all browser implementations (ChromeDriver, FirefoxDriver, etc.).',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Selenium can only test web applications, not mobile applications.',
          correctAnswer: false,
          explanation: 'False. While Selenium WebDriver is primarily for web applications, Appium (built on Selenium) extends support to mobile applications.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'The browser driver must match the exact version of the browser installed.',
          correctAnswer: true,
          explanation: 'True. The browser driver version must be compatible with the browser version. WebDriverManager handles this automatically.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Selenium RC (Remote Control) is still recommended for new projects.',
          correctAnswer: false,
          explanation: 'False. Selenium RC is deprecated. Selenium WebDriver is the recommended and supported version for all new projects.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can switch between different browser drivers by changing the driver implementation class.',
          correctAnswer: true,
          explanation: 'True. Since WebDriver is an interface, you can easily switch browsers by changing from ChromeDriver to FirefoxDriver or EdgeDriver.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'Selenium requires a commercial license for corporate use.',
          correctAnswer: false,
          explanation: 'False. Selenium is released under the Apache 2.0 license and is completely free for commercial use.',
          points: 2,
          difficulty: 'easy'
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
          mode: ['full'],
          question: 'The _____ method from WebDriverManager is used to setup ChromeDriver automatically.',
          correctAnswer: 'chromedriver().setup()',
          acceptedAnswers: ['chromedriver().setup()', 'chromedriver.setup', 'chromedriver'],
          explanation: 'WebDriverManager.chromedriver().setup() is the method that automatically downloads and configures ChromeDriver.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In Maven, the _____ file contains project configuration and dependencies.',
          correctAnswer: 'pom.xml',
          acceptedAnswers: ['pom.xml', 'pom'],
          explanation: 'pom.xml (Project Object Model) is the core configuration file in Maven projects.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ driver is needed to automate Firefox browser.',
          correctAnswer: 'geckodriver',
          acceptedAnswers: ['geckodriver', 'GeckoDriver'],
          explanation: 'GeckoDriver is the browser driver used to control Firefox browser in Selenium.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'WebDriver is a(n) _____ in Java, not a class.',
          correctAnswer: 'interface',
          acceptedAnswers: ['interface', 'Interface'],
          explanation: 'WebDriver is an interface that defines the contract for browser automation. It is implemented by classes like ChromeDriver, FirefoxDriver, etc.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'Selenium _____ is used for record and playback functionality.',
          correctAnswer: 'IDE',
          acceptedAnswers: ['IDE', 'ide'],
          explanation: 'Selenium IDE is a browser extension that provides record and playback functionality for creating quick automation scripts.',
          points: 2,
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
          question: 'What are the three main components of the Selenium Suite?',
          sampleAnswer: 'The three main components of the Selenium Suite are: 1) Selenium IDE - for record and playback, 2) Selenium WebDriver - for writing automation scripts in programming languages, and 3) Selenium Grid - for parallel test execution across multiple machines and browsers.',
          keywords: ['IDE', 'WebDriver', 'Grid', 'record', 'playback', 'automation', 'parallel'],
          minKeywords: 3,
          explanation: 'Selenium Suite consists of three components: IDE for recording tests, WebDriver for programmatic automation, and Grid for distributed test execution.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the role of WebDriverManager in Selenium automation.',
          sampleAnswer: 'WebDriverManager automatically downloads the correct browser driver version, matches it with the installed browser version, and sets up the system properties. This eliminates the need for manual driver management and ensures compatibility between browser and driver versions.',
          keywords: ['download', 'driver', 'automatic', 'version', 'setup', 'system property', 'compatibility'],
          minKeywords: 3,
          explanation: 'WebDriverManager automates the process of driver management by downloading, version matching, and configuring browser drivers.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What is the advantage of WebDriver being an interface rather than a class?',
          sampleAnswer: 'WebDriver being an interface provides polymorphism, allowing easy switching between different browser implementations (Chrome, Firefox, Edge) without changing the code. It also ensures a common contract across all browser drivers, making the code more maintainable and flexible.',
          keywords: ['interface', 'polymorphism', 'browser', 'switching', 'contract', 'flexibility', 'common'],
          minKeywords: 3,
          explanation: 'The interface design enables polymorphism and provides a consistent API across all browser implementations.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'List the four layers in Selenium WebDriver architecture in order.',
          sampleAnswer: 'The four layers in order are: 1) Test Script (your Java code), 2) Selenium WebDriver (language bindings), 3) Browser Driver (e.g., chromedriver.exe), and 4) Actual Browser (Chrome, Firefox, etc.).',
          keywords: ['Test Script', 'WebDriver', 'Browser Driver', 'Browser', 'chromedriver', 'layers'],
          minKeywords: 4,
          explanation: 'The architecture has four layers: Test Script → WebDriver → Browser Driver → Browser, each playing a specific role.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Why is Maven used in Selenium projects?',
          sampleAnswer: 'Maven is used for dependency management, automatically downloading Selenium libraries and their dependencies. It also provides build lifecycle management, project structure standardization, and easy integration with CI/CD tools. Maven makes projects portable and ensures consistent setup across different machines.',
          keywords: ['dependency', 'management', 'build', 'lifecycle', 'download', 'portable', 'libraries'],
          minKeywords: 3,
          explanation: 'Maven simplifies dependency management and provides standardized build processes for Selenium projects.',
          points: 3,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
