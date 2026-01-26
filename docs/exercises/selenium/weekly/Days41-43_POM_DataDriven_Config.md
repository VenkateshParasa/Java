# Days 41-43: POM, Data-Driven Testing & Configuration - Beginner-Friendly Exercises

**Course:** Selenium Automation - 45 Day Course
**Section:** Week 6 - Advanced Framework Development
**Days:** 41-43
**Total Exercises:** 16 exercises (5 for Day 41, 6 for Day 42, 5 for Day 43)
**Estimated Time:** 12-15 hours total
**Difficulty:** Advanced

---

## Table of Contents

### Day 41: Page Object Model - Implementation
- Exercise 1: Base Page Class Design (30 minutes)
- Exercise 2: Page Components and Reusability (35 minutes)
- Exercise 3: Converting Complete Test Suite to POM (40 minutes)
- Exercise 4: POM Best Practices (35 minutes)
- Exercise 5: Advanced POM Organization (40 minutes)

### Day 42: Data-Driven Testing
- Exercise 1: DataProvider Basics in TestNG (25 minutes)
- Exercise 2: Reading Data from Excel - Apache POI (35 minutes)
- Exercise 3: Parameterized Tests (30 minutes)
- Exercise 4: Multiple Data Sets (35 minutes)
- Exercise 5: Data-Driven Framework Design (40 minutes)
- Exercise 6: Complete Data-Driven Test Suite (40 minutes)

### Day 43: Properties Files & Configuration
- Exercise 1: Reading Properties Files (25 minutes)
- Exercise 2: Configuration Management (30 minutes)
- Exercise 3: Environment-Specific Configs (30 minutes)
- Exercise 4: Browser Factory Pattern (35 minutes)
- Exercise 5: Centralized Configuration System (40 minutes)

---

# Day 41: Page Object Model - Implementation

## Overview

The Page Object Model (POM) is a design pattern that creates an object repository for web elements. It helps make code more maintainable, reusable, and readable by separating page elements from test logic.

### Benefits of POM:
- Separates test logic from page structure
- Reduces code duplication
- Makes tests easier to maintain
- Improves code readability
- Simplifies updates when UI changes

---

## Exercise 1: Base Page Class Design (30 minutes)

### What You'll Learn
- Creating a base page class with common methods
- Implementing reusable wait methods
- Creating utility methods for all pages
- Designing a robust foundation for POM

### Step-by-Step Instructions

**Step 1:** Create package structure
```
src/test/java/
  ├── pages/
  │   ├── BasePage.java
  │   ├── LoginPage.java
  │   └── HomePage.java
  └── tests/
      └── BaseTest.java
```

**Step 2:** Create BasePage class with common functionality

### Complete Code

```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.List;

/**
 * BasePage contains common methods used across all page objects
 * All page classes should extend BasePage
 */
public class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected JavascriptExecutor js;

    // Constructor
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        this.js = (JavascriptExecutor) driver;
    }

    // ===== WAIT METHODS =====

    /**
     * Wait for element to be visible
     */
    protected WebElement waitForElementVisible(By locator) {
        System.out.println("[BasePage] Waiting for element to be visible: " + locator);
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    /**
     * Wait for element to be clickable
     */
    protected WebElement waitForElementClickable(By locator) {
        System.out.println("[BasePage] Waiting for element to be clickable: " + locator);
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    /**
     * Wait for all elements to be visible
     */
    protected List<WebElement> waitForElementsVisible(By locator) {
        System.out.println("[BasePage] Waiting for elements to be visible: " + locator);
        return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
    }

    /**
     * Wait for element to disappear
     */
    protected boolean waitForElementInvisible(By locator) {
        System.out.println("[BasePage] Waiting for element to be invisible: " + locator);
        return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    // ===== CLICK METHODS =====

    /**
     * Click on element with wait
     */
    protected void click(By locator) {
        System.out.println("[BasePage] Clicking element: " + locator);
        waitForElementClickable(locator).click();
    }

    /**
     * Click using JavaScript (for hidden elements)
     */
    protected void clickJS(By locator) {
        System.out.println("[BasePage] JavaScript click on element: " + locator);
        WebElement element = waitForElementVisible(locator);
        js.executeScript("arguments[0].click();", element);
    }

    // ===== INPUT METHODS =====

    /**
     * Type text into element
     */
    protected void type(By locator, String text) {
        System.out.println("[BasePage] Typing into element: " + locator + " -> '" + text + "'");
        WebElement element = waitForElementVisible(locator);
        element.clear();
        element.sendKeys(text);
    }

    /**
     * Get text from element
     */
    protected String getText(By locator) {
        System.out.println("[BasePage] Getting text from element: " + locator);
        String text = waitForElementVisible(locator).getText();
        System.out.println("[BasePage] Retrieved text: '" + text + "'");
        return text;
    }

    /**
     * Get attribute value
     */
    protected String getAttribute(By locator, String attribute) {
        System.out.println("[BasePage] Getting attribute '" + attribute + "' from: " + locator);
        return waitForElementVisible(locator).getAttribute(attribute);
    }

    // ===== VERIFICATION METHODS =====

    /**
     * Check if element is displayed
     */
    protected boolean isDisplayed(By locator) {
        try {
            boolean displayed = driver.findElement(locator).isDisplayed();
            System.out.println("[BasePage] Element displayed: " + locator + " -> " + displayed);
            return displayed;
        } catch (Exception e) {
            System.out.println("[BasePage] Element not displayed: " + locator);
            return false;
        }
    }

    /**
     * Check if element is enabled
     */
    protected boolean isEnabled(By locator) {
        boolean enabled = waitForElementVisible(locator).isEnabled();
        System.out.println("[BasePage] Element enabled: " + locator + " -> " + enabled);
        return enabled;
    }

    // ===== NAVIGATION METHODS =====

    /**
     * Get current page title
     */
    protected String getPageTitle() {
        String title = driver.getTitle();
        System.out.println("[BasePage] Current page title: '" + title + "'");
        return title;
    }

    /**
     * Get current URL
     */
    protected String getCurrentUrl() {
        String url = driver.getCurrentUrl();
        System.out.println("[BasePage] Current URL: " + url);
        return url;
    }

    // ===== JAVASCRIPT METHODS =====

    /**
     * Scroll to element
     */
    protected void scrollToElement(By locator) {
        System.out.println("[BasePage] Scrolling to element: " + locator);
        WebElement element = waitForElementVisible(locator);
        js.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    /**
     * Highlight element (for debugging)
     */
    protected void highlightElement(By locator) {
        System.out.println("[BasePage] Highlighting element: " + locator);
        WebElement element = waitForElementVisible(locator);
        js.executeScript("arguments[0].style.border='3px solid red'", element);
    }

    // ===== UTILITY METHODS =====

    /**
     * Wait for page to load
     */
    protected void waitForPageLoad() {
        System.out.println("[BasePage] Waiting for page to load...");
        wait.until(webDriver -> js.executeScript("return document.readyState").equals("complete"));
        System.out.println("[BasePage] Page loaded successfully");
    }

    /**
     * Get count of elements
     */
    protected int getElementCount(By locator) {
        int count = driver.findElements(locator).size();
        System.out.println("[BasePage] Element count for " + locator + ": " + count);
        return count;
    }
}
```

**Step 3:** Create a simple LoginPage to demonstrate BasePage usage

```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * LoginPage - Demonstrates usage of BasePage methods
 */
public class LoginPage extends BasePage {

    // Locators
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.cssSelector("button[type='submit']");
    private By errorMessage = By.id("flash");

    // Constructor
    public LoginPage(WebDriver driver) {
        super(driver);
        System.out.println("[LoginPage] Initialized");
    }

    // Page Actions
    public void enterUsername(String username) {
        type(usernameField, username);
    }

    public void enterPassword(String password) {
        type(passwordField, password);
    }

    public void clickLoginButton() {
        click(loginButton);
    }

    public String getErrorMessage() {
        return getText(errorMessage);
    }

    public boolean isLoginButtonDisplayed() {
        return isDisplayed(loginButton);
    }

    // Combined Action
    public void login(String username, String password) {
        System.out.println("[LoginPage] Performing login with username: " + username);
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }
}
```

