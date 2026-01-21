# Day 39: Logging & Reporting Part 2 - Extent Reports & Allure

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the importance of test reporting in automation
- Set up and configure Extent Reports 5 with Selenium
- Create comprehensive test reports with TestNG integration
- Add screenshots and logs to Extent Reports
- Customize report appearance and branding
- Set up and configure Allure Reports framework
- Use Allure annotations for enhanced reporting
- Add attachments and categorize tests in Allure
- Compare Extent Reports vs Allure Reports
- Create custom HTML reports from scratch
- Generate and send email reports automatically
- Build a complete reporting framework
- Apply reporting best practices
- Answer interview questions on test reporting

---

## 1. Introduction to Test Reporting

### What is Test Reporting?

**Test Reporting** is the process of documenting test execution results in a clear, comprehensive, and visually appealing format. It provides stakeholders with insights into test quality, coverage, and application health.

### Why Test Reports are Critical

1. **Visibility**: Shows what was tested and the results
2. **Traceability**: Links tests to requirements and defects
3. **Analysis**: Helps identify patterns and trends
4. **Communication**: Shares results with stakeholders
5. **Evidence**: Provides proof of testing activities
6. **Decision Making**: Supports release decisions

### Components of a Good Test Report

```
1. Executive Summary
   - Total tests executed
   - Pass/Fail/Skip counts
   - Pass percentage
   - Execution time

2. Test Details
   - Test name and description
   - Test steps
   - Expected vs actual results
   - Failure reasons

3. Visual Evidence
   - Screenshots
   - Videos (optional)
   - Logs

4. Environment Information
   - Browser/OS details
   - Application version
   - Test data used

5. Trends and Metrics
   - Historical comparison
   - Flaky test identification
   - Performance metrics
```

### Types of Test Reports

1. **Default TestNG Reports**: Basic HTML reports
2. **Extent Reports**: Rich, interactive HTML reports
3. **Allure Reports**: Modern, feature-rich reports
4. **Custom HTML Reports**: Tailored to specific needs
5. **Email Reports**: Automated notifications

---

## 2. Extent Reports 5 Setup and Configuration

### What is Extent Reports?

**Extent Reports** is a powerful HTML reporting library for test automation. It provides beautiful, interactive reports with charts, screenshots, and detailed test information.

### Key Features

- Beautiful, responsive HTML reports
- Interactive charts and graphs
- Screenshot integration
- Log messages with different severity levels
- Custom attributes and categories
- Support for TestNG, JUnit, and Cucumber
- Real-time report generation

### Maven Dependencies

Add the following to your `pom.xml`:

```xml
<dependencies>
    <!-- Selenium -->
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

    <!-- Extent Reports 5 -->
    <dependency>
        <groupId>com.aventstack</groupId>
        <artifactId>extentreports</artifactId>
        <version>5.1.1</version>
    </dependency>
</dependencies>
```

### Basic Extent Reports Setup

```java
package reports;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

public class ExtentManager {

    private static ExtentReports extent;
    private static ExtentSparkReporter sparkReporter;

    public static ExtentReports createInstance(String fileName) {
        // Create ExtentSparkReporter
        sparkReporter = new ExtentSparkReporter(fileName);

        // Configure SparkReporter
        sparkReporter.config().setTheme(Theme.DARK);
        sparkReporter.config().setDocumentTitle("Automation Test Report");
        sparkReporter.config().setReportName("Test Execution Report");
        sparkReporter.config().setTimeStampFormat("MMM dd, yyyy HH:mm:ss");

        // Create ExtentReports instance
        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);

        // Add system information
        extent.setSystemInfo("OS", System.getProperty("os.name"));
        extent.setSystemInfo("User", System.getProperty("user.name"));
        extent.setSystemInfo("Java Version", System.getProperty("java.version"));
        extent.setSystemInfo("Environment", "QA");
        extent.setSystemInfo("Browser", "Chrome");

        return extent;
    }

    public static ExtentReports getInstance() {
        return extent;
    }
}
```

### Project Structure for Extent Reports

```
project-root/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/
│   │       │   └── LoginPage.java
│   │       ├── reports/
│   │       │   ├── ExtentManager.java
│   │       │   └── ExtentTestManager.java
│   │       └── utils/
│   │           └── ScreenshotUtils.java
│   └── test/
│       └── java/
│           └── tests/
│               ├── BaseTest.java
│               └── LoginTest.java
├── test-output/
│   └── ExtentReport.html
└── pom.xml
```

---

## 3. Creating Extent Reports with TestNG

### ExtentTestManager Class

```java
package reports;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import java.util.HashMap;
import java.util.Map;

public class ExtentTestManager {

    private static Map<Integer, ExtentTest> extentTestMap = new HashMap<>();
    private static ExtentReports extent = ExtentManager.getInstance();

    public static synchronized ExtentTest getTest() {
        return extentTestMap.get((int) Thread.currentThread().getId());
    }

    public static synchronized ExtentTest startTest(String testName) {
        ExtentTest test = extent.createTest(testName);
        extentTestMap.put((int) Thread.currentThread().getId(), test);
        return test;
    }

    public static synchronized ExtentTest startTest(String testName, String description) {
        ExtentTest test = extent.createTest(testName, description);
        extentTestMap.put((int) Thread.currentThread().getId(), test);
        return test;
    }

    public static synchronized void endTest() {
        extent.flush();
    }
}
```

### BaseTest with Extent Reports

```java
package tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;
import reports.ExtentManager;
import reports.ExtentTestManager;

public class BaseTest {

    protected WebDriver driver;
    protected static ExtentReports extent;
    protected ExtentTest test;

    @BeforeSuite
    public void setupSuite() {
        // Initialize Extent Reports
        extent = ExtentManager.createInstance("test-output/ExtentReport.html");
    }

    @BeforeMethod
    public void setup(ITestResult result) {
        // Initialize browser
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Start Extent Test
        String testName = result.getMethod().getMethodName();
        String description = result.getMethod().getDescription();
        test = ExtentTestManager.startTest(testName, description);
        test.log(Status.INFO, "Test started: " + testName);
        test.log(Status.INFO, "Browser launched successfully");
    }

    @AfterMethod
    public void teardown(ITestResult result) {
        // Log test result
        if (result.getStatus() == ITestResult.FAILURE) {
            test.log(Status.FAIL, "Test Failed: " + result.getName());
            test.log(Status.FAIL, "Failure Reason: " + result.getThrowable());
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            test.log(Status.PASS, "Test Passed: " + result.getName());
        } else if (result.getStatus() == ITestResult.SKIP) {
            test.log(Status.SKIP, "Test Skipped: " + result.getName());
        }

        // Close browser
        if (driver != null) {
            driver.quit();
            test.log(Status.INFO, "Browser closed successfully");
        }
    }

    @AfterSuite
    public void teardownSuite() {
        // Flush reports
        ExtentTestManager.endTest();
    }
}
```

### Sample Test with Extent Reports

```java
package tests;

import com.aventstack.extentreports.Status;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;
import reports.ExtentTestManager;

public class LoginTest extends BaseTest {

    @Test(description = "Verify login with valid credentials")
    public void testValidLogin() {
        test = ExtentTestManager.getTest();

        try {
            test.log(Status.INFO, "Navigating to login page");
            driver.get("https://example.com/login");

            test.log(Status.INFO, "Entering username");
            driver.findElement(By.id("username")).sendKeys("testuser");

            test.log(Status.INFO, "Entering password");
            driver.findElement(By.id("password")).sendKeys("password123");

            test.log(Status.INFO, "Clicking login button");
            driver.findElement(By.id("loginBtn")).click();

            test.log(Status.INFO, "Verifying successful login");
            boolean isDashboardDisplayed = driver.findElement(By.id("dashboard")).isDisplayed();

            Assert.assertTrue(isDashboardDisplayed, "Dashboard should be displayed");
            test.log(Status.PASS, "Login successful - Dashboard displayed");

        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }

    @Test(description = "Verify login with invalid credentials")
    public void testInvalidLogin() {
        test = ExtentTestManager.getTest();

        try {
            test.log(Status.INFO, "Navigating to login page");
            driver.get("https://example.com/login");

            test.log(Status.INFO, "Entering invalid credentials");
            driver.findElement(By.id("username")).sendKeys("invalid");
            driver.findElement(By.id("password")).sendKeys("wrong");
            driver.findElement(By.id("loginBtn")).click();

            test.log(Status.INFO, "Verifying error message");
            boolean isErrorDisplayed = driver.findElement(By.className("error")).isDisplayed();

            Assert.assertTrue(isErrorDisplayed, "Error message should be displayed");
            test.log(Status.PASS, "Error message displayed correctly");

        } catch (Exception e) {
            test.log(Status.FAIL, "Test failed with exception: " + e.getMessage());
            throw e;
        }
    }
}
```

---

## 4. Adding Screenshots to Reports

### Screenshot Utility Class

