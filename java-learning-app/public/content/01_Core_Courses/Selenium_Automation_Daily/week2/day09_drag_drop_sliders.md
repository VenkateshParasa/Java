# Day 9: Drag and Drop, Sliders, and Resizing

## Table of Contents
1. [Learning Objectives](#learning-objectives)
2. [Introduction](#introduction)
3. [Introduction to Drag and Drop Operations](#introduction-to-drag-and-drop-operations)
4. [Drag and Drop Using Actions Class](#drag-and-drop-using-actions-class)
   - [dragAndDrop(source, target)](#draganddrop-source-target)
   - [clickAndHold() + moveToElement() + release()](#clickandhold--movetoelement--release)
   - [dragAndDropBy(source, xOffset, yOffset)](#draganddropby-source-xoffset-yoffset)
5. [Working with Sliders](#working-with-sliders)
   - [Identifying Slider Elements](#identifying-slider-elements)
   - [Moving Sliders Horizontally and Vertically](#moving-sliders-horizontally-and-vertically)
   - [Setting Slider to Specific Values](#setting-slider-to-specific-values)
6. [Resizing Elements](#resizing-elements)
   - [Resizing Panels and Windows](#resizing-panels-and-windows)
   - [Using moveByOffset() for Resizing](#using-movebyoffset-for-resizing)
7. [Handling Sortable Lists](#handling-sortable-lists)
   - [Reordering Elements](#reordering-elements)
   - [Drag and Drop in Lists](#drag-and-drop-in-lists)
8. [Advanced Drag and Drop Scenarios](#advanced-drag-and-drop-scenarios)
   - [HTML5 Drag and Drop](#html5-drag-and-drop)
   - [Drag and Drop Across Frames](#drag-and-drop-across-frames)
   - [Multiple Element Dragging](#multiple-element-dragging)
9. [Common Challenges](#common-challenges)
   - [Elements Not Draggable](#elements-not-draggable)
   - [Drag and Drop Not Working](#drag-and-drop-not-working)
   - [HTML5 Drag and Drop Workarounds](#html5-drag-and-drop-workarounds)
10. [JavaScript Workarounds for Drag and Drop](#javascript-workarounds-for-drag-and-drop)
11. [Best Practices](#best-practices)
12. [Practice Exercises](#practice-exercises)
13. [Interview Questions](#interview-questions)
14. [Key Takeaways](#key-takeaways)

---

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand different drag and drop operations in Selenium
- Implement drag and drop using various Actions class methods
- Automate slider interactions (horizontal and vertical)
- Resize elements using Selenium WebDriver
- Handle sortable lists and reorder elements
- Work with HTML5 drag and drop functionality
- Troubleshoot common drag and drop issues
- Implement JavaScript workarounds for complex scenarios
- Apply best practices for drag and drop automation

---

## Introduction

Drag and drop operations are essential interactions in modern web applications. From file uploads to sortable lists, from sliders to resizable panels, these interactions provide intuitive user experiences. Automating these operations requires understanding the Actions class and its various methods for simulating complex mouse movements and gestures.

In this lesson, we'll explore comprehensive techniques for automating drag and drop, sliders, and resizing operations using Selenium WebDriver, including handling challenging scenarios and implementing robust solutions.

---

## Introduction to Drag and Drop Operations

### What is Drag and Drop?

Drag and drop is a user interface action where an element is clicked and held, moved to a new location, and then released. This interaction is common in:
- Sortable lists and grids
- File upload interfaces
- Image galleries
- Dashboard widgets
- Slider controls
- Resizable panels

### How Selenium Handles Drag and Drop

Selenium provides the Actions class to simulate complex user interactions, including drag and drop operations. The Actions class offers several methods to perform these operations:

```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class DragDropIntro {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        Actions actions = new Actions(driver);

        // Basic drag and drop structure
        WebElement sourceElement = driver.findElement(By.id("source"));
        WebElement targetElement = driver.findElement(By.id("target"));

        // Perform drag and drop
        actions.dragAndDrop(sourceElement, targetElement).perform();

        driver.quit();
    }
}
```

### Key Concepts

1. **Source Element**: The element being dragged
2. **Target Element**: The destination where the element is dropped
3. **Actions Chain**: Sequence of actions performed together
4. **Build vs Perform**:
   - `build()`: Compiles all actions into a single action
   - `perform()`: Executes the action(s)

---

## Drag and Drop Using Actions Class

### dragAndDrop(source, target)

The simplest method for drag and drop operations.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class SimpleDragAndDrop {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            // Navigate to drag and drop demo page
            driver.get("https://jqueryui.com/droppable/");

            // Switch to iframe if needed
            driver.switchTo().frame(driver.findElement(By.className("demo-frame")));

            // Locate source and target elements
            WebElement source = driver.findElement(By.id("draggable"));
            WebElement target = driver.findElement(By.id("droppable"));

            System.out.println("Before drag and drop:");
            System.out.println("Source location: " + source.getLocation());
            System.out.println("Target text: " + target.getText());

            // Create Actions object
            Actions actions = new Actions(driver);

            // Perform drag and drop
            actions.dragAndDrop(source, target).perform();

            // Wait for the action to complete
            Thread.sleep(1000);

            System.out.println("\nAfter drag and drop:");
            System.out.println("Source location: " + source.getLocation());
            System.out.println("Target text: " + target.getText());

            // Verify the drop was successful
            String targetText = target.getText();
            if (targetText.equals("Dropped!")) {
                System.out.println("Drag and drop successful!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### clickAndHold() + moveToElement() + release()

More granular control over the drag and drop process.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class StepByStepDragDrop {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            driver.get("https://jqueryui.com/droppable/");
            driver.switchTo().frame(0);

            WebElement source = driver.findElement(By.id("draggable"));
            WebElement target = driver.findElement(By.id("droppable"));

            Actions actions = new Actions(driver);

            // Method 1: Using clickAndHold, moveToElement, and release
            actions.clickAndHold(source)
                   .moveToElement(target)
                   .release()
                   .perform();

            Thread.sleep(1000);
            System.out.println("Method 1 completed: " + target.getText());

            // Refresh page for next example
            driver.switchTo().defaultContent();
            driver.navigate().refresh();
            driver.switchTo().frame(0);

            source = driver.findElement(By.id("draggable"));
            target = driver.findElement(By.id("droppable"));

            // Method 2: Using clickAndHold with pause
            actions.clickAndHold(source)
                   .pause(Duration.ofMillis(500))
                   .moveToElement(target)
                   .pause(Duration.ofMillis(500))
                   .release()
                   .perform();

            Thread.sleep(1000);
            System.out.println("Method 2 completed: " + target.getText());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Advanced clickAndHold with moveByOffset

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class PreciseDragDrop {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            driver.get("https://jqueryui.com/droppable/");
            driver.switchTo().frame(0);

            WebElement source = driver.findElement(By.id("draggable"));
            WebElement target = driver.findElement(By.id("droppable"));

            // Get coordinates
            int sourceX = source.getLocation().getX();
            int sourceY = source.getLocation().getY();
            int targetX = target.getLocation().getX();
            int targetY = target.getLocation().getY();

            System.out.println("Source coordinates: (" + sourceX + ", " + sourceY + ")");
            System.out.println("Target coordinates: (" + targetX + ", " + targetY + ")");

            Actions actions = new Actions(driver);

            // Click and hold at specific offset within source element
            actions.moveToElement(source, 10, 10)
                   .clickAndHold()
                   .moveToElement(target, 20, 20)
                   .release()
                   .perform();

            Thread.sleep(1000);
            System.out.println("Precise drag and drop completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### dragAndDropBy(source, xOffset, yOffset)

Drag and drop by pixel offset instead of to a target element.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class DragDropByOffset {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            driver.get("https://jqueryui.com/draggable/");
            driver.switchTo().frame(0);

            WebElement draggable = driver.findElement(By.id("draggable"));

            // Get initial position
            int initialX = draggable.getLocation().getX();
            int initialY = draggable.getLocation().getY();
            System.out.println("Initial position: (" + initialX + ", " + initialY + ")");

            Actions actions = new Actions(driver);

            // Drag by 150 pixels right and 100 pixels down
            actions.dragAndDropBy(draggable, 150, 100).perform();
            Thread.sleep(1000);

            int newX = draggable.getLocation().getX();
            int newY = draggable.getLocation().getY();
            System.out.println("New position: (" + newX + ", " + newY + ")");

            // Drag back to approximately original position
            actions.dragAndDropBy(draggable, -150, -100).perform();
            Thread.sleep(1000);

            int finalX = draggable.getLocation().getX();
            int finalY = draggable.getLocation().getY();
            System.out.println("Final position: (" + finalX + ", " + finalY + ")");

            // Multiple offset drags
            System.out.println("\nPerforming multiple offset drags:");

            // Draw a square pattern
            actions.dragAndDropBy(draggable, 100, 0).perform(); // Right
            Thread.sleep(500);

            actions.dragAndDropBy(draggable, 0, 100).perform(); // Down
            Thread.sleep(500);

            actions.dragAndDropBy(draggable, -100, 0).perform(); // Left
            Thread.sleep(500);

            actions.dragAndDropBy(draggable, 0, -100).perform(); // Up
            Thread.sleep(500);

            System.out.println("Square pattern completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Comprehensive Drag and Drop Example

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class ComprehensiveDragDrop {

    private WebDriver driver;
    private Actions actions;
    private WebDriverWait wait;

    public ComprehensiveDragDrop() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void dragAndDropMethod1(WebElement source, WebElement target) {
        System.out.println("Method 1: dragAndDrop()");
        actions.dragAndDrop(source, target).perform();
    }

    public void dragAndDropMethod2(WebElement source, WebElement target) {
        System.out.println("Method 2: clickAndHold + moveToElement + release");
        actions.clickAndHold(source)
               .moveToElement(target)
               .release()
               .perform();
    }

    public void dragAndDropMethod3(WebElement source, WebElement target) {
        System.out.println("Method 3: clickAndHold + release on target");
        actions.clickAndHold(source)
               .release(target)
               .perform();
    }

    public void dragAndDropWithPause(WebElement source, WebElement target, int pauseMs) {
        System.out.println("Method 4: With pause between actions");
        actions.clickAndHold(source)
               .pause(Duration.ofMillis(pauseMs))
               .moveToElement(target)
               .pause(Duration.ofMillis(pauseMs))
               .release()
               .perform();
    }

    public void dragAndDropByOffset(WebElement source, int xOffset, int yOffset) {
        System.out.println("Method 5: dragAndDropBy offset");
        actions.dragAndDropBy(source, xOffset, yOffset).perform();
    }

    public void verifyDragDrop(WebElement target, String expectedText) {
        wait.until(ExpectedConditions.textToBePresentInElement(target, expectedText));
        String actualText = target.getText();
        if (actualText.contains(expectedText)) {
            System.out.println("✓ Verification passed: " + actualText);
        } else {
            System.out.println("✗ Verification failed. Expected: " + expectedText + ", Got: " + actualText);
        }
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        ComprehensiveDragDrop demo = new ComprehensiveDragDrop();

        try {
            demo.driver.get("https://jqueryui.com/droppable/");
            demo.driver.switchTo().frame(0);

            WebElement source = demo.driver.findElement(By.id("draggable"));
            WebElement target = demo.driver.findElement(By.id("droppable"));

            // Test different methods
            demo.dragAndDropMethod1(source, target);
            Thread.sleep(1000);
            demo.verifyDragDrop(target, "Dropped!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

---

## Working with Sliders

### Identifying Slider Elements

Sliders are typically implemented using HTML5 input elements or custom JavaScript components.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class SliderIdentification {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            driver.get("https://jqueryui.com/slider/");
            driver.switchTo().frame(0);

            // Method 1: Finding slider by class
            WebElement slider = driver.findElement(By.cssSelector(".ui-slider"));
            System.out.println("Slider found: " + slider.getTagName());

            // Method 2: Finding slider handle
            WebElement sliderHandle = driver.findElement(By.cssSelector(".ui-slider-handle"));
            System.out.println("Slider handle found: " + sliderHandle.getTagName());

            // Get slider properties
            System.out.println("Slider width: " + slider.getSize().getWidth());
            System.out.println("Slider height: " + slider.getSize().getHeight());
            System.out.println("Handle position: " + sliderHandle.getLocation());

            // Get slider attributes
            String orientation = slider.getAttribute("class");
            System.out.println("Slider orientation: " +
                (orientation.contains("horizontal") ? "Horizontal" : "Vertical"));

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Moving Sliders Horizontally and Vertically

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class SliderMovement {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            // Test horizontal slider
            testHorizontalSlider(driver);

            // Test vertical slider
            testVerticalSlider(driver);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }

    private static void testHorizontalSlider(WebDriver driver) throws InterruptedException {
        System.out.println("=== Testing Horizontal Slider ===");
        driver.get("https://jqueryui.com/slider/");
        driver.switchTo().frame(0);

        WebElement slider = driver.findElement(By.id("slider"));
        WebElement sliderHandle = driver.findElement(By.cssSelector(".ui-slider-handle"));

        Actions actions = new Actions(driver);

        // Get initial position
        int initialX = sliderHandle.getLocation().getX();
        System.out.println("Initial X position: " + initialX);

        // Move slider to the right (increase value)
        System.out.println("Moving slider to the right...");
        actions.clickAndHold(sliderHandle)
               .moveByOffset(100, 0)
               .release()
               .perform();
        Thread.sleep(1000);

        int newX = sliderHandle.getLocation().getX();
        System.out.println("New X position: " + newX);

        // Move slider to the left (decrease value)
        System.out.println("Moving slider to the left...");
        actions.clickAndHold(sliderHandle)
               .moveByOffset(-50, 0)
               .release()
               .perform();
        Thread.sleep(1000);

        int finalX = sliderHandle.getLocation().getX();
        System.out.println("Final X position: " + finalX);

        // Move to maximum
        System.out.println("Moving slider to maximum...");
        actions.clickAndHold(sliderHandle)
               .moveByOffset(500, 0)
               .release()
               .perform();
        Thread.sleep(1000);

        // Move to minimum
        System.out.println("Moving slider to minimum...");
        actions.clickAndHold(sliderHandle)
               .moveByOffset(-500, 0)
               .release()
               .perform();
        Thread.sleep(1000);

        driver.switchTo().defaultContent();
    }

    private static void testVerticalSlider(WebDriver driver) throws InterruptedException {
        System.out.println("\n=== Testing Vertical Slider ===");
        driver.get("https://jqueryui.com/slider/#vertical");
        driver.switchTo().frame(0);

        WebElement sliderHandle = driver.findElement(By.cssSelector(".ui-slider-handle"));

        Actions actions = new Actions(driver);

        // Get initial position
        int initialY = sliderHandle.getLocation().getY();
        System.out.println("Initial Y position: " + initialY);

        // Move slider down (decrease value)
        System.out.println("Moving slider down...");
        actions.clickAndHold(sliderHandle)
               .moveByOffset(0, 50)
               .release()
               .perform();
        Thread.sleep(1000);

        int newY = sliderHandle.getLocation().getY();
        System.out.println("New Y position: " + newY);

        // Move slider up (increase value)
        System.out.println("Moving slider up...");
        actions.clickAndHold(sliderHandle)
               .moveByOffset(0, -100)
               .release()
               .perform();
        Thread.sleep(1000);

        int finalY = sliderHandle.getLocation().getY();
        System.out.println("Final Y position: " + finalY);

        driver.switchTo().defaultContent();
    }
}
```

### Setting Slider to Specific Values

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class SliderPreciseControl {

    private WebDriver driver;
    private Actions actions;

    public SliderPreciseControl() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    /**
     * Move slider to specific percentage (0-100)
     */
    public void moveSliderToPercentage(WebElement slider, WebElement handle, int percentage) {
        if (percentage < 0 || percentage > 100) {
            throw new IllegalArgumentException("Percentage must be between 0 and 100");
        }

        // Get slider width
        int sliderWidth = slider.getSize().getWidth();

        // Calculate target position
        int targetOffset = (sliderWidth * percentage) / 100;

        // Get current handle position relative to slider
        int handleX = handle.getLocation().getX();
        int sliderX = slider.getLocation().getX();
        int currentOffset = handleX - sliderX;

        // Calculate movement needed
        int moveOffset = targetOffset - currentOffset;

        System.out.println("Slider width: " + sliderWidth);
        System.out.println("Target percentage: " + percentage + "%");
        System.out.println("Current offset: " + currentOffset);
        System.out.println("Target offset: " + targetOffset);
        System.out.println("Move offset: " + moveOffset);

        // Move slider
        actions.clickAndHold(handle)
               .moveByOffset(moveOffset, 0)
               .release()
               .perform();
    }

    /**
     * Move vertical slider to specific percentage (0-100)
     */
    public void moveVerticalSliderToPercentage(WebElement slider, WebElement handle, int percentage) {
        if (percentage < 0 || percentage > 100) {
            throw new IllegalArgumentException("Percentage must be between 0 and 100");
        }

        // Get slider height
        int sliderHeight = slider.getSize().getHeight();

        // Calculate target position (inverted for vertical sliders)
        int targetOffset = (sliderHeight * (100 - percentage)) / 100;

        // Get current handle position relative to slider
        int handleY = handle.getLocation().getY();
        int sliderY = slider.getLocation().getY();
        int currentOffset = handleY - sliderY;

        // Calculate movement needed
        int moveOffset = targetOffset - currentOffset;

        System.out.println("Slider height: " + sliderHeight);
        System.out.println("Target percentage: " + percentage + "%");
        System.out.println("Move offset: " + moveOffset);

        // Move slider
        actions.clickAndHold(handle)
               .moveByOffset(0, moveOffset)
               .release()
               .perform();
    }

    /**
     * Set slider value using JavaScript (alternative method)
     */
    public void setSliderValueJS(WebElement slider, int value) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].value = arguments[1];" +
                        "arguments[0].dispatchEvent(new Event('change'));",
                        slider, value);
    }

    /**
     * Get current slider value
     */
    public String getSliderValue(WebElement slider) {
        return slider.getAttribute("value");
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        SliderPreciseControl demo = new SliderPreciseControl();

        try {
            demo.driver.get("https://jqueryui.com/slider/");
            demo.driver.switchTo().frame(0);

            WebElement slider = demo.driver.findElement(By.id("slider"));
            WebElement handle = demo.driver.findElement(By.cssSelector(".ui-slider-handle"));

            // Test different percentage values
            int[] percentages = {0, 25, 50, 75, 100};

            for (int percentage : percentages) {
                System.out.println("\n--- Setting slider to " + percentage + "% ---");
                demo.moveSliderToPercentage(slider, handle, percentage);
                Thread.sleep(1000);
            }

            // Test HTML5 range input slider
            demo.driver.switchTo().defaultContent();
            demo.testHTML5RangeSlider();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }

    private void testHTML5RangeSlider() throws InterruptedException {
        System.out.println("\n=== Testing HTML5 Range Slider ===");

        // Create a test page with HTML5 range input
        String html = "data:text/html," +
            "<html><body>" +
            "<input type='range' id='myRange' min='0' max='100' value='50' " +
            "style='width:400px'>" +
            "<p>Value: <span id='value'>50</span></p>" +
            "<script>" +
            "var slider = document.getElementById('myRange');" +
            "var output = document.getElementById('value');" +
            "slider.oninput = function() { output.innerHTML = this.value; }" +
            "</script>" +
            "</body></html>";

        driver.get(html);
        Thread.sleep(1000);

        WebElement rangeInput = driver.findElement(By.id("myRange"));
        WebElement valueDisplay = driver.findElement(By.id("value"));

        System.out.println("Initial value: " + valueDisplay.getText());

        // Method 1: Using Actions class
        actions.clickAndHold(rangeInput)
               .moveByOffset(100, 0)
               .release()
               .perform();
        Thread.sleep(500);
        System.out.println("After Actions move: " + valueDisplay.getText());

        // Method 2: Using JavaScript
        setSliderValueJS(rangeInput, 75);
        Thread.sleep(500);
        System.out.println("After JS set to 75: " + valueDisplay.getText());

        // Method 3: Using sendKeys (for HTML5 range inputs)
        rangeInput.sendKeys(org.openqa.selenium.Keys.ARROW_RIGHT);
        rangeInput.sendKeys(org.openqa.selenium.Keys.ARROW_RIGHT);
        rangeInput.sendKeys(org.openqa.selenium.Keys.ARROW_RIGHT);
        Thread.sleep(500);
        System.out.println("After arrow keys: " + valueDisplay.getText());
    }
}
```

### Advanced Slider Examples

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;
import java.util.List;

public class AdvancedSliderExamples {

    private WebDriver driver;
    private Actions actions;

    public AdvancedSliderExamples() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    /**
     * Handle range slider (with two handles)
     */
    public void handleRangeSlider() throws InterruptedException {
        System.out.println("=== Testing Range Slider ===");
        driver.get("https://jqueryui.com/slider/#range");
        driver.switchTo().frame(0);

        WebElement slider = driver.findElement(By.id("slider-range"));
        List<WebElement> handles = driver.findElements(By.cssSelector(".ui-slider-handle"));

        System.out.println("Number of handles: " + handles.size());

        if (handles.size() == 2) {
            WebElement minHandle = handles.get(0);
            WebElement maxHandle = handles.get(1);

            // Move minimum handle
            System.out.println("Moving minimum handle...");
            actions.clickAndHold(minHandle)
                   .moveByOffset(50, 0)
                   .release()
                   .perform();
            Thread.sleep(1000);

            // Move maximum handle
            System.out.println("Moving maximum handle...");
            actions.clickAndHold(maxHandle)
                   .moveByOffset(-50, 0)
                   .release()
                   .perform();
            Thread.sleep(1000);
        }

        driver.switchTo().defaultContent();
    }

    /**
     * Handle slider with fixed increments
     */
    public void handleSnapSlider() throws InterruptedException {
        System.out.println("\n=== Testing Snap Slider ===");
        driver.get("https://jqueryui.com/slider/#steps");
        driver.switchTo().frame(0);

        WebElement handle = driver.findElement(By.cssSelector(".ui-slider-handle"));

        // Move in increments
        for (int i = 0; i < 5; i++) {
            System.out.println("Moving to step " + (i + 1));
            actions.clickAndHold(handle)
                   .moveByOffset(30, 0)
                   .release()
                   .perform();
            Thread.sleep(500);
        }

        driver.switchTo().defaultContent();
    }

    /**
     * Handle color picker slider
     */
    public void handleColorSliders() throws InterruptedException {
        System.out.println("\n=== Testing Color Sliders ===");
        driver.get("https://jqueryui.com/slider/#colorpicker");
        driver.switchTo().frame(0);

        // Get all three sliders (RGB)
        WebElement redSlider = driver.findElement(By.id("red"));
        WebElement greenSlider = driver.findElement(By.id("green"));
        WebElement blueSlider = driver.findElement(By.id("blue"));

        List<WebElement> handles = driver.findElements(By.cssSelector(".ui-slider-handle"));

        if (handles.size() >= 3) {
            // Set Red to high value
            System.out.println("Setting red value...");
            actions.clickAndHold(handles.get(0))
                   .moveByOffset(200, 0)
                   .release()
                   .perform();
            Thread.sleep(500);

            // Set Green to medium value
            System.out.println("Setting green value...");
            actions.clickAndHold(handles.get(1))
                   .moveByOffset(100, 0)
                   .release()
                   .perform();
            Thread.sleep(500);

            // Set Blue to low value
            System.out.println("Setting blue value...");
            actions.clickAndHold(handles.get(2))
                   .moveByOffset(50, 0)
                   .release()
                   .perform();
            Thread.sleep(500);
        }

        driver.switchTo().defaultContent();
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        AdvancedSliderExamples demo = new AdvancedSliderExamples();

        try {
            demo.handleRangeSlider();
            demo.handleSnapSlider();
            demo.handleColorSliders();

            System.out.println("\nAll slider tests completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

---

## Resizing Elements

### Resizing Panels and Windows

```java
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class ResizableElements {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            driver.get("https://jqueryui.com/resizable/");
            driver.switchTo().frame(0);

            WebElement resizableBox = driver.findElement(By.id("resizable"));
            WebElement resizeHandle = driver.findElement(
                By.cssSelector(".ui-resizable-se"));

            // Get initial dimensions
            Dimension initialSize = resizableBox.getSize();
            System.out.println("Initial size: " + initialSize.getWidth() +
                             " x " + initialSize.getHeight());

            Actions actions = new Actions(driver);

            // Resize by dragging the handle
            System.out.println("\nResizing element...");
            actions.clickAndHold(resizeHandle)
                   .moveByOffset(100, 100)
                   .release()
                   .perform();

            Thread.sleep(1000);

            // Get new dimensions
            Dimension newSize = resizableBox.getSize();
            System.out.println("New size: " + newSize.getWidth() +
                             " x " + newSize.getHeight());

            // Verify size changed
            if (newSize.getWidth() > initialSize.getWidth() &&
                newSize.getHeight() > initialSize.getHeight()) {
                System.out.println("✓ Element successfully resized!");
            }

            // Resize in the opposite direction
            System.out.println("\nResizing element smaller...");
            actions.clickAndHold(resizeHandle)
                   .moveByOffset(-50, -50)
                   .release()
                   .perform();

            Thread.sleep(1000);

            Dimension finalSize = resizableBox.getSize();
            System.out.println("Final size: " + finalSize.getWidth() +
                             " x " + finalSize.getHeight());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```

### Using moveByOffset() for Resizing

```java
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class PreciseResizing {

    private WebDriver driver;
    private Actions actions;

    public PreciseResizing() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    /**
     * Resize element to specific dimensions
     */
    public void resizeToSpecificDimensions(WebElement element, WebElement handle,
                                          int targetWidth, int targetHeight) {
        // Get current size
        Dimension currentSize = element.getSize();
        int currentWidth = currentSize.getWidth();
        int currentHeight = currentSize.getHeight();

        // Calculate offsets needed
        int widthOffset = targetWidth - currentWidth;
        int heightOffset = targetHeight - currentHeight;

        System.out.println("Current size: " + currentWidth + " x " + currentHeight);
        System.out.println("Target size: " + targetWidth + " x " + targetHeight);
        System.out.println("Offset needed: " + widthOffset + " x " + heightOffset);

        // Perform resize
        actions.clickAndHold(handle)
               .moveByOffset(widthOffset, heightOffset)
               .release()
               .perform();
    }

    /**
     * Resize element by percentage
     */
    public void resizeByPercentage(WebElement element, WebElement handle,
                                   double percentage) {
        Dimension currentSize = element.getSize();
        int currentWidth = currentSize.getWidth();
        int currentHeight = currentSize.getHeight();

        int widthOffset = (int) (currentWidth * (percentage - 1.0));
        int heightOffset = (int) (currentHeight * (percentage - 1.0));

        System.out.println("Resizing by " + (percentage * 100) + "%");
        System.out.println("Offset: " + widthOffset + " x " + heightOffset);

        actions.clickAndHold(handle)
               .moveByOffset(widthOffset, heightOffset)
               .release()
               .perform();
    }

    /**
     * Resize with multiple handles (constrained resizing)
     */
    public void testConstrainedResizing() throws InterruptedException {
        driver.get("https://jqueryui.com/resizable/#constrain-area");
        driver.switchTo().frame(0);

        WebElement resizable = driver.findElement(By.id("resizable"));
        WebElement handle = driver.findElement(By.cssSelector("#resizable .ui-resizable-se"));

        Dimension initialSize = resizable.getSize();
        System.out.println("Initial size: " + initialSize.getWidth() +
                         " x " + initialSize.getHeight());

        // Try to resize beyond constraints
        System.out.println("Attempting to resize beyond constraints...");
        actions.clickAndHold(handle)
               .moveByOffset(500, 500)
               .release()
               .perform();

        Thread.sleep(1000);

        Dimension constrainedSize = resizable.getSize();
        System.out.println("Constrained size: " + constrainedSize.getWidth() +
                         " x " + constrainedSize.getHeight());

        driver.switchTo().defaultContent();
    }

    /**
     * Test aspect ratio resizing
     */
    public void testAspectRatioResizing() throws InterruptedException {
        driver.get("https://jqueryui.com/resizable/#aspect-ratio");
        driver.switchTo().frame(0);

        WebElement resizable = driver.findElement(By.id("resizable"));
        WebElement handle = driver.findElement(By.cssSelector("#resizable .ui-resizable-se"));

        Dimension initialSize = resizable.getSize();
        double initialRatio = (double) initialSize.getWidth() / initialSize.getHeight();

        System.out.println("Initial size: " + initialSize.getWidth() +
                         " x " + initialSize.getHeight());
        System.out.println("Initial aspect ratio: " + initialRatio);

        // Resize
        actions.clickAndHold(handle)
               .moveByOffset(100, 50)
               .release()
               .perform();

        Thread.sleep(1000);

        Dimension newSize = resizable.getSize();
        double newRatio = (double) newSize.getWidth() / newSize.getHeight();

        System.out.println("New size: " + newSize.getWidth() +
                         " x " + newSize.getHeight());
        System.out.println("New aspect ratio: " + newRatio);

        // Verify aspect ratio maintained
        if (Math.abs(initialRatio - newRatio) < 0.1) {
            System.out.println("✓ Aspect ratio maintained!");
        } else {
            System.out.println("✗ Aspect ratio changed!");
        }

        driver.switchTo().defaultContent();
    }

    /**
     * Test resizing with animation
     */
    public void testAnimatedResizing() throws InterruptedException {
        driver.get("https://jqueryui.com/resizable/#animate");
        driver.switchTo().frame(0);

        WebElement resizable = driver.findElement(By.id("resizable"));
        WebElement handle = driver.findElement(By.cssSelector("#resizable .ui-resizable-se"));

        System.out.println("Testing animated resizing...");

        // Quick resize (animation should occur)
        actions.clickAndHold(handle)
               .moveByOffset(150, 150)
               .release()
               .perform();

        // Wait for animation to complete
        Thread.sleep(2000);

        System.out.println("Animated resize completed!");

        driver.switchTo().defaultContent();
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        PreciseResizing demo = new PreciseResizing();

        try {
            // Test basic resizing
            demo.driver.get("https://jqueryui.com/resizable/");
            demo.driver.switchTo().frame(0);

            WebElement resizable = demo.driver.findElement(By.id("resizable"));
            WebElement handle = demo.driver.findElement(
                By.cssSelector(".ui-resizable-se"));

            // Test resizing to specific dimensions
            demo.resizeToSpecificDimensions(resizable, handle, 400, 300);
            Thread.sleep(1000);

            demo.driver.switchTo().defaultContent();

            // Test other resizing scenarios
            demo.testConstrainedResizing();
            demo.testAspectRatioResizing();
            demo.testAnimatedResizing();

            System.out.println("\nAll resizing tests completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

---

## Handling Sortable Lists

### Reordering Elements

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;
import java.util.List;

public class SortableListHandling {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        try {
            driver.get("https://jqueryui.com/sortable/");
            driver.switchTo().frame(0);

            // Get all sortable items
            List<WebElement> items = driver.findElements(By.cssSelector("#sortable li"));

            System.out.println("Initial order:");
            printListOrder(items);

            Actions actions = new Actions(driver);

            // Move first item to the last position
            if (items.size() >= 2) {
                WebElement firstItem = items.get(0);
                WebElement lastItem = items.get(items.size() - 1);

                System.out.println("\nMoving '" + firstItem.getText() +
                                 "' to last position...");

                actions.clickAndHold(firstItem)
                       .moveToElement(lastItem)
                       .release()
                       .perform();

                Thread.sleep(1000);

                // Get updated list
                items = driver.findElements(By.cssSelector("#sortable li"));
                System.out.println("\nOrder after moving first to last:");
                printListOrder(items);
            }

            // Move last item to second position
            items = driver.findElements(By.cssSelector("#sortable li"));
            if (items.size() >= 3) {
                WebElement lastItem = items.get(items.size() - 1);
                WebElement secondItem = items.get(1);

                System.out.println("\nMoving '" + lastItem.getText() +
                                 "' to second position...");

                actions.clickAndHold(lastItem)
                       .moveToElement(secondItem)
                       .release()
                       .perform();

                Thread.sleep(1000);

                items = driver.findElements(By.cssSelector("#sortable li"));
                System.out.println("\nFinal order:");
                printListOrder(items);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }

    private static void printListOrder(List<WebElement> items) {
        for (int i = 0; i < items.size(); i++) {
            System.out.println((i + 1) + ". " + items.get(i).getText());
        }
    }
}
```

### Drag and Drop in Lists

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;
import java.util.List;

public class AdvancedSortableHandling {

    private WebDriver driver;
    private Actions actions;

    public AdvancedSortableHandling() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    /**
     * Move item to specific position in list
     */
    public void moveItemToPosition(List<WebElement> items, int fromIndex, int toIndex) {
        if (fromIndex < 0 || fromIndex >= items.size() ||
            toIndex < 0 || toIndex >= items.size()) {
            throw new IllegalArgumentException("Invalid index");
        }

        WebElement itemToMove = items.get(fromIndex);
        WebElement targetItem = items.get(toIndex);

        System.out.println("Moving item " + (fromIndex + 1) + " to position " +
                         (toIndex + 1));

        actions.clickAndHold(itemToMove)
               .moveToElement(targetItem)
               .release()
               .perform();
    }

    /**
     * Sort list in reverse order
     */
    public void reverseListOrder() throws InterruptedException {
        System.out.println("=== Reversing List Order ===");
        driver.get("https://jqueryui.com/sortable/");
        driver.switchTo().frame(0);

        List<WebElement> items = driver.findElements(By.cssSelector("#sortable li"));
        System.out.println("Original order:");
        printList(items);

        int size = items.size();

        // Move items one by one from bottom to top
        for (int i = size - 1; i > 0; i--) {
            items = driver.findElements(By.cssSelector("#sortable li"));
            WebElement itemToMove = items.get(i);
            WebElement firstItem = items.get(0);

            actions.clickAndHold(itemToMove)
                   .moveToElement(firstItem)
                   .release()
                   .perform();

            Thread.sleep(500);
        }

        items = driver.findElements(By.cssSelector("#sortable li"));
        System.out.println("\nReversed order:");
        printList(items);

        driver.switchTo().defaultContent();
    }

    /**
     * Handle sortable with connected lists
     */
    public void handleConnectedLists() throws InterruptedException {
        System.out.println("\n=== Testing Connected Lists ===");
        driver.get("https://jqueryui.com/sortable/#connect-lists");
        driver.switchTo().frame(0);

        List<WebElement> list1Items = driver.findElements(
            By.cssSelector("#sortable1 li"));
        List<WebElement> list2Items = driver.findElements(
            By.cssSelector("#sortable2 li"));

        System.out.println("List 1:");
        printList(list1Items);
        System.out.println("\nList 2:");
        printList(list2Items);

        if (!list1Items.isEmpty() && !list2Items.isEmpty()) {
            // Move first item from list1 to list2
            WebElement itemToMove = list1Items.get(0);
            WebElement targetList = driver.findElement(By.id("sortable2"));

            System.out.println("\nMoving '" + itemToMove.getText() +
                             "' from List 1 to List 2...");

            actions.clickAndHold(itemToMove)
                   .moveToElement(targetList)
                   .release()
                   .perform();

            Thread.sleep(1000);

            list1Items = driver.findElements(By.cssSelector("#sortable1 li"));
            list2Items = driver.findElements(By.cssSelector("#sortable2 li"));

            System.out.println("\nList 1 after move:");
            printList(list1Items);
            System.out.println("\nList 2 after move:");
            printList(list2Items);
        }

        driver.switchTo().defaultContent();
    }

    /**
     * Handle sortable grid
     */
    public void handleSortableGrid() throws InterruptedException {
        System.out.println("\n=== Testing Sortable Grid ===");
        driver.get("https://jqueryui.com/sortable/#display-grid");
        driver.switchTo().frame(0);

        List<WebElement> gridItems = driver.findElements(
            By.cssSelector("#sortable li"));

        System.out.println("Grid has " + gridItems.size() + " items");

        if (gridItems.size() >= 4) {
            // Swap first and last items
            WebElement firstItem = gridItems.get(0);
            WebElement lastItem = gridItems.get(gridItems.size() - 1);

            System.out.println("Swapping positions...");

            actions.clickAndHold(firstItem)
                   .moveToElement(lastItem)
                   .release()
                   .perform();

            Thread.sleep(1000);

            System.out.println("Grid items reordered!");
        }

        driver.switchTo().defaultContent();
    }

    /**
     * Handle sortable with placeholder
     */
    public void handleSortableWithPlaceholder() throws InterruptedException {
        System.out.println("\n=== Testing Sortable with Placeholder ===");
        driver.get("https://jqueryui.com/sortable/#placeholder");
        driver.switchTo().frame(0);

        List<WebElement> items = driver.findElements(By.cssSelector("#sortable li"));

        if (items.size() >= 3) {
            WebElement itemToMove = items.get(0);
            WebElement targetPosition = items.get(2);

            System.out.println("Moving item with placeholder visual...");

            // Slower movement to see placeholder
            actions.clickAndHold(itemToMove)
                   .pause(Duration.ofMillis(500))
                   .moveToElement(targetPosition)
                   .pause(Duration.ofMillis(500))
                   .release()
                   .perform();

            Thread.sleep(1000);

            System.out.println("Item moved with placeholder effect!");
        }

        driver.switchTo().defaultContent();
    }

    private void printList(List<WebElement> items) {
        for (int i = 0; i < items.size(); i++) {
            System.out.println("  " + (i + 1) + ". " + items.get(i).getText());
        }
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        AdvancedSortableHandling demo = new AdvancedSortableHandling();

        try {
            demo.reverseListOrder();
            demo.handleConnectedLists();
            demo.handleSortableGrid();
            demo.handleSortableWithPlaceholder();

            System.out.println("\n=== All sortable tests completed! ===");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

---

## Advanced Drag and Drop Scenarios

### HTML5 Drag and Drop

HTML5 drag and drop uses different events and may not work with standard Selenium Actions.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.nio.file.Files;
import java.nio.file.Paths;

public class HTML5DragAndDrop {

    private WebDriver driver;
    private JavascriptExecutor js;

    public HTML5DragAndDrop() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        js = (JavascriptExecutor) driver;
    }

    /**
     * HTML5 drag and drop using JavaScript simulation
     */
    public void html5DragAndDrop(WebElement source, WebElement target) {
        String script =
            "function createEvent(typeOfEvent) {" +
            "    var event = document.createEvent('CustomEvent');" +
            "    event.initCustomEvent(typeOfEvent, true, true, null);" +
            "    event.dataTransfer = {" +
            "        data: {}," +
            "        setData: function(key, value) {" +
            "            this.data[key] = value;" +
            "        }," +
            "        getData: function(key) {" +
            "            return this.data[key];" +
            "        }" +
            "    };" +
            "    return event;" +
            "}" +
            "" +
            "function dispatchEvent(element, event, transferData) {" +
            "    if (transferData !== undefined) {" +
            "        event.dataTransfer = transferData;" +
            "    }" +
            "    if (element.dispatchEvent) {" +
            "        element.dispatchEvent(event);" +
            "    } else if (element.fireEvent) {" +
            "        element.fireEvent('on' + event.type, event);" +
            "    }" +
            "}" +
            "" +
            "var source = arguments[0];" +
            "var target = arguments[1];" +
            "" +
            "var dragStartEvent = createEvent('dragstart');" +
            "dispatchEvent(source, dragStartEvent);" +
            "" +
            "var dropEvent = createEvent('drop');" +
            "dispatchEvent(target, dropEvent, dragStartEvent.dataTransfer);" +
            "" +
            "var dragEndEvent = createEvent('dragend');" +
            "dispatchEvent(source, dragEndEvent, dragStartEvent.dataTransfer);";

        js.executeScript(script, source, target);
    }

    /**
     * Alternative HTML5 drag and drop helper
     */
    public void html5DragAndDropAlternative(WebElement source, WebElement target) {
        final String DRAG_DROP_SCRIPT =
            "var src = arguments[0];" +
            "var tgt = arguments[1];" +
            "" +
            "var dataTransfer = {" +
            "    dropEffect: ''," +
            "    effectAllowed: 'all'," +
            "    files: []," +
            "    items: {}," +
            "    types: []," +
            "    setData: function(format, data) {" +
            "        this.items[format] = data;" +
            "        this.types.push(format);" +
            "    }," +
            "    getData: function(format) {" +
            "        return this.items[format];" +
            "    }," +
            "    clearData: function(format) {" +
            "        delete this.items[format];" +
            "        var index = this.types.indexOf(format);" +
            "        if (index > -1) this.types.splice(index, 1);" +
            "    }," +
            "    setDragImage: function(img, x, y) {}" +
            "};" +
            "" +
            "var emit = function(event, target) {" +
            "    var evt = document.createEvent('DragEvent');" +
            "    evt.initMouseEvent(event, true, true, window, 0, 0, 0, 0, 0, " +
            "        false, false, false, false, 0, null);" +
            "    Object.defineProperty(evt, 'dataTransfer', {" +
            "        value: dataTransfer" +
            "    });" +
            "    target.dispatchEvent(evt);" +
            "};" +
            "" +
            "emit('dragstart', src);" +
            "emit('dragenter', tgt);" +
            "emit('dragover', tgt);" +
            "emit('drop', tgt);" +
            "emit('dragend', src);";

        js.executeScript(DRAG_DROP_SCRIPT, source, target);
    }

    /**
     * Test HTML5 drag and drop with a sample page
     */
    public void testHTML5DragDrop() throws InterruptedException {
        // Create test HTML page
        String html = "data:text/html," +
            "<html><head><style>" +
            ".box { width: 150px; height: 150px; margin: 20px; " +
            "padding: 10px; border: 2px solid black; display: inline-block; }" +
            "#box1 { background-color: lightblue; }" +
            "#box2 { background-color: lightgreen; }" +
            ".draggable { cursor: move; }" +
            "</style></head><body>" +
            "<div class='box' id='box1'>" +
            "  <div id='drag1' class='draggable' draggable='true'>Drag Me!</div>" +
            "</div>" +
            "<div class='box' id='box2' ondrop='drop(event)' ondragover='allowDrop(event)'>" +
            "  Drop Zone" +
            "</div>" +
            "<script>" +
            "function allowDrop(ev) { ev.preventDefault(); }" +
            "function drag(ev) { ev.dataTransfer.setData('text', ev.target.id); }" +
            "function drop(ev) {" +
            "  ev.preventDefault();" +
            "  var data = ev.dataTransfer.getData('text');" +
            "  ev.target.appendChild(document.getElementById(data));" +
            "}" +
            "document.getElementById('drag1').addEventListener('dragstart', drag);" +
            "</script></body></html>";

        driver.get(html);
        Thread.sleep(1000);

        WebElement source = driver.findElement(By.id("drag1"));
        WebElement target = driver.findElement(By.id("box2"));

        System.out.println("Source parent: " +
            source.findElement(By.xpath("..")).getAttribute("id"));

        // Perform HTML5 drag and drop
        html5DragAndDrop(source, target);
        Thread.sleep(1000);

        // Verify
        source = driver.findElement(By.id("drag1"));
        System.out.println("New parent: " +
            source.findElement(By.xpath("..")).getAttribute("id"));
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        HTML5DragAndDrop demo = new HTML5DragAndDrop();

        try {
            demo.testHTML5DragDrop();
            System.out.println("HTML5 drag and drop completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

### Drag and Drop Across Frames

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.JavascriptExecutor;
import java.time.Duration;

public class CrossFrameDragDrop {

    private WebDriver driver;
    private Actions actions;
    private JavascriptExecutor js;

    public CrossFrameDragDrop() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
        js = (JavascriptExecutor) driver;
    }

    /**
     * Drag and drop across iframes
     * Note: This is complex and may require JavaScript workarounds
     */
    public void dragAcrossFrames() throws InterruptedException {
        // Create a page with two iframes
        String html = "data:text/html," +
            "<html><body>" +
            "<iframe id='frame1' style='width:300px;height:200px;border:1px solid black;'" +
            " srcdoc=\"<div id='drag1' draggable='true' " +
            "style='width:100px;height:100px;background:blue;'>Drag</div>\"></iframe>" +
            "<iframe id='frame2' style='width:300px;height:200px;border:1px solid black;'" +
            " srcdoc=\"<div id='drop1' " +
            "style='width:150px;height:150px;background:green;'>Drop</div>\"></iframe>" +
            "</body></html>";

        driver.get(html);
        Thread.sleep(1000);

        // Switch to frame 1
        driver.switchTo().frame("frame1");
        WebElement source = driver.findElement(By.id("drag1"));
        int sourceX = source.getLocation().getX();
        int sourceY = source.getLocation().getY();

        // Switch to frame 2
        driver.switchTo().defaultContent();
        driver.switchTo().frame("frame2");
        WebElement target = driver.findElement(By.id("drop1"));
        int targetX = target.getLocation().getX();
        int targetY = target.getLocation().getY();

        driver.switchTo().defaultContent();

        System.out.println("Cross-frame drag and drop is complex and " +
                         "typically requires JavaScript workarounds");
        System.out.println("Source position: (" + sourceX + ", " + sourceY + ")");
        System.out.println("Target position: (" + targetX + ", " + targetY + ")");

        // Note: Standard Actions won't work across frames
        // Would need custom JavaScript to handle this scenario
    }

    /**
     * Workaround: Move element within same frame after switching
     */
    public void dragDropInSameFrame() throws InterruptedException {
        driver.get("https://jqueryui.com/droppable/");

        // Both source and target are in the same iframe
        driver.switchTo().frame(0);

        WebElement source = driver.findElement(By.id("draggable"));
        WebElement target = driver.findElement(By.id("droppable"));

        System.out.println("Performing drag and drop within iframe...");
        actions.dragAndDrop(source, target).perform();

        Thread.sleep(1000);
        System.out.println("Result: " + target.getText());

        driver.switchTo().defaultContent();
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        CrossFrameDragDrop demo = new CrossFrameDragDrop();

        try {
            demo.dragDropInSameFrame();
            demo.dragAcrossFrames();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

### Multiple Element Dragging

```java
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;
import java.util.List;

public class MultipleElementDragging {

    private WebDriver driver;
    private Actions actions;

    public MultipleElementDragging() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
    }

    /**
     * Drag multiple elements sequentially
     */
    public void dragMultipleSequentially() throws InterruptedException {
        driver.get("https://jqueryui.com/sortable/");
        driver.switchTo().frame(0);

        List<WebElement> items = driver.findElements(By.cssSelector("#sortable li"));

        System.out.println("Dragging multiple elements sequentially...");

        // Move items 1, 2, and 3 to the bottom
        for (int i = 0; i < 3 && i < items.size(); i++) {
            items = driver.findElements(By.cssSelector("#sortable li"));
            WebElement itemToMove = items.get(0); // Always move first item
            WebElement lastItem = items.get(items.size() - 1);

            System.out.println("Moving: " + itemToMove.getText());

            actions.clickAndHold(itemToMove)
                   .moveToElement(lastItem)
                   .release()
                   .perform();

            Thread.sleep(500);
        }

        System.out.println("Sequential dragging completed!");
        driver.switchTo().defaultContent();
    }

    /**
     * Select and drag multiple elements with Ctrl key
     * Note: This works only if the application supports multi-select
     */
    public void dragMultipleWithCtrl() throws InterruptedException {
        // Create a test page with multi-select support
        String html = "data:text/html," +
            "<html><head><style>" +
            ".item { padding: 10px; margin: 5px; background: lightblue; " +
            "cursor: move; user-select: none; }" +
            ".item.selected { background: lightcoral; }" +
            ".container { border: 2px solid black; padding: 20px; " +
            "min-height: 200px; margin: 10px; }" +
            "</style></head><body>" +
            "<div class='container' id='source'>" +
            "  <div class='item' id='item1'>Item 1</div>" +
            "  <div class='item' id='item2'>Item 2</div>" +
            "  <div class='item' id='item3'>Item 3</div>" +
            "</div>" +
            "<div class='container' id='target'>Drop Zone</div>" +
            "<script>" +
            "document.querySelectorAll('.item').forEach(item => {" +
            "  item.addEventListener('click', function(e) {" +
            "    if(e.ctrlKey || e.metaKey) {" +
            "      this.classList.toggle('selected');" +
            "    }" +
            "  });" +
            "});" +
            "</script></body></html>";

        driver.get(html);
        Thread.sleep(1000);

        WebElement item1 = driver.findElement(By.id("item1"));
        WebElement item2 = driver.findElement(By.id("item2"));

        System.out.println("Selecting multiple items with Ctrl...");

        // Click first item
        actions.click(item1).perform();
        Thread.sleep(300);

        // Ctrl+Click second item
        actions.keyDown(Keys.CONTROL)
               .click(item2)
               .keyUp(Keys.CONTROL)
               .perform();
        Thread.sleep(300);

        System.out.println("Multiple items selected!");

        // Note: Actual dragging of multiple items depends on application support
    }

    /**
     * Chain multiple drag and drop operations
     */
    public void chainMultipleDragDrops() throws InterruptedException {
        driver.get("https://jqueryui.com/sortable/#connect-lists");
        driver.switchTo().frame(0);

        System.out.println("Chaining multiple drag and drop operations...");

        // Get items from both lists
        List<WebElement> list1 = driver.findElements(By.cssSelector("#sortable1 li"));
        List<WebElement> list2 = driver.findElements(By.cssSelector("#sortable2 li"));

        // Move first 3 items from list1 to list2
        for (int i = 0; i < 3 && i < list1.size(); i++) {
            list1 = driver.findElements(By.cssSelector("#sortable1 li"));
            WebElement item = list1.get(0);
            WebElement targetList = driver.findElement(By.id("sortable2"));

            System.out.println("Moving: " + item.getText());

            actions.clickAndHold(item)
                   .moveToElement(targetList)
                   .release()
                   .perform();

            Thread.sleep(500);
        }

        System.out.println("Chained operations completed!");
        driver.switchTo().defaultContent();
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        MultipleElementDragging demo = new MultipleElementDragging();

        try {
            demo.dragMultipleSequentially();
            demo.dragMultipleWithCtrl();
            demo.chainMultipleDragDrops();

            System.out.println("\nAll multiple element tests completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

---

## Common Challenges

### Elements Not Draggable

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class TroubleshootingDragDrop {

    private WebDriver driver;
    private Actions actions;
    private WebDriverWait wait;
    private JavascriptExecutor js;

    public TroubleshootingDragDrop() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        js = (JavascriptExecutor) driver;
    }

    /**
     * Check if element is draggable
     */
    public boolean isElementDraggable(WebElement element) {
        // Check draggable attribute
        String draggable = element.getAttribute("draggable");
        if ("true".equals(draggable)) {
            System.out.println("Element has draggable=true");
            return true;
        }

        // Check for draggable CSS classes
        String className = element.getAttribute("class");
        if (className != null && (className.contains("draggable") ||
            className.contains("ui-draggable"))) {
            System.out.println("Element has draggable class");
            return true;
        }

        // Check cursor style
        String cursor = element.getCssValue("cursor");
        if ("move".equals(cursor) || "grab".equals(cursor)) {
            System.out.println("Element has draggable cursor");
            return true;
        }

        System.out.println("Element may not be draggable");
        return false;
    }

    /**
     * Troubleshoot: Element not visible or in viewport
     */
    public void ensureElementVisible(WebElement element) {
        // Scroll element into view
        js.executeScript("arguments[0].scrollIntoView({" +
            "behavior: 'smooth', block: 'center', inline: 'center'" +
        "});", element);

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Wait for element to be visible
        wait.until(ExpectedConditions.visibilityOf(element));

        System.out.println("Element is now visible and in viewport");
    }

    /**
     * Troubleshoot: Element is overlapped by another element
     */
    public void checkForOverlappingElements(WebElement element) {
        Boolean isOverlapped = (Boolean) js.executeScript(
            "var rect = arguments[0].getBoundingClientRect();" +
            "var centerX = rect.left + rect.width / 2;" +
            "var centerY = rect.top + rect.height / 2;" +
            "var topElement = document.elementFromPoint(centerX, centerY);" +
            "return topElement !== arguments[0];",
            element
        );

        if (isOverlapped) {
            System.out.println("WARNING: Element is overlapped by another element");

            // Get the overlapping element
            WebElement topElement = (WebElement) js.executeScript(
                "var rect = arguments[0].getBoundingClientRect();" +
                "var centerX = rect.left + rect.width / 2;" +
                "var centerY = rect.top + rect.height / 2;" +
                "return document.elementFromPoint(centerX, centerY);",
                element
            );

            System.out.println("Overlapping element: " + topElement.getTagName());
        } else {
            System.out.println("Element is not overlapped");
        }
    }

    /**
     * Troubleshoot: Try multiple drag and drop methods
     */
    public void tryMultipleMethods(WebElement source, WebElement target)
            throws InterruptedException {
        System.out.println("=== Trying Multiple Drag and Drop Methods ===");

        // Method 1: dragAndDrop
        try {
            System.out.println("Method 1: dragAndDrop()");
            actions.dragAndDrop(source, target).perform();
            Thread.sleep(1000);
            System.out.println("✓ Method 1 successful");
            return;
        } catch (Exception e) {
            System.out.println("✗ Method 1 failed: " + e.getMessage());
        }

        // Method 2: clickAndHold + moveToElement + release
        try {
            System.out.println("Method 2: clickAndHold + moveToElement + release");
            actions.clickAndHold(source)
                   .pause(Duration.ofMillis(500))
                   .moveToElement(target)
                   .pause(Duration.ofMillis(500))
                   .release()
                   .perform();
            Thread.sleep(1000);
            System.out.println("✓ Method 2 successful");
            return;
        } catch (Exception e) {
            System.out.println("✗ Method 2 failed: " + e.getMessage());
        }

        // Method 3: Using offsets
        try {
            System.out.println("Method 3: Using offsets");
            int targetX = target.getLocation().getX();
            int targetY = target.getLocation().getY();
            int sourceX = source.getLocation().getX();
            int sourceY = source.getLocation().getY();

            actions.clickAndHold(source)
                   .moveByOffset(targetX - sourceX, targetY - sourceY)
                   .release()
                   .perform();
            Thread.sleep(1000);
            System.out.println("✓ Method 3 successful");
            return;
        } catch (Exception e) {
            System.out.println("✗ Method 3 failed: " + e.getMessage());
        }

        // Method 4: JavaScript
        try {
            System.out.println("Method 4: JavaScript workaround");
            js.executeScript(
                "var src = arguments[0];" +
                "var tgt = arguments[1];" +
                "tgt.appendChild(src);",
                source, target
            );
            Thread.sleep(1000);
            System.out.println("✓ Method 4 successful");
            return;
        } catch (Exception e) {
            System.out.println("✗ Method 4 failed: " + e.getMessage());
        }

        System.out.println("All methods failed!");
    }

    /**
     * Troubleshoot: Element state and properties
     */
    public void diagnoseElement(WebElement element) {
        System.out.println("=== Element Diagnosis ===");
        System.out.println("Tag: " + element.getTagName());
        System.out.println("Displayed: " + element.isDisplayed());
        System.out.println("Enabled: " + element.isEnabled());
        System.out.println("Location: " + element.getLocation());
        System.out.println("Size: " + element.getSize());
        System.out.println("Draggable attr: " + element.getAttribute("draggable"));
        System.out.println("Class: " + element.getAttribute("class"));
        System.out.println("Cursor: " + element.getCssValue("cursor"));
        System.out.println("Pointer-events: " + element.getCssValue("pointer-events"));
        System.out.println("Z-index: " + element.getCssValue("z-index"));
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        TroubleshootingDragDrop demo = new TroubleshootingDragDrop();

        try {
            demo.driver.get("https://jqueryui.com/droppable/");
            demo.driver.switchTo().frame(0);

            WebElement source = demo.driver.findElement(By.id("draggable"));
            WebElement target = demo.driver.findElement(By.id("droppable"));

            // Diagnose elements
            System.out.println("SOURCE ELEMENT:");
            demo.diagnoseElement(source);

            System.out.println("\nTARGET ELEMENT:");
            demo.diagnoseElement(target);

            // Check if draggable
            demo.isElementDraggable(source);

            // Ensure visible
            demo.ensureElementVisible(source);
            demo.ensureElementVisible(target);

            // Check for overlapping
            demo.checkForOverlappingElements(source);

            // Try multiple methods
            demo.tryMultipleMethods(source, target);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

### Drag and Drop Not Working

Common issues and solutions:

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import java.time.Duration;

public class DragDropSolutions {

    private WebDriver driver;
    private Actions actions;
    private JavascriptExecutor js;

    public DragDropSolutions() {
        // Configure ChromeOptions for better compatibility
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-blink-features=AutomationControlled");

        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
        js = (JavascriptExecutor) driver;
    }

    /**
     * Solution 1: Add pauses between actions
     */
    public void dragDropWithPauses(WebElement source, WebElement target) {
        System.out.println("Solution 1: Using pauses");
        actions.clickAndHold(source)
               .pause(Duration.ofMillis(300))
               .moveToElement(target)
               .pause(Duration.ofMillis(300))
               .release()
               .pause(Duration.ofMillis(300))
               .perform();
    }

    /**
     * Solution 2: Move to element center explicitly
     */
    public void dragDropToCenter(WebElement source, WebElement target) {
        System.out.println("Solution 2: Move to center");
        actions.clickAndHold(source)
               .moveToElement(target, target.getSize().getWidth() / 2,
                             target.getSize().getHeight() / 2)
               .release()
               .perform();
    }

    /**
     * Solution 3: Use intermediate steps
     */
    public void dragDropWithIntermediateSteps(WebElement source, WebElement target) {
        System.out.println("Solution 3: Intermediate steps");

        int sourceX = source.getLocation().getX();
        int sourceY = source.getLocation().getY();
        int targetX = target.getLocation().getX();
        int targetY = target.getLocation().getY();

        int deltaX = targetX - sourceX;
        int deltaY = targetY - sourceY;

        // Move in 4 steps
        actions.clickAndHold(source)
               .pause(Duration.ofMillis(200))
               .moveByOffset(deltaX / 4, deltaY / 4)
               .pause(Duration.ofMillis(200))
               .moveByOffset(deltaX / 4, deltaY / 4)
               .pause(Duration.ofMillis(200))
               .moveByOffset(deltaX / 4, deltaY / 4)
               .pause(Duration.ofMillis(200))
               .moveByOffset(deltaX / 4, deltaY / 4)
               .pause(Duration.ofMillis(200))
               .release()
               .perform();
    }

    /**
     * Solution 4: Scroll before drag
     */
    public void dragDropWithScroll(WebElement source, WebElement target) {
        System.out.println("Solution 4: Scroll before drag");

        // Scroll source into view
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", source);
        try { Thread.sleep(500); } catch (InterruptedException e) {}

        // Scroll target into view
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", target);
        try { Thread.sleep(500); } catch (InterruptedException e) {}

        // Perform drag and drop
        actions.dragAndDrop(source, target).perform();
    }

    /**
     * Solution 5: Use Actions.build().perform()
     */
    public void dragDropWithBuild(WebElement source, WebElement target) {
        System.out.println("Solution 5: Using build()");
        actions.clickAndHold(source)
               .moveToElement(target)
               .release()
               .build()
               .perform();
    }

    /**
     * Solution 6: Wait for elements to be ready
     */
    public void dragDropWithWait(WebElement source, WebElement target)
            throws InterruptedException {
        System.out.println("Solution 6: Wait for elements");

        // Wait for source to be ready
        Thread.sleep(500);

        // Ensure elements are in viewport
        js.executeScript("arguments[0].scrollIntoView(true);", source);
        Thread.sleep(300);
        js.executeScript("arguments[0].scrollIntoView(true);", target);
        Thread.sleep(300);

        // Perform action
        actions.dragAndDrop(source, target).perform();

        // Wait for action to complete
        Thread.sleep(1000);
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        DragDropSolutions demo = new DragDropSolutions();

        try {
            demo.driver.get("https://jqueryui.com/droppable/");
            demo.driver.switchTo().frame(0);

            WebElement source = demo.driver.findElement(By.id("draggable"));
            WebElement target = demo.driver.findElement(By.id("droppable"));

            // Try solution 6 (recommended)
            demo.dragDropWithWait(source, target);

            System.out.println("Result: " + target.getText());

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

### HTML5 Drag and Drop Workarounds

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;

public class HTML5Workarounds {

    private WebDriver driver;
    private JavascriptExecutor js;

    // DnD JavaScript simulator
    private static final String DND_JAVASCRIPT =
        "function simulateDragDrop(sourceNode, destinationNode) {" +
        "    var EVENT_TYPES = {" +
        "        DRAG_END: 'dragend'," +
        "        DRAG_START: 'dragstart'," +
        "        DROP: 'drop'" +
        "    };" +
        "" +
        "    function createCustomEvent(type) {" +
        "        var event = new CustomEvent('CustomEvent');" +
        "        event.initCustomEvent(type, true, true, null);" +
        "        event.dataTransfer = {" +
        "            data: {}," +
        "            setData: function(type, val) {" +
        "                this.data[type] = val;" +
        "            }," +
        "            getData: function(type) {" +
        "                return this.data[type];" +
        "            }" +
        "        };" +
        "        return event;" +
        "    }" +
        "" +
        "    function dispatchEvent(node, type, event) {" +
        "        if (node.dispatchEvent) {" +
        "            return node.dispatchEvent(event);" +
        "        }" +
        "        if (node.fireEvent) {" +
        "            return node.fireEvent('on' + type, event);" +
        "        }" +
        "    }" +
        "" +
        "    var event = createCustomEvent(EVENT_TYPES.DRAG_START);" +
        "    dispatchEvent(sourceNode, EVENT_TYPES.DRAG_START, event);" +
        "" +
        "    var dropEvent = createCustomEvent(EVENT_TYPES.DROP);" +
        "    dropEvent.dataTransfer = event.dataTransfer;" +
        "    dispatchEvent(destinationNode, EVENT_TYPES.DROP, dropEvent);" +
        "" +
        "    var dragEndEvent = createCustomEvent(EVENT_TYPES.DRAG_END);" +
        "    dragEndEvent.dataTransfer = event.dataTransfer;" +
        "    dispatchEvent(sourceNode, EVENT_TYPES.DRAG_END, dragEndEvent);" +
        "}" +
        "" +
        "simulateDragDrop(arguments[0], arguments[1]);";

    public HTML5Workarounds() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        js = (JavascriptExecutor) driver;
    }

    /**
     * HTML5 drag and drop using JavaScript simulator
     */
    public void html5DragAndDrop(WebElement source, WebElement target) {
        js.executeScript(DND_JAVASCRIPT, source, target);
    }

    /**
     * Alternative HTML5 workaround with jQuery
     */
    public void html5DragDropWithJQuery(WebElement source, WebElement target) {
        String jQueryScript =
            "var source = arguments[0];" +
            "var target = arguments[1];" +
            "" +
            "if (typeof jQuery !== 'undefined') {" +
            "    var $source = $(source);" +
            "    var $target = $(target);" +
            "    " +
            "    var dragStartEvent = $.Event('dragstart');" +
            "    $source.trigger(dragStartEvent);" +
            "    " +
            "    var dropEvent = $.Event('drop');" +
            "    $target.trigger(dropEvent);" +
            "    " +
            "    var dragEndEvent = $.Event('dragend');" +
            "    $source.trigger(dragEndEvent);" +
            "} else {" +
            "    throw new Error('jQuery is not available');" +
            "}";

        try {
            js.executeScript(jQueryScript, source, target);
        } catch (Exception e) {
            System.out.println("jQuery not available, using alternative method");
            html5DragAndDrop(source, target);
        }
    }

    /**
     * Test HTML5 workaround
     */
    public void testHTML5Workaround() throws InterruptedException {
        // Create HTML5 drag and drop test page
        String html = "data:text/html," +
            "<html><head><style>" +
            ".container { width: 200px; height: 200px; border: 2px solid black; " +
            "margin: 20px; padding: 10px; display: inline-block; }" +
            "#source { background-color: #e0e0e0; }" +
            "#target { background-color: #c0c0c0; }" +
            ".draggable { background-color: #4CAF50; color: white; " +
            "padding: 20px; margin: 10px; cursor: move; }" +
            "</style></head><body>" +
            "<div class='container' id='source'>" +
            "  <div id='drag1' class='draggable' draggable='true'>Drag Me</div>" +
            "</div>" +
            "<div class='container' id='target' ondrop='drop(event)' " +
            "ondragover='allowDrop(event)'>Drop Here</div>" +
            "<div id='result'></div>" +
            "<script>" +
            "function allowDrop(ev) {" +
            "    ev.preventDefault();" +
            "}" +
            "function drag(ev) {" +
            "    ev.dataTransfer.setData('text', ev.target.id);" +
            "}" +
            "function drop(ev) {" +
            "    ev.preventDefault();" +
            "    var data = ev.dataTransfer.getData('text');" +
            "    ev.target.appendChild(document.getElementById(data));" +
            "    document.getElementById('result').innerHTML = 'Dropped!';" +
            "}" +
            "document.getElementById('drag1').addEventListener('dragstart', drag);" +
            "</script></body></html>";

        driver.get(html);
        Thread.sleep(1000);

        WebElement source = driver.findElement(By.id("drag1"));
        WebElement target = driver.findElement(By.id("target"));

        System.out.println("Before: Source parent = " +
            source.findElement(By.xpath("..")).getAttribute("id"));

        // Use JavaScript workaround
        html5DragAndDrop(source, target);
        Thread.sleep(1000);

        // Verify
        source = driver.findElement(By.id("drag1"));
        WebElement result = driver.findElement(By.id("result"));

        System.out.println("After: Source parent = " +
            source.findElement(By.xpath("..")).getAttribute("id"));
        System.out.println("Result: " + result.getText());
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        HTML5Workarounds demo = new HTML5Workarounds();

        try {
            demo.testHTML5Workaround();
            System.out.println("HTML5 workaround test completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

---

## JavaScript Workarounds for Drag and Drop

When Selenium Actions fail, JavaScript provides a reliable alternative.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.time.Duration;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

public class JavaScriptDragDropWorkarounds {

    private WebDriver driver;
    private JavascriptExecutor js;

    public JavaScriptDragDropWorkarounds() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        js = (JavascriptExecutor) driver;
    }

    /**
     * Simple JavaScript drag and drop
     */
    public void jsDragAndDrop(WebElement source, WebElement target) {
        String script =
            "function createEvent(typeOfEvent) {" +
            "    var event = document.createEvent('CustomEvent');" +
            "    event.initCustomEvent(typeOfEvent, true, true, null);" +
            "    event.dataTransfer = {" +
            "        data: {}," +
            "        setData: function(key, value) {" +
            "            this.data[key] = value;" +
            "        }," +
            "        getData: function(key) {" +
            "            return this.data[key];" +
            "        }" +
            "    };" +
            "    return event;" +
            "}" +
            "" +
            "var source = arguments[0];" +
            "var target = arguments[1];" +
            "" +
            "var dragStartEvent = createEvent('dragstart');" +
            "source.dispatchEvent(dragStartEvent);" +
            "" +
            "var dropEvent = createEvent('drop');" +
            "target.dispatchEvent(dropEvent);" +
            "" +
            "var dragEndEvent = createEvent('dragend');" +
            "source.dispatchEvent(dragEndEvent);";

        js.executeScript(script, source, target);
    }

    /**
     * Simulate mouse events for drag and drop
     */
    public void jsSimulateMouseDragDrop(WebElement source, WebElement target) {
        String script =
            "var source = arguments[0];" +
            "var target = arguments[1];" +
            "" +
            "var mouseDown = new MouseEvent('mousedown', {" +
            "    bubbles: true," +
            "    cancelable: true," +
            "    view: window" +
            "});" +
            "" +
            "var mouseUp = new MouseEvent('mouseup', {" +
            "    bubbles: true," +
            "    cancelable: true," +
            "    view: window" +
            "});" +
            "" +
            "source.dispatchEvent(mouseDown);" +
            "target.dispatchEvent(mouseUp);";

        js.executeScript(script, source, target);
    }

    /**
     * Move element using JavaScript (DOM manipulation)
     */
    public void jsMoveElement(WebElement source, WebElement target) {
        String script =
            "var source = arguments[0];" +
            "var target = arguments[1];" +
            "target.appendChild(source);";

        js.executeScript(script, source, target);
    }

    /**
     * Drag and drop with coordinates
     */
    public void jsDragToCoordinates(WebElement element, int x, int y) {
        String script =
            "var element = arguments[0];" +
            "var x = arguments[1];" +
            "var y = arguments[2];" +
            "" +
            "element.style.position = 'absolute';" +
            "element.style.left = x + 'px';" +
            "element.style.top = y + 'px';";

        js.executeScript(script, element, x, y);
    }

    /**
     * Comprehensive JavaScript drag and drop simulator
     */
    public void jsCompleteDragDrop(WebElement source, WebElement target) {
        String script =
            "var source = arguments[0];" +
            "var target = arguments[1];" +
            "" +
            "var sourceRect = source.getBoundingClientRect();" +
            "var targetRect = target.getBoundingClientRect();" +
            "" +
            "var events = [" +
            "    new MouseEvent('mousedown', {" +
            "        bubbles: true," +
            "        cancelable: true," +
            "        clientX: sourceRect.left + sourceRect.width / 2," +
            "        clientY: sourceRect.top + sourceRect.height / 2" +
            "    })," +
            "    new MouseEvent('mousemove', {" +
            "        bubbles: true," +
            "        cancelable: true," +
            "        clientX: targetRect.left + targetRect.width / 2," +
            "        clientY: targetRect.top + targetRect.height / 2" +
            "    })," +
            "    new MouseEvent('mouseup', {" +
            "        bubbles: true," +
            "        cancelable: true," +
            "        clientX: targetRect.left + targetRect.width / 2," +
            "        clientY: targetRect.top + targetRect.height / 2" +
            "    })" +
            "];" +
            "" +
            "events.forEach(function(event) {" +
            "    if (event.type === 'mousedown' || event.type === 'mousemove') {" +
            "        source.dispatchEvent(event);" +
            "    } else {" +
            "        target.dispatchEvent(event);" +
            "    }" +
            "});";

        js.executeScript(script, source, target);
    }

    /**
     * Example: Using external drag and drop helper
     */
    public void jsUsingExternalHelper(WebElement source, WebElement target) {
        // Using external JavaScript library (e.g., from GitHub)
        String helperScript =
            "(function() {" +
            "    var source = arguments[0];" +
            "    var target = arguments[1];" +
            "    " +
            "    function simulateDragDrop(sourceNode, destNode) {" +
            "        var dragStartEvent = createEvent('dragstart');" +
            "        sourceNode.dispatchEvent(dragStartEvent);" +
            "        " +
            "        var dropEvent = createEvent('drop');" +
            "        dropEvent.dataTransfer = dragStartEvent.dataTransfer;" +
            "        destNode.dispatchEvent(dropEvent);" +
            "        " +
            "        var dragEndEvent = createEvent('dragend');" +
            "        dragEndEvent.dataTransfer = dragStartEvent.dataTransfer;" +
            "        sourceNode.dispatchEvent(dragEndEvent);" +
            "    }" +
            "    " +
            "    function createEvent(eventType) {" +
            "        var event = document.createEvent('DragEvent');" +
            "        event.initEvent(eventType, true, true);" +
            "        event.dataTransfer = {" +
            "            data: {}," +
            "            setData: function(key, value) {" +
            "                this.data[key] = value;" +
            "            }," +
            "            getData: function(key) {" +
            "                return this.data[key];" +
            "            }" +
            "        };" +
            "        return event;" +
            "    }" +
            "    " +
            "    simulateDragDrop(source, target);" +
            "})(arguments[0], arguments[1]);";

        js.executeScript(helperScript, source, target);
    }

    /**
     * Test all JavaScript methods
     */
    public void testAllJSMethods() throws InterruptedException {
        driver.get("https://jqueryui.com/droppable/");
        driver.switchTo().frame(0);

        WebElement source = driver.findElement(By.id("draggable"));
        WebElement target = driver.findElement(By.id("droppable"));

        System.out.println("Testing JavaScript drag and drop methods...");
        System.out.println("Initial target text: " + target.getText());

        // Try Method 1
        jsDragAndDrop(source, target);
        Thread.sleep(1000);
        System.out.println("After JS method: " + target.getText());

        driver.switchTo().defaultContent();
    }

    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }

    public static void main(String[] args) {
        JavaScriptDragDropWorkarounds demo = new JavaScriptDragDropWorkarounds();

        try {
            demo.testAllJSMethods();
            System.out.println("\nJavaScript workaround tests completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            demo.close();
        }
    }
}
```

---

## Best Practices

1. **Always Verify Elements First**
   - Check if elements are displayed and enabled
   - Ensure elements are in the viewport
   - Verify draggable attributes

2. **Use Explicit Waits**
   - Wait for elements to be ready before dragging
   - Wait for animations to complete
   - Use ExpectedConditions for better synchronization

3. **Handle Different Implementations**
   - Be prepared to use multiple methods
   - Have JavaScript fallbacks ready
   - Test on different browsers

4. **Add Appropriate Pauses**
   - Use pauses between drag actions
   - Allow time for visual feedback
   - Wait for drop operations to complete

5. **Scroll Elements Into View**
   - Ensure elements are visible before interacting
   - Use JavaScript to scroll when needed
   - Center elements in viewport

6. **Error Handling**
   - Implement try-catch blocks
   - Provide meaningful error messages
   - Log failure details for debugging

7. **Browser Compatibility**
   - Test on multiple browsers
   - Use browser-specific workarounds if needed
   - Document known limitations

8. **Performance Considerations**
   - Minimize unnecessary waits
   - Use efficient locators
   - Optimize action chains

9. **Maintainability**
   - Create reusable drag and drop methods
   - Document complex scenarios
   - Use page object pattern

10. **Testing and Verification**
    - Always verify drag and drop success
    - Check element positions after dragging
    - Validate application state changes

---

## Practice Exercises

### Exercise 1: Basic Drag and Drop
Create a test that drags an element to a drop zone and verifies the drop was successful.

```java
// Your implementation here
```

### Exercise 2: Slider Manipulation
Write a test that sets a slider to 75% and verifies the value.

```java
// Your implementation here
```

### Exercise 3: Sortable List Reordering
Create a test that reverses the order of a sortable list.

```java
// Your implementation here
```

### Exercise 4: Resizable Element
Write a test that resizes an element to specific dimensions and verifies the size.

```java
// Your implementation here
```

### Exercise 5: Connected Lists
Create a test that moves items between two connected sortable lists.

```java
// Your implementation here
```

### Exercise 6: HTML5 Drag and Drop
Implement a test for HTML5 drag and drop using JavaScript workaround.

```java
// Your implementation here
```

---

## Interview Questions

### Basic Level

1. **What is drag and drop in Selenium?**
   - Explain the concept and use cases

2. **Which class is used for drag and drop operations?**
   - Actions class and its methods

3. **What is the difference between dragAndDrop() and dragAndDropBy()?**
   - Target element vs. offset-based

4. **How do you perform a simple drag and drop?**
   - Code example with dragAndDrop()

5. **What are the key methods in Actions class for drag and drop?**
   - clickAndHold(), moveToElement(), release(), dragAndDrop(), dragAndDropBy()

### Intermediate Level

6. **How do you move a slider to a specific value?**
   - Explain offset calculation and implementation

7. **What is the difference between perform() and build().perform()?**
   - When to use each approach

8. **How do you handle sortable lists in Selenium?**
   - Techniques for reordering list items

9. **How do you resize an element using Selenium?**
   - Using resizable handles and moveByOffset()

10. **What challenges do you face with HTML5 drag and drop?**
    - Explain why Actions may not work and solutions

### Advanced Level

11. **How do you implement drag and drop across iframes?**
    - Challenges and workarounds

12. **What JavaScript workarounds exist for drag and drop?**
    - Explain multiple JS approaches

13. **How do you troubleshoot when drag and drop doesn't work?**
    - Diagnostic steps and solutions

14. **How do you handle drag and drop with animation?**
    - Timing and synchronization strategies

15. **What are best practices for drag and drop automation?**
    - Comprehensive list of recommendations

---

## Key Takeaways

1. **Actions Class is Essential**: Master the Actions class for complex mouse interactions
2. **Multiple Methods Available**: dragAndDrop(), clickAndHold(), dragAndDropBy()
3. **Sliders Require Offset Calculations**: Understand how to calculate and apply offsets
4. **HTML5 Needs Special Handling**: Standard Actions may not work with HTML5 drag and drop
5. **JavaScript is a Powerful Fallback**: Always have JS workarounds ready
6. **Timing is Critical**: Use appropriate pauses and waits
7. **Element Visibility Matters**: Ensure elements are in viewport
8. **Different Browsers, Different Behaviors**: Test across browsers
9. **Verification is Key**: Always verify drag and drop success
10. **Practice Makes Perfect**: Regular practice with different scenarios builds expertise

---

## Navigation
- [Previous: Day 8 - Double Click and Context Click](./day08_double_click_context_click.md)
- [Next: Day 10 - Keyboard Actions](./day10_keyboard_actions.md)
- [Week 2 Overview](./README.md)
- [Course Home](../../README.md)

---

**Remember**: Drag and drop operations are complex interactions that require patience and practice. Master these techniques, and you'll be able to automate even the most challenging user interactions!

Happy Learning!
