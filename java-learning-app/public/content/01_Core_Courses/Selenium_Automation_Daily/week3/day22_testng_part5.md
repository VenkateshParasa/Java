# Day 34: TestNG Part 5 - Parallel Execution & Suite Configuration

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand parallel test execution in TestNG
- Configure different parallel execution modes
- Implement thread-safe WebDriver using ThreadLocal
- Manage thread count and timeout settings
- Organize test suites effectively
- Use suite-level parameters and inheritance
- Include and exclude packages in test execution
- Implement test factories for dynamic test creation
- Preserve test execution order when needed
- Manage suite dependencies
- Build a complete parallel execution framework
- Apply best practices for parallel test execution

---

## 1. Introduction to Parallel Execution

### Why Parallel Execution?

**Parallel execution** runs multiple tests simultaneously, providing significant benefits:

- **Faster execution** - Reduce total test execution time
- **Better resource utilization** - Use multiple CPU cores
- **Quick feedback** - Get test results faster
- **CI/CD optimization** - Faster build pipelines
- **Increased efficiency** - Run more tests in less time

### Sequential vs Parallel Execution

**Sequential Execution:**
```
Test1 -> Test2 -> Test3 -> Test4
Total Time: 40 seconds (10s each)
```

**Parallel Execution (4 threads):**
```
Test1
Test2  } Running simultaneously
Test3
Test4
Total Time: 10 seconds
```

### Challenges in Parallel Execution

1. **Thread safety** - Sharing resources between threads
2. **Data conflicts** - Multiple tests accessing same data
3. **Resource contention** - Database, files, network
4. **Test isolation** - Tests affecting each other
5. **Debugging complexity** - Harder to debug failures

---

## 2. Parallel Execution Modes

TestNG supports four parallel execution modes:

### 1. Parallel Methods (parallel="methods")

Runs all test methods in parallel, regardless of which class they belong to.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parallel Methods Suite" parallel="methods" thread-count="3">
    <test name="Test Methods">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>
</suite>
```

**Use Case:** When all tests are independent and can run simultaneously.

### 2. Parallel Tests (parallel="tests")

Runs all `<test>` tags in parallel, but methods within each test run sequentially.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parallel Tests Suite" parallel="tests" thread-count="2">
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
        </classes>
    </test>
</suite>
```

**Use Case:** Cross-browser testing, testing different environments.

### 3. Parallel Classes (parallel="classes")

Runs all classes in parallel, but methods within each class run sequentially.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parallel Classes Suite" parallel="classes" thread-count="3">
    <test name="Test Classes">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>
</suite>
```

**Use Case:** When tests within a class need to run sequentially but classes are independent.

### 4. Parallel Instances (parallel="instances")

Runs all instances of the same test class in parallel.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parallel Instances Suite" parallel="instances" thread-count="2">
    <test name="Test Instances">
        <classes>
            <class name="tests.DataDrivenTest"/>
        </classes>
    </test>
</suite>
```

**Use Case:** Running the same test with different data sets in parallel.

---

## 3. Thread Count Configuration

### Setting Thread Count

```xml
<!-- Maximum 5 threads will run simultaneously -->
<suite name="Suite" parallel="methods" thread-count="5">
    <!-- Suite configuration -->
</suite>
```

### Dynamic Thread Count

```xml
<!-- Use system property to set thread count -->
<suite name="Suite" parallel="methods" thread-count="${threadCount}">
    <!-- Suite configuration -->
</suite>
```

Run with Maven:
```bash
mvn test -DthreadCount=10
```

### Optimal Thread Count

**Formula:** `thread-count = Number of CPU cores * 2`

```java
// Get optimal thread count programmatically
int cores = Runtime.getRuntime().availableProcessors();
int optimalThreads = cores * 2;
System.out.println("Optimal threads: " + optimalThreads);
```

### Test Method Thread Pool Size

```xml
<suite name="Suite" parallel="methods" thread-count="10" data-provider-thread-count="5">
    <!-- 10 threads for methods, 5 for data providers -->
</suite>
```

---

## 4. ThreadLocal for Thread-Safe WebDriver

