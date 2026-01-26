# Java for Selenium Automation - Detailed Topics with Daily Coding Exercises

## How to Use This File

**For Each Day:**
1. Read all subtopics and understand concepts
2. Set up required test websites/applications
3. Complete ALL coding exercises in order
4. Run and verify each Selenium script
5. Debug and fix any issues
6. Take screenshots of successful executions

---

## PHASE 1: JAVA ESSENTIALS FOR SELENIUM (Days 1-15)

### Day 1: Setup & Java Basics for Automation

#### Subtopics:
1. **JDK Installation & Setup**
2. **Maven Basics and pom.xml**
3. **IDE Setup (IntelliJ)**
4. **Java Basics for Automation**

---

#### Daily Coding Exercises:

**Exercise 1: Maven Project Setup**
```
Task: Create Maven project for Selenium
Steps:
1. File > New > Project > Maven
2. GroupId: com.automation
3. ArtifactId: selenium-practice
4. Verify pom.xml created
5. Add basic structure folders
```

**Exercise 2: First Java Program in Maven**
```java
Task: Create HelloAutomation class
Package: com.automation.basics
Print:
"Welcome to Selenium Automation!"
"Author: [Your Name]"
"Ready to automate!"

Run successfully
```

**Exercise 3: Understanding Variables for Automation**
```java
Task: Declare automation-related variables
String browserName = "Chrome";
String url = "https://www.google.com";
int timeout = 10;
boolean isTestPassed = true;

Print all with labels
Example: "Browser: Chrome"
```

**Exercise 4: Test Data Storage**
```java
Task: Store test credentials
Create variables:
- String username
- String password
- String expectedTitle
- String baseUrl

Print in format:
"Test Data:"
"URL: [url]"
"Username: [username]"
etc.
```

**Exercise 5: Environment Configuration**
```java
Task: Store environment details
final String DEV_URL = "https://dev.app.com";
final String QA_URL = "https://qa.app.com";
final String PROD_URL = "https://prod.app.com";

String currentEnv = "QA";

Use if-else to print current environment URL
```

**Challenge Exercise: Test Configuration Class**
```java
Task: Create TestConfig class
Fields:
- Browser name
- Application URL
- Username
- Password
- Timeout values
- Environment

Create method displayConfig() to print all

In main, create object and display config
```

---

### Day 2: Operators & Control Structures for Automation

#### Daily Coding Exercises:

**Exercise 1: Browser Selection Logic**
```java
Task: Select browser based on input
String browser = "chrome"; // or "firefox", "edge"

Use switch-case:
case "chrome": Print "Launching Chrome"
case "firefox": Print "Launching Firefox"
case "edge": Print "Launching Edge"
default: Print "Invalid browser"

Test with all options
```

**Exercise 2: Test Status Checker**
```java
Task: Validate test results
int actualResult = 10;
int expectedResult = 10;

if (actualResult == expectedResult) {
    Print "Test PASSED"
} else {
    Print "Test FAILED"
}

Test with matching and non-matching values
```

**Exercise 3: Environment Selector**
```java
Task: Select environment URL
String env = "qa"; // or "dev", "prod"

Use if-else-if:
dev -> https://dev.example.com
qa -> https://qa.example.com
prod -> https://example.com

Print selected URL
```

**Exercise 4: Test Data Iterator**
```java
Task: Iterate through test accounts
String[] usernames = {"user1", "user2", "user3", "admin"};
String[] passwords = {"pass1", "pass2", "pass3", "admin123"};

Use for loop:
Print "Test Case [i+1]"
Print "Username: [username]"
Print "Password: [password]"
Print "---"
```

**Exercise 5: Retry Logic Simulator**
```java
Task: Simulate test retry mechanism
int maxRetries = 3;
int attempt = 1;
boolean testPassed = false;

Use while loop:
while (attempt <= maxRetries && !testPassed) {
    Print "Attempt " + attempt
    // Simulate: testPassed = (attempt == 2)
    attempt++;
}

Print final status
```

**Challenge Exercise: Test Suite Executor**
```java
Task: Simulate test suite execution
String[] testCases = {
    "Login Test",
    "Search Test",
    "Checkout Test",
    "Logout Test"
};

For each test:
- Print "Executing: [testName]"
- Generate random pass/fail
- Count passed and failed tests
- Print summary at end

Use loops and conditions
```

---

### Day 3: Arrays & Strings for Automation

#### Daily Coding Exercises:

**Exercise 1: Test URLs Management**
```java
Task: Store and process test URLs
String[] urls = {
    "https://www.google.com",
    "https://www.amazon.com",
    "https://www.facebook.com"
};

For each URL:
- Print "Testing URL: [url]"
- Check if contains "www"
- Extract domain name (between // and first /)
```

