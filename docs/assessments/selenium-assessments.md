# Java for Selenium Automation - Daily Assessment Questions (Days 1-45)

## How to Use This Assessment Guide

### Daily Assessment Routine:
1. **Complete the day's learning** from the course material
2. **Take the assessment** WITHOUT looking at notes
3. **Time yourself**: 45-60 minutes per assessment
4. **Score yourself** honestly using the answer key

### Scoring System:
- **MCQs**: 2 points each
- **Short Answer**: 3 points each
- **Hands-on/Coding Problems**: 5 points each
- **Selenium Script Problems**: 7-10 points each

### Performance Benchmarks:
- **90-100%**: Excellent! Ready for next topic
- **75-89%**: Good. Minor review needed
- **60-74%**: Average. Review the day's topics
- **Below 60%**: Needs work. Re-study before moving on

---

# PHASE 1: JAVA ESSENTIALS (Days 1-15)

## Day 1: Setup & Java Basics for Automation

### Multiple Choice Questions (2 points each)

**Q1.** What is Maven primarily used for?
- A) Running Java programs
- B) Dependency management and build automation
- C) Writing Java code
- D) Testing frameworks

**Q2.** Which file contains Maven project configuration?
- A) build.xml
- B) pom.xml
- C) config.xml
- D) maven.xml

**Q3.** What is the entry point of a Java application?
- A) start() method
- B) init() method
- C) main() method
- D) run() method

**Q4.** Which command verifies Java installation?
- A) java --version
- B) java -v
- C) java -version
- D) java --check

**Q5.** What does JAVA_HOME environment variable point to?
- A) Java source files
- B) JDK installation directory
- C) Java projects directory
- D) JRE only

### Short Answer Questions (3 points each)

**Q6.** Explain the difference between JDK, JRE, and JVM in the context of Selenium automation.

**Q7.** Why do we use Maven for Selenium projects instead of adding JAR files manually?

**Q8.** What are the three main components of the main method signature? Explain each.

### Hands-on Problems (5 points each)

**Q9.** Create a Maven project structure for a Selenium automation project with appropriate groupId, artifactId, and version.

**Q10.** Write a Java program that prints "Welcome to Selenium Automation!" and displays the current system username.

**Total Points: 37**

---

## Day 2: Operators & Control Structures

### Multiple Choice Questions (2 points each)

**Q1.** Which operator is used to check if two strings are equal in content?
- A) ==
- B) !=
- C) equals()
- D) Both A and C

**Q2.** In automation, which loop is best for iterating through a fixed number of test cases?
- A) while loop
- B) do-while loop
- C) for loop
- D) All are same

**Q3.** What is the output: `System.out.println(10 > 5 && 3 < 2);`
- A) true
- B) false
- C) 1
- D) Compilation error

**Q4.** Which statement would you use to select a browser based on user input?
- A) if-else
- B) switch-case
- C) for loop
- D) Both A and B

**Q5.** What does the continue statement do in a loop?
- A) Exits the loop
- B) Skips to the next iteration
- C) Restarts the loop
- D) Does nothing

### Short Answer Questions (3 points each)

**Q6.** Explain a scenario in test automation where you would use an if-else statement.

**Q7.** Why is the enhanced for loop useful when working with collections of web elements?

### Hands-on Problems (5 points each)

**Q8.** Write a program using switch-case to select browser type: "chrome", "firefox", or "edge", and print an appropriate message.

**Q9.** Write a program to iterate through an array of test URLs and print each URL with its index number.

**Q10.** Write a program that checks if a given test status (PASS/FAIL) matches expected status and prints appropriate message.

**Total Points: 37**

---

## Day 3: Arrays & Strings

### Multiple Choice Questions (2 points each)

**Q1.** Which method checks if a string contains a substring?
- A) includes()
- B) has()
- C) contains()
- D) indexOf()

**Q2.** What is the correct way to compare two strings for equality?
- A) str1 == str2
- B) str1.equals(str2)
- C) str1 = str2
- D) compare(str1, str2)

