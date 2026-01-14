# Day 48: Test Maintenance & Optimization

## Learning Objectives

By the end of this lesson, you will be able to:
- Identify and fix flaky tests
- Optimize test execution time
- Implement effective test maintenance strategies
- Refactor test code for better maintainability
- Monitor test health metrics
- Handle test data management
- Implement test reporting best practices

---

## 1. Understanding Flaky Tests

### 1.1 What are Flaky Tests?

**Definition:**
Flaky tests are tests that sometimes pass and sometimes fail without any code changes.

**Common Causes:**
```
✗ Race conditions
✗ Timing issues
✗ External dependencies
✗ Test data conflicts
✗ Browser/environment differences
✗ Asynchronous operations
✗ Resource cleanup issues
```

### 1.2 Identifying Flaky Tests

```java
public class FlakyTestDetector {
    
    // Run test multiple times to detect flakiness
    @Test(invocationCount = 10, successPercentage = 90)
    public void potentiallyFlakyTest() {
        // Test code
    }
    
    // Track test execution history
    @AfterMethod
    public void trackTestResult(ITestResult result) {
        String testName = result.getName();
        boolean passed = result.isSuccess();
        
        // Log to database or file
        TestMetrics.recordResult(testName, passed);
        
        // Alert if flakiness detected
        if (TestMetrics.isFlakyTest(testName)) {
            System.err.println("FLAKY TEST DETECTED: " + testName);
        }
    }
}
```

---

## 2. Fixing Flaky Tests

### 2.1 Explicit Waits

```java
public class ProperWaiting {
    
    // BAD: Implicit wait or Thread.sleep
    @Test
    public void badWaitExample() {
        driver.findElement(By.id("button")).click();
        Thread.sleep(2000); // DON'T DO THIS
        driver.findElement(By.id("result"));
    }
    
    // GOOD: Explicit wait
    @Test
    public void goodWaitExample() {
        driver.findElement(By.id("button")).click();
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("result")
        ));
    }
    
    // BETTER: Custom wait condition
    @Test
    public void betterWaitExample() {
        driver.findElement(By.id("button")).click();
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(driver -> {
            WebElement element = driver.findElement(By.id("result"));
            return element.isDisplayed() && 
                   !element.getText().isEmpty();
        });
    }
}
```

### 2.2 Handling Asynchronous Operations

```java
public class AsyncHandling {
    
    @Test
    public void waitForAjaxComplete() {
        driver.findElement(By.id("submit")).click();
        
        // Wait for jQuery AJAX to complete
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(driver -> 
            ((JavascriptExecutor) driver).executeScript(
                "return jQuery.active == 0"
            ).equals(true)
        );
    }
    
    @Test
    public void waitForAngularComplete() {
        driver.findElement(By.id("submit")).click();
        
        // Wait for Angular to complete
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(driver -> 
            ((JavascriptExecutor) driver).executeScript(
                "return window.getAllAngularTestabilities()" +
                ".findIndex(x => !x.isStable()) === -1"
            ).equals(true)
        );
    }
    
    @Test
    public void waitForReactComplete() {
        driver.findElement(By.id("submit")).click();
        
        // Wait for React to complete rendering
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(driver -> {
            Boolean isReady = (Boolean) ((JavascriptExecutor) driver)
                .executeScript(
                    "return document.readyState === 'complete' && " +
                    "!document.querySelector('.loading')"
                );
            return isReady;
        });
    }
}
```

### 2.3 Test Isolation

```java
public class TestIsolation {
    
    @BeforeMethod
    public void setupTestData() {
        // Create unique test data for each test
        String uniqueId = UUID.randomUUID().toString();
        testUser = new User("user_" + uniqueId);
        
        // Clean up any existing data
        database.deleteUser(testUser.getEmail());
    }
    
    @AfterMethod
    public void cleanupTestData() {
        // Always clean up test data
        if (testUser != null) {
            database.deleteUser(testUser.getEmail());
        }
        
        // Clear browser state
        driver.manage().deleteAllCookies();
        driver.manage().window().setSize(new Dimension(1920, 1080));
    }
    
    @Test
    public void isolatedTest() {
        // Test uses unique data
        // No interference from other tests
    }
}
```