```java
package utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotUtils {

    public static String captureScreenshot(WebDriver driver, String screenshotName) {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String fileName = screenshotName + "_" + timestamp + ".png";
        String destination = System.getProperty("user.dir") + "/test-output/screenshots/" + fileName;

        try {
            // Create screenshots directory if it doesn't exist
            File screenshotDir = new File(System.getProperty("user.dir") + "/test-output/screenshots/");
            if (!screenshotDir.exists()) {
                screenshotDir.mkdirs();
            }

            // Take screenshot
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);
            File finalDestination = new File(destination);

            // Copy file to destination
            FileUtils.copyFile(source, finalDestination);

            return destination;
        } catch (IOException e) {
            System.out.println("Exception while taking screenshot: " + e.getMessage());
            return null;
        }
    }

    public static String getScreenshotBase64(WebDriver driver) {
        TakesScreenshot ts = (TakesScreenshot) driver;
        return ts.getScreenshotAs(OutputType.BASE64);
    }
}
```

### Adding Screenshots to Extent Reports

```java
package tests;

import com.aventstack.extentreports.MediaEntityBuilder;
import com.aventstack.extentreports.Status;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import utils.ScreenshotUtils;

public class BaseTestWithScreenshot extends BaseTest {

    @AfterMethod
    @Override
    public void teardown(ITestResult result) {
        String screenshotPath = null;

        // Capture screenshot on failure
        if (result.getStatus() == ITestResult.FAILURE) {
            screenshotPath = ScreenshotUtils.captureScreenshot(driver, result.getName());

            test.log(Status.FAIL, "Test Failed: " + result.getName());
            test.log(Status.FAIL, "Failure Reason: " + result.getThrowable());

            // Add screenshot to report
            try {
                test.fail("Screenshot on failure",
                    MediaEntityBuilder.createScreenCaptureFromPath(screenshotPath).build());
            } catch (Exception e) {
                test.log(Status.FAIL, "Failed to attach screenshot: " + e.getMessage());
            }

        } else if (result.getStatus() == ITestResult.SUCCESS) {
            test.log(Status.PASS, "Test Passed: " + result.getName());

        } else if (result.getStatus() == ITestResult.SKIP) {
            test.log(Status.SKIP, "Test Skipped: " + result.getName());
        }

        // Close browser
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Adding Screenshots Using Base64

```java
public void addScreenshotToReport(String message) {
    try {
        String base64Screenshot = ScreenshotUtils.getScreenshotBase64(driver);
        test.log(Status.INFO, message,
            MediaEntityBuilder.createScreenCaptureFromBase64String(base64Screenshot).build());
    } catch (Exception e) {
        test.log(Status.WARNING, "Failed to attach screenshot: " + e.getMessage());
    }
}

// Usage in test
@Test
public void testWithScreenshot() {
    test = ExtentTestManager.getTest();

    driver.get("https://example.com");
    addScreenshotToReport("Homepage loaded");

    driver.findElement(By.id("loginBtn")).click();
    addScreenshotToReport("Login button clicked");
}
```

---

## 5. Adding Test Logs to Reports

### Log Levels in Extent Reports

```java
package tests;

import com.aventstack.extentreports.Status;
import org.testng.annotations.Test;

public class LoggingExampleTest extends BaseTest {

    @Test(description = "Demonstrate different log levels")
    public void testLoggingLevels() {
        test = ExtentTestManager.getTest();

        // INFO - General information
        test.log(Status.INFO, "This is an informational message");
        test.info("Alternative way to log info");

        // PASS - Successful step
        test.log(Status.PASS, "This step passed successfully");
        test.pass("Alternative way to log pass");

        // FAIL - Failed step
        test.log(Status.FAIL, "This step failed");
        test.fail("Alternative way to log failure");

        // WARNING - Warning message
        test.log(Status.WARNING, "This is a warning message");
        test.warning("Alternative way to log warning");

        // SKIP - Skipped step
        test.log(Status.SKIP, "This step was skipped");
        test.skip("Alternative way to log skip");
    }
}
```

### Structured Logging in Tests

```java
@Test(description = "Test with structured logging")
public void testWithStructuredLogs() {
    test = ExtentTestManager.getTest();

    // Test Setup
    test.info("=== Test Setup ===");
    test.info("Opening browser");
    driver.get("https://example.com/login");
    test.info("Navigated to login page");

    // Test Execution
    test.info("=== Test Execution ===");

    test.info("Step 1: Enter username");
    driver.findElement(By.id("username")).sendKeys("testuser");
    test.pass("Username entered successfully");

    test.info("Step 2: Enter password");
    driver.findElement(By.id("password")).sendKeys("password123");
    test.pass("Password entered successfully");

    test.info("Step 3: Click login button");
    driver.findElement(By.id("loginBtn")).click();
    test.pass("Login button clicked");

    // Test Verification
    test.info("=== Test Verification ===");
    test.info("Verifying dashboard is displayed");
    boolean isDashboardDisplayed = driver.findElement(By.id("dashboard")).isDisplayed();

    if (isDashboardDisplayed) {
        test.pass("Dashboard displayed successfully");
    } else {
        test.fail("Dashboard was not displayed");
    }
}
```

### Adding HTML Content to Logs

```java
@Test(description = "Test with HTML formatted logs")
public void testWithHTMLLogs() {
    test = ExtentTestManager.getTest();

    // Add formatted text
    test.info("<b>Bold text</b>");
    test.info("<i>Italic text</i>");
    test.info("<u>Underlined text</u>");

    // Add colored text
    test.info("<span style='color: red;'>Red colored text</span>");
    test.info("<span style='color: green;'>Green colored text</span>");

    // Add links
    test.info("<a href='https://example.com'>Click here to visit website</a>");

    // Add tables
    String tableHtml = "<table border='1'>" +
                      "<tr><th>Field</th><th>Value</th></tr>" +
                      "<tr><td>Username</td><td>testuser</td></tr>" +
                      "<tr><td>Password</td><td>****</td></tr>" +
                      "</table>";
    test.info(tableHtml);
}
```

---

## 6. Custom Report Styling

### Advanced Extent Reports Configuration

```java
package reports;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import com.aventstack.extentreports.reporter.configuration.ViewName;

public class AdvancedExtentManager {

    private static ExtentReports extent;

    public static ExtentReports createInstance(String fileName) {
        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(fileName);

        // Basic Configuration
        sparkReporter.config().setTheme(Theme.STANDARD);
        sparkReporter.config().setDocumentTitle("Test Automation Report");
        sparkReporter.config().setReportName("Selenium Test Execution Report");
        sparkReporter.config().setTimeStampFormat("EEEE, MMMM dd, yyyy, hh:mm a '('zzz')'");

        // Custom CSS
        sparkReporter.config().setCss(
            ".test-container { border-left: 3px solid #0d6efd; }" +
            ".test-name { font-weight: bold; font-size: 16px; }" +
            ".category-name { background-color: #0d6efd; color: white; }"
        );

        // Custom JavaScript
        sparkReporter.config().setJs(
            "console.log('Report loaded successfully');"
        );

        // Set order of views
        sparkReporter.viewConfigurer()
            .viewOrder()
            .as(new ViewName[]{
                ViewName.DASHBOARD,
                ViewName.TEST,
                ViewName.CATEGORY,
                ViewName.DEVICE,
                ViewName.EXCEPTION,
                ViewName.LOG
            })
            .apply();

        // Create ExtentReports
        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);

        // System Information
        extent.setSystemInfo("Application", "E-Commerce Website");
        extent.setSystemInfo("Operating System", System.getProperty("os.name"));
        extent.setSystemInfo("User Name", System.getProperty("user.name"));
        extent.setSystemInfo("Java Version", System.getProperty("java.version"));
        extent.setSystemInfo("Time Zone", System.getProperty("user.timezone"));
        extent.setSystemInfo("Environment", "QA");
        extent.setSystemInfo("Browser", "Chrome 120.0");
        extent.setSystemInfo("Selenium Version", "4.15.0");
        extent.setSystemInfo("Test Framework", "TestNG");

