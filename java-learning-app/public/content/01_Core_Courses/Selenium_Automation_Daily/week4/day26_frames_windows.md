# Day 26: Handling Frames & Windows in Selenium

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand frames and iframes in web pages
- Switch between frames using different methods
- Navigate back to the main page from frames
- Handle nested frames
- Work with multiple browser windows and tabs
- Switch between windows using window handles
- Manage window operations (close, maximize, resize)
- Implement best practices for frame and window handling

---

## 1. Introduction to Frames

### What are Frames?

Frames allow a web page to be divided into multiple sections, each displaying a different HTML document. There are two types:

1. **Frames (`<frame>`)** - Part of frameset (deprecated in HTML5)
2. **IFrames (`<iframe>`)** - Inline frames (still widely used)

### Why Use Frames?

- Display content from different sources on one page
- Embed external content (videos, maps, ads)
- Create persistent navigation menus
- Separate content into logical sections

### Frame Structure

```html
<!-- IFrame Example -->
<iframe id="myFrame" name="frameName" src="content.html"></iframe>

<!-- Nested IFrames -->
<iframe id="outerFrame" src="outer.html">
  <!-- Inside outer.html -->
  <iframe id="innerFrame" src="inner.html"></iframe>
</iframe>
```

### The Challenge

Selenium cannot directly interact with elements inside a frame. You must **switch into the frame** first.

---

## 2. Switching to Frames

### Three Methods to Switch to Frame

```java
// 1. By Index (0-based)
driver.switchTo().frame(0);

// 2. By Name or ID
driver.switchTo().frame("frameName");

// 3. By WebElement
WebElement frameElement = driver.findElement(By.id("myFrame"));
driver.switchTo().frame(frameElement);
```

---

## 3. Switching to Frame by Index

### Syntax

```java
driver.switchTo().frame(int index);
```

The index is 0-based (first frame = 0, second frame = 1, etc.).

### Example

```html
<body>
  <iframe id="frame1" src="page1.html"></iframe>
  <iframe id="frame2" src="page2.html"></iframe>
  <iframe id="frame3" src="page3.html"></iframe>
</body>
```

```java
public class FrameByIndexExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/frames");

        // Switch to first frame (index 0)
        driver.switchTo().frame(0);

        // Now you can interact with elements in frame1
        WebElement element = driver.findElement(By.id("elementInFrame1"));
        element.click();

        driver.quit();
    }
}
```

**Note:** Index-based switching is **not recommended** because:
- Frame order might change
- Hard to maintain
- Not descriptive (can't tell which frame you're switching to)

---

## 4. Switching to Frame by Name or ID

### Syntax

```java
driver.switchTo().frame(String nameOrId);
```

### Example

```html
<iframe id="loginFrame" name="login" src="login.html"></iframe>
```

```java
public class FrameByNameExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/frames");

        // Switch by ID
        driver.switchTo().frame("loginFrame");

        // Or switch by name
        // driver.switchTo().frame("login");

        // Interact with elements inside frame
        driver.findElement(By.id("username")).sendKeys("testuser");
        driver.findElement(By.id("password")).sendKeys("password123");
        driver.findElement(By.id("loginBtn")).click();

        driver.quit();
    }
}
```

**Advantage:** More reliable and readable than index-based switching.

---

## 5. Switching to Frame by WebElement

### Syntax

```java
WebElement frameElement = driver.findElement(By.locator);
driver.switchTo().frame(frameElement);
```

### Example

```java
public class FrameByElementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/frames");

        // Find frame element first
        WebElement frameElement = driver.findElement(By.id("myFrame"));

        // Switch to frame using the element
        driver.switchTo().frame(frameElement);

        // Interact with frame content
        driver.findElement(By.id("submit")).click();

        driver.quit();
    }
}
```

**Advantage:**
- Most flexible method
- Can use any locator strategy
- Can apply waits to frame element

