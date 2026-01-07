# Java for Selenium Automation - 45 Day Role-Specific Course

## Course Overview
This specialized course combines essential Java concepts with Selenium WebDriver to make you job-ready for QA Automation Engineer roles. Assumes basic programming knowledge.

---

## Phase 1: Java Essentials for Selenium (Days 1-15)

### Week 1: Core Java Quick Start

#### Day 1: Setup & Java Basics for Automation
- JDK installation (Java 11 or 17 recommended)
- IDE setup (IntelliJ IDEA Community Edition)
- Maven basics and pom.xml
- Variables, data types (focus on String, int, boolean)
- First Java program
**Practice**: Setup environment, create Maven project

#### Day 2: Operators & Control Structures
- Operators (==, !=, &&, ||, !)
- if-else (for element validation)
- switch-case (for browser selection)
- Loops (for iterating through elements)
**Practice**: Write conditional logic programs

#### Day 3: Arrays & Strings
- Array declaration and manipulation
- String methods (split, trim, contains, equals)
- String comparison techniques
- Why strings matter in automation (text verification)
**Practice**: String manipulation for test data

#### Day 4: Methods & Static Keyword
- Creating methods
- Method parameters and return types
- static keyword importance
- Utility methods for automation
**Practice**: Create reusable utility methods

#### Day 5: Object-Oriented Programming Part 1
- Classes and Objects
- Constructors
- this keyword
- Creating page objects basics
**Practice**: Create simple page object classes

#### Day 6: OOP Part 2 - Inheritance
- Inheritance concept
- extends keyword
- super keyword
- Base test class concept
**Practice**: Create base class for test cases

#### Day 7: OOP Part 3 - Interfaces & Polymorphism
- Interfaces (crucial for Selenium)
- Implementing multiple interfaces
- Method overriding
- Polymorphism in Selenium
**Practice**: Create interface examples

### Week 2: Advanced Java for Automation

#### Day 8: Collections - ArrayList
- ArrayList for dynamic data
- add, get, remove operations
- Iterating through ArrayList
- Use cases in automation (storing test data, web elements)
**Practice**: Manage test data using ArrayList

#### Day 9: Collections - HashMap
- HashMap key-value pairs
- put, get, containsKey operations
- Use cases (test data management, configurations)
**Practice**: Store and retrieve test data

#### Day 10: Exception Handling
- try-catch blocks
- Common Selenium exceptions
- Creating custom exceptions
- Handling NoSuchElementException, TimeoutException
**Practice**: Implement exception handling

#### Day 11: File Handling
- Reading properties files
- Reading Excel files (Apache POI introduction)
- Reading text files
- Reading JSON files (basic)
**Practice**: Read configuration from files

#### Day 12: Java 8 Features - Lambda & Streams
- Lambda expressions
- Stream API for filtering data
- forEach for iteration
- Practical use in test automation
**Practice**: Use streams for test data filtering

#### Day 13: Packages & Access Modifiers
- Creating package structure
- Import statements
- Access modifiers impact on framework design
- Standard automation project structure
**Practice**: Organize code into packages

#### Day 14: Wrapper Classes & Type Conversion
- Wrapper classes (Integer, Boolean)
- String to int conversion
- Data conversion for parameterization
**Practice**: Convert and handle different data types

#### Day 15: Week 1-2 Review & Mini Project
**Project**: Create a data-driven utility
- Read test data from Excel/CSV
- Store in collections
- Implement exception handling
**Assessment**: Review all Java concepts learned

---

## Phase 2: Selenium WebDriver Fundamentals (Days 16-30)

### Week 3: Selenium Basics

#### Day 16: Selenium Introduction & Setup
- What is Selenium WebDriver?
- Selenium architecture
- Setting up Selenium with Maven
- Adding Selenium dependencies to pom.xml
- WebDriver interface overview
**Practice**: Setup Selenium project with Maven

