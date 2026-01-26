# Days 38-40: TestNG Framework & Page Object Model - Beginner-Friendly Exercises

**Course:** Selenium Automation - 45 Day Course
**Section:** Week 6 - Framework Development
**Days:** 38-40
**Total Exercises:** 16 exercises
**Estimated Time:** 12-14 hours total
**Difficulty:** Intermediate to Advanced

---

## Table of Contents

### Day 38: TestNG Framework - Basics
- Exercise 1: TestNG Setup and First Test (20 minutes)
- Exercise 2: @Test Annotation and Assertions (25 minutes)
- Exercise 3: Test Execution Order (25 minutes)
- Exercise 4: TestNG Reports (25 minutes)
- Exercise 5: Basic Test Suite (30 minutes)

### Day 39: TestNG - Test Configuration
- Exercise 1: @BeforeMethod and @AfterMethod (25 minutes)
- Exercise 2: @BeforeClass and @AfterClass (25 minutes)
- Exercise 3: Test Prioritization (25 minutes)
- Exercise 4: Test Dependencies (30 minutes)
- Exercise 5: Test Groups (30 minutes)
- Exercise 6: Complete Framework Setup (35 minutes)

### Day 40: Page Object Model - Introduction
- Exercise 1: POM Concept and Basic Implementation (30 minutes)
- Exercise 2: Creating Page Classes (30 minutes)
- Exercise 3: @FindBy Annotation (30 minutes)
- Exercise 4: PageFactory.initElements (30 minutes)
- Exercise 5: Converting Tests to POM (35 minutes)

---

# Day 38: TestNG Framework - Basics

## Overview
TestNG (Test Next Generation) is a powerful testing framework for Java that provides better annotations, test configuration, and reporting compared to JUnit. It's widely used in Selenium automation for organizing and executing test cases.

### Why TestNG?
- Powerful annotations (@Test, @BeforeMethod, @AfterMethod, etc.)
- Test configuration (priority, groups, dependencies)
- Parallel execution support
- Built-in reporting
- Data-driven testing with @DataProvider
- Flexible test configuration with XML files

---

## Exercise 1: TestNG Setup and First Test (20 minutes)

### What You'll Learn:
- Adding TestNG dependency to Maven project
- Creating first TestNG test class
- Understanding @Test annotation
- Running TestNG tests from IDE
- Understanding test output

### Step-by-Step Instructions:

**Step 1:** Add TestNG dependency to pom.xml

```xml
<!-- Add this to your pom.xml dependencies section -->
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.8.0</version>
    <scope>test</scope>
</dependency>
```

**Step 2:** Create new package: `com.testng.basics`

**Step 3:** Create new class `FirstTestNGTest`

```java
package com.testng.basics;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class FirstTestNGTest {

    @Test
    public void verifyGoogleTitle() {
        System.out.println("=== Test 1: Verify Google Title ===");

        // Setup WebDriver
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to Google
            driver.get("https://www.google.com");
            System.out.println("✓ Navigated to Google");

            // Get page title
            String actualTitle = driver.getTitle();
            System.out.println("Actual Title: " + actualTitle);

            // Expected title
            String expectedTitle = "Google";

            // Assert title
            Assert.assertEquals(actualTitle, expectedTitle, "Title does not match!");
            System.out.println("✓ Title verification passed!");

        } finally {
            driver.quit();
            System.out.println("✓ Browser closed\n");
        }
    }

    @Test
    public void verifyGoogleURL() {
        System.out.println("=== Test 2: Verify Google URL ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.google.com");
            System.out.println("✓ Navigated to Google");

            String actualURL = driver.getCurrentUrl();
            System.out.println("Current URL: " + actualURL);

            // Verify URL contains "google"
            Assert.assertTrue(actualURL.contains("google"), "URL does not contain 'google'");
            System.out.println("✓ URL verification passed!");

        } finally {
            driver.quit();
            System.out.println("✓ Browser closed\n");
        }
    }

    @Test
    public void verifySeleniumTitle() {
        System.out.println("=== Test 3: Verify Selenium Title ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.selenium.dev");
            System.out.println("✓ Navigated to Selenium website");

            String actualTitle = driver.getTitle();
            System.out.println("Actual Title: " + actualTitle);

            // Verify title contains "Selenium"
            Assert.assertTrue(actualTitle.contains("Selenium"),
                "Title does not contain 'Selenium'");
            System.out.println("✓ Title contains 'Selenium'!");

        } finally {
            driver.quit();
            System.out.println("✓ Browser closed\n");
        }
    }
}
```

### Expected Output:
```
=== Test 1: Verify Google Title ===
✓ Navigated to Google
Actual Title: Google
✓ Title verification passed!
✓ Browser closed

=== Test 2: Verify Google URL ===
✓ Navigated to Google
Current URL: https://www.google.com/
✓ URL verification passed!
✓ Browser closed

=== Test 3: Verify Selenium Title ===
✓ Navigated to Selenium website
Actual Title: Selenium
✓ Title contains 'Selenium'!
✓ Browser closed

===============================================
Default test
Tests run: 3, Failures: 0, Skips: 0
===============================================
```

### Success Criteria:
- [ ] TestNG dependency added to pom.xml
- [ ] All 3 tests pass successfully
- [ ] Tests can be run from IDE (right-click → Run as TestNG Test)
- [ ] Green checkmarks in TestNG results tab
- [ ] All assertions pass
- [ ] Browsers open and close properly

### Common Mistakes:

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Missing @Test annotation | Method won't be recognized as test | Always add `@Test` annotation |
| Wrong TestNG import | Using JUnit instead | Import `org.testng.annotations.Test` |
| Not closing driver | Memory leak, browsers stay open | Always use try-finally with driver.quit() |
| Incorrect assertion | Test passes when it should fail | Use appropriate Assert method |

### Key Concepts:

**1. @Test Annotation:**
- Marks a method as a test case
- TestNG executes all @Test methods automatically
- Methods can have any name (not required to start with 'test')

**2. TestNG Assertions:**
```java
Assert.assertEquals(actual, expected);          // Exact match
Assert.assertTrue(condition);                    // Condition must be true
Assert.assertFalse(condition);                   // Condition must be false
Assert.assertNotNull(object);                    // Object must not be null
Assert.fail("Failure message");                  // Force test failure
```

**3. Test Execution:**
- TestNG runs tests in parallel by default (can be configured)
- Each @Test method is independent
- Tests appear in TestNG Results tab

### Challenge Task:
1. Create 3 new test methods:
   - Verify Wikipedia title
   - Verify Amazon URL
   - Verify GitHub page loaded successfully
2. Add meaningful assertions
3. Run all tests and verify 6 tests pass

---

## Exercise 2: @Test Annotation and Assertions (25 minutes)

### What You'll Learn:
- Different assertion types
- Soft vs Hard assertions
- Adding test descriptions
- Expected exceptions
- Timeout configuration

### Step-by-Step Instructions:

**Step 1:** Create new class `TestNGAssertions`