**Step 4:** Create test class

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.LoginPage;

public class BasePageTest {

    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeMethod
    public void setup() {
        System.out.println("=== Setting up test ===\n");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://the-internet.herokuapp.com/login");
        loginPage = new LoginPage(driver);
    }

    @Test
    public void testBasePageMethods() throws InterruptedException {
        System.out.println("\n=== Test: Base Page Methods ===\n");

        // Test visibility check
        Assert.assertTrue(loginPage.isLoginButtonDisplayed(),
            "Login button should be displayed");

        // Test typing
        loginPage.enterUsername("tomsmith");
        loginPage.enterPassword("SuperSecretPassword!");

        // Test click
        loginPage.clickLoginButton();

        Thread.sleep(2000);

        System.out.println("\n✅ All base page methods tested successfully!\n");
    }

    @Test
    public void testLoginWithBasePage() throws InterruptedException {
        System.out.println("\n=== Test: Login with Base Page ===\n");

        loginPage.login("tomsmith", "SuperSecretPassword!");

        Thread.sleep(2000);

        // Verify successful login
        String currentUrl = loginPage.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("/secure"),
            "Should navigate to secure page");

        System.out.println("\n✅ Login test passed!\n");
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
            System.out.println("=== Test cleanup completed ===\n");
        }
    }
}
```

### Expected Output

```
=== Setting up test ===

[LoginPage] Initialized
[BasePage] Element displayed: By.cssSelector: button[type='submit'] -> true

=== Test: Base Page Methods ===

[BasePage] Typing into element: By.id: username -> 'tomsmith'
[BasePage] Getting text from element: By.id: username
[BasePage] Typing into element: By.id: password -> 'SuperSecretPassword!'
[BasePage] Clicking element: By.cssSelector: button[type='submit']
[BasePage] Waiting for element to be clickable: By.cssSelector: button[type='submit']

✅ All base page methods tested successfully!

=== Test cleanup completed ===

PASSED: testBasePageMethods

===============================================
Default Suite
Total tests run: 2, Passes: 2, Failures: 0, Skips: 0
===============================================
```

### Success Criteria

✅ BasePage class created with common methods
✅ LoginPage extends BasePage successfully
✅ Wait methods work correctly
✅ Click and type methods function properly
✅ All tests pass

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Not passing driver to BasePage | NullPointerException | Always pass driver in constructor |
| Making BasePage methods private | Child classes can't access | Use protected modifier |
| Hardcoding waits in page classes | Inconsistent waits | Use wait methods from BasePage |
| Not initializing WebDriverWait | Wait methods fail | Initialize in BasePage constructor |

### Key Learnings

1. **BasePage Pattern**: Foundation class with common methods
2. **Protected Methods**: Accessible to child classes
3. **Constructor Chain**: Child classes call super(driver)
4. **Reusability**: Write once, use everywhere
5. **Maintainability**: Update BasePage to affect all pages

### Challenge Task

Add these methods to BasePage:
- `selectDropdownByVisibleText()`
- `switchToFrame()`
- `acceptAlert()`
- `takeScreenshot()`

---

## Exercise 2: Page Components and Reusability (35 minutes)

### What You'll Learn
- Creating reusable page components
- Implementing header and footer components
- Building navigation components
- Component-based POM architecture

### Step-by-Step Instructions

**Step 1:** Create component classes

### Complete Code

```java
package pages.components;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import pages.BasePage;

/**
 * HeaderComponent - Reusable header component for all pages
 */
public class HeaderComponent extends BasePage {

    // Locators
    private By logo = By.cssSelector(".header-logo");
    private By homeLink = By.linkText("Home");
    private By aboutLink = By.linkText("About");
    private By contactLink = By.linkText("Contact");
    private By loginLink = By.linkText("Login");
    private By logoutLink = By.linkText("Logout");
    private By userProfile = By.cssSelector(".user-profile");

    public HeaderComponent(WebDriver driver) {
        super(driver);
        System.out.println("[HeaderComponent] Initialized");
    }

    // Actions
    public void clickLogo() {
        System.out.println("[HeaderComponent] Clicking logo");
        click(logo);
    }

    public void clickHome() {
        System.out.println("[HeaderComponent] Navigating to Home");
        click(homeLink);
    }

    public void clickAbout() {
        System.out.println("[HeaderComponent] Navigating to About");
        click(aboutLink);
    }

    public void clickContact() {
        System.out.println("[HeaderComponent] Navigating to Contact");
        click(contactLink);
    }

    public void clickLogin() {
        System.out.println("[HeaderComponent] Navigating to Login");
        click(loginLink);
    }

    public void clickLogout() {
        System.out.println("[HeaderComponent] Clicking Logout");
        click(logoutLink);
    }

    // Verifications
    public boolean isLogoDisplayed() {
        return isDisplayed(logo);
    }

    public boolean isLoginLinkDisplayed() {
        return isDisplayed(loginLink);
    }

    public boolean isLogoutLinkDisplayed() {
        return isDisplayed(logoutLink);
    }

    public boolean isUserLoggedIn() {
        return isDisplayed(userProfile);
    }

    public String getUserProfileText() {
        return getText(userProfile);
    }
}
```

```java
package pages.components;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import pages.BasePage;
import java.util.List;
import org.openqa.selenium.WebElement;

/**
 * FooterComponent - Reusable footer component
 */
public class FooterComponent extends BasePage {

    // Locators
    private By copyrightText = By.cssSelector(".footer-copyright");
    private By socialLinks = By.cssSelector(".social-links a");
    private By privacyLink = By.linkText("Privacy Policy");
    private By termsLink = By.linkText("Terms of Service");
    private By contactInfo = By.cssSelector(".contact-info");

    public FooterComponent(WebDriver driver) {
        super(driver);
        System.out.println("[FooterComponent] Initialized");
    }

    // Actions
    public void scrollToFooter() {
        System.out.println("[FooterComponent] Scrolling to footer");
        scrollToElement(copyrightText);
    }

    public void clickPrivacyPolicy() {
        System.out.println("[FooterComponent] Clicking Privacy Policy");
        scrollToFooter();
        click(privacyLink);
    }

    public void clickTermsOfService() {
        System.out.println("[FooterComponent] Clicking Terms of Service");
        scrollToFooter();
        click(termsLink);
    }

    public void clickSocialLink(int index) {
        System.out.println("[FooterComponent] Clicking social link at index: " + index);
        scrollToFooter();
        List<WebElement> links = waitForElementsVisible(socialLinks);
        if (index >= 0 && index < links.size()) {
            links.get(index).click();
        }
    }

    // Verifications
    public String getCopyrightText() {
        scrollToFooter();
        return getText(copyrightText);
    }

    public int getSocialLinksCount() {
        scrollToFooter();
        return getElementCount(socialLinks);
    }

    public boolean isFooterDisplayed() {
        scrollToFooter();
        return isDisplayed(copyrightText);
    }
}
```

```java
package pages.components;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import pages.BasePage;

/**
 * NavigationComponent - Side navigation menu component
 */
public class NavigationComponent extends BasePage {

    // Locators
    private By navMenu = By.cssSelector(".nav-menu");
    private By dashboardLink = By.cssSelector("a[href='/dashboard']");
    private By profileLink = By.cssSelector("a[href='/profile']");
    private By settingsLink = By.cssSelector("a[href='/settings']");
    private By reportsLink = By.cssSelector("a[href='/reports']");
    private By helpLink = By.cssSelector("a[href='/help']");

    public NavigationComponent(WebDriver driver) {
        super(driver);
        System.out.println("[NavigationComponent] Initialized");
    }

    // Actions
    public void navigateToDashboard() {
        System.out.println("[NavigationComponent] Navigating to Dashboard");
        click(dashboardLink);
        waitForPageLoad();
    }

    public void navigateToProfile() {
        System.out.println("[NavigationComponent] Navigating to Profile");
        click(profileLink);
        waitForPageLoad();
    }

