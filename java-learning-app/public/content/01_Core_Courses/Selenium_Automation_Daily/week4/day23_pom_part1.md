
# Day 15: Page Object Model (POM) - Design Pattern for Selenium

## Table of Contents
1. [Introduction to Page Object Model](#introduction)
2. [Why Use POM?](#why-pom)
3. [POM Architecture](#architecture)
4. [Implementing POM Without PageFactory](#basic-pom)
5. [Implementing POM With PageFactory](#pagefactory)
6. [Best Practices](#best-practices)
7. [Practice Exercises](#exercises)

---

## 1. Introduction to Page Object Model {#introduction}

**Page Object Model (POM)** is a design pattern that creates an object repository for web UI elements. It helps make the code more readable, maintainable, and reusable.

### Key Concepts

- **Separation of Concerns**: Test logic is separated from page-specific code
- **Object Repository**: Web elements are stored as objects in page classes
- **Reusability**: Page methods can be reused across multiple tests
- **Maintainability**: UI changes require updates only in page classes

### Basic Structure

```
Project Structure:
├── src/test/java
│   ├── pages/
│   │   ├── LoginPage.java
│   │   ├── HomePage.java
│   │   └── BasePage.java
│   ├── tests/
│   │   ├── LoginTest.java
│   │   └── HomeTest.java
│   └── utils/
│       └── DriverManager.java
```

---

## 2. Why Use POM? {#why-pom}

### Without POM (Traditional Approach)

```java
public class LoginTest {
    WebDriver driver;
    
    @Test
    public void testLogin() {
        driver = new ChromeDriver();
        driver.get("https://example.com/login");
        
        // Locators mixed with test logic
        driver.findElement(By.id("username")).sendKeys("user@test.com");
        driver.findElement(By.id("password")).sendKeys("password123");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Assertion
        String welcomeMsg = driver.findElement(By.className("welcome")).getText();
        Assert.assertEquals(welcomeMsg, "Welcome User!");
    }
    
    @Test
    public void testInvalidLogin() {
        driver = new ChromeDriver();
        driver.get("https://example.com/login");
        
        // Same locators repeated - code duplication
        driver.findElement(By.id("username")).sendKeys("invalid@test.com");
        driver.findElement(By.id("password")).sendKeys("wrong");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        String errorMsg = driver.findElement(By.className("error")).getText();
        Assert.assertEquals(errorMsg, "Invalid credentials");
    }
}
```

**Problems:**
- Code duplication
- Hard to maintain (if locator changes, update in all tests)
- Test logic mixed with page elements
- Poor readability

### With POM (Recommended Approach)

```java
// LoginPage.java
public class LoginPage {
    WebDriver driver;
    
    // Locators
    By usernameField = By.id("username");
    By passwordField = By.id("password");
    By loginButton = By.xpath("//button[@type='submit']");
    By errorMessage = By.className("error");
    
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }
    
    // Page methods
    public void enterUsername(String username) {
        driver.findElement(usernameField).sendKeys(username);
    }
    
    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }
    
    public HomePage clickLogin() {
        driver.findElement(loginButton).click();
        return new HomePage(driver);
    }
    
    public String getErrorMessage() {
        return driver.findElement(errorMessage).getText();
    }
    
    // Combined method for convenience
    public HomePage login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        return clickLogin();
    }
}

// LoginTest.java
public class LoginTest {
    WebDriver driver;
    LoginPage loginPage;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.get("https://example.com/login");
        loginPage = new LoginPage(driver);
    }
    
    @Test
    public void testValidLogin() {
        HomePage homePage = loginPage.login("user@test.com", "password123");
        Assert.assertEquals(homePage.getWelcomeMessage(), "Welcome User!");
    }
    
    @Test
    public void testInvalidLogin() {
        loginPage.login("invalid@test.com", "wrong");
        Assert.assertEquals(loginPage.getErrorMessage(), "Invalid credentials");
    }
    
    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}
```

**Benefits:**
- Clean, readable tests
- Centralized locators
- Easy maintenance
- Reusable methods

---

## 3. POM Architecture {#architecture}

### Component Hierarchy

```
┌─────────────────────────────────────┐
│         Test Classes                │
│  (LoginTest, HomeTest, etc.)        │
│  - Test logic                       │
│  - Assertions                       │
│  - Test data                        │
└──────────────┬──────────────────────┘
               │ uses
               ▼
┌─────────────────────────────────────┐
│         Page Classes                │
│  (LoginPage, HomePage, etc.)        │
│  - Web elements                     │
│  - Page methods                     │
│  - Return page objects              │
└──────────────┬──────────────────────┘
               │ extends (optional)
               ▼
┌─────────────────────────────────────┐
│         Base Page                   │
│  - Common methods                   │
│  - Wait utilities                   │
│  - WebDriver instance               │
└──────────────┬──────────────────────┘
               │ uses
               ▼
┌─────────────────────────────────────┐
│         WebDriver                   │
│  - Browser automation               │
└─────────────────────────────────────┘
```

### Page Class Structure

```java
public class PageName {
    // 1. WebDriver instance
    WebDriver driver;
    
    // 2. Locators (By objects or @FindBy)
    By element1 = By.id("element1");
    By element2 = By.xpath("//div[@class='element2']");
    
    // 3. Constructor
    public PageName(WebDriver driver) {
        this.driver = driver;
        // Optional: PageFactory.initElements(driver, this);
    }
    
    // 4. Page methods (actions)
    public void performAction() {
        driver.findElement(element1).click();
    }
    
    // 5. Methods return page objects
    public NextPage navigateToNextPage() {
        driver.findElement(element2).click();
        return new NextPage(driver);
    }
    
    // 6. Getter methods for verification
    public String getElementText() {
        return driver.findElement(element1).getText();
    }
}
```

---

## 4. Implementing POM Without PageFactory {#basic-pom}

### Complete Example: E-commerce Application

#### BasePage.java
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
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
    
    // Common wait methods
    protected WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }
    
    protected WebElement waitForClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }
    
    protected void waitForInvisibility(By locator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }
    
    // Common actions
    protected void click(By locator) {
        waitForClickable(locator).click();
    }
    
    protected void type(By locator, String text) {
        WebElement element = waitForElement(locator);
        element.clear();
        element.sendKeys(text);
    }
    
    protected String getText(By locator) {
        return waitForElement(locator).getText();
    }
    
    protected boolean isDisplayed(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}
```

#### LoginPage.java
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage extends BasePage {
    // Locators
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginButton = By.cssSelector("button[type='submit']");
    private By errorMessage = By.className("error-message");
    private By forgotPasswordLink = By.linkText("Forgot Password?");
    private By signupLink = By.linkText("Sign Up");
    
    // Constructor
    public LoginPage(WebDriver driver) {
        super(driver);
    }
    
    // Page methods
    public LoginPage enterEmail(String email) {
        type(emailField, email);
        return this;
    }
    
    public LoginPage enterPassword(String password) {
        type(passwordField, password);
        return this;
    }
    
    public HomePage clickLoginButton() {
        click(loginButton);
        return new HomePage(driver);
    }
    
    public String getErrorMessage() {
        return getText(errorMessage);
    }
    
    public boolean isErrorDisplayed() {
        return isDisplayed(errorMessage);
    }
    
    public ForgotPasswordPage clickForgotPassword() {
        click(forgotPasswordLink);
        return new ForgotPasswordPage(driver);
    }
    
    public SignupPage clickSignup() {
        click(signupLink);
        return new SignupPage(driver);
    }
    
    // Fluent interface - method chaining
    public HomePage login(String email, String password) {
        return enterEmail(email)
               .enterPassword(password)
               .clickLoginButton();
    }
}
```

#### HomePage.java
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class HomePage extends BasePage {
    // Locators
    private By welcomeMessage = By.className("welcome-user");
    private By searchBox = By.id("search");
    private By searchButton = By.cssSelector("button.search-btn");
    private By cartIcon = By.id("cart-icon");
    private By cartCount = By.className("cart-count");
    private By logoutButton = By.linkText("Logout");
    private By myAccountLink = By.linkText("My Account");
    
    // Constructor
    public HomePage(WebDriver driver) {
        super(driver);
    }
    
    // Verification methods
    public String getWelcomeMessage() {
        return getText(welcomeMessage);
    }
    
    public boolean isWelcomeMessageDisplayed() {
        return isDisplayed(welcomeMessage);
    }
    
    public int getCartCount() {
        String count = getText(cartCount);
        return Integer.parseInt(count);
    }
    
    // Action methods
    public SearchResultsPage search(String product) {
        type(searchBox, product);
        click(searchButton);
        return new SearchResultsPage(driver);
    }
    
    public CartPage openCart() {
        click(cartIcon);
        return new CartPage(driver);
    }
    
    public MyAccountPage openMyAccount() {
        click(myAccountLink);
        return new MyAccountPage(driver);
    }
    
    public LoginPage logout() {
        click(logoutButton);
        return new LoginPage(driver);
    }
}
```

#### ProductPage.java
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ProductPage extends BasePage {
    // Locators
    private By productTitle = By.className("product-title");
    private By productPrice = By.className("product-price");
    private By addToCartButton = By.id("add-to-cart");
    private By quantityInput = By.id("quantity");
    private By successMessage = By.className("success-msg");
    
    // Constructor
    public ProductPage(WebDriver driver) {
        super(driver);
    }
    
    // Getter methods
    public String getProductTitle() {
        return getText(productTitle);
    }
    
    public String getProductPrice() {
        return getText(productPrice);
    }
    
    public String getSuccessMessage() {
        return getText(successMessage);
    }
    
    // Action methods
    public ProductPage setQuantity(int quantity) {
        type(quantityInput, String.valueOf(quantity));
        return this;
    }
    
    public ProductPage addToCart() {
        click(addToCartButton);
        waitForElement(successMessage);
        return this;
    }
    
    public CartPage goToCart() {
        // Assuming there's a cart link after adding
        click(By.linkText("View Cart"));
        return new CartPage(driver);
    }
}
```

#### Test Class Example
```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.*;

public class LoginTest {
    WebDriver driver;
    LoginPage loginPage;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://example.com/login");
        loginPage = new LoginPage(driver);
    }
    
    @Test(priority = 1)
    public void testValidLogin() {
        HomePage homePage = loginPage.login("user@test.com", "password123");
        
        Assert.assertTrue(homePage.isWelcomeMessageDisplayed());
        Assert.assertTrue(homePage.getWelcomeMessage().contains("Welcome"));
    }
    
    @Test(priority = 2)
    public void testInvalidLogin() {
        loginPage.login("invalid@test.com", "wrongpass");
        
        Assert.assertTrue(loginPage.isErrorDisplayed());
        Assert.assertEquals(loginPage.getErrorMessage(), "Invalid credentials");
    }
    
    @Test(priority = 3)
    public void testEmptyCredentials() {
        loginPage.clickLoginButton();
        
        Assert.assertTrue(loginPage.isErrorDisplayed());
    }
    
    @Test(priority = 4)
    public void testForgotPassword() {
        ForgotPasswordPage forgotPage = loginPage.clickForgotPassword();
        // Add assertions for forgot password page
    }
    
    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
```

---

## 5. Implementing POM With PageFactory {#pagefactory}

### What is PageFactory?

PageFactory is a class in Selenium that supports the Page Object Model. It provides `@FindBy` annotation to initialize web elements.

### Benefits of PageFactory

1. **Lazy Initialization**: Elements are located when first accessed
2. **Cleaner Code**: No need to write `driver.findElement()` repeatedly
3. **@FindBy Annotation**: Declarative way to define locators
4. **Automatic Initialization**: `initElements()` initializes all elements

### LoginPage with PageFactory

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
    WebDriver driver;
    
    // Elements using @FindBy
    @FindBy(id = "email")
    private WebElement emailField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(css = "button[type='submit']")
    private WebElement loginButton;
    
    @FindBy(className = "error-message")
    private WebElement errorMessage;
    
    @FindBy(linkText = "Forgot Password?")
    private WebElement forgotPasswordLink;
    
    // Constructor with PageFactory initialization
    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    // Page methods
    public LoginPage enterEmail(String email) {
        emailField.clear();
        emailField.sendKeys(email);
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
    
    public String getErrorMessage() {
        return errorMessage.getText();
    }
    
    public boolean isErrorDisplayed() {
        try {
            return errorMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    public HomePage login(String email, String password) {
        return enterEmail(email)
               .enterPassword(password)
               .clickLogin();
    }
}
```

### @FindBy Locator Strategies

```java
// By ID
@FindBy(id = "username")
private WebElement usernameField;

// By Name
@FindBy(name = "email")
private WebElement emailField;

// By Class Name
@FindBy(className = "error-msg")
private WebElement errorMessage;

// By Tag Name
@FindBy(tagName = "h1")
private WebElement heading;

// By Link Text
@FindBy(linkText = "Sign Up")
private WebElement signupLink;

// By Partial Link Text
@FindBy(partialLinkText = "Sign")
private WebElement signupLink;

// By XPath
@FindBy(xpath = "//button[@type='submit']")
private WebElement submitButton;

// By CSS Selector
@FindBy(css = "button.btn-primary")
private WebElement primaryButton;
```

### Multiple Locators with @FindBys and @FindAll

```java
// @FindBys - AND condition (all conditions must match)
@FindBys({
    @FindBy(tagName = "button"),
    @FindBy(className = "submit-btn")
})
private WebElement submitButton;

// @FindAll - OR condition (any condition can match)
@FindAll({
    @FindBy(id = "submit"),
    @FindBy(name = "submit"),
    @FindBy(xpath = "//button[@type='submit']")
})
private WebElement submitButton;
```

### List of Elements

```java
@FindBy(className = "product-item")
private List<WebElement> productItems;

public int getProductCount() {
    return productItems.size();
}

public void clickProduct(int index) {
    productItems.get(index).click();
}
```

### Complete Example with PageFactory

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

public class SearchResultsPage {
    WebDriver driver;
    WebDriverWait wait;
    
    @FindBy(className = "search-results-count")
    private WebElement resultsCount;
    
    @FindBy(className = "product-card")
    private List<WebElement> productCards;
    
    @FindBy(css = ".product-card .product-title")
    private List<WebElement> productTitles;
    
    @FindBy(css = ".product-card .product-price")
    private List<WebElement> productPrices;
    
    @FindBy(id = "sort-dropdown")
    private WebElement sortDropdown;
    
    @FindBy(className = "no-results")
    private WebElement noResultsMessage;
    
    public SearchResultsPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }
    
    public int getResultsCount() {
        String text = resultsCount.getText();
        // Extract number from "Showing 25 results"
        return Integer.parseInt(text.replaceAll("[^0-9]", ""));
    }
    
    public int getDisplayedProductsCount() {
        return productCards.size();
    }
    
    public List<String> getAllProductTitles() {
        return productTitles.stream()
                           .map(WebElement::getText)
                           .collect(Collectors.toList());
    }
    
    public ProductPage clickProduct(int index) {
        wait.until(ExpectedConditions.elementToBeClickable(productCards.get(index)));
        productCards.get(index).click();
        return new ProductPage(driver);
    }
    
    public ProductPage clickProductByTitle(String title) {
        for (int i = 0; i < productTitles.size(); i++) {
            if (productTitles.get(i).getText().equals(title)) {
                productCards.get(i).click();
                return new ProductPage(driver);
            }
        }
        throw new RuntimeException("Product not found: " + title);
    }
    
    public boolean isNoResultsDisplayed() {
        try {
            return noResultsMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}
```

---

## 6. Best Practices {#best-practices}

### 1. One Page Class Per Page

```java
// Good
LoginPage.java
HomePage.java
ProductPage.java
CartPage.java

// Bad - Don't combine multiple pages
AllPages.java
```

### 2. Return Page Objects

```java
// Good - Returns next page object
public HomePage clickLogin() {
    loginButton.click();
    return new HomePage(driver);
}

// Good - Returns same page for chaining
public LoginPage enterEmail(String email) {
    emailField.sendKeys(email);
    return this;
}

// Bad - Returns void
public void clickLogin() {
    loginButton.click();
}
```

### 3. Keep Test Logic in Test Classes

```java
// Good - Page class
public class LoginPage {
    public HomePage login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        return clickLogin();
    }
}

// Good - Test class
@Test
public void testLogin() {
    HomePage homePage = loginPage.login("user@test.com", "pass123");
    Assert.assertTrue(homePage.isWelcomeDisplayed());
}

// Bad - Assertions in page class
public class LoginPage {
    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLogin();
        Assert.assertTrue(isWelcomeDisplayed()); // Wrong!
    }
}
```

### 4. Use Meaningful Method Names

```java
// Good
public HomePage clickLoginButton()
public String getErrorMessage()
public boolean isWelcomeDisplayed()

// Bad
public HomePage click()
public String get()
public boolean check()
```

### 5. Handle Waits in Page Classes

```java
// Good - Wait in page class
public class LoginPage extends BasePage {
    public HomePage clickLogin() {
        waitForClickable(loginButton).click();
        return new HomePage(driver);
    }
}

// Bad - Wait in test class
@Test
public void testLogin() {
    loginPage.enterEmail("user@test.com");
    Thread.sleep(2000); // Bad!
    loginPage.clickLogin();
}
```

### 6. Use BasePage for Common Methods

```java
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
    
    protected void type(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }
    
    protected String getText(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator)).getText();
    }
}
```

### 7. Encapsulate Locators

```java
// Good - Private locators
public class LoginPage {
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    
    public void enterEmail(String email) {
        driver.findElement(emailField).sendKeys(email);
    }
}

// Bad - Public locators
public class LoginPage {
    public By emailField = By.id("email");
    
    // Tests can access locators directly - breaks encapsulation
}
```

### 8. Handle Dynamic Elements

```java
// Dynamic locator method
public WebElement getProductByName(String productName) {
    String xpath = String.format("//div[@class='product' and contains(text(),'%s')]", productName);
    return driver.findElement(By.xpath(xpath));
}

// Usage
public ProductPage selectProduct(String productName) {
    getProductByName(productName).click();
    return new ProductPage(driver);
}
```

---

## 7. Practice Exercises {#exercises}

### Exercise 1: Basic Login Page (Easy)

Create a LoginPage class for a simple login form with:
- Email field (id="email")
- Password field (id="password")
- Login button (id="login-btn")
- Error message (class="error")

**Requirements:**
1. Create LoginPage class without PageFactory
2. Implement methods: enterEmail(), enterPassword(), clickLogin()
3. Implement login() method that combines all actions
4. Create a test class with valid and invalid login tests

**Solution:**
```java
// LoginPage.java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {
    WebDriver driver;
    
    // Locators
    private By emailField = By.id("email");
    private By passwordField = By.id("password");
    private By loginButton = By.id("login-btn");
    private By errorMessage = By.className("error");
    
    // Constructor
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }
    
    // Methods
    public LoginPage enterEmail(String email) {
        driver.findElement(emailField).clear();
        driver.findElement(emailField).sendKeys(email);
        return this;
    }
    
    public LoginPage enterPassword(String password) {
        driver.findElement(passwordField).clear();
        driver.findElement(passwordField).sendKeys(password);
        return this;
    }
    
    public void clickLogin() {
        driver.findElement(loginButton).click();
    }
    
    public String getErrorMessage() {
        return driver.findElement(errorMessage).getText();
    }
    
    public boolean isErrorDisplayed() {
        try {
            return driver.findElement(errorMessage).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    // Combined method
    public void login(String email, String password) {
        enterEmail(email)
            .enterPassword(password)
            .clickLogin();
    }
}

// LoginTest.java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.LoginPage;

public class LoginTest {
    WebDriver driver;
    LoginPage loginPage;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.get("https://example.com/login");
        loginPage = new LoginPage(driver);
    }
    
    @Test
    public void testValidLogin() {
        loginPage.login("user@test.com", "password123");
        // Add assertions for successful login
        Assert.assertFalse(loginPage.isErrorDisplayed());
    }
    
    @Test
    public void testInvalidLogin() {
        loginPage.login("invalid@test.com", "wrongpass");
        Assert.assertTrue(loginPage.isErrorDisplayed());
        Assert.assertEquals(loginPage.getErrorMessage(), "Invalid credentials");
    }
    
    @Test
    public void testEmptyEmail() {
        loginPage.login("", "password123");
        Assert.assertTrue(loginPage.isErrorDisplayed());
    }
    
    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}
```

### Exercise 2: Registration Page with PageFactory (Medium)

Create a RegistrationPage using PageFactory with:
- First name (id="firstName")
- Last name (id="lastName")
- Email (id="email")
- Password (id="password")
- Confirm password (id="confirmPassword")
- Terms checkbox (id="terms")
- Register button (id="register")
- Success message (class="success")

**Requirements:**
1. Use @FindBy annotations
2. Implement validation methods
3. Create method chaining
4. Write comprehensive tests

**Solution:**
```java
// RegistrationPage.java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class RegistrationPage {
    WebDriver driver;
    
    @FindBy(id = "firstName")
    private WebElement firstNameField;
    
    @FindBy(id = "lastName")
    private WebElement lastNameField;
    
    @FindBy(id = "email")
    private WebElement emailField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(id = "confirmPassword")
    private WebElement confirmPasswordField;
    
    @FindBy(id = "terms")
    private WebElement termsCheckbox;
    
    @FindBy(id = "register")
    private WebElement registerButton;
    
    @FindBy(className = "success")
    private WebElement successMessage;
    
    @FindBy(className = "error")
    private WebElement errorMessage;
    
    public RegistrationPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }
    
    public 
RegistrationPage enterFirstName(String firstName) {
        firstNameField.clear();
        firstNameField.sendKeys(firstName);
        return this;
    }
    
    public RegistrationPage enterLastName(String lastName) {
        lastNameField.clear();
        lastNameField.sendKeys(lastName);
        return this;
    }
    
    public RegistrationPage enterEmail(String email) {
        emailField.clear();
        emailField.sendKeys(email);
        return this;
    }
    
    public RegistrationPage enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
        return this;
    }
    
    public RegistrationPage enterConfirmPassword(String confirmPassword) {
        confirmPasswordField.clear();
        confirmPasswordField.sendKeys(confirmPassword);
        return this;
    }
    
    public RegistrationPage acceptTerms() {
        if (!termsCheckbox.isSelected()) {
            termsCheckbox.click();
        }
        return this;
    }
    
    public void clickRegister() {
        registerButton.click();
    }
    
    public String getSuccessMessage() {
        return successMessage.getText();
    }
    
    public String getErrorMessage() {
        return errorMessage.getText();
    }
    
    public boolean isSuccessDisplayed() {
        try {
            return successMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    // Complete registration method
    public void register(String firstName, String lastName, String email, 
                        String password, String confirmPassword) {
        enterFirstName(firstName)
            .enterLastName(lastName)
            .enterEmail(email)
            .enterPassword(password)
            .enterConfirmPassword(confirmPassword)
            .acceptTerms()
            .clickRegister();
    }
}

// RegistrationTest.java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.RegistrationPage;

public class RegistrationTest {
    WebDriver driver;
    RegistrationPage registrationPage;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.get("https://example.com/register");
        registrationPage = new RegistrationPage(driver);
    }
    
    @Test
    public void testSuccessfulRegistration() {
        registrationPage.register("John", "Doe", "john@test.com", 
                                  "Pass123!", "Pass123!");
        Assert.assertTrue(registrationPage.isSuccessDisplayed());
        Assert.assertEquals(registrationPage.getSuccessMessage(), 
                          "Registration successful!");
    }
    
    @Test
    public void testPasswordMismatch() {
        registrationPage.register("John", "Doe", "john@test.com", 
                                  "Pass123!", "DifferentPass");
        Assert.assertEquals(registrationPage.getErrorMessage(), 
                          "Passwords do not match");
    }
    
    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}
```

### Exercise 3: E-commerce Product Search (Hard)

Create a complete POM implementation for an e-commerce site with:
- HomePage with search functionality
- SearchResultsPage with product list
- ProductPage with add to cart
- CartPage with checkout

**Requirements:**
1. Implement BasePage with common utilities
2. Use PageFactory
3. Implement method chaining
4. Handle dynamic elements
5. Write end-to-end test

**Solution:**
```java
// BasePage.java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
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
    
    protected WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }
    
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }
    
    protected void type(By locator, String text) {
        WebElement element = waitForElement(locator);
        element.clear();
        element.sendKeys(text);
    }
    
    protected String getText(By locator) {
        return waitForElement(locator).getText();
    }
}

// HomePage.java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage extends BasePage {
    @FindBy(id = "search-box")
    private WebElement searchBox;
    
    @FindBy(id = "search-btn")
    private WebElement searchButton;
    
    @FindBy(className = "cart-icon")
    private WebElement cartIcon;
    
    public HomePage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    public SearchResultsPage searchProduct(String productName) {
        searchBox.clear();
        searchBox.sendKeys(productName);
        searchButton.click();
        return new SearchResultsPage(driver);
    }
    
    public CartPage openCart() {
        cartIcon.click();
        return new CartPage(driver);
    }
}

// SearchResultsPage.java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import java.util.List;

public class SearchResultsPage extends BasePage {
    @FindBy(className = "product-card")
    private List<WebElement> productCards;
    
    @FindBy(css = ".product-card .product-title")
    private List<WebElement> productTitles;
    
    public SearchResultsPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    public int getProductCount() {
        return productCards.size();
    }
    
    public ProductPage selectProduct(int index) {
        productCards.get(index).click();
        return new ProductPage(driver);
    }
    
    public ProductPage selectProductByName(String name) {
        for (int i = 0; i < productTitles.size(); i++) {
            if (productTitles.get(i).getText().equals(name)) {
                productCards.get(i).click();
                return new ProductPage(driver);
            }
        }
        throw new RuntimeException("Product not found: " + name);
    }
}

// ProductPage.java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ProductPage extends BasePage {
    @FindBy(className = "product-title")
    private WebElement productTitle;
    
    @FindBy(className = "product-price")
    private WebElement productPrice;
    
    @FindBy(id = "add-to-cart")
    private WebElement addToCartButton;
    
    @FindBy(className = "success-message")
    private WebElement successMessage;
    
    public ProductPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    public String getProductTitle() {
        return productTitle.getText();
    }
    
    public String getProductPrice() {
        return productPrice.getText();
    }
    
    public ProductPage addToCart() {
        addToCartButton.click();
        wait.until(ExpectedConditions.visibilityOf(successMessage));
        return this;
    }
    
    public CartPage goToCart() {
        // Click on cart link after adding
        driver.findElement(By.linkText("View Cart")).click();
        return new CartPage(driver);
    }
}

// CartPage.java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import java.util.List;

public class CartPage extends BasePage {
    @FindBy(className = "cart-item")
    private List<WebElement> cartItems;
    
    @FindBy(className = "cart-total")
    private WebElement cartTotal;
    
    @FindBy(id = "checkout-btn")
    private WebElement checkoutButton;
    
    public CartPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    public int getCartItemCount() {
        return cartItems.size();
    }
    
    public String getCartTotal() {
        return cartTotal.getText();
    }
    
    public CheckoutPage proceedToCheckout() {
        checkoutButton.click();
        return new CheckoutPage(driver);
    }
}

// E2ETest.java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.*;

public class E2ETest {
    WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://example.com");
    }
    
    @Test
    public void testCompleteShoppingFlow() {
        // Search for product
        HomePage homePage = new HomePage(driver);
        SearchResultsPage searchPage = homePage.searchProduct("laptop");
        
        Assert.assertTrue(searchPage.getProductCount() > 0);
        
        // Select product
        ProductPage productPage = searchPage.selectProduct(0);
        String productName = productPage.getProductTitle();
        
        // Add to cart
        productPage.addToCart();
        CartPage cartPage = productPage.goToCart();
        
        Assert.assertEquals(cartPage.getCartItemCount(), 1);
        
        // Proceed to checkout
        CheckoutPage checkoutPage = cartPage.proceedToCheckout();
        // Add checkout assertions
    }
    
    @AfterMethod
    public void teardown() {
        driver.quit();
    }
}
```

### Exercise 4: Dynamic Elements Handling (Advanced)

Create page classes that handle dynamic elements like tables, dropdowns, and modals.

**Solution:**
```java
// TablePage.java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import java.util.List;

public class TablePage extends BasePage {
    @FindBy(id = "data-table")
    private WebElement table;
    
    @FindBy(css = "#data-table tbody tr")
    private List<WebElement> tableRows;
    
    public TablePage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    public int getRowCount() {
        return tableRows.size();
    }
    
    public String getCellValue(int row, int column) {
        String xpath = String.format("//table[@id='data-table']//tr[%d]/td[%d]", 
                                    row + 1, column + 1);
        return driver.findElement(By.xpath(xpath)).getText();
    }
    
    public void clickRowByValue(String columnName, String value) {
        for (WebElement row : tableRows) {
            List<WebElement> cells = row.findElements(By.tagName("td"));
            for (WebElement cell : cells) {
                if (cell.getText().equals(value)) {
                    row.click();
                    return;
                }
            }
        }
    }
    
    public List<String> getColumnValues(int columnIndex) {
        String xpath = String.format("//table[@id='data-table']//tr/td[%d]", 
                                    columnIndex + 1);
        List<WebElement> cells = driver.findElements(By.xpath(xpath));
        return cells.stream()
                   .map(WebElement::getText)
                   .collect(Collectors.toList());
    }
}

// ModalPage.java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class ModalPage extends BasePage {
    @FindBy(id = "open-modal-btn")
    private WebElement openModalButton;
    
    @FindBy(className = "modal")
    private WebElement modal;
    
    @FindBy(className = "modal-title")
    private WebElement modalTitle;
    
    @FindBy(className = "modal-close")
    private WebElement closeButton;
    
    @FindBy(id = "modal-confirm")
    private WebElement confirmButton;
    
    public ModalPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }
    
    public ModalPage openModal() {
        openModalButton.click();
        wait.until(ExpectedConditions.visibilityOf(modal));
        return this;
    }
    
    public String getModalTitle() {
        return modalTitle.getText();
    }
    
    public ModalPage closeModal() {
        closeButton.click();
        wait.until(ExpectedConditions.invisibilityOf(modal));
        return this;
    }
    
    public ModalPage confirmModal() {
        confirmButton.click();
        wait.until(ExpectedConditions.invisibilityOf(modal));
        return this;
    }
    
    public boolean isModalDisplayed() {
        try {
            return modal.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}
```

### Exercise 5: Complete POM Project Structure (Expert)

Create a complete project structure with all components:

```
selenium-pom-project/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/
│   │       │   ├── BasePage.java
│   │       │   ├── LoginPage.java
│   │       │   ├── HomePage.java
│   │       │   ├── ProductPage.java
│   │       │   └── CartPage.java
│   │       └── utils/
│   │           ├── DriverManager.java
│   │           ├── ConfigReader.java
│   │           └── TestDataProvider.java
│   └── test/
│       └── java/
│           ├── tests/
│           │   ├── BaseTest.java
│           │   ├── LoginTest.java
│           │   └── E2ETest.java
│           └── listeners/
│               └── TestListener.java
├── src/test/resources/
│   ├── config.properties
│   └── testdata.xlsx
└── pom.xml
```

**Key Files:**

```java
// DriverManager.java
package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class DriverManager {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    public static WebDriver getDriver() {
        if (driver.get() == null) {
            String browser = ConfigReader.getProperty("browser");
            switch (browser.toLowerCase()) {
                case "chrome":
                    driver.set(new ChromeDriver());
                    break;
                case "firefox":
                    driver.set(new FirefoxDriver());
                    break;
                default:
                    driver.set(new ChromeDriver());
            }
            driver.get().manage().window().maximize();
        }
        return driver.get();
    }
    
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}

// BaseTest.java
package tests;

import org.testng.annotations.*;
import utils.DriverManager;
import org.openqa.selenium.WebDriver;

public class BaseTest {
    protected WebDriver driver;
    
    @BeforeMethod
    public void setup() {
        driver = DriverManager.getDriver();
        driver.get(ConfigReader.getProperty("url"));
    }
    
    @AfterMethod
    public void teardown() {
        DriverManager.quitDriver();
    }
}
```

---

## Summary

### Key Takeaways

1. **POM Benefits**:
   - Better code organization
   - Improved maintainability
   - Enhanced reusability
   - Cleaner test code

2. **Implementation Approaches**:
   - Without PageFactory (manual element location)
   - With PageFactory (@FindBy annotations)

3. **Best Practices**:
   - One page class per page
   - Return page objects for chaining
   - Keep assertions in test classes
   - Use BasePage for common methods
   - Encapsulate locators

4. **Advanced Concepts**:
   - Dynamic element handling
   - Method chaining (fluent interface)
   - Wait strategies in page classes
   - Handling complex UI components

### Next Steps

- Practice creating page classes for real applications
- Implement complete test suites using POM
- Learn about Page Factory advanced features
- Explore POM with TestNG/JUnit frameworks
- Study design patterns that complement POM

---

## Additional Resources

- Selenium Documentation: https://www.selenium.dev/documentation/
- Page Object Model Guide: https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/
- TestNG Documentation: https://testng.org/doc/
- Design Patterns in Test Automation

---

**Practice regularly and build real-world projects to master Page Object Model!**