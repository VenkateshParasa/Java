
# Day 13: JavaScript Executor in Selenium

## 📋 Learning Objectives
By the end of this lesson, you will be able to:
- Understand the [`JavascriptExecutor`](org.openqa.selenium.JavascriptExecutor) interface
- Execute JavaScript code in Selenium
- Perform scrolling operations
- Interact with hidden elements
- Manipulate DOM elements
- Handle complex scenarios that standard Selenium can't
- Debug JavaScript execution issues

---

## 📚 Table of Contents
1. [Introduction to JavascriptExecutor](#1-introduction-to-javascriptexecutor)
2. [Basic JavaScript Execution](#2-basic-javascript-execution)
3. [Scrolling Operations](#3-scrolling-operations)
4. [Element Manipulation](#4-element-manipulation)
5. [Handling Hidden Elements](#5-handling-hidden-elements)
6. [Advanced JavaScript Operations](#6-advanced-javascript-operations)
7. [Practical Exercises](#7-practical-exercises)
8. [Common Mistakes](#8-common-mistakes)
9. [Best Practices](#9-best-practices)
10. [Key Takeaways](#10-key-takeaways)

---

## 1. Introduction to JavascriptExecutor

### What is JavascriptExecutor?
[`JavascriptExecutor`](org.openqa.selenium.JavascriptExecutor) is an interface that enables execution of JavaScript code within the context of the currently selected frame or window.

### Why Use JavascriptExecutor?
- **Hidden Elements:** Interact with elements not visible to Selenium
- **Scrolling:** Precise scroll control
- **Performance:** Faster than some Selenium operations
- **DOM Manipulation:** Direct access to DOM
- **Workarounds:** Handle scenarios where standard Selenium fails

### When to Use JavascriptExecutor?
```java
// Use JavascriptExecutor when:
// 1. Element is hidden but needs interaction
// 2. Standard click() doesn't work
// 3. Need to scroll to specific position
// 4. Want to manipulate element properties
// 5. Need to execute custom JavaScript
```

---

## 2. Basic JavaScript Execution

### Setting Up JavascriptExecutor

#### Example 1: Basic Setup
```java
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class JavascriptExecutorBasics {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        // Cast WebDriver to JavascriptExecutor
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            // Execute simple JavaScript
            js.executeScript("alert('Hello from Selenium!');");
            
            Thread.sleep(2000);
            
            // Accept alert
            driver.switchTo().alert().accept();
            
            System.out.println("✓ JavaScript executed successfully");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Getting Page Information
```java
public class GetPageInfoExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            // Get page title
            String title = (String) js.executeScript("return document.title;");
            System.out.println("Page Title: " + title);
            
            // Get URL
            String url = (String) js.executeScript("return document.URL;");
            System.out.println("Page URL: " + url);
            
            // Get domain
            String domain = (String) js.executeScript("return document.domain;");
            System.out.println("Domain: " + domain);
            
            // Get page height
            Long height = (Long) js.executeScript("return document.body.scrollHeight;");
            System.out.println("Page Height: " + height + "px");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Executing Multiple Statements
```java
public class MultipleStatementsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            // Execute multiple JavaScript statements
            String script = 
                "var heading = document.createElement('h1');" +
                "heading.innerHTML = 'Added by Selenium';" +
                "heading.style.color = 'red';" +
                "document.body.appendChild(heading);" +
                "return 'Heading added successfully';";
            
            String result = (String) js.executeScript(script);
            System.out.println(result);
            
            Thread.sleep(3000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 3. Scrolling Operations

### Different Scrolling Techniques

#### Example 1: Scroll to Bottom
```java
public class ScrollToBottomExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/long-page");
            
            // Scroll to bottom of page
            js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            
            System.out.println("✓ Scrolled to bottom");
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Scroll to Specific Element
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class ScrollToElementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/long-page");
            
            // Find element
            WebElement element = driver.findElement(By.id("footer"));
            
            // Scroll to element
            js.executeScript("arguments[0].scrollIntoView(true);", element);
            
            System.out.println("✓ Scrolled to element");
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Smooth Scrolling
```java
public class SmoothScrollExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/long-page");
            
            // Smooth scroll to bottom
            js.executeScript(
                "window.scrollTo({" +
                "  top: document.body.scrollHeight," +
                "  behavior: 'smooth'" +
                "});"
            );
            
            System.out.println("✓ Smooth scroll initiated");
            Thread.sleep(3000);  // Wait for smooth scroll to complete
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 4: Scroll by Pixels
```java
public class ScrollByPixelsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/long-page");
            
            // Scroll down 500 pixels
            js.executeScript("window.scrollBy(0, 500);");
            System.out.println("✓ Scrolled down 500px");
            Thread.sleep(1000);
            
            // Scroll down another 500 pixels
            js.executeScript("window.scrollBy(0, 500);");
            System.out.println("✓ Scrolled down another 500px");
            Thread.sleep(1000);
            
            // Scroll up 300 pixels
            js.executeScript("window.scrollBy(0, -300);");
            System.out.println("✓ Scrolled up 300px");
            Thread.sleep(1000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 5: Horizontal Scrolling
```java
public class HorizontalScrollExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/wide-page");
            
            // Scroll right
            js.executeScript("window.scrollBy(500, 0);");
            System.out.println("✓ Scrolled right 500px");
            Thread.sleep(1000);
            
            // Scroll left
            js.executeScript("window.scrollBy(-500, 0);");
            System.out.println("✓ Scrolled left 500px");
            Thread.sleep(1000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 4. Element Manipulation

### Clicking Elements

#### Example 1: Click Using JavaScript
```java
public class JavaScriptClickExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            WebElement button = driver.findElement(By.id("submitBtn"));
            
            // Click using JavaScript
            js.executeScript("arguments[0].click();", button);
            
            System.out.println("✓ Button clicked using JavaScript");
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Highlight Element
```java
public class HighlightElementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            WebElement element = driver.findElement(By.id("logo"));
            
            // Highlight element with red border
            js.executeScript(
                "arguments[0].style.border='3px solid red';", 
                element
            );
            
            System.out.println("✓ Element highlighted");
            Thread.sleep(2000);
            
            // Remove highlight
            js.executeScript(
                "arguments[0].style.border='';", 
                element
            );
            
            System.out.println("✓ Highlight removed");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Change Element Properties
```java
public class ChangePropertiesExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/form");
            
            WebElement input = driver.findElement(By.id("username"));
            
            // Set value using JavaScript
            js.executeScript("arguments[0].value='TestUser';", input);
            System.out.println("✓ Value set");
            Thread.sleep(1000);
            
            // Change background color
            js.executeScript("arguments[0].style.backgroundColor='yellow';", input);
            System.out.println("✓ Background color changed");
            Thread.sleep(1000);
            
            // Make readonly
            js.executeScript("arguments[0].setAttribute('readonly', 'true');", input);
            System.out.println("✓ Made readonly");
            Thread.sleep(1000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 5. Handling Hidden Elements

### Working with Invisible Elements

#### Example 1: Click Hidden Element
```java
public class ClickHiddenElementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/hidden-elements");
            
            // Find hidden element
            WebElement hiddenButton = driver.findElement(By.id("hiddenBtn"));
            
            // This would fail with standard click
            // hiddenButton.click();  // ElementNotInteractableException
            
            // Click using JavaScript (works on hidden elements)
            js.executeScript("arguments[0].click();", hiddenButton);
            
            System.out.println("✓ Hidden element clicked");
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Make Element Visible
```java
public class MakeVisibleExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/hidden-elements");
            
            WebElement hiddenDiv = driver.findElement(By.id("hiddenDiv"));
            
            // Make element visible
            js.executeScript(
                "arguments[0].style.display='block';" +
                "arguments[0].style.visibility='visible';",
                hiddenDiv
            );
            
            System.out.println("✓ Element made visible");
            Thread.sleep(2000);
            
            // Now can interact normally
            hiddenDiv.click();
            System.out.println("✓ Clicked visible element");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Get Hidden Element Text
```java
public class GetHiddenTextExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/hidden-content");
            
            WebElement hiddenElement = driver.findElement(By.id("hiddenText"));
            
            // Standard getText() might return empty string
            String standardText = hiddenElement.getText();
            System.out.println("Standard getText(): '" + standardText + "'");
            
            // Get text using JavaScript
            String jsText = (String) js.executeScript(
                "return arguments[0].textContent;", 
                hiddenElement
            );
            System.out.println("JavaScript getText(): '" + jsText + "'");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 6. Advanced JavaScript Operations

### Complex Scenarios

#### Example 1: Generate Alert
```java
public class GenerateAlertExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            // Generate alert
            js.executeScript("alert('This is a test alert!');");
            
            Thread.sleep(2000);
            
            // Handle alert
            String alertText = driver.switchTo().alert().getText();
            System.out.println("Alert text: " + alertText);
            
            driver.switchTo().alert().accept();
            System.out.println("✓ Alert handled");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Refresh Page
```java
public class RefreshPageExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            System.out.println("Initial load complete");
            Thread.sleep(2000);
            
            // Refresh using JavaScript
            js.executeScript("location.reload();");
            
            System.out.println("✓ Page refreshed");
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Navigate to URL
```java
public class NavigateExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            System.out.println("Initial page loaded");
            Thread.sleep(2000);
            
            // Navigate to new URL using JavaScript
            js.executeScript("window.location='https://www.google.com';");
            
            System.out.println("✓ Navigated to new URL");
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 4: Get All Links
```java
import java.util.ArrayList;

public class GetAllLinksExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            // Get all links using JavaScript
            @SuppressWarnings("unchecked")
            ArrayList<String> links = (ArrayList<String>) js.executeScript(
                "var links = [];" +
                "var anchors = document.getElementsByTagName('a');" +
                "for(var i = 0; i < anchors.length; i++) {" +
                "  links.push(anchors[i].href);" +
                "}" +
                "return links;"
            );
            
            System.out.println("Total links found: " + links.size());
            System.out.println("\nLinks:");
            for (String link : links) {
                System.out.println("  - " + link);
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 5: Zoom Page
```java
public class ZoomPageExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            // Zoom in (150%)
            js.executeScript("document.body.style.zoom='150%';");
            System.out.println("✓ Zoomed in to 150%");
            Thread.sleep(2000);
            
            // Zoom out (75%)
            js.executeScript("document.body.style.zoom='75%';");
            System.out.println("✓ Zoomed out to 75%");
            Thread.sleep(2000);
            
            // Reset zoom (100%)
            js.executeScript("document.body.style.zoom='100%';");
            System.out.println("✓ Reset to 100%");
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 7. Practical Exercises

### Exercise 1: Scroll and Click
**Task:** Scroll to an element and click it using JavaScript.

```java
public class Exercise1_ScrollAndClick {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/long-page");
            
            // Find element at bottom
            WebElement footerLink = driver.findElement(By.id("contactLink"));
            
            // Scroll to element
            js.executeScript("arguments[0].scrollIntoView(true);", footerLink);
            System.out.println("✓ Scrolled to element");
            Thread.sleep(1000);
            
            // Click using JavaScript
            js.executeScript("arguments[0].click();", footerLink);
            System.out.println("✓ Element clicked");
            Thread.sleep(2000);
            
            // Verify navigation
            String currentUrl = driver.getCurrentUrl();
            if (currentUrl.contains("contact")) {
                System.out.println("✓ Successfully navigated to contact page");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 2: Highlight Multiple Elements
**Task:** Highlight all buttons on a page.

```java
import java.util.List;

public class Exercise2_HighlightButtons {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            // Find all buttons
            List<WebElement> buttons = driver.findElements(By.tagName("button"));
            
            System.out.println("Found " + buttons.size() + " buttons");
            
            // Highlight each button
            for (int i = 0; i < buttons.size(); i++) {
                WebElement button = buttons.get(i);
                
                // Highlight
                js.executeScript(
                    "arguments[0].style.border='3px solid red';" +
                    "arguments[0].style.backgroundColor='yellow';",
                    button
                );
                
                System.out.println("✓ Highlighted button " + (i + 1));
                Thread.sleep(500);
            }
            
            System.out.println("\n✓ All buttons highlighted");
            Thread.sleep(3000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 3: Infinite Scroll
**Task:** Scroll through an infinite scroll page.

```java
public class Exercise3_InfiniteScroll {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/infinite-scroll");
            
            Long lastHeight = (Long) js.executeScript("return document.body.scrollHeight");
            
            int scrollCount = 0;
            int maxScrolls = 5;  // Limit scrolls
            
            while (scrollCount < maxScrolls) {
                // Scroll to bottom
                js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
                System.out.println("✓ Scroll " + (scrollCount + 1));
                
                // Wait for new content to load
                Thread.sleep(2000);
                
                // Calculate new scroll height
                Long newHeight = (Long) js.executeScript("return document.body.scrollHeight");
                
                // Check if reached bottom
                if (newHeight.equals(lastHeight)) {
                    System.out.println("✓ Reached bottom of page");
                    break;
                }
                
                lastHeight = newHeight;
                scrollCount++;
            }
            
            System.out.println("\n✓ Infinite scroll completed");
            System.out.println("Total scrolls: " + scrollCount);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 4: Extract Data Using JavaScript
**Task:** Extract all image sources from a page.

```java
import java.util.ArrayList;

public class Exercise4_ExtractImages {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com");
            
            // Extract all image sources
            @SuppressWarnings("unchecked")
            ArrayList<String> imageSources = (ArrayList<String>) js.executeScript(
                "var images = [];" +
                "var imgs = document.getElementsByTagName('img');" +
                "for(var i = 0; i < imgs.length; i++) {" +
                "  if(imgs[i].src) {" +
                "    images.push(imgs[i].src);" +
                "  }" +
                "}" +
                "return images;"
            );
            
            System.out.println("Total images found: " + imageSources.size());
            System.out.println("\nImage Sources:");
            
            for (int i = 0; i < imageSources.size(); i++) {
                System.out.println((i + 1) + ". " + imageSources.get(i));
            }
            
            System.out.println("\n✓ Image extraction completed");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 5: Form Manipulation
**Task:** Fill and submit a form using JavaScript.

```java
public class Exercise5_FormManipulation {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://www.example.com/form");
            
            // Fill form using JavaScript
            js.executeScript(
                "document.getElementById('username').value='testuser';" +
                "document.getElementById('email').value='test@example.com';" +
                "document.getElementById('password').value='Test@123';"
            );
            
            System.out.println("✓ Form filled");
            Thread.sleep(1000);
            
            // Check checkbox
            WebElement checkbox = driver.findElement(By.id("terms"));
            js.executeScript("arguments[0].checked=true;", checkbox);
            System.out.println("✓ Checkbox checked");
            Thread.sleep(1000);
            
            // Submit form
            js.executeScript("document.getElementById('submitBtn').click();");
            System.out.println("✓ Form submitted");
            Thread.sleep(2000);
            
            // Verify submission
            String currentUrl = driver.getCurrentUrl();
            if (currentUrl.contains("success")) {
                System.out.println("✓ Form submitted successfully");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 8. Common Mistakes

### Mistake 1: Not Casting WebDriver
```java
// ❌ WRONG
WebDriver driver = new ChromeDriver();
driver.executeScript("alert('test');");  // Compile error

// ✅ CORRECT
WebDriver driver = new ChromeDriver();
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("alert('test');");
```

### Mistake 2: Incorrect Return Type
```java
// ❌ WRONG
String title = js.executeScript("return document.title;");  // ClassCastException

// ✅ CORRECT
String title = (String) js.executeScript("return document.title;");
```

### Mistake 3: Missing arguments[0]
```java
// ❌ WRONG
js.executeScript("element.click();", element);  // element is undefined

// ✅ CORRECT
js.executeScript("arguments[0].click();", element);
```

### Mistake 4: Not Waiting After Scroll
```java
// ❌ WRONG
js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
element.click();  // May fail if element not in view yet

// ✅ CORRECT
js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
Thread.sleep(1000);  // Wait for scroll to complete
element.click();
```

---

## 9. Best Practices

### 1. Create Utility Methods
```java
public class JavaScriptUtils {
    private JavascriptExecutor js;
    
    public JavaScriptUtils(WebDriver driver) {
        this.js = (JavascriptExecutor) driver;
    }
    
    public void scrollToElement(WebElement element) {
        js.executeScript("arguments[0].scrollIntoView(true);", element);
    }
    
    public void clickElement(WebElement element) {
        js.executeScript("arguments[0].click();", element);
    }
    
    public void highlightElement(WebElement element) {
        js.executeScript(
            "arguments[0].style.border='3px solid red';",
            element
        );
    }
    
    public String getPageTitle() {
        return (String) js.executeScript("return document.title;");
    }
    
    public void scrollToBottom() {
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    }
}
```

### 2. Handle Exceptions Properly
```java
public void safeExecuteScript(String script, WebElement... elements) {
    try {
        js.executeScript(script, elements);
    } catch (Exception e) {
        System.err.println("JavaScript execution failed: " + e.getMessage());
        // Log or handle appropriately
    }
}
```

### 3. Use for Specific Scenarios Only
```java
// Use standard Selenium when possible
element.click();  // Preferred

// Use JavaScript only when necessary
if (elementNotClickable) {
    js.executeScript("arguments[0].click();", element);  // Fallback
}
```

---

## 10. Key Takeaways

### Essential Concepts
✅ **JavascriptExecutor:** Interface for executing JavaScript in Selenium  
✅ **executeScript():** Method to run JavaScript code  
✅ **arguments[0]:** Reference to WebElement passed as parameter  
✅ **Scrolling:** Various methods for page and element scrolling  
✅ **Hidden Elements:** Can interact with elements not visible to Selenium  
✅ **DOM Manipulation:** Direct access to modify page elements  
✅ **Return Values:** Must cast return values to appropriate type

### Common Use Cases
- Scrolling to elements
- Clicking hidden or obscured elements
- Changing element properties
- Extracting page information
- Handling scenarios where standard Selenium fails
- Performance optimization

### Remember- JavaScript execution is powerful but should be last resort
- Always prefer standard Selenium methods when possible
- Use JavascriptExecutor for workarounds and special cases
- Test JavaScript code in browser console first

---

## 11. Interview Questions

### Basic Level

1. **What is JavascriptExecutor in Selenium and when is it used?**
   - JavascriptExecutor is an interface that enables execution of JavaScript code within the browser through Selenium WebDriver. It's used when standard Selenium methods fail, for interacting with hidden elements, performing scrolling operations, or executing custom JavaScript.

2. **How do you execute JavaScript code in Selenium?**
   - Cast the WebDriver instance to JavascriptExecutor: `JavascriptExecutor js = (JavascriptExecutor) driver;` then use `js.executeScript("JavaScript code here");` to execute JavaScript.

3. **What is the difference between `executeScript()` and `executeAsyncScript()` methods?**
   - `executeScript()` executes JavaScript synchronously and waits for the script to complete before returning. `executeAsyncScript()` executes JavaScript asynchronously and is used for scripts that require callbacks or async operations.

### Intermediate Level

4. **How do you pass WebElement parameters to JavaScript code in Selenium?**
   - Use `arguments[0]`, `arguments[1]`, etc. to reference WebElement parameters passed to executeScript. Example: `js.executeScript("arguments[0].click();", element);` where element is the WebElement passed as a parameter.

5. **Explain different scrolling techniques using JavascriptExecutor.**
   - Scroll to bottom: `js.executeScript("window.scrollTo(0, document.body.scrollHeight);")`, scroll to element: `js.executeScript("arguments[0].scrollIntoView(true);", element)`, scroll by pixels: `js.executeScript("window.scrollBy(0, 500);")`, smooth scroll: `js.executeScript("window.scrollTo({top: 500, behavior: 'smooth'});")`.

6. **How do you interact with hidden elements using JavascriptExecutor?**
   - Use JavascriptExecutor to click hidden elements: `js.executeScript("arguments[0].click();", hiddenElement);` or make element visible: `js.executeScript("arguments[0].style.display='block';", hiddenElement);` then interact normally.

7. **What return types can executeScript() return and how do you handle them?**
   - Returns Object that needs to be cast to appropriate type: String, Long, Boolean, WebElement, or List. Example: `String title = (String) js.executeScript("return document.title;");` or `Long height = (Long) js.executeScript("return document.body.scrollHeight;");`.

### Advanced Level

8. **How would you implement infinite scroll automation using JavascriptExecutor?**
   - Track scroll height, scroll to bottom, wait for content to load, check new scroll height, repeat until no new content. Use: `Long lastHeight = (Long) js.executeScript("return document.body.scrollHeight");` scroll down, wait, check if height changed to detect end of content.

9. **What are the limitations of using JavascriptExecutor, and when should you avoid it?**
   - Limitations: bypasses browser security, doesn't simulate real user behavior, may not trigger all event handlers, can be brittle with dynamic pages. Avoid when standard Selenium methods work, for security-sensitive actions, or when you need to validate actual user interactions. Use only as fallback or for specific scenarios like hidden elements.

10. **How do you handle complex JavaScript scenarios like AJAX completion, page load status, or custom event triggering using JavascriptExecutor?**
    - Check page load: `js.executeScript("return document.readyState").toString().equals("complete")`, wait for AJAX: `js.executeScript("return jQuery.active == 0")` (if jQuery is present), trigger events: `js.executeScript("arguments[0].dispatchEvent(new Event('change'));", element)`, check element properties: `js.executeScript("return arguments[0].getAttribute('value');", element)`. Combine with explicit waits for robust synchronization.

---

## 11. Interview Questions

### Basic Level

**1. What is JavascriptExecutor in Selenium and when should you use it?**

**Answer:** JavascriptExecutor is an interface in Selenium that enables the execution of JavaScript code within the browser context. It should be used when standard Selenium methods fail or are insufficient, such as:
- Interacting with hidden elements that standard Selenium can't access
- Performing scrolling operations
- Clicking elements that are not clickable via standard click()
- Manipulating DOM elements directly
- Handling AJAX-heavy applications
- Getting page-level information that's not easily accessible via Selenium

Example usage:
```java
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].click();", element);
```

**2. How do you cast WebDriver to JavascriptExecutor?**

**Answer:** You cast WebDriver to JavascriptExecutor using explicit type casting:
```java
WebDriver driver = new ChromeDriver();
JavascriptExecutor js = (JavascriptExecutor) driver;
```
This casting is necessary because JavascriptExecutor is an interface that WebDriver implements, but you need to cast to access its specific methods like `executeScript()` and `executeAsyncScript()`.

**3. What is the difference between executeScript() and executeAsyncScript() methods?**

**Answer:**
- **executeScript()**: Executes JavaScript synchronously. The script runs and completes before returning control to Selenium. It waits for the script to finish execution.
```java
String title = (String) js.executeScript("return document.title;");
```

- **executeAsyncScript()**: Executes JavaScript asynchronously. Used for scripts that require callbacks or perform asynchronous operations like AJAX calls. The script must call a callback function to signal completion.
```java
js.executeAsyncScript("var callback = arguments[arguments.length - 1];" +
                      "setTimeout(function() { callback('Done'); }, 3000);");
```

**4. What does arguments[0] represent in JavascriptExecutor scripts?**

**Answer:** `arguments[0]` represents the first WebElement parameter passed to the executeScript() method. When you pass WebElement objects as additional parameters to executeScript(), they are accessible in the JavaScript code through the arguments array (arguments[0], arguments[1], etc.).

Example:
```java
WebElement button = driver.findElement(By.id("submitBtn"));
js.executeScript("arguments[0].click();", button);
// Here arguments[0] refers to the button element
```

### Intermediate Level

**5. How do you scroll to a specific element using JavascriptExecutor?**

**Answer:** There are multiple ways to scroll to an element:

**Method 1: scrollIntoView()**
```java
WebElement element = driver.findElement(By.id("footer"));
js.executeScript("arguments[0].scrollIntoView(true);", element);
```

**Method 2: Scroll by coordinates**
```java
WebElement element = driver.findElement(By.id("element"));
int y = element.getLocation().getY();
js.executeScript("window.scrollTo(0, " + y + ");");
```

**Method 3: Smooth scrolling**
```java
js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element);
```

The `scrollIntoView(true)` scrolls to align element at the top, while `scrollIntoView(false)` aligns at the bottom.

**6. Explain how to click a hidden element using JavascriptExecutor.**

**Answer:** Hidden elements cannot be clicked using standard Selenium click() method because Selenium simulates real user actions. JavascriptExecutor bypasses this by executing JavaScript directly on the DOM:

```java
WebElement hiddenElement = driver.findElement(By.id("hiddenButton"));

// Standard click fails:
// hiddenElement.click(); // Throws ElementNotInteractableException

// JavaScript click works:
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].click();", hiddenElement);
```

This works because JavaScript doesn't care about element visibility—it directly triggers the click event on the DOM element. However, use this only when necessary as it doesn't simulate real user behavior.

**7. How do you get and set element attributes using JavascriptExecutor?**

**Answer:**

**Getting attributes:**
```java
WebElement element = driver.findElement(By.id("inputField"));
String value = (String) js.executeScript("return arguments[0].getAttribute('value');", element);
String className = (String) js.executeScript("return arguments[0].className;", element);
```

**Setting attributes:**
```java
// Set value
js.executeScript("arguments[0].setAttribute('value', 'New Value');", element);

// Set style
js.executeScript("arguments[0].style.border='3px solid red';", element);

// Make element readonly
js.executeScript("arguments[0].setAttribute('readonly', 'true');", element);

// Remove attribute
js.executeScript("arguments[0].removeAttribute('disabled');", element);
```

**8. What return types can executeScript() return and how do you handle them?**

**Answer:** executeScript() returns Object type that needs to be cast to the appropriate type:

**Common return types:**
```java
// String
String title = (String) js.executeScript("return document.title;");

// Long (for numbers)
Long height = (Long) js.executeScript("return document.body.scrollHeight;");

// Boolean
Boolean isDisplayed = (Boolean) js.executeScript("return arguments[0].style.display != 'none';", element);

// WebElement
WebElement body = (WebElement) js.executeScript("return document.body;");

// List (for multiple elements)
List<WebElement> links = (List<WebElement>) js.executeScript(
    "return document.getElementsByTagName('a');"
);

// ArrayList for custom data
ArrayList<String> data = (ArrayList<String>) js.executeScript(
    "var arr = [];" +
    "var elements = document.querySelectorAll('.item');" +
    "for(var i=0; i<elements.length; i++) {" +
    "  arr.push(elements[i].textContent);" +
    "}" +
    "return arr;"
);
```

### Advanced Level

**9. How do you handle page load and AJAX completion using JavascriptExecutor?**

**Answer:**

**Check page load status:**
```java
public boolean isPageLoaded() {
    String pageState = js.executeScript("return document.readyState").toString();
    return pageState.equals("complete");
}

// Wait for page load
public void waitForPageLoad() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    wait.until(driver -> js.executeScript("return document.readyState").equals("complete"));
}
```

**Wait for AJAX (with jQuery):**
```java
public void waitForAjax() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    wait.until(driver -> {
        Boolean ajaxComplete = (Boolean) js.executeScript("return jQuery.active == 0");
        return ajaxComplete;
    });
}
```

**Wait for AJAX (without jQuery):**
```java
public void waitForAjaxWithoutJQuery() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    wait.until(driver -> {
        Boolean ajaxComplete = (Boolean) js.executeScript(
            "var xhr = new XMLHttpRequest();" +
            "return xhr.readyState == 4 || xhr.readyState == 0;"
        );
        return ajaxComplete;
    });
}
```

**10. What are the limitations and risks of using JavascriptExecutor?**

**Answer:**

**Limitations:**
1. **Bypasses Security**: JavaScript execution can bypass browser security measures
2. **No Real User Simulation**: Doesn't simulate actual user interactions (mouse movement, focus, etc.)
3. **Event Handlers**: May not trigger all event listeners that normal clicks would
4. **Browser Compatibility**: JavaScript behavior may vary across browsers
5. **Stale Elements**: Still susceptible to StaleElementReferenceException
6. **No Visual Feedback**: Can't verify if action is visually possible

**Risks:**
1. **False Positives**: Tests may pass even when real users can't interact with elements
2. **Maintenance**: Hard to debug when JavaScript fails
3. **Brittleness**: More prone to breaking with page structure changes
4. **Performance**: Can be slower for complex operations

**Best Practices:**
```java
// Bad - Using JavaScript as first choice
js.executeScript("arguments[0].click();", element);

// Good - Use standard Selenium first, JavaScript as fallback
try {
    element.click();
} catch (ElementNotInteractableException e) {
    js.executeScript("arguments[0].click();", element);
}
```

**11. How do you implement infinite scroll automation using JavascriptExecutor?**

**Answer:**

**Basic infinite scroll implementation:**
```java
public void scrollInfinitely(int maxScrolls) throws InterruptedException {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    Long lastHeight = (Long) js.executeScript("return document.body.scrollHeight");
    int scrollCount = 0;

    while (scrollCount < maxScrolls) {
        // Scroll to bottom
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

        // Wait for new content to load
        Thread.sleep(2000);

        // Calculate new scroll height
        Long newHeight = (Long) js.executeScript("return document.body.scrollHeight");

        // Check if reached actual bottom (no new content)
        if (newHeight.equals(lastHeight)) {
            System.out.println("Reached bottom - no more content");
            break;
        }

        lastHeight = newHeight;
        scrollCount++;
        System.out.println("Scroll " + scrollCount + " completed. Height: " + newHeight);
    }
}
```

**Advanced implementation with explicit waits:**
```java
public void scrollWithExplicitWait() {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

    Long lastHeight = (Long) js.executeScript("return document.body.scrollHeight");

    while (true) {
        // Scroll to bottom
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

        // Wait for height to change
        try {
            wait.until(driver -> {
                Long currentHeight = (Long) js.executeScript("return document.body.scrollHeight");
                return !currentHeight.equals(lastHeight);
            });

            lastHeight = (Long) js.executeScript("return document.body.scrollHeight");

        } catch (TimeoutException e) {
            // No new content loaded, reached bottom
            break;
        }
    }
}
```

**12. How do you execute complex JavaScript scenarios like form validation and event triggering?**

**Answer:**

**Form Validation:**
```java
public boolean validateForm() {
    String script =
        "var form = arguments[0];" +
        "var isValid = true;" +
        "var inputs = form.querySelectorAll('input[required]');" +
        "inputs.forEach(function(input) {" +
        "    if (input.value.trim() === '') {" +
        "        isValid = false;" +
        "    }" +
        "});" +
        "return isValid;";

    WebElement form = driver.findElement(By.id("myForm"));
    return (Boolean) js.executeScript(script, form);
}
```

**Trigger Custom Events:**
```java
public void triggerChangeEvent(WebElement element) {
    // Trigger 'change' event
    js.executeScript(
        "var event = new Event('change', { bubbles: true });" +
        "arguments[0].dispatchEvent(event);",
        element
    );
}

public void triggerKeyPress(WebElement element, int keyCode) {
    // Trigger keypress event
    js.executeScript(
        "var event = new KeyboardEvent('keypress', {" +
        "    keyCode: arguments[1]," +
        "    which: arguments[1]," +
        "    bubbles: true" +
        "});" +
        "arguments[0].dispatchEvent(event);",
        element, keyCode
    );
}
```

**Get Computed Styles:**
```java
public String getComputedStyle(WebElement element, String property) {
    String script =
        "return window.getComputedStyle(arguments[0]).getPropertyValue(arguments[1]);";
    return (String) js.executeScript(script, element, property);
}

// Usage
String color = getComputedStyle(element, "background-color");
String fontSize = getComputedStyle(element, "font-size");
```

**Complex DOM Manipulation:**
```java
public List<String> extractTableData() {
    String script =
        "var table = arguments[0];" +
        "var data = [];" +
        "var rows = table.querySelectorAll('tbody tr');" +
        "rows.forEach(function(row) {" +
        "    var rowData = [];" +
        "    var cells = row.querySelectorAll('td');" +
        "    cells.forEach(function(cell) {" +
        "        rowData.push(cell.textContent.trim());" +
        "    });" +
        "    data.push(rowData.join('|'));" +
        "});" +
        "return data;";

    WebElement table = driver.findElement(By.id("dataTable"));
    return (List<String>) js.executeScript(script, table);
}
```

**Check Element Visibility:**
```java
public boolean isElementVisibleInViewport(WebElement element) {
    String script =
        "var elem = arguments[0];" +
        "var rect = elem.getBoundingClientRect();" +
        "return (" +
        "    rect.top >= 0 &&" +
        "    rect.left >= 0 &&" +
        "    rect.bottom <= window.innerHeight &&" +
        "    rect.right <= window.innerWidth" +
        ");";

    return (Boolean) js.executeScript(script, element);
}
```

---

## Navigation

**Previous:** [Day 12: Advanced Mouse Operations](day12_mouse_operations_advanced.md)
**Next:** [Day 14: Week 2 Review](day14_week2_review.md)
**Week 2 Home:** [Week 2 Overview](README.md)