        return extent;
    }
}
```

### Adding Categories and Authors

```java
@Test(description = "Login test with categories and author")
public void testWithCategoriesAndAuthor() {
    test = ExtentTestManager.getTest();

    // Assign categories
    test.assignCategory("Smoke Test");
    test.assignCategory("Login Tests");
    test.assignCategory("Priority 1");

    // Assign author
    test.assignAuthor("John Doe");
    test.assignAuthor("QA Team");

    // Assign device
    test.assignDevice("Chrome Browser");
    test.assignDevice("Windows 11");

    // Test execution
    test.info("Executing test with metadata");
    // ... test code ...
}
```

### Creating Nodes and Child Tests

```java
@Test(description = "Test with hierarchical structure")
public void testWithNodes() {
    test = ExtentTestManager.getTest();

    // Create parent test
    test.info("Starting comprehensive login test");

    // Create child test - Valid Login
    ExtentTest validLoginNode = test.createNode("Valid Login Scenario");
    validLoginNode.info("Testing with valid credentials");
    validLoginNode.pass("Valid login successful");

    // Create child test - Invalid Login
    ExtentTest invalidLoginNode = test.createNode("Invalid Login Scenario");
    invalidLoginNode.info("Testing with invalid credentials");
    invalidLoginNode.pass("Error message displayed correctly");

    // Create child test - Empty Fields
    ExtentTest emptyFieldsNode = test.createNode("Empty Fields Scenario");
    emptyFieldsNode.info("Testing with empty fields");
    emptyFieldsNode.pass("Validation message displayed");
}
```

---

## 7. Allure Reports Introduction

### What is Allure?

**Allure Framework** is a flexible, lightweight multi-language test reporting tool that provides clear graphical representation of test execution results.

### Key Features

- Beautiful, modern web report
- Built-in trend analysis
- Test categorization and suites
- Attachments (screenshots, logs, videos)
- Timeline view
- Historical data tracking
- Integration with CI/CD
- Multiple language support

### Allure vs Extent Reports

| Feature | Extent Reports | Allure Reports |
|---------|---------------|----------------|
| Setup Complexity | Easy | Moderate |
| Real-time Reports | Yes | No (requires build) |
| UI Design | Modern, customizable | Very modern, fixed |
| Historical Trends | Limited | Excellent |
| Test Categorization | Categories/Tags | Epics/Features/Stories |
| CI/CD Integration | Good | Excellent |
| Learning Curve | Low | Medium |
| Documentation | Good | Excellent |

---

## 8. Allure Annotations and Setup

### Maven Dependencies

```xml
<dependencies>
    <!-- Allure TestNG -->
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-testng</artifactId>
        <version>2.24.0</version>
    </dependency>

    <!-- AspectJ Weaver (required for Allure) -->
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.20.1</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <!-- Maven Surefire Plugin for TestNG -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0</version>
            <configuration>
                <argLine>
                    -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/1.9.20.1/aspectjweaver-1.9.20.1.jar"
                </argLine>
            </configuration>
        </plugin>

        <!-- Allure Maven Plugin -->
        <plugin>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-maven</artifactId>
            <version>2.12.0</version>
        </plugin>
    </plugins>
</build>
```

### Allure Annotations

```java
package tests;

import io.qameta.allure.*;
import org.testng.annotations.Test;

@Epic("E-Commerce Application")
@Feature("User Authentication")
public class AllureAnnotationsTest {

    @Test
    @Story("User Login")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Test to verify user can login with valid credentials")
    @Owner("John Doe")
    @Link(name = "Requirement", url = "https://jira.com/REQ-123")
    @Issue("BUG-456")
    @TmsLink("TC-789")
    public void testValidLogin() {
        // Test implementation
    }

    @Test
    @Story("User Login")
    @Severity(SeverityLevel.NORMAL)
    @Description("Test to verify error message on invalid login")
    public void testInvalidLogin() {
        // Test implementation
    }
}
```

### Allure Annotation Reference

```java
// Organizational Annotations
@Epic("Epic Name")          // Highest level grouping
@Feature("Feature Name")    // Feature grouping
@Story("Story Name")        // User story level

// Metadata Annotations
@Description("Test description")
@Severity(SeverityLevel.BLOCKER)  // BLOCKER, CRITICAL, NORMAL, MINOR, TRIVIAL
@Owner("Owner Name")
@Lead("Team Lead Name")

// Linking Annotations
@Link(name = "Website", url = "https://example.com")
@Issue("BUG-123")          // Link to bug tracker
@TmsLink("TC-456")         // Link to test management system

// Test Lifecycle Annotations
@Step("Step description")   // Mark methods as steps
@Attachment("Screenshot")   // Add attachments
```

---

## 9. Adding Attachments to Allure

### Screenshot Attachment

```java
package utils;

import io.qameta.allure.Attachment;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

public class AllureScreenshotUtils {

    @Attachment(value = "Screenshot", type = "image/png")
    public static byte[] saveScreenshot(WebDriver driver) {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }

    @Attachment(value = "{name}", type = "image/png")
    public static byte[] saveScreenshotWithName(WebDriver driver, String name) {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }
}
```

### Text Attachment

```java
import io.qameta.allure.Attachment;

public class AllureAttachmentUtils {

    @Attachment(value = "Test Log", type = "text/plain")
    public static String attachText(String text) {
        return text;
    }

    @Attachment(value = "HTML Content", type = "text/html")
    public static String attachHtml(String html) {
        return html;
    }

    @Attachment(value = "JSON Data", type = "application/json")
    public static String attachJson(String json) {
        return json;
    }
}
```

### Using Attachments in Tests

```java
package tests;

import io.qameta.allure.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import utils.AllureScreenshotUtils;
import utils.AllureAttachmentUtils;

