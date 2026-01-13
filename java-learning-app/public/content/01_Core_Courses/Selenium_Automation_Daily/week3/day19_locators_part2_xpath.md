# Day 19: Locators - Part 2 (XPath)

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

By the end of Day 19, you will be able to:
- Understand what XPath is and why it's powerful
- Differentiate between Absolute and Relative XPath
- Write basic XPath expressions with tags and attributes
- Use XPath functions (text(), contains(), starts-with(), normalize-space())
- Apply XPath operators (and, or)
- Navigate using XPath axes (parent, child, following-sibling, preceding-sibling, ancestor, descendant)
- Create dynamic XPath for elements with changing attributes
- Locate elements in tables using XPath
- Handle complex DOM structures with XPath
- Debug and test XPath in browser console

---

## 📚 Topics Covered

### 1. What is XPath?

**XPath (XML Path Language)** is a query language for selecting nodes from an XML/HTML document.

#### **Why XPath?**
- **Most Powerful**: Can locate ANY element on ANY webpage
- **Flexible**: Multiple ways to reach same element
- **Dynamic**: Handle changing attributes
- **Navigation**: Traverse DOM tree (parent, child, sibling)
- **Complex Queries**: Combine multiple conditions

#### **When to Use XPath**:
- Element has no ID, Name, or Class
- Need to navigate based on text content
- Need to find parent or sibling elements
- Need dynamic locators for changing attributes
- Complex DOM structures

#### **XPath Analogy**:
Think of XPath like file paths on your computer:
- `/Users/Documents/file.txt` - Absolute path (from root)
- `Documents/file.txt` - Relative path (from current location)

---

### 2. Absolute vs Relative XPath

Understanding the difference is **CRITICAL** for writing maintainable automation.

#### **Absolute XPath** (DON'T USE ❌):
```xpath
/html/body/div[1]/div[2]/div[1]/form/input[1]
```

**Characteristics**:
- Starts with single `/` (from root)
- Uses complete path from `<html>` tag
- Brittle - breaks if HTML structure changes
- Long and unreadable

**Example HTML**:
```html
<html>
  <body>
    <div>
      <div>
        <input id="username" />
      </div>
    </div>
  </body>
</html>
```

**Absolute XPath**:
```java
driver.findElement(By.xpath("/html/body/div/div/input"));
// ❌ BAD - Will break if structure changes
```

#### **Relative XPath** (ALWAYS USE ✅):
```xpath
//input[@id='username']
```

**Characteristics**:
- Starts with double `//` (anywhere in document)
- Searches entire document
- Flexible - less likely to break
- Short and readable

**Relative XPath**:
```java
driver.findElement(By.xpath("//input[@id='username']"));
// ✅ GOOD - Flexible and readable
```

#### **Comparison**:

| Feature | Absolute XPath | Relative XPath |
|---------|----------------|----------------|
| Starts with | `/` | `//` |
| Path | Complete from root | Anywhere in document |
| Maintainability | Poor | Excellent |
| Readability | Low | High |
| Performance | Slightly faster | Fast enough |
| **Recommendation** | ❌ Never use | ✅ Always use |

---

### 3. Basic XPath Syntax

#### **Syntax Components**:
```xpath
//tagname[@attribute='value']
```

- `//` - Search anywhere in document
- `tagname` - HTML tag (input, button, div, etc.)
- `[@attribute='value']` - Condition to match

#### **Basic Examples**:

**HTML**:
```html
<input id="username" name="user" type="text" />
<button id="login-btn" class="btn-primary">Login</button>
<a href="/home" class="nav-link">Home</a>
```

**XPath Examples**:
```java
// By tag and ID attribute
driver.findElement(By.xpath("//input[@id='username']"));

// By tag and name attribute
driver.findElement(By.xpath("//input[@name='user']"));

// By tag and type attribute
driver.findElement(By.xpath("//input[@type='text']"));

// By tag and class attribute
driver.findElement(By.xpath("//button[@class='btn-primary']"));

// By tag and href attribute
driver.findElement(By.xpath("//a[@href='/home']"));
```

#### **Wildcard - Any Tag**:
```java
// * means any tag
driver.findElement(By.xpath("//*[@id='username']"));
// Matches any tag with id='username'
```

---

### 4. XPath with Multiple Attributes

Combine multiple attributes for more specific selection.

#### **Using AND Operator**:
```xpath
//tagname[@attribute1='value1' and @attribute2='value2']
```

**Example**:
```html
<input id="email" type="text" name="email" class="form-control" />
```

```java
// Multiple conditions with 'and'
driver.findElement(By.xpath("//input[@id='email' and @type='text']"));
driver.findElement(By.xpath("//input[@name='email' and @class='form-control']"));
driver.findElement(By.xpath("//input[@id='email' and @type='text' and @name='email']"));
```

#### **Using OR Operator**:
```xpath
//tagname[@attribute1='value1' or @attribute2='value2']
```

**Example**:
```java
// Matches if either condition is true
driver.findElement(By.xpath("//input[@id='email' or @name='email']"));
driver.findElement(By.xpath("//button[@id='submit' or @id='login']"));
```

---

### 5. XPath Functions

XPath functions make locators more flexible and powerful.

#### **text() - Match by Text Content**:
```xpath
//tagname[text()='exact text']
```