---

## 3. Test Execution Optimization

### 3.1 Parallel Execution

```xml
<!-- testng.xml -->
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Optimized Suite" parallel="methods" thread-count="5">
    
    <test name="Fast Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.SearchTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>
    
</suite>
```

```java
public class ParallelTestBase {
    
    protected ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    @BeforeMethod
    public void setup() {
        WebDriver webDriver = new ChromeDriver();
        driver.set(webDriver);
    }
    
    @AfterMethod
    public void teardown() {
        WebDriver webDriver = driver.get();
        if (webDriver != null) {
            webDriver.quit();
        }
        driver.remove();
    }
    
    protected WebDriver getDriver() {
        return driver.get();
    }
}
```

### 3.2 Test Grouping

```java
public class TestGrouping {
    
    // Fast smoke tests
    @Test(groups = {"smoke", "fast"}, priority = 1)
    public void criticalTest() {
        // 5 seconds
    }
    
    // Medium regression tests
    @Test(groups = {"regression", "medium"}, priority = 2)
    public void regressionTest() {
        // 30 seconds
    }
    
    // Slow end-to-end tests
    @Test(groups = {"e2e", "slow"}, priority = 3)
    public void endToEndTest() {
        // 2 minutes
    }
}
```

```xml
<!-- Run only fast tests -->
<suite name="Fast Suite">
    <test name="Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
                <include name="fast"/>
            </run>
        </groups>
        <packages>
            <package name="tests.*"/>
        </packages>
    </test>
</suite>
```

### 3.3 Browser Reuse

```java
public class BrowserReuse {
    
    private static WebDriver sharedDriver;
    
    @BeforeSuite
    public void setupBrowser() {
        sharedDriver = new ChromeDriver();
    }
    
    @AfterSuite
    public void closeBrowser() {
        if (sharedDriver != null) {
            sharedDriver.quit();
        }
    }
    
    @BeforeMethod
    public void resetBrowserState() {
        // Clear cookies and storage
        sharedDriver.manage().deleteAllCookies();
        ((JavascriptExecutor) sharedDriver).executeScript(
            "window.localStorage.clear();" +
            "window.sessionStorage.clear();"
        );
        
        // Navigate to base URL
        sharedDriver.get("about:blank");
    }
    
    @Test
    public void test1() {
        sharedDriver.get("https://example.com");
        // Test code
    }
    
    @Test
    public void test2() {
        sharedDriver.get("https://example.com");
        // Test code
    }
}
```

---

## 4. Code Refactoring

### 4.1 Remove Duplication

```java
// BEFORE: Duplicated code
public class BeforeRefactoring {
    
    @Test
    public void testLogin1() {
        driver.findElement(By.id("username")).sendKeys("user1");
        driver.findElement(By.id("password")).sendKeys("pass1");
        driver.findElement(By.id("submit")).click();
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("dashboard")
        ));
    }
    
    @Test
    public void testLogin2() {
        driver.findElement(By.id("username")).sendKeys("user2");
        driver.findElement(By.id("password")).sendKeys("pass2");
        driver.findElement(By.id("submit")).click();
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("dashboard")
        ));
    }
}

// AFTER: Refactored
public class AfterRefactoring {
    
    private LoginPage loginPage;
    
    @BeforeMethod
    public void setup() {
        loginPage = new LoginPage(driver);
    }
    
    @Test
    public void testLogin1() {
        loginPage.login("user1", "pass1");
        assertTrue(loginPage.isDashboardDisplayed());
    }
    
    @Test
    public void testLogin2() {
        loginPage.login("user2", "pass2");
        assertTrue(loginPage.isDashboardDisplayed());
    }
}
```

### 4.2 Improve Readability

