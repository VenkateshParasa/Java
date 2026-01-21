
# Day 11: Keyboard Operations in Selenium

## 📋 Learning Objectives
By the end of this lesson, you will be able to:
- Use the [`Keys`](org.openqa.selenium.Keys) class for keyboard operations
- Perform keyboard shortcuts and key combinations
- Handle special keys (Enter, Tab, Escape, etc.)
- Implement keyboard-based navigation
- Combine keyboard and mouse actions
- Handle keyboard events in different scenarios

---

## 📚 Table of Contents
1. [Introduction to Keyboard Operations](#1-introduction-to-keyboard-operations)
2. [The Keys Class](#2-the-keys-class)
3. [Basic Keyboard Operations](#3-basic-keyboard-operations)
4. [Keyboard Shortcuts](#4-keyboard-shortcuts)
5. [Key Combinations](#5-key-combinations)
6. [Special Keys](#6-special-keys)
7. [Keyboard Navigation](#7-keyboard-navigation)
8. [Combining Keyboard and Mouse](#8-combining-keyboard-and-mouse)
9. [Practical Exercises](#9-practical-exercises)
10. [Common Mistakes](#10-common-mistakes)
11. [Best Practices](#11-best-practices)
12. [Key Takeaways](#12-key-takeaways)

---

## 1. Introduction to Keyboard Operations

### Why Keyboard Operations?
Keyboard operations are essential for:
- **Form Navigation:** Tab through form fields
- **Shortcuts:** Execute keyboard shortcuts (Ctrl+C, Ctrl+V)
- **Special Keys:** Use Enter, Escape, Arrow keys
- **Accessibility Testing:** Test keyboard-only navigation
- **Power User Actions:** Simulate advanced user interactions

### Real-World Scenarios
```java
// Scenario 1: Form submission with Enter key
searchBox.sendKeys("Selenium WebDriver");
searchBox.sendKeys(Keys.ENTER);

// Scenario 2: Copy-paste operations
textField.sendKeys(Keys.CONTROL + "a");  // Select all
textField.sendKeys(Keys.CONTROL + "c");  // Copy

// Scenario 3: Navigation with Tab
firstField.sendKeys("John");
firstField.sendKeys(Keys.TAB);  // Move to next field
```

---

## 2. The Keys Class

### Overview
The [`Keys`](org.openqa.selenium.Keys) class provides constants for special keyboard keys.

### Common Keys
```java
// Modifier Keys
Keys.CONTROL    // Ctrl key
Keys.SHIFT      // Shift key
Keys.ALT        // Alt key
Keys.COMMAND    // Command key (Mac)

// Navigation Keys
Keys.ENTER      // Enter key
Keys.TAB        // Tab key
Keys.ESCAPE     // Escape key
Keys.BACK_SPACE // Backspace key
Keys.DELETE     // Delete key

// Arrow Keys
Keys.ARROW_UP
Keys.ARROW_DOWN
Keys.ARROW_LEFT
Keys.ARROW_RIGHT

// Function Keys
Keys.F1, Keys.F2, ... Keys.F12

// Other Special Keys
Keys.HOME       // Home key
Keys.END        // End key
Keys.PAGE_UP    // Page Up
Keys.PAGE_DOWN  // Page Down
Keys.SPACE      // Space bar
```

### Example: Using Keys
```java
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;

public class KeysExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        
        WebElement searchBox = driver.findElement(By.name("q"));
        
        // Type text and press Enter
        searchBox.sendKeys("Selenium WebDriver");
        searchBox.sendKeys(Keys.ENTER);
        
        // Wait to see results
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        driver.quit();
    }
}
```

---

## 3. Basic Keyboard Operations

### Sending Single Keys

#### Example 1: Enter Key
```java
public class EnterKeyExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        
        WebElement searchBox = driver.findElement(By.name("q"));
        
        // Type search query
        searchBox.sendKeys("Selenium automation");
        
        // Press Enter to submit
        searchBox.sendKeys(Keys.ENTER);
        
        System.out.println("Search submitted with Enter key");
        
        driver.quit();
    }
}
```

#### Example 2: Tab Key for Navigation
```java
public class TabNavigationExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/form");
        
        // Fill first field and tab to next
        WebElement firstName = driver.findElement(By.id("firstName"));
        firstName.sendKeys("John");
        firstName.sendKeys(Keys.TAB);
        
        // Now focus is on next field
        WebElement lastName = driver.switchTo().activeElement();
        lastName.sendKeys("Doe");
        lastName.sendKeys(Keys.TAB);
        
        // Continue with next field
        WebElement email = driver.switchTo().activeElement();
        email.sendKeys("john.doe@example.com");
        
        System.out.println("Form filled using Tab navigation");
        
        driver.quit();
    }
}
```

#### Example 3: Escape Key
```java
public class EscapeKeyExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/modal");
        
        // Open modal
        WebElement openModalBtn = driver.findElement(By.id("openModal"));
        openModalBtn.click();
        
        // Wait for modal to appear
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Close modal with Escape key
        WebElement modalContent = driver.findElement(By.className("modal"));
        modalContent.sendKeys(Keys.ESCAPE);
        
        System.out.println("Modal closed with Escape key");
        
        driver.quit();
    }
}
```

---

## 4. Keyboard Shortcuts

### Common Shortcuts

#### Example 1: Select All (Ctrl+A)
```java
public class SelectAllExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/textarea");
        
        WebElement textArea = driver.findElement(By.id("content"));
        
        // Type some text
        textArea.sendKeys("This is sample text that we will select.");
        
        // Select all text (Ctrl+A)
        textArea.sendKeys(Keys.CONTROL + "a");
        
        // Now all text is selected
        System.out.println("All text selected");
        
        // Type new text (replaces selected text)
        textArea.sendKeys("New text");
        
        driver.quit();
    }
}
```

#### Example 2: Copy-Paste (Ctrl+C, Ctrl+V)
```java
public class CopyPasteExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/form");
        
        // Source field
        WebElement sourceField = driver.findElement(By.id("source"));
        sourceField.sendKeys("Text to copy");
        
        // Select all and copy
        sourceField.sendKeys(Keys.CONTROL + "a");
        sourceField.sendKeys(Keys.CONTROL + "c");
        
        // Target field
        WebElement targetField = driver.findElement(By.id("target"));
        targetField.click();
        
        // Paste
        targetField.sendKeys(Keys.CONTROL + "v");
        
        System.out.println("Text copied and pasted successfully");
        
        driver.quit();
    }
}
```

#### Example 3: Refresh Page (F5 or Ctrl+R)
```java
public class RefreshPageExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        System.out.println("Initial page load");
        
        // Method 1: F5 key
        WebElement body = driver.findElement(By.tagName("body"));
        body.sendKeys(Keys.F5);
        
        System.out.println("Page refreshed with F5");
        
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Method 2: Ctrl+R
        body.sendKeys(Keys.CONTROL + "r");
        
        System.out.println("Page refreshed with Ctrl+R");
        
        driver.quit();
    }
}
```

---

## 5. Key Combinations

### Using Actions Class for Complex Combinations

#### Example 1: Multiple Modifier Keys
```java
import org.openqa.selenium.interactions.Actions;

public class KeyCombinationsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/editor");
        
        Actions actions = new Actions(driver);
        WebElement editor = driver.findElement(By.id("editor"));
        
        // Type some text
        editor.sendKeys("Sample text for formatting");
        
        // Select all (Ctrl+A)
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();
        
        // Bold (Ctrl+B)
        actions.keyDown(Keys.CONTROL)
               .sendKeys("b")
               .keyUp(Keys.CONTROL)
               .perform();
        
        System.out.println("Text formatted with keyboard shortcuts");
        
        driver.quit();
    }
}
```

#### Example 2: Shift+Arrow for Selection
```java
public class ShiftArrowSelectionExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/text");
        
        Actions actions = new Actions(driver);
        WebElement textField = driver.findElement(By.id("text"));
        
        // Type text
        textField.sendKeys("Select this text");
        
        // Move cursor to beginning
        textField.sendKeys(Keys.HOME);
        
        // Select first 6 characters (Shift+Right Arrow x6)
        for (int i = 0; i < 6; i++) {
            actions.keyDown(Keys.SHIFT)
                   .sendKeys(Keys.ARROW_RIGHT)
                   .keyUp(Keys.SHIFT)
                   .perform();
        }
        
        System.out.println("Text selected using Shift+Arrow");
        
        driver.quit();
    }
}
```

#### Example 3: Ctrl+Shift Combinations
```java
public class CtrlShiftExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/editor");
        
        Actions actions = new Actions(driver);
        WebElement editor = driver.findElement(By.id("editor"));
        
        editor.sendKeys("Text to format");
        
        // Select all
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();
        
        // Uppercase (Ctrl+Shift+U in some editors)
        actions.keyDown(Keys.CONTROL)
               .keyDown(Keys.SHIFT)
               .sendKeys("u")
               .keyUp(Keys.SHIFT)
               .keyUp(Keys.CONTROL)
               .perform();
        
        System.out.println("Applied Ctrl+Shift combination");
        
        driver.quit();
    }
}
```

---

## 6. Special Keys

### Navigation Keys

#### Example 1: Arrow Keys
```java
public class ArrowKeysExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/dropdown");
        
        WebElement dropdown = driver.findElement(By.id("country"));
        dropdown.click();
        
        // Navigate with arrow keys
        dropdown.sendKeys(Keys.ARROW_DOWN);  // Move down
        dropdown.sendKeys(Keys.ARROW_DOWN);  // Move down again
        dropdown.sendKeys(Keys.ARROW_UP);    // Move up
        dropdown.sendKeys(Keys.ENTER);       // Select
        
        System.out.println("Navigated dropdown with arrow keys");
        
        driver.quit();
    }
}
```

#### Example 2: Home and End Keys
```java
public class HomeEndKeysExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/text");
        
        WebElement textField = driver.findElement(By.id("longText"));
        textField.sendKeys("This is a long text field with lots of content");
        
        // Move to beginning
        textField.sendKeys(Keys.HOME);
        System.out.println("Cursor moved to beginning");
        
        // Move to end
        textField.sendKeys(Keys.END);
        System.out.println("Cursor moved to end");
        
        // Add text at end
        textField.sendKeys(" - Added at end");
        
        driver.quit();
    }
}
```

#### Example 3: Page Up/Down
```java
public class PageUpDownExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/long-page");
        
        WebElement body = driver.findElement(By.tagName("body"));
        
        // Scroll down
        body.sendKeys(Keys.PAGE_DOWN);
        System.out.println("Scrolled down one page");
        
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Scroll down more
        body.sendKeys(Keys.PAGE_DOWN);
        body.sendKeys(Keys.PAGE_DOWN);
        
        // Scroll back up
        body.sendKeys(Keys.PAGE_UP);
        System.out.println("Scrolled up one page");
        
        driver.quit();
    }
}
```

---

## 7. Keyboard Navigation

### Complete Form Navigation Example
```java
public class FormNavigationExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/registration");
            
            // Start with first field
            WebElement firstField = driver.findElement(By.id("firstName"));
            firstField.click();
            
            // Fill form using only keyboard
            firstField.sendKeys("John");
            firstField.sendKeys(Keys.TAB);
            
            // Last name (now active element)
            driver.switchTo().activeElement().sendKeys("Doe");
            driver.switchTo().activeElement().sendKeys(Keys.TAB);
            
            // Email
            driver.switchTo().activeElement().sendKeys("john.doe@example.com");
            driver.switchTo().activeElement().sendKeys(Keys.TAB);
            
            // Phone
            driver.switchTo().activeElement().sendKeys("1234567890");
            driver.switchTo().activeElement().sendKeys(Keys.TAB);
            
            // Address
            driver.switchTo().activeElement().sendKeys("123 Main St");
            driver.switchTo().activeElement().sendKeys(Keys.TAB);
            
            // City
            driver.switchTo().activeElement().sendKeys("New York");
            driver.switchTo().activeElement().sendKeys(Keys.TAB);
            
            // Submit with Enter
            driver.switchTo().activeElement().sendKeys(Keys.ENTER);
            
            System.out.println("Form filled and submitted using keyboard only");
            
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 8. Combining Keyboard and Mouse

### Example: Keyboard + Mouse Actions
```java
import org.openqa.selenium.interactions.Actions;

public class KeyboardMouseCombinationExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/interactive");
        
        Actions actions = new Actions(driver);
        
        try {
            // Click element while holding Ctrl (open in new tab)
            WebElement link = driver.findElement(By.linkText("Open Link"));
            
            actions.keyDown(Keys.CONTROL)
                   .click(link)
                   .keyUp(Keys.CONTROL)
                   .perform();
            
            System.out.println("Clicked link with Ctrl (new tab)");
            
            Thread.sleep(2000);
            
            // Shift+Click for selection
            WebElement item1 = driver.findElement(By.id("item1"));
            WebElement item5 = driver.findElement(By.id("item5"));
            
            item1.click();  // Select first item
            
            actions.keyDown(Keys.SHIFT)
                   .click(item5)  // Select range
                   .keyUp(Keys.SHIFT)
                   .perform();
            
            System.out.println("Selected range with Shift+Click");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 9. Practical Exercises

### Exercise 1: Search with Enter Key
**Task:** Navigate to Google, search for "Selenium WebDriver", and submit using Enter key.

```java
public class Exercise1_SearchWithEnter {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to Google
            driver.get("https://www.google.com");
            
            // Find search box
            WebElement searchBox = driver.findElement(By.name("q"));
            
            // Type search query
            searchBox.sendKeys("Selenium WebDriver");
            
            // Submit with Enter key
            searchBox.sendKeys(Keys.ENTER);
            
            // Wait for results
            Thread.sleep(2000);
            
            // Verify results page
            String title = driver.getTitle();
            System.out.println("Page title: " + title);
            
            if (title.contains("Selenium WebDriver")) {
                System.out.println("✓ Search successful!");
            } else {
                System.out.println("✗ Search failed!");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 2: Form Navigation with Tab
**Task:** Fill a registration form using only Tab key for navigation.

```java
public class Exercise2_TabNavigation {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://example.com/register");
            
            // Start with first field
            WebElement firstField = driver.findElement(By.id("username"));
            firstField.click();
            
            // Username
            firstField.sendKeys("testuser123");
            firstField.sendKeys(Keys.TAB);
            
            // Email
            driver.switchTo().activeElement().sendKeys("test@example.com");
            driver.switchTo().activeElement().sendKeys(Keys.TAB);
            
            // Password
            driver.switchTo().activeElement().sendKeys("SecurePass123!");
            driver.switchTo().activeElement().sendKeys(Keys.TAB);
            
            // Confirm Password
            driver.switchTo().activeElement().sendKeys("SecurePass123!");
            driver.switchTo().activeElement().sendKeys(Keys.TAB);
            
            // Submit
            driver.switchTo().activeElement().sendKeys(Keys.ENTER);
            
            System.out.println("✓ Form filled using Tab navigation");
            
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 3: Copy-Paste Operation
**Task:** Copy text from one field and paste it into another.

```java
public class Exercise3_CopyPaste {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://example.com/text-fields");
            
            // Source field
            WebElement sourceField = driver.findElement(By.id("source"));
            sourceField.sendKeys("This text will be copied");
            
            // Select all text
            sourceField.sendKeys(Keys.CONTROL + "a");
            
            // Copy
            sourceField.sendKeys(Keys.CONTROL + "c");
            
            System.out.println("✓ Text copied");
            
            // Target field
            WebElement targetField = driver.findElement(By.id("target"));
            targetField.click();
            
            // Paste
            targetField.sendKeys(Keys.CONTROL + "v");
            
            System.out.println("✓ Text pasted");
            
            // Verify
            String targetText = targetField.getAttribute("value");
            String sourceText = sourceField.getAttribute("value");
            
            if (targetText.equals(sourceText)) {
                System.out.println("✓ Copy-paste successful!");
            } else {
                System.out.println("✗ Copy-paste failed!");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 4: Dropdown Navigation with Arrow Keys
**Task:** Navigate a dropdown menu using arrow keys.

```java
public class Exercise4_DropdownArrowKeys {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://example.com/dropdown");
            
            // Find dropdown
            WebElement dropdown = driver.findElement(By.id("country"));
            dropdown.click();
            
            // Navigate with arrow keys
            System.out.println("Navigating dropdown with arrow keys...");
            
            dropdown.sendKeys(Keys.ARROW_DOWN);
            Thread.sleep(500);
            
            dropdown.sendKeys(Keys.ARROW_DOWN);
            Thread.sleep(500);
            
            dropdown.sendKeys(Keys.ARROW_DOWN);
            Thread.sleep(500);
            
            // Select with Enter
            dropdown.sendKeys(Keys.ENTER);
            
            System.out.println("✓ Option selected with arrow keys");
            
            // Verify selection
            String selectedValue = dropdown.getAttribute("value");
            System.out.println("Selected value: " + selectedValue);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 5: Keyboard Shortcuts
**Task:** Use keyboard shortcuts to perform text operations.

```java
public class Exercise5_KeyboardShortcuts {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://example.com/editor");
            
            WebElement editor = driver.findElement(By.id("editor"));
            
            // Type initial text
            editor.sendKeys("This is sample text for testing keyboard shortcuts.");
            System.out.println("✓ Initial text entered");
            
            // Select all (Ctrl+A)
            editor.sendKeys(Keys.CONTROL + "a");
            System.out.println("✓ Text selected (Ctrl+A)");
            
            Thread.sleep(500);
            
            // Copy (Ctrl+C)
            editor.sendKeys(Keys.CONTROL + "c");
            System.out.println("✓ Text copied (Ctrl+C)");
            
            // Clear field
            editor.clear();
            
            // Paste (Ctrl+V)
            editor.sendKeys(Keys.CONTROL + "v");
            System.out.println("✓ Text pasted (Ctrl+V)");
            
            // Add more text
            editor.sendKeys(Keys.END);
            editor.sendKeys(" Additional text.");
            
            // Select all again
            editor.sendKeys(Keys.CONTROL + "a");
            
            // Cut (Ctrl+X)
            editor.sendKeys(Keys.CONTROL + "x");
            System.out.println("✓ Text cut (Ctrl+X)");
            
            // Paste again
            editor.sendKeys(Keys.CONTROL + "v");
            System.out.println("✓ Text pasted again (Ctrl+V)");
            
            System.out.println("\n✓ All keyboard shortcuts tested successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 10. Common Mistakes

### Mistake 1: Not Releasing Modifier Keys
```java
// ❌ WRONG - Key stays pressed
actions.keyDown(Keys.CONTROL)
       .sendKeys("c")
       .perform();  // Ctrl still pressed!

// ✅ CORRECT - Release key
actions.keyDown(Keys.CONTROL)
       .sendKeys("c")
       .keyUp(Keys.CONTROL)
       .perform();
```

### Mistake 2: Using Wrong Key for OS
```java
// ❌ WRONG - Hardcoded for Windows
element.sendKeys(Keys.CONTROL + "c");

// ✅ CORRECT - OS-aware
String os = System.getProperty("os.name").toLowerCase();
Keys modifierKey = os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;
element.sendKeys(modifierKey + "c");
```

### Mistake 3: Not Waiting for Element Focus
```java
// ❌ WRONG - Sending keys before element is ready
WebElement field = driver.findElement(By.id("input"));
field.sendKeys(Keys.TAB);  // May not work if not focused

// ✅ CORRECT - Ensure element is focused
WebElement field = driver.findElement(By.id("input"));
field.click();  // Focus first
Thread.sleep(500);  // Wait for focus
field.sendKeys(Keys.TAB);
```

### Mistake 4: Incorrect Key Combination Syntax
```java
// ❌ WRONG - Incorrect syntax
element.sendKeys(Keys.CONTROL, "a");  // Doesn't work

// ✅ CORRECT - Use + for combination
element.sendKeys(Keys.CONTROL + "a");

// ✅ ALSO CORRECT - Use Actions class
actions.keyDown(Keys.CONTROL)
       .sendKeys("a")
       .keyUp(Keys.CONTROL)
       .perform();
```

---

## 11. Best Practices

### 1. Use Actions Class for Complex Operations
```java
// For simple operations
element.sendKeys(Keys.ENTER);

// For complex combinations
Actions actions = new Actions(driver);
actions.keyDown(Keys.CONTROL)
       .keyDown(Keys.SHIFT)
       .sendKeys("t")
       .keyUp(Keys.SHIFT)
       .keyUp(Keys.CONTROL)
       .perform();
```

### 2. Handle OS Differences
```java
public class KeyboardUtils {
    public static Keys getModifierKey() {
        String os = System.getProperty("os.name").toLowerCase();
        return os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;
    }
    
    public static void selectAll(WebElement element) {
        element.sendKeys(getModifierKey() + "a");
    }
    
    public static void copy(WebElement element) {
        element.sendKeys(getModifierKey() + "c");
    }
    
    public static void paste(WebElement element) {
        element.sendKeys(getModifierKey() + "v");
    }
}
```

### 3. Add Waits for Keyboard Actions
```java
public void sendKeysWithWait(WebElement element, CharSequence... keys) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.elementToBeClickable(element));
    element.sendKeys(keys);
}
```

### 4. Create Reusable Methods
```java
public class KeyboardHelper {
    private WebDriver driver;
    private Actions actions;
    
    public KeyboardHelper(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }
    
    public void pressEnter(WebElement element) {
        element.sendKeys(Keys.ENTER);
    }
    
    public void tabToNextField(WebElement element) {
        element.sendKeys(Keys.TAB);
    }
    
    public void selectAllText(WebElement element) {
        element.sendKeys(Keys.CONTROL + "a");
    }
    
    public void copyText(WebElement element) {
        element.sendKeys(Keys.CONTROL + "c");
    }
    
    public void pasteText(WebElement element) {
        element.sendKeys(Keys.CONTROL + "v");
    }
    
    public void navigateDropdown(WebElement dropdown, int steps) {
        dropdown.click();
        for (int i = 0; i < steps; i++) {
            dropdown.sendKeys(Keys.ARROW_DOWN);
        }
        dropdown.sendKeys(Keys.ENTER);
    }
}
```

---

## 12. Key Takeaways

### Essential Concepts
✅ **Keys Class:** Provides constants for special keyboard keys  
✅ **sendKeys():** Method to send keyboard input to elements  
✅ **Actions Class:** For complex key combinations  
✅ **Modifier Keys:** Ctrl, Shift, Alt, Command  
✅ **Navigation Keys:** Tab, Enter, Arrow keys, Home, End  
✅ **Key Combinations:** Use + operator or Actions class  
✅ **OS Awareness:** Handle Windows vs Mac differences  
✅ **Focus Management:** Ensure element has focus before sending keys

### Common Use Cases
- Form navigation with Tab
- Search submission with Enter
- Copy-paste operations
- Dropdown navigation with arrows
- Keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)
- Modal dismissal with Escape
- Page scrolling with Page Up/Down

### Remember
- Always release modifier keys after use
- Handle OS-specific keys (Ctrl vs Command)
- Wait for elements to be ready before sending keys
- Use Actions class for complex combinations
- Test keyboard-only navigation for accessibility

---

## 📝 Practice Tasks

1. **Task 1:** Create a script that fills a login form using only keyboard (Tab and Enter)
2. **Task 2:** Implement copy-paste functionality between two text fields
3. **Task 3:** Navigate a multi-level dropdown menu using arrow keys
4. **Task 4:** Create a utility class for common keyboard operations
5. **Task 5:** Test a web application using only keyboard navigation (no mouse)

---

## 🔗 Related Topics
- [Day 8: Actions Class - Mouse Operations](day08_actions_class.md)
- [Day 9: Drag & Drop and Sliders](day09_drag_drop_sliders.md)
- [Day 10: Web Tables](day10_web_tables.md)
- [Day 12: Mouse Operations Advanced](day12_mouse_operations_advanced.md)

---

**Next Lesson:**