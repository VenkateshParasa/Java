# Day 5: Waits in Selenium - Handling Dynamic Web Elements

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand why waits are essential in Selenium automation
- Differentiate between Implicit, Explicit, and Fluent waits
- Implement WebDriverWait with ExpectedConditions
- Create custom wait conditions for complex scenarios
- Apply best practices for handling dynamic web elements
- Avoid common mistakes when using waits
- Handle synchronization issues in modern web applications

---

## Table of Contents
1. [Introduction to Waits](#introduction)
2. [Why Waits are Needed](#why-waits)
3. [Types of Waits Overview](#types-overview)
4. [Implicit Wait](#implicit-wait)
5. [Explicit Wait](#explicit-wait)
6. [Fluent Wait](#fluent-wait)
7. [Thread.sleep() - Why to Avoid](#thread-sleep)
8. [Wait Strategies Comparison](#comparison)
9. [Best Practices for Waits](#best-practices)
10. [Common Mistakes and Solutions](#common-mistakes)
11. [Real-World Scenarios](#real-world)
12. [Practice Exercises](#exercises)
13. [Interview Questions](#interview-questions)
14. [Key Takeaways](#key-takeaways)

---

## 1. Introduction to Waits {#introduction}

Modern web applications are dynamic and rely heavily on JavaScript, AJAX, and asynchronous operations. Elements may not be immediately available when the page loads, creating a timing issue between your test script and the web page.

**Waits** in Selenium provide a way to synchronize your automation script with the web application's state, ensuring elements are ready before interactions.

### The Synchronization Problem

```
Test Script Speed:  ████████████████████ (Fast)
Page Loading:       ████░░░░░░░░░░░░░░░░ (Slow)
                        ↑
                    Element not ready yet!
```

Without proper waits:
- Tests fail intermittently
- NoSuchElementException errors occur
- Elements are not interactable
- Tests become flaky and unreliable

---

## 2. Why Waits are Needed {#why-waits}

### Common Scenarios Requiring Waits

**1. Page Load Time**
```
Browser navigates → HTML loads → CSS loads → JavaScript executes → Elements render
```

**2. AJAX Requests**
```java
// Click button that triggers AJAX call
driver.findElement(By.id("loadDataBtn")).click();

// Without wait - Element not loaded yet!
driver.findElement(By.id("ajaxData")).getText(); // ❌ Fails!
```

**3. Dynamic Content**
- Elements added/removed by JavaScript
- Content loaded progressively
- Single Page Applications (SPAs)

**4. Animations and Transitions**
- Modal dialogs fading in
- Dropdown menus expanding
- Loading spinners

**5. Network Latency**
- Slow API responses
- Large file downloads
- External resource loading

### Problems Without Waits

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class NoWaitExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // ❌ Page still loading - element not ready
        driver.findElement(By.id("dynamic-element")).click();
        // Result: NoSuchElementException!

        driver.quit();
    }
}
```

**Error:**
```
org.openqa.selenium.NoSuchElementException:
Unable to locate element: {"method":"css selector","selector":"#dynamic-element"}
```

---

## 3. Types of Waits Overview {#types-overview}

Selenium provides three main types of waits:

### Quick Comparison

| Wait Type | Scope | Configuration | Best For |
|-----------|-------|---------------|----------|
| **Implicit Wait** | Global | Once per driver | Simple applications |
| **Explicit Wait** | Specific elements | Per condition | Dynamic elements |
| **Fluent Wait** | Specific elements | Highly customizable | Complex conditions |
| **Thread.sleep()** | ❌ Avoid | Fixed delay | Never (testing only) |

### Visual Representation

```
Implicit Wait:     [Set once] → Applies to ALL findElement() calls
Explicit Wait:     [Per element] → Waits for specific condition
Fluent Wait:       [Per element + polling] → Advanced explicit wait
Thread.sleep():    [Fixed delay] → Blocks execution (bad practice)
```

---

## 4. Implicit Wait {#implicit-wait}

### What is Implicit Wait?

An **Implicit Wait** tells the WebDriver to poll the DOM for a certain duration when trying to find an element if it's not immediately available.

### Key Characteristics

- **Set once** for the entire WebDriver session
- **Applies globally** to all `findElement()` and `findElements()` calls
- **Default timeout**: 0 seconds (no wait)
- **Polling interval**: Fixed by Selenium (typically 250-500ms)

### Syntax and Usage

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;

public class ImplicitWaitExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        // Set implicit wait - applies to all findElement calls
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        driver.get("https://example.com");

        // WebDriver will wait up to 10 seconds for this element
        driver.findElement(By.id("username")).sendKeys("testuser");

        driver.quit();
    }
}
```

### How Implicit Wait Works

```
1. findElement() called
2. Element found immediately? → Return element
3. Element not found? → Wait and poll DOM
4. Keep polling until:
   - Element is found → Return element
   - Timeout reached → Throw NoSuchElementException
```

### Complete Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;

public class ImplicitWaitDemo {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        // Configure implicit wait
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(15));

        // Also set page load timeout
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));

        // Navigate to page
        driver.get("https://the-internet.herokuapp.com/dynamic_loading/1");

        // Click start button
        WebElement startButton = driver.findElement(By.cssSelector("#start button"));
        startButton.click();

        // Element is hidden initially, becomes visible after 5 seconds
        // Implicit wait will keep polling for up to 15 seconds
        WebElement finishText = driver.findElement(By.id("finish"));
        System.out.println("Message: " + finishText.getText());

        driver.quit();
    }
}
```

### Advantages of Implicit Wait

✅ **Simple to implement** - One line of code
✅ **Applies globally** - Don't need to specify for each element
✅ **Good for stable applications** - Consistent load times
✅ **Reduces code complexity** - No explicit wait conditions needed

### Disadvantages of Implicit Wait

❌ **Not flexible** - Same timeout for all elements
❌ **Cannot wait for specific conditions** - Only waits for presence
❌ **Performance impact** - Slows down negative tests (element not present)
❌ **Conflicts with explicit waits** - Can cause unexpected behavior
❌ **Cannot wait for visibility** - Only checks DOM presence

### When to Use Implicit Wait

**Use When:**
- Application has predictable load times
- Testing stable, non-AJAX applications
- Simple automation scenarios
- Quick proof-of-concept scripts

**Avoid When:**
- Working with dynamic AJAX applications
- Need to wait for specific conditions (visibility, clickability)
- Different elements have different load times
- Using explicit waits elsewhere (conflicts)

### Common Mistake: Checking Element Not Present

```java
// ❌ Bad - Implicit wait makes this slow
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// This will wait full 10 seconds even though element doesn't exist
boolean isPresent = driver.findElements(By.id("nonexistent")).size() > 0;
// Takes 10 seconds to return false!
```

---

## 5. Explicit Wait {#explicit-wait}

### What is Explicit Wait?

An **Explicit Wait** waits for a specific condition to be true before proceeding. It's more intelligent and flexible than implicit wait.

### Key Characteristics

- **Applied to specific elements** - Not global
- **Waits for specific conditions** - Visibility, clickability, text presence, etc.
- **More control** - Can specify exactly what to wait for
- **Better performance** - Only waits when needed
- **Customizable** - Can create custom wait conditions

### WebDriverWait Class

```java
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

// Create WebDriverWait instance
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Use with ExpectedConditions
WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
```

### Basic Syntax

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ExplicitWaitBasic {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // Create WebDriverWait instance
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Wait for element to be visible
        WebElement element = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("myElement"))
        );

        element.click();
        driver.quit();
    }
}
```

### ExpectedConditions Class

The `ExpectedConditions` class provides ready-made conditions for common scenarios.

#### 5.1 presenceOfElementLocated

Waits for element to be **present in DOM** (may not be visible).

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class PresenceOfElementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://the-internet.herokuapp.com/dynamic_loading/2");
        driver.findElement(By.cssSelector("#start button")).click();

        // Wait for element to be present in DOM (even if hidden)
        WebElement finishElement = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("finish"))
        );

        System.out.println("Element is present in DOM");
        driver.quit();
    }
}
```

#### 5.2 visibilityOfElementLocated

Waits for element to be **visible** (present in DOM and displayed).

```java
public class VisibilityOfElementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://the-internet.herokuapp.com/dynamic_loading/1");
        driver.findElement(By.cssSelector("#start button")).click();

        // Wait for element to be visible (not just present)
        WebElement finishElement = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("finish"))
        );

        System.out.println("Text: " + finishElement.getText());
        driver.quit();
    }
}
```

**Difference:**
- `presenceOfElementLocated`: Element in DOM (may be hidden with CSS)
- `visibilityOfElementLocated`: Element in DOM AND visible (display != none, visibility != hidden)

#### 5.3 elementToBeClickable

Waits for element to be **visible AND enabled** (ready for interaction).

```java
public class ElementToBeClickableExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com/form");

        // Wait for button to be clickable (visible + enabled)
        WebElement submitButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("submit"))
        );

        submitButton.click();
        System.out.println("Button clicked successfully");

        driver.quit();
    }
}
```

#### 5.4 textToBePresentInElement

Waits for **specific text** to appear in an element.

```java
public class TextToBePresentExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com");
        driver.findElement(By.id("loadButton")).click();

        // Wait for specific text to appear
        boolean textPresent = wait.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.id("message"),
                "Loading complete"
            )
        );

        if (textPresent) {
            System.out.println("Expected text appeared!");
        }

        driver.quit();
    }
}
```

#### 5.5 alertIsPresent

Waits for **JavaScript alert** to be present.

```java
import org.openqa.selenium.Alert;

