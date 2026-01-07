---

## PHASE 2: SELENIUM WEBDRIVER ADVANCED (Days 22-30)

### Day 22: Advanced Locators - XPath Strategies

---

#### Exercise 1: Understanding XPath Absolute vs Relative (20 minutes)

**What you'll learn:** The difference between absolute and relative XPath, and why relative is better

**Practice Website:** https://www.saucedemo.com

**Step-by-Step:**

1. **Open Chrome browser manually**
   - Go to: https://www.saucedemo.com
   - Right-click on the Username field → Inspect

2. **In DevTools (Elements tab):**
   - You'll see: `<input class="input_error form_input" placeholder="Username" type="text" data-test="username" id="user-name" name="user-name" autocorrect="off" autocapitalize="none" value="">`

**Create new package: `com.automation.locators`**
**Create new class: `XPathBasics`**

```java
package com.automation.locators;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class XPathBasics {
    public static void main(String[] args) {
        System.out.println("===== XPATH: ABSOLUTE vs RELATIVE =====\n");

        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Open test website
            driver.get("https://www.saucedemo.com");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // ABSOLUTE XPATH (NOT RECOMMENDED)
            // ========================================
            System.out.println("\n--- ABSOLUTE XPATH ---");
            System.out.println("Format: Starts with single / from html root");
            System.out.println("Example: /html/body/div/div/div[2]/div/form/div[1]/input");
            System.out.println("\nProblems with Absolute XPath:");
            System.out.println("  ❌ Breaks easily when page structure changes");
            System.out.println("  ❌ Very long and hard to read");
            System.out.println("  ❌ Not maintainable");
            System.out.println("  ❌ Not recommended in real projects!");

            // Trying absolute xpath (this is fragile!)
            String absoluteXPath = "/html/body/div/div/div[2]/div[1]/div/div/form/div[1]/input";
            try {
                WebElement usernameAbsolute = driver.findElement(By.xpath(absoluteXPath));
                System.out.println("\n✅ Found element using absolute XPath");
                System.out.println("   But DON'T use this in real automation!");
            } catch (Exception e) {
                System.out.println("\n❌ Absolute XPath failed (as expected)");
            }

            // ========================================
            // RELATIVE XPATH (RECOMMENDED)
            // ========================================
            System.out.println("\n\n--- RELATIVE XPATH ---");
            System.out.println("Format: Starts with // (searches anywhere in DOM)");
            System.out.println("\nAdvantages of Relative XPath:");
            System.out.println("  ✅ More flexible and robust");
            System.out.println("  ✅ Shorter and easier to read");
            System.out.println("  ✅ Uses attributes for identification");
            System.out.println("  ✅ Industry standard!");

            // Method 1: Using ID attribute
            System.out.println("\n1. XPath with ID:");
            String xpathById = "//input[@id='user-name']";
            System.out.println("   XPath: " + xpathById);
            WebElement usernameById = driver.findElement(By.xpath(xpathById));
            usernameById.sendKeys("standard_user");
            System.out.println("   ✅ Typed 'standard_user' using XPath with ID");
            Thread.sleep(1500);
            usernameById.clear();

            // Method 2: Using data-test attribute
            System.out.println("\n2. XPath with custom attribute (data-test):");
            String xpathByDataTest = "//input[@data-test='username']";
            System.out.println("   XPath: " + xpathByDataTest);
            WebElement usernameByDataTest = driver.findElement(By.xpath(xpathByDataTest));
            usernameByDataTest.sendKeys("problem_user");
            System.out.println("   ✅ Typed 'problem_user' using XPath with data-test");
            Thread.sleep(1500);
            usernameByDataTest.clear();

            // Method 3: Using multiple attributes
            System.out.println("\n3. XPath with multiple attributes (AND condition):");
            String xpathMultiple = "//input[@type='text' and @placeholder='Username']";
            System.out.println("   XPath: " + xpathMultiple);
            WebElement usernameMultiple = driver.findElement(By.xpath(xpathMultiple));
            usernameMultiple.sendKeys("performance_user");
            System.out.println("   ✅ Typed 'performance_user' using multiple attributes");
            Thread.sleep(1500);
            usernameMultiple.clear();

            // Method 4: Using class attribute
            System.out.println("\n4. XPath with class (partial match):");
            String xpathByClass = "//input[contains(@class,'form_input')]";
            System.out.println("   XPath: " + xpathByClass);
            System.out.println("   Note: contains() is used when class has multiple values");
            WebElement usernameByClass = driver.findElement(By.xpath(xpathByClass));
            usernameByClass.sendKeys("locked_out_user");
            System.out.println("   ✅ Typed 'locked_out_user' using class attribute");

            System.out.println("\n=====================================");
            System.out.println("SUMMARY:");
            System.out.println("  - ALWAYS use Relative XPath (//...)");
            System.out.println("  - NEVER use Absolute XPath (/html/...)");
            System.out.println("  - Use unique attributes like ID, name, data-*");
            System.out.println("  - Use contains() for partial matches");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== XPATH: ABSOLUTE vs RELATIVE =====

✅ Opened: Swag Labs

--- ABSOLUTE XPATH ---
Format: Starts with single / from html root
Example: /html/body/div/div/div[2]/div/form/div[1]/input

Problems with Absolute XPath:
  ❌ Breaks easily when page structure changes
  ❌ Very long and hard to read
  ❌ Not maintainable
  ❌ Not recommended in real projects!

✅ Found element using absolute XPath
   But DON'T use this in real automation!


--- RELATIVE XPATH ---
Format: Starts with // (searches anywhere in DOM)

Advantages of Relative XPath:
  ✅ More flexible and robust
  ✅ Shorter and easier to read
  ✅ Uses attributes for identification
  ✅ Industry standard!

1. XPath with ID:
   XPath: //input[@id='user-name']
   ✅ Typed 'standard_user' using XPath with ID

2. XPath with custom attribute (data-test):
   XPath: //input[@data-test='username']
   ✅ Typed 'problem_user' using XPath with data-test

3. XPath with multiple attributes (AND condition):
   XPath: //input[@type='text' and @placeholder='Username']
   ✅ Typed 'performance_user' using multiple attributes

4. XPath with class (partial match):
   XPath: //input[contains(@class,'form_input')]
   Note: contains() is used when class has multiple values
   ✅ Typed 'locked_out_user' using class attribute

=====================================
SUMMARY:
  - ALWAYS use Relative XPath (//...)
  - NEVER use Absolute XPath (/html/...)
  - Use unique attributes like ID, name, data-*
  - Use contains() for partial matches
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens maximized
2. SauceDemo login page loads
3. Username field gets typed into 4 times (each time cleared)
4. You see: "standard_user" → cleared → "problem_user" → cleared → "performance_user" → cleared → "locked_out_user"
5. Browser stays open for 2 seconds
6. Browser closes

**✅ Success Criteria:**
- All 4 XPath methods work successfully
- Text is typed and cleared in username field
- Console shows all ✅ marks
- No exceptions thrown

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchElementException | XPath doesn't match any element | Verify XPath in DevTools console: $x("your-xpath") |
| TimeoutException | Page loading slowly | Add Thread.sleep() or implicit wait |
| StaleElementReferenceException | Page refreshed/changed | Re-find the element |
| "Unable to locate element" | Website structure changed | Inspect element again and update XPath |

**💡 Key Concepts:**

**1. XPath Syntax Basics:**
```java
// Absolute XPath (DON'T USE)
/html/body/div/div/input

