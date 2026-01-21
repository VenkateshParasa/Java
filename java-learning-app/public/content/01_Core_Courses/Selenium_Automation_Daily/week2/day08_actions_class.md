---
title: "Day 8: Actions Class - Mouse and Keyboard Operations"
subtitle: "Master Advanced User Interactions in Selenium"
courseId: selenium-automation
week: 2
day: 8
tags: [selenium, actions-class, mouse-operations, keyboard-operations, user-interactions, advanced-automation]
difficulty: intermediate
duration: 90 minutes
objectives:
  - Understand the Actions class and its capabilities
  - Master mouse operations (hover, click, drag)
  - Implement keyboard operations and shortcuts
  - Combine multiple actions into complex sequences
  - Apply build() and perform() methods correctly
  - Handle real-world interaction scenarios
---

# Day 8: Actions Class - Mouse and Keyboard Operations

## Table of Contents
1. [Introduction](#introduction)
2. [Learning Objectives](#learning-objectives)
3. [Introduction to Actions Class](#introduction-to-actions-class)
4. [Setting Up Actions Class](#setting-up-actions-class)
5. [Mouse Operations](#mouse-operations)
6. [Keyboard Operations](#keyboard-operations)
7. [Combining Mouse and Keyboard Actions](#combining-mouse-and-keyboard-actions)
8. [Build and Perform Methods](#build-and-perform-methods)
9. [Practical Examples](#practical-examples)
10. [Common Use Cases and Scenarios](#common-use-cases-and-scenarios)
11. [Best Practices](#best-practices)
12. [Troubleshooting Common Issues](#troubleshooting-common-issues)
13. [Practice Exercises](#practice-exercises)
14. [Interview Questions](#interview-questions)
15. [Key Takeaways](#key-takeaways)
16. [What's Next](#whats-next)

## Introduction

Welcome to Day 8 of your Selenium automation journey! Today, we'll explore one of the most powerful features in Selenium WebDriver - the **Actions Class**. This class enables you to simulate complex user interactions that go beyond simple clicks and text input.

Modern web applications often require sophisticated user interactions such as:
- Hovering over menu items to reveal dropdown menus
- Right-clicking to open context menus
- Dragging and dropping elements
- Performing keyboard shortcuts like Ctrl+C, Ctrl+V
- Combining multiple actions in a sequence

The Actions class provides a fluent API that allows you to chain multiple actions together, making your test code more readable and maintainable.

## Learning Objectives

By the end of this lesson, you will be able to:

1. Understand the purpose and architecture of the Actions class
2. Set up and initialize Actions class instances
3. Perform various mouse operations (hover, click, double-click, right-click)
4. Implement keyboard operations and simulate keyboard shortcuts
5. Combine multiple mouse and keyboard actions
6. Use build() and perform() methods appropriately
7. Handle complex real-world interaction scenarios
8. Debug and troubleshoot common Actions class issues

## Introduction to Actions Class

### What is the Actions Class?

The Actions class is a user-facing API provided by Selenium WebDriver for generating complex user gestures. It provides methods to simulate low-level interactions such as mouse movements, mouse button actions, key presses, and context menu interactions.

### Why Use the Actions Class?

**Standard WebDriver Methods Limitations:**
- `element.click()` - Simple clicks only
- `element.sendKeys()` - Basic text input
- Cannot simulate hovering
- Cannot perform drag and drop
- Cannot execute keyboard shortcuts

**Actions Class Capabilities:**
- Complex mouse movements and gestures
- Keyboard shortcuts and modifier keys
- Combining multiple actions in sequences
- Context menu interactions
- Drag and drop operations
- Precise control over action execution

### Architecture Overview

```
┌─────────────────────────────────────┐
│         Actions Class               │
│                                     │
│  ┌──────────────┐  ┌─────────────┐ │
│  │   Mouse      │  │  Keyboard   │ │
│  │  Operations  │  │  Operations │ │
│  └──────────────┘  └─────────────┘ │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Action Builder Chain       │  │
│  │   (Fluent API Pattern)       │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   build() / perform()        │  │
│  │   (Execution Methods)        │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Key Packages and Imports

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.Keys;
import org.openqa.selenium.By;
```

## Setting Up Actions Class

### Basic Initialization

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class ActionsClassSetup {
    public static void main(String[] args) {
        // Initialize WebDriver
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Initialize Actions class
        Actions actions = new Actions(driver);

        // Now you can use the actions object
        // actions.moveToElement(element).perform();

        driver.quit();
    }
}
```

### Important Points

1. **Actions object requires a WebDriver instance** - You must pass the driver to the constructor
2. **One Actions instance per driver** - Create one Actions object and reuse it
3. **Actions are not executed immediately** - They are built and then performed
4. **Thread-safe for single driver instance** - But not recommended for parallel execution with the same instance

### Complete Setup Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class ActionsClassDemo {
    private WebDriver driver;
    private Actions actions;

    public void setUp() {
        // Set up WebDriver
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        // Initialize Actions class
        actions = new Actions(driver);
    }

    public void performActions() {
        driver.get("https://example.com");

        // Find element
        WebElement element = driver.findElement(By.id("menu"));

        // Perform action
        actions.moveToElement(element).perform();
    }

    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        ActionsClassDemo demo = new ActionsClassDemo();
        demo.setUp();
        demo.performActions();
        demo.tearDown();
    }
}
```

## Mouse Operations

The Actions class provides comprehensive support for mouse operations, allowing you to simulate real user mouse interactions.

### 1. moveToElement() - Hovering

The `moveToElement()` method moves the mouse cursor to the center of the specified element, simulating a hover action.

**Syntax:**
```java
actions.moveToElement(WebElement target).perform();
```

**Example: Basic Hover**

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class HoverExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.amazon.com");
        driver.manage().window().maximize();

        // Hover over "Account & Lists"
        WebElement accountMenu = driver.findElement(
            By.id("nav-link-accountList")
        );

        actions.moveToElement(accountMenu).perform();

        // Wait to see the hover effect
        Thread.sleep(2000);

        // Now you can click on a submenu item
        WebElement signInButton = driver.findElement(
            By.xpath("//span[text()='Sign in']")
        );
        signInButton.click();

        Thread.sleep(3000);
        driver.quit();
    }
}
```

**Example: Nested Hover Menus**

```java
public class NestedHoverMenu {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://example.com/menu");
        driver.manage().window().maximize();

        // Hover over main menu
        WebElement mainMenu = driver.findElement(By.id("main-menu"));
        actions.moveToElement(mainMenu).perform();
        Thread.sleep(1000);

        // Hover over submenu
        WebElement subMenu = driver.findElement(By.id("sub-menu-1"));
        actions.moveToElement(subMenu).perform();
        Thread.sleep(1000);

        // Click on nested item
        WebElement nestedItem = driver.findElement(By.id("nested-item"));
        actions.moveToElement(nestedItem).click().perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### 2. click(), doubleClick(), contextClick()

**a) click() - Standard Click**

```java
// Method 1: Click at current mouse position
actions.click().perform();

// Method 2: Move to element and click
WebElement button = driver.findElement(By.id("submit-btn"));
actions.click(button).perform();

// Method 3: Move first, then click (two separate actions)
actions.moveToElement(button).click().perform();
```

**Example: Click with Actions**

```java
public class ClickWithActions {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://example.com");

        WebElement button = driver.findElement(By.id("button"));

        // Regular click
        actions.click(button).perform();

        // Alternative: Move and click
        actions.moveToElement(button).click().perform();
    }
}
```

**b) doubleClick() - Double Click**

The `doubleClick()` method performs a double-click action on the specified element.

```java
// Double click on element
WebElement element = driver.findElement(By.id("text-field"));
actions.doubleClick(element).perform();

// Double click at current mouse position
actions.doubleClick().perform();
```

**Example: Select Text with Double Click**

```java
public class DoubleClickExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://example.com/editor");
        driver.manage().window().maximize();

        // Find text element
        WebElement textElement = driver.findElement(
            By.xpath("//p[contains(text(), 'Sample Text')]")
        );

        // Double click to select word
        actions.doubleClick(textElement).perform();

        Thread.sleep(2000);

        // Now the text is selected, you can copy it
        actions.keyDown(Keys.CONTROL)
               .sendKeys("c")
               .keyUp(Keys.CONTROL)
               .perform();

        System.out.println("Text copied to clipboard");

        driver.quit();
    }
}
```

**c) contextClick() - Right Click**

The `contextClick()` method performs a right-click (context menu click) on the specified element.

```java
// Right click on element
WebElement element = driver.findElement(By.id("image"));
actions.contextClick(element).perform();

// Right click at current mouse position
actions.contextClick().perform();
```

**Example: Context Menu Interaction**

```java
public class RightClickExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://swisnl.github.io/jQuery-contextMenu/demo.html");
        driver.manage().window().maximize();

        // Find the element to right-click
        WebElement rightClickArea = driver.findElement(
            By.xpath("//span[text()='right click me']")
        );

        // Perform right click
        actions.contextClick(rightClickArea).perform();

        Thread.sleep(1000);

        // Click on a context menu option
        WebElement editOption = driver.findElement(
            By.xpath("//span[text()='Edit']")
        );
        editOption.click();

        Thread.sleep(2000);

        // Handle alert if present
        try {
            driver.switchTo().alert().accept();
        } catch (Exception e) {
            System.out.println("No alert present");
        }

        driver.quit();
    }
}
```

### 3. clickAndHold(), release()

These methods are used for drag and drop operations or when you need to hold a mouse button down for a specific action.

**clickAndHold()** - Clicks and holds at the current mouse location or on a specified element.

**release()** - Releases the pressed mouse button.

**Syntax:**
```java
// Click and hold on element
actions.clickAndHold(element).perform();

// Release the mouse button
actions.release().perform();

// Combined: Click, hold, move, and release
actions.clickAndHold(source)
       .moveToElement(target)
       .release()
       .perform();
```

**Example: Drag and Drop**

```java
public class DragAndDropExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://jqueryui.com/droppable/");
        driver.manage().window().maximize();

        // Switch to iframe (the demo is in an iframe)
        driver.switchTo().frame(0);

        // Find draggable and droppable elements
        WebElement draggable = driver.findElement(By.id("draggable"));
        WebElement droppable = driver.findElement(By.id("droppable"));

        System.out.println("Before drag: " + droppable.getText());

        // Method 1: Using clickAndHold and release
        actions.clickAndHold(draggable)
               .moveToElement(droppable)
               .release()
               .perform();

        Thread.sleep(2000);

        System.out.println("After drag: " + droppable.getText());

        driver.quit();
    }
}
```

**Example: Using dragAndDrop() Method**

```java
public class DragAndDropAlternative {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://jqueryui.com/droppable/");
        driver.manage().window().maximize();

        driver.switchTo().frame(0);

        WebElement source = driver.findElement(By.id("draggable"));
        WebElement target = driver.findElement(By.id("droppable"));

        // Direct drag and drop method
        actions.dragAndDrop(source, target).perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

**Example: Selecting Multiple Items with Ctrl+Click**

```java
public class SelectMultipleItems {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://example.com/selectable-list");
        driver.manage().window().maximize();

        // Find multiple items to select
        WebElement item1 = driver.findElement(By.id("item-1"));
        WebElement item2 = driver.findElement(By.id("item-3"));
        WebElement item3 = driver.findElement(By.id("item-5"));

        // Click first item
        item1.click();
        Thread.sleep(500);

        // Hold Ctrl and click other items
        actions.keyDown(Keys.CONTROL)
               .click(item2)
               .click(item3)
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### 4. moveByOffset()

The `moveByOffset()` method moves the mouse from its current position (or 0,0) by the given offset.

**Syntax:**
```java
actions.moveByOffset(int xOffset, int yOffset).perform();
```

**Parameters:**
- `xOffset` - Horizontal distance to move (positive = right, negative = left)
- `yOffset` - Vertical distance to move (positive = down, negative = up)

**Example: Drawing with Mouse**

```java
public class MoveByOffsetExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.youidraw.com/apps/painter/");
        driver.manage().window().maximize();

        Thread.sleep(3000); // Wait for page to load

        // Find canvas area
        WebElement canvas = driver.findElement(By.id("canvas"));

        // Move to starting position
        actions.moveToElement(canvas).perform();

        // Draw a simple shape
        actions.clickAndHold()
               .moveByOffset(100, 0)     // Move right
               .moveByOffset(0, 100)     // Move down
               .moveByOffset(-100, 0)    // Move left
               .moveByOffset(0, -100)    // Move up
               .release()
               .perform();

        Thread.sleep(3000);
        driver.quit();
    }
}
```

**Example: Precise Mouse Movement**

```java
public class PreciseMouseMovement {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://example.com");
        driver.manage().window().maximize();

        // Move to element first
        WebElement element = driver.findElement(By.id("target"));
        actions.moveToElement(element).perform();

        // Fine-tune position by offset
        // Move 20 pixels right and 10 pixels down from center
        actions.moveByOffset(20, 10).click().perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

**Important Note About moveByOffset():**
- The offset is relative to the current mouse position
- If you want to reset to a known position, use `moveToElement()` first
- Coordinates can be positive or negative
- Be careful with chaining multiple `moveByOffset()` calls as they accumulate

### Complete Mouse Operations Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class ComprehensiveMouseOperations {
    private WebDriver driver;
    private Actions actions;

    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    public void demonstrateHover() throws InterruptedException {
        System.out.println("=== Demonstrating Hover ===");
        driver.get("https://www.amazon.com");

        WebElement accountMenu = driver.findElement(
            By.id("nav-link-accountList")
        );

        actions.moveToElement(accountMenu).perform();
        Thread.sleep(2000);
        System.out.println("Hover completed");
    }

    public void demonstrateDoubleClick() throws InterruptedException {
        System.out.println("=== Demonstrating Double Click ===");
        driver.get("https://demo.guru99.com/test/simple_context_menu.html");

        WebElement doubleClickBtn = driver.findElement(
            By.xpath("//button[text()='Double-Click Me To See Alert']")
        );

        actions.doubleClick(doubleClickBtn).perform();
        Thread.sleep(1000);

        // Handle alert
        driver.switchTo().alert().accept();
        System.out.println("Double click completed");
    }

    public void demonstrateRightClick() throws InterruptedException {
        System.out.println("=== Demonstrating Right Click ===");
        driver.get("https://demo.guru99.com/test/simple_context_menu.html");

        WebElement rightClickBtn = driver.findElement(
            By.xpath("//span[text()='right click me']")
        );

        actions.contextClick(rightClickBtn).perform();
        Thread.sleep(1000);

        // Click on Edit option
        WebElement editOption = driver.findElement(
            By.xpath("//span[text()='Edit']")
        );
        editOption.click();
        Thread.sleep(1000);

        driver.switchTo().alert().accept();
        System.out.println("Right click completed");
    }

    public void demonstrateDragAndDrop() throws InterruptedException {
        System.out.println("=== Demonstrating Drag and Drop ===");
        driver.get("https://jqueryui.com/droppable/");

        driver.switchTo().frame(0);

        WebElement source = driver.findElement(By.id("draggable"));
        WebElement target = driver.findElement(By.id("droppable"));

        System.out.println("Before: " + target.getText());

        actions.dragAndDrop(source, target).perform();
        Thread.sleep(2000);

        System.out.println("After: " + target.getText());
        driver.switchTo().defaultContent();
    }

    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        ComprehensiveMouseOperations demo = new ComprehensiveMouseOperations();

        try {
            demo.setUp();
            demo.demonstrateHover();
            demo.demonstrateDoubleClick();
            demo.demonstrateRightClick();
            demo.demonstrateDragAndDrop();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.tearDown();
        }
    }
}
```

## Keyboard Operations

The Actions class provides powerful keyboard simulation capabilities, allowing you to send keys, hold modifier keys, and simulate keyboard shortcuts.

### 1. sendKeys() with Actions

The `sendKeys()` method with Actions class can send keys to the currently focused element or to a specific element.

**Syntax:**
```java
// Send keys to currently focused element
actions.sendKeys("text to send").perform();

// Send keys to specific element
actions.sendKeys(element, "text to send").perform();

// Move to element first, then send keys
actions.moveToElement(element).sendKeys("text").perform();
```

**Example: Basic sendKeys**

```java
public class SendKeysWithActions {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Method 1: Direct sendKeys to element
        actions.sendKeys(searchBox, "Selenium WebDriver").perform();

        Thread.sleep(2000);

        // Clear the field
        searchBox.clear();

        // Method 2: Click element first, then send keys
        actions.click(searchBox)
               .sendKeys("Actions Class Tutorial")
               .perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

**Difference between element.sendKeys() and actions.sendKeys():**

```java
// Standard WebDriver sendKeys
element.sendKeys("text"); // Simple text input

// Actions sendKeys
actions.sendKeys(element, "text").perform(); // More control, can be chained

// Actions allows for more complex scenarios:
actions.click(element)
       .keyDown(Keys.SHIFT)
       .sendKeys("text") // Will be in uppercase
       .keyUp(Keys.SHIFT)
       .perform();
```

### 2. keyDown() and keyUp()

The `keyDown()` and `keyUp()` methods simulate pressing and releasing keys, particularly useful for modifier keys (Ctrl, Shift, Alt).

**Syntax:**
```java
// Press key down
actions.keyDown(Keys.CONTROL).perform();

// Release key
actions.keyUp(Keys.CONTROL).perform();

// Press key on specific element
actions.keyDown(element, Keys.SHIFT).perform();
```

**Example: Using Modifier Keys**

```java
public class ModifierKeysExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Type in lowercase
        actions.click(searchBox)
               .sendKeys("selenium")
               .perform();

        Thread.sleep(1000);

        // Add space and type in uppercase using Shift
        actions.sendKeys(" ")
               .keyDown(Keys.SHIFT)
               .sendKeys("webdriver")
               .keyUp(Keys.SHIFT)
               .perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

**Example: Selecting All Text**

```java
public class SelectAllText {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Type some text
        searchBox.sendKeys("This is sample text to select");
        Thread.sleep(1000);

        // Select all text using Ctrl+A
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(2000);

        // Delete selected text
        actions.sendKeys(Keys.DELETE).perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### 3. Common Keyboard Shortcuts

Here are the most commonly used keyboard shortcuts with the Actions class:

**Available Keys Constants:**
```java
Keys.CONTROL    // Ctrl key
Keys.SHIFT      // Shift key
Keys.ALT        // Alt key
Keys.COMMAND    // Command key (Mac)
Keys.ENTER      // Enter key
Keys.RETURN     // Return key
Keys.TAB        // Tab key
Keys.ESCAPE     // Escape key
Keys.BACK_SPACE // Backspace key
Keys.DELETE     // Delete key
Keys.ARROW_UP   // Up arrow
Keys.ARROW_DOWN // Down arrow
Keys.ARROW_LEFT // Left arrow
Keys.ARROW_RIGHT // Right arrow
Keys.HOME       // Home key
Keys.END        // End key
Keys.PAGE_UP    // Page Up
Keys.PAGE_DOWN  // Page Down
Keys.F1 to F12  // Function keys
```

**Example: Copy and Paste**

```java
public class CopyPasteExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Type text
        searchBox.sendKeys("Selenium Automation");
        Thread.sleep(1000);

        // Select all (Ctrl+A)
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(500);

        // Copy (Ctrl+C)
        actions.keyDown(Keys.CONTROL)
               .sendKeys("c")
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(500);

        // Clear the field
        searchBox.clear();
        Thread.sleep(500);

        // Paste (Ctrl+V)
        actions.click(searchBox)
               .keyDown(Keys.CONTROL)
               .sendKeys("v")
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

**Example: Multiple Modifier Keys**

```java
public class MultipleModifierKeys {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys("Selenium Testing");

        Thread.sleep(1000);

        // Select all using Ctrl+A
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(500);

        // Ctrl+Shift+Arrow to select by word (example)
        actions.keyDown(Keys.CONTROL)
               .keyDown(Keys.SHIFT)
               .sendKeys(Keys.ARROW_RIGHT)
               .sendKeys(Keys.ARROW_RIGHT)
               .keyUp(Keys.SHIFT)
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

**Example: Navigation Keys**

```java
public class NavigationKeysExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Type text
        searchBox.sendKeys("Selenium WebDriver Actions");
        Thread.sleep(1000);

        // Move to beginning (Home key)
        actions.sendKeys(Keys.HOME).perform();
        Thread.sleep(500);

        // Move to end (End key)
        actions.sendKeys(Keys.END).perform();
        Thread.sleep(500);

        // Move left using arrow keys
        actions.sendKeys(Keys.ARROW_LEFT)
               .sendKeys(Keys.ARROW_LEFT)
               .sendKeys(Keys.ARROW_LEFT)
               .perform();
        Thread.sleep(500);

        // Move right
        actions.sendKeys(Keys.ARROW_RIGHT).perform();
        Thread.sleep(500);

        // Submit using Enter
        actions.sendKeys(Keys.ENTER).perform();

        Thread.sleep(3000);
        driver.quit();
    }
}
```

**Example: Tab Navigation**

```java
public class TabNavigationExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.example.com/form");
        driver.manage().window().maximize();

        // Focus on first field
        WebElement firstField = driver.findElement(By.id("firstName"));
        firstField.click();

        // Fill first field and tab to next
        actions.sendKeys("John")
               .sendKeys(Keys.TAB)
               .sendKeys("Doe")
               .sendKeys(Keys.TAB)
               .sendKeys("john.doe@example.com")
               .sendKeys(Keys.TAB)
               .sendKeys("1234567890")
               .perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

**Example: Function Keys**

```java
public class FunctionKeysExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        Thread.sleep(1000);

        // F5 to refresh page
        actions.sendKeys(Keys.F5).perform();
        Thread.sleep(2000);

        // F12 to open Developer Tools (may not work in all scenarios)
        // actions.sendKeys(Keys.F12).perform();

        // F11 for fullscreen (browser dependent)
        // actions.sendKeys(Keys.F11).perform();

        driver.quit();
    }
}
```

### Complete Keyboard Operations Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class ComprehensiveKeyboardOperations {
    private WebDriver driver;
    private Actions actions;

    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    public void demonstrateBasicSendKeys() throws InterruptedException {
        System.out.println("=== Demonstrating Basic Send Keys ===");
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));

        actions.sendKeys(searchBox, "Selenium Actions Class").perform();
        Thread.sleep(2000);

        searchBox.clear();
        System.out.println("Basic send keys completed");
    }

    public void demonstrateModifierKeys() throws InterruptedException {
        System.out.println("=== Demonstrating Modifier Keys ===");
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));

        // Type with shift key
        actions.click(searchBox)
               .sendKeys("selenium ")
               .keyDown(Keys.SHIFT)
               .sendKeys("webdriver")
               .keyUp(Keys.SHIFT)
               .perform();

        Thread.sleep(2000);
        System.out.println("Modifier keys completed");
    }

    public void demonstrateCopyPaste() throws InterruptedException {
        System.out.println("=== Demonstrating Copy-Paste ===");
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys("Text to copy");
        Thread.sleep(1000);

        // Select all
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();
        Thread.sleep(500);

        // Copy
        actions.keyDown(Keys.CONTROL)
               .sendKeys("c")
               .keyUp(Keys.CONTROL)
               .perform();
        Thread.sleep(500);

        // Clear
        searchBox.clear();

        // Paste
        actions.click(searchBox)
               .keyDown(Keys.CONTROL)
               .sendKeys("v")
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(2000);
        System.out.println("Copy-paste completed");
    }

    public void demonstrateNavigationKeys() throws InterruptedException {
        System.out.println("=== Demonstrating Navigation Keys ===");
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys("Navigation Test");
        Thread.sleep(1000);

        // Home key
        actions.sendKeys(Keys.HOME).perform();
        Thread.sleep(500);

        // End key
        actions.sendKeys(Keys.END).perform();
        Thread.sleep(500);

        // Arrow keys
        actions.sendKeys(Keys.ARROW_LEFT)
               .sendKeys(Keys.ARROW_LEFT)
               .perform();
        Thread.sleep(500);

        System.out.println("Navigation keys completed");
    }

    public void demonstrateEnterKey() throws InterruptedException {
        System.out.println("=== Demonstrating Enter Key ===");
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));

        actions.sendKeys(searchBox, "Selenium Tutorial")
               .sendKeys(Keys.ENTER)
               .perform();

        Thread.sleep(3000);
        System.out.println("Enter key completed");
    }

    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        ComprehensiveKeyboardOperations demo = new ComprehensiveKeyboardOperations();

        try {
            demo.setUp();
            demo.demonstrateBasicSendKeys();
            demo.demonstrateModifierKeys();
            demo.demonstrateCopyPaste();
            demo.demonstrateNavigationKeys();
            demo.demonstrateEnterKey();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.tearDown();
        }
    }
}
```

## Combining Mouse and Keyboard Actions

One of the most powerful features of the Actions class is the ability to combine mouse and keyboard operations in a single action chain.

### Why Combine Actions?

1. **Simulate Complex User Behavior** - Real users often combine mouse and keyboard
2. **Efficient Test Execution** - Multiple actions in one command
3. **Better Synchronization** - Actions execute in sequence without gaps
4. **More Realistic Testing** - Mimics actual user interactions

### Basic Combination Patterns

**Pattern 1: Click and Type**
```java
actions.click(element)
       .sendKeys("text")
       .perform();
```

**Pattern 2: Hover and Click**
```java
actions.moveToElement(menu)
       .click(submenuItem)
       .perform();
```

**Pattern 3: Drag with Keyboard Modifier**
```java
actions.keyDown(Keys.CONTROL)
       .clickAndHold(element1)
       .moveToElement(element2)
       .release()
       .keyUp(Keys.CONTROL)
       .perform();
```

### Example 1: Select Multiple Items with Ctrl+Click

```java
public class SelectMultipleWithCtrl {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://example.com/multi-select");
        driver.manage().window().maximize();

        // Find items to select
        WebElement item1 = driver.findElement(By.id("item1"));
        WebElement item2 = driver.findElement(By.id("item2"));
        WebElement item3 = driver.findElement(By.id("item3"));

        // Click first item normally
        actions.click(item1).perform();
        Thread.sleep(500);

        // Hold Ctrl and click additional items
        actions.keyDown(Keys.CONTROL)
               .click(item2)
               .click(item3)
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(2000);
        System.out.println("Multiple items selected");

        driver.quit();
    }
}
```

### Example 2: Hover and Keyboard Navigation

```java
public class HoverAndKeyboard {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.amazon.com");
        driver.manage().window().maximize();

        // Hover over Account menu
        WebElement accountMenu = driver.findElement(
            By.id("nav-link-accountList")
        );

        // Hover and use arrow keys to navigate
        actions.moveToElement(accountMenu)
               .pause(Duration.ofSeconds(1))
               .sendKeys(Keys.ARROW_DOWN)
               .sendKeys(Keys.ARROW_DOWN)
               .sendKeys(Keys.ENTER)
               .perform();

        Thread.sleep(3000);
        driver.quit();
    }
}
```

### Example 3: Context Menu with Keyboard Selection

```java
public class ContextMenuKeyboard {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://swisnl.github.io/jQuery-contextMenu/demo.html");
        driver.manage().window().maximize();

        WebElement contextArea = driver.findElement(
            By.xpath("//span[text()='right click me']")
        );

        // Right-click and navigate with keyboard
        actions.contextClick(contextArea)
               .pause(Duration.ofMillis(500))
               .sendKeys(Keys.ARROW_DOWN)
               .sendKeys(Keys.ARROW_DOWN)
               .sendKeys(Keys.ENTER)
               .perform();

        Thread.sleep(2000);

        // Handle alert
        try {
            driver.switchTo().alert().accept();
        } catch (Exception e) {
            System.out.println("No alert");
        }

        driver.quit();
    }
}
```

### Example 4: Drag, Drop, and Keyboard Actions

```java
public class DragDropKeyboard {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://jqueryui.com/droppable/");
        driver.manage().window().maximize();

