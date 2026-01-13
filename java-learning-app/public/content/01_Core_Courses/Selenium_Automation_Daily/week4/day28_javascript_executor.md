# Day 28: JavaScript Executor in Selenium

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand JavaScriptExecutor interface and its purpose
- Execute JavaScript code in browser using Selenium
- Perform actions that are difficult with standard Selenium methods
- Manipulate DOM elements using JavaScript
- Handle scenarios where Selenium methods fail
- Scroll pages and elements using JavaScript
- Click hidden or overlapping elements
- Retrieve and modify element properties
- Implement best practices for JavaScript execution

---

## 1. Introduction to JavaScriptExecutor

### What is JavaScriptExecutor?

JavaScriptExecutor is an interface in Selenium that allows you to execute JavaScript code directly in the browser. It provides two key methods:
- `executeScript()` - Execute synchronous JavaScript
- `executeAsyncScript()` - Execute asynchronous JavaScript

### Why Use JavaScriptExecutor?

Use JavaScriptExecutor when:
- Standard Selenium methods don't work
- Element is not interactable or hidden
- You need to scroll to an element
- You want to modify DOM directly
- You need to bypass certain restrictions
- You want to get detailed browser/element information
- Performance optimization is needed

### Package and Interface

```java
import org.openqa.selenium.JavascriptExecutor;
```

### Creating JavaScriptExecutor Object

```java
JavascriptExecutor js = (JavascriptExecutor) driver;
```

---

## 2. executeScript() Method

### Syntax

```java
Object result = js.executeScript("JavaScript code here", arguments);
```

### Parameters

1. **JavaScript code** - The script to execute (as String)
2. **Arguments** (optional) - WebElement or other objects to pass to the script

### Return Value

Returns `Object` which can be:
- String
- Long
- Boolean
- WebElement
- List<Object>
- null

### Basic Example

```java
public class JavaScriptExecutorExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // Cast driver to JavascriptExecutor
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Execute simple JavaScript
        String title = (String) js.executeScript("return document.title;");
        System.out.println("Page title: " + title);

        driver.quit();
    }
}
```

---

## 3. Common JavaScript Operations

### 3.1 Get Page Title

```java
String title = (String) js.executeScript("return document.title;");
```

### 3.2 Get Current URL

```java
String url = (String) js.executeScript("return document.URL;");
```

### 3.3 Get Page Domain

```java
String domain = (String) js.executeScript("return document.domain;");
```

### 3.4 Get Page Height

```java
Long height = (Long) js.executeScript("return document.body.scrollHeight;");
```

### 3.5 Get Page Width

```java
Long width = (Long) js.executeScript("return document.body.scrollWidth;");
```

### 3.6 Get Inner Text of Entire Page

```java
String text = (String) js.executeScript("return document.documentElement.innerText;");
```

---

## 4. Scrolling Operations

### 4.1 Scroll to Bottom of Page

```java
js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
```

### 4.2 Scroll to Top of Page

```java
js.executeScript("window.scrollTo(0, 0);");
```

### 4.3 Scroll by Pixel Amount

```java
// Scroll down 500 pixels
js.executeScript("window.scrollBy(0, 500);");

// Scroll up 300 pixels
js.executeScript("window.scrollBy(0, -300);");

// Scroll right 200 pixels
js.executeScript("window.scrollBy(200, 0);");
```

### 4.4 Scroll to Specific Element

```java
WebElement element = driver.findElement(By.id("targetElement"));
js.executeScript("arguments[0].scrollIntoView(true);", element);
```

**Parameters:**
- `arguments[0]` - Refers to first argument (element)
- `true` - Align to top of viewport
- `false` - Align to bottom of viewport

### 4.5 Scroll Element into View with Options

```java
WebElement element = driver.findElement(By.id("element"));
js.executeScript(
    "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});",
    element
);
```

**Options:**
- `behavior`: "auto" | "smooth"
- `block`: "start" | "center" | "end" | "nearest"
- `inline`: "start" | "center" | "end" | "nearest"

### Complete Scrolling Example

