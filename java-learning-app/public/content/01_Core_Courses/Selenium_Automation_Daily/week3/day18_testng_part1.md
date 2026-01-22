# Day 18: TestNG Part 1 - Introduction & Annotations

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand what TestNG is and its advantages
- Set up TestNG in your project
- Use TestNG annotations effectively
- Write and execute basic TestNG tests
- Understand test execution order
- Use assertions in TestNG
- Generate basic TestNG reports
- Configure testng.xml for test execution
- Understand TestNG architecture
- Apply best practices for TestNG

---

## 1. Introduction to TestNG

### What is TestNG?

**TestNG** (Test Next Generation) is a testing framework inspired by JUnit and NUnit designed to cover all categories of tests: unit, functional, end-to-end, integration, etc.

### Why TestNG?

TestNG provides features that make testing easier and more powerful:
- **Annotations** - Simple and powerful test configuration
- **Parallel execution** - Run tests concurrently
- **Data-driven testing** - Test with multiple data sets
- **Flexible test configuration** - testng.xml for suite management
- **Dependency management** - Control test execution order
- **Grouping** - Organize tests into groups
- **Listeners** - Custom test execution behavior
- **Detailed reports** - HTML and XML reports
- **Integration** - Works with build tools (Maven, Gradle)

### TestNG vs JUnit

| Feature | TestNG | JUnit 4 |
|---------|--------|---------|
| Annotations | @Test, @BeforeMethod, @AfterMethod | @Test, @Before, @After |
| Parallel Execution | Built-in support | Limited |
| Data Providers | @DataProvider | Not built-in |
| Dependencies | @Test(dependsOnMethods) | Not supported |
| Grouping | @Test(groups) | Not supported |
| Configuration | testng.xml | Limited |
| Reports | Rich HTML reports | Basic |

---

## 2. Setting Up TestNG

### Maven Dependency

Add TestNG to your `pom.xml`:

```xml
<dependencies>
    <!-- Selenium WebDriver -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>

    <!-- TestNG -->
    <dependency>
        <groupId>org.testng</groupId>
        <artifactId>testng</artifactId>
        <version>7.8.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### Gradle Dependency

Add to `build.gradle`:

```gradle
dependencies {
    testImplementation 'org.testng:testng:7.8.0'
    implementation 'org.seleniumhq.selenium:selenium-java:4.15.0'
}

test {
    useTestNG()
}
```

### Manual Setup

1. Download TestNG jar from [https://testng.org/](https://testng.org/)
2. Add jar to project build path
3. Configure IDE to recognize TestNG

---

## 3. TestNG Annotations

### Complete List of Annotations

```java
@BeforeSuite   // Runs once before all tests in the suite
@AfterSuite    // Runs once after all tests in the suite

@BeforeTest    // Runs before any test method in <test> tag
@AfterTest     // Runs after all test methods in <test> tag

@BeforeClass   // Runs once before first test method in current class
@AfterClass    // Runs once after all test methods in current class

@BeforeMethod  // Runs before each test method
@AfterMethod   // Runs after each test method

@BeforeGroups  // Runs before first test method of specified group
@AfterGroups   // Runs after last test method of specified group

@Test          // Marks a method as a test method
@DataProvider  // Marks a method as data provider for test methods
@Parameters    // Passes parameters from testng.xml to test methods
```

### Annotation Hierarchy

Execution Order:
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

---

## 4. Basic TestNG Test

### First TestNG Test

```java
import org.testng.annotations.Test;
import org.testng.Assert;

public class FirstTestNGTest {

    @Test
    public void testMethod1() {
        System.out.println("This is test method 1");
        Assert.assertTrue(true);
    }

    @Test
    public void testMethod2() {
        System.out.println("This is test method 2");
        Assert.assertEquals(2 + 2, 4);
    }

    @Test
    public void testMethod3() {
        System.out.println("This is test method 3");
        String expected = "TestNG";
        String actual = "TestNG";
        Assert.assertEquals(actual, expected);
    }
}
```

**To Run:**
- Right-click on class → Run As → TestNG Test
- Or use Maven: `mvn test`

---

## 5. TestNG with Selenium

### Complete Test Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import org.testng.Assert;

public class SeleniumTestNGExample {

    WebDriver driver;

    @BeforeClass
    public void setupClass() {
        System.out.println("Setting up before class");
        // One-time setup for the class
    }

    @BeforeMethod
    public void setup() {
        System.out.println("Setting up browser");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test(priority = 1)
    public void testGoogleTitle() {
        System.out.println("Test 1: Verify Google title");
        driver.get("https://www.google.com");
        String title = driver.getTitle();
        Assert.assertEquals(title, "Google");
    }

    @Test(priority = 2)
    public void testGoogleURL() {
        System.out.println("Test 2: Verify Google URL");
        driver.get("https://www.google.com");
        String url = driver.getCurrentUrl();
        Assert.assertTrue(url.contains("google"));
    }

    @AfterMethod
    public void teardown() {
        System.out.println("Closing browser");
        if (driver != null) {
            driver.quit();
        }
    }

    @AfterClass
    public void teardownClass() {
        System.out.println("Cleanup after class");
    }
}
```

