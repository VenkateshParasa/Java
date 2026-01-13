# Day 17: First Selenium Script

**Week 3: Selenium WebDriver Basics**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 17, you will be able to:
- Launch different web browsers using Selenium WebDriver
- Use WebDriverManager to manage browser drivers automatically
- Navigate to URLs using get() and navigate().to()
- Retrieve page information (title, URL, page source)
- Navigate browser history (back, forward, refresh)
- Manage browser windows (maximize, minimize, fullscreen)
- Understand the difference between close() and quit()
- Write complete browser automation scripts
- Handle basic browser operations
- Apply proper exception handling in automation scripts

---

## 📚 Topics Covered

### 1. Browser Drivers Overview

Each browser requires its specific driver implementation:

#### **ChromeDriver** (Most Popular)
```java
WebDriver driver = new ChromeDriver();
```
- **Browser**: Google Chrome
- **Speed**: Fast
- **Stability**: Excellent
- **Use Case**: Primary choice for most projects

#### **FirefoxDriver** (GeckoDriver)
```java
WebDriver driver = new FirefoxDriver();
```
- **Browser**: Mozilla Firefox
- **Speed**: Good
- **Stability**: Good
- **Use Case**: Cross-browser testing

#### **EdgeDriver**
```java
WebDriver driver = new EdgeDriver();
```
- **Browser**: Microsoft Edge
- **Speed**: Fast (Chromium-based)
- **Stability**: Excellent
- **Use Case**: Windows environments

#### **SafariDriver** (Mac Only)
```java
WebDriver driver = new SafariDriver();
```
- **Browser**: Safari
- **Speed**: Good
- **Stability**: Good
- **Use Case**: Mac/iOS testing

---

### 2. WebDriverManager Setup

WebDriverManager automatically downloads and configures browser drivers.

#### **Without WebDriverManager** (Old Way - DON'T USE):
```java
// Manual driver management - AVOID THIS
System.setProperty("webdriver.chrome.driver", "C:/drivers/chromedriver.exe");
WebDriver driver = new ChromeDriver();
```

**Problems**:
- Need to download driver manually
- Driver path different on each machine
- Driver version must match browser version
- Tedious maintenance

#### **With WebDriverManager** (Modern Way - USE THIS):
```java
// Automatic driver management - USE THIS
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();
```

**Benefits**:
- Automatic driver download
- Version matching with browser
- Works on any machine
- Zero maintenance

#### **WebDriverManager for Different Browsers**:
```java
// Chrome
WebDriverManager.chromedriver().setup();

// Firefox
WebDriverManager.firefoxdriver().setup();

// Edge
WebDriverManager.edgedriver().setup();

// Automatically detect and setup
WebDriverManager.chromedriver().setup();
```

---

### 3. Launching Browsers

#### **Basic Browser Launch**:
```java
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LaunchBrowser {
    public static void main(String[] args) {
        // Setup ChromeDriver
        WebDriverManager.chromedriver().setup();

        // Create ChromeDriver instance
        WebDriver driver = new ChromeDriver();

        // Browser is now open!
        System.out.println("Browser launched successfully!");

        // Close browser
        driver.quit();
    }
}
```

#### **What Happens**:
1. WebDriverManager downloads ChromeDriver (if not already cached)
2. Sets system property for driver path
3. ChromeDriver process starts
4. Chrome browser window opens
5. Your script now controls the browser

---

### 4. WebDriver Basic Commands

#### **get() - Navigate to URL**:
```java
driver.get("https://www.google.com");
```
- Opens the specified URL
- Waits for page to load
- Most commonly used navigation method

#### **getTitle() - Get Page Title**:
```java
String title = driver.getTitle();
System.out.println("Page Title: " + title);
```
- Returns the page title (text in browser tab)
- Returns String
- Useful for verification

#### **getCurrentUrl() - Get Current URL**:
```java
String currentUrl = driver.getCurrentUrl();
System.out.println("Current URL: " + currentUrl);
```
- Returns current page URL
- Useful for navigation verification
- Can change due to redirects

