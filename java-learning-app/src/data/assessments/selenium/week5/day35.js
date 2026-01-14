export default {
  title: "Day 35: Page Object Model Part 1 - Assessment",
  passingScore: 70,
  timeLimit: 30,
  modes: {
    quick: {
      title: "Quick Assessment (10 questions)",
      timeLimit: 15,
      description: "A quick 15-minute assessment covering key Page Object Model concepts"
    },
    full: {
      title: "Full Assessment (35 questions)",
      timeLimit: 45,
      description: "Comprehensive 45-minute assessment covering all Page Object Model Part 1 topics"
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
          question: 'What is the primary purpose of the Page Object Model (POM) design pattern?',
          options: [
            'To increase test execution speed',
            'To separate test logic from page-specific code',
            'To reduce memory usage',
            'To handle dynamic elements'
          ],
          correctAnswer: 1,
          explanation: 'POM separates test logic from page-specific code, improving code maintainability, reusability, and reducing code duplication.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which annotation is used to locate web elements in Page Object Model?',
          options: [
            '@WebElement',
            '@Locate',
            '@FindBy',
            '@Element'
          ],
          correctAnswer: 2,
          explanation: '@FindBy annotation from Selenium is used to locate web elements in POM. It works with PageFactory to initialize elements.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which class provides the initElements() method to initialize page objects?',
          options: [
            'WebDriver',
            'PageFactory',
            'PageObject',
            'ElementFactory'
          ],
          correctAnswer: 1,
          explanation: 'PageFactory class provides the initElements() method to initialize all @FindBy annotated elements in a page object.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct import statement for the @FindBy annotation?',
          options: [
            'import org.openqa.selenium.FindBy;',
            'import org.openqa.selenium.support.FindBy;',
            'import org.openqa.selenium.support.ui.FindBy;',
            'import org.openqa.selenium.support.annotations.FindBy;'
          ],
          correctAnswer: 1,
          explanation: 'The correct import is: import org.openqa.selenium.support.FindBy; to use the @FindBy annotation.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the correct import statement for PageFactory?',
          options: [
            'import org.openqa.selenium.PageFactory;',
            'import org.openqa.selenium.support.PageFactory;',
            'import org.openqa.selenium.support.ui.PageFactory;',
            'import org.openqa.selenium.factory.PageFactory;'
          ],
          correctAnswer: 1,
          explanation: 'The correct import is: import org.openqa.selenium.support.PageFactory; to use PageFactory.initElements().',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['full'],
          question: 'What does PageFactory.initElements(driver, this) do?',
          options: [
            'Creates a new WebDriver instance',
            'Initializes all @FindBy annotated elements in the page class',
            'Opens the browser',
            'Closes all elements'
          ],
          correctAnswer: 1,
          explanation: 'PageFactory.initElements(driver, this) initializes all @FindBy annotated WebElement fields in the current page object class.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['full'],
          question: 'Which of the following is a valid @FindBy usage?',
          options: [
            '@FindBy(id="username")',
            '@FindBy(id: "username")',
            '@FindBy(id = "username")',
            '@FindBy(locator="id", value="username")'
          ],
          correctAnswer: 2,
          explanation: 'The correct syntax is @FindBy(id = "username") with equals sign and proper Java annotation format.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['full'],
          question: 'In POM, what should a page class typically contain?',
          options: [
            'Only WebElements',
            'Only test methods',
            'WebElements and methods to interact with them',
            'Database connections'
          ],
          correctAnswer: 2,
          explanation: 'A page class should contain WebElements (@FindBy annotated) and methods to interact with those elements, encapsulating page-specific logic.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the best practice for naming page class methods?',
          options: [
            'Use technical names like clickElement1()',
            'Use business-oriented names like login(), addToCart()',
            'Use random names',
            'Use only single letters'
          ],
          correctAnswer: 1,
          explanation: 'Page class methods should use business-oriented, meaningful names that describe the action from a user perspective, improving readability.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['full'],
          question: 'Which approach does POM follow for code organization?',
          options: [
            'All code in one file',
            'Separate page classes for each web page',
            'Random organization',
            'Only test classes'
          ],
          correctAnswer: 1,
          explanation: 'POM creates separate page classes for each web page/component, with each class containing elements and methods specific to that page.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the advantage of using @FindBy over driver.findElement()?',
          options: [
            'Faster execution',
            'Lazy initialization and cleaner code',
            'Uses less memory',
            'No advantages'
          ],
          correctAnswer: 1,
          explanation: '@FindBy with PageFactory provides lazy initialization (elements are located when first used) and results in cleaner, more maintainable code.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'In POM, where should WebDriver instance typically be declared?',
          options: [
            'As a global static variable',
            'As an instance variable in the page class',
            'Not needed in page classes',
            'As a local variable in every method'
          ],
          correctAnswer: 1,
          explanation: 'WebDriver is typically declared as an instance variable in the page class and passed through the constructor for initialization.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the typical structure of a page class constructor in POM?',
          options: [
            'Empty constructor',
            'Constructor accepting WebDriver and calling PageFactory.initElements()',
            'Constructor with no parameters',
            'Constructor that opens browser'
          ],
          correctAnswer: 1,
          explanation: 'Page class constructor typically accepts WebDriver parameter, assigns it to instance variable, and calls PageFactory.initElements(driver, this).',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'Which benefit is NOT provided by Page Object Model?',
          options: [
            'Code reusability',
            'Easier maintenance',
            'Automatic bug fixing',
            'Reduced code duplication'
          ],
          correctAnswer: 2,
          explanation: 'POM provides reusability, easier maintenance, and reduced duplication, but it does not automatically fix bugs in your test logic.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What does "lazy initialization" mean in the context of @FindBy?',
          options: [
            'Elements are never initialized',
            'Elements are found only when they are first accessed/used',
            'Elements are found immediately when page loads',
            'Elements are initialized randomly'
          ],
          correctAnswer: 1,
          explanation: 'Lazy initialization means @FindBy elements are not located until they are first accessed, improving performance and handling dynamic content better.',
          points: 3,
          difficulty: 'hard'
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
          question: 'Page Object Model is a Selenium built-in feature.',
          correctAnswer: false,
          explanation: 'False. POM is a design pattern, not a built-in Selenium feature. It uses Selenium features like @FindBy and PageFactory to implement the pattern.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'PageFactory.initElements() must be called to use @FindBy annotations.',
          correctAnswer: true,
          explanation: 'True. PageFactory.initElements(driver, this) must be called (typically in constructor) to initialize all @FindBy annotated elements.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['quick', 'full'],
          question: 'In POM, test logic and page-specific code should be in the same class.',
          correctAnswer: false,
          explanation: 'False. POM separates test logic (in test classes) from page-specific code (in page object classes) for better maintainability.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: '@FindBy can use all locator strategies like id, name, xpath, css, etc.',
          correctAnswer: true,
          explanation: 'True. @FindBy supports all locator strategies: id, name, className, tagName, linkText, partialLinkText, xpath, and css.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'A page object class should have one constructor that accepts WebDriver.',
          correctAnswer: true,
          explanation: 'True. Best practice is to have a constructor accepting WebDriver parameter to initialize the driver and call PageFactory.initElements().',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'Page object methods should return void for all actions.',
          correctAnswer: false,
          explanation: 'False. Methods can return page objects for method chaining, return data for verification, or return void. Design depends on the use case.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'POM eliminates the need for explicit waits.',
          correctAnswer: false,
          explanation: 'False. POM is a design pattern for code organization. You still need explicit waits for synchronization; they are just better organized in page classes.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'Each web page in the application should have its own page object class.',
          correctAnswer: true,
          explanation: 'True. Best practice is to create a separate page object class for each web page or major component in your application.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: '@FindBy elements are located immediately when PageFactory.initElements() is called.',
          correctAnswer: false,
          explanation: 'False. @FindBy uses lazy initialization - elements are located only when they are first accessed/used, not during initElements() call.',
          points: 2,
          difficulty: 'medium'
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'POM makes tests more maintainable because element locators are centralized in page classes.',
          correctAnswer: true,
          explanation: 'True. If a locator changes, you only need to update it in one place (the page class), not in multiple test methods.',
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
          mode: ['quick', 'full'],
          question: 'The _____ annotation is used to locate web elements in Page Object Model.',
          correctAnswer: '@FindBy',
          acceptedAnswers: ['@FindBy', 'FindBy'],
          explanation: 'The @FindBy annotation from org.openqa.selenium.support package is used to locate elements in POM.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['quick', 'full'],
          question: 'The _____ class provides the initElements() method to initialize page objects.',
          correctAnswer: 'PageFactory',
          acceptedAnswers: ['PageFactory'],
          explanation: 'PageFactory class provides PageFactory.initElements(driver, this) to initialize all @FindBy elements.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'To use @FindBy with an id locator, write @FindBy(_____ = "elementId").',
          correctAnswer: 'id',
          acceptedAnswers: ['id'],
          explanation: '@FindBy(id = "elementId") locates an element by its id attribute.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'In POM, the WebDriver instance is typically passed through the page class _____.',
          correctAnswer: 'constructor',
          acceptedAnswers: ['constructor', 'Constructor'],
          explanation: 'WebDriver is passed through the constructor: public LoginPage(WebDriver driver) { this.driver = driver; PageFactory.initElements(driver, this); }',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'The second parameter in PageFactory.initElements(driver, _____) refers to the current page class instance.',
          correctAnswer: 'this',
          acceptedAnswers: ['this'],
          explanation: 'PageFactory.initElements(driver, this) uses "this" to refer to the current page object instance whose elements need initialization.',
          points: 3,
          difficulty: 'medium'
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
          question: 'List three main benefits of using Page Object Model design pattern.',
          sampleAnswer: '1) Code Reusability: Page methods can be reused across multiple test cases, reducing duplication. 2) Easy Maintenance: Element locators are centralized in page classes, so changes in UI require updates in only one place. 3) Better Readability: Test code becomes more readable with business-oriented method names, separating test logic from implementation details. Additional benefits include reduced code duplication and improved test structure.',
          keywords: ['reusability', 'maintenance', 'readability', 'centralized', 'locators', 'duplication', 'separation'],
          minKeywords: 4,
          explanation: 'Main benefits: code reusability, easy maintenance (centralized locators), better readability, and reduced duplication.',
          points: 4,
          difficulty: 'easy'
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['quick', 'full'],
          question: 'Write the basic structure of a page class constructor in POM.',
          sampleAnswer: 'public LoginPage(WebDriver driver) { this.driver = driver; PageFactory.initElements(driver, this); } The constructor accepts WebDriver as parameter, assigns it to the instance variable, and calls PageFactory.initElements() to initialize all @FindBy annotated elements.',
          keywords: ['public', 'WebDriver', 'driver', 'this.driver', 'PageFactory', 'initElements', 'constructor'],
          minKeywords: 5,
          explanation: 'Constructor accepts WebDriver, assigns to instance variable, and calls PageFactory.initElements(driver, this).',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain what PageFactory.initElements(driver, this) does and when it should be called.',
          sampleAnswer: 'PageFactory.initElements(driver, this) initializes all @FindBy annotated WebElement fields in the current page object class by creating proxy elements. It should be called in the page class constructor after assigning the WebDriver instance. The "driver" parameter is the WebDriver instance used to locate elements, and "this" refers to the current page object whose elements need initialization. This enables lazy initialization where elements are actually located only when first accessed.',
          keywords: ['initializes', '@FindBy', 'WebElement', 'constructor', 'driver', 'this', 'proxy', 'lazy'],
          minKeywords: 5,
          explanation: 'PageFactory.initElements() initializes all @FindBy elements using proxy/lazy initialization. Called in constructor with driver and this.',
          points: 5,
          difficulty: 'medium'
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Write a complete example of defining a WebElement using @FindBy annotation with id locator.',
          sampleAnswer: '@FindBy(id = "username") private WebElement usernameField; OR @FindBy(id = "username") WebElement usernameField; This declares a private WebElement field annotated with @FindBy to locate an element with id="username". The element will be initialized when PageFactory.initElements() is called.',
          keywords: ['@FindBy', 'id', 'WebElement', 'private', '=', 'username'],
          minKeywords: 4,
          explanation: '@FindBy(id = "elementId") private WebElement fieldName; - declares an element with id locator.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the difference between traditional driver.findElement() approach and @FindBy with PageFactory.',
          sampleAnswer: 'Traditional approach: driver.findElement(By.id("username")) locates the element immediately each time it is called, leading to code duplication across tests. @FindBy approach: @FindBy(id = "username") WebElement usernameField with PageFactory provides lazy initialization (element located only when first accessed), cleaner code, centralized locators in page classes, and better maintenance. If locator changes, you update only the page class, not all tests. PageFactory also handles StaleElementReferenceException better with its proxy implementation.',
          keywords: ['findElement', '@FindBy', 'lazy', 'initialization', 'centralized', 'maintenance', 'duplication', 'proxy', 'PageFactory'],
          minKeywords: 5,
          explanation: 'driver.findElement() locates immediately each time; @FindBy with PageFactory provides lazy initialization, cleaner code, and centralized locators.',
          points: 5,
          difficulty: 'hard'
        }
      ]
    }
  ]
};
