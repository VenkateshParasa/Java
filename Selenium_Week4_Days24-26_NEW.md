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