        driver.switchTo().frame(0);

        WebElement draggable = driver.findElement(By.id("draggable"));
        WebElement droppable = driver.findElement(By.id("droppable"));

        // Drag and drop, then use keyboard
        actions.dragAndDrop(draggable, droppable)
               .pause(Duration.ofSeconds(1))
               .keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### Example 5: Complex Form Filling

```java
public class ComplexFormFilling {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://example.com/registration-form");
        driver.manage().window().maximize();

        WebElement firstNameField = driver.findElement(By.id("firstName"));

        // Complex action chain
        actions
            // Fill first name
            .click(firstNameField)
            .sendKeys("John")

            // Tab to last name
            .sendKeys(Keys.TAB)
            .sendKeys("Doe")

            // Tab to email
            .sendKeys(Keys.TAB)
            .sendKeys("john.doe@example.com")

            // Tab to phone
            .sendKeys(Keys.TAB)
            .sendKeys("1234567890")

            // Tab to address
            .sendKeys(Keys.TAB)
            .sendKeys("123 Main Street")

            // Tab to city
            .sendKeys(Keys.TAB)
            .sendKeys("New York")

            // Submit form
            .sendKeys(Keys.ENTER)
            .perform();

        Thread.sleep(3000);
        driver.quit();
    }
}
```

### Example 6: Text Selection and Manipulation

```java
public class TextSelectionManipulation {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Type initial text
        searchBox.sendKeys("Selenium WebDriver Actions Class Tutorial");
        Thread.sleep(1000);

        // Select "WebDriver" using Shift+Ctrl+Arrow keys
        actions
            // Move to start
            .sendKeys(Keys.HOME)
            .pause(Duration.ofMillis(500))

            // Move to "WebDriver" and select it
            .keyDown(Keys.CONTROL)
            .sendKeys(Keys.ARROW_RIGHT) // Skip "Selenium"
            .sendKeys(Keys.ARROW_RIGHT) // Move to "WebDriver"
            .keyUp(Keys.CONTROL)

            // Select the word
            .keyDown(Keys.SHIFT)
            .keyDown(Keys.CONTROL)
            .sendKeys(Keys.ARROW_RIGHT)
            .keyUp(Keys.CONTROL)
            .keyUp(Keys.SHIFT)

            // Copy it
            .keyDown(Keys.CONTROL)
            .sendKeys("c")
            .keyUp(Keys.CONTROL)

            // Move to end and paste
            .sendKeys(Keys.END)
            .sendKeys(" - ")
            .keyDown(Keys.CONTROL)
            .sendKeys("v")
            .keyUp(Keys.CONTROL)
            .perform();

        Thread.sleep(3000);
        driver.quit();
    }
}
```

### Example 7: Slider Control with Combined Actions

```java
public class SliderControl {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://jqueryui.com/slider/");
        driver.manage().window().maximize();

        driver.switchTo().frame(0);

        WebElement slider = driver.findElement(By.xpath("//span[@class='ui-slider-handle']"));

        System.out.println("Initial position: " + slider.getLocation().getX());

        // Method 1: Drag by offset
        actions.dragAndDropBy(slider, 100, 0).perform();
        Thread.sleep(1000);

        System.out.println("After drag: " + slider.getLocation().getX());

        // Method 2: Click and use arrow keys
        actions.click(slider)
               .sendKeys(Keys.ARROW_RIGHT)
               .sendKeys(Keys.ARROW_RIGHT)
               .sendKeys(Keys.ARROW_RIGHT)
               .perform();

        Thread.sleep(1000);
        System.out.println("After arrows: " + slider.getLocation().getX());

        driver.quit();
    }
}
```

### Complete Combined Actions Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class ComprehensiveCombinedActions {
    private WebDriver driver;
    private Actions actions;

    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    public void demonstrateCtrlClick() throws InterruptedException {
        System.out.println("=== Ctrl+Click for Multiple Selection ===");
        driver.get("https://example.com/multi-select");

        // Simulate multiple item selection
        WebElement item1 = driver.findElement(By.id("item1"));
        WebElement item2 = driver.findElement(By.id("item2"));

        actions.click(item1)
               .keyDown(Keys.CONTROL)
               .click(item2)
               .keyUp(Keys.CONTROL)
               .perform();

        Thread.sleep(2000);
        System.out.println("Multiple selection completed");
    }

