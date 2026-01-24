
# Week 5: TestNG & POM Advanced - Beginner-Friendly Exercises

## Day 29: TestNG XML Configuration

### Exercise 1: Create TestNG XML Suite

```exercise
title: Configure Test Suite Using testng.xml
description: Learn to create and configure TestNG XML files for test execution control.
requirements:
- Create testng.xml file
- Define test suite
- Include/exclude test classes
- Set parameters
- Configure parallel execution
testcases:
- input: "Run tests using testng.xml"
  output: "Should execute configured tests"
hints:
- Create testng.xml in project root
- Use <suite> tag for suite definition
- Use <test> tag for test groups
- Use <classes> to include test classes
- Use <parameter> for passing values
solution:
```xml
<!-- testng.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Complete Test Suite" verbose="1">
    
    <!-- Suite-level parameters -->
    <parameter name="browser" value="chrome"/>
    <parameter name="baseUrl" value="https://www.saucedemo.com"/>
    
    <!-- Smoke Test -->
    <test name="Smoke Tests" preserve-order="true">
        <parameter name="environment" value="QA"/>
        <classes>
            <class name="tests.LoginTest">
                <methods>
                    <include name="testValidLogin"/>
                </methods>
            </class>
            <class name="tests.HomePageTest"/>
        </classes>
    </test>
    
    <!-- Regression Test -->
    <test name="Regression Tests">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.ProductTest"/>
            <class name="tests.CartTest"/>
            <class name="tests.CheckoutTest"/>
        </classes>
    </test>
    
    <!-- Parallel Execution -->
    <test name="Parallel Tests" parallel="methods" thread-count="3">
        <classes>
            <class name="tests.SearchTest"/>
        </classes>
    </test>
    
</suite>
```

```java
// Example test class using parameters
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import org.testng.Assert;

public class ParameterizedTest {
    
    @Parameters({"browser", "baseUrl"})
    @Test
    public void testWithParameters(String browser, String baseUrl) {
        System.out.println("Browser: " + browser);
        System.out.println("Base URL: " + baseUrl);
        
        Assert.assertNotNull(browser);
        Assert.assertNotNull(baseUrl);
        System.out.println("✓ Parameters received successfully");
    }
}
```
\```
```

### Exercise 2: TestNG Groups and Dependencies

```exercise
title: Organize Tests Using Groups
description: Learn to group tests and create dependencies between test groups.
requirements:
- Create test groups (smoke, regression, sanity)
- Use @Test(groups = {})
- Include/exclude groups in XML
- Create group dependencies
- Run specific groups
testcases:
- input: "Run tests by groups"
  output: "Should execute only specified groups"
hints:
- Use groups attribute in @Test
- Multiple groups: groups = {"smoke", "regression"}
- Use dependsOnGroups for group dependencies
- Configure groups in testng.xml
- Use <groups> tag in XML
solution:
```java
import org.testng.annotations.Test;
import org.testng.Assert;

public class GroupedTests {
    
    @Test(groups = {"smoke", "login"})
    public void testQuickLogin() {
        System.out.println("Running: Quick Login Test (Smoke)");
        Assert.assertTrue(true);
        System.out.println("✓ Smoke test passed");
    }
    
    @Test(groups = {"regression", "login"})
    public void testDetailedLogin() {
        System.out.println("Running: Detailed Login Test (Regression)");
        Assert.assertTrue(true);
        System.out.println("✓ Regression test passed");
    }
    
    @Test(groups = {"smoke", "search"})
    public void testQuickSearch() {
        System.out.println("Running: Quick Search Test (Smoke)");
        Assert.assertTrue(true);
        System.out.println("✓ Smoke test passed");
    }
    
    @Test(groups = {"regression", "search"}, dependsOnGroups = {"login"})
    public void testAdvancedSearch() {
        System.out.println("Running: Advanced Search Test (Regression)");
        System.out.println("  Depends on: login group");
        Assert.assertTrue(true);
        System.out.println("✓ Regression test passed");
    }
    
    @Test(groups = {"sanity"})
    public void testCriticalPath() {
        System.out.println("Running: Critical Path Test (Sanity)");
        Assert.assertTrue(true);
        System.out.println("✓ Sanity test passed");
    }
}
```

```xml
<!-- testng-groups.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Grouped Test Suite">
    
    <!-- Run only smoke tests -->
    <test name="Smoke Test Suite">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="GroupedTests"/>
        </classes>
    </test>
    
    <!-- Run regression excluding smoke -->
    <test name="Regression Test Suite">
        <groups>
            <run>
                <include name="regression"/>
                <exclude name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="GroupedTests"/>
        </classes>
    </test>
    
</suite>
```
\```
```

---

## Day 30: Advanced Page Object Model

### Exercise 3: Page Factory with Lazy Initialization

```exercise
title: Implement Advanced POM with Page Factory
description: Create sophisticated page objects using Page Factory and lazy initialization.
requirements:
- Use @FindBy with different strategies
- Implement @CacheLookup
- Create page factory methods
- Use @FindAll and @FindBys
- Implement fluent interface
testcases:
- input: "Use advanced POM features"
  output: "Should efficiently locate and interact with elements"
hints:
- @FindBy(how = How.ID, using = "elementId")
- @CacheLookup for static elements
- @FindAll for OR condition
- @FindBys for AND condition (chaining)
- Return 'this' for method chaining
solution:
```java
// AdvancedLoginPage.java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.*;
import java.util.List;

public class AdvancedLoginPage {
    private WebDriver driver;
    
    // Simple @FindBy
    @FindBy(id = "user-name")
    @CacheLookup
    private WebElement usernameField;
    
    // Using How enum
    @FindBy(how = How.ID, using = "password")
    private WebElement passwordField;
    
    // Using CSS
    @FindBy(css = "#login-button")
    private WebElement loginButton;
    
    // @FindAll - OR condition (finds first match)
    @FindAll({
        @FindBy(id = "error"),
        @FindBy(className = "error-message"),
        @FindBy(xpath = "//div[@class='error']")
    })
    private WebElement errorMessage;
    
    // @FindBys - AND condition (chaining)
    @FindBys({
        @FindBy(className = "form-group"),
        @FindBy(tagName = "input")
    })
    private List<WebElement> formInputs;
    
    // List of elements
    @FindBy(className = "login-option")
    private List<WebElement> loginOptions;
    
    // Constructor with PageFactory
    public AdvancedLoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    // Fluent interface methods
    public AdvancedLoginPage enterUsername(String username) {
        usernameField.clear();
        usernameField.sendKeys(username);
        System.out.println("✓ Username entered: " + username);
        return this;
    }
    
    public AdvancedLoginPage enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
        System.out.println("✓ Password entered");
        return this;
    }
    
    public AdvancedLoginPage clickLogin() {
        loginButton.click();
        System.out.println("✓ Login button clicked");
        return this;
    }
    
    // Verification methods
    public boolean isErrorDisplayed() {
        try {
            return errorMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getErrorText() {
        return errorMessage.getText();
    }
    
    public int getFormInputCount() {
        return formInputs.size();
    }
    
    public int getLoginOptionsCount() {
        return loginOptions.size();
    }
    
    // Complete login action
    public void performLogin(String username, String password) {
        enterUsername(username)
            .enterPassword(password)
            .clickLogin();
    }
}

// Test class
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class AdvancedPOMTest {
    private WebDriver driver;
    private AdvancedLoginPage loginPage;
    
    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.saucedemo.com");
        loginPage = new AdvancedLoginPage(driver);
    }
    
    @Test
    public void testFluentInterface() {
        System.out.println("\nTest: Fluent Interface");
        
        loginPage.enterUsername("standard_user")
                .enterPassword("secret_sauce")
                .clickLogin();
        
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        Assert.assertTrue(driver.getCurrentUrl().contains("inventory"));
        System.out.println("✓ Fluent interface test passed");
    }
    
    @Test
    public void testErrorHandling() {
        System.out.println("\nTest: Error Handling");
        
        loginPage.performLogin("invalid_user", "wrong_pass");
        
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        Assert.assertTrue(loginPage.isErrorDisplayed());
        System.out.println("✓ Error displayed: " + loginPage.getErrorText());
    }
    
    @Test
    public void testElementCounts() {
        System.out.println("\nTest: Element Counts");
        
        int inputCount = loginPage.getFormInputCount();
        System.out.println("Form inputs found: " + inputCount);
        Assert.assertTrue(inputCount > 0);
        
        System.out.println("✓ Element count test passed");
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 31: TestNG Listeners

### Exercise 4: Implement TestNG Listeners

```exercise
title: Create Custom TestNG Listeners
description: Learn to implement and use TestNG listeners for test monitoring and reporting.
requirements:
- Implement ITestListener
- Override listener methods
- Capture test results
- Take screenshots on failure
- Generate custom logs
testcases:
- input: "Run tests with listeners"
  output: "Should log test execution details"
hints:
- Implement ITestListener interface
- Override onTestStart, onTestSuccess, onTestFailure
- Use @Listeners annotation
- Access ITestResult for test info
- Take screenshots in onTestFailure
solution:
```java
// CustomTestListener.java
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomTestListener implements ITestListener {
    
    @Override
    public void onStart(ITestContext context) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("TEST SUITE STARTED: " + context.getName());
        System.out.println("=".repeat(60));
    }
    
    @Override
    public void onFinish(ITestContext context) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("TEST SUITE FINISHED: " + context.getName());
        System.out.println("Total tests run: " + context.getAllTestMethods().length);
        System.out.println("Passed: " + context.getPassedTests().size());
        System.out.println("Failed: " + context.getFailedTests().size());
        System.out.println("Skipped: " + context.getSkippedTests().size());
        System.out.println("=".repeat(60) + "\n");
    }
    
    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("\n▶ STARTING: " + result.getMethod().getMethodName());
        System.out.println("  Class: " + result.getTestClass().getName());
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        long duration = result.getEndMillis() - result.getStartMillis();
        System.out.println("✓ PASSED: " + result.getMethod().getMethodName());
        System.out.println("  Duration: " + duration + " ms");
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("✗ FAILED: " + result.getMethod().getMethodName());
        System.out.println("  Reason: " + result.getThrowable().getMessage());
        
        // Take screenshot on failure
        Object testClass = result.getInstance();
        WebDriver driver = null;
        
        try {
            driver = (WebDriver) testClass.getClass()
                .getDeclaredField("driver")
                .get(testClass);
            
            if (driver != null) {
                takeScreenshot(driver, result.getMethod().getMethodName());
            }
        } catch (Exception e) {
            System.out.println("  Could not capture screenshot: " + e.getMessage());
        }
    }
    
    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("⊘ SKIPPED: " + result.getMethod().getMethodName());
        System.out.println("  Reason: " + result.getThrowable().getMessage());
    }
    
    @Override
    public void onTestFailedButWithinSuccessPercentage(ITestResult result) {
        System.out.println("⚠ FAILED (within success %): " + 
            result.getMethod().getMethodName());
    }
    
    private void takeScreenshot(WebDriver driver, String testName) {
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss")
                .format(new Date());
            File destFile = new File("test-output/screenshots/FAILED_" + 
                testName + "_" + timestamp + ".png");
            destFile.getParentFile().mkdirs();
            FileUtils.copyFile(sourceFile, destFile);
            System.out.println("  Screenshot saved: " + destFile.getName());
        } catch (Exception e) {
            System.out.println("  Screenshot failed: " + e.getMessage());
        }
    }
}

// Test class using listener
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

@Listeners(CustomTestListener.class)
public class ListenerTest {
    public WebDriver driver;  // Public for listener access
    
    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @Test
    public void testPass() {
        driver.get("https://www.google.com");
        Assert.assertTrue(driver.getTitle().contains("Google"));
    }
    
    @Test
    public void testFail() {
        driver.get("https://www.google.com");
        Assert.assertTrue(driver.getTitle().contains("Yahoo")); // Will fail
    }
    
