# Day 24: Waits in Selenium - Part 2 (Fluent Wait & Custom Conditions)

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand Fluent Wait and its advantages
- Configure polling intervals and timeout durations
- Ignore specific exceptions during waits
- Create custom wait conditions using Function interface
- Implement advanced wait strategies
- Choose between different wait mechanisms
- Build reusable wait utilities for test frameworks

---

## 1. Introduction to Fluent Wait

### What is Fluent Wait?

Fluent Wait is the most flexible wait mechanism in Selenium. It allows you to:
- Define maximum wait time
- Set custom polling intervals
- Ignore specific exceptions during polling
- Define custom conditions to wait for

### FluentWait vs WebDriverWait

**WebDriverWait** is actually a specialized implementation of FluentWait with predefined settings.

```java
// WebDriverWait internally extends FluentWait
public class WebDriverWait extends FluentWait<WebDriver> {
    // Default polling: 500ms
    // Default ignored exception: NotFoundException
}
```

### Key Characteristics

1. **Customizable polling frequency** - Check every N milliseconds
2. **Exception handling** - Ignore specific exceptions during wait
3. **Custom conditions** - Define your own wait logic
4. **Message customization** - Provide meaningful error messages
5. **Functional programming** - Uses Function<T, V> interface

---

## 2. Basic Fluent Wait Syntax

### Creating a FluentWait Instance

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))           // Maximum wait time
    .pollingEvery(Duration.ofMillis(500))          // Check every 500ms
    .ignoring(NoSuchElementException.class);       // Ignore this exception
```

### Complete Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import java.time.Duration;

public class FluentWaitExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/dynamic-content");

        // Create FluentWait
        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(30))
            .pollingEvery(Duration.ofSeconds(2))
            .ignoring(NoSuchElementException.class)
            .withMessage("Element not found within 30 seconds");

        // Use the wait
        WebElement element = wait.until(driver ->
            driver.findElement(By.id("dynamicElement"))
        );

        element.click();
        driver.quit();
    }
}
```

---

## 3. FluentWait Configuration Options

### 3.1 withTimeout()

Sets the maximum time to wait for a condition.

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30));  // Wait up to 30 seconds
```

### 3.2 pollingEvery()

Sets the frequency of checking the condition.

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(250));  // Check every 250ms
```

**Effect on performance:**
- **Smaller interval (e.g., 100ms)** - More frequent checks, faster response but more CPU usage
- **Larger interval (e.g., 5s)** - Less frequent checks, slower response but less CPU usage
- **Default (500ms)** - Good balance for most scenarios

### 3.3 ignoring()

Ignores specific exceptions during polling.

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofSeconds(1))
    .ignoring(NoSuchElementException.class)
    .ignoring(StaleElementReferenceException.class);
```

**Common exceptions to ignore:**
- `NoSuchElementException` - Element not found
- `StaleElementReferenceException` - Element reference is stale
- `ElementNotInteractableException` - Element not interactable yet

### 3.4 withMessage()

Provides a custom error message for timeout.

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofSeconds(1))
    .withMessage("Custom error: Product list did not load in time");
```

---

## 4. Using FluentWait with ExpectedConditions

You can use FluentWait with the same ExpectedConditions as WebDriverWait.

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(20))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);

// Using ExpectedConditions
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("dynamicElement"))
);
```

---

## 5. Custom Wait Conditions

### 5.1 Using Lambda Expressions

The most modern and concise way to create custom conditions.

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofSeconds(1));

// Custom condition: wait for element text to be non-empty
WebElement element = wait.until(driver -> {
    WebElement el = driver.findElement(By.id("result"));
    String text = el.getText();
    if (text != null && !text.isEmpty()) {
        return el;
    }
    return null;
});
```

### 5.2 Wait for Specific Text

```java
public WebElement waitForElementWithText(WebDriver driver, By locator, String expectedText) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(15))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class);

    return wait.until(driver -> {
        WebElement element = driver.findElement(locator);
        if (element.getText().equals(expectedText)) {
            return element;
        }
        return null;
    });
}

// Usage
WebElement message = waitForElementWithText(driver, By.id("statusMsg"), "Success");
```

### 5.3 Wait for Element Count

```java
public List<WebElement> waitForElementCount(WebDriver driver, By locator, int expectedCount) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(20))
        .pollingEvery(Duration.ofSeconds(1));

    return wait.until(driver -> {
        List<WebElement> elements = driver.findElements(locator);
        if (elements.size() == expectedCount) {
            return elements;
        }
        return null;
    });
}

// Usage
List<WebElement> products = waitForElementCount(driver, By.className("product"), 10);
System.out.println("Found " + products.size() + " products");
```

