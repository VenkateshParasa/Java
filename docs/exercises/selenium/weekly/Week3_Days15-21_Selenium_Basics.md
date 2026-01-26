
# Week 3: Selenium Basics - Beginner-Friendly Exercises

## Day 15: Advanced Locators & XPath

### Exercise 1: XPath Axes Navigation

```exercise
title: Master XPath Axes for Element Location
description: Learn to use XPath axes (parent, child, sibling, ancestor, descendant) to navigate the DOM tree.
requirements:
- Navigate to a complex web page
- Use parent axis to find parent element
- Use following-sibling to find next sibling
- Use preceding-sibling to find previous sibling
- Use ancestor to find ancestor elements
- Use descendant to find child elements
testcases:
- input: "Navigate DOM using XPath axes"
  output: "Should successfully locate elements using different axes"
hints:
- parent:: selects parent of current node
- following-sibling:: selects siblings after current node
- preceding-sibling:: selects siblings before current node
- ancestor:: selects all ancestors
- descendant:: selects all descendants
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class XPathAxesExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/web-form.html");
            driver.manage().window().maximize();
            
            System.out.println("XPath Axes Navigation Examples");
            System.out.println("=" .repeat(60));
            
            // 1. Parent axis - Find parent of an element
            System.out.println("\n1. Parent Axis:");
            WebElement textInput = driver.findElement(By.id("my-text-id"));
            WebElement parent = driver.findElement(
                By.xpath("//input[@id='my-text-id']/parent::div")
            );
            System.out.println("✓ Parent element tag: " + parent.getTagName());
            System.out.println("  Parent class: " + parent.getAttribute("class"));
            
            // 2. Following-sibling - Find next sibling
            System.out.println("\n2. Following-Sibling Axis:");
            WebElement nextSibling = driver.findElement(
                By.xpath("//input[@id='my-text-id']/following-sibling::input[1]")
            );
            System.out.println("✓ Next sibling ID: " + nextSibling.getAttribute("id"));
            
            // 3. Preceding-sibling - Find previous sibling
            System.out.println("\n3. Preceding-Sibling Axis:");
            List<WebElement> previousSiblings = driver.findElements(
                By.xpath("//input[@id='my-password']/preceding-sibling::input")
            );
            System.out.println("✓ Number of preceding siblings: " + previousSiblings.size());
            
            // 4. Ancestor - Find ancestor elements
            System.out.println("\n4. Ancestor Axis:");
            List<WebElement> ancestors = driver.findElements(
                By.xpath("//input[@id='my-text-id']/ancestor::*")
            );
            System.out.println("✓ Number of ancestors: " + ancestors.size());
            for (int i = 0; i < Math.min(3, ancestors.size()); i++) {
                System.out.println("  Ancestor " + (i+1) + ": " + 
                    ancestors.get(i).getTagName());
            }
            
            // 5. Descendant - Find all descendants
            System.out.println("\n5. Descendant Axis:");
            WebElement form = driver.findElement(By.tagName("form"));
            List<WebElement> descendants = driver.findElements(
                By.xpath("//form/descendant::input")
            );
            System.out.println("✓ Number of input descendants in form: " + descendants.size());
            
            // 6. Following - All elements after current node
            System.out.println("\n6. Following Axis:");
            List<WebElement> followingElements = driver.findElements(
                By.xpath("//input[@id='my-text-id']/following::input")
            );
            System.out.println("✓ Number of following input elements: " + 
                followingElements.size());
            
            // 7. Practical example - Find label for input
            System.out.println("\n7. Practical Example - Find Associated Label:");
            WebElement label = driver.findElement(
                By.xpath("//input[@id='my-text-id']/preceding-sibling::label[1]")
            );
            System.out.println("✓ Label text: " + label.getText());
            
            System.out.println("\n✓ XPath axes navigation completed successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 2: Dynamic XPath with Contains and Starts-With

```exercise
title: Build Dynamic XPath Expressions
description: Create flexible XPath locators using contains(), starts-with(), and text() functions.
requirements:
- Use contains() for partial text match
- Use starts-with() for prefix match
- Use text() for exact text match
- Combine multiple conditions with 'and'/'or'
- Handle dynamic IDs and classes
testcases:
- input: "Locate elements with dynamic attributes"
  output: "Should find elements using flexible XPath"
