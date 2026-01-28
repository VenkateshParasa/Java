# Day 45: Complete Automation Framework Project

## Project Overview

Welcome to the **culminating project** of the 45-day Selenium course! This comprehensive exercise brings together everything you've learned to build a production-ready test automation framework from scratch.

**Project Name:** E-Commerce Test Automation Framework

**Duration:** 3-4 hours (divided into manageable sections)

**What You'll Build:**
- Complete Page Object Model framework
- Data-driven test architecture
- Robust reporting and logging
- CI/CD ready configuration
- Production-quality code

---

## Learning Objectives

By completing this project, you will:
- ✅ Build a complete, maintainable test automation framework
- ✅ Implement industry-standard design patterns
- ✅ Create data-driven, scalable test suites
- ✅ Configure comprehensive reporting and logging
- ✅ Set up CI/CD integration
- ✅ Apply all best practices learned in 45 days

---

## Project Structure

```
ecommerce-automation-framework/
├── src/
│   ├── main/java/
│   │   ├── pages/
│   │   │   ├── BasePage.java
│   │   │   ├── LoginPage.java
│   │   │   ├── ProductListingPage.java
│   │   │   ├── ProductDetailPage.java
│   │   │   ├── ShoppingCartPage.java
│   │   │   └── CheckoutPage.java
│   │   ├── utils/
│   │   │   ├── ConfigManager.java
│   │   │   ├── DriverManager.java
│   │   │   ├── ExcelReader.java
│   │   │   ├── ScreenshotUtil.java
│   │   │   ├── WaitUtil.java
│   │   │   └── ReportManager.java
│   │   └── base/
│   │       └── BaseTest.java
│   └── test/
│       ├── java/
│       │   ├── tests/
│       │   │   ├── LoginTests.java
│       │   │   ├── ProductSearchTests.java
│       │   │   ├── AddToCartTests.java
│       │   │   ├── CheckoutTests.java
│       │   │   └── EndToEndTests.java
│       │   ├── listeners/
│       │   │   └── TestListener.java
│       │   └── dataproviders/
│       │       └── TestDataProvider.java
│       └── resources/
│           ├── config/
│           │   ├── config-qa.properties
│           │   └── config-prod.properties
│           ├── testdata/
│           │   └── test_data.xlsx
│           ├── log4j2.xml
│           └── testng.xml
├── test-output/
│   ├── screenshots/
│   ├── reports/
│   └── logs/
├── pom.xml
├── README.md
└── .gitignore
```

---

## Part 1: Project Setup (30 minutes)

### Step 1: Create Maven Project Structure