```java
// BEFORE: Hard to read
@Test
public void test() {
    driver.get("https://example.com");
    driver.findElement(By.id("u")).sendKeys("admin");
    driver.findElement(By.id("p")).sendKeys("pass");
    driver.findElement(By.id("s")).click();
    WebDriverWait w = new WebDriverWait(driver, Duration.ofSeconds(10));
    w.until(ExpectedConditions.visibilityOfElementLocated(By.id("d")));
}

// AFTER: Clear and readable
@Test
public void userCanLoginWithValidCredentials() {
    // Given: User is on login page
    loginPage.open();
    
    // When: User enters valid credentials
    loginPage.enterUsername("admin");
    loginPage.enterPassword("pass");
    loginPage.clickSubmit();
    
    // Then: User sees dashboard
    assertTrue(dashboardPage.isDisplayed(), 
        "Dashboard should be displayed after successful login");
}
```

---

## 5. Test Data Management

### 5.1 Data Provider Pattern

```java
public class TestDataManagement {
    
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"user1@test.com", "pass1", true},
            {"user2@test.com", "pass2", true},
            {"invalid@test.com", "wrong", false}
        };
    }
    
    @Test(dataProvider = "loginData")
    public void testLogin(String email, String password, boolean shouldSucceed) {
        loginPage.login(email, password);
        
        if (shouldSucceed) {
            assertTrue(dashboardPage.isDisplayed());
        } else {
            assertTrue(loginPage.isErrorDisplayed());
        }
    }
}
```

### 5.2 Test Data Factory

```java
public class TestDataFactory {
    
    public static User createValidUser() {
        return User.builder()
            .email("user_" + UUID.randomUUID() + "@test.com")
            .password("ValidPass123!")
            .firstName("Test")
            .lastName("User")
            .build();
    }
    
    public static User createInvalidUser() {
        return User.builder()
            .email("invalid-email")
            .password("weak")
            .build();
    }
    
    public static Product createProduct() {
        return Product.builder()
            .name("Test Product " + System.currentTimeMillis())
            .price(99.99)
            .stock(100)
            .build();
    }
}
```

---

## 6. Test Health Monitoring

### 6.1 Test Metrics Collection

```java
public class TestMetricsCollector implements ITestListener {
    
    private Map<String, TestMetric> metrics = new ConcurrentHashMap<>();
    
    @Override
    public void onTestStart(ITestResult result) {
        String testName = result.getName();
        metrics.put(testName, new TestMetric(testName));
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        String testName = result.getName();
        TestMetric metric = metrics.get(testName);
        metric.setStatus("PASSED");
        metric.setDuration(result.getEndMillis() - result.getStartMillis());
        
        // Store metrics
        MetricsDatabase.save(metric);
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        String testName = result.getName();
        TestMetric metric = metrics.get(testName);
        metric.setStatus("FAILED");
        metric.setDuration(result.getEndMillis() - result.getStartMillis());
        metric.setError(result.getThrowable().getMessage());
        
        // Store metrics
        MetricsDatabase.save(metric);
        
        // Alert if test is consistently failing
        if (MetricsDatabase.getFailureRate(testName) > 0.5) {
            AlertService.notify("High failure rate for: " + testName);
        }
    }
}
```

### 6.2 Performance Monitoring

```java
public class PerformanceMonitor {
    
    @Test
    public void monitorPageLoadTime() {
        long startTime = System.currentTimeMillis();
        
        driver.get("https://example.com");
        
        // Wait for page to load
        new WebDriverWait(driver, Duration.ofSeconds(30))
            .until(webDriver -> 
                ((JavascriptExecutor) webDriver)
                    .executeScript("return document.readyState")
                    .equals("complete")
            );
        
        long loadTime = System.currentTimeMillis() - startTime;
        
        // Assert performance threshold
        assertTrue(loadTime < 3000, 
            "Page load time (" + loadTime + "ms) exceeded threshold");
        
        // Log metrics
        PerformanceMetrics.record("page_load", loadTime);
    }
    
    @Test
    public void monitorTestExecutionTime() {
        long startTime = System.currentTimeMillis();
        
        // Test code
        performTest();
        
        long executionTime = System.currentTimeMillis() - startTime;
        
        // Warn if test is slow
        if (executionTime > 60000) {
            System.err.println("SLOW TEST: " + executionTime + "ms");
        }
    }
}
```

---

## 7. Reporting Best Practices

### 7.1 Custom Test Listener

