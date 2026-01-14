
# Selenium WebDriver Automation - 45 Day Professional Course

## Course Overview
This is a **pure Selenium automation course** designed for those who already have Java fundamentals. The course focuses exclusively on Selenium WebDriver, test automation frameworks, and industry best practices to make you job-ready for QA Automation Engineer roles.

**Prerequisites**: Basic Java knowledge (variables, loops, OOP, collections)

---

## 📋 Course Structure

### Phase 1: Selenium WebDriver Fundamentals (Days 1-15)
### Phase 2: Advanced Selenium & TestNG (Days 16-30)
### Phase 3: Framework Development & Best Practices (Days 31-45)

---

## Phase 1: Selenium WebDriver Fundamentals (Days 1-15)

### Week 1: Getting Started with Selenium

#### Day 1: Selenium Introduction & Environment Setup
**Topics:**
- What is Selenium WebDriver?
- Selenium architecture and components
- Selenium vs other automation tools
- Setting up Selenium with Maven
- Adding Selenium dependencies to [`pom.xml`](pom.xml)
- [`WebDriver`](org.openqa.selenium.WebDriver) interface overview
- WebDriverManager setup

**Practice**: Setup Selenium project with Maven
**Deliverable**: Working Selenium project structure

---

#### Day 2: First Selenium Script & Browser Basics
**Topics:**
- Browser drivers ([`ChromeDriver`](org.openqa.selenium.chrome.ChromeDriver), [`EdgeDriver`](org.openqa.selenium.edge.EdgeDriver), [`FirefoxDriver`](org.openqa.selenium.firefox.FirefoxDriver))
- WebDriverManager for automatic driver management
- Basic WebDriver commands:
  - [`get(url)`](org.openqa.selenium.WebDriver.get())
  - [`getTitle()`](org.openqa.selenium.WebDriver.getTitle())
  - [`getCurrentUrl()`](org.openqa.selenium.WebDriver.getCurrentUrl())
  - [`getPageSource()`](org.openqa.selenium.WebDriver.getPageSource())
- Browser navigation:
  - [`navigate().back()`](org.openqa.selenium.WebDriver.Navigation.back())
  - [`navigate().forward()`](org.openqa.selenium.WebDriver.Navigation.forward())
  - [`navigate().refresh()`](org.openqa.selenium.WebDriver.Navigation.refresh())
- Closing browser: [`close()`](org.openqa.selenium.WebDriver.close()) vs [`quit()`](org.openqa.selenium.WebDriver.quit())

**Practice**: Write 5 basic browser automation scripts
**Deliverable**: Browser navigation automation

---

#### Day 3: Locators - Part 1 (Basic Locators)
**Topics:**
- Importance of locators in Selenium
- [`By.id()`](org.openqa.selenium.By.id()) - Most reliable locator
- [`By.name()`](org.openqa.selenium.By.name()) - For form elements
- [`By.className()`](org.openqa.selenium.By.className()) - For styled elements
- [`By.tagName()`](org.openqa.selenium.By.tagName()) - For generic elements
- [`By.linkText()`](org.openqa.selenium.By.linkText()) - For links
- [`By.partialLinkText()`](org.openqa.selenium.By.partialLinkText()) - For partial link text
- [`findElement()`](org.openqa.selenium.WebDriver.findElement()) vs [`findElements()`](org.openqa.selenium.WebDriver.findElements())

**Practice**: Locate 20+ elements using different strategies
**Deliverable**: Locator strategy document

---

#### Day 4: Locators - Part 2 (XPath Mastery)
**Topics:**
- XPath syntax and structure
- Absolute vs Relative XPath
- XPath axes:
  - [`parent`](parent), [`child`](child), [`ancestor`](ancestor), [`descendant`](descendant)
  - [`following-sibling`](following-sibling), [`preceding-sibling`](preceding-sibling)
  - [`following`](following), [`preceding`](preceding)
- XPath functions:
  - [`text()`](text()) - Match by text
  - [`contains()`](contains()) - Partial match
  - [`starts-with()`](starts-with()) - Prefix match
  - [`normalize-space()`](normalize-space()) - Handle whitespace
- Dynamic XPath creation
- [`By.xpath()`](org.openqa.selenium.By.xpath())

**Practice**: Create 15 complex XPath expressions
**Deliverable**: XPath cheat sheet

---

#### Day 5: Locators - Part 3 (CSS Selectors)
**Topics:**
- CSS Selector syntax
- CSS vs XPath comparison
- CSS Selector strategies:
  - ID: `#elementId`
  - Class: `.className`
  - Attribute: `[attribute='value']`
  - Combination: `tag.class#id`
  - Child: `parent > child`
  - Descendant: `ancestor descendant`
  - Pseudo-classes: `:nth-child()`, `:first-child`, `:last-child`
- When to use CSS vs XPath
- [`By.cssSelector()`](org.openqa.selenium.By.cssSelector())

**Practice**: Create CSS selectors for 15 elements
**Deliverable**: CSS selector reference guide

---

#### Day 6: WebElement Interactions
**Topics:**
- [`WebElement`](org.openqa.selenium.WebElement) interface
- Text input: [`sendKeys()`](org.openqa.selenium.WebElement.sendKeys())
- Clicking: [`click()`](org.openqa.selenium.WebElement.click())
- Clearing: [`clear()`](org.openqa.selenium.WebElement.clear())
- Getting text: [`getText()`](org.openqa.selenium.WebElement.getText())
- Getting attributes: [`getAttribute()`](org.openqa.selenium.WebElement.getAttribute())
- Getting CSS values: [`getCssValue()`](org.openqa.selenium.WebElement.getCssValue())
- Element state methods:
  - [`isDisplayed()`](org.openqa.selenium.WebElement.isDisplayed())
  - [`isEnabled()`](org.openqa.selenium.WebElement.isEnabled())
  - [`isSelected()`](org.openqa.selenium.WebElement.isSelected())