### Why ThreadLocal?

When running tests in parallel, each thread needs its own WebDriver instance. **ThreadLocal** provides thread-local variables.

### Basic ThreadLocal Implementation

```java
package base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.edge.EdgeDriver;

public class BaseTest {

    // ThreadLocal variable to hold WebDriver instance per thread
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    /**
     * Get the WebDriver instance for current thread
     */
    public static WebDriver getDriver() {
        return driver.get();
    }

    /**
     * Set the WebDriver instance for current thread
     */
    public static void setDriver(WebDriver driverInstance) {
        driver.set(driverInstance);
    }

    /**
     * Remove the WebDriver instance for current thread
     */
    public static void removeDriver() {
        driver.remove();
    }

    /**
     * Initialize WebDriver based on browser type
     */
    public static void initializeDriver(String browser) {
        WebDriver webDriver;

        switch (browser.toLowerCase()) {
            case "chrome":
                webDriver = new ChromeDriver();
                break;
            case "firefox":
                webDriver = new FirefoxDriver();
                break;
            case "edge":
                webDriver = new EdgeDriver();
                break;
            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        webDriver.manage().window().maximize();
        setDriver(webDriver);

        System.out.println("Thread ID: " + Thread.currentThread().getId() +
                         " - Browser: " + browser);
    }

    /**
     * Quit WebDriver for current thread
     */
    public static void quitDriver() {
        if (getDriver() != null) {
            getDriver().quit();
            removeDriver();
        }
    }
}
```

### Using ThreadLocal in Test Class

```java
package tests;

import base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class ParallelTest extends BaseTest {

    @BeforeMethod
    @Parameters("browser")
    public void setup(@Optional("chrome") String browser) {
        initializeDriver(browser);
    }

    @Test(priority = 1)
    public void testGoogleSearch() {
        WebDriver driver = getDriver();
        driver.get("https://www.google.com");

        String title = driver.getTitle();
        Assert.assertEquals(title, "Google");

        System.out.println("Test executed on Thread: " +
                         Thread.currentThread().getId());
    }

    @Test(priority = 2)
    public void testGoogleURL() {
        WebDriver driver = getDriver();
        driver.get("https://www.google.com");

        String url = driver.getCurrentUrl();
        Assert.assertTrue(url.contains("google"));

        System.out.println("Test executed on Thread: " +
                         Thread.currentThread().getId());
    }

    @AfterMethod
    public void teardown() {
        quitDriver();
    }
}
```

---

## 5. Complete ThreadLocal Framework

### DriverManager Class

```java
package managers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import java.time.Duration;

public class DriverManager {

    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver getDriver() {
        return driver.get();
    }

    public static void setDriver(String browser, boolean headless) {
        WebDriver webDriver = null;

        switch (browser.toLowerCase()) {
            case "chrome":
                ChromeOptions chromeOptions = new ChromeOptions();
                if (headless) {
                    chromeOptions.addArguments("--headless");
                }
                chromeOptions.addArguments("--disable-notifications");
                chromeOptions.addArguments("--disable-gpu");
                webDriver = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                if (headless) {
                    firefoxOptions.addArguments("--headless");
                }
                webDriver = new FirefoxDriver(firefoxOptions);
                break;

            case "edge":
                EdgeOptions edgeOptions = new EdgeOptions();
                if (headless) {
                    edgeOptions.addArguments("--headless");
                }
                webDriver = new EdgeDriver(edgeOptions);
                break;

            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        webDriver.manage().window().maximize();
        webDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        webDriver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));

        driver.set(webDriver);

        System.out.println("Thread-" + Thread.currentThread().getId() +
                         " initialized " + browser);
    }

    public static void quitDriver() {
        if (getDriver() != null) {
            getDriver().quit();
            driver.remove();
            System.out.println("Thread-" + Thread.currentThread().getId() +
                             " closed browser");
        }
    }
}
```

### Base Test Class

