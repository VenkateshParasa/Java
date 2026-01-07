# Java for Selenium Automation - Detailed Topic Breakdown (45 Days)

## PHASE 1: JAVA ESSENTIALS FOR SELENIUM (Days 1-15)

### Week 1: Core Java Quick Start

#### Day 1: Setup & Java Basics for Automation
##### Subtopics:
1. **JDK Installation**
   - Download JDK 11 or 17
   - Set JAVA_HOME
   - Verify installation: `java -version`

2. **IDE Setup**
   - IntelliJ IDEA Community Edition
   - Creating Java project
   - Understanding project structure

3. **Maven Basics**
   - What is Maven?
   - pom.xml file structure
   - Dependencies management
   - Maven commands: clean, compile, test

4. **Java Basics**
   - Variables: int, String, boolean (most used in automation)
   - Data types focus for automation
   - System.out.println() for debugging

5. **First Java Program**
   - public class, main method
   - Running Java programs in IDE

**Why for Selenium**: Maven manages Selenium dependencies; basic Java is the foundation

**Practice**: Create Maven project, add a simple Java class

---

#### Day 2: Operators & Control Structures
##### Subtopics:
1. **Operators Essential for Automation**
   - Comparison operators: ==, !=, >, <
   - Logical operators: &&, ||, ! (for conditions in tests)
   - String concatenation: + operator

2. **if-else Statements**
   - Conditional test execution
   - Verifying element states
   - if-else-if ladder for multiple conditions

3. **switch-case**
   - Browser selection logic
   - Environment selection (dev, qa, prod)

4. **Loops**
   - for loop: Iterating through test data
   - while loop: Waiting conditions
   - Enhanced for loop: Iterating web elements

**Why for Selenium**: Conditional logic for test assertions, loops for handling multiple elements

**Practice**: Write programs with conditions and loops simulating test scenarios

---

#### Day 3: Arrays & Strings
##### Subtopics:
1. **Arrays**
   - Declaring and initializing arrays
   - Storing test data
   - Iterating through arrays

2. **String Class - Critical for Automation**
   - String declaration
   - String immutability
   - Common methods:
     * equals() - text comparison in assertions
     * contains() - partial text matching
     * trim() - removing whitespaces
     * split() - splitting text
     * substring() - extracting text
     * toLowerCase() / toUpperCase() - case handling

3. **String Comparison**
   - equals() vs == (CRITICAL!)
   - equalsIgnoreCase()

4. **String Manipulation**
   - Concatenation
   - Formatting
   - StringBuilder for dynamic strings

**Why for Selenium**: String handling for text verification, element locators, test data

**Practice**: String manipulation programs for test data scenarios

---

#### Day 4: Methods & Static Keyword
##### Subtopics:
1. **Methods**
   - Method definition
   - Parameters and return types
   - void methods
   - Returning values

2. **Creating Reusable Methods**
   - Utility methods for automation
   - Methods for common actions

3. **Static Keyword**
   - Static methods in utility classes
   - When to use static
   - Why main() is static

4. **Method Overloading**
   - Same method name, different parameters
   - Flexible utility methods

**Why for Selenium**: Creating reusable utility methods for common automation tasks

**Practice**: Create utility class with reusable methods

---

#### Day 5: OOP Part 1 - Classes & Objects
##### Subtopics:
1. **Classes and Objects**
   - Class as blueprint
   - Object creation
   - Instance variables

2. **Constructors**
   - Default and parameterized
   - Initializing objects

3. **this Keyword**
   - Referring to current object

4. **Page Object Basics**
   - Introduction to Page Object concept
   - Why separate pages into classes

**Why for Selenium**: Foundation for Page Object Model

**Practice**: Create simple page classes (LoginPage concept)

---

#### Day 6: OOP Part 2 - Inheritance
##### Subtopics:
1. **Inheritance Basics**
   - extends keyword
   - Parent-child relationship
   - Code reusability

2. **super Keyword**
   - Calling parent constructor
   - Accessing parent methods

3. **Method Overriding**
   - Overriding parent methods
   - @Override annotation

4. **Base Test Class Concept**
   - Common test setup
   - setUp and tearDown methods

**Why for Selenium**: Base test class for common test configurations

**Practice**: Create BaseTest class concept

---

#### Day 7: OOP Part 3 - Interfaces & Polymorphism
##### Subtopics:
1. **Interfaces**
   - interface keyword
   - implements keyword
   - Multiple interface implementation
   - Why interfaces are important in Selenium

2. **WebDriver Interface**
   - Introduction to Selenium interfaces
   - Why WebDriver is an interface

3. **Polymorphism**
   - Parent reference, child object
   - WebDriver driver = new ChromeDriver()
   - Flexibility in code

4. **Access Modifiers**
   - public, private, protected
   - When to use each

**Why for Selenium**: Understanding Selenium's interface-based architecture

**Practice**: Implement interfaces, understand polymorphism

---

### Week 2: Advanced Java for Automation

#### Day 8: Collections - ArrayList
##### Subtopics:
1. **ArrayList Basics**
   - Dynamic array
   - Generic type: ArrayList<Type>
   - Import statement: java.util.ArrayList

2. **ArrayList Methods**
   - add(element)
   - get(index)
   - size()
   - remove(index)
   - contains(element)
   - clear()