**Q3.** Which method removes whitespace from both ends of a string?
- A) trim()
- B) strip()
- C) remove()
- D) clean()

**Q4.** How do you get the length of an array?
- A) array.length()
- B) array.length
- C) array.size()
- D) length(array)

**Q5.** Are Strings mutable in Java?
- A) Yes
- B) No
- C) Sometimes
- D) Depends on declaration

**Q6.** Which class should you use for frequent string modifications?
- A) String
- B) StringBuilder
- C) StringBuffer
- D) Both B and C

### Short Answer Questions (3 points each)

**Q7.** Why is string comparison using .equals() important in Selenium automation? Give an example scenario.

**Q8.** Explain when you would use the split() method in test automation.

### Hands-on Problems (5 points each)

**Q9.** Write a program to check if a given email address contains "@" and ends with ".com".

**Q10.** Write a program that stores 5 test URLs in an array and prints only the URLs containing "qa" in them.

**Q11.** Write a program to extract the domain name from a URL string (e.g., "https://www.google.com" → "google").

**Total Points: 41**

---

## Day 5: OOP Part 1 - Classes & Objects

### Multiple Choice Questions (2 points each)

**Q1.** What is a class?
- A) A function
- B) A blueprint for creating objects
- C) A variable
- D) A loop

**Q2.** In Page Object Model, what does each page class represent?
- A) A test case
- B) A web page
- C) A browser
- D) A locator

**Q3.** Which keyword is used to create an object?
- A) create
- B) new
- C) object
- D) make

**Q4.** What does 'this' keyword refer to?
- A) Parent class
- B) Current object
- C) Next object
- D) Previous object

### Short Answer Questions (3 points each)

**Q5.** Explain why we use classes and objects in Selenium automation framework.

**Q6.** What is the purpose of a constructor in a Page Object class?

**Q7.** How does creating a LoginPage class help in automation?

### Hands-on Problems (7 points each)

**Q8.** Create a TestData class with fields: username, password, expectedResult. Include a constructor and a method to display the data.

**Q9.** Create a simple LoginPage class with fields for username and password locators (as Strings). Include a method login(String user, String pass) that prints the login action.

**Total Points: 35**

---

## Day 10: Exception Handling

### Multiple Choice Questions (2 points each)

**Q1.** Which exception is thrown when an element is not found in Selenium?
- A) ElementException
- B) NoSuchElementException
- C) NotFoundException
- D) ElementNotFoundException

**Q2.** What is the purpose of the finally block?
- A) Handle exceptions
- B) Always executes (cleanup code)
- C) Throw exceptions
- D) Catch exceptions

**Q3.** Which keyword is used to manually throw an exception?
- A) throws
- B) throw
- C) try
- D) catch

**Q4.** What happens if an exception is not caught?
- A) Program continues
- B) Program terminates abruptly
- C) Exception is ignored
- D) Warning is shown

**Q5.** Which is a checked exception?
- A) NullPointerException
- B) ArithmeticException
- C) IOException
- D) ArrayIndexOutOfBoundsException

### Short Answer Questions (3 points each)

**Q6.** Explain why exception handling is critical in Selenium automation.

**Q7.** What is the difference between NoSuchElementException and TimeoutException?

**Q8.** When should you create custom exceptions in your automation framework?

### Hands-on Problems (7 points each)

**Q9.** Write code to handle NoSuchElementException when finding an element, with appropriate error message.

**Q10.** Create a custom exception class called InvalidTestDataException and demonstrate its usage.

**Total Points: 37**

---

# PHASE 2: SELENIUM WEBDRIVER (Days 16-30)

## Day 16: Selenium Introduction & Setup

### Multiple Choice Questions (2 points each)

**Q1.** What is Selenium WebDriver?
- A) A testing framework
- B) A browser automation library
- C) An IDE
- D) A programming language

**Q2.** Which of these is NOT a component of Selenium?
- A) Selenium IDE
- B) Selenium WebDriver
- C) Selenium Grid
- D) Selenium Runner

