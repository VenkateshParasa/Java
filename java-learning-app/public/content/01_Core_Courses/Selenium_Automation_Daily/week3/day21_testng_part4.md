# Day 33: TestNG Part 4 - Listeners & Reports

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand what TestNG Listeners are and their purpose
- Implement ITestListener interface
- Use different listener interfaces (ISuiteListener, IInvokedMethodListener)
- Create custom listeners for test automation
- Apply @Listeners annotation
- Configure listeners in testng.xml
- Understand TestNG default reports
- Integrate Extent Reports for advanced reporting
- Capture screenshots on test failure
- Generate custom HTML reports
- Apply best practices for listeners and reporting

---

## 1. Introduction to TestNG Listeners

### What are Listeners?

**Listeners** are interfaces that allow you to customize TestNG behavior by listening to test events. They enable you to perform specific actions when test events occur (e.g., test start, test pass, test fail).

### Why Use Listeners?

- **Custom logging** - Log detailed test execution information
- **Screenshot capture** - Take screenshots on test failure
- **Custom reporting** - Generate customized test reports
- **Email notifications** - Send test results via email
- **Retry failed tests** - Automatically retry failed test cases
- **Test monitoring** - Track test execution in real-time
- **Resource management** - Clean up resources after tests

### Types of TestNG Listeners

```java
ITestListener           // Test method level events
ISuiteListener          // Suite level events
IInvokedMethodListener  // Method invocation events
IReporter               // Generating custom reports
IAnnotationTransformer  // Modifying annotations at runtime
IExecutionListener      // Test execution start/end events
IConfigurationListener  // Configuration method events
IHookable              // Altering test method execution
```

---

## 2. ITestListener Interface

### Understanding ITestListener

The most commonly used listener interface with methods for test lifecycle events.

### ITestListener Methods

```java
public interface ITestListener {

    // Called when test starts
    void onStart(ITestContext context);

    // Called when test finishes
    void onFinish(ITestContext context);

    // Called when test method succeeds
    void onTestSuccess(ITestResult result);

    // Called when test method fails
    void onTestFailure(ITestResult result);

    // Called when test method is skipped
    void onTestSkipped(ITestResult result);

    // Called when test fails but within success percentage
    void onTestFailedButWithinSuccessPercentage(ITestResult result);

    // Called when test fails with timeout
    void onTestFailedWithTimeout(ITestResult result);

    // Called before test method starts
    void onTestStart(ITestResult result);
}
```

---

## 3. Implementing Basic ITestListener

### Simple Listener Implementation

```java
package listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class CustomTestListener implements ITestListener {

    @Override
    public void onStart(ITestContext context) {
        System.out.println("========================================");
        System.out.println("Test Suite Started: " + context.getName());
        System.out.println("========================================");
    }

    @Override
    public void onFinish(ITestContext context) {
        System.out.println("========================================");
        System.out.println("Test Suite Finished: " + context.getName());
        System.out.println("Total Tests: " + context.getAllTestMethods().length);
        System.out.println("Passed: " + context.getPassedTests().size());
        System.out.println("Failed: " + context.getFailedTests().size());
        System.out.println("Skipped: " + context.getSkippedTests().size());
        System.out.println("========================================");
    }

    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("Test Started: " + result.getName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("✓ Test PASSED: " + result.getName());
        System.out.println("  Duration: " + (result.getEndMillis() - result.getStartMillis()) + "ms");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("✗ Test FAILED: " + result.getName());
        System.out.println("  Reason: " + result.getThrowable().getMessage());
        System.out.println("  Duration: " + (result.getEndMillis() - result.getStartMillis()) + "ms");
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("⊘ Test SKIPPED: " + result.getName());
        System.out.println("  Reason: " + result.getThrowable());
    }

    @Override
    public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
        System.out.println("Test Failed but within success percentage: " + result.getName());
    }

    @Override
    public void onTestFailedWithTimeout(ITestResult result) {
        System.out.println("✗ Test FAILED with TIMEOUT: " + result.getName());
        onTestFailure(result);
    }
}
```