3. **Iterating ArrayList**
   - for loop with index
   - Enhanced for loop
   - forEach (Java 8)

4. **Use Cases in Automation**
   - Storing WebElements
   - Managing test data
   - Collecting test results

**Why for Selenium**: Storing multiple web elements, dynamic test data

**Practice**: Store and manipulate test data using ArrayList

---

#### Day 9: Collections - HashMap
##### Subtopics:
1. **HashMap Basics**
   - Key-value pairs
   - Generic type: HashMap<Key, Value>
   - Import: java.util.HashMap

2. **HashMap Methods**
   - put(key, value)
   - get(key)
   - containsKey(key)
   - keySet()
   - values()
   - entrySet()

3. **Iterating HashMap**
   - for-each on keySet()
   - for-each on entrySet()

4. **Use Cases in Automation**
   - Test data management (username-password)
   - Configuration parameters
   - Expected vs actual results

**Why for Selenium**: Managing key-value test data, configurations

**Practice**: Create test data repository using HashMap

---

#### Day 10: Exception Handling
##### Subtopics:
1. **Exception Basics**
   - What are exceptions?
   - try-catch blocks
   - finally block

2. **Common Selenium Exceptions**
   - NoSuchElementException
   - TimeoutException
   - StaleElementReferenceException
   - ElementNotInteractableException

3. **Handling Exceptions**
   - try-catch for specific exceptions
   - Generic Exception catch
   - Logging exceptions

4. **Creating Custom Exceptions**
   - extends Exception
   - Custom error messages

5. **throws Keyword**
   - Declaring exceptions
   - Exception propagation

**Why for Selenium**: Handling Selenium-specific exceptions gracefully

**Practice**: Handle common automation exceptions

---

#### Day 11: File Handling
##### Subtopics:
1. **Reading Properties Files**
   - config.properties
   - FileInputStream
   - Properties class
   - load() method
   - getProperty(key)

2. **Reading Text Files**
   - FileReader
   - BufferedReader
   - Reading line by line

3. **Introduction to Excel Reading**
   - Why Excel for test data?
   - Apache POI library introduction
   - Reading Excel basics

4. **Reading JSON (Basic)**
   - JSON structure
   - Simple JSON parsing

**Why for Selenium**: Externalizing configurations and test data

**Practice**: Read configuration from properties file

---

#### Day 12: Java 8 Features - Lambda & Streams
##### Subtopics:
1. **Lambda Expressions**
   - Anonymous functions
   - Syntax: (params) -> expression
   - Single line lambdas

2. **Functional Interfaces**
   - Predicate, Function, Consumer
   - Using lambdas with interfaces

3. **Stream API**
   - stream() method
   - filter() - filtering data
   - map() - transforming data
   - collect() - collecting results
   - forEach() - iteration

4. **Practical Use in Automation**
   - Filtering test data
   - Processing web element lists
   - Clean, readable code

**Why for Selenium**: Modern, clean code for data processing

**Practice**: Filter and transform test data using streams

---

#### Day 13: Packages & Access Modifiers
##### Subtopics:
1. **Packages**
   - package statement
   - Organizing code
   - Standard automation package structure

2. **Import Statements**
   - import keyword
   - Wildcard imports

3. **Access Modifiers**
   - public - accessible everywhere
   - private - within class only
   - protected - package + subclasses
   - default - package-private

4. **Automation Package Structure**
   - pages/ - page objects
   - tests/ - test classes
   - utils/ - utility classes
   - base/ - base classes
   - config/ - configurations

**Why for Selenium**: Organizing automation framework

**Practice**: Create proper package structure

---

#### Day 14: Wrapper Classes & Type Conversion
##### Subtopics:
1. **Wrapper Classes**
   - Integer, Double, Boolean
   - Why needed in collections

2. **Type Conversion**
   - String to int: Integer.parseInt()
   - String to double: Double.parseDouble()
   - int to String: String.valueOf()

3. **Autoboxing & Unboxing**
   - Automatic conversion

4. **Use in Automation**
   - Converting test data types
   - Parameterization
   - Data from Excel/files

**Why for Selenium**: Converting data types for test parameterization

**Practice**: Convert and handle different data types

---

#### Day 15: Week 1-2 Review & Mini Project
##### Review Topics:
- Java basics and syntax
- Control structures
- Collections (ArrayList, HashMap)
- Exception handling
- File operations
- OOP concepts

##### Mini Project: Data-Driven Utility
**Requirements**:
- Read test data from a CSV file
- Store in ArrayList or HashMap
- Handle file exceptions
- Implement data retrieval methods
- Print test data

**Deliverable**: Working utility class with proper exception handling

---

## PHASE 2: SELENIUM WEBDRIVER FUNDAMENTALS (Days 16-30)

### Week 3: Selenium Basics

#### Day 16: Selenium Introduction & Setup
##### Subtopics:
1. **Selenium Overview**
   - What is Selenium?
   - Selenium components: IDE, WebDriver, Grid
   - Why WebDriver?

2. **Selenium Architecture**
   - Client libraries (Java bindings)
   - JSON Wire Protocol / W3C WebDriver
   - Browser drivers
   - Browsers

3. **Maven Dependencies**
   - Adding Selenium dependency in pom.xml
   ```xml
   <dependency>
       <groupId>org.seleniumhq.selenium</groupId>
       <artifactId>selenium-java</artifactId>
       <version>4.x.x</version>
   </dependency>
   ```

