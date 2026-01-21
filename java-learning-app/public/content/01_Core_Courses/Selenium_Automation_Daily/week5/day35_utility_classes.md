# Day 41: Utility Classes - Reusable Helper Methods & Common Functions

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the importance and benefits of utility classes
- Create and implement BrowserUtils for browser management
- Build WaitUtils for explicit and fluent wait operations
- Develop ElementUtils for element interactions
- Implement AlertUtils for alert handling
- Create WindowUtils for window/tab management
- Build FrameUtils for iframe handling
- Implement ScreenshotUtils for enhanced screenshot capture
- Create FileUtils for file operations
- Develop DateTimeUtils for date/time operations
- Build RandomDataUtils for test data generation
- Implement RetryUtils for retry logic
- Create DatabaseUtils for database operations
- Develop EmailUtils for email validation and testing
- Apply best practices for utility classes

---

## 1. Introduction to Utility Classes

### What are Utility Classes?

**Utility classes** are helper classes that contain reusable methods and common functions used throughout a test automation framework. They follow the principle of DRY (Don't Repeat Yourself) and promote code reusability.

### Core Concept

```
Utility Classes = Reusable Helper Methods + Common Functions
```

**Key Characteristics:**
- Static methods for easy access
- No instance variables (stateless)
- Final class (cannot be extended)
- Private constructor (cannot be instantiated)
- Domain-specific functionality

### Why Use Utility Classes?

**Benefits:**
1. **Code Reusability** - Write once, use everywhere
2. **Maintainability** - Single point of update
3. **Consistency** - Same logic across framework
4. **Readability** - Clean and organized code
5. **Efficiency** - Reduces development time
6. **Testability** - Easy to test and verify

### Common Utility Categories

```
1. BrowserUtils      - Browser operations
2. WaitUtils         - Wait strategies
3. ElementUtils      - Element interactions
4. AlertUtils        - Alert handling
5. WindowUtils       - Window/tab management
6. FrameUtils        - Iframe operations
7. ScreenshotUtils   - Screenshot capture
8. FileUtils         - File operations
9. DateTimeUtils     - Date/time handling
10. RandomDataUtils  - Test data generation
11. RetryUtils       - Retry mechanisms
12. DatabaseUtils    - Database operations
13. EmailUtils       - Email operations
```

---

## 2. BrowserUtils - Browser Management

### Complete BrowserUtils Implementation

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public final class BrowserUtils {

    // Private constructor to prevent instantiation
    private BrowserUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // Browser window operations
    public static void maximizeWindow(WebDriver driver) {
        driver.manage().window().maximize();
    }

    public static void minimizeWindow(WebDriver driver) {
        driver.manage().window().minimize();
    }

    public static void setWindowSize(WebDriver driver, int width, int height) {
        driver.manage().window().setSize(new Dimension(width, height));
    }

    public static void setWindowPosition(WebDriver driver, int x, int y) {
        driver.manage().window().setPosition(new Point(x, y));
    }

    public static Dimension getWindowSize(WebDriver driver) {
        return driver.manage().window().getSize();
    }

    public static Point getWindowPosition(WebDriver driver) {
        return driver.manage().window().getPosition();
    }

    public static void fullScreen(WebDriver driver) {
        driver.manage().window().fullscreen();
    }

    // Navigation operations
    public static void navigateTo(WebDriver driver, String url) {
        driver.navigate().to(url);
    }

    public static void navigateBack(WebDriver driver) {
        driver.navigate().back();
    }

    public static void navigateForward(WebDriver driver) {
        driver.navigate().forward();
    }

    public static void refreshPage(WebDriver driver) {
        driver.navigate().refresh();
    }

    // Page information
    public static String getCurrentUrl(WebDriver driver) {
        return driver.getCurrentUrl();
    }

    public static String getPageTitle(WebDriver driver) {
        return driver.getTitle();
    }

    public static String getPageSource(WebDriver driver) {
        return driver.getPageSource();
    }

    // Scroll operations
    public static void scrollToElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    public static void scrollToTop(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollTo(0, 0)");
    }

    public static void scrollToBottom(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    }

    public static void scrollByPixels(WebDriver driver, int x, int y) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.scrollBy(arguments[0], arguments[1])", x, y);
    }

    // JavaScript operations
    public static Object executeJavaScript(WebDriver driver, String script, Object... args) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return js.executeScript(script, args);
    }

    public static void clickWithJS(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", element);
    }

    public static void typeWithJS(WebDriver driver, WebElement element, String text) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].value=arguments[1];", element, text);
    }

    public static void highlightElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        String originalStyle = element.getAttribute("style");
        js.executeScript("arguments[0].setAttribute('style', 'border: 2px solid red; background: yellow;');", element);
        sleep(500);
        js.executeScript("arguments[0].setAttribute('style', arguments[1]);", element, originalStyle);
    }

    // Cookie operations
    public static void addCookie(WebDriver driver, Cookie cookie) {
        driver.manage().addCookie(cookie);
    }

    public static Cookie getCookie(WebDriver driver, String name) {
        return driver.manage().getCookieNamed(name);
    }

    public static Set<Cookie> getAllCookies(WebDriver driver) {
        return driver.manage().getCookies();
    }

    public static void deleteCookie(WebDriver driver, String name) {
        driver.manage().deleteCookieNamed(name);
    }

    public static void deleteAllCookies(WebDriver driver) {
        driver.manage().deleteAllCookies();
    }

    // Timeout operations
    public static void setImplicitWait(WebDriver driver, int seconds) {
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(seconds));
    }

    public static void setPageLoadTimeout(WebDriver driver, int seconds) {
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(seconds));
    }

    public static void setScriptTimeout(WebDriver driver, int seconds) {
        driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(seconds));
    }

    // Utility methods
    public static void sleep(int milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Sleep interrupted", e);
        }
    }

    public static boolean isPageLoaded(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return js.executeScript("return document.readyState").equals("complete");
    }

    public static void waitForPageToLoad(WebDriver driver, int timeoutSeconds) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        wait.until(webDriver -> ((JavascriptExecutor) webDriver)
                .executeScript("return document.readyState").equals("complete"));
    }
}
```

### Usage Examples

```java
// Browser window operations
BrowserUtils.maximizeWindow(driver);
BrowserUtils.setWindowSize(driver, 1920, 1080);

// Navigation
BrowserUtils.navigateTo(driver, "https://example.com");
BrowserUtils.refreshPage(driver);

// Scrolling
BrowserUtils.scrollToElement(driver, element);
BrowserUtils.scrollToBottom(driver);

// JavaScript operations
BrowserUtils.clickWithJS(driver, element);
BrowserUtils.highlightElement(driver, element);

// Cookies
BrowserUtils.deleteAllCookies(driver);