### 5.4 Wait for Attribute Value

```java
public WebElement waitForAttributeValue(WebDriver driver, By locator,
                                       String attribute, String expectedValue) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(15))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class);

    return wait.until(driver -> {
        WebElement element = driver.findElement(locator);
        String actualValue = element.getAttribute(attribute);
        if (expectedValue.equals(actualValue)) {
            return element;
        }
        return null;
    });
}

// Usage: Wait for class attribute to contain "active"
WebElement activeTab = waitForAttributeValue(driver,
    By.id("tab1"), "class", "tab active");
```

### 5.5 Wait for CSS Property

```java
public WebElement waitForCssProperty(WebDriver driver, By locator,
                                     String property, String expectedValue) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(15))
        .pollingEvery(Duration.ofMillis(500));

    return wait.until(driver -> {
        WebElement element = driver.findElement(locator);
        String actualValue = element.getCssValue(property);
        if (expectedValue.equals(actualValue)) {
            return element;
        }
        return null;
    });
}

// Usage: Wait for element color to change
WebElement highlightedElement = waitForCssProperty(driver,
    By.id("notification"), "background-color", "rgba(0, 255, 0, 1)");
```

### 5.6 Wait for Element to be Enabled

```java
public WebElement waitForElementEnabled(WebDriver driver, By locator) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(10))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class);

    return wait.until(driver -> {
        WebElement element = driver.findElement(locator);
        if (element.isEnabled()) {
            return element;
        }
        return null;
    });
}
```

### 5.7 Wait for Page Load Complete

```java
public Boolean waitForPageLoad(WebDriver driver) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(30))
        .pollingEvery(Duration.ofMillis(500));

    return wait.until(driver -> {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        String readyState = js.executeScript("return document.readyState").toString();
        return readyState.equals("complete");
    });
}
```

### 5.8 Wait for AJAX Call to Complete

```java
public Boolean waitForAjaxComplete(WebDriver driver) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(30))
        .pollingEvery(Duration.ofMillis(500));

    return wait.until(driver -> {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Boolean ajaxComplete = (Boolean) js.executeScript("return jQuery.active == 0");
        return ajaxComplete;
    });
}
```

### 5.9 Wait for Element to Stop Moving

```java
public WebElement waitForElementToStopMoving(WebDriver driver, By locator) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(15))
        .pollingEvery(Duration.ofMillis(100))
        .ignoring(NoSuchElementException.class);

    return wait.until(driver -> {
        WebElement element = driver.findElement(locator);
        Point location1 = element.getLocation();
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        Point location2 = element.getLocation();

        if (location1.equals(location2)) {
            return element;
        }
        return null;
    });
}
```

---

## 6. Creating Reusable Wait Utility Class

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import java.time.Duration;
import java.util.List;

public class WaitHelper {
    private WebDriver driver;
    private static final int DEFAULT_TIMEOUT = 30;
    private static final int DEFAULT_POLLING = 500;