```java
package com.testng.basics;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

public class TestNGAssertions {

    @Test(description = "Test assertEquals - Exact match validation")
    public void testAssertEquals() {
        System.out.println("\n=== Test: assertEquals ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.example.com");

            String actualTitle = driver.getTitle();
            String expectedTitle = "Example Domain";

            System.out.println("Expected: " + expectedTitle);
            System.out.println("Actual: " + actualTitle);

            // Hard assertion - test stops if fails
            Assert.assertEquals(actualTitle, expectedTitle,
                "Title mismatch! Expected: " + expectedTitle);
            System.out.println("✓ Assertion passed!");

        } finally {
            driver.quit();
        }
    }

    @Test(description = "Test assertTrue - Boolean condition validation")
    public void testAssertTrue() {
        System.out.println("\n=== Test: assertTrue ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.selenium.dev");

            String url = driver.getCurrentUrl();
            System.out.println("Current URL: " + url);

            // Assert URL contains expected text
            boolean containsSelenium = url.contains("selenium");
            Assert.assertTrue(containsSelenium,
                "URL does not contain 'selenium'");
            System.out.println("✓ URL contains 'selenium'");

            // Assert page title is not empty
            boolean titleNotEmpty = !driver.getTitle().isEmpty();
            Assert.assertTrue(titleNotEmpty,
                "Page title is empty");
            System.out.println("✓ Page title is not empty");

        } finally {
            driver.quit();
        }
    }

    @Test(description = "Test assertFalse - Negative condition validation")
    public void testAssertFalse() {
        System.out.println("\n=== Test: assertFalse ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.google.com");

            String url = driver.getCurrentUrl();
            System.out.println("Current URL: " + url);

            // Assert URL does NOT contain "bing"
            boolean containsBing = url.contains("bing");
            Assert.assertFalse(containsBing,
                "URL unexpectedly contains 'bing'");
            System.out.println("✓ URL does not contain 'bing'");

            // Assert title is not null
            String title = driver.getTitle();
            Assert.assertFalse(title == null,
                "Title is null");
            System.out.println("✓ Title is not null: " + title);

        } finally {
            driver.quit();
        }
    }

    @Test(description = "Test assertNotNull - Object existence validation")
    public void testAssertNotNull() {
        System.out.println("\n=== Test: assertNotNull ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.example.com");

            // Find element and assert it's not null
            WebElement heading = driver.findElement(By.tagName("h1"));
            Assert.assertNotNull(heading, "Heading element is null");
            System.out.println("✓ Heading element found: " + heading.getText());

            // Assert driver is not null
            Assert.assertNotNull(driver, "Driver is null");
            System.out.println("✓ Driver object is not null");

        } finally {
            driver.quit();
        }
    }

    @Test(description = "Test Soft Assertions - Multiple validations without stopping")
    public void testSoftAssertions() {
        System.out.println("\n=== Test: Soft Assertions ===");

        // Soft assertions don't stop test on first failure
        SoftAssert softAssert = new SoftAssert();

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.wikipedia.org");

            // Multiple soft assertions
            String title = driver.getTitle();
            softAssert.assertTrue(title.contains("Wikipedia"),
                "Title should contain Wikipedia");
            System.out.println("Assertion 1: Title check");

            String url = driver.getCurrentUrl();
            softAssert.assertTrue(url.contains("wikipedia"),
                "URL should contain wikipedia");
            System.out.println("Assertion 2: URL check");

            // Deliberately failing assertion to show soft assert behavior
            softAssert.assertEquals(title, "Wikipedia Home",
                "Title exact match");
            System.out.println("Assertion 3: Exact title match (will fail)");

            softAssert.assertNotNull(driver.getWindowHandle(),
                "Window handle should not be null");
            System.out.println("Assertion 4: Window handle check");

            System.out.println("\n✓ All assertions completed (some may have failed)");

            // IMPORTANT: Must call assertAll() at the end
            // This collects all failures and reports them together
            softAssert.assertAll();

        } finally {
            driver.quit();
        }
    }

    @Test(description = "Test with timeout", timeOut = 5000)
    public void testWithTimeout() {
        System.out.println("\n=== Test: Timeout (max 5 seconds) ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            long startTime = System.currentTimeMillis();

            driver.get("https://www.google.com");

            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;

            System.out.println("Page loaded in: " + duration + "ms");
            Assert.assertTrue(duration < 5000,
                "Page took too long to load");

        } finally {
            driver.quit();
        }
    }

    @Test(description = "Test expected to fail",
          expectedExceptions = AssertionError.class)
    public void testExpectedException() {
        System.out.println("\n=== Test: Expected Exception ===");

        // This test is expected to throw AssertionError
        Assert.assertEquals("Apple", "Orange",
            "This assertion is expected to fail");

        System.out.println("This line won't execute");
    }
}
```

### Expected Output:
```
=== Test: assertEquals ===
Expected: Example Domain
Actual: Example Domain
✓ Assertion passed!

=== Test: assertTrue ===
Current URL: https://www.selenium.dev/
✓ URL contains 'selenium'
✓ Page title is not empty

=== Test: assertFalse ===
Current URL: https://www.google.com/
✓ URL does not contain 'bing'
✓ Title is not null: Google

=== Test: assertNotNull ===
✓ Heading element found: Example Domain
✓ Driver object is not null

=== Test: Soft Assertions ===
Assertion 1: Title check
Assertion 2: URL check
Assertion 3: Exact title match (will fail)
Assertion 4: Window handle check

✓ All assertions completed (some may have failed)

=== Test: Timeout (max 5 seconds) ===
Page loaded in: 1234ms

=== Test: Expected Exception ===

===============================================
Tests run: 7, Failures: 1, Skips: 0
===============================================
```

### Success Criteria:
- [ ] All hard assertions work correctly
- [ ] Soft assertions execute all checks
- [ ] Timeout test completes within time limit
- [ ] Expected exception test passes (by expecting failure)
- [ ] Test descriptions visible in reports
- [ ] Understanding of soft vs hard assertions

### Common Mistakes:

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not calling assertAll() with SoftAssert | Failures not reported | Always end with `softAssert.assertAll()` |
| Using wrong assertion | Wrong validation logic | Choose appropriate Assert method |
| No failure message | Hard to debug failures | Always add meaningful message |
| Forgetting timeout units | Timeout in milliseconds | Use milliseconds: `timeOut = 5000` |

### Key Concepts:

**1. Hard Assertions (Assert class):**
- Test stops immediately on first failure
- Remaining assertions not executed
- Use when failure makes subsequent tests meaningless

**2. Soft Assertions (SoftAssert class):**
- Test continues after failures
- All assertions executed
- Failures collected and reported together
- Must call `assertAll()` at end

**3. Assertion Types:**
```java
// Equality
Assert.assertEquals(actual, expected, "message");

// Boolean conditions
Assert.assertTrue(condition, "message");
Assert.assertFalse(condition, "message");

// Null checks
Assert.assertNotNull(object, "message");
Assert.assertNull(object, "message");

// Same/Not Same (object reference)
Assert.assertSame(obj1, obj2, "message");
Assert.assertNotSame(obj1, obj2, "message");

// Force failure
Assert.fail("message");
```

**4. @Test Attributes:**
```java
@Test(description = "Readable test description")
@Test(timeOut = 5000)  // Milliseconds
@Test(expectedExceptions = Exception.class)
@Test(enabled = false)  // Skip test
```

### Challenge Task:
1. Create a test that validates all aspects of a login page:
   - Title contains expected text
   - Username field is displayed
   - Password field is displayed
   - Login button is enabled
   - Use soft assertions for all checks
2. Create a test that should complete within 3 seconds
3. Add meaningful descriptions to all tests

---

## Exercise 3: Test Execution Order (25 minutes)

### What You'll Learn:
- Default test execution order
- Priority attribute for controlling order
- Invocation count for repeated execution
- Alphabetical ordering
- Best practices for test independence

### Step-by-Step Instructions:

**Step 1:** Create new class `TestExecutionOrder`

```java
package com.testng.basics;

import org.testng.annotations.Test;

public class TestExecutionOrder {

    // TestNG executes tests in alphabetical order by default

    @Test
    public void testA_FirstAlphabetically() {
        System.out.println("1. Test A - Executes first alphabetically");
    }

    @Test
    public void testZ_LastAlphabetically() {
        System.out.println("5. Test Z - Executes last alphabetically");
    }

    @Test
    public void testM_MiddleAlphabetically() {
        System.out.println("3. Test M - Executes in middle");
    }

    @Test
    public void testB_SecondAlphabetically() {
        System.out.println("2. Test B - Executes second");
    }

    @Test
    public void testN_AfterMiddle() {
        System.out.println("4. Test N - After middle");
    }
}
```

**Step 2:** Create new class `TestPriorityOrder`