    public void demonstrateHoverAndNavigate() throws InterruptedException {
        System.out.println("=== Hover and Keyboard Navigation ===");
        driver.get("https://www.amazon.com");

        WebElement menu = driver.findElement(By.id("nav-link-accountList"));

        actions.moveToElement(menu)
               .pause(Duration.ofSeconds(1))
               .sendKeys(Keys.ARROW_DOWN)
               .sendKeys(Keys.ENTER)
               .perform();

        Thread.sleep(2000);
        System.out.println("Hover navigation completed");
    }

    public void demonstrateFormFilling() throws InterruptedException {
        System.out.println("=== Complex Form Filling ===");
        driver.get("https://example.com/form");

        WebElement firstField = driver.findElement(By.id("field1"));

        actions.click(firstField)
               .sendKeys("Value 1")
               .sendKeys(Keys.TAB)
               .sendKeys("Value 2")
               .sendKeys(Keys.TAB)
               .sendKeys("Value 3")
               .perform();

        Thread.sleep(2000);
        System.out.println("Form filling completed");
    }

    public void demonstrateTextManipulation() throws InterruptedException {
        System.out.println("=== Text Selection and Manipulation ===");
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys("Original Text");
        Thread.sleep(1000);

        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .sendKeys("Replaced Text")
               .perform();

        Thread.sleep(2000);
        System.out.println("Text manipulation completed");
    }

    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        ComprehensiveCombinedActions demo = new ComprehensiveCombinedActions();