4. **WebDriverManager**
   - Automatic driver management
   - WebDriverManager.chromedriver().setup()

5. **WebDriver Interface**
   - Parent interface for all drivers
   - Why it's an interface

**Practice**: Setup Selenium project with Maven dependencies

---

#### Day 17: First Selenium Script
##### Subtopics:
1. **Browser Drivers**
   - ChromeDriver
   - EdgeDriver
   - FirefoxDriver (GeckoDriver)

2. **Creating WebDriver Instance**
   - WebDriver driver = new ChromeDriver();
   - WebDriverManager setup

3. **Basic WebDriver Commands**
   - get(url) - open webpage
   - getTitle() - get page title
   - getCurrentUrl() - get current URL
   - getPageSource() - get HTML source

4. **Browser Navigation**
   - navigate().to(url)
   - navigate().back()
   - navigate().forward()
   - navigate().refresh()

5. **Closing Browser**
   - close() - closes current window
   - quit() - closes all windows and ends session

6. **Managing Windows**
   - maximize()
   - minimize()
   - fullscreen()

**Practice**: Write first complete Selenium script

---

#### Day 18: Locators - Part 1
##### Subtopics:
1. **Importance of Locators**
   - Finding elements on webpage
   - Unique identification

2. **findElement() vs findElements()**
   - findElement() - returns WebElement
   - findElements() - returns List<WebElement>

3. **ID Locator**
   - Most preferred
   - Syntax: By.id("elementId")
   - Fast and reliable

4. **Name Locator**
   - By.name("elementName")
   - Common in forms

5. **Class Name Locator**
   - By.className("className")
   - Watch for spaces (compound classes)

6. **Tag Name Locator**
   - By.tagName("tagName")
   - Finding multiple elements
   - Example: All links (a), all inputs

7. **Link Text Locator**
   - By.linkText("exact text")
   - Only for <a> tags
   - Case sensitive

8. **Partial Link Text**
   - By.partialLinkText("partial text")
   - Matches substring

**Practice**: Identify and use different locators on a webpage

---

#### Day 19: Locators - Part 2 (XPath)
##### Subtopics:
1. **XPath Introduction**
   - XML Path Language
   - Most powerful and flexible
   - Works with all elements

2. **Absolute XPath**
   - Starts from root: /html/body/div...
   - Brittle and not recommended
   - Breaks with small changes

3. **Relative XPath**
   - Starts with // (double slash)
   - More reliable
   - Recommended approach

4. **Basic XPath Syntax**
   - //tagName[@attribute='value']
   - //input[@id='username']
   - //button[@name='submit']

5. **XPath Axes**
   - parent:: - select parent
   - child:: - select children
   - following-sibling:: - next siblings
   - preceding-sibling:: - previous siblings
   - ancestor:: - all ancestors
   - descendant:: - all descendants

6. **XPath Functions**
   - text() - //button[text()='Login']
   - contains() - //div[contains(@class, 'error')]
   - starts-with() - //input[starts-with(@id, 'user')]
   - normalize-space() - handle whitespaces

7. **XPath Operators**
   - and - //input[@type='text' and @name='username']
   - or - //input[@type='submit' or @type='button']

8. **Dynamic XPath**
   - Creating robust locators
   - Handling dynamic IDs
   - Using multiple attributes

**Practice**: Create various XPath expressions for web elements

---

#### Day 20: Locators - Part 3 (CSS Selector)
##### Subtopics:
1. **CSS Selector Introduction**
   - Cascading Style Sheets selector
   - Faster than XPath (in some browsers)
   - Cannot traverse up (no parent)

2. **Basic CSS Syntax**
   - tagName[attribute='value']
   - input[id='username']
   - button[name='submit']

3. **CSS with ID**
   - #idValue (shorthand)
   - input#username
   - #username (any tag)

4. **CSS with Class**
   - .className (shorthand)
   - div.error-message
   - .error-message (any tag)

5. **CSS Combinators**
   - Space (descendant): div input (input inside div)
   - > (child): div > input (direct child)
   - + (adjacent sibling): label + input
   - ~ (general sibling): label ~ input

6. **CSS Attribute Selectors**
   - [attribute^='value'] - starts with
   - [attribute$='value'] - ends with
   - [attribute*='value'] - contains

7. **CSS Pseudo-classes**
   - :first-child
   - :last-child
   - :nth-child(n)

8. **CSS vs XPath**
   - When to use each
   - Performance comparison
   - Capability differences

**Practice**: Create CSS selectors for same elements as XPath

---

#### Day 21: WebElement Interactions
##### Subtopics:
1. **WebElement Interface**
   - Represents HTML element
   - Returned by findElement()

2. **Typing Text**
   - sendKeys("text")
   - Simulates keyboard typing
   - Use with input fields
   - Keys class for special keys

3. **Clicking Elements**
   - click()
   - Works with buttons, links, checkboxes

4. **Clearing Text**
   - clear()
   - Clearing input fields
   - Use before sendKeys for clean input

5. **Getting Element Text**
   - getText()
   - Retrieves visible text
   - For assertions/verifications

6. **Getting Attributes**
   - getAttribute("attributeName")
   - Getting value, class, id, etc.
   - getAttribute("value") for input fields

