# Day 21: WebElement Interactions

**Week 3: Selenium WebDriver Basics**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 21, you will be able to:
- Understand the WebElement interface and its methods
- Enter text using sendKeys() with different input types
- Clear input fields using clear()
- Perform click operations on buttons, links, and checkboxes
- Retrieve text content using getText()
- Get element attributes using getAttribute()
- Get CSS properties using getCssValue()
- Verify element states: isDisplayed(), isEnabled(), isSelected()
- Submit forms using submit()
- Handle different input types (text, password, email, number)
- Work with checkboxes and radio buttons
- Interact with dropdowns (basic interaction - detailed in Week 4)
- Chain WebElement operations effectively
- Apply best practices for element interactions

---

## 📚 Topics Covered

### 1. WebElement Interface Overview

**WebElement** represents an HTML element on a webpage. Once you locate an element using locators (Days 18-20), you interact with it using WebElement methods.

#### **What is WebElement?**
```java
// Locating returns a WebElement
WebElement element = driver.findElement(By.id("username"));

// Now you can interact with it
element.sendKeys("myusername");
element.click();
String text = element.getText();
```

#### **WebElement vs By**:
```
By.id("username")           →  Locator Strategy (HOW to find)
WebElement                  →  The actual element (WHAT you found)
element.sendKeys()          →  Interaction (WHAT to do)
```

#### **Common WebElement Methods**:

| Method | Return Type | Purpose | Example |
|--------|-------------|---------|---------|
| `sendKeys(CharSequence...)` | void | Enter text | `element.sendKeys("Hello")` |
| `clear()` | void | Clear text field | `element.clear()` |
| `click()` | void | Click element | `element.click()` |
| `submit()` | void | Submit form | `element.submit()` |
| `getText()` | String | Get visible text | `String text = element.getText()` |
| `getAttribute(String)` | String | Get attribute value | `String id = element.getAttribute("id")` |
| `getCssValue(String)` | String | Get CSS property | `String color = element.getCssValue("color")` |
| `getTagName()` | String | Get HTML tag | `String tag = element.getTagName()` |
| `isDisplayed()` | boolean | Check if visible | `if(element.isDisplayed())` |
| `isEnabled()` | boolean | Check if enabled | `if(element.isEnabled())` |
| `isSelected()` | boolean | Check if selected | `if(element.isSelected())` |
| `getSize()` | Dimension | Get element size | `Dimension size = element.getSize()` |
| `getLocation()` | Point | Get element position | `Point point = element.getLocation()` |

---

### 2. sendKeys() - Entering Text

The `sendKeys()` method enters text into input fields.

#### **Basic Syntax**:
```java
element.sendKeys("text to enter");
```

#### **HTML Examples**:
```html
<input type="text" id="username" placeholder="Enter username" />
<input type="password" id="password" placeholder="Enter password" />
<textarea id="comments" rows="5"></textarea>
<input type="email" id="email" />
<input type="number" id="age" />
```

#### **Selenium Code**:
```java
// Text input
WebElement username = driver.findElement(By.id("username"));
username.sendKeys("john_doe");

// Password input
WebElement password = driver.findElement(By.id("password"));
password.sendKeys("SecurePass123");

// Textarea
WebElement comments = driver.findElement(By.id("comments"));
comments.sendKeys("This is a multi-line comment\nLine 2\nLine 3");

// Email input
WebElement email = driver.findElement(By.id("email"));
email.sendKeys("john@example.com");

// Number input
WebElement age = driver.findElement(By.id("age"));
age.sendKeys("25");
```

#### **sendKeys() Special Keys**:
Use `Keys` enum for special keyboard keys:

```java
import org.openqa.selenium.Keys;

// Enter key
element.sendKeys(Keys.ENTER);

// Tab key
element.sendKeys(Keys.TAB);

// Backspace
element.sendKeys(Keys.BACK_SPACE);

// Delete
element.sendKeys(Keys.DELETE);

// Arrows
element.sendKeys(Keys.ARROW_DOWN);
element.sendKeys(Keys.ARROW_UP);

// Keyboard shortcuts (Ctrl+A)
element.sendKeys(Keys.CONTROL + "a");

// Multiple keys
element.sendKeys("Hello", Keys.ENTER);
```

#### **sendKeys() with File Upload**:
```html
<input type="file" id="fileUpload" />
```

```java
WebElement fileInput = driver.findElement(By.id("fileUpload"));
// Provide absolute path to file
fileInput.sendKeys("/Users/username/Documents/file.pdf");
```

#### **Complete Example**:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class SendKeysExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Enter username
            WebElement username = driver.findElement(By.id("user-name"));
            username.sendKeys("standard_user");

            // Enter password
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("secret_sauce");

            // Press Enter to submit (alternative to clicking login button)
            password.sendKeys(Keys.ENTER);

            Thread.sleep(2000);
            System.out.println("✓ Login successful using sendKeys() and Keys.ENTER");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### **Best Practices for sendKeys()**:
- Clear field before entering text: `element.clear(); element.sendKeys("text");`
- Use Keys enum for special keys
- For file uploads, use absolute paths
- Wait for element to be interactable before sendKeys()

---

### 3. clear() - Clearing Text Fields

The `clear()` method removes existing text from input fields.

#### **Syntax**:
```java
element.clear();
```

#### **Why clear() is Important**:
```java
// Without clear() - appends text
element.sendKeys("Hello");
element.sendKeys(" World");  // Result: "Hello World"

// With clear() - replaces text
element.sendKeys("Hello");
element.clear();
element.sendKeys("World");   // Result: "World"
```

#### **Complete Example**:
```java
public class ClearExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            WebElement username = driver.findElement(By.id("user-name"));

            // Enter wrong username
            username.sendKeys("wrong_user");
            System.out.println("Entered: wrong_user");
            Thread.sleep(1000);

            // Clear and enter correct username
            username.clear();
            username.sendKeys("standard_user");
            System.out.println("Cleared and entered: standard_user");

            // Password
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("secret_sauce");

            // Login
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);
            System.out.println("✓ Login successful");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### **Best Practice Pattern**:
```java
// Always clear before entering new text
public void enterText(WebElement element, String text) {
    element.clear();  // Remove existing text
    element.sendKeys(text);  // Enter new text
}
```

---

### 4. click() - Clicking Elements

The `click()` method simulates a mouse click on an element.

#### **Syntax**:
```java
element.click();
```

#### **What Can Be Clicked**:
- Buttons
- Links (`<a>` tags)
- Checkboxes
- Radio buttons
- Images
- Divs (if they have click handlers)
- Any visible and enabled element

#### **HTML Examples**:
```html
<!-- Button -->
<button id="login-btn">Login</button>

<!-- Link -->
<a href="/products" id="products-link">View Products</a>

<!-- Checkbox -->
<input type="checkbox" id="terms" /> Accept Terms

<!-- Radio button -->
<input type="radio" name="gender" value="male" id="male" /> Male

<!-- Image -->
<img src="logo.png" id="logo" alt="Logo" />
```

#### **Selenium Code**:
```java
// Click button
WebElement loginBtn = driver.findElement(By.id("login-btn"));
loginBtn.click();

// Click link
WebElement productsLink = driver.findElement(By.id("products-link"));
productsLink.click();

// Click checkbox
WebElement termsCheckbox = driver.findElement(By.id("terms"));
termsCheckbox.click();

// Click radio button
WebElement maleRadio = driver.findElement(By.id("male"));
maleRadio.click();

