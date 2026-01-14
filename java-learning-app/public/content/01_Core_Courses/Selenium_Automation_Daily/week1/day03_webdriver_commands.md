---
title: "Day 3: WebDriver Commands & Browser Interactions"
course: "Selenium Automation Daily"
week: 1
day: 3
difficulty: "Beginner"
duration: "90 minutes"
topics:
  - WebDriver Commands
  - Browser Navigation
  - Window Management
  - Screenshots
  - JavaScript Executor
  - Cookie Management
prerequisites:
  - Day 1: Introduction to Selenium WebDriver
  - Day 2: Selenium Locators
  - Basic Java knowledge
---

# Day 3: WebDriver Commands & Browser Interactions

## Learning Objectives

By the end of this lesson, you will be able to:

- Understand and implement various WebDriver navigation commands
- Manage browser windows effectively (resize, position, maximize)
- Handle multiple browser windows and tabs using window handles
- Differentiate between close() and quit() methods
- Capture screenshots during test execution
- Execute JavaScript code using JavascriptExecutor
- Manage browser cookies programmatically
- Apply best practices for browser interactions in automation scripts

---

## Table of Contents

1. [Introduction to WebDriver Commands](#introduction-to-webdriver-commands)
2. [Browser Navigation Commands](#browser-navigation-commands)
3. [Browser Window Management](#browser-window-management)
4. [Browser Context Commands](#browser-context-commands)
5. [Taking Screenshots](#taking-screenshots)
6. [JavaScript Executor Basics](#javascript-executor-basics)
7. [Browser Cookies Management](#browser-cookies-management)
8. [Practical Examples](#practical-examples)
9. [Best Practices](#best-practices)
10. [Common Mistakes](#common-mistakes)
11. [Practice Exercises](#practice-exercises)
12. [Interview Questions](#interview-questions)
13. [Key Takeaways](#key-takeaways)

---

## Introduction to WebDriver Commands

WebDriver provides a rich set of commands to interact with browsers and web elements. These commands can be broadly categorized into:

- **Navigation Commands**: Control browser navigation (forward, back, refresh)
- **Browser Commands**: Manage browser window properties
- **Informational Commands**: Retrieve information about the current page
- **Context Commands**: Switch between windows, frames, and alerts
- **Cookie Commands**: Manage browser cookies
- **Screenshot Commands**: Capture page screenshots
- **JavaScript Commands**: Execute custom JavaScript code

### WebDriver Command Categories

```
WebDriver Commands
├── Navigation Commands
│   ├── get()
│   ├── navigate().to()
│   ├── navigate().back()
│   ├── navigate().forward()
│   └── navigate().refresh()
├── Browser Management
│   ├── Window Size
│   ├── Window Position
│   └── Window Handles
├── Context Switching
│   ├── switchTo().window()
│   ├── switchTo().frame()
│   └── switchTo().alert()
├── Information Retrieval
│   ├── getCurrentUrl()
│   ├── getTitle()
│   └── getPageSource()
└── Advanced Operations
    ├── TakesScreenshot
    ├── JavascriptExecutor
    └── Cookie Management
```

---

## Browser Navigation Commands

### 1. Loading a Web Page

#### get() Method

The `get()` method is the most commonly used command to navigate to a URL. It waits for the page to load completely before proceeding.

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class NavigationExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        // Navigate to a URL using get()
        driver.get("https://www.selenium.dev");

        // The execution waits until the page loads
        System.out.println("Page loaded successfully");

        driver.quit();
    }
}
```

#### navigate().to() Method

The `navigate().to()` method is similar to `get()` but is part of the Navigation interface. It provides additional navigation capabilities.

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class NavigateToExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        // Navigate using navigate().to()
        driver.navigate().to("https://www.selenium.dev");

        System.out.println("Navigated to Selenium website");

        driver.quit();
    }
}
```

**Key Difference:**
- `get()` is a direct method on WebDriver
- `navigate().to()` is part of the Navigation interface and provides access to other navigation methods
- Both wait for page load, but `navigate()` gives access to back(), forward(), and refresh()

### 2. Browser Navigation History

#### navigate().back()

Navigates back to the previous page in the browser's history.

```java
public class BackNavigationExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        // Navigate to first page
        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);

        // Navigate to second page
        driver.navigate().to("https://www.selenium.dev/documentation");
        Thread.sleep(2000);

        // Go back to previous page
        driver.navigate().back();
        System.out.println("Current URL after back: " + driver.getCurrentUrl());

        driver.quit();
    }
}
```

#### navigate().forward()

Navigates forward to the next page in the browser's history (if available).

```java
public class ForwardNavigationExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);

        driver.navigate().to("https://www.selenium.dev/documentation");
        Thread.sleep(2000);

        // Navigate back
        driver.navigate().back();
        Thread.sleep(2000);

        // Navigate forward
        driver.navigate().forward();
        System.out.println("Current URL after forward: " + driver.getCurrentUrl());

        driver.quit();
    }
}
```

#### navigate().refresh()

Refreshes the current page, similar to pressing F5 or clicking the refresh button.

```java
public class RefreshExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);

        // Refresh the current page
        driver.navigate().refresh();
        System.out.println("Page refreshed successfully");

        driver.quit();
    }
}
```

### 3. Retrieving Page Information

#### getCurrentUrl()

Returns the URL of the current page.

```java
public class GetCurrentUrlExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");

        // Get current URL
        String currentUrl = driver.getCurrentUrl();
        System.out.println("Current URL: " + currentUrl);

        // Verify URL
        if (currentUrl.equals("https://www.selenium.dev/")) {
            System.out.println("URL verification passed");
        }

        driver.quit();
    }
}
```

#### getTitle()

Returns the title of the current page.

```java
public class GetTitleExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");

        // Get page title
        String pageTitle = driver.getTitle();
        System.out.println("Page Title: " + pageTitle);

        // Verify title
        if (pageTitle.contains("Selenium")) {
            System.out.println("Title verification passed");
        }

        driver.quit();
    }
}
```

#### getPageSource()

Returns the complete HTML source code of the current page.

```java
public class GetPageSourceExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");

        // Get page source
        String pageSource = driver.getPageSource();

        // Check if specific content exists
        if (pageSource.contains("WebDriver")) {
            System.out.println("Page contains 'WebDriver' text");
        }

        // Print first 500 characters
        System.out.println("Page source (first 500 chars): " +
                          pageSource.substring(0, Math.min(500, pageSource.length())));

        driver.quit();
    }
}
```

### Navigation Commands Comparison

| Command | Purpose | Returns | Waits for Page Load |
|---------|---------|---------|---------------------|
| `get(String url)` | Navigate to URL | void | Yes |
| `navigate().to(String url)` | Navigate to URL | void | Yes |
| `navigate().back()` | Go to previous page | void | Yes |
| `navigate().forward()` | Go to next page | void | Yes |
| `navigate().refresh()` | Refresh current page | void | Yes |
| `getCurrentUrl()` | Get current URL | String | No |
| `getTitle()` | Get page title | String | No |
| `getPageSource()` | Get HTML source | String | No |

---

## Browser Window Management

### 1. Window Size Management

#### maximize()

Maximizes the browser window to fill the screen.

```java
public class MaximizeWindowExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");

        // Maximize window
        driver.manage().window().maximize();
        System.out.println("Window maximized");

        Thread.sleep(2000);
        driver.quit();
    }
}
```

#### minimize()

Minimizes the browser window (Selenium 4.x feature).

```java
public class MinimizeWindowExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");
        driver.manage().window().maximize();
        Thread.sleep(2000);

        // Minimize window (Selenium 4+)
        driver.manage().window().minimize();
        System.out.println("Window minimized");

        Thread.sleep(2000);
        driver.quit();
    }
}
```

#### fullscreen()

Sets the browser to fullscreen mode (Selenium 4.x feature).

```java
public class FullscreenExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");

        // Set to fullscreen
        driver.manage().window().fullscreen();
        System.out.println("Window in fullscreen mode");

        Thread.sleep(3000);
        driver.quit();
    }
}
```

#### setSize() and getSize()

Set and retrieve custom window dimensions.

```java
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WindowSizeExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");

        // Get current window size
        Dimension currentSize = driver.manage().window().getSize();
        System.out.println("Current Width: " + currentSize.getWidth());
        System.out.println("Current Height: " + currentSize.getHeight());

        // Set custom window size
        Dimension customSize = new Dimension(1024, 768);
        driver.manage().window().setSize(customSize);
        System.out.println("Window resized to 1024x768");

        Thread.sleep(2000);

        // Verify new size
        Dimension newSize = driver.manage().window().getSize();
        System.out.println("New Width: " + newSize.getWidth());
        System.out.println("New Height: " + newSize.getHeight());

        driver.quit();
    }
}
```

### 2. Window Position Management

#### setPosition() and getPosition()

Set and retrieve window position on the screen.

```java
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WindowPositionExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");

        // Get current window position
        Point currentPosition = driver.manage().window().getPosition();
        System.out.println("Current X: " + currentPosition.getX());
        System.out.println("Current Y: " + currentPosition.getY());

        // Set window to top-left corner
        Point topLeft = new Point(0, 0);
        driver.manage().window().setPosition(topLeft);
        System.out.println("Window moved to top-left corner");

        Thread.sleep(2000);

        // Move to custom position
        Point customPosition = new Point(100, 100);
        driver.manage().window().setPosition(customPosition);
        System.out.println("Window moved to (100, 100)");

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### 3. Window Handles Management

Window handles are unique identifiers for browser windows or tabs. They're essential for switching between multiple windows.

#### getWindowHandle()

Returns the handle of the current window.

```java
public class WindowHandleExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");

        // Get current window handle
        String mainWindowHandle = driver.getWindowHandle();
        System.out.println("Main window handle: " + mainWindowHandle);

        driver.quit();
    }
}
```

#### getWindowHandles()

Returns handles of all open windows/tabs.

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WindowType;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.Set;

public class MultipleWindowsExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        // Open first window
        driver.get("https://www.selenium.dev");
        String mainWindow = driver.getWindowHandle();
        System.out.println("Main window handle: " + mainWindow);

        // Open new tab (Selenium 4 feature)
        driver.switchTo().newWindow(WindowType.TAB);
        driver.get("https://www.selenium.dev/documentation");

        // Get all window handles
        Set<String> allWindows = driver.getWindowHandles();
        System.out.println("Total windows: " + allWindows.size());

        // Print all window handles
        for (String windowHandle : allWindows) {
            System.out.println("Window handle: " + windowHandle);
        }

        // Switch back to main window
        driver.switchTo().window(mainWindow);
        System.out.println("Switched back to main window");
        System.out.println("Current URL: " + driver.getCurrentUrl());

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### Comprehensive Window Switching Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.Set;

public class WindowSwitchingExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Navigate to a page with links that open new windows
        driver.get("https://the-internet.herokuapp.com/windows");

        // Store main window handle
        String mainWindow = driver.getWindowHandle();
        System.out.println("Main window: " + mainWindow);

        // Click link that opens new window
        driver.findElement(By.linkText("Click Here")).click();
        Thread.sleep(2000);

        // Get all window handles
        Set<String> allWindows = driver.getWindowHandles();

        // Switch to new window
        for (String windowHandle : allWindows) {
            if (!windowHandle.equals(mainWindow)) {
                driver.switchTo().window(windowHandle);
                System.out.println("Switched to new window");
                System.out.println("New window title: " + driver.getTitle());
                break;
            }
        }

        Thread.sleep(2000);

        // Close new window
        driver.close();

        // Switch back to main window
        driver.switchTo().window(mainWindow);
        System.out.println("Back to main window");
        System.out.println("Main window title: " + driver.getTitle());

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### Window Management Commands Summary

| Command | Purpose | Returns | Selenium Version |
|---------|---------|---------|------------------|
| `maximize()` | Maximize window | void | All |
| `minimize()` | Minimize window | void | 4.x+ |
| `fullscreen()` | Fullscreen mode | void | 4.x+ |
| `setSize(Dimension)` | Set custom size | void | All |
| `getSize()` | Get window size | Dimension | All |
| `setPosition(Point)` | Set window position | void | All |
| `getPosition()` | Get window position | Point | All |
| `getWindowHandle()` | Get current window handle | String | All |
| `getWindowHandles()` | Get all window handles | Set<String> | All |

---

## Browser Context Commands

### 1. close() vs quit()

Understanding the difference between `close()` and `quit()` is crucial for proper resource management.

#### close()

Closes the current browser window/tab. If it's the last window, the driver session remains active.

```java
public class CloseExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");
        System.out.println("Window opened");

        Thread.sleep(2000);

        // Close current window
        driver.close();
        System.out.println("Window closed");

        // Note: driver session still exists but has no active window
        // Any further driver commands will throw NoSuchWindowException
    }
}
```

#### quit()

Closes all browser windows and ends the WebDriver session, freeing up resources.

```java
public class QuitExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        driver.get("https://www.selenium.dev");
        System.out.println("Window opened");

        Thread.sleep(2000);

        // Close all windows and end session
        driver.quit();
        System.out.println("All windows closed and session ended");

        // Any further driver commands will throw SessionNotFoundException
    }
}
```

#### Practical Example: close() vs quit() with Multiple Windows

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WindowType;
import org.openqa.selenium.chrome.ChromeDriver;

public class CloseVsQuitExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        // Open main window
        driver.get("https://www.selenium.dev");
        String mainWindow = driver.getWindowHandle();

        // Open second tab
        driver.switchTo().newWindow(WindowType.TAB);
        driver.get("https://www.selenium.dev/documentation");

        // Open third tab
        driver.switchTo().newWindow(WindowType.TAB);
        driver.get("https://www.selenium.dev/downloads");

        System.out.println("Total windows: " + driver.getWindowHandles().size());
        Thread.sleep(2000);

        // Using close() - closes only current window
        driver.close();
        System.out.println("After close() - Remaining windows: " + driver.getWindowHandles().size());

        // Switch to main window
        driver.switchTo().window(mainWindow);
        Thread.sleep(2000);

        // Using quit() - closes all windows and ends session
        driver.quit();
        System.out.println("After quit() - All windows closed, session ended");
    }
}
```

### close() vs quit() Comparison

| Aspect | close() | quit() |
|--------|---------|--------|
| **Action** | Closes current window only | Closes all windows |
| **Driver Session** | Remains active | Terminates completely |
| **Multiple Windows** | Closes one, others remain | Closes all windows |
| **Resource Cleanup** | Partial | Complete |
| **When to Use** | Closing specific windows | End of test execution |
| **Exception if Used Again** | NoSuchWindowException | SessionNotFoundException |
| **Best Practice** | Use in multi-window scenarios | Use in finally block |

### 2. switchTo() Methods Overview

The `switchTo()` method is used to switch context between windows, frames, and alerts.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SwitchToOverview {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // 1. Switch to Window
        driver.get("https://the-internet.herokuapp.com/windows");
        String mainWindow = driver.getWindowHandle();
        driver.findElement(By.linkText("Click Here")).click();

        for (String window : driver.getWindowHandles()) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                System.out.println("Switched to window: " + driver.getTitle());
                driver.close();
                break;
            }
        }

        driver.switchTo().window(mainWindow);

        // 2. Switch to Frame (example structure)
        // driver.switchTo().frame("frameName");
        // driver.switchTo().frame(0); // by index
        // driver.switchTo().frame(driver.findElement(By.id("frameId"))); // by WebElement

        // 3. Switch to Alert (example)
        // Alert alert = driver.switchTo().alert();
        // alert.accept();

        // 4. Switch to Default Content (exit frame)
        // driver.switchTo().defaultContent();

        // 5. Switch to Parent Frame
        // driver.switchTo().parentFrame();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

---

## Taking Screenshots

Screenshots are essential for debugging failed tests and creating test reports.

### TakesScreenshot Interface

Selenium provides the `TakesScreenshot` interface to capture screenshots.

#### Basic Screenshot Example

```java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.io.IOException;

public class ScreenshotExample {
    public static void main(String[] args) throws IOException, InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);

        // Cast driver to TakesScreenshot
        TakesScreenshot screenshot = (TakesScreenshot) driver;

        // Capture screenshot as File
        File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);

        // Define destination
        File destinationFile = new File("screenshots/selenium_homepage.png");

        // Create directory if not exists
        destinationFile.getParentFile().mkdirs();

        // Copy file to destination
        FileUtils.copyFile(sourceFile, destinationFile);

        System.out.println("Screenshot saved: " + destinationFile.getAbsolutePath());

        driver.quit();
    }
}
```

#### Screenshot with Timestamp

```java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimestampedScreenshot {
    public static void main(String[] args) throws IOException, InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);

        // Generate timestamp
        String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());

        // Take screenshot
        TakesScreenshot screenshot = (TakesScreenshot) driver;
        File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);

        // Save with timestamp
        File destinationFile = new File("screenshots/screenshot_" + timestamp + ".png");
        destinationFile.getParentFile().mkdirs();
        FileUtils.copyFile(sourceFile, destinationFile);

        System.out.println("Screenshot saved: " + destinationFile.getAbsolutePath());

        driver.quit();
    }
}
```

#### Reusable Screenshot Method

```java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotUtility {

    public static void captureScreenshot(WebDriver driver, String screenshotName) {
        try {
            // Generate timestamp
            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());

            // Take screenshot
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);

            // Create destination file
            File destinationFile = new File("screenshots/" + screenshotName + "_" + timestamp + ".png");
            destinationFile.getParentFile().mkdirs();

            // Copy file
            FileUtils.copyFile(sourceFile, destinationFile);

            System.out.println("Screenshot captured: " + destinationFile.getAbsolutePath());
        } catch (IOException e) {
            System.out.println("Failed to capture screenshot: " + e.getMessage());
        }
    }

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Navigate to first page and capture
        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);
        captureScreenshot(driver, "selenium_homepage");

        // Navigate to second page and capture
        driver.get("https://www.selenium.dev/documentation");
        Thread.sleep(2000);
        captureScreenshot(driver, "selenium_documentation");

        driver.quit();
    }
}
```

#### Screenshot Output Types

```java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;
import java.util.Base64;

public class ScreenshotOutputTypes {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");

        TakesScreenshot screenshot = (TakesScreenshot) driver;

        // 1. As File
        File fileOutput = screenshot.getScreenshotAs(OutputType.FILE);
        System.out.println("File output: " + fileOutput.getAbsolutePath());

        // 2. As Bytes
        byte[] bytesOutput = screenshot.getScreenshotAs(OutputType.BYTES);
        System.out.println("Bytes output length: " + bytesOutput.length);

        // 3. As Base64 (useful for HTML reports)
        String base64Output = screenshot.getScreenshotAs(OutputType.BASE64);
        System.out.println("Base64 output (first 100 chars): " +
                          base64Output.substring(0, Math.min(100, base64Output.length())));

        driver.quit();
    }
}
```

### Screenshot Best Practices

1. **Always create directory before saving**: Use `mkdirs()` to avoid FileNotFoundException
2. **Use timestamps**: Prevent file overwrites and track when screenshots were taken
3. **Implement try-catch**: Handle IOExceptions gracefully
4. **Capture on failures**: Most useful for debugging failed tests
5. **Clean old screenshots**: Implement cleanup to avoid disk space issues

---

## JavaScript Executor Basics

JavascriptExecutor allows you to execute JavaScript code directly in the browser context. It's useful for operations that are difficult or impossible with standard WebDriver commands.

### Introduction to JavascriptExecutor

```java
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class JavascriptExecutorIntro {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");

        // Cast driver to JavascriptExecutor
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Execute JavaScript
        js.executeScript("alert('Hello from JavascriptExecutor!');");
        Thread.sleep(2000);

        driver.switchTo().alert().accept();
        driver.quit();
    }
}
```

### Common JavascriptExecutor Operations

#### 1. Scrolling Operations

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ScrollingExamples {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.selenium.dev");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        // 1. Scroll down by pixel
        js.executeScript("window.scrollBy(0, 500);");
        System.out.println("Scrolled down 500 pixels");
        Thread.sleep(2000);

        // 2. Scroll to bottom of page
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        System.out.println("Scrolled to bottom");
        Thread.sleep(2000);

        // 3. Scroll to top of page
        js.executeScript("window.scrollTo(0, 0);");
        System.out.println("Scrolled to top");
        Thread.sleep(2000);

        // 4. Scroll to specific element
        WebElement element = driver.findElement(By.tagName("footer"));
        js.executeScript("arguments[0].scrollIntoView(true);", element);
        System.out.println("Scrolled to footer element");
        Thread.sleep(2000);

        driver.quit();
    }
}
```

#### 2. Clicking Elements

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class JavascriptClick {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.selenium.dev");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Find element
        WebElement element = driver.findElement(By.linkText("Downloads"));

        // Click using JavaScript (useful when normal click doesn't work)
        js.executeScript("arguments[0].click();", element);
        System.out.println("Clicked using JavaScript");

        Thread.sleep(2000);
        driver.quit();
    }
}
```

#### 3. Getting and Setting Element Properties

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ElementProperties {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Get page title using JavaScript
        String title = (String) js.executeScript("return document.title;");
        System.out.println("Page title: " + title);

        // Get domain
        String domain = (String) js.executeScript("return document.domain;");
        System.out.println("Domain: " + domain);

        // Get inner text of element
        WebElement element = driver.findElement(By.tagName("h1"));
        String innerText = (String) js.executeScript("return arguments[0].innerText;", element);
        System.out.println("H1 text: " + innerText);

        // Highlight element (change background color)
        js.executeScript("arguments[0].style.backgroundColor = 'yellow';", element);
        System.out.println("Element highlighted");
        Thread.sleep(2000);

        // Remove highlight
        js.executeScript("arguments[0].style.backgroundColor = '';", element);
        System.out.println("Highlight removed");

        driver.quit();
    }
}
```

#### 4. Generating Alerts

```java
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class JavascriptAlerts {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Generate alert
        js.executeScript("alert('This is a JavaScript alert!');");
        Thread.sleep(2000);
        driver.switchTo().alert().accept();

        // Generate confirm
        js.executeScript("confirm('Do you want to continue?');");
        Thread.sleep(2000);
        driver.switchTo().alert().dismiss();

        driver.quit();
    }
}
```

#### 5. Refresh Page Using JavaScript

```java
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class JavascriptRefresh {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");

        Thread.sleep(2000);

        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Refresh using JavaScript
        js.executeScript("location.reload();");
        System.out.println("Page refreshed using JavaScript");

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### When to Use JavascriptExecutor

| Scenario | Use JavascriptExecutor? | Reason |
|----------|------------------------|--------|
| Normal click works | No | Use WebElement.click() |
| Element not clickable | Yes | JavaScript can force click |
| Scrolling to element | Yes | More reliable than Actions |
| Hidden element interaction | Yes | Bypass visibility checks |
| Getting element properties | Sometimes | Useful for attributes not exposed by WebDriver |
| Performance critical | No | JavaScript is slower than native commands |

---

## Browser Cookies Management

Cookies are small pieces of data stored by websites. Managing cookies is essential for testing login sessions, preferences, and tracking.

### Understanding Cookies

A cookie contains:
- **Name**: Cookie identifier
- **Value**: Cookie data
- **Domain**: Website domain
- **Path**: URL path where cookie is valid
- **Expiry**: Expiration date/time
- **Secure**: HTTPS only flag
- **HttpOnly**: JavaScript access restriction

### Getting Cookies

#### Get All Cookies

```java
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.Set;

public class GetAllCookies {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);

        // Get all cookies
        Set<Cookie> cookies = driver.manage().getCookies();

        System.out.println("Total cookies: " + cookies.size());
        System.out.println("\nCookie details:");

        for (Cookie cookie : cookies) {
            System.out.println("Name: " + cookie.getName());
            System.out.println("Value: " + cookie.getValue());
            System.out.println("Domain: " + cookie.getDomain());
            System.out.println("Path: " + cookie.getPath());
            System.out.println("Expiry: " + cookie.getExpiry());
            System.out.println("Secure: " + cookie.isSecure());
            System.out.println("HttpOnly: " + cookie.isHttpOnly());
            System.out.println("------------------------");
        }

        driver.quit();
    }
}
```

#### Get Specific Cookie

```java
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class GetNamedCookie {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        Thread.sleep(2000);

        // Get specific cookie by name
        Cookie cookie = driver.manage().getCookieNamed("NID");

        if (cookie != null) {
            System.out.println("Cookie found!");
            System.out.println("Name: " + cookie.getName());
            System.out.println("Value: " + cookie.getValue());
            System.out.println("Domain: " + cookie.getDomain());
        } else {
            System.out.println("Cookie not found");
        }

        driver.quit();
    }
}
```

### Adding Cookies

```java
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.Date;

public class AddCookieExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");

        // Create a simple cookie
        Cookie simpleCookie = new Cookie("testCookie", "testValue");
        driver.manage().addCookie(simpleCookie);
        System.out.println("Simple cookie added");

        // Create a detailed cookie with expiry
        Date expiry = new Date(System.currentTimeMillis() + 3600 * 1000); // 1 hour from now
        Cookie detailedCookie = new Cookie.Builder("userPreference", "darkMode")
                .domain("selenium.dev")
                .path("/")
                .expiresOn(expiry)
                .isSecure(false)
                .isHttpOnly(false)
                .build();

        driver.manage().addCookie(detailedCookie);
        System.out.println("Detailed cookie added");

        // Refresh to apply cookies
        driver.navigate().refresh();
        Thread.sleep(2000);

        // Verify cookies
        System.out.println("\nAll cookies after addition:");
        for (Cookie cookie : driver.manage().getCookies()) {
            System.out.println(cookie.getName() + " = " + cookie.getValue());
        }

        driver.quit();
    }
}
```

### Deleting Cookies

#### Delete Specific Cookie

```java
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class DeleteCookieExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);

        // Add a cookie
        Cookie cookie = new Cookie("testCookie", "testValue");
        driver.manage().addCookie(cookie);
        System.out.println("Cookie added. Total cookies: " + driver.manage().getCookies().size());

        // Delete specific cookie by name
        driver.manage().deleteCookieNamed("testCookie");
        System.out.println("Cookie deleted. Total cookies: " + driver.manage().getCookies().size());

        driver.quit();
    }
}
```

#### Delete All Cookies

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class DeleteAllCookies {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        Thread.sleep(2000);

        System.out.println("Cookies before deletion: " + driver.manage().getCookies().size());

        // Delete all cookies
        driver.manage().deleteAllCookies();

        System.out.println("Cookies after deletion: " + driver.manage().getCookies().size());

        driver.quit();
    }
}
```

### Practical Cookie Example: Session Management

```java
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SessionCookieExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        // Scenario: Save session and reuse
        driver.get("https://www.selenium.dev");
        Thread.sleep(2000);

        // Simulate login by adding session cookie
        Cookie sessionCookie = new Cookie("sessionId", "abc123xyz");
        driver.manage().addCookie(sessionCookie);

        // Store all cookies for later use
        System.out.println("Storing cookies for session:");
        for (Cookie cookie : driver.manage().getCookies()) {
            System.out.println(cookie.getName() + " = " + cookie.getValue());
        }

        // Close browser
        driver.quit();

        // Start new session
        driver = new ChromeDriver();
        driver.get("https://www.selenium.dev");

        // Restore session cookie
        driver.manage().addCookie(sessionCookie);
        driver.navigate().refresh();

        System.out.println("\nSession restored with cookies");

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### Cookie Management Summary

| Method | Purpose | Returns |
|--------|---------|---------|
| `getCookies()` | Get all cookies | Set<Cookie> |
| `getCookieNamed(String)` | Get specific cookie | Cookie |
| `addCookie(Cookie)` | Add new cookie | void |
| `deleteCookie(Cookie)` | Delete specific cookie | void |
| `deleteCookieNamed(String)` | Delete cookie by name | void |
| `deleteAllCookies()` | Delete all cookies | void |

---

## Practical Examples

### Example 1: Complete Navigation Test

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class NavigationTest {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to first page
            driver.get("https://www.selenium.dev");
            System.out.println("Page 1 - Title: " + driver.getTitle());
            System.out.println("Page 1 - URL: " + driver.getCurrentUrl());
            Thread.sleep(2000);

            // Navigate to second page
            driver.navigate().to("https://www.selenium.dev/documentation");
            System.out.println("\nPage 2 - Title: " + driver.getTitle());
            System.out.println("Page 2 - URL: " + driver.getCurrentUrl());
            Thread.sleep(2000);

            // Go back
            driver.navigate().back();
            System.out.println("\nAfter back - Title: " + driver.getTitle());
            System.out.println("After back - URL: " + driver.getCurrentUrl());
            Thread.sleep(2000);

            // Go forward
            driver.navigate().forward();
            System.out.println("\nAfter forward - Title: " + driver.getTitle());
            System.out.println("After forward - URL: " + driver.getCurrentUrl());
            Thread.sleep(2000);

            // Refresh
            driver.navigate().refresh();
            System.out.println("\nPage refreshed - Title: " + driver.getTitle());

        } finally {
            driver.quit();
        }
    }
}
```

### Example 2: Window Management Test

```java
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WindowManagementTest {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.selenium.dev");

            // Test different window states
            System.out.println("Testing window states...\n");

            // 1. Custom size
            driver.manage().window().setSize(new Dimension(800, 600));
            System.out.println("1. Custom size (800x600) set");
            Thread.sleep(1500);

            // 2. Maximize
            driver.manage().window().maximize();
            Dimension maxSize = driver.manage().window().getSize();
            System.out.println("2. Maximized - Size: " + maxSize.getWidth() + "x" + maxSize.getHeight());
            Thread.sleep(1500);

            // 3. Set position
            driver.manage().window().setPosition(new Point(100, 100));
            Point position = driver.manage().window().getPosition();
            System.out.println("3. Position set to: (" + position.getX() + ", " + position.getY() + ")");
            Thread.sleep(1500);

            // 4. Fullscreen
            driver.manage().window().fullscreen();
            System.out.println("4. Fullscreen mode activated");
            Thread.sleep(1500);

            // 5. Minimize
            driver.manage().window().minimize();
            System.out.println("5. Window minimized");
            Thread.sleep(1500);

            // Maximize again to see final state
            driver.manage().window().maximize();
            System.out.println("6. Window maximized again");

        } finally {
            driver.quit();
        }
    }
}
```

### Example 3: Multi-Window Handling

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WindowType;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.ArrayList;
import java.util.List;

public class MultiWindowTest {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Open main window
            driver.get("https://www.selenium.dev");
            String mainWindow = driver.getWindowHandle();
            System.out.println("Main window opened - Title: " + driver.getTitle());
            Thread.sleep(1500);

            // Open new tab
            driver.switchTo().newWindow(WindowType.TAB);
            driver.get("https://www.selenium.dev/documentation");
            String docWindow = driver.getWindowHandle();
            System.out.println("Documentation tab opened - Title: " + driver.getTitle());
            Thread.sleep(1500);

            // Open another new window
            driver.switchTo().newWindow(WindowType.WINDOW);
            driver.get("https://www.selenium.dev/downloads");
            String downloadWindow = driver.getWindowHandle();
            System.out.println("Downloads window opened - Title: " + driver.getTitle());
            Thread.sleep(1500);

            // List all windows
            List<String> allWindows = new ArrayList<>(driver.getWindowHandles());
            System.out.println("\nTotal windows/tabs: " + allWindows.size());

            // Switch between windows
            System.out.println("\nSwitching between windows:");
            for (String windowHandle : allWindows) {
                driver.switchTo().window(windowHandle);
                System.out.println("- " + driver.getTitle());
                Thread.sleep(1000);
            }

            // Close specific windows
            driver.switchTo().window(downloadWindow);
            driver.close();
            System.out.println("\nClosed downloads window");

            driver.switchTo().window(docWindow);
            driver.close();
            System.out.println("Closed documentation window");

            // Switch back to main window
            driver.switchTo().window(mainWindow);
            System.out.println("Back to main window - Title: " + driver.getTitle());

        } finally {
            driver.quit();
        }
    }
}
```