**Exercise 2: Email Validation**
```java
Task: Validate email format
String[] emails = {
    "test@example.com",
    "invalid.email",
    "user@test.co.in",
    "wrongemail@"
};

For each email:
- Check if contains "@"
- Check if ends with valid domain (.com, .in, etc.)
- Print "Valid" or "Invalid"
```

**Exercise 3: Locator String Builder**
```java
Task: Build XPath dynamically
String elementType = "button";
String idValue = "submit";

Build XPath: //[elementType][@id='[idValue]']
Result: //button[@id='submit']

Try with different element types and attributes
```

**Exercise 4: Text Assertion**
```java
Task: Compare actual vs expected text
String actualTitle = "Welcome to Selenium";
String expectedTitle = "Welcome to Selenium";

Use .equals():
if (actualTitle.equals(expectedTitle)) {
    Print "PASS: Title matched"
} else {
    Print "FAIL: Expected [exp], Got [act]"
}

Test with matching and non-matching strings
```

**Exercise 5: String Manipulation for Test Data**
```java
Task: Process test data strings
String fullName = "  John Doe  ";
String email = "JOHN.DOE@EXAMPLE.COM";

Perform:
1. Trim whitespace from fullName
2. Convert email to lowercase
3. Split fullName into firstName and lastName
4. Check if email contains "example"

Print all results
```

**Exercise 6: Test Report String Building**
```java
Task: Build test report using StringBuilder
Data:
- Test name: "Login Test"
- Status: "Passed"
- Duration: "2.5 seconds"
- Browser: "Chrome"

Use StringBuilder:
Build formatted report:
"========================"
"Test Report"
"========================"
"Test: Login Test"
"Status: Passed"
etc.

Print final report
```

**Challenge Exercise: Test Data Parser**
```java
Task: Parse and validate test data CSV format
String testData = "john@test.com,password123,John,Doe,30";

Tasks:
1. Split by comma
2. Validate email (contains @)
3. Validate password (length >= 8)
4. Validate age (is number and > 18)
5. Build full name from first and last name
6. Print validation report

Handle all validations with if-else
```

---

### Day 10: Exception Handling for Automation

#### Daily Coding Exercises:

**Exercise 1: Element Not Found Simulator**
```java
Task: Handle NoSuchElementException
try {
    boolean elementFound = false;
    if (!elementFound) {
        throw new Exception("Element not found: #loginButton");
    }
    System.out.println("Element found and clicked");
} catch (Exception e) {
    System.out.println("ERROR: " + e.getMessage());
    System.out.println("Taking screenshot...");
    System.out.println("Test marked as FAILED");
}
```

**Exercise 2: File Operations with Exception Handling**
```java
Task: Read config file with error handling
import java.io.*;

try {
    FileReader file = new FileReader("config.txt");
    BufferedReader reader = new BufferedReader(file);
    String line = reader.readLine();
    System.out.println("Config: " + line);
    reader.close();
} catch (FileNotFoundException e) {
    System.out.println("Config file not found!");
} catch (IOException e) {
    System.out.println("Error reading file!");
} finally {
    System.out.println("Cleanup completed");
}
```

**Exercise 3: Custom Automation Exception**
```java
Task: Create custom exception for automation

class ElementNotFoundException extends Exception {
    public ElementNotFoundException(String message) {
        super(message);
    }
}

class AutomationTest {
    static void findElement(String locator) throws ElementNotFoundException {
        if (locator == null || locator.isEmpty()) {
            throw new ElementNotFoundException("Locator is empty!");
        }
        System.out.println("Element found: " + locator);
    }
}

Test in main:
try {
    findElement("");
} catch (ElementNotFoundException e) {
    System.out.println("Test Failed: " + e.getMessage());
}
```

**Exercise 4: Multiple Exception Scenarios**
```java
Task: Handle different automation scenarios

void performTest(int scenario) {
    try {
        switch(scenario) {
            case 1:
                int result = 10 / 0; // ArithmeticException
                break;
            case 2:
                String text = null;
                text.length(); // NullPointerException
                break;
            case 3:
                int[] arr = new int[3];
                arr[5] = 10; // ArrayIndexOutOfBoundsException
                break;
        }
    } catch (ArithmeticException e) {
        System.out.println("Math error in test");
    } catch (NullPointerException e) {
        System.out.println("Element not initialized");
    } catch (ArrayIndexOutOfBoundsException e) {
        System.out.println("Invalid element index");
    } catch (Exception e) {
        System.out.println("Unknown error: " + e.getMessage());
    }
}

Test all scenarios
```