// Click image
WebElement logo = driver.findElement(By.id("logo"));
logo.click();
```

#### **Complete Example - Shopping Cart**:
```java
public class ClickExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Login
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);
            System.out.println("✓ Logged in");

            // Click "Add to cart" button for first product
            WebElement addToCartBtn = driver.findElement(
                By.xpath("//button[text()='Add to cart']")
            );
            addToCartBtn.click();
            System.out.println("✓ Added product to cart");

            Thread.sleep(1000);

            // Click shopping cart icon
            WebElement cartIcon = driver.findElement(By.className("shopping_cart_link"));
            cartIcon.click();
            System.out.println("✓ Navigated to cart");

            Thread.sleep(2000);

            // Verify cart page
            String currentUrl = driver.getCurrentUrl();
            if (currentUrl.contains("cart")) {
                System.out.println("✓ Successfully in cart page");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### **Clickability Requirements**:
An element must be:
1. **Displayed**: `element.isDisplayed()` returns true
2. **Enabled**: `element.isEnabled()` returns true
3. **Not obscured**: No other element covering it
4. **In viewport**: Visible on screen (scroll if needed)

#### **Common Click Issues**:
```java
// Issue 1: Element not visible
// Solution: Scroll to element or wait for visibility

// Issue 2: Element obscured by another element
// Solution: Wait for obscuring element to disappear

// Issue 3: Element not yet loaded
// Solution: Use explicit waits (covered in Week 4)
```

---

### 5. getText() - Retrieving Text Content

The `getText()` method retrieves the visible text of an element.

#### **Syntax**:
```java
String text = element.getText();
```

#### **HTML Examples**:
```html
<h1 id="title">Welcome to Automation</h1>
<p id="description">This is a test page.</p>
<button id="submit-btn">Submit Form</button>
<div id="message">Success! Your form was submitted.</div>
```

#### **Selenium Code**:
```java
// Get heading text
WebElement title = driver.findElement(By.id("title"));
String titleText = title.getText();
System.out.println("Title: " + titleText);  // "Welcome to Automation"

// Get paragraph text
WebElement description = driver.findElement(By.id("description"));
String descText = description.getText();
System.out.println("Description: " + descText);  // "This is a test page."

// Get button text
WebElement submitBtn = driver.findElement(By.id("submit-btn"));
String btnText = submitBtn.getText();
System.out.println("Button: " + btnText);  // "Submit Form"

// Get div text
WebElement message = driver.findElement(By.id("message"));
String msgText = message.getText();
System.out.println("Message: " + msgText);  // "Success! Your form was submitted."
```

#### **getText() vs getAttribute("textContent")**:

```html
<div id="sample">
  Visible Text
  <span style="display:none;">Hidden Text</span>
</div>
```

```java
WebElement element = driver.findElement(By.id("sample"));

// getText() - Returns only visible text
String visibleText = element.getText();
System.out.println(visibleText);  // "Visible Text"

// getAttribute("textContent") - Returns all text (including hidden)
String allText = element.getAttribute("textContent");
System.out.println(allText);  // "Visible Text Hidden Text"
```

#### **Complete Example - Verification**:
```java
public class GetTextExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Login
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);

            // Get page title text
            WebElement pageTitle = driver.findElement(By.className("title"));
            String titleText = pageTitle.getText();
            System.out.println("Page Title: " + titleText);

            // Verify we're on products page
            if (titleText.equals("Products")) {
                System.out.println("✓ Verification passed: On Products page");
            } else {
                System.out.println("✗ Verification failed: Expected 'Products', got '" + titleText + "'");
            }

            // Get first product name
            WebElement productName = driver.findElement(By.className("inventory_item_name"));
            String product = productName.getText();
            System.out.println("First Product: " + product);

            // Get first product price
            WebElement productPrice = driver.findElement(By.className("inventory_item_price"));
            String price = productPrice.getText();
            System.out.println("Price: " + price);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### **Important Notes**:
- `getText()` returns **visible** text only
- Returns empty string if element has no text
- Includes text from child elements
- Does not return text from hidden elements
- For input fields, use `getAttribute("value")` instead

---

### 6. getAttribute() - Getting Element Attributes

The `getAttribute()` method retrieves the value of an element's attribute.

#### **Syntax**:
```java
String attrValue = element.getAttribute("attributeName");
```

#### **Common Attributes**:

**HTML Attributes**:
```html
<input type="text" id="username" name="user" class="form-control" placeholder="Enter username" value="john" />
<a href="https://google.com" target="_blank" id="google-link">Google</a>
<img src="logo.png" alt="Company Logo" width="200" />
<button type="submit" disabled>Submit</button>
```

**Getting Attributes**:
```java
// Get id attribute
WebElement input = driver.findElement(By.id("username"));
String id = input.getAttribute("id");
System.out.println("ID: " + id);  // "username"

// Get name attribute
String name = input.getAttribute("name");
System.out.println("Name: " + name);  // "user"

// Get class attribute
String className = input.getAttribute("class");
System.out.println("Class: " + className);  // "form-control"

// Get placeholder
String placeholder = input.getAttribute("placeholder");
System.out.println("Placeholder: " + placeholder);  // "Enter username"

// Get value (for input fields)
String value = input.getAttribute("value");
System.out.println("Value: " + value);  // "john"

// Get href from link
WebElement link = driver.findElement(By.id("google-link"));
String href = link.getAttribute("href");
System.out.println("URL: " + href);  // "https://google.com"

// Get target from link
String target = link.getAttribute("target");
System.out.println("Target: " + target);  // "_blank"

// Get image source
WebElement img = driver.findElement(By.tagName("img"));
String src = img.getAttribute("src");
System.out.println("Image Source: " + src);  // "logo.png"

// Get alt text
String alt = img.getAttribute("alt");
System.out.println("Alt Text: " + alt);  // "Company Logo"

// Check if button is disabled
WebElement button = driver.findElement(By.tagName("button"));
String disabled = button.getAttribute("disabled");
System.out.println("Disabled: " + disabled);  // "true"
```

#### **Special getAttribute() Cases**:

**1. Getting Input Field Values**:
```java
// For input fields, use getAttribute("value")
WebElement inputField = driver.findElement(By.id("username"));
String enteredText = inputField.getAttribute("value");
```

**2. Boolean Attributes**:
```java
// checked, disabled, selected, readonly
String isDisabled = element.getAttribute("disabled");
// Returns "true" if attribute exists, null if it doesn't
```

**3. Custom Data Attributes**:
```html
<div id="product" data-product-id="12345" data-category="electronics">
```

```java
WebElement product = driver.findElement(By.id("product"));
String productId = product.getAttribute("data-product-id");
String category = product.getAttribute("data-category");
```

#### **Complete Example**:
```java
public class GetAttributeExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Get attributes of username field
            WebElement username = driver.findElement(By.id("user-name"));

            System.out.println("=== Username Field Attributes ===");
            System.out.println("ID: " + username.getAttribute("id"));
            System.out.println("Name: " + username.getAttribute("name"));
            System.out.println("Type: " + username.getAttribute("type"));
            System.out.println("Class: " + username.getAttribute("class"));
            System.out.println("Placeholder: " + username.getAttribute("placeholder"));

            // Enter text and get value
            username.sendKeys("standard_user");
            String enteredValue = username.getAttribute("value");
            System.out.println("Entered Value: " + enteredValue);

            // Get button attributes
            WebElement loginBtn = driver.findElement(By.id("login-button"));
            System.out.println("\n=== Login Button Attributes ===");
            System.out.println("ID: " + loginBtn.getAttribute("id"));
            System.out.println("Type: " + loginBtn.getAttribute("type"));
            System.out.println("Class: " + loginBtn.getAttribute("class"));

        } finally {
            driver.quit();
        }
    }
}
```

---

### 7. getCssValue() - Getting CSS Properties

The `getCssValue()` method retrieves the CSS property value of an element.

#### **Syntax**:
```java
String cssValue = element.getCssValue("propertyName");
```

#### **Common CSS Properties**:
```java
// Color
String color = element.getCssValue("color");
String bgColor = element.getCssValue("background-color");

// Font
String fontSize = element.getCssValue("font-size");
String fontFamily = element.getCssValue("font-family");
String fontWeight = element.getCssValue("font-weight");

// Size
String width = element.getCssValue("width");
String height = element.getCssValue("height");

// Border
String border = element.getCssValue("border");
String borderColor = element.getCssValue("border-color");

// Display
String display = element.getCssValue("display");
String visibility = element.getCssValue("visibility");

