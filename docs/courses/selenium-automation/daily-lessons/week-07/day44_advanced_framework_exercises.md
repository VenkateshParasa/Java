# Day 44: Advanced Framework Topics - Comprehensive Exercises

## Learning Objectives

By completing these exercises, you will:
- Master parallel test execution with TestNG
- Implement custom listeners and reporters
- Integrate database testing in your framework
- Combine UI and API testing effectively
- Set up CI/CD integration basics
- Apply framework optimization techniques

---

## Exercise 1: Parallel Test Execution with TestNG

**Time Estimate:** 20-25 minutes

### Concept Overview

Parallel execution is crucial for reducing test execution time. TestNG provides built-in support for parallel execution at different levels: tests, classes, methods, and instances. Thread safety is critical when running tests in parallel.

### Prerequisites

- Understanding of TestNG basics
- Knowledge of WebDriver management
- Familiarity with test configuration

### Implementation

#### Step 1: Thread-Safe WebDriver Setup

```java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

/**
 * Thread-safe WebDriver manager for parallel test execution
 * Uses ThreadLocal to maintain separate WebDriver instances per thread
 */
public class ThreadLocalDriver {

    // ThreadLocal to store WebDriver instance for each thread
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    /**
     * Initialize WebDriver for current thread
     * @param browser Browser name (chrome, firefox)
     */
    public static void setDriver(String browser) {
        if (driver.get() == null) {
            switch (browser.toLowerCase()) {
                case "chrome":
                    ChromeOptions chromeOptions = new ChromeOptions();
                    chromeOptions.addArguments("--start-maximized");
                    chromeOptions.addArguments("--disable-notifications");
                    driver.set(new ChromeDriver(chromeOptions));
                    break;

                case "firefox":
                    FirefoxOptions firefoxOptions = new FirefoxOptions();
                    firefoxOptions.addArguments("--start-maximized");
                    driver.set(new FirefoxDriver(firefoxOptions));
                    break;

                default:
                    throw new IllegalArgumentException("Browser not supported: " + browser);
            }
        }
    }

    /**
     * Get WebDriver instance for current thread
     * @return WebDriver instance
     */
    public static WebDriver getDriver() {
        return driver.get();
    }

    /**
     * Quit WebDriver and remove from ThreadLocal
     */
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}
```

#### Step 2: Base Test Class for Parallel Execution

```java
package base;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;
import utils.ThreadLocalDriver;

/**
 * Base test class with thread-safe WebDriver setup
 * All test classes should extend this class
 */
public class BaseTest {

    protected WebDriver driver;

    @Parameters({"browser"})
    @BeforeMethod
    public void setUp(@Optional("chrome") String browser) {
        System.out.println("Setting up driver for thread: " +
                          Thread.currentThread().getId() +
                          " with browser: " + browser);

        ThreadLocalDriver.setDriver(browser);
        driver = ThreadLocalDriver.getDriver();
    }

    @AfterMethod
    public void tearDown() {
        System.out.println("Tearing down driver for thread: " +
                          Thread.currentThread().getId());

        ThreadLocalDriver.quitDriver();
    }
}
```

#### Step 3: Parallel Test Classes

```java
package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Login test scenarios for parallel execution
 */
public class LoginTest extends BaseTest {

    @Test(priority = 1)
    public void testValidLogin() {
        System.out.println("Running testValidLogin on thread: " +
                          Thread.currentThread().getId());

        driver.get("https://www.saucedemo.com");

        driver.findElement(By.id("user-name")).sendKeys("standard_user");
        driver.findElement(By.id("password")).sendKeys("secret_sauce");
        driver.findElement(By.id("login-button")).click();

        // Wait for products page
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.urlContains("inventory"));

        Assert.assertTrue(driver.getCurrentUrl().contains("inventory"),
                         "Login should redirect to inventory page");
    }

    @Test(priority = 2)
    public void testInvalidLogin() {
        System.out.println("Running testInvalidLogin on thread: " +
                          Thread.currentThread().getId());

        driver.get("https://www.saucedemo.com");

        driver.findElement(By.id("user-name")).sendKeys("invalid_user");
        driver.findElement(By.id("password")).sendKeys("wrong_password");
        driver.findElement(By.id("login-button")).click();

        WebElement errorMessage = driver.findElement(By.cssSelector("[data-test='error']"));
        Assert.assertTrue(errorMessage.isDisplayed(),
                         "Error message should be displayed for invalid login");
    }

    @Test(priority = 3)
    public void testLockedUser() {
        System.out.println("Running testLockedUser on thread: " +
                          Thread.currentThread().getId());

        driver.get("https://www.saucedemo.com");

        driver.findElement(By.id("user-name")).sendKeys("locked_out_user");
        driver.findElement(By.id("password")).sendKeys("secret_sauce");
        driver.findElement(By.id("login-button")).click();

        WebElement errorMessage = driver.findElement(By.cssSelector("[data-test='error']"));
        Assert.assertTrue(errorMessage.getText().contains("locked out"),
                         "Should show locked out error message");
    }
}
```

```java
package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Product test scenarios for parallel execution
 */
public class ProductTest extends BaseTest {

    private void login() {
        driver.get("https://www.saucedemo.com");
        driver.findElement(By.id("user-name")).sendKeys("standard_user");
        driver.findElement(By.id("password")).sendKeys("secret_sauce");
        driver.findElement(By.id("login-button")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.urlContains("inventory"));
    }

    @Test(priority = 1)
    public void testProductDisplayed() {
        System.out.println("Running testProductDisplayed on thread: " +
                          Thread.currentThread().getId());

        login();

        List<WebElement> products = driver.findElements(By.className("inventory_item"));
        Assert.assertTrue(products.size() > 0, "Products should be displayed");
    }

    @Test(priority = 2)
    public void testAddToCart() {
        System.out.println("Running testAddToCart on thread: " +
                          Thread.currentThread().getId());

        login();

        driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();

        WebElement cartBadge = driver.findElement(By.className("shopping_cart_badge"));
        Assert.assertEquals(cartBadge.getText(), "1",
                           "Cart should show 1 item");
    }

    @Test(priority = 3)
    public void testProductSorting() {
        System.out.println("Running testProductSorting on thread: " +
                          Thread.currentThread().getId());

        login();

        Select sortDropdown = new Select(driver.findElement(
            By.className("product_sort_container")));
        sortDropdown.selectByValue("lohi");

        // Verify sorting applied
        String selectedOption = sortDropdown.getFirstSelectedOption().getText();
        Assert.assertEquals(selectedOption, "Price (low to high)",
                           "Sorting option should be selected");
    }
}
```

#### Step 4: TestNG XML Configuration Files

**testng-parallel-methods.xml** (Parallel at Method Level)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Methods Suite" parallel="methods" thread-count="3">

    <parameter name="browser" value="chrome"/>

    <test name="All Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.ProductTest"/>
        </classes>
    </test>

</suite>
```

**testng-parallel-tests.xml** (Parallel at Test Level)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Tests Suite" parallel="tests" thread-count="2">

    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.ProductTest"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.ProductTest"/>
        </classes>
    </test>

</suite>
```

**testng-parallel-classes.xml** (Parallel at Class Level)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Classes Suite" parallel="classes" thread-count="2">

    <parameter name="browser" value="chrome"/>

    <test name="Test Suite">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.ProductTest"/>
        </classes>
    </test>

</suite>
```

### Expected Output

```
Setting up driver for thread: 14 with browser: chrome
Running testValidLogin on thread: 14
Setting up driver for thread: 15 with browser: chrome
Running testInvalidLogin on thread: 15
Setting up driver for thread: 16 with browser: chrome
Running testProductDisplayed on thread: 16
Tearing down driver for thread: 14
Tearing down driver for thread: 15
Tearing down driver for thread: 16

===============================================
Parallel Methods Suite
Total tests run: 6, Passes: 6, Failures: 0, Skips: 0
===============================================
```

### Success Criteria

- [ ] ThreadLocal WebDriver works correctly
- [ ] Tests run in parallel without interference
- [ ] Each thread has its own WebDriver instance
- [ ] All tests pass when run in parallel
- [ ] No thread safety issues observed
- [ ] Execution time is reduced compared to sequential

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using static WebDriver variable | All threads share same instance causing conflicts | Use ThreadLocal<WebDriver> for thread safety |
| Not removing ThreadLocal after test | Memory leaks and stale references | Always call driver.remove() in tearDown |
| Parallel="methods" with dependencies | Test dependencies break in parallel execution | Use parallel="tests" or remove dependencies |
| Not synchronizing shared resources | Race conditions with shared data | Use synchronized blocks or thread-safe collections |
| Excessive thread count | Too many threads cause resource exhaustion | Limit thread count based on system capacity |

### Challenge Tasks

1. **Advanced**: Implement data provider with parallel execution
2. **Advanced**: Create a custom thread pool executor for better control
3. **Expert**: Implement parallel execution with Selenium Grid
4. **Expert**: Add thread-safe reporting mechanism

---

## Exercise 2: Custom Listeners and Reporters

**Time Estimate:** 25-30 minutes

### Concept Overview

TestNG listeners allow you to customize test execution behavior. Custom listeners can capture test events, take screenshots on failures, log test information, and generate custom reports.

### Implementation

#### Step 1: Custom Test Listener

```java
package listeners;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import utils.ThreadLocalDriver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Custom TestNG listener for logging, screenshots, and reporting
 * Implements ITestListener to hook into test lifecycle events
 */
