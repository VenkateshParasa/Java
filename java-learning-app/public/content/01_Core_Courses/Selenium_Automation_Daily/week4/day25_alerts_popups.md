# Day 25: Handling Alerts & Popups in Selenium

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand different types of alerts in web applications
- Handle JavaScript alerts using Alert interface
- Accept, dismiss, and interact with alert dialogs
- Handle confirmation boxes and prompt boxes
- Use waits with alerts for reliable handling
- Differentiate between JavaScript alerts and browser popups
- Handle modal dialogs and overlays
- Implement best practices for alert handling

---

## 1. Introduction to Alerts and Popups

### What are Alerts?

Alerts are dialog boxes that appear on top of the web page to interact with users. They are typically used to:
- Display important information
- Get user confirmation before proceeding
- Collect simple input from users
- Show warning or error messages

### Types of Alerts

1. **JavaScript Alerts** - Simple information messages
2. **Confirmation Boxes** - Ask user to confirm or cancel
3. **Prompt Boxes** - Request user input
4. **Modal Dialogs** - Custom HTML-based dialogs (not native alerts)
5. **Browser Popups** - New browser windows

### JavaScript Alert Types

```javascript
// 1. Simple Alert
alert("This is an alert!");

// 2. Confirmation Box
confirm("Do you want to continue?");

// 3. Prompt Box
prompt("Please enter your name:", "Default Name");
```

---

## 2. The Alert Interface

Selenium provides the `Alert` interface to handle JavaScript alerts.

### Key Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `accept()` | Clicks OK button | void |
| `dismiss()` | Clicks Cancel button | void |
| `getText()` | Gets alert text | String |
| `sendKeys(String)` | Enters text in prompt | void |

### Switching to Alert

Before you can interact with an alert, you must switch to it using `switchTo().alert()`.

```java
Alert alert = driver.switchTo().alert();
```

---

## 3. Handling Simple Alerts

### Simple Alert Example

```html
<!-- HTML button that triggers alert -->
<button onclick="alert('Hello World!')">Show Alert</button>
```

### Handling Code

```java
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SimpleAlertExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/alert-demo");

        // Click button that triggers alert
        driver.findElement(By.id("alertButton")).click();

        // Switch to alert
        Alert alert = driver.switchTo().alert();

        // Get alert text
        String alertText = alert.getText();
        System.out.println("Alert says: " + alertText);

        // Accept the alert (click OK)
        alert.accept();

        System.out.println("Alert accepted successfully");

        driver.quit();
    }
}
```

### Output
```
Alert says: Hello World!
Alert accepted successfully
```

---

## 4. Handling Confirmation Boxes

### Confirmation Box Example

```html
<!-- HTML button that triggers confirmation -->
<button onclick="return confirm('Are you sure?')">Delete</button>
```

A confirmation box has two buttons:
- **OK** - Returns true
- **Cancel** - Returns false

### Accepting Confirmation

```java
public class ConfirmationAcceptExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/confirm-demo");

        // Click button that triggers confirmation
        driver.findElement(By.id("confirmButton")).click();

        // Switch to alert
        Alert confirmBox = driver.switchTo().alert();

        // Get confirmation text
        System.out.println("Confirmation: " + confirmBox.getText());

        // Click OK button
        confirmBox.accept();

        // Verify result
        String result = driver.findElement(By.id("result")).getText();
        System.out.println("Result: " + result);  // "You clicked OK"

        driver.quit();
    }
}
```

### Dismissing Confirmation

```java
public class ConfirmationDismissExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/confirm-demo");

        // Click button that triggers confirmation
        driver.findElement(By.id("confirmButton")).click();

        // Switch to alert
        Alert confirmBox = driver.switchTo().alert();

        // Click Cancel button
        confirmBox.dismiss();

        // Verify result
        String result = driver.findElement(By.id("result")).getText();
        System.out.println("Result: " + result);  // "You clicked Cancel"

        driver.quit();
    }
}
```

---

## 5. Handling Prompt Boxes

### Prompt Box Example

```html
<!-- HTML button that triggers prompt -->
<button onclick="prompt('Enter your name:', 'Guest')">Enter Name</button>
```

A prompt box has:
- **Text input field**
- **OK button**
- **Cancel button**

### Entering Text in Prompt

```java
public class PromptExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/prompt-demo");

        // Click button that triggers prompt
        driver.findElement(By.id("promptButton")).click();

        // Switch to alert
        Alert prompt = driver.switchTo().alert();

        // Get prompt text
        System.out.println("Prompt: " + prompt.getText());

        // Enter text in prompt
        prompt.sendKeys("John Doe");

        // Click OK
        prompt.accept();

        // Verify result
        String result = driver.findElement(By.id("result")).getText();
        System.out.println("Result: " + result);  // "Hello, John Doe!"

        driver.quit();
    }
}
```

