# Day 13: Handling Pop-ups, Shadow DOM, and Advanced Scenarios

## Table of Contents
1. [Learning Objectives](#learning-objectives)
2. [Introduction](#introduction)
3. [Different Types of Pop-ups](#different-types-of-pop-ups)
4. [JavaScript Alerts Review](#javascript-alerts-review)
5. [Handling Modal Dialogs](#handling-modal-dialogs)
6. [Browser Notifications and Permissions](#browser-notifications-and-permissions)
7. [Cookie Consent Popups](#cookie-consent-popups)
8. [Shadow DOM in Detail](#shadow-dom-in-detail)
9. [Working with iFrames (Advanced)](#working-with-iframes-advanced)
10. [Handling Overlays and Spinners](#handling-overlays-and-spinners)
11. [CAPTCHA and reCAPTCHA](#captcha-and-recaptcha)
12. [Handling Secure/HTTPS Pages](#handling-securehttps-pages)
13. [Advanced Element State Handling](#advanced-element-state-handling)
14. [Best Practices](#best-practices)
15. [Practice Exercises](#practice-exercises)
16. [Interview Questions](#interview-questions)
17. [Key Takeaways](#key-takeaways)

---

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand and handle different types of pop-ups in web applications
- Work with JavaScript alerts, confirms, and prompts
- Handle modal dialogs including Bootstrap modals and custom implementations
- Access and interact with Shadow DOM elements
- Deal with nested and dynamic iFrames
- Handle browser notifications and permission popups
- Manage loading overlays and progress spinners
- Implement strategies for testing applications with CAPTCHA
- Handle SSL certificates and authentication dialogs
- Manage stale element references and detached DOM elements
- Apply best practices for handling advanced web scenarios

---

## Introduction

Modern web applications present various challenges beyond basic element interactions. You'll encounter pop-ups, modal dialogs, shadow DOM components, iframes, and other complex scenarios that require specialized handling techniques.

This lesson covers advanced scenarios you'll face in real-world automation projects, providing you with the knowledge and tools to handle even the most complex web applications.

### Why These Scenarios Matter

1. **Real-World Applications**: Modern web apps use modals, shadow DOM, and complex UI patterns
2. **Framework Components**: Popular frameworks (React, Angular, Vue) use advanced DOM structures
3. **User Experience**: Pop-ups and notifications are common UX patterns
4. **Security Features**: Authentication and CAPTCHA require special handling
5. **Performance Optimization**: Shadow DOM improves encapsulation and performance

---

## Different Types of Pop-ups

Pop-ups come in various forms, each requiring different handling approaches.

### Pop-up Types Overview

| Type | Origin | Handling Method |
|------|--------|----------------|
| JavaScript Alerts | Browser API | `Alert` interface |
| Modal Dialogs | HTML/CSS/JS | Regular WebDriver methods |
| Browser Notifications | Browser API | ChromeOptions/Capabilities |
| Cookie Consent | HTML/CSS/JS | Regular WebDriver methods |
| Chat Widgets | Third-party | iFrame or regular methods |
| File Upload Dialog | OS-level | SendKeys or Robot class |
| Basic Auth Dialog | Browser | URL credentials or capabilities |

### Pop-up Detection Strategy

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class PopupDetectionHelper {
    private WebDriver driver;
    private WebDriverWait wait;

    public PopupDetectionHelper(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Check if JavaScript alert is present
    public boolean isAlertPresent() {
        try {
            wait.until(ExpectedConditions.alertIsPresent());
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    // Check if modal dialog is present
    public boolean isModalPresent(By modalLocator) {
        try {
            WebElement modal = wait.until(
                ExpectedConditions.visibilityOfElementLocated(modalLocator)
            );
            return modal.isDisplayed();
        } catch (TimeoutException e) {
            return false;
        }
    }

    // Check if element is blocking interaction
    public boolean isElementBlocked(WebElement element) {
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            String script =
                "var elem = arguments[0];" +
                "var rect = elem.getBoundingClientRect();" +
                "var x = rect.left + rect.width / 2;" +
                "var y = rect.top + rect.height / 2;" +
                "var topElement = document.elementFromPoint(x, y);" +
                "return topElement !== elem && !elem.contains(topElement);";

            return (Boolean) js.executeScript(script, element);
        } catch (Exception e) {
            return false;
        }
    }

    // Wait for overlay to disappear
    public void waitForOverlayToDisappear(By overlayLocator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(overlayLocator));
    }
}
```

---

## JavaScript Alerts Review

JavaScript alerts are browser-level pop-ups that must be handled using the Alert interface.

### Types of JavaScript Alerts

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class AlertHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public AlertHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Handle simple alert
    public void handleSimpleAlert(boolean accept) {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Alert text: " + alert.getText());

            if (accept) {
                alert.accept();
            } else {
                alert.dismiss();
            }
        } catch (NoAlertPresentException e) {
            System.out.println("No alert present");
        }
    }

    // Handle confirm dialog
    public boolean handleConfirmAlert(boolean accept) {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            String alertText = alert.getText();
            System.out.println("Confirm text: " + alertText);

            if (accept) {
                alert.accept();
                return true;
            } else {
                alert.dismiss();
                return false;
            }
        } catch (NoAlertPresentException e) {
            System.out.println("No confirm dialog present");
            return false;
        }
    }

    // Handle prompt dialog
    public void handlePromptAlert(String inputText, boolean accept) {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Prompt text: " + alert.getText());

            if (inputText != null && !inputText.isEmpty()) {
                alert.sendKeys(inputText);
            }

            if (accept) {
                alert.accept();
            } else {
                alert.dismiss();
            }
        } catch (NoAlertPresentException e) {
            System.out.println("No prompt dialog present");
        }
    }

    // Get alert text without accepting/dismissing
    public String getAlertText() {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            return alert.getText();
        } catch (NoAlertPresentException e) {
            return null;
        }
    }

    // Handle unexpected alerts
    public void handleUnexpectedAlert() {
        try {
            Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();
            System.out.println("Unexpected alert: " + alertText);
            alert.accept();
        } catch (NoAlertPresentException e) {
            // No alert present, continue
        }
    }
}
```

### Complete Alert Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class AlertExamples {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        AlertHandler alertHandler = new AlertHandler(driver);

        try {
            driver.get("https://the-internet.herokuapp.com/javascript_alerts");

            // Example 1: Simple Alert
            driver.findElement(By.xpath("//button[text()='Click for JS Alert']")).click();
            alertHandler.handleSimpleAlert(true);
            Thread.sleep(1000);

            // Example 2: Confirm Dialog
            driver.findElement(By.xpath("//button[text()='Click for JS Confirm']")).click();
            boolean confirmed = alertHandler.handleConfirmAlert(true);
            System.out.println("User confirmed: " + confirmed);
            Thread.sleep(1000);

            // Example 3: Prompt Dialog
            driver.findElement(By.xpath("//button[text()='Click for JS Prompt']")).click();
            alertHandler.handlePromptAlert("Selenium Automation", true);
            Thread.sleep(1000);

            // Verify result
            String result = driver.findElement(By.id("result")).getText();
            System.out.println("Result: " + result);

        } finally {
            driver.quit();
        }
    }
}
```

---

## Handling Modal Dialogs

Modal dialogs are HTML elements that overlay the main content. Unlike JavaScript alerts, they're part of the DOM.

### Bootstrap Modal Example

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ModalDialogHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public ModalDialogHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Wait for modal to appear
    public WebElement waitForModalToAppear(By modalLocator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(modalLocator));
    }

    // Wait for modal to disappear
    public void waitForModalToDisappear(By modalLocator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(modalLocator));
    }

    // Close modal using close button
    public void closeModalByButton(By closeButtonLocator) {
        WebElement closeButton = wait.until(
            ExpectedConditions.elementToBeClickable(closeButtonLocator)
        );
        closeButton.click();

        // Wait for modal to fade out
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // Close modal by clicking backdrop
    public void closeModalByBackdrop(By modalLocator) {
        WebElement modal = driver.findElement(modalLocator);

        // Get modal position
        int modalX = modal.getLocation().getX();
        int modalY = modal.getLocation().getY();

        // Click outside modal (on backdrop)
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(
            "document.elementFromPoint(arguments[0], arguments[1]).click();",
            modalX - 10, modalY
        );
    }

    // Close modal using ESC key
    public void closeModalByEscape() {
        Actions actions = new Actions(driver);
        actions.sendKeys(Keys.ESCAPE).perform();
    }

    // Handle modal with form submission
    public void fillAndSubmitModalForm(By modalLocator,
                                       By inputLocator,
                                       String inputValue,
                                       By submitButtonLocator) {
        // Wait for modal
        waitForModalToAppear(modalLocator);

        // Fill form
        WebElement input = wait.until(
            ExpectedConditions.visibilityOfElementLocated(inputLocator)
        );
        input.clear();
        input.sendKeys(inputValue);

        // Submit
        WebElement submitButton = driver.findElement(submitButtonLocator);
        submitButton.click();

        // Wait for modal to close
        waitForModalToDisappear(modalLocator);
    }

    // Check if modal is displayed
    public boolean isModalDisplayed(By modalLocator) {
        try {
            WebElement modal = driver.findElement(modalLocator);
            return modal.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Get modal title
    public String getModalTitle(By titleLocator) {
        WebElement title = wait.until(
            ExpectedConditions.visibilityOfElementLocated(titleLocator)
        );
        return title.getText();
    }

    // Handle nested modals
    public void handleNestedModal(By parentModalLocator,
                                  By childModalLocator,
                                  By childCloseButtonLocator,
                                  By parentCloseButtonLocator) {
        // Wait for parent modal
        waitForModalToAppear(parentModalLocator);

        // Wait for child modal
        waitForModalToAppear(childModalLocator);

        // Close child modal first
        closeModalByButton(childCloseButtonLocator);
        waitForModalToDisappear(childModalLocator);

        // Then close parent modal
        closeModalByButton(parentCloseButtonLocator);
        waitForModalToDisappear(parentModalLocator);
    }
}
```

### Complete Bootstrap Modal Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class BootstrapModalExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        ModalDialogHandler modalHandler = new ModalDialogHandler(driver);

        try {
            // Navigate to page with Bootstrap modal
            driver.get("https://getbootstrap.com/docs/5.0/components/modal/");
            driver.manage().window().maximize();

            // Locators
            By launchButton = By.xpath("//button[@data-bs-target='#exampleModal']");
            By modalLocator = By.id("exampleModal");
            By modalTitle = By.className("modal-title");
            By closeButton = By.xpath("//button[@data-bs-dismiss='modal']");

            // Open modal
            driver.findElement(launchButton).click();
            Thread.sleep(500);

            // Wait for modal to appear
            modalHandler.waitForModalToAppear(modalLocator);

            // Verify modal is displayed
            boolean isDisplayed = modalHandler.isModalDisplayed(modalLocator);
            System.out.println("Modal displayed: " + isDisplayed);

            // Get modal title
            String title = modalHandler.getModalTitle(modalTitle);
            System.out.println("Modal title: " + title);

            // Close modal
            modalHandler.closeModalByButton(closeButton);

            // Verify modal is closed
            modalHandler.waitForModalToDisappear(modalLocator);
            System.out.println("Modal closed successfully");

        } finally {
            driver.quit();
        }
    }
}
```

### Custom Modal Dialog Example

```java
public class CustomModalHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public CustomModalHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Handle custom modal with overlay
    public void handleCustomModalWithOverlay(By overlayLocator,
                                            By modalLocator,
                                            By closeButtonLocator) {
        // Wait for overlay
        wait.until(ExpectedConditions.visibilityOfElementLocated(overlayLocator));

        // Wait for modal
        WebElement modal = wait.until(
            ExpectedConditions.visibilityOfElementLocated(modalLocator)
        );

        // Interact with modal
        System.out.println("Modal displayed: " + modal.isDisplayed());

        // Close modal
        WebElement closeButton = driver.findElement(closeButtonLocator);

        // Try JavaScript click if regular click fails
        try {
            closeButton.click();
        } catch (ElementClickInterceptedException e) {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            js.executeScript("arguments[0].click();", closeButton);
        }

        // Wait for overlay to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(overlayLocator));
    }

    // Handle modal with animation
    public void waitForModalAnimation(By modalLocator, String cssProperty,
                                     String expectedValue) {
        wait.until(driver -> {
            WebElement modal = driver.findElement(modalLocator);
            String actualValue = modal.getCssValue(cssProperty);
            return actualValue.equals(expectedValue);
        });
    }

    // Handle modal that loads content dynamically
    public void waitForModalContentToLoad(By modalLocator, By contentLocator) {
        // Wait for modal
        waitForModalToAppear(modalLocator);

        // Wait for content inside modal
        wait.until(ExpectedConditions.visibilityOfElementLocated(contentLocator));

        // Optionally wait for loading indicator to disappear
        By loadingIndicator = By.className("loading-spinner");
        wait.until(ExpectedConditions.invisibilityOfElementLocated(loadingIndicator));
    }

    private void waitForModalToAppear(By modalLocator) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(modalLocator));
    }
}
```

---

## Browser Notifications and Permissions

Browser notifications and permission dialogs require special handling through browser capabilities.

### Handling Browser Notifications

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;
import java.util.HashMap;
import java.util.Map;

public class BrowserNotificationHandler {

    // Chrome - Block notifications
    public static WebDriver getChromeWithBlockedNotifications() {
        ChromeOptions options = new ChromeOptions();

        // Method 1: Using preferences
        Map<String, Object> prefs = new HashMap<>();
        prefs.put("profile.default_content_setting_values.notifications", 2); // 2 = block
        options.setExperimentalOption("prefs", prefs);

        return new ChromeDriver(options);
    }

    // Chrome - Allow notifications
    public static WebDriver getChromeWithAllowedNotifications() {
        ChromeOptions options = new ChromeOptions();

        Map<String, Object> prefs = new HashMap<>();
        prefs.put("profile.default_content_setting_values.notifications", 1); // 1 = allow
        options.setExperimentalOption("prefs", prefs);

        return new ChromeDriver(options);
    }

    // Chrome - Block geolocation
    public static WebDriver getChromeWithBlockedGeolocation() {
        ChromeOptions options = new ChromeOptions();

        Map<String, Object> prefs = new HashMap<>();
        prefs.put("profile.default_content_setting_values.geolocation", 2);
        options.setExperimentalOption("prefs", prefs);

        return new ChromeDriver(options);
    }

    // Chrome - Allow geolocation with specific coordinates
    public static WebDriver getChromeWithMockedGeolocation(double latitude,
                                                           double longitude,
                                                           int accuracy) {
        ChromeOptions options = new ChromeOptions();

        Map<String, Object> prefs = new HashMap<>();
        prefs.put("profile.default_content_setting_values.geolocation", 1);
        options.setExperimentalOption("prefs", prefs);

        WebDriver driver = new ChromeDriver(options);

        // Set geolocation using Chrome DevTools
        Map<String, Object> coordinates = new HashMap<>();
        coordinates.put("latitude", latitude);
        coordinates.put("longitude", longitude);
        coordinates.put("accuracy", accuracy);

        ((ChromeDriver) driver).executeCdpCommand(
            "Emulation.setGeolocationOverride", coordinates
        );

        return driver;
    }

    // Firefox - Handle notifications
    public static WebDriver getFirefoxWithBlockedNotifications() {
        FirefoxOptions options = new FirefoxOptions();
        FirefoxProfile profile = new FirefoxProfile();

        // Block notifications
        profile.setPreference("permissions.default.desktop-notification", 2);

        // Block geolocation
        profile.setPreference("permissions.default.geo", 2);

        // Block camera
        profile.setPreference("permissions.default.camera", 2);

        // Block microphone
        profile.setPreference("permissions.default.microphone", 2);

        options.setProfile(profile);

        return new FirefoxDriver(options);
    }

    // Chrome - Block multiple permissions
    public static WebDriver getChromeWithBlockedPermissions() {
        ChromeOptions options = new ChromeOptions();

        Map<String, Object> prefs = new HashMap<>();

        // Block notifications
        prefs.put("profile.default_content_setting_values.notifications", 2);

        // Block geolocation
        prefs.put("profile.default_content_setting_values.geolocation", 2);

        // Block camera
        prefs.put("profile.default_content_setting_values.media_stream_camera", 2);

        // Block microphone
        prefs.put("profile.default_content_setting_values.media_stream_mic", 2);

        // Block pop-ups
        prefs.put("profile.default_content_setting_values.popups", 2);

        // Block automatic downloads
        prefs.put("profile.default_content_settings.popups", 0);
        prefs.put("download.prompt_for_download", false);

        options.setExperimentalOption("prefs", prefs);

        return new ChromeDriver(options);
    }
}
```

### Permission Dialog Example

```java
public class PermissionDialogExample {
    public static void main(String[] args) throws InterruptedException {
        // Example 1: Block all notifications
        WebDriver driver = BrowserNotificationHandler
            .getChromeWithBlockedNotifications();

        try {
            driver.get("https://www.bennish.net/web-notifications.html");
            driver.manage().window().maximize();

            // Try to trigger notification
            driver.findElement(By.id("enable")).click();
            Thread.sleep(2000);

            System.out.println("Notification blocked successfully");

        } finally {
            driver.quit();
        }

        // Example 2: Mock geolocation
        WebDriver driver2 = BrowserNotificationHandler
            .getChromeWithMockedGeolocation(37.7749, -122.4194, 100);

        try {
            driver2.get("https://www.where-am-i.co/");
            Thread.sleep(5000);

            String location = driver2.findElement(
                By.xpath("//div[@class='location']")
            ).getText();
            System.out.println("Mocked location: " + location);

        } finally {
            driver2.quit();
        }
    }
}
```

---

## Cookie Consent Popups

Cookie consent popups are HTML elements that can be handled like regular web elements.

### Cookie Consent Handler

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;

public class CookieConsentHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    // Common cookie consent button texts
    private static final List<String> ACCEPT_TEXTS = Arrays.asList(
        "Accept", "Accept All", "I Accept", "Accept Cookies",
        "OK", "Got it", "Agree", "Allow All", "I Agree"
    );

    private static final List<String> REJECT_TEXTS = Arrays.asList(
        "Reject", "Reject All", "Decline", "Decline All",
        "No Thanks", "Deny"
    );

    public CookieConsentHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Handle cookie consent popup
    public boolean handleCookieConsent(boolean accept) {
        try {
            // Common cookie consent locators
            By[] consentLocators = {
                By.id("cookie-consent"),
                By.className("cookie-banner"),
                By.className("cookie-consent"),
                By.xpath("//*[contains(@class, 'cookie')]"),
                By.xpath("//*[contains(@id, 'cookie')]")
            };

            for (By locator : consentLocators) {
                try {
                    WebElement consentBanner = wait.until(
                        ExpectedConditions.visibilityOfElementLocated(locator)
                    );

                    if (consentBanner.isDisplayed()) {
                        if (accept) {
                            clickAcceptButton(consentBanner);
                        } else {
                            clickRejectButton(consentBanner);
                        }
                        return true;
                    }
                } catch (TimeoutException e) {
                    continue;
                }
            }

            return false;
        } catch (Exception e) {
            System.out.println("Error handling cookie consent: " + e.getMessage());
            return false;
        }
    }

    // Click accept button
    private void clickAcceptButton(WebElement consentBanner) {
        for (String acceptText : ACCEPT_TEXTS) {
            try {
                WebElement button = consentBanner.findElement(
                    By.xpath(".//button[contains(text(), '" + acceptText + "')]")
                );
                button.click();
                System.out.println("Clicked accept button: " + acceptText);
                return;
            } catch (NoSuchElementException e) {
                continue;
            }
        }

        // Try generic button click
        try {
            WebElement button = consentBanner.findElement(By.tagName("button"));
            button.click();
            System.out.println("Clicked generic button");
        } catch (NoSuchElementException e) {
            System.out.println("No accept button found");
        }
    }

    // Click reject button
    private void clickRejectButton(WebElement consentBanner) {
        for (String rejectText : REJECT_TEXTS) {
            try {
                WebElement button = consentBanner.findElement(
                    By.xpath(".//button[contains(text(), '" + rejectText + "')]")
                );
                button.click();
                System.out.println("Clicked reject button: " + rejectText);
                return;
            } catch (NoSuchElementException e) {
                continue;
            }
        }

        System.out.println("No reject button found");
    }

    // Dismiss cookie consent by clicking close button
    public void dismissCookieConsent() {
        By[] closeButtonLocators = {
            By.className("close"),
            By.xpath("//button[@aria-label='Close']"),
            By.xpath("//button[contains(@class, 'close')]"),
            By.xpath("//span[@class='close']")
        };

        for (By locator : closeButtonLocators) {
            try {
                WebElement closeButton = driver.findElement(locator);
                closeButton.click();
                System.out.println("Dismissed cookie consent");
                return;
            } catch (NoSuchElementException e) {
                continue;
            }
        }
    }

    // Handle cookie consent using JavaScript
    public void removeCookieConsentByJS() {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        String script =
            "var elements = document.querySelectorAll(" +
            "'[class*=\"cookie\"], [id*=\"cookie\"]');" +
            "elements.forEach(function(element) {" +
            "  element.style.display = 'none';" +
            "});";

        js.executeScript(script);
        System.out.println("Removed cookie consent using JavaScript");
    }

    // Wait for cookie consent to disappear
    public void waitForCookieConsentToDisappear() {
        By consentLocator = By.xpath("//*[contains(@class, 'cookie')]");

        try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(consentLocator));
            System.out.println("Cookie consent disappeared");
        } catch (TimeoutException e) {
            System.out.println("Cookie consent still present");
        }
    }
}
```

### Cookie Consent Example

```java
public class CookieConsentExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        CookieConsentHandler cookieHandler = new CookieConsentHandler(driver);

        try {
            // Example 1: BBC website
            driver.get("https://www.bbc.com");
            driver.manage().window().maximize();

            // Handle cookie consent
            boolean handled = cookieHandler.handleCookieConsent(true);
            System.out.println("Cookie consent handled: " + handled);

            Thread.sleep(2000);

            // Example 2: Remove consent banner using JavaScript
            driver.get("https://www.example-with-cookies.com");
            Thread.sleep(2000);

            cookieHandler.removeCookieConsentByJS();
            Thread.sleep(2000);

        } finally {
            driver.quit();
        }
    }
}
```

---

## Shadow DOM in Detail

Shadow DOM provides encapsulation for web components, making their internal DOM structure separate from the main document.

### Understanding Shadow DOM

Shadow DOM creates a separate DOM tree that's attached to an element but isolated from the main document DOM.

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ShadowDOMHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public ShadowDOMHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Access shadow root
    public SearchContext getShadowRoot(WebElement shadowHost) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (SearchContext) js.executeScript(
            "return arguments[0].shadowRoot", shadowHost
        );
    }

    // Find element inside shadow DOM
    public WebElement findElementInShadowDOM(WebElement shadowHost, By locator) {
        SearchContext shadowRoot = getShadowRoot(shadowHost);
        return shadowRoot.findElement(locator);
    }

    // Find element in nested shadow DOM
    public WebElement findElementInNestedShadowDOM(WebElement outerShadowHost,
                                                   By innerHostLocator,
                                                   By targetLocator) {
        // Get outer shadow root
        SearchContext outerShadowRoot = getShadowRoot(outerShadowHost);

        // Find inner shadow host
        WebElement innerShadowHost = outerShadowRoot.findElement(innerHostLocator);

        // Get inner shadow root
        SearchContext innerShadowRoot = getShadowRoot(innerShadowHost);

        // Find target element
        return innerShadowRoot.findElement(targetLocator);
    }

    // Access shadow DOM using JavaScript
    public WebElement findElementInShadowDOMByJS(String shadowHostSelector,
                                                 String elementSelector) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        String script =
            "return document.querySelector(arguments[0])" +
            ".shadowRoot.querySelector(arguments[1])";

        return (WebElement) js.executeScript(script,
                                            shadowHostSelector,
                                            elementSelector);
    }

    // Access nested shadow DOM using JavaScript
    public WebElement findElementInNestedShadowDOMByJS(
            String outerShadowHostSelector,
            String innerShadowHostSelector,
            String elementSelector) {

        JavascriptExecutor js = (JavascriptExecutor) driver;

        String script =
            "return document.querySelector(arguments[0])" +
            ".shadowRoot.querySelector(arguments[1])" +
            ".shadowRoot.querySelector(arguments[2])";

        return (WebElement) js.executeScript(script,
                                            outerShadowHostSelector,
                                            innerShadowHostSelector,
                                            elementSelector);
    }

    // Get all elements from shadow DOM
    public List<WebElement> findElementsInShadowDOM(WebElement shadowHost,
                                                    By locator) {
        SearchContext shadowRoot = getShadowRoot(shadowHost);
        return shadowRoot.findElements(locator);
    }

    // Check if element has shadow root
    public boolean hasShadowRoot(WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        Object shadowRoot = js.executeScript(
            "return arguments[0].shadowRoot", element
        );
        return shadowRoot != null;
    }

    // Get shadow root mode (open or closed)
    public String getShadowRootMode(WebElement shadowHost) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (String) js.executeScript(
            "return arguments[0].shadowRoot ? 'open' : 'closed'",
            shadowHost
        );
    }

    // Interact with shadow DOM element
    public void interactWithShadowElement(WebElement shadowHost,
                                         By elementLocator,
                                         String action,
                                         String value) {
        WebElement element = findElementInShadowDOM(shadowHost, elementLocator);

        switch (action.toLowerCase()) {
            case "click":
                element.click();
                break;
            case "sendkeys":
                element.clear();
                element.sendKeys(value);
                break;
            case "gettext":
                System.out.println("Text: " + element.getText());
                break;
            default:
                System.out.println("Unknown action: " + action);
        }
    }
}
```

### Shadow DOM Examples

```java
public class ShadowDOMExamples {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        ShadowDOMHandler shadowHandler = new ShadowDOMHandler(driver);

        try {
            // Example 1: Chrome downloads page (has shadow DOM)
            driver.get("chrome://downloads/");
            Thread.sleep(2000);

            // Access shadow DOM
            WebElement shadowHost = driver.findElement(
                By.tagName("downloads-manager")
            );

            SearchContext shadowRoot = shadowHandler.getShadowRoot(shadowHost);
            WebElement toolbar = shadowRoot.findElement(
                By.id("toolbar")
            );

            System.out.println("Toolbar found in shadow DOM");

            // Example 2: Using JavaScript for shadow DOM access
            driver.get("https://books-pwakit.appspot.com/");
            Thread.sleep(2000);

            WebElement searchElement = shadowHandler.findElementInShadowDOMByJS(
                "book-app",
                "#input"
            );

            if (searchElement != null) {
                searchElement.sendKeys("Selenium");
                System.out.println("Text entered in shadow DOM element");
            }

            // Example 3: Nested shadow DOM
            // Assuming nested structure
            WebElement nestedElement = shadowHandler.findElementInNestedShadowDOMByJS(
                "book-app",
                "app-header",
                "#search"
            );

            if (nestedElement != null) {
                System.out.println("Nested shadow DOM element found");
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }
}
```

### Advanced Shadow DOM Techniques

```java
public class AdvancedShadowDOMTechniques {
    private WebDriver driver;
    private JavascriptExecutor js;

    public AdvancedShadowDOMTechniques(WebDriver driver) {
        this.driver = driver;
        this.js = (JavascriptExecutor) driver;
    }

    // Navigate through multiple shadow DOM levels
    public WebElement navigateShadowDOMPath(String... selectors) {
        StringBuilder script = new StringBuilder("return document");

        for (int i = 0; i < selectors.length - 1; i++) {
            script.append(".querySelector('").append(selectors[i]).append("')");
            script.append(".shadowRoot");
        }

        script.append(".querySelector('").append(selectors[selectors.length - 1])
              .append("')");

        return (WebElement) js.executeScript(script.toString());
    }

    // Get all shadow hosts on page
    public List<WebElement> getAllShadowHosts() {
        String script =
            "var allElements = document.querySelectorAll('*');" +
            "var shadowHosts = [];" +
            "allElements.forEach(function(element) {" +
            "  if (element.shadowRoot) {" +
            "    shadowHosts.push(element);" +
            "  }" +
            "});" +
            "return shadowHosts;";

        return (List<WebElement>) js.executeScript(script);
    }

    // Dump shadow DOM structure
    public void dumpShadowDOMStructure(WebElement shadowHost, int level) {
        String indent = "  ".repeat(level);
        System.out.println(indent + "Shadow Host: " + shadowHost.getTagName());

        SearchContext shadowRoot = (SearchContext) js.executeScript(
            "return arguments[0].shadowRoot", shadowHost
        );

        if (shadowRoot != null) {
            List<WebElement> children = shadowRoot.findElements(By.xpath(".//*"));

            for (WebElement child : children) {
                System.out.println(indent + "  - " + child.getTagName());

                if ((Boolean) js.executeScript(
                    "return arguments[0].shadowRoot != null", child)) {
                    dumpShadowDOMStructure(child, level + 1);
                }
            }
        }
    }

    // Wait for element in shadow DOM
    public WebElement waitForElementInShadowDOM(WebElement shadowHost,
                                               By locator,
                                               Duration timeout) {
        WebDriverWait wait = new WebDriverWait(driver, timeout);

        return wait.until(driver -> {
            try {
                SearchContext shadowRoot = (SearchContext) js.executeScript(
                    "return arguments[0].shadowRoot", shadowHost
                );
                WebElement element = shadowRoot.findElement(locator);
                return element.isDisplayed() ? element : null;
            } catch (Exception e) {
                return null;
            }
        });
    }

    // Example usage
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        AdvancedShadowDOMTechniques techniques =
            new AdvancedShadowDOMTechniques(driver);

        try {
            driver.get("https://example-with-shadow-dom.com");

            // Navigate complex shadow DOM path
            WebElement element = techniques.navigateShadowDOMPath(
                "app-root",
                "app-header",
                "search-box",
                "#search-input"
            );

            if (element != null) {
                element.sendKeys("Shadow DOM Test");
            }

            // Get all shadow hosts
            List<WebElement> shadowHosts = techniques.getAllShadowHosts();
            System.out.println("Found " + shadowHosts.size() + " shadow hosts");

        } finally {
            driver.quit();
        }
    }
}
```

---

## Working with iFrames (Advanced)

iFrames are embedded documents within a page that require context switching.

### Advanced iFrame Handling

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class AdvancediFrameHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public AdvancediFrameHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Switch to iframe by index
    public void switchToiFrameByIndex(int index) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(index));
        System.out.println("Switched to iframe at index: " + index);
    }

    // Switch to iframe by name or ID
    public void switchToiFrameByNameOrId(String nameOrId) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(nameOrId));
        System.out.println("Switched to iframe: " + nameOrId);
    }

    // Switch to iframe by WebElement
    public void switchToiFrameByElement(WebElement iframeElement) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(iframeElement));
        System.out.println("Switched to iframe element");
    }

    // Switch to iframe by locator
    public void switchToiFrameByLocator(By locator) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator));
        System.out.println("Switched to iframe by locator");
    }

    // Switch back to main content
    public void switchToDefaultContent() {
        driver.switchTo().defaultContent();
        System.out.println("Switched to default content");
    }

    // Switch to parent frame
    public void switchToParentFrame() {
        driver.switchTo().parentFrame();
        System.out.println("Switched to parent frame");
    }

    // Count total iframes on page
    public int getIframeCount() {
        List<WebElement> iframes = driver.findElements(By.tagName("iframe"));
        System.out.println("Total iframes: " + iframes.size());
        return iframes.size();
    }

    // Get iframe source URL
    public String getIframeSrc(WebElement iframe) {
        return iframe.getAttribute("src");
    }

    // Check if iframe is loaded
    public boolean isIframeLoaded(WebElement iframe) {
        try {
            driver.switchTo().frame(iframe);
            driver.switchTo().defaultContent();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Handle nested iframes
    public void handleNestedIframes(By outerIframeLocator, By innerIframeLocator) {
        // Switch to outer iframe
        switchToiFrameByLocator(outerIframeLocator);
        System.out.println("Switched to outer iframe");

        // Switch to inner iframe
        switchToiFrameByLocator(innerIframeLocator);
        System.out.println("Switched to inner iframe");
    }

    // Wait for iframe to load completely
    public void waitForIframeToLoad(By iframeLocator) {
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(iframeLocator));

        // Wait for document ready state
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });

        System.out.println("Iframe loaded completely");
    }

    // Find element across all iframes
    public WebElement findElementAcrossIframes(By locator) {
        // Try in main content first
        try {
            return driver.findElement(locator);
        } catch (NoSuchElementException e) {
            // Try in each iframe
            List<WebElement> iframes = driver.findElements(By.tagName("iframe"));

            for (int i = 0; i < iframes.size(); i++) {
                try {
                    driver.switchTo().frame(i);
                    WebElement element = driver.findElement(locator);
                    System.out.println("Element found in iframe " + i);
                    return element;
                } catch (NoSuchElementException ex) {
                    driver.switchTo().defaultContent();
                }
            }
        }

        throw new NoSuchElementException("Element not found in any iframe");
    }

    // Execute action in iframe and return to main content
    public void executeInIframe(By iframeLocator, Runnable action) {
        try {
            switchToiFrameByLocator(iframeLocator);
            action.run();
        } finally {
            switchToDefaultContent();
        }
    }
}
```

### Nested iFrame Example

```java
public class NestedIframeExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        AdvancediFrameHandler iframeHandler = new AdvancediFrameHandler(driver);

        try {
            // Navigate to page with nested iframes
            driver.get("https://the-internet.herokuapp.com/nested_frames");
            driver.manage().window().maximize();

            // Get iframe count
            int count = iframeHandler.getIframeCount();
            System.out.println("Total iframes: " + count);

            // Switch to top frame
            iframeHandler.switchToiFrameByNameOrId("frame-top");

            // Switch to middle frame
            iframeHandler.switchToiFrameByNameOrId("frame-middle");

            // Get text from middle frame
            String text = driver.findElement(By.id("content")).getText();
            System.out.println("Middle frame text: " + text);

            // Go back to main content
            iframeHandler.switchToDefaultContent();

            // Switch to bottom frame
            iframeHandler.switchToiFrameByNameOrId("frame-bottom");

            // Get text from bottom frame
            String bottomText = driver.findElement(By.tagName("body")).getText();
            System.out.println("Bottom frame text: " + bottomText);

            // Return to default content
            iframeHandler.switchToDefaultContent();

        } finally {
            driver.quit();
        }
    }
}
```

### Dynamic iFrame Handling

```java
public class DynamicIframeHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public DynamicIframeHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Wait for iframe to appear and switch
    public void waitAndSwitchToDynamicIframe(By iframeLocator) {
        // Wait for iframe to be present
        WebElement iframe = wait.until(
            ExpectedConditions.presenceOfElementLocated(iframeLocator)
        );

        // Wait for iframe to be available
        wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(iframe));

        // Wait for iframe content to load
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });

        System.out.println("Switched to dynamic iframe");
    }

    // Handle iframe that loads after AJAX call
    public void handleAjaxIframe(By triggerButtonLocator, By iframeLocator) {
        // Click button that loads iframe
        driver.findElement(triggerButtonLocator).click();

        // Wait for iframe to appear
        waitAndSwitchToDynamicIframe(iframeLocator);
    }

    // Handle iframe with changing src
    public void waitForIframeWithSpecificSrc(String expectedSrc) {
        wait.until(driver -> {
            List<WebElement> iframes = driver.findElements(By.tagName("iframe"));
            for (WebElement iframe : iframes) {
                String src = iframe.getAttribute("src");
                if (src != null && src.contains(expectedSrc)) {
                    driver.switchTo().frame(iframe);
                    return true;
                }
            }
            return false;
        });
    }

    // Re-establish iframe context after page refresh
    public void reEstablishIframeContext(By iframeLocator) {
        try {
            // Check if still in iframe context
            driver.findElement(By.tagName("body"));
        } catch (NoSuchFrameException e) {
            // Switch back to iframe
            driver.switchTo().defaultContent();
            waitAndSwitchToDynamicIframe(iframeLocator);
        }
    }
}
```

---

## Handling Overlays and Spinners

Loading overlays and spinners can block element interactions and need special handling.

### Overlay and Spinner Handler

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class OverlaySpinnerHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public OverlaySpinnerHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    // Wait for loading overlay to disappear
    public void waitForLoadingOverlayToDisappear() {
        By[] overlayLocators = {
            By.className("loading-overlay"),
            By.className("overlay"),
            By.id("loading"),
            By.xpath("//*[contains(@class, 'loading')]"),
            By.xpath("//*[contains(@class, 'spinner')]")
        };

        for (By locator : overlayLocators) {
            try {
                wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
                System.out.println("Loading overlay disappeared");
                return;
            } catch (TimeoutException e) {
                continue;
            }
        }
    }

    // Wait for specific overlay to disappear
    public void waitForOverlayToDisappear(By overlayLocator) {
        try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(overlayLocator));
            System.out.println("Overlay disappeared");
        } catch (TimeoutException e) {
            System.out.println("Timeout waiting for overlay to disappear");
        }
    }

    // Wait for spinner to disappear
    public void waitForSpinnerToDisappear(By spinnerLocator) {
        try {
            // First wait for spinner to appear
            wait.until(ExpectedConditions.presenceOfElementLocated(spinnerLocator));

            // Then wait for it to disappear
            wait.until(ExpectedConditions.invisibilityOfElementLocated(spinnerLocator));
            System.out.println("Spinner disappeared");
        } catch (TimeoutException e) {
            System.out.println("Spinner handling completed");
        }
    }

    // Wait for page to be fully loaded (no overlays/spinners)
    public void waitForPageToBeFullyLoaded() {
        // Wait for document ready state
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });

        // Wait for jQuery to complete (if present)
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            try {
                return (Boolean) js.executeScript("return jQuery.active == 0");
            } catch (Exception e) {
                return true; // jQuery not present
            }
        });

        // Wait for common loading indicators to disappear
        waitForLoadingOverlayToDisappear();

        System.out.println("Page fully loaded");
    }

    // Check if element is blocked by overlay
    public boolean isElementBlockedByOverlay(WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        String script =
            "var elem = arguments[0];" +
            "var rect = elem.getBoundingClientRect();" +
            "var x = rect.left + rect.width / 2;" +
            "var y = rect.top + rect.height / 2;" +
            "var topElement = document.elementFromPoint(x, y);" +
            "return topElement !== elem && !elem.contains(topElement);";

        return (Boolean) js.executeScript(script, element);
    }

    // Wait until element is not blocked by overlay
    public void waitUntilElementIsNotBlocked(WebElement element) {
        wait.until(driver -> !isElementBlockedByOverlay(element));
        System.out.println("Element is no longer blocked");
    }

    // Remove overlay using JavaScript (last resort)
    public void removeOverlayByJS() {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        String script =
            "var overlays = document.querySelectorAll(" +
            "'.loading-overlay, .overlay, .spinner, [class*=\"loading\"]');" +
            "overlays.forEach(function(overlay) {" +
            "  overlay.style.display = 'none';" +
            "  overlay.remove();" +
            "});";

        js.executeScript(script);
        System.out.println("Overlays removed using JavaScript");
    }

    // Wait with custom conditions for overlay
    public void waitForCustomOverlayCondition(By overlayLocator,
                                             String cssProperty,
                                             String expectedValue) {
        wait.until(driver -> {
            try {
                WebElement overlay = driver.findElement(overlayLocator);
                String actualValue = overlay.getCssValue(cssProperty);
                return actualValue.equals(expectedValue);
            } catch (NoSuchElementException e) {
                return true; // Overlay not present
            }
        });
    }

    // Smart wait that handles both overlays and spinners
    public void smartWait() {
        try {
            // Wait for document ready
            waitForDocumentReady();

            // Wait for overlays
            waitForLoadingOverlayToDisappear();

            // Additional wait for stability
            Thread.sleep(500);
        } catch (Exception e) {
            System.out.println("Smart wait completed with exception: " + e.getMessage());
        }
    }

    private void waitForDocumentReady() {
        wait.until(driver -> {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return js.executeScript("return document.readyState").equals("complete");
        });
    }
}
```

