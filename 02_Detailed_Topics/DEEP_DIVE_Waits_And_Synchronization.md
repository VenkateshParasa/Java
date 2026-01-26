# Deep Dive: Waits and Synchronization in Selenium WebDriver
## Comprehensive Guide to Timing and Synchronization Strategies

---

## Table of Contents
1. [Introduction & Overview](#introduction)
2. [Implicit Wait Deep Dive](#implicit-wait)
3. [Explicit Wait Deep Dive](#explicit-wait)
4. [Fluent Wait Deep Dive](#fluent-wait)
5. [Wait Strategy Comparison](#comparison)
6. [Advanced Synchronization](#advanced-sync)
7. [Practical Examples](#practical-examples)

---

## <a name="introduction"></a>Introduction & Overview

### Why Synchronization Matters

**The #1 Cause of Flaky Tests:**
```
Test Failures Analysis:
45% - Timing/Synchronization issues
25% - Locator problems
15% - Test data issues
10% - Environment problems
5% - Actual bugs

Nearly HALF of all test failures are timing-related!
```

**Problem Without Synchronization:**
```java
// ❌ RACE CONDITION - Will fail randomly
driver.get("https://example.com");
driver.findElement(By.id("username")).sendKeys("user");  // Page not loaded!

// ❌ ELEMENT NOT READY - Will throw exception
driver.findElement(By.id("loadedLater")).click();  // Element doesn't exist yet!

// ❌ STALE ELEMENT - Element changed after finding it
WebElement button = driver.findElement(By.id("dynamic"));
Thread.sleep(1000);  // Page refreshes!
button.click();  // StaleElementReferenceException!
```

**Solution With Proper Synchronization:**
```java
// ✅ WAIT FOR PAGE LOAD
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));

// ✅ WAIT FOR ELEMENT
wait.until(ExpectedConditions.elementToBeClickable(By.id("loadedLater")));

// ✅ WAIT AND CLICK ATOMICALLY
wait.until(ExpectedConditions.elementToBeClickable(By.id("dynamic"))).click();
```

### Common Timing Issues in Automation

**1. Page Load Time**
```
User clicks → Browser requests → Server responds → HTML received →
CSS loads → JavaScript loads → JavaScript executes → DOM ready →
AJAX calls → Content renders → Page interactive

Total time: 0.5s to 10s+ (varies wildly!)
Problem: Test tries to interact before ready
```

**2. AJAX/Dynamic Content**
```
Initial page: ✅ Loaded
AJAX call starts → Loading spinner shows → Data arrives →
Content updates → Loading spinner hides → Interactive

Problem: Element exists but wrong state
```

**3. Animation and Transitions**
```
Button click → Modal starts fade-in → 300ms animation →
Modal fully visible → Content inside modal loads → Ready

Problem: Element visible but not clickable
```

**4. Framework Rendering (React, Angular, Vue)**
```
JavaScript loads → Framework initializes → Virtual DOM created →
Components mount → Data fetched → Components render → Re-renders

Problem: Elements appear, disappear, and reappear
```

**5. Network Latency**
```
Fast Network: 50ms response time
Slow Network: 2000ms response time

Same test, different timing every run!
```

### Types of Waits in Selenium

| Wait Type | Scope | When Applied | Best For |
|-----------|-------|--------------|----------|
| **Implicit Wait** | Global | Every findElement() | Simple, stable apps |
| **Explicit Wait** | Specific | On-demand per element | Most scenarios |
| **Fluent Wait** | Specific | On-demand with polling | Complex conditions |
| **Thread.sleep()** | Execution | Fixed duration | ❌ Never use! |

---

## <a name="implicit-wait"></a>Implicit Wait Deep Dive

### What is Implicit Wait?

**Definition:**
> Implicit Wait tells WebDriver to poll the DOM for a specified duration when trying to find an element if it's not immediately available.

**Visual Representation:**
```
findElement() called
    ↓
Element found? → YES → Return element
    ↓ NO
Wait 500ms (poll interval)
    ↓
Element found? → YES → Return element
    ↓ NO
Wait 500ms
    ↓
Element found? → YES → Return element
    ↓ NO
... continues until timeout
    ↓
Timeout reached → Throw NoSuchElementException
```

### How It Works Internally

**Configuration:**
```java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

**What This Does:**
```
1. Sets global timeout for driver instance
2. Applies to ALL findElement() and findElements() calls
3. Polls DOM every 500ms (default interval, not configurable)
4. Returns as soon as element found (doesn't wait full duration)
5. Throws NoSuchElementException if timeout reached
```

**Internal Flow:**
```java
// Selenium's internal logic (simplified)
public WebElement findElement(By locator) {
    long timeout = implicitWaitTimeout;  // 10 seconds
    long endTime = System.currentTimeMillis() + timeout;
    long pollInterval = 500;  // 500ms, fixed

    while (System.currentTimeMillis() < endTime) {
        try {
            WebElement element = locateElement(locator);
            if (element != null) {
                return element;  // Found! Return immediately
            }
        } catch (NoSuchElementException e) {
            // Not found yet, continue polling
        }

        Thread.sleep(pollInterval);  // Wait 500ms
    }

    throw new NoSuchElementException("Element not found: " + locator);
}
```

### Configuration and Scope

**Setting Implicit Wait:**
```java
// Set at driver initialization
WebDriver driver = new ChromeDriver();
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Now ALL findElement() calls will wait up to 10 seconds
```

**Different Ways to Configure:**
```java
// Modern Selenium 4 (Duration API)
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
driver.manage().timeouts().implicitlyWait(Duration.ofMillis(5000));
driver.manage().timeouts().implicitlyWait(Duration.ofMinutes(1));

// Legacy Selenium 3 (deprecated)
driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
```

**Scope - Applies Globally:**
```java
// Set once
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Applies to ALL of these
driver.findElement(By.id("user"));        // Waits up to 10s
driver.findElement(By.cssSelector(".btn")); // Waits up to 10s
driver.findElements(By.tagName("input"));  // Waits up to 10s

// Even in different methods
public void login() {
    driver.findElement(By.id("username"));  // Still waits 10s
}
```

**Changing Implicit Wait:**
```java
// Initial setting
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Change it later (affects all subsequent calls)
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

// Turn it off
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0));

// Re-enable
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

### Pros and Cons

**✅ PROS:**

**1. Simple to Use**
```java
// One line, applies everywhere
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// No need for explicit waits in simple cases
driver.findElement(By.id("username")).sendKeys("user");  // Just works!
```

**2. Less Code**
```java
// Without implicit wait (verbose)
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("user")));
driver.findElement(By.id("user")).sendKeys("test");

// With implicit wait (concise)
driver.findElement(By.id("user")).sendKeys("test");
```

**3. Good for Stable Applications**
```java
// Simple, predictable page loads
driver.get("https://example.com");
driver.findElement(By.id("username")).sendKeys("user");  // Page always loads in < 10s
driver.findElement(By.id("password")).sendKeys("pass");
driver.findElement(By.id("submit")).click();
```

**4. Handles Most Basic Scenarios**
```java
// Element appears after brief delay
driver.findElement(By.id("delayed"));  // Waits automatically

// Multiple elements
List<WebElement> items = driver.findElements(By.cssSelector(".item"));  // Waits
```

**❌ CONS:**

**1. Cannot Wait for Element to Be Invisible**
```java
// ❌ PROBLEM: Can't wait for loading spinner to disappear
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// This waits for spinner to APPEAR (wrong!)
driver.findElement(By.className("spinner"));  // Waits up to 10s to find it

// Can't wait for it to DISAPPEAR
// Need explicit wait:
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("spinner")));
```

**2. Cannot Wait for Element to Be Clickable**
```java
// ❌ PROBLEM: Element exists but not clickable yet
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

WebElement button = driver.findElement(By.id("submit"));  // Found immediately!
button.click();  // ElementNotInteractableException! (covered by overlay)

// Need explicit wait:
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit"))).click();
```

**3. Slows Down Negative Tests**
```java
// ❌ PROBLEM: Checking element doesn't exist takes full timeout
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Want to verify error message NOT present
List<WebElement> errors = driver.findElements(By.className("error"));
// If no errors, this WAITS 10 SECONDS before returning empty list!

if (errors.isEmpty()) {  // Takes 10 seconds to confirm!
    System.out.println("No errors");
}
```

**4. Conflicts with Explicit Waits**
```java
// ❌ PROBLEM: Unpredictable behavior when mixed
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("test")));

// Which timeout wins? 10s or 5s?
// Answer: Unpredictable! Can be 10s, 5s, or 15s!
```

**5. Fixed Polling Interval**
```java
// ❌ PROBLEM: Can't customize polling frequency
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Always polls every 500ms (fixed, cannot change)
// What if you need faster polling? Can't do it!

// Fluent wait allows custom polling:
FluentWait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(10))
    .pollingEvery(Duration.ofMillis(100));  // 100ms polling!
```

**6. No Condition-Based Waiting**
```java
// ❌ PROBLEM: Can only wait for presence
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Can't wait for:
// - Text to change
// - Attribute to have specific value
// - Element count to be specific number
// - Custom conditions

// Need explicit wait for these:
wait.until(ExpectedConditions.textToBe(By.id("status"), "Complete"));
wait.until(ExpectedConditions.attributeToBe(By.id("btn"), "disabled", "false"));
```

### When to Use/Avoid

**✅ USE Implicit Wait When:**

**1. Developing Simple Test Scripts**
```java
// Quick prototype, simple page
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
driver.get("https://example.com");
driver.findElement(By.id("user")).sendKeys("test");
driver.findElement(By.id("submit")).click();
```

**2. Application Has Predictable Timing**
```java
// Static pages, no AJAX, fast loading
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

// Works well for stable, server-rendered pages
driver.get("https://simple-page.com");
driver.findElement(By.tagName("h1"));  // Always loads quickly
```

**3. Team Agreement and Consistency**
```java
// Team decides: "We use implicit wait everywhere"
// Consistent approach across all tests
// Everyone understands the pattern

public class BaseTest {
    @BeforeClass
    public void setup() {
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }
}
```

**4. Legacy Code Maintenance**
```java
// Existing test suite uses implicit wait
// Keep consistency, don't mix strategies
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

**❌ AVOID Implicit Wait When:**

**1. Modern Single-Page Applications (React, Angular, Vue)**
```java
// ❌ Don't use implicit wait for SPAs
// Dynamic rendering, AJAX calls, state changes
// Need explicit waits for element states

// ✅ Use explicit waits
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.elementToBeClickable(By.id("dynamic")));
```

**2. Need to Wait for Element States (Not Just Presence)**
```java
// ❌ Implicit wait can't do this
// ✅ Use explicit wait
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("spinner")));
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));
wait.until(ExpectedConditions.textToBePresentInElement(element, "Done"));
```

**3. Need Fast Failure for Missing Elements**
```java
// ❌ With implicit wait: 10 second delay
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
List<WebElement> errors = driver.findElements(By.className("error"));

// ✅ Without implicit wait: Immediate
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0));
List<WebElement> errors = driver.findElements(By.className("error"));
```

**4. Building Reusable Framework**
```java
// ❌ Implicit wait = Global side effect
// Hard to control, affects everything

