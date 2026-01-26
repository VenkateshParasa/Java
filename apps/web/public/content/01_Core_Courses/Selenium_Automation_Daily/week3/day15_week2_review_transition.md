# Day 15: Week 2 Review & Transition to Testing Frameworks

## Learning Objectives

By the end of this lesson, you will be able to:
- Review and consolidate Week 2 concepts
- Understand the limitations of current approach
- Recognize the need for testing frameworks
- Prepare for TestNG framework introduction
- Identify areas for improvement in test automation
- Plan for scalable test architecture

---

## 1. Week 2 Comprehensive Review

### 1.1 Actions Class Mastery

**Key Concepts Covered:**
- Mouse actions (hover, click, double-click, right-click)
- Keyboard actions (key press, key combinations)
- Drag and drop operations
- Action chains and complex interactions

**Practical Application:**
```java
Actions actions = new Actions(driver);

// Mouse hover
actions.moveToElement(element).perform();

// Drag and drop
actions.dragAndDrop(source, target).perform();

// Complex action chain
actions.moveToElement(menu)
       .click(submenu)
       .sendKeys(Keys.ARROW_DOWN)
       .sendKeys(Keys.ENTER)
       .perform();
```

### 1.2 Web Tables Handling

**Key Concepts:**
- Static table navigation
- Dynamic table handling
- Row and column iteration
- Cell data extraction
- Table sorting and filtering

**Common Patterns:**
```java
// Get all rows
List<WebElement> rows = driver.findElements(By.xpath("//table//tr"));

// Get specific cell
WebElement cell = driver.findElement(
    By.xpath("//table//tr[2]//td[3]")
);

// Iterate through table
for (WebElement row : rows) {
    List<WebElement> cells = row.findElements(By.tagName("td"));
    for (WebElement cell : cells) {
        System.out.println(cell.getText());
    }
}
```

### 1.3 File Operations

**Upload Techniques:**
- SendKeys method
- Robot class
- AutoIT integration
- JavaScript executor

**Download Verification:**
- File existence check
- Content validation
- Download directory management

### 1.4 JavaScript Executor

**Advanced Operations:**
- Scrolling strategies
- Element manipulation
- Hidden element interaction
- AJAX handling
- Custom JavaScript execution

**Power Techniques:**
```java
JavascriptExecutor js = (JavascriptExecutor) driver;

// Scroll to element
js.executeScript("arguments[0].scrollIntoView(true);", element);

// Click hidden element
js.executeScript("arguments[0].click();", element);

// Get page load status
String status = js.executeScript("return document.readyState").toString();
```

### 1.5 Advanced Scenarios

**Complex Workflows:**
- Multi-step processes
- Conditional logic
- Error recovery
- Dynamic content handling
- Real-world application testing

---

## 2. Current Approach Limitations

### 2.1 Code Organization Issues

**Problem: Scattered Test Code**
```java
// Current approach - everything in one class
public class LoginTests {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        // Test 1
        driver.get("https://example.com");
        driver.findElement(By.id("username")).sendKeys("user1");
        driver.findElement(By.id("password")).sendKeys("pass1");
        driver.findElement(By.id("login")).click();
        // Verification
        
        // Test 2
        driver.get("https://example.com");
        driver.findElement(By.id("username")).sendKeys("user2");
        // ... more code
        
        driver.quit();
    }
}
```

**Issues:**
- ❌ No test isolation
- ❌ Difficult to maintain
- ❌ Hard to run specific tests
- ❌ No test reporting
- ❌ Cannot run tests in parallel

### 2.2 Lack of Test Management

**Missing Capabilities:**
- No test grouping
- No test dependencies
- No test prioritization
- No test execution control
- No built-in assertions
- No test lifecycle management

### 2.3 Reporting Challenges

**Current State:**
```java
// Manual verification
if (element.isDisplayed()) {
    System.out.println("Test Passed");
} else {
    System.out.println("Test Failed");
}
```

**Problems:**
- ❌ No standardized reporting
- ❌ No test execution summary
- ❌ No failure screenshots
- ❌ No execution time tracking
- ❌ No test history

### 2.4 Reusability Issues

**Code Duplication:**
```java
// Repeated in every test
WebDriver driver = new ChromeDriver();
driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// ... test code ...

driver.quit();
```

**Maintenance Nightmare:**
- Change browser? Update everywhere
- Change timeout? Update everywhere
- Add new setup step? Update everywhere

---

## 3. Introduction to Testing Frameworks

### 3.1 What is a Testing Framework?

**Definition:**
A testing framework is a set of guidelines, tools, and practices that provide a structured approach to test automation.

**Key Components:**
1. **Test Runner:** Executes tests
2. **Assertions:** Verify expected outcomes
3. **Annotations:** Define test lifecycle
4. **Reporting:** Generate test results
5. **Configuration:** Manage test settings

