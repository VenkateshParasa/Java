# Day 18: Locators - Part 1 (Basic Locators)

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

By the end of Day 18, you will be able to:
- Understand the importance of locators in web automation
- Differentiate between findElement() and findElements()
- Locate elements using ID locator
- Locate elements using Name locator
- Locate elements using ClassName locator
- Locate elements using TagName locator
- Locate links using LinkText locator
- Locate links using PartialLinkText locator
- Choose the appropriate locator strategy for different scenarios
- Handle NoSuchElementException
- Work with lists of WebElements

---

## 📚 Topics Covered

### 1. Why Locators Are Critical

Locators are the foundation of Selenium automation. Without locators, you cannot:
- Click buttons
- Enter text in input fields
- Select dropdowns
- Verify text on page
- Interact with any web element

**Analogy**: Locators are like addresses. Just as you need an address to find a house, you need a locator to find an element on a webpage.

#### **What is a Locator?**
A locator is a way to identify and locate a specific element on a web page.

```java
// Generic syntax
WebElement element = driver.findElement(By.locatorType("value"));
```

#### **Why Multiple Locator Strategies?**
Different elements require different location strategies:
- Some elements have unique IDs ✓ Easy
- Some don't have IDs but have names
- Some don't have either but have class names
- Some are links with text
- Some require advanced techniques (XPath, CSS - Days 19-20)

---

### 2. findElement() vs findElements()

Two critical methods for locating elements:

#### **findElement() - Find Single Element**
```java
WebElement element = driver.findElement(By.id("username"));
```

**Behavior**:
- Returns **one** WebElement (the first match)
- If element found: Returns WebElement
- If element NOT found: Throws NoSuchElementException
- Use when you expect exactly one element

**Example**:
```java
WebElement loginButton = driver.findElement(By.id("login-btn"));
loginButton.click(); // Click the button
```

#### **findElements() - Find Multiple Elements**
```java
List<WebElement> elements = driver.findElements(By.className("product"));
```

**Behavior**:
- Returns **List<WebElement>** (all matches)
- If elements found: Returns list with elements
- If NO elements found: Returns empty list (NOT exception)
- Use when you expect multiple elements

**Example**:
```java
List<WebElement> allLinks = driver.findElements(By.tagName("a"));
System.out.println("Total links: " + allLinks.size());
```

#### **Comparison Table**:

| Feature | findElement() | findElements() |
|---------|---------------|----------------|
| Return Type | WebElement | List<WebElement> |
| Returns | First matching element | All matching elements |
| If not found | Throws exception | Returns empty list |
| Use case | Single element | Multiple elements |

---

### 3. ID Locator - Most Reliable

The ID locator is the **most reliable** and **fastest** way to locate elements.

#### **Why ID is Best**:
- IDs should be unique on a page (HTML standard)
- Fastest locator (direct lookup)
- Most reliable (least likely to break)
- Recommended by Selenium

#### **HTML Example**:
```html
<input type="text" id="username" name="user" />
<button id="login-btn">Login</button>
<div id="welcome-message">Welcome!</div>
```

#### **Selenium Code**:
```java
// Locate input field by ID
WebElement usernameField = driver.findElement(By.id("username"));

// Locate button by ID
WebElement loginButton = driver.findElement(By.id("login-btn"));

// Locate div by ID
WebElement welcomeMsg = driver.findElement(By.id("welcome-message"));
```

#### **Syntax**:
```java
By.id("id-value")
```

#### **Complete Example**:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class LocateById {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Locate username field by ID
            WebElement username = driver.findElement(By.id("user-name"));
            username.sendKeys("standard_user");

            // Locate password field by ID
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("secret_sauce");

            // Locate login button by ID
            WebElement loginBtn = driver.findElement(By.id("login-button"));
            loginBtn.click();

            System.out.println("Login performed successfully using ID locator");

        } finally {
            driver.quit();
        }
    }
}
```

#### **Best Practices**:
- Always prefer ID if available
- Verify ID is unique (only one element has it)
- Avoid dynamic IDs (e.g., "item_12345_random")

---

### 4. Name Locator - Common for Forms

The Name locator identifies elements by their `name` attribute.

#### **When to Use Name**:
- When element has no ID
- Form fields often have names
- Common in older HTML forms

#### **HTML Example**:
```html
<input type="text" name="username" />
<input type="password" name="password" />
<input type="email" name="email" />
<select name="country">
    <option>USA</option>
    <option>Canada</option>