---

## 4. Using @Listeners Annotation

### Applying Listener to Test Class

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import listeners.CustomTestListener;

@Listeners(CustomTestListener.class)
public class LoginTest {

    @Test(priority = 1)
    public void testValidLogin() {
        System.out.println("  Executing valid login test...");
        Assert.assertTrue(true);
    }

    @Test(priority = 2)
    public void testInvalidLogin() {
        System.out.println("  Executing invalid login test...");
        Assert.assertEquals("actual", "expected", "Credentials mismatch");
    }

    @Test(priority = 3, dependsOnMethods = "testInvalidLogin")
    public void testDependentTest() {
        System.out.println("  Executing dependent test...");
        Assert.assertTrue(true);
    }
}
```

**Output:**
```
========================================
Test Suite Started: Default test
========================================
Test Started: testValidLogin
  Executing valid login test...
✓ Test PASSED: testValidLogin
  Duration: 45ms
Test Started: testInvalidLogin
  Executing invalid login test...
✗ Test FAILED: testInvalidLogin
  Reason: Credentials mismatch expected [expected] but found [actual]
  Duration: 12ms
⊘ Test SKIPPED: testDependentTest
  Reason: org.testng.SkipException: Skipped due to dependency failure
========================================
Test Suite Finished: Default test
Total Tests: 3
Passed: 1
Failed: 1
Skipped: 1
========================================
```

---

## 5. Configuring Listeners in testng.xml

### testng.xml with Listener Configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Test Suite with Listeners">

    <!-- Configure listeners at suite level -->
    <listeners>
        <listener class-name="listeners.CustomTestListener"/>
        <listener class-name="listeners.ScreenshotListener"/>
        <listener class-name="listeners.EmailReportListener"/>
    </listeners>

    <test name="Smoke Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.HomePageTest"/>
        </classes>
    </test>

    <test name="Regression Tests">
        <classes>
            <class name="tests.CheckoutTest"/>
            <class name="tests.PaymentTest"/>
        </classes>
    </test>
</suite>
```

**Advantages of testng.xml Configuration:**
- Apply listeners to multiple test classes
- Easier to enable/disable listeners
- No need to modify test classes
- Centralized configuration

---

## 6. Screenshot Capture Listener

### Screenshot on Failure Listener

```java
package listeners;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import tests.BaseTest;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotListener implements ITestListener {

    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("Test Failed - Capturing Screenshot");

        // Get the driver from the test class
        Object testClass = result.getInstance();
        WebDriver driver = ((BaseTest) testClass).getDriver();

        if (driver != null) {
            captureScreenshot(driver, result.getName());
        }
    }

    private void captureScreenshot(WebDriver driver, String testName) {
        try {
            // Take screenshot
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);

            // Create screenshots folder if not exists
            String screenshotDir = "test-output/screenshots/";
            File directory = new File(screenshotDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate unique filename with timestamp
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String screenshotPath = screenshotDir + testName + "_" + timestamp + ".png";

            // Copy file to destination
            File destination = new File(screenshotPath);
            FileUtils.copyFile(source, destination);

            System.out.println("Screenshot saved: " + screenshotPath);

        } catch (IOException e) {
            System.out.println("Failed to capture screenshot: " + e.getMessage());
        }
    }

    @Override
    public void onTestStart(ITestResult result) {
        // Optional: Log test start
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        // Optional: Actions on test success
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        // Optional: Actions on test skip
    }
}
```

### Base Test Class for Driver Access

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class BaseTest {

    protected WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }

    // Getter for driver (used by listener)
    public WebDriver getDriver() {
        return driver;
    }
}
```

---

## 7. ISuiteListener Interface

### Suite Level Events

```java
package listeners;

import org.testng.ISuite;
import org.testng.ISuiteListener;

public class CustomSuiteListener implements ISuiteListener {