#### **getPageSource() - Get HTML Source**:
```java
String pageSource = driver.getPageSource();
System.out.println("Page source length: " + pageSource.length());
```
- Returns complete HTML of the page
- Returns very long string
- Rarely used in practice

#### **Complete Example**:
```java
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class BasicCommands {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        // Navigate to Google
        driver.get("https://www.google.com");

        // Get and print page title
        String title = driver.getTitle();
        System.out.println("Title: " + title);

        // Get and print current URL
        String url = driver.getCurrentUrl();
        System.out.println("URL: " + url);

        // Get page source length
        String source = driver.getPageSource();
        System.out.println("Page source length: " + source.length() + " characters");

        driver.quit();
    }
}
```

---

### 5. Browser Navigation

WebDriver provides two ways to navigate: direct methods and Navigation interface.

#### **navigate().to() - Navigate to URL**:
```java
driver.navigate().to("https://www.google.com");
```
- Similar to get()
- Part of Navigation interface
- Maintains navigation history

#### **navigate().back() - Go Back**:
```java
driver.navigate().back();
```
- Goes back one page in history
- Like clicking browser back button

#### **navigate().forward() - Go Forward**:
```java
driver.navigate().forward();
```
- Goes forward one page in history
- Like clicking browser forward button

#### **navigate().refresh() - Refresh Page**:
```java
driver.navigate().refresh();
```
- Reloads current page
- Like pressing F5 or clicking refresh

#### **Complete Navigation Example**:
```java
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class BrowserNavigation {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        // Navigate to Google
        driver.navigate().to("https://www.google.com");
        System.out.println("Navigated to Google");
        Thread.sleep(2000); // Wait 2 seconds

        // Navigate to YouTube
        driver.navigate().to("https://www.youtube.com");
        System.out.println("Navigated to YouTube");
        Thread.sleep(2000);

        // Go back to Google
        driver.navigate().back();
        System.out.println("Navigated back to Google");
        Thread.sleep(2000);

        // Go forward to YouTube
        driver.navigate().forward();
        System.out.println("Navigated forward to YouTube");
        Thread.sleep(2000);

        // Refresh current page
        driver.navigate().refresh();
        System.out.println("Page refreshed");

        driver.quit();
    }
}
```

**Note**: We're using `Thread.sleep()` here only for demonstration. In Week 4, you'll learn proper wait strategies.

---

### 6. get() vs navigate().to()

Both navigate to URLs, but with subtle differences:

#### **driver.get()**:
```java
driver.get("https://www.google.com");
```
- Simple method call
- Waits for page to load completely
- No navigation history maintained
- Most commonly used

#### **driver.navigate().to()**:
```java
driver.navigate().to("https://www.google.com");
```
- Part of Navigation interface
- Maintains browser history
- Enables back() and forward()
- Use when you need navigation operations

#### **When to Use Which**:
```java
// Use get() for simple navigation
driver.get("https://example.com");

// Use navigate().to() when you'll use back/forward
driver.navigate().to("https://page1.com");
driver.navigate().to("https://page2.com");
driver.navigate().back();  // Need history
```

**Recommendation**: Use `get()` for simplicity unless you need navigation history.

---

### 7. Window Management

#### **maximize() - Maximize Window**:
```java
driver.manage().window().maximize();
```
- Maximizes browser window
- Recommended for all tests
- Ensures elements are visible

#### **fullscreen() - Fullscreen Mode**:
```java
driver.manage().window().fullscreen();
```
- Opens browser in fullscreen (F11 mode)
- Hides browser UI
- Rarely used

#### **setSize() - Set Specific Size**:
```java
import org.openqa.selenium.Dimension;

Dimension size = new Dimension(1920, 1080);
driver.manage().window().setSize(size);
```
- Sets specific window dimensions
- Useful for responsive testing

