# Deep Dive: TestNG Framework for Selenium Automation
## Comprehensive Guide from Basics to Advanced

---

## 📚 Table of Contents
1. [Introduction & Overview](#introduction)
2. [TestNG Annotations Deep Dive](#annotations)
3. [Test Configuration](#configuration)
4. [Assertions & Validations](#assertions)
5. [Test Dependencies](#dependencies)
6. [Data-Driven Testing](#data-driven)
7. [Parallel Execution](#parallel)
8. [Listeners & Reporters](#listeners)
9. [Advanced Features](#advanced)
10. [Best Practices](#best-practices)

---

## <a name="introduction"></a>📖 Introduction & Overview

### What is TestNG?

**Definition:**
> TestNG (Test Next Generation) is a powerful testing framework for Java inspired by JUnit and NUnit, but introducing new functionalities that make it more powerful and easier to use, especially for test automation.

### Why TestNG for Selenium?

**Without TestNG - The Problem:**
```java
// Nightmare scenario: No framework
public class ManualTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        // Test 1: Login
        driver.get("https://example.com/login");
        driver.findElement(By.id("username")).sendKeys("user1");
        driver.findElement(By.id("password")).sendKeys("pass1");
        driver.findElement(By.id("loginBtn")).click();

        // How do you verify? How do you report?
        // What if this test fails? Does the rest run?

        driver.quit(); // What if there's an exception above?
    }
}
```

**Problems:**
- ❌ No automatic test discovery
- ❌ No assertions/validations
- ❌ No test reporting
- ❌ Cannot group or prioritize tests
- ❌ No parallel execution
- ❌ No data-driven testing
- ❌ Browser cleanup issues if test fails

**With TestNG - The Solution:**
```java
public class TestNGTest {
    private WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test(priority = 1, groups = "smoke")
    public void testLogin() {
        driver.get("https://example.com/login");
        driver.findElement(By.id("username")).sendKeys("user1");
        driver.findElement(By.id("password")).sendKeys("pass1");
        driver.findElement(By.id("loginBtn")).click();

        Assert.assertTrue(driver.getCurrentUrl().contains("/dashboard"),
            "Should navigate to dashboard after login");
    }

    @Test(priority = 2, dependsOnMethods = "testLogin")
    public void testLogout() {
        driver.findElement(By.id("logoutBtn")).click();
        Assert.assertTrue(driver.getCurrentUrl().contains("/login"),
            "Should return to login page after logout");
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Benefits:**
- ✅ Automatic test execution
- ✅ Built-in assertions
- ✅ HTML reports
- ✅ Test organization (groups, priorities)
- ✅ Parallel execution support
- ✅ Data-driven testing
- ✅ Automatic cleanup

### TestNG vs JUnit Comparison

| Feature | TestNG | JUnit 4 | JUnit 5 |
|---------|--------|---------|---------|
| **Annotations** | Rich set (@BeforeSuite, @BeforeTest, etc.) | Basic set | Improved set |
| **Test Groups** | ✅ Yes | ❌ No | ⚠️ Tags (limited) |
| **Test Dependencies** | ✅ Yes (dependsOnMethods) | ❌ No | ❌ No |
| **Parallel Execution** | ✅ Built-in, easy configuration | ❌ Limited | ⚠️ Possible but complex |
| **DataProvider** | ✅ Built-in @DataProvider | ⚠️ @Parameterized (complex) | ⚠️ @ParameterizedTest |
| **Test Priority** | ✅ @Test(priority=1) | ❌ No | ⚠️ @Order (JUnit 5) |
| **Flexible Assertions** | ✅ Hard and Soft assertions | ❌ Only hard assertions | ⚠️ Only hard assertions |
| **HTML Reports** | ✅ Built-in | ❌ Needs plugins | ❌ Needs plugins |
| **Test Configuration** | ✅ testng.xml file | ⚠️ XML configurations | ⚠️ junit-platform.properties |
| **Listeners** | ✅ ITestListener, ISuiteListener | ⚠️ TestWatcher (limited) | ⚠️ Extensions |
| **Method Interception** | ✅ IMethodInterceptor | ❌ No | ❌ No |
| **Learning Curve** | Medium | Easy | Medium-Hard |
| **Industry Usage** | Very popular for Selenium | Less common | Growing |

**Verdict for Selenium:**
- TestNG is specifically designed for test automation needs
- Better suited for large-scale test frameworks
- JUnit 5 is catching up but TestNG still leads for Selenium

---

## <a name="annotations"></a>🏷️ TestNG Annotations Deep Dive

### Annotation Hierarchy & Execution Order

```
@BeforeSuite       ← Runs ONCE before all tests in suite
    ↓
@BeforeTest        ← Runs ONCE before <test> tag in testng.xml
    ↓
@BeforeClass       ← Runs ONCE before first method in current class
    ↓
@BeforeMethod      ← Runs BEFORE EACH @Test method
    ↓
@Test              ← Your test method
    ↓
@AfterMethod       ← Runs AFTER EACH @Test method
    ↓
@AfterClass        ← Runs ONCE after all methods in current class
    ↓
@AfterTest         ← Runs ONCE after <test> tag completes
    ↓
@AfterSuite        ← Runs ONCE after all tests in suite
```

### Complete Annotation Demonstration

```java
package testng.annotations;

import org.testng.annotations.*;

public class AnnotationOrderDemo {

    @BeforeSuite
    public void beforeSuite() {
        System.out.println("1. @BeforeSuite: Setting up test suite environment");
        System.out.println("   - Load configuration files");
        System.out.println("   - Initialize database connections");
        System.out.println("   - Set up test data");
    }

    @BeforeTest
    public void beforeTest() {
        System.out.println("\n2. @BeforeTest: Before <test> tag in testng.xml");
        System.out.println("   - Set test-level configurations");
    }

    @BeforeClass
    public void beforeClass() {
        System.out.println("\n3. @BeforeClass: Before first test method in this class");
        System.out.println("   - Initialize class-level resources");
        System.out.println("   - Set up shared test data");
    }

    @BeforeMethod
    public void beforeMethod() {
        System.out.println("\n4. @BeforeMethod: Before EACH test method");
        System.out.println("   - Start browser");
        System.out.println("   - Navigate to base URL");
    }

    @Test(priority = 1)
    public void test1() {
        System.out.println("\n5. @Test: Executing test1()");
        System.out.println("   - Perform test actions");
        System.out.println("   - Verify results");
    }

    @Test(priority = 2)
    public void test2() {
        System.out.println("\n5. @Test: Executing test2()");
        System.out.println("   - Perform test actions");
        System.out.println("   - Verify results");
    }

    @AfterMethod
    public void afterMethod() {
        System.out.println("\n6. @AfterMethod: After EACH test method");
        System.out.println("   - Close browser");
        System.out.println("   - Clear cookies");
    }

    @AfterClass
    public void afterClass() {
        System.out.println("\n7. @AfterClass: After all tests in this class");
        System.out.println("   - Clean up class-level resources");
    }

    @AfterTest
    public void afterTest() {
        System.out.println("\n8. @AfterTest: After <test> tag completes");
        System.out.println("   - Clean test-level configurations");
    }

    @AfterSuite
    public void afterSuite() {
        System.out.println("\n9. @AfterSuite: After all tests in suite");
        System.out.println("   - Close database connections");
        System.out.println("   - Generate final reports");
        System.out.println("   - Clean up all resources");
    }
}
```

**Expected Output:**
```
1. @BeforeSuite: Setting up test suite environment
   - Load configuration files
   - Initialize database connections
   - Set up test data

2. @BeforeTest: Before <test> tag in testng.xml
   - Set test-level configurations

3. @BeforeClass: Before first test method in this class
   - Initialize class-level resources
   - Set up shared test data

4. @BeforeMethod: Before EACH test method
   - Start browser
   - Navigate to base URL

5. @Test: Executing test1()
   - Perform test actions
   - Verify results

6. @AfterMethod: After EACH test method
   - Close browser
   - Clear cookies

4. @BeforeMethod: Before EACH test method
   - Start browser
   - Navigate to base URL

5. @Test: Executing test2()
   - Perform test actions
   - Verify results

6. @AfterMethod: After EACH test method
   - Close browser
   - Clear cookies

7. @AfterClass: After all tests in this class
   - Clean up class-level resources

8. @AfterTest: After <test> tag completes
   - Clean test-level configurations

9. @AfterSuite: After all tests in suite
   - Close database connections
   - Generate final reports
   - Clean up all resources
```

### @Test Annotation with All Attributes

```java
package testng.annotations;

import org.testng.Assert;
import org.testng.annotations.Test;

public class TestAnnotationAttributes {

    // 1. Basic test
    @Test
    public void basicTest() {
        System.out.println("Basic test with no attributes");
    }

    // 2. Test with description
    @Test(description = "Verify login functionality with valid credentials")
    public void testWithDescription() {
        System.out.println("Test with description - appears in reports");
    }

    // 3. Test with priority (lower number = higher priority)
    @Test(priority = 1)
    public void highPriorityTest() {
        System.out.println("This runs first (priority = 1)");
    }

    @Test(priority = 2)
    public void lowPriorityTest() {
        System.out.println("This runs second (priority = 2)");
    }

    // 4. Test with enabled/disabled
    @Test(enabled = false)
    public void disabledTest() {
        System.out.println("This test will NOT run");
    }

    @Test(enabled = true)  // Default is true
    public void enabledTest() {
        System.out.println("This test WILL run");
    }

    // 5. Test with timeout (in milliseconds)
    @Test(timeOut = 2000)  // Fails if takes more than 2 seconds
    public void testWithTimeout() throws InterruptedException {
        System.out.println("Test with 2 second timeout");
        Thread.sleep(1000);  // 1 second - will pass
        // Thread.sleep(3000);  // 3 seconds - would fail
    }

    // 6. Test with expected exception
    @Test(expectedExceptions = ArithmeticException.class)
    public void testExpectedException() {
        System.out.println("This test expects ArithmeticException");
        int result = 10 / 0;  // Will throw ArithmeticException - TEST PASSES
    }

    @Test(expectedExceptions = {NullPointerException.class, IllegalArgumentException.class})
    public void testMultipleExpectedExceptions() {
        System.out.println("This test expects NullPointerException or IllegalArgumentException");
        String str = null;
        str.length();  // Throws NullPointerException - TEST PASSES
    }

    // 7. Test with groups
    @Test(groups = "smoke")
    public void smokeTest() {
        System.out.println("Smoke test - quick verification");
    }

    @Test(groups = {"regression", "critical"})
    public void regressionTest() {
        System.out.println("Regression test - belongs to multiple groups");
    }

    // 8. Test with dependencies
    @Test
    public void loginTest() {
        System.out.println("Login test");
    }

    @Test(dependsOnMethods = "loginTest")
    public void addToCartTest() {
        System.out.println("Add to cart - depends on login");
    }

    // 9. Test with invocation count (runs test multiple times)
    @Test(invocationCount = 3)
    public void testMultipleInvocations() {
        System.out.println("This test will run 3 times");
    }

    // 10. Test with thread pool for invocations
    @Test(invocationCount = 5, threadPoolSize = 2)
    public void testWithThreadPool() {
        System.out.println("Running in thread: " + Thread.currentThread().getId());
    }

    // 11. Test with alwaysRun (runs even if dependencies fail)
    @Test(dependsOnMethods = "loginTest", alwaysRun = true)
    public void cleanupTest() {
        System.out.println("Cleanup - runs even if loginTest fails");
    }

    // 12. Complex example combining multiple attributes
    @Test(
        priority = 1,
        description = "Complete login test with all validations",
        groups = {"smoke", "critical"},
        timeOut = 5000,
        enabled = true
    )
    public void complexTest() {
        System.out.println("Complex test with multiple attributes");
        Assert.assertTrue(true, "Test should pass");
    }
}
```

### @DataProvider Advanced Usage

```java
package testng.annotations;

import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DataProviderExamples {

    // 1. Simple DataProvider
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"user1", "pass1"},
            {"user2", "pass2"},
            {"user3", "pass3"}
        };
    }

    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password) {
        System.out.println("Testing login with: " + username + " / " + password);
        // Perform login test
    }

    // 2. DataProvider with different data types
    @DataProvider(name = "registrationData")
    public Object[][] getRegistrationData() {
        return new Object[][] {
            {"John Doe", "john@example.com", 25, true},
            {"Jane Smith", "jane@example.com", 30, false},
            {"Bob Johnson", "bob@example.com", 35, true}
        };
    }

    @Test(dataProvider = "registrationData")
    public void testRegistration(String name, String email, int age, boolean subscribe) {
        System.out.println(String.format(
            "Name: %s, Email: %s, Age: %d, Subscribe: %b",
            name, email, age, subscribe
        ));
    }

    // 3. DataProvider with Method name filter
    @DataProvider(name = "searchData")
    public Object[][] getSearchData(java.lang.reflect.Method method) {
        // Provide different data based on test method name
        if (method.getName().equals("testGoogleSearch")) {
            return new Object[][] {
                {"Selenium WebDriver"},
                {"TestNG Framework"}
            };
        } else {
            return new Object[][] {
                {"Java Programming"},
                {"Test Automation"}
            };
        }
    }

    @Test(dataProvider = "searchData")
    public void testGoogleSearch(String searchTerm) {
        System.out.println("Google search: " + searchTerm);
    }

    @Test(dataProvider = "searchData")
    public void testBingSearch(String searchTerm) {
        System.out.println("Bing search: " + searchTerm);
    }

    // 4. Parallel DataProvider
    @DataProvider(name = "parallelData", parallel = true)
    public Object[][] getParallelData() {
        return new Object[][] {
            {"Test1"},
            {"Test2"},
            {"Test3"},
            {"Test4"},
            {"Test5"}
        };
    }

    @Test(dataProvider = "parallelData")
    public void testParallelExecution(String testData) {
        System.out.println("Thread " + Thread.currentThread().getId() + ": " + testData);
    }

    // 5. DataProvider from external class
    @Test(dataProvider = "externalData", dataProviderClass = ExternalDataProvider.class)
    public void testWithExternalData(String data) {
        System.out.println("External data: " + data);
    }
}

// External DataProvider class
class ExternalDataProvider {
    @DataProvider(name = "externalData")
    public static Object[][] getData() {
        return new Object[][] {
            {"External Data 1"},
            {"External Data 2"}
        };
    }
}
```

### @Parameters Annotation

```java
package testng.annotations;

import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParametersExample {

    // Single parameter from testng.xml
    @Test
    @Parameters("browser")
    public void testWithSingleParameter(String browser) {
        System.out.println("Running test on browser: " + browser);
    }

    // Multiple parameters from testng.xml
    @Test
    @Parameters({"browser", "url", "timeout"})
    public void testWithMultipleParameters(String browser, String url, String timeout) {
        System.out.println("Browser: " + browser);
        System.out.println("URL: " + url);
        System.out.println("Timeout: " + timeout);
    }
}
```

**Corresponding testng.xml:**
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parameter Suite">
    <test name="Chrome Test">
        <parameter name="browser" value="chrome"/>
        <parameter name="url" value="https://www.google.com"/>
        <parameter name="timeout" value="10"/>
        <classes>
            <class name="testng.annotations.ParametersExample"/>
        </classes>
    </test>

    <test name="Firefox Test">
        <parameter name="browser" value="firefox"/>
        <parameter name="url" value="https://www.google.com"/>
        <parameter name="timeout" value="15"/>
        <classes>
            <class name="testng.annotations.ParametersExample"/>
        </classes>
    </test>
</suite>
```

---

## <a name="configuration"></a>⚙️ Test Configuration

### testng.xml File Structure

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Complete Test Suite" verbose="1" parallel="methods" thread-count="3">

    <!-- Suite level parameters -->
    <parameter name="environment" value="QA"/>
    <parameter name="baseUrl" value="https://www.example.com"/>

    <!-- Suite level listeners -->
    <listeners>
        <listener class-name="com.example.listeners.TestListener"/>
        <listener class-name="com.example.listeners.SuiteListener"/>
    </listeners>

    <!-- Test 1: Smoke Tests -->
    <test name="Smoke Tests" preserve-order="true">
        <!-- Test level parameters (override suite parameters) -->
        <parameter name="browser" value="chrome"/>

        <!-- Define groups to run -->
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>

        <!-- Include specific classes -->
        <classes>
            <class name="com.example.tests.LoginTest"/>
            <class name="com.example.tests.SearchTest">
                <!-- Include only specific methods -->
                <methods>
                    <include name="testBasicSearch"/>
                    <include name="testAdvancedSearch"/>
                </methods>
            </class>
        </classes>
    </test>

    <!-- Test 2: Regression Tests -->
    <test name="Regression Tests" parallel="classes" thread-count="2">
        <parameter name="browser" value="firefox"/>

        <groups>
            <run>
                <include name="regression"/>
                <exclude name="broken"/>
            </run>
        </groups>

        <!-- Include packages -->
        <packages>
            <package name="com.example.tests.regression.*"/>
        </packages>
    </test>

    <!-- Test 3: Cross-browser Testing -->
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.example.tests.LoginTest"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="com.example.tests.LoginTest"/>
        </classes>
    </test>

</suite>
```

### Suite Organization Strategies

#### Strategy 1: Organize by Test Type
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Test Type Organization">
    <test name="Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <packages>
            <package name="com.example.tests.*"/>
        </packages>
    </test>

    <test name="Regression Tests">
        <groups>
            <run>
                <include name="regression"/>
            </run>
        </groups>
        <packages>
            <package name="com.example.tests.*"/>
        </packages>
    </test>
</suite>
```

#### Strategy 2: Organize by Module
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Module Organization">
    <test name="User Management Module">
        <classes>
            <class name="com.example.tests.LoginTest"/>
            <class name="com.example.tests.RegistrationTest"/>
            <class name="com.example.tests.ProfileTest"/>
        </classes>
    </test>

    <test name="Shopping Module">
        <classes>
            <class name="com.example.tests.ProductSearchTest"/>
            <class name="com.example.tests.CartTest"/>
            <class name="com.example.tests.CheckoutTest"/>
        </classes>
    </test>
</suite>
```

#### Strategy 3: Organize by Priority
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Priority Organization">
    <test name="P0 - Critical Tests">
        <groups>
            <run>
                <include name="P0"/>
            </run>
        </groups>
        <packages>
            <package name="com.example.tests.*"/>
        </packages>
    </test>

    <test name="P1 - High Priority Tests">
        <groups>
            <run>
                <include name="P1"/>
            </run>
        </groups>
        <packages>
            <package name="com.example.tests.*"/>
        </packages>
    </test>
</suite>
```

### Test Grouping Strategies

```java
package testng.grouping;

import org.testng.annotations.Test;

public class TestGroups {

    // Single group
    @Test(groups = "smoke")
    public void smokeTest1() {
        System.out.println("Smoke test 1");
    }

    // Multiple groups
    @Test(groups = {"smoke", "regression"})
    public void smokeAndRegressionTest() {
        System.out.println("Both smoke and regression");
    }

    // Priority groups
    @Test(groups = "P0")
    public void criticalTest() {
        System.out.println("Critical priority test");
    }

    @Test(groups = "P1")
    public void highPriorityTest() {
        System.out.println("High priority test");
    }

    // Module groups
    @Test(groups = {"login", "smoke"})
    public void loginSmokeTest() {
        System.out.println("Login module smoke test");
    }

    @Test(groups = {"login", "regression"})
    public void loginRegressionTest() {
        System.out.println("Login module regression test");
    }

    // Browser groups
    @Test(groups = "chrome")
    public void chromeOnlyTest() {
        System.out.println("Chrome specific test");
    }

    @Test(groups = {"chrome", "firefox"})
    public void crossBrowserTest() {
        System.out.println("Cross-browser test");
    }
}
```

### Advanced testng.xml with Include/Exclude Patterns

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Advanced Suite Configuration">

    <!-- Test with complex group patterns -->
    <test name="Complex Group Selection">
        <groups>
            <run>
                <!-- Include smoke tests -->
                <include name="smoke"/>

                <!-- Include all P0 and P1 tests -->
                <include name="P0"/>
                <include name="P1"/>

                <!-- Exclude broken tests -->
                <exclude name="broken"/>

                <!-- Exclude slow tests -->
                <exclude name="slow"/>
            </run>

            <!-- Define group dependencies -->
            <dependencies>
                <group name="login-required" depends-on="login"/>
                <group name="checkout" depends-on="cart login-required"/>
            </dependencies>
        </groups>

        <packages>
            <package name="com.example.tests.*"/>
        </packages>
    </test>

    <!-- Test with method-level includes/excludes -->
    <test name="Selective Method Execution">
        <classes>
            <class name="com.example.tests.LoginTest">
                <methods>
                    <!-- Include specific methods -->
                    <include name="testValidLogin"/>
                    <include name="testRememberMe"/>

                    <!-- Exclude specific methods -->
                    <exclude name="testSlowOperation"/>

                    <!-- Include methods matching pattern -->
                    <include name="test.*Password.*"/>
                </methods>
            </class>
        </classes>
    </test>

    <!-- Test excluding entire classes -->
    <test name="Package with Exclusions">
        <packages>
            <package name="com.example.tests">
                <!-- Exclude specific classes from package -->
                <exclude name="com.example.tests.BrokenTest"/>
                <exclude name="com.example.tests.UnderDevelopmentTest"/>
            </package>
        </packages>
    </test>
</suite>
```

### Parallel Execution Configuration

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<!-- Parallel at SUITE level (all tests in suite run parallel) -->
<suite name="Suite Parallel" parallel="tests" thread-count="2">
    <test name="Test 1">
        <classes>
            <class name="com.example.Test1"/>
        </classes>
    </test>
    <test name="Test 2">
        <classes>
            <class name="com.example.Test2"/>
        </classes>
    </test>
</suite>

<!-- Parallel at TEST level (classes within test run parallel) -->
<suite name="Test Level Parallel">
    <test name="Parallel Classes Test" parallel="classes" thread-count="3">
        <classes>
            <class name="com.example.Test1"/>
            <class name="com.example.Test2"/>
            <class name="com.example.Test3"/>
        </classes>
    </test>
</suite>

<!-- Parallel at METHOD level (all test methods run parallel) -->
<suite name="Method Level Parallel" parallel="methods" thread-count="5">
    <test name="Parallel Methods">
        <classes>
            <class name="com.example.Test1"/>
            <class name="com.example.Test2"/>
        </classes>
    </test>
</suite>

<!-- Parallel INSTANCES (different instances of same class) -->
<suite name="Instance Parallel" parallel="instances" thread-count="2">
    <test name="Parallel Instances">
        <classes>
            <class name="com.example.Test1"/>
        </classes>
    </test>
</suite>

<!-- Mixed parallel configuration -->
<suite name="Mixed Parallel Configuration" parallel="tests" thread-count="2">
    <test name="Test 1 - Parallel Methods" parallel="methods" thread-count="3">
        <classes>
            <class name="com.example.Test1"/>
        </classes>
    </test>

    <test name="Test 2 - Sequential">
        <classes>
            <class name="com.example.Test2"/>
        </classes>
    </test>
</suite>
```

---

## <a name="assertions"></a>✅ Assertions & Validations

### Hard Assertions vs Soft Assertions

**Hard Assertions:**
- Stop execution immediately on failure
- Test is marked as FAILED
- Remaining assertions in test are NOT executed

**Soft Assertions:**
- Continue execution even after failure
- Collect all failures
- Report all failures at end
- Must call `assertAll()` to mark test as failed

### Complete Hard Assertions Reference

```java
package testng.assertions;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class HardAssertionsComplete {

    private WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    public void testAllHardAssertions() {
        driver.get("https://the-internet.herokuapp.com/login");

        // 1. assertEquals - checks if two values are equal
        String expectedTitle = "The Internet";
        String actualTitle = driver.getTitle();
        Assert.assertEquals(actualTitle, expectedTitle,
            "Page title should match expected title");
        System.out.println("✓ assertEquals passed");

        // 2. assertNotEquals - checks if two values are NOT equal
        String username = "tomsmith";
        String password = "SuperSecretPassword!";
        Assert.assertNotEquals(username, password,
            "Username and password should be different");
        System.out.println("✓ assertNotEquals passed");

        // 3. assertTrue - checks if condition is true
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("herokuapp"),
            "URL should contain 'herokuapp'");
        System.out.println("✓ assertTrue passed");

        // 4. assertFalse - checks if condition is false
        Assert.assertFalse(currentUrl.contains("google"),
            "URL should NOT contain 'google'");
        System.out.println("✓ assertFalse passed");

        // 5. assertNull - checks if object is null
        String nullValue = null;
        Assert.assertNull(nullValue,
            "Value should be null");
        System.out.println("✓ assertNull passed");

        // 6. assertNotNull - checks if object is NOT null
        WebElement usernameField = driver.findElement(By.id("username"));
        Assert.assertNotNull(usernameField,
            "Username field should not be null");
        System.out.println("✓ assertNotNull passed");

        // 7. assertSame - checks if two references point to same object
        WebDriver driver1 = driver;
        Assert.assertSame(driver, driver1,
            "Both references should point to same driver instance");
        System.out.println("✓ assertSame passed");

        // 8. assertNotSame - checks if two references point to different objects
        String str1 = new String("test");
        String str2 = new String("test");
        Assert.assertNotSame(str1, str2,
            "Different string objects should not be same reference");
        System.out.println("✓ assertNotSame passed");

        // 9. fail - explicitly fail the test with message
        boolean condition = true;
        if (!condition) {
            Assert.fail("Explicitly failing test because condition is false");
        }
        System.out.println("✓ Test did not fail");

        System.out.println("\n✅ All hard assertions passed!");
    }

    @Test
    public void testHardAssertionStopsExecution() {
        System.out.println("Starting test...");

        Assert.assertEquals(5, 5, "This assertion passes");
        System.out.println("After first assertion");

        Assert.assertEquals(5, 10, "This assertion FAILS - test stops here!");

        // This line will NEVER execute
        System.out.println("After failed assertion - THIS WILL NOT PRINT");
        Assert.assertTrue(true, "This assertion will never be checked");
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Complete Soft Assertions Guide

```java
package testng.assertions;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

public class SoftAssertionsComplete {

    private WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    public void testSoftAssertionsContinueExecution() {
        // MUST create SoftAssert object for each test
        SoftAssert softAssert = new SoftAssert();

        driver.get("https://www.example.com");

        System.out.println("Starting soft assertions test...");

        // Assertion 1 - WILL FAIL but test continues
        softAssert.assertEquals(driver.getTitle(), "Wrong Title",
            "Assertion 1: Title check");
        System.out.println("After assertion 1 (failed) - EXECUTION CONTINUES");

        // Assertion 2 - WILL PASS
        softAssert.assertTrue(driver.getCurrentUrl().contains("example"),
            "Assertion 2: URL check");
        System.out.println("After assertion 2 (passed)");

        // Assertion 3 - WILL FAIL but test continues
        softAssert.assertFalse(driver.getPageSource().contains("Example"),
            "Assertion 3: Page source check");
        System.out.println("After assertion 3 (failed) - EXECUTION STILL CONTINUES");

        // Assertion 4 - WILL PASS
        WebElement body = driver.findElement(By.tagName("body"));
        softAssert.assertNotNull(body, "Assertion 4: Body element check");
        System.out.println("After assertion 4 (passed)");

        System.out.println("\nAll assertions checked. Now calling assertAll()...\n");

        // CRITICAL: Must call assertAll() to report failures
        // If you forget this, test will pass even with failures!
        softAssert.assertAll();
    }

    @Test
    public void testComprehensivePageValidation() {
        SoftAssert softAssert = new SoftAssert();

        driver.get("https://the-internet.herokuapp.com/login");

        System.out.println("=== Comprehensive Page Validation ===\n");

        // Validate page title
        softAssert.assertEquals(driver.getTitle(), "The Internet",
            "Page title validation");
        System.out.println("✓ Title validated");

        // Validate URL
        softAssert.assertTrue(driver.getCurrentUrl().contains("/login"),
            "URL should contain '/login'");
        System.out.println("✓ URL validated");

        // Validate username field
        WebElement usernameField = driver.findElement(By.id("username"));
        softAssert.assertNotNull(usernameField, "Username field should exist");
        softAssert.assertTrue(usernameField.isDisplayed(), "Username should be visible");
        softAssert.assertEquals(usernameField.getAttribute("type"), "text",
            "Username field should be text type");
        System.out.println("✓ Username field validated");

        // Validate password field
        WebElement passwordField = driver.findElement(By.id("password"));
        softAssert.assertNotNull(passwordField, "Password field should exist");
        softAssert.assertTrue(passwordField.isDisplayed(), "Password should be visible");
        softAssert.assertEquals(passwordField.getAttribute("type"), "password",
            "Password field should be password type");
        System.out.println("✓ Password field validated");

        // Validate login button
        WebElement loginButton = driver.findElement(By.cssSelector("button[type='submit']"));
        softAssert.assertNotNull(loginButton, "Login button should exist");
        softAssert.assertTrue(loginButton.isDisplayed(), "Login button should be visible");
        softAssert.assertTrue(loginButton.isEnabled(), "Login button should be enabled");
        System.out.println("✓ Login button validated");

        // Validate page heading
        WebElement heading = driver.findElement(By.tagName("h2"));
        softAssert.assertEquals(heading.getText(), "Login Page",
            "Page heading should be 'Login Page'");
        System.out.println("✓ Page heading validated");

        System.out.println("\n=== All Validations Complete ===");
        System.out.println("Calling assertAll() to report results...\n");

        // Report all assertion results
        softAssert.assertAll();
    }

    @Test
    public void testForgettingAssertAll() {
        SoftAssert softAssert = new SoftAssert();

        System.out.println("Test with FORGOTTEN assertAll()");

        // All these assertions will fail
        softAssert.assertEquals(1, 2, "1 should equal 2");
        softAssert.assertTrue(false, "False should be true");
        softAssert.assertNull("Not null", "String should be null");

        System.out.println("If you forget assertAll(), test PASSES even with failures!");

        // OOPS! Forgot to call assertAll()
        // This test will be marked as PASSED (which is wrong!)
        // softAssert.assertAll(); // Uncomment this to see test fail properly
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Assertion Best Practices

```java
package testng.assertions;

import org.testng.Assert;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

public class AssertionBestPractices {

    // GOOD: Descriptive assertion messages
    @Test
    public void testWithGoodMessages() {
        String actual = "Hello";
        String expected = "Hello";

        // ✅ GOOD: Clear message explaining what was expected
        Assert.assertEquals(actual, expected,
            "Welcome message should match: Expected '" + expected +
            "' but got '" + actual + "'");
    }

    // BAD: No assertion message
    @Test
    public void testWithBadMessages() {
        String actual = "Hello";
        String expected = "Hello";

        // ❌ BAD: No message - hard to debug when it fails
        Assert.assertEquals(actual, expected);
    }

    // GOOD: One logical assertion per test method
    @Test
    public void testLoginFunctionality() {
        boolean loginSuccessful = performLogin();

        // ✅ GOOD: Single clear assertion
        Assert.assertTrue(loginSuccessful,
            "Login should succeed with valid credentials");
    }

    // BAD: Too many unrelated assertions
    @Test
    public void testEverything() {
        // ❌ BAD: Testing too many things in one test
        Assert.assertEquals("title", "title", "Title check");
        Assert.assertTrue(true, "Boolean check");
        Assert.assertNotNull("value", "Null check");
        // ... 20 more assertions
        // When this fails, which assertion failed? Hard to tell!
    }

    // GOOD: Use soft assertions when you need multiple validations
    @Test
    public void testMultipleRelatedValidations() {
        SoftAssert soft = new SoftAssert();

        // ✅ GOOD: Multiple related validations for same feature
        PageObject page = new PageObject();
        soft.assertTrue(page.isTitleCorrect(), "Page title should be correct");
        soft.assertTrue(page.isUrlCorrect(), "Page URL should be correct");
        soft.assertTrue(page.isHeaderDisplayed(), "Header should be visible");

        soft.assertAll();
    }

    // GOOD: Assert actual vs expected in correct order
    @Test
    public void testCorrectAssertOrder() {
        String actual = "Hello";
        String expected = "Hello";

        // ✅ GOOD: assertEquals(actual, expected)
        Assert.assertEquals(actual, expected, "Should match");
    }

    @Test
    public void testWrongAssertOrder() {
        String actual = "Hello";
        String expected = "Hello";

        // ❌ BAD: assertEquals(expected, actual) - confusing error messages
        Assert.assertEquals(expected, actual, "Should match");
    }

    // GOOD: Use appropriate assertion method
    @Test
    public void testAppropriateAssertMethods() {
        boolean condition = true;

        // ✅ GOOD: Use assertTrue for boolean
        Assert.assertTrue(condition, "Condition should be true");

        // ❌ BAD: Using assertEquals for boolean
        Assert.assertEquals(condition, true, "Condition should be true");
    }

    // GOOD: Verify before asserting
    @Test
    public void testVerifyBeforeAssert() {
        String value = getValue();

        // ✅ GOOD: Check for null before using
        Assert.assertNotNull(value, "Value should not be null");
        Assert.assertTrue(value.contains("expected"),
            "Value should contain 'expected'");
    }

    // BAD: No null check
    @Test
    public void testNoNullCheck() {
        String value = getValue();

        // ❌ BAD: Will throw NullPointerException if value is null
        Assert.assertTrue(value.contains("expected"),
            "Value should contain 'expected'");
    }

    // Helper methods
    private boolean performLogin() {
        return true;
    }

    private String getValue() {
        return "test value";
    }

    private class PageObject {
        boolean isTitleCorrect() { return true; }
        boolean isUrlCorrect() { return true; }
        boolean isHeaderDisplayed() { return true; }
    }
}
```

### Custom Assertion Messages with Dynamic Content

```java
package testng.assertions;

import org.testng.Assert;
import org.testng.annotations.Test;

public class DynamicAssertionMessages {

    @Test
    public void testDynamicMessages() {
        String username = "john_doe";
        String actualEmail = "john@example.com";
        String expectedEmail = "john.doe@example.com";
        int actualAge = 25;
        int expectedAge = 30;

        // Dynamic message with multiple variables
        Assert.assertEquals(actualEmail, expectedEmail,
            String.format("Email mismatch for user '%s': Expected '%s' but got '%s'",
                username, expectedEmail, actualEmail));

        Assert.assertEquals(actualAge, expectedAge,
            String.format("Age validation failed for user '%s': " +
                "Expected age %d but found %d",
                username, expectedAge, actualAge));
    }

    @Test
    public void testDetailedFailureMessage() {
        // Simulate API response
        int statusCode = 404;
        String responseBody = "{\"error\": \"User not found\"}";

        Assert.assertEquals(statusCode, 200,
            String.format("API request failed!\n" +
                "Status Code: %d (expected 200)\n" +
                "Response: %s\n" +
                "Endpoint: /api/users/123",
                statusCode, responseBody));
    }
}
```

---

## <a name="dependencies"></a>🔗 Test Dependencies

### dependsOnMethods - Method Dependencies

```java
package testng.dependencies;

import org.testng.Assert;
import org.testng.annotations.Test;

public class MethodDependencies {

    private static boolean loginSuccessful = false;
    private static boolean cartHasItems = false;

    @Test(priority = 1)
    public void test1_Login() {
        System.out.println("1. Login Test");
        // Simulate login
        loginSuccessful = true;
        Assert.assertTrue(loginSuccessful, "Login should succeed");
        System.out.println("   ✓ Login successful\n");
    }

    @Test(priority = 2, dependsOnMethods = "test1_Login")
    public void test2_AddToCart() {
        System.out.println("2. Add to Cart Test (depends on Login)");

        if (!loginSuccessful) {
            Assert.fail("Cannot add to cart - login failed");
        }

        // Simulate adding to cart
        cartHasItems = true;
        Assert.assertTrue(cartHasItems, "Cart should have items");
        System.out.println("   ✓ Items added to cart\n");
    }

    @Test(priority = 3, dependsOnMethods = {"test1_Login", "test2_AddToCart"})
    public void test3_Checkout() {
        System.out.println("3. Checkout Test (depends on Login and AddToCart)");

        if (!loginSuccessful || !cartHasItems) {
            Assert.fail("Cannot checkout - prerequisites not met");
        }

        System.out.println("   ✓ Checkout successful\n");
        Assert.assertTrue(true);
    }

    @Test(priority = 4, dependsOnMethods = "test3_Checkout", alwaysRun = true)
    public void test4_Logout() {
        System.out.println("4. Logout Test (alwaysRun = true)");
        System.out.println("   ✓ Logout - runs even if Checkout fails\n");
        Assert.assertTrue(true);
    }

    // This test will be SKIPPED if test1_Login fails
    @Test(dependsOnMethods = "test1_Login")
    public void test5_ViewProfile() {
        System.out.println("5. View Profile (depends on Login)");
        System.out.println("   ✓ Profile viewed\n");
    }
}
```

**Output when all tests pass:**
```
1. Login Test
   ✓ Login successful

2. Add to Cart Test (depends on Login)
   ✓ Items added to cart

3. Checkout Test (depends on Login and AddToCart)
   ✓ Checkout successful

4. Logout Test (alwaysRun = true)
   ✓ Logout - runs even if Checkout fails

5. View Profile (depends on Login)
   ✓ Profile viewed

PASSED: test1_Login
PASSED: test2_AddToCart
PASSED: test3_Checkout
PASSED: test4_Logout
PASSED: test5_ViewProfile
```

**Output when Login test fails:**
```
1. Login Test
   ✗ Login failed

4. Logout Test (alwaysRun = true)
   ✓ Logout - runs even if Checkout fails

FAILED: test1_Login
SKIPPED: test2_AddToCart (depends on test1_Login)
SKIPPED: test3_Checkout (depends on test1_Login, test2_AddToCart)
PASSED: test4_Logout (alwaysRun = true)
SKIPPED: test5_ViewProfile (depends on test1_Login)
```

### dependsOnGroups - Group Dependencies

```java
package testng.dependencies;

import org.testng.Assert;
import org.testng.annotations.Test;

public class GroupDependencies {

    // Database setup group
    @Test(groups = "database-setup")
    public void setupDatabase() {
        System.out.println("1. Setting up database");
        Assert.assertTrue(true);
    }

    @Test(groups = "database-setup")
    public void loadTestData() {
        System.out.println("2. Loading test data");
        Assert.assertTrue(true);
    }

    // Tests depending on database-setup group
    @Test(dependsOnGroups = "database-setup", groups = "user-tests")
    public void testCreateUser() {
        System.out.println("3. Create User (depends on database-setup)");
        Assert.assertTrue(true);
    }

    @Test(dependsOnGroups = "database-setup", groups = "user-tests")
    public void testUpdateUser() {
        System.out.println("4. Update User (depends on database-setup)");
        Assert.assertTrue(true);
    }

    // Tests depending on user-tests group
    @Test(dependsOnGroups = "user-tests", groups = "cleanup")
    public void cleanupUsers() {
        System.out.println("5. Cleanup Users (depends on user-tests)");
        Assert.assertTrue(true);
    }

    @Test(dependsOnGroups = "cleanup")
    public void teardownDatabase() {
        System.out.println("6. Teardown Database (depends on cleanup)");
        Assert.assertTrue(true);
    }
}
```

### Priority vs Dependencies

```java
package testng.dependencies;

import org.testng.Assert;
import org.testng.annotations.Test;

public class PriorityVsDependencies {

    // Example 1: Using priority only
    @Test(priority = 1)
    public void testWithPriority1() {
        System.out.println("Priority 1");
        // Even if this fails, other tests will still run
        Assert.fail("This test fails");
    }

    @Test(priority = 2)
    public void testWithPriority2() {
        System.out.println("Priority 2 - STILL RUNS even though Priority 1 failed");
        Assert.assertTrue(true);
    }

    // Example 2: Using dependencies only
    @Test
    public void testDependency1() {
        System.out.println("Dependency 1");
        Assert.fail("This test fails");
    }

    @Test(dependsOnMethods = "testDependency1")
    public void testDependency2() {
        System.out.println("Dependency 2 - WILL BE SKIPPED because Dependency 1 failed");
        Assert.assertTrue(true);
    }

    // Example 3: Combining priority and dependencies
    @Test(priority = 1)
    public void testCombined1() {
        System.out.println("Combined: Priority 1");
        Assert.assertTrue(true);
    }

    @Test(priority = 2, dependsOnMethods = "testCombined1")
    public void testCombined2() {
        System.out.println("Combined: Priority 2, depends on testCombined1");
        Assert.assertTrue(true);
    }

    @Test(priority = 3, dependsOnMethods = "testCombined2")
    public void testCombined3() {
        System.out.println("Combined: Priority 3, depends on testCombined2");
        Assert.assertTrue(true);
    }
}
```

**Key Differences:**

| Aspect | Priority | Dependencies |
|--------|----------|--------------|
| **Purpose** | Control execution order | Create test relationships |
| **On Failure** | Other tests still run | Dependent tests are SKIPPED |
| **Use Case** | Order of independent tests | Tests that require prerequisites |
| **Example** | Run smoke tests before regression | Login before checkout |

### Managing Test Order - Best Practices

```java
package testng.dependencies;

import org.testng.Assert;
import org.testng.annotations.Test;

public class TestOrderBestPractices {

    // ✅ GOOD: Independent tests with priority for logical order
    @Test(priority = 1, groups = "smoke")
    public void testHomePage() {
        System.out.println("Test 1: Home page loads");
        Assert.assertTrue(true);
    }

    @Test(priority = 2, groups = "smoke")
    public void testSearchFunctionality() {
        System.out.println("Test 2: Search works");
        Assert.assertTrue(true);
    }

    @Test(priority = 3, groups = "smoke")
    public void testNavigationLinks() {
        System.out.println("Test 3: Navigation links work");
        Assert.assertTrue(true);
    }

    // ✅ GOOD: Use dependencies for true prerequisites
    @Test
    public void setupTestEnvironment() {
        System.out.println("Setup: Initialize environment");
        Assert.assertTrue(true);
    }

    @Test(dependsOnMethods = "setupTestEnvironment")
    public void runTestOnEnvironment() {
        System.out.println("Test: Run on initialized environment");
        Assert.assertTrue(true);
    }

    @Test(dependsOnMethods = "runTestOnEnvironment", alwaysRun = true)
    public void cleanupTestEnvironment() {
        System.out.println("Cleanup: Always runs to clean environment");
        Assert.assertTrue(true);
    }

    // ❌ BAD: Excessive dependencies create brittle tests
    @Test
    public void badTest1() { }

    @Test(dependsOnMethods = "badTest1")
    public void badTest2() { }

    @Test(dependsOnMethods = "badTest2")
    public void badTest3() { }

    @Test(dependsOnMethods = "badTest3")
    public void badTest4() { }
    // If badTest1 fails, ALL tests are skipped!
}
```

---

## <a name="data-driven"></a>📊 Data-Driven Testing

### @DataProvider Fundamentals

```java
package testng.dataprovider;

import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DataProviderBasics {

    // Simple DataProvider
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"user1", "pass1"},
            {"user2", "pass2"},
            {"user3", "pass3"}
        };
    }

    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password) {
        System.out.println("Testing with: " + username + " / " + password);
        // Test will run 3 times with different data
    }

    // DataProvider with multiple columns
    @DataProvider(name = "searchData")
    public Object[][] getSearchData() {
        return new Object[][] {
            {"Selenium", 10, true},
            {"TestNG", 5, false},
            {"Java", 20, true}
        };
    }

    @Test(dataProvider = "searchData")
    public void testSearch(String keyword, int expectedResults, boolean exactMatch) {
        System.out.println(String.format(
            "Search: '%s', Expected: %d results, Exact: %b",
            keyword, expectedResults, exactMatch
        ));
    }
}
```

### Excel Integration with Apache POI

**Step 1: Add Apache POI dependency to pom.xml**
```xml
<dependencies>
    <!-- Apache POI for Excel -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi</artifactId>
        <version>5.2.3</version>
    </dependency>
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>5.2.3</version>
    </dependency>
</dependencies>
```

**Step 2: Create Excel utility class**
```java
package testng.dataprovider.utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;

public class ExcelUtils {

    public static Object[][] getExcelData(String filePath, String sheetName) {
        Object[][] data = null;

        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheet(sheetName);
            int rowCount = sheet.getLastRowNum();
            int colCount = sheet.getRow(0).getLastCellNum();

            data = new Object[rowCount][colCount];

            for (int i = 0; i < rowCount; i++) {
                Row row = sheet.getRow(i + 1); // Skip header row
                for (int j = 0; j < colCount; j++) {
                    Cell cell = row.getCell(j);
                    data[i][j] = getCellValue(cell);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return data;
    }

    private static Object getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue();
                } else {
                    return cell.getNumericCellValue();
                }
            case BOOLEAN:
                return cell.getBooleanCellValue();
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
}
```

**Step 3: Use Excel DataProvider**
```java
package testng.dataprovider;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import testng.dataprovider.utils.ExcelUtils;

public class ExcelDataProviderTest {

    @DataProvider(name = "excelData")
    public Object[][] getDataFromExcel() {
        String filePath = "src/test/resources/testdata/LoginData.xlsx";
        String sheetName = "Sheet1";
        return ExcelUtils.getExcelData(filePath, sheetName);
    }

    @Test(dataProvider = "excelData")
    public void testWithExcelData(String username, String password, String expectedResult) {
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Expected: " + expectedResult);
        System.out.println("---");
    }
}
```

### JSON Data Source

**Step 1: Add JSON dependency**
```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

**Step 2: Create JSON file (testdata.json)**
```json
{
  "testData": [
    {
      "username": "user1",
      "password": "pass1",
      "email": "user1@example.com",
      "expectedResult": "success"
    },
    {
      "username": "user2",
      "password": "pass2",
      "email": "user2@example.com",
      "expectedResult": "success"
    },
    {
      "username": "invalid",
      "password": "wrong",
      "email": "invalid@example.com",
      "expectedResult": "failure"
    }
  ]
}
```

**Step 3: Create JSON utility**
```java
package testng.dataprovider.utils;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.FileReader;
import java.io.IOException;

public class JsonUtils {

    public static Object[][] getJsonData(String filePath, String arrayName) {
        Object[][] data = null;

        try (FileReader reader = new FileReader(filePath)) {
            Gson gson = new Gson();
            JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);
            JsonArray jsonArray = jsonObject.getAsJsonArray(arrayName);

            data = new Object[jsonArray.size()][1];

            for (int i = 0; i < jsonArray.size(); i++) {
                data[i][0] = jsonArray.get(i);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return data;
    }
}
```

**Step 4: Use JSON DataProvider**
```java
package testng.dataprovider;

import com.google.gson.JsonObject;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import testng.dataprovider.utils.JsonUtils;

public class JsonDataProviderTest {

    @DataProvider(name = "jsonData")
    public Object[][] getDataFromJson() {
        String filePath = "src/test/resources/testdata/testdata.json";
        return JsonUtils.getJsonData(filePath, "testData");
    }

    @Test(dataProvider = "jsonData")
    public void testWithJsonData(JsonObject testData) {
        String username = testData.get("username").getAsString();
        String password = testData.get("password").getAsString();
        String email = testData.get("email").getAsString();
        String expectedResult = testData.get("expectedResult").getAsString();

        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
        System.out.println("Email: " + email);
        System.out.println("Expected: " + expectedResult);
        System.out.println("---");
    }
}
```

### CSV Data Source

```java
package testng.dataprovider.utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CSVUtils {

    public static Object[][] getCSVData(String filePath) {
        List<String[]> records = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            boolean isFirstLine = true;

            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue; // Skip header
                }
                String[] values = line.split(",");
                records.add(values);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        // Convert List to 2D array
        Object[][] data = new Object[records.size()][];
        for (int i = 0; i < records.size(); i++) {
            data[i] = records.get(i);
        }

        return data;
    }
}
```

### ITestContext Usage

```java
package testng.dataprovider;

import org.testng.ITestContext;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.lang.reflect.Method;

public class TestContextExample {

    // DataProvider with Method parameter
    @DataProvider(name = "contextData")
    public Object[][] getData(Method method, ITestContext context) {
        String testName = method.getName();
        String suiteName = context.getSuite().getName();

        System.out.println("DataProvider called for:");
        System.out.println("  Test Method: " + testName);
        System.out.println("  Suite Name: " + suiteName);

        // Return different data based on context
        if (testName.equals("testLogin")) {
            return new Object[][] {
                {"user1", "pass1"},
                {"user2", "pass2"}
            };
        } else {
            return new Object[][] {
                {"search1"},
                {"search2"}
            };
        }
    }

    @Test(dataProvider = "contextData")
    public void testLogin(String username, String password) {
        System.out.println("Login: " + username + " / " + password);
    }

    @Test(dataProvider = "contextData")
    public void testSearch(String searchTerm) {
        System.out.println("Search: " + searchTerm);
    }
}
```

---

## <a name="parallel"></a>⚡ Parallel Execution

### Parallel Execution Modes

TestNG supports 5 parallel execution modes:

1. **parallel="methods"** - All test methods run in parallel
2. **parallel="classes"** - All test classes run in parallel
3. **parallel="tests"** - All <test> tags run in parallel
4. **parallel="instances"** - Different instances of same class run in parallel
5. **parallel="false"** - No parallel execution (default)

### Parallel Methods Configuration

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Methods Suite" parallel="methods" thread-count="3">
    <test name="Parallel Methods Test">
        <classes>
            <class name="testng.parallel.ParallelMethodsTest"/>
        </classes>
    </test>
</suite>
```

```java
package testng.parallel;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ParallelMethodsTest {

    private WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Setup driver");
    }

    @Test
    public void test1() {
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Executing test1");
        driver.get("https://www.google.com");
    }

    @Test
    public void test2() {
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Executing test2");
        driver.get("https://www.wikipedia.org");
    }

    @Test
    public void test3() {
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Executing test3");
        driver.get("https://www.selenium.dev");
    }

    @AfterMethod
    public void teardown() {
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Closing driver");
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Parallel Classes Configuration

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Classes Suite" parallel="classes" thread-count="2">
    <test name="Parallel Classes Test">
        <classes>
            <class name="testng.parallel.TestClass1"/>
            <class name="testng.parallel.TestClass2"/>
            <class name="testng.parallel.TestClass3"/>
        </classes>
    </test>
</suite>
```

### Thread Safety with ThreadLocal

```java
package testng.parallel;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ThreadSafeTest {

    // ThreadLocal ensures each thread gets its own WebDriver instance
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    @BeforeMethod
    public void setup() {
        // Each thread creates its own driver
        driver.set(new ChromeDriver());
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Created driver");
    }

    @Test
    public void test1() {
        // Get driver for current thread
        WebDriver currentDriver = driver.get();
        currentDriver.get("https://www.google.com");
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Executed test1");
    }

    @Test
    public void test2() {
        WebDriver currentDriver = driver.get();
        currentDriver.get("https://www.wikipedia.org");
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Executed test2");
    }

    @AfterMethod
    public void teardown() {
        // Quit driver for current thread
        WebDriver currentDriver = driver.get();
        if (currentDriver != null) {
            currentDriver.quit();
            System.out.println("Thread " + Thread.currentThread().getId() +
                ": Closed driver");
        }
        driver.remove(); // Clean up ThreadLocal
    }
}
```

### Complete Thread-Safe Framework Pattern

```java
package testng.parallel.framework;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class DriverManager {

    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver getDriver() {
        return driver.get();
    }

    public static void setDriver(String browserName) {
        WebDriver webDriver = null;

        switch (browserName.toLowerCase()) {
            case "chrome":
                webDriver = new ChromeDriver();
                break;
            case "firefox":
                webDriver = new FirefoxDriver();
                break;
            default:
                throw new IllegalArgumentException("Browser not supported: " + browserName);
        }

        webDriver.manage().window().maximize();
        driver.set(webDriver);
    }

    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}
```

```java
package testng.parallel.framework;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParallelBrowserTest {

    @BeforeMethod
    @Parameters("browser")
    public void setup(String browser) {
        DriverManager.setDriver(browser);
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Started " + browser);
    }

    @Test
    public void testGoogleSearch() {
        DriverManager.getDriver().get("https://www.google.com");
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Executed Google search");
    }

    @Test
    public void testWikipediaSearch() {
        DriverManager.getDriver().get("https://www.wikipedia.org");
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Executed Wikipedia search");
    }

    @AfterMethod
    public void teardown() {
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Closing browser");
        DriverManager.quitDriver();
    }
}
```

**testng.xml for cross-browser parallel execution:**
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Cross-Browser Parallel Suite" parallel="tests" thread-count="2">

    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="testng.parallel.framework.ParallelBrowserTest"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="testng.parallel.framework.ParallelBrowserTest"/>
        </classes>
    </test>

</suite>
```

### Performance Optimization Tips

```java
package testng.parallel;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class OptimizedParallelExecution {

    // Use parallel DataProvider for faster data-driven tests
    @DataProvider(name = "testData", parallel = true)
    public Object[][] getData() {
        return new Object[][] {
            {"Data1"},
            {"Data2"},
            {"Data3"},
            {"Data4"},
            {"Data5"}
        };
    }

    @Test(dataProvider = "testData")
    public void parallelDataTest(String data) {
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Processing " + data);
        // Each data set runs in parallel thread
    }

    // Use invocationCount with threadPoolSize for load testing
    @Test(invocationCount = 10, threadPoolSize = 3)
    public void loadTest() {
        System.out.println("Thread " + Thread.currentThread().getId() +
            ": Load test execution");
        // Runs 10 times with max 3 concurrent threads
    }
}
```

---

## <a name="listeners"></a>🎧 Listeners & Reporters

### ITestListener Interface

```java
package testng.listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class TestListener implements ITestListener {

    @Override
    public void onStart(ITestContext context) {
        System.out.println("\n=== Test Suite Started: " + context.getName() + " ===");
        System.out.println("Start Time: " + new java.util.Date(context.getStartMillis()));
    }

    @Override
    public void onFinish(ITestContext context) {
        System.out.println("\n=== Test Suite Finished: " + context.getName() + " ===");
        System.out.println("End Time: " + new java.util.Date(context.getEndMillis()));
        System.out.println("Total Tests: " + context.getAllTestMethods().length);
        System.out.println("Passed: " + context.getPassedTests().size());
        System.out.println("Failed: " + context.getFailedTests().size());
        System.out.println("Skipped: " + context.getSkippedTests().size());
    }

    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("\n--- Test Started: " + result.getName() + " ---");
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("✓ Test PASSED: " + result.getName());
        System.out.println("  Duration: " + (result.getEndMillis() - result.getStartMillis()) + "ms");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("✗ Test FAILED: " + result.getName());
        System.out.println("  Error: " + result.getThrowable().getMessage());
        System.out.println("  Duration: " + (result.getEndMillis() - result.getStartMillis()) + "ms");
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("⊘ Test SKIPPED: " + result.getName());
        if (result.getThrowable() != null) {
            System.out.println("  Reason: " + result.getThrowable().getMessage());
        }
    }

    @Override
    public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
        System.out.println("⚠ Test Failed but within success percentage: " + result.getName());
    }
}
```

**Using TestListener:**

**Method 1: In testng.xml**
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Suite with Listener">
    <listeners>
        <listener class-name="testng.listeners.TestListener"/>
    </listeners>
    <test name="Test 1">
        <classes>
            <class name="testng.tests.SampleTest"/>
        </classes>
    </test>
</suite>
```

**Method 2: Using @Listeners annotation**
```java
package testng.tests;

import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import testng.listeners.TestListener;

@Listeners(TestListener.class)
public class SampleTest {

    @Test
    public void test1() {
        System.out.println("Executing test1");
    }

    @Test
    public void test2() {
        System.out.println("Executing test2");
    }
}
```

### ISuiteListener Interface

```java
package testng.listeners;

import org.testng.ISuite;
import org.testng.ISuiteListener;

public class SuiteListener implements ISuiteListener {

    @Override
    public void onStart(ISuite suite) {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║  Suite Started: " + suite.getName());
        System.out.println("║  Output Directory: " + suite.getOutputDirectory());
        System.out.println("║  Parallel: " + suite.getParallel());
        System.out.println("║  Thread Count: " + suite.getXmlSuite().getThreadCount());
        System.out.println("╚════════════════════════════════════════╝\n");
    }

    @Override
    public void onFinish(ISuite suite) {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║  Suite Finished: " + suite.getName());
        System.out.println("║  Total Duration: " +
            (suite.getHost().endDate - suite.getHost().startDate) + "ms");
        System.out.println("╚════════════════════════════════════════╝\n");
    }
}
```

### Screenshot on Failure Listener

```java
package testng.listeners;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.io.FileHandler;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotListener implements ITestListener {

    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("Test Failed: " + result.getName());
        System.out.println("Capturing screenshot...");

        // Get WebDriver instance from test class
        Object testClass = result.getInstance();
        WebDriver driver = null;

        try {
            // Assuming test class has getDriver() method
            driver = (WebDriver) testClass.getClass()
                .getMethod("getDriver")
                .invoke(testClass);
        } catch (Exception e) {
            System.out.println("Unable to get WebDriver instance");
            return;
        }

        if (driver != null) {
            takeScreenshot(driver, result.getName());
        }
    }

    private void takeScreenshot(WebDriver driver, String testName) {
        try {
            // Take screenshot
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);

            // Create screenshot filename with timestamp
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String fileName = testName + "_" + timestamp + ".png";
            String screenshotPath = "test-output/screenshots/" + fileName;

            // Create directory if doesn't exist
            File screenshotDir = new File("test-output/screenshots");
            if (!screenshotDir.exists()) {
                screenshotDir.mkdirs();
            }

            // Copy screenshot to destination
            File destination = new File(screenshotPath);
            FileHandler.copy(source, destination);

            System.out.println("Screenshot saved: " + screenshotPath);

        } catch (IOException e) {
            System.out.println("Failed to capture screenshot: " + e.getMessage());
        }
    }
}
```

### Retry Logic Implementation

```java
package testng.listeners;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

public class RetryAnalyzer implements IRetryAnalyzer {

    private int retryCount = 0;
    private static final int maxRetryCount = 2; // Retry failed tests 2 times

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < maxRetryCount) {
            retryCount++;
            System.out.println("Retrying test " + result.getName() +
                " for the " + retryCount + " time");
            return true;
        }
        return false;
    }
}
```

**Using RetryAnalyzer:**
```java
package testng.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import testng.listeners.RetryAnalyzer;

public class FlakyTest {

    private static int attempt = 0;

    @Test(retryAnalyzer = RetryAnalyzer.class)
    public void flakyTest() {
        attempt++;
        System.out.println("Test attempt: " + attempt);

        // Simulate flaky test (fails first 2 times, passes on 3rd)
        if (attempt < 3) {
            Assert.fail("Test failed on attempt " + attempt);
        }

        Assert.assertTrue(true, "Test passed on attempt " + attempt);
    }
}
```

### Custom HTML Reporter

```java
package testng.listeners;

import org.testng.*;
import org.testng.xml.XmlSuite;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class CustomHTMLReporter implements IReporter {

    @Override
    public void generateReport(List<XmlSuite> xmlSuites, List<ISuite> suites, String outputDirectory) {
        String reportPath = outputDirectory + "/custom-report.html";

        try (FileWriter writer = new FileWriter(new File(reportPath))) {
            writer.write(generateHTMLContent(suites));
            System.out.println("Custom HTML report generated: " + reportPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String generateHTMLContent(List<ISuite> suites) {
        StringBuilder html = new StringBuilder();

        html.append("<!DOCTYPE html>\n");
        html.append("<html>\n<head>\n");
        html.append("<title>Test Execution Report</title>\n");
        html.append("<style>\n");
        html.append("body { font-family: Arial, sans-serif; margin: 20px; }\n");
        html.append("h1 { color: #333; }\n");
        html.append("table { border-collapse: collapse; width: 100%; margin-top: 20px; }\n");
        html.append("th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }\n");
        html.append("th { background-color: #4CAF50; color: white; }\n");
        html.append(".passed { background-color: #dff0d8; }\n");
        html.append(".failed { background-color: #f2dede; }\n");
        html.append(".skipped { background-color: #fcf8e3; }\n");
        html.append("</style>\n");
        html.append("</head>\n<body>\n");

        for (ISuite suite : suites) {
            html.append("<h1>Suite: ").append(suite.getName()).append("</h1>\n");
            html.append("<p>Execution Time: ").append(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(new Date())).append("</p>\n");

            for (ISuiteResult result : suite.getResults().values()) {
                ITestContext context = result.getTestContext();

                html.append("<h2>Test: ").append(context.getName()).append("</h2>\n");
                html.append("<table>\n");
                html.append("<tr><th>Test Name</th><th>Status</th><th>Duration (ms)</th></tr>\n");

                // Passed tests
                for (ITestResult testResult : context.getPassedTests().getAllResults()) {
                    html.append("<tr class='passed'>");
                    html.append("<td>").append(testResult.getName()).append("</td>");
                    html.append("<td>PASSED</td>");
                    html.append("<td>").append(testResult.getEndMillis() - testResult.getStartMillis()).append("</td>");
                    html.append("</tr>\n");
                }

                // Failed tests
                for (ITestResult testResult : context.getFailedTests().getAllResults()) {
                    html.append("<tr class='failed'>");
                    html.append("<td>").append(testResult.getName()).append("</td>");
                    html.append("<td>FAILED</td>");
                    html.append("<td>").append(testResult.getEndMillis() - testResult.getStartMillis()).append("</td>");
                    html.append("</tr>\n");
                }

                // Skipped tests
                for (ITestResult testResult : context.getSkippedTests().getAllResults()) {
                    html.append("<tr class='skipped'>");
                    html.append("<td>").append(testResult.getName()).append("</td>");
                    html.append("<td>SKIPPED</td>");
                    html.append("<td>").append(testResult.getEndMillis() - testResult.getStartMillis()).append("</td>");
                    html.append("</tr>\n");
                }

                html.append("</table>\n");
            }
        }

        html.append("</body>\n</html>");
        return html.toString();
    }
}
```

---

## <a name="advanced"></a>🚀 Advanced Features

### Test Factories

```java
package testng.advanced;

import org.testng.annotations.Factory;
import org.testng.annotations.Test;

public class TestFactoryExample {

    private int num;

    @Factory
    public static Object[] createInstances() {
        return new Object[] {
            new TestFactoryExample(1),
            new TestFactoryExample(2),
            new TestFactoryExample(3)
        };
    }

    public TestFactoryExample(int num) {
        this.num = num;
    }

    @Test
    public void testMethod() {
        System.out.println("Test method with num: " + num);
    }
}
```

### Method Interceptors

```java
package testng.advanced;

import org.testng.IMethodInstance;
import org.testng.IMethodInterceptor;
import org.testng.ITestContext;

import java.util.ArrayList;
import java.util.List;

public class PriorityInterceptor implements IMethodInterceptor {

    @Override
    public List<IMethodInstance> intercept(List<IMethodInstance> methods, ITestContext context) {
        List<IMethodInstance> result = new ArrayList<>();

        // First, add all priority 1 tests
        for (IMethodInstance method : methods) {
            Test test = method.getMethod().getConstructorOrMethod().getMethod().getAnnotation(Test.class);
            if (test != null && test.priority() == 1) {
                result.add(method);
            }
        }

        // Then, add all other tests
        for (IMethodInstance method : methods) {
            if (!result.contains(method)) {
                result.add(method);
            }
        }

        return result;
    }
}
```

---

## <a name="best-practices"></a>📋 Best Practices

### 1. Test Organization
- Use meaningful test names
- Group related tests
- Keep tests independent
- Use @Before/@After annotations appropriately

### 2. Assertion Practices
- Use soft assertions for multiple validations
- Provide descriptive assertion messages
- Choose appropriate assertion methods

### 3. Data Management
- Use DataProviders for data-driven tests
- Externalize test data (Excel, JSON, CSV)
- Keep test data separate from test logic

### 4. Parallel Execution
- Use ThreadLocal for WebDriver
- Ensure thread safety
- Set appropriate thread counts

### 5. Reporting
- Implement custom listeners
- Capture screenshots on failure
- Generate comprehensive reports

---

## Troubleshooting Guide

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Tests not discovered | Check @Test annotation, verify testng.xml path |
| Parallel execution issues | Use ThreadLocal, verify thread-count |
| DataProvider not working | Check name matches, verify return type |
| Dependencies causing skips | Review dependsOnMethods, use alwaysRun |
| Listeners not executing | Verify listener class in testng.xml |

---

**Total Lines: ~700+**
**Document Type: Comprehensive Technical Guide**
**Target Audience: Selenium Test Automation Engineers**
