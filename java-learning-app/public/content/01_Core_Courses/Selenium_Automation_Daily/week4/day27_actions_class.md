# Day 27: Actions Class in Selenium

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the Actions class and its purpose
- Perform mouse actions (hover, click, double-click, right-click, drag-and-drop)
- Perform keyboard actions (key combinations, shortcuts)
- Create action chains and composite actions
- Handle complex user interactions
- Use build() and perform() methods effectively
- Implement best practices for Actions class usage

---

## 1. Introduction to Actions Class

### What is Actions Class?

The `Actions` class in Selenium is used to perform complex user interactions that cannot be achieved with simple `click()` or `sendKeys()` methods. It provides advanced mouse and keyboard operations.

### When to Use Actions Class?

Use Actions when you need to:
- Hover over elements (mouse over)
- Perform drag and drop operations
- Right-click (context menu)
- Double-click elements
- Key combinations (Ctrl+C, Ctrl+V)
- Click and hold operations
- Move to specific coordinates

### Package and Import

```java
import org.openqa.selenium.interactions.Actions;
```

### Creating Actions Object

```java
Actions actions = new Actions(driver);
```

---

## 2. Building and Performing Actions

### Two Key Methods

1. **build()** - Compiles all actions into a single action
2. **perform()** - Executes the action(s)

### Syntax Pattern

```java
actions.someAction()
       .anotherAction()
       .build()     // Optional: compile actions
       .perform();  // Required: execute actions
```

### Note on build()

In modern Selenium, `build()` is often optional because `perform()` automatically builds the action if not already built.

```java
// Both are valid

// With build()
actions.moveToElement(element).build().perform();

// Without build() (recommended)
actions.moveToElement(element).perform();
```

---

## 3. Mouse Actions

### 3.1 Move to Element (Hover)

**Purpose:** Move mouse to the center of an element (hover effect).

```java
WebElement element = driver.findElement(By.id("menuItem"));
Actions actions = new Actions(driver);
actions.moveToElement(element).perform();
```

### Complete Hover Example

```java
public class HoverExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/menu");

        Actions actions = new Actions(driver);

        // Hover over main menu
        WebElement mainMenu = driver.findElement(By.id("mainMenu"));
        actions.moveToElement(mainMenu).perform();

        // Wait for submenu to appear
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement submenu = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("submenu"))
        );

        // Click submenu item
        submenu.click();

        driver.quit();
    }
}
```

### 3.2 Click

**Purpose:** Click on an element.

```java
actions.click(element).perform();

// Or click at current mouse position
actions.click().perform();
```

### 3.3 Click and Hold

**Purpose:** Click and hold on an element without releasing.

```java
actions.clickAndHold(element).perform();

// Later release
actions.release(element).perform();
```

### 3.4 Release

**Purpose:** Release the mouse button.

```java
actions.release(element).perform();

// Or release at current position
actions.release().perform();
```

### 3.5 Double Click

**Purpose:** Double-click on an element.

```java
WebElement element = driver.findElement(By.id("file"));
actions.doubleClick(element).perform();
```

### Complete Double Click Example

```java
public class DoubleClickExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/double-click-demo");

        Actions actions = new Actions(driver);

        // Find element to double-click
        WebElement box = driver.findElement(By.id("box"));

        // Perform double-click
        actions.doubleClick(box).perform();

        // Verify result
        String color = box.getCssValue("background-color");
        System.out.println("Color after double-click: " + color);

        driver.quit();
    }
}
```

### 3.6 Context Click (Right Click)

**Purpose:** Right-click on an element to open context menu.

```java
WebElement element = driver.findElement(By.id("contextMenu"));
actions.contextClick(element).perform();
```

### Complete Context Click Example

```java
public class ContextClickExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/context-menu");

        Actions actions = new Actions(driver);

        // Right-click on element
        WebElement element = driver.findElement(By.id("contextMenuArea"));
        actions.contextClick(element).perform();

        // Wait for context menu and click option
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement menuOption = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("copyOption"))
        );
        menuOption.click();

        driver.quit();
    }
}
```

---

## 4. Drag and Drop

### 4.1 dragAndDrop()

**Purpose:** Drag source element and drop on target element.

```java
WebElement source = driver.findElement(By.id("draggable"));
WebElement target = driver.findElement(By.id("droppable"));

Actions actions = new Actions(driver);
actions.dragAndDrop(source, target).perform();
```

### Complete Drag and Drop Example

```java
public class DragAndDropExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/drag-drop");

        Actions actions = new Actions(driver);

        // Find source and target elements
        WebElement source = driver.findElement(By.id("draggable"));
        WebElement target = driver.findElement(By.id("droppable"));

        // Perform drag and drop
        actions.dragAndDrop(source, target).perform();

        // Verify drop
        String text = target.getText();
        System.out.println("Dropped: " + text);

        driver.quit();
    }
}
```

