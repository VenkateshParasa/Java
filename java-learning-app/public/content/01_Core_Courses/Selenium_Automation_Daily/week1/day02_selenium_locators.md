# Day 2: Selenium Locators - Finding Web Elements

## Table of Contents
1. [Introduction to Locators](#introduction)
2. [Why Locators are Important](#importance)
3. [8 Basic Locator Strategies](#strategies)
4. [findElement() vs findElements()](#find-methods)
5. [Best Practices](#best-practices)
6. [Common Errors and Solutions](#errors)
7. [Practice Exercises](#exercises)

---

## 1. Introduction to Locators {#introduction}

**Locators** are strategies used to identify and locate web elements on a web page. They are fundamental to Selenium automation as every interaction with a web page requires finding elements first.

### What is a Web Element?

A web element is any HTML component on a web page:
- Text boxes
- Buttons
- Links
- Images
- Dropdowns
- Checkboxes
- Radio buttons

### Basic Syntax

```java
WebElement element = driver.findElement(By.locatorStrategy("value"));
```

---

## 2. Why Locators are Important {#importance}

### The Automation Flow

```
1. Open Browser → 2. Navigate to URL → 3. LOCATE Element → 4. Perform Action → 5. Verify Result
```

Without proper locators, you cannot:
- Click buttons
- Enter text
- Select options
- Verify content
- Interact with the page

### Characteristics of Good Locators

1. **Unique**: Identifies exactly one element
2. **Stable**: Doesn't break with minor UI changes
3. **Readable**: Easy to understand and maintain
4. **Fast**: Quick to execute

---

## 3. 8 Basic Locator Strategies {#strategies}

### 3.1 By ID

**Most Reliable and Fastest**

```java
// HTML: <input id="username" type="text">
WebElement usernameField = driver.findElement(By.id("username"));
```

**Advantages:**
- Fastest locator
- IDs should be unique
- Most reliable

**When to Use:**
- Element has a unique ID
- ID doesn't change dynamically

**Example:**
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocatorByIdExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/login");
        
        // Locate by ID
        WebElement emailField = driver.findElement(By.id("email"));
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement loginButton = driver.findElement(By.id("login-btn"));
        
        // Perform actions
        emailField.sendKeys("user@test.com");
        passwordField.sendKeys("password123");
        loginButton.click();
        
        driver.quit();
    }
}
```

---

### 3.2 By Name

**Good for Form Elements**

```java
// HTML: <input name="email" type="email">
WebElement emailField = driver.findElement(By.name("email"));
```

**Advantages:**
- Common in form elements
- Usually stable
- Fast

**When to Use:**
- Form inputs with name attribute
- Multiple elements can share same name (use findElements)

**Example:**
```java
public class LocatorByNameExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/register");
        
        // Locate by Name
        WebElement firstNameField = driver.findElement(By.name("firstName"));
        WebElement lastNameField = driver.findElement(By.name("lastName"));
        WebElement emailField = driver.findElement(By.name("email"));
        
        // Fill form
        firstNameField.sendKeys("John");
        lastNameField.sendKeys("Doe");
        emailField.sendKeys("john@example.com");
        
        driver.quit();
    }
}
```

---

### 3.3 By Class Name

**For Elements with CSS Classes**

```java
// HTML: <button class="btn-primary">Submit</button>
WebElement submitButton = driver.findElement(By.className("btn-primary"));
```

**Important:** Can only use **single class name**, not multiple classes.

```java
// ✅ Correct
driver.findElement(By.className("btn-primary"));

// ❌ Wrong - Multiple classes
driver.findElement(By.className("btn btn-primary"));  // Will fail!

// ✅ Use CSS Selector for multiple classes
driver.findElement(By.cssSelector(".btn.btn-primary"));
```

**Example:**
```java
public class LocatorByClassNameExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Single class name
        WebElement errorMessage = driver.findElement(By.className("error-msg"));
        WebElement successMessage = driver.findElement(By.className("success-msg"));
        WebElement warningBox = driver.findElement(By.className("warning"));
        
        // Get text
        System.out.println("Error: " + errorMessage.getText());
        
        driver.quit();
    }
}
```

---

### 3.4 By Tag Name

**For Elements by HTML Tag**

```java
// HTML: <input type="text">
WebElement inputField = driver.findElement(By.tagName("input"));
```

**Common Tags:**
- `input` - Input fields
- `button` - Buttons
- `a` - Links
- `div` - Divisions
- `span` - Spans
- `table` - Tables
- `img` - Images

**Example:**
```java
import java.util.List;

public class LocatorByTagNameExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Find all links
        List<WebElement> allLinks = driver.findElements(By.tagName("a"));
        System.out.println("Total links: " + allLinks.size());
        
        // Find all images
        List<WebElement> allImages = driver.findElements(By.tagName("img"));
        System.out.println("Total images: " + allImages.size());
        
        // Find all input fields
        List<WebElement> allInputs = driver.findElements(By.tagName("input"));
        System.out.println("Total inputs: " + allInputs.size());
        
        // Print all link texts
        for (WebElement link : allLinks) {
            System.out.println(link.getText());
        }
        
        driver.quit();
    }
}
```

---

### 3.5 By Link Text

**For Hyperlinks with Exact Text**

```java
// HTML: <a href="/about">About Us</a>
WebElement aboutLink = driver.findElement(By.linkText("About Us"));
```

**Important:** 
- Only works with `<a>` tags (hyperlinks)
- Requires **exact text match** (case-sensitive)

**Example:**
```java
public class LocatorByLinkTextExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Exact link text
        WebElement homeLink = driver.findElement(By.linkText("Home"));
        WebElement aboutLink = driver.findElement(By.linkText("About Us"));
        WebElement contactLink = driver.findElement(By.linkText("Contact"));
        
        // Click link
        aboutLink.click();
        
        // Verify navigation
        System.out.println("Current URL: " + driver.getCurrentUrl());
        
        driver.quit();
    }
}
```

---

### 3.6 By Partial Link Text

**For Hyperlinks with Partial Text Match**

```java
// HTML: <a href="/contact">Contact Us Today</a>
WebElement contactLink = driver.findElement(By.partialLinkText("Contact"));
```

**Difference from Link Text:**
- Link Text: Requires exact match → "Contact Us Today"
- Partial Link Text: Matches substring → "Contact" or "Today"

**Example:**
```java
public class LocatorByPartialLinkTextExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Partial match
        WebElement link1 = driver.findElement(By.partialLinkText("Sign"));  // Matches "Sign In" or "Sign Up"
        WebElement link2 = driver.findElement(By.partialLinkText("Learn"));  // Matches "Learn More"
        WebElement link3 = driver.findElement(By.partialLinkText("Get"));   // Matches "Get Started"
        
        // Click
        link3.click();
        
        driver.quit();
    }
}
```

**When to Use:**
- Link text is too long
- Link text changes dynamically (e.g., "Welcome, John")
- Want to match part of the text

---

### 3.7 By CSS Selector

**Powerful and Flexible**

```java
// Various CSS Selector examples
WebElement element1 = driver.findElement(By.cssSelector("#username"));  // ID
WebElement element2 = driver.findElement(By.cssSelector(".btn-primary"));  // Class
WebElement element3 = driver.findElement(By.cssSelector("input[name='email']"));  // Attribute
```

**CSS Selector Syntax:**

```css
/* By ID */
#elementId