### Overlay Handling Example

```java
public class OverlayHandlingExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        OverlaySpinnerHandler overlayHandler = new OverlaySpinnerHandler(driver);

        try {
            // Navigate to page with loading overlay
            driver.get("https://example-with-overlay.com");
            driver.manage().window().maximize();

            // Wait for initial page load
            overlayHandler.waitForPageToBeFullyLoaded();

            // Click button that triggers loading overlay
            WebElement button = driver.findElement(By.id("load-data"));
            button.click();

            // Wait for loading overlay to disappear
            By overlayLocator = By.className("loading-overlay");
            overlayHandler.waitForOverlayToDisappear(overlayLocator);

            // Now interact with element
            WebElement dataElement = driver.findElement(By.id("data-container"));
            System.out.println("Data: " + dataElement.getText());

            // Example with spinner
            driver.findElement(By.id("fetch-more")).click();

            By spinnerLocator = By.className("spinner");
            overlayHandler.waitForSpinnerToDisappear(spinnerLocator);

            System.out.println("More data loaded");

        } finally {
            driver.quit();
        }
    }
}
```

---

## CAPTCHA and reCAPTCHA

CAPTCHA is designed to prevent automation, making it challenging for Selenium testing.

### Understanding CAPTCHA Challenges

```java
public class CAPTCHAHandlingStrategies {

    /*
     * Important Note: Selenium CANNOT and SHOULD NOT solve CAPTCHA.
     * CAPTCHA exists to prevent automation. This section covers
     * strategies for testing applications that have CAPTCHA.
     */

    // Strategy 1: Disable CAPTCHA in test environment
    public static void strategyDisableCaptcha() {
        System.out.println("Strategy 1: Disable CAPTCHA in Test Environment");
        System.out.println("- Work with developers to disable CAPTCHA in test/dev environments");
        System.out.println("- Use environment variables or configuration flags");
        System.out.println("- Example: CAPTCHA_ENABLED=false in test environment");
    }

    // Strategy 2: Use test CAPTCHA keys
    public static void strategyUsehome() {
        System.out.println("\nStrategy 2: Use Test CAPTCHA Keys");
        System.out.println("- reCAPTCHA provides test keys that always pass");
        System.out.println("- Site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI");
        System.out.println("- Secret key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe");
    }

    // Strategy 3: Skip CAPTCHA pages
    public static void strategySkipCaptcha() {
        System.out.println("\nStrategy 3: Skip CAPTCHA Pages");
        System.out.println("- Use cookies/tokens to bypass CAPTCHA");
        System.out.println("- Pre-authenticate and use session");
        System.out.println("- Test functionality after CAPTCHA manually");
    }

    // Strategy 4: Mock CAPTCHA response
    public static void strategyMockCaptcha() {
        System.out.println("\nStrategy 4: Mock CAPTCHA Response");
        System.out.println("- Intercept CAPTCHA verification requests");
        System.out.println("- Return mock success responses");
        System.out.println("- Use tools like BrowserMob Proxy");
    }

    // Detect CAPTCHA presence
    public static boolean detectCaptchaPresence(WebDriver driver) {
        String[] captchaIndicators = {
            "iframe[src*='recaptcha']",
            "iframe[src*='hcaptcha']",
            "div[class*='g-recaptcha']",
            "div[class*='h-captcha']",
            "#captcha",
            ".captcha"
        };

        for (String selector : captchaIndicators) {
            try {
                List<WebElement> elements = driver.findElements(
                    By.cssSelector(selector)
                );
                if (!elements.isEmpty()) {
                    System.out.println("CAPTCHA detected: " + selector);
                    return true;
                }
            } catch (Exception e) {
                continue;
            }
        }

        return false;
    }

    // Example: Bypass using cookies
    public static void bypassUsingCookies(WebDriver driver, Cookie authCookie) {
        // Navigate to domain first
        driver.get("https://example.com");

        // Add authentication cookie
        driver.manage().addCookie(authCookie);

        // Refresh to apply cookie
        driver.navigate().refresh();

        System.out.println("Bypassed CAPTCHA using pre-authenticated cookie");
    }

    // Example: Use session after manual CAPTCHA solve
    public static void manualCaptchaThenAutomate() {
        System.out.println("\nManual CAPTCHA + Automation Strategy:");
        System.out.println("1. Launch browser manually");
        System.out.println("2. Navigate to login page");
        System.out.println("3. Manually solve CAPTCHA and login");
        System.out.println("4. Extract session cookies");
        System.out.println("5. Use cookies in automated tests");
    }

    public static void main(String[] args) {
        strategyDisableCaptcha();
        strategyUseTestKeys();
        strategySkipCaptcha();
        strategyMockCaptcha();
        manualCaptchaThenAutomate();

        System.out.println("\n=== Remember ===");
        System.out.println("- Never try to solve CAPTCHA programmatically");
        System.out.println("- Work with development team for test strategies");
        System.out.println("- Use test environments without CAPTCHA");
        System.out.println("- Focus on testing actual application functionality");
    }
}
```