### 4.2 dragAndDropBy()

**Purpose:** Drag element by X and Y offset.

```java
WebElement element = driver.findElement(By.id("slider"));
actions.dragAndDropBy(element, 100, 0).perform();  // Move 100 pixels right
```

### Slider Example

```java
public class SliderExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/slider");

        Actions actions = new Actions(driver);

        // Find slider element
        WebElement slider = driver.findElement(By.id("slider"));

        // Move slider 150 pixels to the right
        actions.dragAndDropBy(slider, 150, 0).perform();

        // Get slider value
        String value = slider.getAttribute("value");
        System.out.println("Slider value: " + value);

        driver.quit();
    }
}
```

### 4.3 Manual Drag and Drop (clickAndHold + moveToElement + release)

```java
WebElement source = driver.findElement(By.id("source"));
WebElement target = driver.findElement(By.id("target"));

Actions actions = new Actions(driver);
actions.clickAndHold(source)
       .moveToElement(target)
       .release()
       .perform();
```

---

## 5. Keyboard Actions

### 5.1 sendKeys()

**Purpose:** Send keyboard input.

```java
// Type in an element
WebElement element = driver.findElement(By.id("input"));
actions.sendKeys(element, "Hello World").perform();

// Type at current focus
actions.sendKeys("text").perform();
```

### 5.2 Key Down

**Purpose:** Press and hold a modifier key (Ctrl, Shift, Alt).

```java
actions.keyDown(Keys.CONTROL).perform();
```

### 5.3 Key Up

**Purpose:** Release a modifier key.

```java
actions.keyUp(Keys.CONTROL).perform();
```

### 5.4 Key Combinations

```java
// Ctrl + A (Select All)
actions.keyDown(Keys.CONTROL)
       .sendKeys("a")
       .keyUp(Keys.CONTROL)
       .perform();

// Ctrl + C (Copy)
actions.keyDown(Keys.CONTROL)
       .sendKeys("c")
       .keyUp(Keys.CONTROL)
       .perform();

// Ctrl + V (Paste)
actions.keyDown(Keys.CONTROL)
       .sendKeys("v")
       .keyUp(Keys.CONTROL)
       .perform();
```

### Complete Copy-Paste Example

```java
public class CopyPasteExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/text-fields");

        Actions actions = new Actions(driver);

        // Find source and destination fields
        WebElement source = driver.findElement(By.id("sourceField"));
        WebElement destination = driver.findElement(By.id("destField"));

        // Click source field
        source.click();

        // Select all text (Ctrl+A)
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();

        // Copy text (Ctrl+C)
        actions.keyDown(Keys.CONTROL)
               .sendKeys("c")
               .keyUp(Keys.CONTROL)
               .perform();

        // Click destination field
        destination.click();

        // Paste text (Ctrl+V)
        actions.keyDown(Keys.CONTROL)
               .sendKeys("v")
               .keyUp(Keys.CONTROL)
               .perform();

        // Verify
        String copiedText = destination.getAttribute("value");
        System.out.println("Copied text: " + copiedText);

        driver.quit();
    }
}
```

### Common Key Combinations

```java
// Select all
actions.keyDown(Keys.CONTROL).sendKeys("a").keyUp(Keys.CONTROL).perform();

// Undo
actions.keyDown(Keys.CONTROL).sendKeys("z").keyUp(Keys.CONTROL).perform();

// Redo
actions.keyDown(Keys.CONTROL).sendKeys("y").keyUp(Keys.CONTROL).perform();

// Save
actions.keyDown(Keys.CONTROL).sendKeys("s").keyUp(Keys.CONTROL).perform();

// Refresh
actions.sendKeys(Keys.F5).perform();

// Enter
actions.sendKeys(Keys.ENTER).perform();

// Tab
actions.sendKeys(Keys.TAB).perform();

// Escape
actions.sendKeys(Keys.ESCAPE).perform();
```

---

## 6. Composite Actions (Action Chains)

You can chain multiple actions together:

```java
actions.moveToElement(menu)
       .click()
       .moveToElement(submenu)
       .click()
       .perform();
```

### Complex Action Chain Example

```java
public class ActionChainExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/complex-menu");

        Actions actions = new Actions(driver);

        // Navigate through nested menu
        WebElement menu = driver.findElement(By.id("menu"));
        WebElement submenu = driver.findElement(By.id("submenu"));
        WebElement menuItem = driver.findElement(By.id("menuItem"));

        // Chain actions
        actions.moveToElement(menu)
               .pause(Duration.ofMillis(500))
               .moveToElement(submenu)
               .pause(Duration.ofMillis(500))
               .moveToElement(menuItem)
               .click()
               .perform();

        driver.quit();
    }
}
```