hints:
- contains(@attribute, 'value') for partial match
- starts-with(@attribute, 'value') for prefix
- text()='value' for exact text
- Use 'and' to combine conditions
- Use 'or' for alternative conditions
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class DynamicXPathExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/web-form.html");
            driver.manage().window().maximize();
            
            System.out.println("Dynamic XPath Examples");
            System.out.println("=" .repeat(60));
            
            // 1. contains() - Partial attribute match
            System.out.println("\n1. Using contains() for partial match:");
            WebElement textInput = driver.findElement(
                By.xpath("//input[contains(@id, 'text')]")
            );
            System.out.println("✓ Found element with ID containing 'text': " + 
                textInput.getAttribute("id"));
            
            // 2. starts-with() - Prefix match
            System.out.println("\n2. Using starts-with() for prefix:");
            WebElement passwordInput = driver.findElement(
                By.xpath("//input[starts-with(@id, 'my-')]")
            );
            System.out.println("✓ Found element with ID starting with 'my-': " + 
                passwordInput.getAttribute("id"));
            
            // 3. text() - Exact text match
            System.out.println("\n3. Using text() for exact match:");
            WebElement submitButton = driver.findElement(
                By.xpath("//button[text()='Submit']")
            );
            System.out.println("✓ Found button with text 'Submit': " + 
                submitButton.getText());
            
            // 4. contains(text()) - Partial text match
            System.out.println("\n4. Using contains(text()) for partial text:");
            List<WebElement> labels = driver.findElements(
                By.xpath("//label[contains(text(), 'Text')]")
            );
            System.out.println("✓ Found " + labels.size() + 
                " labels containing 'Text'");
            
            // 5. Multiple conditions with 'and'
            System.out.println("\n5. Using 'and' to combine conditions:");
            WebElement specificInput = driver.findElement(
                By.xpath("//input[contains(@class, 'form-control') and @type='text']")
            );
            System.out.println("✓ Found input with class containing 'form-control' AND type='text'");
            System.out.println("  ID: " + specificInput.getAttribute("id"));
            
            // 6. Multiple conditions with 'or'
            System.out.println("\n6. Using 'or' for alternative conditions:");
            List<WebElement> inputs = driver.findElements(
                By.xpath("//input[@type='text' or @type='password']")
            );
            System.out.println("✓ Found " + inputs.size() + 
                " inputs with type 'text' OR 'password'");
            
            // 7. Complex dynamic XPath
            System.out.println("\n7. Complex dynamic XPath:");
            WebElement complexElement = driver.findElement(
                By.xpath("//input[contains(@class, 'form') and " +
                        "starts-with(@id, 'my-') and " +
                        "@type='text']")
            );
            System.out.println("✓ Found element matching complex criteria");
            System.out.println("  ID: " + complexElement.getAttribute("id"));
            System.out.println("  Class: " + complexElement.getAttribute("class"));
            
            // 8. Handling dynamic IDs (e.g., id_12345)
            System.out.println("\n8. Handling dynamic IDs:");
            // Simulating dynamic ID pattern
            WebElement dynamicElement = driver.findElement(
                By.xpath("//input[contains(@id, 'text') and contains(@class, 'form')]")
            );
            System.out.println("✓ Found element with dynamic attributes");
            
            // 9. Case-insensitive search using translate()
            System.out.println("\n9. Case-insensitive search:");
            WebElement caseInsensitive = driver.findElement(
                By.xpath("//button[contains(translate(text(), " +
                        "'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'submit')]")
            );
            System.out.println("✓ Found button using case-insensitive search: " + 
                caseInsensitive.getText());
            
            System.out.println("\n✓ Dynamic XPath examples completed successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 16: Handling Multiple Windows & Tabs

### Exercise 3: Switch Between Windows

```exercise
title: Handle Multiple Browser Windows
description: Learn to switch between multiple browser windows and manage window handles.
requirements:
- Open main window
- Click link that opens new window
- Get all window handles
- Switch to new window
- Perform actions in new window
- Switch back to main window
- Close specific windows
testcases:
- input: "Open and switch between windows"
  output: "Should successfully manage multiple windows"
hints:
- Use driver.getWindowHandle() for current window
- Use driver.getWindowHandles() for all windows
- Use driver.switchTo().window(handle) to switch
- Store original window handle before opening new window
- Use Set<String> for window handles
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.Set;
import java.util.ArrayList;

public class MultipleWindowsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/window_switching_tests/page_with_frame.html");
            driver.manage().window().maximize();
            
            System.out.println("Multiple Windows Handling");
            System.out.println("=" .repeat(60));
            
            // 1. Get current window handle
            String mainWindow = driver.getWindowHandle();
            System.out.println("\n1. Main Window Handle: " + mainWindow);
            System.out.println("   Main window title: " + driver.getTitle());
            
            // 2. Open new window by clicking link
            System.out.println("\n2. Opening new window...");
            WebElement link = driver.findElement(By.linkText("Open new window"));
            link.click();
            
            Thread.sleep(2000);
            
            // 3. Get all window handles
            Set<String> allWindows = driver.getWindowHandles();
            System.out.println("   Total windows open: " + allWindows.size());
            
            // 4. Switch to new window
            System.out.println("\n3. Switching to new window...");
            for (String windowHandle : allWindows) {
                if (!windowHandle.equals(mainWindow)) {
                    driver.switchTo().window(windowHandle);
                    System.out.println("   ✓ Switched to new window");
                    System.out.println("   New window title: " + driver.getTitle());
                    System.out.println("   New window URL: " + driver.getCurrentUrl());
                    break;
                }
            }
            
            // 5. Perform action in new window
            System.out.println("\n4. Performing action in new window...");
            String newWindowTitle = driver.getTitle();
            System.out.println("   ✓ Current window title: " + newWindowTitle);
            
            // 6. Close new window
            System.out.println("\n5. Closing new window...");
            driver.close();
            System.out.println("   ✓ New window closed");
            
            // 7. Switch back to main window
            System.out.println("\n6. Switching back to main window...");
            driver.switchTo().window(mainWindow);
            System.out.println("   ✓ Back to main window");
            System.out.println("   Main window title: " + driver.getTitle());
            
            // 8. Verify we're on main window
            System.out.println("\n7. Verification:");
            System.out.println("   Current window handle: " + driver.getWindowHandle());
            System.out.println("   Matches main window: " + 
                driver.getWindowHandle().equals(mainWindow));
            
            System.out.println("\n✓ Multiple windows handled successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 4: Manage Multiple Tabs

```exercise
title: Open and Switch Between Browser Tabs
description: Learn to open new tabs programmatically and switch between them.
requirements:
- Open URL in main tab
- Open new tab using JavaScript
- Switch between tabs
- Get tab titles
- Close specific tabs
- Handle tab switching with ArrayList
testcases:
- input: "Manage multiple browser tabs"
  output: "Should successfully switch between tabs"
hints:
- Use JavascriptExecutor to open new tab
- Use ArrayList for easier tab management
- driver.switchTo().window(handle) works for tabs too
- Store tab handles in order for easy access
- Close tabs using driver.close()
solution:
```java
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WindowType;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.ArrayList;

public class MultipleTabsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            System.out.println("Multiple Tabs Management");
            System.out.println("=" .repeat(60));
            
            // 1. Open first URL in main tab
            driver.get("https://www.google.com");
            driver.manage().window().maximize();
            System.out.println("\n1. Main Tab:");
            System.out.println("   URL: " + driver.getCurrentUrl());
            System.out.println("   Title: " + driver.getTitle());
            
            // 2. Open new tab (Selenium 4 way)
            System.out.println("\n2. Opening new tab...");
            driver.switchTo().newWindow(WindowType.TAB);
            driver.get("https://www.selenium.dev");
            System.out.println("   ✓ New tab opened");
            System.out.println("   URL: " + driver.getCurrentUrl());
            System.out.println("   Title: " + driver.getTitle());
            
            // 3. Open another tab
            System.out.println("\n3. Opening third tab...");
            driver.switchTo().newWindow(WindowType.TAB);
            driver.get("https://www.wikipedia.org");
            System.out.println("   ✓ Third tab opened");
            System.out.println("   URL: " + driver.getCurrentUrl());
            System.out.println("   Title: " + driver.getTitle());
            
            // 4. Get all tab handles
            ArrayList<String> tabs = new ArrayList<>(driver.getWindowHandles());
            System.out.println("\n4. Total tabs open: " + tabs.size());
            
            // 5. Switch to specific tabs
            System.out.println("\n5. Switching between tabs:");
            
            // Switch to first tab (Google)
            driver.switchTo().window(tabs.get(0));
            System.out.println("   Tab 1 - " + driver.getTitle());
            Thread.sleep(1000);
            
            // Switch to second tab (Selenium)
            driver.switchTo().window(tabs.get(1));
            System.out.println("   Tab 2 - " + driver.getTitle());
            Thread.sleep(1000);
            
            // Switch to third tab (Wikipedia)
            driver.switchTo().window(tabs.get(2));
            System.out.println("   Tab 3 - " + driver.getTitle());
            Thread.sleep(1000);
            
            // 6. Close current tab
            System.out.println("\n6. Closing current tab (Wikipedia)...");
            driver.close();
            System.out.println("   ✓ Tab closed");
            
            // 7. Update tab list and switch to remaining tab
            tabs = new ArrayList<>(driver.getWindowHandles());
            System.out.println("   Remaining tabs: " + tabs.size());
            
            driver.switchTo().window(tabs.get(1));
            System.out.println("   ✓ Switched to: " + driver.getTitle());
            
            // 8. Alternative method - Using JavaScript (for older Selenium versions)
            System.out.println("\n7. Opening tab using JavaScript:");
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("window.open('https://github.com', '_blank');");
            Thread.sleep(2000);
            
            tabs = new ArrayList<>(driver.getWindowHandles());
            driver.switchTo().window(tabs.get(tabs.size() - 1));
            System.out.println("   ✓ New tab opened via JavaScript");
            System.out.println("   Title: " + driver.getTitle());
            
            // 9. Display all open tabs
            System.out.println("\n8. All open tabs:");
            tabs = new ArrayList<>(driver.getWindowHandles());
            for (int i = 0; i < tabs.size(); i++) {
                driver.switchTo().window(tabs.get(i));
                System.out.println("   Tab " + (i + 1) + ": " + driver.getTitle());
            }
            
            System.out.println("\n✓ Multiple tabs managed successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Close all tabs
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 17: Handling iFrames

### Exercise 5: Switch to iFrame and Back

```exercise
title: Work with Nested iFrames
description: Learn to switch into iFrames, interact with elements, and switch back to main content.
requirements:
- Identify iFrames on page
- Switch to iFrame by index
- Switch to iFrame by name/ID
- Switch to iFrame by WebElement
- Interact with elements inside iFrame
- Switch back to default content
- Handle nested iFrames
testcases:
- input: "Navigate and interact with iFrames"
  output: "Should successfully work with iFrame elements"
hints:
- Use driver.switchTo().frame() to enter iFrame
- Use driver.switchTo().defaultContent() to exit
- Use driver.switchTo().parentFrame() for nested frames
- Find iFrame element first, then switch to it
- Cannot interact with iFrame elements without switching
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class IFrameHandlingExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/frames.html");
            driver.manage().window().maximize();
            
            System.out.println("iFrame Handling Examples");
            System.out.println("=" .repeat(60));
            
            // 1. Count iFrames on page
            List<WebElement> iframes = driver.findElements(By.tagName("iframe"));
            System.out.println("\n1. Total iFrames on page: " + iframes.size());
            
            // 2. Switch to iFrame by index
            System.out.println("\n2. Switching to iFrame by index (0)...");
            driver.switchTo().frame(0);
            System.out.println("   ✓ Switched to iFrame");
            
            // Find element inside iFrame
            WebElement element = driver.findElement(By.tagName("body"));
            String iframeText = element.getText();
            System.out.println("   iFrame content: " + iframeText);
            
            // 3. Switch back to main content
            System.out.println("\n3. Switching back to main content...");
            driver.switchTo().defaultContent();
            System.out.println("   ✓ Back to main content");
            String mainTitle = driver.getTitle();
            System.out.println("   Main page title: " + mainTitle);
            
            // 4. Switch to iFrame by name/ID
            System.out.println("\n4. Switching to iFrame by name...");
            driver.switchTo().frame("iframe1");
            System.out.println("   ✓ Switched to iFrame by name");
            
            WebElement heading = driver.findElement(By.tagName("h1"));
            System.out.println("   Heading in iFrame: " + heading.getText());
            
            // Switch back
            driver.switchTo().defaultContent();
            
            // 5. Switch to iFrame by WebElement
            System.out.println("\n5. Switching to iFrame by WebElement...");
            WebElement iframeElement = driver.findElement(By.name("iframe1"));
            driver.switchTo().frame(iframeElement);
            System.out.println("   ✓ Switched to iFrame by WebElement");
            
            // Interact with element
            WebElement body = driver.findElement(By.tagName("body"));
            System.out.println("   Body text: " + body.getText());
            
            // 6. Switch back to default content
            driver.switchTo().defaultContent();
            System.out.println("\n6. ✓ Returned to default content");
            
            // 7. Handle nested iFrames (if available)
            System.out.println("\n7. Handling nested iFrames:");
            try {
                // Navigate to page with nested frames
                driver.get("https://www.selenium.dev/selenium/web/nested_frames.html");
                Thread.sleep(1000);
                
                // Switch to parent frame
                driver.switchTo().frame("frame-top");
                System.out.println("   ✓ Switched to parent frame");
                
                // Switch to child frame
                driver.switchTo().frame("frame-middle");
                System.out.println("   ✓ Switched to nested child frame");
                
                WebElement nestedContent = driver.findElement(By.id("content"));
                System.out.println("   Nested frame content: " + nestedContent.getText());
                
                // Switch to parent frame (one level up)
                driver.switchTo().parentFrame();
                System.out.println("   ✓ Switched to parent frame using parentFrame()");
                
                // Switch to default content (top level)
                driver.switchTo().defaultContent();
                System.out.println("   ✓ Switched to default content");
                
            } catch (Exception e) {
                System.out.println("   Note: Nested frames example may vary by page structure");
            }
            
            System.out.println("\n✓ iFrame handling completed successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 18: JavaScript Executor

### Exercise 6: Execute JavaScript Commands

```exercise
title: Use JavaScriptExecutor for Advanced Actions
description: Learn to execute JavaScript code for actions that Selenium cannot perform directly.
requirements:
- Cast driver to JavascriptExecutor
- Click element using JavaScript
- Enter text using JavaScript
- Scroll page using JavaScript
- Highlight elements
- Get page information
- Handle hidden elements
testcases:
- input: "Execute various JavaScript commands"
  output: "Should successfully perform JS operations"
hints:
- Cast: (JavascriptExecutor) driver
- Use executeScript() method
- Pass WebElement as argument
- Use "arguments[0]" to reference element
- Return values using "return" in script
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class JavaScriptExecutorExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/web-form.html");
            driver.manage().window().maximize();
            
            // Cast driver to JavascriptExecutor
            JavascriptExecutor js = (JavascriptExecutor) driver;
            
            System.out.println("JavaScriptExecutor Examples");
            System.out.println("=" .repeat(60));
            
            // 1. Get page title using JavaScript
            System.out.println("\n1. Get page information:");
            String title = (String) js.executeScript("return document.title;");
            System.out.println("   Page title: " + title);
            
            String url = (String) js.executeScript("return document.URL;");
            System.out.println("   Page URL: " + url);
            
            // 2. Click element using JavaScript
            System.out.println("\n2. Click element using JavaScript:");
            WebElement submitButton = driver.findElement(By.xpath("//button[text()='Submit']"));
            js.executeScript("arguments[0].click();", submitButton);
            System.out.println("   ✓ Button clicked using JavaScript");
            
            Thread.sleep(1000);
            driver.navigate().back();
            Thread.sleep(1000);
            
            // 3. Enter text using JavaScript
            System.out.println("\n3. Enter text using JavaScript:");
            WebElement textInput = driver.findElement(By.id("my-text-id"));
            js.executeScript("arguments[0].value='JavaScript Input';", textInput);
            System.out.println("   ✓ Text entered using JavaScript");
            String enteredValue = (String) js.executeScript("return arguments[0].value;", textInput);
            System.out.println("   Entered value: " + enteredValue);
            
            // 4. Scroll operations
            System.out.println("\n4. Scroll operations:");
            
            // Scroll down by pixels
            js.executeScript("window.scrollBy(0, 500);");
            System.out.println("   ✓ Scrolled down 500 pixels");
            Thread.sleep(1000);
            
            // Scroll to bottom
            js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            System.out.println("   ✓ Scrolled to bottom");
            Thread.sleep(1000);
            
            // Scroll to top
            js.executeScript("window.scrollTo(0, 0);");
            System.out.println("   ✓ Scrolled to top");
            Thread.sleep(1000);
            
            // Scroll element into view
            WebElement element = driver.findElement(By.id("my-text-id"));
            js.executeScript("arguments[0].scrollIntoView(true);", element);
            System.out.println("   ✓ Scrolled element into view");
            Thread.sleep(1000);
            
            // 5. Highlight element
            System.out.println("\n5. Highlight element:");
            WebElement highlightElement = driver.findElement(By.id("my-text-id"));
            
            // Store original style
            String originalStyle = highlightElement.getAttribute("style");
            
            // Highlight with border
            js.executeScript("arguments[0].style.border='3px solid red';", highlightElement);
            System.out.println("   ✓ Element highlighted with red border");
            Thread.sleep(2000);
            
            // Restore original style
            js.executeScript("arguments[0].setAttribute('style', arguments[1]);", 
                highlightElement, originalStyle);
            System.out.println("   ✓ Original style restored");
            
            // 6. Get element properties
            System.out.println("\n6. Get element properties:");
            WebElement passwordInput = driver.findElement(By.id("my-password"));
            
            String tagName = (String) js.executeScript("return arguments[0].tagName;", passwordInput);
            System.out.println("   Tag name: " + tagName);
            
            String type = (String) js.executeScript("return arguments[0].type;", passwordInput);
            System.out.println("   Input type: " + type);
            
            Boolean isDisplayed = (Boolean) js.executeScript(
                "return arguments[0].offsetHeight > 0;", passwordInput);
            System.out.println("   Is displayed: " + isDisplayed);
            
            // 7. Generate alert
            System.out.println("\n7. Generate JavaScript alert:");
            js.executeScript("alert('Hello from JavaScript!');");
            System.out.println("   ✓ Alert generated");
            Thread.sleep(2000);
            driver.switchTo().alert().accept();
            System.out.println("   ✓ Alert accepted");
            
            // 8. Refresh page using JavaScript
            System.out.println("\n8. Refresh page:");
            js.executeScript("location.reload();");
            System.out.println("   ✓ Page refreshed using JavaScript");
            Thread.sleep(2000);
            
            // 9. Open new tab using JavaScript
            System.out.println("\n9. Open new tab:");
            js.executeScript("window.open('https://www.google.com', '_blank');");
            System.out.println("   ✓ New tab opened using JavaScript");
            Thread.sleep(2000);
            
            // 10. Get browser information
            System.out.println("\n10. Browser information:");
            String userAgent = (String) js.executeScript("return navigator.userAgent;");
            System.out.println("   User Agent: " + userAgent);
            
            System.out.println("\n✓ JavaScript Executor examples completed successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 19: Actions Class - Mouse & Keyboard

### Exercise 7: Mouse Actions (Hover, Click, Drag-Drop)

```exercise
title: Perform Advanced Mouse Actions
description: Use Actions class for complex mouse interactions like hover, double-click, right-click, and drag-drop.
requirements:
- Import Actions class
- Perform mouse hover
- Perform double-click
- Perform right-click (context click)
- Perform drag and drop
- Chain multiple actions
testcases:
- input: "Perform various mouse actions"
  output: "Should successfully execute mouse interactions"
hints:
- Import org.openqa.selenium.interactions.Actions
- Create Actions object: new Actions(driver)
- Use moveToElement() for hover
- Use doubleClick() for double-click
- Use contextClick() for right-click
- Use dragAndDrop() for drag-drop
- Use build().perform() to execute
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class MouseActionsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/mouse_interaction.html");
            driver.manage().window().maximize();
            
            // Create Actions object
            Actions actions = new Actions(driver);
            
            System.out.println("Mouse Actions Examples");
            System.out.println("=" .repeat(60));
            
            // 1. Mouse Hover (Move to Element)
            System.out.println("\n1. Mouse Hover:");
            WebElement hoverElement = driver.findElement(By.id("hover"));
            actions.moveToElement(hoverElement).perform();
            System.out.println("   ✓ Hovered over element");
            Thread.sleep(2000);
            
            // 2. Click and Hold
            System.out.println("\n2. Click and Hold:");
            WebElement clickHoldElement = driver.findElement(By.id("clickable"));
            actions.clickAndHold(clickHoldElement).perform();
            System.out.println("   ✓ Click and hold performed");
            Thread.sleep(1000);
            actions.release().perform();
            System.out.println("   ✓ Released");
            
            // 3. Double Click
            System.out.println("\n3. Double Click:");
            WebElement doubleClickElement = driver.findElement(By.id("clickable"));
            actions.doubleClick(doubleClickElement).perform();
            System.out.println("   ✓ Double click performed");
            Thread.sleep(1000);
            
            // 4. Right Click (Context Click)
            System.out.println("\n4. Right Click:");
            WebElement rightClickElement = driver.findElement(By.id("clickable"));
            actions.contextClick(rightClickElement).perform();
            System.out.println("   ✓ Right click performed");
            Thread.sleep(2000);
            
            // 5. Drag and Drop
            System.out.println("\n5. Drag and Drop:");
            try {
                driver.get("https://www.selenium.dev/selenium/web/dragAndDropTest.html");
                Thread.sleep(1000);
                
                WebElement source = driver.findElement(By.id("draggable"));
                WebElement target = driver.findElement(By.id("droppable"));
                
                actions.dragAndDrop(source, target).perform();
                System.out.println("   ✓ Drag and drop performed");
                Thread.sleep(2000);
                
            } catch (Exception e) {
                System.out.println("   Note: Drag-drop example may vary by page");
            }
            
            // 6. Move by Offset
            System.out.println("\n6. Move by Offset:");
            actions.moveByOffset(100, 100).perform();
            System.out.println("   ✓ Moved mouse by offset (100, 100)");
            Thread.sleep(1000);
            
            // 7. Chain Multiple Actions
            System.out.println("\n7. Chain Multiple Actions:");
            driver.get("https://www.selenium.dev/selenium/web/mouse_interaction.html");
            Thread.sleep(1000);
            
            WebElement element = driver.findElement(By.id("clickable"));
            actions.moveToElement(element)
                   .click()
                   .doubleClick()
                   .contextClick()
                   .build()
                   .perform();
            System.out.println("   ✓ Multiple actions chained and performed");
            
            System.out.println("\n✓ Mouse actions completed successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 8: Keyboard Actions

```exercise
title: Perform Keyboard Actions
description: Use Actions class for keyboard interactions like key press, key combinations, and text entry.
requirements:
- Perform single key press
- Perform key combinations (Ctrl+A, Ctrl+C, Ctrl+V)
- Send keys to element
- Perform Enter key press
- Use modifier keys
testcases:
- input: "Perform keyboard actions"
  output: "Should successfully execute keyboard interactions"
hints:
- Use sendKeys() for text input
- Use keyDown() to press modifier key
- Use keyUp() to release modifier key
- Use Keys enum for special keys
- Chain actions for combinations
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class KeyboardActionsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/web-form.html");
            driver.manage().window().maximize();
            
            Actions actions = new Actions(driver);
            
            System.out.println("Keyboard Actions Examples");
            System.out.println("=" .repeat(60));
            
            // 1. Send Keys to Element
            System.out.println("\n1. Send Keys:");
            WebElement textInput = driver.findElement(By.id("my-text-id"));
            actions.click(textInput)
                   .sendKeys("Hello Selenium")
                   .perform();
            System.out.println("   ✓ Text entered: Hello Selenium");
            Thread.sleep(1000);
            
            // 2. Select All (Ctrl+A)
            System.out.println("\n2. Select All (Ctrl+A):");
            actions.keyDown(Keys.CONTROL)
                   .sendKeys("a")
                   .keyUp(Keys.CONTROL)
                   .perform();
            System.out.println("   ✓ Text selected");
            Thread.sleep(1000);
            
            // 3. Copy (Ctrl+C)
            System.out.println("\n3. Copy (Ctrl+C):");
            actions.keyDown(Keys.CONTROL)
                   .sendKeys("c")
                   .keyUp(Keys.CONTROL)
                   .perform();
            System.out.println("   ✓ Text copied");
            Thread.sleep(1000);
            
            // 4. Move to another field and Paste (Ctrl+V)
            System.out.println("\n4. Paste (Ctrl+V):");
            WebElement passwordInput = driver.findElement(By.id("my-password"));
            actions.click(passwordInput)
                   .keyDown(Keys.CONTROL)
                   .sendKeys("v")
                   .keyUp(Keys.CONTROL)
                   .perform();
            System.out.println("   ✓ Text pasted");
            Thread.sleep(1000);
            
            // 5. Press Enter
            System.out.println("\n5. Press Enter:");
            actions.sendKeys(Keys.ENTER).perform();
            System.out.println("   ✓ Enter key pressed");
            Thread.sleep(2000);
            
            driver.navigate().back();
            Thread.sleep(1000);
            
            // 6. Press Tab to navigate
            System.out.println("\n6. Tab Navigation:");
            textInput = driver.findElement(By.id("my-text-id"));
            actions.click(textInput)
                   .sendKeys("First Field")
                   .sendKeys(Keys.TAB)
                   .sendKeys("Second Field")
                   .perform();
            System.out.println("   ✓ Navigated using Tab key");
            Thread.sleep(1000);
            
            // 7. Shift + Text (Uppercase)
            System.out.println("\n7. Shift + Text:");
            textInput.clear();
            actions.click(textInput)
                   .keyDown(Keys.SHIFT)
                   .sendKeys("selenium")
                   .keyUp(Keys.SHIFT)
                   .perform();
            System.out.println("   ✓ Text entered with Shift: " + textInput.getAttribute("value"));
            Thread.sleep(1000);
            
            // 8. Multiple Key Combination
            System.out.println("\n8. Multiple Key Combination:");
            textInput.clear();
            actions.click(textInput)
                   .sendKeys("Test Automation")
                   .keyDown(Keys.CONTROL)
                   .sendKeys("a")
                   .keyUp(Keys.CONTROL)
                   .sendKeys(Keys.DELETE)
                   .perform();
            System.out.println("   ✓ Selected all and deleted");
            Thread.sleep(1000);
            
            // 9. Arrow Keys
            System.out.println("\n9. Arrow Keys:");
            actions.click(textInput)
                   .sendKeys("Arrow Keys Test")
                   .sendKeys(Keys.HOME)  // Move to start
                   .perform();
            System.out.println("   ✓ Moved to start using HOME key");
            Thread.sleep(500);
            
            actions.sendKeys(Keys.END)  // Move to end
                   .perform();
            System.out.println("   ✓ Moved to end using END key");
            Thread.sleep(500);
            
            // 10. Backspace and Delete
            System.out.println("\n10. Backspace and Delete:");
            actions.sendKeys(Keys.BACK_SPACE)
                   .sendKeys(Keys.BACK_SPACE)
                   .perform();
            System.out.println("   ✓ Deleted 2 characters using Backspace");
            
            System.out.println("\n✓ Keyboard actions completed successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 20: Taking Screenshots

### Exercise 9: Capture Different Types of Screenshots

```exercise
title: Take Full Page, Element, and Failure Screenshots
description: Learn to capture screenshots for test evidence and debugging.
requirements:
- Take full page screenshot
- Take element screenshot
- Take screenshot on test failure
- Save with timestamp
- Create screenshot directory
- Handle different image formats
testcases:
- input: "Capture various screenshots"
  output: "Should save screenshot files successfully"
hints:
- Cast driver to TakesScreenshot
- Use getScreenshotAs(OutputType.FILE)
- Use FileUtils.copyFile() to save
- Create directories with mkdirs()
- Use SimpleDateFormat for timestamps
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotExample {
    
    private static String generateTimestamp() {
        return new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
    }
    
    private static void takeFullPageScreenshot(WebDriver driver, String fileName) {
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
            File destFile = new File("screenshots/" + fileName + "_" + generateTimestamp() + ".png");
            destFile.getParentFile().mkdirs();
            FileUtils.copyFile(sourceFile, destFile);
            System.out.println("   ✓ Screenshot saved: " + destFile.getAbsolutePath());
        } catch (Exception e) {
            System.out.println("   ✗ Error taking screenshot: " + e.getMessage());
        }
    }
    
    private static void takeElementScreenshot(WebElement element, String fileName) {
        try {
            File sourceFile = element.getScreenshotAs(OutputType.FILE);
            File destFile = new File("screenshots/elements/" + fileName + "_" +
                generateTimestamp() + ".png");
            destFile.getParentFile().mkdirs();
            FileUtils.copyFile(sourceFile, destFile);
            System.out.println("   ✓ Element screenshot saved: " + destFile.getAbsolutePath());
        } catch (Exception e) {
            System.out.println("   ✗ Error taking element screenshot: " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            System.out.println("Screenshot Examples");
            System.out.println("=" .repeat(60));
            
            // 1. Full Page Screenshot
            System.out.println("\n1. Full Page Screenshot:");
            driver.get("https://www.selenium.dev");
            driver.manage().window().maximize();
            Thread.sleep(2000);
            takeFullPageScreenshot(driver, "selenium_homepage");
            
            // 2. Screenshot After Action
            System.out.println("\n2. Screenshot After Navigation:");
            driver.get("https://www.selenium.dev/documentation");
            Thread.sleep(2000);
            takeFullPageScreenshot(driver, "documentation_page");
            
            // 3. Element Screenshot
            System.out.println("\n3. Element Screenshot:");
            driver.get("https://www.selenium.dev/selenium/web/web-form.html");
            Thread.sleep(1000);
            WebElement form = driver.findElement(By.tagName("form"));
            takeElementScreenshot(form, "form_element");
            
            // 4. Screenshot of Specific Element
            System.out.println("\n4. Button Element Screenshot:");
            WebElement submitButton = driver.findElement(By.xpath("//button[text()='Submit']"));
            takeElementScreenshot(submitButton, "submit_button");
            
            // 5. Screenshot on Test Failure Simulation
            System.out.println("\n5. Screenshot on Failure:");
            try {
                WebElement nonExistent = driver.findElement(By.id("does-not-exist"));
                nonExistent.click();
            } catch (Exception e) {
                System.out.println("   ✗ Test failed: " + e.getMessage());
                takeFullPageScreenshot(driver, "test_failure");
            }
            
            // 6. Screenshot with Custom Name
            System.out.println("\n6. Custom Named Screenshot:");
            String testName = "LoginTest";
            String timestamp = generateTimestamp();
            takeFullPageScreenshot(driver, testName + "_" + timestamp);
            
            // 7. Multiple Screenshots in Sequence
            System.out.println("\n7. Sequential Screenshots:");
            driver.get("https://www.google.com");
            Thread.sleep(1000);
            takeFullPageScreenshot(driver, "step1_google_home");
            
            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("Selenium WebDriver");
            takeFullPageScreenshot(driver, "step2_search_entered");
            
            searchBox.submit();
            Thread.sleep(2000);
            takeFullPageScreenshot(driver, "step3_search_results");
            
            System.out.println("\n✓ All screenshots captured successfully!");
            System.out.println("Check the 'screenshots' directory for saved images");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 21: Review & Practice Project

### Exercise 10: Complete E-Commerce Test Automation

```exercise
title: Build Complete Test Suite for E-Commerce Site
description: Create a comprehensive test automation project using all Week 3 concepts.
requirements:
- Use advanced XPath locators
- Handle multiple windows/tabs
- Work with iFrames if present
- Use JavaScript Executor
- Perform mouse and keyboard actions
- Take screenshots at key steps
- Create reusable methods
testcases:
- input: "Run complete e-commerce test flow"
  output: "Should successfully automate shopping workflow"
hints:
- Break down into smaller methods
- Use explicit waits
- Handle exceptions gracefully
- Take screenshots for evidence
- Use Actions class for complex interactions
solution:
```java
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.time.Duration;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ECommerceTestProject {
    private static WebDriver driver;
    private static WebDriverWait wait;
    private static Actions actions;
    private static JavascriptExecutor js;
    
    // Utility Methods
    private static void takeScreenshot(String fileName) {
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
            File destFile = new File("test-evidence/" + fileName + "_" + timestamp + ".png");
            destFile.getParentFile().mkdirs();
            FileUtils.copyFile(sourceFile, destFile);
            System.out.println("   📸 Screenshot: " + fileName);
        } catch (Exception e) {
            System.out.println("   ✗ Screenshot failed: " + e.getMessage());
        }
    }
    
    private static void highlightElement(WebElement element) {
        String originalStyle = element.getAttribute("style");
        js.executeScript("arguments[0].style.border='3px solid red';", element);
        try { Thread.sleep(500); } catch (InterruptedException e) {}
        js.executeScript("arguments[0].setAttribute('style', arguments[1]);",
            element, originalStyle);
    }
    
    private static void scrollToElement(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
            element);
        try { Thread.sleep(500); } catch (InterruptedException e) {}
    }
    
    // Test Methods
    private static void testHomePage() {
        System.out.println("\n1. Testing Home Page");
        System.out.println("-" .repeat(60));
        
        driver.get("https://www.saucedemo.com");
        driver.manage().window().maximize();
        
        String title = driver.getTitle();
        System.out.println("   ✓ Page Title: " + title);
        
        takeScreenshot("01_homepage");
    }
    
    private static void testLogin() {
        System.out.println("\n2. Testing Login");
        System.out.println("-" .repeat(60));
        
        try {
            WebElement username = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("user-name"))
            );
            highlightElement(username);
            username.sendKeys("standard_user");
            System.out.println("   ✓ Username entered");
            
            WebElement password = driver.findElement(By.id("password"));
            highlightElement(password);
            password.sendKeys("secret_sauce");
            System.out.println("   ✓ Password entered");
            
            takeScreenshot("02_credentials_entered");
            
            WebElement loginButton = driver.findElement(By.id("login-button"));
            highlightElement(loginButton);
            loginButton.click();
            System.out.println("   ✓ Login button clicked");
            
            Thread.sleep(1000);
            takeScreenshot("03_logged_in");
            
        } catch (Exception e) {
            System.out.println("   ✗ Login failed: " + e.getMessage());
            takeScreenshot("03_login_failure");
        }
    }
    
    private static void testProductBrowsing() {
        System.out.println("\n3. Testing Product Browsing");
        System.out.println("-" .repeat(60));
        
        try {
            // Find all products using XPath
            var products = driver.findElements(
                By.xpath("//div[@class='inventory_item']")
            );
            System.out.println("   ✓ Found " + products.size() + " products");
            
            // Hover over first product
            WebElement firstProduct = products.get(0);
            scrollToElement(firstProduct);
            actions.moveToElement(firstProduct).perform();
            System.out.println("   ✓ Hovered over first product");
            
            takeScreenshot("04_product_hover");
            
            // Click on product using JavaScript
            WebElement productLink = firstProduct.findElement(
                By.xpath(".//div[@class='inventory_item_name']")
            );
            String productName = productLink.getText();
            System.out.println("   ✓ Product: " + productName);
            
            js.executeScript("arguments[0].click();", productLink);
            Thread.sleep(1000);
            
            takeScreenshot("05_product_details");
            
            // Go back
            driver.navigate().back();
            Thread.sleep(1000);
            
        } catch (Exception e) {
            System.out.println("   ✗ Product browsing failed: " + e.getMessage());
            takeScreenshot("05_browsing_failure");
        }
    }
    
    private static void testAddToCart() {
        System.out.println("\n4. Testing Add to Cart");
        System.out.println("-" .repeat(60));
        
        try {
            // Add first product to cart
            WebElement addButton = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.xpath("(//button[contains(text(), 'Add to cart')])[1]")
                )
            );
            
            scrollToElement(addButton);
            highlightElement(addButton);
            addButton.click();
            System.out.println("   ✓ Added first product to cart");
            
            // Add second product
            WebElement addButton2 = driver.findElement(
                By.xpath("(//button[contains(text(), 'Add to cart')])[1]")
            );
            scrollToElement(addButton2);
            addButton2.click();
            System.out.println("   ✓ Added second product to cart");
            
            // Check cart badge
            WebElement cartBadge = driver.findElement(
                By.className("shopping_cart_badge")
            );
            String itemCount = cartBadge.getText();
            System.out.println("   ✓ Cart items: " + itemCount);
            
            takeScreenshot("06_items_added_to_cart");
            
        } catch (Exception e) {
            System.out.println("   ✗ Add to cart failed: " + e.getMessage());
            takeScreenshot("06_add_to_cart_failure");
        }
    }
    
    private static void testCheckout() {
        System.out.println("\n5. Testing Checkout");
        System.out.println("-" .repeat(60));
        
        try {
            // Click cart icon
            WebElement cartIcon = driver.findElement(
                By.className("shopping_cart_link")
            );
            cartIcon.click();
            System.out.println("   ✓ Opened cart");
            Thread.sleep(1000);
            
            takeScreenshot("07_cart_page");
            
            // Click checkout
            WebElement checkoutButton = driver.findElement(By.id("checkout"));
            checkoutButton.click();
            System.out.println("   ✓ Clicked checkout");
            Thread.sleep(1000);
            
            // Fill checkout form using Actions class
            WebElement firstName = driver.findElement(By.id("first-name"));
            actions.click(firstName)
                   .sendKeys("John")
                   .sendKeys(Keys.TAB)
                   .sendKeys("Doe")
                   .sendKeys(Keys.TAB)
                   .sendKeys("12345")
                   .perform();
            System.out.println("   ✓ Filled checkout form");
            
            takeScreenshot("08_checkout_form_filled");
            
            // Continue
            WebElement continueButton = driver.findElement(By.id("continue"));
            continueButton.click();
            System.out.println("   ✓ Continued to overview");
            Thread.sleep(1000);
            
            takeScreenshot("09_checkout_overview");
            
        } catch (Exception e) {
            System.out.println("   ✗ Checkout failed: " + e.getMessage());
            takeScreenshot("09_checkout_failure");
        }
    }
    
    private static void testOrderCompletion() {
        System.out.println("\n6. Testing Order Completion");
        System.out.println("-" .repeat(60));
        
        try {
            // Finish order
            WebElement finishButton = driver.findElement(By.id("finish"));
            scrollToElement(finishButton);
            highlightElement(finishButton);
            finishButton.click();
            System.out.println("   ✓ Clicked finish");
            Thread.sleep(1000);
            
            // Verify completion
            WebElement completeHeader = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                    By.className("complete-header")
                )
            );
            String message = completeHeader.getText();
            System.out.println("   ✓ Order Status: " + message);
            
            takeScreenshot("10_order_complete");
            
        } catch (Exception e) {
            System.out.println("   ✗ Order completion failed: " + e.getMessage());
            takeScreenshot("10_completion_failure");
        }
    }
    
    public static void main(String[] args) {
        try {
            // Initialize
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            actions = new Actions(driver);
            js = (JavascriptExecutor) driver;
            
            System.out.println("=" .repeat(60));
            System.out.println("E-COMMERCE TEST AUTOMATION PROJECT");
            System.out.println("=" .repeat(60));
            
            // Execute test flow
            testHomePage();
            testLogin();
            testProductBrowsing();
            testAddToCart();
            testCheckout();
            testOrderCompletion();
            
            System.out.println("\n" + "=" .repeat(60));
            System.out.println("✓ TEST SUITE COMPLETED SUCCESSFULLY");
            System.out.println("=" .repeat(60));
            System.out.println("Check 'test-evidence' folder for screenshots");
            
        } catch (Exception e) {
            System.out.println("\n✗ Test suite failed: " + e.getMessage());
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit();
                System.out.println("\n✓ Browser closed");
            }
        }
    }
}
```
\```
```