#### Day 17: First Selenium Script
- Browser drivers (ChromeDriver, EdgeDriver)
- WebDriverManager for driver management
- Basic WebDriver commands (get, getTitle, getCurrentUrl)
- Browser navigation (back, forward, refresh)
- Closing browser (close vs quit)
**Practice**: Write basic browser automation scripts

#### Day 18: Locators - Part 1
- Importance of locators
- ID locator
- Name locator
- Class name locator
- Tag name locator
- Finding single vs multiple elements
**Practice**: Identify and use different locators

#### Day 19: Locators - Part 2 (XPath)
- XPath syntax
- Absolute vs Relative XPath
- XPath axes
- XPath functions (text(), contains(), starts-with())
- Dynamic XPath creation
**Practice**: Create robust XPath expressions

#### Day 20: Locators - Part 3 (CSS Selector)
- CSS Selector syntax
- CSS vs XPath comparison
- CSS Selector strategies
- When to use CSS vs XPath
**Practice**: Create CSS selectors for web elements

#### Day 21: WebElement Interactions
- sendKeys() for text input
- click() for clicking elements
- clear() for clearing text
- getText() for retrieving text
- getAttribute() for element attributes
- isDisplayed(), isEnabled(), isSelected()
**Practice**: Interact with different web elements

#### Day 22: Dropdowns & Checkboxes
- Select class for dropdowns
- selectByVisibleText, selectByValue, selectByIndex
- Handling checkboxes and radio buttons
- Multi-select dropdowns
**Practice**: Automate forms with dropdowns

### Week 4: Intermediate Selenium

#### Day 23: Waits - Part 1
- Synchronization importance
- Implicit wait
- Explicit wait
- WebDriverWait and ExpectedConditions
- Common wait conditions
**Practice**: Implement different wait strategies

#### Day 24: Waits - Part 2
- Fluent wait
- Custom ExpectedConditions
- Polling frequency
- Ignoring specific exceptions
**Practice**: Create custom wait conditions

#### Day 25: Handling Alerts & Pop-ups
- JavaScript alerts
- Alert interface (accept, dismiss, getText, sendKeys)
- Handling confirmations
- Handling prompts
**Practice**: Automate alert handling

#### Day 26: Frames & Windows
- Switching between frames (index, name, WebElement)
- Switching to default content
- Handling multiple windows/tabs
- Window handles
**Practice**: Navigate between frames and windows

#### Day 27: Actions Class
- Mouse hover (moveToElement)
- Drag and drop
- Right click (contextClick)
- Double click
- Keyboard actions (keyDown, keyUp)
**Practice**: Perform complex user interactions

#### Day 28: JavaScript Executor
- What is JavaScriptExecutor?
- Executing JavaScript code
- Scrolling operations
- Clicking hidden elements
- Handling disabled elements
**Practice**: Use JavaScript for element interactions

#### Day 29: Screenshots & Browser Options
- Taking screenshots (getScreenshotAs)
- Screenshot for failures
- Chrome options (headless, window size, disable notifications)
- Firefox options
**Practice**: Capture screenshots and configure browsers

### Week 5: Framework Building Blocks

#### Day 30: TestNG Framework - Part 1
- What is TestNG?
- TestNG installation
- @Test annotation
- Running tests
- Assertions (assertEquals, assertTrue, assertFalse)
**Practice**: Convert Selenium scripts to TestNG tests

---

## Phase 3: Test Automation Framework (Days 31-45)

### Week 6: TestNG Deep Dive

#### Day 31: TestNG - Part 2
- @BeforeMethod, @AfterMethod
- @BeforeClass, @AfterClass
- @BeforeTest, @AfterTest
- @BeforeSuite, @AfterSuite
- Annotations hierarchy
**Practice**: Use setup and teardown methods

#### Day 32: TestNG - Part 3
- Test prioritization (priority attribute)
- Enabling/disabling tests (enabled attribute)
- Test dependencies (dependsOnMethods)
- Grouping tests (groups attribute)
- Running specific groups
**Practice**: Organize test execution