### Dismissing Prompt (Cancel)

```java
// Switch to prompt
Alert prompt = driver.switchTo().alert();

// Click Cancel (ignores any text entered)
prompt.dismiss();
```

---

## 6. Using Waits with Alerts

Alerts might not appear immediately, so it's important to use waits.

### Waiting for Alert to be Present

```java
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class AlertWithWait {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/delayed-alert");

        // Click button that triggers delayed alert
        driver.findElement(By.id("delayedAlertButton")).click();

        // Wait for alert to be present (up to 10 seconds)
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        System.out.println("Alert text: " + alert.getText());
        alert.accept();

        driver.quit();
    }
}
```

### Custom Alert Wait Method

```java
public Alert waitForAlert(WebDriver driver, int timeoutSeconds) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
    try {
        return wait.until(ExpectedConditions.alertIsPresent());
    } catch (TimeoutException e) {
        System.err.println("Alert did not appear within " + timeoutSeconds + " seconds");
        return null;
    }
}

// Usage
Alert alert = waitForAlert(driver, 10);
if (alert != null) {
    System.out.println(alert.getText());
    alert.accept();
}
```

---

## 7. Checking if Alert is Present

### Method 1: Using Try-Catch

```java
public boolean isAlertPresent(WebDriver driver) {
    try {
        driver.switchTo().alert();
        return true;
    } catch (NoAlertPresentException e) {
        return false;
    }
}

// Usage
if (isAlertPresent(driver)) {
    Alert alert = driver.switchTo().alert();
    alert.accept();
} else {
    System.out.println("No alert present");
}
```

### Method 2: Using WebDriverWait with Timeout

```java
public boolean isAlertPresent(WebDriver driver, int timeoutSeconds) {
    try {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        wait.until(ExpectedConditions.alertIsPresent());
        return true;
    } catch (TimeoutException e) {
        return false;
    }
}
```

---

## 8. Complete Alert Handling Utility Class

```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class AlertHelper {
    private WebDriver driver;
    private WebDriverWait wait;

    public AlertHelper(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    /**
     * Check if alert is present
     */
    public boolean isAlertPresent() {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }

    /**
     * Wait for alert to be present
     */
    public Alert waitForAlert(int timeoutSeconds) {
        try {
            WebDriverWait customWait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
            return customWait.until(ExpectedConditions.alertIsPresent());
        } catch (TimeoutException e) {
            System.err.println("Alert not present after " + timeoutSeconds + " seconds");
            return null;
        }
    }

    /**
     * Get alert text
     */
    public String getAlertText() {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            return alert.getText();
        } catch (Exception e) {
            System.err.println("Could not get alert text: " + e.getMessage());
            return null;
        }
    }

    /**
     * Accept alert (click OK)
     */
    public void acceptAlert() {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            alert.accept();
            System.out.println("Alert accepted");
        } catch (Exception e) {
            System.err.println("Could not accept alert: " + e.getMessage());
        }
    }

    /**
     * Dismiss alert (click Cancel)
     */
    public void dismissAlert() {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            alert.dismiss();
            System.out.println("Alert dismissed");
        } catch (Exception e) {
            System.err.println("Could not dismiss alert: " + e.getMessage());
        }
    }

    /**
     * Enter text in prompt and accept
     */
    public void enterTextInPromptAndAccept(String text) {
        try {
            Alert prompt = wait.until(ExpectedConditions.alertIsPresent());
            prompt.sendKeys(text);
            prompt.accept();
            System.out.println("Entered text: " + text);
        } catch (Exception e) {
            System.err.println("Could not enter text in prompt: " + e.getMessage());
        }
    }

    /**
     * Accept alert if present (non-blocking)
     */
    public boolean acceptAlertIfPresent() {
        if (isAlertPresent()) {
            acceptAlert();
            return true;
        }
        return false;
    }

    /**
     * Get alert text and accept
     */
    public String getAlertTextAndAccept() {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            String text = alert.getText();
            alert.accept();
            return text;
        } catch (Exception e) {
            System.err.println("Could not get alert text: " + e.getMessage());
            return null;
        }
    }

    /**
     * Get alert text and dismiss
     */
    public String getAlertTextAndDismiss() {
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            String text = alert.getText();
            alert.dismiss();
            return text;
        } catch (Exception e) {
            System.err.println("Could not get alert text: " + e.getMessage());
            return null;
        }
    }
}
```

### Using AlertHelper