---

## Summary

Congratulations! You've completed Week 3 of Selenium Basics. You've learned:

### Day 15: Advanced Locators & XPath
- ✅ XPath axes (parent, sibling, ancestor, descendant)
- ✅ Dynamic XPath with contains(), starts-with()
- ✅ Complex XPath expressions

### Day 16: Multiple Windows & Tabs
- ✅ Switching between windows
- ✅ Managing multiple tabs
- ✅ Window handle management

### Day 17: iFrames
- ✅ Switching to iFrames
- ✅ Nested iFrame handling
- ✅ Returning to default content

### Day 18: JavaScript Executor
- ✅ Executing JavaScript commands
- ✅ Scrolling operations
- ✅ Element highlighting
- ✅ Handling hidden elements

### Day 19: Actions Class
- ✅ Mouse actions (hover, click, drag-drop)
- ✅ Keyboard actions (key combinations)
- ✅ Action chaining

### Day 20: Screenshots
- ✅ Full page screenshots
- ✅ Element screenshots
- ✅ Failure screenshots

### Day 21: Practice Project
- ✅ Complete test automation workflow
- ✅ Integration of all concepts
- ✅ Real-world application

### Next Steps
- Practice with different websites
- Build your own test projects
- Move on to Week 4 for intermediate concepts
- Explore TestNG integration

**Keep Automating! 🚀**