- [`getSize()`](org.openqa.selenium.WebElement.getSize()), [`getLocation()`](org.openqa.selenium.WebElement.getLocation())

**Practice**: Interact with 10 different element types
**Deliverable**: Element interaction test suite

---

#### Day 7: Dropdowns, Checkboxes & Radio Buttons
**Topics:**
- [`Select`](org.openqa.selenium.support.ui.Select) class for dropdowns
- Selection methods:
  - [`selectByVisibleText()`](org.openqa.selenium.support.ui.Select.selectByVisibleText())
  - [`selectByValue()`](org.openqa.selenium.support.ui.Select.selectByValue())
  - [`selectByIndex()`](org.openqa.selenium.support.ui.Select.selectByIndex())
- Deselection methods:
  - [`deselectAll()`](org.openqa.selenium.support.ui.Select.deselectAll())
  - [`deselectByVisibleText()`](org.openqa.selenium.support.ui.Select.deselectByVisibleText())
- Getting options:
  - [`getOptions()`](org.openqa.selenium.support.ui.Select.getOptions())
  - [`getAllSelectedOptions()`](org.openqa.selenium.support.ui.Select.getAllSelectedOptions())
  - [`getFirstSelectedOption()`](org.openqa.selenium.support.ui.Select.getFirstSelectedOption())
- Handling checkboxes and radio buttons
- Multi-select dropdowns
- [`isMultiple()`](org.openqa.selenium.support.ui.Select.isMultiple())

**Practice**: Automate 5 forms with different element types
**Deliverable**: Form automation test cases

---

### Week 2: Synchronization & Advanced Interactions

#### Day 8: Waits - Part 1 (Implicit & Explicit)
**Topics:**
- Why synchronization is critical
- **Implicit Wait**:
  - [`manage().timeouts().implicitlyWait()`](org.openqa.selenium.WebDriver.Timeouts.implicitlyWait())
  - Global wait for all elements
  - Pros and cons
- **Explicit Wait**:
  - [`WebDriverWait`](org.openqa.selenium.support.ui.WebDriverWait)
  - [`ExpectedConditions`](org.openqa.selenium.support.ui.ExpectedConditions)
- Common wait conditions:
  - [`visibilityOfElementLocated()`](org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated())
  - [`elementToBeClickable()`](org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable())
  - [`presenceOfElementLocated()`](org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated())
  - [`invisibilityOfElementLocated()`](org.openqa.selenium.support.ui.ExpectedConditions.invisibilityOfElementLocated())
  - [`textToBePresentInElement()`](org.openqa.selenium.support.ui.ExpectedConditions.textToBePresentInElement())

**Practice**: Implement waits in 10 scenarios
**Deliverable**: Wait strategy document

---

#### Day 9: Waits - Part 2 (Fluent Wait & Custom Conditions)
**Topics:**
- **Fluent Wait**:
  - [`FluentWait`](org.openqa.selenium.support.ui.FluentWait)
  - [`withTimeout()`](org.openqa.selenium.support.ui.FluentWait.withTimeout())
  - [`pollingEvery()`](org.openqa.selenium.support.ui.FluentWait.pollingEvery())
  - [`ignoring()`](org.openqa.selenium.support.ui.FluentWait.ignoring())
- Custom [`ExpectedConditions`](org.openqa.selenium.support.ui.ExpectedConditions)
- Creating custom wait conditions
- Wait best practices
- Combining different wait strategies
- [`pageLoadTimeout()`](org.openqa.selenium.WebDriver.Timeouts.pageLoadTimeout())
- [`scriptTimeout()`](org.openqa.selenium.WebDriver.Timeouts.scriptTimeout())

**Practice**: Create 5 custom wait conditions
**Deliverable**: Custom wait utility class

---

#### Day 10: Handling Alerts, Prompts & Confirmations
**Topics:**
- JavaScript alerts, confirms, and prompts
- [`Alert`](org.openqa.selenium.Alert) interface:
  - [`accept()`](org.openqa.selenium.Alert.accept()) - Click OK
  - [`dismiss()`](org.openqa.selenium.Alert.dismiss()) - Click Cancel
  - [`getText()`](org.openqa.selenium.Alert.getText()) - Get alert text
  - [`sendKeys()`](org.openqa.selenium.Alert.sendKeys()) - Enter text in prompt
- [`switchTo().alert()`](org.openqa.selenium.WebDriver.TargetLocator.alert())
- Handling unexpected alerts
- Alert wait strategies

**Practice**: Handle 10 different alert scenarios
**Deliverable**: Alert handling test suite

---

#### Day 11: Frames & iFrames
**Topics:**
- Understanding frames and iframes
- [`switchTo().frame()`](org.openqa.selenium.WebDriver.TargetLocator.frame()) methods:
  - By index: `switchTo().frame(0)`
  - By name or ID: `switchTo().frame("frameName")`
  - By WebElement: `switchTo().frame(webElement)`
- [`switchTo().defaultContent()`](org.openqa.selenium.WebDriver.TargetLocator.defaultContent()) - Exit all frames
- [`switchTo().parentFrame()`](org.openqa.selenium.WebDriver.TargetLocator.parentFrame()) - Go to parent frame
- Nested frames handling
- Frame identification strategies

**Practice**: Navigate through 5 nested frame scenarios
**Deliverable**: Frame handling utility methods

---

