# Day 22: Dropdowns & Checkboxes in Selenium

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the Select class in Selenium WebDriver
- Handle single-select and multi-select dropdowns
- Select dropdown options by visible text, value, and index
- Retrieve selected options from dropdowns
- Work with checkboxes and radio buttons
- Implement best practices for handling form elements

---

## 1. Introduction to Dropdowns

Dropdowns (also called select boxes) are common HTML elements that allow users to select one or more options from a list. In Selenium, we use the **Select class** from `org.openqa.selenium.support.ui` package to interact with dropdown elements.

### Why Use the Select Class?

While you can interact with dropdown options using standard WebElement methods, the Select class provides specialized methods that make dropdown handling much simpler and more intuitive.

### HTML Structure of Dropdowns

```html
<!-- Single-select dropdown -->
<select id="country">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
    <option value="in">India</option>
</select>

<!-- Multi-select dropdown -->
<select id="skills" multiple>
    <option value="java">Java</option>
    <option value="python">Python</option>
    <option value="selenium">Selenium</option>
    <option value="testng">TestNG</option>
</select>
```

---

## 2. Creating a Select Object

Before you can interact with a dropdown, you must first create a Select object by passing the dropdown WebElement to the Select constructor.

### Syntax

```java
// Step 1: Locate the dropdown element
WebElement dropdownElement = driver.findElement(By.id("country"));

// Step 2: Create Select object
Select dropdown = new Select(dropdownElement);
```

### Complete Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class DropdownExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/form");

        // Locate dropdown and create Select object
        WebElement countryDropdown = driver.findElement(By.id("country"));
        Select select = new Select(countryDropdown);

        // Now you can interact with the dropdown
        select.selectByVisibleText("India");

        driver.quit();
    }
}
```

---

## 3. Selecting Options from Dropdowns

The Select class provides three methods to select options:

### 3.1 selectByVisibleText()

Selects an option based on the text displayed to the user.

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("United States");
```

**When to use:** When you know the exact text displayed in the dropdown.

**Example:**
```java
// Selecting country by visible text
Select countryDropdown = new Select(driver.findElement(By.id("country")));
countryDropdown.selectByVisibleText("India");
```

### 3.2 selectByValue()

Selects an option based on the `value` attribute of the option element.

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByValue("in");  // value attribute
```

**When to use:** When you know the value attribute and it's more reliable than visible text (e.g., text might change with localization).

**Example:**
```java
// Selecting country by value attribute
Select countryDropdown = new Select(driver.findElement(By.id("country")));
countryDropdown.selectByValue("us");
```

### 3.3 selectByIndex()

Selects an option based on its index position (starting from 0).

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByIndex(2);  // Selects third option (index 2)
```

**When to use:** When you need to select based on position, but be careful as the order might change.

**Example:**
```java
// Selecting the first option (index 0)
Select countryDropdown = new Select(driver.findElement(By.id("country")));
countryDropdown.selectByIndex(0);
```

### Comparison of Selection Methods

| Method | Parameter | Example | Use Case |
|--------|-----------|---------|----------|
| `selectByVisibleText()` | Visible text | "United States" | When text is stable and known |
| `selectByValue()` | value attribute | "us" | When value is more reliable |
| `selectByIndex()` | Index (0-based) | 2 | When position is known |

---

## 4. Getting Selected Options

You can retrieve the currently selected option(s) from a dropdown:

### 4.1 getFirstSelectedOption()

Returns the first selected option as a WebElement (for both single and multi-select).

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("India");

WebElement selectedOption = dropdown.getFirstSelectedOption();
System.out.println("Selected: " + selectedOption.getText());
// Output: Selected: India
```

### 4.2 getAllSelectedOptions()

Returns all selected options as a List of WebElements (useful for multi-select dropdowns).

```java
Select skillsDropdown = new Select(driver.findElement(By.id("skills")));
skillsDropdown.selectByValue("java");
skillsDropdown.selectByValue("selenium");

List<WebElement> selectedOptions = skillsDropdown.getAllSelectedOptions();
System.out.println("Number of selected options: " + selectedOptions.size());

for (WebElement option : selectedOptions) {
    System.out.println("Selected: " + option.getText());
}
```

### 4.3 getOptions()

Returns all available options in the dropdown.

```java
Select dropdown = new Select(driver.findElement(By.id("country")));
List<WebElement> allOptions = dropdown.getOptions();

System.out.println("Total options: " + allOptions.size());