public class CustomTestListener implements ITestListener {

    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    /**
     * Called before any test method begins execution
     * Initialize ExtentReports here
     */
    @Override
    public void onStart(ITestContext context) {
        System.out.println("========================================");
        System.out.println("Test Suite Started: " + context.getName());
        System.out.println("========================================");

        // Initialize ExtentReports
        String reportPath = "test-output/ExtentReport.html";
        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);
        sparkReporter.config().setDocumentTitle("Automation Test Report");
        sparkReporter.config().setReportName("Test Execution Report");

        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);
        extent.setSystemInfo("Environment", "QA");
        extent.setSystemInfo("Tester", "Automation Team");
    }

    /**
     * Called before each test method starts
     */
    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("\n>>> Starting Test: " + result.getMethod().getMethodName());

        // Create ExtentTest for this test
        ExtentTest test = extent.createTest(result.getMethod().getMethodName());
        extentTest.set(test);

        // Log test start
        extentTest.get().log(Status.INFO, "Test execution started: " +
                            result.getMethod().getMethodName());
    }

    /**
     * Called when test passes
     */
    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("<<< Test PASSED: " + result.getMethod().getMethodName());

        extentTest.get().log(Status.PASS, "Test passed successfully");
        extentTest.get().pass("Test Duration: " +
                             (result.getEndMillis() - result.getStartMillis()) + "ms");
    }

    /**
     * Called when test fails
     * Captures screenshot automatically
     */
    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("<<< Test FAILED: " + result.getMethod().getMethodName());
        System.out.println("    Reason: " + result.getThrowable().getMessage());

        // Log failure
        extentTest.get().log(Status.FAIL, "Test failed");
        extentTest.get().fail(result.getThrowable());

        // Capture screenshot
        String screenshotPath = captureScreenshot(result.getMethod().getMethodName());
        if (screenshotPath != null) {
            try {
                extentTest.get().addScreenCaptureFromPath(screenshotPath,
                                                          "Failure Screenshot");
            } catch (Exception e) {
                System.out.println("Failed to attach screenshot: " + e.getMessage());
            }
        }
    }

    /**
     * Called when test is skipped
     */
    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("<<< Test SKIPPED: " + result.getMethod().getMethodName());

        extentTest.get().log(Status.SKIP, "Test skipped");
        extentTest.get().skip(result.getThrowable());
    }

    /**
     * Called after all tests have completed
     */
    @Override
    public void onFinish(ITestContext context) {
        System.out.println("\n========================================");
        System.out.println("Test Suite Completed: " + context.getName());
        System.out.println("Total Tests: " + context.getAllTestMethods().length);
        System.out.println("Passed: " + context.getPassedTests().size());
        System.out.println("Failed: " + context.getFailedTests().size());
        System.out.println("Skipped: " + context.getSkippedTests().size());
        System.out.println("========================================\n");

        // Flush ExtentReports
        if (extent != null) {
            extent.flush();
        }
    }

    /**
     * Capture screenshot and save to file
     */
    private String captureScreenshot(String testName) {
        try {
            WebDriver driver = ThreadLocalDriver.getDriver();
            if (driver == null) {
                System.out.println("Cannot capture screenshot: Driver is null");
                return null;
            }

            // Take screenshot
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);

            // Create screenshots directory
            String screenshotDir = "test-output/screenshots/";
            Files.createDirectories(Paths.get(screenshotDir));

            // Generate filename with timestamp
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String screenshotPath = screenshotDir + testName + "_" + timestamp + ".png";

            // Copy screenshot
            Files.copy(source.toPath(), Paths.get(screenshotPath));

            System.out.println("Screenshot saved: " + screenshotPath);
            return screenshotPath;

        } catch (IOException e) {
            System.out.println("Failed to capture screenshot: " + e.getMessage());
            return null;
        }
    }
}
```

#### Step 2: Custom Retry Analyzer

```java
package listeners;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

/**
 * Retry analyzer to automatically retry failed tests
 * Helps handle flaky tests
 */
public class RetryAnalyzer implements IRetryAnalyzer {

    private int retryCount = 0;
    private static final int MAX_RETRY_COUNT = 2;

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY_COUNT) {
            System.out.println("Retrying test: " + result.getMethod().getMethodName() +
                             " (Attempt " + (retryCount + 1) + " of " + MAX_RETRY_COUNT + ")");
            retryCount++;
            return true;
        }
        return false;
    }
}
```

#### Step 3: Annotation Transformer for Retry

```java
package listeners;

import org.testng.IAnnotationTransformer;
import org.testng.annotations.ITestAnnotation;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

/**
 * Annotation transformer to apply retry analyzer to all tests
 */
public class AnnotationTransformer implements IAnnotationTransformer {

    @Override
    public void transform(ITestAnnotation annotation, Class testClass,
                         Constructor testConstructor, Method testMethod) {
        // Apply retry analyzer to all tests
        annotation.setRetryAnalyzer(RetryAnalyzer.class);
    }
}
```

#### Step 4: Email Report Listener

```java
package listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

/**
 * Listener to send email reports after test execution
 */
public class EmailReportListener implements ITestListener {

    @Override
    public void onFinish(ITestContext context) {
        // Send email report
        sendEmail(context);
    }

    private void sendEmail(ITestContext context) {
        // Email configuration
        String host = "smtp.gmail.com";
        String from = "automation@test.com";
        String to = "team@test.com";

        // Get system properties
        Properties properties = System.getProperties();
        properties.setProperty("mail.smtp.host", host);
        properties.setProperty("mail.smtp.port", "587");
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");

        // Create session
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("your-email@gmail.com", "password");
            }
        });

        try {
            // Create message
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("Test Execution Report - " + context.getName());

            // Create email body
            String emailBody = createEmailBody(context);
            message.setText(emailBody);

            // Send message (commented out to avoid actual emails in exercise)
            // Transport.send(message);

            System.out.println("\n=== Email Report (Preview) ===");
            System.out.println(emailBody);
            System.out.println("==============================\n");

        } catch (MessagingException e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }

    private String createEmailBody(ITestContext context) {
        StringBuilder body = new StringBuilder();

        body.append("Test Execution Summary\n");
        body.append("======================\n\n");
        body.append("Suite Name: ").append(context.getName()).append("\n");
        body.append("Total Tests: ").append(context.getAllTestMethods().length).append("\n");
        body.append("Passed: ").append(context.getPassedTests().size()).append("\n");
        body.append("Failed: ").append(context.getFailedTests().size()).append("\n");
        body.append("Skipped: ").append(context.getSkippedTests().size()).append("\n\n");

        if (context.getFailedTests().size() > 0) {
            body.append("Failed Tests:\n");
            context.getFailedTests().getAllResults().forEach(result -> {
                body.append("  - ").append(result.getMethod().getMethodName()).append("\n");
            });
        }

        body.append("\nReport: ").append("file:///test-output/ExtentReport.html");

        return body.toString();
    }

    // Other ITestListener methods with empty implementation
    @Override
    public void onTestStart(ITestResult result) {}

    @Override
    public void onTestSuccess(ITestResult result) {}

    @Override
    public void onTestFailure(ITestResult result) {}

    @Override
    public void onTestSkipped(ITestResult result) {}

    @Override
    public void onStart(ITestContext context) {}
}
```

#### Step 5: TestNG XML with Listeners

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Test Suite with Custom Listeners">

    <!-- Configure listeners -->
    <listeners>
        <listener class-name="listeners.CustomTestListener"/>
        <listener class-name="listeners.EmailReportListener"/>
        <listener class-name="listeners.AnnotationTransformer"/>
    </listeners>

    <test name="Listener Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.ProductTest"/>
        </classes>
    </test>

</suite>
```

#### Step 6: POM.xml Dependencies