**Q3.** What is WebDriverManager used for?
- A) Creating WebDriver instances
- B) Automatic browser driver management
- C) Managing test cases
- D) Creating web pages

**Q4.** Why is WebDriver an interface?
- A) To make it complex
- B) To provide flexibility and polymorphism
- C) It's not an interface
- D) To slow down execution

### Short Answer Questions (3 points each)

**Q5.** Explain the Selenium WebDriver architecture with the four main components.

**Q6.** Why do we need browser drivers (ChromeDriver, GeckoDriver)?

**Q7.** What are the advantages of WebDriver over Selenium RC?

### Hands-on Problems (10 points each)

**Q8.** Add Selenium and WebDriverManager dependencies to a Maven pom.xml file with appropriate versions.

**Q9.** Write the import statements needed for a basic Selenium script using ChromeDriver.

**Total Points: 37**

---

## Day 17: First Selenium Script

### Multiple Choice Questions (2 points each)

**Q1.** Which method opens a URL in the browser?
- A) open(url)
- B) navigate(url)
- C) get(url)
- D) goTo(url)

**Q2.** What is the difference between close() and quit()?
- A) No difference
- B) close() closes current window, quit() closes all windows
- C) quit() closes current window, close() closes all windows
- D) Both are same

**Q3.** Which method returns the current page title?
- A) getTitle()
- B) title()
- C) pageTitle()
- D) getCurrentTitle()

**Q4.** How do you maximize the browser window?
- A) driver.maximize()
- B) driver.window().maximize()
- C) driver.manage().window().maximize()
- D) driver.setMaximize()

### Short Answer Questions (3 points each)

**Q5.** Explain the difference between driver.get() and driver.navigate().to().

**Q6.** When should you use quit() instead of close()?

### Hands-on Problems (10 points each)

**Q7.** Write a complete Selenium script that:
- Opens Chrome browser
- Navigates to "https://www.google.com"
- Prints the page title
- Maximizes the window
- Closes the browser

**Q8.** Write a script that opens a website, goes back, then forward, then refreshes the page.

**Total Points: 40**

---

## Day 18: Locators - Part 1

### Multiple Choice Questions (2 points each)

**Q1.** Which locator is the fastest and most reliable?
- A) XPath
- B) CSS Selector
- C) ID
- D) Class Name

**Q2.** What does findElements() return?
- A) WebElement
- B) List<WebElement>
- C) Array
- D) String

**Q3.** Which locator is used only for links?
- A) linkText
- B) partialLinkText
- C) Both A and B
- D) tagName

**Q4.** What happens if findElement() doesn't find an element?
- A) Returns null
- B) Returns empty WebElement
- C) Throws NoSuchElementException
- D) Waits indefinitely

**Q5.** Which method finds multiple elements?
- A) findElement()
- B) findElements()
- C) getElements()
- D) locateElements()

### Short Answer Questions (3 points each)

**Q6.** Explain when you would use findElements() instead of findElement().

**Q7.** What is the priority order of locators from best to worst and why?

**Q8.** Why is using className tricky with compound classes?

### Hands-on Problems (10 points each)

**Q9.** Given this HTML:
```html
<input id="username" name="user" class="input-field" type="text">
```
Write code to find this element using:
- ID
- Name
- ClassName

**Q10.** Write a script that finds all links on a page and prints their count and text.

**Total Points: 45**

---

## Day 19: Locators - Part 2 (XPath)

### Multiple Choice Questions (2 points each)

**Q1.** What does // mean in XPath?
- A) Root node
- B) Current node
- C) Selects nodes anywhere in the document
- D) Comment

**Q2.** Which XPath finds an input with id='email'?
- A) //input[@id='email']
- B) //input[id='email']
- C) //input#email
- D) //input.email

**Q3.** What does the text() function do in XPath?
- A) Gets element text
- B) Matches element by text content
- C) Converts to text
- D) Finds text nodes

**Q4.** Which XPath function checks if an attribute contains a value?
- A) has()
- B) includes()
- C) contains()
- D) match()

