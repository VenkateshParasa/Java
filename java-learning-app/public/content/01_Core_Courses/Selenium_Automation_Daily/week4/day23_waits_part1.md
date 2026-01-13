# Day 23: Waits in Selenium - Part 1 (Implicit & Explicit Waits)

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the need for waits in Selenium WebDriver
- Differentiate between Implicit Wait and Explicit Wait
- Implement Implicit Waits in test scripts
- Implement Explicit Waits using WebDriverWait
- Use ExpectedConditions class effectively
- Choose the appropriate wait strategy for different scenarios
- Handle timeout exceptions properly

---

## 1. Introduction to Waits

### Why Do We Need Waits?

Modern web applications are dynamic and use AJAX, JavaScript, and various frameworks that load elements asynchronously. Selenium WebDriver executes commands very quickly, often faster than the web application can respond. This creates synchronization issues where Selenium tries to interact with elements that haven't loaded yet.

### Common Problems Without Waits

```java
// This code will likely fail!
driver.get("https://example.com");
driver.findElement(By.id("dynamicButton")).click();  // NoSuchElementException!
```

**Why it fails:** The page might still be loading, and the element might not be available yet.

### The Wrong Solution: Thread.sleep()

```java
// BAD PRACTICE - Don't do this!
driver.get("https://example.com");
Thread.sleep(5000);  // Wait for 5 seconds
driver.findElement(By.id("dynamicButton")).click();
```

**Problems with Thread.sleep():**
1. **Fixed wait time** - Wastes time if element loads faster
2. **No guarantee** - Element might take longer than specified time
3. **Makes tests slower** - Always waits full duration
4. **Hard to maintain** - Different environments have different speeds
5. **Not dynamic** - Doesn't adapt to actual load time

### The Right Solution: Selenium Waits

Selenium provides three types of waits:
1. **Implicit Wait** - Global polling mechanism
2. **Explicit Wait** - Conditional wait for specific elements
3. **Fluent Wait** - Customizable explicit wait (covered in Day 24)

---

## 2. Implicit Wait

### What is Implicit Wait?

Implicit Wait tells WebDriver to poll the DOM for a specified duration when trying to find an element. If the element is not immediately available, WebDriver will wait up to the specified time before throwing an exception.

### Syntax

```java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

### Key Characteristics

1. **Global setting** - Applies to all findElement() calls
2. **Set once** - Usually set right after driver initialization
3. **Polls the DOM** - Repeatedly searches for elements
4. **Default polling frequency** - Checks every 500ms
5. **Affects all elements** - Works for all findElement/findElements calls

### Complete Example

```java
import org.openqa.selenium.By;
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
        driver.findElement(By.id("dynamicButton")).click();

        // Also applies to this element
        driver.findElement(By.name("username")).sendKeys("testuser");

        driver.quit();
    }
}
```

### How Implicit Wait Works

```
1. findElement() called
2. Element not found immediately
3. WebDriver waits 500ms and tries again
4. Still not found? Wait 500ms and try again
5. Repeat until element found OR timeout reached
6. If timeout reached → throw NoSuchElementException
```

### Implicit Wait Timeouts

```java
// Page load timeout
driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));

// Script execution timeout (for executeScript)
driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(20));

// Implicit wait (for element finding)
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

### Advantages of Implicit Wait

1. **Simple to implement** - One line of code
2. **Global application** - No need to specify for each element
3. **Reduces code complexity** - Less verbose than explicit waits
4. **Good for stable applications** - Works well when elements load predictably

### Disadvantages of Implicit Wait

1. **Not flexible** - Same timeout for all elements
2. **Can slow tests** - Waits even when not needed
3. **Limited conditions** - Only waits for presence, not visibility or clickability
4. **Difficult to debug** - Hard to know which element is causing delays
5. **Cannot wait for element to disappear** - Only waits for presence

### When to Use Implicit Wait

Use implicit wait when:
- Application elements load predictably
- You want a simple, global wait strategy
- Most elements appear within the same timeframe
- You're automating a stable, well-designed application

---

## 3. Explicit Wait