```java
package base;

import managers.DriverManager;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;

public class BaseTest {

    protected WebDriver driver;

    @BeforeMethod
    @Parameters({"browser", "headless"})
    public void setup(@Optional("chrome") String browser,
                     @Optional("false") String headless) {
        boolean isHeadless = Boolean.parseBoolean(headless);
        DriverManager.setDriver(browser, isHeadless);
        driver = DriverManager.getDriver();
    }

    @AfterMethod
    public void teardown() {
        DriverManager.quitDriver();
    }
}
```

---

## 6. Test Suite Organization

### Organizing by Test Type

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Complete Test Suite">
    <!-- Smoke Tests -->
    <test name="Smoke Tests">
        <classes>
            <class name="tests.smoke.LoginSmokeTest"/>
            <class name="tests.smoke.HomepageSmokeTest"/>
        </classes>
    </test>

    <!-- Regression Tests -->
    <test name="Regression Tests">
        <classes>
            <class name="tests.regression.LoginRegressionTest"/>
            <class name="tests.regression.CheckoutRegressionTest"/>
            <class name="tests.regression.PaymentRegressionTest"/>
        </classes>
    </test>

    <!-- Integration Tests -->
    <test name="Integration Tests">
        <classes>
            <class name="tests.integration.E2ECheckoutTest"/>
            <class name="tests.integration.E2EUserJourneyTest"/>
        </classes>
    </test>
</suite>
```

### Organizing by Module

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Module-Based Suite" parallel="tests" thread-count="3">
    <!-- Login Module -->
    <test name="Login Module">
        <packages>
            <package name="tests.login.*"/>
        </packages>
    </test>

    <!-- Search Module -->
    <test name="Search Module">
        <packages>
            <package name="tests.search.*"/>
        </packages>
    </test>

    <!-- Checkout Module -->
    <test name="Checkout Module">
        <packages>
            <package name="tests.checkout.*"/>
        </packages>
    </test>
</suite>
```

---

## 7. Suite-Level Parameters

### Basic Suite Parameters

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Suite with Parameters">
    <!-- Suite-level parameters apply to all tests -->
    <parameter name="baseUrl" value="https://example.com"/>
    <parameter name="timeout" value="30"/>
    <parameter name="browser" value="chrome"/>

    <test name="Test 1">
        <classes>
            <class name="tests.Test1"/>
        </classes>
    </test>

    <test name="Test 2">
        <!-- Override suite-level parameter for this test -->
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.Test2"/>
        </classes>
    </test>
</suite>
```

### Parameter Inheritance and Override

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parameter Inheritance Suite">
    <!-- Suite level - Applies to all tests -->
    <parameter name="env" value="QA"/>
    <parameter name="browser" value="chrome"/>
    <parameter name="headless" value="false"/>

    <test name="Chrome Test">
        <!-- Inherits: env=QA, browser=chrome, headless=false -->
        <classes>
            <class name="tests.ChromeTest"/>
        </classes>
    </test>

    <test name="Firefox Test">
        <!-- Override browser parameter -->
        <parameter name="browser" value="firefox"/>
        <!-- Inherits: env=QA, headless=false -->
        <classes>
            <class name="tests.FirefoxTest"/>
        </classes>
    </test>

    <test name="Headless Test">
        <!-- Override headless parameter -->
        <parameter name="headless" value="true"/>
        <!-- Inherits: env=QA, browser=chrome -->
        <classes>
            <class name="tests.HeadlessTest"/>
        </classes>
    </test>
</suite>
```

### Using Parameters in Tests

```java
package tests;

import base.BaseTest;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParameterizedTest extends BaseTest {

    @Test
    @Parameters({"baseUrl", "timeout"})
    public void testWithParameters(String url, @Optional("10") String timeout) {
        System.out.println("Base URL: " + url);
        System.out.println("Timeout: " + timeout);

        driver.get(url);
        // Perform test actions
    }
}
```

---

## 8. Including and Excluding Packages

### Include Packages

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Include Packages Suite">
    <test name="Specific Packages">
        <packages>
            <!-- Include specific packages -->
            <package name="tests.smoke"/>
            <package name="tests.regression"/>
        </packages>
    </test>