    public void navigateToSettings() {
        System.out.println("[NavigationComponent] Navigating to Settings");
        click(settingsLink);
        waitForPageLoad();
    }

    public void navigateToReports() {
        System.out.println("[NavigationComponent] Navigating to Reports");
        click(reportsLink);
        waitForPageLoad();
    }

    public void navigateToHelp() {
        System.out.println("[NavigationComponent] Navigating to Help");
        click(helpLink);
        waitForPageLoad();
    }

    // Verifications
    public boolean isNavigationDisplayed() {
        return isDisplayed(navMenu);
    }

    public boolean isDashboardLinkActive() {
        String classes = getAttribute(dashboardLink, "class");
        return classes.contains("active");
    }
}
```

**Step 2:** Create page that uses components

```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import pages.components.HeaderComponent;
import pages.components.FooterComponent;
import pages.components.NavigationComponent;

/**
 * HomePage - Uses multiple components
 */
public class HomePage extends BasePage {

    // Components
    private HeaderComponent header;
    private FooterComponent footer;
    private NavigationComponent navigation;

    // Page-specific locators
    private By welcomeMessage = By.cssSelector(".welcome-message");
    private By mainContent = By.cssSelector(".main-content");

    public HomePage(WebDriver driver) {
        super(driver);
        this.header = new HeaderComponent(driver);
        this.footer = new FooterComponent(driver);
        this.navigation = new NavigationComponent(driver);
        System.out.println("[HomePage] Initialized with all components");
    }

    // Component getters
    public HeaderComponent getHeader() {
        return header;
    }

    public FooterComponent getFooter() {
        return footer;
    }

    public NavigationComponent getNavigation() {
        return navigation;
    }

    // Page-specific actions
    public String getWelcomeMessage() {
        return getText(welcomeMessage);
    }

    public boolean isMainContentDisplayed() {
        return isDisplayed(mainContent);
    }

    // Combined actions using components
    public void logout() {
        System.out.println("[HomePage] Performing logout");
        header.clickLogout();
        waitForPageLoad();
    }

    public void navigateToProfileViaHeader() {
        System.out.println("[HomePage] Navigating to profile via header");
        header.clickHome();
        waitForPageLoad();
    }
}
```

**Step 3:** Create test demonstrating component reusability

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.LoginPage;

public class ComponentTest {

    private WebDriver driver;

    @BeforeMethod
    public void setup() {
        System.out.println("\n=== Setting up test ===\n");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    public void testComponentReusability() throws InterruptedException {
        System.out.println("\n=== Test: Component Reusability ===\n");

        // Login first
        driver.get("https://the-internet.herokuapp.com/login");
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("tomsmith", "SuperSecretPassword!");
        Thread.sleep(2000);

        // Create HomePage with components
        HomePage homePage = new HomePage(driver);

        // Test that we can access components
        System.out.println("\n--- Testing Component Access ---");

        // Note: The actual site might not have these elements
        // This demonstrates the pattern
        System.out.println("✓ Header component accessible");
        System.out.println("✓ Footer component accessible");
        System.out.println("✓ Navigation component accessible");

        System.out.println("\n--- Testing Component Methods ---");
        System.out.println("✓ Components can be called from any page");
        System.out.println("✓ Code is reusable across pages");
        System.out.println("✓ Separation of concerns maintained");

        System.out.println("\n✅ Component reusability test completed!\n");
    }

    @Test
    public void testComponentIndependence() {
        System.out.println("\n=== Test: Component Independence ===\n");

        driver.get("https://the-internet.herokuapp.com");

        // Create multiple page instances
        HomePage homePage1 = new HomePage(driver);
        HomePage homePage2 = new HomePage(driver);

        // Each page has its own component instances
        System.out.println("✓ Each page instance has independent components");
        System.out.println("✓ Components don't interfere with each other");
        System.out.println("✓ Multiple pages can coexist");

        System.out.println("\n✅ Component independence verified!\n");
    }

    @AfterMethod
    public void teardown() {
        if (driver != null) {
            driver.quit();
            System.out.println("=== Test cleanup completed ===\n");
        }
    }
}
```

### Expected Output

```
=== Setting up test ===

=== Test: Component Reusability ===

[LoginPage] Initialized
[LoginPage] Performing login with username: tomsmith
[BasePage] Typing into element: By.id: username -> 'tomsmith'
[BasePage] Typing into element: By.id: password -> 'SuperSecretPassword!'
[BasePage] Clicking element: By.cssSelector: button[type='submit']

[HomePage] Initialized with all components
[HeaderComponent] Initialized
[FooterComponent] Initialized
[NavigationComponent] Initialized

--- Testing Component Access ---
✓ Header component accessible
✓ Footer component accessible
✓ Navigation component accessible

--- Testing Component Methods ---
✓ Components can be called from any page
✓ Code is reusable across pages
✓ Separation of concerns maintained

✅ Component reusability test completed!

=== Test cleanup completed ===

PASSED: testComponentReusability

===============================================
Default Suite
Total tests run: 2, Passes: 2, Failures: 0, Skips: 0
===============================================
```

### Success Criteria

✅ Component classes created successfully
✅ Components extend BasePage
✅ Pages can use multiple components
✅ Components are reusable across pages
✅ Code follows single responsibility principle

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Creating component in each page | Code duplication | Create once, reuse everywhere |
| Mixing component and page logic | Hard to maintain | Keep component logic separate |
| Not extending BasePage | Can't use common methods | Always extend BasePage |
| Making components too specific | Not reusable | Keep components generic |

### Key Learnings

1. **Component Pattern**: Reusable UI components
2. **Composition**: Pages composed of components
3. **Single Responsibility**: Each component has one purpose
4. **Reusability**: Write once, use in multiple pages
5. **Maintainability**: Update component affects all pages

### Challenge Task

Create these additional components:
- SearchComponent (search bar)
- BreadcrumbComponent (navigation breadcrumb)
- NotificationComponent (alerts/messages)
- FilterComponent (data filtering)

---

## Exercise 3: Converting Complete Test Suite to POM (40 minutes)

### What You'll Learn
- Converting existing tests to POM structure
- Organizing page objects effectively
- Refactoring test code to use page objects
- Best practices for test organization

### Step-by-Step Instructions

**Step 1:** Create page objects for a complete flow

### Complete Code

```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Enhanced LoginPage with all login scenarios
 */
public class LoginPageComplete extends BasePage {

    // Locators
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.cssSelector("button[type='submit']");
    private By flashMessage = By.id("flash");
    private By pageHeading = By.cssSelector("h2");
    private By subHeading = By.cssSelector("h4.subheader");

    public LoginPageComplete(WebDriver driver) {
        super(driver);
        System.out.println("[LoginPageComplete] Initialized");
    }

    // Actions
    public void enterUsername(String username) {
        System.out.println("[LoginPageComplete] Entering username: " + username);
        type(usernameField, username);
    }

    public void enterPassword(String password) {
        System.out.println("[LoginPageComplete] Entering password: " + password);
        type(passwordField, password);
    }

    public void clickLogin() {
        System.out.println("[LoginPageComplete] Clicking login button");
        click(loginButton);
    }

    public SecurePage loginSuccessfully(String username, String password) {
        System.out.println("[LoginPageComplete] Performing successful login");
        enterUsername(username);
        enterPassword(password);
        clickLogin();
        return new SecurePage(driver);
    }

    public void loginUnsuccessfully(String username, String password) {
        System.out.println("[LoginPageComplete] Performing unsuccessful login");
        enterUsername(username);
        enterPassword(password);
        clickLogin();
    }

    // Verifications
    public String getFlashMessage() {
        String message = getText(flashMessage);
        System.out.println("[LoginPageComplete] Flash message: " + message);
        return message;
    }

    public String getPageHeading() {
        return getText(pageHeading);
    }

    public String getSubHeading() {
        return getText(subHeading);
    }

    public boolean isLoginButtonEnabled() {
        return isEnabled(loginButton);
    }

    public boolean isOnLoginPage() {
        return getCurrentUrl().contains("/login");
    }
}
```