#### Day 33: TestNG - Part 4
- Parameters from testng.xml
- DataProvider for data-driven testing
- @Parameters annotation
- Running tests in parallel
**Practice**: Implement data-driven tests

#### Day 34: TestNG - Part 5
- TestNG assertions deep dive
- Soft assertions
- Custom assertions
- testng.xml configuration
- Suite organization
**Practice**: Create comprehensive test suites

#### Day 35: Page Object Model - Part 1
- What is POM?
- Benefits of POM
- Creating page classes
- @FindBy annotation
- PageFactory class
- initElements method
**Practice**: Convert existing tests to POM

#### Day 36: Page Object Model - Part 2
- Base page class
- Page component pattern
- POM best practices
- Organizing page objects
**Practice**: Build page object hierarchy

#### Day 37: Reading External Data
- Properties file reader
- Excel file reading (Apache POI)
- Parameterization from Excel
- JSON file reading (optional)
**Practice**: Externalize test data

### Week 7: Framework Enhancement

#### Day 38: Logging & Reporting - Part 1
- Log4j setup and configuration
- Logging levels (INFO, DEBUG, ERROR)
- Adding logs to tests
- Log file management
**Practice**: Implement logging framework

#### Day 39: Logging & Reporting - Part 2
- TestNG HTML reports
- Extent Reports setup
- Creating detailed reports
- Adding screenshots to reports
**Practice**: Generate comprehensive reports

#### Day 40: Configuration Management
- Reading from properties file
- Configuration class/interface
- Environment-specific configs
- Browser factory pattern
**Practice**: Centralize configurations

#### Day 41: Utility Classes
- Screenshot utility
- Wait utility
- Excel utility
- Common actions utility
- Reusable methods
**Practice**: Build utility framework

#### Day 42: Exception Handling in Framework
- Custom exceptions
- Try-catch in appropriate places
- Logging exceptions
- Failing tests gracefully
**Practice**: Add robust exception handling

### Week 8: Advanced Topics & Project

#### Day 43: Cross-Browser Testing
- Browser factory implementation
- Running tests on different browsers
- Browser-specific configurations
- Parallel browser execution
**Practice**: Execute tests across browsers

#### Day 44: Framework Best Practices
- Code organization
- Naming conventions
- SOLID principles in automation
- Framework scalability
- Code review checklist
**Practice**: Refactor existing code

#### Day 45: Final Capstone Project
**Project**: Build Complete E-commerce Test Automation Framework
- Test scenarios:
  - User registration and login
  - Product search and filtering
  - Add to cart functionality
  - Checkout process
  - Order verification

**Framework Requirements**:
- Page Object Model structure
- TestNG test organization
- Data-driven testing from Excel
- Properties file for configurations
- Extent Reports for reporting
- Log4j for logging
- Screenshot on failure
- Cross-browser support
- Reusable utility classes
- Exception handling
- Maven project structure

**Deliverables**:
- Complete automation framework
- 15-20 test cases
- Test execution report
- README documentation
- Code committed to GitHub

---

## Additional Skills to Learn (Post-Course)

### Immediate Next Steps
1. **Git & GitHub**: Version control for automation code
2. **Jenkins**: CI/CD integration for test execution
3. **Maven/Gradle**: Build tool deep dive
4. **Cucumber BDD**: Behavior-driven testing (optional)

### Advanced Topics (3-6 months)
1. **Rest Assured**: API testing with Java
2. **Database Testing**: JDBC for database validation
3. **Selenium Grid**: Distributed test execution
4. **Docker**: Containerized test execution
5. **Performance Testing**: JMeter basics

---

## Project Structure Best Practice

