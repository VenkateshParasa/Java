
# Week 1: Selenium Fundamentals - Beginner-Friendly Exercises

## Day 1: Selenium Introduction & Setup

### Exercise 1: First Selenium Script

```exercise
title: Create Your First Selenium Test
description: Write a complete Selenium script that opens Chrome browser, navigates to Google, prints the page title, and closes the browser.
requirements:
- Import necessary Selenium classes
- Initialize ChromeDriver
- Navigate to https://www.google.com
- Print the page title to console
- Close the browser properly
testcases:
- input: "Run the program"
  output: "Page title should contain 'Google'"
hints:
- Use WebDriver interface for driver declaration
- Use driver.get() for navigation
- Use driver.getTitle() to get page title
- Always call driver.quit() to clean up
solution:
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class FirstSeleniumTest {
    public static void main(String[] args) {
        // Initialize ChromeDriver
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to Google
            driver.get("https://www.google.com");
            
            // Get and print page title
            String pageTitle = driver.getTitle();
            System.out.println("Page Title: " + pageTitle);
            
            // Verify title contains "Google"
            if (pageTitle.contains("Google")) {
                System.out.println("✓ Test Passed: Title contains Google");
            } else {
                System.out.println("✗ Test Failed: Title doesn't contain Google");
            }
            
        } finally {
            // Close browser
            driver.quit();
            System.out.println("Browser closed successfully");
        }
    }
}
```
\```
```

### Exercise 2: Browser Navigation

```exercise
title: Navigate Between Multiple Pages
description: Create a script that navigates to Wikipedia, then to the documentation page, goes back, goes forward, and refreshes the page.
requirements:
- Navigate to https://www.wikipedia.org
- Navigate to https://www.wikipedia.org/wiki/Main_Page
- Use back() to return to homepage
- Use forward() to go to Main_Page again
- Use refresh() to reload the page
- Print current URL after each navigation
testcases:
- input: "Execute navigation sequence"
  output: "Should print URLs after each navigation step"
hints:
- Use driver.navigate().to() for navigation
- Use driver.navigate().back() to go back
- Use driver.navigate().forward() to go forward
- Use driver.navigate().refresh() to reload
- Use driver.getCurrentUrl() to get current URL
solution:
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class BrowserNavigation {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to Wikipedia homepage
            driver.get("https://www.wikipedia.org");
            System.out.println("1. Homepage: " + driver.getCurrentUrl());
            Thread.sleep(2000);
            
            // Navigate to Main Page
            driver.navigate().to("https://www.wikipedia.org/wiki/Main_Page");
            System.out.println("2. Main Page: " + driver.getCurrentUrl());
            Thread.sleep(2000);
            
            // Go back
            driver.navigate().back();
            System.out.println("3. After back: " + driver.getCurrentUrl());
            Thread.sleep(2000);
            
            // Go forward
            driver.navigate().forward();
            System.out.println("4. After forward: " + driver.getCurrentUrl());
            Thread.sleep(2000);
            
            // Refresh page
            driver.navigate().refresh();
            System.out.println("5. After refresh: " + driver.getCurrentUrl());
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 2: Locators

### Exercise 3: Find Elements Using Different Locators

```exercise
title: Practice All 8 Locator Types
description: Create a script that finds the Google search box using 3 different locator strategies and prints confirmation for each.
requirements:
- Navigate to https://www.google.com
- Find search box using By.name()
- Find search box using By.cssSelector()
- Find search box using By.xpath()
- Print confirmation message for each successful find
testcases:
- input: "Find search box with different locators"
  output: "Should print 3 success messages"