@Epic("Reporting Framework")
@Feature("Allure Attachments")
public class AllureAttachmentTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    @Story("Screenshot Attachment")
    @Description("Test demonstrating screenshot attachment")
    @Severity(SeverityLevel.NORMAL)
    public void testWithScreenshot() {
        driver.get("https://example.com");

        // Attach screenshot
        AllureScreenshotUtils.saveScreenshot(driver);

        // Attach screenshot with custom name
        AllureScreenshotUtils.saveScreenshotWithName(driver, "Homepage Screenshot");
    }

    @Test
    @Story("Text Attachment")
    @Description("Test demonstrating text attachment")
    public void testWithTextAttachment() {
        String testData = "Username: testuser\nPassword: password123";
        AllureAttachmentUtils.attachText(testData);

        String htmlContent = "<h1>Test Results</h1><p>Test passed successfully</p>";
        AllureAttachmentUtils.attachHtml(htmlContent);
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

---

## 10. Allure Test Categorization

### Using Steps

```java
package tests;

import io.qameta.allure.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

@Epic("E-Commerce Application")
@Feature("User Authentication")
public class AllureStepsTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    @Story("User Login")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verify successful login with valid credentials")
    public void testLoginWithSteps() {
        openLoginPage();
        enterUsername("testuser");
        enterPassword("password123");
        clickLoginButton();
        verifyDashboardDisplayed();
    }

    @Step("Open login page")
    public void openLoginPage() {
        driver.get("https://example.com/login");
    }

    @Step("Enter username: {username}")
    public void enterUsername(String username) {
        driver.findElement(By.id("username")).sendKeys(username);
    }

    @Step("Enter password")
    public void enterPassword(String password) {
        driver.findElement(By.id("password")).sendKeys(password);
    }

    @Step("Click login button")
    public void clickLoginButton() {
        driver.findElement(By.id("loginBtn")).click();
    }

    @Step("Verify dashboard is displayed")
    public void verifyDashboardDisplayed() {
        boolean isDisplayed = driver.findElement(By.id("dashboard")).isDisplayed();
        Assert.assertTrue(isDisplayed, "Dashboard should be displayed");
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

### Organizing Tests with Epics, Features, and Stories

```java
@Epic("E-Commerce Platform")
@Feature("Shopping Cart")
public class ShoppingCartTests {

    @Test
    @Story("Add to Cart")
    @Severity(SeverityLevel.CRITICAL)
    public void testAddItemToCart() {
        // Test implementation
    }

    @Test
    @Story("Remove from Cart")
    @Severity(SeverityLevel.NORMAL)
    public void testRemoveItemFromCart() {
        // Test implementation
    }

    @Test
    @Story("Update Quantity")
    @Severity(SeverityLevel.NORMAL)
    public void testUpdateCartQuantity() {
        // Test implementation
    }
}

@Epic("E-Commerce Platform")
@Feature("Checkout Process")
public class CheckoutTests {

    @Test
    @Story("Guest Checkout")
    @Severity(SeverityLevel.CRITICAL)
    public void testGuestCheckout() {
        // Test implementation
    }

    @Test
    @Story("Registered User Checkout")
    @Severity(SeverityLevel.CRITICAL)
    public void testRegisteredUserCheckout() {
        // Test implementation
    }
}
```

### Generating and Viewing Allure Reports

```bash
# Run tests and generate Allure results
mvn clean test

# Generate and open Allure report
mvn allure:serve

# Generate Allure report without opening
mvn allure:report

# Report will be generated in: target/site/allure-maven-plugin
```

---

## 11. Comparing Extent vs Allure

### Feature Comparison

```java
// EXTENT REPORTS - Real-time HTML generation
public class ExtentReportExample {
    ExtentReports extent = new ExtentReports();
    ExtentSparkReporter spark = new ExtentSparkReporter("report.html");

    @Test
    public void test() {
        ExtentTest test = extent.createTest("Test Name");
        test.log(Status.INFO, "Step 1");
        test.log(Status.PASS, "Step passed");
        extent.flush(); // Report generated immediately
    }
}

// ALLURE REPORTS - Build-time generation
public class AllureReportExample {

    @Test
    @Description("Test Description")
    @Severity(SeverityLevel.CRITICAL)
    public void test() {
        // Test execution
        // Results saved to allure-results/
        // Report generated with: allure serve or allure generate
    }
}
```

### When to Use Each

**Use Extent Reports when:**
- Need real-time report generation
- Want customizable HTML reports
- Need simple setup with minimal configuration
- Working with small to medium projects
- Need to generate reports without additional tools

**Use Allure Reports when:**
- Need comprehensive historical trends
- Want advanced test categorization (Epic/Feature/Story)
- Have CI/CD pipeline integration
- Need detailed test execution timeline
- Want standardized reporting across teams
- Working with large enterprise projects

---

## 12. Custom HTML Reports

### Simple Custom HTML Report Generator

```java
package reports;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CustomHTMLReporter {

    private List<TestResult> testResults = new ArrayList<>();
    private String reportPath;

    public CustomHTMLReporter(String reportPath) {
        this.reportPath = reportPath;
    }

    public void addTestResult(String testName, String status, String duration, String errorMessage) {
        testResults.add(new TestResult(testName, status, duration, errorMessage));
    }

    public void generateReport() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(reportPath))) {
            writer.write(generateHTML());
            System.out.println("Custom report generated: " + reportPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String generateHTML() {
        StringBuilder html = new StringBuilder();

        // HTML Header
        html.append("<!DOCTYPE html>\n");
        html.append("<html lang='en'>\n");
        html.append("<head>\n");
        html.append("    <meta charset='UTF-8'>\n");
        html.append("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
        html.append("    <title>Test Execution Report</title>\n");
        html.append("    <style>\n");
        html.append(getCSS());
        html.append("    </style>\n");
        html.append("</head>\n");
        html.append("<body>\n");

        // Report Header
        html.append("    <div class='header'>\n");
        html.append("        <h1>Test Execution Report</h1>\n");
        html.append("        <p>Generated on: " + getCurrentTimestamp() + "</p>\n");
        html.append("    </div>\n");

        // Summary Section
        html.append("    <div class='summary'>\n");
        html.append("        <h2>Test Summary</h2>\n");
        html.append("        <div class='summary-cards'>\n");
        html.append("            <div class='card total'>Total: " + testResults.size() + "</div>\n");
        html.append("            <div class='card passed'>Passed: " + getPassedCount() + "</div>\n");
        html.append("            <div class='card failed'>Failed: " + getFailedCount() + "</div>\n");
        html.append("            <div class='card skipped'>Skipped: " + getSkippedCount() + "</div>\n");
        html.append("        </div>\n");
        html.append("    </div>\n");

        // Test Results Table
        html.append("    <div class='results'>\n");
        html.append("        <h2>Test Results</h2>\n");
        html.append("        <table>\n");
        html.append("            <thead>\n");
        html.append("                <tr>\n");
        html.append("                    <th>#</th>\n");
        html.append("                    <th>Test Name</th>\n");
        html.append("                    <th>Status</th>\n");
        html.append("                    <th>Duration</th>\n");
        html.append("                    <th>Error Message</th>\n");
        html.append("                </tr>\n");
        html.append("            </thead>\n");
        html.append("            <tbody>\n");

        int index = 1;
        for (TestResult result : testResults) {
            html.append("                <tr>\n");
            html.append("                    <td>" + index++ + "</td>\n");
            html.append("                    <td>" + result.testName + "</td>\n");
            html.append("                    <td class='status-" + result.status.toLowerCase() + "'>" + result.status + "</td>\n");
            html.append("                    <td>" + result.duration + "</td>\n");
            html.append("                    <td>" + (result.errorMessage != null ? result.errorMessage : "-") + "</td>\n");
            html.append("                </tr>\n");
        }

        html.append("            </tbody>\n");
        html.append("        </table>\n");
        html.append("    </div>\n");

        // Footer
        html.append("    <div class='footer'>\n");
        html.append("        <p>Selenium Test Automation Framework</p>\n");
        html.append("    </div>\n");

        html.append("</body>\n");
        html.append("</html>");

        return html.toString();
    }

    private String getCSS() {
        return """
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f5f5;
                padding: 20px;
            }

            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px;
                margin-bottom: 20px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }

            .header h1 {
                margin-bottom: 10px;
            }

            .summary {
                background: white;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }

            .summary-cards {
                display: flex;
                gap: 20px;
                margin-top: 20px;
            }

            .card {
                flex: 1;
                padding: 20px;
                border-radius: 8px;
                color: white;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
            }

            .card.total { background: #3498db; }
            .card.passed { background: #2ecc71; }
            .card.failed { background: #e74c3c; }
            .card.skipped { background: #f39c12; }

            .results {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }

            th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }

            th {
                background-color: #667eea;
                color: white;
                font-weight: bold;
            }

            tr:hover {
                background-color: #f5f5f5;
            }

            .status-passed {
                color: #2ecc71;
                font-weight: bold;
            }

            .status-failed {
                color: #e74c3c;
                font-weight: bold;
            }

            .status-skipped {
                color: #f39c12;
                font-weight: bold;
            }

            .footer {
                text-align: center;
                padding: 20px;
                color: #666;
            }
            """;
    }

    private String getCurrentTimestamp() {
        return new SimpleDateFormat("MMM dd, yyyy HH:mm:ss").format(new Date());
    }

    private int getPassedCount() {
        return (int) testResults.stream().filter(r -> r.status.equals("PASSED")).count();
    }

    private int getFailedCount() {
        return (int) testResults.stream().filter(r -> r.status.equals("FAILED")).count();
    }

    private int getSkippedCount() {
        return (int) testResults.stream().filter(r -> r.status.equals("SKIPPED")).count();
    }

    // Inner class for test results
    private static class TestResult {
        String testName;
        String status;
        String duration;
        String errorMessage;

        public TestResult(String testName, String status, String duration, String errorMessage) {
            this.testName = testName;
            this.status = status;
            this.duration = duration;
            this.errorMessage = errorMessage;
        }
    }
}
```

### Using Custom Report Generator

```java
package tests;

import org.testng.ITestResult;
import org.testng.annotations.*;
import reports.CustomHTMLReporter;

public class CustomReportTest {

    private static CustomHTMLReporter reporter;
    private long startTime;

    @BeforeSuite
    public void setupSuite() {
        reporter = new CustomHTMLReporter("test-output/CustomReport.html");
    }

    @BeforeMethod
    public void startTimer() {
        startTime = System.currentTimeMillis();
    }

    @AfterMethod
    public void logResult(ITestResult result) {
        long duration = System.currentTimeMillis() - startTime;
        String durationStr = duration + "ms";

        String status = switch (result.getStatus()) {
            case ITestResult.SUCCESS -> "PASSED";
            case ITestResult.FAILURE -> "FAILED";
            case ITestResult.SKIP -> "SKIPPED";
            default -> "UNKNOWN";
        };

        String errorMessage = result.getThrowable() != null ?
            result.getThrowable().getMessage() : null;

        reporter.addTestResult(result.getName(), status, durationStr, errorMessage);
    }

    @AfterSuite
    public void generateReport() {
        reporter.generateReport();
    }

    @Test
    public void testOne() {
        System.out.println("Test One executed");
    }

    @Test
    public void testTwo() {
        System.out.println("Test Two executed");
    }
}
```

---

## 13. Email Reports

### Email Utility Class

```java
package utils;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.File;
import java.util.Properties;

public class EmailUtils {

    private String host;
    private String port;
    private String username;
    private String password;
    private boolean tlsEnabled;

    public EmailUtils(String host, String port, String username, String password, boolean tlsEnabled) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.tlsEnabled = tlsEnabled;
    }

    public void sendEmailWithAttachment(String to, String subject, String body, String attachmentPath) {
        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.auth", "true");

        if (tlsEnabled) {
            props.put("mail.smtp.starttls.enable", "true");
        }

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject);

            // Create multipart message
            Multipart multipart = new MimeMultipart();

            // Text body part
            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(body, "text/html");
            multipart.addBodyPart(messageBodyPart);

            // Attachment part
            if (attachmentPath != null && !attachmentPath.isEmpty()) {
                MimeBodyPart attachmentBodyPart = new MimeBodyPart();
                attachmentBodyPart.attachFile(new File(attachmentPath));
                multipart.addBodyPart(attachmentBodyPart);
            }

            message.setContent(multipart);

            Transport.send(message);
            System.out.println("Email sent successfully to: " + to);

        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public String generateEmailBody(int total, int passed, int failed, int skipped, double passPercentage) {
        return """
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .header { background: #667eea; color: white; padding: 20px; }
                    .summary { padding: 20px; }
                    .stat { display: inline-block; margin: 10px; padding: 15px; border-radius: 5px; }
                    .total { background: #3498db; color: white; }
                    .passed { background: #2ecc71; color: white; }
                    .failed { background: #e74c3c; color: white; }
                    .skipped { background: #f39c12; color: white; }
                </style>
            </head>
            <body>
                <div class='header'>
                    <h2>Test Execution Report</h2>
                </div>
                <div class='summary'>
                    <h3>Test Summary</h3>
                    <div class='stat total'><strong>Total:</strong> %d</div>
                    <div class='stat passed'><strong>Passed:</strong> %d</div>
                    <div class='stat failed'><strong>Failed:</strong> %d</div>
                    <div class='stat skipped'><strong>Skipped:</strong> %d</div>
                    <p><strong>Pass Percentage:</strong> %.2f%%</p>
                    <p>Please find the detailed report attached.</p>
                </div>
            </body>
            </html>
            """.formatted(total, passed, failed, skipped, passPercentage);
    }
}
```

### TestNG Listener for Email Reports

```java
package listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import utils.EmailUtils;

public class EmailReportListener implements ITestListener {

    private int totalTests = 0;
    private int passedTests = 0;
    private int failedTests = 0;
    private int skippedTests = 0;

    @Override
    public void onTestSuccess(ITestResult result) {
        passedTests++;
        totalTests++;
    }

    @Override
    public void onTestFailure(ITestResult result) {
        failedTests++;
        totalTests++;
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        skippedTests++;
        totalTests++;
    }

    @Override
    public void onFinish(ITestContext context) {
        double passPercentage = (passedTests * 100.0) / totalTests;

        EmailUtils emailUtils = new EmailUtils(
            "smtp.gmail.com",
            "587",
            "your-email@gmail.com",
            "your-app-password",
            true
        );

        String emailBody = emailUtils.generateEmailBody(
            totalTests, passedTests, failedTests, skippedTests, passPercentage
        );

        emailUtils.sendEmailWithAttachment(
            "recipient@example.com",
            "Test Execution Report - " + context.getName(),
            emailBody,
            "test-output/ExtentReport.html"
        );
    }
}
```

### Configuring Email Listener in testng.xml

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Test Suite">
    <listeners>
        <listener class-name="listeners.EmailReportListener"/>
    </listeners>

    <test name="Login Tests">
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
</suite>
```

---

## 14. Complete Reporting Framework

### Unified Report Manager

```java
package reports;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import io.qameta.allure.Attachment;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

public class UnifiedReportManager {

    private static ExtentReports extentReports;
    private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();
    private static boolean useExtent = true;
    private static boolean useAllure = true;

    // Initialize reporting
    public static void initReports(String reportPath, boolean extent, boolean allure) {
        useExtent = extent;
        useAllure = allure;

        if (useExtent) {
            ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);
            extentReports = new ExtentReports();
            extentReports.attachReporter(sparkReporter);
        }
    }

    // Start test
    public static void startTest(String testName, String description) {
        if (useExtent) {
            ExtentTest test = extentReports.createTest(testName, description);
            extentTest.set(test);
        }
    }

    // Log info
    public static void logInfo(String message) {
        if (useExtent && extentTest.get() != null) {
            extentTest.get().info(message);
        }
        if (useAllure) {
            attachAllureLog(message);
        }
    }

    // Log pass
    public static void logPass(String message) {
        if (useExtent && extentTest.get() != null) {
            extentTest.get().pass(message);
        }
    }

    // Log fail
    public static void logFail(String message) {
        if (useExtent && extentTest.get() != null) {
            extentTest.get().fail(message);
        }
    }

    // Attach screenshot
    public static void attachScreenshot(WebDriver driver, String name) {
        if (useExtent || useAllure) {
            byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);

            if (useAllure) {
                attachAllureScreenshot(screenshot);
            }
        }
    }

    // Flush reports
    public static void flushReports() {
        if (useExtent && extentReports != null) {
            extentReports.flush();
        }
    }

    @Attachment(value = "Log", type = "text/plain")
    private static String attachAllureLog(String message) {
        return message;
    }

    @Attachment(value = "Screenshot", type = "image/png")
    private static byte[] attachAllureScreenshot(byte[] screenshot) {
        return screenshot;
    }
}
```

### Complete Framework BaseTest

```java
package tests;

import com.aventstack.extentreports.ExtentReports;
import io.qameta.allure.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;
import reports.UnifiedReportManager;

public class CompleteBaseTest {

    protected WebDriver driver;

    @BeforeSuite
    public void setupSuite() {
        // Initialize both Extent and Allure
        UnifiedReportManager.initReports(
            "test-output/UnifiedReport.html",
            true,  // Use Extent
            true   // Use Allure
        );
    }

    @BeforeMethod
    public void setup(ITestResult result) {
        // Initialize browser
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Start test reporting
        String testName = result.getMethod().getMethodName();
        String description = result.getMethod().getDescription();
        UnifiedReportManager.startTest(testName, description);
        UnifiedReportManager.logInfo("Test started: " + testName);
    }

    @AfterMethod
    public void teardown(ITestResult result) {
        // Handle test result
        if (result.getStatus() == ITestResult.FAILURE) {
            UnifiedReportManager.logFail("Test failed: " + result.getName());
            UnifiedReportManager.attachScreenshot(driver, "Failure Screenshot");
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            UnifiedReportManager.logPass("Test passed: " + result.getName());
        }

        // Close browser
        if (driver != null) {
            driver.quit();
        }
    }

    @AfterSuite
    public void teardownSuite() {
        UnifiedReportManager.flushReports();
    }
}
```

---

## 15. Best Practices

### 1. Consistent Reporting Structure

```java
// GOOD - Structured logging
@Test
public void testWithStructure() {
    test.info("=== TEST SETUP ===");
    test.info("Initializing test data");

    test.info("=== TEST EXECUTION ===");
    test.info("Step 1: Navigate to page");
    test.info("Step 2: Perform action");

    test.info("=== TEST VERIFICATION ===");
    test.info("Verifying results");
}

// BAD - Unstructured logging
@Test
public void testWithoutStructure() {
    test.info("doing something");
    test.info("clicking button");
    test.info("checking stuff");
}
```

### 2. Meaningful Test Names and Descriptions

```java
// GOOD
@Test(description = "Verify user can login with valid email and password")
public void testValidUserLoginWithEmailPassword() { }

// BAD
@Test
public void test1() { }
```

### 3. Always Capture Screenshots on Failure

```java
@AfterMethod
public void captureFailureScreenshot(ITestResult result) {
    if (result.getStatus() == ITestResult.FAILURE) {
        String screenshotPath = captureScreenshot(driver, result.getName());
        test.fail("Test failed - Screenshot attached",
            MediaEntityBuilder.createScreenCaptureFromPath(screenshotPath).build());
    }
}
```

### 4. Add System Information

```java
extent.setSystemInfo("Application", "E-Commerce");
extent.setSystemInfo("Environment", "QA");
extent.setSystemInfo("Browser", "Chrome 120");
extent.setSystemInfo("OS", System.getProperty("os.name"));
extent.setSystemInfo("Test Engineer", "John Doe");
```

### 5. Use Categories and Tags

```java
// Extent Reports
test.assignCategory("Smoke Test", "Login");
test.assignAuthor("John Doe");

// Allure Reports
@Epic("Authentication")
@Feature("User Login")
@Story("Valid Login")
@Severity(SeverityLevel.CRITICAL)
```

### 6. Implement Thread Safety

```java
// Thread-safe ExtentTest
private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

public static synchronized ExtentTest getTest() {
    return extentTest.get();
}
```

### 7. Keep Report Files Organized

```
test-output/
├── extent-reports/
│   ├── ExtentReport_20240113_143022.html
│   └── screenshots/
│       ├── testLogin_20240113_143025.png
│       └── testCheckout_20240113_143030.png
├── allure-results/
│   └── [JSON result files]
└── custom-reports/
    └── CustomReport.html
```

### 8. Regular Report Cleanup

```java
@BeforeSuite
public void cleanupOldReports() {
    File reportDir = new File("test-output/extent-reports");
    if (reportDir.exists()) {
        // Delete reports older than 7 days
        long cutoffTime = System.currentTimeMillis() - (7 * 24 * 60 * 60 * 1000);
        for (File file : reportDir.listFiles()) {
            if (file.lastModified() < cutoffTime) {
                file.delete();
            }
        }
    }
}
```

### 9. Add Execution Time Tracking

```java
private long startTime;

@BeforeMethod
public void recordStartTime() {
    startTime = System.currentTimeMillis();
}

@AfterMethod
public void logExecutionTime() {
    long duration = System.currentTimeMillis() - startTime;
    test.info("Test execution time: " + duration + "ms");
}
```

### 10. Include Environment Details

```java
@BeforeSuite
public void logEnvironmentDetails() {
    test.info("Environment: " + System.getenv("TEST_ENV"));
    test.info("Build Number: " + System.getenv("BUILD_NUMBER"));
    test.info("Browser: " + System.getProperty("browser"));
    test.info("Test Data: " + System.getProperty("testData"));
}
```

---

## 16. Key Takeaways

1. **Test reporting** provides visibility into test execution and results
2. **Extent Reports** offers real-time, customizable HTML reports
3. **Allure Reports** provides comprehensive, enterprise-grade reporting
4. **Screenshots** should be captured on failures for debugging
5. **Structured logging** makes reports more readable and maintainable
6. **Custom reports** can be created for specific requirements
7. **Email reports** enable automatic notification of test results
8. **Categorization** helps organize and filter test results
9. **Best practices** ensure consistent, professional reporting
10. **Multiple reporting tools** can be integrated in a unified framework

---

## 17. Common Interview Questions

1. **What is the purpose of test reporting in automation?**
   - Provides visibility into test execution
   - Documents test results for stakeholders
   - Helps in analysis and decision making
   - Maintains evidence of testing activities

2. **What is Extent Reports?**
   - HTML reporting library for test automation
   - Provides interactive reports with charts and graphs
   - Supports screenshot and log integration
   - Offers real-time report generation

3. **How do you integrate Extent Reports with TestNG?**
   - Add Extent Reports dependency
   - Create ExtentReports and ExtentSparkReporter instances
   - Use @BeforeMethod and @AfterMethod for test lifecycle
   - Log test steps and results
   - Flush reports in @AfterSuite

4. **What is Allure Reports?**
   - Open-source reporting framework
   - Provides modern, feature-rich test reports
   - Supports multiple testing frameworks
   - Offers trend analysis and categorization

5. **What are Allure annotations?**
   - @Epic, @Feature, @Story - Test organization
   - @Severity - Priority level
   - @Description - Test description
   - @Step - Method-level steps
   - @Attachment - Add attachments

6. **How do you add screenshots to reports?**
   - Capture using TakesScreenshot interface
   - Save to file or convert to Base64
   - Attach to report using API methods
   - Typically done in @AfterMethod on failure

7. **What is the difference between Extent and Allure?**
   - Extent: Real-time, simpler setup, customizable
   - Allure: Build-time, advanced features, standardized
   - Extent: Better for small-medium projects
   - Allure: Better for enterprise and CI/CD

8. **How do you send email reports?**
   - Use JavaMail API
   - Configure SMTP settings
   - Create email body with test summary
   - Attach report file
   - Send using TestNG listener

9. **What should be included in a good test report?**
   - Test summary (pass/fail counts)
   - Detailed test results
   - Screenshots on failures
   - Execution logs
   - Environment information
   - Trends and metrics

10. **How do you handle parallel execution in reporting?**
    - Use ThreadLocal for thread safety
    - Ensure unique test names
    - Synchronize report writes
    - Use thread-safe collections

---

---

## Hands-On Exercises

### Exercise 1: Setting Up Extent Reports with TestNG (45 minutes)

**Objective**: Configure Extent Reports 5 from scratch and create basic test reports with system information.

**Scenario**: You're building a test automation framework for an e-commerce website. Set up Extent Reports to generate beautiful HTML reports with test execution details.

**Tasks**:
1. Add Extent Reports Maven dependency (version 5.1.1)
2. Create ExtentManager class to initialize Extent Reports
3. Create ExtentTestManager class for thread-safe test management
4. Implement BaseTest with Extent Reports integration
5. Add system information (OS, Browser, Environment, User)
6. Configure report theme (DARK or STANDARD)
7. Create sample tests and verify report generation

**Code Template**:

```java
// TODO 1: Complete ExtentManager class
package reports;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

public class ExtentManager {

    private static ExtentReports extent;

    public static ExtentReports createInstance(String fileName) {
        // TODO: Create ExtentSparkReporter with fileName
        // TODO: Configure theme, document title, and report name
        // TODO: Set timestamp format
        // TODO: Create ExtentReports instance
        // TODO: Attach SparkReporter
        // TODO: Add system information (OS, User, Java Version, Environment, Browser)

        return extent;
    }

    public static ExtentReports getInstance() {
        return extent;
    }
}

// TODO 2: Complete BaseTest with Extent Reports
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;

public class BaseTest {

    protected WebDriver driver;
    protected static ExtentReports extent;
    protected ExtentTest test;

    @BeforeSuite
    public void setupSuite() {
        // TODO: Initialize Extent Reports
    }

    @BeforeMethod
    public void setup(ITestResult result) {
        // TODO: Initialize browser
        // TODO: Start Extent Test with test name and description
        // TODO: Log test start
    }

    @AfterMethod
    public void teardown(ITestResult result) {
        // TODO: Log test result based on status (PASS/FAIL/SKIP)
        // TODO: Close browser
    }

    @AfterSuite
    public void teardownSuite() {
        // TODO: Flush Extent Reports
    }
}

// TODO 3: Create sample test
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;

public class ExtentReportDemoTest extends BaseTest {

    @Test(description = "Verify Extent Reports setup")
    public void testExtentReportsSetup() {
        // TODO: Log test steps
        // TODO: Navigate to a website
        // TODO: Verify page title
        // TODO: Log pass/fail status
    }
}
```

**Expected Output**:
```
✓ ExtentReport.html generated in test-output/
✓ Report contains test execution details
✓ System information displayed correctly
✓ Test logs with timestamps visible
✓ Pass/Fail status color-coded (green/red)
```

**Common Mistakes to Avoid**:
1. Forgetting to call `extent.flush()` - reports won't be generated
2. Not creating ExtentTest before logging - causes NullPointerException
3. Using wrong file path for report - file not found errors
4. Forgetting to add Maven dependency
5. Not maximizing browser - screenshots may look incomplete

<details>
<summary><b>Solution Hints</b></summary>

1. **ExtentManager setup**:
```java
ExtentSparkReporter sparkReporter = new ExtentSparkReporter(fileName);
sparkReporter.config().setTheme(Theme.DARK);
sparkReporter.config().setDocumentTitle("Test Report");
extent = new ExtentReports();
extent.attachReporter(sparkReporter);
extent.setSystemInfo("OS", System.getProperty("os.name"));
```

2. **BaseTest setup**:
```java
@BeforeSuite
public void setupSuite() {
    extent = ExtentManager.createInstance("test-output/ExtentReport.html");
}

@BeforeMethod
public void setup(ITestResult result) {
    driver = new ChromeDriver();
    String testName = result.getMethod().getMethodName();
    test = extent.createTest(testName);
    test.log(Status.INFO, "Test started: " + testName);
}
```

3. **Logging in tests**:
```java
test.log(Status.INFO, "Navigating to homepage");
driver.get("https://example.com");
test.log(Status.PASS, "Navigation successful");
```
</details>

---

### Exercise 2: Adding Screenshots to Extent Reports (40 minutes)

**Objective**: Implement screenshot capture functionality and attach screenshots to Extent Reports on test failures.

**Scenario**: Your team wants to see screenshots whenever a test fails to quickly identify the issue. Implement screenshot capture using both file path and Base64 encoding methods.

**Tasks**:
1. Create ScreenshotUtils class with multiple capture methods
2. Modify BaseTest to capture screenshots on failure
3. Attach screenshots to Extent Reports using file path
4. Attach screenshots using Base64 encoding
5. Create organized screenshot directory structure
6. Add timestamps to screenshot filenames
7. Test with intentional failures to verify screenshots

**Code Template**:

```java
// TODO 1: Complete ScreenshotUtils class
package utils;

import org.openqa.selenium.*;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotUtils {

    // TODO: Implement captureScreenshot() method
    public static String captureScreenshot(WebDriver driver, String screenshotName) {
        // TODO: Create timestamp
        // TODO: Define screenshot path with timestamp
        // TODO: Create screenshots directory if not exists
        // TODO: Take screenshot using TakesScreenshot
        // TODO: Copy file to destination
        // TODO: Return screenshot path

        return null;
    }

    // TODO: Implement getScreenshotBase64() method
    public static String getScreenshotBase64(WebDriver driver) {
        // TODO: Take screenshot as Base64
        // TODO: Return Base64 string

        return null;
    }
}

// TODO 2: Update BaseTest with screenshot on failure
@Override
@AfterMethod
public void teardown(ITestResult result) {
    String screenshotPath = null;

    if (result.getStatus() == ITestResult.FAILURE) {
        // TODO: Capture screenshot
        // TODO: Log failure with reason
        // TODO: Attach screenshot to report using MediaEntityBuilder
    } else if (result.getStatus() == ITestResult.SUCCESS) {
        // TODO: Log success
    }

    // TODO: Close browser
}

// TODO 3: Create helper method to add screenshots during test execution
public void addScreenshotToReport(String message) {
    // TODO: Get Base64 screenshot
    // TODO: Attach to report with message
}

// TODO 4: Create test with intentional failure
@Test(description = "Test to verify screenshot on failure")
public void testScreenshotOnFailure() {
    // TODO: Navigate to website
    // TODO: Cause intentional assertion failure
    // TODO: Verify screenshot is captured
}
```

**Expected Output**:
```
✓ Screenshot captured on test failure
✓ Screenshot visible in Extent Report
✓ Screenshot filename includes timestamp
✓ Screenshots directory created automatically
✓ Base64 screenshots embedded in HTML report
✓ File path screenshots saved separately
```

**Common Mistakes to Avoid**:
1. Forgetting to create screenshots directory - IOException
2. Not handling screenshot capture exceptions
3. Using absolute paths instead of relative paths
4. Taking screenshot after browser is closed
5. Not adding Apache Commons IO dependency

<details>
<summary><b>Solution Hints</b></summary>

1. **Screenshot capture**:
```java
String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
String fileName = screenshotName + "_" + timestamp + ".png";
TakesScreenshot ts = (TakesScreenshot) driver;
File source = ts.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(source, new File(destination));
```

2. **Attach to report**:
```java
test.fail("Screenshot on failure",
    MediaEntityBuilder.createScreenCaptureFromPath(screenshotPath).build());
```

3. **Base64 screenshot**:
```java
String base64 = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);
test.info(message,
    MediaEntityBuilder.createScreenCaptureFromBase64String(base64).build());
```
</details>

---

### Exercise 3: Implementing Categories, Authors, and Nodes (35 minutes)

**Objective**: Organize test reports using categories, authors, devices, and hierarchical test nodes for better test organization.

**Scenario**: Your automation framework has multiple test types (Smoke, Regression, Sanity) executed by different team members on various browsers. Organize reports with proper categorization.

**Tasks**:
1. Add categories to tests (Smoke, Regression, Sanity)
2. Assign authors/owners to tests
3. Assign device/browser information
4. Create parent-child test structure using nodes
5. Create tests with multiple scenarios as child nodes
6. Filter tests by categories in report
7. Verify categorization in generated report

**Code Template**:

```java
// TODO 1: Create test with categories and metadata
package tests;

import com.aventstack.extentreports.ExtentTest;
import org.testng.annotations.Test;

public class CategorizedTests extends BaseTest {

    @Test(description = "Login test with valid credentials")
    public void testValidLogin() {
        // TODO: Assign categories: "Smoke Test", "Login Tests", "Priority 1"
        // TODO: Assign author: Your name
        // TODO: Assign device: "Chrome Browser", "Windows 11"

        // TODO: Log test steps
        test.info("Step 1: Navigate to login page");
        test.info("Step 2: Enter credentials");
        test.info("Step 3: Click login");
        test.pass("Login successful");
    }

    @Test(description = "Comprehensive checkout flow test")
    public void testCheckoutFlowWithNodes() {
        // TODO: Assign categories and metadata

        // TODO: Create child node for "Add to Cart"
        ExtentTest addToCartNode = test.createNode("Add Product to Cart");
        // TODO: Log steps in this node

        // TODO: Create child node for "Proceed to Checkout"
        ExtentTest checkoutNode = test.createNode("Proceed to Checkout");
        // TODO: Log steps in this node

        // TODO: Create child node for "Payment"
        ExtentTest paymentNode = test.createNode("Complete Payment");
        // TODO: Log steps in this node
    }

    @Test(description = "Search functionality test")
    public void testSearchFunctionality() {
        // TODO: Assign categories: "Regression", "Search"
        // TODO: Assign author and device
        // TODO: Implement test logic with proper logging
    }
}

// TODO 2: Create test suite with multiple test categories
public class TestSuiteWithCategories extends BaseTest {

    @Test(description = "Homepage load test")
    public void testHomepageLoad() {
        // Category: "Smoke Test"
        // TODO: Implement test
    }

    @Test(description = "User registration flow")
    public void testUserRegistration() {
        // Category: "Regression", "User Management"
        // TODO: Implement test
    }

    @Test(description = "Database connectivity check")
    public void testDatabaseConnection() {
        // Category: "Sanity", "Database"
        // TODO: Implement test
    }
}
```

**Expected Output**:
```
✓ Tests grouped by categories in report
✓ Author names visible for each test
✓ Device/browser information displayed
✓ Hierarchical test structure with parent-child nodes
✓ Category filter working in report dashboard
✓ Test counts per category displayed correctly
```

**Common Mistakes to Avoid**:
1. Calling `assignCategory()` after test execution starts
2. Using inconsistent category naming
3. Not creating child nodes properly
4. Forgetting to log in child nodes
5. Mixing node creation with regular logging

<details>
<summary><b>Solution Hints</b></summary>

1. **Assign categories and metadata**:
```java
test.assignCategory("Smoke Test");
test.assignCategory("Login Tests");
test.assignAuthor("John Doe");
test.assignDevice("Chrome Browser");
```

2. **Create child nodes**:
```java
ExtentTest childNode = test.createNode("Node Name");
childNode.info("Step in child node");
childNode.pass("Child node passed");
```

3. **Multiple categories**:
```java
test.assignCategory("Regression", "Search", "Priority 2");
```
</details>

---

### Exercise 4: Setting Up Allure Reports with TestNG (50 minutes)

**Objective**: Configure Allure Reports framework from scratch with TestNG integration, including Maven configuration and report generation.

**Scenario**: Your organization wants to standardize on Allure Reports for all automation projects. Set up Allure with proper Maven configuration, AspectJ weaver, and generate comprehensive reports.

**Tasks**:
1. Add Allure TestNG dependencies to pom.xml
2. Configure Maven Surefire plugin with AspectJ
3. Add Allure Maven plugin
4. Create tests with Allure annotations (@Epic, @Feature, @Story)
5. Add @Description, @Severity, and @Owner annotations
6. Generate Allure report using Maven command
7. View report using `allure serve` command

**Code Template**:

```xml
<!-- TODO 1: Add dependencies to pom.xml -->
<dependencies>
    <!-- Selenium -->
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>

    <!-- TestNG -->
    <!-- TODO: Add TestNG dependency -->

    <!-- Allure TestNG -->
    <!-- TODO: Add allure-testng dependency (version 2.24.0) -->

    <!-- AspectJ Weaver -->
    <!-- TODO: Add aspectjweaver dependency (version 1.9.20.1) -->
</dependencies>

<!-- TODO 2: Configure build plugins -->
<build>
    <plugins>
        <!-- Maven Surefire Plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0</version>
            <configuration>
                <!-- TODO: Add argLine with AspectJ weaver path -->
            </configuration>
        </plugin>

        <!-- Allure Maven Plugin -->
        <!-- TODO: Add allure-maven plugin (version 2.12.0) -->
    </plugins>
</build>
```

```java
// TODO 3: Create tests with Allure annotations
package tests;

import io.qameta.allure.*;
import org.testng.Assert;
import org.testng.annotations.Test;

// TODO: Add @Epic annotation
// TODO: Add @Feature annotation
public class AllureAnnotationTests {

    @Test
    // TODO: Add @Story annotation
    // TODO: Add @Severity annotation (CRITICAL)
    // TODO: Add @Description annotation
    // TODO: Add @Owner annotation with your name
    public void testLoginWithValidCredentials() {
        // TODO: Implement test with proper structure
        System.out.println("Test implementation");
        Assert.assertTrue(true);
    }

    @Test
    // TODO: Add Allure annotations for checkout test
    // TODO: Set severity to NORMAL
    public void testCheckoutProcess() {
        // TODO: Implement test
    }
}

// TODO 4: Run Maven command to generate Allure report
// Command: mvn clean test
// Command: mvn allure:serve
```

**Expected Output**:
```
✓ Allure results generated in target/allure-results/
✓ Tests organized by Epic > Feature > Story
✓ Severity levels displayed correctly
✓ Owner information visible in report
✓ Test descriptions showing properly
✓ Allure report opens in browser with `mvn allure:serve`
```

**Common Mistakes to Avoid**:
1. Forgetting AspectJ weaver in argLine - annotations won't work
2. Wrong path to aspectjweaver JAR in configuration
3. Not running `mvn clean test` before `allure:serve`
4. Using wrong Allure version - compatibility issues
5. Forgetting @Epic, @Feature, or @Story annotations

<details>
<summary><b>Solution Hints</b></summary>

1. **pom.xml dependencies**:
```xml
<dependency>
    <groupId>io.qameta.allure</groupId>
    <artifactId>allure-testng</artifactId>
    <version>2.24.0</version>
</dependency>
```

2. **Surefire configuration**:
```xml
<argLine>
    -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/1.9.20.1/aspectjweaver-1.9.20.1.jar"
</argLine>
```

3. **Test annotations**:
```java
@Epic("E-Commerce Application")
@Feature("User Authentication")
@Story("User Login")
@Severity(SeverityLevel.CRITICAL)
@Description("Test to verify user login with valid credentials")
@Owner("John Doe")
```
</details>

---

### Exercise 5: Implementing Allure Steps and Attachments (40 minutes)

**Objective**: Create tests with detailed steps using @Step annotation and attach screenshots, logs, and other files to Allure reports.

**Scenario**: Create a comprehensive test with multiple steps that are clearly visible in Allure reports. Add screenshots at key points and attach test data files for better debugging.

**Tasks**:
1. Create helper methods with @Step annotations
2. Use parameterized step descriptions
3. Implement screenshot attachment utility
4. Attach text logs to reports
5. Attach JSON test data to reports
6. Create nested steps (steps within steps)
7. Verify all attachments in generated report

**Code Template**:

```java
// TODO 1: Create Allure utilities for attachments
package utils;

import io.qameta.allure.Attachment;
import org.openqa.selenium.*;

public class AllureUtils {

    // TODO: Create @Attachment method for screenshot
    @Attachment(value = "Screenshot", type = "image/png")
    public static byte[] saveScreenshot(WebDriver driver) {
        // TODO: Take screenshot as bytes
        // TODO: Return bytes
        return null;
    }

    // TODO: Create @Attachment method for screenshot with custom name
    @Attachment(value = "{name}", type = "image/png")
    public static byte[] saveScreenshotWithName(WebDriver driver, String name) {
        // TODO: Implement
        return null;
    }

    // TODO: Create @Attachment method for text
    @Attachment(value = "Test Log", type = "text/plain")
    public static String attachText(String text) {
        // TODO: Return text
        return null;
    }

    // TODO: Create @Attachment method for JSON
    @Attachment(value = "Test Data", type = "application/json")
    public static String attachJson(String json) {
        // TODO: Return JSON string
        return null;
    }
}

// TODO 2: Create test class with @Step methods
package tests;

import io.qameta.allure.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

@Epic("E-Commerce Application")
@Feature("User Authentication")
public class AllureStepsTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    @Story("Complete User Journey")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Test user journey from login to checkout with detailed steps")
    public void testCompleteUserJourney() {
        // TODO: Call step methods
        openLoginPage("https://example.com/login");
        enterCredentials("testuser", "password123");
        clickLoginButton();
        verifyDashboard();

        // TODO: Add screenshot attachment
        AllureUtils.saveScreenshot(driver);

        // TODO: Add text log attachment
        String testLog = "User successfully logged in and navigated to dashboard";
        AllureUtils.attachText(testLog);
    }

    // TODO: Implement @Step methods
    @Step("Open login page: {url}")
    public void openLoginPage(String url) {
        // TODO: Navigate to URL
        // TODO: Add screenshot
    }

    @Step("Enter username: {username} and password")
    public void enterCredentials(String username, String password) {
        // TODO: Find and fill username field
        // TODO: Find and fill password field
    }

    @Step("Click login button")
    public void clickLoginButton() {
        // TODO: Click login button
    }

    @Step("Verify user is on dashboard")
    public void verifyDashboard() {
        // TODO: Verify dashboard elements
        // TODO: Add screenshot
    }

    // TODO: Create nested steps example
    @Step("Complete checkout process")
    public void completeCheckout() {
        addProductToCart();
        proceedToCheckout();
        completePayment();
    }

    @Step("Add product to cart")
    public void addProductToCart() {
        // Nested step implementation
    }

    @Step("Proceed to checkout")
    public void proceedToCheckout() {
        // Nested step implementation
    }

    @Step("Complete payment")
    public void completePayment() {
        // Nested step implementation
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

**Expected Output**:
```
✓ Test steps visible in Allure report timeline
✓ Parameterized step descriptions showing actual values
✓ Screenshots attached at appropriate steps
✓ Text logs attached to report
✓ Nested steps showing hierarchical structure
✓ All attachments viewable in report
```

**Common Mistakes to Avoid**:
1. Forgetting @Attachment annotation - files won't appear in report
2. Wrong MIME type in @Attachment annotation
3. Not returning value from @Attachment methods
4. Taking screenshots after browser is closed
5. Not using parameterized step descriptions

<details>
<summary><b>Solution Hints</b></summary>

1. **Screenshot attachment**:
```java
@Attachment(value = "Screenshot", type = "image/png")
public static byte[] saveScreenshot(WebDriver driver) {
    return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
}
```

2. **Step methods**:
```java
@Step("Open login page: {url}")
public void openLoginPage(String url) {
    driver.get(url);
    AllureUtils.saveScreenshotWithName(driver, "Login Page");
}
```

3. **Text attachment**:
```java
@Attachment(value = "Test Log", type = "text/plain")
public static String attachText(String text) {
    return text;
}
```
</details>

---

### Exercise 6: Building a Complete Unified Reporting Framework (60 minutes)

**Objective**: Create a comprehensive reporting framework that supports both Extent Reports and Allure Reports simultaneously with configuration options.

**Scenario**: Build an enterprise-grade reporting solution that can generate both Extent and Allure reports from the same test execution, allowing teams to use their preferred reporting tool.

**Tasks**:
1. Create UnifiedReportManager class
2. Support both Extent and Allure report generation
3. Implement configuration to enable/disable each report type
4. Create unified methods for logging (info, pass, fail)
5. Implement unified screenshot attachment
6. Create BaseTest that uses UnifiedReportManager
7. Run tests and verify both reports are generated

**Code Template**:

```java
// TODO 1: Create unified reporting manager
package framework.reports;

import com.aventstack.extentreports.*;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import io.qameta.allure.Attachment;
import org.openqa.selenium.*;

public class UnifiedReportManager {

    private static ExtentReports extentReports;
    private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();
    private static boolean useExtent = true;
    private static boolean useAllure = true;

    // TODO: Initialize reporting
    public static void initReports(String reportPath, boolean extent, boolean allure) {
        useExtent = extent;
        useAllure = allure;

        if (useExtent) {
            // TODO: Initialize Extent Reports
        }

        System.out.println("Unified Reporting initialized - Extent: " + extent + ", Allure: " + allure);
    }

    // TODO: Start test
    public static void startTest(String testName, String description) {
        // TODO: Start Extent test if enabled
        // TODO: Allure handles this automatically
    }

    // TODO: Log info message
    public static void logInfo(String message) {
        // TODO: Log to Extent if enabled
        // TODO: Log to Allure if enabled (use @Attachment or Step)
    }

    // TODO: Log pass message
    public static void logPass(String message) {
        // TODO: Log to Extent if enabled
        // TODO: Log to Allure if enabled
    }

    // TODO: Log fail message
    public static void logFail(String message) {
        // TODO: Log to Extent if enabled
        // TODO: Log to Allure if enabled
    }

    // TODO: Attach screenshot to both reports
    public static void attachScreenshot(WebDriver driver, String name) {
        if (useExtent || useAllure) {
            byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);

            // TODO: Attach to Extent if enabled
            // TODO: Attach to Allure if enabled
        }
    }

    // TODO: Flush reports
    public static void flushReports() {
        if (useExtent && extentReports != null) {
            extentReports.flush();
        }
    }

    // Allure attachment helper
    @Attachment(value = "Screenshot", type = "image/png")
    private static byte[] attachAllureScreenshot(byte[] screenshot) {
        return screenshot;
    }

    @Attachment(value = "Log", type = "text/plain")
    private static String attachAllureLog(String message) {
        return message;
    }
}