public class AlertIsPresentExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://the-internet.herokuapp.com/javascript_alerts");
        driver.findElement(By.xpath("//button[text()='Click for JS Alert']")).click();

        // Wait for alert to be present
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        System.out.println("Alert text: " + alert.getText());
        alert.accept();

        driver.quit();
    }
}
```

#### 5.6 frameToBeAvailableAndSwitchToIt

Waits for **iframe** to be available and switches to it.

```java
public class FrameToBeAvailableExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://the-internet.herokuapp.com/iframe");

        // Wait for iframe and switch to it
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("mce_0_ifr")));

        // Now we're inside the iframe
        WebElement editor = driver.findElement(By.id("tinymce"));
        editor.clear();
        editor.sendKeys("Hello from iframe!");

        // Switch back to main content
        driver.switchTo().defaultContent();

        driver.quit();
    }
}
```

#### 5.7 invisibilityOfElementLocated

Waits for element to become **invisible or not present**.

```java
public class InvisibilityOfElementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com");
        driver.findElement(By.id("loadButton")).click();

        // Wait for loading spinner to disappear
        boolean invisible = wait.until(
            ExpectedConditions.invisibilityOfElementLocated(By.id("loadingSpinner"))
        );

        if (invisible) {
            System.out.println("Loading complete - spinner disappeared");
        }

        driver.quit();
    }
}
```

#### 5.8 stalenessOf

Waits for element to become **stale** (removed from DOM).

```java
public class StalenessOfExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com");

        // Get reference to element
        WebElement oldElement = driver.findElement(By.id("dynamicElement"));

        // Trigger page refresh or DOM change
        driver.findElement(By.id("refreshButton")).click();

        // Wait for old element to become stale
        wait.until(ExpectedConditions.stalenessOf(oldElement));

        // Find element again (new reference)
        WebElement newElement = driver.findElement(By.id("dynamicElement"));
        newElement.click();

        driver.quit();
    }
}
```

### Common ExpectedConditions Summary

```java
// Element State
ExpectedConditions.presenceOfElementLocated(By locator)
ExpectedConditions.visibilityOfElementLocated(By locator)
ExpectedConditions.invisibilityOfElementLocated(By locator)
ExpectedConditions.elementToBeClickable(By locator)
ExpectedConditions.stalenessOf(WebElement element)

// Text Conditions
ExpectedConditions.textToBePresentInElementLocated(By locator, String text)
ExpectedConditions.textToBePresentInElementValue(By locator, String text)

// Attribute Conditions
ExpectedConditions.attributeToBe(By locator, String attribute, String value)
ExpectedConditions.attributeContains(By locator, String attribute, String value)

// Alert Conditions
ExpectedConditions.alertIsPresent()

// Frame Conditions
ExpectedConditions.frameToBeAvailableAndSwitchToIt(By locator)

// Multiple Elements
ExpectedConditions.presenceOfAllElementsLocatedBy(By locator)
ExpectedConditions.visibilityOfAllElementsLocatedBy(By locator)
ExpectedConditions.numberOfElementsToBe(By locator, Integer number)
ExpectedConditions.numberOfElementsToBeMoreThan(By locator, Integer number)
ExpectedConditions.numberOfElementsToBeLessThan(By locator, Integer number)

// Selection State
ExpectedConditions.elementToBeSelected(By locator)
ExpectedConditions.elementSelectionStateToBe(By locator, boolean selected)

// URL and Title
ExpectedConditions.urlToBe(String url)
ExpectedConditions.urlContains(String fraction)
ExpectedConditions.titleIs(String title)
ExpectedConditions.titleContains(String title)
```

### Custom Wait Conditions

You can create custom wait conditions using lambda expressions or Function interface.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class CustomWaitCondition {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com");

        // Custom condition: Wait for element's text length to be greater than 5
        WebElement element = wait.until(new ExpectedCondition<WebElement>() {
            @Override
            public WebElement apply(WebDriver driver) {
                WebElement el = driver.findElement(By.id("dynamicText"));
                if (el.getText().length() > 5) {
                    return el;
                }
                return null; // Condition not met, keep waiting
            }
        });

        System.out.println("Element text: " + element.getText());
        driver.quit();
    }
}
```

### Custom Condition with Lambda

```java
public class CustomWaitLambda {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com");

        // Lambda expression for custom condition
        WebElement element = wait.until(driver -> {
            WebElement el = driver.findElement(By.id("counter"));
            int count = Integer.parseInt(el.getText());
            return count >= 100 ? el : null;
        });

        System.out.println("Counter reached: " + element.getText());
        driver.quit();
    }
}
```

### Advanced Custom Condition Example

```java
import java.util.List;

public class AdvancedCustomCondition {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com/products");

        // Wait for at least 10 products to load
        boolean loaded = wait.until(driver -> {
            List<WebElement> products = driver.findElements(By.className("product"));
            return products.size() >= 10;
        });

        if (loaded) {
            System.out.println("All products loaded successfully");
        }

        // Custom condition: Wait for total price to be calculated
        WebElement totalElement = wait.until(driver -> {
            WebElement total = driver.findElement(By.id("totalPrice"));
            String priceText = total.getText();
            // Wait until price is not "$0.00"
            return !priceText.equals("$0.00") ? total : null;
        });

        System.out.println("Total price: " + totalElement.getText());

        driver.quit();
    }
}
```

### Handling TimeoutException

```java
import org.openqa.selenium.TimeoutException;

public class HandleTimeoutException {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));

        driver.get("https://example.com");

        try {
            WebElement element = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("slowElement"))
            );
            element.click();
        } catch (TimeoutException e) {
            System.out.println("Element did not appear within 5 seconds");
            System.out.println("Taking screenshot for debugging...");
            // Take screenshot or log for debugging
        } finally {
            driver.quit();
        }
    }
}
```

### Advantages of Explicit Wait

✅ **Flexible** - Wait for specific conditions
✅ **Efficient** - Only waits when needed
✅ **Precise control** - Different timeouts for different elements
✅ **Better error handling** - Can catch TimeoutException
✅ **Works with dynamic content** - AJAX, SPAs, etc.
✅ **Recommended best practice** - By Selenium community

### When to Use Explicit Wait

**Always prefer explicit wait when:**
- Working with AJAX applications
- Waiting for specific element states (visible, clickable)
- Elements have varying load times
- Need precise control over wait conditions
- Building maintainable test automation frameworks

---

## 6. Fluent Wait {#fluent-wait}

### What is Fluent Wait?

**Fluent Wait** is an advanced version of explicit wait that provides more control over polling interval and exception handling.

### Key Features

- **Custom polling interval** - Define how often to check condition
- **Ignore specific exceptions** - Don't fail on certain exceptions
- **Custom messages** - Better error messages
- **All features of explicit wait** - Plus more control

### FluentWait Class

```java
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import java.time.Duration;

// Create FluentWait instance
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))          // Maximum wait time
    .pollingEvery(Duration.ofMillis(500))         // Check every 500ms
    .ignoring(NoSuchElementException.class);      // Ignore this exception
```

### Basic Fluent Wait Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import java.time.Duration;

public class FluentWaitBasic {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/dynamic_loading/1");

        // Click start button
        driver.findElement(By.cssSelector("#start button")).click();

        // Configure Fluent Wait
        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(30))
            .pollingEvery(Duration.ofMillis(250))
            .ignoring(NoSuchElementException.class);

        // Wait for element
        WebElement finishElement = wait.until(driver -> {
            WebElement element = driver.findElement(By.id("finish"));
            return element.isDisplayed() ? element : null;
        });

        System.out.println("Text: " + finishElement.getText());
        driver.quit();
    }
}
```

### Polling Interval Explained

```
Without Custom Polling (default ~500ms):
Time: 0s    0.5s   1.0s   1.5s   2.0s   2.5s
Check: ✓     ✓      ✓      ✓      ✓      ✓

With Custom Polling (100ms):
Time: 0s   0.1s  0.2s  0.3s  0.4s  0.5s  0.6s  0.7s
Check: ✓    ✓     ✓     ✓     ✓     ✓     ✓     ✓

Faster polling = More checks = Faster detection (but more CPU)
```

### Ignoring Multiple Exceptions

```java
import org.openqa.selenium.StaleElementReferenceException;