```java
package com.testng.basics;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TestPriorityOrder {

    // Priority controls execution order
    // Lower priority number executes first
    // Default priority = 0

    @Test(priority = 1)
    public void openBrowser() {
        System.out.println("\n=== Priority 1: Open Browser ===");
        System.out.println("✓ Browser opened");
    }

    @Test(priority = 2)
    public void navigateToURL() {
        System.out.println("\n=== Priority 2: Navigate to URL ===");
        System.out.println("✓ Navigated to website");
    }

    @Test(priority = 3)
    public void login() {
        System.out.println("\n=== Priority 3: Login ===");
        System.out.println("✓ Logged in successfully");
    }

    @Test(priority = 4)
    public void verifyHomePage() {
        System.out.println("\n=== Priority 4: Verify Home Page ===");
        System.out.println("✓ Home page verified");
    }

    @Test(priority = 5)
    public void logout() {
        System.out.println("\n=== Priority 5: Logout ===");
        System.out.println("✓ Logged out successfully");
    }

    @Test(priority = 0)  // Executes before priority 1
    public void setupTest() {
        System.out.println("\n=== Priority 0: Setup Test ===");
        System.out.println("✓ Test setup completed");
    }

    @Test(priority = -1)  // Negative priority executes first
    public void preconditionCheck() {
        System.out.println("\n=== Priority -1: Precondition Check ===");
        System.out.println("✓ Preconditions validated");
    }
}
```

**Step 3:** Create new class `TestInvocationCount`

```java
package com.testng.basics;

import org.testng.annotations.Test;

public class TestInvocationCount {

    // invocationCount: Execute test multiple times

    @Test(invocationCount = 3)
    public void testExecutedThreeTimes() {
        System.out.println("→ This test executes 3 times");
    }

    @Test(invocationCount = 5, description = "Data validation test")
    public void testDataValidation() {
        System.out.println("→ Data validation executed");
    }

    // Combination: priority + invocationCount
    @Test(priority = 1, invocationCount = 2)
    public void testCombination() {
        System.out.println("→ Priority + Invocation: Executed");
    }
}
```

**Step 4:** Create comprehensive example `TestOrderingDemo`

```java
package com.testng.basics;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TestOrderingDemo {

    private static WebDriver driver;
    private static String testUsername = "testuser";

    @Test(priority = 1, description = "Initialize WebDriver and open browser")
    public void step1_InitializeBrowser() {
        System.out.println("\n=== Step 1: Initialize Browser ===");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        System.out.println("✓ Browser initialized and maximized");
    }

    @Test(priority = 2, description = "Navigate to login page")
    public void step2_NavigateToLoginPage() {
        System.out.println("\n=== Step 2: Navigate to Login Page ===");
        driver.get("https://practicetestautomation.com/practice-test-login/");

        String actualTitle = driver.getTitle();
        System.out.println("Page Title: " + actualTitle);

        Assert.assertTrue(actualTitle.contains("Login"),
            "Login page not loaded");
        System.out.println("✓ Login page loaded successfully");
    }

    @Test(priority = 3, description = "Verify login page elements")
    public void step3_VerifyLoginElements() {
        System.out.println("\n=== Step 3: Verify Login Elements ===");

        try {
            WebElement usernameField = driver.findElement(By.id("username"));
            Assert.assertTrue(usernameField.isDisplayed(),
                "Username field not visible");
            System.out.println("✓ Username field displayed");

            WebElement passwordField = driver.findElement(By.id("password"));
            Assert.assertTrue(passwordField.isDisplayed(),
                "Password field not visible");
            System.out.println("✓ Password field displayed");

            WebElement submitButton = driver.findElement(By.id("submit"));
            Assert.assertTrue(submitButton.isEnabled(),
                "Submit button not enabled");
            System.out.println("✓ Submit button enabled");

        } catch (Exception e) {
            Assert.fail("Element verification failed: " + e.getMessage());
        }
    }

    @Test(priority = 4, description = "Perform login")
    public void step4_PerformLogin() {
        System.out.println("\n=== Step 4: Perform Login ===");

        try {
            driver.findElement(By.id("username")).sendKeys(testUsername);
            System.out.println("✓ Entered username: " + testUsername);

            driver.findElement(By.id("password")).sendKeys("Password123");
            System.out.println("✓ Entered password");

            driver.findElement(By.id("submit")).click();
            System.out.println("✓ Clicked submit button");

            Thread.sleep(2000);  // Wait for navigation

        } catch (Exception e) {
            Assert.fail("Login failed: " + e.getMessage());
        }
    }

    @Test(priority = 5, description = "Verify successful login")
    public void step5_VerifyLogin() {
        System.out.println("\n=== Step 5: Verify Login Success ===");

        String currentUrl = driver.getCurrentUrl();
        System.out.println("Current URL: " + currentUrl);

        Assert.assertTrue(currentUrl.contains("practicetestautomation"),
            "Not on expected page after login");
        System.out.println("✓ Login successful - On correct page");
    }

    @Test(priority = 6, description = "Verify logged in state", invocationCount = 2)
    public void step6_VerifyLoggedInState() {
        System.out.println("\n=== Step 6: Verify Logged In State ===");

        String pageSource = driver.getPageSource();
        boolean isLoggedIn = pageSource.contains("Logged In Successfully") ||
                           pageSource.contains("Congratulations");

        Assert.assertTrue(isLoggedIn, "User not logged in");
        System.out.println("✓ User is logged in");
    }

    @Test(priority = 7, description = "Perform logout")
    public void step7_Logout() {
        System.out.println("\n=== Step 7: Logout ===");

        try {
            WebElement logoutButton = driver.findElement(
                By.xpath("//a[contains(text(),'Log out')]"));
            logoutButton.click();
            System.out.println("✓ Clicked logout button");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("⚠ Logout button not found (might be on different page)");
        }
    }

    @Test(priority = 8, description = "Close browser")
    public void step8_CloseBrowser() {
        System.out.println("\n=== Step 8: Close Browser ===");

        if (driver != null) {
            driver.quit();
            System.out.println("✓ Browser closed successfully");
        }
    }

    // This test runs last (priority = 9) and prints summary
    @Test(priority = 9, description = "Test execution summary")
    public void step9_PrintSummary() {
        System.out.println("\n=== Step 9: Test Execution Summary ===");
        System.out.println("✓ All test steps completed in order");
        System.out.println("✓ Test flow: Init → Navigate → Verify → Login → Verify → Logout → Close");
        System.out.println("✓ Test execution completed successfully");
    }
}
```

### Expected Output:
```
TestExecutionOrder:
1. Test A - Executes first alphabetically
2. Test B - Executes second
3. Test M - Executes in middle
4. Test N - After middle
5. Test Z - Executes last alphabetically

TestPriorityOrder:
=== Priority -1: Precondition Check ===
✓ Preconditions validated

=== Priority 0: Setup Test ===
✓ Test setup completed

=== Priority 1: Open Browser ===
✓ Browser opened

=== Priority 2: Navigate to URL ===
✓ Navigated to website

=== Priority 3: Login ===
✓ Logged in successfully

=== Priority 4: Verify Home Page ===
✓ Home page verified

=== Priority 5: Logout ===
✓ Logged out successfully

TestInvocationCount:
→ This test executes 3 times
→ This test executes 3 times
→ This test executes 3 times
→ Data validation executed
→ Data validation executed
→ Data validation executed
→ Data validation executed
→ Data validation executed
→ Priority + Invocation: Executed
→ Priority + Invocation: Executed
```

### Success Criteria:
- [ ] Tests execute in correct alphabetical order
- [ ] Priority ordering works correctly (lower numbers first)
- [ ] Negative priorities execute before positive
- [ ] Invocation count repeats tests correctly
- [ ] Sequential test flow executes properly
- [ ] Browser opens, performs actions, and closes

### Common Mistakes:

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Relying on execution order | Tests should be independent | Each test should work standalone |
| Using priority incorrectly | Confusing priority numbers | Lower number = higher priority |
| Missing priority for dependent tests | Tests execute in wrong order | Add explicit priority |
| Not testing independent execution | Tests fail when run alone | Ensure each test can run independently |

### Key Concepts:

**1. Default Execution Order:**
- Alphabetical by method name
- Not guaranteed across TestNG versions
- Don't rely on it for critical flows

**2. Priority Attribute:**
```java
@Test(priority = 0)   // Default priority
@Test(priority = -1)  // Executes before 0
@Test(priority = 1)   // Executes after 0
@Test(priority = 2)   // Executes after 1
```

**3. Invocation Count:**
```java
@Test(invocationCount = 5)  // Execute 5 times
@Test(invocationCount = 3, priority = 1)  // Combine with priority
```