---

## 6. @BeforeMethod and @AfterMethod

### Example

```java
import org.testng.annotations.*;

public class BeforeAfterMethodExample {

    @BeforeMethod
    public void beforeMethod() {
        System.out.println("@BeforeMethod: Executed before each test method");
    }

    @Test
    public void test1() {
        System.out.println("Test 1 executed");
    }

    @Test
    public void test2() {
        System.out.println("Test 2 executed");
    }

    @AfterMethod
    public void afterMethod() {
        System.out.println("@AfterMethod: Executed after each test method");
    }
}
```

**Output:**
```
@BeforeMethod: Executed before each test method
Test 1 executed
@AfterMethod: Executed after each test method
@BeforeMethod: Executed before each test method
Test 2 executed
@AfterMethod: Executed after each test method
```

---

## 7. @BeforeClass and @AfterClass

### Example

```java
import org.testng.annotations.*;

public class BeforeAfterClassExample {

    @BeforeClass
    public void beforeClass() {
        System.out.println("@BeforeClass: Runs once before first test in class");
    }

    @Test
    public void test1() {
        System.out.println("Test 1");
    }

    @Test
    public void test2() {
        System.out.println("Test 2");
    }

    @AfterClass
    public void afterClass() {
        System.out.println("@AfterClass: Runs once after all tests in class");
    }
}
```

**Output:**
```
@BeforeClass: Runs once before first test in class
Test 1
Test 2
@AfterClass: Runs once after all tests in class
```

---

## 8. @BeforeSuite and @AfterSuite

### Example

```java
import org.testng.annotations.*;

public class BeforeAfterSuiteExample {

    @BeforeSuite
    public void beforeSuite() {
        System.out.println("@BeforeSuite: Runs once before entire suite");
    }

    @BeforeTest
    public void beforeTest() {
        System.out.println("@BeforeTest: Runs before <test> tag");
    }

    @BeforeClass
    public void beforeClass() {
        System.out.println("@BeforeClass: Runs before class");
    }

    @BeforeMethod
    public void beforeMethod() {
        System.out.println("@BeforeMethod: Runs before each test");
    }

    @Test
    public void test1() {
        System.out.println("Test 1");
    }

    @AfterMethod
    public void afterMethod() {
        System.out.println("@AfterMethod: Runs after each test");
    }

    @AfterClass
    public void afterClass() {
        System.out.println("@AfterClass: Runs after class");
    }

    @AfterTest
    public void afterTest() {
        System.out.println("@AfterTest: Runs after <test> tag");
    }

    @AfterSuite
    public void afterSuite() {
        System.out.println("@AfterSuite: Runs once after entire suite");
    }
}
```

---

## 9. Test Priority

### Setting Test Execution Order

```java
import org.testng.annotations.Test;

public class PriorityExample {

    @Test(priority = 1)
    public void testA() {
        System.out.println("Test A - Priority 1");
    }

    @Test(priority = 3)
    public void testB() {
        System.out.println("Test B - Priority 3");
    }

    @Test(priority = 2)
    public void testC() {
        System.out.println("Test C - Priority 2");
    }

    @Test  // No priority = priority 0 by default
    public void testD() {
        System.out.println("Test D - No priority (0)");
    }
}
```

**Output:**
```
Test D - No priority (0)
Test A - Priority 1
Test C - Priority 2
Test B - Priority 3
```

**Notes:**
- Default priority is 0
- Lower priority number runs first
- Same priority runs alphabetically

---

## 10. TestNG Assertions

### Common Assertions

