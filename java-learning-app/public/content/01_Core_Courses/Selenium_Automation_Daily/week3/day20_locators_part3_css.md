# Day 20: Locators - Part 3 (CSS Selector)

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

By the end of Day 20, you will be able to:
- Understand what CSS Selectors are and their advantages
- Write CSS Selectors using ID and Class
- Use CSS attribute selectors with various operators
- Apply CSS combinators (descendant, child, sibling)
- Use CSS pseudo-classes (first-child, last-child, nth-child)
- Compare CSS Selectors vs XPath
- Choose between CSS and XPath for different scenarios
- Debug CSS Selectors in browser console
- Write efficient and maintainable CSS Selectors
- Build complex CSS Selectors for real-world scenarios

---

## 📚 Topics Covered

### 1. What are CSS Selectors?

**CSS (Cascading Style Sheets) Selectors** are patterns used to select elements in HTML/XML documents.

#### **Why CSS Selectors?**
- **Fast Performance**: Native browser support, faster than XPath
- **Concise Syntax**: Shorter and cleaner than XPath
- **Readable**: Easy to understand and maintain
- **Modern**: Preferred in modern web automation
- **Industry Standard**: Most popular in automation testing

#### **CSS vs XPath**:

| Feature | CSS Selector | XPath |
|---------|--------------|-------|
| Performance | Faster | Slightly slower |
| Syntax | Shorter, cleaner | Longer |
| Parent navigation | ❌ Cannot go up | ✅ Can navigate up |
| Text matching | ❌ Limited | ✅ Excellent |
| Browser support | ✅ Native | ⚠️ Requires engine |
| Learning curve | Easy | Moderate |
| **Recommendation** | ✅ First choice | ✅ When CSS can't do it |

#### **When to Use CSS**:
- Element has ID or Class
- Attribute-based selection
- Performance is critical
- Simple parent-to-child navigation
- Modern web applications

#### **When to Use XPath Instead**:
- Need parent/ancestor navigation
- Need to match by text content
- Complex sibling navigation
- Multiple conditions with text

---

### 2. Basic CSS Syntax

#### **CSS Selector Structure**:
```css
tagname#id.classname[attribute='value']
```

**Components**:
- `tagname` - HTML tag (input, button, div)
- `#id` - ID selector
- `.classname` - Class selector
- `[attribute='value']` - Attribute selector

#### **Selenium Syntax**:
```java
driver.findElement(By.cssSelector("css-selector"));
```

---

### 3. CSS with ID

ID is the most reliable selector. CSS provides shorthand `#` syntax.

#### **Syntax**:
```css
#id-value
tagname#id-value
```

**HTML**:
```html
<input id="username" type="text" />
<button id="login-btn">Login</button>
<div id="welcome-message">Welcome!</div>
```

**CSS Selectors**:
```java
// Shorthand - any element with ID
driver.findElement(By.cssSelector("#username"));
driver.findElement(By.cssSelector("#login-btn"));
driver.findElement(By.cssSelector("#welcome-message"));

// With tag name (more specific)
driver.findElement(By.cssSelector("input#username"));
driver.findElement(By.cssSelector("button#login-btn"));
driver.findElement(By.cssSelector("div#welcome-message"));
```

#### **Complete Example**:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class CssSelectorById {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // CSS with ID
            WebElement username = driver.findElement(By.cssSelector("#user-name"));
            WebElement password = driver.findElement(By.cssSelector("#password"));
            WebElement loginBtn = driver.findElement(By.cssSelector("#login-button"));

            username.sendKeys("standard_user");
            password.sendKeys("secret_sauce");
            loginBtn.click();

            System.out.println("Login successful using CSS ID selectors");

        } finally {
            driver.quit();
        }
    }
}
```

---

### 4. CSS with Class

Class selector uses `.` (dot) prefix.

#### **Syntax**:
```css
.classname
tagname.classname
.class1.class2  /* Multiple classes */
```

**HTML**:
```html
<button class="btn-primary">Submit</button>
<div class="product-card">Product 1</div>
<a class="nav-link active">Home</a>
```

**CSS Selectors**:
```java
// By class name
driver.findElement(By.cssSelector(".btn-primary"));
driver.findElement(By.cssSelector(".product-card"));
driver.findElement(By.cssSelector(".nav-link"));

// With tag name
driver.findElement(By.cssSelector("button.btn-primary"));
driver.findElement(By.cssSelector("div.product-card"));
driver.findElement(By.cssSelector("a.nav-link"));

// Multiple classes (element must have both)
driver.findElement(By.cssSelector(".nav-link.active"));
driver.findElement(By.cssSelector("a.nav-link.active"));
```

#### **Multiple Classes Example**:
```html
<button class="btn btn-primary btn-large">Click Me</button>
```

```java
// Any element with all three classes
driver.findElement(By.cssSelector(".btn.btn-primary.btn-large"));