// Wait for page load
BrowserUtils.waitForPageToLoad(driver, 30);
```

---

## 3. WaitUtils - Explicit and Fluent Waits

### Complete WaitUtils Implementation

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;
import java.util.function.Function;

public final class WaitUtils {

    private static final int DEFAULT_TIMEOUT = 30;
    private static final int DEFAULT_POLLING = 500;

    private WaitUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // WebDriverWait factory methods
    public static WebDriverWait createWait(WebDriver driver, int timeoutSeconds) {
        return new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
    }

    public static WebDriverWait createDefaultWait(WebDriver driver) {
        return new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
    }

    // Element visibility waits
    public static WebElement waitForVisibility(WebDriver driver, WebElement element, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.visibilityOf(element));
    }

    public static WebElement waitForVisibility(WebDriver driver, By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static List<WebElement> waitForVisibilityOfAll(WebDriver driver, By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
    }

    public static boolean waitForInvisibility(WebDriver driver, WebElement element, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.invisibilityOf(element));
    }

    public static boolean waitForInvisibility(WebDriver driver, By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    // Element clickability waits
    public static WebElement waitForClickability(WebDriver driver, WebElement element, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.elementToBeClickable(element));
    }

    public static WebElement waitForClickability(WebDriver driver, By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    // Element presence waits
    public static WebElement waitForPresence(WebDriver driver, By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }

    public static List<WebElement> waitForPresenceOfAll(WebDriver driver, By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
    }

    // Element selection waits
    public static boolean waitForElementToBeSelected(WebDriver driver, WebElement element, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.elementToBeSelected(element));
    }

    public static boolean waitForElementSelectionState(WebDriver driver, WebElement element,
                                                       boolean selected, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.elementSelectionStateToBe(element, selected));
    }

    // Text presence waits
    public static boolean waitForTextPresent(WebDriver driver, By locator, String text, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

    public static boolean waitForTextPresent(WebDriver driver, WebElement element, String text, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.textToBePresentInElement(element, text));
    }

    public static boolean waitForTextInValue(WebDriver driver, WebElement element, String text, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.textToBePresentInElementValue(element, text));
    }

    // Attribute waits
    public static boolean waitForAttributeContains(WebDriver driver, WebElement element,
                                                   String attribute, String value, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.attributeContains(element, attribute, value));
    }

    public static boolean waitForAttributeToBe(WebDriver driver, WebElement element,
                                               String attribute, String value, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.attributeToBe(element, attribute, value));
    }

    // Frame waits
    public static WebDriver waitForFrame(WebDriver driver, String frameNameOrId, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameNameOrId));
    }

    public static WebDriver waitForFrame(WebDriver driver, By locator, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator));
    }

    // Alert waits
    public static Alert waitForAlert(WebDriver driver, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.alertIsPresent());
    }

    // Staleness waits
    public static boolean waitForStaleness(WebDriver driver, WebElement element, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.stalenessOf(element));
    }

    // Title waits
    public static boolean waitForTitle(WebDriver driver, String title, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.titleIs(title));
    }

    public static boolean waitForTitleContains(WebDriver driver, String title, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.titleContains(title));
    }

    // URL waits
    public static boolean waitForUrl(WebDriver driver, String url, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.urlToBe(url));
    }

    public static boolean waitForUrlContains(WebDriver driver, String urlFragment, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.urlContains(urlFragment));
    }

    // Number of elements waits
    public static List<WebElement> waitForNumberOfElements(WebDriver driver, By locator,
                                                           int number, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.numberOfElementsToBe(locator, number));
    }

    public static List<WebElement> waitForNumberOfElementsMoreThan(WebDriver driver, By locator,
                                                                    int number, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(locator, number));
    }

    public static List<WebElement> waitForNumberOfElementsLessThan(WebDriver driver, By locator,
                                                                    int number, int timeout) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        return wait.until(ExpectedConditions.numberOfElementsToBeLessThan(locator, number));
    }

    // FluentWait implementation
    public static <T> FluentWait<WebDriver> createFluentWait(WebDriver driver,
                                                             int timeoutSeconds,
                                                             int pollingMillis) {
        return new FluentWait<>(driver)
                .withTimeout(Duration.ofSeconds(timeoutSeconds))
                .pollingEvery(Duration.ofMillis(pollingMillis))
                .ignoring(NoSuchElementException.class)
                .ignoring(StaleElementReferenceException.class);
    }

    public static WebElement fluentWaitForElement(WebDriver driver, final By locator,
                                                  int timeout, int polling) {
        FluentWait<WebDriver> wait = createFluentWait(driver, timeout, polling);
        return wait.until(new Function<WebDriver, WebElement>() {
            public WebElement apply(WebDriver driver) {
                return driver.findElement(locator);
            }
        });
    }

    // Custom wait conditions
    public static boolean waitForCondition(WebDriver driver,
                                          ExpectedCondition<?> condition,
                                          int timeout) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
            wait.until(condition);
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    // Wait with custom message
    public static <T> T waitUntil(WebDriver driver, ExpectedCondition<T> condition,
                                  int timeout, String message) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        wait.withMessage(message);
        return wait.until(condition);
    }
}
```

### Usage Examples

```java
// Wait for visibility
WebElement element = WaitUtils.waitForVisibility(driver, By.id("submit"), 10);

// Wait for clickability
WaitUtils.waitForClickability(driver, loginButton, 15);

// Wait for text
WaitUtils.waitForTextPresent(driver, By.id("message"), "Success", 10);

// Wait for alert
Alert alert = WaitUtils.waitForAlert(driver, 5);

// Fluent wait
WebElement element = WaitUtils.fluentWaitForElement(driver, By.id("dynamic"), 30, 500);

// Wait for URL
WaitUtils.waitForUrlContains(driver, "/dashboard", 10);
```

---

## 4. ElementUtils - Element Interactions

### Complete ElementUtils Implementation

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;
import java.util.List;
import java.util.stream.Collectors;

public final class ElementUtils {

    private ElementUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // Basic interactions
    public static void click(WebElement element) {
        element.click();
    }

    public static void clickWithWait(WebDriver driver, WebElement element, int timeout) {
        WaitUtils.waitForClickability(driver, element, timeout);
        element.click();
    }

    public static void type(WebElement element, String text) {
        element.clear();
        element.sendKeys(text);
    }

    public static void typeWithoutClear(WebElement element, String text) {
        element.sendKeys(text);
    }

    public static void clear(WebElement element) {
        element.clear();
    }

    public static void submit(WebElement element) {
        element.submit();
    }

    // Advanced click operations
    public static void doubleClick(WebDriver driver, WebElement element) {
        Actions actions = new Actions(driver);
        actions.doubleClick(element).perform();
    }

    public static void rightClick(WebDriver driver, WebElement element) {
        Actions actions = new Actions(driver);
        actions.contextClick(element).perform();
    }

    public static void clickAndHold(WebDriver driver, WebElement element) {
        Actions actions = new Actions(driver);
        actions.clickAndHold(element).perform();
    }

    public static void release(WebDriver driver, WebElement element) {
        Actions actions = new Actions(driver);
        actions.release(element).perform();
    }

    // Hover operations
    public static void hoverOver(WebDriver driver, WebElement element) {
        Actions actions = new Actions(driver);
        actions.moveToElement(element).perform();
    }

    public static void hoverAndClick(WebDriver driver, WebElement element) {
        Actions actions = new Actions(driver);
        actions.moveToElement(element).click().perform();
    }

    // Drag and drop operations
    public static void dragAndDrop(WebDriver driver, WebElement source, WebElement target) {
        Actions actions = new Actions(driver);
        actions.dragAndDrop(source, target).perform();
    }