#### Day 12: Window & Tab Management
**Topics:**
- Understanding window handles
- [`getWindowHandle()`](org.openqa.selenium.WebDriver.getWindowHandle()) - Get current window
- [`getWindowHandles()`](org.openqa.selenium.WebDriver.getWindowHandles()) - Get all windows
- [`switchTo().window()`](org.openqa.selenium.WebDriver.TargetLocator.window()) - Switch window
- Opening new tabs/windows
- Closing specific windows
- Window management strategies
- [`manage().window()`](org.openqa.selenium.WebDriver.Window) methods:
  - [`maximize()`](org.openqa.selenium.WebDriver.Window.maximize())
  - [`minimize()`](org.openqa.selenium.WebDriver.Window.minimize())
  - [`fullscreen()`](org.openqa.selenium.WebDriver.Window.fullscreen())
  - [`setSize()`](org.openqa.selenium.WebDriver.Window.setSize())
  - [`setPosition()`](org.openqa.selenium.WebDriver.Window.setPosition())

**Practice**: Handle 5 multi-window scenarios
**Deliverable**: Window management utility class

---

#### Day 13: Actions Class - Mouse Operations
**Topics:**
- [`Actions`](org.openqa.selenium.interactions.Actions) class introduction
- Mouse operations:
  - [`moveToElement()`](org.openqa.selenium.interactions.Actions.moveToElement()) - Mouse hover
  - [`click()`](org.openqa.selenium.interactions.Actions.click()) - Click at current location
  - [`clickAndHold()`](org.openqa.selenium.interactions.Actions.clickAndHold()) - Press and hold
  - [`release()`](org.openqa.selenium.interactions.Actions.release()) - Release mouse
  - [`contextClick()`](org.openqa.selenium.interactions.Actions.contextClick()) - Right click
  - [`doubleClick()`](org.openqa.selenium.interactions.Actions.doubleClick()) - Double click
  - [`dragAndDrop()`](org.openqa.selenium.interactions.Actions.dragAndDrop()) - Drag and drop
  - [`dragAndDropBy()`](org.openqa.selenium.interactions.Actions.dragAndDropBy()) - Drag by offset
- [`build()`](org.openqa.selenium.interactions.Actions.build()) and [`perform()`](org.openqa.selenium.interactions.Actions.perform())
- Action chains

**Practice**: Perform 10 complex mouse interactions
**Deliverable**: Mouse interaction test cases

---

#### Day 14: Actions Class - Keyboard Operations
**Topics:**
- Keyboard operations:
  - [`sendKeys()`](org.openqa.selenium.interactions.Actions.sendKeys()) - Send keys to element
  - [`keyDown()`](org.openqa.selenium.interactions.Actions.keyDown()) - Press key
  - [`keyUp()`](org.openqa.selenium.interactions.Actions.keyUp()) - Release key
- [`Keys`](org.openqa.selenium.Keys) enum:
  - Modifier keys: `CONTROL`, `SHIFT`, `ALT`
  - Special keys: `ENTER`, `TAB`, `ESCAPE`, `BACK_SPACE`
  - Function keys: `F1` through `F12`
  - Arrow keys: `ARROW_UP`, `ARROW_DOWN`, `ARROW_LEFT`, `ARROW_RIGHT`
- Keyboard shortcuts (Ctrl+A, Ctrl+C, Ctrl+V)
- Combining mouse and keyboard actions

**Practice**: Implement 10 keyboard interaction scenarios
**Deliverable**: Keyboard interaction utility

---

#### Day 15: JavaScript Executor
**Topics:**
- [`JavascriptExecutor`](org.openqa.selenium.JavascriptExecutor) interface
- [`executeScript()`](org.openqa.selenium.JavascriptExecutor.executeScript()) method
- [`executeAsyncScript()`](org.openqa.selenium.JavascriptExecutor.executeAsyncScript()) method
- Common use cases:
  - Scrolling operations (scroll to element, top, bottom)
  - Clicking hidden/overlapped elements
  - Handling disabled elements
  - Getting element properties
  - Changing element attributes
  - Highlighting elements
  - Executing custom JavaScript
  - Handling AJAX calls
- When to use JavaScript vs Selenium methods

**Practice**: Use JavaScript for 10 edge cases
**Deliverable**: JavaScript executor utility class

---

## Phase 2: Advanced Selenium & TestNG (Days 16-30)

### Week 3: Screenshots, Browser Options & TestNG Basics

#### Day 16: Screenshots & Visual Testing
**Topics:**
- [`TakesScreenshot`](org.openqa.selenium.TakesScreenshot) interface
- [`getScreenshotAs()`](org.openqa.selenium.TakesScreenshot.getScreenshotAs()) method
- [`OutputType`](org.openqa.selenium.OutputType) options
- Full page screenshots
- Element screenshots
- Screenshot on test failure
- Screenshot naming conventions
- Storing screenshots
- Screenshot comparison basics

**Practice**: Implement screenshot utility
**Deliverable**: Screenshot utility class with failure capture

---

#### Day 17: Browser Options & Capabilities
**Topics:**
- **Chrome Options** ([`ChromeOptions`](org.openqa.selenium.chrome.ChromeOptions)):
  - Headless mode
  - Window size
  - Disable notifications
  - Disable extensions
  - User data directory
  - Download directory
  - Incognito mode
- **Firefox Options** ([`FirefoxOptions`](org.openqa.selenium.firefox.FirefoxOptions))
- **Edge Options** ([`EdgeOptions`](org.openqa.selenium.edge.EdgeOptions))
- [`DesiredCapabilities`](org.openqa.selenium.remote.DesiredCapabilities)
- Browser profiles
- SSL certificate handling

**Practice**: Configure 5 different browser setups
**Deliverable**: Browser configuration utility

---

#### Day 18: TestNG Framework - Part 1 (Basics)
**Topics:**
- What is TestNG and why use it?
- TestNG installation and setup
- [`@Test`](org.testng.annotations.Test) annotation
- Test execution from IDE and Maven
- Basic assertions:
  - [`Assert.assertEquals()`](org.testng.Assert.assertEquals())
  - [`Assert.assertTrue()`](org.testng.Assert.assertTrue())
  - [`Assert.assertFalse()`](org.testng.Assert.assertFalse())
  - [`Assert.assertNotNull()`](org.testng.Assert.assertNotNull())
  - [`Assert.assertNull()`](org.testng.Assert.assertNull())