---

## 7. Moving to Coordinates

### moveByOffset()

**Purpose:** Move mouse by X and Y offset from current position.

```java
actions.moveByOffset(50, 100).perform();  // Move 50px right, 100px down
```

### moveToElement() with Offset

**Purpose:** Move to an element with offset from its center.

```java
WebElement element = driver.findElement(By.id("canvas"));
actions.moveToElement(element, 50, 100).perform();
// Move to element + 50px right, 100px down from center
```

---

## 8. Pause Actions

**Purpose:** Add delay between actions (Selenium 4+).

```java
actions.moveToElement(element)
       .pause(Duration.ofSeconds(2))
       .click()
       .perform();
```

---

## 9. Actions Utility Class

```java
package utils;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

public class ActionsHelper {
    private WebDriver driver;
    private Actions actions;

    public ActionsHelper(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
    }

    /**
     * Hover over an element
     */
    public void hoverOverElement(WebElement element) {
        actions.moveToElement(element).perform();
        System.out.println("Hovered over element");
    }

    /**
     * Double-click an element
     */
    public void doubleClick(WebElement element) {
        actions.doubleClick(element).perform();
        System.out.println("Double-clicked element");
    }

    /**
     * Right-click an element
     */
    public void rightClick(WebElement element) {
        actions.contextClick(element).perform();
        System.out.println("Right-clicked element");
    }

    /**
     * Drag and drop
     */
    public void dragAndDrop(WebElement source, WebElement target) {
        actions.dragAndDrop(source, target).perform();
        System.out.println("Dragged and dropped");
    }

    /**
     * Drag element by offset
     */
    public void dragByOffset(WebElement element, int xOffset, int yOffset) {
        actions.dragAndDropBy(element, xOffset, yOffset).perform();
        System.out.println("Dragged by offset: " + xOffset + ", " + yOffset);
    }

    /**
     * Perform key combination (e.g., Ctrl+A)
     */
    public void performKeyCombo(Keys modifier, String key) {
        actions.keyDown(modifier)
               .sendKeys(key)
               .keyUp(modifier)
               .perform();
        System.out.println("Performed key combo: " + modifier + "+" + key);
    }

    /**
     * Select all text
     */
    public void selectAll() {
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();
        System.out.println("Selected all text");
    }

    /**
     * Copy text
     */
    public void copyText() {
        actions.keyDown(Keys.CONTROL)
               .sendKeys("c")
               .keyUp(Keys.CONTROL)
               .perform();
        System.out.println("Copied text");
    }

    /**
     * Paste text
     */
    public void pasteText() {
        actions.keyDown(Keys.CONTROL)
               .sendKeys("v")
               .keyUp(Keys.CONTROL)
               .perform();
        System.out.println("Pasted text");
    }

    /**
     * Copy from source field to destination field
     */
    public void copyFromSourceToDestination(WebElement source, WebElement destination) {
        source.click();
        selectAll();
        copyText();
        destination.click();
        pasteText();
        System.out.println("Copied from source to destination");
    }

    /**
     * Hover and click
     */
    public void hoverAndClick(WebElement hoverElement, WebElement clickElement) {
        actions.moveToElement(hoverElement)
               .moveToElement(clickElement)
               .click()
               .perform();
        System.out.println("Hovered and clicked");
    }

    /**
     * Click and hold
     */
    public void clickAndHold(WebElement element) {
        actions.clickAndHold(element).perform();
        System.out.println("Clicked and held");
    }

    /**
     * Release mouse
     */
    public void release() {
        actions.release().perform();
        System.out.println("Released mouse");
    }

    /**
     * Scroll to element using Actions
     */
    public void scrollToElement(WebElement element) {
        actions.moveToElement(element).perform();
        System.out.println("Scrolled to element");
    }
}
```

---

## 10. Practical Examples

### Example 1: Multi-level Menu Navigation

```java
public void navigateMenu(WebDriver driver) {
    Actions actions = new Actions(driver);

    // Level 1
    WebElement menu1 = driver.findElement(By.id("menu1"));
    actions.moveToElement(menu1).perform();
    Thread.sleep(500);

    // Level 2
    WebElement menu2 = driver.findElement(By.id("menu2"));
    actions.moveToElement(menu2).perform();
    Thread.sleep(500);

    // Level 3
    WebElement menu3 = driver.findElement(By.id("menu3"));
    actions.moveToElement(menu3).click().perform();
}
```