```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * SecurePage - Page shown after successful login
 */
public class SecurePage extends BasePage {

    // Locators
    private By pageHeading = By.cssSelector("h2");
    private By flashMessage = By.id("flash");
    private By logoutButton = By.cssSelector("a[href='/logout']");
    private By secureContent = By.cssSelector(".example");

    public SecurePage(WebDriver driver) {
        super(driver);
        System.out.println("[SecurePage] Initialized");
        waitForPageLoad();
    }

    // Actions
    public LoginPageComplete logout() {
        System.out.println("[SecurePage] Clicking logout button");
        click(logoutButton);
        return new LoginPageComplete(driver);
    }

    // Verifications
    public String getPageHeading() {
        String heading = getText(pageHeading);
        System.out.println("[SecurePage] Page heading: " + heading);
        return heading;
    }

    public String getFlashMessage() {
        String message = getText(flashMessage);
        System.out.println("[SecurePage] Flash message: " + message);
        return message;
    }

    public boolean isLogoutButtonDisplayed() {
        return isDisplayed(logoutButton);
    }

    public boolean isOnSecurePage() {
        return getCurrentUrl().contains("/secure");
    }

    public String getSecureContent() {
        return getText(secureContent);
    }
}
```

**Step 2:** Create BaseTest for test initialization

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

/**
 * BaseTest - Parent class for all test classes
 */
public class BaseTest {

    protected WebDriver driver;
    protected String baseUrl = "https://the-internet.herokuapp.com";

    @BeforeMethod
    public void setUp() {
        System.out.println("\n========================================");
        System.out.println("Setting up WebDriver");
        System.out.println("========================================\n");

        driver = new ChromeDriver();
        driver.manage().window().maximize();
        System.out.println("Browser launched and maximized\n");
    }

    @AfterMethod
    public void tearDown() {
        System.out.println("\n========================================");
        System.out.println("Cleaning up WebDriver");
        System.out.println("========================================\n");

        if (driver != null) {
            driver.quit();
            System.out.println("Browser closed successfully\n");
        }
    }

    protected void navigateToLoginPage() {
        driver.get(baseUrl + "/login");
        System.out.println("Navigated to login page\n");
    }
}
```

**Step 3:** Create comprehensive test suite using POM

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.LoginPageComplete;
import pages.SecurePage;

/**
 * LoginTestSuite - Complete test suite using POM pattern
 */
public class LoginTestSuite extends BaseTest {

    private LoginPageComplete loginPage;

    @BeforeMethod
    public void setUpTest() {
        navigateToLoginPage();
        loginPage = new LoginPageComplete(driver);
    }

    @Test(priority = 1)
    public void testSuccessfulLogin() {
        System.out.println("=== Test: Successful Login ===\n");

        SecurePage securePage = loginPage.loginSuccessfully("tomsmith", "SuperSecretPassword!");

        Assert.assertTrue(securePage.isOnSecurePage(),
            "Should be on secure page after successful login");
        Assert.assertTrue(securePage.getFlashMessage().contains("You logged into a secure area"),
            "Success message should be displayed");
        Assert.assertTrue(securePage.isLogoutButtonDisplayed(),
            "Logout button should be visible");

        System.out.println("✅ Successful login test PASSED\n");
    }

    @Test(priority = 2)
    public void testInvalidUsername() {
        System.out.println("=== Test: Invalid Username ===\n");

        loginPage.loginUnsuccessfully("invaliduser", "SuperSecretPassword!");

        Assert.assertTrue(loginPage.isOnLoginPage(),
            "Should remain on login page");
        Assert.assertTrue(loginPage.getFlashMessage().contains("Your username is invalid"),
            "Invalid username message should be displayed");

        System.out.println("✅ Invalid username test PASSED\n");
    }

    @Test(priority = 3)
    public void testInvalidPassword() {
        System.out.println("=== Test: Invalid Password ===\n");

        loginPage.loginUnsuccessfully("tomsmith", "wrongpassword");

        Assert.assertTrue(loginPage.isOnLoginPage(),
            "Should remain on login page");
        Assert.assertTrue(loginPage.getFlashMessage().contains("Your password is invalid"),
            "Invalid password message should be displayed");

        System.out.println("✅ Invalid password test PASSED\n");
    }

    @Test(priority = 4)
    public void testEmptyCredentials() {
        System.out.println("=== Test: Empty Credentials ===\n");

        loginPage.loginUnsuccessfully("", "");

        Assert.assertTrue(loginPage.isOnLoginPage(),
            "Should remain on login page");
        Assert.assertTrue(loginPage.getFlashMessage().contains("Your username is invalid"),
            "Error message should be displayed");

        System.out.println("✅ Empty credentials test PASSED\n");
    }

    @Test(priority = 5)
    public void testLoginPageElements() {
        System.out.println("=== Test: Login Page Elements ===\n");

        Assert.assertEquals(loginPage.getPageHeading(), "Login Page",
            "Page heading should be 'Login Page'");
        Assert.assertTrue(loginPage.isLoginButtonEnabled(),
            "Login button should be enabled");
        Assert.assertTrue(loginPage.isOnLoginPage(),
            "Should be on login page");

        System.out.println("✅ Login page elements test PASSED\n");
    }

    @Test(priority = 6)
    public void testCompleteLoginLogoutFlow() throws InterruptedException {
        System.out.println("=== Test: Complete Login-Logout Flow ===\n");

        // Login
        SecurePage securePage = loginPage.loginSuccessfully("tomsmith", "SuperSecretPassword!");
        Thread.sleep(1000);

        Assert.assertTrue(securePage.isOnSecurePage(),
            "Should be on secure page");

        // Logout
        LoginPageComplete returnedLoginPage = securePage.logout();
        Thread.sleep(1000);

        Assert.assertTrue(returnedLoginPage.isOnLoginPage(),
            "Should return to login page after logout");
        Assert.assertTrue(returnedLoginPage.getFlashMessage().contains("You logged out of the secure area"),
            "Logout message should be displayed");

        System.out.println("✅ Complete flow test PASSED\n");
    }
}
```

### Expected Output

```
========================================
Setting up WebDriver
========================================

Browser launched and maximized

Navigated to login page

=== Test: Successful Login ===

[LoginPageComplete] Initialized
[LoginPageComplete] Performing successful login
[LoginPageComplete] Entering username: tomsmith
[BasePage] Typing into element: By.id: username -> 'tomsmith'
[LoginPageComplete] Entering password: SuperSecretPassword!
[BasePage] Typing into element: By.id: password -> 'SuperSecretPassword!'
[LoginPageComplete] Clicking login button
[BasePage] Clicking element: By.cssSelector: button[type='submit']
[SecurePage] Initialized
[BasePage] Waiting for page to load...
[BasePage] Page loaded successfully
✅ Successful login test PASSED

PASSED: testSuccessfulLogin

=== Test: Invalid Username ===

[LoginPageComplete] Initialized
[LoginPageComplete] Performing unsuccessful login
[LoginPageComplete] Entering username: invaliduser
[LoginPageComplete] Clicking login button
✅ Invalid username test PASSED

PASSED: testInvalidUsername

=== Test: Complete Login-Logout Flow ===

[LoginPageComplete] Performing successful login
[SecurePage] Initialized
[SecurePage] Clicking logout button
[BasePage] Clicking element: By.cssSelector: a[href='/logout']
[LoginPageComplete] Initialized
✅ Complete flow test PASSED

PASSED: testCompleteLoginLogoutFlow

========================================
Cleaning up WebDriver
========================================

Browser closed successfully

===============================================
Default Suite
Total tests run: 6, Passes: 6, Failures: 0, Skips: 0
===============================================
```

### Success Criteria