```java
public class TestWithAlertHelper {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        AlertHelper alertHelper = new AlertHelper(driver);

        driver.get("https://example.com/alert-test");

        // Click button that triggers alert
        driver.findElement(By.id("alertBtn")).click();

        // Get alert text and accept
        String alertText = alertHelper.getAlertTextAndAccept();
        System.out.println("Alert message: " + alertText);

        // Handle confirmation
        driver.findElement(By.id("confirmBtn")).click();
        alertHelper.acceptAlert();

        // Handle prompt
        driver.findElement(By.id("promptBtn")).click();
        alertHelper.enterTextInPromptAndAccept("Test User");

        driver.quit();
    }
}
```

---

## 9. Handling Modal Dialogs (Non-JavaScript Alerts)

Modal dialogs are custom HTML elements that look like alerts but are actually part of the webpage DOM.

### Bootstrap Modal Example

```html
<!-- Bootstrap modal -->
<div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Confirmation</h4>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to proceed?</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" id="confirmBtn">Yes</button>
        <button class="btn btn-secondary" id="cancelBtn">No</button>
      </div>
    </div>
  </div>
</div>
```

### Handling Modal Dialog

```java
public class ModalDialogExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("https://example.com/modal-demo");

        // Click button that opens modal
        driver.findElement(By.id("openModalBtn")).click();

        // Wait for modal to be visible
        WebElement modal = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("myModal"))
        );

        // Get modal text
        String modalText = modal.findElement(By.className("modal-body")).getText();
        System.out.println("Modal says: " + modalText);

        // Click Yes button
        modal.findElement(By.id("confirmBtn")).click();

        // Wait for modal to disappear
        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id("myModal")));

        System.out.println("Modal closed");

        driver.quit();
    }
}
```

**Key Difference:** Modal dialogs are regular WebElements, so:
- Don't use `switchTo().alert()`
- Use regular `findElement()` methods
- Can use waits like any other element

---

## 10. Common Alert Scenarios

### Scenario 1: Alert After Form Submission

```java
public void submitFormWithAlert(WebDriver driver) {
    driver.findElement(By.id("name")).sendKeys("John Doe");
    driver.findElement(By.id("email")).sendKeys("john@example.com");
    driver.findElement(By.id("submitBtn")).click();

    // Wait for success alert
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
    Alert alert = wait.until(ExpectedConditions.alertIsPresent());

    String message = alert.getText();
    System.out.println("Submission message: " + message);
    alert.accept();

    // Verify success
    if (message.contains("Success")) {
        System.out.println("Form submitted successfully");
    }
}
```

### Scenario 2: Conditional Alert Handling

```java
public void handleConditionalAlert(WebDriver driver, boolean acceptAlert) {
    driver.findElement(By.id("deleteBtn")).click();

    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
    Alert alert = wait.until(ExpectedConditions.alertIsPresent());

    System.out.println("Alert: " + alert.getText());

    if (acceptAlert) {
        alert.accept();
        System.out.println("Item deleted");
    } else {
        alert.dismiss();
        System.out.println("Deletion cancelled");
    }
}
```

### Scenario 3: Multiple Sequential Alerts

```java
public void handleMultipleAlerts(WebDriver driver) {
    driver.findElement(By.id("multiAlertBtn")).click();

    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));

    // First alert
    Alert alert1 = wait.until(ExpectedConditions.alertIsPresent());
    System.out.println("Alert 1: " + alert1.getText());
    alert1.accept();

    // Second alert
    Alert alert2 = wait.until(ExpectedConditions.alertIsPresent());
    System.out.println("Alert 2: " + alert2.getText());
    alert2.accept();

    // Third alert
    Alert alert3 = wait.until(ExpectedConditions.alertIsPresent());
    System.out.println("Alert 3: " + alert3.getText());
    alert3.accept();
}
```

### Scenario 4: Alert with Authentication

Some websites show authentication alerts (HTTP Basic Auth), but these are **not handled** by Selenium's Alert interface.

**Solution:** Pass credentials in URL:
```java
// Instead of handling alert
driver.get("https://username:password@example.com/secure-page");
```

---

## 11. Common Errors and Solutions

### Error 1: NoAlertPresentException

**Problem:** Trying to switch to alert that doesn't exist.

```java
// This will throw NoAlertPresentException
Alert alert = driver.switchTo().alert();
```

**Solution:** Always wait for alert or check if present.

```java
// Use wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

// Or check first
if (isAlertPresent(driver)) {
    Alert alert = driver.switchTo().alert();
    alert.accept();
}
```

### Error 2: UnhandledAlertException

**Problem:** Alert is present but not handled.

**Solution:** Always handle alerts before proceeding.

```java
try {
    driver.findElement(By.id("nextButton")).click();
} catch (UnhandledAlertException e) {
    Alert alert = driver.switchTo().alert();
    alert.accept();
    driver.findElement(By.id("nextButton")).click();
}
```

### Error 3: Trying to use sendKeys() on Simple Alert

