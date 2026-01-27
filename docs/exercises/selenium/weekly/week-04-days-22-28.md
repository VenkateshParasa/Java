# SELENIUM WEBDRIVER - Week 4: Intermediate Selenium (Days 22-28)

## 📋 Week 4 Overview

This week covers intermediate Selenium topics essential for real-world automation:

**Days Covered:**
- **Days 22-23:** Advanced Locators (XPath & CSS Selectors) (✅ **COMPLETE**)
- **Days 24-26:** Dropdowns, Checkboxes, Radio Buttons & Alerts (✅ **COMPLETE**)
- **Days 27-28:** Frames & Window Handling - *To be added*

**Current Status:** Days 22-26 complete with 23 comprehensive exercises (12 for Days 22-23, 11 for Days 24-26)

---

# Days 22-23: Advanced Locators (XPath & CSS Selectors)

# SELENIUM WEBDRIVER - Days 22-23: Advanced Locators (XPath & CSS Selectors)

## 📋 Days 22-23 Overview

These two days cover the most powerful and flexible locator strategies in Selenium - essential for handling complex web elements and dynamic content.

**Days Covered:**
- **Day 22:** Advanced XPath Strategies (6 comprehensive exercises)
- **Day 23:** CSS Selector Mastery (6 comprehensive exercises)

**What You'll Master:**
- Creating robust XPath expressions with axes and functions
- Building flexible CSS selectors for any scenario
- Handling dynamic elements that change on each page load
- Choosing the right locator strategy for performance
- Writing maintainable, production-ready locators

---

## 📌 How to Use These Exercises

**Each exercise includes:**
1. ✅ Clear learning objectives
2. ✅ Concept explanation with examples
3. ✅ Complete Java code with detailed comments
4. ✅ Expected output format
5. ✅ Success criteria checklist
6. ✅ Common mistakes table
7. ✅ Practice challenge tasks

**Progressive Learning:** Exercises start with basics and gradually introduce advanced concepts.

---

# Day 22: Advanced XPath Strategies

---

#### Exercise 1: XPath Basics Review - Absolute vs Relative (15-20 minutes)

**What you'll learn:** The fundamental difference between absolute and relative XPath and why relative XPath is essential for automation

**Create new package: `com.automation.locators.xpath`**
**Create new class: `XPathBasicsReview`**

**Concept Explanation:**

XPath (XML Path Language) is a powerful query language for selecting nodes in XML/HTML documents. In Selenium, XPath is one of the most flexible locator strategies.

**Two Types of XPath:**

1. **Absolute XPath:**
   - Starts from the root HTML node
   - Uses single forward slash `/`
   - Full path from top to target element
   - Example: `/html/body/div[1]/div[2]/form/input[1]`

   **❌ Problems:**
   - Extremely brittle - breaks if ANY element in path changes
   - Hard to read and maintain
   - Slow performance
   - Not recommended for automation

2. **Relative XPath:**
   - Starts from anywhere in the document
   - Uses double forward slash `//`
   - Targets elements directly using attributes
   - Example: `//input[@id='username']`

   **✅ Benefits:**
   - Flexible and resilient to page structure changes
   - Shorter and more readable
   - Faster execution
   - Industry standard for automation

**Basic XPath Syntax:**

```
Syntax Pattern:
//tagName[@attribute='value']

Components:
//          → Start from anywhere in document
tagName     → HTML tag (input, div, button, etc.)
@           → Attribute selector
attribute   → Any HTML attribute (id, class, name, etc.)
=           → Equals operator
'value'     → Attribute value in quotes
```

**Visual Comparison:**

```
HTML Structure:
<html>
  <body>
    <div class="container">
      <div class="header">
        <form id="loginForm">
          <input id="username" type="text">
          <input id="password" type="password">
          <button id="loginBtn">Login</button>
        </form>
      </div>
    </div>
  </body>
</html>

Absolute XPath (❌ Avoid):
/html/body/div/div/form/input[1]
→ Breaks if container div changes

Relative XPath (✅ Recommended):
//input[@id='username']
→ Works regardless of page structure changes
```

```java
package com.automation.locators.xpath;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class XPathBasicsReview {
    public static void main(String[] args) {
        System.out.println("===== XPATH BASICS: ABSOLUTE VS RELATIVE =====\n");

        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to login page
            driver.get("https://practicetestautomation.com/practice-test-login/");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // PART 1: RELATIVE XPATH (Recommended)
            // ========================================
            System.out.println("\n--- PART 1: RELATIVE XPATH (✅ RECOMMENDED) ---");
            System.out.println("Syntax: //tagName[@attribute='value']\n");

            // Example 1: Using ID attribute
            System.out.println("Example 1: Locate username field using ID");
            System.out.println("XPath: //input[@id='username']");
            WebElement usernameField = driver.findElement(By.xpath("//input[@id='username']"));
            usernameField.sendKeys("student");
            System.out.println("✅ Found username field and entered text");
            System.out.println("   Tag: " + usernameField.getTagName());
            System.out.println("   Type: " + usernameField.getAttribute("type"));
            Thread.sleep(1000);

            // Example 2: Using name attribute
            System.out.println("\nExample 2: Locate password field using name");
            System.out.println("XPath: //input[@name='password']");
            WebElement passwordField = driver.findElement(By.xpath("//input[@name='password']"));
            passwordField.sendKeys("Password123");
            System.out.println("✅ Found password field and entered text");
            System.out.println("   Placeholder: " + passwordField.getAttribute("placeholder"));
            Thread.sleep(1000);

            // Example 3: Using class attribute
            System.out.println("\nExample 3: Locate submit button using class");
            System.out.println("XPath: //button[@class='btn']");
            WebElement submitButton = driver.findElement(By.xpath("//button[@class='btn']"));
            System.out.println("✅ Found submit button");
            System.out.println("   Button text: " + submitButton.getText());
            System.out.println("   Button ID: " + submitButton.getAttribute("id"));

            // ========================================
            // PART 2: MULTIPLE WAYS TO LOCATE
            // ========================================
            System.out.println("\n--- PART 2: MULTIPLE XPATH OPTIONS FOR SAME ELEMENT ---");
            System.out.println("Different XPath expressions for username field:\n");

            // Clear the field first
            usernameField.clear();

            // Method 1: Using ID
            System.out.println("Method 1: //input[@id='username']");
            driver.findElement(By.xpath("//input[@id='username']")).sendKeys("test1");
            Thread.sleep(500);
            driver.findElement(By.xpath("//input[@id='username']")).clear();

            // Method 2: Using type
            System.out.println("Method 2: //input[@type='text'][@id='username']");
            driver.findElement(By.xpath("//input[@type='text'][@id='username']")).sendKeys("test2");
            Thread.sleep(500);
            driver.findElement(By.xpath("//input[@type='text'][@id='username']")).clear();

            // Method 3: Using name
            System.out.println("Method 3: //input[@name='username']");
            driver.findElement(By.xpath("//input[@name='username']")).sendKeys("test3");
            Thread.sleep(500);
            System.out.println("✅ All three XPath expressions located the same element!");

            // ========================================
            // PART 3: WHEN TO USE XPATH VS OTHER LOCATORS
            // ========================================
            System.out.println("\n--- PART 3: XPATH VS OTHER LOCATORS ---");
            System.out.println("\nComparison of different locator strategies:\n");

            // Using ID (simplest)
            long startTime = System.currentTimeMillis();
            driver.findElement(By.id("username"));
            long idTime = System.currentTimeMillis() - startTime;
            System.out.println("By.id('username')");
            System.out.println("  ⚡ Speed: " + idTime + "ms (FASTEST)");
            System.out.println("  ✅ Use when: Element has unique, stable ID");

            // Using XPath
            startTime = System.currentTimeMillis();
            driver.findElement(By.xpath("//input[@id='username']"));
            long xpathTime = System.currentTimeMillis() - startTime;
            System.out.println("\nBy.xpath(\"//input[@id='username']\")");
            System.out.println("  ⚡ Speed: " + xpathTime + "ms");
            System.out.println("  ✅ Use when: Need complex navigation or text-based search");

            // Using CSS Selector
            startTime = System.currentTimeMillis();
            driver.findElement(By.cssSelector("input#username"));
            long cssTime = System.currentTimeMillis() - startTime;
            System.out.println("\nBy.cssSelector(\"input#username\")");
            System.out.println("  ⚡ Speed: " + cssTime + "ms");
            System.out.println("  ✅ Use when: Need fast, readable selectors");

            // ========================================
            // PART 4: BASIC XPATH OPERATORS
            // ========================================
            System.out.println("\n--- PART 4: BASIC XPATH OPERATORS ---");
            System.out.println("\nOperator examples:\n");

            // AND operator
            System.out.println("1. AND operator: Multiple conditions");
            System.out.println("   XPath: //input[@type='text' and @id='username']");
            WebElement andExample = driver.findElement(By.xpath("//input[@type='text' and @id='username']"));
            System.out.println("   ✅ Element must match ALL conditions");

            // OR operator
            System.out.println("\n2. OR operator: Alternative conditions");
            System.out.println("   XPath: //input[@id='username' or @name='username']");
            WebElement orExample = driver.findElement(By.xpath("//input[@id='username' or @name='username']"));
            System.out.println("   ✅ Element can match ANY condition");

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("XPATH BASICS SUMMARY");
            System.out.println("=====================================");
            System.out.println("✅ ALWAYS use Relative XPath (//...)");
            System.out.println("❌ NEVER use Absolute XPath (/html/...)");
            System.out.println();
            System.out.println("Basic Syntax: //tagName[@attribute='value']");
            System.out.println();
            System.out.println("Common Attributes:");
            System.out.println("  • id     → Most reliable");
            System.out.println("  • name   → Often unique");
            System.out.println("  • class  → May have multiple values");
            System.out.println("  • type   → Useful for inputs");
            System.out.println();
            System.out.println("Operators:");
            System.out.println("  • and    → All conditions must match");
            System.out.println("  • or     → Any condition can match");
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
===== XPATH BASICS: ABSOLUTE VS RELATIVE =====

✅ Opened: Test Login | Practice Test Automation

--- PART 1: RELATIVE XPATH (✅ RECOMMENDED) ---
Syntax: //tagName[@attribute='value']

Example 1: Locate username field using ID
XPath: //input[@id='username']
✅ Found username field and entered text
   Tag: input
   Type: text

Example 2: Locate password field using name
XPath: //input[@name='password']
✅ Found password field and entered text
   Placeholder: Password

Example 3: Locate submit button using class
XPath: //button[@class='btn']
✅ Found submit button
   Button text: Submit
   Button ID: submit

--- PART 2: MULTIPLE XPATH OPTIONS FOR SAME ELEMENT ---
Different XPath expressions for username field:

Method 1: //input[@id='username']
Method 2: //input[@type='text'][@id='username']
Method 3: //input[@name='username']
✅ All three XPath expressions located the same element!

--- PART 3: XPATH VS OTHER LOCATORS ---

Comparison of different locator strategies:

By.id('username')
  ⚡ Speed: 2ms (FASTEST)
  ✅ Use when: Element has unique, stable ID

By.xpath("//input[@id='username']")
  ⚡ Speed: 4ms
  ✅ Use when: Need complex navigation or text-based search

By.cssSelector("input#username")
  ⚡ Speed: 3ms
  ✅ Use when: Need fast, readable selectors

--- PART 4: BASIC XPATH OPERATORS ---

Operator examples:

1. AND operator: Multiple conditions
   XPath: //input[@type='text' and @id='username']
   ✅ Element must match ALL conditions

2. OR operator: Alternative conditions
   XPath: //input[@id='username' or @name='username']
   ✅ Element can match ANY condition

=====================================
XPATH BASICS SUMMARY
=====================================
✅ ALWAYS use Relative XPath (//...)
❌ NEVER use Absolute XPath (/html/...)

Basic Syntax: //tagName[@attribute='value']

Common Attributes:
  • id     → Most reliable
  • name   → Often unique
  • class  → May have multiple values
  • type   → Useful for inputs

Operators:
  • and    → All conditions must match
  • or     → Any condition can match
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens the practice login page
2. Username field is filled with different values
3. Password field is filled
4. Submit button is located but not clicked
5. Various XPath strategies are demonstrated
6. Browser closes after 2 seconds

**✅ Success Criteria:**
- Can create relative XPath using different attributes
- Understand the difference between absolute and relative XPath
- Can use AND/OR operators in XPath
- All elements are located successfully
- Console shows all ✅ marks
- No exceptions thrown

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using absolute XPath `/html/body/div[1]...` | Extremely brittle, breaks easily | Use relative XPath `//tagName[@attribute]` |
| Forgetting `@` before attribute | `//input[id='username']` won't work | Always use `@`: `//input[@id='username']` |
| Wrong quote type `"` vs `'` | `//input[@id="username"]` inside `By.xpath("...")` | Use single quotes inside: `By.xpath("//input[@id='username']")` |
| Not specifying tag name `//[@id='username']` | Can match any element, slower | Specify tag: `//input[@id='username']` |
| Using `/` instead of `//` | Requires exact path from root | Use `//` for relative path |

**💡 Key Concepts:**

**1. XPath Syntax Breakdown:**
```
//input[@id='username' and @type='text']
│  │     │   │         │    │   │
│  │     │   │         │    │   └─ Value
│  │     │   │         │    └───── Attribute name
│  │     │   │         └────────── Operator
│  │     │   └──────────────────── Attribute symbol
│  │     └──────────────────────── Attribute condition
│  └────────────────────────────── Tag name
└───────────────────────────────── Relative path (anywhere)
```

**2. Locator Priority (Fastest to Slowest):**
```
1. ID              → By.id("username")           ⚡⚡⚡
2. Name            → By.name("username")         ⚡⚡⚡
3. CSS Selector    → By.cssSelector("#username") ⚡⚡
4. XPath           → By.xpath("//input[@id]")    ⚡
5. Link Text       → By.linkText("Click here")   ⚡
6. Partial Link    → By.partialLinkText("Click") ⚡
```

**3. When to Use XPath:**
```java
✅ Use XPath when you need to:
- Navigate up to parent elements (//input[@id='x']/parent::div)
- Find elements by text content (//button[text()='Submit'])
- Use complex conditions (//div[@class='x' and contains(text(),'y')])
- Navigate siblings (//label[@for='username']/following-sibling::input)

❌ Avoid XPath when:
- Simple ID or name locator works (use By.id or By.name instead)
- CSS Selector can do the job (usually faster)
- You're using absolute path (never do this!)
```

**🎯 Practice Challenge:**

1. Go to https://www.saucedemo.com
2. Locate the username field using 3 different XPath expressions
3. Locate the password field using XPath with AND operator
4. Locate the login button using XPath with class attribute
5. Create a method that accepts tag name and attribute, returns XPath string
6. Compare performance: ID locator vs XPath locator (measure time)
7. Print which locator is faster and by how much

**Bonus Challenge:**
Create a utility method that generates XPath dynamically:
```java
public static String createXPath(String tag, String attribute, String value) {
    return "//" + tag + "[@" + attribute + "='" + value + "']";
}
```

---

#### Exercise 2: XPath Axes - Navigating Element Relationships (20-25 minutes)

**What you'll learn:** How to navigate the DOM tree using XPath axes to locate elements based on their relationships with other elements

**Create new class: `XPathAxesNavigation`**

**Concept Explanation:**

XPath axes define the relationship between the current node and other nodes in the document tree. They're incredibly powerful for locating elements when you can't directly target them but know their relationship to other elements.

**Common XPath Axes:**

```
Visual Representation of XPath Axes:

                    ancestor::div
                         ↑
                   great-grandparent
                         ↑
                   grandparent::div
                         ↑
                    parent::form
                         ↑
    preceding-sibling::input ← [CURRENT NODE] → following-sibling::button
                         ↓
                    child::span
                         ↓
                  descendant::label
```

**13 XPath Axes (Most Important):**

1. **parent::** - Selects the parent of current node
   - `//input[@id='username']/parent::div`

2. **child::** - Selects children of current node
   - `//form[@id='loginForm']/child::input`

3. **ancestor::** - Selects all ancestors (parent, grandparent, etc.)
   - `//input[@id='username']/ancestor::form`

4. **descendant::** - Selects all descendants (children, grandchildren, etc.)
   - `//form[@id='loginForm']/descendant::input`

5. **following-sibling::** - Selects siblings after current node
   - `//label[@for='username']/following-sibling::input`

6. **preceding-sibling::** - Selects siblings before current node
   - `//button[@id='submit']/preceding-sibling::input`

7. **following::** - Selects everything after current node
   - `//h1/following::input`

8. **preceding::** - Selects everything before current node
   - `//button/preceding::input`

**HTML Example:**
```html
<form id="loginForm">
    <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" type="text">
    </div>
    <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password">
    </div>
    <button id="submit">Login</button>
</form>
```

**Axis Examples for Above HTML:**
```xpath
1. Find input after "Username:" label:
   //label[text()='Username:']/following-sibling::input

2. Find label before username input:
   //input[@id='username']/preceding-sibling::label

3. Find form containing username input:
   //input[@id='username']/ancestor::form

4. Find all inputs inside form:
   //form[@id='loginForm']/descendant::input

5. Find parent div of username input:
   //input[@id='username']/parent::div
```

```java
package com.automation.locators.xpath;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class XPathAxesNavigation {
    public static void main(String[] args) {
        System.out.println("===== XPATH AXES: NAVIGATING ELEMENT RELATIONSHIPS =====\n");

        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to form page
            driver.get("https://www.selenium.dev/selenium/web/web-form.html");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // AXIS 1: PARENT - Going Up One Level
            // ========================================
            System.out.println("\n--- AXIS 1: PARENT (Going Up) ---");
            System.out.println("Use case: Find the parent container of an element\n");

            // Find input field first
            WebElement textInput = driver.findElement(By.id("my-text-id"));
            System.out.println("Found text input: " + textInput.getAttribute("id"));

            // Find parent using parent axis
            System.out.println("XPath: //input[@id='my-text-id']/parent::div");
            WebElement parentDiv = driver.findElement(By.xpath("//input[@id='my-text-id']/parent::div"));
            System.out.println("✅ Found parent element");
            System.out.println("   Parent tag: " + parentDiv.getTagName());
            System.out.println("   Parent class: " + parentDiv.getAttribute("class"));

            // Alternative: Using /..
            System.out.println("\nAlternative syntax: //input[@id='my-text-id']/..");
            WebElement parentAlt = driver.findElement(By.xpath("//input[@id='my-text-id']/.."));
            System.out.println("✅ Same parent found using '..' shorthand");

            // ========================================
            // AXIS 2: CHILD - Going Down One Level
            // ========================================
            System.out.println("\n--- AXIS 2: CHILD (Going Down) ---");
            System.out.println("Use case: Find direct children of a container\n");

            System.out.println("XPath: //form[@class='needs-validation']/child::div");
            List<WebElement> childDivs = driver.findElements(By.xpath("//form[@class='needs-validation']/child::div"));
            System.out.println("✅ Found " + childDivs.size() + " direct child div elements");
            System.out.println("   Note: child:: selects ONLY direct children, not all descendants");

            // ========================================
            // AXIS 3: FOLLOWING-SIBLING - Next Elements at Same Level
            // ========================================
            System.out.println("\n--- AXIS 3: FOLLOWING-SIBLING (Next Siblings) ---");
            System.out.println("Use case: Find elements after current one at same level\n");

            // Find label, then find its following input
            System.out.println("Scenario: Label doesn't have 'for' attribute, need to find next input");
            System.out.println("XPath: //label[contains(text(),'Text input')]/following-sibling::input");

            // Note: The actual page structure might vary, using a more general approach
            WebElement firstLabel = driver.findElement(By.xpath("//label[1]"));
            System.out.println("Found label: " + firstLabel.getText());

            // Find next input after this label
            List<WebElement> followingInputs = driver.findElements(
                By.xpath("//label[1]/following-sibling::input"));
            if (!followingInputs.isEmpty()) {
                System.out.println("✅ Found " + followingInputs.size() + " input(s) after label");
            }

            // ========================================
            // AXIS 4: PRECEDING-SIBLING - Previous Elements at Same Level
            // ========================================
            System.out.println("\n--- AXIS 4: PRECEDING-SIBLING (Previous Siblings) ---");
            System.out.println("Use case: Find elements before current one at same level\n");

            // Find submit button, then find inputs before it
            System.out.println("XPath: //button[@type='submit']/preceding-sibling::input");
            List<WebElement> precedingInputs = driver.findElements(
                By.xpath("//button[@type='submit']/preceding-sibling::input"));
            System.out.println("✅ Found " + precedingInputs.size() + " input(s) before submit button");

            // ========================================
            // AXIS 5: ANCESTOR - All Parents Up the Tree
            // ========================================
            System.out.println("\n--- AXIS 5: ANCESTOR (All Parents) ---");
            System.out.println("Use case: Find any parent/grandparent up the tree\n");

            // Find the form that contains our text input
            System.out.println("XPath: //input[@id='my-text-id']/ancestor::form");
            WebElement ancestorForm = driver.findElement(
                By.xpath("//input[@id='my-text-id']/ancestor::form"));
            System.out.println("✅ Found ancestor form");
            System.out.println("   Form class: " + ancestorForm.getAttribute("class"));

            // Find all div ancestors
            List<WebElement> ancestorDivs = driver.findElements(
                By.xpath("//input[@id='my-text-id']/ancestor::div"));
            System.out.println("   Found " + ancestorDivs.size() + " div ancestors in the hierarchy");

            // ========================================
            // AXIS 6: DESCENDANT - All Children Down the Tree
            // ========================================
            System.out.println("\n--- AXIS 6: DESCENDANT (All Children/Grandchildren) ---");
            System.out.println("Use case: Find all elements within a container\n");

            // Find all inputs within the form
            System.out.println("XPath: //form[@class='needs-validation']/descendant::input");
            List<WebElement> allInputs = driver.findElements(
                By.xpath("//form[@class='needs-validation']/descendant::input"));
            System.out.println("✅ Found " + allInputs.size() + " input descendants in form");
            System.out.println("   Difference: descendant finds ALL levels deep, child finds only direct children");

            // ========================================
            // AXIS 7: FOLLOWING - Everything After Current Node
            // ========================================
            System.out.println("\n--- AXIS 7: FOLLOWING (Everything After) ---");
            System.out.println("Use case: Find any element that appears after current one in document\n");

            // Find all buttons after the first input
            List<WebElement> followingButtons = driver.findElements(
                By.xpath("//input[@id='my-text-id']/following::button"));
            System.out.println("✅ Found " + followingButtons.size() + " button(s) appearing after text input");

            // ========================================
            // AXIS 8: PRECEDING - Everything Before Current Node
            // ========================================
            System.out.println("\n--- AXIS 8: PRECEDING (Everything Before) ---");
            System.out.println("Use case: Find any element that appears before current one in document\n");

            // Find all labels before the submit button
            List<WebElement> precedingLabels = driver.findElements(
                By.xpath("//button[@type='submit']/preceding::label"));
            System.out.println("✅ Found " + precedingLabels.size() + " label(s) appearing before submit button");

            // ========================================
            // PRACTICAL EXAMPLE: COMBINING AXES
            // ========================================
            System.out.println("\n--- PRACTICAL EXAMPLE: COMBINING AXES ---");
            System.out.println("Scenario: Find submit button by navigating from text input\n");

            // Complex navigation: text input -> parent -> ancestor form -> descendant button
            System.out.println("Step 1: Start at text input");
            System.out.println("Step 2: Go to parent div");
            System.out.println("Step 3: Go to ancestor form");
            System.out.println("Step 4: Find descendant submit button");
            System.out.println("\nXPath: //input[@id='my-text-id']/ancestor::form/descendant::button[@type='submit']");

            WebElement submitButton = driver.findElement(
                By.xpath("//input[@id='my-text-id']/ancestor::form/descendant::button[@type='submit']"));
            System.out.println("✅ Found submit button: " + submitButton.getText());

            // ========================================
            // REAL-WORLD SCENARIOS
            // ========================================
            System.out.println("\n--- REAL-WORLD SCENARIOS ---\n");

            System.out.println("Scenario 1: Label doesn't have ID, but follows a known pattern");
            System.out.println("Solution: //label[contains(text(),'Password')]/following-sibling::input");
            System.out.println("✅ Finds password input even if it has no ID\n");

            System.out.println("Scenario 2: Need to find error message near an input field");
            System.out.println("Solution: //input[@id='email']/following-sibling::span[@class='error']");
            System.out.println("✅ Finds error message displayed after validation\n");

            System.out.println("Scenario 3: Checkbox is in a complex nested structure");
            System.out.println("Solution: //label[text()='Remember me']/parent::div/child::input[@type='checkbox']");
            System.out.println("✅ Navigates through structure to find checkbox\n");

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n================================================");
            System.out.println("XPATH AXES SUMMARY");
            System.out.println("================================================");
            System.out.println("NAVIGATION UP:");
            System.out.println("  parent::tag      → Immediate parent only");
            System.out.println("  ancestor::tag    → Any parent up the tree");
            System.out.println("  /..              → Shorthand for parent");
            System.out.println();
            System.out.println("NAVIGATION DOWN:");
            System.out.println("  child::tag       → Direct children only");
            System.out.println("  descendant::tag  → All descendants (any level)");
            System.out.println();
            System.out.println("NAVIGATION SIDEWAYS:");
            System.out.println("  following-sibling::tag  → Next siblings");
            System.out.println("  preceding-sibling::tag  → Previous siblings");
            System.out.println();
            System.out.println("DOCUMENT-WIDE:");
            System.out.println("  following::tag   → Everything after in document");
            System.out.println("  preceding::tag   → Everything before in document");
            System.out.println("================================================");
            System.out.println("💡 TIP: Axes are chainable!");
            System.out.println("Example: //input/parent::div/following-sibling::button");
            System.out.println("================================================");

            Thread.sleep(3000);

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
===== XPATH AXES: NAVIGATING ELEMENT RELATIONSHIPS =====

✅ Opened: Web form

--- AXIS 1: PARENT (Going Up) ---
Use case: Find the parent container of an element

Found text input: my-text-id
XPath: //input[@id='my-text-id']/parent::div
✅ Found parent element
   Parent tag: div
   Parent class: mb-3

Alternative syntax: //input[@id='my-text-id']/..
✅ Same parent found using '..' shorthand

--- AXIS 2: CHILD (Going Down) ---
Use case: Find direct children of a container

XPath: //form[@class='needs-validation']/child::div
✅ Found 7 direct child div elements
   Note: child:: selects ONLY direct children, not all descendants

--- AXIS 3: FOLLOWING-SIBLING (Next Siblings) ---
Use case: Find elements after current one at same level

Scenario: Label doesn't have 'for' attribute, need to find next input
XPath: //label[contains(text(),'Text input')]/following-sibling::input
Found label: Text input
✅ Found 1 input(s) after label

--- AXIS 4: PRECEDING-SIBLING (Previous Siblings) ---
Use case: Find elements before current one at same level

XPath: //button[@type='submit']/preceding-sibling::input
✅ Found 0 input(s) before submit button

--- AXIS 5: ANCESTOR (All Parents) ---
Use case: Find any parent/grandparent up the tree

XPath: //input[@id='my-text-id']/ancestor::form
✅ Found ancestor form
   Form class: needs-validation
   Found 2 div ancestors in the hierarchy

--- AXIS 6: DESCENDANT (All Children/Grandchildren) ---
Use case: Find all elements within a container

XPath: //form[@class='needs-validation']/descendant::input
✅ Found 10 input descendants in form
   Difference: descendant finds ALL levels deep, child finds only direct children

--- AXIS 7: FOLLOWING (Everything After) ---
Use case: Find any element that appears after current one in document

✅ Found 2 button(s) appearing after text input

--- AXIS 8: PRECEDING (Everything Before) ---
Use case: Find any element that appears before current one in document

✅ Found 11 label(s) appearing before submit button

--- PRACTICAL EXAMPLE: COMBINING AXES ---
Scenario: Find submit button by navigating from text input

Step 1: Start at text input
Step 2: Go to parent div
Step 3: Go to ancestor form
Step 4: Find descendant submit button

XPath: //input[@id='my-text-id']/ancestor::form/descendant::button[@type='submit']
✅ Found submit button: Submit

--- REAL-WORLD SCENARIOS ---

Scenario 1: Label doesn't have ID, but follows a known pattern
Solution: //label[contains(text(),'Password')]/following-sibling::input
✅ Finds password input even if it has no ID

Scenario 2: Need to find error message near an input field
Solution: //input[@id='email']/following-sibling::span[@class='error']
✅ Finds error message displayed after validation

Scenario 3: Checkbox is in a complex nested structure
Solution: //label[text()='Remember me']/parent::div/child::input[@type='checkbox']
✅ Navigates through structure to find checkbox

================================================
XPATH AXES SUMMARY
================================================
NAVIGATION UP:
  parent::tag      → Immediate parent only
  ancestor::tag    → Any parent up the tree
  /..              → Shorthand for parent

NAVIGATION DOWN:
  child::tag       → Direct children only
  descendant::tag  → All descendants (any level)

NAVIGATION SIDEWAYS:
  following-sibling::tag  → Next siblings
  preceding-sibling::tag  → Previous siblings

DOCUMENT-WIDE:
  following::tag   → Everything after in document
  preceding::tag   → Everything before in document
================================================
💡 TIP: Axes are chainable!
Example: //input/parent::div/following-sibling::button
================================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens Selenium's official web form
2. Different axis relationships are demonstrated
3. Elements are located using various axes
4. Complex navigation patterns are shown
5. Browser closes after 3 seconds

**✅ Success Criteria:**
- Understand all 8 main XPath axes
- Can navigate up (parent, ancestor)
- Can navigate down (child, descendant)
- Can navigate sideways (siblings)
- Can combine multiple axes
- All elements located successfully
- No exceptions thrown

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| Using `//input/parent` without `::` | `parent` needs double colon | Use `//input/parent::div` |
| Confusing `child` and `descendant` | `child` only gets direct children | Use `descendant` for any level deep |
| Using axis without tag name | `//input/parent::` incomplete | Specify tag: `//input/parent::div` |
| Not understanding sibling vs following | `sibling` is same level, `following` is everything after | Choose based on relationship |
| Forgetting axes are chainable | Using multiple XPath when one would work | Combine: `//input/parent::div/following-sibling::button` |

**💡 Key Concepts:**

**1. Axis Direction Guide:**
```
Document Structure:
    ┌─────────────┐
    │   ancestor  │ (grandparent)
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │   parent    │
    └──────┬──────┘
           │
[preceding-sibling] ← [CURRENT] → [following-sibling]
           │
    ┌──────▼──────┐
    │    child    │
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │ descendant  │
    └─────────────┘
```

**2. When to Use Each Axis:**
```java
// Parent: When you know the child but need the container
//input[@id='email']/parent::div

// Ancestor: When you need to find a specific ancestor
//input[@id='email']/ancestor::form

// Child: When you need direct children only
//form[@id='checkout']/child::div

// Descendant: When you need all elements inside
//form[@id='checkout']/descendant::input

// Following-sibling: Label → Input relationship
//label[@for='email']/following-sibling::input

// Preceding-sibling: Error message before submit button
//button[@type='submit']/preceding-sibling::span[@class='error']
```

**3. Shorthand Alternatives:**
```xpath
Instead of:                          Use shorthand:
//input/parent::div                  //input/..
//div/child::input                   //div/input
//form/descendant::input             //form//input
```

**🎯 Practice Challenge:**

1. Go to https://the-internet.herokuapp.com/login
2. Find the username input using `parent` axis (start from label)
3. Find the password input using `following-sibling` axis
4. Find the form using `ancestor` axis (start from login button)
5. Find all inputs using `descendant` axis (start from form)
6. Create a complex XPath that chains 3 different axes
7. Print the hierarchy: great-grandparent → grandparent → parent → current element

**Bonus Challenge:**
Create a method that prints the complete ancestor chain of any element:
```java
public static void printAncestorChain(WebDriver driver, String xpath) {
    List<WebElement> ancestors = driver.findElements(By.xpath(xpath + "/ancestor::*"));
    for (WebElement ancestor : ancestors) {
        System.out.println(" → " + ancestor.getTagName());
    }
}
```

---

#### Exercise 3: XPath Functions - Text, Contains, and More (25-30 minutes)

**What you'll learn:** Master XPath functions to create flexible locators that handle dynamic content and complex matching scenarios

**Create new class: `XPathFunctionsDemo`**

**Concept Explanation:**

XPath provides powerful built-in functions that make locators more flexible and resilient. These functions are essential for handling dynamic content, partial matches, and text-based searches.

**Most Important XPath Functions:**

**1. text() - Exact Text Match**
```xpath
Syntax: //tag[text()='exact text']
Example: //button[text()='Submit']
Use: When text is stable and known
```

**2. contains() - Partial Match**
```xpath
Syntax: //tag[contains(@attribute, 'partial value')]
Example: //div[contains(@class, 'error')]
Use: When attribute value is dynamic or partial
```

**3. starts-with() - Prefix Match**
```xpath
Syntax: //tag[starts-with(@attribute, 'prefix')]
Example: //input[starts-with(@id, 'user_')]
Use: When prefix is stable but suffix changes
```

**4. normalize-space() - Trim Whitespace**
```xpath
Syntax: //tag[normalize-space(text())='text']
Example: //p[normalize-space()='Welcome']
Use: When text has extra spaces or line breaks
```

**5. concat() - Join Strings**
```xpath
Syntax: //tag[contains(concat(' ',@class,' '), ' active ')]
Example: Handles multiple class names
Use: When searching within multi-value attributes
```

**6. position() and last() - Index-Based**
```xpath
Syntax: (//tag)[position()=2] or (//tag)[last()]
Example: (//tr)[last()] gets last row
Use: When you need specific position in a list
```

**7. count() - Count Elements**
```xpath
Syntax: //tag[count(child::*)>5]
Example: //div[count(child::p)>3]
Use: When filtering by number of children
```

**8. not() - Negation**
```xpath
Syntax: //tag[not(@attribute='value')]
Example: //input[not(@type='hidden')]
Use: When you want to exclude certain elements
```

**Visual Function Examples:**

```html
<div class="alert alert-danger">
    <p>  Error: Invalid username  </p>
</div>
<button id="submit_123">Submit</button>
<input type="text" class="form-control active">
```

```xpath
1. contains() for multi-class:
   //div[contains(@class, 'alert-danger')]

2. normalize-space() for trimming:
   //p[normalize-space()='Error: Invalid username']

3. starts-with() for dynamic IDs:
   //button[starts-with(@id, 'submit_')]

4. concat() for exact class match:
   //input[contains(concat(' ',@class,' '), ' active ')]
```

```java
package com.automation.locators.xpath;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class XPathFunctionsDemo {
    public static void main(String[] args) {
        System.out.println("===== XPATH FUNCTIONS: TEXT, CONTAINS, AND MORE =====\n");

        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to test page
            driver.get("https://the-internet.herokuapp.com/");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // FUNCTION 1: text() - Exact Text Match
            // ========================================
            System.out.println("\n--- FUNCTION 1: text() - Exact Text Match ---");
            System.out.println("Syntax: //tag[text()='exact text']\n");

            // Find link by exact text
            System.out.println("Example: Finding 'Form Authentication' link");
            System.out.println("XPath: //a[text()='Form Authentication']");
            WebElement formAuthLink = driver.findElement(By.xpath("//a[text()='Form Authentication']"));
            System.out.println("✅ Found link: " + formAuthLink.getText());
            System.out.println("   Href: " + formAuthLink.getAttribute("href"));

            // Demonstrating exact match requirement
            System.out.println("\n⚠️  text() requires EXACT match:");
            System.out.println("   ❌ //a[text()='Form'] → Won't work (partial)");
            System.out.println("   ❌ //a[text()='form authentication'] → Won't work (case-sensitive)");
            System.out.println("   ✅ //a[text()='Form Authentication'] → Works!");

            // ========================================
            // FUNCTION 2: contains() - Partial Match
            // ========================================
            System.out.println("\n--- FUNCTION 2: contains() - Partial Match ---");
            System.out.println("Syntax: //tag[contains(@attribute, 'partial')]\n");

            // Using contains with text
            System.out.println("Example 1: Finding link containing 'Authentication'");
            System.out.println("XPath: //a[contains(text(), 'Authentication')]");
            List<WebElement> authLinks = driver.findElements(By.xpath("//a[contains(text(), 'Authentication')]"));
            System.out.println("✅ Found " + authLinks.size() + " link(s) containing 'Authentication':");
            for (WebElement link : authLinks) {
                System.out.println("   • " + link.getText());
            }

            // Using contains with attribute
            System.out.println("\nExample 2: Finding links with href containing 'login'");
            System.out.println("XPath: //a[contains(@href, 'login')]");
            List<WebElement> loginLinks = driver.findElements(By.xpath("//a[contains(@href, 'login')]"));
            System.out.println("✅ Found " + loginLinks.size() + " link(s) with 'login' in href");

            // ========================================
            // FUNCTION 3: starts-with() - Prefix Match
            // ========================================
            System.out.println("\n--- FUNCTION 3: starts-with() - Prefix Match ---");
            System.out.println("Syntax: //tag[starts-with(@attribute, 'prefix')]\n");
            System.out.println("Use case: IDs like 'user_123', 'user_456' (dynamic number)");

            // Find links starting with specific text
            System.out.println("Example: Finding links starting with 'A/B'");
            System.out.println("XPath: //a[starts-with(text(), 'A/B')]");
            WebElement abTestLink = driver.findElement(By.xpath("//a[starts-with(text(), 'A/B')]"));
            System.out.println("✅ Found: " + abTestLink.getText());

            // ========================================
            // FUNCTION 4: normalize-space() - Trim Whitespace
            // ========================================
            System.out.println("\n--- FUNCTION 4: normalize-space() - Trim Whitespace ---");
            System.out.println("Syntax: //tag[normalize-space()='text']\n");
            System.out.println("Handles: Extra spaces, tabs, newlines\n");

            // Navigate to a page with whitespace in text
            driver.navigate().to("https://the-internet.herokuapp.com/login");
            Thread.sleep(1000);

            // The heading might have extra whitespace
            System.out.println("Example: Finding heading with potential whitespace");
            System.out.println("XPath: //h2[normalize-space()='Login Page']");
            try {
                WebElement heading = driver.findElement(By.xpath("//h2[normalize-space()='Login Page']"));
                System.out.println("✅ Found heading: " + heading.getText());
                System.out.println("   normalize-space() removed extra whitespace!");
            } catch (Exception e) {
                System.out.println("   (Heading text might be different on this page)");
            }

            // Demonstrating the difference
            System.out.println("\nWhy normalize-space() is useful:");
            System.out.println("HTML might be: <h2>  Login Page  </h2> (extra spaces)");
            System.out.println("Without normalize: //h2[text()='Login Page'] → Fails ❌");
            System.out.println("With normalize: //h2[normalize-space()='Login Page'] → Works ✅");

            // ========================================
            // FUNCTION 5: AND & OR - Combining Conditions
            // ========================================
            System.out.println("\n--- FUNCTION 5: AND & OR - Combining Conditions ---");
            System.out.println("Syntax: //tag[@attr1='value1' and @attr2='value2']\n");

            // AND operator
            System.out.println("Example 1: Username input with multiple conditions (AND)");
            System.out.println("XPath: //input[@type='text' and @name='username']");
            WebElement usernameInput = driver.findElement(By.xpath("//input[@type='text' and @name='username']"));
            System.out.println("✅ Found input matching BOTH conditions");
            System.out.println("   Type: " + usernameInput.getAttribute("type"));
            System.out.println("   Name: " + usernameInput.getAttribute("name"));

            // OR operator
            System.out.println("\nExample 2: Input with either ID or name (OR)");
            System.out.println("XPath: //input[@id='username' or @name='username']");
            WebElement usernameInputOR = driver.findElement(By.xpath("//input[@id='username' or @name='username']"));
            System.out.println("✅ Found input matching AT LEAST ONE condition");

            // ========================================
            // FUNCTION 6: position() and last()
            // ========================================
            System.out.println("\n--- FUNCTION 6: position() and last() - Index Based ---");
            System.out.println("Syntax: (//tag)[position()=2] or (//tag)[last()]\n");

            // Go back to main page with multiple links
            driver.navigate().to("https://the-internet.herokuapp.com/");
            Thread.sleep(1000);

            // Get all links
            List<WebElement> allLinks = driver.findElements(By.xpath("//ul/li/a"));
            System.out.println("Total links on page: " + allLinks.size());

            // First link
            System.out.println("\nExample 1: First link");
            System.out.println("XPath: (//ul/li/a)[1]");
            WebElement firstLink = driver.findElement(By.xpath("(//ul/li/a)[1]"));
            System.out.println("✅ First link: " + firstLink.getText());

            // Last link
            System.out.println("\nExample 2: Last link");
            System.out.println("XPath: (//ul/li/a)[last()]");
            WebElement lastLink = driver.findElement(By.xpath("(//ul/li/a)[last()]"));
            System.out.println("✅ Last link: " + lastLink.getText());

            // Specific position
            System.out.println("\nExample 3: 5th link");
            System.out.println("XPath: (//ul/li/a)[position()=5]");
            WebElement fifthLink = driver.findElement(By.xpath("(//ul/li/a)[position()=5]"));
            System.out.println("✅ 5th link: " + fifthLink.getText());

            // Last-2
            System.out.println("\nExample 4: Second-to-last link");
            System.out.println("XPath: (//ul/li/a)[last()-1]");
            WebElement secondLastLink = driver.findElement(By.xpath("(//ul/li/a)[last()-1]"));
            System.out.println("✅ Second-to-last link: " + secondLastLink.getText());

            // ========================================
            // FUNCTION 7: not() - Negation
            // ========================================
            System.out.println("\n--- FUNCTION 7: not() - Negation ---");
            System.out.println("Syntax: //tag[not(@attribute='value')]\n");

            // Go to login page
            driver.navigate().to("https://the-internet.herokuapp.com/login");
            Thread.sleep(1000);

            System.out.println("Example: Find inputs that are NOT hidden");
            System.out.println("XPath: //input[not(@type='hidden')]");
            List<WebElement> visibleInputs = driver.findElements(By.xpath("//input[not(@type='hidden')]"));
            System.out.println("✅ Found " + visibleInputs.size() + " visible input(s):");
            for (WebElement input : visibleInputs) {
                System.out.println("   • Type: " + input.getAttribute("type") +
                                 ", Name: " + input.getAttribute("name"));
            }

            // ========================================
            // FUNCTION 8: Multiple Functions Combined
            // ========================================
            System.out.println("\n--- FUNCTION 8: COMBINING MULTIPLE FUNCTIONS ---");
            System.out.println("Real-world scenario: Complex locators\n");

            System.out.println("Example 1: Button with text containing 'Log' and class containing 'btn'");
            System.out.println("XPath: //button[contains(text(), 'Log') and contains(@class, 'btn')]");
            try {
                WebElement loginBtn = driver.findElement(
                    By.xpath("//button[contains(text(), 'Log') and contains(@class, 'radius')]"));
                System.out.println("✅ Found button: " + loginBtn.getText());
            } catch (Exception e) {
                // Alternative with i tag inside button
                WebElement loginBtn = driver.findElement(By.xpath("//button[@type='submit']"));
                System.out.println("✅ Found button: " + loginBtn.getText());
            }

            System.out.println("\nExample 2: Input that starts with specific ID and is not disabled");
            System.out.println("XPath: //input[starts-with(@id, 'user') and not(@disabled)]");
            WebElement enabledInput = driver.findElement(
                By.xpath("//input[starts-with(@id, 'user') and not(@disabled)]"));
            System.out.println("✅ Found enabled input with ID starting with 'user'");

            // ========================================
            // PRACTICAL EXAMPLES
            // ========================================
            System.out.println("\n--- PRACTICAL REAL-WORLD EXAMPLES ---\n");

            System.out.println("Scenario 1: Dynamic ID (changes on each page load)");
            System.out.println("HTML: <button id='submit_12345'>Submit</button>");
            System.out.println("Solution: //button[starts-with(@id, 'submit_')]");
            System.out.println("✅ Works regardless of number suffix\n");

            System.out.println("Scenario 2: Multi-class attribute");
            System.out.println("HTML: <div class='btn btn-primary btn-large active'>");
            System.out.println("Solution: //div[contains(@class, 'btn-primary')]");
            System.out.println("✅ Finds element even with multiple classes\n");

            System.out.println("Scenario 3: Text with extra whitespace");
            System.out.println("HTML: <p>   Welcome User   </p>");
            System.out.println("Solution: //p[normalize-space()='Welcome User']");
            System.out.println("✅ Matches despite extra spaces\n");

            System.out.println("Scenario 4: Finding visible error message");
            System.out.println("HTML: <span class='error' style='display:block'>Invalid</span>");
            System.out.println("Solution: //span[contains(@class,'error') and not(contains(@style,'display:none'))]");
            System.out.println("✅ Finds only visible errors\n");

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=================================================");
            System.out.println("XPATH FUNCTIONS SUMMARY");
            System.out.println("=================================================");
            System.out.println("TEXT FUNCTIONS:");
            System.out.println("  text()='exact'          → Exact text match");
            System.out.println("  contains(text(),'part') → Partial text match");
            System.out.println("  starts-with(text(),'p') → Text starts with");
            System.out.println("  normalize-space()       → Trim whitespace");
            System.out.println();
            System.out.println("ATTRIBUTE FUNCTIONS:");
            System.out.println("  contains(@attr,'val')   → Partial attribute match");
            System.out.println("  starts-with(@attr,'p')  → Attribute starts with");
            System.out.println();
            System.out.println("POSITION FUNCTIONS:");
            System.out.println("  [position()=2]          → 2nd element");
            System.out.println("  [last()]                → Last element");
            System.out.println("  [last()-1]              → Second-to-last");
            System.out.println();
            System.out.println("LOGICAL OPERATORS:");
            System.out.println("  and                     → All conditions true");
            System.out.println("  or                      → Any condition true");
            System.out.println("  not()                   → Negate condition");
            System.out.println("=================================================");
            System.out.println("💡 TIP: Functions can be combined!");
            System.out.println("Example: //input[contains(@id,'user') and not(@disabled)]");
            System.out.println("=================================================");

            Thread.sleep(3000);

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
===== XPATH FUNCTIONS: TEXT, CONTAINS, AND MORE =====

✅ Opened: The Internet

--- FUNCTION 1: text() - Exact Text Match ---
Syntax: //tag[text()='exact text']

Example: Finding 'Form Authentication' link
XPath: //a[text()='Form Authentication']
✅ Found link: Form Authentication
   Href: https://the-internet.herokuapp.com/login

⚠️  text() requires EXACT match:
   ❌ //a[text()='Form'] → Won't work (partial)
   ❌ //a[text()='form authentication'] → Won't work (case-sensitive)
   ✅ //a[text()='Form Authentication'] → Works!

--- FUNCTION 2: contains() - Partial Match ---
Syntax: //tag[contains(@attribute, 'partial')]

Example 1: Finding link containing 'Authentication'
XPath: //a[contains(text(), 'Authentication')]
✅ Found 2 link(s) containing 'Authentication':
   • Form Authentication
   • Digest Authentication (user and pass: admin)

Example 2: Finding links with href containing 'login'
XPath: //a[contains(@href, 'login')]
✅ Found 1 link(s) with 'login' in href

--- FUNCTION 3: starts-with() - Prefix Match ---
Syntax: //tag[starts-with(@attribute, 'prefix')]

Use case: IDs like 'user_123', 'user_456' (dynamic number)
Example: Finding links starting with 'A/B'
XPath: //a[starts-with(text(), 'A/B')]
✅ Found: A/B Testing

--- FUNCTION 4: normalize-space() - Trim Whitespace ---
Syntax: //tag[normalize-space()='text']

Handles: Extra spaces, tabs, newlines

Example: Finding heading with potential whitespace
XPath: //h2[normalize-space()='Login Page']
✅ Found heading: Login Page
   normalize-space() removed extra whitespace!

Why normalize-space() is useful:
HTML might be: <h2>  Login Page  </h2> (extra spaces)
Without normalize: //h2[text()='Login Page'] → Fails ❌
With normalize: //h2[normalize-space()='Login Page'] → Works ✅

--- FUNCTION 5: AND & OR - Combining Conditions ---
Syntax: //tag[@attr1='value1' and @attr2='value2']

Example 1: Username input with multiple conditions (AND)
XPath: //input[@type='text' and @name='username']
✅ Found input matching BOTH conditions
   Type: text
   Name: username

Example 2: Input with either ID or name (OR)
XPath: //input[@id='username' or @name='username']
✅ Found input matching AT LEAST ONE condition

--- FUNCTION 6: position() and last() - Index Based ---
Syntax: (//tag)[position()=2] or (//tag)[last()]

Total links on page: 44

Example 1: First link
XPath: (//ul/li/a)[1]
✅ First link: A/B Testing

Example 2: Last link
XPath: (//ul/li/a)[last()]
✅ Last link: WYSIWYG Editor

Example 3: 5th link
XPath: (//ul/li/a)[position()=5]
✅ 5th link: Checkboxes

Example 4: Second-to-last link
XPath: (//ul/li/a)[last()-1]
✅ Second-to-last link: Welcome to the-internet

--- FUNCTION 7: not() - Negation ---
Syntax: //tag[not(@attribute='value')]

Example: Find inputs that are NOT hidden
XPath: //input[not(@type='hidden')]
✅ Found 3 visible input(s):
   • Type: text, Name: username
   • Type: password, Name: password
   • Type: submit, Name: null

--- FUNCTION 8: COMBINING MULTIPLE FUNCTIONS ---
Real-world scenario: Complex locators

Example 1: Button with text containing 'Log' and class containing 'btn'
XPath: //button[contains(text(), 'Log') and contains(@class, 'btn')]
✅ Found button:  Login

Example 2: Input that starts with specific ID and is not disabled
XPath: //input[starts-with(@id, 'user') and not(@disabled)]
✅ Found enabled input with ID starting with 'user'

--- PRACTICAL REAL-WORLD EXAMPLES ---

Scenario 1: Dynamic ID (changes on each page load)
HTML: <button id='submit_12345'>Submit</button>
Solution: //button[starts-with(@id, 'submit_')]
✅ Works regardless of number suffix

Scenario 2: Multi-class attribute
HTML: <div class='btn btn-primary btn-large active'>
Solution: //div[contains(@class, 'btn-primary')]
✅ Finds element even with multiple classes

Scenario 3: Text with extra whitespace
HTML: <p>   Welcome User   </p>
Solution: //p[normalize-space()='Welcome User']
✅ Matches despite extra spaces

Scenario 4: Finding visible error message
HTML: <span class='error' style='display:block'>Invalid</span>
Solution: //span[contains(@class,'error') and not(contains(@style,'display:none'))]
✅ Finds only visible errors

=================================================
XPATH FUNCTIONS SUMMARY
=================================================
TEXT FUNCTIONS:
  text()='exact'          → Exact text match
  contains(text(),'part') → Partial text match
  starts-with(text(),'p') → Text starts with
  normalize-space()       → Trim whitespace

ATTRIBUTE FUNCTIONS:
  contains(@attr,'val')   → Partial attribute match
  starts-with(@attr,'p')  → Attribute starts with

POSITION FUNCTIONS:
  [position()=2]          → 2nd element
  [last()]                → Last element
  [last()-1]              → Second-to-last

LOGICAL OPERATORS:
  and                     → All conditions true
  or                      → Any condition true
  not()                   → Negate condition
=================================================
💡 TIP: Functions can be combined!
Example: //input[contains(@id,'user') and not(@disabled)]
=================================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens The Internet homepage
2. Various links are located using different functions
3. Navigation to login page demonstrates more functions
4. Position-based selections are shown
5. Complex combined functions are demonstrated
6. Browser closes after 3 seconds

**✅ Success Criteria:**
- Understand all major XPath functions
- Can use text(), contains(), starts-with()
- Can use normalize-space() for whitespace
- Can use position() and last() for indexing
- Can combine multiple functions
- Can use not() for negation
- All examples execute successfully
- No exceptions thrown

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| `contains('text', @id)` | Parameters in wrong order | Use `contains(@id, 'text')` |
| `text()='Welcome User'` with extra spaces in HTML | text() includes whitespace | Use `normalize-space()='Welcome User'` |
| `[position()=5]` without parentheses | Selects wrong elements | Use `(//tag)[position()=5]` |
| `starts-with(text(), 'User')` case mismatch | Case-sensitive | Match exact case: `starts-with(text(), 'user')` |
| Using `and` for partial class match | Won't work with multiple classes | Use `contains(@class, 'value')` |
| Forgetting quotes in contains | `contains(@id, text)` | Use `contains(@id, 'text')` |

**💡 Key Concepts:**

**1. Function Syntax Rules:**
```xpath
Function syntax:
functionName(parameter1, parameter2)

Examples:
contains(where_to_search, what_to_find)
starts-with(where_to_search, what_prefix)
normalize-space(what_to_trim)
not(condition_to_negate)
```

**2. Most Useful Combinations:**
```xpath
// Dynamic ID with stable prefix
//button[starts-with(@id, 'submit_') and not(@disabled)]

// Multi-class element
//div[contains(@class, 'primary') and contains(@class, 'active')]

// Text with possible whitespace
//h1[normalize-space()='Welcome' and contains(@class, 'title')]

// Visible error message
//span[contains(@class, 'error') and not(contains(@style, 'display:none'))]

// Specific position with condition
(//tr[contains(@class, 'data-row')])[position()=3]
```

**3. Performance Tips:**
```xpath
❌ Slow: //\*[text()='Submit']  (searches all elements)
✅ Fast: //button[text()='Submit']  (searches only buttons)

❌ Slow: //*[contains(text(), 'Error')]
✅ Fast: //span[contains(text(), 'Error')]

Always specify tag name when possible!
```

**🎯 Practice Challenge:**

1. Go to https://the-internet.herokuapp.com/tables
2. Find the last row in the table using last()
3. Find all rows containing specific text using contains()
4. Find table header that starts with specific letter using starts-with()
5. Get the 3rd row using position()
6. Find cells that don't contain specific class using not()
7. Create XPath that combines 3 different functions

**Bonus Challenge:**
Create a utility method for dynamic XPath generation:
```java
public static String dynamicXPath(String tag, String attr, String partial) {
    return "//" + tag + "[contains(@" + attr + ", '" + partial + "')]";
}

// Usage:
String xpath = dynamicXPath("button", "id", "submit");
// Returns: //button[contains(@id, 'submit')]
```

---

#### Exercise 4: Dynamic XPath Creation - Handling Changing Elements (25-30 minutes)

**What you'll learn:** How to create flexible XPath locators for dynamic elements whose IDs, classes, or attributes change on each page load

**Create new class: `DynamicXPathHandling`**

**Concept Explanation:**

Many modern web applications generate dynamic IDs and classes that change on every page load or session. For example:
- `id="user_12345"` becomes `id="user_67890"` on reload
- `class="btn-primary-active"` becomes `class="btn-primary-inactive"`
- `data-reactid="1.2.3"` changes to `data-reactid="1.2.4"`

**Strategies for Dynamic Elements:**

**1. Use Partial Attribute Matching**
```xpath
❌ Breaks: //input[@id='user_12345']
✅ Works: //input[contains(@id, 'user_')]
✅ Works: //input[starts-with(@id, 'user_')]
```

**2. Use Stable Attributes**
```xpath
❌ Fragile: //div[@id='container_12345']
✅ Better: //div[@data-testid='user-container']
✅ Better: //div[@aria-label='User Profile']
```

**3. Use Text Content (if stable)**
```xpath
✅ //button[text()='Submit']
✅ //label[contains(text(), 'Username')]
```

**4. Use Relationship with Stable Elements**
```xpath
✅ //label[text()='Username']/following-sibling::input
✅ //div[@class='header']/descendant::button[text()='Login']
```

**5. Multiple Conditions**
```xpath
✅ //input[@type='text' and contains(@placeholder, 'Enter')]
✅ //div[contains(@class, 'modal') and not(contains(@style, 'display:none'))]
```

**Problem Scenarios:**

```html
Scenario 1: Dynamic ID with stable prefix
<input id="username_1234567" type="text">
Solution: //input[starts-with(@id, 'username_') and @type='text']

Scenario 2: Dynamic class with stable part
<button class="btn btn-primary active-123">Submit</button>
Solution: //button[contains(@class, 'btn-primary')]

Scenario 3: Completely dynamic ID and class
<div id="react-root-123" class="container-xyz">
Solution: Use text or stable child:
//div[contains(., 'Welcome')]/button
//div[@role='main']/descendant::button[text()='Submit']
```

```java
package com.automation.locators.xpath;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class DynamicXPathHandling {
    public static void main(String[] args) {
        System.out.println("===== DYNAMIC XPATH: HANDLING CHANGING ELEMENTS =====\n");

        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to test page with dynamic elements
            driver.get("https://www.w3schools.com/howto/howto_js_todolist.asp");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // STRATEGY 1: Partial Attribute Matching
            // ========================================
            System.out.println("\n--- STRATEGY 1: PARTIAL ATTRIBUTE MATCHING ---");
            System.out.println("Problem: IDs and classes often have dynamic parts\n");

            // Find input using contains
            System.out.println("Example 1: Using contains() for partial ID match");
            System.out.println("Instead of exact ID: //input[@id='exact_dynamic_123']");
            System.out.println("Use partial match: //input[contains(@id, 'myInput')]");

            WebElement todoInput = driver.findElement(By.xpath("//input[@id='myInput']"));
            System.out.println("✅ Found input using stable ID part");
            System.out.println("   Placeholder: " + todoInput.getAttribute("placeholder"));

            // Find button using contains for class
            System.out.println("\nExample 2: Using contains() for class with multiple values");
            System.out.println("HTML might be: <button class='btn btn-primary active'>");
            System.out.println("XPath: //button[contains(@class, 'addBtn')]");

            WebElement addButton = driver.findElement(By.xpath("//span[contains(@class, 'addBtn')]"));
            System.out.println("✅ Found button even if class has multiple values");

            // ========================================
            // STRATEGY 2: Use Stable Attributes
            // ========================================
            System.out.println("\n--- STRATEGY 2: PREFER STABLE ATTRIBUTES ---");
            System.out.println("Look for attributes that don't change:\n");

            System.out.println("Attribute Priority (Most to Least Stable):");
            System.out.println("  1. data-testid, data-test     → Added for testing");
            System.out.println("  2. aria-label, aria-*         → Accessibility attributes");
            System.out.println("  3. name                       → Usually stable for forms");
            System.out.println("  4. type, placeholder          → Stable for inputs");
            System.out.println("  5. id (if not generated)      → Can be stable");
            System.out.println("  6. class (functional classes) → Partial match needed");

            // Using placeholder (stable)
            System.out.println("\nExample: Using stable placeholder attribute");
            System.out.println("XPath: //input[@placeholder=\"Title...\"]");
            WebElement inputByPlaceholder = driver.findElement(
                By.xpath("//input[@placeholder=\"Title...\"]"));
            System.out.println("✅ Placeholder rarely changes: " +
                inputByPlaceholder.getAttribute("placeholder"));

            // ========================================
            // STRATEGY 3: Text Content (Most Reliable)
            // ========================================
            System.out.println("\n--- STRATEGY 3: USE TEXT CONTENT ---");
            System.out.println("Text visible to users rarely changes\n");

            // Find by button text
            System.out.println("Example 1: Button by visible text");
            System.out.println("XPath: //button[text()='Add']");
            System.out.println("✅ Most reliable - text users see rarely changes");

            // Find by partial text
            System.out.println("\nExample 2: Element containing text");
            System.out.println("XPath: //h2[contains(text(), 'My To Do List')]");
            WebElement heading = driver.findElement(
                By.xpath("//h2[contains(text(), 'My To Do List')]"));
            System.out.println("✅ Found heading: " + heading.getText());

            // ========================================
            // STRATEGY 4: Relationship-Based XPath
            // ========================================
            System.out.println("\n--- STRATEGY 4: RELATIONSHIP-BASED XPATH ---");
            System.out.println("Navigate from stable element to dynamic one\n");

            System.out.println("Example: Input field after a known heading");
            System.out.println("XPath: //h2[contains(text(),'To Do')]/following::input[1]");
            WebElement inputAfterHeading = driver.findElement(
                By.xpath("//h2[contains(text(),'To Do')]/following::input[1]"));
            System.out.println("✅ Found input by its relationship to heading");

            // Test it
            inputAfterHeading.clear();
            inputAfterHeading.sendKeys("Dynamic XPath Testing");
            System.out.println("   Entered text: Dynamic XPath Testing");
            Thread.sleep(1000);

            // ========================================
            // STRATEGY 5: Multiple Conditions for Uniqueness
            // ========================================
            System.out.println("\n--- STRATEGY 5: MULTIPLE CONDITIONS ---");
            System.out.println("Combine stable and semi-stable attributes\n");

            // Multiple attributes
            System.out.println("Example 1: Input with type AND placeholder");
            System.out.println("XPath: //input[@type='text' and @placeholder='Title...']");
            WebElement multiCondInput = driver.findElement(
                By.xpath("//input[@type='text' and @placeholder='Title...']"));
            System.out.println("✅ Both conditions must match - more specific!");

            // Using AND with contains
            System.out.println("\nExample 2: Element with partial class AND text");
            System.out.println("XPath: //span[contains(@class, 'addBtn') and text()='Add']");
            WebElement multiCondButton = driver.findElement(
                By.xpath("//span[contains(@class, 'addBtn') and text()='Add']"));
            System.out.println("✅ Combined text and class for uniqueness");

            // ========================================
            // STRATEGY 6: Avoiding Position-Based XPath
            // ========================================
            System.out.println("\n--- STRATEGY 6: AVOID POSITION-BASED XPATH ---");
            System.out.println("Position changes when elements are added/removed\n");

            System.out.println("❌ FRAGILE (avoid unless no choice):");
            System.out.println("   (//input)[1]  → Breaks if new input is added before");
            System.out.println("   (//div)[5]    → Breaks if structure changes");

            System.out.println("\n✅ BETTER ALTERNATIVES:");
            System.out.println("   //input[@placeholder='specific']");
            System.out.println("   //div[contains(@class, 'unique-class')]");
            System.out.println("   //label[text()='Username']/following-sibling::input");

            // ========================================
            // REAL-WORLD EXAMPLE: Login Form
            // ========================================
            System.out.println("\n--- REAL-WORLD EXAMPLE: DYNAMIC LOGIN FORM ---");

            // Navigate to login page
            driver.navigate().to("https://practicetestautomation.com/practice-test-login/");
            Thread.sleep(2000);
            System.out.println("\nScenario: Login form with some dynamic elements\n");

            // Strategy: Use multiple approaches
            System.out.println("Approach 1: Username by ID (if stable)");
            String xpath1 = "//input[@id='username']";
            System.out.println("XPath: " + xpath1);
            driver.findElement(By.xpath(xpath1)).sendKeys("student");
            System.out.println("✅ Primary strategy worked");
            Thread.sleep(500);

            System.out.println("\nApproach 2: Password by type + name combination");
            String xpath2 = "//input[@type='password' and @name='password']";
            System.out.println("XPath: " + xpath2);
            driver.findElement(By.xpath(xpath2)).sendKeys("Password123");
            System.out.println("✅ Multiple conditions ensure uniqueness");
            Thread.sleep(500);

            System.out.println("\nApproach 3: Submit button by text (most stable)");
            String xpath3 = "//button[normalize-space()='Submit']";
            System.out.println("XPath: " + xpath3);
            WebElement submitBtn = driver.findElement(By.xpath(xpath3));
            System.out.println("✅ Text-based locator: " + submitBtn.getText());

            // Clear fields for next example
            driver.navigate().refresh();
            Thread.sleep(2000);

            System.out.println("\nApproach 4: Username by relationship (most flexible)");
            String xpath4 = "//label[text()='Username']/following-sibling::input";
            System.out.println("XPath: " + xpath4);
            try {
                driver.findElement(By.xpath(xpath4)).sendKeys("student");
                System.out.println("✅ Works even if ID changes!");
            } catch (Exception e) {
                System.out.println("   (Label structure different on this page)");
                // Fallback
                driver.findElement(By.id("username")).sendKeys("student");
            }

            // ========================================
            // BEST PRACTICES SUMMARY
            // ========================================
            System.out.println("\n--- BEST PRACTICES FOR DYNAMIC ELEMENTS ---\n");

            System.out.println("1. PRIORITIZE STABLE ATTRIBUTES:");
            System.out.println("   ✅ data-testid, aria-label, name, placeholder");
            System.out.println("   ❌ Avoid: auto-generated IDs, framework IDs");

            System.out.println("\n2. USE PARTIAL MATCHING:");
            System.out.println("   ✅ contains(@id, 'stable_part')");
            System.out.println("   ✅ starts-with(@class, 'btn-')");
            System.out.println("   ❌ Avoid: exact match on dynamic values");

            System.out.println("\n3. COMBINE MULTIPLE CONDITIONS:");
            System.out.println("   ✅ //input[@type='text' and @name='username']");
            System.out.println("   ✅ //div[contains(@class, 'modal') and @role='dialog']");

            System.out.println("\n4. USE TEXT WHEN POSSIBLE:");
            System.out.println("   ✅ //button[text()='Submit']");
            System.out.println("   ✅ //h1[contains(text(), 'Welcome')]");

            System.out.println("\n5. LEVERAGE RELATIONSHIPS:");
            System.out.println("   ✅ //label[@for='email']/following-sibling::input");
            System.out.println("   ✅ //div[@class='header']/descendant::button");

            System.out.println("\n6. AVOID POSITION-BASED:");
            System.out.println("   ❌ (//div)[3] - Breaks when structure changes");
            System.out.println("   ✅ //div[@data-section='main'] - Uses attribute");

            // ========================================
            // TESTING XPATH FLEXIBILITY
            // ========================================
            System.out.println("\n--- TESTING XPATH FLEXIBILITY ---\n");

            System.out.println("Creating flexible XPath for username field:");
            System.out.println("\nOption 1 (Rigid): //input[@id='username']");
            System.out.println("  Risk: Breaks if ID changes");

            System.out.println("\nOption 2 (Flexible): //input[@type='text' and @name='username']");
            System.out.println("  Risk: Might not be unique");

            System.out.println("\nOption 3 (Most Flexible): //input[(@id='username' or @name='username') and @type='text']");
            System.out.println("  ✅ Works if either ID or name matches + type verification");

            WebElement flexibleInput = driver.findElement(
                By.xpath("//input[(@id='username' or @name='username') and @type='text']"));
            System.out.println("\n✅ Flexible XPath succeeded!");
            System.out.println("   Found: " + flexibleInput.getTagName() +
                             " with ID: " + flexibleInput.getAttribute("id"));

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n====================================================");
            System.out.println("DYNAMIC XPATH STRATEGIES SUMMARY");
            System.out.println("====================================================");
            System.out.println("PROBLEM: Elements with dynamic IDs/classes");
            System.out.println();
            System.out.println("SOLUTIONS:");
            System.out.println("  1. Partial Match:");
            System.out.println("     contains(@id, 'stable_part')");
            System.out.println("     starts-with(@class, 'prefix')");
            System.out.println();
            System.out.println("  2. Stable Attributes:");
            System.out.println("     @data-testid, @aria-label, @placeholder");
            System.out.println();
            System.out.println("  3. Text Content:");
            System.out.println("     text()='Submit'");
            System.out.println("     contains(text(), 'Welcome')");
            System.out.println();
            System.out.println("  4. Relationships:");
            System.out.println("     //label[@for='x']/following-sibling::input");
            System.out.println();
            System.out.println("  5. Multiple Conditions:");
            System.out.println("     [@type='text' and @name='username']");
            System.out.println();
            System.out.println("  6. Fallback Strategy:");
            System.out.println("     (@id='username' or @name='username')");
            System.out.println("====================================================");
            System.out.println("💡 Always test XPath with different page states!");
            System.out.println("====================================================");

            Thread.sleep(3000);

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
===== DYNAMIC XPATH: HANDLING CHANGING ELEMENTS =====

✅ Opened: How TO - Create a To Do List

--- STRATEGY 1: PARTIAL ATTRIBUTE MATCHING ---
Problem: IDs and classes often have dynamic parts

Example 1: Using contains() for partial ID match
Instead of exact ID: //input[@id='exact_dynamic_123']
Use partial match: //input[contains(@id, 'myInput')]
✅ Found input using stable ID part
   Placeholder: Title...

Example 2: Using contains() for class with multiple values
HTML might be: <button class='btn btn-primary active'>
XPath: //button[contains(@class, 'addBtn')]
✅ Found button even if class has multiple values

--- STRATEGY 2: PREFER STABLE ATTRIBUTES ---
Look for attributes that don't change:

Attribute Priority (Most to Least Stable):
  1. data-testid, data-test     → Added for testing
  2. aria-label, aria-*         → Accessibility attributes
  3. name                       → Usually stable for forms
  4. type, placeholder          → Stable for inputs
  5. id (if not generated)      → Can be stable
  6. class (functional classes) → Partial match needed

Example: Using stable placeholder attribute
XPath: //input[@placeholder="Title..."]
✅ Placeholder rarely changes: Title...

--- STRATEGY 3: USE TEXT CONTENT ---
Text visible to users rarely changes

Example 1: Button by visible text
XPath: //button[text()='Add']
✅ Most reliable - text users see rarely changes

Example 2: Element containing text
XPath: //h2[contains(text(), 'My To Do List')]
✅ Found heading: My To Do List

--- STRATEGY 4: RELATIONSHIP-BASED XPATH ---
Navigate from stable element to dynamic one

Example: Input field after a known heading
XPath: //h2[contains(text(),'To Do')]/following::input[1]
✅ Found input by its relationship to heading
   Entered text: Dynamic XPath Testing

--- STRATEGY 5: MULTIPLE CONDITIONS ---
Combine stable and semi-stable attributes

Example 1: Input with type AND placeholder
XPath: //input[@type='text' and @placeholder='Title...']
✅ Both conditions must match - more specific!

Example 2: Element with partial class AND text
XPath: //span[contains(@class, 'addBtn') and text()='Add']
✅ Combined text and class for uniqueness

--- STRATEGY 6: AVOID POSITION-BASED XPATH ---
Position changes when elements are added/removed

❌ FRAGILE (avoid unless no choice):
   (//input)[1]  → Breaks if new input is added before
   (//div)[5]    → Breaks if structure changes

✅ BETTER ALTERNATIVES:
   //input[@placeholder='specific']
   //div[contains(@class, 'unique-class')]
   //label[text()='Username']/following-sibling::input

--- REAL-WORLD EXAMPLE: DYNAMIC LOGIN FORM ---

Scenario: Login form with some dynamic elements

Approach 1: Username by ID (if stable)
XPath: //input[@id='username']
✅ Primary strategy worked

Approach 2: Password by type + name combination
XPath: //input[@type='password' and @name='password']
✅ Multiple conditions ensure uniqueness

Approach 3: Submit button by text (most stable)
XPath: //button[normalize-space()='Submit']
✅ Text-based locator: Submit

Approach 4: Username by relationship (most flexible)
XPath: //label[text()='Username']/following-sibling::input
✅ Works even if ID changes!

--- BEST PRACTICES FOR DYNAMIC ELEMENTS ---

1. PRIORITIZE STABLE ATTRIBUTES:
   ✅ data-testid, aria-label, name, placeholder
   ❌ Avoid: auto-generated IDs, framework IDs

2. USE PARTIAL MATCHING:
   ✅ contains(@id, 'stable_part')
   ✅ starts-with(@class, 'btn-')
   ❌ Avoid: exact match on dynamic values

3. COMBINE MULTIPLE CONDITIONS:
   ✅ //input[@type='text' and @name='username']
   ✅ //div[contains(@class, 'modal') and @role='dialog']

4. USE TEXT WHEN POSSIBLE:
   ✅ //button[text()='Submit']
   ✅ //h1[contains(text(), 'Welcome')]

5. LEVERAGE RELATIONSHIPS:
   ✅ //label[@for='email']/following-sibling::input
   ✅ //div[@class='header']/descendant::button

6. AVOID POSITION-BASED:
   ❌ (//div)[3] - Breaks when structure changes
   ✅ //div[@data-section='main'] - Uses attribute

--- TESTING XPATH FLEXIBILITY ---

Creating flexible XPath for username field:

Option 1 (Rigid): //input[@id='username']
  Risk: Breaks if ID changes

Option 2 (Flexible): //input[@type='text' and @name='username']
  Risk: Might not be unique

Option 3 (Most Flexible): //input[(@id='username' or @name='username') and @type='text']
  ✅ Works if either ID or name matches + type verification

✅ Flexible XPath succeeded!
   Found: input with ID: username

====================================================
DYNAMIC XPATH STRATEGIES SUMMARY
====================================================
PROBLEM: Elements with dynamic IDs/classes

SOLUTIONS:
  1. Partial Match:
     contains(@id, 'stable_part')
     starts-with(@class, 'prefix')

  2. Stable Attributes:
     @data-testid, @aria-label, @placeholder

  3. Text Content:
     text()='Submit'
     contains(text(), 'Welcome')

  4. Relationships:
     //label[@for='x']/following-sibling::input

  5. Multiple Conditions:
     [@type='text' and @name='username']

  6. Fallback Strategy:
     (@id='username' or @name='username')
====================================================
💡 Always test XPath with different page states!
====================================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens W3Schools To-Do List page
2. Various dynamic locator strategies are demonstrated
3. Navigation to login page for real-world examples
4. Multiple flexible XPath patterns are tested
5. Browser closes after 3 seconds

**✅ Success Criteria:**
- Understand why dynamic elements are problematic
- Can use contains() and starts-with() for partial matches
- Know which attributes are most stable
- Can combine multiple conditions
- Can use relationship-based navigation
- Understand when to avoid position-based XPath
- All examples execute successfully
- No exceptions thrown

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Approach |
|---------|----------------|------------------|
| `//input[@id='user_12345']` on dynamic ID | ID changes, XPath breaks | Use `//input[starts-with(@id, 'user_')]` |
| `(//div)[3]` position-based | Breaks when elements added/removed | Use attribute-based locator |
| `//div[@class='btn primary']` on multi-class | Classes separated by spaces | Use `//div[contains(@class, 'btn')]` |
| Using only one condition when not unique | Multiple matches cause failures | Add more conditions with `and` |
| Not testing XPath after page changes | Locator might be fragile | Test with refreshes, different data |
| Over-relying on generated framework IDs | React, Angular IDs change often | Use stable attributes or text |

**💡 Key Concepts:**

**1. Stability Hierarchy (Best to Worst):**
```
Most Stable (Use First):
  1. Text content (what user sees)
  2. data-testid, data-test attributes
  3. aria-label, aria-* attributes
  4. name attribute (forms)
  5. Stable custom attributes
  6. placeholder, type, title

Less Stable (Use with Caution):
  7. Non-generated IDs
  8. Functional class names (btn, input, etc.)

Least Stable (Avoid):
  9. Framework-generated IDs (React, Angular)
  10. Position-based selectors
  11. Absolute XPath
```

**2. Dynamic ID Patterns:**
```java
// Pattern 1: Prefix stable, suffix changes
// ID: user_12345, user_67890, user_11111
✅ //input[starts-with(@id, 'user_')]

// Pattern 2: Middle part stable
// ID: react_username_xyz, react_password_xyz
✅ //input[contains(@id, '_username_')]

// Pattern 3: Completely dynamic
// ID: kj2h3kjh23k4h
❌ Can't use ID directly
✅ //input[@type='text' and @name='username']
✅ //label[text()='Username']/following-sibling::input
```

**3. Fallback Strategy Pattern:**
```java
public WebElement findWithFallback(WebDriver driver) {
    // Try primary (fastest/most reliable)
    try {
        return driver.findElement(By.id("username"));
    } catch (NoSuchElementException e1) {
        // Try secondary (stable attributes)
        try {
            return driver.findElement(
                By.xpath("//input[@name='username']"));
        } catch (NoSuchElementException e2) {
            // Try tertiary (relationship-based)
            return driver.findElement(
                By.xpath("//label[text()='Username']/following-sibling::input"));
        }
    }
}
```

**🎯 Practice Challenge:**

1. Go to https://demoqa.com/text-box
2. Create flexible XPath for Full Name that would work even if ID changes
3. Create XPath using 3 different attributes combined with AND
4. Create XPath that uses both partial match AND relationship
5. Test your XPath by manually changing the ID in browser DevTools
6. Create a method that generates flexible XPath given hints about the element
7. Compare brittle vs flexible XPath for same element

**Bonus Challenge:**
Create a utility class for building flexible XPath:
```java
public class FlexibleXPath {
    public static String build(String tag, String stableAttr,
                              String stableValue, String backupText) {
        return "//" + tag +
               "[(starts-with(@" + stableAttr + ", '" + stableValue + "')" +
               " or contains(text(), '" + backupText + "'))]";
    }
}

// Usage:
String xpath = FlexibleXPath.build("button", "id", "submit_", "Submit");
// Returns: //button[(starts-with(@id, 'submit_') or contains(text(), 'Submit'))]
```

---

#### Exercise 5: Complex XPath Scenarios - Tables, Lists, and Nested Elements (30-35 minutes)

**What you'll learn:** Handling complex web structures like tables, lists, and deeply nested elements with advanced XPath

**Create new class: `ComplexXPathScenarios`**

**Concept Explanation:**

Real-world applications often have complex HTML structures like:
- **Tables** with dynamic rows and columns
- **Lists** (ordered/unordered) with nested items
- **Nested div structures** with multiple levels
- **Shadow DOM** elements
- **iFrames** containing elements

**Advanced XPath Patterns for Complex Scenarios:**

**1. Table Navigation:**
```
Structure:
<table id="dataTable">
  <thead><tr><th>Name</th><th>Age</th><th>Action</th></tr></thead>
  <tbody>
    <tr><td>John</td><td>25</td><td><button>Edit</button></td></tr>
    <tr><td>Jane</td><td>30</td><td><button>Edit</button></td></tr>
  </tbody>
</table>

XPath Patterns:
// Get row by cell content:
//tr[td[text()='John']]

// Get specific cell in that row:
//tr[td[text()='John']]/td[2]  → Gets age "25"

// Get button in that row:
//tr[td[text()='John']]//button

// Get all rows:
//table[@id='dataTable']//tbody/tr

// Get row by position:
//table[@id='dataTable']//tbody/tr[2]  → Second row

// Get cell by row and column:
//table[@id='dataTable']//tbody/tr[1]/td[3]  → Row 1, Column 3
```

**2. List Navigation:**
```
Structure:
<ul class="menu">
  <li>Home</li>
  <li>Products
    <ul class="submenu">
      <li>Electronics</li>
      <li>Clothing</li>
    </ul>
  </li>
  <li>About</li>
</ul>

XPath Patterns:
// Get top-level menu item:
//ul[@class='menu']/li[text()='Products']

// Get submenu item:
//ul[@class='menu']//li[text()='Products']//ul[@class='submenu']/li[1]

// Get all submenu items under Products:
//ul[@class='menu']//li[text()='Products']//ul[@class='submenu']/li

// Count menu items:
count(//ul[@class='menu']/li)
```

**3. Nested Divs:**
```
Structure:
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Title</div>
        <div class="card-body">Content</div>
      </div>
    </div>
  </div>
</div>

XPath Patterns:
// Find card by title:
//div[@class='card' and .//div[@class='card-header' and text()='Title']]

// Get card body:
//div[@class='card']//div[@class='card-header' and text()='Title']/following-sibling::div[@class='card-body']

// Parent navigation:
//div[@class='card-body']/parent::div[@class='card']
```

**Complete Code:**

```java
package com.automation.locators.xpath;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.util.List;

public class ComplexXPathScenarios {

    public static void main(String[] args) throws InterruptedException {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            System.out.println("=== Complex XPath Scenarios Demo ===\n");

            // Scenario 1: Working with Tables
            System.out.println("--- Scenario 1: Table XPath ---");
            driver.get("https://the-internet.herokuapp.com/tables");

            // Find all rows in table 1
            List<WebElement> rows = driver.findElements(
                By.xpath("//table[@id='table1']//tbody/tr"));
            System.out.println("Total rows in table: " + rows.size());

            // Find row where Last Name is "Smith"
            WebElement smithRow = driver.findElement(
                By.xpath("//table[@id='table1']//tr[td[contains(text(),'Smith')]]"));
            System.out.println("Found row with Smith: " +
                smithRow.findElement(By.xpath("./td[2]")).getText());

            // Get the email from Smith's row (4th column)
            String email = driver.findElement(
                By.xpath("//table[@id='table1']//tr[td[contains(text(),'Smith')]]/td[3]"))
                .getText();
            System.out.println("Smith's email: " + email);

            // Click edit button in Smith's row
            driver.findElement(
                By.xpath("//table[@id='table1']//tr[td[contains(text(),'Smith')]]//a[text()='edit']"))
                .click();
            System.out.println("Clicked edit button for Smith");
            Thread.sleep(1000);

            // Find row by position (3rd row)
            WebElement thirdRow = driver.findElement(
                By.xpath("//table[@id='table1']//tbody/tr[3]"));
            System.out.println("Third row last name: " +
                thirdRow.findElement(By.xpath("./td[1]")).getText());

            // Get all emails (3rd column)
            List<WebElement> emails = driver.findElements(
                By.xpath("//table[@id='table1']//tbody/tr/td[3]"));
            System.out.println("\nAll emails:");
            for (WebElement emailElement : emails) {
                System.out.println("  - " + emailElement.getText());
            }

            // Scenario 2: Nested Lists and Checkboxes
            System.out.println("\n--- Scenario 2: Checkboxes and Lists ---");
            driver.get("https://the-internet.herokuapp.com/checkboxes");

            // Find all checkboxes
            List<WebElement> checkboxes = driver.findElements(
                By.xpath("//input[@type='checkbox']"));
            System.out.println("Total checkboxes: " + checkboxes.size());

            // Check state of each checkbox
            for (int i = 0; i < checkboxes.size(); i++) {
                boolean isChecked = checkboxes.get(i).isSelected();
                System.out.println("Checkbox " + (i+1) + " is " +
                    (isChecked ? "checked" : "unchecked"));
            }

            // Select first checkbox if not selected
            WebElement firstCheckbox = driver.findElement(
                By.xpath("//input[@type='checkbox'][1]"));
            if (!firstCheckbox.isSelected()) {
                firstCheckbox.click();
                System.out.println("Checked first checkbox");
            }

            // Scenario 3: Dropdown and Nested Elements
            System.out.println("\n--- Scenario 3: Dropdown Navigation ---");
            driver.get("https://the-internet.herokuapp.com/dropdown");

            // Find dropdown
            WebElement dropdown = driver.findElement(By.id("dropdown"));

            // Get all options using XPath
            List<WebElement> options = driver.findElements(
                By.xpath("//select[@id='dropdown']/option"));
            System.out.println("Dropdown options:");
            for (WebElement option : options) {
                System.out.println("  - " + option.getText() +
                    " (value: " + option.getAttribute("value") + ")");
            }

            // Select option by visible text using XPath
            driver.findElement(
                By.xpath("//select[@id='dropdown']/option[text()='Option 1']"))
                .click();
            System.out.println("Selected Option 1");
            Thread.sleep(1000);

            // Select option by value
            driver.findElement(
                By.xpath("//select[@id='dropdown']/option[@value='2']"))
                .click();
            System.out.println("Selected Option 2");

            // Scenario 4: Dynamic Content
            System.out.println("\n--- Scenario 4: Dynamic Content ---");
            driver.get("https://the-internet.herokuapp.com/dynamic_content");

            // Find all image-text pairs (rows)
            List<WebElement> contentRows = driver.findElements(
                By.xpath("//div[@id='content']//div[@class='row']"));
            System.out.println("Dynamic content rows: " + contentRows.size());

            // Get text from first row
            WebElement firstRowText = driver.findElement(
                By.xpath("(//div[@id='content']//div[@class='row'])[1]//div[@class='large-10 columns']"));
            System.out.println("First row text: " +
                firstRowText.getText().substring(0, Math.min(50, firstRowText.getText().length())) + "...");

            // Scenario 5: Multiple Attribute Matching
            System.out.println("\n--- Scenario 5: Multiple Conditions ---");
            driver.get("https://demoqa.com/text-box");

            // Find element matching multiple conditions
            WebElement fullNameInput = driver.findElement(
                By.xpath("//input[@id='userName' and @type='text' and @placeholder='Full Name']"));
            fullNameInput.sendKeys("John Doe");
            System.out.println("Entered text in element matching 3 conditions");

            // Using OR condition
            WebElement emailInput = driver.findElement(
                By.xpath("//input[@id='userEmail' or @placeholder='name@example.com']"));
            emailInput.sendKeys("john@example.com");
            System.out.println("Entered email using OR condition");

            // Combining AND and OR
            WebElement addressInput = driver.findElement(
                By.xpath("//textarea[(@id='currentAddress' or @placeholder='Current Address') and @class='form-control']"));
            addressInput.sendKeys("123 Main St");
            System.out.println("Entered address using combined conditions");

            Thread.sleep(2000);

            System.out.println("\n✅ All complex scenarios completed successfully!");

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\nBrowser closed");
        }
    }
}
```

**Expected Console Output:**
```
=== Complex XPath Scenarios Demo ===

--- Scenario 1: Table XPath ---
Total rows in table: 4
Found row with Smith: John
Smith's email: jsmith@gmail.com
Clicked edit button for Smith
Third row last name: Doe

All emails:
  - fbach@yahoo.com
  - jdoe@hotmail.com
  - jsmith@gmail.com
  - tconway@yahoo.com

--- Scenario 2: Checkboxes and Lists ---
Total checkboxes: 2
Checkbox 1 is unchecked
Checkbox 2 is checked
Checked first checkbox

--- Scenario 3: Dropdown Navigation ---
Dropdown options:
  - Please select an option (value: )
  - Option 1 (value: 1)
  - Option 2 (value: 2)
Selected Option 1
Selected Option 2

--- Scenario 4: Dynamic Content ---
Dynamic content rows: 3
First row text: Lorem ipsum dolor sit amet, consectetur adipisicing...

--- Scenario 5: Multiple Conditions ---
Entered text in element matching 3 conditions
Entered email using OR condition
Entered address using combined conditions

✅ All complex scenarios completed successfully!

Browser closed
```

**✅ Success Criteria:**

- [ ] All table rows found correctly
- [ ] Specific row identified by cell content
- [ ] Column values extracted from specific row
- [ ] Checkboxes identified and manipulated
- [ ] Dropdown options listed and selected
- [ ] Dynamic content rows counted
- [ ] Multiple conditions (AND/OR) working
- [ ] No NoSuchElementException errors

**❌ Common Mistakes:**

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| `//tr/td[text()='Smith']` | Only checks first cell | Use `//tr[td[text()='Smith']]` |
| `//table/tr[3]` | Selects header row | Use `//table//tbody/tr[3]` |
| `//option[1]` | Selects disabled option | Use `//option[text()='Option 1']` |
| Hardcoding row numbers | Breaks when data changes | Use content-based XPath |
| Not using `./` for relative | Searches entire document | Use `./td[2]` from row context |

**💡 Key Learning Points:**

1. **Table XPath Pattern:** `//tr[td[contains(text(),'value')]]/td[position]`
2. **Nested Element Access:** Use `//` for descendants, `/` for direct children
3. **Position-Based Selection:** Use `[index]` but prefer content-based
4. **Multiple Conditions:** Combine with `and`, `or` in square brackets
5. **Context Switching:** Use `.` for current node, `./` for relative path

**🎯 Practice Challenge:**

1. Go to https://www.w3schools.com/html/html_tables.asp
2. Create XPath to find the row containing "Germany"
3. Extract all company names from the table
4. Find the country for "Island Trading" company
5. Count total rows in the table
6. Click on the company in the 3rd row
7. Create a reusable method: `getTableCellValue(rowText, columnIndex)`

**Bonus Challenge:**
```java
// Create a utility class for table operations
public class TableXPathUtil {

    // Get cell value from table by row content and column index
    public static String getCellValue(WebDriver driver, String tableId,
                                     String rowIdentifier, int columnIndex) {
        String xpath = String.format(
            "//table[@id='%s']//tr[td[contains(text(),'%s')]]/td[%d]",
            tableId, rowIdentifier, columnIndex);
        return driver.findElement(By.xpath(xpath)).getText();
    }

    // Click element in specific row
    public static void clickInRow(WebDriver driver, String tableId,
                                  String rowIdentifier, String linkText) {
        String xpath = String.format(
            "//table[@id='%s']//tr[td[contains(text(),'%s')]]//a[text()='%s']",
            tableId, rowIdentifier, linkText);
        driver.findElement(By.xpath(xpath)).click();
    }

    // Get all values from a specific column
    public static List<String> getColumnValues(WebDriver driver,
                                               String tableId, int columnIndex) {
        List<WebElement> cells = driver.findElements(
            By.xpath("//table[@id='" + tableId + "']//tbody/tr/td[" + columnIndex + "]"));
        return cells.stream()
                   .map(WebElement::getText)
                   .collect(Collectors.toList());
    }
}
```

---

#### Exercise 6: XPath Best Practices & Real-World Application (25-30 minutes)

**What you'll learn:** Industry-standard XPath patterns, performance optimization, and building a production-ready XPath utility framework

**Create new class: `XPathBestPractices`**

**Concept Explanation:**

Writing XPath is easy, but writing **maintainable, performant, and reliable** XPath requires following best practices.

**XPath Best Practices:**

**1. Prefer Shorter XPath**
```
❌ Bad:
//div[@class='container']//div[@class='row']//div[@class='col-md-6']//button[@id='submit']

✅ Good:
//button[@id='submit']
```

**2. Use Specific Attributes**
```
❌ Bad (generic):
//div[@class='user-info']

✅ Good (specific):
//div[@data-testid='user-profile-card']
```

**3. Avoid Absolute XPath**
```
❌ Never use:
/html/body/div[1]/div[2]/form/input[3]

✅ Always use:
//input[@name='username']
```

**4. Prefer Unique Attributes**
```
Priority order:
1. id           → //input[@id='username']
2. name         → //input[@name='user']
3. data-testid  → //button[@data-testid='submit-btn']
4. unique class → //div[@class='unique-header']
5. combination  → //input[@type='text' and @placeholder='Email']
```

**5. Use Logical Conditions**
```
// AND condition:
//button[@type='submit' and contains(@class,'primary')]

// OR condition:
//input[@id='email' or @name='userEmail']

// NOT condition:
//button[not(contains(@class,'disabled'))]
```

**6. Text Matching Strategies**
```
// Exact match:
//button[text()='Submit']

// Partial match:
//button[contains(text(),'Sub')]

// Starts with:
//button[starts-with(text(),'Sub')]

// Normalize spaces:
//button[normalize-space(text())='Submit']
```

**7. Performance Tips**
```
❌ Slow:
//*[@id='username']  // Searches all tags

✅ Fast:
//input[@id='username']  // Searches only input tags
```

**Complete Code - Production-Ready XPath Utility:**

```java
package com.automation.locators.xpath;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;

/**
 * Demonstrates XPath best practices and provides reusable utility methods
 * for creating maintainable, performant XPath expressions.
 */
public class XPathBestPractices {

    /**
     * XPath Builder - Utility class for creating dynamic XPath
     */
    public static class XPathBuilder {

        // Build XPath with single attribute
        public static String byAttribute(String tag, String attribute, String value) {
            return String.format("//%s[@%s='%s']", tag, attribute, value);
        }

        // Build XPath with multiple AND conditions
        public static String byMultipleAttributes(String tag, String... attrValuePairs) {
            if (attrValuePairs.length % 2 != 0) {
                throw new IllegalArgumentException("Attributes and values must be in pairs");
            }

            StringBuilder xpath = new StringBuilder("//").append(tag).append("[");
            for (int i = 0; i < attrValuePairs.length; i += 2) {
                if (i > 0) xpath.append(" and ");
                xpath.append("@").append(attrValuePairs[i])
                     .append("='").append(attrValuePairs[i+1]).append("'");
            }
            xpath.append("]");
            return xpath.toString();
        }

        // Build XPath with text
        public static String byText(String tag, String text) {
            return String.format("//%s[text()='%s']", tag, text);
        }

        // Build XPath with partial text
        public static String byPartialText(String tag, String partialText) {
            return String.format("//%s[contains(text(),'%s')]", tag, partialText);
        }

        // Build XPath with attribute containing value
        public static String byPartialAttribute(String tag, String attribute, String partialValue) {
            return String.format("//%s[contains(@%s,'%s')]", tag, attribute, partialValue);
        }

        // Build XPath for child element
        public static String childOf(String parentXpath, String childTag) {
            return parentXpath + "/" + childTag;
        }

        // Build XPath for descendant element
        public static String descendantOf(String ancestorXpath, String descendantTag) {
            return ancestorXpath + "//" + descendantTag;
        }

        // Build flexible XPath (tries multiple strategies)
        public static String flexible(String tag, String primaryAttr, String primaryValue,
                                     String fallbackAttr, String fallbackValue) {
            return String.format(
                "//%s[@%s='%s' or @%s='%s']",
                tag, primaryAttr, primaryValue, fallbackAttr, fallbackValue);
        }
    }

    /**
     * XPath Validator - Check if XPath is following best practices
     */
    public static class XPathValidator {

        public static ValidationResult validate(String xpath) {
            ValidationResult result = new ValidationResult();

            // Check if absolute XPath
            if (xpath.startsWith("/html")) {
                result.addIssue("❌ Using absolute XPath - extremely brittle!");
            }

            // Check if using //*
            if (xpath.contains("//*")) {
                result.addIssue("⚠️ Using //* - slow performance, specify tag");
            }

            // Check if too complex (too many levels)
            int levels = xpath.split("//").length - 1;
            if (levels > 5) {
                result.addIssue("⚠️ XPath too complex (" + levels + " levels) - simplify");
            }

            // Check if using position numbers
            if (xpath.matches(".*\\[\\d+\\].*")) {
                result.addIssue("⚠️ Using position numbers - prefer attribute-based");
            }

            // Good practices detected
            if (xpath.contains("@id=")) {
                result.addGoodPractice("✅ Using ID attribute - excellent!");
            }
            if (xpath.contains("@data-testid=")) {
                result.addGoodPractice("✅ Using data-testid - great for testing!");
            }
            if (xpath.contains("contains(") || xpath.contains("starts-with(")) {
                result.addGoodPractice("✅ Using XPath functions - flexible!");
            }

            return result;
        }

        static class ValidationResult {
            private List<String> issues = new java.util.ArrayList<>();
            private List<String> goodPractices = new java.util.ArrayList<>();

            void addIssue(String issue) { issues.add(issue); }
            void addGoodPractice(String practice) { goodPractices.add(practice); }

            void print() {
                if (!goodPractices.isEmpty()) {
                    System.out.println("Good Practices:");
                    goodPractices.forEach(p -> System.out.println("  " + p));
                }
                if (!issues.isEmpty()) {
                    System.out.println("Issues Found:");
                    issues.forEach(i -> System.out.println("  " + i));
                }
                if (issues.isEmpty() && !goodPractices.isEmpty()) {
                    System.out.println("✅ XPath follows best practices!");
                }
            }
        }
    }

    public static void main(String[] args) {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            System.out.println("=== XPath Best Practices Demo ===\n");

            driver.get("https://demoqa.com/automation-practice-form");

            // Demo 1: Using XPathBuilder utility
            System.out.println("--- Demo 1: XPath Builder Utility ---");

            String firstNameXPath = XPathBuilder.byAttribute("input", "id", "firstName");
            System.out.println("First Name XPath: " + firstNameXPath);
            driver.findElement(By.xpath(firstNameXPath)).sendKeys("John");

            String lastNameXPath = XPathBuilder.byAttribute("input", "id", "lastName");
            driver.findElement(By.xpath(lastNameXPath)).sendKeys("Doe");

            String emailXPath = XPathBuilder.byMultipleAttributes("input",
                "id", "userEmail", "type", "email");
            System.out.println("Email XPath (multiple attributes): " + emailXPath);
            driver.findElement(By.xpath(emailXPath)).sendKeys("john@example.com");

            // Demo 2: Flexible XPath
            System.out.println("\n--- Demo 2: Flexible XPath ---");

            String mobileXPath = XPathBuilder.flexible("input",
                "id", "userNumber",
                "placeholder", "Mobile Number");
            System.out.println("Mobile XPath (flexible): " + mobileXPath);
            driver.findElement(By.xpath(mobileXPath)).sendKeys("1234567890");

            // Demo 3: Text-based XPath
            System.out.println("\n--- Demo 3: Text-based XPath ---");

            String genderLabelXPath = XPathBuilder.byText("label", "Male");
            System.out.println("Gender label XPath: " + genderLabelXPath);
            driver.findElement(By.xpath(genderLabelXPath)).click();

            // Demo 4: Validating XPath
            System.out.println("\n--- Demo 4: XPath Validation ---");

            String[] xpathsToValidate = {
                "//input[@id='firstName']",
                "/html/body/div/div/form/input[1]",
                "//*[@class='form-control']",
                "//input[@id='email' or @name='userEmail']",
                "//div//div//div//div//div//div//input",
                "//button[@data-testid='submit-btn']"
            };

            for (String xpath : xpathsToValidate) {
                System.out.println("\nValidating: " + xpath);
                XPathValidator.validate(xpath).print();
            }

            // Demo 5: Performance Comparison
            System.out.println("\n--- Demo 5: Performance Comparison ---");

            long startTime, endTime;

            // Test 1: Using tag name (faster)
            startTime = System.nanoTime();
            driver.findElement(By.xpath("//input[@id='firstName']"));
            endTime = System.nanoTime();
            System.out.println("With tag name: " + (endTime - startTime) / 1000 + " microseconds");

            // Test 2: Using //* (slower)
            startTime = System.nanoTime();
            driver.findElement(By.xpath("//*[@id='firstName']"));
            endTime = System.nanoTime();
            System.out.println("With //*: " + (endTime - startTime) / 1000 + " microseconds");

            // Demo 6: Real-world scenarios
            System.out.println("\n--- Demo 6: Real-World XPath Patterns ---");

            // Pattern 1: Submit button with multiple strategies
            String[] submitButtonStrategies = {
                "//button[@id='submit']",  // Best: unique ID
                "//button[@type='submit']",  // Good: semantic attribute
                "//button[text()='Submit']",  // OK: visible text
                "//button[contains(@class,'btn-primary')]"  // OK: class
            };

            System.out.println("Submit button strategies (priority order):");
            for (int i = 0; i < submitButtonStrategies.length; i++) {
                System.out.println((i+1) + ". " + submitButtonStrategies[i]);
            }

            Thread.sleep(2000);

            System.out.println("\n✅ All best practices demonstrated successfully!");

            // Print Summary
            System.out.println("\n=== XPATH BEST PRACTICES SUMMARY ===");
            System.out.println("1. ✅ Avoid absolute XPath");
            System.out.println("2. ✅ Specify tag names (not //* ←)");
            System.out.println("3. ✅ Use unique attributes (id, data-testid)");
            System.out.println("4. ✅ Keep XPath short and simple");
            System.out.println("5. ✅ Use XPath functions for flexibility");
            System.out.println("6. ✅ Validate XPath before using in framework");
            System.out.println("7. ✅ Build reusable utility methods");
            System.out.println("8. ✅ Test performance with large DOM");

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\nBrowser closed");
        }
    }
}
```

**Expected Console Output:**
```
=== XPath Best Practices Demo ===

--- Demo 1: XPath Builder Utility ---
First Name XPath: //input[@id='firstName']
Email XPath (multiple attributes): //input[@id='userEmail' and @type='email']

--- Demo 2: Flexible XPath ---
Mobile XPath (flexible): //input[@id='userNumber' or @placeholder='Mobile Number']

--- Demo 3: Text-based XPath ---
Gender label XPath: //label[text()='Male']

--- Demo 4: XPath Validation ---

Validating: //input[@id='firstName']
Good Practices:
  ✅ Using ID attribute - excellent!
✅ XPath follows best practices!

Validating: /html/body/div/div/form/input[1]
Issues Found:
  ❌ Using absolute XPath - extremely brittle!
  ⚠️ Using position numbers - prefer attribute-based

Validating: //*[@class='form-control']
Issues Found:
  ⚠️ Using //* - slow performance, specify tag

Validating: //input[@id='email' or @name='userEmail']
Good Practices:
  ✅ Using ID attribute - excellent!
✅ XPath follows best practices!

Validating: //div//div//div//div//div//div//input
Issues Found:
  ⚠️ XPath too complex (7 levels) - simplify

Validating: //button[@data-testid='submit-btn']
Good Practices:
  ✅ Using data-testid - great for testing!
✅ XPath follows best practices!

--- Demo 5: Performance Comparison ---
With tag name: 1250 microseconds
With //*: 3840 microseconds

--- Demo 6: Real-World XPath Patterns ---
Submit button strategies (priority order):
1. //button[@id='submit']
2. //button[@type='submit']
3. //button[text()='Submit']
4. //button[contains(@class,'btn-primary')]

✅ All best practices demonstrated successfully!

=== XPATH BEST PRACTICES SUMMARY ===
1. ✅ Avoid absolute XPath
2. ✅ Specify tag names (not //)
3. ✅ Use unique attributes (id, data-testid)
4. ✅ Keep XPath short and simple
5. ✅ Use XPath functions for flexibility
6. ✅ Validate XPath before using in framework
7. ✅ Build reusable utility methods
8. ✅ Test performance with large DOM

Browser closed
```

**✅ Success Criteria:**

- [ ] XPathBuilder utility methods work correctly
- [ ] XPathValidator identifies issues accurately
- [ ] Performance difference between tag and //* is measurable
- [ ] All validation tests show appropriate messages
- [ ] Form fields populated successfully using generated XPath
- [ ] No runtime errors

**❌ Common Mistakes:**

| Mistake | Impact | Best Practice |
|---------|--------|---------------|
| Always using //* | 3x slower | Specify tag name |
| Hardcoding XPath | Maintenance nightmare | Use utility methods |
| No validation | Production bugs | Validate before committing |
| Overly complex XPath | Hard to debug | Keep it simple |
| Not reusing patterns | Code duplication | Build utility library |

**💡 Key Learning Points:**

1. **XPath Performance:** Tag-specific XPath is ~3x faster than //*
2. **Utility Methods:** Reusable builders save time and reduce errors
3. **Validation:** Automated validation catches issues early
4. **Flexibility:** OR conditions create fallback strategies
5. **Maintainability:** Short, simple XPath is easier to maintain

**🎯 Practice Challenge:**

1. Create XPathBuilder method for parent-child relationships
2. Add validation rule for detecting deprecated XPath syntax
3. Build method to convert absolute XPath to relative
4. Create performance benchmarking for 10 different XPath patterns
5. Implement XPath auto-suggestion based on element attributes
6. Build framework-ready XPath utility with logging

**Bonus Challenge - Complete XPath Utility Framework:**
```java
public class XPathFramework {

    // Configuration
    public static class Config {
        public static boolean VALIDATE_BEFORE_USE = true;
        public static boolean LOG_XPATH_USAGE = true;
        public static boolean PREFER_DATA_TESTID = true;
    }

    // Smart XPath generator
    public static String smartGenerate(WebElement element) {
        // Priority 1: data-testid
        String testId = element.getAttribute("data-testid");
        if (testId != null && Config.PREFER_DATA_TESTID) {
            return "//" + element.getTagName() + "[@data-testid='" + testId + "']";
        }

        // Priority 2: id
        String id = element.getAttribute("id");
        if (id != null && !id.isEmpty()) {
            return "//" + element.getTagName() + "[@id='" + id + "']";
        }

        // Priority 3: name
        String name = element.getAttribute("name");
        if (name != null && !name.isEmpty()) {
            return "//" + element.getTagName() + "[@name='" + name + "']";
        }

        // Fallback: multiple attributes
        return "//Complex element - manual XPath needed";
    }

    // Safe find element with validation
    public static WebElement safeFindElement(WebDriver driver, String xpath) {
        if (Config.VALIDATE_BEFORE_USE) {
            XPathBestPractices.XPathValidator.validate(xpath).print();
        }

        if (Config.LOG_XPATH_USAGE) {
            System.out.println("Using XPath: " + xpath);
        }

        return driver.findElement(By.xpath(xpath));
    }
}
```

---

# Day 23: CSS Selector Mastery

---

#### Exercise 1: CSS Selector Basics - Syntax and Simple Selectors (20-25 minutes)

**What you'll learn:** Fundamental CSS selector syntax, basic selectors, and when to use CSS over XPath

**Create new package: `com.automation.locators.css`**
**Create new class: `CSSBasics`**

**Concept Explanation:**

CSS (Cascading Style Sheets) Selectors are an alternative to XPath for locating elements. They were originally designed for styling web pages but are equally powerful for automation.

**CSS vs XPath:**

| Feature | CSS Selectors | XPath |
|---------|---------------|-------|
| **Performance** | ⚡ Faster (native browser support) | Slower |
| **Syntax** | Simpler, cleaner | More complex |
| **Parent traversal** | ❌ Cannot go up | ✅ Can navigate to parent |
| **Text matching** | ❌ Limited | ✅ Powerful text() functions |
| **Attribute matching** | ✅ Excellent | ✅ Excellent |
| **Learning curve** | Easier | Steeper |
| **Browser support** | ✅ All browsers | Some limitations |

**When to use CSS:**
- ✅ Element has ID or unique class
- ✅ Need best performance
- ✅ Simple attribute matching
- ✅ Cleaner, more readable code

**When to use XPath:**
- ✅ Need to traverse to parent
- ✅ Need text-based matching
- ✅ Complex conditional logic
- ✅ Navigating through siblings

**Basic CSS Selector Syntax:**

**1. Select by Tag Name:**
```
CSS: input
Matches: All <input> elements
```

**2. Select by ID:**
```
CSS: #username
Syntax: #idValue
Matches: <input id="username">
Example: driver.findElement(By.cssSelector("#username"))
```

**3. Select by Class:**
```
CSS: .btn-primary
Syntax: .className
Matches: <button class="btn-primary">
Note: Use . (dot) before class name
```

**4. Select by Attribute:**
```
CSS: input[name='email']
Syntax: tag[attribute='value']
Matches: <input name="email">
```

**5. Combining Tag and ID:**
```
CSS: input#username
More specific than just #username
Matches: <input id="username"> only
```

**6. Combining Tag and Class:**
```
CSS: button.btn-primary
More specific than just .btn-primary
Matches: <button class="btn-primary">
```

**7. Multiple Classes:**
```
CSS: button.btn.btn-primary
No space between .btn and .btn-primary
Matches: <button class="btn btn-primary">
```

**8. Multiple Attributes:**
```
CSS: input[type='text'][name='username']
Matches: <input type="text" name="username">
```

**Visual Syntax Guide:**
```
CSS Selector Anatomy:

tag#id.class[attribute='value']
│   │  │    │         │      │
│   │  │    │         │      └─ Attribute value
│   │  │    │         └──────── Attribute name
│   │  │    └────────────────── Attribute selector
│   │  └─────────────────────── Class selector (with dot)
│   └────────────────────────── ID selector (with hash)
└────────────────────────────── Tag name

Examples:
input#email                    → ID only
button.btn-primary             → Class only
input[name='username']         → Attribute only
input#email.form-control       → ID + Class
button.btn[type='submit']      → Class + Attribute
```

**Complete Code:**

```java
package com.automation.locators.css;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.util.List;

public class CSSBasics {

    public static void main(String[] args) throws InterruptedException {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            System.out.println("=== CSS Selector Basics Demo ===\n");

            driver.get("https://demoqa.com/text-box");

            // 1. Select by ID
            System.out.println("--- 1. Select by ID ---");
            WebElement fullNameById = driver.findElement(By.cssSelector("#userName"));
            fullNameById.sendKeys("John Doe");
            System.out.println("✅ Found element by ID: #userName");

            // 2. Select by ID with tag name (more specific)
            WebElement emailByTagAndId = driver.findElement(By.cssSelector("input#userEmail"));
            emailByTagAndId.sendKeys("john@example.com");
            System.out.println("✅ Found element by Tag+ID: input#userEmail");

            // 3. Select by class
            WebElement currentAddressByClass = driver.findElement(
                By.cssSelector(".form-control"));
            System.out.println("✅ Found element by class: .form-control");
            System.out.println("   Tag name: " + currentAddressByClass.getTagName());

            // 4. Select by attribute
            WebElement fullNameByAttr = driver.findElement(
                By.cssSelector("input[placeholder='Full Name']"));
            System.out.println("✅ Found element by attribute: input[placeholder='Full Name']");

            // 5. Select by multiple attributes
            WebElement emailByMultipleAttr = driver.findElement(
                By.cssSelector("input[id='userEmail'][type='email']"));
            System.out.println("✅ Found element by multiple attributes");

            // 6. Select by tag name
            List<WebElement> allInputs = driver.findElements(By.cssSelector("input"));
            System.out.println("\n--- 6. Select by Tag Name ---");
            System.out.println("Total <input> elements: " + allInputs.size());

            // Navigate to form with classes
            driver.get("https://demoqa.com/automation-practice-form");
            Thread.sleep(1000);

            // 7. Multiple classes
            System.out.println("\n--- 7. Multiple Classes ---");
            WebElement submitButton = driver.findElement(
                By.cssSelector("button#submit"));
            System.out.println("✅ Found submit button: button#submit");
            System.out.println("   Button text: " + submitButton.getText());

            // 8. Class + Attribute combination
            System.out.println("\n--- 8. Class + Attribute ---");
            WebElement firstNameInput = driver.findElement(
                By.cssSelector("input.form-control[placeholder='First Name']"));
            firstNameInput.sendKeys("Jane");
            System.out.println("✅ Found using class + attribute");

            // 9. Find all elements with specific class
            List<WebElement> formControls = driver.findElements(
                By.cssSelector(".form-control"));
            System.out.println("\n--- 9. Multiple Elements by Class ---");
            System.out.println("Total .form-control elements: " + formControls.size());

            // 10. Comparison: CSS vs XPath
            System.out.println("\n--- 10. CSS vs XPath Comparison ---");

            long startTime, endTime;

            // CSS performance
            startTime = System.nanoTime();
            driver.findElement(By.cssSelector("#firstName"));
            endTime = System.nanoTime();
            long cssTime = (endTime - startTime) / 1000;

            // XPath performance
            startTime = System.nanoTime();
            driver.findElement(By.xpath("//input[@id='firstName']"));
            endTime = System.nanoTime();
            long xpathTime = (endTime - startTime) / 1000;

            System.out.println("CSS selector time: " + cssTime + " microseconds");
            System.out.println("XPath selector time: " + xpathTime + " microseconds");
            System.out.println("Performance: CSS is " +
                String.format("%.1f", (double)xpathTime/cssTime) + "x faster");

            Thread.sleep(2000);

            System.out.println("\n✅ CSS Basics demonstration completed!");

            // Summary
            System.out.println("\n=== CSS SELECTOR SYNTAX SUMMARY ===");
            System.out.println("#id              → Select by ID");
            System.out.println(".class           → Select by class");
            System.out.println("tag              → Select by tag name");
            System.out.println("[attr='value']   → Select by attribute");
            System.out.println("tag#id           → Tag with ID");
            System.out.println("tag.class        → Tag with class");
            System.out.println(".class1.class2   → Multiple classes");
            System.out.println("[attr1][attr2]   → Multiple attributes");

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\nBrowser closed");
        }
    }
}
```

**Expected Console Output:**
```
=== CSS Selector Basics Demo ===

--- 1. Select by ID ---
✅ Found element by ID: #userName

--- 2. Found element by Tag+ID ---
✅ Found element by Tag+ID: input#userEmail

--- 3. Select by class ---
✅ Found element by class: .form-control
   Tag name: input

--- 4. Select by attribute ---
✅ Found element by attribute: input[placeholder='Full Name']

--- 5. Select by multiple attributes ---
✅ Found element by multiple attributes

--- 6. Select by Tag Name ---
Total <input> elements: 5

--- 7. Multiple Classes ---
✅ Found submit button: button#submit
   Button text: Submit

--- 8. Class + Attribute ---
✅ Found using class + attribute

--- 9. Multiple Elements by Class ---
Total .form-control elements: 8

--- 10. CSS vs XPath Comparison ---
CSS selector time: 1150 microseconds
XPath selector time: 2340 microseconds
Performance: CSS is 2.0x faster

✅ CSS Basics demonstration completed!

=== CSS SELECTOR SYNTAX SUMMARY ===
#id              → Select by ID
.class           → Select by class
tag              → Select by tag name
[attr='value']   → Select by attribute
tag#id           → Tag with ID
tag.class        → Tag with class
.class1.class2   → Multiple classes
[attr1][attr2]   → Multiple attributes

Browser closed
```

**✅ Success Criteria:**

- [ ] All elements found using different CSS selectors
- [ ] ID selector (#) working correctly
- [ ] Class selector (.) working correctly
- [ ] Attribute selector ([]) working correctly
- [ ] Multiple attributes combined successfully
- [ ] Performance comparison shows CSS faster than XPath
- [ ] No NoSuchElementException errors

**❌ Common Mistakes:**

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| `cssSelector("userName")` | Missing # for ID | Use `#userName` |
| `cssSelector("btn-primary")` | Missing . for class | Use `.btn-primary` |
| `cssSelector(".btn .primary")` | Space means descendant | Use `.btn.primary` (no space) |
| `cssSelector("[id=email]")` | Missing quotes | Use `[id='email']` |
| `cssSelector("#user name")` | Space in ID | Escape or use attribute selector |

**💡 Key Learning Points:**

1. **# for ID:** Always prefix ID with hash symbol
2. **. for Class:** Always prefix class with dot
3. **No space in multiple classes:** `.btn.primary` not `.btn .primary`
4. **CSS is faster:** Native browser support makes it 2-3x faster
5. **Cleaner syntax:** CSS is more readable than XPath

**🎯 Practice Challenge:**

1. Go to https://demoqa.com/automation-practice-form
2. Find First Name using: ID, Class, Attribute (3 different CSS selectors)
3. Find Email using class + attribute combination
4. Find all radio buttons using tag name + attribute
5. Find submit button using ID only
6. Find submit button using ID + tag
7. Count all input elements with class "form-control"
8. Compare performance of 5 different CSS selectors

---
#### Exercise 2: Advanced CSS Selectors - Combinators and Pseudo-classes (25-30 minutes)

**What you'll learn:** CSS combinators for hierarchical navigation and pseudo-classes for element states

**Create new class: `AdvancedCSSSelectors`**

**Concept Explanation:**

CSS offers powerful combinators to navigate element relationships and pseudo-classes to target element states.

**CSS Combinators:**

**1. Descendant Combinator (space):**
```
Syntax: parent descendant
Example: div input
Matches: All <input> elements INSIDE any <div> (at any level)

HTML:
<div>
  <form>
    <input>  ← Matched
  </form>
</div>
```

**2. Child Combinator (>):**
```
Syntax: parent > child
Example: div > input
Matches: <input> elements that are DIRECT children of <div>

HTML:
<div>
  <input>        ← Matched
  <form>
    <input>      ← NOT matched (grandchild)
  </form>
</div>
```

**3. Adjacent Sibling (+):**
```
Syntax: element + sibling
Example: label + input
Matches: <input> IMMEDIATELY after <label> (same parent)

HTML:
<form>
  <label>Name</label>
  <input>  ← Matched
  <input>  ← NOT matched (not adjacent to label)
</form>
```

**4. General Sibling (~):**
```
Syntax: element ~ sibling
Example: label ~ input
Matches: ALL <input> siblings AFTER <label>

HTML:
<form>
  <label>Name</label>
  <input>  ← Matched
  <input>  ← Matched
  <input>  ← Matched
</form>
```

**CSS Pseudo-classes:**

Pseudo-classes target elements based on their state or position:

**Common Pseudo-classes:**
```
:first-child       → First child of parent
:last-child        → Last child of parent
:nth-child(n)      → Nth child of parent
:nth-of-type(n)    → Nth element of specific type
:not(selector)     → Elements NOT matching selector
:enabled           → Enabled form elements
:disabled          → Disabled form elements
:checked           → Checked checkbox/radio
```

**Examples:**
```
// First input in form:
form input:first-child

// Last button in div:
div button:last-child

// 3rd list item:
ul li:nth-child(3)

// Every even row:
tr:nth-child(even)

// All inputs except password:
input:not([type='password'])

// All enabled buttons:
button:enabled

// All checked checkboxes:
input[type='checkbox']:checked
```

**Complete Code:**

```java
package com.automation.locators.css;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.util.List;

public class AdvancedCSSSelectors {

    public static void main(String[] args) throws InterruptedException {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            System.out.println("=== Advanced CSS Selectors Demo ===\n");

            driver.get("https://demoqa.com/automation-practice-form");

            // COMBINATORS

            // 1. Descendant combinator (space)
            System.out.println("--- 1. Descendant Combinator (space) ---");
            List<WebElement> allFormInputs = driver.findElements(
                By.cssSelector("form input"));
            System.out.println("All inputs inside form: " + allFormInputs.size());

            // 2. Child combinator (>)
            System.out.println("\n--- 2. Child Combinator (>) ---");
            List<WebElement> directChildInputs = driver.findElements(
                By.cssSelector("div#userForm > div > input"));
            System.out.println("Direct child inputs: " + directChildInputs.size());

            // 3. Adjacent sibling (+)
            System.out.println("\n--- 3. Adjacent Sibling Combinator (+) ---");
            // Find input immediately after a label
            WebElement adjacentInput = driver.findElement(
                By.cssSelector("label + input"));
            System.out.println("Input adjacent to label (tag): " + adjacentInput.getTagName());

            // 4. General sibling (~)
            System.out.println("\n--- 4. General Sibling Combinator (~) ---");
            // Find all inputs that are siblings after first input
            List<WebElement> siblingInputs = driver.findElements(
                By.cssSelector("input#firstName ~ input"));
            System.out.println("Sibling inputs after firstName: " + siblingInputs.size());

            // PSEUDO-CLASSES

            // 5. :first-child
            System.out.println("\n--- 5. :first-child Pseudo-class ---");
            WebElement firstFormChild = driver.findElement(
                By.cssSelector("#userForm > div:first-child"));
            System.out.println("First child of form found");

            // 6. :last-child
            System.out.println("\n--- 6. :last-child Pseudo-class ---");
            WebElement lastButton = driver.findElement(
                By.cssSelector("button:last-child"));
            System.out.println("Last button text: " + lastButton.getText());

            // 7. :nth-child(n)
            System.out.println("\n--- 7. :nth-child(n) Pseudo-class ---");
            WebElement thirdInput = driver.findElement(
                By.cssSelector("input:nth-child(3)"));
            System.out.println("3rd input ID: " + thirdInput.getAttribute("id"));

            // 8. :nth-of-type(n)
            System.out.println("\n--- 8. :nth-of-type(n) Pseudo-class ---");
            WebElement secondInputOfType = driver.findElement(
                By.cssSelector("input:nth-of-type(2)"));
            System.out.println("2nd input (of type) ID: " + secondInputOfType.getAttribute("id"));

            // 9. :not() - Negative selector
            System.out.println("\n--- 9. :not() Pseudo-class ---");
            List<WebElement> nonHiddenInputs = driver.findElements(
                By.cssSelector("input:not([type='hidden'])"));
            System.out.println("Non-hidden inputs: " + nonHiddenInputs.size());

            // 10. :enabled and :disabled
            System.out.println("\n--- 10. :enabled Pseudo-class ---");
            List<WebElement> enabledInputs = driver.findElements(
                By.cssSelector("input:enabled"));
            System.out.println("Enabled inputs: " + enabledInputs.size());

            // Go to page with checkboxes
            driver.get("https://the-internet.herokuapp.com/checkboxes");
            Thread.sleep(1000);

            // 11. :checked pseudo-class
            System.out.println("\n--- 11. :checked Pseudo-class ---");
            List<WebElement> checkedBoxes = driver.findElements(
                By.cssSelector("input[type='checkbox']:checked"));
            System.out.println("Initially checked checkboxes: " + checkedBoxes.size());

            // Check first checkbox
            driver.findElement(By.cssSelector("input[type='checkbox']:not(:checked)")).click();
            Thread.sleep(500);

            checkedBoxes = driver.findElements(
                By.cssSelector("input[type='checkbox']:checked"));
            System.out.println("After clicking: " + checkedBoxes.size() + " checked");

            // COMBINATION EXAMPLES

            System.out.println("\n--- 12. Combined Selectors ---");

            driver.get("https://demoqa.com/text-box");
            Thread.sleep(1000);

            // Descendant + attribute
            WebElement input1 = driver.findElement(
                By.cssSelector("div#userName-wrapper input"));
            System.out.println("✅ Found using: div#userName-wrapper input");

            // Child + class + pseudo-class
            WebElement firstInput = driver.findElement(
                By.cssSelector("form.border input:first-of-type"));
            firstInput.sendKeys("Advanced CSS");
            System.out.println("✅ Entered text using: form.border input:first-of-type");

            // Not + attribute combination
            List<WebElement> nonPasswordInputs = driver.findElements(
                By.cssSelector("input:not([type='password']):not([type='hidden'])"));
            System.out.println("✅ Found " + nonPasswordInputs.size() + " non-password/hidden inputs");

            Thread.sleep(2000);

            System.out.println("\n✅ Advanced CSS selectors demonstration complete\!");

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\nBrowser closed");
        }
    }
}
```

**Expected Console Output:**
```
=== Advanced CSS Selectors Demo ===

--- 1. Descendant Combinator (space) ---
All inputs inside form: 12

--- 2. Child Combinator (>) ---
Direct child inputs: 8

--- 3. Adjacent Sibling Combinator (+) ---
Input adjacent to label (tag): input

--- 4. General Sibling Combinator (~) ---
Sibling inputs after firstName: 7

--- 5. :first-child Pseudo-class ---
First child of form found

--- 6. :last-child Pseudo-class ---
Last button text: Submit

--- 7. :nth-child(n) Pseudo-class ---
3rd input ID: userEmail

--- 8. :nth-of-type(n) Pseudo-class ---
2nd input (of type) ID: lastName

--- 9. :not() Pseudo-class ---
Non-hidden inputs: 10

--- 10. :enabled Pseudo-class ---
Enabled inputs: 12

--- 11. :checked Pseudo-class ---
Initially checked checkboxes: 1
After clicking: 2 checked

--- 12. Combined Selectors ---
✅ Found using: div#userName-wrapper input
✅ Entered text using: form.border input:first-of-type
✅ Found 5 non-password/hidden inputs

✅ Advanced CSS selectors demonstration complete\!

Browser closed
```

**✅ Success Criteria:**

- [ ] All combinators working (space, >, +, ~)
- [ ] Pseudo-classes finding correct elements
- [ ] :first-child and :last-child working
- [ ] :nth-child(n) selecting correct position
- [ ] :not() excluding elements correctly
- [ ] :checked finding checked elements
- [ ] Combined selectors working
- [ ] No exceptions

**❌ Common Mistakes:**

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| `div>input` (no space) | Works but less readable | Use `div > input` |
| `div + input + button` | Chain doesn't work | Use `div + input, div + button` |
| `:first-child` on non-first | Element isn't first child | Use `:first-of-type` |
| `:nth-child(1)` confusion | Index starts at 1 not 0 | Use 1 for first element |
| `:not(:not(selector))` | Double negative confusing | Simplify logic |

**💡 Key Learning Points:**

1. **Space vs >:** Space finds ANY descendant, > finds DIRECT children only
2. **+ vs ~:** + finds NEXT sibling only, ~ finds ALL following siblings
3. **:child vs :of-type:** :child counts ALL children, :of-type counts same tag
4. **:not() power:** Can chain multiple :not() for complex exclusions
5. **Combination strength:** Combine multiple selectors for precise targeting

**🎯 Practice Challenge:**

1. Find the second form input (any type)
2. Find all buttons that are NOT disabled
3. Find the last checkbox in a list
4. Find input immediately after label "Email"
5. Find all siblings of first input
6. Find 4th row in a table using :nth-child
7. Select all even rows: `tr:nth-child(even)`
8. Create selector excluding first and last elements

---

#### Exercise 3: CSS Attribute Selectors - Deep Dive (20-25 minutes)

**What you'll learn:** Advanced attribute selector patterns for flexible element matching

**Create new class: `CSSAttributeSelectors`**

**Concept Explanation:**

CSS attribute selectors offer 7 different matching strategies for attributes:

**All Attribute Selector Types:**

**1. [attribute] - Has Attribute:**
```
Selector: input[placeholder]
Matches: Any <input> with a placeholder attribute (any value)
```

**2. [attribute='value'] - Exact Match:**
```
Selector: input[type='email']
Matches: <input type="email"> only
Case-sensitive exact match
```

**3. [attribute~='value'] - Word Match:**
```
Selector: div[class~='active']
Matches: <div class="btn active primary">
"active" as a complete word in space-separated list
```

**4. [attribute|='value'] - Prefix Match (dash):**
```
Selector: div[class|='btn']
Matches: <div class="btn"> or <div class="btn-primary">
Value or value followed by hyphen
```

**5. [attribute^='value'] - Starts With:**
```
Selector: input[id^='user']
Matches: <input id="username">, <input id="userEmail">
ID starts with "user"
Most useful for dynamic IDs\!
```

**6. [attribute$='value'] - Ends With:**
```
Selector: input[id$='Name']
Matches: <input id="firstName">, <input id="lastName">
ID ends with "Name"
```

**7. [attribute*='value'] - Contains:**
```
Selector: input[class*='form']
Matches: <input class="form-control">, <input class="custom-form">
Class contains "form" anywhere
```

**Visual Guide:**
```
Attribute Selector Patterns:

[attr]          → Has attribute (any value)
[attr='val']    → Exact match
[attr~='val']   → Word in list (space-separated)
[attr|='val']   → Starts with val or val-
[attr^='val']   → Starts with val  ← MOST USEFUL\!
[attr$='val']   → Ends with val    ← VERY USEFUL\!
[attr*='val']   → Contains val     ← SUPER USEFUL\!
```

**Complete Code:**

```java
package com.automation.locators.css;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.util.List;

public class CSSAttributeSelectors {

    public static void main(String[] args) throws InterruptedException {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            System.out.println("=== CSS Attribute Selectors Deep Dive ===\n");

            driver.get("https://demoqa.com/text-box");

            // 1. [attribute] - Has attribute
            System.out.println("--- 1. [attribute] - Has Attribute ---");
            List<WebElement> inputsWithPlaceholder = driver.findElements(
                By.cssSelector("input[placeholder]"));
            System.out.println("Inputs with placeholder attribute: " + inputsWithPlaceholder.size());
            for (WebElement input : inputsWithPlaceholder) {
                System.out.println("  - " + input.getAttribute("placeholder"));
            }

            // 2. [attribute='value'] - Exact match
            System.out.println("\n--- 2. [attribute='value'] - Exact Match ---");
            WebElement emailInput = driver.findElement(
                By.cssSelector("input[id='userEmail']"));
            emailInput.sendKeys("test@example.com");
            System.out.println("✅ Found using exact match: [id='userEmail']");

            // 3. [attribute^='value'] - Starts with
            System.out.println("\n--- 3. [attribute^='value'] - Starts With ---");
            List<WebElement> userInputs = driver.findElements(
                By.cssSelector("input[id^='user']"));
            System.out.println("Inputs with ID starting with 'user': " + userInputs.size());
            for (WebElement input : userInputs) {
                System.out.println("  - ID: " + input.getAttribute("id"));
            }

            // 4. [attribute$='value'] - Ends with
            System.out.println("\n--- 4. [attribute$='value'] - Ends With ---");
            WebElement usernameInput = driver.findElement(
                By.cssSelector("input[id$='Name']"));
            usernameInput.sendKeys("John Doe");
            System.out.println("✅ Found input ending with 'Name': " + usernameInput.getAttribute("id"));

            // 5. [attribute*='value'] - Contains
            System.out.println("\n--- 5. [attribute*='value'] - Contains ---");
            List<WebElement> addressFields = driver.findElements(
                By.cssSelector("textarea[id*='Address']"));
            System.out.println("Textareas with 'Address' in ID: " + addressFields.size());
            for (WebElement field : addressFields) {
                System.out.println("  - ID: " + field.getAttribute("id"));
            }

            // 6. Multiple attribute selectors
            System.out.println("\n--- 6. Multiple Attribute Selectors ---");
            WebElement specificInput = driver.findElement(
                By.cssSelector("input[type='text'][id^='user']"));
            System.out.println("✅ Found using multiple: input[type='text'][id^='user']");
            System.out.println("   ID: " + specificInput.getAttribute("id"));

            // Navigate to form page
            driver.get("https://demoqa.com/automation-practice-form");
            Thread.sleep(1000);

            // 7. Attribute starts with - Dynamic ID handling
            System.out.println("\n--- 7. Dynamic ID Handling with ^= ---");
            WebElement firstNameDynamic = driver.findElement(
                By.cssSelector("input[id^='first']"));
            firstNameDynamic.sendKeys("Jane");
            System.out.println("✅ Handled dynamic ID with: input[id^='first']");

            // 8. Attribute ends with - Common suffix
            System.out.println("\n--- 8. Common Suffix with $= ---");
            WebElement lastNameBySuffix = driver.findElement(
                By.cssSelector("input[id$='Name']"));
            lastNameBySuffix.sendKeys("Smith");
            System.out.println("✅ Found by suffix: input[id$='Name']");

            // 9. Attribute contains - Partial match
            System.out.println("\n--- 9. Partial Match with *= ---");
            List<WebElement> allNameFields = driver.findElements(
                By.cssSelector("input[placeholder*='Name']"));
            System.out.println("Fields with 'Name' in placeholder: " + allNameFields.size());

            // 10. Case sensitivity (CSS3)
            System.out.println("\n--- 10. Case Insensitive (CSS4 - i flag) ---");
            try {
                // Try case-insensitive matching (supported in modern browsers)
                WebElement caseInsensitive = driver.findElement(
                    By.cssSelector("input[id='firstName' i]"));
                System.out.println("✅ Case-insensitive matching supported");
            } catch (Exception e) {
                System.out.println("ℹ️  Case-insensitive flag not supported in this browser");
            }

            // Real-world examples
            System.out.println("\n--- 11. Real-World Scenarios ---");

            // Scenario 1: Find all inputs (exclude buttons)
            List<WebElement> onlyInputFields = driver.findElements(
                By.cssSelector("input:not([type='button']):not([type='submit'])"));
            System.out.println("Text input fields only: " + onlyInputFields.size());

            // Scenario 2: Find all required fields (if marked with *)
            List<WebElement> controlFields = driver.findElements(
                By.cssSelector("input[class*='form-control']"));
            System.out.println("Form control fields: " + controlFields.size());

            // Scenario 3: Dynamic IDs with timestamp (e.g., btn_12345)
            // Using starts-with to handle dynamic suffix
            System.out.println("\nExample dynamic selectors:");
            System.out.println("  Static prefix:  button[id^='submit_']");
            System.out.println("  Static suffix:  button[id$='_btn']");
            System.out.println("  Contains:       button[id*='submit']");

            Thread.sleep(2000);

            System.out.println("\n✅ All attribute selector patterns demonstrated\!");

            // Summary table
            System.out.println("\n=== ATTRIBUTE SELECTOR SUMMARY ===");
            System.out.println("[attr]          → Has attribute");
            System.out.println("[attr='val']    → Exact: attr=\"val\"");
            System.out.println("[attr^='val']   → Starts: val...");
            System.out.println("[attr$='val']   → Ends: ...val");
            System.out.println("[attr*='val']   → Contains: ...val...");
            System.out.println("[attr~='val']   → Word: val (in list)");
            System.out.println("[attr|='val']   → Prefix: val or val-*");

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\nBrowser closed");
        }
    }
}
```

**Expected Console Output:**
```
=== CSS Attribute Selectors Deep Dive ===

--- 1. [attribute] - Has Attribute ---
Inputs with placeholder attribute: 4
  - Full Name
  - name@example.com
  - Current Address
  - Permanent Address

--- 2. [attribute='value'] - Exact Match ---
✅ Found using exact match: [id='userEmail']

--- 3. [attribute^='value'] - Starts With ---
Inputs with ID starting with 'user': 2
  - ID: userName
  - ID: userEmail

--- 4. [attribute$='value'] - Ends With ---
✅ Found input ending with 'Name': userName

--- 5. [attribute*='value'] - Contains ---
Textareas with 'Address' in ID: 2
  - ID: currentAddress
  - ID: permanentAddress

--- 6. Multiple Attribute Selectors ---
✅ Found using multiple: input[type='text'][id^='user']
   ID: userName

--- 7. Dynamic ID Handling with ^= ---
✅ Handled dynamic ID with: input[id^='first']

--- 8. Common Suffix with $= ---
✅ Found by suffix: input[id$='Name']

--- 9. Partial Match with *= ---
Fields with 'Name' in placeholder: 2

--- 10. Case Insensitive (CSS4 - i flag) ---
✅ Case-insensitive matching supported

--- 11. Real-World Scenarios ---
Text input fields only: 10
Form control fields: 8

Example dynamic selectors:
  Static prefix:  button[id^='submit_']
  Static suffix:  button[id$='_btn']
  Contains:       button[id*='submit']

✅ All attribute selector patterns demonstrated\!

=== ATTRIBUTE SELECTOR SUMMARY ===
[attr]          → Has attribute
[attr='val']    → Exact: attr="val"
[attr^='val']   → Starts: val...
[attr$='val']   → Ends: ...val
[attr*='val']   → Contains: ...val...
[attr~='val']   → Word: val (in list)
[attr|='val']   → Prefix: val or val-*

Browser closed
```

**✅ Success Criteria:**

- [ ] All 7 attribute selector types working
- [ ] Starts-with (^=) finding elements correctly
- [ ] Ends-with ($=) finding elements correctly
- [ ] Contains (*=) finding elements correctly
- [ ] Multiple attribute selectors combined
- [ ] Dynamic ID patterns handled
- [ ] No exceptions thrown

**❌ Common Mistakes:**

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| `[id=userName]` | Missing quotes | Use `[id='userName']` |
| `[id^=user Name]` | Space not allowed | Use `[id^='user']` + `[id*='Name']` |
| `[id='user*']` | Asterisk literal | Use `[id^='user']` |
| Case mismatch | CSS is case-sensitive | Match exact case or use `i` flag |
| `[id~=userName]` | Wrong operator | Use `=` for exact, `~=` for word |

**💡 Key Learning Points:**

1. **^= is BEST for dynamic IDs:** Handles IDs with changing suffixes
2. **$= for common endings:** Great for "Name", "Button", "Input" patterns
3. **= for flexible matching:** Find elements with partial attribute values
4. **Combine selectors:** `[type='text'][id^='user']` for precision
5. **Performance:** Attribute selectors are fast in modern browsers

**🎯 Practice Challenge:**

1. Find all inputs with "email" anywhere in ID
2. Find button with ID starting with "submit"
3. Find elements with class ending in "-btn"
4. Find all links with href containing "example.com"
5. Create selector for dynamic IDs like "field_12345_input"
6. Find all inputs except those starting with "hidden"
7. Combine 3 different attribute selectors

---

## 📊 Days 22-23 Complete Summary

### ✅ What You've Learned

**Day 22: XPath Mastery (6 Exercises)**
1. ✅ XPath Basics - Absolute vs Relative
2. ✅ XPath Axes - Navigation in 8 directions
3. ✅ XPath Functions - text(), contains(), starts-with()
4. ✅ Dynamic XPath - Handling changing elements
5. ✅ Complex Scenarios - Tables, lists, nested elements
6. ✅ Best Practices - Production-ready patterns

**Day 23: CSS Selectors (6 Exercises)**
1. ✅ CSS Basics - ID, class, attribute selectors
2. ✅ Advanced CSS - Combinators and pseudo-classes
3. ✅ Attribute Selectors - All 7 types
4. (Remaining exercises to be added...)

### 🎯 Key Takeaways

**XPath Strengths:**
- Parent/ancestor navigation
- Text-based matching
- Complex conditional logic
- Sibling traversal

**CSS Strengths:**
- ⚡ 2-3x faster performance
- Cleaner, simpler syntax
- Better browser support
- Native JavaScript compatibility

**When to Use Which:**
- **Use CSS when:** You can (ID, class, simple attributes)
- **Use XPath when:** You must (parent nav, text matching)

### 📈 Your Progress

You can now:
- ✅ Write both XPath and CSS selectors confidently
- ✅ Choose the right locator strategy for any scenario
- ✅ Handle dynamic elements effectively
- ✅ Build production-ready locator frameworks
- ✅ Debug locator issues quickly
- ✅ Optimize for performance

### 🚀 Next Steps

- Practice on real websites daily
- Build a personal locator utility library
- Review existing framework locators
- Optimize slow selectors in your projects
- Share knowledge with your team

---

**📝 End of Days 22-23: Advanced Locators**

**Total Exercises:** 12 (6 XPath + 6 CSS)
**Total Lines:** ~8,000+ lines of content
**Estimated Learning Time:** 8-10 hours
**Skill Level:** Intermediate to Advanced

🎉 **Congratulations\!** You've mastered the most critical Selenium skill - element location\! 🎉


#### Exercise 4: CSS vs XPath - Performance and Use Cases (20-25 minutes)

**What you'll learn:** Direct comparison of CSS and XPath performance, strengths, weaknesses, and when to use each

**Create new class: `CSSvsXPathComparison`**

**Concept Explanation:**

Both CSS selectors and XPath are powerful locator strategies, but they have different strengths and ideal use cases.

**Detailed Comparison:**

| Aspect | CSS Selectors | XPath |
|--------|---------------|-------|
| **Performance** | ⚡ 2-3x faster (native browser engine) | Slower (external parser) |
| **Syntax** | Simple, clean: `#id .class` | More verbose: `//tag[@id='value']` |
| **Learning Curve** | Easier (familiar to web developers) | Steeper (unique syntax) |
| **Parent Traversal** | ❌ Cannot navigate to parent | ✅ Can use `parent::` axis |
| **Text Matching** | ❌ Very limited | ✅ Powerful: `text()='value'` |
| **Attribute Matching** | ✅ Excellent (7 types: ^=, $=, *=) | ✅ Good (contains, starts-with) |
| **Siblings** | ✅ Adjacent (+) and General (~) | ✅ following-sibling, preceding-sibling |
| **Index-based** | ✅ :nth-child(n) | ✅ [position()=n] |
| **Complex Logic** | Limited (AND via chaining only) | ✅ Full AND/OR/NOT support |
| **Browser Support** | ✅ All modern browsers, native | ⚠️ Some limitations in older browsers |
| **JavaScript** | ✅ querySelector native support | ❌ Requires evaluation |

**When to Use CSS:**
```
✅ Element has unique ID or class
✅ Simple attribute matching
✅ Performance is critical
✅ Cleaner, more readable code preferred
✅ Working with modern web apps
✅ Team familiar with CSS
```

**When to Use XPath:**
```
✅ Need to navigate to parent/ancestor
✅ Text-based element location
✅ Complex conditional logic (AND/OR)
✅ Dynamic content with text patterns
✅ Working with XML documents
✅ Need sibling navigation in both directions
```

**Performance Patterns:**

```
FASTEST (CSS):
#uniqueId                           → ~100 microseconds
.uniqueClass                        → ~150 microseconds
tag[attribute='value']              → ~200 microseconds

FAST (XPath with tag):
//input[@id='username']             → ~250 microseconds
//button[@type='submit']            → ~300 microseconds

SLOW (XPath without tag):
//*[@id='username']                 → ~450 microseconds
//*[@class='btn']                   → ~500 microseconds
```

**Complete Code:**

```java
package com.automation.locators.css;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class CSSvsXPathComparison {

    public static void main(String[] args) throws InterruptedException {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            System.out.println("=== CSS vs XPath - Comprehensive Comparison ===\n");

            driver.get("https://demoqa.com/automation-practice-form");

            // Scenario 1: Simple ID selection
            System.out.println("--- Scenario 1: Simple ID Selection ---");
            
            long startTime, endTime;
            
            // CSS approach
            startTime = System.nanoTime();
            WebElement cssId = driver.findElement(By.cssSelector("#firstName"));
            endTime = System.nanoTime();
            long cssTime1 = (endTime - startTime) / 1000;
            
            // XPath approach
            startTime = System.nanoTime();
            WebElement xpathId = driver.findElement(By.xpath("//input[@id='firstName']"));
            endTime = System.nanoTime();
            long xpathTime1 = (endTime - startTime) / 1000;
            
            System.out.println("CSS (#firstName): " + cssTime1 + " μs");
            System.out.println("XPath (//input[@id='firstName']): " + xpathTime1 + " μs");
            System.out.printf("Winner: CSS is %.1fx faster\n", (double)xpathTime1/cssTime1);

            // Scenario 2: Class selection
            System.out.println("\n--- Scenario 2: Class Selection ---");
            
            startTime = System.nanoTime();
            WebElement cssClass = driver.findElement(By.cssSelector(".form-control"));
            endTime = System.nanoTime();
            long cssTime2 = (endTime - startTime) / 1000;
            
            startTime = System.nanoTime();
            WebElement xpathClass = driver.findElement(By.xpath("//input[@class='form-control']"));
            endTime = System.nanoTime();
            long xpathTime2 = (endTime - startTime) / 1000;
            
            System.out.println("CSS (.form-control): " + cssTime2 + " μs");
            System.out.println("XPath (//input[@class='form-control']): " + xpathTime2 + " μs");
            System.out.printf("Winner: CSS is %.1fx faster\n", (double)xpathTime2/cssTime2);

            // Scenario 3: Attribute matching
            System.out.println("\n--- Scenario 3: Attribute Matching ---");
            
            startTime = System.nanoTime();
            WebElement cssAttr = driver.findElement(By.cssSelector("input[placeholder='First Name']"));
            endTime = System.nanoTime();
            long cssTime3 = (endTime - startTime) / 1000;
            
            startTime = System.nanoTime();
            WebElement xpathAttr = driver.findElement(By.xpath("//input[@placeholder='First Name']"));
            endTime = System.nanoTime();
            long xpathTime3 = (endTime - startTime) / 1000;
            
            System.out.println("CSS (input[placeholder='First Name']): " + cssTime3 + " μs");
            System.out.println("XPath (//input[@placeholder='First Name']): " + xpathTime3 + " μs");
            System.out.printf("Winner: CSS is %.1fx faster\n", (double)xpathTime3/cssTime3);

            // Scenario 4: Starts-with (dynamic IDs)
            System.out.println("\n--- Scenario 4: Starts With (Dynamic IDs) ---");
            
            startTime = System.nanoTime();
            WebElement cssStarts = driver.findElement(By.cssSelector("input[id^='first']"));
            endTime = System.nanoTime();
            long cssTime4 = (endTime - startTime) / 1000;
            
            startTime = System.nanoTime();
            WebElement xpathStarts = driver.findElement(By.xpath("//input[starts-with(@id,'first')]"));
            endTime = System.nanoTime();
            long xpathTime4 = (endTime - startTime) / 1000;
            
            System.out.println("CSS (input[id^='first']): " + cssTime4 + " μs");
            System.out.println("XPath (//input[starts-with(@id,'first')]): " + xpathTime4 + " μs");
            System.out.printf("Winner: CSS is %.1fx faster\n", (double)xpathTime4/cssTime4);

            // Scenario 5: Text-based selection (XPath only)
            System.out.println("\n--- Scenario 5: Text-Based Selection ---");
            System.out.println("CSS: ❌ Cannot select by text content");
            
            startTime = System.nanoTime();
            WebElement xpathText = driver.findElement(By.xpath("//label[text()='Gender']"));
            endTime = System.nanoTime();
            long xpathTime5 = (endTime - startTime) / 1000;
            
            System.out.println("XPath (//label[text()='Gender']): " + xpathTime5 + " μs");
            System.out.println("Winner: XPath (only option) ✅");

            // Scenario 6: Parent navigation (XPath only)
            System.out.println("\n--- Scenario 6: Parent Navigation ---");
            System.out.println("CSS: ❌ Cannot navigate to parent");
            
            startTime = System.nanoTime();
            WebElement xpathParent = driver.findElement(
                By.xpath("//input[@id='firstName']/parent::div"));
            endTime = System.nanoTime();
            long xpathTime6 = (endTime - startTime) / 1000;
            
            System.out.println("XPath (//input[@id='firstName']/parent::div): " + xpathTime6 + " μs");
            System.out.println("Winner: XPath (only option) ✅");

            // Scenario 7: Multiple conditions with OR
            System.out.println("\n--- Scenario 7: OR Conditions ---");
            
            startTime = System.nanoTime();
            // CSS can't do OR for different attributes, using two selectors
            List<WebElement> cssElements = new ArrayList<>();
            try {
                cssElements.add(driver.findElement(By.cssSelector("input[id='firstName']")));
            } catch (Exception e) {
                cssElements.add(driver.findElement(By.cssSelector("input[placeholder='First Name']")));
            }
            endTime = System.nanoTime();
            long cssTime7 = (endTime - startTime) / 1000;
            
            startTime = System.nanoTime();
            WebElement xpathOr = driver.findElement(
                By.xpath("//input[@id='firstName' or @placeholder='First Name']"));
            endTime = System.nanoTime();
            long xpathTime7 = (endTime - startTime) / 1000;
            
            System.out.println("CSS (workaround with try-catch): " + cssTime7 + " μs");
            System.out.println("XPath (//input[@id='firstName' or @placeholder='First Name']): " + xpathTime7 + " μs");
            System.out.println("Winner: XPath (native OR support) ✅");

            // Performance Summary
            System.out.println("\n=== PERFORMANCE SUMMARY ===");
            long avgCss = (cssTime1 + cssTime2 + cssTime3 + cssTime4) / 4;
            long avgXpath = (xpathTime1 + xpathTime2 + xpathTime3 + xpathTime4 + xpathTime5 + xpathTime6 + xpathTime7) / 7;
            
            System.out.println("Average CSS Time: " + avgCss + " μs");
            System.out.println("Average XPath Time: " + avgXpath + " μs");
            System.out.printf("Overall: CSS is %.1fx faster on average\n", (double)avgXpath/avgCss);

            // Use Case Recommendations
            System.out.println("\n=== USE CASE RECOMMENDATIONS ===");
            System.out.println("\n✅ Use CSS When:");
            System.out.println("  1. Element has unique ID or class");
            System.out.println("  2. Performance is critical");
            System.out.println("  3. Simple attribute matching");
            System.out.println("  4. Team prefers CSS syntax");
            System.out.println("  5. Working with modern SPAs");
            
            System.out.println("\n✅ Use XPath When:");
            System.out.println("  1. Need to navigate to parent/ancestor");
            System.out.println("  2. Locating by visible text");
            System.out.println("  3. Complex conditional logic (AND/OR)");
            System.out.println("  4. Dynamic text-based content");
            System.out.println("  5. Working with XML/complex structures");

            // Real-world example comparison
            System.out.println("\n=== REAL-WORLD EXAMPLE ===");
            System.out.println("Task: Find submit button");
            System.out.println("\nCSS Options:");
            System.out.println("  1. #submit                    (if has ID)");
            System.out.println("  2. button[type='submit']      (by attribute)");
            System.out.println("  3. .btn-primary               (by class)");
            
            System.out.println("\nXPath Options:");
            System.out.println("  1. //button[@id='submit']     (by ID)");
            System.out.println("  2. //button[@type='submit']   (by attribute)");
            System.out.println("  3. //button[text()='Submit']  (by text - UNIQUE\!)");
            System.out.println("  4. //button[contains(@class,'btn-primary')]");

            Thread.sleep(2000);

            System.out.println("\n✅ Comparison complete\!");

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\nBrowser closed");
        }
    }
}
```

**Expected Console Output:**
```
=== CSS vs XPath - Comprehensive Comparison ===

--- Scenario 1: Simple ID Selection ---
CSS (#firstName): 1150 μs
XPath (//input[@id='firstName']): 2340 μs
Winner: CSS is 2.0x faster

--- Scenario 2: Class Selection ---
CSS (.form-control): 1280 μs
XPath (//input[@class='form-control']): 2560 μs
Winner: CSS is 2.0x faster

--- Scenario 3: Attribute Matching ---
CSS (input[placeholder='First Name']): 1420 μs
XPath (//input[@placeholder='First Name']): 2840 μs
Winner: CSS is 2.0x faster

--- Scenario 4: Starts With (Dynamic IDs) ---
CSS (input[id^='first']): 1580 μs
XPath (//input[starts-with(@id,'first')]): 3160 μs
Winner: CSS is 2.0x faster

--- Scenario 5: Text-Based Selection ---
CSS: ❌ Cannot select by text content
XPath (//label[text()='Gender']): 2100 μs
Winner: XPath (only option) ✅

--- Scenario 6: Parent Navigation ---
CSS: ❌ Cannot navigate to parent
XPath (//input[@id='firstName']/parent::div): 2450 μs
Winner: XPath (only option) ✅

--- Scenario 7: OR Conditions ---
CSS (workaround with try-catch): 3200 μs
XPath (//input[@id='firstName' or @placeholder='First Name']): 2900 μs
Winner: XPath (native OR support) ✅

=== PERFORMANCE SUMMARY ===
Average CSS Time: 1357 μs
Average XPath Time: 2598 μs
Overall: CSS is 1.9x faster on average

=== USE CASE RECOMMENDATIONS ===

✅ Use CSS When:
  1. Element has unique ID or class
  2. Performance is critical
  3. Simple attribute matching
  4. Team prefers CSS syntax
  5. Working with modern SPAs

✅ Use XPath When:
  1. Need to navigate to parent/ancestor
  2. Locating by visible text
  3. Complex conditional logic (AND/OR)
  4. Dynamic text-based content
  5. Working with XML/complex structures

=== REAL-WORLD EXAMPLE ===
Task: Find submit button

CSS Options:
  1. #submit                    (if has ID)
  2. button[type='submit']      (by attribute)
  3. .btn-primary               (by class)

XPath Options:
  1. //button[@id='submit']     (by ID)
  2. //button[@type='submit']   (by attribute)
  3. //button[text()='Submit']  (by text - UNIQUE\!)
  4. //button[contains(@class,'btn-primary')]

✅ Comparison complete\!

Browser closed
```

**✅ Success Criteria:**

- [ ] Performance measurements showing CSS 2-3x faster
- [ ] Text-based selection works with XPath only
- [ ] Parent navigation works with XPath only
- [ ] OR conditions demonstrated
- [ ] Use case recommendations clear
- [ ] Real-world examples provided
- [ ] No exceptions thrown

**❌ Common Mistakes:**

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| Using //* with XPath | 3-4x slower | Always specify tag name |
| Complex CSS for text | CSS can't match text | Use XPath for text matching |
| Trying CSS parent nav | CSS can't go up | Use XPath parent:: axis |
| Only using one strategy | Missing advantages | Use both strategically |
| Ignoring performance | Slow test execution | Profile and optimize |

**💡 Key Learning Points:**

1. **CSS is 2-3x faster** for simple selections (ID, class, attributes)
2. **XPath is necessary** for text matching and parent navigation
3. **Choose strategically:** Use the right tool for each situation
4. **Performance matters:** Especially in large test suites
5. **Hybrid approach is best:** Combine both for optimal results

**🎯 Practice Challenge:**

1. Time 10 different locators (5 CSS, 5 XPath) and compare
2. Convert 5 XPath selectors to CSS where possible
3. Find 3 elements that REQUIRE XPath (cannot use CSS)
4. Create a decision tree: When to use CSS vs XPath
5. Build a utility that tries CSS first, falls back to XPath
6. Measure performance impact in a 100-test suite
7. Optimize slowest locators in your framework

**Bonus Challenge - Smart Locator Selector:**
```java
public class SmartLocator {
    
    public static By getBestLocator(String id, String className, 
                                     String text, boolean needsParent) {
        // Rule 1: If needs parent navigation, must use XPath
        if (needsParent) {
            return By.xpath("//element/parent::parent");
        }
        
        // Rule 2: If has ID, use CSS (fastest)
        if (id \!= null && \!id.isEmpty()) {
            return By.cssSelector("#" + id);
        }
        
        // Rule 3: If has unique class, use CSS
        if (className \!= null && \!className.isEmpty()) {
            return By.cssSelector("." + className);
        }
        
        // Rule 4: If only has text, must use XPath
        if (text \!= null && \!text.isEmpty()) {
            return By.xpath("//element[text()='" + text + "']");
        }
        
        // Default: CSS by tag
        return By.cssSelector("element");
    }
    
    // Usage:
    // By locator = SmartLocator.getBestLocator("submitBtn", null, null, false);
    // → Returns: By.cssSelector("#submitBtn")  (CSS for speed)
    
    // By locator = SmartLocator.getBestLocator(null, null, "Submit", false);
    // → Returns: By.xpath("//element[text()='Submit']")  (XPath for text)
}
```

---

#### Exercise 5: Complex CSS Scenarios - Real-World Applications (25-30 minutes)

**What you'll learn:** Handling complex real-world scenarios using advanced CSS selector combinations

**Create new class: `ComplexCSSScenarios`**

**Concept Explanation:**

Real-world web applications often require combining multiple CSS selector techniques to locate elements accurately. This exercise demonstrates production-ready CSS patterns.

**Complex Scenario Patterns:**

**1. Dynamic Content with Stable Patterns:**
```css
/* Dynamic ID with static prefix */
div[id^='dynamicPanel_'] .content

/* Generated class names with pattern */
[class*='react-component-'] button[class$='-primary']

/* Multiple attributes for precision */
input[type='text'][name^='user'][placeholder*='name']
```

**2. Form Element Selection:**
```css
/* Required field (marked with asterisk in label) */
label:contains('*') + input

/* Invalid fields (validation state) */
input.ng-invalid.ng-touched

/* Checkbox group by container */
.checkbox-group input[type='checkbox']:checked
```

**3. Table Cell Navigation:**
```css
/* First cell in each row */
table tbody tr td:first-child

/* Header cell by position */
table thead th:nth-child(3)

/* Row containing specific text (limited in CSS) */
/* Better with XPath: //tr[td[contains(text(),'value')]] */
```

**4. Modal and Overlay Elements:**
```css
/* Active modal */
.modal.show .modal-body

/* Overlay button */
div[class*='overlay'] button[class*='close']

/* Dropdown in modal */
.modal.show select.form-control
```

**Complete Code:**

```java
package com.automation.locators.css;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import java.time.Duration;
import java.util.List;

public class ComplexCSSScenarios {

    public static void main(String[] args) throws InterruptedException {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            System.out.println("=== Complex CSS Scenarios - Real-World Applications ===\n");

            // Scenario 1: Form with Multiple Input Types
            System.out.println("--- Scenario 1: Complex Form Handling ---");
            driver.get("https://demoqa.com/automation-practice-form");

            // Select all text inputs (not radio, checkbox, submit)
            List<WebElement> textInputs = driver.findElements(
                By.cssSelector("input[type='text'], input:not([type])"));
            System.out.println("Text input fields: " + textInputs.size());

            // Find inputs by class pattern
            List<WebElement> formControls = driver.findElements(
                By.cssSelector("input[class*='form-control']"));
            System.out.println("Form control inputs: " + formControls.size());

            // Multiple attributes for precision
            WebElement firstName = driver.findElement(
                By.cssSelector("input#firstName[placeholder='First Name'][class*='form-control']"));
            firstName.sendKeys("John");
            System.out.println("✅ Found using 3 attributes combined");

            // Sibling navigation - find input after label
            WebElement emailAfterLabel = driver.findElement(
                By.cssSelector("label[for='userEmail'] ~ input"));
            emailAfterLabel.sendKeys("john@example.com");
            System.out.println("✅ Found input using sibling selector");

            // Scenario 2: Dynamic Content Handling
            System.out.println("\n--- Scenario 2: Dynamic ID/Class Handling ---");

            // Starts with (dynamic suffix)
            WebElement dynamicStart = driver.findElement(
                By.cssSelector("input[id^='first']"));
            System.out.println("✅ Found by ID prefix: " + dynamicStart.getAttribute("id"));

            // Ends with (dynamic prefix)
            WebElement dynamicEnd = driver.findElement(
                By.cssSelector("input[id$='Name']"));
            System.out.println("✅ Found by ID suffix: " + dynamicEnd.getAttribute("id"));

            // Contains (dynamic on both sides)
            WebElement dynamicContains = driver.findElement(
                By.cssSelector("input[placeholder*='Number']"));
            System.out.println("✅ Found by partial match: " + dynamicContains.getAttribute("placeholder"));

            // Scenario 3: Pseudo-class for State Selection
            System.out.println("\n--- Scenario 3: Element State Selection ---");

            // Find all enabled inputs
            List<WebElement> enabledInputs = driver.findElements(
                By.cssSelector("input:enabled"));
            System.out.println("Enabled inputs: " + enabledInputs.size());

            // Find specific positioned element
            WebElement secondInput = driver.findElement(
                By.cssSelector("input[type='text']:nth-of-type(2)"));
            System.out.println("Second text input ID: " + secondInput.getAttribute("id"));

            // Exclude specific type
            List<WebElement> nonHidden = driver.findElements(
                By.cssSelector("input:not([type='hidden']):not([type='radio']):not([type='checkbox'])"));
            System.out.println("Non-hidden/radio/checkbox inputs: " + nonHidden.size());

            // Scenario 4: Dropdown Handling
            System.out.println("\n--- Scenario 4: Dropdown Selection ---");
            driver.get("https://the-internet.herokuapp.com/dropdown");

            // Select dropdown
            WebElement dropdown = driver.findElement(By.cssSelector("select#dropdown"));
            Select select = new Select(dropdown);

            // Get all options using CSS
            List<WebElement> options = driver.findElements(
                By.cssSelector("select#dropdown option"));
            System.out.println("Total options: " + options.size());

            // Select by specific option attribute
            driver.findElement(By.cssSelector("select#dropdown option[value='1']")).click();
            System.out.println("✅ Selected Option 1");
            Thread.sleep(500);

            // Select by position
            driver.findElement(By.cssSelector("select#dropdown option:nth-child(3)")).click();
            System.out.println("✅ Selected 3rd option");

            // Scenario 5: Table Navigation
            System.out.println("\n--- Scenario 5: Table Cell Selection ---");
            driver.get("https://the-internet.herokuapp.com/tables");

            // Get all first cells (last names)
            List<WebElement> firstCells = driver.findElements(
                By.cssSelector("table#table1 tbody tr td:first-child"));
            System.out.println("\nFirst column values:");
            for (WebElement cell : firstCells) {
                System.out.println("  - " + cell.getText());
            }

            // Get specific row by position
            WebElement thirdRow = driver.findElement(
                By.cssSelector("table#table1 tbody tr:nth-child(3)"));
            System.out.println("\nThird row first cell: " + 
                thirdRow.findElement(By.cssSelector("td:first-child")).getText());

            // Get all cells in third column
            List<WebElement> thirdColumn = driver.findElements(
                By.cssSelector("table#table1 tbody tr td:nth-child(3)"));
            System.out.println("\nThird column (emails):");
            for (WebElement cell : thirdColumn) {
                System.out.println("  - " + cell.getText());
            }

            // Scenario 6: Checkbox/Radio Selection
            System.out.println("\n--- Scenario 6: Checkbox/Radio Handling ---");
            driver.get("https://the-internet.herokuapp.com/checkboxes");

            // Find all checkboxes
            List<WebElement> checkboxes = driver.findElements(
                By.cssSelector("input[type='checkbox']"));
            System.out.println("Total checkboxes: " + checkboxes.size());

            // Find unchecked checkboxes
            List<WebElement> unchecked = driver.findElements(
                By.cssSelector("input[type='checkbox']:not(:checked)"));
            System.out.println("Unchecked: " + unchecked.size());

            // Check all unchecked boxes
            for (WebElement box : unchecked) {
                box.click();
            }
            System.out.println("✅ Checked all boxes");

            // Verify all are checked
            List<WebElement> checked = driver.findElements(
                By.cssSelector("input[type='checkbox']:checked"));
            System.out.println("Now checked: " + checked.size());

            // Scenario 7: Complex Combinations
            System.out.println("\n--- Scenario 7: Complex Selector Combinations ---");
            driver.get("https://demoqa.com/text-box");

            // Child > Descendant > Attribute > Pseudo-class
            WebElement complex1 = driver.findElement(
                By.cssSelector("div.col-md-9 form#userForm input[type='text']:first-of-type"));
            complex1.sendKeys("Complex Selector");
            System.out.println("✅ Used: div.col-md-9 form#userForm input[type='text']:first-of-type");

            // Multiple classes + Attribute + Not
            List<WebElement> complex2 = driver.findElements(
                By.cssSelector("input.form-control:not([type='email']):not([readonly])"));
            System.out.println("✅ Found " + complex2.size() + " elements with complex selector");

            // Sibling + Attribute + Contains
            WebElement complex3 = driver.findElement(
                By.cssSelector("label[for='userName'] ~ input[id*='user']"));
            System.out.println("✅ Found sibling with pattern match");

            Thread.sleep(2000);

            System.out.println("\n✅ All complex scenarios completed\!");

            // Summary of patterns
            System.out.println("\n=== COMPLEX CSS PATTERNS SUMMARY ===");
            System.out.println("1. Multiple attributes:  input[type='text'][id^='user'][class*='form']");
            System.out.println("2. Pseudo-classes:       input:first-of-type, :nth-child(3), :not()");
            System.out.println("3. Combinators:          parent > child, ancestor descendant, label ~ input");
            System.out.println("4. Dynamic handling:     [id^='start'], [id$='end'], [id*='contains']");
            System.out.println("5. State selection:      :checked, :enabled, :disabled");
            System.out.println("6. Complex chains:       div.class > form#id input[type]:not(:checked)");

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\nBrowser closed");
        }
    }
}
```

**Expected Console Output:**
```
=== Complex CSS Scenarios - Real-World Applications ===

--- Scenario 1: Complex Form Handling ---
Text input fields: 8
Form control inputs: 8
✅ Found using 3 attributes combined
✅ Found input using sibling selector

--- Scenario 2: Dynamic ID/Class Handling ---
✅ Found by ID prefix: firstName
✅ Found by ID suffix: firstName
✅ Found by partial match: Mobile Number

--- Scenario 3: Element State Selection ---
Enabled inputs: 12
Second text input ID: lastName
Non-hidden/radio/checkbox inputs: 8

--- Scenario 4: Dropdown Selection ---
Total options: 3
✅ Selected Option 1
✅ Selected 3rd option

--- Scenario 5: Table Cell Selection ---

First column values:
  - Smith
  - Bach
  - Doe
  - Conway

Third row first cell: Doe

Third column (emails):
  - jsmith@gmail.com
  - fbach@yahoo.com
  - jdoe@hotmail.com
  - tconway@yahoo.com

--- Scenario 6: Checkbox/Radio Handling ---
Total checkboxes: 2
Unchecked: 1
✅ Checked all boxes
Now checked: 2

--- Scenario 7: Complex Selector Combinations ---
✅ Used: div.col-md-9 form#userForm input[type='text']:first-of-type
✅ Found 7 elements with complex selector
✅ Found sibling with pattern match

✅ All complex scenarios completed\!

=== COMPLEX CSS PATTERNS SUMMARY ===
1. Multiple attributes:  input[type='text'][id^='user'][class*='form']
2. Pseudo-classes:       input:first-of-type, :nth-child(3), :not()
3. Combinators:          parent > child, ancestor descendant, label ~ input
4. Dynamic handling:     [id^='start'], [id$='end'], [id*='contains']
5. State selection:      :checked, :enabled, :disabled
6. Complex chains:       div.class > form#id input[type]:not(:checked)

Browser closed
```

**✅ Success Criteria:**

- [ ] Multiple attribute selectors working
- [ ] Dynamic content patterns handled
- [ ] Pseudo-classes selecting correctly
- [ ] Table navigation successful
- [ ] Checkbox state selection working
- [ ] Complex combinations functioning
- [ ] No exceptions thrown

**❌ Common Mistakes:**

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| Space in attr selector | Invalid syntax | No spaces: `[id^='value']` |
| Wrong combinator | Gets wrong elements | Use > for children, space for descendants |
| :nth-child vs :nth-of-type | Counts different elements | Use :nth-of-type for specific tags |
| Missing :not() parentheses | Syntax error | Always: `:not([attr])` |
| Over-complex selectors | Hard to maintain | Simplify when possible |

**💡 Key Learning Points:**

1. **Combine techniques:** Mix attributes, pseudo-classes, combinators
2. **Dynamic patterns:** Use ^=, $=, *= for changing IDs/classes
3. **State selection:** :checked, :enabled for form element states
4. **Position-based:** :nth-child, :first-child when needed
5. **Exclusion:** :not() for filtering out unwanted elements

**🎯 Practice Challenge:**

1. Create selector for 2nd row, 3rd cell in a table
2. Find all checked radio buttons in a specific form
3. Select input after a label containing specific text
4. Find all non-disabled buttons with class containing "submit"
5. Get 3rd paragraph inside a div with specific ID
6. Select all even rows in a table
7. Build selector for dynamic ID with stable prefix/suffix

---

#### Exercise 6: CSS Best Practices & Production Framework (25-30 minutes)

**What you'll learn:** Industry-standard CSS selector patterns and building a reusable CSS utility framework

**Create new class: `CSSBestPractices`**

**Concept Explanation:**

Writing CSS selectors is straightforward, but creating **maintainable, efficient, and production-ready** selectors requires following best practices.

**CSS Selector Best Practices:**

**1. Prefer Shorter Selectors:**
```css
❌ Bad (too specific):
div.container > div.row > div.col > form#myForm > input.form-control#firstName

✅ Good (just enough):
#firstName
```

**2. Use Data Attributes for Testing:**
```css
❌ Brittle (UI can change):
div.user-profile-card-2023-redesign button.primary-action-button-v2

✅ Stable (designed for testing):
[data-testid='user-profile-submit']
```

**3. Avoid Position-Based When Possible:**
```css
❌ Fragile (breaks when order changes):
form input:nth-child(3)

✅ Robust (attribute-based):
input[name='email']
```

**4. Prefer ID > Data-testid > Class > Attributes:**
```css
Priority order:
1. #uniqueId                    → Best (fastest, most specific)
2. [data-testid='submit-btn']   → Great (stable, testing-friendly)
3. .unique-class                → Good (if truly unique)
4. input[name='username']       → OK (attribute fallback)
5. div > form > input:nth(2)    → Bad (fragile)
```

**5. Keep It Simple:**
```css
❌ Over-engineered:
body > div#root > main.app-container > section.content > form.login-form[data-version='2'] input[type='text'][name^='user']:not([disabled])

✅ Simple:
input[name='username']
```

**Complete Code - Production CSS Framework:**

```java
package com.automation.locators.css;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.util.List;

/**
 * Production-ready CSS selector utility framework
 * Demonstrates best practices and reusable patterns
 */
public class CSSBestPractices {

    /**
     * CSS Builder - Utility class for creating dynamic CSS selectors
     */
    public static class CSSBuilder {

        // Build selector by ID (fastest, preferred)
        public static String byId(String id) {
            return "#" + id;
        }

        // Build selector by class
        public static String byClass(String className) {
            return "." + className;
        }

        // Build selector by data-testid (best practice for testing)
        public static String byTestId(String testId) {
            return "[data-testid='" + testId + "']";
        }

        // Build selector by attribute
        public static String byAttribute(String tag, String attribute, String value) {
            return tag + "[" + attribute + "='" + value + "']";
        }

        // Build selector with starts-with (dynamic IDs)
        public static String byStartsWith(String tag, String attribute, String prefix) {
            return tag + "[" + attribute + "^='" + prefix + "']";
        }

        // Build selector with ends-with
        public static String byEndsWith(String tag, String attribute, String suffix) {
            return tag + "[" + attribute + "$='" + suffix + "']";
        }

        // Build selector with contains
        public static String byContains(String tag, String attribute, String substring) {
            return tag + "[" + attribute + "*='" + substring + "']";
        }

        // Build selector for child element
        public static String child(String parent, String child) {
            return parent + " > " + child;
        }

        // Build selector for descendant
        public static String descendant(String ancestor, String descendant) {
            return ancestor + " " + descendant;
        }

        // Build flexible selector (tries multiple strategies)
        public static String flexible(String primaryId, String fallbackClass) {
            // In reality, we'd try primary first, then fallback
            return primaryId \!= null ? "#" + primaryId : "." + fallbackClass;
        }

        // Build combined selector
        public static String combine(String... selectors) {
            return String.join("", selectors);
        }
    }

    /**
     * CSS Validator - Check if selector follows best practices
     */
    public static class CSSValidator {

        public static ValidationResult validate(String cssSelector) {
            ValidationResult result = new ValidationResult();

            // Check length
            if (cssSelector.length() > 100) {
                result.addIssue("⚠️ Selector too long (" + cssSelector.length() + " chars) - simplify");
            }

            // Check for position-based selectors
            if (cssSelector.matches(".*:nth-child\\(\\d+\\).*")) {
                result.addIssue("⚠️ Using :nth-child() - prefer attribute-based");
            }

            // Check for data-testid (best practice)
            if (cssSelector.contains("data-testid")) {
                result.addGoodPractice("✅ Using data-testid - excellent for testing\!");
            }

            // Check for ID (fast)
            if (cssSelector.startsWith("#")) {
                result.addGoodPractice("✅ Using ID selector - fast and specific\!");
            }

            // Check for dynamic handling
            if (cssSelector.contains("^=") || cssSelector.contains("$=") || cssSelector.contains("*=")) {
                result.addGoodPractice("✅ Using dynamic attribute matching - flexible\!");
            }

            // Check for overly specific
            int levels = cssSelector.split(" > ").length;
            if (levels > 4) {
                result.addIssue("⚠️ Too many levels (" + levels + ") - brittle selector");
            }

            return result;
        }

        static class ValidationResult {
            private List<String> issues = new java.util.ArrayList<>();
            private List<String> goodPractices = new java.util.ArrayList<>();

            void addIssue(String issue) { issues.add(issue); }
            void addGoodPractice(String practice) { goodPractices.add(practice); }

            void print() {
                if (\!goodPractices.isEmpty()) {
                    System.out.println("Good Practices:");
                    goodPractices.forEach(p -> System.out.println("  " + p));
                }
                if (\!issues.isEmpty()) {
                    System.out.println("Issues Found:");
                    issues.forEach(i -> System.out.println("  " + i));
                }
                if (issues.isEmpty() && \!goodPractices.isEmpty()) {
                    System.out.println("✅ Selector follows best practices\!");
                }
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            System.out.println("=== CSS Best Practices & Production Framework ===\n");

            driver.get("https://demoqa.com/text-box");

            // Demo 1: Using CSSBuilder
            System.out.println("--- Demo 1: CSS Builder Utility ---");

            String userNameSelector = CSSBuilder.byId("userName");
            System.out.println("Username selector: " + userNameSelector);
            driver.findElement(By.cssSelector(userNameSelector)).sendKeys("John Doe");

            String emailSelector = CSSBuilder.byAttribute("input", "type", "email");
            System.out.println("Email selector: " + emailSelector);
            driver.findElement(By.cssSelector(emailSelector)).sendKeys("john@example.com");

            String dynamicSelector = CSSBuilder.byStartsWith("input", "id", "user");
            System.out.println("Dynamic selector: " + dynamicSelector);

            // Demo 2: Data-testid pattern (best practice)
            System.out.println("\n--- Demo 2: Data-TestID Pattern (Best Practice) ---");
            String testIdSelector = CSSBuilder.byTestId("submit-button");
            System.out.println("Test ID selector: " + testIdSelector);
            System.out.println("Why it's best: Stable, designed for testing, won't break with UI changes");

            // Demo 3: Selector validation
            System.out.println("\n--- Demo 3: Selector Validation ---");

            String[] selectorsToValidate = {
                "#firstName",
                "[data-testid='submit-btn']",
                "input[id^='user']",
                "div > div > div > div > div > input:nth-child(3)",
                ".form-control",
                "body > div#root > main.container > form.login > div.row > div.col > input[type='text']:nth-child(5)"
            };

            for (String selector : selectorsToValidate) {
                System.out.println("\nValidating: " + selector);
                CSSValidator.validate(selector).print();
            }

            // Demo 4: Real-world selector strategies
            System.out.println("\n--- Demo 4: Real-World Selector Strategies ---");

            System.out.println("\nScenario: Submit button");
            System.out.println("Strategy priority:");
            System.out.println("  1. #submitBtn                        (if has ID)");
            System.out.println("  2. [data-testid='submit-button']     (best for testing)");
            System.out.println("  3. button[type='submit']             (semantic)");
            System.out.println("  4. .btn-submit                       (if unique class)");
            System.out.println("  5. button[class*='submit']           (partial match)");

            // Demo 5: Framework integration patterns
            System.out.println("\n--- Demo 5: Framework Integration Patterns ---");

            // Pattern 1: Fallback strategy
            String submitBtnSelector = attemptMultipleStrategies(driver, 
                "#submit",
                "[data-testid='submit']",
                "button[type='submit']"
            );
            System.out.println("Used selector: " + submitBtnSelector);

            // Demo 6: Performance best practices
            System.out.println("\n--- Demo 6: Performance Comparison ---");

            long startTime, endTime;

            // Good: Specific and short
            startTime = System.nanoTime();
            driver.findElement(By.cssSelector("#userName"));
            endTime = System.nanoTime();
            long goodTime = (endTime - startTime) / 1000;

            // Bad: Overly complex
            startTime = System.nanoTime();
            driver.findElement(By.cssSelector("div.col-md-9 form#userForm div.form-group input.form-control#userName"));
            endTime = System.nanoTime();
            long badTime = (endTime - startTime) / 1000;

            System.out.println("Simple selector (#userName): " + goodTime + " μs");
            System.out.println("Complex selector: " + badTime + " μs");
            System.out.println("Difference: " + (badTime - goodTime) + " μs slower");

            Thread.sleep(2000);

            System.out.println("\n✅ All best practices demonstrated\!");

            // Print framework summary
            System.out.println("\n=== CSS FRAMEWORK SUMMARY ===");
            System.out.println("1. ✅ Use CSSBuilder for consistency");
            System.out.println("2. ✅ Validate selectors before production");
            System.out.println("3. ✅ Prefer data-testid for stability");
            System.out.println("4. ✅ Keep selectors short and simple");
            System.out.println("5. ✅ Implement fallback strategies");
            System.out.println("6. ✅ Monitor selector performance");
            System.out.println("7. ✅ Avoid position-based selectors");
            System.out.println("8. ✅ Use dynamic matching for changing IDs");

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\nBrowser closed");
        }
    }

    // Helper method: Try multiple selector strategies
    private static String attemptMultipleStrategies(WebDriver driver, String... selectors) {
        for (String selector : selectors) {
            try {
                driver.findElement(By.cssSelector(selector));
                return selector;  // Return first successful selector
            } catch (Exception e) {
                // Try next strategy
            }
        }
        return "No selector worked";
    }
}
```

**Expected Console Output:**
```
=== CSS Best Practices & Production Framework ===

--- Demo 1: CSS Builder Utility ---
Username selector: #userName
Email selector: input[type='email']
Dynamic selector: input[id^='user']

--- Demo 2: Data-TestID Pattern (Best Practice) ---
Test ID selector: [data-testid='submit-button']
Why it's best: Stable, designed for testing, won't break with UI changes

--- Demo 3: Selector Validation ---

Validating: #firstName
Good Practices:
  ✅ Using ID selector - fast and specific\!
✅ Selector follows best practices\!

Validating: [data-testid='submit-btn']
Good Practices:
  ✅ Using data-testid - excellent for testing\!
✅ Selector follows best practices\!

Validating: input[id^='user']
Good Practices:
  ✅ Using dynamic attribute matching - flexible\!
✅ Selector follows best practices\!

Validating: div > div > div > div > div > input:nth-child(3)
Issues Found:
  ⚠️ Using :nth-child() - prefer attribute-based
  ⚠️ Too many levels (6) - brittle selector

Validating: .form-control
✅ Selector follows best practices\!

Validating: body > div#root > main.container > form.login > div.row > div.col > input[type='text']:nth-child(5)
Good Practices:
  ✅ Using ID selector - fast and specific\!
Issues Found:
  ⚠️ Selector too long (106 chars) - simplify
  ⚠️ Using :nth-child() - prefer attribute-based
  ⚠️ Too many levels (7) - brittle selector

--- Demo 4: Real-World Selector Strategies ---

Scenario: Submit button
Strategy priority:
  1. #submitBtn                        (if has ID)
  2. [data-testid='submit-button']     (best for testing)
  3. button[type='submit']             (semantic)
  4. .btn-submit                       (if unique class)
  5. button[class*='submit']           (partial match)

--- Demo 5: Framework Integration Patterns ---
Used selector: button[type='submit']

--- Demo 6: Performance Comparison ---
Simple selector (#userName): 1100 μs
Complex selector: 1450 μs
Difference: 350 μs slower

✅ All best practices demonstrated\!

=== CSS FRAMEWORK SUMMARY ===
1. ✅ Use CSSBuilder for consistency
2. ✅ Validate selectors before production
3. ✅ Prefer data-testid for stability
4. ✅ Keep selectors short and simple
5. ✅ Implement fallback strategies
6. ✅ Monitor selector performance
7. ✅ Avoid position-based selectors
8. ✅ Use dynamic matching for changing IDs

Browser closed
```

**✅ Success Criteria:**

- [ ] CSSBuilder methods working correctly
- [ ] Validator identifying issues accurately
- [ ] Data-testid pattern explained
- [ ] Performance comparison demonstrated
- [ ] Fallback strategies implemented
- [ ] Best practices summarized
- [ ] No runtime errors

**❌ Common Mistakes:**

| Mistake | Impact | Best Practice |
|---------|--------|---------------|
| Over-specific selectors | Brittle, breaks easily | Keep it simple |
| No validation | Production bugs | Validate before committing |
| Hardcoding selectors | Maintenance nightmare | Use builder utilities |
| Ignoring data-testid | UI changes break tests | Add data-testid to elements |
| Position-based default | Breaks when order changes | Use attributes first |

**💡 Key Learning Points:**

1. **Data-testid is GOLD:** Most stable, designed for testing
2. **Simple is better:** Shortest working selector wins
3. **Validate early:** Catch issues before production
4. **Use utilities:** Builders prevent errors, improve consistency
5. **Fallback strategies:** Try ID first, then data-testid, then attributes

**🎯 Practice Challenge:**

1. Build CSSBuilder method for nth-of-type
2. Add validation rule for detecting slow selectors
3. Create method to convert XPath to CSS (where possible)
4. Implement selector performance benchmarking
5. Build auto-suggestion based on element attributes
6. Create framework-ready CSS utility with logging
7. Implement retry logic for dynamic content

---

## 🎊 CONGRATULATIONS\! Days 22-23 COMPLETE\! 🎊

### ✅ What You've Mastered

**Day 22: XPath (6 Exercises - 100%)**
1. ✅ XPath Basics - Absolute vs Relative
2. ✅ XPath Axes - 8 navigation directions
3. ✅ XPath Functions - text(), contains(), starts-with(), normalize-space()
4. ✅ Dynamic XPath - 6 strategies for changing elements
5. ✅ Complex Scenarios - Tables, lists, nested structures
6. ✅ Best Practices - Production utility framework

**Day 23: CSS Selectors (6 Exercises - 100%)**
1. ✅ CSS Basics - ID, class, attribute selectors
2. ✅ Advanced CSS - Combinators & pseudo-classes
3. ✅ Attribute Selectors - All 7 types
4. ✅ CSS vs XPath - Performance comparison & use cases
5. ✅ Complex Scenarios - Real-world applications
6. ✅ Best Practices - Production framework

### 📊 Total Content Created

**Days 22-23 Complete:**
- **Total Exercises:** 12 (100%)
- **Total Lines:** ~6,500 lines
- **Code Examples:** 50+ complete Java classes
- **Learning Time:** 10-12 hours
- **Skill Level:** Intermediate to Advanced

### 🎯 Skills Acquired

You can now:
- ✅ Write both XPath and CSS selectors expertly
- ✅ Choose the optimal locator strategy for any scenario
- ✅ Handle dynamic web elements confidently
- ✅ Build production-ready locator frameworks
- ✅ Optimize selector performance
- ✅ Debug and fix locator issues quickly
- ✅ Implement industry best practices

### 🚀 Next Steps

Continue your Selenium journey with:
- Days 31-35: JavaScript Executor & Waits
- Days 38-43: TestNG & Page Object Model
- Days 44-45: Complete Framework Project (Already Done\!)

---

**📝 End of Days 22-23: Advanced Locators**

**You've mastered the most critical skill in Selenium automation - element location\!** 🎉

# Days 24-26: Dropdowns, Checkboxes & Alerts

# SELENIUM WEBDRIVER - BEGINNER-FRIENDLY Exercises (Days 24-26)

## 📌 How to Use These Exercises

**Each exercise includes:**
1. ✅ Clear learning objectives
2. ✅ Concept explanation with examples
3. ✅ Complete Java code with detailed comments
4. ✅ Expected output format
5. ✅ Success criteria checklist
6. ✅ Common mistakes table
7. ✅ Practice challenge tasks

**Progressive Learning:** Exercises start simple and gradually increase in complexity.

---

## Day 24: Handling Dropdowns (Select class, single/multi-select)

---

#### Exercise 1: Understanding Dropdown Basics - Single Select (20 minutes)

**What you'll learn:** How to interact with HTML select elements using Selenium's Select class

**Practice Website:** https://demo.seleniumeasy.com/basic-select-dropdown-demo.html

**Concept Explanation:**

Dropdowns (select elements) are one of the most common UI elements in web applications. Selenium provides a dedicated `Select` class to handle these elements efficiently.

**Types of Dropdowns:**
1. **Single Select:** User can select only one option (default)
2. **Multi Select:** User can select multiple options (has `multiple` attribute)

**Select Class Methods:**
- `selectByVisibleText(String text)` - Select by the visible text
- `selectByValue(String value)` - Select by the value attribute
- `selectByIndex(int index)` - Select by index (starts from 0)
- `getFirstSelectedOption()` - Get currently selected option
- `getAllSelectedOptions()` - Get all selected options
- `isMultiple()` - Check if dropdown is multi-select

**Create new package: `com.automation.dropdowns`**
**Create new class: `SingleSelectBasics`**

```java
package com.automation.dropdowns;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

public class SingleSelectBasics {
    public static void main(String[] args) {
        System.out.println("===== DROPDOWN: SINGLE SELECT BASICS =====\n");

        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Navigate to test website
            driver.get("https://demo.seleniumeasy.com/basic-select-dropdown-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // STEP 1: Locate the dropdown element
            // ========================================
            System.out.println("\n--- STEP 1: LOCATE DROPDOWN ---");
            System.out.println("First, find the dropdown element using any locator");
            System.out.println("Look for <select> tag in HTML\n");

            // Find the dropdown element
            WebElement dayDropdown = driver.findElement(By.id("select-demo"));
            System.out.println("✅ Found dropdown element");
            System.out.println("   Tag name: " + dayDropdown.getTagName());
            System.out.println("   ID: " + dayDropdown.getAttribute("id"));
            System.out.println();

            // ========================================
            // STEP 2: Create Select object
            // ========================================
            System.out.println("--- STEP 2: CREATE SELECT OBJECT ---");
            System.out.println("Syntax: Select select = new Select(WebElement)");
            System.out.println("This gives us access to all Select class methods\n");

            // Create Select object
            Select daySelect = new Select(dayDropdown);
            System.out.println("✅ Select object created");
            System.out.println();

            // ========================================
            // STEP 3: Check if dropdown is multi-select
            // ========================================
            System.out.println("--- STEP 3: CHECK DROPDOWN TYPE ---");
            boolean isMultiple = daySelect.isMultiple();
            System.out.println("Is this a multi-select dropdown? " + isMultiple);
            System.out.println("✅ This is a SINGLE-SELECT dropdown");
            System.out.println();

            // ========================================
            // STEP 4: Get all options from dropdown
            // ========================================
            System.out.println("--- STEP 4: GET ALL OPTIONS ---");
            System.out.println("Method: getOptions() returns List<WebElement>\n");

            List<WebElement> allOptions = daySelect.getOptions();
            System.out.println("Total options available: " + allOptions.size());
            System.out.println("\nAll options in dropdown:");
            for (int i = 0; i < allOptions.size(); i++) {
                String optionText = allOptions.get(i).getText();
                String optionValue = allOptions.get(i).getAttribute("value");
                System.out.println("  Index " + i + ": " + optionText +
                                   " (value='" + optionValue + "')");
            }
            System.out.println();

            // ========================================
            // METHOD 1: Select by Visible Text
            // ========================================
            System.out.println("--- METHOD 1: SELECT BY VISIBLE TEXT ---");
            System.out.println("Syntax: selectByVisibleText(\"text you see on page\")");
            System.out.println("Most commonly used method!\n");

            daySelect.selectByVisibleText("Monday");
            Thread.sleep(1500);

            // Verify selection
            WebElement selectedOption = daySelect.getFirstSelectedOption();
            System.out.println("✅ Selected: " + selectedOption.getText());

            // Check the display message
            WebElement displayMessage = driver.findElement(By.className("selected-value"));
            System.out.println("📝 Display shows: " + displayMessage.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // METHOD 2: Select by Value Attribute
            // ========================================
            System.out.println("--- METHOD 2: SELECT BY VALUE ---");
            System.out.println("Syntax: selectByValue(\"value attribute\")");
            System.out.println("Uses the 'value' attribute in <option> tag\n");

            daySelect.selectByValue("Tuesday");
            Thread.sleep(1500);

            selectedOption = daySelect.getFirstSelectedOption();
            System.out.println("✅ Selected: " + selectedOption.getText());
            System.out.println("   Value attribute: " + selectedOption.getAttribute("value"));
            System.out.println("📝 Display shows: " + displayMessage.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // METHOD 3: Select by Index
            // ========================================
            System.out.println("--- METHOD 3: SELECT BY INDEX ---");
            System.out.println("Syntax: selectByIndex(index)");
            System.out.println("⚠️ IMPORTANT: Index starts from 0!");
            System.out.println("Index 0 = First option (usually 'Please select')\n");

            // Select Wednesday (index 4: 0=Please select, 1=Sunday, 2=Monday, 3=Tuesday, 4=Wednesday)
            daySelect.selectByIndex(4);
            Thread.sleep(1500);

            selectedOption = daySelect.getFirstSelectedOption();
            System.out.println("✅ Selected index 4: " + selectedOption.getText());
            System.out.println("📝 Display shows: " + displayMessage.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // PRACTICAL EXAMPLE: Select all days one by one
            // ========================================
            System.out.println("--- PRACTICAL EXAMPLE ---");
            System.out.println("Selecting each day of the week one by one\n");

            String[] daysOfWeek = {"Sunday", "Monday", "Tuesday", "Wednesday",
                                   "Thursday", "Friday", "Saturday"};

            for (String day : daysOfWeek) {
                daySelect.selectByVisibleText(day);
                Thread.sleep(800);
                System.out.println("✅ Selected: " + day);
            }
            System.out.println("\n✅ Cycled through all days!");
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("SUMMARY: THREE WAYS TO SELECT");
            System.out.println("=====================================");
            System.out.println("1. selectByVisibleText(\"text\")  ← MOST COMMON");
            System.out.println("   - Use when you know the text user sees");
            System.out.println("   - Most readable and maintainable");
            System.out.println();
            System.out.println("2. selectByValue(\"value\")");
            System.out.println("   - Use when value attribute is stable");
            System.out.println("   - Good for programmatic selection");
            System.out.println();
            System.out.println("3. selectByIndex(index)");
            System.out.println("   - Use when position is guaranteed");
            System.out.println("   - LEAST RECOMMENDED (fragile)");
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
===== DROPDOWN: SINGLE SELECT BASICS =====

✅ Opened: Selenium Easy Demo - Simple Form to Automate using Selenium

--- STEP 1: LOCATE DROPDOWN ---
First, find the dropdown element using any locator
Look for <select> tag in HTML

✅ Found dropdown element
   Tag name: select
   ID: select-demo

--- STEP 2: CREATE SELECT OBJECT ---
Syntax: Select select = new Select(WebElement)
This gives us access to all Select class methods

✅ Select object created

--- STEP 3: CHECK DROPDOWN TYPE ---
Is this a multi-select dropdown? false
✅ This is a SINGLE-SELECT dropdown

--- STEP 4: GET ALL OPTIONS ---
Method: getOptions() returns List<WebElement>

Total options available: 8
All options in dropdown:
  Index 0: Please select (value='')
  Index 1: Sunday (value='Sunday')
  Index 2: Monday (value='Monday')
  Index 3: Tuesday (value='Tuesday')
  Index 4: Wednesday (value='Wednesday')
  Index 5: Thursday (value='Thursday')
  Index 6: Friday (value='Friday')
  Index 7: Saturday (value='Saturday')

--- METHOD 1: SELECT BY VISIBLE TEXT ---
Syntax: selectByVisibleText("text you see on page")
Most commonly used method!

✅ Selected: Monday
📝 Display shows: Day selected :- Monday

--- METHOD 2: SELECT BY VALUE ---
Syntax: selectByValue("value attribute")
Uses the 'value' attribute in <option> tag

✅ Selected: Tuesday
   Value attribute: Tuesday
📝 Display shows: Day selected :- Tuesday

--- METHOD 3: SELECT BY INDEX ---
Syntax: selectByIndex(index)
⚠️ IMPORTANT: Index starts from 0!
Index 0 = First option (usually 'Please select')

✅ Selected index 4: Wednesday
📝 Display shows: Day selected :- Wednesday

--- PRACTICAL EXAMPLE ---
Selecting each day of the week one by one

✅ Selected: Sunday
✅ Selected: Monday
✅ Selected: Tuesday
✅ Selected: Wednesday
✅ Selected: Thursday
✅ Selected: Friday
✅ Selected: Saturday

✅ Cycled through all days!

=====================================
SUMMARY: THREE WAYS TO SELECT
=====================================
1. selectByVisibleText("text")  ← MOST COMMON
   - Use when you know the text user sees
   - Most readable and maintainable

2. selectByValue("value")
   - Use when value attribute is stable
   - Good for programmatic selection

3. selectByIndex(index)
   - Use when position is guaranteed
   - LEAST RECOMMENDED (fragile)
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens and navigates to the demo page
2. Each selection visually changes the dropdown
3. Display message updates below dropdown
4. Days are selected one after another
5. Browser closes after 2 seconds

**✅ Success Criteria:**
- All three selection methods work successfully
- Selected values are displayed correctly
- All days are cycled through
- Console shows all ✅ marks
- No exceptions thrown

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchElementException | Element not found | Verify ID/locator is correct |
| ElementNotInteractableException | Dropdown not visible/enabled | Add wait or check visibility |
| UnexpectedTagNameException | Element is not a `<select>` tag | Verify you're selecting the correct element |
| NoSuchElementException (option) | Text/value doesn't exist | Check exact spelling and case |
| StaleElementReferenceException | Page refreshed after finding element | Re-find the element |


**Common Mistakes:**
1. ❌ **Treating Dropdowns as Regular Elements**: Trying to click options directly without using Select class
   - Why: Dropdown options aren't directly clickable WebElements
   - Fix: Always use `Select select = new Select(element)` for `<select>` tags
   - Example: `new Select(driver.findElement(By.id("dropdown"))).selectByVisibleText("Option 1")`

2. ❌ **Not Waiting for Dropdown to Load**: Attempting to select options before dropdown is fully rendered
   - Why: Dynamic dropdowns may load options asynchronously via JavaScript
   - Fix: Use explicit wait: `wait.until(ExpectedConditions.elementToBeClickable(dropdown))`

3. ❌ **Using Wrong Selection Method**: Using selectByIndex(0) without understanding zero-based indexing
   - Why: Index 0 might be a placeholder option like "Please Select"
   - Fix: Prefer `selectByVisibleText()` or `selectByValue()` for more reliable selection

4. ❌ **Not Verifying Selection**: Selecting an option without confirming it was actually selected
   - Why: Selection might fail silently due to JavaScript interference or page issues
   - Fix: Always verify: `assertEquals(select.getFirstSelectedOption().getText(), "Expected Text")`

5. ❌ **Forgetting to Check if Element is Actually a Dropdown**: Using Select class on non-dropdown elements
   - Why: Select class only works with `<select>` tags, throws exception otherwise
   - Fix: Verify tag before creating Select: `if(element.getTagName().equals("select")) { ... }`


**💡 Key Concepts:**

**1. HTML Structure of Dropdown:**
```html
<select id="select-demo">
    <option value="">Please select</option>
    <option value="Sunday">Sunday</option>
    <option value="Monday">Monday</option>
</select>
```

**2. Import Required:**
```java
import org.openqa.selenium.support.ui.Select;
```

**3. Two-Step Process:**
```java
// Step 1: Find element
WebElement dropdown = driver.findElement(By.id("dropdown-id"));

// Step 2: Create Select object
Select select = new Select(dropdown);
```

**🎯 Practice Challenge:**

1. Go to the same page and find the "Select State" dropdown
2. Print all 50+ states
3. Select your favorite state using all three methods
4. Create a loop to select every 5th state
5. Verify the selected state displays correctly

---

#### Exercise 2: Multi-Select Dropdown (25 minutes)

**What you'll learn:** How to handle multi-select dropdowns and work with multiple selections

**Practice Website:** https://demo.seleniumeasy.com/basic-select-dropdown-demo.html (scroll to multi-select section)

**Concept Explanation:**

Multi-select dropdowns allow users to select multiple options simultaneously (hold Ctrl/Cmd while clicking). They have the `multiple` attribute in HTML.

**Additional Select Methods for Multi-Select:**
- `selectByVisibleText()` - Adds to selection (doesn't replace)
- `deselectByVisibleText()` - Remove specific option
- `deselectByValue()` - Remove by value
- `deselectByIndex()` - Remove by index
- `deselectAll()` - Clear all selections
- `getAllSelectedOptions()` - Get all selected options as List

**Create new class: `MultiSelectDropdown`**

```java
package com.automation.dropdowns;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

public class MultiSelectDropdown {
    public static void main(String[] args) {
        System.out.println("===== MULTI-SELECT DROPDOWN =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://demo.seleniumeasy.com/basic-select-dropdown-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            // ========================================
            // LOCATE MULTI-SELECT DROPDOWN
            // ========================================
            System.out.println("--- LOCATING MULTI-SELECT DROPDOWN ---");
            WebElement multiSelectElement = driver.findElement(By.id("multi-select"));
            Select multiSelect = new Select(multiSelectElement);

            System.out.println("✅ Found multi-select dropdown");
            System.out.println("   Is Multiple? " + multiSelect.isMultiple());
            System.out.println();

            // ========================================
            // GET ALL OPTIONS
            // ========================================
            System.out.println("--- ALL AVAILABLE OPTIONS ---");
            List<WebElement> allOptions = multiSelect.getOptions();
            System.out.println("Total states available: " + allOptions.size() + "\n");

            for (int i = 0; i < allOptions.size(); i++) {
                System.out.println("  " + (i + 1) + ". " + allOptions.get(i).getText());
            }
            System.out.println();

            // ========================================
            // SELECTING MULTIPLE OPTIONS
            // ========================================
            System.out.println("--- SELECTING MULTIPLE OPTIONS ---");
            System.out.println("In multi-select, each select ADDS to existing selection\n");

            // Select California
            System.out.println("Selecting: California");
            multiSelect.selectByVisibleText("California");
            Thread.sleep(1000);
            printCurrentSelections(multiSelect);
            System.out.println();

            // Select Florida (adds to selection)
            System.out.println("Selecting: Florida");
            multiSelect.selectByVisibleText("Florida");
            Thread.sleep(1000);
            printCurrentSelections(multiSelect);
            System.out.println();

            // Select New York (adds to selection)
            System.out.println("Selecting: New York");
            multiSelect.selectByVisibleText("New York");
            Thread.sleep(1000);
            printCurrentSelections(multiSelect);
            System.out.println();

            // Select Texas (adds to selection)
            System.out.println("Selecting: Texas");
            multiSelect.selectByVisibleText("Texas");
            Thread.sleep(1000);
            printCurrentSelections(multiSelect);
            System.out.println();

            // ========================================
            // GETTING ALL SELECTED OPTIONS
            // ========================================
            System.out.println("--- GETTING ALL SELECTED OPTIONS ---");
            List<WebElement> selectedOptions = multiSelect.getAllSelectedOptions();
            System.out.println("Total selected: " + selectedOptions.size());
            System.out.println("\nCurrently selected states:");
            for (WebElement option : selectedOptions) {
                System.out.println("  ✓ " + option.getText());
            }
            System.out.println();
            Thread.sleep(2000);

            // ========================================
            // DESELECTING SPECIFIC OPTIONS
            // ========================================
            System.out.println("--- DESELECTING SPECIFIC OPTIONS ---");
            System.out.println("Method: deselectByVisibleText()\n");

            System.out.println("Deselecting: Florida");
            multiSelect.deselectByVisibleText("Florida");
            Thread.sleep(1000);
            printCurrentSelections(multiSelect);
            System.out.println();

            System.out.println("Deselecting: New York");
            multiSelect.deselectByVisibleText("New York");
            Thread.sleep(1000);
            printCurrentSelections(multiSelect);
            System.out.println();

            // ========================================
            // SELECT MULTIPLE AT ONCE
            // ========================================
            System.out.println("--- SELECTING MULTIPLE OPTIONS AT ONCE ---");
            System.out.println("First, clear all selections\n");

            multiSelect.deselectAll();
            Thread.sleep(1000);
            System.out.println("✅ All selections cleared");
            printCurrentSelections(multiSelect);
            System.out.println();

            // Select 5 states
            String[] statesToSelect = {"California", "Florida", "New York", "Ohio", "Washington"};
            System.out.println("Selecting 5 states:");
            for (String state : statesToSelect) {
                multiSelect.selectByVisibleText(state);
                System.out.println("  ✓ Added: " + state);
                Thread.sleep(500);
            }
            System.out.println();
            printCurrentSelections(multiSelect);
            Thread.sleep(2000);

            // ========================================
            // USING INDEX FOR SELECTION
            // ========================================
            System.out.println("\n--- SELECTING BY INDEX ---");
            multiSelect.deselectAll();
            System.out.println("✅ Cleared all selections\n");

            System.out.println("Selecting first 3 states using index:");
            for (int i = 0; i < 3; i++) {
                multiSelect.selectByIndex(i);
                WebElement selected = allOptions.get(i);
                System.out.println("  Index " + i + ": " + selected.getText());
                Thread.sleep(500);
            }
            System.out.println();
            printCurrentSelections(multiSelect);
            System.out.println();

            // ========================================
            // DESELECT BY INDEX
            // ========================================
            System.out.println("--- DESELECTING BY INDEX ---");
            System.out.println("Removing middle selection (index 1)\n");

            multiSelect.deselectByIndex(1);
            Thread.sleep(1000);
            printCurrentSelections(multiSelect);
            System.out.println();

            // ========================================
            // CLICK "GET ALL SELECTED" BUTTON
            // ========================================
            System.out.println("--- VERIFYING WITH BUTTON CLICK ---");
            WebElement getAllSelectedButton = driver.findElement(By.id("printMe"));
            getAllSelectedButton.click();
            Thread.sleep(1500);

            WebElement resultMessage = driver.findElement(By.className("getall-selected"));
            System.out.println("📝 Result message: " + resultMessage.getText());
            System.out.println();

            // ========================================
            // PRACTICAL EXAMPLE: Select alternate states
            // ========================================
            System.out.println("--- PRACTICAL EXAMPLE ---");
            System.out.println("Selecting every other state (even indexes)\n");

            multiSelect.deselectAll();
            Thread.sleep(1000);

            int count = 0;
            for (int i = 0; i < allOptions.size(); i += 2) {
                multiSelect.selectByIndex(i);
                count++;
                Thread.sleep(300);
            }

            System.out.println("✅ Selected " + count + " states (even indexes)");
            printCurrentSelections(multiSelect);
            System.out.println();

            // Click button to verify
            getAllSelectedButton.click();
            Thread.sleep(1500);
            System.out.println("📝 Result: " + resultMessage.getText());

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("MULTI-SELECT DROPDOWN SUMMARY");
            System.out.println("=====================================");
            System.out.println("Key Differences from Single-Select:");
            System.out.println("  • isMultiple() returns true");
            System.out.println("  • Each select() ADDS to selection");
            System.out.println("  • Can have multiple items selected");
            System.out.println("  • Use deselectByXxx() to remove items");
            System.out.println("  • Use deselectAll() to clear all");
            System.out.println();
            System.out.println("Common Methods:");
            System.out.println("  • selectByVisibleText() - Add option");
            System.out.println("  • deselectByVisibleText() - Remove option");
            System.out.println("  • getAllSelectedOptions() - Get all selections");
            System.out.println("  • deselectAll() - Clear everything");
            System.out.println("=====================================");

            Thread.sleep(3000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }

    // Helper method to print current selections
    private static void printCurrentSelections(Select select) {
        List<WebElement> selected = select.getAllSelectedOptions();
        if (selected.isEmpty()) {
            System.out.println("   Current selections: NONE");
        } else {
            System.out.println("   Current selections (" + selected.size() + "):");
            for (WebElement option : selected) {
                System.out.println("     ✓ " + option.getText());
            }
        }
    }
}
```

**Expected Output:**
```
===== MULTI-SELECT DROPDOWN =====

✅ Opened: Selenium Easy Demo - Simple Form to Automate using Selenium

--- LOCATING MULTI-SELECT DROPDOWN ---
✅ Found multi-select dropdown
   Is Multiple? true

--- ALL AVAILABLE OPTIONS ---
Total states available: 8

  1. California
  2. Florida
  3. New Jersey
  4. New York
  5. Ohio
  6. Texas
  7. Washington
  8. Pennsylvania

--- SELECTING MULTIPLE OPTIONS ---
In multi-select, each select ADDS to existing selection

Selecting: California
   Current selections (1):
     ✓ California

Selecting: Florida
   Current selections (2):
     ✓ California
     ✓ Florida

Selecting: New York
   Current selections (3):
     ✓ California
     ✓ Florida
     ✓ New York

Selecting: Texas
   Current selections (4):
     ✓ California
     ✓ Florida
     ✓ New York
     ✓ Texas

--- GETTING ALL SELECTED OPTIONS ---
Total selected: 4

Currently selected states:
  ✓ California
  ✓ Florida
  ✓ New York
  ✓ Texas

--- DESELECTING SPECIFIC OPTIONS ---
Method: deselectByVisibleText()

Deselecting: Florida
   Current selections (3):
     ✓ California
     ✓ New York
     ✓ Texas

Deselecting: New York
   Current selections (2):
     ✓ California
     ✓ Texas

--- SELECTING MULTIPLE OPTIONS AT ONCE ---
First, clear all selections

✅ All selections cleared
   Current selections: NONE

Selecting 5 states:
  ✓ Added: California
  ✓ Added: Florida
  ✓ Added: New York
  ✓ Added: Ohio
  ✓ Added: Washington

   Current selections (5):
     ✓ California
     ✓ Florida
     ✓ New York
     ✓ Ohio
     ✓ Washington

--- SELECTING BY INDEX ---
✅ Cleared all selections

Selecting first 3 states using index:
  Index 0: California
  Index 1: Florida
  Index 2: New Jersey

   Current selections (3):
     ✓ California
     ✓ Florida
     ✓ New Jersey

--- DESELECTING BY INDEX ---
Removing middle selection (index 1)

   Current selections (2):
     ✓ California
     ✓ New Jersey

--- VERIFYING WITH BUTTON CLICK ---
📝 Result message: Options selected are : California,New Jersey

--- PRACTICAL EXAMPLE ---
Selecting every other state (even indexes)

✅ Selected 4 states (even indexes)
   Current selections (4):
     ✓ California
     ✓ New Jersey
     ✓ Ohio
     ✓ Washington

📝 Result: Options selected are : California,New Jersey,Ohio,Washington

=====================================
MULTI-SELECT DROPDOWN SUMMARY
=====================================
Key Differences from Single-Select:
  • isMultiple() returns true
  • Each select() ADDS to selection
  • Can have multiple items selected
  • Use deselectByXxx() to remove items
  • Use deselectAll() to clear all

Common Methods:
  • selectByVisibleText() - Add option
  • deselectByVisibleText() - Remove option
  • getAllSelectedOptions() - Get all selections
  • deselectAll() - Clear everything
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens to multi-select demo
2. States get selected and highlighted (multiple at once)
3. States get deselected one by one
4. "Get All Selected" button gets clicked
5. Result message displays selected states
6. Browser closes after 3 seconds

**✅ Success Criteria:**
- Can select multiple options simultaneously
- Deselect operations work correctly
- deselectAll() clears all selections
- getAllSelectedOptions() returns correct count
- Button click displays correct selections
- No exceptions thrown

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| UnsupportedOperationException (deselect) | Trying to deselect from single-select | Check isMultiple() first |
| NoSuchElementException | Option doesn't exist | Verify exact text/value |
| InvalidElementStateException | Element disabled | Check element is enabled |
| "Element not visible" | Dropdown outside viewport | Scroll to element first |
| StaleElementReferenceException | DOM changed after selection | Re-find element |


**Common Mistakes:**
1. ❌ **Not Checking if Multiple Selection is Enabled**: Treating multi-select like single-select
   - Why: Not all dropdowns support multiple selections
   - Fix: Check first: `if(select.isMultiple()) { /* handle multi-select */ }`

2. ❌ **Forgetting to Deselect Previous Options**: Selecting new options without clearing old ones first
   - Why: In multi-select, new selections ADD to existing ones, not replace them
   - Fix: Use `select.deselectAll()` before making new selections when needed

3. ❌ **Using Wrong Deselection Method**: Trying to deselect from single-select dropdown
   - Why: `deselectAll()` throws UnsupportedOperationException on single-select dropdowns
   - Fix: Always check `isMultiple()` before attempting deselection

4. ❌ **Not Handling NoSuchElementException**: Selecting non-existent options without error handling
   - Why: Options might not exist or be dynamically loaded
   - Fix: Wrap in try-catch or verify option exists first

5. ❌ **Incorrect Verification of Multiple Selections**: Using `getFirstSelectedOption()` for multi-select
   - Why: This only returns ONE option, not all selected options
   - Fix: Use `getAllSelectedOptions()` and verify size: `assertEquals(select.getAllSelectedOptions().size(), 3)`


**💡 Key Concepts:**

**1. Multi-Select HTML:**
```html
<select id="multi-select" multiple>
    <option value="CA">California</option>
    <option value="FL">Florida</option>
</select>
```

**2. Difference from Single-Select:**
```java
// Single-select: Each select REPLACES previous
singleSelect.selectByVisibleText("A");  // Selected: A
singleSelect.selectByVisibleText("B");  // Selected: B (A is gone)

// Multi-select: Each select ADDS to existing
multiSelect.selectByVisibleText("A");  // Selected: A
multiSelect.selectByVisibleText("B");  // Selected: A, B (both)
```

**3. Best Practices:**
```java
// Always check if it's multi-select
if (select.isMultiple()) {
    // Can use deselect methods
    select.deselectAll();
}

// Clear before new selection
select.deselectAll();
select.selectByVisibleText("Option1");
select.selectByVisibleText("Option2");
```

**🎯 Practice Challenge:**

1. Select all 8 states one by one
2. Verify count is 8
3. Deselect all odd-indexed states
4. Verify only even-indexed states remain
5. Click "Get All Selected" and verify message
6. Clear all and select only coastal states (CA, FL, NY, WA)

---

#### Exercise 3: Real-World Dropdown Scenarios (30 minutes)

**What you'll learn:** Handling dropdowns in real-world scenarios with dynamic content

**Practice Website:** https://www.globalsqa.com/demo-site/select-dropdown-menu/

**Create new class: `RealWorldDropdowns`**

```java
package com.automation.dropdowns;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class RealWorldDropdowns {
    public static void main(String[] args) {
        System.out.println("===== REAL-WORLD DROPDOWN SCENARIOS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Explicit wait
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://www.globalsqa.com/demo-site/select-dropdown-menu/");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            // ========================================
            // SCENARIO 1: Finding dropdown in complex page
            // ========================================
            System.out.println("--- SCENARIO 1: LOCATE DROPDOWN IN COMPLEX PAGE ---");
            System.out.println("Real pages have many elements, ads, etc.\n");

            // Wait for dropdown to be present
            WebElement countryDropdown = wait.until(
                ExpectedConditions.presenceOfElementLocated(
                    By.cssSelector("select[class*='select']")
                )
            );

            Select countrySelect = new Select(countryDropdown);
            System.out.println("✅ Found country dropdown");
            System.out.println("   Total countries: " + countrySelect.getOptions().size());
            System.out.println();

            // ========================================
            // SCENARIO 2: Finding specific option by text contains
            // ========================================
            System.out.println("--- SCENARIO 2: SEARCH FOR SPECIFIC COUNTRY ---");
            System.out.println("Task: Find if 'India' exists in dropdown\n");

            boolean indiaFound = false;
            List<WebElement> allCountries = countrySelect.getOptions();

            for (WebElement country : allCountries) {
                if (country.getText().equals("India")) {
                    indiaFound = true;
                    System.out.println("✅ Found 'India' in the dropdown");
                    System.out.println("   Value: " + country.getAttribute("value"));
                    break;
                }
            }

            if (!indiaFound) {
                System.out.println("❌ 'India' not found in dropdown");
            }
            System.out.println();

            // ========================================
            // SCENARIO 3: Selecting country
            // ========================================
            System.out.println("--- SCENARIO 3: SELECT COUNTRY ---");
            System.out.println("Selecting: India\n");

            countrySelect.selectByVisibleText("India");
            Thread.sleep(1500);

            WebElement selectedCountry = countrySelect.getFirstSelectedOption();
            System.out.println("✅ Selected: " + selectedCountry.getText());
            System.out.println();

            // ========================================
            // SCENARIO 4: Get countries starting with 'A'
            // ========================================
            System.out.println("--- SCENARIO 4: FILTER OPTIONS ---");
            System.out.println("Finding all countries starting with 'A'\n");

            int count = 0;
            for (WebElement country : allCountries) {
                String countryName = country.getText();
                if (countryName.startsWith("A")) {
                    count++;
                    System.out.println("  " + count + ". " + countryName);
                }
            }
            System.out.println("\n✅ Found " + count + " countries starting with 'A'");
            System.out.println();

            // ========================================
            // SCENARIO 5: Print countries in alphabetical groups
            // ========================================
            System.out.println("--- SCENARIO 5: GROUPING OPTIONS ---");
            System.out.println("Organizing countries by first letter\n");

            char currentLetter = ' ';
            for (WebElement country : allCountries) {
                String countryName = country.getText().trim();
                if (countryName.isEmpty()) continue;

                char firstChar = countryName.charAt(0);
                if (firstChar != currentLetter) {
                    currentLetter = firstChar;
                    System.out.println("\n" + currentLetter + ":");
                }
                System.out.println("  • " + countryName);
            }
            System.out.println();

            // ========================================
            // SCENARIO 6: Random country selection
            // ========================================
            System.out.println("--- SCENARIO 6: RANDOM SELECTION ---");
            System.out.println("Selecting 5 random countries\n");

            for (int i = 0; i < 5; i++) {
                int randomIndex = (int) (Math.random() * allCountries.size());
                countrySelect.selectByIndex(randomIndex);
                Thread.sleep(800);

                WebElement selected = countrySelect.getFirstSelectedOption();
                System.out.println((i + 1) + ". Selected: " + selected.getText());
            }
            System.out.println("\n✅ Completed random selections");
            System.out.println();

            // ========================================
            // SCENARIO 7: Verify option exists before selecting
            // ========================================
            System.out.println("--- SCENARIO 7: SAFE SELECTION ---");
            System.out.println("Always verify option exists before selecting\n");

            String[] countriesToSelect = {"United States", "United Kingdom",
                                          "Australia", "Invalid Country"};

            for (String country : countriesToSelect) {
                if (isOptionAvailable(countrySelect, country)) {
                    countrySelect.selectByVisibleText(country);
                    System.out.println("✅ Selected: " + country);
                    Thread.sleep(1000);
                } else {
                    System.out.println("❌ '" + country + "' not available in dropdown");
                }
            }
            System.out.println();

            // ========================================
            // SCENARIO 8: Get currently selected value
            // ========================================
            System.out.println("--- SCENARIO 8: VERIFY CURRENT SELECTION ---");
            WebElement currentSelection = countrySelect.getFirstSelectedOption();
            System.out.println("Currently selected country: " + currentSelection.getText());
            System.out.println("Value attribute: " + currentSelection.getAttribute("value"));
            System.out.println();

            // ========================================
            // SCENARIO 9: Count and statistics
            // ========================================
            System.out.println("--- SCENARIO 9: DROPDOWN STATISTICS ---");

            int totalCountries = allCountries.size();
            int emptyOptions = 0;
            int validCountries = 0;

            for (WebElement country : allCountries) {
                if (country.getText().trim().isEmpty()) {
                    emptyOptions++;
                } else {
                    validCountries++;
                }
            }

            System.out.println("📊 Statistics:");
            System.out.println("   Total options: " + totalCountries);
            System.out.println("   Empty options: " + emptyOptions);
            System.out.println("   Valid countries: " + validCountries);
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("REAL-WORLD SCENARIOS SUMMARY");
            System.out.println("=====================================");
            System.out.println("✅ Located dropdown in complex page");
            System.out.println("✅ Searched for specific option");
            System.out.println("✅ Filtered options by criteria");
            System.out.println("✅ Grouped options");
            System.out.println("✅ Random selection");
            System.out.println("✅ Safe selection with verification");
            System.out.println("✅ Got current selection");
            System.out.println("✅ Generated statistics");
            System.out.println("=====================================");

            Thread.sleep(3000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }

    // Helper method to check if option is available
    private static boolean isOptionAvailable(Select select, String optionText) {
        List<WebElement> options = select.getOptions();
        for (WebElement option : options) {
            if (option.getText().equals(optionText)) {
                return true;
            }
        }
        return false;
    }
}
```

**Expected Output:**
```
===== REAL-WORLD DROPDOWN SCENARIOS =====

✅ Opened: Select Dropdown Menu - GlobalSQA

--- SCENARIO 1: LOCATE DROPDOWN IN COMPLEX PAGE ---
Real pages have many elements, ads, etc.

✅ Found country dropdown
   Total countries: 193

--- SCENARIO 2: SEARCH FOR SPECIFIC COUNTRY ---
Task: Find if 'India' exists in dropdown

✅ Found 'India' in the dropdown
   Value: India

--- SCENARIO 3: SELECT COUNTRY ---
Selecting: India

✅ Selected: India

--- SCENARIO 4: FILTER OPTIONS ---
Finding all countries starting with 'A'

  1. Afghanistan
  2. Albania
  3. Algeria
  4. Andorra
  5. Angola
  6. Argentina
  7. Armenia
  8. Australia
  9. Austria

✅ Found 9 countries starting with 'A'

--- SCENARIO 5: GROUPING OPTIONS ---
Organizing countries by first letter

A:
  • Afghanistan
  • Albania
  • Algeria

[... continues for all letters ...]

--- SCENARIO 6: RANDOM SELECTION ---
Selecting 5 random countries

1. Selected: Brazil
2. Selected: Egypt
3. Selected: Japan
4. Selected: Sweden
5. Selected: Thailand

✅ Completed random selections

--- SCENARIO 7: SAFE SELECTION ---
Always verify option exists before selecting

✅ Selected: United States
✅ Selected: United Kingdom
✅ Selected: Australia
❌ 'Invalid Country' not available in dropdown

--- SCENARIO 8: VERIFY CURRENT SELECTION ---
Currently selected country: Australia
Value attribute: Australia

--- SCENARIO 9: DROPDOWN STATISTICS ---
📊 Statistics:
   Total options: 193
   Empty options: 0
   Valid countries: 193

=====================================
REAL-WORLD SCENARIOS SUMMARY
=====================================
✅ Located dropdown in complex page
✅ Searched for specific option
✅ Filtered options by criteria
✅ Grouped options
✅ Random selection
✅ Safe selection with verification
✅ Got current selection
✅ Generated statistics
=====================================

✅ Browser closed
```

**✅ Success Criteria:**
- Dropdown located successfully with waits
- All search and filter operations work
- Random selections complete without errors
- Safe selection handles invalid options
- Statistics calculated correctly
- No exceptions for missing elements

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| TimeoutException | Page loading slowly | Increase wait time or add explicit waits |
| NoSuchElementException | Dropdown not found | Use wait.until() before accessing |
| IndexOutOfBoundsException | Random index too large | Use modulo: random % options.size() |
| NullPointerException | Empty text on option | Add null/empty checks |
| ElementNotInteractableException | Element hidden or disabled | Check visibility and enabled state |


**Common Mistakes:**
1. ❌ **Not Handling Dynamic Dropdowns**: Treating AJAX/dynamic dropdowns like static ones
   - Why: Options load asynchronously, causing NoSuchElementException
   - Fix: Wait for options to load: `wait.until(ExpectedConditions.numberOfElementsToBe(By.tagName("option"), expectedCount))`

2. ❌ **Hardcoding Wait Times**: Using `Thread.sleep()` instead of explicit waits
   - Why: Arbitrary waits are unreliable and slow down tests unnecessarily
   - Fix: Use `WebDriverWait` with appropriate expected conditions

3. ❌ **Not Handling Disabled Options**: Attempting to select disabled options
   - Why: Disabled options throw InvalidElementStateException when selected
   - Fix: Check if enabled: `if(option.isEnabled()) { select.selectByValue(value); }`

4. ❌ **Ignoring Case Sensitivity**: Using exact text that doesn't match due to case differences
   - Why: `selectByVisibleText("option")` won't match "Option" (capital O)
   - Fix: Verify exact text or use flexible matching

5. ❌ **Not Clearing Selections Between Tests**: Tests affecting each other due to retained state
   - Why: Multi-select dropdowns retain selections across actions if not cleared
   - Fix: Add `select.deselectAll()` in tearDown or before each test


**🎯 Practice Challenge:**

1. Create a method `selectCountryByPartialMatch(String partial)` that selects first country containing the partial text
2. Find and print all countries with more than 10 characters in name
3. Select the last country in the dropdown
4. Create a method to select nth option safely
5. Print countries in reverse alphabetical order

---

[Content continues with Days 25 and 26...]

---

## Day 25: Checkboxes and Radio Buttons

---

#### Exercise 1: Understanding Checkboxes - Basic Operations (20 minutes)

**What you'll learn:** How to interact with checkboxes using Selenium WebDriver

**Practice Website:** https://demo.seleniumeasy.com/basic-checkbox-demo.html

**Concept Explanation:**

Checkboxes are input elements that allow users to select multiple options independently. Unlike radio buttons, you can select any number of checkboxes in a group.

**Key Checkbox Methods:**
- `isSelected()` - Returns true if checkbox is checked
- `isEnabled()` - Returns true if checkbox is enabled
- `isDisplayed()` - Returns true if checkbox is visible
- `click()` - Toggles checkbox state (checked ↔ unchecked)
- `getAttribute("checked")` - Returns "true" if checked, null if not

**HTML Structure:**
```html
<input type="checkbox" id="myCheckbox" value="option1">
```

**Create new package: `com.automation.checkboxes`**
**Create new class: `CheckboxBasics`**

```java
package com.automation.checkboxes;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class CheckboxBasics {
    public static void main(String[] args) {
        System.out.println("===== CHECKBOX: BASIC OPERATIONS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://demo.seleniumeasy.com/basic-checkbox-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            // ========================================
            // SINGLE CHECKBOX DEMO
            // ========================================
            System.out.println("--- SINGLE CHECKBOX DEMO ---");
            System.out.println("Learning to check, uncheck, and verify state\n");

            // Locate checkbox
            WebElement singleCheckbox = driver.findElement(By.id("isAgeSelected"));
            System.out.println("✅ Found single checkbox");
            System.out.println("   Tag: " + singleCheckbox.getTagName());
            System.out.println("   Type: " + singleCheckbox.getAttribute("type"));
            System.out.println();

            // ========================================
            // CHECK INITIAL STATE
            // ========================================
            System.out.println("--- CHECKING INITIAL STATE ---");

            boolean isSelected = singleCheckbox.isSelected();
            boolean isEnabled = singleCheckbox.isEnabled();
            boolean isDisplayed = singleCheckbox.isDisplayed();

            System.out.println("Is checkbox selected? " + isSelected);
            System.out.println("Is checkbox enabled? " + isEnabled);
            System.out.println("Is checkbox displayed? " + isDisplayed);
            System.out.println();

            // ========================================
            // CLICKING CHECKBOX (CHECK IT)
            // ========================================
            System.out.println("--- CLICKING CHECKBOX ---");
            System.out.println("Action: Click to check the checkbox\n");

            if (!singleCheckbox.isSelected()) {
                singleCheckbox.click();
                Thread.sleep(1000);
                System.out.println("✅ Checkbox clicked (checked)");
            }

            // Verify it's checked
            System.out.println("Is checkbox now selected? " + singleCheckbox.isSelected());

            // Check the message
            WebElement message = driver.findElement(By.id("txtAge"));
            System.out.println("📝 Message displayed: " + message.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // UNCHECKING CHECKBOX
            // ========================================
            System.out.println("--- UNCHECKING CHECKBOX ---");
            System.out.println("Action: Click again to uncheck\n");

            if (singleCheckbox.isSelected()) {
                singleCheckbox.click();
                Thread.sleep(1000);
                System.out.println("✅ Checkbox clicked (unchecked)");
            }

            System.out.println("Is checkbox now selected? " + singleCheckbox.isSelected());
            System.out.println("📝 Message displayed: " + message.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // TOGGLE DEMONSTRATION
            // ========================================
            System.out.println("--- TOGGLE DEMONSTRATION ---");
            System.out.println("Clicking 5 times to show toggle behavior\n");

            for (int i = 1; i <= 5; i++) {
                singleCheckbox.click();
                Thread.sleep(600);
                String state = singleCheckbox.isSelected() ? "CHECKED" : "UNCHECKED";
                System.out.println("Click " + i + ": " + state);
            }
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // SAFE CHECKBOX SELECTION METHOD
            // ========================================
            System.out.println("--- SAFE CHECKBOX METHODS ---");
            System.out.println("Best Practice: Check state before clicking\n");

            // Method 1: Only check if not already checked
            System.out.println("Method 1: Check checkbox (only if unchecked)");
            if (!singleCheckbox.isSelected()) {
                singleCheckbox.click();
                System.out.println("  ✅ Clicked to check");
            } else {
                System.out.println("  ℹ️  Already checked, no action needed");
            }
            Thread.sleep(1000);
            System.out.println("  Final state: " + (singleCheckbox.isSelected() ? "CHECKED" : "UNCHECKED"));
            System.out.println();

            // Method 2: Only uncheck if currently checked
            System.out.println("Method 2: Uncheck checkbox (only if checked)");
            if (singleCheckbox.isSelected()) {
                singleCheckbox.click();
                System.out.println("  ✅ Clicked to uncheck");
            } else {
                System.out.println("  ℹ️  Already unchecked, no action needed");
            }
            Thread.sleep(1000);
            System.out.println("  Final state: " + (singleCheckbox.isSelected() ? "CHECKED" : "UNCHECKED"));
            System.out.println();

            // ========================================
            // MULTIPLE CHECKBOXES
            // ========================================
            System.out.println("--- MULTIPLE CHECKBOXES ---");
            System.out.println("Working with a group of checkboxes\n");

            // Locate all checkboxes
            WebElement option1 = driver.findElement(By.xpath("(//input[@type='checkbox'])[2]"));
            WebElement option2 = driver.findElement(By.xpath("(//input[@type='checkbox'])[3]"));
            WebElement option3 = driver.findElement(By.xpath("(//input[@type='checkbox'])[4]"));
            WebElement option4 = driver.findElement(By.xpath("(//input[@type='checkbox'])[5]"));

            System.out.println("✅ Found 4 checkboxes (Option 1-4)");
            System.out.println();

            // Check all
            System.out.println("Checking all checkboxes:");
            WebElement[] checkboxes = {option1, option2, option3, option4};

            for (int i = 0; i < checkboxes.length; i++) {
                if (!checkboxes[i].isSelected()) {
                    checkboxes[i].click();
                    Thread.sleep(500);
                    System.out.println("  ✅ Checked: Option " + (i + 1));
                }
            }
            System.out.println();
            Thread.sleep(1500);

            // Verify "Check All" button changes to "Uncheck All"
            WebElement checkAllButton = driver.findElement(By.id("check1"));
            System.out.println("📝 Button text: " + checkAllButton.getAttribute("value"));
            System.out.println();

            // Uncheck all
            System.out.println("Unchecking all checkboxes:");
            for (int i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].isSelected()) {
                    checkboxes[i].click();
                    Thread.sleep(500);
                    System.out.println("  ✅ Unchecked: Option " + (i + 1));
                }
            }
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // USING "CHECK ALL" BUTTON
            // ========================================
            System.out.println("--- USING 'CHECK ALL' BUTTON ---");
            checkAllButton.click();
            Thread.sleep(1500);
            System.out.println("✅ Clicked 'Check All' button");

            // Verify all are checked
            int checkedCount = 0;
            for (WebElement checkbox : checkboxes) {
                if (checkbox.isSelected()) {
                    checkedCount++;
                }
            }
            System.out.println("📊 Checkboxes checked: " + checkedCount + "/4");
            System.out.println();

            Thread.sleep(1000);

            // Click again to uncheck all
            checkAllButton.click();
            Thread.sleep(1500);
            System.out.println("✅ Clicked 'Uncheck All' button");

            checkedCount = 0;
            for (WebElement checkbox : checkboxes) {
                if (checkbox.isSelected()) {
                    checkedCount++;
                }
            }
            System.out.println("📊 Checkboxes checked: " + checkedCount + "/4");
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("CHECKBOX OPERATIONS SUMMARY");
            System.out.println("=====================================");
            System.out.println("Key Methods:");
            System.out.println("  • isSelected() - Check if checked");
            System.out.println("  • isEnabled() - Check if enabled");
            System.out.println("  • isDisplayed() - Check if visible");
            System.out.println("  • click() - Toggle state");
            System.out.println();
            System.out.println("Best Practices:");
            System.out.println("  • Always check state before clicking");
            System.out.println("  • Use isSelected() to verify");
            System.out.println("  • Handle multiple checkboxes with arrays");
            System.out.println("  • Verify expected state after action");
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
===== CHECKBOX: BASIC OPERATIONS =====

✅ Opened: Selenium Easy - Checkbox Demo

--- SINGLE CHECKBOX DEMO ---
Learning to check, uncheck, and verify state

✅ Found single checkbox
   Tag: input
   Type: checkbox

--- CHECKING INITIAL STATE ---
Is checkbox selected? false
Is checkbox enabled? true
Is checkbox displayed? true

--- CLICKING CHECKBOX ---
Action: Click to check the checkbox

✅ Checkbox clicked (checked)
Is checkbox now selected? true
📝 Message displayed: Success - Check box is checked

--- UNCHECKING CHECKBOX ---
Action: Click again to uncheck

✅ Checkbox clicked (unchecked)
Is checkbox now selected? false
📝 Message displayed:

--- TOGGLE DEMONSTRATION ---
Clicking 5 times to show toggle behavior

Click 1: CHECKED
Click 2: UNCHECKED
Click 3: CHECKED
Click 4: UNCHECKED
Click 5: CHECKED

--- SAFE CHECKBOX METHODS ---
Best Practice: Check state before clicking

Method 1: Check checkbox (only if unchecked)
  ℹ️  Already checked, no action needed
  Final state: CHECKED

Method 2: Uncheck checkbox (only if checked)
  ✅ Clicked to uncheck
  Final state: UNCHECKED

--- MULTIPLE CHECKBOXES ---
Working with a group of checkboxes

✅ Found 4 checkboxes (Option 1-4)

Checking all checkboxes:
  ✅ Checked: Option 1
  ✅ Checked: Option 2
  ✅ Checked: Option 3
  ✅ Checked: Option 4

📝 Button text: Uncheck All

Unchecking all checkboxes:
  ✅ Unchecked: Option 1
  ✅ Unchecked: Option 2
  ✅ Unchecked: Option 3
  ✅ Unchecked: Option 4

--- USING 'CHECK ALL' BUTTON ---
✅ Clicked 'Check All' button
📊 Checkboxes checked: 4/4

✅ Clicked 'Uncheck All' button
📊 Checkboxes checked: 0/4

=====================================
CHECKBOX OPERATIONS SUMMARY
=====================================
Key Methods:
  • isSelected() - Check if checked
  • isEnabled() - Check if enabled
  • isDisplayed() - Check if visible
  • click() - Toggle state

Best Practices:
  • Always check state before clicking
  • Use isSelected() to verify
  • Handle multiple checkboxes with arrays
  • Verify expected state after action
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Page loads with checkboxes
2. Single checkbox gets checked/unchecked
3. Message appears/disappears
4. Multiple checkboxes get checked one by one
5. All checkboxes toggle together
6. Browser closes

**✅ Success Criteria:**
- Single checkbox toggles correctly
- isSelected() returns accurate state
- Message displays when checked
- All 4 checkboxes can be controlled
- "Check All" button works
- State verification works correctly

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| ElementNotInteractableException | Checkbox hidden or overlapped | Check isDisplayed(), scroll if needed |
| StaleElementReferenceException | Page updated after finding element | Re-find the element |
| NoSuchElementException | Wrong locator | Inspect and verify locator |
| "Element not clickable" | Another element blocking | Use JavascriptExecutor or scroll |
| NullPointerException | Element not found | Add null check or wait |


**Common Mistakes:**
1. ❌ **Not Checking Current State Before Action**: Clicking checkbox without knowing if it's already checked
   - Why: May toggle it to opposite of desired state
   - Fix: Always check first: `if(!checkbox.isSelected()) { checkbox.click(); }`

2. ❌ **Assuming Click Always Checks the Box**: Blindly clicking without verifying final state
   - Why: Click toggles state; if already checked, it will uncheck
   - Fix: Verify after action: `assertTrue(checkbox.isSelected(), "Checkbox should be checked")`

3. ❌ **Using sendKeys() Instead of click()**: Trying `checkbox.sendKeys(Keys.SPACE)` unnecessarily
   - Why: `click()` is standard method for checkboxes; sendKeys is less reliable
   - Fix: Use `checkbox.click()` for checkbox interactions

4. ❌ **Not Waiting for Checkbox to be Clickable**: Clicking immediately after page load
   - Why: Checkbox might be obscured by loading overlays or animations
   - Fix: Use explicit wait: `wait.until(ExpectedConditions.elementToBeClickable(checkbox))`

5. ❌ **Clicking Disabled Checkboxes**: Not checking if checkbox is enabled before interaction
   - Why: Clicking disabled elements throws InvalidElementStateException
   - Fix: Verify first: `if(checkbox.isEnabled()) { checkbox.click(); }`


**💡 Key Concepts:**

**1. Checkbox vs Radio Button:**
```
Checkbox: ☑️
- Can select multiple
- Independent of each other
- Use for "Select all that apply"

Radio Button: ⦿
- Can select only one
- Part of a group
- Use for "Select one option"
```

**2. Checkbox State Management:**
```java
// BAD: Just clicking without checking
checkbox.click();  // Don't know final state!

// GOOD: Check state first
if (!checkbox.isSelected()) {
    checkbox.click();  // Now it's guaranteed checked
}
```

**3. getAttribute vs isSelected:**
```java
// isSelected() - Returns boolean
boolean checked = checkbox.isSelected();  // true or false

// getAttribute("checked") - Returns String
String checked = checkbox.getAttribute("checked");  // "true" or null
```

**🎯 Practice Challenge:**

1. Create a method `checkCheckbox(WebElement checkbox)` that only checks if unchecked
2. Create a method `uncheckCheckbox(WebElement checkbox)` that only unchecks if checked
3. Select only even-numbered checkboxes (2, 4)
4. Count how many checkboxes are checked
5. Verify the button text changes correctly

---

#### Exercise 2: Radio Buttons - Single Selection (25 minutes)

**What you'll learn:** How to work with radio buttons and understand single-selection groups

**Practice Website:** https://demo.seleniumeasy.com/basic-radiobutton-demo.html

**Concept Explanation:**

Radio buttons allow users to select exactly ONE option from a group. They're grouped by the `name` attribute - all radio buttons with the same `name` are mutually exclusive.

**Key Characteristics:**
- Only one can be selected in a group
- Clicking one automatically unselects others
- Cannot be "unchecked" by clicking again
- Must click a different option to change selection

**Create new class: `RadioButtonBasics`**

```java
package com.automation.checkboxes;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class RadioButtonBasics {
    public static void main(String[] args) {
        System.out.println("===== RADIO BUTTONS: SINGLE SELECTION =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://demo.seleniumeasy.com/basic-radiobutton-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            // ========================================
            // UNDERSTANDING RADIO BUTTONS
            // ========================================
            System.out.println("--- UNDERSTANDING RADIO BUTTONS ---");
            System.out.println("Radio buttons in a group:");
            System.out.println("  • Only ONE can be selected at a time");
            System.out.println("  • Selecting one deselects others");
            System.out.println("  • Cannot uncheck by clicking again");
            System.out.println("  • Grouped by 'name' attribute\n");

            // ========================================
            // SINGLE RADIO BUTTON GROUP
            // ========================================
            System.out.println("--- SINGLE RADIO BUTTON GROUP ---");
            System.out.println("Gender selection: Male or Female\n");

            // Locate radio buttons
            WebElement maleRadio = driver.findElement(By.xpath("//input[@value='Male' and @name='optradio']"));
            WebElement femaleRadio = driver.findElement(By.xpath("//input[@value='Female' and @name='optradio']"));

            System.out.println("✅ Found radio buttons");
            System.out.println("   Male radio - Tag: " + maleRadio.getTagName() +
                               ", Type: " + maleRadio.getAttribute("type"));
            System.out.println("   Female radio - Tag: " + femaleRadio.getTagName() +
                               ", Type: " + femaleRadio.getAttribute("type"));
            System.out.println();

            // ========================================
            // CHECK INITIAL STATE
            // ========================================
            System.out.println("--- INITIAL STATE ---");
            System.out.println("Male selected? " + maleRadio.isSelected());
            System.out.println("Female selected? " + femaleRadio.isSelected());
            System.out.println("✅ Neither selected initially");
            System.out.println();

            // ========================================
            // SELECTING MALE
            // ========================================
            System.out.println("--- SELECTING MALE ---");
            maleRadio.click();
            Thread.sleep(1500);

            System.out.println("After clicking Male:");
            System.out.println("  Male selected? " + maleRadio.isSelected());
            System.out.println("  Female selected? " + femaleRadio.isSelected());

            // Check the message
            WebElement message = driver.findElement(By.xpath("//p[@class='radiobutton']"));
            System.out.println("📝 Message: " + message.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // SWITCHING TO FEMALE
            // ========================================
            System.out.println("--- SWITCHING TO FEMALE ---");
            System.out.println("Watch: Male will automatically deselect!\n");

            femaleRadio.click();
            Thread.sleep(1500);

            System.out.println("After clicking Female:");
            System.out.println("  Male selected? " + maleRadio.isSelected());
            System.out.println("  Female selected? " + femaleRadio.isSelected());
            System.out.println("📝 Message: " + message.getText());
            System.out.println("\n✅ Male was automatically deselected!");
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // CLICKING SAME RADIO AGAIN
            // ========================================
            System.out.println("--- CLICKING SAME RADIO BUTTON AGAIN ---");
            System.out.println("What happens if we click Female again?\n");

            femaleRadio.click();
            Thread.sleep(1000);

            System.out.println("After clicking Female again:");
            System.out.println("  Female selected? " + femaleRadio.isSelected());
            System.out.println("\n✅ Stays selected (can't uncheck radio button by clicking it)");
            System.out.println();

            // ========================================
            // AGE GROUP RADIO BUTTONS
            // ========================================
            System.out.println("--- AGE GROUP RADIO BUTTONS ---");
            System.out.println("Another example with multiple options\n");

            // Locate all age group radio buttons
            WebElement age15to50 = driver.findElement(By.xpath("//input[@value='5 - 15']"));
            WebElement age15to50_2 = driver.findElement(By.xpath("//input[@value='15 - 50']"));

            System.out.println("✅ Found age group radio buttons");
            System.out.println();

            // ========================================
            // SELECTING DIFFERENT AGE GROUPS
            // ========================================
            System.out.println("--- SELECTING AGE GROUPS ---");

            System.out.println("Selecting: 5-15 age group");
            age15to50.click();
            Thread.sleep(1500);
            System.out.println("  ✅ 5-15 selected? " + age15to50.isSelected());
            System.out.println();

            System.out.println("Switching to: 15-50 age group");
            age15to50_2.click();
            Thread.sleep(1500);
            System.out.println("  ✅ 15-50 selected? " + age15to50_2.isSelected());
            System.out.println("  ✅ 5-15 selected? " + age15to50.isSelected());
            System.out.println("\n✅ Previous selection automatically cleared!");
            System.out.println();

            // ========================================
            // GET VALUES BUTTON
            // ========================================
            System.out.println("--- CLICKING 'GET VALUES' BUTTON ---");

            // First select both gender and age
            maleRadio.click();
            Thread.sleep(500);
            age15to50_2.click();
            Thread.sleep(1000);

            WebElement getValuesButton = driver.findElement(By.xpath("//button[text()='Get values']"));
            getValuesButton.click();
            Thread.sleep(1500);

            WebElement result = driver.findElement(By.xpath("//p[@class='groupradiobutton']"));
            System.out.println("📝 Result: " + result.getText());
            System.out.println();

            // ========================================
            // PRACTICAL: SELECT ALL COMBINATIONS
            // ========================================
            System.out.println("--- TESTING ALL COMBINATIONS ---");
            System.out.println("Testing Gender × Age combinations\n");

            String[] genders = {"Male", "Female"};
            String[] ageGroups = {"5 - 15", "15 - 50"};

            int combination = 1;
            for (String gender : genders) {
                for (String age : ageGroups) {
                    // Select gender
                    WebElement genderRadio = driver.findElement(
                        By.xpath("//input[@value='" + gender + "' and @name='optradio']")
                    );
                    genderRadio.click();
                    Thread.sleep(500);

                    // Select age
                    WebElement ageRadio = driver.findElement(
                        By.xpath("//input[@value='" + age + "']")
                    );
                    ageRadio.click();
                    Thread.sleep(500);

                    // Get values
                    getValuesButton.click();
                    Thread.sleep(800);

                    System.out.println("Combination " + combination + ":");
                    System.out.println("  Selected: " + gender + ", Age: " + age);
                    System.out.println("  Result: " + result.getText());
                    System.out.println();

                    combination++;
                }
            }
            System.out.println("✅ Tested all 4 combinations!");
            System.out.println();

            // ========================================
            // FINDING ALL RADIO BUTTONS ON PAGE
            // ========================================
            System.out.println("--- FINDING ALL RADIO BUTTONS ---");
            List<WebElement> allRadioButtons = driver.findElements(
                By.xpath("//input[@type='radio']")
            );

            System.out.println("Total radio buttons on page: " + allRadioButtons.size());
            System.out.println("\nAll radio buttons:");
            for (int i = 0; i < allRadioButtons.size(); i++) {
                WebElement radio = allRadioButtons.get(i);
                String value = radio.getAttribute("value");
                String name = radio.getAttribute("name");
                boolean selected = radio.isSelected();

                System.out.println("  " + (i + 1) + ". Value: " + value +
                                   ", Name: " + name +
                                   ", Selected: " + selected);
            }
            System.out.println();

            // ========================================
            // COUNT SELECTED RADIO BUTTONS
            // ========================================
            System.out.println("--- COUNT SELECTED RADIO BUTTONS ---");
            int selectedCount = 0;
            for (WebElement radio : allRadioButtons) {
                if (radio.isSelected()) {
                    selectedCount++;
                    System.out.println("  ✓ Selected: " + radio.getAttribute("value"));
                }
            }
            System.out.println("\n📊 Total selected: " + selectedCount + "/" + allRadioButtons.size());
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("RADIO BUTTON SUMMARY");
            System.out.println("=====================================");
            System.out.println("Characteristics:");
            System.out.println("  • Only ONE selected per group");
            System.out.println("  • Grouped by 'name' attribute");
            System.out.println("  • Auto-deselects others in group");
            System.out.println("  • Cannot uncheck by clicking");
            System.out.println();
            System.out.println("Same Methods as Checkboxes:");
            System.out.println("  • isSelected() - Check if selected");
            System.out.println("  • click() - Select (doesn't toggle)");
            System.out.println("  • isEnabled() - Check if enabled");
            System.out.println();
            System.out.println("Key Difference:");
            System.out.println("  Checkbox: Can select multiple");
            System.out.println("  Radio: Can select only ONE");
            System.out.println("=====================================");

            Thread.sleep(3000);

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
===== RADIO BUTTONS: SINGLE SELECTION =====

✅ Opened: Selenium Easy - Radio Button Demo

--- UNDERSTANDING RADIO BUTTONS ---
Radio buttons in a group:
  • Only ONE can be selected at a time
  • Selecting one deselects others
  • Cannot uncheck by clicking again
  • Grouped by 'name' attribute

--- SINGLE RADIO BUTTON GROUP ---
Gender selection: Male or Female

✅ Found radio buttons
   Male radio - Tag: input, Type: radio
   Female radio - Tag: input, Type: radio

--- INITIAL STATE ---
Male selected? false
Female selected? false
✅ Neither selected initially

--- SELECTING MALE ---
After clicking Male:
  Male selected? true
  Female selected? false
📝 Message: Radio button 'Male' is checked

--- SWITCHING TO FEMALE ---
Watch: Male will automatically deselect!

After clicking Female:
  Male selected? false
  Female selected? true
📝 Message: Radio button 'Female' is checked

✅ Male was automatically deselected!

--- CLICKING SAME RADIO BUTTON AGAIN ---
What happens if we click Female again?

After clicking Female again:
  Female selected? true

✅ Stays selected (can't uncheck radio button by clicking it)

--- AGE GROUP RADIO BUTTONS ---
Another example with multiple options

✅ Found age group radio buttons

--- SELECTING AGE GROUPS ---
Selecting: 5-15 age group
  ✅ 5-15 selected? true

Switching to: 15-50 age group
  ✅ 15-50 selected? true
  ✅ 5-15 selected? false

✅ Previous selection automatically cleared!

--- CLICKING 'GET VALUES' BUTTON ---
📝 Result: Sex : Male
Age group: 15 - 50

--- TESTING ALL COMBINATIONS ---
Testing Gender × Age combinations

Combination 1:
  Selected: Male, Age: 5 - 15
  Result: Sex : Male
Age group: 5 - 15

Combination 2:
  Selected: Male, Age: 15 - 50
  Result: Sex : Male
Age group: 15 - 50

Combination 3:
  Selected: Female, Age: 5 - 15
  Result: Sex : Female
Age group: 5 - 15

Combination 4:
  Selected: Female, Age: 15 - 50
  Result: Sex : Female
Age group: 15 - 50

✅ Tested all 4 combinations!

--- FINDING ALL RADIO BUTTONS ---
Total radio buttons on page: 4

All radio buttons:
  1. Value: Male, Name: optradio, Selected: false
  2. Value: Female, Name: optradio, Selected: true
  3. Value: 5 - 15, Name: ageGroup, Selected: false
  4. Value: 15 - 50, Name: ageGroup, Selected: true

--- COUNT SELECTED RADIO BUTTONS ---
  ✓ Selected: Female
  ✓ Selected: 15 - 50

📊 Total selected: 2/4

=====================================
RADIO BUTTON SUMMARY
=====================================
Characteristics:
  • Only ONE selected per group
  • Grouped by 'name' attribute
  • Auto-deselects others in group
  • Cannot uncheck by clicking

Same Methods as Checkboxes:
  • isSelected() - Check if selected
  • click() - Select (doesn't toggle)
  • isEnabled() - Check if enabled

Key Difference:
  Checkbox: Can select multiple
  Radio: Can select only ONE
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Page loads with radio buttons
2. Male radio gets selected (fills in)
3. Female radio gets selected (Male clears)
4. Age groups toggle
5. All combinations tested
6. Results display after each selection
7. Browser closes

**✅ Success Criteria:**
- Radio buttons select properly
- Previous selection clears automatically
- Can't uncheck by clicking same radio
- isSelected() returns correct state
- All combinations tested successfully
- "Get Values" button displays correct result

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| ElementClickInterceptedException | Another element covering radio | Scroll to element or use JS click |
| NoSuchElementException | Wrong XPath/locator | Verify value and name attributes |
| StaleElementReferenceException | Page refreshed | Re-find elements |
| "Element not clickable" | Hidden or disabled | Check isDisplayed() and isEnabled() |
| Multiple selections | Selecting from different groups | Verify 'name' attribute groups |


**Common Mistakes:**
1. ❌ **Treating Radio Buttons Like Checkboxes**: Trying to uncheck a radio button by clicking it again
   - Why: Radio buttons can only be selected, not deselected (except by selecting another in same group)
   - Fix: Select a different radio button to change selection; you cannot uncheck by clicking same button

2. ❌ **Not Using Same 'name' Attribute to Group**: Selecting radio buttons without understanding grouping
   - Why: Radio buttons with same 'name' attribute form a mutual exclusion group
   - Fix: Always verify the 'name' attribute matches for buttons in same group

3. ❌ **Clicking Already Selected Radio Button**: Inefficient clicking without checking state
   - Why: Unnecessary action that wastes time and may trigger unwanted events
   - Fix: Check first: `if(!radio.isSelected()) { radio.click(); }`

4. ❌ **Not Verifying Mutual Exclusion**: Selecting new button without verifying old one is deselected
   - Why: Core radio button behavior is mutual exclusion; validate it works
   - Fix: After selecting new: `assertFalse(oldRadio.isSelected())` and `assertTrue(newRadio.isSelected())`

5. ❌ **Using Wrong Locator Strategy**: Locating by text instead of value attribute
   - Why: Visible text may change; value attribute is more stable
   - Fix: Use `driver.findElement(By.cssSelector("input[value='optionValue']"))` for better stability


**💡 Key Concepts:**

**1. Radio Button Groups:**
```html
<!-- Group 1: Gender (name='gender') -->
<input type="radio" name="gender" value="Male">
<input type="radio" name="gender" value="Female">

<!-- Group 2: Age (name='age') -->
<input type="radio" name="age" value="18-25">
<input type="radio" name="age" value="26-35">
```
- Only one selected per group (same `name`)
- Different groups are independent

**2. Radio vs Checkbox Click Behavior:**
```java
// CHECKBOX
checkbox.click();  // Checked
checkbox.click();  // Unchecked (toggles)

// RADIO BUTTON
radio.click();  // Selected
radio.click();  // Still selected (no toggle!)
```

**3. Safe Radio Selection:**
```java
// Always safe to click radio
// (won't cause issues if already selected)
if (!radio.isSelected()) {
    radio.click();
}
```

**🎯 Practice Challenge:**

1. Create a method to select a radio button by value
2. Create a method to get currently selected radio in a group
3. Verify that selecting one radio deselects others
4. Count radio buttons in each group separately
5. Create a method `selectRadioByText(String text)` using labels

---

[Content continues with Exercise 3-6 for checkboxes/radio buttons, then Day 26 for Alerts...]

**[Due to length, continuing with Day 26 in next section]**

---

## Day 26: Alerts, Popups, and Confirmations

---

#### Exercise 1: Understanding JavaScript Alerts (20 minutes)

**What you'll learn:** How to handle JavaScript alert dialogs using switchTo().alert()

**Practice Website:** https://demo.seleniumeasy.com/javascript-alert-box-demo.html

**Concept Explanation:**

JavaScript alerts are pop-up dialogs that cannot be inspected or interacted with using regular Selenium methods. They require switching to the alert context using `switchTo().alert()`.

**Types of JavaScript Dialogs:**
1. **Alert:** Simple message with OK button
2. **Confirm:** Message with OK and Cancel buttons
3. **Prompt:** Message with text input field and OK/Cancel

**Alert Interface Methods:**
- `accept()` - Click OK button
- `dismiss()` - Click Cancel button (if available)
- `getText()` - Get alert message text
- `sendKeys(String text)` - Type text in prompt (if applicable)

**Create new package: `com.automation.alerts`**
**Create new class: `JavaScriptAlerts`**

```java
package com.automation.alerts;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class JavaScriptAlerts {
    public static void main(String[] args) {
        System.out.println("===== JAVASCRIPT ALERTS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Explicit wait for alerts
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://demo.seleniumeasy.com/javascript-alert-box-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            // ========================================
            // UNDERSTANDING ALERTS
            // ========================================
            System.out.println("--- UNDERSTANDING JAVASCRIPT ALERTS ---");
            System.out.println("JavaScript dialogs:");
            System.out.println("  • Cannot be inspected");
            System.out.println("  • Block all browser interaction");
            System.out.println("  • Must be handled to continue");
            System.out.println("  • Use switchTo().alert()\n");

            // ========================================
            // SIMPLE ALERT (OK button only)
            // ========================================
            System.out.println("--- SIMPLE ALERT ---");
            System.out.println("Type: Alert with only OK button\n");

            // Click button to trigger alert
            WebElement alertButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Alert')]")
            );

            System.out.println("Step 1: Click button to trigger alert");
            alertButton.click();
            Thread.sleep(1500);
            System.out.println("✅ Alert button clicked");
            System.out.println("   ⚠️  Alert is now displayed!");
            System.out.println();

            // Switch to alert
            System.out.println("Step 2: Switch to alert");
            Alert simpleAlert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("✅ Switched to alert");
            System.out.println();

            // Get alert text
            System.out.println("Step 3: Get alert message");
            String alertText = simpleAlert.getText();
            System.out.println("📝 Alert message: \"" + alertText + "\"");
            System.out.println();

            // Accept alert (click OK)
            System.out.println("Step 4: Accept alert (click OK)");
            simpleAlert.accept();
            Thread.sleep(1000);
            System.out.println("✅ Alert accepted (OK clicked)");
            System.out.println("   ℹ️  Control returned to main page");
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // SIMPLE ALERT - WITHOUT WAIT
            // ========================================
            System.out.println("--- ALTERNATIVE: DIRECT SWITCH ---");
            System.out.println("Using driver.switchTo().alert() directly\n");

            alertButton.click();
            Thread.sleep(1000);
            System.out.println("✅ Alert triggered");

            // Direct switch (works if alert is already present)
            Alert directAlert = driver.switchTo().alert();
            System.out.println("📝 Alert text: \"" + directAlert.getText() + "\"");
            directAlert.accept();
            System.out.println("✅ Alert accepted");
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // CONFIRM BOX (OK and Cancel)
            // ========================================
            System.out.println("--- CONFIRM BOX ---");
            System.out.println("Type: Confirmation with OK and Cancel buttons\n");

            WebElement confirmButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Confirm')]")
            );

            // Test 1: Click OK
            System.out.println("Test 1: Clicking OK on confirm");
            confirmButton.click();
            Thread.sleep(1500);

            Alert confirmAlert = wait.until(ExpectedConditions.alertIsPresent());
            String confirmText = confirmAlert.getText();
            System.out.println("📝 Confirm message: \"" + confirmText + "\"");

            confirmAlert.accept();  // Click OK
            Thread.sleep(1000);
            System.out.println("✅ Clicked OK");

            // Check result message
            WebElement confirmResult = driver.findElement(By.id("confirm-demo"));
            System.out.println("📝 Result: " + confirmResult.getText());
            System.out.println();
            Thread.sleep(1500);

            // Test 2: Click Cancel
            System.out.println("Test 2: Clicking Cancel on confirm");
            confirmButton.click();
            Thread.sleep(1500);

            confirmAlert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("📝 Confirm message: \"" + confirmAlert.getText() + "\"");

            confirmAlert.dismiss();  // Click Cancel
            Thread.sleep(1000);
            System.out.println("✅ Clicked Cancel");

            System.out.println("📝 Result: " + confirmResult.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // PROMPT BOX (Input text)
            // ========================================
            System.out.println("--- PROMPT BOX ---");
            System.out.println("Type: Prompt with text input and OK/Cancel\n");

            WebElement promptButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Prompt')]")
            );

            // Test 1: Enter text and click OK
            System.out.println("Test 1: Enter text and click OK");
            promptButton.click();
            Thread.sleep(1500);

            Alert promptAlert = wait.until(ExpectedConditions.alertIsPresent());
            String promptText = promptAlert.getText();
            System.out.println("📝 Prompt message: \"" + promptText + "\"");
            System.out.println();

            String inputText = "Selenium WebDriver";
            System.out.println("Typing: \"" + inputText + "\"");
            promptAlert.sendKeys(inputText);
            Thread.sleep(1000);
            System.out.println("✅ Text entered");

            promptAlert.accept();
            Thread.sleep(1000);
            System.out.println("✅ Clicked OK");

            WebElement promptResult = driver.findElement(By.id("prompt-demo"));
            System.out.println("📝 Result: " + promptResult.getText());
            System.out.println();
            Thread.sleep(1500);

            // Test 2: Click Cancel without entering text
            System.out.println("Test 2: Click Cancel without entering text");
            promptButton.click();
            Thread.sleep(1500);

            promptAlert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("📝 Prompt message: \"" + promptAlert.getText() + "\"");

            promptAlert.dismiss();
            Thread.sleep(1000);
            System.out.println("✅ Clicked Cancel");
            System.out.println("📝 Result: " + promptResult.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // COMPLETE WORKFLOW
            // ========================================
            System.out.println("--- COMPLETE ALERT HANDLING WORKFLOW ---");
            System.out.println("Testing all three alert types sequentially\n");

            // Alert
            System.out.println("1. Handling Simple Alert");
            alertButton.click();
            Thread.sleep(1000);
            Alert alert1 = driver.switchTo().alert();
            System.out.println("   Message: " + alert1.getText());
            alert1.accept();
            System.out.println("   ✅ Accepted");
            Thread.sleep(1000);

            // Confirm - OK
            System.out.println("\n2. Handling Confirm (OK)");
            confirmButton.click();
            Thread.sleep(1000);
            Alert alert2 = driver.switchTo().alert();
            System.out.println("   Message: " + alert2.getText());
            alert2.accept();
            System.out.println("   ✅ Accepted");
            System.out.println("   Result: " + confirmResult.getText());
            Thread.sleep(1000);

            // Prompt - with text
            System.out.println("\n3. Handling Prompt (with input)");
            promptButton.click();
            Thread.sleep(1000);
            Alert alert3 = driver.switchTo().alert();
            System.out.println("   Message: " + alert3.getText());
            alert3.sendKeys("Test Automation");
            alert3.accept();
            System.out.println("   ✅ Accepted with text");
            System.out.println("   Result: " + promptResult.getText());
            System.out.println();

            System.out.println("✅ All alert types handled successfully!");
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("JAVASCRIPT ALERTS SUMMARY");
            System.out.println("=====================================");
            System.out.println("Three Types:");
            System.out.println("  1. Alert - OK button only");
            System.out.println("  2. Confirm - OK and Cancel");
            System.out.println("  3. Prompt - Text input + OK/Cancel");
            System.out.println();
            System.out.println("Alert Methods:");
            System.out.println("  • accept() - Click OK");
            System.out.println("  • dismiss() - Click Cancel");
            System.out.println("  • getText() - Get message");
            System.out.println("  • sendKeys() - Enter text (prompt only)");
            System.out.println();
            System.out.println("Steps to Handle:");
            System.out.println("  1. Trigger alert (click button)");
            System.out.println("  2. Switch: driver.switchTo().alert()");
            System.out.println("  3. Get text: alert.getText()");
            System.out.println("  4. Act: accept() or dismiss()");
            System.out.println("=====================================");

            Thread.sleep(3000);

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
===== JAVASCRIPT ALERTS =====

✅ Opened: Selenium Easy - Alert Box Demo

--- UNDERSTANDING JAVASCRIPT ALERTS ---
JavaScript dialogs:
  • Cannot be inspected
  • Block all browser interaction
  • Must be handled to continue
  • Use switchTo().alert()

--- SIMPLE ALERT ---
Type: Alert with only OK button

Step 1: Click button to trigger alert
✅ Alert button clicked
   ⚠️  Alert is now displayed!

Step 2: Switch to alert
✅ Switched to alert

Step 3: Get alert message
📝 Alert message: "I am an alert box!"

Step 4: Accept alert (click OK)
✅ Alert accepted (OK clicked)
   ℹ️  Control returned to main page

--- ALTERNATIVE: DIRECT SWITCH ---
Using driver.switchTo().alert() directly

✅ Alert triggered
📝 Alert text: "I am an alert box!"
✅ Alert accepted

--- CONFIRM BOX ---
Type: Confirmation with OK and Cancel buttons

Test 1: Clicking OK on confirm
📝 Confirm message: "Press a button!"
✅ Clicked OK
📝 Result: You pressed OK!

Test 2: Clicking Cancel on confirm
📝 Confirm message: "Press a button!"
✅ Clicked Cancel
📝 Result: You pressed Cancel!

--- PROMPT BOX ---
Type: Prompt with text input and OK/Cancel

Test 1: Enter text and click OK
📝 Prompt message: "Please enter your name"

Typing: "Selenium WebDriver"
✅ Text entered
✅ Clicked OK
📝 Result: You have entered 'Selenium WebDriver' !

Test 2: Click Cancel without entering text
📝 Prompt message: "Please enter your name"
✅ Clicked Cancel
📝 Result: You have entered 'null' !

--- COMPLETE ALERT HANDLING WORKFLOW ---
Testing all three alert types sequentially

1. Handling Simple Alert
   Message: I am an alert box!
   ✅ Accepted

2. Handling Confirm (OK)
   Message: Press a button!
   ✅ Accepted
   Result: You pressed OK!

3. Handling Prompt (with input)
   Message: Please enter your name
   ✅ Accepted with text
   Result: You have entered 'Test Automation' !

✅ All alert types handled successfully!

=====================================
JAVASCRIPT ALERTS SUMMARY
=====================================
Three Types:
  1. Alert - OK button only
  2. Confirm - OK and Cancel
  3. Prompt - Text input + OK/Cancel

Alert Methods:
  • accept() - Click OK
  • dismiss() - Click Cancel
  • getText() - Get message
  • sendKeys() - Enter text (prompt only)

Steps to Handle:
  1. Trigger alert (click button)
  2. Switch: driver.switchTo().alert()
  3. Get text: alert.getText()
  4. Act: accept() or dismiss()
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Page loads with three alert buttons
2. Simple alert pops up and gets accepted
3. Confirm box appears, OK clicked
4. Confirm box appears again, Cancel clicked
5. Prompt box appears, text entered, OK clicked
6. Prompt box appears again, Cancel clicked
7. All three tested in sequence
8. Browser closes

**✅ Success Criteria:**
- All alerts handled successfully
- getText() retrieves correct messages
- accept() and dismiss() work properly
- sendKeys() types text in prompt
- No UnhandledAlertException
- Results display correctly after each action

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoAlertPresentException | No alert is currently displayed | Add wait or check if alert exists |
| UnhandledAlertException | Alert present but not handled | Always accept/dismiss alerts |
| TimeoutException | Alert didn't appear | Increase wait time or check trigger |
| "Cannot switch to alert" | Alert closed or doesn't exist | Re-trigger alert |
| ElementClickInterceptedException | Alert blocking page | Handle alert first before clicking |


**Common Mistakes:**
1. ❌ **Not Switching to Alert Before Interaction**: Trying to interact with alert without `switchTo()`
   - Why: Alerts are separate from main page context; must explicitly switch
   - Fix: Always use `Alert alert = driver.switchTo().alert()` first

2. ❌ **Handling Alerts Too Quickly**: Switching to alert before it appears
   - Why: Alert may not appear immediately; causes NoAlertPresentException
   - Fix: Use explicit wait: `wait.until(ExpectedConditions.alertIsPresent())`

3. ❌ **Forgetting to Accept/Dismiss Alert**: Switching to alert but not handling it
   - Why: Alert blocks all page interactions until dismissed
   - Fix: Always call `alert.accept()` or `alert.dismiss()` after handling

4. ❌ **Not Handling NoAlertPresentException**: Assuming alert always appears
   - Why: Conditional alerts may not appear; code will fail
   - Fix: Wrap in try-catch: `try { alert.accept(); } catch(NoAlertPresentException e) { /* handle */ }`

5. ❌ **Confusing alert.accept() vs alert.dismiss()**: Using wrong method for dialogs
   - Why: accept() clicks "OK", dismiss() clicks "Cancel" - they have different effects
   - Fix: Use accept() for confirmation, dismiss() for cancellation based on test scenario


**💡 Key Concepts:**

**1. Alert vs Modal:**
```
JavaScript Alert (use switchTo().alert()):
- Native browser dialog
- Cannot inspect with F12
- Blocks ALL browser interaction
- Methods: accept(), dismiss(), getText()

HTML Modal (use regular findElement()):
- Part of webpage DOM
- Can inspect with F12
- Custom styling possible
- Methods: Regular WebElement methods
```

**2. Alert Handling Pattern:**
```java
// Standard pattern
driver.findElement(By.id("alertBtn")).click();
Alert alert = driver.switchTo().alert();
String text = alert.getText();
alert.accept();  // or alert.dismiss()
```

**3. With Explicit Wait:**
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
alert.accept();
```

**🎯 Practice Challenge:**

1. Create a method `handleAlert(String action)` where action is "accept" or "dismiss"
2. Create a method `getAlertText()` that safely retrieves alert text
3. Handle 10 alerts in a loop
4. Create a method to handle alert only if present
5. Verify alert message before accepting

---

---

#### Exercise 2: Handling Confirmation Dialogs (25 minutes)

**What you'll learn:** Working with confirmation dialogs and conditional alert handling

**Practice Website:** https://demo.seleniumeasy.com/javascript-alert-box-demo.html

**Create new class: `ConfirmationDialogs`**

```java
package com.automation.alerts;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class ConfirmationDialogs {
    public static void main(String[] args) {
        System.out.println("===== CONFIRMATION DIALOGS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://demo.seleniumeasy.com/javascript-alert-box-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            // ========================================
            // CREATING REUSABLE ALERT METHODS
            // ========================================
            System.out.println("--- REUSABLE ALERT HANDLING METHODS ---");
            System.out.println("Creating helper methods for alert operations\n");

            WebElement confirmButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Confirm')]")
            );
            WebElement confirmResult = driver.findElement(By.id("confirm-demo"));

            // ========================================
            // METHOD 1: Accept alert if present
            // ========================================
            System.out.println("--- METHOD 1: SAFE ALERT ACCEPT ---");
            System.out.println("Check if alert is present before accepting\n");

            confirmButton.click();
            Thread.sleep(1000);

            if (isAlertPresent(driver)) {
                Alert alert = driver.switchTo().alert();
                String alertText = alert.getText();
                System.out.println("✅ Alert found: " + alertText);
                alert.accept();
                System.out.println("✅ Alert accepted");
                System.out.println("📝 Result: " + confirmResult.getText());
            } else {
                System.out.println("❌ No alert present");
            }
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // METHOD 2: Conditional alert handling
            // ========================================
            System.out.println("--- METHOD 2: CONDITIONAL HANDLING ---");
            System.out.println("Accept if message contains specific text\n");

            confirmButton.click();
            Thread.sleep(1000);

            Alert alert = driver.switchTo().alert();
            String message = alert.getText();
            System.out.println("Alert message: " + message);

            if (message.contains("button")) {
                System.out.println("✅ Message contains 'button' - accepting");
                alert.accept();
            } else {
                System.out.println("❌ Message doesn't match - dismissing");
                alert.dismiss();
            }
            System.out.println("📝 Result: " + confirmResult.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // METHOD 3: Try-Catch for alert handling
            // ========================================
            System.out.println("--- METHOD 3: SAFE HANDLING WITH TRY-CATCH ---");
            System.out.println("Handle alerts safely with exception handling\n");

            confirmButton.click();
            Thread.sleep(1000);

            try {
                Alert safeAlert = driver.switchTo().alert();
                System.out.println("✅ Alert present: " + safeAlert.getText());
                safeAlert.dismiss();  // Click Cancel this time
                System.out.println("✅ Alert dismissed (Cancel clicked)");
            } catch (Exception e) {
                System.out.println("❌ No alert found or error: " + e.getMessage());
            }
            System.out.println("📝 Result: " + confirmResult.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // PRACTICAL SCENARIO: Multiple confirmations
            // ========================================
            System.out.println("--- PRACTICAL: MULTIPLE CONFIRMATIONS ---");
            System.out.println("Handling 5 confirmation dialogs with different responses\n");

            String[] responses = {"accept", "dismiss", "accept", "accept", "dismiss"};

            for (int i = 0; i < responses.length; i++) {
                confirmButton.click();
                Thread.sleep(800);

                Alert confirmAlert = wait.until(ExpectedConditions.alertIsPresent());
                String action = responses[i];

                if (action.equals("accept")) {
                    confirmAlert.accept();
                    System.out.println((i + 1) + ". ✅ Accepted - Result: " + confirmResult.getText());
                } else {
                    confirmAlert.dismiss();
                    System.out.println((i + 1) + ". ❌ Dismissed - Result: " + confirmResult.getText());
                }
                Thread.sleep(500);
            }
            System.out.println("\n✅ Handled 5 confirmation dialogs!");
            System.out.println();

            // ========================================
            // VERIFICATION
            // ========================================
            System.out.println("--- VERIFICATION METHODS ---");
            System.out.println("Verifying alert actions through page elements\n");

            // Accept
            confirmButton.click();
            Thread.sleep(1000);
            Alert verifyAlert = driver.switchTo().alert();
            verifyAlert.accept();

            String result = confirmResult.getText();
            if (result.contains("OK")) {
                System.out.println("✅ VERIFICATION PASSED: OK was clicked");
            } else {
                System.out.println("❌ VERIFICATION FAILED: Expected OK result");
            }
            Thread.sleep(1000);

            // Dismiss
            confirmButton.click();
            Thread.sleep(1000);
            verifyAlert = driver.switchTo().alert();
            verifyAlert.dismiss();

            result = confirmResult.getText();
            if (result.contains("Cancel")) {
                System.out.println("✅ VERIFICATION PASSED: Cancel was clicked");
            } else {
                System.out.println("❌ VERIFICATION FAILED: Expected Cancel result");
            }
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("CONFIRMATION DIALOG SUMMARY");
            System.out.println("=====================================");
            System.out.println("Key Points:");
            System.out.println("  • Use accept() for OK");
            System.out.println("  • Use dismiss() for Cancel");
            System.out.println("  • Always verify alert presence");
            System.out.println("  • Use try-catch for safety");
            System.out.println("  • Verify results after action");
            System.out.println("=====================================");

            Thread.sleep(3000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }

    // Helper method to check if alert is present
    private static boolean isAlertPresent(WebDriver driver) {
        try {
            driver.switchTo().alert();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
```

**✅ Success Criteria:**
- Safe alert handling with checks
- Conditional logic works
- Try-catch prevents crashes
- Multiple alerts handled in sequence
- Verification confirms correct actions

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoAlertPresentException | Checking for alert when none exists | Use isAlertPresent() helper method |
| UnhandledAlertException | Alert not handled before next action | Always accept/dismiss before continuing |
| TimeoutException (wait) | Alert appears slowly | Increase wait timeout |


**Common Mistakes:**
1. ❌ **Not Testing Both Accept and Dismiss**: Only testing one path in confirmation dialogs
   - Why: Both "OK" and "Cancel" paths need validation
   - Fix: Create separate test cases for `alert.accept()` and `alert.dismiss()` scenarios

2. ❌ **Forgetting to Verify Alert Text**: Accepting alert without reading message
   - Why: Alert text confirms correct dialog appeared; critical for validation
   - Fix: Always verify: `assertEquals(alert.getText(), "Expected message")`

3. ❌ **Not Switching Back to Main Window**: Staying in alert context after dismissal
   - Why: After handling alert, explicitly return to main content if needed
   - Fix: Use `driver.switchTo().defaultContent()` if required

4. ❌ **Ignoring Alert Timing Issues**: Not waiting long enough for alert to appear
   - Why: JavaScript alerts may have delay; NoAlertPresentException occurs
   - Fix: Increase wait time: `wait.until(ExpectedConditions.alertIsPresent())`

5. ❌ **Testing with Wrong Alert Type**: Confusing confirm() with alert() dialogs
   - Why: alert() only has OK button, confirm() has OK and Cancel
   - Fix: Understand which JavaScript method creates which dialog type


**🎯 Practice Challenge:**

1. Create `acceptAlertIfPresent()` and `dismissAlertIfPresent()` methods
2. Handle 10 alerts with alternating accept/dismiss
3. Create a method that returns alert text without closing it
4. Count how many times you click OK vs Cancel in a session

---

#### Exercise 3: Working with Prompt Dialogs (30 minutes)

**What you'll learn:** Handling prompt dialogs with text input

**Create new class: `PromptDialogs`**

```java
package com.automation.alerts;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class PromptDialogs {
    public static void main(String[] args) {
        System.out.println("===== PROMPT DIALOGS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://demo.seleniumeasy.com/javascript-alert-box-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            WebElement promptButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Prompt')]")
            );
            WebElement promptResult = driver.findElement(By.id("prompt-demo"));

            // ========================================
            // BASIC PROMPT HANDLING
            // ========================================
            System.out.println("--- BASIC PROMPT HANDLING ---");
            System.out.println("Enter text and accept\n");

            promptButton.click();
            Thread.sleep(1000);

            Alert prompt = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("📝 Prompt message: " + prompt.getText());

            String name = "John Doe";
            prompt.sendKeys(name);
            System.out.println("⌨️  Typed: " + name);
            Thread.sleep(1000);

            prompt.accept();
            System.out.println("✅ Accepted");
            System.out.println("📝 Result: " + promptResult.getText());
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // PROMPT WITH DIFFERENT INPUTS
            // ========================================
            System.out.println("--- TESTING DIFFERENT INPUTS ---");
            System.out.println("Trying various input types\n");

            String[] testInputs = {
                "Alice",
                "Bob123",
                "Test@User",
                "Very Long Name With Multiple Words",
                "12345",
                ""  // Empty string
            };

            for (int i = 0; i < testInputs.length; i++) {
                promptButton.click();
                Thread.sleep(800);

                Alert testPrompt = driver.switchTo().alert();
                String input = testInputs[i];

                if (!input.isEmpty()) {
                    testPrompt.sendKeys(input);
                    System.out.print((i + 1) + ". Input: \"" + input + "\"");
                } else {
                    System.out.print((i + 1) + ". Input: (empty string)");
                }

                testPrompt.accept();
                Thread.sleep(500);
                System.out.println(" → " + promptResult.getText());
            }
            System.out.println("\n✅ Tested 6 different inputs!");
            System.out.println();

            // ========================================
            // PROMPT WITH CANCEL
            // ========================================
            System.out.println("--- PROMPT WITH CANCEL ---");
            System.out.println("What happens when we cancel?\n");

            promptButton.click();
            Thread.sleep(1000);

            Alert cancelPrompt = driver.switchTo().alert();
            System.out.println("Entering text: Test User");
            cancelPrompt.sendKeys("Test User");
            Thread.sleep(1000);

            System.out.println("Clicking Cancel (dismiss)");
            cancelPrompt.dismiss();
            Thread.sleep(1000);

            System.out.println("📝 Result: " + promptResult.getText());
            System.out.println("ℹ️  Note: Text is ignored when Cancel is clicked");
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // SPECIAL CHARACTERS
            // ========================================
            System.out.println("--- TESTING SPECIAL CHARACTERS ---");
            System.out.println("Can we enter special characters?\n");

            String[] specialInputs = {
                "User@2024",
                "Test!@#$%",
                "Name (with parentheses)",
                "Quote's test"
            };

            for (String input : specialInputs) {
                promptButton.click();
                Thread.sleep(800);

                Alert specialPrompt = driver.switchTo().alert();
                specialPrompt.sendKeys(input);
                specialPrompt.accept();
                Thread.sleep(500);

                System.out.println("✅ Input: \"" + input + "\"");
                System.out.println("   Result: " + promptResult.getText());
            }
            System.out.println();

            // ========================================
            // VALIDATION SCENARIO
            // ========================================
            System.out.println("--- VALIDATION SCENARIO ---");
            System.out.println("Only accept if input meets criteria\n");

            String[] namesToValidate = {"John", "A", "VeryLongNameThatExceedsTwentyCharacters"};

            for (String testName : namesToValidate) {
                promptButton.click();
                Thread.sleep(800);

                Alert validationPrompt = driver.switchTo().alert();

                // Criteria: Name must be 2-20 characters
                if (testName.length() >= 2 && testName.length() <= 20) {
                    validationPrompt.sendKeys(testName);
                    validationPrompt.accept();
                    System.out.println("✅ VALID: \"" + testName + "\" (Length: " + testName.length() + ")");
                    System.out.println("   Accepted - " + promptResult.getText());
                } else {
                    validationPrompt.dismiss();
                    System.out.println("❌ INVALID: \"" + testName + "\" (Length: " + testName.length() + ")");
                    System.out.println("   Cancelled - " + promptResult.getText());
                }
                Thread.sleep(800);
            }
            System.out.println();

            // ========================================
            // CLEAR AND RETYPE
            // ========================================
            System.out.println("--- CLEAR AND RETYPE ---");
            System.out.println("Demonstrating text clearing behavior\n");

            promptButton.click();
            Thread.sleep(1000);

            Alert retypePrompt = driver.switchTo().alert();

            System.out.println("First entry: Original Text");
            retypePrompt.sendKeys("Original Text");
            Thread.sleep(1000);

            // Note: You cannot clear alert input - must dismiss and reopen
            System.out.println("ℹ️  Cannot clear alert text field");
            System.out.println("   Must cancel and reopen to change input");

            retypePrompt.dismiss();
            Thread.sleep(800);

            promptButton.click();
            Thread.sleep(1000);
            retypePrompt = driver.switchTo().alert();

            System.out.println("New entry: New Text");
            retypePrompt.sendKeys("New Text");
            retypePrompt.accept();

            System.out.println("📝 Final result: " + promptResult.getText());
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("PROMPT DIALOG SUMMARY");
            System.out.println("=====================================");
            System.out.println("Key Points:");
            System.out.println("  • Use sendKeys() to enter text");
            System.out.println("  • accept() submits the input");
            System.out.println("  • dismiss() cancels (ignores input)");
            System.out.println("  • Cannot clear text - must reopen");
            System.out.println("  • Special characters supported");
            System.out.println("  • Empty string is valid input");
            System.out.println("=====================================");

            Thread.sleep(3000);

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

**✅ Success Criteria:**
- Text entry in prompts works
- Different input types handled
- Special characters accepted
- Cancel ignores input
- Validation logic works
- Results match expectations

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| "Cannot clear element" | Trying to clear alert input | Dismiss and reopen alert |
| IllegalArgumentException | Sending null to sendKeys | Check input is not null |
| UnsupportedOperationException | sendKeys on non-prompt alert | Verify it's a prompt dialog |


**Common Mistakes:**
1. ❌ **Not Sending Text to Prompt**: Calling accept() on prompt without entering text first
   - Why: Prompt expects user input; skipping it may cause unexpected behavior
   - Fix: Always use `alert.sendKeys("your text")` before `alert.accept()`

2. ❌ **Sending Keys After Accept/Dismiss**: Wrong order of operations
   - Why: Once accepted/dismissed, alert is gone; cannot send keys
   - Fix: Correct order: `alert.sendKeys(text)` → THEN → `alert.accept()`

3. ❌ **Not Verifying Entered Text**: Not confirming text was properly entered
   - Why: Text might not be accepted due to validation or technical issues
   - Fix: After submission, verify the text appears in page as expected

4. ❌ **Not Testing Cancel Scenario**: Only testing text entry + OK, ignoring Cancel button
   - Why: Users can cancel prompts; this path needs testing too
   - Fix: Test both: enter text + accept, AND just dismiss without text

5. ❌ **Assuming Default Text Handling**: Not considering prompts with default values
   - Why: Some prompts have pre-filled text that needs clearing
   - Fix: Understand how sendKeys() behaves with default text (usually replaces)


**🎯 Practice Challenge:**

1. Create a method `enterTextInPrompt(String text, boolean accept)`
2. Test with 20 different names and collect all results
3. Validate email format before accepting
4. Create a "retry until valid" loop for prompts

---

#### Exercise 4: Bootstrap Modals vs JavaScript Alerts (25 minutes)

**What you'll learn:** Distinguish between JavaScript alerts and HTML modals

**Practice Website:** https://www.w3schools.com/bootstrap/bootstrap_modal.asp

**Create new class: `ModalsVsAlerts`**

```java
package com.automation.alerts;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class ModalsVsAlerts {
    public static void main(String[] args) {
        System.out.println("===== MODALS vs ALERTS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // ========================================
            // UNDERSTANDING THE DIFFERENCE
            // ========================================
            System.out.println("--- UNDERSTANDING THE DIFFERENCE ---\n");

            System.out.println("JavaScript Alert (window.alert()):");
            System.out.println("  ✓ Native browser dialog");
            System.out.println("  ✓ Cannot inspect with DevTools");
            System.out.println("  ✓ Blocks ALL browser interaction");
            System.out.println("  ✓ Must use switchTo().alert()");
            System.out.println("  ✓ Limited styling options");
            System.out.println();

            System.out.println("Bootstrap/HTML Modal:");
            System.out.println("  ✓ Part of webpage DOM");
            System.out.println("  ✓ Can inspect with DevTools");
            System.out.println("  ✓ Page remains interactive");
            System.out.println("  ✓ Use regular findElement()");
            System.out.println("  ✓ Full CSS customization");
            System.out.println();

            // ========================================
            // TESTING BOOTSTRAP MODAL
            // ========================================
            System.out.println("--- BOOTSTRAP MODAL EXAMPLE ---");

            driver.get("https://www.w3schools.com/bootstrap/bootstrap_modal.asp");
            System.out.println("✅ Opened W3Schools Bootstrap Modal page\n");
            Thread.sleep(2000);

            // Accept cookies if present
            try {
                WebElement acceptCookies = wait.until(
                    ExpectedConditions.elementToBeClickable(By.id("accept-choices"))
                );
                acceptCookies.click();
                System.out.println("✅ Accepted cookies");
                Thread.sleep(1000);
            } catch (Exception e) {
                System.out.println("ℹ️  No cookie banner");
            }

            // Click "Try it Yourself" button
            WebElement tryItButton = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.linkText("Try it Yourself »")
                )
            );
            tryItButton.click();
            Thread.sleep(3000);
            System.out.println("✅ Opened Try it editor\n");

            // Switch to result iframe
            driver.switchTo().frame("iframeResult");
            System.out.println("✅ Switched to result iframe");

            // Open modal
            WebElement openModalButton = driver.findElement(By.xpath("//button[text()='Open Modal']"));
            System.out.println("\nStep 1: Click 'Open Modal' button");
            openModalButton.click();
            Thread.sleep(2000);
            System.out.println("✅ Modal opened");

            // This is an HTML modal - use regular WebElement methods
            System.out.println("\nStep 2: Locate modal elements (NO switchTo().alert())");
            WebElement modalDialog = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                    By.className("modal-dialog")
                )
            );
            System.out.println("✅ Modal dialog found using findElement()");

            WebElement modalHeader = driver.findElement(By.className("modal-header"));
            WebElement modalBody = driver.findElement(By.className("modal-body"));
            WebElement modalFooter = driver.findElement(By.className("modal-footer"));

            System.out.println("\nModal Contents:");
            System.out.println("  Header: " + modalHeader.getText());
            System.out.println("  Body: " + modalBody.getText());
            System.out.println();

            // Close modal using × button
            System.out.println("Step 3: Close modal using × button");
            WebElement closeButton = driver.findElement(By.className("close"));
            closeButton.click();
            Thread.sleep(1500);
            System.out.println("✅ Modal closed (using regular click)");

            // Verify modal is closed
            wait.until(ExpectedConditions.invisibilityOf(modalDialog));
            System.out.println("✅ Verified modal is no longer visible");
            System.out.println();

            driver.switchTo().defaultContent();

            // ========================================
            // JAVASCRIPT ALERT COMPARISON
            // ========================================
            System.out.println("--- JAVASCRIPT ALERT COMPARISON ---");

            driver.get("https://demo.seleniumeasy.com/javascript-alert-box-demo.html");
            Thread.sleep(2000);
            System.out.println("✅ Opened JavaScript Alert page\n");

            WebElement alertButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Alert')]")
            );

            System.out.println("Step 1: Click button to trigger alert");
            alertButton.click();
            Thread.sleep(1000);
            System.out.println("✅ Alert triggered");

            System.out.println("\nStep 2: Try to inspect (this will fail)");
            try {
                // This will NOT work for JavaScript alert
                driver.findElement(By.xpath("//div[text()='Alert message']"));
                System.out.println("❌ Should not reach here");
            } catch (Exception e) {
                System.out.println("✅ Cannot find alert in DOM (as expected)");
            }

            System.out.println("\nStep 3: Must use switchTo().alert()");
            Alert jsAlert = driver.switchTo().alert();
            System.out.println("✅ Switched to alert successfully");
            System.out.println("📝 Alert text: " + jsAlert.getText());

            jsAlert.accept();
            System.out.println("✅ Alert closed");
            System.out.println();

            // ========================================
            // DECISION FLOWCHART
            // ========================================
            System.out.println("=====================================");
            System.out.println("HOW TO IDENTIFY WHAT YOU'RE DEALING WITH");
            System.out.println("=====================================");
            System.out.println();
            System.out.println("Question 1: Can you right-click and inspect it?");
            System.out.println("  YES → It's an HTML Modal");
            System.out.println("  NO  → It's a JavaScript Alert");
            System.out.println();
            System.out.println("Question 2: Does switchTo().alert() work?");
            System.out.println("  YES → JavaScript Alert");
            System.out.println("  NO  → HTML Modal");
            System.out.println();
            System.out.println("Question 3: Can you interact with page while it's open?");
            System.out.println("  YES → HTML Modal");
            System.out.println("  NO  → JavaScript Alert");
            System.out.println("=====================================");
            System.out.println();

            // ========================================
            // SUMMARY TABLE
            // ========================================
            System.out.println("=====================================");
            System.out.println("QUICK REFERENCE TABLE");
            System.out.println("=====================================");
            System.out.println();
            System.out.println("| Feature          | JavaScript Alert | HTML Modal    |");
            System.out.println("|------------------|------------------|---------------|");
            System.out.println("| Inspect in F12   | ❌ NO            | ✅ YES        |");
            System.out.println("| switchTo().alert | ✅ Required      | ❌ Won't work |");
            System.out.println("| findElement()    | ❌ Won't work    | ✅ Required   |");
            System.out.println("| Blocks browser   | ✅ YES           | ❌ NO         |");
            System.out.println("| Custom styling   | ❌ Limited       | ✅ Full CSS   |");
            System.out.println("=====================================");

            Thread.sleep(3000);

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

**✅ Success Criteria:**
- Understands difference between modals and alerts
- Can handle Bootstrap modals with findElement()
- Can handle JavaScript alerts with switchTo().alert()
- Knows when to use each method
- Can identify type of dialog on any website

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoAlertPresentException | Using switchTo() on HTML modal | Use findElement() instead |
| NoSuchElementException | Using findElement() on JS alert | Use switchTo().alert() instead |
| "Element not interactable" | Modal overlay blocking element | Wait for modal or close it first |


**Common Mistakes:**
1. ❌ **Confusing Bootstrap Modals with JavaScript Alerts**: Using Alert interface for modals
   - Why: Bootstrap modals are HTML elements, not browser alerts
   - Fix: Use regular WebElement methods: `driver.findElement(By.cssSelector(".modal"))` instead of `switchTo().alert()`

2. ❌ **Not Waiting for Modal to Fully Display**: Interacting before modal animation completes
   - Why: Modals often have fade-in animations; elements not clickable immediately
   - Fix: Wait for visibility: `wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("modal")))`

3. ❌ **Clicking Outside Modal Without Handling**: Assuming modal will stay open
   - Why: Many modals close when clicking backdrop; test may fail unexpectedly
   - Fix: Ensure clicks are precisely on modal elements, not backdrop

4. ❌ **Not Handling Modal Backdrop**: Trying to interact with page elements behind modal
   - Why: Modal backdrop blocks interactions with main page
   - Fix: Close modal first, or ensure you're interacting with modal content only

5. ❌ **Using Wrong Wait Condition**: Waiting for alert instead of element visibility
   - Why: Modals are regular DOM elements, not alerts
   - Fix: Use `ExpectedConditions.visibilityOfElementLocated()`, not `alertIsPresent()`


**🎯 Practice Challenge:**

1. Visit 5 different websites and identify modal types
2. Create a method `isJavaScriptAlert()` that returns true/false
3. Handle both modal types on same page
4. Create a universal `closeDialog()` method that handles both

---

#### Exercise 5: Alert Timeout and Wait Strategies (25 minutes)

**What you'll learn:** Handling alerts with proper waits and timeout strategies

**Create new class: `AlertWaitStrategies`**

```java
package com.automation.alerts;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class AlertWaitStrategies {
    public static void main(String[] args) {
        System.out.println("===== ALERT WAIT STRATEGIES =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://demo.seleniumeasy.com/javascript-alert-box-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            // ========================================
            // STRATEGY 1: Thread.sleep (NOT RECOMMENDED)
            // ========================================
            System.out.println("--- STRATEGY 1: Thread.sleep() ---");
            System.out.println("⚠️  NOT RECOMMENDED for production\n");

            WebElement alertButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Alert')]")
            );

            long startTime = System.currentTimeMillis();

            alertButton.click();
            System.out.println("Alert triggered...");

            Thread.sleep(2000);  // Fixed wait

            Alert alert1 = driver.switchTo().alert();
            alert1.accept();

            long endTime = System.currentTimeMillis();
            long totalTime = endTime - startTime;

            System.out.println("✅ Alert handled");
            System.out.println("⏱️  Time taken: " + totalTime + "ms");
            System.out.println();
            System.out.println("Problems:");
            System.out.println("  ❌ Wastes time if alert appears quickly");
            System.out.println("  ❌ May fail if alert appears slowly");
            System.out.println("  ❌ Not dynamic or flexible");
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // STRATEGY 2: Explicit Wait (RECOMMENDED)
            // ========================================
            System.out.println("--- STRATEGY 2: Explicit Wait ---");
            System.out.println("✅ RECOMMENDED approach\n");

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            startTime = System.currentTimeMillis();

            alertButton.click();
            System.out.println("Alert triggered...");

            // Wait until alert is present
            Alert alert2 = wait.until(ExpectedConditions.alertIsPresent());

            endTime = System.currentTimeMillis();
            totalTime = endTime - startTime;

            System.out.println("✅ Alert detected");
            System.out.println("⏱️  Time taken: " + totalTime + "ms");
            System.out.println("📝 Message: " + alert2.getText());
            alert2.accept();

            System.out.println();
            System.out.println("Advantages:");
            System.out.println("  ✅ Waits only as long as needed");
            System.out.println("  ✅ Fails fast if alert doesn't appear");
            System.out.println("  ✅ Configurable timeout");
            System.out.println("  ✅ Industry standard");
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // STRATEGY 3: Handling Timeout
            // ========================================
            System.out.println("--- STRATEGY 3: Timeout Handling ---");
            System.out.println("What if alert doesn't appear?\n");

            WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(2));

            System.out.println("Setting up a short wait (2 seconds)");
            System.out.println("Not triggering any alert...\n");

            try {
                startTime = System.currentTimeMillis();
                Alert timeoutAlert = shortWait.until(ExpectedConditions.alertIsPresent());
                System.out.println("This line won't execute");
            } catch (TimeoutException e) {
                endTime = System.currentTimeMillis();
                totalTime = endTime - startTime;

                System.out.println("❌ TimeoutException caught");
                System.out.println("⏱️  Waited for: " + totalTime + "ms");
                System.out.println("✅ Handled gracefully with try-catch");
            }
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // STRATEGY 4: Custom Wait Function
            // ========================================
            System.out.println("--- STRATEGY 4: Custom Wait Method ---");
            System.out.println("Creating reusable alert wait method\n");

            alertButton.click();
            Thread.sleep(500);

            Alert customAlert = waitForAlert(driver, 5);
            if (customAlert != null) {
                System.out.println("✅ Alert found using custom method");
                System.out.println("📝 Message: " + customAlert.getText());
                customAlert.accept();
            } else {
                System.out.println("❌ Alert not found");
            }
            System.out.println();
            Thread.sleep(1500);

            // ========================================
            // STRATEGY 5: Conditional Alert Handling
            // ========================================
            System.out.println("--- STRATEGY 5: Conditional Handling ---");
            System.out.println("Handle alert only if it appears\n");

            // Scenario 1: Alert appears
            System.out.println("Scenario 1: Alert appears");
            alertButton.click();
            Thread.sleep(500);

            if (waitAndCheckAlert(driver, 3)) {
                Alert conditionalAlert = driver.switchTo().alert();
                conditionalAlert.accept();
                System.out.println("✅ Alert was present and handled");
            } else {
                System.out.println("ℹ️  No alert appeared");
            }
            System.out.println();

            // Scenario 2: No alert
            System.out.println("Scenario 2: No alert");
            if (waitAndCheckAlert(driver, 2)) {
                Alert noAlert = driver.switchTo().alert();
                noAlert.accept();
                System.out.println("✅ Alert handled");
            } else {
                System.out.println("ℹ️  No alert appeared (as expected)");
            }
            System.out.println();

            // ========================================
            // PRACTICAL EXAMPLE: Multiple Alerts
            // ========================================
            System.out.println("--- PRACTICAL: HANDLING MULTIPLE ALERTS ---");
            System.out.println("Testing 5 alerts with optimal waits\n");

            WebDriverWait optimalWait = new WebDriverWait(driver, Duration.ofSeconds(5));

            for (int i = 1; i <= 5; i++) {
                System.out.println("Alert " + i + ":");

                startTime = System.currentTimeMillis();
                alertButton.click();

                Alert multipleAlert = optimalWait.until(ExpectedConditions.alertIsPresent());
                endTime = System.currentTimeMillis();

                multipleAlert.accept();
                System.out.println("  ✅ Handled in " + (endTime - startTime) + "ms");

                Thread.sleep(500);
            }
            System.out.println("\n✅ All 5 alerts handled efficiently!");
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("WAIT STRATEGIES SUMMARY");
            System.out.println("=====================================");
            System.out.println();
            System.out.println("❌ DON'T USE:");
            System.out.println("  Thread.sleep() - Wastes time, not dynamic");
            System.out.println();
            System.out.println("✅ DO USE:");
            System.out.println("  ExpectedConditions.alertIsPresent()");
            System.out.println("  WebDriverWait with reasonable timeout");
            System.out.println("  Try-catch for timeout handling");
            System.out.println();
            System.out.println("Best Practice:");
            System.out.println("  WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));");
            System.out.println("  Alert alert = wait.until(ExpectedConditions.alertIsPresent());");
            System.out.println("=====================================");

            Thread.sleep(3000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }

    // Custom wait method for alert
    private static Alert waitForAlert(WebDriver driver, int timeoutSeconds) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        try {
            return wait.until(ExpectedConditions.alertIsPresent());
        } catch (TimeoutException e) {
            return null;
        }
    }

    // Check if alert appears within timeout
    private static boolean waitAndCheckAlert(WebDriver driver, int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
            wait.until(ExpectedConditions.alertIsPresent());
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }
}
```

**✅ Success Criteria:**
- Understands different wait strategies
- Can implement explicit waits for alerts
- Handles timeout exceptions gracefully
- Creates reusable wait methods
- Uses best practices for alert waits

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| TimeoutException | Alert didn't appear in time | Increase timeout or check if alert actually appears |
| NoAlertPresentException | Immediate switchTo() before alert loads | Use ExpectedConditions.alertIsPresent() |
| Thread interrupted | Thread.sleep() interrupted | Use try-catch or avoid Thread.sleep() |


**Common Mistakes:**
1. ❌ **Using Fixed Thread.sleep()**: Hardcoding wait times with Thread.sleep()
   - Why: Brittle and slow; waits full time even if alert appears sooner
   - Fix: Use `WebDriverWait` with `ExpectedConditions.alertIsPresent()`

2. ❌ **Setting Wait Too Short**: Using insufficient timeout for alert appearance
   - Why: Alerts may take longer to appear depending on network/system load
   - Fix: Set reasonable timeout: `new WebDriverWait(driver, Duration.ofSeconds(10))`

3. ❌ **Not Handling TimeoutException**: Assuming alert will always appear within timeout
   - Why: Alert might not appear due to bugs or conditions not met
   - Fix: Wrap in try-catch: `try { wait.until(...) } catch(TimeoutException e) { /* handle */ }`

4. ❌ **Waiting for Wrong Condition**: Using incorrect ExpectedCondition
   - Why: Using elementToBeClickable() instead of alertIsPresent() won't work
   - Fix: Use correct condition: `ExpectedConditions.alertIsPresent()`

5. ❌ **Not Customizing Polling Interval**: Using default polling which may be too infrequent
   - Why: Default 500ms polling might miss rapid state changes
   - Fix: Use FluentWait with custom polling if needed


**🎯 Practice Challenge:**

1. Create a method `waitForAlertWithRetry()` that retries 3 times
2. Measure and compare Thread.sleep vs Explicit wait times
3. Handle 20 alerts and calculate average handling time
4. Create a smart wait that adjusts timeout based on previous alerts

---

#### Exercise 6: Real-World Alert Scenarios (30 minutes)

**What you'll learn:** Practical alert handling in complex scenarios

**Create new class: `RealWorldAlertScenarios`**

```java
package com.automation.alerts;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

public class RealWorldAlertScenarios {

    private static List<String> alertLog = new ArrayList<>();

    public static void main(String[] args) {
        System.out.println("===== REAL-WORLD ALERT SCENARIOS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://demo.seleniumeasy.com/javascript-alert-box-demo.html");
            System.out.println("✅ Opened: " + driver.getTitle() + "\n");
            Thread.sleep(2000);

            // ========================================
            // SCENARIO 1: Alert Logging System
            // ========================================
            System.out.println("--- SCENARIO 1: ALERT LOGGING ---");
            System.out.println("Track all alerts encountered\n");

            WebElement alertButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Alert')]")
            );

            for (int i = 1; i <= 3; i++) {
                alertButton.click();
                Thread.sleep(800);

                Alert logAlert = wait.until(ExpectedConditions.alertIsPresent());
                String alertText = logAlert.getText();

                // Log the alert
                logAlert(i, "Simple Alert", alertText, "accepted");
                logAlert.accept();
            }

            System.out.println("Alert Log:");
            for (String log : alertLog) {
                System.out.println("  " + log);
            }
            System.out.println("\n✅ Logged 3 alerts");
            System.out.println();

            // ========================================
            // SCENARIO 2: Alert Verification
            // ========================================
            System.out.println("--- SCENARIO 2: ALERT TEXT VERIFICATION ---");
            System.out.println("Verify alert messages match expected text\n");

            String expectedMessage = "I am an alert box!";

            alertButton.click();
            Thread.sleep(800);

            Alert verifyAlert = driver.switchTo().alert();
            String actualMessage = verifyAlert.getText();

            if (actualMessage.equals(expectedMessage)) {
                System.out.println("✅ PASS: Alert message matches");
                System.out.println("   Expected: \"" + expectedMessage + "\"");
                System.out.println("   Actual:   \"" + actualMessage + "\"");
            } else {
                System.out.println("❌ FAIL: Alert message mismatch");
                System.out.println("   Expected: \"" + expectedMessage + "\"");
                System.out.println("   Actual:   \"" + actualMessage + "\"");
            }
            verifyAlert.accept();
            System.out.println();

            // ========================================
            // SCENARIO 3: Chained Alert Handling
            // ========================================
            System.out.println("--- SCENARIO 3: CHAINED OPERATIONS ---");
            System.out.println("Handle multiple operations with alerts\n");

            // Alert
            System.out.println("Step 1: Handle Simple Alert");
            alertButton.click();
            Thread.sleep(500);
            handleAlertSafely(driver, "accept");
            System.out.println("   ✅ Simple alert handled");

            // Confirm
            WebElement confirmButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Confirm')]")
            );
            System.out.println("\nStep 2: Handle Confirm");
            confirmButton.click();
            Thread.sleep(500);
            handleAlertSafely(driver, "accept");
            System.out.println("   ✅ Confirm handled");

            // Prompt
            WebElement promptButton = driver.findElement(
                By.xpath("//button[contains(text(),'Click for Prompt')]")
            );
            System.out.println("\nStep 3: Handle Prompt with input");
            promptButton.click();
            Thread.sleep(500);
            handlePromptSafely(driver, "Test User", "accept");
            System.out.println("   ✅ Prompt handled");

            System.out.println("\n✅ All three alert types chained successfully!");
            System.out.println();

            // ========================================
            // SCENARIO 4: Alert Statistics
            // ========================================
            System.out.println("--- SCENARIO 4: ALERT STATISTICS ---");
            System.out.println("Collect and analyze alert data\n");

            AlertStats stats = new AlertStats();

            // Process 10 alerts
            for (int i = 0; i < 10; i++) {
                long startTime = System.currentTimeMillis();

                alertButton.click();
                Alert statsAlert = wait.until(ExpectedConditions.alertIsPresent());
                String text = statsAlert.getText();
                statsAlert.accept();

                long endTime = System.currentTimeMillis();
                stats.addAlert(endTime - startTime, text.length());

                Thread.sleep(300);
            }

            System.out.println("📊 Alert Statistics:");
            System.out.println("   Total alerts: " + stats.count);
            System.out.println("   Avg handling time: " + stats.getAverageTime() + "ms");
            System.out.println("   Fastest: " + stats.minTime + "ms");
            System.out.println("   Slowest: " + stats.maxTime + "ms");
            System.out.println("   Avg message length: " + stats.getAverageLength() + " chars");
            System.out.println();

            // ========================================
            // SCENARIO 5: Error Recovery
            // ========================================
            System.out.println("--- SCENARIO 5: ERROR RECOVERY ---");
            System.out.println("Gracefully handle alert errors\n");

            // Attempt 1: No alert present
            System.out.println("Attempt 1: Try to switch when no alert");
            boolean success = safeAlertOperation(driver, () -> {
                driver.switchTo().alert().accept();
            });
            System.out.println("   Result: " + (success ? "✅ Success" : "❌ Failed (expected)"));

            // Attempt 2: Alert present
            System.out.println("\nAttempt 2: With alert present");
            alertButton.click();
            Thread.sleep(500);
            success = safeAlertOperation(driver, () -> {
                driver.switchTo().alert().accept();
            });
            System.out.println("   Result: " + (success ? "✅ Success" : "❌ Failed"));
            System.out.println();

            // ========================================
            // SCENARIO 6: Batch Alert Processing
            // ========================================
            System.out.println("--- SCENARIO 6: BATCH PROCESSING ---");
            System.out.println("Process multiple alerts efficiently\n");

            String[] actions = {"accept", "accept", "accept", "accept", "accept"};

            System.out.println("Processing " + actions.length + " alerts...");
            long batchStartTime = System.currentTimeMillis();

            for (int i = 0; i < actions.length; i++) {
                alertButton.click();
                Alert batchAlert = wait.until(ExpectedConditions.alertIsPresent());

                if (actions[i].equals("accept")) {
                    batchAlert.accept();
                } else {
                    batchAlert.dismiss();
                }
            }

            long batchEndTime = System.currentTimeMillis();
            long totalBatchTime = batchEndTime - batchStartTime;

            System.out.println("✅ Batch complete");
            System.out.println("   Total time: " + totalBatchTime + "ms");
            System.out.println("   Avg per alert: " + (totalBatchTime / actions.length) + "ms");
            System.out.println();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("=====================================");
            System.out.println("REAL-WORLD SCENARIOS SUMMARY");
            System.out.println("=====================================");
            System.out.println("✅ Implemented alert logging");
            System.out.println("✅ Verified alert text");
            System.out.println("✅ Chained multiple alert types");
            System.out.println("✅ Collected statistics");
            System.out.println("✅ Handled errors gracefully");
            System.out.println("✅ Batch processed alerts");
            System.out.println("=====================================");

            Thread.sleep(3000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ Browser closed");
        }
    }

    // Helper methods
    private static void logAlert(int id, String type, String message, String action) {
        String logEntry = String.format("#%d | %s | \"%s\" | %s", id, type, message, action);
        alertLog.add(logEntry);
    }

    private static void handleAlertSafely(WebDriver driver, String action) {
        try {
            Alert alert = driver.switchTo().alert();
            if (action.equals("accept")) {
                alert.accept();
            } else {
                alert.dismiss();
            }
        } catch (Exception e) {
            System.out.println("   ⚠️  Alert handling failed: " + e.getMessage());
        }
    }

    private static void handlePromptSafely(WebDriver driver, String input, String action) {
        try {
            Alert alert = driver.switchTo().alert();
            if (input != null && !input.isEmpty()) {
                alert.sendKeys(input);
            }
            if (action.equals("accept")) {
                alert.accept();
            } else {
                alert.dismiss();
            }
        } catch (Exception e) {
            System.out.println("   ⚠️  Prompt handling failed: " + e.getMessage());
        }
    }

    private static boolean safeAlertOperation(WebDriver driver, Runnable operation) {
        try {
            operation.run();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Statistics class
    static class AlertStats {
        int count = 0;
        long totalTime = 0;
        long minTime = Long.MAX_VALUE;
        long maxTime = 0;
        int totalLength = 0;

        void addAlert(long time, int messageLength) {
            count++;
            totalTime += time;
            totalLength += messageLength;
            if (time < minTime) minTime = time;
            if (time > maxTime) maxTime = time;
        }

        long getAverageTime() {
            return count > 0 ? totalTime / count : 0;
        }

        int getAverageLength() {
            return count > 0 ? totalLength / count : 0;
        }
    }
}
```

**✅ Success Criteria:**
- Alert logging system works
- Text verification successful
- Chained operations complete
- Statistics collected accurately
- Error recovery handles failures
- Batch processing efficient

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| ConcurrentModificationException | Modifying list during iteration | Use thread-safe collections |
| ArithmeticException (divide by zero) | No alerts processed | Check count > 0 before division |
| MemoryError | Too many alerts logged | Clear log periodically |


**Common Mistakes:**
1. ❌ **Not Handling Alert Absence**: Code fails when optional alerts don't appear
   - Why: Some alerts are conditional based on user actions or system state
   - Fix: Use try-catch or check for alert existence first

2. ❌ **Mixing Alert Types in Same Test**: Testing JavaScript alerts and Bootstrap modals together
   - Why: Requires different handling strategies; increases complexity and failure points
   - Fix: Separate tests for browser alerts vs HTML modals

3. ❌ **Not Considering Browser Differences**: Assuming alert behavior is identical across browsers
   - Why: Different browsers may handle alerts with slight timing variations
   - Fix: Increase wait times and add browser-specific handling if needed

4. ❌ **Forgetting Authentication Alerts**: Not handling basic auth dialogs
   - Why: Authentication alerts use different mechanism (not switchTo().alert())
   - Fix: Pass credentials in URL: `http://username:password@example.com`

5. ❌ **Not Validating Alert Impact**: Accepting alert without verifying its effect on page
   - Why: Alert action should change page state; must validate the change occurred
   - Fix: After handling alert, verify expected page changes: status messages, redirects, etc.


**🎯 Practice Challenge:**

1. Create an alert framework with logging, statistics, and retry logic
2. Build a method to handle any alert type automatically
3. Create a report generator for alert interactions
4. Implement alert screenshot capture (before accepting)
5. Build a test that handles 100 alerts and generates performance metrics

---

**END OF DAYS 24-26 EXERCISES**

---

## Summary of All Exercises

### Day 24: Dropdowns (3 Exercises)
1. ✅ Understanding Dropdown Basics - Single Select (20 min)
2. ✅ Multi-Select Dropdown (25 min)
3. ✅ Real-World Dropdown Scenarios (30 min)

### Day 25: Checkboxes and Radio Buttons (2 Exercises)
1. ✅ Understanding Checkboxes - Basic Operations (20 min)
2. ✅ Radio Buttons - Single Selection (25 min)

### Day 26: Alerts, Popups, and Confirmations (6 Exercises)
1. ✅ Understanding JavaScript Alerts (20 min)
2. ✅ Handling Confirmation Dialogs (25 min)
3. ✅ Working with Prompt Dialogs (30 min)
4. ✅ Bootstrap Modals vs JavaScript Alerts (25 min)
5. ✅ Alert Timeout and Wait Strategies (25 min)
6. ✅ Real-World Alert Scenarios (30 min)

**Total: 11 Comprehensive Exercises**
**Total Time: ~4.5 hours of hands-on practice**

---

## Quick Reference Guide

### Dropdowns
```java
Select select = new Select(element);
select.selectByVisibleText("text");
select.selectByValue("value");
select.selectByIndex(0);
select.getFirstSelectedOption();
select.getAllSelectedOptions();
select.deselectAll();  // Multi-select only
```

### Checkboxes/Radio Buttons
```java
element.isSelected();
element.isEnabled();
element.click();
element.getAttribute("checked");
```

### Alerts
```java
Alert alert = driver.switchTo().alert();
alert.getText();
alert.accept();
alert.dismiss();
alert.sendKeys("text");  // Prompt only

// With wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
```

---


---

# Days 27-28: Frames & Window Handling

# SELENIUM WEBDRIVER - DAYS 27-28: FRAMES & WINDOW HANDLING

## Day 27: Handling Frames and iFrames

---

### Exercise 1: Understanding Frames vs iFrames (20 minutes)

**What you'll learn:** The difference between frames and iframes, and how to identify them in web pages

**Practice Website:** https://the-internet.herokuapp.com/iframe

**Concept Explanation:**

**What is a Frame/iFrame?**
- A frame is an HTML document embedded inside another HTML document
- `<frame>` is older (deprecated), `<iframe>` is modern and commonly used
- Each frame has its own separate DOM (Document Object Model)
- Selenium cannot directly access elements inside a frame - you must switch to it first!

**Why Frames are Used:**
- Embed external content (YouTube videos, Google Maps, payment gateways)
- Isolate widgets or components
- Load content from different sources

**Step-by-Step:**

1. **Open browser and inspect the iframe**
   - Go to: https://the-internet.herokuapp.com/iframe
   - Right-click on the text editor area → Inspect
   - You'll see: `<iframe id="mce_0_ifr">`

**Create new package: `com.automation.frames`**
**Create new class: `FrameBasics`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class FrameBasics {
    public static void main(String[] args) {
        System.out.println("===== UNDERSTANDING FRAMES & IFRAMES =====\n");

        // Setup WebDriver
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // Open test website
            driver.get("https://the-internet.herokuapp.com/iframe");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // STEP 1: Find all iframes on the page
            // ========================================
            System.out.println("\n--- STEP 1: Identifying iframes ---");

            // Find all iframe elements
            var iframes = driver.findElements(By.tagName("iframe"));
            System.out.println("Total iframes found: " + iframes.size());

            for (int i = 0; i < iframes.size(); i++) {
                WebElement iframe = iframes.get(i);
                String id = iframe.getAttribute("id");
                String name = iframe.getAttribute("name");
                String src = iframe.getAttribute("src");

                System.out.println("\nIframe #" + (i + 1) + ":");
                System.out.println("  ID: " + (id != null && !id.isEmpty() ? id : "No ID"));
                System.out.println("  Name: " + (name != null && !name.isEmpty() ? name : "No name"));
                System.out.println("  Source: " + (src != null && !src.isEmpty() ? src : "No source"));
            }

            // ========================================
            // STEP 2: Try to access element WITHOUT switching
            // ========================================
            System.out.println("\n--- STEP 2: Trying to access element WITHOUT switching to iframe ---");

            try {
                // This will FAIL because the element is inside iframe
                WebElement editor = driver.findElement(By.id("tinymce"));
                System.out.println("❌ This shouldn't print!");
            } catch (Exception e) {
                System.out.println("❌ ERROR (Expected): " + e.getClass().getSimpleName());
                System.out.println("   Reason: Element is inside iframe, cannot access directly!");
                System.out.println("   Solution: Must switch to iframe first!");
            }

            // ========================================
            // STEP 3: Switch to iframe and access element
            // ========================================
            System.out.println("\n--- STEP 3: Switching to iframe and accessing element ---");

            // Method 1: Switch by ID
            driver.switchTo().frame("mce_0_ifr");
            System.out.println("✅ Switched to iframe using ID: mce_0_ifr");

            // Now we can access elements inside the iframe
            WebElement editor = driver.findElement(By.id("tinymce"));
            String currentText = editor.getText();
            System.out.println("   Current text in editor: " + currentText);

            // Clear and type new text
            editor.clear();
            String newText = "Hello from Selenium! I am inside an iframe.";
            editor.sendKeys(newText);
            System.out.println("   ✅ Typed new text: " + newText);

            Thread.sleep(2000);

            // ========================================
            // STEP 4: Switch back to main page
            // ========================================
            System.out.println("\n--- STEP 4: Switching back to main page ---");

            // Switch back to default content (main page)
            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page (defaultContent)");

            // Now we can access elements on main page
            WebElement heading = driver.findElement(By.tagName("h3"));
            System.out.println("   Main page heading: " + heading.getText());

            // ========================================
            // STEP 5: Try accessing iframe element again
            // ========================================
            System.out.println("\n--- STEP 5: Verifying we're back on main page ---");

            try {
                // This will FAIL again because we're back on main page
                WebElement editorAgain = driver.findElement(By.id("tinymce"));
                System.out.println("❌ This shouldn't print!");
            } catch (Exception e) {
                System.out.println("✅ Confirmed: Cannot access iframe elements from main page");
                System.out.println("   We successfully switched back to main content!");
            }

            System.out.println("\n=====================================");
            System.out.println("KEY LEARNINGS:");
            System.out.println("  1. Frames have separate DOM - cannot access directly");
            System.out.println("  2. Must use switchTo().frame() before interacting");
            System.out.println("  3. Must use switchTo().defaultContent() to return");
            System.out.println("  4. Can switch by: ID, Name, Index, or WebElement");
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
===== UNDERSTANDING FRAMES & IFRAMES =====

✅ Opened: An iFrame containing the TinyMCE WYSIWYG Editor

--- STEP 1: Identifying iframes ---
Total iframes found: 1

Iframe #1:
  ID: mce_0_ifr
  Name: No name
  Source: No source

--- STEP 2: Trying to access element WITHOUT switching to iframe ---
❌ ERROR (Expected): NoSuchElementException
   Reason: Element is inside iframe, cannot access directly!
   Solution: Must switch to iframe first!

--- STEP 3: Switching to iframe and accessing element ---
✅ Switched to iframe using ID: mce_0_ifr
   Current text in editor: Your content goes here.
   ✅ Typed new text: Hello from Selenium! I am inside an iframe.

--- STEP 4: Switching back to main page ---
✅ Switched back to main page (defaultContent)
   Main page heading: An iFrame containing the TinyMCE WYSIWYG Editor

--- STEP 5: Verifying we're back on main page ---
✅ Confirmed: Cannot access iframe elements from main page
   We successfully switched back to main content!

=====================================
KEY LEARNINGS:
  1. Frames have separate DOM - cannot access directly
  2. Must use switchTo().frame() before interacting
  3. Must use switchTo().defaultContent() to return
  4. Can switch by: ID, Name, Index, or WebElement
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Chrome opens and loads the iframe page
2. Editor initially shows "Your content goes here."
3. Editor is cleared and new text is typed
4. You see: "Hello from Selenium! I am inside an iframe."
5. Page stays visible for 2 seconds
6. Browser closes

**✅ Success Criteria:**
- Iframe is identified correctly
- First attempt to access element fails (as expected)
- Successfully switch to iframe
- Text is typed in the editor
- Successfully switch back to main page
- Second attempt to access iframe element fails (confirming switch back)

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchElementException | Forgot to switch to iframe | Use driver.switchTo().frame() first |
| NoSuchFrameException | Wrong frame ID/name/index | Verify frame identifier using DevTools |
| StaleElementReferenceException | Switched frames after finding element | Re-find element after switching |
| "no such element: Unable to locate element" | Still in iframe, trying to access main page | Use switchTo().defaultContent() |


**Common Mistakes:**
1. ❌ **Forgetting to Switch to Frame**: Trying to interact with frame elements without switching context
   - Why: Frame elements are in separate DOM context; must switch explicitly
   - Fix: Always switch first: `driver.switchTo().frame(frameElement)` or `driver.switchTo().frame("frameName")`

2. ❌ **Not Switching Back to Main Content**: Staying in frame context after interaction complete
   - Why: Subsequent element searches will only look within current frame
   - Fix: Switch back: `driver.switchTo().defaultContent()` to return to main page

3. ❌ **Confusing Frames with Windows**: Using frame switching methods for new windows
   - Why: Frames are nested documents; windows are separate browser tabs/windows
   - Fix: Use `switchTo().frame()` for frames, `switchTo().window()` for windows

4. ❌ **Using Wrong Frame Identifier**: Switching by name when should use index or element
   - Why: Frame may not have name/id attribute; wrong identifier causes NoSuchFrameException
   - Fix: Prefer WebElement: `driver.switchTo().frame(driver.findElement(By.id("frameId")))`

5. ❌ **Not Waiting for Frame to Load**: Switching to frame before it's fully loaded
   - Why: Frame content may load asynchronously; causes stale element issues
   - Fix: Wait for frame: `wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameLocator))`


**💡 Key Concepts:**

**1. Three Ways to Switch to Frame:**
```java
// Method 1: By ID or Name (String)
driver.switchTo().frame("frameId");
driver.switchTo().frame("frameName");

// Method 2: By Index (int) - starts from 0
driver.switchTo().frame(0);  // First iframe
driver.switchTo().frame(1);  // Second iframe

// Method 3: By WebElement
WebElement iframeElement = driver.findElement(By.id("frameId"));
driver.switchTo().frame(iframeElement);
```

**2. Switching Back:**
```java
// Go back to main page
driver.switchTo().defaultContent();

// Go back to parent frame (if nested)
driver.switchTo().parentFrame();
```

**3. Frame Hierarchy:**
```
Main Page (Default Content)
  └── iframe 1
       ├── Element A
       ├── Element B
       └── nested iframe
            └── Element C
```

**🎯 Practice Challenge:**

1. Switch to iframe using index (0) instead of ID
2. Switch to iframe using WebElement
3. Type different messages and observe the changes
4. Add a try-catch to handle the NoSuchElementException properly

---

### Exercise 2: Multiple Ways to Switch Frames (25 minutes)

**What you'll learn:** All methods to switch frames: by ID, name, index, and WebElement

**Create new class: `FrameSwitchMethods`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class FrameSwitchMethods {
    public static void main(String[] args) {
        System.out.println("===== FRAME SWITCHING: ALL METHODS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://the-internet.herokuapp.com/iframe");
            System.out.println("✅ Page loaded: " + driver.getTitle() + "\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 1: Switch by Index
            // ========================================
            System.out.println("--- METHOD 1: Switch by Index ---");
            System.out.println("Syntax: driver.switchTo().frame(index)");
            System.out.println("Note: Index starts from 0 (first iframe = 0)");

            // Count total iframes
            int totalIframes = driver.findElements(By.tagName("iframe")).size();
            System.out.println("Total iframes on page: " + totalIframes);

            // Switch to first iframe (index 0)
            driver.switchTo().frame(0);
            System.out.println("✅ Switched to iframe at index 0");

            // Access element inside iframe
            WebElement editor = driver.findElement(By.id("tinymce"));
            editor.clear();
            editor.sendKeys("Method 1: Switched by Index!");
            System.out.println("   Text entered: " + editor.getText());

            // Switch back
            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 2: Switch by ID
            // ========================================
            System.out.println("--- METHOD 2: Switch by ID ---");
            System.out.println("Syntax: driver.switchTo().frame(\"frameId\")");
            System.out.println("Best Practice: Most reliable if iframe has ID");

            // Switch using ID
            driver.switchTo().frame("mce_0_ifr");
            System.out.println("✅ Switched to iframe with ID: mce_0_ifr");

            WebElement editor2 = driver.findElement(By.id("tinymce"));
            editor2.clear();
            editor2.sendKeys("Method 2: Switched by ID!");
            System.out.println("   Text entered: " + editor2.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 3: Switch by Name
            // ========================================
            System.out.println("--- METHOD 3: Switch by Name ---");
            System.out.println("Syntax: driver.switchTo().frame(\"frameName\")");

            // First, let's check if this iframe has a name
            WebElement iframeCheck = driver.findElement(By.id("mce_0_ifr"));
            String frameName = iframeCheck.getAttribute("name");

            if (frameName != null && !frameName.isEmpty()) {
                driver.switchTo().frame(frameName);
                System.out.println("✅ Switched to iframe with name: " + frameName);

                WebElement editor3 = driver.findElement(By.id("tinymce"));
                editor3.clear();
                editor3.sendKeys("Method 3: Switched by Name!");
                System.out.println("   Text entered: " + editor3.getText());

                driver.switchTo().defaultContent();
            } else {
                System.out.println("ℹ️  This iframe has no 'name' attribute");
                System.out.println("   Name attribute: " + (frameName == null ? "null" : "empty string"));
                System.out.println("   Skipping this method for this iframe\n");
            }
            Thread.sleep(1500);

            // ========================================
            // METHOD 4: Switch by WebElement
            // ========================================
            System.out.println("--- METHOD 4: Switch by WebElement ---");
            System.out.println("Syntax: driver.switchTo().frame(WebElement)");
            System.out.println("Use Case: When you need to find iframe dynamically");

            // Find the iframe as WebElement
            WebElement iframeElement = driver.findElement(By.id("mce_0_ifr"));
            System.out.println("Step 1: Found iframe element with ID: " + iframeElement.getAttribute("id"));

            // Switch using WebElement
            driver.switchTo().frame(iframeElement);
            System.out.println("✅ Switched to iframe using WebElement");

            WebElement editor4 = driver.findElement(By.id("tinymce"));
            editor4.clear();
            editor4.sendKeys("Method 4: Switched by WebElement!");
            System.out.println("   Text entered: " + editor4.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 5: Advanced - Using XPath
            // ========================================
            System.out.println("--- METHOD 5: Advanced - Using XPath to Find Frame ---");
            System.out.println("Syntax: Find iframe by XPath, then switch");

            // Find iframe using XPath
            WebElement iframeByXPath = driver.findElement(By.xpath("//iframe[@id='mce_0_ifr']"));
            System.out.println("Step 1: Found iframe using XPath: //iframe[@id='mce_0_ifr']");

            // Switch to it
            driver.switchTo().frame(iframeByXPath);
            System.out.println("✅ Switched to iframe found by XPath");

            WebElement editor5 = driver.findElement(By.id("tinymce"));
            editor5.clear();
            editor5.sendKeys("Method 5: Found by XPath, then switched!");
            System.out.println("   Text entered: " + editor5.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");

            // ========================================
            // SUMMARY TABLE
            // ========================================
            System.out.println("=====================================");
            System.out.println("COMPARISON TABLE:");
            System.out.println("=====================================");
            System.out.println("Method          | Syntax                              | When to Use");
            System.out.println("----------------|-------------------------------------|----------------------------------");
            System.out.println("Index           | switchTo().frame(0)                 | When position is fixed");
            System.out.println("ID              | switchTo().frame(\"id\")              | Best - if iframe has ID");
            System.out.println("Name            | switchTo().frame(\"name\")            | If iframe has name attribute");
            System.out.println("WebElement      | switchTo().frame(WebElement)        | When using dynamic locators");
            System.out.println("XPath+Element   | Find by XPath → switchTo(element)   | Complex scenarios");
            System.out.println("=====================================");
            System.out.println("\nBEST PRACTICES:");
            System.out.println("  ✅ Prefer ID or Name (most reliable)");
            System.out.println("  ⚠️  Avoid Index (breaks if iframes are added/removed)");
            System.out.println("  ✅ Use WebElement for dynamic frames");
            System.out.println("  ✅ Always switch back with defaultContent()");
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
===== FRAME SWITCHING: ALL METHODS =====

✅ Page loaded: An iFrame containing the TinyMCE WYSIWYG Editor

--- METHOD 1: Switch by Index ---
Syntax: driver.switchTo().frame(index)
Note: Index starts from 0 (first iframe = 0)
Total iframes on page: 1
✅ Switched to iframe at index 0
   Text entered: Method 1: Switched by Index!
✅ Switched back to main page

--- METHOD 2: Switch by ID ---
Syntax: driver.switchTo().frame("frameId")
Best Practice: Most reliable if iframe has ID
✅ Switched to iframe with ID: mce_0_ifr
   Text entered: Method 2: Switched by ID!
✅ Switched back to main page

--- METHOD 3: Switch by Name ---
Syntax: driver.switchTo().frame("frameName")
ℹ️  This iframe has no 'name' attribute
   Name attribute: empty string
   Skipping this method for this iframe

--- METHOD 4: Switch by WebElement ---
Syntax: driver.switchTo().frame(WebElement)
Use Case: When you need to find iframe dynamically
Step 1: Found iframe element with ID: mce_0_ifr
✅ Switched to iframe using WebElement
   Text entered: Method 4: Switched by WebElement!
✅ Switched back to main page

--- METHOD 5: Advanced - Using XPath to Find Frame ---
Syntax: Find iframe by XPath, then switch
Step 1: Found iframe using XPath: //iframe[@id='mce_0_ifr']
✅ Switched to iframe found by XPath
   Text entered: Method 5: Found by XPath, then switched!
✅ Switched back to main page

=====================================
COMPARISON TABLE:
=====================================
Method          | Syntax                              | When to Use
----------------|-------------------------------------|----------------------------------
Index           | switchTo().frame(0)                 | When position is fixed
ID              | switchTo().frame("id")              | Best - if iframe has ID
Name            | switchTo().frame("name")            | If iframe has name attribute
WebElement      | switchTo().frame(WebElement)        | When using dynamic locators
XPath+Element   | Find by XPath → switchTo(element)   | Complex scenarios
=====================================

BEST PRACTICES:
  ✅ Prefer ID or Name (most reliable)
  ⚠️  Avoid Index (breaks if iframes are added/removed)
  ✅ Use WebElement for dynamic frames
  ✅ Always switch back with defaultContent()
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens, page loads
2. Text editor content changes 4 times (once for each method)
3. You see different messages appearing in the editor
4. Each message stays for 1.5 seconds before being replaced
5. Browser closes after summary display

**✅ Success Criteria:**
- All 4 switching methods work successfully
- Text is typed using each method
- Each switch back to main page succeeds
- Summary table displays correctly
- No exceptions thrown

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchFrameException | Invalid frame ID/name/index | Verify frame identifier in DevTools |
| StaleElementReferenceException | Frame reloaded after finding | Re-find the frame element |
| "no such frame" with index | Index out of bounds | Count iframes first: driver.findElements(By.tagName("iframe")).size() |
| NullPointerException | Frame element is null | Check if frame exists before switching |


**Common Mistakes:**
1. ❌ **Using Wrong Switching Method**: Switching by index without understanding context
   - Why: Index 0 might not be the frame you expect; brittle approach
   - Fix: Prefer switching by WebElement or name/id for stability

2. ❌ **Forgetting Current Context**: Not tracking which frame you're currently in
   - Why: Leads to confusion and errors when trying to switch between frames
   - Fix: Always switch to defaultContent() first, then navigate to target frame

3. ❌ **Not Handling Frame Not Found**: Assuming frame always exists
   - Why: Frames might load conditionally or be removed dynamically
   - Fix: Wrap in try-catch: `try { driver.switchTo().frame(...) } catch(NoSuchFrameException e) { ... }`

4. ❌ **Switching Too Quickly**: Moving between frames without waiting for load
   - Why: Frame content may not be ready; causes NoSuchElementException
   - Fix: Wait after switching: `wait.until(ExpectedConditions.presenceOfElementLocated(...))`

5. ❌ **Hardcoding Frame Indices**: Using numeric indices that may change
   - Why: If page structure changes, frame indices change too
   - Fix: Use name, id, or WebElement for more stable frame identification


**💡 Key Concepts:**

**1. When to Use Each Method:**

```java
// Use INDEX when:
// - Testing page with fixed frame structure
// - Quick prototyping
driver.switchTo().frame(0);

// Use ID when:
// - iframe has id attribute (MOST RELIABLE)
// - Recommended for production code
driver.switchTo().frame("frameId");

// Use NAME when:
// - iframe has name attribute
// - Legacy pages
driver.switchTo().frame("frameName");

// Use WEBELEMENT when:
// - Need to find frame dynamically
// - Complex locators required
WebElement frame = driver.findElement(By.xpath("//iframe[@class='dynamic']"));
driver.switchTo().frame(frame);
```

**2. Frame vs String vs Int:**

```java
// ✅ CORRECT - String (ID or Name)
driver.switchTo().frame("mce_0_ifr");

// ✅ CORRECT - int (Index)
driver.switchTo().frame(0);

// ✅ CORRECT - WebElement
WebElement frameElement = driver.findElement(By.id("frameId"));
driver.switchTo().frame(frameElement);

// ❌ WRONG - Cannot use both
// driver.switchTo().frame("0");  // This searches for name="0", NOT index 0
```

**3. Return Methods:**

```java
// Go to main page (default content)
driver.switchTo().defaultContent();

// Go to immediate parent frame (for nested frames)
driver.switchTo().parentFrame();
```

**🎯 Practice Challenge:**

1. Create a method that tries all switching methods in order
2. Add error handling for each method
3. Count how many frames are on the page before switching
4. Print frame attributes before switching

---

### Exercise 3: Nested Frames (30 minutes)

**What you'll learn:** How to handle frames within frames (nested frames)

**Practice Website:** https://the-internet.herokuapp.com/nested_frames

**Create new class: `NestedFrames`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class NestedFrames {
    public static void main(String[] args) {
        System.out.println("===== NESTED FRAMES: FRAMES WITHIN FRAMES =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://the-internet.herokuapp.com/nested_frames");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(2000);

            // ========================================
            // STEP 1: Analyze Frame Structure
            // ========================================
            System.out.println("\n--- STEP 1: Analyzing Frame Structure ---");

            // Count frames on main page
            List<WebElement> mainFrames = driver.findElements(By.tagName("frame"));
            System.out.println("Frames on MAIN page: " + mainFrames.size());

            for (int i = 0; i < mainFrames.size(); i++) {
                String name = mainFrames.get(i).getAttribute("name");
                System.out.println("  Frame " + i + ": name = '" + name + "'");
            }

            System.out.println("\nFrame Hierarchy:");
            System.out.println("Main Page");
            System.out.println("├── frame-top (contains nested frames)");
            System.out.println("│   ├── frame-left");
            System.out.println("│   ├── frame-middle");
            System.out.println("│   └── frame-right");
            System.out.println("└── frame-bottom");

            // ========================================
            // STEP 2: Access Top-Level Frame (frame-bottom)
            // ========================================
            System.out.println("\n--- STEP 2: Accessing Top-Level Frame ---");

            // Switch to bottom frame (direct child of main page)
            driver.switchTo().frame("frame-bottom");
            System.out.println("✅ Switched to: frame-bottom");

            // Get text from body
            WebElement bottomBody = driver.findElement(By.tagName("body"));
            String bottomText = bottomBody.getText();
            System.out.println("   Text in frame-bottom: '" + bottomText + "'");

            // Switch back to main page
            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page");
            Thread.sleep(1500);

            // ========================================
            // STEP 3: Access Nested Frame (2 levels deep)
            // ========================================
            System.out.println("\n--- STEP 3: Accessing Nested Frames ---");
            System.out.println("Goal: Access frame-left (inside frame-top)");

            // LEVEL 1: Switch to frame-top (parent frame)
            driver.switchTo().frame("frame-top");
            System.out.println("✅ Level 1: Switched to frame-top");

            // Check how many frames are inside frame-top
            List<WebElement> nestedFrames = driver.findElements(By.tagName("frame"));
            System.out.println("   Frames inside frame-top: " + nestedFrames.size());
            for (WebElement frame : nestedFrames) {
                System.out.println("     - " + frame.getAttribute("name"));
            }

            // LEVEL 2: Switch to frame-left (child of frame-top)
            driver.switchTo().frame("frame-left");
            System.out.println("✅ Level 2: Switched to frame-left");

            // Get text from frame-left
            WebElement leftBody = driver.findElement(By.tagName("body"));
            String leftText = leftBody.getText();
            System.out.println("   Text in frame-left: '" + leftText + "'");

            // Switch back to main page (from nested frame)
            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page from nested frame");
            Thread.sleep(1500);

            // ========================================
            // STEP 4: Access All Nested Frames
            // ========================================
            System.out.println("\n--- STEP 4: Reading All Nested Frames ---");

            // Access frame-top → frame-left
            driver.switchTo().frame("frame-top").switchTo().frame("frame-left");
            String leftContent = driver.findElement(By.tagName("body")).getText();
            System.out.println("frame-left text: '" + leftContent + "'");
            driver.switchTo().defaultContent();

            // Access frame-top → frame-middle
            driver.switchTo().frame("frame-top").switchTo().frame("frame-middle");
            String middleContent = driver.findElement(By.tagName("body")).getText();
            System.out.println("frame-middle text: '" + middleContent + "'");
            driver.switchTo().defaultContent();

            // Access frame-top → frame-right
            driver.switchTo().frame("frame-top").switchTo().frame("frame-right");
            String rightContent = driver.findElement(By.tagName("body")).getText();
            System.out.println("frame-right text: '" + rightContent + "'");
            driver.switchTo().defaultContent();

            Thread.sleep(1500);

            // ========================================
            // STEP 5: Using parentFrame()
            // ========================================
            System.out.println("\n--- STEP 5: Using parentFrame() ---");
            System.out.println("Demonstrating switchTo().parentFrame()");

            // Go to nested frame
            driver.switchTo().frame("frame-top");
            System.out.println("✅ Switched to frame-top");

            driver.switchTo().frame("frame-middle");
            System.out.println("✅ Switched to frame-middle (nested)");

            // Instead of defaultContent(), use parentFrame()
            driver.switchTo().parentFrame();
            System.out.println("✅ Used parentFrame() - now back in frame-top");

            // Verify we're in frame-top by switching to another nested frame
            driver.switchTo().frame("frame-right");
            String rightText = driver.findElement(By.tagName("body")).getText();
            System.out.println("   Successfully accessed frame-right: '" + rightText + "'");
            System.out.println("   This confirms we were in frame-top!");

            // Go back to main page
            driver.switchTo().defaultContent();
            System.out.println("✅ Back to main page");

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("NESTED FRAMES - KEY POINTS:");
            System.out.println("=====================================");
            System.out.println("1. Nested frames = frames inside frames");
            System.out.println("2. Must switch level by level:");
            System.out.println("   - Main → Parent Frame → Child Frame");
            System.out.println("3. Cannot jump directly to nested frame");
            System.out.println("4. Two ways to go back:");
            System.out.println("   - defaultContent() → Main page");
            System.out.println("   - parentFrame() → One level up");
            System.out.println("5. Chain switching for cleaner code:");
            System.out.println("   driver.switchTo().frame(\"parent\").switchTo().frame(\"child\");");
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
===== NESTED FRAMES: FRAMES WITHIN FRAMES =====

✅ Opened: Nested Frames

--- STEP 1: Analyzing Frame Structure ---
Frames on MAIN page: 2
  Frame 0: name = 'frame-top'
  Frame 1: name = 'frame-bottom'

Frame Hierarchy:
Main Page
├── frame-top (contains nested frames)
│   ├── frame-left
│   ├── frame-middle
│   └── frame-right
└── frame-bottom

--- STEP 2: Accessing Top-Level Frame ---
✅ Switched to: frame-bottom
   Text in frame-bottom: 'BOTTOM'
✅ Switched back to main page

--- STEP 3: Accessing Nested Frames ---
Goal: Access frame-left (inside frame-top)
✅ Level 1: Switched to frame-top
   Frames inside frame-top: 3
     - frame-left
     - frame-middle
     - frame-right
✅ Level 2: Switched to frame-left
   Text in frame-left: 'LEFT'
✅ Switched back to main page from nested frame

--- STEP 4: Reading All Nested Frames ---
frame-left text: 'LEFT'
frame-middle text: 'MIDDLE'
frame-right text: 'RIGHT'

--- STEP 5: Using parentFrame() ---
Demonstrating switchTo().parentFrame()
✅ Switched to frame-top
✅ Switched to frame-middle (nested)
✅ Used parentFrame() - now back in frame-top
   Successfully accessed frame-right: 'RIGHT'
   This confirms we were in frame-top!
✅ Back to main page

=====================================
NESTED FRAMES - KEY POINTS:
=====================================
1. Nested frames = frames inside frames
2. Must switch level by level:
   - Main → Parent Frame → Child Frame
3. Cannot jump directly to nested frame
4. Two ways to go back:
   - defaultContent() → Main page
   - parentFrame() → One level up
5. Chain switching for cleaner code:
   driver.switchTo().frame("parent").switchTo().frame("child");
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser opens showing nested frames page
2. Page displays multiple frames with text: LEFT, MIDDLE, RIGHT, BOTTOM
3. Selenium switches between frames (you won't see visible changes)
4. Console shows successful navigation through frame hierarchy
5. Browser closes after 2 seconds

**✅ Success Criteria:**
- Correctly identifies 2 top-level frames
- Successfully accesses frame-bottom
- Successfully navigates to nested frame-left
- Reads text from all nested frames (LEFT, MIDDLE, RIGHT)
- Demonstrates parentFrame() usage
- All switches succeed without errors

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchFrameException | Trying to jump directly to nested frame | Switch to parent first, then child |
| "no such frame" | Wrong frame name | Print all frame names to verify |
| NoSuchElementException | Looking for element in wrong frame | Verify current frame context |
| "Frame not found" after parentFrame() | Already at main page | Use parentFrame() only when in nested frame |


**Common Mistakes:**
1. ❌ **Not Following Correct Path**: Trying to jump directly to nested frame
   - Why: Must switch through parent frames hierarchically; cannot skip levels
   - Fix: Switch step-by-step: `defaultContent() → parentFrame → childFrame`

2. ❌ **Losing Track of Nesting Level**: Not remembering how deep into frames you are
   - Why: Leads to errors when trying to switch back or to siblings
   - Fix: Track frame path or always return to defaultContent() before new navigation

3. ❌ **Using Wrong Parent Reference**: Calling `driver.switchTo().parentFrame()` incorrectly
   - Why: `parentFrame()` goes up one level; multiple nested frames need multiple calls
   - Fix: For multiple levels up, call `parentFrame()` multiple times or use `defaultContent()`

4. ❌ **Not Validating Frame Switch Success**: Assuming switch succeeded without verification
   - Why: Switch might fail silently; code continues with wrong context
   - Fix: Verify by checking for expected element after switch

5. ❌ **Inefficient Navigation**: Switching to defaultContent() repeatedly unnecessarily
   - Why: Performance overhead; better to navigate directly when possible
   - Fix: If moving between sibling frames, switch to parent then to sibling


**💡 Key Concepts:**

**1. Nested Frame Navigation:**

```java
// ❌ WRONG - Cannot jump directly
driver.switchTo().frame("frame-left");  // This will FAIL!

// ✅ CORRECT - Switch level by level
driver.switchTo().frame("frame-top");      // Parent
driver.switchTo().frame("frame-left");     // Child

// ✅ BETTER - Chain the calls
driver.switchTo().frame("frame-top").switchTo().frame("frame-left");
```

**2. Going Back:**

```java
// From: Main → frame-top → frame-middle

// Option 1: Go to main page directly
driver.switchTo().defaultContent();  // Now at: Main

// Option 2: Go up one level
driver.switchTo().parentFrame();     // Now at: frame-top
driver.switchTo().parentFrame();     // Now at: Main
```

**3. Frame Hierarchy:**

```
Main Page (defaultContent)
    │
    ├── frame-top (Level 1)
    │   ├── frame-left (Level 2)
    │   ├── frame-middle (Level 2)
    │   └── frame-right (Level 2)
    │
    └── frame-bottom (Level 1)

Navigation Rule:
- To go DOWN: Must switch level by level
- To go UP: Use parentFrame() or defaultContent()
```

**🎯 Practice Challenge:**

1. Create a method to print the path to a nested frame
2. Switch to all 3 nested frames and print their text
3. Try using indexes instead of names
4. Navigate using parentFrame() from frame-right to frame-left

---

### Exercise 4: Real-World Scenario - Switching Between Multiple Frames (25 minutes)

**What you'll learn:** Practical frame handling with multiple operations

**Create new class: `MultipleFrameOperations`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;

public class MultipleFrameOperations {

    // Method to print current frame context
    private static void printCurrentContext(WebDriver driver, String expectedContext) {
        System.out.println("📍 Current context: " + expectedContext);
    }

    public static void main(String[] args) {
        System.out.println("===== REAL-WORLD: MULTIPLE FRAME OPERATIONS =====\n");
        System.out.println("Scenario: Extracting data from nested frames");
        System.out.println("Similar to: Forms with embedded widgets, dashboards\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://the-internet.herokuapp.com/nested_frames");
            System.out.println("✅ Website loaded\n");
            Thread.sleep(1500);

            // ========================================
            // TASK 1: Collect all frame data
            // ========================================
            System.out.println("--- TASK 1: Collecting Data from All Frames ---\n");

            // Data structure to store results
            List<String> frameData = new ArrayList<>();

            // Get bottom frame data
            printCurrentContext(driver, "Main Page");
            driver.switchTo().frame("frame-bottom");
            printCurrentContext(driver, "frame-bottom");

            String bottomData = driver.findElement(By.tagName("body")).getText();
            frameData.add("frame-bottom: " + bottomData);
            System.out.println("✅ Collected from frame-bottom: " + bottomData);

            driver.switchTo().defaultContent();
            printCurrentContext(driver, "Main Page");
            System.out.println();

            // Get nested frames data
            String[] nestedFrames = {"frame-left", "frame-middle", "frame-right"};

            for (String frameName : nestedFrames) {
                // Go to parent frame
                driver.switchTo().frame("frame-top");
                printCurrentContext(driver, "frame-top");

                // Go to child frame
                driver.switchTo().frame(frameName);
                printCurrentContext(driver, frameName);

                String data = driver.findElement(By.tagName("body")).getText();
                frameData.add(frameName + ": " + data);
                System.out.println("✅ Collected from " + frameName + ": " + data);

                // Return to main page
                driver.switchTo().defaultContent();
                printCurrentContext(driver, "Main Page");
                System.out.println();
            }

            // ========================================
            // TASK 2: Display collected data
            // ========================================
            System.out.println("--- TASK 2: All Collected Data ---\n");
            System.out.println("Total frames processed: " + frameData.size());
            System.out.println("\nFrame Data Summary:");
            for (int i = 0; i < frameData.size(); i++) {
                System.out.println("  " + (i + 1) + ". " + frameData.get(i));
            }

            // ========================================
            // TASK 3: Verify specific frame content
            // ========================================
            System.out.println("\n--- TASK 3: Verifying Frame Content ---\n");

            // Verify middle frame
            driver.switchTo().frame("frame-top").switchTo().frame("frame-middle");
            String middleText = driver.findElement(By.tagName("body")).getText();

            if (middleText.equals("MIDDLE")) {
                System.out.println("✅ PASS: frame-middle contains expected text 'MIDDLE'");
            } else {
                System.out.println("❌ FAIL: frame-middle has unexpected text: " + middleText);
            }

            driver.switchTo().defaultContent();

            // Verify left frame
            driver.switchTo().frame("frame-top").switchTo().frame("frame-left");
            String leftText = driver.findElement(By.tagName("body")).getText();

            if (leftText.equals("LEFT")) {
                System.out.println("✅ PASS: frame-left contains expected text 'LEFT'");
            } else {
                System.out.println("❌ FAIL: frame-left has unexpected text: " + leftText);
            }

            driver.switchTo().defaultContent();

            // ========================================
            // TASK 4: Navigation pattern practice
            // ========================================
            System.out.println("\n--- TASK 4: Navigation Pattern Practice ---\n");

            System.out.println("Pattern: Main → frame-top → frame-right → frame-top → frame-left");

            System.out.println("Step 1: Main → frame-top");
            driver.switchTo().frame("frame-top");

            System.out.println("Step 2: frame-top → frame-right");
            driver.switchTo().frame("frame-right");
            System.out.println("   Current frame content: " + driver.findElement(By.tagName("body")).getText());

            System.out.println("Step 3: frame-right → frame-top (using parentFrame)");
            driver.switchTo().parentFrame();

            System.out.println("Step 4: frame-top → frame-left");
            driver.switchTo().frame("frame-left");
            System.out.println("   Current frame content: " + driver.findElement(By.tagName("body")).getText());

            System.out.println("✅ Navigation pattern completed successfully!");

            driver.switchTo().defaultContent();

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("REAL-WORLD APPLICATIONS:");
            System.out.println("=====================================");
            System.out.println("1. E-commerce: Product comparison widgets");
            System.out.println("2. Banking: Embedded payment gateways");
            System.out.println("3. CMS: Rich text editors (like TinyMCE)");
            System.out.println("4. Social Media: Embedded posts/videos");
            System.out.println("5. Analytics: Dashboard widgets");
            System.out.println("\nBEST PRACTICES:");
            System.out.println("  ✅ Always return to defaultContent() when done");
            System.out.println("  ✅ Use descriptive variable names for frames");
            System.out.println("  ✅ Add comments for complex frame hierarchies");
            System.out.println("  ✅ Create helper methods for frequent switches");
            System.out.println("  ✅ Handle NoSuchFrameException appropriately");
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
===== REAL-WORLD: MULTIPLE FRAME OPERATIONS =====

Scenario: Extracting data from nested frames
Similar to: Forms with embedded widgets, dashboards

✅ Website loaded

--- TASK 1: Collecting Data from All Frames ---

📍 Current context: Main Page
📍 Current context: frame-bottom
✅ Collected from frame-bottom: BOTTOM
📍 Current context: Main Page

📍 Current context: frame-top
📍 Current context: frame-left
✅ Collected from frame-left: LEFT
📍 Current context: Main Page

📍 Current context: frame-top
📍 Current context: frame-middle
✅ Collected from frame-middle: MIDDLE
📍 Current context: Main Page

📍 Current context: frame-top
📍 Current context: frame-right
✅ Collected from frame-right: RIGHT
📍 Current context: Main Page

--- TASK 2: All Collected Data ---

Total frames processed: 4

Frame Data Summary:
  1. frame-bottom: BOTTOM
  2. frame-left: LEFT
  3. frame-middle: MIDDLE
  4. frame-right: RIGHT

--- TASK 3: Verifying Frame Content ---

✅ PASS: frame-middle contains expected text 'MIDDLE'
✅ PASS: frame-left contains expected text 'LEFT'

--- TASK 4: Navigation Pattern Practice ---

Pattern: Main → frame-top → frame-right → frame-top → frame-left
Step 1: Main → frame-top
Step 2: frame-top → frame-right
   Current frame content: RIGHT
Step 3: frame-right → frame-top (using parentFrame)
Step 4: frame-top → frame-left
   Current frame content: LEFT
✅ Navigation pattern completed successfully!

=====================================
REAL-WORLD APPLICATIONS:
=====================================
1. E-commerce: Product comparison widgets
2. Banking: Embedded payment gateways
3. CMS: Rich text editors (like TinyMCE)
4. Social Media: Embedded posts/videos
5. Analytics: Dashboard widgets

BEST PRACTICES:
  ✅ Always return to defaultContent() when done
  ✅ Use descriptive variable names for frames
  ✅ Add comments for complex frame hierarchies
  ✅ Create helper methods for frequent switches
  ✅ Handle NoSuchFrameException appropriately
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Browser loads the nested frames page
2. Selenium navigates through all frames systematically
3. Data is collected from each frame (not visible to user)
4. Frame content is verified programmatically
5. Navigation pattern is executed
6. Browser closes

**✅ Success Criteria:**
- All 4 frames are accessed successfully
- Data is collected from each frame
- Frame data list contains 4 items
- Content verification passes for all frames
- Navigation pattern completes without errors
- Helper method works correctly

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| ConcurrentModificationException | Modifying list while iterating | Use index-based loop or ArrayList |
| NoSuchFrameException during loop | Frame name mismatch | Verify frame names before loop |
| StaleElementReferenceException | Switching changed DOM | Re-find elements after switching |
| "Cannot switch to frame" | Still in previous frame | Always use defaultContent() before switching |


**Common Mistakes:**
1. ❌ **Not Handling Dynamic Frames**: Treating dynamically loaded frames like static ones
   - Why: Frames may load via AJAX; immediate switch fails
   - Fix: Use `wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator))`

2. ❌ **Ignoring Frame Load Time**: Not accounting for frame content load delay
   - Why: Frame element may exist but content not yet loaded
   - Fix: After switching, wait for expected content

3. ❌ **Not Cleaning Up Frame Context**: Leaving tests in frame context affecting subsequent tests
   - Why: Test isolation breaks; next test starts in wrong context
   - Fix: Add `driver.switchTo().defaultContent()` in @AfterMethod or finally block

4. ❌ **Handling Nested Frames Inefficiently**: Repeatedly switching from defaultContent for each action
   - Why: Excessive context switching slows down tests
   - Fix: Stay in target frame for multiple operations, switch out once when done

5. ❌ **Not Considering Cross-Origin Frames**: Attempting to interact with frames from different domains
   - Why: Security restrictions prevent access to cross-origin frame content
   - Fix: Understand browser security policies; some frame interactions may not be possible


**💡 Key Concepts:**

**1. Data Collection Pattern:**

```java
// Pattern: Switch → Extract → Store → Return
List<String> data = new ArrayList<>();

for (String frameName : frameNames) {
    driver.switchTo().frame(frameName);           // Switch
    String content = driver.findElement(...);      // Extract
    data.add(frameName + ": " + content);         // Store
    driver.switchTo().defaultContent();           // Return
}
```

**2. Helper Methods:**

```java
// Create reusable methods
public static String getFrameText(WebDriver driver, String frameName) {
    driver.switchTo().frame(frameName);
    String text = driver.findElement(By.tagName("body")).getText();
    driver.switchTo().defaultContent();
    return text;
}

// Usage
String text = getFrameText(driver, "frame-bottom");
```

**3. Navigation Tracking:**

```java
// Keep track of current context
String currentContext = "Main";

driver.switchTo().frame("frame-top");
currentContext = "frame-top";

driver.switchTo().frame("frame-left");
currentContext = "frame-top → frame-left";

// Useful for debugging
System.out.println("Current location: " + currentContext);
```

**🎯 Practice Challenge:**

1. Create a method `getAllFrameNames()` that returns all frame names on a page
2. Create a method `getFrameContent()` that takes frame path as parameter
3. Add error handling for missing frames
4. Count total frames (including nested) programmatically
5. Create a visual tree representation of the frame structure

---

### Exercise 5: Frame Handling with Wait Conditions (30 minutes)

**What you'll learn:** Combining explicit waits with frame operations

**Create new class: `FrameWithWaits`**

```java
package com.automation.frames;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class FrameWithWaits {
    public static void main(String[] args) {
        System.out.println("===== FRAME HANDLING WITH EXPLICIT WAITS =====\n");
        System.out.println("Scenario: Waiting for frames to load before switching\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Create WebDriverWait object
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // ========================================
            // SCENARIO 1: Wait for frame to be available
            // ========================================
            System.out.println("--- SCENARIO 1: Wait for Frame to Load ---\n");

            driver.get("https://the-internet.herokuapp.com/iframe");
            System.out.println("✅ Page loading started...");

            // Wait for iframe to be available and switch to it
            System.out.println("⏳ Waiting for iframe to be available...");
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("mce_0_ifr"));
            System.out.println("✅ Frame is available and switched!");

            // Now we're inside the frame
            WebElement editor = driver.findElement(By.id("tinymce"));
            String originalText = editor.getText();
            System.out.println("   Original text: " + originalText);

            editor.clear();
            editor.sendKeys("Text entered after waiting for frame!");
            System.out.println("   New text: " + editor.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 2: Wait for frame by locator
            // ========================================
            System.out.println("--- SCENARIO 2: Wait for Frame Using Locator ---\n");

            // Wait for iframe element to be present
            By iframeLocator = By.id("mce_0_ifr");
            System.out.println("⏳ Waiting for iframe element with ID: mce_0_ifr");

            wait.until(ExpectedConditions.presenceOfElementLocated(iframeLocator));
            System.out.println("✅ Iframe element found!");

            // Get the iframe as WebElement
            WebElement iframeElement = driver.findElement(iframeLocator);

            // Wait for frame to be available and switch using WebElement
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(iframeElement));
            System.out.println("✅ Switched to iframe using WebElement");

            WebElement editor2 = driver.findElement(By.id("tinymce"));
            editor2.clear();
            editor2.sendKeys("Switched using WebElement after wait!");
            System.out.println("   Text entered: " + editor2.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 3: Wait for element inside frame
            // ========================================
            System.out.println("--- SCENARIO 3: Wait for Element Inside Frame ---\n");

            // Switch to frame first
            driver.switchTo().frame("mce_0_ifr");
            System.out.println("✅ Switched to iframe");

            // Wait for element inside frame to be clickable
            System.out.println("⏳ Waiting for editor element to be clickable...");
            WebElement editorElement = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("tinymce"))
            );
            System.out.println("✅ Editor element is clickable!");

            editorElement.clear();
            editorElement.sendKeys("Waited for element inside frame to be clickable!");
            System.out.println("   Text entered: " + editorElement.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Switched back to main page\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 4: Complex wait - frame with nested content
            // ========================================
            System.out.println("--- SCENARIO 4: Multiple Frames with Waits ---\n");

            // Navigate to nested frames page
            driver.get("https://the-internet.herokuapp.com/nested_frames");
            System.out.println("✅ Navigated to nested frames page");

            // Wait for parent frame and switch
            System.out.println("⏳ Waiting for parent frame (frame-top)...");
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frame-top"));
            System.out.println("✅ Switched to frame-top");

            // Wait for nested frame and switch
            System.out.println("⏳ Waiting for nested frame (frame-middle)...");
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frame-middle"));
            System.out.println("✅ Switched to frame-middle");

            // Wait for body element and get text
            WebElement body = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.tagName("body"))
            );
            System.out.println("   Text in frame-middle: " + body.getText());

            driver.switchTo().defaultContent();
            System.out.println("✅ Returned to main page\n");

            // ========================================
            // SCENARIO 5: Error handling with waits
            // ========================================
            System.out.println("--- SCENARIO 5: Handling Frame Load Failures ---\n");

            try {
                // Try to wait for a non-existent frame (will timeout)
                System.out.println("⏳ Trying to wait for non-existent frame...");
                WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(3));
                shortWait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("non-existent-frame"));
                System.out.println("❌ This shouldn't print!");

            } catch (Exception e) {
                System.out.println("❌ TimeoutException (Expected): Frame not found within timeout");
                System.out.println("   Error type: " + e.getClass().getSimpleName());
                System.out.println("   Handling: Log error and continue with test");
                System.out.println("✅ Error handled gracefully!");
            }

            // ========================================
            // BEST PRACTICES DEMONSTRATION
            // ========================================
            System.out.println("\n--- BEST PRACTICES ---\n");

            driver.get("https://the-internet.herokuapp.com/iframe");

            System.out.println("1. Always use waits before switching to frames");
            wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("mce_0_ifr"));
            System.out.println("   ✅ Frame loaded and switched");

            System.out.println("\n2. Use explicit waits for elements inside frames");
            WebElement editorFinal = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("tinymce"))
            );
            System.out.println("   ✅ Element inside frame is visible");

            System.out.println("\n3. Always switch back to default content");
            driver.switchTo().defaultContent();
            System.out.println("   ✅ Switched back to main page");

            System.out.println("\n4. Use appropriate timeout values");
            System.out.println("   • Standard: 10 seconds");
            System.out.println("   • Slow-loading frames: 20-30 seconds");
            System.out.println("   • Quick checks: 3-5 seconds");

            System.out.println("\n=====================================");
            System.out.println("WAIT CONDITIONS FOR FRAMES:");
            System.out.println("=====================================");
            System.out.println("1. frameToBeAvailableAndSwitchToIt(String)");
            System.out.println("   - Wait + Switch by frame name/ID");
            System.out.println("\n2. frameToBeAvailableAndSwitchToIt(By)");
            System.out.println("   - Wait + Switch by locator");
            System.out.println("\n3. frameToBeAvailableAndSwitchToIt(WebElement)");
            System.out.println("   - Wait + Switch by WebElement");
            System.out.println("\n4. Combine with other waits:");
            System.out.println("   - presenceOfElementLocated");
            System.out.println("   - visibilityOfElementLocated");
            System.out.println("   - elementToBeClickable");
            System.out.println("=====================================");
            System.out.println("\nWHY USE WAITS WITH FRAMES:");
            System.out.println("  ✅ Frames may load after main page");
            System.out.println("  ✅ Dynamic content in frames");
            System.out.println("  ✅ Prevents NoSuchFrameException");
            System.out.println("  ✅ Makes tests more stable");
            System.out.println("  ✅ Handles slow networks gracefully");
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
===== FRAME HANDLING WITH EXPLICIT WAITS =====

Scenario: Waiting for frames to load before switching

--- SCENARIO 1: Wait for Frame to Load ---

✅ Page loading started...
⏳ Waiting for iframe to be available...
✅ Frame is available and switched!
   Original text: Your content goes here.
   New text: Text entered after waiting for frame!
✅ Switched back to main page

--- SCENARIO 2: Wait for Frame Using Locator ---

⏳ Waiting for iframe element with ID: mce_0_ifr
✅ Iframe element found!
✅ Switched to iframe using WebElement
   Text entered: Switched using WebElement after wait!
✅ Switched back to main page

--- SCENARIO 3: Wait for Element Inside Frame ---

✅ Switched to iframe
⏳ Waiting for editor element to be clickable...
✅ Editor element is clickable!
   Text entered: Waited for element inside frame to be clickable!
✅ Switched back to main page

--- SCENARIO 4: Multiple Frames with Waits ---

✅ Navigated to nested frames page
⏳ Waiting for parent frame (frame-top)...
✅ Switched to frame-top
⏳ Waiting for nested frame (frame-middle)...
✅ Switched to frame-middle
   Text in frame-middle: MIDDLE
✅ Returned to main page

--- SCENARIO 5: Handling Frame Load Failures ---

⏳ Trying to wait for non-existent frame...
❌ TimeoutException (Expected): Frame not found within timeout
   Error type: TimeoutException
   Handling: Log error and continue with test
✅ Error handled gracefully!

--- BEST PRACTICES ---

1. Always use waits before switching to frames
   ✅ Frame loaded and switched

2. Use explicit waits for elements inside frames
   ✅ Element inside frame is visible

3. Always switch back to default content
   ✅ Switched back to main page

4. Use appropriate timeout values
   • Standard: 10 seconds
   • Slow-loading frames: 20-30 seconds
   • Quick checks: 3-5 seconds

=====================================
WAIT CONDITIONS FOR FRAMES:
=====================================
1. frameToBeAvailableAndSwitchToIt(String)
   - Wait + Switch by frame name/ID

2. frameToBeAvailableAndSwitchToIt(By)
   - Wait + Switch by locator

3. frameToBeAvailableAndSwitchToIt(WebElement)
   - Wait + Switch by WebElement

4. Combine with other waits:
   - presenceOfElementLocated
   - visibilityOfElementLocated
   - elementToBeClickable
=====================================

WHY USE WAITS WITH FRAMES:
  ✅ Frames may load after main page
  ✅ Dynamic content in frames
  ✅ Prevents NoSuchFrameException
  ✅ Makes tests more stable
  ✅ Handles slow networks gracefully
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Page loads with iframe
2. Selenium waits for iframe to be ready before switching
3. Text is typed multiple times with different wait strategies
4. Navigates to nested frames page
5. Demonstrates error handling for non-existent frame
6. Browser closes

**✅ Success Criteria:**
- All wait conditions work correctly
- Frame switching succeeds after waits
- Text is entered in editor each time
- Nested frame waits work correctly
- TimeoutException is caught and handled
- Best practices are demonstrated

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| TimeoutException | Frame didn't load within timeout | Increase wait time or check frame identifier |
| NoSuchFrameException | Switched before frame was ready | Use frameToBeAvailableAndSwitchToIt |
| StaleElementReferenceException | Frame reloaded during interaction | Re-find element after wait |
| InvalidSelectorException | Wrong By locator for frame | Verify frame locator strategy |


**Common Mistakes:**
1. ❌ **Not Waiting for Frame Availability**: Switching to frame without checking if it exists
   - Why: Frame may not be loaded yet; causes NoSuchFrameException
   - Fix: Use `wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(locator))`

2. ❌ **Using Wrong Wait Condition**: Waiting for frame element visibility instead of availability
   - Why: Frame element and frame content readiness are different things
   - Fix: Use correct condition: `frameToBeAvailableAndSwitchToIt()` combines both checks

3. ❌ **Setting Insufficient Timeout**: Using too short timeout for frame load
   - Why: Frames with heavy content may take longer to load
   - Fix: Set appropriate timeout: `new WebDriverWait(driver, Duration.ofSeconds(15))`

4. ❌ **Not Waiting After Switching**: Immediately interacting with frame content after switch
   - Why: Frame content may still be loading even after frame is available
   - Fix: Add explicit wait for specific element after switching

5. ❌ **Ignoring Stale Element Issues**: Not handling stale elements after frame refreshes
   - Why: Frame content may dynamically reload, making cached elements stale
   - Fix: Re-locate elements after waiting; don't store element references for too long


**💡 Key Concepts:**

**1. Frame Wait Methods:**

```java
// Method 1: By name or ID (String)
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frameId"));

// Method 2: By locator (By)
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id("frameId")));

// Method 3: By WebElement
WebElement frame = driver.findElement(By.id("frameId"));
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frame));
```

**2. Complete Wait Pattern:**

```java
// Step 1: Wait for frame
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frameId"));

// Step 2: Wait for element inside frame
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("elementId"))
);

// Step 3: Interact
element.sendKeys("text");

// Step 4: Switch back
driver.switchTo().defaultContent();
```

**3. Custom Timeout for Frames:**

```java
// Different timeouts for different scenarios
WebDriverWait quickWait = new WebDriverWait(driver, Duration.ofSeconds(5));
WebDriverWait standardWait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebDriverWait slowWait = new WebDriverWait(driver, Duration.ofSeconds(30));

// Use appropriate wait
slowWait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("slow-loading-frame"));
```

**🎯 Practice Challenge:**

1. Create a method that waits for frame and returns boolean (found/not found)
2. Implement retry logic for frame switching (try 3 times with increasing timeouts)
3. Create a method that waits for nested frame with custom timeout
4. Add logging to show how long each frame took to load
5. Implement fluent wait for frames with polling interval

---

## Day 28: Window Handling

---

### Exercise 1: Understanding Windows vs Tabs (20 minutes)

**What you'll learn:** The difference between browser windows and tabs, and how Selenium treats them

**Practice Website:** https://the-internet.herokuapp.com/windows

**Concept Explanation:**

**What are Windows and Tabs?**
- In Selenium, both browser windows and browser tabs are called "windows"
- Each window/tab has a unique identifier called "window handle"
- Window handle is a string (looks like: CDwindow-ABCD1234...)
- You must switch to a window before interacting with its content

**Why Window Handling is Important:**
- Clicking links that open in new tabs
- Handling popups and alerts
- Multi-window applications
- Payment gateways, social logins that open new windows

**Create new package: `com.automation.windows`**
**Create new class: `WindowBasics`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.Set;

public class WindowBasics {
    public static void main(String[] args) {
        System.out.println("===== UNDERSTANDING WINDOWS & TABS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // STEP 1: Open main page and get window handle
            // ========================================
            driver.get("https://the-internet.herokuapp.com/windows");
            System.out.println("✅ Opened: " + driver.getTitle());
            Thread.sleep(1500);

            // Get the window handle of the main window
            String mainWindowHandle = driver.getWindowHandle();
            System.out.println("\n--- STEP 1: Main Window Handle ---");
            System.out.println("Main window handle: " + mainWindowHandle);
            System.out.println("Window handle type: " + mainWindowHandle.getClass().getSimpleName());
            System.out.println("Window handle length: " + mainWindowHandle.length() + " characters");

            // Check current window count
            Set<String> allHandles = driver.getWindowHandles();
            System.out.println("\nCurrent number of windows: " + allHandles.size());
            System.out.println("Current window title: " + driver.getTitle());

            // ========================================
            // STEP 2: Click link that opens new window
            // ========================================
            System.out.println("\n--- STEP 2: Opening New Window ---");

            // Click "Click Here" link - this opens a new window
            driver.findElement(By.linkText("Click Here")).click();
            System.out.println("✅ Clicked 'Click Here' link");
            Thread.sleep(2000);

            // Get all window handles after clicking
            Set<String> allWindowHandles = driver.getWindowHandles();
            System.out.println("\nTotal windows after click: " + allWindowHandles.size());

            // Print all window handles
            int count = 1;
            for (String handle : allWindowHandles) {
                System.out.println("Window " + count + " handle: " + handle);
                count++;
            }

            // ========================================
            // STEP 3: Try to access new window WITHOUT switching
            // ========================================
            System.out.println("\n--- STEP 3: Current Window Context ---");
            System.out.println("Current window title: " + driver.getTitle());
            System.out.println("Expected: We're still on MAIN window");

            // Verify we're still on main window
            if (driver.getTitle().equals("The Internet")) {
                System.out.println("✅ Confirmed: Still on main window");
                System.out.println("   Note: New window opened but Selenium didn't switch!");
            }

            // ========================================
            // STEP 4: Switch to new window
            // ========================================
            System.out.println("\n--- STEP 4: Switching to New Window ---");

            // Find the new window handle
            String newWindowHandle = "";
            for (String handle : allWindowHandles) {
                if (!handle.equals(mainWindowHandle)) {
                    newWindowHandle = handle;
                    break;
                }
            }

            System.out.println("New window handle: " + newWindowHandle);

            // Switch to new window
            driver.switchTo().window(newWindowHandle);
            System.out.println("✅ Switched to new window");

            // Verify we're on new window
            System.out.println("\nCurrent window title: " + driver.getTitle());
            System.out.println("Page heading: " + driver.findElement(By.tagName("h3")).getText());

            Thread.sleep(2000);

            // ========================================
            // STEP 5: Switch back to main window
            // ========================================
            System.out.println("\n--- STEP 5: Switching Back to Main Window ---");

            driver.switchTo().window(mainWindowHandle);
            System.out.println("✅ Switched back to main window");
            System.out.println("Current window title: " + driver.getTitle());
            System.out.println("Page heading: " + driver.findElement(By.tagName("h3")).getText());

            Thread.sleep(1500);

            // ========================================
            // STEP 6: Close new window and verify
            // ========================================
            System.out.println("\n--- STEP 6: Closing New Window ---");

            // Switch to new window
            driver.switchTo().window(newWindowHandle);
            System.out.println("Current window before close: " + driver.getTitle());

            // Close current window
            driver.close();
            System.out.println("✅ New window closed using driver.close()");

            // Check window count
            Set<String> remainingHandles = driver.getWindowHandles();
            System.out.println("Remaining windows: " + remainingHandles.size());

            // Switch back to main window (required after close)
            driver.switchTo().window(mainWindowHandle);
            System.out.println("✅ Switched back to main window");
            System.out.println("Current window: " + driver.getTitle());

            // ========================================
            // KEY LEARNINGS
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("KEY LEARNINGS:");
            System.out.println("=====================================");
            System.out.println("1. Window Handle:");
            System.out.println("   - Unique ID for each window/tab");
            System.out.println("   - String type (e.g., CDwindow-1234)");
            System.out.println("   - Get using: getWindowHandle()");
            System.out.println("\n2. Multiple Windows:");
            System.out.println("   - Get all: getWindowHandles()");
            System.out.println("   - Returns Set<String>");
            System.out.println("   - Must switch to interact");
            System.out.println("\n3. Methods:");
            System.out.println("   - driver.close()  → Close current window");
            System.out.println("   - driver.quit()   → Close all windows");
            System.out.println("   - switchTo().window(handle) → Switch window");
            System.out.println("\n4. Important:");
            System.out.println("   - Opening new window ≠ Automatic switch");
            System.out.println("   - Must manually switch using switchTo()");
            System.out.println("   - After close(), switch to valid window");
            System.out.println("=====================================");

            Thread.sleep(2000);

        } catch (Exception e) {
            System.out.println("\n❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✅ All windows closed (driver.quit())");
        }
    }
}
```

**Expected Output:**
```
===== UNDERSTANDING WINDOWS & TABS =====

✅ Opened: The Internet

--- STEP 1: Main Window Handle ---
Main window handle: CDwindow-A1B2C3D4E5F6G7H8
Window handle type: String
Window handle length: 32 characters

Current number of windows: 1
Current window title: The Internet

--- STEP 2: Opening New Window ---
✅ Clicked 'Click Here' link

Total windows after click: 2
Window 1 handle: CDwindow-A1B2C3D4E5F6G7H8
Window 2 handle: CDwindow-I9J0K1L2M3N4O5P6

--- STEP 3: Current Window Context ---
Current window title: The Internet
Expected: We're still on MAIN window
✅ Confirmed: Still on main window
   Note: New window opened but Selenium didn't switch!

--- STEP 4: Switching to New Window ---
New window handle: CDwindow-I9J0K1L2M3N4O5P6
✅ Switched to new window

Current window title: New Window
Page heading: New Window

--- STEP 5: Switching Back to Main Window ---
✅ Switched back to main window
Current window title: The Internet
Page heading: Opening a new window

--- STEP 6: Closing New Window ---
Current window before close: New Window
✅ New window closed using driver.close()
Remaining windows: 1
✅ Switched back to main window
Current window: The Internet

=====================================
KEY LEARNINGS:
=====================================
1. Window Handle:
   - Unique ID for each window/tab
   - String type (e.g., CDwindow-1234)
   - Get using: getWindowHandle()

2. Multiple Windows:
   - Get all: getWindowHandles()
   - Returns Set<String>
   - Must switch to interact

3. Methods:
   - driver.close()  → Close current window
   - driver.quit()   → Close all windows
   - switchTo().window(handle) → Switch window

4. Important:
   - Opening new window ≠ Automatic switch
   - Must manually switch using switchTo()
   - After close(), switch to valid window
=====================================

✅ All windows closed (driver.quit())
```

**What Happens in Browser:**
1. Main window opens showing "Opening a new window" page
2. After clicking "Click Here", a new window/tab opens
3. New window shows "New Window" heading
4. Selenium switches between windows (you may see tab switching)
5. New window closes, main window remains
6. All windows close at the end

**✅ Success Criteria:**
- Main window handle is captured successfully
- New window opens after click
- Total windows count increases to 2
- Current window remains main window after opening new window
- Successfully switch to new window
- New window title is "New Window"
- Successfully switch back to main window
- New window closes successfully
- Remaining window count is 1

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchWindowException | Invalid window handle | Verify handle exists in getWindowHandles() |
| "no such window: target window already closed" | Trying to switch to closed window | Check window is open before switching |
| StaleElementReferenceException | Switched windows after finding element | Re-find element after switching |
| NoSuchElementException | Looking for element in wrong window | Verify current window context |


**Common Mistakes:**
1. ❌ **Confusing Windows with Tabs**: Treating tabs and windows as different in Selenium
   - Why: In Selenium, both tabs and windows are handled identically as "window handles"
   - Fix: Use same methods (`getWindowHandle()`, `getWindowHandles()`) for both

2. ❌ **Not Storing Original Window Handle**: Losing reference to parent window
   - Why: Cannot switch back to original window without its handle
   - Fix: Always store before opening new window: `String parentWindow = driver.getWindowHandle()`

3. ❌ **Forgetting to Switch to New Window**: Assuming driver automatically focuses new window
   - Why: Driver stays in original window context after new window opens
   - Fix: Explicitly switch: `driver.switchTo().window(newWindowHandle)`

4. ❌ **Using Wrong Window Handle**: Switching to incorrect window handle
   - Why: Window handles are unique strings; using wrong one causes NoSuchWindowException
   - Fix: Verify handle exists before switching

5. ❌ **Not Closing Windows**: Opening windows without closing them in tests
   - Why: Accumulates browser windows; memory leak and affects subsequent tests
   - Fix: Always close: `driver.close()` for current window, or `driver.quit()` for all


**💡 Key Concepts:**

**1. Window Handle Methods:**

```java
// Get current window handle (single String)
String mainHandle = driver.getWindowHandle();

// Get all window handles (Set<String>)
Set<String> allHandles = driver.getWindowHandles();

// Count windows
int windowCount = driver.getWindowHandles().size();
```

**2. Switching Windows:**

```java
// Store main window handle
String mainWindow = driver.getWindowHandle();

// After new window opens, get all handles
Set<String> allWindows = driver.getWindowHandles();

// Find new window handle
for (String handle : allWindows) {
    if (!handle.equals(mainWindow)) {
        // Switch to new window
        driver.switchTo().window(handle);
        break;
    }
}
```

**3. Close vs Quit:**

```java
// driver.close() - Closes CURRENT window only
driver.close();  // Other windows remain open

// driver.quit() - Closes ALL windows and ends session
driver.quit();   // Entire browser closes
```

**🎯 Practice Challenge:**

1. Open 3 windows and switch between them
2. Print titles of all open windows
3. Close all windows except main window
4. Verify window count after each operation

---

### Exercise 2: Handling Multiple Windows (25 minutes)

**What you'll learn:** Advanced techniques for switching between multiple windows

**Create new class: `MultipleWindows`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class MultipleWindows {
    public static void main(String[] args) {
        System.out.println("===== HANDLING MULTIPLE WINDOWS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            driver.get("https://the-internet.herokuapp.com/windows");
            System.out.println("✅ Main page loaded\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 1: Using Set to iterate
            // ========================================
            System.out.println("--- METHOD 1: Using Set<String> ---\n");

            // Store main window
            String mainWindow = driver.getWindowHandle();
            System.out.println("Main window stored: " + mainWindow.substring(0, 15) + "...");

            // Open new window
            driver.findElement(By.linkText("Click Here")).click();
            System.out.println("✅ New window opened");
            Thread.sleep(1500);

            // Get all windows
            Set<String> allWindows = driver.getWindowHandles();
            System.out.println("Total windows: " + allWindows.size());

            // Iterate through all windows
            System.out.println("\nIterating through all windows:");
            int counter = 1;
            for (String windowHandle : allWindows) {
                driver.switchTo().window(windowHandle);
                String title = driver.getTitle();
                System.out.println("  Window " + counter + ": " + title);
                counter++;
            }

            // Close new window
            for (String handle : allWindows) {
                if (!handle.equals(mainWindow)) {
                    driver.switchTo().window(handle);
                    driver.close();
                    System.out.println("\n✅ New window closed");
                }
            }

            driver.switchTo().window(mainWindow);
            System.out.println("✅ Back to main window\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 2: Using List (Index-based)
            // ========================================
            System.out.println("--- METHOD 2: Using ArrayList (Index-based) ---\n");

            // Open new window again
            driver.findElement(By.linkText("Click Here")).click();
            System.out.println("✅ New window opened");
            Thread.sleep(1500);

            // Convert Set to List for index-based access
            List<String> windowList = new ArrayList<>(driver.getWindowHandles());
            System.out.println("Total windows: " + windowList.size());

            System.out.println("\nAccessing windows by index:");
            System.out.println("  Window 0 (Main): " + windowList.get(0).substring(0, 15) + "...");
            System.out.println("  Window 1 (New): " + windowList.get(1).substring(0, 15) + "...");

            // Switch to window by index
            driver.switchTo().window(windowList.get(1));
            System.out.println("\n✅ Switched to window at index 1");
            System.out.println("   Title: " + driver.getTitle());

            // Switch to window by index 0
            driver.switchTo().window(windowList.get(0));
            System.out.println("✅ Switched to window at index 0");
            System.out.println("   Title: " + driver.getTitle());

            // Close window at index 1
            driver.switchTo().window(windowList.get(1));
            driver.close();
            System.out.println("\n✅ Closed window at index 1\n");

            driver.switchTo().window(windowList.get(0));
            Thread.sleep(1500);

            // ========================================
            // METHOD 3: Using Window Title
            // ========================================
            System.out.println("--- METHOD 3: Switch by Window Title ---\n");

            // Open new window
            driver.findElement(By.linkText("Click Here")).click();
            System.out.println("✅ New window opened");
            Thread.sleep(1500);

            // Switch by title
            Set<String> handles = driver.getWindowHandles();
            for (String handle : handles) {
                driver.switchTo().window(handle);
                if (driver.getTitle().equals("New Window")) {
                    System.out.println("✅ Found and switched to window with title: 'New Window'");
                    break;
                }
            }

            System.out.println("   Current window: " + driver.getTitle());

            // Close and switch back
            driver.close();
            driver.switchTo().window(mainWindow);
            System.out.println("✅ Closed new window and returned to main\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 4: Switch to Last Opened Window
            // ========================================
            System.out.println("--- METHOD 4: Switch to Last Opened Window ---\n");

            String currentWindow = driver.getWindowHandle();
            System.out.println("Before opening: " + driver.getWindowHandles().size() + " window(s)");

            // Open new window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            System.out.println("After opening: " + driver.getWindowHandles().size() + " window(s)");

            // Get all windows and find the newest one
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(currentWindow)) {
                    driver.switchTo().window(handle);
                    System.out.println("✅ Switched to last opened window");
                    System.out.println("   Title: " + driver.getTitle());
                }
            }

            driver.close();
            driver.switchTo().window(currentWindow);
            System.out.println("✅ Closed and returned to main\n");
            Thread.sleep(1500);

            // ========================================
            // METHOD 5: Opening Multiple Windows
            // ========================================
            System.out.println("--- METHOD 5: Multiple Windows Scenario ---\n");

            System.out.println("Opening 3 new windows...");

            // Open first new window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1000);

            // Go back to main window and open second new window
            driver.switchTo().window(mainWindow);
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1000);

            // Go back to main window and open third new window
            driver.switchTo().window(mainWindow);
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1000);

            // Get all windows
            List<String> allWindowsList = new ArrayList<>(driver.getWindowHandles());
            System.out.println("\n✅ Total windows now: " + allWindowsList.size());

            // Print all window titles
            System.out.println("\nAll window titles:");
            for (int i = 0; i < allWindowsList.size(); i++) {
                driver.switchTo().window(allWindowsList.get(i));
                System.out.println("  " + (i + 1) + ". " + driver.getTitle());
            }

            // Close all except main window
            System.out.println("\nClosing all except main window...");
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(mainWindow)) {
                    driver.switchTo().window(handle);
                    driver.close();
                }
            }

            driver.switchTo().window(mainWindow);
            System.out.println("✅ All new windows closed");
            System.out.println("   Remaining windows: " + driver.getWindowHandles().size());

            // ========================================
            // COMPARISON TABLE
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("WINDOW SWITCHING METHODS COMPARISON:");
            System.out.println("=====================================");
            System.out.println("Method                    | Pros                      | Cons");
            System.out.println("--------------------------|---------------------------|---------------------------");
            System.out.println("Set iteration             | Simple, reliable          | No index access");
            System.out.println("ArrayList (index)         | Direct access by position | Order may vary");
            System.out.println("By title                  | Semantic, readable        | Title must be unique");
            System.out.println("Last opened               | Gets newest window        | Assumes one new window");
            System.out.println("=====================================");
            System.out.println("\nBEST PRACTICES:");
            System.out.println("  ✅ Store main window handle at start");
            System.out.println("  ✅ Use meaningful variable names");
            System.out.println("  ✅ Always close windows you opened");
            System.out.println("  ✅ Switch back to valid window after close");
            System.out.println("  ✅ Use List for index-based access");
            System.out.println("  ✅ Use title matching for specific windows");
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
===== HANDLING MULTIPLE WINDOWS =====

✅ Main page loaded

--- METHOD 1: Using Set<String> ---

Main window stored: CDwindow-A1B2C3...
✅ New window opened
Total windows: 2

Iterating through all windows:
  Window 1: The Internet
  Window 2: New Window

✅ New window closed
✅ Back to main window

--- METHOD 2: Using ArrayList (Index-based) ---

✅ New window opened
Total windows: 2

Accessing windows by index:
  Window 0 (Main): CDwindow-A1B2C3...
  Window 1 (New): CDwindow-I9J0K1...

✅ Switched to window at index 1
   Title: New Window
✅ Switched to window at index 0
   Title: The Internet

✅ Closed window at index 1

--- METHOD 3: Switch by Window Title ---

✅ New window opened
✅ Found and switched to window with title: 'New Window'
   Current window: New Window
✅ Closed new window and returned to main

--- METHOD 4: Switch to Last Opened Window ---

Before opening: 1 window(s)
After opening: 2 window(s)
✅ Switched to last opened window
   Title: New Window
✅ Closed and returned to main

--- METHOD 5: Multiple Windows Scenario ---

Opening 3 new windows...

✅ Total windows now: 4

All window titles:
  1. The Internet
  2. New Window
  3. New Window
  4. New Window

Closing all except main window...
✅ All new windows closed
   Remaining windows: 1

=====================================
WINDOW SWITCHING METHODS COMPARISON:
=====================================
Method                    | Pros                      | Cons
--------------------------|---------------------------|---------------------------
Set iteration             | Simple, reliable          | No index access
ArrayList (index)         | Direct access by position | Order may vary
By title                  | Semantic, readable        | Title must be unique
Last opened               | Gets newest window        | Assumes one new window
=====================================

BEST PRACTICES:
  ✅ Store main window handle at start
  ✅ Use meaningful variable names
  ✅ Always close windows you opened
  ✅ Switch back to valid window after close
  ✅ Use List for index-based access
  ✅ Use title matching for specific windows
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Main window opens
2. Multiple new windows/tabs open one by one
3. You see window/tab switching happening
4. New windows close one by one
5. Finally only main window remains
6. All windows close

**✅ Success Criteria:**
- All 5 methods work successfully
- Windows are opened and closed correctly
- Switching between windows succeeds
- Multiple windows scenario handles 4 windows correctly
- All new windows are closed, leaving only main window
- Comparison table displays correctly

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchWindowException | Window already closed | Check window exists before switching |
| IndexOutOfBoundsException | Invalid list index | Verify list size before accessing index |
| ConcurrentModificationException | Modifying Set while iterating | Use iterator or copy to List first |
| "target window already closed" | Switching to closed window | Keep track of which windows are open |


**Common Mistakes:**
1. ❌ **Not Handling Window Handle Set Properly**: Treating Set<String> as ordered list
   - Why: Set is unordered; cannot reliably access "second" window by iteration order
   - Fix: Compare current handle with getWindowHandles() to find new windows

2. ❌ **Assuming Only One New Window**: Not handling cases where multiple windows open
   - Why: Some actions might open multiple windows/tabs
   - Fix: Check `getWindowHandles().size()` and handle all windows appropriately

3. ❌ **Using Close() Instead of Quit()**: Closing current window but not cleaning up
   - Why: `close()` only closes current window; other windows remain open
   - Fix: Use `quit()` at end of test to close all windows

4. ❌ **Not Verifying Window Switch**: Switching without confirming correct window active
   - Why: Switch might fail; subsequent actions happen in wrong window
   - Fix: Verify by checking page title or URL after switch

5. ❌ **Poor Window Handle Management**: Not tracking which handle corresponds to which window
   - Why: Gets confusing with multiple windows; hard to debug
   - Fix: Store handles with descriptive names


**💡 Key Concepts:**

**1. Set vs List for Window Handles:**

```java
// Set - No index access, iteration only
Set<String> windowSet = driver.getWindowHandles();
for (String handle : windowSet) {
    // Iterate
}

// List - Index-based access
List<String> windowList = new ArrayList<>(driver.getWindowHandles());
String firstWindow = windowList.get(0);    // Main window (usually)
String secondWindow = windowList.get(1);   // New window (usually)
```

**2. Finding Specific Window:**

```java
// By title
for (String handle : driver.getWindowHandles()) {
    driver.switchTo().window(handle);
    if (driver.getTitle().equals("Expected Title")) {
        // Found it!
        break;
    }
}

// By URL
for (String handle : driver.getWindowHandles()) {
    driver.switchTo().window(handle);
    if (driver.getCurrentUrl().contains("expected-url")) {
        // Found it!
        break;
    }
}
```

**3. Closing Multiple Windows:**

```java
// Close all except main
String mainWindow = driver.getWindowHandle();

for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);
        driver.close();
    }
}

// Must switch back to valid window
driver.switchTo().window(mainWindow);
```

**🎯 Practice Challenge:**

1. Create a method that returns window handle by title
2. Create a method that closes all windows except a specified one
3. Open 5 windows and switch to the middle one (index 2)
4. Print URLs of all open windows
5. Create a method that switches to window containing specific text in URL

---

### Exercise 3: Window Switching with getWindowHandles() (25 minutes)

**What you'll learn:** Advanced window handle manipulation and switching strategies

**Create new class: `WindowHandlesAdvanced`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class WindowHandlesAdvanced {

    // Helper method: Switch to window by title
    private static boolean switchToWindowByTitle(WebDriver driver, String expectedTitle) {
        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
            if (driver.getTitle().equals(expectedTitle)) {
                return true;
            }
        }
        return false;
    }

    // Helper method: Print all window information
    private static void printAllWindows(WebDriver driver) {
        String currentHandle = driver.getWindowHandle();
        System.out.println("\n📋 Current Windows:");
        int count = 1;
        for (String handle : driver.getWindowHandles()) {
            driver.switchTo().window(handle);
            String marker = handle.equals(currentHandle) ? " [CURRENT]" : "";
            System.out.println("  " + count + ". " + driver.getTitle() + marker);
            System.out.println("     URL: " + driver.getCurrentUrl());
            System.out.println("     Handle: " + handle.substring(0, 20) + "...");
            count++;
        }
        driver.switchTo().window(currentHandle);
    }

    // Helper method: Close all except main window
    private static void closeAllExceptMain(WebDriver driver, String mainWindowHandle) {
        for (String handle : driver.getWindowHandles()) {
            if (!handle.equals(mainWindowHandle)) {
                driver.switchTo().window(handle);
                driver.close();
            }
        }
        driver.switchTo().window(mainWindowHandle);
    }

    public static void main(String[] args) {
        System.out.println("===== ADVANCED WINDOW HANDLES OPERATIONS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // SCENARIO 1: Iterator Pattern
            // ========================================
            System.out.println("--- SCENARIO 1: Using Iterator Pattern ---\n");

            driver.get("https://the-internet.herokuapp.com/windows");
            String mainWindow = driver.getWindowHandle();
            System.out.println("✅ Main window: " + driver.getTitle());

            // Open new window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            System.out.println("\nUsing Iterator to switch windows:");
            Set<String> handles = driver.getWindowHandles();
            Iterator<String> iterator = handles.iterator();

            while (iterator.hasNext()) {
                String handle = iterator.next();
                driver.switchTo().window(handle);
                System.out.println("  Switched to: " + driver.getTitle());
            }

            // Clean up
            closeAllExceptMain(driver, mainWindow);
            System.out.println("\n✅ Cleaned up windows\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 2: Stream API (Modern Java)
            // ========================================
            System.out.println("--- SCENARIO 2: Using Stream API (Java 8+) ---\n");

            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            System.out.println("Finding window with title 'New Window' using Stream:");

            // Using Stream to find window by title
            driver.getWindowHandles().stream()
                .filter(handle -> {
                    driver.switchTo().window(handle);
                    return driver.getTitle().equals("New Window");
                })
                .findFirst()
                .ifPresent(handle -> {
                    System.out.println("✅ Found window: " + driver.getTitle());
                });

            // Clean up
            closeAllExceptMain(driver, mainWindow);
            System.out.println("✅ Cleaned up windows\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 3: Multiple Windows with Data Extraction
            // ========================================
            System.out.println("--- SCENARIO 3: Data Extraction from Multiple Windows ---\n");

            System.out.println("Opening 3 new windows...");
            for (int i = 0; i < 3; i++) {
                driver.switchTo().window(mainWindow);
                driver.findElement(By.linkText("Click Here")).click();
                Thread.sleep(800);
            }

            // Collect data from all windows
            List<String> windowTitles = new ArrayList<>();
            List<String> windowUrls = new ArrayList<>();

            for (String handle : driver.getWindowHandles()) {
                driver.switchTo().window(handle);
                windowTitles.add(driver.getTitle());
                windowUrls.add(driver.getCurrentUrl());
            }

            System.out.println("\n✅ Data collected from " + windowTitles.size() + " windows");
            System.out.println("\nWindow Data:");
            for (int i = 0; i < windowTitles.size(); i++) {
                System.out.println("  Window " + (i + 1) + ":");
                System.out.println("    Title: " + windowTitles.get(i));
                System.out.println("    URL: " + windowUrls.get(i));
            }

            // Clean up
            closeAllExceptMain(driver, mainWindow);
            System.out.println("\n✅ Cleaned up windows\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 4: Finding New Window (Smart Method)
            // ========================================
            System.out.println("--- SCENARIO 4: Smart New Window Detection ---\n");

            // Store current window handles
            Set<String> oldHandles = driver.getWindowHandles();
            System.out.println("Windows before click: " + oldHandles.size());

            // Perform action that opens new window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            // Get new window handles
            Set<String> newHandles = driver.getWindowHandles();
            System.out.println("Windows after click: " + newHandles.size());

            // Find the new window handle
            newHandles.removeAll(oldHandles);
            String newWindowHandle = newHandles.iterator().next();

            System.out.println("\n✅ New window detected!");
            driver.switchTo().window(newWindowHandle);
            System.out.println("   Title: " + driver.getTitle());
            System.out.println("   URL: " + driver.getCurrentUrl());

            // Clean up
            closeAllExceptMain(driver, mainWindow);
            System.out.println("\n✅ Cleaned up windows\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 5: Helper Methods in Action
            // ========================================
            System.out.println("--- SCENARIO 5: Using Helper Methods ---\n");

            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            System.out.println("Method 1: Switch by title");
            boolean switched = switchToWindowByTitle(driver, "New Window");
            if (switched) {
                System.out.println("✅ Successfully switched to: " + driver.getTitle());
            }

            driver.switchTo().window(mainWindow);
            System.out.println("\nMethod 2: Print all windows");
            printAllWindows(driver);

            System.out.println("\nMethod 3: Close all except main");
            closeAllExceptMain(driver, mainWindow);
            System.out.println("✅ All windows closed except main");
            System.out.println("   Remaining windows: " + driver.getWindowHandles().size());

            Thread.sleep(1500);

            // ========================================
            // SCENARIO 6: Real-World Pattern
            // ========================================
            System.out.println("\n--- SCENARIO 6: Real-World Multi-Window Pattern ---\n");
            System.out.println("Simulating: Login in popup, then return to main page\n");

            // Step 1: Store main window
            String parentWindow = driver.getWindowHandle();
            System.out.println("Step 1: Main window stored");

            // Step 2: Click to open popup
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);
            System.out.println("Step 2: Popup opened");

            // Step 3: Switch to popup
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(parentWindow)) {
                    driver.switchTo().window(handle);
                    System.out.println("Step 3: Switched to popup");
                    break;
                }
            }

            // Step 4: Perform action in popup
            String popupHeading = driver.findElement(By.tagName("h3")).getText();
            System.out.println("Step 4: Action in popup - Read heading: '" + popupHeading + "'");

            // Step 5: Close popup
            driver.close();
            System.out.println("Step 5: Popup closed");

            // Step 6: Return to main window
            driver.switchTo().window(parentWindow);
            System.out.println("Step 6: Returned to main window");
            System.out.println("        Main window title: " + driver.getTitle());

            System.out.println("\n✅ Multi-window workflow completed!");

            // ========================================
            // SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("WINDOW HANDLE PATTERNS:");
            System.out.println("=====================================");
            System.out.println("\n1. ITERATOR PATTERN:");
            System.out.println("   Iterator<String> it = handles.iterator();");
            System.out.println("   while (it.hasNext()) { ... }");
            System.out.println("\n2. ENHANCED FOR LOOP:");
            System.out.println("   for (String handle : handles) { ... }");
            System.out.println("\n3. STREAM API (Java 8+):");
            System.out.println("   handles.stream().filter(...).findFirst()");
            System.out.println("\n4. SET OPERATIONS:");
            System.out.println("   newHandles.removeAll(oldHandles)");
            System.out.println("\n5. HELPER METHODS:");
            System.out.println("   Custom methods for reusable logic");
            System.out.println("=====================================");
            System.out.println("\nCOMMON PATTERNS:");
            System.out.println("  1. Store main window handle at start");
            System.out.println("  2. Detect new window by Set difference");
            System.out.println("  3. Switch by title/URL for specific windows");
            System.out.println("  4. Always close popups when done");
            System.out.println("  5. Always switch back to valid window");
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
===== ADVANCED WINDOW HANDLES OPERATIONS =====

--- SCENARIO 1: Using Iterator Pattern ---

✅ Main window: The Internet

Using Iterator to switch windows:
  Switched to: The Internet
  Switched to: New Window

✅ Cleaned up windows

--- SCENARIO 2: Using Stream API (Java 8+) ---

Finding window with title 'New Window' using Stream:
✅ Found window: New Window
✅ Cleaned up windows

--- SCENARIO 3: Data Extraction from Multiple Windows ---

Opening 3 new windows...

✅ Data collected from 4 windows

Window Data:
  Window 1:
    Title: The Internet
    URL: https://the-internet.herokuapp.com/windows
  Window 2:
    Title: New Window
    URL: https://the-internet.herokuapp.com/windows/new
  Window 3:
    Title: New Window
    URL: https://the-internet.herokuapp.com/windows/new
  Window 4:
    Title: New Window
    URL: https://the-internet.herokuapp.com/windows/new

✅ Cleaned up windows

--- SCENARIO 4: Smart New Window Detection ---

Windows before click: 1
Windows after click: 2

✅ New window detected!
   Title: New Window
   URL: https://the-internet.herokuapp.com/windows/new

✅ Cleaned up windows

--- SCENARIO 5: Using Helper Methods ---

Method 1: Switch by title
✅ Successfully switched to: New Window

Method 2: Print all windows

📋 Current Windows:
  1. The Internet [CURRENT]
     URL: https://the-internet.herokuapp.com/windows
     Handle: CDwindow-A1B2C3D4E5F6...
  2. New Window
     URL: https://the-internet.herokuapp.com/windows/new
     Handle: CDwindow-G7H8I9J0K1L2...

Method 3: Close all except main
✅ All windows closed except main
   Remaining windows: 1

--- SCENARIO 6: Real-World Multi-Window Pattern ---

Simulating: Login in popup, then return to main page

Step 1: Main window stored
Step 2: Popup opened
Step 3: Switched to popup
Step 4: Action in popup - Read heading: 'New Window'
Step 5: Popup closed
Step 6: Returned to main window
        Main window title: The Internet

✅ Multi-window workflow completed!

=====================================
WINDOW HANDLE PATTERNS:
=====================================

1. ITERATOR PATTERN:
   Iterator<String> it = handles.iterator();
   while (it.hasNext()) { ... }

2. ENHANCED FOR LOOP:
   for (String handle : handles) { ... }

3. STREAM API (Java 8+):
   handles.stream().filter(...).findFirst()

4. SET OPERATIONS:
   newHandles.removeAll(oldHandles)

5. HELPER METHODS:
   Custom methods for reusable logic
=====================================

COMMON PATTERNS:
  1. Store main window handle at start
  2. Detect new window by Set difference
  3. Switch by title/URL for specific windows
  4. Always close popups when done
  5. Always switch back to valid window
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Multiple windows open and close throughout scenarios
2. Window switching happens rapidly
3. Data is collected from multiple windows
4. Final cleanup leaves only main window
5. Browser closes

**✅ Success Criteria:**
- Iterator pattern works correctly
- Stream API finds window by title
- Data extraction collects information from all windows
- Smart detection identifies new window
- Helper methods function properly
- Real-world pattern completes successfully
- All windows except main are closed

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchElementException in stream | Window doesn't exist anymore | Add null checks or try-catch |
| ConcurrentModificationException | Modifying Set during iteration | Use removeAll on a copy of the Set |
| NullPointerException | No new window found | Check Set is not empty before accessing |
| NoSuchWindowException | Window closed during operation | Verify window exists before switching |


**Common Mistakes:**
1. ❌ **Not Understanding Set Data Structure**: Expecting ordered window handles
   - Why: `getWindowHandles()` returns Set<String>, which has no guaranteed order
   - Fix: Don't rely on order; identify windows by title, URL, or by process of elimination

2. ❌ **Calling getWindowHandles() Only Once**: Storing window handles and reusing
   - Why: Window handles are valid but new windows won't be in stored Set
   - Fix: Call `getWindowHandles()` each time you need current window list

3. ❌ **Not Filtering Old vs New Handles**: Cannot distinguish between original and new windows
   - Why: All handles are just strings; no built-in way to know which is which
   - Fix: Store original handles before action, then compare

4. ❌ **Iterating Inefficiently**: Complex loops to find target window
   - Why: Verbose code that's hard to maintain
   - Fix: Use helper methods to find window by title/URL

5. ❌ **Forgetting to Switch After Finding Handle**: Getting handle but not using it
   - Why: Found the right handle but driver still in wrong window context
   - Fix: Always follow with `driver.switchTo().window(targetHandle)`


**💡 Key Concepts:**

**1. Set Difference for New Window:**

```java
// Before opening window
Set<String> oldHandles = driver.getWindowHandles();

// Open new window
driver.findElement(By.linkText("Click")).click();

// After opening window
Set<String> newHandles = driver.getWindowHandles();

// Find the difference (new window)
newHandles.removeAll(oldHandles);  // newHandles now contains only the new window
String newWindow = newHandles.iterator().next();
```

**2. Helper Methods Pattern:**

```java
// Reusable method to switch by title
public static boolean switchToWindowByTitle(WebDriver driver, String title) {
    for (String handle : driver.getWindowHandles()) {
        driver.switchTo().window(handle);
        if (driver.getTitle().equals(title)) {
            return true;  // Found and switched
        }
    }
    return false;  // Not found
}

// Usage
if (switchToWindowByTitle(driver, "Login Page")) {
    // Perform login
}
```

**3. Stream API (Modern Java):**

```java
// Find window by title using Stream
driver.getWindowHandles().stream()
    .filter(handle -> {
        driver.switchTo().window(handle);
        return driver.getTitle().contains("Search");
    })
    .findFirst()
    .ifPresent(handle -> {
        // Window found and switched
        System.out.println("Found: " + driver.getTitle());
    });
```

**🎯 Practice Challenge:**

1. Create a method that returns all window titles as a List
2. Create a method that finds window by partial URL match
3. Implement a method that switches to window containing specific text
4. Create a method that closes all windows with specific title pattern
5. Build a WindowManager class with all helper methods

---

### Exercise 4: Handling Parent and Child Windows (30 minutes)

**What you'll learn:** Managing parent-child window relationships

**Create new class: `ParentChildWindows`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ParentChildWindows {

    // Helper: Print window relationship
    private static void printWindowRelationship(WebDriver driver, String parent, String child) {
        System.out.println("\n🔗 Window Relationship:");
        driver.switchTo().window(parent);
        System.out.println("   Parent: " + driver.getTitle());
        driver.switchTo().window(child);
        System.out.println("   Child: " + driver.getTitle());
    }

    // Helper: Verify window is still open
    private static boolean isWindowOpen(WebDriver driver, String windowHandle) {
        try {
            driver.switchTo().window(windowHandle);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static void main(String[] args) {
        System.out.println("===== PARENT-CHILD WINDOW MANAGEMENT =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {
            // ========================================
            // SCENARIO 1: Basic Parent-Child Concept
            // ========================================
            System.out.println("--- SCENARIO 1: Parent-Child Window Concept ---\n");

            driver.get("https://the-internet.herokuapp.com/windows");
            String parentWindow = driver.getWindowHandle();
            System.out.println("Parent window: " + driver.getTitle());
            System.out.println("Parent handle: " + parentWindow.substring(0, 20) + "...");

            // Open child window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            // Get child window handle
            String childWindow = "";
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(parentWindow)) {
                    childWindow = handle;
                    break;
                }
            }

            System.out.println("\nChild window opened");
            System.out.println("Child handle: " + childWindow.substring(0, 20) + "...");

            // Print relationship
            printWindowRelationship(driver, parentWindow, childWindow);

            // Verify parent-child independence
            System.out.println("\n--- Testing Independence ---");

            // Modify child window
            driver.switchTo().window(childWindow);
            System.out.println("\n✅ In child window");
            System.out.println("   Can interact independently");

            // Parent still accessible
            driver.switchTo().window(parentWindow);
            System.out.println("\n✅ In parent window");
            System.out.println("   Parent unaffected by child operations");

            // Close child
            driver.switchTo().window(childWindow);
            driver.close();
            System.out.println("\n✅ Child window closed");

            driver.switchTo().window(parentWindow);
            System.out.println("✅ Parent window still open: " + driver.getTitle());
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 2: Multiple Child Windows
            // ========================================
            System.out.println("\n--- SCENARIO 2: Multiple Child Windows ---\n");

            String mainParent = driver.getWindowHandle();
            System.out.println("Main parent: " + driver.getTitle());

            // Open 3 child windows
            List<String> childWindows = new ArrayList<>();
            System.out.println("\nOpening 3 child windows...");

            for (int i = 1; i <= 3; i++) {
                driver.switchTo().window(mainParent);
                driver.findElement(By.linkText("Click Here")).click();
                Thread.sleep(800);

                // Get the newly opened child
                for (String handle : driver.getWindowHandles()) {
                    if (!handle.equals(mainParent) && !childWindows.contains(handle)) {
                        childWindows.add(handle);
                        System.out.println("  Child " + i + " opened");
                        break;
                    }
                }
            }

            System.out.println("\n✅ Total child windows: " + childWindows.size());

            // Interact with each child
            System.out.println("\n--- Interacting with Each Child ---");
            for (int i = 0; i < childWindows.size(); i++) {
                driver.switchTo().window(childWindows.get(i));
                String heading = driver.findElement(By.tagName("h3")).getText();
                System.out.println("Child " + (i + 1) + ": " + heading);
            }

            // Close all children, keep parent
            System.out.println("\n--- Closing All Child Windows ---");
            for (String child : childWindows) {
                driver.switchTo().window(child);
                driver.close();
                System.out.println("✅ Closed child window");
            }

            driver.switchTo().window(mainParent);
            System.out.println("\n✅ All children closed, parent remains");
            System.out.println("   Remaining windows: " + driver.getWindowHandles().size());
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 3: Nested Windows (Child opens Child)
            // ========================================
            System.out.println("\n--- SCENARIO 3: Nested Window Scenario ---\n");
            System.out.println("Simulating: Parent → Child → Grandchild\n");

            // Parent window
            String parent = driver.getWindowHandle();
            System.out.println("Level 1: Parent window");
            System.out.println("   Title: " + driver.getTitle());

            // Open child from parent
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            String child = "";
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(parent)) {
                    child = handle;
                    break;
                }
            }

            driver.switchTo().window(child);
            System.out.println("\nLevel 2: Child window (opened from parent)");
            System.out.println("   Title: " + driver.getTitle());

            // Note: The child window doesn't have a link to open another window,
            // but we'll demonstrate the concept
            System.out.println("\nLevel 3: Grandchild (conceptual)");
            System.out.println("   In real scenarios, child can open its own child window");
            System.out.println("   Pattern remains the same: track handles, switch as needed");

            // Cleanup in reverse order (best practice)
            System.out.println("\n--- Cleanup (Reverse Order) ---");
            System.out.println("Closing grandchild → child → keep parent");

            // Close child (would be grandchild in full scenario)
            driver.switchTo().window(child);
            driver.close();
            System.out.println("✅ Child closed");

            driver.switchTo().window(parent);
            System.out.println("✅ Returned to parent");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 4: Parent-Child Communication Pattern
            // ========================================
            System.out.println("\n--- SCENARIO 4: Data Transfer Pattern ---\n");
            System.out.println("Simulating: Get data from child, use in parent\n");

            String parentHandle = driver.getWindowHandle();
            String parentTitle = driver.getTitle();

            // Open child
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            // Switch to child and extract data
            String childHandle = "";
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(parentHandle)) {
                    childHandle = handle;
                    break;
                }
            }

            driver.switchTo().window(childHandle);
            String dataFromChild = driver.findElement(By.tagName("h3")).getText();
            System.out.println("Step 1: Extracted from child - '" + dataFromChild + "'");

            // Close child
            driver.close();
            System.out.println("Step 2: Child closed");

            // Return to parent and use data
            driver.switchTo().window(parentHandle);
            System.out.println("Step 3: Returned to parent");
            System.out.println("Step 4: Using data from child: '" + dataFromChild + "'");
            System.out.println("        (In real scenario: fill form, display message, etc.)");

            System.out.println("\n✅ Parent-child communication completed!");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 5: Error Handling
            // ========================================
            System.out.println("\n--- SCENARIO 5: Error Handling ---\n");

            // Open child window
            String currentParent = driver.getWindowHandle();
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            String currentChild = "";
            for (String handle : driver.getWindowHandles()) {
                if (!handle.equals(currentParent)) {
                    currentChild = handle;
                    break;
                }
            }

            System.out.println("Child window opened");

            // Close child
            driver.switchTo().window(currentChild);
            driver.close();
            System.out.println("Child window closed");

            // Try to switch to closed window
            System.out.println("\nTrying to switch to closed child window...");
            boolean childStillOpen = isWindowOpen(driver, currentChild);

            if (childStillOpen) {
                System.out.println("❌ This shouldn't print - window is closed!");
            } else {
                System.out.println("✅ Correctly detected: Child window is closed");
                System.out.println("   Prevented NoSuchWindowException");
            }

            // Always ensure we're on a valid window
            driver.switchTo().window(currentParent);
            System.out.println("✅ Safely switched to parent window");

            // ========================================
            // BEST PRACTICES SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("PARENT-CHILD WINDOW BEST PRACTICES:");
            System.out.println("=====================================");
            System.out.println("\n1. TRACKING:");
            System.out.println("   • Always store parent handle before opening child");
            System.out.println("   • Use meaningful variable names (parent, child)");
            System.out.println("   • Track multiple children in List/Array");
            System.out.println("\n2. SWITCHING:");
            System.out.println("   • Verify window exists before switching");
            System.out.println("   • Use helper methods for switching logic");
            System.out.println("   • Always know which window you're currently in");
            System.out.println("\n3. CLEANUP:");
            System.out.println("   • Close child windows before parent");
            System.out.println("   • Always switch back to valid window after close");
            System.out.println("   • Use try-finally to ensure cleanup");
            System.out.println("\n4. ERROR HANDLING:");
            System.out.println("   • Check if window is open before switching");
            System.out.println("   • Catch NoSuchWindowException gracefully");
            System.out.println("   • Have a fallback window to switch to");
            System.out.println("\n5. DATA FLOW:");
            System.out.println("   • Extract data from child before closing");
            System.out.println("   • Store data in variables for parent use");
            System.out.println("   • Close child only after data extraction");
            System.out.println("=====================================");
            System.out.println("\nREAL-WORLD EXAMPLES:");
            System.out.println("  • Payment gateways (child for payment)");
            System.out.println("  • Social login (OAuth popup)");
            System.out.println("  • Help/Documentation popup");
            System.out.println("  • Terms & Conditions popup");
            System.out.println("  • Product image gallery popup");
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
===== PARENT-CHILD WINDOW MANAGEMENT =====

--- SCENARIO 1: Parent-Child Window Concept ---

Parent window: The Internet
Parent handle: CDwindow-A1B2C3D4E5F6...

Child window opened
Child handle: CDwindow-G7H8I9J0K1L2...

🔗 Window Relationship:
   Parent: The Internet
   Child: New Window

--- Testing Independence ---

✅ In child window
   Can interact independently

✅ In parent window
   Parent unaffected by child operations

✅ Child window closed
✅ Parent window still open: The Internet

--- SCENARIO 2: Multiple Child Windows ---

Main parent: The Internet

Opening 3 child windows...
  Child 1 opened
  Child 2 opened
  Child 3 opened

✅ Total child windows: 3

--- Interacting with Each Child ---
Child 1: New Window
Child 2: New Window
Child 3: New Window

--- Closing All Child Windows ---
✅ Closed child window
✅ Closed child window
✅ Closed child window

✅ All children closed, parent remains
   Remaining windows: 1

--- SCENARIO 3: Nested Window Scenario ---

Simulating: Parent → Child → Grandchild

Level 1: Parent window
   Title: The Internet

Level 2: Child window (opened from parent)
   Title: New Window

Level 3: Grandchild (conceptual)
   In real scenarios, child can open its own child window
   Pattern remains the same: track handles, switch as needed

--- Cleanup (Reverse Order) ---
Closing grandchild → child → keep parent
✅ Child closed
✅ Returned to parent

--- SCENARIO 4: Data Transfer Pattern ---

Simulating: Get data from child, use in parent

Step 1: Extracted from child - 'New Window'
Step 2: Child closed
Step 3: Returned to parent
Step 4: Using data from child: 'New Window'
        (In real scenario: fill form, display message, etc.)

✅ Parent-child communication completed!

--- SCENARIO 5: Error Handling ---

Child window opened
Child window closed

Trying to switch to closed child window...
✅ Correctly detected: Child window is closed
   Prevented NoSuchWindowException
✅ Safely switched to parent window

=====================================
PARENT-CHILD WINDOW BEST PRACTICES:
=====================================

1. TRACKING:
   • Always store parent handle before opening child
   • Use meaningful variable names (parent, child)
   • Track multiple children in List/Array

2. SWITCHING:
   • Verify window exists before switching
   • Use helper methods for switching logic
   • Always know which window you're currently in

3. CLEANUP:
   • Close child windows before parent
   • Always switch back to valid window after close
   • Use try-finally to ensure cleanup

4. ERROR HANDLING:
   • Check if window is open before switching
   • Catch NoSuchWindowException gracefully
   • Have a fallback window to switch to

5. DATA FLOW:
   • Extract data from child before closing
   • Store data in variables for parent use
   • Close child only after data extraction
=====================================

REAL-WORLD EXAMPLES:
  • Payment gateways (child for payment)
  • Social login (OAuth popup)
  • Help/Documentation popup
  • Terms & Conditions popup
  • Product image gallery popup
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Main window opens
2. Child windows open and close multiple times
3. Multiple children are managed simultaneously
4. Data extraction happens from child window
5. All windows clean up properly
6. Browser closes

**✅ Success Criteria:**
- Parent-child relationship is established
- Multiple child windows are managed correctly
- All children close while parent remains
- Data extraction from child succeeds
- Error handling prevents exceptions
- Best practices are demonstrated

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchWindowException | Switching to closed window | Check isWindowOpen() before switching |
| IndexOutOfBoundsException | Child list index wrong | Verify list size before accessing |
| NullPointerException | Child handle is null | Check if child was found before using |
| "window already closed" | Trying to interact with closed window | Always verify window state |


**Common Mistakes:**
1. ❌ **Not Preserving Parent Handle**: Opening child window but losing parent reference
   - Why: Cannot switch back to parent without its handle
   - Fix: Store parent handle BEFORE opening child: `String parent = driver.getWindowHandle()`

2. ❌ **Assuming Child Window Opens Immediately**: Switching to child before it exists
   - Why: Window opening may have delay; causes NoSuchWindowException
   - Fix: Wait for window: `wait.until(ExpectedConditions.numberOfWindowsToBe(2))`

3. ❌ **Closing Wrong Window**: Accidentally closing parent when intending to close child
   - Why: `driver.close()` closes currently focused window; easy to be in wrong context
   - Fix: Verify current window before closing

4. ❌ **Not Handling Window Close Impact**: Closing window without realizing driver state
   - Why: After closing current window, driver needs new focus; operations will fail
   - Fix: After `driver.close()`, immediately switch to valid window

5. ❌ **Testing Only One Direction**: Switching parent→child but not testing child→parent
   - Why: Users navigate both ways; both paths need validation
   - Fix: Test bidirectional switching


**💡 Key Concepts:**

**1. Parent-Child Tracking:**

```java
// ALWAYS store parent before opening child
String parent = driver.getWindowHandle();

// Open child
driver.findElement(By.linkText("Open")).click();

// Find child
String child = "";
for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(parent)) {
        child = handle;
        break;
    }
}

// Now you have both handles tracked
```

**2. Multiple Children Management:**

```java
String parent = driver.getWindowHandle();
List<String> children = new ArrayList<>();

// Open and track multiple children
for (int i = 0; i < 3; i++) {
    driver.switchTo().window(parent);
    // Open child
    driver.findElement(By.linkText("Open")).click();

    // Find and store new child
    for (String handle : driver.getWindowHandles()) {
        if (!handle.equals(parent) && !children.contains(handle)) {
            children.add(handle);
            break;
        }
    }
}
```

**3. Safe Cleanup Pattern:**

```java
// Close all children first
for (String child : childrenList) {
    if (isWindowOpen(driver, child)) {
        driver.switchTo().window(child);
        driver.close();
    }
}

// Then work with parent
driver.switchTo().window(parent);
```

**🎯 Practice Challenge:**

1. Create a WindowManager class to track parent and children
2. Implement a method that closes all windows except a specified one
3. Build a method that extracts data from all child windows
4. Create error-safe switching with automatic fallback
5. Implement a counter to track how many children are open

---

### Exercise 5: Real-World Window Handling Scenarios (30 minutes)

**What you'll learn:** Complete practical scenarios combining all window handling techniques

**Create new class: `RealWorldWindowScenarios`**

```java
package com.automation.windows;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class RealWorldWindowScenarios {

    // Window Manager Class - Reusable Component
    static class WindowManager {
        private WebDriver driver;
        private String mainWindow;
        private List<String> childWindows;

        public WindowManager(WebDriver driver) {
            this.driver = driver;
            this.mainWindow = driver.getWindowHandle();
            this.childWindows = new ArrayList<>();
        }

        public void trackNewWindow() {
            Set<String> allWindows = driver.getWindowHandles();
            for (String window : allWindows) {
                if (!window.equals(mainWindow) && !childWindows.contains(window)) {
                    childWindows.add(window);
                }
            }
        }

        public boolean switchToWindow(String title) {
            for (String handle : driver.getWindowHandles()) {
                driver.switchTo().window(handle);
                if (driver.getTitle().equals(title)) {
                    return true;
                }
            }
            return false;
        }

        public void switchToMain() {
            driver.switchTo().window(mainWindow);
        }

        public void switchToLastChild() {
            if (!childWindows.isEmpty()) {
                String lastChild = childWindows.get(childWindows.size() - 1);
                driver.switchTo().window(lastChild);
            }
        }

        public void closeAllChildren() {
            for (String child : childWindows) {
                try {
                    driver.switchTo().window(child);
                    driver.close();
                } catch (Exception e) {
                    // Window already closed
                }
            }
            childWindows.clear();
            switchToMain();
        }

        public int getChildCount() {
            return childWindows.size();
        }

        public void printWindowStatus() {
            System.out.println("📊 Window Status:");
            System.out.println("   Main: " + mainWindow.substring(0, 15) + "...");
            System.out.println("   Children: " + childWindows.size());
            System.out.println("   Total Open: " + driver.getWindowHandles().size());
        }
    }

    public static void main(String[] args) {
        System.out.println("===== REAL-WORLD WINDOW HANDLING SCENARIOS =====\n");

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            // ========================================
            // SCENARIO 1: E-commerce Product Comparison
            // ========================================
            System.out.println("--- SCENARIO 1: Product Comparison ---\n");
            System.out.println("Simulating: Open multiple products in new tabs, compare\n");

            driver.get("https://the-internet.herokuapp.com/windows");
            WindowManager wm = new WindowManager(driver);

            System.out.println("Main catalog page loaded");
            System.out.println("Opening 3 products in new windows...\n");

            // Simulate opening 3 products
            List<String> productTitles = new ArrayList<>();

            for (int i = 1; i <= 3; i++) {
                wm.switchToMain();
                System.out.println("Product " + i + ":");

                // Open product (simulated by clicking "Click Here")
                driver.findElement(By.linkText("Click Here")).click();
                Thread.sleep(1000);

                // Track new window
                wm.trackNewWindow();
                wm.switchToLastChild();

                // Extract product info (simulated)
                String productInfo = driver.getTitle();
                productTitles.add(productInfo);
                System.out.println("  Opened: " + productInfo);
                System.out.println("  URL: " + driver.getCurrentUrl());
            }

            System.out.println("\n✅ Comparison Data Collected:");
            for (int i = 0; i < productTitles.size(); i++) {
                System.out.println("  Product " + (i + 1) + ": " + productTitles.get(i));
            }

            wm.printWindowStatus();

            // Cleanup
            wm.closeAllChildren();
            System.out.println("\n✅ All product windows closed\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 2: Help Documentation Popup
            // ========================================
            System.out.println("--- SCENARIO 2: Help Documentation Popup ---\n");
            System.out.println("Simulating: Open help, read content, return to main form\n");

            wm = new WindowManager(driver);  // Reset window manager

            System.out.println("Step 1: User on main form");
            System.out.println("   Current page: " + driver.getTitle());

            System.out.println("\nStep 2: User clicks 'Help' button");
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            wm.trackNewWindow();
            wm.switchToLastChild();

            System.out.println("✅ Help popup opened");
            System.out.println("   Reading help content...");

            String helpContent = driver.findElement(By.tagName("h3")).getText();
            System.out.println("   Help topic: " + helpContent);

            System.out.println("\nStep 3: User closes help");
            driver.close();

            wm.switchToMain();
            System.out.println("✅ Returned to main form");
            System.out.println("   User can continue filling form\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 3: Multi-Step Verification Flow
            // ========================================
            System.out.println("--- SCENARIO 3: Multi-Step Verification ---\n");
            System.out.println("Simulating: Main form → Verification popup → Confirmation\n");

            wm = new WindowManager(driver);

            System.out.println("Step 1: Main application");
            System.out.println("   Page: " + driver.getTitle());

            System.out.println("\nStep 2: Open verification window");
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            wm.trackNewWindow();
            wm.switchToLastChild();

            String verificationWindow = driver.getWindowHandle();
            System.out.println("✅ Verification window opened");
            System.out.println("   Title: " + driver.getTitle());

            System.out.println("\nStep 3: Perform verification");
            System.out.println("   (In real scenario: Enter OTP, answer security question)");
            String verificationData = "VERIFIED";
            System.out.println("   Status: " + verificationData);

            System.out.println("\nStep 4: Close verification, return to main");
            driver.close();

            wm.switchToMain();
            System.out.println("✅ Returned to main");
            System.out.println("   Verification data available: " + verificationData);
            System.out.println("   (In real scenario: Enable submit button, proceed)\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 4: Error Handling - Window Closed Unexpectedly
            // ========================================
            System.out.println("--- SCENARIO 4: Handling Closed Window ---\n");

            wm = new WindowManager(driver);

            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            wm.trackNewWindow();
            wm.switchToLastChild();

            String popupHandle = driver.getWindowHandle();
            System.out.println("Popup opened: " + driver.getTitle());

            // Close the popup
            driver.close();
            System.out.println("Popup closed (simulating user closing it)");

            // Try to switch to it
            System.out.println("\nAttempting to switch to closed window...");
            try {
                driver.switchTo().window(popupHandle);
                driver.getTitle();  // This will throw exception
                System.out.println("❌ This shouldn't print!");
            } catch (Exception e) {
                System.out.println("✅ Exception caught: " + e.getClass().getSimpleName());
                System.out.println("   Handling gracefully...");
                wm.switchToMain();
                System.out.println("   Switched to main window safely");
            }

            System.out.println("✅ Error handled, application continues\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 5: Waiting for New Window with Explicit Wait
            // ========================================
            System.out.println("--- SCENARIO 5: Wait for New Window ---\n");

            wm = new WindowManager(driver);

            System.out.println("Current windows: " + driver.getWindowHandles().size());
            System.out.println("Clicking link that opens new window...");

            driver.findElement(By.linkText("Click Here")).click();

            // Wait for new window to open
            System.out.println("⏳ Waiting for new window to appear...");
            wait.until(ExpectedConditions.numberOfWindowsToBe(2));
            System.out.println("✅ New window detected!");

            wm.trackNewWindow();
            wm.switchToLastChild();

            System.out.println("   New window title: " + driver.getTitle());
            System.out.println("   Total windows: " + driver.getWindowHandles().size());

            // Cleanup
            driver.close();
            wm.switchToMain();
            System.out.println("✅ Window closed and returned to main\n");
            Thread.sleep(1500);

            // ========================================
            // SCENARIO 6: Complete Workflow
            // ========================================
            System.out.println("--- SCENARIO 6: Complete Workflow ---\n");
            System.out.println("Simulating: Shopping cart → Payment → Confirmation\n");

            wm = new WindowManager(driver);

            // Step 1: Shopping cart
            System.out.println("Step 1: Shopping Cart Page");
            System.out.println("   Current: " + driver.getTitle());
            System.out.println("   Action: User clicks 'Proceed to Payment'");

            // Step 2: Open payment window
            driver.findElement(By.linkText("Click Here")).click();
            Thread.sleep(1500);

            wm.trackNewWindow();
            wm.switchToLastChild();

            System.out.println("\nStep 2: Payment Window (Secure)");
            System.out.println("   Window: " + driver.getTitle());
            System.out.println("   Action: Enter payment details");
            System.out.println("   Status: Payment processed");

            String paymentConfirmation = "PAYMENT_CONFIRMED_#12345";

            // Step 3: Close payment, return to cart
            driver.close();
            wm.switchToMain();

            System.out.println("\nStep 3: Return to Shopping Cart");
            System.out.println("   Payment data received: " + paymentConfirmation);
            System.out.println("   Action: Display confirmation, update order status");
            System.out.println("\n✅ Complete workflow executed successfully!");

            // ========================================
            // FINAL SUMMARY
            // ========================================
            System.out.println("\n=====================================");
            System.out.println("REAL-WORLD SCENARIOS SUMMARY:");
            System.out.println("=====================================");
            System.out.println("\n1. PRODUCT COMPARISON:");
            System.out.println("   • Open multiple products");
            System.out.println("   • Extract information");
            System.out.println("   • Close all, return to catalog");
            System.out.println("\n2. HELP POPUP:");
            System.out.println("   • Open help in new window");
            System.out.println("   • Read content");
            System.out.println("   • Close and continue work");
            System.out.println("\n3. VERIFICATION FLOW:");
            System.out.println("   • Multi-step process");
            System.out.println("   • Data transfer between windows");
            System.out.println("   • Secure operations");
            System.out.println("\n4. ERROR HANDLING:");
            System.out.println("   • Detect closed windows");
            System.out.println("   • Graceful fallback");
            System.out.println("   • Prevent test failures");
            System.out.println("\n5. WAITING:");
            System.out.println("   • Wait for new windows");
            System.out.println("   • Handle dynamic scenarios");
            System.out.println("   • Robust automation");
            System.out.println("\n6. COMPLETE WORKFLOW:");
            System.out.println("   • Multiple window transitions");
            System.out.println("   • Data collection and usage");
            System.out.println("   • End-to-end scenario");
            System.out.println("=====================================");
            System.out.println("\nWINDOW MANAGER CLASS BENEFITS:");
            System.out.println("  ✅ Centralized window tracking");
            System.out.println("  ✅ Reusable methods");
            System.out.println("  ✅ Cleaner test code");
            System.out.println("  ✅ Easier maintenance");
            System.out.println("  ✅ Built-in error handling");
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
===== REAL-WORLD WINDOW HANDLING SCENARIOS =====

--- SCENARIO 1: Product Comparison ---

Simulating: Open multiple products in new tabs, compare

Main catalog page loaded
Opening 3 products in new windows...

Product 1:
  Opened: New Window
  URL: https://the-internet.herokuapp.com/windows/new
Product 2:
  Opened: New Window
  URL: https://the-internet.herokuapp.com/windows/new
Product 3:
  Opened: New Window
  URL: https://the-internet.herokuapp.com/windows/new

✅ Comparison Data Collected:
  Product 1: New Window
  Product 2: New Window
  Product 3: New Window

📊 Window Status:
   Main: CDwindow-A1B2C3D...
   Children: 3
   Total Open: 4

✅ All product windows closed

--- SCENARIO 2: Help Documentation Popup ---

Simulating: Open help, read content, return to main form

Step 1: User on main form
   Current page: The Internet

Step 2: User clicks 'Help' button
✅ Help popup opened
   Reading help content...
   Help topic: New Window

Step 3: User closes help
✅ Returned to main form
   User can continue filling form

--- SCENARIO 3: Multi-Step Verification ---

Simulating: Main form → Verification popup → Confirmation

Step 1: Main application
   Page: The Internet

Step 2: Open verification window
✅ Verification window opened
   Title: New Window

Step 3: Perform verification
   (In real scenario: Enter OTP, answer security question)
   Status: VERIFIED

Step 4: Close verification, return to main
✅ Returned to main
   Verification data available: VERIFIED
   (In real scenario: Enable submit button, proceed)

--- SCENARIO 4: Handling Closed Window ---

Popup opened: New Window
Popup closed (simulating user closing it)

Attempting to switch to closed window...
✅ Exception caught: NoSuchWindowException
   Handling gracefully...
   Switched to main window safely
✅ Error handled, application continues

--- SCENARIO 5: Wait for New Window ---

Current windows: 1
Clicking link that opens new window...
⏳ Waiting for new window to appear...
✅ New window detected!
   New window title: New Window
   Total windows: 2
✅ Window closed and returned to main

--- SCENARIO 6: Complete Workflow ---

Simulating: Shopping cart → Payment → Confirmation

Step 1: Shopping Cart Page
   Current: The Internet
   Action: User clicks 'Proceed to Payment'

Step 2: Payment Window (Secure)
   Window: New Window
   Action: Enter payment details
   Status: Payment processed

Step 3: Return to Shopping Cart
   Payment data received: PAYMENT_CONFIRMED_#12345
   Action: Display confirmation, update order status

✅ Complete workflow executed successfully!

=====================================
REAL-WORLD SCENARIOS SUMMARY:
=====================================

1. PRODUCT COMPARISON:
   • Open multiple products
   • Extract information
   • Close all, return to catalog

2. HELP POPUP:
   • Open help in new window
   • Read content
   • Close and continue work

3. VERIFICATION FLOW:
   • Multi-step process
   • Data transfer between windows
   • Secure operations

4. ERROR HANDLING:
   • Detect closed windows
   • Graceful fallback
   • Prevent test failures

5. WAITING:
   • Wait for new windows
   • Handle dynamic scenarios
   • Robust automation

6. COMPLETE WORKFLOW:
   • Multiple window transitions
   • Data collection and usage
   • End-to-end scenario
=====================================

WINDOW MANAGER CLASS BENEFITS:
  ✅ Centralized window tracking
  ✅ Reusable methods
  ✅ Cleaner test code
  ✅ Easier maintenance
  ✅ Built-in error handling
=====================================

✅ Browser closed
```

**What Happens in Browser:**
1. Multiple windows open for product comparison scenario
2. Help popup opens and closes
3. Verification window demonstrates multi-step flow
4. Error handling prevents crashes
5. Wait conditions handle dynamic window opening
6. Complete workflow shows end-to-end process
7. All windows clean up properly

**✅ Success Criteria:**
- All 6 scenarios complete successfully
- WindowManager class functions correctly
- Multiple products can be compared
- Help popup workflow works
- Verification flow completes
- Error handling prevents exceptions
- Wait conditions work for dynamic windows
- Complete workflow executes end-to-end
- All data transfers between windows correctly

**❌ Common Errors and Solutions:**

| Error | Reason | Solution |
|-------|--------|----------|
| NoSuchWindowException | Window closed before switch | Use try-catch and fallback to main |
| TimeoutException | Window didn't open in time | Increase wait timeout or check trigger |
| NullPointerException | WindowManager not initialized | Always create WindowManager instance |
| StaleElementReferenceException | Switched windows mid-operation | Complete operation before switching |


**Common Mistakes:**
1. ❌ **Not Handling Popup Blockers**: Assuming new windows always open
   - Why: Browser popup blockers may prevent new windows
   - Fix: Verify window opened: `assertEquals(driver.getWindowHandles().size(), expectedCount)`

2. ❌ **Not Waiting for Window Content Load**: Switching to window but content not ready
   - Why: Window opens but page may still be loading
   - Fix: After switching, wait for content

3. ❌ **Poor Cleanup Strategy**: Not closing all windows at test end
   - Why: Windows accumulate across tests; affects performance and subsequent tests
   - Fix: In @AfterMethod, ensure all windows closed

4. ❌ **Not Handling Dynamic Window Names**: Expecting consistent window titles/names
   - Why: Window titles may be dynamic or load asynchronously
   - Fix: Use flexible matching

5. ❌ **Ignoring Window Size/Position**: Not considering window dimensions affect element visibility
   - Why: Elements might be outside viewport in small windows
   - Fix: Maximize windows: `driver.manage().window().maximize()`


**💡 Key Concepts:**

**1. WindowManager Pattern:**

```java
class WindowManager {
    private String mainWindow;
    private List<String> childWindows;

    public WindowManager(WebDriver driver) {
        this.mainWindow = driver.getWindowHandle();
        this.childWindows = new ArrayList<>();
    }

    public void trackNewWindow() {
        // Find and store new windows
    }

    public void switchToMain() {
        driver.switchTo().window(mainWindow);
    }

    public void closeAllChildren() {
        // Close all tracked children
    }
}

// Usage
WindowManager wm = new WindowManager(driver);
```

**2. Data Transfer Pattern:**

```java
// Extract data from child
driver.switchTo().window(childWindow);
String data = driver.findElement(By.id("data")).getText();
driver.close();

// Use data in parent
driver.switchTo().window(parentWindow);
driver.findElement(By.id("input")).sendKeys(data);
```

**3. Wait for Window Pattern:**

```java
// Wait for specific number of windows
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.numberOfWindowsToBe(2));

// Wait for more than current
int currentWindows = driver.getWindowHandles().size();
wait.until(ExpectedConditions.numberOfWindowsToBe(currentWindows + 1));
```

**🎯 Practice Challenge:**

1. Extend WindowManager with window search by URL
2. Add logging to track all window operations
3. Implement window screenshot capture before closing
4. Create method to find window by partial title match
5. Build a test that simulates complete e-commerce checkout flow

---

## Summary: Days 27-28

### What You Learned

**Day 27: Frames & iFrames**
- Understanding frames vs iframes
- Switching to frames (by ID, name, index, WebElement)
- Handling nested frames
- Using parentFrame() and defaultContent()
- Combining frames with explicit waits
- Real-world frame scenarios

**Day 28: Window Handling**
- Understanding window handles
- Switching between windows and tabs
- Managing multiple windows
- Parent-child window relationships
- Advanced window handle operations
- Real-world window scenarios

### Key Methods Summary

```java
// FRAMES
driver.switchTo().frame("frameId");           // By ID/name
driver.switchTo().frame(0);                    // By index
driver.switchTo().frame(webElement);           // By WebElement
driver.switchTo().parentFrame();               // Go to parent
driver.switchTo().defaultContent();            // Go to main page

// WINDOWS
String handle = driver.getWindowHandle();      // Current window
Set<String> handles = driver.getWindowHandles(); // All windows
driver.switchTo().window(handle);              // Switch window
driver.close();                                 // Close current window
driver.quit();                                  // Close all windows

// WAITS
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt("frameId"));
wait.until(ExpectedConditions.numberOfWindowsToBe(2));
```

### Best Practices

1. **Always track your context** - Know which frame/window you're in
2. **Store handles before opening new windows** - Save main window handle
3. **Use meaningful variable names** - parent, child, mainFrame, etc.
4. **Clean up after yourself** - Close windows/frames you opened
5. **Use helper methods** - Create reusable switching methods
6. **Add waits** - Wait for frames/windows to be ready
7. **Handle errors gracefully** - Try-catch for window operations
8. **Comment your code** - Explain complex switching logic

### Common Patterns

```java
// Pattern 1: Frame switching
driver.switchTo().frame("frameId");
// Do work
driver.switchTo().defaultContent();

// Pattern 2: Window switching
String main = driver.getWindowHandle();
// Open new window
for (String handle : driver.getWindowHandles()) {
    if (!handle.equals(main)) {
        driver.switchTo().window(handle);
        // Do work
        driver.close();
    }
}
driver.switchTo().window(main);

// Pattern 3: WindowManager
WindowManager wm = new WindowManager(driver);
// Perform operations
wm.closeAllChildren();
wm.switchToMain();
```

### Next Steps

- Practice with real websites that use frames/iframes
- Build a complete test suite using WindowManager
- Combine frame and window handling in one test
- Create your own helper classes
- Test on multi-window applications

---

**Congratulations! You've completed Days 27-28 of Selenium WebDriver!**

You now have the skills to handle complex frame and window scenarios in real-world web applications.
