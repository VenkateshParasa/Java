export default {
  title: "Day 29: Screenshots & Browser Options - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key screenshot and browser configuration concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all screenshot methods, browser options, and configuration techniques"
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
          question: 'Which interface must the WebDriver implement to take screenshots in Selenium?',
          options: [
            'ScreenshotCapture',
            'TakesScreenshot',
            'ImageCapture',
            'ScreenCapture'
          ],
          correctAnswer: 1,
          explanation: 'The TakesScreenshot interface from org.openqa.selenium package must be implemented by the WebDriver to enable screenshot functionality.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method is used to capture a screenshot in Selenium?',
          options: [
            'captureScreen()',
            'getScreenshot()',
            'getScreenshotAs()',
            'takeScreenshot()'
          ],
          correctAnswer: 2,
          explanation: 'The getScreenshotAs() method from TakesScreenshot interface is used to capture screenshots. It takes OutputType as parameter.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the correct import statement for TakesScreenshot?',
          options: [
            'import org.openqa.selenium.TakesScreenshot;',
            'import selenium.screenshot.TakesScreenshot;',
            'import org.openqa.selenium.support.TakesScreenshot;',
            'import selenium.TakesScreenshot;'
          ],
          correctAnswer: 0,
          explanation: 'The correct import is: import org.openqa.selenium.TakesScreenshot; as it is in the main selenium package.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'Which OutputType is most commonly used to save screenshots as files?',
          options: [
            'OutputType.BYTES',
            'OutputType.BASE64',
            'OutputType.FILE',
            'OutputType.IMAGE'
          ],
          correctAnswer: 2,
          explanation: 'OutputType.FILE returns a File object representing the screenshot, making it easy to save directly to disk using FileUtils.copyFile().',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'Which class is used to copy the screenshot file to a specific location?',
          options: [
            'FileUtils',
            'FileCopy',
            'FileHandler',
            'FileManager'
          ],
          correctAnswer: 0,
          explanation: 'FileUtils.copyFile() from Apache Commons IO is used to copy the screenshot file from temp location to desired destination.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct syntax to cast WebDriver to TakesScreenshot?',
          options: [
            'TakesScreenshot ts = driver.takeScreenshot();',
            'TakesScreenshot ts = (TakesScreenshot) driver;',
            'TakesScreenshot ts = new TakesScreenshot(driver);',
            'TakesScreenshot ts = driver.getScreenshot();'
          ],
          correctAnswer: 1,
          explanation: 'Use type casting: TakesScreenshot ts = (TakesScreenshot) driver; to cast the WebDriver instance to TakesScreenshot interface.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['full'],
          question: 'Which class is used to configure Chrome-specific browser options?',
          options: [
            'ChromeSettings',
            'ChromeOptions',
            'ChromeConfiguration',
            'ChromePreferences'
          ],
          correctAnswer: 1,
          explanation: 'ChromeOptions class from org.openqa.selenium.chrome package is used to configure Chrome browser settings and capabilities.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method adds command-line arguments to Chrome browser?',
          options: [
            'addArgument()',
            'addArguments()',
            'setArgument()',
            'withArgument()'
          ],
          correctAnswer: 1,
          explanation: 'addArguments() method is used to add command-line arguments to Chrome browser, such as --headless, --start-maximized, etc.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'Which argument runs Chrome browser in headless mode?',
          options: [
            '--invisible',
            '--headless',
            '--no-gui',
            '--background'
          ],
          correctAnswer: 1,
          explanation: 'The --headless argument runs Chrome browser in headless mode (without GUI), useful for CI/CD pipelines and background execution.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which class is used to configure Firefox-specific browser options?',
          options: [
            'FirefoxSettings',
            'FirefoxOptions',
            'FirefoxProfile',
            'FirefoxConfiguration'
          ],
          correctAnswer: 1,
          explanation: 'FirefoxOptions class from org.openqa.selenium.firefox package is used to configure Firefox browser settings and capabilities.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'How do you set download directory in Chrome using ChromeOptions?',
          options: [
            'options.setDownloadPath("path")',
            'options.setExperimentalOption("prefs", prefsMap)',
            'options.setPreference("download.dir", "path")',
            'options.addArgument("--download-directory=path")'
          ],
          correctAnswer: 1,
          explanation: 'Use setExperimentalOption("prefs", prefsMap) with download.default_directory preference to set download location in Chrome.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method disables browser notifications in ChromeOptions?',
          options: [
            'Using setExperimentalOption with profile.default_content_setting_values',
            'options.disableNotifications()',
            'options.addArgument("--disable-notifications")',
            'Both A and C'
          ],
          correctAnswer: 3,
          explanation: 'Both methods work: addArgument("--disable-notifications") or setExperimentalOption with profile.default_content_setting_values.notifications=2.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'Which argument starts Chrome browser in maximized mode?',
          options: [
            '--maximize',
            '--start-maximized',
            '--fullscreen',
            '--max-window'
          ],
          correctAnswer: 1,
          explanation: 'The --start-maximized argument launches Chrome browser in maximized window mode automatically.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which method sets binary path for Chrome browser?',
          options: [
            'options.setBinary("path")',
            'options.setBinaryPath("path")',
            'options.setChromeBinary("path")',
            'options.setBrowserBinary("path")'
          ],
          correctAnswer: 0,
          explanation: 'options.setBinary("path") method sets the path to the Chrome binary executable for custom Chrome installations.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the advantage of using headless browser mode?',
          options: [
            'Better performance and faster execution',
            'Useful for CI/CD pipelines without GUI',
            'Reduces resource consumption',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'Headless mode provides faster execution, works in CI/CD environments without GUI, and consumes fewer system resources.',
          points: 3,
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
          question: 'TakesScreenshot is a class in Selenium.',
          correctAnswer: false,
          explanation: 'False. TakesScreenshot is an interface, not a class. WebDriver implementations like ChromeDriver and FirefoxDriver implement this interface.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'Screenshots can only be taken for the entire page, not individual elements.',
          correctAnswer: false,
          explanation: 'False. Screenshots can be taken for specific WebElements using element.getScreenshotAs() method, capturing only that element.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'OutputType.FILE returns a File object representing the screenshot.',
          correctAnswer: true,
          explanation: 'True. OutputType.FILE returns a File object that can be copied to a desired location using FileUtils.copyFile().',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'FileUtils is part of the core Selenium library.',
          correctAnswer: false,
          explanation: 'False. FileUtils is from Apache Commons IO library, which must be added as a separate dependency.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'ChromeOptions and FirefoxOptions can be used interchangeably.',
          correctAnswer: false,
          explanation: 'False. ChromeOptions is specific to Chrome/Chromium browsers, while FirefoxOptions is specific to Firefox. They have different methods and capabilities.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Headless mode can only be enabled using browser arguments.',
          correctAnswer: false,
          explanation: 'False. Headless mode can be enabled using addArguments("--headless") or using setHeadless(true) method in both ChromeOptions and FirefoxOptions.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'Browser options must be set before creating the WebDriver instance.',
          correctAnswer: true,
          explanation: 'True. ChromeOptions/FirefoxOptions must be configured and passed to the WebDriver constructor. Options cannot be changed after driver initialization.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'You can disable images loading in Chrome to improve test execution speed.',
          correctAnswer: true,
          explanation: 'True. Using setExperimentalOption with profile.managed_default_content_settings.images=2 disables image loading, improving performance.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Screenshots are automatically saved to a default location.',
          correctAnswer: false,
          explanation: 'False. getScreenshotAs(OutputType.FILE) saves to a temporary location. You must explicitly copy it to your desired location using FileUtils.copyFile().',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Browser extensions can be added to Chrome using ChromeOptions.',
          correctAnswer: true,
          explanation: 'True. Use options.addExtensions(new File("extension.crx")) to add browser extensions to Chrome during initialization.',
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
          question: 'The _____ interface must be implemented to take screenshots in Selenium.',
          correctAnswer: 'TakesScreenshot',
          acceptedAnswers: ['TakesScreenshot', 'takesScreenshot'],
          explanation: 'The TakesScreenshot interface from org.openqa.selenium package enables screenshot functionality.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The method _____ is used to capture a screenshot with a specified output type.',
          correctAnswer: 'getScreenshotAs',
          acceptedAnswers: ['getScreenshotAs', 'getScreenshotAs()', 'getScreenshotAs()'],
          explanation: 'getScreenshotAs(OutputType) method captures screenshots in different formats like FILE, BYTES, or BASE64.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To save a screenshot to disk, use OutputType._____ as the parameter.',
          correctAnswer: 'FILE',
          acceptedAnswers: ['FILE', 'file'],
          explanation: 'OutputType.FILE returns a File object that can be saved to disk using FileUtils.copyFile().',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The _____ class is used to configure Chrome browser options.',
          correctAnswer: 'ChromeOptions',
          acceptedAnswers: ['ChromeOptions', 'chromeOptions'],
          explanation: 'ChromeOptions class configures Chrome-specific settings like arguments, preferences, and capabilities.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To run Chrome in headless mode, add the argument "_____".',
          correctAnswer: '--headless',
          acceptedAnswers: ['--headless', '"--headless"', "'--headless'"],
          explanation: 'The --headless argument runs Chrome browser without GUI, useful for CI/CD pipelines.',
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
          question: 'Write the complete code to take a screenshot and save it as "test.png" in the current directory.',
          sampleAnswer: 'TakesScreenshot ts = (TakesScreenshot) driver; File source = ts.getScreenshotAs(OutputType.FILE); File destination = new File("test.png"); FileUtils.copyFile(source, destination); OR in compact form: File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE); FileUtils.copyFile(screenshot, new File("test.png"));',
          keywords: ['TakesScreenshot', 'getScreenshotAs', 'OutputType.FILE', 'FileUtils.copyFile', 'File', 'driver', 'new'],
          minKeywords: 5,
          explanation: 'Cast driver to TakesScreenshot, call getScreenshotAs(OutputType.FILE), then use FileUtils.copyFile() to save to desired location.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the three OutputType options available for screenshots and when to use each.',
          sampleAnswer: 'The three OutputType options are: 1) OutputType.FILE - Returns File object, best for saving screenshots directly to disk. Most commonly used. 2) OutputType.BYTES - Returns byte array, useful for storing screenshots in databases or sending over network. 3) OutputType.BASE64 - Returns Base64 encoded string, useful for embedding images in HTML reports or sending via APIs.',
          keywords: ['OutputType.FILE', 'OutputType.BYTES', 'OutputType.BASE64', 'File', 'byte', 'Base64', 'disk', 'database', 'string'],
          minKeywords: 6,
          explanation: 'FILE for disk storage, BYTES for database/network, BASE64 for HTML reports or APIs.',
          points: 5,
          difficulty: 'hard'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write the code to configure Chrome to run in headless mode and start maximized.',
          sampleAnswer: 'ChromeOptions options = new ChromeOptions(); options.addArguments("--headless"); options.addArguments("--start-maximized"); WebDriver driver = new ChromeDriver(options); OR using method: ChromeOptions options = new ChromeOptions(); options.setHeadless(true); options.addArguments("--start-maximized"); WebDriver driver = new ChromeDriver(options);',
          keywords: ['ChromeOptions', 'addArguments', '--headless', '--start-maximized', 'new', 'ChromeDriver', 'options', 'setHeadless'],
          minKeywords: 5,
          explanation: 'Create ChromeOptions, add --headless and --start-maximized arguments (or use setHeadless(true)), pass to ChromeDriver constructor.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'How do you set a custom download directory for Chrome browser? Provide code example.',
          sampleAnswer: 'ChromeOptions options = new ChromeOptions(); Map<String, Object> prefs = new HashMap<>(); prefs.put("download.default_directory", "/path/to/download"); options.setExperimentalOption("prefs", prefs); WebDriver driver = new ChromeDriver(options); The download.default_directory preference sets the download location.',
          keywords: ['ChromeOptions', 'Map', 'HashMap', 'prefs', 'download.default_directory', 'setExperimentalOption', 'prefs.put', 'path'],
          minKeywords: 5,
          explanation: 'Create HashMap with download.default_directory preference, use setExperimentalOption("prefs", prefsMap) to apply.',
          points: 5,
          difficulty: 'hard'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'What are the benefits of running tests in headless browser mode?',
          sampleAnswer: 'Benefits of headless mode: 1) Faster execution - No GUI rendering reduces overhead and improves speed. 2) CI/CD compatibility - Works in environments without display servers (Jenkins, Docker containers). 3) Resource efficiency - Uses less memory and CPU without GUI. 4) Parallel execution - Can run multiple tests simultaneously more easily. 5) Background testing - Tests can run without interrupting other work.',
          keywords: ['faster', 'CI/CD', 'performance', 'GUI', 'memory', 'parallel', 'background', 'Jenkins', 'Docker', 'resource'],
          minKeywords: 4,
          explanation: 'Headless mode offers faster execution, works in CI/CD pipelines, reduces resource usage, and enables background testing.',
          points: 4,
          difficulty: 'medium'
        }
      ]
    }
  ]
};