### 3.2 Why TestNG?

**TestNG Benefits:**
- ✅ Powerful annotations (@Test, @BeforeMethod, @AfterMethod)
- ✅ Flexible test configuration
- ✅ Parallel test execution
- ✅ Data-driven testing support
- ✅ Dependency management
- ✅ Comprehensive reporting
- ✅ Integration with build tools

**TestNG vs JUnit:**
```
TestNG Advantages:
- More annotations
- Better parallel execution
- Flexible test configuration
- Built-in data providers
- Test dependencies
- Better reporting

JUnit Advantages:
- Simpler for basic tests
- Wider adoption
- Better IDE integration
```

### 3.3 Framework Architecture Preview

**What We'll Build:**
```
Test Automation Framework
├── Test Layer (TestNG tests)
├── Page Object Layer (Page classes)
├── Utility Layer (Helpers, utilities)
├── Configuration Layer (Properties, settings)
├── Reporting Layer (ExtentReports, logs)
└── Data Layer (Test data, Excel, JSON)
```

---

## 4. Preparing for TestNG

### 4.1 Current vs Future Approach

**Current Approach:**
```java
public class LoginTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Test logic
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("password");
        driver.findElement(By.id("login")).click();
        
        // Manual verification
        if (driver.findElement(By.id("dashboard")).isDisplayed()) {
            System.out.println("Login successful");
        }
        
        driver.quit();
    }
}
```

**TestNG Approach (Preview):**
```java
public class LoginTest extends BaseTest {
    
    @Test(priority = 1, description = "Verify valid user can login")
    public void testValidLogin() {
        loginPage.enterUsername("testuser");
        loginPage.enterPassword("password");
        HomePage homePage = loginPage.clickLogin();
        
        Assert.assertTrue(homePage.isDashboardDisplayed(), 
            "Dashboard should be displayed after login");
    }
    
    @Test(priority = 2, description = "Verify invalid credentials show error")
    public void testInvalidLogin() {
        loginPage.enterUsername("invalid");
        loginPage.enterPassword("wrong");
        loginPage.clickLogin();
        
        Assert.assertTrue(loginPage.isErrorDisplayed(), 
            "Error message should be displayed");
    }
}
```

**Improvements:**
- ✅ Clean test methods
- ✅ Built-in assertions
- ✅ Test descriptions
- ✅ Test prioritization
- ✅ Automatic reporting
- ✅ Setup/teardown handled by BaseTest

### 4.2 Test Organization

**Future Structure:**
```
src/test/java/
├── tests/
│   ├── BaseTest.java
│   ├── LoginTest.java
│   ├── CheckoutTest.java
│   └── SearchTest.java
├── pages/
│   ├── BasePage.java
│   ├── LoginPage.java
│   └── HomePage.java
└── utils/
    ├── ConfigReader.java
    └── TestUtils.java
```

### 4.3 Configuration Management

**Current:**
```java
// Hardcoded everywhere
driver.get("https://example.com");
```

**Future:**
```java
// Centralized configuration
driver.get(ConfigReader.getProperty("base.url"));
```

---

## 5. Key Concepts for Next Week

### 5.1 Annotations

**TestNG Annotations Preview:**
```java
@BeforeSuite    // Runs once before all tests
@BeforeTest     // Runs before each <test> tag
@BeforeClass    // Runs once before class
@BeforeMethod   // Runs before each @Test method
@Test           // Marks a test method
@AfterMethod    // Runs after each @Test method
@AfterClass     // Runs once after class
@AfterTest      // Runs after each <test> tag
@AfterSuite     // Runs once after all tests
```

### 5.2 Assertions

**TestNG Assertions:**
```java
Assert.assertEquals(actual, expected);
Assert.assertTrue(condition);
Assert.assertFalse(condition);
Assert.assertNotNull(object);
Assert.fail("Test failed");
```

### 5.3 Test Configuration

**testng.xml Preview:**
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Test Suite">
    <test name="Login Tests">
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
</suite>
```

---

## 6. Transition Checklist

### 6.1 Skills Acquired (Week 1-2)

- [x] Selenium WebDriver basics
- [x] Element locators (8 types)
- [x] WebDriver commands
- [x] Wait strategies
- [x] Dropdowns, alerts, frames
- [x] Actions class
- [x] Web tables handling
- [x] File upload/download
- [x] JavaScript executor
- [x] Advanced scenarios

### 6.2 Skills to Learn (Week 3+)

- [ ] TestNG framework
- [ ] Test annotations
- [ ] Assertions
- [ ] Test configuration
- [ ] Parallel execution
- [ ] Data-driven testing
- [ ] Page Object Model
- [ ] Reporting
- [ ] Logging
- [ ] CI/CD integration

### 6.3 Mindset Shift

**From:**
- Writing scripts
- Manual verification
- Scattered code
- One-time execution

**To:**
- Writing tests
- Automated assertions
- Organized framework
- Repeatable execution
- Continuous integration

---

## Common Mistakes to Avoid

### 1. Continuing with main() Method for All Tests
**Problem**: Developers keep using `public static void main()` for running tests instead of adopting a framework.
**Why It's Wrong**: No test management, no reporting, difficult to maintain, cannot run tests in parallel, and no standardized assertions.
**Correct Approach**: Transition to TestNG or JUnit framework with proper test annotations.
```java
// Wrong way
public class LoginTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        // Test logic here
        driver.quit();
    }
}