    public WaitHelper(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * Creates a FluentWait with default settings
     */
    private Wait<WebDriver> getFluentWait(int timeoutInSeconds) {
        return new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(timeoutInSeconds))
            .pollingEvery(Duration.ofMillis(DEFAULT_POLLING))
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class);
    }

    /**
     * Wait for element to be visible
     */
    public WebElement waitForElementVisible(By locator) {
        return getFluentWait(DEFAULT_TIMEOUT).until(
            ExpectedConditions.visibilityOfElementLocated(locator)
        );
    }

    /**
     * Wait for element to be clickable
     */
    public WebElement waitForElementClickable(By locator) {
        return getFluentWait(DEFAULT_TIMEOUT).until(
            ExpectedConditions.elementToBeClickable(locator)
        );
    }

    /**
     * Wait for element to be invisible
     */
    public boolean waitForElementInvisible(By locator) {
        return getFluentWait(DEFAULT_TIMEOUT).until(
            ExpectedConditions.invisibilityOfElementLocated(locator)
        );
    }

    /**
     * Wait for specific text in element
     */
    public WebElement waitForTextInElement(By locator, String text) {
        return getFluentWait(DEFAULT_TIMEOUT).until(driver -> {
            WebElement element = driver.findElement(locator);
            if (element.getText().contains(text)) {
                return element;
            }
            return null;
        });
    }

    /**
     * Wait for specific number of elements
     */
    public List<WebElement> waitForElementCount(By locator, int count) {
        return getFluentWait(DEFAULT_TIMEOUT).until(driver -> {
            List<WebElement> elements = driver.findElements(locator);
            if (elements.size() == count) {
                return elements;
            }
            return null;
        });
    }

    /**
     * Wait for attribute to contain value
     */
    public WebElement waitForAttributeContains(By locator, String attribute, String value) {
        return getFluentWait(DEFAULT_TIMEOUT).until(driver -> {
            WebElement element = driver.findElement(locator);
            String attrValue = element.getAttribute(attribute);
            if (attrValue != null && attrValue.contains(value)) {
                return element;
            }
            return null;
        });
    }

    /**
     * Wait for URL to contain text
     */
    public boolean waitForUrlContains(String urlFragment) {
        return getFluentWait(DEFAULT_TIMEOUT).until(
            ExpectedConditions.urlContains(urlFragment)
        );
    }

    /**
     * Wait for page load complete
     */
    public boolean waitForPageLoad() {
        return getFluentWait(DEFAULT_TIMEOUT).until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });
    }

    /**
     * Wait for alert to be present
     */
    public Alert waitForAlert() {
        return getFluentWait(DEFAULT_TIMEOUT).until(
            ExpectedConditions.alertIsPresent()
        );
    }

    /**
     * Wait for element to be enabled
     */
    public WebElement waitForElementEnabled(By locator) {
        return getFluentWait(DEFAULT_TIMEOUT).until(driver -> {
            WebElement element = driver.findElement(locator);
            if (element.isEnabled()) {
                return element;
            }
            return null;
        });
    }
}
```

### Using the WaitHelper Class

```java
public class TestWithWaitHelper {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WaitHelper waitHelper = new WaitHelper(driver);

        driver.get("https://example.com");

        // Wait for element to be clickable
        WebElement loginBtn = waitHelper.waitForElementClickable(By.id("loginBtn"));
        loginBtn.click();

        // Wait for specific text
        WebElement message = waitHelper.waitForTextInElement(
            By.id("statusMessage"), "Login successful"
        );

        // Wait for URL change
        waitHelper.waitForUrlContains("dashboard");

        // Wait for page load
        waitHelper.waitForPageLoad();

        driver.quit();
    }
}
```

---

## 7. Comparison: Implicit vs Explicit vs Fluent Wait

| Feature | Implicit Wait | Explicit Wait (WebDriverWait) | Fluent Wait |
|---------|---------------|-------------------------------|-------------|
| **Polling Interval** | Fixed (500ms) | Fixed (500ms) | Customizable |
| **Timeout** | One global value | Per condition | Per condition |
| **Ignored Exceptions** | NoSuchElementException only | NotFoundException | Customizable |
| **Custom Conditions** | No | Yes (ExpectedConditions) | Yes (Full control) |
| **Scope** | All elements | Specific conditions | Specific conditions |
| **Flexibility** | Low | Medium | High |
| **Code Complexity** | Simple | Moderate | Complex |
| **Use Case** | Simple apps | Most scenarios | Complex scenarios |

---

## 8. Advanced Wait Scenarios

### Scenario 1: Waiting for Multiple Conditions

```java
public WebElement waitForMultipleConditions(WebDriver driver, By locator) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(20))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class);

    return wait.until(driver -> {
        WebElement element = driver.findElement(locator);
        // Element must be visible, enabled, and have specific text
        if (element.isDisplayed() &&
            element.isEnabled() &&
            element.getText().contains("Click Me")) {
            return element;
        }
        return null;
    });
}
```

### Scenario 2: Waiting with Retry Logic

```java
public WebElement waitWithRetry(WebDriver driver, By locator, int maxRetries) {
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(5))
        .pollingEvery(Duration.ofMillis(500))
        .ignoring(NoSuchElementException.class);

    for (int i = 0; i < maxRetries; i++) {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        } catch (TimeoutException e) {
            System.out.println("Attempt " + (i + 1) + " failed, retrying...");
            driver.navigate().refresh();
        }
    }
    throw new RuntimeException("Element not found after " + maxRetries + " retries");
}
```

### Scenario 3: Conditional Wait Based on Element State

```java
public void waitBasedOnLoadingIndicator(WebDriver driver, By contentLocator) {
    By loadingSpinner = By.id("loadingSpinner");
    Wait<WebDriver> wait = new FluentWait<>(driver)
        .withTimeout(Duration.ofSeconds(30))
        .pollingEvery(Duration.ofMillis(500));

    // Check if loading spinner exists
    List<WebElement> spinners = driver.findElements(loadingSpinner);

    if (!spinners.isEmpty() && spinners.get(0).isDisplayed()) {
        // Wait for spinner to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinner));
    }

    // Wait for content
    wait.until(ExpectedConditions.visibilityOfElementLocated(contentLocator));
}
```

---

## 9. Best Practices

### 1. Choose the Right Wait Mechanism

```java
// For simple, stable apps
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// For most scenarios
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// For complex, custom scenarios
FluentWait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(250));
```

### 2. Set Appropriate Polling Intervals

```java
// Fast-changing elements (animations)
.pollingEvery(Duration.ofMillis(100))