**Q5.** What is the difference between / and // in XPath?
- A) No difference
- B) / selects direct children, // selects descendants
- C) // selects direct children, / selects descendants
- D) Both are same

### Short Answer Questions (3 points each)

**Q6.** Explain why relative XPath is preferred over absolute XPath.

**Q7.** When would you use contains() function in XPath?

**Q8.** What are XPath axes? Name three and explain their use.

### Hands-on Problems (10 points each)

**Q9.** Write XPath for these scenarios:
- Button with text "Submit"
- Input where placeholder contains "Email"
- Div with class starting with "error"

**Q10.** Given this HTML:
```html
<div class="form">
    <label>Username</label>
    <input type="text" name="user">
</div>
```
Write XPath to find the input that follows the label "Username".

**Total Points: 45**

---

## Day 21: WebElement Interactions

### Multiple Choice Questions (2 points each)

**Q1.** Which method types text into an input field?
- A) type()
- B) write()
- C) sendKeys()
- D) input()

**Q2.** How do you get the text of an element?
- A) text()
- B) getText()
- C) getElementText()
- D) readText()

**Q3.** Which method checks if an element is visible on the page?
- A) isVisible()
- B) isDisplayed()
- C) isShown()
- D) checkVisible()

**Q4.** How do you get the 'value' attribute of an input field?
- A) getValue()
- B) getAttribute("value")
- C) getProperty("value")
- D) value()

**Q5.** Which method clears text from an input field?
- A) clear()
- B) delete()
- C) remove()
- D) empty()

### Short Answer Questions (3 points each)

**Q6.** What is the difference between getText() and getAttribute("textContent")?

**Q7.** When should you use clear() before sendKeys()?

**Q8.** Explain the difference between isDisplayed(), isEnabled(), and isSelected().

### Hands-on Problems (10 points each)

**Q9.** Write a script that:
- Opens Google
- Finds the search box
- Types "Selenium WebDriver"
- Clicks search button
- Prints the page title

**Q10.** Write code to check if a checkbox is selected, and if not, select it.

**Total Points: 45**

---

## Day 23: Waits - Part 1

### Multiple Choice Questions (2 points each)

**Q1.** Why do we need waits in Selenium?
- A) To slow down tests
- B) For synchronization with page load/AJAX
- C) To make code complex
- D) No specific reason

**Q2.** Which is NOT a recommended wait strategy?
- A) Implicit wait
- B) Explicit wait
- C) Thread.sleep()
- D) Fluent wait

**Q3.** Where is implicit wait applied?
- A) For specific elements
- B) Globally for all elements
- C) Only for buttons
- D) Only for input fields

**Q4.** What is the purpose of ExpectedConditions?
- A) To expect failures
- B) To define wait conditions
- C) To create elements
- D) To handle exceptions

**Q5.** Which ExpectedCondition waits for an element to be clickable?
- A) elementToBeClickable()
- B) presenceOfElementLocated()
- C) visibilityOfElementLocated()
- D) waitForClick()

**Q6.** Can you use implicit and explicit waits together?
- A) Yes, recommended
- B) No, not recommended
- C) Yes, must use together
- D) No, it's not possible

### Short Answer Questions (3 points each)

**Q7.** Explain the difference between implicit wait and explicit wait.

**Q8.** Why is Thread.sleep() not recommended in automation?

**Q9.** When would you use visibilityOfElementLocated() vs presenceOfElementLocated()?

### Hands-on Problems (10 points each)

**Q10.** Write code to set an implicit wait of 10 seconds.

**Q11.** Write code using explicit wait to wait for a button with id="submit" to be clickable, with a timeout of 15 seconds.

**Q12.** Write code to wait for the page title to contain "Dashboard" using explicit wait.

**Total Points: 51**

---

## Day 25: Handling Alerts & Pop-ups

### Multiple Choice Questions (2 points each)

**Q1.** How do you switch to an alert?
- A) driver.alert()
- B) driver.switchTo().alert()
- C) driver.getAlert()
- D) Alert.switch()