- Test methods organization

**Practice**: Convert 10 Selenium scripts to TestNG
**Deliverable**: TestNG test suite

---

#### Day 19: TestNG - Part 2 (Annotations & Lifecycle)
**Topics:**
- TestNG annotation hierarchy
- Setup annotations:
  - [`@BeforeSuite`](org.testng.annotations.BeforeSuite) / [`@AfterSuite`](org.testng.annotations.AfterSuite)
  - [`@BeforeTest`](org.testng.annotations.BeforeTest) / [`@AfterTest`](org.testng.annotations.AfterTest)
  - [`@BeforeClass`](org.testng.annotations.BeforeClass) / [`@AfterClass`](org.testng.annotations.AfterClass)
  - [`@BeforeMethod`](org.testng.annotations.BeforeMethod) / [`@AfterMethod`](org.testng.annotations.AfterMethod)
- Execution order
- Test lifecycle management
- Resource initialization and cleanup

**Practice**: Implement proper test lifecycle
**Deliverable**: Base test class with setup/teardown

---

#### Day 20: TestNG - Part 3 (Test Organization)
**Topics:**
- Test prioritization: `priority` attribute
- Enabling/disabling tests: `enabled` attribute
- Test dependencies: `dependsOnMethods`, `dependsOnGroups`
- Grouping tests: `groups` attribute
- Running specific groups
- Test inclusion/exclusion
- [`testng.xml`](testng.xml) configuration
- Suite organization

**Practice**: Organize 20 tests with groups and priorities
**Deliverable**: Organized test suite with testng.xml

---

#### Day 21: TestNG - Part 4 (Data-Driven Testing)
**Topics:**
- [`@Parameters`](org.testng.annotations.Parameters) annotation
- Parameters from [`testng.xml`](testng.xml)
- [`@DataProvider`](org.testng.annotations.DataProvider) annotation
- Data provider methods
- Data provider with multiple parameters
- Data provider from external sources
- Parallel data provider execution
- Data-driven test design

**Practice**: Create 5 data-driven test scenarios
**Deliverable**: Data-driven test framework

---

#### Day 22: TestNG - Part 5 (Advanced Features)
**Topics:**
- **Soft Assertions**:
  - [`SoftAssert`](org.testng.asserts.SoftAssert) class
  - [`assertAll()`](org.testng.asserts.SoftAssert.assertAll())
- **Test Listeners**:
  - [`ITestListener`](org.testng.ITestListener) interface
  - [`onTestStart()`](org.testng.ITestListener.onTestStart())
  - [`onTestSuccess()`](org.testng.ITestListener.onTestSuccess())
  - [`onTestFailure()`](org.testng.ITestListener.onTestFailure())
  - [`onTestSkipped()`](org.testng.ITestListener.onTestSkipped())
- **Retry Logic**:
  - [`IRetryAnalyzer`](org.testng.IRetryAnalyzer) interface
- Custom annotations
- Test transformers

**Practice**: Implement listeners and retry logic
**Deliverable**: Custom test listener and retry analyzer

---

### Week 4: Page Object Model & Framework Design

#### Day 23: Page Object Model - Part 1 (Basics)
**Topics:**
- What is Page Object Model (POM)?
- Benefits of POM
- POM design principles
- Creating page classes
- [`@FindBy`](org.openqa.selenium.support.FindBy) annotation
- [`@FindBys`](org.openqa.selenium.support.FindBys) annotation
- [`@FindAll`](org.openqa.selenium.support.FindAll) annotation
- [`PageFactory`](org.openqa.selenium.support.PageFactory) class
- [`initElements()`](org.openqa.selenium.support.PageFactory.initElements()) method
- Lazy initialization

**Practice**: Convert 5 test scripts to POM
**Deliverable**: Page object classes

---

#### Day 24: Page Object Model - Part 2 (Advanced)
**Topics:**
- Base page class creation
- Page component pattern
- Page factory alternatives
- POM best practices:
  - One page = One class
  - Return page objects
  - Encapsulate element locators
  - No assertions in page classes
- Organizing page objects
- Page object inheritance
- Fluent page objects

**Practice**: Build complete POM hierarchy
**Deliverable**: Advanced page object framework

---

#### Day 25: Reading External Data - Properties Files
**Topics:**
- Properties file structure
- [`Properties`](java.util.Properties) class
- [`load()`](java.util.Properties.load()) method
- Reading configuration values
- Environment-specific properties
- Property file organization
- Configuration management
- Creating config reader utility

**Practice**: Externalize all configurations
**Deliverable**: Configuration reader utility

---

#### Day 26: Reading External Data - Excel Files
**Topics:**
- Apache POI library setup
- [`XSSFWorkbook`](org.apache.poi.xssf.usermodel.XSSFWorkbook) for .xlsx files
- [`HSSFWorkbook`](org.apache.poi.hssf.usermodel.HSSFWorkbook) for .xls files
- [`XSSFSheet`](org.apache.poi.xssf.usermodel.XSSFSheet) operations
- [`XSSFRow`](org.apache.poi.xssf.usermodel.XSSFRow) and [`XSSFCell`](org.apache.poi.xssf.usermodel.XSSFCell)
- Reading data from Excel
- Writing data to Excel
- Excel data provider for TestNG
- Test data management

**Practice**: Create Excel-driven tests
**Deliverable**: Excel utility class

---