```xml
<dependencies>
    <!-- ExtentReports -->
    <dependency>
        <groupId>com.aventstack</groupId>
        <artifactId>extentreports</artifactId>
        <version>5.0.9</version>
    </dependency>

    <!-- JavaMail -->
    <dependency>
        <groupId>com.sun.mail</groupId>
        <artifactId>javax.mail</artifactId>
        <version>1.6.2</version>
    </dependency>
</dependencies>
```

### Expected Output

```
========================================
Test Suite Started: Listener Tests
========================================

>>> Starting Test: testValidLogin
<<< Test PASSED: testValidLogin

>>> Starting Test: testInvalidLogin
<<< Test FAILED: testInvalidLogin
    Reason: Element not found
Screenshot saved: test-output/screenshots/testInvalidLogin_20240124_143022.png
Retrying test: testInvalidLogin (Attempt 1 of 2)

========================================
Test Suite Completed: Listener Tests
Total Tests: 2
Passed: 1
Failed: 1
Skipped: 0
========================================

=== Email Report (Preview) ===
Test Execution Summary
======================

Suite Name: Listener Tests
Total Tests: 2
Passed: 1
Failed: 1
Skipped: 0

Failed Tests:
  - testInvalidLogin

Report: file:///test-output/ExtentReport.html
==============================
```

### Success Criteria

- [ ] Custom listener captures all test events
- [ ] Screenshots taken automatically on failure
- [ ] ExtentReport generated successfully
- [ ] Retry analyzer retries failed tests
- [ ] Email report preview shown correctly
- [ ] Listener output is clear and informative

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not flushing ExtentReports | Report file is empty or incomplete | Call extent.flush() in onFinish() |
| Taking screenshot without null check | NullPointerException when driver is null | Always check if driver != null |
| Hardcoding file paths | Tests fail on different OS | Use File.separator or Paths |
| Not handling ThreadLocal in listeners | Screenshots from wrong thread | Use ThreadLocal for thread safety |
| Missing listener registration | Listener methods never called | Register in testng.xml or use @Listeners |

### Challenge Tasks

1. **Intermediate**: Add custom logging to file for each test
2. **Advanced**: Implement screenshot comparison for visual validation
3. **Advanced**: Create custom HTML report template
4. **Expert**: Integrate with Slack/Teams for real-time notifications

---

## Exercise 3: Database Integration

**Time Estimate:** 25-30 minutes

### Concept Overview

Database integration in test automation enables data-driven testing, test data setup/cleanup, and validation of database state. JDBC (Java Database Connectivity) is used to interact with databases from test code.

### Implementation

#### Step 1: Database Connection Manager

```java
package utils;

import java.sql.*;
import java.util.Properties;

/**
 * Database connection manager using JDBC
 * Supports MySQL, PostgreSQL, and other JDBC-compliant databases
 */
public class DatabaseManager {

    private static Connection connection;
    private static final String DB_URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "password";

    /**
     * Establish database connection
     */
    public static Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                // Load MySQL driver
                Class.forName("com.mysql.cj.jdbc.Driver");

                // Create connection
                connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                System.out.println("Database connected successfully");
            }
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
        }
        return connection;
    }

    /**
     * Close database connection
     */
    public static void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Database connection closed");
            }
        } catch (SQLException e) {
            System.err.println("Failed to close connection: " + e.getMessage());
        }
    }

    /**
     * Execute SELECT query and return ResultSet
     */
    public static ResultSet executeQuery(String query) {
        ResultSet resultSet = null;
        try {
            Statement statement = getConnection().createStatement();
            resultSet = statement.executeQuery(query);
        } catch (SQLException e) {
            System.err.println("Query execution failed: " + e.getMessage());
        }
        return resultSet;
    }

    /**
     * Execute INSERT, UPDATE, DELETE queries
     */
    public static int executeUpdate(String query) {
        int rowsAffected = 0;
        try {
            Statement statement = getConnection().createStatement();
            rowsAffected = statement.executeUpdate(query);
            System.out.println("Rows affected: " + rowsAffected);
        } catch (SQLException e) {
            System.err.println("Update execution failed: " + e.getMessage());
        }
        return rowsAffected;
    }

    /**
     * Execute prepared statement (safer for dynamic values)
     */
    public static ResultSet executePreparedQuery(String query, Object... params) {
        ResultSet resultSet = null;
        try {
            PreparedStatement pstmt = getConnection().prepareStatement(query);

            // Set parameters
            for (int i = 0; i < params.length; i++) {
                pstmt.setObject(i + 1, params[i]);
            }

            resultSet = pstmt.executeQuery();
        } catch (SQLException e) {
            System.err.println("Prepared query failed: " + e.getMessage());
        }
        return resultSet;
    }

    /**
     * Execute prepared update statement
     */
    public static int executePreparedUpdate(String query, Object... params) {
        int rowsAffected = 0;
        try {
            PreparedStatement pstmt = getConnection().prepareStatement(query);

            // Set parameters
            for (int i = 0; i < params.length; i++) {
                pstmt.setObject(i + 1, params[i]);
            }

            rowsAffected = pstmt.executeUpdate();
            System.out.println("Rows affected: " + rowsAffected);
        } catch (SQLException e) {
            System.err.println("Prepared update failed: " + e.getMessage());
        }
        return rowsAffected;
    }
}
```

#### Step 2: Test Data Model

```java
package models;

/**
 * User model for test data
 */
public class User {
    private int id;
    private String username;
    private String email;
    private String password;
    private boolean isActive;

    // Constructor
    public User(int id, String username, String email, String password, boolean isActive) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}
```

#### Step 3: Database Test Data Provider

```java
package dataproviders;

import models.User;
import org.testng.annotations.DataProvider;
import utils.DatabaseManager;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Data provider that fetches test data from database
 */
public class DatabaseDataProvider {

    @DataProvider(name = "activeUsers")
    public static Object[][] getActiveUsers() {
        List<User> users = new ArrayList<>();

        String query = "SELECT * FROM users WHERE is_active = true";
        ResultSet rs = DatabaseManager.executeQuery(query);

        try {
            while (rs != null && rs.next()) {
                User user = new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getBoolean("is_active")
                );
                users.add(user);
            }
        } catch (SQLException e) {
            System.err.println("Error reading users: " + e.getMessage());
        }

        // Convert list to 2D array for DataProvider
        Object[][] data = new Object[users.size()][1];
        for (int i = 0; i < users.size(); i++) {
            data[i][0] = users.get(i);
        }

        return data;
    }

    @DataProvider(name = "loginCredentials")
    public static Object[][] getLoginCredentials() {
        List<Object[]> credentials = new ArrayList<>();

        String query = "SELECT username, password, is_active FROM users WHERE is_active = true LIMIT 5";
        ResultSet rs = DatabaseManager.executeQuery(query);

        try {
            while (rs != null && rs.next()) {
                credentials.add(new Object[] {
                    rs.getString("username"),
                    rs.getString("password"),
                    rs.getBoolean("is_active")
                });
            }
        } catch (SQLException e) {
            System.err.println("Error reading credentials: " + e.getMessage());
        }

        return credentials.toArray(new Object[0][]);
    }
}
```

#### Step 4: Database Test Class