**Q2.** Which method clicks OK on an alert?
- A) clickOK()
- B) accept()
- C) confirm()
- D) ok()

**Q3.** Which method clicks Cancel on a confirmation dialog?
- A) cancel()
- B) dismiss()
- C) reject()
- D) close()

**Q4.** How do you type text in a prompt alert?
- A) type("text")
- B) sendKeys("text")
- C) input("text")
- D) write("text")

**Q5.** What exception is thrown if you try to switch to a non-existent alert?
- A) NoAlertException
- B) NoAlertPresentException
- C) AlertNotFoundException
- D) InvalidAlertException

### Short Answer Questions (3 points each)

**Q6.** Explain the three types of JavaScript alerts and how to handle each.

**Q7.** Why do you need to switch to an alert before interacting with it?

### Hands-on Problems (10 points each)

**Q8.** Write code that:
- Waits for an alert to appear
- Gets the alert text
- Prints the text
- Accepts the alert

**Q9.** Write code to handle a prompt alert: send "Test User" and accept it.

**Total Points: 39**

---

## Day 26: Frames & Windows

### Multiple Choice Questions (2 points each)

**Q1.** How do you switch to a frame by index?
- A) driver.frame(0)
- B) driver.switchTo().frame(0)
- C) driver.goToFrame(0)
- D) switchFrame(0)

**Q2.** How do you switch back to the main page from a frame?
- A) driver.switchTo().mainContent()
- B) driver.switchTo().defaultContent()
- C) driver.switchTo().parent()
- D) driver.mainPage()

**Q3.** What does getWindowHandle() return?
- A) Window title
- B) Window URL
- C) Unique window ID
- D) Window count

**Q4.** What does getWindowHandles() return?
- A) String
- B) List<String>
- C) Set<String>
- D) Array

### Short Answer Questions (3 points each)

**Q5.** Explain why you need to switch to a frame before interacting with elements inside it.

**Q6.** Describe the steps to switch to a new window and then back to the parent window.

### Hands-on Problems (10 points each)

**Q7.** Write code to switch to a frame by name "contentFrame" and then back to main content.

**Q8.** Write code that:
- Saves the parent window handle
- Clicks a button that opens a new window
- Switches to the new window
- Performs actions in new window
- Closes new window
- Switches back to parent window

**Total Points: 38**

---

## Day 27: Actions Class

### Multiple Choice Questions (2 points each)

**Q1.** Which class handles complex user interactions?
- A) Interactions
- B) Actions
- C) UserActions
- D) WebActions

**Q2.** Which method performs a mouse hover?
- A) hover()
- B) mouseOver()
- C) moveToElement()
- D) hoverOn()

**Q3.** How do you execute Actions?
- A) execute()
- B) perform()
- C) run()
- D) build()

**Q4.** Which method performs right-click?
- A) rightClick()
- B) contextClick()
- C) secondaryClick()
- D) menuClick()

### Short Answer Questions (3 points each)

**Q5.** Why do we need the Actions class when we have click() and sendKeys()?

**Q6.** Explain the difference between build().perform() and just perform().

### Hands-on Problems (10 points each)

**Q7.** Write code to hover over a menu item and click a submenu that appears.

**Q8.** Write code to perform drag and drop from sourceElement to targetElement.

**Q9.** Write code to hold CTRL key and click multiple elements (for multi-select).

**Total Points: 42**

---

## Day 30: TestNG Framework - Part 1

### Multiple Choice Questions (2 points each)

**Q1.** What annotation marks a method as a test?
- A) @TestMethod
- B) @Test
- C) @TestCase
- D) @TestMethod

**Q2.** Which class contains assertion methods?
- A) Test
- B) Assert
- C) Verify
- D) Check

**Q3.** What happens when an assertion fails?
- A) Test continues
- B) Test stops immediately
- C) Warning is shown
- D) Nothing happens

**Q4.** How do you assert that two values are equal?
- A) Assert.equal(actual, expected)
- B) Assert.assertEquals(actual, expected)
- C) assertEquals(actual, expected)
- D) Both B and C