### With Explicit Wait

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement frame = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("dynamicFrame"))
);
driver.switchTo().frame(frame);
```

---

## 6. Switching Back from Frame

### Switch to Default Content (Main Page)

```java
driver.switchTo().defaultContent();
```

This switches back to the main page (parent page).

### Switch to Parent Frame

```java
driver.switchTo().parentFrame();
```

This switches to the immediate parent frame (useful for nested frames).

### Complete Example

```java
public class SwitchBackExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/frames");

        // Switch to frame
        driver.switchTo().frame("myFrame");

        // Interact with frame content
        System.out.println("Inside frame: " +
            driver.findElement(By.tagName("h1")).getText());

        // Switch back to main page
        driver.switchTo().defaultContent();

        // Now you can interact with main page elements
        System.out.println("Main page title: " + driver.getTitle());

        driver.quit();
    }
}
```

---

## 7. Handling Nested Frames

Nested frames are frames within frames. You must switch through each level.

### HTML Structure

```html
<body>
  <iframe id="outerFrame" src="outer.html">
    <!-- Inside outer.html -->
    <iframe id="innerFrame" src="inner.html">
      <!-- Content inside innerFrame -->
      <button id="targetButton">Click Me</button>
    </iframe>
  </iframe>
</body>
```

### Accessing Nested Frame

```java
public class NestedFramesExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/nested-frames");

        // Step 1: Switch to outer frame
        driver.switchTo().frame("outerFrame");
        System.out.println("Switched to outer frame");

        // Step 2: Switch to inner frame
        driver.switchTo().frame("innerFrame");
        System.out.println("Switched to inner frame");

        // Step 3: Interact with element in inner frame
        driver.findElement(By.id("targetButton")).click();

        // Step 4: Go back to outer frame
        driver.switchTo().parentFrame();
        System.out.println("Back to outer frame");

        // Step 5: Go back to main page
        driver.switchTo().defaultContent();
        System.out.println("Back to main page");

        driver.quit();
    }
}
```

**Key Points:**
- Must switch through each level sequentially
- Use `parentFrame()` to go up one level
- Use `defaultContent()` to go back to main page

---

## 8. Getting Frame Count

```java
public int getFrameCount(WebDriver driver) {
    // Find all iframe elements
    List<WebElement> frames = driver.findElements(By.tagName("iframe"));
    return frames.size();
}

// Usage
int frameCount = getFrameCount(driver);
System.out.println("Total frames: " + frameCount);
```

---

## 9. Complete Frame Handling Utility

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class FrameHelper {
    private WebDriver driver;
    private WebDriverWait wait;

    public FrameHelper(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    /**
     * Switch to frame by index
     */
    public void switchToFrameByIndex(int index) {
        try {
            driver.switchTo().frame(index);
            System.out.println("Switched to frame at index: " + index);
        } catch (NoSuchFrameException e) {
            System.err.println("Frame not found at index: " + index);
        }
    }

    /**
     * Switch to frame by name or ID
     */
    public void switchToFrameByNameOrId(String nameOrId) {
        try {
            driver.switchTo().frame(nameOrId);
            System.out.println("Switched to frame: " + nameOrId);
        } catch (NoSuchFrameException e) {
            System.err.println("Frame not found: " + nameOrId);
        }
    }

    /**
     * Switch to frame by WebElement with wait
     */
    public void switchToFrameByElement(By locator) {
        try {
            WebElement frame = wait.until(
                ExpectedConditions.presenceOfElementLocated(locator)
            );
            driver.switchTo().frame(frame);
            System.out.println("Switched to frame using locator");
        } catch (TimeoutException e) {
            System.err.println("Frame not found within timeout");
        }
    }

    /**
     * Switch to frame and wait for it to be available
     */
    public void switchToFrameWhenAvailable(By locator) {
        try {
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator));
            System.out.println("Switched to frame successfully");
        } catch (TimeoutException e) {
            System.err.println("Frame not available within timeout");
        }
    }

    /**
     * Switch back to main content
     */
    public void switchToDefaultContent() {
        driver.switchTo().defaultContent();
        System.out.println("Switched to default content");
    }

    /**
     * Switch to parent frame
     */
    public void switchToParentFrame() {
        driver.switchTo().parentFrame();
        System.out.println("Switched to parent frame");
    }

    /**
     * Get total number of frames
     */
    public int getFrameCount() {
        List<WebElement> frames = driver.findElements(By.tagName("iframe"));
        return frames.size();
    }

    /**
     * Check if frame exists
     */
    public boolean isFramePresent(By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    /**
     * Switch to nested frame (multiple levels)
     */
    public void switchToNestedFrame(String... frameIdentifiers) {
        for (String frameId : frameIdentifiers) {
            try {
                driver.switchTo().frame(frameId);
                System.out.println("Switched to frame: " + frameId);
            } catch (NoSuchFrameException e) {
                System.err.println("Failed to switch to frame: " + frameId);
                return;
            }
        }
    }
}
```