        try {
            demo.setUp();
            demo.demonstrateCtrlClick();
            demo.demonstrateHoverAndNavigate();
            demo.demonstrateFormFilling();
            demo.demonstrateTextManipulation();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.tearDown();
        }
    }
}
```

## Build and Perform Methods

Understanding the difference between `build()` and `perform()` is crucial for effective use of the Actions class.

### Understanding build() and perform()

**perform():**
- Builds the action sequence AND executes it immediately
- Most commonly used method
- Convenient for single-use actions

**build():**
- Only builds the action sequence without executing
- Returns an Action object
- Allows you to store and reuse action sequences
- Execute later using the Action.perform() method

### Syntax and Usage

```java
// Method 1: Direct perform() - builds and executes
actions.moveToElement(element).click().perform();

// Method 2: Build first, then perform
Action action = actions.moveToElement(element).click().build();
action.perform(); // Execute when ready

// Method 3: Build and perform separately
actions.moveToElement(element).click().build().perform();
```

### Example 1: Using perform() Directly

```java
public class DirectPerformExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Direct perform - most common usage
        actions.moveToElement(searchBox)
               .click()
               .sendKeys("Selenium")
               .sendKeys(Keys.ENTER)
               .perform(); // Builds and executes immediately

        Thread.sleep(3000);
        driver.quit();
    }
}
```

### Example 2: Using build() for Reusable Actions

```java
import org.openqa.selenium.interactions.Action;

public class BuildForReuseExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Build the action sequence
        Action searchAction = actions
            .moveToElement(searchBox)
            .click()
            .keyDown(Keys.SHIFT)
            .sendKeys("selenium")
            .keyUp(Keys.SHIFT)
            .build(); // Only builds, doesn't execute

        System.out.println("Action built but not executed yet");
        Thread.sleep(1000);

        // Execute the action
        searchAction.perform();
        System.out.println("Action executed");

        Thread.sleep(2000);

        // Clear and reuse the same action
        searchBox.clear();
        Thread.sleep(1000);

        searchAction.perform(); // Reuse the same action
        System.out.println("Action reused");

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### Example 3: Multiple Reusable Actions

```java
import org.openqa.selenium.interactions.Action;

public class MultipleReusableActions {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://jqueryui.com/droppable/");
        driver.manage().window().maximize();

        driver.switchTo().frame(0);

        WebElement draggable = driver.findElement(By.id("draggable"));
        WebElement droppable = driver.findElement(By.id("droppable"));

        // Build drag and drop action
        Action dragDropAction = actions
            .clickAndHold(draggable)
            .moveToElement(droppable)
            .release()
            .build();

        // Build reset action (drag back)
        Action resetAction = actions
            .clickAndHold(draggable)
            .moveByOffset(-200, 0)
            .release()
            .build();

        // Perform drag and drop
        System.out.println("Performing drag and drop");
        dragDropAction.perform();
        Thread.sleep(2000);

        // Reset
        System.out.println("Resetting position");
        resetAction.perform();
        Thread.sleep(2000);

        // Repeat
        System.out.println("Repeating drag and drop");
        dragDropAction.perform();
        Thread.sleep(2000);

        driver.quit();
    }
}
```

### When to Use build() vs perform()

**Use perform() when:**
1. Action is used only once
2. Simple, straightforward operations
3. No need to store or reuse the action
4. Most common scenarios

```java
// One-time hover action
actions.moveToElement(menu).perform();

// One-time form filling
actions.sendKeys(field, "text").sendKeys(Keys.ENTER).perform();
```

**Use build() when:**
1. Action needs to be reused multiple times
2. Action sequence is complex and needs to be stored
3. Need to conditionally execute actions
4. Building action libraries for framework
5. Need better control over execution timing

```java
// Reusable login action
Action loginAction = actions
    .sendKeys(username, "user")
    .sendKeys(Keys.TAB)
    .sendKeys(password, "pass")
    .sendKeys(Keys.ENTER)
    .build();

// Use multiple times
loginAction.perform();
```

### Example 4: Conditional Action Execution

```java
public class ConditionalActionExecution {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://example.com");
        driver.manage().window().maximize();

        WebElement element = driver.findElement(By.id("target"));

        // Build different actions
        Action hoverAction = actions.moveToElement(element).build();
        Action clickAction = actions.moveToElement(element).click().build();
        Action doubleClickAction = actions.moveToElement(element).doubleClick().build();

        // Decide which action to perform based on condition
        String actionType = "click"; // This could come from config or test data

        switch (actionType) {
            case "hover":
                hoverAction.perform();
                System.out.println("Hover performed");
                break;
            case "click":
                clickAction.perform();
                System.out.println("Click performed");
                break;
            case "doubleClick":
                doubleClickAction.perform();
                System.out.println("Double-click performed");
                break;
        }

        Thread.sleep(2000);
        driver.quit();
    }
}
```

### Example 5: Action Library Pattern

```java
import org.openqa.selenium.interactions.Action;
import java.util.HashMap;
import java.util.Map;

public class ActionLibraryPattern {
    private WebDriver driver;
    private Actions actions;
    private Map<String, Action> actionLibrary;

    public ActionLibraryPattern(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
        this.actionLibrary = new HashMap<>();
        buildActionLibrary();
    }

    private void buildActionLibrary() {
        // Build common actions once

        // Copy action
        Action copyAction = actions
            .keyDown(Keys.CONTROL)
            .sendKeys("c")
            .keyUp(Keys.CONTROL)
            .build();
        actionLibrary.put("copy", copyAction);

        // Paste action
        Action pasteAction = actions
            .keyDown(Keys.CONTROL)
            .sendKeys("v")
            .keyUp(Keys.CONTROL)
            .build();
        actionLibrary.put("paste", pasteAction);

        // Select all action
        Action selectAllAction = actions
            .keyDown(Keys.CONTROL)
            .sendKeys("a")
            .keyUp(Keys.CONTROL)
            .build();
        actionLibrary.put("selectAll", selectAllAction);

        // Refresh action
        Action refreshAction = actions
            .sendKeys(Keys.F5)
            .build();
        actionLibrary.put("refresh", refreshAction);
    }

    public void executeAction(String actionName) {
        Action action = actionLibrary.get(actionName);
        if (action != null) {
            action.perform();
            System.out.println("Executed action: " + actionName);
        } else {
            System.out.println("Action not found: " + actionName);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        ActionLibraryPattern library = new ActionLibraryPattern(driver);

        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys("Selenium Actions");
        Thread.sleep(1000);

        // Use actions from library
        library.executeAction("selectAll");
        Thread.sleep(500);

        library.executeAction("copy");
        Thread.sleep(500);

        searchBox.clear();
        searchBox.click();
        Thread.sleep(500);

        library.executeAction("paste");
        Thread.sleep(2000);

        driver.quit();
    }
}
```

### Performance Considerations

```java
public class PerformanceComparison {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        driver.get("https://www.google.com");
        driver.manage().window().maximize();

        WebElement searchBox = driver.findElement(By.name("q"));

        // Scenario 1: Building each time (slower for repeated actions)
        long start1 = System.currentTimeMillis();
        for (int i = 0; i < 5; i++) {
            searchBox.clear();
            actions.sendKeys(searchBox, "Test " + i).sendKeys(Keys.ENTER).perform();
            Thread.sleep(500);
            driver.navigate().back();
        }
        long end1 = System.currentTimeMillis();
        System.out.println("Time without build: " + (end1 - start1) + "ms");

        driver.navigate().to("https://www.google.com");
        searchBox = driver.findElement(By.name("q"));

        // Scenario 2: Build once, perform multiple times (faster)
        Action searchAction = actions
            .sendKeys(searchBox, "Test")
            .sendKeys(Keys.ENTER)
            .build();

        long start2 = System.currentTimeMillis();
        for (int i = 0; i < 5; i++) {
            driver.navigate().to("https://www.google.com");
            searchBox = driver.findElement(By.name("q"));
            searchAction.perform();
            Thread.sleep(500);
        }
        long end2 = System.currentTimeMillis();
        System.out.println("Time with build: " + (end2 - start2) + "ms");

        driver.quit();
    }
}
```

### Complete Build and Perform Example

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.interactions.Action;
import java.time.Duration;

public class CompleteBuildPerformDemo {
    private WebDriver driver;
    private Actions actions;

    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    public void demonstrateDirectPerform() throws InterruptedException {
        System.out.println("=== Direct Perform Method ===");
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));

        actions.sendKeys(searchBox, "Direct Perform")
               .sendKeys(Keys.ENTER)
               .perform();

        Thread.sleep(2000);
        System.out.println("Direct perform completed");
    }

    public void demonstrateBuildMethod() throws InterruptedException {
        System.out.println("=== Build Method ===");
        driver.get("https://www.google.com");

        WebElement searchBox = driver.findElement(By.name("q"));

        Action searchAction = actions
            .sendKeys(searchBox, "Build Method")
            .sendKeys(Keys.ENTER)
            .build();

        System.out.println("Action built, waiting to execute...");
        Thread.sleep(1000);

        searchAction.perform();
        System.out.println("Action executed");

        Thread.sleep(2000);
    }

    public void demonstrateReusableActions() throws InterruptedException {
        System.out.println("=== Reusable Actions ===");

        Action copyAction = actions
            .keyDown(Keys.CONTROL)
            .sendKeys("c")
            .keyUp(Keys.CONTROL)
            .build();

        Action pasteAction = actions
            .keyDown(Keys.CONTROL)
            .sendKeys("v")
            .keyUp(Keys.CONTROL)
            .build();

        driver.get("https://www.google.com");
        WebElement searchBox = driver.findElement(By.name("q"));

        searchBox.sendKeys("Reusable Actions");
        Thread.sleep(1000);

        actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).perform();
        Thread.sleep(500);

        copyAction.perform();
        System.out.println("Text copied");
        Thread.sleep(500);

        searchBox.clear();
        searchBox.click();
        Thread.sleep(500);

        pasteAction.perform();
        System.out.println("Text pasted");
        Thread.sleep(2000);
    }

    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        CompleteBuildPerformDemo demo = new CompleteBuildPerformDemo();

        try {
            demo.setUp();
            demo.demonstrateDirectPerform();
            demo.demonstrateBuildMethod();
            demo.demonstrateReusableActions();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.tearDown();
        }
    }
}
```

## Practical Examples

Let's explore real-world scenarios where the Actions class is essential.

### Example 1: Hover Menu Navigation

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class HoverMenuNavigation {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://www.amazon.com");
            driver.manage().window().maximize();

            // Hover over "Account & Lists"
            WebElement accountMenu = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.id("nav-link-accountList")
                )
            );

            System.out.println("Hovering over Account menu...");
            actions.moveToElement(accountMenu).perform();

            Thread.sleep(1000);

            // Click on "Your Orders" from the dropdown
            WebElement ordersLink = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.xpath("//span[text()='Your Orders']")
                )
            );

            System.out.println("Clicking on Your Orders...");
            ordersLink.click();

            Thread.sleep(3000);

            System.out.println("Current URL: " + driver.getCurrentUrl());
            System.out.println("Navigation successful!");

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Example 2: Multi-Level Dropdown Menu

```java
public class MultiLevelDropdown {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://example.com/multilevel-menu");
            driver.manage().window().maximize();

            // Level 1: Main menu
            WebElement mainMenu = wait.until(
                ExpectedConditions.presenceOfElementLocated(
                    By.xpath("//a[text()='Products']")
                )
            );

            System.out.println("Hovering over main menu...");
            actions.moveToElement(mainMenu).perform();
            Thread.sleep(500);

            // Level 2: Submenu
            WebElement subMenu = wait.until(
                ExpectedConditions.presenceOfElementLocated(
                    By.xpath("//a[text()='Electronics']")
                )
            );