### Example 2: Selecting Multiple Items with Ctrl

```java
public void selectMultipleItems(WebDriver driver) {
    Actions actions = new Actions(driver);

    // Hold Ctrl
    actions.keyDown(Keys.CONTROL);

    // Click multiple items
    driver.findElement(By.id("item1")).click();
    driver.findElement(By.id("item2")).click();
    driver.findElement(By.id("item3")).click();

    // Release Ctrl
    actions.keyUp(Keys.CONTROL).perform();
}
```

### Example 3: Resizing Element

```java
public void resizeElement(WebDriver driver) {
    Actions actions = new Actions(driver);

    WebElement resizeHandle = driver.findElement(By.id("resizeHandle"));

    // Click and drag to resize
    actions.clickAndHold(resizeHandle)
           .moveByOffset(100, 50)
           .release()
           .perform();
}
```

---

## 11. Best Practices

1. **Always call perform()**
   ```java
   // Won't work - missing perform()
   actions.moveToElement(element);

   // Correct
   actions.moveToElement(element).perform();
   ```

2. **Use waits with dynamic elements**
   ```java
   WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
   WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("menu")));
   actions.moveToElement(element).perform();
   ```

3. **Add pauses for smooth animations**
   ```java
   actions.moveToElement(menu1)
          .pause(Duration.ofMillis(500))
          .moveToElement(menu2)
          .pause(Duration.ofMillis(500))
          .click()
          .perform();
   ```

4. **Handle exceptions**
   ```java
   try {
       actions.dragAndDrop(source, target).perform();
   } catch (Exception e) {
       System.err.println("Drag and drop failed: " + e.getMessage());
   }
   ```

5. **Create reusable methods**
   ```java
   ActionsHelper actionsHelper = new ActionsHelper(driver);
   actionsHelper.hoverOverElement(element);
   ```

---

## 12. Practical Exercises

### Exercise 1: Hover Menu
Create a script that hovers over a menu to reveal submenu and clicks an item.

### Exercise 2: Drag and Drop
Implement drag and drop between two elements.

### Exercise 3: Double Click
Create a script that double-clicks an element and verifies the result.

### Exercise 4: Right Click Menu
Right-click an element, wait for context menu, and select an option.

### Exercise 5: Slider
Move a slider element by a specific pixel amount.

### Exercise 6: Copy-Paste
Copy text from one field to another using Ctrl+C and Ctrl+V.

### Exercise 7: Multiple Selection
Select multiple items while holding Ctrl key.

### Exercise 8: Action Chain
Create a complex chain of 5+ actions.

### Exercise 9: Actions Utility
Implement and test all methods in ActionsHelper class.

### Exercise 10: Canvas Drawing
Use Actions to draw on an HTML canvas element.

---

## 13. Key Takeaways

1. **Actions class** handles complex mouse and keyboard interactions
2. **perform()** is required to execute actions
3. **build()** is optional in modern Selenium
4. **moveToElement()** performs hover action
5. **dragAndDrop()** performs drag and drop
6. **doubleClick()** double-clicks elements
7. **contextClick()** performs right-click
8. **keyDown()/keyUp()** handle modifier keys
9. **Action chains** allow multiple actions in sequence
10. **Always use waits** with dynamic elements

---

## 14. Common Interview Questions

1. What is the Actions class used for?
2. What's the difference between click() and contextClick()?
3. How do you perform drag and drop?
4. How do you perform keyboard shortcuts like Ctrl+C?
5. What's the difference between dragAndDrop() and dragAndDropBy()?
6. Do you need to call build() before perform()?
7. How do you hover over an element?
8. How do you double-click an element?
9. How do you move mouse by coordinates?
10. What's the purpose of keyDown() and keyUp()?

---

## 15. Additional Resources

### Official Documentation
- [Actions Class JavaDoc](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/interactions/Actions.html)
- [Selenium Actions Guide](https://www.selenium.dev/documentation/webdriver/actions_api/)

### Practice Websites
- [The Internet - Drag and Drop](http://the-internet.herokuapp.com/drag_and_drop)
- [The Internet - Hovers](http://the-internet.herokuapp.com/hovers)
- [SeleniumEasy - Drag and Drop](https://demo.seleniumeasy.com/drag-and-drop-demo.html)
- [jQuery UI Demos - Draggable](https://jqueryui.com/draggable/)

---

## Navigation

- **Previous:** [Day 26: Frames & Windows](./day26_frames_windows.md)
- **Next:** [Day 28: JavaScript Executor](./day28_javascript_executor.md)
- **Week 4 Home:** [Week 4 Overview](./README.md)

---

**Happy Learning!** Master the Actions class to handle sophisticated user interactions in your automation tests.