### What is Explicit Wait?

Explicit Wait tells WebDriver to wait for a specific condition to be met before proceeding. It's more intelligent and flexible than implicit wait.

### Core Components

1. **WebDriverWait** - The wait mechanism
2. **ExpectedConditions** - Pre-built conditions to wait for
3. **Duration** - Maximum wait time

### Basic Syntax

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("dynamicElement")));
```

### Complete Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ExplicitWaitExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/ajax-demo");

        // Create WebDriverWait object
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Wait for element to be visible
        WebElement button = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("startButton"))
        );
        button.click();

        // Wait for result to appear
        WebElement result = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.id("result"))
        );
        System.out.println("Result: " + result.getText());

        driver.quit();
    }
}
```

---

## 4. ExpectedConditions Class

The ExpectedConditions class provides commonly used wait conditions. Here are the most important ones:

### 4.1 Element Presence

```java
// Waits for element to be present in DOM (may not be visible)
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("element")));
```

**Use when:** Element needs to exist in DOM, visibility doesn't matter.

### 4.2 Element Visibility

```java
// Waits for element to be visible on the page
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));

// Or if you already have the WebElement
WebElement element = driver.findElement(By.id("element"));
wait.until(ExpectedConditions.visibilityOf(element));
```

**Use when:** You need to verify element is displayed to the user.

### 4.3 Element Clickability

```java
// Waits for element to be visible and enabled (clickable)
wait.until(ExpectedConditions.elementToBeClickable(By.id("submitButton")));
```

**Use when:** You need to click an element.

### 4.4 Element Selection State

```java
// Wait for element to be selected (checkbox/radio)
wait.until(ExpectedConditions.elementToBeSelected(By.id("checkbox")));

// Wait for specific selection state
wait.until(ExpectedConditions.elementSelectionStateToBe(By.id("checkbox"), true));
```

**Use when:** Verifying checkbox or radio button state.

### 4.5 Text Presence

```java
// Wait for specific text to be present in element
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("message"), "Success"
));

// Wait for text in element value attribute
wait.until(ExpectedConditions.textToBePresentInElementValue(
    By.id("input"), "expected value"
));
```

**Use when:** Waiting for specific text to appear.

### 4.6 Frame Availability

```java
// Wait for frame to be available and switch to it
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("iframe")));
```

**Use when:** Working with iframes.

### 4.7 Alert Presence

```java
// Wait for alert to be present
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
alert.accept();
```

**Use when:** Handling JavaScript alerts.

### 4.8 Invisibility of Element

```java
// Wait for element to become invisible or removed from DOM
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("loadingSpinner")));
```

**Use when:** Waiting for loading indicators to disappear.

### 4.9 Staleness of Element

```java
WebElement element = driver.findElement(By.id("oldElement"));
// Perform action that causes page refresh
driver.findElement(By.id("refreshButton")).click();
// Wait for old element to become stale
wait.until(ExpectedConditions.stalenessOf(element));
```

**Use when:** Waiting for page refresh or DOM update.

### 4.10 Number of Windows

```java
// Wait for specific number of windows/tabs
wait.until(ExpectedConditions.numberOfWindowsToBe(2));
```

**Use when:** Working with multiple windows.

### 4.11 Attribute Value

```java
// Wait for specific attribute value
wait.until(ExpectedConditions.attributeToBe(By.id("element"), "class", "active"));

// Wait for attribute to contain value
wait.until(ExpectedConditions.attributeContains(By.id("element"), "class", "highlight"));
```

**Use when:** Checking element attribute changes.

### 4.12 URL Conditions

```java
// Wait for URL to be a specific value
wait.until(ExpectedConditions.urlToBe("https://example.com/dashboard"));

// Wait for URL to contain text
wait.until(ExpectedConditions.urlContains("dashboard"));

// Wait for URL to match regex pattern
wait.until(ExpectedConditions.urlMatches(".*dashboard.*"));
```

**Use when:** Verifying page navigation.

### 4.13 Title Conditions

```java
// Wait for specific page title
wait.until(ExpectedConditions.titleIs("Dashboard - Example"));

// Wait for title to contain text
wait.until(ExpectedConditions.titleContains("Dashboard"));
```

