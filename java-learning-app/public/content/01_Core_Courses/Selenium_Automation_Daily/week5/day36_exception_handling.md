# Day 42: Exception Handling & Custom Framework Exceptions

## Table of Contents
1. [Introduction](#introduction)
2. [Java Exception Hierarchy Review](#java-exception-hierarchy-review)
3. [Selenium WebDriver Exceptions](#selenium-webdriver-exceptions)
4. [Common Selenium Exceptions and Handling](#common-selenium-exceptions-and-handling)
5. [Custom Exception Classes](#custom-exception-classes)
6. [Framework-Specific Exceptions](#framework-specific-exceptions)
7. [Try-Catch-Finally in Test Automation](#try-catch-finally-in-test-automation)
8. [Exception Propagation](#exception-propagation)
9. [Retry Mechanism for Flaky Tests](#retry-mechanism-for-flaky-tests)
10. [Logging Exceptions](#logging-exceptions)
11. [Exception Reporting](#exception-reporting)
12. [Graceful Degradation](#graceful-degradation)
13. [Recovery Scenarios](#recovery-scenarios)
14. [Complete Exception Handling Framework](#complete-exception-handling-framework)
15. [Best Practices](#best-practices)
16. [Key Takeaways](#key-takeaways)
17. [Interview Questions](#interview-questions)

---

## Introduction

Exception handling is a critical component of robust test automation frameworks. Proper exception handling ensures that:
- Tests fail gracefully with meaningful error messages
- Framework continues execution even when individual tests fail
- Debugging is easier with detailed exception information
- Flaky tests can be retried automatically
- Resources are properly cleaned up

### Why Exception Handling Matters in Test Automation

1. **Test Stability**: Handles unexpected scenarios without crashing the entire test suite
2. **Debugging**: Provides clear error messages for faster issue resolution
3. **Reporting**: Generates meaningful test reports with failure reasons
4. **Recovery**: Implements retry logic for transient failures
5. **Maintenance**: Makes framework more maintainable and resilient

---

## Java Exception Hierarchy Review

Understanding Java's exception hierarchy is fundamental to effective exception handling.

### Exception Hierarchy

```
Throwable
├── Error (System errors, not recoverable)
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── VirtualMachineError
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   ├── IndexOutOfBoundsException
    │   └── ArithmeticException
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── ClassNotFoundException
```

### Checked vs Unchecked Exceptions

```java
// Checked Exception - Must be caught or declared
public void readFile(String path) throws IOException {
    FileReader reader = new FileReader(path);
    // File operations
}

// Unchecked Exception - Runtime exception
public void divideNumbers(int a, int b) {
    int result = a / b; // Can throw ArithmeticException
}
```

### Exception Class Structure

```java
public class CustomException extends Exception {
    private String errorCode;
    private String additionalInfo;

    public CustomException(String message) {
        super(message);
    }

    public CustomException(String message, Throwable cause) {
        super(message, cause);
    }

    public CustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
```

---

## Selenium WebDriver Exceptions

Selenium provides a rich set of exceptions for different failure scenarios.

### Common Selenium Exception Types

```java
package exceptions;

import org.openqa.selenium.*;

public class SeleniumExceptionExamples {

    public void demonstrateExceptions(WebDriver driver) {

        // 1. NoSuchElementException
        try {
            driver.findElement(By.id("nonExistentElement"));
        } catch (NoSuchElementException e) {
            System.out.println("Element not found: " + e.getMessage());
        }

        // 2. TimeoutException
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
            wait.until(ExpectedConditions.presenceOfElementLocated(
                By.id("slowElement")));
        } catch (TimeoutException e) {
            System.out.println("Element did not appear in time: " + e.getMessage());
        }

        // 3. StaleElementReferenceException
        try {
            WebElement element = driver.findElement(By.id("dynamic"));
            driver.navigate().refresh();
            element.click(); // Element is stale now
        } catch (StaleElementReferenceException e) {
            System.out.println("Element is stale: " + e.getMessage());
        }

        // 4. ElementNotInteractableException
        try {
            WebElement hiddenElement = driver.findElement(By.id("hidden"));
            hiddenElement.click(); // Element exists but not interactable
        } catch (ElementNotInteractableException e) {
            System.out.println("Element not interactable: " + e.getMessage());
        }

        // 5. ElementClickInterceptedException
        try {
            WebElement element = driver.findElement(By.id("covered"));
            element.click(); // Another element is covering this
        } catch (ElementClickInterceptedException e) {
            System.out.println("Click intercepted: " + e.getMessage());
        }
    }
}
```

### Selenium Exception Hierarchy

```java
WebDriverException (Base exception for all Selenium exceptions)
├── NoSuchElementException
├── NoSuchFrameException
├── NoSuchWindowException
├── StaleElementReferenceException
├── TimeoutException
├── ElementNotInteractableException
├── ElementClickInterceptedException
├── InvalidSelectorException
├── SessionNotFoundException
├── UnhandledAlertException
└── WebDriverTimeoutException
```

---

## Common Selenium Exceptions and Handling

Let's explore common Selenium exceptions with practical handling strategies.

### 1. NoSuchElementException Handler

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;

public class ElementHandler {
    private WebDriver driver;
    private static final int DEFAULT_TIMEOUT = 10;

    public ElementHandler(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * Finds element with retry mechanism
     */
    public WebElement findElementSafely(By locator, int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutSeconds));
            return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        } catch (NoSuchElementException e) {
            throw new ElementNotFoundException(
                "Element not found: " + locator.toString(), e);
        } catch (TimeoutException e) {
            throw new ElementNotFoundException(
                "Element not found within " + timeoutSeconds + " seconds: " +
                locator.toString(), e);
        }
    }

    public WebElement findElementSafely(By locator) {
        return findElementSafely(locator, DEFAULT_TIMEOUT);
    }
}
```

### 2. StaleElementReferenceException Handler

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;
import java.util.function.Function;

public class StaleElementHandler {
    private WebDriver driver;
    private static final int MAX_RETRIES = 3;

    public StaleElementHandler(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * Executes action with retry for stale elements
     */
    public <T> T executeWithStaleRetry(Function<WebDriver, T> action) {
        int attempts = 0;

        while (attempts < MAX_RETRIES) {
            try {
                return action.apply(driver);
            } catch (StaleElementReferenceException e) {
                attempts++;
                if (attempts >= MAX_RETRIES) {
                    throw new FrameworkException(
                        "Element remained stale after " + MAX_RETRIES + " attempts", e);
                }
                // Wait a bit before retry
                sleep(500);
            }
        }
        throw new FrameworkException("Max retries exceeded");
    }

    /**
     * Clicks element with stale retry
     */
    public void clickWithRetry(By locator) {
        executeWithStaleRetry(driver -> {
            WebElement element = driver.findElement(locator);
            element.click();
            return null;
        });
    }

    /**
     * Gets text with stale retry
     */
    public String getTextWithRetry(By locator) {
        return executeWithStaleRetry(driver -> {
            WebElement element = driver.findElement(locator);
            return element.getText();
        });
    }

    private void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### 3. TimeoutException Handler

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;

public class TimeoutHandler {
    private WebDriver driver;

    public TimeoutHandler(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * Waits for element with custom error message
     */
    public WebElement waitForElement(By locator, int timeoutSeconds,
                                     String customMessage) {
        try {
            WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutSeconds));
            return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        } catch (TimeoutException e) {
            String errorMsg = customMessage != null ?
                customMessage : "Element not found within timeout";
            throw new ElementTimeoutException(
                errorMsg + ": " + locator.toString(), e);
        }
    }

    /**
     * Waits for element to be clickable
     */
    public WebElement waitForClickable(By locator, int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutSeconds));
            return wait.until(ExpectedConditions.elementToBeClickable(locator));
        } catch (TimeoutException e) {
            throw new ElementTimeoutException(
                "Element not clickable within timeout: " + locator.toString(), e);
        }
    }

    /**
     * Waits for element to be visible
     */
    public WebElement waitForVisible(By locator, int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutSeconds));
            return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        } catch (TimeoutException e) {
            throw new ElementTimeoutException(
                "Element not visible within timeout: " + locator.toString(), e);
        }
    }
}
```

### 4. Alert Handler

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;

public class AlertHandler {
    private WebDriver driver;

    public AlertHandler(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * Handles alert if present
     */
    public boolean handleAlert(int timeoutSeconds, boolean accept) {
        try {
            WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutSeconds));
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());

            if (accept) {
                alert.accept();
            } else {
                alert.dismiss();
            }
            return true;
        } catch (NoAlertPresentException | TimeoutException e) {
            return false;
        }
    }

    /**
     * Gets alert text if present
     */
    public String getAlertText(int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutSeconds));
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            return alert.getText();
        } catch (NoAlertPresentException | TimeoutException e) {
            return null;
        }
    }
}
```

---

## Custom Exception Classes

Creating custom exceptions makes your framework more maintainable and provides better error context.

### Base Custom Exception

```java
package exceptions;

public class FrameworkException extends RuntimeException {
    private String errorCode;
    private String category;
    private long timestamp;

    public FrameworkException(String message) {
        super(message);
        this.timestamp = System.currentTimeMillis();
    }

    public FrameworkException(String message, Throwable cause) {
        super(message, cause);
        this.timestamp = System.currentTimeMillis();
    }

    public FrameworkException(String message, String errorCode, String category) {
        super(message);
        this.errorCode = errorCode;
        this.category = category;
        this.timestamp = System.currentTimeMillis();
    }

    public FrameworkException(String message, Throwable cause,
                            String errorCode, String category) {
        super(message, cause);
        this.errorCode = errorCode;
        this.category = category;
        this.timestamp = System.currentTimeMillis();
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getCategory() {
        return category;
    }

    public long getTimestamp() {
        return timestamp;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("FrameworkException[");
        sb.append("errorCode=").append(errorCode);
        sb.append(", category=").append(category);
        sb.append(", message=").append(getMessage());
        sb.append(", timestamp=").append(timestamp);
        sb.append("]");
        return sb.toString();
    }
}
```

### Element-Related Exceptions

```java
package exceptions;

public class ElementNotFoundException extends FrameworkException {
    private String locator;
    private String pageName;

    public ElementNotFoundException(String message) {
        super(message, "ELEM_NOT_FOUND", "ELEMENT");
    }

    public ElementNotFoundException(String message, Throwable cause) {
        super(message, cause, "ELEM_NOT_FOUND", "ELEMENT");
    }

    public ElementNotFoundException(String message, String locator,
                                   String pageName) {
        super(message, "ELEM_NOT_FOUND", "ELEMENT");
        this.locator = locator;
        this.pageName = pageName;
    }

    public String getLocator() {
        return locator;
    }

    public String getPageName() {
        return pageName;
    }
}

public class ElementNotInteractableException extends FrameworkException {
    private String elementState;

    public ElementNotInteractableException(String message) {
        super(message, "ELEM_NOT_INTERACTABLE", "ELEMENT");
    }

    public ElementNotInteractableException(String message, String elementState) {
        super(message, "ELEM_NOT_INTERACTABLE", "ELEMENT");
        this.elementState = elementState;
    }

    public String getElementState() {
        return elementState;
    }
}

public class ElementTimeoutException extends FrameworkException {
    private int timeoutSeconds;

    public ElementTimeoutException(String message) {
        super(message, "ELEM_TIMEOUT", "TIMEOUT");
    }

    public ElementTimeoutException(String message, Throwable cause) {
        super(message, cause, "ELEM_TIMEOUT", "TIMEOUT");
    }

    public ElementTimeoutException(String message, int timeoutSeconds) {
        super(message, "ELEM_TIMEOUT", "TIMEOUT");
        this.timeoutSeconds = timeoutSeconds;
    }

    public int getTimeoutSeconds() {
        return timeoutSeconds;
    }
}
```

### Configuration Exceptions

```java
package exceptions;

public class ConfigurationException extends FrameworkException {
    private String configKey;
    private String configFile;

    public ConfigurationException(String message) {
        super(message, "CONFIG_ERROR", "CONFIGURATION");
    }

    public ConfigurationException(String message, String configKey) {
        super(message, "CONFIG_ERROR", "CONFIGURATION");
        this.configKey = configKey;
    }

    public ConfigurationException(String message, String configKey,
                                 String configFile) {
        super(message, "CONFIG_ERROR", "CONFIGURATION");
        this.configKey = configKey;
        this.configFile = configFile;
    }

    public String getConfigKey() {
        return configKey;
    }

    public String getConfigFile() {
        return configFile;
    }
}
```

### Data-Related Exceptions

```java
package exceptions;

public class TestDataException extends FrameworkException {
    private String dataSource;
    private String dataKey;

    public TestDataException(String message) {
        super(message, "DATA_ERROR", "TEST_DATA");
    }

    public TestDataException(String message, String dataSource, String dataKey) {
        super(message, "DATA_ERROR", "TEST_DATA");
        this.dataSource = dataSource;
        this.dataKey = dataKey;
    }

    public String getDataSource() {
        return dataSource;
    }

    public String getDataKey() {
        return dataKey;
    }
}

public class DataFileNotFoundException extends TestDataException {
    private String filePath;

    public DataFileNotFoundException(String message, String filePath) {
        super(message);
        this.filePath = filePath;
    }

    public String getFilePath() {
        return filePath;
    }
}
```

### Browser Exceptions

```java
package exceptions;

public class BrowserException extends FrameworkException {
    private String browserType;
    private String browserVersion;

    public BrowserException(String message) {
        super(message, "BROWSER_ERROR", "BROWSER");
    }

    public BrowserException(String message, String browserType) {
        super(message, "BROWSER_ERROR", "BROWSER");
        this.browserType = browserType;
    }

    public String getBrowserType() {
        return browserType;
    }

    public String getBrowserVersion() {
        return browserVersion;
    }

    public void setBrowserVersion(String browserVersion) {
        this.browserVersion = browserVersion;
    }
}

public class BrowserLaunchException extends BrowserException {
    public BrowserLaunchException(String message) {
        super(message);
    }

    public BrowserLaunchException(String message, String browserType) {
        super(message, browserType);
    }
}
```

---

## Framework-Specific Exceptions

Framework-specific exceptions handle unique scenarios in your test automation framework.

### Page Object Exceptions

```java
package exceptions;

public class PageNotFoundException extends FrameworkException {
    private String pageUrl;
    private String expectedTitle;

    public PageNotFoundException(String message) {
        super(message, "PAGE_NOT_FOUND", "PAGE");
    }

    public PageNotFoundException(String message, String pageUrl) {
        super(message, "PAGE_NOT_FOUND", "PAGE");
        this.pageUrl = pageUrl;
    }

    public PageNotFoundException(String message, String pageUrl,
                                String expectedTitle) {
        super(message, "PAGE_NOT_FOUND", "PAGE");
        this.pageUrl = pageUrl;
        this.expectedTitle = expectedTitle;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public String getExpectedTitle() {
        return expectedTitle;
    }
}

public class PageLoadException extends FrameworkException {
    private String pageUrl;
    private int loadTimeMs;

    public PageLoadException(String message) {
        super(message, "PAGE_LOAD_ERROR", "PAGE");
    }

    public PageLoadException(String message, String pageUrl, int loadTimeMs) {
        super(message, "PAGE_LOAD_ERROR", "PAGE");
        this.pageUrl = pageUrl;
        this.loadTimeMs = loadTimeMs;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public int getLoadTimeMs() {
        return loadTimeMs;
    }
}
```

### API Testing Exceptions

```java
package exceptions;

public class ApiException extends FrameworkException {
    private int statusCode;
    private String endpoint;
    private String method;

    public ApiException(String message) {
        super(message, "API_ERROR", "API");
    }

    public ApiException(String message, int statusCode, String endpoint) {
        super(message, "API_ERROR", "API");
        this.statusCode = statusCode;
        this.endpoint = endpoint;
    }

    public ApiException(String message, int statusCode, String endpoint,
                       String method) {
        super(message, "API_ERROR", "API");
        this.statusCode = statusCode;
        this.endpoint = endpoint;
        this.method = method;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public String getMethod() {
        return method;
    }
}
```

### Assertion Exceptions

```java
package exceptions;

public class AssertionFailedException extends FrameworkException {
    private Object expected;
    private Object actual;
    private String assertionType;

    public AssertionFailedException(String message) {
        super(message, "ASSERTION_FAILED", "ASSERTION");
    }

    public AssertionFailedException(String message, Object expected,
                                   Object actual) {
        super(message, "ASSERTION_FAILED", "ASSERTION");
        this.expected = expected;
        this.actual = actual;
    }

    public AssertionFailedException(String message, Object expected,
                                   Object actual, String assertionType) {
        super(message, "ASSERTION_FAILED", "ASSERTION");
        this.expected = expected;
        this.actual = actual;
        this.assertionType = assertionType;
    }

    public Object getExpected() {
        return expected;
    }

    public Object getActual() {
        return actual;
    }

    public String getAssertionType() {
        return assertionType;
    }
}
```

---

## Try-Catch-Finally in Test Automation

Proper use of try-catch-finally ensures resource cleanup and error handling.

### Basic Try-Catch-Finally Pattern

```java
package tests;

import org.openqa.selenium.*;
import org.testng.annotations.*;

public class ExceptionHandlingTest {
    private WebDriver driver;

    @Test
    public void testWithProperExceptionHandling() {
        try {
            // Test logic
            driver.get("https://example.com");
            WebElement element = driver.findElement(By.id("submit"));
            element.click();

            // Assertions
            assert driver.getCurrentUrl().contains("success");

        } catch (NoSuchElementException e) {
            // Handle element not found
            System.err.println("Element not found: " + e.getMessage());
            takeScreenshot("element_not_found");
            throw new AssertionError("Test failed: Element not found", e);

        } catch (TimeoutException e) {
            // Handle timeout
            System.err.println("Timeout occurred: " + e.getMessage());
            takeScreenshot("timeout");
            throw new AssertionError("Test failed: Timeout", e);

        } catch (Exception e) {
            // Handle any other exception
            System.err.println("Unexpected error: " + e.getMessage());
            takeScreenshot("unexpected_error");
            throw e;

        } finally {
            // Cleanup - always executes
            cleanupTestData();
            logTestResult();
        }
    }

    private void takeScreenshot(String name) {
        // Screenshot implementation
    }

    private void cleanupTestData() {
        // Cleanup implementation
    }

    private void logTestResult() {
        // Logging implementation
    }
}
```

### Advanced Exception Handling in Page Objects

```java
package pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;
import exceptions.*;

public class LoginPage {
    private WebDriver driver;
    private WebDriverWait wait;

    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.id("login");
    private By errorMessage = By.className("error");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    /**
     * Performs login with comprehensive exception handling
     */
    public void login(String username, String password) {
        try {
            // Enter username
            enterUsername(username);

            // Enter password
            enterPassword(password);

            // Click login button
            clickLogin();

        } catch (ElementNotFoundException e) {
            throw new PageNotFoundException(
                "Login page elements not found",
                driver.getCurrentUrl(), e);

        } catch (ElementNotInteractableException e) {
            throw new exceptions.ElementNotInteractableException(
                "Cannot interact with login elements",
                "Element might be hidden or disabled");

        } catch (TimeoutException e) {
            throw new ElementTimeoutException(
                "Login elements took too long to load", 10);

        } catch (Exception e) {
            throw new FrameworkException(
                "Unexpected error during login", e);
        }
    }

    private void enterUsername(String username) {
        try {
            WebElement element = wait.until(
                ExpectedConditions.presenceOfElementLocated(usernameField));
            element.clear();
            element.sendKeys(username);
        } catch (TimeoutException e) {
            throw new ElementNotFoundException(
                "Username field not found", usernameField.toString(), "LoginPage");
        }
    }

    private void enterPassword(String password) {
        try {
            WebElement element = wait.until(
                ExpectedConditions.presenceOfElementLocated(passwordField));
            element.clear();
            element.sendKeys(password);
        } catch (TimeoutException e) {
            throw new ElementNotFoundException(
                "Password field not found", passwordField.toString(), "LoginPage");
        }
    }

    private void clickLogin() {
        try {
            WebElement element = wait.until(
                ExpectedConditions.elementToBeClickable(loginButton));
            element.click();
        } catch (TimeoutException e) {
            throw new ElementNotFoundException(
                "Login button not found or not clickable",
                loginButton.toString(), "LoginPage");
        }
    }

    public boolean isErrorDisplayed() {
        try {
            return driver.findElement(errorMessage).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
```

---

## Exception Propagation

Understanding how exceptions propagate through your framework is crucial.

### Exception Propagation Example

```java
package framework;

public class ExceptionPropagationDemo {

    // Layer 3: WebDriver interaction (lowest level)
    public void clickElement(WebDriver driver, By locator) {
        try {
            driver.findElement(locator).click();
        } catch (NoSuchElementException e) {
            // Convert Selenium exception to custom exception
            throw new ElementNotFoundException(
                "Element not found: " + locator.toString(), e);
        } catch (ElementClickInterceptedException e) {
            throw new exceptions.ElementNotInteractableException(
                "Element click intercepted: " + locator.toString());
        }
    }

    // Layer 2: Page object method
    public void submitForm(WebDriver driver) {
        try {
            clickElement(driver, By.id("submit"));
        } catch (ElementNotFoundException e) {
            // Add context and re-throw
            throw new PageNotFoundException(
                "Submit button not found on form",
                driver.getCurrentUrl());
        }
    }

    // Layer 1: Test method (highest level)
    @Test
    public void testFormSubmission() {
        try {
            submitForm(driver);
        } catch (PageNotFoundException e) {
            // Log and fail test with meaningful message
            logger.error("Form submission failed", e);
            Assert.fail("Unable to submit form: " + e.getMessage());
        }
    }
}
```

### Controlled Exception Propagation

```java
package utils;

import exceptions.*;

public class ExceptionManager {

    /**
     * Wraps checked exceptions as unchecked
     */
    public static RuntimeException wrapCheckedException(Exception e) {
        if (e instanceof RuntimeException) {
            return (RuntimeException) e;
        }
        return new FrameworkException("Wrapped exception", e);
    }

    /**
     * Extracts root cause from exception chain
     */
    public static Throwable getRootCause(Throwable throwable) {
        Throwable cause = throwable;
        while (cause.getCause() != null && cause.getCause() != cause) {
            cause = cause.getCause();
        }
        return cause;
    }

    /**
     * Gets full exception chain as string
     */
    public static String getExceptionChain(Throwable throwable) {
        StringBuilder sb = new StringBuilder();
        Throwable current = throwable;
        int level = 0;

        while (current != null) {
            if (level > 0) {
                sb.append("\nCaused by: ");
            }
            sb.append(current.getClass().getName())
              .append(": ")
              .append(current.getMessage());
            current = current.getCause();
            level++;
        }

        return sb.toString();
    }

    /**
     * Determines if exception is recoverable
     */
    public static boolean isRecoverable(Exception e) {
        if (e instanceof StaleElementReferenceException) {
            return true;
        }
        if (e instanceof ElementTimeoutException) {
            return true;
        }
        if (e instanceof NoSuchElementException) {
            return false; // Usually indicates test issue
        }
        return false;
    }
}
```

---

## Retry Mechanism for Flaky Tests

Implementing retry logic helps handle transient failures.

### TestNG Retry Listener

```java
package listeners;

import org.testng.*;

public class RetryAnalyzer implements IRetryAnalyzer {
    private int retryCount = 0;
    private static final int MAX_RETRY_COUNT = 3;

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY_COUNT) {
            retryCount++;
            System.out.println("Retrying test " + result.getName() +
                             " for the " + retryCount + " time");
            return true;
        }
        return false;
    }
}

// Retry listener to apply retry analyzer to all tests
public class RetryListener implements IAnnotationTransformer {

    @Override
    public void transform(ITestAnnotation annotation,
                         Class testClass,
                         Constructor testConstructor,
                         Method testMethod) {
        annotation.setRetryAnalyzer(RetryAnalyzer.class);
    }
}
```

### Conditional Retry Based on Exception Type

```java
package listeners;

import org.testng.*;
import exceptions.*;

public class SmartRetryAnalyzer implements IRetryAnalyzer {
    private int retryCount = 0;
    private static final int MAX_RETRY_COUNT = 3;

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY_COUNT) {
            Throwable throwable = result.getThrowable();

            // Retry only for specific exceptions
            if (isRetryableException(throwable)) {
                retryCount++;
                System.out.println("Retrying test " + result.getName() +
                                 " (attempt " + (retryCount + 1) + "/" +
                                 (MAX_RETRY_COUNT + 1) + ")");

                // Wait before retry
                sleep(2000 * retryCount); // Exponential backoff
                return true;
            }
        }
        return false;
    }

    private boolean isRetryableException(Throwable throwable) {
        if (throwable == null) {
            return false;
        }

        // Retry for these exception types
        if (throwable instanceof StaleElementReferenceException ||
            throwable instanceof ElementTimeoutException ||
            throwable instanceof TimeoutException ||
            throwable instanceof WebDriverException) {
            return true;
        }

        // Check cause
        return isRetryableException(throwable.getCause());
    }

    private void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### Method-Level Retry with Custom Logic

```java
package utils;

import java.util.function.Supplier;
import exceptions.*;

public class RetryUtil {

    /**
     * Retries a function with exponential backoff
     */
    public static <T> T retryWithBackoff(
            Supplier<T> function,
            int maxAttempts,
            long initialDelay) {

        int attempt = 0;
        long delay = initialDelay;

        while (attempt < maxAttempts) {
            try {
                return function.get();
            } catch (Exception e) {
                attempt++;

                if (attempt >= maxAttempts) {
                    throw new FrameworkException(
                        "Failed after " + maxAttempts + " attempts", e);
                }

                System.out.println("Attempt " + attempt + " failed. Retrying in " +
                                 delay + "ms...");
                sleep(delay);
                delay *= 2; // Exponential backoff
            }
        }

        throw new FrameworkException("Retry logic failed");
    }

    /**
     * Retries with fixed delay
     */
    public static <T> T retryWithFixedDelay(
            Supplier<T> function,
            int maxAttempts,
            long delay) {

        int attempt = 0;

        while (attempt < maxAttempts) {
            try {
                return function.get();
            } catch (Exception e) {
                attempt++;

                if (attempt >= maxAttempts) {
                    throw new FrameworkException(
                        "Failed after " + maxAttempts + " attempts", e);
                }

                sleep(delay);
            }
        }

        throw new FrameworkException("Retry logic failed");
    }

    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// Usage example
public class RetryUsageExample {

    public void clickWithRetry(WebDriver driver, By locator) {
        RetryUtil.retryWithBackoff(() -> {
            driver.findElement(locator).click();
            return null;
        }, 3, 1000);
    }

    public String getTextWithRetry(WebDriver driver, By locator) {
        return RetryUtil.retryWithFixedDelay(() -> {
            return driver.findElement(locator).getText();
        }, 3, 500);
    }
}
```

---

## Logging Exceptions

Comprehensive logging helps in debugging and maintaining test automation.

### Log4j Exception Logger

```java
package utils;

import org.apache.logging.log4j.*;

public class ExceptionLogger {
    private static final Logger logger = LogManager.getLogger(ExceptionLogger.class);

    /**
     * Logs exception with full stack trace
     */
    public static void logException(Exception e) {
        logger.error("Exception occurred: " + e.getMessage(), e);
    }

    /**
     * Logs exception with context
     */
    public static void logException(Exception e, String context) {
        logger.error("Exception in " + context + ": " + e.getMessage(), e);
    }

    /**
     * Logs exception with custom severity
     */
    public static void logException(Exception e, String context, Level level) {
        logger.log(level, "Exception in " + context + ": " + e.getMessage(), e);
    }

    /**
     * Logs exception chain
     */
    public static void logExceptionChain(Throwable throwable) {
        logger.error("Exception chain:");
        Throwable current = throwable;
        int level = 0;

        while (current != null) {
            logger.error("  Level " + level + ": " +
                        current.getClass().getName() + " - " +
                        current.getMessage());
            current = current.getCause();
            level++;
        }
    }

    /**
     * Logs custom framework exception with details
     */
    public static void logFrameworkException(FrameworkException e) {
        logger.error("Framework Exception Details:");
        logger.error("  Error Code: " + e.getErrorCode());
        logger.error("  Category: " + e.getCategory());
        logger.error("  Message: " + e.getMessage());
        logger.error("  Timestamp: " + e.getTimestamp());

        if (e.getCause() != null) {
            logger.error("  Caused by: " + e.getCause().getMessage());
        }
    }
}
```

### Enhanced Exception Logger with Screenshots

```java
package utils;

import org.apache.logging.log4j.*;
import org.openqa.selenium.*;
import java.io.*;
import java.nio.file.*;
import java.time.*;
import java.time.format.DateTimeFormatter;

public class EnhancedExceptionLogger {
    private static final Logger logger = LogManager.getLogger(EnhancedExceptionLogger.class);
    private static final String SCREENSHOT_DIR = "target/screenshots/";

    /**
     * Logs exception with screenshot
     */
    public static void logWithScreenshot(Exception e, WebDriver driver,
                                        String testName) {
        // Log exception
        logger.error("Exception in test: " + testName, e);

        // Take screenshot
        String screenshotPath = takeScreenshot(driver, testName);

        if (screenshotPath != null) {
            logger.error("Screenshot saved: " + screenshotPath);
        }

        // Log browser console logs
        logBrowserConsole(driver);

        // Log page source
        logPageSource(driver, testName);
    }

    private static String takeScreenshot(WebDriver driver, String testName) {
        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            byte[] screenshot = ts.getScreenshotAs(OutputType.BYTES);

            String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String fileName = testName + "_" + timestamp + ".png";
            Path path = Paths.get(SCREENSHOT_DIR + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, screenshot);

            return path.toString();
        } catch (Exception e) {
            logger.error("Failed to take screenshot", e);
            return null;
        }
    }

    private static void logBrowserConsole(WebDriver driver) {
        try {
            LogEntries logs = driver.manage().logs().get(LogType.BROWSER);

            if (!logs.getAll().isEmpty()) {
                logger.error("Browser Console Logs:");
                for (LogEntry log : logs) {
                    logger.error("  " + log.getLevel() + ": " + log.getMessage());
                }
            }
        } catch (Exception e) {
            logger.warn("Could not retrieve browser logs", e);
        }
    }

    private static void logPageSource(WebDriver driver, String testName) {
        try {
            String pageSource = driver.getPageSource();
            String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String fileName = testName + "_" + timestamp + "_source.html";
            Path path = Paths.get("target/page-sources/" + fileName);

            Files.createDirectories(path.getParent());
            Files.writeString(path, pageSource);

            logger.error("Page source saved: " + path.toString());
        } catch (Exception e) {
            logger.warn("Could not save page source", e);
        }
    }
}
```

---

## Exception Reporting

Integrating exception information into test reports improves visibility.

### ExtentReports Exception Handler

```java
package reporting;

import com.aventstack.extentreports.*;
import com.aventstack.extentreports.markuputils.*;
import exceptions.*;
import java.io.*;

public class ExceptionReporter {

    /**
     * Logs exception to Extent Report
     */
    public static void logException(ExtentTest test, Exception e) {
        test.fail("Test failed with exception");
        test.fail(e.getClass().getName() + ": " + e.getMessage());

        // Log stack trace
        String stackTrace = getStackTraceAsString(e);
        test.fail(MarkupHelper.createCodeBlock(stackTrace));
    }

    /**
     * Logs exception with screenshot
     */
    public static void logExceptionWithScreenshot(ExtentTest test,
                                                  Exception e,
                                                  String screenshotPath) {
        logException(test, e);

        if (screenshotPath != null) {
            test.addScreenCaptureFromPath(screenshotPath);
        }
    }

    /**
     * Logs custom framework exception with details
     */
    public static void logFrameworkException(ExtentTest test,
                                            FrameworkException e) {
        test.fail("Framework Exception");

        // Create exception details table
        String[][] data = {
            {"Error Code", e.getErrorCode()},
            {"Category", e.getCategory()},
            {"Message", e.getMessage()},
            {"Timestamp", String.valueOf(e.getTimestamp())}
        };

        test.fail(MarkupHelper.createTable(data));

        // Log stack trace
        if (e.getCause() != null) {
            test.fail("Caused by: " + e.getCause().getMessage());
            String stackTrace = getStackTraceAsString(e.getCause());
            test.fail(MarkupHelper.createCodeBlock(stackTrace));
        }
    }

    private static String getStackTraceAsString(Throwable throwable) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        throwable.printStackTrace(pw);
        return sw.toString();
    }
}
```

### TestNG Reporter Integration

```java
package listeners;

import org.testng.*;
import utils.*;
import reporting.*;

public class ExceptionReportListener implements ITestListener {

    @Override
    public void onTestFailure(ITestResult result) {
        Throwable throwable = result.getThrowable();

        if (throwable != null) {
            // Log to console
            ExceptionLogger.logException((Exception) throwable,
                                        result.getName());

            // Log to TestNG report
            Reporter.log("Exception: " + throwable.getMessage(), true);
            Reporter.log("Exception Type: " +
                        throwable.getClass().getName(), true);

            // Log exception chain
            Reporter.log("Exception Chain:", true);
            Reporter.log(ExceptionManager.getExceptionChain(throwable), true);
        }
    }
}
```

---

## Graceful Degradation

Implementing graceful degradation ensures tests continue even when non-critical operations fail.

### Graceful Degradation Example

```java
package utils;

import org.openqa.selenium.*;
import org.apache.logging.log4j.*;
import java.util.function.Supplier;
import java.time.Duration;
import org.openqa.selenium.support.ui.*;

public class GracefulDegradation {
    private static final Logger logger =
        LogManager.getLogger(GracefulDegradation.class);

    /**
     * Attempts operation with fallback
     */
    public static <T> T tryWithFallback(Supplier<T> primary,
                                       Supplier<T> fallback,
                                       String operationName) {
        try {
            return primary.get();
        } catch (Exception e) {
            logger.warn("Primary operation '" + operationName +
                       "' failed, using fallback", e);
            try {
                return fallback.get();
            } catch (Exception fallbackException) {
                logger.error("Fallback also failed for '" +
                           operationName + "'", fallbackException);
                throw fallbackException;
            }
        }
    }

    /**
     * Clicks element with JavaScript fallback
     */
    public static void clickWithFallback(WebDriver driver, WebElement element) {
        try {
            element.click();
        } catch (ElementClickInterceptedException e) {
            logger.warn("Normal click failed, trying JavaScript click");
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("arguments[0].click();", element);
        }
    }

    /**
     * Gets text with multiple strategies
     */
    public static String getTextGracefully(WebDriver driver, By locator) {
        WebElement element = driver.findElement(locator);

        // Try getText()
        try {
            String text = element.getText();
            if (text != null && !text.isEmpty()) {
                return text;
            }
        } catch (Exception e) {
            logger.warn("getText() failed", e);
        }

        // Try getAttribute("textContent")
        try {
            String text = element.getAttribute("textContent");
            if (text != null && !text.isEmpty()) {
                return text;
            }
        } catch (Exception e) {
            logger.warn("textContent failed", e);
        }

        // Try getAttribute("innerText")
        try {
            String text = element.getAttribute("innerText");
            if (text != null && !text.isEmpty()) {
                return text;
            }
        } catch (Exception e) {
            logger.warn("innerText failed", e);
        }

        // Try JavaScript
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return (String) js.executeScript(
                "return arguments[0].textContent || arguments[0].innerText;",
                element);
        } catch (Exception e) {
            logger.error("All text retrieval methods failed", e);
            return "";
        }
    }

    /**
     * Waits for element with graceful degradation
     */
    public static WebElement waitForElementGracefully(
            WebDriver driver,
            By locator,
            int timeoutSeconds) {

        try {
            WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutSeconds));
            return wait.until(
                ExpectedConditions.presenceOfElementLocated(locator));
        } catch (TimeoutException e) {
            logger.warn("Element wait timed out, checking if element exists");
            try {
                return driver.findElement(locator);
            } catch (NoSuchElementException nsee) {
                throw new exceptions.ElementNotFoundException(
                    "Element not found: " + locator.toString(), nsee);
            }
        }
    }
}
```

---

## Recovery Scenarios

Implementing recovery mechanisms helps tests continue after failures.

### Recovery Manager

```java
package utils;

import org.openqa.selenium.*;
import org.apache.logging.log4j.*;
import exceptions.*;

public class RecoveryManager {
    private static final Logger logger =
        LogManager.getLogger(RecoveryManager.class);
    private WebDriver driver;

    public RecoveryManager(WebDriver driver) {
        this.driver = driver;
    }

    /**
     * Recovers from alert if present
     */
    public void recoverFromAlert() {
        try {
            Alert alert = driver.switchTo().alert();
            logger.warn("Unexpected alert found: " + alert.getText());
            alert.accept();
            logger.info("Alert dismissed successfully");
        } catch (NoAlertPresentException e) {
            // No alert, no recovery needed
        }
    }

    /**
     * Recovers from stale element
     */
    public WebElement recoverFromStaleElement(By locator, int maxAttempts) {
        int attempt = 0;

        while (attempt < maxAttempts) {
            try {
                return driver.findElement(locator);
            } catch (StaleElementReferenceException e) {
                attempt++;
                logger.warn("Stale element, attempt " + attempt + "/" + maxAttempts);

                if (attempt >= maxAttempts) {
                    throw new FrameworkException(
                        "Could not recover from stale element", e);
                }

                sleep(500);
            }
        }

        throw new FrameworkException("Recovery attempts exhausted");
    }

    /**
     * Recovers from page crash
     */
    public boolean recoverFromPageCrash(String expectedUrl) {
        try {
            String currentUrl = driver.getCurrentUrl();

            if (!currentUrl.contains(expectedUrl)) {
                logger.warn("Page navigation failed. Expected: " + expectedUrl +
                          ", Actual: " + currentUrl);
                driver.navigate().to(expectedUrl);
                logger.info("Navigated back to expected page");
                return true;
            }
        } catch (Exception e) {
            logger.error("Could not recover from page crash", e);
            return false;
        }

        return false;
    }

    /**
     * Recovers from modal/overlay blocking interaction
     */
    public void recoverFromBlockingOverlay() {
        try {
            // Check for common overlay selectors
            String[] overlaySelectors = {
                ".modal",
                ".overlay",
                "#modal",
                "[class*='popup']"
            };

            for (String selector : overlaySelectors) {
                try {
                    WebElement overlay = driver.findElement(
                        By.cssSelector(selector));

                    if (overlay.isDisplayed()) {
                        logger.warn("Found blocking overlay: " + selector);

                        // Try to close it
                        WebElement closeButton = overlay.findElement(
                            By.cssSelector(".close, .btn-close, [aria-label='Close']"));
                        closeButton.click();
                        logger.info("Closed blocking overlay");
                        return;
                    }
                } catch (NoSuchElementException e) {
                    // Continue checking other selectors
                }
            }
        } catch (Exception e) {
            logger.error("Could not recover from blocking overlay", e);
        }
    }

    /**
     * Recovers browser session
     */
    public void recoverBrowserSession() {
        try {
            // Check if browser is responsive
            driver.getCurrentUrl();
        } catch (WebDriverException e) {
            logger.error("Browser session lost", e);
            throw new BrowserException(
                "Browser session cannot be recovered. Please restart tests.");
        }
    }

    private void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

---

## Complete Exception Handling Framework

A comprehensive exception handling framework integrating all concepts.

### Exception Handling Framework

```java
package framework;

import org.openqa.selenium.*;
import org.apache.logging.log4j.*;
import utils.*;
import exceptions.*;
import reporting.*;
import java.util.function.Supplier;
import java.nio.file.*;
import com.aventstack.extentreports.*;

public class ExceptionHandlingFramework {
    private static final Logger logger =
        LogManager.getLogger(ExceptionHandlingFramework.class);

    private WebDriver driver;
    private RecoveryManager recoveryManager;

    public ExceptionHandlingFramework(WebDriver driver) {
        this.driver = driver;
        this.recoveryManager = new RecoveryManager(driver);
    }

    /**
     * Executes action with complete exception handling
     */
    public <T> T executeWithExceptionHandling(
            Supplier<T> action,
            String actionName,
            ExtentTest extentTest) {

        int retryCount = 0;
        final int MAX_RETRIES = 3;

        while (retryCount <= MAX_RETRIES) {
            try {
                // Attempt action
                return action.get();

            } catch (StaleElementReferenceException e) {
                retryCount++;
                logger.warn("Stale element in '" + actionName +
                          "', retry " + retryCount);

                if (retryCount > MAX_RETRIES) {
                    handleException(e, actionName, extentTest);
                    throw new FrameworkException(
                        "Action failed after retries: " + actionName, e);
                }

                sleep(1000);

            } catch (ElementClickInterceptedException e) {
                logger.warn("Click intercepted in '" + actionName +
                          "', attempting recovery");
                recoveryManager.recoverFromBlockingOverlay();
                retryCount++;

                if (retryCount > MAX_RETRIES) {
                    handleException(e, actionName, extentTest);
                    throw new FrameworkException(
                        "Could not recover from click interception", e);
                }

            } catch (TimeoutException e) {
                logger.error("Timeout in '" + actionName + "'");
                handleException(e, actionName, extentTest);
                throw new ElementTimeoutException(
                    "Action timed out: " + actionName, e);

            } catch (NoSuchElementException e) {
                logger.error("Element not found in '" + actionName + "'");
                handleException(e, actionName, extentTest);
                throw new ElementNotFoundException(
                    "Element not found during: " + actionName, e);

            } catch (WebDriverException e) {
                logger.error("WebDriver error in '" + actionName + "'");
                recoveryManager.recoverBrowserSession();
                handleException(e, actionName, extentTest);
                throw new BrowserException(
                    "Browser error during: " + actionName, e);

            } catch (Exception e) {
                logger.error("Unexpected error in '" + actionName + "'");
                handleException(e, actionName, extentTest);
                throw new FrameworkException(
                    "Unexpected error during: " + actionName, e);
            }
        }

        throw new FrameworkException("Execution failed: " + actionName);
    }

    /**
     * Handles exception with logging, screenshot, and reporting
     */
    private void handleException(Exception e, String context,
                                 ExtentTest extentTest) {
        // Log exception
        ExceptionLogger.logException(e, context);

        // Take screenshot
        String screenshotPath = takeScreenshot(context);

        // Log to extent report
        if (extentTest != null) {
            ExceptionReporter.logExceptionWithScreenshot(
                extentTest, e, screenshotPath);
        }

        // Log browser console
        logBrowserConsole();

        // Attempt recovery
        recoveryManager.recoverFromAlert();
    }

    private String takeScreenshot(String name) {
        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            byte[] screenshot = ts.getScreenshotAs(OutputType.BYTES);

            String fileName = name + "_" + System.currentTimeMillis() + ".png";
            Path path = Paths.get("target/screenshots/" + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, screenshot);

            return path.toString();
        } catch (Exception e) {
            logger.error("Failed to take screenshot", e);
            return null;
        }
    }

    private void logBrowserConsole() {
        try {
            LogEntries logs = driver.manage().logs().get(LogType.BROWSER);
            if (!logs.getAll().isEmpty()) {
                logger.error("Browser console logs:");
                for (LogEntry log : logs) {
                    logger.error("  " + log.getMessage());
                }
            }
        } catch (Exception e) {
            logger.warn("Could not retrieve browser logs", e);
        }
    }

    private void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```

### Usage Example

```java
package tests;

import org.testng.annotations.*;
import framework.*;
import org.testng.Assert;
import com.aventstack.extentreports.*;

public class ExceptionFrameworkTest extends BaseTest {
    private ExceptionHandlingFramework exceptionFramework;
    private ExtentReports extent;

    @BeforeMethod
    public void setup() {
        exceptionFramework = new ExceptionHandlingFramework(driver);
    }

    @Test
    public void testWithExceptionHandling() {
        ExtentTest test = extent.createTest("Exception Handling Test");

        // Execute action with complete exception handling
        exceptionFramework.executeWithExceptionHandling(() -> {
            driver.get("https://example.com");
            driver.findElement(By.id("submit")).click();
            return null;
        }, "Click Submit Button", test);

        // Verify result
        String result = exceptionFramework.executeWithExceptionHandling(() -> {
            return driver.findElement(By.id("message")).getText();
        }, "Get Result Message", test);

        Assert.assertEquals(result, "Success");
    }
}
```

---

## Best Practices

### 1. Exception Handling Principles

```java
// DO: Use specific exceptions
throw new ElementNotFoundException("Login button not found", locator, "LoginPage");

// DON'T: Use generic exceptions
throw new Exception("Something went wrong");

// DO: Preserve exception chain
catch (IOException e) {
    throw new TestDataException("Failed to read test data", e);
}

// DON'T: Swallow exceptions
catch (Exception e) {
    // Empty catch block
}

// DO: Provide context
throw new ElementTimeoutException(
    "Submit button not clickable within 10 seconds", 10);

// DON'T: Throw exceptions without context
throw new TimeoutException();
```

### 2. Logging Best Practices

```java
// DO: Log with appropriate level
logger.error("Critical error occurred", e);
logger.warn("Retrying operation");
logger.info("Test step completed");
logger.debug("Element details: " + element.toString());

// DO: Include context in logs
logger.error("Failed to click element {} on page {}", locator, pageName);

// DO: Log exception chain
ExceptionLogger.logExceptionChain(e);
```

### 3. Recovery Best Practices

```java
// DO: Implement smart recovery
if (isRecoverableException(e)) {
    attemptRecovery();
    retryOperation();
} else {
    failFast(e);
}

// DO: Limit retry attempts
int maxRetries = 3;
// Prevent infinite loops

// DO: Use exponential backoff
long delay = initialDelay * Math.pow(2, attempt);
```

### 4. Framework Design Principles

- **Fail Fast**: Don't retry non-recoverable errors
- **Meaningful Messages**: Provide actionable error information
- **Proper Cleanup**: Always cleanup resources in finally blocks
- **Centralized Handling**: Use consistent exception handling patterns
- **Categorize Exceptions**: Group related exceptions by hierarchy

---

## Key Takeaways

1. **Exception Hierarchy**: Understanding Java and Selenium exception hierarchies is fundamental
2. **Custom Exceptions**: Create framework-specific exceptions for better error handling
3. **Try-Catch-Finally**: Use proper try-catch-finally blocks for resource management
4. **Retry Logic**: Implement smart retry mechanisms for flaky tests
5. **Logging**: Comprehensive logging aids in debugging and maintenance
6. **Reporting**: Integrate exceptions into test reports for visibility
7. **Recovery**: Implement recovery scenarios for transient failures
8. **Graceful Degradation**: Allow tests to continue even when non-critical operations fail
9. **Context**: Always provide context with exceptions
10. **Best Practices**: Follow exception handling best practices consistently

---

## Interview Questions

### Basic Level

1. **Q: What is the difference between checked and unchecked exceptions in Java?**
   - A: Checked exceptions must be caught or declared (e.g., IOException), while unchecked exceptions (RuntimeException and its subclasses) don't require explicit handling. In Selenium, most exceptions are unchecked (extend WebDriverException).

2. **Q: Name five common Selenium WebDriver exceptions.**
   - A: NoSuchElementException, StaleElementReferenceException, TimeoutException, ElementNotInteractableException, ElementClickInterceptedException.

3. **Q: What causes StaleElementReferenceException?**
   - A: Occurs when an element reference is no longer valid, typically after page refresh, DOM manipulation, or navigation.

### Intermediate Level

4. **Q: How do you implement retry logic for flaky tests in TestNG?**
   - A: Implement IRetryAnalyzer interface and override the retry() method. Apply it to tests using @Test(retryAnalyzer = RetryAnalyzer.class) or globally through IAnnotationTransformer.

5. **Q: What is the purpose of custom exceptions in test automation frameworks?**
   - A: Custom exceptions provide better context, enable specific error handling, improve debugging, categorize failures, and make frameworks more maintainable.

6. **Q: How do you handle ElementClickInterceptedException?**
   - A: Try these approaches: 1) Wait for overlay to disappear, 2) Scroll element into view, 3) Use JavaScript click, 4) Close blocking modals.

### Advanced Level

7. **Q: Design an exception handling strategy for a large-scale test automation framework.**
   - A: Implement: 1) Custom exception hierarchy, 2) Centralized exception handler, 3) Smart retry mechanism, 4) Recovery scenarios, 5) Comprehensive logging, 6) Screenshot capture, 7) Integration with reporting, 8) Graceful degradation.

8. **Q: How do you implement exponential backoff in retry logic?**
   - A: Use delay = initialDelay * Math.pow(2, attemptNumber). For example: 1st retry = 1s, 2nd = 2s, 3rd = 4s, etc.

9. **Q: What is exception propagation and why is it important?**
   - A: Exception propagation is how exceptions move up the call stack. It's important because: 1) Allows handling at appropriate level, 2) Enables context addition at each layer, 3) Supports separation of concerns, 4) Facilitates error recovery.

10. **Q: How do you decide whether to retry or fail fast when an exception occurs?**
    - A: Retry for: 1) Transient failures (StaleElement, Timeout), 2) Network issues, 3) Element loading delays. Fail fast for: 1) Configuration errors, 2) Test data issues, 3) Assertion failures, 4) Permanent element not found.

---

## Navigation

- [Previous: Day 41 - Utility Classes & Helper Methods](day41_utility_classes.md)
- [Next: Day 43 - Framework Integration & CI/CD](day43_framework_integration_cicd.md)
- [Week 6 Overview](README.md)
- [Course Home](../../README.md)