// Correct way
public class LoginTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
    }

    @Test
    public void testValidLogin() {
        // Test logic with assertions
        Assert.assertTrue(condition);
    }

    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}
```

### 2. Hardcoding Values Throughout Tests
**Problem**: URLs, credentials, timeouts, and locators are hardcoded directly in test methods.
**Why It's Wrong**: Changes require updating multiple files, environment-specific values cannot be managed, and tests are not portable.
**Correct Approach**: Externalize configuration to properties files or constants classes.
```java
// Wrong way
driver.get("https://example.com/login");
driver.findElement(By.id("username")).sendKeys("testuser");
Thread.sleep(5000);

// Correct way
driver.get(ConfigReader.getProperty("base.url"));
driver.findElement(By.id("username")).sendKeys(TestData.getUsername());
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(
    Integer.parseInt(ConfigReader.getProperty("explicit.wait"))));
```

### 3. Not Using Assertions, Only Print Statements
**Problem**: Relying on `System.out.println()` to verify test results instead of using assertions.
**Why It's Wrong**: Tests don't actually fail when conditions aren't met, no automated pass/fail tracking, and manual verification is required.
**Correct Approach**: Use TestNG or JUnit assertions for all verifications.
```java
// Wrong way
if (driver.getTitle().equals("Dashboard")) {
    System.out.println("Test Passed");
} else {
    System.out.println("Test Failed");
}

// Correct way
Assert.assertEquals(driver.getTitle(), "Dashboard",
    "User should be on Dashboard after login");
```

### 4. Creating New Driver Instance for Each Test in Same Class
**Problem**: Manually creating and destroying WebDriver for every single test without using setup/teardown methods.
**Why It's Wrong**: Code duplication, inconsistent setup, maintenance nightmare, and missing centralized configuration.
**Correct Approach**: Use @BeforeMethod and @AfterMethod to manage WebDriver lifecycle.
```java
// Wrong way
@Test
public void test1() {
    WebDriver driver = new ChromeDriver();
    driver.manage().window().maximize();
    // test logic
    driver.quit();
}

@Test
public void test2() {
    WebDriver driver = new ChromeDriver();
    driver.manage().window().maximize();
    // test logic
    driver.quit();
}

// Correct way
WebDriver driver;

@BeforeMethod
public void setup() {
    driver = new ChromeDriver();
    driver.manage().window().maximize();
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
}

@Test
public void test1() {
    // test logic
}

@Test
public void test2() {
    // test logic
}

@AfterMethod
public void teardown() {
    if (driver != null) {
        driver.quit();
    }
}
```

### 5. Mixing Test Logic with Page Interactions
**Problem**: All element locators, actions, and test logic are in the same test method.
**Why It's Wrong**: Not reusable, difficult to maintain, violates Single Responsibility Principle, and changes to UI require test changes.
**Correct Approach**: Separate page interactions into Page Object classes (coming in Week 4).
```java
// Wrong way
@Test
public void testLogin() {
    driver.findElement(By.id("username")).sendKeys("user");
    driver.findElement(By.id("password")).sendKeys("pass");
    driver.findElement(By.id("loginBtn")).click();
    Assert.assertTrue(driver.findElement(By.id("dashboard")).isDisplayed());
}

// Correct way (with Page Object)
@Test
public void testLogin() {
    LoginPage loginPage = new LoginPage(driver);
    DashboardPage dashboard = loginPage.login("user", "pass");
    Assert.assertTrue(dashboard.isDashboardDisplayed());
}
```

### 6. Not Planning for Framework Architecture
**Problem**: Starting to write tests without thinking about overall framework structure and organization.
**Why It's Wrong**: Results in disorganized code, difficult to scale, hard to add new features, and inconsistent patterns.
**Correct Approach**: Plan framework layers: tests, pages, utilities, configuration, and data.
```java
// Plan your structure
src/test/java/
├── tests/           // Test classes
├── pages/           // Page Object classes
├── utils/           // Utility classes
├── config/          // Configuration readers
├── data/            // Test data providers
└── base/            // Base test class
```

---

## Best Practices

### 1. Create a Base Test Class
**Why**: Centralizes common setup and teardown logic, ensures consistency across all tests, and reduces code duplication.
**How**: Create a BaseTest class that all test classes extend, containing WebDriver initialization, browser configuration, and common utilities.
```java
public class BaseTest {
    protected WebDriver driver;
    protected String baseUrl;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        baseUrl = ConfigReader.getProperty("base.url");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    protected void takeScreenshot(String testName) {
        // Screenshot utility
    }
}