// Relative XPath (USE THIS)
//input[@id='username']
```

**2. XPath Attribute Selectors:**
```java
//tagname[@attribute='value']
//input[@id='user-name']           // Exact match
//input[@type='text']                // Exact match
//input[contains(@class,'form')]     // Partial match
//input[starts-with(@id,'user')]     // Starts with
```

**3. Multiple Conditions:**
```java
//input[@type='text' and @name='username']    // AND
//input[@type='text' or @type='email']        // OR
```

**🎯 Practice Challenge:**

Try finding these elements using XPath:
1. Password field: Create 3 different XPaths
2. Login button: Create 3 different XPaths
3. Error message container: Use class attribute

---

#### Exercise 2: XPath with Text and Contains (25 minutes)

**What you'll learn:** How to find elements using their text content

**Create new class: `XPathTextMethods`**

```java
package com.automation.locators;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class XPathTextMethods {
    public static void main(String[] args) {
        System.out.println("===== XPATH: TEXT() FUNCTION =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Login first to access product page
            driver.get("https://www.saucedemo.com");
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();
            Thread.sleep(2000);

            System.out.println("✅ Logged in successfully");
            System.out.println("Current page: " + driver.getTitle());
            System.out.println();

            // ========================================
            // METHOD 1: Exact text match with text()
            // ========================================
            System.out.println("--- METHOD 1: Exact Text Match ---");
            System.out.println("Syntax: //tagname[text()='exact text']");
            System.out.println();

            // Find "Sauce Labs Backpack" product
            String exactTextXPath = "//div[text()='Sauce Labs Backpack']";
            System.out.println("Finding product with XPath: " + exactTextXPath);
            WebElement backpackTitle = driver.findElement(By.xpath(exactTextXPath));
            System.out.println("✅ Found: " + backpackTitle.getText());
            System.out.println("   Element tag: " + backpackTitle.getTagName());
            System.out.println();

            // ========================================
            // METHOD 2: Partial text match with contains()
            // ========================================
            System.out.println("--- METHOD 2: Partial Text Match ---");
            System.out.println("Syntax: //tagname[contains(text(),'partial text')]");
            System.out.println("Use when: Text is too long or dynamic");
            System.out.println();

            // Find element containing "Backpack"
            String partialTextXPath = "//div[contains(text(),'Backpack')]";
            System.out.println("Finding with partial text: " + partialTextXPath);
            WebElement backpackPartial = driver.findElement(By.xpath(partialTextXPath));
            System.out.println("✅ Found: " + backpackPartial.getText());
            System.out.println();

            // ========================================
            // METHOD 3: Case-insensitive search
            // ========================================
            System.out.println("--- METHOD 3: Case-Insensitive Search ---");
            System.out.println("Syntax: translate() function");
            System.out.println("Use when: You don't know exact case");
            System.out.println();

            // Find "ADD TO CART" button (case insensitive)
            String caseInsensitiveXPath = "//button[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'add to cart')]";
            System.out.println("Finding button with case-insensitive match");
            WebElement addButton = driver.findElement(By.xpath(caseInsensitiveXPath));
            System.out.println("✅ Found button: " + addButton.getText());
            addButton.click();
            System.out.println("✅ Clicked 'Add to Cart' button");
            Thread.sleep(1500);
            System.out.println();

            // ========================================
            // METHOD 4: Using text() with parent/child
            // ========================================
            System.out.println("--- METHOD 4: Text with Parent/Child ---");
            System.out.println("Finding parent based on child's text");
            System.out.println();

            // Find the parent div of "Sauce Labs Backpack"
            String parentXPath = "//div[text()='Sauce Labs Backpack']/parent::a/parent::div";
            System.out.println("XPath: " + parentXPath);
            WebElement parentDiv = driver.findElement(By.xpath(parentXPath));
            System.out.println("✅ Found parent element");
            System.out.println("   Parent class: " + parentDiv.getAttribute("class"));
            System.out.println();

            // ========================================
            // METHOD 5: Text with following-sibling
            // ========================================
            System.out.println("--- METHOD 5: Text with Following-Sibling ---");
            System.out.println("Finding sibling element based on text");
            System.out.println();

            // Find price of "Sauce Labs Backpack"
            String siblingXPath = "//div[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item_description']//div[@class='inventory_item_price']";
            System.out.println("Finding price using ancestor and descendant");
            WebElement price = driver.findElement(By.xpath(siblingXPath));
            System.out.println("✅ Found price: " + price.getText());
            System.out.println();

            // ========================================
            // PRACTICAL EXAMPLE: Click specific product
            // ========================================
            System.out.println("--- PRACTICAL EXAMPLE ---");
            System.out.println("Click on 'Sauce Labs Bike Light' product");
            System.out.println();

            String bikeLightXPath = "//div[text()='Sauce Labs Bike Light']";
            WebElement bikeLight = driver.findElement(By.xpath(bikeLightXPath));
            System.out.println("Product found: " + bikeLight.getText());
            bikeLight.click();
            Thread.sleep(2000);
            System.out.println("✅ Clicked on product");
            System.out.println("Current URL: " + driver.getCurrentUrl());
            System.out.println("Product detail page loaded!");

            driver.navigate().back();
            Thread.sleep(1500);
            System.out.println("✅ Navigated back to products page");

            System.out.println("\n=====================================");
            System.out.println("TEXT() FUNCTION SUMMARY:");
            System.out.println("  1. text()='exact'        → Exact match");
            System.out.println("  2. contains(text(),'x')  → Partial match");
            System.out.println("  3. translate()           → Case-insensitive");
            System.out.println("  4. /parent::             → Go to parent");
            System.out.println("  5. /ancestor::           → Go to ancestor");
            System.out.println("  6. //following-sibling:: → Next sibling");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== XPATH: TEXT() FUNCTION =====

✅ Logged in successfully
Current page: Swag Labs

--- METHOD 1: Exact Text Match ---
Syntax: //tagname[text()='exact text']

Finding product with XPath: //div[text()='Sauce Labs Backpack']
✅ Found: Sauce Labs Backpack
   Element tag: div

--- METHOD 2: Partial Text Match ---
Syntax: //tagname[contains(text(),'partial text')]
Use when: Text is too long or dynamic

Finding with partial text: //div[contains(text(),'Backpack')]
✅ Found: Sauce Labs Backpack

--- METHOD 3: Case-Insensitive Search ---
Syntax: translate() function
Use when: You don't know exact case

Finding button with case-insensitive match
✅ Found button: Add to cart
✅ Clicked 'Add to Cart' button

--- METHOD 4: Text with Parent/Child ---
Finding parent based on child's text

XPath: //div[text()='Sauce Labs Backpack']/parent::a/parent::div
✅ Found parent element
   Parent class: inventory_item_description

--- METHOD 5: Text with Following-Sibling ---
Finding sibling element based on text

Finding price using ancestor and descendant
✅ Found price: $29.99

--- PRACTICAL EXAMPLE ---
Click on 'Sauce Labs Bike Light' product

Product found: Sauce Labs Bike Light
✅ Clicked on product
Current URL: https://www.saucedemo.com/inventory-item.html?id=0
Product detail page loaded!
✅ Navigated back to products page

=====================================
TEXT() FUNCTION SUMMARY:
  1. text()='exact'        → Exact match
  2. contains(text(),'x')  → Partial match
  3. translate()           → Case-insensitive
  4. /parent::             → Go to parent
  5. /ancestor::           → Go to ancestor
  6. //following-sibling:: → Next sibling
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens and goes to SauceDemo
2. Automatically logs in
3. Products page appears
4. "Add to cart" button for backpack gets clicked (button changes to "Remove")
5. Bike Light product gets clicked
6. Product detail page opens
7. Browser navigates back to products page
8. Browser closes after 2 seconds

**✅ Success Criteria:**
- Successfully logs in
- All 5 XPath text methods work
- Add to cart button clicked
- Product clicked and detail page opens
- Successfully navigates back
- No exceptions

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| "Cannot locate element with text()" | Text has extra spaces | Use normalize-space(): //div[normalize-space()='text'] |
| "Multiple elements found" | XPath matches multiple elements | Make XPath more specific with index or attributes |
| ElementNotInteractableException | Element not clickable | Add wait or scroll to element |
| "Text not found" | Text is case-sensitive | Use translate() for case-insensitive |

**💡 Key Concepts:**

**1. Text Functions:**
```java
// Exact text
//div[text()='Hello']

// Contains text
//div[contains(text(),'Hello')]

// Starts with text
//div[starts-with(text(),'Hello')]

// Normalize space (removes extra spaces)
//div[normalize-space()='Hello World']
```

**2. Axes in XPath:**
```java
/parent::div           // Direct parent
/ancestor::div         // Any parent above
/child::button         // Direct child
/descendant::span      // Any child below
/following-sibling::   // Next sibling
/preceding-sibling::   // Previous sibling
```

**3. Combining Text with Attributes:**
```java
//button[text()='Login' and @type='submit']
//div[contains(text(),'Product') and @class='item']
```

**🎯 Practice Challenge:**

1. Find all products containing "Labs" in their name
2. Click "Add to cart" for "Sauce Labs Fleece Jacket"
3. Find the shopping cart badge showing count
4. Navigate to cart and verify items

---

#### Exercise 3: XPath Indexes and Multiple Elements (25 minutes)

**What you'll learn:** How to handle multiple elements with same XPath using indexes

**Create new class: `XPathIndexes`**

```java
package com.automation.locators;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class XPathIndexes {
    public static void main(String[] args) {
        System.out.println("===== XPATH: INDEXES & MULTIPLE ELEMENTS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Login
            driver.get("https://www.saucedemo.com");
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();
            Thread.sleep(2000);
            System.out.println("✅ Logged in\n");

            // ========================================
            // FINDING MULTIPLE ELEMENTS
            // ========================================
            System.out.println("--- FINDING MULTIPLE ELEMENTS ---");
            System.out.println("Using: driver.findElements() - returns List<WebElement>");
            System.out.println();

            // Find all product names
            String productXPath = "//div[@class='inventory_item_name ']";
            System.out.println("XPath: " + productXPath);
            List<WebElement> allProducts = driver.findElements(By.xpath(productXPath));
            System.out.println("✅ Found " + allProducts.size() + " products");
            System.out.println();

            System.out.println("--- ALL PRODUCTS ---");
            for (int i = 0; i < allProducts.size(); i++) {
                System.out.println((i + 1) + ". " + allProducts.get(i).getText());
            }
            System.out.println();

            // ========================================
            // USING XPATH INDEX [position]
            // ========================================
            System.out.println("--- USING XPATH INDEX ---");
            System.out.println("Syntax: (xpath)[index]");
            System.out.println("⚠️ IMPORTANT: XPath index starts from 1, not 0!");
            System.out.println();

            // Select first product
            String firstProductXPath = "(//div[@class='inventory_item_name '])[1]";
            System.out.println("First product XPath: " + firstProductXPath);
            WebElement firstProduct = driver.findElement(By.xpath(firstProductXPath));
            System.out.println("✅ First product: " + firstProduct.getText());
            System.out.println();

            // Select third product
            String thirdProductXPath = "(//div[@class='inventory_item_name '])[3]";
            System.out.println("Third product XPath: " + thirdProductXPath);
            WebElement thirdProduct = driver.findElement(By.xpath(thirdProductXPath));
            System.out.println("✅ Third product: " + thirdProduct.getText());
            System.out.println();

            // Select last product
            String lastProductXPath = "(//div[@class='inventory_item_name '])[last()]";
            System.out.println("Last product XPath: " + lastProductXPath);
            WebElement lastProduct = driver.findElement(By.xpath(lastProductXPath));
            System.out.println("✅ Last product: " + lastProduct.getText());
            System.out.println();

            // ========================================
            // PRACTICAL: Click specific product by index
            // ========================================
            System.out.println("--- CLICKING PRODUCT BY INDEX ---");
            String clickableXPath = "(//div[@class='inventory_item_name '])[2]";
            System.out.println("Clicking 2nd product: " + clickableXPath);
            WebElement secondProduct = driver.findElement(By.xpath(clickableXPath));
            System.out.println("Product: " + secondProduct.getText());
            secondProduct.click();
            Thread.sleep(2000);
            System.out.println("✅ Clicked and opened product detail page");
            driver.navigate().back();
            Thread.sleep(1500);
            System.out.println("✅ Navigated back");
            System.out.println();

            // ========================================
            // FINDING ALL ADD TO CART BUTTONS
            // ========================================
            System.out.println("--- FINDING ALL 'ADD TO CART' BUTTONS ---");
            String buttonXPath = "//button[text()='Add to cart']";
            List<WebElement> allButtons = driver.findElements(By.xpath(buttonXPath));
            System.out.println("✅ Found " + allButtons.size() + " 'Add to cart' buttons");
            System.out.println();

            // Click first 3 buttons
            System.out.println("--- ADDING 3 PRODUCTS TO CART ---");
            for (int i = 0; i < 3; i++) {
                String buttonIndexXPath = "(//button[text()='Add to cart'])[1]";
                // Note: Always use [1] because after clicking, button disappears!
                WebElement button = driver.findElement(By.xpath(buttonIndexXPath));
                String productName = button.getAttribute("data-test");
                button.click();
                System.out.println((i + 1) + ". Added product to cart");
                Thread.sleep(800);
            }
            System.out.println("✅ Added 3 products to cart");
            System.out.println();

            // Verify cart badge
            WebElement cartBadge = driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
            System.out.println("🛒 Cart badge shows: " + cartBadge.getText() + " items");
            System.out.println();

            // ========================================
            // POSITION() FUNCTION
            // ========================================
            System.out.println("--- USING POSITION() FUNCTION ---");
            System.out.println("position() = index of element among siblings");
            System.out.println();

            // Products at even positions
            String evenPositionXPath = "//div[@class='inventory_item'][position() mod 2 = 0]//div[@class='inventory_item_name ']";
            System.out.println("XPath for even positions: " + evenPositionXPath);
            List<WebElement> evenProducts = driver.findElements(By.xpath(evenPositionXPath));
            System.out.println("✅ Found " + evenProducts.size() + " products at even positions:");
            for (WebElement product : evenProducts) {
                System.out.println("  - " + product.getText());
            }
            System.out.println();

            // ========================================
            // COUNT() FUNCTION
            // ========================================
            System.out.println("--- COUNTING ELEMENTS ---");
            // In XPath, count() is used in conditions, but we use findElements().size() in Java
            int totalProducts = driver.findElements(By.xpath("//div[@class='inventory_item']")).size();
            int totalButtons = driver.findElements(By.xpath("//button[contains(@class,'btn_inventory')]")).size();
            System.out.println("Total product cards: " + totalProducts);
            System.out.println("Total buttons: " + totalButtons);
            System.out.println();

            System.out.println("=====================================");
            System.out.println("XPATH INDEX SUMMARY:");
            System.out.println("  - findElements() → List<WebElement>");
            System.out.println("  - (xpath)[1] → First element (1-based!)");
            System.out.println("  - (xpath)[last()] → Last element");
            System.out.println("  - position() → Element position");
            System.out.println("  - Always use parentheses: (xpath)[index]");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== XPATH: INDEXES & MULTIPLE ELEMENTS =====

✅ Logged in

--- FINDING MULTIPLE ELEMENTS ---
Using: driver.findElements() - returns List<WebElement>

XPath: //div[@class='inventory_item_name ']
✅ Found 6 products

--- ALL PRODUCTS ---
1. Sauce Labs Backpack
2. Sauce Labs Bike Light
3. Sauce Labs Bolt T-Shirt
4. Sauce Labs Fleece Jacket
5. Sauce Labs Onesie
6. Test.allTheThings() T-Shirt (Red)

--- USING XPATH INDEX ---
Syntax: (xpath)[index]
⚠️ IMPORTANT: XPath index starts from 1, not 0!

First product XPath: (//div[@class='inventory_item_name '])[1]
✅ First product: Sauce Labs Backpack

Third product XPath: (//div[@class='inventory_item_name '])[3]
✅ Third product: Sauce Labs Bolt T-Shirt

Last product XPath: (//div[@class='inventory_item_name '])[last()]
✅ Last product: Test.allTheThings() T-Shirt (Red)

--- CLICKING PRODUCT BY INDEX ---
Clicking 2nd product: (//div[@class='inventory_item_name '])[2]
Product: Sauce Labs Bike Light
✅ Clicked and opened product detail page
✅ Navigated back

--- FINDING ALL 'ADD TO CART' BUTTONS ---
✅ Found 6 'Add to cart' buttons

--- ADDING 3 PRODUCTS TO CART ---
1. Added product to cart
2. Added product to cart
3. Added product to cart
✅ Added 3 products to cart

🛒 Cart badge shows: 3 items

--- USING POSITION() FUNCTION ---
position() = index of element among siblings

XPath for even positions: //div[@class='inventory_item'][position() mod 2 = 0]//div[@class='inventory_item_name ']
✅ Found 3 products at even positions:
  - Sauce Labs Bike Light
  - Sauce Labs Fleece Jacket
  - Test.allTheThings() T-Shirt (Red)

--- COUNTING ELEMENTS ---
Total product cards: 6
Total buttons: 9

=====================================
XPATH INDEX SUMMARY:
  - findElements() → List<WebElement>");
  - (xpath)[1] → First element (1-based!)
  - (xpath)[last()] → Last element
  - position() → Element position
  - Always use parentheses: (xpath)[index]
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens, logs in automatically
2. Products page displays 6 products
3. Second product (Bike Light) gets clicked briefly
4. Navigates back to products page
5. Three "Add to cart" buttons get clicked one by one
6. Cart badge shows "3"
7. Browser closes

**✅ Success Criteria:**
- All 6 products found and listed
- Index-based selections work (1st, 3rd, last)
- Product clicked using index
- 3 products added to cart successfully
- Cart badge displays correct count
- Even-positioned products identified

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| IndexOutOfBoundsException | XPath index too high | Check how many elements exist first |
| "Invalid selector" | Missing parentheses around XPath | Use: (xpath)[index] not xpath[index] |
| ElementNotInteractableException | Element not visible/clickable | Scroll to element or add wait |
| StaleElementReferenceException | DOM changed after finding elements | Re-find elements after page changes |

**💡 Key Concepts:**

**1. findElement vs findElements:**
```java
// findElement → Returns WebElement (single)
// Throws NoSuchElementException if not found
WebElement element = driver.findElement(By.xpath("//div"));

// findElements → Returns List<WebElement> (multiple)
// Returns empty list if not found (no exception)
List<WebElement> elements = driver.findElements(By.xpath("//div"));
```

**2. XPath Index Syntax:**
```java
// ❌ WRONG - No parentheses
//div[@class='item'][1]

// ✅ CORRECT - With parentheses
(//div[@class='item'])[1]

// Special indexes
(//div)[1]        // First
(//div)[last()]   // Last
(//div)[last()-1] // Second from last
```

**3. Important Notes:**
- XPath index starts from 1 (not 0 like Java arrays)
- Always use parentheses when applying index
- findElements() returns empty list (not null) if no match

**🎯 Practice Challenge:**

1. Add the last 3 products to cart (use indexes)
2. Click every second "Add to cart" button
3. Find and print all product prices
4. Verify cart has correct number of items

---

#### Exercise 4: XPath Axes - Parent, Ancestor, Following, Preceding (30 minutes)

**What you'll learn:** Navigate DOM tree using XPath axes

**Create new class: `XPathAxes`**

```java
package com.automation.locators;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class XPathAxes {
    public static void main(String[] args) {
        System.out.println("===== XPATH AXES: NAVIGATING DOM TREE =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Login
            driver.get("https://www.saucedemo.com");
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();
            Thread.sleep(2000);
            System.out.println("✅ Logged in\n");

            // ========================================
            // AXIS 1: PARENT
            // ========================================
            System.out.println("--- AXIS 1: PARENT ---");
            System.out.println("Syntax: /parent::tagname or /..");
            System.out.println("Use: Go one level up in DOM");
            System.out.println();

            // Find parent of "Sauce Labs Backpack" text
            String childXPath = "//div[text()='Sauce Labs Backpack']";
            WebElement child = driver.findElement(By.xpath(childXPath));
            System.out.println("Child element: " + child.getText());
            System.out.println("Child tag: " + child.getTagName());
            System.out.println();

            String parentXPath = "//div[text()='Sauce Labs Backpack']/parent::a";
            WebElement parent = driver.findElement(By.xpath(parentXPath));
            System.out.println("✅ Parent element found");
            System.out.println("   Parent tag: " + parent.getTagName());
            System.out.println("   Parent href: " + parent.getAttribute("href"));
            System.out.println();

            // Alternative using ..
            String parentAltXPath = "//div[text()='Sauce Labs Backpack']/..";
            WebElement parentAlt = driver.findElement(By.xpath(parentAltXPath));
            System.out.println("✅ Using .. syntax: " + parentAlt.getTagName());
            System.out.println();

            // ========================================
            // AXIS 2: ANCESTOR
            // ========================================
            System.out.println("--- AXIS 2: ANCESTOR ---");
            System.out.println("Syntax: /ancestor::tagname");
            System.out.println("Use: Go up to any parent/grandparent");
            System.out.println();

            String ancestorXPath = "//div[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item']";
            WebElement ancestor = driver.findElement(By.xpath(ancestorXPath));
            System.out.println("✅ Ancestor found");
            System.out.println("   Ancestor class: " + ancestor.getAttribute("class"));
            System.out.println("   This is the entire product card!");
            System.out.println();

            // ========================================
            // AXIS 3: CHILD
            // ========================================
            System.out.println("--- AXIS 3: CHILD ---");
            System.out.println("Syntax: /child::tagname");
            System.out.println("Use: Go one level down in DOM");
            System.out.println();

            String itemXPath = "//div[@class='inventory_item'][1]";
            WebElement item = driver.findElement(By.xpath(itemXPath));

            String childrenXPath = "//div[@class='inventory_item'][1]/child::div";
            List<WebElement> children = driver.findElements(By.xpath(childrenXPath));
            System.out.println("✅ Direct children found: " + children.size());
            for (int i = 0; i < children.size(); i++) {
                System.out.println("   Child " + (i + 1) + ": class = " + children.get(i).getAttribute("class"));
            }
            System.out.println();

            // ========================================
            // AXIS 4: DESCENDANT
            // ========================================
            System.out.println("--- AXIS 4: DESCENDANT ---");
            System.out.println("Syntax: /descendant::tagname");
            System.out.println("Use: Find any element below (child/grandchild/etc)");
            System.out.println();

            String descendantXPath = "//div[@class='inventory_item'][1]/descendant::button";
            WebElement descendant = driver.findElement(By.xpath(descendantXPath));
            System.out.println("✅ Descendant button found: " + descendant.getText());
            System.out.println();

            // ========================================
            // AXIS 5: FOLLOWING-SIBLING
            // ========================================
            System.out.println("--- AXIS 5: FOLLOWING-SIBLING ---");
            System.out.println("Syntax: /following-sibling::tagname");
            System.out.println("Use: Find next siblings at same level");
            System.out.println();

            // Find price (sibling of product name area)
            String siblingXPath = "//div[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item_description']//div[@class='pricebar']";
            WebElement pricebar = driver.findElement(By.xpath(siblingXPath));
            System.out.println("✅ Found pricebar section");

            String priceXPath = "//div[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item_description']//div[@class='inventory_item_price']";
            WebElement price = driver.findElement(By.xpath(priceXPath));
            System.out.println("   Product: Sauce Labs Backpack");
            System.out.println("   Price: " + price.getText());
            System.out.println();

            // ========================================
            // AXIS 6: PRECEDING-SIBLING
            // ========================================
            System.out.println("--- AXIS 6: PRECEDING-SIBLING ---");
            System.out.println("Syntax: /preceding-sibling::tagname");
            System.out.println("Use: Find previous siblings at same level");
            System.out.println();

            // This is less common, showing concept
            System.out.println("(Less commonly used, but good to know)");
            System.out.println("✅ Finds siblings that come before current element");
            System.out.println();

            // ========================================
            // AXIS 7: FOLLOWING
            // ========================================
            System.out.println("--- AXIS 7: FOLLOWING ---");
            System.out.println("Syntax: /following::tagname");
            System.out.println("Use: Find all elements after current (not just siblings)");
            System.out.println();

            String followingXPath = "//div[text()='Sauce Labs Backpack']/following::div[@class='inventory_item_name ']";
            List<WebElement> followingElements = driver.findElements(By.xpath(followingXPath));
            System.out.println("✅ Found " + followingElements.size() + " products after 'Backpack':");
            for (WebElement elem : followingElements) {
                System.out.println("   - " + elem.getText());
            }
            System.out.println();

            // ========================================
            // AXIS 8: PRECEDING
            // ========================================
            System.out.println("--- AXIS 8: PRECEDING ---");
            System.out.println("Syntax: /preceding::tagname");
            System.out.println("Use: Find all elements before current");
            System.out.println();

            String precedingXPath = "//div[text()='Test.allTheThings() T-Shirt (Red)']/preceding::div[@class='inventory_item_name ']";
            List<WebElement> precedingElements = driver.findElements(By.xpath(precedingXPath));
            System.out.println("✅ Found " + precedingElements.size() + " products before 'Test.allTheThings':");
            for (WebElement elem : precedingElements) {
                System.out.println("   - " + elem.getText());
            }
            System.out.println();

            // ========================================
            // PRACTICAL EXAMPLE
            // ========================================
            System.out.println("--- PRACTICAL EXAMPLE ---");
            System.out.println("Task: Click 'Add to cart' for 'Sauce Labs Bolt T-Shirt'");
            System.out.println();

            String practicalXPath = "//div[text()='Sauce Labs Bolt T-Shirt']/ancestor::div[@class='inventory_item']//button";
            System.out.println("XPath: " + practicalXPath);
            System.out.println("Strategy: Find text → go to ancestor card → find button");

            WebElement addButton = driver.findElement(By.xpath(practicalXPath));
            System.out.println("✅ Button found: " + addButton.getText());
            addButton.click();
            Thread.sleep(1500);
            System.out.println("✅ Clicked 'Add to cart'");

            // Verify
            WebElement cartBadge = driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
            System.out.println("🛒 Cart now has: " + cartBadge.getText() + " item(s)");
            System.out.println();

            System.out.println("=====================================");
            System.out.println("XPATH AXES SUMMARY:");
            System.out.println("  parent::     → Direct parent");
            System.out.println("  ancestor::   → Any parent above");
            System.out.println("  child::      → Direct children");
            System.out.println("  descendant:: → Any child below");
            System.out.println("  following-sibling:: → Next siblings");
            System.out.println("  preceding-sibling:: → Previous siblings");
            System.out.println("  following::  → All elements after");
            System.out.println("  preceding::  → All elements before");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== XPATH AXES: NAVIGATING DOM TREE =====

✅ Logged in

--- AXIS 1: PARENT ---
Syntax: /parent::tagname or /..
Use: Go one level up in DOM

Child element: Sauce Labs Backpack
Child tag: div

✅ Parent element found
   Parent tag: a
   Parent href: https://www.saucedemo.com/inventory-item.html?id=4

✅ Using .. syntax: a

--- AXIS 2: ANCESTOR ---
Syntax: /ancestor::tagname
Use: Go up to any parent/grandparent

✅ Ancestor found
   Ancestor class: inventory_item
   This is the entire product card!

--- AXIS 3: CHILD ---
Syntax: /child::tagname
Use: Go one level down in DOM

✅ Direct children found: 2
   Child 1: class = inventory_item_img
   Child 2: class = inventory_item_description

--- AXIS 4: DESCENDANT ---
Syntax: /descendant::tagname
Use: Find any element below (child/grandchild/etc)

✅ Descendant button found: Add to cart

--- AXIS 5: FOLLOWING-SIBLING ---
Syntax: /following-sibling::tagname
Use: Find next siblings at same level

✅ Found pricebar section
   Product: Sauce Labs Backpack
   Price: $29.99

--- AXIS 6: PRECEDING-SIBLING ---
Syntax: /preceding-sibling::tagname
Use: Find previous siblings at same level

(Less commonly used, but good to know)
✅ Finds siblings that come before current element

--- AXIS 7: FOLLOWING ---
Syntax: /following::tagname
Use: Find all elements after current (not just siblings)

✅ Found 5 products after 'Backpack':
   - Sauce Labs Bike Light
   - Sauce Labs Bolt T-Shirt
   - Sauce Labs Fleece Jacket
   - Sauce Labs Onesie
   - Test.allTheThings() T-Shirt (Red)

--- AXIS 8: PRECEDING ---
Syntax: /preceding::tagname
Use: Find all elements before current

✅ Found 5 products before 'Test.allTheThings':
   - Sauce Labs Backpack
   - Sauce Labs Bike Light
   - Sauce Labs Bolt T-Shirt
   - Sauce Labs Fleece Jacket
   - Sauce Labs Onesie

--- PRACTICAL EXAMPLE ---
Task: Click 'Add to cart' for 'Sauce Labs Bolt T-Shirt'

XPath: //div[text()='Sauce Labs Bolt T-Shirt']/ancestor::div[@class='inventory_item']//button
Strategy: Find text → go to ancestor card → find button
✅ Button found: Add to cart
✅ Clicked 'Add to cart'
🛒 Cart now has: 1 item(s)

=====================================
XPATH AXES SUMMARY:
  parent::     → Direct parent
  ancestor::   → Any parent above
  child::      → Direct children
  descendant:: → Any child below
  following-sibling:: → Next siblings
  preceding-sibling:: → Previous siblings
  following::  → All elements after
  preceding::  → All elements before
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Logs in automatically
2. Products page loads
3. Various elements get identified (no visible action)
4. "Add to cart" button for Bolt T-Shirt gets clicked
5. Cart badge shows "1"
6. Browser closes

**✅ Success Criteria:**
- All 8 axes demonstrated successfully
- Parent, ancestor, child relationships found
- Following and preceding elements listed
- Practical example works (adds to cart)
- Cart badge shows correct count

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| "NoSuchElementException" | Axis path incorrect | Verify DOM structure in DevTools |
| "Multiple elements found" | Axis matches multiple elements | Add more specific conditions or use [1] |
| "InvalidSelectorException" | Syntax error in axis | Check axis name spelling and :: |
| NullPointerException | Element attribute doesn't exist | Use getAttribute() with null check |

**💡 Key Concepts:**

**1. DOM Tree Navigation:**
```
           ancestor
               ↑
           parent
               ↑
   sibling ← element → sibling
               ↓
            child
               ↓
          descendant
```

**2. Most Useful Axes:**
```java
// Finding button for a specific product
//div[text()='Product Name']/ancestor::div[@class='card']//button

// Finding price for a specific product
//div[text()='Product Name']/following-sibling::div[@class='price']

// Going up to parent
//input[@id='username']/parent::div
```

**3. Axes vs Direct Navigation:**
```java
// Using / (direct child)
//div/button  // button must be direct child

// Using // (any descendant)
//div//button  // button can be anywhere below

// Using axis
//div/descendant::button  // Same as above, more explicit
```

**🎯 Practice Challenge:**

1. Find all product descriptions using descendant axis
2. For "Sauce Labs Onesie", find its price using ancestor and descendant
3. Add last 2 products to cart using axes
4. Count total items in cart using cart badge

---

#### Exercise 5: Dynamic XPath with Predicates (25 minutes)

**What you'll learn:** Create flexible XPaths that work with changing data

**Create new class: `DynamicXPath`**

```java
package com.automation.locators;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class DynamicXPath {
    public static void main(String[] args) {
        System.out.println("===== DYNAMIC XPATH WITH PREDICATES =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Login
            driver.get("https://www.saucedemo.com");
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();
            Thread.sleep(2000);
            System.out.println("✅ Logged in\n");

            // ========================================
            // DYNAMIC XPATH WITH VARIABLES
            // ========================================
            System.out.println("--- DYNAMIC XPATH WITH VARIABLES ---");
            System.out.println("Real-world scenario: Product name comes from test data");
            System.out.println();

            // Product name from test data (could come from Excel, database, etc.)
            String productName = "Sauce Labs Fleece Jacket";

            System.out.println("Looking for product: " + productName);
            String dynamicXPath = "//div[text()='" + productName + "']";
            System.out.println("Generated XPath: " + dynamicXPath);

            WebElement product = driver.findElement(By.xpath(dynamicXPath));
            System.out.println("✅ Found: " + product.getText());
            System.out.println();

            // Click Add to Cart for this product
            String addButtonXPath = "//div[text()='" + productName + "']/ancestor::div[@class='inventory_item']//button";
            System.out.println("Add to Cart XPath: " + addButtonXPath);
            WebElement addButton = driver.findElement(By.xpath(addButtonXPath));
            addButton.click();
            System.out.println("✅ Added " + productName + " to cart");
            Thread.sleep(1500);
            System.out.println();

            // ========================================
            // DYNAMIC METHOD FOR REUSABILITY
            // ========================================
            System.out.println("--- CREATING REUSABLE METHOD ---");
            System.out.println();

            // Add multiple products using method
            String[] products = {"Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Onesie"};

            for (String prod : products) {
                addProductToCart(driver, prod);
                Thread.sleep(1000);
            }

            // Verify cart
            WebElement cartBadge = driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
            System.out.println("\n🛒 Total items in cart: " + cartBadge.getText());
            System.out.println();

            // ========================================
            // DYNAMIC XPATH WITH CONTAINS
            // ========================================
            System.out.println("--- DYNAMIC XPATH WITH PARTIAL MATCH ---");
            System.out.println();

            String partialName = "Bolt";
            System.out.println("Searching for products containing: " + partialName);

            String partialXPath = "//div[contains(text(),'" + partialName + "')]";
            System.out.println("XPath: " + partialXPath);

            List<WebElement> matchingProducts = driver.findElements(By.xpath(partialXPath));
            System.out.println("✅ Found " + matchingProducts.size() + " product(s):");
            for (WebElement prod : matchingProducts) {
                System.out.println("   - " + prod.getText());
            }
            System.out.println();

            // ========================================
            // PREDICATES WITH CONDITIONS
            // ========================================
            System.out.println("--- PREDICATES WITH CONDITIONS ---");
            System.out.println();

            // Find products with specific price range
            System.out.println("Finding product with price $29.99:");
            String priceXPath = "//div[contains(text(),'$29.99')]/preceding-sibling::div//div[@class='inventory_item_name ']";
            List<WebElement> productsWithPrice = driver.findElements(By.xpath(priceXPath));
            System.out.println("✅ Found " + productsWithPrice.size() + " product(s) with this price:");
            for (WebElement prod : productsWithPrice) {
                System.out.println("   - " + prod.getText());
            }
            System.out.println();

            // ========================================
            // MULTIPLE CONDITIONS (AND/OR)
            // ========================================
            System.out.println("--- MULTIPLE CONDITIONS ---");
            System.out.println();

            // Button that contains 'Remove' AND has specific data attribute
            String multiConditionXPath = "//button[contains(text(),'Remove') and contains(@class,'btn_inventory')]";
            List<WebElement> removeButtons = driver.findElements(By.xpath(multiConditionXPath));
            System.out.println("✅ Found " + removeButtons.size() + " 'Remove' buttons");
            System.out.println("   (These are products already in cart)");
            System.out.println();

            // ========================================
            // DYNAMIC VERIFICATION
            // ========================================
            System.out.println("--- DYNAMIC VERIFICATION ---");
            System.out.println();

            // Check if specific product is in cart
            String checkProduct = "Sauce Labs Backpack";
            System.out.println("Verifying if '" + checkProduct + "' is in cart...");

            String verifyXPath = "//div[text()='" + checkProduct + "']/ancestor::div[@class='inventory_item']//button[text()='Remove']";

            try {
                WebElement removeBtn = driver.findElement(By.xpath(verifyXPath));
                System.out.println("✅ YES - " + checkProduct + " is in cart");
                System.out.println("   (Button shows 'Remove' instead of 'Add to cart')");
            } catch (Exception e) {
                System.out.println("❌ NO - " + checkProduct + " is NOT in cart");
            }
            System.out.println();

            // ========================================
            // REAL-WORLD SCENARIO
            // ========================================
            System.out.println("--- REAL-WORLD SCENARIO ---");
            System.out.println("Test Case: Add product and verify it's added");
            System.out.println();

            String testProduct = "Test.allTheThings() T-Shirt (Red)";
            System.out.println("1. Adding product: " + testProduct);

            // Add the product
            addProductToCart(driver, testProduct);
            Thread.sleep(1500);

            // Verify it's added
            System.out.println("2. Verifying product is in cart...");
            String verifyAdded = "//div[text()='" + testProduct + "']/ancestor::div[@class='inventory_item']//button[text()='Remove']";

            WebElement verifyButton = driver.findElement(By.xpath(verifyAdded));
            if (verifyButton.getText().equals("Remove")) {
                System.out.println("✅ TEST PASSED: Product successfully added to cart");
            } else {
                System.out.println("❌ TEST FAILED: Product not added to cart");
            }
            System.out.println();

            // Final cart count
            WebElement finalCartBadge = driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
            System.out.println("🛒 Final cart count: " + finalCartBadge.getText() + " items");

            System.out.println("\n=====================================");
            System.out.println("DYNAMIC XPATH SUMMARY:");
            System.out.println("  - Use variables in XPath strings");
            System.out.println("  - Create reusable methods");
            System.out.println("  - Use contains() for flexibility");
            System.out.println("  - Combine multiple conditions");
            System.out.println("  - Always verify actions");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }

    /**
     * Reusable method to add product to cart using dynamic XPath
     * @param driver WebDriver instance
     * @param productName Name of the product to add
     */
    public static void addProductToCart(WebDriver driver, String productName) {
        try {
            String xpath = "//div[text()='" + productName + "']/ancestor::div[@class='inventory_item']//button[text()='Add to cart']";
            WebElement button = driver.findElement(By.xpath(xpath));
            button.click();
            System.out.println("✅ Added to cart: " + productName);
        } catch (Exception e) {
            System.out.println("❌ Could not add to cart: " + productName);
        }
    }
}
```

**Expected Output:**
```
===== DYNAMIC XPATH WITH PREDICATES =====

✅ Logged in

--- DYNAMIC XPATH WITH VARIABLES ---
Real-world scenario: Product name comes from test data

Looking for product: Sauce Labs Fleece Jacket
Generated XPath: //div[text()='Sauce Labs Fleece Jacket']
✅ Found: Sauce Labs Fleece Jacket

Add to Cart XPath: //div[text()='Sauce Labs Fleece Jacket']/ancestor::div[@class='inventory_item']//button
✅ Added Sauce Labs Fleece Jacket to cart

--- CREATING REUSABLE METHOD ---

✅ Added to cart: Sauce Labs Backpack
✅ Added to cart: Sauce Labs Bike Light
✅ Added to cart: Sauce Labs Onesie

🛒 Total items in cart: 4

--- DYNAMIC XPATH WITH PARTIAL MATCH ---

Searching for products containing: Bolt
XPath: //div[contains(text(),'Bolt')]
✅ Found 1 product(s):
   - Sauce Labs Bolt T-Shirt

--- PREDICATES WITH CONDITIONS ---

Finding product with price $29.99:
✅ Found 1 product(s) with this price:
   - Sauce Labs Backpack

--- MULTIPLE CONDITIONS ---

✅ Found 4 'Remove' buttons
   (These are products already in cart)

--- DYNAMIC VERIFICATION ---

Verifying if 'Sauce Labs Backpack' is in cart...
✅ YES - Sauce Labs Backpack is in cart
   (Button shows 'Remove' instead of 'Add to cart')

--- REAL-WORLD SCENARIO ---
Test Case: Add product and verify it's added

1. Adding product: Test.allTheThings() T-Shirt (Red)
✅ Added to cart: Test.allTheThings() T-Shirt (Red)
2. Verifying product is in cart...
✅ TEST PASSED: Product successfully added to cart

🛒 Final cart count: 5 items

=====================================
DYNAMIC XPATH SUMMARY:
  - Use variables in XPath strings");
  - Create reusable methods
  - Use contains() for flexibility
  - Combine multiple conditions
  - Always verify actions
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Logs in to SauceDemo
2. Multiple products get added to cart (buttons change from "Add to cart" to "Remove")
3. Cart badge number increases: 1 → 2 → 3 → 4 → 5
4. No navigation away from products page
5. Browser closes

**✅ Success Criteria:**
- Dynamic XPath with variables works
- Reusable method successfully adds multiple products
- Partial match with contains() works
- Verification confirms products in cart
- Final cart count is correct (5 items)

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| "NoSuchElementException" | Product name doesn't match exactly | Check spelling, spaces, case |
| String concatenation errors | Missing quotes in XPath | Use: "//div[text()='" + variable + "']" |
| "Button already shows Remove" | Product already in cart | Check product state before clicking |
| StaleElementReferenceException | DOM updated after adding to cart | Re-find element or accept it's updated |

**💡 Key Concepts:**

**1. String Concatenation in XPath:**
```java
String productName = "Backpack";

// ✅ CORRECT
String xpath = "//div[text()='" + productName + "']";
// Results in: //div[text()='Backpack']

// ❌ WRONG
String xpath = "//div[text()=" + productName + "]";
// Missing quotes around variable
```

**2. Creating Reusable Methods:**
```java
public static void addProductToCart(WebDriver driver, String productName) {
    String xpath = "//div[text()='" + productName + "']/ancestor::div//button";
    driver.findElement(By.xpath(xpath)).click();
}

// Usage
addProductToCart(driver, "Backpack");
addProductToCart(driver, "Bike Light");
```

**3. Dynamic Predicates:**
```java
// Single condition
"//button[@class='" + className + "']"

// Multiple conditions (AND)
"//button[@class='" + className + "' and text()='" + text + "']"

// Partial match
"//div[contains(text(),'" + partialText + "')]"
```

**4. Verification Pattern:**
```java
// Add product
addProductToCart(driver, productName);

// Verify it's added
String verifyXPath = "//div[text()='" + productName + "']//button[text()='Remove']";
boolean isAdded = driver.findElements(By.xpath(verifyXPath)).size() > 0;
```

**🎯 Practice Challenge:**

1. Create method `removeProductFromCart(driver, productName)`
2. Create method `getProductPrice(driver, productName)` that returns price as String
3. Create method `isProductInCart(driver, productName)` that returns boolean
4. Use all methods in a test: add 3 products, verify all added, remove 1, verify removed

**Real-World Application:**
This dynamic XPath approach is used in:
- Data-driven testing (read products from Excel)
- Parameterized tests (TestNG DataProvider)
- Page Object Model (methods accept product name parameter)
- BDD scenarios (Cucumber step definitions with parameters)

---

#### Exercise 6: XPath Best Practices & Common Pitfalls (20 minutes)

**What you'll learn:** Professional tips for writing maintainable XPath

**Create new class: `XPathBestPractices`**

```java
package com.automation.locators;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class XPathBestPractices {
    public static void main(String[] args) {
        System.out.println("===== XPATH BEST PRACTICES =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.saucedemo.com");
            Thread.sleep(1500);

            System.out.println("=======================================");
            System.out.println("BEST PRACTICE #1: Use ID when available");
            System.out.println("=======================================\n");

            // ❌ BAD: Using complex XPath when ID exists
            String badXPath = "//div[@class='login_wrapper']//form/div[1]/input";
            System.out.println("❌ Bad: " + badXPath);
            System.out.println("   Issues: Complex, fragile, hard to read");

            // ✅ GOOD: Use ID directly
            String goodId = "user-name";
            System.out.println("✅ Good: By.id(\"" + goodId + "\")");
            System.out.println("   Benefits: Simple, fast, reliable");

            WebElement usernameGood = driver.findElement(By.id(goodId));
            usernameGood.sendKeys("standard_user");
            System.out.println("✅ Typed using ID");
            Thread.sleep(1000);
            usernameGood.clear();
            System.out.println();

            System.out.println("=======================================");
            System.out.println("BEST PRACTICE #2: Avoid indexes when possible");
            System.out.println("=======================================\n");

            // ❌ BAD: Using index
            String badIndex = "//form/div[1]/input";
            System.out.println("❌ Bad: " + badIndex);
            System.out.println("   Problem: Breaks if new element added before it");

            // ✅ GOOD: Use unique attribute
            String goodAttr = "//input[@data-test='username']";
            System.out.println("✅ Good: " + goodAttr);
            System.out.println("   Benefit: Stable even if DOM changes");

            WebElement usernameAttr = driver.findElement(By.xpath(goodAttr));
            usernameAttr.sendKeys("problem_user");
            System.out.println("✅ Typed using data attribute");
            Thread.sleep(1000);
            usernameAttr.clear();
            System.out.println();

            System.out.println("=======================================");
            System.out.println("BEST PRACTICE #3: Keep XPath short and readable");
            System.out.println("=======================================\n");

            // ❌ BAD: Very long XPath
            String tooLong = "/html/body/div[@id='root']/div/div[@class='login_wrapper']/div[@class='login_wrapper-inner']/div[@id='login_button_container']/div/form/div[2]/input[@id='password']";
            System.out.println("❌ Bad: " + tooLong);
            System.out.println("   Issues: Hard to read, maintain, debug");

            // ✅ GOOD: Short, focused XPath
            String shortGood = "//input[@id='password']";
            System.out.println("✅ Good: " + shortGood);
            System.out.println("   Benefits: Clear, maintainable");

            WebElement password = driver.findElement(By.xpath(shortGood));
            password.sendKeys("secret_sauce");
            System.out.println("✅ Typed password");
            Thread.sleep(1000);
            System.out.println();

            System.out.println("=======================================");
            System.out.println("BEST PRACTICE #4: Use data-* attributes");
            System.out.println("=======================================\n");

            System.out.println("Many modern apps use data-* attributes for testing");
            System.out.println("Example: data-test, data-testid, data-automation-id");
            System.out.println();

            // ✅ GOOD: data-test attribute (designed for testing)
            String dataTest = "//input[@data-test='username']";
            System.out.println("✅ XPath: " + dataTest);
            System.out.println("   Why good: data-* attributes rarely change");
            System.out.println("   They're specifically for automation!");
            System.out.println();

            System.out.println("=======================================");
            System.out.println("BEST PRACTICE #5: Avoid text() for dynamic content");
            System.out.println("=======================================\n");

            // Click login first
            driver.findElement(By.id("login-button")).click();
            Thread.sleep(2000);

            // ❌ BAD: text() for content that might change
            System.out.println("❌ Bad: //button[text()='Add to cart']");
            System.out.println("   Problem: Text might change (localization, updates)");

            // ✅ BETTER: Use attribute
            String buttonGood = "//button[@data-test='add-to-cart-sauce-labs-backpack']";
            System.out.println("✅ Good: " + buttonGood);
            System.out.println("   Benefit: Attribute is stable");

            WebElement addBtn = driver.findElement(By.xpath(buttonGood));
            addBtn.click();
            System.out.println("✅ Clicked using data-test attribute");
            Thread.sleep(1500);
            System.out.println();

            System.out.println("=======================================");
            System.out.println("BEST PRACTICE #6: Use contains() wisely");
            System.out.println("=======================================\n");

            // ❌ BAD: Too generic contains()
            String tooGeneric = "//button[contains(@class,'btn')]";
            System.out.println("❌ Bad: " + tooGeneric);
            System.out.println("   Problem: Matches too many elements");

            // ✅ GOOD: Specific contains()
            String specificContains = "//button[contains(@class,'btn_inventory') and contains(text(),'Remove')]";
            System.out.println("✅ Good: " + specificContains);
            System.out.println("   Benefit: Narrow and specific");

            WebElement removeBtn = driver.findElement(By.xpath(specificContains));
            System.out.println("✅ Found specific button: " + removeBtn.getText());
            System.out.println();

            System.out.println("=======================================");
            System.out.println("BEST PRACTICE #7: Comment your complex XPaths");
            System.out.println("=======================================\n");

            // ✅ GOOD: Commented XPath
            System.out.println("In your code:");
            System.out.println("// Find 'Remove' button for the Backpack product");
            System.out.println("// Strategy: Find product name, go to parent card, find button");
            String commentedXPath = "//div[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item']//button";
            System.out.println("String xpath = \"" + commentedXPath + "\";");
            System.out.println();
            System.out.println("✅ Benefit: Other testers understand your approach");
            System.out.println();

            System.out.println("=======================================");
            System.out.println("COMMON PITFALLS TO AVOID");
            System.out.println("=======================================\n");

            System.out.println("❌ PITFALL 1: Using absolute XPath");
            System.out.println("   /html/body/div/div/input");
            System.out.println("   → Breaks easily\n");

            System.out.println("❌ PITFALL 2: Relying on order/position");
            System.out.println("   //div[3]");
            System.out.println("   → Breaks when elements added/removed\n");

            System.out.println("❌ PITFALL 3: XPath too specific to CSS");
            System.out.println("   //div[@style='color: red']");
            System.out.println("   → Breaks when styling changes\n");

            System.out.println("❌ PITFALL 4: Not handling special characters");
            System.out.println("   //div[text()='Price: $25.99']");
            System.out.println("   → Works, but be careful with quotes inside text\n");

            System.out.println("❌ PITFALL 5: Using parent classes that change");
            System.out.println("   //div[@class='active highlighted']//input");
            System.out.println("   → Class 'active' might toggle\n");

            System.out.println("=======================================");
            System.out.println("XPATH PREFERENCE ORDER");
            System.out.println("=======================================\n");

            System.out.println("1. ID (if unique)");
            System.out.println("   driver.findElement(By.id(\"username\"))");
            System.out.println();

            System.out.println("2. data-* attributes");
            System.out.println("   //input[@data-test='username']");
            System.out.println();

            System.out.println("3. Unique attributes");
            System.out.println("   //input[@name='username']");
            System.out.println();

            System.out.println("4. text() (for labels, buttons)");
            System.out.println("   //button[text()='Submit']");
            System.out.println();

            System.out.println("5. Combination with axes");
            System.out.println("   //label[text()='Username']/following-sibling::input");
            System.out.println();

            System.out.println("6. Complex combination (last resort)");
            System.out.println("   //div[@class='form']//input[@type='text'][1]");
            System.out.println();

            System.out.println("=======================================");
            System.out.println("SUMMARY: XPATH BEST PRACTICES");
            System.out.println("=======================================\n");

            System.out.println("✅ DO:");
            System.out.println("  - Use ID when available");
            System.out.println("  - Prefer data-* attributes");
            System.out.println("  - Keep XPath short and readable");
            System.out.println("  - Use contains() for partial matches");
            System.out.println("  - Comment complex XPaths");
            System.out.println("  - Test XPath in DevTools: $x(\"xpath\")");
            System.out.println();

            System.out.println("❌ DON'T:");
            System.out.println("  - Use absolute XPath");
            System.out.println("  - Rely on position/index");
            System.out.println("  - Use overly complex XPath");
            System.out.println("  - Depend on CSS classes that change");
            System.out.println("  - Forget to handle special characters");
            System.out.println();

            System.out.println("=======================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== XPATH BEST PRACTICES =====

=======================================
BEST PRACTICE #1: Use ID when available
=======================================

❌ Bad: //div[@class='login_wrapper']//form/div[1]/input
   Issues: Complex, fragile, hard to read
✅ Good: By.id("user-name")
   Benefits: Simple, fast, reliable
✅ Typed using ID

=======================================
BEST PRACTICE #2: Avoid indexes when possible
=======================================

❌ Bad: //form/div[1]/input
   Problem: Breaks if new element added before it
✅ Good: //input[@data-test='username']
   Benefit: Stable even if DOM changes
✅ Typed using data attribute

=======================================
BEST PRACTICE #3: Keep XPath short and readable
=======================================

❌ Bad: /html/body/div[@id='root']/div/div[@class='login_wrapper']/div[@class='login_wrapper-inner']/div[@id='login_button_container']/div/form/div[2]/input[@id='password']
   Issues: Hard to read, maintain, debug
✅ Good: //input[@id='password']
   Benefits: Clear, maintainable
✅ Typed password

=======================================
BEST PRACTICE #4: Use data-* attributes
=======================================

Many modern apps use data-* attributes for testing
Example: data-test, data-testid, data-automation-id

✅ XPath: //input[@data-test='username']
   Why good: data-* attributes rarely change
   They're specifically for automation!

=======================================
BEST PRACTICE #5: Avoid text() for dynamic content
=======================================

❌ Bad: //button[text()='Add to cart']
   Problem: Text might change (localization, updates)
✅ Good: //button[@data-test='add-to-cart-sauce-labs-backpack']
   Benefit: Attribute is stable
✅ Clicked using data-test attribute

=======================================
BEST PRACTICE #6: Use contains() wisely
=======================================

❌ Bad: //button[contains(@class,'btn')]
   Problem: Matches too many elements
✅ Good: //button[contains(@class,'btn_inventory') and contains(text(),'Remove')]
   Benefit: Narrow and specific
✅ Found specific button: Remove

=======================================
BEST PRACTICE #7: Comment your complex XPaths
=======================================

In your code:
// Find 'Remove' button for the Backpack product
// Strategy: Find product name, go to parent card, find button
String xpath = "//div[text()='Sauce Labs Backpack']/ancestor::div[@class='inventory_item']//button";

✅ Benefit: Other testers understand your approach

=======================================
COMMON PITFALLS TO AVOID
=======================================

❌ PITFALL 1: Using absolute XPath
   /html/body/div/div/input
   → Breaks easily

❌ PITFALL 2: Relying on order/position
   //div[3]
   → Breaks when elements added/removed

❌ PITFALL 3: XPath too specific to CSS
   //div[@style='color: red']
   → Breaks when styling changes

❌ PITFALL 4: Not handling special characters
   //div[text()='Price: $25.99']
   → Works, but be careful with quotes inside text

❌ PITFALL 5: Using parent classes that change
   //div[@class='active highlighted']//input
   → Class 'active' might toggle

=======================================
XPATH PREFERENCE ORDER
=======================================

1. ID (if unique)
   driver.findElement(By.id("username"))

2. data-* attributes
   //input[@data-test='username']

3. Unique attributes
   //input[@name='username']

4. text() (for labels, buttons)
   //button[text()='Submit']

5. Combination with axes
   //label[text()='Username']/following-sibling::input

6. Complex combination (last resort)
   //div[@class='form']//input[@type='text'][1]

=======================================
SUMMARY: XPATH BEST PRACTICES
=======================================

✅ DO:
  - Use ID when available
  - Prefer data-* attributes
  - Keep XPath short and readable
  - Use contains() for partial matches
  - Comment complex XPaths
  - Test XPath in DevTools: $x("xpath")

❌ DON'T:
  - Use absolute XPath
  - Rely on position/index
  - Use overly complex XPath
  - Depend on CSS classes that change
  - Forget to handle special characters

=======================================

✅ Browser closed
```

**What Happens in Browser:**
1. Login page loads
2. Username field gets typed into multiple times with different approaches
3. Password field gets typed into
4. Clicks login button
5. Products page appears
6. One product added to cart (button changes to "Remove")
7. Browser closes

**✅ Success Criteria:**
- All best practices demonstrated
- Bad vs good comparisons shown clearly
- Code runs without errors
- Console output is educational and clear
- Examples work on real website

**❌ Common Mistakes to Learn From:**

| Mistake | Why It's Bad | Better Approach |
|---------|--------------|-----------------|
| `/html/body/div[1]/input` | Absolute path breaks easily | `//input[@id='username']` |
| `//div[3]/input` | Position-dependent | `//input[@name='username']` |
| `//div[@class='red active']/input` | Class combination might change | `//input[@data-test='username']` |
| `//div[contains(@class,'btn')]` | Too generic, matches many | `//button[contains(@data-test,'add-to-cart')]` |

**💡 Key Takeaways:**

**1. XPath Priority (Best to Worst):**
```
ID > data-* attributes > unique attributes > text() > complex combinations
```

**2. Testing XPath in Browser DevTools:**
```javascript
// In Browser Console
$x("//input[@id='username']")  // Returns array of matching elements
```

**3. Maintainable XPath Characteristics:**
- Short (under 100 characters when possible)
- Uses stable attributes (ID, data-*, name)
- Self-documenting (clear what it's finding)
- Not position-dependent
- Has comments explaining complex logic

**4. Code Review Checklist:**
Before committing XPath, ask:
- Could this break if page layout changes?
- Is there a simpler way to find this element?
- Will other team members understand this XPath?
- Have I used absolute paths? (If yes, refactor!)
- Have I tested this XPath in browser console?

**🎯 Practice Challenge:**

Review these XPaths and improve them:

```java
// BAD - Improve these!
1. "/html/body/div/div/div/input"
2. "//div[1]/div[2]/button"
3. "//div[@class='container active']/button"
4. "//button[contains(@class,'btn')]"

// Create GOOD versions using:
- ID if available
- data-* attributes
- Unique attributes
- Text with proper context
```

**Real-World Impact:**
Well-written XPath:
- Reduces test maintenance time by 50%+
- Makes tests more reliable
- Easier for team to understand and modify
- Faster execution (simpler XPath = faster)
- Fewer false test failures

---

## 📌 Day 22 Summary:

**You've Learned:**
- ✅ Absolute vs Relative XPath (always use relative!)
- ✅ XPath with text() function and contains()
- ✅ Using indexes and handling multiple elements
- ✅ XPath axes (parent, ancestor, following, etc.)
- ✅ Dynamic XPath with variables
- ✅ Best practices and common pitfalls

**Key Skills Acquired:**
1. Write flexible, maintainable XPath
2. Navigate DOM tree efficiently
3. Create reusable locator methods
4. Avoid common XPath mistakes
5. Follow industry best practices

**Tomorrow (Day 23): CSS Selectors Mastery**
- CSS vs XPath comparison
- CSS selector syntax
- Advanced CSS pseudo-classes
- When to use CSS vs XPath

---

### Day 23: CSS Selectors Mastery

---

#### Exercise 1: CSS Selectors Basics (20 minutes)

**What you'll learn:** CSS selector syntax and basic selectors

**Practice Website:** https://www.saucedemo.com

**Create new package: `com.automation.cssselectors`**
**Create new class: `CSSBasics`**

```java
package com.automation.cssselectors;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class CSSBasics {
    public static void main(String[] args) {
        System.out.println("===== CSS SELECTORS BASICS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://www.saucedemo.com");
            Thread.sleep(1500);

            System.out.println("=====================================");
            System.out.println("CSS SELECTOR METHOD 1: ID SELECTOR");
            System.out.println("=====================================\n");

            // CSS: #idValue
            System.out.println("Syntax: #idValue");
            System.out.println("Example: #user-name");
            System.out.println();

            String cssById = "#user-name";
            System.out.println("CSS: " + cssById);
            WebElement username = driver.findElement(By.cssSelector(cssById));
            username.sendKeys("standard_user");
            System.out.println("✅ Typed using CSS ID selector");
            Thread.sleep(1000);
            username.clear();
            System.out.println();

            System.out.println("=====================================");
            System.out.println("CSS SELECTOR METHOD 2: CLASS SELECTOR");
            System.out.println("=====================================\n");

            // CSS: .className
            System.out.println("Syntax: .className");
            System.out.println("Example: .form_input");
            System.out.println();

            String cssByClass = ".form_input";
            System.out.println("CSS: " + cssByClass);
            WebElement inputByClass = driver.findElement(By.cssSelector(cssByClass));
            inputByClass.sendKeys("problem_user");
            System.out.println("✅ Typed using CSS class selector");
            System.out.println("   Note: This selects FIRST element with this class");
            Thread.sleep(1000);
            inputByClass.clear();
            System.out.println();

            System.out.println("=====================================");
            System.out.println("CSS SELECTOR METHOD 3: TAG SELECTOR");
            System.out.println("=====================================\n");

            // CSS: tagname
            System.out.println("Syntax: tagname");
            System.out.println("Example: input");
            System.out.println();

            String cssByTag = "input";
            System.out.println("CSS: " + cssByTag);
            WebElement inputByTag = driver.findElement(By.cssSelector(cssByTag));
            System.out.println("✅ Found element: " + inputByTag.getTagName());
            System.out.println("   Attribute 'type': " + inputByTag.getAttribute("type"));
            System.out.println("   Note: Selects FIRST input on page");
            System.out.println();

            System.out.println("=====================================");
            System.out.println("CSS SELECTOR METHOD 4: ATTRIBUTE SELECTOR");
            System.out.println("=====================================\n");

            // CSS: [attribute='value']
            System.out.println("Syntax: [attribute='value']");
            System.out.println("Examples:");
            System.out.println("  [type='text']");
            System.out.println("  [placeholder='Username']");
            System.out.println("  [data-test='username']");
            System.out.println();

            // Using type attribute
            String cssByType = "[type='text']";
            System.out.println("CSS: " + cssByType);
            WebElement inputByType = driver.findElement(By.cssSelector(cssByType));
            inputByType.sendKeys("performance_user");
            System.out.println("✅ Typed using attribute selector [type='text']");
            Thread.sleep(1000);
            inputByType.clear();
            System.out.println();

            // Using data-test attribute
            String cssByDataTest = "[data-test='username']";
            System.out.println("CSS: " + cssByDataTest);
            WebElement inputByDataTest = driver.findElement(By.cssSelector(cssByDataTest));
            inputByDataTest.sendKeys("locked_out_user");
            System.out.println("✅ Typed using attribute selector [data-test='username']");
            Thread.sleep(1000);
            inputByDataTest.clear();
            System.out.println();

            System.out.println("=====================================");
            System.out.println("CSS SELECTOR METHOD 5: TAG + ID");
            System.out.println("=====================================\n");

            // CSS: tag#id
            System.out.println("Syntax: tag#id");
            System.out.println("Example: input#user-name");
            System.out.println("More specific than just #id");
            System.out.println();

            String cssTagAndId = "input#user-name";
            System.out.println("CSS: " + cssTagAndId);
            WebElement inputTagId = driver.findElement(By.cssSelector(cssTagAndId));
            inputTagId.sendKeys("standard_user");
            System.out.println("✅ Typed using tag#id selector");
            Thread.sleep(1000);
            inputTagId.clear();
            System.out.println();

            System.out.println("=====================================");
            System.out.println("CSS SELECTOR METHOD 6: TAG + CLASS");
            System.out.println("=====================================\n");

            // CSS: tag.className
            System.out.println("Syntax: tag.className");
            System.out.println("Example: input.form_input");
            System.out.println();

            String cssTagAndClass = "input.form_input";
            System.out.println("CSS: " + cssTagAndClass);
            WebElement inputTagClass = driver.findElement(By.cssSelector(cssTagAndClass));
            inputTagClass.sendKeys("visual_user");
            System.out.println("✅ Typed using tag.class selector");
            Thread.sleep(1000);
            inputTagClass.clear();
            System.out.println();

            System.out.println("=====================================");
            System.out.println("CSS SELECTOR METHOD 7: MULTIPLE CLASSES");
            System.out.println("=====================================\n");

            // CSS: .class1.class2.class3
            System.out.println("Syntax: .class1.class2.class3");
            System.out.println("Example: .input_error.form_input");
            System.out.println("Finds element that has ALL these classes");
            System.out.println();

            String cssMultiClass = ".input_error.form_input";
            System.out.println("CSS: " + cssMultiClass);
            WebElement inputMultiClass = driver.findElement(By.cssSelector(cssMultiClass));
            inputMultiClass.sendKeys("multi_class_user");
            System.out.println("✅ Typed using multiple class selector");
            Thread.sleep(1000);
            inputMultiClass.clear();
            System.out.println();

            System.out.println("=====================================");
            System.out.println("CSS SELECTOR METHOD 8: TAG + ATTRIBUTE");
            System.out.println("=====================================\n");

            // CSS: tag[attribute='value']
            System.out.println("Syntax: tag[attribute='value']");
            System.out.println("Example: input[placeholder='Username']");
            System.out.println();

            String cssTagAttr = "input[placeholder='Username']";
            System.out.println("CSS: " + cssTagAttr);
            WebElement inputTagAttr = driver.findElement(By.cssSelector(cssTagAttr));
            inputTagAttr.sendKeys("attribute_user");
            System.out.println("✅ Typed using tag[attribute] selector");
            Thread.sleep(1000);
            inputTagAttr.clear();
            System.out.println();

            System.out.println("=====================================");
            System.out.println("CSS SELECTORS SUMMARY");
            System.out.println("=====================================\n");

            System.out.println("Selector Type          | Syntax                  | Example");
            System.out.println("---------------------|------------------------|---------------------------");
            System.out.println("ID                   | #id                    | #user-name");
            System.out.println("Class                | .class                 | .form_input");
            System.out.println("Tag                  | tag                    | input");
            System.out.println("Attribute            | [attr='value']         | [type='text']");
            System.out.println("Tag + ID             | tag#id                 | input#user-name");
            System.out.println("Tag + Class          | tag.class              | input.form_input");
            System.out.println("Multiple Classes     | .class1.class2         | .input_error.form_input");
            System.out.println("Tag + Attribute      | tag[attr='value']      | input[name='username']");
            System.out.println();

            System.out.println("=====================================");
            System.out.println("WHEN TO USE WHICH SELECTOR");
            System.out.println("=====================================\n");

            System.out.println("✅ Use ID (#id) when:");
            System.out.println("   - Element has unique ID");
            System.out.println("   - ID is stable (won't change)");
            System.out.println();

            System.out.println("✅ Use Class (.class) when:");
            System.out.println("   - Multiple elements share same class");
            System.out.println("   - Want to find first element with that class");
            System.out.println();

            System.out.println("✅ Use Attribute ([attr='value']) when:");
            System.out.println("   - Element has unique attribute value");
            System.out.println("   - Especially good with data-* attributes");
            System.out.println();

            System.out.println("✅ Use Combination (tag.class[attr]) when:");
            System.out.println("   - Need more specificity");
            System.out.println("   - Multiple elements match simpler selectors");
            System.out.println();

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("✅ Browser closed");
        }
    }
}
```

**Expected Output:**
```
===== CSS SELECTORS BASICS =====

=====================================
CSS SELECTOR METHOD 1: ID SELECTOR
=====================================

Syntax: #idValue
Example: #user-name

CSS: #user-name
✅ Typed using CSS ID selector

=====================================
CSS SELECTOR METHOD 2: CLASS SELECTOR
=====================================

Syntax: .className
Example: .form_input

CSS: .form_input
✅ Typed using CSS class selector
   Note: This selects FIRST element with this class

=====================================
CSS SELECTOR METHOD 3: TAG SELECTOR
=====================================

Syntax: tagname
Example: input

CSS: input
✅ Found element: input
   Attribute 'type': text
   Note: Selects FIRST input on page

=====================================
CSS SELECTOR METHOD 4: ATTRIBUTE SELECTOR
=====================================

Syntax: [attribute='value']
Examples:
  [type='text']
  [placeholder='Username']
  [data-test='username']

CSS: [type='text']
✅ Typed using attribute selector [type='text']

CSS: [data-test='username']
✅ Typed using attribute selector [data-test='username']

=====================================
CSS SELECTOR METHOD 5: TAG + ID
=====================================

Syntax: tag#id
Example: input#user-name
More specific than just #id

CSS: input#user-name
✅ Typed using tag#id selector

=====================================
CSS SELECTOR METHOD 6: TAG + CLASS
=====================================

Syntax: tag.className
Example: input.form_input

CSS: input.form_input
✅ Typed using tag.class selector

=====================================
CSS SELECTOR METHOD 7: MULTIPLE CLASSES
=====================================

Syntax: .class1.class2.class3
Example: .input_error.form_input
Finds element that has ALL these classes

CSS: .input_error.form_input
✅ Typed using multiple class selector

=====================================
CSS SELECTOR METHOD 8: TAG + ATTRIBUTE
=====================================

Syntax: tag[attribute='value']
Example: input[placeholder='Username']

CSS: input[placeholder='Username']
✅ Typed using tag[attribute] selector

=====================================
CSS SELECTORS SUMMARY
=====================================

Selector Type          | Syntax                  | Example
---------------------|------------------------|---------------------------
ID                   | #id                    | #user-name
Class                | .class                 | .form_input
Tag                  | tag                    | input
Attribute            | [attr='value']         | [type='text']
Tag + ID             | tag#id                 | input#user-name
Tag + Class          | tag.class              | input.form_input
Multiple Classes     | .class1.class2         | .input_error.form_input
Tag + Attribute      | tag[attr='value']      | input[name='username']

=====================================
WHEN TO USE WHICH SELECTOR
=====================================

✅ Use ID (#id) when:
   - Element has unique ID
   - ID is stable (won't change)

✅ Use Class (.class) when:
   - Multiple elements share same class
   - Want to find first element with that class

✅ Use Attribute ([attr='value']) when:
   - Element has unique attribute value
   - Especially good with data-* attributes

✅ Use Combination (tag.class[attr]) when:
   - Need more specificity
   - Multiple elements match simpler selectors

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens to SauceDemo login page
2. Username field gets typed into 8 times with different CSS selectors
3. Each time text is typed and then cleared
4. No page navigation
5. Browser closes

**✅ Success Criteria:**
- All 8 CSS selector types work
- Text typed and cleared successfully each time
- No exceptions thrown
- Console output clearly explains each selector type

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| "InvalidSelectorException" | CSS syntax error | Check spacing: .class not . class |
| "NoSuchElementException" | CSS doesn't match any element | Verify selector in DevTools: $('css') |
| Multiple matches issue | Selector too generic | Make more specific: tag.class[attr] |
| Class with spaces | Space in class name | Use . for each class: .class1.class2 |

**💡 Key Concepts:**

**1. CSS Selector Syntax:**
```css
/* ID */
#user-name

/* Class */
.form_input

/* Tag */
input

/* Attribute */
[data-test='username']

/* Combinations */
input#user-name
input.form_input
input[type='text']
.class1.class2
tag.class[attr='value']
```

**2. CSS vs XPath for Basic Selection:**
```java
// XPath
"//input[@id='user-name']"

// CSS (shorter!)
"#user-name"

// XPath
"//input[@class='form_input']"

// CSS (shorter!)
".form_input"
```

**3. Testing CSS in Browser DevTools:**
```javascript
// In Browser Console
$('input#user-name')  // Returns first matching element
$$('input.form_input')  // Returns all matching elements
```

**4. CSS Specificity (most to least specific):**
```
tag#id.class[attr='value']  // Very specific
tag#id.class                // Specific
tag.class                   // Moderate
.class                      // Generic
tag                         // Very generic
```

**🎯 Practice Challenge:**

Find password field using 5 different CSS selectors:
1. By ID
2. By type attribute
3. By data-test attribute
4. By tag + class
5. By tag + ID

---

[Due to length limits, I'll continue with more exercises for Days 23-45 in the next section. This demonstrates the exact format and detail level you requested. Should I continue with the remaining exercises?]