### Cookie-Based CAPTCHA Bypass Example

```java
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.Set;

public class CookieBasedBypass {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();

        try {
            // Step 1: Manually solve CAPTCHA (one-time setup)
            driver.get("https://example.com/login");

            System.out.println("Please solve CAPTCHA and login manually...");
            System.out.println("Press Enter after you've logged in...");
            System.in.read();

            // Step 2: Extract cookies after successful login
            Set<Cookie> cookies = driver.manage().getCookies();
            System.out.println("Extracted cookies:");
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName() + " = " + cookie.getValue());
            }

            // Step 3: In subsequent test runs, use these cookies
            driver.quit();
            driver = new ChromeDriver();

            // Navigate to domain
            driver.get("https://example.com");

            // Add saved cookies
            for (Cookie cookie : cookies) {
                driver.manage().addCookie(cookie);
            }

            // Refresh to apply cookies
            driver.navigate().refresh();

            System.out.println("Logged in using saved cookies, bypassing CAPTCHA");

            // Continue with test automation
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

## Handling Secure/HTTPS Pages

SSL certificates and authentication dialogs require special handling techniques.

### SSL Certificate Handler

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.remote.CapabilityType;

public class SSLCertificateHandler {

    // Chrome - Accept insecure certificates
    public static WebDriver getChromeWithAcceptedInsecureCerts() {
        ChromeOptions options = new ChromeOptions();

        // Accept insecure certificates
        options.setAcceptInsecureCerts(true);

        // Additional arguments for SSL
        options.addArguments("--ignore-certificate-errors");
        options.addArguments("--ignore-ssl-errors");
        options.addArguments("--ignore-certificate-errors-spki-list");

        return new ChromeDriver(options);
    }

    // Firefox - Accept insecure certificates
    public static WebDriver getFirefoxWithAcceptedInsecureCerts() {
        FirefoxOptions options = new FirefoxOptions();

        // Accept insecure certificates
        options.setAcceptInsecureCerts(true);

        FirefoxProfile profile = new FirefoxProfile();
        profile.setAcceptUntrustedCertificates(true);
        profile.setAssumeUntrustedCertificateIssuer(false);

        options.setProfile(profile);

        return new FirefoxDriver(options);
    }

    // Example usage
    public static void main(String[] args) {
        // Test with Chrome
        WebDriver driver = getChromeWithAcceptedInsecureCerts();

        try {
            driver.get("https://self-signed.badssl.com/");
            System.out.println("Page title: " + driver.getTitle());
            System.out.println("Successfully handled SSL certificate");
        } finally {
            driver.quit();
        }
    }
}
```

