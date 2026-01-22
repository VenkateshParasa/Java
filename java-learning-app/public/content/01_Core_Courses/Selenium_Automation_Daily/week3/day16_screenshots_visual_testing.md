# Day 16: Screenshots & Visual Testing

**Week 3: Screenshots, Browser Options & TestNG Basics**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Why Screenshots Matter](#why-screenshots-matter)
- [Taking Screenshots in Selenium](#taking-screenshots-in-selenium)
- [Screenshot Strategies](#screenshot-strategies)
- [Visual Testing Basics](#visual-testing-basics)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 16, you will be able to:
- Understand the importance of screenshots in test automation
- Use [`TakesScreenshot`](org.openqa.selenium.TakesScreenshot) interface
- Capture full page screenshots
- Capture element-specific screenshots
- Implement screenshot on test failure
- Organize and name screenshots effectively
- Understand basic visual testing concepts
- Create a screenshot utility class

---

## 📚 Why Screenshots Matter

### Use Cases for Screenshots

**1. Test Evidence**
- Proof that test executed
- Visual confirmation of results
- Compliance and audit requirements

**2. Debugging**
- Understand why test failed
- See actual vs expected state
- Identify UI issues quickly

**3. Reporting**
- Enhance test reports with visuals
- Stakeholder communication
- Bug reports with evidence

**4. Visual Regression Testing**
- Compare UI changes over time
- Detect unintended visual changes
- Ensure consistent UI across releases

---

## 🔧 Taking Screenshots in Selenium

### The TakesScreenshot Interface

Selenium provides the [`TakesScreenshot`](org.openqa.selenium.TakesScreenshot) interface for capturing screenshots.

#### Basic Screenshot Example

```java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.io.FileHandler;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.io.File;
import java.io.IOException;

public class BasicScreenshotExample {
    public static void main(String[] args) throws IOException {
        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to website
            driver.get("https://www.google.com");
            
            // Take screenshot
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
            
            // Save screenshot
            File destinationFile = new File("screenshots/google_homepage.png");
            FileHandler.copy(sourceFile, destinationFile);
            
            System.out.println("Screenshot saved: " + destinationFile.getAbsolutePath());
            
        } finally {
            driver.quit();
        }
    }
}
```

### Understanding the Code

**Step 1: Cast WebDriver to TakesScreenshot**
```java
TakesScreenshot screenshot = (TakesScreenshot) driver;
```
- WebDriver needs to be cast to TakesScreenshot interface
- This enables screenshot functionality

**Step 2: Capture Screenshot**
```java
File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
```
- [`getScreenshotAs()`](org.openqa.selenium.TakesScreenshot.getScreenshotAs()) captures the screenshot
- [`OutputType.FILE`](org.openqa.selenium.OutputType.FILE) returns a File object
- Other options: `OutputType.BYTES`, `OutputType.BASE64`

**Step 3: Save Screenshot**
```java
File destinationFile = new File("screenshots/google_homepage.png");
FileHandler.copy(sourceFile, destinationFile);
```
- Specify destination path
- Use [`FileHandler.copy()`](org.openqa.selenium.io.FileHandler.copy()) to save

---

## 📸 Screenshot Strategies

### 1. Screenshot with Timestamp

```java
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimestampedScreenshot {
    
    public static void takeScreenshot(WebDriver driver, String testName) throws IOException {
        // Create timestamp
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        
        // Take screenshot
        TakesScreenshot screenshot = (TakesScreenshot) driver;
        File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
        
        // Save with timestamp
        String fileName = testName + "_" + timestamp + ".png";
        File destinationFile = new File("screenshots/" + fileName);
        FileHandler.copy(sourceFile, destinationFile);
        
        System.out.println("Screenshot saved: " + fileName);
    }
    
    public static void main(String[] args) throws IOException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.amazon.com");
            takeScreenshot(driver, "amazon_homepage");
        } finally {
            driver.quit();
        }
    }
}
```

**Output**: `amazon_homepage_20260114_113045.png`

---

### 2. Screenshot on Test Failure

```java
import org.testng.ITestResult;
import org.testng.annotations.*;

public class ScreenshotOnFailure {
    WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @Test
    public void testLogin() {
        driver.get("https://example.com/login");
        // Test code that might fail
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("testpass");
        driver.findElement(By.id("loginButton")).click();
        
        // Assertion that might fail
        String welcomeMsg = driver.findElement(By.id("welcome")).getText();
        Assert.assertEquals(welcomeMsg, "Welcome!");
    }
    
    @AfterMethod
    public void teardown(ITestResult result) throws IOException {
        // Take screenshot if test failed
        if (result.getStatus() == ITestResult.FAILURE) {
            String testName = result.getName();
            takeScreenshot(driver, testName + "_FAILED");
        }
        driver.quit();
    }
    
    private void takeScreenshot(WebDriver driver, String fileName) throws IOException {
        TakesScreenshot screenshot = (TakesScreenshot) driver;
        File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
        File destinationFile = new File("screenshots/failures/" + fileName + ".png");
        FileHandler.copy(sourceFile, destinationFile);
    }
}
```

---

### 3. Element Screenshot (Selenium 4+)

Capture screenshot of specific element instead of full page.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class ElementScreenshot {
    
    public static void main(String[] args) throws IOException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.google.com");
            
            // Find specific element
            WebElement searchBox = driver.findElement(By.name("q"));
            
            // Take screenshot of element only
            File sourceFile = searchBox.getScreenshotAs(OutputType.FILE);
            File destinationFile = new File("screenshots/search_box.png");
            FileHandler.copy(sourceFile, destinationFile);
            
            System.out.println("Element screenshot saved!");
            
        } finally {
            driver.quit();
        }
    }
}
```

**Benefits**:
- Smaller file size
- Focus on specific UI component
- Useful for component testing

---

### 4. Full Page Screenshot

By default, Selenium captures visible viewport. For full page:

```java
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import ru.yandex.qatools.ashot.AShot;
import ru.yandex.qatools.ashot.Screenshot;
import ru.yandex.qatools.ashot.shooting.ShootingStrategies;

import javax.imageio.ImageIO;
import java.io.File;

public class FullPageScreenshot {
    
    public static void main(String[] args) throws IOException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.wikipedia.org");
            
            // Using AShot library for full page screenshot
            Screenshot screenshot = new AShot()
                .shootingStrategy(ShootingStrategies.viewportPasting(1000))
                .takeScreenshot(driver);
            
            ImageIO.write(screenshot.getImage(), "PNG", 
                         new File("screenshots/full_page.png"));
            
            System.out.println("Full page screenshot saved!");
            
        } finally {
            driver.quit();
        }
    }
}
```

**Note**: Requires AShot dependency:
```xml
<dependency>
    <groupId>ru.yandex.qatools.ashot</groupId>
    <artifactId>ashot</artifactId>
    <version>1.5.4</version>