public class FluentWaitMultipleExceptions {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // Ignore multiple exceptions
        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(30))
            .pollingEvery(Duration.ofMillis(500))
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class);

        WebElement element = wait.until(driver -> {
            return driver.findElement(By.id("dynamicElement"));
        });

        element.click();
        driver.quit();
    }
}
```

### Fluent Wait with Custom Message

```java
public class FluentWaitCustomMessage {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(20))
            .pollingEvery(Duration.ofMillis(300))
            .withMessage("Custom message: Element not found within 20 seconds!")
            .ignoring(NoSuchElementException.class);

        try {
            WebElement element = wait.until(driver -> {
                return driver.findElement(By.id("specialElement"));
            });
            element.click();
        } catch (TimeoutException e) {
            System.out.println(e.getMessage()); // Prints custom message
        }

        driver.quit();
    }
}
```

### Complex Fluent Wait Condition

```java
import java.util.List;

public class ComplexFluentWait {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/cart");

        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(30))
            .pollingEvery(Duration.ofMillis(200))
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class);

        // Wait for cart total to update after adding items
        String finalTotal = wait.until(driver -> {
            WebElement totalElement = driver.findElement(By.id("cartTotal"));
            String total = totalElement.getText().replace("$", "");
            double amount = Double.parseDouble(total);

            // Wait until total is greater than $100
            return amount > 100.0 ? totalElement.getText() : null;
        });

        System.out.println("Cart total reached: " + finalTotal);

        // Wait for all product images to load
        boolean allImagesLoaded = wait.until(driver -> {
            List<WebElement> images = driver.findElements(By.cssSelector(".product img"));
            for (WebElement img : images) {
                String src = img.getAttribute("src");
                if (src == null || src.isEmpty()) {
                    return false;
                }
            }
            return images.size() > 0;
        });

        System.out.println("All images loaded: " + allImagesLoaded);

        driver.quit();
    }
}
```

### Fluent Wait vs Explicit Wait

```java
// Explicit Wait (WebDriverWait)
WebDriverWait explicitWait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element1 = explicitWait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("element"))
);

// Fluent Wait (More control)
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(10))
    .pollingEvery(Duration.ofMillis(100))  // Custom polling
    .ignoring(NoSuchElementException.class); // Ignore exceptions

WebElement element2 = fluentWait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("element"))
);
```

### Real-World Fluent Wait Example

```java
public class RealWorldFluentWait {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/upload");

        // Upload file
        WebElement uploadInput = driver.findElement(By.id("fileUpload"));
        uploadInput.sendKeys("/path/to/file.pdf");

        driver.findElement(By.id("uploadButton")).click();

        // Wait for upload progress to complete
        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofMinutes(2))  // Large file upload
            .pollingEvery(Duration.ofSeconds(1)) // Check every second
            .withMessage("File upload did not complete in 2 minutes")
            .ignoring(NoSuchElementException.class);

        WebElement successMessage = wait.until(driver -> {
            // Check if progress bar shows 100%
            WebElement progressBar = driver.findElement(By.id("uploadProgress"));
            String progress = progressBar.getAttribute("value");

            if ("100".equals(progress)) {
                // Progress complete, now wait for success message
                WebElement message = driver.findElement(By.className("success-message"));
                return message.isDisplayed() ? message : null;
            }

            return null; // Still uploading
        });

        System.out.println("Upload successful: " + successMessage.getText());
        driver.quit();
    }
}
```

### When to Use Fluent Wait

**Use Fluent Wait when:**
- Need custom polling intervals
- Working with frequently changing DOM
- Need to ignore specific exceptions
- Want more control than explicit wait
- Dealing with complex conditions requiring multiple checks

**Example scenarios:**
- File uploads with progress tracking
- Stock price tickers (frequent updates)
- Chat applications (real-time messages)
- Canvas/graph rendering
- Complex AJAX operations

---

## 7. Thread.sleep() - Why to Avoid {#thread-sleep}

### What is Thread.sleep()?

`Thread.sleep()` is a Java method that pauses execution for a fixed duration.

```java
try {
    Thread.sleep(5000); // Sleep for 5 seconds
} catch (InterruptedException e) {
    e.printStackTrace();
}
```

### Why Thread.sleep() is Bad

❌ **Fixed delay** - Always waits full duration, even if element loads in 1 second
❌ **Inefficient** - Wastes time in every test execution
❌ **Unreliable** - Element might need more time on slow systems
❌ **Not dynamic** - Doesn't adapt to actual conditions
❌ **Poor practice** - Makes tests slow and brittle

### Problems Demonstrated

```java
public class ThreadSleepProblems {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // ❌ Problem 1: Always waits full 5 seconds
        Thread.sleep(5000);
        // Even if element loads in 500ms, we wait 5000ms!

        driver.findElement(By.id("element")).click();

        // ❌ Problem 2: Might not be enough time
        Thread.sleep(3000);
        // What if network is slow and takes 5 seconds?
        driver.findElement(By.id("slowElement")).click(); // Fails!

        driver.quit();
    }
}
```

### Time Comparison

```
Scenario: Element loads in 2 seconds

Thread.sleep(5000):
[Wait 5s] → Element ready at 2s → Still waiting... → 5s elapsed → Continue
Total: 5 seconds wasted

Explicit Wait (10s timeout):
[Check] → Not ready → [Check 250ms] → Not ready → [Check 500ms] → ... →
[Check 2s] → Ready! → Continue immediately
Total: ~2 seconds
```

### Rare Acceptable Cases

Thread.sleep() might be acceptable ONLY for:
- **Debugging** - Temporarily pause to observe behavior
- **Demonstrations** - Show test execution step-by-step
- **Non-Selenium waits** - Waiting for external systems (not web elements)

```java
// Acceptable: Debug mode to observe
if (debugMode) {
    Thread.sleep(2000); // Pause to see the page
}

// Acceptable: Wait for external API
apiClient.sendRequest();
Thread.sleep(1000); // Wait for API to process (not ideal, but separate concern)

// Acceptable: Animation that doesn't change DOM
// (Very rare - usually ExpectedConditions is still better)
```

### Better Alternatives

```java
// ❌ Bad
Thread.sleep(5000);
driver.findElement(By.id("element")).click();

// ✅ Good - Explicit Wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("element"))
);
element.click();

// ✅ Good - Fluent Wait with polling
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(10))
    .pollingEvery(Duration.ofMillis(200))
    .ignoring(NoSuchElementException.class);

WebElement element = fluentWait.until(driver -> {
    WebElement el = driver.findElement(By.id("element"));
    return el.isDisplayed() ? el : null;
});
element.click();
```

---

## 8. Wait Strategies Comparison {#comparison}

### Comprehensive Comparison Table

| Feature | Implicit Wait | Explicit Wait | Fluent Wait | Thread.sleep() |
|---------|---------------|---------------|-------------|----------------|
| **Scope** | Global | Specific element | Specific element | Code block |
| **Intelligence** | Low | High | Very High | None |
| **Polling** | Fixed by Selenium | Fixed by Selenium | Customizable | N/A (blocks) |
| **Conditions** | Presence only | Many (ExpectedConditions) | Custom conditions | N/A |
| **Exception Handling** | None | TimeoutException | Can ignore exceptions | InterruptedException |
| **Performance** | Medium | Good | Best (when configured well) | Worst |
| **Flexibility** | Low | High | Very High | None |
| **Configuration** | Once per session | Per wait | Per wait with details | Per call |
| **Best For** | Simple apps | Modern web apps | Complex scenarios | Never (debug only) |
| **Conflicts With** | Explicit waits | Implicit wait | Implicit wait | Nothing (but bad) |
| **Recommended** | ❌ No | ✅ Yes | ✅ Yes (advanced) | ❌ Never |

### Decision Tree

```
Need to wait for element?
│
├─ Simple, stable application with no AJAX?
│  └─ Use: Implicit Wait (set once and forget)
│
├─ Modern application with dynamic content?
│  │
│  ├─ Standard conditions (visibility, clickability)?
│  │  └─ Use: Explicit Wait (WebDriverWait)
│  │
│  └─ Complex conditions or need polling control?
│     └─ Use: Fluent Wait
│
└─ Just debugging and want to pause?
   └─ Use: Thread.sleep() (temporary only!)
```

### Performance Comparison

```java
public class PerformanceComparison {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        // Scenario: Element takes 2 seconds to load

        // 1. Thread.sleep - Always 5 seconds
        long start1 = System.currentTimeMillis();
        Thread.sleep(5000);
        long end1 = System.currentTimeMillis();
        System.out.println("Thread.sleep: " + (end1 - start1) + "ms"); // 5000ms

        // 2. Implicit Wait - ~2 seconds (polls until found)
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        long start2 = System.currentTimeMillis();
        driver.findElement(By.id("element")); // Found at ~2s
        long end2 = System.currentTimeMillis();
        System.out.println("Implicit Wait: " + (end2 - start2) + "ms"); // ~2000ms

        // 3. Explicit Wait - ~2 seconds (polls until condition met)
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        long start3 = System.currentTimeMillis();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
        long end3 = System.currentTimeMillis();
        System.out.println("Explicit Wait: " + (end3 - start3) + "ms"); // ~2000ms