### Basic Authentication Handler

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class BasicAuthenticationHandler {

    // Method 1: Pass credentials in URL
    public static void basicAuthViaURL(WebDriver driver,
                                      String username,
                                      String password,
                                      String url) {
        // Format: https://username:password@domain.com
        String urlWithAuth = url.replaceFirst("://", "://" + username + ":" + password + "@");
        driver.get(urlWithAuth);
        System.out.println("Authenticated using URL credentials");
    }

    // Method 2: Using Chrome DevTools Protocol (CDP)
    public static WebDriver getChromeWithBasicAuth(String username, String password) {
        ChromeOptions options = new ChromeOptions();
        ChromeDriver driver = new ChromeDriver(options);

        // Create authorization header
        String auth = username + ":" + password;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

        Map<String, Object> headers = new HashMap<>();
        headers.put("Authorization", "Basic " + encodedAuth);

        // This would require CDP implementation
        // For simplicity, we use URL method

        return driver;
    }

    // Example usage
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        try {
            // Example 1: Basic auth via URL
            String username = "admin";
            String password = "admin";
            String url = "https://the-internet.herokuapp.com/basic_auth";

            basicAuthViaURL(driver, username, password, url);

            // Verify authentication
            String pageSource = driver.getPageSource();
            if (pageSource.contains("Congratulations")) {
                System.out.println("Basic authentication successful");
            }

        } finally {
            driver.quit();
        }
    }
}
```

### NTLM Authentication Example

```java
public class NTLMAuthenticationHandler {