#### Day 27: Reading External Data - JSON & CSV
**Topics:**
- JSON file structure
- JSON parsing libraries (Jackson, Gson)
- [`JSONObject`](org.json.JSONObject) and [`JSONArray`](org.json.JSONArray)
- Reading JSON test data
- CSV file handling
- [`CSVReader`](com.opencsv.CSVReader) library
- Choosing data format
- Data format comparison

**Practice**: Implement JSON and CSV data readers
**Deliverable**: Multi-format data reader utility

---

#### Day 28: Parallel Test Execution
**Topics:**
- Parallel execution in TestNG
- `parallel` attribute in testng.xml:
  - `methods` - Parallel methods
  - `classes` - Parallel classes
  - `tests` - Parallel tests
  - `instances` - Parallel instances
- `thread-count` configuration
- [`ThreadLocal`](java.lang.ThreadLocal) for WebDriver
- Thread-safe test design
- Parallel execution challenges
- Resource management in parallel tests

**Practice**: Run 20 tests in parallel
**Deliverable**: Thread-safe test framework

---

#### Day 29: Cross-Browser Testing
**Topics:**
- Browser factory pattern
- [`WebDriver`](org.openqa.selenium.WebDriver) factory implementation
- Running tests on Chrome, Firefox, Edge, Safari
- Browser-specific configurations
- Browser compatibility testing
- Parameterized browser testing
- Cloud-based browser testing (BrowserStack, Sauce Labs intro)

**Practice**: Execute tests on 3 browsers
**Deliverable**: Browser factory utility

---

#### Day 30: Week 1-4 Review & Mini Project
**Project**: E-commerce Test Automation
- Implement login functionality
- Product search and filtering
- Add to cart
- Checkout process
- Order verification

**Requirements**:
- Page Object Model
- TestNG framework
- Data-driven tests
- Cross-browser support
- Proper waits and synchronization

**Deliverable**: Working mini-project

---

## Phase 3: Framework Development & Best Practices (Days 31-45)

### Week 5: Logging, Reporting & Utilities

#### Day 31: Logging - Log4j Setup
**Topics:**
- Importance of logging in automation
- Log4j 2 setup and configuration
- [`log4j2.xml`](log4j2.xml) configuration
- Logging levels: TRACE, DEBUG, INFO, WARN, ERROR, FATAL
- [`Logger`](org.apache.logging.log4j.Logger) class
- [`LogManager`](org.apache.logging.log4j.LogManager)
- Log file management
- Rolling file appenders
- Console and file logging
- Log patterns

**Practice**: Add logging to existing tests
**Deliverable**: Logging framework setup

---

#### Day 32: Extent Reports - Part 1 (Setup)
**Topics:**
- Extent Reports introduction
- Extent Reports 5 setup
- [`ExtentReports`](com.aventstack.extentreports.ExtentReports) class
- [`ExtentSparkReporter`](com.aventstack.extentreports.reporter.ExtentSparkReporter)
- [`ExtentTest`](com.aventstack.extentreports.ExtentTest) class
- Creating test reports
- Report configuration
- System information
- Report themes

**Practice**: Generate basic Extent Reports
**Deliverable**: Extent Reports setup

---

#### Day 33: Extent Reports - Part 2 (Advanced)
**Topics:**
- Adding test steps to reports
- Logging test status:
  - [`pass()`](com.aventstack.extentreports.ExtentTest.pass())
  - [`fail()`](com.aventstack.extentreports.ExtentTest.fail())
  - [`skip()`](com.aventstack.extentreports.ExtentTest.skip())
  - [`info()`](com.aventstack.extentreports.ExtentTest.info())
  - [`warning()`](com.aventstack.extentreports.ExtentTest.warning())
- Adding screenshots to reports
- [`MediaEntityBuilder`](com.aventstack.extentreports.MediaEntityBuilder)
- Test categorization
- Report customization
- Integrating with TestNG listeners

**Practice**: Create detailed test reports
**Deliverable**: Complete reporting framework

---

#### Day 34: Utility Classes - Part 1
**Topics:**
- Screenshot utility class
- Wait utility class
- Element utility class
- Alert utility class
- Frame utility class
- Window utility class
- Utility class design principles
- Reusable methods

**Practice**: Build 6 utility classes
**Deliverable**: Utility framework

---

#### Day 35: Utility Classes - Part 2
**Topics:**
- Excel utility class
- Properties utility class
- JSON utility class
- Date/Time utility class
- Random data generator utility
- File utility class
- String utility class

**Practice**: Build 7 more utility classes
**Deliverable**: Complete utility library

---

### Week 6: Exception Handling & Advanced Topics

#### Day 36: Exception Handling in Framework
**Topics:**
- Common Selenium exceptions:
  - [`NoSuchElementException`](org.openqa.selenium.NoSuchElementException)
  - [`TimeoutException`](org.openqa.selenium.TimeoutException)
  - [`StaleElementReferenceException`](org.openqa.selenium.StaleElementReferenceException)
  - [`ElementNotInteractableException`](org.openqa.selenium.ElementNotInteractableException)
  - [`NoSuchWindowException`](org.openqa.selenium.NoSuchWindowException)
  - [`NoSuchFrameException`](org.openqa.selenium.NoSuchFrameException)
  - [`WebDriverException`](org.openqa.selenium.WebDriverException)
- Custom exceptions for framework
- Try-catch strategies
- Logging exceptions
- Failing tests gracefully
- Exception handling best practices

**Practice**: Implement robust exception handling
**Deliverable**: Exception handling framework

---

#### Day 37: Configuration Management
**Topics:**
- Environment-specific configs (DEV, QA, UAT, PROD)
- Configuration class design
- Singleton pattern for config
- Reading from multiple sources
- Configuration validation
- Default values
- Configuration override
- Centralized configuration management

**Practice**: Build configuration manager
**Deliverable**: Configuration management system

---

