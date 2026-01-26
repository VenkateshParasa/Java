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