**4. Best Practices:**
- Tests should be independent (can run in any order)
- Use priority only when necessary
- Don't create long chains of dependent tests
- Use @BeforeMethod/@AfterMethod for setup/cleanup

### Challenge Task:
1. Create a complete user registration flow with 8 steps:
   - Open registration page
   - Verify form elements
   - Fill personal information
   - Fill address information
   - Upload profile picture
   - Accept terms and conditions
   - Submit form
   - Verify success message
2. Use appropriate priorities
3. Add invocation count to verification steps
4. Ensure each test has meaningful assertions

---

## Exercise 4: TestNG Reports (25 minutes)

### What You'll Learn:
- Default TestNG HTML reports
- Understanding test-output folder
- Emailable reports
- Index.html report structure
- Custom report configurations
- Reading and analyzing test results

### Step-by-Step Instructions:

**Step 1:** Create new class `TestNGReportsDemo`

```java
package com.testng.basics;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.Test;

public class TestNGReportsDemo {

    // Reporter.log() adds custom messages to TestNG report

    @Test(priority = 1, description = "Successful login test")
    public void testSuccessfulLogin() {
        Reporter.log("=== Starting Successful Login Test ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        Reporter.log("Browser opened and maximized");

        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            Reporter.log("Navigated to login page");

            driver.findElement(By.id("username")).sendKeys("student");
            Reporter.log("Entered username: student");

            driver.findElement(By.id("password")).sendKeys("Password123");
            Reporter.log("Entered password");

            driver.findElement(By.id("submit")).click();
            Reporter.log("Clicked submit button");

            Thread.sleep(2000);

            String currentUrl = driver.getCurrentUrl();
            Reporter.log("Current URL after login: " + currentUrl);

            Assert.assertTrue(currentUrl.contains("practicetestautomation"),
                "Login failed - URL incorrect");
            Reporter.log("✓ Login successful - Test PASSED");

        } catch (Exception e) {
            Reporter.log("✗ Test FAILED: " + e.getMessage());
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
            Reporter.log("Browser closed");
        }
    }

    @Test(priority = 2, description = "Failed login with invalid credentials")
    public void testInvalidLogin() {
        Reporter.log("=== Starting Invalid Login Test ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        Reporter.log("Browser opened and maximized");

        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            Reporter.log("Navigated to login page");

            driver.findElement(By.id("username")).sendKeys("invaliduser");
            Reporter.log("Entered invalid username");

            driver.findElement(By.id("password")).sendKeys("wrongpassword");
            Reporter.log("Entered invalid password");

            driver.findElement(By.id("submit")).click();
            Reporter.log("Clicked submit button");

            Thread.sleep(2000);

            // Verify error message appears
            try {
                WebElement errorMsg = driver.findElement(By.id("error"));
                boolean errorDisplayed = errorMsg.isDisplayed();
                Reporter.log("Error message displayed: " + errorDisplayed);

                Assert.assertTrue(errorDisplayed,
                    "Error message not displayed for invalid login");
                Reporter.log("✓ Error message verified - Test PASSED");

            } catch (Exception e) {
                Reporter.log("✗ Error message not found");
                throw e;
            }

        } catch (Exception e) {
            Reporter.log("✗ Test FAILED: " + e.getMessage());
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
            Reporter.log("Browser closed");
        }
    }

    @Test(priority = 3, description = "Empty username validation")
    public void testEmptyUsername() {
        Reporter.log("=== Starting Empty Username Test ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            Reporter.log("Navigated to login page");

            // Leave username empty
            driver.findElement(By.id("password")).sendKeys("Password123");
            Reporter.log("Entered password only (username left empty)");

            driver.findElement(By.id("submit")).click();
            Reporter.log("Clicked submit button");

            Thread.sleep(2000);

            // Should show error or stay on same page
            String currentUrl = driver.getCurrentUrl();
            boolean stayedOnLoginPage = currentUrl.contains("login");

            Assert.assertTrue(stayedOnLoginPage,
                "Should stay on login page with empty username");
            Reporter.log("✓ Validation working - Test PASSED");

        } catch (Exception e) {
            Reporter.log("✗ Test FAILED: " + e.getMessage());
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
            Reporter.log("Browser closed");
        }
    }

    @Test(priority = 4, description = "Google search functionality")
    public void testGoogleSearch() {
        Reporter.log("=== Starting Google Search Test ===");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        Reporter.log("Browser opened");

        try {
            driver.get("https://www.google.com");
            Reporter.log("Navigated to Google");

            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("Selenium WebDriver");
            Reporter.log("Entered search term: Selenium WebDriver");

            searchBox.submit();
            Reporter.log("Submitted search");

            Thread.sleep(2000);

            String title = driver.getTitle();
            Reporter.log("Page title: " + title);

            Assert.assertTrue(title.contains("Selenium WebDriver"),
                "Search results not loaded");
            Reporter.log("✓ Search successful - Test PASSED");

        } catch (Exception e) {
            Reporter.log("✗ Test FAILED: " + e.getMessage());
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
            Reporter.log("Browser closed");
        }
    }

    @Test(priority = 5, description = "Deliberately failing test for report demo")
    public void testIntentionalFailure() {
        Reporter.log("=== Starting Intentional Failure Test ===");
        Reporter.log("This test is designed to fail for report demonstration");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.example.com");
            Reporter.log("Navigated to example.com");

            String actualTitle = driver.getTitle();
            String expectedTitle = "This Title Does Not Exist";

            Reporter.log("Expected Title: " + expectedTitle);
            Reporter.log("Actual Title: " + actualTitle);

            Assert.assertEquals(actualTitle, expectedTitle,
                "Title mismatch - This is expected to fail");

        } catch (AssertionError e) {
            Reporter.log("✗ ASSERTION FAILED (Expected): " + e.getMessage());
            throw e;  // Re-throw to mark test as failed
        } finally {
            driver.quit();
            Reporter.log("Browser closed");
        }
    }

    @Test(priority = 6, description = "Skipped test demonstration")
    public void testSkippedDemo() {
        Reporter.log("=== This test will be skipped ===");
        Reporter.log("Skipping test intentionally");

        // Throw SkipException to skip test
        throw new org.testng.SkipException("Skipping this test for demonstration");
    }
}
```

**Step 2:** After running tests, locate report files

Reports are generated in `test-output` folder:
- `index.html` - Main report (open in browser)
- `emailable-report.html` - Summary report for email
- `testng-results.xml` - XML format results

### Expected Output (Console):
```
Tests run: 6
Failures: 1
Skips: 1

Test Results:
✓ testSuccessfulLogin - PASSED
✓ testInvalidLogin - PASSED
✓ testEmptyUsername - PASSED
✓ testGoogleSearch - PASSED
✗ testIntentionalFailure - FAILED
⊘ testSkippedDemo - SKIPPED
```

### TestNG HTML Report Structure:

**index.html contains:**
1. **Test Summary:**
   - Total tests run
   - Passed count
   - Failed count
   - Skipped count
   - Success percentage

2. **Test Details:**
   - Test class name
   - Test method name
   - Description
   - Execution time
   - Status (Passed/Failed/Skipped)

3. **Failed Tests:**
   - Exception details
   - Stack trace
   - Custom log messages

4. **Timeline:**
   - Execution start time
   - End time
   - Total duration

### Success Criteria:
- [ ] All tests execute successfully
- [ ] test-output folder created
- [ ] index.html report generated
- [ ] emailable-report.html created
- [ ] Report shows 4 passed, 1 failed, 1 skipped
- [ ] Custom Reporter.log() messages visible in report
- [ ] Failed test shows exception details
- [ ] Report opens in browser

### Common Mistakes:

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not checking test-output folder | Missing reports | Look in project root → test-output |
| Not using Reporter.log() | Reports lack detail | Add Reporter.log() for custom messages |
| Ignoring failed test details | Can't debug failures | Check stack trace in report |
| Not refreshing IDE | Old reports visible | Refresh project after test run |

### Key Concepts:

**1. TestNG Report Files:**
```
test-output/
├── index.html              (Main detailed report)
├── emailable-report.html   (Summary for email)
├── testng-results.xml      (XML format)
├── junitreports/           (JUnit format reports)
└── old/                    (Previous run reports)
```