hints:
- Google search box has name="q"
- CSS selector can use [name='q']
- XPath can use //textarea[@name='q']
- Use driver.findElement() for each locator
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LocatorPractice {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.google.com");
            driver.manage().window().maximize();
            
            // Method 1: By Name
            WebElement searchBox1 = driver.findElement(By.name("q"));
            System.out.println("✓ Found using By.name: " + searchBox1.getTagName());
            
            // Method 2: By CSS Selector
            WebElement searchBox2 = driver.findElement(By.cssSelector("textarea[name='q']"));
            System.out.println("✓ Found using By.cssSelector: " + searchBox2.getTagName());
            
            // Method 3: By XPath
            WebElement searchBox3 = driver.findElement(By.xpath("//textarea[@name='q']"));
            System.out.println("✓ Found using By.xpath: " + searchBox3.getTagName());
            
            // Verify all found the same element
            System.out.println("\nAll three locators found the search box successfully!");
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 4: Count and Iterate Through Elements

```exercise
title: Find and Count All Links on a Page
description: Navigate to a website and count all links, then print the text of the first 5 links.
requirements:
- Navigate to https://www.selenium.dev
- Find all <a> tags using By.tagName()
- Print total count of links
- Print text of first 5 links
- Handle empty link text gracefully
testcases:
- input: "Count links on Selenium website"
  output: "Should print total count and first 5 link texts"
hints:
- Use driver.findElements() (plural) to get all links
- Use By.tagName("a") to find all anchor tags
- Use .size() to get count of elements
- Use .get(index) to access specific elements
- Check if getText() is empty before printing
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class CountLinks {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev");
            driver.manage().window().maximize();
            
            // Find all links
            List<WebElement> allLinks = driver.findElements(By.tagName("a"));
            
            // Print total count
            System.out.println("Total links found: " + allLinks.size());
            System.out.println("\nFirst 5 links:");
            System.out.println("=" .repeat(50));
            
            // Print first 5 links
            for (int i = 0; i < Math.min(5, allLinks.size()); i++) {
                WebElement link = allLinks.get(i);
                String linkText = link.getText();
                String href = link.getAttribute("href");
                
                if (!linkText.isEmpty()) {
                    System.out.println((i + 1) + ". " + linkText);
                    System.out.println("   URL: " + href);
                } else {
                    System.out.println((i + 1) + ". [No text]");
                    System.out.println("   URL: " + href);
                }
            }
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 3: WebDriver Commands

### Exercise 5: Window Management

```exercise
title: Practice Window Size and Position Commands
description: Create a script that demonstrates window maximize, custom size, and position management.
requirements:
- Open browser and navigate to any website
- Maximize the window
- Set custom window size (1024x768)
- Get and print current window size
- Set window position to (100, 100)
- Get and print current window position
testcases:
- input: "Manage window size and position"
  output: "Should print size and position after each change"
hints:
- Use driver.manage().window().maximize()
- Use driver.manage().window().setSize(new Dimension(width, height))
- Use driver.manage().window().getSize()
- Use driver.manage().window().setPosition(new Point(x, y))
- Import Dimension and Point from org.openqa.selenium
solution:
```java
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class WindowManagement {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev");
            
            // Maximize window
            driver.manage().window().maximize();
            System.out.println("✓ Window maximized");
            Thread.sleep(2000);
            
            // Set custom size
            Dimension customSize = new Dimension(1024, 768);
            driver.manage().window().setSize(customSize);
            System.out.println("✓ Window resized to 1024x768");
            Thread.sleep(2000);
            
            // Get current size
            Dimension currentSize = driver.manage().window().getSize();
            System.out.println("Current size: " + currentSize.getWidth() + "x" + currentSize.getHeight());
            
            // Set position
            Point position = new Point(100, 100);
            driver.manage().window().setPosition(position);
            System.out.println("✓ Window moved to (100, 100)");
            Thread.sleep(2000);
            
            // Get current position
            Point currentPosition = driver.manage().window().getPosition();
            System.out.println("Current position: (" + currentPosition.getX() + ", " + currentPosition.getY() + ")");
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 6: Take Screenshots

```exercise
title: Capture and Save Screenshot
description: Navigate to a website and take a screenshot with timestamp in filename.
requirements:
- Navigate to https://www.wikipedia.org
- Cast driver to TakesScreenshot
- Capture screenshot as File
- Save with timestamp in filename
- Create screenshots directory if it doesn't exist
- Print success message with file path
testcases:
- input: "Take screenshot of Wikipedia"
  output: "Should save screenshot file and print path"
hints:
- Cast driver to TakesScreenshot interface
- Use getScreenshotAs(OutputType.FILE)
- Use SimpleDateFormat for timestamp
- Use FileUtils.copyFile() to save
- Create directory with mkdirs()
solution:
```java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotExample {
    public static void main(String[] args) throws Exception {
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to website
            driver.get("https://www.wikipedia.org");
            driver.manage().window().maximize();
            
            // Wait for page to load
            Thread.sleep(2000);
            
            // Generate timestamp
            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
            
            // Cast driver to TakesScreenshot
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            
            // Capture screenshot
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
            
            // Create destination file with timestamp
            File destFile = new File("screenshots/wikipedia_" + timestamp + ".png");
            
            // Create directory if it doesn't exist
            destFile.getParentFile().mkdirs();
            
            // Copy file to destination
            FileUtils.copyFile(sourceFile, destFile);
            
            System.out.println("✓ Screenshot saved successfully!");
            System.out.println("File path: " + destFile.getAbsolutePath());
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 4: Web Elements

### Exercise 7: Form Interaction

```exercise
title: Fill and Submit a Form
description: Practice interacting with form elements - input fields, buttons, and verification.
requirements:
- Navigate to a practice form website
- Find username and password fields
- Clear any existing text
- Enter test credentials
- Click submit button
- Verify interaction was successful
testcases:
- input: "Fill login form with test data"
  output: "Should successfully enter data and click submit"
hints:
- Use clear() before sendKeys() to ensure clean input
- Use sendKeys() to enter text
- Use click() to click buttons
- Use getAttribute("value") to verify input
- Wait between actions for visibility
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class FormInteraction {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to practice site
            driver.get("https://practicetestautomation.com/practice-test-login/");
            driver.manage().window().maximize();
            
            // Find username field
            WebElement usernameField = driver.findElement(By.id("username"));
            usernameField.clear();
            usernameField.sendKeys("student");
            System.out.println("✓ Username entered: " + usernameField.getAttribute("value"));
            
            // Find password field
            WebElement passwordField = driver.findElement(By.id("password"));
            passwordField.clear();
            passwordField.sendKeys("Password123");
            System.out.println("✓ Password entered: " + passwordField.getAttribute("value"));
            
            // Find and click submit button
            WebElement submitButton = driver.findElement(By.id("submit"));
            System.out.println("✓ Submit button found: " + submitButton.getText());
            submitButton.click();
            
            // Wait for navigation
            Thread.sleep(2000);
            
            // Verify success
            String currentUrl = driver.getCurrentUrl();
            if (currentUrl.contains("logged-in-successfully")) {
                System.out.println("✓ Login successful!");
            } else {
                System.out.println("✗ Login failed");
            }
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 8: Element State Verification

```exercise
title: Check Element States (Displayed, Enabled, Selected)
description: Practice verifying element states before interaction.
requirements:
- Navigate to a form page
- Check if elements are displayed
- Check if elements are enabled
- For checkboxes, check if selected
- Print state of each element
testcases:
- input: "Verify element states"
  output: "Should print displayed, enabled, and selected states"
hints:
- Use isDisplayed() to check visibility
- Use isEnabled() to check if element is enabled
- Use isSelected() for checkboxes and radio buttons
- Combine checks before interaction
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ElementStateCheck {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            driver.manage().window().maximize();
            
            // Check username field
            WebElement username = driver.findElement(By.id("username"));
            System.out.println("Username Field:");
            System.out.println("  - Displayed: " + username.isDisplayed());
            System.out.println("  - Enabled: " + username.isEnabled());
            
            // Check password field
            WebElement password = driver.findElement(By.id("password"));
            System.out.println("\nPassword Field:");
            System.out.println("  - Displayed: " + password.isDisplayed());
            System.out.println("  - Enabled: " + password.isEnabled());
            
            // Check submit button
            WebElement submitBtn = driver.findElement(By.id("submit"));
            System.out.println("\nSubmit Button:");
            System.out.println("  - Displayed: " + submitBtn.isDisplayed());
            System.out.println("  - Enabled: " + submitBtn.isEnabled());
            System.out.println("  - Text: " + submitBtn.getText());
            
            // Safe interaction pattern
            if (username.isDisplayed() && username.isEnabled()) {
                username.sendKeys("student");
                System.out.println("\n✓ Username entered successfully");
            }
            
            if (password.isDisplayed() && password.isEnabled()) {
                password.sendKeys("Password123");
                System.out.println("✓ Password entered successfully");
            }
            
            if (submitBtn.isDisplayed() && submitBtn.isEnabled()) {
                submitBtn.click();
                System.out.println("✓ Submit button clicked successfully");
            }
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 5: Waits

### Exercise 9: Implement Explicit Waits

```exercise
title: Use WebDriverWait with ExpectedConditions
description: Practice using explicit waits to handle dynamic elements.
requirements:
- Navigate to a page with dynamic content
- Create WebDriverWait with 10 second timeout
- Wait for element to be clickable
- Wait for element to be visible
- Wait for text to be present
- Click element after wait completes
testcases:
- input: "Wait for dynamic elements"
  output: "Should successfully wait and interact with elements"
hints:
- Import WebDriverWait and ExpectedConditions
- Use Duration.ofSeconds() for timeout
- Use wait.until() with ExpectedConditions
- Common conditions: elementToBeClickable, visibilityOfElementLocated
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ExplicitWaitExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            driver.manage().window().maximize();
            
            // Create WebDriverWait with 10 second timeout
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            
            // Wait for username field to be visible
            WebElement username = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("username"))
            );
            username.sendKeys("student");
            System.out.println("✓ Username field found and filled");
            
            // Wait for password field to be clickable
            WebElement password = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("password"))
            );
            password.sendKeys("Password123");
            System.out.println("✓ Password field found and filled");
            
            // Wait for submit button to be clickable
            WebElement submitBtn = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("submit"))
            );
            submitBtn.click();
            System.out.println("✓ Submit button clicked");
            
            // Wait for URL to contain success indicator
            wait.until(ExpectedConditions.urlContains("logged-in-successfully"));
            System.out.println("✓ Successfully logged in!");
            
            // Wait for success message to be visible
            WebElement successMsg = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                    By.cssSelector(".post-title")
                )
            );
            System.out.println("Success message: " + successMsg.getText());
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 10: Handle Loading Spinners