**pom.xml** - Complete Project Configuration
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.ecommerce</groupId>
    <artifactId>automation-framework</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>E-Commerce Automation Framework</name>
    <description>Complete Selenium automation framework for e-commerce testing</description>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <!-- Dependency Versions -->
        <selenium.version>4.16.1</selenium.version>
        <testng.version>7.8.0</testng.version>
        <extentreports.version>5.0.9</extentreports.version>
        <log4j.version>2.20.0</log4j.version>
        <poi.version>5.2.3</poi.version>
        <javafaker.version>1.0.2</javafaker.version>
        <restassured.version>5.3.2</restassured.version>
    </properties>

    <dependencies>
        <!-- Selenium WebDriver -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>${selenium.version}</version>
        </dependency>

        <!-- TestNG -->
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>${testng.version}</version>
        </dependency>

        <!-- ExtentReports -->
        <dependency>
            <groupId>com.aventstack</groupId>
            <artifactId>extentreports</artifactId>
            <version>${extentreports.version}</version>
        </dependency>

        <!-- Log4j2 -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>${log4j.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-api</artifactId>
            <version>${log4j.version}</version>
        </dependency>

        <!-- Apache POI for Excel -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>${poi.version}</version>
        </dependency>

        <!-- Java Faker for test data -->
        <dependency>
            <groupId>com.github.javafaker</groupId>
            <artifactId>javafaker</artifactId>
            <version>${javafaker.version}</version>
        </dependency>

        <!-- RestAssured for API testing -->
        <dependency>
            <groupId>io.rest-assured</groupId>
            <artifactId>rest-assured</artifactId>
            <version>${restassured.version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Maven Compiler Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>

            <!-- Maven Surefire Plugin for TestNG -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.0.0-M9</version>
                <configuration>
                    <suiteXmlFiles>
                        <suiteXmlFile>${testng.suite.xml}</suiteXmlFile>
                    </suiteXmlFiles>
                    <systemPropertyVariables>
                        <environment>${env}</environment>
                    </systemPropertyVariables>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <!-- Maven Profiles -->
    <profiles>
        <profile>
            <id>qa</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <env>qa</env>
                <testng.suite.xml>src/test/resources/testng.xml</testng.suite.xml>
            </properties>
        </profile>

        <profile>
            <id>prod</id>
            <properties>
                <env>prod</env>
                <testng.suite.xml>src/test/resources/testng-smoke.xml</testng.suite.xml>
            </properties>
        </profile>

        <profile>
            <id>regression</id>
            <properties>
                <env>qa</env>
                <testng.suite.xml>src/test/resources/testng-regression.xml</testng.suite.xml>
            </properties>
        </profile>
    </profiles>

</project>
```

### Step 2: Configuration Files

**config-qa.properties**
```properties
# QA Environment Configuration

# Application URLs
app.url=https://www.saucedemo.com
app.title=Swag Labs

# Browser Configuration
browser=chrome
headless=false
maximize=true

# Timeouts (in seconds)
implicit.wait=10
explicit.wait=20
page.load.timeout=30
script.timeout=20

# Test Data
test.data.file=src/test/resources/testdata/test_data.xlsx

# Reporting
report.path=test-output/reports/
screenshot.path=test-output/screenshots/
log.path=test-output/logs/

# Retry Configuration
retry.count=2

# Valid Test Credentials
valid.username=standard_user
valid.password=secret_sauce
```

**config-prod.properties**
```properties
# Production Environment Configuration

app.url=https://www.saucedemo.com
app.title=Swag Labs

browser=chrome
headless=true
maximize=true

implicit.wait=10
explicit.wait=20
page.load.timeout=30
script.timeout=20

test.data.file=src/test/resources/testdata/test_data.xlsx

report.path=test-output/reports/
screenshot.path=test-output/screenshots/
log.path=test-output/logs/

retry.count=1

valid.username=standard_user
valid.password=secret_sauce
```

### Step 3: Log4j2 Configuration

**log4j2.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Properties>
        <Property name="LOG_PATTERN">%d{yyyy-MM-dd HH:mm:ss} [%t] %-5level %logger{36} - %msg%n</Property>
        <Property name="LOG_PATH">test-output/logs</Property>
    </Properties>

    <Appenders>
        <!-- Console Appender -->
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="${LOG_PATTERN}"/>
        </Console>

        <!-- File Appender -->
        <RollingFile name="FileLogger"
                     fileName="${LOG_PATH}/automation.log"
                     filePattern="${LOG_PATH}/automation-%d{yyyy-MM-dd}-%i.log">
            <PatternLayout pattern="${LOG_PATTERN}"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="10MB"/>
                <TimeBasedTriggeringPolicy interval="1"/>
            </Policies>
            <DefaultRolloverStrategy max="10"/>
        </RollingFile>
    </Appenders>

    <Loggers>
        <!-- Root Logger -->
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="FileLogger"/>
        </Root>

        <!-- Framework Logger -->
        <Logger name="com.ecommerce" level="debug" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="FileLogger"/>
        </Logger>
    </Loggers>
</Configuration>
```

### Step 4: .gitignore

**.gitignore**
```
# Compiled class files
*.class
target/

# Log files
*.log
test-output/

# Eclipse
.classpath
.project
.settings/

# IntelliJ IDEA
.idea/
*.iml
*.iws
*.ipr

# VS Code
.vscode/

# Mac
.DS_Store

# Test outputs
screenshots/
reports/
logs/

# Maven
dependency-reduced-pom.xml

# Credentials (never commit)
**/config-local.properties
```

---

## Part 2: Page Object Model Implementation (45 minutes)

### Step 1: Base Page Class

**BasePage.java**
```java
package pages;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.ConfigManager;

import java.time.Duration;
import java.util.List;

/**
 * Base Page class with common methods for all page objects
 * All page objects should extend this class
 */
public abstract class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected static final Logger logger = LogManager.getLogger(BasePage.class);

    /**
     * Constructor to initialize driver and wait
     */
    public BasePage(WebDriver driver) {
        this.driver = driver;
        int explicitWait = Integer.parseInt(ConfigManager.getProperty("explicit.wait", "20"));
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(explicitWait));
        logger.debug("Initialized " + this.getClass().getSimpleName());
    }

    /**
     * Wait for element to be visible
     */
    protected WebElement waitForElementVisible(By locator) {
        logger.debug("Waiting for element to be visible: " + locator);
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    /**
     * Wait for element to be clickable
     */
    protected WebElement waitForElementClickable(By locator) {
        logger.debug("Waiting for element to be clickable: " + locator);
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    /**
     * Wait for element to be invisible
     */
    protected void waitForElementInvisible(By locator) {
        logger.debug("Waiting for element to be invisible: " + locator);
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    /**
     * Click element with wait
     */
    protected void click(By locator) {
        logger.info("Clicking element: " + locator);
        waitForElementClickable(locator).click();
    }

    /**
     * Click with retry on StaleElementReferenceException
     */
    protected void clickWithRetry(By locator, int maxAttempts) {
        for (int i = 0; i < maxAttempts; i++) {
            try {
                click(locator);
                return;
            } catch (StaleElementReferenceException e) {
                logger.warn("StaleElementReferenceException on attempt " + (i + 1));
                if (i == maxAttempts - 1) throw e;
            }
        }
    }

    /**
     * Enter text in input field
     */
    protected void sendKeys(By locator, String text) {
        logger.info("Entering text '" + text + "' in: " + locator);
        WebElement element = waitForElementVisible(locator);
        element.clear();
        element.sendKeys(text);
    }

    /**
     * Get text from element
     */
    protected String getText(By locator) {
        logger.debug("Getting text from: " + locator);
        return waitForElementVisible(locator).getText();
    }

    /**
     * Get attribute value
     */
    protected String getAttribute(By locator, String attribute) {
        logger.debug("Getting attribute '" + attribute + "' from: " + locator);
        return waitForElementVisible(locator).getAttribute(attribute);
    }

    /**
     * Check if element is displayed
     */
    protected boolean isElementDisplayed(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (NoSuchElementException e) {
            logger.debug("Element not found: " + locator);
            return false;
        }
    }

    /**
     * Get all elements matching locator
     */
    protected List<WebElement> getElements(By locator) {
        logger.debug("Getting all elements: " + locator);
        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
        return driver.findElements(locator);
    }

    /**
     * Select dropdown option by visible text
     */
    protected void selectByVisibleText(By locator, String text) {
        logger.info("Selecting dropdown option: " + text);
        Select select = new Select(waitForElementVisible(locator));
        select.selectByVisibleText(text);
    }

    /**
     * Select dropdown option by value
     */
    protected void selectByValue(By locator, String value) {
        logger.info("Selecting dropdown value: " + value);
        Select select = new Select(waitForElementVisible(locator));
        select.selectByValue(value);
    }

    /**
     * Scroll to element
     */
    protected void scrollToElement(By locator) {
        logger.debug("Scrolling to element: " + locator);
        WebElement element = driver.findElement(locator);
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
    }

    /**
     * JavaScript click (alternative when regular click fails)
     */
    protected void jsClick(By locator) {
        logger.info("Performing JS click on: " + locator);
        WebElement element = driver.findElement(locator);
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element);
    }

    /**
     * Get page title
     */
    public String getPageTitle() {
        logger.debug("Getting page title");
        return driver.getTitle();
    }

    /**
     * Get current URL
     */
    public String getCurrentUrl() {
        logger.debug("Getting current URL");
        return driver.getCurrentUrl();
    }

    /**
     * Abstract method to verify page is loaded
     * Each page must implement this
     */
    public abstract boolean isPageLoaded();
}
```

### Step 2: Login Page

**LoginPage.java**
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Login Page Object
 */
public class LoginPage extends BasePage {

    // Locators
    private final By usernameField = By.id("user-name");
    private final By passwordField = By.id("password");
    private final By loginButton = By.id("login-button");
    private final By errorMessage = By.cssSelector("[data-test='error']");
    private final By errorCloseButton = By.className("error-button");
    private final By loginLogo = By.className("login_logo");

    /**
     * Constructor
     */
    public LoginPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Navigate to login page
     */
    public LoginPage navigateToLoginPage() {
        String url = utils.ConfigManager.getProperty("app.url");
        logger.info("Navigating to: " + url);
        driver.get(url);
        return this;
    }

    /**
     * Enter username
     */
    public LoginPage enterUsername(String username) {
        sendKeys(usernameField, username);
        return this;
    }

    /**
     * Enter password
     */
    public LoginPage enterPassword(String password) {
        sendKeys(passwordField, password);
        return this;
    }

    /**
     * Click login button
     */
    public ProductListingPage clickLoginButton() {
        click(loginButton);
        return new ProductListingPage(driver);
    }

    /**
     * Perform login (combined method)
     */
    public ProductListingPage login(String username, String password) {
        logger.info("Logging in with username: " + username);
        enterUsername(username);
        enterPassword(password);
        return clickLoginButton();
    }

    /**
     * Get error message text
     */
    public String getErrorMessage() {
        return getText(errorMessage);
    }

    /**
     * Check if error message is displayed
     */
    public boolean isErrorDisplayed() {
        return isElementDisplayed(errorMessage);
    }

    /**
     * Close error message
     */
    public LoginPage closeErrorMessage() {
        if (isErrorDisplayed()) {
            click(errorCloseButton);
        }
        return this;
    }

    /**
     * Verify page is loaded
     */
    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(loginLogo) && isElementDisplayed(loginButton);
    }

    /**
     * Verify login page title
     */
    public boolean hasCorrectTitle() {
        String expectedTitle = utils.ConfigManager.getProperty("app.title");
        return getPageTitle().equals(expectedTitle);
    }
}
```

### Step 3: Product Listing Page

**ProductListingPage.java**
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * Product Listing Page Object
 */
public class ProductListingPage extends BasePage {

    // Locators
    private final By pageTitle = By.className("title");
    private final By productSortDropdown = By.className("product_sort_container");
    private final By inventoryItems = By.className("inventory_item");
    private final By inventoryItemName = By.className("inventory_item_name");
    private final By inventoryItemPrice = By.className("inventory_item_price");
    private final By addToCartButton = By.cssSelector("button[id^='add-to-cart']");
    private final By removeButton = By.cssSelector("button[id^='remove']");
    private final By shoppingCartBadge = By.className("shopping_cart_badge");
    private final By shoppingCartLink = By.className("shopping_cart_link");
    private final By burgerMenuButton = By.id("react-burger-menu-btn");
    private final By logoutLink = By.id("logout_sidebar_link");

    /**
     * Constructor
     */
    public ProductListingPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Verify page is loaded
     */
    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(pageTitle) && getText(pageTitle).equals("Products");
    }

    /**
     * Get page title text
     */
    public String getPageTitleText() {
        return getText(pageTitle);
    }

    /**
     * Get all products count
     */
    public int getProductsCount() {
        return getElements(inventoryItems).size();
    }

    /**
     * Get all product names
     */
    public List<String> getAllProductNames() {
        return getElements(inventoryItemName).stream()
                .map(WebElement::getText)
                .toList();
    }

    /**
     * Get all product prices
     */
    public List<String> getAllProductPrices() {
        return getElements(inventoryItemPrice).stream()
                .map(WebElement::getText)
                .toList();
    }

    /**
     * Add product to cart by name
     */
    public ProductListingPage addProductToCart(String productName) {
        logger.info("Adding product to cart: " + productName);
        String addButtonId = "add-to-cart-" + productName.toLowerCase().replace(" ", "-");
        click(By.id(addButtonId));
        return this;
    }

    /**
     * Remove product from cart by name
     */
    public ProductListingPage removeProductFromCart(String productName) {
        logger.info("Removing product from cart: " + productName);
        String removeButtonId = "remove-" + productName.toLowerCase().replace(" ", "-");
        click(By.id(removeButtonId));
        return this;
    }

    /**
     * Click product to view details
     */
    public ProductDetailPage clickProduct(String productName) {
        logger.info("Clicking on product: " + productName);
        By productLink = By.linkText(productName);
        click(productLink);
        return new ProductDetailPage(driver);
    }

    /**
     * Sort products
     */
    public ProductListingPage sortProducts(String sortOption) {
        logger.info("Sorting products by: " + sortOption);
        selectByValue(productSortDropdown, sortOption);
        return this;
    }

    /**
     * Get cart items count
     */
    public int getCartItemsCount() {
        if (isElementDisplayed(shoppingCartBadge)) {
            return Integer.parseInt(getText(shoppingCartBadge));
        }
        return 0;
    }

    /**
     * Go to shopping cart
     */
    public ShoppingCartPage goToShoppingCart() {
        click(shoppingCartLink);
        return new ShoppingCartPage(driver);
    }

    /**
     * Logout
     */
    public LoginPage logout() {
        logger.info("Logging out");
        click(burgerMenuButton);
        waitForElementClickable(logoutLink);
        click(logoutLink);
        return new LoginPage(driver);
    }

    /**
     * Verify product is in cart
     */
    public boolean isProductInCart(String productName) {
        String removeButtonId = "remove-" + productName.toLowerCase().replace(" ", "-");
        return isElementDisplayed(By.id(removeButtonId));
    }
}
```

### Step 4: Product Detail Page

**ProductDetailPage.java**
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Product Detail Page Object
 */
public class ProductDetailPage extends BasePage {

    // Locators
    private final By productName = By.className("inventory_details_name");
    private final By productDescription = By.className("inventory_details_desc");
    private final By productPrice = By.className("inventory_details_price");
    private final By productImage = By.className("inventory_details_img");
    private final By addToCartButton = By.cssSelector("button[id^='add-to-cart']");
    private final By removeButton = By.cssSelector("button[id^='remove']");
    private final By backToProductsButton = By.id("back-to-products");

    /**
     * Constructor
     */
    public ProductDetailPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Verify page is loaded
     */
    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(productName) && isElementDisplayed(productPrice);
    }

    /**
     * Get product name
     */
    public String getProductName() {
        return getText(productName);
    }

    /**
     * Get product description
     */
    public String getProductDescription() {
        return getText(productDescription);
    }

    /**
     * Get product price
     */
    public String getProductPrice() {
        return getText(productPrice);
    }

    /**
     * Add product to cart
     */
    public ProductDetailPage addToCart() {
        logger.info("Adding product to cart from detail page");
        click(addToCartButton);
        return this;
    }

    /**
     * Remove product from cart
     */
    public ProductDetailPage removeFromCart() {
        logger.info("Removing product from cart from detail page");
        click(removeButton);
        return this;
    }

    /**
     * Go back to products page
     */
    public ProductListingPage goBackToProducts() {
        click(backToProductsButton);
        return new ProductListingPage(driver);
    }

    /**
     * Check if product is in cart
     */
    public boolean isProductInCart() {
        return isElementDisplayed(removeButton);
    }
}
```

### Step 5: Shopping Cart Page

**ShoppingCartPage.java**
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * Shopping Cart Page Object
 */
public class ShoppingCartPage extends BasePage {

    // Locators
    private final By pageTitle = By.className("title");
    private final By cartItems = By.className("cart_item");
    private final By cartItemName = By.className("inventory_item_name");
    private final By cartItemPrice = By.className("inventory_item_price");
    private final By cartItemQuantity = By.className("cart_quantity");
    private final By removeButton = By.cssSelector("button[id^='remove']");
    private final By continueShoppingButton = By.id("continue-shopping");
    private final By checkoutButton = By.id("checkout");

    /**
     * Constructor
     */
    public ShoppingCartPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Verify page is loaded
     */
    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(pageTitle) && getText(pageTitle).equals("Your Cart");
    }

    /**
     * Get cart items count
     */
    public int getCartItemsCount() {
        return getElements(cartItems).size();
    }

    /**
     * Get all cart item names
     */
    public List<String> getCartItemNames() {
        return getElements(cartItemName).stream()
                .map(WebElement::getText)
                .toList();
    }

    /**
     * Get cart item price
     */
    public String getCartItemPrice(String itemName) {
        // Find price for specific item
        List<WebElement> items = getElements(cartItems);
        for (WebElement item : items) {
            if (item.findElement(cartItemName).getText().equals(itemName)) {
                return item.findElement(cartItemPrice).getText();
            }
        }
        return null;
    }

    /**
     * Remove item from cart
     */
    public ShoppingCartPage removeItem(String productName) {
        logger.info("Removing item from cart: " + productName);
        String removeButtonId = "remove-" + productName.toLowerCase().replace(" ", "-");
        click(By.id(removeButtonId));
        return this;
    }

    /**
     * Continue shopping
     */
    public ProductListingPage continueShopping() {
        click(continueShoppingButton);
        return new ProductListingPage(driver);
    }

    /**
     * Proceed to checkout
     */
    public CheckoutPage proceedToCheckout() {
        logger.info("Proceeding to checkout");
        click(checkoutButton);
        return new CheckoutPage(driver);
    }

    /**
     * Verify item is in cart
     */
    public boolean isItemInCart(String itemName) {
        return getCartItemNames().contains(itemName);
    }

    /**
     * Get total items quantity
     */
    public int getTotalQuantity() {
        return getElements(cartItemQuantity).stream()
                .mapToInt(element -> Integer.parseInt(element.getText()))
                .sum();
    }
}
```