---

## 10. Introduction to Windows and Tabs

Modern web applications often open new browser windows or tabs. Selenium provides methods to handle multiple windows.

### Window Handle

Each browser window/tab has a unique identifier called a **window handle** (a string).

```java
String currentWindowHandle = driver.getWindowHandle();
System.out.println("Current window handle: " + currentWindowHandle);
// Output: CDwindow-A1B2C3D4E5F6...
```

### All Window Handles

```java
Set<String> allWindowHandles = driver.getWindowHandles();
System.out.println("Total windows: " + allWindowHandles.size());
```

---

## 11. Switching Between Windows

### Basic Window Switching

```java
public class WindowSwitchingExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // Store parent window handle
        String parentWindow = driver.getWindowHandle();
        System.out.println("Parent window: " + parentWindow);

        // Click link that opens new window
        driver.findElement(By.id("newWindowLink")).click();

        // Get all window handles
        Set<String> allWindows = driver.getWindowHandles();
        System.out.println("Total windows: " + allWindows.size());

        // Switch to new window
        for (String window : allWindows) {
            if (!window.equals(parentWindow)) {
                driver.switchTo().window(window);
                System.out.println("Switched to new window");
                break;
            }
        }

        // Interact with new window
        System.out.println("New window title: " + driver.getTitle());

        // Close new window
        driver.close();

        // Switch back to parent window
        driver.switchTo().window(parentWindow);
        System.out.println("Back to parent window");

        driver.quit();
    }
}
```

---

## 12. Opening New Tab/Window

### Opening New Tab (Selenium 4+)

```java
// Open new tab
driver.switchTo().newWindow(WindowType.TAB);

// Open new window
driver.switchTo().newWindow(WindowType.WINDOW);
```

### Complete Example

```java
import org.openqa.selenium.WindowType;

public class NewWindowExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        String originalWindow = driver.getWindowHandle();

        // Open new tab
        driver.switchTo().newWindow(WindowType.TAB);

        // Navigate in new tab
        driver.get("https://another-example.com");
        System.out.println("New tab title: " + driver.getTitle());

        // Close new tab
        driver.close();

        // Switch back to original tab
        driver.switchTo().window(originalWindow);
        System.out.println("Original tab title: " + driver.getTitle());

        driver.quit();
    }
}
```

---

## 13. Handling Multiple Windows

```java
public class MultipleWindowsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/multiple-windows");

        String mainWindow = driver.getWindowHandle();

        // Click buttons that open multiple windows
        driver.findElement(By.id("openWindow1")).click();
        driver.findElement(By.id("openWindow2")).click();
        driver.findElement(By.id("openWindow3")).click();

        // Get all window handles
        Set<String> allWindows = driver.getWindowHandles();
        System.out.println("Total windows: " + allWindows.size());

        // Switch to each window
        for (String window : allWindows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                System.out.println("Window title: " + driver.getTitle());

                // Perform actions in this window
                // ...

                // Close this window
                driver.close();
            }
        }

        // Switch back to main window
        driver.switchTo().window(mainWindow);

        driver.quit();
    }
}
```