**Use when:** Verifying page loads correctly.

---

## 5. Comprehensive Examples

### Example 1: Login Form with Waits

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoginWithWaits {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://example.com/login");

            // Wait for username field to be clickable
            WebElement username = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("username"))
            );
            username.sendKeys("testuser");

            // Wait for password field
            WebElement password = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("password"))
            );
            password.sendKeys("password123");

            // Wait for login button and click
            WebElement loginBtn = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("loginBtn"))
            );
            loginBtn.click();

            // Wait for URL to change (successful login)
            wait.until(ExpectedConditions.urlContains("dashboard"));

            // Wait for welcome message
            WebElement welcomeMsg = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("welcomeMessage"))
            );
            System.out.println("Login successful: " + welcomeMsg.getText());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Example 2: Handling Loading Indicators

```java
public class LoadingIndicatorExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        driver.get("https://example.com/data-load");

        // Click button that triggers loading
        driver.findElement(By.id("loadDataBtn")).click();

        // Wait for loading spinner to appear
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("loadingSpinner")));
        System.out.println("Loading started...");

        // Wait for loading spinner to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("loadingSpinner")));
        System.out.println("Loading completed!");

        // Now safe to interact with loaded data
        WebElement data = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("dataTable"))
        );
        System.out.println("Data loaded: " + data.getText());

        driver.quit();
    }
}
```

### Example 3: Dynamic Dropdown

```java
public class DynamicDropdownExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com/form");

        // Select country
        driver.findElement(By.id("country")).sendKeys("United States");

        // Wait for state dropdown to become visible
        WebElement stateDropdown = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("state"))
        );

        // Wait for dropdown to be populated with options
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(
            By.cssSelector("#state option"), 1
        ));

        // Now safe to select state
        stateDropdown.sendKeys("California");

        driver.quit();
    }
}
```

---

## 6. Implicit vs Explicit Wait Comparison

| Aspect | Implicit Wait | Explicit Wait |
|--------|---------------|---------------|
| **Scope** | Global (all elements) | Specific elements/conditions |
| **Flexibility** | Limited | Highly flexible |
| **Conditions** | Element presence only | Many conditions available |
| **Configuration** | Set once | Set for each condition |
| **Performance** | Can slow tests | Optimized for specific needs |
| **Complexity** | Simple | More code required |
| **Use Case** | Stable applications | Dynamic, AJAX-heavy apps |
| **Waiting for disappearance** | Not possible | Possible |
| **Custom conditions** | Not possible | Possible |

### Can You Use Both Together?

**Generally NOT recommended** because it can lead to unpredictable wait times and confusion.

```java
// AVOID THIS COMBINATION
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
```

**Why it's problematic:** If implicit wait is 10 seconds and explicit wait is 5 seconds, the actual wait could be up to 15 seconds (implicit + explicit).

**Best Practice:** Choose one strategy:
- Use **Implicit Wait** for simple, stable applications
- Use **Explicit Wait** for complex, dynamic applications (recommended)

---

## 7. Handling Timeout Exceptions

### TimeoutException

Thrown when a wait condition is not met within the specified duration.

```java
import org.openqa.selenium.TimeoutException;

try {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("missing")));
} catch (TimeoutException e) {
    System.err.println("Element did not appear within 5 seconds");
    System.err.println("Error: " + e.getMessage());
    // Take screenshot or log for debugging
}
```

### Providing Custom Error Messages

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.withMessage("Custom error: Login button did not become clickable")
    .until(ExpectedConditions.elementToBeClickable(By.id("loginBtn")));
```

---

## 8. Best Practices

### 1. Prefer Explicit Waits

```java
// GOOD
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("button"))).click();
```

### 2. Use Appropriate Conditions

```java
// For clicking - use elementToBeClickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));

// For reading text - use visibilityOfElementLocated
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("message")));

// For checking existence - use presenceOfElementLocated
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("element")));
```

### 3. Set Reasonable Timeouts

```java
// Too short - might fail unnecessarily
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(1));