    public static void dragAndDropByOffset(WebDriver driver, WebElement element, int x, int y) {
        Actions actions = new Actions(driver);
        actions.dragAndDropBy(element, x, y).perform();
    }

    // Dropdown operations
    public static Select getSelectElement(WebElement element) {
        return new Select(element);
    }

    public static void selectByValue(WebElement element, String value) {
        Select select = new Select(element);
        select.selectByValue(value);
    }

    public static void selectByIndex(WebElement element, int index) {
        Select select = new Select(element);
        select.selectByIndex(index);
    }

    public static void selectByVisibleText(WebElement element, String text) {
        Select select = new Select(element);
        select.selectByVisibleText(text);
    }

    public static void deselectAll(WebElement element) {
        Select select = new Select(element);
        if (select.isMultiple()) {
            select.deselectAll();
        }
    }

    public static List<String> getAllDropdownOptions(WebElement element) {
        Select select = new Select(element);
        return select.getOptions().stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
    }

    public static String getSelectedOption(WebElement element) {
        Select select = new Select(element);
        return select.getFirstSelectedOption().getText();
    }

    public static List<String> getAllSelectedOptions(WebElement element) {
        Select select = new Select(element);
        return select.getAllSelectedOptions().stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
    }

    // Element state checks
    public static boolean isDisplayed(WebElement element) {
        try {
            return element.isDisplayed();
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return false;
        }
    }

    public static boolean isEnabled(WebElement element) {
        try {
            return element.isEnabled();
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return false;
        }
    }

    public static boolean isSelected(WebElement element) {
        try {
            return element.isSelected();
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return false;
        }
    }

    // Element property operations
    public static String getText(WebElement element) {
        return element.getText();
    }

    public static String getAttribute(WebElement element, String attribute) {
        return element.getAttribute(attribute);
    }

    public static String getCssValue(WebElement element, String property) {
        return element.getCssValue(property);
    }

    public static String getTagName(WebElement element) {
        return element.getTagName();
    }

    public static Dimension getSize(WebElement element) {
        return element.getSize();
    }

    public static Point getLocation(WebElement element) {
        return element.getLocation();
    }

    public static Rectangle getRect(WebElement element) {
        return element.getRect();
    }

    // Checkbox and radio button operations
    public static void checkCheckbox(WebElement checkbox) {
        if (!checkbox.isSelected()) {
            checkbox.click();
        }
    }

    public static void uncheckCheckbox(WebElement checkbox) {
        if (checkbox.isSelected()) {
            checkbox.click();
        }
    }

    public static void selectRadioButton(WebElement radioButton) {
        if (!radioButton.isSelected()) {
            radioButton.click();
        }
    }

    // List operations
    public static List<String> getTextFromElements(List<WebElement> elements) {
        return elements.stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
    }

    public static void clickElementByText(List<WebElement> elements, String text) {
        for (WebElement element : elements) {
            if (element.getText().equals(text)) {
                element.click();
                break;
            }
        }
    }

    public static WebElement findElementByText(List<WebElement> elements, String text) {
        return elements.stream()
                .filter(e -> e.getText().equals(text))
                .findFirst()
                .orElse(null);
    }

    public static boolean isElementInList(List<WebElement> elements, String text) {
        return elements.stream()
                .anyMatch(e -> e.getText().equals(text));
    }