        // 4. Fluent Wait with fast polling - ~2 seconds (checks more frequently)
        Wait<WebDriver> fluentWait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(10))
            .pollingEvery(Duration.ofMillis(100)); // Check every 100ms
        long start4 = System.currentTimeMillis();
        fluentWait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
        long end4 = System.currentTimeMillis();
        System.out.println("Fluent Wait: " + (end4 - start4) + "ms"); // ~2000ms (detected faster)

        driver.quit();
    }
}
```

### Mixing Waits - What Happens?

```java
// ❌ DON'T DO THIS - Implicit + Explicit mixed
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));

// Problem: Total wait could be 10s + 5s = 15s in some cases!
// Unpredictable behavior
```

**Rule:** Choose ONE wait strategy and stick with it. If using explicit/fluent waits, set implicit wait to 0.

---

## 9. Best Practices for Waits {#best-practices}

### 1. Prefer Explicit Wait Over Implicit Wait

```java
// ❌ Avoid
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// ✅ Prefer
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("button"))).click();
```

**Why?** Explicit waits are more flexible, efficient, and predictable.

### 2. Don't Mix Implicit and Explicit Waits

```java
// ❌ Bad - Mixed waits
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));

// ✅ Good - Only explicit waits
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0)); // Disable
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
```

### 3. Use Appropriate Timeout Values

```java
// ❌ Too short - Tests fail unnecessarily
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));

// ❌ Too long - Tests slow, mask real issues
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(60));

// ✅ Reasonable timeout
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// ✅ Different timeouts for different scenarios
WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(5));
WebDriverWait longWait = new WebDriverWait(driver, Duration.ofSeconds(30)); // For slow operations
```

### 4. Wait for Specific Conditions

```java
// ❌ Less precise
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("button")));

// ✅ More precise - ensures element is actually clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));

// ✅ Wait for exact state needed
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("message")));
wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id("status"), "Complete"));
```

### 5. Create Reusable Wait Methods

```java
public class WaitUtils {
    private WebDriver driver;
    private WebDriverWait wait;

    public WaitUtils(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public WebElement waitForElementToBeClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    public WebElement waitForVisibility(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public boolean waitForInvisibility(By locator) {
        return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    public boolean waitForTextToBePresent(By locator, String text) {
        return wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

    public Alert waitForAlert() {
        return wait.until(ExpectedConditions.alertIsPresent());
    }
}

// Usage
WaitUtils waitUtils = new WaitUtils(driver);
waitUtils.waitForElementToBeClickable(By.id("submit")).click();
waitUtils.waitForTextToBePresent(By.id("message"), "Success");
```

### 6. Handle TimeoutException Gracefully

```java
import org.openqa.selenium.TimeoutException;

public class GracefulTimeout {
    public void clickWithRetry(By locator, int maxAttempts) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
                element.click();
                System.out.println("Click successful on attempt " + attempt);
                return;
            } catch (TimeoutException e) {
                System.out.println("Attempt " + attempt + " failed. Retrying...");
                if (attempt == maxAttempts) {
                    throw new RuntimeException("Element not clickable after " + maxAttempts + " attempts", e);
                }
                // Optionally refresh page or take other recovery action
            }
        }
    }
}
```

### 7. Wait for Page Load Complete

```java
public class PageLoadWait {
    public void waitForPageLoad(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        // Wait for document.readyState to be 'complete'
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });

        System.out.println("Page loaded completely");
    }

    public void waitForJQueryToLoad(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        // Wait for jQuery AJAX calls to complete
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return (Boolean) js.executeScript("return jQuery.active == 0");
        });

        System.out.println("jQuery AJAX calls completed");
    }
}
```

### 8. Wait for AJAX Calls

```java
import org.openqa.selenium.JavascriptExecutor;

public class AjaxWait {
    public void waitForAjaxToComplete(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        // Wait for all AJAX requests to complete
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            // Check if jQuery is loaded
            Object jqueryActive = js.executeScript("return typeof jQuery != 'undefined' ? jQuery.active : 0");
            return jqueryActive.equals(0L);
        });
    }

    public void waitForAngularToLoad(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        // Wait for Angular requests to complete
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return (Boolean) js.executeScript(
                "return window.getAllAngularTestabilities().findIndex(x => !x.isStable()) === -1"
            );
        });
    }
}
```

### 9. Combine Multiple Conditions

```java
public class CombinedConditions {
    public void waitForElementAndText(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Wait for element to be visible AND contain specific text
        WebElement element = wait.until(driver -> {
            WebElement el = driver.findElement(By.id("status"));
            if (el.isDisplayed() && el.getText().contains("Complete")) {
                return el;
            }
            return null;
        });

        System.out.println("Element visible with expected text: " + element.getText());
    }

    public void waitForMultipleElements(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        // Wait for multiple conditions to be true
        wait.until(driver -> {
            boolean condition1 = driver.findElement(By.id("element1")).isDisplayed();
            boolean condition2 = driver.findElement(By.id("element2")).isEnabled();
            boolean condition3 = driver.findElements(By.className("item")).size() >= 5;

            return condition1 && condition2 && condition3;
        });

        System.out.println("All conditions met");
    }
}
```

### 10. Use Meaningful Variable Names and Comments

```java
// ❌ Unclear
WebDriverWait w = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement e = w.until(ExpectedConditions.visibilityOfElementLocated(By.id("x")));

// ✅ Clear and documented
WebDriverWait waitForElement = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for success message to appear after form submission
WebElement successMessage = waitForElement.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("successMessage"))
);
```

---

## 10. Common Mistakes and Solutions {#common-mistakes}

### Mistake 1: Using Thread.sleep() Everywhere

```java
// ❌ Bad
public void testLogin() throws InterruptedException {
    driver.get("https://example.com");
    Thread.sleep(3000);

    driver.findElement(By.id("username")).sendKeys("user");
    Thread.sleep(1000);

    driver.findElement(By.id("password")).sendKeys("pass");
    Thread.sleep(1000);

    driver.findElement(By.id("login")).click();
    Thread.sleep(5000);
}

// ✅ Good
public void testLogin() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

    driver.get("https://example.com");

    wait.until(ExpectedConditions.elementToBeClickable(By.id("username")))
        .sendKeys("user");

    wait.until(ExpectedConditions.elementToBeClickable(By.id("password")))
        .sendKeys("pass");

    wait.until(ExpectedConditions.elementToBeClickable(By.id("login")))
        .click();

    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("dashboard")));
}
```

**Why it's wrong:** Thread.sleep() wastes time and doesn't adapt to actual conditions.
**Solution:** Use explicit waits that respond to element state.

### Mistake 2: Mixing Implicit and Explicit Waits

```java
// ❌ Bad
public void setupDriver() {
    driver = new ChromeDriver();
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
}

public void testPage() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
    // Can result in unexpected wait times: 10s + 5s = 15s!
}

// ✅ Good
public void setupDriver() {
    driver = new ChromeDriver();
    // No implicit wait (or set to 0)
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0));
}

public void testPage() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
}
```

**Why it's wrong:** Unpredictable behavior, waits can compound.
**Solution:** Choose one strategy - preferably explicit waits.

### Mistake 3: Using Very Long Timeouts

```java
// ❌ Bad
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
// If element never appears, test waits 2 minutes!

// ✅ Good
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
try {
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
} catch (TimeoutException e) {
    // Handle appropriately - element truly not available
    fail("Element did not appear within reasonable time");
}
```

**Why it's wrong:** Masks real issues, makes tests slow.
**Solution:** Use reasonable timeouts (5-15 seconds typically).

### Mistake 4: Not Handling TimeoutException

```java
// ❌ Bad
public void clickElement() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    WebElement element = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));
    element.click();
    // If timeout occurs, test crashes without useful information
}

// ✅ Good
public void clickElement() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    try {
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));
        element.click();
        System.out.println("Element clicked successfully");
    } catch (TimeoutException e) {
        System.out.println("Element not clickable within timeout");
        System.out.println("Current URL: " + driver.getCurrentUrl());
        System.out.println("Page title: " + driver.getTitle());
        // Take screenshot for debugging
        takeScreenshot("element_not_clickable");
        throw new RuntimeException("Failed to click element", e);
    }
}
```

**Why it's wrong:** No error context, hard to debug failures.
**Solution:** Catch TimeoutException and provide useful debugging information.

### Mistake 5: Waiting for Wrong Condition

```java
// ❌ Bad - Element present but not visible
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("button")));
button.click(); // Might fail if element is hidden!

// ✅ Good - Wait for element to be clickable
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));
button.click(); // Element is definitely clickable
```

**Common condition mistakes:**
- Using `presenceOfElementLocated` when should use `visibilityOfElementLocated`
- Using `visibilityOfElementLocated` when should use `elementToBeClickable`
- Not waiting for text to be present
- Not waiting for element to be enabled

**Solution:** Choose the most specific condition for your need.

### Mistake 6: Using Waits for Static Elements

```java
// ❌ Unnecessary
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("logo")));
// Logo is always present immediately after page load