/* By Class */
.className

/* By Attribute */
[attribute='value']
input[type='text']
input[name='email']

/* Multiple Classes */
.class1.class2

/* Child */
div > input

/* Descendant */
div input

/* Combination */
#form .input-field[type='text']
```

**Example:**
```java
public class LocatorByCssSelectorExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/login");
        
        // CSS Selectors
        WebElement email = driver.findElement(By.cssSelector("#email"));
        WebElement password = driver.findElement(By.cssSelector("input[name='password']"));
        WebElement submitBtn = driver.findElement(By.cssSelector("button.btn-primary"));
        WebElement errorMsg = driver.findElement(By.cssSelector(".error-message"));
        
        // Complex selector
        WebElement specificInput = driver.findElement(
            By.cssSelector("form#login-form input[type='text']")
        );
        
        driver.quit();
    }
}
```

---

### 3.8 By XPath

**Most Powerful but Slowest**

```java
// Absolute XPath (avoid)
WebElement element1 = driver.findElement(By.xpath("/html/body/div/form/input"));

// Relative XPath (preferred)
WebElement element2 = driver.findElement(By.xpath("//input[@id='username']"));
```

**XPath Syntax:**

```xpath
// Absolute path (brittle - avoid)
/html/body/div[1]/form/input[1]