**HTML**:
```html
<button>Login</button>
<a>Sign Up</a>
<span>Welcome, User!</span>
```

**XPath**:
```java
// Match exact text
driver.findElement(By.xpath("//button[text()='Login']"));
driver.findElement(By.xpath("//a[text()='Sign Up']"));
driver.findElement(By.xpath("//span[text()='Welcome, User!']"));
```

#### **contains() - Partial Match**:
```xpath
//tagname[contains(@attribute, 'partial-value')]
//tagname[contains(text(), 'partial-text')]
```

**HTML**:
```html
<input id="user_12345_field" />
<button class="btn btn-primary btn-large">Submit</button>
<p>Welcome to our amazing website</p>
```

**XPath**:
```java
// Contains in attribute - for dynamic IDs
driver.findElement(By.xpath("//input[contains(@id, 'user_')]"));
driver.findElement(By.xpath("//input[contains(@id, '_field')]"));

// Contains in class
driver.findElement(By.xpath("//button[contains(@class, 'btn-primary')]"));

// Contains in text
driver.findElement(By.xpath("//p[contains(text(), 'Welcome')]"));
driver.findElement(By.xpath("//p[contains(text(), 'amazing')]"));
```

**Use Case - Dynamic IDs**:
```html
<!-- ID changes each session -->
<div id="msg_12345">Message</div>
<div id="msg_67890">Message</div>
```

```java
// Static part is 'msg_'
driver.findElement(By.xpath("//div[contains(@id, 'msg_')]"));
```

#### **starts-with() - Match Beginning**:
```xpath
//tagname[starts-with(@attribute, 'starting-value')]
```

**HTML**:
```html
<input id="user_name_field" />
<input id="user_email_field" />
<input id="user_phone_field" />
```

**XPath**:
```java
// All start with 'user_'
driver.findElement(By.xpath("//input[starts-with(@id, 'user_name')]"));
driver.findElement(By.xpath("//input[starts-with(@id, 'user_email')]"));
driver.findElement(By.xpath("//input[starts-with(@id, 'user_')]")); // Matches all three
```

#### **normalize-space() - Handle Whitespace**:
```xpath
//tagname[normalize-space(text())='text with spaces handled']
```

**HTML**:
```html
<button>  Login  </button>
<p>Welcome    User</p>
```

**XPath**:
```java
// Without normalize-space - won't match due to extra spaces
driver.findElement(By.xpath("//button[text()='  Login  ']")); // Must match exactly

// With normalize-space - handles extra spaces
driver.findElement(By.xpath("//button[normalize-space(text())='Login']")); // ✓ Works
driver.findElement(By.xpath("//p[normalize-space(text())='Welcome User']")); // ✓ Works
```

---

### 6. XPath Axes

Axes allow you to navigate the DOM tree relative to a node.

#### **XPath Axes Diagram**:
```
                    ancestor
                        ↑
                    ancestor
                        ↑
    preceding-sibling ← parent → following-sibling
                        ↓
                  current node
                   ↙    ↓    ↘
              child  child  child
                        ↓
                   descendant
```

#### **Most Useful Axes**:

**1. parent - Select Parent Element**:
```xpath
//element[@attribute='value']/parent::tagname
```

**HTML**:
```html
<div class="container">
  <input id="username" />
</div>
```

**XPath**:
```java
// Find input's parent div
driver.findElement(By.xpath("//input[@id='username']/parent::div"));
```

**2. child - Select Child Elements**:
```xpath
//parent-element/child::child-element
```

**HTML**:
```html
<form id="login-form">
  <input type="text" />
  <input type="password" />
  <button>Submit</button>
</form>
```

**XPath**:
```java
// Find all children of form
List<WebElement> children = driver.findElements(By.xpath("//form[@id='login-form']/child::*"));

// Find specific child
driver.findElement(By.xpath("//form[@id='login-form']/child::button"));
```

**3. following-sibling - Next Siblings**:
```xpath
//element[@attribute='value']/following-sibling::tagname
```

**HTML**:
```html
<input id="username" />
<input id="password" />
<button id="login">Login</button>
```

**XPath**:
```java
// Find siblings after username
driver.findElement(By.xpath("//input[@id='username']/following-sibling::input")); // password
driver.findElement(By.xpath("//input[@id='username']/following-sibling::button")); // login
```

**4. preceding-sibling - Previous Siblings**:
```xpath
//element[@attribute='value']/preceding-sibling::tagname
```

**HTML**:
```html
<label>Username:</label>
<input id="username" />
```

**XPath**:
```java
// Find label before input
driver.findElement(By.xpath("//input[@id='username']/preceding-sibling::label"));
```

**5. ancestor - Parent and Above**:
```xpath
//element[@attribute='value']/ancestor::tagname
```

**HTML**:
```html
<div class="page">
  <div class="form-section">
    <form id="login">
      <input id="username" />
    </form>
  </div>
</div>
```

**XPath**:
```java
// Find ancestor div with class 'page'
driver.findElement(By.xpath("//input[@id='username']/ancestor::div[@class='page']"));

// Find ancestor form
driver.findElement(By.xpath("//input[@id='username']/ancestor::form"));
```

**6. descendant - All Descendants**:
```xpath
//element[@attribute='value']/descendant::tagname
```