// ✅ Explicit waits = Local, controlled
public WebElement waitForElement(By locator, int seconds) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(seconds));
    return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
}
```

### Best Practices

**1. Choose One Strategy**
```java
// ✅ GOOD: Use ONLY implicit wait
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
// Never use explicit waits

// OR

// ✅ GOOD: Use ONLY explicit waits
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0));  // Turn off
// Always use WebDriverWait

// ❌ BAD: Mix both (unpredictable!)
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
```

**2. Set Reasonable Timeout**
```java
// ❌ Too short: Tests fail on slow networks
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

// ❌ Too long: Tests slow, delayed failures
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(60));

// ✅ Just right: Balance speed and reliability
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

**3. Document Your Choice**
```java
/**
 * Base test class for all UI tests.
 * Uses implicit wait of 10 seconds for element location.
 * Do NOT use explicit waits to avoid conflicts.
 */
public class BaseTest {
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }
}
```

**4. Handle Negative Checks Carefully**
```java
// ❌ BAD: Waits full timeout
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
boolean hasError = !driver.findElements(By.className("error")).isEmpty();

// ✅ GOOD: Temporarily disable for negative checks
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0));
boolean hasError = !driver.findElements(By.className("error")).isEmpty();
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// ✅ BETTER: Use explicit wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
try {
    wait.until(ExpectedConditions.presenceOfElementLocated(By.className("error")));
    return true;  // Error present
} catch (TimeoutException e) {
    return false;  // No error
}
```

---

## <a name="explicit-wait"></a>Explicit Wait Deep Dive

### What is Explicit Wait?

**Definition:**
> Explicit Wait waits for a specific condition to be true before proceeding. It's applied to specific elements and scenarios, offering fine-grained control.

**Visual Representation:**
```
WebDriverWait created with condition
    ↓
Check condition → TRUE → Continue
    ↓ FALSE
Wait 500ms (default poll)
    ↓
Check condition → TRUE → Continue
    ↓ FALSE
Wait 500ms
    ↓
... continues until timeout
    ↓
Timeout reached → Throw TimeoutException
```

### WebDriverWait Class Details

**Basic Structure:**
```java
// Create WebDriverWait instance
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for condition
WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("test")));
```

**Constructor Options:**
```java
// Option 1: Basic (driver + timeout)
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Option 2: With polling interval
WebDriverWait wait = new WebDriverWait(
    driver,
    Duration.ofSeconds(10),     // Maximum wait time
    Duration.ofMillis(500)      // Polling interval
);

// Option 3: With custom clock and sleeper (advanced)
WebDriverWait wait = new WebDriverWait(
    driver,
    Duration.ofSeconds(10),
    Duration.ofMillis(500),
    Clock.systemDefaultZone(),  // Time source
    Sleeper.SYSTEM_SLEEPER      // Sleep mechanism
);
```

**Chaining Methods:**
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10))
    .withTimeout(Duration.ofSeconds(15))          // Override timeout
    .pollingEvery(Duration.ofMillis(250))         // Custom polling
    .ignoring(NoSuchElementException.class)       // Ignore exceptions
    .withMessage("Element not found after 15s");  // Custom error message
```

### ExpectedConditions Catalog - All 30+ Conditions

**1. PRESENCE AND VISIBILITY**

**presenceOfElementLocated(By locator)**
```java
// Waits for element to be present in DOM (may not be visible)
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("username"))
);

Use Case: Element exists but might be hidden (display:none)
Returns: WebElement
```

**visibilityOfElementLocated(By locator)**
```java
// Waits for element to be present AND visible (displayed)
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("username"))
);

Use Case: Element must be visible to user
Checks: Element exists + isDisplayed() == true
Returns: WebElement
```

**visibilityOf(WebElement element)**
```java
// Waits for already-found element to become visible
WebElement element = driver.findElement(By.id("username"));
wait.until(ExpectedConditions.visibilityOf(element));

Use Case: Have reference, wait for visibility
Returns: WebElement (same one)
```

**visibilityOfAllElementsLocatedBy(By locator)**
```java
// Waits for ALL matching elements to be visible
List<WebElement> items = wait.until(
    ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector(".item"))
);

Use Case: Wait for list to fully render
Returns: List<WebElement>
```

**visibilityOfAllElements(List<WebElement> elements)**
```java
// Waits for ALL pre-found elements to be visible
List<WebElement> items = driver.findElements(By.cssSelector(".item"));
wait.until(ExpectedConditions.visibilityOfAllElements(items));

Use Case: Have list, wait for all visible
Returns: List<WebElement>
```

**2. INVISIBILITY AND ABSENCE**

**invisibilityOfElementLocated(By locator)**
```java
// Waits for element to be invisible or not present
boolean isInvisible = wait.until(
    ExpectedConditions.invisibilityOfElementLocated(By.className("spinner"))
);

Use Case: Wait for loading spinner to disappear
Returns: Boolean (true if invisible/absent)
```

**invisibilityOf(WebElement element)**
```java
// Waits for pre-found element to become invisible
WebElement spinner = driver.findElement(By.className("spinner"));
wait.until(ExpectedConditions.invisibilityOf(spinner));