#### **getSize() - Get Window Size**:
```java
Dimension size = driver.manage().window().getSize();
System.out.println("Width: " + size.getWidth());
System.out.println("Height: " + size.getHeight());
```

#### **setPosition() - Set Window Position**:
```java
import org.openqa.selenium.Point;

Point position = new Point(0, 0);
driver.manage().window().setPosition(position);
```

#### **Complete Window Management Example**:
```java
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WindowManagement {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.google.com");

        // Maximize window
        driver.manage().window().maximize();
        System.out.println("Window maximized");
        Thread.sleep(2000);

        // Set specific size
        driver.manage().window().setSize(new Dimension(800, 600));
        System.out.println("Window resized to 800x600");
        Thread.sleep(2000);

        // Set position
        driver.manage().window().setPosition(new Point(100, 100));
        System.out.println("Window moved to (100, 100)");
        Thread.sleep(2000);

        // Fullscreen
        driver.manage().window().fullscreen();
        System.out.println("Window in fullscreen mode");
        Thread.sleep(2000);

        // Back to maximize
        driver.manage().window().maximize();

        driver.quit();
    }
}
```

---

### 8. close() vs quit()

Understanding the difference is crucial to avoid memory leaks.

#### **close() - Close Current Window**:
```java
driver.close();
```
- Closes **only** the current browser window
- WebDriver session remains active
- If only one window is open, browser closes but session continues
- Can cause memory leaks if not used properly

#### **quit() - Close All Windows and End Session**:
```java
driver.quit();
```
- Closes **all** browser windows
- Ends the WebDriver session
- Frees up resources
- **Always use this** at the end of tests

#### **Comparison Example**:
```java
public class CloseVsQuit {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.google.com");

        // DON'T DO THIS - memory leak
        // driver.close(); // Only closes window, session stays

        // DO THIS - proper cleanup
        driver.quit(); // Closes all windows and ends session
    }
}
```

#### **When to Use Which**:
```java
// Scenario 1: Single window - Use quit()
driver.get("https://example.com");
driver.quit(); // Always use quit()

// Scenario 2: Multiple windows
driver.get("https://example.com");
// Open another window (we'll learn this later)
driver.switchTo().window(windowHandle);
driver.close(); // Close this specific window
driver.switchTo().window(mainWindow);
driver.quit(); // End session
```

**Golden Rule**: Always use `quit()` at the end of your tests.

---

### 9. Proper Script Structure

A well-structured script follows this pattern:

```java
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ProperScriptStructure {
    public static void main(String[] args) {
        WebDriver driver = null;

        try {
            // 1. Setup
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver();
            driver.manage().window().maximize();

            // 2. Test Steps
            driver.get("https://www.google.com");
            System.out.println("Title: " + driver.getTitle());

            // 3. Verification
            if (driver.getTitle().contains("Google")) {
                System.out.println("Test Passed");
            } else {
                System.out.println("Test Failed");
            }

        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            // 4. Cleanup - ALWAYS execute
            if (driver != null) {
                driver.quit();
                System.out.println("Browser closed");
            }
        }
    }
}
```

**Why This Structure**:
- `try-catch-finally` ensures cleanup happens
- `finally` block always executes, even if errors occur
- Prevents browser instances from staying open
- Professional coding practice

---

## 💻 Practical Exercises

### Exercise 1: Launch Chrome Browser

**📝 Problem Statement:**
Write a script to launch Chrome browser and navigate to Google.