// ✅ Better
driver.get("https://example.com");
// Page load wait is sufficient
driver.findElement(By.id("logo")); // Available immediately
```

**Why it's wrong:** Adds unnecessary wait time to tests.
**Solution:** Only use waits for truly dynamic elements.

### Mistake 7: Not Waiting After Actions

```java
// ❌ Bad
driver.findElement(By.id("loadButton")).click();
String result = driver.findElement(By.id("result")).getText(); // Might fail!

// ✅ Good
driver.findElement(By.id("loadButton")).click();

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement resultElement = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("result"))
);
String result = resultElement.getText();
```

**Why it's wrong:** Actions often trigger changes that take time.
**Solution:** Wait for expected changes after performing actions.

### Mistake 8: Not Waiting for Overlays to Disappear

```java
// ❌ Bad
WebElement button = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("button")));
button.click(); // Fails if loading overlay still present!

// ✅ Good
// First, wait for loading overlay to disappear
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("loadingOverlay")));

// Then, interact with element
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));
button.click();
```

**Why it's wrong:** Element might be visible but not interactable due to overlay.
**Solution:** Wait for overlays/spinners to disappear before interaction.

---

## 11. Real-World Scenarios {#real-world}

### Scenario 1: Wait for Page Load Complete

```java
import org.openqa.selenium.JavascriptExecutor;

public class Scenario1_PageLoad {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        driver.get("https://example.com");

        // Wait for page to be fully loaded
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });

        System.out.println("Page loaded completely");

        // Now safe to interact with elements
        driver.findElement(By.id("searchBox")).sendKeys("Selenium");

        driver.quit();
    }
}
```

### Scenario 2: Wait for AJAX Response

```java
public class Scenario2_AjaxResponse {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        driver.get("https://example.com/products");

        // Click button that triggers AJAX call
        driver.findElement(By.id("loadMoreBtn")).click();

        // Wait for loading spinner to appear
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("loadingSpinner")));

        // Wait for loading spinner to disappear (AJAX complete)
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("loadingSpinner")));

        // Wait for new products to be visible
        wait.until(driver -> {
            List<WebElement> products = driver.findElements(By.className("product"));
            return products.size() >= 20; // Expect at least 20 products
        });

        System.out.println("AJAX call completed and products loaded");

        driver.quit();
    }
}
```

### Scenario 3: Wait for Element to be Clickable (No Overlay)

```java
public class Scenario3_NoOverlay {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        driver.get("https://example.com/checkout");

        // Fill form fields
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")))
            .sendKeys("user@example.com");

        // Click proceed button - triggers loading overlay
        driver.findElement(By.id("proceedBtn")).click();

        // Wait for processing overlay to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("overlay")));

        // Now submit button should be clickable
        WebElement submitBtn = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("submitOrder"))
        );

        // Additional check: ensure no other overlay is present
        wait.until(driver -> {
            List<WebElement> overlays = driver.findElements(By.className("modal-overlay"));
            return overlays.isEmpty() || !overlays.get(0).isDisplayed();
        });

        submitBtn.click();
        System.out.println("Order submitted successfully");

        driver.quit();
    }
}
```

### Scenario 4: Wait for Text to Appear

```java
public class Scenario4_TextAppear {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com/status");

        // Click refresh button
        driver.findElement(By.id("refreshStatus")).click();

        // Wait for status text to change from "Pending" to "Complete"
        boolean textChanged = wait.until(
            ExpectedConditions.textToBePresentInElementLocated(
                By.id("status"),
                "Complete"
            )
        );

        if (textChanged) {
            WebElement statusElement = driver.findElement(By.id("status"));
            System.out.println("Status updated to: " + statusElement.getText());
        }

        // Alternative: Wait for text to contain specific substring
        wait.until(driver -> {
            String statusText = driver.findElement(By.id("status")).getText();
            return statusText.contains("Success") || statusText.contains("Complete");
        });

        driver.quit();
    }
}
```

### Scenario 5: Wait for Element to Disappear (Loading Spinner)

```java
public class Scenario5_ElementDisappear {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

        driver.get("https://example.com/dashboard");

        // Trigger data load
        driver.findElement(By.id("loadDataBtn")).click();

        // Wait for spinner to appear first (confirms action triggered)
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("spinner")));
        System.out.println("Loading started...");

        // Wait for spinner to disappear (loading complete)
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("spinner")));
        System.out.println("Loading complete!");

        // Verify data is loaded
        WebElement dataTable = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("dataTable"))
        );

        List<WebElement> rows = dataTable.findElements(By.tagName("tr"));
        System.out.println("Loaded " + rows.size() + " rows of data");

        driver.quit();
    }
}
```

### Scenario 6: Wait for Attribute Value Change

```java
public class Scenario6_AttributeChange {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        driver.get("https://example.com/progress");

        // Start process
        driver.findElement(By.id("startBtn")).click();

        // Wait for progress bar to reach 100%
        wait.until(ExpectedConditions.attributeToBe(
            By.id("progressBar"),
            "aria-valuenow",
            "100"
        ));

        System.out.println("Progress reached 100%");

        // Alternative: Wait for class attribute to change
        wait.until(ExpectedConditions.attributeContains(
            By.id("status"),
            "class",
            "completed"
        ));

        // Custom wait for specific attribute value
        wait.until(driver -> {
            WebElement element = driver.findElement(By.id("downloadBtn"));
            String disabledAttr = element.getAttribute("disabled");
            return disabledAttr == null; // Button enabled when 'disabled' attribute removed
        });

        driver.findElement(By.id("downloadBtn")).click();
        System.out.println("Download started");

        driver.quit();
    }
}
```

### Scenario 7: Wait for Number of Elements

```java
public class Scenario7_NumberOfElements {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        driver.get("https://example.com/gallery");

        // Scroll to trigger lazy loading
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");

        // Wait for at least 50 images to load
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(
            By.className("gallery-image"),
            50
        ));

        List<WebElement> images = driver.findElements(By.className("gallery-image"));
        System.out.println("Loaded " + images.size() + " images");

        // Wait for exactly 100 images
        wait.until(ExpectedConditions.numberOfElementsToBe(
            By.className("gallery-image"),
            100
        ));

        System.out.println("All 100 images loaded");

        // Custom: Wait for images to be fully rendered
        wait.until(driver -> {
            List<WebElement> allImages = driver.findElements(By.className("gallery-image"));
            for (WebElement img : allImages) {
                Boolean isComplete = (Boolean) js.executeScript(
                    "return arguments[0].complete && arguments[0].naturalHeight > 0",
                    img
                );
                if (!isComplete) {
                    return false;
                }
            }
            return true;
        });

        System.out.println("All images fully rendered");

        driver.quit();
    }
}
```

### Scenario 8: Wait for Alert and Handle It

```java
public class Scenario8_AlertHandling {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://the-internet.herokuapp.com/javascript_alerts");

        // Click button that triggers alert
        driver.findElement(By.xpath("//button[text()='Click for JS Confirm']")).click();

        // Wait for alert to be present
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        System.out.println("Alert appeared with text: " + alert.getText());

        // Accept alert
        alert.accept();

        // Wait for result message
        WebElement result = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("result"))
        );

        System.out.println("Result: " + result.getText());

        // Example 2: Prompt alert
        driver.findElement(By.xpath("//button[text()='Click for JS Prompt']")).click();

        Alert promptAlert = wait.until(ExpectedConditions.alertIsPresent());
        promptAlert.sendKeys("Selenium WebDriver");
        promptAlert.accept();

        WebElement promptResult = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("result"))
        );

        System.out.println("Prompt result: " + promptResult.getText());

        driver.quit();
    }
}
```

---

## 12. Practice Exercises {#exercises}

### Exercise 1: Basic Implicit Wait (Easy)

**Problem:** Navigate to a dynamic page and use implicit wait to handle element loading.

```java
public class Exercise1 {
    public static void main(String[] args) {
        // TODO: Set up ChromeDriver
        // TODO: Set implicit wait of 10 seconds
        // TODO: Navigate to https://the-internet.herokuapp.com/dynamic_loading/1
        // TODO: Click the Start button
        // TODO: Get the text from the finish element
        // TODO: Print the text
        // TODO: Close browser
    }
}
```

**Solution:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;

public class Exercise1Solution {
    public static void main(String[] args) {
        // Set up ChromeDriver
        WebDriver driver = new ChromeDriver();

        // Set implicit wait of 10 seconds
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        // Navigate to dynamic loading page
        driver.get("https://the-internet.herokuapp.com/dynamic_loading/1");

        // Click the Start button
        WebElement startButton = driver.findElement(By.cssSelector("#start button"));
        startButton.click();

        // Get the text from the finish element (implicit wait applies here)
        WebElement finishElement = driver.findElement(By.id("finish"));
        String text = finishElement.getText();

        // Print the text
        System.out.println("Finish text: " + text);

        // Close browser
        driver.quit();
    }
}
```

---

### Exercise 2: Using Explicit Wait with ExpectedConditions (Medium)

**Problem:** Use explicit wait to handle multiple dynamic elements with different conditions.