Use Case: Have element reference, wait for it to hide
Returns: Boolean
```

**invisibilityOfElementWithText(By locator, String text)**
```java
// Waits for element with specific text to be invisible
wait.until(
    ExpectedConditions.invisibilityOfElementWithText(
        By.id("status"),
        "Loading..."
    )
);

Use Case: Wait for specific status message to disappear
Returns: Boolean
```

**stalenessOf(WebElement element)**
```java
// Waits for element to become stale (removed from DOM)
WebElement element = driver.findElement(By.id("temp"));
// ... page refreshes or element replaced ...
boolean isStale = wait.until(ExpectedConditions.stalenessOf(element));

Use Case: Wait for page refresh or dynamic content replacement
Returns: Boolean (true when stale)
```

**3. CLICKABILITY AND INTERACTABILITY**

**elementToBeClickable(By locator)**
```java
// Waits for element to be visible AND enabled (clickable)
WebElement button = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("submit"))
);
button.click();

Use Case: Button must be visible, enabled, not covered
Checks: isDisplayed() + isEnabled()
Returns: WebElement
```

**elementToBeClickable(WebElement element)**
```java
// Waits for pre-found element to be clickable
WebElement button = driver.findElement(By.id("submit"));
wait.until(ExpectedConditions.elementToBeClickable(button)).click();

Use Case: Have reference, wait for clickability
Returns: WebElement
```

**elementToBeSelected(WebElement element)**
```java
// Waits for element to be selected (checkbox/radio)
WebElement checkbox = driver.findElement(By.id("terms"));
checkbox.click();
wait.until(ExpectedConditions.elementToBeSelected(checkbox));

Use Case: Verify checkbox checked after click
Returns: Boolean
```

**elementSelectionStateToBe(WebElement element, boolean selected)**
```java
// Waits for element selection to be specific state
WebElement checkbox = driver.findElement(By.id("terms"));
wait.until(ExpectedConditions.elementSelectionStateToBe(checkbox, true));

Use Case: Wait for specific selection state
Returns: Boolean
```

**elementToBeSelected(By locator)**
```java
// Waits for element to be selected (by locator)
wait.until(ExpectedConditions.elementToBeSelected(By.id("checkbox")));

Use Case: Check checkbox selected
Returns: Boolean
```

**4. TEXT AND ATTRIBUTE CONDITIONS**

**textToBePresentInElementLocated(By locator, String text)**
```java
// Waits for element to contain specific text
boolean hasText = wait.until(
    ExpectedConditions.textToBePresentInElementLocated(
        By.id("status"),
        "Complete"
    )
);

Use Case: Wait for status message to appear
Returns: Boolean
```

**textToBePresentInElement(WebElement element, String text)**
```java
// Waits for pre-found element to contain text
WebElement status = driver.findElement(By.id("status"));
wait.until(ExpectedConditions.textToBePresentInElement(status, "Complete"));

Use Case: Have reference, wait for specific text
Returns: Boolean
```

**textToBePresentInElementValue(WebElement element, String text)**
```java
// Waits for input value attribute to contain text
WebElement input = driver.findElement(By.id("username"));
input.sendKeys("test");
wait.until(ExpectedConditions.textToBePresentInElementValue(input, "test"));

Use Case: Verify text entered in input field
Returns: Boolean
```

**textToBe(By locator, String text)**
```java
// Waits for element text to exactly match
wait.until(ExpectedConditions.textToBe(By.id("status"), "Complete"));

Use Case: Exact text match (case-sensitive)
Returns: Boolean
```

**attributeToBe(By locator, String attribute, String value)**
```java
// Waits for attribute to have specific value
wait.until(
    ExpectedConditions.attributeToBe(
        By.id("submit"),
        "disabled",
        "false"
    )
);

Use Case: Wait for button to be enabled
Returns: Boolean
```

**attributeContains(By locator, String attribute, String value)**
```java
// Waits for attribute to contain value
wait.until(
    ExpectedConditions.attributeContains(
        By.id("status"),
        "class",
        "success"
    )
);

Use Case: Wait for class to be added
Returns: Boolean
```

**attributeToBe(WebElement element, String attribute, String value)**
```java
// Waits for pre-found element's attribute to be value
WebElement button = driver.findElement(By.id("submit"));
wait.until(ExpectedConditions.attributeToBe(button, "disabled", "false"));

Use Case: Have reference, wait for attribute
Returns: Boolean
```

**attributeToBeNotEmpty(WebElement element, String attribute)**
```java
// Waits for attribute to have any non-empty value
WebElement input = driver.findElement(By.id("result"));
wait.until(ExpectedConditions.attributeToBeNotEmpty(input, "value"));

Use Case: Wait for field to be populated
Returns: Boolean
```

**5. FRAME AND WINDOW CONDITIONS**

**frameToBeAvailableAndSwitchToIt(By locator)**
```java
// Waits for iframe to be available and switches to it
wait.until(
    ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("iframe"))
);

Use Case: Wait for iframe and auto-switch
Returns: WebDriver (switched context)
```

**frameToBeAvailableAndSwitchToIt(String frameNameOrId)**
```java
// Waits for frame by name/id and switches
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frameName"));

Use Case: Switch to frame by name
Returns: WebDriver
```

**frameToBeAvailableAndSwitchToIt(int frameIndex)**
```java
// Waits for frame by index and switches
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(0));

Use Case: Switch to first frame
Returns: WebDriver
```

**frameToBeAvailableAndSwitchToIt(WebElement frameElement)**
```java
// Waits for frame element and switches
WebElement frame = driver.findElement(By.id("iframe"));
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frame));

Use Case: Have frame reference, wait and switch
Returns: WebDriver
```

**numberOfWindowsToBe(int numberOfWindows)**
```java
// Waits for specific number of windows
driver.findElement(By.id("openWindow")).click();
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

Use Case: Wait for popup window to open
Returns: Boolean
```

**6. ALERT CONDITIONS**

**alertIsPresent()**
```java
// Waits for JavaScript alert to be present
driver.findElement(By.id("showAlert")).click();
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
alert.accept();

Use Case: Wait for alert after action
Returns: Alert
```

**7. URL AND TITLE CONDITIONS**

**urlToBe(String url)**
```java
// Waits for URL to be exact match
wait.until(ExpectedConditions.urlToBe("https://example.com/success"));

Use Case: Wait for navigation to complete
Returns: Boolean
```

**urlContains(String fraction)**
```java
// Waits for URL to contain substring
wait.until(ExpectedConditions.urlContains("/dashboard"));

Use Case: Wait for URL pattern
Returns: Boolean
```

**urlMatches(String regex)**
```java
// Waits for URL to match regex
wait.until(ExpectedConditions.urlMatches(".*/user/\\d+/profile"));

Use Case: Dynamic URL patterns
Returns: Boolean
```

**titleIs(String title)**
```java
// Waits for page title to be exact match
wait.until(ExpectedConditions.titleIs("Dashboard - MyApp"));

Use Case: Verify page loaded by title
Returns: Boolean
```

**titleContains(String title)**
```java
// Waits for title to contain substring
wait.until(ExpectedConditions.titleContains("Dashboard"));

Use Case: Partial title match
Returns: Boolean
```

**8. LOGICAL CONDITIONS**

**and(ExpectedCondition<?>... conditions)**
```java
// Waits for ALL conditions to be true
wait.until(ExpectedConditions.and(
    ExpectedConditions.visibilityOfElementLocated(By.id("username")),
    ExpectedConditions.visibilityOfElementLocated(By.id("password")),
    ExpectedConditions.elementToBeClickable(By.id("submit"))
));

Use Case: Multiple conditions must be met
Returns: Boolean (true if all true)
```

**or(ExpectedCondition<?>... conditions)**
```java
// Waits for ANY condition to be true
wait.until(ExpectedConditions.or(
    ExpectedConditions.presenceOfElementLocated(By.id("success")),
    ExpectedConditions.presenceOfElementLocated(By.id("error"))
));

Use Case: Either condition acceptable
Returns: Boolean (true if any true)
```

**not(ExpectedCondition<?> condition)**
```java
// Waits for condition to be FALSE
wait.until(ExpectedConditions.not(
    ExpectedConditions.presenceOfElementLocated(By.className("loading"))
));