**Q5.** Where are TestNG reports generated?
- A) reports/
- B) test-output/
- C) target/
- D) test-reports/

### Short Answer Questions (3 points each)

**Q6.** Why do we use TestNG instead of writing plain Selenium scripts?

**Q7.** What is the difference between assertEquals() and assertTrue()?

**Q8.** Explain the purpose of the @Test annotation.

### Hands-on Problems (10 points each)

**Q9.** Convert a Selenium script to TestNG test with proper annotations and assertions.

**Q10.** Write a TestNG test that verifies a page title using assertion.

**Total Points: 45**

---

# PHASE 3: FRAMEWORK BUILDING (Days 31-45)

## Day 31: TestNG - Part 2

### Multiple Choice Questions (2 points each)

**Q1.** Which annotation runs before each test method?
- A) @BeforeTest
- B) @BeforeMethod
- C) @Before
- D) @Setup

**Q2.** Which annotation runs once before all tests in a class?
- A) @BeforeClass
- B) @BeforeAll
- C) @BeforeTests
- D) @SetupClass

**Q3.** What is the execution order: @BeforeClass, @BeforeMethod, @Test?
- A) @Test, @BeforeMethod, @BeforeClass
- B) @BeforeMethod, @BeforeClass, @Test
- C) @BeforeClass, @BeforeMethod, @Test
- D) @BeforeClass, @Test, @BeforeMethod

**Q4.** Where should you typically initialize WebDriver?
- A) @BeforeMethod
- B) @BeforeClass
- C) @Test
- D) Both A and B are valid

### Short Answer Questions (3 points each)

**Q5.** Explain why we use @BeforeMethod and @AfterMethod for browser setup/teardown.

**Q6.** What is the difference between @BeforeClass and @BeforeMethod?

### Hands-on Problems (10 points each)

**Q7.** Create a BaseTest class with:
- @BeforeMethod to initialize ChromeDriver
- @AfterMethod to quit driver

**Q8.** Write a test class that extends BaseTest and contains two @Test methods.

**Total Points: 38**

---

## Day 33: TestNG - Part 4 (Data-Driven Testing)

### Multiple Choice Questions (2 points each)

**Q1.** Which annotation is used for data-driven testing?
- A) @Data
- B) @DataProvider
- C) @TestData
- D) @DataSet

**Q2.** What does a DataProvider method return?
- A) Object
- B) Object[]
- C) Object[][]
- D) List<Object>

**Q3.** How do you link a test to a DataProvider?
- A) @Test(dataProvider="name")
- B) @Test(data="name")
- C) @Test(provider="name")
- D) @DataProvider(test="name")

### Short Answer Questions (3 points each)

**Q4.** Why is data-driven testing important in automation?

**Q5.** Explain how DataProvider works with @Test methods.

### Hands-on Problems (10 points each)

**Q6.** Create a DataProvider that provides 3 sets of login credentials (username, password).

**Q7.** Write a login test that uses the DataProvider from Q6 to test multiple credentials.

**Q8.** Create a DataProvider that reads test data from an ArrayList.

**Total Points: 38**

---

## Day 35: Page Object Model - Part 1

### Multiple Choice Questions (2 points each)

**Q1.** What is the main benefit of Page Object Model?
- A) Faster execution
- B) Easy maintenance and reusability
- C) Fewer lines of code
- D) Better performance

**Q2.** In POM, where should locators be stored?
- A) In test classes
- B) In page classes
- C) In utility classes
- D) In configuration files

**Q3.** Which annotation is used to declare web elements in POM?
- A) @Element
- B) @WebElement
- C) @FindBy
- D) @Locator

**Q4.** Which class initializes @FindBy elements?
- A) ElementFactory
- B) PageFactory
- C) WebElementFactory
- D) DriverFactory

**Q5.** What should a page class constructor typically do?
- A) Find elements
- B) Initialize driver and elements
- C) Perform actions
- D) Run tests