### Step 6: Checkout Page

**CheckoutPage.java**
```java
package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * Checkout Page Object (includes all checkout steps)
 */
public class CheckoutPage extends BasePage {

    // Step 1: Your Information
    private final By firstNameField = By.id("first-name");
    private final By lastNameField = By.id("last-name");
    private final By postalCodeField = By.id("postal-code");
    private final By continueButton = By.id("continue");
    private final By cancelButton = By.id("cancel");
    private final By errorMessage = By.cssSelector("[data-test='error']");

    // Step 2: Overview
    private final By pageTitle = By.className("title");
    private final By cartItems = By.className("cart_item");
    private final By itemTotal = By.className("summary_subtotal_label");
    private final By tax = By.className("summary_tax_label");
    private final By total = By.className("summary_total_label");
    private final By finishButton = By.id("finish");

    // Step 3: Complete
    private final By completeHeader = By.className("complete-header");
    private final By completeText = By.className("complete-text");
    private final By backHomeButton = By.id("back-to-products");

    /**
     * Constructor
     */
    public CheckoutPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Verify page is loaded
     */
    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(firstNameField) ||
               isElementDisplayed(finishButton) ||
               isElementDisplayed(completeHeader);
    }

    /**
     * Enter checkout information
     */
    public CheckoutPage enterFirstName(String firstName) {
        sendKeys(firstNameField, firstName);
        return this;
    }

    public CheckoutPage enterLastName(String lastName) {
        sendKeys(lastNameField, lastName);
        return this;
    }

    public CheckoutPage enterPostalCode(String postalCode) {
        sendKeys(postalCodeField, postalCode);
        return this;
    }

    /**
     * Fill all checkout information
     */
    public CheckoutPage fillCheckoutInformation(String firstName, String lastName, String postalCode) {
        logger.info("Filling checkout information");
        enterFirstName(firstName);
        enterLastName(lastName);
        enterPostalCode(postalCode);
        return this;
    }

    /**
     * Click continue to overview
     */
    public CheckoutPage clickContinue() {
        click(continueButton);
        return this;
    }

    /**
     * Click cancel
     */
    public ShoppingCartPage clickCancel() {
        click(cancelButton);
        return new ShoppingCartPage(driver);
    }

    /**
     * Get error message
     */
    public String getErrorMessage() {
        return getText(errorMessage);
    }

    /**
     * Verify overview page
     */
    public boolean isOnOverviewPage() {
        return isElementDisplayed(finishButton) &&
               getText(pageTitle).equals("Checkout: Overview");
    }

    /**
     * Get items count in overview
     */
    public int getOverviewItemsCount() {
        return getElements(cartItems).size();
    }

    /**
     * Get subtotal
     */
    public String getSubtotal() {
        return getText(itemTotal);
    }

    /**
     * Get tax
     */
    public String getTax() {
        return getText(tax);
    }

    /**
     * Get total
     */
    public String getTotal() {
        return getText(total);
    }

    /**
     * Click finish button
     */
    public CheckoutPage clickFinish() {
        logger.info("Completing order");
        click(finishButton);
        return this;
    }

    /**
     * Verify order is complete
     */
    public boolean isOrderComplete() {
        return isElementDisplayed(completeHeader) &&
               getText(completeHeader).equals("Thank you for your order!");
    }

    /**
     * Get completion message
     */
    public String getCompletionMessage() {
        return getText(completeText);
    }

    /**
     * Go back home after completion
     */
    public ProductListingPage backToHome() {
        click(backHomeButton);
        return new ProductListingPage(driver);
    }
}
```

---

## Part 3: Test Data Management (30 minutes)

### Step 1: Configuration Manager

**ConfigManager.java**
```java
package utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * Configuration Manager to load properties from config files
 */
public class ConfigManager {

    private static Properties properties;
    private static final Logger logger = LogManager.getLogger(ConfigManager.class);
    private static final String CONFIG_PATH = "src/test/resources/config/config-";

    /**
     * Load configuration based on environment
     */
    public static void loadConfig() {
        String environment = System.getProperty("environment", "qa");
        loadConfig(environment);
    }

    /**
     * Load configuration for specific environment
     */
    public static void loadConfig(String environment) {
        if (properties == null) {
            properties = new Properties();
            String configFile = CONFIG_PATH + environment + ".properties";

            try (FileInputStream fis = new FileInputStream(configFile)) {
                properties.load(fis);
                logger.info("Configuration loaded for environment: " + environment);
                logger.info("App URL: " + properties.getProperty("app.url"));
            } catch (IOException e) {
                logger.error("Failed to load configuration file: " + configFile, e);
                throw new RuntimeException("Configuration file not found: " + configFile);
            }
        }
    }

    /**
     * Get property value
     */
    public static String getProperty(String key) {
        if (properties == null) {
            loadConfig();
        }
        return properties.getProperty(key);
    }

    /**
     * Get property with default value
     */
    public static String getProperty(String key, String defaultValue) {
        if (properties == null) {
            loadConfig();
        }
        return properties.getProperty(key, defaultValue);
    }

    /**
     * Get integer property
     */
    public static int getIntProperty(String key) {
        return Integer.parseInt(getProperty(key));
    }

    /**
     * Get boolean property
     */
    public static boolean getBooleanProperty(String key) {
        return Boolean.parseBoolean(getProperty(key));
    }
}
```