// Position
String position = element.getCssValue("position");
String top = element.getCssValue("top");
String left = element.getCssValue("left");
```

#### **Complete Example - Verify Styles**:
```java
public class GetCssValueExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            WebElement loginBtn = driver.findElement(By.id("login-button"));

            System.out.println("=== Login Button CSS Properties ===");
            System.out.println("Background Color: " + loginBtn.getCssValue("background-color"));
            System.out.println("Color: " + loginBtn.getCssValue("color"));
            System.out.println("Font Size: " + loginBtn.getCssValue("font-size"));
            System.out.println("Font Family: " + loginBtn.getCssValue("font-family"));
            System.out.println("Border: " + loginBtn.getCssValue("border"));
            System.out.println("Width: " + loginBtn.getCssValue("width"));
            System.out.println("Height: " + loginBtn.getCssValue("height"));
            System.out.println("Display: " + loginBtn.getCssValue("display"));

            // Verify button color
            String bgColor = loginBtn.getCssValue("background-color");
            if (bgColor != null && !bgColor.isEmpty()) {
                System.out.println("✓ Button has background color");
            }

        } finally {
            driver.quit();
        }
    }
}
```

#### **CSS Color Formats**:
```java
// CSS returns colors in rgba format
String color = element.getCssValue("color");
// Result: "rgba(255, 0, 0, 1)" for red
// NOT: "#ff0000" or "red"
```

---

### 8. Element State Verification Methods

Three critical methods to verify element states.

#### **isDisplayed() - Check Visibility**

Returns `true` if element is visible on the page.

**Syntax**:
```java
boolean isVisible = element.isDisplayed();
```

**HTML Example**:
```html
<div id="visible">I am visible</div>
<div id="hidden" style="display:none;">I am hidden</div>
```

**Selenium Code**:
```java
WebElement visible = driver.findElement(By.id("visible"));
WebElement hidden = driver.findElement(By.id("hidden"));

System.out.println(visible.isDisplayed());  // true
System.out.println(hidden.isDisplayed());   // false

// Conditional actions
if (visible.isDisplayed()) {
    visible.click();
    System.out.println("✓ Clicked visible element");
}

if (!hidden.isDisplayed()) {
    System.out.println("✓ Element is hidden as expected");
}
```

#### **isEnabled() - Check if Enabled**

Returns `true` if element is enabled (interactive).

**Syntax**:
```java
boolean isEnabled = element.isEnabled();
```

**HTML Example**:
```html
<input type="text" id="enabled-input" />
<input type="text" id="disabled-input" disabled />
<button id="enabled-btn">Click Me</button>
<button id="disabled-btn" disabled>Disabled</button>
```

**Selenium Code**:
```java
WebElement enabledInput = driver.findElement(By.id("enabled-input"));
WebElement disabledInput = driver.findElement(By.id("disabled-input"));

System.out.println(enabledInput.isEnabled());   // true
System.out.println(disabledInput.isEnabled());  // false

// Only interact with enabled elements
if (enabledInput.isEnabled()) {
    enabledInput.sendKeys("Text");
    System.out.println("✓ Entered text in enabled input");
}

if (!disabledInput.isEnabled()) {
    System.out.println("✓ Input is disabled, cannot interact");
}
```

#### **isSelected() - Check if Selected**

Returns `true` if checkbox or radio button is selected.

**Syntax**:
```java
boolean isSelected = element.isSelected();
```

**HTML Example**:
```html
<input type="checkbox" id="terms" /> Accept Terms
<input type="checkbox" id="newsletter" checked /> Subscribe

<input type="radio" name="gender" value="male" id="male" /> Male
<input type="radio" name="gender" value="female" id="female" checked /> Female
```

**Selenium Code**:
```java
// Checkboxes
WebElement termsCheckbox = driver.findElement(By.id("terms"));
WebElement newsletterCheckbox = driver.findElement(By.id("newsletter"));

System.out.println(termsCheckbox.isSelected());      // false
System.out.println(newsletterCheckbox.isSelected()); // true

// Check checkbox if not already checked
if (!termsCheckbox.isSelected()) {
    termsCheckbox.click();
    System.out.println("✓ Checked terms checkbox");
}

// Radio buttons
WebElement maleRadio = driver.findElement(By.id("male"));
WebElement femaleRadio = driver.findElement(By.id("female"));

System.out.println(maleRadio.isSelected());    // false
System.out.println(femaleRadio.isSelected());  // true