7. **Element State Methods**
   - isDisplayed() - is element visible?
   - isEnabled() - is element enabled?
   - isSelected() - is checkbox/radio selected?

8. **Getting Element Properties**
   - getTagName()
   - getCssValue("property")
   - getSize(), getLocation()

**Practice**: Interact with various web elements

---

#### Day 22: Dropdowns & Checkboxes
##### Subtopics:
1. **Select Class**
   - Handling <select> dropdowns
   - Import: org.openqa.selenium.support.ui.Select
   - Creating Select object

2. **Selecting from Dropdown**
   - selectByVisibleText("text")
   - selectByValue("value attribute")
   - selectByIndex(index) - 0-based

3. **Getting Selected Option**
   - getFirstSelectedOption()
   - getAllSelectedOptions() - for multi-select

4. **Dropdown Verification**
   - getOptions() - all options
   - Verifying dropdown values

5. **Multi-Select Dropdowns**
   - isMultiple()
   - Selecting multiple options
   - deselectByVisibleText()
   - deselectAll()

6. **Checkboxes**
   - Finding checkbox element
   - click() to select/deselect
   - isSelected() to verify state

7. **Radio Buttons**
   - Similar to checkboxes
   - Only one can be selected in group
   - isSelected() verification

8. **Bootstrap/Custom Dropdowns**
   - Not using <select> tag
   - Using regular locators
   - Finding and clicking options

**Practice**: Automate forms with dropdowns, checkboxes, radio buttons

---

### Week 4: Intermediate Selenium

#### Day 23: Waits - Part 1
##### Subtopics:
1. **Synchronization Need**
   - Why waits are needed
   - Page load times
   - AJAX calls
   - Dynamic content

2. **Thread.sleep() Problems**
   - Fixed wait time
   - Slows down execution
   - Not recommended

3. **Implicit Wait**
   - driver.manage().timeouts().implicitlyWait()
   - Global setting for all elements
   - Waits for element to appear
   - Syntax: Duration.ofSeconds(10)

4. **Explicit Wait**
   - WebDriverWait class
   - Wait for specific conditions
   - More flexible than implicit

5. **WebDriverWait Setup**
   - Import: org.openqa.selenium.support.ui.WebDriverWait
   - Creating wait object
   - Setting timeout

6. **ExpectedConditions**
   - visibilityOfElementLocated()
   - presenceOfElementLocated()
   - elementToBeClickable()
   - titleContains()
   - urlContains()

7. **Using Explicit Wait**
   - wait.until(ExpectedConditions.condition())
   - Chaining with element interaction

**Practice**: Implement different wait strategies

---

#### Day 24: Waits - Part 2
##### Subtopics:
1. **More ExpectedConditions**
   - textToBePresentInElement()
   - invisibilityOfElement()
   - alertIsPresent()
   - frameToBeAvailableAndSwitchToIt()

2. **Fluent Wait**
   - Most flexible wait
   - Polling frequency
   - Ignoring specific exceptions
   - Custom wait conditions

3. **FluentWait Configuration**
   - withTimeout()
   - pollingEvery()
   - ignoring(Exception.class)
   - withMessage()

4. **Custom ExpectedConditions**
   - Creating custom wait conditions
   - Implementing complex waits

5. **Implicit vs Explicit vs Fluent**
   - Comparison
   - When to use each
   - Best practices

6. **Wait Best Practices**
   - Avoid implicit + explicit together
   - Use explicit waits
   - Appropriate timeouts
   - Meaningful error messages

**Practice**: Implement fluent waits and custom conditions

---

#### Day 25: Handling Alerts & Pop-ups
##### Subtopics:
1. **JavaScript Alerts Types**
   - alert() - OK button only
   - confirm() - OK and Cancel
   - prompt() - Text input field

2. **Alert Interface**
   - Switching to alert
   - driver.switchTo().alert()

3. **Alert Methods**
   - accept() - Click OK
   - dismiss() - Click Cancel
   - getText() - Get alert text
   - sendKeys("text") - Type in prompt

4. **Handling Simple Alert**
   - Wait for alert
   - Switch to alert
   - Get text and accept

5. **Handling Confirmation**
   - accept() or dismiss()
   - Verifying action result

6. **Handling Prompt**
   - sendKeys() for input
   - accept() or dismiss()

7. **Alert Exception Handling**
   - NoAlertPresentException
   - try-catch for safety

**Practice**: Handle different types of alerts

---

#### Day 26: Frames & Windows
##### Subtopics:
1. **Frames Introduction**
   - iframe, frame tags
   - Separate HTML documents
   - Cannot interact directly

2. **Switching to Frame**
   - By index: switchTo().frame(0)
   - By name/ID: switchTo().frame("frameName")
   - By WebElement: switchTo().frame(element)

3. **Switching Back**
   - defaultContent() - to main page
   - parentFrame() - to parent frame

4. **Nested Frames**
   - Multiple switchTo() calls
   - Navigating frame hierarchy

5. **Multiple Windows/Tabs**
   - Window handles
   - String getWindowHandle() - current
   - Set<String> getWindowHandles() - all

6. **Switching Between Windows**
   - Save parent window handle
   - Get all handles
   - Switch to specific window
   - Close and switch back

7. **Window Management**
   - Opening new window/tab
   - driver.switchTo().newWindow(WindowType.TAB)
   - driver.switchTo().newWindow(WindowType.WINDOW)