// Button with all three classes
driver.findElement(By.cssSelector("button.btn.btn-primary.btn-large"));

// Partial match (any of the classes)
driver.findElement(By.cssSelector("button.btn-primary"));
```

---

### 5. CSS Attribute Selectors

Attribute selectors are powerful for matching elements by their attributes.

#### **Exact Match** `[attribute='value']`:
```css
[attribute='value']
tagname[attribute='value']
```

**HTML**:
```html
<input type="text" name="email" />
<button type="submit">Login</button>
<a href="/home">Home</a>
```

**CSS Selectors**:
```java
// Exact attribute match
driver.findElement(By.cssSelector("input[type='text']"));
driver.findElement(By.cssSelector("input[name='email']"));
driver.findElement(By.cssSelector("button[type='submit']"));
driver.findElement(By.cssSelector("a[href='/home']"));
```

#### **Contains** `[attribute*='value']`:
```css
[attribute*='partial-value']
```

**HTML**:
```html
<input id="user_12345_field" />
<button class="btn btn-primary">Submit</button>
```

**CSS Selectors**:
```java
// Contains 'user_' in ID
driver.findElement(By.cssSelector("input[id*='user_']"));

// Contains 'btn-primary' in class
driver.findElement(By.cssSelector("button[class*='btn-primary']"));
```

#### **Starts With** `[attribute^='value']`:
```css
[attribute^='starting-value']
```

**HTML**:
```html
<input id="user_name" />
<input id="user_email" />
<input id="user_phone" />
```

**CSS Selectors**:
```java
// ID starts with 'user_'
driver.findElement(By.cssSelector("input[id^='user_']"));

// First match of elements starting with 'user_'
driver.findElement(By.cssSelector("input[id^='user_name']"));
```

#### **Ends With** `[attribute$='value']`:
```css
[attribute$='ending-value']
```

**HTML**:
```html
<input id="login_btn" />
<input id="submit_btn" />
<input id="cancel_btn" />
```

**CSS Selectors**:
```java
// ID ends with '_btn'
driver.findElement(By.cssSelector("input[id$='_btn']"));

// Specifically login button
driver.findElement(By.cssSelector("input[id$='login_btn']"));
```

#### **Multiple Attributes**:
```java
// Combine multiple attribute conditions
driver.findElement(By.cssSelector("input[type='text'][name='email']"));
driver.findElement(By.cssSelector("button[type='submit'][class*='btn-primary']"));
```

---

### 6. CSS Combinators

Combinators define relationships between elements.

#### **Descendant Combinator** (space):
```css
parent descendant
```

**Selects any descendant (child, grandchild, etc.)**

**HTML**:
```html
<div class="container">
  <div>
    <input type="text" />
  </div>
</div>
```

**CSS Selectors**:
```java
// Input anywhere inside container
driver.findElement(By.cssSelector("div.container input"));

// More specific
driver.findElement(By.cssSelector("div.container input[type='text']"));
```

#### **Child Combinator** `>`:
```css
parent > child
```

**Selects direct children only**

**HTML**:
```html
<div class="form">
  <input type="text" />      <!-- Direct child -->
  <div>
    <input type="password" /> <!-- NOT direct child -->
  </div>
</div>
```

**CSS Selectors**:
```java
// Only direct child input
driver.findElement(By.cssSelector("div.form > input"));

// This will match text input, not password input
```

#### **Adjacent Sibling** `+`:
```css
element + next-sibling
```

**Selects immediate next sibling**

**HTML**:
```html
<label>Username:</label>
<input type="text" id="username" />
<input type="password" id="password" />
```

**CSS Selectors**:
```java
// Input immediately after label
driver.findElement(By.cssSelector("label + input"));

// Password input after username
driver.findElement(By.cssSelector("#username + input"));
```

#### **General Sibling** `~`:
```css
element ~ siblings
```

**Selects all following siblings**

**HTML**:
```html
<h2>Form</h2>
<input type="text" />
<input type="email" />
<button>Submit</button>
```

**CSS Selectors**:
```java
// All inputs after h2
driver.findElements(By.cssSelector("h2 ~ input"));

// Button after h2
driver.findElement(By.cssSelector("h2 ~ button"));
```

---

### 7. CSS Pseudo-Classes

Pseudo-classes select elements based on their state or position.

#### **:first-child**:
```css
element:first-child
```

**HTML**:
```html
<ul>
  <li>Item 1</li>  <!-- first-child -->
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

**CSS Selectors**:
```java
// First li in any ul
driver.findElement(By.cssSelector("ul > li:first-child"));
```