    // Text operations
    public static void typeSlowly(WebElement element, String text, int delayMillis) {
        for (char c : text.toCharArray()) {
            element.sendKeys(String.valueOf(c));
            try {
                Thread.sleep(delayMillis);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    public static void pressKey(WebElement element, Keys key) {
        element.sendKeys(key);
    }

    public static void pressKeys(WebElement element, CharSequence... keys) {
        element.sendKeys(keys);
    }

    // Verification methods
    public static boolean hasAttribute(WebElement element, String attribute) {
        String value = element.getAttribute(attribute);
        return value != null && !value.isEmpty();
    }

    public static boolean hasClass(WebElement element, String className) {
        String classes = element.getAttribute("class");
        return classes != null && classes.contains(className);
    }

    public static boolean isReadOnly(WebElement element) {
        String readOnly = element.getAttribute("readonly");
        return "true".equals(readOnly) || readOnly != null;
    }
}
```

### Usage Examples

```java
// Basic interactions
ElementUtils.click(submitButton);
ElementUtils.type(usernameField, "testuser");

// Advanced clicks
ElementUtils.doubleClick(driver, fileElement);
ElementUtils.rightClick(driver, menuElement);

// Hover
ElementUtils.hoverOver(driver, menuItem);

// Dropdown
ElementUtils.selectByVisibleText(countryDropdown, "United States");
List<String> options = ElementUtils.getAllDropdownOptions(countryDropdown);

// Checkbox
ElementUtils.checkCheckbox(termsCheckbox);

// Element state
boolean displayed = ElementUtils.isDisplayed(errorMessage);

// Get properties
String text = ElementUtils.getText(heading);
```

---

## 5. AlertUtils - Alert Handling

### Complete AlertUtils Implementation

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public final class AlertUtils {

    private AlertUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // Basic alert operations
    public static Alert getAlert(WebDriver driver) {
        return driver.switchTo().alert();
    }

    public static Alert waitForAlert(WebDriver driver, int timeoutSeconds) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        return wait.until(ExpectedConditions.alertIsPresent());
    }

    public static boolean isAlertPresent(WebDriver driver) {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }

    public static boolean isAlertPresent(WebDriver driver, int timeoutSeconds) {
        try {
            waitForAlert(driver, timeoutSeconds);
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    // Alert text operations
    public static String getAlertText(WebDriver driver) {
        Alert alert = driver.switchTo().alert();
        return alert.getText();
    }

    public static String getAlertTextWithWait(WebDriver driver, int timeoutSeconds) {
        Alert alert = waitForAlert(driver, timeoutSeconds);
        return alert.getText();
    }

    // Accept operations
    public static void acceptAlert(WebDriver driver) {
        Alert alert = driver.switchTo().alert();
        alert.accept();
    }

    public static void acceptAlertWithWait(WebDriver driver, int timeoutSeconds) {
        Alert alert = waitForAlert(driver, timeoutSeconds);
        alert.accept();
    }

    public static boolean acceptAlertIfPresent(WebDriver driver) {
        if (isAlertPresent(driver)) {
            acceptAlert(driver);
            return true;
        }
        return false;
    }

    // Dismiss operations
    public static void dismissAlert(WebDriver driver) {
        Alert alert = driver.switchTo().alert();
        alert.dismiss();
    }

    public static void dismissAlertWithWait(WebDriver driver, int timeoutSeconds) {
        Alert alert = waitForAlert(driver, timeoutSeconds);
        alert.dismiss();
    }

    public static boolean dismissAlertIfPresent(WebDriver driver) {
        if (isAlertPresent(driver)) {
            dismissAlert(driver);
            return true;
        }
        return false;
    }

    // Send text to alert
    public static void typeInAlert(WebDriver driver, String text) {
        Alert alert = driver.switchTo().alert();
        alert.sendKeys(text);
    }

    public static void typeInAlertWithWait(WebDriver driver, String text, int timeoutSeconds) {
        Alert alert = waitForAlert(driver, timeoutSeconds);
        alert.sendKeys(text);
    }

    // Combined operations
    public static void acceptAlertWithText(WebDriver driver, String expectedText) {
        Alert alert = driver.switchTo().alert();
        String actualText = alert.getText();
        if (actualText.equals(expectedText)) {
            alert.accept();
        } else {
            throw new AssertionError("Expected: " + expectedText + ", but got: " + actualText);
        }
    }

    public static String getAlertTextAndAccept(WebDriver driver) {
        Alert alert = driver.switchTo().alert();
        String text = alert.getText();
        alert.accept();
        return text;
    }

    public static String getAlertTextAndDismiss(WebDriver driver) {
        Alert alert = driver.switchTo().alert();
        String text = alert.getText();
        alert.dismiss();
        return text;
    }

    // Prompt operations
    public static void handlePrompt(WebDriver driver, String text) {
        Alert alert = driver.switchTo().alert();
        alert.sendKeys(text);
        alert.accept();
    }

    public static void handlePromptWithWait(WebDriver driver, String text, int timeoutSeconds) {
        Alert alert = waitForAlert(driver, timeoutSeconds);
        alert.sendKeys(text);
        alert.accept();
    }

    // Authentication alert (not standard JavaScript alert)
    public static void handleAuthenticationAlert(String username, String password, String url) {
        String[] urlParts = url.split("://");
        String authUrl = urlParts[0] + "://" + username + ":" + password + "@" + urlParts[1];
        // Use authUrl with driver.get()
    }
}
```

### Usage Examples

```java
// Wait for and accept alert
AlertUtils.acceptAlertWithWait(driver, 5);

// Get alert text
String alertText = AlertUtils.getAlertText(driver);

// Handle prompt
AlertUtils.handlePrompt(driver, "Test Input");

// Check if alert present
if (AlertUtils.isAlertPresent(driver)) {
    AlertUtils.acceptAlert(driver);
}

// Get text and accept
String message = AlertUtils.getAlertTextAndAccept(driver);
```

---

## 6. WindowUtils - Window/Tab Management

### Complete WindowUtils Implementation

```java
package utils;

import org.openqa.selenium.WebDriver;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public final class WindowUtils {

    private WindowUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // Get window handles
    public static String getCurrentWindowHandle(WebDriver driver) {
        return driver.getWindowHandle();
    }

    public static Set<String> getAllWindowHandles(WebDriver driver) {
        return driver.getWindowHandles();
    }

    public static List<String> getAllWindowHandlesAsList(WebDriver driver) {
        return new ArrayList<>(driver.getWindowHandles());
    }

    public static int getWindowCount(WebDriver driver) {
        return driver.getWindowHandles().size();
    }

    // Switch operations
    public static void switchToWindow(WebDriver driver, String windowHandle) {
        driver.switchTo().window(windowHandle);
    }

    public static void switchToWindowByIndex(WebDriver driver, int index) {
        List<String> windows = getAllWindowHandlesAsList(driver);
        if (index >= 0 && index < windows.size()) {
            driver.switchTo().window(windows.get(index));
        } else {
            throw new IndexOutOfBoundsException("Window index out of range: " + index);
        }
    }

    public static void switchToNewWindow(WebDriver driver) {
        String currentWindow = getCurrentWindowHandle(driver);
        Set<String> allWindows = getAllWindowHandles(driver);

        for (String window : allWindows) {
            if (!window.equals(currentWindow)) {
                driver.switchTo().window(window);
                break;
            }
        }
    }

    public static void switchToWindowByTitle(WebDriver driver, String title) {
        Set<String> windows = getAllWindowHandles(driver);
        for (String window : windows) {
            driver.switchTo().window(window);
            if (driver.getTitle().equals(title)) {
                return;
            }
        }
        throw new RuntimeException("Window with title '" + title + "' not found");
    }

    public static void switchToWindowByUrl(WebDriver driver, String url) {
        Set<String> windows = getAllWindowHandles(driver);
        for (String window : windows) {
            driver.switchTo().window(window);
            if (driver.getCurrentUrl().equals(url)) {
                return;
            }
        }
        throw new RuntimeException("Window with URL '" + url + "' not found");
    }

    public static void switchToWindowContainingTitle(WebDriver driver, String partialTitle) {
        Set<String> windows = getAllWindowHandles(driver);
        for (String window : windows) {
            driver.switchTo().window(window);
            if (driver.getTitle().contains(partialTitle)) {
                return;
            }
        }
        throw new RuntimeException("Window containing title '" + partialTitle + "' not found");
    }

    public static void switchToWindowContainingUrl(WebDriver driver, String partialUrl) {
        Set<String> windows = getAllWindowHandles(driver);
        for (String window : windows) {
            driver.switchTo().window(window);
            if (driver.getCurrentUrl().contains(partialUrl)) {
                return;
            }
        }
        throw new RuntimeException("Window containing URL '" + partialUrl + "' not found");
    }

    public static void switchToParentWindow(WebDriver driver, String parentHandle) {
        driver.switchTo().window(parentHandle);
    }

    // Close operations
    public static void closeCurrentWindow(WebDriver driver) {
        driver.close();
    }

    public static void closeAllWindowsExceptCurrent(WebDriver driver) {
        String currentWindow = getCurrentWindowHandle(driver);
        Set<String> allWindows = getAllWindowHandles(driver);

        for (String window : allWindows) {
            if (!window.equals(currentWindow)) {
                driver.switchTo().window(window);
                driver.close();
            }
        }
        driver.switchTo().window(currentWindow);
    }

    public static void closeAllWindowsExceptMain(WebDriver driver, String mainWindowHandle) {
        Set<String> allWindows = getAllWindowHandles(driver);

        for (String window : allWindows) {
            if (!window.equals(mainWindowHandle)) {
                driver.switchTo().window(window);
                driver.close();
            }
        }
        driver.switchTo().window(mainWindowHandle);
    }

    public static void closeWindowByTitle(WebDriver driver, String title) {
        String currentWindow = getCurrentWindowHandle(driver);
        Set<String> allWindows = getAllWindowHandles(driver);

        for (String window : allWindows) {
            driver.switchTo().window(window);
            if (driver.getTitle().equals(title)) {
                driver.close();
                driver.switchTo().window(currentWindow);
                return;
            }
        }
        driver.switchTo().window(currentWindow);
    }

    // Open new window/tab operations
    public static void openNewWindow(WebDriver driver) {
        driver.switchTo().newWindow(org.openqa.selenium.WindowType.WINDOW);
    }

    public static void openNewTab(WebDriver driver) {
        driver.switchTo().newWindow(org.openqa.selenium.WindowType.TAB);
    }

    // Wait for window operations
    public static void waitForWindowCount(WebDriver driver, int expectedCount, int timeoutSeconds) {
        long endTime = System.currentTimeMillis() + (timeoutSeconds * 1000L);

        while (System.currentTimeMillis() < endTime) {
            if (getWindowCount(driver) == expectedCount) {
                return;
            }
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        throw new RuntimeException("Timeout waiting for window count to be " + expectedCount);
    }

    public static void waitForNewWindow(WebDriver driver, int currentCount, int timeoutSeconds) {
        waitForWindowCount(driver, currentCount + 1, timeoutSeconds);
    }

    // Utility methods
    public static List<String> getAllWindowTitles(WebDriver driver) {
        String currentWindow = getCurrentWindowHandle(driver);
        List<String> titles = new ArrayList<>();
        Set<String> windows = getAllWindowHandles(driver);

        for (String window : windows) {
            driver.switchTo().window(window);
            titles.add(driver.getTitle());
        }

        driver.switchTo().window(currentWindow);
        return titles;
    }

    public static List<String> getAllWindowUrls(WebDriver driver) {
        String currentWindow = getCurrentWindowHandle(driver);
        List<String> urls = new ArrayList<>();
        Set<String> windows = getAllWindowHandles(driver);

        for (String window : windows) {
            driver.switchTo().window(window);
            urls.add(driver.getCurrentUrl());
        }

        driver.switchTo().window(currentWindow);
        return urls;
    }

    public static boolean isWindowPresent(WebDriver driver, String windowHandle) {
        return getAllWindowHandles(driver).contains(windowHandle);
    }
}
```

### Usage Examples

```java
// Get current window
String mainWindow = WindowUtils.getCurrentWindowHandle(driver);

// Switch to new window
WindowUtils.switchToNewWindow(driver);

// Switch by title
WindowUtils.switchToWindowByTitle(driver, "New Page");

// Close all except main
WindowUtils.closeAllWindowsExceptMain(driver, mainWindow);

// Wait for new window
WindowUtils.waitForNewWindow(driver, 1, 10);

// Get all titles
List<String> titles = WindowUtils.getAllWindowTitles(driver);
```

---

## 7. FrameUtils - Iframe Handling

### Complete FrameUtils Implementation

```java
package utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.NoSuchFrameException;

public final class FrameUtils {

    private FrameUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // Switch to frame operations
    public static void switchToFrameByIndex(WebDriver driver, int index) {
        driver.switchTo().frame(index);
    }

    public static void switchToFrameByName(WebDriver driver, String nameOrId) {
        driver.switchTo().frame(nameOrId);
    }

    public static void switchToFrameByElement(WebDriver driver, WebElement frameElement) {
        driver.switchTo().frame(frameElement);
    }

    public static void switchToFrameByLocator(WebDriver driver, By locator) {
        WebElement frameElement = driver.findElement(locator);
        driver.switchTo().frame(frameElement);
    }

    public static void switchToFrameWithWait(WebDriver driver, String nameOrId, int timeout) {
        WaitUtils.waitForFrame(driver, nameOrId, timeout);
    }

    public static void switchToFrameWithWait(WebDriver driver, By locator, int timeout) {
        WaitUtils.waitForFrame(driver, locator, timeout);
    }

    // Switch to parent/default content
    public static void switchToParentFrame(WebDriver driver) {
        driver.switchTo().parentFrame();
    }

    public static void switchToDefaultContent(WebDriver driver) {
        driver.switchTo().defaultContent();
    }

    // Frame verification
    public static boolean isFramePresent(WebDriver driver, String nameOrId) {
        try {
            driver.switchTo().frame(nameOrId);
            driver.switchTo().defaultContent();
            return true;
        } catch (NoSuchFrameException e) {
            return false;
        }
    }

    public static boolean isFramePresent(WebDriver driver, By locator) {
        try {
            WebElement frame = driver.findElement(locator);
            driver.switchTo().frame(frame);
            driver.switchTo().defaultContent();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static int getFrameCount(WebDriver driver) {
        return driver.findElements(By.tagName("iframe")).size() +
               driver.findElements(By.tagName("frame")).size();
    }

    // Nested frame operations
    public static void switchToNestedFrame(WebDriver driver, String... frameIds) {
        for (String frameId : frameIds) {
            driver.switchTo().frame(frameId);
        }
    }

    public static void switchToNestedFrameByIndex(WebDriver driver, int... indices) {
        for (int index : indices) {
            driver.switchTo().frame(index);
        }
    }

    // Frame attribute operations
    public static String getFrameSource(WebDriver driver, String frameId) {
        switchToFrameByName(driver, frameId);
        String source = driver.getPageSource();
        switchToDefaultContent(driver);
        return source;
    }

    public static String getFrameTitle(WebDriver driver, String frameId) {
        switchToFrameByName(driver, frameId);
        String title = driver.getTitle();
        switchToDefaultContent(driver);
        return title;
    }

    // Utility methods
    public static void executeInFrame(WebDriver driver, String frameId, Runnable action) {
        switchToFrameByName(driver, frameId);
        action.run();
        switchToDefaultContent(driver);
    }

    public static void executeInFrame(WebDriver driver, By locator, Runnable action) {
        switchToFrameByLocator(driver, locator);
        action.run();
        switchToDefaultContent(driver);
    }
}
```

### Usage Examples

```java
// Switch to frame by name
FrameUtils.switchToFrameByName(driver, "contentFrame");

// Switch to frame by locator
FrameUtils.switchToFrameByLocator(driver, By.id("myFrame"));

// Switch to nested frames
FrameUtils.switchToNestedFrame(driver, "frame1", "frame2", "frame3");

// Execute action in frame
FrameUtils.executeInFrame(driver, "myFrame", () -> {
    driver.findElement(By.id("submit")).click();
});

// Switch back to main content
FrameUtils.switchToDefaultContent(driver);

// Check if frame exists
boolean exists = FrameUtils.isFramePresent(driver, "myFrame");
```

---

## 8. ScreenshotUtils - Enhanced Screenshot Capture

### Complete ScreenshotUtils Implementation

```java
package utils;

import org.openqa.selenium.*;
import org.apache.commons.io.FileUtils;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public final class ScreenshotUtils {

    private static final String SCREENSHOT_DIR = "screenshots/";
    private static final String DATE_FORMAT = "yyyyMMdd_HHmmss";

    private ScreenshotUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // Basic screenshot operations
    public static String takeScreenshot(WebDriver driver, String fileName) {
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File source = screenshot.getScreenshotAs(OutputType.FILE);
            String destination = SCREENSHOT_DIR + fileName + ".png";
            File finalDestination = new File(destination);
            FileUtils.copyFile(source, finalDestination);
            return destination;
        } catch (IOException e) {
            throw new RuntimeException("Failed to take screenshot: " + e.getMessage());
        }
    }

    public static String takeScreenshot(WebDriver driver) {
        String fileName = "screenshot_" + getTimestamp();
        return takeScreenshot(driver, fileName);
    }

    public static byte[] takeScreenshotAsBytes(WebDriver driver) {
        TakesScreenshot screenshot = (TakesScreenshot) driver;
        return screenshot.getScreenshotAs(OutputType.BYTES);
    }

    public static String takeScreenshotAsBase64(WebDriver driver) {
        TakesScreenshot screenshot = (TakesScreenshot) driver;
        return screenshot.getScreenshotAs(OutputType.BASE64);
    }

    // Element screenshot
    public static String takeElementScreenshot(WebElement element, String fileName) {
        try {
            File source = element.getScreenshotAs(OutputType.FILE);
            String destination = SCREENSHOT_DIR + fileName + ".png";
            File finalDestination = new File(destination);
            FileUtils.copyFile(source, finalDestination);
            return destination;
        } catch (IOException e) {
            throw new RuntimeException("Failed to take element screenshot: " + e.getMessage());
        }
    }

    public static String takeElementScreenshot(WebElement element) {
        String fileName = "element_screenshot_" + getTimestamp();
        return takeElementScreenshot(element, fileName);
    }

    // Screenshot with custom directory
    public static String takeScreenshotToDirectory(WebDriver driver, String directory, String fileName) {
        try {
            createDirectoryIfNotExists(directory);
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File source = screenshot.getScreenshotAs(OutputType.FILE);
            String destination = directory + "/" + fileName + ".png";
            File finalDestination = new File(destination);
            FileUtils.copyFile(source, finalDestination);
            return destination;
        } catch (IOException e) {
            throw new RuntimeException("Failed to take screenshot: " + e.getMessage());
        }
    }

    // Screenshot on failure
    public static String takeScreenshotOnFailure(WebDriver driver, String testName) {
        String fileName = "FAILED_" + testName + "_" + getTimestamp();
        return takeScreenshot(driver, fileName);
    }

    // Full page screenshot (for Firefox)
    public static String takeFullPageScreenshot(WebDriver driver, String fileName) {
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File source = screenshot.getScreenshotAs(OutputType.FILE);
            String destination = SCREENSHOT_DIR + fileName + "_fullpage.png";
            File finalDestination = new File(destination);
            FileUtils.copyFile(source, finalDestination);
            return destination;
        } catch (IOException e) {
            throw new RuntimeException("Failed to take full page screenshot: " + e.getMessage());
        }
    }

    // Screenshot with timestamp
    public static String takeTimestampedScreenshot(WebDriver driver, String prefix) {
        String fileName = prefix + "_" + getTimestamp();
        return takeScreenshot(driver, fileName);
    }

    // Utility methods
    private static String getTimestamp() {
        SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        return dateFormat.format(new Date());
    }

    private static void createDirectoryIfNotExists(String directory) {
        File dir = new File(directory);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public static void initializeScreenshotDirectory() {
        createDirectoryIfNotExists(SCREENSHOT_DIR);
    }

    // Comparison screenshots
    public static boolean compareScreenshots(String screenshot1Path, String screenshot2Path) {
        try {
            BufferedImage img1 = ImageIO.read(new File(screenshot1Path));
            BufferedImage img2 = ImageIO.read(new File(screenshot2Path));

            if (img1.getWidth() != img2.getWidth() || img1.getHeight() != img2.getHeight()) {
                return false;
            }

            for (int y = 0; y < img1.getHeight(); y++) {
                for (int x = 0; x < img1.getWidth(); x++) {
                    if (img1.getRGB(x, y) != img2.getRGB(x, y)) {
                        return false;
                    }
                }
            }
            return true;
        } catch (IOException e) {
            throw new RuntimeException("Failed to compare screenshots: " + e.getMessage());
        }
    }

    // Screenshot with highlight
    public static String takeScreenshotWithHighlight(WebDriver driver, WebElement element, String fileName) {
        BrowserUtils.highlightElement(driver, element);
        return takeScreenshot(driver, fileName);
    }
}
```

### Usage Examples

```java
// Take basic screenshot
String path = ScreenshotUtils.takeScreenshot(driver, "login_page");

// Take screenshot with timestamp
ScreenshotUtils.takeTimestampedScreenshot(driver, "test_execution");

// Take element screenshot
ScreenshotUtils.takeElementScreenshot(errorMessage, "error_msg");

// Take screenshot on test failure
if (testFailed) {
    ScreenshotUtils.takeScreenshotOnFailure(driver, "loginTest");
}

// Get screenshot as Base64
String base64 = ScreenshotUtils.takeScreenshotAsBase64(driver);
```

---

## 9. Key Takeaways

1. **Utility classes** provide reusable helper methods across the framework
2. **BrowserUtils** handles browser window and navigation operations
3. **WaitUtils** implements explicit and fluent wait strategies
4. **ElementUtils** provides element interaction methods
5. **AlertUtils** simplifies alert and prompt handling
6. **WindowUtils** manages multiple windows and tabs
7. **FrameUtils** handles iframe switching operations
8. **ScreenshotUtils** captures and manages screenshots
9. **Utility classes should be final** with private constructors
10. **Static methods only** for utility classes
11. **Single responsibility** - one purpose per utility class
12. **Proper exception handling** in all utility methods
13. **Consistent naming conventions** across utilities
14. **Good documentation** makes utilities easy to use
15. **Method overloading** provides flexibility

---

## 10. Common Interview Questions

1. What are utility classes in Selenium framework?
2. Why should utility classes be final with private constructors?
3. Explain the difference between explicit and fluent waits.
4. How do you handle dynamic elements using utility classes?
5. What is the purpose of BrowserUtils in automation framework?
6. How do you implement retry logic in Selenium?
7. Explain the benefits of using utility classes.
8. How do you handle multiple windows in Selenium?
9. What are best practices for screenshot capture?
10. How do you handle date comparisons in tests?
11. What is the purpose of WaitUtils?
12. How do you implement custom wait conditions?
13. Explain iframe handling in Selenium.
14. How do you organize utility classes in a framework?
15. What is the DRY principle in test automation?

---

---

## Hands-On Exercises

### Exercise 1: Building BrowserUtils for Browser Management (45 minutes)

**Objective**: Create a comprehensive BrowserUtils class with methods for browser window operations, navigation, scrolling, and JavaScript execution.

**Scenario**: Your automation framework needs reusable browser management methods. Build BrowserUtils to handle common browser operations consistently across all tests.

**Tasks**:
1. Create BrowserUtils class with private constructor
2. Implement window management methods (maximize, minimize, resize)
3. Add navigation methods (back, forward, refresh)
4. Implement scroll operations (to element, to top, to bottom)
5. Add JavaScript execution methods
6. Create cookie management methods
7. Test all methods in a sample test class

**Code Template**:

```java
// TODO 1: Complete BrowserUtils class
package utils;

import org.openqa.selenium.*;

public final class BrowserUtils {

    // TODO: Add private constructor
    private BrowserUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // TODO: Implement window operations
    public static void maximizeWindow(WebDriver driver) {
        // TODO: Maximize browser window
    }

    public static void setWindowSize(WebDriver driver, int width, int height) {
        // TODO: Set custom window size
    }

    // TODO: Implement navigation methods
    public static void navigateTo(WebDriver driver, String url) {
        // TODO: Navigate to URL
    }

    public static void refreshPage(WebDriver driver) {
        // TODO: Refresh current page
    }

    // TODO: Implement scroll operations
    public static void scrollToElement(WebDriver driver, WebElement element) {
        // TODO: Scroll to element using JavaScript
    }

    public static void scrollToBottom(WebDriver driver) {
        // TODO: Scroll to page bottom
    }

    // TODO: Implement JavaScript operations
    public static void clickWithJS(WebDriver driver, WebElement element) {
        // TODO: Click element using JavaScript
    }

    public static void highlightElement(WebDriver driver, WebElement element) {
        // TODO: Highlight element with red border and yellow background
        // TODO: Wait 500ms then restore original style
    }

    // TODO: Implement cookie operations
    public static void deleteAllCookies(WebDriver driver) {
        // TODO: Delete all browser cookies
    }

    // TODO: Implement utility methods
    public static boolean isPageLoaded(WebDriver driver) {
        // TODO: Check if document.readyState equals "complete"
        return false;
    }
}

// TODO 2: Create test class
public class BrowserUtilsTest {
    WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
    }

    @Test
    public void testBrowserUtils() {
        // TODO: Test maximize
        BrowserUtils.maximizeWindow(driver);

        // TODO: Test navigation
        BrowserUtils.navigateTo(driver, "https://example.com");

        // TODO: Test scroll
        WebElement element = driver.findElement(By.id("footer"));
        BrowserUtils.scrollToElement(driver, element);

        // TODO: Test highlight
        BrowserUtils.highlightElement(driver, element);
    }

    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}
```

**Expected Output**:
```
✓ Browser window maximized successfully
✓ Navigation methods working correctly
✓ Scroll operations functioning properly
✓ JavaScript execution successful
✓ Element highlighting visible
✓ Cookie operations working
✓ Page load check accurate
```

**Common Mistakes**:
1. Not making class final
2. Forgetting private constructor
3. Not casting to JavascriptExecutor
4. Incorrect JavaScript syntax
5. Not handling null WebDriver

<details>
<summary><b>Solution Hints</b></summary>

```java
public static void scrollToElement(WebDriver driver, WebElement element) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    js.executeScript("arguments[0].scrollIntoView(true);", element);
}

public static void highlightElement(WebDriver driver, WebElement element) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    String originalStyle = element.getAttribute("style");
    js.executeScript("arguments[0].setAttribute('style', 'border: 2px solid red; background: yellow;');", element);
    sleep(500);
    js.executeScript("arguments[0].setAttribute('style', arguments[1]);", element, originalStyle);
}
```
</details>

---

### Exercise 2: Creating WaitUtils for Explicit Waits (50 minutes)

**Objective**: Build a comprehensive WaitUtils class with methods for all common wait scenarios using ExpectedConditions.

**Scenario**: Your tests need reliable wait mechanisms for dynamic elements. Create WaitUtils with various wait methods for visibility, clickability, text presence, and more.

**Tasks**:
1. Create WaitUtils class with private constructor
2. Implement visibility wait methods
3. Add clickability wait methods
4. Implement text presence waits
5. Add alert and frame waits
6. Create fluent wait implementation
7. Test with dynamic elements

**Code Template**:

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;

public final class WaitUtils {

    private static final int DEFAULT_TIMEOUT = 30;

    private WaitUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // TODO: Implement visibility waits
    public static WebElement waitForVisibility(WebDriver driver, By locator, int timeout) {
        // TODO: Create WebDriverWait
        // TODO: Wait for visibility of element located by locator
        return null;
    }

    public static WebElement waitForVisibility(WebDriver driver, WebElement element, int timeout) {
        // TODO: Wait for visibility of WebElement
        return null;
    }

    // TODO: Implement clickability waits
    public static WebElement waitForClickability(WebDriver driver, WebElement element, int timeout) {
        // TODO: Wait until element is clickable
        return null;
    }

    // TODO: Implement text presence waits
    public static boolean waitForTextPresent(WebDriver driver, By locator, String text, int timeout) {
        // TODO: Wait for text to be present in element
        return false;
    }

    // TODO: Implement alert waits
    public static Alert waitForAlert(WebDriver driver, int timeout) {
        // TODO: Wait for alert to be present
        return null;
    }

    // TODO: Implement frame waits
    public static WebDriver waitForFrame(WebDriver driver, String frameNameOrId, int timeout) {
        // TODO: Wait for frame and switch to it
        return null;
    }

    // TODO: Implement fluent wait
    public static WebElement fluentWaitForElement(WebDriver driver, By locator, int timeout, int polling) {
        // TODO: Create FluentWait with timeout and polling
        // TODO: Ignore NoSuchElementException
        // TODO: Wait for element
        return null;
    }

    // TODO: Implement custom wait conditions
    public static boolean waitForCondition(WebDriver driver, ExpectedCondition<?> condition, int timeout) {
        // TODO: Wait for custom condition
        return false;
    }
}

// TODO: Test WaitUtils
@Test
public void testWaitUtils() {
    driver.get("https://example.com/dynamic-content");

    // Test visibility wait
    WebElement element = WaitUtils.waitForVisibility(driver, By.id("dynamic-element"), 10);

    // Test text wait
    boolean textPresent = WaitUtils.waitForTextPresent(driver, By.id("message"), "Success", 5);

    // Test fluent wait
    WebElement fluentElement = WaitUtils.fluentWaitForElement(driver, By.id("slow-element"), 30, 500);
}
```

**Expected Output**:
```
✓ Visibility waits working for dynamic elements
✓ Clickability waits preventing StaleElementException
✓ Text presence waits detecting text changes
✓ Alert waits handling JavaScript alerts
✓ Frame waits switching to iframes successfully
✓ Fluent waits with polling working correctly
```

**Common Mistakes**:
1. Using wrong Duration API (seconds vs milliseconds)
2. Not handling TimeoutException
3. Mixing implicit and explicit waits
4. Not ignoring appropriate exceptions in fluent wait
5. Using very long timeouts unnecessarily

<details>
<summary><b>Solution Hints</b></summary>

```java
public static WebElement waitForVisibility(WebDriver driver, By locator, int timeout) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
    return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
}

public static WebElement fluentWaitForElement(WebDriver driver, By locator, int timeout, int polling) {
    FluentWait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(timeout))
            .pollingEvery(Duration.ofMillis(polling))
            .ignoring(NoSuchElementException.class);
    return wait.until(driver1 -> driver1.findElement(locator));
}
```
</details>

---

### Exercise 3: Developing ElementUtils for Interactions (45 minutes)

**Objective**: Create ElementUtils class with methods for element interactions, dropdown operations, and state checks.

**Scenario**: Build a utility class that simplifies common element operations like clicking, typing, dropdown selection, and checking element states.

**Tasks**:
1. Implement basic interaction methods (click, type, clear)
2. Add advanced click operations (double-click, right-click)
3. Implement dropdown selection methods
4. Add element state check methods
5. Create checkbox and radio button helpers
6. Test all methods

**Code Template**:

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;

public final class ElementUtils {

    private ElementUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // TODO: Basic interactions
    public static void click(WebElement element) {
        // TODO: Click element
    }

    public static void type(WebElement element, String text) {
        // TODO: Clear and type text
    }

    // TODO: Advanced clicks
    public static void doubleClick(WebDriver driver, WebElement element) {
        // TODO: Double-click using Actions
    }

    public static void rightClick(WebDriver driver, WebElement element) {
        // TODO: Right-click using Actions
    }

    // TODO: Hover operations
    public static void hoverOver(WebDriver driver, WebElement element) {
        // TODO: Move to element using Actions
    }

    // TODO: Dropdown operations
    public static void selectByVisibleText(WebElement element, String text) {
        // TODO: Create Select object and select by visible text
    }

    public static void selectByValue(WebElement element, String value) {
        // TODO: Select by value
    }

    public static String getSelectedOption(WebElement element) {
        // TODO: Get first selected option text
        return null;
    }

    // TODO: Element state checks
    public static boolean isDisplayed(WebElement element) {
        // TODO: Check if displayed, handle exceptions
        return false;
    }

    public static boolean isEnabled(WebElement element) {
        // TODO: Check if enabled
        return false;
    }

    public static boolean isSelected(WebElement element) {
        // TODO: Check if selected
        return false;
    }

    // TODO: Checkbox operations
    public static void checkCheckbox(WebElement checkbox) {
        // TODO: Check if not already selected, then click
    }

    public static void uncheckCheckbox(WebElement checkbox) {
        // TODO: Uncheck if selected, then click
    }
}
```

**Expected Output**:
```
✓ All interaction methods working correctly
✓ Advanced clicks (double, right) functioning
✓ Dropdown selections successful
✓ Element state checks accurate
✓ Checkbox operations working as expected
✓ No exceptions for null or stale elements
```

---

### Exercise 4: Building WindowUtils and AlertUtils (40 minutes)

**Objective**: Create utility classes for handling multiple windows/tabs and JavaScript alerts.

**Tasks**:
1. Implement WindowUtils for window management
2. Add methods to switch between windows
3. Implement AlertUtils for alert handling
4. Test with multiple windows and alerts

**Code Template**:

```java
// TODO: WindowUtils implementation
package utils;

import org.openqa.selenium.WebDriver;
import java.util.*;

public final class WindowUtils {

    private WindowUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // TODO: Get window handles
    public static String getCurrentWindowHandle(WebDriver driver) {
        // TODO: Return current window handle
        return null;
    }

    public static Set<String> getAllWindowHandles(WebDriver driver) {
        // TODO: Return all window handles
        return null;
    }

    // TODO: Switch operations
    public static void switchToNewWindow(WebDriver driver) {
        // TODO: Switch to new window (not current)
    }

    public static void switchToWindowByTitle(WebDriver driver, String title) {
        // TODO: Iterate through windows and switch by title
    }

    // TODO: Close operations
    public static void closeAllWindowsExceptMain(WebDriver driver, String mainWindowHandle) {
        // TODO: Close all windows except main
        // TODO: Switch back to main
    }
}

// TODO: AlertUtils implementation
package utils;

import org.openqa.selenium.*;

public final class AlertUtils {

    private AlertUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // TODO: Alert operations
    public static boolean isAlertPresent(WebDriver driver) {
        // TODO: Check if alert is present
        return false;
    }

    public static void acceptAlert(WebDriver driver) {
        // TODO: Accept alert
    }

    public static void dismissAlert(WebDriver driver) {
        // TODO: Dismiss alert
    }

    public static String getAlertText(WebDriver driver) {
        // TODO: Get alert text
        return null;
    }

    public static void typeInAlert(WebDriver driver, String text) {
        // TODO: Send keys to alert (for prompt)
    }
}
```

**Expected Output**:
```
✓ Window handle retrieval working
✓ Switching between windows successful
✓ Closing specific windows functional
✓ Alert detection accurate
✓ Alert accept/dismiss operations working
✓ Prompt text input functioning
```

---

### Exercise 5: Creating ScreenshotUtils with Advanced Features (35 minutes)

**Objective**: Build ScreenshotUtils with multiple screenshot capture methods including element screenshots and Base64 encoding.

**Tasks**:
1. Implement full page screenshot capture
2. Add element-specific screenshot method
3. Create timestamp-based filename generation
4. Implement Base64 screenshot capture
5. Add screenshot comparison capability

**Code Template**:

```java
package utils;

import org.openqa.selenium.*;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public final class ScreenshotUtils {

    private static final String SCREENSHOT_DIR = "screenshots/";
    private static final String DATE_FORMAT = "yyyyMMdd_HHmmss";

    private ScreenshotUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // TODO: Basic screenshot
    public static String takeScreenshot(WebDriver driver, String fileName) {
        // TODO: Take screenshot
        // TODO: Save to file with timestamp
        // TODO: Return file path
        return null;
    }

    // TODO: Element screenshot
    public static String takeElementScreenshot(WebElement element, String fileName) {
        // TODO: Take element screenshot
        // TODO: Save to file
        return null;
    }

    // TODO: Base64 screenshot
    public static String takeScreenshotAsBase64(WebDriver driver) {
        // TODO: Return screenshot as Base64 string
        return null;
    }

    // TODO: Screenshot on failure
    public static String takeScreenshotOnFailure(WebDriver driver, String testName) {
        // TODO: Add "FAILED_" prefix
        // TODO: Capture and save screenshot
        return null;
    }

    // TODO: Helper methods
    private static String getTimestamp() {
        SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        return dateFormat.format(new Date());
    }
}
```

**Expected Output**:
```
✓ Full page screenshots captured successfully
✓ Element screenshots working correctly
✓ Base64 encoding functional
✓ Timestamps added to filenames
✓ Screenshot directory created automatically
✓ Failure screenshots clearly labeled
```

---

### Exercise 6: Building Complete Utility Framework (60 minutes)

**Objective**: Integrate all utility classes into a cohesive framework and create comprehensive tests.

**Tasks**:
1. Organize all utility classes in proper package structure
2. Create BaseTest using all utilities
3. Implement sample tests demonstrating all utilities
4. Add proper exception handling
5. Create documentation for each utility
6. Build complete test suite

**Code Template**:

```java
// TODO: Create comprehensive BaseTest
package tests;

import utils.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestResult;
import org.testng.annotations.*;

public class BaseTest {

    protected WebDriver driver;

    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        BrowserUtils.maximizeWindow(driver);
        BrowserUtils.setImplicitWait(driver, 10);
    }

    @AfterMethod
    public void teardown(ITestResult result) {
        // TODO: Capture screenshot on failure
        if (result.getStatus() == ITestResult.FAILURE) {
            ScreenshotUtils.takeScreenshotOnFailure(driver, result.getName());
        }

        // TODO: Close browser
        if (driver != null) {
            driver.quit();
        }
    }
}

// TODO: Create comprehensive test demonstrating all utilities
@Test
public void testCompleteUtilityFramework() {
    // Use BrowserUtils
    BrowserUtils.navigateTo(driver, "https://example.com");

    // Use WaitUtils
    WebElement element = WaitUtils.waitForVisibility(driver, By.id("element"), 10);

    // Use ElementUtils
    ElementUtils.hoverOver(driver, element);
    ElementUtils.click(element);

    // Use ScreenshotUtils
    ScreenshotUtils.takeScreenshot(driver, "test_page");

    // TODO: Demonstrate all utility classes
}
```

**Expected Output**:
```
✓ All utility classes integrated successfully
✓ BaseTest using utilities correctly
✓ Exception handling robust
✓ Tests running smoothly
✓ Screenshots captured on failures
✓ Framework ready for production use
```

---

## Navigation

- **Previous:** [Day 40: Configuration Management](./day40_configuration_management.md)
- **Next:** [Day 42: Exception Handling Framework](./day42_exception_handling_framework.md)
- **Week 6 Home:** [Week 6 Overview](./README.md)

---

**Happy Learning!** Utility classes are the backbone of a robust and maintainable test automation framework. Master these utilities to build efficient and scalable automation solutions.