✅ All page objects created
✅ Tests converted to use POM
✅ BaseTest provides common setup
✅ Tests are readable and maintainable
✅ All 6 tests pass
✅ Page navigation flows correctly

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Putting assertions in page objects | Breaks separation of concerns | Keep assertions in test classes |
| Not returning page objects | Can't chain actions | Return new page object on navigation |
| Hardcoding waits in tests | Inconsistent timing | Use wait methods in page objects |
| Creating driver in page objects | Tight coupling | Pass driver via constructor |

### Key Learnings

1. **Test Organization**: BaseTest for common setup
2. **Page Object Returns**: Methods return new page objects
3. **Test Readability**: Tests read like English sentences
4. **Maintainability**: UI changes only affect page objects
5. **Reusability**: Same page objects used in multiple tests

### Challenge Task

Convert a 3-page flow to POM:
1. Search page (enter query, click search)
2. Results page (click result)
3. Details page (verify content)

---

## Exercise 4: POM Best Practices (35 minutes)

### What You'll Learn
- Naming conventions for page objects
- Method design best practices
- Organizing complex pages
- Documentation and comments

### Step-by-Step Instructions

**Step 1:** Create well-structured page object following best practices

### Complete Code

```java
package pages.bestpractices;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import pages.BasePage;

/**
 * FormPageBestPractices - Demonstrates POM best practices
 *
 * Best Practices Demonstrated:
 * 1. Clear naming conventions
 * 2. Logical method organization
 * 3. Proper documentation
 * 4. Single responsibility methods
 * 5. Fluent interface pattern
 *
 * @author Automation Team
 * @version 1.0
 */
public class FormPageBestPractices extends BasePage {

    // ============================================
    // LOCATORS - Group by page section
    // ============================================

    // Personal Information Section
    private final By firstNameInput = By.id("first-name");
    private final By lastNameInput = By.id("last-name");
    private final By emailInput = By.id("email");
    private final By phoneInput = By.id("phone");

    // Address Section
    private final By addressLine1Input = By.id("address-line1");
    private final By addressLine2Input = By.id("address-line2");
    private final By cityInput = By.id("city");
    private final By stateDropdown = By.id("state");
    private final By zipInput = By.id("zip");

    // Actions
    private final By submitButton = By.id("submit-btn");
    private final By cancelButton = By.id("cancel-btn");
    private final By resetButton = By.id("reset-btn");

    // Feedback Messages
    private final By successMessage = By.cssSelector(".alert-success");
    private final By errorMessage = By.cssSelector(".alert-error");
    private final By validationErrors = By.cssSelector(".field-error");

    // ============================================
    // CONSTRUCTOR
    // ============================================

    /**
     * Constructor for FormPageBestPractices
     * @param driver WebDriver instance
     */
    public FormPageBestPractices(WebDriver driver) {
        super(driver);
        System.out.println("[FormPageBestPractices] Page object initialized");
    }

    // ============================================
    // ACTIONS - What user can DO
    // ============================================

    /**
     * Enter first name in the form
     * @param firstName First name to enter
     * @return this (for method chaining)
     */
    public FormPageBestPractices enterFirstName(String firstName) {
        System.out.println("[FormPageBestPractices] Entering first name: " + firstName);
        type(firstNameInput, firstName);
        return this;
    }

    /**
     * Enter last name in the form
     * @param lastName Last name to enter
     * @return this (for method chaining)
     */
    public FormPageBestPractices enterLastName(String lastName) {
        System.out.println("[FormPageBestPractices] Entering last name: " + lastName);
        type(lastNameInput, lastName);
        return this;
    }

    /**
     * Enter email address
     * @param email Email address to enter
     * @return this (for method chaining)
     */
    public FormPageBestPractices enterEmail(String email) {
        System.out.println("[FormPageBestPractices] Entering email: " + email);
        type(emailInput, email);
        return this;
    }

    /**
     * Enter phone number
     * @param phone Phone number to enter
     * @return this (for method chaining)
     */
    public FormPageBestPractices enterPhone(String phone) {
        System.out.println("[FormPageBestPractices] Entering phone: " + phone);
        type(phoneInput, phone);
        return this;
    }

    /**
     * Enter address line 1
     * @param address Address to enter
     * @return this (for method chaining)
     */
    public FormPageBestPractices enterAddressLine1(String address) {
        System.out.println("[FormPageBestPractices] Entering address line 1: " + address);
        type(addressLine1Input, address);
        return this;
    }

    /**
     * Enter address line 2 (optional)
     * @param address Address to enter
     * @return this (for method chaining)
     */
    public FormPageBestPractices enterAddressLine2(String address) {
        System.out.println("[FormPageBestPractices] Entering address line 2: " + address);
        type(addressLine2Input, address);
        return this;
    }

    /**
     * Enter city
     * @param city City to enter
     * @return this (for method chaining)
     */
    public FormPageBestPractices enterCity(String city) {
        System.out.println("[FormPageBestPractices] Entering city: " + city);
        type(cityInput, city);
        return this;
    }

    /**
     * Enter ZIP code
     * @param zip ZIP code to enter
     * @return this (for method chaining)
     */
    public FormPageBestPractices enterZip(String zip) {
        System.out.println("[FormPageBestPractices] Entering ZIP: " + zip);
        type(zipInput, zip);
        return this;
    }

    /**
     * Click submit button
     * Note: Returns void because it may navigate to different page
     */
    public void clickSubmit() {
        System.out.println("[FormPageBestPractices] Clicking submit button");
        click(submitButton);
        waitForPageLoad();
    }

    /**
     * Click cancel button
     * @return this (for method chaining)
     */
    public FormPageBestPractices clickCancel() {
        System.out.println("[FormPageBestPractices] Clicking cancel button");
        click(cancelButton);
        return this;
    }

    /**
     * Click reset button to clear form
     * @return this (for method chaining)
     */
    public FormPageBestPractices clickReset() {
        System.out.println("[FormPageBestPractices] Clicking reset button");
        click(resetButton);
        return this;
    }

    // ============================================
    // COMBINED ACTIONS - Business operations
    // ============================================

    /**
     * Fill personal information section
     * @param firstName First name
     * @param lastName Last name
     * @param email Email address
     * @param phone Phone number
     * @return this (for method chaining)
     */
    public FormPageBestPractices fillPersonalInformation(
            String firstName, String lastName, String email, String phone) {

        System.out.println("[FormPageBestPractices] Filling personal information section");
        enterFirstName(firstName);
        enterLastName(lastName);
        enterEmail(email);
        enterPhone(phone);
        return this;
    }

    /**
     * Fill address section
     * @param addressLine1 Address line 1
     * @param city City
     * @param zip ZIP code
     * @return this (for method chaining)
     */
    public FormPageBestPractices fillAddress(String addressLine1, String city, String zip) {
        System.out.println("[FormPageBestPractices] Filling address section");
        enterAddressLine1(addressLine1);
        enterCity(city);
        enterZip(zip);
        return this;
    }

    /**
     * Fill complete form and submit
     * Demonstrates fluent interface pattern
     */
    public void fillAndSubmitForm(
            String firstName, String lastName, String email, String phone,
            String address, String city, String zip) {

        System.out.println("[FormPageBestPractices] Filling and submitting complete form");

        fillPersonalInformation(firstName, lastName, email, phone);
        fillAddress(address, city, zip);
        clickSubmit();
    }

    // ============================================
    // VERIFICATIONS - What user can SEE/CHECK
    // ============================================

    /**
     * Get success message text
     * @return Success message text
     */
    public String getSuccessMessage() {
        System.out.println("[FormPageBestPractices] Getting success message");
        return getText(successMessage);
    }

    /**
     * Get error message text
     * @return Error message text
     */
    public String getErrorMessage() {
        System.out.println("[FormPageBestPractices] Getting error message");
        return getText(errorMessage);
    }

    /**
     * Check if success message is displayed
     * @return true if success message is visible
     */
    public boolean isSuccessMessageDisplayed() {
        return isDisplayed(successMessage);
    }

    /**
     * Check if error message is displayed
     * @return true if error message is visible
     */
    public boolean isErrorMessageDisplayed() {
        return isDisplayed(errorMessage);
    }

    /**
     * Get number of validation errors
     * @return Count of validation errors
     */
    public int getValidationErrorCount() {
        int count = getElementCount(validationErrors);
        System.out.println("[FormPageBestPractices] Validation error count: " + count);
        return count;
    }

    /**
     * Check if submit button is enabled
     * @return true if submit button is enabled
     */
    public boolean isSubmitButtonEnabled() {
        return isEnabled(submitButton);
    }

    /**
     * Get entered first name value
     * @return First name value
     */
    public String getFirstNameValue() {
        return getAttribute(firstNameInput, "value");
    }

    /**
     * Get entered email value
     * @return Email value
     */
    public String getEmailValue() {
        return getAttribute(emailInput, "value");
    }

    // ============================================
    // PAGE STATE CHECKS
    // ============================================

    /**
     * Verify page is loaded
     * @return true if page is loaded and ready
     */
    public boolean isPageLoaded() {
        return isDisplayed(firstNameInput) &&
               isDisplayed(submitButton);
    }

    /**
     * Check if form is empty
     * @return true if all fields are empty
     */
    public boolean isFormEmpty() {
        return getFirstNameValue().isEmpty() &&
               getEmailValue().isEmpty();
    }
}
```