// Standard elements
.pollingEvery(Duration.ofMillis(500))

// Slow operations (backend processing)
.pollingEvery(Duration.ofSeconds(2))
```

### 3. Ignore Relevant Exceptions Only

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .ignoring(NoSuchElementException.class)
    .ignoring(StaleElementReferenceException.class);
    // Don't ignore TimeoutException - you want to know when waits fail!
```

### 4. Provide Meaningful Error Messages

```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .withMessage("Product list failed to load after 30 seconds. Check network connection.");
```

### 5. Return Useful Values from Custom Conditions

```java
// Good - returns the element
wait.until(driver -> {
    WebElement element = driver.findElement(By.id("result"));
    return element.isDisplayed() ? element : null;
});

// Bad - returns boolean (you'll need to find element again)
wait.until(driver ->
    driver.findElement(By.id("result")).isDisplayed()
);
```

---

## 10. Practical Exercises

### Exercise 1: Custom Polling Interval
Create a FluentWait that checks every 100ms for a fast-changing element.

### Exercise 2: Multiple Exception Handling
Create a wait that ignores NoSuchElementException, StaleElementReferenceException, and ElementNotInteractableException.

### Exercise 3: Text Content Wait
Implement a custom condition that waits for element text to match a regex pattern.

### Exercise 4: Element Count Wait
Create a method that waits for more than N elements to be present.

### Exercise 5: Attribute Wait
Implement a wait for an element's "data-status" attribute to equal "complete".

### Exercise 6: Complex Condition
Create a custom condition that waits for an element to be visible, enabled, and contain specific CSS class.

### Exercise 7: Wait Utility
Extend the WaitHelper class with 3 additional custom wait methods.

### Exercise 8: Performance Comparison
Compare execution times of the same test using different polling intervals (100ms, 500ms, 2s).

### Exercise 9: Retry Mechanism
Implement a wait that retries by refreshing the page if element doesn't appear.

### Exercise 10: Dynamic Timeout
Create a wait method that accepts timeout as a parameter and adjusts based on element complexity.

---

## 11. Key Takeaways

1. **FluentWait** is the most flexible wait mechanism in Selenium
2. **Polling interval** can be customized for better performance
3. **Multiple exceptions** can be ignored during polling
4. **Custom conditions** use Function<T, V> interface
5. **Lambda expressions** make custom conditions concise
6. **WebDriverWait** is a specialized FluentWait with defaults
7. **Return useful values** from custom conditions (elements, not booleans)
8. **Provide meaningful error messages** for debugging
9. **Choose appropriate polling intervals** based on element behavior
10. **Create reusable utilities** for common wait scenarios

---

## 12. Common Interview Questions

1. What is FluentWait and how is it different from WebDriverWait?
2. How do you customize the polling interval in FluentWait?
3. Which exceptions should be ignored during waits?
4. How do you create a custom wait condition?
5. What is the Function interface in Java and how is it used in waits?
6. How do you wait for an element attribute to change?
7. What's the recommended polling interval for most scenarios?
8. How do you wait for AJAX calls to complete?
9. Can you wait for an element to stop moving?
10. How do you implement retry logic with waits?

---

## 13. Additional Resources

### Official Documentation
- [FluentWait JavaDoc](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/FluentWait.html)
- [Function Interface JavaDoc](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html)
- [Selenium Wait Strategies](https://www.selenium.dev/documentation/webdriver/waits/)

### Practice Websites
- [The Internet - Dynamic Loading](http://the-internet.herokuapp.com/dynamic_loading/1)
- [SeleniumEasy - Dynamic Data Loading](https://demo.seleniumeasy.com/dynamic-data-loading-demo.html)

---

## Navigation

- **Previous:** [Day 23: Waits - Part 1 (Implicit & Explicit)](./day23_waits_part1.md)
- **Next:** [Day 25: Alerts & Popups](./day25_alerts_popups.md)
- **Week 4 Home:** [Week 4 Overview](./README.md)

---

**Happy Learning!** FluentWait mastery gives you complete control over synchronization in your test automation framework.