### Step 2: Excel Reader

**ExcelReader.java**
```java
package utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Excel Reader utility to read test data from Excel files
 */
public class ExcelReader {

    private static final Logger logger = LogManager.getLogger(ExcelReader.class);

    /**
     * Read all data from Excel sheet
     */
    public static List<Map<String, String>> readExcelData(String filePath, String sheetName) {
        List<Map<String, String>> data = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheet(sheetName);
            if (sheet == null) {
                logger.error("Sheet not found: " + sheetName);
                return data;
            }

            // Get header row
            Row headerRow = sheet.getRow(0);
            List<String> headers = new ArrayList<>();

            for (Cell cell : headerRow) {
                headers.add(cell.getStringCellValue());
            }

            // Read data rows
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                Map<String, String> rowData = new LinkedHashMap<>();

                for (int j = 0; j < headers.size(); j++) {
                    Cell cell = row.getCell(j);
                    String cellValue = getCellValueAsString(cell);
                    rowData.put(headers.get(j), cellValue);
                }

                data.add(rowData);
            }

            logger.info("Read " + data.size() + " rows from " + sheetName);

        } catch (IOException e) {
            logger.error("Error reading Excel file: " + filePath, e);
        }

        return data;
    }

    /**
     * Get cell value as string
     */
    private static String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }

        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> {
                if (DateUtil.isCellDateFormatted(cell)) {
                    yield cell.getDateCellValue().toString();
                } else {
                    yield String.valueOf((long) cell.getNumericCellValue());
                }
            }
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            case FORMULA -> cell.getCellFormula();
            default -> "";
        };
    }

    /**
     * Convert list of maps to Object[][] for TestNG DataProvider
     */
    public static Object[][] getTestData(String filePath, String sheetName) {
        List<Map<String, String>> data = readExcelData(filePath, sheetName);

        Object[][] testData = new Object[data.size()][1];
        for (int i = 0; i < data.size(); i++) {
            testData[i][0] = data.get(i);
        }

        return testData;
    }
}
```

### Step 3: Test Data Provider

**TestDataProvider.java**
```java
package dataproviders;

import org.testng.annotations.DataProvider;
import utils.ConfigManager;
import utils.ExcelReader;

/**
 * TestNG Data Provider for test data
 */
public class TestDataProvider {

    private static final String TEST_DATA_FILE = ConfigManager.getProperty("test.data.file");

    @DataProvider(name = "loginData")
    public static Object[][] getLoginData() {
        return ExcelReader.getTestData(TEST_DATA_FILE, "LoginData");
    }

    @DataProvider(name = "checkoutData")
    public static Object[][] getCheckoutData() {
        return ExcelReader.getTestData(TEST_DATA_FILE, "CheckoutData");
    }

    @DataProvider(name = "validUsers")
    public static Object[][] getValidUsers() {
        return new Object[][] {
            {"standard_user", "secret_sauce"},
            {"problem_user", "secret_sauce"},
            {"performance_glitch_user", "secret_sauce"}
        };
    }

    @DataProvider(name = "invalidUsers")
    public static Object[][] getInvalidUsers() {
        return new Object[][] {
            {"invalid_user", "wrong_password", "Epic sadface: Username and password do not match"},
            {"", "secret_sauce", "Epic sadface: Username is required"},
            {"standard_user", "", "Epic sadface: Password is required"},
            {"locked_out_user", "secret_sauce", "Epic sadface: Sorry, this user has been locked out"}
        };
    }

    @DataProvider(name = "products")
    public static Object[][] getProducts() {
        return new Object[][] {
            {"Sauce Labs Backpack"},
            {"Sauce Labs Bike Light"},
            {"Sauce Labs Bolt T-Shirt"},
            {"Sauce Labs Fleece Jacket"}
        };
    }
}
```

### Step 4: Create Sample Test Data Excel

Create `src/test/resources/testdata/test_data.xlsx` with the following sheets:

**LoginData Sheet:**
| username | password | expectedResult |
|----------|----------|----------------|
| standard_user | secret_sauce | success |
| locked_out_user | secret_sauce | locked |
| problem_user | secret_sauce | success |
| invalid_user | wrong_pass | fail |

**CheckoutData Sheet:**
| firstName | lastName | postalCode |
|-----------|----------|------------|
| John | Doe | 12345 |
| Jane | Smith | 67890 |
| Bob | Johnson | 54321 |

---

## Part 4: Utility Classes (30 minutes)

### Step 1: Driver Manager

**DriverManager.java**
```java
package utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.time.Duration;

/**
 * Thread-safe WebDriver Manager
 */
public class DriverManager {

    private static final Logger logger = LogManager.getLogger(DriverManager.class);
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    /**
     * Initialize WebDriver based on configuration
     */
    public static void initializeDriver() {
        String browser = ConfigManager.getProperty("browser", "chrome");
        boolean headless = ConfigManager.getBooleanProperty("headless");

        logger.info("Initializing " + browser + " driver (headless: " + headless + ")");

        WebDriver webDriver = switch (browser.toLowerCase()) {
            case "chrome" -> createChromeDriver(headless);
            case "firefox" -> createFirefoxDriver(headless);
            default -> throw new IllegalArgumentException("Browser not supported: " + browser);
        };

        driver.set(webDriver);
        configureDriver();
    }

    /**
     * Create Chrome driver
     */
    private static WebDriver createChromeDriver(boolean headless) {
        ChromeOptions options = new ChromeOptions();

        if (headless) {
            options.addArguments("--headless=new");
        }

        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--no-sandbox");

        return new ChromeDriver(options);
    }

    /**
     * Create Firefox driver
     */
    private static WebDriver createFirefoxDriver(boolean headless) {
        FirefoxOptions options = new FirefoxOptions();

        if (headless) {
            options.addArguments("--headless");
        }

        return new FirefoxDriver(options);
    }

    /**
     * Configure driver with timeouts
     */
    private static void configureDriver() {
        WebDriver webDriver = driver.get();

        int implicitWait = ConfigManager.getIntProperty("implicit.wait");
        int pageLoadTimeout = ConfigManager.getIntProperty("page.load.timeout");
        int scriptTimeout = ConfigManager.getIntProperty("script.timeout");

        webDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(implicitWait));
        webDriver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(pageLoadTimeout));
        webDriver.manage().timeouts().scriptTimeout(Duration.ofSeconds(scriptTimeout));

        if (ConfigManager.getBooleanProperty("maximize")) {
            webDriver.manage().window().maximize();
        }

        logger.debug("Driver configured with timeouts");
    }

    /**
     * Get current driver instance
     */
    public static WebDriver getDriver() {
        return driver.get();
    }

    /**
     * Quit driver and remove from ThreadLocal
     */
    public static void quitDriver() {
        if (driver.get() != null) {
            logger.info("Quitting driver");
            driver.get().quit();
            driver.remove();
        }
    }
}
```

### Step 2: Screenshot Utility

**ScreenshotUtil.java**
```java
package utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Screenshot utility for capturing screenshots
 */
public class ScreenshotUtil {

    private static final Logger logger = LogManager.getLogger(ScreenshotUtil.class);
    private static final String SCREENSHOT_DIR = ConfigManager.getProperty("screenshot.path");

    /**
     * Capture screenshot with test name
     */
    public static String captureScreenshot(WebDriver driver, String testName) {
        try {
            // Create screenshot directory if not exists
            Files.createDirectories(Paths.get(SCREENSHOT_DIR));

            // Generate filename with timestamp
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String fileName = testName + "_" + timestamp + ".png";
            String filePath = SCREENSHOT_DIR + fileName;

            // Capture screenshot
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);
            File destination = new File(filePath);

            // Copy to destination
            Files.copy(source.toPath(), destination.toPath());

            logger.info("Screenshot captured: " + filePath);
            return filePath;

        } catch (IOException e) {
            logger.error("Failed to capture screenshot", e);
            return null;
        }
    }

    /**
     * Capture screenshot on failure
     */
    public static String captureFailureScreenshot(WebDriver driver, String testName) {
        logger.info("Capturing failure screenshot for: " + testName);
        return captureScreenshot(driver, testName + "_FAILED");
    }
}
```