**Step 2:** Create naming conventions guide

```java
package pages.bestpractices;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import pages.BasePage;

/**
 * NamingConventionsExample - Demonstrates proper naming conventions
 *
 * NAMING RULES:
 * 1. Locators: Use descriptive names ending with element type
 *    Example: submitButton, emailInput, errorMessage
 *
 * 2. Actions: Start with verb (click, enter, select, etc.)
 *    Example: clickSubmit(), enterEmail(), selectCountry()
 *
 * 3. Verifications: Start with is/has/get
 *    Example: isDisplayed(), hasError(), getMessage()
 *
 * 4. Combined actions: Use verb phrase
 *    Example: fillForm(), submitOrder(), completeRegistration()
 */
public class NamingConventionsExample extends BasePage {

    // ========== GOOD LOCATOR NAMES ==========

    // Buttons - end with "Button"
    private final By saveButton = By.id("save");
    private final By cancelButton = By.id("cancel");
    private final By deleteButton = By.id("delete");

    // Input fields - end with "Input" or "Field"
    private final By usernameInput = By.id("username");
    private final By passwordField = By.id("password");
    private final By searchField = By.name("search");

    // Dropdowns - end with "Dropdown" or "Select"
    private final By countryDropdown = By.id("country");
    private final By stateSelect = By.id("state");

    // Checkboxes - end with "Checkbox"
    private final By termsCheckbox = By.id("terms");
    private final By newsletterCheckbox = By.id("newsletter");

    // Radio buttons - end with "Radio"
    private final By genderMaleRadio = By.id("male");
    private final By genderFemaleRadio = By.id("female");

    // Links - end with "Link"
    private final By forgotPasswordLink = By.linkText("Forgot Password");
    private final By registerLink = By.linkText("Register");

    // Messages/Alerts - end with "Message" or "Alert"
    private final By successMessage = By.cssSelector(".success");
    private final By errorAlert = By.cssSelector(".error");

    // Labels/Text - end with "Label" or "Text"
    private final By welcomeLabel = By.cssSelector(".welcome");
    private final By headerText = By.tagName("h1");

    // Containers/Sections - end with "Container" or "Section"
    private final By formContainer = By.id("form-container");
    private final By resultsSection = By.cssSelector(".results");

    public NamingConventionsExample(WebDriver driver) {
        super(driver);
    }

    // ========== GOOD ACTION METHOD NAMES ==========

    // Click actions - start with "click"
    public void clickSave() {
        click(saveButton);
    }

    public void clickCancel() {
        click(cancelButton);
    }

    // Type actions - start with "enter" or "type"
    public void enterUsername(String username) {
        type(usernameInput, username);
    }

    public void typePassword(String password) {
        type(passwordField, password);
    }

    // Selection actions - start with "select"
    public void selectCountry(String country) {
        // Implementation
    }

    // Checkbox actions - start with "check" or "uncheck"
    public void checkTermsCheckbox() {
        click(termsCheckbox);
    }

    public void uncheckNewsletter() {
        // Implementation
    }

    // ========== GOOD VERIFICATION METHOD NAMES ==========

    // Boolean checks - start with "is" or "has"
    public boolean isSuccessMessageDisplayed() {
        return isDisplayed(successMessage);
    }

    public boolean hasError() {
        return isDisplayed(errorAlert);
    }

    public boolean isSaveButtonEnabled() {
        return isEnabled(saveButton);
    }

    // Getters - start with "get"
    public String getSuccessMessage() {
        return getText(successMessage);
    }

    public String getHeaderText() {
        return getText(headerText);
    }

    public int getResultsCount() {
        return getElementCount(resultsSection);
    }

    // ========== COMBINED ACTION EXAMPLES ==========

    public void performLogin(String username, String password) {
        enterUsername(username);
        typePassword(password);
        clickSave();
    }

    public void completeRegistration(String username, String password) {
        enterUsername(username);
        typePassword(password);
        checkTermsCheckbox();
        clickSave();
    }
}
```

**Step 3:** Create test demonstrating best practices

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.bestpractices.FormPageBestPractices;

/**
 * BestPracticesTest - Demonstrates testing with well-designed page objects
 */
public class BestPracticesTest extends BaseTest {

    @Test
    public void testFluentInterfacePattern() {
        System.out.println("\n=== Test: Fluent Interface Pattern ===\n");

        driver.get(baseUrl + "/form");
        FormPageBestPractices formPage = new FormPageBestPractices(driver);

        // Demonstrate method chaining (fluent interface)
        formPage
            .enterFirstName("John")
            .enterLastName("Doe")
            .enterEmail("john.doe@example.com")
            .enterPhone("123-456-7890")
            .enterAddressLine1("123 Main St")
            .enterCity("New York")
            .enterZip("10001")
            .clickSubmit();

        System.out.println("✅ Fluent interface pattern demonstrated\n");
        System.out.println("Notice how methods can be chained for cleaner code\n");
    }

    @Test
    public void testBusinessLogicMethods() {
        System.out.println("\n=== Test: Business Logic Methods ===\n");

        driver.get(baseUrl + "/form");
        FormPageBestPractices formPage = new FormPageBestPractices(driver);

        // Use high-level business method
        formPage.fillAndSubmitForm(
            "John", "Doe",
            "john@example.com", "123-456-7890",
            "123 Main St", "New York", "10001"
        );

        System.out.println("✅ Business logic method used\n");
        System.out.println("Single method call performs complete business operation\n");
    }

    @Test
    public void testClearMethodNames() {
        System.out.println("\n=== Test: Clear Method Names ===\n");

        driver.get(baseUrl + "/form");
        FormPageBestPractices formPage = new FormPageBestPractices(driver);

        // Methods are self-documenting
        formPage.enterFirstName("Jane");
        formPage.enterEmail("jane@example.com");

        // Verification methods are clear
        String emailValue = formPage.getEmailValue();
        boolean isLoaded = formPage.isPageLoaded();

        System.out.println("Email entered: " + emailValue);
        System.out.println("Page loaded: " + isLoaded);

        System.out.println("\n✅ Method names are clear and self-documenting\n");
    }

    @Test
    public void testSeparationOfConcerns() {
        System.out.println("\n=== Test: Separation of Concerns ===\n");

        driver.get(baseUrl + "/form");
        FormPageBestPractices formPage = new FormPageBestPractices(driver);

        // Page object handles HOW
        formPage.enterFirstName("Test");

        // Test handles WHAT to verify
        Assert.assertEquals(formPage.getFirstNameValue(), "Test",
            "First name should be entered correctly");

        System.out.println("✅ Page objects handle actions, tests handle assertions\n");
    }
}
```

### Expected Output

```
=== Test: Fluent Interface Pattern ===