```java
public class Exercise2 {
    public static void main(String[] args) {
        // TODO: Set up ChromeDriver
        // TODO: Navigate to https://the-internet.herokuapp.com/dynamic_controls
        // TODO: Use explicit wait to:
        //   1. Click Remove button and wait for checkbox to disappear
        //   2. Wait for "It's gone!" message to appear
        //   3. Click Add button and wait for checkbox to appear
        //   4. Wait for checkbox to be clickable and click it
        // TODO: Close browser
    }
}
```

**Solution:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class Exercise2Solution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://the-internet.herokuapp.com/dynamic_controls");

        // 1. Click Remove button
        WebElement removeButton = driver.findElement(By.xpath("//button[text()='Remove']"));
        removeButton.click();

        // Wait for checkbox to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("checkbox")));
        System.out.println("Checkbox removed");

        // 2. Wait for "It's gone!" message
        WebElement goneMessage = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("message"))
        );
        System.out.println("Message: " + goneMessage.getText());

        // 3. Click Add button
        WebElement addButton = driver.findElement(By.xpath("//button[text()='Add']"));
        addButton.click();

        // Wait for checkbox to appear
        WebElement checkbox = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("checkbox"))
        );
        System.out.println("Checkbox appeared");

        // 4. Wait for checkbox to be clickable and click it
        WebElement clickableCheckbox = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("checkbox"))
        );
        clickableCheckbox.click();
        System.out.println("Checkbox clicked");

        // Verify checkbox is selected
        boolean isSelected = clickableCheckbox.isSelected();
        System.out.println("Checkbox selected: " + isSelected);

        driver.quit();
    }
}
```

---

### Exercise 3: Create Custom Wait Condition (Medium)

**Problem:** Create a custom wait condition to wait for an element's text to match a specific pattern.

```java
public class Exercise3 {
    public static void main(String[] args) {
        // TODO: Create a custom wait condition that waits for element text to be a valid email format
        // TODO: Test with a page that dynamically updates text to an email
        // Pattern: text contains "@" and "."
    }
}
```

**Solution:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.regex.Pattern;

public class Exercise3Solution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        // For demonstration, using a page that updates text dynamically
        driver.get("https://example.com/dynamic-text");

        // Custom wait condition: Wait for text to match email pattern
        WebElement emailElement = wait.until(driver -> {
            WebElement element = driver.findElement(By.id("generatedEmail"));
            String text = element.getText();

            // Check if text matches email pattern
            if (isValidEmail(text)) {
                return element;
            }
            return null;
        });

        System.out.println("Valid email found: " + emailElement.getText());

        // Alternative: Using regex pattern in wait condition
        WebElement validatedElement = wait.until(driver -> {
            WebElement el = driver.findElement(By.id("generatedEmail"));
            String text = el.getText();
            Pattern emailPattern = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
            return emailPattern.matcher(text).matches() ? el : null;
        });

        System.out.println("Validated email: " + validatedElement.getText());

        driver.quit();
    }

    // Helper method to validate email format
    public static boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        return email.contains("@") && email.contains(".") && email.indexOf("@") < email.lastIndexOf(".");
    }
}
```

---

### Exercise 4: Fluent Wait Implementation (Hard)

**Problem:** Implement fluent wait with custom polling and exception handling for a file upload scenario.

```java
public class Exercise4 {
    public static void main(String[] args) {
        // TODO: Navigate to file upload page
        // TODO: Upload a file
        // TODO: Use fluent wait to:
        //   - Poll every 500ms
        //   - Wait up to 60 seconds
        //   - Ignore NoSuchElementException and StaleElementReferenceException
        //   - Wait for upload progress to reach 100%
        //   - Wait for success message
    }
}
```

**Solution:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import java.time.Duration;

public class Exercise4Solution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        // Navigate to file upload page
        driver.get("https://the-internet.herokuapp.com/upload");

        // Select file to upload
        WebElement fileInput = driver.findElement(By.id("file-upload"));
        fileInput.sendKeys("/path/to/test-file.txt"); // Update with actual file path

        // Click upload button
        driver.findElement(By.id("file-submit")).click();

        // Configure Fluent Wait
        Wait<WebDriver> fluentWait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(60))
            .pollingEvery(Duration.ofMillis(500))
            .withMessage("Upload did not complete within 60 seconds")
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class);

        // Wait for upload to complete (page shows uploaded file name)
        WebElement uploadedFile = fluentWait.until(driver -> {
            try {
                WebElement element = driver.findElement(By.id("uploaded-files"));
                String fileName = element.getText();
                return !fileName.isEmpty() ? element : null;
            } catch (Exception e) {
                return null;
            }
        });

        System.out.println("File uploaded successfully: " + uploadedFile.getText());

        // More complex example with progress tracking
        driver.get("https://example.com/file-upload-with-progress");

        // Upload file
        driver.findElement(By.id("file")).sendKeys("/path/to/large-file.zip");
        driver.findElement(By.id("upload")).click();

        // Wait for progress to reach 100%
        fluentWait.until(driver -> {
            try {
                WebElement progressBar = driver.findElement(By.id("uploadProgress"));
                String progress = progressBar.getAttribute("value");
                int progressValue = Integer.parseInt(progress);

                System.out.println("Upload progress: " + progressValue + "%");

                if (progressValue == 100) {
                    // Now wait for success message
                    WebElement successMsg = driver.findElement(By.className("success-message"));
                    return successMsg.isDisplayed() ? successMsg : null;
                }

                return null;
            } catch (Exception e) {
                return null;
            }
        });

        System.out.println("Upload completed with success message");

        driver.quit();
    }
}
```

---

### Exercise 5: Wait for Dynamic Content (Hard)

**Problem:** Handle a scenario where content loads dynamically via AJAX, including loading spinner and content updates.

```java
public class Exercise5 {
    public static void main(String[] args) {
        // TODO: Navigate to AJAX-enabled page
        // TODO: Click button to load content
        // TODO: Wait for spinner to appear
        // TODO: Wait for spinner to disappear
        // TODO: Wait for content to be loaded
        // TODO: Verify content count matches expected value
        // TODO: Extract and print all loaded content
    }
}
```

**Solution:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class Exercise5Solution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        // Navigate to AJAX page
        driver.get("https://the-internet.herokuapp.com/dynamic_loading/2");

        System.out.println("Initial page loaded");

        // Click button to trigger AJAX load
        WebElement startButton = driver.findElement(By.cssSelector("#start button"));
        startButton.click();
        System.out.println("Start button clicked");

        // Wait for loading indicator to appear (confirms AJAX started)
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("loading")));
        System.out.println("Loading spinner appeared");

        // Wait for loading spinner to disappear (AJAX complete)
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("loading")));
        System.out.println("Loading spinner disappeared");

        // Wait for finish element to be visible
        WebElement finishElement = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("finish"))
        );
        System.out.println("Content loaded: " + finishElement.getText());

        // Complex example with multiple items loading
        driver.get("https://example.com/ajax-content");

        driver.findElement(By.id("loadMoreBtn")).click();

        // Wait for spinner
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("spinner")));
        System.out.println("Loading additional content...");

        // Wait for spinner to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("spinner")));

        // Wait for specific number of items to be loaded
        wait.until(driver -> {
            List<WebElement> items = driver.findElements(By.className("content-item"));
            return items.size() >= 20; // Expect at least 20 items
        });

        // Verify and extract content
        List<WebElement> allItems = driver.findElements(By.className("content-item"));
        System.out.println("Total items loaded: " + allItems.size());

        // Print all loaded content
        System.out.println("\nLoaded content:");
        for (int i = 0; i < allItems.size(); i++) {
            System.out.println((i + 1) + ". " + allItems.get(i).getText());
        }

        // Wait for AJAX completion indicator in page
        wait.until(driver -> {
            String ajaxStatus = driver.findElement(By.id("ajaxStatus")).getText();
            return "Complete".equals(ajaxStatus);
        });

        System.out.println("All AJAX operations completed successfully");

        driver.quit();
    }
}
```

---

### Exercise 6: Create Reusable Wait Utility Class (Advanced)

**Problem:** Create a comprehensive utility class with reusable wait methods for common scenarios.