```java
public class ScrollingExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/long-page");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Scroll to bottom
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        Thread.sleep(2000);

        // Scroll to top
        js.executeScript("window.scrollTo(0, 0);");
        Thread.sleep(2000);

        // Scroll to specific element
        WebElement footer = driver.findElement(By.id("footer"));
        js.executeScript("arguments[0].scrollIntoView(true);", footer);

        driver.quit();
    }
}
```

---

## 5. Clicking Elements

### 5.1 Click Element Using JavaScript

```java
WebElement element = driver.findElement(By.id("button"));
js.executeScript("arguments[0].click();", element);
```

**When to use:** When standard `click()` fails due to:
- Element covered by another element
- Element not clickable at point
- Element outside viewport

### Complete Click Example

```java
public class JavaScriptClickExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        WebElement button = driver.findElement(By.id("hiddenButton"));

        // Standard click might fail
        // button.click();  // May throw ElementClickInterceptedException

        // JavaScript click works
        js.executeScript("arguments[0].click();", button);

        System.out.println("Button clicked using JavaScript");

        driver.quit();
    }
}
```

---

## 6. Element Manipulation

### 6.1 Highlight Element (for debugging)

```java
public void highlightElement(WebDriver driver, WebElement element) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    js.executeScript(
        "arguments[0].style.border='3px solid red'",
        element
    );
}
```

### 6.2 Remove Element Border (unhighlight)

```java
js.executeScript("arguments[0].style.border=''", element);
```

### 6.3 Change Element Background Color

```java
js.executeScript("arguments[0].style.backgroundColor = 'yellow'", element);
```

### 6.4 Set Element Value

```java
WebElement input = driver.findElement(By.id("username"));
js.executeScript("arguments[0].value='testuser';", input);
```

### 6.5 Get Element Value

```java
String value = (String) js.executeScript("return arguments[0].value;", input);
```

### 6.6 Get Element Inner HTML

```java
String html = (String) js.executeScript("return arguments[0].innerHTML;", element);
```

### 6.7 Set Element Inner HTML

```java
js.executeScript("arguments[0].innerHTML = '<b>New Content</b>';", element);
```

### 6.8 Get Element Attribute

```java
String attr = (String) js.executeScript("return arguments[0].getAttribute('class');", element);
```

### 6.9 Set Element Attribute

```java
js.executeScript("arguments[0].setAttribute('disabled', 'true');", element);
```

### 6.10 Remove Element Attribute

```java
js.executeScript("arguments[0].removeAttribute('disabled');", element);
```

---

## 7. Element Visibility and State

### 7.1 Check if Element is Visible

```java
Boolean isVisible = (Boolean) js.executeScript(
    "return arguments[0].offsetWidth > 0 && arguments[0].offsetHeight > 0;",
    element
);
```

### 7.2 Show Hidden Element

```java
js.executeScript("arguments[0].style.display = 'block';", element);
```

### 7.3 Hide Element

```java
js.executeScript("arguments[0].style.display = 'none';", element);
```

### 7.4 Enable Disabled Element

```java
js.executeScript("arguments[0].disabled = false;", element);
```

### 7.5 Disable Element

```java
js.executeScript("arguments[0].disabled = true;", element);
```

---

## 8. Browser Operations

### 8.1 Refresh Page

```java
js.executeScript("location.reload();");
```

### 8.2 Navigate to URL

```java
js.executeScript("window.location = 'https://example.com';");
```

### 8.3 Navigate Back

```java
js.executeScript("window.history.back();");
```

### 8.4 Navigate Forward

```java
js.executeScript("window.history.forward();");
```

### 8.5 Open New Window

```java
js.executeScript("window.open('https://example.com', '_blank');");
```

### 8.6 Close Current Window

```java
js.executeScript("window.close();");
```

### 8.7 Generate Alert

```java
js.executeScript("alert('This is an alert');");
```

---

## 9. Zoom Operations

### 9.1 Zoom In (150%)

```java
js.executeScript("document.body.style.zoom='150%';");
```

### 9.2 Zoom Out (50%)

```java
js.executeScript("document.body.style.zoom='50%';");
```