</select>
```

#### **Selenium Code**:
```java
// Locate by name attribute
WebElement usernameField = driver.findElement(By.name("username"));
WebElement passwordField = driver.findElement(By.name("password"));
WebElement emailField = driver.findElement(By.name("email"));
WebElement countryDropdown = driver.findElement(By.name("country"));
```

#### **Syntax**:
```java
By.name("name-value")
```

#### **Complete Example**:
```java
public class LocateByName {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Locate elements by name
            WebElement username = driver.findElement(By.name("user-name"));
            WebElement password = driver.findElement(By.name("password"));

            // Enter credentials
            username.sendKeys("standard_user");
            password.sendKeys("secret_sauce");

            System.out.println("Credentials entered using Name locator");

        } finally {
            driver.quit();
        }
    }
}
```

#### **Important Notes**:
- Names may not be unique (multiple elements can have same name)
- If duplicate names exist, findElement() returns first match
- Use findElements() to get all elements with same name

---

### 5. ClassName Locator - For Styled Elements

The ClassName locator identifies elements by their CSS class name.

#### **When to Use ClassName**:
- Elements grouped by visual style
- Multiple elements need to be found
- ID and Name not available

#### **HTML Example**:
```html
<div class="product-card">Product 1</div>
<div class="product-card">Product 2</div>
<div class="product-card">Product 3</div>
<button class="btn-primary">Submit</button>
<p class="error-message">Invalid input</p>
```

#### **Selenium Code**:
```java
// Single element with class
WebElement submitBtn = driver.findElement(By.className("btn-primary"));

// Multiple elements with same class
List<WebElement> products = driver.findElements(By.className("product-card"));
System.out.println("Total products: " + products.size()); // 3
```

#### **Syntax**:
```java
By.className("class-name")
```

#### **Complete Example**:
```java
public class LocateByClassName {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();

            Thread.sleep(2000);

            // Find all products by class name
            List<WebElement> products = driver.findElements(By.className("inventory_item"));
            System.out.println("Total products on page: " + products.size());