**Requirements:**
- Use WebDriverManager
- Launch Chrome
- Navigate to https://www.google.com
- Close browser properly

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise01_LaunchChrome {
    public static void main(String[] args) {
        // Setup ChromeDriver
        WebDriverManager.chromedriver().setup();

        // Launch Chrome browser
        WebDriver driver = new ChromeDriver();

        // Navigate to Google
        driver.get("https://www.google.com");

        System.out.println("Chrome browser launched successfully!");
        System.out.println("Navigated to Google");

        // Close browser
        driver.quit();
    }
}
```

**Expected Output:**
```
Chrome browser launched successfully!
Navigated to Google
```

---

### Exercise 2: Launch Multiple Browsers

**📝 Problem Statement:**
Write scripts to launch Chrome, Firefox, and Edge browsers.

**Requirements:**
- Create three separate methods
- Each launches different browser
- Navigate to same website
- Print browser name

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class Exercise02_MultipleBrowsers {

    public static void launchChrome() {
        System.out.println("\n=== Launching Chrome ===");
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");
        System.out.println("Chrome Title: " + driver.getTitle());
        driver.quit();
    }

    public static void launchFirefox() {
        System.out.println("\n=== Launching Firefox ===");
        WebDriverManager.firefoxdriver().setup();
        WebDriver driver = new FirefoxDriver();
        driver.get("https://www.selenium.dev");
        System.out.println("Firefox Title: " + driver.getTitle());
        driver.quit();
    }

    public static void launchEdge() {
        System.out.println("\n=== Launching Edge ===");
        WebDriverManager.edgedriver().setup();
        WebDriver driver = new EdgeDriver();
        driver.get("https://www.selenium.dev");
        System.out.println("Edge Title: " + driver.getTitle());
        driver.quit();
    }

    public static void main(String[] args) {
        launchChrome();
        launchFirefox();
        launchEdge();

        System.out.println("\n=== All browsers tested successfully! ===");
    }
}
```

---

### Exercise 3: Get Page Title

**📝 Problem Statement:**
Navigate to a website and print its title.

