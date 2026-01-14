---
title: "Day 12: JavaScript Executor Advanced Techniques"
subtitle: "Master Advanced JavaScript Execution in Selenium for Complex Scenarios"
courseId: selenium-automation
week: 2
day: 12
tags: [selenium, javascript-executor, dom-manipulation, advanced-automation, web-interactions, shadow-dom]
difficulty: advanced
duration: 120 minutes
objectives:
  - Master JavaScript Executor for advanced web automation
  - Implement advanced scrolling techniques and strategies
  - Manipulate DOM elements using JavaScript
  - Handle Shadow DOM and complex web components
  - Execute browser and window operations via JavaScript
  - Detect page load and AJAX completion
  - Apply JavaScript Executor best practices
---

# Day 12: JavaScript Executor Advanced Techniques

## Table of Contents
1. [Introduction](#introduction)
2. [Learning Objectives](#learning-objectives)
3. [Introduction to JavaScript Executor](#introduction-to-javascript-executor)
4. [JavaScript Executor Basics Review](#javascript-executor-basics-review)
5. [Advanced Scrolling Techniques](#advanced-scrolling-techniques)
6. [Element Manipulation](#element-manipulation)
7. [Working with the DOM](#working-with-the-dom)
8. [Form Interactions via JavaScript](#form-interactions-via-javascript)
9. [Browser and Window Operations](#browser-and-window-operations)
10. [Performance and Timing](#performance-and-timing)
11. [Handling Shadow DOM](#handling-shadow-dom)
12. [Advanced Use Cases](#advanced-use-cases)
13. [Best Practices and When to Use JS Executor](#best-practices-and-when-to-use-js-executor)
14. [Practice Exercises](#practice-exercises)
15. [Interview Questions](#interview-questions)
16. [Key Takeaways](#key-takeaways)
17. [What's Next](#whats-next)

## Introduction

Welcome to Day 12 of your Selenium automation journey! Today, we'll dive deep into **JavaScript Executor** - one of the most powerful and versatile tools in Selenium WebDriver. While Selenium provides excellent methods for web automation, there are scenarios where direct JavaScript execution provides better solutions or is the only viable option.

JavaScript Executor allows you to:
- Execute JavaScript code directly in the browser context
- Bypass limitations of standard Selenium methods
- Handle complex scenarios like Shadow DOM
- Manipulate elements that are difficult to interact with
- Perform operations not directly supported by Selenium
- Optimize automation performance for specific scenarios

Modern web applications increasingly use complex JavaScript frameworks, Shadow DOM, and dynamic content loading. JavaScript Executor becomes essential for handling these advanced scenarios effectively.

## Learning Objectives

By the end of this lesson, you will be able to:

1. Understand when and why to use JavaScript Executor
2. Execute JavaScript code in browser context using Selenium
3. Implement advanced scrolling techniques for various scenarios
4. Manipulate DOM elements, attributes, and properties
5. Navigate and query the DOM tree using JavaScript
6. Handle form interactions and bypass validation
7. Control browser windows, tabs, and zoom levels
8. Detect page load completion and AJAX operations
9. Access and interact with Shadow DOM elements
10. Apply JavaScript Executor best practices
11. Choose between Selenium methods and JavaScript execution
12. Handle complex real-world automation scenarios

## Introduction to JavaScript Executor

### What is JavaScript Executor?

JavaScript Executor is an interface in Selenium WebDriver that enables execution of JavaScript code within the context of the currently loaded page. It provides two primary methods:

- `executeScript()` - Executes JavaScript synchronously
- `executeAsyncScript()` - Executes JavaScript asynchronously

### Why Use JavaScript Executor?

**Standard Selenium Limitations:**
- Cannot click hidden or disabled elements
- Limited control over scrolling behavior
- Cannot access Shadow DOM directly
- No direct access to browser APIs
- Cannot detect AJAX completion easily
- Limited attribute/property manipulation

**JavaScript Executor Benefits:**
- Direct browser API access
- Complete DOM manipulation control
- Can interact with any element regardless of visibility
- Access to Shadow DOM
- Execute custom JavaScript logic
- Retrieve complex data structures
- Bypass certain security restrictions
- Performance optimization for specific operations

### Architecture Overview

```
┌──────────────────────────────────────────────┐
│         Selenium WebDriver                   │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │     JavascriptExecutor Interface       │ │
│  │                                        │ │
│  │  executeScript(script, args...)        │ │
│  │  executeAsyncScript(script, args...)   │ │
│  └────────────────────────────────────────┘ │
│                    ↓                         │
└────────────────────┼─────────────────────────┘
                     ↓
         ┌───────────────────────┐
         │   Browser Context     │
         │                       │
         │  JavaScript Engine    │
         │  DOM API              │
         │  Browser APIs         │
         └───────────────────────┘
```

## JavaScript Executor Basics Review

### Setting Up JavaScript Executor

JavaScript Executor is an interface that must be cast from the WebDriver instance:

```java
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class JSExecutorSetup {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        // Cast WebDriver to JavascriptExecutor
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");

        // Now you can execute JavaScript
        js.executeScript("alert('Hello from JavaScript!');");

        driver.quit();
    }
}
```

### Basic executeScript() Method

The `executeScript()` method executes JavaScript synchronously and returns the result:

```java
public class BasicJSExecution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");

        // Execute simple JavaScript
        String title = (String) js.executeScript("return document.title;");
        System.out.println("Page Title: " + title);

        // Get URL
        String url = (String) js.executeScript("return document.URL;");
        System.out.println("Current URL: " + url);

        // Get domain
        String domain = (String) js.executeScript("return document.domain;");
        System.out.println("Domain: " + domain);

        driver.quit();
    }
}
```

### Passing Arguments to JavaScript

You can pass WebElement objects and other arguments to JavaScript:

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class JSWithArguments {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");

        WebElement element = driver.findElement(By.id("username"));

        // Pass element as argument (arguments[0])
        js.executeScript("arguments[0].style.border='3px solid red'", element);

        // Pass multiple arguments
        String value = "testuser";
        js.executeScript("arguments[0].value = arguments[1];", element, value);

        // Pass and return values
        Long scrollPosition = (Long) js.executeScript(
            "arguments[0].scrollIntoView(); return window.pageYOffset;",
            element
        );
        System.out.println("Scrolled to position: " + scrollPosition);

        driver.quit();
    }
}
```

### Understanding Return Types

JavaScript Executor can return various types:

```java
public class JSReturnTypes {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");

        // String return
        String title = (String) js.executeScript("return document.title;");

        // Number return (Long)
        Long scrollHeight = (Long) js.executeScript("return document.body.scrollHeight;");

        // Boolean return
        Boolean isVisible = (Boolean) js.executeScript(
            "return arguments[0].offsetParent !== null;",
            driver.findElement(By.id("element"))
        );

        // WebElement return
        WebElement element = (WebElement) js.executeScript(
            "return document.getElementById('username');"
        );

        // Array return (List)
        List<WebElement> links = (List<WebElement>) js.executeScript(
            "return document.querySelectorAll('a');"
        );

        // Object return (Map)
        Map<String, Object> windowInfo = (Map<String, Object>) js.executeScript(
            "return {width: window.innerWidth, height: window.innerHeight};"
        );

        driver.quit();
    }
}
```

## Advanced Scrolling Techniques

### 1. Scroll to Element

Multiple approaches to scroll elements into view:

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class ScrollToElement {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/long-page");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("footer-section"));

        // Method 1: scrollIntoView (default)
        js.executeScript("arguments[0].scrollIntoView();", element);

        // Method 2: scrollIntoView with alignment (top)
        js.executeScript("arguments[0].scrollIntoView(true);", element);

        // Method 3: scrollIntoView with alignment (bottom)
        js.executeScript("arguments[0].scrollIntoView(false);", element);

        // Method 4: scrollIntoView with options (smooth scrolling)
        js.executeScript(
            "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});",
            element
        );

        // Method 5: Scroll to element with offset
        js.executeScript(
            "var element = arguments[0];" +
            "var offset = arguments[1];" +
            "var bodyRect = document.body.getBoundingClientRect();" +
            "var elemRect = element.getBoundingClientRect();" +
            "var offsetTop = elemRect.top - bodyRect.top - offset;" +
            "window.scrollTo(0, offsetTop);",
            element, 100
        );

        driver.quit();
    }
}
```

### 2. Scroll by Coordinates

Precise scrolling using pixel coordinates:

```java
public class ScrollByCoordinates {

    private static JavascriptExecutor js;

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;

        driver.get("https://example.com/long-page");
        driver.manage().window().maximize();

        // Scroll down by 500 pixels
        scrollByPixels(0, 500);
        Thread.sleep(1000);

        // Scroll up by 200 pixels
        scrollByPixels(0, -200);
        Thread.sleep(1000);

        // Scroll to specific position
        scrollToPosition(0, 1000);
        Thread.sleep(1000);

        // Scroll to bottom of page
        scrollToBottom();
        Thread.sleep(1000);

        // Scroll to top of page
        scrollToTop();
        Thread.sleep(1000);

        // Get current scroll position
        Long scrollY = getCurrentScrollPosition();
        System.out.println("Current Y scroll position: " + scrollY);

        // Get total scrollable height
        Long scrollHeight = getTotalScrollHeight();
        System.out.println("Total scroll height: " + scrollHeight);

        driver.quit();
    }

    // Scroll by relative pixels
    public static void scrollByPixels(int x, int y) {
        js.executeScript("window.scrollBy(arguments[0], arguments[1]);", x, y);
    }

    // Scroll to absolute position
    public static void scrollToPosition(int x, int y) {
        js.executeScript("window.scrollTo(arguments[0], arguments[1]);", x, y);
    }

    // Scroll to bottom
    public static void scrollToBottom() {
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    }

    // Scroll to top
    public static void scrollToTop() {
        js.executeScript("window.scrollTo(0, 0);");
    }

    // Get current scroll position
    public static Long getCurrentScrollPosition() {
        return (Long) js.executeScript("return window.pageYOffset;");
    }

    // Get total scrollable height
    public static Long getTotalScrollHeight() {
        return (Long) js.executeScript("return document.body.scrollHeight;");
    }
}
```

### 3. Horizontal Scrolling

Handle horizontal scrolling in web pages:

```java
public class HorizontalScrolling {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/wide-content");
        driver.manage().window().maximize();

        // Scroll right by 500 pixels
        js.executeScript("window.scrollBy(500, 0);");
        Thread.sleep(1000);

        // Scroll left by 200 pixels
        js.executeScript("window.scrollBy(-200, 0);");
        Thread.sleep(1000);

        // Scroll to rightmost position
        js.executeScript("window.scrollTo(document.body.scrollWidth, 0);");
        Thread.sleep(1000);

        // Scroll to leftmost position
        js.executeScript("window.scrollTo(0, 0);");
        Thread.sleep(1000);

        // Scroll horizontally within a container
        WebElement container = driver.findElement(By.id("scrollable-container"));
        js.executeScript("arguments[0].scrollLeft = 300;", container);
        Thread.sleep(1000);

        // Get horizontal scroll position
        Long scrollX = (Long) js.executeScript("return window.pageXOffset;");
        System.out.println("Horizontal scroll position: " + scrollX);

        // Get total scrollable width
        Long scrollWidth = (Long) js.executeScript("return document.body.scrollWidth;");
        System.out.println("Total scroll width: " + scrollWidth);

        driver.quit();
    }
}
```

### 4. Infinite Scroll Handling

Handle infinite scrolling pages (social media, news feeds):

```java
import java.time.Duration;

public class InfiniteScrollHandler {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/infinite-scroll");
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        // Method 1: Scroll until end (with max iterations)
        scrollToEndOfInfinitePage(driver, js, 10);

        // Method 2: Scroll until specific number of items loaded
        scrollUntilItemsLoaded(driver, js, 50);

        // Method 3: Scroll for specific time duration
        scrollForDuration(js, 30000); // 30 seconds

        driver.quit();
    }

    // Scroll until no more content loads
    public static void scrollToEndOfInfinitePage(WebDriver driver, JavascriptExecutor js, int maxScrolls) {
        Long lastHeight = (Long) js.executeScript("return document.body.scrollHeight");
        int scrollCount = 0;

        while (scrollCount < maxScrolls) {
            // Scroll to bottom
            js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

            // Wait for content to load
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // Calculate new height
            Long newHeight = (Long) js.executeScript("return document.body.scrollHeight");

            // Break if no new content loaded
            if (newHeight.equals(lastHeight)) {
                System.out.println("Reached end of content after " + scrollCount + " scrolls");
                break;
            }

            lastHeight = newHeight;
            scrollCount++;
            System.out.println("Scroll " + scrollCount + ": New height = " + newHeight);
        }
    }

    // Scroll until specific number of items loaded
    public static void scrollUntilItemsLoaded(WebDriver driver, JavascriptExecutor js, int targetCount) {
        int currentCount = 0;
        int scrollAttempts = 0;
        int maxAttempts = 50;

        while (currentCount < targetCount && scrollAttempts < maxAttempts) {
            // Get current count of items
            currentCount = driver.findElements(By.className("post-item")).size();
            System.out.println("Current items loaded: " + currentCount);

            if (currentCount >= targetCount) {
                System.out.println("Target count reached: " + currentCount);
                break;
            }

            // Scroll down
            js.executeScript("window.scrollBy(0, 1000);");

            // Wait for new content
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            scrollAttempts++;
        }
    }

    // Scroll continuously for specified duration
    public static void scrollForDuration(JavascriptExecutor js, long durationMs) {
        long startTime = System.currentTimeMillis();
        long endTime = startTime + durationMs;

        while (System.currentTimeMillis() < endTime) {
            js.executeScript("window.scrollBy(0, 500);");

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("Scrolling completed for " + durationMs + "ms");
    }
}
```

### 5. Smooth vs Instant Scrolling

Control scrolling behavior:

```java
public class ScrollBehavior {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/long-page");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("section-5"));

        // Instant scroll (default)
        js.executeScript("arguments[0].scrollIntoView();", element);
        Thread.sleep(2000);

        // Smooth scroll
        js.executeScript(
            "arguments[0].scrollIntoView({behavior: 'smooth'});",
            element
        );
        Thread.sleep(3000);

        // Smooth scroll with alignment options
        js.executeScript(
            "arguments[0].scrollIntoView({" +
            "  behavior: 'smooth', " +
            "  block: 'center', " +    // 'start', 'center', 'end', 'nearest'
            "  inline: 'nearest'" +     // 'start', 'center', 'end', 'nearest'
            "});",
            element
        );
        Thread.sleep(3000);

        // Custom smooth scroll animation
        smoothScrollToElement(js, element, 1000);

        driver.quit();
    }

    // Custom smooth scroll implementation
    public static void smoothScrollToElement(JavascriptExecutor js, WebElement element, int duration) {
        js.executeScript(
            "var element = arguments[0];" +
            "var duration = arguments[1];" +
            "var targetPosition = element.getBoundingClientRect().top + window.pageYOffset;" +
            "var startPosition = window.pageYOffset;" +
            "var distance = targetPosition - startPosition;" +
            "var startTime = null;" +

            "function animation(currentTime) {" +
            "  if (startTime === null) startTime = currentTime;" +
            "  var timeElapsed = currentTime - startTime;" +
            "  var run = ease(timeElapsed, startPosition, distance, duration);" +
            "  window.scrollTo(0, run);" +
            "  if (timeElapsed < duration) requestAnimationFrame(animation);" +
            "}" +

            "function ease(t, b, c, d) {" +
            "  t /= d / 2;" +
            "  if (t < 1) return c / 2 * t * t + b;" +
            "  t--;" +
            "  return -c / 2 * (t * (t - 2) - 1) + b;" +
            "}" +

            "requestAnimationFrame(animation);",
            element, duration
        );
    }
}
```

## Element Manipulation

### 1. Click Hidden or Disabled Elements

Click elements that cannot be clicked using standard Selenium methods:

```java
public class ClickHiddenElements {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        // Click hidden element
        WebElement hiddenButton = driver.findElement(By.id("hidden-button"));
        js.executeScript("arguments[0].click();", hiddenButton);

        // Click disabled element
        WebElement disabledButton = driver.findElement(By.id("disabled-button"));
        js.executeScript("arguments[0].click();", disabledButton);

        // Click element behind overlay
        WebElement overlayedButton = driver.findElement(By.id("overlayed-button"));
        js.executeScript("arguments[0].click();", overlayedButton);

        // Click element with display:none
        js.executeScript(
            "var element = document.getElementById('display-none-button');" +
            "element.style.display = 'block';" +
            "element.click();" +
            "element.style.display = 'none';"
        );

        // Force click at coordinates
        WebElement element = driver.findElement(By.id("difficult-element"));
        js.executeScript(
            "var element = arguments[0];" +
            "var clickEvent = new MouseEvent('click', {" +
            "  view: window," +
            "  bubbles: true," +
            "  cancelable: true" +
            "});" +
            "element.dispatchEvent(clickEvent);",
            element
        );

        driver.quit();
    }
}
```

### 2. Modify Element Attributes

Change element attributes dynamically:

```java
public class ModifyAttributes {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/form");
        driver.manage().window().maximize();

        WebElement input = driver.findElement(By.id("username"));

        // Set attribute
        js.executeScript("arguments[0].setAttribute('value', 'testuser');", input);

        // Change attribute
        js.executeScript("arguments[0].setAttribute('placeholder', 'Enter username here');", input);

        // Remove attribute
        js.executeScript("arguments[0].removeAttribute('readonly');", input);

        // Get attribute
        String maxLength = (String) js.executeScript(
            "return arguments[0].getAttribute('maxlength');",
            input
        );
        System.out.println("Max length: " + maxLength);

        // Set multiple attributes
        js.executeScript(
            "arguments[0].setAttribute('maxlength', '50');" +
            "arguments[0].setAttribute('autocomplete', 'off');" +
            "arguments[0].setAttribute('spellcheck', 'false');",
            input
        );

        // Change type attribute (e.g., password to text)
        WebElement password = driver.findElement(By.id("password"));
        js.executeScript("arguments[0].setAttribute('type', 'text');", password);
        Thread.sleep(2000);
        js.executeScript("arguments[0].setAttribute('type', 'password');", password);

        // Disable element
        WebElement submitBtn = driver.findElement(By.id("submit"));
        js.executeScript("arguments[0].setAttribute('disabled', 'true');", submitBtn);

        // Enable element
        js.executeScript("arguments[0].removeAttribute('disabled');", submitBtn);

        driver.quit();
    }
}
```

### 3. Change Element Properties

Modify element properties and styles:

```java
public class ModifyProperties {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("target-element"));

        // Change text content
        js.executeScript("arguments[0].textContent = 'New Text Content';", element);
        Thread.sleep(1000);

        // Change inner HTML
        js.executeScript("arguments[0].innerHTML = '<strong>Bold Text</strong>';", element);
        Thread.sleep(1000);

        // Change outer HTML
        js.executeScript(
            "arguments[0].outerHTML = '<div id=\"target-element\">Replaced Element</div>';",
            element
        );
        Thread.sleep(1000);

        // Change value property
        WebElement input = driver.findElement(By.id("email"));
        js.executeScript("arguments[0].value = 'test@example.com';", input);

        // Change checked property
        WebElement checkbox = driver.findElement(By.id("terms"));
        js.executeScript("arguments[0].checked = true;", checkbox);
        Thread.sleep(1000);
        js.executeScript("arguments[0].checked = false;", checkbox);

        // Change selected property
        WebElement option = driver.findElement(By.xpath("//option[@value='option2']"));
        js.executeScript("arguments[0].selected = true;", option);

        // Change readonly property
        js.executeScript("arguments[0].readOnly = false;", input);

        // Change disabled property
        WebElement button = driver.findElement(By.id("submit-btn"));
        js.executeScript("arguments[0].disabled = true;", button);
        Thread.sleep(1000);
        js.executeScript("arguments[0].disabled = false;", button);

        driver.quit();
    }
}
```

### 4. Add/Remove CSS Classes

Manipulate element CSS classes:

```java
public class ManipulateCSSClasses {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("target"));

        // Add single class
        js.executeScript("arguments[0].classList.add('highlight');", element);
        Thread.sleep(1000);

        // Add multiple classes
        js.executeScript(
            "arguments[0].classList.add('active', 'primary', 'large');",
            element
        );
        Thread.sleep(1000);

        // Remove class
        js.executeScript("arguments[0].classList.remove('highlight');", element);
        Thread.sleep(1000);

        // Toggle class
        js.executeScript("arguments[0].classList.toggle('active');", element);
        Thread.sleep(1000);
        js.executeScript("arguments[0].classList.toggle('active');", element);
        Thread.sleep(1000);

        // Check if class exists
        Boolean hasClass = (Boolean) js.executeScript(
            "return arguments[0].classList.contains('primary');",
            element
        );
        System.out.println("Has 'primary' class: " + hasClass);

        // Replace class
        js.executeScript(
            "arguments[0].classList.replace('primary', 'secondary');",
            element
        );
        Thread.sleep(1000);

        // Get all classes
        String classes = (String) js.executeScript(
            "return arguments[0].className;",
            element
        );
        System.out.println("All classes: " + classes);

        // Set classes directly
        js.executeScript("arguments[0].className = 'new-class another-class';", element);

        driver.quit();
    }
}
```

### 5. Modify CSS Styles

Change element styles dynamically:

```java
public class ModifyStyles {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("target"));

        // Change single style property
        js.executeScript("arguments[0].style.backgroundColor = 'yellow';", element);
        Thread.sleep(1000);

        // Change multiple style properties
        js.executeScript(
            "arguments[0].style.border = '3px solid red';" +
            "arguments[0].style.padding = '10px';" +
            "arguments[0].style.fontSize = '20px';" +
            "arguments[0].style.color = 'blue';",
            element
        );
        Thread.sleep(1000);

        // Hide element
        js.executeScript("arguments[0].style.display = 'none';", element);
        Thread.sleep(1000);

        // Show element
        js.executeScript("arguments[0].style.display = 'block';", element);
        Thread.sleep(1000);

        // Change visibility
        js.executeScript("arguments[0].style.visibility = 'hidden';", element);
        Thread.sleep(1000);
        js.executeScript("arguments[0].style.visibility = 'visible';", element);

        // Change opacity
        js.executeScript("arguments[0].style.opacity = '0.5';", element);
        Thread.sleep(1000);
        js.executeScript("arguments[0].style.opacity = '1';", element);

        // Get computed style
        String bgColor = (String) js.executeScript(
            "return window.getComputedStyle(arguments[0]).backgroundColor;",
            element
        );
        System.out.println("Background color: " + bgColor);

        // Remove style property
        js.executeScript("arguments[0].style.removeProperty('background-color');", element);

        // Highlight element (utility method)
        highlightElement(js, element);
        Thread.sleep(1000);
        unhighlightElement(js, element);

        driver.quit();
    }

    public static void highlightElement(JavascriptExecutor js, WebElement element) {
        js.executeScript(
            "arguments[0].style.border = '3px solid red';" +
            "arguments[0].style.backgroundColor = 'yellow';",
            element
        );
    }

    public static void unhighlightElement(JavascriptExecutor js, WebElement element) {
        js.executeScript(
            "arguments[0].style.border = '';" +
            "arguments[0].style.backgroundColor = '';",
            element
        );
    }
}
```

## Working with the DOM

### 1. Getting Element Properties

Retrieve various element properties and information:

```java
import java.util.Map;

public class GetElementProperties {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("target"));

        // Get element dimensions and position
        Map<String, Object> elementInfo = (Map<String, Object>) js.executeScript(
            "var rect = arguments[0].getBoundingClientRect();" +
            "return {" +
            "  x: rect.x," +
            "  y: rect.y," +
            "  width: rect.width," +
            "  height: rect.height," +
            "  top: rect.top," +
            "  right: rect.right," +
            "  bottom: rect.bottom," +
            "  left: rect.left" +
            "};",
            element
        );
        System.out.println("Element info: " + elementInfo);

        // Get element tag name
        String tagName = (String) js.executeScript("return arguments[0].tagName;", element);
        System.out.println("Tag name: " + tagName);

        // Get element ID
        String id = (String) js.executeScript("return arguments[0].id;", element);
        System.out.println("ID: " + id);

        // Get element text content
        String text = (String) js.executeScript("return arguments[0].textContent;", element);
        System.out.println("Text: " + text);

        // Get element inner text
        String innerText = (String) js.executeScript("return arguments[0].innerText;", element);
        System.out.println("Inner text: " + innerText);

        // Get element value (for inputs)
        WebElement input = driver.findElement(By.id("username"));
        String value = (String) js.executeScript("return arguments[0].value;", input);
        System.out.println("Input value: " + value);

        // Check if element is visible
        Boolean isVisible = (Boolean) js.executeScript(
            "return arguments[0].offsetParent !== null;",
            element
        );
        System.out.println("Is visible: " + isVisible);

        // Check if element is in viewport
        Boolean isInViewport = (Boolean) js.executeScript(
            "var rect = arguments[0].getBoundingClientRect();" +
            "return (" +
            "  rect.top >= 0 &&" +
            "  rect.left >= 0 &&" +
            "  rect.bottom <= window.innerHeight &&" +
            "  rect.right <= window.innerWidth" +
            ");",
            element
        );
        System.out.println("Is in viewport: " + isInViewport);

        // Get all attributes
        Map<String, Object> attributes = (Map<String, Object>) js.executeScript(
            "var items = {};" +
            "for (var i = 0; i < arguments[0].attributes.length; i++) {" +
            "  items[arguments[0].attributes[i].name] = arguments[0].attributes[i].value;" +
            "}" +
            "return items;",
            element
        );
        System.out.println("All attributes: " + attributes);

        // Get computed styles
        Map<String, Object> styles = (Map<String, Object>) js.executeScript(
            "var styles = window.getComputedStyle(arguments[0]);" +
            "return {" +
            "  color: styles.color," +
            "  fontSize: styles.fontSize," +
            "  fontWeight: styles.fontWeight," +
            "  display: styles.display," +
            "  position: styles.position" +
            "};",
            element
        );
        System.out.println("Computed styles: " + styles);

        driver.quit();
    }
}
```

### 2. DOM Traversal

Navigate through the DOM tree:

```java
import java.util.List;

public class DOMTraversal {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("target"));

        // Get parent element
        WebElement parent = (WebElement) js.executeScript(
            "return arguments[0].parentElement;",
            element
        );
        System.out.println("Parent: " + parent.getTagName());

        // Get all children
        List<WebElement> children = (List<WebElement>) js.executeScript(
            "return arguments[0].children;",
            element
        );
        System.out.println("Number of children: " + children.size());

        // Get first child
        WebElement firstChild = (WebElement) js.executeScript(
            "return arguments[0].firstElementChild;",
            element
        );

        // Get last child
        WebElement lastChild = (WebElement) js.executeScript(
            "return arguments[0].lastElementChild;",
            element
        );

        // Get next sibling
        WebElement nextSibling = (WebElement) js.executeScript(
            "return arguments[0].nextElementSibling;",
            element
        );

        // Get previous sibling
        WebElement prevSibling = (WebElement) js.executeScript(
            "return arguments[0].previousElementSibling;",
            element
        );

        // Get all siblings
        List<WebElement> siblings = (List<WebElement>) js.executeScript(
            "var siblings = [];" +
            "var elem = arguments[0].parentElement.firstElementChild;" +
            "while (elem) {" +
            "  if (elem !== arguments[0]) siblings.push(elem);" +
            "  elem = elem.nextElementSibling;" +
            "}" +
            "return siblings;",
            element
        );
        System.out.println("Number of siblings: " + siblings.size());

        // Get closest ancestor matching selector
        WebElement ancestor = (WebElement) js.executeScript(
            "return arguments[0].closest('.container');",
            element
        );

        // Get all ancestors
        List<WebElement> ancestors = (List<WebElement>) js.executeScript(
            "var ancestors = [];" +
            "var elem = arguments[0].parentElement;" +
            "while (elem) {" +
            "  ancestors.push(elem);" +
            "  elem = elem.parentElement;" +
            "}" +
            "return ancestors;",
            element
        );
        System.out.println("Number of ancestors: " + ancestors.size());

        // Get all descendants
        List<WebElement> descendants = (List<WebElement>) js.executeScript(
            "return arguments[0].querySelectorAll('*');",
            element
        );
        System.out.println("Number of descendants: " + descendants.size());

        driver.quit();
    }
}
```

### 3. Finding Elements by JavaScript

Use JavaScript selectors to find elements:

```java
public class FindElementsByJS {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        // Find element by ID
        WebElement byId = (WebElement) js.executeScript(
            "return document.getElementById('username');"
        );

        // Find element by class name
        WebElement byClass = (WebElement) js.executeScript(
            "return document.getElementsByClassName('form-control')[0];"
        );

        // Find element by tag name
        WebElement byTag = (WebElement) js.executeScript(
            "return document.getElementsByTagName('input')[0];"
        );

        // Find element by name attribute
        WebElement byName = (WebElement) js.executeScript(
            "return document.getElementsByName('email')[0];"
        );

        // Find element by querySelector
        WebElement byQuery = (WebElement) js.executeScript(
            "return document.querySelector('input[type=\"text\"]');"
        );

        // Find multiple elements by querySelectorAll
        List<WebElement> allInputs = (List<WebElement>) js.executeScript(
            "return document.querySelectorAll('input');"
        );
        System.out.println("Total inputs: " + allInputs.size());

        // Find elements by complex selector
        List<WebElement> complexQuery = (List<WebElement>) js.executeScript(
            "return document.querySelectorAll('form .required input:not([type=\"hidden\"])');"
        );

        // Find element by XPath using JavaScript
        WebElement byXPath = (WebElement) js.executeScript(
            "return document.evaluate(" +
            "  '//input[@id=\"username\"]', " +
            "  document, " +
            "  null, " +
            "  XPathResult.FIRST_ORDERED_NODE_TYPE, " +
            "  null" +
            ").singleNodeValue;"
        );

        // Find elements by attribute value
        List<WebElement> byAttribute = (List<WebElement>) js.executeScript(
            "return Array.from(document.querySelectorAll('[data-testid]'));"
        );

        // Find elements by text content
        List<WebElement> byText = (List<WebElement>) js.executeScript(
            "var xpath = \"//*[contains(text(), '\" + arguments[0] + \"')]\";" +
            "var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);" +
            "var elements = [];" +
            "for (var i = 0; i < result.snapshotLength; i++) {" +
            "  elements.push(result.snapshotItem(i));" +
            "}" +
            "return elements;",
            "Search"
        );

        // Find visible elements only
        List<WebElement> visibleElements = (List<WebElement>) js.executeScript(
            "var all = document.querySelectorAll('input');" +
            "return Array.from(all).filter(function(el) {" +
            "  return el.offsetParent !== null;" +
            "});"
        );

        driver.quit();
    }
}
```

### 4. DOM Manipulation

Create, modify, and remove DOM elements:

```java
public class DOMManipulation {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        // Create new element
        js.executeScript(
            "var div = document.createElement('div');" +
            "div.id = 'new-element';" +
            "div.textContent = 'Dynamically created element';" +
            "div.style.backgroundColor = 'yellow';" +
            "div.style.padding = '10px';" +
            "document.body.appendChild(div);"
        );
        Thread.sleep(2000);

        // Insert element before another
        WebElement reference = driver.findElement(By.id("target"));
        js.executeScript(
            "var div = document.createElement('div');" +
            "div.textContent = 'Inserted before';" +
            "arguments[0].parentNode.insertBefore(div, arguments[0]);",
            reference
        );
        Thread.sleep(2000);

        // Insert element after another
        js.executeScript(
            "var div = document.createElement('div');" +
            "div.textContent = 'Inserted after';" +
            "arguments[0].parentNode.insertBefore(div, arguments[0].nextSibling);",
            reference
        );
        Thread.sleep(2000);

        // Append child to element
        js.executeScript(
            "var span = document.createElement('span');" +
            "span.textContent = ' Appended text';" +
            "arguments[0].appendChild(span);",
            reference
        );
        Thread.sleep(2000);

        // Remove element
        WebElement toRemove = driver.findElement(By.id("new-element"));
        js.executeScript("arguments[0].remove();", toRemove);
        Thread.sleep(2000);

        // Clone element
        js.executeScript(
            "var clone = arguments[0].cloneNode(true);" +
            "clone.id = 'cloned-element';" +
            "arguments[0].parentNode.appendChild(clone);",
            reference
        );
        Thread.sleep(2000);

        // Replace element
        js.executeScript(
            "var newElement = document.createElement('div');" +
            "newElement.textContent = 'Replacement element';" +
            "arguments[0].parentNode.replaceChild(newElement, arguments[0]);",
            driver.findElement(By.id("cloned-element"))
        );

        driver.quit();
    }
}
```

## Form Interactions via JavaScript

### 1. Setting Form Values

Set form field values using JavaScript:

```java
public class SetFormValues {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/form");
        driver.manage().window().maximize();

        // Set text input value
        WebElement username = driver.findElement(By.id("username"));
        js.executeScript("arguments[0].value = 'testuser';", username);

        // Set password input value
        WebElement password = driver.findElement(By.id("password"));
        js.executeScript("arguments[0].value = 'Test@123';", password);

        // Set textarea value
        WebElement comments = driver.findElement(By.id("comments"));
        js.executeScript("arguments[0].value = 'This is a test comment';", comments);

        // Check checkbox
        WebElement checkbox = driver.findElement(By.id("terms"));
        js.executeScript("arguments[0].checked = true;", checkbox);

        // Uncheck checkbox
        Thread.sleep(1000);
        js.executeScript("arguments[0].checked = false;", checkbox);

        // Select radio button
        WebElement radio = driver.findElement(By.id("option1"));
        js.executeScript("arguments[0].checked = true;", radio);

        // Select dropdown option by value
        WebElement dropdown = driver.findElement(By.id("country"));
        js.executeScript("arguments[0].value = 'USA';", dropdown);

        // Select dropdown option by index
        js.executeScript("arguments[0].selectedIndex = 2;", dropdown);

        // Select multiple options in multi-select
        WebElement multiSelect = driver.findElement(By.id("languages"));
        js.executeScript(
            "var options = arguments[0].options;" +
            "for (var i = 0; i < options.length; i++) {" +
            "  if (i === 0 || i === 2) {" +
            "    options[i].selected = true;" +
            "  }" +
            "}",
            multiSelect
        );

        // Set date input value
        WebElement dateInput = driver.findElement(By.id("birthdate"));
        js.executeScript("arguments[0].value = '2000-01-15';", dateInput);

        // Set file input (limited - see file upload section for better approach)
        WebElement fileInput = driver.findElement(By.id("upload"));
        js.executeScript(
            "arguments[0].style.display = 'block';" +
            "arguments[0].style.visibility = 'visible';",
            fileInput
        );

        // Set range/slider value
        WebElement slider = driver.findElement(By.id("volume"));
        js.executeScript("arguments[0].value = 75;", slider);

        driver.quit();
    }
}
```

### 2. Triggering Events

Trigger various DOM events programmatically:

```java
public class TriggerEvents {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/form");
        driver.manage().window().maximize();

        WebElement input = driver.findElement(By.id("username"));

        // Trigger focus event
        js.executeScript("arguments[0].focus();", input);
        Thread.sleep(1000);

        // Trigger blur event
        js.executeScript("arguments[0].blur();", input);
        Thread.sleep(1000);

        // Trigger change event
        js.executeScript(
            "arguments[0].value = 'newvalue';" +
            "var event = new Event('change', { bubbles: true });" +
            "arguments[0].dispatchEvent(event);",
            input
        );
        Thread.sleep(1000);

        // Trigger input event
        js.executeScript(
            "var event = new Event('input', { bubbles: true });" +
            "arguments[0].dispatchEvent(event);",
            input
        );

        // Trigger click event
        WebElement button = driver.findElement(By.id("submit"));
        js.executeScript(
            "var event = new MouseEvent('click', {" +
            "  view: window," +
            "  bubbles: true," +
            "  cancelable: true" +
            "});" +
            "arguments[0].dispatchEvent(event);",
            button
        );
        Thread.sleep(1000);

        // Trigger double click event
        js.executeScript(
            "var event = new MouseEvent('dblclick', {" +
            "  view: window," +
            "  bubbles: true," +
            "  cancelable: true" +
            "});" +
            "arguments[0].dispatchEvent(event);",
            button
        );

        // Trigger mouseover event
        js.executeScript(
            "var event = new MouseEvent('mouseover', {" +
            "  view: window," +
            "  bubbles: true," +
            "  cancelable: true" +
            "});" +
            "arguments[0].dispatchEvent(event);",
            button
        );
        Thread.sleep(1000);

        // Trigger keydown event
        js.executeScript(
            "var event = new KeyboardEvent('keydown', {" +
            "  key: 'Enter'," +
            "  code: 'Enter'," +
            "  keyCode: 13," +
            "  bubbles: true" +
            "});" +
            "arguments[0].dispatchEvent(event);",
            input
        );

        // Trigger custom event
        js.executeScript(
            "var event = new CustomEvent('myCustomEvent', {" +
            "  detail: { message: 'Custom event triggered' }," +
            "  bubbles: true" +
            "});" +
            "arguments[0].dispatchEvent(event);",
            input
        );

        // Trigger submit event on form
        WebElement form = driver.findElement(By.id("myForm"));
        js.executeScript(
            "var event = new Event('submit', {" +
            "  bubbles: true," +
            "  cancelable: true" +
            "});" +
            "arguments[0].dispatchEvent(event);",
            form
        );

        driver.quit();
    }
}
```

### 3. Form Validation Bypass

Bypass client-side form validation:

```java
public class BypassValidation {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/form");
        driver.manage().window().maximize();

        // Remove required attribute
        WebElement requiredField = driver.findElement(By.id("email"));
        js.executeScript("arguments[0].removeAttribute('required');", requiredField);

        // Remove pattern validation
        js.executeScript("arguments[0].removeAttribute('pattern');", requiredField);

        // Remove minlength/maxlength
        js.executeScript(
            "arguments[0].removeAttribute('minlength');" +
            "arguments[0].removeAttribute('maxlength');",
            requiredField
        );

        // Disable HTML5 validation on form
        WebElement form = driver.findElement(By.id("myForm"));
        js.executeScript("arguments[0].setAttribute('novalidate', 'true');", form);

        // Override validation method
        js.executeScript(
            "arguments[0].checkValidity = function() { return true; };" +
            "arguments[0].reportValidity = function() { return true; };",
            requiredField
        );

        // Remove readonly attribute
        WebElement readonlyField = driver.findElement(By.id("readonly-field"));
        js.executeScript("arguments[0].removeAttribute('readonly');", readonlyField);

        // Enable disabled field
        WebElement disabledField = driver.findElement(By.id("disabled-field"));
        js.executeScript("arguments[0].removeAttribute('disabled');", disabledField);

        // Change input type to bypass validation
        WebElement emailField = driver.findElement(By.id("email-field"));
        js.executeScript("arguments[0].setAttribute('type', 'text');", emailField);

        // Submit form without validation
        js.executeScript("arguments[0].submit();", form);

        driver.quit();
    }
}
```

## Browser and Window Operations

### 1. Window Size and Position

Control browser window dimensions and position:

```java
public class WindowOperations {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");

        // Get window dimensions
        Long windowWidth = (Long) js.executeScript("return window.innerWidth;");
        Long windowHeight = (Long) js.executeScript("return window.innerHeight;");
        System.out.println("Window size: " + windowWidth + " x " + windowHeight);

        // Get outer window dimensions (including browser chrome)
        Long outerWidth = (Long) js.executeScript("return window.outerWidth;");
        Long outerHeight = (Long) js.executeScript("return window.outerHeight;");
        System.out.println("Outer size: " + outerWidth + " x " + outerHeight);

        // Get window position
        Long posX = (Long) js.executeScript("return window.screenX;");
        Long posY = (Long) js.executeScript("return window.screenY;");
        System.out.println("Window position: " + posX + ", " + posY);

        // Get screen resolution
        Long screenWidth = (Long) js.executeScript("return screen.width;");
        Long screenHeight = (Long) js.executeScript("return screen.height;");
        System.out.println("Screen resolution: " + screenWidth + " x " + screenHeight);

        // Get available screen size (excluding taskbar)
        Long availWidth = (Long) js.executeScript("return screen.availWidth;");
        Long availHeight = (Long) js.executeScript("return screen.availHeight;");
        System.out.println("Available screen: " + availWidth + " x " + availHeight);

        // Resize window
        js.executeScript("window.resizeTo(1024, 768);");
        Thread.sleep(2000);

        // Resize window by delta
        js.executeScript("window.resizeBy(100, 100);");
        Thread.sleep(2000);

        // Move window to specific position
        js.executeScript("window.moveTo(100, 100);");
        Thread.sleep(2000);

        // Move window by delta
        js.executeScript("window.moveBy(50, 50);");
        Thread.sleep(2000);

        // Maximize window (alternative to driver.manage().window().maximize())
        js.executeScript(
            "window.moveTo(0, 0);" +
            "window.resizeTo(screen.availWidth, screen.availHeight);"
        );
        Thread.sleep(2000);

        // Get scroll bar width
        Long scrollBarWidth = (Long) js.executeScript(
            "return window.innerWidth - document.documentElement.clientWidth;"
        );
        System.out.println("Scrollbar width: " + scrollBarWidth);

        driver.quit();
    }
}
```

### 2. Opening New Windows and Tabs

Open and manage multiple windows/tabs:

```java
import java.util.Set;

public class MultipleWindowsJS {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        String mainWindow = driver.getWindowHandle();

        // Open new window
        js.executeScript("window.open('https://google.com', '_blank');");
        Thread.sleep(2000);

        // Open new tab
        js.executeScript("window.open('https://github.com', '_blank');");
        Thread.sleep(2000);

        // Open window with specific features
        js.executeScript(
            "window.open(" +
            "  'https://stackoverflow.com', " +
            "  'myWindow', " +
            "  'width=800,height=600,left=100,top=100'" +
            ");"
        );
        Thread.sleep(2000);

        // Get all window handles
        Set<String> windows = driver.getWindowHandles();
        System.out.println("Total windows: " + windows.size());

        // Switch to new window
        for (String window : windows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                System.out.println("Switched to: " + driver.getTitle());
                Thread.sleep(1000);
            }
        }

        // Close current window
        driver.close();

        // Switch back to main window
        driver.switchTo().window(mainWindow);

        // Open popup window
        js.executeScript(
            "var popup = window.open('', 'popup', 'width=400,height=300');" +
            "popup.document.write('<h1>Popup Window</h1>');" +
            "popup.document.close();"
        );
        Thread.sleep(2000);

        driver.quit();
    }
}
```

### 3. Browser Zoom Level

Control browser zoom programmatically:

```java
public class BrowserZoom {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        // Get current zoom level
        String currentZoom = (String) js.executeScript(
            "return document.body.style.zoom || '100%';"
        );
        System.out.println("Current zoom: " + currentZoom);

        // Set zoom to 150%
        js.executeScript("document.body.style.zoom = '150%';");
        Thread.sleep(2000);

        // Set zoom to 75%
        js.executeScript("document.body.style.zoom = '75%';");
        Thread.sleep(2000);

        // Reset zoom to 100%
        js.executeScript("document.body.style.zoom = '100%';");
        Thread.sleep(2000);

        // Zoom using transform (alternative method)
        js.executeScript("document.body.style.transform = 'scale(1.5)';");
        Thread.sleep(2000);

        // Reset transform
        js.executeScript("document.body.style.transform = 'scale(1)';");
        Thread.sleep(2000);

        // Get device pixel ratio
        Double devicePixelRatio = (Double) js.executeScript("return window.devicePixelRatio;");
        System.out.println("Device pixel ratio: " + devicePixelRatio);

        driver.quit();
    }
}
```

## Performance and Timing

### 1. Page Load Complete Check

Verify page load completion:

```java
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedCondition;
import java.time.Duration;

public class PageLoadComplete {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");

        // Check document ready state
        String readyState = (String) js.executeScript("return document.readyState;");
        System.out.println("Ready state: " + readyState);

        // Wait for document ready state to be complete
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        wait.until((ExpectedCondition<Boolean>) wd ->
            js.executeScript("return document.readyState").equals("complete")
        );
        System.out.println("Page loaded completely");

        // Wait for jQuery to be loaded (if page uses jQuery)
        wait.until((ExpectedCondition<Boolean>) wd ->
            (Boolean) js.executeScript("return typeof jQuery != 'undefined'")
        );
        System.out.println("jQuery loaded");

        // Wait for jQuery AJAX calls to complete
        wait.until((ExpectedCondition<Boolean>) wd ->
            (Boolean) js.executeScript("return jQuery.active == 0")
        );
        System.out.println("jQuery AJAX calls completed");

        // Wait for Angular to be ready (if page uses Angular)
        wait.until((ExpectedCondition<Boolean>) wd ->
            (Boolean) js.executeScript(
                "return typeof angular !== 'undefined' && " +
                "angular.element(document).injector().get('$http').pendingRequests.length === 0"
            )
        );

        // Check if all images are loaded
        Boolean imagesLoaded = (Boolean) js.executeScript(
            "var images = document.getElementsByTagName('img');" +
            "for (var i = 0; i < images.length; i++) {" +
            "  if (!images[i].complete) return false;" +
            "}" +
            "return true;"
        );
        System.out.println("All images loaded: " + imagesLoaded);

        // Get page load timing information
        Map<String, Object> timing = (Map<String, Object>) js.executeScript(
            "var timing = window.performance.timing;" +
            "return {" +
            "  navigationStart: timing.navigationStart," +
            "  responseEnd: timing.responseEnd," +
            "  domComplete: timing.domComplete," +
            "  loadEventEnd: timing.loadEventEnd" +
            "};"
        );
        System.out.println("Page timing: " + timing);

        // Calculate page load time
        Long loadTime = (Long) js.executeScript(
            "return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;"
        );
        System.out.println("Page load time: " + loadTime + "ms");

        driver.quit();
    }
}
```

### 2. AJAX Completion Detection

Detect when AJAX requests complete:

```java
public class AJAXDetection {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        driver.get("https://example.com/ajax-page");
        driver.manage().window().maximize();

        // Click button that triggers AJAX
        driver.findElement(By.id("load-data")).click();

        // Wait for jQuery AJAX to complete
        wait.until((ExpectedCondition<Boolean>) wd ->
            (Boolean) js.executeScript("return jQuery.active === 0")
        );
        System.out.println("jQuery AJAX completed");

        // Wait for fetch requests to complete (modern approach)
        wait.until((ExpectedCondition<Boolean>) wd ->
            (Boolean) js.executeScript(
                "return window.performance.getEntriesByType('resource')" +
                ".filter(r => r.initiatorType === 'fetch' && r.responseEnd === 0).length === 0"
            )
        );
        System.out.println("Fetch requests completed");

        // Monitor XMLHttpRequest
        js.executeScript(
            "window.ajaxRequestCount = 0;" +
            "var oldOpen = XMLHttpRequest.prototype.open;" +
            "XMLHttpRequest.prototype.open = function() {" +
            "  window.ajaxRequestCount++;" +
            "  this.addEventListener('loadend', function() {" +
            "    window.ajaxRequestCount--;" +
            "  });" +
            "  return oldOpen.apply(this, arguments);" +
            "};"
        );

        // Trigger some action
        driver.findElement(By.id("another-button")).click();

        // Wait for monitored AJAX to complete
        wait.until((ExpectedCondition<Boolean>) wd ->
            ((Long) js.executeScript("return window.ajaxRequestCount")).equals(0L)
        );
        System.out.println("Monitored AJAX completed");

        // Wait for specific API call to complete
        wait.until((ExpectedCondition<Boolean>) wd ->
            (Boolean) js.executeScript(
                "return window.performance.getEntriesByName(" +
                "  'https://api.example.com/data'" +
                ").length > 0"
            )
        );
        System.out.println("Specific API call completed");

        // Get all resource timing data
        List<Map<String, Object>> resources = (List<Map<String, Object>>) js.executeScript(
            "return window.performance.getEntriesByType('resource').map(r => ({" +
            "  name: r.name," +
            "  duration: r.duration," +
            "  initiatorType: r.initiatorType" +
            "}));"
        );
        System.out.println("Total resources loaded: " + resources.size());

        driver.quit();
    }
}
```

### 3. Custom Timing Marks

Create custom performance marks:

```java
public class CustomTimingMarks {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        // Create performance mark
        js.executeScript("performance.mark('test-start');");

        // Perform some actions
        driver.findElement(By.id("search")).sendKeys("test query");
        Thread.sleep(1000);
        driver.findElement(By.id("search-button")).click();
        Thread.sleep(2000);

        // Create end mark
        js.executeScript("performance.mark('test-end');");

        // Measure duration between marks
        js.executeScript("performance.measure('test-duration', 'test-start', 'test-end');");

        // Get measurement
        Map<String, Object> measurement = (Map<String, Object>) js.executeScript(
            "var measures = performance.getEntriesByName('test-duration', 'measure');" +
            "if (measures.length > 0) {" +
            "  return {" +
            "    name: measures[0].name," +
            "    duration: measures[0].duration," +
            "    startTime: measures[0].startTime" +
            "  };" +
            "}" +
            "return null;"
        );

        if (measurement != null) {
            System.out.println("Test duration: " + measurement.get("duration") + "ms");
        }

        // Get all marks
        List<Map<String, Object>> marks = (List<Map<String, Object>>) js.executeScript(
            "return performance.getEntriesByType('mark').map(m => ({" +
            "  name: m.name," +
            "  startTime: m.startTime" +
            "}));"
        );
        System.out.println("Total marks: " + marks.size());

        // Clear marks
        js.executeScript("performance.clearMarks();");
        js.executeScript("performance.clearMeasures();");

        // Get navigation timing
        Map<String, Object> navTiming = (Map<String, Object>) js.executeScript(
            "var timing = performance.timing;" +
            "return {" +
            "  dnsLookup: timing.domainLookupEnd - timing.domainLookupStart," +
            "  tcpConnection: timing.connectEnd - timing.connectStart," +
            "  serverResponse: timing.responseEnd - timing.requestStart," +
            "  domProcessing: timing.domComplete - timing.domLoading," +
            "  totalLoad: timing.loadEventEnd - timing.navigationStart" +
            "};"
        );
        System.out.println("Navigation timing: " + navTiming);

        driver.quit();
    }
}
```

## Handling Shadow DOM

### 1. Accessing Shadow Root

Access elements within Shadow DOM:

```java
public class ShadowDOMAccess {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/shadow-dom");
        driver.manage().window().maximize();

        // Get shadow root from host element
        WebElement host = driver.findElement(By.id("shadow-host"));
        WebElement shadowRoot = (WebElement) js.executeScript(
            "return arguments[0].shadowRoot",
            host
        );

        if (shadowRoot != null) {
            System.out.println("Shadow root accessed successfully");

            // Find element inside shadow DOM
            WebElement shadowElement = (WebElement) js.executeScript(
                "return arguments[0].shadowRoot.querySelector('#shadow-content')",
                host
            );

            String text = shadowElement.getText();
            System.out.println("Shadow element text: " + text);

            // Click element in shadow DOM
            js.executeScript(
                "arguments[0].shadowRoot.querySelector('#shadow-button').click()",
                host
            );

            // Set value in shadow DOM input
            js.executeScript(
                "arguments[0].shadowRoot.querySelector('#shadow-input').value = 'test'",
                host
            );
        }

        driver.quit();
    }
}
```

### 2. Finding Elements in Shadow DOM

Navigate and find elements within Shadow DOM:

```java
public class ShadowDOMNavigation {

    private static JavascriptExecutor js;

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        js = (JavascriptExecutor) driver;

        driver.get("https://example.com/shadow-dom");
        driver.manage().window().maximize();

        // Single level shadow DOM
        WebElement element = findElementInShadowDOM(
            driver.findElement(By.id("shadow-host")),
            "#shadow-element"
        );

        if (element != null) {
            System.out.println("Found element: " + element.getText());
        }

        // Nested shadow DOM (multiple levels)
        WebElement nestedElement = findElementInNestedShadowDOM(
            new String[]{"#shadow-host1", "#shadow-host2"},
            "#final-element"
        );

        if (nestedElement != null) {
            System.out.println("Found nested element: " + nestedElement.getText());
        }

        // Get all elements in shadow DOM
        List<WebElement> allElements = getAllElementsInShadowDOM(
            driver.findElement(By.id("shadow-host")),
            "button"
        );
        System.out.println("Found " + allElements.size() + " buttons in shadow DOM");

        // Check if shadow root exists
        boolean hasShadowRoot = checkShadowRootExists(
            driver.findElement(By.id("shadow-host"))
        );
        System.out.println("Has shadow root: " + hasShadowRoot);

        driver.quit();
    }

    // Find element in single-level shadow DOM
    public static WebElement findElementInShadowDOM(WebElement host, String selector) {
        return (WebElement) js.executeScript(
            "return arguments[0].shadowRoot.querySelector(arguments[1])",
            host, selector
        );
    }

    // Find element in nested shadow DOM
    public static WebElement findElementInNestedShadowDOM(String[] shadowHosts, String finalSelector) {
        StringBuilder script = new StringBuilder("var element = document.querySelector(arguments[0]);");

        for (int i = 1; i < shadowHosts.length; i++) {
            script.append("element = element.shadowRoot.querySelector(arguments[").append(i).append("]);");
        }

        script.append("return element.shadowRoot.querySelector(arguments[").append(shadowHosts.length).append("]);");

        Object[] args = new Object[shadowHosts.length + 1];
        System.arraycopy(shadowHosts, 0, args, 0, shadowHosts.length);
        args[shadowHosts.length] = finalSelector;

        return (WebElement) js.executeScript(script.toString(), args);
    }

    // Get all elements matching selector in shadow DOM
    public static List<WebElement> getAllElementsInShadowDOM(WebElement host, String selector) {
        return (List<WebElement>) js.executeScript(
            "return arguments[0].shadowRoot.querySelectorAll(arguments[1])",
            host, selector
        );
    }

    // Check if element has shadow root
    public static boolean checkShadowRootExists(WebElement host) {
        return (boolean) js.executeScript(
            "return arguments[0].shadowRoot !== null",
            host
        );
    }
}
```

### 3. Interacting with Shadow DOM Elements

Perform various interactions within Shadow DOM:

```java
public class ShadowDOMInteractions {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/shadow-dom");
        driver.manage().window().maximize();

        WebElement host = driver.findElement(By.id("shadow-host"));

        // Click button in shadow DOM
        js.executeScript(
            "arguments[0].shadowRoot.querySelector('#shadow-button').click()",
            host
        );
        Thread.sleep(1000);

        // Enter text in shadow DOM input
        js.executeScript(
            "arguments[0].shadowRoot.querySelector('#shadow-input').value = 'Hello Shadow DOM'",
            host
        );
        Thread.sleep(1000);

        // Get text from shadow DOM element
        String text = (String) js.executeScript(
            "return arguments[0].shadowRoot.querySelector('#shadow-text').textContent",
            host
        );
        System.out.println("Text from shadow DOM: " + text);

        // Get attribute from shadow DOM element
        String attribute = (String) js.executeScript(
            "return arguments[0].shadowRoot.querySelector('#shadow-link').getAttribute('href')",
            host
        );
        System.out.println("Href attribute: " + attribute);

        // Change style of shadow DOM element
        js.executeScript(
            "arguments[0].shadowRoot.querySelector('#shadow-element').style.backgroundColor = 'yellow'",
            host
        );
        Thread.sleep(1000);

        // Add class to shadow DOM element
        js.executeScript(
            "arguments[0].shadowRoot.querySelector('#shadow-element').classList.add('highlight')",
            host
        );
        Thread.sleep(1000);

        // Check if shadow DOM element is visible
        Boolean isVisible = (Boolean) js.executeScript(
            "var elem = arguments[0].shadowRoot.querySelector('#shadow-element');" +
            "return elem.offsetParent !== null",
            host
        );
        System.out.println("Shadow element is visible: " + isVisible);

        // Scroll to shadow DOM element
        js.executeScript(
            "arguments[0].shadowRoot.querySelector('#shadow-element').scrollIntoView()",
            host
        );
        Thread.sleep(1000);

        // Get all data attributes from shadow DOM element
        Map<String, Object> dataAttributes = (Map<String, Object>) js.executeScript(
            "var elem = arguments[0].shadowRoot.querySelector('#shadow-element');" +
            "var data = {};" +
            "for (var key in elem.dataset) {" +
            "  data[key] = elem.dataset[key];" +
            "}" +
            "return data;",
            host
        );
        System.out.println("Data attributes: " + dataAttributes);

        driver.quit();
    }
}
```

## Advanced Use Cases

### 1. File Upload Alternative

Alternative approach to file upload:

```java
import java.io.File;

public class FileUploadJS {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com/upload");
        driver.manage().window().maximize();

        // Method 1: Make hidden file input visible and use sendKeys
        WebElement fileInput = driver.findElement(By.id("file-upload"));
        js.executeScript(
            "arguments[0].style.display = 'block';" +
            "arguments[0].style.visibility = 'visible';" +
            "arguments[0].style.opacity = '1';",
            fileInput
        );

        File file = new File("/path/to/file.txt");
        fileInput.sendKeys(file.getAbsolutePath());
        Thread.sleep(2000);

        // Method 2: Remove validation to allow direct file input
        js.executeScript(
            "arguments[0].removeAttribute('accept');" +
            "arguments[0].removeAttribute('required');",
            fileInput
        );

        // Method 3: Create and trigger file upload programmatically
        js.executeScript(
            "var input = document.createElement('input');" +
            "input.type = 'file';" +
            "input.id = 'custom-file-input';" +
            "input.style.display = 'block';" +
            "document.body.appendChild(input);"
        );

        WebElement customInput = driver.findElement(By.id("custom-file-input"));
        customInput.sendKeys(file.getAbsolutePath());

        // Method 4: Bypass file input and set files property (limited support)
        // Note: This typically doesn't work due to security restrictions
        js.executeScript(
            "var dt = new DataTransfer();" +
            "arguments[0].files = dt.files;",
            fileInput
        );

        driver.quit();
    }
}
```

### 2. Bypassing Element Visibility

Interact with invisible elements:

```java
public class BypassVisibility {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        // Click hidden element
        WebElement hiddenElement = driver.findElement(By.id("hidden-element"));
        js.executeScript("arguments[0].click();", hiddenElement);
        Thread.sleep(1000);

        // Make hidden element visible temporarily
        js.executeScript(
            "var elem = arguments[0];" +
            "var originalDisplay = elem.style.display;" +
            "elem.style.display = 'block';" +
            "setTimeout(function() { elem.style.display = originalDisplay; }, 100);",
            hiddenElement
        );
        Thread.sleep(1000);

        // Set value in hidden input
        WebElement hiddenInput = driver.findElement(By.id("hidden-input"));
        js.executeScript("arguments[0].value = 'hidden value';", hiddenInput);

        // Remove display:none
        js.executeScript("arguments[0].style.display = 'block';", hiddenElement);
        Thread.sleep(1000);

        // Remove visibility:hidden
        js.executeScript("arguments[0].style.visibility = 'visible';", hiddenElement);
        Thread.sleep(1000);

        // Remove opacity:0
        js.executeScript("arguments[0].style.opacity = '1';", hiddenElement);
        Thread.sleep(1000);

        // Remove height/width restrictions
        js.executeScript(
            "arguments[0].style.height = 'auto';" +
            "arguments[0].style.width = 'auto';",
            hiddenElement
        );
        Thread.sleep(1000);

        // Bring element to front (z-index)
        js.executeScript("arguments[0].style.zIndex = '9999';", hiddenElement);
        Thread.sleep(1000);

        // Remove overflow hidden on parent
        js.executeScript(
            "var parent = arguments[0].parentElement;" +
            "parent.style.overflow = 'visible';",
            hiddenElement
        );

        // Force element into viewport
        js.executeScript(
            "arguments[0].style.position = 'fixed';" +
            "arguments[0].style.top = '50%';" +
            "arguments[0].style.left = '50%';" +
            "arguments[0].style.transform = 'translate(-50%, -50%)';",
            hiddenElement
        );
        Thread.sleep(2000);

        driver.quit();
    }
}
```

### 3. Custom Event Triggering

Trigger complex custom events:

```java
public class CustomEventTriggers {

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("target"));

        // Trigger custom event with data
        js.executeScript(
            "var event = new CustomEvent('myEvent', {" +
            "  detail: {" +
            "    message: 'Custom event data'," +
            "    timestamp: Date.now()" +
            "  }," +
            "  bubbles: true," +
            "  cancelable: true" +
            "});" +
            "arguments[0].dispatchEvent(event);",
            element
        );
        Thread.sleep(1000);

        // Trigger React synthetic event
        js.executeScript(
            "var event = new Event('input', { bubbles: true });" +
            "var tracker = arguments[0]._valueTracker;" +
            "if (tracker) {" +
            "  tracker.setValue('');" +
            "}" +
            "arguments[0].value = arguments[1];" +
            "arguments[0].dispatchEvent(event);",
            element, "new value"
        );
        Thread.sleep(1000);

        // Trigger Angular change detection
        js.executeScript(
            "if (typeof angular !== 'undefined') {" +
            "  var scope = angular.element(arguments[0]).scope();" +
            "  scope.$apply();" +
            "}",
            element
        );

        // Trigger Vue.js event
        js.executeScript(
            "if (arguments[0].__vue__) {" +
            "  arguments[0].__vue__.$emit('custom-event', { data: 'test' });" +
            "}",
            element
        );

        // Trigger drag and drop events
        js.executeScript(
            "function createDragEvent(type) {" +
            "  return new DragEvent(type, {" +
            "    bubbles: true," +
            "    cancelable: true," +
            "    dataTransfer: new DataTransfer()" +
            "  });" +
            "}" +
            "arguments[0].dispatchEvent(createDragEvent('dragstart'));" +
            "arguments[0].dispatchEvent(createDragEvent('drag'));" +
            "arguments[0].dispatchEvent(createDragEvent('dragend'));",
            element
        );
        Thread.sleep(1000);

        // Trigger touch events
        js.executeScript(
            "var touchStart = new TouchEvent('touchstart', {" +
            "  bubbles: true," +
            "  cancelable: true," +
            "  touches: [new Touch({" +
            "    identifier: 0," +
            "    target: arguments[0]," +
            "    clientX: 100," +
            "    clientY: 100" +
            "  })]" +
            "});" +
            "arguments[0].dispatchEvent(touchStart);",
            element
        );
        Thread.sleep(1000);

        // Trigger focus and blur sequence
        js.executeScript(
            "arguments[0].dispatchEvent(new FocusEvent('focus', { bubbles: true }));" +
            "setTimeout(function() {" +
            "  arguments[0].dispatchEvent(new FocusEvent('blur', { bubbles: true }));" +
            "}, 500);",
            element
        );
        Thread.sleep(1500);

        driver.quit();
    }
}
```

### 4. Advanced Data Extraction

Extract complex data from web pages:

```java
public class AdvancedDataExtraction {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;

        driver.get("https://example.com");
        driver.manage().window().maximize();

        // Extract all links with their text and href
        List<Map<String, Object>> links = (List<Map<String, Object>>) js.executeScript(
            "return Array.from(document.querySelectorAll('a')).map(link => ({" +
            "  text: link.textContent.trim()," +
            "  href: link.href," +
            "  target: link.target" +
            "}));"
        );
        System.out.println("Total links: " + links.size());

        // Extract all form data
        Map<String, Object> formData = (Map<String, Object>) js.executeScript(
            "var form = document.querySelector('form');" +
            "var data = {};" +
            "var inputs = form.querySelectorAll('input, select, textarea');" +
            "inputs.forEach(function(input) {" +
            "  if (input.name) {" +
            "    if (input.type === 'checkbox' || input.type === 'radio') {" +
            "      data[input.name] = input.checked;" +
            "    } else {" +
            "      data[input.name] = input.value;" +
            "    }" +
            "  }" +
            "});" +
            "return data;"
        );
        System.out.println("Form data: " + formData);

        // Extract table data as array of objects
        List<Map<String, Object>> tableData = (List<Map<String, Object>>) js.executeScript(
            "var table = document.querySelector('table');" +
            "var headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());" +
            "var rows = Array.from(table.querySelectorAll('tbody tr'));" +
            "return rows.map(row => {" +
            "  var cells = Array.from(row.querySelectorAll('td'));" +
            "  var rowData = {};" +
            "  cells.forEach((cell, index) => {" +
            "    rowData[headers[index]] = cell.textContent.trim();" +
            "  });" +
            "  return rowData;" +
            "});"
        );
        System.out.println("Table rows: " + tableData.size());

        // Extract all images with metadata
        List<Map<String, Object>> images = (List<Map<String, Object>>) js.executeScript(
            "return Array.from(document.querySelectorAll('img')).map(img => ({" +
            "  src: img.src," +
            "  alt: img.alt," +
            "  width: img.naturalWidth," +
            "  height: img.naturalHeight," +
            "  loaded: img.complete" +
            "}));"
        );
        System.out.println("Total images: " + images.size());

        // Extract all cookies
        List<Map<String, Object>> cookies = (List<Map<String, Object>>) js.executeScript(
            "return document.cookie.split(';').map(cookie => {" +
            "  var parts = cookie.trim().split('=');" +
            "  return {" +
            "    name: parts[0]," +
            "    value: parts[1]" +
            "  };" +
            "});"
        );
        System.out.println("Total cookies: " + cookies.size());

        // Extract local storage data
        Map<String, Object> localStorage = (Map<String, Object>) js.executeScript(
            "var data = {};" +
            "for (var i = 0; i < localStorage.length; i++) {" +
            "  var key = localStorage.key(i);" +
            "  data[key] = localStorage.getItem(key);" +
            "}" +
            "return data;"
        );
        System.out.println("Local storage items: " + localStorage.size());

        // Extract session storage data
        Map<String, Object> sessionStorage = (Map<String, Object>) js.executeScript(
            "var data = {};" +
            "for (var i = 0; i < sessionStorage.length; i++) {" +
            "  var key = sessionStorage.key(i);" +
            "  data[key] = sessionStorage.getItem(key);" +
            "}" +
            "return data;"
        );
        System.out.println("Session storage items: " + sessionStorage.size());

        // Extract all meta tags
        List<Map<String, Object>> metaTags = (List<Map<String, Object>>) js.executeScript(
            "return Array.from(document.querySelectorAll('meta')).map(meta => ({" +
            "  name: meta.name || meta.property," +
            "  content: meta.content" +
            "}));"
        );
        System.out.println("Total meta tags: " + metaTags.size());

        driver.quit();
    }
}
```

## Best Practices and When to Use JS Executor

### Best Practices

```java
public class JSExecutorBestPractices {

    private WebDriver driver;
    private JavascriptExecutor js;

    public void demonstrateBestPractices() {
        // 1. Use standard Selenium methods first
        // BAD: Always using JS
        js.executeScript("arguments[0].click();", element);

        // GOOD: Try standard method first
        try {
            element.click();
        } catch (Exception e) {
            // Fallback to JS only if needed
            js.executeScript("arguments[0].click();", element);
        }

        // 2. Create reusable utility methods
        clickElementJS(element);
        scrollToElement(element);
        highlightElement(element);

        // 3. Handle return types properly
        Object result = js.executeScript("return document.title;");
        String title = (result != null) ? result.toString() : "";

        // 4. Use explicit waits before JS execution
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("target")));
        js.executeScript("arguments[0].click();", element);

        // 5. Validate elements exist before JS execution
        if (element != null && element.isDisplayed()) {
            js.executeScript("arguments[0].scrollIntoView();", element);
        }

        // 6. Log JavaScript execution for debugging
        System.out.println("Executing JS: click on element " + element);
        js.executeScript("arguments[0].click();", element);

        // 7. Handle exceptions properly
        try {
            js.executeScript("arguments[0].click();", element);
        } catch (JavascriptException e) {
            System.err.println("JavaScript execution failed: " + e.getMessage());
        }

        // 8. Keep JavaScript code readable
        String script =
            "var element = arguments[0];" +
            "element.style.border = '2px solid red';" +
            "element.scrollIntoView();" +
            "element.click();";
        js.executeScript(script, element);

        // 9. Avoid inline complex JavaScript
        // BAD: Long unreadable script
        js.executeScript("var e=arguments[0];e.style.border='2px solid red';e.scrollIntoView();e.click();", element);

        // GOOD: Well-formatted script
        String readableScript = """
            var element = arguments[0];
            element.style.border = '2px solid red';
            element.scrollIntoView({behavior: 'smooth', block: 'center'});
            element.click();
            """;
        js.executeScript(readableScript, element);
    }

    // Utility methods
    public void clickElementJS(WebElement element) {
        js.executeScript("arguments[0].click();", element);
    }

    public void scrollToElement(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element);
    }

    public void highlightElement(WebElement element) {
        js.executeScript(
            "arguments[0].style.border = '3px solid red';" +
            "arguments[0].style.backgroundColor = 'yellow';",
            element
        );
    }

    public void setValueJS(WebElement element, String value) {
        js.executeScript("arguments[0].value = arguments[1];", element, value);
    }

    public boolean isElementVisible(WebElement element) {
        return (boolean) js.executeScript(
            "return arguments[0].offsetParent !== null;",
            element
        );
    }
}
```

### When to Use JavaScript Executor

**Use JavaScript Executor when:**

1. **Element Interaction Issues**
   - Element is hidden or has `display:none`
   - Element is disabled
   - Element is behind overlay/modal
   - ElementClickInterceptedException occurs

2. **Browser Limitations**
   - Standard Selenium methods don't work
   - Need direct browser API access
   - Handling Shadow DOM
   - Working with canvas elements

3. **Performance Optimization**
   - Faster scrolling operations
   - Bulk element attribute changes
   - Direct DOM manipulation needed

4. **Special Requirements**
   - Bypassing client-side validation
   - Triggering custom events
   - Accessing browser storage
   - Detecting AJAX completion

5. **Framework-Specific Needs**
   - React/Angular/Vue event handling
   - Framework-specific state management
   - Custom event triggering

**Avoid JavaScript Executor when:**

1. Standard Selenium methods work fine
2. Need cross-browser compatibility (JS may vary)
3. Simulating real user behavior is important
4. Testing client-side validation
5. Debugging test failures (harder to debug JS)

### JavaScript Executor vs Standard Selenium

```java
public class JSExecutorComparison {

    public void comparisonExamples(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebElement element = driver.findElement(By.id("button"));

        // Clicking
        element.click();                                    // Standard - Use this first
        js.executeScript("arguments[0].click();", element); // JS - Use if standard fails

        // Sending keys
        element.sendKeys("text");                                    // Standard - Better for real typing
        js.executeScript("arguments[0].value = 'text';", element);   // JS - Faster, bypasses events

        // Getting text
        String text1 = element.getText();                               // Standard - Visible text only
        String text2 = (String) js.executeScript(                      // JS - All text including hidden
            "return arguments[0].textContent;", element
        );

        // Scrolling
        Actions actions = new Actions(driver);
        actions.moveToElement(element).perform();                      // Standard - Simulates user
        js.executeScript("arguments[0].scrollIntoView();", element);   // JS - Instant, more reliable

        // Getting attributes
        String value1 = element.getAttribute("value");                 // Standard - Easier
        String value2 = (String) js.executeScript(                     // JS - More control
            "return arguments[0].getAttribute('value');", element
        );
    }
}
```

## Practice Exercises

### Exercise 1: Advanced Page Scroller

Create a utility class for advanced scrolling operations:

```java
/**
 * Create a PageScroller utility class with the following methods:
 * 1. scrollToTop() - Scroll to top of page
 * 2. scrollToBottom() - Scroll to bottom with smooth animation
 * 3. scrollToElement(WebElement) - Scroll element to center of viewport
 * 4. scrollByPercentage(int) - Scroll page by percentage (0-100)
 * 5. scrollUntilElementVisible(By) - Scroll until element is in viewport
 * 6. getScrollPercentage() - Return current scroll position as percentage
 *
 * Test your class on a long webpage with multiple sections
 */

public class PageScroller {
    private WebDriver driver;
    private JavascriptExecutor js;

    public PageScroller(WebDriver driver) {
        // Your implementation here
    }

    public void scrollToTop() {
        // Implement smooth scroll to top
    }

    public void scrollToBottom() {
        // Implement smooth scroll to bottom
    }

    public void scrollToElement(WebElement element) {
        // Scroll element to center of viewport
    }

    public void scrollByPercentage(int percentage) {
        // Scroll to specific percentage of page
    }

    public void scrollUntilElementVisible(By locator) {
        // Scroll until element is visible in viewport
    }

    public int getScrollPercentage() {
        // Return scroll position as percentage
        return 0;
    }
}
```

### Exercise 2: DOM Element Manipulator

Create a class for DOM manipulation operations:

```java
/**
 * Create a DOMManipulator class with the following methods:
 * 1. changeElementStyle(WebElement, Map<String, String>) - Apply multiple CSS styles
 * 2. toggleClass(WebElement, String) - Toggle CSS class
 * 3. createAndAppendElement(String tag, String content, WebElement parent)
 * 4. removeElement(WebElement)
 * 5. cloneElement(WebElement, boolean deep) - Clone and return new element
 * 6. getAllAttributes(WebElement) - Return map of all attributes
 * 7. isElementInViewport(WebElement) - Check if element is in viewport
 *
 * Test on a webpage with forms and multiple elements
 */

public class DOMManipulator {
    private JavascriptExecutor js;

    public DOMManipulator(WebDriver driver) {
        // Your implementation here
    }

    public void changeElementStyle(WebElement element, Map<String, String> styles) {
        // Apply multiple CSS styles
    }

    public void toggleClass(WebElement element, String className) {
        // Toggle CSS class
    }

    public WebElement createAndAppendElement(String tag, String content, WebElement parent) {
        // Create new element and append to parent
        return null;
    }

    // Implement remaining methods
}
```

### Exercise 3: Shadow DOM Handler

Create a utility for working with Shadow DOM:

```java
/**
 * Create a ShadowDOMHandler class with the following methods:
 * 1. hasShadowRoot(WebElement) - Check if element has shadow root
 * 2. getShadowRoot(WebElement) - Get shadow root element
 * 3. findElementInShadow(WebElement host, String selector)
 * 4. findElementsInShadow(WebElement host, String selector)
 * 5. findInNestedShadow(List<String> shadowHosts, String finalSelector)
 * 6. clickInShadow(WebElement host, String selector)
 * 7. setValueInShadow(WebElement host, String selector, String value)
 *
 * Test on a page with Shadow DOM components
 */

public class ShadowDOMHandler {
    private JavascriptExecutor js;

    public ShadowDOMHandler(WebDriver driver) {
        this.js = (JavascriptExecutor) driver;
    }

    public boolean hasShadowRoot(WebElement element) {
        // Check for shadow root
        return false;
    }

    public WebElement findElementInShadow(WebElement host, String selector) {
        // Find element in shadow DOM
        return null;
    }

    // Implement remaining methods
}
```

### Exercise 4: AJAX Wait Handler

Create a utility for waiting on AJAX operations:

```java
/**
 * Create an AJAXWaitHandler class with the following methods:
 * 1. waitForJQueryAjax(int timeoutSeconds)
 * 2. waitForAngularAjax(int timeoutSeconds)
 * 3. waitForAllAjax(int timeoutSeconds)
 * 4. waitForSpecificAPI(String apiUrl, int timeoutSeconds)
 * 5. getActiveAjaxCount() - Return number of active AJAX calls
 * 6. getAllResourceTiming() - Return performance data for all resources
 *
 * Test on a page with AJAX operations
 */

public class AJAXWaitHandler {
    private WebDriver driver;
    private JavascriptExecutor js;
    private WebDriverWait wait;

    public AJAXWaitHandler(WebDriver driver, int defaultTimeout) {
        // Your implementation here
    }

    public void waitForJQueryAjax(int timeoutSeconds) {
        // Wait for jQuery AJAX to complete
    }

    public int getActiveAjaxCount() {
        // Return active AJAX count
        return 0;
    }

    // Implement remaining methods
}
```

### Exercise 5: Form Automation Helper

Create a comprehensive form automation utility:

```java
/**
 * Create a FormAutomationHelper class with:
 * 1. fillFormData(Map<String, String> formData) - Fill entire form from map
 * 2. clearAllFormFields(WebElement form)
 * 3. getFormData(WebElement form) - Extract all form data
 * 4. disableValidation(WebElement form)
 * 5. enableAllFields(WebElement form)
 * 6. submitFormJS(WebElement form)
 * 7. resetForm(WebElement form)
 * 8. selectAllCheckboxes(WebElement form)
 *
 * Test on various forms with different input types
 */

public class FormAutomationHelper {
    private JavascriptExecutor js;

    public FormAutomationHelper(WebDriver driver) {
        this.js = (JavascriptExecutor) driver;
    }

    public void fillFormData(Map<String, String> formData) {
        // Fill form from map
    }

    public Map<String, String> getFormData(WebElement form) {
        // Extract all form data
        return new HashMap<>();
    }

    // Implement remaining methods
}
```

### Exercise 6: Performance Monitor

Create a utility for monitoring page performance:

```java
/**
 * Create a PerformanceMonitor class with:
 * 1. getPageLoadTime() - Total page load time
 * 2. getDNSTime() - DNS lookup time
 * 3. getTCPTime() - TCP connection time
 * 4. getServerResponseTime() - Server response time
 * 5. getDOMProcessingTime() - DOM processing time
 * 6. createCustomMark(String name)
 * 7. measureDuration(String startMark, String endMark)
 * 8. getAllResourceTimings() - Get timing for all resources
 * 9. getSlowResources(long thresholdMs) - Resources slower than threshold
 *
 * Test and generate performance report
 */

public class PerformanceMonitor {
    private JavascriptExecutor js;

    public PerformanceMonitor(WebDriver driver) {
        this.js = (JavascriptExecutor) driver;
    }

    public long getPageLoadTime() {
        // Calculate page load time
        return 0;
    }

    public void createCustomMark(String name) {
        // Create performance mark
    }

    public Map<String, Long> generatePerformanceReport() {
        // Generate complete performance report
        return new HashMap<>();
    }

    // Implement remaining methods
}
```

## Interview Questions

### Basic Level

1. **What is JavaScript Executor in Selenium?**
   - Interface for executing JavaScript code in browser context
   - Provides executeScript() and executeAsyncScript() methods
   - Used when standard Selenium methods are insufficient
   - Allows direct access to browser APIs and DOM

2. **What are the two main methods of JavaScript Executor?**
   - `executeScript()` - Synchronous execution, returns result immediately
   - `executeAsyncScript()` - Asynchronous execution, requires callback
   - Both accept script string and optional arguments
   - Return value depends on JavaScript return statement

3. **How do you cast WebDriver to JavascriptExecutor?**
   ```java
   JavascriptExecutor js = (JavascriptExecutor) driver;
   ```
   - Cast is required because WebDriver doesn't directly extend JavascriptExecutor
   - All browser driver implementations support this interface

4. **How do you pass arguments to JavaScript from Selenium?**
   ```java
   js.executeScript("arguments[0].click();", element);
   js.executeScript("arguments[0].value = arguments[1];", input, "text");
   ```
   - Use arguments[0], arguments[1], etc. in JavaScript
   - Pass values after script string
   - WebElements automatically converted to DOM elements

5. **What return types are supported by executeScript()?**
   - String, Long, Boolean - primitive types
   - WebElement - single DOM element
   - List<WebElement> - multiple elements
   - Map - JavaScript objects
   - null - if no return or undefined

### Intermediate Level

6. **When would you use JavaScript Executor instead of standard Selenium methods?**
   - Hidden or disabled elements that can't be clicked normally
   - ElementClickInterceptedException occurs
   - Need to bypass validation or visibility checks
   - Working with Shadow DOM
   - Detecting AJAX completion
   - Performance optimization for specific operations

7. **How do you click a hidden element using JavaScript Executor?**
   ```java
   WebElement element = driver.findElement(By.id("hidden"));
   js.executeScript("arguments[0].click();", element);
   ```
   - Bypasses visibility checks
   - Works on elements with display:none, visibility:hidden
   - Doesn't simulate real user click behavior

8. **Explain different ways to scroll using JavaScript Executor.**
   ```java
   // Scroll to element
   js.executeScript("arguments[0].scrollIntoView();", element);

   // Scroll by coordinates
   js.executeScript("window.scrollBy(0, 500);");

   // Scroll to position
   js.executeScript("window.scrollTo(0, 1000);");

   // Scroll to bottom
   js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

   // Smooth scroll
   js.executeScript(
       "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});",
       element
   );
   ```

9. **How do you detect if AJAX calls are complete?**
   ```java
   // jQuery
   wait.until((ExpectedCondition<Boolean>) wd ->
       (Boolean) js.executeScript("return jQuery.active == 0")
   );

   // Monitor XMLHttpRequest
   js.executeScript(
       "window.ajaxCount = 0;" +
       "var oldOpen = XMLHttpRequest.prototype.open;" +
       "XMLHttpRequest.prototype.open = function() {" +
       "  window.ajaxCount++;" +
       "  this.addEventListener('loadend', function() {" +
       "    window.ajaxCount--;" +
       "  });" +
       "  return oldOpen.apply(this, arguments);" +
       "};"
   );
   ```

10. **How do you handle infinite scroll using JavaScript?**
    ```java
    Long lastHeight = (Long) js.executeScript("return document.body.scrollHeight");
    while (true) {
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        Thread.sleep(2000);
        Long newHeight = (Long) js.executeScript("return document.body.scrollHeight");
        if (newHeight.equals(lastHeight)) break;
        lastHeight = newHeight;
    }
    ```

### Advanced Level

11. **How do you access elements in Shadow DOM?**
    ```java
    WebElement host = driver.findElement(By.id("shadow-host"));

    // Get shadow root
    WebElement shadowRoot = (WebElement) js.executeScript(
        "return arguments[0].shadowRoot", host
    );

    // Find in shadow DOM
    WebElement shadowElement = (WebElement) js.executeScript(
        "return arguments[0].shadowRoot.querySelector('#shadow-element')",
        host
    );

    // Nested shadow DOM
    WebElement nestedElement = (WebElement) js.executeScript(
        "return document.querySelector('#host1')" +
        ".shadowRoot.querySelector('#host2')" +
        ".shadowRoot.querySelector('#final-element')"
    );
    ```

12. **How do you trigger custom events using JavaScript Executor?**
    ```java
    js.executeScript(
        "var event = new CustomEvent('myEvent', {" +
        "  detail: { data: 'custom data' }," +
        "  bubbles: true," +
        "  cancelable: true" +
        "});" +
        "arguments[0].dispatchEvent(event);",
        element
    );

    // React synthetic event
    js.executeScript(
        "var event = new Event('input', { bubbles: true });" +
        "arguments[0].value = arguments[1];" +
        "arguments[0].dispatchEvent(event);",
        input, "value"
    );
    ```

13. **How do you check if page loading is complete using JavaScript?**
    ```java
    // Document ready state
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    wait.until((ExpectedCondition<Boolean>) wd ->
        js.executeScript("return document.readyState").equals("complete")
    );

    // All images loaded
    Boolean allImagesLoaded = (Boolean) js.executeScript(
        "var images = document.getElementsByTagName('img');" +
        "for (var i = 0; i < images.length; i++) {" +
        "  if (!images[i].complete) return false;" +
        "}" +
        "return true;"
    );

    // jQuery ready
    wait.until((ExpectedCondition<Boolean>) wd ->
        (Boolean) js.executeScript("return typeof jQuery != 'undefined' && jQuery.active == 0")
    );
    ```

14. **How do you get performance metrics using JavaScript Executor?**
    ```java
    Map<String, Object> timing = (Map<String, Object>) js.executeScript(
        "var t = performance.timing;" +
        "return {" +
        "  pageLoadTime: t.loadEventEnd - t.navigationStart," +
        "  dnsTime: t.domainLookupEnd - t.domainLookupStart," +
        "  tcpTime: t.connectEnd - t.connectStart," +
        "  serverTime: t.responseEnd - t.requestStart," +
        "  domProcessing: t.domComplete - t.domLoading," +
        "  resourceCount: performance.getEntriesByType('resource').length" +
        "};"
    );
    ```

15. **What are the limitations of JavaScript Executor?**
    - Cannot interact with browser dialogs (alerts, confirms)
    - Limited file upload capabilities
    - May not trigger all event listeners
    - Can bypass important validation
    - Doesn't simulate real user behavior
    - May have different behavior across browsers
    - Cannot access elements in other tabs/windows
    - Security restrictions on certain operations
    - Harder to debug failures
    - May break if page JavaScript changes

## Key Takeaways

1. **JavaScript Executor Fundamentals**
   - Interface for executing JavaScript in browser context
   - Two methods: executeScript() (sync) and executeAsyncScript() (async)
   - Cast WebDriver to JavascriptExecutor to use
   - Pass arguments using arguments[0], arguments[1], etc.
   - Returns various types: String, Long, Boolean, WebElement, List, Map

2. **Advanced Scrolling**
   - scrollIntoView() for element scrolling with options
   - window.scrollBy() for relative scrolling
   - window.scrollTo() for absolute positioning
   - Smooth scrolling using behavior option
   - Infinite scroll handling with height comparison
   - Horizontal scrolling support

3. **Element Manipulation**
   - Click hidden/disabled elements
   - Modify attributes: setAttribute(), removeAttribute()
   - Change properties: value, checked, disabled
   - Manipulate CSS: classList, style
   - Highlight elements for debugging
   - Bypass visibility restrictions

4. **DOM Operations**
   - Get element properties and computed styles
   - Navigate DOM: parent, children, siblings, ancestors
   - Find elements using querySelector/querySelectorAll
   - Create, append, remove elements
   - Clone elements
   - Extract complex data structures

5. **Form Interactions**
   - Set form field values directly
   - Trigger events: change, input, submit
   - Bypass client-side validation
   - Handle all input types
   - Enable disabled fields
   - Submit forms without validation

6. **Browser Operations**
   - Control window size and position
   - Open new windows/tabs
   - Adjust browser zoom level
   - Get screen dimensions
   - Access window properties

7. **Performance and Timing**
   - Check document ready state
   - Detect AJAX completion (jQuery, Angular)
   - Monitor XMLHttpRequest
   - Create custom performance marks
   - Measure operation duration
   - Get page load metrics
   - Access Navigation Timing API

8. **Shadow DOM**
   - Access shadowRoot property
   - Find elements within Shadow DOM
   - Handle nested Shadow DOM
   - Interact with Shadow DOM elements
   - Check for shadow root existence

9. **Advanced Use Cases**
   - Alternative file upload approaches
   - Bypass element visibility
   - Trigger custom events
   - React/Angular/Vue event handling
   - Extract complex data
   - Local/session storage access
   - Performance monitoring

10. **Best Practices**
    - Use standard Selenium methods first
    - JavaScript as fallback only
    - Create reusable utility methods
    - Handle exceptions properly
    - Add explicit waits before JS execution
    - Keep JavaScript code readable
    - Log JS execution for debugging
    - Validate return types
    - Consider cross-browser compatibility

11. **When to Use JS Executor**
    - Element interaction failures
    - Hidden/disabled elements
    - ElementClickInterceptedException
    - Shadow DOM access
    - AJAX detection
    - Performance optimization
    - Validation bypass (testing purposes)
    - Framework-specific requirements

12. **When NOT to Use JS Executor**
    - Standard methods work fine
    - Real user simulation needed
    - Testing validation
    - Cross-browser compatibility critical
    - Debugging test failures

## What's Next

Congratulations on completing Day 12! You now have advanced JavaScript Executor skills. Next, you'll learn:

**Day 13: Database Testing with Selenium**
- Connecting to databases from tests
- JDBC fundamentals
- Executing SQL queries
- Validating data in database
- Comparing UI data with database
- Database test data setup

**Recommended Practice:**
1. Complete all 6 practice exercises
2. Create a comprehensive JavaScript utility library
3. Test on websites with Shadow DOM
4. Build AJAX wait utilities
5. Practice performance monitoring
6. Experiment with different frameworks (React, Angular)

**Additional Resources:**
- MDN Web Docs - JavaScript Reference
- Chrome DevTools - Console and Performance
- Selenium JavaScript Executor Documentation
- Web Performance APIs
- Shadow DOM Specification

---

## Navigation

- [← Previous: Day 11 - File Upload and Download](./day11_file_upload_download.md)
- [Next: Day 13 - Database Testing →](./day13_database_testing.md)
- [↑ Back to Week 2 Overview](./README.md)
- [⌂ Course Home](../../README.md)

---

**Remember:** JavaScript Executor is a powerful tool that should be used judiciously. Always prefer standard Selenium methods when possible, and use JavaScript as a fallback for complex scenarios. Master both approaches to become a versatile automation engineer.

Happy Automating!