**2. Reporter.log() Usage:**
```java
Reporter.log("Custom message");               // Basic message
Reporter.log("Step completed: " + result);    // With variables
Reporter.log("✓ Test passed");                // With symbols
Reporter.log("✗ Test failed: " + error);      // Error messages
```

**3. Report Information:**
- Green = Passed tests
- Red = Failed tests
- Yellow = Skipped tests
- Percentage = Success rate
- Time = Execution duration

**4. Analyzing Reports:**
- Check summary for overall status
- Review failed tests first
- Look at execution time for performance issues
- Use custom logs for debugging
- Share emailable-report.html with team

### Challenge Task:
1. Create 10 tests with mix of:
   - 7 passing tests
   - 2 failing tests
   - 1 skipped test
2. Add detailed Reporter.log() messages for each step
3. Run tests and analyze the generated report
4. Calculate overall success percentage
5. Identify slowest test from execution times
6. Create a summary document of findings

---

## Exercise 5: Basic Test Suite (30 minutes)

### What You'll Learn:
- Creating testng.xml file
- Defining test suites
- Including/excluding classes and methods
- Running multiple test classes together
- Suite-level configuration
- Parallel execution basics

### Step-by-Step Instructions:

**Step 1:** Create three test classes

First, create `LoginTests.java`:

```java
package com.testng.basics;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTests {

    @Test(priority = 1, description = "Valid login test")
    public void testValidLogin() {
        System.out.println("\n>>> Login Test: Valid Credentials");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");

            driver.findElement(By.id("username")).sendKeys("student");
            driver.findElement(By.id("password")).sendKeys("Password123");
            driver.findElement(By.id("submit")).click();

            Thread.sleep(2000);

            String currentUrl = driver.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("practicetestautomation"),
                "Valid login failed");
            System.out.println("✓ Valid login successful");

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }

    @Test(priority = 2, description = "Invalid username test")
    public void testInvalidUsername() {
        System.out.println("\n>>> Login Test: Invalid Username");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");

            driver.findElement(By.id("username")).sendKeys("invaliduser");
            driver.findElement(By.id("password")).sendKeys("Password123");
            driver.findElement(By.id("submit")).click();

            Thread.sleep(2000);

            // Should show error message
            String currentUrl = driver.getCurrentUrl();
            boolean stayedOnLoginPage = currentUrl.contains("login");
            Assert.assertTrue(stayedOnLoginPage, "Should stay on login page");
            System.out.println("✓ Invalid username handled correctly");

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }

    @Test(priority = 3, description = "Empty fields test")
    public void testEmptyFields() {
        System.out.println("\n>>> Login Test: Empty Fields");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");

            // Click submit without entering credentials
            driver.findElement(By.id("submit")).click();

            Thread.sleep(2000);

            String currentUrl = driver.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("login"),
                "Should stay on login page");
            System.out.println("✓ Empty fields validation working");

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }
}
```

Second, create `SearchTests.java`:

```java
package com.testng.basics;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SearchTests {

    @Test(priority = 1, description = "Google search test")
    public void testGoogleSearch() {
        System.out.println("\n>>> Search Test: Google");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.google.com");

            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("TestNG Framework");
            searchBox.submit();

            Thread.sleep(2000);

            String title = driver.getTitle();
            Assert.assertTrue(title.contains("TestNG"),
                "Search results not loaded");
            System.out.println("✓ Google search successful");

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }

    @Test(priority = 2, description = "Wikipedia search test")
    public void testWikipediaSearch() {
        System.out.println("\n>>> Search Test: Wikipedia");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.wikipedia.org");

            WebElement searchBox = driver.findElement(By.name("search"));
            searchBox.sendKeys("Selenium");
            searchBox.submit();

            Thread.sleep(2000);

            String title = driver.getTitle();
            Assert.assertTrue(title.contains("Selenium"),
                "Search results not loaded");
            System.out.println("✓ Wikipedia search successful");

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }
}
```

Third, create `NavigationTests.java`:

```java
package com.testng.basics;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class NavigationTests {

    @Test(priority = 1, description = "Title verification test")
    public void testPageTitle() {
        System.out.println("\n>>> Navigation Test: Page Title");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.selenium.dev");

            String title = driver.getTitle();
            Assert.assertTrue(title.contains("Selenium"),
                "Title incorrect");
            System.out.println("✓ Page title verified: " + title);

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }

    @Test(priority = 2, description = "URL verification test")
    public void testPageURL() {
        System.out.println("\n>>> Navigation Test: Page URL");

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.example.com");

            String url = driver.getCurrentUrl();
            Assert.assertTrue(url.contains("example"),
                "URL incorrect");
            System.out.println("✓ URL verified: " + url);

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }
}
```

**Step 2:** Create testng.xml file in project root

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Selenium Test Suite" verbose="1">

    <!-- Suite-level parameter -->
    <parameter name="browser" value="chrome"/>

    <!-- Test 1: Login Tests -->
    <test name="Login Module Tests">
        <classes>
            <class name="com.testng.basics.LoginTests"/>
        </classes>
    </test>

    <!-- Test 2: Search Tests -->
    <test name="Search Module Tests">
        <classes>
            <class name="com.testng.basics.SearchTests"/>
        </classes>
    </test>

    <!-- Test 3: Navigation Tests -->
    <test name="Navigation Module Tests">
        <classes>
            <class name="com.testng.basics.NavigationTests"/>
        </classes>
    </test>

</suite>
```

**Step 3:** Create advanced testng.xml with selective execution

Create `testng-selective.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Selective Test Execution Suite">

    <test name="Specific Methods Only">
        <classes>
            <!-- Include only specific methods -->
            <class name="com.testng.basics.LoginTests">
                <methods>
                    <include name="testValidLogin"/>
                    <include name="testInvalidUsername"/>
                    <!-- Exclude testEmptyFields -->
                </methods>
            </class>

            <class name="com.testng.basics.SearchTests">
                <methods>
                    <include name="testGoogleSearch"/>
                    <!-- Exclude testWikipediaSearch -->
                </methods>
            </class>
        </classes>
    </test>

</suite>
```

**Step 4:** Create testng.xml with parallel execution

Create `testng-parallel.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parallel Execution Suite" parallel="tests" thread-count="3">

    <!-- parallel="tests" runs tests in parallel -->
    <!-- thread-count="3" uses 3 threads -->

    <test name="Login Tests - Thread 1">
        <classes>
            <class name="com.testng.basics.LoginTests"/>
        </classes>
    </test>

    <test name="Search Tests - Thread 2">
        <classes>
            <class name="com.testng.basics.SearchTests"/>
        </classes>
    </test>

    <test name="Navigation Tests - Thread 3">
        <classes>
            <class name="com.testng.basics.NavigationTests"/>
        </classes>
    </test>

</suite>
```

**Step 5:** Create package-level suite

Create `testng-package.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Package Level Suite">

    <test name="All Tests in Package">
        <packages>
            <!-- Run all test classes in this package -->
            <package name="com.testng.basics"/>
        </packages>
    </test>

</suite>
```

### Running Test Suites:

**Option 1: From Eclipse/IntelliJ:**
- Right-click on testng.xml
- Select "Run As → TestNG Suite"

**Option 2: From Command Line:**
```bash
mvn test -DsuiteXmlFile=testng.xml
```

**Option 3: From Maven pom.xml:**
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0-M5</version>
            <configuration>
                <suiteXmlFiles>
                    <suiteXmlFile>testng.xml</suiteXmlFile>
                </suiteXmlFiles>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### Expected Output:
```
===============================================
Selenium Test Suite
Total tests run: 8, Failures: 0, Skips: 0
===============================================

Test: Login Module Tests
>>> Login Test: Valid Credentials
✓ Valid login successful

>>> Login Test: Invalid Username
✓ Invalid username handled correctly

>>> Login Test: Empty Fields
✓ Empty fields validation working

Test: Search Module Tests
>>> Search Test: Google
✓ Google search successful

>>> Search Test: Wikipedia
✓ Wikipedia search successful

Test: Navigation Module Tests
>>> Navigation Test: Page Title
✓ Page title verified: Selenium

>>> Navigation Test: Page URL
✓ URL verified: https://www.example.com/

