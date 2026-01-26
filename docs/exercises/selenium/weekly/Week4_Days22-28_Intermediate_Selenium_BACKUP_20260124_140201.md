
# Week 4: Intermediate Selenium - Beginner-Friendly Exercises

## Day 22: TestNG Basics

### Exercise 1: Create First TestNG Test

```exercise
title: Set Up TestNG and Create Basic Test
description: Learn to create and run TestNG tests with annotations and assertions.
requirements:
- Add TestNG dependency
- Create test class with @Test annotation
- Use @BeforeMethod and @AfterMethod
- Use TestNG assertions
- Run test and view results
testcases:
- input: "Run TestNG test"
  output: "Should execute test with setup and teardown"
hints:
- Import org.testng.annotations.*
- Import org.testng.Assert
- Use @Test for test methods
- Use @BeforeMethod for setup
- Use @AfterMethod for cleanup
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class FirstTestNGTest {
    private WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        System.out.println("Setting up test...");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        System.out.println("✓ Browser initialized");
    }
    
    @Test
    public void testGoogleTitle() {
        System.out.println("\nRunning: testGoogleTitle");
        
        driver.get("https://www.google.com");
        String actualTitle = driver.getTitle();
        
        Assert.assertTrue(actualTitle.contains("Google"), 
            "Title should contain 'Google'");
        System.out.println("✓ Title assertion passed: " + actualTitle);
    }
    
    @Test
    public void testGoogleSearchBox() {
        System.out.println("\nRunning: testGoogleSearchBox");
        
        driver.get("https://www.google.com");
        WebElement searchBox = driver.findElement(By.name("q"));
        
        Assert.assertTrue(searchBox.isDisplayed(), 
            "Search box should be displayed");
        Assert.assertTrue(searchBox.isEnabled(), 
            "Search box should be enabled");
        System.out.println("✓ Search box assertions passed");
    }
    
    @AfterMethod
    public void tearDown() {
        System.out.println("Tearing down test...");
        if (driver != null) {
            driver.quit();
            System.out.println("✓ Browser closed\n");
        }
    }
}
```
\```
```

### Exercise 2: TestNG Annotations and Test Priority

```exercise
title: Use TestNG Annotations for Test Control
description: Learn to use various TestNG annotations and control test execution order.
requirements:
- Use @BeforeClass and @AfterClass
- Use @BeforeTest and @AfterTest
- Set test priority
- Use dependsOnMethods
- Group tests
testcases:
- input: "Run tests with different priorities"
  output: "Should execute tests in specified order"
hints:
- @BeforeClass runs once before all tests in class
- @AfterClass runs once after all tests
- Use priority attribute: @Test(priority = 1)
- Use dependsOnMethods: @Test(dependsOnMethods = {"test1"})
- Lower priority number runs first
solution:
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;

public class TestNGAnnotationsExample {
    private static WebDriver driver;
    
    @BeforeClass
    public void beforeClass() {
        System.out.println("@BeforeClass: Initializing driver (once per class)");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @BeforeMethod
    public void beforeMethod() {
        System.out.println("  @BeforeMethod: Running before each test");
    }
    
    @Test(priority = 1)
    public void test1_FirstTest() {
        System.out.println("    @Test(priority=1): Running first test");
        driver.get("https://www.google.com");
        Assert.assertTrue(driver.getTitle().contains("Google"));
        System.out.println("    ✓ First test passed");
    }
    
    @Test(priority = 2, dependsOnMethods = {"test1_FirstTest"})
    public void test2_SecondTest() {
        System.out.println("    @Test(priority=2): Running second test");
        driver.get("https://www.selenium.dev");
        Assert.assertTrue(driver.getTitle().contains("Selenium"));
        System.out.println("    ✓ Second test passed");
    }
    
    @Test(priority = 3)
    public void test3_ThirdTest() {
        System.out.println("    @Test(priority=3): Running third test");
        driver.get("https://www.wikipedia.org");
        Assert.assertTrue(driver.getTitle().contains("Wikipedia"));
        System.out.println("    ✓ Third test passed");
    }
    
    @Test(priority = 0)
    public void test0_RunsFirst() {
        System.out.println("    @Test(priority=0): This runs first due to priority");
        Assert.assertTrue(true);
        System.out.println("    ✓ Priority test passed");
    }
    
    @AfterMethod
    public void afterMethod() {
        System.out.println("  @AfterMethod: Running after each test\n");
    }
    
    @AfterClass
    public void afterClass() {
        System.out.println("@AfterClass: Closing driver (once per class)");
        if (driver != null) {
            driver.quit();
            System.out.println("✓ Browser closed");
        }
    }
}
```
\```
```