// All tests extend BaseTest
public class LoginTest extends BaseTest {
    @Test
    public void testLogin() {
        driver.get(baseUrl);
        // Test logic
    }
}
```

### 2. Use Meaningful Test and Method Names
**Why**: Improves code readability, makes test reports clearer, and helps in debugging failures.
**How**: Use descriptive names that explain what the test does, follow naming conventions, and add descriptions.
```java
// Good naming
@Test(description = "Verify user can login with valid credentials")
public void testLoginWithValidCredentials() { }

@Test(description = "Verify error message for invalid password")
public void testLoginWithInvalidPasswordShowsError() { }

// Avoid
@Test
public void test1() { }

@Test
public void loginTest() { }
```

### 3. Externalize Configuration and Test Data
**Why**: Makes tests environment-independent, easy to run in different environments, and separates test data from test logic.
**How**: Use properties files, JSON, or Excel for configuration and test data.
```java
// config.properties
base.url=https://qa.example.com
browser=chrome
implicit.wait=10
explicit.wait=20

// Usage in tests
public class ConfigReader {
    private static Properties properties;

    static {
        try {
            FileInputStream fis = new FileInputStream("config.properties");
            properties = new Properties();
            properties.load(fis);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }
}

// In tests
String url = ConfigReader.getProperty("base.url");
```

### 4. Organize Tests into Logical Test Suites
**Why**: Enables running specific test groups (smoke, regression), better test organization, and faster feedback.
**How**: Use testng.xml to create different suites for different purposes.
```xml
<!-- smoke-tests.xml -->
<suite name="Smoke Test Suite">
    <test name="Critical Path Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.HomePageTest"/>
        </classes>
    </test>
</suite>

<!-- regression-tests.xml -->
<suite name="Full Regression Suite">
    <test name="All Tests">
        <packages>
            <package name="tests.*"/>
        </packages>
    </test>
</suite>
```

### 5. Implement Proper Logging and Reporting
**Why**: Helps in debugging failures, provides execution history, and creates evidence of test execution.
**How**: Use logging frameworks and screenshot capture, especially on failures.
```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LoginTest extends BaseTest {
    private static final Logger logger = LogManager.getLogger(LoginTest.class);

    @Test
    public void testLogin() {
        logger.info("Starting login test");
        driver.get(baseUrl);
        logger.info("Navigated to: " + baseUrl);

        loginPage.enterCredentials("user", "pass");
        logger.info("Entered credentials");

        loginPage.clickLogin();
        logger.info("Clicked login button");

        Assert.assertTrue(dashboard.isDisplayed());
        logger.info("Login successful - test passed");
    }

    @AfterMethod
    public void afterMethod(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE) {
            logger.error("Test failed: " + result.getName());
            takeScreenshot(result.getName());
        }
        tearDown();
    }
}
```

### 6. Follow the DRY Principle (Don't Repeat Yourself)
**Why**: Reduces maintenance effort, ensures consistency, and makes code more manageable.
**How**: Create utility methods for common operations, use helper classes, and avoid code duplication.
```java
// Create utility class for common operations
public class SeleniumUtils {

    public static void waitAndClick(WebDriver driver, By locator) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
        element.click();
    }

    public static void waitAndSendKeys(WebDriver driver, By locator, String text) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }

    public static boolean isElementDisplayed(WebDriver driver, By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}

// Use in tests
SeleniumUtils.waitAndClick(driver, By.id("loginBtn"));
SeleniumUtils.waitAndSendKeys(driver, By.id("username"), "testuser");
```

### 7. Plan for Scalability from Day One
**Why**: Easier to add new tests, supports team growth, and maintains code quality as project grows.
**How**: Design framework architecture with clear separation of concerns and modular structure.
```java
// Framework structure planning
Framework/
├── src/test/java/
│   ├── base/
│   │   └── BaseTest.java          // Common setup/teardown
│   ├── pages/
│   │   ├── BasePage.java          // Common page methods
│   │   ├── LoginPage.java
│   │   └── HomePage.java
│   ├── tests/
│   │   ├── LoginTests.java
│   │   └── CheckoutTests.java
│   ├── utils/
│   │   ├── ConfigReader.java
│   │   ├── SeleniumUtils.java
│   │   └── ScreenshotUtils.java
│   └── data/
│       └── TestDataProvider.java
├── src/test/resources/
│   ├── config.properties
│   ├── testdata.xlsx
│   └── log4j2.xml
└── test-suites/
    ├── smoke-suite.xml
    └── regression-suite.xml