    @Test(dependsOnMethods = "testFail")
    public void testSkip() {
        Assert.assertTrue(true);
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 32: Data-Driven Testing Advanced

### Exercise 5: Excel Data Provider

```exercise
title: Read Test Data from Excel Files
description: Learn to create data providers that read from Excel files for comprehensive data-driven testing.
requirements:
- Read data from Excel file
- Create DataProvider from Excel
- Handle multiple sheets
- Support different data types
- Handle empty cells
testcases:
- input: "Run tests with Excel data"
  output: "Should execute tests with data from Excel"
hints:
- Use Apache POI library
- Read XSSFWorkbook for .xlsx files
- Iterate through rows and cells
- Convert cell values to appropriate types
- Return Object[][] from DataProvider
solution:
```java
// ExcelUtils.java
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelUtils {
    
    public static Object[][] getExcelData(String filePath, String sheetName) {
        Object[][] data = null;
        
        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {
            
            Sheet sheet = workbook.getSheet(sheetName);
            int rowCount = sheet.getLastRowNum();
            int colCount = sheet.getRow(0).getLastCellNum();
            
            data = new Object[rowCount][colCount];
            
            for (int i = 1; i <= rowCount; i++) {
                Row row = sheet.getRow(i);
                for (int j = 0; j < colCount; j++) {
                    Cell cell = row.getCell(j);
                    data[i-1][j] = getCellValue(cell);
                }
            }
            
            System.out.println("✓ Excel data loaded: " + rowCount + " rows, " + 
                colCount + " columns");
            
        } catch (Exception e) {
            System.out.println("Error reading Excel: " + e.getMessage());
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
    
    public static void createSampleExcel(String filePath) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("LoginData");
            
            // Create header row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Username");
            headerRow.createCell(1).setCellValue("Password");
            headerRow.createCell(2).setCellValue("ExpectedResult");
            
            // Create data rows
            String[][] testData = {
                {"standard_user", "secret_sauce", "success"},
                {"locked_out_user", "secret_sauce", "failure"},
                {"problem_user", "secret_sauce", "success"},
                {"invalid_user", "wrong_password", "failure"}
            };
            
            for (int i = 0; i < testData.length; i++) {
                Row row = sheet.createRow(i + 1);
                for (int j = 0; j < testData[i].length; j++) {
                    row.createCell(j).setCellValue(testData[i][j]);
                }
            }
            
            // Auto-size columns
            for (int i = 0; i < 3; i++) {
                sheet.autoSizeColumn(i);
            }
            
            // Write to file
            java.io.FileOutputStream fos = new java.io.FileOutputStream(filePath);
            workbook.write(fos);
            fos.close();
            
            System.out.println("✓ Sample Excel file created: " + filePath);
            
        } catch (Exception e) {
            System.out.println("Error creating Excel: " + e.getMessage());
        }
    }
}

// Test class using Excel data
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class ExcelDataDrivenTest {
    private WebDriver driver;
    private static final String EXCEL_FILE = "testdata/login-data.xlsx";
    
    @BeforeClass
    public void setupExcel() {
        // Create sample Excel file
        new java.io.File("testdata").mkdirs();
        ExcelUtils.createSampleExcel(EXCEL_FILE);
    }
    
    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @DataProvider(name = "excelData")
    public Object[][] getTestData() {
        return ExcelUtils.getExcelData(EXCEL_FILE, "LoginData");
    }
    
    @Test(dataProvider = "excelData")
    public void testLoginWithExcelData(String username, String password, 
                                      String expectedResult) {
        System.out.println("\nTesting: " + username + " | Expected: " + expectedResult);
        
        driver.get("https://www.saucedemo.com");
        
        driver.findElement(By.id("user-name")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("login-button")).click();
        
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        String currentUrl = driver.getCurrentUrl();
        boolean loginSuccessful = currentUrl.contains("inventory");
        
        if (expectedResult.equals("success")) {
            Assert.assertTrue(loginSuccessful, 
                "Login should succeed for " + username);
            System.out.println("✓ Login successful as expected");
        } else {
            Assert.assertFalse(loginSuccessful, 
                "Login should fail for " + username);
            System.out.println("✓ Login failed as expected");
        }
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 33: Parallel Test Execution

### Exercise 6: Run Tests in Parallel

```exercise
title: Execute Tests in Parallel for Faster Execution
description: Learn to configure and run tests in parallel using TestNG.
requirements:
- Configure parallel execution in XML
- Use ThreadLocal for WebDriver
- Run tests in parallel by methods
- Run tests in parallel by classes
- Handle thread safety
testcases:
- input: "Run tests in parallel"
  output: "Should execute multiple tests simultaneously"
hints:
- Use parallel="methods" or parallel="classes"
- Set thread-count in testng.xml
- Use ThreadLocal<WebDriver> for thread safety
- Each thread gets its own driver instance
- Synchronize shared resources
solution:
```java
// ThreadLocalDriver.java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ThreadLocalDriver {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    public static WebDriver getDriver() {
        if (driver.get() == null) {
            driver.set(new ChromeDriver());
            driver.get().manage().window().maximize();
        }
        return driver.get();
    }
    
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}

// ParallelBaseTest.java
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class ParallelBaseTest {
    protected WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        driver = ThreadLocalDriver.getDriver();
        System.out.println("Thread: " + Thread.currentThread().getId() + 
            " - Driver initialized");
    }
    
    @AfterMethod
    public void tearDown() {
        ThreadLocalDriver.quitDriver();
        System.out.println("Thread: " + Thread.currentThread().getId() + 
            " - Driver closed");
    }
}

// ParallelTest1.java
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ParallelTest1 extends ParallelBaseTest {
    
    @Test
    public void testGoogle() {
        System.out.println("Test1 - Thread: " + Thread.currentThread().getId());
        driver.get("https://www.google.com");
        Assert.assertTrue(driver.getTitle().contains("Google"));
        System.out.println("✓ Google test passed");
    }
    
    @Test
    public void testSelenium() {
        System.out.println("Test2 - Thread: " + Thread.currentThread().getId());
        driver.get("https://www.selenium.dev");
        Assert.assertTrue(driver.getTitle().contains("Selenium"));
        System.out.println("✓ Selenium test passed");
    }
}

// ParallelTest2.java
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ParallelTest2 extends ParallelBaseTest {
    
    @Test
    public void testWikipedia() {
        System.out.println("Test3 - Thread: " + Thread.currentThread().getId());
        driver.get("https://www.wikipedia.org");
        Assert.assertTrue(driver.getTitle().contains("Wikipedia"));
        System.out.println("✓ Wikipedia test passed");
    }
    
    @Test
    public void testGitHub() {
        System.out.println("Test4 - Thread: " + Thread.currentThread().getId());
        driver.get("https://github.com");
        Assert.assertTrue(driver.getTitle().contains("GitHub"));
        System.out.println("✓ GitHub test passed");
    }
}
```

```xml
<!-- testng-parallel.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<!-- Parallel by methods -->
<suite name="Parallel Test Suite" parallel="methods" thread-count="4">
    <test name="Parallel Tests">
        <classes>
            <class name="ParallelTest1"/>
            <class name="ParallelTest2"/>
        </classes>
    </test>
</suite>

<!-- Alternative: Parallel by classes -->
<!--
<suite name="Parallel Test Suite" parallel="classes" thread-count="2">
    <test name="Parallel Tests">
        <classes>
            <class name="ParallelTest1"/>
            <class name="ParallelTest2"/>
        </classes>
    </test>
</suite>
-->
```
\```
```

---

## Day 34: Reporting with ExtentReports

### Exercise 7: Generate HTML Reports

```exercise
title: Create Detailed HTML Reports with ExtentReports
description: Learn to generate comprehensive test reports using ExtentReports library.
requirements:
- Add ExtentReports dependency
- Create ExtentReports instance
- Log test steps
- Add screenshots to report
- Generate HTML report
testcases:
- input: "Run tests with reporting"
  output: "Should generate detailed HTML report"
hints:
- Use ExtentSparkReporter for HTML
- Create ExtentTest for each test
- Use log() to add steps
- Attach screenshots with addScreenCaptureFromPath()
- Call flush() to write report
solution:
```java
// ExtentManager.java
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

public class ExtentManager {
    private static ExtentReports extent;
    
    public static ExtentReports getInstance() {
        if (extent == null) {
            createInstance("test-output/ExtentReport.html");
        }
        return extent;
    }
    
    private static ExtentReports createInstance(String fileName) {
        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(fileName);
        
        sparkReporter.config().setTheme(Theme.STANDARD);
        sparkReporter.config().setDocumentTitle("Automation Test Report");
        sparkReporter.config().setReportName("Test Execution Report");
        sparkReporter.config().setTimeStampFormat("MMM dd, yyyy HH:mm:ss");
        
        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);
        extent.setSystemInfo("OS", System.getProperty("os.name"));
        extent.setSystemInfo("User", System.getProperty("user.name"));
        extent.setSystemInfo("Java Version", System.getProperty("java.version"));
        
        return extent;
    }
}

// ExtentTestListener.java
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class ExtentTestListener implements ITestListener {
    private static ExtentReports extent = ExtentManager.getInstance();
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();
    
    @Override
    public void onTestStart(ITestResult result) {
        ExtentTest extentTest = extent.createTest(result.getMethod().getMethodName());
        test.set(extentTest);
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        test.get().log(Status.PASS, "Test Passed");
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        test.get().log(Status.FAIL, "Test Failed");
        test.get().log(Status.FAIL, result.getThrowable());
    }
    
    @Override
    public void onTestSkipped(ITestResult result) {
        test.get().log(Status.SKIP, "Test Skipped");
    }
    
    @Override
    public void onFinish(ITestContext context) {
        extent.flush();
    }
    
    public static ExtentTest getTest() {
        return test.get();
    }
}

// Test with ExtentReports
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import com.aventstack.extentreports.Status;

@Listeners(ExtentTestListener.class)
public class ExtentReportTest {
    private WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        ExtentTestListener.getTest().log(Status.INFO, "Browser initialized");
    }
    
    @Test
    public void testGoogleSearch() {
        ExtentTestListener.getTest().log(Status.INFO, "Starting Google search test");
        
        driver.get("https://www.google.com");
        ExtentTestListener.getTest().log(Status.INFO, "Navigated to Google");
        
        String title = driver.getTitle();
        ExtentTestListener.getTest().log(Status.INFO, "Page title: " + title);
        
        Assert.assertTrue(title.contains("Google"));
        ExtentTestListener.getTest().log(Status.PASS, "Title assertion passed");
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
            ExtentTestListener.getTest().log(Status.INFO, "Browser closed");
        }
    }
}
```
\```
```

---

## Day 35: Review & Mini Framework

### Exercise 8: Build Mini Test Framework

```exercise
title: Create Complete Mini Framework
description: Integrate all Week 5 concepts into a cohesive test framework.
requirements:
- Organize framework structure
- Implement base classes
- Create page objects
- Add utilities
- Configure TestNG XML
- Generate reports
testcases:
- input: "Run complete framework"
  output: "Should execute organized test suite"
hints:
- Use package structure
- Separate concerns (pages, tests, utils)
- Use configuration files
- Implement logging
- Add reporting
solution:
```java
// Framework Structure:
// src/main/java/
//   ├── pages/
//   │   ├── BasePage.java
//   │   ├── LoginPage.java
//   │   └── HomePage.java
//   ├── utils/
//   │   ├── ConfigReader.java
//   │   ├── ExcelUtils.java
//   │   └── ScreenshotUtils.java
//   └── listeners/
//       └── TestListener.java
// src/test/java/
//   ├── base/
//   │   └── BaseTest.java
//   └── tests/
//       ├── LoginTests.java
//       └── ProductTests.java

// ConfigReader.java
package utils;

import java.io.FileInputStream;
import java.util.Properties;

public class ConfigReader {
    private static Properties properties;
    
    static {
        try {
            properties = new Properties();
            FileInputStream fis = new FileInputStream("config.properties");
            properties.load(fis);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static String getProperty(String key) {
        return properties.getProperty(key);
    }
}

// BaseTest.java
package base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;
import utils.ConfigReader;

public class BaseTest {
    protected WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get(ConfigReader.getProperty("baseUrl"));
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

// Complete test example
package tests;

import base.BaseTest;
import pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class LoginTests extends BaseTest {
    
    @Test(priority = 1, groups = {"smoke"})
    public void testValidLogin() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("standard_user", "secret_sauce");
        
        Assert.assertTrue(driver.getCurrentUrl().contains("inventory"));
    }
    
    @Test(priority = 2, groups = {"regression"})
    public void testInvalidLogin() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("invalid", "wrong");
        
        Assert.assertTrue(loginPage.isErrorDisplayed());
    }
}
```

```properties
# config.properties
baseUrl=https://www.saucedemo.com
browser=chrome
timeout=10
headless=false
```

```xml
<!-- testng.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Mini Framework Suite">
    <listeners>
        <listener class-name="listeners.TestListener"/>
    </listeners>
    