</dependency>
```

---

## 🛠️ Screenshot Utility Class

Create a reusable utility class for screenshots:

```java
package utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.io.FileHandler;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotUtils {
    
    private static final String SCREENSHOT_DIR = "screenshots/";
    
    /**
     * Take screenshot with timestamp
     */
    public static String takeScreenshot(WebDriver driver, String testName) {
        try {
            // Create directory if not exists
            new File(SCREENSHOT_DIR).mkdirs();
            
            // Generate filename with timestamp
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String fileName = testName + "_" + timestamp + ".png";
            String filePath = SCREENSHOT_DIR + fileName;
            
            // Take screenshot
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
            File destinationFile = new File(filePath);
            
            // Save screenshot
            FileHandler.copy(sourceFile, destinationFile);
            
            System.out.println("Screenshot saved: " + filePath);
            return filePath;
            
        } catch (IOException e) {
            System.err.println("Failed to take screenshot: " + e.getMessage());
            return null;
        }
    }
    
    /**
     * Take screenshot on failure
     */
    public static String takeFailureScreenshot(WebDriver driver, String testName) {
        String fileName = testName + "_FAILED";
        return takeScreenshot(driver, fileName);
    }
    
    /**
     * Take element screenshot
     */
    public static String takeElementScreenshot(WebElement element, String elementName) {
        try {
            new File(SCREENSHOT_DIR).mkdirs();
            
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String fileName = elementName + "_" + timestamp + ".png";
            String filePath = SCREENSHOT_DIR + fileName;
            
            File sourceFile = element.getScreenshotAs(OutputType.FILE);
            File destinationFile = new File(filePath);
            FileHandler.copy(sourceFile, destinationFile);
            
            System.out.println("Element screenshot saved: " + filePath);
            return filePath;
            
        } catch (IOException e) {
            System.err.println("Failed to take element screenshot: " + e.getMessage());
            return null;
        }
    }
    
    /**
     * Take screenshot as Base64 (useful for reports)
     */
    public static String takeScreenshotAsBase64(WebDriver driver) {
        TakesScreenshot screenshot = (TakesScreenshot) driver;
        return screenshot.getScreenshotAs(OutputType.BASE64);
    }
    
    /**
     * Take screenshot as bytes
     */
    public static byte[] takeScreenshotAsBytes(WebDriver driver) {
        TakesScreenshot screenshot = (TakesScreenshot) driver;
        return screenshot.getScreenshotAs(OutputType.BYTES);
    }
}
```

### Using the Utility Class

```java
public class TestWithScreenshots {
    WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
    }
    
    @Test
    public void testHomepage() {
        driver.get("https://www.example.com");
        
        // Take screenshot at important points
        ScreenshotUtils.takeScreenshot(driver, "homepage_loaded");
        
        // Perform actions
        driver.findElement(By.linkText("About")).click();
        ScreenshotUtils.takeScreenshot(driver, "about_page");
    }
    
    @AfterMethod
    public void teardown(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE) {
            ScreenshotUtils.takeFailureScreenshot(driver, result.getName());
        }
        driver.quit();
    }
}
```

---

## 👁️ Visual Testing Basics

### What is Visual Testing?

Visual testing compares screenshots to detect visual differences:
- Layout changes
- Color changes
- Font changes
- Missing elements
- Alignment issues

### Manual Visual Comparison

```java
public class VisualComparisonExample {
    