```java
package tests;

import base.BaseTest;
import dataproviders.DatabaseDataProvider;
import models.User;
import org.testng.Assert;
import org.testng.annotations.*;
import utils.DatabaseManager;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Database integration tests
 */
public class DatabaseTest extends BaseTest {

    @BeforeClass
    public void setupDatabase() {
        // Create test table
        String createTable = "CREATE TABLE IF NOT EXISTS users (" +
                           "id INT PRIMARY KEY AUTO_INCREMENT, " +
                           "username VARCHAR(50) NOT NULL, " +
                           "email VARCHAR(100) NOT NULL, " +
                           "password VARCHAR(100) NOT NULL, " +
                           "is_active BOOLEAN DEFAULT true" +
                           ")";
        DatabaseManager.executeUpdate(createTable);

        // Insert test data
        insertTestUsers();
    }

    @AfterClass
    public void cleanupDatabase() {
        // Clean up test data
        DatabaseManager.executeUpdate("DELETE FROM users WHERE username LIKE 'test%'");
        DatabaseManager.closeConnection();
    }

    private void insertTestUsers() {
        String insertQuery = "INSERT INTO users (username, email, password, is_active) VALUES (?, ?, ?, ?)";

        DatabaseManager.executePreparedUpdate(insertQuery,
            "testuser1", "test1@example.com", "password123", true);
        DatabaseManager.executePreparedUpdate(insertQuery,
            "testuser2", "test2@example.com", "password456", true);
        DatabaseManager.executePreparedUpdate(insertQuery,
            "testuser3", "test3@example.com", "password789", false);
    }

    @Test(priority = 1)
    public void testDatabaseConnection() {
        Assert.assertNotNull(DatabaseManager.getConnection(),
                           "Database connection should be established");
    }

    @Test(priority = 2)
    public void testReadUserData() {
        String query = "SELECT * FROM users WHERE username = 'testuser1'";
        ResultSet rs = DatabaseManager.executeQuery(query);

        try {
            Assert.assertTrue(rs.next(), "User should exist in database");
            Assert.assertEquals(rs.getString("email"), "test1@example.com",
                              "Email should match");
        } catch (SQLException e) {
            Assert.fail("Failed to read user data: " + e.getMessage());
        }
    }

    @Test(priority = 3)
    public void testUpdateUserData() {
        String updateQuery = "UPDATE users SET email = ? WHERE username = ?";
        int rowsAffected = DatabaseManager.executePreparedUpdate(updateQuery,
                                                                "newemail@example.com",
                                                                "testuser1");

        Assert.assertEquals(rowsAffected, 1, "One row should be updated");

        // Verify update
        String selectQuery = "SELECT email FROM users WHERE username = 'testuser1'";
        ResultSet rs = DatabaseManager.executeQuery(selectQuery);

        try {
            rs.next();
            Assert.assertEquals(rs.getString("email"), "newemail@example.com",
                              "Email should be updated");
        } catch (SQLException e) {
            Assert.fail("Failed to verify update: " + e.getMessage());
        }
    }

    @Test(priority = 4)
    public void testDeleteUserData() {
        String deleteQuery = "DELETE FROM users WHERE username = ?";
        int rowsAffected = DatabaseManager.executePreparedUpdate(deleteQuery, "testuser3");

        Assert.assertEquals(rowsAffected, 1, "One row should be deleted");

        // Verify deletion
        String selectQuery = "SELECT COUNT(*) FROM users WHERE username = 'testuser3'";
        ResultSet rs = DatabaseManager.executeQuery(selectQuery);

        try {
            rs.next();
            Assert.assertEquals(rs.getInt(1), 0, "User should be deleted");
        } catch (SQLException e) {
            Assert.fail("Failed to verify deletion: " + e.getMessage());
        }
    }

    @Test(priority = 5, dataProvider = "activeUsers", dataProviderClass = DatabaseDataProvider.class)
    public void testLoginWithDatabaseUsers(User user) {
        System.out.println("Testing login for user: " + user.getUsername());

        driver.get("https://www.saucedemo.com");
        driver.findElement(By.id("user-name")).sendKeys(user.getUsername());
        driver.findElement(By.id("password")).sendKeys(user.getPassword());
        driver.findElement(By.id("login-button")).click();

        // For demo purposes - in real scenario, users would match the application
        // Assert based on actual application response
    }

    @Test(priority = 6)
    public void testUserRegistrationWithDatabaseValidation() {
        // Simulate user registration in application
        String newUsername = "newuser_" + System.currentTimeMillis();
        String newEmail = newUsername + "@example.com";

        // In real scenario, register through UI
        // For this exercise, we'll insert directly
        String insertQuery = "INSERT INTO users (username, email, password, is_active) VALUES (?, ?, ?, ?)";
        DatabaseManager.executePreparedUpdate(insertQuery,
                                             newUsername, newEmail, "password", true);

        // Validate in database
        String selectQuery = "SELECT * FROM users WHERE username = ?";
        ResultSet rs = DatabaseManager.executePreparedQuery(selectQuery, newUsername);

        try {
            Assert.assertTrue(rs.next(), "New user should exist in database");
            Assert.assertEquals(rs.getString("email"), newEmail,
                              "Email should match");
            Assert.assertTrue(rs.getBoolean("is_active"),
                            "User should be active");
        } catch (SQLException e) {
            Assert.fail("Database validation failed: " + e.getMessage());
        }
    }

    @Test(priority = 7)
    public void testTransactionRollback() {
        try {
            // Start transaction
            DatabaseManager.getConnection().setAutoCommit(false);

            // Insert data
            String insert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            DatabaseManager.executePreparedUpdate(insert,
                                                 "rollback_user", "rollback@test.com", "pass");

            // Rollback
            DatabaseManager.getConnection().rollback();
            DatabaseManager.getConnection().setAutoCommit(true);

            // Verify data was rolled back
            String select = "SELECT COUNT(*) FROM users WHERE username = 'rollback_user'";
            ResultSet rs = DatabaseManager.executeQuery(select);
            rs.next();

            Assert.assertEquals(rs.getInt(1), 0,
                              "Data should be rolled back");

        } catch (SQLException e) {
            Assert.fail("Transaction test failed: " + e.getMessage());
        }
    }
}
```

#### Step 5: POM.xml Dependency

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

### Expected Output

```
Database connected successfully
Rows affected: 1
Rows affected: 1
Rows affected: 1

Test: testDatabaseConnection - PASSED
Test: testReadUserData - PASSED
Test: testUpdateUserData - PASSED
  Rows affected: 1
Test: testDeleteUserData - PASSED
  Rows affected: 1
Test: testLoginWithDatabaseUsers - PASSED
  Testing login for user: testuser1
  Testing login for user: testuser2
Test: testUserRegistrationWithDatabaseValidation - PASSED
Test: testTransactionRollback - PASSED

Database connection closed
```

### Success Criteria

- [ ] Database connection established successfully
- [ ] CRUD operations work correctly
- [ ] Data provider fetches data from database
- [ ] Test data cleanup executes properly
- [ ] Prepared statements prevent SQL injection
- [ ] Transaction rollback works as expected

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not closing ResultSet and Statement | Resource leaks and connection pool exhaustion | Use try-with-resources or explicit close |
| Using string concatenation for queries | SQL injection vulnerability | Use PreparedStatement with parameters |
| Not handling SQLException | Silent failures and unclear errors | Proper exception handling and logging |
| Hardcoding database credentials | Security risk and inflexibility | Use properties file or environment variables |
| Not cleaning up test data | Test data pollution affects other tests | Always clean up in @AfterClass or @AfterMethod |

### Challenge Tasks

1. **Intermediate**: Implement connection pooling with HikariCP
2. **Advanced**: Create a generic DAO (Data Access Object) pattern
3. **Advanced**: Implement database state validation in tests
4. **Expert**: Add support for multiple database types (MySQL, PostgreSQL, Oracle)

---

## Exercise 4: API Integration with RestAssured

**Time Estimate:** 30 minutes

### Concept Overview

Modern applications often have both UI and API layers. Combining UI and API testing in the same framework provides comprehensive test coverage. RestAssured is a popular Java library for API testing.

### Implementation

#### Step 1: API Client Setup

```java
package api;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import static io.restassured.RestAssured.*;

/**
 * API client using RestAssured
 * Provides reusable methods for API calls
 */
public class APIClient {

    private static final String BASE_URL = "https://reqres.in/api";

    static {
        RestAssured.baseURI = BASE_URL;
    }

    /**
     * Get request specification with common headers
     */
    public static RequestSpecification getRequestSpec() {
        return given()
                .header("Content-Type", "application/json")
                .header("Accept", "application/json");
    }

    /**
     * GET request
     */
    public static Response get(String endpoint) {
        Response response = getRequestSpec()
                .when()
                .get(endpoint)
                .then()
                .extract().response();

        logResponse(response);
        return response;
    }

    /**
     * POST request
     */
    public static Response post(String endpoint, String payload) {
        Response response = getRequestSpec()
                .body(payload)
                .when()
                .post(endpoint)
                .then()
                .extract().response();

        logResponse(response);
        return response;
    }

    /**
     * PUT request
     */
    public static Response put(String endpoint, String payload) {
        Response response = getRequestSpec()
                .body(payload)
                .when()
                .put(endpoint)
                .then()
                .extract().response();

        logResponse(response);
        return response;
    }

    /**
     * DELETE request
     */
    public static Response delete(String endpoint) {
        Response response = getRequestSpec()
                .when()
                .delete(endpoint)
                .then()
                .extract().response();

        logResponse(response);
        return response;
    }

    /**
     * Log response details
     */
    private static void logResponse(Response response) {
        System.out.println("=== API Response ===");
        System.out.println("Status Code: " + response.getStatusCode());
        System.out.println("Response Time: " + response.getTime() + "ms");
        System.out.println("Response Body: " + response.getBody().asString());
        System.out.println("===================");
    }
}
```

#### Step 2: API Test Class