### Step 3: Wait Utility

**WaitUtil.java**
```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Centralized wait utility
 */
public class WaitUtil {

    private static final int DEFAULT_TIMEOUT = ConfigManager.getIntProperty("explicit.wait");
    private static final int DEFAULT_POLLING = 500;

    /**
     * Wait for element to be visible
     */
    public static WebElement waitForVisible(WebDriver driver, By locator, int timeoutSeconds) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static WebElement waitForVisible(WebDriver driver, By locator) {
        return waitForVisible(driver, locator, DEFAULT_TIMEOUT);
    }

    /**
     * Wait for element to be clickable
     */
    public static WebElement waitForClickable(WebDriver driver, By locator, int timeoutSeconds) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    public static WebElement waitForClickable(WebDriver driver, By locator) {
        return waitForClickable(driver, locator, DEFAULT_TIMEOUT);
    }

    /**
     * Fluent wait for element
     */
    public static WebElement fluentWaitForElement(WebDriver driver, By locator) {
        FluentWait<WebDriver> wait = new FluentWait<>(driver)
                .withTimeout(Duration.ofSeconds(DEFAULT_TIMEOUT))
                .pollingEvery(Duration.ofMillis(DEFAULT_POLLING))
                .ignoring(NoSuchElementException.class)
                .ignoring(StaleElementReferenceException.class);

        return wait.until(driver1 -> driver1.findElement(locator));
    }

    /**
     * Wait for page to load
     */
    public static void waitForPageLoad(WebDriver driver) {
        ExpectedCondition<Boolean> pageLoadCondition = driver1 ->
                ((JavascriptExecutor) driver1).executeScript("return document.readyState").equals("complete");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
        wait.until(pageLoadCondition);
    }
}
```

### Step 4: Report Manager

**ReportManager.java**
```java
package utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 * Extent Report Manager
 */
public class ReportManager {

    private static final Logger logger = LogManager.getLogger(ReportManager.class);
    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    /**
     * Initialize Extent Reports
     */
    public static void initReports() {
        if (extent == null) {
            String reportPath = ConfigManager.getProperty("report.path") + "ExtentReport.html";

            try {
                Files.createDirectories(Paths.get(ConfigManager.getProperty("report.path")));
            } catch (IOException e) {
                logger.error("Failed to create report directory", e);
            }

            ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);
            sparkReporter.config().setTheme(Theme.STANDARD);
            sparkReporter.config().setDocumentTitle("E-Commerce Automation Report");
            sparkReporter.config().setReportName("Test Execution Report");
            sparkReporter.config().setTimeStampFormat("MMM dd, yyyy HH:mm:ss");

            extent = new ExtentReports();
            extent.attachReporter(sparkReporter);

            // System information
            extent.setSystemInfo("Application", "E-Commerce Web Application");
            extent.setSystemInfo("Environment", System.getProperty("environment", "QA"));
            extent.setSystemInfo("Browser", ConfigManager.getProperty("browser"));
            extent.setSystemInfo("OS", System.getProperty("os.name"));
            extent.setSystemInfo("Java Version", System.getProperty("java.version"));

            logger.info("Extent Reports initialized");
        }
    }

    /**
     * Create test in report
     */
    public static void createTest(String testName) {
        ExtentTest test = extent.createTest(testName);
        extentTest.set(test);
    }

    /**
     * Get current test
     */
    public static ExtentTest getTest() {
        return extentTest.get();
    }

    /**
     * Flush reports
     */
    public static void flushReports() {
        if (extent != null) {
            extent.flush();
            logger.info("Extent Reports flushed");
        }
    }
}
```

---

## Part 5: Test Cases Implementation (45 minutes)

### Step 1: Base Test Class

**BaseTest.java**
```java
package base;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.*;
import utils.ConfigManager;
import utils.DriverManager;
import utils.ReportManager;

/**
 * Base Test class for all test classes
 */
public class BaseTest {

    protected static final Logger logger = LogManager.getLogger(BaseTest.class);
    protected WebDriver driver;

    @BeforeSuite
    public void suiteSetup() {
        logger.info("===== Test Suite Starting =====");
        ConfigManager.loadConfig();
        ReportManager.initReports();
    }

    @BeforeMethod
    public void setUp() {
        logger.info("Setting up test");
        DriverManager.initializeDriver();
        driver = DriverManager.getDriver();
    }

    @AfterMethod
    public void tearDown() {
        logger.info("Tearing down test");
        DriverManager.quitDriver();
    }

    @AfterSuite
    public void suiteTearDown() {
        logger.info("===== Test Suite Completed =====");
        ReportManager.flushReports();
    }

    /**
     * Helper method to navigate to application
     */
    protected void navigateToApp() {
        String url = ConfigManager.getProperty("app.url");
        driver.get(url);
        logger.info("Navigated to: " + url);
    }
}
```

### Step 2: Login Tests

**LoginTests.java**
```java
package tests;

import base.BaseTest;
import dataproviders.TestDataProvider;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.ProductListingPage;

import java.util.Map;

/**
 * Login functionality tests
 */
public class LoginTests extends BaseTest {

    @Test(priority = 1, description = "Verify successful login with valid credentials")
    public void testValidLogin() {
        logger.info("Starting testValidLogin");

        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        String username = ConfigManager.getProperty("valid.username");
        String password = ConfigManager.getProperty("valid.password");

        ProductListingPage productsPage = loginPage.login(username, password);

        Assert.assertTrue(productsPage.isPageLoaded(), "Products page should be loaded");
        Assert.assertEquals(productsPage.getPageTitleText(), "Products", "Page title should be 'Products'");

        logger.info("testValidLogin completed successfully");
    }

    @Test(priority = 2, dataProvider = "invalidUsers", dataProviderClass = TestDataProvider.class,
          description = "Verify login fails with invalid credentials")
    public void testInvalidLogin(String username, String password, String expectedError) {
        logger.info("Starting testInvalidLogin with username: " + username);

        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        loginPage.enterUsername(username);
        loginPage.enterPassword(password);
        loginPage.clickLoginButton();

        Assert.assertTrue(loginPage.isErrorDisplayed(), "Error message should be displayed");
        Assert.assertTrue(loginPage.getErrorMessage().contains(expectedError),
                         "Error message should match expected");

        logger.info("testInvalidLogin completed successfully");
    }

    @Test(priority = 3, description = "Verify locked user cannot login")
    public void testLockedUserLogin() {
        logger.info("Starting testLockedUserLogin");

        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        loginPage.login("locked_out_user", "secret_sauce");

        Assert.assertTrue(loginPage.isErrorDisplayed(), "Error should be displayed for locked user");
        Assert.assertTrue(loginPage.getErrorMessage().contains("locked out"),
                         "Error should indicate user is locked");

        logger.info("testLockedUserLogin completed successfully");
    }

    @Test(priority = 4, description = "Verify login page title is correct")
    public void testLoginPageTitle() {
        logger.info("Starting testLoginPageTitle");

        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        Assert.assertTrue(loginPage.hasCorrectTitle(), "Login page should have correct title");
        Assert.assertTrue(loginPage.isPageLoaded(), "Login page should be loaded");

        logger.info("testLoginPageTitle completed successfully");
    }

    @Test(priority = 5, dataProvider = "loginData", dataProviderClass = TestDataProvider.class,
          description = "Data-driven login test from Excel")
    public void testLoginFromExcel(Map<String, String> testData) {
        logger.info("Starting testLoginFromExcel with data: " + testData);

        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        String username = testData.get("username");
        String password = testData.get("password");
        String expectedResult = testData.get("expectedResult");

        loginPage.enterUsername(username);
        loginPage.enterPassword(password);

        if ("success".equalsIgnoreCase(expectedResult)) {
            ProductListingPage productsPage = loginPage.clickLoginButton();
            Assert.assertTrue(productsPage.isPageLoaded(), "Login should succeed");
        } else {
            loginPage.clickLoginButton();
            Assert.assertTrue(loginPage.isErrorDisplayed(), "Login should fail");
        }

        logger.info("testLoginFromExcel completed");
    }
}
```

### Step 3: Product Search Tests