**Challenge Exercise: Robust Test Framework Structure**
```java
Task: Build exception handling framework

class TestFramework {
    static class TimeoutException extends Exception {
        TimeoutException(String msg) { super(msg); }
    }

    static class ElementNotFoundException extends Exception {
        ElementNotFoundException(String msg) { super(msg); }
    }

    static void executeTest(String testName) {
        System.out.println("Starting: " + testName);
        try {
            // Simulate test steps
            openBrowser();
            findElement("//button[@id='login']");
            waitForElement(5);

            System.out.println(testName + " - PASSED");

        } catch (TimeoutException e) {
            System.out.println(testName + " - FAILED: Timeout");
            takeScreenshot(testName);
        } catch (ElementNotFoundException e) {
            System.out.println(testName + " - FAILED: " + e.getMessage());
            takeScreenshot(testName);
        } catch (Exception e) {
            System.out.println(testName + " - FAILED: " + e.getMessage());
        } finally {
            closeBrowser();
        }
    }

    static void openBrowser() {
        System.out.println("Browser opened");
    }

    static void findElement(String locator) throws ElementNotFoundException {
        // Simulate: sometimes fails
        if (Math.random() > 0.7) {
            throw new ElementNotFoundException("Cannot find: " + locator);
        }
        System.out.println("Element found: " + locator);
    }

    static void waitForElement(int seconds) throws TimeoutException {
        if (Math.random() > 0.8) {
            throw new TimeoutException("Element not visible after " + seconds + "s");
        }
        System.out.println("Element ready");
    }

    static void takeScreenshot(String testName) {
        System.out.println("Screenshot saved: " + testName + ".png");
    }

    static void closeBrowser() {
        System.out.println("Browser closed");
    }
}

Main:
Run executeTest() multiple times to see different exception scenarios
```

---

## PHASE 2: SELENIUM WEBDRIVER FUNDAMENTALS (Days 16-30)

### Day 16: Selenium Introduction & Setup

#### Daily Coding Exercises:

**Exercise 1: Add Selenium to pom.xml**
```xml
Task: Add Selenium dependency
In pom.xml, add:
<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>4.15.0</version>
    </dependency>

    <dependency>
        <groupId>io.github.bonigarcia</groupId>
        <artifactId>webdrivermanager</artifactId>
        <version>5.6.2</version>
    </dependency>
</dependencies>

Maven > Reload Project
Verify dependencies downloaded
```

**Exercise 2: Import Statements Practice**
```java
Task: Write all necessary imports
Create class: SeleniumSetup

Write imports:
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

Verify no errors
```

**Exercise 3: WebDriverManager Setup**
```java
Task: Setup browser driver
public class DriverSetup {
    public static void main(String[] args) {
        // Setup ChromeDriver
        WebDriverManager.chromedriver().setup();
        System.out.println("ChromeDriver setup complete!");

        // Setup FirefoxDriver
        WebDriverManager.firefoxdriver().setup();
        System.out.println("FirefoxDriver setup complete!");
    }
}
```

**Exercise 4: Verify Selenium Installation**
```java
Task: Test Selenium installation
public class VerifySelenium {
    public static void main(String[] args) {
        System.out.println("Setting up driver...");
        WebDriverManager.chromedriver().setup();

        System.out.println("Creating driver instance...");
        WebDriver driver = new ChromeDriver();

        System.out.println("Selenium setup successful!");
        System.out.println("Driver created: " + driver);

        driver.quit();
        System.out.println("Driver closed successfully!");
    }
}
```

**Challenge Exercise: Browser Factory**
```java
Task: Create reusable browser setup
public class BrowserFactory {
    public static WebDriver getDriver(String browserName) {
        WebDriver driver = null;

        switch(browserName.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                driver = new ChromeDriver();
                System.out.println("Chrome browser launched");
                break;
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                driver = new FirefoxDriver();
                System.out.println("Firefox browser launched");
                break;
            case "edge":
                WebDriverManager.edgedriver().setup();
                driver = new EdgeDriver();
                System.out.println("Edge browser launched");
                break;
            default:
                System.out.println("Invalid browser: " + browserName);
        }

        return driver;
    }

    public static void main(String[] args) {
        // Test the factory
        WebDriver driver = getDriver("chrome");
        System.out.println("Browser ready for automation!");
        driver.quit();
    }
}
```

---

### Day 17: First Selenium Script

#### Daily Coding Exercises:

**Exercise 1: Open Google**
```java
Task: First automation script
public class OpenGoogle {
    public static void main(String[] args) {
        // Setup
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        // Open Google
        driver.get("https://www.google.com");
        System.out.println("Google opened successfully!");

        // Close browser
        driver.quit();
    }
}
```