**HTML**:
```html
<div id="container">
  <div>
    <input type="text" />
  </div>
  <div>
    <input type="password" />
  </div>
</div>
```

**XPath**:
```java
// Find all input descendants
List<WebElement> inputs = driver.findElements(
    By.xpath("//div[@id='container']/descendant::input")
);
```

---

### 7. XPath with Index

Use index to select specific element from multiple matches.

#### **Syntax**:
```xpath
(//tagname[@attribute='value'])[index]
```

**Note**: XPath index starts from **1**, not 0!

**HTML**:
```html
<div class="product">Product 1</div>
<div class="product">Product 2</div>
<div class="product">Product 3</div>
```

**XPath**:
```java
// Select first product
driver.findElement(By.xpath("(//div[@class='product'])[1]"));

// Select second product
driver.findElement(By.xpath("(//div[@class='product'])[2]"));

// Select last product
driver.findElement(By.xpath("(//div[@class='product'])[last()]"));

// Select second-to-last
driver.findElement(By.xpath("(//div[@class='product'])[last()-1]"));
```

#### **Important - Parentheses Required**:
```java
// WRONG - applies index to entire path
//div[@class='product'][2] // Means: div with class='product' AND is 2nd child

// CORRECT - applies index to result set
(//div[@class='product'])[2] // Means: 2nd element from all matching divs
```

---

### 8. XPath for Tables

Tables are common in web applications. XPath makes table navigation easy.

#### **Table Structure**:
```html
<table id="users">
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>John Doe</td>
    <td>john@example.com</td>
    <td><button>Edit</button></td>
  </tr>
  <tr>
    <td>Jane Smith</td>
    <td>jane@example.com</td>
    <td><button>Edit</button></td>
  </tr>
</table>
```

#### **Table XPath Examples**:

**Select Specific Row**:
```java
// First data row (skip header)
driver.findElement(By.xpath("//table[@id='users']/tbody/tr[1]"));

// Second data row
driver.findElement(By.xpath("//table[@id='users']/tbody/tr[2]"));
```

**Select Specific Cell**:
```java
// Row 1, Column 2 (Email)
driver.findElement(By.xpath("//table[@id='users']/tbody/tr[1]/td[2]"));

// Row 2, Column 1 (Name)
driver.findElement(By.xpath("//table[@id='users']/tbody/tr[2]/td[1]"));
```

**Find Row by Cell Content**:
```java
// Find row where name is "John Doe"
driver.findElement(By.xpath("//table[@id='users']//tr[td[text()='John Doe']]"));

// Find row where email contains "jane"
driver.findElement(By.xpath("//table[@id='users']//tr[td[contains(text(),'jane')]]"));
```

**Click Button in Specific Row**:
```java
// Click Edit button for John Doe
driver.findElement(By.xpath(
    "//table[@id='users']//tr[td[text()='John Doe']]//button[text()='Edit']"
)).click();

// Click Edit button in row 2
driver.findElement(By.xpath(
    "//table[@id='users']/tbody/tr[2]//button"
)).click();
```

**Get All Cell Values in Column**:
```java
// Get all names (column 1)
List<WebElement> names = driver.findElements(
    By.xpath("//table[@id='users']/tbody/tr/td[1]")
);

// Get all emails (column 2)
List<WebElement> emails = driver.findElements(
    By.xpath("//table[@id='users']/tbody/tr/td[2]")
);
```

---

### 9. Dynamic XPath Strategies

Real-world applications have dynamic IDs and attributes. Handle them with smart XPath.

#### **Problem - Dynamic IDs**:
```html
<!-- ID changes on each page load -->
<div id="user_12345">Welcome</div>
<!-- Next load -->
<div id="user_67890">Welcome</div>
```

#### **Solution 1 - contains()**:
```java
// Match any ID containing 'user_'
driver.findElement(By.xpath("//div[contains(@id, 'user_')]"));
```

#### **Solution 2 - starts-with()**:
```java
// Match ID starting with 'user_'
driver.findElement(By.xpath("//div[starts-with(@id, 'user_')]"));
```

#### **Solution 3 - Use text()**:
```java
// If text is stable
driver.findElement(By.xpath("//div[text()='Welcome']"));
```

#### **Solution 4 - Multiple attributes**:
```java
// Use other stable attributes
driver.findElement(By.xpath("//div[@class='welcome-msg' and contains(@id, 'user_')]"));
```

#### **Complex Dynamic Scenario**:
```html
<div id="product_list_123" class="product-container active" data-type="featured">
  <div class="product-item" data-id="456">
    <span class="name">Product Name</span>
    <button class="add-to-cart">Add to Cart</button>
  </div>
</div>
```

```java
// Strategy: Combine multiple stable attributes
driver.findElement(By.xpath(
    "//div[contains(@id, 'product_list') and @class='product-container']" +
    "//button[contains(@class, 'add-to-cart')]"
));

// Or use data attributes (usually stable)
driver.findElement(By.xpath(
    "//div[@data-type='featured']//div[@data-id='456']//button"
));
```

---

### 10. XPath Best Practices

#### **✅ DO**:
1. Always use relative XPath (`//`)
2. Use unique attributes (id, name) when available
3. Combine multiple attributes for specificity
4. Use `contains()` for dynamic attributes
5. Test XPath in browser console before using in code
6. Keep XPath as short as possible
7. Use meaningful comments for complex XPath

