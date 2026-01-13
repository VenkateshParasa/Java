export default {
  title: "Day 1: Introduction to Selenium WebDriver - Assessment",
  description: "Test your understanding of Selenium basics, WebDriver setup, and fundamental concepts",
  passingScore: 70,
  timeLimit: 30, // minutes
  
  modes: {
    quick: {
      timeLimit: 15,
      questionCount: 10,
      description: "Quick assessment covering key concepts"
    },
    full: {
      timeLimit: 30,
      questionCount: 25,
      description: "Comprehensive assessment of all topics"
    }
  },

  sections: [
    {
      title: "Section A: Multiple Choice Questions",
      description: "Choose the best answer for each question",
      questions: [
        {
          id: "sel-day1-mcq-1",
          type: "multiple-choice",
          question: "What is Selenium WebDriver?",
          options: [
            "A programming language for web development",
            "A browser automation tool for testing web applications",
            "A database management system",
            "A web server software"
          ],
          correctAnswer: 1,
          explanation: "Selenium WebDriver is a browser automation tool used primarily for testing web applications. It allows you to write scripts that control web browsers programmatically.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-2",
          type: "multiple-choice",
          question: "Which of the following is NOT a component of the Selenium suite?",
          options: [
            "Selenium WebDriver",
            "Selenium IDE",
            "Selenium Grid",
            "Selenium Server"
          ],
          correctAnswer: 3,
          explanation: "The main components of Selenium are: WebDriver (for browser automation), IDE (record and playback tool), and Grid (for parallel testing). 'Selenium Server' is not a standard component name.",
          difficulty: "medium",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-3",
          type: "multiple-choice",
          question: "What is the purpose of WebDriverManager?",
          options: [
            "To create web pages",
            "To automatically download and set up browser drivers",
            "To manage database connections",
            "To compile Java code"
          ],
          correctAnswer: 1,
          explanation: "WebDriverManager automatically downloads and configures the appropriate browser driver (like chromedriver) for your system, eliminating the need for manual driver management.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-4",
          type: "multiple-choice",
          question: "Which method is used to navigate to a URL in Selenium?",
          options: [
            "driver.open(url)",
            "driver.navigate(url)",
            "driver.get(url)",
            "driver.goTo(url)"
          ],
          correctAnswer: 2,
          explanation: "The driver.get(url) method is used to navigate to a specific URL. It waits for the page to load before proceeding.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-5",
          type: "multiple-choice",
          question: "What is the difference between driver.close() and driver.quit()?",
          options: [
            "close() closes all windows, quit() closes current window",
            "close() closes current window, quit() closes all windows and ends session",
            "They are exactly the same",
            "close() is for Chrome, quit() is for Firefox"
          ],
          correctAnswer: 1,
          explanation: "driver.close() closes only the current browser window, while driver.quit() closes all browser windows opened by the WebDriver and ends the WebDriver session completely.",
          difficulty: "medium",
          points: 3,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-6",
          type: "multiple-choice",
          question: "Which programming languages can be used with Selenium WebDriver?",
          options: [
            "Only Java",
            "Only Python and Java",
            "Java, Python, C#, Ruby, JavaScript, and more",
            "Only C# and Java"
          ],
          correctAnswer: 2,
          explanation: "Selenium WebDriver supports multiple programming languages including Java, Python, C#, Ruby, JavaScript, and others, making it very flexible for different development teams.",
          difficulty: "easy",
          points: 2,
          mode: ["full"]
        },
        {
          id: "sel-day1-mcq-7",
          type: "multiple-choice",
          question: "What does the driver.getTitle() method return?",
          options: [
            "The URL of the current page",
            "The title of the current page",
            "The HTML source code",
            "The browser name"
          ],
          correctAnswer: 1,
          explanation: "The driver.getTitle() method returns the title of the current web page as a String. This is useful for verifying that you're on the correct page.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-8",
          type: "multiple-choice",
          question: "Which Maven dependency is required for Selenium WebDriver?",
          options: [
            "selenium-webdriver",
            "selenium-java",
            "webdriver-java",
            "selenium-api"
          ],
          correctAnswer: 1,
          explanation: "The correct Maven dependency is 'selenium-java' with groupId 'org.seleniumhq.selenium'. This includes all necessary Selenium WebDriver classes.",
          difficulty: "medium",
          points: 2,
          mode: ["full"]
        },
        {
          id: "sel-day1-mcq-9",
          type: "multiple-choice",
          question: "What type is WebDriver in Java?",
          options: [
            "A class",
            "An interface",
            "An enum",
            "An annotation"
          ],
          correctAnswer: 1,
          explanation: "WebDriver is an interface in Java. ChromeDriver, FirefoxDriver, etc., are implementations of this interface, allowing for polymorphism and easy browser switching.",
          difficulty: "medium",
          points: 3,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-10",
          type: "multiple-choice",
          question: "Which browsers are supported by Selenium WebDriver?",
          options: [
            "Only Chrome and Firefox",
            "Chrome, Firefox, Safari, Edge, and more",
            "Only Internet Explorer",
            "Only Chrome"
          ],
          correctAnswer: 1,
          explanation: "Selenium WebDriver supports all major browsers including Chrome, Firefox, Safari, Edge, and even Internet Explorer, making it ideal for cross-browser testing.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-11",
          type: "multiple-choice",
          question: "What is the recommended way to ensure browser cleanup in Selenium?",
          options: [
            "Call driver.quit() at the end of the script",
            "Use try-finally block with driver.quit() in finally",
            "Let the browser close automatically",
            "Use driver.close() multiple times"
          ],
          correctAnswer: 1,
          explanation: "Using a try-finally block with driver.quit() in the finally section ensures the browser is closed even if an exception occurs, preventing resource leaks.",
          difficulty: "medium",
          points: 3,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-mcq-12",
          type: "multiple-choice",
          question: "What does the following code do? WebDriverManager.chromedriver().setup();",
          options: [
            "Opens Chrome browser",
            "Downloads and configures ChromeDriver",
            "Closes Chrome browser",
            "Updates Chrome browser"
          ],
          correctAnswer: 1,
          explanation: "WebDriverManager.chromedriver().setup() automatically downloads the appropriate version of ChromeDriver for your system and sets up the system property to use it.",
          difficulty: "easy",
          points: 2,
          mode: ["full"]
        }
      ]
    },
    {
      title: "Section B: True/False Questions",
      description: "Determine if each statement is true or false",
      questions: [
        {
          id: "sel-day1-tf-1",
          type: "true-false",
          question: "Selenium WebDriver can only be used for testing web applications.",
          correctAnswer: false,
          explanation: "False. While Selenium is primarily used for testing, it can also be used for web scraping, automating repetitive tasks, and other browser automation needs.",
          difficulty: "medium",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-tf-2",
          type: "true-false",
          question: "Selenium is an open-source tool.",
          correctAnswer: true,
          explanation: "True. Selenium is completely open-source and free to use, which is one of its major advantages.",
          difficulty: "easy",
          points: 2,
          mode: ["full"]
        },
        {
          id: "sel-day1-tf-3",
          type: "true-false",
          question: "You must manually download browser drivers when using WebDriverManager.",
          correctAnswer: false,
          explanation: "False. WebDriverManager automatically downloads and manages browser drivers, eliminating the need for manual downloads.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-tf-4",
          type: "true-false",
          question: "driver.quit() should always be called in a finally block.",
          correctAnswer: true,
          explanation: "True. Placing driver.quit() in a finally block ensures the browser is closed even if an exception occurs, preventing resource leaks.",
          difficulty: "medium",
          points: 2,
          mode: ["full"]
        },
        {
          id: "sel-day1-tf-5",
          type: "true-false",
          question: "Selenium can test desktop applications.",
          correctAnswer: false,
          explanation: "False. Selenium is designed specifically for web browser automation and cannot test desktop applications. For desktop testing, tools like WinAppDriver or Sikuli are used.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-tf-6",
          type: "true-false",
          question: "WebDriver is a class in Selenium.",
          correctAnswer: false,
          explanation: "False. WebDriver is an interface, not a class. ChromeDriver, FirefoxDriver, etc., are classes that implement the WebDriver interface.",
          difficulty: "medium",
          points: 2,
          mode: ["full"]
        },
        {
          id: "sel-day1-tf-7",
          type: "true-false",
          question: "Selenium Grid is used for parallel test execution.",
          correctAnswer: true,
          explanation: "True. Selenium Grid allows you to run tests in parallel across multiple machines and browsers, significantly reducing test execution time.",
          difficulty: "easy",
          points: 2,
          mode: ["full"]
        }
      ]
    },
    {
      title: "Section C: Fill in the Blanks",
      description: "Complete the code or statements",
      questions: [
        {
          id: "sel-day1-fib-1",
          type: "fill-blank",
          question: "To create a ChromeDriver instance, you write: WebDriver driver = new ________();",
          correctAnswer: "ChromeDriver",
          explanation: "The correct answer is 'ChromeDriver'. This creates a new instance of ChromeDriver which implements the WebDriver interface.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-fib-2",
          type: "fill-blank",
          question: "The method to get the current page title is driver.________();",
          correctAnswer: "getTitle",
          explanation: "The correct method is getTitle(). It returns the title of the current page as a String.",
          difficulty: "easy",
          points: 2,
          mode: ["full"]
        },
        {
          id: "sel-day1-fib-3",
          type: "fill-blank",
          question: "To navigate to a URL, use driver.________(url);",
          correctAnswer: "get",
          explanation: "The correct method is get(url). This navigates to the specified URL and waits for the page to load.",
          difficulty: "easy",
          points: 2,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-fib-4",
          type: "fill-blank",
          question: "The Maven groupId for Selenium is org.seleniumhq.________",
          correctAnswer: "selenium",
          explanation: "The correct groupId is 'org.seleniumhq.selenium'. This is used in the Maven pom.xml file to include Selenium dependencies.",
          difficulty: "medium",
          points: 2,
          mode: ["full"]
        }
      ]
    },
    {
      title: "Section D: Short Answer Questions",
      description: "Provide brief answers (2-3 sentences)",
      questions: [
        {
          id: "sel-day1-sa-1",
          type: "short-answer",
          question: "Explain the purpose of the try-finally block when using Selenium WebDriver.",
          sampleAnswer: "The try-finally block ensures that the browser is properly closed even if an exception occurs during test execution. The finally block always executes, so placing driver.quit() there guarantees cleanup and prevents resource leaks.",
          keywords: ["cleanup", "exception", "quit", "finally", "resource"],
          explanation: "A try-finally block is crucial in Selenium to ensure proper resource management. Even if an error occurs in the try block, the finally block will execute, closing the browser and freeing system resources.",
          difficulty: "medium",
          points: 4,
          mode: ["full"]
        },
        {
          id: "sel-day1-sa-2",
          type: "short-answer",
          question: "What are the advantages of using WebDriverManager instead of manually managing browser drivers?",
          sampleAnswer: "WebDriverManager automatically downloads the correct version of browser drivers for your system, eliminating manual downloads and version management. It also handles different operating systems automatically and keeps drivers up to date.",
          keywords: ["automatic", "download", "version", "management", "driver"],
          explanation: "WebDriverManager simplifies driver management by automatically handling downloads, version compatibility, and OS-specific configurations, saving time and reducing setup errors.",
          difficulty: "medium",
          points: 4,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-sa-3",
          type: "short-answer",
          question: "List three scenarios where Selenium WebDriver would be a good choice for automation.",
          sampleAnswer: "1) Regression testing of web applications to ensure new changes don't break existing functionality. 2) Cross-browser testing to verify application works on Chrome, Firefox, Safari, etc. 3) Automating repetitive tasks like form filling or data entry on web applications.",
          keywords: ["testing", "regression", "cross-browser", "automation", "web"],
          explanation: "Selenium excels at web application testing, especially for regression testing, cross-browser compatibility testing, and automating repetitive web-based tasks.",
          difficulty: "easy",
          points: 3,
          mode: ["quick", "full"]
        },
        {
          id: "sel-day1-sa-4",
          type: "short-answer",
          question: "Explain the difference between Selenium IDE and Selenium WebDriver.",
          sampleAnswer: "Selenium IDE is a browser extension for record and playback testing, suitable for quick prototyping but limited in functionality. Selenium WebDriver is a programming interface that allows writing complex test scripts in various languages, offering more control, flexibility, and integration capabilities.",
          keywords: ["IDE", "record", "playback", "WebDriver", "programming", "flexibility"],
          explanation: "IDE is simpler but limited to basic recording, while WebDriver provides full programmatic control and is better suited for complex, maintainable test automation frameworks.",
          difficulty: "medium",
          points: 4,
          mode: ["full"]
        }
      ]
    }
  ],

  // Metadata
  week: 1,
  day: 1,
  topic: "Introduction to Selenium WebDriver",
  prerequisites: ["Basic Java knowledge", "Understanding of web browsers"],
  learningOutcomes: [
    "Understand what Selenium is and its components",
    "Set up Selenium WebDriver with Maven",
    "Write basic Selenium scripts",
    "Use fundamental WebDriver methods",
    "Implement proper browser cleanup"
  ]
};