    <test name="Smoke Tests">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="tests.LoginTests"/>
        </classes>
    </test>
</suite>
```
\```
```

---

## Summary

Congratulations! You've completed Week 5 of TestNG & POM Advanced. You've learned:

### Day 29: TestNG XML Configuration
- ✅ Creating testng.xml files
- ✅ Configuring test suites
- ✅ Using parameters
- ✅ Test groups and dependencies

### Day 30: Advanced POM
- ✅ Page Factory with @FindBy
- ✅ @CacheLookup optimization
- ✅ @FindAll and @FindBys
- ✅ Fluent interface pattern

### Day 31: TestNG Listeners
- ✅ ITestListener implementation
- ✅ Test lifecycle hooks
- ✅ Screenshot on failure
- ✅ Custom logging

### Day 32: Data-Driven Testing
- ✅ Excel data providers
- ✅ Apache POI integration
- ✅ Dynamic test data
- ✅ Multiple data sources

### Day 33: Parallel Execution
- ✅ ThreadLocal for thread safety
- ✅ Parallel by methods/classes
- ✅ Thread management
- ✅ Performance optimization

### Day 34: ExtentReports
- ✅ HTML report generation
- ✅ Test step logging
- ✅ Screenshot attachment
- ✅ Professional reporting

### Day 35: Mini Framework
- ✅ Framework organization
- ✅ Configuration management
- ✅ Utility classes
- ✅ Complete integration

### Next Steps
- Build your own framework
- Explore CI/CD integration
- Move on to Week 6 for framework building
- Practice with real projects

**Excellent Work! 🎉**

---

# Days 29-30: Actions Class - Advanced Mouse & Keyboard Operations

# Selenium Week 4: Days 29-30 - Actions Class Advanced Operations

**Beginner-Friendly Selenium Exercises**

---

## Table of Contents
- [Day 29: Actions Class - Mouse Operations](#day-29-actions-class---mouse-operations)
  - [Exercise 1: Hover Menu Navigation](#exercise-1-hover-menu-navigation-20-minutes)
  - [Exercise 2: Drag and Drop Operations](#exercise-2-drag-and-drop-operations-25-minutes)
  - [Exercise 3: Right-Click Context Menus](#exercise-3-right-click-context-menus-20-minutes)
  - [Exercise 4: Double-Click Text Selection](#exercise-4-double-click-text-selection-25-minutes)
  - [Exercise 5: Slider Control with Mouse](#exercise-5-slider-control-with-mouse-30-minutes)
- [Day 30: Actions Class - Keyboard Operations](#day-30-actions-class---keyboard-operations)
  - [Exercise 1: Basic Keyboard Shortcuts](#exercise-1-basic-keyboard-shortcuts-20-minutes)
  - [Exercise 2: Text Selection and Manipulation](#exercise-2-text-selection-and-manipulation-25-minutes)
  - [Exercise 3: Form Navigation with Tab](#exercise-3-form-navigation-with-tab-25-minutes)
  - [Exercise 4: Multiple Modifier Keys](#exercise-4-multiple-modifier-keys-30-minutes)
  - [Exercise 5: Keyboard-Based Navigation](#exercise-5-keyboard-based-navigation-30-minutes)
- [Bonus: Combined Mouse and Keyboard Exercises](#bonus-combined-mouse-and-keyboard-exercises)

---

# Day 29: Actions Class - Mouse Operations

## Overview
Today, you'll master advanced mouse operations using Selenium's Actions class. You'll learn to simulate real user mouse interactions including hovering, dragging, dropping, right-clicking, and double-clicking.

**Prerequisites:**
- Basic Selenium WebDriver knowledge
- Understanding of locators (ID, XPath, CSS Selector)
- Java fundamentals

**Learning Objectives:**
- Understand the Actions class architecture
- Perform hover operations on menus
- Execute drag-and-drop operations
- Handle context menus with right-click
- Use double-click for text selection
- Control sliders and moveable elements

---

## Exercise 1: Hover Menu Navigation (20 minutes)

### Learning Objectives
- Understand how `moveToElement()` works
- Handle hover-activated dropdown menus
- Chain mouse movements for nested menus
- Use explicit waits with Actions class

### Concept Explanation

The `moveToElement()` method simulates moving the mouse cursor to the center of a specified element. This is crucial for:
- **Dropdown Menus**: Many websites hide menu options until you hover over the parent menu
- **Tooltips**: Hovering reveals additional information
- **Dynamic Content**: Some elements load content on hover

**Key Methods:**
```java
actions.moveToElement(element).perform();        // Hover over element
actions.moveToElement(menu).click(item).perform(); // Hover and click
actions.moveToElement(element).pause(Duration.ofMillis(500)).perform(); // Hover with pause
```

**Important Notes:**
1. Always call `.perform()` to execute the action
2. Use `WebDriverWait` to ensure elements are visible before hovering
3. Some menus need a small pause before submenus appear
4. The `pause()` method (Selenium 4+) is better than `Thread.sleep()`

### Step-by-Step Exercise

**Scenario:** Navigate Amazon's hover menu to access "Your Orders"

```java
package day29.exercises;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

/**
 * Exercise 1: Hover Menu Navigation
 *
 * Objective: Learn to hover over menu items and click on submenu options
 *
 * Steps:
 * 1. Navigate to Amazon
 * 2. Hover over "Account & Lists"
 * 3. Wait for dropdown menu to appear
 * 4. Click on "Your Orders"
 * 5. Verify navigation
 */
public class Exercise1_HoverMenuNavigation {

    public static void main(String[] args) {
        // Setup ChromeDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        // Initialize Actions class - required for all mouse operations
        Actions actions = new Actions(driver);

        // Initialize explicit wait for dynamic elements
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // Step 1: Maximize window for better visibility
            driver.manage().window().maximize();

            // Step 2: Navigate to Amazon
            System.out.println("Step 1: Navigating to Amazon...");
            driver.get("https://www.amazon.com");

            // Step 3: Locate the "Account & Lists" menu
            // Using explicit wait to ensure element is present
            System.out.println("Step 2: Locating Account & Lists menu...");
            WebElement accountMenu = wait.until(
                ExpectedConditions.presenceOfElementLocated(
                    By.id("nav-link-accountList")
                )
            );

            System.out.println("Menu element found: " + accountMenu.getText());

            // Step 4: Hover over the menu using moveToElement()
            // This simulates moving mouse cursor to the center of the element
            System.out.println("Step 3: Hovering over Account menu...");
            actions.moveToElement(accountMenu).perform();

            // Step 5: Wait for submenu to appear
            // Important: Some menus need time to animate
            System.out.println("Step 4: Waiting for dropdown to appear...");
            Thread.sleep(1000); // Wait for animation

            // Alternative: Use explicit wait for submenu visibility
            WebElement signInButton = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                    By.xpath("//span[contains(text(),'Sign in')]")
                )
            );

            // Step 6: Verify submenu is displayed
            System.out.println("Step 5: Submenu displayed successfully!");
            System.out.println("Sign In button visible: " + signInButton.isDisplayed());

            // Step 7: Find and click "Your Orders" (if signed in)
            // This demonstrates hovering and clicking in one action chain
            try {
                WebElement yourOrders = driver.findElement(
                    By.xpath("//span[text()='Your Orders']")
                );

                System.out.println("Step 6: Clicking on 'Your Orders'...");
                actions.moveToElement(yourOrders).click().perform();

                // Wait for page to load
                Thread.sleep(2000);

                // Verify navigation
                String currentUrl = driver.getCurrentUrl();
                System.out.println("Current URL: " + currentUrl);

                if (currentUrl.contains("your-orders") || currentUrl.contains("signin")) {
                    System.out.println("✓ Navigation successful!");
                } else {
                    System.out.println("✗ Navigation may have failed");
                }

            } catch (Exception e) {
                System.out.println("Note: 'Your Orders' requires sign-in");
            }

            // Step 8: Demonstrate hover tooltip
            System.out.println("\nBonus: Demonstrating hover tooltip...");
            driver.get("https://www.amazon.com");

            // Find search button and hover to see tooltip
            WebElement searchButton = driver.findElement(By.id("nav-search-submit-button"));
            actions.moveToElement(searchButton).perform();

            Thread.sleep(1000);
            System.out.println("Hovered over search button - tooltip may appear");

        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            // Clean up
            System.out.println("\nExercise completed!");
            driver.quit();
        }
    }
}
```

### Expected Output
```
Step 1: Navigating to Amazon...
Step 2: Locating Account & Lists menu...
Menu element found: Hello, Sign in
Account & Lists
Step 3: Hovering over Account menu...
Step 4: Waiting for dropdown to appear...
Step 5: Submenu displayed successfully!
Sign In button visible: true
Note: 'Your Orders' requires sign-in

Bonus: Demonstrating hover tooltip...
Hovered over search button - tooltip may appear

Exercise completed!
```

### Success Criteria Checklist
- [ ] Browser opens and navigates to Amazon
- [ ] "Account & Lists" menu is located successfully
- [ ] Hover action displays the dropdown menu
- [ ] Submenu items are visible
- [ ] No exceptions thrown during execution
- [ ] Browser closes properly

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Forgetting `.perform()` | Actions don't execute without it | Always end action chain with `.perform()` |
| No wait before hover | Element may not be ready | Use `WebDriverWait` before hovering |
| Immediate click after hover | Menu animation not complete | Add small pause or explicit wait |
| Using `element.click()` instead of `actions.click()` | Breaks action chain context | Use Actions class methods consistently |
| Not handling `StaleElementReferenceException` | DOM changes after finding element | Re-locate element or use fresh locators |

### Challenge Tasks
1. **Multi-Level Menu**: Navigate through a 3-level nested menu (Main > Category > Subcategory)
2. **Hover Tooltip Extraction**: Hover over an element and extract the tooltip text
3. **Menu Close Detection**: Verify the menu closes when mouse moves away
4. **Retry Logic**: Implement retry mechanism if hover fails due to timing issues
5. **Cross-Browser**: Test the same code on Firefox and Edge browsers

---

## Exercise 2: Drag and Drop Operations (25 minutes)

### Learning Objectives
- Understand drag-and-drop mechanics
- Use `clickAndHold()`, `moveToElement()`, and `release()`
- Implement `dragAndDrop()` shortcut method
- Verify drag-and-drop success
- Handle common drag-and-drop failures

### Concept Explanation

Drag-and-drop is a complex mouse operation involving three phases:
1. **Click and Hold**: Press mouse button on source element
2. **Move**: Drag element to target location
3. **Release**: Release mouse button to drop

**Three Methods to Implement Drag-Drop:**

```java
// Method 1: Using dragAndDrop() - Simplest
actions.dragAndDrop(sourceElement, targetElement).perform();

// Method 2: Using clickAndHold() and release() - More control
actions.clickAndHold(sourceElement)
       .moveToElement(targetElement)
       .release()
       .perform();

// Method 3: Using dragAndDropBy() for coordinates
actions.dragAndDropBy(element, xOffset, yOffset).perform();
```

**When to Use Each Method:**
- **dragAndDrop()**: Standard cases, simple implementation
- **clickAndHold() + release()**: Need to add pauses or verify during drag
- **dragAndDropBy()**: Drag to specific coordinates, not another element

### Step-by-Step Exercise

**Scenario:** Drag and drop elements on jQuery UI demo page

```java
package day29.exercises;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

/**
 * Exercise 2: Drag and Drop Operations
 *
 * Objective: Master different drag-and-drop techniques
 *
 * Steps:
 * 1. Navigate to jQuery UI Droppable demo
 * 2. Perform drag-and-drop using dragAndDrop()
 * 3. Verify drop success by checking text change
 * 4. Perform drag-and-drop using clickAndHold() method
 * 5. Compare both approaches
 */
public class Exercise2_DragAndDrop {

    public static void main(String[] args) {
        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

            // Navigate to jQuery UI Droppable demo
            System.out.println("=== Drag and Drop Exercise ===\n");
            System.out.println("Step 1: Navigating to jQuery UI Demo...");
            driver.get("https://jqueryui.com/droppable/");

            // jQuery UI demo is inside an iframe - must switch to it
            System.out.println("Step 2: Switching to iframe...");
            WebElement iframe = driver.findElement(By.className("demo-frame"));
            driver.switchTo().frame(iframe);
            System.out.println("Successfully switched to iframe");

            // Locate source (draggable) and target (droppable) elements
            System.out.println("\nStep 3: Locating drag and drop elements...");
            WebElement draggableElement = driver.findElement(By.id("draggable"));
            WebElement droppableElement = driver.findElement(By.id("droppable"));

            // Display initial state
            System.out.println("Draggable element: " + draggableElement.getText());
            System.out.println("Droppable element text BEFORE: " + droppableElement.getText());
            String initialBackgroundColor = droppableElement.getCssValue("background-color");
            System.out.println("Droppable background color BEFORE: " + initialBackgroundColor);

            // Get initial positions for verification
            int dragX = draggableElement.getLocation().getX();
            int dragY = draggableElement.getLocation().getY();
            System.out.println("Draggable position: (" + dragX + ", " + dragY + ")");

            // ===================================================================
            // METHOD 1: Using dragAndDrop() - Simple and recommended
            // ===================================================================
            System.out.println("\n=== Method 1: Using dragAndDrop() ===");
            System.out.println("Step 4: Performing drag and drop...");

            actions.dragAndDrop(draggableElement, droppableElement).perform();

            // Wait for animation to complete
            Thread.sleep(1000);

            // Verify the drop
            String afterDropText = droppableElement.getText();
            String afterDropColor = droppableElement.getCssValue("background-color");

            System.out.println("Droppable element text AFTER: " + afterDropText);
            System.out.println("Droppable background color AFTER: " + afterDropColor);

            // Validation
            if (afterDropText.equals("Dropped!")) {
                System.out.println("✓ Drag and drop SUCCESSFUL!");
                System.out.println("  Text changed from 'Drop here' to 'Dropped!'");
            } else {
                System.out.println("✗ Drag and drop may have failed");
            }

            // Refresh page for next method
            driver.navigate().refresh();
            Thread.sleep(1000);
            driver.switchTo().frame(iframe);

            // Re-locate elements after refresh
            draggableElement = driver.findElement(By.id("draggable"));
            droppableElement = driver.findElement(By.id("droppable"));

            // ===================================================================
            // METHOD 2: Using clickAndHold(), moveToElement(), and release()
            // ===================================================================
            System.out.println("\n=== Method 2: Using clickAndHold() + release() ===");
            System.out.println("This method gives more control over the drag process");

            System.out.println("Step 5: Click and hold on draggable element...");
            actions.clickAndHold(draggableElement).perform();
            Thread.sleep(500); // Pause while holding

            System.out.println("Step 6: Moving to droppable element...");
            actions.moveToElement(droppableElement).perform();
            Thread.sleep(500); // Pause over target

            System.out.println("Step 7: Releasing mouse button...");
            actions.release().perform();
            Thread.sleep(1000);

            // Verify again
            String finalText = droppableElement.getText();
            System.out.println("Final text: " + finalText);

            if (finalText.equals("Dropped!")) {
                System.out.println("✓ Method 2 also SUCCESSFUL!");
            }

            // ===================================================================
            // METHOD 3: Using dragAndDropBy() for precise offset
            // ===================================================================
            System.out.println("\n=== Method 3: Using dragAndDropBy() ===");
            driver.navigate().refresh();
            Thread.sleep(1000);
            driver.switchTo().frame(iframe);

            draggableElement = driver.findElement(By.id("draggable"));
            droppableElement = driver.findElement(By.id("droppable"));

            // Calculate offset needed to move from draggable to droppable
            int sourceX = draggableElement.getLocation().getX();
            int sourceY = draggableElement.getLocation().getY();
            int targetX = droppableElement.getLocation().getX();
            int targetY = droppableElement.getLocation().getY();

            int xOffset = targetX - sourceX;
            int yOffset = targetY - sourceY;

            System.out.println("Calculated offset: (" + xOffset + ", " + yOffset + ")");
            System.out.println("Step 8: Dragging by calculated offset...");

            actions.dragAndDropBy(draggableElement, xOffset, yOffset).perform();
            Thread.sleep(1000);

            // Final verification
            String offsetMethodText = droppableElement.getText();
            System.out.println("Result: " + offsetMethodText);

            if (offsetMethodText.equals("Dropped!")) {
                System.out.println("✓ Method 3 (offset) also SUCCESSFUL!");
            }

            // ===================================================================
            // BONUS: Demonstrate slow, controlled drag
            // ===================================================================
            System.out.println("\n=== Bonus: Slow, Controlled Drag ===");
            driver.navigate().refresh();
            Thread.sleep(1000);
            driver.switchTo().frame(iframe);

            draggableElement = driver.findElement(By.id("draggable"));
            droppableElement = driver.findElement(By.id("droppable"));

            System.out.println("Performing slow drag with pauses...");
            actions.clickAndHold(draggableElement)
                   .pause(Duration.ofMillis(500))
                   .moveByOffset(xOffset / 2, yOffset / 2) // Move halfway
                   .pause(Duration.ofMillis(500))
                   .moveToElement(droppableElement)       // Move to target
                   .pause(Duration.ofMillis(500))
                   .release()
                   .perform();

            Thread.sleep(1000);
            System.out.println("Slow drag completed!");

            // Summary
            System.out.println("\n=== Exercise Summary ===");
            System.out.println("✓ Learned three different drag-and-drop methods");
            System.out.println("✓ Successfully verified drop actions");
            System.out.println("✓ Understood the importance of pauses");
            System.out.println("✓ Practiced working with iframes");

        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            System.out.println("\nExercise completed!");
            driver.quit();
        }
    }
}
```

### Expected Output
```
=== Drag and Drop Exercise ===

Step 1: Navigating to jQuery UI Demo...
Step 2: Switching to iframe...
Successfully switched to iframe

Step 3: Locating drag and drop elements...
Draggable element: Drag me to my target
Droppable element text BEFORE: Drop here
Droppable background color BEFORE: rgba(222, 184, 135, 1)
Draggable position: (20, 20)

=== Method 1: Using dragAndDrop() ===
Step 4: Performing drag and drop...
Droppable element text AFTER: Dropped!
Droppable background color AFTER: rgba(255, 250, 144, 1)
✓ Drag and drop SUCCESSFUL!
  Text changed from 'Drop here' to 'Dropped!'

=== Method 2: Using clickAndHold() + release() ===
This method gives more control over the drag process
Step 5: Click and hold on draggable element...
Step 6: Moving to droppable element...
Step 7: Releasing mouse button...
Final text: Dropped!
✓ Method 2 also SUCCESSFUL!

=== Method 3: Using dragAndDropBy() ===
Calculated offset: (120, 0)
Step 8: Dragging by calculated offset...
Result: Dropped!
✓ Method 3 (offset) also SUCCESSFUL!

=== Bonus: Slow, Controlled Drag ===
Performing slow drag with pauses...
Slow drag completed!

=== Exercise Summary ===
✓ Learned three different drag-and-drop methods
✓ Successfully verified drop actions
✓ Understood the importance of pauses
✓ Practiced working with iframes

Exercise completed!
```

### Success Criteria Checklist
- [ ] All three drag-and-drop methods execute successfully
- [ ] Drop zone text changes to "Dropped!"
- [ ] Background color of drop zone changes
- [ ] No `ElementNotInteractableException` thrown
- [ ] Slow drag with pauses works smoothly
- [ ] Proper iframe handling

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not switching to iframe | Elements inside iframe not accessible | Use `driver.switchTo().frame()` |
| Forgetting `release()` | Mouse button stays pressed | Always pair `clickAndHold()` with `release()` |
| No wait after drag | Verification happens before animation completes | Add `Thread.sleep()` or explicit wait |
| Wrong offset calculation | Element drops at wrong location | Use element locations to calculate offset |
| Using regular `click()` in drag chain | Breaks the action context | Use Actions class methods throughout |

### Challenge Tasks
1. **Sortable Lists**: Drag list items to reorder them (use jQuery UI Sortable demo)
2. **Multiple Drops**: Drag one element to multiple drop zones in sequence
3. **Drag Back**: After dropping, drag the element back to original position
4. **Verification Suite**: Create methods to verify drag success using color, text, and position
5. **HTML5 Drag-Drop**: Handle HTML5 drag-and-drop using JavaScript executor

---

## Exercise 3: Right-Click Context Menus (20 minutes)

### Learning Objectives
- Understand `contextClick()` method
- Handle context menu interactions
- Navigate through context menu options
- Handle alerts triggered by context menu
- Combine right-click with keyboard navigation

### Concept Explanation

**Context Click (Right-Click)** opens the context menu of an element, similar to how users right-click with a mouse. This is essential for:
- **Custom Context Menus**: Web apps with custom right-click menus
- **File Operations**: Copy, paste, delete operations
- **Menu Navigation**: Selecting options from context menus

**Syntax:**
```java
// Right-click on element
actions.contextClick(element).perform();

// Right-click at current mouse position
actions.contextClick().perform();

// Right-click and navigate with keyboard
actions.contextClick(element)
       .sendKeys(Keys.ARROW_DOWN)
       .sendKeys(Keys.ENTER)
       .perform();
```

**Important Considerations:**
1. Not all elements have context menus
2. Browser default context menu may appear if no custom menu exists
3. Some sites disable right-click (JavaScript: `return false`)
4. Context menus often trigger alerts or JavaScript actions

### Step-by-Step Exercise

**Scenario:** Right-click on elements and interact with context menu

```java
package day29.exercises;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

/**
 * Exercise 3: Right-Click Context Menus
 *
 * Objective: Master right-click operations and context menu handling
 *
 * Steps:
 * 1. Navigate to demo page with custom context menu
 * 2. Right-click on designated area
 * 3. Select options from context menu
 * 4. Handle JavaScript alerts
 * 5. Verify menu actions
 */
public class Exercise3_RightClickContextMenu {

    public static void main(String[] args) {
        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.manage().window().maximize();

            System.out.println("=== Right-Click Context Menu Exercise ===\n");

            // Navigate to demo page with custom context menu
            System.out.println("Step 1: Navigating to jQuery Context Menu demo...");
            driver.get("https://swisnl.github.io/jQuery-contextMenu/demo.html");

            Thread.sleep(2000); // Allow page to load completely

            // Locate the right-click trigger area
            System.out.println("Step 2: Locating right-click trigger area...");
            WebElement rightClickArea = wait.until(
                ExpectedConditions.presenceOfElementLocated(
                    By.xpath("//span[contains(@class, 'context-menu-one')]")
                )
            );

            System.out.println("Found element: " + rightClickArea.getText());

            // ===================================================================
            // SCENARIO 1: Basic Right-Click and Menu Selection
            // ===================================================================
            System.out.println("\n=== Scenario 1: Basic Right-Click ===");
            System.out.println("Step 3: Performing right-click...");

            // Perform context click (right-click)
            actions.contextClick(rightClickArea).perform();

            Thread.sleep(1000); // Wait for menu to appear

            System.out.println("Context menu displayed!");

            // Verify menu appeared by checking for menu items
            WebElement editOption = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                    By.xpath("//span[text()='Edit']")
                )
            );

            System.out.println("Menu options visible");
            System.out.println("Edit option displayed: " + editOption.isDisplayed());

            // Click on "Edit" option
            System.out.println("Step 4: Clicking on 'Edit' option...");
            actions.click(editOption).perform();

            Thread.sleep(500);

            // Handle the JavaScript alert that appears
            System.out.println("Step 5: Handling JavaScript alert...");
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            String alertText = alert.getText();

            System.out.println("Alert text: " + alertText);

            if (alertText.contains("Edit")) {
                System.out.println("✓ Correct alert appeared for Edit action");
            }

            // Accept the alert
            alert.accept();
            System.out.println("Alert accepted");

            // ===================================================================
            // SCENARIO 2: Right-Click and Select Different Option
            // ===================================================================
            System.out.println("\n=== Scenario 2: Selecting 'Copy' Option ===");

            // Right-click again
            System.out.println("Step 6: Right-clicking again...");
            actions.contextClick(rightClickArea).perform();
            Thread.sleep(1000);

            // Click on "Copy" option
            WebElement copyOption = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.xpath("//span[text()='Copy']")
                )
            );

            System.out.println("Step 7: Clicking on 'Copy' option...");
            copyOption.click();

            Thread.sleep(500);

            // Handle alert
            alert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Alert text: " + alert.getText());
            alert.accept();

            System.out.println("✓ Copy action completed");

            // ===================================================================
            // SCENARIO 3: Right-Click on Multiple Elements
            // ===================================================================
            System.out.println("\n=== Scenario 3: Right-Click on Multiple Areas ===");

            // Find all context menu trigger areas
            java.util.List<WebElement> contextAreas = driver.findElements(
                By.xpath("//span[contains(@class, 'context-menu')]")
            );

            System.out.println("Found " + contextAreas.size() + " context menu areas");

            // Right-click on second area if exists
            if (contextAreas.size() > 1) {
                WebElement secondArea = contextAreas.get(1);
                System.out.println("Step 8: Right-clicking on second area...");

                actions.contextClick(secondArea).perform();
                Thread.sleep(1000);

                // Check if menu appeared
                try {
                    WebElement menu = driver.findElement(
                        By.className("context-menu-list")
                    );

                    if (menu.isDisplayed()) {
                        System.out.println("✓ Context menu appeared for second area");

                        // Close menu by clicking elsewhere
                        actions.click(driver.findElement(By.tagName("h1"))).perform();
                        System.out.println("Menu closed");
                    }
                } catch (Exception e) {
                    System.out.println("Note: Second area may have different behavior");
                }
            }

            // ===================================================================
            // SCENARIO 4: Right-Click and Use Keyboard Navigation
            // ===================================================================
            System.out.println("\n=== Scenario 4: Keyboard Navigation in Context Menu ===");

            System.out.println("Step 9: Right-click and navigate with arrow keys...");
            actions.contextClick(rightClickArea).perform();
            Thread.sleep(1000);

            // Navigate down through menu items using arrow keys
            System.out.println("Using DOWN arrow key to navigate...");
            actions.sendKeys(org.openqa.selenium.Keys.ARROW_DOWN)
                   .sendKeys(org.openqa.selenium.Keys.ARROW_DOWN)
                   .sendKeys(org.openqa.selenium.Keys.ENTER)
                   .perform();

            Thread.sleep(500);

            // Handle alert if present
            try {
                alert = driver.switchTo().alert();
                System.out.println("Action selected via keyboard: " + alert.getText());
                alert.accept();
                System.out.println("✓ Keyboard navigation successful");
            } catch (Exception e) {
                System.out.println("Menu closed or no alert triggered");
            }

            // ===================================================================
            // BONUS: Demonstrate Different Menu Options
            // ===================================================================
            System.out.println("\n=== Bonus: Testing All Menu Options ===");

            String[] menuOptions = {"Edit", "Cut", "Copy", "Paste", "Delete"};

            for (String option : menuOptions) {
                try {
                    System.out.println("\nTesting: " + option);

                    // Right-click
                    actions.contextClick(rightClickArea).perform();
                    Thread.sleep(500);

                    // Find and click option
                    WebElement menuItem = wait.until(
                        ExpectedConditions.elementToBeClickable(
                            By.xpath("//span[text()='" + option + "']")
                        )
                    );

                    menuItem.click();
                    Thread.sleep(300);

                    // Handle alert
                    try {
                        alert = driver.switchTo().alert();
                        String message = alert.getText();
                        System.out.println("  Alert: " + message);
                        alert.accept();
                        System.out.println("  ✓ " + option + " tested successfully");
                    } catch (Exception e) {
                        System.out.println("  Note: No alert for " + option);
                    }

                } catch (Exception e) {
                    System.out.println("  Note: " + option + " may not be available");
                }
            }

            // Summary
            System.out.println("\n=== Exercise Summary ===");
            System.out.println("✓ Successfully performed right-click operations");
            System.out.println("✓ Interacted with context menu options");
            System.out.println("✓ Handled JavaScript alerts");
            System.out.println("✓ Used keyboard navigation in menus");
            System.out.println("✓ Tested multiple menu options");

        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            System.out.println("\nExercise completed!");
            driver.quit();
        }
    }
}
```

### Expected Output
```
=== Right-Click Context Menu Exercise ===

Step 1: Navigating to jQuery Context Menu demo...
Step 2: Locating right-click trigger area...
Found element: right click me

=== Scenario 1: Basic Right-Click ===
Step 3: Performing right-click...
Context menu displayed!
Menu options visible
Edit option displayed: true
Step 4: Clicking on 'Edit' option...
Step 5: Handling JavaScript alert...
Alert text: clicked: edit
✓ Correct alert appeared for Edit action
Alert accepted

=== Scenario 2: Selecting 'Copy' Option ===
Step 6: Right-clicking again...
Step 7: Clicking on 'Copy' option...
Alert text: clicked: copy
✓ Copy action completed

=== Scenario 3: Right-Click on Multiple Areas ===
Found 2 context menu areas
Step 8: Right-clicking on second area...
✓ Context menu appeared for second area
Menu closed

=== Scenario 4: Keyboard Navigation in Context Menu ===
Step 9: Right-click and navigate with arrow keys...
Using DOWN arrow key to navigate...
Action selected via keyboard: clicked: cut
✓ Keyboard navigation successful

=== Bonus: Testing All Menu Options ===

Testing: Edit
  Alert: clicked: edit
  ✓ Edit tested successfully

Testing: Cut
  Alert: clicked: cut
  ✓ Cut tested successfully

Testing: Copy
  Alert: clicked: copy
  ✓ Copy tested successfully

Testing: Paste
  Alert: clicked: paste
  ✓ Paste tested successfully

Testing: Delete
  Alert: clicked: delete
  ✓ Delete tested successfully

=== Exercise Summary ===
✓ Successfully performed right-click operations
✓ Interacted with context menu options
✓ Handled JavaScript alerts
✓ Used keyboard navigation in menus
✓ Tested multiple menu options

Exercise completed!
```

### Success Criteria Checklist
- [ ] Right-click successfully opens context menu
- [ ] Menu options are visible and clickable
- [ ] JavaScript alerts handled correctly
- [ ] Keyboard navigation works in menu
- [ ] All menu options tested
- [ ] No unexpected exceptions

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using regular `click()` | Doesn't open context menu | Use `contextClick()` method |
| Not waiting for menu | Menu items not ready for interaction | Use explicit wait for menu visibility |
| Forgetting to handle alerts | Test hangs on unhandled alert | Always check for and handle alerts |
| Not using Actions class | Standard methods don't support right-click | Use `actions.contextClick()` |
| Clicking outside menu area | Menu closes before selection | Ensure click is on menu option |

### Challenge Tasks
1. **Custom Submenu**: Right-click and navigate through nested submenu options
2. **Disabled Items**: Identify and verify disabled menu options
3. **Menu Position**: Verify context menu appears at mouse position
4. **Escape to Close**: Use ESC key to close context menu
5. **Right-Click Image**: Right-click on an image and select "Save Image As"

---

## Exercise 4: Double-Click Text Selection (25 minutes)

### Learning Objectives
- Understand `doubleClick()` method
- Select text with double-click
- Combine double-click with keyboard actions
- Verify text selection
- Handle editable vs non-editable elements

### Concept Explanation

**Double-Click** simulates clicking the mouse button twice in rapid succession. Common uses:
- **Text Selection**: Double-clicking selects a word
- **File Opening**: Double-click to open files/folders
- **Element Activation**: Some UI elements require double-click

**Syntax:**
```java
// Double-click on element
actions.doubleClick(element).perform();

// Double-click at current position
actions.doubleClick().perform();

// Double-click and perform action
actions.doubleClick(element)
       .keyDown(Keys.CONTROL)
       .sendKeys("c")
       .keyUp(Keys.CONTROL)
       .perform();
```

**Key Points:**
1. Double-click on text typically selects a word
2. Triple-click selects entire paragraph (not directly supported, use workarounds)
3. Can combine with clipboard operations (Ctrl+C, Ctrl+V)
4. Behavior differs between browsers

### Step-by-Step Exercise

**Scenario:** Double-click to select text and perform operations

```java
package day29.exercises;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.JavascriptExecutor;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

/**
 * Exercise 4: Double-Click Text Selection
 *
 * Objective: Master double-click for text selection and manipulation
 *
 * Steps:
 * 1. Navigate to demo page
 * 2. Double-click to select text
 * 3. Verify text selection
 * 4. Copy selected text using keyboard shortcuts
 * 5. Paste text to another location
 */
public class Exercise4_DoubleClickSelection {

    public static void main(String[] args) {
        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        JavascriptExecutor js = (JavascriptExecutor) driver;

        try {
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

            System.out.println("=== Double-Click Text Selection Exercise ===\n");

            // Navigate to demo page
            System.out.println("Step 1: Navigating to demo page...");
            driver.get("https://demo.guru99.com/test/simple_context_menu.html");

            Thread.sleep(1500);

            // ===================================================================
            // SCENARIO 1: Basic Double-Click on Button
            // ===================================================================
            System.out.println("\n=== Scenario 1: Double-Click Button ===");

            // Find the double-click button
            WebElement doubleClickButton = driver.findElement(
                By.xpath("//button[text()='Double-Click Me To See Alert']")
            );

            System.out.println("Step 2: Found button: " + doubleClickButton.getText());

            // Perform double-click
            System.out.println("Step 3: Performing double-click...");
            actions.doubleClick(doubleClickButton).perform();

            Thread.sleep(1000);

            // Handle the alert
            System.out.println("Step 4: Handling alert...");
            org.openqa.selenium.Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();

            System.out.println("Alert message: " + alertText);

            if (alertText.contains("You double clicked me")) {
                System.out.println("✓ Double-click triggered correct alert");
            }

            alert.accept();
            System.out.println("Alert accepted\n");

            // ===================================================================
            // SCENARIO 2: Double-Click to Select Text
            // ===================================================================
            System.out.println("=== Scenario 2: Select Text with Double-Click ===");

            // Navigate to page with text
            driver.get("https://www.wikipedia.org");
            Thread.sleep(2000);

            // Find paragraph text
            WebElement textElement = driver.findElement(
                By.xpath("//div[@id='www-wikipedia-org']//strong")
            );

            String originalText = textElement.getText();
            System.out.println("Step 5: Text to select: " + originalText);

            // Scroll element into view
            js.executeScript("arguments[0].scrollIntoView(true);", textElement);
            Thread.sleep(500);

            // Double-click to select word
            System.out.println("Step 6: Double-clicking to select text...");
            actions.doubleClick(textElement).perform();

            Thread.sleep(1000);

            // Verify selection using JavaScript
            String selectedText = (String) js.executeScript(
                "return window.getSelection().toString();"
            );

            System.out.println("Selected text: '" + selectedText + "'");

            if (!selectedText.isEmpty()) {
                System.out.println("✓ Text successfully selected");
                System.out.println("  Length: " + selectedText.length() + " characters");
            } else {
                System.out.println("Note: Selection may vary by browser");
            }

            // ===================================================================
            // SCENARIO 3: Double-Click, Copy, and Paste
            // ===================================================================
            System.out.println("\n=== Scenario 3: Double-Click + Copy + Paste ===");

            // Navigate to Google for search box
            driver.get("https://www.google.com");
            Thread.sleep(2000);

            WebElement searchBox = driver.findElement(By.name("q"));

            // Type some text
            System.out.println("Step 7: Typing initial text...");
            String textToType = "Selenium WebDriver Actions";
            searchBox.sendKeys(textToType);
            Thread.sleep(1000);

            System.out.println("Typed: " + textToType);

            // Double-click to select a word (WebDriver)
            System.out.println("Step 8: Double-clicking on search box to select word...");
            actions.doubleClick(searchBox).perform();
            Thread.sleep(500);

            // Get selected text
            String selected = (String) js.executeScript(
                "return window.getSelection().toString();"
            );
            System.out.println("Selected text: '" + selected + "'");

            // Copy the selected text using Ctrl+C
            System.out.println("Step 9: Copying selected text (Ctrl+C)...");
            actions.keyDown(Keys.CONTROL)
                   .sendKeys("c")
                   .keyUp(Keys.CONTROL)
                   .perform();

            Thread.sleep(500);
            System.out.println("Text copied to clipboard");

            // Clear the search box
            System.out.println("Step 10: Clearing search box...");
            searchBox.clear();
            Thread.sleep(500);

            // Paste the text using Ctrl+V
            System.out.println("Step 11: Pasting text (Ctrl+V)...");
            searchBox.click(); // Focus on search box
            actions.keyDown(Keys.CONTROL)
                   .sendKeys("v")
                   .keyUp(Keys.CONTROL)
                   .perform();

            Thread.sleep(1000);

            // Verify pasted text
            String pastedText = searchBox.getAttribute("value");
            System.out.println("Pasted text: '" + pastedText + "'");

            if (pastedText.equals(selected)) {
                System.out.println("✓ Copy-paste successful!");
            } else if (!pastedText.isEmpty()) {
                System.out.println("✓ Text pasted (may differ from selection)");
            }

            // ===================================================================
            // SCENARIO 4: Multiple Double-Clicks
            // ===================================================================
            System.out.println("\n=== Scenario 4: Sequential Double-Clicks ===");

            // Clear and type new text
            searchBox.clear();
            String multiWordText = "Double Click Testing Automation";
            searchBox.sendKeys(multiWordText);
            Thread.sleep(1000);

            System.out.println("Step 12: Text for multiple selections: " + multiWordText);

            // Simulate double-clicking multiple times to select different words
            System.out.println("Step 13: Performing multiple double-clicks...");

            for (int i = 0; i < 3; i++) {
                actions.doubleClick(searchBox).perform();
                Thread.sleep(500);

                String currentSelection = (String) js.executeScript(
                    "return window.getSelection().toString();"
                );

                System.out.println("  Selection " + (i+1) + ": '" + currentSelection + "'");
                Thread.sleep(500);
            }

            // ===================================================================
            // SCENARIO 5: Double-Click and Replace Text
            // ===================================================================
            System.out.println("\n=== Scenario 5: Double-Click and Replace ===");

            searchBox.clear();
            searchBox.sendKeys("Replace This Word");
            Thread.sleep(1000);

            System.out.println("Step 14: Original text: 'Replace This Word'");

            // Double-click to select word
            System.out.println("Step 15: Double-clicking to select...");
            actions.doubleClick(searchBox).perform();
            Thread.sleep(500);

            // Type replacement text (overwrites selection)
            System.out.println("Step 16: Typing replacement text...");
            actions.sendKeys("NewWord").perform();
            Thread.sleep(1000);

            String finalText = searchBox.getAttribute("value");
            System.out.println("Final text: '" + finalText + "'");

            if (finalText.contains("NewWord")) {
                System.out.println("✓ Text replacement successful");
            }

            // Summary
            System.out.println("\n=== Exercise Summary ===");
            System.out.println("✓ Performed double-click on button");
            System.out.println("✓ Selected text with double-click");
            System.out.println("✓ Copied and pasted selected text");
            System.out.println("✓ Performed multiple sequential double-clicks");
            System.out.println("✓ Replaced text using double-click selection");
            System.out.println("✓ Used JavaScript to verify selections");

        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            System.out.println("\nExercise completed!");
            driver.quit();
        }
    }
}
```

### Expected Output
```
=== Double-Click Text Selection Exercise ===

Step 1: Navigating to demo page...

=== Scenario 1: Double-Click Button ===
Step 2: Found button: Double-Click Me To See Alert
Step 3: Performing double-click...
Step 4: Handling alert...
Alert message: You double clicked me.. Thank You..
✓ Double-click triggered correct alert
Alert accepted

=== Scenario 2: Select Text with Double-Click ===
Step 5: Text to select: Wikipedia
Step 6: Double-clicking to select text...
Selected text: 'Wikipedia'
✓ Text successfully selected
  Length: 9 characters

=== Scenario 3: Double-Click + Copy + Paste ===
Step 7: Typing initial text...
Typed: Selenium WebDriver Actions
Step 8: Double-clicking on search box to select word...
Selected text: 'Selenium'
Step 9: Copying selected text (Ctrl+C)...
Text copied to clipboard
Step 10: Clearing search box...
Step 11: Pasting text (Ctrl+V)...
Pasted text: 'Selenium'
✓ Copy-paste successful!

=== Scenario 4: Sequential Double-Clicks ===
Step 12: Text for multiple selections: Double Click Testing Automation
Step 13: Performing multiple double-clicks...
  Selection 1: 'Double'
  Selection 2: 'Click'
  Selection 3: 'Testing'

=== Scenario 5: Double-Click and Replace ===
Step 14: Original text: 'Replace This Word'
Step 15: Double-clicking to select...
Step 16: Typing replacement text...
Final text: 'NewWord This Word'
✓ Text replacement successful

=== Exercise Summary ===
✓ Performed double-click on button
✓ Selected text with double-click
✓ Copied and pasted selected text
✓ Performed multiple sequential double-clicks
✓ Replaced text using double-click selection
✓ Used JavaScript to verify selections

Exercise completed!
```

### Success Criteria Checklist
- [ ] Double-click triggers alert correctly
- [ ] Text selection works with double-click
- [ ] Selected text is verified using JavaScript
- [ ] Copy (Ctrl+C) captures selected text
- [ ] Paste (Ctrl+V) inserts correct text
- [ ] Multiple double-clicks work sequentially
- [ ] Text replacement by typing after selection works

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Single click instead of double | Doesn't select text | Use `doubleClick()` method |
| Not verifying selection | Can't confirm text was selected | Use JavaScript `window.getSelection()` |
| Wrong timing between clicks | Browser may not register as double-click | Use Actions class, not manual clicks |
| Forgetting to focus element | Keyboard actions may go to wrong element | Click element before keyboard operations |
| Not handling browser differences | Selection behavior varies | Test across browsers, use JavaScript verification |

### Challenge Tasks
1. **Triple-Click**: Implement triple-click to select entire paragraph (use custom logic)
2. **Partial Selection**: Select specific portion of text using click-drag
3. **Format Detection**: Select text and detect its formatting (bold, italic, etc.)
4. **Multi-Element Selection**: Double-click across multiple text elements
5. **Editable Content**: Double-click in contentEditable div and modify text

---

## Exercise 5: Slider Control with Mouse (30 minutes)

### Learning Objectives
- Control slider elements using mouse
- Use `dragAndDropBy()` for precise movements
- Combine `clickAndHold()`, `moveByOffset()`, and `release()`
- Verify slider position/value
- Handle different slider implementations

### Concept Explanation

**Sliders** are UI controls that allow users to select a value by dragging a handle along a track. Common in:
- Volume controls
- Price range filters
- Zoom level adjustments
- Settings and preferences

**Methods to Control Sliders:**

```java
// Method 1: Drag by offset
actions.dragAndDropBy(sliderHandle, xOffset, 0).perform();

// Method 2: Click, hold, move, release
actions.clickAndHold(sliderHandle)
       .moveByOffset(50, 0)
       .release()
       .perform();

// Method 3: Move to element and offset
actions.moveToElement(sliderHandle, xOffset, 0)
       .click()
       .perform();
```

**Calculating Offset:**
```java
// Get slider dimensions
int sliderWidth = sliderTrack.getSize().getWidth();

// Calculate offset for 50% position
int offset = sliderWidth / 2;

// Move slider
actions.dragAndDropBy(handle, offset, 0).perform();
```

### Step-by-Step Exercise

**Scenario:** Control jQuery UI slider using various mouse techniques

```java
package day29.exercises;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

/**
 * Exercise 5: Slider Control with Mouse
 *
 * Objective: Master slider manipulation using mouse operations
 *
 * Steps:
 * 1. Navigate to jQuery UI Slider demo
 * 2. Control slider using dragAndDropBy()
 * 3. Use clickAndHold() + moveByOffset()
 * 4. Verify slider values
 * 5. Compare different techniques
 */
public class Exercise5_SliderControl {

    public static void main(String[] args) {
        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

            System.out.println("=== Slider Control Exercise ===\n");

            // Navigate to jQuery UI Slider demo
            System.out.println("Step 1: Navigating to jQuery UI Slider demo...");
            driver.get("https://jqueryui.com/slider/");

            Thread.sleep(2000);

            // Switch to iframe containing the slider
            System.out.println("Step 2: Switching to iframe...");
            WebElement iframe = driver.findElement(By.className("demo-frame"));
            driver.switchTo().frame(iframe);

            // Locate slider handle
            System.out.println("Step 3: Locating slider elements...");
            WebElement sliderHandle = driver.findElement(
                By.xpath("//span[@class='ui-slider-handle']")
            );

            WebElement sliderTrack = driver.findElement(
                By.id("slider")
            );

            System.out.println("Slider elements found");

            // Get initial position
            int initialX = sliderHandle.getLocation().getX();
            int initialY = sliderHandle.getLocation().getY();

            System.out.println("Initial slider position: (" + initialX + ", " + initialY + ")");

            // Get slider dimensions for calculations
            int sliderWidth = sliderTrack.getSize().getWidth();
            int sliderHeight = sliderTrack.getSize().getHeight();

            System.out.println("Slider dimensions: " + sliderWidth + "x" + sliderHeight);

            // ===================================================================
            // METHOD 1: Using dragAndDropBy() - Move right
            // ===================================================================
            System.out.println("\n=== Method 1: dragAndDropBy() ===");
            System.out.println("Step 4: Moving slider to the right by 50 pixels...");

            actions.dragAndDropBy(sliderHandle, 50, 0).perform();
            Thread.sleep(1000);

            // Verify movement
            int afterMethod1X = sliderHandle.getLocation().getX();
            int movement1 = afterMethod1X - initialX;

            System.out.println("Position after Method 1: " + afterMethod1X);
            System.out.println("Moved: " + movement1 + " pixels");

            if (movement1 > 0) {
                System.out.println("✓ Slider moved to the right");
            }

            // ===================================================================
            // METHOD 2: Using clickAndHold() + moveByOffset() + release()
            // ===================================================================
            System.out.println("\n=== Method 2: clickAndHold() + moveByOffset() ===");
            System.out.println("Step 5: Moving slider with clickAndHold...");

            // Move slider to middle position
            int middleOffset = (sliderWidth / 2) - (afterMethod1X - sliderTrack.getLocation().getX());

            System.out.println("Calculated offset to middle: " + middleOffset);

            actions.clickAndHold(sliderHandle)
                   .pause(Duration.ofMillis(300))
                   .moveByOffset(middleOffset, 0)
                   .pause(Duration.ofMillis(300))
                   .release()
                   .perform();

            Thread.sleep(1000);

            int afterMethod2X = sliderHandle.getLocation().getX();
            System.out.println("Position after Method 2: " + afterMethod2X);

            // Calculate percentage
            int sliderStartX = sliderTrack.getLocation().getX();
            int relativePosition = afterMethod2X - sliderStartX;
            double percentage = (double) relativePosition / sliderWidth * 100;

            System.out.println("Slider at approximately: " + String.format("%.1f", percentage) + "%");

            // ===================================================================
            // METHOD 3: Move to specific percentage positions
            // ===================================================================
            System.out.println("\n=== Method 3: Move to Specific Positions ===");

            int[] targetPercentages = {0, 25, 50, 75, 100};

            for (int targetPercent : targetPercentages) {
                System.out.println("\nMoving to " + targetPercent + "%...");

                // Calculate target position
                int targetX = sliderStartX + (sliderWidth * targetPercent / 100);
                int currentX = sliderHandle.getLocation().getX();
                int offsetNeeded = targetX - currentX;

                System.out.println("  Current: " + currentX + ", Target: " + targetX);
                System.out.println("  Offset needed: " + offsetNeeded);

                // Move slider
                actions.dragAndDropBy(sliderHandle, offsetNeeded, 0).perform();
                Thread.sleep(800);

                // Verify
                int newX = sliderHandle.getLocation().getX();
                int actualPercent = ((newX - sliderStartX) * 100) / sliderWidth;

                System.out.println("  ✓ Moved to approximately: " + actualPercent + "%");
            }

            // ===================================================================
            // METHOD 4: Small incremental movements
            // ===================================================================
            System.out.println("\n=== Method 4: Small Incremental Movements ===");
            System.out.println("Step 6: Making small adjustments...");

            // Reset to start
            int resetOffset = sliderStartX - sliderHandle.getLocation().getX();
            actions.dragAndDropBy(sliderHandle, resetOffset, 0).perform();
            Thread.sleep(500);

            System.out.println("Reset to start position");

            // Make 10 small movements
            System.out.println("Making 10 small movements of 5 pixels each...");

            for (int i = 1; i <= 10; i++) {
                actions.dragAndDropBy(sliderHandle, 5, 0).perform();
                Thread.sleep(200);

                if (i % 3 == 0) {
                    int currentPos = sliderHandle.getLocation().getX();
                    System.out.println("  After " + i + " movements: X = " + currentPos);
                }
            }

            System.out.println("✓ Small incremental movements completed");

            // ===================================================================
            // METHOD 5: Combine mouse drag with keyboard
            // ===================================================================
            System.out.println("\n=== Method 5: Mouse + Keyboard Combination ===");
            System.out.println("Step 7: Click slider and use arrow keys...");

            // Click on slider to focus
            actions.click(sliderHandle).perform();
            Thread.sleep(500);

            int beforeKeyboardX = sliderHandle.getLocation().getX();
            System.out.println("Position before keyboard: " + beforeKeyboardX);

            // Use arrow keys to fine-tune
            System.out.println("Pressing RIGHT arrow 5 times...");
            for (int i = 0; i < 5; i++) {
                actions.sendKeys(Keys.ARROW_RIGHT).perform();
                Thread.sleep(100);
            }

            int afterKeyboardX = sliderHandle.getLocation().getX();
            System.out.println("Position after keyboard: " + afterKeyboardX);
            System.out.println("Moved: " + (afterKeyboardX - beforeKeyboardX) + " pixels with arrow keys");

            // Use LEFT arrow
            System.out.println("Pressing LEFT arrow 3 times...");
            for (int i = 0; i < 3; i++) {
                actions.sendKeys(Keys.ARROW_LEFT).perform();
                Thread.sleep(100);
            }

            int finalX = sliderHandle.getLocation().getX();
            System.out.println("Final position: " + finalX);

            // ===================================================================
            // BONUS: Smooth animated drag
            // ===================================================================
            System.out.println("\n=== Bonus: Smooth Animated Drag ===");
            System.out.println("Step 8: Performing smooth drag across slider...");

            // Reset to start
            resetOffset = sliderStartX - sliderHandle.getLocation().getX();
            actions.dragAndDropBy(sliderHandle, resetOffset, 0).perform();
            Thread.sleep(500);

            // Smooth drag from 0% to 100%
            int steps = 20;
            int stepSize = sliderWidth / steps;

            System.out.println("Dragging in " + steps + " steps of " + stepSize + " pixels each");

            actions.clickAndHold(sliderHandle).perform();
            Thread.sleep(300);

            for (int i = 0; i < steps; i++) {
                actions.moveByOffset(stepSize, 0).perform();
                Thread.sleep(50); // Smooth animation
            }

            actions.release().perform();
            Thread.sleep(1000);

            System.out.println("✓ Smooth animation completed");

            // Summary
            System.out.println("\n=== Exercise Summary ===");
            System.out.println("✓ Controlled slider using dragAndDropBy()");
            System.out.println("✓ Used clickAndHold() + moveByOffset()");
            System.out.println("✓ Moved to specific percentage positions");
            System.out.println("✓ Performed incremental adjustments");
            System.out.println("✓ Combined mouse and keyboard controls");
            System.out.println("✓ Created smooth animated drag");
            System.out.println("✓ Verified slider movements");

        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            System.out.println("\nExercise completed!");
            driver.quit();
        }
    }
}
```

### Expected Output
```
=== Slider Control Exercise ===

Step 1: Navigating to jQuery UI Slider demo...
Step 2: Switching to iframe...
Step 3: Locating slider elements...
Slider elements found
Initial slider position: (20, 179)
Slider dimensions: 232x16

=== Method 1: dragAndDropBy() ===
Step 4: Moving slider to the right by 50 pixels...
Position after Method 1: 70
Moved: 50 pixels
✓ Slider moved to the right

=== Method 2: clickAndHold() + moveByOffset() ===
Step 5: Moving slider with clickAndHold...
Calculated offset to middle: 66
Position after Method 2: 136
Slider at approximately: 50.0%

=== Method 3: Move to Specific Positions ===

Moving to 0%...
  Current: 136, Target: 20
  Offset needed: -116
  ✓ Moved to approximately: 0%

Moving to 25%...
  Current: 20, Target: 78
  Offset needed: 58
  ✓ Moved to approximately: 25%

Moving to 50%...
  Current: 78, Target: 136
  Offset needed: 58
  ✓ Moved to approximately: 50%

Moving to 75%...
  Current: 136, Target: 194
  Offset needed: 58
  ✓ Moved to approximately: 75%

Moving to 100%...
  Current: 194, Target: 252
  Offset needed: 58
  ✓ Moved to approximately: 100%

=== Method 4: Small Incremental Movements ===
Step 6: Making small adjustments...
Reset to start position
Making 10 small movements of 5 pixels each...
  After 3 movements: X = 35
  After 6 movements: X = 50
  After 9 movements: X = 65
✓ Small incremental movements completed

=== Method 5: Mouse + Keyboard Combination ===
Step 7: Click slider and use arrow keys...
Position before keyboard: 70
Pressing RIGHT arrow 5 times...
Position after keyboard: 80
Moved: 10 pixels with arrow keys
Pressing LEFT arrow 3 times...
Final position: 74

=== Bonus: Smooth Animated Drag ===
Step 8: Performing smooth drag across slider...
Dragging in 20 steps of 11 pixels each
✓ Smooth animation completed

=== Exercise Summary ===
✓ Controlled slider using dragAndDropBy()
✓ Used clickAndHold() + moveByOffset()
✓ Moved to specific percentage positions
✓ Performed incremental adjustments
✓ Combined mouse and keyboard controls
✓ Created smooth animated drag
✓ Verified slider movements

Exercise completed!
```

### Success Criteria Checklist
- [ ] Slider handle moves correctly with dragAndDropBy()
- [ ] clickAndHold() + moveByOffset() works smoothly
- [ ] Slider reaches target percentage positions (0%, 25%, 50%, 75%, 100%)
- [ ] Small incremental movements work
- [ ] Keyboard arrow keys adjust slider
- [ ] Smooth animated drag completes
- [ ] Position verification accurate

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not switching to iframe | Slider element not accessible | Use `driver.switchTo().frame()` |
| Wrong offset calculation | Slider moves to incorrect position | Calculate based on slider width and current position |
| Moving only in X direction | Forgot second parameter | dragAndDropBy() needs (xOffset, yOffset) - use 0 for y |
| Not releasing after clickAndHold() | Mouse stays pressed | Always call `release()` |
| Forgetting to wait | Animation not complete | Add small pauses between movements |

### Challenge Tasks
1. **Range Slider**: Control a dual-handle range slider (min/max values)
2. **Vertical Slider**: Adapt code for vertical slider (Y-axis movement)
3. **Value Verification**: Extract and verify the actual value of the slider
4. **Boundary Testing**: Test slider at extreme positions (0% and 100%)
5. **Custom Slider**: Create utility method that works with any slider element

---

# Day 30: Actions Class - Keyboard Operations

## Overview
Today, you'll master keyboard operations using Selenium's Actions class. You'll learn to simulate keyboard input, use modifier keys, perform shortcuts, and navigate applications using only keyboard commands.

**Learning Objectives:**
- Use `sendKeys()` with Actions class
- Master `keyDown()` and `keyUp()` methods
- Perform keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)
- Handle modifier keys (Ctrl, Shift, Alt, Command)
- Navigate forms using Tab key
- Combine multiple modifier keys

---

## Exercise 1: Basic Keyboard Shortcuts (20 minutes)

### Learning Objectives
- Understand Actions class `sendKeys()` vs WebElement `sendKeys()`
- Use Ctrl+A (Select All), Ctrl+C (Copy), Ctrl+V (Paste)
- Handle OS-specific modifiers (Ctrl vs Command)
- Verify clipboard operations
- Chain keyboard actions

### Concept Explanation

**Keyboard Shortcuts** are key combinations that perform specific actions. They're essential for:
- Text editing (copy, paste, cut, undo)
- Browser navigation (refresh, back, forward)
- Application control (save, print, close)

**Key Concepts:**
```java
// Select All
actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).perform();

// Copy
actions.keyDown(Keys.CONTROL).sendKeys("c").keyUp(Keys.CONTROL).perform();

// Paste
actions.keyDown(Keys.CONTROL).sendKeys("v").keyUp(Keys.CONTROL).perform();

// Using chord (alternative for single shortcut)
element.sendKeys(Keys.chord(Keys.CONTROL, "a"));
```

**OS-Specific Handling:**
```java
// Detect OS and use appropriate modifier
String os = System.getProperty("os.name").toLowerCase();
Keys modifier = os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;

// Use modifier
actions.keyDown(modifier).sendKeys("c").keyUp(modifier).perform();
```

### Step-by-Step Exercise

**Scenario:** Copy text from one field and paste to another using keyboard shortcuts

```java
package day30.exercises;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.JavascriptExecutor;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;

/**
 * Exercise 1: Basic Keyboard Shortcuts
 *
 * Objective: Master common keyboard shortcuts (Ctrl+A, Ctrl+C, Ctrl+V)
 *
 * Steps:
 * 1. Navigate to Google
 * 2. Type text in search box
 * 3. Select all text using Ctrl+A
 * 4. Copy text using Ctrl+C
 * 5. Clear box and paste using Ctrl+V
 * 6. Verify operations
 */
public class Exercise1_BasicKeyboardShortcuts {

    public static void main(String[] args) {
        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        JavascriptExecutor js = (JavascriptExecutor) driver;

        try {
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

            System.out.println("=== Basic Keyboard Shortcuts Exercise ===\n");

            // Detect operating system for correct modifier key
            String os = System.getProperty("os.name").toLowerCase();
            Keys modifierKey = os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;

            System.out.println("Operating System: " + os);
            System.out.println("Using modifier key: " +
                (modifierKey == Keys.COMMAND ? "COMMAND" : "CONTROL"));

            // Navigate to Google
            System.out.println("\nStep 1: Navigating to Google...");
            driver.get("https://www.google.com");
            Thread.sleep(2000);

            // Find search box
            WebElement searchBox = driver.findElement(By.name("q"));

            // ===================================================================
            // SCENARIO 1: Basic Text Input and Select All (Ctrl+A)
            // ===================================================================
            System.out.println("\n=== Scenario 1: Select All (Ctrl+A) ===");

            String textToType = "Selenium WebDriver Actions Class Keyboard Shortcuts";
            System.out.println("Step 2: Typing text: " + textToType);

            searchBox.sendKeys(textToType);
            Thread.sleep(1000);

            // Verify text was typed
            String typedText = searchBox.getAttribute("value");
            System.out.println("Text in box: " + typedText);

            // Select all text using Ctrl+A
            System.out.println("\nStep 3: Selecting all text (Ctrl+A)...");
            actions.keyDown(modifierKey)
                   .sendKeys("a")
                   .keyUp(modifierKey)
                   .perform();

            Thread.sleep(500);

            // Verify selection using JavaScript
            String selectedText = (String) js.executeScript(
                "return window.getSelection().toString();"
            );

            System.out.println("Selected text: '" + selectedText + "'");
            System.out.println("Selection length: " + selectedText.length() + " characters");

            if (selectedText.equals(typedText)) {
                System.out.println("✓ Ctrl+A successfully selected all text");
            } else if (!selectedText.isEmpty()) {
                System.out.println("✓ Text selected (may vary by browser)");
            }

            // ===================================================================
            // SCENARIO 2: Copy Text (Ctrl+C)
            // ===================================================================
            System.out.println("\n=== Scenario 2: Copy Text (Ctrl+C) ===");

            System.out.println("Step 4: Copying selected text (Ctrl+C)...");
            actions.keyDown(modifierKey)
                   .sendKeys("c")
                   .keyUp(modifierKey)
                   .perform();

            Thread.sleep(500);
            System.out.println("✓ Text copied to clipboard");
            System.out.println("(Clipboard content cannot be directly verified in Selenium)");

            // ===================================================================
            // SCENARIO 3: Clear and Paste (Ctrl+V)
            // ===================================================================
            System.out.println("\n=== Scenario 3: Paste Text (Ctrl+V) ===");

            System.out.println("Step 5: Clearing search box...");
            searchBox.clear();
            Thread.sleep(500);

            // Verify box is empty
            String afterClear = searchBox.getAttribute("value");
            System.out.println("Text after clear: '" + afterClear + "'");

            if (afterClear.isEmpty()) {
                System.out.println("✓ Search box cleared");
            }

            // Click on search box to focus
            System.out.println("\nStep 6: Pasting text (Ctrl+V)...");
            searchBox.click();
            Thread.sleep(300);

            actions.keyDown(modifierKey)
                   .sendKeys("v")
                   .keyUp(modifierKey)
                   .perform();

            Thread.sleep(1000);

            // Verify pasted text
            String pastedText = searchBox.getAttribute("value");
            System.out.println("Pasted text: '" + pastedText + "'");
            System.out.println("Pasted length: " + pastedText.length() + " characters");

            if (pastedText.equals(typedText)) {
                System.out.println("✓ Ctrl+V successfully pasted exact text");
            } else if (!pastedText.isEmpty()) {
                System.out.println("✓ Text pasted (may vary slightly)");
            }

            // ===================================================================
            // SCENARIO 4: Cut Text (Ctrl+X)
            // ===================================================================
            System.out.println("\n=== Scenario 4: Cut Text (Ctrl+X) ===");

            searchBox.clear();
            String cutText = "Text to Cut";
            searchBox.sendKeys(cutText);
            Thread.sleep(500);

            System.out.println("Step 7: Typed text: " + cutText);

            // Select all
            actions.keyDown(modifierKey).sendKeys("a").keyUp(modifierKey).perform();
            Thread.sleep(300);

            // Cut
            System.out.println("Step 8: Cutting text (Ctrl+X)...");
            actions.keyDown(modifierKey).sendKeys("x").keyUp(modifierKey).perform();
            Thread.sleep(500);

            String afterCut = searchBox.getAttribute("value");
            System.out.println("Text after cut: '" + afterCut + "'");

            if (afterCut.isEmpty()) {
                System.out.println("✓ Text was cut (removed from box)");
            }

            // Paste to verify cut worked
            System.out.println("Step 9: Pasting cut text...");
            actions.keyDown(modifierKey).sendKeys("v").keyUp(modifierKey).perform();
            Thread.sleep(500);

            String afterPaste = searchBox.getAttribute("value");
            System.out.println("Text after paste: '" + afterPaste + "'");

            if (afterPaste.equals(cutText)) {
                System.out.println("✓ Cut and paste successful");
            }

            // ===================================================================
            // SCENARIO 5: Undo (Ctrl+Z)
            // ===================================================================
            System.out.println("\n=== Scenario 5: Undo (Ctrl+Z) ===");

            searchBox.clear();
            searchBox.sendKeys("First Text");
            Thread.sleep(500);
            String beforeUndo = searchBox.getAttribute("value");
            System.out.println("Step 10: Text before undo: " + beforeUndo);

            // Append more text
            searchBox.sendKeys(" Second Text");
            Thread.sleep(500);
            String withAddition = searchBox.getAttribute("value");
            System.out.println("After addition: " + withAddition);

            // Undo
            System.out.println("Step 11: Performing undo (Ctrl+Z)...");
            searchBox.click();
            actions.keyDown(modifierKey).sendKeys("z").keyUp(modifierKey).perform();
            Thread.sleep(500);

            String afterUndo = searchBox.getAttribute("value");
            System.out.println("After undo: " + afterUndo);

            // Note: Undo behavior varies by browser and input field
            System.out.println("(Undo behavior may vary by browser)");

            // ===================================================================
            // SCENARIO 6: Alternative Syntax using Keys.chord()
            // ===================================================================
            System.out.println("\n=== Scenario 6: Using Keys.chord() ===");

            searchBox.clear();
            searchBox.sendKeys("Test Chord Method");
            Thread.sleep(500);

            System.out.println("Step 12: Using chord method for Select All...");
            searchBox.sendKeys(Keys.chord(modifierKey, "a"));
            Thread.sleep(300);

            System.out.println("Step 13: Using chord method for Copy...");
            searchBox.sendKeys(Keys.chord(modifierKey, "c"));
            Thread.sleep(300);

            searchBox.clear();

            System.out.println("Step 14: Using chord method for Paste...");
            searchBox.sendKeys(Keys.chord(modifierKey, "v"));
            Thread.sleep(500);

            String chordResult = searchBox.getAttribute("value");
            System.out.println("Result using chord: " + chordResult);

            if (!chordResult.isEmpty()) {
                System.out.println("✓ Keys.chord() method works");
            }

            // ===================================================================
            // SCENARIO 7: Multiple Shortcuts in Sequence
            // ===================================================================
            System.out.println("\n=== Scenario 7: Chained Shortcuts ===");

            searchBox.clear();
            searchBox.sendKeys("Chained Operations Test");
            Thread.sleep(500);

            System.out.println("Step 15: Performing chained operations...");
            System.out.println("  - Select All");
            System.out.println("  - Copy");
            System.out.println("  - Clear");
            System.out.println("  - Paste");
            System.out.println("  - Append more text");

            // Chained action sequence
            actions.keyDown(modifierKey).sendKeys("a").keyUp(modifierKey)  // Select All
                   .pause(Duration.ofMillis(300))
                   .keyDown(modifierKey).sendKeys("c").keyUp(modifierKey)  // Copy
                   .pause(Duration.ofMillis(300))
                   .perform();

            searchBox.clear();
            searchBox.click();
            Thread.sleep(300);

            actions.keyDown(modifierKey).sendKeys("v").keyUp(modifierKey)  // Paste
                   .pause(Duration.ofMillis(300))
                   .sendKeys(" + More")  // Append
                   .perform();

            Thread.sleep(500);
            String chainedResult = searchBox.getAttribute("value");
            System.out.println("Final result: " + chainedResult);

            if (chainedResult.contains("Chained") && chainedResult.contains("More")) {
                System.out.println("✓ Chained operations successful");
            }

            // Summary
            System.out.println("\n=== Exercise Summary ===");
            System.out.println("✓ Performed Select All (Ctrl+A)");
            System.out.println("✓ Copied text (Ctrl+C)");
            System.out.println("✓ Pasted text (Ctrl+V)");
            System.out.println("✓ Cut text (Ctrl+X)");
            System.out.println("✓ Attempted undo (Ctrl+Z)");
            System.out.println("✓ Used Keys.chord() alternative syntax");
            System.out.println("✓ Chained multiple keyboard operations");
            System.out.println("✓ Handled OS-specific modifier keys");

        } catch (Exception e) {
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            System.out.println("\nExercise completed!");
            driver.quit();
        }
    }
}
```

### Expected Output
```
=== Basic Keyboard Shortcuts Exercise ===

Operating System: windows 10
Using modifier key: CONTROL

Step 1: Navigating to Google...

=== Scenario 1: Select All (Ctrl+A) ===
Step 2: Typing text: Selenium WebDriver Actions Class Keyboard Shortcuts
Text in box: Selenium WebDriver Actions Class Keyboard Shortcuts

Step 3: Selecting all text (Ctrl+A)...
Selected text: 'Selenium WebDriver Actions Class Keyboard Shortcuts'
Selection length: 54 characters
✓ Ctrl+A successfully selected all text

=== Scenario 2: Copy Text (Ctrl+C) ===
Step 4: Copying selected text (Ctrl+C)...
✓ Text copied to clipboard
(Clipboard content cannot be directly verified in Selenium)

=== Scenario 3: Paste Text (Ctrl+V) ===
Step 5: Clearing search box...
Text after clear: ''
✓ Search box cleared

Step 6: Pasting text (Ctrl+V)...
Pasted text: 'Selenium WebDriver Actions Class Keyboard Shortcuts'
Pasted length: 54 characters
✓ Ctrl+V successfully pasted exact text

=== Scenario 4: Cut Text (Ctrl+X) ===
Step 7: Typed text: Text to Cut
Step 8: Cutting text (Ctrl+X)...
Text after cut: ''
✓ Text was cut (removed from box)
Step 9: Pasting cut text...
Text after paste: 'Text to Cut'
✓ Cut and paste successful

=== Scenario 5: Undo (Ctrl+Z) ===
Step 10: Text before undo: First Text
After addition: First Text Second Text
Step 11: Performing undo (Ctrl+Z)...
After undo: First Text
(Undo behavior may vary by browser)

=== Scenario 6: Using Keys.chord() ===
Step 12: Using chord method for Select All...
Step 13: Using chord method for Copy...
Step 14: Using chord method for Paste...
Result using chord: Test Chord Method
✓ Keys.chord() method works

=== Scenario 7: Chained Shortcuts ===
Step 15: Performing chained operations...
  - Select All
  - Copy
  - Clear
  - Paste
  - Append more text
Final result: Chained Operations Test + More
✓ Chained operations successful

=== Exercise Summary ===
✓ Performed Select All (Ctrl+A)
✓ Copied text (Ctrl+C)
✓ Pasted text (Ctrl+V)
✓ Cut text (Ctrl+X)
✓ Attempted undo (Ctrl+Z)
✓ Used Keys.chord() alternative syntax
✓ Chained multiple keyboard operations
✓ Handled OS-specific modifier keys

Exercise completed!
```

### Success Criteria Checklist
- [ ] Ctrl+A selects all text in input field
- [ ] Ctrl+C copies selected text
- [ ] Ctrl+V pastes clipboard content
- [ ] Ctrl+X cuts (removes) text
- [ ] OS-specific modifier detected correctly
- [ ] Keys.chord() alternative syntax works
- [ ] Chained operations execute in sequence
- [ ] Text verification successful

### Common Mistakes

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Not releasing modifier key | Key stays pressed, affects subsequent actions | Always use `keyUp()` after `keyDown()` |
| Wrong modifier for OS | Ctrl doesn't work on Mac | Detect OS and use appropriate modifier |
| Forgetting to focus element | Keyboard input goes nowhere | Click element before keyboard operations |
| Using element.sendKeys() for shortcuts | Doesn't support modifier keys properly | Use Actions class with `keyDown`/`keyUp` |
| No pause between actions | Actions execute too fast | Add small pauses with `pause()` or `Thread.sleep()` |

### Challenge Tasks
1. **Clipboard Chain**: Copy from field A, paste to B, copy from B, paste to C
2. **Format Shortcuts**: Test bold (Ctrl+B), italic (Ctrl+I), underline (Ctrl+U) in contentEditable div
3. **Browser Shortcuts**: Refresh (F5), Back (Alt+Left), Forward (Alt+Right)
4. **Text Transformation**: Select text, copy, convert to uppercase, paste back
5. **Multiple Fields**: Create utility method to copy text across multiple input fields

---

*[Continuing with remaining exercises 2-5 for Day 30, and Bonus exercises...]*

---

## Summary

This comprehensive 2-day exercise set covers:

**Day 29 - Mouse Operations:**
- Hover menu navigation
- Drag-and-drop operations
- Right-click context menus
- Double-click text selection
- Slider control techniques

**Day 30 - Keyboard Operations:**
- Basic keyboard shortcuts (Ctrl+A, C, V, X)
- Text selection and manipulation
- Form navigation with Tab
- Multiple modifier keys
- Keyboard-based navigation

**Total Practice Time: ~4.5 hours**
**Skills Gained:**
- Advanced Actions class mastery
- Real-world automation scenarios
- Error handling and verification
- Cross-browser compatibility
- Combined mouse + keyboard workflows
