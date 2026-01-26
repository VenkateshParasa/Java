# Days 38-39: TestNG Framework - Beginner-Friendly Exercises

**Course:** Selenium Automation - 45 Day Course
**Section:** Week 6 - Framework Development
**Days:** 38-39
**Total Exercises:** 11 exercises (5 for Day 38, 6 for Day 39)
**Estimated Time:** 8-10 hours total
**Difficulty:** Intermediate to Advanced

---

## Table of Contents

### Day 38: TestNG Framework Basics
- Exercise 1: TestNG Setup & First Test (20 minutes)
- Exercise 2: Assertions in TestNG (25 minutes)
- Exercise 3: Test Execution Order (25 minutes)
- Exercise 4: TestNG Reports (20 minutes)
- Exercise 5: Basic Test Suite (25 minutes)

### Day 39: TestNG Advanced Configuration
- Exercise 1: @BeforeMethod and @AfterMethod (20 minutes)
- Exercise 2: @BeforeClass and @AfterClass (25 minutes)
- Exercise 3: @BeforeSuite and @AfterSuite (20 minutes)
- Exercise 4: Test Groups (30 minutes)
- Exercise 5: Parameters and DataProvider (30 minutes)
- Exercise 6: Parallel Execution (30 minutes)

---

# Day 38: TestNG Framework Basics

## Overview

TestNG (Test Next Generation) is a powerful testing framework for Java that makes test organization, execution, and reporting much easier than JUnit.

### Why TestNG?
- Better test organization with annotations
- Flexible test configuration
- Powerful assertions
- Built-in HTML reports
- Parallel execution support
- Test dependencies and prioritization

---

## Exercise 1: TestNG Setup & First Test (20 minutes)

### What You'll Learn
- Adding TestNG dependency to Maven project
- Creating your first TestNG test
- Using @Test annotation
- Running TestNG tests
- Understanding test results

### Step-by-Step Instructions

**Step 1:** Add TestNG dependency to pom.xml

```xml
<dependencies>
    <\!-- Selenium WebDriver -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>
    
    <\!-- TestNG -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.8.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

**Step 2:** Create FirstTestNGTest class

### Complete Code

```java
package day38;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class FirstTestNGTest {
    
    @Test
    public void testGoogleTitle() {
        System.out.println("=== Test 1: Google Title Test ===");
        
        // Setup WebDriver
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            // Navigate to Google
            driver.get("https://www.google.com");
            
            // Get page title
            String actualTitle = driver.getTitle();
            System.out.println("Actual Title: " + actualTitle);
            
            // Assert title contains "Google"
            Assert.assertTrue(actualTitle.contains("Google"), 
                "Title should contain 'Google'");
            
            System.out.println("✓ Test PASSED - Title contains Google");
            
        } finally {
            driver.quit();
        }
    }
    
    @Test
    public void testWikipediaTitle() {
        System.out.println("\n=== Test 2: Wikipedia Title Test ===");
        
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://www.wikipedia.org");
            
            String actualTitle = driver.getTitle();
            System.out.println("Actual Title: " + actualTitle);
            
            Assert.assertTrue(actualTitle.contains("Wikipedia"),
                "Title should contain 'Wikipedia'");
            
            System.out.println("✓ Test PASSED - Title contains Wikipedia");
            
        } finally {
            driver.quit();
        }
    }
    
    @Test
    public void testSeleniumDevTitle() {
        System.out.println("\n=== Test 3: Selenium.dev Title Test ===");
        
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://www.selenium.dev");
            
            String actualTitle = driver.getTitle();
            System.out.println("Actual Title: " + actualTitle);
            
            Assert.assertTrue(actualTitle.contains("Selenium"),
                "Title should contain 'Selenium'");
            
            System.out.println("✓ Test PASSED - Title contains Selenium");
            
        } finally {
            driver.quit();
        }
    }
}
```

### Expected Output

```
=== Test 1: Google Title Test ===
Actual Title: Google
✓ Test PASSED - Title contains Google

=== Test 2: Wikipedia Title Test ===
Actual Title: Wikipedia
✓ Test PASSED - Title contains Wikipedia

=== Test 3: Selenium.dev Title Test ===
Actual Title: Selenium
✓ Test PASSED - Title contains Selenium

