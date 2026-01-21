
# Day 12: Advanced Mouse Operations in Selenium

## 📋 Learning Objectives
By the end of this lesson, you will be able to:
- Perform advanced mouse operations using [`Actions`](org.openqa.selenium.interactions.Actions) class
- Handle context menus (right-click menus)
- Implement mouse hover chains
- Perform click-and-hold operations
- Handle mouse movements with offsets
- Combine multiple mouse actions
- Debug mouse interaction issues

---

## 📚 Table of Contents
1. [Introduction to Advanced Mouse Operations](#1-introduction-to-advanced-mouse-operations)
2. [Context Menus (Right-Click)](#2-context-menus-right-click)
3. [Mouse Hover Chains](#3-mouse-hover-chains)
4. [Click and Hold Operations](#4-click-and-hold-operations)
5. [Mouse Movements with Offsets](#5-mouse-movements-with-offsets)
6. [Complex Mouse Action Sequences](#6-complex-mouse-action-sequences)
7. [Practical Exercises](#7-practical-exercises)
8. [Common Mistakes](#8-common-mistakes)
9. [Best Practices](#9-best-practices)
10. [Key Takeaways](#10-key-takeaways)

---

## 1. Introduction to Advanced Mouse Operations

### Why Advanced Mouse Operations?
Advanced mouse operations are essential for:
- **Context Menus:** Right-click interactions
- **Nested Menus:** Multi-level hover menus
- **Custom Controls:** Sliders, drawing tools, drag handles
- **Complex Interactions:** Games, design tools, interactive dashboards
- **Precise Positioning:** Pixel-perfect interactions

### Real-World Scenarios
```java
// Scenario 1: Right-click context menu
actions.contextClick(element).perform();

// Scenario 2: Hover chain for nested menu
actions.moveToElement(menu1)
       .moveToElement(menu2)
       .moveToElement(menu3)
       .click()
       .perform();

// Scenario 3: Click and hold for selection
actions.clickAndHold(startElement)
       .moveToElement(endElement)
       .release()
       .perform();
```

---

## 2. Context Menus (Right-Click)

### Basic Context Click

#### Example 1: Simple Right-Click
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class ContextClickExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/context-menu");
            
            // Find element to right-click
            WebElement element = driver.findElement(By.id("contextArea"));
            
            // Create Actions object
            Actions actions = new Actions(driver);
            
            // Perform right-click
            actions.contextClick(element).perform();
            
            System.out.println("✓ Right-click performed");
            
            Thread.sleep(2000);
            
            // Click menu option
            WebElement menuOption = driver.findElement(By.id("option1"));
            menuOption.click();
            
            System.out.println("✓ Menu option selected");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Context Menu with Selection
```java
public class ContextMenuSelectionExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/file-manager");
            
            Actions actions = new Actions(driver);
            
            // Right-click on file
            WebElement file = driver.findElement(By.className("file-item"));
            actions.contextClick(file).perform();
            
            System.out.println("✓ Context menu opened");
            
            Thread.sleep(1000);
            
            // Select "Delete" option
            WebElement deleteOption = driver.findElement(By.xpath("//li[text()='Delete']"));
            deleteOption.click();
            
            System.out.println("✓ Delete option selected");
            
            // Confirm deletion
            WebElement confirmBtn = driver.findElement(By.id("confirmDelete"));
            confirmBtn.click();
            
            System.out.println("✓ Deletion confirmed");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Multiple Context Menu Operations
```java
public class MultipleContextMenuExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/editor");
            
            Actions actions = new Actions(driver);
            
            // Right-click on text area
            WebElement textArea = driver.findElement(By.id("editor"));
            actions.contextClick(textArea).perform();
            
            // Select "Copy"
            driver.findElement(By.xpath("//li[text()='Copy']")).click();
            System.out.println("✓ Copy selected");
            
            Thread.sleep(1000);
            
            // Right-click again
            actions.contextClick(textArea).perform();
            
            // Select "Paste"
            driver.findElement(By.xpath("//li[text()='Paste']")).click();
            System.out.println("✓ Paste selected");
            
            Thread.sleep(1000);
            
            // Right-click once more
            actions.contextClick(textArea).perform();
            
            // Select "Select All"
            driver.findElement(By.xpath("//li[text()='Select All']")).click();
            System.out.println("✓ Select All selected");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 3. Mouse Hover Chains

### Nested Menu Navigation

#### Example 1: Two-Level Menu
```java
public class TwoLevelMenuExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/menu");
            
            Actions actions = new Actions(driver);
            
            // Hover over main menu
            WebElement mainMenu = driver.findElement(By.id("products"));
            actions.moveToElement(mainMenu).perform();
            
            System.out.println("✓ Hovered over main menu");
            Thread.sleep(1000);
            
            // Hover over submenu
            WebElement subMenu = driver.findElement(By.id("electronics"));
            actions.moveToElement(subMenu).click().perform();
            
            System.out.println("✓ Clicked submenu item");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Three-Level Menu
```java
public class ThreeLevelMenuExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/complex-menu");
            
            Actions actions = new Actions(driver);
            
            // Level 1: Main menu
            WebElement level1 = driver.findElement(By.linkText("Products"));
            actions.moveToElement(level1).perform();
            System.out.println("✓ Level 1 menu opened");
            Thread.sleep(500);
            
            // Level 2: Category
            WebElement level2 = driver.findElement(By.linkText("Electronics"));
            actions.moveToElement(level2).perform();
            System.out.println("✓ Level 2 menu opened");
            Thread.sleep(500);
            
            // Level 3: Subcategory
            WebElement level3 = driver.findElement(By.linkText("Laptops"));
            actions.moveToElement(level3).click().perform();
            System.out.println("✓ Level 3 item clicked");
            
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Mega Menu Navigation
```java
public class MegaMenuExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/mega-menu");
            
            Actions actions = new Actions(driver);
            
            // Open mega menu
            WebElement menuTrigger = driver.findElement(By.id("allCategories"));
            actions.moveToElement(menuTrigger).perform();
            
            System.out.println("✓ Mega menu opened");
            Thread.sleep(1000);
            
            // Navigate to specific section
            WebElement section = driver.findElement(By.className("menu-section-electronics"));
            actions.moveToElement(section).perform();
            
            System.out.println("✓ Section highlighted");
            Thread.sleep(500);
            
            // Click specific item
            WebElement item = driver.findElement(By.linkText("Smartphones"));
            actions.moveToElement(item).click().perform();
            
            System.out.println("✓ Item clicked");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 4. Click and Hold Operations

### Selection and Dragging

#### Example 1: Click and Hold for Selection
```java
public class ClickAndHoldSelectionExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/selectable");
            
            Actions actions = new Actions(driver);
            
            // Start selection
            WebElement startItem = driver.findElement(By.id("item1"));
            WebElement endItem = driver.findElement(By.id("item5"));
            
            // Click and hold, move, then release
            actions.clickAndHold(startItem)
                   .moveToElement(endItem)
                   .release()
                   .perform();
            
            System.out.println("✓ Items selected from item1 to item5");
            
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Drawing with Click and Hold
```java
public class DrawingExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/drawing-canvas");
            
            Actions actions = new Actions(driver);
            
            // Get canvas element
            WebElement canvas = driver.findElement(By.id("drawingCanvas"));
            
            // Draw a line
            actions.clickAndHold(canvas)
                   .moveByOffset(100, 0)    // Move right
                   .moveByOffset(0, 100)    // Move down
                   .moveByOffset(-100, 0)   // Move left
                   .moveByOffset(0, -100)   // Move up
                   .release()
                   .perform();
            
            System.out.println("✓ Square drawn on canvas");
            
            Thread.sleep(2000);
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Resizing with Click and Hold
```java
public class ResizeExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/resizable");
            
            Actions actions = new Actions(driver);
            
            // Find resize handle
            WebElement resizeHandle = driver.findElement(By.className("resize-handle"));
            
            // Get initial size
            WebElement resizableBox = driver.findElement(By.id("resizableBox"));
            int initialWidth = resizableBox.getSize().getWidth();
            int initialHeight = resizableBox.getSize().getHeight();
            
            System.out.println("Initial size: " + initialWidth + "x" + initialHeight);
            
            // Resize by dragging handle
            actions.clickAndHold(resizeHandle)
                   .moveByOffset(100, 100)
                   .release()
                   .perform();
            
            Thread.sleep(1000);
            
            // Get new size
            int newWidth = resizableBox.getSize().getWidth();
            int newHeight = resizableBox.getSize().getHeight();
            
            System.out.println("New size: " + newWidth + "x" + newHeight);
            System.out.println("✓ Element resized successfully");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 5. Mouse Movements with Offsets

### Precise Positioning

#### Example 1: Move by Offset
```java
public class MoveByOffsetExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/interactive");
            
            Actions actions = new Actions(driver);
            
            // Move to element first
            WebElement element = driver.findElement(By.id("target"));
            actions.moveToElement(element).perform();
            
            System.out.println("✓ Moved to element");
            Thread.sleep(500);
            
            // Move by offset from current position
            actions.moveByOffset(50, 50).perform();
            System.out.println("✓ Moved 50px right and 50px down");
            Thread.sleep(500);
            
            // Click at current position
            actions.click().perform();
            System.out.println("✓ Clicked at offset position");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Move to Element with Offset
```java
public class MoveToElementWithOffsetExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/map");
            
            Actions actions = new Actions(driver);
            
            // Find map element
            WebElement map = driver.findElement(By.id("map"));
            
            // Move to specific coordinates on map
            // Offset is from center of element
            actions.moveToElement(map, 100, 50).click().perform();
            
            System.out.println("✓ Clicked at coordinates (100, 50) on map");
            
            Thread.sleep(1000);
            
            // Click at different position
            actions.moveToElement(map, -50, -30).click().perform();
            
            System.out.println("✓ Clicked at coordinates (-50, -30) on map");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Circular Mouse Movement
```java
public class CircularMovementExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/canvas");
            
            Actions actions = new Actions(driver);
            
            // Get canvas
            WebElement canvas = driver.findElement(By.id("canvas"));
            
            // Move to center of canvas
            actions.moveToElement(canvas).perform();
            
            // Draw circle using offsets
            int radius = 50;
            int steps = 36;  // 36 steps for smooth circle
            
            actions.clickAndHold();
            
            for (int i = 0; i <= steps; i++) {
                double angle = 2 * Math.PI * i / steps;
                int x = (int) (radius * Math.cos(angle));
                int y = (int) (radius * Math.sin(angle));
                
                actions.moveByOffset(x - (i > 0 ? (int)(radius * Math.cos(2 * Math.PI * (i-1) / steps)) : 0),
                                    y - (i > 0 ? (int)(radius * Math.sin(2 * Math.PI * (i-1) / steps)) : 0));
            }
            
            actions.release().perform();
            
            System.out.println("✓ Circle drawn");
            
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

## 6. Complex Mouse Action Sequences

### Combining Multiple Actions

#### Example 1: Multi-Step Interaction
```java
public class MultiStepInteractionExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/complex-ui");
            
            Actions actions = new Actions(driver);
            
            // Step 1: Hover over menu
            WebElement menu = driver.findElement(By.id("menu"));
            actions.moveToElement(menu).perform();
            Thread.sleep(500);
            
            // Step 2: Right-click on submenu item
            WebElement subItem = driver.findElement(By.id("subItem"));
            actions.contextClick(subItem).perform();
            Thread.sleep(500);
            
            // Step 3: Select context menu option
            WebElement option = driver.findElement(By.id("option"));
            actions.click(option).perform();
            Thread.sleep(500);
            
            // Step 4: Drag result to target
            WebElement result = driver.findElement(By.id("result"));
            WebElement target = driver.findElement(By.id("target"));
            actions.dragAndDrop(result, target).perform();
            
            System.out.println("✓ Complex interaction completed");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 2: Chained Actions
```java
public class ChainedActionsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/interactive-dashboard");
            
            Actions actions = new Actions(driver);
            
            WebElement widget1 = driver.findElement(By.id("widget1"));
            WebElement widget2 = driver.findElement(By.id("widget2"));
            WebElement widget3 = driver.findElement(By.id("widget3"));
            WebElement dropZone = driver.findElement(By.id("dropZone"));
            
            // Chain multiple actions
            actions.moveToElement(widget1)
                   .clickAndHold()
                   .moveToElement(dropZone)
                   .release()
                   .moveToElement(widget2)
                   .clickAndHold()
                   .moveToElement(dropZone)
                   .release()
                   .moveToElement(widget3)
                   .doubleClick()
                   .perform();
            
            System.out.println("✓ Chained actions completed");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

#### Example 3: Conditional Mouse Actions
```java
public class ConditionalMouseActionsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/dynamic-ui");
            
            Actions actions = new Actions(driver);
            
            // Check if element is visible before hovering
            WebElement menu = driver.findElement(By.id("menu"));
            
            if (menu.isDisplayed()) {
                actions.moveToElement(menu).perform();
                System.out.println("✓ Hovered over menu");
                
                Thread.sleep(1000);
                
                // Check if submenu appeared
                try {
                    WebElement submenu = driver.findElement(By.id("submenu"));
                    if (submenu.isDisplayed()) {
                        actions.moveToElement(submenu).click().perform();
                        System.out.println("✓ Clicked submenu");
                    }
                } catch (Exception e) {
                    System.out.println("Submenu not found");
                }
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

## 7. Practical Exercises

### Exercise 1: Context Menu Operations
**Task:** Right-click on an element and select multiple options from context menu.

```java
public class Exercise1_ContextMenuOperations {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/file-browser");
            
            Actions actions = new Actions(driver);
            
            // Right-click on file
            WebElement file = driver.findElement(By.className("file"));
            actions.contextClick(file).perform();
            
            System.out.println("✓ Context menu opened");
            Thread.sleep(1000);
            
            // Select "Properties"
            WebElement properties = driver.findElement(By.xpath("//li[text()='Properties']"));
            properties.click();
            
            System.out.println("✓ Properties opened");
            Thread.sleep(2000);
            
            // Close properties
            WebElement closeBtn = driver.findElement(By.id("closeProperties"));
            closeBtn.click();
            
            // Right-click again
            actions.contextClick(file).perform();
            Thread.sleep(1000);
            
            // Select "Rename"
            WebElement rename = driver.findElement(By.xpath("//li[text()='Rename']"));
            rename.click();
            
            System.out.println("✓ Rename selected");
            
            // Enter new name
            WebElement nameInput = driver.findElement(By.id("fileName"));
            nameInput.clear();
            nameInput.sendKeys("NewFileName.txt");
            nameInput.sendKeys(Keys.ENTER);
            
            System.out.println("✓ File renamed");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 2: Nested Menu Navigation
**Task:** Navigate through a three-level menu and click the final item.

```java
public class Exercise2_NestedMenuNavigation {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/navigation");
            
            Actions actions = new Actions(driver);
            
            // Level 1
            WebElement mainMenu = driver.findElement(By.linkText("Categories"));
            actions.moveToElement(mainMenu).perform();
            System.out.println("✓ Main menu opened");
            Thread.sleep(800);
            
            // Level 2
            WebElement category = driver.findElement(By.linkText("Electronics"));
            actions.moveToElement(category).perform();
            System.out.println("✓ Category menu opened");
            Thread.sleep(800);
            
            // Level 3
            WebElement subcategory = driver.findElement(By.linkText("Mobile Phones"));
            actions.moveToElement(subcategory).perform();
            System.out.println("✓ Subcategory menu opened");
            Thread.sleep(800);
            
            // Final item
            WebElement item = driver.findElement(By.linkText("Smartphones"));
            actions.moveToElement(item).click().perform();
            System.out.println("✓ Final item clicked");
            
            Thread.sleep(2000);
            
            // Verify navigation
            String currentUrl = driver.getCurrentUrl();
            if (currentUrl.contains("smartphones")) {
                System.out.println("✓ Successfully navigated to smartphones page");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 3: Click and Hold Selection
**Task:** Select multiple items using click and hold.

```java
public class Exercise3_ClickAndHoldSelection {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/selectable-list");
            
            Actions actions = new Actions(driver);
            
            // Find first and last items
            WebElement firstItem = driver.findElement(By.id("item-1"));
            WebElement lastItem = driver.findElement(By.id("item-10"));
            
            // Perform selection
            actions.clickAndHold(firstItem)
                   .moveToElement(lastItem)
                   .release()
                   .perform();
            
            System.out.println("✓ Items selected");
            Thread.sleep(1000);
            
            // Verify selection
            List<WebElement> selectedItems = driver.findElements(By.className("selected"));
            System.out.println("Number of selected items: " + selectedItems.size());
            
            if (selectedItems.size() == 10) {
                System.out.println("✓ All items selected successfully");
            } else {
                System.out.println("✗ Selection incomplete");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 4: Mouse Movement with Offsets
**Task:** Click at specific coordinates on a canvas or map.

```java
public class Exercise4_MouseOffsets {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/interactive-map");
            
            Actions actions = new Actions(driver);
            
            // Find map element
            WebElement map = driver.findElement(By.id("map"));
            
            // Click at multiple positions
            int[][] positions = {
                {100, 100},
                {200, 150},
                {150, 200},
                {50, 50}
            };
            
            for (int[] pos : positions) {
                actions.moveToElement(map, pos[0], pos[1])
                       .click()
                       .perform();
                
                System.out.println("✓ Clicked at position (" + pos[0] + ", " + pos[1] + ")");
                Thread.sleep(500);
            }
            
            System.out.println("✓ All positions clicked");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Exercise 5: Complex Action Sequence
**Task:** Perform a complex sequence of mouse actions.

```java
public class Exercise5_ComplexSequence {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        
        try {
            driver.get("https://example.com/workspace");
            
            Actions actions = new Actions(driver);
            
            // Step 1: Hover over toolbar
            WebElement toolbar = driver.findElement(By.id("toolbar"));
            actions.moveToElement(toolbar).perform();
            System.out.println("✓ Step 1: Hovered over toolbar");
            Thread.sleep(500);
            
            // Step 2: Right-click on canvas
            WebElement canvas = driver.findElement(By.id("canvas"));
            actions.contextClick(canvas).perform();
            System.out.println("✓ Step 2: Right-clicked canvas");
            Thread.sleep(500);
            
            // Step 3: Select tool from context menu
            WebElement tool = driver.findElement(By.xpath("//li[text()='Draw']"));
            tool.click();
            System.out.println("✓ Step 3: Selected draw tool");
            Thread.sleep(500);
            
            // Step 4: Draw on canvas
            actions.moveToElement(canvas)
                   .clickAndHold()
                   .moveByOffset(100, 0)
                   .moveByOffset(0, 100)
                   .moveByOffset(-100, 0)
                   .moveByOffset(0, -100)
                   .release()
                   .perform();
            System.out.println("✓ Step 4: Drew square");
            Thread.sleep(500);
            
            // Step 5: Double-click to finish
            actions.doubleClick(canvas).perform();
            System.out.println("✓ Step 5: Double-clicked to finish");
            
            System.out.println("\n✓ Complex sequence completed successfully!");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

---

## 8. Common Mistakes

### Mistake 1: Not Calling perform()
```java
// ❌ WRONG - Actions not executed
actions.contextClick(element);  // Missing perform()

// ✅ CORRECT
actions.contextClick(element).perform();
```

### Mistake 2: Moving Too Fast
```java
// ❌ WRONG - No pause between actions
actions.moveToElement(menu1)
       .moveToElement(menu2)
       .click()
       .perform();

// ✅ CORRECT - Add pauses
actions.moveToElement(menu1).perform();
Thread.sleep(500);
actions.moveToElement(menu2).perform();
Thread.sleep(500);
actions.click().perform();
```

### Mistake 3: Incorrect Offset Calculation
```java
// ❌ WRONG - Offset from wrong reference point
actions.moveByOffset(100, 100).click().perform();

// ✅ CORRECT - Move to element first
actions.moveToElement(element)
       .moveByOffset(50, 50)
       .click()
       .perform();
```

### Mistake 4: Not Handling Stale Elements
```java
// ❌ WRONG - Element may become stale
WebElement menu = driver.findElement(By.id("menu"));
actions.moveToElement(menu).perform();
// Page refresh or DOM change
actions.click(menu).perform();  // May fail

// ✅ CORRECT - Re-find element
WebElement menu = driver.findElement(By.id("menu"));
actions.moveToElement(menu).perform();
// After DOM change
menu = driver.findElement(By.id("menu"));  // Re-find
actions.click(menu).perform();