    @Override
    public void onStart(ISuite suite) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   TEST SUITE EXECUTION STARTED         ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Suite Name: " + suite.getName());
        System.out.println("Total Tests: " + suite.getAllMethods().size());
        System.out.println("Start Time: " + new java.util.Date());
        System.out.println();
    }

    @Override
    public void onFinish(ISuite suite) {
        System.out.println();
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   TEST SUITE EXECUTION FINISHED        ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Suite Name: " + suite.getName());
        System.out.println("End Time: " + new java.util.Date());

        // Get results from all tests in the suite
        suite.getResults().forEach((testName, result) -> {
            System.out.println("\nTest: " + testName);
            System.out.println("  Passed: " + result.getTestContext().getPassedTests().size());
            System.out.println("  Failed: " + result.getTestContext().getFailedTests().size());
            System.out.println("  Skipped: " + result.getTestContext().getSkippedTests().size());
        });
        System.out.println();
    }
}
```

---

## 8. IInvokedMethodListener Interface

### Method Invocation Listener

```java
package listeners;

import org.testng.IInvokedMethod;
import org.testng.IInvokedMethodListener;
import org.testng.ITestResult;

public class InvokedMethodListener implements IInvokedMethodListener {

    @Override
    public void beforeInvocation(IInvokedMethod method, ITestResult testResult) {
        if (method.isTestMethod()) {
            System.out.println("→ About to execute Test Method: " + method.getTestMethod().getMethodName());
        } else if (method.isConfigurationMethod()) {
            System.out.println("→ About to execute Configuration Method: " + method.getTestMethod().getMethodName());
        }
    }

    @Override
    public void afterInvocation(IInvokedMethod method, ITestResult testResult) {
        if (method.isTestMethod()) {
            System.out.println("← Finished executing Test Method: " + method.getTestMethod().getMethodName());
            System.out.println("  Status: " + getStatus(testResult.getStatus()));
        } else if (method.isConfigurationMethod()) {
            System.out.println("← Finished executing Configuration Method: " + method.getTestMethod().getMethodName());
        }
    }

    private String getStatus(int status) {
        switch (status) {
            case ITestResult.SUCCESS:
                return "PASSED";
            case ITestResult.FAILURE:
                return "FAILED";
            case ITestResult.SKIP:
                return "SKIPPED";
            default:
                return "UNKNOWN";
        }
    }
}
```

**When to Use:**
- Track execution of both test methods and configuration methods
- Measure execution time for each method
- Add pre/post processing for all methods
- Debug test execution flow

---

## 9. IReporter Interface

### Custom HTML Report Generator

```java
package listeners;