**Solution:**

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class WaitUtility {
    private WebDriver driver;
    private WebDriverWait wait;
    private static final int DEFAULT_TIMEOUT = 10;

    public WaitUtility(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
    }

    public WaitUtility(WebDriver driver, int timeoutInSeconds) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
    }

    /**
     * Wait for element to be visible
     */
    public WebElement waitForVisibility(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    /**
     * Wait for element to be clickable
     */
    public WebElement waitForClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    /**
     * Wait for element to be present
     */
    public WebElement waitForPresence(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }

    /**
     * Wait for element to be invisible
     */
    public boolean waitForInvisibility(By locator) {
        return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    /**
     * Wait for text to be present in element
     */
    public boolean waitForTextPresent(By locator, String text) {
        return wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

    /**
     * Wait for alert and return it
     */
    public Alert waitForAlert() {
        return wait.until(ExpectedConditions.alertIsPresent());
    }

    /**
     * Wait for specific number of elements
     */
    public List<WebElement> waitForNumberOfElements(By locator, int expectedCount) {
        wait.until(ExpectedConditions.numberOfElementsToBe(locator, expectedCount));
        return driver.findElements(locator);
    }

    /**
     * Wait for at least minimum number of elements
     */
    public List<WebElement> waitForMinimumElements(By locator, int minimumCount) {
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(locator, minimumCount - 1));
        return driver.findElements(locator);
    }

    /**
     * Wait for page to load completely
     */
    public void waitForPageLoad() {
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });
    }

    /**
     * Wait for jQuery to load (if present)
     */
    public void waitForJQuery() {
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return (Boolean) js.executeScript("return typeof jQuery != 'undefined' && jQuery.active == 0");
        });
    }

    /**
     * Wait for element attribute to have specific value
     */
    public boolean waitForAttribute(By locator, String attribute, String value) {
        return wait.until(ExpectedConditions.attributeToBe(locator, attribute, value));
    }

    /**
     * Wait for element to be stale (removed from DOM)
     */
    public boolean waitForStaleness(WebElement element) {
        return wait.until(ExpectedConditions.stalenessOf(element));
    }

    /**
     * Wait for custom condition with retry
     */
    public <T> T waitForCondition(ExpectedCondition<T> condition) {
        return wait.until(condition);
    }

    /**
     * Click element with wait
     */
    public void clickElement(By locator) {
        waitForClickable(locator).click();
    }

    /**
     * Type text with wait
     */
    public void typeText(By locator, String text) {
        WebElement element = waitForVisibility(locator);
        element.clear();
        element.sendKeys(text);
    }

    /**
     * Wait for frame and switch to it
     */
    public WebDriver waitAndSwitchToFrame(By frameLocator) {
        return wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameLocator));
    }

    /**
     * Wait for URL to contain specific text
     */
    public boolean waitForUrlContains(String urlFragment) {
        return wait.until(ExpectedConditions.urlContains(urlFragment));
    }

    /**
     * Wait for title to contain specific text
     */
    public boolean waitForTitleContains(String titleFragment) {
        return wait.until(ExpectedConditions.titleContains(titleFragment));
    }
}

// Usage Example
public class WaitUtilityExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WaitUtility waitUtil = new WaitUtility(driver, 15);

        driver.get("https://example.com");

        // Wait for page to load
        waitUtil.waitForPageLoad();

        // Click element
        waitUtil.clickElement(By.id("loginBtn"));

        // Type text
        waitUtil.typeText(By.id("username"), "testuser");
        waitUtil.typeText(By.id("password"), "password123");

        // Click submit
        waitUtil.clickElement(By.id("submitBtn"));

        // Wait for success message
        waitUtil.waitForTextPresent(By.id("message"), "Login successful");

        // Wait for URL change
        waitUtil.waitForUrlContains("/dashboard");

        System.out.println("Login successful!");

        driver.quit();
    }
}
```

---

## 13. Interview Questions {#interview-questions}

### Question 1: What are the different types of waits in Selenium?

**Answer:**

There are three main types of waits in Selenium:

1. **Implicit Wait:**
   - Set once for the entire WebDriver session
   - Applies globally to all `findElement()` calls
   - Waits for element to be present in DOM
   - Syntax: `driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));`

2. **Explicit Wait:**
   - Applied to specific elements
   - Waits for specific conditions using ExpectedConditions
   - More flexible and intelligent
   - Syntax:
   ```java
   WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
   wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
   ```

3. **Fluent Wait:**
   - Advanced version of explicit wait
   - Allows custom polling interval
   - Can ignore specific exceptions
   - More control over wait behavior
   - Syntax:
   ```java
   Wait<WebDriver> wait = new FluentWait<>(driver)
       .withTimeout(Duration.ofSeconds(30))
       .pollingEvery(Duration.ofMillis(500))
       .ignoring(NoSuchElementException.class);
   ```

---

### Question 2: What is the difference between Implicit and Explicit wait?

**Answer:**

| Aspect | Implicit Wait | Explicit Wait |
|--------|---------------|---------------|
| **Scope** | Global (all elements) | Specific elements |
| **Configuration** | Once per session | Per wait instance |
| **Condition** | Only presence in DOM | Multiple conditions available |
| **Flexibility** | Low | High |
| **Performance** | Can slow down negative tests | Efficient |
| **Best Practice** | Not recommended for modern apps | Recommended |
| **Mixing** | Cannot mix with explicit wait | Cannot mix with implicit wait |

**Example:**
```java
// Implicit - applies to ALL findElement calls
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
driver.findElement(By.id("any-element")); // Waits up to 10s

// Explicit - applies only to this specific wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("specific-element")));
```

---

### Question 3: Why should you avoid using Thread.sleep() in Selenium tests?

**Answer:**

Thread.sleep() should be avoided because:

1. **Fixed Delay:** Always waits the full duration, wasting time even if element loads faster
2. **Unreliable:** May not wait long enough if element takes longer on slow systems
3. **Not Dynamic:** Doesn't respond to actual element state
4. **Poor Performance:** Slows down test execution unnecessarily
5. **Maintenance Issue:** Makes tests brittle and hard to maintain

**Example:**
```java
// ❌ Bad - Always waits 5 seconds
Thread.sleep(5000);
driver.findElement(By.id("element")).click();

// ✅ Good - Waits only as long as needed (up to 10s max)
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("element"))).click();
```

---

### Question 4: What is WebDriverWait in Selenium?

**Answer:**

WebDriverWait is a class that provides explicit wait functionality in Selenium. It's part of the `org.openqa.selenium.support.ui` package.

**Key Features:**
- Waits for specific conditions to be true
- Uses ExpectedConditions for common scenarios
- Polls the DOM at regular intervals (default ~250-500ms)
- Throws TimeoutException if condition not met within timeout
- Can accept custom conditions using lambda expressions

**Syntax:**
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
```

**Parameters:**
- `driver`: WebDriver instance
- `Duration.ofSeconds(10)`: Maximum timeout period

---

### Question 5: What are ExpectedConditions in Selenium?

**Answer:**

ExpectedConditions is a class that provides ready-made conditions for common wait scenarios. It's used with WebDriverWait.

**Common ExpectedConditions:**

1. **Element State:**
   - `presenceOfElementLocated()` - Element present in DOM
   - `visibilityOfElementLocated()` - Element visible
   - `elementToBeClickable()` - Element clickable
   - `invisibilityOfElementLocated()` - Element not visible

2. **Text Conditions:**
   - `textToBePresentInElementLocated()` - Specific text present
   - `textToBePresentInElementValue()` - Text in input value

3. **Alert/Frame:**
   - `alertIsPresent()` - Alert present
   - `frameToBeAvailableAndSwitchToIt()` - Frame available

4. **Multiple Elements:**
   - `numberOfElementsToBe()` - Exact count
   - `numberOfElementsToBeMoreThan()` - Minimum count

**Example:**
```java
wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));
wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id("msg"), "Success"));
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("spinner")));
```

---

### Question 6: How do you create a custom wait condition in Selenium?

**Answer:**

Custom wait conditions can be created using lambda expressions or the Function interface.

**Method 1: Lambda Expression**
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

WebElement element = wait.until(driver -> {
    WebElement el = driver.findElement(By.id("counter"));
    int value = Integer.parseInt(el.getText());
    return value >= 100 ? el : null; // Return element when condition met
});
```

**Method 2: ExpectedCondition Interface**
```java
WebElement element = wait.until(new ExpectedCondition<WebElement>() {
    @Override
    public WebElement apply(WebDriver driver) {
        WebElement el = driver.findElement(By.id("status"));
        if (el.isDisplayed() && el.getText().equals("Complete")) {
            return el;
        }
        return null;
    }
});
```

**Method 3: Separate Method**
```java
public ExpectedCondition<Boolean> textLengthGreaterThan(By locator, int length) {
    return driver -> {
        String text = driver.findElement(locator).getText();
        return text.length() > length;
    };
}

// Usage
wait.until(textLengthGreaterThan(By.id("description"), 50));
```

---

### Question 7: What is FluentWait and when would you use it?

**Answer:**

FluentWait is an advanced wait mechanism that provides more control than WebDriverWait. It allows customization of:
- Polling interval (how often to check condition)
- Exceptions to ignore
- Custom error messages

**Key Features:**
- Custom polling frequency
- Can ignore specific exceptions during wait
- More granular control over wait behavior
- Better for complex scenarios

**When to Use:**
- Need custom polling intervals
- Working with frequently updating DOM
- Need to ignore multiple exception types
- Complex wait conditions requiring fine-tuned control

**Example:**
```java
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))           // Max wait time
    .pollingEvery(Duration.ofMillis(250))          // Check every 250ms
    .withMessage("Element not found!")              // Custom message
    .ignoring(NoSuchElementException.class)        // Ignore this exception
    .ignoring(StaleElementReferenceException.class);