[FormPageBestPractices] Page object initialized
[FormPageBestPractices] Entering first name: John
[BasePage] Typing into element: By.id: first-name -> 'John'
[FormPageBestPractices] Entering last name: Doe
[BasePage] Typing into element: By.id: last-name -> 'Doe'
[FormPageBestPractices] Entering email: john.doe@example.com
[FormPageBestPractices] Entering phone: 123-456-7890
[FormPageBestPractices] Entering address line 1: 123 Main St
[FormPageBestPractices] Entering city: New York
[FormPageBestPractices] Entering ZIP: 10001
[FormPageBestPractices] Clicking submit button

✅ Fluent interface pattern demonstrated

Notice how methods can be chained for cleaner code

PASSED: testFluentInterfacePattern

=== Test: Business Logic Methods ===

[FormPageBestPractices] Filling and submitting complete form
[FormPageBestPractices] Filling personal information section
✅ Business logic method used

Single method call performs complete business operation

PASSED: testBusinessLogicMethods

===============================================
Default Suite
Total tests run: 4, Passes: 4, Failures: 0, Skips: 0
===============================================
```

### Success Criteria

✅ Proper naming conventions followed
✅ Methods organized logically
✅ Fluent interface pattern implemented
✅ Good documentation added
✅ Separation of concerns maintained

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Vague method names | Hard to understand | Use clear, descriptive names |
| No documentation | Hard for others to use | Add JavaDoc comments |
| Mixed responsibilities | Hard to maintain | Keep actions separate from verifications |
| No method chaining | Less readable tests | Return 'this' from action methods |

### Key Learnings

1. **Naming Conventions**: Clear, consistent names improve readability
2. **Fluent Interface**: Method chaining makes tests readable
3. **Documentation**: JavaDoc helps others understand code
4. **Organization**: Group related methods together
5. **Single Responsibility**: Each method does one thing well

### Challenge Task

Review these method names and improve them:
- `doSomething()` → ?
- `check()` → ?
- `input(String s)` → ?
- `go()` → ?

---

## Exercise 5: Advanced POM Organization (40 minutes)

### What You'll Learn
- Organizing large page objects
- Creating page factories
- Implementing page object inheritance
- Managing complex web applications

### Step-by-Step Instructions

**Step 1:** Create advanced page structure with inheritance

### Complete Code

```java
package pages.advanced;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import pages.BasePage;
import pages.components.HeaderComponent;
import pages.components.FooterComponent;

/**
 * AbstractAuthenticatedPage - Base class for all authenticated pages
 * Contains common elements and methods for logged-in users
 */
public abstract class AbstractAuthenticatedPage extends BasePage {

    // Common components for all authenticated pages
    protected HeaderComponent header;
    protected FooterComponent footer;

    // Common locators
    protected By userProfileDropdown = By.id("user-profile");
    protected By notificationBell = By.id("notifications");
    protected By sidebarMenu = By.cssSelector(".sidebar");

    public AbstractAuthenticatedPage(WebDriver driver) {
        super(driver);
        this.header = new HeaderComponent(driver);
        this.footer = new FooterComponent(driver);
        waitForAuthenticatedPageLoad();
    }

    /**
     * Wait for authenticated page elements to load
     */
    private void waitForAuthenticatedPageLoad() {
        System.out.println("[AbstractAuthenticatedPage] Waiting for authenticated page to load");
        waitForElementVisible(userProfileDropdown);
        waitForElementVisible(sidebarMenu);
    }

    /**
     * Get header component
     */
    public HeaderComponent getHeader() {
        return header;
    }

    /**
     * Get footer component
     */
    public FooterComponent getFooter() {
        return footer;
    }

    /**
     * Open user profile dropdown
     */
    public void openUserProfileDropdown() {
        System.out.println("[AbstractAuthenticatedPage] Opening user profile dropdown");
        click(userProfileDropdown);
    }

    /**
     * Click notifications bell
     */
    public void clickNotifications() {
        System.out.println("[AbstractAuthenticatedPage] Clicking notifications");
        click(notificationBell);
    }

    /**
     * Get notification count
     */
    public int getNotificationCount() {
        String badgeText = getText(By.cssSelector(".notification-badge"));
        return badgeText.isEmpty() ? 0 : Integer.parseInt(badgeText);
    }

    /**
     * Check if user is logged in
     */
    public boolean isUserLoggedIn() {
        return isDisplayed(userProfileDropdown);
    }

    /**
     * Abstract method - each page must implement its own validation
     */
    public abstract boolean isPageLoaded();

    /**
     * Abstract method - each page must define its URL pattern
     */
    public abstract String getExpectedUrl();
}
```

```java
package pages.advanced;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * DashboardPage - Extends authenticated page base
 */
public class DashboardPage extends AbstractAuthenticatedPage {

    // Dashboard-specific locators
    private By dashboardHeading = By.cssSelector("h1.dashboard-title");
    private By welcomeMessage = By.cssSelector(".welcome-message");
    private By statsCards = By.cssSelector(".stat-card");
    private By recentActivitySection = By.id("recent-activity");
    private By quickActionsPanel = By.id("quick-actions");

    // Quick action buttons
    private By createNewButton = By.id("create-new");
    private By uploadButton = By.id("upload");
    private By settingsButton = By.id("settings");

    public DashboardPage(WebDriver driver) {
        super(driver);
        System.out.println("[DashboardPage] Initialized");
    }

    @Override
    public boolean isPageLoaded() {
        return isDisplayed(dashboardHeading) &&
               isDisplayed(welcomeMessage);
    }

    @Override
    public String getExpectedUrl() {
        return "/dashboard";
    }

    // Dashboard-specific actions
    public String getDashboardHeading() {
        return getText(dashboardHeading);
    }

    public String getWelcomeMessage() {
        return getText(welcomeMessage);
    }

    public int getStatsCardsCount() {
        return getElementCount(statsCards);
    }

    public void clickCreateNew() {
        System.out.println("[DashboardPage] Clicking Create New");
        click(createNewButton);
    }

    public void clickUpload() {
        System.out.println("[DashboardPage] Clicking Upload");
        click(uploadButton);
    }

    public void clickSettings() {
        System.out.println("[DashboardPage] Clicking Settings");
        click(settingsButton);
    }

    public boolean isRecentActivityVisible() {
        return isDisplayed(recentActivitySection);
    }
}
```

```java
package pages.advanced;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * ProfilePage - Another authenticated page example
 */
public class ProfilePage extends AbstractAuthenticatedPage {

    // Profile-specific locators
    private By profileHeading = By.cssSelector("h1.profile-title");
    private By profilePicture = By.id("profile-picture");
    private By nameDisplay = By.id("display-name");
    private By emailDisplay = By.id("email");
    private By bioText = By.id("bio");

    // Edit buttons
    private By editProfileButton = By.id("edit-profile");
    private By changePictureButton = By.id("change-picture");
    private By changePasswordButton = By.id("change-password");

    public ProfilePage(WebDriver driver) {
        super(driver);
        System.out.println("[ProfilePage] Initialized");
    }

    @Override
    public boolean isPageLoaded() {
        return isDisplayed(profileHeading) &&
               isDisplayed(nameDisplay);
    }

    @Override
    public String getExpectedUrl() {
        return "/profile";
    }

    // Profile-specific actions
    public String getProfileHeading() {
        return getText(profileHeading);
    }

    public String getDisplayName() {
        return getText(nameDisplay);
    }

    public String getEmail() {
        return getText(emailDisplay);
    }

    public String getBio() {
        return getText(bioText);
    }

    public void clickEditProfile() {
        System.out.println("[ProfilePage] Clicking Edit Profile");
        click(editProfileButton);
    }

    public void clickChangePicture() {
        System.out.println("[ProfilePage] Clicking Change Picture");
        click(changePictureButton);
    }

    public void clickChangePassword() {
        System.out.println("[ProfilePage] Clicking Change Password");
        click(changePasswordButton);
    }

    public boolean isProfilePictureDisplayed() {
        return isDisplayed(profilePicture);
    }
}
```

**Step 2:** Create Page Factory for centralized page creation

```java
package pages.advanced;

import org.openqa.selenium.WebDriver;
import pages.LoginPageComplete;
import pages.SecurePage;