**Exercise 2: Get Page Information**
```java
Task: Retrieve page details
WebDriver driver = new ChromeDriver();
driver.get("https://www.google.com");

// Get page title
String title = driver.getTitle();
System.out.println("Page Title: " + title);

// Get current URL
String url = driver.getCurrentUrl();
System.out.println("Current URL: " + url);

// Get page source length
String source = driver.getPageSource();
System.out.println("Page source length: " + source.length());

driver.quit();
```

**Exercise 3: Browser Window Management**
```java
Task: Manage browser window
WebDriver driver = new ChromeDriver();
driver.get("https://www.google.com");

// Maximize window
driver.manage().window().maximize();
System.out.println("Window maximized");

// Wait 2 seconds
Thread.sleep(2000);

// Minimize window
driver.manage().window().minimize();
System.out.println("Window minimized");

Thread.sleep(2000);

// Fullscreen
driver.manage().window().fullscreen();
System.out.println("Window fullscreen");

Thread.sleep(2000);

driver.quit();
```

**Exercise 4: Navigation Commands**
```java
Task: Use navigation methods
WebDriver driver = new ChromeDriver();
driver.manage().window().maximize();

// Navigate to Google
driver.navigate().to("https://www.google.com");
System.out.println("Opened: " + driver.getTitle());
Thread.sleep(2000);

// Navigate to Amazon
driver.navigate().to("https://www.amazon.com");
System.out.println("Opened: " + driver.getTitle());
Thread.sleep(2000);

// Go back
driver.navigate().back();
System.out.println("Back to: " + driver.getTitle());
Thread.sleep(2000);

// Go forward
driver.navigate().forward();
System.out.println("Forward to: " + driver.getTitle());
Thread.sleep(2000);

// Refresh
driver.navigate().refresh();
System.out.println("Page refreshed");

driver.quit();
```

**Exercise 5: Multiple Websites Tour**
```java
Task: Visit multiple websites
String[] websites = {
    "https://www.google.com",
    "https://www.wikipedia.org",
    "https://www.github.com"
};

WebDriver driver = new ChromeDriver();
driver.manage().window().maximize();

for (String website : websites) {
    driver.get(website);
    System.out.println("Visiting: " + driver.getTitle());
    System.out.println("URL: " + driver.getCurrentUrl());
    System.out.println("---");
    Thread.sleep(2000);
}

driver.quit();
```

**Challenge Exercise: Website Validator**
```java
Task: Validate multiple websites
public class WebsiteValidator {
    static class WebsiteInfo {
        String url;
        String expectedTitle;

        WebsiteInfo(String url, String expectedTitle) {
            this.url = url;
            this.expectedTitle = expectedTitle;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        WebsiteInfo[] sites = {
            new WebsiteInfo("https://www.google.com", "Google"),
            new WebsiteInfo("https://www.amazon.com", "Amazon"),
            new WebsiteInfo("https://www.facebook.com", "Facebook")
        };

        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        int passed = 0, failed = 0;

        for (WebsiteInfo site : sites) {
            driver.get(site.url);
            String actualTitle = driver.getTitle();

            if (actualTitle.contains(site.expectedTitle)) {
                System.out.println("PASS: " + site.url);
                System.out.println("  Expected: " + site.expectedTitle);
                System.out.println("  Actual: " + actualTitle);
                passed++;
            } else {
                System.out.println("FAIL: " + site.url);
                System.out.println("  Expected: " + site.expectedTitle);
                System.out.println("  Actual: " + actualTitle);
                failed++;
            }
            System.out.println("---");
            Thread.sleep(2000);
        }

        System.out.println("\n=== Test Summary ===");
        System.out.println("Total: " + sites.length);
        System.out.println("Passed: " + passed);
        System.out.println("Failed: " + failed);

        driver.quit();
    }
}
```

---

### Day 18: Locators - Part 1

#### Daily Coding Exercises:

**Practice Website:** Use https://www.saucedemo.com or https://the-internet.herokuapp.com

**Exercise 1: Find Element by ID**
```java
Task: Locate and interact with element by ID
// Go to saucedemo.com
driver.get("https://www.saucedemo.com");

// Find username field by ID
WebElement username = driver.findElement(By.id("user-name"));
System.out.println("Found element: " + username.getTagName());

// Type username
username.sendKeys("standard_user");
System.out.println("Username entered");

Thread.sleep(2000);
driver.quit();
```