### Short Answer Questions (3 points each)

**Q6.** Explain the Page Object Model pattern and its advantages.

**Q7.** Why do we use @FindBy annotation instead of driver.findElement() in page classes?

**Q8.** What is the role of PageFactory.initElements()?

### Hands-on Problems (10 points each)

**Q9.** Create a LoginPage class with:
- WebDriver field
- @FindBy for username, password, and login button
- Constructor using PageFactory
- login(user, pass) method

**Q10.** Create a test class that uses the LoginPage from Q9 to perform a login action.

**Total Points: 49**

---

## Day 40: Configuration Management

### Multiple Choice Questions (2 points each)

**Q1.** What file format is commonly used for configuration?
- A) .txt
- B) .properties
- C) .config
- D) .settings

**Q2.** Which class reads properties files?
- A) PropertyReader
- B) Properties
- C) FileReader
- D) ConfigReader

**Q3.** What pattern is best for ConfigReader class?
- A) Factory
- B) Singleton
- C) Builder
- D) Observer

### Short Answer Questions (3 points each)

**Q4.** Why should configuration values be externalized to properties file?

**Q5.** What kind of values should be stored in config.properties?

### Hands-on Problems (10 points each)

**Q6.** Create a config.properties file with: browser, url, timeout, environment.

**Q7.** Create a ConfigReader class that reads the config.properties file.

**Q8.** Modify your driver initialization to use browser value from config.properties.

**Total Points: 37**

---

## Day 45: Final Capstone Project Assessment

### Project Evaluation Rubric

#### 1. Project Setup & Structure (15 points)
- [ ] Maven project with correct dependencies (3 points)
- [ ] Proper package structure (pages/, tests/, utils/, base/) (4 points)
- [ ] config.properties file present (2 points)
- [ ] testng.xml configured correctly (3 points)
- [ ] README.md with instructions (3 points)

#### 2. Page Object Model Implementation (20 points)
- [ ] All pages follow POM pattern (5 points)
- [ ] @FindBy annotations used correctly (5 points)
- [ ] PageFactory initialization in constructors (3 points)
- [ ] BasePage with common methods (4 points)
- [ ] Proper method names and return types (3 points)

#### 3. Test Cases (20 points)
- [ ] 15-20 test cases created (5 points)
- [ ] Tests are independent (3 points)
- [ ] Proper use of assertions (4 points)
- [ ] Good test method names (2 points)
- [ ] All scenarios covered (6 points)

#### 4. TestNG Implementation (10 points)
- [ ] @BeforeMethod and @AfterMethod used (3 points)
- [ ] Test groups defined (2 points)
- [ ] Test prioritization where needed (2 points)
- [ ] DataProvider for data-driven tests (3 points)

#### 5. Wait Strategy (5 points)
- [ ] Implicit wait set appropriately (1 point)
- [ ] Explicit waits for dynamic elements (2 points)
- [ ] No Thread.sleep() used (2 points)

#### 6. Configuration Management (5 points)
- [ ] ConfigReader class implemented (2 points)
- [ ] All configs read from properties file (2 points)
- [ ] No hardcoded values in tests (1 point)

#### 7. Utility Classes (5 points)
- [ ] Reusable utility methods created (2 points)
- [ ] DriverFactory or similar for driver management (2 points)
- [ ] Screenshot utility (1 point)

#### 8. Exception Handling (5 points)
- [ ] try-catch where appropriate (2 points)
- [ ] Meaningful error messages (1 point)
- [ ] No suppressed exceptions (2 points)

#### 9. Reporting (5 points)
- [ ] Extent Reports configured (3 points)
- [ ] Reports generated successfully (2 points)

#### 10. Code Quality (10 points)
- [ ] Code is clean and readable (3 points)
- [ ] Proper naming conventions followed (2 points)
- [ ] No code duplication (2 points)
- [ ] Proper indentation (1 point)
- [ ] Comments where needed (2 points)

**Total: 100 points**