// Relative path (preferred)
//tagName[@attribute='value']
//input[@id='username']
//button[@type='submit']

// Contains
//button[contains(@class, 'btn')]
//a[contains(text(), 'Click')]

// Starts-with
//input[starts-with(@id, 'user')]

// Multiple conditions
//input[@type='text' and @name='email']
//button[@type='submit' or @class='submit-btn']

// Parent/Child/Sibling
//div[@id='parent']//input  // Descendant
//div[@id='parent']/input    // Direct child
//input[@id='username']//following-sibling::button  // Sibling
```

**Example:**
```java
public class LocatorByXPathExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Basic XPath
        WebElement username = driver.findElement(By.xpath("//input[@id='username']"));
        WebElement password = driver.findElement(By.xpath("//input[@name='password']"));
        
        // Contains
        WebElement submitBtn = driver.findElement(By.xpath("//button[contains(@class, 'submit')]"));
        
        // Text
        WebElement link = driver.findElement(By.xpath("//a[text()='Sign In']"));
        
        // Multiple conditions
        WebElement input = driver.findElement(
            By.xpath("//input[@type='text' and @name='email']")
        );
        
        // Parent-child
        WebElement formInput = driver.findElement(
            By.xpath("//form[@id='login-form']//input[@type='text']")
        );
        
        driver.quit();
    }
}
```

---

## 4. findElement() vs findElements() {#find-methods}

### findElement() - Returns Single Element

```java
WebElement element = driver.findElement(By.id("username"));
```

**Characteristics:**
- Returns **first matching element**
- Returns **WebElement** object
- Throws **NoSuchElementException** if not found

**Example:**
```java
try {
    WebElement button = driver.findElement(By.id("submit"));
    button.click();
} catch (NoSuchElementException e) {
    System.out.println("Element not found!");
}
```

---

### findElements() - Returns Multiple Elements

```java
List<WebElement> elements = driver.findElements(By.tagName("a"));
```

**Characteristics:**
- Returns **all matching elements**
- Returns **List<WebElement>**
- Returns **empty list** if no elements found (no exception)

**Example:**
```java
public class FindElementsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Find all links
        List<WebElement> allLinks = driver.findElements(By.tagName("a"));
        
        System.out.println("Total links: " + allLinks.size());
        
        // Check if list is empty
        if (allLinks.isEmpty()) {
            System.out.println("No links found");
        } else {
            // Iterate through all links
            for (WebElement link : allLinks) {
                System.out.println("Link text: " + link.getText());
                System.out.println("Link URL: " + link.getAttribute("href"));
            }
        }
        
        // Find all buttons with specific class
        List<WebElement> buttons = driver.findElements(By.className("btn"));
        System.out.println("Total buttons: " + buttons.size());
        
        // Click first button if exists
        if (!buttons.isEmpty()) {
            buttons.get(0).click();
        }
        
        driver.quit();
    }
}
```

---

### Comparison Table

| Feature | findElement() | findElements() |
|---------|---------------|----------------|
| Return Type | WebElement | List<WebElement> |
| Returns | First match | All matches |
| No Match | Throws NoSuchElementException | Returns empty list |
| Use Case | Single unique element | Multiple elements |

---

## 5. Best Practices {#best-practices}

### 5.1 Locator Priority

**Recommended Order:**
1. **ID** - Most reliable and fast
2. **Name** - Good for forms
3. **CSS Selector** - Flexible and fast
4. **XPath** - Use when others fail

**Avoid:**
- Absolute XPath
- Overly complex selectors
- Brittle locators that break easily

### 5.2 Make Locators Maintainable

```java
// ❌ Bad - Hardcoded locators in tests
public void testLogin() {
    driver.findElement(By.id("user")).sendKeys("test");
    driver.findElement(By.id("pass")).sendKeys("pass");
    driver.findElement(By.id("btn")).click();
}

// ✅ Good - Store locators as constants
public class LoginPage {
    private static final By USERNAME_FIELD = By.id("username");
    private static final By PASSWORD_FIELD = By.id("password");
    private static final By LOGIN_BUTTON = By.id("login-btn");
    