**Practice**: Navigate between frames and windows

---

#### Day 27: Actions Class
##### Subtopics:
1. **Actions Class Introduction**
   - Complex user interactions
   - Mouse and keyboard actions
   - Import: org.openqa.selenium.interactions.Actions

2. **Creating Actions Object**
   - Actions actions = new Actions(driver)

3. **Mouse Hover**
   - moveToElement(element)
   - Hovering over menus
   - build().perform()

4. **Drag and Drop**
   - dragAndDrop(source, target)
   - clickAndHold(), moveToElement(), release()

5. **Right Click**
   - contextClick(element)
   - Context menu

6. **Double Click**
   - doubleClick(element)

7. **Keyboard Actions**
   - keyDown(Keys.CONTROL)
   - keyUp(Keys.CONTROL)
   - sendKeys(Keys.ENTER)

8. **Combining Actions**
   - Method chaining
   - build() and perform()
   - Complex action sequences

**Practice**: Perform complex interactions with Actions class

---

#### Day 28: JavaScript Executor
##### Subtopics:
1. **JavascriptExecutor Interface**
   - Executing JavaScript code
   - Casting: (JavascriptExecutor) driver

2. **Scrolling Operations**
   - Scroll to bottom: window.scrollTo(0, document.body.scrollHeight)
   - Scroll to element: arguments[0].scrollIntoView(true)
   - Scroll by pixels

3. **Clicking Hidden Elements**
   - click() using JavaScript
   - arguments[0].click()
   - When normal click fails

4. **Handling Disabled Elements**
   - Sending keys to disabled fields
   - Removing disabled attribute

5. **Highlighting Elements**
   - Changing background color
   - Visual debugging

6. **Getting Element Properties**
   - Getting hidden element text
   - Retrieving internal properties

7. **Page Operations**
   - Refresh page
   - Get page title
   - Get URL

**Practice**: Use JavascriptExecutor for complex scenarios

---

#### Day 29: Screenshots & Browser Options
##### Subtopics:
1. **Taking Screenshots**
   - TakesScreenshot interface
   - Casting driver
   - getScreenshotAs(OutputType.FILE)

2. **Saving Screenshots**
   - FileUtils.copyFile()
   - Unique filenames with timestamps

3. **Screenshot on Failure**
   - try-catch approach
   - Capturing when test fails

4. **Element Screenshots**
   - getScreenshotAs() on WebElement
   - Capturing specific elements

5. **ChromeOptions**
   - Creating ChromeOptions object
   - Passing to ChromeDriver

6. **Common Chrome Options**
   - Headless mode: --headless
   - Window size: --window-size=1920,1080
   - Disable notifications: --disable-notifications
   - Start maximized: --start-maximized
   - Incognito: --incognito

7. **Firefox Options**
   - FirefoxOptions
   - Similar configurations

8. **Edge Options**
   - EdgeOptions
   - Browser-specific settings

**Practice**: Take screenshots and configure browser options

---

### Week 5: Framework Building Blocks

#### Day 30: TestNG Framework - Part 1
##### Subtopics:
1. **What is TestNG?**
   - Testing framework
   - Test organization and execution
   - Reporting

2. **TestNG Installation**
   - Maven dependency
   ```xml
   <dependency>
       <groupId>org.testng</groupId>
       <artifactId>testng</artifactId>
       <version>7.x.x</version>
   </dependency>
   ```

3. **@Test Annotation**
   - Marking test methods
   - public void methodName()
   - No main method needed

4. **Running Tests**
   - Run as TestNG Test
   - Maven: mvn test

5. **TestNG Assertions**
   - Assert.assertEquals(actual, expected)
   - Assert.assertTrue(condition)
   - Assert.assertFalse(condition)
   - Assert.assertNotNull(object)
   - Hard assertions (stop on failure)

6. **Test Results**
   - test-output folder
   - index.html report
   - Console output

**Practice**: Convert Selenium scripts to TestNG tests

---

## PHASE 3: TEST AUTOMATION FRAMEWORK (Days 31-45)

### Week 6: TestNG Deep Dive

#### Day 31: TestNG - Part 2
##### Subtopics:
1. **Setup and Teardown Annotations**
   - Execution order importance

2. **@BeforeMethod / @AfterMethod**
   - Run before/after each @Test
   - Browser setup and cleanup

3. **@BeforeClass / @AfterClass**
   - Run once per class
   - One-time setup

4. **@BeforeTest / @AfterTest**
   - Related to <test> tag in XML

5. **@BeforeSuite / @AfterSuite**
   - Run once per suite
   - Global setup

6. **Annotations Hierarchy**
   - Execution order:
   ```
   @BeforeSuite
   @BeforeTest
   @BeforeClass
   @BeforeMethod
   @Test
   @AfterMethod
   @AfterClass
   @AfterTest
   @AfterSuite
   ```

**Practice**: Use setup and teardown methods in tests

---

#### Day 32: TestNG - Part 3
##### Subtopics:
1. **Test Prioritization**
   - @Test(priority = 1)
   - Execution order control
   - Default priority is 0

2. **Enabling/Disabling Tests**
   - @Test(enabled = false)
   - Temporarily skip tests

3. **Test Dependencies**
   - @Test(dependsOnMethods = {"testLogin"})
   - Execution flow control
   - Skip dependent tests on failure