```java
package tests;

import api.APIClient;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * API tests using RestAssured
 */
public class APITest {

    @Test(priority = 1)
    public void testGetUsers() {
        Response response = APIClient.get("/users?page=2");

        // Validate status code
        Assert.assertEquals(response.getStatusCode(), 200,
                           "Status code should be 200");

        // Validate response time
        Assert.assertTrue(response.getTime() < 2000,
                         "Response time should be less than 2 seconds");

        // Validate response body
        Assert.assertNotNull(response.jsonPath().get("data"),
                            "Data should not be null");

        // Validate specific field
        int page = response.jsonPath().getInt("page");
        Assert.assertEquals(page, 2, "Page should be 2");
    }

    @Test(priority = 2)
    public void testGetSingleUser() {
        Response response = APIClient.get("/users/2");

        Assert.assertEquals(response.getStatusCode(), 200);

        // Validate user data
        String firstName = response.jsonPath().getString("data.first_name");
        Assert.assertNotNull(firstName, "First name should not be null");

        String email = response.jsonPath().getString("data.email");
        Assert.assertTrue(email.contains("@"), "Email should be valid");
    }

    @Test(priority = 3)
    public void testCreateUser() {
        String payload = "{\n" +
                        "    \"name\": \"John Doe\",\n" +
                        "    \"job\": \"QA Engineer\"\n" +
                        "}";

        Response response = APIClient.post("/users", payload);

        // Validate status code for creation
        Assert.assertEquals(response.getStatusCode(), 201,
                           "Status code should be 201 for creation");

        // Validate created user
        String name = response.jsonPath().getString("name");
        Assert.assertEquals(name, "John Doe", "Name should match");

        String job = response.jsonPath().getString("job");
        Assert.assertEquals(job, "QA Engineer", "Job should match");

        // Validate ID and timestamp are generated
        Assert.assertNotNull(response.jsonPath().getString("id"),
                            "ID should be generated");
        Assert.assertNotNull(response.jsonPath().getString("createdAt"),
                            "Timestamp should be generated");
    }

    @Test(priority = 4)
    public void testUpdateUser() {
        String payload = "{\n" +
                        "    \"name\": \"John Updated\",\n" +
                        "    \"job\": \"Senior QA Engineer\"\n" +
                        "}";

        Response response = APIClient.put("/users/2", payload);

        Assert.assertEquals(response.getStatusCode(), 200,
                           "Status code should be 200 for update");

        String name = response.jsonPath().getString("name");
        Assert.assertEquals(name, "John Updated", "Name should be updated");
    }

    @Test(priority = 5)
    public void testDeleteUser() {
        Response response = APIClient.delete("/users/2");

        // No content returned for DELETE
        Assert.assertEquals(response.getStatusCode(), 204,
                           "Status code should be 204 for successful deletion");
    }

    @Test(priority = 6)
    public void testGetUserNotFound() {
        Response response = APIClient.get("/users/999");

        Assert.assertEquals(response.getStatusCode(), 404,
                           "Status code should be 404 for not found");
    }
}
```

#### Step 3: Combined UI and API Test

```java
package tests;

import api.APIClient;
import base.BaseTest;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Test combining UI and API validation
 */
public class UIAndAPITest extends BaseTest {

    private String userId;

    @Test(priority = 1)
    public void testCreateUserViaAPI() {
        System.out.println("Step 1: Create user via API");

        String payload = "{\n" +
                        "    \"name\": \"Test User\",\n" +
                        "    \"job\": \"Automation Tester\"\n" +
                        "}";

        Response response = APIClient.post("/users", payload);

        Assert.assertEquals(response.getStatusCode(), 201,
                           "User should be created successfully");

        userId = response.jsonPath().getString("id");
        System.out.println("User created with ID: " + userId);
    }

    @Test(priority = 2, dependsOnMethods = "testCreateUserViaAPI")
    public void testVerifyUserInUI() {
        System.out.println("Step 2: Verify user exists in UI");

        // In a real scenario, you would navigate to the application
        // and verify the user appears in the UI
        driver.get("https://reqres.in");

        // Example UI validation (pseudo-code for demonstration)
        // WebElement userElement = driver.findElement(By.id("user-" + userId));
        // Assert.assertTrue(userElement.isDisplayed());

        System.out.println("User verified in UI (simulated)");
    }

    @Test(priority = 3, dependsOnMethods = "testVerifyUserInUI")
    public void testUpdateUserViaUIAndValidateAPI() {
        System.out.println("Step 3: Update user via UI");

        // Simulate UI update (in real scenario, interact with UI elements)
        String updatedName = "Updated Test User";

        // Verify update via API
        Response response = APIClient.get("/users/" + userId);

        // Note: reqres.in is a mock API, so actual user won't exist
        // In real scenario, you would verify the updated data

        System.out.println("User update validated via API");
    }

    @Test(priority = 4, dependsOnMethods = "testUpdateUserViaUIAndValidateAPI")
    public void testDeleteUserViaAPIAndVerifyUI() {
        System.out.println("Step 4: Delete user via API");

        Response response = APIClient.delete("/users/" + userId);
        Assert.assertEquals(response.getStatusCode(), 204,
                           "User should be deleted successfully");

        // Verify in UI that user no longer exists
        driver.navigate().refresh();

        // Example UI validation (pseudo-code)
        // List<WebElement> users = driver.findElements(By.id("user-" + userId));
        // Assert.assertEquals(users.size(), 0, "User should not exist in UI");

        System.out.println("User deletion verified in UI (simulated)");
    }
}
```

#### Step 4: API Response Validator

```java
package utils;

import io.restassured.response.Response;
import org.testng.Assert;

/**
 * Utility class for common API response validations
 */
public class APIValidator {

    public static void validateStatusCode(Response response, int expectedCode) {
        Assert.assertEquals(response.getStatusCode(), expectedCode,
                           "Status code should be " + expectedCode);
    }

    public static void validateResponseTime(Response response, long maxTime) {
        Assert.assertTrue(response.getTime() < maxTime,
                         "Response time should be less than " + maxTime + "ms");
    }

    public static void validateContentType(Response response, String expectedType) {
        String actualType = response.getContentType();
        Assert.assertTrue(actualType.contains(expectedType),
                         "Content-Type should contain " + expectedType);
    }

    public static void validateFieldNotNull(Response response, String jsonPath) {
        Object value = response.jsonPath().get(jsonPath);
        Assert.assertNotNull(value, "Field " + jsonPath + " should not be null");
    }

    public static void validateFieldEquals(Response response, String jsonPath, Object expectedValue) {
        Object actualValue = response.jsonPath().get(jsonPath);
        Assert.assertEquals(actualValue, expectedValue,
                           "Field " + jsonPath + " should equal " + expectedValue);
    }

    public static void validateArraySize(Response response, String jsonPath, int expectedSize) {
        int actualSize = response.jsonPath().getList(jsonPath).size();
        Assert.assertEquals(actualSize, expectedSize,
                           "Array " + jsonPath + " should have " + expectedSize + " elements");
    }
}
```

#### Step 5: POM.xml Dependencies

```xml
<dependencies>
    <!-- RestAssured -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.3.2</version>
    </dependency>

    <!-- JSON Path -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-path</artifactId>
        <version>5.3.2</version>
    </dependency>

    <!-- JSON Schema Validator -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-schema-validator</artifactId>
        <version>5.3.2</version>
    </dependency>
</dependencies>
```

### Expected Output

```
=== API Response ===
Status Code: 200
Response Time: 456ms
Response Body: {"page":2,"per_page":6,"total":12...}
===================

Test: testGetUsers - PASSED
Test: testGetSingleUser - PASSED
Test: testCreateUser - PASSED
  User created with ID: 123
Test: testUpdateUser - PASSED
Test: testDeleteUser - PASSED
Test: testGetUserNotFound - PASSED

=== Combined UI + API Tests ===
Step 1: Create user via API
User created with ID: 124
Step 2: Verify user exists in UI
User verified in UI (simulated)
Step 3: Update user via UI
User update validated via API
Step 4: Delete user via API
User deletion verified in UI (simulated)
```

### Success Criteria

- [ ] API requests execute successfully
- [ ] Response validation works correctly
- [ ] Status codes are verified properly
- [ ] UI and API tests work together
- [ ] Response time validation passes
- [ ] JSON path extraction works

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not validating response time | Performance issues go unnoticed | Always validate response time |
| Hardcoding request/response data | Tests become brittle and unmaintainable | Use variables, data providers, or test data files |
| Not logging API calls | Debugging failures is difficult | Log request/response details |
| Ignoring status codes | Silent failures in API | Always validate expected status codes |
| Not handling authentication | Tests fail when auth is required | Implement proper authentication handling |

### Challenge Tasks

