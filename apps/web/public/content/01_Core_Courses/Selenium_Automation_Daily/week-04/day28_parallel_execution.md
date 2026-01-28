# Day 28: Parallel Test Execution with TestNG

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the benefits of parallel test execution
- Configure TestNG for parallel execution
- Implement thread-safe test design
- Use ThreadLocal for WebDriver management
- Execute tests in parallel at different levels (tests, classes, methods)
- Handle shared resources in parallel execution
- Optimize test execution time
- Debug parallel execution issues
- Apply best practices for parallel testing
- Measure and improve parallel execution performance

---

## Table of Contents

1. [Introduction to Parallel Execution](#1-introduction-to-parallel-execution)
2. [TestNG Parallel Execution Basics](#2-testng-parallel-execution-basics)
3. [Thread-Safe WebDriver Management](#3-thread-safe-webdriver-management)
4. [Parallel Execution Levels](#4-parallel-execution-levels)
5. [Thread-Safe Test Design](#5-thread-safe-test-design)
6. [Handling Shared Resources](#6-handling-shared-resources)
7. [Performance Optimization](#7-performance-optimization)
8. [Common Issues and Solutions](#8-common-issues-and-solutions)
9. [Best Practices](#9-best-practices)
10. [Complete Examples](#10-complete-examples)
11. [Key Takeaways](#11-key-takeaways)
12. [Interview Questions](#12-interview-questions)

---

## 1. Introduction to Parallel Execution

### What is Parallel Execution?

**Parallel execution** means running multiple tests simultaneously on different threads, significantly reducing total test execution time.

### Benefits of Parallel Execution

```java
package concepts;

public class ParallelExecutionBenefits {
    
    /*
     * Benefits:
     * 
     * 1. Reduced Execution Time
     *    - Run 100 tests in 10 minutes instead of 100 minutes
     *    - Faster feedback to developers
     *    - More frequent test runs
     * 
     * 2. Better Resource Utilization
     *    - Use all available CPU cores
     *    - Maximize hardware investment
     *    - Efficient CI/CD pipeline
     * 
     * 3. Increased Test Coverage
     *    - Run more tests in same time
     *    - Test more scenarios
     *    - Better quality assurance
     * 
     * 4. Faster CI/CD
     *    - Quicker build verification
     *    - Faster deployment cycles
     *    - Improved development velocity
     * 
     * Example:
     * Sequential: 100 tests × 1 min = 100 minutes
     * Parallel (10 threads): 100 tests ÷ 10 = 10 minutes
     * Time saved: 90 minutes (90% reduction)
     */
}
```

### Challenges of Parallel Execution

```java
package concepts;

public class ParallelExecutionChallenges {
    
    /*
     * Challenges:
     * 
     * 1. Thread Safety
     *    - Shared resources conflicts
     *    - Race conditions
     *    - Data corruption
     * 
     * 2. Test Dependencies
     *    - Tests affecting each other
     *    - Shared test data
     *    - Database conflicts
     * 
     * 3. Resource Contention
     *    - Limited browser instances
     *    - Database connections
     *    - File system access
     * 
     * 4. Debugging Complexity
     *    - Harder to reproduce issues
     *    - Intermittent failures
     *    - Log analysis challenges
     * 
     * 5. Infrastructure Requirements
     *    - More memory needed
     *    - More CPU cores
     *    - Network bandwidth
     */
}
```

---

## 2. TestNG Parallel Execution Basics

### TestNG XML Configuration

**parallel-suite.xml:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Test Suite" parallel="methods" thread-count="5">
    
    <test name="Login Tests">
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
    
    <test name="Search Tests">
        <classes>
            <class name="tests.SearchTest"/>
        </classes>
    </test>
    
</suite>
```

### Parallel Execution Modes

```xml
<!-- 1. Parallel Methods -->
<suite name="Suite" parallel="methods" thread-count="5">
    <!-- All @Test methods run in parallel -->
</suite>

<!-- 2. Parallel Tests -->
<suite name="Suite" parallel="tests" thread-count="3">
    <!-- All <test> tags run in parallel -->
</suite>

<!-- 3. Parallel Classes -->
<suite name="Suite" parallel="classes" thread-count="4">
    <!-- All test classes run in parallel -->
</suite>

<!-- 4. Parallel Instances -->
<suite name="Suite" parallel="instances" thread-count="3">
    <!-- All instances of same class run in parallel -->
</suite>

<!-- 5. Combined Parallel Execution -->
<suite name="Suite" parallel="methods" thread-count="10">
    <test name="Test1" parallel="classes" thread-count="5">
        <!-- Methods within classes run in parallel -->
    </test>
</suite>
```

### Thread Count Configuration

```xml
<!-- Fixed thread count -->
<suite name="Suite" parallel="methods" thread-count="5">
</suite>

<!-- Data-driven parallel execution -->
<suite name="Suite" parallel="methods" thread-count="10" data-provider-thread-count="5">
    <!-- DataProvider also runs in parallel -->
</suite>

<!-- Preserve order (sequential within parallel) -->
<suite name="Suite" parallel="methods" thread-count="5" preserve-order="true">
</suite>
```

---

## 3. Thread-Safe WebDriver Management

### Problem: Non-Thread-Safe WebDriver

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class NonThreadSafeTest {
    
    // ❌ BAD: Shared WebDriver instance
    private static WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        // Problem: Multiple threads will overwrite this
    }
    
    @Test
    public void test1() {
        driver.get("https://example.com");
        // May use wrong driver instance
    }
    
    @Test
    public void test2() {
        driver.get("https://example.com");
        // May use wrong driver instance
    }
}
```

### Solution: ThreadLocal WebDriver

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class ThreadSafeTest {
    
    // ✅ GOOD: ThreadLocal WebDriver
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    public static WebDriver getDriver() {
        return driver.get();
    }
    
    public static void setDriver(WebDriver driverInstance) {
        driver.set(driverInstance);
    }
    
    public static void removeDriver() {
        driver.remove();
    }
    
    @BeforeMethod
    public void setup() {
        WebDriver driverInstance = new ChromeDriver();
        setDriver(driverInstance);
        getDriver().manage().window().maximize();
    }
    
    @Test
    public void test1() {
        getDriver().get("https://example.com");
        // Each thread has its own driver
    }
    
    @Test
    public void test2() {
        getDriver().get("https://example.com");
        // Each thread has its own driver
    }
    
    @AfterMethod
    public void teardown() {
        if (getDriver() != null) {
            getDriver().quit();
            removeDriver();
        }
    }
}
```

### DriverManager with ThreadLocal

```java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.edge.EdgeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class DriverManager {
    
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    /**
     * Get WebDriver for current thread
     */
    public static WebDriver getDriver() {
        return driver.get();
    }
    
    /**
     * Create and set WebDriver for current thread
     */
    public static void setDriver(String browser) {
        WebDriver driverInstance;
        
        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                driverInstance = new ChromeDriver();
                break;
                
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                driverInstance = new FirefoxDriver();
                break;
                
            case "edge":
                WebDriverManager.edgedriver().setup();
                driverInstance = new EdgeDriver();
                break;
                
            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }
        
        driverInstance.manage().window().maximize();
        driver.set(driverInstance);
    }
    
    /**
     * Quit and remove WebDriver for current thread
     */
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
    
    /**
     * Get thread information for debugging
     */
    public static String getThreadInfo() {
        return "Thread ID: " + Thread.currentThread().getId() + 
               ", Thread Name: " + Thread.currentThread().getName();
    }
}
```

---

## 4. Parallel Execution Levels

### 1. Parallel Methods

**Configuration:**
```xml
<suite name="Suite" parallel="methods" thread-count="5">
    <test name="Test">
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
</suite>
```

**Test Class:**
```java
package tests;

import org.testng.annotations.Test;

public class LoginTest extends BaseTest {
    
    @Test
    public void testValidLogin() {
        // Runs in parallel with other @Test methods
        System.out.println("testValidLogin - " + getThreadInfo());
    }
    
    @Test
    public void testInvalidLogin() {
        // Runs in parallel with other @Test methods
        System.out.println("testInvalidLogin - " + getThreadInfo());
    }
    
    @Test
    public void testEmptyCredentials() {
        // Runs in parallel with other @Test methods
        System.out.println("testEmptyCredentials - " + getThreadInfo());
    }
}
```

### 2. Parallel Tests

**Configuration:**
```xml
<suite name="Suite" parallel="tests" thread-count="3">
    
    <test name="Login Tests">
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
    
    <test name="Search Tests">
        <classes>
            <class name="tests.SearchTest"/>
        </classes>
    </test>
    
    <test name="Checkout Tests">
        <classes>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>
    
</suite>
```

### 3. Parallel Classes

**Configuration:**
```xml
<suite name="Suite" parallel="classes" thread-count="4">
    <test name="All Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.ProductTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>
</suite>
```

### 4. Parallel DataProvider

**Configuration:**
```xml
<suite name="Suite" parallel="methods" thread-count="10" 
       data-provider-thread-count="5">
</suite>
```

**Test with DataProvider:**
```java
package tests;

import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DataDrivenParallelTest extends BaseTest {
    
    @DataProvider(name = "loginData", parallel = true)
    public Object[][] getLoginData() {
        return new Object[][] {
            {"user1@test.com", "pass1"},
            {"user2@test.com", "pass2"},
            {"user3@test.com", "pass3"},
            {"user4@test.com", "pass4"},
            {"user5@test.com", "pass5"}
        };
    }
    
    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password) {
        System.out.println("Testing: " + username + " - " + getThreadInfo());
        getDriver().get("https://example.com/login");
        // Test logic
    }
}
```

---

## 5. Thread-Safe Test Design

### Base Test Class

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import utils.DriverManager;
import utils.ConfigReader;

public class BaseTest {
    
    protected WebDriver driver;
    
    @Parameters({"browser"})
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) {
        System.out.println("Setup - " + getThreadInfo());
        
        // Create thread-safe driver
        DriverManager.setDriver(browser);
        driver = DriverManager.getDriver();
        
        // Navigate to base URL
        driver.get(ConfigReader.getAppUrl());
    }
    
    @AfterMethod
    public void teardown() {
        System.out.println("Teardown - " + getThreadInfo());
        DriverManager.quitDriver();
    }
    
    protected String getThreadInfo() {
        return DriverManager.getThreadInfo();
    }
}
```

### Thread-Safe Page Objects

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
    
    private WebDriver driver;
    
    @FindBy(id = "username")
    private WebElement usernameField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(id = "loginBtn")
    private WebElement loginButton;
    
    // Constructor receives driver from current thread
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    public HomePage login(String username, String password) {
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        loginButton.click();
        return new HomePage(driver);
    }
}
```

### Thread-Safe Test Example

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.HomePage;

public class ParallelLoginTest extends BaseTest {
    
    @Test
    public void testValidLogin1() {
        System.out.println("testValidLogin1 - " + getThreadInfo());
        
        LoginPage loginPage = new LoginPage(driver);
        HomePage homePage = loginPage.login("user1@test.com", "pass1");
        
        Assert.assertTrue(homePage.isLoggedIn());
    }
    
    @Test
    public void testValidLogin2() {
        System.out.println("testValidLogin2 - " + getThreadInfo());
        
        LoginPage loginPage = new LoginPage(driver);
        HomePage homePage = loginPage.login("user2@test.com", "pass2");
        
        Assert.assertTrue(homePage.isLoggedIn());
    }
    
    @Test
    public void testInvalidLogin() {
        System.out.println("testInvalidLogin - " + getThreadInfo());
        
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("invalid@test.com", "wrong");
        
        Assert.assertTrue(loginPage.isErrorDisplayed());
    }
}
```

---

## 6. Handling Shared Resources

### Problem: Shared Test Data

```java
// ❌ BAD: Shared mutable state
public class SharedDataTest {
    private static int counter = 0;  // Shared across threads
    
    @Test
    public void test1() {
        counter++;  // Race condition!
        System.out.println("Counter: " + counter);
    }
}
```

### Solution 1: ThreadLocal for Test Data

```java
package tests;

import org.testng.annotations.Test;

public class ThreadLocalDataTest {
    
    // ✅ GOOD: ThreadLocal for thread-specific data
    private static ThreadLocal<Integer> counter = ThreadLocal.withInitial(() -> 0);
    
    @Test
    public void test1() {
        counter.set(counter.get() + 1);
        System.out.println("Counter: " + counter.get() + " - " + 
                         Thread.currentThread().getId());
    }
    
    @Test
    public void test2() {
        counter.set(counter.get() + 1);
        System.out.println("Counter: " + counter.get() + " - " + 
                         Thread.currentThread().getId());
    }
}
```

### Solution 2: Unique Test Data per Thread

```java
package utils;

import java.util.UUID;

public class TestDataGenerator {
    
    /**
     * Generate unique email for each thread
     */
    public static String generateUniqueEmail() {
        long threadId = Thread.currentThread().getId();
        String uuid = UUID.randomUUID().toString().substring(0, 8);
        return "user_" + threadId + "_" + uuid + "@test.com";
    }
    
    /**
     * Generate unique username
     */
    public static String generateUniqueUsername() {
        long threadId = Thread.currentThread().getId();
        long timestamp = System.currentTimeMillis();
        return "user_" + threadId + "_" + timestamp;
    }
}
```

### Solution 3: Database Connection Pool

```java
package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class ConnectionPool {
    
    private static BlockingQueue<Connection> pool;
    private static final int POOL_SIZE = 10;
    
    static {
        pool = new ArrayBlockingQueue<>(POOL_SIZE);
        try {
            for (int i = 0; i < POOL_SIZE; i++) {
                Connection conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/testdb", "user", "pass");
                pool.add(conn);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Get connection from pool (thread-safe)
     */
    public static Connection getConnection() throws InterruptedException {
        return pool.take();  // Blocks if no connection available
    }
    
    /**
     * Return connection to pool
     */
    public static void releaseConnection(Connection conn) {
        if (conn != null) {
            pool.offer(conn);
        }
    }
}
```

---

## 7. Performance Optimization

### Optimal Thread Count

```java
package concepts;

public class ThreadCountOptimization {
    
    /*
     * Determining Optimal Thread Count:
     * 
     * 1. CPU-Bound Tests:
     *    Optimal threads = Number of CPU cores
     *    Example: 8-core CPU = 8 threads
     * 
     * 2. I/O-Bound Tests (Selenium):
     *    Optimal threads = 2 × Number of CPU cores
     *    Example: 8-core CPU = 16 threads
     * 
     * 3. Consider:
     *    - Available memory
     *    - Network bandwidth
     *    - Browser resource usage
     *    - Test execution time
     * 
     * 4. Formula:
     *    threads = (CPU cores × 2) × (1 + wait_time/compute_time)
     * 
     * 5. Start Conservative:
     *    - Begin with 5 threads
     *    - Monitor resource usage
     *    - Gradually increase
     *    - Find sweet spot
     */
}
```

### Performance Monitoring

```java
package utils;

public class PerformanceMonitor {
    
    private static ThreadLocal<Long> startTime = new ThreadLocal<>();
    
    public static void startTest() {
        startTime.set(System.currentTimeMillis());
    }
    
    public static void endTest(String testName) {
        long duration = System.currentTimeMillis() - startTime.get();
        System.out.println(testName + " completed in " + duration + "ms - " +
                         "Thread: " + Thread.currentThread().getId());
        startTime.remove();
    }
}
```

### Execution Time Comparison

```java
package tests;

import org.testng.annotations.Test;
import utils.PerformanceMonitor;

public class PerformanceTest extends BaseTest {
    
    @Test
    public void test1() {
        PerformanceMonitor.startTest();
        // Test logic
        PerformanceMonitor.endTest("test1");
    }
    
    @Test
    public void test2() {
        PerformanceMonitor.startTest();
        // Test logic
        PerformanceMonitor.endTest("test2");
    }
}
```

---

## 8. Common Issues and Solutions

### Issue 1: Flaky Tests

**Problem:**
```java
// Tests pass individually but fail in parallel
@Test
public void testA() {
    // Uses shared resource
}

@Test
public void testB() {
    // Uses same shared resource
}
```

**Solution:**
```java
// Make tests independent
@Test
public void testA() {
    String uniqueData = TestDataGenerator.generateUniqueEmail();
    // Use unique data
}

@Test
public void testB() {
    String uniqueData = TestDataGenerator.generateUniqueEmail();
    // Use unique data
}
```

### Issue 2: Resource Exhaustion

**Problem:**
```java
// Too many threads, system runs out of memory
<suite parallel="methods" thread-count="50">
```

**Solution:**
```java
// Reduce thread count, monitor resources
<suite parallel="methods" thread-count="10">
```

### Issue 3: Test Dependencies

**Problem:**
```java
@Test(priority = 1)
public void createUser() {
    // Creates user
}

@Test(priority = 2, dependsOnMethods = "createUser")
public void loginUser() {
    // Depends on createUser
}
```

**Solution:**
```java
// Remove dependencies, make tests independent
@Test
public void testLogin() {
    // Create user within test
    // Then login
    // Cleanup after test
}
```

---

## 9. Best Practices

### 1. Design for Parallelism

```java
/*
 * Best Practices:
 * 
 * 1. Test Independence
 *    - Each test should be self-contained
 *    - No shared state between tests
 *    - No test dependencies
 * 
 * 2. Thread Safety
 *    - Use ThreadLocal for WebDriver
 *    - Use ThreadLocal for test data
 *    - Avoid static mutable variables
 * 
 * 3. Resource Management
 *    - Proper cleanup in @AfterMethod
 *    - Use connection pools
 *    - Limit concurrent connections
 * 
 * 4. Unique Test Data
 *    - Generate unique data per thread
 *    - Use timestamps or UUIDs
 *    - Avoid hardcoded test data
 * 
 * 5. Proper Configuration
 *    - Start with low thread count
 *    - Monitor system resources
 *    - Adjust based on performance
 */
```

---

## 11. Key Takeaways

1. **Parallel execution** dramatically reduces test execution time
2. **ThreadLocal** is essential for thread-safe WebDriver management
3. **Test independence** is critical for reliable parallel execution
4. **Thread count** should be optimized based on system resources
5. **Shared resources** must be handled carefully (pools, unique data)
6. **TestNG** provides multiple parallel execution modes
7. **Performance monitoring** helps identify bottlenecks
8. **Flaky tests** often indicate thread safety issues
9. **Resource management** prevents system exhaustion
10. **Best practices** ensure reliable parallel test execution

---

## 12. Interview Questions

### Basic Level

1. **Q: What is parallel test execution and why is it important?**
   
   A: Parallel execution runs multiple tests simultaneously on different threads, significantly reducing total execution time. Important for faster feedback, better resource utilization, and efficient CI/CD pipelines.

2. **Q: What is ThreadLocal and why is it used in parallel testing?**
   
   A: ThreadLocal provides thread-local variables where each thread has its own independent copy. Used for WebDriver to ensure each thread has its own browser instance, preventing conflicts.

### Intermediate Level

3. **Q: What are the different parallel execution modes in TestNG?**
   
   A: TestNG supports parallel="methods" (all @Test methods), parallel="tests" (all <test> tags), parallel="classes" (all test classes), parallel="instances" (class instances), and combinations thereof.

4. **Q: How do you handle shared resources in parallel execution?**
   
   A: Use ThreadLocal for thread-specific data, implement connection pools for database connections, generate unique test data per thread, use synchronization when necessary, design tests to be independent.

### Advanced Level

5. **Q: Design a thread-safe test automation framework for parallel execution.**
   
   A: Should include: ThreadLocal WebDriver management, thread-safe DriverManager, independent test design, unique test data generation, connection pooling for shared resources, proper resource cleanup, performance monitoring, configurable thread count, error handling and logging, support for multiple browsers in parallel.

---

## Hands-On Exercises

### Exercise 1: Create Thread-Safe WebDriver Manager (30 minutes)

**Objective:** Build a ThreadLocal-based WebDriver manager to support parallel test execution.

**Scenario:** Your tests need to run in parallel, but sharing a single WebDriver causes conflicts. Implement a thread-safe DriverManager using ThreadLocal.

**Requirements:**
1. Create DriverManager class with ThreadLocal WebDriver
2. Implement methods to set, get, and remove driver
3. Add browser initialization with options
4. Implement proper cleanup mechanism
5. Add thread information logging
6. Test with parallel test execution

**Code Template:**

```java
package utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;

public class DriverManager {

    // TODO: Create ThreadLocal variable for WebDriver
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    /**
     * Get WebDriver for current thread
     */
    public static WebDriver getDriver() {
        // TODO: Return driver for current thread
        return null;
    }

    /**
     * Set WebDriver for current thread
     */
    public static void setDriver(String browser) {
        WebDriver driverInstance = null;

        // TODO: Create driver based on browser parameter
        // TODO: Use WebDriverManager for driver setup
        // TODO: Add browser-specific options
        // TODO: Maximize window
        // TODO: Set to ThreadLocal

        switch (browser.toLowerCase()) {
            case "chrome":
                // TODO: Setup Chrome driver
                break;
            case "firefox":
                // TODO: Setup Firefox driver
                break;
            case "edge":
                // TODO: Setup Edge driver
                break;
            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        driver.set(driverInstance);
        System.out.println("Driver initialized for: " + getThreadInfo());
    }

    /**
     * Quit and remove driver for current thread
     */
    public static void quitDriver() {
        // TODO: Check if driver exists
        // TODO: Quit driver
        // TODO: Remove from ThreadLocal
        // TODO: Log thread info
    }

    /**
     * Get current thread information
     */
    public static String getThreadInfo() {
        // TODO: Get thread ID and name
        // TODO: Return formatted string
        return null;
    }

    /**
     * Check if driver is initialized for current thread
     */
    public static boolean isDriverInitialized() {
        // TODO: Check if driver is not null
        return false;
    }
}
```

**Test Class:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import utils.DriverManager;

public class DriverManagerTest {

    @BeforeMethod
    public void setup() {
        DriverManager.setDriver("chrome");
    }

    @Test
    public void testDriverInitialization() {
        // TODO: Assert driver is not null
        // TODO: Print thread info
    }

    @Test
    public void testNavigateToWebsite() {
        DriverManager.getDriver().get("https://www.google.com");
        // TODO: Assert title contains "Google"
    }

    @Test
    public void testMultipleOperations() {
        DriverManager.getDriver().get("https://www.example.com");
        String title = DriverManager.getDriver().getTitle();
        // TODO: Assert title is correct
        // TODO: Verify driver belongs to current thread
    }

    @AfterMethod
    public void teardown() {
        DriverManager.quitDriver();
    }
}
```

**Expected Outcome:**
- ThreadLocal DriverManager successfully created
- Each thread gets its own WebDriver instance
- No conflicts between parallel test threads
- Proper cleanup after each test
- Thread information logged correctly

**Common Mistakes to Avoid:**
1. Not using ThreadLocal (using static WebDriver instead)
2. Not removing driver from ThreadLocal after quit
3. Not checking if driver exists before quit
4. Sharing browser options across threads
5. Not handling browser initialization errors

**Solution Approach Hints:**
- ThreadLocal.get() returns driver for current thread
- ThreadLocal.set() stores driver for current thread
- ThreadLocal.remove() clears the driver reference
- Each thread automatically gets isolated storage

---

### Exercise 2: Implement Parallel Test Execution with TestNG (35 minutes)

**Objective:** Configure and execute tests in parallel using TestNG XML configuration.

**Scenario:** You have multiple test classes that take long time to execute sequentially. Configure TestNG to run them in parallel and measure time savings.

**Requirements:**
1. Create 3 test classes with multiple test methods
2. Create TestNG XML for sequential execution
3. Create TestNG XML for parallel execution
4. Implement BaseTest with thread-safe setup
5. Add performance measurement
6. Compare execution times

**Code Template:**

```java
// BaseTest.java
package tests.base;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import utils.DriverManager;
import utils.PerformanceMonitor;

public class BaseTest {

    protected WebDriver driver;

    @Parameters({"browser"})
    @BeforeMethod
    public void setup(@Optional("chrome") String browser) {
        System.out.println("Setup started - " + DriverManager.getThreadInfo());

        // TODO: Initialize driver using DriverManager
        // TODO: Get driver instance
        // TODO: Start performance monitoring
    }

    @AfterMethod
    public void teardown() {
        System.out.println("Teardown started - " + DriverManager.getThreadInfo());

        // TODO: End performance monitoring
        // TODO: Quit driver using DriverManager
    }

    protected String getThreadInfo() {
        return DriverManager.getThreadInfo();
    }
}

// LoginTest.java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import tests.base.BaseTest;

public class LoginTest extends BaseTest {

    @Test
    public void testValidLogin() {
        System.out.println("testValidLogin - " + getThreadInfo());
        driver.get("https://example.com/login");
        // TODO: Simulate some operations (add Thread.sleep for demo)
        // TODO: Assert title
    }

    @Test
    public void testInvalidLogin() {
        System.out.println("testInvalidLogin - " + getThreadInfo());
        driver.get("https://example.com/login");
        // TODO: Simulate operations
        // TODO: Assert error message
    }

    @Test
    public void testEmptyCredentials() {
        System.out.println("testEmptyCredentials - " + getThreadInfo());
        driver.get("https://example.com/login");
        // TODO: Simulate operations
    }
}

// SearchTest.java
package tests;

import org.testng.annotations.Test;
import tests.base.BaseTest;

public class SearchTest extends BaseTest {

    @Test
    public void testBasicSearch() {
        System.out.println("testBasicSearch - " + getThreadInfo());
        driver.get("https://example.com");
        // TODO: Simulate search operations
    }

    @Test
    public void testAdvancedSearch() {
        System.out.println("testAdvancedSearch - " + getThreadInfo());
        driver.get("https://example.com");
        // TODO: Simulate search operations
    }

    @Test
    public void testSearchFilters() {
        System.out.println("testSearchFilters - " + getThreadInfo());
        driver.get("https://example.com");
        // TODO: Simulate filter operations
    }
}

// CheckoutTest.java
package tests;

import org.testng.annotations.Test;
import tests.base.BaseTest;

public class CheckoutTest extends BaseTest {

    @Test
    public void testAddToCart() {
        System.out.println("testAddToCart - " + getThreadInfo());
        driver.get("https://example.com/products");
        // TODO: Simulate add to cart
    }

    @Test
    public void testCheckoutProcess() {
        System.out.println("testCheckoutProcess - " + getThreadInfo());
        driver.get("https://example.com/cart");
        // TODO: Simulate checkout
    }

    @Test
    public void testPaymentValidation() {
        System.out.println("testPaymentValidation - " + getThreadInfo());
        driver.get("https://example.com/payment");
        // TODO: Simulate payment validation
    }
}
```

**TestNG XML - Sequential:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Sequential Test Suite">

    <test name="All Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

</suite>
```

**TestNG XML - Parallel Methods:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Methods Suite" parallel="methods" thread-count="5">

    <test name="All Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

</suite>
```

**TestNG XML - Parallel Classes:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Classes Suite" parallel="classes" thread-count="3">

    <test name="All Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>

</suite>
```

**Expected Outcome:**
- Tests execute successfully in both modes
- Parallel execution completes faster
- No conflicts between threads
- Each test uses its own driver instance
- Performance improvement measurable

**Common Mistakes to Avoid:**
1. Not using BaseTest with thread-safe driver
2. Hardcoding thread-count too high
3. Tests depending on execution order
4. Sharing test data across threads
5. Not cleaning up resources properly

**Solution Approach Hints:**
- Start with thread-count = 3-5 for testing
- Use parallel="methods" for maximum parallelism
- Ensure each test is independent
- Monitor system resources during execution

---

### Exercise 3: Handle Shared Resources with ThreadLocal (40 minutes)

**Objective:** Manage shared test data and resources safely using ThreadLocal pattern.

**Scenario:** Your tests need test-specific data that shouldn't be shared across threads. Implement ThreadLocal pattern for test data management.

**Requirements:**
1. Create TestDataManager using ThreadLocal
2. Implement unique data generation per thread
3. Create TestContext to store test information
4. Handle database connections with pooling
5. Test with parallel execution
6. Verify data isolation

**Code Template:**

```java
// TestContext.java
package utils;

import java.util.HashMap;
import java.util.Map;

public class TestContext {

    private Map<String, Object> context;

    public TestContext() {
        this.context = new HashMap<>();
    }

    /**
     * Store value in context
     */
    public void set(String key, Object value) {
        // TODO: Store key-value pair
    }

    /**
     * Get value from context
     */
    public Object get(String key) {
        // TODO: Return value for key
        return null;
    }

    /**
     * Remove value from context
     */
    public void remove(String key) {
        // TODO: Remove key from context
    }

    /**
     * Clear entire context
     */
    public void clear() {
        // TODO: Clear all data
    }
}

// TestContextManager.java
package utils;

public class TestContextManager {

    // TODO: Create ThreadLocal for TestContext
    private static ThreadLocal<TestContext> context = new ThreadLocal<>();

    /**
     * Get TestContext for current thread
     */
    public static TestContext getContext() {
        // TODO: Get context for current thread
        // TODO: Create new if doesn't exist
        return null;
    }

    /**
     * Set value in current thread's context
     */
    public static void set(String key, Object value) {
        // TODO: Get context and set value
    }

    /**
     * Get value from current thread's context
     */
    public static Object get(String key) {
        // TODO: Get context and return value
        return null;
    }

    /**
     * Clear context for current thread
     */
    public static void clearContext() {
        // TODO: Clear and remove context
    }
}

// TestDataGenerator.java
package utils;

import java.util.UUID;

public class TestDataGenerator {

    /**
     * Generate unique email for current thread
     */
    public static String generateUniqueEmail() {
        long threadId = Thread.currentThread().getId();
        String uuid = UUID.randomUUID().toString().substring(0, 8);
        // TODO: Return unique email with thread ID and UUID
        return null;
    }

    /**
     * Generate unique username
     */
    public static String generateUniqueUsername() {
        // TODO: Generate username with thread ID and timestamp
        return null;
    }

    /**
     * Generate unique phone number
     */
    public static String generateUniquePhone() {
        // TODO: Generate phone with thread ID
        return null;
    }

    /**
     * Generate unique order ID
     */
    public static String generateOrderId() {
        // TODO: Generate order ID with thread and timestamp
        return null;
    }
}

// SharedResourceTest.java
package tests;

import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import tests.base.BaseTest;
import utils.TestContextManager;
import utils.TestDataGenerator;

public class SharedResourceTest extends BaseTest {

    @BeforeMethod
    public void setupTestData() {
        // TODO: Generate unique test data
        String email = TestDataGenerator.generateUniqueEmail();
        String username = TestDataGenerator.generateUniqueUsername();

        // TODO: Store in context
        TestContextManager.set("email", email);
        TestContextManager.set("username", username);

        System.out.println("Test data for thread: " + getThreadInfo());
        System.out.println("Email: " + email);
        System.out.println("Username: " + username);
    }

    @Test
    public void testUserRegistration() {
        // TODO: Get data from context
        String email = (String) TestContextManager.get("email");
        String username = (String) TestContextManager.get("username");

        System.out.println("Registration test - " + getThreadInfo());

        // TODO: Navigate and use unique data
        driver.get("https://example.com/register");

        // TODO: Assert data is unique to this thread
        Assert.assertNotNull(email);
        Assert.assertTrue(email.contains(String.valueOf(Thread.currentThread().getId())));
    }

    @Test
    public void testUserLogin() {
        // TODO: Get data from context
        String email = (String) TestContextManager.get("email");

        System.out.println("Login test - " + getThreadInfo());

        // TODO: Use same data from context
        driver.get("https://example.com/login");

        // TODO: Verify context maintains data
        Assert.assertNotNull(email);
    }

    @Test
    public void testProfileUpdate() {
        // TODO: Get data from context
        String username = (String) TestContextManager.get("username");

        System.out.println("Profile update test - " + getThreadInfo());

        // TODO: Generate new unique data
        String newPhone = TestDataGenerator.generateUniquePhone();
        TestContextManager.set("phone", newPhone);

        // TODO: Use both old and new data
        driver.get("https://example.com/profile");
    }

    @AfterMethod
    public void clearTestData() {
        // TODO: Clear context for current thread
        TestContextManager.clearContext();
        System.out.println("Context cleared for: " + getThreadInfo());
    }
}
```

**Expected Outcome:**
- Each thread generates unique test data
- No data conflicts between parallel threads
- Context maintains data within thread lifecycle
- Data properly isolated per thread
- Cleanup works correctly

**Common Mistakes to Avoid:**
1. Not initializing ThreadLocal properly
2. Forgetting to clear ThreadLocal after use
3. Sharing mutable objects in ThreadLocal
4. Not generating truly unique data
5. Memory leaks from not removing ThreadLocal

**Solution Approach Hints:**
- Use Thread.currentThread().getId() for uniqueness
- UUID adds extra uniqueness guarantee
- Always clear ThreadLocal in @AfterMethod
- Initialize ThreadLocal with supplier if needed

---

### Exercise 4: Implement Parallel DataProvider Execution (35 minutes)

**Objective:** Create data-driven tests with parallel DataProvider execution for maximum performance.

**Scenario:** You have login tests with 10 different data sets. Execute them in parallel using TestNG's parallel DataProvider.

**Requirements:**
1. Create login test data CSV file
2. Implement CsvDataProvider with parallel support
3. Create test using parallel DataProvider
4. Configure TestNG for DataProvider parallelism
5. Measure execution time improvement
6. Verify all iterations execute correctly

**Test Data (login-data.csv):**

```csv
TestCase,Username,Password,ExpectedResult
TC001,user1@test.com,Pass@123,success
TC002,user2@test.com,Pass@456,success
TC003,user3@test.com,Pass@789,success
TC004,invalid1@test.com,wrong,failure
TC005,invalid2@test.com,wrong,failure
TC006,user6@test.com,Pass@111,success
TC007,user7@test.com,Pass@222,success
TC008,invalid3@test.com,wrong,failure
TC009,user9@test.com,Pass@333,success
TC010,user10@test.com,Pass@444,success
```

**Code Template:**

```java
// CsvDataProvider.java
package dataproviders;

import com.opencsv.CSVReader;
import org.testng.annotations.DataProvider;
import java.io.FileReader;
import java.util.List;

public class CsvDataProvider {

    /**
     * Parallel DataProvider for login tests
     */
    @DataProvider(name = "loginData", parallel = true)
    public Object[][] getLoginData() {
        String csvPath = "src/test/resources/testdata/login-data.csv";

        // TODO: Read CSV file
        // TODO: Skip header row
        // TODO: Convert to Object[][]
        // TODO: Return data

        return new Object[0][0];
    }
}

// ParallelDataProviderTest.java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import dataproviders.CsvDataProvider;
import tests.base.BaseTest;
import utils.PerformanceMonitor;

public class ParallelDataProviderTest extends BaseTest {

    @Test(dataProvider = "loginData", dataProviderClass = CsvDataProvider.class)
    public void testLoginWithData(String testCase, String username,
                                  String password, String expectedResult) {

        PerformanceMonitor.startTest();

        System.out.println("Executing: " + testCase + " - " + getThreadInfo());

        // TODO: Navigate to login page
        driver.get("https://example.com/login");

        // TODO: Simulate login (add small delay for demo)
        try {
            Thread.sleep(2000); // Simulate operation time
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // TODO: Verify expected result
        System.out.println("Test case " + testCase + " completed on thread: " +
                         Thread.currentThread().getId());

        PerformanceMonitor.endTest(testCase);
    }
}
```

**TestNG XML Configuration:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel DataProvider Suite"
       parallel="methods"
       thread-count="5"
       data-provider-thread-count="5">

    <test name="Login Tests">
        <classes>
            <class name="tests.ParallelDataProviderTest"/>
        </classes>
    </test>

</suite>
```

**Expected Outcome:**
- 10 test iterations execute in parallel
- Execution time significantly reduced
- Each iteration gets its own driver
- No conflicts between iterations
- Performance metrics show improvement

**Common Mistakes to Avoid:**
1. Not setting parallel=true in DataProvider annotation
2. Not configuring data-provider-thread-count
3. Tests depending on execution order
4. Not handling driver properly in each iteration
5. Thread-count mismatch with actual parallelism

**Solution Approach Hints:**
- DataProvider parallel=true enables parallel execution
- Each data set runs on separate thread
- Combine with parallel="methods" in XML
- Set realistic thread-count based on resources

---

### Exercise 5: Debug and Fix Parallel Execution Issues (40 minutes)

**Objective:** Identify and fix common parallel execution problems in intentionally broken test code.

**Scenario:** You've been given test code that fails intermittently in parallel execution. Debug and fix thread safety issues.

**Requirements:**
1. Analyze provided broken code
2. Identify thread safety issues
3. Fix shared resource conflicts
4. Implement proper synchronization
5. Verify tests pass consistently
6. Document fixes made

**Broken Code:**

```java
// BrokenParallelTest.java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class BrokenParallelTest {

    // PROBLEM 1: Shared static driver
    private static WebDriver driver;

    // PROBLEM 2: Shared counter
    private static int testCounter = 0;

    // PROBLEM 3: Shared test data
    private static String testEmail = "test@example.com";

    @BeforeMethod
    public void setup() {
        // PROBLEM 4: Overwriting shared driver
        driver = new ChromeDriver();
    }

    @Test
    public void test1() {
        // PROBLEM 5: Using shared counter
        testCounter++;
        System.out.println("Test 1 - Counter: " + testCounter);

        // PROBLEM 6: Using shared driver
        driver.get("https://example.com");
        Assert.assertTrue(driver.getTitle().length() > 0);
    }

    @Test
    public void test2() {
        testCounter++;
        System.out.println("Test 2 - Counter: " + testCounter);

        driver.get("https://example.com/page2");
        Assert.assertTrue(driver.getTitle().length() > 0);
    }

    @Test
    public void test3() {
        // PROBLEM 7: Modifying shared test data
        testEmail = "modified@example.com";
        System.out.println("Test 3 - Email: " + testEmail);

        driver.get("https://example.com/register");
    }

    @AfterMethod
    public void teardown() {
        // PROBLEM 8: Might quit wrong driver
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Your Task - Fix the Code:**

```java
// FixedParallelTest.java
package tests;

import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import utils.DriverManager;
import utils.TestContextManager;
import utils.TestDataGenerator;

public class FixedParallelTest {

    // TODO: Fix Problem 1 - Remove static shared driver
    // TODO: Use ThreadLocal or DriverManager

    // TODO: Fix Problem 2 - Replace shared counter
    // TODO: Use ThreadLocal or remove if not needed

    // TODO: Fix Problem 3 - Replace shared test data
    // TODO: Use TestDataGenerator for unique data

    @BeforeMethod
    public void setup() {
        // TODO: Fix Problem 4 - Use thread-safe driver initialization
    }

    @Test
    public void test1() {
        // TODO: Fix Problem 5 - Use thread-local counter or remove
        // TODO: Fix Problem 6 - Use thread-safe driver

        System.out.println("Test 1 - Thread: " + Thread.currentThread().getId());

        // TODO: Get driver from DriverManager
        // TODO: Navigate and assert
    }

    @Test
    public void test2() {
        System.out.println("Test 2 - Thread: " + Thread.currentThread().getId());

        // TODO: Use thread-safe driver
        // TODO: Navigate and assert
    }

    @Test
    public void test3() {
        // TODO: Fix Problem 7 - Generate unique test data
        String uniqueEmail = TestDataGenerator.generateUniqueEmail();
        System.out.println("Test 3 - Email: " + uniqueEmail);

        // TODO: Use unique email
        // TODO: Navigate and assert
    }

    @AfterMethod
    public void teardown() {
        // TODO: Fix Problem 8 - Quit correct driver for thread
    }
}
```

**Checklist for Fixes:**

```java
/*
 * Issues to Fix:
 *
 * 1. [ ] Replace static WebDriver with ThreadLocal
 * 2. [ ] Replace shared counter with ThreadLocal or remove
 * 3. [ ] Replace shared test data with unique generation
 * 4. [ ] Use DriverManager for driver initialization
 * 5. [ ] Ensure each test uses its own driver instance
 * 6. [ ] Generate unique test data per thread
 * 7. [ ] Proper cleanup using DriverManager
 * 8. [ ] Add thread ID logging for verification
 * 9. [ ] Test with parallel="methods" thread-count="3"
 * 10. [ ] Verify no intermittent failures
 */
```

**Expected Outcome:**
- All thread safety issues identified
- Code refactored to use ThreadLocal patterns
- Tests pass consistently in parallel execution
- No race conditions or conflicts
- Proper resource cleanup

**Common Mistakes to Avoid:**
1. Not identifying all shared mutable state
2. Partial fixes that don't fully solve issues
3. Adding synchronization instead of ThreadLocal
4. Not testing fixes with parallel execution
5. Not verifying thread isolation

**Solution Approach Hints:**
- Identify all static mutable variables
- Replace with ThreadLocal or generate unique data
- Use DriverManager instead of local WebDriver
- Log thread IDs to verify isolation
- Run tests multiple times to confirm stability

---

### Exercise 6: Optimize Parallel Execution Performance (45 minutes)

**Objective:** Analyze and optimize parallel test execution to find the best performance configuration.

**Scenario:** Your test suite runs slowly even with parallelism. Analyze bottlenecks and optimize thread count, execution strategy, and resource usage.

**Requirements:**
1. Create test suite with different execution times
2. Implement performance monitoring
3. Test with different thread counts (1, 3, 5, 10)
4. Test different parallel modes (methods, classes, tests)
5. Measure and compare execution times
6. Determine optimal configuration

**Code Template:**

```java
// PerformanceMonitor.java
package utils;

import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PerformanceMonitor {

    private static ThreadLocal<Instant> testStartTime = new ThreadLocal<>();
    private static ConcurrentHashMap<String, Long> testDurations = new ConcurrentHashMap<>();
    private static Instant suiteStartTime;

    /**
     * Start suite timing
     */
    public static void startSuite() {
        suiteStartTime = Instant.now();
        System.out.println("=== Suite execution started ===");
    }

    /**
     * End suite timing
     */
    public static void endSuite() {
        Duration duration = Duration.between(suiteStartTime, Instant.now());
        System.out.println("=== Suite execution completed ===");
        System.out.println("Total time: " + duration.toSeconds() + " seconds");
        printStatistics();
    }

    /**
     * Start test timing
     */
    public static void startTest() {
        testStartTime.set(Instant.now());
    }

    /**
     * End test timing
     */
    public static void endTest(String testName) {
        // TODO: Calculate duration
        // TODO: Store in testDurations map
        // TODO: Log duration with thread info
        // TODO: Remove from ThreadLocal
    }

    /**
     * Print statistics
     */
    private static void printStatistics() {
        // TODO: Calculate total tests
        // TODO: Calculate average duration
        // TODO: Find min and max durations
        // TODO: Print summary
    }
}

// PerformanceOptimizationTest.java
package tests;

import org.testng.annotations.Test;
import tests.base.BaseTest;

public class PerformanceOptimizationTest extends BaseTest {

    @Test
    public void fastTest1() {
        simulateTest("fastTest1", 1000); // 1 second
    }

    @Test
    public void fastTest2() {
        simulateTest("fastTest2", 1000);
    }

    @Test
    public void fastTest3() {
        simulateTest("fastTest3", 1000);
    }

    @Test
    public void mediumTest1() {
        simulateTest("mediumTest1", 3000); // 3 seconds
    }

    @Test
    public void mediumTest2() {
        simulateTest("mediumTest2", 3000);
    }

    @Test
    public void mediumTest3() {
        simulateTest("mediumTest3", 3000);
    }

    @Test
    public void slowTest1() {
        simulateTest("slowTest1", 5000); // 5 seconds
    }

    @Test
    public void slowTest2() {
        simulateTest("slowTest2", 5000);
    }

    @Test
    public void slowTest3() {
        simulateTest("slowTest3", 5000);
    }

    private void simulateTest(String testName, long duration) {
        System.out.println("Starting: " + testName + " - " + getThreadInfo());
        driver.get("https://example.com");

        try {
            Thread.sleep(duration);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("Completed: " + testName);
    }
}
```

**TestNG XML Configurations to Test:**

```xml
<!-- Configuration 1: Sequential -->
<suite name="Sequential">
    <test name="Tests">
        <classes>
            <class name="tests.PerformanceOptimizationTest"/>
        </classes>
    </test>
</suite>

<!-- Configuration 2: Parallel Methods - 3 threads -->
<suite name="Parallel-3" parallel="methods" thread-count="3">
    <test name="Tests">
        <classes>
            <class name="tests.PerformanceOptimizationTest"/>
        </classes>
    </test>
</suite>

<!-- Configuration 3: Parallel Methods - 5 threads -->
<suite name="Parallel-5" parallel="methods" thread-count="5">
    <test name="Tests">
        <classes>
            <class name="tests.PerformanceOptimizationTest"/>
        </classes>
    </test>
</suite>

<!-- Configuration 4: Parallel Methods - 10 threads -->
<suite name="Parallel-10" parallel="methods" thread-count="10">
    <test name="Tests">
        <classes>
            <class name="tests.PerformanceOptimizationTest"/>
        </classes>
    </test>
</suite>
```

**Analysis Template:**

```java
/*
 * Performance Analysis Results:
 *
 * Sequential Execution:
 * - Total Time: _____ seconds
 * - Fastest Test: _____ seconds
 * - Slowest Test: _____ seconds
 *
 * Parallel - 3 threads:
 * - Total Time: _____ seconds
 * - Improvement: _____ %
 * - Resource Usage: _____
 *
 * Parallel - 5 threads:
 * - Total Time: _____ seconds
 * - Improvement: _____ %
 * - Resource Usage: _____
 *
 * Parallel - 10 threads:
 * - Total Time: _____ seconds
 * - Improvement: _____ %
 * - Resource Usage: _____
 *
 * Optimal Configuration:
 * - Thread Count: _____
 * - Reason: _____
 *
 * Recommendations:
 * 1. _____
 * 2. _____
 * 3. _____
 */
```

**Expected Outcome:**
- Execution times measured for all configurations
- Performance improvement quantified
- Optimal thread count identified
- Resource usage monitored
- Recommendations documented

**Common Mistakes to Avoid:**
1. Not considering system resource limits
2. Setting thread-count too high
3. Not accounting for test execution variance
4. Ignoring resource contention issues
5. Not running multiple iterations for accuracy

**Solution Approach Hints:**
- Expected total time = (Sum of all test times) / thread-count
- Optimal thread-count usually 2x CPU cores for I/O-bound tests
- Monitor CPU and memory during execution
- Diminishing returns after optimal thread count

---

## Navigation

- [Previous: Day 27 - JSON & CSV Data](day27_json_csv_data.md)
- [Next: Day 29 - Cross-Browser Testing](day29_cross_browser_testing.md)
- [Week 4 Overview](README.md)

---

**Congratulations!** You've learned how to implement parallel test execution with TestNG. Parallel execution is a game-changer for test automation, dramatically reducing execution time and improving CI/CD efficiency. Master these concepts to build high-performance test frameworks!