</suite>
```

### Exclude Packages

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Exclude Packages Suite">
    <test name="All Except Excluded">
        <packages>
            <package name="tests.*"/>
            <!-- Exclude specific packages -->
            <exclude name="tests.wip"/>
            <exclude name="tests.experimental"/>
        </packages>
    </test>
</suite>
```

### Include and Exclude Methods

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Include/Exclude Methods Suite">
    <test name="Selected Methods">
        <classes>
            <class name="tests.LoginTest">
                <methods>
                    <!-- Include specific methods -->
                    <include name="testValidLogin"/>
                    <include name="testLogout"/>
                    <!-- Exclude specific methods -->
                    <exclude name="testDisabledFeature"/>
                </methods>
            </class>
        </classes>
    </test>
</suite>
```

### Using Groups for Inclusion/Exclusion

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Group-Based Suite">
    <test name="Smoke Tests Only">
        <groups>
            <run>
                <include name="smoke"/>
                <exclude name="flaky"/>
            </run>
        </groups>
        <packages>
            <package name="tests.*"/>
        </packages>
    </test>
</suite>
```

---

## 9. Test Factories

### What are Test Factories?

**@Factory** creates instances of test classes at runtime, allowing dynamic test creation.

### Basic Factory Example

```java
package tests;

import org.testng.annotations.Factory;

public class TestFactory {

    @Factory
    public Object[] createTestInstances() {
        // Create multiple instances of test class
        return new Object[] {
            new FactoryTest("Chrome", "https://google.com"),
            new FactoryTest("Firefox", "https://google.com"),
            new FactoryTest("Edge", "https://google.com")
        };
    }
}
```

### Factory Test Class

```java
package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;

public class FactoryTest extends BaseTest {

    private String browser;
    private String url;

    // Constructor to accept parameters
    public FactoryTest(String browser, String url) {
        this.browser = browser;
        this.url = url;
    }

    @Test
    public void testBrowser() {
        System.out.println("Testing with browser: " + browser);
        System.out.println("URL: " + url);

        // Initialize driver with specific browser
        initializeDriver(browser);

        driver.get(url);
        String title = driver.getTitle();
        Assert.assertNotNull(title);

        System.out.println("Title: " + title);
    }
}
```

### Factory with DataProvider

```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Factory;

public class DataProviderFactory {

    @DataProvider(name = "browserData")
    public static Object[][] getBrowserData() {
        return new Object[][] {
            {"Chrome", "https://google.com"},
            {"Firefox", "https://facebook.com"},
            {"Edge", "https://amazon.com"}
        };
    }

    @Factory(dataProvider = "browserData")
    public Object[] createTests(String browser, String url) {
        return new Object[] {
            new FactoryTest(browser, url)
        };
    }
}
```

### Advanced Factory Pattern

```java
package factories;

import org.testng.annotations.Factory;
import tests.LoginTest;
import tests.SearchTest;
import tests.CheckoutTest;

public class TestExecutionFactory {

    @Factory
    public Object[] createAllTests() {
        String[] browsers = {"chrome", "firefox"};
        String[] environments = {"QA", "Staging"};

        int testCount = browsers.length * environments.length * 3; // 3 test classes
        Object[] tests = new Object[testCount];

        int index = 0;
        for (String browser : browsers) {
            for (String env : environments) {
                tests[index++] = new LoginTest(browser, env);
                tests[index++] = new SearchTest(browser, env);
                tests[index++] = new CheckoutTest(browser, env);
            }
        }

        return tests;
    }
}
```

---

## 10. Preserving Test Order

### Preserve Order in Suite

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Ordered Suite" preserve-order="true">
    <!-- Tests will run in the order defined -->
    <test name="Test 1">
        <classes>
            <class name="tests.FirstTest"/>
        </classes>
    </test>

    <test name="Test 2">
        <classes>
            <class name="tests.SecondTest"/>
        </classes>
    </test>

    <test name="Test 3">
        <classes>
            <class name="tests.ThirdTest"/>
        </classes>
    </test>