===============================================
Default Suite
Total tests run: 3, Passes: 3, Failures: 0, Skips: 0
===============================================
```

### Success Criteria

✅ TestNG dependency added successfully  
✅ @Test annotation recognized by IDE  
✅ All 3 tests execute  
✅ All tests pass  
✅ TestNG report generated in test-output folder  

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Missing @Test annotation | Method won't be recognized as test | Add `@Test` above method |
| Wrong TestNG version | Compatibility issues | Use version 7.x or higher |
| Not closing driver | Memory leaks | Use try-finally or @AfterMethod |
| Missing scope=test in pom.xml | TestNG in production code | Add `<scope>test</scope>` |

### Key Learnings

1. **@Test Annotation**: Marks a method as a test case
2. **Assert Class**: TestNG's assertion methods for validation
3. **Test Execution**: TestNG runs all @Test methods automatically
4. **Test Reports**: Automatic HTML report generation
5. **Test Independence**: Each test runs independently

### Challenge Task

Create 3 more tests that verify:
- URL of a webpage
- Presence of a specific element
- Page load time is under 5 seconds

---

## Exercise 2: Assertions in TestNG (25 minutes)

### What You'll Learn
- Different types of assertions in TestNG
- Hard assertions vs soft assertions
- Using Assert class effectively
- Assertion messages for better debugging

### Complete Code

```java
package day38;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

public class TestNGAssertionsDemo {
    
    private WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @Test
    public void testHardAssertions() {
        System.out.println("=== Hard Assertions Test ===");
        
        driver.get("https://the-internet.herokuapp.com/login");
        
        // assertEquals - checks if two values are equal
        String expectedTitle = "The Internet";
        String actualTitle = driver.getTitle();
        Assert.assertEquals(actualTitle, expectedTitle, 
            "Title mismatch\!");
        System.out.println("✓ assertEquals passed");
        
        // assertTrue - checks if condition is true
        String currentUrl = driver.getUrl();
        Assert.assertTrue(currentUrl.contains("herokuapp"),
            "URL should contain 'herokuapp'");
        System.out.println("✓ assertTrue passed");
        
        // assertFalse - checks if condition is false
        Assert.assertFalse(currentUrl.contains("google"),
            "URL should not contain 'google'");
        System.out.println("✓ assertFalse passed");
        
        // assertNotNull - checks if object is not null
        WebElement usernameField = driver.findElement(By.id("username"));
        Assert.assertNotNull(usernameField, 
            "Username field should not be null");
        System.out.println("✓ assertNotNull passed");
        
        // assertNotEquals - checks if two values are not equal
        String username = "tomsmith";
        String password = "SuperSecretPassword\!";
        Assert.assertNotEquals(username, password,
            "Username and password should be different");
        System.out.println("✓ assertNotEquals passed");
        
        System.out.println("✅ All hard assertions passed\!");
    }
    
    @Test
    public void testSoftAssertions() {
        System.out.println("\n=== Soft Assertions Test ===");
        
        // Soft assertions don't stop execution on failure
        SoftAssert softAssert = new SoftAssert();
        
        driver.get("https://www.example.com");
        
        // This will fail but test continues
        softAssert.assertEquals(driver.getTitle(), "Wrong Title",
            "Title assertion");
        System.out.println("After first assertion");
        
        // This will pass
        softAssert.assertTrue(driver.getCurrentUrl().contains("example"),
            "URL assertion");
        System.out.println("After second assertion");
        
        // This will fail but test continues
        softAssert.assertFalse(driver.getPageSource().contains("Example"),
            "Page source assertion");
        System.out.println("After third assertion");
        
        // assertAll() must be called to report all failures
        System.out.println("\n📊 Calling assertAll()...");
        softAssert.assertAll();
    }
    
    @Test
    public void testLoginWithAssertions() {
        System.out.println("\n=== Login Test with Assertions ===");
        
        driver.get("https://the-internet.herokuapp.com/login");
        
        // Verify page elements before login
        WebElement usernameField = driver.findElement(By.id("username"));
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement loginButton = driver.findElement(By.cssSelector("button[type='submit']"));
        
        Assert.assertNotNull(usernameField, "Username field should exist");
        Assert.assertNotNull(passwordField, "Password field should exist");
        Assert.assertNotNull(loginButton, "Login button should exist");
        System.out.println("✓ All form elements present");
        
        // Perform login
        usernameField.sendKeys("tomsmith");
        passwordField.sendKeys("SuperSecretPassword\!");
        loginButton.click();
        
        // Wait for page load
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
        
        // Verify successful login
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("/secure"),
            "Should navigate to secure page after login");
        System.out.println("✓ Navigated to secure page");
        