### 9.3 Reset Zoom

```java
js.executeScript("document.body.style.zoom='100%';");
```

---

## 10. DOM Queries

### 10.1 Get Element by ID

```java
WebElement element = (WebElement) js.executeScript(
    "return document.getElementById('myId');"
);
```

### 10.2 Get Elements by Class Name

```java
@SuppressWarnings("unchecked")
List<WebElement> elements = (List<WebElement>) js.executeScript(
    "return document.getElementsByClassName('myClass');"
);
```

### 10.3 Get Elements by Tag Name

```java
@SuppressWarnings("unchecked")
List<WebElement> elements = (List<WebElement>) js.executeScript(
    "return document.getElementsByTagName('div');"
);
```

### 10.4 Query Selector

```java
WebElement element = (WebElement) js.executeScript(
    "return document.querySelector('.my-class');"
);
```

### 10.5 Query Selector All

```java
@SuppressWarnings("unchecked")
List<WebElement> elements = (List<WebElement>) js.executeScript(
    "return document.querySelectorAll('.my-class');"
);
```

---

## 11. Working with Dates

### 11.1 Set Date in Date Picker

```java
WebElement datePicker = driver.findElement(By.id("dateField"));
String date = "2024-12-31";
js.executeScript("arguments[0].value=arguments[1];", datePicker, date);
```

### 11.2 Remove readonly Attribute from Date Field

```java
WebElement dateField = driver.findElement(By.id("date"));
js.executeScript("arguments[0].removeAttribute('readonly');", dateField);
dateField.sendKeys("31/12/2024");
```

---

## 12. Complete JavaScript Executor Utility Class

```java
package utils;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class JavaScriptHelper {
    private WebDriver driver;
    private JavascriptExecutor js;

    public JavaScriptHelper(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }

    /**
     * Click element using JavaScript
     */
    public void clickElement(WebElement element) {
        js.executeScript("arguments[0].click();", element);
        System.out.println("Clicked element using JavaScript");
    }

    /**
     * Enter text using JavaScript
     */
    public void enterText(WebElement element, String text) {
        js.executeScript("arguments[0].value=arguments[1];", element, text);
        System.out.println("Entered text: " + text);
    }

    /**
     * Scroll to element
     */
    public void scrollToElement(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView(true);", element);
        System.out.println("Scrolled to element");
    }

    /**
     * Scroll to bottom of page
     */
    public void scrollToBottom() {
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        System.out.println("Scrolled to bottom");
    }

    /**
     * Scroll to top of page
     */
    public void scrollToTop() {
        js.executeScript("window.scrollTo(0, 0);");
        System.out.println("Scrolled to top");
    }

    /**
     * Scroll by pixel amount
     */
    public void scrollByPixels(int x, int y) {
        js.executeScript("window.scrollBy(arguments[0], arguments[1]);", x, y);
        System.out.println("Scrolled by: " + x + "x" + y);
    }

    /**
     * Highlight element (for debugging)
     */
    public void highlightElement(WebElement element) {
        js.executeScript("arguments[0].style.border='3px solid red'", element);
    }

    /**
     * Unhighlight element
     */
    public void unhighlightElement(WebElement element) {
        js.executeScript("arguments[0].style.border=''", element);
    }

    /**
     * Get page title
     */
    public String getPageTitle() {
        return (String) js.executeScript("return document.title;");
    }

    /**
     * Get current URL
     */
    public String getCurrentURL() {
        return (String) js.executeScript("return document.URL;");
    }

    /**
     * Get page inner text
     */
    public String getPageInnerText() {
        return (String) js.executeScript("return document.documentElement.innerText;");
    }

    /**
     * Refresh page
     */
    public void refreshPage() {
        js.executeScript("location.reload();");
        System.out.println("Page refreshed");
    }

    /**
     * Get element text
     */
    public String getElementText(WebElement element) {
        return (String) js.executeScript("return arguments[0].innerText;", element);
    }

    /**
     * Get element value
     */
    public String getElementValue(WebElement element) {
        return (String) js.executeScript("return arguments[0].value;", element);
    }

    /**
     * Get element attribute
     */
    public String getElementAttribute(WebElement element, String attribute) {
        return (String) js.executeScript(
            "return arguments[0].getAttribute(arguments[1]);",
            element, attribute
        );
    }

    /**
     * Set element attribute
     */
    public void setElementAttribute(WebElement element, String attribute, String value) {
        js.executeScript(
            "arguments[0].setAttribute(arguments[1], arguments[2]);",
            element, attribute, value
        );
    }

    /**
     * Remove element attribute
     */
    public void removeElementAttribute(WebElement element, String attribute) {
        js.executeScript("arguments[0].removeAttribute(arguments[1]);", element, attribute);
    }

    /**
     * Show hidden element
     */
    public void showElement(WebElement element) {
        js.executeScript("arguments[0].style.display = 'block';", element);
    }

    /**
     * Hide element
     */
    public void hideElement(WebElement element) {
        js.executeScript("arguments[0].style.display = 'none';", element);
    }

    /**
     * Check if element is visible
     */
    public boolean isElementVisible(WebElement element) {
        return (Boolean) js.executeScript(
            "return arguments[0].offsetWidth > 0 && arguments[0].offsetHeight > 0;",
            element
        );
    }

    /**
     * Generate alert
     */
    public void generateAlert(String message) {
        js.executeScript("alert(arguments[0]);", message);
    }

    /**
     * Zoom page
     */
    public void zoomPage(String zoomLevel) {
        js.executeScript("document.body.style.zoom=arguments[0];", zoomLevel);
    }

    /**
     * Get page height
     */
    public Long getPageHeight() {
        return (Long) js.executeScript("return document.body.scrollHeight;");
    }

    /**
     * Get page width
     */
    public Long getPageWidth() {
        return (Long) js.executeScript("return document.body.scrollWidth;");
    }
}
```