for (WebElement option : allOptions) {
    System.out.println("Option: " + option.getText());
}
```

---

## 5. Multi-Select Dropdowns

Multi-select dropdowns allow users to select multiple options. They are identified by the `multiple` attribute in HTML.

### Checking if Dropdown is Multi-Select

```java
Select dropdown = new Select(driver.findElement(By.id("skills")));

if (dropdown.isMultiple()) {
    System.out.println("This is a multi-select dropdown");
} else {
    System.out.println("This is a single-select dropdown");
}
```

### Selecting Multiple Options

```java
Select skillsDropdown = new Select(driver.findElement(By.id("skills")));

// Select multiple options
skillsDropdown.selectByVisibleText("Java");
skillsDropdown.selectByValue("selenium");
skillsDropdown.selectByIndex(2);
```

### Deselecting Options

For multi-select dropdowns, you can deselect options:

```java
Select skillsDropdown = new Select(driver.findElement(By.id("skills")));

// Select multiple options first
skillsDropdown.selectByVisibleText("Java");
skillsDropdown.selectByVisibleText("Python");
skillsDropdown.selectByVisibleText("Selenium");

// Deselect specific option
skillsDropdown.deselectByVisibleText("Python");

// Deselect by value
skillsDropdown.deselectByValue("selenium");

// Deselect by index
skillsDropdown.deselectByIndex(0);

// Deselect all options
skillsDropdown.deselectAll();
```

**Note:** Deselect methods work only on multi-select dropdowns. They will throw `UnsupportedOperationException` on single-select dropdowns.

---

## 6. Working with Checkboxes

Checkboxes are input elements that allow users to select/deselect options. They can be handled using standard WebElement methods.

### HTML Structure

```html
<input type="checkbox" id="terms" name="terms" value="accept">
<label for="terms">I accept terms and conditions</label>

<input type="checkbox" id="newsletter" name="newsletter" value="subscribe">
<label for="newsletter">Subscribe to newsletter</label>
```

### Checking a Checkbox

```java
WebElement termsCheckbox = driver.findElement(By.id("terms"));

// Check if checkbox is not already selected
if (!termsCheckbox.isSelected()) {
    termsCheckbox.click();
    System.out.println("Checkbox checked");
}
```

### Unchecking a Checkbox

```java
WebElement newsletterCheckbox = driver.findElement(By.id("newsletter"));

// Uncheck if checkbox is selected
if (newsletterCheckbox.isSelected()) {
    newsletterCheckbox.click();
    System.out.println("Checkbox unchecked");
}
```

### Verifying Checkbox State

```java
WebElement checkbox = driver.findElement(By.id("terms"));

// Check if checkbox is selected
boolean isChecked = checkbox.isSelected();
System.out.println("Checkbox is checked: " + isChecked);

// Check if checkbox is enabled
boolean isEnabled = checkbox.isEnabled();
System.out.println("Checkbox is enabled: " + isEnabled);

// Check if checkbox is displayed
boolean isDisplayed = checkbox.isDisplayed();
System.out.println("Checkbox is displayed: " + isDisplayed);
```

### Handling Multiple Checkboxes

```java
// Find all checkboxes with name attribute "interests"
List<WebElement> checkboxes = driver.findElements(By.name("interests"));

// Select all checkboxes
for (WebElement checkbox : checkboxes) {
    if (!checkbox.isSelected()) {
        checkbox.click();
    }
}

// Verify all are selected
for (WebElement checkbox : checkboxes) {
    System.out.println("Checkbox selected: " + checkbox.isSelected());
}
```

---

## 7. Working with Radio Buttons

Radio buttons allow users to select only one option from a group. They are similar to checkboxes but allow only single selection within a group.

### HTML Structure

```html
<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label>

<input type="radio" id="other" name="gender" value="other">
<label for="other">Other</label>
```

### Selecting a Radio Button

```java
WebElement maleRadio = driver.findElement(By.id("male"));

// Select the radio button
if (!maleRadio.isSelected()) {
    maleRadio.click();
    System.out.println("Male radio button selected");
}
```

### Handling Radio Button Groups

```java
// Find all radio buttons in the group
List<WebElement> genderRadios = driver.findElements(By.name("gender"));

// Select radio button by value
for (WebElement radio : genderRadios) {
    if (radio.getAttribute("value").equals("female")) {
        radio.click();
        break;
    }
}