        // Verify success message
        WebElement successMessage = driver.findElement(By.id("flash"));
        String messageText = successMessage.getText();
        Assert.assertTrue(messageText.contains("You logged into a secure area\!"),
            "Success message should be displayed");
        System.out.println("✓ Success message displayed");
        
        // Verify logout button exists
        WebElement logoutButton = driver.findElement(By.cssSelector("a[href='/logout']"));
        Assert.assertTrue(logoutButton.isDisplayed(),
            "Logout button should be visible");
        System.out.println("✓ Logout button visible");
        
        System.out.println("✅ Login test passed with all assertions\!");
    }
    
    @AfterMethod
    public void teardown() {
        if (driver \!= null) {
            driver.quit();
        }
    }
}
```

### Expected Output

```
=== Hard Assertions Test ===
✓ assertEquals passed
✓ assertTrue passed
✓ assertFalse passed
✓ assertNotNull passed
✓ assertNotEquals passed
✅ All hard assertions passed\!
PASSED: testHardAssertions

=== Soft Assertions Test ===
After first assertion
After second assertion
After third assertion

📊 Calling assertAll()...
FAILED: testSoftAssertions
java.lang.AssertionError: The following asserts failed:
	Title assertion expected [Wrong Title] but found [Example Domain],
	Page source assertion expected [false] but found [true]

=== Login Test with Assertions ===
✓ All form elements present
✓ Navigated to secure page
✓ Success message displayed
✓ Logout button visible
✅ Login test passed with all assertions\!
PASSED: testLoginWithAssertions

===============================================
Default Suite
Total tests run: 3, Passes: 2, Failures: 1, Skips: 0
===============================================
```

### Success Criteria

✅ All assertion types demonstrated  
✅ Hard assertions stop test on failure  
✅ Soft assertions collect all failures  
✅ Assertion messages provide clear feedback  
✅ Login test with multiple assertions passes  

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Not calling softAssert.assertAll() | Soft assertion failures not reported | Always call assertAll() at end |
| Poor assertion messages | Hard to debug failures | Provide descriptive messages |
| Too many assertions in one test | Hard to identify which failed | Group related assertions logically |
| Using assertEquals(boolean, boolean) | Use assertTrue/assertFalse instead | Choose appropriate assertion method |

### Key Learnings

1. **Hard Assertions**: Test stops on first failure (Assert class)
2. **Soft Assertions**: Collects all failures (SoftAssert class)
3. **Assertion Messages**: Third parameter provides failure context
4. **assertAll()**: Required for SoftAssert to report failures
5. **Assertion Types**: assertEquals, assertTrue, assertFalse, assertNotNull, assertNotEquals

### Challenge Task

Create a test that uses soft assertions to verify:
- Page title
- URL
- Presence of 5 different elements
- All should be validated even if some fail

---

## Exercise 3: Test Execution Order (25 minutes)

### What You'll Learn
- Controlling test execution order with priority
- Using dependsOnMethods for test dependencies
- Understanding alwaysRun attribute
- Best practices for test organization

### Complete Code

```java
package day38;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class TestExecutionOrderDemo {
    
    private WebDriver driver;
    private boolean loginSuccessful = false;
    
    @BeforeClass
    public void setup() {
        System.out.println("@BeforeClass: Setting up WebDriver\n");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    // Priority example - lower numbers run first
    @Test(priority = 1)
    public void test1_NavigateToLoginPage() {
        System.out.println("Test 1 (Priority=1): Navigating to login page");
        driver.get("https://the-internet.herokuapp.com/login");
        
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("/login"),
            "Should be on login page");
        System.out.println("✓ On login page\n");
    }
    
    @Test(priority = 2, dependsOnMethods = "test1_NavigateToLoginPage")
    public void test2_PerformLogin() {
        System.out.println("Test 2 (Priority=2, depends on test1): Performing login");
        
        WebElement username = driver.findElement(By.id("username"));
        WebElement password = driver.findElement(By.id("password"));
        WebElement loginBtn = driver.findElement(By.cssSelector("button[type='submit']"));
        
        username.sendKeys("tomsmith");
        password.sendKeys("SuperSecretPassword\!");
        loginBtn.click();
        
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
        
        String currentUrl = driver.getCurrentUrl();
        if (currentUrl.contains("/secure")) {
            loginSuccessful = true;
            System.out.println("✓ Login successful\n");
        } else {
            System.out.println("✗ Login failed\n");
        }
        
        Assert.assertTrue(loginSuccessful, "Login should be successful");
    }
    
    @Test(priority = 3, dependsOnMethods = "test2_PerformLogin")
    public void test3_VerifySecurePage() {
        System.out.println("Test 3 (Priority=3, depends on test2): Verifying secure page");
        
        if (\!loginSuccessful) {
            Assert.fail("Cannot verify secure page - login was not successful");
        }
        
        WebElement message = driver.findElement(By.id("flash"));
        Assert.assertTrue(message.getText().contains("You logged into"),
            "Success message should be displayed");
        System.out.println("✓ Success message verified\n");
    }
    
    @Test(priority = 4, dependsOnMethods = "test2_PerformLogin")
    public void test4_VerifyLogoutButton() {
        System.out.println("Test 4 (Priority=4, depends on test2): Verifying logout button");
        
        WebElement logoutBtn = driver.findElement(By.cssSelector("a[href='/logout']"));
        Assert.assertTrue(logoutBtn.isDisplayed(),
            "Logout button should be visible");
        System.out.println("✓ Logout button visible\n");
    }
    
    @Test(priority = 5, dependsOnMethods = "test4_VerifyLogoutButton", alwaysRun = true)
    public void test5_PerformLogout() {
        System.out.println("Test 5 (Priority=5, alwaysRun=true): Performing logout");
        
        try {
            WebElement logoutBtn = driver.findElement(By.cssSelector("a[href='/logout']"));
            logoutBtn.click();
            
            try { Thread.sleep(1000); } catch (InterruptedException e) {}
            
            String currentUrl = driver.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("/login"),
                "Should return to login page after logout");
            System.out.println("✓ Logged out successfully\n");
        } catch (Exception e) {
            System.out.println("Note: Logout ran even if dependent test failed (alwaysRun=true)\n");
        }
    }
    
    @AfterClass(alwaysRun = true)
    public void teardown() {
        System.out.println("@AfterClass: Closing browser");
        if (driver \!= null) {
            driver.quit();
        }
    }
}
```

### Expected Output

```
@BeforeClass: Setting up WebDriver

