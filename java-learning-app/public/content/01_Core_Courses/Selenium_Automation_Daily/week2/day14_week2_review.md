# Day 14: Week 2 Review and Mini Project

[← Back to Selenium Course](../README.md) | [← Day 13](../week2/day13_popups_shadow_dom.md) | [Day 15 →](../week3/day15_page_object_model.md)

## Table of Contents
- [Learning Objectives](#learning-objectives)
- [Introduction - Week 2 Recap](#introduction---week-2-recap)
- [Week 2 Comprehensive Review](#week-2-comprehensive-review)
  - [Day 8: Actions Class (Mouse and Keyboard)](#day-8-actions-class-mouse-and-keyboard)
  - [Day 9: Drag and Drop, Sliders](#day-9-drag-and-drop-sliders)
  - [Day 10: Web Tables](#day-10-web-tables)
  - [Day 11: File Upload/Download](#day-11-file-uploaddownload)
  - [Day 12: JavaScript Executor Advanced](#day-12-javascript-executor-advanced)
  - [Day 13: Pop-ups, Shadow DOM, Advanced Scenarios](#day-13-pop-ups-shadow-dom-advanced-scenarios)
- [Key Concepts Summary](#key-concepts-summary)
- [Integration Points](#integration-points)
- [Common Patterns and Best Practices](#common-patterns-and-best-practices)
- [Mini Project: E-commerce Test Automation](#mini-project-e-commerce-test-automation)
- [Additional Practice Projects](#additional-practice-projects)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
- [Performance Optimization Tips](#performance-optimization-tips)
- [Preparing for Week 3](#preparing-for-week-3)
- [Week 2 Interview Questions](#week-2-interview-questions)
- [Practice Exercises](#practice-exercises)
- [Key Takeaways](#key-takeaways)

---

## Learning Objectives

By the end of this review session, you will be able to:

1. **Consolidate Week 2 Knowledge**: Review and solidify understanding of all advanced Selenium concepts covered in Week 2
2. **Apply Integration**: Understand how different concepts work together in real-world scenarios
3. **Build Complete Projects**: Create end-to-end test automation projects combining multiple techniques
4. **Identify Best Practices**: Recognize and apply industry-standard patterns and practices
5. **Troubleshoot Effectively**: Debug common issues encountered during Week 2
6. **Prepare for Advanced Topics**: Build a strong foundation for Week 3 concepts

---

## Introduction - Week 2 Recap

### What We Learned This Week

Week 2 focused on **advanced Selenium interactions** and **complex web element handling**. We moved beyond basic element interactions to explore sophisticated automation techniques that are essential for real-world test automation.

### Week 2 Journey

```
Day 8  → Actions Class: Mouse & Keyboard Operations
Day 9  → Drag & Drop, Sliders, Complex Interactions
Day 10 → Web Tables: Reading, Validation, Dynamic Tables
Day 11 → File Upload/Download: Multiple Techniques
Day 12 → JavaScript Executor: Advanced DOM Manipulation
Day 13 → Pop-ups, Shadow DOM, iFrames
Day 14 → Week 2 Review & Mini Project (Today)
```

### Skills Progression

```
Week 1: Foundation
├── Browser setup
├── Element location
├── Basic interactions
└── Waits and synchronization

Week 2: Advanced Interactions ← YOU ARE HERE
├── Complex mouse/keyboard actions
├── Dynamic content handling
├── JavaScript integration
└── Advanced element scenarios

Week 3: Framework Development (Coming Next)
├── Page Object Model
├── Test frameworks
├── Data-driven testing
└── Reporting and logging
```

---

## Week 2 Comprehensive Review

### Day 8: Actions Class (Mouse and Keyboard)

#### Core Concepts

The Actions class provides advanced user interactions that go beyond simple click and sendKeys operations.

#### Key Methods Review

**Mouse Actions:**
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class ActionsClassReview {

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://example.com");

        Actions actions = new Actions(driver);

        // 1. Mouse Hover (moveToElement)
        WebElement menu = driver.findElement(By.id("menuItem"));
        actions.moveToElement(menu).perform();

        // 2. Right Click (contextClick)
        WebElement element = driver.findElement(By.id("rightClickArea"));
        actions.contextClick(element).perform();

        // 3. Double Click (doubleClick)
        WebElement button = driver.findElement(By.id("doubleClickBtn"));
        actions.doubleClick(button).perform();

        // 4. Click and Hold (clickAndHold)
        WebElement dragElement = driver.findElement(By.id("draggable"));
        actions.clickAndHold(dragElement).perform();

        // 5. Release (release)
        actions.release().perform();

        driver.quit();
    }
}
```

**Keyboard Actions:**
```java
import org.openqa.selenium.Keys;

public class KeyboardActionsReview {

    public static void demonstrateKeyboardActions(WebDriver driver) {
        Actions actions = new Actions(driver);

        // 1. Key Down and Key Up
        WebElement textField = driver.findElement(By.id("textInput"));

        // Select all text (Ctrl+A / Cmd+A)
        actions.keyDown(Keys.CONTROL)
               .sendKeys("a")
               .keyUp(Keys.CONTROL)
               .perform();

        // 2. Copy and Paste
        actions.keyDown(Keys.CONTROL)
               .sendKeys("c")
               .keyUp(Keys.CONTROL)
               .perform();

        WebElement pasteField = driver.findElement(By.id("pasteInput"));
        actions.click(pasteField)
               .keyDown(Keys.CONTROL)
               .sendKeys("v")
               .keyUp(Keys.CONTROL)
               .perform();

        // 3. Multiple Keys
        actions.keyDown(Keys.SHIFT)
               .sendKeys("hello world")
               .keyUp(Keys.SHIFT)
               .perform();

        // 4. Special Keys
        actions.sendKeys(Keys.ENTER).perform();
        actions.sendKeys(Keys.TAB).perform();
        actions.sendKeys(Keys.ESCAPE).perform();
    }
}
```

**Method Chaining:**
```java
public class ActionsChaining {

    public static void demonstrateChaining(WebDriver driver) {
        Actions actions = new Actions(driver);

        // Complex action sequence
        WebElement source = driver.findElement(By.id("source"));
        WebElement target = driver.findElement(By.id("target"));

        actions.moveToElement(source)
               .clickAndHold()
               .moveToElement(target)
               .release()
               .perform();

        // Multiple actions in sequence
        actions.click(driver.findElement(By.id("button1")))
               .pause(1000)
               .click(driver.findElement(By.id("button2")))
               .pause(1000)
               .click(driver.findElement(By.id("button3")))
               .perform();
    }
}
```

#### Common Use Cases

1. **Hover Menus**: Multi-level dropdown navigation
2. **Context Menus**: Right-click operations
3. **Keyboard Shortcuts**: Application hotkeys
4. **Text Selection**: Complex text manipulation
5. **Drag Operations**: Moving elements

---

### Day 9: Drag and Drop, Sliders

#### Drag and Drop Techniques

**Method 1: dragAndDrop()**
```java
public class DragAndDropReview {

    // Simple drag and drop
    public static void simpleDragAndDrop(WebDriver driver) {
        Actions actions = new Actions(driver);

        WebElement source = driver.findElement(By.id("draggable"));
        WebElement target = driver.findElement(By.id("droppable"));

        actions.dragAndDrop(source, target).perform();
    }

    // Drag and drop with offset
    public static void dragAndDropByOffset(WebDriver driver) {
        Actions actions = new Actions(driver);

        WebElement source = driver.findElement(By.id("draggable"));

        actions.dragAndDropBy(source, 200, 100).perform();
    }

    // Manual drag and drop (most reliable)
    public static void manualDragAndDrop(WebDriver driver) {
        Actions actions = new Actions(driver);

        WebElement source = driver.findElement(By.id("draggable"));
        WebElement target = driver.findElement(By.id("droppable"));

        actions.clickAndHold(source)
               .pause(500)
               .moveToElement(target)
               .pause(500)
               .release()
               .perform();
    }
}
```

#### Slider Handling

```java
public class SliderReview {

    // Move slider by offset
    public static void moveSliderByOffset(WebDriver driver) {
        Actions actions = new Actions(driver);

        WebElement slider = driver.findElement(By.id("slider"));

        // Move right by 50 pixels
        actions.dragAndDropBy(slider, 50, 0).perform();

        // Move left by 30 pixels
        actions.dragAndDropBy(slider, -30, 0).perform();
    }

    // Move slider to specific value
    public static void moveSliderToValue(WebDriver driver, int targetValue) {
        Actions actions = new Actions(driver);

        WebElement slider = driver.findElement(By.id("slider"));

        // Get slider attributes
        int min = Integer.parseInt(slider.getAttribute("min"));
        int max = Integer.parseInt(slider.getAttribute("max"));
        int current = Integer.parseInt(slider.getAttribute("value"));

        // Calculate offset
        int sliderWidth = slider.getSize().getWidth();
        int offset = (int) ((targetValue - current) * sliderWidth / (max - min));

        actions.dragAndDropBy(slider, offset, 0).perform();
    }

    // Range slider (two handles)
    public static void handleRangeSlider(WebDriver driver) {
        Actions actions = new Actions(driver);

        WebElement minHandle = driver.findElement(By.id("minHandle"));
        WebElement maxHandle = driver.findElement(By.id("maxHandle"));

        // Set minimum value
        actions.dragAndDropBy(minHandle, 30, 0).perform();

        // Set maximum value
        actions.dragAndDropBy(maxHandle, -50, 0).perform();
    }
}
```

#### Complex Interactions

```java
public class ComplexInteractions {

    // Sortable list
    public static void sortListItems(WebDriver driver) {
        Actions actions = new Actions(driver);

        WebElement item1 = driver.findElement(By.xpath("//li[text()='Item 1']"));
        WebElement item3 = driver.findElement(By.xpath("//li[text()='Item 3']"));

        // Drag Item 1 below Item 3
        actions.clickAndHold(item1)
               .moveToElement(item3)
               .moveByOffset(0, 30)
               .release()
               .perform();
    }

    // Resizable elements
    public static void resizeElement(WebDriver driver) {
        Actions actions = new Actions(driver);

        WebElement resizeHandle = driver.findElement(
            By.cssSelector(".ui-resizable-se")
        );

        actions.clickAndHold(resizeHandle)
               .moveByOffset(100, 100)
               .release()
               .perform();
    }
}
```

---

### Day 10: Web Tables

#### Table Structure Understanding

```java
public class WebTableReview {

    // Basic table structure
    /*
    <table id="dataTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John</td>
                <td>30</td>
                <td>New York</td>
            </tr>
        </tbody>
    </table>
    */

    // Get all rows
    public static List<WebElement> getAllRows(WebDriver driver) {
        return driver.findElements(By.xpath("//table[@id='dataTable']//tbody/tr"));
    }

    // Get all columns in a row
    public static List<WebElement> getColumnsInRow(WebDriver driver, int rowIndex) {
        String xpath = String.format(
            "//table[@id='dataTable']//tbody/tr[%d]/td",
            rowIndex
        );
        return driver.findElements(By.xpath(xpath));
    }

    // Get specific cell value
    public static String getCellValue(WebDriver driver, int row, int col) {
        String xpath = String.format(
            "//table[@id='dataTable']//tbody/tr[%d]/td[%d]",
            row, col
        );
        return driver.findElement(By.xpath(xpath)).getText();
    }
}
```

#### Advanced Table Operations

```java
public class AdvancedTableOperations {

    // Search in table
    public static boolean searchInTable(WebDriver driver, String searchText) {
        List<WebElement> rows = driver.findElements(
            By.xpath("//table[@id='dataTable']//tbody/tr")
        );

        for (WebElement row : rows) {
            if (row.getText().contains(searchText)) {
                return true;
            }
        }
        return false;
    }

    // Get row count
    public static int getRowCount(WebDriver driver) {
        return driver.findElements(
            By.xpath("//table[@id='dataTable']//tbody/tr")
        ).size();
    }

    // Get column count
    public static int getColumnCount(WebDriver driver) {
        return driver.findElements(
            By.xpath("//table[@id='dataTable']//thead/tr/th")
        ).size();
    }

    // Extract table to 2D array
    public static String[][] extractTableData(WebDriver driver) {
        int rowCount = getRowCount(driver);
        int colCount = getColumnCount(driver);

        String[][] tableData = new String[rowCount][colCount];

        for (int i = 1; i <= rowCount; i++) {
            for (int j = 1; j <= colCount; j++) {
                String xpath = String.format(
                    "//table[@id='dataTable']//tbody/tr[%d]/td[%d]",
                    i, j
                );
                tableData[i-1][j-1] = driver.findElement(
                    By.xpath(xpath)
                ).getText();
            }
        }

        return tableData;
    }

    // Click checkbox in specific row
    public static void selectRowByName(WebDriver driver, String name) {
        String xpath = String.format(
            "//table[@id='dataTable']//tbody/tr[td[text()='%s']]//input[@type='checkbox']",
            name
        );
        driver.findElement(By.xpath(xpath)).click();
    }

    // Sort table by column
    public static void sortTableByColumn(WebDriver driver, String columnName) {
        String xpath = String.format(
            "//table[@id='dataTable']//thead/tr/th[text()='%s']",
            columnName
        );
        driver.findElement(By.xpath(xpath)).click();
    }
}
```

#### Dynamic Table Handling

```java
public class DynamicTableHandling {

    // Handle pagination
    public static void navigatePagination(WebDriver driver, int pageNumber) {
        String xpath = String.format(
            "//ul[@class='pagination']//a[text()='%d']",
            pageNumber
        );
        driver.findElement(By.xpath(xpath)).click();

        // Wait for table to load
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.stalenessOf(
            driver.findElement(By.xpath("//table[@id='dataTable']//tbody/tr[1]"))
        ));
    }

    // Search across all pages
    public static boolean searchAcrossPages(WebDriver driver, String searchText) {
        boolean found = false;

        while (true) {
            if (searchInTable(driver, searchText)) {
                found = true;
                break;
            }

            // Check if next page exists
            List<WebElement> nextButton = driver.findElements(
                By.xpath("//ul[@class='pagination']//a[text()='Next']")
            );

            if (nextButton.isEmpty() ||
                !nextButton.get(0).isEnabled()) {
                break;
            }

            nextButton.get(0).click();
            Thread.sleep(1000); // Wait for page load
        }

        return found;
    }

    // Extract data from all pages
    public static List<String[]> extractAllPages(WebDriver driver) {
        List<String[]> allData = new ArrayList<>();

        while (true) {
            String[][] pageData = extractTableData(driver);
            allData.addAll(Arrays.asList(pageData));

            // Check for next page
            List<WebElement> nextButton = driver.findElements(
                By.xpath("//ul[@class='pagination']//a[text()='Next']")
            );

            if (nextButton.isEmpty() ||
                !nextButton.get(0).isEnabled()) {
                break;
            }

            nextButton.get(0).click();
            Thread.sleep(1000);
        }

        return allData;
    }
}
```

---

### Day 11: File Upload/Download

#### File Upload Techniques

**Method 1: sendKeys() - Simplest Approach**
```java
public class FileUploadReview {

    public static void uploadUsingSendKeys(WebDriver driver) {
        // Works when input type="file" is present
        WebElement uploadElement = driver.findElement(By.id("fileUpload"));

        String filePath = "/Users/username/Documents/testfile.pdf";
        uploadElement.sendKeys(filePath);

        // Click upload button if needed
        driver.findElement(By.id("uploadButton")).click();
    }
}
```

**Method 2: Robot Class**
```java
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;

public class RobotClassUpload {

    public static void uploadUsingRobot(WebDriver driver, String filePath)
        throws Exception {

        // Click the upload button to open dialog
        driver.findElement(By.id("uploadButton")).click();

        Thread.sleep(2000); // Wait for dialog to open

        // Copy file path to clipboard
        StringSelection selection = new StringSelection(filePath);
        Toolkit.getDefaultToolkit()
               .getSystemClipboard()
               .setContents(selection, null);

        // Use Robot class
        Robot robot = new Robot();

        // Paste the file path (Ctrl+V)
        robot.keyPress(KeyEvent.VK_CONTROL);
        robot.keyPress(KeyEvent.VK_V);
        robot.keyRelease(KeyEvent.VK_V);
        robot.keyRelease(KeyEvent.VK_CONTROL);

        Thread.sleep(1000);

        // Press Enter
        robot.keyPress(KeyEvent.VK_ENTER);
        robot.keyRelease(KeyEvent.VK_ENTER);
    }
}
```

**Method 3: AutoIt (Windows)**
```java
public class AutoItUpload {

    public static void uploadUsingAutoIt(WebDriver driver, String filePath)
        throws Exception {

        // Click upload button
        driver.findElement(By.id("uploadButton")).click();

        Thread.sleep(2000);

        // Execute AutoIt script
        Runtime.getRuntime().exec("C:\\AutoIt\\FileUpload.exe " + filePath);

        Thread.sleep(3000);
    }
}

// AutoIt Script (FileUpload.au3):
/*
ControlFocus("Open", "", "Edit1")
ControlSetText("Open", "", "Edit1", $CmdLine[1])
ControlClick("Open", "", "Button1")
*/
```

#### File Download Handling

```java
public class FileDownloadReview {

    // Configure Chrome for download
    public static WebDriver setupChromeForDownload(String downloadPath) {
        HashMap<String, Object> chromePrefs = new HashMap<>();
        chromePrefs.put("download.default_directory", downloadPath);
        chromePrefs.put("download.prompt_for_download", false);
        chromePrefs.put("plugins.always_open_pdf_externally", true);

        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("prefs", chromePrefs);

        return new ChromeDriver(options);
    }

    // Download file
    public static void downloadFile(WebDriver driver, String downloadLink) {
        driver.findElement(By.linkText(downloadLink)).click();
    }

    // Verify download
    public static boolean isFileDownloaded(String downloadPath, String fileName) {
        File dir = new File(downloadPath);
        File[] dirContents = dir.listFiles();

        if (dirContents != null) {
            for (File file : dirContents) {
                if (file.getName().equals(fileName)) {
                    return true;
                }
            }
        }
        return false;
    }

    // Wait for download to complete
    public static boolean waitForFileDownload(String downloadPath,
                                              String fileName,
                                              int timeoutSeconds) {
        int waitTime = 0;

        while (waitTime < timeoutSeconds) {
            if (isFileDownloaded(downloadPath, fileName)) {
                return true;
            }

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            waitTime++;
        }

        return false;
    }
}
```

#### Multiple File Upload

```java
public class MultipleFileUpload {

    // Upload multiple files at once
    public static void uploadMultipleFiles(WebDriver driver) {
        WebElement uploadElement = driver.findElement(By.id("fileUpload"));

        String file1 = "/path/to/file1.pdf";
        String file2 = "/path/to/file2.jpg";
        String file3 = "/path/to/file3.docx";

        // Concatenate file paths with newline
        String allFiles = file1 + "\n" + file2 + "\n" + file3;

        uploadElement.sendKeys(allFiles);

        driver.findElement(By.id("uploadButton")).click();
    }

    // Upload files one by one
    public static void uploadFilesSequentially(WebDriver driver, List<String> files) {
        for (String filePath : files) {
            driver.findElement(By.id("addMore")).click();

            WebElement uploadElement = driver.findElement(
                By.xpath("//input[@type='file'][last()]")
            );
            uploadElement.sendKeys(filePath);
        }

        driver.findElement(By.id("uploadAll")).click();
    }
}
```

---

### Day 12: JavaScript Executor Advanced

#### Core JavaScript Executor Methods

```java
import org.openqa.selenium.JavascriptExecutor;

public class JavaScriptExecutorReview {

    private static JavascriptExecutor getJSExecutor(WebDriver driver) {
        return (JavascriptExecutor) driver;
    }

    // Execute simple JavaScript
    public static void executeSimpleJS(WebDriver driver) {
        JavascriptExecutor js = getJSExecutor(driver);

        // Alert
        js.executeScript("alert('Hello from Selenium!');");

        // Console log
        js.executeScript("console.log('Test message');");

        // Change background color
        js.executeScript("document.body.style.backgroundColor = 'lightblue';");
    }

    // Click element
    public static void clickElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = getJSExecutor(driver);
        js.executeScript("arguments[0].click();", element);
    }

    // Send keys
    public static void sendKeys(WebDriver driver, WebElement element, String text) {
        JavascriptExecutor js = getJSExecutor(driver);
        js.executeScript("arguments[0].value='" + text + "';", element);
    }

    // Scroll operations
    public static void scrollToElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = getJSExecutor(driver);
        js.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    public static void scrollToBottom(WebDriver driver) {
        JavascriptExecutor js = getJSExecutor(driver);
        js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    }

    public static void scrollToTop(WebDriver driver) {
        JavascriptExecutor js = getJSExecutor(driver);
        js.executeScript("window.scrollTo(0, 0);");
    }

    public static void scrollByAmount(WebDriver driver, int x, int y) {
        JavascriptExecutor js = getJSExecutor(driver);
        js.executeScript("window.scrollBy(" + x + "," + y + ");");
    }
}
```

#### Advanced JavaScript Operations

```java
public class AdvancedJSOperations {

    // Get element attributes
    public static String getAttribute(WebDriver driver,
                                     WebElement element,
                                     String attribute) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (String) js.executeScript(
            "return arguments[0].getAttribute('" + attribute + "');",
            element
        );
    }

    // Highlight element
    public static void highlightElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        String originalStyle = element.getAttribute("style");

        js.executeScript(
            "arguments[0].setAttribute('style', 'border: 3px solid red; background: yellow;');",
            element
        );

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        js.executeScript(
            "arguments[0].setAttribute('style', '" + originalStyle + "');",
            element
        );
    }

    // Get page title
    public static String getTitle(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (String) js.executeScript("return document.title;");
    }

    // Get inner text
    public static String getInnerText(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (String) js.executeScript("return arguments[0].innerText;", element);
    }

    // Generate click event
    public static void generateClickEvent(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(
            "var event = new MouseEvent('click', {bubbles: true});" +
            "arguments[0].dispatchEvent(event);",
            element
        );
    }

    // Refresh page
    public static void refreshPage(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("location.reload();");
    }

    // Navigate to URL
    public static void navigateTo(WebDriver driver, String url) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("window.location = '" + url + "';");
    }

    // Zoom page
    public static void zoomPage(WebDriver driver, String zoomLevel) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("document.body.style.zoom = '" + zoomLevel + "';");
    }
}
```

#### DOM Manipulation

```java
public class DOMManipulation {

    // Change element properties
    public static void changeElementProperty(WebDriver driver,
                                            WebElement element,
                                            String property,
                                            String value) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(
            "arguments[0]." + property + " = '" + value + "';",
            element
        );
    }

    // Remove element
    public static void removeElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].remove();", element);
    }

    // Add element
    public static void addElement(WebDriver driver, String html) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(
            "document.body.insertAdjacentHTML('beforeend', '" + html + "');"
        );
    }

    // Get element by ID
    public static WebElement getElementById(WebDriver driver, String id) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (WebElement) js.executeScript(
            "return document.getElementById('" + id + "');"
        );
    }

    // Check if element is present
    public static boolean isElementPresent(WebDriver driver, String selector) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (Boolean) js.executeScript(
            "return document.querySelector('" + selector + "') !== null;"
        );
    }

    // Get all elements by class
    public static List<WebElement> getElementsByClass(WebDriver driver,
                                                     String className) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (List<WebElement>) js.executeScript(
            "return document.getElementsByClassName('" + className + "');"
        );
    }
}
```

---

### Day 13: Pop-ups, Shadow DOM, Advanced Scenarios

#### Alert Handling

```java
public class AlertHandling {

    // Accept alert
    public static void acceptAlert(WebDriver driver) {
        Alert alert = driver.switchTo().alert();
        alert.accept();
    }

    // Dismiss alert
    public static void dismissAlert(WebDriver driver) {
        Alert alert = driver.switchTo().alert();
        alert.dismiss();
    }

    // Get alert text
    public static String getAlertText(WebDriver driver) {
        Alert alert = driver.switchTo().alert();
        return alert.getText();
    }

    // Send text to prompt
    public static void sendTextToPrompt(WebDriver driver, String text) {
        Alert alert = driver.switchTo().alert();
        alert.sendKeys(text);
        alert.accept();
    }

    // Wait for alert
    public static boolean waitForAlert(WebDriver driver, int timeoutSeconds) {
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

#### Window/Tab Handling

```java
public class WindowHandling {

    // Switch to new window
    public static void switchToNewWindow(WebDriver driver) {
        String mainWindow = driver.getWindowHandle();
        Set<String> allWindows = driver.getWindowHandles();

        for (String window : allWindows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                break;
            }
        }
    }

    // Switch to window by title
    public static void switchToWindowByTitle(WebDriver driver, String title) {
        Set<String> allWindows = driver.getWindowHandles();

        for (String window : allWindows) {
            driver.switchTo().window(window);
            if (driver.getTitle().equals(title)) {
                break;
            }
        }
    }

    // Close all windows except main
    public static void closeAllExceptMain(WebDriver driver, String mainWindow) {
        Set<String> allWindows = driver.getWindowHandles();

        for (String window : allWindows) {
            if (!window.equals(mainWindow)) {
                driver.switchTo().window(window);
                driver.close();
            }
        }

        driver.switchTo().window(mainWindow);
    }

    // Get window count
    public static int getWindowCount(WebDriver driver) {
        return driver.getWindowHandles().size();
    }
}
```

#### iFrame Handling

```java
public class IFrameHandling {

    // Switch to iframe by index
    public static void switchToIFrameByIndex(WebDriver driver, int index) {
        driver.switchTo().frame(index);
    }

    // Switch to iframe by name/ID
    public static void switchToIFrameByNameOrId(WebDriver driver, String nameOrId) {
        driver.switchTo().frame(nameOrId);
    }

    // Switch to iframe by element
    public static void switchToIFrameByElement(WebDriver driver, WebElement frameElement) {
        driver.switchTo().frame(frameElement);
    }

    // Switch to parent frame
    public static void switchToParentFrame(WebDriver driver) {
        driver.switchTo().parentFrame();
    }

    // Switch to default content
    public static void switchToDefaultContent(WebDriver driver) {
        driver.switchTo().defaultContent();
    }

    // Count iframes
    public static int countIFrames(WebDriver driver) {
        return driver.findElements(By.tagName("iframe")).size();
    }

    // Handle nested iframes
    public static void handleNestedIFrames(WebDriver driver) {
        // Switch to outer iframe
        driver.switchTo().frame(0);

        // Switch to inner iframe
        driver.switchTo().frame(0);

        // Perform actions

        // Go back to default content
        driver.switchTo().defaultContent();
    }
}
```

#### Shadow DOM

```java
public class ShadowDOMHandling {

    // Access shadow root
    public static WebElement getShadowRoot(WebDriver driver, WebElement host) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (WebElement) js.executeScript("return arguments[0].shadowRoot", host);
    }

    // Find element in shadow DOM
    public static WebElement findElementInShadowDOM(WebDriver driver,
                                                   WebElement host,
                                                   String cssSelector) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (WebElement) js.executeScript(
            "return arguments[0].shadowRoot.querySelector(arguments[1])",
            host, cssSelector
        );
    }

    // Find all elements in shadow DOM
    public static List<WebElement> findElementsInShadowDOM(WebDriver driver,
                                                          WebElement host,
                                                          String cssSelector) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return (List<WebElement>) js.executeScript(
            "return arguments[0].shadowRoot.querySelectorAll(arguments[1])",
            host, cssSelector
        );
    }

    // Handle nested shadow DOM
    public static WebElement handleNestedShadowDOM(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // First level
        WebElement host1 = driver.findElement(By.id("host1"));
        WebElement shadowRoot1 = (WebElement) js.executeScript(
            "return arguments[0].shadowRoot", host1
        );

        // Second level
        WebElement host2 = (WebElement) js.executeScript(
            "return arguments[0].querySelector('#host2')", shadowRoot1
        );
        WebElement shadowRoot2 = (WebElement) js.executeScript(
            "return arguments[0].shadowRoot", host2
        );

        // Find target element
        return (WebElement) js.executeScript(
            "return arguments[0].querySelector('.target')", shadowRoot2
        );
    }
}
```

---

## Key Concepts Summary

### Actions Class

| Concept | Purpose | Key Methods |
|---------|---------|-------------|
| Mouse Actions | Simulate complex mouse interactions | `moveToElement()`, `click()`, `doubleClick()`, `contextClick()` |
| Keyboard Actions | Handle keyboard operations | `keyDown()`, `keyUp()`, `sendKeys()` |
| Drag and Drop | Move elements | `dragAndDrop()`, `dragAndDropBy()`, `clickAndHold()` |
| Method Chaining | Combine multiple actions | `action1().action2().perform()` |

### Web Tables

| Concept | Purpose | Approach |
|---------|---------|----------|
| Static Tables | Fixed structure tables | XPath with row/column indices |
| Dynamic Tables | Tables with changing data | Dynamic XPath, waits |
| Pagination | Multi-page tables | Page navigation, data aggregation |
| Sorting/Filtering | Table manipulation | Column headers, filter inputs |

### File Operations

| Operation | Techniques | Best Practice |
|-----------|------------|---------------|
| Upload | sendKeys(), Robot, AutoIt | Use sendKeys() when possible |
| Download | Browser preferences | Configure download directory |
| Verification | File system checks | Wait for download completion |
| Multiple Files | Concatenated paths | One by one or bulk upload |

### JavaScript Executor

| Use Case | JavaScript Method | When to Use |
|----------|-------------------|-------------|
| Click | `element.click()` | Hidden/overlapped elements |
| Scroll | `scrollIntoView()` | Bring element into view |
| DOM Access | `querySelector()` | Complex element selection |
| Properties | `getAttribute()`, `value` | Access element properties |

### Advanced Scenarios

| Scenario | Approach | Key Points |
|----------|----------|------------|
| Alerts | `switchTo().alert()` | Wait for alert presence |
| Windows/Tabs | `getWindowHandles()` | Track window handles |
| iFrames | `switchTo().frame()` | Remember to switch back |
| Shadow DOM | JavaScript Executor | Use `shadowRoot` property |

---

## Integration Points

### How Concepts Work Together

#### 1. Actions + JavaScript Executor

```java
public class ActionsWithJS {

    public static void scrollAndHover(WebDriver driver, WebElement element) {
        // First scroll to element using JS
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView(true);", element);

        // Then hover using Actions
        Actions actions = new Actions(driver);
        actions.moveToElement(element).perform();
    }

    public static void highlightAndClick(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Highlight
        js.executeScript(
            "arguments[0].style.border = '3px solid red';",
            element
        );

        // Click using Actions
        Actions actions = new Actions(driver);
        actions.click(element).perform();
    }
}
```

#### 2. Tables + File Download

```java
public class TableWithDownload {

    public static void downloadFromTable(WebDriver driver, String rowName) {
        // Find row in table
        String xpath = String.format(
            "//table//tr[td[text()='%s']]//a[contains(text(), 'Download')]",
            rowName
        );

        WebElement downloadLink = driver.findElement(By.xpath(xpath));

        // Click to download
        downloadLink.click();

        // Verify download
        String downloadPath = System.getProperty("user.home") + "/Downloads";
        boolean isDownloaded = FileDownloadReview.waitForFileDownload(
            downloadPath,
            rowName + ".pdf",
            30
        );

        System.out.println("File downloaded: " + isDownloaded);
    }
}
```

#### 3. iFrame + Shadow DOM

```java
public class IFrameWithShadowDOM {

    public static void handleIFrameWithShadow(WebDriver driver) {
        // Switch to iframe
        driver.switchTo().frame("contentFrame");

        // Find shadow host inside iframe
        WebElement shadowHost = driver.findElement(By.id("shadowHost"));

        // Access shadow DOM
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebElement shadowElement = (WebElement) js.executeScript(
            "return arguments[0].shadowRoot.querySelector('.target')",
            shadowHost
        );

        // Interact with shadow element
        shadowElement.click();

        // Switch back
        driver.switchTo().defaultContent();
    }
}
```

#### 4. Drag and Drop + Tables

```java
public class DragDropInTable {

    public static void reorderTableRows(WebDriver driver) {
        Actions actions = new Actions(driver);

        // Get rows
        WebElement row1 = driver.findElement(
            By.xpath("//table//tbody/tr[1]")
        );
        WebElement row3 = driver.findElement(
            By.xpath("//table//tbody/tr[3]")
        );

        // Drag row 1 to row 3 position
        actions.clickAndHold(row1)
               .moveToElement(row3)
               .release()
               .perform();

        // Verify new order
        String firstRowText = driver.findElement(
            By.xpath("//table//tbody/tr[1]/td[1]")
        ).getText();

        System.out.println("First row after reorder: " + firstRowText);
    }
}
```

---

## Common Patterns and Best Practices

### 1. Reusable Utility Methods

```java
public class SeleniumUtils {

    private WebDriver driver;
    private Actions actions;
    private JavascriptExecutor js;
    private WebDriverWait wait;

    public SeleniumUtils(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
        this.js = (JavascriptExecutor) driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Wait and click
    public void waitAndClick(By locator) {
        WebElement element = wait.until(
            ExpectedConditions.elementToBeClickable(locator)
        );
        element.click();
    }

    // Scroll into view and click
    public void scrollAndClick(By locator) {
        WebElement element = driver.findElement(locator);
        js.executeScript("arguments[0].scrollIntoView(true);", element);
        actions.moveToElement(element).click().perform();
    }

    // Safe send keys
    public void safeSendKeys(By locator, String text) {
        WebElement element = wait.until(
            ExpectedConditions.visibilityOfElementLocated(locator)
        );
        element.clear();
        element.sendKeys(text);
    }

    // Handle any alert
    public boolean handleAlert(boolean accept) {
        try {
            wait.until(ExpectedConditions.alertIsPresent());
            Alert alert = driver.switchTo().alert();
            if (accept) {
                alert.accept();
            } else {
                alert.dismiss();
            }
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    // Smart wait for element
    public WebElement smartWait(By locator, int timeoutSeconds) {
        WebDriverWait customWait = new WebDriverWait(
            driver,
            Duration.ofSeconds(timeoutSeconds)
        );
        return customWait.until(
            ExpectedConditions.presenceOfElementLocated(locator)
        );
    }
}
```

### 2. Error Handling Pattern

```java
public class RobustInteractions {

    public static boolean safeClick(WebDriver driver, By locator) {
        try {
            // Try normal click
            driver.findElement(locator).click();
            return true;
        } catch (ElementClickInterceptedException e) {
            try {
                // Try JavaScript click
                WebElement element = driver.findElement(locator);
                JavascriptExecutor js = (JavascriptExecutor) driver;
                js.executeScript("arguments[0].click();", element);
                return true;
            } catch (Exception ex) {
                try {
                    // Try Actions click
                    WebElement element = driver.findElement(locator);
                    Actions actions = new Actions(driver);
                    actions.moveToElement(element).click().perform();
                    return true;
                } catch (Exception exc) {
                    System.err.println("All click attempts failed: " + exc.getMessage());
                    return false;
                }
            }
        } catch (Exception e) {
            System.err.println("Click failed: " + e.getMessage());
            return false;
        }
    }

    public static boolean safeSendKeys(WebDriver driver, By locator, String text) {
        try {
            // Try normal sendKeys
            WebElement element = driver.findElement(locator);
            element.clear();
            element.sendKeys(text);
            return true;
        } catch (Exception e) {
            try {
                // Try JavaScript
                WebElement element = driver.findElement(locator);
                JavascriptExecutor js = (JavascriptExecutor) driver;
                js.executeScript("arguments[0].value='" + text + "';", element);
                return true;
            } catch (Exception ex) {
                System.err.println("SendKeys failed: " + ex.getMessage());
                return false;
            }
        }
    }
}
```

### 3. Configuration Management

```java
public class Config {

    // Browser configuration
    public static WebDriver setupBrowser(String browser, String downloadPath) {
        WebDriver driver = null;

        switch (browser.toLowerCase()) {
            case "chrome":
                ChromeOptions chromeOptions = new ChromeOptions();
                Map<String, Object> prefs = new HashMap<>();
                prefs.put("download.default_directory", downloadPath);
                chromeOptions.setExperimentalOption("prefs", prefs);
                driver = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                firefoxOptions.addPreference("browser.download.dir", downloadPath);
                firefoxOptions.addPreference("browser.download.folderList", 2);
                driver = new FirefoxDriver(firefoxOptions);
                break;

            case "edge":
                EdgeOptions edgeOptions = new EdgeOptions();
                Map<String, Object> edgePrefs = new HashMap<>();
                edgePrefs.put("download.default_directory", downloadPath);
                edgeOptions.setExperimentalOption("prefs", edgePrefs);
                driver = new EdgeDriver(edgeOptions);
                break;
        }

        if (driver != null) {
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        }

        return driver;
    }
}
```

### 4. Logging Pattern

```java
public class LoggableActions {

    private static void log(String message) {
        System.out.println("[" + LocalDateTime.now() + "] " + message);
    }

    public static void clickWithLog(WebDriver driver, By locator, String elementName) {
        log("Attempting to click: " + elementName);
        try {
            driver.findElement(locator).click();
            log("Successfully clicked: " + elementName);
        } catch (Exception e) {
            log("Failed to click: " + elementName + " - " + e.getMessage());
            throw e;
        }
    }

    public static void sendKeysWithLog(WebDriver driver, By locator,
                                      String text, String elementName) {
        log("Attempting to send keys to: " + elementName);
        try {
            driver.findElement(locator).sendKeys(text);
            log("Successfully sent keys to: " + elementName);
        } catch (Exception e) {
            log("Failed to send keys to: " + elementName + " - " + e.getMessage());
            throw e;
        }
    }
}
```

---

## Mini Project: E-commerce Test Automation

### Project Overview

Create a comprehensive test automation suite for an e-commerce website that demonstrates all Week 2 concepts.

### Project Requirements

**Functional Requirements:**
1. User registration and login
2. Product search and filtering
3. Product comparison (drag and drop)
4. Add products to cart
5. Apply discount coupons
6. File upload (product review with image)
7. Order placement and confirmation
8. Download invoice

**Technical Requirements:**
- Use Actions class for hover menus
- Implement drag and drop for product comparison
- Handle web tables for order history
- File upload for product reviews
- File download for invoices
- JavaScript Executor for hidden elements
- Handle alerts and pop-ups
- Manage multiple windows/tabs

### Test Scenarios

```java
/*
Test Scenario 1: User Registration
- Navigate to registration page
- Fill registration form
- Handle terms and conditions popup
- Submit and verify success

Test Scenario 2: Product Search and Filter
- Search for products
- Apply filters (price range slider)
- Sort results (table sorting)
- Verify product count

Test Scenario 3: Product Comparison
- Select products
- Drag and drop to comparison area
- View comparison table
- Verify product details

Test Scenario 4: Shopping Cart Operations
- Add products to cart
- Update quantities
- Apply discount coupon
- Verify total calculation

Test Scenario 5: Checkout Process
- Proceed to checkout
- Fill shipping information
- Handle payment gateway (new window)
- Confirm order
- Download invoice
*/
```

### Complete Implementation

```java
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.time.Duration;
import java.util.*;

public class EcommerceTestAutomation {

    private WebDriver driver;
    private Actions actions;
    private JavascriptExecutor js;
    private WebDriverWait wait;
    private String downloadPath;

    // Constructor
    public EcommerceTestAutomation() {
        setupBrowser();
    }

    // Setup browser with download configuration
    private void setupBrowser() {
        downloadPath = System.getProperty("user.home") + "/Downloads/EcommerceTests";
        new File(downloadPath).mkdirs();

        ChromeOptions options = new ChromeOptions();
        Map<String, Object> prefs = new HashMap<>();
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        prefs.put("plugins.always_open_pdf_externally", true);
        options.setExperimentalOption("prefs", prefs);

        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        actions = new Actions(driver);
        js = (JavascriptExecutor) driver;
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // Test Scenario 1: User Registration
    public void testUserRegistration() {
        System.out.println("\n=== Test Scenario 1: User Registration ===");

        try {
            // Navigate to website
            driver.get("https://demo.ecommerce.com");

            // Hover over user menu
            WebElement userMenu = driver.findElement(By.id("userMenu"));
            actions.moveToElement(userMenu).perform();
            Thread.sleep(500);

            // Click register
            driver.findElement(By.linkText("Register")).click();

            // Fill registration form
            driver.findElement(By.id("firstName")).sendKeys("John");
            driver.findElement(By.id("lastName")).sendKeys("Doe");
            driver.findElement(By.id("email")).sendKeys("john.doe@example.com");

            // Use Actions for password (security field)
            WebElement passwordField = driver.findElement(By.id("password"));
            actions.click(passwordField)
                   .sendKeys("SecurePass123!")
                   .perform();

            driver.findElement(By.id("confirmPassword")).sendKeys("SecurePass123!");
            driver.findElement(By.id("phone")).sendKeys("1234567890");

            // Handle terms and conditions popup
            driver.findElement(By.id("termsLink")).click();
            Thread.sleep(1000);

            // Switch to popup window
            String mainWindow = driver.getWindowHandle();
            Set<String> allWindows = driver.getWindowHandles();
            for (String window : allWindows) {
                if (!window.equals(mainWindow)) {
                    driver.switchTo().window(window);
                    break;
                }
            }

            // Scroll and accept terms
            js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            Thread.sleep(500);
            driver.findElement(By.id("acceptTerms")).click();
            driver.close();

            // Switch back to main window
            driver.switchTo().window(mainWindow);

            // Check terms checkbox
            driver.findElement(By.id("termsCheckbox")).click();

            // Submit form
            WebElement submitButton = driver.findElement(By.id("registerButton"));
            js.executeScript("arguments[0].scrollIntoView(true);", submitButton);
            actions.moveToElement(submitButton).click().perform();

            // Wait for success alert
            wait.until(ExpectedConditions.alertIsPresent());
            Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();
            System.out.println("Registration status: " + alertText);
            alert.accept();

            // Verify registration success
            boolean isSuccess = alertText.contains("Success");
            System.out.println("Registration Test: " + (isSuccess ? "PASSED" : "FAILED"));

        } catch (Exception e) {
            System.err.println("Registration Test Failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Test Scenario 2: Product Search and Filter
    public void testProductSearchAndFilter() {
        System.out.println("\n=== Test Scenario 2: Product Search and Filter ===");

        try {
            // Login first
            driver.get("https://demo.ecommerce.com/login");
            driver.findElement(By.id("username")).sendKeys("john.doe@example.com");
            driver.findElement(By.id("password")).sendKeys("SecurePass123!");
            driver.findElement(By.id("loginButton")).click();
            Thread.sleep(2000);

            // Navigate to products
            WebElement shopMenu = driver.findElement(By.id("shopMenu"));
            actions.moveToElement(shopMenu).perform();
            Thread.sleep(500);

            WebElement electronicsMenu = driver.findElement(By.linkText("Electronics"));
            actions.moveToElement(electronicsMenu).perform();
            Thread.sleep(500);

            driver.findElement(By.linkText("Laptops")).click();
            Thread.sleep(1000);

            // Use search
            WebElement searchBox = driver.findElement(By.id("searchBox"));
            searchBox.sendKeys("Dell");

            // Use keyboard action to search
            actions.sendKeys(searchBox, Keys.ENTER).perform();
            Thread.sleep(1000);

            // Apply price filter using slider
            WebElement priceSlider = driver.findElement(By.id("priceSlider"));

            // Get slider properties
            int sliderWidth = priceSlider.getSize().getWidth();

            // Move slider to set minimum price
            WebElement minHandle = driver.findElement(By.id("minPriceHandle"));
            actions.dragAndDropBy(minHandle, sliderWidth / 4, 0).perform();

            // Move slider to set maximum price
            WebElement maxHandle = driver.findElement(By.id("maxPriceHandle"));
            actions.dragAndDropBy(maxHandle, -sliderWidth / 4, 0).perform();

            Thread.sleep(1000);

            // Apply filter
            driver.findElement(By.id("applyFilter")).click();
            Thread.sleep(2000);

            // Get product count from table
            List<WebElement> products = driver.findElements(
                By.xpath("//table[@id='productTable']//tbody/tr")
            );
            int productCount = products.size();
            System.out.println("Filtered products found: " + productCount);

            // Sort by price (click column header)
            driver.findElement(By.xpath("//th[text()='Price']")).click();
            Thread.sleep(1000);

            // Verify sorting
            List<WebElement> priceElements = driver.findElements(
                By.xpath("//table[@id='productTable']//tbody/tr/td[3]")
            );

            List<Double> prices = new ArrayList<>();
            for (WebElement priceElement : priceElements) {
                String priceText = priceElement.getText().replace("$", "").replace(",", "");
                prices.add(Double.parseDouble(priceText));
            }

            boolean isSorted = true;
            for (int i = 0; i < prices.size() - 1; i++) {
                if (prices.get(i) > prices.get(i + 1)) {
                    isSorted = false;
                    break;
                }
            }

            System.out.println("Price sorting Test: " + (isSorted ? "PASSED" : "FAILED"));

        } catch (Exception e) {
            System.err.println("Search and Filter Test Failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Test Scenario 3: Product Comparison with Drag and Drop
    public void testProductComparison() {
        System.out.println("\n=== Test Scenario 3: Product Comparison ===");

        try {
            // Assume we're on products page from previous test

            // Select first product
            WebElement product1 = driver.findElement(
                By.xpath("//table[@id='productTable']//tbody/tr[1]")
            );

            // Highlight product
            js.executeScript(
                "arguments[0].style.border = '3px solid blue';",
                product1
            );
            Thread.sleep(500);

            // Find compare area
            WebElement compareArea = driver.findElement(By.id("compareArea"));

            // Scroll compare area into view
            js.executeScript("arguments[0].scrollIntoView(true);", compareArea);
            Thread.sleep(500);

            // Drag and drop product1 to compare area
            actions.clickAndHold(product1)
                   .pause(Duration.ofMillis(500))
                   .moveToElement(compareArea)
                   .pause(Duration.ofMillis(500))
                   .release()
                   .perform();

            Thread.sleep(1000);

            // Select second product
            WebElement product2 = driver.findElement(
                By.xpath("//table[@id='productTable']//tbody/tr[2]")
            );

            js.executeScript(
                "arguments[0].style.border = '3px solid blue';",
                product2
            );
            Thread.sleep(500);

            // Drag and drop product2
            actions.clickAndHold(product2)
                   .pause(Duration.ofMillis(500))
                   .moveToElement(compareArea)
                   .pause(Duration.ofMillis(500))
                   .release()
                   .perform();

            Thread.sleep(1000);

            // Click compare button
            driver.findElement(By.id("compareButton")).click();
            Thread.sleep(2000);

            // Verify comparison table
            WebElement comparisonTable = driver.findElement(By.id("comparisonTable"));
            List<WebElement> compareRows = comparisonTable.findElements(By.tagName("tr"));

            System.out.println("Comparison table rows: " + compareRows.size());

            // Extract comparison data
            for (WebElement row : compareRows) {
                List<WebElement> cells = row.findElements(By.tagName("td"));
                if (!cells.isEmpty()) {
                    System.out.print("Feature: " + cells.get(0).getText());
                    if (cells.size() > 1) {
                        System.out.print(" | Product 1: " + cells.get(1).getText());
                    }
                    if (cells.size() > 2) {
                        System.out.print(" | Product 2: " + cells.get(2).getText());
                    }
                    System.out.println();
                }
            }

            boolean comparisonSuccess = compareRows.size() > 0;
            System.out.println("Product Comparison Test: " +
                             (comparisonSuccess ? "PASSED" : "FAILED"));

        } catch (Exception e) {
            System.err.println("Product Comparison Test Failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Test Scenario 4: Shopping Cart Operations
    public void testShoppingCart() {
        System.out.println("\n=== Test Scenario 4: Shopping Cart Operations ===");

        try {
            // Go back to products
            driver.navigate().back();
            Thread.sleep(1000);

            // Add first product to cart
            WebElement addToCartButton1 = driver.findElement(
                By.xpath("//table[@id='productTable']//tbody/tr[1]//button[text()='Add to Cart']")
            );

            js.executeScript("arguments[0].scrollIntoView(true);", addToCartButton1);
            actions.moveToElement(addToCartButton1).click().perform();
            Thread.sleep(1000);

            // Add second product to cart
            WebElement addToCartButton2 = driver.findElement(
                By.xpath("//table[@id='productTable']//tbody/tr[2]//button[text()='Add to Cart']")
            );

            actions.moveToElement(addToCartButton2).click().perform();
            Thread.sleep(1000);

            // Go to cart
            WebElement cartIcon = driver.findElement(By.id("cartIcon"));
            cartIcon.click();
            Thread.sleep(2000);

            // Update quantity using keyboard
            WebElement quantityInput = driver.findElement(
                By.xpath("//table[@id='cartTable']//tbody/tr[1]//input[@type='number']")
            );

            // Select all and replace
            actions.click(quantityInput)
                   .keyDown(Keys.CONTROL)
                   .sendKeys("a")
                   .keyUp(Keys.CONTROL)
                   .sendKeys("3")
                   .perform();

            // Click update button
            driver.findElement(
                By.xpath("//table[@id='cartTable']//tbody/tr[1]//button[text()='Update']")
            ).click();
            Thread.sleep(1000);

            // Apply discount coupon
            WebElement couponInput = driver.findElement(By.id("couponCode"));
            couponInput.sendKeys("DISCOUNT10");

            driver.findElement(By.id("applyCoupon")).click();
            Thread.sleep(1000);

            // Check for coupon alert
            if (isAlertPresent()) {
                Alert alert = driver.switchTo().alert();
                System.out.println("Coupon message: " + alert.getText());
                alert.accept();
            }

            // Get cart totals from table
            WebElement subtotalElement = driver.findElement(
                By.xpath("//table[@id='cartSummary']//tr[td[text()='Subtotal']]/td[2]")
            );
            String subtotal = subtotalElement.getText();

            WebElement discountElement = driver.findElement(
                By.xpath("//table[@id='cartSummary']//tr[td[text()='Discount']]/td[2]")
            );
            String discount = discountElement.getText();

            WebElement totalElement = driver.findElement(
                By.xpath("//table[@id='cartSummary']//tr[td[text()='Total']]/td[2]")
            );
            String total = totalElement.getText();

            System.out.println("Cart Summary:");
            System.out.println("  Subtotal: " + subtotal);
            System.out.println("  Discount: " + discount);
            System.out.println("  Total: " + total);

            // Verify discount applied
            boolean discountApplied = !discount.equals("$0.00");
            System.out.println("Shopping Cart Test: " +
                             (discountApplied ? "PASSED" : "FAILED"));

        } catch (Exception e) {
            System.err.println("Shopping Cart Test Failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Test Scenario 5: Checkout and File Operations
    public void testCheckoutProcess() {
        System.out.println("\n=== Test Scenario 5: Checkout Process ===");

        try {
            // Click checkout
            WebElement checkoutButton = driver.findElement(By.id("checkoutButton"));
            js.executeScript("arguments[0].scrollIntoView(true);", checkoutButton);
            actions.moveToElement(checkoutButton).click().perform();
            Thread.sleep(2000);

            // Fill shipping information
            driver.findElement(By.id("address")).sendKeys("123 Main Street");
            driver.findElement(By.id("city")).sendKeys("New York");
            driver.findElement(By.id("zipCode")).sendKeys("10001");

            // Select state from dropdown
            driver.findElement(By.id("state")).click();
            actions.sendKeys(Keys.ARROW_DOWN).perform();
            Thread.sleep(200);
            actions.sendKeys(Keys.ARROW_DOWN).perform();
            Thread.sleep(200);
            actions.sendKeys(Keys.ENTER).perform();

            // Upload address proof (file upload)
            WebElement uploadElement = driver.findElement(By.id("addressProof"));
            String uploadFilePath = createDummyFile("address_proof.pdf");
            uploadElement.sendKeys(uploadFilePath);
            Thread.sleep(1000);

            // Verify file uploaded
            WebElement uploadedFileName = driver.findElement(By.id("uploadedFileName"));
            String fileName = uploadedFileName.getText();
            System.out.println("Uploaded file: " + fileName);

            // Continue to payment
            driver.findElement(By.id("continueToPayment")).click();
            Thread.sleep(2000);

            // Handle payment gateway (opens in new window)
            String mainWindow = driver.getWindowHandle();

            // Fill payment details
            driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
            driver.findElement(By.id("cardName")).sendKeys("John Doe");
            driver.findElement(By.id("expiryMonth")).sendKeys("12");
            driver.findElement(By.id("expiryYear")).sendKeys("2025");
            driver.findElement(By.id("cvv")).sendKeys("123");

            // Click pay now
            driver.findElement(By.id("payButton")).click();
            Thread.sleep(3000);

            // Wait for success message
            wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//div[contains(text(), 'Order Placed Successfully')]")
            ));

            // Get order number
            WebElement orderNumber = driver.findElement(By.id("orderNumber"));
            String orderNo = orderNumber.getText();
            System.out.println("Order Number: " + orderNo);

            // Download invoice
            WebElement downloadInvoiceButton = driver.findElement(By.id("downloadInvoice"));
            downloadInvoiceButton.click();
            Thread.sleep(3000);

            // Verify invoice downloaded
            String invoiceFileName = "Invoice_" + orderNo + ".pdf";
            boolean isDownloaded = isFileDownloaded(invoiceFileName, 10);
            System.out.println("Invoice downloaded: " + isDownloaded);

            // Click view order history
            driver.findElement(By.linkText("View Order History")).click();
            Thread.sleep(2000);

            // Verify order in history table
            boolean orderFound = false;
            List<WebElement> orderRows = driver.findElements(
                By.xpath("//table[@id='orderHistoryTable']//tbody/tr")
            );

            for (WebElement row : orderRows) {
                if (row.getText().contains(orderNo)) {
                    orderFound = true;
                    System.out.println("Order found in history: " + row.getText());
                    break;
                }
            }

            System.out.println("Checkout Process Test: " +
                             (orderFound && isDownloaded ? "PASSED" : "FAILED"));

        } catch (Exception e) {
            System.err.println("Checkout Process Test Failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Helper: Check if alert is present
    private boolean isAlertPresent() {
        try {
            wait.until(ExpectedConditions.alertIsPresent());
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    // Helper: Create dummy file for upload
    private String createDummyFile(String fileName) {
        try {
            File file = new File(downloadPath + "/" + fileName);
            file.createNewFile();
            return file.getAbsolutePath();
        } catch (Exception e) {
            return "";
        }
    }

    // Helper: Check if file is downloaded
    private boolean isFileDownloaded(String fileName, int timeoutSeconds) {
        File dir = new File(downloadPath);
        int waitTime = 0;

        while (waitTime < timeoutSeconds) {
            File[] files = dir.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.getName().equals(fileName)) {
                        return true;
                    }
                }
            }

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            waitTime++;
        }

        return false;
    }

    // Cleanup
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    // Main method to run all tests
    public static void main(String[] args) {
        EcommerceTestAutomation automation = new EcommerceTestAutomation();

        try {
            automation.testUserRegistration();
            Thread.sleep(2000);

            automation.testProductSearchAndFilter();
            Thread.sleep(2000);

            automation.testProductComparison();
            Thread.sleep(2000);

            automation.testShoppingCart();
            Thread.sleep(2000);

            automation.testCheckoutProcess();

            System.out.println("\n=== All Tests Completed ===");

        } catch (Exception e) {
            System.err.println("Test execution failed: " + e.getMessage());
            e.printStackTrace();
        } finally {
            automation.tearDown();
        }
    }
}
```

### Project Structure

```
EcommerceTestAutomation/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── EcommerceTestAutomation.java
│   │       ├── utils/
│   │       │   ├── SeleniumUtils.java
│   │       │   ├── FileUtils.java
│   │       │   └── TableUtils.java
│   │       ├── pages/
│   │       │   ├── HomePage.java
│   │       │   ├── ProductPage.java
│   │       │   ├── CartPage.java
│   │       │   └── CheckoutPage.java
│   │       └── tests/
│   │           ├── RegistrationTest.java
│   │           ├── ProductTest.java
│   │           └── CheckoutTest.java
│   └── resources/
│       ├── testdata/
│       │   └── users.csv
│       └── downloads/
├── pom.xml
└── README.md
```

### Running the Project

```bash
# Compile
javac -cp ".;selenium-server.jar" EcommerceTestAutomation.java

# Run
java -cp ".;selenium-server.jar" EcommerceTestAutomation
```

---

## Additional Practice Projects

### Project 1: Banking Application Automation

**Objective**: Automate banking operations

**Features:**
- Login with OTP (alert handling)
- Account summary table
- Fund transfer (form filling)
- Statement download (file download)
- Transaction history (dynamic table)

**Key Concepts:**
- Alert handling for OTP
- Table operations for transactions
- File download for statements
- Form automation
- Data validation

```java
public class BankingAutomation {

    public void loginWithOTP(WebDriver driver) {
        // Navigate to bank site
        driver.get("https://demo.bank.com");

        // Enter credentials
        driver.findElement(By.id("username")).sendKeys("user123");
        driver.findElement(By.id("password")).sendKeys("pass123");
        driver.findElement(By.id("loginButton")).click();

        // Handle OTP alert
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.alertIsPresent());

        Alert alert = driver.switchTo().alert();
        alert.sendKeys("123456"); // OTP
        alert.accept();

        // Verify login
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("accountSummary")
        ));

        System.out.println("Login successful!");
    }

    public void transferFunds(WebDriver driver, String toAccount, double amount) {
        // Navigate to transfer page
        driver.findElement(By.linkText("Fund Transfer")).click();

        // Fill form
        driver.findElement(By.id("toAccount")).sendKeys(toAccount);
        driver.findElement(By.id("amount")).sendKeys(String.valueOf(amount));
        driver.findElement(By.id("remarks")).sendKeys("Payment");

        // Submit
        driver.findElement(By.id("transferButton")).click();

        // Confirm alert
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.alertIsPresent());

        Alert confirmAlert = driver.switchTo().alert();
        System.out.println("Confirm: " + confirmAlert.getText());
        confirmAlert.accept();

        // Wait for success
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//div[contains(text(), 'Transfer Successful')]")
        ));

        System.out.println("Transfer completed!");
    }

    public void downloadStatement(WebDriver driver, String month, String year) {
        // Navigate to statements
        driver.findElement(By.linkText("Statements")).click();

        // Select period
        driver.findElement(By.id("month")).sendKeys(month);
        driver.findElement(By.id("year")).sendKeys(year);

        // Download
        driver.findElement(By.id("downloadPDF")).click();

        // Verify download
        String fileName = "Statement_" + month + "_" + year + ".pdf";
        boolean downloaded = waitForFileDownload(fileName, 10);

        System.out.println("Statement downloaded: " + downloaded);
    }

    private boolean waitForFileDownload(String fileName, int timeout) {
        // Implementation similar to main project
        return true;
    }
}
```

### Project 2: Social Media Dashboard

**Objective**: Automate social media management

**Features:**
- Login and profile management
- Post creation with image upload
- Drag and drop post scheduling
- Comment moderation (table operations)
- Analytics dashboard (JavaScript interaction)

**Implementation:**

```java
public class SocialMediaAutomation {

    private WebDriver driver;
    private Actions actions;
    private JavascriptExecutor js;

    public void createPost(String content, String imagePath) {
        // Navigate to create post
        driver.findElement(By.id("createPost")).click();

        // Enter content
        WebElement textArea = driver.findElement(By.id("postContent"));
        actions.click(textArea).sendKeys(content).perform();

        // Upload image
        WebElement uploadButton = driver.findElement(By.id("uploadImage"));
        uploadButton.sendKeys(imagePath);

        // Wait for upload
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("imagePreview")
        ));

        // Publish
        driver.findElement(By.id("publishButton")).click();

        System.out.println("Post created successfully!");
    }

    public void schedulePost(String postId, String dateTime) {
        // Find post in drafts
        WebElement post = driver.findElement(
            By.xpath("//div[@data-post-id='" + postId + "']")
        );

        // Drag to calendar
        WebElement calendarSlot = driver.findElement(
            By.xpath("//div[@data-datetime='" + dateTime + "']")
        );

        actions.dragAndDrop(post, calendarSlot).perform();

        // Confirm scheduling
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.alertIsPresent());

        Alert alert = driver.switchTo().alert();
        alert.accept();

        System.out.println("Post scheduled for: " + dateTime);
    }

    public void moderateComments() {
        // Get all comments from table
        List<WebElement> comments = driver.findElements(
            By.xpath("//table[@id='commentsTable']//tbody/tr")
        );

        for (WebElement comment : comments) {
            String commentText = comment.findElement(By.className("comment-text")).getText();

            // Check for inappropriate content
            if (containsInappropriateContent(commentText)) {
                // Click delete button
                comment.findElement(By.className("delete-btn")).click();

                // Confirm deletion
                Alert alert = driver.switchTo().alert();
                alert.accept();

                System.out.println("Deleted inappropriate comment");
            }
        }
    }

    private boolean containsInappropriateContent(String text) {
        // Simple check - in real scenario, use comprehensive filtering
        String[] bannedWords = {"spam", "inappropriate"};
        for (String word : bannedWords) {
            if (text.toLowerCase().contains(word)) {
                return true;
            }
        }
        return false;
    }

    public void viewAnalytics() {
        // Navigate to analytics
        driver.findElement(By.linkText("Analytics")).click();

        // Scroll to charts
        WebElement chartSection = driver.findElement(By.id("analyticsChart"));
        js.executeScript("arguments[0].scrollIntoView(true);", chartSection);

        // Get metrics using JavaScript
        Long followers = (Long) js.executeScript(
            "return document.getElementById('followersCount').innerText;"
        );

        Long engagement = (Long) js.executeScript(
            "return document.getElementById('engagementRate').innerText;"
        );

        System.out.println("Followers: " + followers);
        System.out.println("Engagement Rate: " + engagement + "%");
    }
}
```

### Project 3: Travel Booking System

**Objective**: Automate travel booking workflow

**Features:**
- Flight search with filters (sliders for price)
- Compare flights (drag and drop)
- Book flight with passenger details
- Download e-ticket
- Manage bookings (table operations)

```java
public class TravelBookingAutomation {

    public void searchFlights(String from, String to, String date) {
        Actions actions = new Actions(driver);

        // Enter origin
        WebElement fromInput = driver.findElement(By.id("from"));
        fromInput.click();
        fromInput.sendKeys(from);
        Thread.sleep(1000);
        actions.sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ENTER).perform();

        // Enter destination
        WebElement toInput = driver.findElement(By.id("to"));
        toInput.click();
        toInput.sendKeys(to);
        Thread.sleep(1000);
        actions.sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ENTER).perform();

        // Select date
        driver.findElement(By.id("travelDate")).click();
        driver.findElement(By.xpath("//td[@data-date='" + date + "']")).click();

        // Search
        driver.findElement(By.id("searchFlights")).click();

        // Wait for results
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("flightResults")
        ));
    }

    public void applyPriceFilter(int minPrice, int maxPrice) {
        Actions actions = new Actions(driver);

        WebElement priceSlider = driver.findElement(By.id("priceFilter"));
        int sliderWidth = priceSlider.getSize().getWidth();

        // Set minimum price
        WebElement minHandle = driver.findElement(By.id("minPriceHandle"));
        int minOffset = (minPrice * sliderWidth) / 10000;
        actions.dragAndDropBy(minHandle, minOffset, 0).perform();

        // Set maximum price
        WebElement maxHandle = driver.findElement(By.id("maxPriceHandle"));
        int maxOffset = ((10000 - maxPrice) * sliderWidth) / 10000;
        actions.dragAndDropBy(maxHandle, -maxOffset, 0).perform();

        // Apply filter
        driver.findElement(By.id("applyPriceFilter")).click();
        Thread.sleep(1000);
    }

    public void compareFlights() {
        Actions actions = new Actions(driver);

        // Select flights to compare
        WebElement flight1 = driver.findElement(
            By.xpath("//div[@class='flight-card'][1]")
        );
        WebElement flight2 = driver.findElement(
            By.xpath("//div[@class='flight-card'][2]")
        );

        WebElement compareArea = driver.findElement(By.id("compareArea"));

        // Drag flights to compare area
        actions.dragAndDrop(flight1, compareArea).perform();
        Thread.sleep(500);
        actions.dragAndDrop(flight2, compareArea).perform();
        Thread.sleep(500);

        // View comparison
        driver.findElement(By.id("viewComparison")).click();
        Thread.sleep(1000);

        // Read comparison table
        WebElement comparisonTable = driver.findElement(By.id("comparisonTable"));
        System.out.println(comparisonTable.getText());
    }

    public void bookFlight(Map<String, String> passengerDetails) {
        // Select flight
        driver.findElement(By.xpath("//button[text()='Book Now']")).click();
        Thread.sleep(1000);

        // Fill passenger details
        driver.findElement(By.id("firstName")).sendKeys(passengerDetails.get("firstName"));
        driver.findElement(By.id("lastName")).sendKeys(passengerDetails.get("lastName"));
        driver.findElement(By.id("email")).sendKeys(passengerDetails.get("email"));
        driver.findElement(By.id("phone")).sendKeys(passengerDetails.get("phone"));

        // Continue
        driver.findElement(By.id("continueBooking")).click();
        Thread.sleep(2000);

        // Payment
        driver.findElement(By.id("cardNumber")).sendKeys("4111111111111111");
        driver.findElement(By.id("cvv")).sendKeys("123");

        // Confirm booking
        driver.findElement(By.id("confirmPayment")).click();
        Thread.sleep(3000);

        // Download e-ticket
        WebElement downloadButton = driver.findElement(By.id("downloadTicket"));
        downloadButton.click();

        System.out.println("Flight booked successfully!");
    }
}
```

### Project 4: Online Learning Platform

**Objective**: Automate course management

**Features:**
- Course enrollment
- Video player interaction (JavaScript)
- Quiz automation (dynamic forms)
- Assignment upload
- Certificate download
- Progress tracking (table operations)

```java
public class LearningPlatformAutomation {

    private WebDriver driver;
    private JavascriptExecutor js;

    public void enrollInCourse(String courseId) {
        driver.get("https://demo.learning.com/course/" + courseId);

        // Hover over enroll button
        Actions actions = new Actions(driver);
        WebElement enrollButton = driver.findElement(By.id("enrollButton"));
        actions.moveToElement(enrollButton).perform();
        Thread.sleep(500);

        // Click enroll
        enrollButton.click();

        // Handle confirmation alert
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.alertIsPresent());

        Alert alert = driver.switchTo().alert();
        alert.accept();

        System.out.println("Enrolled in course: " + courseId);
    }

    public void watchVideo(String videoId) {
        // Navigate to video
        driver.findElement(By.xpath("//div[@data-video-id='" + videoId + "']")).click();
        Thread.sleep(2000);

        // Play video using JavaScript
        js.executeScript("document.getElementById('videoPlayer').play();");

        // Wait for video to play (simulate watching)
        Thread.sleep(5000);

        // Mark as complete using JavaScript
        js.executeScript(
            "document.getElementById('markComplete').click();"
        );

        System.out.println("Video watched: " + videoId);
    }

    public void takeQuiz(Map<Integer, String> answers) {
        // Navigate to quiz
        driver.findElement(By.linkText("Take Quiz")).click();
        Thread.sleep(1000);

        // Answer questions
        for (Map.Entry<Integer, String> entry : answers.entrySet()) {
            int questionNo = entry.getKey();
            String answer = entry.getValue();

            // Find question
            WebElement questionElement = driver.findElement(
                By.id("question" + questionNo)
            );

            // Scroll to question
            js.executeScript("arguments[0].scrollIntoView(true);", questionElement);
            Thread.sleep(300);

            // Select answer
            driver.findElement(
                By.xpath("//input[@name='q" + questionNo + "' and @value='" + answer + "']")
            ).click();
        }

        // Submit quiz
        driver.findElement(By.id("submitQuiz")).click();
        Thread.sleep(2000);

        // Get score
        WebElement scoreElement = driver.findElement(By.id("quizScore"));
        String score = scoreElement.getText();
        System.out.println("Quiz Score: " + score);
    }

    public void uploadAssignment(String filePath) {
        // Navigate to assignments
        driver.findElement(By.linkText("Assignments")).click();
        Thread.sleep(1000);

        // Upload file
        WebElement uploadInput = driver.findElement(By.id("assignmentFile"));
        uploadInput.sendKeys(filePath);
        Thread.sleep(1000);

        // Add comments
        driver.findElement(By.id("comments")).sendKeys("Assignment completed");

        // Submit
        driver.findElement(By.id("submitAssignment")).click();

        // Wait for confirmation
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//div[contains(text(), 'Assignment Submitted')]")
        ));

        System.out.println("Assignment uploaded successfully!");
    }

    public void downloadCertificate() {
        // Navigate to certificates
        driver.findElement(By.linkText("My Certificates")).click();
        Thread.sleep(1000);

        // Find completed course
        WebElement completedCourse = driver.findElement(
            By.xpath("//table[@id='certificates']//tr[td[contains(text(), 'Completed')]]")
        );

        // Click download
        completedCourse.findElement(By.linkText("Download")).click();
        Thread.sleep(3000);

        // Verify download
        boolean downloaded = isFileDownloaded("Certificate.pdf", 10);
        System.out.println("Certificate downloaded: " + downloaded);
    }

    private boolean isFileDownloaded(String fileName, int timeout) {
        // Implementation
        return true;
    }
}
```

---

## Troubleshooting Common Issues

### Issue 1: ElementClickInterceptedException

**Problem**: Element is not clickable due to overlay or another element

**Solutions:**

```java
public class ClickInterceptionSolutions {

    // Solution 1: Wait for overlay to disappear
    public static void waitForOverlay(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.className("loading-overlay")
        ));
    }

    // Solution 2: JavaScript click
    public static void jsClick(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", element);
    }

    // Solution 3: Actions click
    public static void actionsClick(WebDriver driver, WebElement element) {
        Actions actions = new Actions(driver);
        actions.moveToElement(element).click().perform();
    }

    // Solution 4: Scroll into view first
    public static void scrollAndClick(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
        element.click();
    }
}
```

### Issue 2: StaleElementReferenceException

**Problem**: Element is no longer attached to DOM

**Solutions:**

```java
public class StaleElementSolutions {

    // Solution 1: Re-find the element
    public static void refindElement(WebDriver driver, By locator) {
        for (int i = 0; i < 3; i++) {
            try {
                WebElement element = driver.findElement(locator);
                element.click();
                break;
            } catch (StaleElementReferenceException e) {
                if (i == 2) throw e;
            }
        }
    }

    // Solution 2: Wait for element to be refreshed
    public static void waitForStaleElement(WebDriver driver, WebElement element) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.stalenessOf(element));
    }

    // Solution 3: Store locator, not element
    public static class ElementWrapper {
        private By locator;
        private WebDriver driver;

        public ElementWrapper(WebDriver driver, By locator) {
            this.driver = driver;
            this.locator = locator;
        }

        public void click() {
            driver.findElement(locator).click();
        }

        public String getText() {
            return driver.findElement(locator).getText();
        }
    }
}
```

### Issue 3: TimeoutException

**Problem**: Element not found within wait time

**Solutions:**

```java
public class TimeoutSolutions {

    // Solution 1: Increase wait time
    public static void increaseWait(WebDriver driver, By locator) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }

    // Solution 2: Check if element exists
    public static boolean isElementPresent(WebDriver driver, By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    // Solution 3: Poll with custom condition
    public static WebElement waitForElementWithPolling(WebDriver driver, By locator) {
        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(30))
            .pollingEvery(Duration.ofMillis(500))
            .ignoring(NoSuchElementException.class);

        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }
}
```

### Issue 4: Drag and Drop Not Working

**Problem**: dragAndDrop() method doesn't work

**Solutions:**

```java
public class DragDropSolutions {

    // Solution 1: Manual drag and drop
    public static void manualDragDrop(WebDriver driver, WebElement source, WebElement target) {
        Actions actions = new Actions(driver);
        actions.clickAndHold(source)
               .pause(Duration.ofMillis(500))
               .moveToElement(target)
               .pause(Duration.ofMillis(500))
               .release()
               .perform();
    }

    // Solution 2: Using offset
    public static void dragDropWithOffset(WebDriver driver, WebElement source, WebElement target) {
        Actions actions = new Actions(driver);

        int xOffset = target.getLocation().getX() - source.getLocation().getX();
        int yOffset = target.getLocation().getY() - source.getLocation().getY();

        actions.clickAndHold(source)
               .moveByOffset(xOffset, yOffset)
               .release()
               .perform();
    }

    // Solution 3: JavaScript drag and drop
    public static void jsDragDrop(WebDriver driver, WebElement source, WebElement target) {
        String script =
            "function createEvent(typeOfEvent) {" +
            "  var event = document.createEvent('CustomEvent');" +
            "  event.initCustomEvent(typeOfEvent, true, true, null);" +
            "  event.dataTransfer = { data: {}, setData: function(key, value) { this.data[key] = value; }, getData: function(key) { return this.data[key]; } };" +
            "  return event;" +
            "}" +
            "var source = arguments[0], target = arguments[1];" +
            "var event = createEvent('dragstart');" +
            "source.dispatchEvent(event);" +
            "event = createEvent('drop');" +
            "target.dispatchEvent(event);" +
            "event = createEvent('dragend');" +
            "source.dispatchEvent(event);";

        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(script, source, target);
    }
}
```

### Issue 5: File Upload Not Working

**Problem**: sendKeys() doesn't work for file upload

**Solutions:**

```java
public class FileUploadSolutions {

    // Solution 1: Check if input is visible
    public static void makeInputVisible(WebDriver driver, By locator) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebElement input = driver.findElement(locator);
        js.executeScript("arguments[0].style.display = 'block';", input);
        js.executeScript("arguments[0].style.visibility = 'visible';", input);
        input.sendKeys("/path/to/file");
    }

    // Solution 2: Use absolute path
    public static void useAbsolutePath(WebDriver driver, By locator) {
        WebElement input = driver.findElement(locator);
        String absolutePath = new File("testfile.pdf").getAbsolutePath();
        input.sendKeys(absolutePath);
    }

    // Solution 3: Remove readonly attribute
    public static void removeReadonly(WebDriver driver, By locator) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebElement input = driver.findElement(locator);
        js.executeScript("arguments[0].removeAttribute('readonly');", input);
        input.sendKeys("/path/to/file");
    }
}
```

### Issue 6: Shadow DOM Elements Not Found

**Problem**: Cannot locate elements inside shadow DOM

**Solution:**

```java
public class ShadowDOMSolution {

    public static WebElement findInShadowDOM(WebDriver driver, String hostSelector, String shadowSelector) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Method 1: Direct access
        return (WebElement) js.executeScript(
            "return document.querySelector(arguments[0]).shadowRoot.querySelector(arguments[1]);",
            hostSelector, shadowSelector
        );
    }

    public static WebElement findInNestedShadowDOM(WebDriver driver) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Access deeply nested shadow DOM
        return (WebElement) js.executeScript(
            "return document.querySelector('host1')" +
            ".shadowRoot.querySelector('host2')" +
            ".shadowRoot.querySelector('target');"
        );
    }
}
```

### Issue 7: Alert Not Present

**Problem**: Alert handling fails

**Solutions:**

```java
public class AlertSolutions {

    // Solution 1: Wait for alert
    public static boolean waitForAlert(WebDriver driver, int timeoutSeconds) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
            wait.until(ExpectedConditions.alertIsPresent());
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    // Solution 2: Check if alert exists before handling
    public static void safeHandleAlert(WebDriver driver) {
        try {
            Alert alert = driver.switchTo().alert();
            System.out.println("Alert text: " + alert.getText());
            alert.accept();
        } catch (NoAlertPresentException e) {
            System.out.println("No alert present");
        }
    }

    // Solution 3: Use JavaScript to check for alert
    public static boolean isAlertPresentJS(WebDriver driver) {
        try {
            driver.switchTo().alert();
            return true;
        } catch (NoAlertPresentException e) {
            return false;
        }
    }
}
```

---

## Performance Optimization Tips

### 1. Efficient Waits

```java
public class EfficientWaits {

    // BAD: Using Thread.sleep()
    public static void badApproach(WebDriver driver) {
        driver.findElement(By.id("button")).click();
        try {
            Thread.sleep(5000); // Always waits 5 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // GOOD: Using Explicit Wait
    public static void goodApproach(WebDriver driver) {
        driver.findElement(By.id("button")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("result")));
        // Proceeds as soon as element is visible (could be < 5 seconds)
    }

    // BEST: Using FluentWait with custom polling
    public static void bestApproach(WebDriver driver) {
        driver.findElement(By.id("button")).click();

        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(5))
            .pollingEvery(Duration.ofMillis(250))
            .ignoring(NoSuchElementException.class);

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("result")));
    }
}
```

### 2. Reuse Objects

```java
public class ReuseObjects {

    // BAD: Creating new objects repeatedly
    public static void badApproach(WebDriver driver) {
        for (int i = 0; i < 10; i++) {
            Actions actions = new Actions(driver); // Created 10 times
            actions.moveToElement(driver.findElement(By.id("element" + i))).perform();
        }
    }

    // GOOD: Reuse objects
    public static void goodApproach(WebDriver driver) {
        Actions actions = new Actions(driver); // Created once

        for (int i = 0; i < 10; i++) {
            actions.moveToElement(driver.findElement(By.id("element" + i))).perform();
        }
    }
}
```

### 3. Batch Operations

```java
public class BatchOperations {

    // BAD: Multiple separate actions
    public static void badApproach(WebDriver driver) {
        Actions actions = new Actions(driver);

        actions.click(driver.findElement(By.id("button1"))).perform();
        actions.click(driver.findElement(By.id("button2"))).perform();
        actions.click(driver.findElement(By.id("button3"))).perform();
        // 3 separate perform() calls = 3 round trips
    }

    // GOOD: Batch actions together
    public static void goodApproach(WebDriver driver) {
        Actions actions = new Actions(driver);

        actions.click(driver.findElement(By.id("button1")))
               .click(driver.findElement(By.id("button2")))
               .click(driver.findElement(By.id("button3")))
               .perform(); // Single perform() call = 1 round trip
    }
}
```

### 4. Efficient Element Location

```java
public class EfficientLocators {

    // BAD: Using XPath with contains()
    public static void badApproach(WebDriver driver) {
        driver.findElement(
            By.xpath("//*[contains(@class, 'button')]")
        ).click();
    }

    // GOOD: Using ID or CSS
    public static void goodApproach(WebDriver driver) {
        driver.findElement(By.id("submitButton")).click();
        // or
        driver.findElement(By.cssSelector(".button.primary")).click();
    }

    // BEST: Store and reuse elements
    public static void bestApproach(WebDriver driver) {
        WebElement button = driver.findElement(By.id("submitButton"));
        button.click();
        // If needed again, reuse 'button' variable
    }
}
```

### 5. Minimize Page Loads

```java
public class MinimizePageLoads {

    // BAD: Multiple navigations
    public static void badApproach(WebDriver driver) {
        driver.get("https://example.com/page1");
        // Do something
        driver.get("https://example.com/page2");
        // Do something
        driver.get("https://example.com/page1"); // Reload same page
    }

    // GOOD: Navigate efficiently
    public static void goodApproach(WebDriver driver) {
        driver.get("https://example.com/page1");
        // Do all page1 tasks

        driver.get("https://example.com/page2");
        // Do all page2 tasks

        driver.navigate().back(); // Use navigation instead of reload
    }
}
```

### 6. Parallel Execution

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ParallelExecution {

    public static void runTestsInParallel() {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        executor.submit(() -> runTest("Test1"));
        executor.submit(() -> runTest("Test2"));
        executor.submit(() -> runTest("Test3"));

        executor.shutdown();
    }

    private static void runTest(String testName) {
        WebDriver driver = new ChromeDriver();
        try {
            // Run test
            System.out.println("Running " + testName);
        } finally {
            driver.quit();
        }
    }
}
```

---

## Preparing for Week 3

### What's Coming in Week 3

Week 3 focuses on **Framework Development and Best Practices**:

1. **Day 15**: Page Object Model (POM) - Part 1
2. **Day 16**: Page Object Model (POM) - Part 2
3. **Day 17**: Data-Driven Testing
4. **Day 18**: Logging and Reporting - Part 1
5. **Day 19**: Logging and Reporting - Part 2
6. **Day 20**: Configuration Management
7. **Day 21**: Week 3 Review and Framework Project

### Prerequisites for Week 3

```java
// 1. Understand OOP concepts
public class OOPPrerequisites {
    /*
    - Classes and Objects
    - Inheritance
    - Encapsulation
    - Polymorphism
    - Interfaces
    */
}

// 2. File I/O operations
public class FileIOPrerequisites {
    /*
    - Reading from files (CSV, Excel, JSON)
    - Writing to files
    - File paths and directories
    - Properties files
    */
}

// 3. Collections Framework
public class CollectionsPrerequisites {
    /*
    - Lists, Sets, Maps
    - Iteration
    - Streams (Java 8+)
    */
}

// 4. Exception Handling
public class ExceptionPrerequisites {
    /*
    - try-catch-finally
    - Custom exceptions
    - Exception propagation
    */
}
```

### Recommended Preparation Tasks

**1. Review OOP Concepts:**
```java
// Practice creating classes with encapsulation
public class LoginPage {
    private WebDriver driver;
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    public void enterUsername(String username) {
        driver.findElement(usernameField).sendKeys(username);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }
}
```

**2. Practice File Operations:**
```java
import java.io.*;
import java.util.*;

public class FileOperationsPractice {

    // Read from CSV
    public static List<String[]> readCSV(String filePath) {
        List<String[]> data = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                data.add(line.split(","));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }

    // Read properties file
    public static Properties readProperties(String filePath) {
        Properties props = new Properties();
        try (FileInputStream fis = new FileInputStream(filePath)) {
            props.load(fis);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return props;
    }
}
```

**3. Understand TestNG/JUnit:**
```java
import org.testng.annotations.*;

public class TestNGPractice {

    @BeforeClass
    public void setup() {
        System.out.println("Setup before all tests");
    }

    @Test
    public void test1() {
        System.out.println("Test 1");
    }

    @Test
    public void test2() {
        System.out.println("Test 2");
    }

    @AfterClass
    public void tearDown() {
        System.out.println("Cleanup after all tests");
    }
}
```

### Study Resources

1. **Selenium Documentation**: https://www.selenium.dev/documentation/
2. **TestNG Documentation**: https://testng.org/doc/
3. **Java OOP Tutorials**: Oracle Java Tutorials
4. **Design Patterns**: Gang of Four (GoF) patterns
5. **Maven/Gradle**: Build automation tools

---

## Week 2 Interview Questions

### Question 1: Explain the Actions class and its use cases

**Answer:**
The Actions class in Selenium provides advanced user interactions that simulate complex user behaviors. It's used when simple WebElement methods like `click()` and `sendKeys()` are insufficient.

**Key use cases:**
- Mouse hover (moveToElement)
- Drag and drop operations
- Right-click (context click)
- Double-click
- Keyboard actions (key combinations)
- Complex gesture chains

**Example:**
```java
Actions actions = new Actions(driver);
WebElement menu = driver.findElement(By.id("menu"));
actions.moveToElement(menu).perform(); // Hover
```

### Question 2: What's the difference between dragAndDrop() and dragAndDropBy()?

**Answer:**
- **dragAndDrop(source, target)**: Drags source element and drops it on target element
- **dragAndDropBy(source, xOffset, yOffset)**: Drags source element and drops it at specified pixel offset

**When to use:**
- Use `dragAndDrop()` when you have a specific target element
- Use `dragAndDropBy()` when you need to move by specific pixels (e.g., sliders)

```java
// dragAndDrop - element to element
actions.dragAndDrop(sourceElement, targetElement).perform();

// dragAndDropBy - by pixel offset
actions.dragAndDropBy(slider, 100, 0).perform();
```

### Question 3: How do you handle dynamic web tables?

**Answer:**
Dynamic web tables require flexible XPath locators and proper waits:

**Strategies:**
1. Use dynamic XPath with variables
2. Implement pagination handling
3. Use explicit waits for table refresh
4. Create reusable methods for table operations

```java
// Dynamic row selection
String xpath = "//table//tr[td[text()='" + searchValue + "']]";

// Get all rows
List<WebElement> rows = driver.findElements(By.xpath("//table//tbody/tr"));

// Handle pagination
while (hasNextPage()) {
    processCurrentPage();
    clickNext();
    waitForTableRefresh();
}
```

### Question 4: Explain different file upload techniques

**Answer:**
Three main techniques:

1. **sendKeys()** - Simplest, works when input type="file" is accessible
```java
driver.findElement(By.id("fileInput")).sendKeys("/path/to/file");
```

2. **Robot Class** - For native file dialogs
```java
StringSelection selection = new StringSelection(filePath);
Toolkit.getDefaultToolkit().getSystemClipboard().setContents(selection, null);

Robot robot = new Robot();
robot.keyPress(KeyEvent.VK_CONTROL);
robot.keyPress(KeyEvent.VK_V);
robot.keyRelease(KeyEvent.VK_V);
robot.keyRelease(KeyEvent.VK_CONTROL);
robot.keyPress(KeyEvent.VK_ENTER);
robot.keyRelease(KeyEvent.VK_ENTER);
```

3. **AutoIt** - Windows automation tool
```java
Runtime.getRuntime().exec("AutoItScript.exe " + filePath);
```

### Question 5: When should you use JavaScript Executor?

**Answer:**
Use JavascriptExecutor when:

1. **Element is hidden or not interactable**
```java
js.executeScript("arguments[0].click();", element);
```

2. **Need to scroll**
```java
js.executeScript("arguments[0].scrollIntoView(true);", element);
```

3. **Access element properties not available through WebElement**
```java
String value = (String) js.executeScript("return arguments[0].value;", element);
```

4. **Modify DOM directly**
```java
js.executeScript("arguments[0].style.border='3px solid red';", element);
```

5. **Wait for page load or AJAX**
```java
js.executeScript("return document.readyState").equals("complete");
```

### Question 6: How do you handle iFrames in Selenium?

**Answer:**
iFrames require explicit switching before interacting with elements inside them:

**Three ways to switch:**
```java
// 1. By index
driver.switchTo().frame(0);

// 2. By name or ID
driver.switchTo().frame("frameName");

// 3. By WebElement
WebElement frameElement = driver.findElement(By.id("frameId"));
driver.switchTo().frame(frameElement);

// Switch back
driver.switchTo().defaultContent(); // To main page
driver.switchTo().parentFrame(); // To parent frame
```

**Best practice:**
```java
// Switch to frame, perform action, switch back
driver.switchTo().frame("myFrame");
driver.findElement(By.id("insideFrame")).click();
driver.switchTo().defaultContent();
```

### Question 7: Explain Shadow DOM and how to handle it

**Answer:**
Shadow DOM is an encapsulated DOM subtree that provides style and markup encapsulation. Regular Selenium locators cannot access elements inside Shadow DOM.

**Handling approach:**
```java
JavascriptExecutor js = (JavascriptExecutor) driver;

// Access shadow root
WebElement shadowHost = driver.findElement(By.id("host"));
WebElement shadowRoot = (WebElement) js.executeScript(
    "return arguments[0].shadowRoot", shadowHost
);

// Find element in shadow DOM
WebElement shadowElement = (WebElement) js.executeScript(
    "return arguments[0].querySelector('.target')", shadowRoot
);
```

**For Selenium 4:**
```java
WebElement shadowHost = driver.findElement(By.id("host"));
SearchContext shadowRoot = shadowHost.getShadowRoot();
WebElement shadowElement = shadowRoot.findElement(By.cssSelector(".target"));
```

### Question 8: What are the different types of alerts and how do you handle them?

**Answer:**
Three types of JavaScript alerts:

1. **Simple Alert** - Only OK button
```java
Alert alert = driver.switchTo().alert();
alert.accept();
```

2. **Confirmation Alert** - OK and Cancel
```java
Alert alert = driver.switchTo().alert();
alert.accept(); // Click OK
// or
alert.dismiss(); // Click Cancel
```

3. **Prompt Alert** - Input field with OK/Cancel
```java
Alert alert = driver.switchTo().alert();
alert.sendKeys("Input text");
alert.accept();
```

**Best practice with wait:**
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.alertIsPresent());
Alert alert = driver.switchTo().alert();
String alertText = alert.getText();
alert.accept();
```

### Question 9: How do you handle multiple windows/tabs?

**Answer:**
Use window handles to switch between windows:

```java
// Store main window
String mainWindow = driver.getWindowHandle();

// Get all windows
Set<String> allWindows = driver.getWindowHandles();

// Switch to new window
for (String window : allWindows) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        break;
    }
}

// Perform actions in new window
// ...

// Close new window and switch back
driver.close();
driver.switchTo().window(mainWindow);
```

**Switch by title:**
```java
public void switchToWindowByTitle(String title) {
    Set<String> windows = driver.getWindowHandles();
    for (String window : windows) {
        driver.switchTo().window(window);
        if (driver.getTitle().equals(title)) {
            break;
        }
    }
}
```

### Question 10: What's the difference between findElement() and findElements()?

**Answer:**

| Aspect | findElement() | findElements() |
|--------|---------------|----------------|
| Return Type | WebElement | List<WebElement> |
| When not found | Throws NoSuchElementException | Returns empty list |
| Use case | Single element | Multiple matching elements |

```java
// findElement - throws exception if not found
WebElement element = driver.findElement(By.id("button"));

// findElements - returns empty list if not found
List<WebElement> elements = driver.findElements(By.className("item"));
if (elements.isEmpty()) {
    System.out.println("No elements found");
}
```

### Question 11: How do you verify if a file has been downloaded?

**Answer:**
Check the download directory for the file:

```java
public boolean isFileDownloaded(String downloadPath, String fileName, int timeout) {
    File dir = new File(downloadPath);
    int waitTime = 0;

    while (waitTime < timeout) {
        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.getName().equals(fileName)) {
                    return true;
                }
            }
        }

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        waitTime++;
    }

    return false;
}
```

**Configure download directory:**
```java
ChromeOptions options = new ChromeOptions();
Map<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", "/path/to/download");
options.setExperimentalOption("prefs", prefs);
```

### Question 12: Explain StaleElementReferenceException

**Answer:**
Occurs when an element reference is no longer valid because:
1. Page was refreshed
2. DOM was updated
3. Element was removed and re-added

**Solutions:**
```java
// Solution 1: Re-find element
try {
    element.click();
} catch (StaleElementReferenceException e) {
    element = driver.findElement(By.id("button"));
    element.click();
}

// Solution 2: Store locator, not element
private By buttonLocator = By.id("button");

public void clickButton() {
    driver.findElement(buttonLocator).click(); // Always fresh
}

// Solution 3: Wait for staleness
wait.until(ExpectedConditions.stalenessOf(element));
```

### Question 13: How do you handle AJAX calls in Selenium?

**Answer:**
Use explicit waits to wait for AJAX to complete:

```java
// Wait for element to appear
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("result")));

// Wait for element to be clickable
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));

// Wait using JavaScript
wait.until(driver -> {
    return ((JavascriptExecutor) driver)
        .executeScript("return jQuery.active == 0").equals(true);
});

// Wait for specific text
wait.until(ExpectedConditions.textToBePresentInElementLocated(
    By.id("status"), "Complete"
));
```

### Question 14: What's the difference between implicit and explicit wait?

**Answer:**

| Aspect | Implicit Wait | Explicit Wait |
|--------|---------------|---------------|
| Scope | All elements | Specific element |
| Declaration | Once per driver | Each wait condition |
| Exception | NoSuchElementException | TimeoutException |
| Flexibility | Low | High |
| Recommended | No | Yes |

```java
// Implicit wait - applies to all findElement calls
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Explicit wait - specific condition
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("element")));
```

**Best practice:** Use only explicit waits, avoid mixing both.

### Question 15: How do you take screenshots in Selenium?

**Answer:**

```java
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.OutputType;
import org.apache.commons.io.FileUtils;

public void takeScreenshot(String fileName) {
    TakesScreenshot ts = (TakesScreenshot) driver;
    File source = ts.getScreenshotAs(OutputType.FILE);
    File destination = new File("screenshots/" + fileName + ".png");

    try {
        FileUtils.copyFile(source, destination);
    } catch (IOException e) {
        e.printStackTrace();
    }
}

// Take screenshot of specific element (Selenium 4)
public void takeElementScreenshot(WebElement element, String fileName) {
    File source = element.getScreenshotAs(OutputType.FILE);
    File destination = new File("screenshots/" + fileName + ".png");

    try {
        FileUtils.copyFile(source, destination);
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

### Question 16-20: Quick Fire Questions

**Q16: What is the purpose of the pause() method in Actions class?**
**A:** Adds a delay between actions in a chain. Useful for debugging or when actions need time between them.
```java
actions.click(element1).pause(Duration.ofMillis(500)).click(element2).perform();
```

**Q17: How do you handle hidden elements?**
**A:** Use JavascriptExecutor to interact with them:
```java
js.executeScript("arguments[0].click();", hiddenElement);
```

**Q18: What's the difference between close() and quit()?**
**A:**
- `close()`: Closes current window/tab
- `quit()`: Closes all windows and ends session

**Q19: How do you scroll to an element?**
**A:**
```java
js.executeScript("arguments[0].scrollIntoView(true);", element);
```

**Q20: What is FluentWait?**
**A:** Advanced wait with custom polling interval and ignored exceptions:
```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);
```

---

## Practice Exercises

### Exercise 1: Multi-level Menu Navigation

**Task:** Create a script to navigate through a multi-level dropdown menu and select an item.

**Requirements:**
- Hover over main menu
- Hover over submenu
- Click on menu item
- Verify navigation

**Solution:**
```java
public void navigateMultiLevelMenu(WebDriver driver) {
    Actions actions = new Actions(driver);

    // Hover over main menu
    WebElement mainMenu = driver.findElement(By.id("productsMenu"));
    actions.moveToElement(mainMenu).perform();
    Thread.sleep(500);

    // Hover over submenu
    WebElement subMenu = driver.findElement(By.linkText("Electronics"));
    actions.moveToElement(subMenu).perform();
    Thread.sleep(500);

    // Click menu item
    WebElement menuItem = driver.findElement(By.linkText("Laptops"));
    actions.moveToElement(menuItem).click().perform();

    // Verify navigation
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.titleContains("Laptops"));

    System.out.println("Successfully navigated to: " + driver.getTitle());
}
```

### Exercise 2: Table Data Extraction and Validation

**Task:** Extract all data from a product table and calculate total price.

**Requirements:**
- Read all rows from table
- Extract product names and prices
- Calculate total
- Verify against displayed total

**Solution:**
```java
public void validateTableTotals(WebDriver driver) {
    List<WebElement> rows = driver.findElements(
        By.xpath("//table[@id='productTable']//tbody/tr")
    );

    double calculatedTotal = 0;
    List<String> products = new ArrayList<>();

    for (WebElement row : rows) {
        String product = row.findElement(By.xpath(".//td[1]")).getText();
        String priceText = row.findElement(By.xpath(".//td[2]")).getText();
        double price = Double.parseDouble(priceText.replace("$", ""));

        products.add(product);
        calculatedTotal += price;

        System.out.println(product + ": $" + price);
    }

    // Get displayed total
    String displayedTotalText = driver.findElement(By.id("totalPrice")).getText();
    double displayedTotal = Double.parseDouble(displayedTotalText.replace("$", ""));

    // Verify
    System.out.println("\nCalculated Total: $" + calculatedTotal);
    System.out.println("Displayed Total: $" + displayedTotal);

    if (Math.abs(calculatedTotal - displayedTotal) < 0.01) {
        System.out.println("✓ Total price verified successfully!");
    } else {
        System.out.println("✗ Total price mismatch!");
    }
}
```

### Exercise 3: Drag and Drop Puzzle

**Task:** Solve a drag-and-drop puzzle by arranging pieces in correct order.

**Requirements:**
- Find all puzzle pieces
- Drag pieces to correct positions
- Verify completion

**Solution:**
```java
public void solveDragDropPuzzle(WebDriver driver) {
    Actions actions = new Actions(driver);

    // Mapping of pieces to target positions
    Map<String, String> pieceToTarget = new HashMap<>();
    pieceToTarget.put("piece1", "slot3");
    pieceToTarget.put("piece2", "slot1");
    pieceToTarget.put("piece3", "slot4");
    pieceToTarget.put("piece4", "slot2");

    for (Map.Entry<String, String> entry : pieceToTarget.entrySet()) {
        WebElement piece = driver.findElement(By.id(entry.getKey()));
        WebElement target = driver.findElement(By.id(entry.getValue()));

        // Highlight piece
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].style.border='3px solid blue';", piece);
        Thread.sleep(300);

        // Drag and drop
        actions.clickAndHold(piece)
               .pause(Duration.ofMillis(500))
               .moveToElement(target)
               .pause(Duration.ofMillis(500))
               .release()
               .perform();

        Thread.sleep(500);
    }

    // Verify completion
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
    wait.until(ExpectedConditions.visibilityOfElementLocated(
        By.xpath("//div[contains(text(), 'Puzzle Solved!')]")
    ));

    System.out.println("✓ Puzzle solved successfully!");
}
```

### Exercise 4: File Upload and Download Workflow

**Task:** Upload a document, process it, and download the result.

**Requirements:**
- Upload file
- Wait for processing
- Download processed file
- Verify download

**Solution:**
```java
public void completeFileWorkflow(WebDriver driver, String uploadFilePath) {
    String downloadPath = System.getProperty("user.home") + "/Downloads";

    // Upload file
    WebElement uploadInput = driver.findElement(By.id("fileUpload"));
    uploadInput.sendKeys(uploadFilePath);

    driver.findElement(By.id("uploadButton")).click();

    // Wait for processing
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    wait.until(ExpectedConditions.visibilityOfElementLocated(
        By.xpath("//div[contains(text(), 'Processing Complete')]")
    ));

    // Get processed file name
    String processedFileName = driver.findElement(By.id("processedFileName")).getText();

    // Download processed file
    driver.findElement(By.id("downloadButton")).click();

    // Verify download
    boolean downloaded = waitForFileDownload(downloadPath, processedFileName, 30);

    if (downloaded) {
        System.out.println("✓ File workflow completed successfully!");
        System.out.println("Downloaded: " + processedFileName);
    } else {
        System.out.println("✗ File download failed!");
    }
}

private boolean waitForFileDownload(String path, String fileName, int timeout) {
    File dir = new File(path);
    int waited = 0;

    while (waited < timeout) {
        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.getName().equals(fileName)) {
                    return true;
                }
            }
        }

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        waited++;
    }

    return false;
}
```

### Exercise 5: Complex Form with JavaScript Interaction

**Task:** Fill a complex form with various field types using multiple techniques.

**Requirements:**
- Regular text fields
- Hidden fields (JavaScript)
- Dropdowns (Actions)
- Checkboxes and radio buttons
- File upload
- Submit and verify

**Solution:**
```java
public void fillComplexForm(WebDriver driver) {
    Actions actions = new Actions(driver);
    JavascriptExecutor js = (JavascriptExecutor) driver;

    // Regular text fields
    driver.findElement(By.id("firstName")).sendKeys("John");
    driver.findElement(By.id("lastName")).sendKeys("Doe");

    // Hidden field using JavaScript
    WebElement hiddenField = driver.findElement(By.id("hiddenToken"));
    js.executeScript("arguments[0].value='SECRET_TOKEN_123';", hiddenField);

    // Email with keyboard actions
    WebElement emailField = driver.findElement(By.id("email"));
    actions.click(emailField)
           .sendKeys("john.doe@example.com")
           .perform();

    // Dropdown using Actions
    WebElement dropdown = driver.findElement(By.id("country"));
    dropdown.click();
    actions.sendKeys(Keys.ARROW_DOWN)
           .sendKeys(Keys.ARROW_DOWN)
           .sendKeys(Keys.ENTER)
           .perform();

    // Checkboxes
    driver.findElement(By.id("terms")).click();
    driver.findElement(By.id("newsletter")).click();

    // Radio button
    WebElement radioButton = driver.findElement(By.id("genderMale"));
    js.executeScript("arguments[0].click();", radioButton);

    // Date picker
    driver.findElement(By.id("dateOfBirth")).click();
    driver.findElement(By.xpath("//td[@data-date='1990-01-15']")).click();

    // File upload
    String filePath = "/path/to/document.pdf";
    driver.findElement(By.id("document")).sendKeys(filePath);

    // Scroll to submit button
    WebElement submitButton = driver.findElement(By.id("submitForm"));
    js.executeScript("arguments[0].scrollIntoView(true);", submitButton);

    // Submit form
    actions.moveToElement(submitButton).click().perform();

    // Wait for success message
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.visibilityOfElementLocated(
        By.xpath("//div[contains(text(), 'Form Submitted Successfully')]")
    ));

    System.out.println("✓ Complex form submitted successfully!");
}
```

### Exercise 6: Shadow DOM Navigation

**Task:** Navigate and interact with elements inside nested Shadow DOM.

**Requirements:**
- Find shadow host
- Access shadow root
- Interact with shadow elements
- Handle nested shadow DOM

**Solution:**
```java
public void interactWithShadowDOM(WebDriver driver) {
    JavascriptExecutor js = (JavascriptExecutor) driver;

    // Access first level shadow DOM
    WebElement shadowHost1 = driver.findElement(By.id("shadowHost1"));
    WebElement shadowRoot1 = (WebElement) js.executeScript(
        "return arguments[0].shadowRoot", shadowHost1
    );

    // Find element in first shadow DOM
    WebElement innerElement = (WebElement) js.executeScript(
        "return arguments[0].querySelector('#innerButton')", shadowRoot1
    );

    // Highlight and click
    js.executeScript("arguments[0].style.border='3px solid red';", innerElement);
    Thread.sleep(500);
    innerElement.click();

    // Access nested shadow DOM
    WebElement shadowHost2 = (WebElement) js.executeScript(
        "return arguments[0].querySelector('#shadowHost2')", shadowRoot1
    );
    WebElement shadowRoot2 = (WebElement) js.executeScript(
        "return arguments[0].shadowRoot", shadowHost2
    );

    // Interact with deeply nested element
    WebElement deepElement = (WebElement) js.executeScript(
        "return arguments[0].querySelector('.deep-element')", shadowRoot2
    );

    String text = deepElement.getText();
    System.out.println("Text from nested Shadow DOM: " + text);

    // Send keys to shadow element
    WebElement shadowInput = (WebElement) js.executeScript(
        "return arguments[0].querySelector('input')", shadowRoot2
    );
    js.executeScript("arguments[0].value='Shadow DOM Input';", shadowInput);

    System.out.println("✓ Successfully interacted with nested Shadow DOM!");
}
```

---

## Key Takeaways

### Week 2 Summary

1. **Actions Class Mastery**
   - Complex mouse and keyboard interactions
   - Method chaining for efficient automation
   - Real-world scenarios like hover menus and shortcuts

2. **Drag and Drop Expertise**
   - Multiple techniques for different scenarios
   - Slider manipulation and precise movements
   - Troubleshooting common drag-drop issues

3. **Web Table Proficiency**
   - Static and dynamic table handling
   - Pagination and sorting
   - Data extraction and validation

4. **File Operations**
   - Multiple upload techniques (sendKeys, Robot, AutoIt)
   - Download verification and management
   - Multiple file handling

5. **JavaScript Executor Power**
   - DOM manipulation and element interaction
   - Handling hidden and difficult elements
   - Performance optimization

6. **Advanced Scenarios**
   - Alert, window, and iframe handling
   - Shadow DOM navigation
   - Complex popup scenarios

### Key Skills Acquired

✓ Advanced element interaction techniques
✓ Complex user workflow automation
✓ Dynamic content handling
✓ File operation automation
✓ JavaScript integration in Selenium
✓ Troubleshooting and debugging skills
✓ Performance optimization awareness
✓ Framework-ready coding practices

### Best Practices to Remember

1. **Always use explicit waits** over Thread.sleep()
2. **Reuse objects** (Actions, JavascriptExecutor) for better performance
3. **Handle exceptions gracefully** with try-catch blocks
4. **Use meaningful variable names** and comments
5. **Batch actions together** when using Actions class
6. **Verify actions** after execution (e.g., file download, form submission)
7. **Clean up resources** (close browsers, delete temp files)
8. **Log important actions** for debugging

### Moving Forward

You've completed Week 2 of Selenium Automation! You now have a solid foundation in:
- Basic and advanced Selenium operations
- Complex user interactions
- Real-world automation scenarios

**Next Steps:**
1. Complete all practice exercises
2. Build the mini project from scratch
3. Review any challenging concepts
4. Prepare for Week 3 (Framework Development)
5. Practice with different websites

### Additional Resources

**Practice Websites:**
- https://the-internet.herokuapp.com/
- https://demo.guru99.com/test/drag_drop.html
- https://jqueryui.com/draggable/
- https://demoqa.com/
- https://www.seleniumeasy.com/test/

**Communities:**
- Selenium Users Group
- Stack Overflow (selenium tag)
- Reddit r/selenium
- Selenium Official Forum

**Continue Learning:**
- Week 3: Page Object Model
- Week 4: TestNG/JUnit Integration
- Week 5: Data-Driven Testing
- Week 6: CI/CD Integration

---

## Conclusion

Congratulations on completing Week 2! You've learned advanced Selenium techniques that are essential for real-world test automation. The concepts covered this week form the backbone of professional automation frameworks.

**Remember:**
- Practice consistently
- Experiment with different websites
- Build projects to reinforce learning
- Ask questions in communities
- Review concepts regularly

**You're now ready for Week 3: Framework Development!**

Happy Automating! 🚀

---

[← Back to Selenium Course](../README.md) | [← Day 13](../week2/day13_popups_shadow_dom.md) | [Day 15 →](../week3/day15_page_object_model.md)

---

**Course:** Selenium Automation Daily
**Week:** 2
**Day:** 14
**Topic:** Week 2 Review and Mini Project
**Duration:** 3-4 hours
**Last Updated:** 2026