WebElement element = fluentWait.until(driver -> {
    return driver.findElement(By.id("dynamic-element"));
});
```

---

### Question 8: Can you mix Implicit and Explicit waits? Why or why not?

**Answer:**

**No, you should NOT mix implicit and explicit waits.**

**Reasons:**
1. **Unpredictable Behavior:** Wait times can compound (10s implicit + 5s explicit = 15s total)
2. **Difficult to Debug:** Hard to determine which wait caused the delay
3. **Performance Issues:** Can lead to unnecessarily long waits
4. **Not Recommended:** Selenium documentation advises against mixing

**What Happens When Mixed:**
```java
// ❌ Bad - Mixed waits
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));

// Actual wait time could be: 10s + 5s = 15s in some scenarios!
```

**Best Practice:**
```java
// ✅ Good - Only explicit waits
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0)); // Set to 0

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
```

---

### Question 9: How do you wait for a page to load completely in Selenium?

**Answer:**

There are several ways to wait for complete page load:

**Method 1: Page Load Timeout**
```java
driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
driver.get("https://example.com"); // Waits up to 30s for page load
```

**Method 2: Wait for document.readyState**
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
wait.until(driver -> {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    return js.executeScript("return document.readyState").equals("complete");
});
```

**Method 3: Wait for jQuery (if used)**
```java
wait.until(driver -> {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    return (Boolean) js.executeScript("return typeof jQuery != 'undefined' && jQuery.active == 0");
});
```

**Method 4: Wait for specific element**
```java
// Wait for key element that appears when page is loaded
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("main-content")));
```

**Method 5: Combined approach**
```java
public void waitForFullPageLoad(WebDriver driver) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

    // Wait for document ready
    wait.until(driver -> {
        return ((JavascriptExecutor) driver)
            .executeScript("return document.readyState").equals("complete");
    });

    // Wait for jQuery if present
    wait.until(driver -> {
        return (Boolean) ((JavascriptExecutor) driver)
            .executeScript("return typeof jQuery == 'undefined' || jQuery.active == 0");
    });
}
```

---

### Question 10: How do you handle StaleElementReferenceException using waits?

**Answer:**

StaleElementReferenceException occurs when an element reference is no longer valid (DOM changed). Handle it using:

**Method 1: Catch and Re-find**
```java
try {
    element.click();
} catch (StaleElementReferenceException e) {
    element = driver.findElement(By.id("element"));
    element.click();
}
```

**Method 2: Use stalenessOf() condition**
```java
WebElement oldElement = driver.findElement(By.id("element"));

// Trigger page refresh
driver.findElement(By.id("refreshBtn")).click();

// Wait for old element to become stale
wait.until(ExpectedConditions.stalenessOf(oldElement));

// Find element again
WebElement newElement = driver.findElement(By.id("element"));
```

**Method 3: Fluent Wait with ignored exception**
```java
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(StaleElementReferenceException.class);

fluentWait.until(driver -> {
    WebElement el = driver.findElement(By.id("element"));
    el.click();
    return true;
});
```

**Method 4: Retry mechanism**
```java
public void clickWithRetry(By locator, int maxAttempts) {
    for (int i = 0; i < maxAttempts; i++) {
        try {
            driver.findElement(locator).click();
            return;
        } catch (StaleElementReferenceException e) {
            if (i == maxAttempts - 1) throw e;
        }
    }
}
```

---

### Question 11: What is the difference between presenceOfElementLocated and visibilityOfElementLocated?

**Answer:**

**presenceOfElementLocated:**
- Checks if element is present in DOM
- Element may be hidden (display: none, visibility: hidden)
- Element is in HTML structure
- Faster check
- Use when you just need to verify element exists

**visibilityOfElementLocated:**
- Checks if element is present AND visible
- Element must have height and width > 0
- Element must not be hidden by CSS
- More thorough check
- Use when you need to interact with element

**Example:**
```html
<!-- HTML -->
<div id="hidden" style="display: none;">Hidden Text</div>
<div id="visible">Visible Text</div>
```

```java
// presenceOfElementLocated - Will find hidden element
WebElement hidden = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("hidden"))
); // Success - element present in DOM

// visibilityOfElementLocated - Will NOT find hidden element
WebElement hiddenVisible = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("hidden"))
); // Fails - element not visible

// visibilityOfElementLocated - Will find visible element
WebElement visible = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("visible"))
); // Success - element visible
```

**When to use:**
- `presenceOfElementLocated`: Checking if element exists, reading attributes
- `visibilityOfElementLocated`: Before clicking, reading text, any interaction

---

### Question 12: How do you wait for an element to disappear in Selenium?

**Answer:**

Use `invisibilityOfElementLocated()` ExpectedCondition or custom wait.

**Method 1: invisibilityOfElementLocated**
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for loading spinner to disappear
boolean invisible = wait.until(
    ExpectedConditions.invisibilityOfElementLocated(By.id("loadingSpinner"))
);

if (invisible) {
    System.out.println("Element disappeared");
}
```

**Method 2: Custom lambda condition**
```java
wait.until(driver -> {
    List<WebElement> elements = driver.findElements(By.id("loadingSpinner"));
    return elements.isEmpty() || !elements.get(0).isDisplayed();
});
```

**Method 3: Wait for element to become stale**
```java
WebElement element = driver.findElement(By.id("tempElement"));

// Trigger action that removes element
driver.findElement(By.id("removeBtn")).click();

// Wait for element to become stale (removed from DOM)
wait.until(ExpectedConditions.stalenessOf(element));
```

**Method 4: Complete loading scenario**
```java
// Click button that shows then hides loading indicator
driver.findElement(By.id("submitBtn")).click();

// Wait for spinner to appear (confirms action started)
wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("spinner")));
System.out.println("Loading started...");

// Wait for spinner to disappear (action complete)
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("spinner")));
System.out.println("Loading complete!");

// Now interact with results
WebElement results = driver.findElement(By.id("results"));
```

---

## 14. Key Takeaways {#key-takeaways}

### Essential Points to Remember

1. **Types of Waits:**
   - **Implicit Wait:** Global, set once, waits for presence only
   - **Explicit Wait:** Specific elements, waits for conditions, recommended
   - **Fluent Wait:** Advanced explicit wait with custom polling
   - **Thread.sleep():** Avoid - use only for debugging

2. **Best Practices:**
   - Prefer explicit wait over implicit wait
   - Never mix implicit and explicit waits
   - Use appropriate ExpectedConditions
   - Handle TimeoutException gracefully
   - Create reusable wait utility methods
   - Set reasonable timeout values (5-15 seconds typically)

3. **Common Wait Conditions:**
   - `elementToBeClickable()` - Before clicking
   - `visibilityOfElementLocated()` - Before reading text
   - `presenceOfElementLocated()` - To check existence
   - `invisibilityOfElementLocated()` - Wait for disappearance
   - `textToBePresentInElementLocated()` - Wait for specific text

4. **When to Use Each Wait:**
   - **Implicit:** Simple apps with consistent load times (not recommended for modern apps)
   - **Explicit:** Modern web apps, AJAX, dynamic content (recommended)
   - **Fluent:** Complex scenarios, frequent DOM changes, custom polling needed

5. **Common Mistakes to Avoid:**
   - Using Thread.sleep() instead of smart waits
   - Mixing implicit and explicit waits
   - Setting very long timeouts
   - Not handling TimeoutException
   - Waiting for wrong conditions
   - Using waits for static elements

6. **Performance Tips:**
   - Use specific conditions (clickable vs visible vs present)
   - Set appropriate timeouts
   - Use custom polling for frequently updating elements
   - Wait for page load complete before interactions
   - Wait for AJAX/jQuery to complete

7. **Real-World Applications:**
   - Wait for page load
   - Wait for AJAX responses
   - Wait for loading spinners to disappear
   - Wait for dynamic content to load
   - Wait for alerts and pop-ups
   - Wait for element state changes

### Quick Reference Card

```java
// Setup
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Common Waits
wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, "text"));

// Custom Wait
wait.until(driver -> {
    // Your custom condition
    return condition ? element : null;
});

// Fluent Wait
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);
```

### Next Steps

1. **Practice:** Implement waits in your test scripts
2. **Experiment:** Try different wait types and conditions
3. **Build Utilities:** Create reusable wait helper classes
4. **Learn Advanced:** Study custom wait conditions
5. **Optimize:** Profile your tests to find optimal timeouts
6. **Master:** Handle complex AJAX and SPA scenarios

### Resources for Further Learning

- Selenium Official Documentation: [https://www.selenium.dev/documentation/webdriver/waits/](https://www.selenium.dev/documentation/webdriver/waits/)
- Practice Site: [https://the-internet.herokuapp.com/](https://the-internet.herokuapp.com/)
- ExpectedConditions JavaDoc: Study all available conditions

---

**Remember:** Proper synchronization using waits is crucial for stable, reliable, and maintainable test automation. Master waits to master Selenium!

---

## Navigation

**Previous:** [Day 4: Selenium WebDriver Basics](#)
**Next:** [Day 6: Handling Web Elements](#)
**Course Home:** [Selenium Automation Daily](../)

---

**End of Day 5: Waits in Selenium**
