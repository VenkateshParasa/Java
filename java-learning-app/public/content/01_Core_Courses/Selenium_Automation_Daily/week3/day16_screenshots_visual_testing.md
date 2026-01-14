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