**Requirements:**
- Navigate to https://www.wikipedia.org
- Get page title
- Print title
- Verify title contains "Wikipedia"

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise03_GetPageTitle {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Navigate to Wikipedia
            driver.get("https://www.wikipedia.org");

            // Get page title
            String pageTitle = driver.getTitle();

            // Print title
            System.out.println("Page Title: " + pageTitle);

            // Verification
            if (pageTitle.contains("Wikipedia")) {
                System.out.println("✓ Test Passed: Title contains 'Wikipedia'");
            } else {
                System.out.println("✗ Test Failed: Title does not contain 'Wikipedia'");
            }

        } finally {
            driver.quit();
        }
    }
}
```

**Expected Output:**
```
Page Title: Wikipedia
✓ Test Passed: Title contains 'Wikipedia'
```

---

### Exercise 4: Get Current URL

**📝 Problem Statement:**
Navigate to a website, then verify the current URL.

**Requirements:**
- Navigate to https://www.github.com
- Get current URL
- Print URL
- Verify URL matches expected

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise04_GetCurrentURL {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Expected URL
            String expectedUrl = "https://github.com/";

            // Navigate to GitHub
            driver.get("https://www.github.com");

            // Get current URL
            String currentUrl = driver.getCurrentUrl();

            // Print URL
            System.out.println("Current URL: " + currentUrl);

            // Verification
            if (currentUrl.equals(expectedUrl)) {
                System.out.println("✓ URL matches expected");
            } else {
                System.out.println("✗ URL does not match");
                System.out.println("Expected: " + expectedUrl);
                System.out.println("Actual: " + currentUrl);
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 5: Browser Navigation - Back and Forward

**📝 Problem Statement:**
Navigate between multiple pages using back() and forward().

**Requirements:**
- Visit three websites
- Navigate back twice
- Navigate forward once
- Print current URL after each navigation

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise05_BackAndForward {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Navigate to first page
            driver.get("https://www.google.com");
            System.out.println("Page 1: " + driver.getTitle());
            Thread.sleep(1000);

            // Navigate to second page
            driver.navigate().to("https://www.facebook.com");
            System.out.println("Page 2: " + driver.getTitle());
            Thread.sleep(1000);

            // Navigate to third page
            driver.navigate().to("https://www.twitter.com");
            System.out.println("Page 3: " + driver.getTitle());
            Thread.sleep(1000);

            // Go back to page 2
            driver.navigate().back();
            System.out.println("After back(): " + driver.getTitle());
            Thread.sleep(1000);

            // Go back to page 1
            driver.navigate().back();
            System.out.println("After back(): " + driver.getTitle());
            Thread.sleep(1000);

            // Go forward to page 2
            driver.navigate().forward();
            System.out.println("After forward(): " + driver.getTitle());

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 6: Page Refresh

**📝 Problem Statement:**
Navigate to a page and refresh it multiple times.

**Requirements:**
- Navigate to https://www.google.com
- Refresh page 3 times
- Print message after each refresh

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise06_PageRefresh {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.google.com");
            System.out.println("Initial page loaded: " + driver.getTitle());

            for (int i = 1; i <= 3; i++) {
                Thread.sleep(2000);
                driver.navigate().refresh();
                System.out.println("Page refreshed " + i + " time(s)");
            }

            System.out.println("Final title: " + driver.getTitle());

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 7: Maximize Window

**📝 Problem Statement:**
Launch browser in normal size, then maximize it.

**Requirements:**
- Launch browser
- Navigate to website
- Maximize window
- Print window size before and after

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise07_MaximizeWindow {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.selenium.dev");

            // Get initial size
            Dimension initialSize = driver.manage().window().getSize();
            System.out.println("Initial Size: " + initialSize.getWidth() + "x" + initialSize.getHeight());

            Thread.sleep(2000);

            // Maximize window
            driver.manage().window().maximize();
            System.out.println("Window maximized");

            Thread.sleep(1000);

            // Get size after maximize
            Dimension maxSize = driver.manage().window().getSize();
            System.out.println("Maximized Size: " + maxSize.getWidth() + "x" + maxSize.getHeight());

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 8: Set Custom Window Size

**📝 Problem Statement:**
Set browser window to specific dimensions for responsive testing.

**Requirements:**
- Set window to 1366x768 (laptop screen)
- Navigate to website
- Print current window size
- Take note of how page looks

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise08_CustomWindowSize {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Set to laptop size (1366x768)
            driver.manage().window().setSize(new Dimension(1366, 768));
            System.out.println("Window set to 1366x768 (Laptop)");

            driver.get("https://www.amazon.com");
            Thread.sleep(2000);

            // Set to tablet size (768x1024)
            driver.manage().window().setSize(new Dimension(768, 1024));
            System.out.println("Window set to 768x1024 (Tablet)");
            Thread.sleep(2000);

            // Set to mobile size (375x667)
            driver.manage().window().setSize(new Dimension(375, 667));
            System.out.println("Window set to 375x667 (Mobile)");
            Thread.sleep(2000);

            // Get current size
            Dimension currentSize = driver.manage().window().getSize();
            System.out.println("Current Size: " + currentSize.getWidth() + "x" + currentSize.getHeight());

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 9: Demonstrate close() vs quit()

**📝 Problem Statement:**
Create examples showing the difference between close() and quit().

**Requirements:**
- Show correct usage of quit()
- Show what happens with close()
- Add comments explaining difference

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise09_CloseVsQuit {

    // Example 1: Correct usage with quit()
    public static void correctUsage() {
        System.out.println("\n=== Example 1: Using quit() - CORRECT ===");
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.google.com");
            System.out.println("Page loaded: " + driver.getTitle());

        } finally {
            // quit() closes all windows and ends the session
            driver.quit();
            System.out.println("Browser closed properly with quit()");
        }
    }

    // Example 2: Using close() - Can cause issues
    public static void closeExample() {
        System.out.println("\n=== Example 2: Using close() ===");
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.google.com");
            System.out.println("Page loaded: " + driver.getTitle());

            // close() only closes current window
            // If only one window, browser closes but session remains
            driver.close();
            System.out.println("Browser closed with close()");

            // This will cause error because session still exists but browser is closed
            // driver.getTitle(); // Would throw exception

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        correctUsage();
        closeExample();

        System.out.println("\n=== Summary ===");
        System.out.println("✓ Always use quit() at the end of tests");
        System.out.println("✗ Avoid using close() unless working with multiple windows");
    }
}
```