Test 1 (Priority=1): Navigating to login page
✓ On login page

Test 2 (Priority=2, depends on test1): Performing login
✓ Login successful

Test 3 (Priority=3, depends on test2): Verifying secure page
✓ Success message verified

Test 4 (Priority=4, depends on test2): Verifying logout button
✓ Logout button visible

Test 5 (Priority=5, alwaysRun=true): Performing logout
✓ Logged out successfully

@AfterClass: Closing browser

===============================================
Default Suite
Total tests run: 5, Passes: 5, Failures: 0, Skips: 0
===============================================
```

### Success Criteria

✅ Tests execute in priority order (1, 2, 3, 4, 5)  
✅ Dependent tests skip if dependency fails  
✅ alwaysRun tests execute even if dependency fails  
✅ Test flow follows logical sequence  
✅ All tests pass  

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Same priority for all tests | Unpredictable execution order | Use different priorities |
| Circular dependencies | Tests can't execute | Design linear dependencies |
| Not using alwaysRun for cleanup | Cleanup may be skipped | Use alwaysRun=true for cleanup tests |
| Too many dependencies | Hard to maintain | Keep dependencies minimal |

### Key Learnings

1. **priority**: Controls execution order (default = 0, lower runs first)
2. **dependsOnMethods**: Test only runs if specified methods pass
3. **alwaysRun**: Test runs even if dependencies fail (useful for cleanup)
4. **Test Naming**: Use prefixes like test1_, test2_ for clarity
5. **Dependencies**: Create logical test flows but avoid excessive coupling

### Challenge Task

Create a test suite with:
- 3 independent tests (no dependencies)
- 2 tests that depend on test 1
- 1 cleanup test that always runs

---

## Exercise 4: TestNG Reports (20 minutes)

### What You'll Learn
- Understanding TestNG HTML reports
- Reading test results
- Customizing report output
- Using System.out for better logging

### Complete Code

```java
package day38;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.Test;

public class TestNGReportsDemo {
    
    @Test
    public void testReportSuccess() {
        System.out.println("=== Successful Test Example ===");
        Reporter.log("Step 1: Starting test execution");
        Reporter.log("Step 2: Performing calculations");
        
        int result = 2 + 2;
        System.out.println("Calculation result: " + result);
        Reporter.log("Step 3: Validating result = " + result);
        
        Assert.assertEquals(result, 4, "Math should work\!");
        Reporter.log("Step 4: Test completed successfully");
        
        System.out.println("✓ Test PASSED\n");
    }
    