// TODO 2: Create BaseTest using unified reporting
package tests;

import framework.reports.UnifiedReportManager;
import io.qameta.allure.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;

public class UnifiedReportBaseTest {

    protected WebDriver driver;

    @BeforeSuite
    public void setupSuite() {
        // TODO: Initialize unified reporting
        // Enable both Extent and Allure
        UnifiedReportManager.initReports(
            "test-output/UnifiedReport.html",
            true,  // Enable Extent
            true   // Enable Allure
        );
    }

    @BeforeMethod
    public void setup(ITestResult result) {
        // TODO: Initialize browser
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // TODO: Start test in unified reporter
        String testName = result.getMethod().getMethodName();
        String description = result.getMethod().getDescription();
        UnifiedReportManager.startTest(testName, description);
        UnifiedReportManager.logInfo("Test started: " + testName);
    }

    @AfterMethod
    public void teardown(ITestResult result) {
        // TODO: Handle test result
        if (result.getStatus() == ITestResult.FAILURE) {
            UnifiedReportManager.logFail("Test failed: " + result.getName());
            UnifiedReportManager.attachScreenshot(driver, "Failure Screenshot");
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            UnifiedReportManager.logPass("Test passed: " + result.getName());
        }

        // TODO: Close browser
        if (driver != null) {
            driver.quit();
        }
    }