```

---

## 7. Beginner-Friendly Exercises

### Exercise 1: Code Analysis & Refactoring Plan

**Objective:** Identify improvement areas in existing Selenium code to prepare for framework adoption.

**Scenario:** You have a basic Selenium script that tests login functionality. Analyze it and identify what needs improvement before moving to TestNG.

**Requirements:**
1. Review the provided code sample
2. List all repeated code blocks
3. Identify hardcoded values
4. Note manual verifications that should be assertions
5. Document setup/teardown duplication

**Code Sample to Analyze:**
```java
public class LoginScript {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        // Test 1: Valid login
        driver.get("https://example.com/login");
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("pass123");
        driver.findElement(By.id("loginBtn")).click();
        if (driver.getCurrentUrl().contains("dashboard")) {
            System.out.println("Test 1 Passed");
        }
        driver.quit();

        // Test 2: Invalid login
        WebDriver driver2 = new ChromeDriver();
        driver2.manage().window().maximize();
        driver2.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver2.get("https://example.com/login");
        driver2.findElement(By.id("username")).sendKeys("wronguser");
        driver2.findElement(By.id("password")).sendKeys("wrongpass");
        driver2.findElement(By.id("loginBtn")).click();
        if (driver2.findElement(By.className("error")).isDisplayed()) {
            System.out.println("Test 2 Passed");
        }
        driver2.quit();
    }
}
```

**Expected Outcome:**
- Documented list of at least 5 improvement areas
- Identified all repeated setup code
- Listed all hardcoded values (URLs, credentials, locators)
- Noted manual verifications that need assertions

**Solution Approach:**
1. Create a document listing issues found
2. Categorize issues: duplication, hardcoding, verification, structure
3. For each issue, note why it's problematic
4. Suggest how TestNG would solve each issue

**Common Mistakes to Avoid:**
- Ignoring subtle duplication like browser setup
- Missing hardcoded values in locators
- Not recognizing manual verifications as a problem
- Focusing only on obvious issues

---

### Exercise 2: Test Case Planning for Framework

**Objective:** Plan comprehensive test cases for a feature in a framework-ready structure.

**Scenario:** You need to test a login feature. Create a detailed test plan that's ready for TestNG implementation.

**Requirements:**
1. Design at least 6 test cases covering different scenarios
2. Include test case ID, description, test data, and expected result
3. Identify which tests should be in smoke vs regression groups
4. Plan test dependencies (which tests must run before others)
5. Assign priority to each test

**Test Case Template:**
```
Test ID: TC_LOGIN_001
Description: Verify successful login with valid credentials
Test Data: username=validuser@example.com, password=Valid@123
Priority: High
Group: Smoke
Depends On: None
Expected Result: User redirected to dashboard
```

**Expected Outcome:**
- At least 6 well-structured test cases
- Clear categorization (smoke, regression)
- Logical test priorities
- Identified dependencies

**Solution Approach:**
1. Start with positive scenarios (valid login)
2. Add negative scenarios (invalid credentials, empty fields)
3. Consider edge cases (special characters, SQL injection)
4. Think about UI validation (error messages, field validation)
5. Plan security tests (password masking, session timeout)

**Common Mistakes to Avoid:**
- Creating only happy path tests
- Ignoring edge cases and boundary values
- Not considering security aspects
- Missing UI validation tests
- Poor test case organization

---

### Exercise 3: Test Data Structure Design

**Objective:** Design a maintainable test data structure for data-driven testing.

**Scenario:** Create a test data structure that can be easily used with TestNG DataProviders.

**Requirements:**
1. Design data structure for login tests (valid and invalid scenarios)
2. Include at least 5 data sets
3. Plan structure for different test types (login, search, checkout)
4. Document how data will be organized
5. Consider future scalability

**Expected Outcome:**
```java
// Login Test Data
String[][] loginData = {
    // username, password, expectedResult, errorMessage
    {"validuser@test.com", "Pass@123", "success", ""},
    {"invaliduser@test.com", "wrong", "fail", "Invalid credentials"},
    {"", "Pass@123", "fail", "Username required"},
    {"validuser@test.com", "", "fail", "Password required"},
    {"admin@test.com", "Admin@123", "success", ""}
};