#### **:last-child**:
```css
element:last-child
```

```java
// Last li in any ul
driver.findElement(By.cssSelector("ul > li:last-child"));
```

#### **:nth-child(n)**:
```css
element:nth-child(n)
```

**n starts from 1**

```java
// Second li
driver.findElement(By.cssSelector("ul > li:nth-child(2)"));

// Third li
driver.findElement(By.cssSelector("ul > li:nth-child(3)"));
```

#### **:nth-of-type(n)**:
```css
element:nth-of-type(n)
```

**HTML**:
```html
<div>
  <p>First paragraph</p>    <!-- nth-of-type(1) -->
  <span>A span</span>
  <p>Second paragraph</p>   <!-- nth-of-type(2) -->
</div>
```

**CSS Selectors**:
```java
// Second p element (ignores span)
driver.findElement(By.cssSelector("div > p:nth-of-type(2)"));
```

#### **:not(selector)**:
```css
element:not(selector)
```

```java
// All inputs except type="hidden"
driver.findElements(By.cssSelector("input:not([type='hidden'])"));

// All divs except class="hidden"
driver.findElements(By.cssSelector("div:not(.hidden)"));
```

---

### 8. CSS Selector Patterns

#### **Combining ID and Class**:
```java
driver.findElement(By.cssSelector("#id.classname"));
driver.findElement(By.cssSelector("div#container.main-content"));
```

#### **Combining Multiple Conditions**:
```java
// Tag + ID + Class + Attribute
driver.findElement(By.cssSelector("input#username.form-control[type='text']"));

// Class + Multiple Attributes
driver.findElement(By.cssSelector(".btn[type='submit'][disabled]"));
```

#### **Complex Hierarchies**:
```java
// Descendant + attribute
driver.findElement(By.cssSelector("div.form input[type='text']"));

// Child + pseudo-class
driver.findElement(By.cssSelector("div.container > div:first-child"));

// Multiple levels
driver.findElement(By.cssSelector("div#main div.form > input[name='email']"));
```

---

### 9. CSS vs XPath Comparison

#### **Same Element - Different Approaches**:

**HTML**:
```html
<div id="container">
  <form class="login-form">
    <input type="text" id="username" name="user" />
  </form>
</div>
```

**CSS Selector**:
```java
// By ID (shortest)
driver.findElement(By.cssSelector("#username"));

// With hierarchy
driver.findElement(By.cssSelector("div#container form.login-form input#username"));

// With attributes
driver.findElement(By.cssSelector("input[type='text'][name='user']"));
```

**XPath**:
```java
// By ID
driver.findElement(By.xpath("//input[@id='username']"));

// With hierarchy
driver.findElement(By.xpath("//div[@id='container']/form[@class='login-form']/input[@id='username']"));

// With attributes
driver.findElement(By.xpath("//input[@type='text' and @name='user']"));
```

#### **When CSS Wins**:
```java
// CSS: Clean and concise
driver.findElement(By.cssSelector("#login-btn"));
driver.findElement(By.cssSelector(".product-card"));
driver.findElement(By.cssSelector("input[type='text']"));

// XPath: More verbose
driver.findElement(By.xpath("//input[@id='login-btn']"));
driver.findElement(By.xpath("//div[@class='product-card']"));
driver.findElement(By.xpath("//input[@type='text']"));
```

#### **When XPath Wins**:
```html
<button>Login</button>
<div>
  <input id="username" />
</div>
```

```java
// XPath: Can match by text
driver.findElement(By.xpath("//button[text()='Login']"));

// XPath: Can navigate to parent
driver.findElement(By.xpath("//input[@id='username']/parent::div"));

// CSS: Cannot do these ❌
```

---

### 10. Testing CSS Selectors in Browser

#### **Chrome DevTools Console**:
```javascript
// Test CSS Selector
$$("css-selector")

// Examples:
$$(".product-card")           // Returns array of elements
$$("input[type='text']")      // All text inputs
$$("div.container > input")   // Direct child inputs

// Check count
$$(".product-card").length

// Get element properties
$$("input[type='text']")[0].value
$$("input[type='text']")[0].getAttribute('name')
```

#### **Quick Testing**:
```javascript
// Does selector work?
$$(".my-selector").length > 0  // true if found

// Is selector unique?
$$(".my-selector").length === 1  // true if unique
```

---

## 💻 Practical Exercises

### Exercise 1: CSS with ID and Class

**📝 Problem Statement:**
Locate elements using CSS ID and Class selectors.