// Too long - slows down test failures
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(60));

// Recommended - 10-15 seconds for most cases
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
```

### 4. Create Reusable Wait Methods

```java
public class WaitHelper {
    private WebDriver driver;
    private WebDriverWait wait;

    public WaitHelper(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public WebElement waitForElementClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    public WebElement waitForElementVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public void waitForElementInvisible(By locator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    public void waitForTextToBe(By locator, String text) {
        wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }
}
```

### 5. Handle Exceptions Gracefully

```java
try {
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
} catch (TimeoutException e) {
    System.err.println("Element not visible: " + e.getMessage());
    // Take screenshot
    // Log error
    // Fail test gracefully
}
```

---

## 9. Practical Exercises

### Exercise 1: Basic Implicit Wait
Create a script that uses implicit wait to handle a page with slow-loading elements.

### Exercise 2: Explicit Wait for Visibility
Create a script that waits for a hidden element to become visible after clicking a button.

### Exercise 3: Wait for Clickability
Create a script that waits for a disabled button to become enabled and clickable.

### Exercise 4: Loading Indicator
Create a script that handles a loading spinner appearing and disappearing.

### Exercise 5: Dynamic Content
Create a script that waits for AJAX content to load after a search operation.

### Exercise 6: Multiple Conditions
Create a script that uses multiple different ExpectedConditions in sequence.

### Exercise 7: Timeout Handling
Create a script with proper exception handling for timeout scenarios.

### Exercise 8: Custom Wait Helper
Create a reusable WaitHelper class with common wait methods.

### Exercise 9: URL and Title Waits
Create a script that verifies page navigation using URL and title waits.

### Exercise 10: Comparison Test
Create two versions of the same test: one with implicit wait, one with explicit wait. Compare execution times.

---

## 10. Key Takeaways

1. **Never use Thread.sleep()** - Use Selenium waits instead
2. **Implicit Wait** is simple but limited - applies globally to all elements
3. **Explicit Wait** is flexible and powerful - use for specific conditions
4. **ExpectedConditions** provides many pre-built wait conditions
5. **elementToBeClickable** is best for click actions
6. **visibilityOfElementLocated** is best for reading text
7. **presenceOfElementLocated** is best for checking existence
8. **Don't mix implicit and explicit waits** - choose one strategy
9. **Handle TimeoutException** properly with try-catch
10. **Create reusable wait methods** for cleaner code

---

## 11. Common Interview Questions

1. What is the difference between implicit and explicit wait?
2. Can you use both implicit and explicit waits together?
3. What is the default polling frequency for implicit wait?
4. Name 5 ExpectedConditions you commonly use.
5. What exception is thrown when a wait times out?
6. What's the difference between presenceOfElementLocated and visibilityOfElementLocated?
7. Why is Thread.sleep() not recommended in Selenium?
8. How do you wait for an element to disappear?
9. What is the recommended timeout duration for waits?
10. How do you wait for a specific text to appear in an element?

---

## 12. Additional Resources

### Official Documentation
- [Selenium Waits Documentation](https://www.selenium.dev/documentation/webdriver/waits/)
- [WebDriverWait JavaDoc](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/WebDriverWait.html)
- [ExpectedConditions JavaDoc](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/ExpectedConditions.html)

### Practice Websites
- [The Internet - Dynamic Loading](http://the-internet.herokuapp.com/dynamic_loading)
- [SeleniumEasy - AJAX Form Submit](https://demo.seleniumeasy.com/ajax-form-submit-demo.html)
- [SeleniumEasy - Bootstrap Progress Bar](https://demo.seleniumeasy.com/bootstrap-download-progress-demo.html)

---

## Navigation

- **Previous:** [Day 22: Dropdowns & Checkboxes](./day22_dropdowns_checkboxes.md)
- **Next:** [Day 24: Waits - Part 2 (Fluent Wait & Custom Conditions)](./day24_waits_part2.md)
- **Week 4 Home:** [Week 4 Overview](./README.md)

---

**Happy Learning!** Master waits thoroughly as they are crucial for stable and reliable test automation.
