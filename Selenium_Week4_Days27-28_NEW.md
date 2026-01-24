# SELENIUM WEBDRIVER - DAYS 27-28: FRAMES & WINDOW HANDLING

## Day 27: Handling Frames and iFrames

---

### Exercise 1: Understanding Frames vs iFrames (20 minutes)

**What you'll learn:** The difference between frames and iframes, and how to identify them in web pages

**Practice Website:** https://the-internet.herokuapp.com/iframe

**Concept Explanation:**

**What is a Frame/iFrame?**
- A frame is an HTML document embedded inside another HTML document
- `<frame>` is older (deprecated), `<iframe>` is modern and commonly used
- Each frame has its own separate DOM (Document Object Model)
- Selenium cannot directly access elements inside a frame - you must switch to it first!

**Why Frames are Used:**
- Embed external content (YouTube videos, Google Maps, payment gateways)
- Isolate widgets or components
- Load content from different sources

**Step-by-Step:**

1. **Open browser and inspect the iframe**
   - Go to: https://the-internet.herokuapp.com/iframe
   - Right-click on the text editor area → Inspect
   - You'll see: `<iframe id="mce_0_ifr">`

**Create new package: `com.automation.frames`**
**Create new class: `FrameBasics`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class FrameBasics {
    public static void main(String[] args) {
        System.out.println("===== UNDERSTANDING FRAMES & IFRAMES =====\n");

        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Open test website
            driver.get("https://the-internet.herokuapp.com/iframe");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // STEP 1: Find all iframes on the page
            // ========================================
            System.out.println("\n--- STEP 1: Identifying iframes ---");

            // Find all iframe elements
            var iframes = driver.findElements(By.tagName("iframe"));
            System.out.println("Total iframes found: " + iframes.size());

            for (int i = 0; i < iframes.size(); i++) {
                WebElement iframe = iframes.get(i);
                String id = iframe.getAttribute("id");
                String name = iframe.getAttribute("name");
                String src = iframe.getAttribute("src");

                System.out.println("\nIframe #" + (i + 1) + ":");
                System.out.println("  ID: " + (id != null && !id.isEmpty() ? id : "No ID"));
                System.out.println("  Name: " + (name != null && !name.isEmpty() ? name : "No name"));
                System.out.println("  Source: " + (src != null && !src.isEmpty() ? src : "No source"));
            }

            // ========================================
            // STEP 2: Try to access element WITHOUT switching
            // ========================================
            System.out.println("\n--- STEP 2: Trying to access element WITHOUT switching to iframe ---");

            try {
                // This will FAIL because the element is inside iframe
                WebElement editor = driver.findElement(By.id("tinymce"));
                System.out.println("❌ This shouldn't print!");
            } catch (Exception e) {
                System.out.println("❌ ERROR (Expected): " + e.getClass().getSimpleName());
                System.out.println("   Reason: Element is inside iframe, cannot access directly!");
                System.out.println("   Solution: Must switch to iframe first!");
            }

            // ========================================
            // STEP 3: Switch to iframe and access element
            // ========================================
            System.out.println("\n--- STEP 3: Switching to iframe and accessing element ---");

            // Method 1: Switch by ID
            driver.switchTo().frame("mce_0_ifr");
            System.out.println("✅ Switched to iframe using ID: mce_0_ifr");

            // Now we can access elements inside the iframe
            WebElement editor = driver.findElement(By.id("tinymce"));
            String currentText = editor.getText();
            System.out.println("   Current text in editor: " + currentText);

            // Clear and type new text
            editor.clear();
            String newText = "Hello from Selenium! I am inside an iframe.";
            editor.sendKeys(newText);
            System.out.println("   ✅ Typed new text: " + newText);

            Thread.sleep(2000);

            // ========================================
            // STEP 4: Switch back to main page
            // ========================================
            System.out.println("\n--- STEP 4: Switching back to main page ---");

            // Switch back to default content (main page)
            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page (defaultContent)");

            // Now we can access elements on main page
            WebElement heading = driver.findElement(By.tagName("h3"));
            System.out.println("   Main page heading: " + heading.getText());

            // ========================================
            // STEP 5: Try accessing iframe element again
            // ========================================
            System.out.println("\n--- STEP 5: Verifying we're back on main page ---");

            try {
                // This will FAIL again because we're back on main page
                WebElement editorAgain = driver.findElement(By.id("tinymce"));
                System.out.println("❌ This shouldn't print!");
            } catch (Exception e) {
                System.out.println("✅ Confirmed: Cannot access iframe elements from main page");
                System.out.println("   We successfully switched back to main content!");
            }

            System.out.println("\n=====================================");
            System.out.println("KEY LEARNINGS:");
            System.out.println("  1. Frames have separate DOM - cannot access directly");
            System.out.println("  2. Must use switchTo().frame() before interacting");
            System.out.println("  3. Must use switchTo().defaultContent() to return");
            System.out.println("  4. Can switch by: ID, Name, Index, or WebElement");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== UNDERSTANDING FRAMES & IFRAMES =====

✅ Opened: An iFrame containing the TinyMCE WYSIWYG Editor

--- STEP 1: Identifying iframes ---
Total iframes found: 1

Iframe #1:
  ID: mce_0_ifr
  Name: No name
  Source: No source

--- STEP 2: Trying to access element WITHOUT switching to iframe ---
❌ ERROR (Expected): NoSuchElementException
   Reason: Element is inside iframe, cannot access directly!
   Solution: Must switch to iframe first!

--- STEP 3: Switching to iframe and accessing element ---
✅ Switched to iframe using ID: mce_0_ifr
   Current text in editor: Your content goes here.
   ✅ Typed new text: Hello from Selenium! I am inside an iframe.

--- STEP 4: Switching back to main page ---
✅ Switched back to main page (defaultContent)
   Main page heading: An iFrame containing the TinyMCE WYSIWYG Editor

--- STEP 5: Verifying we're back on main page ---
✅ Confirmed: Cannot access iframe elements from main page
   We successfully switched back to main content!

=====================================
KEY LEARNINGS:
  1. Frames have separate DOM - cannot access directly
  2. Must use switchTo().frame() before interacting
  3. Must use switchTo().defaultContent() to return
  4. Can switch by: ID, Name, Index, or WebElement
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens and loads the iframe page
2. Editor initially shows "Your content goes here."
3. Editor is cleared and new text is typed
4. You see: "Hello from Selenium! I am inside an iframe."
5. Page stays visible for 2 seconds
6. Browser closes

**✅ Success Criteria:**
- Iframe is identified correctly
- First attempt to access element fails (as expected)
- Successfully switch to iframe
- Text is typed in the editor
- Successfully switch back to main page
- Second attempt to access iframe element fails (confirming switch back)

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchElementException | Forgot to switch to iframe | Use driver.switchTo().frame() first |
| NoSuchFrameException | Wrong frame ID/name/index | Verify frame identifier using DevTools |
| StaleElementReferenceException | Switched frames after finding element | Re-find element after switching |
| "no such element: Unable to locate element" | Still in iframe, trying to access main page | Use switchTo().defaultContent() |

**💡 Key Concepts:**

**1. Three Ways to Switch to Frame:**
```java
// Method 1: By ID or Name (String)
driver.switchTo().frame("frameId");
driver.switchTo().frame("frameName");

// Method 2: By Index (int) - starts from 0
driver.switchTo().frame(0);  // First iframe
driver.switchTo().frame(1);  // Second iframe

// Method 3: By WebElement
WebElement iframeElement = driver.findElement(By.id("frameId"));
driver.switchTo().frame(iframeElement);
```

**2. Switching Back:**
```java
// Go back to main page
driver.switchTo().defaultContent();

// Go back to parent frame (if nested)
driver.switchTo().parentFrame();
```

**3. Frame Hierarchy:**
```
Main Page (Default Content)
  └── iframe 1
       ├── Element A
       ├── Element B
       └── nested iframe
            └── Element C
```

**🎯 Practice Challenge:**

1. Switch to iframe using index (0) instead of ID
2. Switch to iframe using WebElement
3. Type different messages and observe the changes
4. Add a try-catch to handle the NoSuchElementException properly

---

### Exercise 2: Multiple Ways to Switch Frames (25 minutes)

**What you'll learn:** All methods to switch frames: by ID, name, index, and WebElement

**Create new class: `FrameSwitchMethods`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class FrameSwitchMethods {
    public static void main(String[] args) {
        System.out.println("===== FRAME SWITCHING: ALL METHODS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://the-internet.herokuapp.com/iframe");
            System.out.println("✅ Page loaded: " + driver.getTitle() + "\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 1: Switch by Index
            // ========================================
            System.out.println("--- METHOD 1: Switch by Index ---");
            System.out.println("Syntax: driver.switchTo().frame(index)");
            System.out.println("Note: Index starts from 0 (first iframe = 0)");

            // Count total iframes
            int totalIframes = driver.findElements(By.tagName("iframe")).size();
            System.out.println("Total iframes on page: " + totalIframes);

            // Switch to first iframe (index 0)
            driver.switchTo().frame(0);
            System.out.println("✅ Switched to iframe at index 0");

            // Access element inside iframe
            WebElement editor = driver.findElement(By.id("tinymce"));
            editor.clear();
            editor.sendKeys("Method 1: Switched by Index!");
            System.out.println("   Text entered: " + editor.getText());

            // Switch back
            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 2: Switch by ID
            // ========================================
            System.out.println("--- METHOD 2: Switch by ID ---");
            System.out.println("Syntax: driver.switchTo().frame(\"frameId\")");
            System.out.println("Best Practice: Most reliable if iframe has ID");

            // Switch using ID
            driver.switchTo().frame("mce_0_ifr");
            System.out.println("✅ Switched to iframe with ID: mce_0_ifr");

            WebElement editor2 = driver.findElement(By.id("tinymce"));
            editor2.clear();
            editor2.sendKeys("Method 2: Switched by ID!");
            System.out.println("   Text entered: " + editor2.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 3: Switch by Name
            // ========================================
            System.out.println("--- METHOD 3: Switch by Name ---");
            System.out.println("Syntax: driver.switchTo().frame(\"frameName\")");

            // First, let's check if this iframe has a name
            WebElement iframeCheck = driver.findElement(By.id("mce_0_ifr"));
            String frameName = iframeCheck.getAttribute("name");

            if (frameName != null && !frameName.isEmpty()) {
                driver.switchTo().frame(frameName);
                System.out.println("✅ Switched to iframe with name: " + frameName);

                WebElement editor3 = driver.findElement(By.id("tinymce"));
                editor3.clear();
                editor3.sendKeys("Method 3: Switched by Name!");
                System.out.println("   Text entered: " + editor3.getText());

                driver.switchTo().defaultContent();
            } else {
                System.out.println("ℹ️  This iframe has no 'name' attribute");
                System.out.println("   Name attribute: " + (frameName == null ? "null" : "empty string"));
                System.out.println("   Skipping this method for this iframe\n");
            }
            Thread.sleep(1500);

            // ========================================
            // METHOD 4: Switch by WebElement
            // ========================================
            System.out.println("--- METHOD 4: Switch by WebElement ---");
            System.out.println("Syntax: driver.switchTo().frame(WebElement)");
            System.out.println("Use Case: When you need to find iframe dynamically");

            // Find the iframe as WebElement
            WebElement iframeElement = driver.findElement(By.id("mce_0_ifr"));
            System.out.println("Step 1: Found iframe element with ID: " + iframeElement.getAttribute("id"));

            // Switch using WebElement
            driver.switchTo().frame(iframeElement);
            System.out.println("✅ Switched to iframe using WebElement");

            WebElement editor4 = driver.findElement(By.id("tinymce"));
            editor4.clear();
            editor4.sendKeys("Method 4: Switched by WebElement!");
            System.out.println("   Text entered: " + editor4.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 5: Advanced - Using XPath
            // ========================================
            System.out.println("--- METHOD 5: Advanced - Using XPath to Find Frame ---");
            System.out.println("Syntax: Find iframe by XPath, then switch");

            // Find iframe using XPath
            WebElement iframeByXPath = driver.findElement(By.xpath("//iframe[@id='mce_0_ifr']"));
            System.out.println("Step 1: Found iframe using XPath: //iframe[@id='mce_0_ifr']");

            // Switch to it
            driver.switchTo().frame(iframeByXPath);
            System.out.println("✅ Switched to iframe found by XPath");

            WebElement editor5 = driver.findElement(By.id("tinymce"));
            editor5.clear();
            editor5.sendKeys("Method 5: Found by XPath, then switched!");
            System.out.println("   Text entered: " + editor5.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");

            // ========================================
            // SUMMARY TABLE
            // ========================================
            System.out.println("=====================================");
            System.out.println("COMPARISON TABLE:");
            System.out.println("=====================================");
            System.out.println("Method          | Syntax                              | When to Use");
            System.out.println("----------------|-------------------------------------|----------------------------------");
            System.out.println("Index           | switchTo().frame(0)                 | When position is fixed");
            System.out.println("ID              | switchTo().frame(\"id\")              | Best - if iframe has ID");
            System.out.println("Name            | switchTo().frame(\"name\")            | If iframe has name attribute");
            System.out.println("WebElement      | switchTo().frame(WebElement)        | When using dynamic locators");
            System.out.println("XPath+Element   | Find by XPath → switchTo(element)   | Complex scenarios");
            System.out.println("=====================================");
            System.out.println("\nBEST PRACTICES:");
            System.out.println("  ✅ Prefer ID or Name (most reliable)");
            System.out.println("  ⚠️  Avoid Index (breaks if iframes are added/removed)");
            System.out.println("  ✅ Use WebElement for dynamic frames");
            System.out.println("  ✅ Always switch back with defaultContent()");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== FRAME SWITCHING: ALL METHODS =====

✅ Page loaded: An iFrame containing the TinyMCE WYSIWYG Editor

--- METHOD 1: Switch by Index ---
Syntax: driver.switchTo().frame(index)
Note: Index starts from 0 (first iframe = 0)
Total iframes on page: 1
✅ Switched to iframe at index 0
   Text entered: Method 1: Switched by Index!
✅ Switched back to main page

--- METHOD 2: Switch by ID ---
Syntax: driver.switchTo().frame("frameId")
Best Practice: Most reliable if iframe has ID
✅ Switched to iframe with ID: mce_0_ifr
   Text entered: Method 2: Switched by ID!
✅ Switched back to main page

--- METHOD 3: Switch by Name ---
Syntax: driver.switchTo().frame("frameName")
ℹ️  This iframe has no 'name' attribute
   Name attribute: empty string
   Skipping this method for this iframe

--- METHOD 4: Switch by WebElement ---
Syntax: driver.switchTo().frame(WebElement)
Use Case: When you need to find iframe dynamically
Step 1: Found iframe element with ID: mce_0_ifr
✅ Switched to iframe using WebElement
   Text entered: Method 4: Switched by WebElement!
✅ Switched back to main page

--- METHOD 5: Advanced - Using XPath to Find Frame ---
Syntax: Find iframe by XPath, then switch
Step 1: Found iframe using XPath: //iframe[@id='mce_0_ifr']
✅ Switched to iframe found by XPath
   Text entered: Method 5: Found by XPath, then switched!
✅ Switched back to main page

=====================================
COMPARISON TABLE:
=====================================
Method          | Syntax                              | When to Use
----------------|-------------------------------------|----------------------------------
Index           | switchTo().frame(0)                 | When position is fixed
ID              | switchTo().frame("id")              | Best - if iframe has ID
Name            | switchTo().frame("name")            | If iframe has name attribute
WebElement      | switchTo().frame(WebElement)        | When using dynamic locators
XPath+Element   | Find by XPath → switchTo(element)   | Complex scenarios
=====================================

BEST PRACTICES:
  ✅ Prefer ID or Name (most reliable)
  ⚠️  Avoid Index (breaks if iframes are added/removed)
  ✅ Use WebElement for dynamic frames
  ✅ Always switch back with defaultContent()
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens, page loads
2. Text editor content changes 4 times (once for each method)
3. You see different messages appearing in the editor
4. Each message stays for 1.5 seconds before being replaced
5. Browser closes after summary display

**✅ Success Criteria:**
- All 4 switching methods work successfully
- Text is typed using each method
- Each switch back to main page succeeds
- Summary table displays correctly
- No exceptions thrown

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchFrameException | Invalid frame ID/name/index | Verify frame identifier in DevTools |
| StaleElementReferenceException | Frame reloaded after finding | Re-find the frame element |
| "no such frame" with index | Index out of bounds | Count iframes first: driver.findElements(By.tagName("iframe")).size() |
| NullPointerException | Frame element is null | Check if frame exists before switching |

**💡 Key Concepts:**

**1. When to Use Each Method:**

```java
// Use INDEX when:
// - Testing page with fixed frame structure
// - Quick prototyping
driver.switchTo().frame(0);

// Use ID when:
// - iframe has id attribute (MOST RELIABLE)
// - Recommended for production code
driver.switchTo().frame("frameId");

// Use NAME when:
// - iframe has name attribute
// - Legacy pages
driver.switchTo().frame("frameName");

// Use WEBELEMENT when:
// - Need to find frame dynamically
// - Complex locators required
WebElement frame = driver.findElement(By.xpath("//iframe[@class='dynamic']"));
driver.switchTo().frame(frame);
```

**2. Frame vs String vs Int:**

```java
// ✅ CORRECT - String (ID or Name)
driver.switchTo().frame("mce_0_ifr");

// ✅ CORRECT - int (Index)
driver.switchTo().frame(0);

// ✅ CORRECT - WebElement
WebElement frameElement = driver.findElement(By.id("frameId"));
driver.switchTo().frame(frameElement);

// ❌ WRONG - Cannot use both
// driver.switchTo().frame("0");  // This searches for name="0", NOT index 0
```

**3. Return Methods:**

```java
// Go to main page (default content)
driver.switchTo().defaultContent();

// Go to immediate parent frame (for nested frames)
driver.switchTo().parentFrame();
```

**🎯 Practice Challenge:**

1. Create a method that tries all switching methods in order
2. Add error handling for each method
3. Count how many frames are on the page before switching
4. Print frame attributes before switching

---

### Exercise 3: Nested Frames (30 minutes)

**What you'll learn:** How to handle frames within frames (nested frames)

**Practice Website:** https://the-internet.herokuapp.com/nested_frames

**Create new class: `NestedFrames`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class NestedFrames {
    public static void main(String[] args) {
        System.out.println("===== NESTED FRAMES: FRAMES WITHIN FRAMES =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://the-internet.herokuapp.com/nested_frames");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // STEP 1: Analyze Frame Structure
            // ========================================
            System.out.println("\n--- STEP 1: Analyzing Frame Structure ---");

            // Count frames on main page
            List<WebElement> mainFrames = driver.findElements(By.tagName("frame"));
            System.out.println("Frames on MAIN page: " + mainFrames.size());

            for (int i = 0; i < mainFrames.size(); i++) {
                String name = mainFrames.get(i).getAttribute("name");
                System.out.println("  Frame " + i + ": name = '" + name + "'");
            }

            System.out.println("\nFrame Hierarchy:");
            System.out.println("Main Page");
            System.out.println("├── frame-top (contains nested frames)");
            System.out.println("│   ├── frame-left");
            System.out.println("│   ├── frame-middle");
            System.out.println("│   └── frame-right");
            System.out.println("└── frame-bottom");

            // ========================================
            // STEP 2: Access Top-Level Frame (frame-bottom)
            // ========================================
            System.out.println("\n--- STEP 2: Accessing Top-Level Frame ---");

            // Switch to bottom frame (direct child of main page)
            driver.switchTo().frame("frame-bottom");
            System.out.println("✅ Switched to: frame-bottom");

            // Get text from body
            WebElement bottomBody = driver.findElement(By.tagName("body"));
            String bottomText = bottomBody.getText();
            System.out.println("   Text in frame-bottom: '" + bottomText + "'");

            // Switch back to main page
            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page");
            Thread.sleep(1500);

            // ========================================
            // STEP 3: Access Nested Frame (2 levels deep)
            // ========================================
            System.out.println("\n--- STEP 3: Accessing Nested Frames ---");
            System.out.println("Goal: Access frame-left (inside frame-top)");

            // LEVEL 1: Switch to frame-top (parent frame)
            driver.switchTo().frame("frame-top");
            System.out.println("✅ Level 1: Switched to frame-top");

            // Check how many frames are inside frame-top
            List<WebElement> nestedFrames = driver.findElements(By.tagName("frame"));
            System.out.println("   Frames inside frame-top: " + nestedFrames.size());
            for (WebElement frame : nestedFrames) {
                System.out.println("     - " + frame.getAttribute("name"));
            }

            // LEVEL 2: Switch to frame-left (child of frame-top)
            driver.switchTo().frame("frame-left");
            System.out.println("✅ Level 2: Switched to frame-left");

            // Get text from frame-left
            WebElement leftBody = driver.findElement(By.tagName("body"));
            String leftText = leftBody.getText();
            System.out.println("   Text in frame-left: '" + leftText + "'");

            // Switch back to main page (from nested frame)
            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page from nested frame");
            Thread.sleep(1500);

            // ========================================
            // STEP 4: Access All Nested Frames
            // ========================================
            System.out.println("\n--- STEP 4: Reading All Nested Frames ---");

            // Access frame-top → frame-left
            driver.switchTo().frame("frame-top").switchTo().frame("frame-left");
            String leftContent = driver.findElement(By.tagName("body")).getText();
            System.out.println("frame-left text: '" + leftContent + "'");
            driver.switchTo().defaultContent();

            // Access frame-top → frame-middle
            driver.switchTo().frame("frame-top").switchTo().frame("frame-middle");
            String middleContent = driver.findElement(By.tagName("body")).getText();
            System.out.println("frame-middle text: '" + middleContent + "'");
            driver.switchTo().defaultContent();

            // Access frame-top → frame-right
            driver.switchTo().frame("frame-top").switchTo().frame("frame-right");
            String rightContent = driver.findElement(By.tagName("body")).getText();
            System.out.println("frame-right text: '" + rightContent + "'");
            driver.switchTo().defaultContent();

            Thread.sleep(1500);

            // ========================================
            // STEP 5: Using parentFrame()
            // ========================================
            System.out.println("\n--- STEP 5: Using parentFrame() ---");
            System.out.println("Demonstrating switchTo().parentFrame()");

            // Go to nested frame
            driver.switchTo().frame("frame-top");
            System.out.println("✅ Switched to frame-top");

            driver.switchTo().frame("frame-middle");
            System.out.println("✅ Switched to frame-middle (nested)");

            // Instead of defaultContent(), use parentFrame()
            driver.switchTo().parentFrame();
            System.out.println("✅ Used parentFrame() - now back in frame-top");

            // Verify we're in frame-top by switching to another nested frame
            driver.switchTo().frame("frame-right");
            String rightText = driver.findElement(By.tagName("body")).getText();
            System.out.println("   Successfully accessed frame-right: '" + rightText + "'");
            System.out.println("   This confirms we were in frame-top!");

            // Go back to main page
            driver.switchTo().defaultContent();
            System.out.println("✅ Back to main page");

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("NESTED FRAMES - KEY POINTS:");
            System.out.println("=====================================");
            System.out.println("1. Nested frames = frames inside frames");
            System.out.println("2. Must switch level by level:");
            System.out.println("   - Main → Parent Frame → Child Frame");
            System.out.println("3. Cannot jump directly to nested frame");
            System.out.println("4. Two ways to go back:");
            System.out.println("   - defaultContent() → Main page");
            System.out.println("   - parentFrame() → One level up");
            System.out.println("5. Chain switching for cleaner code:");
            System.out.println("   driver.switchTo().frame(\"parent\").switchTo().frame(\"child\");");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== NESTED FRAMES: FRAMES WITHIN FRAMES =====

✅ Opened: Nested Frames

--- STEP 1: Analyzing Frame Structure ---
Frames on MAIN page: 2
  Frame 0: name = 'frame-top'
  Frame 1: name = 'frame-bottom'

Frame Hierarchy:
Main Page
├── frame-top (contains nested frames)
│   ├── frame-left
│   ├── frame-middle
│   └── frame-right
└── frame-bottom

--- STEP 2: Accessing Top-Level Frame ---
✅ Switched to: frame-bottom
   Text in frame-bottom: 'BOTTOM'
✅ Switched back to main page

--- STEP 3: Accessing Nested Frames ---
Goal: Access frame-left (inside frame-top)
✅ Level 1: Switched to frame-top
   Frames inside frame-top: 3
     - frame-left
     - frame-middle
     - frame-right
✅ Level 2: Switched to frame-left
   Text in frame-left: 'LEFT'
✅ Switched back to main page from nested frame

--- STEP 4: Reading All Nested Frames ---
frame-left text: 'LEFT'
frame-middle text: 'MIDDLE'
frame-right text: 'RIGHT'

--- STEP 5: Using parentFrame() ---
Demonstrating switchTo().parentFrame()
✅ Switched to frame-top
✅ Switched to frame-middle (nested)
✅ Used parentFrame() - now back in frame-top
   Successfully accessed frame-right: 'RIGHT'
   This confirms we were in frame-top!
✅ Back to main page

=====================================
NESTED FRAMES - KEY POINTS:
=====================================
1. Nested frames = frames inside frames
2. Must switch level by level:
   - Main → Parent Frame → Child Frame
3. Cannot jump directly to nested frame
4. Two ways to go back:
   - defaultContent() → Main page
   - parentFrame() → One level up
5. Chain switching for cleaner code:
   driver.switchTo().frame("parent").switchTo().frame("child");
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens showing nested frames page
2. Page displays multiple frames with text: LEFT, MIDDLE, RIGHT, BOTTOM
3. Selenium switches between frames (you won't see visible changes)
4. Console shows successful navigation through frame hierarchy
5. Browser closes after 2 seconds

**✅ Success Criteria:**
- Correctly identifies 2 top-level frames
- Successfully accesses frame-bottom
- Successfully navigates to nested frame-left
- Reads text from all nested frames (LEFT, MIDDLE, RIGHT)
- Demonstrates parentFrame() usage
- All switches succeed without errors

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchFrameException | Trying to jump directly to nested frame | Switch to parent first, then child |
| "no such frame" | Wrong frame name | Print all frame names to verify |
| NoSuchElementException | Looking for element in wrong frame | Verify current frame context |
| "Frame not found" after parentFrame() | Already at main page | Use parentFrame() only when in nested frame |

**💡 Key Concepts:**

**1. Nested Frame Navigation:**

```java
// ❌ WRONG - Cannot jump directly
driver.switchTo().frame("frame-left");  // This will FAIL!

// ✅ CORRECT - Switch level by level
driver.switchTo().frame("frame-top");      // Parent
driver.switchTo().frame("frame-left");     // Child

// ✅ BETTER - Chain the calls
driver.switchTo().frame("frame-top").switchTo().frame("frame-left");
```

**2. Going Back:**

```java
// From: Main → frame-top → frame-middle

// Option 1: Go to main page directly
driver.switchTo().defaultContent();  // Now at: Main

// Option 2: Go up one level
driver.switchTo().parentFrame();     // Now at: frame-top
driver.switchTo().parentFrame();     // Now at: Main
```

**3. Frame Hierarchy:**

```
Main Page (defaultContent)
    │
    ├── frame-top (Level 1)
    │   ├── frame-left (Level 2)
    │   ├── frame-middle (Level 2)
    │   └── frame-right (Level 2)
    │
    └── frame-bottom (Level 1)

Navigation Rule:
- To go DOWN: Must switch level by level
- To go UP: Use parentFrame() or defaultContent()
```

**🎯 Practice Challenge:**

1. Create a method to print the path to a nested frame
2. Switch to all 3 nested frames and print their text
3. Try using indexes instead of names
4. Navigate using parentFrame() from frame-right to frame-left

---

### Exercise 4: Real-World Scenario - Switching Between Multiple Frames (25 minutes)

**What you'll learn:** Practical frame handling with multiple operations

**Create new class: `MultipleFrameOperations`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;

public class MultipleFrameOperations {

    // Method to print current frame context
    private static void printCurrentContext(WebDriver driver, String expectedContext) {
        System.out.println("📍 Current context: " + expectedContext);
    }

    public static void main(String[] args) {
        System.out.println("===== REAL-WORLD: MULTIPLE FRAME OPERATIONS =====\n");
        System.out.println("Scenario: Extracting data from nested frames");
        System.out.println("Similar to: Forms with embedded widgets, dashboards\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://the-internet.herokuapp.com/nested_frames");
            System.out.println("✅ Website loaded\n");
            Thread.sleep(1500);

            // ========================================
            // TASK 1: Collect all frame data
            // ========================================
            System.out.println("--- TASK 1: Collecting Data from All Frames ---\n");

            // Data structure to store results
            List<String> frameData = new ArrayList<>();

            // Get bottom frame data
            printCurrentContext(driver, "Main Page");
            driver.switchTo().frame("frame-bottom");
            printCurrentContext(driver, "frame-bottom");

            String bottomData = driver.findElement(By.tagName("body")).getText();
            frameData.add("frame-bottom: " + bottomData);
            System.out.println("✅ Collected from frame-bottom: " + bottomData);

            driver.switchTo().defaultContent();
            printCurrentContext(driver, "Main Page");
            System.out.println();

            // Get nested frames data
            String[] nestedFrames = {"frame-left", "frame-middle", "frame-right"};

            for (String frameName : nestedFrames) {
                // Go to parent frame
                driver.switchTo().frame("frame-top");
                printCurrentContext(driver, "frame-top");

                // Go to child frame
                driver.switchTo().frame(frameName);
                printCurrentContext(driver, frameName);

                String data = driver.findElement(By.tagName("body")).getText();
                frameData.add(frameName + ": " + data);
                System.out.println("✅ Collected from " + frameName + ": " + data);

                // Return to main page
                driver.switchTo().defaultContent();
                printCurrentContext(driver, "Main Page");
                System.out.println();
            }

            // ========================================
            // TASK 2: Display collected data
            // ========================================
            System.out.println("--- TASK 2: All Collected Data ---\n");
            System.out.println("Total frames processed: " + frameData.size());
            System.out.println("\nFrame Data Summary:");
            for (int i = 0; i < frameData.size(); i++) {
                System.out.println("  " + (i + 1) + ". " + frameData.get(i));
            }

            // ========================================
            // TASK 3: Verify specific frame content
            // ========================================
            System.out.println("\n--- TASK 3: Verifying Frame Content ---\n");

            // Verify middle frame
            driver.switchTo().frame("frame-top").switchTo().frame("frame-middle");
            String middleText = driver.findElement(By.tagName("body")).getText();

            if (middleText.equals("MIDDLE")) {
                System.out.println("✅ PASS: frame-middle contains expected text 'MIDDLE'");
            } else {
                System.out.println("❌ FAIL: frame-middle has unexpected text: " + middleText);
            }

            driver.switchTo().defaultContent();

            // Verify left frame
            driver.switchTo().frame("frame-top").switchTo().frame("frame-left");
            String leftText = driver.findElement(By.tagName("body")).getText();

            if (leftText.equals("LEFT")) {
                System.out.println("✅ PASS: frame-left contains expected text 'LEFT'");
            } else {
                System.out.println("❌ FAIL: frame-left has unexpected text: " + leftText);
            }

            driver.switchTo().defaultContent();

            // ========================================
            // TASK 4: Navigation pattern practice
            // ========================================
            System.out.println("\n--- TASK 4: Navigation Pattern Practice ---\n");

            System.out.println("Pattern: Main → frame-top → frame-right → frame-top → frame-left");

            System.out.println("Step 1: Main → frame-top");
            driver.switchTo().frame("frame-top");

            System.out.println("Step 2: frame-top → frame-right");
            driver.switchTo().frame("frame-right");
            System.out.println("   Current frame content: " + driver.findElement(By.tagName("body")).getText());

            System.out.println("Step 3: frame-right → frame-top (using parentFrame)");
            driver.switchTo().parentFrame();

            System.out.println("Step 4: frame-top → frame-left");
            driver.switchTo().frame("frame-left");
            System.out.println("   Current frame content: " + driver.findElement(By.tagName("body")).getText());

            System.out.println("✅ Navigation pattern completed successfully!");

            driver.switchTo().defaultContent();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("REAL-WORLD APPLICATIONS:");
            System.out.println("=====================================");
            System.out.println("1. E-commerce: Product comparison widgets");
            System.out.println("2. Banking: Embedded payment gateways");
            System.out.println("3. CMS: Rich text editors (like TinyMCE)");
            System.out.println("4. Social Media: Embedded posts/videos");
            System.out.println("5. Analytics: Dashboard widgets");
            System.out.println("\nBEST PRACTICES:");
            System.out.println("  ✅ Always return to defaultContent() when done");
            System.out.println("  ✅ Use descriptive variable names for frames");
            System.out.println("  ✅ Add comments for complex frame hierarchies");
            System.out.println("  ✅ Create helper methods for frequent switches");
            System.out.println("  ✅ Handle NoSuchFrameException appropriately");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== REAL-WORLD: MULTIPLE FRAME OPERATIONS =====

Scenario: Extracting data from nested frames
Similar to: Forms with embedded widgets, dashboards

✅ Website loaded

--- TASK 1: Collecting Data from All Frames ---

📍 Current context: Main Page
📍 Current context: frame-bottom
✅ Collected from frame-bottom: BOTTOM
📍 Current context: Main Page

📍 Current context: frame-top
📍 Current context: frame-left
✅ Collected from frame-left: LEFT
📍 Current context: Main Page

📍 Current context: frame-top
📍 Current context: frame-middle
✅ Collected from frame-middle: MIDDLE
📍 Current context: Main Page

📍 Current context: frame-top
📍 Current context: frame-right
✅ Collected from frame-right: RIGHT
📍 Current context: Main Page

--- TASK 2: All Collected Data ---

Total frames processed: 4

Frame Data Summary:
  1. frame-bottom: BOTTOM
  2. frame-left: LEFT
  3. frame-middle: MIDDLE
  4. frame-right: RIGHT

--- TASK 3: Verifying Frame Content ---

✅ PASS: frame-middle contains expected text 'MIDDLE'
✅ PASS: frame-left contains expected text 'LEFT'

--- TASK 4: Navigation Pattern Practice ---

Pattern: Main → frame-top → frame-right → frame-top → frame-left
Step 1: Main → frame-top
Step 2: frame-top → frame-right
   Current frame content: RIGHT
Step 3: frame-right → frame-top (using parentFrame)
Step 4: frame-top → frame-left
   Current frame content: LEFT
✅ Navigation pattern completed successfully!

=====================================
REAL-WORLD APPLICATIONS:
=====================================
1. E-commerce: Product comparison widgets
2. Banking: Embedded payment gateways
3. CMS: Rich text editors (like TinyMCE)
4. Social Media: Embedded posts/videos
5. Analytics: Dashboard widgets

BEST PRACTICES:
  ✅ Always return to defaultContent() when done
  ✅ Use descriptive variable names for frames
  ✅ Add comments for complex frame hierarchies
  ✅ Create helper methods for frequent switches
  ✅ Handle NoSuchFrameException appropriately
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser loads the nested frames page
2. Selenium navigates through all frames systematically
3. Data is collected from each frame (not visible to user)
4. Frame content is verified programmatically
5. Navigation pattern is executed
6. Browser closes

**✅ Success Criteria:**
- All 4 frames are accessed successfully
- Data is collected from each frame
- Frame data list contains 4 items
- Content verification passes for all frames
- Navigation pattern completes without errors
- Helper method works correctly

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| ConcurrentModificationException | Modifying list while iterating | Use index-based loop or ArrayList |
| NoSuchFrameException during loop | Frame name mismatch | Verify frame names before loop |
| StaleElementReferenceException | Switching changed DOM | Re-find elements after switching |
| "Cannot switch to frame" | Still in previous frame | Always use defaultContent() before switching |

**💡 Key Concepts:**

**1. Data Collection Pattern:**

```java
// Pattern: Switch → Extract → Store → Return
List<String> data = new ArrayList<>();

for (String frameName : frameNames) {
    driver.switchTo().frame(frameName);           // Switch
    String content = driver.findElement(...);      // Extract
    data.add(frameName + ": " + content);         // Store
    driver.switchTo().defaultContent();           // Return
}
```

**2. Helper Methods:**

```java
// Create reusable methods
public static String getFrameText(WebDriver driver, String frameName) {
    driver.switchTo().frame(frameName);
    String text = driver.findElement(By.tagName("body")).getText();
    driver.switchTo().defaultContent();
    return text;
}

// Usage
String text = getFrameText(driver, "frame-bottom");
```

**3. Navigation Tracking:**

```java
// Keep track of current context
String currentContext = "Main";

driver.switchTo().frame("frame-top");
currentContext = "frame-top";

driver.switchTo().frame("frame-left");
currentContext = "frame-top → frame-left";

// Useful for debugging
System.out.println("Current location: " + currentContext);
```

**🎯 Practice Challenge:**

1. Create a method `getAllFrameNames()` that returns all frame names on a page
2. Create a method `getFrameContent()` that takes frame path as parameter
3. Add error handling for missing frames
4. Count total frames (including nested) programmatically
5. Create a visual tree representation of the frame structure

---

### Exercise 5: Frame Handling with Wait Conditions (30 minutes)

**What you'll learn:** Combining explicit waits with frame operations

**Create new class: `FrameWithWaits`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class FrameWithWaits {
    public static void main(String[] args) {
        System.out.println("===== FRAME HANDLING WITH EXPLICIT WAITS =====\n");
        System.out.println("Scenario: Waiting for frames to load before switching\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Create WebDriverWait object
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // ========================================
            // SCENARIO 1: Wait for frame to be available
            // ========================================
            System.out.println("--- SCENARIO 1: Wait for Frame to Load ---\n");

            driver.get("https://the-internet.herokuapp.com/iframe");
            System.out.println("✅ Page loading started...");

            // Wait for iframe to be available and switch to it
            System.out.println("⏳ Waiting for iframe to be available...");
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("mce_0_ifr"));
            System.out.println("✅ Frame is available and switched!");

            // Now we're inside the frame
            WebElement editor = driver.findElement(By.id("tinymce"));
            String originalText = editor.getText();
            System.out.println("   Original text: " + originalText);

            editor.clear();
            editor.sendKeys("Text entered after waiting for frame!");
            System.out.println("   New text: " + editor.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 2: Wait for frame by locator
            // ========================================
            System.out.println("--- SCENARIO 2: Wait for Frame Using Locator ---\n");

            // Wait for iframe element to be present
            By iframeLocator = By.id("mce_0_ifr");
            System.out.println("⏳ Waiting for iframe element with ID: mce_0_ifr");

            wait.until(ExpectedConditions.presenceOfElementLocated(iframeLocator));
            System.out.println("✅ Iframe element found!");

            // Get the iframe as WebElement
            WebElement iframeElement = driver.findElement(iframeLocator);

            // Wait for frame to be available and switch using WebElement
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(iframeElement));
            System.out.println("✅ Switched to iframe using WebElement");

            WebElement editor2 = driver.findElement(By.id("tinymce"));
            editor2.clear();
            editor2.sendKeys("Switched using WebElement after wait!");
            System.out.println("   Text entered: " + editor2.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 3: Wait for element inside frame
            // ========================================
            System.out.println("--- SCENARIO 3: Wait for Element Inside Frame ---\n");

            // Switch to frame first
            driver.switchTo().frame("mce_0_ifr");
            System.out.println("✅ Switched to iframe");

            // Wait for element inside frame to be clickable
            System.out.println("⏳ Waiting for editor element to be clickable...");
            WebElement editorElement = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("tinymce"))
            );
            System.out.println("✅ Editor element is clickable!");

            editorElement.clear();
            editorElement.sendKeys("Waited for element inside frame to be clickable!");
            System.out.println("   Text entered: " + editorElement.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 4: Complex wait - frame with nested content
            // ========================================
            System.out.println("--- SCENARIO 4: Multiple Frames with Waits ---\n");

            // Navigate to nested frames page
            driver.get("https://the-internet.herokuapp.com/nested_frames");
            System.out.println("✅ Navigated to nested frames page");

            // Wait for parent frame and switch
            System.out.println("⏳ Waiting for parent frame (frame-top)...");
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frame-top"));
            System.out.println("✅ Switched to frame-top");

            // Wait for nested frame and switch
            System.out.println("⏳ Waiting for nested frame (frame-middle)...");
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frame-middle"));
            System.out.println("✅ Switched to frame-middle");

            // Wait for body element and get text
            WebElement body = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.tagName("body"))
            );
            System.out.println("   Text in frame-middle: " + body.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Returned to main page\n");

            // ========================================
            // SCENARIO 5: Error handling with waits
            // ========================================
            System.out.println("--- SCENARIO 5: Handling Frame Load Failures ---\n");

            try {
                // Try to wait for a non-existent frame (will timeout)
                System.out.println("⏳ Trying to wait for non-existent frame...");
                WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(3));
                shortWait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("non-existent-frame"));
                System.out.println("❌ This shouldn't print!");

            } catch (Exception e) {
                System.out.println("❌ TimeoutException (Expected): Frame not found within timeout");
                System.out.println("   Error type: " + e.getClass().getSimpleName());
                System.out.println("   Handling: Log error and continue with test");
                System.out.println("✅ Error handled gracefully!");
            }

            // ========================================
            // BEST PRACTICES DEMONSTRATION
            // ========================================
            System.out.println("\n--- BEST PRACTICES ---\n");

            driver.get("https://the-internet.herokuapp.com/iframe");

            System.out.println("1. Always use waits before switching to frames");
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("mce_0_ifr"));
            System.out.println("   ✅ Frame loaded and switched");

            System.out.println("\n2. Use explicit waits for elements inside frames");
            WebElement editorFinal = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("tinymce"))
            );
            System.out.println("   ✅ Element inside frame is visible");

            System.out.println("\n3. Always switch back to default content");
            driver.switchTo().defaultContent();
            System.out.println("   ✅ Switched back to main page");

            System.out.println("\n4. Use appropriate timeout values");
            System.out.println("   • Standard: 10 seconds");
            System.out.println("   • Slow-loading frames: 20-30 seconds");
            System.out.println("   • Quick checks: 3-5 seconds");

            System.out.println("\n=====================================");
            System.out.println("WAIT CONDITIONS FOR FRAMES:");
            System.out.println("=====================================");
            System.out.println("1. frameToBeAvailableAndSwitchToIt(String)");
            System.out.println("   - Wait + Switch by frame name/ID");
            System.out.println("\n2. frameToBeAvailableAndSwitchToIt(By)");
            System.out.println("   - Wait + Switch by locator");
            System.out.println("\n3. frameToBeAvailableAndSwitchToIt(WebElement)");
            System.out.println("   - Wait + Switch by WebElement");
            System.out.println("\n4. Combine with other waits:");
            System.out.println("   - presenceOfElementLocated");
            System.out.println("   - visibilityOfElementLocated");
            System.out.println("   - elementToBeClickable");
            System.out.println("=====================================");
            System.out.println("\nWHY USE WAITS WITH FRAMES:");
            System.out.println("  ✅ Frames may load after main page");
            System.out.println("  ✅ Dynamic content in frames");
            System.out.println("  ✅ Prevents NoSuchFrameException");
            System.out.println("  ✅ Makes tests more stable");
            System.out.println("  ✅ Handles slow networks gracefully");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== FRAME HANDLING WITH EXPLICIT WAITS =====

Scenario: Waiting for frames to load before switching

--- SCENARIO 1: Wait for Frame to Load ---

✅ Page loading started...
⏳ Waiting for iframe to be available...
✅ Frame is available and switched!
   Original text: Your content goes here.
   New text: Text entered after waiting for frame!
✅ Switched back to main page

--- SCENARIO 2: Wait for Frame Using Locator ---

⏳ Waiting for iframe element with ID: mce_0_ifr
✅ Iframe element found!
✅ Switched to iframe using WebElement
   Text entered: Switched using WebElement after wait!
✅ Switched back to main page

--- SCENARIO 3: Wait for Element Inside Frame ---

✅ Switched to iframe
⏳ Waiting for editor element to be clickable...
✅ Editor element is clickable!
   Text entered: Waited for element inside frame to be clickable!
✅ Switched back to main page

--- SCENARIO 4: Multiple Frames with Waits ---

✅ Navigated to nested frames page
⏳ Waiting for parent frame (frame-top)...
✅ Switched to frame-top
⏳ Waiting for nested frame (frame-middle)...
✅ Switched to frame-middle
   Text in frame-middle: MIDDLE
✅ Returned to main page

--- SCENARIO 5: Handling Frame Load Failures ---

⏳ Trying to wait for non-existent frame...
❌ TimeoutException (Expected): Frame not found within timeout
   Error type: TimeoutException
   Handling: Log error and continue with test
✅ Error handled gracefully!

--- BEST PRACTICES ---

1. Always use waits before switching to frames
   ✅ Frame loaded and switched

2. Use explicit waits for elements inside frames
   ✅ Element inside frame is visible

3. Always switch back to default content
   ✅ Switched back to main page

4. Use appropriate timeout values
   • Standard: 10 seconds
   • Slow-loading frames: 20-30 seconds
   • Quick checks: 3-5 seconds

=====================================
WAIT CONDITIONS FOR FRAMES:
=====================================
1. frameToBeAvailableAndSwitchToIt(String)
   - Wait + Switch by frame name/ID

2. frameToBeAvailableAndSwitchToIt(By)
   - Wait + Switch by locator

3. frameToBeAvailableAndSwitchToIt(WebElement)
   - Wait + Switch by WebElement

4. Combine with other waits:
   - presenceOfElementLocated
   - visibilityOfElementLocated
   - elementToBeClickable
=====================================

WHY USE WAITS WITH FRAMES:
  ✅ Frames may load after main page
  ✅ Dynamic content in frames
  ✅ Prevents NoSuchFrameException
  ✅ Makes tests more stable
  ✅ Handles slow networks gracefully
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Page loads with iframe
2. Selenium waits for iframe to be ready before switching
3. Text is typed multiple times with different wait strategies
4. Navigates to nested frames page
5. Demonstrates error handling for non-existent frame
6. Browser closes

**✅ Success Criteria:**
- All wait conditions work correctly
- Frame switching succeeds after waits
- Text is entered in editor each time
- Nested frame waits work correctly
- TimeoutException is caught and handled
- Best practices are demonstrated

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| TimeoutException | Frame didn't load within timeout | Increase wait time or check frame identifier |
| NoSuchFrameException | Switched before frame was ready | Use frameToBeAvailableAndSwitchToIt |
| StaleElementReferenceException | Frame reloaded during interaction | Re-find element after wait |
| InvalidSelectorException | Wrong By locator for frame | Verify frame locator strategy |

**💡 Key Concepts:**

**1. Frame Wait Methods:**

```java
// Method 1: By name or ID (String)
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frameId"));

// Method 2: By locator (By)
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("frameId")));

// Method 3: By WebElement
WebElement frame = driver.findElement(By.id("frameId"));
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frame));
```

**2. Complete Wait Pattern:**

```java
// Step 1: Wait for frame
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frameId"));

// Step 2: Wait for element inside frame
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("elementId"))
);

// Step 3: Interact
element.sendKeys("text");

// Step 4: Switch back
driver.switchTo().defaultContent();
```

**3. Custom Timeout for Frames:**

```java
// Different timeouts for different scenarios
WebDriverWait quickWait = new WebDriverWait(driver, Duration.ofSeconds(5));
WebDriverWait standardWait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebDriverWait slowWait = new WebDriverWait(driver, Duration.ofSeconds(30));

// Use appropriate wait
slowWait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("slow-loading-frame"));
```

**🎯 Practice Challenge:**

1. Create a method that waits for frame and returns boolean (found/not found)
2. Implement retry logic for frame switching (try 3 times with increasing timeouts)
3. Create a method that waits for nested frame with custom timeout
4. Add logging to show how long each frame took to load
5. Implement fluent wait for frames with polling interval

---

## Day 28: Window Handling

---

### Exercise 1: Understanding Windows vs Tabs (20 minutes)

**What you'll learn:** The difference between browser windows and tabs, and how Selenium treats them

**Practice Website:** https://the-internet.herokuapp.com/windows

**Concept Explanation:**

**What are Windows and Tabs?**
- In Selenium, both browser windows and browser tabs are called "windows"
- Each window/tab has a unique identifier called "window handle"
- Window handle is a string (looks like: CDwindow-ABCD1234...)
- You must switch to a window before interacting with its content

**Why Window Handling is Important:**
- Clicking links that open in new tabs
- Handling popups and alerts
- Multi-window applications
- Payment gateways, social logins that open new windows

**Create new package: `com.automation.windows`**
**Create new class: `WindowBasics`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.Set;

public class WindowBasics {
    public static void main(String[] args) {
        System.out.println("===== UNDERSTANDING WINDOWS & TABS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // STEP 1: Open main page and get window handle
            // ========================================
            driver.get("https://the-internet.herokuapp.com/windows");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(1500);

            // Get the window handle of the main window
            String mainWindowHandle = driver.getWindowHandle();
            System.out.println("\n--- STEP 1: Main Window Handle ---");
            System.out.println("Main window handle: " + mainWindowHandle);
            System.out.println("Window handle type: " + mainWindowHandle.getClass().getSimpleName());
            System.out.println("Window handle length: " + mainWindowHandle.length() + " characters");

            // Check current window count
            Set<String> allHandles = driver.getWindowHandles();
            System.out.println("\nCurrent number of windows: " + allHandles.size());
            System.out.println("Current window title: " + driver.getTitle());

            // ========================================
            // STEP 2: Click link that opens new window
            // ========================================
            System.out.println("\n--- STEP 2: Opening New Window ---");

            // Click "Click Here" link - this opens a new window
            driver.findElement(By.linkText("Click Here")).click();
            System.out.println("✅ Clicked 'Click Here' link");
            Thread.sleep(2000);

            // Get all window handles after clicking
            Set<String> allWindowHandles = driver.getWindowHandles();
            System.out.println("\nTotal windows after click: " + allWindowHandles.size());

            // Print all window handles
            int count = 1;
            for (String handle : allWindowHandles) {
                System.out.println("Window " + count + " handle: " + handle);
                count++;
            }

            // ========================================
            // STEP 3: Try to access new window WITHOUT switching
            // ========================================
            System.out.println("\n--- STEP 3: Current Window Context ---");
            System.out.println("Current window title: " + driver.getTitle());
            System.out.println("Expected: We're still on MAIN window");

            // Verify we're still on main window
            if (driver.getTitle().equals("The Internet")) {
                System.out.println("✅ Confirmed: Still on main window");
                System.out.println("   Note: New window opened but Selenium didn't switch!");
            }

            // ========================================
            // STEP 4: Switch to new window
            // ========================================
            System.out.println("\n--- STEP 4: Switching to New Window ---");

            // Find the new window handle
            String newWindowHandle = "";
            for (String handle : allWindowHandles) {
                if (!handle.equals(mainWindowHandle)) {
                    newWindowHandle = handle;
                    break;
                }
            }

            System.out.println("New window handle: " + newWindowHandle);

            // Switch to new window
            driver.switchTo().window(newWindowHandle);
            System.out.println("✅ Switched to new window");

            // Verify we're on new window
            System.out.println("\nCurrent window title: " + driver.getTitle());
            System.out.println("Page heading: " + driver.findElement(By.tagName("h3")).getText());

            Thread.sleep(2000);

            // ========================================
            // STEP 5: Switch back to main window
            // ========================================
            System.out.println("\n--- STEP 5: Switching Back to Main Window ---");

            driver.switchTo().window(mainWindowHandle);
            System.out.println("✅ Switched back to main window");
            System.out.println("Current window title: " + driver.getTitle());
            System.out.println("Page heading: " + driver.findElement(By.tagName("h3")).getText());

            Thread.sleep(1500);

            // ========================================
            // STEP 6: Close new window and verify
            // ========================================
            System.out.println("\n--- STEP 6: Closing New Window ---");

            // Switch to new window
            driver.switchTo().window(newWindowHandle);
            System.out.println("Current window before close: " + driver.getTitle());

            // Close current window
            driver.close();
            System.out.println("✅ New window closed using driver.close()");

            // Check window count
            Set<String> remainingHandles = driver.getWindowHandles();
            System.out.println("Remaining windows: " + remainingHandles.size());

            // Switch back to main window (required after close)
            driver.switchTo().window(mainWindowHandle);
            System.out.println("✅ Switched back to main window");
            System.out.println("Current window: " + driver.getTitle());

            // ========================================
            // KEY LEARNINGS
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("KEY LEARNINGS:");
            System.out.println("=====================================");
            System.out.println("1. Window Handle:");
            System.out.println("   - Unique ID for each window/tab");
            System.out.println("   - String type (e.g., CDwindow-1234)");
            System.out.println("   - Get using: getWindowHandle()");
            System.out.println("\n2. Multiple Windows:");
            System.out.println("   - Get all: getWindowHandles()");
            System.out.println("   - Returns Set<String>");
            System.out.println("   - Must switch to interact");
            System.out.println("\n3. Methods:");
            System.out.println("   - driver.close()  → Close current window");
            System.out.println("   - driver.quit()   → Close all windows");
            System.out.println("   - switchTo().window(handle) → Switch window");
            System.out.println("\n4. Important:");
            System.out.println("   - Opening new window ≠ Automatic switch");
            System.out.println("   - Must manually switch using switchTo()");
            System.out.println("   - After close(), switch to valid window");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ All windows closed (driver.quit())");
        }
    }
}
```

**Expected Output:**
```
===== UNDERSTANDING WINDOWS & TABS =====

✅ Opened: The Internet

--- STEP 1: Main Window Handle ---
Main window handle: CDwindow-A1B2C3D4E5F6G7H8
Window handle type: String
Window handle length: 32 characters

Current number of windows: 1
Current window title: The Internet

--- STEP 2: Opening New Window ---
✅ Clicked 'Click Here' link

Total windows after click: 2
Window 1 handle: CDwindow-A1B2C3D4E5F6G7H8
Window 2 handle: CDwindow-I9J0K1L2M3N4O5P6

--- STEP 3: Current Window Context ---
Current window title: The Internet
Expected: We're still on MAIN window
✅ Confirmed: Still on main window
   Note: New window opened but Selenium didn't switch!

--- STEP 4: Switching to New Window ---
New window handle: CDwindow-I9J0K1L2M3N4O5P6
✅ Switched to new window

Current window title: New Window
Page heading: New Window

--- STEP 5: Switching Back to Main Window ---
✅ Switched back to main window
Current window title: The Internet
Page heading: Opening a new window

--- STEP 6: Closing New Window ---
Current window before close: New Window
✅ New window closed using driver.close()
Remaining windows: 1
✅ Switched back to main window
Current window: The Internet

=====================================
KEY LEARNINGS:
=====================================
1. Window Handle:
   - Unique ID for each window/tab
   - String type (e.g., CDwindow-1234)
   - Get using: getWindowHandle()

2. Multiple Windows:
   - Get all: getWindowHandles()
   - Returns Set<String>
   - Must switch to interact

3. Methods:
   - driver.close()  → Close current window
   - driver.quit()   → Close all windows
   - switchTo().window(handle) → Switch window

4. Important:
   - Opening new window ≠ Automatic switch
   - Must manually switch using switchTo()
   - After close(), switch to valid window
=====================================

✅ All windows closed (driver.quit())
```

**What Happens in Browser:**
1. Main window opens showing "Opening a new window" page
2. After clicking "Click Here", a new window/tab opens
3. New window shows "New Window" heading
4. Selenium switches between windows (you may see tab switching)
5. New window closes, main window remains
6. All windows close at the end

**✅ Success Criteria:**
- Main window handle is captured successfully
- New window opens after click
- Total windows count increases to 2
- Current window remains main window after opening new window
- Successfully switch to new window
- New window title is "New Window"
- Successfully switch back to main window
- New window closes successfully
- Remaining window count is 1

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchWindowException | Invalid window handle | Verify handle exists in getWindowHandles() |
| "no such window: target window already closed" | Trying to switch to closed window | Check window is open before switching |
| StaleElementReferenceException | Switched windows after finding element | Re-find element after switching |
| NoSuchElementException | Looking for element in wrong window | Verify current window context |

**💡 Key Concepts:**

**1. Window Handle Methods:**

```java
// Get current window handle (single String)
String mainHandle = driver.getWindowHandle();

// Get all window handles (Set<String>)
Set<String> allHandles = driver.getWindowHandles();

// Count windows
int windowCount = driver.getWindowHandles().size();
```

**2. Switching Windows:**

```java
// Store main window handle
String mainWindow = driver.getWindowHandle();

// After new window opens, get all handles
Set<String> allWindows = driver.getWindowHandles();

// Find new window handle
for (String handle : allWindows) {
    if (!handle.equals(mainWindow)) {
        // Switch to new window
        driver.switchTo().window(handle);
        break;
    }
}
```

**3. Close vs Quit:**

```java
// driver.close() - Closes CURRENT window only
driver.close();  // Other windows remain open

// driver.quit() - Closes ALL windows and ends session
driver.quit();   // Entire browser closes
```

**🎯 Practice Challenge:**

1. Open 3 windows and switch between them
2. Print titles of all open windows
3. Close all windows except main window
4. Verify window count after each operation

---

### Exercise 2: Handling Multiple Windows (25 minutes)

**What you'll learn:** Advanced techniques for switching between multiple windows

**Create new class: `MultipleWindows`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class MultipleWindows {
    public static void main(String[] args) {
        System.out.println("===== HANDLING MULTIPLE WINDOWS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://the-internet.herokuapp.com/windows");
            System.out.println("✅ Main page loaded\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 1: Using Set to iterate
            // ========================================
            System.out.println("--- METHOD 1: Using Set<String> ---\n");

            // Store main window
            String mainWindow = driver.getWindowHandle();
            System.out.println("Main window stored: " + mainWindow.substring(0, 15) + "...");

            // Open new window
            driver.findElement(By.linkText("Click Here")).click();
            System.out.println("✅ New window opened");
            Thread.sleep(1500);

            // Get all windows
            Set<String> allWindows = driver.getWindowHandles();
            System.out.println("Total windows: " + allWindows.size());

            // Iterate through all windows
            System.out.println("\nIterating through all windows:");
            int counter = 1;
            for (String windowHandle : allWindows) {
                driver.switchTo().window(windowHandle);
                String title = driver.getTitle();
                System.out.println("  Window " + counter + ": " + title);
                counter++;
            }

            // Close new window
            for (String handle : allWindows) {
                if (!handle.equals(mainWindow)) {
                    driver.switchTo().window(handle);
                    driver.close();
                    System.out.println("\n✅ New window closed");
                }
            }

            driver.switchTo().window(mainWindow);
            System.out.println("✅ Back to main window\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 2: Using List (Index-based)
            // ========================================
            System.out.println("--- METHOD 2: Using ArrayList (Index-based) ---\n");

            // Open new window again
            driver.findElement(By.linkText("Click Here")).click();
            System.out.println("✅ New window opened");
            Thread.sleep(1500);

            // Convert Set to List for index-based access
            List<String> windowList = new ArrayList<>(driver.getWindowHandles());
            System.out.println("Total windows: " + windowList.size());

            System.out.println("\nAccessing windows by index:");
            System.out.println("  Window 0 (Main): " + windowList.get(0).substring(0, 15) + "...");
            System.out.println("  Window 1 (New): " + windowList.get(1).substring(0, 15) + "...");

            // Switch to window by index
            driver.switchTo().window(windowList.get(1));
            System.out.println("\n✅ Switched to window at index 1");
            System.out.println("   Title: " + driver.getTitle());

            // Switch to window by index 0
            driver.switchTo().window(windowList.get(0));
            System.out.println("✅ Switched to window at index 0");
            System.out.println("   Title: " + driver.getTitle());

            // Close window at index 1
            driver.switchTo().window(windowList.get(1));
            driver.close();
            System.out.println("\n✅ Closed window at index 1\n");

            driver.switchTo().window(windowList.get(0));
            Thread.sleep(1500);

            // ========================================
            // METHOD 3: Using Window Title
            // ========================================
            System.out.println("--- METHOD 3: Switch by Window Title ---\n");

            // Open new window
            driver.findElement(By.linkText("Click Here")).click();
            System.out.println("✅ New window opened");
            Thread.sleep(1500);

            // Switch by title
            Set<String> handles = driver.getWindowHandles();
            for (String handle : handles) {
                driver.switchTo().window(handle);
                if (driver.getTitle().equals("New Window")) {
                    System.out.println("✅ Found and switched to window with title: 'New Window'");
                    break;
                }
            }

            System.out.println("   Current window: " + driver.getTitle());

            // Close and switch back
            driver.close();
            driver.switchTo().window(mainWindow);
            System.out.println("✅ Closed new window and returned to main\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 4: Switch to Last Opened Window
            // ========================================
            System.out.println("--- METHOD 4: Switch to Last Opened Window ---\n");

            String currentWindow = driver.getWindowHandle();
            System.out.println("Before opening: " + driver.getWindowHandles().size() + " window(s)");

            // Open new window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            System.out.println("After opening: " + driver.getWindowHandles().size() + " window(s)");

            // Get all windows and find the newest one
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(currentWindow)) {
                    driver.switchTo().window(handle);
                    System.out.println("✅ Switched to last opened window");
                    System.out.println("   Title: " + driver.getTitle());
                }
            }

            driver.close();
            driver.switchTo().window(currentWindow);
            System.out.println("✅ Closed and returned to main\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 5: Opening Multiple Windows
            // ========================================
            System.out.println("--- METHOD 5: Multiple Windows Scenario ---\n");

            System.out.println("Opening 3 new windows...");

            // Open first new window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1000);

            // Go back to main window and open second new window
            driver.switchTo().window(mainWindow);
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1000);

            // Go back to main window and open third new window
            driver.switchTo().window(mainWindow);
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1000);

            // Get all windows
            List<String> allWindowsList = new ArrayList<>(driver.getWindowHandles());
            System.out.println("\n✅ Total windows now: " + allWindowsList.size());

            // Print all window titles
            System.out.println("\nAll window titles:");
            for (int i = 0; i < allWindowsList.size(); i++) {
                driver.switchTo().window(allWindowsList.get(i));
                System.out.println("  " + (i + 1) + ". " + driver.getTitle());
            }

            // Close all except main window
            System.out.println("\nClosing all except main window...");
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(mainWindow)) {
                    driver.switchTo().window(handle);
                    driver.close();
                }
            }

            driver.switchTo().window(mainWindow);
            System.out.println("✅ All new windows closed");
            System.out.println("   Remaining windows: " + driver.getWindowHandles().size());

            // ========================================
            // COMPARISON TABLE
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("WINDOW SWITCHING METHODS COMPARISON:");
            System.out.println("=====================================");
            System.out.println("Method                    | Pros                      | Cons");
            System.out.println("--------------------------|---------------------------|---------------------------");
            System.out.println("Set iteration             | Simple, reliable          | No index access");
            System.out.println("ArrayList (index)         | Direct access by position | Order may vary");
            System.out.println("By title                  | Semantic, readable        | Title must be unique");
            System.out.println("Last opened               | Gets newest window        | Assumes one new window");
            System.out.println("=====================================");
            System.out.println("\nBEST PRACTICES:");
            System.out.println("  ✅ Store main window handle at start");
            System.out.println("  ✅ Use meaningful variable names");
            System.out.println("  ✅ Always close windows you opened");
            System.out.println("  ✅ Switch back to valid window after close");
            System.out.println("  ✅ Use List for index-based access");
            System.out.println("  ✅ Use title matching for specific windows");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== HANDLING MULTIPLE WINDOWS =====

✅ Main page loaded

--- METHOD 1: Using Set<String> ---

Main window stored: CDwindow-A1B2C3...
✅ New window opened
Total windows: 2

Iterating through all windows:
  Window 1: The Internet
  Window 2: New Window

✅ New window closed
✅ Back to main window

--- METHOD 2: Using ArrayList (Index-based) ---

✅ New window opened
Total windows: 2

Accessing windows by index:
  Window 0 (Main): CDwindow-A1B2C3...
  Window 1 (New): CDwindow-I9J0K1...

✅ Switched to window at index 1
   Title: New Window
✅ Switched to window at index 0
   Title: The Internet

✅ Closed window at index 1

--- METHOD 3: Switch by Window Title ---

✅ New window opened
✅ Found and switched to window with title: 'New Window'
   Current window: New Window
✅ Closed new window and returned to main

--- METHOD 4: Switch to Last Opened Window ---

Before opening: 1 window(s)
After opening: 2 window(s)
✅ Switched to last opened window
   Title: New Window
✅ Closed and returned to main

--- METHOD 5: Multiple Windows Scenario ---

Opening 3 new windows...

✅ Total windows now: 4

All window titles:
  1. The Internet
  2. New Window
  3. New Window
  4. New Window

Closing all except main window...
✅ All new windows closed
   Remaining windows: 1

=====================================
WINDOW SWITCHING METHODS COMPARISON:
=====================================
Method                    | Pros                      | Cons
--------------------------|---------------------------|---------------------------
Set iteration             | Simple, reliable          | No index access
ArrayList (index)         | Direct access by position | Order may vary
By title                  | Semantic, readable        | Title must be unique
Last opened               | Gets newest window        | Assumes one new window
=====================================

BEST PRACTICES:
  ✅ Store main window handle at start
  ✅ Use meaningful variable names
  ✅ Always close windows you opened
  ✅ Switch back to valid window after close
  ✅ Use List for index-based access
  ✅ Use title matching for specific windows
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Main window opens
2. Multiple new windows/tabs open one by one
3. You see window/tab switching happening
4. New windows close one by one
5. Finally only main window remains
6. All windows close

**✅ Success Criteria:**
- All 5 methods work successfully
- Windows are opened and closed correctly
- Switching between windows succeeds
- Multiple windows scenario handles 4 windows correctly
- All new windows are closed, leaving only main window
- Comparison table displays correctly

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchWindowException | Window already closed | Check window exists before switching |
| IndexOutOfBoundsException | Invalid list index | Verify list size before accessing index |
| ConcurrentModificationException | Modifying Set while iterating | Use iterator or copy to List first |
| "target window already closed" | Switching to closed window | Keep track of which windows are open |

**💡 Key Concepts:**

**1. Set vs List for Window Handles:**

```java
// Set - No index access, iteration only
Set<String> windowSet = driver.getWindowHandles();
for (String handle : windowSet) {
    // Iterate
}

// List - Index-based access
List<String> windowList = new ArrayList<>(driver.getWindowHandles());
String firstWindow = windowList.get(0);    // Main window (usually)
String secondWindow = windowList.get(1);   // New window (usually)
```

**2. Finding Specific Window:**

```java
// By title
for (String handle : driver.getWindowHandles()) {
    driver.switchTo().window(handle);
    if (driver.getTitle().equals("Expected Title")) {
        // Found it!
        break;
    }
}

// By URL
for (String handle : driver.getWindowHandles()) {
    driver.switchTo().window(handle);
    if (driver.getCurrentUrl().contains("expected-url")) {
        // Found it!
        break;
    }
}
```

**3. Closing Multiple Windows:**

```java
// Close all except main
String mainWindow = driver.getWindowHandle();

for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);
        driver.close();
    }
}

// Must switch back to valid window
driver.switchTo().window(mainWindow);
```

**🎯 Practice Challenge:**

1. Create a method that returns window handle by title
2. Create a method that closes all windows except a specified one
3. Open 5 windows and switch to the middle one (index 2)
4. Print URLs of all open windows
5. Create a method that switches to window containing specific text in URL

---

### Exercise 3: Window Switching with getWindowHandles() (25 minutes)

**What you'll learn:** Advanced window handle manipulation and switching strategies

**Create new class: `WindowHandlesAdvanced`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class WindowHandlesAdvanced {

    // Helper method: Switch to window by title
    private static boolean switchToWindowByTitle(WebDriver driver, String expectedTitle) {
        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
            if (driver.getTitle().equals(expectedTitle)) {
                return true;
            }
        }
        return false;
    }

    // Helper method: Print all window information
    private static void printAllWindows(WebDriver driver) {
        String currentHandle = driver.getWindowHandle();
        System.out.println("\n📋 Current Windows:");
        int count = 1;
        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
            String marker = handle.equals(currentHandle) ? " [CURRENT]" : "";
            System.out.println("  " + count + ". " + driver.getTitle() + marker);
            System.out.println("     URL: " + driver.getCurrentUrl());
            System.out.println("     Handle: " + handle.substring(0, 20) + "...");
            count++;
        }
        driver.switchTo().window(currentHandle);
    }

    // Helper method: Close all except main window
    private static void closeAllExceptMain(WebDriver driver, String mainWindowHandle) {
        for (String handle : driver.getWindowHandles()) {
            if (!handle.equals(mainWindowHandle)) {
                driver.switchTo().window(handle);
                driver.close();
            }
        }
        driver.switchTo().window(mainWindowHandle);
    }

    public static void main(String[] args) {
        System.out.println("===== ADVANCED WINDOW HANDLES OPERATIONS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // SCENARIO 1: Iterator Pattern
            // ========================================
            System.out.println("--- SCENARIO 1: Using Iterator Pattern ---\n");

            driver.get("https://the-internet.herokuapp.com/windows");
            String mainWindow = driver.getWindowHandle();
            System.out.println("✅ Main window: " + driver.getTitle());

            // Open new window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            System.out.println("\nUsing Iterator to switch windows:");
            Set<String> handles = driver.getWindowHandles();
            Iterator<String> iterator = handles.iterator();

            while (iterator.hasNext()) {
                String handle = iterator.next();
                driver.switchTo().window(handle);
                System.out.println("  Switched to: " + driver.getTitle());
            }

            // Clean up
            closeAllExceptMain(driver, mainWindow);
            System.out.println("\n✅ Cleaned up windows\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 2: Stream API (Modern Java)
            // ========================================
            System.out.println("--- SCENARIO 2: Using Stream API (Java 8+) ---\n");

            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            System.out.println("Finding window with title 'New Window' using Stream:");

            // Using Stream to find window by title
            driver.getWindowHandles().stream()
                .filter(handle -> {
                    driver.switchTo().window(handle);
                    return driver.getTitle().equals("New Window");
                })
                .findFirst()
                .ifPresent(handle -> {
                    System.out.println("✅ Found window: " + driver.getTitle());
                });

            // Clean up
            closeAllExceptMain(driver, mainWindow);
            System.out.println("✅ Cleaned up windows\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 3: Multiple Windows with Data Extraction
            // ========================================
            System.out.println("--- SCENARIO 3: Data Extraction from Multiple Windows ---\n");

            System.out.println("Opening 3 new windows...");
            for (int i = 0; i < 3; i++) {
                driver.switchTo().window(mainWindow);
                driver.findElement(By.linkText("Click Here")).click();
                Thread.sleep(800);
            }

            // Collect data from all windows
            List<String> windowTitles = new ArrayList<>();
            List<String> windowUrls = new ArrayList<>();

            for (String handle : driver.getWindowHandles()) {
                driver.switchTo().window(handle);
                windowTitles.add(driver.getTitle());
                windowUrls.add(driver.getCurrentUrl());
            }

            System.out.println("\n✅ Data collected from " + windowTitles.size() + " windows");
            System.out.println("\nWindow Data:");
            for (int i = 0; i < windowTitles.size(); i++) {
                System.out.println("  Window " + (i + 1) + ":");
                System.out.println("    Title: " + windowTitles.get(i));
                System.out.println("    URL: " + windowUrls.get(i));
            }

            // Clean up
            closeAllExceptMain(driver, mainWindow);
            System.out.println("\n✅ Cleaned up windows\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 4: Finding New Window (Smart Method)
            // ========================================
            System.out.println("--- SCENARIO 4: Smart New Window Detection ---\n");

            // Store current window handles
            Set<String> oldHandles = driver.getWindowHandles();
            System.out.println("Windows before click: " + oldHandles.size());

            // Perform action that opens new window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            // Get new window handles
            Set<String> newHandles = driver.getWindowHandles();
            System.out.println("Windows after click: " + newHandles.size());

            // Find the new window handle
            newHandles.removeAll(oldHandles);
            String newWindowHandle = newHandles.iterator().next();

            System.out.println("\n✅ New window detected!");
            driver.switchTo().window(newWindowHandle);
            System.out.println("   Title: " + driver.getTitle());
            System.out.println("   URL: " + driver.getCurrentUrl());

            // Clean up
            closeAllExceptMain(driver, mainWindow);
            System.out.println("\n✅ Cleaned up windows\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 5: Helper Methods in Action
            // ========================================
            System.out.println("--- SCENARIO 5: Using Helper Methods ---\n");

            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            System.out.println("Method 1: Switch by title");
            boolean switched = switchToWindowByTitle(driver, "New Window");
            if (switched) {
                System.out.println("✅ Successfully switched to: " + driver.getTitle());
            }

            driver.switchTo().window(mainWindow);
            System.out.println("\nMethod 2: Print all windows");
            printAllWindows(driver);

            System.out.println("\nMethod 3: Close all except main");
            closeAllExceptMain(driver, mainWindow);
            System.out.println("✅ All windows closed except main");
            System.out.println("   Remaining windows: " + driver.getWindowHandles().size());

            Thread.sleep(1500);

            // ========================================
            // SCENARIO 6: Real-World Pattern
            // ========================================
            System.out.println("\n--- SCENARIO 6: Real-World Multi-Window Pattern ---\n");
            System.out.println("Simulating: Login in popup, then return to main page\n");

            // Step 1: Store main window
            String parentWindow = driver.getWindowHandle();
            System.out.println("Step 1: Main window stored");

            // Step 2: Click to open popup
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);
            System.out.println("Step 2: Popup opened");

            // Step 3: Switch to popup
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(parentWindow)) {
                    driver.switchTo().window(handle);
                    System.out.println("Step 3: Switched to popup");
                    break;
                }
            }

            // Step 4: Perform action in popup
            String popupHeading = driver.findElement(By.tagName("h3")).getText();
            System.out.println("Step 4: Action in popup - Read heading: '" + popupHeading + "'");

            // Step 5: Close popup
            driver.close();
            System.out.println("Step 5: Popup closed");

            // Step 6: Return to main window
            driver.switchTo().window(parentWindow);
            System.out.println("Step 6: Returned to main window");
            System.out.println("        Main window title: " + driver.getTitle());

            System.out.println("\n✅ Multi-window workflow completed!");

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("WINDOW HANDLE PATTERNS:");
            System.out.println("=====================================");
            System.out.println("\n1. ITERATOR PATTERN:");
            System.out.println("   Iterator<String> it = handles.iterator();");
            System.out.println("   while (it.hasNext()) { ... }");
            System.out.println("\n2. ENHANCED FOR LOOP:");
            System.out.println("   for (String handle : handles) { ... }");
            System.out.println("\n3. STREAM API (Java 8+):");
            System.out.println("   handles.stream().filter(...).findFirst()");
            System.out.println("\n4. SET OPERATIONS:");
            System.out.println("   newHandles.removeAll(oldHandles)");
            System.out.println("\n5. HELPER METHODS:");
            System.out.println("   Custom methods for reusable logic");
            System.out.println("=====================================");
            System.out.println("\nCOMMON PATTERNS:");
            System.out.println("  1. Store main window handle at start");
            System.out.println("  2. Detect new window by Set difference");
            System.out.println("  3. Switch by title/URL for specific windows");
            System.out.println("  4. Always close popups when done");
            System.out.println("  5. Always switch back to valid window");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== ADVANCED WINDOW HANDLES OPERATIONS =====

--- SCENARIO 1: Using Iterator Pattern ---

✅ Main window: The Internet

Using Iterator to switch windows:
  Switched to: The Internet
  Switched to: New Window

✅ Cleaned up windows

--- SCENARIO 2: Using Stream API (Java 8+) ---

Finding window with title 'New Window' using Stream:
✅ Found window: New Window
✅ Cleaned up windows

--- SCENARIO 3: Data Extraction from Multiple Windows ---

Opening 3 new windows...

✅ Data collected from 4 windows

Window Data:
  Window 1:
    Title: The Internet
    URL: https://the-internet.herokuapp.com/windows
  Window 2:
    Title: New Window
    URL: https://the-internet.herokuapp.com/windows/new
  Window 3:
    Title: New Window
    URL: https://the-internet.herokuapp.com/windows/new
  Window 4:
    Title: New Window
    URL: https://the-internet.herokuapp.com/windows/new

✅ Cleaned up windows

--- SCENARIO 4: Smart New Window Detection ---

Windows before click: 1
Windows after click: 2

✅ New window detected!
   Title: New Window
   URL: https://the-internet.herokuapp.com/windows/new

✅ Cleaned up windows

--- SCENARIO 5: Using Helper Methods ---

Method 1: Switch by title
✅ Successfully switched to: New Window

Method 2: Print all windows

📋 Current Windows:
  1. The Internet [CURRENT]
     URL: https://the-internet.herokuapp.com/windows
     Handle: CDwindow-A1B2C3D4E5F6...
  2. New Window
     URL: https://the-internet.herokuapp.com/windows/new
     Handle: CDwindow-G7H8I9J0K1L2...

Method 3: Close all except main
✅ All windows closed except main
   Remaining windows: 1

--- SCENARIO 6: Real-World Multi-Window Pattern ---

Simulating: Login in popup, then return to main page

Step 1: Main window stored
Step 2: Popup opened
Step 3: Switched to popup
Step 4: Action in popup - Read heading: 'New Window'
Step 5: Popup closed
Step 6: Returned to main window
        Main window title: The Internet

✅ Multi-window workflow completed!

=====================================
WINDOW HANDLE PATTERNS:
=====================================

1. ITERATOR PATTERN:
   Iterator<String> it = handles.iterator();
   while (it.hasNext()) { ... }

2. ENHANCED FOR LOOP:
   for (String handle : handles) { ... }

3. STREAM API (Java 8+):
   handles.stream().filter(...).findFirst()

4. SET OPERATIONS:
   newHandles.removeAll(oldHandles)

5. HELPER METHODS:
   Custom methods for reusable logic
=====================================

COMMON PATTERNS:
  1. Store main window handle at start
  2. Detect new window by Set difference
  3. Switch by title/URL for specific windows
  4. Always close popups when done
  5. Always switch back to valid window
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Multiple windows open and close throughout scenarios
2. Window switching happens rapidly
3. Data is collected from multiple windows
4. Final cleanup leaves only main window
5. Browser closes

**✅ Success Criteria:**
- Iterator pattern works correctly
- Stream API finds window by title
- Data extraction collects information from all windows
- Smart detection identifies new window
- Helper methods function properly
- Real-world pattern completes successfully
- All windows except main are closed

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchElementException in stream | Window doesn't exist anymore | Add null checks or try-catch |
| ConcurrentModificationException | Modifying Set during iteration | Use removeAll on a copy of the Set |
| NullPointerException | No new window found | Check Set is not empty before accessing |
| NoSuchWindowException | Window closed during operation | Verify window exists before switching |

**💡 Key Concepts:**

**1. Set Difference for New Window:**

```java
// Before opening window
Set<String> oldHandles = driver.getWindowHandles();

// Open new window
driver.findElement(By.linkText("Click")).click();

// After opening window
Set<String> newHandles = driver.getWindowHandles();

// Find the difference (new window)
newHandles.removeAll(oldHandles);  // newHandles now contains only the new window
String newWindow = newHandles.iterator().next();
```

**2. Helper Methods Pattern:**

```java
// Reusable method to switch by title
public static boolean switchToWindowByTitle(WebDriver driver, String title) {
    for (String handle : driver.getWindowHandles()) {
        driver.switchTo().window(handle);
        if (driver.getTitle().equals(title)) {
            return true;  // Found and switched
        }
    }
    return false;  // Not found
}

// Usage
if (switchToWindowByTitle(driver, "Login Page")) {
    // Perform login
}
```

**3. Stream API (Modern Java):**

```java
// Find window by title using Stream
driver.getWindowHandles().stream()
    .filter(handle -> {
        driver.switchTo().window(handle);
        return driver.getTitle().contains("Search");
    })
    .findFirst()
    .ifPresent(handle -> {
        // Window found and switched
        System.out.println("Found: " + driver.getTitle());
    });
```

**🎯 Practice Challenge:**

1. Create a method that returns all window titles as a List
2. Create a method that finds window by partial URL match
3. Implement a method that switches to window containing specific text
4. Create a method that closes all windows with specific title pattern
5. Build a WindowManager class with all helper methods

---

### Exercise 4: Handling Parent and Child Windows (30 minutes)

**What you'll learn:** Managing parent-child window relationships

**Create new class: `ParentChildWindows`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ParentChildWindows {

    // Helper: Print window relationship
    private static void printWindowRelationship(WebDriver driver, String parent, String child) {
        System.out.println("\n🔗 Window Relationship:");
        driver.switchTo().window(parent);
        System.out.println("   Parent: " + driver.getTitle());
        driver.switchTo().window(child);
        System.out.println("   Child: " + driver.getTitle());
    }

    // Helper: Verify window is still open
    private static boolean isWindowOpen(WebDriver driver, String windowHandle) {
        try {
            driver.switchTo().window(windowHandle);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static void main(String[] args) {
        System.out.println("===== PARENT-CHILD WINDOW MANAGEMENT =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // SCENARIO 1: Basic Parent-Child Concept
            // ========================================
            System.out.println("--- SCENARIO 1: Parent-Child Window Concept ---\n");

            driver.get("https://the-internet.herokuapp.com/windows");
            String parentWindow = driver.getWindowHandle();
            System.out.println("Parent window: " + driver.getTitle());
            System.out.println("Parent handle: " + parentWindow.substring(0, 20) + "...");

            // Open child window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            // Get child window handle
            String childWindow = "";
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(parentWindow)) {
                    childWindow = handle;
                    break;
                }
            }

            System.out.println("\nChild window opened");
            System.out.println("Child handle: " + childWindow.substring(0, 20) + "...");

            // Print relationship
            printWindowRelationship(driver, parentWindow, childWindow);

            // Verify parent-child independence
            System.out.println("\n--- Testing Independence ---");

            // Modify child window
            driver.switchTo().window(childWindow);
            System.out.println("\n✅ In child window");
            System.out.println("   Can interact independently");

            // Parent still accessible
            driver.switchTo().window(parentWindow);
            System.out.println("\n✅ In parent window");
            System.out.println("   Parent unaffected by child operations");

            // Close child
            driver.switchTo().window(childWindow);
            driver.close();
            System.out.println("\n✅ Child window closed");

            driver.switchTo().window(parentWindow);
            System.out.println("✅ Parent window still open: " + driver.getTitle());
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 2: Multiple Child Windows
            // ========================================
            System.out.println("\n--- SCENARIO 2: Multiple Child Windows ---\n");

            String mainParent = driver.getWindowHandle();
            System.out.println("Main parent: " + driver.getTitle());

            // Open 3 child windows
            List<String> childWindows = new ArrayList<>();
            System.out.println("\nOpening 3 child windows...");

            for (int i = 1; i <= 3; i++) {
                driver.switchTo().window(mainParent);
                driver.findElement(By.linkText("Click Here")).click();
                Thread.sleep(800);

                // Get the newly opened child
                for (String handle : driver.getWindowHandles()) {
                    if (!handle.equals(mainParent) && !childWindows.contains(handle)) {
                        childWindows.add(handle);
                        System.out.println("  Child " + i + " opened");
                        break;
                    }
                }
            }

            System.out.println("\n✅ Total child windows: " + childWindows.size());

            // Interact with each child
            System.out.println("\n--- Interacting with Each Child ---");
            for (int i = 0; i < childWindows.size(); i++) {
                driver.switchTo().window(childWindows.get(i));
                String heading = driver.findElement(By.tagName("h3")).getText();
                System.out.println("Child " + (i + 1) + ": " + heading);
            }

            // Close all children, keep parent
            System.out.println("\n--- Closing All Child Windows ---");
            for (String child : childWindows) {
                driver.switchTo().window(child);
                driver.close();
                System.out.println("✅ Closed child window");
            }

            driver.switchTo().window(mainParent);
            System.out.println("\n✅ All children closed, parent remains");
            System.out.println("   Remaining windows: " + driver.getWindowHandles().size());
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 3: Nested Windows (Child opens Child)
            // ========================================
            System.out.println("\n--- SCENARIO 3: Nested Window Scenario ---\n");
            System.out.println("Simulating: Parent → Child → Grandchild\n");

            // Parent window
            String parent = driver.getWindowHandle();
            System.out.println("Level 1: Parent window");
            System.out.println("   Title: " + driver.getTitle());

            // Open child from parent
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            String child = "";
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(parent)) {
                    child = handle;
                    break;
                }
            }

            driver.switchTo().window(child);
            System.out.println("\nLevel 2: Child window (opened from parent)");
            System.out.println("   Title: " + driver.getTitle());

            // Note: The child window doesn't have a link to open another window,
            // but we'll demonstrate the concept
            System.out.println("\nLevel 3: Grandchild (conceptual)");
            System.out.println("   In real scenarios, child can open its own child window");
            System.out.println("   Pattern remains the same: track handles, switch as needed");

            // Cleanup in reverse order (best practice)
            System.out.println("\n--- Cleanup (Reverse Order) ---");
            System.out.println("Closing grandchild → child → keep parent");

            // Close child (would be grandchild in full scenario)
            driver.switchTo().window(child);
            driver.close();
            System.out.println("✅ Child closed");

            driver.switchTo().window(parent);
            System.out.println("✅ Returned to parent");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 4: Parent-Child Communication Pattern
            // ========================================
            System.out.println("\n--- SCENARIO 4: Data Transfer Pattern ---\n");
            System.out.println("Simulating: Get data from child, use in parent\n");

            String parentHandle = driver.getWindowHandle();
            String parentTitle = driver.getTitle();

            // Open child
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            // Switch to child and extract data
            String childHandle = "";
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(parentHandle)) {
                    childHandle = handle;
                    break;
                }
            }

            driver.switchTo().window(childHandle);
            String dataFromChild = driver.findElement(By.tagName("h3")).getText();
            System.out.println("Step 1: Extracted from child - '" + dataFromChild + "'");

            // Close child
            driver.close();
            System.out.println("Step 2: Child closed");

            // Return to parent and use data
            driver.switchTo().window(parentHandle);
            System.out.println("Step 3: Returned to parent");
            System.out.println("Step 4: Using data from child: '" + dataFromChild + "'");
            System.out.println("        (In real scenario: fill form, display message, etc.)");

            System.out.println("\n✅ Parent-child communication completed!");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 5: Error Handling
            // ========================================
            System.out.println("\n--- SCENARIO 5: Error Handling ---\n");

            // Open child window
            String currentParent = driver.getWindowHandle();
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            String currentChild = "";
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(currentParent)) {
                    currentChild = handle;
                    break;
                }
            }

            System.out.println("Child window opened");

            // Close child
            driver.switchTo().window(currentChild);
            driver.close();
            System.out.println("Child window closed");

            // Try to switch to closed window
            System.out.println("\nTrying to switch to closed child window...");
            boolean childStillOpen = isWindowOpen(driver, currentChild);

            if (childStillOpen) {
                System.out.println("❌ This shouldn't print - window is closed!");
            } else {
                System.out.println("✅ Correctly detected: Child window is closed");
                System.out.println("   Prevented NoSuchWindowException");
            }

            // Always ensure we're on a valid window
            driver.switchTo().window(currentParent);
            System.out.println("✅ Safely switched to parent window");

            // ========================================
            // BEST PRACTICES SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("PARENT-CHILD WINDOW BEST PRACTICES:");
            System.out.println("=====================================");
            System.out.println("\n1. TRACKING:");
            System.out.println("   • Always store parent handle before opening child");
            System.out.println("   • Use meaningful variable names (parent, child)");
            System.out.println("   • Track multiple children in List/Array");
            System.out.println("\n2. SWITCHING:");
            System.out.println("   • Verify window exists before switching");
            System.out.println("   • Use helper methods for switching logic");
            System.out.println("   • Always know which window you're currently in");
            System.out.println("\n3. CLEANUP:");
            System.out.println("   • Close child windows before parent");
            System.out.println("   • Always switch back to valid window after close");
            System.out.println("   • Use try-finally to ensure cleanup");
            System.out.println("\n4. ERROR HANDLING:");
            System.out.println("   • Check if window is open before switching");
            System.out.println("   • Catch NoSuchWindowException gracefully");
            System.out.println("   • Have a fallback window to switch to");
            System.out.println("\n5. DATA FLOW:");
            System.out.println("   • Extract data from child before closing");
            System.out.println("   • Store data in variables for parent use");
            System.out.println("   • Close child only after data extraction");
            System.out.println("=====================================");
            System.out.println("\nREAL-WORLD EXAMPLES:");
            System.out.println("  • Payment gateways (child for payment)");
            System.out.println("  • Social login (OAuth popup)");
            System.out.println("  • Help/Documentation popup");
            System.out.println("  • Terms & Conditions popup");
            System.out.println("  • Product image gallery popup");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== PARENT-CHILD WINDOW MANAGEMENT =====

--- SCENARIO 1: Parent-Child Window Concept ---

Parent window: The Internet
Parent handle: CDwindow-A1B2C3D4E5F6...

Child window opened
Child handle: CDwindow-G7H8I9J0K1L2...

🔗 Window Relationship:
   Parent: The Internet
   Child: New Window

--- Testing Independence ---

✅ In child window
   Can interact independently

✅ In parent window
   Parent unaffected by child operations

✅ Child window closed
✅ Parent window still open: The Internet

--- SCENARIO 2: Multiple Child Windows ---

Main parent: The Internet

Opening 3 child windows...
  Child 1 opened
  Child 2 opened
  Child 3 opened

✅ Total child windows: 3

--- Interacting with Each Child ---
Child 1: New Window
Child 2: New Window
Child 3: New Window

--- Closing All Child Windows ---
✅ Closed child window
✅ Closed child window
✅ Closed child window

✅ All children closed, parent remains
   Remaining windows: 1

--- SCENARIO 3: Nested Window Scenario ---

Simulating: Parent → Child → Grandchild

Level 1: Parent window
   Title: The Internet

Level 2: Child window (opened from parent)
   Title: New Window

Level 3: Grandchild (conceptual)
   In real scenarios, child can open its own child window
   Pattern remains the same: track handles, switch as needed

--- Cleanup (Reverse Order) ---
Closing grandchild → child → keep parent
✅ Child closed
✅ Returned to parent

--- SCENARIO 4: Data Transfer Pattern ---

Simulating: Get data from child, use in parent

Step 1: Extracted from child - 'New Window'
Step 2: Child closed
Step 3: Returned to parent
Step 4: Using data from child: 'New Window'
        (In real scenario: fill form, display message, etc.)

✅ Parent-child communication completed!

--- SCENARIO 5: Error Handling ---

Child window opened
Child window closed

Trying to switch to closed child window...
✅ Correctly detected: Child window is closed
   Prevented NoSuchWindowException
✅ Safely switched to parent window

=====================================
PARENT-CHILD WINDOW BEST PRACTICES:
=====================================

1. TRACKING:
   • Always store parent handle before opening child
   • Use meaningful variable names (parent, child)
   • Track multiple children in List/Array

2. SWITCHING:
   • Verify window exists before switching
   • Use helper methods for switching logic
   • Always know which window you're currently in

3. CLEANUP:
   • Close child windows before parent
   • Always switch back to valid window after close
   • Use try-finally to ensure cleanup

4. ERROR HANDLING:
   • Check if window is open before switching
   • Catch NoSuchWindowException gracefully
   • Have a fallback window to switch to

5. DATA FLOW:
   • Extract data from child before closing
   • Store data in variables for parent use
   • Close child only after data extraction
=====================================

REAL-WORLD EXAMPLES:
  • Payment gateways (child for payment)
  • Social login (OAuth popup)
  • Help/Documentation popup
  • Terms & Conditions popup
  • Product image gallery popup
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Main window opens
2. Child windows open and close multiple times
3. Multiple children are managed simultaneously
4. Data extraction happens from child window
5. All windows clean up properly
6. Browser closes

**✅ Success Criteria:**
- Parent-child relationship is established
- Multiple child windows are managed correctly
- All children close while parent remains
- Data extraction from child succeeds
- Error handling prevents exceptions
- Best practices are demonstrated

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchWindowException | Switching to closed window | Check isWindowOpen() before switching |
| IndexOutOfBoundsException | Child list index wrong | Verify list size before accessing |
| NullPointerException | Child handle is null | Check if child was found before using |
| "window already closed" | Trying to interact with closed window | Always verify window state |

**💡 Key Concepts:**

**1. Parent-Child Tracking:**

```java
// ALWAYS store parent before opening child
String parent = driver.getWindowHandle();

// Open child
driver.findElement(By.linkText("Open")).click();

// Find child
String child = "";
for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(parent)) {
        child = handle;
        break;
    }
}

// Now you have both handles tracked
```

**2. Multiple Children Management:**

```java
String parent = driver.getWindowHandle();
List<String> children = new ArrayList<>();

// Open and track multiple children
for (int i = 0; i < 3; i++) {
    driver.switchTo().window(parent);
    // Open child
    driver.findElement(By.linkText("Open")).click();

    // Find and store new child
    for (String handle : driver.getWindowHandles()) {
        if (!handle.equals(parent) && !children.contains(handle)) {
            children.add(handle);
            break;
        }
    }
}
```

**3. Safe Cleanup Pattern:**

```java
// Close all children first
for (String child : childrenList) {
    if (isWindowOpen(driver, child)) {
        driver.switchTo().window(child);
        driver.close();
    }
}

// Then work with parent
driver.switchTo().window(parent);
```

**🎯 Practice Challenge:**

1. Create a WindowManager class to track parent and children
2. Implement a method that closes all windows except a specified one
3. Build a method that extracts data from all child windows
4. Create error-safe switching with automatic fallback
5. Implement a counter to track how many children are open

---

### Exercise 5: Real-World Window Handling Scenarios (30 minutes)

**What you'll learn:** Complete practical scenarios combining all window handling techniques

**Create new class: `RealWorldWindowScenarios`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class RealWorldWindowScenarios {

    // Window Manager Class - Reusable Component
    static class WindowManager {
        private WebDriver driver;
        private String mainWindow;
        private List<String> childWindows;

        public WindowManager(WebDriver driver) {
            this.driver = driver;
            this.mainWindow = driver.getWindowHandle();
            this.childWindows = new ArrayList<>();
        }

        public void trackNewWindow() {
            Set<String> allWindows = driver.getWindowHandles();
            for (String window : allWindows) {
                if (!window.equals(mainWindow) && !childWindows.contains(window)) {
                    childWindows.add(window);
                }
            }
        }

        public boolean switchToWindow(String title) {
            for (String handle : driver.getWindowHandles()) {
                driver.switchTo().window(handle);
                if (driver.getTitle().equals(title)) {
                    return true;
                }
            }
            return false;
        }

        public void switchToMain() {
            driver.switchTo().window(mainWindow);
        }

        public void switchToLastChild() {
            if (!childWindows.isEmpty()) {
                String lastChild = childWindows.get(childWindows.size() - 1);
                driver.switchTo().window(lastChild);
            }
        }

        public void closeAllChildren() {
            for (String child : childWindows) {
                try {
                    driver.switchTo().window(child);
                    driver.close();
                } catch (Exception e) {
                    // Window already closed
                }
            }
            childWindows.clear();
            switchToMain();
        }

        public int getChildCount() {
            return childWindows.size();
        }

        public void printWindowStatus() {
            System.out.println("📊 Window Status:");
            System.out.println("   Main: " + mainWindow.substring(0, 15) + "...");
            System.out.println("   Children: " + childWindows.size());
            System.out.println("   Total Open: " + driver.getWindowHandles().size());
        }
    }

    public static void main(String[] args) {
        System.out.println("===== REAL-WORLD WINDOW HANDLING SCENARIOS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // ========================================
            // SCENARIO 1: E-commerce Product Comparison
            // ========================================
            System.out.println("--- SCENARIO 1: Product Comparison ---\n");
            System.out.println("Simulating: Open multiple products in new tabs, compare\n");

            driver.get("https://the-internet.herokuapp.com/windows");
            WindowManager wm = new WindowManager(driver);

            System.out.println("Main catalog page loaded");
            System.out.println("Opening 3 products in new windows...\n");

            // Simulate opening 3 products
            List<String> productTitles = new ArrayList<>();

            for (int i = 1; i <= 3; i++) {
                wm.switchToMain();
                System.out.println("Product " + i + ":");

                // Open product (simulated by clicking "Click Here")
                driver.findElement(By.linkText("Click Here")).click();
                Thread.sleep(1000);

                // Track new window
                wm.trackNewWindow();
                wm.switchToLastChild();

                // Extract product info (simulated)
                String productInfo = driver.getTitle();
                productTitles.add(productInfo);
                System.out.println("  Opened: " + productInfo);
                System.out.println("  URL: " + driver.getCurrentUrl());
            }

            System.out.println("\n✅ Comparison Data Collected:");
            for (int i = 0; i < productTitles.size(); i++) {
                System.out.println("  Product " + (i + 1) + ": " + productTitles.get(i));
            }

            wm.printWindowStatus();

            // Cleanup
            wm.closeAllChildren();
            System.out.println("\n✅ All product windows closed\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 2: Help Documentation Popup
            // ========================================
            System.out.println("--- SCENARIO 2: Help Documentation Popup ---\n");
            System.out.println("Simulating: Open help, read content, return to main form\n");

            wm = new WindowManager(driver);  // Reset window manager

            System.out.println("Step 1: User on main form");
            System.out.println("   Current page: " + driver.getTitle());

            System.out.println("\nStep 2: User clicks 'Help' button");
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            wm.trackNewWindow();
            wm.switchToLastChild();

            System.out.println("✅ Help popup opened");
            System.out.println("   Reading help content...");

            String helpContent = driver.findElement(By.tagName("h3")).getText();
            System.out.println("   Help topic: " + helpContent);

            System.out.println("\nStep 3: User closes help");
            driver.close();

            wm.switchToMain();
            System.out.println("✅ Returned to main form");
            System.out.println("   User can continue filling form\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 3: Multi-Step Verification Flow
            // ========================================
            System.out.println("--- SCENARIO 3: Multi-Step Verification ---\n");
            System.out.println("Simulating: Main form → Verification popup → Confirmation\n");

            wm = new WindowManager(driver);

            System.out.println("Step 1: Main application");
            System.out.println("   Page: " + driver.getTitle());

            System.out.println("\nStep 2: Open verification window");
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            wm.trackNewWindow();
            wm.switchToLastChild();

            String verificationWindow = driver.getWindowHandle();
            System.out.println("✅ Verification window opened");
            System.out.println("   Title: " + driver.getTitle());

            System.out.println("\nStep 3: Perform verification");
            System.out.println("   (In real scenario: Enter OTP, answer security question)");
            String verificationData = "VERIFIED";
            System.out.println("   Status: " + verificationData);

            System.out.println("\nStep 4: Close verification, return to main");
            driver.close();

            wm.switchToMain();
            System.out.println("✅ Returned to main");
            System.out.println("   Verification data available: " + verificationData);
            System.out.println("   (In real scenario: Enable submit button, proceed)\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 4: Error Handling - Window Closed Unexpectedly
            // ========================================
            System.out.println("--- SCENARIO 4: Handling Closed Window ---\n");

            wm = new WindowManager(driver);

            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            wm.trackNewWindow();
            wm.switchToLastChild();

            String popupHandle = driver.getWindowHandle();
            System.out.println("Popup opened: " + driver.getTitle());

            // Close the popup
            driver.close();
            System.out.println("Popup closed (simulating user closing it)");

            // Try to switch to it
            System.out.println("\nAttempting to switch to closed window...");
            try {
                driver.switchTo().window(popupHandle);
                driver.getTitle();  // This will throw exception
                System.out.println("❌ This shouldn't print!");
            } catch (Exception e) {
                System.out.println("✅ Exception caught: " + e.getClass().getSimpleName());
                System.out.println("   Handling gracefully...");
                wm.switchToMain();
                System.out.println("   Switched to main window safely");
            }

            System.out.println("✅ Error handled, application continues\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 5: Waiting for New Window with Explicit Wait
            // ========================================
            System.out.println("--- SCENARIO 5: Wait for New Window ---\n");

            wm = new WindowManager(driver);

            System.out.println("Current windows: " + driver.getWindowHandles().size());
            System.out.println("Clicking link that opens new window...");

            driver.findElement(By.linkText("Click Here")).click();

            // Wait for new window to open
            System.out.println("⏳ Waiting for new window to appear...");
            wait.until(ExpectedConditions.numberOfWindowsToBe(2));
            System.out.println("✅ New window detected!");

            wm.trackNewWindow();
            wm.switchToLastChild();

            System.out.println("   New window title: " + driver.getTitle());
            System.out.println("   Total windows: " + driver.getWindowHandles().size());

            // Cleanup
            driver.close();
            wm.switchToMain();
            System.out.println("✅ Window closed and returned to main\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 6: Complete Workflow
            // ========================================
            System.out.println("--- SCENARIO 6: Complete Workflow ---\n");
            System.out.println("Simulating: Shopping cart → Payment → Confirmation\n");

            wm = new WindowManager(driver);

            // Step 1: Shopping cart
            System.out.println("Step 1: Shopping Cart Page");
            System.out.println("   Current: " + driver.getTitle());
            System.out.println("   Action: User clicks 'Proceed to Payment'");

            // Step 2: Open payment window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            wm.trackNewWindow();
            wm.switchToLastChild();

            System.out.println("\nStep 2: Payment Window (Secure)");
            System.out.println("   Window: " + driver.getTitle());
            System.out.println("   Action: Enter payment details");
            System.out.println("   Status: Payment processed");

            String paymentConfirmation = "PAYMENT_CONFIRMED_#12345";

            // Step 3: Close payment, return to cart
            driver.close();
            wm.switchToMain();

            System.out.println("\nStep 3: Return to Shopping Cart");
            System.out.println("   Payment data received: " + paymentConfirmation);
            System.out.println("   Action: Display confirmation, update order status");
            System.out.println("\n✅ Complete workflow executed successfully!");

            // ========================================
            // FINAL SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("REAL-WORLD SCENARIOS SUMMARY:");
            System.out.println("=====================================");
            System.out.println("\n1. PRODUCT COMPARISON:");
            System.out.println("   • Open multiple products");
            System.out.println("   • Extract information");
            System.out.println("   • Close all, return to catalog");
            System.out.println("\n2. HELP POPUP:");
            System.out.println("   • Open help in new window");
            System.out.println("   • Read content");
            System.out.println("   • Close and continue work");
            System.out.println("\n3. VERIFICATION FLOW:");
            System.out.println("   • Multi-step process");
            System.out.println("   • Data transfer between windows");
            System.out.println("   • Secure operations");
            System.out.println("\n4. ERROR HANDLING:");
            System.out.println("   • Detect closed windows");
            System.out.println("   • Graceful fallback");
            System.out.println("   • Prevent test failures");
            System.out.println("\n5. WAITING:");
            System.out.println("   • Wait for new windows");
            System.out.println("   • Handle dynamic scenarios");
            System.out.println("   • Robust automation");
            System.out.println("\n6. COMPLETE WORKFLOW:");
            System.out.println("   • Multiple window transitions");
            System.out.println("   • Data collection and usage");
            System.out.println("   • End-to-end scenario");
            System.out.println("=====================================");
            System.out.println("\nWINDOW MANAGER CLASS BENEFITS:");
            System.out.println("  ✅ Centralized window tracking");
            System.out.println("  ✅ Reusable methods");
            System.out.println("  ✅ Cleaner test code");
            System.out.println("  ✅ Easier maintenance");
            System.out.println("  ✅ Built-in error handling");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== REAL-WORLD WINDOW HANDLING SCENARIOS =====

--- SCENARIO 1: Product Comparison ---

Simulating: Open multiple products in new tabs, compare

Main catalog page loaded
Opening 3 products in new windows...

Product 1:
  Opened: New Window
  URL: https://the-internet.herokuapp.com/windows/new
Product 2:
  Opened: New Window
  URL: https://the-internet.herokuapp.com/windows/new
Product 3:
  Opened: New Window
  URL: https://the-internet.herokuapp.com/windows/new

✅ Comparison Data Collected:
  Product 1: New Window
  Product 2: New Window
  Product 3: New Window

📊 Window Status:
   Main: CDwindow-A1B2C3D...
   Children: 3
   Total Open: 4

✅ All product windows closed

--- SCENARIO 2: Help Documentation Popup ---

Simulating: Open help, read content, return to main form

Step 1: User on main form
   Current page: The Internet

Step 2: User clicks 'Help' button
✅ Help popup opened
   Reading help content...
   Help topic: New Window

Step 3: User closes help
✅ Returned to main form
   User can continue filling form

--- SCENARIO 3: Multi-Step Verification ---

Simulating: Main form → Verification popup → Confirmation

Step 1: Main application
   Page: The Internet

Step 2: Open verification window
✅ Verification window opened
   Title: New Window

Step 3: Perform verification
   (In real scenario: Enter OTP, answer security question)
   Status: VERIFIED

Step 4: Close verification, return to main
✅ Returned to main
   Verification data available: VERIFIED
   (In real scenario: Enable submit button, proceed)

--- SCENARIO 4: Handling Closed Window ---

Popup opened: New Window
Popup closed (simulating user closing it)

Attempting to switch to closed window...
✅ Exception caught: NoSuchWindowException
   Handling gracefully...
   Switched to main window safely
✅ Error handled, application continues

--- SCENARIO 5: Wait for New Window ---

Current windows: 1
Clicking link that opens new window...
⏳ Waiting for new window to appear...
✅ New window detected!
   New window title: New Window
   Total windows: 2
✅ Window closed and returned to main

--- SCENARIO 6: Complete Workflow ---

Simulating: Shopping cart → Payment → Confirmation

Step 1: Shopping Cart Page
   Current: The Internet
   Action: User clicks 'Proceed to Payment'

Step 2: Payment Window (Secure)
   Window: New Window
   Action: Enter payment details
   Status: Payment processed

Step 3: Return to Shopping Cart
   Payment data received: PAYMENT_CONFIRMED_#12345
   Action: Display confirmation, update order status

✅ Complete workflow executed successfully!

=====================================
REAL-WORLD SCENARIOS SUMMARY:
=====================================

1. PRODUCT COMPARISON:
   • Open multiple products
   • Extract information
   • Close all, return to catalog

2. HELP POPUP:
   • Open help in new window
   • Read content
   • Close and continue work

3. VERIFICATION FLOW:
   • Multi-step process
   • Data transfer between windows
   • Secure operations

4. ERROR HANDLING:
   • Detect closed windows
   • Graceful fallback
   • Prevent test failures

5. WAITING:
   • Wait for new windows
   • Handle dynamic scenarios
   • Robust automation

6. COMPLETE WORKFLOW:
   • Multiple window transitions
   • Data collection and usage
   • End-to-end scenario
=====================================

WINDOW MANAGER CLASS BENEFITS:
  ✅ Centralized window tracking
  ✅ Reusable methods
  ✅ Cleaner test code
  ✅ Easier maintenance
  ✅ Built-in error handling
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Multiple windows open for product comparison scenario
2. Help popup opens and closes
3. Verification window demonstrates multi-step flow
4. Error handling prevents crashes
5. Wait conditions handle dynamic window opening
6. Complete workflow shows end-to-end process
7. All windows clean up properly

**✅ Success Criteria:**
- All 6 scenarios complete successfully
- WindowManager class functions correctly
- Multiple products can be compared
- Help popup workflow works
- Verification flow completes
- Error handling prevents exceptions
- Wait conditions work for dynamic windows
- Complete workflow executes end-to-end
- All data transfers between windows correctly

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchWindowException | Window closed before switch | Use try-catch and fallback to main |
| TimeoutException | Window didn't open in time | Increase wait timeout or check trigger |
| NullPointerException | WindowManager not initialized | Always create WindowManager instance |
| StaleElementReferenceException | Switched windows mid-operation | Complete operation before switching |

**💡 Key Concepts:**

**1. WindowManager Pattern:**

```java
class WindowManager {
    private String mainWindow;
    private List<String> childWindows;

    public WindowManager(WebDriver driver) {
        this.mainWindow = driver.getWindowHandle();
        this.childWindows = new ArrayList<>();
    }

    public void trackNewWindow() {
        // Find and store new windows
    }

    public void switchToMain() {
        driver.switchTo().window(mainWindow);
    }

    public void closeAllChildren() {
        // Close all tracked children
    }
}

// Usage
WindowManager wm = new WindowManager(driver);
```

**2. Data Transfer Pattern:**

```java
// Extract data from child
driver.switchTo().window(childWindow);
String data = driver.findElement(By.id("data")).getText();
driver.close();

// Use data in parent
driver.switchTo().window(parentWindow);
driver.findElement(By.id("input")).sendKeys(data);
```

**3. Wait for Window Pattern:**

```java
// Wait for specific number of windows
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

// Wait for more than current
int currentWindows = driver.getWindowHandles().size();
wait.until(ExpectedConditions.numberOfWindowsToBe(currentWindows + 1));
```

**🎯 Practice Challenge:**

1. Extend WindowManager with window search by URL
2. Add logging to track all window operations
3. Implement window screenshot capture before closing
4. Create method to find window by partial title match
5. Build a test that simulates complete e-commerce checkout flow

---

## Summary: Days 27-28

### What You Learned

**Day 27: Frames & iFrames**
- Understanding frames vs iframes
- Switching to frames (by ID, name, index, WebElement)
- Handling nested frames
- Using parentFrame() and defaultContent()
- Combining frames with explicit waits
- Real-world frame scenarios

**Day 28: Window Handling**
- Understanding window handles
- Switching between windows and tabs
- Managing multiple windows
- Parent-child window relationships
- Advanced window handle operations
- Real-world window scenarios

### Key Methods Summary

```java
// FRAMES
driver.switchTo().frame("frameId");           // By ID/name
driver.switchTo().frame(0);                    // By index
driver.switchTo().frame(webElement);           // By WebElement
driver.switchTo().parentFrame();               // Go to parent
driver.switchTo().defaultContent();            // Go to main page

// WINDOWS
String handle = driver.getWindowHandle();      // Current window
Set<String> handles = driver.getWindowHandles(); // All windows
driver.switchTo().window(handle);              // Switch window
driver.close();                                 // Close current window
driver.quit();                                  // Close all windows

// WAITS
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frameId"));
wait.until(ExpectedConditions.numberOfWindowsToBe(2));
```

### Best Practices

1. **Always track your context** - Know which frame/window you're in
2. **Store handles before opening new windows** - Save main window handle
3. **Use meaningful variable names** - parent, child, mainFrame, etc.
4. **Clean up after yourself** - Close windows/frames you opened
5. **Use helper methods** - Create reusable switching methods
6. **Add waits** - Wait for frames/windows to be ready
7. **Handle errors gracefully** - Try-catch for window operations
8. **Comment your code** - Explain complex switching logic

### Common Patterns

```java
// Pattern 1: Frame switching
driver.switchTo().frame("frameId");
// Do work
driver.switchTo().defaultContent();

// Pattern 2: Window switching
String main = driver.getWindowHandle();
// Open new window
for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(main)) {
        driver.switchTo().window(handle);
        // Do work
        driver.close();
    }
}
driver.switchTo().window(main);

// Pattern 3: WindowManager
WindowManager wm = new WindowManager(driver);
// Perform operations
wm.closeAllChildren();
wm.switchToMain();
```

### Next Steps

- Practice with real websites that use frames/iframes
- Build a complete test suite using WindowManager
- Combine frame and window handling in one test
- Create your own helper classes
- Test on multi-window applications

---

**Congratulations! You've completed Days 27-28 of Selenium WebDriver!**

You now have the skills to handle complex frame and window scenarios in real-world web applications.