    /*
     * NTLM Authentication is complex and typically requires:
     * 1. Browser configuration
     * 2. Network-level setup
     * 3. AutoIt or similar tools for Windows dialogs
     */

    public static void handleNTLMAuth() {
        System.out.println("NTLM Authentication Strategies:");
        System.out.println("\n1. Configure Browser Profile:");
        System.out.println("   - Pre-configure Firefox/Chrome profile with auth");

        System.out.println("\n2. Use AutoIt (Windows):");
        System.out.println("   - AutoIt script to handle Windows security dialog");
        System.out.println("   - Example: WinWaitActive('Windows Security')");

        System.out.println("\n3. Use Browser Extensions:");
        System.out.println("   - Create extension that handles NTLM");

        System.out.println("\n4. Network Configuration:");
        System.out.println("   - Configure system to pass credentials automatically");

        System.out.println("\n5. Proxy Solution:");
        System.out.println("   - Use authenticating proxy like CNTLM");
    }

    // Example: Using browser arguments for Windows authentication
    public static WebDriver getChromeForWindowsAuth() {
        ChromeOptions options = new ChromeOptions();

        // Windows integrated authentication
        options.addArguments("--auth-server-whitelist=*.example.com");
        options.addArguments("--auth-negotiate-delegate-whitelist=*.example.com");

        return new ChromeDriver(options);
    }