**ProductSearchTests.java**
```java
package tests;

import base.BaseTest;
import dataproviders.TestDataProvider;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.ProductDetailPage;
import pages.ProductListingPage;
import utils.ConfigManager;

import java.util.List;

/**
 * Product search and browsing tests
 */
public class ProductSearchTests extends BaseTest {

    private ProductListingPage productsPage;

    @BeforeMethod
    public void loginBeforeTest() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        String username = ConfigManager.getProperty("valid.username");
        String password = ConfigManager.getProperty("valid.password");

        productsPage = loginPage.login(username, password);
    }

    @Test(priority = 1, description = "Verify all products are displayed")
    public void testAllProductsDisplayed() {
        logger.info("Starting testAllProductsDisplayed");

        int productsCount = productsPage.getProductsCount();
        Assert.assertTrue(productsCount > 0, "Products should be displayed");
        Assert.assertEquals(productsCount, 6, "Should display 6 products");

        logger.info("Displayed " + productsCount + " products");
    }

    @Test(priority = 2, description = "Verify product sorting by name")
    public void testSortProductsByName() {
        logger.info("Starting testSortProductsByName");

        // Sort A to Z
        productsPage.sortProducts("az");
        List<String> productNames = productsPage.getAllProductNames();

        // Verify sorting
        List<String> sortedNames = productNames.stream().sorted().toList();
        Assert.assertEquals(productNames, sortedNames, "Products should be sorted A to Z");

        // Sort Z to A
        productsPage.sortProducts("za");
        productNames = productsPage.getAllProductNames();
        sortedNames = productNames.stream().sorted((a, b) -> b.compareTo(a)).toList();
        Assert.assertEquals(productNames, sortedNames, "Products should be sorted Z to A");

        logger.info("Product sorting verified");
    }

    @Test(priority = 3, dataProvider = "products", dataProviderClass = TestDataProvider.class,
          description = "Verify product details page")
    public void testProductDetailsPage(String productName) {
        logger.info("Starting testProductDetailsPage for: " + productName);

        ProductDetailPage detailPage = productsPage.clickProduct(productName);

        Assert.assertTrue(detailPage.isPageLoaded(), "Product detail page should load");
        Assert.assertEquals(detailPage.getProductName(), productName,
                           "Product name should match");
        Assert.assertFalse(detailPage.getProductPrice().isEmpty(),
                          "Product should have price");

        logger.info("Product details verified for: " + productName);
    }

    @Test(priority = 4, description = "Verify price sorting")
    public void testSortProductsByPrice() {
        logger.info("Starting testSortProductsByPrice");

        // Sort low to high
        productsPage.sortProducts("lohi");
        List<String> prices = productsPage.getAllProductPrices();

        // Extract numeric values and verify sorting
        boolean isSortedLowToHigh = true;
        for (int i = 0; i < prices.size() - 1; i++) {
            double price1 = Double.parseDouble(prices.get(i).replace("$", ""));
            double price2 = Double.parseDouble(prices.get(i + 1).replace("$", ""));
            if (price1 > price2) {
                isSortedLowToHigh = false;
                break;
            }
        }

        Assert.assertTrue(isSortedLowToHigh, "Prices should be sorted low to high");

        logger.info("Price sorting verified");
    }
}
```

### Step 4: Add to Cart Tests

**AddToCartTests.java**
```java
package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.LoginPage;
import pages.ProductListingPage;
import pages.ShoppingCartPage;
import utils.ConfigManager;

/**
 * Add to cart functionality tests
 */
public class AddToCartTests extends BaseTest {

    private ProductListingPage productsPage;

    @BeforeMethod
    public void loginBeforeTest() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        String username = ConfigManager.getProperty("valid.username");
        String password = ConfigManager.getProperty("valid.password");

        productsPage = loginPage.login(username, password);
    }

    @Test(priority = 1, description = "Verify adding single product to cart")
    public void testAddSingleProductToCart() {
        logger.info("Starting testAddSingleProductToCart");

        String productName = "Sauce Labs Backpack";

        productsPage.addProductToCart(productName);

        Assert.assertEquals(productsPage.getCartItemsCount(), 1,
                           "Cart should have 1 item");
        Assert.assertTrue(productsPage.isProductInCart(productName),
                         "Product should be in cart");

        logger.info("Single product added to cart successfully");
    }

    @Test(priority = 2, description = "Verify adding multiple products to cart")
    public void testAddMultipleProductsToCart() {
        logger.info("Starting testAddMultipleProductsToCart");

        String[] products = {
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt"
        };

        for (String product : products) {
            productsPage.addProductToCart(product);
        }

        Assert.assertEquals(productsPage.getCartItemsCount(), products.length,
                           "Cart should have " + products.length + " items");

        logger.info("Multiple products added to cart successfully");
    }

    @Test(priority = 3, description = "Verify removing product from cart")
    public void testRemoveProductFromCart() {
        logger.info("Starting testRemoveProductFromCart");

        String productName = "Sauce Labs Backpack";

        // Add product
        productsPage.addProductToCart(productName);
        Assert.assertEquals(productsPage.getCartItemsCount(), 1, "Cart should have 1 item");

        // Remove product
        productsPage.removeProductFromCart(productName);
        Assert.assertEquals(productsPage.getCartItemsCount(), 0, "Cart should be empty");

        logger.info("Product removed from cart successfully");
    }

    @Test(priority = 4, description = "Verify cart badge updates correctly")
    public void testCartBadgeUpdate() {
        logger.info("Starting testCartBadgeUpdate");

        Assert.assertEquals(productsPage.getCartItemsCount(), 0,
                           "Cart should be empty initially");

        productsPage.addProductToCart("Sauce Labs Backpack");
        Assert.assertEquals(productsPage.getCartItemsCount(), 1, "Cart badge should show 1");

        productsPage.addProductToCart("Sauce Labs Bike Light");
        Assert.assertEquals(productsPage.getCartItemsCount(), 2, "Cart badge should show 2");

        logger.info("Cart badge updates verified");
    }

    @Test(priority = 5, description = "Verify cart page displays added products")
    public void testCartPageDisplaysProducts() {
        logger.info("Starting testCartPageDisplaysProducts");

        String productName = "Sauce Labs Backpack";

        productsPage.addProductToCart(productName);
        ShoppingCartPage cartPage = productsPage.goToShoppingCart();

        Assert.assertTrue(cartPage.isPageLoaded(), "Cart page should load");
        Assert.assertEquals(cartPage.getCartItemsCount(), 1, "Cart should have 1 item");
        Assert.assertTrue(cartPage.isItemInCart(productName),
                         "Product should be in cart");

        logger.info("Cart page displays products correctly");
    }
}
```

### Step 5: Checkout Tests

**CheckoutTests.java**
```java
package tests;

import base.BaseTest;
import dataproviders.TestDataProvider;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.*;
import utils.ConfigManager;

import java.util.Map;

/**
 * Checkout process tests
 */
public class CheckoutTests extends BaseTest {

    private ProductListingPage productsPage;
    private ShoppingCartPage cartPage;

    @BeforeMethod
    public void setupCart() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        String username = ConfigManager.getProperty("valid.username");
        String password = ConfigManager.getProperty("valid.password");

        productsPage = loginPage.login(username, password);
        productsPage.addProductToCart("Sauce Labs Backpack");
        cartPage = productsPage.goToShoppingCart();
    }

    @Test(priority = 1, description = "Verify successful checkout process")
    public void testSuccessfulCheckout() {
        logger.info("Starting testSuccessfulCheckout");

        CheckoutPage checkoutPage = cartPage.proceedToCheckout();

        checkoutPage.fillCheckoutInformation("John", "Doe", "12345");
        checkoutPage.clickContinue();

        Assert.assertTrue(checkoutPage.isOnOverviewPage(), "Should be on overview page");
        Assert.assertEquals(checkoutPage.getOverviewItemsCount(), 1,
                           "Overview should show 1 item");

        checkoutPage.clickFinish();

        Assert.assertTrue(checkoutPage.isOrderComplete(), "Order should be complete");
        Assert.assertTrue(checkoutPage.getCompletionMessage().contains("dispatched"),
                         "Should show dispatch message");

        logger.info("Checkout completed successfully");
    }

    @Test(priority = 2, description = "Verify checkout with missing information")
    public void testCheckoutWithMissingInfo() {
        logger.info("Starting testCheckoutWithMissingInfo");

        CheckoutPage checkoutPage = cartPage.proceedToCheckout();

        checkoutPage.clickContinue();

        Assert.assertTrue(checkoutPage.getErrorMessage().contains("Error"),
                         "Should show error for missing first name");

        logger.info("Missing information validation works");
    }

    @Test(priority = 3, dataProvider = "checkoutData", dataProviderClass = TestDataProvider.class,
          description = "Data-driven checkout test")
    public void testCheckoutWithDifferentData(Map<String, String> data) {
        logger.info("Starting testCheckoutWithDifferentData");

        CheckoutPage checkoutPage = cartPage.proceedToCheckout();

        checkoutPage.fillCheckoutInformation(
            data.get("firstName"),
            data.get("lastName"),
            data.get("postalCode")
        );
        checkoutPage.clickContinue();

        Assert.assertTrue(checkoutPage.isOnOverviewPage(),
                         "Should proceed to overview with valid data");

        logger.info("Checkout with data completed");
    }

    @Test(priority = 4, description = "Verify checkout cancel returns to cart")
    public void testCheckoutCancel() {
        logger.info("Starting testCheckoutCancel");

        CheckoutPage checkoutPage = cartPage.proceedToCheckout();
        ShoppingCartPage returnedCartPage = checkoutPage.clickCancel();

        Assert.assertTrue(returnedCartPage.isPageLoaded(),
                         "Should return to cart page");

        logger.info("Checkout cancel works correctly");
    }

    @Test(priority = 5, description = "Verify order total calculation")
    public void testOrderTotalCalculation() {
        logger.info("Starting testOrderTotalCalculation");

        CheckoutPage checkoutPage = cartPage.proceedToCheckout();

        checkoutPage.fillCheckoutInformation("John", "Doe", "12345");
        checkoutPage.clickContinue();

        String subtotal = checkoutPage.getSubtotal();
        String tax = checkoutPage.getTax();
        String total = checkoutPage.getTotal();

        Assert.assertFalse(subtotal.isEmpty(), "Subtotal should be displayed");
        Assert.assertFalse(tax.isEmpty(), "Tax should be displayed");
        Assert.assertFalse(total.isEmpty(), "Total should be displayed");

        logger.info("Order totals: " + subtotal + ", " + tax + ", " + total);
    }
}
```

