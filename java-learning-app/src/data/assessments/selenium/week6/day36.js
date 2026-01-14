export default {
  title: "Day 36: POM Part 2 - Advanced Patterns & Best Practices - Assessment",
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
      description: 'Choose the correct answer for each question (3 points each)',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the primary purpose of implementing a BasePage class in the Page Object Model?',
          options: [
            'To store all test data in a single location',
            'To provide common functionality and utilities that all page objects can inherit',
            'To handle database connections for the test suite',
            'To manage browser driver instances only'
          ],
          correctAnswer: 1,
          explanation: 'A BasePage class serves as a parent class that contains common functionality like wait methods, element interactions, and utilities that all page objects inherit. This promotes code reuse and maintains consistency across page objects.',
          points: 3
        },
        {
          id: 'q2',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which annotation is used with PageFactory to initialize web elements in Selenium?',
          options: [
            '@WebElement',
            '@FindBy',
            '@Locator',
            '@Element'
          ],
          correctAnswer: 1,
          explanation: '@FindBy is the annotation used with PageFactory to locate and initialize web elements. It supports various location strategies like id, name, xpath, css, className, etc.',
          points: 3
        },
        {
          id: 'q3',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is a Page Component pattern in POM?',
          options: [
            'A design pattern that splits page objects into individual test methods',
            'A pattern where reusable UI components (like headers, footers) are created as separate objects',
            'A pattern that combines all pages into a single component',
            'A pattern for managing browser configurations'
          ],
          correctAnswer: 1,
          explanation: 'The Page Component pattern involves creating separate objects for reusable UI components like headers, navigation bars, footers, or modals. These components can be composed into page objects, promoting reusability and reducing duplication.',
          points: 3
        },
        {
          id: 'q4',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'When using PageFactory.initElements(), when are the web elements actually located?',
          options: [
            'Immediately when initElements() is called',
            'When the page object is garbage collected',
            'Lazily, when the element is first accessed',
            'During test suite initialization'
          ],
          correctAnswer: 2,
          explanation: 'PageFactory uses lazy initialization. Elements are not located when initElements() is called, but only when they are first accessed in the code. This is achieved through dynamic proxies.',
          points: 3
        },
        {
          id: 'q5',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the recommended approach for handling page navigation in POM?',
          options: [
            'Return void from all methods and use assertions in page objects',
            'Return the next page object instance that the action leads to',
            'Store all pages in a static collection and retrieve them',
            'Use global variables to track current page'
          ],
          correctAnswer: 1,
          explanation: 'The best practice is to return the next page object that the action leads to. For example, a login method should return the HomePage object if login is successful. This creates a fluent API and makes test flow clear.',
          points: 3
        },
        {
          id: 'q6',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which wait strategy should be implemented in BasePage for better element handling?',
          options: [
            'Thread.sleep() for all waits',
            'Implicit waits only',
            'Explicit waits with custom wait conditions in reusable methods',
            'No waits, let tests handle timing'
          ],
          correctAnswer: 2,
          explanation: 'Explicit waits with custom wait conditions wrapped in reusable methods (in BasePage) provide the most flexible and reliable approach. They allow for specific conditions and can be applied selectively, unlike implicit waits.',
          points: 3
        },
        {
          id: 'q7',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the purpose of using @CacheLookup annotation with @FindBy in PageFactory?',
          options: [
            'To cache the element lookup and avoid re-locating the element on each access',
            'To store element values in browser cache',
            'To enable faster xpath evaluation',
            'To compress element data for better performance'
          ],
          correctAnswer: 0,
          explanation: '@CacheLookup caches the WebElement after first lookup, so subsequent accesses use the cached reference. However, it should only be used for elements that never change during the page lifecycle, as it can cause StaleElementReferenceException for dynamic elements.',
          points: 3
        },
        {
          id: 'q8',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'In a well-designed POM, where should assertions be placed?',
          options: [
            'Inside page object methods',
            'In the test classes, not in page objects',
            'In the BasePage class',
            'In utility classes only'
          ],
          correctAnswer: 1,
          explanation: 'Assertions should be kept in test classes, not in page objects. Page objects should only return data or state information, allowing tests to perform assertions. This maintains separation of concerns and makes page objects reusable.',
          points: 3
        },
        {
          id: 'q9',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'What is the best practice for handling multiple similar elements in a page component?',
          options: [
            'Create separate variables for each element',
            'Use List<WebElement> with @FindBy annotation',
            'Use only xpath with indices',
            'Avoid handling multiple elements in POM'
          ],
          correctAnswer: 1,
          explanation: 'Using List<WebElement> with @FindBy allows you to find and work with multiple similar elements efficiently. For example, @FindBy(css = ".product-item") List<WebElement> products; can locate all product items at once.',
          points: 3
        },
        {
          id: 'q10',
          type: 'mcq',
          mode: ['quick', 'full'],
          question: 'Which design principle is violated if page objects contain business logic?',
          options: [
            'Don\'t Repeat Yourself (DRY)',
            'Single Responsibility Principle (SRP)',
            'Open/Closed Principle',
            'Liskov Substitution Principle'
          ],
          correctAnswer: 1,
          explanation: 'Page objects violate the Single Responsibility Principle when they contain business logic. Page objects should only be responsible for representing the UI structure and providing methods to interact with elements, not implementing business rules.',
          points: 3
        },
        {
          id: 'q11',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the advantage of using a LoadableComponent pattern in POM?',
          options: [
            'It automatically loads test data from external sources',
            'It ensures a page is loaded before interacting with it by implementing load() and isLoaded() methods',
            'It reduces the size of page object classes',
            'It eliminates the need for wait conditions'
          ],
          correctAnswer: 1,
          explanation: 'LoadableComponent is a Selenium pattern that forces implementation of load() and isLoaded() methods. The load() method navigates to the page, while isLoaded() verifies the page is fully loaded. This ensures pages are ready before interaction.',
          points: 3
        },
        {
          id: 'q12',
          type: 'mcq',
          mode: ['full'],
          question: 'How should constructor injection be implemented in page objects?',
          options: [
            'Create a new WebDriver instance in each page object constructor',
            'Pass WebDriver as a parameter to the constructor and store it as an instance variable',
            'Use static WebDriver variables accessible to all page objects',
            'Avoid constructors and use factory methods only'
          ],
          correctAnswer: 1,
          explanation: 'Constructor injection involves passing the WebDriver instance as a parameter to the page object constructor. This promotes loose coupling, makes testing easier, and follows dependency injection principles.',
          points: 3
        },
        {
          id: 'q13',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the Page Chain pattern in POM?',
          options: [
            'Linking pages using hyperlinks only',
            'A pattern where methods return the current page object (this) for method chaining',
            'Creating a linked list of all pages',
            'Chaining multiple browser windows'
          ],
          correctAnswer: 1,
          explanation: 'The Page Chain (or Fluent Page Object) pattern involves methods returning "this" (the current page object) when they don\'t cause navigation. This allows chaining multiple actions like: loginPage.enterUsername("user").enterPassword("pass").clickLogin();',
          points: 3
        },
        {
          id: 'q14',
          type: 'mcq',
          mode: ['full'],
          question: 'When should you create separate page objects versus reusing existing ones?',
          options: [
            'Create a new page object for every test case',
            'Create separate page objects when pages have distinctly different structures or purposes',
            'Always use a single page object for the entire application',
            'Create page objects based on URL structure only'
          ],
          correctAnswer: 1,
          explanation: 'Separate page objects should be created when pages have different structures, purposes, or element sets. However, pages with similar structures (like product detail pages) can share a common page object class with parameterized elements.',
          points: 3
        },
        {
          id: 'q15',
          type: 'mcq',
          mode: ['full'],
          question: 'What is the recommended way to handle dynamic locators in page objects?',
          options: [
            'Hard-code all possible locator variations',
            'Use parameterized methods that accept dynamic values and construct locators at runtime',
            'Avoid dynamic locators entirely',
            'Store dynamic locators in test data files only'
          ],
          correctAnswer: 1,
          explanation: 'Dynamic locators should be handled through parameterized methods that accept values and construct locators at runtime. For example: By.xpath("//div[@data-id=\'"+productId+"\']"). This provides flexibility while maintaining the POM structure.',
          points: 3
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Section B: True/False Questions',
      description: 'Indicate whether each statement is true or false (2 points each)',
      questions: [
        {
          id: 'q16',
          type: 'truefalse',
          mode: ['full'],
          question: 'PageFactory automatically handles StaleElementReferenceException for all elements.',
          correctAnswer: false,
          explanation: 'False. PageFactory does not automatically handle StaleElementReferenceException. While it provides lazy initialization, if an element becomes stale (removed/reloaded in DOM), you still need to handle it through re-initialization or custom exception handling.',
          points: 2
        },
        {
          id: 'q17',
          type: 'truefalse',
          mode: ['full'],
          question: 'A BasePage class should always be instantiated directly in test methods.',
          correctAnswer: false,
          explanation: 'False. BasePage is typically an abstract class that should not be instantiated directly. It serves as a parent class for specific page objects to inherit common functionality. Only concrete page objects should be instantiated.',
          points: 2
        },
        {
          id: 'q18',
          type: 'truefalse',
          mode: ['full'],
          question: 'It is acceptable for page objects to access database connections for verification purposes.',
          correctAnswer: false,
          explanation: 'False. Page objects should only interact with the UI layer. Database access, API calls, or other backend verifications should be handled in separate utility classes or service layers, maintaining clear separation of concerns.',
          points: 2
        },
        {
          id: 'q19',
          type: 'truefalse',
          mode: ['full'],
          question: 'Inheritance in POM allows child page objects to override parent methods for specialized behavior.',
          correctAnswer: true,
          explanation: 'True. Inheritance allows child page objects to override methods from BasePage or parent page objects to provide specialized implementations while still reusing common functionality. This follows standard OOP principles.',
          points: 2
        },
        {
          id: 'q20',
          type: 'truefalse',
          mode: ['full'],
          question: 'Page objects should include detailed logging of every action for debugging purposes.',
          correctAnswer: true,
          explanation: 'True. Implementing logging in page object methods is a best practice. It helps with debugging, provides execution trails, and makes it easier to identify issues. However, logging should be implemented thoughtfully without cluttering the code.',
          points: 2
        },
        {
          id: 'q21',
          type: 'truefalse',
          mode: ['full'],
          question: 'The @FindAll annotation combines multiple @FindBy locators using OR logic.',
          correctAnswer: false,
          explanation: 'False. @FindAll uses AND logic, meaning the element must match all specified locators. @FindBy or @FindBys (with multiple @FindBy) uses OR logic, returning elements matching any of the locators.',
          points: 2
        },
        {
          id: 'q22',
          type: 'truefalse',
          mode: ['full'],
          question: 'A page component object can be reused across multiple page objects.',
          correctAnswer: true,
          explanation: 'True. That is the primary purpose of page components. Common UI elements like headers, footers, navigation menus, or search bars can be created as components and composed into multiple page objects.',
          points: 2
        },
        {
          id: 'q23',
          type: 'truefalse',
          mode: ['full'],
          question: 'It is recommended to use Thread.sleep() in BasePage methods for synchronization.',
          correctAnswer: false,
          explanation: 'False. Thread.sleep() is a hard wait and is considered a bad practice. Instead, use explicit waits (WebDriverWait) with expected conditions in BasePage methods for intelligent synchronization.',
          points: 2
        },
        {
          id: 'q24',
          type: 'truefalse',
          mode: ['full'],
          question: 'Page objects should expose WebElement objects directly to test classes.',
          correctAnswer: false,
          explanation: 'False. Page objects should not expose WebElement objects. Instead, they should provide methods that perform actions on elements and return results. This encapsulation protects the internal structure and makes tests more maintainable.',
          points: 2
        },
        {
          id: 'q25',
          type: 'truefalse',
          mode: ['full'],
          question: 'Creating generic methods in BasePage for common actions like click, type, and select improves code reusability.',
          correctAnswer: true,
          explanation: 'True. Generic methods in BasePage (like safeClick(), typeText(), selectDropdown()) that include proper waits and error handling improve code reusability, consistency, and reduce duplication across page objects.',
          points: 2
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Section C: Fill in the Blank Questions',
      description: 'Complete each statement with the correct answer (4 points each)',
      questions: [
        {
          id: 'q26',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ method is used to initialize all @FindBy annotated elements in a page object class when using PageFactory.',
          correctAnswer: 'initElements',
          explanation: 'PageFactory.initElements(driver, pageObject) is the method used to initialize all @FindBy annotated WebElement fields in a page object. It is typically called in the page object constructor.',
          points: 4
        },
        {
          id: 'q27',
          type: 'fillblank',
          mode: ['full'],
          question: 'In POM design, the __________ principle states that a page object should have only one reason to change.',
          correctAnswer: 'Single Responsibility',
          explanation: 'The Single Responsibility Principle (SRP) states that a class should have only one reason to change. In POM, this means a page object should only change when the UI of that page changes, not due to business logic or test logic changes.',
          points: 4
        },
        {
          id: 'q28',
          type: 'fillblank',
          mode: ['full'],
          question: 'The __________ pattern returns the current page object instance from methods to enable method chaining.',
          correctAnswer: 'Fluent',
          explanation: 'The Fluent pattern (or Fluent Interface) involves returning "this" from methods that don\'t cause navigation, enabling method chaining like: page.method1().method2().method3(). This creates more readable and expressive test code.',
          points: 4
        },
        {
          id: 'q29',
          type: 'fillblank',
          mode: ['full'],
          question: 'When multiple @FindBy annotations are needed with AND logic, the __________ annotation should be used.',
          correctAnswer: '@FindAll',
          explanation: '@FindAll annotation is used when an element must match all specified locator conditions (AND logic). For example, an element must have both a specific class AND a specific attribute value.',
          points: 4
        },
        {
          id: 'q30',
          type: 'fillblank',
          mode: ['full'],
          question: 'To avoid StaleElementReferenceException when working with dynamic elements, it is better not to use __________ annotation with @FindBy.',
          correctAnswer: '@CacheLookup',
          explanation: '@CacheLookup should not be used with dynamic elements because it caches the WebElement reference after first lookup. If the element is recreated or modified in the DOM, the cached reference becomes stale, causing StaleElementReferenceException.',
          points: 4
        }
      ]
    },
    {
      id: 'section-d',
      title: 'Section D: Short Answer Questions',
      description: 'Provide detailed answers to the following questions (8 points each)',
      questions: [
        {
          id: 'q31',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain how to implement a BasePage class with common wait methods and why this approach is beneficial. Include at least three specific methods that should be included.',
          keywords: ['WebDriverWait', 'explicit wait', 'reusable', 'inheritance', 'ExpectedConditions', 'constructor', 'encapsulation'],
          minKeywords: 3,
          sampleAnswer: 'A BasePage class should contain a WebDriver instance and WebDriverWait object passed through the constructor. It should include reusable wait methods such as: 1) waitForElementVisible(By locator) - uses ExpectedConditions.visibilityOfElementLocated() to wait for element visibility, 2) waitForElementClickable(By locator) - uses ExpectedConditions.elementToBeClickable() for interactive elements, and 3) waitForElementInvisible(By locator) - waits for elements to disappear. This approach is beneficial because it promotes code reusability through inheritance, provides consistent synchronization across all page objects, encapsulates wait logic in a single place making maintenance easier, and reduces code duplication. All page objects extend BasePage and inherit these methods, ensuring uniform element handling throughout the automation framework.',
          points: 8
        },
        {
          id: 'q32',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Describe the Page Component pattern and provide a practical example of when and how to use it. Include code structure examples.',
          keywords: ['reusable', 'composition', 'component', 'inheritance', 'encapsulation', 'navigation', 'header', 'footer'],
          minKeywords: 3,
          sampleAnswer: 'The Page Component pattern involves creating separate classes for reusable UI components that appear across multiple pages. For example, a HeaderComponent class can encapsulate the website header with navigation menu, search box, and user profile. Structure: HeaderComponent contains @FindBy elements and methods like clickLogoToHome(), searchProduct(String product), and clickUserProfile(). This component is then instantiated in multiple page objects using composition: in HomePage, ProductPage, and CartPage classes, you create a field "private HeaderComponent header;" and initialize it in the constructor. This is beneficial because it eliminates duplication, makes the component independently testable, and follows the DRY principle. When the header UI changes, you only update the HeaderComponent class rather than modifying every page object. This pattern is especially useful for navigation bars, footers, modal dialogs, and any UI element that appears consistently across multiple pages.',
          points: 8
        },
        {
          id: 'q33',
          type: 'shortanswer',
          mode: ['full'],
          question: 'What are the advantages and disadvantages of using PageFactory versus traditional By locators in POM? Provide at least two of each.',
          keywords: ['lazy initialization', 'readability', 'FindBy', 'dynamic locators', 'flexibility', 'maintenance', 'annotation'],
          minKeywords: 3,
          sampleAnswer: 'Advantages of PageFactory: 1) Improved readability - @FindBy annotations make element declarations cleaner and more declarative, 2) Lazy initialization - elements are located only when accessed, improving performance, 3) Less boilerplate - no need to write driver.findElement() repeatedly, 4) Clear separation - element declaration and locator strategy are clearly separated. Disadvantages: 1) Limited flexibility with dynamic locators - creating locators with runtime parameters is more complex, requiring workarounds, 2) @CacheLookup risks - improper use can cause StaleElementReferenceException, 3) Reduced control - you have less control over when element lookup occurs, 4) Learning curve - requires understanding of annotations and proxy mechanisms. Traditional By locators offer more flexibility for dynamic locators and complex scenarios but require more boilerplate code. The choice depends on project needs - PageFactory works well for stable, static pages, while By locators are better for highly dynamic applications.',
          points: 8
        },
        {
          id: 'q34',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Explain the concept of page object method return types and how they facilitate fluent test design. Provide examples of different return type scenarios.',
          keywords: ['return type', 'fluent', 'navigation', 'method chaining', 'page object', 'void', 'this', 'next page'],
          minKeywords: 3,
          sampleAnswer: 'Page object method return types are crucial for fluent test design and should reflect the result of the action. Three main scenarios: 1) Return next page object - when an action causes navigation to another page, return the new page object instance. Example: public HomePage login(String user, String pass) navigates to home page after login. 2) Return current page object (this) - for actions that stay on the same page, return "this" to enable method chaining. Example: public LoginPage enterUsername(String user) allows chaining: loginPage.enterUsername("test").enterPassword("pass").clickLogin(). 3) Return data/state - for queries or verifications, return actual values. Example: public String getWelcomeMessage() returns text for test assertions. Avoid void return types as they break fluent design and make tests less expressive. This approach creates self-documenting tests where the flow of page navigation is clear from the code structure, improves test readability, and makes test maintenance easier by explicitly showing page transitions.',
          points: 8
        },
        {
          id: 'q35',
          type: 'shortanswer',
          mode: ['full'],
          question: 'Discuss best practices for handling dynamic elements and complex locator strategies in advanced POM implementations. Include strategies for handling lists of elements and parameterized locators.',
          keywords: ['dynamic', 'List<WebElement>', 'parameterized', 'String.format', 'By', 'xpath', 'findElements', 'runtime'],
          minKeywords: 3,
          sampleAnswer: 'Best practices for dynamic elements: 1) Parameterized locators - create methods that accept parameters and build locators at runtime using String.format(). Example: public void selectProduct(String productName) { driver.findElement(By.xpath(String.format("//div[@product-name=\'%s\']", productName))).click(); }. 2) List of elements - use List<WebElement> with @FindBy for collections: @FindBy(css = ".product-item") List<WebElement> products; then iterate to find specific elements. 3) Dynamic By locators - create helper methods in BasePage that return By objects: protected By getDynamicLocator(String template, String value) { return By.xpath(String.format(template, value)); }. 4) Page-specific methods - encapsulate complex selection logic in page object methods rather than exposing raw elements. 5) Avoid @CacheLookup for dynamic elements to prevent stale references. 6) Use WebDriverWait for dynamic elements that may not be immediately available. This approach maintains POM principles while handling complex, dynamic UIs, keeps locator logic encapsulated, and makes tests more maintainable and flexible.',
          points: 8
        }
      ]
    }
  ]
};