import org.testng.*;
import org.testng.xml.XmlSuite;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class CustomHtmlReporter implements IReporter {

    @Override
    public void generateReport(List<XmlSuite> xmlSuites, List<ISuite> suites, String outputDirectory) {
        try {
            String reportPath = outputDirectory + "/custom-report.html";
            BufferedWriter writer = new BufferedWriter(new FileWriter(reportPath));

            writer.write(generateHtmlHeader());

            for (ISuite suite : suites) {
                writer.write(generateSuiteSection(suite));
            }

            writer.write(generateHtmlFooter());
            writer.close();

            System.out.println("Custom HTML Report generated: " + reportPath);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String generateHtmlHeader() {
        return "<!DOCTYPE html>\n" +
               "<html>\n" +
               "<head>\n" +
               "    <title>Custom Test Report</title>\n" +
               "    <style>\n" +
               "        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }\n" +
               "        h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }\n" +
               "        h2 { color: #555; margin-top: 30px; }\n" +
               "        table { width: 100%; border-collapse: collapse; background: white; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }\n" +
               "        th { background-color: #4CAF50; color: white; padding: 12px; text-align: left; }\n" +
               "        td { padding: 10px; border-bottom: 1px solid #ddd; }\n" +
               "        tr:hover { background-color: #f5f5f5; }\n" +
               "        .passed { color: green; font-weight: bold; }\n" +
               "        .failed { color: red; font-weight: bold; }\n" +
               "        .skipped { color: orange; font-weight: bold; }\n" +
               "        .summary { background-color: #fff; padding: 20px; margin: 20px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }\n" +
               "        .summary-item { display: inline-block; margin: 10px 20px; }\n" +
               "        .summary-label { font-weight: bold; color: #555; }\n" +
               "        .summary-value { font-size: 24px; margin-left: 10px; }\n" +
               "    </style>\n" +
               "</head>\n" +
               "<body>\n" +
               "    <h1>Test Automation Report</h1>\n" +
               "    <p>Generated on: " + new java.util.Date() + "</p>\n";
    }

    private String generateSuiteSection(ISuite suite) {
        StringBuilder html = new StringBuilder();

        html.append("<h2>Suite: ").append(suite.getName()).append("</h2>\n");

        // Calculate totals
        int totalPassed = 0;
        int totalFailed = 0;
        int totalSkipped = 0;

        Map<String, ISuiteResult> results = suite.getResults();

        for (ISuiteResult result : results.values()) {
            ITestContext context = result.getTestContext();
            totalPassed += context.getPassedTests().size();
            totalFailed += context.getFailedTests().size();
            totalSkipped += context.getSkippedTests().size();
        }

        // Summary section
        html.append("<div class='summary'>\n");
        html.append("    <div class='summary-item'>\n");
        html.append("        <span class='summary-label'>Total Tests:</span>\n");
        html.append("        <span class='summary-value'>").append(totalPassed + totalFailed + totalSkipped).append("</span>\n");
        html.append("    </div>\n");
        html.append("    <div class='summary-item'>\n");
        html.append("        <span class='summary-label passed'>Passed:</span>\n");
        html.append("        <span class='summary-value passed'>").append(totalPassed).append("</span>\n");
        html.append("    </div>\n");
        html.append("    <div class='summary-item'>\n");
        html.append("        <span class='summary-label failed'>Failed:</span>\n");
        html.append("        <span class='summary-value failed'>").append(totalFailed).append("</span>\n");
        html.append("    </div>\n");
        html.append("    <div class='summary-item'>\n");
        html.append("        <span class='summary-label skipped'>Skipped:</span>\n");
        html.append("        <span class='summary-value skipped'>").append(totalSkipped).append("</span>\n");
        html.append("    </div>\n");
        html.append("</div>\n");

        // Test details table
        html.append("<table>\n");
        html.append("    <thead>\n");
        html.append("        <tr><th>Test Name</th><th>Method</th><th>Status</th><th>Duration (ms)</th></tr>\n");
        html.append("    </thead>\n");
        html.append("    <tbody>\n");

        for (ISuiteResult result : results.values()) {
            ITestContext context = result.getTestContext();

            // Passed tests
            context.getPassedTests().getAllResults().forEach(testResult -> {
                html.append(generateTestRow(testResult, "passed", "PASSED"));
            });

            // Failed tests
            context.getFailedTests().getAllResults().forEach(testResult -> {
                html.append(generateTestRow(testResult, "failed", "FAILED"));
            });

            // Skipped tests
            context.getSkippedTests().getAllResults().forEach(testResult -> {
                html.append(generateTestRow(testResult, "skipped", "SKIPPED"));
            });
        }

        html.append("    </tbody>\n");
        html.append("</table>\n");

        return html.toString();
    }

    private String generateTestRow(ITestResult result, String cssClass, String status) {
        long duration = result.getEndMillis() - result.getStartMillis();
        return "        <tr>\n" +
               "            <td>" + result.getTestClass().getName() + "</td>\n" +
               "            <td>" + result.getName() + "</td>\n" +
               "            <td class='" + cssClass + "'>" + status + "</td>\n" +
               "            <td>" + duration + "</td>\n" +
               "        </tr>\n";
    }

    private String generateHtmlFooter() {
        return "</body>\n</html>";
    }
}
```

---

## 10. TestNG Default Reports

### Understanding Default Reports

TestNG automatically generates three types of reports in the `test-output` folder:

#### 1. index.html
- **Main report page**
- Shows suite summary
- Lists all test classes
- Click test names to view details

#### 2. emailable-report.html
- **Email-friendly format**
- Single page summary
- Pass/Fail counts
- Failed test details
- Easy to share via email

#### 3. testng-results.xml
- **Machine-readable format**
- Contains all test execution data
- Used by CI/CD tools
- Can be parsed for custom reports

### Report Structure
```
project-root/
  test-output/
    index.html              ← Main report
    emailable-report.html   ← Email report
    testng-results.xml      ← XML results
    old/                    ← Previous run results
    Default suite/          ← Suite-specific results
    testng-failed.xml       ← Failed tests for retry
```

---

## 11. Extent Reports Integration

### Maven Dependencies

```xml
<dependencies>
    <!-- Extent Reports -->
    <dependency>
        <groupId>com.aventstack</groupId>
        <artifactId>extentreports</artifactId>
        <version>5.1.1</version>
    </dependency>
</dependencies>
```

### Extent Report Manager Class

```java
package utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ExtentManager {

    private static ExtentReports extent;
    private static String reportPath;

    public static ExtentReports createInstance() {
        if (extent == null) {
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            reportPath = "test-output/ExtentReport_" + timestamp + ".html";

            ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);

            // Configuration
            sparkReporter.config().setDocumentTitle("Automation Test Report");
            sparkReporter.config().setReportName("Test Execution Report");
            sparkReporter.config().setTheme(Theme.STANDARD);
            sparkReporter.config().setTimeStampFormat("MMM dd, yyyy HH:mm:ss");
            sparkReporter.config().setEncoding("UTF-8");

            extent = new ExtentReports();
            extent.attachReporter(sparkReporter);

            // System information
            extent.setSystemInfo("Application", "Web Application");
            extent.setSystemInfo("Environment", "QA");
            extent.setSystemInfo("User", System.getProperty("user.name"));
            extent.setSystemInfo("OS", System.getProperty("os.name"));
            extent.setSystemInfo("Java Version", System.getProperty("java.version"));
        }

        return extent;
    }

    public static String getReportPath() {
        return reportPath;
    }
}
```

### Extent Report Listener

```java
package listeners;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.markuputils.ExtentColor;
import com.aventstack.extentreports.markuputils.MarkupHelper;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import utils.ExtentManager;

public class ExtentReportListener implements ITestListener {

    private static ExtentReports extent = ExtentManager.createInstance();
    private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    @Override
    public void onStart(ITestContext context) {
        System.out.println("Test Suite Started: " + context.getName());
    }

    @Override
    public void onFinish(ITestContext context) {
        System.out.println("Test Suite Finished: " + context.getName());
        extent.flush();
        System.out.println("Extent Report generated: " + ExtentManager.getReportPath());
    }

    @Override
    public void onTestStart(ITestResult result) {
        ExtentTest test = extent.createTest(result.getMethod().getMethodName());
        extentTest.set(test);

        // Add categories/groups
        String[] groups = result.getMethod().getGroups();
        for (String group : groups) {
            test.assignCategory(group);
        }

        // Add description
        String description = result.getMethod().getDescription();
        if (description != null && !description.isEmpty()) {
            test.info(description);
        }
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        extentTest.get().log(Status.PASS,
            MarkupHelper.createLabel("Test PASSED: " + result.getName(), ExtentColor.GREEN));

        long duration = result.getEndMillis() - result.getStartMillis();
        extentTest.get().info("Duration: " + duration + "ms");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        extentTest.get().log(Status.FAIL,
            MarkupHelper.createLabel("Test FAILED: " + result.getName(), ExtentColor.RED));

        // Log failure reason
        extentTest.get().fail(result.getThrowable());

        // Add screenshot if available
        try {
            String screenshotPath = captureScreenshot(result);
            if (screenshotPath != null) {
                extentTest.get().addScreenCaptureFromPath(screenshotPath);
            }
        } catch (Exception e) {
            extentTest.get().fail("Failed to capture screenshot: " + e.getMessage());
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        extentTest.get().log(Status.SKIP,
            MarkupHelper.createLabel("Test SKIPPED: " + result.getName(), ExtentColor.ORANGE));

        if (result.getThrowable() != null) {
            extentTest.get().skip(result.getThrowable());
        }
    }

    private String captureScreenshot(ITestResult result) {
        // Implementation to capture screenshot
        // Returns the screenshot file path
        // (Implementation depends on your framework)
        return null;
    }
}
```

---

## 12. Complete Screenshot Listener with Extent Reports

### Advanced Screenshot Listener

```java
package listeners;

import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.MediaEntityBuilder;
import com.aventstack.extentreports.Status;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import tests.BaseTest;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotExtentListener implements ITestListener {

    private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("Test Failed - Capturing Screenshot with Extent Report");

        Object testClass = result.getInstance();
        if (testClass instanceof BaseTest) {
            WebDriver driver = ((BaseTest) testClass).getDriver();

            if (driver != null) {
                String screenshotPath = captureScreenshot(driver, result.getName());

                if (screenshotPath != null && extentTest.get() != null) {
                    try {
                        // Add screenshot to Extent Report
                        extentTest.get().fail("Test Failed - Screenshot captured",
                            MediaEntityBuilder.createScreenCaptureFromPath(screenshotPath).build());
                    } catch (Exception e) {
                        extentTest.get().fail("Failed to attach screenshot: " + e.getMessage());
                    }
                }
            }
        }
    }

    private String captureScreenshot(WebDriver driver, String testName) {
        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);

            String screenshotDir = "test-output/screenshots/";
            File directory = new File(screenshotDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String screenshotPath = screenshotDir + testName + "_" + timestamp + ".png";

            File destination = new File(screenshotPath);
            FileUtils.copyFile(source, destination);

            System.out.println("Screenshot saved: " + screenshotPath);
            return screenshotPath;

        } catch (IOException e) {
            System.out.println("Failed to capture screenshot: " + e.getMessage());
            return null;
        }
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        if (extentTest.get() != null) {
            extentTest.get().log(Status.PASS, "Test Passed Successfully");
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        if (extentTest.get() != null) {
            extentTest.get().log(Status.SKIP, "Test Skipped");
        }
    }
}
```

---

## 13. Retry Analyzer Listener

### Retry Failed Tests Automatically

```java
package listeners;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

public class RetryAnalyzer implements IRetryAnalyzer {

    private int retryCount = 0;
    private static final int MAX_RETRY_COUNT = 3;

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY_COUNT) {
            System.out.println("Retrying test " + result.getName() +
                " for the " + (retryCount + 1) + " time.");
            retryCount++;
            return true;
        }
        return false;
    }
}
```

### Retry Listener to Apply to All Tests

```java
package listeners;