</suite>
```

### Group by Instances

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Group by Instances" group-by-instances="true">
    <!-- All test methods from same instance run together -->
    <test name="Grouped Test">
        <classes>
            <class name="tests.InstanceTest"/>
        </classes>
    </test>
</suite>
```

### Using Priority and Dependencies

```java
package tests;

import org.testng.annotations.Test;

public class OrderedTest {

    @Test(priority = 1)
    public void firstTest() {
        System.out.println("First test");
    }

    @Test(priority = 2, dependsOnMethods = "firstTest")
    public void secondTest() {
        System.out.println("Second test - depends on first");
    }

    @Test(priority = 3, dependsOnMethods = {"firstTest", "secondTest"})
    public void thirdTest() {
        System.out.println("Third test - depends on first and second");
    }
}
```

---

## 11. Suite Dependencies

### Depends on Groups

```java
package tests;

import org.testng.annotations.Test;

public class GroupDependencyTest {

    @Test(groups = "database")
    public void setupDatabase() {
        System.out.println("Setting up database");
    }

    @Test(groups = "database")
    public void seedTestData() {
        System.out.println("Seeding test data");
    }

    @Test(dependsOnGroups = "database")
    public void testLogin() {
        System.out.println("Testing login - depends on database setup");
    }

    @Test(dependsOnGroups = "database")
    public void testSearch() {
        System.out.println("Testing search - depends on database setup");
    }
}
```

### Always Run Methods

```java
package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;

public class AlwaysRunTest extends BaseTest {

    @Test(priority = 1)
    public void test1() {
        System.out.println("Test 1");
        Assert.fail("Failing test 1");
    }

    @Test(priority = 2, dependsOnMethods = "test1")
    public void test2() {
        System.out.println("Test 2 - will be skipped");
    }

    @AfterClass(alwaysRun = true)
    public void cleanup() {
        // This will run even if tests fail
        System.out.println("Cleanup - always runs");
    }
}
```

### Test Dependencies in XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Dependency Suite">
    <test name="Setup Test">
        <classes>
            <class name="tests.SetupTest"/>
        </classes>
    </test>

    <!-- This test depends on Setup Test -->
    <test name="Main Test" depends-on-tests="Setup Test">
        <classes>
            <class name="tests.MainTest"/>
        </classes>
    </test>

    <!-- This test depends on Main Test -->
    <test name="Cleanup Test" depends-on-tests="Main Test">
        <classes>
            <class name="tests.CleanupTest"/>
        </classes>
    </test>
</suite>
```

---

## 12. Complete Parallel Framework Example

### Project Structure

```
parallel-framework/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── base/
│   │       │   └── BaseTest.java
│   │       ├── managers/
│   │       │   └── DriverManager.java
│   │       ├── pages/
│   │       │   ├── LoginPage.java
│   │       │   └── HomePage.java
│   │       └── utils/
│   │           └── ConfigReader.java
│   └── test/
│       ├── java/
│       │   └── tests/
│       │       ├── LoginTest.java
│       │       ├── SearchTest.java
│       │       └── CheckoutTest.java
│       └── resources/
│           ├── testng-parallel.xml
│           └── config.properties
└── pom.xml
```

### DriverManager Implementation

```java
package managers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

public class DriverManager {

    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    private static ThreadLocal<String> sessionId = new ThreadLocal<>();

    public static synchronized void setDriver(String browser) {
        WebDriver webDriver = null;

        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--remote-allow-origins=*");
                chromeOptions.addArguments("--disable-notifications");
                webDriver = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                webDriver = new FirefoxDriver(firefoxOptions);
                break;

            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        webDriver.manage().window().maximize();
        webDriver.manage().deleteAllCookies();
        webDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        webDriver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));

        driver.set(webDriver);
        sessionId.set(String.valueOf(Thread.currentThread().getId()));

        System.out.println("[Thread-" + sessionId.get() + "] Browser initialized: " + browser);
    }

    public static synchronized WebDriver getDriver() {
        return driver.get();
    }

    public static synchronized void quitDriver() {
        if (driver.get() != null) {
            String session = sessionId.get();
            driver.get().quit();
            driver.remove();
            sessionId.remove();
            System.out.println("[Thread-" + session + "] Browser closed");
        }
    }
}
```

### BaseTest Class

```java
package base;