    public static void main(String[] args) {
        handleNTLMAuth();
    }
}
```

---

## Advanced Element State Handling

Managing stale elements and dynamic DOM changes is crucial for robust test automation.

### Stale Element Handler

```java
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.function.Function;

public class StaleElementHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public StaleElementHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Retry mechanism for stale elements
    public WebElement findElementWithRetry(By locator, int maxRetries) {
        int attempts = 0;

        while (attempts < maxRetries) {
            try {
                WebElement element = driver.findElement(locator);
                // Try to interact to verify it's not stale
                element.isDisplayed();
                return element;
            } catch (StaleElementReferenceException e) {
                attempts++;
                System.out.println("Stale element, retry attempt: " + attempts);

                if (attempts >= maxRetries) {
                    throw e;
                }

                try {
                    Thread.sleep(500);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        throw new NoSuchElementException("Element not found after retries");
    }

    // Safe click with stale element handling
    public void safeClick(By locator) {
        int maxAttempts = 3;
        int attempts = 0;

        while (attempts < maxAttempts) {
            try {
                WebElement element = wait.until(
                    ExpectedConditions.elementToBeClickable(locator)
                );
                element.click();
                return;
            } catch (StaleElementReferenceException e) {
                attempts++;
                System.out.println("Stale element during click, retrying...");
            }
        }

        throw new RuntimeException("Failed to click element after " + maxAttempts + " attempts");
    }

    // Safe sendKeys with stale element handling
    public void safeSendKeys(By locator, String text) {
        int maxAttempts = 3;
        int attempts = 0;

        while (attempts < maxAttempts) {
            try {
                WebElement element = wait.until(
                    ExpectedConditions.visibilityOfElementLocated(locator)
                );
                element.clear();
                element.sendKeys(text);
                return;
            } catch (StaleElementReferenceException e) {
                attempts++;
                System.out.println("Stale element during sendKeys, retrying...");
            }
        }

        throw new RuntimeException("Failed to send keys after " + maxAttempts + " attempts");
    }

    // Safe getText with stale element handling
    public String safeGetText(By locator) {
        int maxAttempts = 3;
        int attempts = 0;

        while (attempts < maxAttempts) {
            try {
                WebElement element = wait.until(
                    ExpectedConditions.visibilityOfElementLocated(locator)
                );
                return element.getText();
            } catch (StaleElementReferenceException e) {
                attempts++;
                System.out.println("Stale element during getText, retrying...");
            }
        }

        throw new RuntimeException("Failed to get text after " + maxAttempts + " attempts");
    }

    // Wait for element to be stable (not changing)
    public WebElement waitForElementToBeStable(By locator) {
        return wait.until(new Function<WebDriver, WebElement>() {
            private String previousText = null;
            private int stableCount = 0;

            @Override
            public WebElement apply(WebDriver driver) {
                try {
                    WebElement element = driver.findElement(locator);
                    String currentText = element.getText();

                    if (currentText.equals(previousText)) {
                        stableCount++;
                        if (stableCount >= 3) { // Stable for 3 checks
                            return element;
                        }
                    } else {
                        stableCount = 0;
                        previousText = currentText;
                    }

                    try {
                        Thread.sleep(200);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }

                    return null;
                } catch (StaleElementReferenceException e) {
                    return null;
                }
            }
        });
    }

    // Re-find element after page change
    public WebElement refindElement(WebElement staleElement, By locator) {
        try {
            // Try to use the stale element first
            staleElement.isDisplayed();
            return staleElement;
        } catch (StaleElementReferenceException e) {
            // Element is stale, find it again
            System.out.println("Element is stale, refinding...");
            return driver.findElement(locator);
        }
    }

    // Execute action with automatic retry on stale element
    public <T> T executeWithRetry(Function<WebDriver, T> action, int maxRetries) {
        int attempts = 0;

        while (attempts < maxRetries) {
            try {
                return action.apply(driver);
            } catch (StaleElementReferenceException e) {
                attempts++;
                System.out.println("Stale element exception, retry: " + attempts);

                if (attempts >= maxRetries) {
                    throw e;
                }

                try {
                    Thread.sleep(500);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }

        throw new RuntimeException("Action failed after " + maxRetries + " retries");
    }
}
```

### Detached DOM Element Handler

```java
public class DetachedDOMElementHandler {
    private WebDriver driver;
    private WebDriverWait wait;

    public DetachedDOMElementHandler(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Check if element is attached to DOM
    public boolean isElementAttachedToDOM(WebElement element) {
        try {
            JavascriptExecutor js = (JavascriptExecutor) driver;
            return (Boolean) js.executeScript(
                "return document.contains(arguments[0]);", element
            );
        } catch (Exception e) {
            return false;
        }
    }

    // Wait for element to be attached to DOM
    public WebElement waitForElementToBeAttached(final WebElement element) {
        return wait.until(driver -> {
            if (isElementAttachedToDOM(element)) {
                return element;
            }
            return null;
        });
    }

    // Find and ensure element is attached
    public WebElement findAttachedElement(By locator) {
        return wait.until(driver -> {
            WebElement element = driver.findElement(locator);
            if (isElementAttachedToDOM(element)) {
                return element;
            }
            return null;
        });
    }

    // Handle dynamic ID elements
    public WebElement findElementWithDynamicId(String idPrefix) {
        By locator = By.xpath("//*[starts-with(@id, '" + idPrefix + "')]");
        return driver.findElement(locator);
    }

    // Store element attributes instead of reference
    public Map<String, String> getElementAttributes(WebElement element) {
        Map<String, String> attributes = new HashMap<>();

        JavascriptExecutor js = (JavascriptExecutor) driver;
        String script =
            "var items = {};" +
            "for (var i = 0; i < arguments[0].attributes.length; i++) {" +
            "    items[arguments[0].attributes[i].name] = " +
            "        arguments[0].attributes[i].value;" +
            "}" +
            "return items;";

        return (Map<String, String>) js.executeScript(script, element);
    }

    // Recreate locator from stored attributes
    public By createLocatorFromAttributes(Map<String, String> attributes) {
        if (attributes.containsKey("id")) {
            return By.id(attributes.get("id"));
        } else if (attributes.containsKey("name")) {
            return By.name(attributes.get("name"));
        } else if (attributes.containsKey("class")) {
            return By.className(attributes.get("class"));
        }

        // Fallback to XPath
        StringBuilder xpath = new StringBuilder("//*");
        for (Map.Entry<String, String> entry : attributes.entrySet()) {
            xpath.append("[@").append(entry.getKey())
                 .append("='").append(entry.getValue()).append("']");
        }

        return By.xpath(xpath.toString());
    }
}
```

### Complete Stale Element Example

```java
public class StaleElementExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        StaleElementHandler staleHandler = new StaleElementHandler(driver);

        try {
            driver.get("https://the-internet.herokuapp.com/dynamic_content");
            driver.manage().window().maximize();

            // Get initial element
            By contentLocator = By.xpath("//div[@class='large-10 columns']");

            // Get initial text
            String initialText = staleHandler.safeGetText(contentLocator);
            System.out.println("Initial text: " + initialText);

            // Click refresh button (causes DOM change)
            driver.findElement(By.linkText("click here")).click();
            Thread.sleep(2000);

            // Try to get text again (element would be stale without handling)
            String newText = staleHandler.safeGetText(contentLocator);
            System.out.println("New text: " + newText);

            System.out.println("Stale element handled successfully");

        } finally {
            driver.quit();
        }
    }
}
```

---

## Best Practices

### 1. Pop-up Handling Best Practices

```java
public class PopupBestPractices {

    // Always check for unexpected alerts
    public void handleUnexpectedAlerts(WebDriver driver) {
        try {
            Alert alert = driver.switchTo().alert();
            System.out.println("Unexpected alert: " + alert.getText());
            alert.accept();
        } catch (NoAlertPresentException e) {
            // No alert present
        }
    }

    // Use explicit waits for alerts
    public void waitForAlert(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.alertIsPresent());
    }

    // Create reusable alert handler
    private AlertHandler alertHandler;

    public void initializeHandlers(WebDriver driver) {
        this.alertHandler = new AlertHandler(driver);
    }
}
```

### 2. Modal Dialog Best Practices

```java
public class ModalBestPractices {

    // Always wait for modal to be visible before interaction
    public void waitForModal(WebDriver driver, By modalLocator) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(modalLocator));
    }

    // Always verify modal is closed
    public void verifyModalClosed(WebDriver driver, By modalLocator) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.invisibilityOfElementLocated(modalLocator));
    }

    // Handle modal animations
    public void waitForModalAnimation(WebDriver driver) throws InterruptedException {
        Thread.sleep(500); // Wait for CSS animation
    }
}
```

### 3. Shadow DOM Best Practices

```java
public class ShadowDOMBestPractices {