### Example 4: Screenshot on Error

```java
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotOnError {

    static WebDriver driver;

    public static void captureScreenshot(String testName) {
        try {
            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
            File destFile = new File("screenshots/error_" + testName + "_" + timestamp + ".png");
            destFile.getParentFile().mkdirs();
            FileUtils.copyFile(sourceFile, destFile);
            System.out.println("Screenshot saved: " + destFile.getAbsolutePath());
        } catch (Exception e) {
            System.out.println("Failed to capture screenshot: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.selenium.dev");

            // Try to find element that doesn't exist
            try {
                driver.findElement(By.id("nonExistentElement")).click();
            } catch (Exception e) {
                System.out.println("Error occurred: " + e.getMessage());
                captureScreenshot("element_not_found");
            }

            // Try to navigate to invalid URL
            try {
                driver.get("https://this-website-definitely-does-not-exist-12345.com");
            } catch (Exception e) {
                System.out.println("Navigation error: " + e.getMessage());
                captureScreenshot("navigation_error");
            }

        } finally {
            driver.quit();
        }
    }
}
```

### Example 5: JavaScript Executor Utilities

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class JSExecutorUtilities {

    static WebDriver driver;
    static JavascriptExecutor js;

    // Scroll to element
    public static void scrollToElement(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    // Highlight element
    public static void highlightElement(WebElement element) {
        js.executeScript("arguments[0].style.border='3px solid red'", element);
    }

    // Click using JS
    public static void clickJS(WebElement element) {
        js.executeScript("arguments[0].click();", element);
    }

    // Get page title
    public static String getPageTitle() {
        return (String) js.executeScript("return document.title;");
    }

    // Scroll to bottom
    public static void scrollToBottom() {
        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    }

    public static void main(String[] args) throws InterruptedException {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        js = (JavascriptExecutor) driver;

        try {
            driver.get("https://www.selenium.dev");
            Thread.sleep(2000);

            // Get title using JS
            System.out.println("Page title: " + getPageTitle());

            // Scroll to bottom
            scrollToBottom();
            System.out.println("Scrolled to bottom");
            Thread.sleep(1500);

            // Find and highlight footer
            WebElement footer = driver.findElement(By.tagName("footer"));
            highlightElement(footer);
            System.out.println("Footer highlighted");
            Thread.sleep(1500);

            // Scroll to top
            js.executeScript("window.scrollTo(0, 0)");
            System.out.println("Scrolled to top");

        } finally {
            driver.quit();
        }
    }
}
```

---

## Best Practices

### 1. Navigation Commands

**DO:**
- Use `driver.get()` for simple navigation
- Use `navigate().to()` when you need back/forward functionality
- Always verify page load with URL or title verification
- Add appropriate waits after navigation

**DON'T:**
- Navigate too quickly without waiting for page load
- Ignore navigation failures
- Use hardcoded Thread.sleep() for production code

```java
// Good practice
driver.get("https://www.selenium.dev");
String expectedUrl = "https://www.selenium.dev/";
if (driver.getCurrentUrl().equals(expectedUrl)) {
    System.out.println("Navigation successful");
}

// Avoid
driver.get("https://www.selenium.dev");
Thread.sleep(5000); // Hardcoded wait
```

### 2. Window Management

**DO:**
- Maximize window for consistent element visibility
- Store window handles before opening new windows
- Close windows explicitly when done
- Use descriptive variable names for window handles

**DON'T:**
- Assume window size across different environments
- Leave multiple windows open unnecessarily
- Forget to switch back to the main window

```java
// Good practice
driver.manage().window().maximize();
String mainWindow = driver.getWindowHandle();
// ... open new window operations
driver.switchTo().window(mainWindow);

// Avoid
// Not storing main window handle
// Opening multiple windows without proper tracking
```

### 3. Screenshots

**DO:**
- Capture screenshots on test failures
- Use timestamps in filenames
- Create organized directory structure
- Implement reusable screenshot methods

**DON'T:**
- Save all screenshots to root directory
- Overwrite existing screenshots
- Forget to create directories before saving

```java
// Good practice
public static void captureScreenshot(String testName) {
    String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
    File destFile = new File("screenshots/" + testName + "_" + timestamp + ".png");
    destFile.getParentFile().mkdirs();
    // ... save screenshot
}

// Avoid
File destFile = new File("screenshot.png"); // Always same name, gets overwritten
```

### 4. JavaScript Executor

**DO:**
- Use JavascriptExecutor as a last resort
- Prefer WebDriver native commands when available
- Add proper error handling
- Document why JavaScript is necessary

**DON'T:**
- Use JavaScript for everything
- Execute untrusted JavaScript code
- Ignore return values when needed

```java
// Good practice - use when WebDriver click fails
try {
    element.click();
} catch (ElementClickInterceptedException e) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    js.executeScript("arguments[0].click();", element);
}