---

## 13. Practical Examples

### Example 1: Handle Date Picker

```java
public void setDateInDatePicker(WebDriver driver) {
    JavascriptExecutor js = (JavascriptExecutor) driver;

    // Remove readonly attribute
    WebElement dateField = driver.findElement(By.id("dateInput"));
    js.executeScript("arguments[0].removeAttribute('readonly');", dateField);

    // Set date
    js.executeScript("arguments[0].value='2024-12-31';", dateField);
}
```

### Example 2: Handle Hidden Elements

```java
public void interactWithHiddenElement(WebDriver driver) {
    JavascriptExecutor js = (JavascriptExecutor) driver;

    WebElement hiddenButton = driver.findElement(By.id("hidden"));

    // Show element
    js.executeScript("arguments[0].style.display = 'block';", hiddenButton);

    // Click element
    js.executeScript("arguments[0].click();", hiddenButton);
}
```

### Example 3: Infinite Scroll

```java
public void handleInfiniteScroll(WebDriver driver) throws InterruptedException {
    JavascriptExecutor js = (JavascriptExecutor) driver;

    Long lastHeight = (Long) js.executeScript("return document.body.scrollHeight");

    while (true) {
        // Scroll to bottom
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

        // Wait for content to load
        Thread.sleep(2000);

        // Calculate new height
        Long newHeight = (Long) js.executeScript("return document.body.scrollHeight");

        // Break if no new content loaded
        if (newHeight.equals(lastHeight)) {
            break;
        }

        lastHeight = newHeight;
    }
}
```

---

## 14. executeAsyncScript()

### Purpose

Used for asynchronous JavaScript operations (AJAX calls, timeouts, etc.).

### Syntax

```java
Object result = js.executeAsyncScript("script", arguments);
```

### Example

```java
public void asyncScriptExample(WebDriver driver) {
    JavascriptExecutor js = (JavascriptExecutor) driver;

    // Set script timeout
    driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(10));

    // Execute async script
    Long response = (Long) js.executeAsyncScript(
        "var callback = arguments[arguments.length - 1];" +
        "setTimeout(function() { callback(42); }, 3000);"
    );

    System.out.println("Async result: " + response);  // Output: 42
}
```