```exercise
title: Wait for Loading Spinner to Disappear
description: Practice waiting for loading indicators to disappear before proceeding.
requirements:
- Navigate to page with loading spinner
- Wait for spinner to appear
- Wait for spinner to disappear
- Interact with element after spinner is gone
- Use invisibilityOfElementLocated condition
testcases:
- input: "Handle loading spinner"
  output: "Should wait for spinner to disappear before proceeding"
hints:
- Use ExpectedConditions.invisibilityOfElementLocated()
- This waits for element to become invisible or not present
- Useful for loading indicators, overlays, modals
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class LoadingSpinnerWait {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        
        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            driver.manage().window().maximize();
            
            // Fill and submit form
            driver.findElement(By.id("username")).sendKeys("student");
            driver.findElement(By.id("password")).sendKeys("Password123");
            driver.findElement(By.id("submit")).click();
            
            System.out.println("Form submitted, waiting for page load...");
            
            // Wait for URL change (simulating loading)
            wait.until(ExpectedConditions.urlContains("logged-in-successfully"));
            System.out.println("✓ Page loaded successfully");
            
            // Wait for success message to be visible
            WebElement successMsg = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                    By.cssSelector(".post-title")
                )
            );
            
            System.out.println("✓ Success message visible: " + successMsg.getText());
            
            // Demonstrate waiting for element to be invisible
            // (In real scenario, this would be a loading spinner)
            System.out.println("✓ All loading indicators cleared");
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 6: Dropdowns, Alerts, Frames

### Exercise 11: Handle Dropdowns

```exercise
title: Select Options from Dropdown
description: Practice using the Select class to interact with dropdown elements.
requirements:
- Navigate to page with dropdown
- Create Select object from dropdown element
- Select by visible text
- Select by value
- Select by index
- Get and print selected option
testcases:
- input: "Select different dropdown options"
  output: "Should successfully select options using different methods"