1. **Intermediate**: Add JSON schema validation
2. **Advanced**: Implement OAuth 2.0 authentication
3. **Advanced**: Create end-to-end workflow (API → UI → API validation)
4. **Expert**: Build API test data factory with Faker library

---

## Exercise 5: CI/CD Integration Basics

**Time Estimate:** 25-30 minutes

### Concept Overview

Continuous Integration/Continuous Deployment (CI/CD) automates test execution whenever code changes. This exercise covers Maven profiles for different environments and basic Jenkins integration.

### Implementation

#### Step 1: Maven Profiles Configuration

```xml
<!-- pom.xml -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.automation</groupId>
    <artifactId>selenium-framework</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <selenium.version>4.16.1</selenium.version>
        <testng.version>7.8.0</testng.version>
    </properties>

    <dependencies>
        <!-- Dependencies from previous exercises -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>${selenium.version}</version>
        </dependency>
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>${testng.version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.0.0-M9</version>
                <configuration>
                    <suiteXmlFiles>
                        <suiteXmlFile>${suite.xml.file}</suiteXmlFile>
                    </suiteXmlFiles>
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <!-- Maven Profiles for Different Environments -->
    <profiles>
        <!-- Development Profile -->
        <profile>
            <id>dev</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <env>dev</env>
                <suite.xml.file>testng-dev.xml</suite.xml.file>
                <browser>chrome</browser>
                <headless>false</headless>
            </properties>
        </profile>

        <!-- QA Profile -->
        <profile>
            <id>qa</id>
            <properties>
                <env>qa</env>
                <suite.xml.file>testng-qa.xml</suite.xml.file>
                <browser>chrome</browser>
                <headless>false</headless>
            </properties>
        </profile>

        <!-- Staging Profile -->
        <profile>
            <id>staging</id>
            <properties>
                <env>staging</env>
                <suite.xml.file>testng-staging.xml</suite.xml.file>
                <browser>chrome</browser>
                <headless>true</headless>
            </properties>
        </profile>

        <!-- Production Smoke Test Profile -->
        <profile>
            <id>prod-smoke</id>
            <properties>
                <env>prod</env>
                <suite.xml.file>testng-smoke.xml</suite.xml.file>
                <browser>chrome</browser>
                <headless>true</headless>
            </properties>
        </profile>

        <!-- CI/CD Profile -->
        <profile>
            <id>ci</id>
            <properties>
                <env>ci</env>
                <suite.xml.file>testng-ci.xml</suite.xml.file>
                <browser>chrome</browser>
                <headless>true</headless>
            </properties>
        </profile>

        <!-- Regression Profile -->
        <profile>
            <id>regression</id>
            <properties>
                <env>qa</env>
                <suite.xml.file>testng-regression.xml</suite.xml.file>
                <browser>chrome</browser>
                <headless>true</headless>
            </properties>
        </profile>
    </profiles>

</project>
```

#### Step 2: Environment Configuration Files

**config-dev.properties**
```properties
# Development Environment Configuration
app.url=https://dev.example.com
app.username=dev_user
app.password=dev_pass123

# Browser Configuration
browser=chrome
headless=false
implicit.wait=10
explicit.wait=20

# Database Configuration
db.url=jdbc:mysql://dev-db.example.com:3306/testdb
db.username=dev_db_user
db.password=dev_db_pass

# API Configuration
api.baseurl=https://dev-api.example.com
api.timeout=30
```

**config-qa.properties**
```properties
# QA Environment Configuration
app.url=https://qa.example.com
app.username=qa_user
app.password=qa_pass123

browser=chrome
headless=false
implicit.wait=10
explicit.wait=20

db.url=jdbc:mysql://qa-db.example.com:3306/testdb
db.username=qa_db_user
db.password=qa_db_pass

api.baseurl=https://qa-api.example.com
api.timeout=30
```

**config-ci.properties**
```properties
# CI Environment Configuration
app.url=https://ci.example.com
app.username=ci_user
app.password=ci_pass123

browser=chrome
headless=true
implicit.wait=10
explicit.wait=20

db.url=jdbc:mysql://ci-db.example.com:3306/testdb
db.username=ci_db_user
db.password=ci_db_pass

api.baseurl=https://ci-api.example.com
api.timeout=30
```

#### Step 3: Configuration Manager

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * Configuration manager to load environment-specific properties
 */
public class ConfigManager {

    private static Properties properties;
    private static final String CONFIG_PATH = "src/test/resources/config-";

    /**
     * Load configuration based on environment
     */
    public static void loadConfig(String environment) {
        if (properties == null) {
            properties = new Properties();
            String configFile = CONFIG_PATH + environment + ".properties";

            try (FileInputStream fis = new FileInputStream(configFile)) {
                properties.load(fis);
                System.out.println("Loaded configuration for environment: " + environment);
            } catch (IOException e) {
                System.err.println("Failed to load config file: " + configFile);
                e.printStackTrace();
            }
        }
    }

    /**
     * Get property value
     */
    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    /**
     * Get property with default value
     */
    public static String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }

    // Convenience methods
    public static String getAppUrl() {
        return getProperty("app.url");
    }

    public static String getBrowser() {
        return getProperty("browser", "chrome");
    }

    public static boolean isHeadless() {
        return Boolean.parseBoolean(getProperty("headless", "false"));
    }

    public static int getImplicitWait() {
        return Integer.parseInt(getProperty("implicit.wait", "10"));
    }

    public static String getApiBaseUrl() {
        return getProperty("api.baseurl");
    }
}
```

#### Step 4: Updated Base Test with Configuration

```java
package base;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;
import utils.ConfigManager;
import utils.ThreadLocalDriver;

import java.time.Duration;

/**
 * Enhanced base test with environment configuration support
 */
public class BaseTest {

    protected WebDriver driver;

    @BeforeSuite
    public void suiteSetup() {
        // Load configuration based on environment
        String environment = System.getProperty("env", "dev");
        ConfigManager.loadConfig(environment);

        System.out.println("=== Test Suite Setup ===");
        System.out.println("Environment: " + environment);
        System.out.println("App URL: " + ConfigManager.getAppUrl());
        System.out.println("Browser: " + ConfigManager.getBrowser());
        System.out.println("Headless: " + ConfigManager.isHeadless());
        System.out.println("========================");
    }

    @Parameters({"browser"})
    @BeforeMethod
    public void setUp(@Optional String browser) {
        // Use browser from parameter or config
        if (browser == null || browser.isEmpty()) {
            browser = ConfigManager.getBrowser();
        }

        ThreadLocalDriver.setDriver(browser);
        driver = ThreadLocalDriver.getDriver();

        // Set timeouts from configuration
        driver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(ConfigManager.getImplicitWait()));
    }

    @AfterMethod
    public void tearDown() {
        ThreadLocalDriver.quitDriver();
    }
}
```

#### Step 5: Command-Line Execution Scripts

**run-tests.sh** (Linux/Mac)
```bash
#!/bin/bash

# Script to run tests with different profiles

echo "Selenium Test Execution Script"
echo "================================"

# Check arguments
if [ -z "$1" ]; then
    echo "Usage: ./run-tests.sh [dev|qa|staging|ci|regression]"
    exit 1
fi

PROFILE=$1

echo "Running tests with profile: $PROFILE"

# Run Maven with specified profile
mvn clean test -P$PROFILE

# Check exit code
if [ $? -eq 0 ]; then
    echo "Tests completed successfully!"
else
    echo "Tests failed!"
    exit 1
fi
```

**run-tests.bat** (Windows)
```batch
@echo off
REM Script to run tests with different profiles

echo Selenium Test Execution Script
echo ================================

if "%1"=="" (
    echo Usage: run-tests.bat [dev^|qa^|staging^|ci^|regression]
    exit /b 1
)

set PROFILE=%1

echo Running tests with profile: %PROFILE%

REM Run Maven with specified profile
call mvn clean test -P%PROFILE%