**Problem:** sendKeys() only works on prompt boxes.

```java
// This will fail on simple alert or confirmation
Alert alert = driver.switchTo().alert();
alert.sendKeys("text");  // Exception!
```

**Solution:** Only use sendKeys() with prompt boxes.

---

## 12. Best Practices

### 1. Always Use Waits with Alerts

```java
// Good
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

// Bad - might fail if alert is delayed
Alert alert = driver.switchTo().alert();
```

### 2. Check Alert Text Before Action

```java
Alert alert = driver.switchTo().alert();
String alertText = alert.getText();
System.out.println("Alert: " + alertText);

// Verify expected message
assert alertText.contains("Success") : "Unexpected alert message";

alert.accept();
```

### 3. Handle Exceptions Gracefully

```java
try {
    Alert alert = wait.until(ExpectedConditions.alertIsPresent());
    alert.accept();
} catch (TimeoutException e) {
    System.out.println("No alert appeared");
} catch (UnhandledAlertException e) {
    System.out.println("Alert was not handled properly");
    Alert alert = driver.switchTo().alert();
    alert.accept();
}
```

### 4. Create Reusable Alert Methods

```java
// Use AlertHelper class shown earlier
AlertHelper alertHelper = new AlertHelper(driver);
String message = alertHelper.getAlertTextAndAccept();
```

### 5. Distinguish Between JavaScript Alerts and Modal Dialogs

```java
// JavaScript Alert - use Alert interface
Alert alert = driver.switchTo().alert();
alert.accept();

// Modal Dialog - use regular WebElement methods
WebElement modal = driver.findElement(By.id("modal"));
modal.findElement(By.id("confirmBtn")).click();
```

---

## 13. Practical Exercises

### Exercise 1: Simple Alert
Create a script that clicks a button, reads alert text, and accepts it.

### Exercise 2: Confirmation Box
Create a script that handles a confirmation box and accepts it, then verify the result.

### Exercise 3: Prompt Box
Create a script that enters "Selenium" in a prompt box and verifies the output.

### Exercise 4: Alert with Wait
Create a script that handles a delayed alert (appears after 3 seconds).

### Exercise 5: Multiple Alerts
Create a script that handles 3 consecutive alerts in sequence.

### Exercise 6: Conditional Handling
Create a script that accepts or dismisses an alert based on its text content.

### Exercise 7: Alert Utility
Implement all methods in the AlertHelper class and test them.

### Exercise 8: Modal Dialog
Create a script that handles a Bootstrap modal dialog (not a JavaScript alert).

### Exercise 9: Error Handling
Create a script with proper exception handling for NoAlertPresentException.

### Exercise 10: Authentication Alert
Create a script that accesses a page with HTTP Basic Auth using URL credentials.

---

## 14. Key Takeaways

1. **Alert interface** handles JavaScript alerts, confirmations, and prompts
2. **switchTo().alert()** switches control to the alert
3. **accept()** clicks OK button
4. **dismiss()** clicks Cancel button
5. **getText()** retrieves alert message
6. **sendKeys()** enters text only in prompt boxes
7. **Always use waits** with alerts for reliability
8. **ExpectedConditions.alertIsPresent()** waits for alert
9. **Modal dialogs** are not alerts - handle as regular elements
10. **Create utility classes** for reusable alert handling

---

## 15. Common Interview Questions

1. What is the Alert interface in Selenium?
2. What are the methods available in the Alert interface?
3. How do you handle a JavaScript alert?
4. What's the difference between accept() and dismiss()?
5. How do you enter text in a prompt box?
6. How do you wait for an alert to appear?
7. What exception is thrown when alert is not present?
8. Can you use sendKeys() on a confirmation box?
9. What's the difference between JavaScript alerts and modal dialogs?
10. How do you handle authentication alerts?

---

## 16. Additional Resources

### Official Documentation
- [Alert Interface JavaDoc](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/Alert.html)
- [Selenium Alert Handling](https://www.selenium.dev/documentation/webdriver/interactions/alerts/)

### Practice Websites
- [The Internet - JavaScript Alerts](http://the-internet.herokuapp.com/javascript_alerts)
- [SeleniumEasy - Alert Demo](https://demo.seleniumeasy.com/javascript-alert-box-demo.html)
- [W3Schools - Alert Try It](https://www.w3schools.com/js/tryit.asp?filename=tryjs_alert)

---

## Navigation

- **Previous:** [Day 24: Waits - Part 2 (Fluent Wait)](./day24_waits_part2.md)
- **Next:** [Day 26: Frames & Windows](./day26_frames_windows.md)
- **Week 4 Home:** [Week 4 Overview](./README.md)

---

**Happy Learning!** Mastering alert handling is essential for dealing with interactive web applications.