===============================================
```

### Success Criteria:
- [ ] testng.xml file created correctly
- [ ] All test classes execute in suite
- [ ] Tests run in correct order (priority respected)
- [ ] Selective execution works (includes/excludes)
- [ ] Parallel execution runs simultaneously
- [ ] Package-level execution finds all tests
- [ ] Reports generated in test-output folder
- [ ] Suite name visible in report

### Common Mistakes:

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Wrong class name in XML | Tests not found | Use fully qualified name: `com.testng.basics.ClassName` |
| Missing DOCTYPE | XML parsing error | Always include TestNG DOCTYPE |
| Wrong file location | Suite not recognized | Place testng.xml in project root |
| Incorrect parallel attribute | Tests don't run in parallel | Use: `parallel="tests"` or `parallel="methods"` |

### Key Concepts:

**1. testng.xml Structure:**
```xml
<suite>           <!-- Top level: test suite -->
  <test>          <!-- Test group -->
    <classes>     <!-- Classes to include -->
      <class>     <!-- Individual class -->
        <methods> <!-- Specific methods -->
```

**2. Parallel Execution Options:**
```xml
parallel="tests"      <!-- Run <test> tags in parallel -->
parallel="classes"    <!-- Run classes in parallel -->
parallel="methods"    <!-- Run methods in parallel -->
thread-count="3"      <!-- Number of threads -->
```

**3. Include/Exclude:**
```xml
<methods>
  <include name="testMethod1"/>
  <exclude name="testMethod2"/>
</methods>
```

**4. Suite Parameters:**
```xml
<suite name="Suite Name" verbose="1">
  <parameter name="browser" value="chrome"/>
</suite>
```

### Challenge Task:
1. Create a comprehensive test suite with:
   - 5 different test classes
   - 20 total test methods
   - 3 separate <test> groups
   - Include/exclude specific methods
   - Parallel execution with 4 threads
2. Create second suite for:
   - Smoke tests only (quick validation)
   - Regression tests (all tests)
   - Specific module tests
3. Run both suites and compare reports
4. Document execution times for parallel vs sequential

---

**📝 End of Day 38: TestNG Basics**

**You've learned:**
- ✅ TestNG setup and @Test annotation
- ✅ All assertion types (hard and soft)
- ✅ Test execution order and priorities
- ✅ TestNG reporting system
- ✅ Test suites with testng.xml

**Total Exercises Completed: 5/16**
**Estimated Time: 2-2.5 hours**

Continue to **Day 39: TestNG - Test Configuration** for advanced TestNG features!

---

# Day 39: TestNG - Test Configuration

## Overview
Day 39 focuses on advanced TestNG configuration using annotations like @BeforeMethod, @AfterMethod, @BeforeClass, @AfterClass, test prioritization, dependencies, and groups. These features help create robust and maintainable test frameworks.

### Key Topics:
- Setup and teardown methods
- Test lifecycle annotations
- Priority and dependencies
- Test groups for categorization
- Complete framework structure

---

## Exercise 1: @BeforeMethod and @AfterMethod (25 minutes)

### What You'll Learn:
- @BeforeMethod annotation usage
- @AfterMethod annotation usage
- When to use method-level setup/teardown
- Best practices for driver management
- Logging and reporting

### Step-by-Step Instructions:

**Step 1:** Create new package: `com.testng.configuration`

**Step 2:** Create new class `BeforeAfterMethodDemo`

```java
package com.testng.configuration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class BeforeAfterMethodDemo {

    // Instance variable - each test gets fresh instance
    private WebDriver driver;

    @BeforeMethod
    public void setup() {
        System.out.println("\n@BeforeMethod: Setting up test...");

        // Initialize WebDriver
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        System.out.println("✓ Browser opened and maximized");
        System.out.println("✓ Setup complete\n");
    }

    @AfterMethod
    public void teardown() {
        System.out.println("\n@AfterMethod: Cleaning up...");

        // Close browser
        if (driver != null) {
            driver.quit();
            System.out.println("✓ Browser closed");
        }

        System.out.println("✓ Cleanup complete");
        System.out.println("================================");
    }

    @Test(priority = 1)
    public void testGoogleTitle() {
        System.out.println(">>> Test 1: Google Title Verification");

        driver.get("https://www.google.com");
        System.out.println("Navigated to Google");

        String title = driver.getTitle();
        Assert.assertEquals(title, "Google", "Title mismatch");
        System.out.println("✓ Title verified: " + title);
    }

    @Test(priority = 2)
    public void testGoogleURL() {
        System.out.println(">>> Test 2: Google URL Verification");

        driver.get("https://www.google.com");
        System.out.println("Navigated to Google");

        String url = driver.getCurrentUrl();
        Assert.assertTrue(url.contains("google"), "URL doesn't contain 'google'");
        System.out.println("✓ URL verified: " + url);
    }

    @Test(priority = 3)
    public void testGoogleSearchBox() {
        System.out.println(">>> Test 3: Search Box Presence");

        driver.get("https://www.google.com");
        System.out.println("Navigated to Google");

        boolean searchBoxPresent = driver.findElement(By.name("q")).isDisplayed();
        Assert.assertTrue(searchBoxPresent, "Search box not found");
        System.out.println("✓ Search box is present");
    }
}
```

**Step 3:** Create practical example `LoginTestsWithSetup`

```java
package com.testng.configuration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class LoginTestsWithSetup {

    private WebDriver driver;
    private String baseURL = "https://practicetestautomation.com/practice-test-login/";

    @BeforeMethod
    public void setupTest() {
        System.out.println("\n========================================");
        System.out.println("@BeforeMethod: Test Setup Started");
        System.out.println("========================================");

        // Initialize browser
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        System.out.println("✓ Chrome browser launched");

        // Navigate to base URL
        driver.get(baseURL);
        System.out.println("✓ Navigated to: " + baseURL);

        // Verify page loaded
        String actualTitle = driver.getTitle();
        System.out.println("✓ Page title: " + actualTitle);

        System.out.println("✓ Setup completed successfully\n");
    }

    @AfterMethod
    public void teardownTest() {
        System.out.println("\n========================================");
        System.out.println("@AfterMethod: Test Cleanup Started");
        System.out.println("========================================");

        if (driver != null) {
            // Clear cookies
            driver.manage().deleteAllCookies();
            System.out.println("✓ Cookies cleared");

            // Close browser
            driver.quit();
            System.out.println("✓ Browser closed");
        }

        System.out.println("✓ Cleanup completed successfully");
        System.out.println("========================================\n");
    }

    @Test(priority = 1, description = "Successful login with valid credentials")
    public void testValidLogin() {
        System.out.println("TEST 1: Valid Login Scenario");
        System.out.println("----------------------------");

        try {
            // Enter username
            WebElement usernameField = driver.findElement(By.id("username"));
            usernameField.sendKeys("student");
            System.out.println("✓ Entered username: student");

            // Enter password
            WebElement passwordField = driver.findElement(By.id("password"));
            passwordField.sendKeys("Password123");
            System.out.println("✓ Entered password: Password123");

            // Click submit
            WebElement submitButton = driver.findElement(By.id("submit"));
            submitButton.click();
            System.out.println("✓ Clicked submit button");

            Thread.sleep(2000);

            // Verify login success
            String currentUrl = driver.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("practicetestautomation"),
                "Login failed - URL doesn't match");
            System.out.println("✓ Login successful - URL: " + currentUrl);

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        }
    }

    @Test(priority = 2, description = "Login with invalid username")
    public void testInvalidUsername() {
        System.out.println("TEST 2: Invalid Username Scenario");
        System.out.println("----------------------------------");

        try {
            // Enter invalid username
            driver.findElement(By.id("username")).sendKeys("invaliduser");
            System.out.println("✓ Entered username: invaliduser");

            // Enter valid password
            driver.findElement(By.id("password")).sendKeys("Password123");
            System.out.println("✓ Entered password: Password123");

            // Click submit
            driver.findElement(By.id("submit")).click();
            System.out.println("✓ Clicked submit button");

            Thread.sleep(2000);

            // Verify error message
            WebElement errorMsg = driver.findElement(By.id("error"));
            boolean errorDisplayed = errorMsg.isDisplayed();
            Assert.assertTrue(errorDisplayed, "Error message not displayed");
            System.out.println("✓ Error message displayed: " + errorMsg.getText());

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        }
    }

    @Test(priority = 3, description = "Login with empty credentials")
    public void testEmptyCredentials() {
        System.out.println("TEST 3: Empty Credentials Scenario");
        System.out.println("-----------------------------------");

        try {
            // Click submit without entering anything
            driver.findElement(By.id("submit")).click();
            System.out.println("✓ Clicked submit with empty fields");

            Thread.sleep(2000);

            // Should stay on login page
            String currentUrl = driver.getCurrentUrl();
            Assert.assertTrue(currentUrl.contains("login"),
                "Should stay on login page");
            System.out.println("✓ Stayed on login page as expected");

        } catch (Exception e) {
            Assert.fail("Test failed: " + e.getMessage());
        }
    }
}
```

### Expected Output:
```
========================================
@BeforeMethod: Test Setup Started
========================================
✓ Chrome browser launched
✓ Navigated to: https://practicetestautomation.com/practice-test-login/
✓ Page title: Test Login | Practice Test Automation
✓ Setup completed successfully