---

## 14. Window Operations

### Get Window Position

```java
Point position = driver.manage().window().getPosition();
System.out.println("X: " + position.getX() + ", Y: " + position.getY());
```

### Set Window Position

```java
driver.manage().window().setPosition(new Point(100, 100));
```

### Get Window Size

```java
Dimension size = driver.manage().window().getSize();
System.out.println("Width: " + size.getWidth() + ", Height: " + size.getHeight());
```

### Set Window Size

```java
driver.manage().window().setSize(new Dimension(1024, 768));
```

### Maximize Window

```java
driver.manage().window().maximize();
```

### Minimize Window (Selenium 4+)

```java
driver.manage().window().minimize();
```

### Fullscreen

```java
driver.manage().window().fullscreen();
```

---

## 15. Complete Window Handling Utility

```java
package utils;

import org.openqa.selenium.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class WindowHelper {
    private WebDriver driver;

    public WindowHelper(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * Get current window handle
     */
    public String getCurrentWindowHandle() {
        return driver.getWindowHandle();
    }

    /**
     * Get all window handles
     */
    public Set<String> getAllWindowHandles() {
        return driver.getWindowHandles();
    }

    /**
     * Get number of open windows
     */
    public int getWindowCount() {
        return driver.getWindowHandles().size();
    }

    /**
     * Switch to window by title
     */
    public boolean switchToWindowByTitle(String title) {
        Set<String> windows = driver.getWindowHandles();
        for (String window : windows) {
            driver.switchTo().window(window);
            if (driver.getTitle().equals(title)) {
                System.out.println("Switched to window: " + title);
                return true;
            }
        }
        System.err.println("Window not found with title: " + title);
        return false;
    }

    /**
     * Switch to window by URL
     */
    public boolean switchToWindowByUrl(String url) {
        Set<String> windows = driver.getWindowHandles();
        for (String window : windows) {
            driver.switchTo().window(window);
            if (driver.getCurrentUrl().contains(url)) {
                System.out.println("Switched to window with URL: " + url);
                return true;
            }
        }
        System.err.println("Window not found with URL: " + url);
        return false;
    }

    /**
     * Switch to new window (most recently opened)
     */
    public void switchToNewWindow(String parentWindow) {
        Set<String> windows = driver.getWindowHandles();
        for (String window : windows) {
            if (!window.equals(parentWindow)) {
                driver.switchTo().window(window);
                System.out.println("Switched to new window");
                break;
            }
        }
    }

    /**
     * Close all windows except main
     */
    public void closeAllWindowsExcept(String mainWindow) {
        Set<String> windows = driver.getWindowHandles();
        for (String window : windows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                driver.close();
                System.out.println("Closed window");
            }
        }
        driver.switchTo().window(mainWindow);
    }

    /**
     * Close current window and switch to parent
     */
    public void closeCurrentAndSwitchToParent(String parentWindow) {
        driver.close();
        driver.switchTo().window(parentWindow);
        System.out.println("Closed current window and switched to parent");
    }

    /**
     * Get list of all window titles
     */
    public List<String> getAllWindowTitles() {
        List<String> titles = new ArrayList<>();
        String currentWindow = driver.getWindowHandle();
        Set<String> windows = driver.getWindowHandles();

        for (String window : windows) {
            driver.switchTo().window(window);
            titles.add(driver.getTitle());
        }

        driver.switchTo().window(currentWindow);
        return titles;
    }

    /**
     * Open new tab and switch to it (Selenium 4+)
     */
    public void openNewTab() {
        driver.switchTo().newWindow(WindowType.TAB);
        System.out.println("Opened new tab");
    }

    /**
     * Open new window and switch to it (Selenium 4+)
     */
    public void openNewWindow() {
        driver.switchTo().newWindow(WindowType.WINDOW);
        System.out.println("Opened new window");
    }
}
```