            System.out.println("Hovering over submenu...");
            actions.moveToElement(subMenu).perform();
            Thread.sleep(500);

            // Level 3: Nested submenu
            WebElement nestedItem = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.xpath("//a[text()='Laptops']")
                )
            );

            System.out.println("Clicking on nested item...");
            actions.moveToElement(nestedItem).click().perform();

            Thread.sleep(3000);
            System.out.println("Multi-level navigation completed!");

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Example 3: Context Menu Handling

```java
public class ContextMenuHandling {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://swisnl.github.io/jQuery-contextMenu/demo.html");
            driver.manage().window().maximize();

            // Find the context menu trigger area
            WebElement contextArea = wait.until(
                ExpectedConditions.presenceOfElementLocated(
                    By.xpath("//span[contains(@class, 'context-menu-one')]")
                )
            );

            System.out.println("Right-clicking on element...");
            actions.contextClick(contextArea).perform();

            Thread.sleep(1000);

            // Interact with context menu items
            System.out.println("Selecting Edit option...");
            WebElement editOption = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.xpath("//span[text()='Edit']")
                )
            );
            editOption.click();

            Thread.sleep(1000);

            // Handle the alert
            String alertText = driver.switchTo().alert().getText();
            System.out.println("Alert text: " + alertText);
            driver.switchTo().alert().accept();

            System.out.println("Context menu interaction completed!");

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Example 4: Slider Interaction

```java
public class SliderInteraction {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://jqueryui.com/slider/");
            driver.manage().window().maximize();

            // Switch to iframe containing the slider
            driver.switchTo().frame(driver.findElement(By.className("demo-frame")));

            WebElement slider = driver.findElement(
                By.xpath("//span[@class='ui-slider-handle']")
            );

            int initialX = slider.getLocation().getX();
            System.out.println("Initial slider position: " + initialX);

            // Method 1: Drag by specific offset
            System.out.println("\nMethod 1: Drag by offset");
            actions.dragAndDropBy(slider, 50, 0).perform();
            Thread.sleep(1000);

            int afterDragX = slider.getLocation().getX();
            System.out.println("After drag position: " + afterDragX);

            // Method 2: Click and use arrow keys
            System.out.println("\nMethod 2: Using arrow keys");
            actions.click(slider).perform();

            for (int i = 0; i < 10; i++) {
                actions.sendKeys(Keys.ARROW_RIGHT).perform();
                Thread.sleep(100);
            }

            int afterArrowsX = slider.getLocation().getX();
            System.out.println("After arrow keys position: " + afterArrowsX);

            // Method 3: Move to specific position
            System.out.println("\nMethod 3: Move to specific position");
            actions.clickAndHold(slider)
                   .moveByOffset(-100, 0)
                   .release()
                   .perform();

            Thread.sleep(1000);
            int finalX = slider.getLocation().getX();
            System.out.println("Final position: " + finalX);

            System.out.println("\nSlider interaction completed!");

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Example 5: Drag and Drop with Verification

```java
public class DragDropWithVerification {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://jqueryui.com/droppable/");
            driver.manage().window().maximize();

            // Switch to iframe
            driver.switchTo().frame(0);

            WebElement draggable = driver.findElement(By.id("draggable"));
            WebElement droppable = driver.findElement(By.id("droppable"));

            // Get initial states
            String initialDropText = droppable.getText();
            String initialDropColor = droppable.getCssValue("background-color");

            System.out.println("Before drag:");
            System.out.println("  Drop zone text: " + initialDropText);
            System.out.println("  Drop zone color: " + initialDropColor);

            // Perform drag and drop
            System.out.println("\nPerforming drag and drop...");
            actions.dragAndDrop(draggable, droppable).perform();

            Thread.sleep(1000);

            // Verify the drop
            String afterDropText = droppable.getText();
            String afterDropColor = droppable.getCssValue("background-color");

            System.out.println("\nAfter drag:");
            System.out.println("  Drop zone text: " + afterDropText);
            System.out.println("  Drop zone color: " + afterDropColor);

            // Validation
            if (!afterDropText.equals(initialDropText)) {
                System.out.println("\n✓ Drag and drop successful!");
                System.out.println("  Text changed from '" + initialDropText +
                                 "' to '" + afterDropText + "'");
            } else {
                System.out.println("\n✗ Drag and drop may have failed!");
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Example 6: Complex Form with Keyboard Shortcuts

```java
public class FormWithKeyboardShortcuts {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://www.google.com");
            driver.manage().window().maximize();

            WebElement searchBox = driver.findElement(By.name("q"));

            // Scenario: User wants to search multiple times by modifying query

            // First search
            System.out.println("First search...");
            searchBox.sendKeys("Selenium WebDriver");
            Thread.sleep(1000);

            // Select last word and replace
            System.out.println("Selecting and replacing last word...");
            actions.keyDown(Keys.CONTROL)
                   .keyDown(Keys.SHIFT)
                   .sendKeys(Keys.ARROW_LEFT)
                   .keyUp(Keys.SHIFT)
                   .keyUp(Keys.CONTROL)
                   .sendKeys("Actions")
                   .perform();

            Thread.sleep(1000);

            // Select all and copy
            System.out.println("Copying search query...");
            actions.keyDown(Keys.CONTROL)
                   .sendKeys("a")
                   .keyUp(Keys.CONTROL)
                   .perform();

            Thread.sleep(500);

            actions.keyDown(Keys.CONTROL)
                   .sendKeys("c")
                   .keyUp(Keys.CONTROL)
                   .perform();

            System.out.println("Query copied to clipboard");

            // Search
            actions.sendKeys(Keys.ENTER).perform();
            Thread.sleep(3000);

            // Go back and paste modified query
            driver.navigate().back();
            Thread.sleep(1000);

            searchBox = driver.findElement(By.name("q"));
            searchBox.clear();

            System.out.println("Pasting modified query...");
            actions.click(searchBox)
                   .keyDown(Keys.CONTROL)
                   .sendKeys("v")
                   .keyUp(Keys.CONTROL)
                   .sendKeys(" Tutorial")
                   .sendKeys(Keys.ENTER)
                   .perform();

            Thread.sleep(3000);
            System.out.println("Form interaction with shortcuts completed!");

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

## Common Use Cases and Scenarios

### 1. Hover Tooltips

```java
public class HoverTooltips {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
            driver.get("https://example.com/tooltips");
            driver.manage().window().maximize();

            WebElement element = driver.findElement(By.id("tooltip-trigger"));

            // Hover to show tooltip
            actions.moveToElement(element).perform();
            Thread.sleep(500);

            // Wait for tooltip to appear
            WebElement tooltip = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                    By.className("tooltip-content")
                )
            );

            String tooltipText = tooltip.getText();
            System.out.println("Tooltip text: " + tooltipText);

            // Verify tooltip
            if (tooltipText.contains("Expected text")) {
                System.out.println("✓ Tooltip verified");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### 2. File Upload with Drag and Drop

```java
public class FileUploadDragDrop {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://example.com/upload");
            driver.manage().window().maximize();

            WebElement dropZone = driver.findElement(By.id("drop-zone"));

            // Note: Actual file drag-drop requires native system interaction
            // This example shows the action sequence

            // Alternative: Use sendKeys for file input
            WebElement fileInput = driver.findElement(By.xpath("//input[@type='file']"));

            String filePath = "/path/to/file.txt";
            fileInput.sendKeys(filePath);

            System.out.println("File uploaded: " + filePath);

            // Verify upload
            WebElement uploadedFileName = driver.findElement(By.id("file-name"));
            System.out.println("Uploaded file: " + uploadedFileName.getText());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### 3. Resizable Elements

```java
public class ResizableElements {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://jqueryui.com/resizable/");
            driver.manage().window().maximize();

            driver.switchTo().frame(0);

            WebElement resizableBox = driver.findElement(By.id("resizable"));
            WebElement resizeHandle = driver.findElement(
                By.xpath("//div[@id='resizable']//div[contains(@class, 'ui-resizable-se')]")
            );

            // Get initial size
            int initialWidth = resizableBox.getSize().getWidth();
            int initialHeight = resizableBox.getSize().getHeight();

            System.out.println("Initial size: " + initialWidth + "x" + initialHeight);

            // Resize by dragging handle
            actions.clickAndHold(resizeHandle)
                   .moveByOffset(100, 50)
                   .release()
                   .perform();

            Thread.sleep(1000);

            // Get new size
            int newWidth = resizableBox.getSize().getWidth();
            int newHeight = resizableBox.getSize().getHeight();

            System.out.println("New size: " + newWidth + "x" + newHeight);
            System.out.println("Size increased by: " +
                             (newWidth - initialWidth) + "x" +
                             (newHeight - initialHeight));

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### 4. Sortable Lists

```java
public class SortableLists {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://jqueryui.com/sortable/");
            driver.manage().window().maximize();

            driver.switchTo().frame(0);

            // Get list items
            WebElement item1 = driver.findElement(By.xpath("//li[text()='Item 1']"));
            WebElement item3 = driver.findElement(By.xpath("//li[text()='Item 3']"));

            System.out.println("Original order:");
            List<WebElement> items = driver.findElements(By.xpath("//ul[@id='sortable']/li"));
            for (WebElement item : items) {
                System.out.println("  " + item.getText());
            }

            // Drag item 1 to position of item 3
            System.out.println("\nReordering items...");
            actions.clickAndHold(item1)
                   .moveToElement(item3)
                   .release()
                   .perform();

            Thread.sleep(1000);

            System.out.println("\nNew order:");
            items = driver.findElements(By.xpath("//ul[@id='sortable']/li"));
            for (WebElement item : items) {
                System.out.println("  " + item.getText());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### 5. Drawing on Canvas

```java
public class CanvasDrawing {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://example.com/drawing-canvas");
            driver.manage().window().maximize();

            WebElement canvas = driver.findElement(By.id("canvas"));

            // Draw a square
            System.out.println("Drawing on canvas...");

            actions.moveToElement(canvas)
                   .clickAndHold()
                   .moveByOffset(100, 0)    // Right
                   .moveByOffset(0, 100)    // Down
                   .moveByOffset(-100, 0)   // Left
                   .moveByOffset(0, -100)   // Up
                   .release()
                   .perform();

            Thread.sleep(2000);

            // Draw a diagonal line
            actions.moveToElement(canvas)
                   .moveByOffset(-50, -50)
                   .clickAndHold()
                   .moveByOffset(100, 100)
                   .release()
                   .perform();

            Thread.sleep(2000);
            System.out.println("Drawing completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## ⚠️ Common Mistakes to Avoid

### 1. Forgetting to Call perform()
**Problem**: Building an action chain but forgetting to call `.perform()` at the end.

**Why It's Wrong**: The Actions class builds a chain of actions but doesn't execute them until you explicitly call `perform()`. Without it, your mouse operations simply don't happen, leading to confused debugging sessions.

**Correct Approach**: Always end your action chain with `.perform()`.

```java
// ❌ WRONG: No perform() - nothing happens!
Actions actions = new Actions(driver);
actions.moveToElement(element);
actions.click(); // Nothing executed yet!

// ✅ CORRECT: Call perform() to execute actions
Actions actions = new Actions(driver);
actions.moveToElement(element)
       .click()
       .perform(); // Now actions are executed

// ❌ WRONG: Building complex chain without perform()
actions.moveToElement(menuItem)
       .moveToElement(subMenuItem)
       .click(); // Actions never execute!

// ✅ CORRECT: Always finish with perform()
actions.moveToElement(menuItem)
       .moveToElement(subMenuItem)
       .click()
       .perform(); // Chain executes
```

### 2. Moving to Element Without Waiting
**Problem**: Attempting to hover over or click elements before they're fully loaded or clickable.

**Why It's Wrong**: Even if an element exists in the DOM, it might not be ready for interaction. The element could be covered by another element, still animating, or not yet in the viewport. Moving to such elements causes unpredictable failures.

**Correct Approach**: Always wait for elements to be in a clickable state before performing Actions.

```java
// ❌ WRONG: Immediate move without wait
WebElement menu = driver.findElement(By.id("menu"));
actions.moveToElement(menu).perform(); // May fail if menu is loading

// ✅ CORRECT: Wait for element to be clickable
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement menu = wait.until(ExpectedConditions.elementToBeClickable(By.id("menu")));
actions.moveToElement(menu).perform();

// ✅ BETTER: Comprehensive wait and move method
public void hoverOverElement(By locator) {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));