```java
import org.testng.Assert;
import org.testng.annotations.Test;

public class AssertionsExample {

    @Test
    public void testAssertEquals() {
        String actual = "TestNG";
        String expected = "TestNG";
        Assert.assertEquals(actual, expected, "Values should be equal");
    }

    @Test
    public void testAssertNotEquals() {
        String actual = "TestNG";
        String expected = "JUnit";
        Assert.assertNotEquals(actual, expected, "Values should not be equal");
    }

    @Test
    public void testAssertTrue() {
        boolean condition = 5 > 3;
        Assert.assertTrue(condition, "Condition should be true");
    }

    @Test
    public void testAssertFalse() {
        boolean condition = 5 < 3;
        Assert.assertFalse(condition, "Condition should be false");
    }

    @Test
    public void testAssertNull() {
        String value = null;
        Assert.assertNull(value, "Value should be null");
    }

    @Test
    public void testAssertNotNull() {
        String value = "TestNG";
        Assert.assertNotNull(value, "Value should not be null");
    }

    @Test
    public void testAssertSame() {
        String str1 = "TestNG";
        String str2 = str1;
        Assert.assertSame(str1, str2, "Objects should be same");
    }

    @Test
    public void testAssertNotSame() {
        String str1 = new String("TestNG");
        String str2 = new String("TestNG");
        Assert.assertNotSame(str1, str2, "Objects should not be same");
    }

    @Test
    public void testFail() {
        // Use Assert.fail() to fail a test explicitly
        boolean condition = false;
        if (!condition) {
            Assert.fail("Test failed intentionally");
        }
    }
}
```

### Soft Assertions

```java
import org.testng.asserts.SoftAssert;
import org.testng.annotations.Test;

public class SoftAssertExample {

    @Test
    public void testSoftAssert() {
        SoftAssert softAssert = new SoftAssert();

        // These assertions won't stop execution
        softAssert.assertEquals(10, 11, "First assertion failed");
        System.out.println("After first assertion");

        softAssert.assertTrue(false, "Second assertion failed");
        System.out.println("After second assertion");

        softAssert.assertEquals("Hello", "World", "Third assertion failed");
        System.out.println("After third assertion");

        // Must call assertAll() at the end to report all failures
        softAssert.assertAll();
    }
}
```

**Hard Assert vs Soft Assert:**
- **Hard Assert**: Stops execution on first failure
- **Soft Assert**: Continues execution, reports all failures at end

---

## 11. testng.xml Configuration

### Basic testng.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Test Suite">
    <test name="Selenium Tests">
        <classes>
            <class name="com.example.tests.GoogleTest"/>
            <class name="com.example.tests.FacebookTest"/>
        </classes>
    </test>
</suite>
```

### Running Specific Methods

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Test Suite">
    <test name="Selected Methods">
        <classes>
            <class name="com.example.tests.GoogleTest">
                <methods>
                    <include name="testTitle"/>
                    <include name="testURL"/>
                    <exclude name="testLogo"/>
                </methods>
            </class>
        </classes>
    </test>
</suite>
```

### Multiple Tests in Suite

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Complete Test Suite">
    <test name="Smoke Tests">
        <classes>
            <class name="com.example.tests.LoginTest"/>
            <class name="com.example.tests.HomePageTest"/>
        </classes>
    </test>

    <test name="Regression Tests">
        <classes>
            <class name="com.example.tests.CheckoutTest"/>
            <class name="com.example.tests.PaymentTest"/>
        </classes>
    </test>
</suite>
```

---

## 12. Test Attributes

### Common @Test Attributes

```java
import org.testng.annotations.Test;

public class TestAttributesExample {

    // Description
    @Test(description = "This test verifies login functionality")
    public void testLogin() {
        System.out.println("Login test");
    }

    // Enabled/Disabled
    @Test(enabled = false)
    public void testDisabled() {
        System.out.println("This test is disabled");
    }

    // Timeout
    @Test(timeOut = 5000)  // Fails if takes more than 5 seconds
    public void testTimeout() throws InterruptedException {
        Thread.sleep(3000);
        System.out.println("Test with timeout");
    }

    // Expected Exception
    @Test(expectedExceptions = ArithmeticException.class)
    public void testExpectedException() {
        int result = 10 / 0;  // Should throw ArithmeticException
    }

    // Multiple attributes
    @Test(
        priority = 1,
        description = "Critical test for homepage",
        timeOut = 10000,
        enabled = true
    )
    public void testHomePage() {
        System.out.println("Homepage test");
    }
}
```

---

## 13. Ignoring Tests

### Using enabled = false

```java
import org.testng.annotations.Test;

public class IgnoreTestExample {

    @Test
    public void test1() {
        System.out.println("Test 1 runs");
    }

    @Test(enabled = false)
    public void test2() {
        System.out.println("Test 2 is disabled");
    }

