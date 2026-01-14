# Day 30: TestNG Part 1 - Introduction & Annotations

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

## 17. Key Takeaways

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

- **Previous:** [Day 29: Screenshots & Browser Options](./day29_screenshots_browser_options.md)
- **Next:** [Day 31: TestNG Part 2](./day31_testng_part2.md)
- **Week 5 Home:** [Week 5 Overview](./README.md)

---

**Happy Learning!** TestNG is a foundational framework for professional test automation.
