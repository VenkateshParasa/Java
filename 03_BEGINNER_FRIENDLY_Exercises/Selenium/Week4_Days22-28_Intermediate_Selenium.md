# SELENIUM WEBDRIVER - Week 4: Intermediate Selenium (Days 22-28)

## 📋 Week 4 Overview

This week covers intermediate Selenium topics essential for real-world automation:

**Days Covered:**
- **Days 22-23:** Advanced Locators (XPath & CSS Selectors) - *To be added*
- **Days 24-26:** Dropdowns, Checkboxes, Radio Buttons & Alerts (✅ **COMPLETE**)
- **Days 27-28:** Frames & Window Handling - *To be added*

**Current Status:** Days 24-26 complete with 11 comprehensive exercises

---

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
