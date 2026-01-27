# Selenium Automation - Week 2: Advanced Java (Days 8-14)

## Day 8: Collections Framework

### Exercise 1: ArrayList for Test Data Management

```exercise
title: Store and Manage Test Data Using ArrayList
description: Learn to use ArrayList to store multiple test data sets and iterate through them for data-driven testing.
requirements:
- Create ArrayList to store usernames
- Add multiple test usernames
- Iterate through list and print each username
- Remove invalid usernames
- Check if specific username exists
testcases:
- input: "Manage test data with ArrayList"
  output: "Should successfully add, remove, and search usernames"
hints:
- Import java.util.ArrayList
- Use add() to add elements
- Use remove() to delete elements
- Use contains() to check existence
- Use for-each loop for iteration
solution:
```java
import java.util.ArrayList;
import java.util.List;

public class ArrayListTestData {
    public static void main(String[] args) {
        // Create ArrayList for test usernames
        List<String> testUsernames = new ArrayList<>();
        
        // Add test data
        testUsernames.add("student1");
        testUsernames.add("student2");
        testUsernames.add("admin");
        testUsernames.add("testuser");
        testUsernames.add("invaliduser");
        
        System.out.println("Total test users: " + testUsernames.size());
        System.out.println("=" .repeat(50));
        
        // Display all usernames
        System.out.println("\nAll Test Usernames:");
        for (String username : testUsernames) {
            System.out.println("- " + username);
        }
        
        // Check if specific username exists
        String searchUser = "admin";
        if (testUsernames.contains(searchUser)) {
            System.out.println("\n✓ Username '" + searchUser + "' found in test data");
        }
        
        // Remove invalid user
        testUsernames.remove("invaliduser");
        System.out.println("\n✓ Removed 'invaliduser' from test data");
        System.out.println("Updated count: " + testUsernames.size());
        
        // Get specific element by index
        System.out.println("\nFirst username: " + testUsernames.get(0));
        System.out.println("Last username: " + testUsernames.get(testUsernames.size() - 1));
        
        // Clear all data
        testUsernames.clear();
        System.out.println("\n✓ All test data cleared");
        System.out.println("Final count: " + testUsernames.size());
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Using ArrayList without interface declaration**: Less flexible code
   - Why: Coupling to concrete implementation reduces flexibility
   - Fix: Use List<String> instead of ArrayList<String> for declaration

2. ❌ **Not checking if list is empty before operations**: NullPointerException or errors
   - Why: Operations on empty lists can cause unexpected behavior
   - Fix: Use isEmpty() or check size() before operations like get()

3. ❌ **Using get() without bounds checking**: IndexOutOfBoundsException
   - Why: Accessing invalid index throws runtime exception
   - Fix: Always verify index < list.size() before using get(index)

4. ❌ **Modifying list during iteration**: ConcurrentModificationException
   - Why: Removing elements while iterating causes exception
   - Fix: Use Iterator.remove() or create new list for modifications

5. ❌ **Using contains() for complex objects without equals()**: Always returns false
   - Why: Default equals() compares references, not content
   - Fix: Override equals() and hashCode() for custom objects

### Exercise 2: HashMap for Configuration Management

```exercise
title: Store Configuration Data Using HashMap
description: Use HashMap to store key-value pairs for test configuration like URLs, credentials, and timeouts.
requirements:
- Create HashMap for test configuration
- Store browser type, URL, username, password
- Retrieve values using keys
- Update configuration values
- Iterate through all configurations
testcases:
- input: "Manage test configuration with HashMap"
  output: "Should store and retrieve configuration data"
hints:
- Import java.util.HashMap
- Use put(key, value) to add entries
- Use get(key) to retrieve values
- Use keySet() to get all keys
- Use entrySet() for key-value pairs
solution:
```java
import java.util.HashMap;
import java.util.Map;

public class HashMapConfiguration {
    public static void main(String[] args) {
        // Create HashMap for test configuration
        Map<String, String> testConfig = new HashMap<>();
        
        // Add configuration data
        testConfig.put("browser", "chrome");
        testConfig.put("baseUrl", "https://practicetestautomation.com");
        testConfig.put("username", "student");
        testConfig.put("password", "Password123");
        testConfig.put("timeout", "10");
        testConfig.put("environment", "QA");
        
        System.out.println("Test Configuration");
        System.out.println("=" .repeat(50));
        
        // Retrieve and display specific values
        System.out.println("\nBrowser: " + testConfig.get("browser"));
        System.out.println("Base URL: " + testConfig.get("baseUrl"));
        System.out.println("Environment: " + testConfig.get("environment"));
        System.out.println("Timeout: " + testConfig.get("timeout") + " seconds");
        
        // Update configuration
        testConfig.put("browser", "firefox");
        System.out.println("\n✓ Browser updated to: " + testConfig.get("browser"));
        
        // Display all configurations
        System.out.println("\nAll Configurations:");
        System.out.println("-" .repeat(50));
        for (Map.Entry<String, String> entry : testConfig.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }
        
        // Check if key exists
        String key = "username";
        if (testConfig.containsKey(key)) {
            System.out.println("\n✓ Configuration contains '" + key + "'");
        }
        
        // Get total configurations
        System.out.println("\nTotal configurations: " + testConfig.size());
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Using HashMap without interface declaration**: Tight coupling to implementation
   - Why: Reduces flexibility to change to other Map implementations
   - Fix: Use Map<String, String> instead of HashMap<String, String>

2. ❌ **Not checking if key exists before get()**: Returns null unexpectedly
   - Why: get() returns null if key doesn't exist
   - Fix: Use containsKey() before get() or use getOrDefault()

3. ❌ **Forgetting that HashMap doesn't maintain insertion order**: Unexpected order
   - Why: HashMap doesn't guarantee any specific order
   - Fix: Use LinkedHashMap to maintain insertion order

4. ❌ **Using wrong loop for iteration**: Only getting keys or values
   - Why: keySet() gives only keys, values() gives only values
   - Fix: Use entrySet() to get both key-value pairs efficiently

---

## Day 9: Exception Handling

### Exercise 3: Try-Catch for Selenium Exceptions

```exercise
title: Handle NoSuchElementException Gracefully
description: Learn to catch and handle exceptions when elements are not found on a page.
requirements:
- Try to find an element that doesn't exist
- Catch NoSuchElementException
- Print meaningful error message
- Continue test execution after exception
- Use finally block for cleanup
testcases:
- input: "Handle element not found scenario"
  output: "Should catch exception and continue execution"
hints:
- Import org.openqa.selenium.NoSuchElementException
- Use try-catch-finally blocks
- Print exception message with e.getMessage()
- Always close browser in finally block
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class ExceptionHandlingExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.google.com");
            driver.manage().window().maximize();
            System.out.println("✓ Navigated to Google");
            
            // Try to find existing element
            try {
                WebElement searchBox = driver.findElement(By.name("q"));
                System.out.println("✓ Search box found successfully");
                searchBox.sendKeys("Selenium WebDriver");
            } catch (NoSuchElementException e) {
                System.out.println("✗ Search box not found: " + e.getMessage());
            }
            
            // Try to find non-existing element
            try {
                WebElement invalidElement = driver.findElement(By.id("nonExistentElement"));
                invalidElement.click();
            } catch (NoSuchElementException e) {
                System.out.println("\n✗ Expected exception caught!");
                System.out.println("Element not found: " + e.getMessage());
                System.out.println("✓ Test continues after handling exception");
            }
            
            // Verify test continues
            System.out.println("\n✓ Test execution continued successfully");
            String title = driver.getTitle();
            System.out.println("Current page title: " + title);
            
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // Always execute cleanup
            if (driver != null) {
                driver.quit();
                System.out.println("\n✓ Browser closed in finally block");
            }
        }
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Catching generic Exception instead of specific exceptions**: Hiding real errors
   - Why: Catches all exceptions including ones you don't expect
   - Fix: Catch specific exceptions like NoSuchElementException first, generic Exception last

2. ❌ **Not using finally block for cleanup**: Resources not released on exception
   - Why: Code after exception doesn't execute without finally
   - Fix: Always use finally block for driver.quit() and resource cleanup

3. ❌ **Swallowing exceptions without logging**: Silent failures hard to debug
   - Why: Empty catch blocks hide errors completely
   - Fix: Always log exception message or stack trace

4. ❌ **Using e.printStackTrace() in production**: Poor error handling
   - Why: Stack traces clutter output and don't fail tests properly
   - Fix: Use proper logging framework and re-throw or fail test explicitly

5. ❌ **Not checking for null before driver.quit()**: NullPointerException in finally
   - Why: If driver initialization fails, driver is null
   - Fix: Always check if (driver != null) before quit()

### Exercise 4: Custom Exception for Test Validation

```exercise
title: Create Custom Exception for Test Failures
description: Build a custom exception class to handle specific test validation failures.
requirements:
- Create custom TestValidationException class
- Extend Exception class
- Add custom constructor with message
- Throw custom exception when validation fails
- Catch and handle custom exception
testcases:
- input: "Validate page title and throw custom exception"
  output: "Should throw and catch custom exception"
hints:
- Create new class extending Exception
- Add constructor with String message parameter
- Call super(message) in constructor
- Use throw new CustomException("message")
- Catch specific exception type
solution:
```java
// TestValidationException.java
class TestValidationException extends Exception {
    public TestValidationException(String message) {
        super(message);
    }
}

// CustomExceptionTest.java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class CustomExceptionTest {
    
    public static void validatePageTitle(WebDriver driver, String expectedTitle) 
            throws TestValidationException {
        String actualTitle = driver.getTitle();
        
        if (!actualTitle.contains(expectedTitle)) {
            throw new TestValidationException(
                "Title validation failed! Expected: '" + expectedTitle + 
                "', but got: '" + actualTitle + "'"
            );
        }
        
        System.out.println("✓ Title validation passed: " + actualTitle);
    }
    
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            // Test 1: Valid title
            driver.get("https://www.google.com");
            System.out.println("Test 1: Validating Google title");
            validatePageTitle(driver, "Google");
            
            // Test 2: Invalid title (will throw exception)
            System.out.println("\nTest 2: Validating with wrong title");
            validatePageTitle(driver, "Yahoo");
            
        } catch (TestValidationException e) {
            System.out.println("\n✗ Validation Error Caught:");
            System.out.println("   " + e.getMessage());
            System.out.println("✓ Custom exception handled successfully");
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
        } finally {
            driver.quit();
            System.out.println("\n✓ Test completed and browser closed");
        }
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Not extending Exception or RuntimeException**: Class is not throwable
   - Why: Custom exception must extend Exception or one of its subclasses
   - Fix: Extend Exception for checked exceptions or RuntimeException for unchecked

2. ❌ **Forgetting to call super(message)**: Exception message is null
   - Why: Parent constructor must be called to set message
   - Fix: Always call super(message) in your custom exception constructor

3. ❌ **Not using throws clause**: Compilation error with checked exceptions
   - Why: Checked exceptions must be declared in method signature
   - Fix: Add throws CustomException to method that throws it

4. ❌ **Creating too many custom exceptions**: Code becomes cluttered
   - Why: Excessive custom exceptions make code hard to maintain
   - Fix: Only create custom exceptions when you need specific handling logic

---

## Day 10: File Handling

### Exercise 5: Read Test Data from Text File

```exercise
title: Load Test Data from External File
description: Read test credentials and URLs from a text file for data-driven testing.
requirements:
- Create a text file with test data
- Read file using BufferedReader
- Parse each line of data
- Store data in appropriate collections
- Handle FileNotFoundException
testcases:
- input: "Read testdata.txt file"
  output: "Should load and display all test data"
hints:
- Import java.io.BufferedReader and FileReader
- Use try-with-resources for automatic file closing
- Use readLine() in a loop
- Split lines using split() method
- Handle IOException
solution:
```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ReadTestDataFile {
    
    public static class TestData {
        String username;
        String password;
        String expectedResult;
        
        public TestData(String username, String password, String expectedResult) {
            this.username = username;
            this.password = password;
            this.expectedResult = expectedResult;
        }
        
        @Override
        public String toString() {
            return "Username: " + username + ", Password: " + password + 
                   ", Expected: " + expectedResult;
        }
    }
    
    public static void main(String[] args) {
        String filePath = "testdata/credentials.txt";
        List<TestData> testDataList = new ArrayList<>();
        
        // First, create the test data file
        createTestDataFile(filePath);
        
        // Read test data from file
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            int lineNumber = 0;
            
            System.out.println("Reading Test Data from File");
            System.out.println("=" .repeat(60));
            
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                
                // Skip empty lines and comments
                if (line.trim().isEmpty() || line.startsWith("#")) {
                    continue;
                }
                
                // Parse CSV format: username,password,expectedResult
                String[] parts = line.split(",");
                
                if (parts.length == 3) {
                    TestData data = new TestData(
                        parts[0].trim(),
                        parts[1].trim(),
                        parts[2].trim()
                    );
                    testDataList.add(data);
                    System.out.println("Line " + lineNumber + ": " + data);
                }
            }
            
            System.out.println("\n✓ Successfully loaded " + testDataList.size() + 
                             " test data entries");
            
            // Display summary
            System.out.println("\nTest Data Summary:");
            System.out.println("-" .repeat(60));
            for (int i = 0; i < testDataList.size(); i++) {
                System.out.println((i + 1) + ". " + testDataList.get(i));
            }
            
        } catch (IOException e) {
            System.out.println("✗ Error reading file: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void createTestDataFile(String filePath) {
        try {
            java.io.File file = new java.io.File(filePath);
            file.getParentFile().mkdirs();

            java.io.FileWriter writer = new java.io.FileWriter(file);
            writer.write("# Test Data File - Format: username,password,expectedResult\n");
            writer.write("student,Password123,success\n");
            writer.write("admin,admin123,success\n");
            writer.write("invaliduser,wrongpass,failure\n");
            writer.write("testuser,Test@123,success\n");
            writer.close();

            System.out.println("✓ Test data file created: " + filePath + "\n");
        } catch (IOException e) {
            System.out.println("Error creating file: " + e.getMessage());
        }
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Not using try-with-resources**: File handles not closed properly
   - Why: Manual close() calls can be missed if exception occurs
   - Fix: Use try (BufferedReader reader = new BufferedReader(...)) for auto-close

2. ❌ **Not handling FileNotFoundException**: Program crashes if file missing
   - Why: File might not exist at specified path
   - Fix: Catch FileNotFoundException or create file if it doesn't exist

3. ❌ **Not skipping empty lines or comments**: Parsing errors on non-data lines
   - Why: Empty lines and comments cause split() issues
   - Fix: Check line.trim().isEmpty() and line.startsWith("#")

4. ❌ **Not validating split results**: ArrayIndexOutOfBoundsException
   - Why: Malformed lines don't have expected number of parts
   - Fix: Check parts.length before accessing array elements

5. ❌ **Using wrong file path separator**: Platform-specific path issues
   - Why: Hardcoded \ or / may not work on all OS
   - Fix: Use File.separator or forward slashes (works on all platforms)

### Exercise 6: Write Test Results to File

```exercise
title: Log Test Results to Output File
description: Write test execution results to a log file with timestamps.
requirements:
- Create FileWriter for output file
- Write test results with timestamps
- Append results (don't overwrite)
- Format output nicely
- Close file properly
testcases:
- input: "Execute tests and log results"
  output: "Should create log file with test results"
hints:
- Import java.io.FileWriter
- Use FileWriter(filename, true) for append mode
- Use SimpleDateFormat for timestamps
- Use write() method to write content
- Use try-with-resources or close() in finally
solution:
```java
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class WriteTestResults {
    
    private static final String LOG_FILE = "test-results/test-execution.log";
    
    public static void logResult(String testName, String status, String message) {
        try (FileWriter writer = new FileWriter(LOG_FILE, true)) {
            String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
            String logEntry = String.format("[%s] %s - %s: %s%n", 
                timestamp, testName, status, message);
            
            writer.write(logEntry);
            System.out.print(logEntry);
            
        } catch (IOException e) {
            System.out.println("Error writing to log file: " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        // Create log file directory
        new java.io.File(LOG_FILE).getParentFile().mkdirs();
        
        System.out.println("Test Execution Log");
        System.out.println("=" .repeat(70));
        
        // Simulate test execution
        logResult("LoginTest", "STARTED", "Initiating login test");
        
        try {
            Thread.sleep(1000);
            logResult("LoginTest", "PASS", "User logged in successfully");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        logResult("SearchTest", "STARTED", "Initiating search test");
        
        try {
            Thread.sleep(500);
            logResult("SearchTest", "PASS", "Search results displayed correctly");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        logResult("LogoutTest", "STARTED", "Initiating logout test");
        
        try {
            Thread.sleep(800);
            logResult("LogoutTest", "FAIL", "Logout button not found");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Write summary
        try (FileWriter writer = new FileWriter(LOG_FILE, true)) {
            writer.write("\n" + "=".repeat(70) + "\n");
            writer.write("Test Execution Summary\n");
            writer.write("Total Tests: 3 | Passed: 2 | Failed: 1\n");
            writer.write("=".repeat(70) + "\n\n");

            System.out.println("\n✓ Test results logged to: " + LOG_FILE);
        } catch (IOException e) {
            System.out.println("Error writing summary: " + e.getMessage());
        }
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Using FileWriter without append mode**: Overwrites previous logs
   - Why: FileWriter(filename) overwrites, FileWriter(filename, true) appends
   - Fix: Always use FileWriter(filename, true) for log files

2. ❌ **Not creating parent directories**: FileNotFoundException
   - Why: Parent directory may not exist
   - Fix: Call file.getParentFile().mkdirs() before writing

3. ❌ **Not formatting timestamps consistently**: Hard to parse logs
   - Why: Different timestamp formats cause confusion
   - Fix: Use SimpleDateFormat with consistent pattern like "yyyy-MM-dd HH:mm:ss"

4. ❌ **Not flushing writer before close**: Data lost in buffer
   - Why: Buffered data not written to file
   - Fix: Use try-with-resources or call flush() explicitly

---

## Day 11: Object-Oriented Programming - Classes & Objects

### Exercise 7: Create Page Object Class

```exercise
title: Build a Login Page Object Class
description: Create a reusable Page Object class for the login page with methods for common actions.
requirements:
- Create LoginPage class with WebDriver
- Add WebElement fields for page elements
- Create constructor to initialize driver
- Add methods: enterUsername, enterPassword, clickLogin
- Add method to verify login success
testcases:
- input: "Use LoginPage object to perform login"
  output: "Should successfully login using page object"
hints:
- Store WebDriver as instance variable
- Use driver.findElement() in methods
- Return boolean from verification methods
- Make methods chainable by returning 'this'
- Keep locators as private constants
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

// LoginPage.java - Page Object Class
class LoginPage {
    private WebDriver driver;
    
    // Locators as constants
    private final By usernameField = By.id("username");
    private final By passwordField = By.id("password");
    private final By submitButton = By.id("submit");
    private final By errorMessage = By.id("error");
    
    // Constructor
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }
    
    // Page actions
    public LoginPage enterUsername(String username) {
        driver.findElement(usernameField).clear();
        driver.findElement(usernameField).sendKeys(username);
        System.out.println("✓ Entered username: " + username);
        return this;
    }
    
    public LoginPage enterPassword(String password) {
        driver.findElement(passwordField).clear();
        driver.findElement(passwordField).sendKeys(password);
        System.out.println("✓ Entered password");
        return this;
    }
    
    public void clickLogin() {
        driver.findElement(submitButton).click();
        System.out.println("✓ Clicked login button");
    }
    
    public boolean isLoginSuccessful() {
        String currentUrl = driver.getCurrentUrl();
        return currentUrl.contains("logged-in-successfully");
    }
    
    public boolean isErrorDisplayed() {
        try {
            return driver.findElement(errorMessage).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getErrorMessage() {
        return driver.findElement(errorMessage).getText();
    }
}

// LoginPageTest.java - Test using Page Object
public class LoginPageTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            driver.manage().window().maximize();
            
            // Create page object
            LoginPage loginPage = new LoginPage(driver);
            
            System.out.println("Test 1: Valid Login");
            System.out.println("=" .repeat(50));
            
            // Use page object methods (method chaining)
            loginPage.enterUsername("student")
                    .enterPassword("Password123")
                    .clickLogin();
            
            Thread.sleep(2000);
            
            if (loginPage.isLoginSuccessful()) {
                System.out.println("✓ Login successful!");
            } else {
                System.out.println("✗ Login failed!");
            }
            
            // Navigate back for second test
            driver.navigate().back();
            Thread.sleep(1000);
            
            System.out.println("\nTest 2: Invalid Login");
            System.out.println("=" .repeat(50));
            
            loginPage.enterUsername("invaliduser")
                    .enterPassword("wrongpass")
                    .clickLogin();
            
            Thread.sleep(2000);
            
            if (loginPage.isErrorDisplayed()) {
                System.out.println("✓ Error message displayed: " + 
                    loginPage.getErrorMessage());
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Not storing locators as constants**: Locators scattered throughout methods
   - Why: Changes to UI require updates in multiple places
   - Fix: Define locators as private final By variables at class level

2. ❌ **Making driver public**: Breaking encapsulation
   - Why: External classes can manipulate driver directly
   - Fix: Keep driver private, provide methods for all actions

3. ❌ **Not returning 'this' for method chaining**: Verbose test code
   - Why: Cannot chain method calls fluently
   - Fix: Return 'this' from action methods for fluent interface

4. ❌ **Including assertions in page objects**: Mixing concerns
   - Why: Page objects should only interact with UI, not verify
   - Fix: Return data/state, let test classes handle assertions

5. ❌ **Not using constructor to initialize driver**: NullPointerException
   - Why: Methods try to use null driver reference
   - Fix: Always initialize driver in constructor

### Exercise 8: Inheritance with Base Page Class

```exercise
title: Create Base Page with Common Methods
description: Build a BasePage class with common methods that other page objects can inherit.
requirements:
- Create BasePage class with WebDriver
- Add common methods: click, sendKeys, getText
- Create LoginPage extending BasePage
- Create HomePage extending BasePage
- Use inherited methods in child classes
testcases:
- input: "Use inheritance for page objects"
  output: "Should reuse common methods from BasePage"
hints:
- Use 'extends' keyword for inheritance
- Call super(driver) in child constructor
- Protected methods can be used by child classes
- Override methods when needed
- Use @Override annotation
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

// BasePage.java - Parent class with common methods
class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }
    
    protected void sendKeys(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }
    
    protected String getText(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).getText();
    }
    
    protected boolean isDisplayed(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    protected String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
}

// LoginPage.java - Inherits from BasePage
class LoginPageWithInheritance extends BasePage {
    private final By usernameField = By.id("username");
    private final By passwordField = By.id("password");
    private final By submitButton = By.id("submit");
    
    public LoginPageWithInheritance(WebDriver driver) {
        super(driver);  // Call parent constructor
    }
    
    public void login(String username, String password) {
        sendKeys(usernameField, username);  // Using inherited method
        sendKeys(passwordField, password);  // Using inherited method
        click(submitButton);                // Using inherited method
        System.out.println("✓ Login performed using inherited methods");
    }
    
    public boolean isLoginSuccessful() {
        return getCurrentUrl().contains("logged-in-successfully");
    }
}

// HomePage.java - Also inherits from BasePage
class HomePage extends BasePage {
    private final By welcomeMessage = By.cssSelector(".post-title");
    private final By logoutButton = By.linkText("Log out");
    
    public HomePage(WebDriver driver) {
        super(driver);
    }
    
    public String getWelcomeMessage() {
        return getText(welcomeMessage);  // Using inherited method
    }
    
    public void logout() {
        click(logoutButton);  // Using inherited method
        System.out.println("✓ Logout performed using inherited method");
    }
}

// InheritanceTest.java - Test demonstrating inheritance
public class InheritanceTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            driver.manage().window().maximize();
            
            System.out.println("Testing Page Object Inheritance");
            System.out.println("=" .repeat(60));
            
            // Use LoginPage (child of BasePage)
            LoginPageWithInheritance loginPage = new LoginPageWithInheritance(driver);
            loginPage.login("student", "Password123");
            
            Thread.sleep(2000);
            
            if (loginPage.isLoginSuccessful()) {
                System.out.println("✓ Login successful");
                
                // Use HomePage (also child of BasePage)
                HomePage homePage = new HomePage(driver);
                String message = homePage.getWelcomeMessage();
                System.out.println("✓ Welcome message: " + message);
                
                Thread.sleep(1000);
                homePage.logout();
            }
            
            System.out.println("\n✓ All page objects successfully used inherited methods");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Not calling super(driver) in child constructor**: Driver not initialized
   - Why: Parent constructor must be explicitly called in Java
   - Fix: Always call super(driver) as first statement in child constructor

2. ❌ **Making BasePage members private instead of protected**: Child classes cannot access
   - Why: Private members are not inherited
   - Fix: Use protected for members that child classes need

3. ❌ **Duplicating common methods in child classes**: Code duplication
   - Why: Not leveraging inheritance properly
   - Fix: Put all common methods in BasePage, override only when needed

4. ❌ **Not using @Override annotation**: Missing override mistakes
   - Why: Typos in method name don't cause errors without @Override
   - Fix: Always use @Override when overriding parent methods

---

## Day 12: Encapsulation & Access Modifiers

### Exercise 9: Encapsulate Test Configuration

```exercise
title: Create Configuration Class with Getters/Setters
description: Build a configuration class using encapsulation principles with private fields and public methods.
requirements:
- Create TestConfig class with private fields
- Add public getter and setter methods
- Validate data in setters
- Provide default values
- Make class immutable using final fields
testcases:
- input: "Create and use TestConfig object"
  output: "Should properly encapsulate configuration data"
hints:
- Use private access modifier for fields
- Create public getters (getName())
- Create public setters (setName())
- Validate input in setters
- Use 'this' keyword to refer to instance variables
solution:
```java
// TestConfig.java - Encapsulated configuration class
class TestConfig {
    // Private fields (encapsulation)
    private String browser;
    private String baseUrl;
    private int timeout;
    private String environment;
    private boolean headless;
    
    // Constructor with default values
    public TestConfig() {
        this.browser = "chrome";
        this.baseUrl = "https://practicetestautomation.com";
        this.timeout = 10;
        this.environment = "QA";
        this.headless = false;
    }
    
    // Getter methods
    public String getBrowser() {
        return browser;
    }
    
    public String getBaseUrl() {
        return baseUrl;
    }
    
    public int getTimeout() {
        return timeout;
    }
    
    public String getEnvironment() {
        return environment;
    }
    
    public boolean isHeadless() {
        return headless;
    }
    
    // Setter methods with validation
    public void setBrowser(String browser) {
        if (browser == null || browser.trim().isEmpty()) {
            throw new IllegalArgumentException("Browser cannot be null or empty");
        }
        
        String lowerBrowser = browser.toLowerCase();
        if (!lowerBrowser.equals("chrome") && !lowerBrowser.equals("firefox") && 
            !lowerBrowser.equals("edge")) {
            throw new IllegalArgumentException("Invalid browser: " + browser);
        }
        
        this.browser = lowerBrowser;
    }
    
    public void setBaseUrl(String baseUrl) {
        if (baseUrl == null || !baseUrl.startsWith("http")) {
            throw new IllegalArgumentException("Invalid URL: " + baseUrl);
        }
        this.baseUrl = baseUrl;
    }
    
    public void setTimeout(int timeout) {
        if (timeout < 1 || timeout > 60) {
            throw new IllegalArgumentException("Timeout must be between 1 and 60 seconds");
        }
        this.timeout = timeout;
    }
    
    public void setEnvironment(String environment) {
        if (environment == null || environment.trim().isEmpty()) {
            throw new IllegalArgumentException("Environment cannot be null or empty");
        }
        this.environment = environment.toUpperCase();
    }
    
    public void setHeadless(boolean headless) {
        this.headless = headless;
    }
    
    // Display configuration
    public void displayConfig() {
        System.out.println("\nTest Configuration:");
        System.out.println("=" .repeat(50));
        System.out.println("Browser      : " + browser);
        System.out.println("Base URL     : " + baseUrl);
        System.out.println("Timeout      : " + timeout + " seconds");
        System.out.println("Environment  : " + environment);
        System.out.println("Headless     : " + headless);
        System.out.println("=" .repeat(50));
    }
}

// EncapsulationTest.java - Test the encapsulated class
public class EncapsulationTest {
    public static void main(String[] args) {
        System.out.println("Testing Encapsulation with TestConfig");
        System.out.println("=" .repeat(60));
        
        // Create config with default values
        TestConfig config = new TestConfig();
        System.out.println("\n1. Default Configuration:");
        config.displayConfig();
        
        // Modify using setters
        System.out.println("\n2. Updating Configuration:");
        config.setBrowser("firefox");
        System.out.println("✓ Browser updated to: " + config.getBrowser());
        
        config.setTimeout(15);
        System.out.println("✓ Timeout updated to: " + config.getTimeout());
        
        config.setEnvironment("production");
        System.out.println("✓ Environment updated to: " + config.getEnvironment());
        
        config.setHeadless(true);
        System.out.println("✓ Headless mode: " + config.isHeadless());
        
        // Display updated configuration
        System.out.println("\n3. Updated Configuration:");
        config.displayConfig();
        
        // Test validation
        System.out.println("\n4. Testing Validation:");
        try {
            config.setBrowser("safari");  // Invalid browser
        } catch (IllegalArgumentException e) {
            System.out.println("✓ Validation caught: " + e.getMessage());
        }
        
        try {
            config.setTimeout(100);  // Invalid timeout
        } catch (IllegalArgumentException e) {
            System.out.println("✓ Validation caught: " + e.getMessage());
        }
        
        System.out.println("\n✓ Encapsulation working correctly!");
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Making fields public**: Breaking encapsulation completely
   - Why: Direct field access bypasses validation and control
   - Fix: Always make fields private, provide public getters/setters

2. ❌ **Not validating data in setters**: Invalid data stored
   - Why: Setters should enforce business rules and constraints
   - Fix: Add validation logic in all setters, throw exceptions for invalid data

3. ❌ **Using getter/setter naming convention incorrectly**: IDE and frameworks fail
   - Why: Tools expect getFieldName() and setFieldName() pattern
   - Fix: Follow JavaBeans naming convention: get/set + capitalized field name

4. ❌ **Providing setters for fields that shouldn't change**: Breaking immutability
   - Why: Some fields should only be set once (in constructor)
   - Fix: Remove setter for immutable fields, or make field final

5. ❌ **Not using 'this' keyword in setters**: Parameter shadows field
   - Why: Ambiguity between parameter and field names
   - Fix: Use this.fieldName = fieldName to distinguish

### Exercise 10: Static Members and Utility Class

```exercise
title: Create Utility Class with Static Methods
description: Build a utility class with static helper methods for common test operations.
requirements:
- Create TestUtils class with static methods
- Add method to generate random email
- Add method to generate random string
- Add method to format date/time
- Add method to take screenshot
- Use static methods without creating object
testcases:
- input: "Use utility methods"
  output: "Should call static methods directly"
hints:
- Use 'static' keyword for methods
- Static methods belong to class, not instance
- Call using ClassName.methodName()
- Use Random class for random generation
- Use SimpleDateFormat for date formatting
solution:
```java
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

// TestUtils.java - Utility class with static methods
class TestUtils {
    private static final Random random = new Random();
    
    // Private constructor to prevent instantiation
    private TestUtils() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }
    
    // Generate random email
    public static String generateRandomEmail() {
        String randomString = generateRandomString(8);
        return "test_" + randomString + "@example.com";
    }
    
    // Generate random string
    public static String generateRandomString(int length) {
        String characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }
        
        return result.toString();
    }
    
    // Generate random number in range
    public static int generateRandomNumber(int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }
    
    // Format current timestamp
    public static String getCurrentTimestamp() {
        return new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
    }
    
    // Format date with custom pattern
    public static String formatDate(String pattern) {
        return new SimpleDateFormat(pattern).format(new Date());
    }
    
    // Wait for specified seconds
    public static void waitFor(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    // Validate email format
    public static boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    }
    
    // Generate test data file name
    public static String generateTestDataFileName(String testName) {
        return testName + "_" + getCurrentTimestamp() + ".txt";
    }
}

// StaticMethodsTest.java - Using static utility methods
public class StaticMethodsTest {
    public static void main(String[] args) {
        System.out.println("Testing Static Utility Methods");
        System.out.println("=" .repeat(60));
        
        // Generate random emails
        System.out.println("\n1. Random Email Generation:");
        for (int i = 0; i < 3; i++) {
            String email = TestUtils.generateRandomEmail();
            System.out.println("   Email " + (i + 1) + ": " + email);
            System.out.println("   Valid: " + TestUtils.isValidEmail(email));
        }
        
        // Generate random strings
        System.out.println("\n2. Random String Generation:");
        for (int i = 0; i < 3; i++) {
            String randomStr = TestUtils.generateRandomString(10);
            System.out.println("   String " + (i + 1) + ": " + randomStr);
        }
        
        // Generate random numbers
        System.out.println("\n3. Random Number Generation (1-100):");
        for (int i = 0; i < 5; i++) {
            int randomNum = TestUtils.generateRandomNumber(1, 100);
            System.out.println("   Number " + (i + 1) + ": " + randomNum);
        }
        
        // Date formatting
        System.out.println("\n4. Date Formatting:");
        System.out.println("   Timestamp: " + TestUtils.getCurrentTimestamp());
        System.out.println("   Date: " + TestUtils.formatDate("yyyy-MM-dd"));
        System.out.println("   Time: " + TestUtils.formatDate("HH:mm:ss"));
        System.out.println("   Full: " + TestUtils.formatDate("EEEE, MMMM dd, yyyy HH:mm:ss"));
        
        // Generate file names
        System.out.println("\n5. Test Data File Names:");
        System.out.println("   " + TestUtils.generateTestDataFileName("LoginTest"));
        System.out.println("   " + TestUtils.generateTestDataFileName("SearchTest"));
        
        // Email validation
        System.out.println("\n6. Email Validation:");
        String[] emails = {"test@example.com", "invalid.email", "user@domain.co.uk"};
        for (String email : emails) {
            System.out.println("   " + email + " -> " +
                (TestUtils.isValidEmail(email) ? "✓ Valid" : "✗ Invalid"));
        }
        
        System.out.println("\n✓ All static methods called successfully!");
        System.out.println("Note: No TestUtils object was created!");
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Not making utility class constructor private**: Class can be instantiated
   - Why: Utility classes should never be instantiated
   - Fix: Add private constructor that throws UnsupportedOperationException

2. ❌ **Making utility methods non-static**: Requires object creation
   - Why: Utility methods should be called on class, not instance
   - Fix: Always make utility methods static

3. ❌ **Not making static fields final**: Values can be changed
   - Why: Constants should be immutable
   - Fix: Declare static fields as static final for constants

4. ❌ **Accessing static members through instance**: Confusing code
   - Why: Static members belong to class, not instance
   - Fix: Always use ClassName.methodName(), not object.methodName()

---

## Day 13: Polymorphism & Interfaces

### Exercise 11: Method Overloading

```exercise
title: Implement Method Overloading for Element Actions
description: Create multiple versions of the same method with different parameters (compile-time polymorphism).
requirements:
- Create ElementActions class
- Overload click() method with different parameters
- Overload sendKeys() method
- Overload waitFor() method
- Demonstrate all overloaded methods
testcases:
- input: "Use overloaded methods"
  output: "Should call appropriate method based on parameters"
hints:
- Same method name, different parameters
- Different number of parameters
- Different types of parameters
- Return type can be same or different
- Compiler determines which method to call
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

// ElementActions.java - Class with overloaded methods
class ElementActions {
    private WebDriver driver;
    private WebDriverWait wait;
    
    public ElementActions(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    // Overloaded click methods
    public void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
        System.out.println("✓ Clicked element using By locator");
    }
    
    public void click(WebElement element) {
        wait.until(ExpectedConditions.elementToBeClickable(element)).click();
        System.out.println("✓ Clicked element using WebElement");
    }
    
    public void click(By locator, int timeoutSeconds) {
        WebDriverWait customWait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        customWait.until(ExpectedConditions.elementToBeClickable(locator)).click();
        System.out.println("✓ Clicked element with custom timeout: " + timeoutSeconds + "s");
    }
    
    // Overloaded sendKeys methods
    public void sendKeys(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
        System.out.println("✓ Entered text: " + text);
    }
    
    public void sendKeys(By locator, String text, boolean clearFirst) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        if (clearFirst) {
            element.clear();
        }
        element.sendKeys(text);
        System.out.println("✓ Entered text (clear=" + clearFirst + "): " + text);
    }
    
    public void sendKeys(WebElement element, String text) {
        element.clear();
        element.sendKeys(text);
        System.out.println("✓ Entered text using WebElement: " + text);
    }
    
    // Overloaded waitFor methods
    public void waitFor(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
            System.out.println("✓ Waited for " + seconds + " seconds");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    public void waitFor(By locator) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        System.out.println("✓ Waited for element to be visible");
    }
    
    public void waitFor(By locator, String condition) {
        if (condition.equals("clickable")) {
            wait.until(ExpectedConditions.elementToBeClickable(locator));
            System.out.println("✓ Waited for element to be clickable");
        } else if (condition.equals("visible")) {
            wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
            System.out.println("✓ Waited for element to be visible");
        }
    }
}

// MethodOverloadingTest.java - Demonstrating method overloading
public class MethodOverloadingTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://practicetestautomation.com/practice-test-login/");
            driver.manage().window().maximize();
            
            ElementActions actions = new ElementActions(driver);
            
            System.out.println("Demonstrating Method Overloading");
            System.out.println("=" .repeat(60));
            
            // Using different versions of sendKeys
            System.out.println("\n1. Overloaded sendKeys methods:");
            By usernameField = By.id("username");
            actions.sendKeys(usernameField, "student");
            actions.sendKeys(usernameField, "newuser", false);  // Append without clearing
            
            // Using different versions of click
            System.out.println("\n2. Overloaded click methods:");
            By submitButton = By.id("submit");
            actions.click(submitButton);  // Using By locator
            
            Thread.sleep(2000);
            driver.navigate().back();
            Thread.sleep(1000);
            
            WebElement submitElement = driver.findElement(submitButton);
            actions.click(submitElement);  // Using WebElement
            
            Thread.sleep(2000);
            driver.navigate().back();
            Thread.sleep(1000);
            
            actions.click(submitButton, 15);  // Using custom timeout
            
            // Using different versions of waitFor
            System.out.println("\n3. Overloaded waitFor methods:");
            actions.waitFor(2);  // Wait for seconds
            actions.waitFor(usernameField);  // Wait for element visibility
            actions.waitFor(submitButton, "clickable");  // Wait for specific condition
            
            System.out.println("\n✓ Method overloading demonstrated successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Creating ambiguous overloaded methods**: Compilation error
   - Why: Compiler cannot determine which method to call
   - Fix: Ensure each overloaded version has distinct parameter types/count

2. ❌ **Changing only return type**: Not valid overloading
   - Why: Return type alone doesn't distinguish methods
   - Fix: Change parameters (type, number, or order), not just return type

3. ❌ **Not considering type promotion**: Wrong method called
   - Why: Java automatically promotes types (int → long → float → double)
   - Fix: Be aware of type promotion when designing overloaded methods

4. ❌ **Overloading vs Overriding confusion**: Conceptual error
   - Why: Overloading is compile-time, overriding is runtime
   - Fix: Overloading = same name, different params; Overriding = same signature, different class

### Exercise 12: Interface Implementation

```exercise
title: Create and Implement Test Reporter Interface
description: Define an interface for test reporting and create multiple implementations.
requirements:
- Create TestReporter interface with methods
- Implement ConsoleReporter class
- Implement FileReporter class
- Implement HTMLReporter class
- Use interface reference to call methods
testcases:
- input: "Use different reporter implementations"
  output: "Should report using all implementations"
hints:
- Use 'interface' keyword to define interface
- Use 'implements' keyword in class
- All interface methods must be implemented
- Interface provides contract, not implementation
- Use interface type for polymorphism
solution:
```java
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

// TestReporter.java - Interface definition
interface TestReporter {
    void reportTestStart(String testName);
    void reportTestPass(String testName, String message);
    void reportTestFail(String testName, String message);
    void reportTestSkip(String testName, String reason);
    void generateSummary(int total, int passed, int failed, int skipped);
}

// ConsoleReporter.java - Console implementation
class ConsoleReporter implements TestReporter {
    
    @Override
    public void reportTestStart(String testName) {
        System.out.println("\n[STARTED] " + testName);
    }
    
    @Override
    public void reportTestPass(String testName, String message) {
        System.out.println("[PASS] " + testName + " - " + message);
    }
    
    @Override
    public void reportTestFail(String testName, String message) {
        System.out.println("[FAIL] " + testName + " - " + message);
    }
    
    @Override
    public void reportTestSkip(String testName, String reason) {
        System.out.println("[SKIP] " + testName + " - " + reason);
    }
    
    @Override
    public void generateSummary(int total, int passed, int failed, int skipped) {
        System.out.println("\n" + "=".repeat(50));
        System.out.println("TEST SUMMARY");
        System.out.println("=".repeat(50));
        System.out.println("Total Tests: " + total);
        System.out.println("Passed: " + passed);
        System.out.println("Failed: " + failed);
        System.out.println("Skipped: " + skipped);
        System.out.println("=".repeat(50));
    }
}

// FileReporter.java - File implementation
class FileReporter implements TestReporter {
    private String fileName;
    
    public FileReporter(String fileName) {
        this.fileName = fileName;
        // Create file
        try {
            new java.io.File(fileName).getParentFile().mkdirs();
        } catch (Exception e) {
            // Directory might already exist
        }
    }
    
    private void writeToFile(String content) {
        try (FileWriter writer = new FileWriter(fileName, true)) {
            String timestamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
            writer.write("[" + timestamp + "] " + content + "\n");
        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
    }
    
    @Override
    public void reportTestStart(String testName) {
        writeToFile("STARTED: " + testName);
    }
    
    @Override
    public void reportTestPass(String testName, String message) {
        writeToFile("PASS: " + testName + " - " + message);
    }
    
    @Override
    public void reportTestFail(String testName, String message) {
        writeToFile("FAIL: " + testName + " - " + message);
    }
    
    @Override
    public void reportTestSkip(String testName, String reason) {
        writeToFile("SKIP: " + testName + " - " + reason);
    }
    
    @Override
    public void generateSummary(int total, int passed, int failed, int skipped) {
        writeToFile("=".repeat(50));
        writeToFile("SUMMARY - Total: " + total + ", Passed: " + passed +
                   ", Failed: " + failed + ", Skipped: " + skipped);
        writeToFile("=".repeat(50));
    }
}

// HTMLReporter.java - HTML implementation
class HTMLReporter implements TestReporter {
    private StringBuilder htmlContent;
    private String fileName;
    
    public HTMLReporter(String fileName) {
        this.fileName = fileName;
        this.htmlContent = new StringBuilder();
        htmlContent.append("<html><head><title>Test Report</title>");
        htmlContent.append("<style>body{font-family:Arial;} .pass{color:green;} ");
        htmlContent.append(".fail{color:red;} .skip{color:orange;}</style></head><body>");
        htmlContent.append("<h1>Test Execution Report</h1>");
    }
    
    @Override
    public void reportTestStart(String testName) {
        htmlContent.append("<h3>").append(testName).append("</h3>");
    }
    
    @Override
    public void reportTestPass(String testName, String message) {
        htmlContent.append("<p class='pass'>✓ PASS: ").append(message).append("</p>");
    }
    
    @Override
    public void reportTestFail(String testName, String message) {
        htmlContent.append("<p class='fail'>✗ FAIL: ").append(message).append("</p>");
    }
    
    @Override
    public void reportTestSkip(String testName, String reason) {
        htmlContent.append("<p class='skip'>⊘ SKIP: ").append(reason).append("</p>");
    }
    
    @Override
    public void generateSummary(int total, int passed, int failed, int skipped) {
        htmlContent.append("<hr><h2>Summary</h2>");
        htmlContent.append("<ul>");
        htmlContent.append("<li>Total Tests: ").append(total).append("</li>");
        htmlContent.append("<li class='pass'>Passed: ").append(passed).append("</li>");
        htmlContent.append("<li class='fail'>Failed: ").append(failed).append("</li>");
        htmlContent.append("<li class='skip'>Skipped: ").append(skipped).append("</li>");
        htmlContent.append("</ul></body></html>");
        
        // Write to file
        try (FileWriter writer = new FileWriter(fileName)) {
            writer.write(htmlContent.toString());
            System.out.println("✓ HTML report generated: " + fileName);
        } catch (IOException e) {
            System.out.println("Error writing HTML report: " + e.getMessage());
        }
    }
}

// InterfaceTest.java - Using interface polymorphism
public class InterfaceTest {
    public static void main(String[] args) {
        System.out.println("Demonstrating Interface Implementation");
        System.out.println("=" .repeat(60));
        
        // Create different reporter implementations
        TestReporter consoleReporter = new ConsoleReporter();
        TestReporter fileReporter = new FileReporter("test-reports/test-log.txt");
        TestReporter htmlReporter = new HTMLReporter("test-reports/test-report.html");
        
        // Store all reporters in array (polymorphism)
        TestReporter[] reporters = {consoleReporter, fileReporter, htmlReporter};
        
        // Report to all reporters
        for (TestReporter reporter : reporters) {
            reporter.reportTestStart("LoginTest");
            reporter.reportTestPass("LoginTest", "User logged in successfully");
            
            reporter.reportTestStart("SearchTest");
            reporter.reportTestFail("SearchTest", "Search results not displayed");
            
            reporter.reportTestStart("LogoutTest");
            reporter.reportTestSkip("LogoutTest", "Dependent test failed");
            
            reporter.generateSummary(3, 1, 1, 1);
        }

        System.out.println("\n✓ Reports generated using all implementations!");
        System.out.println("✓ Interface polymorphism demonstrated successfully!");
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Not implementing all interface methods**: Compilation error
   - Why: All interface methods must be implemented in concrete class
   - Fix: Implement every method declared in interface, or make class abstract

2. ❌ **Forgetting @Override annotation**: Missing implementation mistakes
   - Why: Typos in method signature don't cause errors without @Override
   - Fix: Always use @Override when implementing interface methods

3. ❌ **Making interface methods private in implementation**: Weaker access modifier
   - Why: Interface methods are implicitly public
   - Fix: Make all implementations public (or use default access if appropriate)

4. ❌ **Adding implementation details to interface**: Violating interface contract
   - Why: Interfaces should only define behavior, not implement it
   - Fix: Keep interfaces as contracts, put implementation in classes

5. ❌ **Not using interface type for references**: Missing polymorphism benefits
   - Why: Cannot swap implementations easily
   - Fix: Use interface type for variable declaration: TestReporter reporter = new ConsoleReporter()

---

## Day 14: Review & Mini Project

### Exercise 13: Complete Test Framework Mini Project

```exercise
title: Build a Complete Mini Test Framework
description: Combine all Week 2 concepts to create a functional test framework with configuration, page objects, utilities, and reporting.
requirements:
- Create framework structure with packages
- Implement configuration management
- Create base page and page objects
- Add utility classes
- Implement test reporting
- Create sample test cases
- Use all OOP concepts learned
testcases:
- input: "Run complete test framework"
  output: "Should execute tests using framework components"
hints:
- Organize code into logical packages
- Use inheritance for page objects
- Apply encapsulation for configuration
- Use interfaces for reporting
- Apply polymorphism where appropriate
- Include exception handling
solution:
```java
// ============================================
// Package: config
// ============================================

// TestConfiguration.java
package config;

public class TestConfiguration {
    private static TestConfiguration instance;
    private String browser;
    private String baseUrl;
    private int timeout;
    
    private TestConfiguration() {
        this.browser = "chrome";
        this.baseUrl = "https://practicetestautomation.com";
        this.timeout = 10;
    }
    
    public static TestConfiguration getInstance() {
        if (instance == null) {
            instance = new TestConfiguration();
        }
        return instance;
    }
    
    public String getBrowser() { return browser; }
    public String getBaseUrl() { return baseUrl; }
    public int getTimeout() { return timeout; }
    
    public void setBrowser(String browser) { this.browser = browser; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
    public void setTimeout(int timeout) { this.timeout = timeout; }
}

// ============================================
// Package: utils
// ============================================

// TestUtils.java
package utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TestUtils {
    public static String getCurrentTimestamp() {
        return new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
    }
    
    public static void wait(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

// ============================================
// Package: pages
// ============================================

// BasePage.java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }
    
    protected void sendKeys(By locator, String text) {
        var element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }
    
    protected String getText(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)).getText();
    }
}

// LoginPage.java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage extends BasePage {
    private final By usernameField = By.id("username");
    private final By passwordField = By.id("password");
    private final By submitButton = By.id("submit");
    
    public LoginPage(WebDriver driver) {
        super(driver);
    }
    
    public void login(String username, String password) {
        sendKeys(usernameField, username);
        sendKeys(passwordField, password);
        click(submitButton);
    }
    
    public boolean isLoginSuccessful() {
        return driver.getCurrentUrl().contains("logged-in-successfully");
    }
}

// ============================================
// Package: reporting
// ============================================

// TestReporter.java
package reporting;

public interface TestReporter {
    void logPass(String message);
    void logFail(String message);
    void logInfo(String message);
}

// ConsoleReporter.java
package reporting;

public class ConsoleReporter implements TestReporter {
    @Override
    public void logPass(String message) {
        System.out.println("[PASS] " + message);
    }
    
    @Override
    public void logFail(String message) {
        System.out.println("[FAIL] " + message);
    }
    
    @Override
    public void logInfo(String message) {
        System.out.println("[INFO] " + message);
    }
}

// ============================================
// Package: tests
// ============================================

// BaseTest.java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import config.TestConfiguration;
import reporting.ConsoleReporter;
import reporting.TestReporter;

public class BaseTest {
    protected WebDriver driver;
    protected TestConfiguration config;
    protected TestReporter reporter;
    
    public void setUp() {
        config = TestConfiguration.getInstance();
        reporter = new ConsoleReporter();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        reporter.logInfo("Test setup completed");
    }
    
    public void tearDown() {
        if (driver != null) {
            driver.quit();
            reporter.logInfo("Test teardown completed");
        }
    }
}

// LoginTest.java
package tests;

import pages.LoginPage;
import utils.TestUtils;

public class LoginTest extends BaseTest {
    
    public void testValidLogin() {
        reporter.logInfo("Starting valid login test");
        
        try {
            setUp();
            
            driver.get(config.getBaseUrl() + "/practice-test-login/");
            LoginPage loginPage = new LoginPage(driver);
            
            loginPage.login("student", "Password123");
            TestUtils.wait(2);
            
            if (loginPage.isLoginSuccessful()) {
                reporter.logPass("Login successful");
            } else {
                reporter.logFail("Login failed");
            }
            
        } catch (Exception e) {
            reporter.logFail("Test failed with exception: " + e.getMessage());
        } finally {
            tearDown();
        }
    }
    
    public static void main(String[] args) {
        LoginTest test = new LoginTest();
        test.testValidLogin();
    }
}
```
\```
```

**Common Mistakes:**
1. ❌ **Not organizing code into packages**: Classes in default package
   - Why: Difficult to manage and organize as project grows
   - Fix: Create logical package structure (config, utils, pages, tests, reporting)

2. ❌ **Tight coupling between components**: Hard to modify or test
   - Why: Direct dependencies make code inflexible
   - Fix: Use interfaces and dependency injection for loose coupling

3. ❌ **Not using design patterns**: Reinventing the wheel
   - Why: Common problems have proven solutions
   - Fix: Apply Page Object Model, Factory, Singleton patterns where appropriate

4. ❌ **Missing exception handling**: Framework crashes on errors
   - Why: Unhandled exceptions stop test execution
   - Fix: Add try-catch blocks and proper error recovery mechanisms

5. ❌ **Not making framework configurable**: Hardcoded values everywhere
   - Why: Changes require code modifications
   - Fix: Use configuration files (properties, JSON, YAML) for settings

---

## Summary

Congratulations! You've completed Week 2 of Advanced Java for Selenium. You've learned:

### Day 8: Collections Framework
- ✅ ArrayList for test data management
- ✅ HashMap for configuration storage
- ✅ Iterating through collections

### Day 9: Exception Handling
- ✅ Try-catch-finally blocks
- ✅ Handling Selenium exceptions
- ✅ Creating custom exceptions

### Day 10: File Handling
- ✅ Reading test data from files
- ✅ Writing test results to files
- ✅ BufferedReader and FileWriter

### Day 11: OOP - Classes & Objects
- ✅ Creating Page Object classes
- ✅ Inheritance with BasePage
- ✅ Reusable test components

### Day 12: Encapsulation
- ✅ Private fields with getters/setters
- ✅ Data validation in setters
- ✅ Static utility classes

### Day 13: Polymorphism & Interfaces
- ✅ Method overloading
- ✅ Interface implementation
- ✅ Multiple implementations

### Day 14: Mini Project
- ✅ Complete test framework structure
- ✅ Integration of all concepts
- ✅ Real-world application

### Next Steps
- Practice building your own framework
- Experiment with different design patterns
- Move on to Week 3 for Selenium-specific topics
- Apply these Java concepts in your automation projects

**Keep Learning! 🚀**