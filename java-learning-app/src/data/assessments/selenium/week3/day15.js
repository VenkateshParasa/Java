export default {
  title: "Day 15: Page Object Model (POM) Assessment",
  description: "Test your understanding of Page Object Model design pattern in Selenium",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 12,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 25,
      timeLimit: 30,
      sections: ['section-a', 'section-b', 'section-c', 'section-d']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is the Page Object Model (POM)?',
          options: [
            'A testing framework',
            'A design pattern for organizing test code',
            'A type of locator strategy',
            'A browser automation tool'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'POM is a design pattern that creates an object repository for web UI elements, separating test logic from page-specific code.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'What is the main benefit of using Page Object Model?',
          options: [
            'Faster test execution',
            'Better code reusability and maintainability',
            'Automatic test generation',
            'Built-in reporting'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'POM improves code reusability and maintainability by separating page-specific code from test logic, making updates easier when UI changes.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'In POM, where should web element locators be defined?',
          options: [
            'In test methods',
            'In page classes',
            'In configuration files',
            'In utility classes'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'Web element locators should be defined in page classes, encapsulating all elements and actions for a specific page.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'What annotation is used in Selenium to initialize page elements?',
          options: [
            '@WebElement',
            '@FindBy',
            '@PageElement',
            '@Locator'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: '@FindBy annotation is used with PageFactory to initialize web elements in page classes.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'Which class is used to initialize page objects in Selenium?',
          options: [
            'PageInitializer',
            'PageFactory',
            'PageBuilder',
            'PageCreator'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'PageFactory class provides initElements() method to initialize page objects and their web elements.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'What should a page class method return in POM?',
          options: [
            'void',
            'boolean',
            'The same page object or next page object',
            'WebElement'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Page class methods should return page objects to enable method chaining and represent navigation flow.'
        },
        {
          id: 'q7',
          type: 'mcq',
          question: 'What is the purpose of PageFactory.initElements()?',
          options: [
            'To create new page instances',
            'To initialize WebElements using @FindBy annotations',
            'To validate page elements',
            'To execute test cases'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'PageFactory.initElements() initializes WebElements annotated with @FindBy, creating proxies for lazy initialization.'
        },
        {
          id: 'q8',
          type: 'mcq',
          question: 'In POM, what should NOT be included in page classes?',
          options: [
            'Web element locators',
            'Page-specific methods',
            'Test assertions',
            'Constructor'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'Test assertions should be in test classes, not page classes. Page classes should only contain page elements and actions.'
        },
        {
          id: 'q9',
          type: 'mcq',
          question: 'What is lazy initialization in PageFactory?',
          options: [
            'Elements are found when page loads',
            'Elements are found when first accessed',
            'Elements are never initialized',
            'Elements are initialized in constructor'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'Lazy initialization means WebElements are located only when they are first accessed, not during page object creation.'
        },
        {
          id: 'q10',
          type: 'mcq',
          question: 'Which is the correct way to use @FindBy annotation?',
          options: [
            '@FindBy(id="username")',
            '@FindBy(locator="id", value="username")',
            '@FindBy("id=username")',
            '@FindBy[id="username"]'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'medium',
          explanation: '@FindBy uses named parameters like @FindBy(id="username") or @FindBy(xpath="//input[@id=\'username\']").'
        },
        {
          id: 'q11',
          type: 'mcq',
          question: 'What is the recommended structure for a page class constructor?',
          options: [
            'No constructor needed',
            'Constructor that accepts WebDriver and calls PageFactory.initElements()',
            'Empty constructor',
            'Constructor that creates new WebDriver instance'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'Page class constructor should accept WebDriver parameter and call PageFactory.initElements(driver, this) to initialize elements.'
        },
        {
          id: 'q12',
          type: 'mcq',
          question: 'How should you handle dynamic elements in POM?',
          options: [
            'Use static locators only',
            'Use parameterized locators with dynamic values',
            'Avoid dynamic elements',
            'Use Thread.sleep()'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'hard',
          explanation: 'Dynamic elements should use parameterized locators where values can be passed as method parameters to construct dynamic XPath/CSS.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'True/False Questions',
      questions: [
        {
          id: 'q13',
          type: 'true-false',
          question: 'Page Object Model eliminates the need for explicit waits.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. POM is a design pattern for organizing code. You still need explicit waits for synchronization.'
        },
        {
          id: 'q14',
          type: 'true-false',
          question: 'In POM, each page should have its own class.',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. Each page or significant component should have its own page class for better organization and maintainability.'
        },
        {
          id: 'q15',
          type: 'true-false',
          question: 'PageFactory is mandatory for implementing POM.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. PageFactory is optional. You can implement POM without it by directly using driver.findElement() in methods.'
        },
        {
          id: 'q16',
          type: 'true-false',
          question: 'Page class methods should contain test logic and assertions.',
          correctAnswer: false,
          points: 2,
          difficulty: 'easy',
          explanation: 'False. Page classes should only contain page elements and actions. Test logic and assertions belong in test classes.'
        },
        {
          id: 'q17',
          type: 'true-false',
          question: '@FindBy annotation supports all locator strategies (id, name, xpath, css, etc.).',
          correctAnswer: true,
          points: 2,
          difficulty: 'easy',
          explanation: 'True. @FindBy supports id, name, className, tagName, linkText, partialLinkText, xpath, and css locator strategies.'
        },
        {
          id: 'q18',
          type: 'true-false',
          question: 'You can use multiple @FindBy annotations on a single WebElement.',
          correctAnswer: true,
          points: 2,
          difficulty: 'medium',
          explanation: 'True. Using @FindBys (AND logic) or @FindAll (OR logic) allows multiple @FindBy annotations for complex locator strategies.'
        },
        {
          id: 'q19',
          type: 'true-false',
          question: 'Page Object Model improves test execution speed.',
          correctAnswer: false,
          points: 2,
          difficulty: 'medium',
          explanation: 'False. POM improves code organization and maintainability, not execution speed. It may slightly slow down due to abstraction layers.'
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Fill in the Blanks',
      questions: [
        {
          id: 'q20',
          type: 'fill-blank',
          question: 'The ________ class in Selenium provides the initElements() method to initialize page objects.',
          correctAnswer: 'PageFactory',
          points: 2,
          difficulty: 'easy',
          explanation: 'PageFactory class provides static initElements() method for initializing page objects with @FindBy annotations.'
        },
        {
          id: 'q21',
          type: 'fill-blank',
          question: 'In POM, the ________ annotation is used to locate web elements.',
          correctAnswer: '@FindBy',
          points: 2,
          difficulty: 'easy',
          explanation: '@FindBy annotation is used to declare and locate web elements in page classes when using PageFactory.'
        },
        {
          id: 'q22',
          type: 'fill-blank',
          question: 'Page class methods should return ________ objects to enable method chaining.',
          correctAnswer: 'page',
          points: 2,
          difficulty: 'medium',
          explanation: 'Methods should return page objects (current or next page) to enable fluent interface pattern and method chaining.'
        },
        {
          id: 'q23',
          type: 'fill-blank',
          question: 'The ________ pattern in POM allows methods to be called in sequence on the same object.',
          correctAnswer: 'fluent',
          points: 2,
          difficulty: 'medium',
          explanation: 'Fluent interface pattern (or method chaining) allows calling multiple methods in sequence by returning page objects.'
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q24',
          type: 'short',
          question: 'Explain the key components of a Page Object Model implementation.',
          sampleAnswer: 'Key components of POM implementation: 1) Page Classes - One class per page containing web elements and page-specific methods. Elements declared using @FindBy annotations. 2) Page Factory - Used to initialize page objects with PageFactory.initElements(driver, this). 3) Test Classes - Contain test logic, assertions, and create instances of page classes. 4) Base Page - Optional parent class with common methods (waitForElement, isElementPresent). 5) WebDriver Instance - Passed to page constructors for element interaction. 6) Locators - Defined as @FindBy annotations at class level. 7) Page Methods - Return page objects for method chaining. Example structure: LoginPage extends BasePage, contains username/password fields, login() method returns HomePage object.',
          points: 4,
          difficulty: 'hard',
          keywords: ['page class', 'PageFactory', 'test class', '@FindBy', 'WebDriver', 'methods', 'return page object']
        },
        {
          id: 'q25',
          type: 'short',
          question: 'What are the advantages and disadvantages of using Page Object Model?',
          sampleAnswer: 'Advantages: 1) Code Reusability - Page methods can be reused across multiple tests. 2) Maintainability - UI changes require updates only in page classes, not all tests. 3) Readability - Tests are more readable with descriptive method names. 4) Separation of Concerns - Test logic separated from page-specific code. 5) Reduced Code Duplication - Common actions defined once in page classes. 6) Easy Collaboration - Team members can work on different pages independently. Disadvantages: 1) Initial Setup Time - Requires more upfront effort to create page classes. 2) Learning Curve - Team needs to understand POM pattern. 3) Over-engineering - May be overkill for small projects. 4) Maintenance Overhead - Need to maintain both page classes and tests. 5) Performance - Slight overhead due to abstraction layers. Best for medium to large projects with frequent UI changes.',
          points: 4,
          difficulty: 'hard',
          keywords: ['reusability', 'maintainability', 'readability', 'separation', 'advantages', 'disadvantages', 'setup time']
        }
      ]
    }
  ]
};