---

## 15. Best Practices

1. **Use JavaScriptExecutor as last resort**
   ```java
   // Try standard method first
   try {
       element.click();
   } catch (Exception e) {
       // Fall back to JavaScript
       js.executeScript("arguments[0].click();", element);
   }
   ```

2. **Always cast driver to JavascriptExecutor**
   ```java
   JavascriptExecutor js = (JavascriptExecutor) driver;
   ```

3. **Use arguments[index] for parameters**
   ```java
   js.executeScript("arguments[0].click();", element);
   ```

4. **Handle return values appropriately**
   ```java
   String title = (String) js.executeScript("return document.title;");
   Long height = (Long) js.executeScript("return document.body.scrollHeight;");
   ```

5. **Add waits after JavaScript actions**
   ```java
   js.executeScript("arguments[0].click();", button);
   Thread.sleep(1000);  // Or use explicit wait
   ```

6. **Create utility methods**
   ```java
   JavaScriptHelper jsHelper = new JavaScriptHelper(driver);
   jsHelper.clickElement(element);
   ```

---

## 16. Practical Exercises

### Exercise 1: Scroll Operations
Create methods to scroll to top, bottom, and to a specific element.

### Exercise 2: Click Hidden Element
Find and click an element that's hidden with `display: none`.

### Exercise 3: Highlight Elements
Create a method that highlights all links on a page in red.

### Exercise 4: Date Picker
Handle a date picker that doesn't allow manual text entry.

### Exercise 5: Infinite Scroll
Implement infinite scroll handling for a social media feed.

### Exercise 6: Element Manipulation
Create methods to show, hide, enable, and disable elements.

### Exercise 7: DOM Queries
Use JavaScript to find elements by various selectors.

### Exercise 8: Zoom Control
Create methods to zoom in, zoom out, and reset zoom.

### Exercise 9: Complete Utility
Implement all methods in JavaScriptHelper class.

### Exercise 10: Complex Scenario
Handle a complex page with hidden elements, date pickers, and infinite scroll.

---

## 17. Key Takeaways

1. **JavascriptExecutor** executes JavaScript in the browser
2. **executeScript()** runs synchronous JavaScript
3. **executeAsyncScript()** runs asynchronous JavaScript
4. **arguments[0]** refers to first parameter passed
5. **Use for scrolling** when standard methods don't work
6. **Click hidden elements** with JavaScript
7. **Manipulate DOM** directly when needed
8. **Last resort solution** - try standard Selenium first
9. **Cast return values** appropriately (String, Long, Boolean)
10. **Create utilities** for reusable JavaScript operations

---

## 18. Common Interview Questions

1. What is JavascriptExecutor?
2. When should you use JavascriptExecutor?
3. What's the difference between executeScript() and executeAsyncScript()?
4. How do you click a hidden element using JavaScript?
5. How do you scroll to an element using JavaScript?
6. How do you pass arguments to JavaScript code?
7. What does arguments[0] mean in JavaScript executor?
8. How do you handle return values from executeScript()?
9. Why is JavascriptExecutor considered a last resort?
10. How do you set value in a readonly text field?

---

## 19. Additional Resources

### Official Documentation
- [JavascriptExecutor Interface](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/JavascriptExecutor.html)
- [Selenium JavaScript Guide](https://www.selenium.dev/documentation/webdriver/interactions/javascript_alerts/)

### JavaScript References
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [W3Schools - JavaScript](https://www.w3schools.com/js/)

---

## Navigation

- **Previous:** [Day 27: Actions Class](./day27_actions_class.md)
- **Next:** [Week 5: Advanced Selenium Concepts](../week5/README.md)
- **Week 4 Home:** [Week 4 Overview](./README.md)

---

**Congratulations!** You've completed Week 4 of Selenium Automation. You've learned advanced concepts including dropdowns, waits, alerts, frames, windows, actions, and JavaScript executor. These skills form the foundation for handling complex automation scenarios.

---

**Happy Learning!** JavaScript Executor is a powerful tool that gives you complete control over browser interactions when standard methods fall short.