    public void login(String username, String password) {
        driver.findElement(USERNAME_FIELD).sendKeys(username);
        driver.findElement(PASSWORD_FIELD).sendKeys(password);
        driver.findElement(LOGIN_BUTTON).click();
    }
}
```

### 5.3 Handle Dynamic Elements

```java
// Wait for element to be present
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("dynamic-element"))
);
```

### 5.4 Verify Element Exists

```java
// Check if element exists
public boolean isElementPresent(By locator) {
    try {
        driver.findElement(locator);
        return true;
    } catch (NoSuchElementException e) {
        return false;
    }
}

// Or use findElements
public boolean isElementPresent(By locator) {
    return driver.findElements(locator).size() > 0;
}
```

---

## 6. Common Errors and Solutions {#errors}

### Error 1: NoSuchElementException

```
org.openqa.selenium.NoSuchElementException: Unable to locate element
```

**Causes:**
- Element doesn't exist
- Wrong locator
- Element not loaded yet
- Element in iframe

**Solutions:**
```java
// 1. Add wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(
    ExpectedConditions.presenceOfElementLocated(By.id("element"))
);

// 2. Verify locator
System.out.println("Page source: " + driver.getPageSource());

// 3. Check if in iframe
driver.switchTo().frame("frameName");
WebElement element = driver.findElement(By.id("element"));
```

### Error 2: InvalidSelectorException

```
org.openqa.selenium.InvalidSelectorException: invalid selector
```

**Cause:** Syntax error in CSS or XPath

**Solution:**
```java
// ❌ Wrong
driver.findElement(By.cssSelector("input[name=email]"));  // Missing quotes

// ✅ Correct
driver.findElement(By.cssSelector("input[name='email']"));
```

### Error 3: StaleElementReferenceException

```
org.openqa.selenium.StaleElementReferenceException: stale element reference
```

**Cause:** Element was found but DOM changed

**Solution:**
```java
// Re-find the element
WebElement element = driver.findElement(By.id("element"));
element.click();  // Page refreshes
// element.click();  // Would throw StaleElementReferenceException

// Solution: Find again
element = driver.findElement(By.id("element"));
element.click();  // Works
```

---

## 7. Practice Exercises {#exercises}

### Exercise 1: Basic Locators (Easy)

Create a program that navigates to a login page and locates elements using different strategies.

```java
public class Exercise1 {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://practicetestautomation.com/practice-test-login/");
        
        // TODO: Locate username field by ID
        // TODO: Locate password field by name
        // TODO: Locate submit button by ID
        // TODO: Enter credentials and click submit
        
        driver.quit();
    }
}
```

**Solution:**
```java
public class Exercise1Solution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://practicetestautomation.com/practice-test-login/");
        
        // Locate elements
        WebElement usernameField = driver.findElement(By.id("username"));
        WebElement passwordField = driver.findElement(By.name("password"));
        WebElement submitButton = driver.findElement(By.id("submit"));
        
        // Perform actions
        usernameField.sendKeys("student");
        passwordField.sendKeys("Password123");
        submitButton.click();
        
        // Verify
        WebElement successMsg = driver.findElement(By.className("post-title"));
        System.out.println("Success message: " + successMsg.getText());
        
        driver.quit();
    }
}
```

### Exercise 2: Find All Links (Medium)

Write a program to find all links on a page and print their text and URLs.

```java
import java.util.List;