---

## Day 23: TestNG Assertions & Data Providers

### Exercise 3: TestNG Assertions

```exercise
title: Master TestNG Assertion Methods
description: Learn to use different types of TestNG assertions for test validation.
requirements:
- Use assertEquals for exact match
- Use assertTrue and assertFalse
- Use assertNotNull and assertNull
- Use assertSame and assertNotSame
- Handle assertion failures
testcases:
- input: "Run tests with various assertions"
  output: "Should validate using different assertion types"
hints:
- Import org.testng.Assert
- assertEquals(actual, expected, message)
- assertTrue(condition, message)
- Use soft assertions for multiple checks
- Hard assertions stop test on failure
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

public class TestNGAssertionsExample {
    private WebDriver driver;
    
    @BeforeClass
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @Test
    public void testHardAssertions() {
        System.out.println("\nTest: Hard Assertions");
        driver.get("https://www.selenium.dev/selenium/web/web-form.html");
        
        // assertEquals - Exact match
        String actualTitle = driver.getTitle();
        Assert.assertEquals(actualTitle, "Web form", 
            "Title should match exactly");
        System.out.println("✓ assertEquals passed");
        
        // assertTrue - Condition check
        Assert.assertTrue(actualTitle.contains("form"), 
            "Title should contain 'form'");
        System.out.println("✓ assertTrue passed");
        
        // assertFalse - Negative condition
        Assert.assertFalse(actualTitle.isEmpty(), 
            "Title should not be empty");
        System.out.println("✓ assertFalse passed");
        
        // assertNotNull - Null check
        WebElement textInput = driver.findElement(By.id("my-text-id"));
        Assert.assertNotNull(textInput, 
            "Element should not be null");
        System.out.println("✓ assertNotNull passed");
        
        // Element state assertions
        Assert.assertTrue(textInput.isDisplayed(), 
            "Element should be displayed");
        Assert.assertTrue(textInput.isEnabled(), 
            "Element should be enabled");
        System.out.println("✓ Element state assertions passed");
    }
    
    @Test
    public void testSoftAssertions() {
        System.out.println("\nTest: Soft Assertions");
        driver.get("https://www.selenium.dev/selenium/web/web-form.html");
        
        SoftAssert softAssert = new SoftAssert();
        
        // Multiple assertions - all will be checked
        String title = driver.getTitle();
        softAssert.assertEquals(title, "Web form", "Title check");
        softAssert.assertTrue(title.contains("form"), "Title contains check");
        softAssert.assertFalse(title.isEmpty(), "Title not empty check");
        
        WebElement textInput = driver.findElement(By.id("my-text-id"));
        softAssert.assertTrue(textInput.isDisplayed(), "Display check");
        softAssert.assertTrue(textInput.isEnabled(), "Enabled check");
        
        System.out.println("✓ All soft assertions executed");
        
        // This must be called to fail the test if any assertion failed
        softAssert.assertAll();
    }
    
    @Test
    public void testComparisonAssertions() {
        System.out.println("\nTest: Comparison Assertions");
        driver.get("https://www.google.com");
        
        // assertNotEquals
        String title1 = driver.getTitle();
        driver.get("https://www.selenium.dev");
        String title2 = driver.getTitle();
        
        Assert.assertNotEquals(title1, title2, 
            "Titles should be different");
        System.out.println("✓ assertNotEquals passed");
        
        // assertSame vs assertEquals
        String str1 = "Selenium";
        String str2 = "Selenium";
        String str3 = new String("Selenium");
        
        Assert.assertEquals(str1, str3, 
            "Values are equal");
        System.out.println("✓ assertEquals for values passed");
        
        Assert.assertSame(str1, str2, 
            "References are same");
        System.out.println("✓ assertSame for references passed");
    }
    
    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```
\```
```

### Exercise 4: Data Provider for Data-Driven Testing