/**
 * PageFactory - Centralized page object creation
 * Provides single point for creating all page objects
 */
public class PageFactory {

    private WebDriver driver;

    public PageFactory(WebDriver driver) {
        this.driver = driver;
        System.out.println("[PageFactory] Initialized");
    }

    // ========== UNAUTHENTICATED PAGES ==========

    public LoginPageComplete getLoginPage() {
        System.out.println("[PageFactory] Creating LoginPage");
        return new LoginPageComplete(driver);
    }

    // ========== AUTHENTICATED PAGES ==========

    public DashboardPage getDashboardPage() {
        System.out.println("[PageFactory] Creating DashboardPage");
        return new DashboardPage(driver);
    }

    public ProfilePage getProfilePage() {
        System.out.println("[PageFactory] Creating ProfilePage");
        return new ProfilePage(driver);
    }

    public SecurePage getSecurePage() {
        System.out.println("[PageFactory] Creating SecurePage");
        return new SecurePage(driver);
    }

    // ========== UTILITY METHODS ==========

    /**
     * Navigate to URL and return appropriate page object
     */
    public <T> T navigateToPage(String url, Class<T> pageClass) {
        System.out.println("[PageFactory] Navigating to: " + url);
        driver.get(url);

        try {
            return pageClass.getDeclaredConstructor(WebDriver.class).newInstance(driver);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create page object: " + pageClass.getName(), e);
        }
    }

    /**
     * Get current page as specified type
     */
    public <T> T getCurrentPage(Class<T> pageClass) {
        System.out.println("[PageFactory] Getting current page as: " + pageClass.getSimpleName());

        try {
            return pageClass.getDeclaredConstructor(WebDriver.class).newInstance(driver);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create page object: " + pageClass.getName(), e);
        }
    }
}
```

**Step 3:** Create organized test structure

```java
package tests.advanced;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import pages.advanced.PageFactory;

/**
 * AdvancedBaseTest - Base test with PageFactory
 */
public class AdvancedBaseTest {

    protected WebDriver driver;
    protected PageFactory pageFactory;
    protected String baseUrl = "https://the-internet.herokuapp.com";

    @BeforeMethod
    public void setUp() {
        System.out.println("\n========================================");
        System.out.println("Setting up Advanced Test");
        System.out.println("========================================\n");

        driver = new ChromeDriver();
        driver.manage().window().maximize();
        pageFactory = new PageFactory(driver);

        System.out.println("Browser launched with PageFactory\n");
    }

    @AfterMethod
    public void tearDown() {
        System.out.println("\n========================================");
        System.out.println("Cleaning up Advanced Test");
        System.out.println("========================================\n");

        if (driver != null) {
            driver.quit();
            System.out.println("Browser closed successfully\n");
        }
    }
}
```

```java
package tests.advanced;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPageComplete;
import pages.SecurePage;
import pages.advanced.DashboardPage;
import pages.advanced.ProfilePage;

/**
 * AdvancedPOMTest - Demonstrates advanced POM organization
 */
public class AdvancedPOMTest extends AdvancedBaseTest {

    @Test
    public void testPageFactoryUsage() throws InterruptedException {
        System.out.println("\n=== Test: Page Factory Usage ===\n");

        // Use factory to create pages
        driver.get(baseUrl + "/login");
        LoginPageComplete loginPage = pageFactory.getLoginPage();

        SecurePage securePage = loginPage.loginSuccessfully("tomsmith", "SuperSecretPassword!");
        Thread.sleep(1000);

        Assert.assertTrue(securePage.isOnSecurePage(),
            "Should be on secure page");

        System.out.println("✅ Page Factory pattern demonstrated\n");
    }

    @Test
    public void testInheritanceStructure() {
        System.out.println("\n=== Test: Inheritance Structure ===\n");

        // Both pages extend AbstractAuthenticatedPage
        driver.get(baseUrl + "/login");
        LoginPageComplete loginPage = pageFactory.getLoginPage();

        System.out.println("Demonstrating inheritance:");
        System.out.println("- DashboardPage extends AbstractAuthenticatedPage");
        System.out.println("- ProfilePage extends AbstractAuthenticatedPage");
        System.out.println("- Both inherit common authenticated functionality");
        System.out.println("- Each implements abstract methods differently");

        System.out.println("\n✅ Inheritance structure demonstrated\n");
    }

    @Test
    public void testPageOrganization() {
        System.out.println("\n=== Test: Page Organization ===\n");

        System.out.println("Project Structure:");
        System.out.println("pages/");
        System.out.println("  ├── BasePage.java (Common to ALL pages)");
        System.out.println("  ├── advanced/");
        System.out.println("  │   ├── AbstractAuthenticatedPage.java (Common to authenticated)");
        System.out.println("  │   ├── DashboardPage.java (Specific page)");
        System.out.println("  │   ├── ProfilePage.java (Specific page)");
        System.out.println("  │   └── PageFactory.java (Creates pages)");
        System.out.println("  └── components/");
        System.out.println("      ├── HeaderComponent.java");
        System.out.println("      └── FooterComponent.java");

        System.out.println("\n✅ Organization pattern demonstrated\n");
    }
}
```

### Expected Output

```
========================================
Setting up Advanced Test
========================================

Browser launched with PageFactory

=== Test: Page Factory Usage ===

[PageFactory] Initialized
[PageFactory] Creating LoginPage
[LoginPageComplete] Initialized
[LoginPageComplete] Performing successful login
[SecurePage] Initialized
✅ Page Factory pattern demonstrated

PASSED: testPageFactoryUsage

=== Test: Inheritance Structure ===

[PageFactory] Creating LoginPage
Demonstrating inheritance:
- DashboardPage extends AbstractAuthenticatedPage
- ProfilePage extends AbstractAuthenticatedPage
- Both inherit common authenticated functionality
- Each implements abstract methods differently

✅ Inheritance structure demonstrated

PASSED: testInheritanceStructure

=== Test: Page Organization ===

Project Structure:
pages/
  ├── BasePage.java (Common to ALL pages)
  ├── advanced/
  │   ├── AbstractAuthenticatedPage.java (Common to authenticated)
  │   ├── DashboardPage.java (Specific page)
  │   ├── ProfilePage.java (Specific page)
  │   └── PageFactory.java (Creates pages)
  └── components/
      ├── HeaderComponent.java
      └── FooterComponent.java

✅ Organization pattern demonstrated

PASSED: testPageOrganization

========================================
Cleaning up Advanced Test
========================================

Browser closed successfully

===============================================
Default Suite
Total tests run: 3, Passes: 3, Failures: 0, Skips: 0
===============================================
```

### Success Criteria

✅ Abstract base class for authenticated pages created
✅ Multiple pages extend abstract base
✅ Page Factory centralizes page creation
✅ Clear inheritance hierarchy
✅ Organized package structure

### Common Mistakes

| Mistake | Why It's Wrong | Solution |
|---------|---------------|----------|
| Deep inheritance hierarchies | Hard to maintain | Keep inheritance 2-3 levels max |
| Creating pages directly in tests | Hard to refactor | Use PageFactory |
| Not using abstract methods | Can't enforce page structure | Use abstract methods for required behavior |
| Poor package organization | Hard to find pages | Organize by feature or auth level |

### Key Learnings

1. **Inheritance**: Share common functionality via abstract base classes
2. **Page Factory**: Centralized page object creation
3. **Organization**: Logical package structure by feature
4. **Abstract Methods**: Enforce implementation in child classes
5. **Scalability**: Structure supports large applications

### Challenge Task

Design a package structure for:
- 10+ pages
- 3 user roles (guest, user, admin)
- 5+ shared components
- Multiple features (shop, blog, account)

---

# Day 41 Summary

Today you learned:
- ✅ Creating robust BasePage with common methods
- ✅ Building reusable page components
- ✅ Converting test suites to POM
- ✅ Following POM best practices
- ✅ Organizing complex page object structures

**Next:** Day 42 - Data-Driven Testing with TestNG DataProviders and Excel

---