### Step 6: End-to-End Test

**EndToEndTests.java**
```java
package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.*;
import utils.ConfigManager;

/**
 * End-to-end workflow tests
 */
public class EndToEndTests extends BaseTest {

    @Test(priority = 1, description = "Complete purchase flow from login to checkout")
    public void testCompletePurchaseFlow() {
        logger.info("Starting testCompletePurchaseFlow - End to End Test");

        // Step 1: Login
        logger.info("Step 1: Login to application");
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();

        String username = ConfigManager.getProperty("valid.username");
        String password = ConfigManager.getProperty("valid.password");

        ProductListingPage productsPage = loginPage.login(username, password);
        Assert.assertTrue(productsPage.isPageLoaded(), "Login should succeed");

        // Step 2: Browse and add products
        logger.info("Step 2: Add products to cart");
        productsPage.addProductToCart("Sauce Labs Backpack");
        productsPage.addProductToCart("Sauce Labs Bike Light");

        Assert.assertEquals(productsPage.getCartItemsCount(), 2,
                           "Cart should have 2 items");

        // Step 3: View cart
        logger.info("Step 3: View shopping cart");
        ShoppingCartPage cartPage = productsPage.goToShoppingCart();
        Assert.assertEquals(cartPage.getCartItemsCount(), 2,
                           "Cart page should show 2 items");

        // Step 4: Proceed to checkout
        logger.info("Step 4: Proceed to checkout");
        CheckoutPage checkoutPage = cartPage.proceedToCheckout();
        checkoutPage.fillCheckoutInformation("John", "Doe", "12345");
        checkoutPage.clickContinue();

        Assert.assertTrue(checkoutPage.isOnOverviewPage(),
                         "Should be on checkout overview");

        // Step 5: Complete order
        logger.info("Step 5: Complete order");
        checkoutPage.clickFinish();

        Assert.assertTrue(checkoutPage.isOrderComplete(),
                         "Order should be completed");

        // Step 6: Return to home
        logger.info("Step 6: Return to product page");
        ProductListingPage returnedProductsPage = checkoutPage.backToHome();
        Assert.assertTrue(returnedProductsPage.isPageLoaded(),
                         "Should return to products page");

        logger.info("End-to-end purchase flow completed successfully!");
    }

    @Test(priority = 2, description = "Browse products, add to cart, then continue shopping")
    public void testContinueShoppingFlow() {
        logger.info("Starting testContinueShoppingFlow");

        // Login
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();
        ProductListingPage productsPage = loginPage.login(
            ConfigManager.getProperty("valid.username"),
            ConfigManager.getProperty("valid.password")
        );

        // Add product and go to cart
        productsPage.addProductToCart("Sauce Labs Backpack");
        ShoppingCartPage cartPage = productsPage.goToShoppingCart();

        // Continue shopping
        ProductListingPage returnedProductsPage = cartPage.continueShopping();
        Assert.assertTrue(returnedProductsPage.isPageLoaded(),
                         "Should return to products page");

        // Add another product
        returnedProductsPage.addProductToCart("Sauce Labs Bike Light");
        Assert.assertEquals(returnedProductsPage.getCartItemsCount(), 2,
                           "Cart should have 2 items");

        logger.info("Continue shopping flow completed");
    }

    @Test(priority = 3, description = "Complete flow with product removal")
    public void testPurchaseFlowWithRemoval() {
        logger.info("Starting testPurchaseFlowWithRemoval");

        // Login and add products
        LoginPage loginPage = new LoginPage(driver);
        loginPage.navigateToLoginPage();
        ProductListingPage productsPage = loginPage.login(
            ConfigManager.getProperty("valid.username"),
            ConfigManager.getProperty("valid.password")
        );

        productsPage.addProductToCart("Sauce Labs Backpack");
        productsPage.addProductToCart("Sauce Labs Bike Light");
        productsPage.addProductToCart("Sauce Labs Bolt T-Shirt");

        // Go to cart and remove one item
        ShoppingCartPage cartPage = productsPage.goToShoppingCart();
        cartPage.removeItem("Sauce Labs Bike Light");

        Assert.assertEquals(cartPage.getCartItemsCount(), 2,
                           "Cart should have 2 items after removal");

        // Complete checkout
        CheckoutPage checkoutPage = cartPage.proceedToCheckout();
        checkoutPage.fillCheckoutInformation("Jane", "Smith", "67890");
        checkoutPage.clickContinue();
        checkoutPage.clickFinish();

        Assert.assertTrue(checkoutPage.isOrderComplete(),
                         "Order should complete with 2 items");

        logger.info("Purchase flow with removal completed");
    }
}
```

---

## Part 6: TestNG Configuration (20 minutes)

### Step 1: Main TestNG Suite

**testng.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="E-Commerce Automation Suite" parallel="methods" thread-count="3">

    <!-- Listeners -->
    <listeners>
        <listener class-name="listeners.TestListener"/>
    </listeners>

    <!-- All Tests -->
    <test name="Login Tests">
        <classes>
            <class name="tests.LoginTests"/>
        </classes>
    </test>

    <test name="Product Tests">
        <classes>
            <class name="tests.ProductSearchTests"/>
        </classes>
    </test>

    <test name="Cart Tests">
        <classes>
            <class name="tests.AddToCartTests"/>
        </classes>
    </test>

    <test name="Checkout Tests">
        <classes>
            <class name="tests.CheckoutTests"/>
        </classes>
    </test>

    <test name="End-to-End Tests">
        <classes>
            <class name="tests.EndToEndTests"/>
        </classes>
    </test>

</suite>
```

### Step 2: Regression Suite

**testng-regression.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Regression Suite" parallel="tests" thread-count="2">

    <listeners>
        <listener class-name="listeners.TestListener"/>
    </listeners>

    <test name="All Tests">
        <classes>
            <class name="tests.LoginTests"/>
            <class name="tests.ProductSearchTests"/>
            <class name="tests.AddToCartTests"/>
            <class name="tests.CheckoutTests"/>
            <class name="tests.EndToEndTests"/>
        </classes>
    </test>

</suite>
```

### Step 3: Smoke Test Suite

**testng-smoke.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Smoke Test Suite">

    <listeners>
        <listener class-name="listeners.TestListener"/>
    </listeners>

    <test name="Smoke Tests">
        <classes>
            <class name="tests.LoginTests">
                <methods>
                    <include name="testValidLogin"/>
                </methods>
            </class>
            <class name="tests.ProductSearchTests">
                <methods>
                    <include name="testAllProductsDisplayed"/>
                </methods>
            </class>
            <class name="tests.EndToEndTests">
                <methods>
                    <include name="testCompletePurchaseFlow"/>
                </methods>
            </class>
        </classes>
    </test>

</suite>
```

### Step 4: Test Listener

**TestListener.java**
```java
package listeners;

import com.aventstack.extentreports.Status;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import utils.DriverManager;
import utils.ReportManager;
import utils.ScreenshotUtil;

/**
 * TestNG Listener for logging and reporting
 */
public class TestListener implements ITestListener {

    private static final Logger logger = LogManager.getLogger(TestListener.class);

    @Override
    public void onStart(ITestContext context) {
        logger.info("========================================");
        logger.info("Test Suite Started: " + context.getName());
        logger.info("========================================");
    }

    @Override
    public void onFinish(ITestContext context) {
        logger.info("\n========================================");
        logger.info("Test Suite Completed: " + context.getName());
        logger.info("Total Tests: " + context.getAllTestMethods().length);
        logger.info("Passed: " + context.getPassedTests().size());
        logger.info("Failed: " + context.getFailedTests().size());
        logger.info("Skipped: " + context.getSkippedTests().size());
        logger.info("========================================\n");
    }