import org.testng.IAnnotationTransformer;
import org.testng.annotations.ITestAnnotation;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

public class RetryListener implements IAnnotationTransformer {

    @Override
    public void transform(ITestAnnotation annotation, Class testClass,
                         Constructor testConstructor, Method testMethod) {
        annotation.setRetryAnalyzer(RetryAnalyzer.class);
    }
}
```

### Using Retry in Test

```java
import org.testng.Assert;
import org.testng.annotations.Test;

public class FlakyTest {

    private static int count = 0;

    @Test(retryAnalyzer = RetryAnalyzer.class)
    public void testFlaky() {
        count++;
        System.out.println("Test execution count: " + count);

        // This test fails first 2 times, passes on 3rd attempt
        Assert.assertTrue(count >= 3, "Test failed, will retry");
    }
}
```

---

## 14. Email Report Listener

### Email Configuration

```java
package utils;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

public class EmailUtils {

    public static void sendEmail(String subject, String body, String[] recipients) {
        // Email configuration
        final String username = "your-email@gmail.com";
        final String password = "your-app-password";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));

            // Add recipients
            for (String recipient : recipients) {
                message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
            }

            message.setSubject(subject);
            message.setContent(body, "text/html");

            Transport.send(message);
            System.out.println("Email sent successfully!");

        } catch (MessagingException e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }
}
```

### Email Report Listener

```java
package listeners;