// Avoid - using JS unnecessarily
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].click();", element); // When normal click would work
```

### 5. Cookie Management

**DO:**
- Clear cookies between independent tests
- Verify cookie addition before using
- Handle cookie domains correctly
- Store important cookies for session reuse

**DON'T:**
- Forget to refresh page after adding cookies
- Add cookies before navigating to domain
- Ignore cookie expiration

```java
// Good practice
driver.get("https://www.selenium.dev"); // Navigate first
Cookie cookie = new Cookie("session", "abc123");
driver.manage().addCookie(cookie);
driver.navigate().refresh(); // Refresh to apply

// Avoid
Cookie cookie = new Cookie("session", "abc123");
driver.manage().addCookie(cookie); // No page loaded yet - will fail
driver.get("https://www.selenium.dev");
```

### 6. Resource Management

**DO:**
- Always use try-finally with driver.quit()
- Close specific windows before quitting
- Use quit() instead of close() at test end
- Clean up resources properly

**DON'T:**
- Leave browser instances running
- Use only close() and forget quit()
- Ignore resource cleanup on errors

```java
// Good practice
WebDriver driver = new ChromeDriver();
try {
    // Test code
} finally {
    if (driver != null) {
        driver.quit();
    }
}

// Avoid
WebDriver driver = new ChromeDriver();
// Test code
driver.close(); // Only closes window, driver session remains
```

---

## Common Mistakes

### 1. Not Storing Window Handles

**Mistake:**
```java
// Opening new window without storing main handle
driver.get("https://www.selenium.dev");
driver.switchTo().newWindow(WindowType.TAB);
// Lost reference to main window
```

**Solution:**
```java
driver.get("https://www.selenium.dev");
String mainWindow = driver.getWindowHandle();
driver.switchTo().newWindow(WindowType.TAB);
// Can always return to main window
driver.switchTo().window(mainWindow);
```

### 2. Adding Cookies Before Navigation

**Mistake:**
```java
WebDriver driver = new ChromeDriver();
Cookie cookie = new Cookie("test", "value");
driver.manage().addCookie(cookie); // Error: no page loaded
driver.get("https://www.selenium.dev");
```

**Solution:**
```java
WebDriver driver = new ChromeDriver();
driver.get("https://www.selenium.dev"); // Navigate first
Cookie cookie = new Cookie("test", "value");
driver.manage().addCookie(cookie);
driver.navigate().refresh();
```

### 3. Using close() Instead of quit()

**Mistake:**
```java
WebDriver driver = new ChromeDriver();
driver.get("https://www.selenium.dev");
driver.close(); // Closes window but leaves driver session
// Driver session still consuming resources
```

**Solution:**
```java
WebDriver driver = new ChromeDriver();
try {
    driver.get("https://www.selenium.dev");
} finally {
    driver.quit(); // Properly closes all and ends session
}
```

### 4. Screenshot Directory Issues

**Mistake:**
```java
File destFile = new File("screenshots/test.png");
FileUtils.copyFile(sourceFile, destFile); // Fails if directory doesn't exist
```

**Solution:**
```java
File destFile = new File("screenshots/test.png");
destFile.getParentFile().mkdirs(); // Create directory if needed
FileUtils.copyFile(sourceFile, destFile);
```

### 5. Not Waiting After Navigation

**Mistake:**
```java
driver.navigate().back();
String title = driver.getTitle(); // Might get old page title
```

**Solution:**
```java
driver.navigate().back();
// Add proper wait or verification
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.titleContains("Expected"));
String title = driver.getTitle();
```

### 6. Overusing JavascriptExecutor

**Mistake:**
```java
// Using JavaScript for simple operations
JavascriptExecutor js = (JavascriptExecutor) driver;
String title = (String) js.executeScript("return document.title;");
```

**Solution:**
```java
// Use WebDriver native method
String title = driver.getTitle();
```

### 7. Not Handling Screenshot Exceptions

**Mistake:**
```java
TakesScreenshot screenshot = (TakesScreenshot) driver;
File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(sourceFile, destFile); // Uncaught IOException
```

**Solution:**
```java
try {
    TakesScreenshot screenshot = (TakesScreenshot) driver;
    File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
    FileUtils.copyFile(sourceFile, destFile);
} catch (IOException e) {
    System.out.println("Screenshot failed: " + e.getMessage());
}
```

### 8. Window Switching Without Verification

**Mistake:**
```java
for (String window : driver.getWindowHandles()) {
    driver.switchTo().window(window);
    driver.close(); // Closes all windows including main
}
```

**Solution:**
```java
String mainWindow = driver.getWindowHandle();
for (String window : driver.getWindowHandles()) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        driver.close();
    }
}
driver.switchTo().window(mainWindow);
```

---

## Practice Exercises

### Exercise 1: Navigation Flow Test

**Objective:** Create a test that navigates through multiple pages and verifies URLs.

**Requirements:**
1. Navigate to https://www.selenium.dev
2. Click on "Documentation" link
3. Verify URL contains "documentation"
4. Go back to homepage
5. Verify URL is homepage
6. Go forward to documentation
7. Refresh the page
8. Print all page titles visited

**Expected Output:**
```
Homepage title: Selenium
Documentation title: Selenium Documentation
After back - URL: https://www.selenium.dev/
After forward - URL contains: documentation
Page refreshed
```

### Exercise 2: Window Resize Test

**Objective:** Test different window sizes and positions.

**Requirements:**
1. Open browser and navigate to https://www.selenium.dev
2. Set window size to 1024x768
3. Print current size
4. Move window to position (50, 50)
5. Print current position
6. Maximize window
7. Print maximized size
8. Set to fullscreen
9. Take screenshots at each step

**Expected Output:**
```
Size set to: 1024x768
Position set to: (50, 50)
Maximized size: <width>x<height>
Fullscreen activated
Screenshots captured: 4
```

### Exercise 3: Multi-Window Manager

**Objective:** Create a utility to manage multiple browser windows.

**Requirements:**
1. Open main window with https://www.selenium.dev
2. Open 3 new tabs with different pages:
   - https://www.selenium.dev/documentation
   - https://www.selenium.dev/downloads
   - https://www.selenium.dev/support
3. Create a method to list all window titles
4. Create a method to switch to window by title
5. Close all windows except main
6. Verify only main window remains

**Expected Output:**
```
Total windows: 4
Window titles:
- Selenium
- Documentation
- Downloads
- Support
Closing non-main windows...
Remaining windows: 1
Main window: Selenium
```

### Exercise 4: Screenshot Utility

**Objective:** Build a comprehensive screenshot utility.

**Requirements:**
1. Create a method `captureScreenshot(String testName)`
2. Create a method `captureFullPageScreenshot()`
3. Implement timestamp in filenames
4. Create organized directory structure (screenshots/YYYY-MM-DD/)
5. Test utility by:
   - Taking screenshot of homepage
   - Scrolling to bottom and taking screenshot
   - Taking screenshot of an error scenario

**Expected Output:**
```
Screenshot saved: screenshots/2024-01-13/homepage_14-30-25.png
Screenshot saved: screenshots/2024-01-13/scrolled_14-30-27.png
Screenshot saved: screenshots/2024-01-13/error_14-30-30.png
Total screenshots: 3
```

### Exercise 5: JavaScript Executor Practice

**Objective:** Use JavascriptExecutor for various operations.

**Requirements:**
1. Navigate to https://www.selenium.dev
2. Get page title using JavaScript
3. Scroll to bottom using JavaScript
4. Get scroll position (vertical)
5. Find the footer element and highlight it
6. Get inner text of footer using JavaScript
7. Scroll back to top
8. Create an alert with page title

**Expected Output:**
```
Page title: Selenium
Scrolled to bottom
Scroll position: 2500
Footer highlighted
Footer text: <footer content>
Scrolled to top
Alert displayed with title
```

### Exercise 6: Cookie Management System

**Objective:** Implement a cookie management system.

**Requirements:**
1. Navigate to https://www.google.com
2. Print all existing cookies (name and value)
3. Add three custom cookies:
   - userPreference: darkMode
   - sessionId: ABC123XYZ
   - language: en-US
4. Verify all cookies were added
5. Delete the sessionId cookie
6. Verify deletion
7. Delete all cookies
8. Verify no cookies remain

**Expected Output:**
```
Initial cookies: 5
Cookies:
- NID = <value>
- 1P_JAR = <value>
...
Added 3 cookies
Total cookies: 8
Deleted sessionId
Remaining cookies: 7
Deleted all cookies
Final cookie count: 0
```

---

## Interview Questions

### Basic Level

**Q1: What is the difference between driver.get() and driver.navigate().to()?**

**Answer:** Both methods navigate to a URL, but with subtle differences:
- `driver.get()` is a direct method on WebDriver interface that navigates to a URL and waits for page load
- `driver.navigate().to()` is part of the Navigation interface and provides access to additional navigation methods like back(), forward(), and refresh()
- Functionally, both wait for page load and can be used interchangeably
- `navigate()` is preferred when you need to use browser history navigation

**Q2: What is the difference between close() and quit()?**

**Answer:**
- `close()`: Closes the current browser window/tab only. Driver session remains active.
- `quit()`: Closes all browser windows and ends the WebDriver session completely, freeing up resources.
- If close() is called on the last window, the driver session still exists but has no active window.
- Best practice: Always use quit() in finally block to ensure proper cleanup.

**Q3: How do you maximize a browser window in Selenium?**

**Answer:**
```java
driver.manage().window().maximize();
```
This maximizes the browser window to fill the screen. It's a best practice to maximize windows to ensure consistent element visibility across different screen resolutions.

**Q4: How do you take a screenshot in Selenium?**

**Answer:**
```java
TakesScreenshot screenshot = (TakesScreenshot) driver;
File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
File destFile = new File("screenshot.png");
FileUtils.copyFile(sourceFile, destFile);
```
Screenshots are typically captured on test failures for debugging purposes.

### Intermediate Level

**Q5: How do you handle multiple windows in Selenium?**

**Answer:**
```java
// Store main window handle
String mainWindow = driver.getWindowHandle();