```exercise
title: Implement Data-Driven Tests with DataProvider
description: Learn to use @DataProvider for running same test with different data sets.
requirements:
- Create @DataProvider method
- Return 2D Object array
- Use dataProvider in @Test
- Run test with multiple data sets
- Handle different data types
testcases:
- input: "Run test with multiple data sets"
  output: "Should execute test for each data set"
hints:
- @DataProvider returns Object[][]
- Link with @Test(dataProvider = "name")
- Each row is one test execution
- Can return different data types
- Method must be static or in same class
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DataProviderExample {
    private WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return new Object[][] {
            {"standard_user", "secret_sauce", true},
            {"locked_out_user", "secret_sauce", false},
            {"invalid_user", "wrong_password", false}
        };
    }
    
    @Test(dataProvider = "loginData")
    public void testLogin(String username, String password, boolean shouldSucceed) {
        System.out.println("\nTesting login with: " + username);
        
        driver.get("https://www.saucedemo.com");
        
        WebElement usernameField = driver.findElement(By.id("user-name"));
        WebElement passwordField = driver.findElement(By.id("password"));
        WebElement loginButton = driver.findElement(By.id("login-button"));
        
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        loginButton.click();
        
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        String currentUrl = driver.getCurrentUrl();
        
        if (shouldSucceed) {
            Assert.assertTrue(currentUrl.contains("inventory"), 
                "Login should succeed for " + username);
            System.out.println("✓ Login successful as expected");
        } else {
            Assert.assertTrue(currentUrl.contains("saucedemo.com") && 
                !currentUrl.contains("inventory"), 
                "Login should fail for " + username);
            System.out.println("✓ Login failed as expected");
        }
    }
    
    @DataProvider(name = "searchData")
    public Object[][] getSearchData() {
        return new Object[][] {
            {"Selenium WebDriver"},
            {"TestNG Framework"},
            {"Java Programming"},
            {"Automation Testing"}
        };
    }
    
    @Test(dataProvider = "searchData")
    public void testGoogleSearch(String searchTerm) {
        System.out.println("\nSearching for: " + searchTerm);
        
        driver.get("https://www.google.com");
        
        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys(searchTerm);
        searchBox.submit();
        
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        String title = driver.getTitle();
        Assert.assertTrue(title.contains(searchTerm), 
            "Title should contain search term");
        System.out.println("✓ Search completed: " + title);
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 24: Page Object Model (POM)

### Exercise 5: Implement Page Object Model

```exercise
title: Create Page Objects for Login Flow
description: Build a complete Page Object Model structure for a login workflow.
requirements:
- Create BasePage class
- Create LoginPage class
- Create HomePage class
- Use PageFactory
- Implement @FindBy annotations
- Create test using page objects
testcases:
- input: "Run test using POM"
  output: "Should successfully use page objects"
hints:
- Use @FindBy for element location
- Use PageFactory.initElements()
- Keep locators in page classes
- Methods should represent user actions
- Return page objects for chaining
solution:
```java
// BasePage.java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }
}

// LoginPage.java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

public class LoginPage extends BasePage {
    
    @FindBy(how = How.ID, using = "user-name")
    private WebElement usernameField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(id = "login-button")
    private WebElement loginButton;
    
    @FindBy(css = "[data-test='error']")
    private WebElement errorMessage;
    
    public LoginPage(WebDriver driver) {
        super(driver);
    }
    
    public LoginPage enterUsername(String username) {
        usernameField.clear();
        usernameField.sendKeys(username);
        return this;
    }
    
    public LoginPage enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
        return this;
    }
    
    public HomePage clickLogin() {
        loginButton.click();
        return new HomePage(driver);
    }
    
    public LoginPage clickLoginExpectingFailure() {
        loginButton.click();
        return this;
    }
    
    public boolean isErrorDisplayed() {
        try {
            return errorMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getErrorMessage() {
        return errorMessage.getText();
    }
    
    public HomePage login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        return clickLogin();
    }
}

// HomePage.java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import java.util.List;

public class HomePage extends BasePage {
    
    @FindBy(className = "title")
    private WebElement pageTitle;
    
    @FindBy(className = "inventory_item")
    private List<WebElement> products;
    
    @FindBy(className = "shopping_cart_link")
    private WebElement cartIcon;
    
    @FindBy(className = "shopping_cart_badge")
    private WebElement cartBadge;
    
    @FindBy(id = "react-burger-menu-btn")
    private WebElement menuButton;
    
    @FindBy(id = "logout_sidebar_link")
    private WebElement logoutLink;
    
    public HomePage(WebDriver driver) {
        super(driver);
    }
    
    public String getPageTitle() {
        return pageTitle.getText();
    }
    
    public int getProductCount() {
        return products.size();
    }
    
    public HomePage addFirstProductToCart() {
        products.get(0).findElement(
            org.openqa.selenium.By.xpath(".//button[contains(text(), 'Add to cart')]")
        ).click();
        return this;
    }
    
    public String getCartItemCount() {
        try {
            return cartBadge.getText();
        } catch (Exception e) {
            return "0";
        }
    }
    
    public void clickCart() {
        cartIcon.click();
    }
    
    public LoginPage logout() {
        menuButton.click();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        logoutLink.click();
        return new LoginPage(driver);
    }
}

// LoginTest.java - Test using POM
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class LoginTest {
    private WebDriver driver;
    private LoginPage loginPage;
    
    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.saucedemo.com");
        loginPage = new LoginPage(driver);
    }
    
    @Test
    public void testSuccessfulLogin() {
        System.out.println("\nTest: Successful Login");
        
        HomePage homePage = loginPage.login("standard_user", "secret_sauce");
        
        Assert.assertEquals(homePage.getPageTitle(), "Products");
        Assert.assertTrue(homePage.getProductCount() > 0);
        System.out.println("✓ Login successful");
        System.out.println("✓ Products displayed: " + homePage.getProductCount());
    }
    
    @Test
    public void testFailedLogin() {
        System.out.println("\nTest: Failed Login");
        
        loginPage.enterUsername("invalid_user")
                .enterPassword("wrong_password")
                .clickLoginExpectingFailure();
        
        Assert.assertTrue(loginPage.isErrorDisplayed());
        System.out.println("✓ Error message displayed");
        System.out.println("  Message: " + loginPage.getErrorMessage());
    }
    
    @Test
    public void testAddToCart() {
        System.out.println("\nTest: Add to Cart");
        
        HomePage homePage = loginPage.login("standard_user", "secret_sauce");
        homePage.addFirstProductToCart();
        
        Assert.assertEquals(homePage.getCartItemCount(), "1");
        System.out.println("✓ Product added to cart");
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```
\```
```