    // Scroll into view if needed
    ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);

    // Wait a moment for scroll animation
    try {
        Thread.sleep(300);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }

    // Now perform hover
    actions.moveToElement(element).perform();
}
```

### 3. Not Handling Hover Menu Timing
**Problem**: Hovering and immediately clicking without allowing time for submenu to appear.

**Why It's Wrong**: Many hover menus have animations or delays before showing submenus. Clicking too quickly results in clicking the parent menu or clicking on nothing, causing test failures.

**Correct Approach**: Add appropriate waits between hover and subsequent actions.

```java
// ❌ WRONG: Immediate click after hover
WebElement mainMenu = driver.findElement(By.id("products"));
WebElement subMenu = driver.findElement(By.id("laptops"));

actions.moveToElement(mainMenu)
       .moveToElement(subMenu)
       .click()
       .perform(); // Submenu might not be visible yet!

// ✅ CORRECT: Wait for submenu to be visible
WebElement mainMenu = driver.findElement(By.id("products"));
actions.moveToElement(mainMenu).perform();

// Wait for submenu to appear
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement subMenu = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("laptops"))
);

actions.moveToElement(subMenu).click().perform();

// ✅ BETTER: Use pause() in action chain (Selenium 4+)
actions.moveToElement(mainMenu)
       .pause(Duration.ofMillis(500)) // Wait for submenu animation
       .moveToElement(subMenu)
       .click()
       .perform();
```

### 4. Using Regular click() Instead of Actions click()
**Problem**: Mixing regular WebElement.click() with Actions class operations in the same chain.

**Why It's Wrong**: When you build an Actions chain, you should use Actions class methods throughout. Using WebElement.click() breaks the chain context and can cause unexpected behavior, especially with hover menus.

**Correct Approach**: Use Actions class click() when working with Actions chains.

```java
// ❌ WRONG: Mixing Actions and WebElement methods
WebElement menu = driver.findElement(By.id("menu"));
actions.moveToElement(menu).perform();
menu.click(); // Breaks the action context!

// ✅ CORRECT: Use Actions click() method
WebElement menu = driver.findElement(By.id("menu"));
actions.moveToElement(menu)
       .click()
       .perform();

// ❌ WRONG: Breaking chain by finding element again
actions.moveToElement(driver.findElement(By.id("menu")))
       .perform();
driver.findElement(By.id("submenu")).click(); // Lost context!

// ✅ CORRECT: Continue the Actions chain
actions.moveToElement(driver.findElement(By.id("menu")))
       .pause(Duration.ofMillis(300))
       .moveToElement(driver.findElement(By.id("submenu")))
       .click()
       .perform();
```

### 5. Not Accounting for Element Offset Issues
**Problem**: Assuming moveToElement() always moves to the exact center of an element.

**Why It's Wrong**: `moveToElement()` moves to the center of the element by default, but sometimes you need to click on specific parts of an element (like the corner of a resizable div or a specific point in a slider). Not using offsets leads to clicking the wrong area.

**Correct Approach**: Use `moveToElement(element, xOffset, yOffset)` when you need precision.

```java
// ❌ WRONG: Trying to click top-right corner but clicking center
WebElement closeButton = driver.findElement(By.className("modal"));
actions.moveToElement(closeButton).click().perform(); // Clicks center, not close button

// ✅ CORRECT: Use offset to click specific location
WebElement modal = driver.findElement(By.className("modal"));
// Calculate offset to top-right corner
int width = modal.getSize().getWidth();
int height = modal.getSize().getHeight();

actions.moveToElement(modal, width/2 - 10, -height/2 + 10)
       .click()
       .perform(); // Clicks near top-right corner

// ✅ ALTERNATIVE: Find the actual close button element
WebElement closeButton = driver.findElement(By.cssSelector(".modal .close-btn"));
actions.moveToElement(closeButton).click().perform();
```

### 6. Not Releasing Mouse After Drag and Drop
**Problem**: Using `clickAndHold()` but forgetting to release the mouse button.

**Why It's Wrong**: If you use `clickAndHold()` without `release()`, the mouse button stays pressed even after the action chain completes. This can cause subsequent interactions to behave unexpectedly.

**Correct Approach**: Always pair `clickAndHold()` with `release()`.

```java
// ❌ WRONG: Click and hold without release
WebElement source = driver.findElement(By.id("draggable"));
actions.clickAndHold(source)
       .moveToElement(target)
       .perform(); // Mouse still held down!

// ✅ CORRECT: Always release after hold
WebElement source = driver.findElement(By.id("draggable"));
WebElement target = driver.findElement(By.id("droppable"));

actions.clickAndHold(source)
       .moveToElement(target)
       .release()
       .perform();

// ✅ ALTERNATIVE: Use dragAndDrop() shortcut
actions.dragAndDrop(source, target).perform();

// ✅ BEST PRACTICE: Add pause for visual stability
actions.clickAndHold(source)
       .pause(Duration.ofMillis(300))
       .moveToElement(target)
       .pause(Duration.ofMillis(300))
       .release()
       .perform();
```

---

## Best Practices

### 1. Always Use Explicit Waits

```java
// Bad Practice
actions.moveToElement(element).perform();
Thread.sleep(1000); // Unreliable

// Good Practice
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions.elementToBeClickable(By.id("menu")));
actions.moveToElement(element).perform();
```

### 2. Handle Stale Elements

```java
public class StaleElementHandling {
    public static void performActionWithRetry(Actions actions, WebDriver driver,
                                            By locator, int maxRetries) {
        int attempts = 0;
        while (attempts < maxRetries) {
            try {
                WebElement element = driver.findElement(locator);
                actions.moveToElement(element).click().perform();
                break;
            } catch (StaleElementReferenceException e) {
                attempts++;
                System.out.println("Stale element, retrying... Attempt " + attempts);
                if (attempts == maxRetries) {
                    throw e;
                }
            }
        }
    }
}
```

### 3. Use Meaningful Pauses

```java
// Use pause() method instead of Thread.sleep()
actions.moveToElement(menu)
       .pause(Duration.ofMillis(500))
       .click(submenu)
       .perform();
```

### 4. Chain Actions Efficiently

```java
// Bad Practice - Multiple perform() calls
actions.moveToElement(element1).perform();
actions.click().perform();
actions.moveToElement(element2).perform();
actions.click().perform();

// Good Practice - Single chain
actions.moveToElement(element1)
       .click()
       .moveToElement(element2)
       .click()
       .perform();
```

### 5. Create Reusable Action Methods

```java
public class ActionUtils {
    private Actions actions;
    private WebDriver driver;

    public ActionUtils(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    public void hoverAndClick(WebElement hoverElement, WebElement clickElement) {
        actions.moveToElement(hoverElement)
               .pause(Duration.ofMillis(500))
               .moveToElement(clickElement)
               .click()
               .perform();
    }

    public void doubleClickElement(WebElement element) {
        actions.moveToElement(element)
               .doubleClick()
               .perform();
    }

    public void rightClickAndSelect(WebElement element, String menuOption) {
        actions.contextClick(element).perform();
        WebElement option = driver.findElement(By.xpath("//span[text()='" + menuOption + "']"));
        option.click();
    }
}
```

### 6. Verify Actions Success

```java
public class ActionVerification {
    public static boolean verifyHoverEffect(WebDriver driver, WebElement element,
                                          String expectedClass) {
        Actions actions = new Actions(driver);
        actions.moveToElement(element).perform();

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String actualClass = element.getAttribute("class");
        return actualClass.contains(expectedClass);
    }
}
```

### 7. Handle Multiple Windows/Tabs

```java
public class MultiWindowActions {
    public static void performActionInNewTab(WebDriver driver, Actions actions,
                                            WebElement element) {
        String mainWindow = driver.getWindowHandle();

        // Open link in new tab using Ctrl+Click
        actions.keyDown(Keys.CONTROL)
               .click(element)
               .keyUp(Keys.CONTROL)
               .perform();

        // Switch to new tab
        Set<String> windows = driver.getWindowHandles();
        for (String window : windows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                break;
            }
        }

        // Perform actions in new tab
        // ...