    @Test
    public void testReportFailure() {
        System.out.println("=== Failed Test Example ===");
        Reporter.log("Step 1: Starting test");
        Reporter.log("Step 2: Setting up test data");
        
        String expected = "Hello";
        String actual = "World";
        
        System.out.println("Expected: " + expected);
        System.out.println("Actual: " + actual);
        Reporter.log("Step 3: Comparing values - Expected: " + expected + ", Actual: " + actual);
        
        try {
            Assert.assertEquals(actual, expected, "Strings should match");
            Reporter.log("Step 4: Assertion passed");
        } catch (AssertionError e) {
            Reporter.log("Step 4: Assertion FAILED - " + e.getMessage());
            System.out.println("✗ Test FAILED\n");
            throw e;
        }
    }
    
    @Test
    public void testDetailedLogging() {
        System.out.println("=== Detailed Logging Example ===");
        
        Reporter.log("=== Test Execution Started ===");
        Reporter.log("Environment: QA");
        Reporter.log("Browser: Chrome");
        Reporter.log("Test Data: Sample user credentials");
        
        System.out.println("Processing step 1...");
        Reporter.log("[INFO] Step 1: Initializing test data");
        
        System.out.println("Processing step 2...");
        Reporter.log("[INFO] Step 2: Executing business logic");
        
        System.out.println("Processing step 3...");
        Reporter.log("[INFO] Step 3: Validating results");
        
        boolean testPassed = true;
        if (testPassed) {
            Reporter.log("[SUCCESS] All validations passed");
            System.out.println("✓ Test completed successfully\n");
        }
        
        Assert.assertTrue(testPassed, "Test should pass");
    }
    
    @Test
    public void testWithMultipleAssertions() {
        System.out.println("=== Multiple Assertions Test ===");
        Reporter.log("Starting comprehensive validation");
        
        // Assertion 1
        Reporter.log("Assertion 1: Checking integer equality");
        Assert.assertEquals(10, 10, "Numbers should be equal");
        System.out.println("✓ Assertion 1 passed");
        
        // Assertion 2
        Reporter.log("Assertion 2: Checking boolean value");
        Assert.assertTrue(true, "Value should be true");
        System.out.println("✓ Assertion 2 passed");
        
        // Assertion 3
        Reporter.log("Assertion 3: Checking string contains");
        Assert.assertTrue("Hello World".contains("World"), 
            "String should contain 'World'");
        System.out.println("✓ Assertion 3 passed");
        
        Reporter.log("All assertions completed successfully");
        System.out.println("✅ Test PASSED with multiple assertions\n");
    }
}
```

### Expected Output (Console)

```
=== Successful Test Example ===
Calculation result: 4
✓ Test PASSED

=== Failed Test Example ===
Expected: Hello
Actual: World
✗ Test FAILED

=== Detailed Logging Example ===
Processing step 1...
Processing step 2...
Processing step 3...
✓ Test completed successfully

=== Multiple Assertions Test ===
✓ Assertion 1 passed
✓ Assertion 2 passed
✓ Assertion 3 passed
✅ Test PASSED with multiple assertions

===============================================
Default Suite
Total tests run: 4, Passes: 3, Failures: 1, Skips: 0
===============================================
```

### TestNG HTML Report Location

After running tests, check:
```
project-root/
  └── test-output/
      ├── index.html          ← Main report (open this in browser)
      ├── emailable-report.html
      └── testng-results.xml
```

### Success Criteria

✅ Tests execute and generate reports  
✅ HTML report created in test-output folder  
✅ Report shows pass/fail status  
✅ Reporter.log() messages appear in report  
✅ Failed test shows error details  

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Not checking test-output folder | Miss viewing reports | Always review HTML reports after execution |
| Only using System.out | Logs not in TestNG report | Use Reporter.log() for report logging |
| No descriptive logging | Hard to debug failures | Add detailed Reporter.log() statements |
| Ignoring failed test details | Don't know why test failed | Check exception and stack trace in report |

### Key Learnings

1. **HTML Reports**: Automatically generated in test-output folder
2. **Reporter.log()**: Adds messages to TestNG HTML report
3. **System.out**: Prints to console only, not in report
4. **Report Sections**: Summary, passed tests, failed tests, skipped tests
5. **Failure Details**: Shows exception, stack trace, and Reporter logs

### Challenge Task

Run the tests and:
- Open test-output/index.html in browser
- Click on failed test to see details
- Find Reporter.log() messages in report
- Take screenshot of report

---