4. **Test Grouping**
   - @Test(groups = {"smoke", "regression"})
   - Multiple groups per test
   - Running specific groups

5. **Including/Excluding Groups**
   - In testng.xml
   - <groups><run><include name="smoke"/></run></groups>

6. **Test Description**
   - @Test(description = "Verify login functionality")
   - Better reporting

**Practice**: Organize and prioritize tests

---

#### Day 33: TestNG - Part 4
##### Subtopics:
1. **Parameters from testng.xml**
   - @Parameters annotation
   - Passing parameters to tests
   - <parameter name="browser" value="chrome"/>

2. **DataProvider**
   - @DataProvider annotation
   - Data-driven testing
   - Returning Object[][]

3. **Using DataProvider**
   - @Test(dataProvider = "loginData")
   - Multiple sets of test data
   - Iterating through data

4. **DataProvider from External Source**
   - Reading from Excel
   - Reading from database

5. **Parallel Execution**
   - Suite level: parallel="tests"
   - Test level: parallel="methods"
   - Class level: parallel="classes"
   - thread-count attribute

6. **Parallel Execution Considerations**
   - Thread safety
   - WebDriver instance per thread
   - Synchronization issues

**Practice**: Implement data-driven tests

---

#### Day 34: TestNG - Part 5
##### Subtopics:
1. **TestNG Assertions Deep Dive**
   - All assertion methods
   - Custom error messages

2. **Soft Assertions**
   - SoftAssert class
   - Continue on assertion failure
   - assertAll() at the end

3. **When to Use Soft vs Hard**
   - Hard: Critical validations
   - Soft: Multiple validations

4. **testng.xml Configuration**
   - Suite structure
   - Multiple tests
   - Including/excluding packages
   - Preserving order

5. **Test Suite Organization**
   - Smoke test suite
   - Regression test suite
   - Module-wise suites

6. **TestNG Listeners**
   - ITestListener introduction
   - onStart, onFinish
   - onTestSuccess, onTestFailure

**Practice**: Create comprehensive test suites

---

#### Day 35: Page Object Model - Part 1
##### Subtopics:
1. **What is POM?**
   - Design pattern for Selenium
   - Separating page elements from tests
   - Each page = one class

2. **POM Benefits**
   - Code reusability
   - Easy maintenance
   - Readability
   - Reduced code duplication

3. **Creating Page Classes**
   - One class per page
   - Store locators as variables
   - Action methods

4. **@FindBy Annotation**
   - Declaring web elements
   - @FindBy(id = "username")
   - @FindBy(xpath = "//button[@id='login']")

5. **PageFactory Class**
   - Initializing elements
   - PageFactory.initElements(driver, this)
   - In constructor

6. **Example Page Class Structure**
   ```java
   public class LoginPage {
       WebDriver driver;

       @FindBy(id = "username")
       WebElement usernameField;

       public LoginPage(WebDriver driver) {
           this.driver = driver;
           PageFactory.initElements(driver, this);
       }

       public void login(String user, String pass) {
           usernameField.sendKeys(user);
           // ...
       }
   }
   ```

**Practice**: Convert tests to use Page Object Model

---

#### Day 36: Page Object Model - Part 2
##### Subtopics:
1. **Base Page Class**
   - Common methods for all pages
   - Wait methods
   - Common actions
   - Constructor with driver

2. **Page Inheritance**
   - Pages extending BasePage
   - Inheriting common methods

3. **Page Component Pattern**
   - Reusable components (header, footer)
   - Component classes
   - Using in multiple pages

4. **Page Object Best Practices**
   - Return page objects from methods
   - Method chaining
   - Meaningful method names
   - Keep tests clean and readable

5. **Organizing Page Objects**
   - Package structure
   - pages/ folder
   - Naming conventions: LoginPage, HomePage

6. **Using Page Objects in Tests**
   - Creating page instances
   - Calling page methods
   - Test readability

**Practice**: Build page object hierarchy

---

#### Day 37: Reading External Data
##### Subtopics:
1. **Properties File Reader**
   - config.properties
   - FileInputStream
   - Properties class
   - Reading key-value pairs

2. **ConfigReader Utility**
   - Singleton pattern
   - getProperty(key) method
   - Loading properties once

3. **Excel File Reading**
   - Apache POI library
   - Maven dependencies: poi, poi-ooxml
   - Workbook, Sheet, Row, Cell

4. **Reading Excel Data**
   - FileInputStream
   - XSSFWorkbook (xlsx)
   - Iterating rows and cells
   - Getting cell values

5. **ExcelReader Utility**
   - getCellData(sheet, row, col)
   - getRowCount(sheet)
   - Reusable methods

6. **Data-Driven from Excel**
   - Reading test data
   - Passing to tests
   - DataProvider with Excel

7. **JSON File Reading (Optional)**
   - JSONParser
   - JSONObject
   - Reading JSON data

**Practice**: Externalize all test data

---

### Week 7: Framework Enhancement

#### Day 38: Logging & Reporting - Part 1
##### Subtopics:
1. **Why Logging?**
   - Debug information
   - Track test execution
   - Error investigation

2. **Log4j Setup**
   - Maven dependency
   - log4j2.xml configuration
   - Logger instantiation