import org.testng.ITestContext;
import org.testng.ITestListener;
import utils.EmailUtils;

public class EmailReportListener implements ITestListener {

    @Override
    public void onFinish(ITestContext context) {
        String suiteName = context.getName();
        int passed = context.getPassedTests().size();
        int failed = context.getFailedTests().size();
        int skipped = context.getSkippedTests().size();
        int total = passed + failed + skipped;

        // Create email body
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("<html><body>");
        emailBody.append("<h2>Test Execution Report</h2>");
        emailBody.append("<p><b>Suite:</b> ").append(suiteName).append("</p>");
        emailBody.append("<table border='1' style='border-collapse: collapse;'>");
        emailBody.append("<tr><th>Status</th><th>Count</th></tr>");
        emailBody.append("<tr><td>Total Tests</td><td>").append(total).append("</td></tr>");
        emailBody.append("<tr style='color: green;'><td>Passed</td><td>").append(passed).append("</td></tr>");
        emailBody.append("<tr style='color: red;'><td>Failed</td><td>").append(failed).append("</td></tr>");
        emailBody.append("<tr style='color: orange;'><td>Skipped</td><td>").append(skipped).append("</td></tr>");
        emailBody.append("</table>");
        emailBody.append("</body></html>");

        // Send email
        String subject = "Test Execution Report - " + suiteName;
        String[] recipients = {"recipient1@example.com", "recipient2@example.com"};

        EmailUtils.sendEmail(subject, emailBody.toString(), recipients);
    }
}
```

---

## 15. Complete Example with Multiple Listeners

### Test Suite Configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Complete Listener Suite" parallel="methods" thread-count="2">

    <listeners>
        <listener class-name="listeners.CustomTestListener"/>
        <listener class-name="listeners.CustomSuiteListener"/>
        <listener class-name="listeners.InvokedMethodListener"/>
        <listener class-name="listeners.ExtentReportListener"/>
        <listener class-name="listeners.ScreenshotExtentListener"/>
        <listener class-name="listeners.EmailReportListener"/>
        <listener class-name="listeners.RetryListener"/>
    </listeners>

    <test name="Regression Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.HomePageTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>
</suite>
```