### Performance Levels:
- **90-100**: Excellent! Production-ready framework
- **80-89**: Very Good! Minor improvements needed
- **70-79**: Good! Review and enhance weak areas
- **60-69**: Average! Significant improvements needed
- **Below 60**: Needs substantial work

---

## Summary: Daily Assessment Checklist

### Week 1: Java Basics (Days 1-7)
- [ ] Day 1: Setup & Basics - ___/37
- [ ] Day 2: Operators & Control - ___/37
- [ ] Day 3: Arrays & Strings - ___/41
- [ ] Day 4: Methods & Static - ___/35
- [ ] Day 5: OOP Part 1 - ___/35
- [ ] Day 6: OOP Part 2 - ___/35
- [ ] Day 7: OOP Part 3 - ___/35

### Week 2: Collections & Advanced Java (Days 8-15)
- [ ] Day 8: ArrayList - ___/35
- [ ] Day 9: HashMap - ___/35
- [ ] Day 10: Exceptions - ___/37
- [ ] Day 11: File Handling - ___/35
- [ ] Day 12: Lambda & Streams - ___/35
- [ ] Day 13: Packages - ___/35
- [ ] Day 14: Wrapper Classes - ___/35
- [ ] Day 15: Review Project - ___/50

### Week 3-4: Selenium Basics (Days 16-30)
- [ ] Day 16: Selenium Setup - ___/37
- [ ] Day 17: First Script - ___/40
- [ ] Day 18: Locators Part 1 - ___/45
- [ ] Day 19: XPath - ___/45
- [ ] Day 20: CSS Selectors - ___/45
- [ ] Day 21: Element Interactions - ___/45
- [ ] Day 22: Dropdowns - ___/40
- [ ] Day 23: Waits Part 1 - ___/51
- [ ] Day 24: Waits Part 2 - ___/45
- [ ] Day 25: Alerts - ___/39
- [ ] Day 26: Frames & Windows - ___/38
- [ ] Day 27: Actions Class - ___/42
- [ ] Day 28: JavaScript Executor - ___/40
- [ ] Day 29: Screenshots - ___/40
- [ ] Day 30: TestNG Part 1 - ___/45

### Week 5-8: Framework Building (Days 31-45)
- [ ] Day 31: TestNG Part 2 - ___/38
- [ ] Day 32: TestNG Part 3 - ___/40
- [ ] Day 33: Data-Driven - ___/38
- [ ] Day 34: TestNG Part 5 - ___/40
- [ ] Day 35: POM Part 1 - ___/49
- [ ] Day 36: POM Part 2 - ___/45
- [ ] Day 37: External Data - ___/40
- [ ] Day 38: Logging Part 1 - ___/35
- [ ] Day 39: Reporting Part 2 - ___/40
- [ ] Day 40: Configuration - ___/37
- [ ] Day 41: Utilities - ___/40
- [ ] Day 42: Exception Handling - ___/35
- [ ] Day 43: Cross-Browser - ___/40
- [ ] Day 44: Best Practices - ___/35
- [ ] Day 45: Final Project - ___/100

---

## Study Tips for Success

### Before Each Assessment:
1. Review the day's learning material
2. Practice code examples
3. Try to recall key concepts without looking at notes

### During Assessment:
1. Read questions carefully
2. Time management: Don't spend too long on one question
3. For coding problems, write pseudo-code first
4. Test your code if possible

### After Assessment:
1. Review incorrect answers
2. Understand WHY you got it wrong
3. Re-study weak topics before moving on
4. Keep notes of common mistakes

### Red Flags (Re-study if you encounter these):
- Scoring below 60% consistently
- Unable to write code without looking at examples
- Can't explain concepts in your own words
- Forgetting syntax frequently

### Green Flags (You're ready to move on):
- Scoring above 80% consistently
- Can write code independently
- Can explain concepts clearly
- Can solve variations of problems

---

**Remember**: The goal is not just to pass assessments, but to truly understand and apply the concepts in real automation projects!

**Your automation journey is 45 days of consistent learning and practice. Stay committed!**