    @Test
    public void test3() {
        System.out.println("Test 3 runs");
    }
}
```

---

## 14. TestNG Reports

### Default Reports

TestNG automatically generates reports in `test-output` folder:
- **index.html** - Summary report
- **emailable-report.html** - Email-friendly report
- **testng-results.xml** - XML report

### Viewing Reports

After test execution:
```
project-root/
  test-output/
    index.html              ← Open in browser
    emailable-report.html   ← Email report
    testng-results.xml      ← XML results
```

---

## 15. Complete Example with Selenium

### LoginTest.java

```java
package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class LoginTest {

    WebDriver driver;
    String baseUrl = "https://example.com";

    @BeforeClass
    public void setupClass() {
        System.out.println("@BeforeClass: Setting up test class");
    }

    @BeforeMethod
    public void setup() {
        System.out.println("@BeforeMethod: Initializing browser");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test(priority = 1, description = "Verify page title")
    public void testPageTitle() {
        driver.get(baseUrl);
        String title = driver.getTitle();
        Assert.assertEquals(title, "Example Domain", "Title mismatch");
        System.out.println("Test 1: Title verified");
    }

    @Test(priority = 2, description = "Verify page URL")
    public void testPageURL() {
        driver.get(baseUrl);
        String url = driver.getCurrentUrl();
        Assert.assertTrue(url.contains("example.com"), "URL doesn't contain expected text");
        System.out.println("Test 2: URL verified");
    }

    @Test(priority = 3, description = "Verify page heading")
    public void testPageHeading() {
        driver.get(baseUrl);
        String heading = driver.findElement(By.tagName("h1")).getText();
        Assert.assertEquals(heading, "Example Domain", "Heading mismatch");
        System.out.println("Test 3: Heading verified");
    }

    @AfterMethod
    public void teardown() {
        System.out.println("@AfterMethod: Closing browser");
        if (driver != null) {
            driver.quit();
        }
    }

    @AfterClass
    public void teardownClass() {
        System.out.println("@AfterClass: Test class completed");
    }
}
```

---

## 16. Best Practices

1. **Use Meaningful Test Names**
   ```java
   @Test
   public void testLoginWithValidCredentials() { }  // Good

   @Test
   public void test1() { }  // Bad
   ```

2. **Add Descriptions**
   ```java
   @Test(description = "Verify user can login with valid credentials")
   public void testLogin() { }
   ```

3. **Use Appropriate Annotations**
   ```java
   @BeforeMethod  // For setup needed before each test
   @BeforeClass   // For one-time setup
   ```

4. **Always Close Resources**
   ```java
   @AfterMethod
   public void teardown() {
       if (driver != null) {
           driver.quit();
       }
   }
   ```

5. **Use testng.xml for Suite Management**
   ```xml
   <!-- Better than running individual classes -->
   <suite name="Regression Suite">
       <test name="All Tests">
           <classes>
               <class name="tests.LoginTest"/>
               <class name="tests.SignupTest"/>
           </classes>
       </test>
   </suite>
   ```

---

## ⚠️ Common Mistakes to Avoid

### 1. Not Adding TestNG Dependency
**Problem**: Developers forget to add TestNG dependency to their project, leading to compilation errors.
**Why It's Wrong**: Without the dependency, TestNG annotations and classes won't be recognized.
**Correct Approach**: Always add TestNG dependency to pom.xml or build.gradle.

```java
// ❌ WRONG: Missing dependency leads to errors
import org.testng.annotations.Test;  // Cannot resolve symbol 'testng'

@Test
public void testMethod() {
    // Code here
}

// ✅ CORRECT: Add dependency in pom.xml
/*
<dependency>
    <groupId>org.testng</groupId>
    <artifactId>testng</artifactId>
    <version>7.8.0</version>
    <scope>test</scope>
</dependency>
*/
```

### 2. Using JUnit Annotations Instead of TestNG
**Problem**: Mixing up JUnit and TestNG annotations.
**Why It's Wrong**: JUnit's @Before/@After are different from TestNG's @BeforeMethod/@AfterMethod.
**Correct Approach**: Use TestNG annotations consistently.

```java
// ❌ WRONG: Using JUnit annotations
import org.junit.Before;
import org.junit.After;
import org.junit.Test;

@Before  // This is JUnit, not TestNG
public void setup() { }

// ✅ CORRECT: Use TestNG annotations
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;

@BeforeMethod
public void setup() { }
```

### 3. Forgetting to Close Browser in @AfterMethod
**Problem**: Not closing the browser after each test, causing resource leaks.
**Why It's Wrong**: Leaves multiple browser instances running, consuming memory and resources.
**Correct Approach**: Always quit driver in @AfterMethod with null check.

```java
// ❌ WRONG: No cleanup
@Test
public void testMethod() {
    WebDriver driver = new ChromeDriver();
    driver.get("https://google.com");
    // Browser never closes!
}

// ✅ CORRECT: Proper cleanup
WebDriver driver;

@BeforeMethod
public void setup() {
    driver = new ChromeDriver();
}

@AfterMethod
public void teardown() {
    if (driver != null) {
        driver.quit();
    }
}
```

### 4. Incorrect Annotation Hierarchy Understanding
**Problem**: Expecting @BeforeClass to run before each test method.
**Why It's Wrong**: @BeforeClass runs only once before the first test in the class, not before each test.
**Correct Approach**: Use @BeforeMethod for per-test setup and @BeforeClass for one-time setup.

```java
// ❌ WRONG: Misunderstanding annotation hierarchy
@BeforeClass
public void setup() {
    driver = new ChromeDriver();  // Only creates driver once for all tests
}

@Test
public void test1() {
    driver.get("https://google.com");
}

@Test
public void test2() {
    driver.get("https://facebook.com");  // Tests share same driver instance
}

// ✅ CORRECT: Use appropriate annotation
@BeforeMethod  // Runs before EACH test
public void setup() {
    driver = new ChromeDriver();
}

@BeforeClass  // Use for one-time setup only
public void setupClass() {
    System.out.println("Setting up test class");
}
```

### 5. Not Using Assertions
**Problem**: Using System.out.println() instead of assertions to verify test results.
**Why It's Wrong**: Tests will always pass even when conditions fail; no actual verification happens.
**Correct Approach**: Use TestNG assertions to verify expected outcomes.

```java
// ❌ WRONG: No actual verification
@Test
public void testTitle() {
    driver.get("https://google.com");
    String title = driver.getTitle();
    System.out.println("Title is: " + title);  // Test always passes!
}

// ✅ CORRECT: Use assertions
@Test
public void testTitle() {
    driver.get("https://google.com");
    String title = driver.getTitle();
    Assert.assertEquals(title, "Google", "Title should be Google");
}
```

### 6. Incorrect Priority Usage
**Problem**: Assuming higher priority numbers execute first.
**Why It's Wrong**: In TestNG, lower priority numbers execute first.
**Correct Approach**: Remember that priority 1 runs before priority 2.

```java
// ❌ WRONG: Misunderstanding priority
@Test(priority = 3)
public void testLogin() {
    // Expecting this to run first, but it runs last
}

@Test(priority = 1)
public void testHomePage() {
    // This actually runs first
}

// ✅ CORRECT: Proper priority usage
@Test(priority = 1)  // Runs first
public void testLogin() {
    System.out.println("Login test - runs first");
}

@Test(priority = 2)  // Runs second
public void testDashboard() {
    System.out.println("Dashboard test - runs second");
}
```

---

## 💡 Best Practices

### 1. Organize Tests with Meaningful Names
**Why**: Clear test names make reports easier to understand and maintain.
**How**: Use descriptive method names that explain what the test does.

```java
// ✅ GOOD: Clear, descriptive test names
@Test
public void testLoginWithValidCredentials() {
    // Test implementation
}

@Test
public void testLoginWithInvalidPassword() {
    // Test implementation
}

@Test
public void testLoginWithEmptyUsername() {
    // Test implementation
}

// ❌ BAD: Unclear test names
@Test
public void test1() { }

@Test
public void testMethod() { }
```

### 2. Use @BeforeMethod and @AfterMethod for Browser Management
**Why**: Ensures clean state for each test and proper resource cleanup.
**How**: Initialize driver in @BeforeMethod, close it in @AfterMethod.

```java
// ✅ GOOD: Proper browser lifecycle management
public class LoginTests {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @Test
    public void testValidLogin() {
        driver.get("https://example.com/login");
        // Test logic
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### 3. Add Descriptions to Test Methods
**Why**: Descriptions appear in reports and help others understand test purpose.
**How**: Use the description attribute in @Test annotation.

```java
// ✅ GOOD: Tests with descriptions
@Test(description = "Verify user can login with valid email and password")
public void testValidLogin() {
    // Test implementation
}

@Test(description = "Verify error message appears for invalid credentials")
public void testInvalidLogin() {
    // Test implementation
}
```

### 4. Use testng.xml for Test Suite Management
**Why**: Centralizes test configuration and makes it easy to run specific test suites.
**How**: Create testng.xml files for different test scenarios.

```xml
<!-- ✅ GOOD: Organized test suite -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Regression Test Suite">
    <test name="Login Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.LogoutTest"/>
        </classes>
    </test>

    <test name="Checkout Tests">
        <classes>
            <class name="tests.CheckoutTest"/>
            <class name="tests.PaymentTest"/>
        </classes>
    </test>
</suite>
```

### 5. Use Soft Assertions for Multiple Verifications
**Why**: Allows test to continue after assertion failure, reporting all failures at once.
**How**: Use SoftAssert instead of Assert for multiple verifications.

```java
// ✅ GOOD: Using SoftAssert for multiple checks
@Test
public void testUserProfile() {
    SoftAssert softAssert = new SoftAssert();

    driver.get("https://example.com/profile");

    String username = driver.findElement(By.id("username")).getText();
    String email = driver.findElement(By.id("email")).getText();
    String phone = driver.findElement(By.id("phone")).getText();

    softAssert.assertEquals(username, "JohnDoe", "Username mismatch");
    softAssert.assertEquals(email, "john@example.com", "Email mismatch");
    softAssert.assertEquals(phone, "1234567890", "Phone mismatch");

    softAssert.assertAll();  // Reports all failures together
}
```

### 6. Leverage Test Priorities Strategically
**Why**: Ensures critical tests run first and test flow is logical.
**How**: Assign priorities based on test importance and dependencies.

```java
// ✅ GOOD: Strategic priority usage
@Test(priority = 1, description = "Setup: Create test account")
public void testCreateAccount() {
    // Account creation
}

@Test(priority = 2, description = "Login with created account")
public void testLogin() {
    // Login test
}

@Test(priority = 3, description = "Perform main operations")
public void testMainFunctionality() {
    // Main test
}
```

### 7. Use Proper Assertion Messages
**Why**: Makes debugging easier when tests fail by providing context.
**How**: Always provide meaningful failure messages in assertions.

```java
// ✅ GOOD: Assertions with clear messages
@Test
public void testLoginRedirection() {
    driver.get("https://example.com/login");
    // Login logic
    String currentUrl = driver.getCurrentUrl();

    Assert.assertTrue(
        currentUrl.contains("dashboard"),
        "User should be redirected to dashboard after successful login. Current URL: " + currentUrl
    );
}

// ❌ BAD: No message
Assert.assertTrue(currentUrl.contains("dashboard"));  // Why did this fail?
```

---

## 17. Beginner-Friendly Exercises

### Exercise 1: First TestNG Test Creation

**Objective:** Create your first TestNG test from scratch and understand the basic structure.

**Scenario:** Convert a simple main method Selenium test into a TestNG test with proper annotations.

**Requirements:**
1. Create a test class with @Test annotation
2. Open Google homepage
3. Verify the title using Assert.assertEquals()
4. Print test execution message
5. Run the test and view results

**Code Template:**
```java
import org.testng.Assert;
import org.testng.annotations.Test;

public class FirstTestNGTest {

    @Test
    public void verifyGoogleTitle() {
        // TODO: Open browser
        // TODO: Navigate to Google
        // TODO: Get page title
        // TODO: Assert title equals "Google"
        // TODO: Close browser
    }
}
```

**Expected Outcome:**
- Test executes successfully
- Assertion passes
- TestNG report generated in test-output folder
- Console shows test execution details

**Solution Approach:**
1. Set up ChromeDriver
2. Use driver.get() to navigate
3. Use driver.getTitle() to get title
4. Use Assert.assertEquals() for verification
5. Use driver.quit() in finally block

**Common Mistakes to Avoid:**
- Forgetting to import TestNG annotations
- Not closing browser after test
- Using System.out.println() instead of assertions
- Missing @Test annotation
- Not handling browser cleanup

---

### Exercise 2: Annotation Hierarchy Understanding

**Objective:** Understand the execution order of TestNG annotations through practical implementation.

**Scenario:** Create a test class that demonstrates all annotation levels and their execution order.

**Requirements:**
1. Implement all annotations: @BeforeSuite, @BeforeTest, @BeforeClass, @BeforeMethod, @Test, @AfterMethod, @AfterClass, @AfterTest, @AfterSuite
2. Add print statements in each method showing annotation name
3. Create at least 2 @Test methods
4. Run and observe the execution order
5. Document the order in comments

**Code Template:**
```java
import org.testng.annotations.*;

public class AnnotationHierarchyTest {

    @BeforeSuite
    public void beforeSuite() {
        System.out.println("1. @BeforeSuite");
    }

    // TODO: Add @BeforeTest
    // TODO: Add @BeforeClass
    // TODO: Add @BeforeMethod
    // TODO: Add @Test method 1
    // TODO: Add @Test method 2
    // TODO: Add @AfterMethod
    // TODO: Add @AfterClass
    // TODO: Add @AfterTest
    // TODO: Add @AfterSuite
}
```

**Expected Outcome:**
```
1. @BeforeSuite
2. @BeforeTest
3. @BeforeClass
4. @BeforeMethod
5. Test Method 1
6. @AfterMethod
7. @BeforeMethod
8. Test Method 2
9. @AfterMethod
10. @AfterClass
11. @AfterTest
12. @AfterSuite
```

**Solution Approach:**
1. Create method for each annotation
2. Add descriptive print statements
3. Run test and observe console output
4. Verify order matches expected hierarchy
5. Document findings

**Common Mistakes to Avoid:**
- Mixing up Before and After annotations
- Not running enough tests to see BeforeMethod repetition
- Missing annotation imports
- Incorrect execution order assumptions

---

### Exercise 3: WebDriver Test with Setup and Teardown

**Objective:** Implement proper browser setup and cleanup using TestNG annotations.

**Scenario:** Create a complete test with @BeforeMethod for browser setup and @AfterMethod for cleanup.

**Requirements:**
1. Use @BeforeMethod to initialize ChromeDriver
2. Maximize window and set implicit wait
3. Create 3 @Test methods testing different websites
4. Use appropriate assertions in each test
5. Use @AfterMethod to close browser after each test

**Code Template:**
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import java.time.Duration;

public class SetupTeardownTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {
        // TODO: Initialize ChromeDriver
        // TODO: Maximize window
        // TODO: Set implicit wait
    }

    @Test(priority = 1)
    public void testGoogle() {
        // TODO: Navigate to Google
        // TODO: Verify title
    }

    @Test(priority = 2)
    public void testExample() {
        // TODO: Navigate to example.com
        // TODO: Verify URL
    }

    @Test(priority = 3)
    public void testWikipedia() {
        // TODO: Navigate to Wikipedia
        // TODO: Verify title contains "Wikipedia"
    }

    @AfterMethod
    public void teardown() {
        // TODO: Quit browser
    }
}
```

**Expected Outcome:**
- Browser opens before each test
- All 3 tests execute with fresh browser
- Browser closes after each test
- All assertions pass
- Tests run in priority order

**Solution Approach:**
1. Initialize driver in @BeforeMethod
2. Use driver.manage() for configurations
3. Navigate and assert in each test
4. Always quit driver in @AfterMethod
5. Use proper null checks

**Common Mistakes to Avoid:**
- Not closing browser after each test
- Sharing driver instance across tests
- Missing implicit wait setup
- Not maximizing window
- Forgetting null check before quit()

---

### Exercise 4: TestNG Assertions Practice

**Objective:** Master different types of TestNG assertions through practical examples.

**Scenario:** Create tests that use various assertion types to validate different conditions.

**Requirements:**
1. Create test for assertEquals()
2. Create test for assertTrue() and assertFalse()
3. Create test for assertNull() and assertNotNull()
4. Demonstrate assertion failure with custom message
5. Use at least 6 different assertion types

**Code Template:**
```java
import org.testng.Assert;
import org.testng.annotations.Test;

public class AssertionsExerciseTest {

    @Test
    public void testEquals() {
        // TODO: Test string equality
        String actual = "TestNG";
        String expected = "TestNG";
        // Assert they are equal
    }

    @Test
    public void testTrue() {
        // TODO: Test boolean condition
        boolean condition = 10 > 5;
        // Assert condition is true
    }

    @Test
    public void testNull() {
        // TODO: Test null value
        String value = null;
        // Assert value is null
    }

    @Test
    public void testNotNull() {
        // TODO: Test non-null value
        String value = "Not Null";
        // Assert value is not null
    }

    @Test
    public void testNotEquals() {
        // TODO: Test inequality
    }

    @Test
    public void testFalse() {
        // TODO: Test false condition
    }
}
```

**Expected Outcome:**
- All assertions work correctly
- Custom error messages display on failure
- Understanding of when to use each assertion type
- Clean test execution

**Solution Approach:**
1. Use appropriate assertion for each scenario
2. Add meaningful assertion messages
3. Test both positive and negative cases
4. Verify assertion behavior
5. Document when to use each type

**Common Mistakes to Avoid:**
- Using assertEquals for boolean checks
- Not providing assertion messages
- Wrong assertion method for data type
- Asserting incorrect expected values
- Not understanding assertion purpose

---

### Exercise 5: testng.xml Configuration

**Objective:** Create and configure testng.xml for organized test execution.

**Scenario:** Set up a testng.xml file to run multiple test classes in a structured manner.

**Requirements:**
1. Create testng.xml with suite and test tags
2. Include at least 2 test classes
3. Use meaningful suite and test names
4. Configure to run specific test methods
5. Run tests using testng.xml

**Code Template:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="My Test Suite">
    <test name="Smoke Tests">
        <classes>
            <!-- TODO: Add test classes -->
        </classes>
    </test>

    <test name="Regression Tests">
        <classes>
            <!-- TODO: Add more test classes -->
        </classes>
    </test>
</suite>
```

**Expected Outcome:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Complete Test Suite">
    <test name="Smoke Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.HomePageTest"/>
        </classes>
    </test>

    <test name="Regression Tests">
        <classes>
            <class name="tests.CheckoutTest"/>
            <class name="tests.SearchTest"/>
        </classes>
    </test>
</suite>
```

**Solution Approach:**
1. Create testng.xml in project root
2. Define suite with meaningful name
3. Add multiple test tags
4. Include test classes with full package path
5. Run using Right-click → Run as TestNG Suite

**Common Mistakes to Avoid:**
- Missing DOCTYPE declaration
- Incorrect package paths
- Wrong XML structure
- Not saving file before running
- Forgetting .xml extension

---

### Exercise 6: Test Priority and Execution Control

**Objective:** Control test execution order using priority attribute.

**Scenario:** Create tests with different priorities and verify execution order.

**Requirements:**
1. Create 5 test methods with different priorities
2. Use negative, zero, and positive priorities
3. Add print statements showing execution order
4. Create one test without priority
5. Document the execution order

**Code Template:**
```java
import org.testng.annotations.Test;

public class PriorityExerciseTest {

    @Test(priority = 3)
    public void testC() {
        System.out.println("Test C - Priority 3");
    }

    @Test(priority = 1)
    public void testA() {
        System.out.println("Test A - Priority 1");
    }

    @Test  // No priority
    public void testD() {
        System.out.println("Test D - No Priority");
    }

    @Test(priority = -1)
    public void testE() {
        System.out.println("Test E - Priority -1");
    }

    @Test(priority = 2)
    public void testB() {
        System.out.println("Test B - Priority 2");
    }
}
```

**Expected Outcome:**
```
Test E - Priority -1
Test D - No Priority (0)
Test A - Priority 1
Test B - Priority 2
Test C - Priority 3
```

**Solution Approach:**
1. Assign priorities strategically
2. Use priority = 0 as default
3. Run and observe console output
4. Verify order follows priority
5. Document findings

**Common Mistakes to Avoid:**
- Assuming alphabetical order
- Not understanding default priority is 0
- Expecting tests to run out of order
- Not using appropriate priority values
- Forgetting priority attribute syntax

---

## 18. Key Takeaways

1. **TestNG** is a powerful testing framework for Java
2. **Annotations** control test execution lifecycle
3. **@Test** marks a method as test method
4. **@BeforeMethod** runs before each test
5. **@AfterMethod** runs after each test
6. **Priority** controls test execution order
7. **Assertions** verify expected vs actual results
8. **testng.xml** configures test suites
9. **Reports** generated automatically in test-output folder
10. **Soft assertions** continue execution after failures

---

## 18. Common Interview Questions

1. What is TestNG?
2. What are the advantages of TestNG over JUnit?
3. What are TestNG annotations?
4. What is the execution order of annotations?
5. What's the difference between @BeforeMethod and @BeforeClass?
6. How do you set test execution order?
7. What's the difference between hard and soft assertions?
8. What is testng.xml?
9. How do you disable a test in TestNG?
10. Where are TestNG reports generated?

---

## Navigation

- **Previous:** [Day 17: Browser Options & Capabilities](./day17_browser_options_capabilities.md)
- **Next:** [Day 19: TestNG Part 2](./day19_testng_part2.md)
- **Week 3 Home:** [Week 3 Overview](./README.md)
- **Course Home:** [Selenium Course Overview](../README.md)

---

**Happy Learning!** TestNG is a foundational framework for professional test automation.