// Verify which radio button is selected
for (WebElement radio : genderRadios) {
    if (radio.isSelected()) {
        System.out.println("Selected: " + radio.getAttribute("value"));
    }
}
```

### Best Practices for Radio Buttons

1. Always verify the radio button is not already selected before clicking
2. Use `getAttribute("value")` to identify specific radio buttons
3. Remember only one radio button can be selected in a group
4. Use `isSelected()` to verify selection

---

## 8. Complete Example: Form Automation

Here's a complete example that combines dropdowns, checkboxes, and radio buttons:

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

public class FormAutomationExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/registration-form");

        try {
            // Handle dropdown
            Select countryDropdown = new Select(driver.findElement(By.id("country")));
            countryDropdown.selectByVisibleText("India");
            System.out.println("Selected country: " +
                countryDropdown.getFirstSelectedOption().getText());

            // Handle multi-select dropdown
            Select skillsDropdown = new Select(driver.findElement(By.id("skills")));
            if (skillsDropdown.isMultiple()) {
                skillsDropdown.selectByValue("java");
                skillsDropdown.selectByValue("selenium");

                List<WebElement> selectedSkills = skillsDropdown.getAllSelectedOptions();
                System.out.println("Selected " + selectedSkills.size() + " skills");
            }

            // Handle checkbox
            WebElement termsCheckbox = driver.findElement(By.id("terms"));
            if (!termsCheckbox.isSelected()) {
                termsCheckbox.click();
            }
            System.out.println("Terms accepted: " + termsCheckbox.isSelected());

            // Handle radio button
            List<WebElement> genderRadios = driver.findElements(By.name("gender"));
            for (WebElement radio : genderRadios) {
                if (radio.getAttribute("value").equals("male")) {
                    radio.click();
                    break;
                }
            }

            // Print all dropdown options
            List<WebElement> allCountries = countryDropdown.getOptions();
            System.out.println("\nAvailable countries:");
            for (WebElement option : allCountries) {
                System.out.println("- " + option.getText());
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

## 9. Common Issues and Solutions

### Issue 1: NoSuchElementException

**Problem:** Dropdown element not found.

**Solution:**
```java
// Add explicit wait
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement dropdown = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("country")));
Select select = new Select(dropdown);
```

### Issue 2: Element Not Interactable

**Problem:** Cannot interact with dropdown that's not visible or enabled.

**Solution:**
```java
WebElement dropdown = driver.findElement(By.id("country"));

// Check if element is displayed and enabled
if (dropdown.isDisplayed() && dropdown.isEnabled()) {
    Select select = new Select(dropdown);
    select.selectByVisibleText("India");
}
```

### Issue 3: Stale Element Reference

**Problem:** Element reference becomes stale after page refresh or DOM change.

**Solution:**
```java
try {
    Select dropdown = new Select(driver.findElement(By.id("country")));
    dropdown.selectByValue("us");
} catch (StaleElementReferenceException e) {
    // Re-locate the element
    Select dropdown = new Select(driver.findElement(By.id("country")));
    dropdown.selectByValue("us");
}
```

### Issue 4: UnsupportedOperationException on Deselect

**Problem:** Trying to deselect from single-select dropdown.

**Solution:**
```java
Select dropdown = new Select(driver.findElement(By.id("country")));