if %ERRORLEVEL% EQU 0 (
    echo Tests completed successfully!
) else (
    echo Tests failed!
    exit /b 1
)
```

#### Step 6: Jenkinsfile for CI/CD

```groovy
pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'qa', 'staging'], description: 'Select environment')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Select browser')
        booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Run in headless mode')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                echo 'Setting up test environment...'
                sh 'mvn clean'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running tests on ${params.ENVIRONMENT} environment"
                sh """
                    mvn test \
                    -P${params.ENVIRONMENT} \
                    -Dbrowser=${params.BROWSER} \
                    -Dheadless=${params.HEADLESS}
                """
            }
        }

        stage('Generate Reports') {
            steps {
                echo 'Generating test reports...'
                // Publish TestNG reports
                publishHTML([
                    reportDir: 'test-output',
                    reportFiles: 'ExtentReport.html',
                    reportName: 'Extent Report'
                ])
            }
        }
    }

    post {
        always {
            echo 'Archiving test results...'
            archiveArtifacts artifacts: '**/test-output/**', allowEmptyArchive: true

            // Publish TestNG results
            step([$class: 'Publisher', reportFilenamePattern: '**/testng-results.xml'])
        }

        success {
            echo 'Tests passed successfully!'
            emailext (
                subject: "Test Passed: ${env.JOB_NAME} - Build ${env.BUILD_NUMBER}",
                body: """
                    Tests completed successfully!

                    Job: ${env.JOB_NAME}
                    Build: ${env.BUILD_NUMBER}
                    Environment: ${params.ENVIRONMENT}
                    Browser: ${params.BROWSER}

                    Check console output at ${env.BUILD_URL}
                """,
                to: 'team@example.com'
            )
        }

        failure {
            echo 'Tests failed!'
            emailext (
                subject: "Test Failed: ${env.JOB_NAME} - Build ${env.BUILD_NUMBER}",
                body: """
                    Tests failed!

                    Job: ${env.JOB_NAME}
                    Build: ${env.BUILD_NUMBER}
                    Environment: ${params.ENVIRONMENT}
                    Browser: ${params.BROWSER}

                    Check console output at ${env.BUILD_URL}
                """,
                to: 'team@example.com'
            )
        }
    }
}
```

### Expected Output

```bash
$ ./run-tests.sh qa

Selenium Test Execution Script
================================
Running tests with profile: qa

[INFO] Scanning for projects...
[INFO] Building selenium-framework 1.0-SNAPSHOT
[INFO]
=== Test Suite Setup ===
Environment: qa
App URL: https://qa.example.com
Browser: chrome
Headless: false
========================

[INFO] Running TestSuite
Setting up driver for thread: 14 with browser: chrome
Running testValidLogin on thread: 14
Test PASSED: testValidLogin
Tearing down driver for thread: 14