3. **Logging Levels**
   - TRACE - finest detail
   - DEBUG - debug info
   - INFO - general info
   - WARN - warnings
   - ERROR - errors
   - FATAL - critical errors

4. **Using Logger**
   - logger.info("Test started")
   - logger.error("Element not found")
   - logger.debug("Debug information")

5. **Log Configuration**
   - Console appender
   - File appender
   - Log file location
   - Log pattern format

6. **Logging Best Practices**
   - What to log
   - Appropriate levels
   - Meaningful messages

**Practice**: Add logging to framework

---

#### Day 39: Logging & Reporting - Part 2
##### Subtopics:
1. **TestNG Reports**
   - Default HTML reports
   - test-output/index.html
   - emailable-report.html

2. **Extent Reports Setup**
   - Maven dependency
   - ExtentReports class
   - ExtentTest class
   - ExtentSparkReporter

3. **Creating Extent Reports**
   - Initialize in @BeforeSuite
   - Create test in @BeforeMethod
   - Log steps: test.log()
   - Flush in @AfterSuite

4. **Extent Report Features**
   - Test status
   - Pass/Fail/Skip
   - Execution time
   - Categories/tags

5. **Adding Screenshots to Reports**
   - On failure
   - test.addScreenCaptureFromPath()
   - Embedding in report

6. **Custom Report Configuration**
   - Report title
   - Report name
   - Document title
   - Theme (dark/light)

**Practice**: Generate comprehensive Extent Reports

---

#### Day 40: Configuration Management
##### Subtopics:
1. **Centralized Configuration**
   - config.properties file
   - All configurable values

2. **Configuration Parameters**
   - browser type
   - base URL
   - timeout values
   - test environment (dev/qa/prod)

3. **ConfigReader Class**
   - Singleton implementation
   - Load properties once
   - Getter methods

4. **Environment-Specific Configs**
   - config-dev.properties
   - config-qa.properties
   - config-prod.properties
   - Loading based on parameter

5. **Browser Factory Pattern**
   - Browser selection logic
   - Switch-case for browsers
   - Returning WebDriver

6. **Driver Manager**
   - Creating driver instance
   - Browser setup
   - Options configuration
   - Returning configured driver

**Practice**: Centralize all configurations

---

#### Day 41: Utility Classes
##### Subtopics:
1. **Screenshot Utility**
   - captureScreenshot(driver, testName)
   - Saving with timestamp
   - Returning file path

2. **Wait Utility**
   - waitForElement(element, timeout)
   - waitForElementToBeClickable()
   - waitForAlert()
   - Reusable wait methods

3. **Excel Utility**
   - Read and write Excel
   - getCellData()
   - setCellData()
   - Row and column operations

4. **Common Actions Utility**
   - clickElement()
   - enterText()
   - selectDropdown()
   - Reusable element interactions

5. **Date Time Utility**
   - Getting current timestamp
   - Formatting dates
   - For unique filenames

6. **Random Data Generator**
   - Random email
   - Random phone
   - Random names
   - For test data

**Practice**: Build comprehensive utility framework

---

#### Day 42: Exception Handling in Framework
##### Subtopics:
1. **Custom Exceptions**
   - FrameworkException class
   - ElementNotFoundException
   - ConfigurationException

2. **Exception Handling Strategy**
   - Where to catch
   - Where to throw
   - Logging exceptions

3. **Try-Catch in Utilities**
   - File operations
   - Element interactions
   - Proper error messages

4. **Test Exception Handling**
   - Catching in test methods
   - Failing tests gracefully
   - Logging failure reason

5. **Global Exception Handler**
   - TestNG ITestListener
   - onTestFailure method
   - Screenshot on exception
   - Logging exception

**Practice**: Add robust exception handling

---

### Week 8: Advanced Topics & Project

#### Day 43: Cross-Browser Testing
##### Subtopics:
1. **Browser Factory Implementation**
   - Method to create driver
   - Parameter: browser name
   - Switch case logic

2. **Browser Enum**
   - CHROME, FIREFOX, EDGE
   - Better than strings

3. **Browser-Specific Options**
   - ChromeOptions
   - FirefoxOptions
   - EdgeOptions
   - Setting for each browser

4. **TestNG Parameters**
   - <parameter name="browser" value="chrome"/>
   - @Parameters("browser")
   - Passing to driver creation

5. **Parallel Browser Execution**
   - ThreadLocal<WebDriver>
   - Thread-safe driver
   - Parallel test execution

6. **Browser Configuration**
   - From properties file
   - Command line parameter
   - Default browser

**Practice**: Execute tests on multiple browsers

---

#### Day 44: Framework Best Practices
##### Subtopics:
1. **Code Organization**
   - Proper package structure
   - Separation of concerns
   - pages/, tests/, utils/, base/

2. **Naming Conventions**
   - Classes: PascalCase
   - Methods: camelCase
   - Test methods: descriptive names
   - Page classes: PageNamePage

3. **SOLID Principles**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

4. **Don't Repeat Yourself (DRY)**
   - Reusable methods
   - Avoid code duplication
   - Utility classes

5. **Test Independence**
   - Tests should not depend on each other
   - Each test should setup/cleanup
   - No shared state

6. **Framework Scalability**
   - Easy to add new tests
   - Easy to maintain
   - Modular design

7. **Code Review Checklist**
   - Naming standards
   - Exception handling
   - Wait strategies
   - Code duplication
   - Test readability