### Complete Test Example

```java
package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    @Test(priority = 1, description = "Verify login page title", groups = {"smoke"})
    public void testLoginPageTitle() {
        driver.get("https://example.com/login");
        String title = driver.getTitle();
        Assert.assertEquals(title, "Login - Example Site");
        System.out.println("Login page title verified");
    }

    @Test(priority = 2, description = "Test valid login credentials", groups = {"smoke", "regression"})
    public void testValidLogin() {
        driver.get("https://example.com/login");
        driver.findElement(By.id("username")).sendKeys("admin");
        driver.findElement(By.id("password")).sendKeys("admin123");
        driver.findElement(By.id("loginBtn")).click();

        // Wait for redirect
        try { Thread.sleep(2000); } catch (InterruptedException e) { }

        Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"),
            "Should redirect to dashboard after login");
        System.out.println("Valid login successful");
    }

    @Test(priority = 3, description = "Test invalid login credentials", groups = {"regression"})
    public void testInvalidLogin() {
        driver.get("https://example.com/login");
        driver.findElement(By.id("username")).sendKeys("invalid");
        driver.findElement(By.id("password")).sendKeys("wrongpass");
        driver.findElement(By.id("loginBtn")).click();

        boolean errorDisplayed = driver.findElement(By.className("error-message")).isDisplayed();
        Assert.assertTrue(errorDisplayed, "Error message should be displayed");
        System.out.println("Invalid login handled correctly");
    }
}
```

---

## 16. Best Practices

### 1. Use Appropriate Listeners

```java
// Use ITestListener for test-level events
public class TestListener implements ITestListener { }

// Use ISuiteListener for suite-level events
public class SuiteListener implements ISuiteListener { }

// Use IInvokedMethodListener for all method invocations
public class MethodListener implements IInvokedMethodListener { }
```