#### Day 38: Database Testing with JDBC
**Topics:**
- JDBC basics
- Database connection setup
- [`Connection`](java.sql.Connection) interface
- [`Statement`](java.sql.Statement) and [`PreparedStatement`](java.sql.PreparedStatement)
- [`ResultSet`](java.sql.ResultSet) handling
- Executing queries
- Database validation in tests
- Closing connections
- Database utility class

**Practice**: Validate data from database
**Deliverable**: Database utility class

---

#### Day 39: API Testing Integration
**Topics:**
- Why API testing with UI testing?
- Rest Assured basics
- API test setup
- GET, POST, PUT, DELETE requests
- Response validation
- Combining API and UI tests
- Test data setup via API
- API utility class

**Practice**: Create hybrid API-UI tests
**Deliverable**: API utility integration

---

#### Day 40: CI/CD Integration - Jenkins
**Topics:**
- What is CI/CD?
- Jenkins introduction
- Jenkins installation
- Creating Jenkins jobs
- Configuring Maven projects
- Running tests from Jenkins
- Test result publishing
- Email notifications
- Scheduled test execution
- Jenkins pipeline basics

**Practice**: Setup Jenkins job for tests
**Deliverable**: Jenkins integration

---

#### Day 41: Git & Version Control
**Topics:**
- Git basics for automation
- Repository setup
- `.gitignore` for Selenium projects
- Branching strategies
- Commit best practices
- Pull requests
- Code review process
- GitHub/GitLab integration
- Version control best practices

**Practice**: Setup Git repository
**Deliverable**: Project on GitHub

---

#### Day 42: Docker for Selenium
**Topics:**
- Docker basics
- Selenium Docker images
- Running tests in Docker containers
- Docker Compose for Selenium Grid
- Containerized test execution
- Benefits of Docker for testing
- Docker best practices

**Practice**: Run tests in Docker
**Deliverable**: Dockerized test setup

---

### Week 7: Final Project & Advanced Topics

#### Day 43: BDD with Cucumber (Optional)
**Topics:**
- Behavior-Driven Development (BDD) introduction
- Cucumber setup with Selenium
- Gherkin syntax (Given, When, Then)
- Feature files
- Step definitions
- Cucumber hooks
- Data tables and scenario outlines
- Cucumber reports
- BDD best practices

**Practice**: Convert tests to BDD format
**Deliverable**: BDD test framework (optional)

---