            // Find all product titles
            List<WebElement> titles = driver.findElements(By.className("inventory_item_name"));
            for (WebElement title : titles) {
                System.out.println("Product: " + title.getText());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### **Important - Compound Classes**:
```html
<!-- Element with multiple classes -->
<div class="btn btn-primary btn-large">Click Me</div>
```

```java
// WRONG - Don't use spaces with className
WebElement btn = driver.findElement(By.className("btn btn-primary")); // ERROR!

// CORRECT - Use single class name
WebElement btn = driver.findElement(By.className("btn-primary")); // OK

// For compound classes, use CSS Selector or XPath (Days 19-20)
```

---

### 6. TagName Locator - For Generic Elements

The TagName locator identifies elements by their HTML tag.

#### **When to Use TagName**:
- Count all elements of a type (all links, all images)
- When other locators aren't suitable
- Finding all inputs, all buttons, etc.

#### **HTML Example**:
```html
<a href="/home">Home</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>
<img src="logo.png" />
<img src="banner.png" />
```

#### **Selenium Code**:
```java
// Find all links on page
List<WebElement> allLinks = driver.findElements(By.tagName("a"));
System.out.println("Total links: " + allLinks.size());

// Find all images
List<WebElement> allImages = driver.findElements(By.tagName("img"));
System.out.println("Total images: " + allImages.size());

// Find all input fields
List<WebElement> allInputs = driver.findElements(By.tagName("input"));
```

#### **Syntax**:
```java
By.tagName("tag-name")
```

#### **Complete Example**:
```java
public class LocateByTagName {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.wikipedia.org");

            // Count all links
            List<WebElement> links = driver.findElements(By.tagName("a"));
            System.out.println("Total links: " + links.size());

            // Count all images
            List<WebElement> images = driver.findElements(By.tagName("img"));
            System.out.println("Total images: " + images.size());

            // Count all input fields
            List<WebElement> inputs = driver.findElements(By.tagName("input"));
            System.out.println("Total input fields: " + inputs.size());

            // Print first 5 link texts
            System.out.println("\nFirst 5 links:");
            for (int i = 0; i < Math.min(5, links.size()); i++) {
                String linkText = links.get(i).getText();
                if (!linkText.isEmpty()) {
                    System.out.println((i + 1) + ". " + linkText);
                }
            }

        } finally {
            driver.quit();
        }
    }
}
```

#### **Common Tags**:
- `a` - Links
- `button` - Buttons
- `input` - Input fields
- `img` - Images
- `div` - Divisions
- `span` - Spans
- `table` - Tables
- `p` - Paragraphs

---

### 7. LinkText Locator - For Exact Link Text

The LinkText locator identifies links by their **exact** visible text.

#### **When to Use LinkText**:
- Locating navigation links
- When link text is unique
- When link text is stable (doesn't change)

#### **HTML Example**:
```html
<a href="/login">Login</a>
<a href="/signup">Sign Up</a>
<a href="/products">View All Products</a>
```

#### **Selenium Code**:
```java
// Exact text match required
WebElement loginLink = driver.findElement(By.linkText("Login"));
WebElement signupLink = driver.findElement(By.linkText("Sign Up"));
WebElement productsLink = driver.findElement(By.linkText("View All Products"));

// Click the link
loginLink.click();
```

#### **Syntax**:
```java
By.linkText("exact text")
```

#### **Complete Example**:
```java
public class LocateByLinkText {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.wikipedia.org");

            // Locate link by exact text
            WebElement englishLink = driver.findElement(By.linkText("English"));
            System.out.println("Link found: " + englishLink.getText());

            // Click the link
            englishLink.click();
            Thread.sleep(2000);

            System.out.println("Current page: " + driver.getTitle());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### **Important Notes**:
- Text must match **exactly** (case-sensitive)
- `By.linkText("Login")` ≠ `By.linkText("login")` ≠ `By.linkText(" Login ")`
- Only works with `<a>` tags (hyperlinks)
- Whitespace matters

#### **Case Sensitivity Example**:
```java
// These are all different
driver.findElement(By.linkText("Login"));        // Exact match
driver.findElement(By.linkText("LOGIN"));        // All caps
driver.findElement(By.linkText("login"));        // Lowercase
driver.findElement(By.linkText(" Login "));      // With spaces
```

---

### 8. PartialLinkText Locator - For Partial Match

The PartialLinkText locator identifies links by **partial** text match.

#### **When to Use PartialLinkText**:
- Link text is very long
- Link text is dynamic (part of it changes)
- You want to match part of the text

#### **HTML Example**:
```html
<a href="/products">View All Products Available in Store</a>
<a href="/user/123">Welcome, John Doe!</a>
<a href="/logout">Click here to logout from your account</a>
```

#### **Selenium Code**:
```java
// Match partial text
WebElement productsLink = driver.findElement(By.partialLinkText("View All Products"));
WebElement userLink = driver.findElement(By.partialLinkText("Welcome"));
WebElement logoutLink = driver.findElement(By.partialLinkText("logout"));
```

#### **Syntax**:
```java
By.partialLinkText("partial text")
```

#### **Complete Example**:
```java
public class LocateByPartialLinkText {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.selenium.dev");

            // Locate by partial link text
            WebElement downloadLink = driver.findElement(By.partialLinkText("Download"));
            System.out.println("Link found: " + downloadLink.getText());

            // Click the link
            downloadLink.click();
            Thread.sleep(2000);

            System.out.println("Navigated to: " + driver.getCurrentUrl());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### **LinkText vs PartialLinkText**:

```html
<a href="/about">Learn more about our company history</a>
```

```java
// LinkText - Must match exactly
driver.findElement(By.linkText("Learn more about our company history")); // Works

// PartialLinkText - Match any part
driver.findElement(By.partialLinkText("Learn more"));        // Works
driver.findElement(By.partialLinkText("about our company")); // Works
driver.findElement(By.partialLinkText("company history"));   // Works
```

#### **Caution**:
```java
// If multiple links contain same partial text, first match is returned
driver.findElement(By.partialLinkText("Click")); // Returns first link with "Click"
```

---

### 9. Choosing the Right Locator

Follow this priority order:

#### **Locator Priority (Best to Worst)**:
```
1. ID             ★★★★★ (Best - Unique, Fast, Reliable)
2. Name           ★★★★☆ (Good - Common in forms)
3. LinkText       ★★★★☆ (Good - For links with unique text)
4. PartialLinkText★★★☆☆ (Moderate - When text is long)
5. ClassName      ★★★☆☆ (Moderate - May not be unique)
6. TagName        ★★☆☆☆ (Weak - Too generic)
7. XPath          ★★★★★ (Powerful but complex - Day 19)
8. CSS Selector   ★★★★★ (Powerful and fast - Day 20)
```

#### **Decision Tree**:
```
Does element have ID?
├─ YES → Use By.id() ✓
└─ NO
    ├─ Is it a form field with name?
    │   └─ YES → Use By.name()
    └─ NO
        ├─ Is it a link?
        │   ├─ Unique text? → Use By.linkText()
        │   └─ Long text? → Use By.partialLinkText()
        └─ NO
            ├─ Has unique class? → Use By.className()
            └─ NO → Use XPath or CSS (Days 19-20)
```

---

### 10. Handling NoSuchElementException

When an element is not found, Selenium throws NoSuchElementException.

#### **Why It Happens**:
- Element doesn't exist on page
- Wrong locator value
- Page not fully loaded
- Element inside frame/iframe
- Element is hidden

#### **Example of Exception**:
```java
try {
    WebElement element = driver.findElement(By.id("nonexistent"));
    // NoSuchElementException thrown here
} catch (NoSuchElementException e) {
    System.out.println("Element not found: " + e.getMessage());
}
```

#### **Proper Error Handling**:
```java
import org.openqa.selenium.NoSuchElementException;

public class HandleNoSuchElement {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.example.com");

            try {
                WebElement element = driver.findElement(By.id("missing-id"));
                element.click();
            } catch (NoSuchElementException e) {
                System.out.println("✗ Element not found with ID: missing-id");
                System.out.println("Error: " + e.getMessage());
            }

        } finally {
            driver.quit();
        }
    }
}
```

#### **Avoiding the Exception**:
```java
// Method 1: Use findElements() - returns empty list if not found
List<WebElement> elements = driver.findElements(By.id("maybe-exists"));
if (elements.size() > 0) {
    elements.get(0).click();
} else {
    System.out.println("Element not found");
}

// Method 2: Try-catch
try {
    driver.findElement(By.id("element")).click();
} catch (NoSuchElementException e) {
    System.out.println("Element not found");
}
```

---

## 💻 Practical Exercises

### Exercise 1: Locate Element by ID

**📝 Problem Statement:**
Navigate to a login page and locate elements by ID.

**Requirements:**
- Use https://www.saucedemo.com
- Locate username, password, and login button by ID
- Print confirmation messages

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise01_LocateById {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();

            // Locate by ID
            WebElement username = driver.findElement(By.id("user-name"));
            System.out.println("✓ Username field located by ID");

            WebElement password = driver.findElement(By.id("password"));
            System.out.println("✓ Password field located by ID");

            WebElement loginBtn = driver.findElement(By.id("login-button"));
            System.out.println("✓ Login button located by ID");

            // Perform login
            username.sendKeys("standard_user");
            password.sendKeys("secret_sauce");
            loginBtn.click();

            Thread.sleep(2000);
            System.out.println("✓ Login successful using ID locators");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 2: Locate Element by Name

**📝 Problem Statement:**
Locate form elements using Name locator.

**Requirements:**
- Navigate to login page
- Locate elements by name attribute
- Enter data and submit

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise02_LocateByName {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            // Locate by name
            WebElement usernameField = driver.findElement(By.name("user-name"));
            WebElement passwordField = driver.findElement(By.name("password"));

            System.out.println("✓ Located username field by name: " + usernameField.getAttribute("name"));
            System.out.println("✓ Located password field by name: " + passwordField.getAttribute("name"));

            // Enter credentials
            usernameField.sendKeys("standard_user");
            passwordField.sendKeys("secret_sauce");

            System.out.println("✓ Credentials entered successfully");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 3: Locate Elements by ClassName

**📝 Problem Statement:**
Find all products on a page using ClassName locator.

**Requirements:**
- Login to saucedemo.com
- Find all product items by class name
- Print count and names

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise03_LocateByClassName {
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

            // Find all products by class name
            List<WebElement> products = driver.findElements(By.className("inventory_item"));
            System.out.println("✓ Total products found: " + products.size());

            // Find all product names
            List<WebElement> productNames = driver.findElements(By.className("inventory_item_name"));
            System.out.println("\n=== Product List ===");
            for (int i = 0; i < productNames.size(); i++) {
                System.out.println((i + 1) + ". " + productNames.get(i).getText());
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

### Exercise 4: Locate Elements by TagName

**📝 Problem Statement:**
Count all links and images on a webpage.

**Requirements:**
- Navigate to Wikipedia homepage
- Count all links using tagName
- Count all images using tagName
- Print the counts

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise04_LocateByTagName {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.wikipedia.org");
            driver.manage().window().maximize();

            // Count all links
            List<WebElement> allLinks = driver.findElements(By.tagName("a"));
            System.out.println("Total links on page: " + allLinks.size());

            // Count all images
            List<WebElement> allImages = driver.findElements(By.tagName("img"));
            System.out.println("Total images on page: " + allImages.size());

            // Count all input fields
            List<WebElement> allInputs = driver.findElements(By.tagName("input"));
            System.out.println("Total input fields: " + allInputs.size());

            // Count all buttons
            List<WebElement> allButtons = driver.findElements(By.tagName("button"));
            System.out.println("Total buttons: " + allButtons.size());

            // Print first 10 non-empty link texts
            System.out.println("\n=== First 10 Links ===");
            int count = 0;
            for (WebElement link : allLinks) {
                String text = link.getText();
                if (!text.isEmpty() && count < 10) {
                    System.out.println((count + 1) + ". " + text);
                    count++;
                }
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 5: Locate Link by LinkText

**📝 Problem Statement:**
Navigate Wikipedia by clicking links using LinkText locator.

**Requirements:**
- Navigate to Wikipedia
- Find and click a language link
- Verify navigation successful

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise05_LocateByLinkText {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.wikipedia.org");
            String initialUrl = driver.getCurrentUrl();
            System.out.println("Initial URL: " + initialUrl);

            // Click English link by exact text
            WebElement englishLink = driver.findElement(By.linkText("English"));
            System.out.println("✓ Found link with text: " + englishLink.getText());

            englishLink.click();
            Thread.sleep(2000);

            String currentUrl = driver.getCurrentUrl();
            System.out.println("Current URL: " + currentUrl);

            if (!currentUrl.equals(initialUrl)) {
                System.out.println("✓ Successfully navigated to new page");
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

### Exercise 6: Locate Link by PartialLinkText

**📝 Problem Statement:**
Use PartialLinkText to locate and click links.

**Requirements:**
- Navigate to Selenium website
- Use partial text to find links
- Click the link

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise06_LocateByPartialLinkText {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.selenium.dev");

            // Locate by partial link text
            WebElement downloadLink = driver.findElement(By.partialLinkText("Download"));
            System.out.println("✓ Found link: " + downloadLink.getText());

            downloadLink.click();
            Thread.sleep(2000);

            System.out.println("✓ Navigated to: " + driver.getTitle());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 7: findElement vs findElements

**📝 Problem Statement:**
Demonstrate the difference between findElement() and findElements().

**Requirements:**
- Show both methods
- Handle scenarios when element exists and doesn't exist
- Print appropriate messages

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise07_FindElementVsFindElements {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.wikipedia.org");

            System.out.println("=== Testing findElement() ===");

            // Scenario 1: Element exists
            try {
                WebElement searchBox = driver.findElement(By.id("searchInput"));
                System.out.println("✓ findElement() found element");
            } catch (NoSuchElementException e) {
                System.out.println("✗ findElement() threw exception");
            }

            // Scenario 2: Element doesn't exist
            try {
                WebElement missing = driver.findElement(By.id("nonexistent"));
                System.out.println("✓ findElement() found element");
            } catch (NoSuchElementException e) {
                System.out.println("✗ findElement() threw exception (expected)");
            }

            System.out.println("\n=== Testing findElements() ===");

            // Scenario 3: Multiple elements exist
            List<WebElement> links = driver.findElements(By.tagName("a"));
            System.out.println("✓ findElements() found " + links.size() + " elements");

            // Scenario 4: No elements exist
            List<WebElement> missing = driver.findElements(By.className("nonexistent-class"));
            System.out.println("✓ findElements() found " + missing.size() + " elements (returns empty list)");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 8: Handle NoSuchElementException

**📝 Problem Statement:**
Properly handle element not found scenarios.

**Requirements:**
- Try to find elements that may not exist
- Use try-catch blocks
- Print user-friendly messages

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise08_HandleNoSuchElement {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.example.com");

            // Method 1: Try-catch
            System.out.println("=== Method 1: Try-Catch ===");
            try {
                WebElement element = driver.findElement(By.id("missing-element"));
                element.click();
                System.out.println("✓ Element found and clicked");
            } catch (NoSuchElementException e) {
                System.out.println("✗ Element not found: ID 'missing-element' does not exist");
            }

            // Method 2: Check with findElements()
            System.out.println("\n=== Method 2: Check with findElements ===");
            List<WebElement> elements = driver.findElements(By.id("missing-element"));
            if (elements.size() > 0) {
                elements.get(0).click();
                System.out.println("✓ Element found and clicked");
            } else {
                System.out.println("✗ Element not found using safe check");
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 9: Locator Strategy Comparison

**📝 Problem Statement:**
Locate the same element using different locator strategies.

**Requirements:**
- Find one element using ID, Name, ClassName
- Compare which works
- Document findings

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise09_LocatorComparison {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            System.out.println("=== Locating Username Field ===\n");

            // Method 1: By ID
            WebElement byId = driver.findElement(By.id("user-name"));
            System.out.println("1. By ID: " + byId.getTagName());
            System.out.println("   Attribute 'id': " + byId.getAttribute("id"));

            // Method 2: By Name
            WebElement byName = driver.findElement(By.name("user-name"));
            System.out.println("\n2. By Name: " + byName.getTagName());
            System.out.println("   Attribute 'name': " + byName.getAttribute("name"));

            // Method 3: By ClassName
            WebElement byClass = driver.findElement(By.className("input_error"));
            System.out.println("\n3. By ClassName: " + byClass.getTagName());
            System.out.println("   Attribute 'class': " + byClass.getAttribute("class"));

            System.out.println("\n=== Conclusion ===");
            System.out.println("✓ All three locators found the same element");
            System.out.println("✓ ID is the most reliable (unique)");
            System.out.println("✓ ClassName may match multiple elements");

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 10: Count Elements with Same Class

**📝 Problem Statement:**
Find all elements sharing the same class name and analyze them.

**Requirements:**
- Login to saucedemo
- Find all elements with class "btn_inventory"
- Print count and details

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise10_CountSameClass {
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

            // Find all "Add to cart" buttons by class
            List<WebElement> addToCartButtons = driver.findElements(By.className("btn_inventory"));
            System.out.println("Total 'Add to cart' buttons: " + addToCartButtons.size());

            // Click first button
            if (addToCartButtons.size() > 0) {
                addToCartButtons.get(0).click();
                System.out.println("✓ Clicked first 'Add to cart' button");
            }

            Thread.sleep(1000);

            // Verify cart badge
            WebElement cartBadge = driver.findElement(By.className("shopping_cart_badge"));
            System.out.println("✓ Cart items: " + cartBadge.getText());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 11: Print All Links on Page

**📝 Problem Statement:**
Extract and print all links from a webpage with their href attributes.

**Requirements:**
- Navigate to any website
- Find all links
- Print link text and URL
- Skip empty links

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class Exercise11_PrintAllLinks {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.wikipedia.org");

            List<WebElement> allLinks = driver.findElements(By.tagName("a"));
            System.out.println("Total links found: " + allLinks.size());

            System.out.println("\n=== Links with Text ===");
            int count = 0;
            for (WebElement link : allLinks) {
                String text = link.getText();
                String href = link.getAttribute("href");

                if (text != null && !text.isEmpty()) {
                    count++;
                    System.out.println(count + ". Text: " + text);
                    System.out.println("   URL: " + href);

                    if (count >= 10) break; // Print first 10
                }
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 12: Verify Element Attributes

**📝 Problem Statement:**
Locate an element and verify its attributes.

**Requirements:**
- Find element by ID
- Get and print all important attributes
- Verify attribute values

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise12_VerifyAttributes {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            WebElement usernameField = driver.findElement(By.id("user-name"));

            System.out.println("=== Element Attributes ===");
            System.out.println("Tag Name: " + usernameField.getTagName());
            System.out.println("ID: " + usernameField.getAttribute("id"));
            System.out.println("Name: " + usernameField.getAttribute("name"));
            System.out.println("Class: " + usernameField.getAttribute("class"));
            System.out.println("Type: " + usernameField.getAttribute("type"));
            System.out.println("Placeholder: " + usernameField.getAttribute("placeholder"));

            System.out.println("\n=== Verification ===");
            if ("input".equals(usernameField.getTagName())) {
                System.out.println("✓ Element is an input field");
            }

            if ("text".equals(usernameField.getAttribute("type"))) {
                System.out.println("✓ Element type is text");
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 13: Navigate Using Multiple Links

**📝 Problem Statement:**
Click multiple links in sequence and navigate back.

**Requirements:**
- Find multiple links
- Click each link
- Navigate back after each
- Print page titles

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise13_NavigateMultipleLinks {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.selenium.dev");

            String[] linkTexts = {"Downloads", "Documentation", "About"};

            for (String linkText : linkTexts) {
                try {
                    System.out.println("\n=== Clicking: " + linkText + " ===");

                    WebElement link = driver.findElement(By.partialLinkText(linkText));
                    link.click();

                    Thread.sleep(2000);
                    System.out.println("Page Title: " + driver.getTitle());

                    driver.navigate().back();
                    Thread.sleep(1000);
                    System.out.println("✓ Navigated back");

                } catch (Exception e) {
                    System.out.println("✗ Could not find link: " + linkText);
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

### Exercise 14: Dynamic Locator Selection

**📝 Problem Statement:**
Create a method that tries different locator strategies.

**Requirements:**
- Try ID first
- If not found, try Name
- If not found, try ClassName
- Return the element or null

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise14_DynamicLocator {

    public static WebElement findElementDynamic(WebDriver driver, String value) {
        System.out.println("Trying to locate element with value: " + value);

        // Try ID
        try {
            WebElement element = driver.findElement(By.id(value));
            System.out.println("✓ Found by ID");
            return element;
        } catch (NoSuchElementException e) {
            System.out.println("✗ Not found by ID");
        }

        // Try Name
        try {
            WebElement element = driver.findElement(By.name(value));
            System.out.println("✓ Found by Name");
            return element;
        } catch (NoSuchElementException e) {
            System.out.println("✗ Not found by Name");
        }

        // Try ClassName
        try {
            WebElement element = driver.findElement(By.className(value));
            System.out.println("✓ Found by ClassName");
            return element;
        } catch (NoSuchElementException e) {
            System.out.println("✗ Not found by ClassName");
        }

        System.out.println("✗ Element not found with any locator");
        return null;
    }

    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            driver.get("https://www.saucedemo.com");

            WebElement element = findElementDynamic(driver, "user-name");

            if (element != null) {
                element.sendKeys("standard_user");
                System.out.println("✓ Successfully entered text");
            }

        } finally {
            driver.quit();
        }
    }
}
```

---

### Exercise 15: Complete Login Automation

**📝 Problem Statement:**
Create a complete login script using only basic locators.

**Requirements:**
- Use different locator types
- Login successfully
- Verify login
- Print status at each step

**Solution:**
```java
package com.automation.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Exercise15_CompleteLogin {
    public static void main(String[] args) {
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            System.out.println("=== Login Automation Started ===\n");

            // Step 1: Navigate
            driver.get("https://www.saucedemo.com");
            driver.manage().window().maximize();
            System.out.println("✓ Step 1: Navigated to login page");

            // Step 2: Locate username (by ID)
            WebElement username = driver.findElement(By.id("user-name"));
            System.out.println("✓ Step 2: Located username field by ID");

            // Step 3: Locate password (by Name)
            WebElement password = driver.findElement(By.name("password"));
            System.out.println("✓ Step 3: Located password field by Name");

            // Step 4: Locate login button (by ID)
            WebElement loginBtn = driver.findElement(By.id("login-button"));
            System.out.println("✓ Step 4: Located login button by ID");

            // Step 5: Enter credentials
            username.sendKeys("standard_user");
            password.sendKeys("secret_sauce");
            System.out.println("✓ Step 5: Entered credentials");

            // Step 6: Click login
            loginBtn.click();
            Thread.sleep(2000);
            System.out.println("✓ Step 6: Clicked login button");

            // Step 7: Verify login by finding products page element
            WebElement productsTitle = driver.findElement(By.className("title"));
            if (productsTitle.getText().equals("Products")) {
                System.out.println("✓ Step 7: Login successful!");
                System.out.println("✓ Current page: " + productsTitle.getText());
            }

            System.out.println("\n=== Login Automation Completed Successfully ===");

        } catch (Exception e) {
            System.out.println("✗ Error occurred: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 🔑 Key Takeaways

1. **Six Basic Locators**:
   - `By.id()` - Most reliable, use whenever available
   - `By.name()` - Good for form fields
   - `By.className()` - For styled elements (single class only)
   - `By.tagName()` - For counting elements
   - `By.linkText()` - Exact link text match
   - `By.partialLinkText()` - Partial link text match

2. **findElement() vs findElements()**:
   - `findElement()` returns single WebElement, throws exception if not found
   - `findElements()` returns List, returns empty list if not found

3. **Locator Priority**:
   ```
   ID > Name > LinkText > ClassName > TagName
   ```

4. **Exception Handling**:
   - Always handle NoSuchElementException
   - Use try-catch or findElements() for safe checking

5. **Best Practices**:
   - Prefer ID locator when available
   - Avoid compound class names with ClassName
   - Use meaningful variable names
   - Always verify element before interaction

6. **Common Mistakes to Avoid**:
   - Using spaces in className: `By.className("btn btn-primary")` ✗
   - Case mismatch in linkText: `By.linkText("Login")` ≠ `"login"`
   - Not handling exceptions
   - Using tagName for specific elements

---

## 📖 Additional Resources

### Official Documentation:
- [Selenium Locators](https://www.selenium.dev/documentation/webdriver/elements/locators/)
- [WebElement API](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebElement.html)
- [By Class Documentation](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/By.html)

### Practice Websites:
- https://www.saucedemo.com - Login practice
- https://www.wikipedia.org - Link practice
- http://the-internet.herokuapp.com - Various scenarios

### Tools:
- **Chrome DevTools** (F12) - Inspect elements
- **ChroPath** Extension - Test locators
- **SelectorsHub** Extension - Advanced locator tool

---

## 🧭 Navigation

### Week 3 Progress:
- [Week 3 Overview](README.md)
- [Day 16: Selenium Introduction & Setup](day16_selenium_introduction_setup.md)
- [Day 17: First Selenium Script](day17_first_selenium_script.md)
- **Day 18: Locators - Part 1** ← You are here
- [Day 19: Locators - Part 2 (XPath)](day19_locators_part2_xpath.md)
- [Day 20: Locators - Part 3 (CSS Selector)](day20_locators_part3_css.md)
- [Day 21: WebElement Interactions](day21_webelement_interactions.md)

### Related Resources:
- [Day 18 Assessment](../../../src/data/assessments/selenium/week3/day18.js)
- [Week 3 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Selenium/Week3_Days15-21_Selenium_Basics.md)

---

## ✅ Day 18 Checklist

Before moving to Day 19, ensure you can:
- [ ] Locate elements by ID
- [ ] Locate elements by Name
- [ ] Locate elements by ClassName
- [ ] Locate elements by TagName
- [ ] Locate links by LinkText
- [ ] Locate links by PartialLinkText
- [ ] Understand findElement() vs findElements()
- [ ] Handle NoSuchElementException
- [ ] Choose appropriate locator for different scenarios
- [ ] Write automation scripts using basic locators

---

**🎉 Congratulations on completing Day 18!**

You've mastered the six basic locators! Tomorrow, you'll learn XPath - the most powerful locator technique that can find ANY element on ANY webpage.

**Next**: [Day 19: Locators - Part 2 (XPath) →](day19_locators_part2_xpath.md)

---

*Last Updated: 2026-01-12*