---

### Exercise 10: Get Page Source

**📝 Problem Statement:**
Retrieve page source and analyze it.

**Requirements:**
- Navigate to a simple webpage
- Get page source
- Print source length
- Check if source contains specific text

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise10_GetPageSource {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.example.com");

            // Get page source
            String pageSource = driver.getPageSource();

            // Print source length
            System.out.println("Page source length: " + pageSource.length() + " characters");

            // Check if contains specific text
            if (pageSource.contains("Example Domain")) {
                System.out.println("✓ Page source contains 'Example Domain'");
            }

            if (pageSource.contains("<!DOCTYPE html>")) {
                System.out.println("✓ Page source contains HTML declaration");
            }

            // Print first 200 characters
            System.out.println("\nFirst 200 characters of page source:");
            System.out.println(pageSource.substring(0, Math.min(200, pageSource.length())));

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 11: Complete Navigation Workflow

**📝 Problem Statement:**
Create a script that performs a complete navigation workflow.

**Requirements:**
- Navigate to multiple websites
- Use back/forward navigation
- Refresh page
- Maximize window
- Print details at each step

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise11_CompleteWorkflow {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Step 1: Maximize window
            driver.manage().window().maximize();
            System.out.println("Step 1: Window maximized");

            // Step 2: Navigate to Google
            driver.get("https://www.google.com");
            System.out.println("Step 2: Navigated to Google");
            System.out.println("  Title: " + driver.getTitle());
            Thread.sleep(2000);

            // Step 3: Navigate to YouTube
            driver.navigate().to("https://www.youtube.com");
            System.out.println("Step 3: Navigated to YouTube");
            System.out.println("  Title: " + driver.getTitle());
            Thread.sleep(2000);

            // Step 4: Navigate to Gmail
            driver.navigate().to("https://www.gmail.com");
            System.out.println("Step 4: Navigated to Gmail");
            System.out.println("  Title: " + driver.getTitle());
            Thread.sleep(2000);

            // Step 5: Go back to YouTube
            driver.navigate().back();
            System.out.println("Step 5: Navigated back");
            System.out.println("  Current URL: " + driver.getCurrentUrl());
            Thread.sleep(2000);

            // Step 6: Go back to Google
            driver.navigate().back();
            System.out.println("Step 6: Navigated back again");
            System.out.println("  Current URL: " + driver.getCurrentUrl());
            Thread.sleep(2000);

            // Step 7: Go forward to YouTube
            driver.navigate().forward();
            System.out.println("Step 7: Navigated forward");
            System.out.println("  Current URL: " + driver.getCurrentUrl());
            Thread.sleep(2000);

            // Step 8: Refresh page
            driver.navigate().refresh();
            System.out.println("Step 8: Page refreshed");

            System.out.println("\n✓ Complete navigation workflow executed successfully!");

        } finally {
            System.out.println("\nClosing browser...");
            driver.quit();
            System.out.println("Browser closed");
        }
    }
}
```

---

### Exercise 12: Browser Factory Method

**📝 Problem Statement:**
Create a reusable method that returns WebDriver for any browser.

**Requirements:**
- Create method that accepts browser name
- Return appropriate WebDriver
- Support Chrome, Firefox, Edge
- Use switch-case statement

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class Exercise12_BrowserFactory {

    public static WebDriver launchBrowser(String browserName) {
        WebDriver driver;

        switch (browserName.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                driver = new ChromeDriver();
                System.out.println("Chrome browser launched");
                break;

            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                driver = new FirefoxDriver();
                System.out.println("Firefox browser launched");
                break;

            case "edge":
                WebDriverManager.edgedriver().setup();
                driver = new EdgeDriver();
                System.out.println("Edge browser launched");
                break;

            default:
                System.out.println("Invalid browser name. Launching Chrome by default.");
                WebDriverManager.chromedriver().setup();
                driver = new ChromeDriver();
                break;
        }

        driver.manage().window().maximize();
        return driver;
    }

    public static void main(String[] args) {
        // Test with Chrome
        WebDriver driver1 = launchBrowser("chrome");
        driver1.get("https://www.selenium.dev");
        System.out.println("Title: " + driver1.getTitle());
        driver1.quit();

        // Test with Firefox
        WebDriver driver2 = launchBrowser("firefox");
        driver2.get("https://www.selenium.dev");
        System.out.println("Title: " + driver2.getTitle());
        driver2.quit();

        System.out.println("\n✓ Browser factory method tested successfully!");
    }
}
```