    @Override
    public void onTestStart(ITestResult result) {
        logger.info(">>> Starting Test: " + result.getMethod().getMethodName());
        ReportManager.createTest(result.getMethod().getMethodName());
        ReportManager.getTest().log(Status.INFO, "Test started: " +
                                    result.getMethod().getDescription());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        logger.info("<<< Test PASSED: " + result.getMethod().getMethodName());
        ReportManager.getTest().log(Status.PASS, "Test passed successfully");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        logger.error("<<< Test FAILED: " + result.getMethod().getMethodName());
        logger.error("Reason: " + result.getThrowable().getMessage());

        // Capture screenshot
        WebDriver driver = DriverManager.getDriver();
        if (driver != null) {
            String screenshotPath = ScreenshotUtil.captureFailureScreenshot(
                driver, result.getMethod().getMethodName());

            if (screenshotPath != null) {
                try {
                    ReportManager.getTest().addScreenCaptureFromPath(
                        screenshotPath, "Failure Screenshot");
                } catch (Exception e) {
                    logger.error("Failed to attach screenshot", e);
                }
            }
        }

        ReportManager.getTest().log(Status.FAIL, "Test failed");
        ReportManager.getTest().fail(result.getThrowable());
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        logger.warn("<<< Test SKIPPED: " + result.getMethod().getMethodName());
        ReportManager.getTest().log(Status.SKIP, "Test skipped");
        ReportManager.getTest().skip(result.getThrowable());
    }
}
```

---

## Part 7: Reporting & Logging (30 minutes)

All reporting and logging setup is already included in the utility classes and listeners created above.

**Key Features Implemented:**

1. **ExtentReports:**
   - Beautiful HTML reports
   - Screenshot attachment on failure
   - Test execution timeline
   - System information display

2. **Log4j2:**
   - Console and file logging
   - Rolling file appenders
   - Different log levels
   - Timestamped logs

3. **TestNG Reports:**
   - Built-in HTML and XML reports
   - Custom test listeners
   - Test result summary

---

## Part 8: Execution & Validation (20 minutes)

### Step 1: Execution Commands

```bash
# Run all tests with default (QA) profile
mvn clean test

# Run with specific profile
mvn clean test -Pqa
mvn clean test -Pprod

# Run specific suite
mvn clean test -DsuiteXmlFile=src/test/resources/testng-smoke.xml

# Run with specific environment
mvn clean test -Denvironment=qa

# Run regression tests
mvn clean test -Pregression

# Generate site reports
mvn surefire-report:report
```

### Step 2: Create Execution Scripts

**run-tests.sh**
```bash
#!/bin/bash

echo "================================"
echo "E-Commerce Automation Framework"
echo "================================"

if [ "$1" == "smoke" ]; then
    echo "Running Smoke Tests..."
    mvn clean test -Pprod
elif [ "$1" == "regression" ]; then
    echo "Running Regression Tests..."
    mvn clean test -Pregression
else
    echo "Running All Tests..."
    mvn clean test -Pqa
fi

echo "Tests completed. Check reports at: test-output/reports/ExtentReport.html"
```

**run-tests.bat**
```batch
@echo off
echo ================================
echo E-Commerce Automation Framework
echo ================================

if "%1"=="smoke" (
    echo Running Smoke Tests...
    call mvn clean test -Pprod
) else if "%1"=="regression" (
    echo Running Regression Tests...
    call mvn clean test -Pregression
) else (
    echo Running All Tests...
    call mvn clean test -Pqa
)

echo Tests completed. Check reports at: test-output/reports/ExtentReport.html
```

### Step 3: Create README

**README.md**
```markdown
# E-Commerce Test Automation Framework

Complete Selenium automation framework for e-commerce testing.

## Project Structure

```
ecommerce-automation-framework/
├── src/main/java/          # Page Objects and Utilities
├── src/test/java/          # Test Classes
├── src/test/resources/     # Configuration and Test Data
└── test-output/            # Reports and Logs
```

## Setup Instructions

1. **Prerequisites:**
   - Java 11+
   - Maven 3.6+
   - Chrome/Firefox browser

2. **Install Dependencies:**
   ```bash
   mvn clean install
   ```

3. **Configure Environment:**
   - Edit `src/test/resources/config/config-qa.properties`
   - Update application URL and credentials

## Running Tests

```bash
# All tests
mvn clean test

# Smoke tests
./run-tests.sh smoke

# Regression tests
./run-tests.sh regression
```

## Reports

- ExtentReport: `test-output/reports/ExtentReport.html`
- Logs: `test-output/logs/automation.log`
- Screenshots: `test-output/screenshots/`

## Framework Features

- ✅ Page Object Model
- ✅ Data-Driven Testing
- ✅ ExtentReports Integration
- ✅ Log4j2 Logging
- ✅ Screenshot on Failure
- ✅ Parallel Execution
- ✅ CI/CD Ready

## Author

Created as the final project for 45-Day Selenium Course
```

---

## Final Validation Checklist

**Project Completion Checklist:**

- [ ] All dependencies configured in pom.xml
- [ ] All page objects created with proper locators
- [ ] Utility classes implemented
- [ ] Test classes with proper assertions
- [ ] TestNG configuration files created
- [ ] Listeners configured for logging and reporting
- [ ] Configuration files for different environments
- [ ] Excel test data file created
- [ ] All tests execute successfully
- [ ] ExtentReports generated
- [ ] Logs created in log directory
- [ ] Screenshots captured on failures
- [ ] Framework is maintainable and scalable
- [ ] README documentation complete
- [ ] Git repository initialized with .gitignore

---

## Expected Execution Output

```
===== Test Suite Starting =====
Configuration loaded for environment: qa
App URL: https://www.saucedemo.com
Extent Reports initialized

========================================
Test Suite Started: E-Commerce Automation Suite
========================================

>>> Starting Test: testValidLogin
Logging in with username: standard_user
<<< Test PASSED: testValidLogin

>>> Starting Test: testInvalidLogin
<<< Test PASSED: testInvalidLogin

>>> Starting Test: testAllProductsDisplayed
Displayed 6 products
<<< Test PASSED: testAllProductsDisplayed

>>> Starting Test: testAddSingleProductToCart
Adding product to cart: Sauce Labs Backpack
<<< Test PASSED: testAddSingleProductToCart

>>> Starting Test: testSuccessfulCheckout
Filling checkout information
Completing order
<<< Test PASSED: testSuccessfulCheckout

>>> Starting Test: testCompletePurchaseFlow
Step 1: Login to application
Step 2: Add products to cart
Step 3: View shopping cart
Step 4: Proceed to checkout
Step 5: Complete order
Step 6: Return to product page
End-to-end purchase flow completed successfully!
<<< Test PASSED: testCompletePurchaseFlow

========================================
Test Suite Completed: E-Commerce Automation Suite
Total Tests: 24
Passed: 24
Failed: 0
Skipped: 0
========================================

Extent Reports flushed
===== Test Suite Completed =====

BUILD SUCCESS
Total time: 3:45 min
```

---

## Congratulations!

**You've completed the comprehensive 45-day Selenium automation journey!**

### What You've Achieved:

1. ✅ Built a complete, production-ready automation framework
2. ✅ Implemented industry-standard design patterns
3. ✅ Mastered Page Object Model architecture
4. ✅ Created data-driven, maintainable test suites
5. ✅ Configured comprehensive reporting and logging
6. ✅ Set up CI/CD integration capabilities
7. ✅ Applied all best practices learned throughout the course

### Framework Highlights:

- **Architecture:** Clean, maintainable Page Object Model
- **Scalability:** Easy to add new tests and pages
- **Reliability:** Robust waits and error handling
- **Reporting:** Professional ExtentReports
- **Logging:** Comprehensive Log4j2 integration
- **Data-Driven:** Excel and TestNG data providers
- **CI/CD Ready:** Maven profiles and TestNG suites

### Next Steps:

1. **Enhance:** Add more test scenarios
2. **Integrate:** Connect to CI/CD pipeline (Jenkins, GitHub Actions)
3. **Extend:** Add API testing, database validation
4. **Scale:** Implement Selenium Grid for parallel execution
5. **Share:** Upload to GitHub and showcase your work

### Thank You!

Thank you for completing this 45-day journey. You now have the skills and a production-ready framework to excel in test automation!

**Keep Learning, Keep Automating!**

---

## Additional Resources

- Framework Repository: [GitHub Link]
- ExtentReports Docs: https://www.extentreports.com/
- TestNG Documentation: https://testng.org/doc/
- Selenium Best Practices: https://www.selenium.dev/documentation/

---

**Course Completed:** Day 45 of 45 ✅

**Total Lines Created:** ~2,500+ lines of production-quality code

**Framework Status:** Production-Ready

**Your Achievement:** Master of Selenium Automation! 🎓