```java
public class CustomTestListener implements ITestListener {
    
    @Override
    public void onTestFailure(ITestResult result) {
        // Capture screenshot
        String screenshotPath = captureScreenshot(result.getName());
        
        // Capture browser logs
        String logs = captureBrowserLogs();
        
        // Capture page source
        String pageSource = capturePageSource();
        
        // Add to report
        Reporter.log("Screenshot: " + screenshotPath);
        Reporter.log("Browser Logs: " + logs);
        Reporter.log("Page Source: " + pageSource);
        
        // Send notification
        NotificationService.sendFailureAlert(
            result.getName(),
            result.getThrowable().getMessage(),
            screenshotPath
        );
    }
    
    private String captureScreenshot(String testName) {
        File screenshot = ((TakesScreenshot) driver)
            .getScreenshotAs(OutputType.FILE);
        String path = "screenshots/" + testName + "_" + 
                     System.currentTimeMillis() + ".png";
        FileUtils.copyFile(screenshot, new File(path));
        return path;
    }
}
```

### 7.2 ExtentReports Integration

```java
public class ExtentReportManager {
    
    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();
    
    public static void initReports() {
        ExtentSparkReporter spark = new ExtentSparkReporter(
            "reports/extent-report.html"
        );
        
        extent = new ExtentReports();
        extent.attachReporter(spark);
        extent.setSystemInfo("OS", System.getProperty("os.name"));
        extent.setSystemInfo("Browser", "Chrome");
    }
    
    public static void createTest(String testName) {
        ExtentTest extentTest = extent.createTest(testName);
        test.set(extentTest);
    }
    
    public static void logPass(String message) {
        test.get().pass(message);
    }
    
    public static void logFail(String message, String screenshot) {
        test.get().fail(message)
            .addScreenCaptureFromPath(screenshot);
    }
    
    public static void flushReports() {
        extent.flush();
    }
}
```

---

## 8. Maintenance Checklist

### 8.1 Regular Maintenance Tasks

```
Weekly:
☐ Review and fix flaky tests
☐ Update test data
☐ Check test execution times
☐ Review test coverage

Monthly:
☐ Refactor duplicated code
☐ Update dependencies
☐ Review and update page objects
☐ Optimize slow tests
☐ Clean up obsolete tests

Quarterly:
☐ Major refactoring
☐ Framework updates
☐ Performance optimization
☐ Documentation updates
```

### 8.2 Code Review Guidelines

```java
/**
 * Test Code Review Checklist:
 * 
 * ✓ Test name is descriptive
 * ✓ Test follows AAA pattern (Arrange, Act, Assert)
 * ✓ No hard-coded waits (Thread.sleep)
 * ✓ Proper use of explicit waits
 * ✓ Test data is isolated
 * ✓ Cleanup is performed
 * ✓ Assertions are meaningful
 * ✓ No code duplication
 * ✓ Page objects are used
 * ✓ Test is independent
 */
```

---

## 9. Key Takeaways

1. **Fix flaky tests immediately - they erode trust**
2. **Use explicit waits, never Thread.sleep**
3. **Isolate test data to prevent conflicts**
4. **Optimize execution with parallel testing**
5. **Refactor regularly to maintain code quality**
6. **Monitor test health metrics**
7. **Implement comprehensive reporting**

---

## 10. Practice Exercises

### Exercise 1: Fix Flaky Test
Identify and fix a flaky test in your suite.

### Exercise 2: Optimize Execution
Reduce test suite execution time by 50%.

### Exercise 3: Refactor Tests
Refactor duplicated code using page objects.

### Exercise 4: Implement Monitoring
Set up test health monitoring and alerts.

### Exercise 5: Improve Reporting
Enhance test reports with screenshots and logs.

---

## Navigation

- **Previous:** [Day 47: Visual Regression Testing](./day47_visual_regression.md)
- **Next:** [Day 49: Capstone Project](./day49_capstone_project.md)
- **Week 7 Home:** [Week 7 Overview](./README.md)

---

**Congratulations!** You've learned test maintenance and optimization. Well-maintained tests are reliable, fast, and valuable!

**Next:** Apply everything you've learned in the capstone project.