#### Day 44: Framework Best Practices & Code Quality
**Topics:**
- Code organization principles
- Naming conventions for tests and methods
- SOLID principles in automation
- DRY (Don't Repeat Yourself)
- Framework scalability
- Code review checklist
- Documentation standards
- README best practices
- Code comments
- Maintainability

**Practice**: Refactor existing framework
**Deliverable**: Clean, documented framework

---

#### Day 45: Final Capstone Project
**Project**: Complete E-commerce Test Automation Framework

### Test Scenarios (15-20 test cases):
1. **User Management**:
   - User registration
   - Login/Logout
   - Password reset
   - Profile update

2. **Product Management**:
   - Product search
   - Product filtering
   - Product sorting
   - Product details view

3. **Shopping Cart**:
   - Add to cart
   - Update quantity
   - Remove from cart
   - Cart total calculation

4. **Checkout Process**:
   - Shipping information
   - Payment processing
   - Order confirmation
   - Order history

5. **Additional Features**:
   - Wishlist functionality
   - Product reviews
   - Newsletter subscription

### Framework Requirements:
✅ **Architecture**:
- Page Object Model structure
- Base page class
- Page factory implementation

✅ **Test Framework**:
- TestNG test organization
- Test groups and priorities
- Parallel execution support

✅ **Data Management**:
- Data-driven testing from Excel
- Properties file for configurations
- JSON test data support

✅ **Reporting & Logging**:
- Extent Reports integration
- Log4j logging
- Screenshot on failure
- Detailed test reports

✅ **Cross-Browser Support**:
- Chrome, Firefox, Edge
- Browser factory pattern
- Headless execution option

✅ **Utilities**:
- Reusable utility classes
- Wait utilities
- Screenshot utilities
- Excel/JSON readers

✅ **Exception Handling**:
- Custom exceptions
- Graceful error handling
- Proper logging

✅ **CI/CD Ready**:
- Maven project structure
- Jenkins integration
- Git repository

### Deliverables:
1. Complete automation framework
2. 15-20 test cases covering all scenarios
3. Test execution report with screenshots
4. Comprehensive README documentation
5. Code committed to GitHub
6. Framework architecture diagram
7. Test execution video (optional)

---

## 📊 Project Structure

```
selenium-automation-framework/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/
│   │       │   ├── BasePage.java
│   │       │   ├── LoginPage.java
│   │       │   ├── HomePage.java
│   │       │   ├── ProductPage.java
│   │       │   ├── CartPage.java
│   │       │   └── CheckoutPage.java
│   │       ├── utils/
│   │       │   ├── DriverFactory.java
│   │       │   ├── ConfigReader.java
│   │       │   ├── ExcelReader.java
│   │       │   ├── JSONReader.java
│   │       │   ├── ScreenshotUtils.java
│   │       │   ├── WaitUtils.java
│   │       │   ├── ElementUtils.java
│   │       │   └── DateUtils.java
│   │       ├── constants/
│   │       │   └── Constants.java
│   │       └── exceptions/
│   │           └── FrameworkException.java
│   └── test/
│       ├── java/
│       │   ├── base/
│       │   │   └── BaseTest.java
│       │   ├── tests/
│       │   │   ├── LoginTests.java
│       │   │   ├── ProductTests.java
│       │   │   ├── CartTests.java
│       │   │   └── CheckoutTests.java
│       │   └── listeners/
│       │       ├── TestListener.java
│       │       └── RetryAnalyzer.java
│       └── resources/
│           ├── testng.xml
│           ├── config.properties
│           ├── log4j2.xml
│           └── extent-config.xml
├── test-data/
│   ├── testdata.xlsx
│   └── testdata.json
├── test-output/
├── logs/
├── screenshots/
├── reports/
├── drivers/ (if not using WebDriverManager)
├── .gitignore
├── pom.xml
├── README.md
└── Jenkinsfile
```

---

## 🎯 Learning Path Summary

### Phase 1: Selenium Fundamentals (Days 1-15)
- ✅ Selenium setup and basic commands
- ✅ All locator strategies (ID, Name, XPath, CSS)
- ✅ Element interactions
- ✅ Synchronization (Implicit, Explicit, Fluent waits)
- ✅ Alerts, Frames, Windows
- ✅ Actions class (Mouse & Keyboard)
- ✅ JavaScript Executor

### Phase 2: TestNG & POM (Days 16-30)
- ✅ Screenshots and browser options
- ✅ TestNG framework (annotations, assertions, data-driven)
- ✅ Page Object Model design pattern
- ✅ External data handling (Properties, Excel, JSON)
- ✅ Parallel execution
- ✅ Cross-browser testing

### Phase 3: Framework & Best Practices (Days 31-45)
- ✅ Logging with Log4j
- ✅ Reporting with Extent Reports
- ✅ Utility classes
- ✅ Exception handling
- ✅ Configuration management
- ✅ Database testing
- ✅ API integration
- ✅ CI/CD with Jenkins
- ✅ Version control with Git
- ✅ Docker containerization
- ✅ Final capstone project

---

## 📚 Practice Websites

### Beginner Level:
1. **The Internet** - http://the-internet.herokuapp.com/
   - Comprehensive test scenarios
2. **Sauce Demo** - https://www.saucedemo.com/
   - E-commerce application

### Intermediate Level:
3. **OrangeHRM Demo** - https://opensource-demo.orangehrmlive.com/
   - Enterprise application
4. **Automation Practice** - http://automationpractice.com/
   - Shopping site

### Advanced Level:
5. **DemoQA** - https://demoqa.com/
   - Various UI elements
6. **Parabank** - https://parabank.parasoft.com/
   - Banking application

---

## 🛠️ Required Tools & Technologies

### Essential Tools:
- **Java JDK** 11 or 17
- **IntelliJ IDEA** Community Edition (or Eclipse)
- **Maven** 3.x
- **Git** for version control
- **Chrome**, **Firefox**, **Edge** browsers

### Maven Dependencies:
```xml
<!-- Selenium WebDriver -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.15.0</version>
</dependency>

<!-- WebDriverManager -->
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.6.2</version>
</dependency>

<!-- TestNG -->
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.8.0</version>
</dependency>

<!-- Extent Reports -->
<dependency>
    <groupId>com.aventstack</groupId>
    <artifactId>extentreports</artifactId>
    <version>5.1.1</version>
</dependency>

<!-- Apache POI (Excel) -->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.5</version>
</dependency>

<!-- Log4j -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.22.0</version>
</dependency>

<!-- JSON -->
<dependency>
    <groupId>org.json</groupId>
    <artifactId>json</artifactId>
    <version>20231013</version>
</dependency>

<!-- Rest Assured (Optional) -->
<dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>rest-assured</artifactId>
    <version>5.4.0</version>
</dependency>
```

---

## 📖 Learning Resources

### Official Documentation:
- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [TestNG Documentation](https://testng.org/doc/)
- [Maven Documentation](https://maven.apache.org/guides/)

### Video Tutorials:
- Automation Step by Step (YouTube)
- Naveen AutomationLabs (YouTube)
- Rahul Shetty Academy (YouTube)
- Test Automation University (free courses)

### Books:
- "Selenium WebDriver 3 Practical Guide" by Unmesh Gundecha
- "Selenium Testing Tools Cookbook" by Unmesh Gundecha
- "Test Automation using Selenium WebDriver with Java" by Naveen Khunteta

### Practice Platforms:
- [HackerRank](https://www.hackerrank.com/)
- [LeetCode](https://leetcode.com/)
- [Exercism](https://exercism.org/tracks/java)

---

## ✅ Job Readiness Checklist

After completing this course, you should be able to:

### Technical Skills:
- [ ] Explain Selenium WebDriver architecture
- [ ] Write Selenium scripts independently
- [ ] Use all locator strategies effectively
- [ ] Handle synchronization issues
- [ ] Create Page Object Model framework from scratch
- [ ] Implement data-driven testing
- [ ] Generate comprehensive test reports
- [ ] Handle exceptions gracefully
- [ ] Write 20+ different test scenarios
- [ ] Execute tests in parallel
- [ ] Run tests on multiple browsers
- [ ] Integrate with CI/CD tools

### Framework Skills:
- [ ] Design scalable test framework
- [ ] Implement proper logging
- [ ] Create reusable utilities
- [ ] Manage test data externally
- [ ] Handle configuration management
- [ ] Implement retry logic
- [ ] Create custom listeners

### Soft Skills:
- [ ] Explain framework architecture in interviews
- [ ] Debug test failures efficiently
- [ ] Write clean, maintainable code
- [ ] Document code properly
- [ ] Use version control (Git)
- [ ] Collaborate with team members
- [ ] Present test results to stakeholders

---

## 🎤 Interview Preparation

### Common Selenium Interview Questions:

**Architecture & Basics:**
1. What is Selenium WebDriver?
2. Explain Selenium architecture
3. Difference between Selenium 3 and Selenium 4
4. What is WebDriver interface?
5. Explain browser drivers

**Locators:**
6. What are different locator strategies?
7. XPath vs CSS Selector - when to use which?
8. How to handle dynamic elements?
9. Explain XPath axes
10. What is relative locator in Selenium 4?

**Synchronization:**
11. Types of waits in Selenium
12. Implicit vs Explicit wait
13. When to use Fluent wait?
14. How to handle StaleElementReferenceException?

**Framework:**
15. What is Page Object Model?
16. Benefits of POM
17. Explain your framework architecture
18. How do you handle test data?
19. How do you generate reports?
20. Explain exception handling strategy

**Advanced:**
21. How to handle frames and windows?
22. Explain Actions class
23. When to use JavaScript Executor?
24. How to take screenshots?
25. Explain parallel execution
26. How to integrate with CI/CD?
27. What is TestNG and its advantages?
28. Explain data-driven testing
29. How to handle AJAX calls?
30. What are TestNG listeners?

---

## 🚀 Career Path

### Entry Level (0-1 year):
- **QA Automation Engineer**
- **Test Automation Engineer**
- **Junior SDET**

**Expected Salary**: $50K - $70K

### Mid Level (1-3 years):
- **Senior QA Automation Engineer**
- **SDET**
- **Automation Architect**

**Expected Salary**: $70K - $100K

### Senior Level (3+ years):
- **Lead Automation Engineer**
- **Senior SDET**
- **QA Manager**
- **Automation Architect**

**Expected Salary**: $100K - $150K+

---

## 📈 Post-Course Learning Path

### Immediate Next Steps (1-2 months):
1. **API Testing**: Rest Assured
2. **Mobile Testing**: Appium
3. **Performance Testing**: JMeter basics
4. **Security Testing**: OWASP ZAP basics

### Advanced Topics (3-6 months):
1. **Selenium Grid**: Distributed testing
2. **Cloud Testing**: BrowserStack, Sauce Labs
3. **Kubernetes**: Container orchestration
4. **Advanced CI/CD**: Jenkins pipelines, GitLab CI
5. **Test Management**: TestRail, Zephyr

### Specialization (6-12 months):
1. **Full Stack Testing**: Frontend + Backend + API
2. **DevOps for QA**: Infrastructure as Code
3. **AI/ML in Testing**: Test optimization
4. **Microservices Testing**: Contract testing

---

## 💡 Daily Study Routine

### Weekday Schedule (3-4 hours/day):
- **Theory & Documentation**: 45-60 minutes
- **Hands-on Practice**: 90-120 minutes
- **Problem Solving**: 30-45 minutes
- **Review Previous Day**: 15-20 minutes

### Weekend Activities:
- Build mini Selenium projects
- Practice on demo websites
- Code review and refactoring
- Mock interviews
- Contribute to open source

---

## 🎯 Success Metrics

### Week 3 Checkpoint (Day 15):
- ✅ Can automate basic web interactions
- ✅ Can use all locator strategies
- ✅ Can handle waits properly
- ✅ Can work with alerts, frames, windows

### Week 5 Checkpoint (Day 30):
- ✅ Have created POM structure
- ✅ Can run data-driven tests
- ✅ Can generate TestNG reports
- ✅ Can execute tests in parallel

### Final Checkpoint (Day 45):
- ✅ Complete framework built and documented
- ✅ Can explain design decisions
- ✅ Ready for QA Automation Engineer roles
- ✅ Portfolio project on GitHub
- ✅ Confident in interviews

---

## 🎓 Certification Recommendations

### Selenium Certifications:
1. **Selenium WebDriver with Java** - Udemy
2. **Test Automation University** - Free courses
3. **ISTQB Certified Tester** - Foundation Level

### Additional Certifications:
1. **AWS Certified Cloud Practitioner**
2. **Docker Certified Associate**
3. **Jenkins Certified Engineer**

---

## 🤝 Community & Support

### Online Communities:
- [Selenium Users Group](https://groups.google.com/g/selenium-users)
- [Stack Overflow - Selenium Tag](https://stackoverflow.com/questions/tagged/selenium)
- [Reddit - r/selenium](https://www.reddit.com/r/selenium/)
- [LinkedIn Selenium Groups](https://www.linkedin.com/groups/)

### GitHub Repositories:
- [Selenium Official](https://github.com/SeleniumHQ/selenium)
- [Awesome Selenium](https://github.com/christian-bromann/awesome-selenium)

---

## ⚠️ Important Notes

### Prerequisites:
- ✅ **Java fundamentals required** (covered in separate 30-day Java course)
- ✅ Basic understanding of HTML/CSS
- ✅ Familiarity with web browsers
- ✅ Basic command line knowledge

### Course Focus:
- ✅ **100% Selenium-focused** - No Java basics covered
- ✅ Practical, hands-on approach
- ✅ Industry-standard practices
- ✅ Job-ready skills
- ✅ Real-world projects

### Time Commitment:
- **Minimum**: 3-4 hours/day
- **Recommended**: 5-6 hours/day for faster completion
- **Total**: 135-180 hours over 45 days

---

## 🎉 Final Words

**Congratulations on choosing Selenium automation!**

This 45-day course is designed to transform you from a beginner to a job-ready QA Automation Engineer. Remember:

1. **Practice Daily**: Consistency is key
2. **Build Projects**: Portfolio matters
3. **Ask Questions**: Join communities
4. **Stay Updated**: Selenium evolves
5. **Network**: Connect with professionals

**Your Goal**: By Day 45, have a complete, professional Selenium automation framework on GitHub that you can showcase in interviews.

**Remember**: This course assumes you have completed the Java fundamentals course. If not, please complete that first!

---

**🎯 Ready to Start?**

Begin your Selenium journey with [Day 1: Selenium Introduction & Environment Setup](#day-1-selenium-introduction--environment-setup)

---

*Last Updated: 2026-01-14*
*Course Type: Pure Selenium Automation (No Java Basics)*
*Target Role: QA Automation Engineer / SDET*
*Prerequisites: Java Fundamentals (30-day course)*

---

**Good luck with your automation journey! 🚀**