// Get all window handles
Set<String> allWindows = driver.getWindowHandles();

// Switch to new window
for (String window : allWindows) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        // Perform actions
        driver.close();
    }
}

// Switch back to main window
driver.switchTo().window(mainWindow);
```

**Q6: What is JavascriptExecutor and when should you use it?**

**Answer:** JavascriptExecutor is an interface that allows executing JavaScript code in the context of the current browser window.

Use cases:
- When standard WebDriver commands fail (e.g., element not clickable)
- Scrolling operations
- Interacting with hidden elements
- Getting/setting element properties not exposed by WebDriver
- Performance-critical operations

Should be used as a last resort when native WebDriver commands don't work.

**Q7: How do you get the current URL and page title?**

**Answer:**
```java
String currentUrl = driver.getCurrentUrl();
String pageTitle = driver.getTitle();

// Example verification
if (currentUrl.contains("selenium") && pageTitle.contains("Selenium")) {
    System.out.println("Navigation verified");
}
```

**Q8: Explain the different ways to set window size.**

**Answer:**
```java
// 1. Maximize
driver.manage().window().maximize();

// 2. Fullscreen (Selenium 4)
driver.manage().window().fullscreen();

// 3. Minimize (Selenium 4)
driver.manage().window().minimize();

// 4. Custom size
Dimension size = new Dimension(1024, 768);
driver.manage().window().setSize(size);

