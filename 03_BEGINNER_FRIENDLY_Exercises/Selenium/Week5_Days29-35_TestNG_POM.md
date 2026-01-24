
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