**Exercise 2: Find Element by Name**
```java
Task: Use name attribute
driver.get("https://www.saucedemo.com");

// Find password field by name
WebElement password = driver.findElement(By.name("password"));
password.sendKeys("secret_sauce");
System.out.println("Password entered");

Thread.sleep(2000);
```

**Exercise 3: Find Element by Class Name**
```java
Task: Find element by class
driver.get("https://www.saucedemo.com");

// Find login button by class
WebElement loginBtn = driver.findElement(By.className("submit-button"));
System.out.println("Login button found");
System.out.println("Button text: " + loginBtn.getText());
```

**Exercise 4: Find Elements (Multiple)**
```java
Task: Find all links on page
driver.get("https://www.google.com");

// Find all links (anchor tags)
List<WebElement> links = driver.findElements(By.tagName("a"));
System.out.println("Total links found: " + links.size());

// Print first 5 links
for (int i = 0; i < Math.min(5, links.size()); i++) {
    String linkText = links.get(i).getText();
    if (!linkText.isEmpty()) {
        System.out.println((i+1) + ". " + linkText);
    }
}
```

**Exercise 5: Link Text and Partial Link Text**
```java
Task: Find links by text
driver.get("https://www.wikipedia.org");

// Find by exact link text
WebElement link1 = driver.findElement(By.linkText("English"));
System.out.println("Found link: " + link1.getText());

// Find by partial link text
WebElement link2 = driver.findElement(By.partialLinkText("Eng"));
System.out.println("Found link: " + link2.getText());
```

**Challenge Exercise: Complete Login Flow**
```java
Task: Complete login using different locators
driver.get("https://www.saucedemo.com");
driver.manage().window().maximize();

// Find and fill username (by ID)
WebElement username = driver.findElement(By.id("user-name"));
username.sendKeys("standard_user");
System.out.println("✓ Username entered");

Thread.sleep(1000);

// Find and fill password (by name)
WebElement password = driver.findElement(By.name("password"));
password.sendKeys("secret_sauce");
System.out.println("✓ Password entered");

Thread.sleep(1000);

// Find and click login button (by class or ID)
WebElement loginBtn = driver.findElement(By.id("login-button"));
loginBtn.click();
System.out.println("✓ Login button clicked");

Thread.sleep(2000);

// Verify login successful
String currentUrl = driver.getCurrentUrl();
if (currentUrl.contains("inventory")) {
    System.out.println("✓ LOGIN SUCCESSFUL!");
} else {
    System.out.println("✗ LOGIN FAILED!");
}

driver.quit();
```

---

**[Continue with exercises for Days 19-45...]**

---

## Practice Website Resources:

### For Selenium Practice:
1. **The Internet** - http://the-internet.herokuapp.com/
   - Various element types
   - Dropdowns, alerts, frames

2. **Sauce Demo** - https://www.saucedemo.com/
   - Login page
   - Product listing
   - Shopping cart

3. **Demo QA** - https://demoqa.com/
   - Forms
   - Widgets
   - Interactions

4. **OrangeHRM Demo** - https://opensource-demo.orangehrmlive.com/
   - Real application simulation
   - Complex scenarios

5. **Automation Practice** - http://automationpractice.com/
   - E-commerce site
   - Complete user journey

---

## Daily Practice Checklist:

### Before Coding:
- [ ] Read all subtopics
- [ ] Understand concepts
- [ ] Identify practice website
- [ ] Plan your approach

### During Coding:
- [ ] Complete exercises in order
- [ ] Test each script thoroughly
- [ ] Take screenshots of success
- [ ] Debug any failures
- [ ] Add comments to code

### After Coding:
- [ ] All scripts run successfully
- [ ] Understand why code works
- [ ] Can modify code independently
- [ ] Ready for next day's exercises

---

## Tips for Selenium Exercises:

### Best Practices:
1. **Always close browser** - Use driver.quit()
2. **Add waits** - Thread.sleep() initially, proper waits later
3. **Maximize window** - driver.manage().window().maximize()
4. **Print progress** - System.out.println() for each step
5. **Handle exceptions** - Use try-catch for robustness

### Debugging:
1. **Element not found** - Check locator, wait for page load
2. **Stale element** - Re-find element after page change
3. **Click not working** - Check if element is visible/enabled
4. **Slow execution** - Add waits between actions

### Code Organization:
1. **One concept per exercise** - Focus on single topic
2. **Build incrementally** - Start simple, add complexity
3. **Reuse code** - Create helper methods
4. **Comment your code** - Explain what and why

---

**This comprehensive exercise collection ensures hands-on practice for every concept. Complete all exercises to build strong automation skills!**

**Continue this pattern for all remaining days (19-45)...**