import managers.DriverManager;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;

public class BaseTest {

    protected WebDriver driver;

    @BeforeMethod
    @Parameters("browser")
    public void setup(@Optional("chrome") String browser) {
        System.out.println("Setting up test on thread: " + Thread.currentThread().getId());
        DriverManager.setDriver(browser);
        driver = DriverManager.getDriver();
    }

    @AfterMethod
    public void teardown() {
        System.out.println("Tearing down test on thread: " + Thread.currentThread().getId());
        DriverManager.quitDriver();
    }
}
```

### Page Object Example

```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginPage {

    private WebDriver driver;
    private WebDriverWait wait;

    // Locators
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginButton = By.id("loginBtn");
    private By errorMessage = By.className("error-message");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void enterEmail(String email) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(emailField));
        element.clear();
        element.sendKeys(email);
    }

    public void enterPassword(String password) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(passwordField));
        element.clear();
        element.sendKeys(password);
    }

    public void clickLogin() {
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(loginButton));
        element.click();
    }

    public String getErrorMessage() {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(errorMessage));
        return element.getText();
    }

    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLogin();
    }
}
```

### Test Class

```java
package tests;

import base.BaseTest;
import pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    @Test(priority = 1, description = "Test successful login")
    public void testValidLogin() {
        System.out.println("[Thread-" + Thread.currentThread().getId() + "] Running testValidLogin");

        driver.get("https://example.com/login");
        LoginPage loginPage = new LoginPage(driver);

        loginPage.login("valid@example.com", "ValidPass123");

        Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"),
                        "Should navigate to dashboard after login");
    }

    @Test(priority = 2, description = "Test invalid login")
    public void testInvalidLogin() {
        System.out.println("[Thread-" + Thread.currentThread().getId() + "] Running testInvalidLogin");

        driver.get("https://example.com/login");
        LoginPage loginPage = new LoginPage(driver);

        loginPage.login("invalid@example.com", "WrongPass");

        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("Invalid credentials"),
                        "Error message should be displayed");
    }

    @Test(priority = 3, description = "Test empty credentials")
    public void testEmptyCredentials() {
        System.out.println("[Thread-" + Thread.currentThread().getId() + "] Running testEmptyCredentials");

        driver.get("https://example.com/login");
        LoginPage loginPage = new LoginPage(driver);

        loginPage.login("", "");

        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("required"),
                        "Error message should indicate required fields");
    }
}
```

### Parallel TestNG XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Parallel Execution Suite" parallel="tests" thread-count="3" verbose="1">

    <!-- Suite-level parameters -->
    <parameter name="env" value="QA"/>

    <!-- Chrome Test -->
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

    <!-- Firefox Test -->
    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

    <!-- Edge Test -->
    <test name="Edge Tests">
        <parameter name="browser" value="edge"/>
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>

</suite>
```

### Maven Surefire Plugin Configuration

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0</version>
            <configuration>
                <suiteXmlFiles>
                    <suiteXmlFile>src/test/resources/testng-parallel.xml</suiteXmlFile>
                </suiteXmlFiles>
                <properties>
                    <property>
                        <name>parallel</name>
                        <value>methods</value>
                    </property>
                    <property>
                        <name>threadCount</name>
                        <value>${threadCount}</value>
                    </property>
                </properties>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### Running Parallel Tests

```bash
# Run with default thread count from XML
mvn clean test

# Override thread count
mvn clean test -DthreadCount=5

# Run specific suite
mvn clean test -DsuiteXmlFile=testng-parallel.xml

# Run with specific browser
mvn clean test -Dbrowser=firefox
```

---

## 13. Timeout Configuration

### Suite Timeout

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Timeout Suite" time-out="300000">
    <!-- All tests in suite must complete within 5 minutes -->
    <test name="Test with Timeout">
        <classes>
            <class name="tests.TimeoutTest"/>
        </classes>
    </test>
</suite>
```

### Test-Level Timeout

```java
package tests;

