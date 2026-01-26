# Day 14: Week 2 Review & Integration Project

## 📋 Learning Objectives
By the end of this lesson, you will be able to:
- Review all Week 2 concepts comprehensively
- Integrate multiple advanced Selenium techniques
- Build a complete automation project using Week 2 skills
- Debug complex interaction scenarios
- Apply best practices learned throughout the week

---

## 📚 Table of Contents
1. [Week 2 Recap](#1-week-2-recap)
2. [Concept Integration](#2-concept-integration)
3. [Mini Project: E-Commerce Automation](#3-mini-project-e-commerce-automation)
4. [Advanced Scenarios](#4-advanced-scenarios)
5. [Troubleshooting Guide](#5-troubleshooting-guide)
6. [Practice Challenges](#6-practice-challenges)
7. [Key Takeaways](#7-key-takeaways)

---

## 1. Week 2 Recap

### Topics Covered This Week

#### Day 8: Actions Class - Mouse Operations
- Mouse hover
- Click, double-click, right-click
- Basic mouse movements
- **Key Method:** [`Actions.moveToElement()`](org.openqa.selenium.interactions.Actions.moveToElement())

#### Day 9: Drag & Drop, Sliders
- Drag and drop operations
- Slider manipulation
- Complex mouse interactions
- **Key Method:** [`Actions.dragAndDrop()`](org.openqa.selenium.interactions.Actions.dragAndDrop())

#### Day 10: Web Tables
- Table navigation
- Cell data extraction
- Dynamic table handling
- **Key Method:** [`findElements()`](org.openqa.selenium.WebDriver.findElements())

#### Day 11: Keyboard Operations
- Keys class usage
- Keyboard shortcuts
- Form navigation with Tab
- **Key Class:** [`Keys`](org.openqa.selenium.Keys)

#### Day 12: Mouse Operations Advanced
- Context menus
- Hover chains
- Click and hold
- **Key Method:** [`Actions.contextClick()`](org.openqa.selenium.interactions.Actions.contextClick())

#### Day 13: JavaScript Executor
- JavaScript execution
- Scrolling operations
- Hidden element interaction
- **Key Interface:** [`JavascriptExecutor`](org.openqa.selenium.JavascriptExecutor)

---

## 2. Concept Integration

### Combining Multiple Techniques

#### Example 1: Hover + JavaScript + Keyboard
```java
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class IntegratedExample1 {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://example.com/complex-ui");
            driver.manage().window().maximize();
            
            // Step 1: Scroll to element using JavaScript
            WebElement menu = driver.findElement(By.id("mainMenu"));
            js.executeScript("arguments[0].scrollIntoView(true);", menu);
            Thread.sleep(500);
            
            // Step 2: Hover using Actions
            actions.moveToElement(menu).perform();
            Thread.sleep(500);
            
            // Step 3: Navigate submenu with keyboard
            WebElement submenu = driver.findElement(By.id("submenu"));
            submenu.sendKeys(Keys.ARROW_DOWN);
            submenu.sendKeys(Keys.ARROW_DOWN);
            submenu.sendKeys(Keys.ENTER);
            
            System.out.println("✓ Integrated interaction completed");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Table + Actions + JavaScript
```java
import java.util.List;

public class IntegratedExample2 {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://example.com/data-table");
            driver.manage().window().maximize();
            
            // Find table
            WebElement table = driver.findElement(By.id("dataTable"));
            
            // Scroll to table
            js.executeScript("arguments[0].scrollIntoView(true);", table);
            Thread.sleep(500);
            
            // Get all rows
            List<WebElement> rows = table.findElements(By.tagName("tr"));
            
            // Right-click on specific row
            WebElement targetRow = rows.get(3);
            actions.contextClick(targetRow).perform();
            Thread.sleep(500);
            
            // Select context menu option
            WebElement editOption = driver.findElement(By.xpath("//li[text()='Edit']"));
            editOption.click();
            
            System.out.println("✓ Table row edited via context menu");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 3. Mini Project: E-Commerce Automation

### Complete Shopping Flow Automation

```java
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class ECommerceAutomation {
    
    private WebDriver driver;
    private Actions actions;
    private JavascriptExecutor js;
    private WebDriverWait wait;
    
    public ECommerceAutomation() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        actions = new Actions(driver);
        js = (JavascriptExecutor) driver;
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    public void runTest() {
        try {
            // Step 1: Navigate to website
            navigateToWebsite();
            
            // Step 2: Search for product
            searchProduct("laptop");
            
            // Step 3: Filter results
            applyFilters();
            
            // Step 4: Select product from table
            selectProductFromTable();
            
            // Step 5: Add to cart
            addToCart();
            
            // Step 6: Proceed to checkout
            proceedToCheckout();
            
            // Step 7: Fill checkout form
            fillCheckoutForm();
            
            System.out.println("\n✓ E-Commerce automation completed successfully!");
            
        } catch (Exception e) {
            System.err.println("Test failed: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
    
    private void navigateToWebsite() {
        System.out.println("\n=== Step 1: Navigate to Website ===");
        driver.get("https://example.com/shop");
        System.out.println("✓ Website loaded");
    }
    
    private void searchProduct(String productName) throws InterruptedException {
        System.out.println("\n=== Step 2: Search for Product ===");
        
        // Find search box
        WebElement searchBox = driver.findElement(By.id("searchBox"));
        
        // Type product name
        searchBox.sendKeys(productName);
        System.out.println("✓ Typed: " + productName);
        
        // Submit with Enter key
        searchBox.sendKeys(Keys.ENTER);
        Thread.sleep(2000);
        System.out.println("✓ Search submitted");
    }
    
    private void applyFilters() throws InterruptedException {
        System.out.println("\n=== Step 3: Apply Filters ===");
        
        // Hover over filter menu
        WebElement filterMenu = driver.findElement(By.id("filterMenu"));
        actions.moveToElement(filterMenu).perform();
        Thread.sleep(500);
        System.out.println("✓ Filter menu opened");
        
        // Select price range using slider
        WebElement priceSlider = driver.findElement(By.id("priceSlider"));
        actions.clickAndHold(priceSlider)
               .moveByOffset(100, 0)
               .release()
               .perform();
        Thread.sleep(500);
        System.out.println("✓ Price range adjusted");
        
        // Select brand using checkbox
        WebElement brandCheckbox = driver.findElement(By.id("brandDell"));
        js.executeScript("arguments[0].click();", brandCheckbox);
        Thread.sleep(1000);
        System.out.println("✓ Brand filter applied");
    }
    
    private void selectProductFromTable() throws InterruptedException {
        System.out.println("\n=== Step 4: Select Product from Table ===");
        
        // Find product table
        WebElement table = driver.findElement(By.id("productTable"));
        
        // Scroll to table
        js.executeScript("arguments[0].scrollIntoView(true);", table);
        Thread.sleep(500);
        
        // Get all product rows
        List<WebElement> rows = table.findElements(By.tagName("tr"));
        System.out.println("✓ Found " + (rows.size() - 1) + " products");
        
        // Select product with highest rating
        WebElement bestProduct = null;
        double highestRating = 0;
        
        for (int i = 1; i < rows.size(); i++) {  // Skip header row
            List<WebElement> cells = rows.get(i).findElements(By.tagName("td"));
            String ratingText = cells.get(3).getText();  // Rating column
            double rating = Double.parseDouble(ratingText);
            
            if (rating > highestRating) {
                highestRating = rating;
                bestProduct = rows.get(i);
            }
        }
        
        // Click on best product
        if (bestProduct != null) {
            bestProduct.click();
            System.out.println("✓ Selected product with rating: " + highestRating);
            Thread.sleep(2000);
        }
    }
    
    private void addToCart() throws InterruptedException {
        System.out.println("\n=== Step 5: Add to Cart ===");
        
        // Scroll to Add to Cart button
        WebElement addToCartBtn = driver.findElement(By.id("addToCart"));
        js.executeScript("arguments[0].scrollIntoView(true);", addToCartBtn);
        Thread.sleep(500);
        
        // Highlight button (for visibility)
        js.executeScript("arguments[0].style.border='3px solid green';", addToCartBtn);
        Thread.sleep(500);
        
        // Click Add to Cart
        addToCartBtn.click();
        System.out.println("✓ Product added to cart");
        Thread.sleep(2000);
        
        // Wait for confirmation message
        WebElement confirmation = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("cartConfirmation"))
        );
        System.out.println("✓ Confirmation: " + confirmation.getText());
    }
    
    private void proceedToCheckout() throws InterruptedException {
        System.out.println("\n=== Step 6: Proceed to Checkout ===");
        
        // Hover over cart icon
        WebElement cartIcon = driver.findElement(By.id("cartIcon"));
        actions.moveToElement(cartIcon).perform();
        Thread.sleep(1000);
        System.out.println("✓ Cart dropdown opened");
        
        // Click checkout button
        WebElement checkoutBtn = driver.findElement(By.id("checkoutBtn"));
        checkoutBtn.click();
        Thread.sleep(2000);
        System.out.println("✓ Navigated to checkout");
    }
    
    private void fillCheckoutForm() throws InterruptedException {
        System.out.println("\n=== Step 7: Fill Checkout Form ===");
        
        // Fill form using Tab navigation
        WebElement firstField = driver.findElement(By.id("firstName"));
        firstField.click();
        
        // First Name
        firstField.sendKeys("John");
        firstField.sendKeys(Keys.TAB);
        System.out.println("✓ First name entered");
        
        // Last Name
        driver.switchTo().activeElement().sendKeys("Doe");
        driver.switchTo().activeElement().sendKeys(Keys.TAB);
        System.out.println("✓ Last name entered");
        
        // Email
        driver.switchTo().activeElement().sendKeys("john.doe@example.com");
        driver.switchTo().activeElement().sendKeys(Keys.TAB);
        System.out.println("✓ Email entered");
        
        // Phone
        driver.switchTo().activeElement().sendKeys("1234567890");
        driver.switchTo().activeElement().sendKeys(Keys.TAB);
        System.out.println("✓ Phone entered");
        
        // Address
        driver.switchTo().activeElement().sendKeys("123 Main Street");
        driver.switchTo().activeElement().sendKeys(Keys.TAB);
        System.out.println("✓ Address entered");
        
        // City
        driver.switchTo().activeElement().sendKeys("New York");
        driver.switchTo().activeElement().sendKeys(Keys.TAB);
        System.out.println("✓ City entered");
        
        // Zip Code
        driver.switchTo().activeElement().sendKeys("10001");
        System.out.println("✓ Zip code entered");
        
        Thread.sleep(1000);
        
        // Accept terms using JavaScript (checkbox might be hidden)
        WebElement termsCheckbox = driver.findElement(By.id("terms"));
        js.executeScript("arguments[0].checked=true;", termsCheckbox);
        System.out.println("✓ Terms accepted");
        
        Thread.sleep(1000);
        
        // Submit order
        WebElement submitBtn = driver.findElement(By.id("submitOrder"));
        js.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
        Thread.sleep(500);
        submitBtn.click();
        
        System.out.println("✓ Order submitted");
        Thread.sleep(3000);
        
        // Verify order confirmation
        try {
            WebElement confirmationMsg = driver.findElement(By.id("orderConfirmation"));
            System.out.println("✓ Order Confirmation: " + confirmationMsg.getText());
        } catch (Exception e) {
            System.out.println("Note: Confirmation message not found (demo mode)");
        }
    }
    
    public static void main(String[] args) {
        ECommerceAutomation automation = new ECommerceAutomation();
        automation.runTest();
    }
}
```

---

## 4. Advanced Scenarios

### Scenario 1: Dynamic Content Handling
```java
public class DynamicContentScenario {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        try {
            driver.get("https://example.com/dynamic-content");
            driver.manage().window().maximize();
            
            // Wait for dynamic content to load
            wait.until(ExpectedConditions.presenceOfElementLocated(By.id("content")));
            
            // Scroll to load more content
            for (int i = 0; i < 3; i++) {
                js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
                Thread.sleep(2000);  // Wait for new content
                System.out.println("✓ Loaded batch " + (i + 1));
            }
            
            // Interact with dynamically loaded element
            WebElement dynamicElement = wait.until(
                ExpectedConditions.elementToBeClickable(By.className("dynamic-item"))
            );
            
            actions.moveToElement(dynamicElement).click().perform();
            System.out.println("✓ Dynamic element clicked");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Scenario 2: Complex Form with Validation
```java
public class ComplexFormScenario {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://example.com/complex-form");
            driver.manage().window().maximize();
            
            // Fill form with validation
            fillFieldWithValidation(driver, js, "email", "invalid-email");
            Thread.sleep(1000);
            
            // Check for error message
            try {
                WebElement errorMsg = driver.findElement(By.className("error"));
                System.out.println("✓ Validation error shown: " + errorMsg.getText());
                
                // Correct the input
                WebElement emailField = driver.findElement(By.id("email"));
                emailField.clear();
                emailField.sendKeys("valid@example.com");
                System.out.println("✓ Corrected email");
                
            } catch (Exception e) {
                System.out.println("No validation error found");
            }
            
            // Submit form
            WebElement submitBtn = driver.findElement(By.id("submit"));
            js.executeScript("arguments[0].click();", submitBtn);
            
            Thread.sleep(2000);
            System.out.println("✓ Form submitted");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
    
    private static void fillFieldWithValidation(WebDriver driver, 
                                                JavascriptExecutor js,
                                                String fieldId, 
                                                String value) {
        WebElement field = driver.findElement(By.id(fieldId));
        js.executeScript("arguments[0].value='" + value + "';", field);
        
        // Trigger validation
        field.sendKeys(Keys.TAB);
    }
}
```

### Scenario 3: Multi-Window Interaction
```java
import java.util.Set;

public class MultiWindowScenario {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        
        try {
            driver.get("https://example.com");
            driver.manage().window().maximize();
            
            String mainWindow = driver.getWindowHandle();
            
            // Open link in new window using Ctrl+Click
            WebElement link = driver.findElement(By.linkText("Open in New Window"));
            actions.keyDown(Keys.CONTROL)
                   .click(link)
                   .keyUp(Keys.CONTROL)
                   .perform();
            
            Thread.sleep(2000);
            
            // Switch to new window
            Set<String> windows = driver.getWindowHandles();
            for (String window : windows) {
                if (!window.equals(mainWindow)) {
                    driver.switchTo().window(window);
                    System.out.println("✓ Switched to new window");
                    break;
                }
            }
            
            // Interact in new window
            js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            Thread.sleep(1000);
            
            WebElement newWindowElement = driver.findElement(By.id("content"));
            System.out.println("✓ New window content: " + newWindowElement.getText());
            
            // Close new window
            driver.close();
            
            // Switch back to main window
            driver.switchTo().window(mainWindow);
            System.out.println("✓ Returned to main window");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 5. Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: Element Not Clickable
```java
// Problem: Element is obscured or not in viewport

// Solution 1: Scroll to element
js.executeScript("arguments[0].scrollIntoView(true);", element);
Thread.sleep(500);
element.click();

// Solution 2: Use JavaScript click
js.executeScript("arguments[0].click();", element);

// Solution 3: Wait for element to be clickable
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions.elementToBeClickable(By.id("btn")));
element.click();
```

#### Issue 2: Stale Element Reference
```java
// Problem: Element reference becomes stale after DOM update

// Solution: Re-find element
try {
    element.click();
} catch (StaleElementReferenceException e) {
    element = driver.findElement(By.id("elementId"));
    element.click();
}
```

#### Issue 3: Actions Not Performing
```java
// Problem: Forgot to call perform()

// Wrong:
actions.moveToElement(element);  // Nothing happens

// Correct:
actions.moveToElement(element).perform();  // Action executed
```

#### Issue 4: JavaScript Execution Fails
```java
// Problem: Incorrect JavaScript syntax or missing arguments

// Wrong:
js.executeScript("element.click();", element);  // 'element' undefined

// Correct:
js.executeScript("arguments[0].click();", element);
```

---

## 6. Practice Challenges

### Challenge 1: Automated Testing Dashboard
**Task:** Create a script that:
1. Navigates to a dashboard
2. Hovers over different chart elements
3. Extracts data from tables
4. Exports data using context menu
5. Verifies export success

### Challenge 2: Form Wizard Automation
**Task:** Automate a multi-step form:
1. Fill Step 1 using Tab navigation
2. Validate fields before proceeding
3. Use JavaScript to handle hidden fields in Step 2
4. Drag and drop files in Step 3
5. Review and submit

### Challenge 3: Interactive Map Testing
**Task:** Test an interactive map:
1. Zoom in/out using mouse wheel simulation
2. Click at specific coordinates
3. Drag map to different position
4. Right-click to open location menu
5. Extract location data

### Challenge 4: Infinite Scroll with Filtering
**Task:** Handle infinite scroll page:
1. Scroll to load all items
2. Apply filters using sliders
3. Sort results using dropdown
4. Select items using Shift+Click
5. Perform bulk action

### Challenge 5: Complex Menu Navigation
**Task:** Navigate nested menus:
1. Hover through 4-level menu
2. Use keyboard arrows for navigation
3. Handle dynamic menu loading
4. Select final item
5. Verify navigation

---

## 7. Key Takeaways

### Week 2 Mastery Checklist

#### Actions Class
- [ ] Can perform mouse hover
- [ ] Can execute drag and drop
- [ ] Can handle sliders
- [ ] Can perform right-click
- [ ] Can chain multiple actions

#### Keyboard Operations
- [ ] Can use Keys class effectively
- [ ] Can perform keyboard shortcuts
- [ ] Can navigate forms with Tab
- [ ] Can combine keyboard and mouse

#### Web Tables
- [ ] Can extract table data
- [ ] Can navigate dynamic tables
- [ ] Can interact with table cells
- [ ] Can handle sorting and filtering

#### JavaScript Executor
- [ ] Can execute JavaScript code
- [ ] Can scroll to elements
- [ ] Can interact with hidden elements
- [ ] Can manipulate DOM
- [ ] Can extract page information

### Best Practices Learned
✅ Always wait for elements before interaction  
✅ Use JavaScript as fallback, not primary method  
✅ Handle exceptions gracefully  
✅ Create reusable utility methods  
✅ Add appropriate waits between actions  
✅ Verify actions completed successfully  
✅ Clean up resources (driver.quit())

### Next Steps
- Practice all concepts with real websites
- Build your own automation projects
- Explore TestNG framework (Week 3)
- Learn Page Object Model pattern
- Study framework design principles

---

## ⚠️ Common Mistakes to Avoid - Week 2 Recap

### 1. Forgetting to Call perform() on Actions
**Problem**: Building action chains without executing them.

**Why It's Wrong**: Actions class methods don't execute until `perform()` is called.

**Correct Approach**: Always end action chains with `.perform()`.

```java
// ❌ WRONG
actions.moveToElement(element).click(); // Nothing happens!

// ✅ CORRECT
actions.moveToElement(element).click().perform();
```

### 2. Not Handling HTML5 Drag and Drop
**Problem**: Using `dragAndDrop()` on HTML5 elements.

**Why It's Wrong**: Standard Selenium drag-and-drop doesn't work with HTML5 drag events.

**Correct Approach**: Use JavaScript or Actions with pauses for HTML5 drag-and-drop.

```java
// ❌ WRONG
actions.dragAndDrop(source, target).perform(); // Fails on HTML5

// ✅ CORRECT
actions.clickAndHold(source)
       .pause(Duration.ofMillis(200))
       .moveToElement(target)
       .pause(Duration.ofMillis(200))
       .release()
       .perform();
```

### 3. Using Hardcoded Table Indexes
**Problem**: Finding table cells with fixed row/column numbers.

**Why It's Wrong**: Breaks when data changes or is sorted.

**Correct Approach**: Find cells by content, not position.

```java
// ❌ WRONG
String value = driver.findElement(By.xpath("//tr[5]/td[3]")).getText();

// ✅ CORRECT
String value = driver.findElement(
    By.xpath("//tr[td[text()='Product A']]/td[3]")
).getText();
```

### 4. Overusing JavascriptExecutor
**Problem**: Using JavaScript for everything instead of standard Selenium.

**Why It's Wrong**: JavaScript bypasses browser checks and doesn't simulate real user behavior.

**Correct Approach**: Use JavaScript only when Selenium methods fail.

```java
// ❌ WRONG (if element is clickable normally)
js.executeScript("arguments[0].click()", element);

// ✅ CORRECT
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
element.click();

// ✅ JAVASCRIPT: Only for hidden/overlapped elements
if (!element.isDisplayed()) {
    js.executeScript("arguments[0].click()", element);
}
```

### 5. Not Waiting Between Actions
**Problem**: Chaining actions without pauses for animations.

**Why It's Wrong**: UIs need time for hover effects, animations, and AJAX calls.

**Correct Approach**: Add appropriate waits between complex actions.

```java
// ❌ WRONG
actions.moveToElement(menu).moveToElement(submenu).click().perform();

// ✅ CORRECT
actions.moveToElement(menu)
       .pause(Duration.ofMillis(500))
       .moveToElement(submenu)
       .pause(Duration.ofMillis(300))
       .click()
       .perform();
```

### 6. Ignoring StaleElementReferenceException in Dynamic Tables
**Problem**: Reusing WebElement references after table updates.

**Why It's Wrong**: DOM changes invalidate element references.

**Correct Approach**: Re-find elements after table modifications.

```java
// ❌ WRONG
WebElement row = driver.findElement(By.xpath("//tr[1]"));
// ... table refreshes via AJAX ...
row.click(); // StaleElementReferenceException!

// ✅ CORRECT
// Find element fresh each time after updates
driver.findElement(By.xpath("//tr[1]")).click();

// ✅ BETTER: Retry logic
public void clickWithRetry(By locator, int attempts) {
    for (int i = 0; i < attempts; i++) {
        try {
            driver.findElement(locator).click();
            return;
        } catch (StaleElementReferenceException e) {
            if (i == attempts - 1) throw e;
        }
    }
}
```

---

## 📝 Week 2 Assessment

Test your knowledge:
1. When should you use JavascriptExecutor vs standard Selenium?
2. How do you handle a 3-level nested menu?
3. What's the difference between `click()` and `js.executeScript("arguments[0].click()")`?
4. How do you extract data from a dynamic table?
5. What's the proper way to chain multiple Actions?

---

## Interview Questions

### Basic Level

1. **What is the Actions class in Selenium and when is it used?**
   - Actions class is used for performing complex user interactions like mouse hover, drag-and-drop, right-click, double-click, and keyboard operations. It's needed when standard WebDriver methods are insufficient for simulating real user behavior with advanced gestures.

2. **How do you perform a mouse hover operation using Actions class?**
   - Create Actions object: `Actions actions = new Actions(driver);` then use `actions.moveToElement(element).perform();` Remember to call `perform()` to execute the action chain.

3. **What is the purpose of calling `perform()` method in Actions class?**
   - The `perform()` method executes all the actions that have been built in the action chain. Without calling `perform()`, the actions are only stored but not executed. It's mandatory to call `perform()` at the end of any Actions chain.

4. **How do you handle web tables in Selenium? Explain the basic approach.**
   - Use `findElements()` to get all rows: `List<WebElement> rows = driver.findElements(By.xpath("//table//tr"));` then iterate through rows and cells using nested loops. Access specific cells using XPath: `//tr[2]/td[3]` for row 2, column 3.

### Intermediate Level

5. **Explain the difference between `dragAndDrop()` and `clickAndHold()` methods in Actions class.**
   - `dragAndDrop(source, target)` is a single method that combines multiple actions to move an element from source to target in one call. `clickAndHold()` only presses and holds the mouse button, allowing more granular control: `clickAndHold(source).moveToElement(target).release().perform()` is useful for HTML5 drag-and-drop with custom timing.

6. **How do you execute JavaScript code in Selenium and why would you need it?**
   - Cast WebDriver to JavascriptExecutor: `JavascriptExecutor js = (JavascriptExecutor) driver;` then use `js.executeScript("JavaScript code", element);` Needed when: standard Selenium fails, interacting with hidden elements, scrolling operations, or accessing DOM properties directly.

7. **What is the difference between implicitWait and explicit waits? Which one should you prefer?**
   - Implicit wait applies globally to all elements for a specified duration: `driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));` Explicit wait (WebDriverWait) waits for specific conditions on specific elements. Prefer explicit waits as they're more specific, avoid unnecessary waiting, and provide better control over waiting conditions.

8. **How do you handle a dynamic web table where rows change frequently?**
   - Use dynamic XPath with contains() or find elements by content: `//tr[td[contains(text(),'searchValue')]]` instead of fixed row indices. Always re-find elements after table updates to avoid StaleElementReferenceException. Use explicit waits to ensure table is loaded before interaction.

### Advanced Level

9. **Explain how to automate a multi-level nested menu (3+ levels) using Actions class. What are the common challenges?**
   - Use action chaining with pauses: `actions.moveToElement(level1).pause(Duration.ofMillis(500)).moveToElement(level2).pause(Duration.ofMillis(300)).moveToElement(level3).click().perform();` Challenges include: timing issues (menus closing too fast), elements not in view, JavaScript-based menus requiring different handling, and dynamic menu loading requiring waits.

10. **When should you use JavascriptExecutor instead of standard Selenium WebDriver methods, and what are the trade-offs?**
    - Use JavascriptExecutor when: elements are hidden (display:none), standard click fails due to overlay, need to scroll to specific coordinates, accessing DOM properties directly, or bypassing element interactability checks. Trade-offs: doesn't simulate real user behavior, bypasses browser security, may not trigger all event handlers, and tests become less reliable as they don't validate actual user experience.

11. **How do you handle infinite scroll pages in automation? Explain your approach with JavaScript Executor.**
    - Track initial scroll height: `Long lastHeight = (Long) js.executeScript("return document.body.scrollHeight");` Scroll to bottom: `js.executeScript("window.scrollTo(0, document.body.scrollHeight);")` Wait for content load, get new height, compare with previous height, repeat until no change. Add explicit waits between scrolls and handle timeout scenarios for error handling.

12. **Explain the complete approach to extract and validate data from a dynamic table with sorting and filtering capabilities.**
    - First, apply filters/sorting and wait for table refresh. Store expected data in a data structure. Use dynamic locators to find all rows: `List<WebElement> rows = driver.findElements(By.xpath("//table//tr"));` Extract each cell's data iterating through rows and columns. Validate extracted data against expected data. Handle StaleElementReferenceException by re-finding elements after table updates. Use explicit waits to confirm table is stable before extraction, and consider pagination if table is paginated.

---

## 🎉 Congratulations!

You've completed Week 2 of Selenium Automation! You now have advanced skills in:
- Complex mouse and keyboard interactions
- Table data handling
- JavaScript execution
- Advanced element manipulation

**Ready for Week 3?** Next week covers TestNG framework, browser options, and screenshots!

---

**Previous:** [Day 13: JavaScript Executor](day13_javascript_executor.md)  
**Next:** [Week 3: Day 15 - Week 2 Review & Transition](../week3/day15_week2_review_transition.md)