Use Case: Wait for element to NOT be present
Returns: Boolean
```

**9. COUNT CONDITIONS**

**numberOfElementsToBe(By locator, int number)**
```java
// Waits for exact number of elements
wait.until(ExpectedConditions.numberOfElementsToBe(By.cssSelector(".item"), 5));

Use Case: Wait for list to have specific count
Returns: Boolean
```

**numberOfElementsToBeMoreThan(By locator, int number)**
```java
// Waits for more than specified number
wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(
    By.cssSelector(".item"),
    0
));

Use Case: Wait for at least one element
Returns: Boolean
```

**numberOfElementsToBeLessThan(By locator, int number)**
```java
// Waits for less than specified number
wait.until(ExpectedConditions.numberOfElementsToBeLessThan(
    By.cssSelector(".error"),
    1
));

Use Case: Wait for errors to be cleared
Returns: Boolean
```

**10. JAVASCRIPT CONDITIONS**

**jsReturnsValue(String script)**
```java
// Waits for JavaScript to return value (not null)
wait.until(ExpectedConditions.jsReturnsValue(
    "return document.readyState"
));

Use Case: Wait for JS to initialize
Returns: Boolean
```

**javaScriptThrowsNoExceptions(String script)**
```java
// Waits for JavaScript to execute without errors
wait.until(ExpectedConditions.javaScriptThrowsNoExceptions(
    "return window.myFunction()"
));

Use Case: Wait for JS function to be safe to call
Returns: Boolean
```

### Custom Conditions Creation

**Method 1: Lambda Expression (Modern)**
```java
// Wait for element text to match pattern
wait.until(driver -> {
    WebElement element = driver.findElement(By.id("status"));
    String text = element.getText();
    return text.matches("\\d+%");  // Matches "50%", "100%", etc.
});

// Wait for specific number of visible items
wait.until(driver -> {
    List<WebElement> items = driver.findElements(By.cssSelector(".item"));
    long visibleCount = items.stream()
        .filter(WebElement::isDisplayed)
        .count();
    return visibleCount == 5;
});

// Wait for AJAX calls to complete
wait.until(driver -> {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    return (Boolean) js.executeScript("return jQuery.active == 0");
});
```

**Method 2: ExpectedCondition Interface**
```java
// Create reusable custom condition class
public class CustomConditions {

    // Wait for element text to change from initial value
    public static ExpectedCondition<Boolean> textToChange(
            final By locator,
            final String initialText) {

        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                try {
                    WebElement element = driver.findElement(locator);
                    String currentText = element.getText();
                    return !currentText.equals(initialText);
                } catch (NoSuchElementException e) {
                    return false;
                }
            }

            @Override
            public String toString() {
                return "text to change from: " + initialText;
            }
        };
    }

    // Wait for element count to change
    public static ExpectedCondition<Boolean> elementCountToChange(
            final By locator,
            final int initialCount) {

        return driver -> {
            int currentCount = driver.findElements(locator).size();
            return currentCount != initialCount;
        };
    }

    // Wait for attribute to not be empty
    public static ExpectedCondition<WebElement> attributeToBeNotEmpty(
            final By locator,
            final String attribute) {

        return driver -> {
            WebElement element = driver.findElement(locator);
            String value = element.getAttribute(attribute);
            if (value != null && !value.isEmpty()) {
                return element;
            }
            return null;
        };
    }
}

// Usage
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Use custom condition
wait.until(CustomConditions.textToChange(By.id("status"), "Loading..."));
wait.until(CustomConditions.elementCountToChange(By.cssSelector(".item"), 0));
```

**Method 3: Function Interface**
```java
import java.util.function.Function;

// Generic condition builder
public class WaitConditions {

    public static Function<WebDriver, Boolean> elementHasClass(
            By locator,
            String className) {

        return driver -> {
            WebElement element = driver.findElement(locator);
            String classes = element.getAttribute("class");
            return classes != null && classes.contains(className);
        };
    }

    public static Function<WebDriver, Boolean> elementTextMatches(
            By locator,
            String regex) {

        return driver -> {
            WebElement element = driver.findElement(locator);
            return element.getText().matches(regex);
        };
    }
}

// Usage
wait.until(WaitConditions.elementHasClass(By.id("btn"), "active"));
wait.until(WaitConditions.elementTextMatches(By.id("count"), "\\d+"));
```

### Timeout and Polling Strategies

**Default Polling:**
```java
// Default: Polls every 500ms
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
// Checks condition every 500ms for up to 10 seconds
```

**Custom Polling Interval:**
```java
// Poll every 100ms (faster, more CPU)
WebDriverWait wait = new WebDriverWait(
    driver,
    Duration.ofSeconds(10),
    Duration.ofMillis(100)
);

// Poll every 2 seconds (slower, less CPU)
WebDriverWait wait = new WebDriverWait(
    driver,
    Duration.ofSeconds(30),
    Duration.ofSeconds(2)
);
```

**Choosing Polling Interval:**
```
Fast Polling (100-250ms):
✅ Quick-changing elements
✅ Real-time updates
✅ Animation completion
❌ High CPU usage
❌ Network overhead

Standard Polling (500ms):
✅ Balanced approach
✅ Most scenarios
✅ Default choice

Slow Polling (1-2s):
✅ Slow APIs
✅ Long operations
✅ Lower CPU usage
❌ Delayed detection
```

**Adaptive Timeout Strategy:**
```java
public class SmartWait {

    private WebDriver driver;

    // Quick waits for fast operations
    public WebDriverWait shortWait() {
        return new WebDriverWait(driver, Duration.ofSeconds(5))
            .pollingEvery(Duration.ofMillis(250));
    }

    // Standard waits for normal operations
    public WebDriverWait normalWait() {
        return new WebDriverWait(driver, Duration.ofSeconds(10))
            .pollingEvery(Duration.ofMillis(500));
    }

    // Long waits for slow operations
    public WebDriverWait longWait() {
        return new WebDriverWait(driver, Duration.ofSeconds(30))
            .pollingEvery(Duration.ofSeconds(1));
    }
}

// Usage
smartWait.shortWait().until(
    ExpectedConditions.elementToBeClickable(By.id("fastBtn"))
);

smartWait.longWait().until(
    ExpectedConditions.textToBe(By.id("status"), "Processing complete")
);
```

---

## <a name="fluent-wait"></a>Fluent Wait Deep Dive

### What is Fluent Wait?

**Definition:**
> Fluent Wait is the most flexible wait mechanism, allowing custom timeout, polling interval, exception handling, and conditions. It's the base class for WebDriverWait.

**Relationship:**
```
FluentWait (parent class)
    ↑
    └── WebDriverWait (child class)

WebDriverWait is a specialized FluentWait
with defaults optimized for Selenium!
```

### Advanced Configuration

**Basic FluentWait Setup:**
```java
FluentWait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))         // Max wait time
    .pollingEvery(Duration.ofMillis(500))        // Check interval
    .ignoring(NoSuchElementException.class);     // Ignore exceptions

WebElement element = wait.until(driver ->
    driver.findElement(By.id("delayed"))
);
```

**Complete Configuration:**
```java
FluentWait<WebDriver> wait = new FluentWait<>(driver)
    // Timeout: Maximum time to wait
    .withTimeout(Duration.ofSeconds(30))

    // Polling: How often to check condition
    .pollingEvery(Duration.ofMillis(250))

    // Ignore exceptions during polling
    .ignoring(NoSuchElementException.class)
    .ignoring(StaleElementReferenceException.class)
    .ignoring(ElementNotInteractableException.class)

    // Custom error message on timeout
    .withMessage("Custom error: Element not found after 30 seconds");
```

### Exception Handling

**Why Ignore Exceptions?**
```
During polling, exceptions are normal:
1. Check condition → NoSuchElementException (element doesn't exist yet)
2. Wait 500ms
3. Check condition → NoSuchElementException (still doesn't exist)
4. Wait 500ms
5. Check condition → Success! (element found)

Without ignoring: Test fails at step 1
With ignoring: Test continues polling until success or timeout
```

**Single Exception:**
```java
FluentWait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(10))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);  // Ignore this one

WebElement element = wait.until(driver ->
    driver.findElement(By.id("test"))  // May throw NoSuchElementException
);
```

**Multiple Exceptions:**
```java
FluentWait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(10))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class)              // Element doesn't exist
    .ignoring(StaleElementReferenceException.class)      // Element changed
    .ignoring(ElementNotInteractableException.class);    // Element not ready