**Requirements:**
- Use CSS with ID (#)
- Use CSS with Class (.)
- Compare with other locator strategies

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise01_CssIdClass {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // CSS with ID
            WebElement username = driver.findElement(By.cssSelector("#user-name"));
            System.out.println("✓ Located by CSS ID: #user-name");

            WebElement password = driver.findElement(By.cssSelector("#password"));
            System.out.println("✓ Located by CSS ID: #password");

            WebElement loginBtn = driver.findElement(By.cssSelector("#login-button"));
            System.out.println("✓ Located by CSS ID: #login-button");

            // CSS with tag and ID
            WebElement usernameSpecific = driver.findElement(By.cssSelector("input#user-name"));
            System.out.println("✓ Located by CSS: input#user-name");

            // Enter credentials
            username.sendKeys("standard_user");
            password.sendKeys("secret_sauce");
            loginBtn.click();

            Thread.sleep(2000);

            // CSS with class
            WebElement title = driver.findElement(By.cssSelector(".title"));
            System.out.println("✓ Page title: " + title.getText());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 2: CSS Attribute Selectors

**📝 Problem Statement:**
Use CSS attribute selectors with different operators.

**Requirements:**
- Use exact match [attribute='value']
- Use contains [attribute*='value']
- Use starts-with [attribute^='value']
- Use ends-with [attribute$='value']

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise02_CssAttributes {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            System.out.println("=== CSS Attribute Selectors ===\n");

            // Exact match
            WebElement input1 = driver.findElement(By.cssSelector("input[type='text']"));
            System.out.println("✓ Exact match: input[type='text']");

            // Multiple attributes
            WebElement input2 = driver.findElement(
                By.cssSelector("input[type='text'][id='user-name']")
            );
            System.out.println("✓ Multiple attributes: input[type='text'][id='user-name']");

            // Contains (*)
            WebElement input3 = driver.findElement(By.cssSelector("input[id*='user']"));
            System.out.println("✓ Contains: input[id*='user']");

            // Starts with (^)
            WebElement input4 = driver.findElement(By.cssSelector("input[id^='user']"));
            System.out.println("✓ Starts with: input[id^='user']");

            // Ends with ($)
            WebElement input5 = driver.findElement(By.cssSelector("input[id$='name']"));
            System.out.println("✓ Ends with: input[id$='name']");

            // Use the element
            input1.sendKeys("standard_user");
            System.out.println("\n✓ Successfully interacted with element");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 3: CSS Combinators

**📝 Problem Statement:**
Practice CSS combinators (descendant, child, sibling).

**Requirements:**
- Use descendant combinator (space)
- Use child combinator (>)
- Use adjacent sibling (+)
- Use general sibling (~)

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise03_CssCombinators {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            System.out.println("=== CSS Combinators ===\n");

            // Descendant combinator (space) - any level
            WebElement descendant = driver.findElement(
                By.cssSelector(".login-box input")
            );
            System.out.println("✓ Descendant: .login-box input");

            // Child combinator (>) - direct child only
            List<WebElement> children = driver.findElements(
                By.cssSelector(".login-box > div")
            );
            System.out.println("✓ Direct children: .login-box > div (" + children.size() + " elements)");

            // Login first for sibling examples
            driver.findElement(By.cssSelector("#user-name")).sendKeys("standard_user");
            driver.findElement(By.cssSelector("#password")).sendKeys("secret_sauce");
            driver.findElement(By.cssSelector("#login-button")).click();

            Thread.sleep(2000);

            // Adjacent sibling (+) - immediately following
            try {
                WebElement adjacent = driver.findElement(
                    By.cssSelector(".inventory_item_name + .inventory_item_desc")
                );
                System.out.println("✓ Adjacent sibling found");
            } catch (Exception e) {
                System.out.println("Note: Adjacent sibling example depends on page structure");
            }

            System.out.println("\n✓ CSS Combinators demonstrated successfully");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 4: CSS Pseudo-Classes

**📝 Problem Statement:**
Use CSS pseudo-classes for element selection.

**Requirements:**
- Use :first-child
- Use :last-child
- Use :nth-child(n)
- Use :not()

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise04_CssPseudoClasses {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Login
            driver.findElement(By.cssSelector("#user-name")).sendKeys("standard_user");
            driver.findElement(By.cssSelector("#password")).sendKeys("secret_sauce");
            driver.findElement(By.cssSelector("#login-button")).click();

            Thread.sleep(2000);

            System.out.println("=== CSS Pseudo-Classes ===\n");

            // Get all products
            List<WebElement> allProducts = driver.findElements(
                By.cssSelector(".inventory_item")
            );
            System.out.println("Total products: " + allProducts.size());

            // First child
            WebElement firstProduct = driver.findElement(
                By.cssSelector(".inventory_list > .inventory_item:first-child")
            );
            System.out.println("✓ First product found using :first-child");

            // Last child
            WebElement lastProduct = driver.findElement(
                By.cssSelector(".inventory_list > .inventory_item:last-child")
            );
            System.out.println("✓ Last product found using :last-child");

            // Nth child (3rd product)
            WebElement thirdProduct = driver.findElement(
                By.cssSelector(".inventory_list > .inventory_item:nth-child(3)")
            );
            System.out.println("✓ Third product found using :nth-child(3)");

            // Not selector - all buttons except 'Remove'
            List<WebElement> addButtons = driver.findElements(
                By.cssSelector("button:not([id*='remove'])")
            );
            System.out.println("✓ 'Add to cart' buttons (not 'Remove'): " + addButtons.size());

            // Click first product's add button
            firstProduct.findElement(By.cssSelector("button")).click();
            System.out.println("\n✓ Added first product to cart");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 5: CSS vs XPath Performance

**📝 Problem Statement:**
Compare CSS Selector and XPath performance.

**Requirements:**
- Locate same element with CSS and XPath
- Measure execution time
- Compare results

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise05_CssVsXPathPerformance {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            System.out.println("=== CSS vs XPath Performance Comparison ===\n");

            // Test 1: By ID
            System.out.println("Test 1: Locating by ID");

            long cssStart = System.currentTimeMillis();
            WebElement cssElement1 = driver.findElement(By.cssSelector("#user-name"));
            long cssEnd = System.currentTimeMillis();
            System.out.println("  CSS:   " + (cssEnd - cssStart) + "ms");

            long xpathStart = System.currentTimeMillis();
            WebElement xpathElement1 = driver.findElement(By.xpath("//input[@id='user-name']"));
            long xpathEnd = System.currentTimeMillis();
            System.out.println("  XPath: " + (xpathEnd - xpathStart) + "ms");

            // Test 2: By attribute
            System.out.println("\nTest 2: Locating by attribute");

            cssStart = System.currentTimeMillis();
            WebElement cssElement2 = driver.findElement(By.cssSelector("input[type='text']"));
            cssEnd = System.currentTimeMillis();
            System.out.println("  CSS:   " + (cssEnd - cssStart) + "ms");

            xpathStart = System.currentTimeMillis();
            WebElement xpathElement2 = driver.findElement(By.xpath("//input[@type='text']"));
            xpathEnd = System.currentTimeMillis();
            System.out.println("  XPath: " + (xpathEnd - xpathStart) + "ms");

            // Test 3: Complex selector
            System.out.println("\nTest 3: Complex selector");

            cssStart = System.currentTimeMillis();
            WebElement cssElement3 = driver.findElement(
                By.cssSelector("div.login-box input[type='text']")
            );
            cssEnd = System.currentTimeMillis();
            System.out.println("  CSS:   " + (cssEnd - cssStart) + "ms");

            xpathStart = System.currentTimeMillis();
            WebElement xpathElement3 = driver.findElement(
                By.xpath("//div[@class='login-box']//input[@type='text']")
            );
            xpathEnd = System.currentTimeMillis();
            System.out.println("  XPath: " + (xpathEnd - xpathStart) + "ms");

            System.out.println("\n=== Conclusion ===");
            System.out.println("✓ CSS Selectors are generally faster");
            System.out.println("✓ Performance difference is minimal for simple locators");
            System.out.println("✓ Choose based on requirements, not just performance");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 6: Complex CSS Selectors

**📝 Problem Statement:**
Create complex CSS selectors for real-world scenarios.

**Requirements:**
- Combine multiple techniques
- Use attributes and pseudo-classes
- Navigate hierarchies

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise06_ComplexCssSelectors {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Login
            driver.findElement(By.cssSelector("#user-name")).sendKeys("standard_user");
            driver.findElement(By.cssSelector("#password")).sendKeys("secret_sauce");
            driver.findElement(By.cssSelector("#login-button")).click();

            Thread.sleep(2000);

            System.out.println("=== Complex CSS Selectors ===\n");

            // Complex 1: Specific button in specific product
            WebElement specificButton = driver.findElement(
                By.cssSelector(".inventory_item:first-child button[id*='add-to-cart']")
            );
            specificButton.click();
            System.out.println("✓ Complex 1: Added first product using complex selector");

            // Complex 2: Combine ID, class, and attribute
            WebElement complex2 = driver.findElement(
                By.cssSelector("div#inventory_container .inventory_item button[id*='add']")
            );
            System.out.println("✓ Complex 2: Found button with combined selectors");

            // Complex 3: Navigation with child and descendant
            WebElement complex3 = driver.findElement(
                By.cssSelector("div.inventory_list > div.inventory_item button")
            );
            System.out.println("✓ Complex 3: Found button using child combinator");

            // Complex 4: Multiple classes and attribute
            WebElement cartBadge = driver.findElement(
                By.cssSelector("a.shopping_cart_link > span.shopping_cart_badge")
            );
            System.out.println("✓ Complex 4: Cart badge: " + cartBadge.getText());

            // Complex 5: Pseudo-class with attributes
            WebElement nthButton = driver.findElement(
                By.cssSelector(".inventory_item:nth-child(2) button[id*='add-to-cart']")
            );
            nthButton.click();
            System.out.println("✓ Complex 5: Added 2nd product using :nth-child()");

            System.out.println("\n✓ All complex CSS selectors worked successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 7: CSS Selector Debugging

**📝 Problem Statement:**
Learn to debug and test CSS selectors.

**Requirements:**
- Test selectors in browser console
- Verify selector uniqueness
- Debug broken selectors

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise07_CssDebugging {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            driver.findElement(By.cssSelector("#user-name")).sendKeys("standard_user");
            driver.findElement(By.cssSelector("#password")).sendKeys("secret_sauce");
            driver.findElement(By.cssSelector("#login-button")).click();

            Thread.sleep(2000);

            System.out.println("=== CSS Selector Debugging ===\n");

            // Method 1: Count matches
            String selector1 = ".inventory_item";
            List<WebElement> results1 = driver.findElements(By.cssSelector(selector1));
            System.out.println("Selector: " + selector1);
            System.out.println("Matches: " + results1.size());
            System.out.println("Is unique? " + (results1.size() == 1));

            // Method 2: Verify element properties
            String selector2 = "button[id*='add-to-cart']";
            WebElement element = driver.findElement(By.cssSelector(selector2));
            System.out.println("\nSelector: " + selector2);
            System.out.println("Tag: " + element.getTagName());
            System.out.println("Text: " + element.getText());
            System.out.println("ID: " + element.getAttribute("id"));

            // Method 3: Test selector variations
            String[] selectors = {
                ".inventory_item",
                "div.inventory_item",
                ".inventory_list > .inventory_item",
                ".inventory_list .inventory_item"
            };

            System.out.println("\n=== Testing Selector Variations ===");
            for (String selector : selectors) {
                int count = driver.findElements(By.cssSelector(selector)).size();
                System.out.println(selector + " → " + count + " matches");
            }

            // Method 4: Highlight element
            JavascriptExecutor js = (JavascriptExecutor) driver;
            WebElement highlightElement = driver.findElement(By.cssSelector(".inventory_item:first-child"));
            js.executeScript("arguments[0].style.border='3px solid red'", highlightElement);
            System.out.println("\n✓ First product highlighted");

            Thread.sleep(3000);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

**Browser Console Commands**:
```javascript
// Test CSS selector
$$(".inventory_item")

// Count matches
$$(".inventory_item").length

// Check if unique
$$(".inventory_item").length === 1

// Get element properties
$$("button[id*='add']")[0].id
$$("button[id*='add']")[0].textContent
```

---

### Exercise 8: CSS for Dynamic Elements

**📝 Problem Statement:**
Handle dynamic attributes using CSS selector operators.

**Requirements:**
- Use contains (*=)
- Use starts-with (^=)
- Use ends-with ($=)
- Handle dynamic IDs

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise08_DynamicCss {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            driver.findElement(By.cssSelector("#user-name")).sendKeys("standard_user");
            driver.findElement(By.cssSelector("#password")).sendKeys("secret_sauce");
            driver.findElement(By.cssSelector("#login-button")).click();

            Thread.sleep(2000);

            System.out.println("=== Dynamic CSS Selectors ===\n");

            // Scenario: IDs have dynamic parts
            // Example: id="add-to-cart-sauce-labs-backpack"

            // Contains (*=) - most flexible
            WebElement product1 = driver.findElement(
                By.cssSelector("button[id*='add-to-cart']")
            );
            System.out.println("✓ Contains: button[id*='add-to-cart']");
            System.out.println("  Found: " + product1.getAttribute("id"));

            // Starts with (^=)
            WebElement product2 = driver.findElement(
                By.cssSelector("button[id^='add-to-cart']")
            );
            System.out.println("\n✓ Starts with: button[id^='add-to-cart']");
            System.out.println("  Found: " + product2.getAttribute("id"));

            // Ends with ($=) - product specific
            WebElement specificProduct = driver.findElement(
                By.cssSelector("button[id$='backpack']")
            );
            System.out.println("\n✓ Ends with: button[id$='backpack']");
            System.out.println("  Found: " + specificProduct.getAttribute("id"));

            // Combine multiple dynamic conditions
            WebElement complex = driver.findElement(
                By.cssSelector("button[id^='add'][id*='cart'][id$='backpack']")
            );
            System.out.println("\n✓ Combined: button[id^='add'][id*='cart'][id$='backpack']");

            // Click using dynamic selector
            product1.click();
            System.out.println("\n✓ Product added using dynamic CSS selector");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 9: CSS Selector Best Practices

**📝 Problem Statement:**
Demonstrate CSS selector best practices.

**Requirements:**
- Show good vs bad selectors
- Document maintainability
- Provide recommendations

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise09_CssBestPractices {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            System.out.println("=== CSS Selector Best Practices ===\n");

            // GOOD: Use ID when available
            WebElement good1 = driver.findElement(By.cssSelector("#user-name"));
            System.out.println("✓ GOOD: #user-name (ID is best)");

            // BAD: Overly specific when ID exists
            WebElement bad1 = driver.findElement(
                By.cssSelector("div.login-box div form div input#user-name")
            );
            System.out.println("✗ BAD: div.login-box div form div input#user-name (too complex)");

            // GOOD: Short and specific
            WebElement good2 = driver.findElement(By.cssSelector("input[type='password']"));
            System.out.println("\n✓ GOOD: input[type='password'] (clear and concise)");

            // BAD: Using index (brittle)
            WebElement bad2 = driver.findElement(
                By.cssSelector("form > div:nth-child(2) > input")
            );
            System.out.println("✗ BAD: form > div:nth-child(2) > input (brittle)");

            // GOOD: Descriptive class
            good1.sendKeys("standard_user");
            good2.sendKeys("secret_sauce");
            driver.findElement(By.cssSelector("#login-button")).click();

            Thread.sleep(2000);

            // GOOD: Combination of stable attributes
            WebElement good3 = driver.findElement(
                By.cssSelector("button[id*='add-to-cart']")
            );
            System.out.println("\n✓ GOOD: button[id*='add-to-cart'] (flexible)");

            // BAD: Too generic
            WebElement bad3 = driver.findElement(By.cssSelector("button"));
            System.out.println("✗ BAD: button (too generic, not unique)");

            System.out.println("\n=== Recommendations ===");
            System.out.println("1. Use ID when available (#id)");
            System.out.println("2. Keep selectors short and readable");
            System.out.println("3. Use stable attributes (not position-based)");
            System.out.println("4. Avoid deep hierarchies");
            System.out.println("5. Document complex selectors");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 10: Complete E-commerce Workflow with CSS

**📝 Problem Statement:**
Automate complete e-commerce workflow using only CSS selectors.

**Requirements:**
- Login using CSS
- Navigate products using CSS
- Add to cart using CSS
- Verify cart using CSS
- Use best practices

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise10_EcommerceWithCss {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            System.out.println("=== E-commerce Automation with CSS ===\n");

            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            // Step 1: Login
            driver.findElement(By.cssSelector("#user-name")).sendKeys("standard_user");
            driver.findElement(By.cssSelector("#password")).sendKeys("secret_sauce");
            driver.findElement(By.cssSelector("#login-button")).click();
            Thread.sleep(2000);
            System.out.println("✓ Step 1: Logged in");

            // Step 2: Count products
            List<WebElement> products = driver.findElements(
                By.cssSelector(".inventory_item")
            );
            System.out.println("✓ Step 2: Found " + products.size() + " products");

            // Step 3: Get first product details
            WebElement firstProduct = driver.findElement(
                By.cssSelector(".inventory_item:first-child")
            );

            String productName = firstProduct.findElement(
                By.cssSelector(".inventory_item_name")
            ).getText();

            String productPrice = firstProduct.findElement(
                By.cssSelector(".inventory_item_price")
            ).getText();

            System.out.println("✓ Step 3: Product: " + productName);
            System.out.println("           Price: " + productPrice);

            // Step 4: Add first product to cart
            firstProduct.findElement(
                By.cssSelector("button[id*='add-to-cart']")
            ).click();
            System.out.println("✓ Step 4: Added to cart");

            // Step 5: Add second product
            driver.findElement(
                By.cssSelector(".inventory_item:nth-child(2) button[id*='add-to-cart']")
            ).click();
            System.out.println("✓ Step 5: Added 2nd product to cart");

            // Step 6: Verify cart badge
            String cartCount = driver.findElement(
                By.cssSelector(".shopping_cart_badge")
            ).getText();
            System.out.println("✓ Step 6: Cart count: " + cartCount);

            // Step 7: Navigate to cart
            driver.findElement(By.cssSelector(".shopping_cart_link")).click();
            Thread.sleep(1000);
            System.out.println("✓ Step 7: Navigated to cart");

            // Step 8: Verify cart items
            List<WebElement> cartItems = driver.findElements(
                By.cssSelector(".cart_item")
            );
            System.out.println("✓ Step 8: Cart contains " + cartItems.size() + " items");

            // Step 9: Verify first product in cart
            String cartProductName = driver.findElement(
                By.cssSelector(".cart_item:first-child .inventory_item_name")
            ).getText();
            System.out.println("✓ Step 9: First item in cart: " + cartProductName);

            // Step 10: Checkout button
            WebElement checkoutBtn = driver.findElement(
                By.cssSelector("button[id*='checkout']")
            );
            System.out.println("✓ Step 10: Checkout button found: " + checkoutBtn.getText());

            if (cartProductName.equals(productName)) {
                System.out.println("\n✓ SUCCESS: Product verification passed!");
            }

            System.out.println("\n=== Automation completed using CSS Selectors! ===");

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

1. **CSS Selector Advantages**:
   - Faster than XPath (native browser support)
   - Shorter, cleaner syntax
   - Easier to read and maintain
   - Industry standard

2. **Core CSS Patterns**:
   ```css
   #id              /* ID selector */
   .class           /* Class selector */
   [attr='value']   /* Attribute selector */
   [attr*='value']  /* Contains */
   [attr^='value']  /* Starts with */
   [attr$='value']  /* Ends with */
   ```

3. **CSS Combinators**:
   ```css
   parent child     /* Descendant */
   parent > child   /* Direct child */
   elem + sibling   /* Adjacent sibling */
   elem ~ siblings  /* General siblings */
   ```

4. **Pseudo-Classes**:
   ```css
   :first-child
   :last-child
   :nth-child(n)
   :nth-of-type(n)
   :not(selector)
   ```

5. **CSS Limitations**:
   - Cannot navigate to parent ❌
   - Limited text matching ❌
   - Cannot use "and/or" logic like XPath ❌

6. **When to Choose CSS**:
   - ID or Class available → CSS
   - Attribute-based → CSS
   - Performance critical → CSS
   - Simple navigation → CSS

7. **When to Choose XPath**:
   - Need parent navigation → XPath
   - Match by text content → XPath
   - Complex conditions → XPath

8. **Best Practices**:
   - Keep selectors short
   - Use stable attributes (ID, data attributes)
   - Avoid position-based selectors
   - Test in browser console first
   - Document complex selectors

---

## 📖 Additional Resources

### Official Documentation:
- [CSS Selectors - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [CSS Selector Reference - W3Schools](https://www.w3schools.com/cssref/css_selectors.asp)
- [Selenium CSS Selectors](https://www.selenium.dev/documentation/test_practices/encouraged/locators/)

### Cheat Sheets:
- [CSS Selectors Cheatsheet](https://devhints.io/css)
- [CSS Selector Reference](https://www.w3.org/TR/selectors-3/)

### Tools:
- **Chrome DevTools**: Test with `$$("css-selector")`
- **ChroPath**: Browser extension
- **SelectorsHub**: Advanced selector tool

### Practice:
```javascript
// In Chrome DevTools Console
$$("css-selector")           // Test selector
$$("css-selector").length    // Count matches
$$("css-selector")[0]        // First element
```

---

## 🧭 Navigation

### Week 3 Progress:
- [Week 3 Overview](README.md)
- [Day 16: Selenium Introduction & Setup](day16_selenium_introduction_setup.md)
- [Day 17: First Selenium Script](day17_first_selenium_script.md)
- [Day 18: Locators - Part 1](day18_locators_part1.md)
- [Day 19: Locators - Part 2 (XPath)](day19_locators_part2_xpath.md)
- **Day 20: Locators - Part 3 (CSS Selector)** ← You are here
- [Day 21: WebElement Interactions](day21_webelement_interactions.md)

### Related Resources:
- [Day 20 Assessment](../../../src/data/assessments/selenium/week3/day20.js)
- [Week 3 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Selenium/Week3_Days15-21_Selenium_Basics.md)

---

## ✅ Day 20 Checklist

Before moving to Day 21, ensure you can:
- [ ] Write CSS selectors with ID (#)
- [ ] Write CSS selectors with Class (.)
- [ ] Use attribute selectors (exact, contains, starts-with, ends-with)
- [ ] Apply CSS combinators (descendant, child, sibling)
- [ ] Use pseudo-classes (first-child, last-child, nth-child)
- [ ] Combine multiple CSS techniques
- [ ] Compare CSS vs XPath
- [ ] Choose appropriate locator strategy
- [ ] Debug CSS in browser console
- [ ] Write maintainable CSS selectors

---

**🎉 Congratulations on completing Day 20!**

You've mastered CSS Selectors - the fastest and most elegant locator strategy! Tomorrow is the final day of Week 3, where you'll learn to interact with web elements - clicking, typing, and retrieving information.

**Next**: [Day 21: WebElement Interactions →](day21_webelement_interactions.md)

---

*Last Updated: 2026-01-12*