// Check if multi-select before deselecting
if (dropdown.isMultiple()) {
    dropdown.deselectAll();
} else {
    System.out.println("Cannot deselect from single-select dropdown");
}
```

---

## 10. Best Practices

1. **Always check element state before interaction**
   ```java
   if (checkbox.isDisplayed() && checkbox.isEnabled() && !checkbox.isSelected()) {
       checkbox.click();
   }
   ```

2. **Use explicit waits for dynamic dropdowns**
   ```java
   WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
   WebElement dropdown = wait.until(ExpectedConditions.elementToBeClickable(By.id("country")));
   ```

3. **Verify selection after action**
   ```java
   select.selectByVisibleText("India");
   String selected = select.getFirstSelectedOption().getText();
   assert selected.equals("India") : "Selection failed";
   ```

4. **Use value attribute for stability**
   - Prefer `selectByValue()` over `selectByVisibleText()` when text might change
   - Avoid `selectByIndex()` unless order is guaranteed

5. **Handle exceptions gracefully**
   ```java
   try {
       Select dropdown = new Select(driver.findElement(By.id("country")));
       dropdown.selectByVisibleText("India");
   } catch (NoSuchElementException e) {
       System.err.println("Dropdown not found");
   } catch (Exception e) {
       System.err.println("Error selecting option: " + e.getMessage());
   }
   ```

6. **Create reusable methods**
   ```java
   public void selectDropdownByText(By locator, String text) {
       Select dropdown = new Select(driver.findElement(locator));
       dropdown.selectByVisibleText(text);
   }

   public void checkCheckbox(By locator) {
       WebElement checkbox = driver.findElement(locator);
       if (!checkbox.isSelected()) {
           checkbox.click();
       }
   }
   ```

---

## 11. Practical Exercises

### Exercise 1: Basic Dropdown Selection
Create a script that:
- Opens a registration form
- Selects "United States" from country dropdown by visible text
- Prints the selected country
- Prints total number of countries available

### Exercise 2: Multi-Select Skills
Create a script that:
- Finds a multi-select dropdown for skills
- Verifies it's a multi-select dropdown
- Selects "Java", "Selenium", and "TestNG"
- Prints all selected skills
- Deselects "TestNG"
- Prints remaining selected skills

### Exercise 3: Checkbox Automation
Create a script that:
- Finds all checkboxes on a page
- Checks all unchecked checkboxes
- Prints how many checkboxes are now selected
- Unchecks all checkboxes
- Verifies none are selected

### Exercise 4: Radio Button Groups
Create a script that:
- Finds all radio buttons in "payment method" group
- Selects "Credit Card" option
- Verifies the selection
- Tries to select another option and verifies previous is unselected

### Exercise 5: Complete Form Filling
Create a script that fills a complete registration form:
- Select country from dropdown
- Select multiple skills from multi-select
- Check "Terms and Conditions" checkbox
- Select gender radio button
- Submit the form
- Verify form submission success

### Exercise 6: Dynamic Dropdown
Create a script that:
- Waits for dropdown to load dynamically
- Selects an option
- Verifies the selection triggered another dropdown
- Handles the dependent dropdown

### Exercise 7: Dropdown Options Extraction
Create a script that:
- Gets all options from a dropdown
- Stores them in a List
- Prints each option's text and value attribute
- Selects the last option

### Exercise 8: Conditional Checkbox Selection
Create a script that:
- Finds all checkboxes with class "interest"
- Selects only checkboxes whose label contains "Technology"
- Verifies correct checkboxes are selected

### Exercise 9: Error Handling
Create a script with proper error handling that:
- Attempts to select from a dropdown that might not exist
- Tries to deselect from a single-select dropdown
- Handles StaleElementReferenceException
- Logs all errors appropriately

### Exercise 10: Dropdown Validation
Create a script that validates:
- Dropdown contains expected options
- Options are in alphabetical order
- Default option is correct
- All options are enabled

---

## 12. Key Takeaways

1. **Select Class** is used specifically for handling dropdown elements with `<select>` tag
2. **Three selection methods**: selectByVisibleText(), selectByValue(), selectByIndex()
3. **getFirstSelectedOption()** retrieves the currently selected option
4. **isMultiple()** checks if dropdown allows multiple selections
5. **Deselect methods** work only on multi-select dropdowns
6. **Checkboxes** are handled using click() and isSelected() methods
7. **Radio buttons** allow only one selection per group
8. Always **check element state** (displayed, enabled, selected) before interaction
9. Use **explicit waits** for dynamic dropdowns
10. Create **reusable methods** for common dropdown operations

---

## 13. Additional Resources

### Official Documentation
- [Selenium Select Class Documentation](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/ui/Select.html)
- [WebElement Interface](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/WebElement.html)

### Practice Websites
- [The Internet - Dropdowns](http://the-internet.herokuapp.com/dropdown)
- [The Internet - Checkboxes](http://the-internet.herokuapp.com/checkboxes)
- [SeleniumEasy - Select Dropdown](https://demo.seleniumeasy.com/basic-select-dropdown-demo.html)
- [SeleniumEasy - Checkbox](https://demo.seleniumeasy.com/basic-checkbox-demo.html)
- [SeleniumEasy - Radio Buttons](https://demo.seleniumeasy.com/basic-radiobutton-demo.html)

### Video Tutorials
- Search for "Selenium Select class tutorial"
- Search for "Selenium dropdown handling"
- Search for "Selenium checkbox and radio button"

### Common Interview Questions
1. What is the Select class in Selenium?
2. What are the different methods to select options from a dropdown?
3. How do you handle multi-select dropdowns?
4. What's the difference between selectByVisibleText() and selectByValue()?
5. How do you verify if a checkbox is selected?
6. Can you deselect options from a single-select dropdown?
7. How do you handle radio button groups?
8. What exception is thrown when trying to create Select object on non-dropdown element?

---

## Navigation

- **Previous:** [Day 21: WebElement Interactions](../week3/day21_webelement_interactions.md)
- **Next:** [Day 23: Waits - Part 1 (Implicit & Explicit)](./day23_waits_part1.md)
- **Week 4 Home:** [Week 4 Overview](./README.md)

---

**Happy Learning!** Practice these concepts thoroughly as they form the foundation for handling complex web forms in automation testing.