// Select male radio button
if (!maleRadio.isSelected()) {
    maleRadio.click();
    System.out.println("✓ Selected male radio button");
}
```

#### **Complete Example - State Verification**:
```java
public class ElementStateExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://the-internet.herokuapp.com/checkboxes");

            // Find checkboxes
            List<WebElement> checkboxes = driver.findElements(By.cssSelector("input[type='checkbox']"));

            System.out.println("=== Checkbox States ===");
            for (int i = 0; i < checkboxes.size(); i++) {
                WebElement checkbox = checkboxes.get(i);

                System.out.println("\nCheckbox " + (i + 1) + ":");
                System.out.println("  Displayed: " + checkbox.isDisplayed());
                System.out.println("  Enabled: " + checkbox.isEnabled());
                System.out.println("  Selected: " + checkbox.isSelected());

                // Toggle checkbox
                if (!checkbox.isSelected()) {
                    checkbox.click();
                    System.out.println("  ✓ Checked checkbox");
                } else {
                    checkbox.click();
                    System.out.println("  ✓ Unchecked checkbox");
                }

                System.out.println("  New State: " + checkbox.isSelected());
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

### 9. submit() - Submitting Forms

The `submit()` method submits a form element.

#### **Syntax**:
```java
element.submit();
```

#### **submit() vs click()**:

```java
// Using click() - Click the submit button
WebElement submitBtn = driver.findElement(By.id("submit-btn"));
submitBtn.click();

// Using submit() - Submit the form directly
WebElement form = driver.findElement(By.tagName("form"));
form.submit();

// submit() can be called on any form element (input, button, form tag)
WebElement username = driver.findElement(By.id("username"));
username.sendKeys("user");
username.submit();  // Submits the parent form
```

#### **When to Use submit()**:
- When there's no visible submit button
- When you want to submit after filling a field
- When simulating "Enter" key submission

#### **Complete Example**:
```java
public class SubmitExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Method 1: Using click()
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);
            System.out.println("✓ Method 1: Submitted using click()");
            driver.navigate().back();
            Thread.sleep(1000);

            // Method 2: Using submit()
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("secret_sauce");
            password.submit();  // Submits the form

            Thread.sleep(2000);
            System.out.println("✓ Method 2: Submitted using submit()");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### 10. Working with Checkboxes and Radio Buttons

Checkboxes and radio buttons require special handling.

#### **Checkboxes**:

**HTML**:
```html
<input type="checkbox" id="terms" /> Accept Terms and Conditions
<input type="checkbox" id="newsletter" /> Subscribe to Newsletter
```

**Selenium - Basic Operations**:
```java
WebElement termsCheckbox = driver.findElement(By.id("terms"));

// Check if checkbox is selected
if (!termsCheckbox.isSelected()) {
    termsCheckbox.click();  // Check it
}

// Uncheck checkbox
if (termsCheckbox.isSelected()) {
    termsCheckbox.click();  // Uncheck it
}

// Toggle checkbox
termsCheckbox.click();  // Changes state (checked <-> unchecked)
```

**Selenium - Safe Check/Uncheck Methods**:
```java
// Method to check a checkbox
public void checkCheckbox(WebElement checkbox) {
    if (!checkbox.isSelected()) {
        checkbox.click();
    }
}

// Method to uncheck a checkbox
public void uncheckCheckbox(WebElement checkbox) {
    if (checkbox.isSelected()) {
        checkbox.click();
    }
}

// Method to set checkbox state
public void setCheckboxState(WebElement checkbox, boolean state) {
    if (checkbox.isSelected() != state) {
        checkbox.click();
    }
}
```

#### **Radio Buttons**:

**HTML**:
```html
<input type="radio" name="gender" value="male" id="male" /> Male
<input type="radio" name="gender" value="female" id="female" /> Female
<input type="radio" name="gender" value="other" id="other" /> Other
```

**Selenium Operations**:
```java
// Select a radio button
WebElement maleRadio = driver.findElement(By.id("male"));
maleRadio.click();

// Verify selection
if (maleRadio.isSelected()) {
    System.out.println("✓ Male radio button is selected");
}

// Radio buttons in same group - only one can be selected
WebElement femaleRadio = driver.findElement(By.id("female"));
femaleRadio.click();  // Male will be automatically deselected

System.out.println("Male selected: " + maleRadio.isSelected());    // false
System.out.println("Female selected: " + femaleRadio.isSelected()); // true
```

#### **Complete Example**:
```java
public class CheckboxRadioExample {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Checkboxes example
            driver.get("https://the-internet.herokuapp.com/checkboxes");

            List<WebElement> checkboxes = driver.findElements(By.cssSelector("input[type='checkbox']"));

            System.out.println("=== Checkboxes ===");
            System.out.println("Total checkboxes: " + checkboxes.size());

            // Check all checkboxes
            for (WebElement checkbox : checkboxes) {
                if (!checkbox.isSelected()) {
                    checkbox.click();
                }
            }
            System.out.println("✓ All checkboxes checked");

            Thread.sleep(1000);

            // Uncheck all checkboxes
            for (WebElement checkbox : checkboxes) {
                if (checkbox.isSelected()) {
                    checkbox.click();
                }
            }
            System.out.println("✓ All checkboxes unchecked");

            // Radio buttons example (if available on another page)
            // driver.get("url-with-radio-buttons");
            // ... radio button operations

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### 11. Method Chaining Best Practices

#### **Sequential Operations**:
```java
// Find, clear, enter text
WebElement username = driver.findElement(By.id("username"));
username.clear();
username.sendKeys("john_doe");

// Can be written as:
driver.findElement(By.id("username")).clear();
driver.findElement(By.id("username")).sendKeys("john_doe");
// But this finds the element twice - inefficient!

// Better: Store in variable
WebElement username = driver.findElement(By.id("username"));
username.clear();
username.sendKeys("john_doe");
```

#### **Reusable Helper Methods**:
```java
public class WebElementHelper {

    // Clear and enter text
    public void clearAndEnterText(WebElement element, String text) {
        element.clear();
        element.sendKeys(text);
    }

    // Click if displayed and enabled
    public void safeClick(WebElement element) {
        if (element.isDisplayed() && element.isEnabled()) {
            element.click();
        }
    }

    // Check checkbox
    public void checkCheckbox(WebElement checkbox) {
        if (!checkbox.isSelected()) {
            checkbox.click();
        }
    }

    // Get text safely
    public String getTextSafely(WebElement element) {
        if (element.isDisplayed()) {
            return element.getText();
        }
        return "";
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Basic sendKeys() Operations

**📝 Problem Statement:**
Practice entering text into different input field types.

**Requirements:**
- Navigate to a form page
- Enter text in text input
- Enter password in password input
- Enter email in email input
- Use Keys enum for special keys

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise01_SendKeys {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            // Enter username
            WebElement username = driver.findElement(By.id("user-name"));
            username.sendKeys("standard_user");
            System.out.println("✓ Entered username");

            // Enter password
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("secret_sauce");
            System.out.println("✓ Entered password");

            // Submit using ENTER key
            password.sendKeys(Keys.ENTER);
            System.out.println("✓ Submitted form using ENTER key");

            Thread.sleep(2000);

            // Verify login
            if (driver.getCurrentUrl().contains("inventory")) {
                System.out.println("✓ Login successful");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 2: clear() and Replace Text

**📝 Problem Statement:**
Clear existing text and enter new text in input fields.

**Requirements:**
- Enter initial text
- Clear the text
- Enter new text
- Verify the final value

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise02_ClearText {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            WebElement username = driver.findElement(By.id("user-name"));

            // Enter wrong username
            username.sendKeys("wrong_user");
            String value1 = username.getAttribute("value");
            System.out.println("Initial value: " + value1);
            Thread.sleep(1000);

            // Clear
            username.clear();
            System.out.println("✓ Cleared text");
            Thread.sleep(500);

            // Enter correct username
            username.sendKeys("standard_user");
            String value2 = username.getAttribute("value");
            System.out.println("New value: " + value2);

            // Verify
            if ("standard_user".equals(value2)) {
                System.out.println("✓ Text replaced successfully");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 3: click() Multiple Elements

**📝 Problem Statement:**
Click different types of elements (buttons, links, checkboxes).

**Requirements:**
- Click login button
- Click navigation links
- Click Add to Cart button
- Click cart icon

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise03_ClickOperations {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Click login button
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");

            WebElement loginBtn = driver.findElement(By.id("login-button"));
            loginBtn.click();
            System.out.println("✓ Clicked login button");

            Thread.sleep(2000);

            // Click "Add to cart" button
            WebElement addToCartBtn = driver.findElement(
                By.xpath("//button[text()='Add to cart']")
            );
            addToCartBtn.click();
            System.out.println("✓ Clicked Add to Cart button");

            Thread.sleep(1000);

            // Click cart icon (link)
            WebElement cartIcon = driver.findElement(By.className("shopping_cart_link"));
            cartIcon.click();
            System.out.println("✓ Clicked cart icon");

            Thread.sleep(1000);

            // Verify in cart page
            if (driver.getCurrentUrl().contains("cart")) {
                System.out.println("✓ Successfully navigated using clicks");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 4: getText() and Verification

**📝 Problem Statement:**
Extract text from elements and verify content.

**Requirements:**
- Get page title text
- Get product names
- Get prices
- Verify expected values

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise04_GetText {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Login
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);

            // Get page title
            WebElement pageTitle = driver.findElement(By.className("title"));
            String title = pageTitle.getText();
            System.out.println("Page Title: " + title);

            // Verify title
            if ("Products".equals(title)) {
                System.out.println("✓ Title verification passed");
            } else {
                System.out.println("✗ Title verification failed");
            }

            // Get all product names
            List<WebElement> productNames = driver.findElements(
                By.className("inventory_item_name")
            );

            System.out.println("\n=== Product Names ===");
            for (int i = 0; i < productNames.size(); i++) {
                String name = productNames.get(i).getText();
                System.out.println((i + 1) + ". " + name);
            }

            // Get all prices
            List<WebElement> prices = driver.findElements(
                By.className("inventory_item_price")
            );

            System.out.println("\n=== Prices ===");
            for (int i = 0; i < prices.size(); i++) {
                String price = prices.get(i).getText();
                System.out.println((i + 1) + ". " + price);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 5: getAttribute() for Element Properties

**📝 Problem Statement:**
Extract and verify element attributes.

**Requirements:**
- Get id, name, class, type attributes
- Get value attribute from input fields
- Get href from links
- Verify attributes match expected values

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise05_GetAttribute {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Get username field attributes
            WebElement username = driver.findElement(By.id("user-name"));

            System.out.println("=== Username Field Attributes ===");
            System.out.println("ID: " + username.getAttribute("id"));
            System.out.println("Name: " + username.getAttribute("name"));
            System.out.println("Type: " + username.getAttribute("type"));
            System.out.println("Class: " + username.getAttribute("class"));
            System.out.println("Placeholder: " + username.getAttribute("placeholder"));

            // Enter text and get value
            username.sendKeys("standard_user");
            String value = username.getAttribute("value");
            System.out.println("Value after sendKeys: " + value);

            // Verify value
            if ("standard_user".equals(value)) {
                System.out.println("✓ Value attribute verification passed");
            }

            // Get button attributes
            WebElement loginBtn = driver.findElement(By.id("login-button"));

            System.out.println("\n=== Login Button Attributes ===");
            System.out.println("ID: " + loginBtn.getAttribute("id"));
            System.out.println("Type: " + loginBtn.getAttribute("type"));
            System.out.println("Class: " + loginBtn.getAttribute("class"));
            System.out.println("Value: " + loginBtn.getAttribute("value"));

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 6: getCssValue() for Styling

**📝 Problem Statement:**
Extract CSS properties of elements.

**Requirements:**
- Get color, font-size, width, height
- Get background-color
- Print all CSS values

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise06_GetCssValue {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            WebElement loginBtn = driver.findElement(By.id("login-button"));

            System.out.println("=== Login Button CSS Properties ===");
            System.out.println("Background Color: " + loginBtn.getCssValue("background-color"));
            System.out.println("Color: " + loginBtn.getCssValue("color"));
            System.out.println("Font Size: " + loginBtn.getCssValue("font-size"));
            System.out.println("Font Family: " + loginBtn.getCssValue("font-family"));
            System.out.println("Font Weight: " + loginBtn.getCssValue("font-weight"));
            System.out.println("Border: " + loginBtn.getCssValue("border"));
            System.out.println("Width: " + loginBtn.getCssValue("width"));
            System.out.println("Height: " + loginBtn.getCssValue("height"));
            System.out.println("Display: " + loginBtn.getCssValue("display"));
            System.out.println("Text Align: " + loginBtn.getCssValue("text-align"));

            // Verify button has background color
            String bgColor = loginBtn.getCssValue("background-color");
            if (bgColor != null && !bgColor.isEmpty()) {
                System.out.println("\n✓ Button has background color");
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 7: isDisplayed(), isEnabled(), isSelected()

**📝 Problem Statement:**
Verify element states using state verification methods.

**Requirements:**
- Check if elements are displayed
- Check if elements are enabled
- Check checkbox selection states
- Perform conditional actions based on states

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise07_ElementStates {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            // Test isDisplayed() and isEnabled()
            driver.get("https://www.saucedemo.com");

            WebElement username = driver.findElement(By.id("user-name"));
            WebElement password = driver.findElement(By.id("password"));
            WebElement loginBtn = driver.findElement(By.id("login-button"));

            System.out.println("=== Element States ===");
            System.out.println("Username displayed: " + username.isDisplayed());
            System.out.println("Username enabled: " + username.isEnabled());
            System.out.println("Login button displayed: " + loginBtn.isDisplayed());
            System.out.println("Login button enabled: " + loginBtn.isEnabled());

            // Conditional interaction
            if (username.isDisplayed() && username.isEnabled()) {
                username.sendKeys("standard_user");
                System.out.println("✓ Entered username (element is displayed and enabled)");
            }

            if (password.isDisplayed() && password.isEnabled()) {
                password.sendKeys("secret_sauce");
                System.out.println("✓ Entered password (element is displayed and enabled)");
            }

            if (loginBtn.isDisplayed() && loginBtn.isEnabled()) {
                loginBtn.click();
                System.out.println("✓ Clicked login button (element is displayed and enabled)");
            }

            Thread.sleep(2000);

            // Test isSelected() with checkboxes
            driver.get("https://the-internet.herokuapp.com/checkboxes");

            List<WebElement> checkboxes = driver.findElements(
                By.cssSelector("input[type='checkbox']")
            );

            System.out.println("\n=== Checkbox States ===");
            for (int i = 0; i < checkboxes.size(); i++) {
                WebElement checkbox = checkboxes.get(i);
                System.out.println("Checkbox " + (i + 1) + " selected: " + checkbox.isSelected());

                // Check if not selected
                if (!checkbox.isSelected()) {
                    checkbox.click();
                    System.out.println("  ✓ Checked checkbox " + (i + 1));
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 8: Checkbox Operations

**📝 Problem Statement:**
Perform check, uncheck, and toggle operations on checkboxes.

**Requirements:**
- Find all checkboxes
- Check all unchecked boxes
- Uncheck all checked boxes
- Toggle checkbox states

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise08_CheckboxOperations {

    // Helper method to check checkbox
    public static void checkCheckbox(WebElement checkbox) {
        if (!checkbox.isSelected()) {
            checkbox.click();
        }
    }

    // Helper method to uncheck checkbox
    public static void uncheckCheckbox(WebElement checkbox) {
        if (checkbox.isSelected()) {
            checkbox.click();
        }
    }

    // Helper method to set checkbox state
    public static void setCheckboxState(WebElement checkbox, boolean state) {
        if (checkbox.isSelected() != state) {
            checkbox.click();
        }
    }

    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://the-internet.herokuapp.com/checkboxes");

            List<WebElement> checkboxes = driver.findElements(
                By.cssSelector("input[type='checkbox']")
            );

            System.out.println("Total checkboxes: " + checkboxes.size());

            // Print initial states
            System.out.println("\n=== Initial States ===");
            for (int i = 0; i < checkboxes.size(); i++) {
                System.out.println("Checkbox " + (i + 1) + ": " +
                    (checkboxes.get(i).isSelected() ? "Checked" : "Unchecked"));
            }

            // Check all checkboxes
            System.out.println("\n=== Checking All Checkboxes ===");
            for (WebElement checkbox : checkboxes) {
                checkCheckbox(checkbox);
            }

            for (int i = 0; i < checkboxes.size(); i++) {
                System.out.println("Checkbox " + (i + 1) + ": " +
                    (checkboxes.get(i).isSelected() ? "Checked" : "Unchecked"));
            }

            Thread.sleep(1000);

            // Uncheck all checkboxes
            System.out.println("\n=== Unchecking All Checkboxes ===");
            for (WebElement checkbox : checkboxes) {
                uncheckCheckbox(checkbox);
            }

            for (int i = 0; i < checkboxes.size(); i++) {
                System.out.println("Checkbox " + (i + 1) + ": " +
                    (checkboxes.get(i).isSelected() ? "Checked" : "Unchecked"));
            }

            Thread.sleep(1000);

            // Set specific states
            System.out.println("\n=== Setting Specific States ===");
            setCheckboxState(checkboxes.get(0), true);   // Check first
            setCheckboxState(checkboxes.get(1), false);  // Uncheck second

            for (int i = 0; i < checkboxes.size(); i++) {
                System.out.println("Checkbox " + (i + 1) + ": " +
                    (checkboxes.get(i).isSelected() ? "Checked" : "Unchecked"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 9: Complete Form Automation

**📝 Problem Statement:**
Automate filling and submitting a complete form.

**Requirements:**
- Fill all form fields (text, email, password)
- Select checkboxes
- Submit form
- Verify submission

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise09_CompleteFormAutomation {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            System.out.println("=== Form Automation Started ===\n");

            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            // Step 1: Fill username
            WebElement username = driver.findElement(By.id("user-name"));
            if (username.isDisplayed() && username.isEnabled()) {
                username.clear();
                username.sendKeys("standard_user");
                System.out.println("✓ Step 1: Entered username");

                // Verify entered value
                String usernameValue = username.getAttribute("value");
                System.out.println("  Verification: Username = " + usernameValue);
            }

            // Step 2: Fill password
            WebElement password = driver.findElement(By.id("password"));
            if (password.isDisplayed() && password.isEnabled()) {
                password.clear();
                password.sendKeys("secret_sauce");
                System.out.println("✓ Step 2: Entered password");

                String passwordValue = password.getAttribute("value");
                System.out.println("  Verification: Password length = " + passwordValue.length());
            }

            // Step 3: Verify button state
            WebElement loginBtn = driver.findElement(By.id("login-button"));
            System.out.println("\n=== Button State ===");
            System.out.println("Displayed: " + loginBtn.isDisplayed());
            System.out.println("Enabled: " + loginBtn.isEnabled());
            System.out.println("Text: " + loginBtn.getAttribute("value"));

            // Step 4: Submit form
            if (loginBtn.isDisplayed() && loginBtn.isEnabled()) {
                loginBtn.click();
                System.out.println("\n✓ Step 3: Submitted form");
            }

            Thread.sleep(2000);

            // Step 5: Verify submission
            String currentUrl = driver.getCurrentUrl();
            if (currentUrl.contains("inventory")) {
                System.out.println("✓ Step 4: Form submission successful");
                System.out.println("  Current URL: " + currentUrl);

                // Get page title
                WebElement pageTitle = driver.findElement(By.className("title"));
                String title = pageTitle.getText();
                System.out.println("  Page Title: " + title);

                if ("Products".equals(title)) {
                    System.out.println("✓ Step 5: Verification complete - On correct page");
                }
            }

            System.out.println("\n=== Form Automation Completed Successfully ===");

        } catch (Exception e) {
            System.err.println("✗ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 10: Shopping Cart Workflow

**📝 Problem Statement:**
Automate adding products to cart and verifying cart contents.

**Requirements:**
- Login to application
- Add multiple products to cart
- Navigate to cart
- Verify cart items
- Get product details (name, price)

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise10_ShoppingCartWorkflow {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            System.out.println("=== Shopping Cart Automation ===\n");

            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            // Step 1: Login
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();
            Thread.sleep(2000);
            System.out.println("✓ Step 1: Logged in successfully");

            // Step 2: Get product details before adding
            WebElement firstProduct = driver.findElement(
                By.className("inventory_item_name")
            );
            String productName = firstProduct.getText();

            WebElement firstPrice = driver.findElement(
                By.className("inventory_item_price")
            );
            String productPrice = firstPrice.getText();

            System.out.println("\n=== Product Details ===");
            System.out.println("Product: " + productName);
            System.out.println("Price: " + productPrice);

            // Step 3: Add first product to cart
            WebElement addToCartBtn = driver.findElement(
                By.xpath("//button[text()='Add to cart']")
            );
            addToCartBtn.click();
            System.out.println("\n✓ Step 2: Added first product to cart");

            Thread.sleep(500);

            // Step 4: Add second product
            List<WebElement> addButtons = driver.findElements(
                By.xpath("//button[text()='Add to cart']")
            );
            if (addButtons.size() > 0) {
                addButtons.get(0).click();
                System.out.println("✓ Step 3: Added second product to cart");
            }

            Thread.sleep(500);

            // Step 5: Verify cart badge
            WebElement cartBadge = driver.findElement(By.className("shopping_cart_badge"));
            String cartCount = cartBadge.getText();
            System.out.println("\n=== Cart Badge ===");
            System.out.println("Items in cart: " + cartCount);

            // Step 6: Navigate to cart
            WebElement cartIcon = driver.findElement(By.className("shopping_cart_link"));
            cartIcon.click();
            Thread.sleep(1000);
            System.out.println("\n✓ Step 4: Navigated to cart page");

            // Step 7: Verify cart contents
            List<WebElement> cartItems = driver.findElements(By.className("cart_item"));
            System.out.println("\n=== Cart Contents ===");
            System.out.println("Total items in cart: " + cartItems.size());

            // Get first item details in cart
            WebElement cartProductName = driver.findElement(
                By.className("inventory_item_name")
            );
            String cartProduct = cartProductName.getText();

            WebElement cartProductPrice = driver.findElement(
                By.className("inventory_item_price")
            );
            String cartPrice = cartProductPrice.getText();

            System.out.println("\nFirst Cart Item:");
            System.out.println("  Name: " + cartProduct);
            System.out.println("  Price: " + cartPrice);

            // Step 8: Verification
            if (cartProduct.equals(productName) && cartPrice.equals(productPrice)) {
                System.out.println("\n✓ Step 5: Product verification passed!");
                System.out.println("  Product in cart matches product added");
            }

            System.out.println("\n=== Shopping Cart Automation Completed ===");

        } catch (Exception e) {
            System.err.println("✗ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 11: Search Functionality

**📝 Problem Statement:**
Automate search functionality on a website.

**Requirements:**
- Enter search term
- Submit search
- Verify search results

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise11_SearchFunctionality {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.wikipedia.org");
            driver.manage().window().maximize();

            System.out.println("=== Search Functionality Test ===\n");

            // Find search box
            WebElement searchBox = driver.findElement(By.id("searchInput"));

            // Verify search box state
            System.out.println("Search box displayed: " + searchBox.isDisplayed());
            System.out.println("Search box enabled: " + searchBox.isEnabled());

            // Enter search term
            String searchTerm = "Selenium (software)";
            searchBox.clear();
            searchBox.sendKeys(searchTerm);
            System.out.println("\n✓ Entered search term: " + searchTerm);

            // Verify entered value
            String enteredValue = searchBox.getAttribute("value");
            System.out.println("Verification: Search box value = " + enteredValue);

            // Submit search using ENTER key
            searchBox.sendKeys(Keys.ENTER);
            System.out.println("✓ Submitted search");

            Thread.sleep(3000);

            // Verify search results
            String pageTitle = driver.getTitle();
            System.out.println("\n=== Search Results ===");
            System.out.println("Page Title: " + pageTitle);

            if (pageTitle.contains("Selenium")) {
                System.out.println("✓ Search successful - Results page loaded");
            }

            // Get page heading
            WebElement heading = driver.findElement(By.id("firstHeading"));
            String headingText = heading.getText();
            System.out.println("Page Heading: " + headingText);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 12: Create Reusable Helper Class

**📝 Problem Statement:**
Create a utility class with reusable WebElement interaction methods.

**Requirements:**
- clearAndType() method
- safeClick() method
- checkCheckbox() method
- getTextSafely() method
- waitAndClick() method (basic version)

**Solution:**
```java
package com.automation.utils;

import org.openqa.selenium.WebElement;

public class WebElementHelper {

    /**
     * Clear and enter text in input field
     */
    public static void clearAndType(WebElement element, String text) {
        element.clear();
        element.sendKeys(text);
        System.out.println("✓ Cleared and entered: " + text);
    }

    /**
     * Click element only if displayed and enabled
     */
    public static void safeClick(WebElement element) {
        if (element.isDisplayed() && element.isEnabled()) {
            element.click();
            System.out.println("✓ Clicked element safely");
        } else {
            System.out.println("✗ Element not clickable");
        }
    }

    /**
     * Check checkbox only if not already checked
     */
    public static void checkCheckbox(WebElement checkbox) {
        if (!checkbox.isSelected()) {
            checkbox.click();
            System.out.println("✓ Checked checkbox");
        } else {
            System.out.println("ℹ Checkbox already checked");
        }
    }

    /**
     * Uncheck checkbox only if checked
     */
    public static void uncheckCheckbox(WebElement checkbox) {
        if (checkbox.isSelected()) {
            checkbox.click();
            System.out.println("✓ Unchecked checkbox");
        } else {
            System.out.println("ℹ Checkbox already unchecked");
        }
    }

    /**
     * Get text only if element is displayed
     */
    public static String getTextSafely(WebElement element) {
        if (element.isDisplayed()) {
            return element.getText();
        }
        return "";
    }

    /**
     * Get attribute value safely
     */
    public static String getAttributeSafely(WebElement element, String attribute) {
        try {
            return element.getAttribute(attribute);
        } catch (Exception e) {
            System.out.println("✗ Could not get attribute: " + attribute);
            return "";
        }
    }

    /**
     * Verify element state
     */
    public static boolean isElementReady(WebElement element) {
        return element.isDisplayed() && element.isEnabled();
    }

    /**
     * Set checkbox to specific state
     */
    public static void setCheckboxState(WebElement checkbox, boolean state) {
        if (checkbox.isSelected() != state) {
            checkbox.click();
            System.out.println("✓ Set checkbox state to: " + state);
        }
    }

    /**
     * Highlight element for debugging (using JavaScript)
     */
    public static void highlightElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.border='3px solid red'", element);
        System.out.println("✓ Highlighted element");
    }
}
```

**Usage Example**:
```java
package com.automation.tests;

import com.automation.utils.WebElementHelper;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise12_HelperClassUsage {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Using helper methods
            WebElement username = driver.findElement(By.id("user-name"));
            WebElement password = driver.findElement(By.id("password"));
            WebElement loginBtn = driver.findElement(By.id("login-button"));

            // Clear and type
            WebElementHelper.clearAndType(username, "standard_user");
            WebElementHelper.clearAndType(password, "secret_sauce");

            // Safe click
            WebElementHelper.safeClick(loginBtn);

            Thread.sleep(2000);

            // Get text safely
            WebElement pageTitle = driver.findElement(By.className("title"));
            String title = WebElementHelper.getTextSafely(pageTitle);
            System.out.println("Page Title: " + title);

            System.out.println("\n✓ Helper class methods work correctly");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 13: Element State Verification Suite

**📝 Problem Statement:**
Create comprehensive element state verification tests.

**Requirements:**
- Verify visibility of all form elements
- Verify enabled state
- Test interactions based on states
- Print detailed state report

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.ArrayList;
import java.util.List;

public class Exercise13_ElementStateVerification {

    static class ElementState {
        String name;
        boolean displayed;
        boolean enabled;
        String tagName;

        ElementState(String name, boolean displayed, boolean enabled, String tagName) {
            this.name = name;
            this.displayed = displayed;
            this.enabled = enabled;
            this.tagName = tagName;
        }

        @Override
        public String toString() {
            return String.format("%-20s | %-10s | %-10s | %-10s | %s",
                name,
                tagName,
                displayed ? "✓ Visible" : "✗ Hidden",
                enabled ? "✓ Enabled" : "✗ Disabled",
                (displayed && enabled) ? "READY" : "NOT READY"
            );
        }
    }

    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            System.out.println("=== Element State Verification Suite ===\n");

            List<ElementState> states = new ArrayList<>();

            // Username field
            WebElement username = driver.findElement(By.id("user-name"));
            states.add(new ElementState(
                "Username Field",
                username.isDisplayed(),
                username.isEnabled(),
                username.getTagName()
            ));

            // Password field
            WebElement password = driver.findElement(By.id("password"));
            states.add(new ElementState(
                "Password Field",
                password.isDisplayed(),
                password.isEnabled(),
                password.getTagName()
            ));

            // Login button
            WebElement loginBtn = driver.findElement(By.id("login-button"));
            states.add(new ElementState(
                "Login Button",
                loginBtn.isDisplayed(),
                loginBtn.isEnabled(),
                loginBtn.getTagName()
            ));

            // Print report
            System.out.println(String.format("%-20s | %-10s | %-10s | %-10s | %s",
                "Element", "Tag", "Visibility", "State", "Status"));
            System.out.println("=".repeat(80));

            int readyCount = 0;
            for (ElementState state : states) {
                System.out.println(state);
                if (state.displayed && state.enabled) {
                    readyCount++;
                }
            }

            System.out.println("\n=== Summary ===");
            System.out.println("Total Elements: " + states.size());
            System.out.println("Ready for Interaction: " + readyCount);
            System.out.println("Not Ready: " + (states.size() - readyCount));

            // Interact only with ready elements
            System.out.println("\n=== Performing Actions ===");
            if (username.isDisplayed() && username.isEnabled()) {
                username.sendKeys("standard_user");
                System.out.println("✓ Entered username");
            }

            if (password.isDisplayed() && password.isEnabled()) {
                password.sendKeys("secret_sauce");
                System.out.println("✓ Entered password");
            }

            if (loginBtn.isDisplayed() && loginBtn.isEnabled()) {
                loginBtn.click();
                System.out.println("✓ Clicked login button");
            }

            Thread.sleep(2000);
            System.out.println("\n✓ All state verifications completed successfully");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 14: Dynamic Form Filling

**📝 Problem Statement:**
Create a data-driven approach to fill forms dynamically.

**Requirements:**
- Store form data in HashMap
- Loop through fields and fill dynamically
- Verify each field after filling
- Print detailed report

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.HashMap;
import java.util.Map;

public class Exercise14_DynamicFormFilling {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            System.out.println("=== Dynamic Form Filling ===\n");

            // Store form data in HashMap
            Map<String, String> formData = new HashMap<>();
            formData.put("user-name", "standard_user");
            formData.put("password", "secret_sauce");

            // Fill form dynamically
            System.out.println("=== Filling Form Fields ===");
            for (Map.Entry<String, String> entry : formData.entrySet()) {
                String fieldId = entry.getKey();
                String fieldValue = entry.getValue();

                try {
                    WebElement field = driver.findElement(By.id(fieldId));

                    // Verify field state
                    if (!field.isDisplayed()) {
                        System.out.println("✗ Field '" + fieldId + "' is not displayed");
                        continue;
                    }

                    if (!field.isEnabled()) {
                        System.out.println("✗ Field '" + fieldId + "' is not enabled");
                        continue;
                    }

                    // Fill field
                    field.clear();
                    field.sendKeys(fieldValue);

                    // Verify entered value
                    String enteredValue = field.getAttribute("value");
                    if (enteredValue.equals(fieldValue)) {
                        System.out.println("✓ Field '" + fieldId + "': " +
                            "*".repeat(fieldValue.length()) + " (verified)");
                    } else {
                        System.out.println("✗ Field '" + fieldId + "': Verification failed");
                    }

                } catch (Exception e) {
                    System.out.println("✗ Field '" + fieldId + "': " + e.getMessage());
                }
            }

            // Submit form
            System.out.println("\n=== Submitting Form ===");
            WebElement loginBtn = driver.findElement(By.id("login-button"));

            if (loginBtn.isDisplayed() && loginBtn.isEnabled()) {
                loginBtn.click();
                System.out.println("✓ Form submitted");

                Thread.sleep(2000);

                // Verify submission
                if (driver.getCurrentUrl().contains("inventory")) {
                    System.out.println("✓ Form submission successful");
                } else {
                    System.out.println("✗ Form submission failed");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 15: Complete End-to-End User Flow

**📝 Problem Statement:**
Automate complete user journey from login to checkout.

**Requirements:**
- Login to application
- Browse products and get details
- Add multiple products to cart
- Navigate to cart and verify contents
- Proceed to checkout information
- Interact with all form elements along the way

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise15_EndToEndUserFlow {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            System.out.println("=== End-to-End User Flow Automation ===\n");

            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            // ===== STEP 1: LOGIN =====
            System.out.println("STEP 1: Login");
            WebElement username = driver.findElement(By.id("user-name"));
            WebElement password = driver.findElement(By.id("password"));

            username.clear();
            username.sendKeys("standard_user");
            System.out.println("  ✓ Entered username");

            password.clear();
            password.sendKeys("secret_sauce");
            System.out.println("  ✓ Entered password");

            driver.findElement(By.id("login-button")).click();
            Thread.sleep(2000);
            System.out.println("  ✓ Logged in successfully\n");

            // ===== STEP 2: BROWSE PRODUCTS =====
            System.out.println("STEP 2: Browse Products");
            WebElement pageTitle = driver.findElement(By.className("title"));
            System.out.println("  Page: " + pageTitle.getText());

            List<WebElement> products = driver.findElements(By.className("inventory_item"));
            System.out.println("  Total products: " + products.size());

            // Get details of first 3 products
            List<WebElement> productNames = driver.findElements(By.className("inventory_item_name"));
            List<WebElement> productPrices = driver.findElements(By.className("inventory_item_price"));

            System.out.println("\n  Product Details:");
            for (int i = 0; i < Math.min(3, productNames.size()); i++) {
                System.out.println("    " + (i + 1) + ". " +
                    productNames.get(i).getText() + " - " +
                    productPrices.get(i).getText());
            }
            System.out.println();

            // ===== STEP 3: ADD TO CART =====
            System.out.println("STEP 3: Add Products to Cart");
            List<WebElement> addButtons = driver.findElements(
                By.xpath("//button[text()='Add to cart']")
            );

            int itemsToAdd = Math.min(2, addButtons.size());
            for (int i = 0; i < itemsToAdd; i++) {
                addButtons.get(i).click();
                System.out.println("  ✓ Added product " + (i + 1) + " to cart");
                Thread.sleep(500);
            }

            // Verify cart badge
            WebElement cartBadge = driver.findElement(By.className("shopping_cart_badge"));
            String cartCount = cartBadge.getText();
            System.out.println("  Cart count: " + cartCount + "\n");

            // ===== STEP 4: VIEW CART =====
            System.out.println("STEP 4: View Shopping Cart");
            WebElement cartIcon = driver.findElement(By.className("shopping_cart_link"));
            cartIcon.click();
            Thread.sleep(1000);
            System.out.println("  ✓ Navigated to cart page");

            // Verify cart contents
            List<WebElement> cartItems = driver.findElements(By.className("cart_item"));
            System.out.println("  Items in cart: " + cartItems.size());

            // Get cart item details
            List<WebElement> cartProductNames = driver.findElements(
                By.className("inventory_item_name")
            );
            List<WebElement> cartPrices = driver.findElements(
                By.className("inventory_item_price")
            );

            System.out.println("\n  Cart Contents:");
            for (int i = 0; i < cartProductNames.size(); i++) {
                System.out.println("    " + (i + 1) + ". " +
                    cartProductNames.get(i).getText() + " - " +
                    cartPrices.get(i).getText());
            }
            System.out.println();

            // ===== STEP 5: PROCEED TO CHECKOUT =====
            System.out.println("STEP 5: Proceed to Checkout");
            WebElement checkoutBtn = driver.findElement(By.id("checkout"));

            if (checkoutBtn.isDisplayed() && checkoutBtn.isEnabled()) {
                checkoutBtn.click();
                Thread.sleep(1000);
                System.out.println("  ✓ Clicked checkout button");
            }

            // ===== STEP 6: FILL CHECKOUT INFO =====
            System.out.println("\nSTEP 6: Fill Checkout Information");
            WebElement firstName = driver.findElement(By.id("first-name"));
            WebElement lastName = driver.findElement(By.id("last-name"));
            WebElement zipCode = driver.findElement(By.id("postal-code"));

            firstName.sendKeys("John");
            System.out.println("  ✓ Entered first name");

            lastName.sendKeys("Doe");
            System.out.println("  ✓ Entered last name");

            zipCode.sendKeys("12345");
            System.out.println("  ✓ Entered zip code");

            // Verify entered data
            System.out.println("\n  Verification:");
            System.out.println("    First Name: " + firstName.getAttribute("value"));
            System.out.println("    Last Name: " + lastName.getAttribute("value"));
            System.out.println("    Zip Code: " + zipCode.getAttribute("value"));

            // Continue to next step
            WebElement continueBtn = driver.findElement(By.id("continue"));
            if (continueBtn.isDisplayed() && continueBtn.isEnabled()) {
                continueBtn.click();
                Thread.sleep(1000);
                System.out.println("\n  ✓ Proceeded to overview page");
            }

            // ===== STEP 7: VERIFY OVERVIEW =====
            System.out.println("\nSTEP 7: Verify Checkout Overview");
            WebElement overviewTitle = driver.findElement(By.className("title"));
            System.out.println("  Page: " + overviewTitle.getText());

            List<WebElement> overviewItems = driver.findElements(By.className("cart_item"));
            System.out.println("  Items to purchase: " + overviewItems.size());

            System.out.println("\n=== End-to-End Flow Completed Successfully ===");

        } catch (Exception e) {
            System.err.println("✗ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 🔑 Key Takeaways

1. **WebElement Interface**:
   - Represents HTML elements on webpage
   - Returned by `driver.findElement()` and `driver.findElements()`
   - Provides methods to interact with elements

2. **Input Operations**:
   - `sendKeys()` - Enter text (supports Keys enum for special keys)
   - `clear()` - Remove existing text
   - Always clear before entering new text: `element.clear(); element.sendKeys("text");`

3. **Click Operations**:
   - `click()` - Simulate mouse click
   - Works on buttons, links, checkboxes, radio buttons
   - Element must be displayed and enabled

4. **Text Retrieval**:
   - `getText()` - Get visible text content
   - `getAttribute("value")` - Get input field value
   - `getAttribute("attributeName")` - Get any attribute value

5. **CSS Properties**:
   - `getCssValue("propertyName")` - Get CSS property value
   - Colors returned in rgba format
   - Useful for UI verification

6. **Element States**:
   - `isDisplayed()` - Check visibility
   - `isEnabled()` - Check if interactive
   - `isSelected()` - Check checkbox/radio selection
   - Always verify state before interaction

7. **Form Operations**:
   - `submit()` - Submit form
   - Works on any form element
   - Alternative to clicking submit button

8. **Checkbox/Radio Patterns**:
   ```java
   // Check checkbox only if unchecked
   if (!checkbox.isSelected()) {
       checkbox.click();
   }

   // Uncheck checkbox only if checked
   if (checkbox.isSelected()) {
       checkbox.click();
   }
   ```

9. **Best Practices**:
   - Store element in variable if using multiple times
   - Verify element state before interaction
   - Use helper methods for common operations
   - Clear fields before entering text
   - Use descriptive variable names
   - Handle exceptions appropriately

10. **Common Patterns**:
    ```java
    // Clear and type
    element.clear();
    element.sendKeys("text");

    // Safe click
    if (element.isDisplayed() && element.isEnabled()) {
        element.click();
    }

    // Get text safely
    if (element.isDisplayed()) {
        String text = element.getText();
    }
    ```

---

## 📖 Additional Resources

### Official Documentation:
- [WebElement Interface](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebElement.html)
- [Selenium WebDriver Interactions](https://www.selenium.dev/documentation/webdriver/elements/interactions/)
- [Keys Enum Documentation](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/Keys.html)

### Practice Websites:
- https://www.saucedemo.com - E-commerce practice
- https://the-internet.herokuapp.com - Various scenarios
- https://demoqa.com/automation-practice-form - Form practice
- https://www.wikipedia.org - Search and navigation

### Video Tutorials:
- Search "Selenium WebElement Methods" on YouTube
- "Selenium sendKeys Examples"
- "Selenium Element Interactions Tutorial"

---

## 🧭 Navigation

### Week 3 Progress:
- [Week 3 Overview](README.md)
- [Day 16: Selenium Introduction & Setup](day16_selenium_introduction_setup.md)
- [Day 17: First Selenium Script](day17_first_selenium_script.md)
- [Day 18: Locators - Part 1](day18_locators_part1.md)
- [Day 19: Locators - Part 2 (XPath)](day19_locators_part2_xpath.md)
- [Day 20: Locators - Part 3 (CSS Selector)](day20_locators_part3_css.md)
- **Day 21: WebElement Interactions** ← You are here

### Related Resources:
- [Day 21 Assessment](../../../src/data/assessments/selenium/week3/day21.js)
- [Week 3 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Selenium/Week3_Days15-21_Selenium_Basics.md)

---

## ✅ Day 21 Checklist

Before moving to Week 4, ensure you can:
- [ ] Use sendKeys() to enter text
- [ ] Use sendKeys() with Keys enum for special keys
- [ ] Clear input fields using clear()
- [ ] Click buttons, links, and checkboxes
- [ ] Retrieve text using getText()
- [ ] Get attributes using getAttribute()
- [ ] Get CSS properties using getCssValue()
- [ ] Verify visibility with isDisplayed()
- [ ] Verify enabled state with isEnabled()
- [ ] Check selection with isSelected()
- [ ] Submit forms using submit()
- [ ] Handle checkboxes (check/uncheck)
- [ ] Select radio buttons
- [ ] Create reusable helper methods
- [ ] Automate complete workflows

---

**🎉 Congratulations on completing Day 21 and Week 3!**

You've mastered WebElement interactions - the foundation of browser automation! You can now locate any element using locators (Days 18-20) and interact with them using WebElement methods. Next week, you'll learn about synchronization, waits, and handling dynamic web applications.

**Next**: Week 4 begins with advanced Selenium topics!

---

*Last Updated: 2026-01-12*