[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0

Tests completed successfully!
```

### Success Criteria

- [ ] Maven profiles work correctly
- [ ] Environment-specific configs load properly
- [ ] Command-line execution scripts run successfully
- [ ] Tests execute with different profiles
- [ ] Configuration values are applied correctly
- [ ] Reports are generated in test-output directory

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Hardcoding environment URLs | Cannot run on different environments | Use configuration files and profiles |
| Not parameterizing browser choice | Tests limited to single browser | Use Maven properties and parameters |
| Committing sensitive credentials | Security risk | Use environment variables or secret management |
| Not separating test suites | All tests run every time | Create profile-specific TestNG XMLs |
| Missing error handling in scripts | Silent failures | Check exit codes and log errors |

### Challenge Tasks

1. **Intermediate**: Add GitHub Actions workflow
2. **Advanced**: Implement Docker-based CI/CD pipeline
3. **Advanced**: Add Slack notifications for test results
4. **Expert**: Create multi-stage pipeline with smoke, regression, and deployment

---

## Exercise 6: Framework Optimization & Best Practices

**Time Estimate:** 30 minutes

### Concept Overview

A well-organized, optimized framework is maintainable, scalable, and efficient. This exercise covers code organization, performance optimization, and common pitfalls to avoid.

### Implementation

#### Step 1: Optimized Page Object Model Structure

```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

/**
 * Optimized Base Page with reusable wait methods
 * All page objects should extend this class
 */
public abstract class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    // Optimized wait methods
    protected WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    protected WebElement waitForClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    protected void waitForInvisibility(By locator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    // Optimized click with retry logic
    protected void clickWithRetry(By locator, int maxAttempts) {
        for (int i = 0; i < maxAttempts; i++) {
            try {
                waitForClickable(locator).click();
                return;
            } catch (Exception e) {
                if (i == maxAttempts - 1) {
                    throw e;
                }
                try {
                    Thread.sleep(500);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    // Optimized text input with clear
    protected void sendKeysOptimized(By locator, String text) {
        WebElement element = waitForElement(locator);
        element.clear();
        element.sendKeys(text);
    }

    // Check if element exists without throwing exception
    protected boolean isElementPresent(By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Get elements with timeout
    protected List<WebElement> getElements(By locator) {
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
        return driver.findElements(locator);
    }

    // Abstract method to verify page load
    public abstract boolean isPageLoaded();
}
```

**Optimized Login Page Example**
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Optimized Login Page with fluent interface
 */
public class LoginPage extends BasePage {

    // Locators as constants (easy to maintain)
    private static final By USERNAME_FIELD = By.id("user-name");
    private static final By PASSWORD_FIELD = By.id("password");
    private static final By LOGIN_BUTTON = By.id("login-button");
    private static final By ERROR_MESSAGE = By.cssSelector("[data-test='error']");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementPresent(LOGIN_BUTTON);
    }

    // Fluent interface methods
    public LoginPage enterUsername(String username) {
        sendKeysOptimized(USERNAME_FIELD, username);
        return this;
    }

    public LoginPage enterPassword(String password) {
        sendKeysOptimized(PASSWORD_FIELD, password);
        return this;
    }

    public ProductsPage clickLogin() {
        clickWithRetry(LOGIN_BUTTON, 3);
        return new ProductsPage(driver);
    }

    // Combined method for better readability
    public ProductsPage loginAs(String username, String password) {
        return enterUsername(username)
                .enterPassword(password)
                .clickLogin();
    }

    public String getErrorMessage() {
        return waitForElement(ERROR_MESSAGE).getText();
    }

    public boolean isErrorDisplayed() {
        return isElementPresent(ERROR_MESSAGE);
    }
}
```

#### Step 2: Performance Optimization Utilities

```java
package utils;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 * Performance optimization utilities
 */
public class PerformanceOptimizer {

    /**
     * Disable CSS and images for faster page load (for non-visual tests)
     */
    public static ChromeOptions getFastChromeOptions() {
        ChromeOptions options = new ChromeOptions();

        // Disable images
        Map<String, Object> prefs = new HashMap<>();
        prefs.put("profile.managed_default_content_settings.images", 2);
        prefs.put("profile.default_content_setting_values.notifications", 2);
        options.setExperimentalOption("prefs", prefs);

        // Additional performance flags
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-gpu");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-popup-blocking");

        return options;
    }

    /**
     * Measure page load time
     */
    public static long getPageLoadTime(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (Long) js.executeScript(
            "return performance.timing.loadEventEnd - performance.timing.navigationStart;"
        );
    }

    /**
     * Wait for page ready state
     */
    public static void waitForPageReady(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        for (int i = 0; i < 30; i++) {
            String readyState = js.executeScript("return document.readyState").toString();
            if ("complete".equals(readyState)) {
                return;
            }
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    /**
     * Scroll to element using JavaScript (faster than Actions)
     */
    public static void scrollToElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
    }

    /**
     * Click using JavaScript (bypasses visibility checks)
     */
    public static void clickUsingJS(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", element);
    }
}
```

#### Step 3: Test Data Factory

```java
package testdata;

import com.github.javafaker.Faker;
import models.User;

/**
 * Test data factory using Faker library
 * Generates realistic test data dynamically
 */
public class TestDataFactory {

    private static final Faker faker = new Faker();

    /**
     * Generate random user data
     */
    public static User createRandomUser() {
        return new User(
            0, // ID will be auto-generated
            faker.name().username(),
            faker.internet().emailAddress(),
            faker.internet().password(8, 16),
            true
        );
    }

    /**
     * Generate user with specific username
     */
    public static User createUserWithUsername(String username) {
        return new User(
            0,
            username,
            faker.internet().emailAddress(),
            faker.internet().password(8, 16),
            true
        );
    }

    /**
     * Generate multiple users
     */
    public static List<User> createMultipleUsers(int count) {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            users.add(createRandomUser());
        }
        return users;
    }

    // Other data generation methods
    public static String generateEmail() {
        return faker.internet().emailAddress();
    }

    public static String generatePhone() {
        return faker.phoneNumber().phoneNumber();
    }

    public static String generateAddress() {
        return faker.address().fullAddress();
    }
}
```

#### Step 4: Smart Wait Utility

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import java.time.Duration;
import java.util.function.Function;

/**
 * Smart wait utility with fluent interface
 */
public class SmartWait {

    private WebDriver driver;
    private Wait<WebDriver> fluentWait;

    public SmartWait(WebDriver driver) {
        this.driver = driver;
        this.fluentWait = new FluentWait<>(driver)
                .withTimeout(Duration.ofSeconds(30))
                .pollingEvery(Duration.ofMillis(500))
                .ignoring(NoSuchElementException.class)
                .ignoring(StaleElementReferenceException.class);
    }

    /**
     * Wait for element to be visible
     */
    public WebElement waitForVisible(By locator) {
        return fluentWait.until(driver -> {
            WebElement element = driver.findElement(locator);
            return element.isDisplayed() ? element : null;
        });
    }

    /**
     * Wait for element to be clickable
     */
    public WebElement waitForClickable(By locator) {
        return fluentWait.until(driver -> {
            WebElement element = driver.findElement(locator);
            return (element.isDisplayed() && element.isEnabled()) ? element : null;
        });
    }

    /**
     * Wait for text to be present in element
     */
    public boolean waitForTextPresent(By locator, String text) {
        return fluentWait.until(driver -> {
            try {
                String elementText = driver.findElement(locator).getText();
                return elementText.contains(text);
            } catch (Exception e) {
                return false;
            }
        });
    }

    /**
     * Wait for attribute value
     */
    public boolean waitForAttributeValue(By locator, String attribute, String value) {
        return fluentWait.until(driver -> {
            try {
                String attrValue = driver.findElement(locator).getAttribute(attribute);
                return value.equals(attrValue);
            } catch (Exception e) {
                return false;
            }
        });
    }

    /**
     * Wait for number of elements
     */
    public List<WebElement> waitForElementCount(By locator, int expectedCount) {
        return fluentWait.until(driver -> {
            List<WebElement> elements = driver.findElements(locator);
            return elements.size() == expectedCount ? elements : null;
        });
    }

    /**
     * Wait for custom condition
     */
    public <T> T waitForCondition(Function<WebDriver, T> condition) {
        return fluentWait.until(condition);
    }
}
```

#### Step 5: Framework Constants

```java
package constants;

/**
 * Framework constants to avoid magic numbers and strings
 */
public class FrameworkConstants {

    // Timeouts
    public static final int IMPLICIT_WAIT = 10;
    public static final int EXPLICIT_WAIT = 20;
    public static final int PAGE_LOAD_TIMEOUT = 30;
    public static final int SCRIPT_TIMEOUT = 20;

    // Retry counts
    public static final int MAX_RETRY_COUNT = 3;
    public static final int CLICK_RETRY_COUNT = 3;

    // Paths
    public static final String SCREENSHOT_PATH = "test-output/screenshots/";
    public static final String REPORT_PATH = "test-output/reports/";
    public static final String TEST_DATA_PATH = "src/test/resources/testdata/";
    public static final String CONFIG_PATH = "src/test/resources/config-";

    // File extensions
    public static final String PROPERTIES_EXT = ".properties";
    public static final String EXCEL_EXT = ".xlsx";
    public static final String PNG_EXT = ".png";

    // Test data
    public static final String VALID_USERNAME = "standard_user";
    public static final String VALID_PASSWORD = "secret_sauce";

    // Private constructor to prevent instantiation
    private FrameworkConstants() {
        throw new IllegalStateException("Utility class");
    }
}
```

#### Step 6: Best Practices Checklist

```java
package tests;

import base.BaseTest;
import org.testng.annotations.Test;

/**
 * Example test demonstrating framework best practices
 */
public class BestPracticesTest extends BaseTest {

    /**
     * BEST PRACTICE #1: Clear, descriptive test names
     * Test name should describe what is being tested
     */
    @Test(priority = 1, description = "Verify user can login with valid credentials")
    public void testValidUserCanLoginSuccessfully() {
        // Test implementation
    }

    /**
     * BEST PRACTICE #2: Use Page Object Model
     * Don't use driver.findElement in test classes
     */
    @Test(priority = 2)
    public void testProductSearchWithPageObjects() {
        LoginPage loginPage = new LoginPage(driver);
        ProductsPage productsPage = loginPage.loginAs("user", "pass");

        // GOOD: Using page objects
        productsPage.searchProduct("Backpack");

        // BAD: Direct driver usage in tests
        // driver.findElement(By.id("search")).sendKeys("Backpack");
    }

    /**
     * BEST PRACTICE #3: Independent tests
     * Each test should be able to run independently
     */
    @Test(priority = 3)
    public void testIndependentExecution() {
        // Setup test data within test
        // Don't depend on previous test results
    }

    /**
     * BEST PRACTICE #4: Proper assertions
     * Use descriptive assertion messages
     */
    @Test(priority = 4)
    public void testWithProperAssertions() {
        String actual = "Hello";
        String expected = "Hello";

        // GOOD: Descriptive message
        Assert.assertEquals(actual, expected,
                           "Welcome message should match expected value");

        // BAD: No message
        // Assert.assertEquals(actual, expected);
    }

    /**
     * BEST PRACTICE #5: Avoid Thread.sleep
     * Use explicit waits instead
     */
    @Test(priority = 5)
    public void testWithoutHardcodedSleeps() {
        // GOOD: Use explicit wait
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement element = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("element"))
        );

        // BAD: Hardcoded sleep
        // Thread.sleep(5000);
    }

    /**
     * BEST PRACTICE #6: Use constants instead of magic numbers/strings
     */
    @Test(priority = 6)
    public void testWithConstants() {
        // GOOD: Using constants
        driver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(FrameworkConstants.IMPLICIT_WAIT));

        // BAD: Magic numbers
        // driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    /**
     * BEST PRACTICE #7: Proper exception handling
     */
    @Test(priority = 7)
    public void testWithProperExceptionHandling() {
        try {
            // Test logic
        } catch (Exception e) {
            // GOOD: Log error and fail with message
            System.err.println("Test failed: " + e.getMessage());
            Assert.fail("Test failed due to: " + e.getMessage());
        }

        // BAD: Empty catch block
        // catch (Exception e) { }
    }

    /**
     * BEST PRACTICE #8: Data-driven testing
     * Use data providers for multiple test scenarios
     */
    @Test(priority = 8, dataProvider = "loginData")
    public void testDataDrivenLogin(String username, String password, boolean shouldPass) {
        // Test with different data combinations
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"valid_user", "valid_pass", true},
            {"invalid_user", "wrong_pass", false},
            {"", "", false}
        };
    }
}
```

### Expected Output

```
=== Framework Optimization Report ===

Performance Metrics:
- Average page load time: 1.2s
- Test execution time: 45s (down from 2m15s)
- Memory usage: Optimized

Code Quality:
✓ No hardcoded values
✓ Proper wait strategies
✓ Page Object Model implemented
✓ Constants used throughout
✓ Exception handling in place

Test Maintainability:
✓ Clear test names
✓ Reusable utilities
✓ Data-driven approach
✓ Independent tests

=====================================
```

### Success Criteria

- [ ] Page Object Model implemented correctly
- [ ] No hardcoded waits (Thread.sleep)
- [ ] Constants used instead of magic values
- [ ] Proper exception handling
- [ ] Reusable utility methods created
- [ ] Test execution time improved

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using Thread.sleep() | Wastes time, tests are slower than needed | Use explicit waits (WebDriverWait) |
| Hardcoded test data in tests | Difficult to maintain and scale | Use data providers or external files |
| Not using Page Object Model | Tests become unreadable and unmaintainable | Implement POM for all pages |
| No exception handling | Tests fail silently with unclear errors | Proper try-catch with logging |
| Magic numbers and strings | Code is unclear and hard to maintain | Use constants class |

### Challenge Tasks

1. **Intermediate**: Implement fluent wait for all interactions
2. **Advanced**: Create custom annotations for test metadata
3. **Advanced**: Implement test result caching mechanism
4. **Expert**: Build framework health check and auto-optimization

---

## Summary

Congratulations! You have completed Day 44 exercises covering:

- ✅ Parallel test execution with ThreadLocal WebDriver
- ✅ Custom listeners for logging, reporting, and screenshots
- ✅ Database integration with JDBC
- ✅ API testing integration with RestAssured
- ✅ CI/CD configuration with Maven profiles
- ✅ Framework optimization and best practices

**Key Takeaways:**
1. Thread safety is critical for parallel execution
2. Listeners enhance framework capabilities significantly
3. Database integration enables powerful data-driven testing
4. Combining UI and API tests provides comprehensive coverage
5. CI/CD integration automates testing in the development pipeline
6. A well-organized framework is maintainable and scalable

**Next Steps:**
- Review and practice each exercise
- Apply these concepts to your own framework
- Prepare for Day 45: Complete Automation Framework Project

---

## Additional Resources

- TestNG Documentation: https://testng.org/doc/
- RestAssured Documentation: https://rest-assured.io/
- Extent Reports: https://www.extentreports.com/
- Maven Profiles: https://maven.apache.org/guides/introduction/introduction-to-profiles.html

---

**Congratulations on mastering advanced framework topics!**