### 2. Centralize Listener Configuration

```xml
<!-- Configure listeners in testng.xml, not in every test class -->
<suite name="Test Suite">
    <listeners>
        <listener class-name="listeners.ExtentReportListener"/>
        <listener class-name="listeners.ScreenshotListener"/>
    </listeners>
    <!-- tests here -->
</suite>
```

### 3. Handle Driver Access Safely

```java
@Override
public void onTestFailure(ITestResult result) {
    Object testClass = result.getInstance();

    // Safe check before casting
    if (testClass instanceof BaseTest) {
        WebDriver driver = ((BaseTest) testClass).getDriver();
        if (driver != null) {
            captureScreenshot(driver, result.getName());
        }
    }
}
```

### 4. Organize Reports in Folders

```java
// Create organized folder structure
String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
String reportFolder = "test-output/reports/" + timestamp + "/";
new File(reportFolder + "screenshots").mkdirs();
new File(reportFolder + "logs").mkdirs();
```

### 5. Use ThreadLocal for Parallel Execution

```java
// For parallel execution, use ThreadLocal
private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

@Override
public void onTestStart(ITestResult result) {
    ExtentTest test = extent.createTest(result.getName());
    extentTest.set(test);  // Thread-safe
}
```

### 6. Log Meaningful Information

```java
@Override
public void onTestFailure(ITestResult result) {
    System.out.println("Test: " + result.getName());
    System.out.println("Class: " + result.getTestClass().getName());
    System.out.println("Duration: " + (result.getEndMillis() - result.getStartMillis()) + "ms");
    System.out.println("Failure Reason: " + result.getThrowable().getMessage());
    System.out.println("Browser: " + driver.getBrowserName());
    System.out.println("URL: " + driver.getCurrentUrl());
}
```

### 7. Clean Up Resources

```java
@Override
public void onFinish(ITestContext context) {
    // Flush extent reports
    extent.flush();

    // Close database connections
    if (dbConnection != null) {
        dbConnection.close();
    }

    // Clean up old screenshots
    cleanupOldScreenshots();
}
```

### 8. Use Retry Wisely

```java
// Don't retry every test - only flaky ones
@Test(retryAnalyzer = RetryAnalyzer.class)  // For known flaky tests
public void testFlaky() { }

// Or configure max retries appropriately
private static final int MAX_RETRY_COUNT = 2;  // Not too many
```

---

## 17. Key Takeaways

1. **Listeners customize TestNG behavior** by listening to test events
2. **ITestListener** handles test method level events (start, pass, fail, skip)
3. **ISuiteListener** handles suite level events (suite start and finish)
4. **IInvokedMethodListener** tracks all method invocations including configuration methods
5. **Screenshot listeners** capture screenshots automatically on test failure
6. **Extent Reports** provide rich, interactive HTML reports with charts and graphs
7. **@Listeners annotation** applies listeners to specific test classes
8. **testng.xml listeners** apply to entire suite centrally
9. **ThreadLocal** ensures thread-safety for parallel test execution
10. **Retry Analyzer** automatically retries failed tests to handle flaky tests

---

## 18. Common Interview Questions

1. What are TestNG Listeners and why are they used?
2. What is the difference between ITestListener and ISuiteListener?
3. How do you capture screenshots on test failure using listeners?
4. How do you configure listeners in TestNG?
5. What is the difference between @Listeners annotation and testng.xml listeners?
6. How do you integrate Extent Reports with TestNG?
7. What is IInvokedMethodListener used for?
8. How do you implement retry logic for failed tests?
9. What are the methods available in ITestListener interface?
10. How do you handle listeners in parallel test execution?

---

## Navigation

- **Previous:** [Day 32: TestNG Part 3](./day32_testng_part3.md)
- **Next:** [Day 34: TestNG Part 5](./day34_testng_part5.md)
- **Week 5 Home:** [Week 5 Overview](./README.md)

---

**Happy Learning!** Listeners and Reports are essential for professional test automation frameworks, providing visibility and control over test execution.