---

## 16. Practical Scenarios

### Scenario 1: Handle Child Window

```java
String parentWindow = driver.getWindowHandle();
driver.findElement(By.id("openNewWindow")).click();

// Wait for new window
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

// Switch to child window
for (String window : driver.getWindowHandles()) {
    if (!window.equals(parentWindow)) {
        driver.switchTo().window(window);
        break;
    }
}

// Work in child window
System.out.println("Child window: " + driver.getTitle());
driver.close();

// Back to parent
driver.switchTo().window(parentWindow);
```

### Scenario 2: Handle Multiple Tabs

```java
List<String> tabs = new ArrayList<>(driver.getWindowHandles());

// Switch to tab by index
driver.switchTo().window(tabs.get(1));  // Second tab
driver.switchTo().window(tabs.get(0));  // First tab
```

---

## 17. Best Practices

1. **Always store parent window handle**
   ```java
   String parentWindow = driver.getWindowHandle();
   ```

2. **Use waits for new windows**
   ```java
   wait.until(ExpectedConditions.numberOfWindowsToBe(2));
   ```

3. **Close child windows before quitting**
   ```java
   driver.close();  // Close current window
   driver.quit();   // Close all windows and end session
   ```

4. **Create utility methods for reusability**

5. **Always switch back to parent window**

---

## 18. Practical Exercises

### Exercise 1: Basic Frame Switching
Switch to a frame by ID, interact with an element, and switch back.

### Exercise 2: Nested Frames
Navigate through 3 levels of nested frames.

### Exercise 3: Frame Count
Count all frames on a page and print their IDs/names.

### Exercise 4: Child Window
Open a new window, perform actions, close it, and return to parent.

### Exercise 5: Multiple Windows
Open 3 windows, switch between them, and close all except main.

### Exercise 6: Window by Title
Implement a method to switch to a window by its title.

### Exercise 7: New Tab (Selenium 4)
Open a new tab, navigate to a URL, and switch back.

### Exercise 8: Frame Utility
Create and test the FrameHelper class.

### Exercise 9: Window Utility
Create and test the WindowHelper class.

### Exercise 10: Complex Scenario
Handle a page with frames inside one window and multiple child windows.

---

## 19. Key Takeaways

1. **switchTo().frame()** - Switch into a frame (by index, name/ID, or element)
2. **defaultContent()** - Return to main page
3. **parentFrame()** - Go to immediate parent frame
4. **getWindowHandle()** - Get current window handle
5. **getWindowHandles()** - Get all window handles
6. **switchTo().window()** - Switch between windows
7. **driver.close()** - Close current window
8. **driver.quit()** - Close all windows and end session
9. **Always wait for frames/windows** before switching
10. **Store parent window handle** before opening new windows

---

## 20. Additional Resources

### Official Documentation
- [Selenium Frames Documentation](https://www.selenium.dev/documentation/webdriver/interactions/frames/)
- [Selenium Windows Documentation](https://www.selenium.dev/documentation/webdriver/interactions/windows/)

### Practice Websites
- [The Internet - Nested Frames](http://the-internet.herokuapp.com/nested_frames)
- [The Internet - IFrames](http://the-internet.herokuapp.com/iframe)
- [The Internet - Multiple Windows](http://the-internet.herokuapp.com/windows)
- [SeleniumEasy - Frames](https://demo.seleniumeasy.com/iframe-demo.html)

---

## Navigation

- **Previous:** [Day 25: Alerts & Popups](./day25_alerts_popups.md)
- **Next:** [Day 27: Actions Class](./day27_actions_class.md)
- **Week 4 Home:** [Week 4 Overview](./README.md)

---

**Happy Learning!** Master frames and windows to handle complex web application scenarios effectively.