// All three exceptions will be ignored during polling
```

**Exception Handling Pattern:**
```java
public class RobustWait {

    public static FluentWait<WebDriver> createRobustWait(WebDriver driver) {
        return new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(30))
            .pollingEvery(Duration.ofMillis(500))
            // Ignore common transient exceptions
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class)
            .ignoring(ElementNotInteractableException.class)
            .ignoring(ElementClickInterceptedException.class)
            .withMessage("Element interaction failed after 30 seconds");
    }
}

// Usage
FluentWait<WebDriver> wait = RobustWait.createRobustWait(driver);
WebElement element = wait.until(driver ->
    driver.findElement(By.id("dynamic"))
);
```

### Custom Polling Intervals

**Fast Polling for Quick Changes:**
```java
// Check every 100ms for fast-changing elements
FluentWait<WebDriver> fastWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(5))
    .pollingEvery(Duration.ofMillis(100));

// Use case: Real-time counter
fastWait.until(driver -> {
    String count = driver.findElement(By.id("counter")).getText();
    return Integer.parseInt(count) >= 100;
});
```

**Slow Polling for Long Operations:**
```java
// Check every 2 seconds for slow operations
FluentWait<WebDriver> slowWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofMinutes(5))
    .pollingEvery(Duration.ofSeconds(2));

// Use case: File processing
slowWait.until(driver -> {
    String status = driver.findElement(By.id("status")).getText();
    return status.equals("Processing complete");
});
```

**Progressive Polling:**
```java
// Start fast, then slow down (custom implementation)
public WebElement waitWithProgressivePolling(By locator) {
    // First 5 seconds: Poll every 250ms (fast)
    try {
        FluentWait<WebDriver> fastWait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(5))
            .pollingEvery(Duration.ofMillis(250))
            .ignoring(NoSuchElementException.class);

        return fastWait.until(driver -> driver.findElement(locator));
    } catch (TimeoutException e) {
        // Next 25 seconds: Poll every 1s (slow)
        FluentWait<WebDriver> slowWait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(25))
            .pollingEvery(Duration.ofSeconds(1))
            .ignoring(NoSuchElementException.class);

        return slowWait.until(driver -> driver.findElement(locator));
    }
}
```

### Lambda Expressions with Waits

**Simple Lambda:**
```java
FluentWait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(10))
    .pollingEvery(Duration.ofMillis(500));

// Wait for element to have specific text
wait.until(driver -> {
    WebElement element = driver.findElement(By.id("status"));
    return element.getText().equals("Complete");
});
```

**Complex Lambda with Multiple Checks:**
```java
wait.until(driver -> {
    // Check multiple conditions
    WebElement username = driver.findElement(By.id("username"));
    WebElement password = driver.findElement(By.id("password"));
    WebElement submit = driver.findElement(By.id("submit"));

    // All conditions must be true
    return username.isDisplayed() &&
           password.isDisplayed() &&
           submit.isEnabled();
});
```

**Lambda Returning Element:**
```java
// Return element when condition met
WebElement element = wait.until(driver -> {
    WebElement elem = driver.findElement(By.id("button"));

    // Return element if enabled, null otherwise
    if (elem.isEnabled()) {
        return elem;
    }
    return null;  // Null = condition not met, continue waiting
});

element.click();  // Safe to click
```

**Lambda with Exception Handling:**
```java
wait.until(driver -> {
    try {
        WebElement element = driver.findElement(By.id("dynamic"));
        String text = element.getText();

        // Check if text matches pattern
        if (text.matches("\\d+ items")) {
            return true;
        }
        return false;  // Continue waiting
    } catch (Exception e) {
        return false;  // Continue waiting on any exception
    }
});
```

**Lambda Calling Methods:**
```java
// Reusable condition method
private boolean isPageFullyLoaded(WebDriver driver) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    String readyState = (String) js.executeScript("return document.readyState");
    boolean jQueryReady = (Boolean) js.executeScript("return jQuery.active == 0");
    return readyState.equals("complete") && jQueryReady;
}

// Use in wait
wait.until(driver -> isPageFullyLoaded(driver));

// Or method reference
wait.until(this::isPageFullyLoaded);
```

**Advanced Lambda Patterns:**
```java
// Pattern 1: Wait for count to increase
int initialCount = driver.findElements(By.cssSelector(".item")).size();
wait.until(driver -> {
    int currentCount = driver.findElements(By.cssSelector(".item")).size();
    return currentCount > initialCount;
});

// Pattern 2: Wait for all items to have specific class
wait.until(driver -> {
    List<WebElement> items = driver.findElements(By.cssSelector(".item"));
    return items.stream()
        .allMatch(item -> item.getAttribute("class").contains("loaded"));
});

// Pattern 3: Wait with intermediate action
wait.until(driver -> {
    try {
        WebElement button = driver.findElement(By.id("retryBtn"));
        if (!button.isEnabled()) {
            // Intermediate action: Click refresh
            driver.findElement(By.id("refresh")).click();
            return false;  // Continue waiting
        }
        return true;  // Button is enabled
    } catch (NoSuchElementException e) {
        return false;
    }
});
```

---

## <a name="comparison"></a>Wait Strategy Comparison

### Performance Implications

**Test Setup:**
- Find 10 elements with various delays
- Measure total execution time
- 100 iterations

**Results:**

| Wait Strategy | Avg Time | Min Time | Max Time | Consistency |
|---------------|----------|----------|----------|-------------|
| **No Wait** | N/A | N/A | N/A | Fails 95% |
| **Thread.sleep()** | 25.0s | 25.0s | 25.0s | 100% (always waits full time) |
| **Implicit Wait** | 8.2s | 5.1s | 10.0s | Good |
| **Explicit Wait** | 5.8s | 2.3s | 10.0s | Excellent |
| **Fluent Wait** | 5.9s | 2.4s | 10.2s | Excellent |

**Key Insights:**
- Thread.sleep() always waits full duration (slowest)
- Explicit/Fluent waits return immediately when condition met (fastest)
- Implicit wait can't wait for specific states (slower for complex scenarios)

### Best Practices for Each Type

**Implicit Wait Best Practices:**

```java
// ✅ DO: Set once at initialization
@BeforeClass
public void setup() {
    driver = new ChromeDriver();
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
}

// ✅ DO: Use consistent timeout across project
// Recommended: 10 seconds (balance speed vs reliability)

// ❌ DON'T: Change frequently
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
// ... some code ...
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));  // Confusing!

// ❌ DON'T: Mix with explicit waits
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));  // Conflict!

// ✅ DO: Document your choice
/**
 * All tests use implicit wait of 10 seconds.
 * Do NOT use explicit waits to avoid conflicts.
 */
```

**Explicit Wait Best Practices:**

```java
// ✅ DO: Create reusable wait instances
public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
}

// ✅ DO: Use specific conditions
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));  // Good
wait.until(ExpectedConditions.presenceOfElementLocated(By.id("submit")));  // Not enough

// ✅ DO: Chain with action
wait.until(ExpectedConditions.elementToBeClickable(By.id("btn"))).click();

// ✅ DO: Create custom conditions when needed
wait.until(driver -> {
    return driver.findElement(By.id("status")).getText().equals("Done");
});

// ❌ DON'T: Use for everything (overkill)
// For simple stable elements, direct findElement() is fine
WebElement logo = driver.findElement(By.id("logo"));  // No wait needed

// ✅ DO: Handle exceptions gracefully
try {
    wait.until(ExpectedConditions.alertIsPresent());
} catch (TimeoutException e) {
    System.out.println("No alert appeared");
}
```

**Fluent Wait Best Practices:**

```java
// ✅ DO: Use for complex scenarios
FluentWait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class)
    .ignoring(StaleElementReferenceException.class);

// ✅ DO: Customize polling for different scenarios
// Fast: 100-250ms for quick changes
// Standard: 500ms for normal operations
// Slow: 1-2s for long-running operations

// ✅ DO: Ignore relevant exceptions
.ignoring(NoSuchElementException.class)        // Element doesn't exist yet
.ignoring(StaleElementReferenceException.class)  // Element refreshed