    @AfterSuite
    public void teardownSuite() {
        UnifiedReportManager.flushReports();
    }
}

// TODO 3: Create sample tests
@Epic("Unified Reporting Framework")
@Feature("Dual Report Generation")
public class UnifiedReportingTests extends UnifiedReportBaseTest {

    @Test(description = "Test with unified reporting")
    @Story("Login Test")
    @Severity(SeverityLevel.CRITICAL)
    public void testLoginWithUnifiedReporting() {
        // TODO: Implement test with unified logging
        UnifiedReportManager.logInfo("Navigating to login page");
        driver.get("https://example.com/login");

        UnifiedReportManager.logInfo("Entering credentials");
        // Simulate login

        UnifiedReportManager.attachScreenshot(driver, "Login Page");
        UnifiedReportManager.logPass("Login successful");
    }

    @Test(description = "Test to verify both reports generated")
    @Story("Report Verification")
    public void testBothReportsGenerated() {
        // TODO: Implement test
        UnifiedReportManager.logInfo("Starting report verification test");
        driver.get("https://example.com");
        UnifiedReportManager.logPass("Page loaded successfully");
    }
}
```

**Expected Output**:
```
✓ Both Extent and Allure reports generated
✓ Same test data in both reports
✓ Screenshots attached to both reports
✓ Logs synchronized across both reports
✓ Extent report: test-output/UnifiedReport.html
✓ Allure results: target/allure-results/
✓ Configuration allows enabling/disabling each report type
```

**Common Mistakes to Avoid**:
1. Not handling thread safety for Extent Reports
2. Forgetting to flush Extent Reports
3. Not returning byte[] from @Attachment methods for Allure
4. Missing AspectJ configuration for Allure
5. Not checking if report type is enabled before logging

<details>
<summary><b>Solution Hints</b></summary>

1. **Initialize Extent Reports**:
```java
ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);
extentReports = new ExtentReports();
extentReports.attachReporter(sparkReporter);
```

2. **Start test**:
```java
if (useExtent) {
    ExtentTest test = extentReports.createTest(testName, description);
    extentTest.set(test);
}
```

3. **Unified logging**:
```java
public static void logInfo(String message) {
    if (useExtent && extentTest.get() != null) {
        extentTest.get().info(message);
    }
    if (useAllure) {
        attachAllureLog(message);
    }
}
```
</details>

---

## Navigation

- **Previous:** [Day 38: Logging & Reporting Part 1](./day38_logging_reporting_part1.md)
- **Next:** [Day 40: Configuration Management](./day40_configuration_management.md)
- **Week 6 Home:** [Week 6 Overview](./README.md)

---

**Happy Learning!** Effective reporting is crucial for communicating test results and making informed decisions about software quality.
