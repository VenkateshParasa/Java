export default {
  title: "Day 41: Utility Classes - Assessment",
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
          question: 'What is the primary purpose of creating utility classes in Selenium automation frameworks?',
          options: [
            'To encapsulate reusable methods and reduce code duplication',
            'To replace TestNG annotations',
            'To store test data',
            'To create test reports'
          ],
          correctAnswer: 0,
          explanation: 'Utility classes are designed to encapsulate reusable methods and functionality that can be shared across multiple test classes, reducing code duplication and improving maintainability.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which design pattern is commonly used for utility classes to ensure only one instance exists throughout the application?',
          options: [
            'Factory Pattern',
            'Singleton Pattern',
            'Observer Pattern',
            'Strategy Pattern'
          ],
          correctAnswer: 1,
          explanation: 'The Singleton Pattern is commonly used for utility classes to ensure only one instance exists throughout the application lifecycle, providing a global point of access to shared resources.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a ScreenshotUtil class, which method is used to capture a screenshot in Selenium WebDriver?',
          options: [
            'driver.captureScreen()',
            'driver.getScreenshot()',
            'driver.getScreenshotAs(OutputType.FILE)',
            'driver.takeSnapshot()'
          ],
          correctAnswer: 2,
          explanation: 'The getScreenshotAs(OutputType.FILE) method from the TakesScreenshot interface is used to capture screenshots in Selenium WebDriver. The driver needs to be cast to TakesScreenshot interface first.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the advantage of using static methods in utility classes?',
          options: [
            'They require object instantiation',
            'They can access instance variables',
            'They can be called directly using the class name without creating an instance',
            'They are faster than instance methods'
          ],
          correctAnswer: 2,
          explanation: 'Static methods can be called directly using the class name without creating an instance of the class. This makes them convenient for utility functions that do not require maintaining state.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a custom WaitUtil class, which Selenium class should be used to implement explicit waits?',
          options: [
            'ImplicitWait',
            'ThreadSleep',
            'WebDriverWait',
            'FluentTimeout'
          ],
          correctAnswer: 2,
          explanation: 'WebDriverWait is used to implement explicit waits in Selenium. It allows you to wait for specific conditions to be met before proceeding with test execution.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which Apache POI class is used in ExcelUtil to read .xlsx files?',
          options: [
            'HSSFWorkbook',
            'XSSFWorkbook',
            'CSVWorkbook',
            'ExcelWorkbook'
          ],
          correctAnswer: 1,
          explanation: 'XSSFWorkbook is used to handle .xlsx files (Excel 2007 and later). HSSFWorkbook is used for older .xls format files.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What should be included in a proper utility class constructor?',
          options: [
            'Public constructor with parameters',
            'Private constructor to prevent instantiation',
            'Protected constructor for inheritance',
            'No constructor needed'
          ],
          correctAnswer: 1,
          explanation: 'A private constructor prevents instantiation of utility classes, as they typically contain only static methods. This enforces the utility class pattern and prevents unnecessary object creation.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a DateTimeUtil class, which Java class is best suited for modern date and time operations?',
          options: [
            'java.util.Date',
            'java.util.Calendar',
            'java.time.LocalDateTime',
            'java.sql.Timestamp'
          ],
          correctAnswer: 2,
          explanation: 'java.time.LocalDateTime (part of the Java 8 Date and Time API) is the modern, thread-safe, and immutable class for handling date and time operations. It provides better functionality than the older Date and Calendar classes.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of an AlertUtil class in Selenium automation?',
          options: [
            'To send email alerts',
            'To handle JavaScript alerts, confirms, and prompts',
            'To log error messages',
            'To display notifications in reports'
          ],
          correctAnswer: 1,
          explanation: 'AlertUtil class is designed to handle JavaScript alerts, confirm boxes, and prompt dialogs that appear during test execution. It encapsulates common alert handling operations.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which method in FileUtil would be used to check if a file exists before performing operations?',
          options: [
            'File.exists()',
            'File.isAvailable()',
            'File.checkFile()',
            'File.validate()'
          ],
          correctAnswer: 0,
          explanation: 'The exists() method from the java.io.File class returns true if the file or directory exists, false otherwise. This is essential for validating file operations.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'In a WindowUtil class, which method is used to switch to a new browser window?',
          options: [
            'driver.changeWindow()',
            'driver.switchTo().window(windowHandle)',
            'driver.selectWindow()',
            'driver.moveToWindow()'
          ],
          correctAnswer: 1,
          explanation: 'driver.switchTo().window(windowHandle) is used to switch to a different browser window or tab using its unique window handle.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the recommended approach for handling exceptions in utility classes?',
          options: [
            'Catch all exceptions and ignore them',
            'Throw generic Exception for all methods',
            'Use specific exception handling with proper logging',
            'Never use try-catch blocks'
          ],
          correctAnswer: 2,
          explanation: 'Utility classes should use specific exception handling with proper logging to help diagnose issues. This provides meaningful error messages while maintaining code robustness.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'In a BrowserUtil class, what method would launch a browser with specific ChromeOptions?',
          options: [
            'WebDriver driver = new ChromeDriver();',
            'WebDriver driver = new ChromeDriver(chromeOptions);',
            'WebDriver driver = ChromeDriver.launch(options);',
            'WebDriver driver = Browser.start(chromeOptions);'
          ],
          correctAnswer: 1,
          explanation: 'ChromeDriver constructor accepts ChromeOptions as a parameter: new ChromeDriver(chromeOptions). This allows you to configure browser-specific settings.',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which StringUtil method would be most useful for removing leading and trailing whitespace from test data?',
          options: [
            'remove()',
            'trim()',
            'strip()',
            'clean()'
          ],
          correctAnswer: 1,
          explanation: 'The trim() method removes leading and trailing whitespace from a string. It is commonly used in utility classes to clean test data before validation.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the best practice for organizing utility classes in a test automation framework?',
          options: [
            'Keep all utilities in one large class',
            'Create separate utility classes based on functionality (ScreenshotUtil, WaitUtil, etc.)',
            'Put utilities directly in test classes',
            'Store utilities as text files'
          ],
          correctAnswer: 1,
          explanation: 'Creating separate utility classes based on functionality follows the Single Responsibility Principle and makes the framework more maintainable and easier to understand.',
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
          question: 'Utility classes should always have public constructors to allow instantiation in test classes.',
          correctAnswer: false,
          explanation: 'False. Utility classes should have private constructors to prevent instantiation, as they typically contain only static methods and should not be instantiated.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'The Singleton pattern ensures that a utility class has only one instance throughout the application lifecycle.',
          correctAnswer: true,
          explanation: 'True. The Singleton pattern restricts the instantiation of a class to a single instance and provides a global point of access to it, which is useful for utility classes that manage shared resources.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'Screenshots captured using ScreenshotUtil should always be saved with a timestamp to avoid overwriting.',
          correctAnswer: true,
          explanation: 'True. Using timestamps in screenshot filenames ensures uniqueness and prevents overwriting previous screenshots, which is crucial for debugging failed tests.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'WebDriverWait in WaitUtil can only wait for elements to be visible.',
          correctAnswer: false,
          explanation: 'False. WebDriverWait supports multiple expected conditions including visibility, clickability, presence, staleness, and custom conditions. It is a flexible waiting mechanism.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'ExcelUtil can be used to both read from and write to Excel files in a Selenium framework.',
          correctAnswer: true,
          explanation: 'True. ExcelUtil typically provides methods for both reading test data from Excel files and writing results back to Excel, making it a bidirectional data handler.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Static methods in utility classes can access instance variables of the class.',
          correctAnswer: false,
          explanation: 'False. Static methods belong to the class itself, not to any instance, and therefore cannot directly access instance variables. They can only access static variables.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'A FileUtil class should include methods for creating, reading, and deleting files.',
          correctAnswer: true,
          explanation: 'True. A comprehensive FileUtil class should provide methods for common file operations including creation, reading, writing, deletion, and validation of files.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'AlertUtil must handle all three types of JavaScript popups: alert, confirm, and prompt.',
          correctAnswer: true,
          explanation: 'True. A complete AlertUtil class should provide methods to handle all three types of JavaScript dialog boxes that can appear during web automation.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'WindowUtil should include methods to switch between tabs and close specific browser windows.',
          correctAnswer: true,
          explanation: 'True. WindowUtil should encapsulate all window/tab handling operations including switching between windows, getting window handles, and closing specific windows.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'BrowserUtil class should support launching only Chrome browser for consistency.',
          correctAnswer: false,
          explanation: 'False. A good BrowserUtil class should support multiple browsers (Chrome, Firefox, Edge, Safari) to enable cross-browser testing, which is a key aspect of comprehensive test automation.',
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
          question: 'To capture a screenshot in Selenium, the WebDriver instance must be cast to the __________ interface.',
          correctAnswer: 'TakesScreenshot',
          explanation: 'The TakesScreenshot interface provides the getScreenshotAs() method used to capture screenshots. The WebDriver instance must be cast to this interface: ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE)',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ class from Apache POI is used to work with Excel 2007 (.xlsx) files.',
          correctAnswer: 'XSSFWorkbook',
          explanation: 'XSSFWorkbook is the Apache POI class for handling .xlsx files. It provides methods to read and write data to Excel workbooks in the newer format.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'In utility classes, the __________ keyword is used for methods that can be called without creating an instance of the class.',
          correctAnswer: 'static',
          explanation: 'The static keyword makes methods belong to the class itself rather than to instances. Static methods can be called using ClassName.methodName() without object instantiation.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ method from the Alert interface is used to accept a JavaScript alert or confirm dialog.',
          correctAnswer: 'accept',
          explanation: 'The accept() method clicks the OK button on JavaScript alerts and confirm dialogs. It is accessed through driver.switchTo().alert().accept()',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The Java class __________ from java.time package is recommended for formatting dates and times in DateTimeUtil.',
          correctAnswer: 'DateTimeFormatter',
          explanation: 'DateTimeFormatter provides a comprehensive way to format and parse date-time objects in Java 8+. It is thread-safe and works with LocalDateTime, LocalDate, and other temporal classes.',
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
          question: 'Explain how to implement a ScreenshotUtil class with a method that captures a screenshot on test failure and saves it with a timestamp. Include the key components and exception handling.',
          keywords: ['TakesScreenshot', 'getScreenshotAs', 'timestamp', 'FileUtils', 'try-catch', 'exception handling', 'file path', 'OutputType'],
          minKeywords: 4,
          sampleAnswer: 'A ScreenshotUtil class should implement a static method that accepts WebDriver and test name as parameters. The method should cast the driver to TakesScreenshot interface and use getScreenshotAs(OutputType.FILE) to capture the screenshot. It should generate a unique filename using the current timestamp (e.g., SimpleDateFormat or DateTimeFormatter) and test name. The screenshot file should be copied to a designated folder using FileUtils.copyFile() from Apache Commons IO. Proper exception handling with try-catch blocks should be implemented to catch IOException and WebDriverException, with appropriate logging for debugging. The method should return the file path for reporting purposes.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Design a WaitUtil class that includes custom wait methods for common scenarios. Describe at least three different wait methods and their implementation using WebDriverWait and ExpectedConditions.',
          keywords: ['WebDriverWait', 'ExpectedConditions', 'elementToBeClickable', 'visibilityOfElementLocated', 'presenceOfElementLocated', 'Duration', 'timeout', 'custom wait'],
          minKeywords: 4,
          sampleAnswer: 'A WaitUtil class should include methods like waitForElementToBeClickable() which uses WebDriverWait with ExpectedConditions.elementToBeClickable() to wait until an element is both visible and enabled. The waitForElementVisible() method should use ExpectedConditions.visibilityOfElementLocated() to wait for element visibility. The waitForElementPresent() method uses ExpectedConditions.presenceOfElementLocated() to wait for an element in the DOM. Each method should accept WebDriver, By locator, and timeout duration as parameters. The class should use Duration.ofSeconds() for timeout configuration. A custom wait method can be implemented using FluentWait with polling intervals and ignored exceptions. All methods should include proper exception handling and return the WebElement when the condition is met.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe how to create an ExcelUtil class that reads test data from an Excel file. Include methods for getting cell data, row count, and handling different data types (String, Numeric, Boolean).',
          keywords: ['Apache POI', 'XSSFWorkbook', 'FileInputStream', 'getSheet', 'getRow', 'getCell', 'CellType', 'getStringCellValue', 'getNumericCellValue', 'DataFormatter'],
          minKeywords: 4,
          sampleAnswer: 'An ExcelUtil class should use Apache POI library to handle Excel operations. It should have a method to open the Excel file using FileInputStream and create an XSSFWorkbook object. The getCellData() method should accept sheet name, row number, and column number as parameters, retrieve the cell using getSheet(), getRow(), and getCell() methods. It should check the cell type using getCellType() and handle different types accordingly: use getStringCellValue() for strings, getNumericCellValue() for numbers, and getBooleanCellValue() for booleans. A DataFormatter can be used to convert all cell types to strings uniformly. The getRowCount() method should return sheet.getLastRowNum() + 1. Proper exception handling should be implemented for IOException and NullPointerException. The class should also include a method to close the workbook to free resources.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the Singleton pattern implementation for a BrowserUtil class that manages WebDriver instances. Include thread safety considerations for parallel test execution.',
          keywords: ['Singleton', 'private constructor', 'static instance', 'getInstance', 'ThreadLocal', 'thread-safe', 'synchronized', 'parallel execution', 'WebDriver'],
          minKeywords: 4,
          sampleAnswer: 'A Singleton BrowserUtil class should have a private constructor to prevent direct instantiation. For thread-safe parallel execution, use ThreadLocal<WebDriver> to maintain separate WebDriver instances for each thread. The class should have a private static ThreadLocal<WebDriver> variable. The getInstance() method should check if the current thread has a WebDriver instance; if not, create one and store it in ThreadLocal. A static method like initializeDriver() should accept browser type and capabilities, create the appropriate WebDriver instance (ChromeDriver, FirefoxDriver, etc.), and set it to ThreadLocal. The quitDriver() method should close the browser and remove the ThreadLocal instance using remove() to prevent memory leaks. For simple non-parallel scenarios, use double-checked locking with synchronized block to ensure thread safety. The pattern ensures that each test thread has its own WebDriver instance while maintaining the Singleton structure.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Create a comprehensive WindowUtil class design that handles multiple browser windows and tabs. Include methods for switching, getting window handles, closing windows, and handling window-related waits.',
          keywords: ['getWindowHandles', 'switchTo', 'window handle', 'Set', 'Iterator', 'getWindowHandle', 'close', 'quit', 'switching windows', 'parent window', 'child window'],
          minKeywords: 4,
          sampleAnswer: 'A WindowUtil class should include several key methods for window management. The switchToWindow() method should accept a window title or index and use driver.getWindowHandles() to retrieve all window handles as a Set, iterate through them, switch to each using driver.switchTo().window(handle), and compare the title to find the target window. The switchToNewWindow() method should store the original window handles, perform an action that opens a new window, get the updated handles, and switch to the new handle. The getParentWindow() method should store and return the main window handle. The closeCurrentWindow() method should use driver.close() to close the current window and switch back to the parent. The closeAllExceptMain() method should iterate through all handles and close windows except the parent. A waitForWindowToOpen() method should use WebDriverWait to wait until the number of windows increases. The class should handle NoSuchWindowException appropriately and include methods to get window count and verify window presence.',
          points: 8
        }
      ]
    }
  ]
};