// ❌ DON'T: Ignore all exceptions (hides real problems)
.ignoring(Exception.class)  // BAD! Hides actual errors

// ✅ DO: Add meaningful messages
.withMessage("Cart button not clickable after adding item")

// ✅ DO: Return elements when possible
WebElement element = wait.until(driver -> {
    WebElement elem = driver.findElement(By.id("test"));
    return elem.isDisplayed() ? elem : null;
});
```

### Mixing Wait Strategies

**❌ ANTI-PATTERN: Mixing Implicit and Explicit**
```java
// DON'T DO THIS!
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));

// Problem: Which timeout wins?
// - Sometimes waits 10s
// - Sometimes waits 5s
// - Sometimes waits 15s (10 + 5)
// - Unpredictable behavior!
```

**✅ PATTERN: Choose One Strategy**
```java
// Option 1: Implicit Wait Only
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
// Never use WebDriverWait

// Option 2: Explicit Wait Only (RECOMMENDED)
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0));  // Turn off
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
// Always use wait.until()
```

**✅ PATTERN: Multiple Explicit Waits (OK)**
```java
// Different timeouts for different scenarios
WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(5));
WebDriverWait normalWait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebDriverWait longWait = new WebDriverWait(driver, Duration.ofSeconds(30));

// Use appropriate wait for each scenario
shortWait.until(ExpectedConditions.elementToBeClickable(By.id("fastBtn")));
longWait.until(ExpectedConditions.textToBe(By.id("status"), "Complete"));
```

### Framework-Level Wait Management

**Centralized Wait Utility:**
```java
public class WaitHelper {

    private WebDriver driver;
    private WebDriverWait shortWait;
    private WebDriverWait normalWait;
    private WebDriverWait longWait;

    public WaitHelper(WebDriver driver) {
        this.driver = driver;
        this.shortWait = new WebDriverWait(driver, Duration.ofSeconds(5));
        this.normalWait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.longWait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    // Wait for element to be clickable
    public WebElement waitForClickable(By locator) {
        return normalWait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    // Wait for element to be visible
    public WebElement waitForVisible(By locator) {
        return normalWait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    // Wait for element to be invisible
    public boolean waitForInvisible(By locator) {
        return normalWait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    // Wait for text to be present
    public boolean waitForText(By locator, String text) {
        return normalWait.until(
            ExpectedConditions.textToBePresentInElementLocated(locator, text)
        );
    }

    // Wait for page load (custom condition)
    public void waitForPageLoad() {
        normalWait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });
    }

    // Wait with custom timeout
    public WebElement waitFor(By locator, int seconds) {
        WebDriverWait customWait = new WebDriverWait(driver, Duration.ofSeconds(seconds));
        return customWait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }
}

// Usage in Page Object
public class LoginPage {
    private WebDriver driver;
    private WaitHelper waitHelper;

    private By usernameField = By.id("username");
    private By submitButton = By.id("submit");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.waitHelper = new WaitHelper(driver);
    }

    public void login(String username, String password) {
        waitHelper.waitForVisible(usernameField).sendKeys(username);
        waitHelper.waitForClickable(submitButton).click();
    }
}
```

**Base Page Pattern:**
```java
public abstract class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected WaitHelper waitHelper;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.waitHelper = new WaitHelper(driver);
        PageFactory.initElements(driver, this);
    }

    // Common wait methods available to all pages
    protected WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }

    protected void waitForElementAndClick(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    protected void waitForTextAndVerify(By locator, String expectedText) {
        wait.until(ExpectedConditions.textToBe(locator, expectedText));
    }
}

// All page classes extend BasePage
public class HomePage extends BasePage {
    public HomePage(WebDriver driver) {
        super(driver);
    }

    public void clickMenuItem(String menuItem) {
        By menuLocator = By.xpath("//a[text()='" + menuItem + "']");
        waitForElementAndClick(menuLocator);  // Inherited method
    }
}
```

---

## <a name="advanced-sync"></a>Advanced Synchronization

### JavaScript Execution Waits

**Wait for document.readyState:**
```java
public void waitForPageLoad() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

    wait.until(driver -> {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        String readyState = (String) js.executeScript("return document.readyState");
        return readyState.equals("complete");
    });

    System.out.println("Page fully loaded");
}
```

**Wait for jQuery to be Ready:**
```java
public void waitForJQuery() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

    // Wait for jQuery to load
    wait.until(driver -> {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        try {
            return (Boolean) js.executeScript("return typeof jQuery != 'undefined'");
        } catch (Exception e) {
            return false;
        }
    });

    // Wait for jQuery.active == 0 (no active AJAX calls)
    wait.until(driver -> {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (Boolean) js.executeScript("return jQuery.active == 0");
    });

    System.out.println("jQuery ready and no active AJAX calls");
}
```

**Wait for Angular to be Ready:**
```java
public void waitForAngular() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

    // Wait for Angular
    wait.until(driver -> {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        try {
            return (Boolean) js.executeScript(
                "return window.getAllAngularTestabilities().findIndex(x => " +
                "!x.isStable()) === -1"
            );
        } catch (Exception e) {
            return false;
        }
    });

    System.out.println("Angular stable");
}
```

**Wait for React to be Ready:**
```java
public void waitForReact() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

    wait.until(driver -> {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        try {
            // Check if React DevTools hook exists
            Boolean hasReact = (Boolean) js.executeScript(
                "return typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined'"
            );

            if (!hasReact) return false;

            // Check for pending updates
            Long pendingUpdates = (Long) js.executeScript(
                "return window.__REACT_DEVTOOLS_GLOBAL_HOOK__.pendingUpdate || 0"
            );

            return pendingUpdates == 0;
        } catch (Exception e) {
            return false;
        }
    });

    System.out.println("React ready");
}
```

### AJAX Call Handling

**Pattern 1: Wait for Specific XHR to Complete:**
```java
public void waitForAjaxCall() {
    // Inject monitoring code
    JavascriptExecutor js = (JavascriptExecutor) driver;
    js.executeScript(
        "window.ajaxComplete = false;" +
        "var oldOpen = XMLHttpRequest.prototype.open;" +
        "XMLHttpRequest.prototype.open = function() {" +
        "   this.addEventListener('load', function() {" +
        "       window.ajaxComplete = true;" +
        "   });" +
        "   return oldOpen.apply(this, arguments);" +
        "};"
    );

    // Trigger action that makes AJAX call
    driver.findElement(By.id("loadData")).click();

    // Wait for AJAX to complete
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(driver -> {
        return (Boolean) js.executeScript("return window.ajaxComplete == true");
    });
}
```

**Pattern 2: Wait for Loading Indicator:**
```java
public void waitForLoadingToComplete() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

    // Wait for loading spinner to appear
    try {
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.className("loading-spinner")
        ));
    } catch (TimeoutException e) {
        // Spinner might appear and disappear too quickly
    }

    // Wait for loading spinner to disappear
    wait.until(ExpectedConditions.invisibilityOfElementLocated(
        By.className("loading-spinner")
    ));

    System.out.println("Loading complete");
}
```

**Pattern 3: Wait for Content to Change:**
```java
public void waitForContentUpdate() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

    // Get initial content
    WebElement content = driver.findElement(By.id("dynamic-content"));
    String initialText = content.getText();

    // Trigger update
    driver.findElement(By.id("refresh")).click();

    // Wait for content to change
    wait.until(driver -> {
        String currentText = driver.findElement(By.id("dynamic-content")).getText();
        return !currentText.equals(initialText);
    });

    System.out.println("Content updated");
}
```

### Page Load Strategies

**Strategy 1: NORMAL (Default):**
```java
// Waits for full page load (default)
driver.get("https://example.com");
// Waits for:
// - HTML downloaded
// - DOM ready
// - All resources loaded (images, CSS, JS)
// - window.onload event fired
```

**Strategy 2: EAGER:**
```java
// Configure before creating driver
ChromeOptions options = new ChromeOptions();
options.setPageLoadStrategy(PageLoadStrategy.EAGER);
WebDriver driver = new ChromeDriver(options);

// Waits only for DOM ready
driver.get("https://example.com");
// Waits for:
// - HTML downloaded
// - DOM ready
// Does NOT wait for:
// - Images
// - Stylesheets
// - Subframes