// Search Test Data
String[][] searchData = {
    // searchTerm, expectedCount, category
    {"laptop", "10+", "electronics"},
    {"book", "20+", "books"},
    {"xyz123", "0", "all"}
};
```

**Solution Approach:**
1. Identify all fields needed for each test type
2. Use 2D arrays for TestNG DataProvider compatibility
3. Include expected results in data structure
4. Group related data together
5. Document data structure format

**Common Mistakes to Avoid:**
- Creating inconsistent data structures
- Missing expected results in test data
- Not planning for negative scenarios
- Hardcoding data instead of externalizing
- Poor data organization

---

### Exercise 4: Migration Planning - From Script to Framework

**Objective:** Create a detailed plan to migrate existing scripts to TestNG framework.

**Scenario:** You have 10 existing Selenium scripts that need to be converted to TestNG tests.

**Requirements:**
1. Create a migration checklist
2. Identify common setup code to extract to @BeforeMethod
3. Plan test class structure
4. Design base test class
5. Document step-by-step migration process

**Expected Outcome:**
```
Migration Plan:
1. Analysis Phase
   - Review all 10 scripts
   - Identify common patterns
   - List all unique test scenarios

2. Design Phase
   - Create BaseTest class with setup/teardown
   - Design test class hierarchy
   - Plan testng.xml structure

3. Implementation Phase
   - Convert main() methods to @Test methods
   - Extract setup to @BeforeMethod
   - Replace manual verifications with Assert
   - Group tests (smoke, regression)

4. Validation Phase
   - Run all converted tests
   - Compare results with original scripts
   - Fix any failures
```

**Solution Approach:**
1. Start with analysis of existing code
2. Identify reusable components
3. Create base classes first
4. Convert one script as template
5. Apply template to remaining scripts

**Common Mistakes to Avoid:**
- Converting everything at once without planning
- Not creating base classes
- Skipping validation phase
- Not documenting the process
- Ignoring code organization

---

### Exercise 5: Base Test Class Design

**Objective:** Design a robust base test class that all test classes will extend.

**Scenario:** Create a BaseTest class with proper setup, teardown, and utility methods.

**Requirements:**
1. Include WebDriver initialization
2. Add browser configuration methods
3. Implement common utility methods
4. Add proper error handling
5. Include logging statements

**Code Template:**
```java
public class BaseTest {
    protected WebDriver driver;
    protected String baseUrl;

    // TODO: Add @BeforeMethod for setup
    // TODO: Add @AfterMethod for teardown
    // TODO: Add utility methods (takeScreenshot, waitForElement)
    // TODO: Add browser factory method
    // TODO: Add logging
}
```

**Expected Outcome:**
```java
public class BaseTest {
    protected WebDriver driver;
    protected String baseUrl = "https://example.com";

    @BeforeMethod
    public void setup() {
        System.out.println("Setting up browser...");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @AfterMethod
    public void teardown() {
        System.out.println("Closing browser...");
        if (driver != null) {
            driver.quit();
        }
    }

    // Utility methods
    protected void takeScreenshot(String testName) {
        // Screenshot implementation
    }

    protected void waitForElement(By locator, int seconds) {
        // Explicit wait implementation
    }
}
```

**Solution Approach:**
1. Start with basic setup/teardown
2. Add WebDriver management
3. Implement utility methods
4. Add error handling
5. Include logging for debugging

**Common Mistakes to Avoid:**
- Not handling driver cleanup properly
- Missing null checks
- Hardcoding values instead of using variables
- Not making methods reusable
- Forgetting error handling

---

### Exercise 6: TestNG Configuration File Planning

**Objective:** Design testng.xml files for different test execution scenarios.

**Scenario:** Create multiple testng.xml configurations for smoke tests, regression tests, and full suite.

**Requirements:**
1. Create smoke-suite.xml for quick validation
2. Create regression-suite.xml for comprehensive testing
3. Create master-suite.xml that includes both
4. Configure parallel execution
5. Add parameters for browser and environment

**Expected Outcome:**
```xml
<!-- smoke-suite.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Smoke Test Suite" parallel="methods" thread-count="2">
    <parameter name="browser" value="chrome"/>
    <parameter name="env" value="QA"/>

    <test name="Critical Smoke Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.HomePageTest"/>
        </classes>
    </test>
</suite>

<!-- regression-suite.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Regression Suite" parallel="classes" thread-count="3">
    <parameter name="browser" value="chrome"/>
    <parameter name="env" value="QA"/>