import org.testng.annotations.Test;

public class TimeoutTest {

    @Test(timeOut = 5000)  // Test must complete within 5 seconds
    public void testWithTimeout() throws InterruptedException {
        System.out.println("Test started");
        Thread.sleep(3000);
        System.out.println("Test completed");
    }

    @Test(timeOut = 2000)  // This will fail due to timeout
    public void testFailsDueToTimeout() throws InterruptedException {
        System.out.println("Test started");
        Thread.sleep(5000);  // Sleeps longer than timeout
        System.out.println("This won't print");
    }
}
```

---

## 14. Best Practices for Parallel Execution

### 1. Ensure Test Independence

**Bad Practice:**
```java
public class DependentTest {
    static String sharedData;  // DON'T share static variables

    @Test
    public void test1() {
        sharedData = "test1";
        // Use sharedData
    }

    @Test
    public void test2() {
        // This will fail if test1 hasn't run yet
        System.out.println(sharedData);
    }
}
```

**Good Practice:**
```java
public class IndependentTest extends BaseTest {

    @Test
    public void test1() {
        String testData = "test1";  // Local variable
        // Use testData
    }

    @Test
    public void test2() {
        String testData = "test2";  // Each test has own data
        // Use testData
    }
}
```

### 2. Use ThreadLocal for Thread Safety

**Good Practice:**
```java
public class ThreadSafeTest {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    private static ThreadLocal<String> testData = new ThreadLocal<>();

    @BeforeMethod
    public void setup() {
        driver.set(new ChromeDriver());
        testData.set("test-" + Thread.currentThread().getId());
    }

    @Test
    public void test() {
        driver.get().get("https://example.com");
        System.out.println("Test data: " + testData.get());
    }

    @AfterMethod
    public void teardown() {
        driver.get().quit();
        driver.remove();
        testData.remove();
    }
}
```

### 3. Avoid Shared Test Data

**Bad Practice:**
```java
@Test
public void testCreateUser() {
    String username = "testuser";  // Same username for all tests
    // Create user - will fail in parallel if username must be unique
}
```

**Good Practice:**
```java
@Test
public void testCreateUser() {
    String username = "testuser_" + System.currentTimeMillis();  // Unique username
    // Create user
}
```

### 4. Proper Resource Management

```java
public class ResourceManagementTest extends BaseTest {

    @BeforeMethod
    public void setup() {
        // Initialize resources per thread
        DriverManager.setDriver("chrome");
    }

    @Test
    public void test1() {
        // Use resources
        WebDriver driver = DriverManager.getDriver();
        driver.get("https://example.com");
    }

    @AfterMethod(alwaysRun = true)
    public void teardown() {
        // Always cleanup resources
        DriverManager.quitDriver();
    }
}
```

### 5. Optimal Thread Count

```java
public class ThreadCountCalculator {

    public static int getOptimalThreadCount() {
        int cores = Runtime.getRuntime().availableProcessors();
        int optimalThreads = cores * 2;

        // Cap maximum threads to prevent resource exhaustion
        int maxThreads = 10;
        return Math.min(optimalThreads, maxThreads);
    }

    public static void main(String[] args) {
        System.out.println("Optimal thread count: " + getOptimalThreadCount());
    }
}
```

### 6. Handle Test Data Conflicts

```java
package tests;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.util.UUID;

public class DataConflictAvoidanceTest {

    private String uniqueId;

    @BeforeMethod
    public void generateUniqueId() {
        // Generate unique ID for each test execution
        uniqueId = UUID.randomUUID().toString();
    }

    @Test
    public void testWithUniqueData() {
        String username = "user_" + uniqueId;
        String email = "user_" + uniqueId + "@example.com";

        System.out.println("Testing with unique data: " + username);
        // Perform test with unique data
    }
}
```

### 7. Logging for Parallel Execution

```java
package utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ParallelLogger {

    private static final Logger logger = LoggerFactory.getLogger(ParallelLogger.class);

    public static void info(String message) {
        String threadInfo = "[Thread-" + Thread.currentThread().getId() + "] ";
        logger.info(threadInfo + message);
    }

    public static void error(String message, Throwable t) {
        String threadInfo = "[Thread-" + Thread.currentThread().getId() + "] ";
        logger.error(threadInfo + message, t);
    }
}