// 5. Get current size
Dimension currentSize = driver.manage().window().getSize();
```

### Advanced Level

**Q9: How would you implement a reusable screenshot method that captures screenshots only on test failures?**

**Answer:**
```java
public class ScreenshotUtility {

    public static void captureFailureScreenshot(WebDriver driver, String testName) {
        try {
            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss")
                .format(new Date());
            String fileName = testName + "_failure_" + timestamp + ".png";

            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);

            File destFile = new File("screenshots/failures/" + fileName);
            destFile.getParentFile().mkdirs();

            FileUtils.copyFile(sourceFile, destFile);
            System.out.println("Screenshot captured: " + destFile.getAbsolutePath());

        } catch (Exception e) {
            System.out.println("Screenshot failed: " + e.getMessage());
        }
    }
}

// Usage in test
try {
    // Test code
} catch (Exception e) {
    ScreenshotUtility.captureFailureScreenshot(driver, "loginTest");
    throw e;
}
```

**Q10: How do you manage cookies for session persistence across tests?**

**Answer:**
```java
public class CookieManager {

    // Save cookies to file
    public static void saveCookies(WebDriver driver, String filename) {
        try {
            Set<Cookie> cookies = driver.manage().getCookies();
            ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream(filename));
            oos.writeObject(cookies);
            oos.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Load cookies from file
    public static void loadCookies(WebDriver driver, String filename) {
        try {
            ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(filename));
            Set<Cookie> cookies = (Set<Cookie>) ois.readObject();
            ois.close();

            for (Cookie cookie : cookies) {
                driver.manage().addCookie(cookie);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

**Q11: What are the different output types for screenshots and when would you use each?**

**Answer:**
```java
TakesScreenshot screenshot = (TakesScreenshot) driver;

// 1. FILE - Save to disk
File fileOutput = screenshot.getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(fileOutput, new File("screenshot.png"));

// 2. BYTES - For in-memory processing or network transfer
byte[] bytesOutput = screenshot.getScreenshotAs(OutputType.BYTES);
// Send over network or process in memory

// 3. BASE64 - For embedding in HTML reports
String base64Output = screenshot.getScreenshotAs(OutputType.BASE64);
// Embed in HTML: <img src="data:image/png;base64,{base64Output}" />
```

Use cases:
- FILE: Standard file saving
- BYTES: Network transmission, in-memory operations
- BASE64: HTML reports, web services, JSON responses

**Q12: How would you implement a window switching utility that switches to a window by title?**

**Answer:**
```java
public class WindowUtility {

    public static boolean switchToWindowByTitle(WebDriver driver, String title) {
        Set<String> windows = driver.getWindowHandles();

        for (String window : windows) {
            driver.switchTo().window(window);
            if (driver.getTitle().equals(title)) {
                System.out.println("Switched to window: " + title);
                return true;
            }
        }

        System.out.println("Window with title '" + title + "' not found");
        return false;
    }

    public static void closeAllWindowsExcept(WebDriver driver, String mainWindow) {
        Set<String> windows = driver.getWindowHandles();

        for (String window : windows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                driver.close();
            }
        }

        driver.switchTo().window(mainWindow);
    }

    public static void listAllWindows(WebDriver driver) {
        Set<String> windows = driver.getWindowHandles();
        System.out.println("Total windows: " + windows.size());

        String currentWindow = driver.getWindowHandle();
        for (String window : windows) {
            driver.switchTo().window(window);
            System.out.println("- " + driver.getTitle());
        }

        driver.switchTo().window(currentWindow);
    }
}
```

---

## Key Takeaways

1. **Navigation Commands**
   - Use `get()` for simple navigation, `navigate()` for complex scenarios
   - Always verify navigation with URL or title checks
   - `navigate().back()`, `forward()`, and `refresh()` manage browser history

2. **Window Management**
   - `maximize()` ensures consistent element visibility
   - `setSize()` and `setPosition()` provide precise control
   - Selenium 4 adds `minimize()` and `fullscreen()`

3. **Window Handles**
   - Always store main window handle before opening new windows
   - Use `getWindowHandles()` to iterate through all windows
   - Switch between windows using `switchTo().window(handle)`

4. **close() vs quit()**
   - `close()` closes current window, `quit()` closes all and ends session
   - Always use `quit()` in finally block
   - `quit()` ensures proper resource cleanup

5. **Screenshots**
   - Essential for debugging failed tests
   - Use timestamps to prevent overwrites
   - Create reusable screenshot methods
   - Three output types: FILE, BYTES, BASE64

6. **JavascriptExecutor**
   - Use as last resort when WebDriver commands fail
   - Useful for scrolling, hidden elements, and custom operations
   - Can execute any JavaScript in browser context
   - More powerful but less reliable than native WebDriver

7. **Cookie Management**
   - Must navigate to domain before adding cookies
   - Refresh page after adding cookies
   - Useful for session management and testing
   - Can save/load cookies for test data persistence

8. **Best Practices**
   - Always use try-finally for resource cleanup
   - Implement reusable utility methods
   - Add proper error handling
   - Use meaningful variable names for window handles
   - Document why JavascriptExecutor is necessary

9. **Common Mistakes to Avoid**
   - Not storing window handles
   - Adding cookies before navigation
   - Using close() instead of quit()
   - Ignoring screenshot exceptions
   - Overusing JavascriptExecutor

10. **Performance Considerations**
    - Minimize window switching operations
    - Use appropriate waits instead of Thread.sleep
    - Close unnecessary windows promptly
    - Clean up cookies when not needed

---

## Additional Resources

### Official Documentation
- [Selenium WebDriver Documentation](https://www.selenium.dev/documentation/webdriver/)
- [Selenium API JavaDocs](https://www.selenium.dev/selenium/docs/api/java/)

### Practice Websites
- [The Internet - Heroku](https://the-internet.herokuapp.com/)
- [Selenium Playground](http://www.seleniumeasy.com/test/)

### Next Steps
- Day 4: Waits and Synchronization
- Day 5: Working with Web Elements
- Day 6: Handling Alerts and Pop-ups

---

**Navigation:**
- [← Previous: Day 2 - Selenium Locators](day02_selenium_locators.md)
- [Next: Day 4 - Waits and Synchronization →](day04_waits_synchronization.md)
- [↑ Back to Week 1 Overview](README.md)

---

*Last Updated: 2024-01-13*
*Course: Selenium Automation Daily - Week 1, Day 3*