    <test name="Full Regression">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
            <class name="tests.PaymentTest"/>
        </classes>
    </test>
</suite>
```

**Solution Approach:**
1. Identify test categories (smoke, regression)
2. Group related tests together
3. Configure appropriate parallel execution
4. Add parameters for flexibility
5. Test each configuration

**Common Mistakes to Avoid:**
- Not testing suite files before committing
- Missing DOCTYPE declaration
- Incorrect class paths
- Over-complicating parallel execution
- Not using parameters effectively

---

## 8. Week 2 Key Takeaways

### 8.1 Technical Skills

1. **Actions Class:** Master complex user interactions
2. **Web Tables:** Navigate and extract data efficiently
3. **File Operations:** Handle uploads and downloads
4. **JavaScript Executor:** Overcome WebDriver limitations
5. **Advanced Scenarios:** Solve real-world problems

### 8.2 Best Practices Learned

- Always use explicit waits
- Handle exceptions properly
- Verify actions with assertions
- Keep code modular
- Use meaningful variable names
- Comment complex logic

### 8.3 Common Pitfalls Avoided

- ❌ Using Thread.sleep()
- ❌ Ignoring StaleElementReferenceException
- ❌ Not handling dynamic content
- ❌ Hardcoding test data
- ❌ Skipping error handling

---

## 9. Looking Ahead: Week 3 Preview

### 9.1 What's Coming

**Day 16:** Screenshots & Visual Testing
**Day 17:** Browser Options & Capabilities
**Day 18-22:** TestNG Framework (5 days)

### 9.2 Prerequisites

Before starting Week 3:
- [ ] Review Week 1-2 content
- [ ] Practice all exercises
- [ ] Understand WebDriver basics
- [ ] Comfortable with locators
- [ ] Familiar with waits

### 9.3 Tools to Install

```bash
# Maven dependency for TestNG
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.8.0</version>
    <scope>test</scope>
</dependency>
```

---

## 10. Self-Assessment

### 10.1 Week 2 Quiz

Test your knowledge:

1. **What is the Actions class used for?**
   - Complex user interactions

2. **How do you handle dynamic web tables?**
   - Use dynamic XPath with row/column indices

3. **What are the file upload methods?**
   - sendKeys(), Robot class, AutoIT

4. **When to use JavaScript Executor?**
   - Hidden elements, scrolling, AJAX

5. **What's the limitation of current approach?**
   - No test framework, poor organization

### 10.2 Readiness Check

Rate yourself (1-5):
- [ ] Selenium basics: ___
- [ ] Locators: ___
- [ ] Waits: ___
- [ ] Actions class: ___
- [ ] Web tables: ___
- [ ] JavaScript executor: ___

**Target:** All ratings should be 4 or 5 before Week 3

---

## 11. Motivation & Next Steps

### 11.1 Your Progress

**Completed:**
- ✅ 14 days of intensive learning
- ✅ Selenium fundamentals
- ✅ Advanced interactions
- ✅ Real-world scenarios

**Achievement Unlocked:**
You can now automate complex web interactions!

### 11.2 What Makes You Ready

You're ready for TestNG because you:
1. Understand WebDriver thoroughly
2. Can locate elements reliably
3. Handle waits properly
4. Solve complex scenarios
5. Recognize current limitations

### 11.3 The Journey Ahead

**Week 3-4:** Testing frameworks & design patterns
**Week 5-6:** Advanced framework development
**Week 7:** Integration & capstone project

---

## 12. Final Thoughts

### 12.1 Reflection Questions

1. What was the most challenging concept in Week 2?
2. Which technique will you use most often?
3. What improvement areas did you identify?
4. How will TestNG solve current problems?

### 12.2 Preparation Tips

**For Week 3:**
- Review TestNG documentation
- Set up TestNG in your IDE
- Practice writing test methods
- Think in terms of test cases

**Mindset:**
- Embrace the framework approach
- Be patient with new concepts
- Practice consistently
- Ask questions when stuck

---

## Navigation

- **Previous:** [Day 14: Week 2 Review](../week2/day14_week2_review.md)
- **Next:** [Day 16: Screenshots & Visual Testing](./day16_screenshots_visual_testing.md)
- **Week 3 Home:** [Week 3 Overview](./README.md)

---

## Interview Questions

### Basic Level

1. **What are the main limitations of running Selenium tests without a testing framework?**
   - No test isolation (tests run in one main method), no standardized reporting, cannot run specific tests independently, difficult to maintain, no test lifecycle management (@Before/@After), no built-in assertions, and cannot run tests in parallel. All setup and teardown must be manually coded in each test class.

2. **What is TestNG and why is it preferred over the traditional main() method approach?**
   - TestNG is a testing framework that provides structure for test automation. It offers annotations for test lifecycle (@BeforeMethod, @AfterMethod, @Test), built-in assertions, flexible test configuration via testng.xml, parallel execution, data-driven testing, test dependencies, and comprehensive HTML reports. It eliminates code duplication and makes tests more maintainable.

3. **Explain the difference between @BeforeMethod and @BeforeClass annotations in TestNG.**
   - @BeforeMethod runs before each @Test method in the class, useful for browser initialization for each test. @BeforeClass runs once before all @Test methods in the class, suitable for one-time setup like reading configuration files. Example: if you have 5 @Test methods, @BeforeMethod runs 5 times but @BeforeClass runs only once.

4. **What is a Page Object Model (POM) and why will we learn it?**
   - POM is a design pattern that creates an object repository for web UI elements. Each web page has a corresponding page class containing locators and methods. It separates test logic from page-specific code, improves maintainability (UI changes only require updating page classes), promotes reusability, and makes tests more readable. We'll learn it in Week 4.

### Intermediate Level

5. **How does TestNG solve the code duplication problem that exists with the main() method approach?**
   - TestNG uses @BeforeMethod/@AfterMethod to centralize WebDriver setup and teardown. Instead of repeating `driver = new ChromeDriver(); driver.quit();` in every test, you write it once. Multiple tests inherit from BaseTest class containing common setup. Example: 10 tests need only one @BeforeMethod for driver initialization instead of 10 duplicate setups.

6. **What is the difference between using System.out.println() for verification versus using Assert statements?**
   - System.out.println() only displays messages but doesn't fail the test when conditions aren't met. Assert statements actually validate conditions and fail the test if assertions don't pass: `Assert.assertEquals(actual, expected, "Error message");` TestNG reports show pass/fail status, execution time, and failure reasons. println requires manual verification; asserts automate it.

7. **Explain the concept of test configuration externalization. Why is it important?**
   - Configuration externalization means storing test settings (URLs, browser types, timeouts) in external files (properties, JSON, XML) instead of hardcoding in test code. Benefits: easily switch between environments (dev/QA/prod), change settings without recompiling code, support multiple configurations, and enable team collaboration. Example: `driver.get(ConfigReader.getProperty("base.url"));` instead of `driver.get("https://example.com");`

8. **What is the role of a BaseTest class in a test automation framework?**
   - BaseTest is a parent class containing common setup/teardown methods that all test classes extend. It centralizes WebDriver initialization, browser configuration, implicit waits, and driver cleanup. All test classes inherit these capabilities. Example: `public class LoginTest extends BaseTest` automatically gets setUp() and tearDown() methods without duplicating code.

### Advanced Level

9. **Design a framework architecture for a Selenium test automation project. Explain each layer and its responsibilities.**
   - **Test Layer**: Contains test classes with @Test methods, assertions, and test data. **Page Object Layer**: Page classes with locators and page methods, one class per page. **Utility Layer**: Helper classes (ScreenshotUtils, WaitUtils, ExcelReader). **Configuration Layer**: Properties files, ConfigReader, constants. **Reporting Layer**: ExtentReports, listeners, log4j configuration. **Data Layer**: Test data in Excel/JSON/CSV, DataProvider classes. This separation ensures maintainability, reusability, and clear responsibilities.

10. **How would you implement a BrowserFactory pattern that supports multiple browsers and configurations? Provide design considerations.**
    - Create a BrowserFactory class with a method `getDriver(String browser)` that uses switch-case to return appropriate driver: Chrome, Firefox, Edge, Safari. Each case configures browser-specific options (ChromeOptions, FirefoxOptions). Design considerations: read browser type from config file, support headless mode for CI/CD, configure timeouts centrally, handle mobile emulation, add proxy support, implement ThreadLocal for parallel execution, and provide environment-specific configurations (local vs CI).

11. **Explain how you would migrate 20 existing Selenium scripts (with main methods) to a TestNG framework. What's your step-by-step approach?**
    - **Step 1**: Analyze existing scripts to identify common patterns and reusable code. **Step 2**: Create framework structure (tests/, pages/, utils/ folders). **Step 3**: Create BaseTest class with @BeforeMethod/@AfterMethod for setup/teardown. **Step 4**: Convert one script as template: replace main() with @Test, move setup to @BeforeMethod, add assertions. **Step 5**: Create page objects for frequently used pages. **Step 6**: Convert remaining scripts using the template. **Step 7**: Create testng.xml for test organization. **Step 8**: Validate all tests run successfully. **Step 9**: Implement reporting and logging.

12. **Compare the maintenance effort of 100 tests written without framework vs. with POM and TestNG. Provide specific scenarios.**
    - **Without framework**: If login button locator changes, must update 100 test files. Browser configuration change requires modifying 100 files. Adding a new common utility means copying code to 100 places. Generating reports needs custom code in each test. **With framework**: Locator change needs update in one LoginPage class. Browser config change in one BaseTest or config file. New utility added once in utils package. Reports generated automatically by TestNG. Maintenance time: 100 hours without framework vs. 5 hours with framework for major changes.

---

**Congratulations on completing Week 2!** 🎉

You've mastered advanced Selenium techniques and are now ready to learn professional testing frameworks. Week 3 will transform your automation scripts into a robust, maintainable test framework.

**Get ready for TestNG!** The real power of test automation begins now.