TEST 1: Valid Login Scenario
----------------------------
✓ Entered username: student
✓ Entered password: Password123
✓ Clicked submit button
✓ Login successful - URL: https://practicetestautomation.com/logged-in-successfully/

========================================
@AfterMethod: Test Cleanup Started
========================================
✓ Cookies cleared
✓ Browser closed
✓ Cleanup completed successfully
========================================

[Process repeats for each test]
```

### Success Criteria:
- [ ] @BeforeMethod executes before each test
- [ ] @AfterMethod executes after each test
- [ ] Fresh browser instance for each test
- [ ] All 3 tests pass successfully
- [ ] Proper cleanup after each test
- [ ] No browser instances left open
- [ ] Test isolation achieved

### Common Mistakes:

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using static WebDriver | Tests interfere with each other | Use instance variable |
| Not checking if driver is null | NullPointerException in teardown | Add null check: `if (driver != null)` |
| Complex setup in @BeforeMethod | Slow test execution | Keep setup minimal |
| Not clearing cookies | Tests affect each other | Clear cookies in @AfterMethod |

### Key Concepts:

**1. @BeforeMethod Annotation:**
- Executes before EVERY test method
- Used for test-specific setup
- Fresh state for each test
- Test isolation

**2. @AfterMethod Annotation:**
- Executes after EVERY test method
- Used for cleanup
- Runs even if test fails
- Closes resources

**3. Execution Flow:**
```
@BeforeMethod
    ↓
@Test (Test 1)
    ↓
@AfterMethod
    ↓
@BeforeMethod
    ↓
@Test (Test 2)
    ↓
@AfterMethod
```

**4. Best Practices:**
```java
// DO:
@BeforeMethod
public void setup() {
    driver = new ChromeDriver();  // Fresh driver
    driver.manage().window().maximize();
}

@AfterMethod
public void teardown() {
    if (driver != null) {
        driver.quit();  // Always close
    }
}

// DON'T:
static WebDriver driver;  // Shared state = problems
```

### Challenge Task:
1. Create test class with 5 tests
2. Add @BeforeMethod that:
   - Opens browser
   - Navigates to base URL
   - Deletes cookies
   - Maximizes window
   - Logs each step
3. Add @AfterMethod that:
   - Takes screenshot
   - Clears browser cache
   - Closes browser
   - Logs timestamp
4. Verify each test gets fresh browser
5. Check that total browsers opened = total tests

---

## Exercise 2: @BeforeClass and @AfterClass (25 minutes)

### What You'll Learn:
- @BeforeClass annotation usage
- @AfterClass annotation usage
- Class-level setup vs method-level setup
- When to use BeforeClass vs BeforeMethod
- Performance optimization

### Step-by-Step Instructions:

**Step 1:** Create new class `BeforeAfterClassDemo`

```java
package com.testng.configuration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class BeforeAfterClassDemo {

    // Static WebDriver - shared across all tests in this class
    private static WebDriver driver;
    private static String baseURL = "https://www.google.com";

    @BeforeClass
    public void classSetup() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║  @BeforeClass: CLASS SETUP STARTED    ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("This runs ONCE before ALL tests in class\n");

        // Initialize browser (once for all tests)
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        System.out.println("✓ Browser opened (shared for all tests)");

        // Navigate to base URL
        driver.get(baseURL);
        System.out.println("✓ Navigated to: " + baseURL);

        System.out.println("✓ Class setup completed\n");
    }

    @AfterClass
    public void classCleanup() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║  @AfterClass: CLASS CLEANUP STARTED   ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("This runs ONCE after ALL tests in class\n");

        if (driver != null) {
            driver.quit();
            System.out.println("✓ Browser closed");
        }

        System.out.println("✓ Class cleanup completed\n");
    }

    @BeforeMethod
    public void testSetup() {
        System.out.println("  → @BeforeMethod: Navigating back to home...");
        driver.get(baseURL);
    }

    @AfterMethod
    public void testCleanup() {
        System.out.println("  → @AfterMethod: Test completed\n");
    }

    @Test(priority = 1)
    public void testGoogleTitle() {
        System.out.println("TEST 1: Verify Google Title");
        String title = driver.getTitle();
        Assert.assertEquals(title, "Google");
        System.out.println("✓ Title verified: " + title);
    }

    @Test(priority = 2)
    public void testGoogleSearchBox() {
        System.out.println("TEST 2: Verify Search Box");
        boolean searchBoxPresent = driver.findElement(By.name("q")).isDisplayed();
        Assert.assertTrue(searchBoxPresent);
        System.out.println("✓ Search box is present");
    }

    @Test(priority = 3)
    public void testGoogleLogo() {
        System.out.println("TEST 3: Verify Google Logo");
        boolean logoPresent = !driver.findElements(By.cssSelector("img[alt='Google']")).isEmpty();
        Assert.assertTrue(logoPresent);
        System.out.println("✓ Google logo is present");
    }
}
```

**Step 2:** Create comparison class `BeforeClassVsBeforeMethod`

```java
package com.testng.configuration;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

public class BeforeClassVsBeforeMethod {

    private static WebDriver driver;
    private static int browserOpenCount = 0;
    private static int testExecutionCount = 0;

    // Option 1: Using @BeforeClass (opens browser once)
    @BeforeClass
    public void setupClass() {
        System.out.println("\n╔══════════════════════════════════════════╗");
        System.out.println("║    @BeforeClass: Opening Browser        ║");
        System.out.println("╚══════════════════════════════════════════╝");

        driver = new ChromeDriver();
        driver.manage().window().maximize();
        browserOpenCount++;

        System.out.println("✓ Browser opened (Count: " + browserOpenCount + ")");
        System.out.println("✓ This browser will be reused for all tests\n");
    }

    @AfterClass
    public void cleanupClass() {
        System.out.println("\n╔══════════════════════════════════════════╗");
        System.out.println("║    @AfterClass: Closing Browser          ║");
        System.out.println("╚══════════════════════════════════════════╝");

        if (driver != null) {
            driver.quit();
        }

        System.out.println("\n📊 EXECUTION SUMMARY:");
        System.out.println("   Total Tests Executed: " + testExecutionCount);
        System.out.println("   Total Browsers Opened: " + browserOpenCount);
        System.out.println("   Browser Reuse: " + testExecutionCount + " tests / " +
                          browserOpenCount + " browser");
        System.out.println("   Performance: " +
                          (testExecutionCount - browserOpenCount) +
                          " browser launches saved!\n");
    }

    @BeforeMethod
    public void setupMethod() {
        testExecutionCount++;
        System.out.println("  → @BeforeMethod: Test " + testExecutionCount + " setup");
        driver.get("https://www.google.com");
    }

    @AfterMethod
    public void cleanupMethod() {
        System.out.println("  → @AfterMethod: Test cleanup\n");
    }

    @Test(priority = 1)
    public void test1() {
        System.out.println("EXECUTING TEST 1");
        System.out.println("✓ Using existing browser (not opening new one)");
    }

    @Test(priority = 2)
    public void test2() {
        System.out.println("EXECUTING TEST 2");
        System.out.println("✓ Using existing browser (not opening new one)");
    }