---

## Day 25: Handling Dynamic Elements

### Exercise 6: Handle Dynamic Web Tables

```exercise
title: Work with Dynamic Web Tables
description: Learn to locate and extract data from dynamic web tables.
requirements:
- Find table using locators
- Get row count
- Get column count
- Extract specific cell data
- Iterate through all rows
- Search for specific data
testcases:
- input: "Extract data from web table"
  output: "Should successfully read table data"
hints:
- Use //table to find table
- Use //tr for rows
- Use //td for cells
- Use .size() for count
- Use nested loops for iteration
- Use XPath for specific cells
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class WebTableExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/tables.html");
            driver.manage().window().maximize();
            
            System.out.println("Web Table Handling");
            System.out.println("=" .repeat(60));
            
            // 1. Find the table
            WebElement table = driver.findElement(By.id("table1"));
            System.out.println("\n1. Table found");
            
            // 2. Get all rows
            List<WebElement> rows = table.findElements(By.tagName("tr"));
            System.out.println("   Total rows: " + rows.size());
            
            // 3. Get all columns from first row
            List<WebElement> headers = rows.get(0).findElements(By.tagName("th"));
            System.out.println("   Total columns: " + headers.size());
            
            // 4. Print headers
            System.out.println("\n2. Table Headers:");
            for (WebElement header : headers) {
                System.out.print("   " + header.getText() + " |");
            }
            System.out.println();
            
            // 5. Print all table data
            System.out.println("\n3. Table Data:");
            System.out.println("   " + "-".repeat(50));
            
            for (int i = 1; i < rows.size(); i++) {
                List<WebElement> cells = rows.get(i).findElements(By.tagName("td"));
                for (WebElement cell : cells) {
                    System.out.print("   " + cell.getText() + " |");
                }
                System.out.println();
            }
            
            // 6. Get specific cell data (row 2, column 2)
            System.out.println("\n4. Specific Cell Data:");
            WebElement specificCell = driver.findElement(
                By.xpath("//table[@id='table1']//tr[2]/td[2]")
            );
            System.out.println("   Cell[2,2]: " + specificCell.getText());
            
            // 7. Search for specific data
            System.out.println("\n5. Search for 'Smith':");
            boolean found = false;
            for (int i = 1; i < rows.size(); i++) {
                List<WebElement> cells = rows.get(i).findElements(By.tagName("td"));
                for (int j = 0; j < cells.size(); j++) {
                    if (cells.get(j).getText().equals("Smith")) {
                        System.out.println("   ✓ Found 'Smith' at row " + i + 
                            ", column " + (j + 1));
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            
            // 8. Get data from specific column
            System.out.println("\n6. All Last Names:");
            for (int i = 1; i < rows.size(); i++) {
                WebElement lastNameCell = driver.findElement(
                    By.xpath("//table[@id='table1']//tr[" + (i + 1) + "]/td[1]")
                );
                System.out.println("   " + lastNameCell.getText());
            }
            
            // 9. Count rows with specific condition
            System.out.println("\n7. Count rows where age > 30:");
            int count = 0;
            for (int i = 1; i < rows.size(); i++) {
                WebElement ageCell = driver.findElement(
                    By.xpath("//table[@id='table1']//tr[" + (i + 1) + "]/td[3]")
                );
                try {
                    int age = Integer.parseInt(ageCell.getText());
                    if (age > 30) {
                        count++;
                    }
                } catch (NumberFormatException e) {
                    // Skip non-numeric values
                }
            }
            System.out.println("   Count: " + count);
            
            System.out.println("\n✓ Web table handling completed!");
            
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

### Exercise 7: Handle Auto-Suggest Dropdowns

```exercise
title: Work with Auto-Suggest/Auto-Complete
description: Learn to handle dynamic dropdowns that show suggestions as you type.
requirements:
- Type in auto-suggest field
- Wait for suggestions to appear
- Select suggestion from list
- Verify selection
testcases:
- input: "Select from auto-suggest dropdown"
  output: "Should successfully select suggested option"