public class Exercise2Solution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.selenium.dev/");
        
        // Find all links
        List<WebElement> allLinks = driver.findElements(By.tagName("a"));
        
        System.out.println("Total links: " + allLinks.size());
        System.out.println("\nLink Details:");
        System.out.println("=".repeat(80));
        
        for (int i = 0; i < allLinks.size(); i++) {
            WebElement link = allLinks.get(i);
            String linkText = link.getText();
            String linkUrl = link.getAttribute("href");
            
            if (!linkText.isEmpty()) {
                System.out.println((i + 1) + ". Text: " + linkText);
                System.out.println("   URL: " + linkUrl);
                System.out.println();
            }
        }
        
        driver.quit();
    }
}
```

### Exercise 3: CSS Selectors (Medium)

Practice using CSS selectors to locate elements.

```java
public class Exercise3Solution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/form");
        
        // CSS Selectors
        WebElement emailById = driver.findElement(By.cssSelector("#email"));
        WebElement submitByClass = driver.findElement(By.cssSelector(".btn-submit"));
        WebElement inputByAttr = driver.findElement(By.cssSelector("input[type='password']"));
        WebElement multiClass = driver.findElement(By.cssSelector(".btn.btn-primary"));
        WebElement childElement = driver.findElement(By.cssSelector("form > input"));
        WebElement descendant = driver.findElement(By.cssSelector("div input"));
        
        // Use elements
        emailById.sendKeys("test@example.com");
        inputByAttr.sendKeys("password123");
        submitByClass.click();
        
        driver.quit();
    }
}
```

### Exercise 4: XPath Practice (Hard)

Use XPath to locate elements with various conditions.

```java
public class Exercise4Solution {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        // Basic XPath
        WebElement element1 = driver.findElement(By.xpath("//input[@id='username']"));
        
        // Contains
        WebElement element2 = driver.findElement(By.xpath("//button[contains(@class, 'submit')]"));
        
        // Text
        WebElement element3 = driver.findElement(By.xpath("//a[text()='Login']"));
        
        // Starts-with
        WebElement element4 = driver.findElement(By.xpath("//input[starts-with(@id, 'user')]"));
        
        // Multiple conditions (AND)
        WebElement element5 = driver.findElement(
            By.xpath("//input[@type='text' and @name='email']")
        );
        
        // Multiple conditions (OR)
        WebElement element6 = driver.findElement(
            By.xpath("//button[@id='submit' or @class='btn-submit']")
        );
        
        // Parent-child
        WebElement element7 = driver.findElement(
            By.xpath("//form[@id='login']//input[@type='text']")
        );
        
        // Following sibling
        WebElement element8 = driver.findElement(
            By.xpath("//label[text()='Email']//following-sibling::input")
        );
        
        driver.quit();
    }
}
```

### Exercise 5: Element Verification (Advanced)

Create utility methods to check element presence and visibility.

```java
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class Exercise5Solution {
    static WebDriver driver;
    static WebDriverWait wait;
    
    public static void main(String[] args) {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("https://example.com");
        
        // Test utility methods
        By loginButton = By.id("login-btn");
        
        if (isElementPresent(loginButton)) {
            System.out.println("Element is present");
        }
        
        if (isElementVisible(loginButton)) {
            System.out.println("Element is visible");
        }
        
        if (isElementClickable(loginButton)) {
            System.out.println("Element is clickable");
            clickElement(loginButton);
        }
        
        driver.quit();
    }
    
    // Check if element exists in DOM
    public static boolean isElementPresent(By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
    
    // Alternative using findElements
    public static boolean isElementPresentAlt(By locator) {
        return driver.findElements(locator).size() > 0;
    }
    
    // Check if element is visible
    public static boolean isElementVisible(By locator) {
        try {
            WebElement element = driver.findElement(locator);
            return element.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
    
    // Check if element is clickable
    public static boolean isElementClickable(By locator) {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(locator));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    // Safe click with wait
    public static void clickElement(By locator) {
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
        element.click();
    }
    
    // Safe send keys with wait
    public static void typeText(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }
}
```

---

## Summary

### Key Takeaways

1. **8 Basic Locators:**
   - ID (fastest, most reliable)
   - Name (good for forms)
   - Class Name (single class only)
   - Tag Name (for element types)
   - Link Text (exact match for links)
   - Partial Link Text (partial match for links)
   - CSS Selector (flexible, fast)
   - XPath (powerful, slower)

2. **findElement() vs findElements():**
   - findElement(): Returns single element, throws exception if not found
   - findElements(): Returns list, returns empty list if not found

3. **Best Practices:**
   - Prefer ID over other locators
   - Use CSS Selector over XPath when possible
   - Avoid absolute XPath
   - Store locators as constants
   - Add waits for dynamic elements

4. **Common Errors:**
   - NoSuchElementException: Element not found
   - InvalidSelectorException: Wrong syntax
   - StaleElementReferenceException: Element changed

### Next Steps

- Practice with real websites
- Learn CSS Selector and XPath in depth
- Understand explicit and implicit waits
- Study Page Object Model pattern

---

**Practice regularly to master locators - they are the foundation of Selenium automation!**