hints:
- Import org.openqa.selenium.support.ui.Select
- Create Select object: new Select(element)
- Use selectByVisibleText(), selectByValue(), selectByIndex()
- Use getFirstSelectedOption() to verify selection
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import java.util.List;

public class DropdownExample {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to page with dropdown (using a demo site)
            driver.get("https://www.selenium.dev/selenium/web/web-form.html");
            driver.manage().window().maximize();
            
            // Find dropdown element
            WebElement dropdownElement = driver.findElement(By.name("my-select"));
            
            // Create Select object
            Select dropdown = new Select(dropdownElement);
            
            // Get all options
            List<WebElement> options = dropdown.getOptions();
            System.out.println("Total options: " + options.size());
            System.out.println("\nAll options:");
            for (WebElement option : options) {
                System.out.println("- " + option.getText());
            }
            
            // Select by visible text
            dropdown.selectByVisibleText("Two");
            System.out.println("\n✓ Selected by text: " + 
                dropdown.getFirstSelectedOption().getText());
            Thread.sleep(1000);
            
            // Select by value
            dropdown.selectByValue("1");
            System.out.println("✓ Selected by value: " + 
                dropdown.getFirstSelectedOption().getText());
            Thread.sleep(1000);
            
            // Select by index (0-based)
            dropdown.selectByIndex(2);
            System.out.println("✓ Selected by index 2: " + 
                dropdown.getFirstSelectedOption().getText());
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 12: Handle Alerts

```exercise
title: Accept, Dismiss, and Get Text from Alerts
description: Practice handling JavaScript alerts using the Alert interface.
requirements:
- Trigger an alert
- Switch to alert
- Get alert text
- Accept alert
- Trigger confirm alert and dismiss it
- Handle prompt alert with text input
testcases:
- input: "Handle different types of alerts"
  output: "Should successfully interact with alerts"
hints:
- Use driver.switchTo().alert() to switch to alert
- Use alert.getText() to get message
- Use alert.accept() to click OK
- Use alert.dismiss() to click Cancel
- Use alert.sendKeys() for prompt alerts
solution:
```java
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class AlertHandling {
    public static void main(String[] args) throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        try {
            // Load a page with alert buttons
            driver.get("https://www.selenium.dev/selenium/web/alerts.html");
            driver.manage().window().maximize();
            
            // Simple Alert
            System.out.println("=== Simple Alert ===");
            driver.findElement(By.id("alert")).click();
            
            // Wait for alert and switch to it
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            String alertText = alert.getText();
            System.out.println("Alert text: " + alertText);
            alert.accept();
            System.out.println("✓ Alert accepted\n");
            Thread.sleep(1000);
            
            // Confirm Alert - Accept
            System.out.println("=== Confirm Alert (Accept) ===");
            driver.findElement(By.id("confirm")).click();
            Alert confirmAlert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Confirm text: " + confirmAlert.getText());
            confirmAlert.accept();
            System.out.println("✓ Confirm accepted\n");
            Thread.sleep(1000);
            
            // Confirm Alert - Dismiss
            System.out.println("=== Confirm Alert (Dismiss) ===");
            driver.findElement(By.id("confirm")).click();
            Alert confirmAlert2 = wait.until(ExpectedConditions.alertIsPresent());
            confirmAlert2.dismiss();
            System.out.println("✓ Confirm dismissed\n");
            Thread.sleep(1000);
            
            // Prompt Alert
            System.out.println("=== Prompt Alert ===");
            driver.findElement(By.id("prompt")).click();
            Alert promptAlert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Prompt text: " + promptAlert.getText());
            promptAlert.sendKeys("Selenium Test");
            promptAlert.accept();
            System.out.println("✓ Prompt filled and accepted");
            
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 7: Framework Setup & Review

### Exercise 13: Create BaseTest Class

```exercise
title: Build a Reusable BaseTest Class
description: Create a BaseTest class with setup and teardown methods that can be extended by all test classes.
requirements:
- Create BaseTest class with protected WebDriver
- Implement setUp method with @BeforeMethod
- Implement tearDown method with @AfterMethod
- Initialize browser in setUp
- Close browser in tearDown
- Create a sample test class that extends BaseTest
testcases:
- input: "Run test using BaseTest"
  output: "Should automatically handle browser setup and cleanup"
hints:
- Use TestNG annotations @BeforeMethod and @AfterMethod
- Make driver protected so child classes can access it
- Use ThreadLocal for parallel execution safety
- Always call quit() in tearDown
solution:
```java
// BaseTest.java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import java.time.Duration;

public class BaseTest {
    protected static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    public static WebDriver getDriver() {
        return driver.get();
    }
    
    @BeforeMethod
    public void setUp() {
        System.out.println("========== Test Setup ==========");
        WebDriver webDriver = new ChromeDriver();
        driver.set(webDriver);
        
        getDriver().manage().window().maximize();
        getDriver().manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        
        System.out.println("✓ Browser initialized");
    }
    
    @AfterMethod
    public void tearDown() {
        System.out.println("========== Test Teardown ==========");
        if (getDriver() != null) {
            getDriver().quit();
            System.out.println("✓ Browser closed");
        }
        driver.remove();
    }
}

// SampleTest.java - Example test class extending BaseTest
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SampleTest extends BaseTest {
    
    @Test
    public void testGoogleSearch() {
        System.out.println("\n--- Running Google Search Test ---");
        
        // Navigate to Google
        getDriver().get("https://www.google.com");
        System.out.println("✓ Navigated to Google");
        
        // Verify title
        String title = getDriver().getTitle();
        Assert.assertTrue(title.contains("Google"), "Title should contain Google");
        System.out.println("✓ Title verified: " + title);
        
        // Find search box
        getDriver().findElement(By.name("q")).sendKeys("Selenium WebDriver");
        System.out.println("✓ Search text entered");
        
        System.out.println("✓ Test completed successfully");
    }
    
    @Test
    public void testWikipediaNavigation() {
        System.out.println("\n--- Running Wikipedia Navigation Test ---");
        
        // Navigate to Wikipedia
        getDriver().get("https://www.wikipedia.org");
        System.out.println("✓ Navigated to Wikipedia");
        
        // Verify title
        String title = getDriver().getTitle();
        Assert.assertTrue(title.contains("Wikipedia"), "Title should contain Wikipedia");
        System.out.println("✓ Title verified: " + title);
        
        System.out.println("✓ Test completed successfully");
    }
}
```
\```
```

### Exercise 14: Complete End-to-End Test

```exercise
title: Build a Complete Login Test with All Concepts
description: Create a comprehensive test that uses all Week 1 concepts - locators, waits, assertions, and proper test structure.
requirements:
- Extend BaseTest class
- Use explicit waits for all elements
- Verify element states before interaction
- Take screenshot on test completion
- Use proper assertions
- Handle both positive and negative scenarios
testcases:
- input: "Run complete login test"
  output: "Should successfully test login with all validations"
hints:
- Combine all Week 1 concepts
- Use WebDriverWait for dynamic elements
- Verify states with isDisplayed(), isEnabled()
- Take screenshots for evidence
- Use TestNG assertions
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.time.Duration;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CompleteLoginTest extends BaseTest {
    
    @Test(priority = 1)
    public void testSuccessfulLogin() throws Exception {
        System.out.println("\n========== Test: Successful Login ==========");
        
        // Create explicit wait
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(10));
        
        // Navigate to login page
        getDriver().get("https://practicetestautomation.com/practice-test-login/");
        System.out.println("✓ Navigated to login page");
        
        // Wait for and verify username field
        WebElement usernameField = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("username"))
        );
        Assert.assertTrue(usernameField.isDisplayed(), "Username field should be visible");
        Assert.assertTrue(usernameField.isEnabled(), "Username field should be enabled");
        System.out.println("✓ Username field verified");
        
        // Enter username
        usernameField.clear();
        usernameField.sendKeys("student");
        Assert.assertEquals(usernameField.getAttribute("value"), "student",
            "Username should be entered correctly");
        System.out.println("✓ Username entered: student");
        
        // Wait for and verify password field
        WebElement passwordField = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("password"))
        );
        Assert.assertTrue(passwordField.isDisplayed(), "Password field should be visible");
        Assert.assertTrue(passwordField.isEnabled(), "Password field should be enabled");
        System.out.println("✓ Password field verified");
        
        // Enter password
        passwordField.clear();
        passwordField.sendKeys("Password123");
        System.out.println("✓ Password entered");
        
        // Wait for and click submit button
        WebElement submitButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("submit"))
        );
        Assert.assertTrue(submitButton.isDisplayed(), "Submit button should be visible");
        Assert.assertTrue(submitButton.isEnabled(), "Submit button should be enabled");
        submitButton.click();
        System.out.println("✓ Submit button clicked");
        
        // Wait for successful login
        wait.until(ExpectedConditions.urlContains("logged-in-successfully"));
        String currentUrl = getDriver().getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("logged-in-successfully"),
            "URL should contain 'logged-in-successfully'");
        System.out.println("✓ Login successful - URL verified");
        
        // Verify success message
        WebElement successMessage = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".post-title"))
        );
        String messageText = successMessage.getText();
        Assert.assertTrue(messageText.contains("Logged In Successfully"),
            "Success message should be displayed");
        System.out.println("✓ Success message verified: " + messageText);
        
        // Take screenshot
        takeScreenshot("successful_login");
        
        System.out.println("========== Test Passed ==========\n");
    }
    
    @Test(priority = 2)
    public void testInvalidLogin() throws Exception {
        System.out.println("\n========== Test: Invalid Login ==========");
        
        WebDriverWait wait = new WebDriverWait(getDriver(), Duration.ofSeconds(10));
        
        // Navigate to login page
        getDriver().get("https://practicetestautomation.com/practice-test-login/");
        System.out.println("✓ Navigated to login page");
        
        // Enter invalid credentials
        WebElement usernameField = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("username"))
        );
        usernameField.sendKeys("invaliduser");
        System.out.println("✓ Invalid username entered");
        
        WebElement passwordField = getDriver().findElement(By.id("password"));
        passwordField.sendKeys("invalidpass");
        System.out.println("✓ Invalid password entered");
        
        // Click submit
        getDriver().findElement(By.id("submit")).click();
        System.out.println("✓ Submit clicked");
        
        // Verify error message appears
        WebElement errorMessage = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("error"))
        );
        Assert.assertTrue(errorMessage.isDisplayed(), "Error message should be displayed");
        String errorText = errorMessage.getText();
        Assert.assertTrue(errorText.contains("invalid"),
            "Error message should mention invalid credentials");
        System.out.println("✓ Error message verified: " + errorText);
        
        // Verify still on login page
        String currentUrl = getDriver().getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("practice-test-login"),
            "Should remain on login page");
        System.out.println("✓ Remained on login page as expected");
        
        // Take screenshot
        takeScreenshot("invalid_login");
        
        System.out.println("========== Test Passed ==========\n");
    }
    
    // Helper method to take screenshots
    private void takeScreenshot(String testName) throws Exception {
        String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
        TakesScreenshot screenshot = (TakesScreenshot) getDriver();
        File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
        File destFile = new File("screenshots/" + testName + "_" + timestamp + ".png");
        destFile.getParentFile().mkdirs();
        FileUtils.copyFile(sourceFile, destFile);
        System.out.println("✓ Screenshot saved: " + destFile.getAbsolutePath());
    }
}
```
\```
```

---

## Summary

Congratulations! You've completed Week 1 of Selenium fundamentals. You've learned:

### Day 1: Selenium Introduction & Setup
- ✅ Setting up Selenium WebDriver
- ✅ Writing your first test
- ✅ Browser navigation commands

### Day 2: Locators
- ✅ All 8 locator strategies
- ✅ Finding single and multiple elements
- ✅ Iterating through element collections

### Day 3: WebDriver Commands
- ✅ Window management (size, position, maximize)
- ✅ Taking screenshots
- ✅ Browser commands (get, navigate, refresh)

### Day 4: Web Elements
- ✅ Form interactions (sendKeys, click, clear)
- ✅ Element state verification (isDisplayed, isEnabled, isSelected)
- ✅ Getting element attributes and text

### Day 5: Waits
- ✅ Explicit waits with WebDriverWait
- ✅ ExpectedConditions
- ✅ Handling dynamic content

### Day 6: Dropdowns, Alerts, Frames
- ✅ Select class for dropdowns
- ✅ Alert handling (accept, dismiss, getText, sendKeys)
- ✅ Working with different alert types

### Day 7: Framework Setup & Review
- ✅ Creating reusable BaseTest class
- ✅ TestNG annotations (@BeforeMethod, @AfterMethod, @Test)
- ✅ Complete end-to-end test scenarios
- ✅ Screenshot capture for test evidence

### Next Steps
- Practice these exercises multiple times
- Try variations with different websites
- Move on to Week 2 for advanced concepts
- Build your own test framework using these patterns

**Happy Testing! 🚀**