# Day 6: Handling Dropdowns, Alerts, and Frames

## Table of Contents
1. [Learning Objectives](#learning-objectives)
2. [Introduction](#introduction)
3. [Handling Dropdowns](#handling-dropdowns)
   - [The Select Class](#the-select-class)
   - [Selection Methods](#selection-methods)
   - [Retrieving Selected Options](#retrieving-selected-options)
   - [Multi-Select Dropdowns](#multi-select-dropdowns)
   - [Non-Standard Dropdowns](#non-standard-dropdowns)
4. [Handling Alerts and Popups](#handling-alerts-and-popups)
   - [Types of JavaScript Alerts](#types-of-javascript-alerts)
   - [Alert Interface Methods](#alert-interface-methods)
   - [Working with Different Alert Types](#working-with-different-alert-types)
   - [Alert Exceptions and Error Handling](#alert-exceptions-and-error-handling)
5. [Handling Frames and IFrames](#handling-frames-and-iframes)
   - [Understanding Frames](#understanding-frames)
   - [Switching to Frames](#switching-to-frames)
   - [Navigating Between Frames](#navigating-between-frames)
   - [Working with Nested Frames](#working-with-nested-frames)
6. [Handling Multiple Windows and Tabs](#handling-multiple-windows-and-tabs)
   - [Window Handle Concepts](#window-handle-concepts)
   - [Switching Between Windows](#switching-between-windows)
   - [Managing Multiple Windows](#managing-multiple-windows)
7. [Best Practices](#best-practices)
8. [Common Challenges and Solutions](#common-challenges-and-solutions)
9. [Practice Exercises](#practice-exercises)
10. [Interview Questions](#interview-questions)
11. [Key Takeaways](#key-takeaways)
12. [Navigation](#navigation)

---

## Learning Objectives

By the end of this lesson, you will be able to:

- Master the Select class for handling standard HTML dropdowns
- Work with single-select and multi-select dropdown elements
- Handle non-standard dropdowns and custom select components
- Interact with JavaScript alerts, confirmations, and prompts
- Switch between frames and iframes seamlessly
- Navigate nested frame structures
- Manage multiple browser windows and tabs
- Implement robust error handling for special web elements
- Apply best practices for working with complex UI components

---

## Introduction

### Special Web Elements

Modern web applications use various UI components that require special handling in Selenium:

1. **Dropdowns**: Select elements for choosing options from a list
2. **Alerts**: JavaScript popup dialogs for user interaction
3. **Frames**: HTML documents embedded within other documents
4. **Windows/Tabs**: Multiple browser contexts requiring window handle management

These elements exist outside the normal DOM hierarchy or have special properties that require specific Selenium APIs.

### Why Special Handling is Needed

```java
// This WON'T work for dropdowns:
WebElement dropdown = driver.findElement(By.id("country"));
dropdown.click(); // Opens dropdown
dropdown.sendKeys("India"); // Unreliable!

// This WON'T work for alerts:
WebElement alert = driver.findElement(By.id("alert")); // NoSuchElementException!

// This WON'T work for elements in frames:
WebElement frameElement = driver.findElement(By.id("elementInFrame")); // Not found!
```

**Key Insight**: These components require context switching or specialized classes to interact with them properly.

---

## Handling Dropdowns

### The Select Class

Selenium provides the `Select` class specifically for handling HTML `<select>` elements.

#### Import Statement

```java
import org.openqa.selenium.support.ui.Select;
```

#### Creating a Select Object

```java
// First, locate the select element
WebElement dropdownElement = driver.findElement(By.id("country"));

// Then, wrap it in a Select object
Select dropdown = new Select(dropdownElement);
```

#### Single-Line Approach

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
```

### HTML Structure of Select Elements

```html
<!-- Standard Single-Select Dropdown -->
<select id="country" name="country">
    <option value="">Select Country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="in">India</option>
    <option value="au">Australia</option>
</select>

<!-- Multi-Select Dropdown -->
<select id="skills" name="skills" multiple>
    <option value="java">Java</option>
    <option value="python">Python</option>
    <option value="selenium">Selenium</option>
    <option value="testng">TestNG</option>
</select>
```

---

### Selection Methods

The Select class provides three primary methods for selecting options:

#### 1. selectByVisibleText()

Selects an option by the text displayed to the user.

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("India");
```

**When to Use:**
- When you know the exact text displayed to users
- Most readable and maintainable option
- Recommended for most scenarios

**Example: Country Selection**

```java
public class DropdownExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/registration");

        // Select country by visible text
        Select countryDropdown = new Select(driver.findElement(By.id("country")));
        countryDropdown.selectByVisibleText("United States");

        System.out.println("Selected: " + countryDropdown.getFirstSelectedOption().getText());
    }
}
```

**Important Considerations:**
```java
// Case-sensitive matching
dropdown.selectByVisibleText("india"); // Won't work if text is "India"

// Exact match required (including spaces)
dropdown.selectByVisibleText(" India "); // Won't work if text is "India"

// Proper usage
dropdown.selectByVisibleText("India"); // Correct
```

#### 2. selectByValue()

Selects an option by its `value` attribute.

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByValue("in"); // Selects option with value="in"
```

**When to Use:**
- When working with programmatic values
- When value attribute is more stable than visible text
- For integration with backend systems

**Example: Product Selection**

```java
public class SelectByValueExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/products");

        // HTML: <option value="prod_123">Premium Plan - $99/month</option>
        Select productDropdown = new Select(driver.findElement(By.id("product")));

        // Select by value (stable product ID)
        productDropdown.selectByValue("prod_123");

        // The visible text might change, but product ID remains constant
        System.out.println("Selected: " + productDropdown.getFirstSelectedOption().getText());
    }
}
```

#### 3. selectByIndex()

Selects an option by its index position (0-based).

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByIndex(2); // Selects the 3rd option (0-indexed)
```

**When to Use:**
- Testing dropdown navigation
- When option text/values are dynamic
- Generally **NOT recommended** for production tests (brittle)

**Example: Index-Based Selection**

```java
public class SelectByIndexExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/form");

        Select monthDropdown = new Select(driver.findElement(By.id("month")));

        // Index 0 is usually the placeholder "Select Month"
        // Index 1 is "January"
        monthDropdown.selectByIndex(1); // Select January

        // Selecting December (assuming index 12)
        monthDropdown.selectByIndex(12);
    }
}
```

**Pitfalls of Using Index:**

```java
// FRAGILE: If a new option is added at the beginning, indices change
monthDropdown.selectByIndex(6); // Was June, might become July after changes

// BETTER: Use visible text or value
monthDropdown.selectByVisibleText("June");
monthDropdown.selectByValue("06");
```

---

### Retrieving Selected Options

The Select class provides methods to retrieve information about selected options:

#### 1. getFirstSelectedOption()

Returns the first (or only) selected option as a WebElement.

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("India");

WebElement selectedOption = dropdown.getFirstSelectedOption();
System.out.println("Selected Text: " + selectedOption.getText());
System.out.println("Selected Value: " + selectedOption.getAttribute("value"));
```

**Complete Example:**

```java
public class GetSelectedOptionExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/form");

        Select countryDropdown = new Select(driver.findElement(By.id("country")));

        // Select an option
        countryDropdown.selectByVisibleText("Canada");

        // Retrieve selected option
        WebElement selected = countryDropdown.getFirstSelectedOption();

        // Get details
        String selectedText = selected.getText();
        String selectedValue = selected.getAttribute("value");

        System.out.println("Display Text: " + selectedText); // Canada
        System.out.println("Value Attribute: " + selectedValue); // ca

        // Verify selection
        Assert.assertEquals(selectedText, "Canada", "Country not selected correctly");
    }
}
```

#### 2. getAllSelectedOptions()

Returns all selected options (useful for multi-select dropdowns).

```java
Select dropdown = new Select(driver.findElement(By.id("skills")));
dropdown.selectByVisibleText("Java");
dropdown.selectByVisibleText("Selenium");

List<WebElement> selectedOptions = dropdown.getAllSelectedOptions();
System.out.println("Number of selections: " + selectedOptions.size());

for (WebElement option : selectedOptions) {
    System.out.println("Selected: " + option.getText());
}
```

#### 3. getOptions()

Returns all available options in the dropdown.

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
List<WebElement> allOptions = dropdown.getOptions();

System.out.println("Total options: " + allOptions.size());

for (WebElement option : allOptions) {
    System.out.println("Option: " + option.getText() + " | Value: " + option.getAttribute("value"));
}
```

**Comprehensive Example:**

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import java.util.List;

public class DropdownInfoRetrieval {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/form");

        Select countryDropdown = new Select(driver.findElement(By.id("country")));

        // Get all options
        List<WebElement> allOptions = countryDropdown.getOptions();
        System.out.println("Total countries available: " + allOptions.size());

        // Print all options
        System.out.println("\n--- All Options ---");
        for (int i = 0; i < allOptions.size(); i++) {
            WebElement option = allOptions.get(i);
            System.out.println("Index " + i + ": " + option.getText() +
                             " (value=" + option.getAttribute("value") + ")");
        }

        // Select an option
        countryDropdown.selectByVisibleText("India");

        // Verify selection
        WebElement selected = countryDropdown.getFirstSelectedOption();
        System.out.println("\n--- Currently Selected ---");
        System.out.println("Text: " + selected.getText());
        System.out.println("Value: " + selected.getAttribute("value"));

        // Check if dropdown is multi-select
        boolean isMultiple = countryDropdown.isMultiple();
        System.out.println("\n--- Dropdown Info ---");
        System.out.println("Is Multi-Select: " + isMultiple);

        driver.quit();
    }
}
```

**Output:**
```
Total countries available: 5

--- All Options ---
Index 0: Select Country (value=)
Index 1: United States (value=us)
Index 2: United Kingdom (value=uk)
Index 3: India (value=in)
Index 4: Australia (value=au)

--- Currently Selected ---
Text: India
Value: in

--- Dropdown Info ---
Is Multi-Select: false
```

---

### Multi-Select Dropdowns

Multi-select dropdowns allow users to select multiple options simultaneously.

#### Identifying Multi-Select Dropdowns

```java
Select dropdown = new Select(driver.findElement(By.id("skills")));

if (dropdown.isMultiple()) {
    System.out.println("This is a multi-select dropdown");
} else {
    System.out.println("This is a single-select dropdown");
}
```

#### Selecting Multiple Options

```java
Select skillsDropdown = new Select(driver.findElement(By.id("skills")));

// Select multiple options
skillsDropdown.selectByVisibleText("Java");
skillsDropdown.selectByVisibleText("Selenium");
skillsDropdown.selectByValue("testng");
skillsDropdown.selectByIndex(4);

// Verify all selections
List<WebElement> selected = skillsDropdown.getAllSelectedOptions();
System.out.println("Total selected: " + selected.size());
```

#### Deselecting Options

Multi-select dropdowns support deselection methods:

```java
Select skillsDropdown = new Select(driver.findElement(By.id("skills")));

// Select multiple options
skillsDropdown.selectByVisibleText("Java");
skillsDropdown.selectByVisibleText("Python");
skillsDropdown.selectByVisibleText("Selenium");

// Deselect specific option
skillsDropdown.deselectByVisibleText("Python");

// Deselect by value
skillsDropdown.deselectByValue("java");

// Deselect by index
skillsDropdown.deselectByIndex(0);

// Deselect all options
skillsDropdown.deselectAll();
```

**Important Note:**
```java
// deselectAll() only works with multi-select dropdowns
Select singleSelect = new Select(driver.findElement(By.id("country")));
// singleSelect.deselectAll(); // Throws UnsupportedOperationException
```

#### Complete Multi-Select Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import java.util.List;

public class MultiSelectExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/skills-form");

        Select skillsDropdown = new Select(driver.findElement(By.id("skills")));

        // Verify it's a multi-select dropdown
        if (!skillsDropdown.isMultiple()) {
            System.out.println("ERROR: Not a multi-select dropdown!");
            return;
        }

        System.out.println("=== Multi-Select Dropdown Example ===\n");

        // Display all available options
        List<WebElement> allOptions = skillsDropdown.getOptions();
        System.out.println("Available skills (" + allOptions.size() + "):");
        for (WebElement option : allOptions) {
            System.out.println("  - " + option.getText());
        }

        // Select multiple skills
        System.out.println("\n--- Selecting multiple skills ---");
        skillsDropdown.selectByVisibleText("Java");
        skillsDropdown.selectByVisibleText("Selenium");
        skillsDropdown.selectByVisibleText("TestNG");
        skillsDropdown.selectByVisibleText("Maven");

        // Display selected skills
        List<WebElement> selectedSkills = skillsDropdown.getAllSelectedOptions();
        System.out.println("Selected skills (" + selectedSkills.size() + "):");
        for (WebElement skill : selectedSkills) {
            System.out.println("  - " + skill.getText());
        }

        // Deselect one skill
        System.out.println("\n--- Deselecting Maven ---");
        skillsDropdown.deselectByVisibleText("Maven");

        selectedSkills = skillsDropdown.getAllSelectedOptions();
        System.out.println("Remaining selections (" + selectedSkills.size() + "):");
        for (WebElement skill : selectedSkills) {
            System.out.println("  - " + skill.getText());
        }

        // Deselect all
        System.out.println("\n--- Clearing all selections ---");
        skillsDropdown.deselectAll();

        selectedSkills = skillsDropdown.getAllSelectedOptions();
        System.out.println("Selected skills after clear: " + selectedSkills.size());

        driver.quit();
    }
}
```

---

### Non-Standard Dropdowns

Many modern web applications use custom dropdowns that aren't built with `<select>` tags. These require different handling approaches.

#### Identifying Non-Standard Dropdowns

```html
<!-- Custom dropdown using div and ul -->
<div class="custom-dropdown" id="countryDropdown">
    <div class="dropdown-header">Select Country</div>
    <ul class="dropdown-list">
        <li data-value="us">United States</li>
        <li data-value="uk">United Kingdom</li>
        <li data-value="in">India</li>
    </ul>
</div>

<!-- Material UI style dropdown -->
<div class="MuiSelect-root">
    <div class="MuiSelect-select">Select Option</div>
</div>
```

#### Handling Custom Dropdowns

**Approach 1: Click and Select Pattern**

```java
public class CustomDropdownExample {
    public static void selectCustomDropdown(WebDriver driver, String dropdownId, String optionText) {
        // Click the dropdown to expand
        WebElement dropdown = driver.findElement(By.id(dropdownId));
        dropdown.click();

        // Wait for options to appear
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//ul[@class='dropdown-list']//li[text()='" + optionText + "']")
        ));

        // Click the desired option
        WebElement option = driver.findElement(
            By.xpath("//ul[@class='dropdown-list']//li[text()='" + optionText + "']")
        );
        option.click();
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/custom-form");

        selectCustomDropdown(driver, "countryDropdown", "India");

        driver.quit();
    }
}
```

**Approach 2: Search-Based Dropdowns**

```java
public class SearchableDropdownExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/searchable-dropdown");

        // Click the dropdown input
        WebElement dropdownInput = driver.findElement(By.cssSelector(".search-dropdown input"));
        dropdownInput.click();

        // Type to search
        dropdownInput.sendKeys("India");

        // Wait for filtered results
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//div[@class='dropdown-option' and contains(text(), 'India')]")
        ));

        // Click the matching option
        WebElement option = driver.findElement(
            By.xpath("//div[@class='dropdown-option' and contains(text(), 'India')]")
        );
        option.click();

        driver.quit();
    }
}
```

**Approach 3: Using JavaScript Executor**

```java
public class JSDropdownExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/js-dropdown");

        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Set value directly using JavaScript
        js.executeScript(
            "document.getElementById('customDropdown').value = 'india';"
        );

        // Trigger change event
        js.executeScript(
            "document.getElementById('customDropdown').dispatchEvent(new Event('change'));"
        );

        driver.quit();
    }
}
```

**Approach 4: Using Actions Class for Hover-Based Dropdowns**

```java
import org.openqa.selenium.interactions.Actions;

public class HoverDropdownExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/hover-dropdown");

        Actions actions = new Actions(driver);

        // Hover over the dropdown trigger
        WebElement dropdownTrigger = driver.findElement(By.id("dropdownMenu"));
        actions.moveToElement(dropdownTrigger).perform();

        // Wait for dropdown to appear
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".dropdown-content")
        ));

        // Click the desired option
        WebElement option = driver.findElement(By.linkText("India"));
        option.click();

        driver.quit();
    }
}
```

---

## Handling Alerts and Popups

### Types of JavaScript Alerts

JavaScript provides three types of popup dialogs:

#### 1. Simple Alert

Displays a message with an OK button.

```javascript
// JavaScript code that creates the alert
alert("This is a simple alert!");
```

**Characteristics:**
- Single OK button
- Cannot be inspected in browser DevTools
- Blocks page interaction until dismissed

#### 2. Confirmation Alert

Displays a message with OK and Cancel buttons.

```javascript
// JavaScript code
var result = confirm("Do you want to continue?");
// Returns true if OK clicked, false if Cancel clicked
```

**Characteristics:**
- OK and Cancel buttons
- Returns boolean value
- User can accept or dismiss

#### 3. Prompt Alert

Displays a message with a text input field and OK/Cancel buttons.

```javascript
// JavaScript code
var name = prompt("Please enter your name:", "Default Name");
// Returns the entered text if OK clicked, null if Cancel clicked
```

**Characteristics:**
- Text input field
- OK and Cancel buttons
- Returns user input or null

---

### Alert Interface Methods

Selenium's `Alert` interface provides methods to interact with JavaScript alerts:

```java
// Switch to the alert
Alert alert = driver.switchTo().alert();
```

#### Key Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `accept()` | Clicks OK button | void |
| `dismiss()` | Clicks Cancel button (if present) | void |
| `getText()` | Gets the alert message text | String |
| `sendKeys(String)` | Enters text in prompt alert | void |

---

### Working with Different Alert Types

#### Handling Simple Alerts

```java
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SimpleAlertExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/alert-demo");

        // Click button that triggers alert
        driver.findElement(By.id("alertButton")).click();

        // Wait a moment for alert to appear
        Thread.sleep(1000);

        // Switch to alert
        Alert alert = driver.switchTo().alert();

        // Get alert text
        String alertText = alert.getText();
        System.out.println("Alert message: " + alertText);

        // Accept the alert (click OK)
        alert.accept();

        System.out.println("Alert accepted successfully");

        driver.quit();
    }
}
```

**Output:**
```
Alert message: This is a simple alert!
Alert accepted successfully
```

#### Handling Confirmation Alerts

```java
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ConfirmationAlertExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/confirmation-demo");

        // Test 1: Accept the confirmation
        System.out.println("=== Test 1: Accepting Confirmation ===");
        driver.findElement(By.id("confirmButton")).click();
        Thread.sleep(500);

        Alert confirmAlert = driver.switchTo().alert();
        System.out.println("Confirmation message: " + confirmAlert.getText());
        confirmAlert.accept(); // Click OK

        // Check result
        String result = driver.findElement(By.id("result")).getText();
        System.out.println("Result: " + result); // "You clicked OK"

        // Test 2: Dismiss the confirmation
        System.out.println("\n=== Test 2: Dismissing Confirmation ===");
        driver.findElement(By.id("confirmButton")).click();
        Thread.sleep(500);

        confirmAlert = driver.switchTo().alert();
        confirmAlert.dismiss(); // Click Cancel

        result = driver.findElement(By.id("result")).getText();
        System.out.println("Result: " + result); // "You clicked Cancel"

        driver.quit();
    }
}
```

#### Handling Prompt Alerts

```java
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class PromptAlertExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/prompt-demo");

        // Test 1: Enter text and accept
        System.out.println("=== Test 1: Entering Text ===");
        driver.findElement(By.id("promptButton")).click();
        Thread.sleep(500);

        Alert promptAlert = driver.switchTo().alert();
        System.out.println("Prompt message: " + promptAlert.getText());

        // Enter text in the prompt
        String userName = "John Doe";
        promptAlert.sendKeys(userName);

        // Accept the prompt
        promptAlert.accept();

        // Verify the entered text
        String result = driver.findElement(By.id("result")).getText();
        System.out.println("Result: " + result); // "Hello, John Doe!"

        // Test 2: Cancel the prompt
        System.out.println("\n=== Test 2: Cancelling Prompt ===");
        driver.findElement(By.id("promptButton")).click();
        Thread.sleep(500);

        promptAlert = driver.switchTo().alert();
        promptAlert.dismiss(); // Cancel without entering text

        result = driver.findElement(By.id("result")).getText();
        System.out.println("Result: " + result); // "User cancelled the prompt"

        driver.quit();
    }
}
```

#### Using Explicit Waits with Alerts

```java
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class AlertWithWaitExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/delayed-alert");

        // Click button that triggers alert after delay
        driver.findElement(By.id("delayedAlertButton")).click();

        // Wait for alert to be present (up to 10 seconds)
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        System.out.println("Alert appeared: " + alert.getText());
        alert.accept();

        System.out.println("Alert handled successfully");

        driver.quit();
    }
}
```

---

### Alert Exceptions and Error Handling

#### Common Alert Exceptions

**1. NoAlertPresentException**

Thrown when trying to switch to an alert that doesn't exist.

```java
import org.openqa.selenium.NoAlertPresentException;

public class NoAlertExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        try {
            Alert alert = driver.switchTo().alert();
            alert.accept();
        } catch (NoAlertPresentException e) {
            System.out.println("No alert present on the page");
            e.printStackTrace();
        }

        driver.quit();
    }
}
```

**2. UnhandledAlertException**

Thrown when an alert is present but not handled, and you try to perform other actions.

```java
public class UnhandledAlertExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/alert-demo");

        // Trigger alert
        driver.findElement(By.id("alertButton")).click();
        Thread.sleep(500);

        try {
            // Try to interact with page while alert is present
            driver.findElement(By.id("someButton")).click(); // UnhandledAlertException
        } catch (Exception e) {
            System.out.println("Cannot interact with page while alert is present");

            // Handle the alert
            Alert alert = driver.switchTo().alert();
            alert.accept();
        }

        driver.quit();
    }
}
```

#### Robust Alert Handling Method

```java
import org.openqa.selenium.Alert;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class RobustAlertHandling {

    /**
     * Checks if an alert is present
     */
    public static boolean isAlertPresent(WebDriver driver) {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }

    /**
     * Waits for alert and accepts it
     */
    public static void waitAndAcceptAlert(WebDriver driver, int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Alert text: " + alert.getText());
            alert.accept();
            System.out.println("Alert accepted");
        } catch (Exception e) {
            System.out.println("No alert appeared within " + timeoutSeconds + " seconds");
        }
    }

    /**
     * Waits for alert and dismisses it
     */
    public static void waitAndDismissAlert(WebDriver driver, int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Alert text: " + alert.getText());
            alert.dismiss();
            System.out.println("Alert dismissed");
        } catch (Exception e) {
            System.out.println("No alert appeared within " + timeoutSeconds + " seconds");
        }
    }

    /**
     * Handles prompt alert with input
     */
    public static void handlePromptAlert(WebDriver driver, String inputText,
                                        boolean accept, int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());

            System.out.println("Prompt message: " + alert.getText());

            if (inputText != null && !inputText.isEmpty()) {
                alert.sendKeys(inputText);
                System.out.println("Entered text: " + inputText);
            }

            if (accept) {
                alert.accept();
                System.out.println("Prompt accepted");
            } else {
                alert.dismiss();
                System.out.println("Prompt dismissed");
            }
        } catch (Exception e) {
            System.out.println("Error handling prompt: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/alert-demo");

        // Example usage
        if (isAlertPresent(driver)) {
            waitAndAcceptAlert(driver, 5);
        }

        // Handle prompt
        handlePromptAlert(driver, "Test User", true, 5);

        driver.quit();
    }
}
```

---

## Handling Frames and IFrames

### Understanding Frames

Frames are HTML documents embedded within other HTML documents. They create separate browsing contexts.

#### Types of Frames

1. **Frame**: Older HTML standard (deprecated)
   ```html
   <frameset>
       <frame src="page1.html" name="frame1">
       <frame src="page2.html" name="frame2">
   </frameset>
   ```

2. **IFrame**: Modern HTML standard (inline frame)
   ```html
   <iframe id="myFrame" name="frameName" src="page.html"></iframe>
   ```

#### Why Frame Handling is Necessary

```java
// This WON'T work - element is inside a frame
WebElement button = driver.findElement(By.id("buttonInFrame")); // NoSuchElementException

// You must switch to the frame first
driver.switchTo().frame("frameName");
WebElement button = driver.findElement(By.id("buttonInFrame")); // Now it works!
```

**Key Concept**: WebDriver operates in a single context. To interact with elements inside a frame, you must switch the context to that frame.

---

### Switching to Frames

Selenium provides three ways to switch to a frame:

#### 1. Switch by Index (0-based)

```java
// Switch to the first frame on the page
driver.switchTo().frame(0);

// Switch to the second frame
driver.switchTo().frame(1);
```

**Example:**

```java
public class FrameByIndexExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/frames");

        // Switch to first frame
        driver.switchTo().frame(0);

        // Interact with element in frame
        WebElement element = driver.findElement(By.id("elementInFrame"));
        System.out.println("Element text: " + element.getText());

        // Switch back to main content
        driver.switchTo().defaultContent();

        driver.quit();
    }
}
```

**Limitations**: Fragile - frame order might change.

#### 2. Switch by Name or ID

```java
// HTML: <iframe id="myFrame" name="frameName" src="page.html"></iframe>

// Switch by ID
driver.switchTo().frame("myFrame");

// OR switch by name
driver.switchTo().frame("frameName");
```

**Example:**

```java
public class FrameByNameExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/iframe-demo");

        // Switch to frame by name
        driver.switchTo().frame("contentFrame");

        // Interact with elements inside frame
        WebElement heading = driver.findElement(By.tagName("h1"));
        System.out.println("Frame heading: " + heading.getText());

        WebElement button = driver.findElement(By.id("submitBtn"));
        button.click();

        // Switch back to main page
        driver.switchTo().defaultContent();

        driver.quit();
    }
}
```

**Best Practice**: Most reliable method when name/ID is available.

#### 3. Switch by WebElement

```java
// First, locate the frame element
WebElement frameElement = driver.findElement(By.cssSelector("iframe.main-frame"));

// Then switch to it
driver.switchTo().frame(frameElement);
```

**Example:**

```java
public class FrameByWebElementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/dynamic-frames");

        // Locate the frame element using any locator strategy
        WebElement frameElement = driver.findElement(By.xpath("//iframe[@class='content-frame']"));

        // Switch to frame using WebElement
        driver.switchTo().frame(frameElement);

        // Work with frame content
        String frameContent = driver.findElement(By.tagName("body")).getText();
        System.out.println("Frame content: " + frameContent);

        // Switch back to main content
        driver.switchTo().defaultContent();

        driver.quit();
    }
}
```

**Advantages**:
- Works when frame has no name/ID
- Can use any locator strategy
- Most flexible approach

---

### Navigating Between Frames

#### Switching Back to Main Content

Use `defaultContent()` to switch back to the main page from any frame:

```java
driver.switchTo().defaultContent();
```

**Example:**

```java
public class DefaultContentExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/page-with-frames");

        // Main page element
        System.out.println("Main page title: " + driver.getTitle());

        // Switch to frame
        driver.switchTo().frame("frame1");
        System.out.println("Inside frame 1");
        WebElement frameElement = driver.findElement(By.id("frame1Element"));
        frameElement.click();

        // Switch back to main page
        driver.switchTo().defaultContent();
        System.out.println("Back to main page");

        // Now can interact with main page elements again
        WebElement mainElement = driver.findElement(By.id("mainPageElement"));
        mainElement.click();

        driver.quit();
    }
}
```

#### Switching to Parent Frame

Use `parentFrame()` to switch to the immediate parent frame:

```java
driver.switchTo().parentFrame();
```

**Difference between defaultContent() and parentFrame():**

```java
public class ParentFrameExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/nested-frames");

        System.out.println("=== Main Page ===");

        // Switch to outer frame
        driver.switchTo().frame("outerFrame");
        System.out.println("=== Outer Frame ===");

        // Switch to inner frame (nested inside outer frame)
        driver.switchTo().frame("innerFrame");
        System.out.println("=== Inner Frame ===");

        // Option 1: Switch to parent frame (goes to outer frame)
        driver.switchTo().parentFrame();
        System.out.println("=== Back to Outer Frame (parent) ===");

        // Switch to inner frame again
        driver.switchTo().frame("innerFrame");
        System.out.println("=== Inner Frame Again ===");

        // Option 2: Switch to default content (goes to main page)
        driver.switchTo().defaultContent();
        System.out.println("=== Back to Main Page (default) ===");

        driver.quit();
    }
}
```

**Navigation Summary:**

```
Main Page
    |
    └─── Outer Frame
            |
            └─── Inner Frame
                    |
                    ├─── parentFrame() → Outer Frame
                    └─── defaultContent() → Main Page
```

#### Switching Between Sibling Frames

To switch between frames at the same level:

```java
public class SiblingFramesExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/multiple-frames");

        // HTML structure:
        // <iframe name="leftFrame"></iframe>
        // <iframe name="rightFrame"></iframe>

        // Work with left frame
        driver.switchTo().frame("leftFrame");
        System.out.println("Left frame content: " +
            driver.findElement(By.tagName("h1")).getText());

        // To switch to right frame, must go back to main page first
        driver.switchTo().defaultContent();

        // Now switch to right frame
        driver.switchTo().frame("rightFrame");
        System.out.println("Right frame content: " +
            driver.findElement(By.tagName("h1")).getText());

        // Go back to main page
        driver.switchTo().defaultContent();

        driver.quit();
    }
}
```

**Important Rule**: You cannot directly switch between sibling frames. You must:
1. Switch to parent/default content
2. Then switch to the target frame

---

### Working with Nested Frames

Nested frames are frames within frames, creating a hierarchy.

#### HTML Structure Example

```html
<!-- Main Page -->
<html>
<body>
    <iframe id="outerFrame" name="outer">
        <!-- Outer Frame Content -->
        <html>
        <body>
            <h1>Outer Frame</h1>
            <iframe id="innerFrame" name="inner">
                <!-- Inner Frame Content -->
                <html>
                <body>
                    <h1>Inner Frame</h1>
                    <button id="innerButton">Click Me</button>
                </body>
                </html>
            </iframe>
        </body>
        </html>
    </iframe>
</body>
</html>
```

#### Accessing Nested Frame Elements

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class NestedFramesExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/nested-frames");

        System.out.println("=== Working with Nested Frames ===\n");

        // Main page
        System.out.println("Current context: Main Page");
        System.out.println("Main page title: " + driver.getTitle());

        // Step 1: Switch to outer frame
        driver.switchTo().frame("outer");
        System.out.println("\nCurrent context: Outer Frame");
        WebElement outerHeading = driver.findElement(By.tagName("h1"));
        System.out.println("Outer frame heading: " + outerHeading.getText());

        // Step 2: Switch to inner frame (nested inside outer)
        driver.switchTo().frame("inner");
        System.out.println("\nCurrent context: Inner Frame");
        WebElement innerHeading = driver.findElement(By.tagName("h1"));
        System.out.println("Inner frame heading: " + innerHeading.getText());

        // Interact with element in inner frame
        WebElement button = driver.findElement(By.id("innerButton"));
        button.click();
        System.out.println("Clicked button in inner frame");

        // Navigate back: Option 1 - Go to parent frame (outer frame)
        driver.switchTo().parentFrame();
        System.out.println("\nCurrent context: Outer Frame (via parentFrame)");

        // Navigate back: Option 2 - Go directly to main page
        driver.switchTo().defaultContent();
        System.out.println("\nCurrent context: Main Page (via defaultContent)");

        driver.quit();
    }
}
```

**Output:**
```
=== Working with Nested Frames ===

Current context: Main Page
Main page title: Nested Frames Demo

Current context: Outer Frame
Outer frame heading: Outer Frame

Current context: Inner Frame
Inner frame heading: Inner Frame
Clicked button in inner frame

Current context: Outer Frame (via parentFrame)

Current context: Main Page (via defaultContent)
```

#### Complete Nested Frames Navigation Example

```java
public class ComplexNestedFramesExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/complex-frames");

        // Frame structure:
        // Main Page
        //   ├── Frame A (top)
        //   │     └── Frame A1 (nested)
        //   └── Frame B (bottom)
        //         └── Frame B1 (nested)

        // Access Frame A1
        System.out.println("=== Accessing Frame A1 ===");
        driver.switchTo().frame("frameA");
        driver.switchTo().frame("frameA1");
        String textA1 = driver.findElement(By.id("content")).getText();
        System.out.println("Frame A1 content: " + textA1);

        // Return to main page
        driver.switchTo().defaultContent();

        // Access Frame B1
        System.out.println("\n=== Accessing Frame B1 ===");
        driver.switchTo().frame("frameB");
        driver.switchTo().frame("frameB1");
        String textB1 = driver.findElement(By.id("content")).getText();
        System.out.println("Frame B1 content: " + textB1);

        // Go to parent (Frame B)
        driver.switchTo().parentFrame();
        System.out.println("\n=== In Frame B ===");
        String textB = driver.findElement(By.id("content")).getText();
        System.out.println("Frame B content: " + textB);

        // Return to main page
        driver.switchTo().defaultContent();
        System.out.println("\n=== Back to Main Page ===");

        driver.quit();
    }
}
```

#### Utility Method for Frame Navigation

```java
public class FrameNavigationUtils {

    /**
     * Safely switches to a frame with error handling
     */
    public static boolean switchToFrame(WebDriver driver, String frameNameOrId) {
        try {
            driver.switchTo().defaultContent();
            driver.switchTo().frame(frameNameOrId);
            System.out.println("Switched to frame: " + frameNameOrId);
            return true;
        } catch (Exception e) {
            System.out.println("Failed to switch to frame: " + frameNameOrId);
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Switches to nested frame using path
     */
    public static boolean switchToNestedFrame(WebDriver driver, String... framePath) {
        try {
            driver.switchTo().defaultContent();
            for (String frame : framePath) {
                driver.switchTo().frame(frame);
                System.out.println("Switched to frame: " + frame);
            }
            return true;
        } catch (Exception e) {
            System.out.println("Failed to navigate to nested frame");
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Counts number of frames on current page/frame
     */
    public static int countFrames(WebDriver driver) {
        return driver.findElements(By.tagName("iframe")).size();
    }

    /**
     * Lists all frame names/IDs on current page
     */
    public static void listAllFrames(WebDriver driver) {
        List<WebElement> frames = driver.findElements(By.tagName("iframe"));
        System.out.println("Total frames found: " + frames.size());

        for (int i = 0; i < frames.size(); i++) {
            String name = frames.get(i).getAttribute("name");
            String id = frames.get(i).getAttribute("id");
            System.out.println("Frame " + i + " - Name: " + name + ", ID: " + id);
        }
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/frames");

        // List all frames
        listAllFrames(driver);

        // Switch to nested frame: main -> outerFrame -> innerFrame
        switchToNestedFrame(driver, "outerFrame", "innerFrame");

        // Work with inner frame element
        WebElement element = driver.findElement(By.id("innerElement"));
        element.click();

        // Return to main content
        driver.switchTo().defaultContent();

        driver.quit();
    }
}
```

---

## Handling Multiple Windows and Tabs

### Window Handle Concepts

Each browser window or tab has a unique identifier called a **window handle** (a string value).

```java
// Get current window handle
String mainWindow = driver.getWindowHandle();
System.out.println("Main window handle: " + mainWindow);
// Output: CDwindow-1234567890ABCDEF
```

#### Key Methods

| Method | Description | Return Type |
|--------|-------------|-------------|
| `getWindowHandle()` | Gets current window handle | String |
| `getWindowHandles()` | Gets all window handles | Set\<String\> |
| `switchTo().window(handle)` | Switches to specific window | WebDriver |

---

### Switching Between Windows

#### Basic Window Handling

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.Set;

public class BasicWindowHandling {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // Store main window handle
        String mainWindow = driver.getWindowHandle();
        System.out.println("Main window: " + mainWindow);

        // Click link that opens new window
        driver.findElement(By.linkText("Open New Window")).click();
        Thread.sleep(2000);

        // Get all window handles
        Set<String> allWindows = driver.getWindowHandles();
        System.out.println("Total windows: " + allWindows.size());

        // Switch to new window
        for (String window : allWindows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                System.out.println("Switched to new window");
                break;
            }
        }

        // Work with new window
        System.out.println("New window title: " + driver.getTitle());

        // Close new window
        driver.close();

        // Switch back to main window
        driver.switchTo().window(mainWindow);
        System.out.println("Back to main window: " + driver.getTitle());

        driver.quit();
    }
}
```

#### Handling Multiple Windows

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class MultipleWindowsExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/multiple-windows");

        // Main window
        String mainWindow = driver.getWindowHandle();
        System.out.println("=== Main Window ===");
        System.out.println("Title: " + driver.getTitle());

        // Open multiple windows
        driver.findElement(By.id("openWindow1")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("openWindow2")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("openWindow3")).click();
        Thread.sleep(1000);

        // Get all windows
        Set<String> allWindows = driver.getWindowHandles();
        System.out.println("\nTotal windows open: " + allWindows.size());

        // Convert Set to List for easier handling
        List<String> windowList = new ArrayList<>(allWindows);

        // Switch to each window and perform actions
        for (int i = 0; i < windowList.size(); i++) {
            String windowHandle = windowList.get(i);
            driver.switchTo().window(windowHandle);

            System.out.println("\n=== Window " + (i + 1) + " ===");
            System.out.println("Handle: " + windowHandle);
            System.out.println("Title: " + driver.getTitle());
            System.out.println("URL: " + driver.getCurrentUrl());

            // Perform action in this window
            if (!windowHandle.equals(mainWindow)) {
                // Do something in child window
                try {
                    String content = driver.findElement(By.tagName("h1")).getText();
                    System.out.println("Content: " + content);
                } catch (Exception e) {
                    System.out.println("No h1 found");
                }
            }
        }

        // Close all child windows
        for (String window : windowList) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                System.out.println("\nClosing window: " + driver.getTitle());
                driver.close();
            }
        }

        // Switch back to main window
        driver.switchTo().window(mainWindow);
        System.out.println("\n=== Back to Main Window ===");
        System.out.println("Title: " + driver.getTitle());

        driver.quit();
    }
}
```

#### Switching to Window by Title

```java
public class SwitchWindowByTitle {

    public static void switchToWindowByTitle(WebDriver driver, String targetTitle) {
        Set<String> allWindows = driver.getWindowHandles();

        for (String window : allWindows) {
            driver.switchTo().window(window);
            if (driver.getTitle().equals(targetTitle)) {
                System.out.println("Switched to window: " + targetTitle);
                return;
            }
        }

        System.out.println("Window with title '" + targetTitle + "' not found");
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        String mainWindow = driver.getWindowHandle();

        // Open new window
        driver.findElement(By.linkText("Open Terms")).click();

        // Switch to window by title
        switchToWindowByTitle(driver, "Terms and Conditions");

        // Work with the terms window
        String content = driver.findElement(By.className("terms-content")).getText();
        System.out.println("Terms length: " + content.length() + " characters");

        // Close terms window
        driver.close();

        // Switch back to main window
        driver.switchTo().window(mainWindow);

        driver.quit();
    }
}
```

#### Switching to Window by URL

```java
public class SwitchWindowByURL {

    public static void switchToWindowByURL(WebDriver driver, String partialURL) {
        Set<String> allWindows = driver.getWindowHandles();

        for (String window : allWindows) {
            driver.switchTo().window(window);
            String currentURL = driver.getCurrentUrl();
            if (currentURL.contains(partialURL)) {
                System.out.println("Switched to window with URL containing: " + partialURL);
                System.out.println("Full URL: " + currentURL);
                return;
            }
        }

        System.out.println("No window found with URL containing: " + partialURL);
    }

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // Click link that opens new window
        driver.findElement(By.linkText("Privacy Policy")).click();
        Thread.sleep(2000);

        // Switch to window containing "privacy" in URL
        switchToWindowByURL(driver, "privacy");

        // Verify we're on the right page
        System.out.println("Page title: " + driver.getTitle());

        // Close and return to main window
        driver.close();

        // Switch to remaining window (main window)
        driver.switchTo().window(new ArrayList<>(driver.getWindowHandles()).get(0));

        driver.quit();
    }
}
```

---

### Managing Multiple Windows

#### Window Management Utility Class

```java
import org.openqa.selenium.WebDriver;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class WindowManager {
    private WebDriver driver;
    private String mainWindow;

    public WindowManager(WebDriver driver) {
        this.driver = driver;
        this.mainWindow = driver.getWindowHandle();
    }

    /**
     * Get current window count
     */
    public int getWindowCount() {
        return driver.getWindowHandles().size();
    }

    /**
     * Switch to newest window
     */
    public void switchToNewestWindow() {
        Set<String> allWindows = driver.getWindowHandles();
        List<String> windowList = new ArrayList<>(allWindows);
        driver.switchTo().window(windowList.get(windowList.size() - 1));
        System.out.println("Switched to newest window: " + driver.getTitle());
    }

    /**
     * Switch to main window
     */
    public void switchToMainWindow() {
        driver.switchTo().window(mainWindow);
        System.out.println("Switched to main window: " + driver.getTitle());
    }

    /**
     * Close all windows except main
     */
    public void closeAllExceptMain() {
        Set<String> allWindows = driver.getWindowHandles();
        for (String window : allWindows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                System.out.println("Closing window: " + driver.getTitle());
                driver.close();
            }
        }
        driver.switchTo().window(mainWindow);
        System.out.println("All child windows closed. Back to main window.");
    }

    /**
     * Close current window and switch to main
     */
    public void closeCurrentAndSwitchToMain() {
        String currentWindow = driver.getWindowHandle();
        if (!currentWindow.equals(mainWindow)) {
            driver.close();
            driver.switchTo().window(mainWindow);
            System.out.println("Closed current window and switched to main");
        } else {
            System.out.println("Already on main window");
        }
    }

    /**
     * Print all window information
     */
    public void printAllWindowInfo() {
        String currentWindow = driver.getWindowHandle();
        Set<String> allWindows = driver.getWindowHandles();

        System.out.println("\n=== Window Information ===");
        System.out.println("Total windows: " + allWindows.size());

        int index = 1;
        for (String window : allWindows) {
            driver.switchTo().window(window);
            System.out.println("\nWindow " + index + ":");
            System.out.println("  Handle: " + window);
            System.out.println("  Title: " + driver.getTitle());
            System.out.println("  URL: " + driver.getCurrentUrl());
            System.out.println("  Is Main: " + window.equals(mainWindow));
            index++;
        }

        // Switch back to current window
        driver.switchTo().window(currentWindow);
    }

    /**
     * Example usage
     */
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/window-demo");

        WindowManager windowManager = new WindowManager(driver);

        // Open multiple windows
        driver.findElement(By.id("openWindow1")).click();
        Thread.sleep(1000);
        driver.findElement(By.id("openWindow2")).click();
        Thread.sleep(1000);

        // Print window info
        windowManager.printAllWindowInfo();

        // Switch to newest window
        windowManager.switchToNewestWindow();

        // Do something in newest window
        System.out.println("\nWorking in newest window...");

        // Close all except main
        windowManager.closeAllExceptMain();

        // Verify we're on main window
        System.out.println("\nFinal window: " + driver.getTitle());

        driver.quit();
    }
}
```

---

## Best Practices

### Dropdown Best Practices

1. **Verify Dropdown Type Before Action**
   ```java
   Select dropdown = new Select(driver.findElement(By.id("country")));
   if (dropdown.isMultiple()) {
       // Handle multi-select
   } else {
       // Handle single-select
   }
   ```

2. **Prefer selectByVisibleText() Over Index**
   ```java
   // Good - Readable and stable
   dropdown.selectByVisibleText("India");

   // Avoid - Fragile, breaks when options change
   dropdown.selectByIndex(3);
   ```

3. **Add Explicit Waits for Dynamic Dropdowns**
   ```java
   WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
   WebElement dropdown = wait.until(ExpectedConditions.elementToBeClickable(By.id("country")));
   Select select = new Select(dropdown);
   ```

4. **Verify Selection After Action**
   ```java
   dropdown.selectByVisibleText("India");
   String selected = dropdown.getFirstSelectedOption().getText();
   Assert.assertEquals(selected, "India", "Selection failed");
   ```

5. **Handle Custom Dropdowns with Reusable Methods**
   ```java
   public void selectCustomDropdown(String dropdownId, String optionText) {
       driver.findElement(By.id(dropdownId)).click();
       WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
       WebElement option = wait.until(ExpectedConditions.elementToBeClickable(
           By.xpath("//div[@class='option' and text()='" + optionText + "']")
       ));
       option.click();
   }
   ```

### Alert Best Practices

1. **Always Use Explicit Wait for Alerts**
   ```java
   WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
   Alert alert = wait.until(ExpectedConditions.alertIsPresent());
   ```

2. **Get Alert Text Before Dismissing**
   ```java
   Alert alert = driver.switchTo().alert();
   String alertText = alert.getText();
   System.out.println("Alert message: " + alertText);
   alert.accept();
   ```

3. **Wrap Alert Handling in Try-Catch**
   ```java
   try {
       Alert alert = driver.switchTo().alert();
       alert.accept();
   } catch (NoAlertPresentException e) {
       System.out.println("No alert present");
   }
   ```

4. **Create Reusable Alert Handler Methods**
   ```java
   public void handleAlert(boolean accept) {
       try {
           WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
           Alert alert = wait.until(ExpectedConditions.alertIsPresent());
           if (accept) {
               alert.accept();
           } else {
               alert.dismiss();
           }
       } catch (Exception e) {
           System.out.println("Alert not present: " + e.getMessage());
       }
   }
   ```

### Frame Best Practices

1. **Always Switch Back to Default Content**
   ```java
   try {
       driver.switchTo().frame("myFrame");
       // Work with frame
   } finally {
       driver.switchTo().defaultContent();
   }
   ```

2. **Use WebElement Approach for Dynamic Frames**
   ```java
   WebElement frame = wait.until(ExpectedConditions.presenceOfElementLocated(
       By.cssSelector("iframe.dynamic-frame")
   ));
   driver.switchTo().frame(frame);
   ```

3. **Create Frame Navigation Utility Methods**
   ```java
   public void switchToFrameSafely(String frameIdentifier) {
       try {
           driver.switchTo().defaultContent();
           driver.switchTo().frame(frameIdentifier);
       } catch (Exception e) {
           System.out.println("Failed to switch to frame: " + e.getMessage());
       }
   }
   ```

4. **Count and List Frames for Debugging**
   ```java
   List<WebElement> frames = driver.findElements(By.tagName("iframe"));
   System.out.println("Total frames: " + frames.size());
   frames.forEach(frame -> {
       System.out.println("Frame ID: " + frame.getAttribute("id"));
       System.out.println("Frame Name: " + frame.getAttribute("name"));
   });
   ```

### Window Handling Best Practices

1. **Store Main Window Handle**
   ```java
   String mainWindow = driver.getWindowHandle();
   // Perform actions that open new windows
   // Always have reference to return to main window
   ```

2. **Use Descriptive Methods to Switch Windows**
   ```java
   public void switchToWindowByTitle(String title) {
       for (String window : driver.getWindowHandles()) {
           driver.switchTo().window(window);
           if (driver.getTitle().equals(title)) {
               return;
           }
       }
   }
   ```

3. **Close Child Windows Before Main Window**
   ```java
   Set<String> allWindows = driver.getWindowHandles();
   for (String window : allWindows) {
       if (!window.equals(mainWindow)) {
           driver.switchTo().window(window);
           driver.close();
       }
   }
   driver.switchTo().window(mainWindow);
   ```

4. **Add Waits When Opening New Windows**
   ```java
   int initialWindows = driver.getWindowHandles().size();
   driver.findElement(By.id("openWindow")).click();

   WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
   wait.until(ExpectedConditions.numberOfWindowsToBe(initialWindows + 1));
   ```

---

## Common Challenges and Solutions

### Challenge 1: NoSuchElementException in Dropdown

**Problem:**
```java
Select dropdown = new Select(driver.findElement(By.id("country")));
// NoSuchElementException: element not found
```

**Solutions:**

1. **Wait for element to load**
   ```java
   WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
   WebElement dropdownElement = wait.until(
       ExpectedConditions.presenceOfElementLocated(By.id("country"))
   );
   Select dropdown = new Select(dropdownElement);
   ```

2. **Verify element is in correct frame**
   ```java
   driver.switchTo().frame("formFrame");
   Select dropdown = new Select(driver.findElement(By.id("country")));
   ```

### Challenge 2: StaleElementReferenceException with Dropdowns

**Problem:**
```java
WebElement dropdownElement = driver.findElement(By.id("country"));
// Page refreshes or DOM changes
Select dropdown = new Select(dropdownElement); // StaleElementReferenceException
```

**Solution:**
```java
public Select getDropdownWithRetry(By locator, int maxRetries) {
    for (int i = 0; i < maxRetries; i++) {
        try {
            WebElement element = driver.findElement(locator);
            return new Select(element);
        } catch (StaleElementReferenceException e) {
            System.out.println("Retry " + (i + 1) + " due to stale element");
        }
    }
    throw new RuntimeException("Element remained stale after " + maxRetries + " retries");
}
```

### Challenge 3: Alert Not Present Exception

**Problem:**
```java
driver.findElement(By.id("showAlert")).click();
Alert alert = driver.switchTo().alert(); // NoAlertPresentException
```

**Solution:**
```java
// Use explicit wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
alert.accept();
```

### Challenge 4: Unable to Handle Authentication Alerts

**Problem:** Browser authentication popups (HTTP Basic Auth) cannot be handled with Alert interface.

**Solution:** Pass credentials in URL
```java
// Instead of handling alert
driver.get("https://example.com");

// Pass credentials in URL
driver.get("https://username:password@example.com");
```

### Challenge 5: Cannot Find Element Inside Frame

**Problem:**
```java
WebElement button = driver.findElement(By.id("buttonInFrame"));
// NoSuchElementException
```

**Solution:**
```java
// Switch to frame first
driver.switchTo().frame("contentFrame");
WebElement button = driver.findElement(By.id("buttonInFrame"));
button.click();
driver.switchTo().defaultContent();
```

### Challenge 6: Frame Without ID or Name

**Problem:**
```html
<iframe src="content.html"></iframe>
<!-- No id or name attribute -->
```

**Solution:**
```java
// Use index (if only one frame)
driver.switchTo().frame(0);

// Or locate by other attributes
WebElement frame = driver.findElement(By.cssSelector("iframe[src='content.html']"));
driver.switchTo().frame(frame);
```

### Challenge 7: Switching Between Many Windows

**Problem:** Difficult to track and switch between multiple windows.

**Solution:** Create a window manager class
```java
public class WindowTracker {
    private Map<String, String> windowMap = new HashMap<>();
    private WebDriver driver;

    public WindowTracker(WebDriver driver) {
        this.driver = driver;
    }

    public void storeWindow(String alias) {
        windowMap.put(alias, driver.getWindowHandle());
    }

    public void switchToWindow(String alias) {
        String handle = windowMap.get(alias);
        if (handle != null) {
            driver.switchTo().window(handle);
        }
    }
}

// Usage
WindowTracker tracker = new WindowTracker(driver);
tracker.storeWindow("main");
// Open new window
tracker.storeWindow("terms");
// Later
tracker.switchToWindow("main");
```

### Challenge 8: Custom Dropdown Not Working with Select Class

**Problem:**
```java
// Custom dropdown throws NotSelectException
Select dropdown = new Select(driver.findElement(By.id("customDropdown")));
```

**Solution:** Handle as custom element
```java
public void selectFromCustomDropdown(String dropdownId, String optionText) {
    // Click to expand
    driver.findElement(By.id(dropdownId)).click();

    // Wait and click option
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    WebElement option = wait.until(ExpectedConditions.elementToBeClickable(
        By.xpath("//li[text()='" + optionText + "']")
    ));
    option.click();
}
```

---

## ⚠️ Common Mistakes to Avoid

### 1. Not Using Select Class for Dropdowns
**Problem**: Trying to click on dropdown options directly without using the Select class.

**Why It's Wrong**: Standard HTML `<select>` dropdowns require the Select class to interact properly. Direct clicking doesn't trigger the selection mechanism and can cause unreliable behavior or failures.

**Correct Approach**: Always use Select class for HTML select elements.

```java
// ❌ WRONG: Trying to click dropdown options directly
WebElement dropdown = driver.findElement(By.id("country"));
dropdown.click(); // Opens dropdown
driver.findElement(By.xpath("//option[text()='India']")).click(); // Unreliable

// ✅ CORRECT: Use Select class
WebElement dropdownElement = driver.findElement(By.id("country"));
Select dropdown = new Select(dropdownElement);
dropdown.selectByVisibleText("India");

// ✅ CORRECT: Complete example with verification
WebElement countryElement = driver.findElement(By.id("country"));
Select countryDropdown = new Select(countryElement);

// Select option
countryDropdown.selectByVisibleText("India");

// Verify selection
String selected = countryDropdown.getFirstSelectedOption().getText();
System.out.println("Selected: " + selected);
assert selected.equals("India") : "Wrong country selected";
```

### 2. Not Waiting for Alerts Before Switching
**Problem**: Attempting to switch to an alert immediately after an action without waiting.

**Why It's Wrong**: Alerts might not appear instantly. JavaScript needs time to execute and create the alert. Switching too early causes `NoAlertPresentException`.

**Correct Approach**: Use explicit wait for alert to be present.

```java
// ❌ WRONG: Immediate switch to alert
driver.findElement(By.id("alert-btn")).click();
Alert alert = driver.switchTo().alert(); // Might throw NoAlertPresentException

// ✅ CORRECT: Wait for alert to be present
driver.findElement(By.id("alert-btn")).click();

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
alert.accept();

// ✅ BETTER: Create reusable method
public Alert waitForAlert(int timeoutSeconds) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
    return wait.until(ExpectedConditions.alertIsPresent());
}

// Usage
driver.findElement(By.id("alert-btn")).click();
Alert alert = waitForAlert(10);
System.out.println("Alert text: " + alert.getText());
alert.accept();
```

### 3. Not Switching Back from Frames
**Problem**: Switching to a frame and forgetting to switch back to default content.

**Why It's Wrong**: Once you switch to a frame, all subsequent element searches happen within that frame context. Elements outside the frame become inaccessible, causing `NoSuchElementException` for elements that clearly exist on the page.

**Correct Approach**: Always switch back to default content after frame operations.

```java
// ❌ WRONG: Not switching back from frame
driver.switchTo().frame("frame1");
driver.findElement(By.id("inside-frame-element")).click();

// Try to interact with main page - FAILS!
driver.findElement(By.id("main-page-element")).click(); // NoSuchElementException

// ✅ CORRECT: Switch back to default content
driver.switchTo().frame("frame1");
driver.findElement(By.id("inside-frame-element")).click();
driver.switchTo().defaultContent(); // Switch back to main page

// Now main page elements are accessible
driver.findElement(By.id("main-page-element")).click();

// ✅ BEST: Use try-finally to ensure switching back
try {
    driver.switchTo().frame("frame1");
    driver.findElement(By.id("inside-frame-element")).click();
} finally {
    driver.switchTo().defaultContent();
}
```

### 4. Not Handling Multi-Window Context Properly
**Problem**: Opening a new window/tab and not switching driver context to it.

**Why It's Wrong**: Even when a new window/tab opens, the driver remains focused on the original window. All actions still target the old window unless you explicitly switch context.

**Correct Approach**: Get all window handles, switch to the new window.

```java
// ❌ WRONG: Not switching to new window
String mainWindow = driver.getWindowHandle();
driver.findElement(By.id("open-new-window")).click();

// Trying to interact with new window - FAILS!
driver.findElement(By.id("new-window-element")).click(); // NoSuchElementException

// ✅ CORRECT: Switch to new window
String mainWindow = driver.getWindowHandle();
driver.findElement(By.id("open-new-window")).click();

// Wait for new window to open
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

// Get all windows and switch to new one
Set<String> allWindows = driver.getWindowHandles();
for (String window : allWindows) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        break;
    }
}

// Now you can interact with new window
driver.findElement(By.id("new-window-element")).click();

// Close new window and switch back
driver.close();
driver.switchTo().window(mainWindow);

// ✅ BETTER: Reusable method for window switching
public void switchToNewWindow() {
    String mainWindow = driver.getWindowHandle();
    Set<String> allWindows = driver.getWindowHandles();

    for (String window : allWindows) {
        if (!window.equals(mainWindow)) {
            driver.switchTo().window(window);
            return;
        }
    }
    throw new RuntimeException("New window not found");
}
```

### 5. Using Wrong Methods for Non-Select Dropdowns
**Problem**: Trying to use Select class on custom dropdowns (div-based, JavaScript-based).

**Why It's Wrong**: Select class only works with HTML `<select>` elements. Custom dropdowns use `<div>`, `<ul>`, `<li>` and won't work with Select class, causing `UnexpectedTagNameException`.

**Correct Approach**: Identify dropdown type and use appropriate method.

```java
// ❌ WRONG: Using Select on custom dropdown
WebElement customDropdown = driver.findElement(By.className("custom-dropdown"));
Select select = new Select(customDropdown); // UnexpectedTagNameException!

// ✅ CORRECT: Check if it's a select element first
WebElement dropdownElement = driver.findElement(By.id("dropdown"));

// Check tag name
if (dropdownElement.getTagName().equals("select")) {
    // It's a standard select dropdown
    Select select = new Select(dropdownElement);
    select.selectByVisibleText("Option 1");
} else {
    // It's a custom dropdown - use click
    dropdownElement.click();
    driver.findElement(By.xpath("//li[text()='Option 1']")).click();
}

// ✅ BETTER: Separate methods for each type
public void selectFromStandardDropdown(By locator, String optionText) {
    WebElement element = driver.findElement(locator);
    Select dropdown = new Select(element);
    dropdown.selectByVisibleText(optionText);
}

public void selectFromCustomDropdown(By dropdownLocator, String optionText) {
    driver.findElement(dropdownLocator).click();

    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    WebElement option = wait.until(ExpectedConditions.elementToBeClickable(
        By.xpath("//li[text()='" + optionText + "']")
    ));
    option.click();
}
```

### 6. Not Verifying Alert Text Before Accepting
**Problem**: Accepting or dismissing alerts without reading or verifying the message.

**Why It's Wrong**: You might accept wrong alerts or miss important error messages. Tests should verify that the correct alert appears with expected text before accepting.

**Correct Approach**: Always read alert text and verify it before accepting/dismissing.

```java
// ❌ WRONG: Blindly accepting alert
driver.findElement(By.id("delete-btn")).click();
Alert alert = driver.switchTo().alert();
alert.accept(); // What if it's the wrong alert?

// ✅ CORRECT: Verify alert text before accepting
driver.findElement(By.id("delete-btn")).click();

WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());

String alertText = alert.getText();
System.out.println("Alert message: " + alertText);

if (alertText.contains("Are you sure you want to delete")) {
    alert.accept();
    System.out.println("Delete confirmed");
} else {
    alert.dismiss();
    throw new RuntimeException("Unexpected alert: " + alertText);
}

// ✅ BETTER: Reusable method with verification
public void handleAlert(String expectedText, boolean accept) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    Alert alert = wait.until(ExpectedConditions.alertIsPresent());

    String actualText = alert.getText();
    assert actualText.contains(expectedText) :
        "Expected: " + expectedText + ", but got: " + actualText;

    if (accept) {
        alert.accept();
    } else {
        alert.dismiss();
    }
}

// Usage
handleAlert("Are you sure you want to delete", true);
```

---

## Practice Exercises

### Exercise 1: Dropdown Selection and Verification

**Objective:** Practice selecting options from dropdowns and verifying selections.

**Task:**
1. Navigate to a registration form
2. Select country from dropdown using all three methods
3. Verify each selection
4. Print all available options
5. Select multiple skills from a multi-select dropdown

**Starter Code:**
```java
public class Exercise1 {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://demo.automationtesting.in/Register.html");

        // TODO: Find the country dropdown
        // TODO: Select "India" using selectByVisibleText()
        // TODO: Verify selection
        // TODO: Print all country options
        // TODO: Work with Skills multi-select dropdown

        driver.quit();
    }
}
```

**Expected Output:**
```
Selected country: India
Total countries: 195
All countries: [Select Country, India, United States, ...]
Selected skills: [Java, Selenium, TestNG]
```

### Exercise 2: Alert Handling Practice

**Objective:** Handle all three types of alerts.

**Task:**
1. Trigger a simple alert and accept it
2. Trigger a confirmation alert and test both accept and dismiss
3. Trigger a prompt alert, enter text, and verify the result
4. Handle alerts with explicit waits

**Starter Code:**
```java
public class Exercise2 {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/javascript_alerts");

        // TODO: Click "Click for JS Alert" and handle it
        // TODO: Get alert text before accepting
        // TODO: Verify result message

        // TODO: Handle JS Confirm - accept it
        // TODO: Handle JS Confirm - dismiss it

        // TODO: Handle JS Prompt - enter your name
        // TODO: Verify prompt result

        driver.quit();
    }
}
```

### Exercise 3: Frame Navigation

**Objective:** Practice switching between frames and nested frames.

**Task:**
1. Navigate to a page with frames
2. Switch to different frames and retrieve content
3. Handle nested frames
4. Return to default content

**Starter Code:**
```java
public class Exercise3 {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/nested_frames");

        // TODO: Switch to top frame
        // TODO: Get text from left frame
        // TODO: Get text from middle frame
        // TODO: Get text from right frame
        // TODO: Switch to bottom frame
        // TODO: Get text from bottom frame

        driver.quit();
    }
}
```

### Exercise 4: Window Management

**Objective:** Manage multiple browser windows/tabs.

**Task:**
1. Open main window
2. Click link to open new window
3. Switch to new window and perform actions
4. Close new window
5. Return to main window
6. Verify you're back on main window

**Starter Code:**
```java
public class Exercise4 {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://the-internet.herokuapp.com/windows");

        // TODO: Store main window handle
        // TODO: Click "Click Here" to open new window
        // TODO: Switch to new window
        // TODO: Print new window title
        // TODO: Close new window
        // TODO: Switch back to main window
        // TODO: Verify main window title

        driver.quit();
    }
}
```

### Exercise 5: Complete Form Automation

**Objective:** Combine dropdown, alert, and frame handling in one scenario.

**Task:**
Create a complete automation script that:
1. Fills a registration form with dropdowns
2. Handles any alerts that appear during submission
3. Verifies success message in a frame/new window

**Starter Code:**
```java
public class Exercise5 {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();

        try {
            // Navigate to form
            driver.get("https://demo.automationtesting.in/Register.html");

            // TODO: Fill first name, last name
            // TODO: Select gender from dropdown
            // TODO: Select country from dropdown
            // TODO: Select skills from multi-select
            // TODO: Submit form
            // TODO: Handle any alerts
            // TODO: Verify submission

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 6: Advanced - Create Utility Class

**Objective:** Build reusable utility methods for common operations.

**Task:**
Create a utility class with methods for:
1. Dropdown selection with wait
2. Alert handling with timeout
3. Frame switching with verification
4. Window management

**Starter Code:**
```java
public class AutomationUtils {
    private WebDriver driver;
    private WebDriverWait wait;

    public AutomationUtils(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // TODO: public void selectDropdown(By locator, String optionText)

    // TODO: public void handleAlert(boolean accept, String textToEnter)

    // TODO: public void switchToFrame(String frameIdentifier)

    // TODO: public void switchToWindow(String windowTitle)

    // TODO: public void closeAllExceptMain()
}
```

---

## Interview Questions

### Basic Level

**Q1: What is the Select class in Selenium? When is it used?**

**Answer:** The Select class in Selenium is used to handle HTML `<select>` dropdown elements. It provides methods to select and deselect options from dropdowns.

It can only be used with standard HTML select elements. For custom dropdowns (built with div, ul, li), we need to use regular WebElement methods.

```java
// Usage
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("India");
```

---

**Q2: What are the different ways to select an option from a dropdown?**

**Answer:** There are three methods:

1. **selectByVisibleText()** - Selects by the text shown to users
   ```java
   dropdown.selectByVisibleText("India");
   ```

2. **selectByValue()** - Selects by the value attribute
   ```java
   dropdown.selectByValue("in");
   ```

3. **selectByIndex()** - Selects by zero-based index
   ```java
   dropdown.selectByIndex(2);
   ```

---

**Q3: How do you handle JavaScript alerts in Selenium?**

**Answer:** Use the Alert interface with switchTo().alert():

```java
// Switch to alert
Alert alert = driver.switchTo().alert();

// Get alert text
String message = alert.getText();

// Accept alert (click OK)
alert.accept();

// Dismiss alert (click Cancel)
alert.dismiss();

// Enter text in prompt alert
alert.sendKeys("text");
```

---

**Q4: What are the different types of JavaScript alerts?**

**Answer:** There are three types:

1. **Simple Alert** - Only shows a message with OK button
   ```javascript
   alert("Message");
   ```

2. **Confirmation Alert** - Shows message with OK and Cancel buttons
   ```javascript
   confirm("Are you sure?");
   ```

3. **Prompt Alert** - Shows message with text input and OK/Cancel buttons
   ```javascript
   prompt("Enter your name:");
   ```

---

**Q5: What is a frame in HTML? Why do we need to switch to frames?**

**Answer:** A frame is an HTML document embedded within another HTML document. Each frame has its own DOM.

We need to switch to frames because WebDriver operates in a single context. By default, it's in the main page context. To interact with elements inside a frame, we must switch the context to that frame.

```java
// Element in frame not accessible from main page
driver.switchTo().frame("frameName");
// Now we can interact with elements inside the frame
```

---

### Intermediate Level

**Q6: How do you handle multi-select dropdowns? What methods are available?**

**Answer:** Multi-select dropdowns support selecting multiple options simultaneously.

Key methods:
```java
Select dropdown = new Select(driver.findElement(By.id("skills")));

// Check if multi-select
boolean isMulti = dropdown.isMultiple();

// Select multiple options
dropdown.selectByVisibleText("Java");
dropdown.selectByVisibleText("Selenium");

// Get all selected options
List<WebElement> selected = dropdown.getAllSelectedOptions();

// Deselect specific option (only for multi-select)
dropdown.deselectByVisibleText("Java");

// Deselect all
dropdown.deselectAll();
```

**Important:** deselect methods only work with multi-select dropdowns. Using them on single-select throws UnsupportedOperationException.

---

**Q7: What is the difference between driver.close() and driver.quit() when handling multiple windows?**

**Answer:**

**driver.close():**
- Closes only the current browser window
- WebDriver session remains active
- Other windows remain open
- Control is not automatically transferred to another window

**driver.quit():**
- Closes all browser windows
- Ends the WebDriver session
- Releases system resources
- All windows are closed

```java
// Example
String mainWindow = driver.getWindowHandle();

// Open new window
driver.findElement(By.linkText("New Window")).click();

// Switch to new window
for (String window : driver.getWindowHandles()) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
    }
}

driver.close(); // Closes only new window, main window still open
driver.switchTo().window(mainWindow); // Must manually switch back

// vs

driver.quit(); // Closes all windows, session ends
```

---

**Q8: How do you switch between nested frames?**

**Answer:** For nested frames, switch sequentially from parent to child:

```java
// Main page -> Outer frame -> Inner frame
driver.switchTo().frame("outerFrame");
driver.switchTo().frame("innerFrame");

// Work with inner frame elements
WebElement element = driver.findElement(By.id("innerElement"));

// Navigate back
driver.switchTo().parentFrame(); // Goes to outer frame
driver.switchTo().defaultContent(); // Goes to main page
```

**Key points:**
- Must switch through the hierarchy
- Cannot directly jump to nested frame from main page
- Use parentFrame() to go up one level
- Use defaultContent() to go to main page

---

**Q9: What is the difference between getWindowHandle() and getWindowHandles()?**

**Answer:**

**getWindowHandle():**
- Returns: String
- Gets the handle of the current window only
- Used to store reference to a specific window

**getWindowHandles():**
- Returns: Set<String>
- Gets handles of all open windows/tabs
- Used to iterate through all windows

```java
// Get current window
String currentWindow = driver.getWindowHandle();
System.out.println("Current: " + currentWindow);
// Output: CDwindow-1234567890ABCDEF

// Get all windows
Set<String> allWindows = driver.getWindowHandles();
System.out.println("Total windows: " + allWindows.size());
// Output: Total windows: 3
```

---

**Q10: How do you handle custom dropdowns (not using <select> tag)?**

**Answer:** Custom dropdowns require a different approach:

```java
// 1. Click to expand dropdown
driver.findElement(By.id("customDropdown")).click();

// 2. Wait for options to appear
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(
    By.className("dropdown-options")
));

// 3. Click the desired option
WebElement option = driver.findElement(
    By.xpath("//li[@class='option' and text()='India']")
);
option.click();
```

**Alternative approaches:**
- Use Actions class for hover-based dropdowns
- Use JavaScript Executor to set values directly
- Handle searchable dropdowns with sendKeys()

---

### Advanced Level

**Q11: How do you handle alerts with explicit waits? Why is this important?**

**Answer:** Use ExpectedConditions.alertIsPresent() with WebDriverWait:

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for alert to be present
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
alert.accept();
```

**Why it's important:**
1. Alerts may appear after a delay (AJAX, animations)
2. Immediate switchTo().alert() may throw NoAlertPresentException
3. Makes tests more stable and reliable
4. Avoids race conditions

**Best practice with error handling:**
```java
public void handleAlertWithWait(int timeout) {
    try {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        String alertText = alert.getText();
        System.out.println("Alert: " + alertText);
        alert.accept();
    } catch (TimeoutException e) {
        System.out.println("No alert appeared within " + timeout + " seconds");
    }
}
```

---

**Q12: What exceptions can occur when handling alerts, and how do you handle them?**

**Answer:**

**1. NoAlertPresentException**
- Thrown when: Trying to switch to non-existent alert
- Solution: Use explicit wait or check if alert is present

```java
try {
    Alert alert = driver.switchTo().alert();
    alert.accept();
} catch (NoAlertPresentException e) {
    System.out.println("No alert present");
}
```

**2. UnhandledAlertException**
- Thrown when: Alert is present but not handled, and you try other operations
- Solution: Always handle alerts before proceeding

```java
// Handle any unexpected alerts
try {
    driver.findElement(By.id("button")).click();
} catch (UnhandledAlertException e) {
    Alert alert = driver.switchTo().alert();
    alert.accept();
}
```

**3. TimeoutException**
- Thrown when: Alert doesn't appear within wait time
- Solution: Increase timeout or verify trigger action

```java
try {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
    Alert alert = wait.until(ExpectedConditions.alertIsPresent());
    alert.accept();
} catch (TimeoutException e) {
    System.out.println("Alert did not appear within timeout");
}
```

---

## Key Takeaways

1. **Dropdowns**
   - Use Select class for standard HTML `<select>` elements
   - Three selection methods: byVisibleText (preferred), byValue, byIndex
   - Check isMultiple() before using deselect methods
   - Custom dropdowns require standard WebElement interaction
   - Always verify selections after making them

2. **Alerts**
   - Three types: Simple, Confirmation, Prompt
   - Must use switchTo().alert() - cannot locate with findElement
   - Always use explicit waits for reliability
   - Get text before accepting/dismissing
   - Alerts block page interaction until handled

3. **Frames**
   - Frames are separate DOM contexts
   - Three ways to switch: by index, by name/ID, by WebElement
   - Always return to defaultContent() or parentFrame()
   - Nested frames require sequential switching
   - Cannot access frame elements without switching context

4. **Windows**
   - Each window has unique handle (String identifier)
   - getWindowHandle() returns current, getWindowHandles() returns all
   - Store main window handle before opening new windows
   - Always switch back to main window after closing children
   - close() closes current window, quit() closes all and ends session

5. **General Best Practices**
   - Use explicit waits for dynamic elements
   - Create reusable utility methods
   - Always include error handling
   - Add verification after actions
   - Document complex navigation flows

---

## Navigation

- **Previous**: [Day 5: Waits](./day05_waits.md)
- **Next**: [Day 7: Framework Setup & Review](./day07_framework_setup_review.md)
- **Course Home**: [Selenium Automation Daily](../README.md)

---

**Congratulations!** You've completed Day 6 of Selenium Automation. You now have comprehensive knowledge of handling dropdowns, alerts, frames, and multiple windows - essential skills for automating complex web applications.

**Next Steps:**
- Complete all practice exercises
- Review interview questions
- Practice on different websites with these elements
- Proceed to Day 7 to learn about Waits in Selenium

---

*Last Updated: 2026-01-14*