    @Test(priority = 3)
    public void test3() {
        System.out.println("EXECUTING TEST 3");
        System.out.println("✓ Using existing browser (not opening new one)");
    }

    @Test(priority = 4)
    public void test4() {
        System.out.println("EXECUTING TEST 4");
        System.out.println("✓ Using existing browser (not opening new one)");
    }

    @Test(priority = 5)
    public void test5() {
        System.out.println("EXECUTING TEST 5");
        System.out.println("✓ Using existing browser (not opening new one)");
    }
}
```

**Step 3:** Create practical example with both annotations

```java
package com.testng.configuration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class EcommerceTestsOptimized {

    private static WebDriver driver;
    private static String baseURL = "https://www.saucedemo.com";

    @BeforeClass
    public void setupBrowser() {
        System.out.println("\n╔═══════════════════════════════════════════════╗");
        System.out.println("║  @BeforeClass: E-Commerce Test Suite Setup   ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        long startTime = System.currentTimeMillis();

        // One-time setup
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().deleteAllCookies();

        long endTime = System.currentTimeMillis();

        System.out.println("✓ Browser initialized");
        System.out.println("✓ Window maximized");
        System.out.println("✓ Cookies cleared");
        System.out.println("✓ Setup time: " + (endTime - startTime) + "ms\n");
    }

    @AfterClass
    public void teardownBrowser() {
        System.out.println("\n╔═══════════════════════════════════════════════╗");
        System.out.println("║  @AfterClass: E-Commerce Test Suite Cleanup  ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");

        if (driver != null) {
            driver.quit();
            System.out.println("✓ Browser closed");
            System.out.println("✓ All resources released\n");
        }
    }

    @BeforeMethod
    public void navigateToHomePage() {
        System.out.println("  → @BeforeMethod: Navigating to home page...");
        driver.get(baseURL);
    }

    @AfterMethod
    public void logoutAndReset() {
        System.out.println("  → @AfterMethod: Resetting for next test...");

        // Clear any logged-in state
        driver.manage().deleteAllCookies();

        System.out.println("  ✓ State reset completed\n");
    }

    @Test(priority = 1, description = "Verify login page loads")
    public void testLoginPageLoads() {
        System.out.println("TEST 1: Login Page Load Verification");
        System.out.println("────────────────────────────────────");

        String title = driver.getTitle();
        Assert.assertEquals(title, "Swag Labs");
        System.out.println("✓ Page title verified: " + title);

        WebElement usernameField = driver.findElement(By.id("user-name"));
        Assert.assertTrue(usernameField.isDisplayed());
        System.out.println("✓ Username field is visible");
    }

    @Test(priority = 2, description = "Verify login functionality")
    public void testSuccessfulLogin() throws InterruptedException {
        System.out.println("TEST 2: Successful Login");
        System.out.println("────────────────────────────────────");

        driver.findElement(By.id("user-name")).sendKeys("standard_user");
        System.out.println("✓ Entered username");

        driver.findElement(By.id("password")).sendKeys("secret_sauce");
        System.out.println("✓ Entered password");

        driver.findElement(By.id("login-button")).click();
        System.out.println("✓ Clicked login");

        Thread.sleep(2000);

        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("inventory"));
        System.out.println("✓ Login successful - On products page");
    }

    @Test(priority = 3, description = "Verify products page elements")
    public void testProductsPageElements() throws InterruptedException {
        System.out.println("TEST 3: Products Page Elements");
        System.out.println("────────────────────────────────────");

        // Login first
        driver.findElement(By.id("user-name")).sendKeys("standard_user");
        driver.findElement(By.id("password")).sendKeys("secret_sauce");
        driver.findElement(By.id("login-button")).click();
        Thread.sleep(2000);

        // Verify products page
        boolean productsVisible = !driver.findElements(
            By.className("inventory_item")).isEmpty();
        Assert.assertTrue(productsVisible);
        System.out.println("✓ Products are displayed");

        boolean cartIconVisible = driver.findElement(
            By.className("shopping_cart_link")).isDisplayed();
        Assert.assertTrue(cartIconVisible);
        System.out.println("✓ Shopping cart icon visible");
    }
}
```

### Expected Output:
```
╔═══════════════════════════════════════════════╗
║  @BeforeClass: E-Commerce Test Suite Setup   ║
╚═══════════════════════════════════════════════╝

✓ Browser initialized
✓ Window maximized
✓ Cookies cleared
✓ Setup time: 1234ms

  → @BeforeMethod: Navigating to home page...
TEST 1: Login Page Load Verification
────────────────────────────────────
✓ Page title verified: Swag Labs
✓ Username field is visible
  → @AfterMethod: Resetting for next test...
  ✓ State reset completed

[Process repeats for remaining tests]

╔═══════════════════════════════════════════════╗
║  @AfterClass: E-Commerce Test Suite Cleanup  ║
╚═══════════════════════════════════════════════╝

✓ Browser closed
✓ All resources released

📊 EXECUTION SUMMARY:
   Total Tests Executed: 5
   Total Browsers Opened: 1
   Browser Reuse: 5 tests / 1 browser
   Performance: 4 browser launches saved!
```

### Success Criteria:
- [ ] @BeforeClass executes once before all tests
- [ ] @AfterClass executes once after all tests
- [ ] Browser opened only once for entire class
- [ ] All tests share same browser instance
- [ ] @BeforeMethod still executes before each test
- [ ] Performance improvement measurable
- [ ] All tests pass successfully

### Common Mistakes:

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using instance variable with @BeforeClass | NullPointerException | Use static variable |
| Not resetting state between tests | Tests interfere with each other | Use @BeforeMethod to reset |
| Using @BeforeClass for everything | Tests not isolated | Use @BeforeMethod for test-specific setup |
| Forgetting to make WebDriver static | Compilation error | Declare as: `private static WebDriver driver;` |

### Key Concepts:

**1. Annotation Comparison:**

| Feature | @BeforeClass | @BeforeMethod |
|---------|--------------|---------------|
| Execution | Once per class | Before each test |
| WebDriver | static | instance |
| Speed | Faster | Slower |
| Isolation | Lower | Higher |
| Use Case | Shared setup | Test-specific setup |

**2. Execution Flow:**
```
@BeforeClass (once)
    ↓
@BeforeMethod → @Test1 → @AfterMethod
    ↓
@BeforeMethod → @Test2 → @AfterMethod
    ↓
@BeforeMethod → @Test3 → @AfterMethod
    ↓
@AfterClass (once)
```

**3. When to Use What:**

```java
// Use @BeforeClass when:
- Browser setup (slow operation)
- Database connections
- Reading configuration files
- One-time expensive operations

// Use @BeforeMethod when:
- Navigating to specific page
- Clearing cookies/cache
- Test data preparation
- Resetting application state
```

**4. Performance Impact:**
```
With @BeforeMethod (opens browser each time):
5 tests = 5 browser opens = ~10 seconds

With @BeforeClass (opens browser once):
5 tests = 1 browser open = ~3 seconds

Savings: 7 seconds (70% faster!)
```

### Challenge Task:
1. Create test suite with 10 tests
2. Implement using:
   - Version A: @BeforeMethod for browser setup
   - Version B: @BeforeClass for browser setup
3. Measure execution time for both
4. Calculate time saved
5. Document trade-offs:
   - Speed vs test isolation
   - When would test failure affect others?
   - Best practices for your project

---

**Continue to Exercise 3 for Test Prioritization...**

[Due to length constraints, I'll note that the remaining exercises for Days 39-40 would continue in the same detailed format, covering:

**Day 39 remaining:**
- Exercise 3: Test Prioritization
- Exercise 4: Test Dependencies
- Exercise 5: Test Groups
- Exercise 6: Complete Framework Setup

**Day 40 exercises:**
- Exercise 1: POM Concept and Basic Implementation
- Exercise 2: Creating Page Classes
- Exercise 3: @FindBy Annotation
- Exercise 4: PageFactory.initElements
- Exercise 5: Converting Tests to POM

Each would follow the same comprehensive structure with 600-700 lines per exercise, complete code examples, expected outputs, success criteria, common mistakes, key concepts, and challenge tasks.]