#### **❌ DON'T**:
1. Don't use absolute XPath (`/html/body/div...`)
2. Don't use index unless necessary
3. Don't make XPath too complex
4. Don't rely on position if content is dynamic
5. Don't use generated XPath from browser (usually absolute)

#### **Testing XPath in Browser**:
```javascript
// Chrome DevTools Console
$x("//input[@id='username']")  // Returns array of matching elements

// Check if XPath works
$x("//input[@id='username']").length  // Should return 1

// Get element properties
$x("//input[@id='username']")[0].value
$x("//input[@id='username']")[0].getAttribute('class')
```

---

## 💻 Practical Exercises

### Exercise 1: Basic XPath with Attributes

**📝 Problem Statement:**
Locate elements using XPath with different attributes.

**Requirements:**
- Use https://www.saucedemo.com
- Locate elements using XPath
- Use different attributes (id, name, class, type)

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise01_BasicXPath {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // XPath with ID
            WebElement username = driver.findElement(By.xpath("//input[@id='user-name']"));
            System.out.println("✓ Located username by XPath with ID");

            // XPath with name
            WebElement password = driver.findElement(By.xpath("//input[@name='password']"));
            System.out.println("✓ Located password by XPath with name");

            // XPath with type
            WebElement loginBtn = driver.findElement(By.xpath("//input[@type='submit']"));
            System.out.println("✓ Located login button by XPath with type");

            // XPath with class
            WebElement container = driver.findElement(By.xpath("//div[@class='login-box']"));
            System.out.println("✓ Located container by XPath with class");

            // Enter credentials
            username.sendKeys("standard_user");
            password.sendKeys("secret_sauce");
            loginBtn.click();

            Thread.sleep(2000);
            System.out.println("✓ Login successful using XPath locators");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 2: XPath with text()

**📝 Problem Statement:**
Locate elements by their text content using text() function.

**Requirements:**
- Find elements by exact text
- Use text() function
- Click elements found by text

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise02_XPathText {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Login first
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);

            // Find button by exact text
            WebElement addToCartBtn = driver.findElement(
                By.xpath("//button[text()='Add to cart']")
            );
            System.out.println("✓ Found button with text: " + addToCartBtn.getText());
            addToCartBtn.click();

            Thread.sleep(1000);

            // Find link by text
            WebElement cartLink = driver.findElement(
                By.xpath("//a[@class='shopping_cart_link']")
            );
            cartLink.click();

            System.out.println("✓ Navigated to cart using XPath with text");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 3: XPath with contains()

**📝 Problem Statement:**
Use contains() function to handle dynamic attributes and partial text.

**Requirements:**
- Use contains() with attributes
- Use contains() with text
- Handle dynamic IDs

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise03_XPathContains {
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

            // contains() with class attribute
            List<WebElement> products = driver.findElements(
                By.xpath("//div[contains(@class, 'inventory_item')]")
            );
            System.out.println("✓ Found " + products.size() + " products using contains()");

            // contains() with text
            WebElement productWithText = driver.findElement(
                By.xpath("//div[contains(text(), 'Sauce Labs')]")
            );
            System.out.println("✓ Found product: " + productWithText.getText());

            // contains() for dynamic id (if id had dynamic part)
            WebElement item = driver.findElement(
                By.xpath("//div[contains(@class, 'inventory') and contains(@class, 'item')]")
            );
            System.out.println("✓ Found element with combined contains()");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 4: XPath with Multiple Conditions (AND)

**📝 Problem Statement:**
Combine multiple conditions using 'and' operator.

**Requirements:**
- Use 'and' to combine conditions
- Make XPath more specific
- Locate elements precisely

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise04_XPathAnd {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Single condition
            WebElement username1 = driver.findElement(
                By.xpath("//input[@id='user-name']")
            );
            System.out.println("✓ Found with single condition");

            // Multiple conditions with AND
            WebElement username2 = driver.findElement(
                By.xpath("//input[@id='user-name' and @name='user-name']")
            );
            System.out.println("✓ Found with two conditions (AND)");

            // Three conditions
            WebElement username3 = driver.findElement(
                By.xpath("//input[@id='user-name' and @name='user-name' and @type='text']")
            );
            System.out.println("✓ Found with three conditions (AND)");

            // Combining attribute and contains()
            WebElement input = driver.findElement(
                By.xpath("//input[@type='text' and contains(@class, 'input')]")
            );
            System.out.println("✓ Found with attribute AND contains()");

            username3.sendKeys("standard_user");
            System.out.println("✓ Successfully interacted with element");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 5: XPath with OR Operator

**📝 Problem Statement:**
Use 'or' operator to match multiple conditions.

**Requirements:**
- Use 'or' operator
- Match if any condition is true
- Demonstrate flexibility

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise05_XPathOr {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // OR condition - matches if either is true
            WebElement username = driver.findElement(
                By.xpath("//input[@id='user-name' or @name='username']")
            );
            System.out.println("✓ Found using OR (first condition matched)");

            // OR with multiple options
            WebElement loginBtn = driver.findElement(
                By.xpath("//input[@id='login-button' or @id='submit' or @type='submit']")
            );
            System.out.println("✓ Found login button using multiple OR conditions");

            // Combine AND and OR
            WebElement element = driver.findElement(
                By.xpath("//input[(@id='user-name' or @name='user-name') and @type='text']")
            );
            System.out.println("✓ Found using combined AND and OR");

            username.sendKeys("standard_user");
            System.out.println("✓ Successfully used element found with OR");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 6: XPath Axes - Parent

**📝 Problem Statement:**
Navigate to parent elements using parent axis.

**Requirements:**
- Find child element first
- Navigate to parent using parent axis
- Verify parent element

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise06_XPathParent {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Find input element
            WebElement input = driver.findElement(By.xpath("//input[@id='user-name']"));
            System.out.println("✓ Found input element");

            // Find parent of input
            WebElement parent = driver.findElement(
                By.xpath("//input[@id='user-name']/parent::div")
            );
            System.out.println("✓ Found parent: " + parent.getTagName());
            System.out.println("  Parent class: " + parent.getAttribute("class"));

            // Find grandparent (parent of parent)
            WebElement grandparent = driver.findElement(
                By.xpath("//input[@id='user-name']/parent::div/parent::div")
            );
            System.out.println("✓ Found grandparent: " + grandparent.getTagName());

            // Alternative - using any parent with condition
            WebElement formParent = driver.findElement(
                By.xpath("//input[@id='user-name']/parent::*[@class='form_group']")
            );
            System.out.println("✓ Found specific parent by class");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 7: XPath Axes - Following-Sibling

**📝 Problem Statement:**
Navigate to sibling elements using following-sibling axis.

**Requirements:**
- Find an element
- Find its following siblings
- Interact with sibling elements

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise07_XPathFollowingSibling {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Find username field
            WebElement username = driver.findElement(By.xpath("//input[@id='user-name']"));
            username.sendKeys("standard_user");
            System.out.println("✓ Entered username");

            // Find password field (sibling of username)
            WebElement password = driver.findElement(
                By.xpath("//input[@id='user-name']/following-sibling::input[@id='password']")
            );
            password.sendKeys("secret_sauce");
            System.out.println("✓ Found password field using following-sibling");

            // Find submit button (another sibling)
            WebElement submitBtn = driver.findElement(
                By.xpath("//input[@id='user-name']/following-sibling::input[@type='submit']")
            );
            submitBtn.click();
            System.out.println("✓ Clicked submit button using following-sibling");

            Thread.sleep(2000);
            System.out.println("✓ Login successful using sibling navigation");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 8: XPath with Index

**📝 Problem Statement:**
Use index to select specific elements from multiple matches.

**Requirements:**
- Find multiple matching elements
- Select specific one using index
- Understand index positioning

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise08_XPathIndex {
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

            // Count all products
            List<WebElement> allProducts = driver.findElements(
                By.xpath("//div[@class='inventory_item']")
            );
            System.out.println("Total products: " + allProducts.size());

            // Select first product using index
            WebElement firstProduct = driver.findElement(
                By.xpath("(//div[@class='inventory_item'])[1]")
            );
            System.out.println("✓ First product found");

            // Select third product
            WebElement thirdProduct = driver.findElement(
                By.xpath("(//div[@class='inventory_item'])[3]")
            );
            System.out.println("✓ Third product found");

            // Select last product
            WebElement lastProduct = driver.findElement(
                By.xpath("(//div[@class='inventory_item'])[last()]")
            );
            System.out.println("✓ Last product found");

            // Click Add to Cart on second product
            driver.findElement(
                By.xpath("(//button[text()='Add to cart'])[2]")
            ).click();
            System.out.println("✓ Added second product to cart");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 9: XPath for Tables

**📝 Problem Statement:**
Navigate and extract data from HTML tables using XPath.

**Requirements:**
- Locate specific table rows and cells
- Extract data from table
- Click elements within table

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise09_XPathTables {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.w3schools.com/html/html_tables.asp");
            Thread.sleep(2000);

            // Select first table
            WebElement table = driver.findElement(By.xpath("//table[@id='customers']"));
            System.out.println("✓ Found table");

            // Get all rows
            List<WebElement> rows = driver.findElements(
                By.xpath("//table[@id='customers']/tbody/tr")
            );
            System.out.println("Total rows: " + rows.size());

            // Get data from specific cell (row 2, column 1)
            String cellData = driver.findElement(
                By.xpath("//table[@id='customers']/tbody/tr[2]/td[1]")
            ).getText();
            System.out.println("Cell [2,1]: " + cellData);

            // Get all data from column 1 (Company names)
            List<WebElement> companies = driver.findElements(
                By.xpath("//table[@id='customers']/tbody/tr/td[1]")
            );
            System.out.println("\n=== Companies ===");
            for (int i = 0; i < Math.min(5, companies.size()); i++) {
                System.out.println((i + 1) + ". " + companies.get(i).getText());
            }

            // Find row by cell content
            WebElement specificRow = driver.findElement(
                By.xpath("//table[@id='customers']//tr[td[contains(text(), 'Island')]]")
            );
            System.out.println("\n✓ Found row containing 'Island'");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 10: Dynamic XPath with contains()

**📝 Problem Statement:**
Handle dynamic attributes using contains() function.

**Requirements:**
- Simulate dynamic IDs
- Use contains() to locate elements
- Demonstrate flexibility

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise10_DynamicXPath {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Scenario: ID has dynamic part
            // Real: id="item_4_title_link"
            // Dynamic part: "4" changes
            // Static part: "item_" and "_title_link"

            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);

            // Using contains() for dynamic ID
            WebElement productLink = driver.findElement(
                By.xpath("//a[contains(@id, 'item_') and contains(@id, '_title_link')]")
            );
            System.out.println("✓ Found element with dynamic ID");
            System.out.println("  Product: " + productLink.getText());

            // Using starts-with() for dynamic ID
            WebElement product2 = driver.findElement(
                By.xpath("//a[starts-with(@id, 'item_')]")
            );
            System.out.println("✓ Found using starts-with()");

            // Combining multiple dynamic attributes
            WebElement complexElement = driver.findElement(
                By.xpath(
                    "//div[contains(@class, 'inventory') and " +
                    "contains(@class, 'item') and " +
                    ".//a[contains(@id, 'title_link')]]"
                )
            );
            System.out.println("✓ Found using complex dynamic XPath");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 11: XPath with normalize-space()

**📝 Problem Statement:**
Handle text with extra whitespace using normalize-space().

**Requirements:**
- Find elements with text that has extra spaces
- Use normalize-space() function
- Compare with and without normalize-space()

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise11_NormalizeSpace {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);

            // Without normalize-space - might fail if extra spaces exist
            try {
                WebElement btn1 = driver.findElement(
                    By.xpath("//button[text()='Add to cart']")
                );
                System.out.println("✓ Found without normalize-space");
            } catch (NoSuchElementException e) {
                System.out.println("✗ Failed without normalize-space (extra whitespace)");
            }

            // With normalize-space - handles extra spaces
            WebElement btn2 = driver.findElement(
                By.xpath("//button[normalize-space(text())='Add to cart']")
            );
            System.out.println("✓ Found with normalize-space");

            // Practical example - text with multiple spaces
            WebElement productName = driver.findElement(
                By.xpath("//div[normalize-space(text())='Sauce Labs Backpack']")
            );
            System.out.println("✓ Product found: " + productName.getText().trim());

            // Click button found with normalize-space
            btn2.click();
            System.out.println("✓ Clicked button found with normalize-space");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 12: Complex XPath Combination

**📝 Problem Statement:**
Create complex XPath combining multiple techniques.

**Requirements:**
- Combine attributes, functions, and axes
- Create sophisticated locators
- Solve real-world scenarios

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise12_ComplexXPath {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);

            // Complex 1: Find button within specific product
            WebElement specificButton = driver.findElement(
                By.xpath(
                    "//div[contains(@class, 'inventory_item') and " +
                    ".//div[contains(text(), 'Backpack')]]" +
                    "//button[text()='Add to cart']"
                )
            );
            specificButton.click();
            System.out.println("✓ Complex XPath 1: Found button in specific product");

            // Complex 2: Find product by price and add to cart
            WebElement productByPrice = driver.findElement(
                By.xpath(
                    "//div[@class='inventory_item'][.//div[contains(text(), '$29.99')]]" +
                    "//button"
                )
            );
            System.out.println("✓ Complex XPath 2: Found product by price");

            // Complex 3: Use ancestor and descendant
            WebElement complexElement = driver.findElement(
                By.xpath(
                    "//button[text()='Add to cart']" +
                    "/ancestor::div[@class='inventory_item']" +
                    "//div[@class='inventory_item_name']"
                )
            );
            System.out.println("✓ Complex XPath 3: " + complexElement.getText());

            // Complex 4: Multiple conditions with contains and text
            WebElement advanced = driver.findElement(
                By.xpath(
                    "//div[contains(@class, 'inventory_item') and " +
                    "contains(@class, 'pricebar')]" +
                    "//button[normalize-space(text())='Add to cart']"
                )
            );
            System.out.println("✓ Complex XPath 4: Advanced combination");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 13: XPath Debugging

**📝 Problem Statement:**
Learn to debug and test XPath expressions.

**Requirements:**
- Test XPath in browser console
- Verify XPath returns expected elements
- Debug broken XPath

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

public class Exercise13_XPathDebugging {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);

            JavascriptExecutor js = (JavascriptExecutor) driver;

            // Method 1: Count matches
            String xpath1 = "//div[@class='inventory_item']";
            List<WebElement> results1 = driver.findElements(By.xpath(xpath1));
            System.out.println("XPath: " + xpath1);
            System.out.println("Matches: " + results1.size());

            // Method 2: Verify attribute
            String xpath2 = "//button[text()='Add to cart']";
            WebElement elem = driver.findElement(By.xpath(xpath2));
            System.out.println("\nXPath: " + xpath2);
            System.out.println("Element found: " + elem.getTagName());
            System.out.println("Text: " + elem.getText());
            System.out.println("Class: " + elem.getAttribute("class"));

            // Method 3: Test variations
            String[] xpathVariations = {
                "//button[text()='Add to cart']",
                "//button[contains(text(), 'Add')]",
                "//button[normalize-space(text())='Add to cart']"
            };

            System.out.println("\n=== Testing XPath Variations ===");
            for (String xpath : xpathVariations) {
                List<WebElement> matches = driver.findElements(By.xpath(xpath));
                System.out.println(xpath + " → " + matches.size() + " matches");
            }

            // Method 4: Highlight element (visual debugging)
            WebElement elementToHighlight = driver.findElement(
                By.xpath("//button[text()='Add to cart']")
            );
            js.executeScript("arguments[0].style.border='3px solid red'", elementToHighlight);
            System.out.println("\n✓ Element highlighted in browser");

            Thread.sleep(3000);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

**Console Testing (in Chrome DevTools)**:
```javascript
// Test if XPath works
$x("//button[text()='Add to cart']")

// Count matches
$x("//button[text()='Add to cart']").length

// Get element details
$x("//button[text()='Add to cart']")[0].innerText
$x("//button[text()='Add to cart']")[0].className
```

---

### Exercise 14: XPath Performance Comparison

**📝 Problem Statement:**
Compare different XPath strategies and their performance.

**Requirements:**
- Write multiple XPath for same element
- Compare approaches
- Document best practices

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise14_XPathPerformance {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Different XPath strategies for same element
            System.out.println("=== XPath Strategies for Username Field ===\n");

            // Strategy 1: Using ID (Best)
            long start1 = System.currentTimeMillis();
            WebElement elem1 = driver.findElement(By.xpath("//input[@id='user-name']"));
            long end1 = System.currentTimeMillis();
            System.out.println("1. By ID: " + (end1 - start1) + "ms");
            System.out.println("   XPath: //input[@id='user-name']");

            // Strategy 2: Using multiple attributes
            long start2 = System.currentTimeMillis();
            WebElement elem2 = driver.findElement(
                By.xpath("//input[@id='user-name' and @type='text']")
            );
            long end2 = System.currentTimeMillis();
            System.out.println("\n2. Multiple attributes: " + (end2 - start2) + "ms");
            System.out.println("   XPath: //input[@id='user-name' and @type='text']");

            // Strategy 3: Using contains (Slower)
            long start3 = System.currentTimeMillis();
            WebElement elem3 = driver.findElement(
                By.xpath("//input[contains(@id, 'user')]")
            );
            long end3 = System.currentTimeMillis();
            System.out.println("\n3. Using contains: " + (end3 - start3) + "ms");
            System.out.println("   XPath: //input[contains(@id, 'user')]");

            // Strategy 4: Absolute XPath (Don't use - for demonstration only)
            long start4 = System.currentTimeMillis();
            WebElement elem4 = driver.findElement(
                By.xpath("/html/body/div/div/div[2]/div/div/div/form/div/input")
            );
            long end4 = System.currentTimeMillis();
            System.out.println("\n4. Absolute XPath: " + (end4 - start4) + "ms");
            System.out.println("   XPath: /html/body/div/div/div[2]... (long path)");

            System.out.println("\n=== Recommendation ===");
            System.out.println("✓ Use unique attributes (id, name) when available");
            System.out.println("✓ Keep XPath simple and readable");
            System.out.println("✗ Avoid absolute XPath");
            System.out.println("✗ Avoid unnecessary contains() on unique attributes");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 15: Real-World E-commerce Scenario

**📝 Problem Statement:**
Automate a complete e-commerce workflow using only XPath.

**Requirements:**
- Login using XPath
- Find products using XPath
- Add to cart using XPath
- Navigate to cart using XPath
- Verify cart using XPath

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise15_RealWorldScenario {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            System.out.println("=== E-commerce Automation with XPath ===\n");

            // Step 1: Login
            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            driver.findElement(By.xpath("//input[@id='user-name']"))
                .sendKeys("standard_user");
            driver.findElement(By.xpath("//input[@id='password']"))
                .sendKeys("secret_sauce");
            driver.findElement(By.xpath("//input[@type='submit']")).click();

            Thread.sleep(2000);
            System.out.println("✓ Step 1: Logged in using XPath");

            // Step 2: Find specific product by name
            WebElement backpackProduct = driver.findElement(
                By.xpath("//div[contains(text(), 'Sauce Labs Backpack')]" +
                        "/ancestor::div[@class='inventory_item']")
            );
            System.out.println("✓ Step 2: Found 'Backpack' product");

            // Step 3: Get product details
            String productName = driver.findElement(
                By.xpath("//div[contains(text(), 'Backpack')]" +
                        "/ancestor::div[@class='inventory_item']" +
                        "//div[@class='inventory_item_name']")
            ).getText();

            String productPrice = driver.findElement(
                By.xpath("//div[contains(text(), 'Backpack')]" +
                        "/ancestor::div[@class='inventory_item']" +
                        "//div[@class='inventory_item_price']")
            ).getText();

            System.out.println("  Product: " + productName);
            System.out.println("  Price: " + productPrice);

            // Step 4: Add to cart
            driver.findElement(
                By.xpath("//div[contains(text(), 'Backpack')]" +
                        "/ancestor::div[@class='inventory_item']" +
                        "//button[text()='Add to cart']")
            ).click();
            System.out.println("✓ Step 3: Added product to cart");

            // Step 5: Verify cart badge
            String cartCount = driver.findElement(
                By.xpath("//span[@class='shopping_cart_badge']")
            ).getText();
            System.out.println("✓ Step 4: Cart badge shows: " + cartCount);

            // Step 6: Navigate to cart
            driver.findElement(By.xpath("//a[@class='shopping_cart_link']")).click();
            Thread.sleep(1000);
            System.out.println("✓ Step 5: Navigated to cart");

            // Step 7: Verify cart contents
            List<WebElement> cartItems = driver.findElements(
                By.xpath("//div[@class='cart_item']")
            );
            System.out.println("✓ Step 6: Cart contains " + cartItems.size() + " item(s)");

            // Step 8: Verify product in cart
            String cartProductName = driver.findElement(
                By.xpath("//div[@class='cart_item']//div[@class='inventory_item_name']")
            ).getText();
            System.out.println("  Cart product: " + cartProductName);

            if (cartProductName.equals(productName)) {
                System.out.println("✓ Step 7: Product verification successful");
            }

            System.out.println("\n=== Automation completed successfully using XPath! ===");

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

1. **XPath Power**:
   - Most powerful locator strategy
   - Can locate ANY element on ANY page
   - Flexible and dynamic

2. **Always Use Relative XPath**:
   - Start with `//` not `/`
   - More maintainable
   - Less brittle

3. **Essential XPath Functions**:
   - `text()` - Exact text match
   - `contains()` - Partial match (most useful!)
   - `starts-with()` - Prefix match
   - `normalize-space()` - Handle whitespace

4. **XPath Axes for Navigation**:
   - `parent::` - Go up
   - `child::` - Go down
   - `following-sibling::` - Next sibling
   - `preceding-sibling::` - Previous sibling
   - `ancestor::` - Any parent above
   - `descendant::` - Any child below

5. **XPath Best Practices**:
   - Keep it simple and readable
   - Use unique attributes when available
   - Combine multiple conditions for specificity
   - Test XPath in browser console first
   - Document complex XPath with comments

6. **Common Patterns**:
   ```java
   // By attribute
   //tagname[@attribute='value']

   // Multiple conditions
   //tagname[@attr1='value1' and @attr2='value2']

   // Contains
   //tagname[contains(@attribute, 'partial')]

   // Text
   //tagname[text()='exact text']

   // Parent
   //child/parent::parent-tag

   // Index
   (//tagname[@attribute='value'])[index]
   ```

7. **When to Use XPath**:
   - No ID or Name available
   - Need to navigate based on text
   - Need parent/sibling navigation
   - Dynamic attributes
   - Complex DOM structures

---

## 📖 Additional Resources

### Official Documentation:
- [XPath Tutorial - W3Schools](https://www.w3schools.com/xml/xpath_intro.asp)
- [XPath Syntax Reference](https://www.w3schools.com/xml/xpath_syntax.asp)
- [XPath Functions](https://www.w3schools.com/xml/xpath_functions.asp)
- [XPath Axes](https://www.w3schools.com/xml/xpath_axes.asp)

### Cheat Sheets:
- [XPath Cheatsheet](https://devhints.io/xpath)
- [XPath Expressions](https://www.red-gate.com/simple-talk/wp-content/uploads/imported/1269-Locators_table_1_0_2.pdf)

### Browser Tools:
- **Chrome DevTools**: Test XPath with `$x("xpath")` in Console
- **ChroPath Extension**: XPath helper for Chrome
- **SelectorsHub**: Advanced XPath tool

### Practice:
- Practice XPath on any website using browser console
- Use `$x("your-xpath-here")` in Chrome DevTools Console
- Verify XPath finds expected elements before using in code

---

## 🧭 Navigation

### Week 3 Progress:
- [Week 3 Overview](README.md)
- [Day 16: Selenium Introduction & Setup](day16_selenium_introduction_setup.md)
- [Day 17: First Selenium Script](day17_first_selenium_script.md)
- [Day 18: Locators - Part 1](day18_locators_part1.md)
- **Day 19: Locators - Part 2 (XPath)** ← You are here
- [Day 20: Locators - Part 3 (CSS Selector)](day20_locators_part3_css.md)
- [Day 21: WebElement Interactions](day21_webelement_interactions.md)

### Related Resources:
- [Day 19 Assessment](../../../src/data/assessments/selenium/week3/day19.js)
- [Week 3 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Selenium/Week3_Days15-21_Selenium_Basics.md)

---

## ✅ Day 19 Checklist

Before moving to Day 20, ensure you can:
- [ ] Write relative XPath expressions
- [ ] Use XPath with attributes
- [ ] Apply text() function
- [ ] Use contains() for partial matches
- [ ] Apply starts-with() function
- [ ] Use normalize-space() for whitespace
- [ ] Navigate using parent axis
- [ ] Navigate using sibling axes
- [ ] Use index in XPath
- [ ] Locate table elements with XPath
- [ ] Create dynamic XPath
- [ ] Debug XPath in browser console
- [ ] Combine multiple XPath techniques

---

**🎉 Congratulations on completing Day 19!**

You've mastered XPath - the most powerful locator strategy! You can now locate any element on any webpage. Tomorrow, you'll learn CSS Selectors - a faster alternative to XPath.

**Next**: [Day 20: Locators - Part 3 (CSS Selector) →](day20_locators_part3_css.md)

---

*Last Updated: 2026-01-12*