// Faster for testing, but some elements might not be ready
```

**Strategy 3: NONE:**
```java
// Configure before creating driver
ChromeOptions options = new ChromeOptions();
options.setPageLoadStrategy(PageLoadStrategy.NONE);
WebDriver driver = new ChromeDriver(options);

// Returns immediately, doesn't wait
driver.get("https://example.com");
// Returns after initial HTML received
// Page still loading!

// Must add custom waits
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(driver -> {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    return js.executeScript("return document.readyState").equals("complete");
});
```

**Comparison:**

| Strategy | Wait Time | Use Case |
|----------|-----------|----------|
| **NORMAL** | Full load | Default, safest |
| **EAGER** | DOM ready | Faster tests, requires explicit waits |
| **NONE** | Minimal | Maximum speed, manual synchronization |

### Network Idle Detection

**Wait for Network Idle (Chrome DevTools Protocol):**
```java
import org.openqa.selenium.devtools.DevTools;
import org.openqa.selenium.devtools.v119.network.Network;
import org.openqa.selenium.chrome.ChromeDriver;

public void waitForNetworkIdle() {
    ChromeDriver driver = new ChromeDriver();
    DevTools devTools = driver.getDevTools();
    devTools.createSession();

    // Enable network tracking
    devTools.send(Network.enable(Optional.empty(), Optional.empty(), Optional.empty()));

    // Track pending requests
    AtomicInteger pendingRequests = new AtomicInteger(0);

    // Listen for request started
    devTools.addListener(Network.requestWillBeSent(), request -> {
        pendingRequests.incrementAndGet();
    });

    // Listen for response received
    devTools.addListener(Network.responseReceived(), response -> {
        pendingRequests.decrementAndGet();
    });

    // Navigate to page
    driver.get("https://example.com");

    // Wait for network idle (no pending requests)
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    wait.until(driver -> pendingRequests.get() == 0);

    System.out.println("Network idle - all requests complete");
}
```

**Simple Network Idle Check:**
```java
public void waitForNetworkQuiet() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

    wait.until(driver -> {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Check if jQuery active
        Long jQueryActive = 0L;
        try {
            jQueryActive = (Long) js.executeScript("return jQuery.active");
        } catch (Exception e) {
            // jQuery not present
        }

        // Check if Fetch/XHR active (custom implementation)
        Long fetchActive = 0L;
        try {
            fetchActive = (Long) js.executeScript("return window.__fetchCount || 0");
        } catch (Exception e) {
            // Custom fetch tracker not present
        }

        // Network is quiet if no active requests
        return jQueryActive == 0 && fetchActive == 0;
    });

    System.out.println("Network quiet");
}
```

---

## <a name="practical-examples"></a>Practical Examples

### Example 1: Login Form with Validation

**Scenario:** Login form with async validation

```html
<form id="loginForm">
  <input id="username" type="text">
  <span id="usernameError" class="error" style="display:none;"></span>

  <input id="password" type="password">
  <span id="passwordError" class="error" style="display:none;"></span>

  <button id="submit" disabled>Login</button>
</form>
```

**Solution:**
```java
public class LoginPage {

    private WebDriver driver;
    private WebDriverWait wait;

    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By submitButton = By.id("submit");
    private By usernameError = By.id("usernameError");
    private By passwordError = By.id("passwordError");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void login(String username, String password) {
        // Enter username
        driver.findElement(usernameField).sendKeys(username);

        // Wait for validation (error or button enabled)
        wait.until(driver -> {
            boolean hasError = driver.findElement(usernameError).isDisplayed();
            boolean buttonEnabled = driver.findElement(submitButton).isEnabled();
            return hasError || buttonEnabled;
        });

        // Check for username error
        if (driver.findElement(usernameError).isDisplayed()) {
            throw new RuntimeException("Invalid username");
        }

        // Enter password
        driver.findElement(passwordField).sendKeys(password);

        // Wait for submit button to be enabled
        wait.until(ExpectedConditions.elementToBeClickable(submitButton));

        // Click submit
        driver.findElement(submitButton).click();

        // Wait for navigation (URL change)
        wait.until(ExpectedConditions.urlContains("/dashboard"));
    }
}
```

### Example 2: Dynamic Table with Pagination

**Scenario:** Search user in paginated table

```java
public class UserTable {

    private WebDriver driver;
    private WebDriverWait wait;

    private By searchBox = By.id("search");
    private By tableRows = By.cssSelector("table tbody tr");
    private By nextButton = By.id("nextPage");
    private By loadingSpinner = By.className("loading");

    public UserTable(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void searchUser(String email) {
        // Enter search term
        driver.findElement(searchBox).sendKeys(email);

        // Wait for loading spinner to appear
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(loadingSpinner));
        } catch (TimeoutException e) {
            // Spinner might be too fast
        }

        // Wait for loading to complete
        wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinner));

        // Wait for table rows to be present
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(tableRows));
    }

    public WebElement findUserRow(String email) {
        int maxPages = 10;
        boolean found = false;

        for (int page = 0; page < maxPages; page++) {
            // Wait for rows to load
            wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(tableRows));

            // Search in current page
            List<WebElement> rows = driver.findElements(tableRows);
            for (WebElement row : rows) {
                if (row.getText().contains(email)) {
                    return row;  // Found!
                }
            }

            // Try next page
            try {
                WebElement next = wait.until(
                    ExpectedConditions.elementToBeClickable(nextButton)
                );
                next.click();

                // Wait for page to load
                wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingSpinner));

                // Wait for stale elements (page changed)
                wait.until(ExpectedConditions.stalenessOf(rows.get(0)));

            } catch (TimeoutException e) {
                // No more pages
                break;
            }
        }

        throw new RuntimeException("User not found: " + email);
    }

    public void editUser(String email) {
        WebElement row = findUserRow(email);

        // Find edit button in row
        WebElement editButton = row.findElement(By.cssSelector(".btn-edit"));

        // Wait for button to be clickable and click
        wait.until(ExpectedConditions.elementToBeClickable(editButton)).click();

        // Wait for edit modal
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("editModal")));
    }
}
```

### Example 3: File Upload with Progress

**Scenario:** Upload file and wait for completion

```java
public class FileUploadPage {

    private WebDriver driver;
    private WebDriverWait wait;

    private By fileInput = By.id("fileInput");
    private By uploadButton = By.id("upload");
    private By progressBar = By.className("progress-bar");
    private By successMessage = By.className("success");
    private By errorMessage = By.className("error");

    public FileUploadPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofMinutes(5));
    }

    public void uploadFile(String filePath) {
        // Select file
        driver.findElement(fileInput).sendKeys(filePath);

        // Wait for upload button to be enabled
        wait.until(ExpectedConditions.elementToBeClickable(uploadButton));

        // Click upload
        driver.findElement(uploadButton).click();

        // Wait for progress bar to appear
        wait.until(ExpectedConditions.visibilityOfElementLocated(progressBar));

        // Monitor progress
        FluentWait<WebDriver> progressWait = new FluentWait<>(driver)
            .withTimeout(Duration.ofMinutes(5))
            .pollingEvery(Duration.ofSeconds(1))
            .ignoring(NoSuchElementException.class);

        progressWait.until(driver -> {
            WebElement bar = driver.findElement(progressBar);
            String width = bar.getCssValue("width");
            String ariaValue = bar.getAttribute("aria-valuenow");

            System.out.println("Upload progress: " + ariaValue + "%");

            // Check if complete (100%)
            return "100".equals(ariaValue);
        });

        // Wait for progress bar to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(progressBar));

        // Wait for success or error message
        wait.until(ExpectedConditions.or(
            ExpectedConditions.presenceOfElementLocated(successMessage),
            ExpectedConditions.presenceOfElementLocated(errorMessage)
        ));

        // Verify success
        if (driver.findElements(errorMessage).size() > 0) {
            String error = driver.findElement(errorMessage).getText();
            throw new RuntimeException("Upload failed: " + error);
        }

        System.out.println("Upload successful!");
    }
}
```

### Example 4: Autocomplete Search

**Scenario:** Search with autocomplete suggestions

```java
public class AutocompleteSearch {

    private WebDriver driver;
    private WebDriverWait wait;