**Practice**: Refactor existing code following best practices

---

#### Day 45: Final Capstone Project
##### Project: Complete E-commerce Test Automation Framework

**Application**: Demo e-commerce website

**Test Scenarios (15-20 test cases)**:

1. **User Registration Module**
   - Valid registration
   - Invalid email format
   - Duplicate email
   - Missing required fields

2. **Login Module**
   - Valid login
   - Invalid username
   - Invalid password
   - Logout functionality

3. **Product Search Module**
   - Search with valid keyword
   - Search with invalid keyword
   - Search filters
   - Product sorting

4. **Add to Cart Module**
   - Add single product
   - Add multiple products
   - Update quantity
   - Remove from cart

5. **Checkout Process**
   - Complete purchase
   - Apply coupon code
   - Payment validation
   - Order confirmation

**Framework Requirements**:

1. **Project Structure**
   ```
   src/main/java/
   ├── pages/
   │   ├── BasePage.java
   │   ├── LoginPage.java
   │   ├── HomePage.java
   │   ├── ProductPage.java
   │   └── CheckoutPage.java
   ├── utils/
   │   ├── DriverFactory.java
   │   ├── ConfigReader.java
   │   ├── ExcelReader.java
   │   ├── ScreenshotUtil.java
   │   └── WaitUtil.java
   ├── base/
   │   └── BaseTest.java
   └── config/
       └── Config.java

   src/test/java/
   ├── tests/
   │   ├── LoginTests.java
   │   ├── SearchTests.java
   │   ├── CartTests.java
   │   └── CheckoutTests.java
   └── testng.xml

   src/test/resources/
   ├── config.properties
   ├── testdata.xlsx
   └── log4j2.xml
   ```

2. **Technical Implementation**
   - Page Object Model with @FindBy
   - PageFactory for initialization
   - BaseTest with setup/teardown
   - TestNG for test organization
   - Data-driven from Excel
   - Properties file for configuration
   - Log4j for logging
   - Extent Reports for reporting
   - Cross-browser capability
   - Exception handling
   - Screenshot on failure
   - Reusable utility methods

3. **Test Execution**
   - testng.xml with multiple suites
   - Smoke test suite
   - Regression test suite
   - Ability to run specific modules

4. **Reporting**
   - Extent Report with:
     - Test steps logged
     - Screenshots on failure
     - Pass/Fail status
     - Execution time

5. **Documentation**
   - README.md with:
     - Project description
     - Setup instructions
     - How to run tests
     - Framework architecture
     - Technologies used
     - Test scenarios covered

**Deliverables**:
- Complete framework code
- 15-20 working test cases
- Extent Report generated
- Log files
- README documentation
- Code pushed to GitHub

**Evaluation Criteria** (100 points):
- Framework structure (20)
- POM implementation (15)
- Test coverage (15)
- Code quality (15)
- Reporting (10)
- Exception handling (10)
- Configuration management (5)
- Documentation (10)

---

## Appendix: Quick Reference

### Selenium WebDriver Commands
```java
// Browser operations
driver.get(url);
driver.navigate().to(url);
driver.getCurrentUrl();
driver.getTitle();
driver.quit();
driver.close();

// Finding elements
driver.findElement(By.id("id"));
driver.findElements(By.className("class"));

// Element interactions
element.sendKeys("text");
element.click();
element.clear();
element.getText();
element.getAttribute("attribute");
element.isDisplayed();
element.isEnabled();
element.isSelected();

// Waits
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("id")));

// Alerts
driver.switchTo().alert().accept();
driver.switchTo().alert().dismiss();
driver.switchTo().alert().getText();

// Frames
driver.switchTo().frame("frameName");
driver.switchTo().defaultContent();

// Windows
String handle = driver.getWindowHandle();
Set<String> handles = driver.getWindowHandles();
driver.switchTo().window(handle);

// Actions
Actions actions = new Actions(driver);
actions.moveToElement(element).perform();
actions.dragAndDrop(source, target).perform();

// JavaScript
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("script", arguments);

// Screenshots
TakesScreenshot ts = (TakesScreenshot) driver;
File file = ts.getScreenshotAs(OutputType.FILE);
```

### TestNG Annotations
```java
@BeforeSuite
@BeforeTest
@BeforeClass
@BeforeMethod
@Test
@AfterMethod
@AfterClass
@AfterTest
@AfterSuite

@Test(priority = 1)
@Test(enabled = false)
@Test(dependsOnMethods = {"test1"})
@Test(groups = {"smoke"})
@Test(dataProvider = "data")
@Parameters("browser")
@DataProvider
```

### Maven Dependencies
```xml
<!-- Selenium -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.x.x</version>
</dependency>

<!-- TestNG -->
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.x.x</version>
</dependency>

<!-- WebDriverManager -->
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.x.x</version>
</dependency>

<!-- Apache POI for Excel -->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.x.x</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.x.x</version>
</dependency>

<!-- Extent Reports -->
<dependency>
    <groupId>com.aventstack</groupId>
    <artifactId>extentreports</artifactId>
    <version>5.x.x</version>
</dependency>

<!-- Log4j -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.x.x</version>
</dependency>
```

**Congratulations on completing the Java for Selenium Automation course!**
**You are now ready for QA Automation Engineer roles!**