    // Cache shadow roots for performance
    private Map<String, SearchContext> shadowRootCache = new HashMap<>();

    public SearchContext getCachedShadowRoot(WebDriver driver,
                                            String shadowHostSelector) {
        if (shadowRootCache.containsKey(shadowHostSelector)) {
            return shadowRootCache.get(shadowHostSelector);
        }

        WebElement shadowHost = driver.findElement(By.cssSelector(shadowHostSelector));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        SearchContext shadowRoot = (SearchContext) js.executeScript(
            "return arguments[0].shadowRoot", shadowHost
        );

        shadowRootCache.put(shadowHostSelector, shadowRoot);
        return shadowRoot;
    }

    // Clear cache when navigating to new page
    public void clearShadowRootCache() {
        shadowRootCache.clear();
    }
}
```

### 4. iFrame Best Practices

```java
public class iFrameBestPractices {

    // Always switch back to default content
    public void safeIframeOperation(WebDriver driver, By iframeLocator, Runnable action) {
        try {
            driver.switchTo().frame(driver.findElement(iframeLocator));
            action.run();
        } finally {
            driver.switchTo().defaultContent();
        }
    }

    // Track iframe context
    private Stack<String> iframeStack = new Stack<>();

    public void switchToiFrame(WebDriver driver, String frameNameOrId) {
        driver.switchTo().frame(frameNameOrId);
        iframeStack.push(frameNameOrId);
    }

    public void switchBackToParent(WebDriver driver) {
        if (!iframeStack.isEmpty()) {
            iframeStack.pop();
            driver.switchTo().parentFrame();
        }
    }
}
```

### 5. Stale Element Best Practices

```java
public class StaleElementBestPractices {

    // Use By locators instead of WebElement references
    private By elementLocator;

    public void storeLocator(By locator) {
        this.elementLocator = locator;
    }

    public WebElement getElement(WebDriver driver) {
        return driver.findElement(elementLocator);
    }

    // Avoid storing WebElement references
    // BAD: WebElement element = driver.findElement(By.id("btn"));
    // GOOD: By btnLocator = By.id("btn");

    // Re-find elements after DOM manipulation
    public void refreshElementReference(WebDriver driver, By locator) {
        // Don't reuse old reference
        WebElement element = driver.findElement(locator);
    }
}
```

### 6. General Best Practices

```java
public class GeneralAdvancedBestPractices {

    // 1. Use Page Object Model for complex scenarios
    public class ComplexPage {
        private WebDriver driver;
        private ModalDialogHandler modalHandler;
        private OverlaySpinnerHandler overlayHandler;

        public ComplexPage(WebDriver driver) {
            this.driver = driver;
            this.modalHandler = new ModalDialogHandler(driver);
            this.overlayHandler = new OverlaySpinnerHandler(driver);
        }
    }

    // 2. Create utility classes for common operations
    public class WebDriverUtils {
        public static void smartWait(WebDriver driver) {
            // Wait for document ready
            // Wait for jQuery
            // Wait for overlays
        }
    }

    // 3. Log all complex operations
    public void complexOperation(WebDriver driver) {
        System.out.println("[INFO] Starting complex operation");
        try {
            // Operation code
            System.out.println("[SUCCESS] Complex operation completed");
        } catch (Exception e) {
            System.out.println("[ERROR] Complex operation failed: " + e.getMessage());
            throw e;
        }
    }

    // 4. Use try-finally for cleanup
    public void operationWithCleanup(WebDriver driver) {
        try {
            // Operations
        } finally {
            // Cleanup: close modals, switch to default content, etc.
            driver.switchTo().defaultContent();
        }
    }