    private By searchInput = By.id("search");
    private By suggestions = By.cssSelector(".autocomplete-suggestions li");

    public AutocompleteSearch(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void searchAndSelect(String searchTerm, String selection) {
        // Enter search term
        WebElement searchBox = driver.findElement(searchInput);
        searchBox.clear();
        searchBox.sendKeys(searchTerm);

        // Wait for suggestions to appear
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(suggestions));

        // Wait for suggestions to be visible
        wait.until(driver -> {
            List<WebElement> items = driver.findElements(suggestions);
            return !items.isEmpty() && items.get(0).isDisplayed();
        });

        // Find and click matching suggestion
        wait.until(driver -> {
            List<WebElement> items = driver.findElements(suggestions);
            for (WebElement item : items) {
                if (item.getText().contains(selection)) {
                    item.click();
                    return true;
                }
            }
            return false;
        });

        // Wait for suggestions to disappear
        wait.until(ExpectedConditions.invisibilityOfAllElements(
            driver.findElements(suggestions)
        ));

        // Verify selected value
        String selectedValue = driver.findElement(searchInput).getAttribute("value");
        if (!selectedValue.contains(selection)) {
            throw new RuntimeException("Selection failed");
        }
    }
}
```

### Example 5: Modal Dialog with Animation

**Scenario:** Handle modal with fade-in animation

```java
public class ModalDialog {

    private WebDriver driver;
    private WebDriverWait wait;

    private By openModalButton = By.id("openModal");
    private By modal = By.id("myModal");
    private By modalBackdrop = By.className("modal-backdrop");
    private By modalContent = By.className("modal-content");
    private By closeButton = By.className("close");

    public ModalDialog(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void openModal() {
        // Click open button
        driver.findElement(openModalButton).click();

        // Wait for modal to be present
        wait.until(ExpectedConditions.presenceOfElementLocated(modal));

        // Wait for fade-in animation to complete
        wait.until(driver -> {
            WebElement modalElement = driver.findElement(modal);
            String display = modalElement.getCssValue("display");
            String opacity = modalElement.getCssValue("opacity");

            // Modal fully visible: display=block, opacity=1
            return "block".equals(display) && "1".equals(opacity);
        });

        // Wait for backdrop (if present)
        try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(modalBackdrop));
        } catch (TimeoutException e) {
            // No backdrop
        }

        // Wait for modal content to be clickable
        wait.until(ExpectedConditions.visibilityOfElementLocated(modalContent));

        System.out.println("Modal opened and ready");
    }

    public void closeModal() {
        // Click close button
        wait.until(ExpectedConditions.elementToBeClickable(closeButton)).click();

        // Wait for fade-out animation
        wait.until(driver -> {
            try {
                WebElement modalElement = driver.findElement(modal);
                String opacity = modalElement.getCssValue("opacity");
                return "0".equals(opacity);
            } catch (NoSuchElementException e) {
                return true;  // Modal removed
            }
        });

        // Wait for modal to be removed from DOM
        wait.until(ExpectedConditions.invisibilityOfElementLocated(modal));

        System.out.println("Modal closed");
    }

    public void interactWithModal() {
        openModal();

        // Now safe to interact with modal content
        WebElement content = driver.findElement(modalContent);
        WebElement input = content.findElement(By.id("modalInput"));
        input.sendKeys("Test data");

        closeModal();
    }
}
```

### Example 6: Infinite Scroll Loading

**Scenario:** Load items with infinite scroll

```java
public class InfiniteScroll {

    private WebDriver driver;
    private WebDriverWait wait;
    private JavascriptExecutor js;

    private By items = By.cssSelector(".item");
    private By loadingIndicator = By.className("loading-more");

    public InfiniteScroll(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.js = (JavascriptExecutor) driver;
    }

    public void loadAllItems() {
        int previousCount = 0;
        int unchangedCount = 0;
        int maxAttempts = 50;

        while (unchangedCount < 3 && maxAttempts > 0) {
            // Scroll to bottom
            js.executeScript("window.scrollTo(0, document.body.scrollHeight);");

            // Wait for loading indicator (if present)
            try {
                wait.until(ExpectedConditions.visibilityOfElementLocated(loadingIndicator));
                wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingIndicator));
            } catch (TimeoutException e) {
                // No loading indicator or already loaded
            }

            // Wait for new items to load
            Thread.sleep(1000);

            // Count current items
            int currentCount = driver.findElements(items).size();

            if (currentCount == previousCount) {
                unchangedCount++;
            } else {
                unchangedCount = 0;
            }

            System.out.println("Loaded " + currentCount + " items");
            previousCount = currentCount;
            maxAttempts--;
        }

        System.out.println("Finished loading. Total items: " + previousCount);
    }

    public List<WebElement> getAllItems() {
        loadAllItems();
        return driver.findElements(items);
    }
}
```

### Example 7: Multi-Step Form Wizard

**Scenario:** Navigate multi-step form with validation

```java
public class FormWizard {

    private WebDriver driver;
    private WebDriverWait wait;

    private By nextButton = By.id("next");
    private By previousButton = By.id("previous");
    private By submitButton = By.id("submit");
    private By currentStep = By.className("step-active");

    public FormWizard(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void fillStep(int stepNumber, Map<String, String> data) {
        // Wait for correct step to be active
        wait.until(driver -> {
            WebElement step = driver.findElement(currentStep);
            String stepNum = step.getAttribute("data-step");
            return String.valueOf(stepNumber).equals(stepNum);
        });

        // Fill fields
        for (Map.Entry<String, String> entry : data.entrySet()) {
            String fieldName = entry.getKey();
            String value = entry.getValue();

            By fieldLocator = By.name(fieldName);
            wait.until(ExpectedConditions.visibilityOfElementLocated(fieldLocator));
            driver.findElement(fieldLocator).sendKeys(value);
        }

        // Wait for validation
        Thread.sleep(500);

        // Click next
        wait.until(ExpectedConditions.elementToBeClickable(nextButton)).click();

        // Wait for step transition
        wait.until(driver -> {
            WebElement step = driver.findElement(currentStep);
            String stepNum = step.getAttribute("data-step");
            return String.valueOf(stepNumber + 1).equals(stepNum);
        });
    }

    public void submitForm() {
        // Wait for submit button (final step)
        wait.until(ExpectedConditions.visibilityOfElementLocated(submitButton));

        // Wait for submit to be enabled (all validations passed)
        wait.until(ExpectedConditions.elementToBeClickable(submitButton)).click();

        // Wait for submission (URL change or success message)
        wait.until(ExpectedConditions.or(
            ExpectedConditions.urlContains("/success"),
            ExpectedConditions.presenceOfElementLocated(By.className("success-message"))
        ));
    }
}
```

---

## Summary

### Key Takeaways

1. **Choose the Right Wait:**
   - Simple apps: Implicit wait
   - Modern apps: Explicit wait (recommended)
   - Complex scenarios: Fluent wait

2. **Don't Mix Strategies:**
   - Implicit + Explicit = Unpredictable
   - Choose one and stick with it

3. **Common Patterns:**
   - Wait for clickable before clicking
   - Wait for invisible for loading completion
   - Wait for text change for status updates
   - Wait for page load before interactions

4. **Performance:**
   - Explicit waits are fastest (return immediately when condition met)
   - Thread.sleep() is slowest (always waits full duration)
   - Never use Thread.sleep() in production code

5. **Framework Integration:**
   - Create centralized wait utility
   - Use base page pattern
   - Define standard timeouts (5s, 10s, 30s)

### Best Practices Checklist

- [ ] Turn off implicit wait if using explicit waits
- [ ] Use specific ExpectedConditions (not just presence)
- [ ] Create custom conditions for complex scenarios
- [ ] Set reasonable timeouts (10s standard, 30s for slow operations)
- [ ] Customize polling for different scenarios
- [ ] Ignore relevant exceptions in FluentWait
- [ ] Add meaningful error messages
- [ ] Wait for page load before interactions
- [ ] Wait for AJAX/animations to complete
- [ ] Use framework-level wait utilities
- [ ] Log wait failures for debugging
- [ ] Never use Thread.sleep() in production

---

**End of Deep Dive: Waits and Synchronization**

Total Lines: ~800 lines
Last Updated: January 2025