    public static void main(String[] args) throws IOException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        
        try {
            // Take baseline screenshot
            driver.get("https://www.example.com");
            ScreenshotUtils.takeScreenshot(driver, "baseline");
            
            // Make changes (e.g., after deployment)
            Thread.sleep(5000);  // Simulate time passing
            
            // Take comparison screenshot
            driver.navigate().refresh();
            ScreenshotUtils.takeScreenshot(driver, "comparison");
            
            System.out.println("Compare baseline.png with comparison.png manually");
            
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Visual Testing Tools

**Popular Tools**:
1. **Applitools Eyes** - AI-powered visual testing
2. **Percy** - Visual testing platform
3. **Selenium IDE** - Built-in visual testing
4. **AShot** - Screenshot comparison library

**Basic Comparison with AShot**:
```java
import ru.yandex.qatools.ashot.comparison.ImageDiff;
import ru.yandex.qatools.ashot.comparison.ImageDiffer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

public class ImageComparison {
    
    public static void main(String[] args) throws IOException {
        // Load images
        BufferedImage baseline = ImageIO.read(new File("screenshots/baseline.png"));
        BufferedImage current = ImageIO.read(new File("screenshots/current.png"));
        
        // Compare images
        ImageDiffer differ = new ImageDiffer();
        ImageDiff diff = differ.makeDiff(baseline, current);
        
        if (diff.hasDiff()) {
            System.out.println("Images are different!");
            System.out.println("Diff size: " + diff.getDiffSize());
            
            // Save diff image
            BufferedImage diffImage = diff.getMarkedImage();
            ImageIO.write(diffImage, "PNG", new File("screenshots/diff.png"));
        } else {
            System.out.println("Images are identical!");
        }
    }
}
```

---

## Common Mistakes to Avoid

### 1. Not Creating Screenshot Directory Before Saving
**Problem**: Attempting to save screenshots without first creating the destination directory.
**Why It's Wrong**: Causes `FileNotFoundException` and test failures, screenshots are lost, and tests become unreliable.
**Correct Approach**: Always create directory structure before saving screenshots.
```java
// Wrong way
File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
FileHandler.copy(screenshot, new File("screenshots/test.png"));
// Fails if screenshots/ doesn't exist

// Correct way
File screenshotDir = new File("screenshots");
if (!screenshotDir.exists()) {
    screenshotDir.mkdirs(); // Creates directory if not exists
}
File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
FileHandler.copy(screenshot, new File("screenshots/test.png"));
```

### 2. Overwriting Screenshots with Same Name
**Problem**: Using static filenames without timestamps, causing screenshots to overwrite each other.
**Why It's Wrong**: Lose historical screenshots, cannot track test execution over time, and debugging becomes difficult.
**Correct Approach**: Include timestamp or unique identifier in screenshot filename.
```java
// Wrong way
String fileName = "test_screenshot.png";
// Every screenshot overwrites the previous one

// Correct way
String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
String fileName = "test_screenshot_" + timestamp + ".png";

// Even better - include test name
String fileName = testName + "_" + timestamp + ".png";
```

### 3. Taking Screenshots at Wrong Time
**Problem**: Capturing screenshots before page loads completely or before elements are visible.
**Why It's Wrong**: Screenshots show incomplete state, not useful for debugging, and may capture loading screens instead of actual content.
**Correct Approach**: Wait for page/element to be ready before capturing screenshot.
```java
// Wrong way
driver.get("https://example.com");
takeScreenshot("homepage"); // May capture loading state

// Correct way
driver.get("https://example.com");
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("mainContent")));
takeScreenshot("homepage"); // Captures fully loaded page
```

### 4. Not Handling Screenshot Failures
**Problem**: Screenshot code throws exceptions that are not caught, causing test failures.
**Why It's Wrong**: Tests fail due to screenshot issues rather than actual test failures, and important test results are lost.
**Correct Approach**: Wrap screenshot code in try-catch blocks.
```java
// Wrong way
@AfterMethod
public void afterMethod(ITestResult result) {
    if (result.getStatus() == ITestResult.FAILURE) {
        File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileHandler.copy(screenshot, new File("screenshots/failure.png"));
        // IOException can crash the test
    }
}

// Correct way
@AfterMethod
public void afterMethod(ITestResult result) {
    if (result.getStatus() == ITestResult.FAILURE) {
        try {
            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            String fileName = result.getName() + "_" +
                new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()) + ".png";
            FileHandler.copy(screenshot, new File("screenshots/failures/" + fileName));
            System.out.println("Screenshot saved: " + fileName);
        } catch (IOException e) {
            System.err.println("Failed to capture screenshot: " + e.getMessage());
        }
    }
}
```

### 5. Taking Too Many Screenshots
**Problem**: Capturing screenshots after every single action, filling up disk space unnecessarily.
**Why It's Wrong**: Wastes storage space, slows down test execution, and makes it hard to find relevant screenshots.
**Correct Approach**: Take screenshots only at critical points and on failures.
```java
// Wrong way
driver.get("https://example.com");
takeScreenshot("step1");
driver.findElement(By.id("username")).sendKeys("user");
takeScreenshot("step2");
driver.findElement(By.id("password")).sendKeys("pass");
takeScreenshot("step3");
driver.findElement(By.id("login")).click();
takeScreenshot("step4");
// Too many screenshots!

// Correct way
driver.get("https://example.com");
loginPage.login("user", "pass");
// Screenshot only on failure (in @AfterMethod)
// Or at key checkpoints
if (importantStep) {
    takeScreenshot("critical_checkpoint");
}
```

### 6. Not Including Context in Screenshot Names
**Problem**: Using generic names like "screenshot1.png" without test or step information.
**Why It's Wrong**: Cannot identify what test or scenario the screenshot belongs to, and difficult to correlate with test failures.
**Correct Approach**: Include test name, timestamp, and optionally step description.
```java
// Wrong way
takeScreenshot("screenshot.png");
takeScreenshot("img1.png");

// Correct way
public void takeScreenshot(String testName, String step) {
    String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
    String fileName = testName + "_" + step + "_" + timestamp + ".png";
    // Example: loginTest_afterSubmit_20260121_143022.png
}

// Usage
takeScreenshot("loginTest", "afterSubmit");
takeScreenshot("checkoutTest", "paymentPage");
```

---

## Best Practices

### 1. Create a Centralized Screenshot Utility
**Why**: Promotes code reuse, ensures consistency across tests, and makes maintenance easier.
**How**: Build a utility class with methods for different screenshot scenarios.
```java
public class ScreenshotUtils {
    private static final String SCREENSHOT_DIR = "test-output/screenshots/";

    static {
        new File(SCREENSHOT_DIR).mkdirs();
    }

    public static String captureScreenshot(WebDriver driver, String testName) {
        try {
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String fileName = testName + "_" + timestamp + ".png";
            String filePath = SCREENSHOT_DIR + fileName;

            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            FileHandler.copy(screenshot, new File(filePath));

            return filePath;
        } catch (IOException e) {
            System.err.println("Screenshot capture failed: " + e.getMessage());
            return null;
        }
    }

    public static String captureFailureScreenshot(WebDriver driver, String testName) {
        return captureScreenshot(driver, testName + "_FAILED");
    }

    public static String captureElementScreenshot(WebElement element, String elementName) {
        try {
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String fileName = elementName + "_element_" + timestamp + ".png";
            String filePath = SCREENSHOT_DIR + fileName;

            File screenshot = element.getScreenshotAs(OutputType.FILE);
            FileHandler.copy(screenshot, new File(filePath));

            return filePath;
        } catch (IOException e) {
            System.err.println("Element screenshot failed: " + e.getMessage());
            return null;
        }
    }
}
```

### 2. Organize Screenshots by Date and Test Type
**Why**: Easy to locate screenshots, prevents directory clutter, and supports long-term test execution.
**How**: Create directory structure based on date and test category.
```java
public static String captureScreenshot(WebDriver driver, String testName, String category) {
    try {
        // Create date-based directory structure
        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        String timestamp = new SimpleDateFormat("HHmmss").format(new Date());

        // Structure: screenshots/2026-01-21/failures/loginTest_143022.png
        String dirPath = "screenshots/" + date + "/" + category + "/";
        new File(dirPath).mkdirs();

        String fileName = testName + "_" + timestamp + ".png";
        String filePath = dirPath + fileName;

        File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileHandler.copy(screenshot, new File(filePath));

        return filePath;
    } catch (IOException e) {
        System.err.println("Screenshot failed: " + e.getMessage());
        return null;
    }
}

// Usage
captureScreenshot(driver, "loginTest", "failures");
captureScreenshot(driver, "smokeTest", "passed");
```

### 3. Capture Screenshots on Test Failures Automatically
**Why**: Provides visual evidence of failures, aids in debugging, and creates test execution audit trail.
**How**: Use TestNG listeners or @AfterMethod to capture failure screenshots.
```java
public class BaseTest {
    protected WebDriver driver;

    @AfterMethod
    public void tearDown(ITestResult result) {
        // Capture screenshot on failure
        if (result.getStatus() == ITestResult.FAILURE) {
            String screenshotPath = ScreenshotUtils.captureFailureScreenshot(
                driver,
                result.getName()
            );

            // Log screenshot path
            System.out.println("Failure screenshot: " + screenshotPath);

            // Attach to report (if using reporting tool)
            // ExtentReports, Allure, etc.
        }

        if (driver != null) {
            driver.quit();
        }
    }
}
```

### 4. Use Different Screenshot Types for Different Purposes
**Why**: Element screenshots are faster and more focused, full-page captures show complete context, and viewport captures are good for quick checks.
**How**: Choose appropriate screenshot type based on what you're testing.
```java
// 1. Viewport screenshot (default Selenium)
public static void captureViewport(WebDriver driver, String name) {
    File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
    FileHandler.copy(screenshot, new File("screenshots/" + name + ".png"));
}

// 2. Element screenshot (Selenium 4+)
public static void captureElement(WebElement element, String name) {
    File screenshot = element.getScreenshotAs(OutputType.FILE);
    FileHandler.copy(screenshot, new File("screenshots/" + name + ".png"));
}

// 3. Full-page screenshot (using AShot library)
public static void captureFullPage(WebDriver driver, String name) {
    Screenshot screenshot = new AShot()
        .shootingStrategy(ShootingStrategies.viewportPasting(1000))
        .takeScreenshot(driver);
    ImageIO.write(screenshot.getImage(), "PNG", new File("screenshots/" + name + ".png"));
}

// Usage - choose based on need
captureViewport(driver, "quick_check");        // Fast, current view
captureElement(loginButton, "button_state");    // Specific element
captureFullPage(driver, "complete_page");       // Entire page
```

### 5. Implement Screenshot Cleanup Strategy
**Why**: Prevents disk space issues, keeps directories manageable, and maintains only relevant screenshots.
**How**: Implement automated cleanup of old screenshots.
```java
public class ScreenshotCleanup {

    public static void cleanupOldScreenshots(int daysToKeep) {
        File screenshotDir = new File("screenshots");
        if (!screenshotDir.exists()) return;

        long cutoffTime = System.currentTimeMillis() -
            (daysToKeep * 24L * 60 * 60 * 1000);

        deleteOldFiles(screenshotDir, cutoffTime);
    }

    private static void deleteOldFiles(File directory, long cutoffTime) {
        File[] files = directory.listFiles();
        if (files == null) return;

        for (File file : files) {
            if (file.isDirectory()) {
                deleteOldFiles(file, cutoffTime);
                // Delete empty directories
                if (file.list().length == 0) {
                    file.delete();
                }
            } else if (file.lastModified() < cutoffTime) {
                file.delete();
                System.out.println("Deleted old screenshot: " + file.getName());
            }
        }
    }
}

// Run before test suite
@BeforeSuite
public void cleanupBeforeSuite() {
    ScreenshotCleanup.cleanupOldScreenshots(7); // Keep last 7 days
}
```

### 6. Add Screenshots to Test Reports
**Why**: Makes reports more informative, provides visual test evidence, and helps stakeholders understand test results.
**How**: Integrate screenshots with reporting framework.
```java
// With ExtentReports
@AfterMethod
public void afterMethod(ITestResult result) {
    if (result.getStatus() == ITestResult.FAILURE) {
        try {
            String screenshotPath = ScreenshotUtils.captureFailureScreenshot(
                driver, result.getName()
            );

            // Add to ExtentReports
            ExtentTestManager.getTest().addScreenCaptureFromPath(screenshotPath);
            ExtentTestManager.getTest().fail("Test failed - see screenshot");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// With Allure
@Attachment(value = "Failure Screenshot", type = "image/png")
public byte[] saveFailureScreenshot(WebDriver driver) {
    return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
}
```

### 7. Use Base64 Screenshots for HTML Reports
**Why**: Screenshots embedded in single HTML file, easier to share reports, and no external file dependencies.
**How**: Convert screenshots to Base64 encoding.
```java
public class ScreenshotUtils {

    public static String getBase64Screenshot(WebDriver driver) {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);
    }

    public static void embedInReport(WebDriver driver, String testName) {
        String base64Screenshot = getBase64Screenshot(driver);

        // Create HTML with embedded image
        String html = "<h3>" + testName + "</h3>" +
                     "<img src='data:image/png;base64," + base64Screenshot +
                     "' alt='Screenshot'/>";

        // Add to report
        System.out.println("Screenshot embedded in report");
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Basic Screenshot
Create a script that:
1. Opens Amazon.com
2. Takes a screenshot
3. Saves it with timestamp
4. Prints the file path

### Exercise 2: Multiple Screenshots
Create a script that:
1. Opens Google
2. Takes screenshot of homepage
3. Searches for "Selenium"
4. Takes screenshot of results
5. Clicks first result
6. Takes screenshot of result page

### Exercise 3: Element Screenshots
Create a script that:
1. Opens Wikipedia
2. Takes screenshot of search box
3. Takes screenshot of logo
4. Takes screenshot of main article

### Exercise 4: Screenshot on Failure
Create a TestNG test that:
1. Intentionally fails
2. Captures screenshot on failure
3. Saves to "failures" folder
4. Includes test name in filename

### Exercise 5: Screenshot Utility
Create a utility class with methods:
1. `takeScreenshot(driver, name)`
2. `takeElementScreenshot(element, name)`
3. `takeFailureScreenshot(driver, testName)`
4. `getScreenshotAsBase64(driver)`

### Exercise 6: Organized Screenshots
Create a script that organizes screenshots by:
1. Date (folder: 2026-01-14)
2. Test name (subfolder: login_test)
3. Timestamp (file: screenshot_113045.png)

### Exercise 7: Screenshot Comparison
Create a script that:
1. Takes baseline screenshot
2. Makes a UI change (e.g., zoom)
3. Takes comparison screenshot
4. Compares both images
5. Reports if different

---

## 🔑 Key Takeaways

### Essential Concepts

1. **TakesScreenshot Interface**
   - Cast WebDriver to TakesScreenshot
   - Use `getScreenshotAs(OutputType.FILE)`
   - Save with FileHandler.copy()

2. **Screenshot Strategies**
   - Timestamp for uniqueness
   - On failure for debugging
   - Element-specific for focus
   - Full page for complete view

3. **Best Practices**
   - Always create screenshot directory
   - Use meaningful names
   - Include timestamps
   - Organize by test/date
   - Clean up old screenshots

4. **Visual Testing**
   - Compare screenshots over time
   - Detect visual regressions
   - Use specialized tools for automation
   - Manual comparison for simple cases

### Common Pitfalls

❌ **Don't**:
- Take screenshots without timestamps (overwrite risk)
- Store screenshots in project root
- Ignore screenshot failures
- Take too many screenshots (storage)

✅ **Do**:
- Use utility class for reusability
- Organize screenshots logically
- Clean up old screenshots periodically
- Take screenshots at key points
- Capture on test failure

---

## Interview Questions

### Basic Level

1. **What is the TakesScreenshot interface in Selenium and how do you use it?**
   - TakesScreenshot is an interface in Selenium that provides the capability to capture screenshots. Use it by casting WebDriver: `TakesScreenshot screenshot = (TakesScreenshot) driver;` then call `screenshot.getScreenshotAs(OutputType.FILE)` to capture. Finally, save using `FileHandler.copy(sourceFile, destinationFile);`

2. **What are the different OutputType options available for screenshots in Selenium?**
   - Three OutputType options exist: `OutputType.FILE` (returns File object for saving to disk), `OutputType.BYTES` (returns byte array for embedding in reports), and `OutputType.BASE64` (returns base64 encoded string for HTML reports). Example: `driver.getScreenshotAs(OutputType.FILE);`

3. **Why is it important to take screenshots during test execution?**
   - Screenshots provide visual evidence of test execution, help in debugging failures by showing actual state vs expected, meet compliance and audit requirements, enhance test reports with visuals, aid in communicating test results to stakeholders, and enable visual regression testing to detect UI changes.

4. **How do you capture a screenshot on test failure in TestNG?**
   - Use @AfterMethod with ITestResult parameter: Check test status with `result.getStatus() == ITestResult.FAILURE`, capture screenshot if failed, include test name in filename: `result.getName() + "_FAILED"`, and save to failures folder. This automatically captures evidence of every test failure.

### Intermediate Level

5. **Explain the difference between capturing a full page screenshot and viewport screenshot.**
   - Viewport screenshot (default Selenium) captures only visible browser window area using `TakesScreenshot.getScreenshotAs()`. Full page screenshot captures entire page including scrollable content, requires AShot library or similar tools: `new AShot().shootingStrategy(ShootingStrategies.viewportPasting()).takeScreenshot(driver);` Full page is larger in size but provides complete context.

6. **How do you capture screenshot of a specific element instead of the entire page?**
   - In Selenium 4+, WebElement has getScreenshotAs() method: `File screenshot = element.getScreenshotAs(OutputType.FILE);` then save: `FileHandler.copy(screenshot, new File("path/element.png"));` Benefits: smaller file size, focuses on specific component, faster capture, and useful for component-level testing.

7. **What is visual regression testing and how does it relate to screenshots?**
   - Visual regression testing compares screenshots of same page across different versions to detect unintended visual changes (layout, colors, fonts, missing elements). Process: take baseline screenshot, make changes, take comparison screenshot, use tools (AShot, Applitools, Percy) to compare images, identify differences. Helps catch CSS issues, responsive design problems, and unintended UI changes.

8. **Design a screenshot utility class. What methods should it include?**
   - Methods needed: `takeScreenshot(driver, testName)` with timestamp, `takeFailureScreenshot(driver, testName)` for failures, `takeElementScreenshot(element, name)` for specific elements, `getScreenshotAsBase64(driver)` for reports, `createScreenshotDirectory()` for folder management. Include error handling with try-catch, timestamp generation using SimpleDateFormat, and return file path for verification.

### Advanced Level

9. **How would you implement an automated screenshot cleanup strategy to prevent disk space issues?**
   - Implement `cleanupOldScreenshots(int daysToKeep)` method: Calculate cutoff time: `System.currentTimeMillis() - (days * 24 * 60 * 60 * 1000)`, iterate through screenshot directory recursively, check file lastModified date, delete files older than cutoff, remove empty directories, log deleted files. Run in @BeforeSuite or scheduled job. Consider keeping failures longer than passes.

10. **Explain how to integrate screenshots with different reporting frameworks (ExtentReports, Allure, TestNG reports).**
    - **ExtentReports**: Use `test.addScreenCaptureFromPath(screenshotPath)` or `test.fail("message").addScreenCaptureFromBase64String(base64)`. **Allure**: Use @Attachment annotation: `@Attachment(value = "Screenshot", type = "image/png") public byte[] saveScreenshot()`. **TestNG**: Implement ITestListener, override onTestFailure, capture and attach screenshots. Store screenshots in test-output folder for automatic inclusion in reports.

11. **What are the best practices for organizing and naming screenshots in a large test suite?**
    - Structure: `screenshots/YYYY-MM-DD/category/testName_timestamp.png` for date-based organization. Naming convention: Include test name, timestamp (yyyyMMdd_HHmmss), status (PASSED/FAILED), and optional step description. Example: `loginTest_afterSubmit_20260121_143022_FAILED.png`. Create subdirectories: passes/, failures/, debug/. Implement retention policy: keep failures for 30 days, passes for 7 days. Use meaningful test names that translate to readable filenames.

12. **How do you handle screenshots in parallel test execution? What challenges arise and how do you solve them?**
    - **Challenges**: Race conditions in filename generation, directory conflicts, shared resources. **Solutions**: Use ThreadLocal for WebDriver to isolate tests, include thread ID in filenames: `testName_threadId_timestamp.png`, use atomic operations for directory creation, implement synchronized blocks for file writing if needed, use thread-safe SimpleDateFormat or DateTimeFormatter. Example: `String filename = testName + "_" + Thread.currentThread().getId() + "_" + timestamp;` Ensure each thread writes to isolated folders or uses unique filenames to prevent overwrites.

---

## 🧭 Navigation

### Week 3 Progress:
- **Day 16: Screenshots & Visual Testing** ← You are here
- [Day 17: Browser Options & Capabilities](day17_browser_options_capabilities.md)
- [Day 18: TestNG Part 1 - Basics](day18_testng_part1.md)
- [Day 19: TestNG Part 2 - Annotations](day19_testng_part2.md)
- [Day 20: TestNG Part 3 - Organization](day20_testng_part3.md)
- [Day 21: TestNG Part 4 - Data-Driven](day21_testng_part4.md)
- [Day 22: TestNG Part 5 - Advanced](day22_testng_part5.md)

### Related Resources:
- [Week 3 Overview](README.md)
- [Selenium Course Overview](../README.md)

---

## ✅ Day 16 Checklist

Before moving to Day 17, ensure you can:
- [ ] Use TakesScreenshot interface
- [ ] Capture full page screenshots
- [ ] Capture element screenshots
- [ ] Save screenshots with timestamps
- [ ] Implement screenshot on failure
- [ ] Create screenshot utility class
- [ ] Organize screenshots effectively
- [ ] Understand visual testing basics
- [ ] Compare screenshots manually
- [ ] Complete all practice exercises

---

**🎉 Congratulations on completing Day 16!**

You now know how to capture and manage screenshots in Selenium. Tomorrow, we'll learn about browser options and capabilities to customize browser behavior.

**Next**: [Day 17: Browser Options & Capabilities →](day17_browser_options_capabilities.md)

---

*Last Updated: 2026-01-14*
*Difficulty: Intermediate*
*Estimated Time: 3-4 hours*