    // 5. Handle timeouts gracefully
    public WebElement findElementWithTimeout(WebDriver driver, By locator, int seconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(seconds));
            return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        } catch (TimeoutException e) {
            System.out.println("Element not found within " + seconds + " seconds");
            return null;
        }
    }
}
```

---

## Practice Exercises

### Exercise 1: Modal Dialog Master

Create a comprehensive modal handling utility that can:
- Detect modal presence
- Wait for modal to appear/disappear
- Handle nested modals
- Close modals using different methods (button, escape, backdrop)

```java
public class ModalDialogExercise {
    public static void main(String[] args) {
        // Your implementation here
        WebDriver driver = new ChromeDriver();

        try {
            // Navigate to a page with modals
            // Implement modal detection
            // Handle different types of modals
            // Test nested modals

        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 2: Shadow DOM Explorer

Build a utility that:
- Finds all shadow hosts on a page
- Maps the shadow DOM structure
- Provides methods to access nested shadow DOM elements
- Handles both open and closed shadow roots

```java
public class ShadowDOMExercise {
    public static void main(String[] args) {
        // Your implementation here
        WebDriver driver = new ChromeDriver();

        try {
            // Navigate to page with shadow DOM
            // Find all shadow hosts
            // Map the structure
            // Access nested shadow DOM elements

        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 3: Smart Wait Framework

Create an intelligent wait framework that:
- Waits for document ready state
- Waits for jQuery/Ajax completion
- Handles loading overlays automatically
- Detects and waits for spinners to disappear
- Handles stale elements automatically

```java
public class SmartWaitExercise {
    public static void main(String[] args) {
        // Your implementation here
        WebDriver driver = new ChromeDriver();

        try {
            // Implement smart wait logic
            // Test with dynamic content
            // Handle various loading indicators

        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 4: iFrame Navigator

Build an iFrame navigation system that:
- Tracks current iframe context
- Provides methods to navigate iframe hierarchy
- Automatically finds elements across all iframes
- Maintains a stack of iframe contexts

```java
public class iFrameNavigatorExercise {
    public static void main(String[] args) {
        // Your implementation here
        WebDriver driver = new ChromeDriver();

        try {
            // Navigate to page with nested iframes
            // Implement context tracking
            // Build navigation methods
            // Test cross-iframe element finding

        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 5: Cookie Consent Manager

Create a universal cookie consent handler that:
- Detects various cookie consent implementations
- Identifies accept/reject buttons using multiple strategies
- Handles different positions (top, bottom, modal)
- Provides fallback mechanisms

```java
public class CookieConsentExercise {
    public static void main(String[] args) {
        // Your implementation here
        WebDriver driver = new ChromeDriver();

        try {
            // Test on multiple websites
            // Implement detection logic
            // Handle different implementations
            // Test fallback mechanisms

        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 6: Comprehensive Popup Handler

Build a unified popup handling system that:
- Handles JavaScript alerts/confirms/prompts
- Manages modal dialogs
- Deals with browser notifications
- Handles permission popups
- Manages cookie consents

```java
public class ComprehensivePopupExercise {
    public static void main(String[] args) {
        // Your implementation here
        WebDriver driver = new ChromeDriver();

        try {
            // Create unified popup handler
            // Test all popup types
            // Implement priority handling
            // Add logging and reporting

        } finally {
            driver.quit();
        }
    }
}
```

---

## Interview Questions

### Basic Level

1. **What is the difference between a JavaScript alert and a modal dialog?**
   - JavaScript alert is a browser-level popup handled by Alert interface
   - Modal dialog is HTML/CSS/JS element, part of DOM
   - Alert blocks all browser interaction until dismissed
   - Modal can be handled like regular web elements

2. **How do you handle a JavaScript alert in Selenium?**
   ```java
   Alert alert = driver.switchTo().alert();
   alert.accept(); // or alert.dismiss();
   ```

3. **What is Shadow DOM?**
   - Shadow DOM provides encapsulation for web components
   - Creates separate DOM tree attached to an element
   - Isolates component's internal structure from main document
   - Used by modern frameworks and web components

4. **How do you access elements inside Shadow DOM?**
   ```java
   WebElement shadowHost = driver.findElement(By.cssSelector("shadow-host"));
   SearchContext shadowRoot = (SearchContext) ((JavascriptExecutor) driver)
       .executeScript("return arguments[0].shadowRoot", shadowHost);
   WebElement element = shadowRoot.findElement(By.cssSelector("selector"));
   ```

5. **What is an iFrame?**
   - iFrame is an inline frame - embedded document within a page
   - Has its own DOM and requires context switching
   - Can be same-origin or cross-origin

### Intermediate Level

6. **How do you handle nested iFrames?**
   ```java
   // Switch to outer iframe
   driver.switchTo().frame("outer-frame");

   // Switch to inner iframe
   driver.switchTo().frame("inner-frame");

   // Interact with element

   // Switch back to parent
   driver.switchTo().parentFrame();

   // Or switch to default content
   driver.switchTo().defaultContent();
   ```

7. **What causes StaleElementReferenceException and how do you handle it?**
   - Caused when element reference becomes invalid after DOM change
   - Happens after page refresh, dynamic content update, or AJAX calls
   - Handle by:
     - Re-finding element using locator
     - Implementing retry mechanism
     - Using ExpectedConditions
     - Storing locators instead of elements

8. **How do you disable browser notifications in Chrome?**
   ```java
   ChromeOptions options = new ChromeOptions();
   Map<String, Object> prefs = new HashMap<>();
   prefs.put("profile.default_content_setting_values.notifications", 2);
   options.setExperimentalOption("prefs", prefs);
   WebDriver driver = new ChromeDriver(options);
   ```

9. **Explain different strategies for handling CAPTCHA in test automation.**
   - Disable CAPTCHA in test environment
   - Use test CAPTCHA keys (reCAPTCHA test keys)
   - Skip CAPTCHA using cookies/tokens
   - Use pre-authenticated sessions
   - Never attempt to solve CAPTCHA programmatically

10. **How do you handle SSL certificate errors?**
    ```java
    ChromeOptions options = new ChromeOptions();
    options.setAcceptInsecureCerts(true);
    options.addArguments("--ignore-certificate-errors");
    WebDriver driver = new ChromeDriver(options);
    ```

### Advanced Level

11. **How do you handle Basic Authentication in Selenium?**
    - Pass credentials in URL: https://username:password@domain.com
    - Use browser capabilities/options
    - For Windows: Use AutoIt for system dialogs
    - Use proxy with authentication headers

12. **Explain the difference between open and closed Shadow DOM.**
    - Open Shadow DOM: Accessible via element.shadowRoot
    - Closed Shadow DOM: shadowRoot returns null
    - Open allows JavaScript access from outside
    - Closed provides stronger encapsulation
    - In Selenium, closed shadow DOM is more challenging

13. **How do you detect if an element is blocked by an overlay?**
    ```java
    public boolean isElementBlocked(WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        String script =
            "var elem = arguments[0];" +
            "var rect = elem.getBoundingClientRect();" +
            "var x = rect.left + rect.width / 2;" +
            "var y = rect.top + rect.height / 2;" +
            "var topElement = document.elementFromPoint(x, y);" +
            "return topElement !== elem && !elem.contains(topElement);";
        return (Boolean) js.executeScript(script, element);
    }
    ```

14. **How would you create a framework to handle multiple popup types?**
    - Create interface for popup handlers
    - Implement specific handlers for each type
    - Use factory pattern to get appropriate handler
    - Implement priority-based handling
    - Add comprehensive logging
    - Create configuration for popup preferences

15. **Explain how you would handle a scenario with nested shadow DOM, iFrame, and modal dialog.**
    ```java
    // 1. Switch to iframe
    driver.switchTo().frame(iframeElement);

    // 2. Access shadow DOM in iframe
    WebElement shadowHost = driver.findElement(By.cssSelector("shadow-host"));
    SearchContext shadowRoot = getShadowRoot(shadowHost);

    // 3. Find modal trigger in shadow DOM
    WebElement modalTrigger = shadowRoot.findElement(By.cssSelector("button"));
    modalTrigger.click();

    // 4. Handle modal (still in iframe and shadow DOM context)
    WebElement modal = shadowRoot.findElement(By.cssSelector(".modal"));

    // 5. Interact with modal

    // 6. Cleanup
    driver.switchTo().defaultContent();
    ```

---

## Key Takeaways

1. **Pop-up Types**
   - JavaScript alerts require Alert interface
   - Modal dialogs are DOM elements
   - Browser notifications need browser configuration
   - Each type requires specific handling approach

2. **Shadow DOM**
   - Provides encapsulation for web components
   - Requires JavaScript execution to access
   - Can be nested
   - Open shadow DOM is accessible, closed is not

3. **iFrames**
   - Require context switching
   - Must switch back to default content
   - Can be nested requiring sequential switching
   - Track context to avoid confusion

4. **Overlays and Spinners**
   - Must wait for them to disappear before interaction
   - Can block element clicks
   - Use explicit waits and custom conditions
   - JavaScript removal as last resort

5. **CAPTCHA**
   - Cannot and should not be solved programmatically
   - Work with development team for test strategies
   - Use test environment without CAPTCHA
   - Cookie-based bypass for authenticated sessions

6. **SSL and Authentication**
   - Configure browser to accept insecure certificates
   - Use browser capabilities for authentication
   - Pass credentials in URL for basic auth
   - NTLM requires special setup

7. **Stale Elements**
   - Caused by DOM changes
   - Store locators, not element references
   - Implement retry mechanisms
   - Re-find elements after DOM manipulation

8. **Best Practices**
   - Use explicit waits for dynamic content
   - Always clean up (switch to default content)
   - Implement retry mechanisms for flaky scenarios
   - Create reusable utility classes
   - Log complex operations
   - Handle timeouts gracefully

9. **Framework Design**
   - Create specialized handler classes
   - Use Page Object Model
   - Implement factory patterns for handlers
   - Build comprehensive utility libraries
   - Add logging and reporting

10. **Testing Strategy**
    - Understand application architecture
    - Work with developers for testability
    - Configure test environments appropriately
    - Use appropriate tools for each scenario
    - Balance automation with manual testing where needed

---

## Navigation

- **Previous**: [Day 12: Working with Tables, Calendars, and Web Elements](/content/01_Core_Courses/Selenium_Automation_Daily/week2/day12_tables_calendars.md)
- **Next**: [Day 14: File Upload and Download](/content/01_Core_Courses/Selenium_Automation_Daily/week2/day14_file_operations.md)
- **Week 2 Overview**: [Week 2 - Advanced Interactions](/content/01_Core_Courses/Selenium_Automation_Daily/week2/overview.md)

---

**Estimated Time to Complete**: 4-5 hours

**Last Updated**: January 2026