```
selenium-automation-framework/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/
│   │       │   ├── BasePage.java
│   │       │   ├── LoginPage.java
│   │       │   └── HomePage.java
│   │       ├── utils/
│   │       │   ├── DriverFactory.java
│   │       │   ├── ConfigReader.java
│   │       │   ├── ExcelReader.java
│   │       │   └── ScreenshotUtils.java
│   │       └── constants/
│   │           └── Constants.java
│   └── test/
│       ├── java/
│       │   ├── base/
│       │   │   └── BaseTest.java
│       │   └── tests/
│       │       ├── LoginTests.java
│       │       └── CheckoutTests.java
│       └── resources/
│           ├── testng.xml
│           └── config.properties
├── test-data/
│   └── testdata.xlsx
├── test-output/
├── logs/
├── screenshots/
├── pom.xml
└── README.md
```

---

## Daily Study Routine

### Time Allocation (3-4 hours/day)
- **Theory & Videos**: 45-60 minutes
- **Hands-on Practice**: 90-120 minutes
- **Problem Solving**: 30-45 minutes
- **Review Previous Day**: 15-20 minutes

### Weekend Activities
- Build mini-projects
- Practice on real websites (demo sites)
- Code review and refactoring
- Mock interviews

---

## Practice Websites for Automation

1. **The Internet** - http://the-internet.herokuapp.com/
2. **Sauce Demo** - https://www.saucedemo.com/
3. **OrangeHRM Demo** - https://opensource-demo.orangehrmlive.com/
4. **Automation Practice** - http://automationpractice.com/
5. **DemoQA** - https://demoqa.com/

---

## Job Readiness Checklist

After completing this course, you should be able to:
- [ ] Explain Java OOP concepts with examples
- [ ] Write Selenium scripts independently
- [ ] Create Page Object Model framework from scratch
- [ ] Implement data-driven testing
- [ ] Handle dynamic elements and waits
- [ ] Generate reports and logs
- [ ] Explain your framework architecture
- [ ] Debug test failures
- [ ] Write 20+ different types of test scenarios
- [ ] Use Git for version control
- [ ] Push code to GitHub
- [ ] Explain CI/CD basics

---

## Interview Preparation Topics

### Core Java Questions
- OOP concepts with examples
- Collections framework
- Exception handling scenarios
- String immutability
- Access modifiers

### Selenium Questions
- Selenium architecture
- Locator strategies
- Handling different elements
- Synchronization techniques
- POM advantages
- Framework architecture explanation

### Framework Design Questions
- Why POM?
- How do you handle test data?
- Exception handling strategy
- Reporting mechanism
- Cross-browser testing approach
- Parallel execution setup

---

## Recommended Tools & Resources

### Must-Have Tools
- IntelliJ IDEA Community Edition
- Chrome & Firefox browsers
- Maven 3.x
- Git
- ChromeDriver/GeckoDriver (or WebDriverManager)

### Learning Resources
- Selenium Official Documentation
- TestNG Documentation
- Stack Overflow
- YouTube channels (Automation Step by Step, Naveen AutomationLabs)
- Practice platforms mentioned above

### Maven Dependencies to Know
```xml
- selenium-java
- testng
- webdrivermanager
- extentreports
- apache-poi (Excel)
- log4j
```

---

## Success Metrics

### Week 3 Checkpoint
- Can you automate a login page?
- Can you use different locators effectively?
- Can you handle basic waits?

### Week 5 Checkpoint
- Have you created a basic POM structure?
- Can you run data-driven tests?
- Can you generate reports?

### Final Checkpoint (Day 45)
- Complete framework built and documented
- Can explain design decisions
- Ready for junior automation engineer roles
- Portfolio project on GitHub

---

## Career Path

### Entry Level (0-1 year)
- QA Automation Engineer
- Test Automation Engineer
- SDET (Software Development Engineer in Test)

### Skills to Add for Growth
- API Testing (Rest Assured)
- CI/CD (Jenkins, GitLab CI)
- Cloud platforms (AWS, Azure)
- Containerization (Docker)
- Performance testing

**Remember**: Consistency is key. Code every day, even if just for 30 minutes!