        // Close and switch back
        driver.close();
        driver.switchTo().window(mainWindow);
    }
}
```

### 8. Use Try-Catch for Robust Code

```java
public class RobustActions {
    public static void safePerformAction(Actions actions, WebElement element) {
        try {
            actions.moveToElement(element).click().perform();
            System.out.println("Action performed successfully");
        } catch (ElementNotInteractableException e) {
            System.err.println("Element not interactable: " + e.getMessage());
        } catch (StaleElementReferenceException e) {
            System.err.println("Stale element: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

### 9. Optimize for Different Browsers

```java
public class BrowserSpecificActions {
    public static void performCopyPaste(WebDriver driver, Actions actions,
                                       WebElement element, String text) {
        // Detect OS for correct modifier key
        String os = System.getProperty("os.name").toLowerCase();
        Keys modifier = os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;

        element.sendKeys(text);

        // Select all and copy
        actions.keyDown(modifier)
               .sendKeys("a")
               .keyUp(modifier)
               .keyDown(modifier)
               .sendKeys("c")
               .keyUp(modifier)
               .perform();
    }
}
```

### 10. Log Actions for Debugging

```java
public class LoggedActions {
    private Actions actions;

    public LoggedActions(WebDriver driver) {
        this.actions = new Actions(driver);
    }

    public void moveToElementWithLog(WebElement element, String elementName) {
        System.out.println("Moving to element: " + elementName);
        try {
            actions.moveToElement(element).perform();
            System.out.println("✓ Successfully moved to: " + elementName);
        } catch (Exception e) {
            System.err.println("✗ Failed to move to: " + elementName);
            throw e;
        }
    }

    public void clickWithLog(WebElement element, String elementName) {
        System.out.println("Clicking on: " + elementName);
        try {
            actions.click(element).perform();
            System.out.println("✓ Successfully clicked: " + elementName);
        } catch (Exception e) {
            System.err.println("✗ Failed to click: " + elementName);
            throw e;
        }
    }
}
```

## Troubleshooting Common Issues

### Issue 1: Element Not Interactable

**Problem:**
```java
org.openqa.selenium.ElementNotInteractableException: element not interactable
```

**Solutions:**

```java
// Solution 1: Wait for element to be clickable
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions.elementToBeClickable(By.id("button")));
actions.click(element).perform();

// Solution 2: Scroll element into view
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].scrollIntoView(true);", element);
Thread.sleep(500);
actions.click(element).perform();

// Solution 3: Check for overlays
wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("overlay")));
actions.click(element).perform();
```

### Issue 2: Hover Not Working

**Problem:** Hover menu doesn't appear or disappears too quickly.

**Solutions:**

```java
// Solution 1: Add pause between actions
actions.moveToElement(menu)
       .pause(Duration.ofMillis(500))
       .moveToElement(submenu)
       .click()
       .perform();

// Solution 2: Move to element multiple times
actions.moveToElement(menu).perform();
Thread.sleep(300);
actions.moveToElement(submenu).perform();
Thread.sleep(300);
submenu.click();

// Solution 3: Use JavaScript to show menu
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("arguments[0].style.display='block';", submenu);
actions.click(submenu).perform();
```

### Issue 3: Actions Not Performing

**Problem:** Actions build but don't execute.

**Solutions:**

```java
// Problem: Forgot to call perform()
actions.moveToElement(element).click(); // Won't work!

// Solution: Always call perform()
actions.moveToElement(element).click().perform(); // Works!

// Or use build() then perform()
Action action = actions.moveToElement(element).click().build();
action.perform();
```

### Issue 4: Drag and Drop Not Working

**Problem:** Drag and drop doesn't move the element.

**Solutions:**

```java
// Solution 1: Use dragAndDrop method
actions.dragAndDrop(source, target).perform();

// Solution 2: Use clickAndHold with explicit movements
actions.clickAndHold(source)
       .pause(Duration.ofMillis(500))
       .moveToElement(target)
       .pause(Duration.ofMillis(500))
       .release()
       .perform();

// Solution 3: Move by offset
actions.clickAndHold(source)
       .moveByOffset(xOffset, yOffset)
       .release()
       .perform();

// Solution 4: Use JavaScript for HTML5 drag-drop
JavascriptExecutor js = (JavascriptExecutor) driver;
String script = "function createEvent(typeOfEvent) {\n" +
                "    var event = document.createEvent('CustomEvent');\n" +
                "    event.initCustomEvent(typeOfEvent, true, true, null);\n" +
                "    event.dataTransfer = { data: {}, setData: function(key, value) { this.data[key] = value; }, getData: function(key) { return this.data[key]; } };\n" +
                "    return event;\n" +
                "}\n" +
                "function dispatchEvent(element, event, transferData) {\n" +
                "    if (transferData !== undefined) { event.dataTransfer = transferData; }\n" +
                "    element.dispatchEvent(event);\n" +
                "}\n" +
                "var source = arguments[0];\n" +
                "var target = arguments[1];\n" +
                "var dragStartEvent = createEvent('dragstart');\n" +
                "dispatchEvent(source, dragStartEvent);\n" +
                "var dropEvent = createEvent('drop');\n" +
                "dispatchEvent(target, dropEvent, dragStartEvent.dataTransfer);\n" +
                "var dragEndEvent = createEvent('dragend');\n" +
                "dispatchEvent(source, dragEndEvent);";
js.executeScript(script, source, target);
```

### Issue 5: Keyboard Shortcuts Not Working

**Problem:** Ctrl+C, Ctrl+V, etc. don't work as expected.

**Solutions:**

```java
// Solution 1: Make sure to use keyUp
actions.keyDown(Keys.CONTROL)
       .sendKeys("c")
       .keyUp(Keys.CONTROL)  // Must release!
       .perform();

// Solution 2: Use chord for single command
element.sendKeys(Keys.chord(Keys.CONTROL, "c"));

// Solution 3: Check OS and use appropriate key
String os = System.getProperty("os.name").toLowerCase();
Keys modifier = os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;
actions.keyDown(modifier)
       .sendKeys("c")
       .keyUp(modifier)
       .perform();

// Solution 4: Focus on element first
actions.click(element)
       .keyDown(Keys.CONTROL)
       .sendKeys("a")
       .keyUp(Keys.CONTROL)
       .perform();
```

### Issue 6: Stale Element Reference

**Problem:**
```java
org.openqa.selenium.StaleElementReferenceException: stale element reference
```

**Solutions:**

```java
// Solution 1: Re-find element before action
WebElement element = driver.findElement(By.id("button"));
actions.click(element).perform(); // May fail

// Better:
actions.click(driver.findElement(By.id("button"))).perform();

// Solution 2: Retry mechanism
public void performActionWithRetry(By locator, int maxAttempts) {
    for (int i = 0; i < maxAttempts; i++) {
        try {
            WebElement element = driver.findElement(locator);
            actions.click(element).perform();
            break;
        } catch (StaleElementReferenceException e) {
            if (i == maxAttempts - 1) throw e;
        }
    }
}

// Solution 3: Wait for element to be stable
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.stalenessOf(oldElement));
WebElement newElement = driver.findElement(locator);
actions.click(newElement).perform();
```

### Issue 7: Context Menu Not Appearing

**Problem:** Right-click doesn't show context menu.

**Solutions:**

```java
// Solution 1: Add wait after context click
actions.contextClick(element).perform();
Thread.sleep(500);

// Solution 2: Verify element supports context menu
WebElement element = driver.findElement(By.id("target"));
String contextMenuAttr = element.getAttribute("oncontextmenu");
if (contextMenuAttr != null && !contextMenuAttr.contains("return false")) {
    actions.contextClick(element).perform();
}

// Solution 3: Use JavaScript if native right-click blocked
JavascriptExecutor js = (JavascriptExecutor) driver;
js.executeScript("var event = new MouseEvent('contextmenu', {" +
                 "'bubbles': true, 'cancelable': false});" +
                 "arguments[0].dispatchEvent(event);", element);
```

### Issue 8: Actions Too Fast

**Problem:** Actions execute too quickly, causing failures.

**Solutions:**

```java
// Solution 1: Use pause() method
actions.moveToElement(element1)
       .pause(Duration.ofMillis(500))
       .click()
       .pause(Duration.ofMillis(500))
       .moveToElement(element2)
       .click()
       .perform();

// Solution 2: Break into multiple perform() calls
actions.moveToElement(element1).perform();
Thread.sleep(500);
actions.click().perform();
Thread.sleep(500);

// Solution 3: Use explicit waits
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
actions.moveToElement(element1).click().perform();
wait.until(ExpectedConditions.visibilityOf(element2));
actions.moveToElement(element2).click().perform();
```

### Issue 9: MoveByOffset Coordinates Wrong

**Problem:** Mouse moves to wrong position with moveByOffset.

**Solutions:**

```java
// Solution 1: Reset to known position first
actions.moveToElement(referenceElement)  // Move to reference point
       .moveByOffset(50, 50)             // Then use offset
       .click()
       .perform();

// Solution 2: Use element center as reference
actions.moveToElement(element)           // Moves to center
       .moveByOffset(10, 10)             // Offset from center
       .click()
       .perform();

// Solution 3: Calculate absolute coordinates
int elementX = element.getLocation().getX();
int elementY = element.getLocation().getY();
int elementWidth = element.getSize().getWidth();
int elementHeight = element.getSize().getHeight();
int centerX = elementX + (elementWidth / 2);
int centerY = elementY + (elementHeight / 2);

// Then use these for precise movements
```

### Issue 10: Actions Work in Debug but Fail in Normal Run

**Problem:** Actions succeed when stepping through debugger but fail in normal execution.

**Solutions:**

```java
// Solution 1: Add strategic waits
actions.moveToElement(element).perform();
Thread.sleep(300); // Small wait for UI to stabilize

// Solution 2: Wait for element state changes
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.attributeContains(element, "class", "active"));

// Solution 3: Verify element is ready
wait.until(driver -> {
    try {
        actions.moveToElement(element).perform();
        return true;
    } catch (Exception e) {
        return false;
    }
});

// Solution 4: Use implicit waits
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
```

## Practice Exercises

### Exercise 1: Basic Hover Menu Navigation

**Objective:** Navigate through a multi-level hover menu and click on a submenu item.

**Requirements:**
1. Navigate to Amazon.com
2. Hover over "Account & Lists"
3. Click on "Your Orders"
4. Verify the page title contains "Your Orders"

**Starter Code:**

```java
public class Exercise1_HoverMenu {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            // Your code here

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 2: Context Menu Interaction

**Objective:** Right-click on an element and select an option from the context menu.

**Requirements:**
1. Navigate to https://demo.guru99.com/test/simple_context_menu.html
2. Right-click on the "right click me" span
3. Click on the "Copy" option
4. Handle the alert that appears

**Starter Code:**

```java
public class Exercise2_ContextMenu {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://demo.guru99.com/test/simple_context_menu.html");

            // Your code here

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 3: Drag and Drop

**Objective:** Perform drag and drop operation and verify the result.

**Requirements:**
1. Navigate to https://jqueryui.com/droppable/
2. Switch to the iframe
3. Drag the "Draggable" element to the "Droppable" element
4. Verify the text changes from "Drop here" to "Dropped!"

**Starter Code:**

```java
public class Exercise3_DragAndDrop {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://jqueryui.com/droppable/");

            // Your code here

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 4: Keyboard Shortcuts

**Objective:** Use keyboard shortcuts to manipulate text in a search box.

**Requirements:**
1. Navigate to Google.com
2. Type "Selenium WebDriver Actions" in the search box
3. Use Ctrl+A to select all text
4. Use Ctrl+C to copy the text
5. Clear the search box
6. Use Ctrl+V to paste the text back
7. Verify the text is pasted correctly

**Starter Code:**

```java
public class Exercise4_KeyboardShortcuts {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://www.google.com");

            // Your code here

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 5: Slider Control

**Objective:** Control a slider using both drag and keyboard methods.

**Requirements:**
1. Navigate to https://jqueryui.com/slider/
2. Switch to the iframe
3. Move the slider to approximately 50% using drag
4. Use arrow keys to fine-tune the position
5. Print the slider position before and after

**Starter Code:**

```java
public class Exercise5_SliderControl {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            driver.get("https://jqueryui.com/slider/");

            // Your code here

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 6: Complex Action Chain

**Objective:** Create a complex action chain combining mouse and keyboard operations.

**Requirements:**
1. Navigate to a form page (create a simple HTML file or use online form)
2. Fill out the form using only Actions class:
   - Click on first field and type name
   - Use Tab key to move to next field
   - Type email
   - Use Tab to move to next field
   - Type phone number
   - Use Ctrl+A to select all in one field
   - Use Ctrl+C to copy
   - Tab to another field
   - Use Ctrl+V to paste
3. Submit the form using Enter key

**Starter Code:**

```java
public class Exercise6_ComplexActionChain {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        try {
            // Navigate to form page

            // Your code here

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

## Interview Questions

### Theoretical Questions

**1. What is the Actions class in Selenium? Why is it needed?**

**Answer:** The Actions class is a user-facing API in Selenium WebDriver that provides methods to simulate complex user interactions that cannot be performed using standard WebDriver methods. It's needed for:
- Mouse operations (hover, right-click, double-click, drag-drop)
- Keyboard operations (shortcuts, modifier keys)
- Combining multiple actions in sequence
- Advanced user gestures that mimic real user behavior

**2. Explain the difference between build() and perform() methods.**

**Answer:**
- **perform()**: Builds the action sequence and executes it immediately. Most commonly used for one-time actions.
- **build()**: Only builds the action sequence and returns an Action object without executing. Used when you want to store and reuse action sequences. The Action object can be executed later using action.perform().

Example:
```java
// perform() - builds and executes
actions.click(element).perform();

// build() - only builds
Action action = actions.click(element).build();
action.perform(); // Execute later
```

**3. How do you perform a hover operation in Selenium?**

**Answer:** Use the `moveToElement()` method:
```java
Actions actions = new Actions(driver);
WebElement element = driver.findElement(By.id("menu"));
actions.moveToElement(element).perform();
```

**4. What's the difference between element.sendKeys() and actions.sendKeys()?**

**Answer:**
- **element.sendKeys()**: Direct method on WebElement, simpler, only sends text to specific element
- **actions.sendKeys()**: Part of Actions class, provides more control, can be chained with other actions, can use modifier keys

```java
// Standard sendKeys
element.sendKeys("text");

// Actions sendKeys - more flexibility
actions.sendKeys(element, "text").perform();
actions.keyDown(Keys.SHIFT).sendKeys("text").keyUp(Keys.SHIFT).perform();
```

**5. How do you perform a right-click (context click) in Selenium?**

**Answer:** Use the `contextClick()` method:
```java
WebElement element = driver.findElement(By.id("target"));
actions.contextClick(element).perform();
```

**6. What are the different ways to perform drag and drop in Selenium?**

**Answer:** Three main ways:
```java
// Method 1: dragAndDrop()
actions.dragAndDrop(source, target).perform();

// Method 2: clickAndHold() and release()
actions.clickAndHold(source)
       .moveToElement(target)
       .release()
       .perform();

// Method 3: dragAndDropBy() with coordinates
actions.dragAndDropBy(element, xOffset, yOffset).perform();
```

**7. How do you handle keyboard shortcuts like Ctrl+C, Ctrl+V?**

**Answer:**
```java
// Copy
actions.keyDown(Keys.CONTROL)
       .sendKeys("c")
       .keyUp(Keys.CONTROL)
       .perform();

// Paste
actions.keyDown(Keys.CONTROL)
       .sendKeys("v")
       .keyUp(Keys.CONTROL)
       .perform();

// Alternative using chord
element.sendKeys(Keys.chord(Keys.CONTROL, "c"));
```

**8. What is the purpose of moveByOffset() method?**

**Answer:** `moveByOffset()` moves the mouse from its current position by a specified offset. It's useful for:
- Fine-tuning mouse position
- Drawing operations
- Clicking at specific coordinates
- Moving relative to current position

```java
actions.moveByOffset(50, 100).click().perform(); // Move 50 right, 100 down
```

**9. How do you chain multiple actions together?**

**Answer:** Use method chaining and call perform() at the end:
```java
actions.moveToElement(element1)
       .click()
       .keyDown(Keys.SHIFT)
       .click(element2)
       .keyUp(Keys.SHIFT)
       .doubleClick(element3)
       .perform();
```

**10. What exceptions can occur when using Actions class and how do you handle them?**

**Answer:** Common exceptions:
- **ElementNotInteractableException**: Element not visible/enabled
- **StaleElementReferenceException**: Element no longer in DOM
- **MoveTargetOutOfBoundsException**: Target position outside viewport

```java
try {
    actions.moveToElement(element).click().perform();
} catch (ElementNotInteractableException e) {
    // Wait for element or scroll into view
    js.executeScript("arguments[0].scrollIntoView(true);", element);
    actions.click(element).perform();
} catch (StaleElementReferenceException e) {
    // Re-find element
    element = driver.findElement(locator);
    actions.click(element).perform();
}
```

### Practical/Coding Questions

**11. Write code to hover over a menu, wait for submenu, and click on a submenu item.**

**Answer:**
```java
public void hoverAndClickSubmenu() {
    WebDriver driver = new ChromeDriver();
    Actions actions = new Actions(driver);
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

    try {
        driver.get("https://example.com");

        // Hover over main menu
        WebElement mainMenu = driver.findElement(By.id("main-menu"));
        actions.moveToElement(mainMenu).perform();

        // Wait for submenu to appear
        WebElement submenu = wait.until(
            ExpectedConditions.visibilityOfElementLocated(
                By.id("submenu-item")
            )
        );

        // Click submenu
        actions.moveToElement(submenu).click().perform();

    } finally {
        driver.quit();
    }
}
```

**12. How would you implement a reusable method for drag and drop with verification?**

**Answer:**
```java
public boolean dragAndDropWithVerification(WebDriver driver,
                                          WebElement source,
                                          WebElement target,
                                          String expectedText) {
    Actions actions = new Actions(driver);

    // Get initial state
    String initialText = target.getText();

    // Perform drag and drop
    actions.dragAndDrop(source, target).perform();

    // Wait for change
    try {
        Thread.sleep(500);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }

    // Verify
    String finalText = target.getText();
    boolean success = finalText.equals(expectedText) &&
                     !finalText.equals(initialText);

    System.out.println("Drag and drop " +
                      (success ? "successful" : "failed"));
    return success;
}
```

**13. Write code to select multiple items using Ctrl+Click.**

**Answer:**
```java
public void selectMultipleItems() {
    WebDriver driver = new ChromeDriver();
    Actions actions = new Actions(driver);

    try {
        driver.get("https://example.com/multi-select");

        WebElement item1 = driver.findElement(By.id("item1"));
        WebElement item2 = driver.findElement(By.id("item2"));
        WebElement item3 = driver.findElement(By.id("item3"));

        // Click first item
        item1.click();

        // Hold Ctrl and click additional items
        actions.keyDown(Keys.CONTROL)
               .click(item2)
               .click(item3)
               .keyUp(Keys.CONTROL)
               .perform();

        System.out.println("Multiple items selected");

    } finally {
        driver.quit();
    }
}
```

**14. How would you implement a method to handle both Mac and Windows keyboard shortcuts?**

**Answer:**
```java
public void performCopy(WebDriver driver, WebElement element) {
    Actions actions = new Actions(driver);

    // Detect operating system
    String os = System.getProperty("os.name").toLowerCase();
    Keys modifier = os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;

    // Select all
    actions.keyDown(modifier)
           .sendKeys("a")
           .keyUp(modifier)
           .perform();

    // Copy
    actions.keyDown(modifier)
           .sendKeys("c")
           .keyUp(modifier)
           .perform();

    System.out.println("Text copied using " +
                      (modifier == Keys.COMMAND ? "Command" : "Ctrl") + "+C");
}

public void performPaste(WebDriver driver, WebElement element) {
    Actions actions = new Actions(driver);
    String os = System.getProperty("os.name").toLowerCase();
    Keys modifier = os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;

    actions.click(element)
           .keyDown(modifier)
           .sendKeys("v")
           .keyUp(modifier)
           .perform();
}
```

**15. Create an Actions utility class with commonly used methods.**

**Answer:**
```java
public class ActionsUtility {
    private WebDriver driver;
    private Actions actions;
    private WebDriverWait wait;

    public ActionsUtility(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void hoverAndClick(WebElement hoverElement, WebElement clickElement) {
        actions.moveToElement(hoverElement)
               .pause(Duration.ofMillis(500))
               .moveToElement(clickElement)
               .click()
               .perform();
    }

    public void doubleClick(WebElement element) {
        wait.until(ExpectedConditions.elementToBeClickable(element));
        actions.doubleClick(element).perform();
    }

    public void rightClickAndSelect(WebElement element, String option) {
        actions.contextClick(element).perform();
        WebElement menuOption = wait.until(
            ExpectedConditions.elementToBeClickable(
                By.xpath("//span[text()='" + option + "']")
            )
        );
        menuOption.click();
    }

    public void dragAndDrop(WebElement source, WebElement target) {
        actions.clickAndHold(source)
               .pause(Duration.ofMillis(300))
               .moveToElement(target)
               .pause(Duration.ofMillis(300))
               .release()
               .perform();
    }

    public void copyText(WebElement element) {
        Keys modifier = getOSModifier();
        actions.keyDown(modifier)
               .sendKeys("a")
               .sendKeys("c")
               .keyUp(modifier)
               .perform();
    }

    public void pasteText(WebElement element) {
        Keys modifier = getOSModifier();
        actions.click(element)
               .keyDown(modifier)
               .sendKeys("v")
               .keyUp(modifier)
               .perform();
    }

    private Keys getOSModifier() {
        String os = System.getProperty("os.name").toLowerCase();
        return os.contains("mac") ? Keys.COMMAND : Keys.CONTROL;
    }

    public void scrollToElement(WebElement element) {
        actions.moveToElement(element).perform();
    }

    public void selectMultipleItems(List<WebElement> elements) {
        if (elements.isEmpty()) return;

        // Click first item
        elements.get(0).click();

        // Ctrl+Click remaining items
        Keys modifier = Keys.CONTROL;
        actions.keyDown(modifier);

        for (int i = 1; i < elements.size(); i++) {
            actions.click(elements.get(i));
        }

        actions.keyUp(modifier).perform();
    }
}
```

## Key Takeaways

1. **Actions Class Fundamentals**
   - Provides advanced user interaction capabilities
   - Supports mouse and keyboard operations
   - Uses fluent API for method chaining
   - Requires perform() or build() to execute

2. **Mouse Operations**
   - `moveToElement()` for hovering
   - `click()`, `doubleClick()`, `contextClick()` for clicks
   - `clickAndHold()` and `release()` for drag operations
   - `moveByOffset()` for precise positioning
   - `dragAndDrop()` for convenient drag-drop

3. **Keyboard Operations**
   - `sendKeys()` for text input
   - `keyDown()` and `keyUp()` for modifier keys
   - Supports keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)
   - Use Keys enum for special keys
   - Consider OS differences (Ctrl vs Command)

4. **Build vs Perform**
   - `perform()` - builds and executes immediately (most common)
   - `build()` - creates reusable Action object
   - Use build() for action libraries and repeated operations

5. **Best Practices**
   - Always use explicit waits before actions
   - Handle stale elements with retry logic
   - Verify actions completed successfully
   - Use meaningful pauses between actions
   - Create reusable action methods
   - Log actions for debugging

6. **Common Pitfalls**
   - Forgetting to call perform()
   - Not waiting for elements to be ready
   - Incorrect use of moveByOffset() coordinates
   - Not handling exceptions properly
   - Actions executing too fast

7. **Real-World Applications**
   - Hover menu navigation
   - Context menu interactions
   - Drag and drop operations
   - Form filling with Tab navigation
   - Text manipulation with keyboard shortcuts
   - Slider controls
   - Canvas drawing operations

## What's Next

Now that you've mastered the Actions class, you're ready to move on to:

**Day 9: Handling Alerts and Popups**
- Understanding different types of alerts
- Switching between windows and frames
- Handling JavaScript alerts, confirms, and prompts
- Managing browser popups and notifications

**Recommended Practice:**
1. Implement all practice exercises
2. Create a utility class with reusable Actions methods
3. Test Actions on different websites
4. Combine Actions with Page Object Model
5. Handle complex real-world scenarios

**Additional Resources:**
- Selenium Actions API Documentation
- Advanced user interactions tutorials
- Real-world automation scenarios
- Performance optimization techniques

---

## Navigation

- [← Previous: Day 7 - Waits in Selenium](../week1/day07_waits_in_selenium.md)
- [Next: Day 9 - Handling Alerts and Popups →](./day09_alerts_and_popups.md)
- [↑ Back to Week 2 Overview](./README.md)
- [⌂ Course Home](../../README.md)

---

**Remember:** The Actions class is a powerful tool for simulating real user interactions. Practice with different websites and scenarios to become proficient. Focus on creating robust, reusable methods that can be incorporated into your automation framework.

Happy Automating!