hints:
- Type partial text to trigger suggestions
- Wait for suggestion list to appear
- Use explicit wait for suggestions
- Click on desired suggestion
- Verify final value
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class AutoSuggestExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        try {
            System.out.println("Auto-Suggest Dropdown Handling");
            System.out.println("=" .repeat(60));
            
            // Example 1: Google Search Auto-Suggest
            System.out.println("\n1. Google Auto-Suggest:");
            driver.get("https://www.google.com");
            driver.manage().window().maximize();
            
            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("Selenium");
            
            // Wait for suggestions to appear
            Thread.sleep(2000);
            
            // Find all suggestions
            List<WebElement> suggestions = driver.findElements(
                By.xpath("//ul[@role='listbox']//li//div[@class='wM6W7d']")
            );
            
            System.out.println("   Suggestions found: " + suggestions.size());
            
            // Print all suggestions
            for (int i = 0; i < Math.min(5, suggestions.size()); i++) {
                System.out.println("   " + (i + 1) + ". " + 
                    suggestions.get(i).getText());
            }
            
            // Select specific suggestion
            for (WebElement suggestion : suggestions) {
                if (suggestion.getText().toLowerCase().contains("webdriver")) {
                    suggestion.click();
                    System.out.println("   ✓ Selected: " + suggestion.getText());
                    break;
                }
            }
            
            Thread.sleep(2000);
            
            // Example 2: Wikipedia Search
            System.out.println("\n2. Wikipedia Auto-Suggest:");
            driver.get("https://www.wikipedia.org");
            
            WebElement wikiSearch = driver.findElement(By.id("searchInput"));
            wikiSearch.sendKeys("Java");
            
            Thread.sleep(2000);
            
            // Find Wikipedia suggestions
            List<WebElement> wikiSuggestions = driver.findElements(
                By.xpath("//div[@class='suggestions-dropdown']//a")
            );
            
            System.out.println("   Suggestions found: " + wikiSuggestions.size());
            
            for (int i = 0; i < Math.min(5, wikiSuggestions.size()); i++) {
                System.out.println("   " + (i + 1) + ". " + 
                    wikiSuggestions.get(i).getText());
            }
            
            // Select first suggestion
            if (!wikiSuggestions.isEmpty()) {
                wikiSuggestions.get(0).click();
                System.out.println("   ✓ Selected first suggestion");
            }
            
            Thread.sleep(2000);
            
            // Example 3: Using Arrow Keys
            System.out.println("\n3. Navigate with Arrow Keys:");
            driver.get("https://www.google.com");
            
            WebElement searchBox2 = driver.findElement(By.name("q"));
            searchBox2.sendKeys("TestNG");
            Thread.sleep(1000);
            
            // Navigate down with arrow keys
            searchBox2.sendKeys(Keys.ARROW_DOWN);
            Thread.sleep(500);
            searchBox2.sendKeys(Keys.ARROW_DOWN);
            Thread.sleep(500);
            searchBox2.sendKeys(Keys.ENTER);
            System.out.println("   ✓ Selected using arrow keys and Enter");
            
            Thread.sleep(2000);
            
            System.out.println("\n✓ Auto-suggest handling completed!");
            
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

---

## Day 26: File Upload & Download

### Exercise 8: Upload Files

```exercise
title: Handle File Upload Operations
description: Learn to upload files using Selenium WebDriver.
requirements:
- Locate file upload element
- Send file path to element
- Verify file upload
- Handle multiple file uploads
testcases:
- input: "Upload file to web application"
  output: "Should successfully upload file"
hints:
- Use sendKeys() with file path
- File input element has type="file"
- Use absolute file path
- Create test file if needed
- Verify upload success
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;
import java.io.FileWriter;

public class FileUploadExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            System.out.println("File Upload Example");
            System.out.println("=" .repeat(60));
            
            // Create a test file to upload
            File testFile = new File("test-upload.txt");
            FileWriter writer = new FileWriter(testFile);
            writer.write("This is a test file for upload");
            writer.close();
            System.out.println("\n1. Test file created: " + testFile.getAbsolutePath());
            
            // Navigate to upload page
            driver.get("https://www.selenium.dev/selenium/web/upload.html");
            driver.manage().window().maximize();
            
            // Find file input element
            WebElement fileInput = driver.findElement(By.id("upload"));
            System.out.println("\n2. File input element found");
            
            // Upload file by sending file path
            fileInput.sendKeys(testFile.getAbsolutePath());
            System.out.println("✓ File path sent to input element");
            
            Thread.sleep(1000);
            
            // Verify upload (if there's a submit button)
            try {
                WebElement submitButton = driver.findElement(By.id("submit"));
                submitButton.click();
                System.out.println("✓ Submit button clicked");
                Thread.sleep(2000);
            } catch (Exception e) {
                System.out.println("Note: No submit button found");
            }
            
            // Verify file name is displayed
            String uploadedFileName = fileInput.getAttribute("value");
            if (uploadedFileName.contains("test-upload.txt")) {
                System.out.println("✓ File upload verified: " + uploadedFileName);
            }
            
            // Clean up test file
            testFile.delete();
            System.out.println("\n✓ Test file cleaned up");
            
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

### Exercise 9: Download Files

```exercise
title: Handle File Download Operations
description: Learn to download files and verify download completion.
requirements:
- Set download directory
- Click download link
- Wait for download to complete
- Verify file exists
- Check file size
testcases:
- input: "Download file from website"
  output: "Should successfully download and verify file"
hints:
- Set Chrome preferences for download directory
- Use ChromeOptions
- Wait for file to appear in directory
- Check file.exists()
- Use File.length() for size
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.io.File;
import java.util.HashMap;

public class FileDownloadExample {
    
    private static boolean isFileDownloaded(String downloadPath, String fileName, int timeout) {
        File file = new File(downloadPath, fileName);
        int waitTime = 0;
        
        while (waitTime < timeout) {
            if (file.exists() && file.length() > 0) {
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
    
    public static void main(String[] args) {
        System.out.println("File Download Example");
        System.out.println("=" .repeat(60));
        
        // Set download directory
        String downloadPath = System.getProperty("user.dir") + "/downloads";
        File downloadDir = new File(downloadPath);
        downloadDir.mkdirs();
        System.out.println("\n1. Download directory: " + downloadPath);
        
        // Configure Chrome options
        HashMap<String, Object> chromePrefs = new HashMap<>();
        chromePrefs.put("download.default_directory", downloadPath);
        chromePrefs.put("download.prompt_for_download", false);
        chromePrefs.put("safebrowsing.enabled", true);
        
        ChromeOptions options = new ChromeOptions();
        options.setExperimentalOption("prefs", chromePrefs);
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            driver.get("https://www.selenium.dev/selenium/web/downloads/download.html");
            driver.manage().window().maximize();
            System.out.println("\n2. Navigated to download page");
            
            // Click download link
            WebElement downloadLink = driver.findElement(By.id("file-1"));
            String fileName = downloadLink.getText();
            System.out.println("   File to download: " + fileName);
            
            downloadLink.click();
            System.out.println("✓ Download link clicked");
            
            // Wait for download to complete
            System.out.println("\n3. Waiting for download to complete...");
            boolean isDownloaded = isFileDownloaded(downloadPath, fileName, 30);
            
            if (isDownloaded) {
                System.out.println("✓ File downloaded successfully");
                
                File downloadedFile = new File(downloadPath, fileName);
                System.out.println("   File size: " + downloadedFile.length() + " bytes");
                System.out.println("   File path: " + downloadedFile.getAbsolutePath());
                
                // Clean up
                downloadedFile.delete();
                System.out.println("\n✓ Downloaded file cleaned up");
            } else {
                System.out.println("✗ File download failed or timed out");
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

---

## Day 27: Headless Browser & Browser Options

### Exercise 10: Run Tests in Headless Mode

```exercise
title: Execute Tests in Headless Browser
description: Learn to run Selenium tests without opening visible browser window.
requirements:
- Configure ChromeOptions for headless mode
- Run test in headless mode
- Verify test execution
- Compare performance with normal mode
testcases:
- input: "Run test in headless mode"
  output: "Should execute test without visible browser"
hints:
- Use ChromeOptions
- Add argument "--headless"
- Add argument "--disable-gpu" for Windows
- Use --window-size for headless
- All features work in headless mode
solution:
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class HeadlessBrowserExample {
    public static void main(String[] args) {
        System.out.println("Headless Browser Example");
        System.out.println("=" .repeat(60));
        
        // Configure Chrome Options for headless mode
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        
        System.out.println("\n1. Chrome Options configured for headless mode");
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            long startTime = System.currentTimeMillis();
            
            // Test 1: Navigate and verify title
            System.out.println("\n2. Test 1: Page Navigation");
            driver.get("https://www.google.com");
            String title = driver.getTitle();
            System.out.println("   Page title: " + title);
            System.out.println("   ✓ Title verified");
            
            // Test 2: Element interaction
            System.out.println("\n3. Test 2: Element Interaction");
            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("Selenium Headless");
            searchBox.submit();
            
            Thread.sleep(2000);
            
            String searchTitle = driver.getTitle();
            System.out.println("   Search results title: " + searchTitle);
            System.out.println("   ✓ Search completed");
            
            // Test 3: Multiple page navigation
            System.out.println("\n4. Test 3: Multiple Pages");
            driver.get("https://www.selenium.dev");
            System.out.println("   ✓ Navigated to Selenium.dev");
            
            driver.get("https://www.wikipedia.org");
            System.out.println("   ✓ Navigated to Wikipedia");
            
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            System.out.println("\n5. Performance:");
            System.out.println("   Total execution time: " + duration + " ms");
            System.out.println("   ✓ All tests completed in headless mode");
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit();
            System.out.println("\n✓ Headless browser closed");
        }
    }
}
```
\```
```

### Exercise 11: Browser Options and Capabilities

```exercise
title: Configure Browser with Various Options
description: Learn to set different browser options and capabilities.
requirements:
- Set window size
- Disable notifications
- Set user agent
- Disable images
- Set download directory
- Configure proxy (optional)
testcases:
- input: "Run browser with custom options"
  output: "Should apply all configurations"
hints:
- Use ChromeOptions.addArguments()
- Use setExperimentalOption() for preferences
- Use setCapability() for capabilities
- Chain multiple options
- Verify options are applied
solution:
```java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.util.HashMap;
import java.util.Map;

public class BrowserOptionsExample {
    public static void main(String[] args) {
        System.out.println("Browser Options Configuration");
        System.out.println("=" .repeat(60));
        
        ChromeOptions options = new ChromeOptions();
        
        // 1. Window size
        System.out.println("\n1. Setting window size");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--start-maximized");
        
        // 2. Disable notifications
        System.out.println("2. Disabling notifications");
        options.addArguments("--disable-notifications");
        
        // 3. Disable pop-ups
        System.out.println("3. Disabling pop-ups");
        options.addArguments("--disable-popup-blocking");
        
        // 4. Set user agent
        System.out.println("4. Setting custom user agent");
        options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        
        // 5. Disable images (for faster loading)
        System.out.println("5. Disabling images");
        Map<String, Object> prefs = new HashMap<>();
        prefs.put("profile.managed_default_content_settings.images", 2);
        
        // 6. Set download directory
        String downloadPath = System.getProperty("user.dir") + "/downloads";
        System.out.println("6. Setting download directory: " + downloadPath);
        prefs.put("download.default_directory", downloadPath);
        prefs.put("download.prompt_for_download", false);
        
        // 7. Disable automation flags
        System.out.println("7. Disabling automation detection");
        options.setExperimentalOption("excludeSwitches",
            new String[]{"enable-automation"});
        options.setExperimentalOption("useAutomationExtension", false);
        
        // Apply preferences
        options.setExperimentalOption("prefs", prefs);
        
        // 8. Additional arguments
        System.out.println("8. Adding additional arguments");
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.addArguments("--disable-extensions");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        
        // 9. Incognito mode
        System.out.println("9. Enabling incognito mode");
        options.addArguments("--incognito");
        
        System.out.println("\n✓ All options configured");
        
        WebDriver driver = new ChromeDriver(options);
        
        try {
            System.out.println("\n10. Testing configured browser:");
            
            driver.get("https://www.google.com");
            System.out.println("    ✓ Navigated to Google");
            
            String title = driver.getTitle();
            System.out.println("    Page title: " + title);
            
            // Get window size
            org.openqa.selenium.Dimension size = driver.manage().window().getSize();
            System.out.println("    Window size: " + size.getWidth() + "x" + size.getHeight());
            
            Thread.sleep(2000);
            
            System.out.println("\n✓ Browser options applied successfully!");
            
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

---

## Day 28: Review & Complete Project

### Exercise 12: Build Complete Test Suite

```exercise
title: Create Comprehensive Test Automation Suite
description: Build a complete test suite integrating all Week 4 concepts.
requirements:
- Use TestNG framework
- Implement Page Object Model
- Use Data Providers
- Handle dynamic elements
- Take screenshots
- Generate reports
- Use headless mode option
testcases:
- input: "Run complete test suite"
  output: "Should execute all tests with proper reporting"
hints:
- Organize tests in test classes
- Use BaseTest for common setup
- Create utility classes
- Use TestNG XML for suite configuration
- Implement proper logging
solution:
```java
// BaseTest.java
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;

public class BaseTest {
    protected WebDriver driver;
    
    @Parameters({"headless"})
    @BeforeMethod
    public void setUp(@Optional("false") String headless) {
        System.out.println("Setting up test...");
        
        ChromeOptions options = new ChromeOptions();
        if (headless.equals("true")) {
            options.addArguments("--headless");
            options.addArguments("--disable-gpu");
            System.out.println("Running in headless mode");
        }
        
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        System.out.println("✓ Browser initialized");
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
            System.out.println("✓ Browser closed\n");
        }
    }
}

// TestUtils.java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TestUtils {
    public static void takeScreenshot(WebDriver driver, String fileName) {
        try {
            TakesScreenshot screenshot = (TakesScreenshot) driver;
            File sourceFile = screenshot.getScreenshotAs(OutputType.FILE);
            String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
            File destFile = new File("test-output/screenshots/" + fileName + "_" +
                timestamp + ".png");
            destFile.getParentFile().mkdirs();
            FileUtils.copyFile(sourceFile, destFile);
            System.out.println("Screenshot saved: " + destFile.getName());
        } catch (Exception e) {
            System.out.println("Failed to take screenshot: " + e.getMessage());
        }
    }
}

// CompleteTestSuite.java
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class CompleteTestSuite extends BaseTest {
    
    @DataProvider(name = "searchData")
    public Object[][] getSearchData() {
        return new Object[][] {
            {"Selenium WebDriver", true},
            {"TestNG Framework", true},
            {"Page Object Model", true}
        };
    }
    
    @Test(priority = 1)
    public void testGoogleHomePage() {
        System.out.println("Test: Google Home Page");
        driver.get("https://www.google.com");
        
        String title = driver.getTitle();
        Assert.assertTrue(title.contains("Google"));
        System.out.println("✓ Home page loaded");
        
        TestUtils.takeScreenshot(driver, "google_homepage");
    }
    
    @Test(priority = 2, dataProvider = "searchData")
    public void testGoogleSearch(String searchTerm, boolean shouldSucceed) {
        System.out.println("Test: Search for '" + searchTerm + "'");
        driver.get("https://www.google.com");
        
        org.openqa.selenium.WebElement searchBox =
            driver.findElement(org.openqa.selenium.By.name("q"));
        searchBox.sendKeys(searchTerm);
        searchBox.submit();
        
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        String title = driver.getTitle();
        Assert.assertTrue(title.contains(searchTerm));
        System.out.println("✓ Search completed");
        
        TestUtils.takeScreenshot(driver, "search_" +
            searchTerm.replace(" ", "_"));
    }
    
    @Test(priority = 3)
    public void testMultiplePages() {
        System.out.println("Test: Multiple Page Navigation");
        
        String[] urls = {
            "https://www.google.com",
            "https://www.selenium.dev",
            "https://www.wikipedia.org"
        };
        
        for (String url : urls) {
            driver.get(url);
            System.out.println("✓ Navigated to: " + url);
            Assert.assertFalse(driver.getTitle().isEmpty());
        }
        
        TestUtils.takeScreenshot(driver, "multiple_pages");
    }
}
```
\```
```

---

## Summary

Congratulations! You've completed Week 4 of Intermediate Selenium. You've learned:

### Day 22: TestNG Basics
- ✅ TestNG annotations (@Test, @BeforeMethod, @AfterMethod)
- ✅ Test priorities and dependencies
- ✅ Test execution control

### Day 23: TestNG Assertions & Data Providers
- ✅ Hard and soft assertions
- ✅ Data-driven testing with @DataProvider
- ✅ Multiple assertion types

### Day 24: Page Object Model
- ✅ BasePage implementation
- ✅ Page classes with @FindBy
- ✅ PageFactory pattern
- ✅ Method chaining

### Day 25: Dynamic Elements
- ✅ Web table handling
- ✅ Auto-suggest dropdowns
- ✅ Dynamic element location

### Day 26: File Operations
- ✅ File upload
- ✅ File download
- ✅ Download verification

### Day 27: Browser Options
- ✅ Headless browser execution
- ✅ Chrome options configuration
- ✅ Custom browser settings

### Day 28: Complete Project
- ✅ Full test suite integration
- ✅ Utility classes
- ✅ Screenshot capture
- ✅ Test organization

### Next Steps
- Practice building complete frameworks
- Explore CI/CD integration
- Move on to Week 5 for TestNG & POM advanced topics
- Learn reporting frameworks

**Excellent Progress! 🎯**