// Usage in tests
public class LoggingTest {
    @Test
    public void test() {
        ParallelLogger.info("Test started");
        // Test logic
        ParallelLogger.info("Test completed");
    }
}
```

### 8. Synchronized Methods When Needed

```java
public class SynchronizedResourceTest {

    private static int counter = 0;

    // Synchronized method for thread-safe counter increment
    private static synchronized void incrementCounter() {
        counter++;
    }

    @Test
    public void test1() {
        incrementCounter();
        System.out.println("Counter: " + counter);
    }

    @Test
    public void test2() {
        incrementCounter();
        System.out.println("Counter: " + counter);
    }
}
```

### 9. Retry Failed Tests

```java
package listeners;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

public class RetryAnalyzer implements IRetryAnalyzer {

    private int retryCount = 0;
    private static final int maxRetryCount = 2;

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < maxRetryCount) {
            retryCount++;
            System.out.println("Retrying test " + result.getName() +
                             " for the " + retryCount + " time.");
            return true;
        }
        return false;
    }
}

// Usage
@Test(retryAnalyzer = RetryAnalyzer.class)
public void flakyTest() {
    // Test that might fail intermittently
}
```

### 10. Monitor Test Execution

```java
package listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class ExecutionListener implements ITestListener {

    @Override
    public void onStart(ITestContext context) {
        System.out.println("Test Suite Started: " + context.getName());
        System.out.println("Thread Count: " + context.getCurrentXmlTest().getThreadCount());
    }

    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("[Thread-" + Thread.currentThread().getId() + "] " +
                         "Test Started: " + result.getName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        long duration = result.getEndMillis() - result.getStartMillis();
        System.out.println("[Thread-" + Thread.currentThread().getId() + "] " +
                         "Test Passed: " + result.getName() +
                         " (Duration: " + duration + "ms)");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("[Thread-" + Thread.currentThread().getId() + "] " +
                         "Test Failed: " + result.getName());
    }

    @Override
    public void onFinish(ITestContext context) {
        System.out.println("Test Suite Finished: " + context.getName());
        System.out.println("Total Tests: " + context.getAllTestMethods().length);
        System.out.println("Passed: " + context.getPassedTests().size());
        System.out.println("Failed: " + context.getFailedTests().size());
        System.out.println("Skipped: " + context.getSkippedTests().size());
    }
}
```

---

## 15. Key Takeaways

1. **Parallel execution** significantly reduces test execution time
2. **ThreadLocal** ensures thread-safe WebDriver instances
3. **Four parallel modes**: methods, tests, classes, instances
4. **Thread count** should be optimized based on system resources
5. **Test independence** is crucial for parallel execution
6. **Suite-level parameters** can be inherited and overridden
7. **Test factories** enable dynamic test creation
8. **Preserve-order** maintains execution sequence when needed
9. **Always use synchronized** access for shared resources
10. **Proper cleanup** with alwaysRun=true prevents resource leaks

---

## 16. Common Interview Questions

1. What is parallel execution in TestNG?
2. What are the different parallel execution modes in TestNG?
3. What is ThreadLocal and why is it important for parallel execution?
4. How do you configure thread count in TestNG?
5. What is the difference between parallel="methods" and parallel="tests"?
6. How do you ensure thread safety in parallel test execution?
7. What is a test factory in TestNG?
8. How do you preserve test execution order in TestNG?
9. What are the best practices for parallel test execution?
10. How do you handle shared test data in parallel execution?

---

## Navigation

- **Previous:** [Day 33: TestNG Part 4](./day33_testng_part4.md)
- **Next:** [Day 35: Page Object Model Part 1](./day35_pom_part1.md)
- **Week 5 Home:** [Week 5 Overview](./README.md)

---

**Happy Learning!** Mastering parallel execution and suite configuration is essential for building scalable and efficient test automation frameworks.