---

### Exercise 13: Exception Handling in Automation

**📝 Problem Statement:**
Implement proper exception handling for browser automation.

**Requirements:**
- Use try-catch-finally
- Handle exceptions gracefully
- Ensure browser always closes
- Print meaningful error messages

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise13_ExceptionHandling {
    public static void main(String[] args) {
        WebDriver driver = null;

        try {
            // Setup and launch
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver();
            driver.manage().window().maximize();
            System.out.println("Browser launched successfully");

            // Navigate
            driver.get("https://www.google.com");
            System.out.println("Navigated to: " + driver.getCurrentUrl());

            // Get title
            String title = driver.getTitle();
            System.out.println("Page Title: " + title);

            // Verify title
            if (title.contains("Google")) {
                System.out.println("✓ Test Passed");
            } else {
                throw new Exception("Title verification failed");
            }

        } catch (Exception e) {
            System.err.println("✗ Error occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            // Cleanup - always execute
            if (driver != null) {
                driver.quit();
                System.out.println("Browser closed in finally block");
            }
        }
    }
}
```

---

### Exercise 14: Verify Multiple Page Properties

**📝 Problem Statement:**
Navigate to a page and verify multiple properties.

**Requirements:**
- Navigate to https://www.selenium.dev
- Verify title contains "Selenium"
- Verify URL contains "selenium.dev"
- Verify page source contains "WebDriver"
- Print all verifications

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise14_VerifyPageProperties {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.manage().window().maximize();
            driver.get("https://www.selenium.dev");

            System.out.println("=== Page Property Verification ===\n");

            // Verify title
            String title = driver.getTitle();
            System.out.println("Title: " + title);
            if (title.contains("Selenium")) {
                System.out.println("✓ Title contains 'Selenium'");
            } else {
                System.out.println("✗ Title verification failed");
            }

            // Verify URL
            String url = driver.getCurrentUrl();
            System.out.println("\nURL: " + url);
            if (url.contains("selenium.dev")) {
                System.out.println("✓ URL contains 'selenium.dev'");
            } else {
                System.out.println("✗ URL verification failed");
            }

            // Verify page source
            String pageSource = driver.getPageSource();
            System.out.println("\nPage source length: " + pageSource.length());
            if (pageSource.contains("WebDriver")) {
                System.out.println("✓ Page source contains 'WebDriver'");
            } else {
                System.out.println("✗ Page source verification failed");
            }

            System.out.println("\n=== All verifications completed ===");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 15: Visit Multiple Websites

**📝 Problem Statement:**
Create a script that visits multiple websites and collects their titles.

**Requirements:**
- Visit 5 different websites
- Collect all titles in an ArrayList
- Print all titles at the end
- Use loop for navigation

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.ArrayList;

public class Exercise15_MultipleWebsites {
    public static void main(String[] args) throws InterruptedException {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.manage().window().maximize();

            // List of websites to visit
            String[] websites = {
                "https://www.google.com",
                "https://www.wikipedia.org",
                "https://www.github.com",
                "https://www.stackoverflow.com",
                "https://www.selenium.dev"
            };

            // ArrayList to store titles
            ArrayList<String> titles = new ArrayList<>();

            // Visit each website and collect title
            for (int i = 0; i < websites.length; i++) {
                driver.get(websites[i]);
                String title = driver.getTitle();
                titles.add(title);
                System.out.println((i + 1) + ". " + websites[i]);
                System.out.println("   Title: " + title);
                Thread.sleep(1000);
            }

            // Print summary
            System.out.println("\n=== Summary of Titles ===");
            for (int i = 0; i < titles.size(); i++) {
                System.out.println((i + 1) + ". " + titles.get(i));
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

## 🔑 Key Takeaways

1. **WebDriverManager**:
   - Automatic driver management
   - `WebDriverManager.chromedriver().setup()`
   - No manual driver downloads needed

2. **Launching Browsers**:
   - `WebDriver driver = new ChromeDriver()`
   - Always maximize: `driver.manage().window().maximize()`

3. **Navigation**:
   - `driver.get(url)` - Simple navigation
   - `driver.navigate().to(url)` - With history
   - `driver.navigate().back()` - Go back
   - `driver.navigate().forward()` - Go forward
   - `driver.navigate().refresh()` - Reload page

4. **Getting Information**:
   - `driver.getTitle()` - Page title
   - `driver.getCurrentUrl()` - Current URL
   - `driver.getPageSource()` - HTML source

5. **Window Management**:
   - `driver.manage().window().maximize()` - Maximize
   - `driver.manage().window().setSize()` - Custom size
   - `driver.manage().window().fullscreen()` - Fullscreen

6. **Closing Browser**:
   - `driver.close()` - Close current window (rarely use)
   - `driver.quit()` - Close all and end session (always use)

7. **Best Practices**:
   - Always use try-catch-finally
   - Always call quit() in finally block
   - Maximize window for all tests
   - Use WebDriverManager for all browsers

---

## 📖 Additional Resources

### Official Documentation:
- [WebDriver Commands](https://www.selenium.dev/documentation/webdriver/elements/)
- [Browser Navigation](https://www.selenium.dev/documentation/webdriver/interactions/navigation/)
- [WebDriverManager GitHub](https://github.com/bonigarcia/webdrivermanager)

### Video Tutorials:
- Search "First Selenium Script" on YouTube
- "WebDriver Commands Tutorial"
- "Browser Navigation in Selenium"

### Practice Websites:
- https://www.selenium.dev
- https://www.example.com
- https://www.google.com

---

## 🧭 Navigation

### Week 3 Progress:
- [Week 3 Overview](README.md)
- [Day 16: Selenium Introduction & Setup](day16_selenium_introduction_setup.md)
- **Day 17: First Selenium Script** ← You are here
- [Day 18: Locators - Part 1](day18_locators_part1.md)
- [Day 19: Locators - Part 2 (XPath)](day19_locators_part2_xpath.md)
- [Day 20: Locators - Part 3 (CSS Selector)](day20_locators_part3_css.md)
- [Day 21: WebElement Interactions](day21_webelement_interactions.md)

### Related Resources:
- [Day 17 Assessment](../../../src/data/assessments/selenium/week3/day17.js)
- [Week 3 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Selenium/Week3_Days15-21_Selenium_Basics.md)

---

## ✅ Day 17 Checklist

Before moving to Day 18, ensure you can:
- [ ] Launch Chrome browser using WebDriverManager
- [ ] Navigate to any URL using get()
- [ ] Get page title, URL, and source
- [ ] Use navigate().back() and forward()
- [ ] Refresh a page
- [ ] Maximize browser window
- [ ] Set custom window size
- [ ] Understand difference between close() and quit()
- [ ] Use try-catch-finally for proper cleanup
- [ ] Write complete browser automation scripts

---

**🎉 Congratulations on completing Day 17!**

You've successfully written your first Selenium scripts! You can now launch browsers, navigate websites, and control browser operations. Tomorrow, you'll learn how to locate elements on web pages - the foundation of all automation.

**Next**: [Day 18: Locators - Part 1 →](day18_locators_part1.md)

---

*Last Updated: 2026-01-12*
