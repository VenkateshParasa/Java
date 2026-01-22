# Day 49: Final Capstone Project - Complete E-Commerce Testing Framework

## Learning Objectives

By the end of this comprehensive capstone project, you will be able to:

1. Design and implement a complete test automation framework from scratch
2. Apply Page Object Model (POM) design pattern effectively
3. Implement data-driven testing with external data sources
4. Configure and use TestNG for test suite organization
5. Integrate Extent Reports for comprehensive test reporting
6. Set up cross-browser testing capabilities
7. Implement logging using Log4j2
8. Configure CI/CD pipelines with Jenkins/GitHub Actions
9. Implement Docker integration for test execution
10. Apply exception handling and retry mechanisms
11. Implement utility classes for code reusability
12. Configure test environment management
13. Implement screenshot capture on failures
14. Apply best practices and design patterns
15. Create maintainable and scalable test automation solutions

---

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Framework Architecture](#framework-architecture)
4. [Project Structure](#project-structure)
5. [Complete Implementation](#complete-implementation)
6. [Configuration Management](#configuration-management)
7. [Page Object Model Implementation](#page-object-model-implementation)
8. [Test Implementation](#test-implementation)
9. [Data-Driven Testing](#data-driven-testing)
10. [TestNG Suite Configuration](#testng-suite-configuration)
11. [Reporting Setup](#reporting-setup)
12. [CI/CD Pipeline](#cicd-pipeline)
13. [Docker Integration](#docker-integration)
14. [Best Practices](#best-practices)
15. [Framework Review Checklist](#framework-review-checklist)
16. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
17. [Next Steps and Career Path](#next-steps-and-career-path)
18. [Course Summary and Recap](#course-summary-and-recap)
19. [Key Takeaways](#key-takeaways)
20. [Final Assessment](#final-assessment)

---

## 1. Introduction

Welcome to the final capstone project of the 7-week Selenium Automation course! This comprehensive project brings together all concepts, techniques, and best practices you've learned throughout the course.

### What You Will Build

A **complete, production-ready E-Commerce Test Automation Framework** that includes:

- **Automated testing** for an e-commerce application
- **Page Object Model** implementation
- **Data-driven testing** capabilities
- **Cross-browser testing** support
- **Comprehensive reporting** with Extent Reports
- **CI/CD integration** ready
- **Docker containerization** for test execution
- **Logging and monitoring** capabilities
- **Exception handling** and retry mechanisms

### Why This Project Matters

This capstone project represents a real-world automation framework that you can:
- Add to your portfolio
- Use as a template for future projects
- Showcase to potential employers
- Build upon for your own projects

---

## 2. Project Overview

### Application Under Test (AUT)

We will automate an **E-Commerce Web Application** with the following modules:

#### Core Features to Automate

1. **User Management**
   - User registration
   - User login/logout
   - Password recovery
   - Profile management

2. **Product Catalog**
   - Product search
   - Product filtering
   - Product sorting
   - Product details view

3. **Shopping Cart**
   - Add to cart
   - Update cart quantities
   - Remove from cart
   - Cart calculations

4. **Checkout Process**
   - Shipping information
   - Payment methods
   - Order review
   - Order confirmation

5. **Order Management**
   - View orders
   - Order details
   - Order history
   - Cancel orders

### Test Scenarios to Implement

#### Priority 1 (Critical)
- User login with valid credentials
- Add products to cart
- Complete checkout process
- Search for products
- View order confirmation

#### Priority 2 (High)
- User registration
- Update cart quantities
- Apply discount codes
- Filter products by category
- Sort products by price

#### Priority 3 (Medium)
- Password recovery
- Remove items from cart
- Update user profile
- Save items to wishlist
- Product reviews

---

## 3. Framework Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Execution Layer                      │
│  (TestNG Test Classes, Test Suites, Data Providers)         │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  Page Object Layer                           │
│  (Page Classes, Page Factory, Element Locators)             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   Base Components                            │
│  (Base Test, Base Page, Driver Factory)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  Utilities Layer                             │
│  (Wait Utils, Element Utils, Screenshot Utils, etc.)        │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│               Configuration & Data Layer                     │
│  (Config Files, Test Data, Properties)                      │
└─────────────────────────────────────────────────────────────┘
```

### Framework Components

#### 1. Driver Factory
- Manages WebDriver instances
- Handles browser initialization
- Implements ThreadLocal for parallel execution

#### 2. Base Classes
- **BasePage**: Common page methods
- **BaseTest**: Test setup and teardown
- **BaseComponent**: Reusable UI components

#### 3. Page Objects
- LoginPage
- HomePage
- ProductListPage
- ProductDetailsPage
- CartPage
- CheckoutPage
- OrderConfirmationPage

#### 4. Utilities
- WaitUtils
- ElementUtils
- ScreenshotUtils
- ExcelUtils
- JsonUtils
- DateTimeUtils
- RandomDataGenerator

#### 5. Configuration
- ConfigReader
- Environment management
- Browser configuration
- Test data management

#### 6. Reporting
- ExtentReports integration
- Custom report listeners
- Screenshot attachment
- Test execution logs

---

## 4. Project Structure

```
ecommerce-automation-framework/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com.ecommerce.framework/
│   │   │   │   ├── base/
│   │   │   │   │   ├── BasePage.java
│   │   │   │   │   ├── BaseTest.java
│   │   │   │   │   └── DriverFactory.java
│   │   │   │   │
│   │   │   │   ├── pages/
│   │   │   │   │   ├── HomePage.java
│   │   │   │   │   ├── LoginPage.java
│   │   │   │   │   ├── ProductListPage.java
│   │   │   │   │   ├── ProductDetailsPage.java
│   │   │   │   │   ├── CartPage.java
│   │   │   │   │   ├── CheckoutPage.java
│   │   │   │   │   └── OrderConfirmationPage.java
│   │   │   │   │
│   │   │   │   ├── utils/
│   │   │   │   │   ├── WaitUtils.java
│   │   │   │   │   ├── ElementUtils.java
│   │   │   │   │   ├── ScreenshotUtils.java
│   │   │   │   │   ├── ExcelUtils.java
│   │   │   │   │   ├── JsonUtils.java
│   │   │   │   │   ├── DateTimeUtils.java
│   │   │   │   │   ├── RandomDataGenerator.java
│   │   │   │   │   └── ConfigReader.java
│   │   │   │   │
│   │   │   │   ├── listeners/
│   │   │   │   │   ├── TestListener.java
│   │   │   │   │   ├── RetryAnalyzer.java
│   │   │   │   │   └── AnnotationTransformer.java
│   │   │   │   │
│   │   │   │   ├── exceptions/
│   │   │   │   │   ├── FrameworkException.java
│   │   │   │   │   ├── ElementNotFoundException.java
│   │   │   │   │   └── ConfigurationException.java
│   │   │   │   │
│   │   │   │   └── constants/
│   │   │   │       ├── FrameworkConstants.java
│   │   │   │       └── ApplicationConstants.java
│   │   │   │
│   │   └── resources/
│   │       ├── config.properties
│   │       ├── log4j2.xml
│   │       └── extent-config.xml
│   │
│   └── test/
│       ├── java/
│       │   ├── com.ecommerce.tests/
│       │   │   ├── login/
│       │   │   │   ├── LoginTests.java
│       │   │   │   └── LogoutTests.java
│       │   │   │
│       │   │   ├── registration/
│       │   │   │   └── RegistrationTests.java
│       │   │   │
│       │   │   ├── products/
│       │   │   │   ├── ProductSearchTests.java
│       │   │   │   ├── ProductFilterTests.java
│       │   │   │   └── ProductDetailsTests.java
│       │   │   │
│       │   │   ├── cart/
│       │   │   │   ├── AddToCartTests.java
│       │   │   │   ├── UpdateCartTests.java
│       │   │   │   └── RemoveFromCartTests.java
│       │   │   │
│       │   │   ├── checkout/
│       │   │   │   └── CheckoutTests.java
│       │   │   │
│       │   │   └── endtoend/
│       │   │       └── E2ETests.java
│       │   │
│       └── resources/
│           ├── testdata/
│           │   ├── testdata.xlsx
│           │   ├── users.json
│           │   └── products.json
│           │
│           └── testsuites/
│               ├── smoke-suite.xml
│               ├── regression-suite.xml
│               └── e2e-suite.xml
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── reports/
│   └── (Generated test reports)
│
├── screenshots/
│   └── (Generated screenshots)
│
├── logs/
│   └── (Generated logs)
│
├── pom.xml
├── README.md
└── .gitignore
```

---

## 5. Complete Implementation

### 5.1 Base Classes

#### DriverFactory.java

```java
package com.ecommerce.framework.base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import com.ecommerce.framework.utils.ConfigReader;
import com.ecommerce.framework.constants.FrameworkConstants;
import com.ecommerce.framework.exceptions.FrameworkException;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public final class DriverFactory {

    private static final Logger logger = LogManager.getLogger(DriverFactory.class);
    private static final ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    private DriverFactory() {
        // Private constructor to prevent instantiation
    }

    /**
     * Initializes WebDriver based on configuration
     */
    public static void initializeDriver() {
        String browser = ConfigReader.getProperty("browser");
        String executionMode = ConfigReader.getProperty("execution.mode", "local");

        logger.info("Initializing driver: Browser={}, Mode={}", browser, executionMode);

        WebDriver webDriver;

        if ("remote".equalsIgnoreCase(executionMode)) {
            webDriver = initializeRemoteDriver(browser);
        } else {
            webDriver = initializeLocalDriver(browser);
        }

        configureDriver(webDriver);
        driver.set(webDriver);

        logger.info("Driver initialized successfully");
    }

    /**
     * Initializes local WebDriver
     */
    private static WebDriver initializeLocalDriver(String browser) {
        WebDriver webDriver;

        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                webDriver = new ChromeDriver(getChromeOptions());
                break;

            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                webDriver = new FirefoxDriver(getFirefoxOptions());
                break;

            case "edge":
                WebDriverManager.edgedriver().setup();
                webDriver = new EdgeDriver(getEdgeOptions());
                break;

            case "safari":
                webDriver = new SafariDriver();
                break;

            default:
                throw new FrameworkException("Unsupported browser: " + browser);
        }

        return webDriver;
    }

    /**
     * Initializes remote WebDriver (Selenium Grid/Docker)
     */
    private static WebDriver initializeRemoteDriver(String browser) {
        String gridUrl = ConfigReader.getProperty("grid.url");

        try {
            WebDriver webDriver;
            switch (browser.toLowerCase()) {
                case "chrome":
                    webDriver = new RemoteWebDriver(new URL(gridUrl), getChromeOptions());
                    break;

                case "firefox":
                    webDriver = new RemoteWebDriver(new URL(gridUrl), getFirefoxOptions());
                    break;

                case "edge":
                    webDriver = new RemoteWebDriver(new URL(gridUrl), getEdgeOptions());
                    break;

                default:
                    throw new FrameworkException("Unsupported browser for remote execution: " + browser);
            }
            return webDriver;
        } catch (MalformedURLException e) {
            throw new FrameworkException("Invalid Grid URL: " + gridUrl, e);
        }
    }

    /**
     * Configures WebDriver with common settings
     */
    private static void configureDriver(WebDriver webDriver) {
        webDriver.manage().window().maximize();
        webDriver.manage().timeouts().implicitlyWait(
                Duration.ofSeconds(FrameworkConstants.IMPLICIT_WAIT));
        webDriver.manage().timeouts().pageLoadTimeout(
                Duration.ofSeconds(FrameworkConstants.PAGE_LOAD_TIMEOUT));
    }

    /**
     * Gets Chrome options
     */
    private static ChromeOptions getChromeOptions() {
        ChromeOptions options = new ChromeOptions();

        if (ConfigReader.getBooleanProperty("headless")) {
            options.addArguments("--headless=new");
        }

        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");

        return options;
    }

    /**
     * Gets Firefox options
     */
    private static FirefoxOptions getFirefoxOptions() {
        FirefoxOptions options = new FirefoxOptions();

        if (ConfigReader.getBooleanProperty("headless")) {
            options.addArguments("--headless");
        }

        options.addArguments("--width=1920");
        options.addArguments("--height=1080");

        return options;
    }

    /**
     * Gets Edge options
     */
    private static EdgeOptions getEdgeOptions() {
        EdgeOptions options = new EdgeOptions();

        if (ConfigReader.getBooleanProperty("headless")) {
            options.addArguments("--headless");
        }

        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");

        return options;
    }

    /**
     * Gets current driver instance
     */
    public static WebDriver getDriver() {
        if (driver.get() == null) {
            throw new FrameworkException("Driver not initialized. Call initializeDriver() first.");
        }
        return driver.get();
    }

    /**
     * Quits driver and removes from ThreadLocal
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

#### BasePage.java

```java
package com.ecommerce.framework.base;

import org.openqa.selenium.*;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.ecommerce.framework.utils.WaitUtils;
import com.ecommerce.framework.utils.ElementUtils;
import com.ecommerce.framework.constants.FrameworkConstants;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.time.Duration;

public abstract class BasePage {

    protected WebDriver driver;
    protected WebDriverWait wait;
    protected static final Logger logger = LogManager.getLogger(BasePage.class);

    /**
     * Constructor initializes driver and page elements
     */
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(FrameworkConstants.EXPLICIT_WAIT));
        PageFactory.initElements(driver, this);
    }

    /**
     * Navigates to a URL
     */
    protected void navigateTo(String url) {
        logger.info("Navigating to: {}", url);
        driver.get(url);
    }

    /**
     * Gets current page URL
     */
    protected String getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    /**
     * Gets page title
     */
    protected String getPageTitle() {
        return driver.getTitle();
    }

    /**
     * Waits for page to load
     */
    protected void waitForPageLoad() {
        wait.until(webDriver -> ((JavascriptExecutor) webDriver)
                .executeScript("return document.readyState").equals("complete"));
    }

    /**
     * Scrolls to element
     */
    protected void scrollToElement(WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    /**
     * Clicks element with wait
     */
    protected void clickElement(WebElement element) {
        WaitUtils.waitForClickability(driver, element, FrameworkConstants.EXPLICIT_WAIT);
        ElementUtils.click(element);
        logger.debug("Clicked element: {}", element);
    }

    /**
     * Enters text into element
     */
    protected void enterText(WebElement element, String text) {
        WaitUtils.waitForVisibility(driver, element, FrameworkConstants.EXPLICIT_WAIT);
        ElementUtils.type(element, text);
        logger.debug("Entered text '{}' into element", text);
    }

    /**
     * Gets text from element
     */
    protected String getText(WebElement element) {
        WaitUtils.waitForVisibility(driver, element, FrameworkConstants.EXPLICIT_WAIT);
        String text = ElementUtils.getText(element);
        logger.debug("Got text '{}' from element", text);
        return text;
    }

    /**
     * Checks if element is displayed
     */
    protected boolean isElementDisplayed(WebElement element) {
        try {
            return ElementUtils.isDisplayed(element);
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    /**
     * Waits for element visibility
     */
    protected void waitForElementVisibility(WebElement element) {
        WaitUtils.waitForVisibility(driver, element, FrameworkConstants.EXPLICIT_WAIT);
    }

    /**
     * Waits for element invisibility
     */
    protected void waitForElementInvisibility(WebElement element) {
        WaitUtils.waitForInvisibility(driver, element, FrameworkConstants.EXPLICIT_WAIT);
    }

    /**
     * Executes JavaScript
     */
    protected Object executeJavaScript(String script, Object... args) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        return js.executeScript(script, args);
    }

    /**
     * Clicks using JavaScript
     */
    protected void clickWithJS(WebElement element) {
        executeJavaScript("arguments[0].click();", element);
        logger.debug("Clicked element using JavaScript");
    }

    /**
     * Verifies page is loaded
     */
    public abstract boolean isPageLoaded();
}
```

#### BaseTest.java

```java
package com.ecommerce.framework.base;

import org.testng.annotations.*;
import org.testng.ITestResult;
import com.ecommerce.framework.utils.ConfigReader;
import com.ecommerce.framework.utils.ScreenshotUtils;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class BaseTest {

    protected static final Logger logger = LogManager.getLogger(BaseTest.class);
    protected static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    @BeforeSuite
    public void beforeSuite() {
        logger.info("=== Test Suite Started ===");
        ConfigReader.loadProperties();
    }

    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(@Optional String browser) {
        logger.info("Setting up test");

        // Override browser if provided as parameter
        if (browser != null && !browser.isEmpty()) {
            System.setProperty("browser", browser);
        }

        DriverFactory.initializeDriver();
        navigateToBaseUrl();
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        logger.info("Tearing down test: {}", result.getName());

        if (result.getStatus() == ITestResult.FAILURE) {
            String screenshotPath = ScreenshotUtils.takeScreenshot(
                    DriverFactory.getDriver(),
                    result.getName()
            );
            logger.error("Test failed. Screenshot: {}", screenshotPath);

            if (extentTest.get() != null) {
                extentTest.get().log(Status.FAIL, "Test Failed");
                extentTest.get().addScreenCaptureFromPath(screenshotPath);
            }
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            logger.info("Test passed: {}", result.getName());
            if (extentTest.get() != null) {
                extentTest.get().log(Status.PASS, "Test Passed");
            }
        } else if (result.getStatus() == ITestResult.SKIP) {
            logger.warn("Test skipped: {}", result.getName());
            if (extentTest.get() != null) {
                extentTest.get().log(Status.SKIP, "Test Skipped");
            }
        }

        DriverFactory.quitDriver();
    }

    @AfterSuite
    public void afterSuite() {
        logger.info("=== Test Suite Completed ===");
    }

    /**
     * Navigates to base URL
     */
    protected void navigateToBaseUrl() {
        String baseUrl = ConfigReader.getProperty("base.url");
        DriverFactory.getDriver().get(baseUrl);
        logger.info("Navigated to base URL: {}", baseUrl);
    }

    /**
     * Gets Extent Test instance
     */
    public static ExtentTest getExtentTest() {
        return extentTest.get();
    }

    /**
     * Sets Extent Test instance
     */
    public static void setExtentTest(ExtentTest test) {
        extentTest.set(test);
    }
}
```

---

## 6. Configuration Management

### ConfigReader.java

```java
package com.ecommerce.framework.utils;

import com.ecommerce.framework.exceptions.ConfigurationException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public final class ConfigReader {

    private static final Logger logger = LogManager.getLogger(ConfigReader.class);
    private static Properties properties;
    private static final String CONFIG_FILE_PATH = "src/main/resources/config.properties";

    private ConfigReader() {
        // Private constructor
    }

    /**
     * Loads properties from config file
     */
    public static void loadProperties() {
        if (properties == null) {
            properties = new Properties();
            try (FileInputStream fis = new FileInputStream(CONFIG_FILE_PATH)) {
                properties.load(fis);
                logger.info("Configuration loaded successfully");
            } catch (IOException e) {
                logger.error("Failed to load configuration file", e);
                throw new ConfigurationException("Failed to load config file: " + CONFIG_FILE_PATH, e);
            }
        }
    }

    /**
     * Gets property value
     */
    public static String getProperty(String key) {
        if (properties == null) {
            loadProperties();
        }

        // Check system property first (for command-line override)
        String value = System.getProperty(key);
        if (value != null) {
            return value;
        }

        value = properties.getProperty(key);
        if (value == null) {
            logger.warn("Property not found: {}", key);
            throw new ConfigurationException("Property not found: " + key);
        }

        return value;
    }

    /**
     * Gets property with default value
     */
    public static String getProperty(String key, String defaultValue) {
        try {
            return getProperty(key);
        } catch (ConfigurationException e) {
            logger.debug("Using default value for property: {}", key);
            return defaultValue;
        }
    }

    /**
     * Gets integer property
     */
    public static int getIntProperty(String key) {
        String value = getProperty(key);
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new ConfigurationException("Invalid integer property: " + key + " = " + value);
        }
    }

    /**
     * Gets boolean property
     */
    public static boolean getBooleanProperty(String key) {
        String value = getProperty(key);
        return Boolean.parseBoolean(value);
    }

    /**
     * Gets all properties
     */
    public static Properties getAllProperties() {
        if (properties == null) {
            loadProperties();
        }
        return properties;
    }
}
```

### config.properties

```properties
# Browser Configuration
browser=chrome
headless=false
execution.mode=local
grid.url=http://localhost:4444/wd/hub

# Application URL
base.url=https://demo.opencart.com/

# Timeout Configuration (in seconds)
implicit.wait=10
explicit.wait=20
page.load.timeout=30

# Test Data
test.data.path=src/test/resources/testdata/

# Reporting
report.path=reports/
screenshot.path=screenshots/
log.path=logs/

# Retry Configuration
retry.count=2

# Database Configuration (if needed)
db.url=jdbc:mysql://localhost:3306/ecommerce
db.username=root
db.password=password

# Email Configuration (if needed)
email.host=smtp.gmail.com
email.port=587
email.username=test@example.com
email.password=password

# Environment
environment=qa
```

---

## 7. Page Object Model Implementation

### LoginPage.java

```java
package com.ecommerce.framework.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import com.ecommerce.framework.base.BasePage;

public class LoginPage extends BasePage {

    // Page Elements
    @FindBy(id = "input-email")
    private WebElement emailInput;

    @FindBy(id = "input-password")
    private WebElement passwordInput;

    @FindBy(css = "input[value='Login']")
    private WebElement loginButton;

    @FindBy(css = "div.alert-danger")
    private WebElement errorMessage;

    @FindBy(linkText = "Forgotten Password")
    private WebElement forgotPasswordLink;

    @FindBy(linkText = "Continue")
    private WebElement continueButton;

    /**
     * Constructor
     */
    public LoginPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Performs login
     */
    public HomePage login(String email, String password) {
        logger.info("Logging in with email: {}", email);
        enterText(emailInput, email);
        enterText(passwordInput, password);
        clickElement(loginButton);
        return new HomePage(driver);
    }

    /**
     * Enters email
     */
    public LoginPage enterEmail(String email) {
        enterText(emailInput, email);
        return this;
    }

    /**
     * Enters password
     */
    public LoginPage enterPassword(String password) {
        enterText(passwordInput, password);
        return this;
    }

    /**
     * Clicks login button
     */
    public HomePage clickLogin() {
        clickElement(loginButton);
        return new HomePage(driver);
    }

    /**
     * Gets error message
     */
    public String getErrorMessage() {
        return getText(errorMessage);
    }

    /**
     * Checks if error message is displayed
     */
    public boolean isErrorDisplayed() {
        return isElementDisplayed(errorMessage);
    }

    /**
     * Clicks forgot password
     */
    public void clickForgotPassword() {
        clickElement(forgotPasswordLink);
    }

    /**
     * Verifies page is loaded
     */
    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(emailInput) &&
               isElementDisplayed(passwordInput) &&
               isElementDisplayed(loginButton);
    }
}
```

### HomePage.java

```java
package com.ecommerce.framework.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import com.ecommerce.framework.base.BasePage;

import java.util.List;

public class HomePage extends BasePage {

    @FindBy(css = "input[name='search']")
    private WebElement searchBox;

    @FindBy(css = "button.btn-default.btn-lg")
    private WebElement searchButton;

    @FindBy(linkText = "My Account")
    private WebElement myAccountLink;

    @FindBy(linkText = "Login")
    private WebElement loginLink;

    @FindBy(linkText = "Logout")
    private WebElement logoutLink;

    @FindBy(css = "div.product-thumb")
    private List<WebElement> featuredProducts;

    @FindBy(id = "cart")
    private WebElement cartButton;

    @FindBy(css = "span#cart-total")
    private WebElement cartTotal;

    @FindBy(css = "div.alert-success")
    private WebElement successMessage;

    /**
     * Constructor
     */
    public HomePage(WebDriver driver) {
        super(driver);
    }

    /**
     * Navigates to login page
     */
    public LoginPage navigateToLogin() {
        logger.info("Navigating to login page");
        clickElement(myAccountLink);
        clickElement(loginLink);
        return new LoginPage(driver);
    }

    /**
     * Performs logout
     */
    public HomePage logout() {
        logger.info("Logging out");
        clickElement(myAccountLink);
        clickElement(logoutLink);
        return this;
    }

    /**
     * Searches for product
     */
    public ProductListPage searchProduct(String productName) {
        logger.info("Searching for product: {}", productName);
        enterText(searchBox, productName);
        clickElement(searchButton);
        return new ProductListPage(driver);
    }

    /**
     * Checks if user is logged in
     */
    public boolean isUserLoggedIn() {
        clickElement(myAccountLink);
        return isElementDisplayed(logoutLink);
    }

    /**
     * Gets cart item count
     */
    public String getCartItemCount() {
        return getText(cartTotal);
    }

    /**
     * Opens cart
     */
    public CartPage openCart() {
        clickElement(cartButton);
        return new CartPage(driver);
    }

    /**
     * Gets success message
     */
    public String getSuccessMessage() {
        return getText(successMessage);
    }

    /**
     * Gets featured products count
     */
    public int getFeaturedProductsCount() {
        return featuredProducts.size();
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(searchBox) && isElementDisplayed(myAccountLink);
    }
}
```

### ProductListPage.java

```java
package com.ecommerce.framework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.Select;
import com.ecommerce.framework.base.BasePage;

import java.util.List;
import java.util.stream.Collectors;

public class ProductListPage extends BasePage {

    @FindBy(css = "div.product-thumb")
    private List<WebElement> productList;

    @FindBy(id = "input-sort")
    private WebElement sortDropdown;

    @FindBy(id = "input-limit")
    private WebElement limitDropdown;

    @FindBy(css = "div.product-thumb h4 a")
    private List<WebElement> productTitles;

    @FindBy(css = "div.product-thumb p.price")
    private List<WebElement> productPrices;

    @FindBy(css = "button[onclick*='cart.add']")
    private List<WebElement> addToCartButtons;

    @FindBy(css = "div.alert-success")
    private WebElement successMessage;

    /**
     * Constructor
     */
    public ProductListPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Gets product count
     */
    public int getProductCount() {
        return productList.size();
    }

    /**
     * Gets all product names
     */
    public List<String> getAllProductNames() {
        return productTitles.stream()
                .map(this::getText)
                .collect(Collectors.toList());
    }

    /**
     * Gets all product prices
     */
    public List<String> getAllProductPrices() {
        return productPrices.stream()
                .map(this::getText)
                .collect(Collectors.toList());
    }

    /**
     * Clicks on product by name
     */
    public ProductDetailsPage clickProduct(String productName) {
        logger.info("Clicking on product: {}", productName);
        for (WebElement title : productTitles) {
            if (getText(title).equals(productName)) {
                clickElement(title);
                return new ProductDetailsPage(driver);
            }
        }
        throw new RuntimeException("Product not found: " + productName);
    }

    /**
     * Adds product to cart by index
     */
    public ProductListPage addToCartByIndex(int index) {
        logger.info("Adding product to cart at index: {}", index);
        clickElement(addToCartButtons.get(index));
        return this;
    }

    /**
     * Sorts products
     */
    public ProductListPage sortBy(String sortOption) {
        logger.info("Sorting by: {}", sortOption);
        Select select = new Select(sortDropdown);
        select.selectByVisibleText(sortOption);
        return this;
    }

    /**
     * Changes display limit
     */
    public ProductListPage setDisplayLimit(String limit) {
        logger.info("Setting display limit: {}", limit);
        Select select = new Select(limitDropdown);
        select.selectByVisibleText(limit);
        return this;
    }

    /**
     * Gets success message
     */
    public String getSuccessMessage() {
        waitForElementVisibility(successMessage);
        return getText(successMessage);
    }

    /**
     * Verifies product exists
     */
    public boolean isProductPresent(String productName) {
        return getAllProductNames().contains(productName);
    }

    @Override
    public boolean isPageLoaded() {
        return !productList.isEmpty();
    }
}
```

### CartPage.java

```java
package com.ecommerce.framework.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import com.ecommerce.framework.base.BasePage;

import java.util.List;

public class CartPage extends BasePage {

    @FindBy(css = "div.table-responsive table tbody tr")
    private List<WebElement> cartItems;

    @FindBy(css = "input[name^='quantity']")
    private List<WebElement> quantityInputs;

    @FindBy(css = "button[data-original-title='Update']")
    private List<WebElement> updateButtons;

    @FindBy(css = "button[data-original-title='Remove']")
    private List<WebElement> removeButtons;

    @FindBy(linkText = "Checkout")
    private WebElement checkoutButton;

    @FindBy(css = "td.text-right:nth-child(6)")
    private List<WebElement> totalPrices;

    @FindBy(css = "div.table-responsive")
    private WebElement cartTable;

    @FindBy(css = "p:contains('Your shopping cart is empty!')")
    private WebElement emptyCartMessage;

    /**
     * Constructor
     */
    public CartPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Gets cart item count
     */
    public int getCartItemCount() {
        return cartItems.size();
    }

    /**
     * Updates quantity for item at index
     */
    public CartPage updateQuantity(int index, String quantity) {
        logger.info("Updating quantity to {} for item at index {}", quantity, index);
        WebElement quantityInput = quantityInputs.get(index);
        quantityInput.clear();
        enterText(quantityInput, quantity);
        clickElement(updateButtons.get(index));
        return this;
    }

    /**
     * Removes item from cart
     */
    public CartPage removeItem(int index) {
        logger.info("Removing item at index: {}", index);
        clickElement(removeButtons.get(index));
        return this;
    }

    /**
     * Proceeds to checkout
     */
    public CheckoutPage proceedToCheckout() {
        logger.info("Proceeding to checkout");
        clickElement(checkoutButton);
        return new CheckoutPage(driver);
    }

    /**
     * Checks if cart is empty
     */
    public boolean isCartEmpty() {
        return isElementDisplayed(emptyCartMessage);
    }

    /**
     * Gets total price for item at index
     */
    public String getTotalPrice(int index) {
        return getText(totalPrices.get(index));
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(cartTable) || isElementDisplayed(emptyCartMessage);
    }
}
```

### CheckoutPage.java

```java
package com.ecommerce.framework.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.Select;
import com.ecommerce.framework.base.BasePage;

public class CheckoutPage extends BasePage {

    // Billing Details
    @FindBy(id = "input-payment-firstname")
    private WebElement firstNameInput;

    @FindBy(id = "input-payment-lastname")
    private WebElement lastNameInput;

    @FindBy(id = "input-payment-address-1")
    private WebElement addressInput;

    @FindBy(id = "input-payment-city")
    private WebElement cityInput;

    @FindBy(id = "input-payment-postcode")
    private WebElement postcodeInput;

    @FindBy(id = "input-payment-country")
    private WebElement countryDropdown;

    @FindBy(id = "input-payment-zone")
    private WebElement stateDropdown;

    @FindBy(id = "button-payment-address")
    private WebElement continueButton;

    // Payment Method
    @FindBy(name = "agree")
    private WebElement termsCheckbox;

    @FindBy(id = "button-payment-method")
    private WebElement continuePaymentButton;

    // Confirm Order
    @FindBy(id = "button-confirm")
    private WebElement confirmOrderButton;

    /**
     * Constructor
     */
    public CheckoutPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Fills billing details
     */
    public CheckoutPage fillBillingDetails(String firstName, String lastName,
                                          String address, String city,
                                          String postcode, String country,
                                          String state) {
        logger.info("Filling billing details");
        enterText(firstNameInput, firstName);
        enterText(lastNameInput, lastName);
        enterText(addressInput, address);
        enterText(cityInput, city);
        enterText(postcodeInput, postcode);

        Select countrySelect = new Select(countryDropdown);
        countrySelect.selectByVisibleText(country);

        Select stateSelect = new Select(stateDropdown);
        stateSelect.selectByVisibleText(state);

        clickElement(continueButton);
        return this;
    }

    /**
     * Accepts terms and conditions
     */
    public CheckoutPage acceptTerms() {
        logger.info("Accepting terms and conditions");
        if (!termsCheckbox.isSelected()) {
            clickElement(termsCheckbox);
        }
        return this;
    }

    /**
     * Continues payment method
     */
    public CheckoutPage continuePayment() {
        clickElement(continuePaymentButton);
        return this;
    }

    /**
     * Confirms order
     */
    public OrderConfirmationPage confirmOrder() {
        logger.info("Confirming order");
        clickElement(confirmOrderButton);
        return new OrderConfirmationPage(driver);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(firstNameInput);
    }
}
```

### OrderConfirmationPage.java

```java
package com.ecommerce.framework.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import com.ecommerce.framework.base.BasePage;

public class OrderConfirmationPage extends BasePage {

    @FindBy(css = "div#content h1")
    private WebElement confirmationHeading;

    @FindBy(css = "div#content p")
    private WebElement confirmationMessage;

    @FindBy(linkText = "Continue")
    private WebElement continueButton;

    /**
     * Constructor
     */
    public OrderConfirmationPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Gets confirmation heading
     */
    public String getConfirmationHeading() {
        return getText(confirmationHeading);
    }

    /**
     * Gets confirmation message
     */
    public String getConfirmationMessage() {
        return getText(confirmationMessage);
    }

    /**
     * Verifies order is confirmed
     */
    public boolean isOrderConfirmed() {
        return getConfirmationHeading().contains("Your order has been placed!");
    }

    /**
     * Clicks continue button
     */
    public HomePage clickContinue() {
        clickElement(continueButton);
        return new HomePage(driver);
    }

    @Override
    public boolean isPageLoaded() {
        return isElementDisplayed(confirmationHeading);
    }
}
```

---

## 8. Test Implementation

### LoginTests.java

```java
package com.ecommerce.tests.login;

import com.ecommerce.framework.base.BaseTest;
import com.ecommerce.framework.base.DriverFactory;
import com.ecommerce.framework.pages.HomePage;
import com.ecommerce.framework.pages.LoginPage;
import com.ecommerce.framework.utils.ExcelUtils;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class LoginTests extends BaseTest {

    @Test(priority = 1, description = "Verify login with valid credentials")
    public void testValidLogin() {
        logger.info("=== Test: Valid Login ===");

        HomePage homePage = new HomePage(DriverFactory.getDriver());
        LoginPage loginPage = homePage.navigateToLogin();

        Assert.assertTrue(loginPage.isPageLoaded(), "Login page not loaded");

        homePage = loginPage.login("test@example.com", "password123");

        Assert.assertTrue(homePage.isUserLoggedIn(), "User not logged in");
        logger.info("User logged in successfully");
    }

    @Test(priority = 2, description = "Verify login with invalid credentials")
    public void testInvalidLogin() {
        logger.info("=== Test: Invalid Login ===");

        HomePage homePage = new HomePage(DriverFactory.getDriver());
        LoginPage loginPage = homePage.navigateToLogin();

        loginPage.enterEmail("invalid@example.com");
        loginPage.enterPassword("wrongpassword");
        loginPage.clickLogin();

        Assert.assertTrue(loginPage.isErrorDisplayed(), "Error message not displayed");
        String errorMessage = loginPage.getErrorMessage();
        Assert.assertTrue(errorMessage.contains("Warning"), "Error message incorrect");
        logger.info("Login failed as expected with invalid credentials");
    }

    @Test(priority = 3, description = "Verify login with empty credentials",
          dataProvider = "emptyCredentials")
    public void testEmptyCredentials(String email, String password, String description) {
        logger.info("=== Test: {} ===", description);

        HomePage homePage = new HomePage(DriverFactory.getDriver());
        LoginPage loginPage = homePage.navigateToLogin();

        loginPage.enterEmail(email);
        loginPage.enterPassword(password);
        loginPage.clickLogin();

        Assert.assertTrue(loginPage.isErrorDisplayed(), "Error message not displayed");
        logger.info("Login failed as expected with empty credentials");
    }

    @DataProvider(name = "emptyCredentials")
    public Object[][] emptyCredentialsData() {
        return new Object[][] {
            {"", "", "Empty email and password"},
            {"test@example.com", "", "Empty password"},
            {"", "password123", "Empty email"}
        };
    }

    @Test(priority = 4, description = "Verify login from Excel data",
          dataProvider = "loginData")
    public void testLoginFromExcel(String email, String password, String expectedResult) {
        logger.info("=== Test: Login with email {} ===", email);

        HomePage homePage = new HomePage(DriverFactory.getDriver());
        LoginPage loginPage = homePage.navigateToLogin();

        loginPage.login(email, password);

        if ("pass".equalsIgnoreCase(expectedResult)) {
            Assert.assertTrue(homePage.isUserLoggedIn(), "Login should succeed");
        } else {
            Assert.assertTrue(loginPage.isErrorDisplayed(), "Login should fail");
        }
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        String excelPath = "src/test/resources/testdata/testdata.xlsx";
        return ExcelUtils.getTestData(excelPath, "Login");
    }
}
```

### E2ETests.java

```java
package com.ecommerce.tests.endtoend;

import com.ecommerce.framework.base.BaseTest;
import com.ecommerce.framework.base.DriverFactory;
import com.ecommerce.framework.pages.*;
import org.testng.Assert;
import org.testng.annotations.Test;

public class E2ETests extends BaseTest {

    @Test(priority = 1, description = "End to end purchase flow")
    public void testCompleteCheckoutFlow() {
        logger.info("=== Test: Complete E2E Purchase Flow ===");

        // Step 1: Login
        HomePage homePage = new HomePage(DriverFactory.getDriver());
        LoginPage loginPage = homePage.navigateToLogin();
        homePage = loginPage.login("test@example.com", "password123");
        Assert.assertTrue(homePage.isUserLoggedIn(), "User should be logged in");
        logger.info("Step 1: Login successful");

        // Step 2: Search for product
        ProductListPage productListPage = homePage.searchProduct("MacBook");
        Assert.assertTrue(productListPage.getProductCount() > 0, "Products should be displayed");
        logger.info("Step 2: Product search successful");

        // Step 3: Add product to cart
        productListPage.addToCartByIndex(0);
        String successMsg = productListPage.getSuccessMessage();
        Assert.assertTrue(successMsg.contains("Success"), "Product should be added to cart");
        logger.info("Step 3: Product added to cart");

        // Step 4: View cart
        CartPage cartPage = homePage.openCart();
        Assert.assertEquals(cartPage.getCartItemCount(), 1, "Cart should have 1 item");
        logger.info("Step 4: Cart verified");

        // Step 5: Proceed to checkout
        CheckoutPage checkoutPage = cartPage.proceedToCheckout();
        Assert.assertTrue(checkoutPage.isPageLoaded(), "Checkout page should load");
        logger.info("Step 5: Proceeded to checkout");

        // Step 6: Fill billing details
        checkoutPage.fillBillingDetails(
            "John",
            "Doe",
            "123 Main St",
            "New York",
            "10001",
            "United States",
            "New York"
        );
        logger.info("Step 6: Billing details filled");

        // Step 7: Complete payment
        checkoutPage.acceptTerms();
        checkoutPage.continuePayment();
        logger.info("Step 7: Payment method selected");

        // Step 8: Confirm order
        OrderConfirmationPage confirmationPage = checkoutPage.confirmOrder();
        Assert.assertTrue(confirmationPage.isOrderConfirmed(),
            "Order should be confirmed");
        logger.info("Step 8: Order confirmed successfully");

        logger.info("=== E2E Test Completed Successfully ===");
    }
}
```

---

## 9. Data-Driven Testing

### ExcelUtils.java

```java
package com.ecommerce.framework.utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.ecommerce.framework.exceptions.FrameworkException;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public final class ExcelUtils {

    private ExcelUtils() {
        // Private constructor
    }

    /**
     * Gets test data from Excel sheet
     */
    public static Object[][] getTestData(String filePath, String sheetName) {
        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheet(sheetName);
            if (sheet == null) {
                throw new FrameworkException("Sheet not found: " + sheetName);
            }

            int rowCount = sheet.getPhysicalNumberOfRows();
            int colCount = sheet.getRow(0).getPhysicalNumberOfCells();

            Object[][] data = new Object[rowCount - 1][colCount];

            for (int i = 1; i < rowCount; i++) {
                Row row = sheet.getRow(i);
                for (int j = 0; j < colCount; j++) {
                    Cell cell = row.getCell(j);
                    data[i - 1][j] = getCellValue(cell);
                }
            }

            return data;

        } catch (IOException e) {
            throw new FrameworkException("Failed to read Excel file: " + filePath, e);
        }
    }

    /**
     * Gets cell value based on type
     */
    private static Object getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue();
                }
                return String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN:
                return cell.getBooleanCellValue();
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }

    /**
     * Gets specific column data
     */
    public static List<String> getColumnData(String filePath, String sheetName,
                                             String columnName) {
        List<String> columnData = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheet(sheetName);
            Row headerRow = sheet.getRow(0);

            int columnIndex = -1;
            for (int i = 0; i < headerRow.getPhysicalNumberOfCells(); i++) {
                if (headerRow.getCell(i).getStringCellValue().equals(columnName)) {
                    columnIndex = i;
                    break;
                }
            }

            if (columnIndex == -1) {
                throw new FrameworkException("Column not found: " + columnName);
            }

            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
                Row row = sheet.getRow(i);
                columnData.add(getCellValue(row.getCell(columnIndex)).toString());
            }

            return columnData;

        } catch (IOException e) {
            throw new FrameworkException("Failed to read Excel file", e);
        }
    }
}
```

### JsonUtils.java

```java
package com.ecommerce.framework.utils;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ecommerce.framework.exceptions.FrameworkException;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public final class JsonUtils {

    private static final Gson gson = new Gson();

    private JsonUtils() {
        // Private constructor
    }

    /**
     * Reads JSON file and returns JsonObject
     */
    public static JsonObject readJsonFile(String filePath) {
        try (FileReader reader = new FileReader(filePath)) {
            return gson.fromJson(reader, JsonObject.class);
        } catch (IOException e) {
            throw new FrameworkException("Failed to read JSON file: " + filePath, e);
        }
    }

    /**
     * Gets test data from JSON array
     */
    public static Object[][] getTestDataFromJson(String filePath, String arrayKey) {
        JsonObject jsonObject = readJsonFile(filePath);
        JsonArray jsonArray = jsonObject.getAsJsonArray(arrayKey);

        List<Object[]> data = new ArrayList<>();

        for (int i = 0; i < jsonArray.size(); i++) {
            JsonObject testCase = jsonArray.get(i).getAsJsonObject();
            Object[] row = new Object[testCase.size()];
            int index = 0;
            for (String key : testCase.keySet()) {
                row[index++] = testCase.get(key).getAsString();
            }
            data.add(row);
        }

        return data.toArray(new Object[0][]);
    }

    /**
     * Converts JSON to POJO
     */
    public static <T> T fromJson(String json, Class<T> classOfT) {
        return gson.fromJson(json, classOfT);
    }

    /**
     * Converts POJO to JSON
     */
    public static String toJson(Object object) {
        return gson.toJson(object);
    }
}
```

---

## 10. TestNG Suite Configuration

### smoke-suite.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Smoke Test Suite" parallel="tests" thread-count="3">

    <listeners>
        <listener class-name="com.ecommerce.framework.listeners.TestListener"/>
        <listener class-name="com.ecommerce.framework.listeners.AnnotationTransformer"/>
    </listeners>

    <test name="Login Tests - Chrome">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.ecommerce.tests.login.LoginTests">
                <methods>
                    <include name="testValidLogin"/>
                </methods>
            </class>
        </classes>
    </test>

    <test name="Search Tests - Chrome">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.ecommerce.tests.products.ProductSearchTests"/>
        </classes>
    </test>

</suite>
```

### regression-suite.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Regression Test Suite" parallel="tests" thread-count="5">

    <listeners>
        <listener class-name="com.ecommerce.framework.listeners.TestListener"/>
        <listener class-name="com.ecommerce.framework.listeners.AnnotationTransformer"/>
    </listeners>

    <test name="Login Module">
        <parameter name="browser" value="chrome"/>
        <packages>
            <package name="com.ecommerce.tests.login"/>
        </packages>
    </test>

    <test name="Product Module">
        <parameter name="browser" value="chrome"/>
        <packages>
            <package name="com.ecommerce.tests.products"/>
        </packages>
    </test>

    <test name="Cart Module">
        <parameter name="browser" value="chrome"/>
        <packages>
            <package name="com.ecommerce.tests.cart"/>
        </packages>
    </test>

    <test name="Checkout Module">
        <parameter name="browser" value="chrome"/>
        <packages>
            <package name="com.ecommerce.tests.checkout"/>
        </packages>
    </test>

</suite>
```

### cross-browser-suite.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Cross Browser Test Suite" parallel="tests" thread-count="3">

    <listeners>
        <listener class-name="com.ecommerce.framework.listeners.TestListener"/>
    </listeners>

    <test name="Chrome Browser Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.ecommerce.tests.login.LoginTests"/>
        </classes>
    </test>

    <test name="Firefox Browser Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="com.ecommerce.tests.login.LoginTests"/>
        </classes>
    </test>

    <test name="Edge Browser Tests">
        <parameter name="browser" value="edge"/>
        <classes>
            <class name="com.ecommerce.tests.login.LoginTests"/>
        </classes>
    </test>

</suite>
```

---

## 11. Reporting Setup

### TestListener.java

```java
package com.ecommerce.framework.listeners;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import com.ecommerce.framework.base.BaseTest;
import com.ecommerce.framework.utils.ConfigReader;
import org.testng.*;

import java.io.File;

public class TestListener implements ITestListener, ISuiteListener {

    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    @Override
    public void onStart(ISuite suite) {
        extent = createExtentReports();
    }

    @Override
    public void onFinish(ISuite suite) {
        if (extent != null) {
            extent.flush();
        }
    }

    @Override
    public void onTestStart(ITestResult result) {
        ExtentTest test = extent.createTest(
            result.getTestClass().getName() + "::" + result.getMethod().getMethodName(),
            result.getMethod().getDescription()
        );
        extentTest.set(test);
        BaseTest.setExtentTest(test);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        extentTest.get().log(Status.PASS, "Test Passed");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        extentTest.get().log(Status.FAIL, "Test Failed");
        extentTest.get().log(Status.FAIL, result.getThrowable());
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        extentTest.get().log(Status.SKIP, "Test Skipped");
        extentTest.get().log(Status.SKIP, result.getThrowable());
    }

    private static ExtentReports createExtentReports() {
        String reportPath = ConfigReader.getProperty("report.path") +
                           "ExtentReport_" + System.currentTimeMillis() + ".html";

        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);

        sparkReporter.config().setTheme(Theme.DARK);
        sparkReporter.config().setDocumentTitle("E-Commerce Test Automation Report");
        sparkReporter.config().setReportName("Test Execution Report");
        sparkReporter.config().setTimeStampFormat("MMM dd, yyyy HH:mm:ss");

        ExtentReports extent = new ExtentReports();
        extent.attachReporter(sparkReporter);

        extent.setSystemInfo("Application", "E-Commerce Website");
        extent.setSystemInfo("Environment", ConfigReader.getProperty("environment"));
        extent.setSystemInfo("Browser", ConfigReader.getProperty("browser"));
        extent.setSystemInfo("OS", System.getProperty("os.name"));
        extent.setSystemInfo("User", System.getProperty("user.name"));

        return extent;
    }
}
```

### RetryAnalyzer.java

```java
package com.ecommerce.framework.listeners;

import com.ecommerce.framework.utils.ConfigReader;
import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

public class RetryAnalyzer implements IRetryAnalyzer {

    private int retryCount = 0;
    private int maxRetryCount;

    public RetryAnalyzer() {
        this.maxRetryCount = ConfigReader.getIntProperty("retry.count");
    }

    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < maxRetryCount) {
            retryCount++;
            System.out.println("Retrying test: " + result.getName() +
                             " (Attempt " + (retryCount + 1) + ")");
            return true;
        }
        return false;
    }
}
```

---

## 12. CI/CD Pipeline

### GitHub Actions Workflow (.github/workflows/ci.yml)

```yaml
name: E-Commerce Test Automation CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox]

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'adopt'
        cache: maven

    - name: Install Chrome
      if: matrix.browser == 'chrome'
      run: |
        sudo apt-get update
        sudo apt-get install -y google-chrome-stable

    - name: Install Firefox
      if: matrix.browser == 'firefox'
      run: |
        sudo apt-get update
        sudo apt-get install -y firefox

    - name: Run tests
      run: mvn clean test -Dbrowser=${{ matrix.browser }} -Dheadless=true

    - name: Upload test reports
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-reports-${{ matrix.browser }}
        path: reports/

    - name: Upload screenshots
      if: failure()
      uses: actions/upload-artifact@v3
      with:
        name: screenshots-${{ matrix.browser }}
        path: screenshots/

    - name: Publish test results
      if: always()
      uses: EnricoMi/publish-unit-test-result-action@v2
      with:
        files: target/surefire-reports/*.xml
```

### Jenkinsfile

```groovy
pipeline {
    agent any

    parameters {
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge'],
               description: 'Select browser')
        choice(name: 'SUITE', choices: ['smoke', 'regression', 'e2e'],
               description: 'Select test suite')
        booleanParam(name: 'HEADLESS', defaultValue: false,
                    description: 'Run in headless mode')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def suiteFile = "src/test/resources/testsuites/${params.SUITE}-suite.xml"
                    sh """
                        mvn test \
                        -Dbrowser=${params.BROWSER} \
                        -Dheadless=${params.HEADLESS} \
                        -DsuiteXmlFile=${suiteFile}
                    """
                }
            }
        }

        stage('Generate Reports') {
            steps {
                publishHTML([
                    reportDir: 'reports',
                    reportFiles: '*.html',
                    reportName: 'Extent Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**, screenshots/**',
                           allowEmptyArchive: true
            cleanWs()
        }

        failure {
            emailext(
                subject: "Test Execution Failed: ${env.JOB_NAME}",
                body: "Build failed. Check Jenkins for details.",
                to: "team@example.com"
            )
        }
    }
}
```

---

## 13. Docker Integration

### Dockerfile

```dockerfile
FROM maven:3.8.6-openjdk-11

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install ChromeDriver
RUN CHROME_DRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE` \
    && wget -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/$CHROME_DRIVER_VERSION/chromedriver_linux64.zip \
    && unzip /tmp/chromedriver.zip -d /usr/local/bin/ \
    && rm /tmp/chromedriver.zip \
    && chmod +x /usr/local/bin/chromedriver

# Set working directory
WORKDIR /app

# Copy project files
COPY pom.xml .
COPY src ./src

# Download dependencies
RUN mvn dependency:go-offline

# Run tests
CMD ["mvn", "clean", "test", "-Dheadless=true"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  selenium-hub:
    image: selenium/hub:4.15.0
    ports:
      - "4444:4444"
      - "4442:4442"
      - "4443:4443"
    environment:
      - SE_SESSION_REQUEST_TIMEOUT=300
      - SE_SESSION_RETRY_INTERVAL=5

  chrome:
    image: selenium/node-chrome:4.15.0
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    shm_size: 2gb

  firefox:
    image: selenium/node-firefox:4.15.0
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    shm_size: 2gb

  tests:
    build: .
    depends_on:
      - selenium-hub
      - chrome
      - firefox
    environment:
      - execution.mode=remote
      - grid.url=http://selenium-hub:4444/wd/hub
      - browser=chrome
    volumes:
      - ./reports:/app/reports
      - ./screenshots:/app/screenshots
    command: mvn clean test -Dexecution.mode=remote
```

---

## 14. Best Practices

### 1. Framework Design Principles

```
SOLID Principles:
- Single Responsibility: Each class has one purpose
- Open/Closed: Open for extension, closed for modification
- Liskov Substitution: Derived classes substitutable for base
- Interface Segregation: Many specific interfaces > one general
- Dependency Inversion: Depend on abstractions, not concretions
```

### 2. Code Organization

- **Separate concerns**: Tests, pages, utils, config
- **Consistent naming**: Clear, descriptive names
- **Package structure**: Logical grouping
- **Constants**: Centralized in constant classes
- **Documentation**: JavaDoc for all public methods

### 3. Test Design

- **Independent tests**: No dependencies between tests
- **Atomic tests**: One test, one functionality
- **Repeatable**: Same result on multiple runs
- **Data-driven**: External test data
- **Maintainable**: Easy to update and extend

### 4. Exception Handling

- **Custom exceptions**: Framework-specific errors
- **Meaningful messages**: Clear error context
- **Proper logging**: Log all exceptions
- **Screenshot on failure**: Visual debugging
- **Retry mechanism**: Handle flaky tests

### 5. Reporting

- **Comprehensive reports**: Test results, logs, screenshots
- **Real-time updates**: Live test execution status
- **Historical data**: Track trends over time
- **Stakeholder-friendly**: Non-technical readers
- **Actionable insights**: Clear failure reasons

---

## 15. Framework Review Checklist

### Setup & Configuration
- [ ] All dependencies in pom.xml
- [ ] Configuration file properly set up
- [ ] Log4j2 configuration complete
- [ ] Properties loading correctly
- [ ] Environment management working

### Driver Management
- [ ] ThreadLocal implementation for parallel execution
- [ ] Browser options configured
- [ ] Remote execution support
- [ ] Proper driver cleanup
- [ ] WebDriverManager integration

### Page Objects
- [ ] All pages follow POM pattern
- [ ] Page Factory used for element initialization
- [ ] Meaningful method names
- [ ] Return types follow fluent pattern
- [ ] Proper wait strategies

### Base Classes
- [ ] BasePage with common methods
- [ ] BaseTest with setup/teardown
- [ ] Proper inheritance structure
- [ ] Logger integration
- [ ] Abstract methods where appropriate

### Utilities
- [ ] WaitUtils for explicit waits
- [ ] ElementUtils for interactions
- [ ] ScreenshotUtils for captures
- [ ] ExcelUtils for data-driven testing
- [ ] ConfigReader for properties

### Test Classes
- [ ] Tests are independent
- [ ] Proper assertions
- [ ] Good test descriptions
- [ ] Priority/grouping configured
- [ ] Data providers implemented

### Exception Handling
- [ ] Custom exceptions created
- [ ] Proper exception hierarchy
- [ ] Meaningful error messages
- [ ] Exception logging
- [ ] Retry mechanism configured

### Reporting
- [ ] Extent Reports configured
- [ ] Test listeners implemented
- [ ] Screenshots attached on failure
- [ ] Proper test categorization
- [ ] Report customization complete

### CI/CD
- [ ] GitHub Actions/Jenkins configured
- [ ] Pipeline stages defined
- [ ] Artifacts archived
- [ ] Notifications set up
- [ ] Schedule configured

### Docker
- [ ] Dockerfile created
- [ ] Docker Compose configured
- [ ] Selenium Grid setup
- [ ] Volume mapping correct
- [ ] Network configuration proper

---

## 16. Common Mistakes to Avoid

### 1. Framework Design Mistakes

**Mistake**: Putting test logic in page classes
```java
// WRONG
public class LoginPage {
    public void verifyLogin() {
        Assert.assertTrue(isLoggedIn()); // Test logic in page class
    }
}

// CORRECT
public class LoginPage {
    public boolean isLoggedIn() {
        return logoutLink.isDisplayed();
    }
}

// In test class
Assert.assertTrue(loginPage.isLoggedIn());
```

**Mistake**: Hard-coding values
```java
// WRONG
driver.get("https://example.com");

// CORRECT
driver.get(ConfigReader.getProperty("base.url"));
```

**Mistake**: Not using waits properly
```java
// WRONG
Thread.sleep(5000);

// CORRECT
WaitUtils.waitForVisibility(driver, element, 10);
```

### 2. Test Design Mistakes

**Mistake**: Test dependencies
```java
// WRONG - Tests dependent on execution order
@Test(priority = 1)
public void createUser() { }

@Test(priority = 2) // Depends on test 1
public void loginUser() { }

// CORRECT - Independent tests
@Test
public void testLogin() {
    // Create test data
    // Perform login
    // Cleanup
}
```

**Mistake**: Multiple assertions without clear messages
```java
// WRONG
Assert.assertTrue(condition1);
Assert.assertEquals(value1, value2);

// CORRECT
Assert.assertTrue(condition1, "Login should succeed");
Assert.assertEquals(value1, value2, "Cart total should match");
```

### 3. Code Quality Mistakes

**Mistake**: No exception handling
```java
// WRONG
public void clickElement(WebElement element) {
    element.click();
}

// CORRECT
public void clickElement(WebElement element) {
    try {
        WaitUtils.waitForClickability(driver, element, 10);
        element.click();
    } catch (TimeoutException e) {
        logger.error("Element not clickable", e);
        throw new ElementNotFoundException("Element not clickable", e);
    }
}
```

**Mistake**: Not cleaning up resources
```java
// WRONG
@AfterMethod
public void tearDown() {
    // Driver not quit properly
}

// CORRECT
@AfterMethod
public void tearDown() {
    if (driver != null) {
        driver.quit();
    }
}
```

### 4. Performance Mistakes

**Mistake**: Too many explicit waits
```java
// WRONG
wait.until(condition1);
wait.until(condition2);
wait.until(condition3); // Each waits full timeout

// CORRECT
// Use appropriate wait strategy or fluent waits
```

**Mistake**: Not using parallel execution
```xml
<!-- WRONG -->
<suite name="Suite">

<!-- CORRECT -->
<suite name="Suite" parallel="tests" thread-count="3">
```

---

## 17. Next Steps and Career Path

### Immediate Next Steps

1. **Practice and Refine**
   - Implement the complete framework
   - Add more test scenarios
   - Experiment with different patterns
   - Optimize performance

2. **Expand Knowledge**
   - API testing with RestAssured
   - Mobile testing with Appium
   - Performance testing with JMeter
   - Security testing basics

3. **Advanced Topics**
   - BDD with Cucumber
   - Visual regression testing
   - Accessibility testing
   - Cloud testing platforms (BrowserStack, Sauce Labs)

### Career Paths

#### 1. SDET (Software Development Engineer in Test)
- **Skills**: Java, frameworks, CI/CD, cloud platforms
- **Responsibilities**: Framework development, test automation
- **Salary Range**: $80K - $150K

#### 2. Automation Architect
- **Skills**: Multiple frameworks, design patterns, cloud
- **Responsibilities**: Framework design, strategy, mentoring
- **Salary Range**: $120K - $180K+

#### 3. QA Lead/Manager
- **Skills**: Automation + management + strategy
- **Responsibilities**: Team management, process improvement
- **Salary Range**: $100K - $160K

#### 4. Performance Test Engineer
- **Skills**: JMeter, LoadRunner, performance analysis
- **Responsibilities**: Load testing, performance optimization
- **Salary Range**: $90K - $140K

### Certifications to Consider

1. **ISTQB Certifications**
   - Foundation Level
   - Advanced Level Test Automation Engineer
   - Agile Tester

2. **Selenium Certifications**
   - Selenium WebDriver with Java

3. **Cloud Certifications**
   - AWS Certified Developer
   - Azure Fundamentals

### Building Your Portfolio

1. **GitHub Projects**
   - Complete frameworks
   - Open-source contributions
   - Sample test projects

2. **Technical Blog**
   - Share learnings
   - Tutorial articles
   - Problem-solving approaches

3. **LinkedIn Profile**
   - Showcase projects
   - Share achievements
   - Network with professionals

---

## 18. Course Summary and Recap

### Week-by-Week Review

#### Week 1: Fundamentals
- Java basics for automation
- Selenium WebDriver introduction
- Element locators and interactions
- Basic automation scripts

#### Week 2: Advanced Interactions
- Advanced locators (XPath, CSS)
- Waits (implicit, explicit, fluent)
- Handling dropdowns, alerts, frames
- Actions class for complex interactions

#### Week 3: Framework Foundations
- TestNG framework
- Annotations and assertions
- Parameterization and grouping
- Parallel execution

#### Week 4: Page Object Model
- POM design pattern
- Page Factory
- Base classes
- Framework structure

#### Week 5: Data-Driven Testing
- Excel integration
- JSON/CSV data sources
- Data providers
- External data management

#### Week 6: Reporting & Configuration
- Extent Reports
- Log4j2 integration
- Configuration management
- Utility classes

#### Week 7: Advanced Topics & Capstone
- Cross-browser testing
- CI/CD integration
- Docker containerization
- Complete framework implementation

---

## 18.5. Capstone Project Milestones

Build your complete E-Commerce automation framework through these structured milestones. Each milestone builds upon the previous one, culminating in a production-ready framework.

---

### Milestone 1: Project Setup and Base Framework (4-6 hours)

**Objective**: Set up the project structure, Maven dependencies, and create the base framework components.

**Tasks**:
1. Create Maven project with proper directory structure
2. Add all required dependencies (Selenium, TestNG, Log4j2, Extent Reports, Apache POI)
3. Create configuration files (config.properties, log4j2.xml)
4. Implement ConfigReader utility class
5. Create BaseTest class with setup and teardown
6. Implement DriverManager with ThreadLocal pattern
7. Set up basic logging infrastructure

**Deliverables**:
- Maven project with pom.xml containing all dependencies
- src/test/resources/config.properties with environment settings
- src/test/resources/log4j2.xml for logging configuration
- Base framework classes: BaseTest, DriverManager, ConfigReader
- Project compiles and runs successfully

**Success Criteria**:
- Maven build succeeds without errors
- Config properties are loaded correctly
- Driver can be initialized for Chrome/Firefox
- Logs are generated in test-output/logs folder
- BaseTest setup and teardown work properly

**Resources Needed**:
- Maven 3.x
- Java JDK 11 or higher
- IDE (IntelliJ IDEA or Eclipse)
- Chrome and Firefox browsers installed

---

### Milestone 2: Page Object Model Implementation (6-8 hours)

**Objective**: Implement complete Page Object Model for key e-commerce pages.

**Tasks**:
1. Create BasePage class with common WebDriver methods
2. Implement LoginPage with all locators and methods
3. Implement HomePage with navigation and search functionality
4. Implement ProductListPage with filtering and sorting
5. Implement ProductDetailsPage
6. Implement ShoppingCartPage with cart operations
7. Implement CheckoutPage with payment flow
8. Use PageFactory annotations for element initialization

**Deliverables**:
- BasePage with reusable methods (click, sendKeys, waitFor, etc.)
- 6-7 Page Object classes covering main flows
- Each page class has proper locators using @FindBy
- Page classes have meaningful method names (not clickElement1)
- Constructor initializes elements using PageFactory

**Success Criteria**:
- All page objects compile without errors
- Page navigation methods return correct page objects
- Elements are properly encapsulated (private locators)
- Methods have descriptive names matching user actions
- No WebDriver interactions in test classes

**Key Pages to Implement**:
```
- LoginPage
- HomePage
- ProductListPage
- ProductDetailsPage
- ShoppingCartPage
- CheckoutPage
- MyAccountPage (optional)
```

---

### Milestone 3: Test Implementation and Data-Driven Testing (6-8 hours)

**Objective**: Create comprehensive test scenarios with data-driven approach.

**Tasks**:
1. Create LoginTest class with positive and negative scenarios
2. Implement ProductSearchTest with multiple search terms
3. Create End-to-End checkout test
4. Implement ExcelUtils class for reading test data
5. Create Excel file with test data (users, products, etc.)
6. Implement TestNG DataProvider for data-driven tests
7. Add proper assertions and validations
8. Implement soft assertions where appropriate

**Deliverables**:
- Minimum 15-20 test methods covering critical flows
- ExcelUtils class for reading Excel data
- Test data Excel file with multiple sheets
- Data providers connected to test methods
- Clear test method names following naming convention
- Comprehensive assertions in all tests

**Success Criteria**:
- All tests execute successfully
- Data-driven tests read from Excel correctly
- Assertions validate expected vs actual results
- Tests are independent and can run in any order
- No hardcoded test data in test methods

**Test Scenarios to Cover**:
```
Login Tests:
- Valid login
- Invalid username
- Invalid password
- Empty credentials
- Account lockout

Search Tests:
- Valid product search
- Partial product name
- No results found
- Special characters
- Multiple products

E2E Tests:
- Complete purchase flow
- Add multiple products to cart
- Apply coupon code
- Guest checkout
- Registered user checkout
```

---

### Milestone 4: Reporting and Logging Integration (4-5 hours)

**Objective**: Implement comprehensive reporting using Extent Reports and structured logging.

**Tasks**:
1. Set up ExtentReports configuration
2. Create ExtentManager class
3. Implement ExtentTestListener
4. Add test steps logging to reports
5. Capture screenshots on failure
6. Attach screenshots to Extent Reports
7. Configure Log4j2 with different log levels
8. Create separate logs for each test run

**Deliverables**:
- ExtentReports integration with proper configuration
- Screenshot utility class
- Test listener implementation
- HTML reports generated in test-output folder
- Logs organized by date/time
- Screenshots embedded in reports for failures

**Success Criteria**:
- HTML report generated after test execution
- Report shows test name, status, duration
- Failed tests show screenshots
- Test steps are logged in reports
- Logs contain INFO, DEBUG, ERROR level messages
- Reports are visually appealing and readable

---

### Milestone 5: Cross-Browser and Parallel Execution (4-5 hours)

**Objective**: Enable tests to run on multiple browsers in parallel.

**Tasks**:
1. Create BrowserFactory class
2. Implement RemoteWebDriver support
3. Create testng.xml for parallel execution
4. Configure thread-count and parallel mode
5. Test on Chrome, Firefox, and Edge
6. Ensure thread safety using ThreadLocal
7. Handle browser-specific issues

**Deliverables**:
- BrowserFactory with support for 3+ browsers
- testng.xml configured for parallel="tests"
- Tests execute successfully on all browsers
- No thread interference in parallel execution
- Browser-specific reports generated

**Success Criteria**:
- Tests run successfully on Chrome, Firefox, Edge
- Parallel execution reduces total execution time
- No "driver already quit" or thread safety issues
- Each browser gets separate report section
- Browser name visible in test logs

---

### Milestone 6: CI/CD Pipeline Integration (3-4 hours)

**Objective**: Set up CI/CD pipeline using GitHub Actions or Jenkins.

**Tasks**:
1. Create GitHub repository for the project
2. Push code to repository
3. Create GitHub Actions workflow (.github/workflows/maven.yml)
4. Configure workflow to run tests on push/PR
5. Set up test reports artifact upload
6. Configure browser drivers in CI environment
7. Add build status badge to README

**Deliverables**:
- GitHub repository with complete code
- GitHub Actions workflow file
- Tests execute automatically on code push
- Test reports available as artifacts
- README with project documentation
- Build status badge showing pass/fail

**Success Criteria**:
- CI pipeline triggers automatically
- Tests execute in CI environment
- Build passes with all tests green
- Reports are accessible post-execution
- Failed builds send notifications

**GitHub Actions Workflow Template**:
```yaml
name: Selenium Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 11
        uses: actions/setup-java@v2
        with:
          java-version: '11'
      - name: Run tests
        run: mvn clean test
      - name: Upload reports
        uses: actions/upload-artifact@v2
        with:
          name: test-reports
          path: test-output/
```

---

### Milestone 7: Docker Integration (Optional - 3-4 hours)

**Objective**: Containerize tests for consistent execution across environments.

**Tasks**:
1. Create docker-compose.yml for Selenium Grid
2. Configure Hub and Node services
3. Update test configuration for Grid URL
4. Test execution on Docker Grid
5. Create Dockerfile for test application (optional)
6. Document Docker setup in README

**Deliverables**:
- docker-compose.yml with Grid configuration
- Updated ConfigReader to support Grid URL
- Tests execute successfully on Docker Grid
- Docker commands documented in README

**Success Criteria**:
- Docker containers start successfully
- Tests connect to Grid and execute
- Results are consistent with local execution
- Easy setup with single command

---

### Final Integration Checklist

Before considering the project complete, verify:

**Code Quality**:
- [ ] No hardcoded values (use config.properties)
- [ ] No duplicate code (use utility methods)
- [ ] Meaningful variable and method names
- [ ] Proper exception handling
- [ ] Comments where needed

**Framework Features**:
- [ ] Page Object Model implemented
- [ ] Data-driven testing working
- [ ] Cross-browser support enabled
- [ ] Parallel execution configured
- [ ] Reporting integrated
- [ ] Logging configured
- [ ] Screenshots on failure
- [ ] CI/CD pipeline setup

**Testing Coverage**:
- [ ] Login functionality tested
- [ ] Product search tested
- [ ] Add to cart tested
- [ ] Checkout flow tested
- [ ] Positive and negative scenarios
- [ ] Data-driven tests working

**Documentation**:
- [ ] README with setup instructions
- [ ] Code comments where needed
- [ ] Test execution instructions
- [ ] Troubleshooting guide
- [ ] Architecture diagram (optional)

**Best Practices**:
- [ ] Waits used properly (no Thread.sleep)
- [ ] Assertions in all tests
- [ ] Independent test cases
- [ ] Proper test data management
- [ ] Git commits with clear messages

---

### Project Submission Guidelines

**GitHub Repository Structure**:
```
selenium-ecommerce-framework/
├── .github/
│   └── workflows/
│       └── maven.yml
├── src/
│   ├── main/java/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── config/
│   └── test/
│       ├── java/
│       │   └── tests/
│       └── resources/
│           ├── config.properties
│           ├── log4j2.xml
│           ├── testng.xml
│           └── testdata/
│               └── TestData.xlsx
├── test-output/
├── docker-compose.yml
├── pom.xml
└── README.md
```

**README Should Include**:
1. Project overview and objectives
2. Technologies and tools used
3. Framework architecture
4. Setup instructions
5. How to run tests
6. How to view reports
7. CI/CD integration details
8. Troubleshooting tips
9. Future enhancements
10. Contact information

---

### Grading Rubric (Self-Assessment)

Rate your implementation (1-5 scale):

**Code Organization (20%)**:
- Proper package structure
- Naming conventions followed
- Code is maintainable

**Framework Implementation (30%)**:
- POM correctly implemented
- Data-driven testing works
- Configuration management
- Logging and reporting

**Test Coverage (20%)**:
- Critical scenarios covered
- Positive and negative tests
- Data-driven tests
- Assertions present

**Best Practices (15%)**:
- No hardcoded values
- Proper waits usage
- Exception handling
- Code reusability

**Documentation (10%)**:
- README is clear
- Comments where needed
- Setup instructions work

**Advanced Features (5%)**:
- Cross-browser testing
- Parallel execution
- CI/CD integration
- Docker integration

**Total Score**: _____ / 100

**Grading**:
- 90-100: Excellent (Production-ready)
- 80-89: Good (Minor improvements needed)
- 70-79: Satisfactory (Several improvements needed)
- Below 70: Needs significant work

---

## 18. Beginner-Friendly Exercises

Practice building a complete test automation framework with these comprehensive project exercises. These exercises build on each other to create a production-ready framework.

---

### Exercise 1: Base Framework Setup (45-60 minutes)

**Objective**: Set up the foundational structure of a test automation framework including Maven project, dependencies, folder structure, and base classes.

**Project Scenario**: You're starting a new e-commerce automation project. Set up the complete framework structure from scratch with all necessary dependencies and base classes.

**Implementation Requirements**:

**Step 1: Maven Project Setup (10 minutes)**
1. Create new Maven project: `ecommerce-automation-framework`
2. Configure `pom.xml` with required dependencies:
   - Selenium WebDriver (4.15.0)
   - TestNG (7.8.0)
   - WebDriverManager (5.6.0)
   - Extent Reports (5.1.1)
   - Log4j2 (2.20.0)
   - Apache POI (5.2.3) for Excel
   - Commons IO (2.11.0)
3. Configure Maven compiler plugin for Java 11
4. Add Maven Surefire plugin for test execution

**Step 2: Folder Structure (10 minutes)**
5. Create standard package structure:
   ```
   src/main/java/
   ├── base/
   ├── pages/
   ├── utils/
   └── listeners/
   src/test/java/
   └── tests/
   src/main/resources/
   └── config.properties
   src/test/resources/
   ├── testdata/
   └── testsuites/
   ```
6. Create directories for reports, screenshots, and logs in project root

**Step 3: Base Classes (15 minutes)**
7. Create `BasePage` class with common page methods:
   - Constructor with WebDriver
   - Wait utilities (explicit waits)
   - Element interaction methods
   - JavaScript executor methods
8. Create `BaseTest` class with TestNG annotations:
   - @BeforeSuite, @AfterSuite
   - @BeforeMethod, @AfterMethod
   - WebDriver initialization and cleanup
   - Screenshot capture on failure

**Step 4: Configuration Management (10 minutes)**
9. Create `config.properties` file with:
   - browser (chrome/firefox/edge)
   - base.url
   - implicit.wait
   - explicit.wait
   - headless (true/false)
10. Create `ConfigReader` utility class to read properties

**Expected Deliverables**:
- Maven project with all dependencies configured
- Complete folder structure created
- BasePage with reusable methods
- BaseTest with TestNG lifecycle methods
- ConfigReader utility class
- config.properties with all settings

**Common Mistakes to Avoid**:
1. Not using compatible dependency versions
2. Missing Maven compiler/surefire plugin configuration
3. Not creating all necessary folders upfront
4. Hardcoding values instead of using config.properties
5. Not implementing proper wait mechanisms in BasePage

**Evaluation Criteria**:
- Project compiles without errors (15 points)
- All dependencies correctly added (15 points)
- Folder structure follows best practices (10 points)
- BasePage has essential methods (20 points)
- BaseTest properly configured (20 points)
- ConfigReader working correctly (20 points)

---

### Exercise 2: Complete Page Object Model Implementation (60-75 minutes)

**Objective**: Implement complete Page Object Model for an e-commerce application including Login, Products, Cart, and Checkout pages with all necessary methods.

**Project Scenario**: Build page objects for a complete e-commerce user journey from login through checkout, following POM best practices.

**Implementation Requirements**:

**Step 1: Login Page (15 minutes)**
1. Create `LoginPage` class extending `BasePage`
2. Define WebElements using @FindBy annotations:
   - Username field
   - Password field
   - Login button
   - Error message
3. Implement methods:
   - `login(username, password)` - returns ProductsPage
   - `getErrorMessage()` - returns String
   - `isLoginPageDisplayed()` - returns boolean

**Step 2: Products Page (20 minutes)**
4. Create `ProductsPage` class extending `BasePage`
5. Define WebElements:
   - Product containers (list)
   - Add to cart buttons
   - Product names, prices
   - Cart icon, cart badge
   - Sort dropdown
6. Implement methods:
   - `addProductToCart(productName)` - returns ProductsPage
   - `getProductPrice(productName)` - returns String
   - `getCartBadgeCount()` - returns int
   - `clickCart()` - returns CartPage
   - `sortProducts(option)` - returns ProductsPage

**Step 3: Cart Page (15 minutes)**
7. Create `CartPage` class extending `BasePage`
8. Define WebElements:
   - Cart items list
   - Item names, prices, quantities
   - Remove buttons
   - Continue shopping button
   - Checkout button
9. Implement methods:
   - `getCartItems()` - returns List<String>
   - `removeItem(productName)` - returns CartPage
   - `clickCheckout()` - returns CheckoutPage
   - `getTotalPrice()` - returns String

**Step 4: Checkout Page (15 minutes)**
10. Create `CheckoutPage` class extending `BasePage`
11. Define WebElements:
    - First name, last name, zip code fields
    - Continue button
    - Finish button
    - Confirmation message
12. Implement methods:
    - `enterShippingInfo(firstName, lastName, zipCode)` - returns CheckoutPage
    - `clickContinue()` - returns CheckoutPage
    - `clickFinish()` - returns CheckoutPage
    - `getConfirmationMessage()` - returns String

**Step 5: Page Factory Integration (5 minutes)**
13. Ensure all pages use PageFactory.initElements in constructor
14. Add proper waits for page load
15. Implement fluent interface pattern (method chaining)

**Code Structure Guidance**:
```java
// Example LoginPage structure
public class LoginPage extends BasePage {

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "login-button")
    private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public ProductsPage login(String username, String password) {
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        loginButton.click();
        return new ProductsPage(driver);
    }

    // Additional methods...
}
```

**Expected Deliverables**:
- LoginPage with login functionality
- ProductsPage with product selection
- CartPage with cart management
- CheckoutPage with order completion
- All pages using PageFactory
- Fluent interface implementation

**Common Mistakes to Avoid**:
1. Not using PageFactory.initElements
2. Not extending BasePage
3. Hardcoding wait times instead of using explicit waits
4. Not returning page objects (breaking fluent interface)
5. Exposing WebElements publicly
6. Not handling stale element exceptions

**Evaluation Criteria**:
- LoginPage correctly implemented (20 points)
- ProductsPage with all features (25 points)
- CartPage properly working (20 points)
- CheckoutPage complete (20 points)
- PageFactory used correctly (10 points)
- Fluent interface implemented (5 points)

---

### Exercise 3: Test Suite Implementation (60-75 minutes)

**Objective**: Create comprehensive test classes covering end-to-end scenarios, implement data-driven testing, and configure TestNG test suites.

**Project Scenario**: Build a complete test suite with login tests, product tests, cart tests, and end-to-end checkout tests using data-driven approach.

**Implementation Requirements**:

**Step 1: Login Tests (15 minutes)**
1. Create `LoginTests` class extending `BaseTest`
2. Implement test methods:
   - `testValidLogin()` - verify successful login
   - `testInvalidUsername()` - verify error message
   - `testInvalidPassword()` - verify error message
   - `testEmptyCredentials()` - verify validation
3. Use proper assertions with meaningful messages
4. Add @Test annotations with descriptions and groups

**Step 2: Product Tests (15 minutes)**
5. Create `ProductTests` class extending `BaseTest`
6. Implement test methods:
   - `testAddSingleProduct()` - add product and verify cart badge
   - `testAddMultipleProducts()` - add 3 products and verify count
   - `testProductSorting()` - verify sort functionality
   - `testProductDetails()` - verify product information
7. Verify cart badge updates correctly

**Step 3: Cart Tests (15 minutes)**
8. Create `CartTests` class extending `BaseTest`
9. Implement test methods:
   - `testViewCartItems()` - verify items in cart
   - `testRemoveFromCart()` - remove item and verify
   - `testCartPriceCalculation()` - verify total price
   - `testEmptyCart()` - handle empty cart scenario

**Step 4: End-to-End Tests (15 minutes)**
10. Create `CheckoutTests` class extending `BaseTest`
11. Implement test methods:
    - `testCompleteCheckout()` - full purchase flow
    - `testCheckoutWithMultipleItems()` - checkout with 3+ items
    - `testCheckoutValidation()` - test field validations
    - `testOrderConfirmation()` - verify confirmation message

**Step 5: Data-Driven Testing (10 minutes)**
12. Create Excel file: `testdata/testdata.xlsx` with sheets:
    - LoginData (valid/invalid credentials)
    - ProductData (product names, prices)
    - CheckoutData (shipping information)
13. Create `ExcelUtils` class to read Excel data
14. Use @DataProvider to supply test data from Excel

**Step 6: TestNG Suite Configuration (10 minutes)**
15. Create `smoke-suite.xml`:
    - Include critical tests (@Test groups = "smoke")
    - Set parallel="methods" thread-count="3"
16. Create `regression-suite.xml`:
    - Include all test classes
    - Set parallel="classes" thread-count="5"
17. Add test parameters (browser, environment)

**Expected Deliverables**:
- LoginTests with 4+ test methods
- ProductTests with 4+ test methods
- CartTests with 4+ test methods
- CheckoutTests with end-to-end scenarios
- Excel file with test data
- ExcelUtils for data reading
- 2 TestNG suite XML files

**Common Mistakes to Avoid**:
1. Not using proper assertions with messages
2. Tests depending on each other (not independent)
3. Hardcoding test data instead of data-driven approach
4. Not using TestNG groups for categorization
5. Not handling test data file exceptions
6. Missing @DataProvider implementation
7. Incorrect parallel execution configuration

**Evaluation Criteria**:
- LoginTests comprehensive (15 points)
- ProductTests complete (15 points)
- CartTests thorough (15 points)
- CheckoutTests end-to-end (20 points)
- Data-driven tests working (15 points)
- TestNG suites configured (15 points)
- Code quality and assertions (5 points)

---

### Exercise 4: Reporting and Logging Integration (60-75 minutes)

**Objective**: Integrate Log4j2 for structured logging, configure Extent Reports for HTML test reports, implement screenshot capture on failures, and create TestNG listeners.

**Project Scenario**: Add comprehensive reporting and logging to the framework to track test execution, capture failures, and generate professional HTML reports.

**Implementation Requirements**:

**Step 1: Log4j2 Configuration (15 minutes)**
1. Create `log4j2.xml` in `src/main/resources/`:
   - Configure console appender with pattern
   - Configure file appender with rolling policy
   - Set log levels (INFO for root, DEBUG for framework)
   - Add separate log files for different components
2. Create `LoggerUtil` class:
   - Static logger instance
   - Methods for info, debug, warn, error logging
3. Add logging statements in:
   - BasePage methods
   - BaseTest lifecycle methods
   - Page Object methods
   - Test methods

**Step 2: Extent Reports Setup (15 minutes)**
4. Create `ExtentManager` class:
   - Initialize ExtentReports instance
   - Configure ExtentSparkReporter
   - Set report theme, title, document name
   - Add system information (OS, Browser, Java version)
5. Configure report path: `reports/ExtentReport_<timestamp>.html`
6. Implement singleton pattern for ExtentReports

**Step 3: TestNG Listener Implementation (20 minutes)**
7. Create `TestListener` class implementing `ITestListener`:
   - Implement `onTestStart()` - create test in report
   - Implement `onTestSuccess()` - log success
   - Implement `onTestFailure()` - capture screenshot, log failure
   - Implement `onTestSkipped()` - log skipped test
   - Implement `onFinish()` - flush reports
8. Use `ThreadLocal<ExtentTest>` for parallel execution
9. Add listener to BaseTest or testng.xml

**Step 4: Screenshot Utility (10 minutes)**
10. Create `ScreenshotUtils` class:
    - `takeScreenshot(driver, testName)` method
    - Save screenshots to `screenshots/` directory
    - Return screenshot path for report attachment
    - Add timestamp to filename
11. Integrate with TestListener to capture on failure
12. Attach screenshots to Extent Report

**Step 5: Retry Analyzer (10 minutes)**
13. Create `RetryAnalyzer` class implementing `IRetryAnalyzer`:
    - Configure max retry count (read from properties)
    - Implement retry logic for failed tests
    - Log retry attempts
14. Add `retryAnalyzer` to @Test annotation
15. Create `RetryListener` to apply to all tests

**Step 6: Report Enhancements (10 minutes)**
16. Add test categories/tags to Extent Report
17. Add test execution time
18. Add browser and environment details
19. Create summary dashboard showing:
    - Test execution summary (passed/failed/skipped)
    - Individual test details with descriptions
    - Screenshots attached to failed tests
    - System information
    - Execution timeline
20. Verify logs generated with appropriate levels
21. Test parallel execution maintains separate test contexts

**Expected Deliverables**:
- Log4j2 configured and generating logs
- ExtentReports generating HTML reports
- TestListener implemented and registered
- Screenshots captured on test failure
- Screenshots embedded in Extent Reports
- RetryAnalyzer configured for flaky tests
- Reports contain all test details and system info
- Parallel execution working with ThreadLocal

**Common Mistakes to Avoid**:
1. Not using ThreadLocal for ExtentTest in parallel execution
2. Forgetting to flush ExtentReports
3. Screenshot path not absolute - causing attachment failure
4. Not creating directories before saving screenshots
5. Listener not registered in testng.xml
6. Log4j2.xml in wrong location
7. Not handling screenshot exceptions
8. Using same ExtentTest instance for multiple tests

**Evaluation Criteria**:
- Extent Reports properly configured (20 points)
- Log4j2 generating logs correctly (15 points)
- TestListener properly implemented (20 points)
- Screenshots captured and attached (15 points)
- RetryAnalyzer working correctly (10 points)
- ThreadLocal implementation (10 points)
- Report quality and presentation (10 points)

---

### Exercise 5: CI/CD Pipeline Setup and Docker Integration (60-75 minutes)

**Objective**: Set up a complete CI/CD pipeline using GitHub Actions, integrate Docker for containerized test execution, and configure Selenium Grid in Docker.

**Project Scenario**: Your team needs automated test execution on every code push, pull request, and on a scheduled basis. Tests should run in Docker containers for consistency.

**Implementation Requirements**:

**Step 1: GitHub Repository Setup (10 minutes)**
1. Create GitHub repository: `ecommerce-automation-framework`
2. Initialize with README.md containing:
   - Project overview
   - Technologies used
   - Setup instructions
   - How to run tests
   - Project structure
3. Create .gitignore file excluding:
   - target/, test-output/, reports/, screenshots/, logs/
   - .idea/, .settings/, *.iml
4. Push framework code to main branch

**Step 2: GitHub Actions Workflow (20 minutes)**
5. Create `.github/workflows/ci.yml`:
   - Trigger on push to main/develop branches
   - Trigger on pull requests
   - Scheduled execution (daily at midnight)
6. Configure workflow jobs:
   - Checkout code
   - Set up JDK 11
   - Install browsers (Chrome, Firefox)
   - Run Maven tests with parameters
   - Upload test reports as artifacts
   - Upload screenshots on failure
   - Publish test results
7. Add matrix strategy for multiple browsers
8. Configure environment variables for test execution

**Step 3: Docker Compose for Selenium Grid (20 minutes)**
9. Create `docker-compose.yml` in project root:
   - Selenium Hub service (port 4444)
   - Chrome Node service (2 instances)
   - Firefox Node service (2 instances)
   - Edge Node service (1 instance)
10. Configure services:
    - Hub: session timeout, retry interval
    - Nodes: event bus connection, shm_size=2gb
    - Tests: volume mounts for reports and screenshots
11. Network configuration for service communication
12. Health checks for services

**Step 4: Configuration for Remote Execution (10 minutes)**
13. Update `config.properties`:
    - Add execution.mode property (local/remote/docker)
    - Add grid.url property
14. Update DriverFactory to support remote execution:
    - Check execution.mode
    - Create RemoteWebDriver when mode is "remote"
    - Connect to grid.url
    - Pass browser capabilities
15. Test local Grid connection

**Step 5: Testing and Validation (10 minutes)**
16. Test Docker Compose locally:
    - `docker-compose up -d`
    - Access Grid UI at http://localhost:4444
    - Verify all nodes registered
    - Run tests pointing to Grid
17. Test GitHub Actions workflow:
    - Push code to trigger workflow
    - Monitor workflow execution
    - Verify tests executed successfully
    - Download and check artifacts
18. Test scheduled execution configuration
19. Verify email notifications on failure (optional)

**Expected Deliverables**:
- GitHub repository with complete code
- GitHub Actions workflow configured and working
- Docker Compose file for Selenium Grid
- Tests execute automatically on push/PR
- Docker containers start and run tests successfully
- Test reports uploaded as artifacts
- Grid accessible at http://localhost:4444
- README with setup and execution instructions

**Common Mistakes to Avoid**:
1. Not adding shm_size to Docker nodes causing browser crashes
2. Missing depends_on causing nodes to start before hub
3. Wrong Grid URL in configuration (localhost vs container name)
4. Not installing browsers in GitHub Actions workflow
5. Forgetting to cache Maven dependencies slowing builds
6. Not using matrix strategy missing browser combinations
7. Hardcoding credentials in workflow files
8. Not configuring artifact upload on test failure

**Evaluation Criteria**:
- GitHub Actions workflow properly configured (25 points)
- Docker Compose working correctly (25 points)
- Tests execute successfully in Docker (20 points)
- Remote execution configured correctly (15 points)
- Artifacts uploaded properly (10 points)
- Documentation in README (5 points)

---

### Exercise 6: Final Integration, Testing, and Framework Validation (75-90 minutes)

**Objective**: Perform complete framework integration, execute comprehensive test suites, validate all components, create documentation, and prepare the framework for production use.

**Project Scenario**: Your framework is nearly complete. Validate all components work together, execute tests in different modes, measure performance, and create comprehensive documentation for team handoff.

**Implementation Requirements**:

**Step 1: Complete Framework Integration (15 minutes)**
1. Verify all components integrated:
   - DriverFactory working with all browsers
   - All Page Objects functional
   - Tests executing successfully
   - Reporting generating correctly
   - Logging capturing all activities
   - CI/CD pipeline operational
2. Create utility method integrations:
   - DateTimeUtils for timestamp generation
   - RandomDataGenerator for test data
   - JsonUtils for JSON test data (optional)
3. Ensure ThreadLocal working for parallel execution
4. Verify cross-browser compatibility

**Step 2: Comprehensive Test Execution (20 minutes)**
5. Execute smoke test suite (smoke-suite.xml):
   - Should complete in under 5 minutes
   - All critical tests should pass
   - Verify report generation
6. Execute regression test suite (regression-suite.xml):
   - Run all test packages
   - Execute in parallel mode
   - Monitor execution time
7. Execute cross-browser suite:
   - Test on Chrome, Firefox, Edge
   - Verify all browsers pass
   - Compare execution times
8. Execute on Docker Grid:
   - Start Grid with docker-compose
   - Run tests in remote mode
   - Verify distributed execution
9. Document execution results:
   - Pass/fail rates
   - Execution times
   - Browser-specific issues
   - Performance metrics

**Step 3: Framework Validation Checklist (15 minutes)**
10. Validate framework components systematically:

**Code Quality Validation**:
- [ ] No hardcoded values (use config.properties)
- [ ] No duplicate code (DRY principle followed)
- [ ] Meaningful variable and method names
- [ ] Proper exception handling throughout
- [ ] Comprehensive logging in all components
- [ ] JavaDoc comments on public methods

**Architecture Validation**:
- [ ] Page Object Model properly implemented
- [ ] Base classes providing reusable functionality
- [ ] Proper separation of concerns
- [ ] Utility classes are stateless and reusable
- [ ] Constants defined in appropriate classes

**Testing Validation**:
- [ ] Tests are independent (no dependencies)
- [ ] Proper assertions with messages
- [ ] Data-driven tests working
- [ ] Test organization logical
- [ ] Minimum 15-20 test methods

**Configuration Validation**:
- [ ] Config properties loaded correctly
- [ ] Multiple environments supported
- [ ] Runtime parameter override working
- [ ] Browser configurations functional

**Reporting Validation**:
- [ ] Extent Reports generating HTML
- [ ] Screenshots attached on failure
- [ ] Test categorization working
- [ ] Report shows execution timeline
- [ ] System information displayed

**CI/CD Validation**:
- [ ] GitHub Actions workflow executing
- [ ] Tests run on push/PR
- [ ] Artifacts uploaded correctly
- [ ] Scheduled execution configured

**Docker Validation**:
- [ ] Docker Compose starts Grid
- [ ] All nodes register with Hub
- [ ] Tests execute on Grid
- [ ] Containers scale properly

**Step 4: Performance Optimization (15 minutes)**
11. Measure and optimize performance:
    - Record baseline execution time
    - Enable parallel execution
    - Measure improved execution time
    - Optimize slow tests
    - Review wait times
12. Performance metrics to capture:
    - Total suite execution time
    - Average test execution time
    - Parallel vs sequential comparison
    - Browser-specific performance
    - Grid vs local execution comparison

**Step 5: Documentation Creation (20 minutes)**
13. Create comprehensive README.md with:
    - Project overview and architecture
    - Technologies used
    - Prerequisites and setup instructions
    - Running tests (local, Docker, CI/CD)
    - Test reports location
    - Framework features
    - Configuration details
    - Test data management
    - Troubleshooting section
    - Contributing guidelines

14. Create CONTRIBUTING.md with guidelines
15. Create CHANGELOG.md for version tracking

**Step 6: Final Validation and Handoff (10 minutes)**
16. Execute final validation:
    - Run complete regression suite
    - Verify all tests pass
    - Check reports generated correctly
    - Validate CI/CD execution
    - Review logs for errors
17. Create project presentation/demo:
    - Framework architecture overview
    - Demo test execution
    - Show reports and logs
    - Demonstrate CI/CD pipeline
    - Docker Grid demonstration
18. Prepare handoff materials:
    - Setup guide
    - Troubleshooting document
    - Best practices guide
    - Team training materials

**Expected Deliverables**:
- Complete, production-ready framework
- All tests passing successfully
- Comprehensive README.md
- Performance metrics documented
- Framework validation checklist completed
- CI/CD pipeline operational
- Docker Grid configured and tested
- Project ready for team handoff

**Common Mistakes to Avoid**:
1. Not testing framework in all execution modes before finalizing
2. Missing critical documentation in README
3. Not measuring performance metrics
4. Incomplete validation checklist
5. Not testing parallel execution thoroughly
6. Missing troubleshooting section in documentation
7. Not preparing demo for stakeholders
8. Forgetting to test on clean environment

**Evaluation Criteria**:
- All components integrated successfully (20 points)
- Complete test execution in all modes (20 points)
- Framework validation checklist completed (20 points)
- Performance metrics captured (10 points)
- Comprehensive documentation (15 points)
- CI/CD pipeline operational (10 points)
- Production-ready quality (5 points)

**Final Project Assessment**:

**Total Score Calculation**:
- Exercise 1: Base Framework (60 points possible)
- Exercise 2: Page Objects (90 points possible)
- Exercise 3: Test Implementation (80 points possible)
- Exercise 4: Reporting & Logging (100 points possible)
- Exercise 5: CI/CD & Docker (100 points possible)
- Exercise 6: Integration & Validation (100 points possible)

**Total**: 530 points possible

**Grading Scale**:
- 475-530 (90%+): Excellent - Production Ready
- 425-474 (80-89%): Good - Minor improvements needed
- 370-424 (70-79%): Satisfactory - Several improvements needed
- Below 370 (<70%): Needs significant work

**Success Indicators**:
- Framework compiles without errors
- All test suites execute successfully
- Reports generate correctly
- CI/CD pipeline operational
- Docker integration working
- Documentation comprehensive
- Code follows best practices
- Ready for production use

---

## 19. Key Takeaways

### 1. Framework Design
- Design frameworks with scalability in mind
- Follow SOLID principles and design patterns
- Separate concerns (tests, pages, utils, config)
- Use meaningful names and proper documentation
- Implement proper exception handling

### 2. Page Object Model
- Encapsulate page elements and methods
- Use Page Factory for element initialization
- Follow fluent interface pattern for method chaining
- Keep page classes focused and cohesive
- Implement base page for common functionality

### 3. Test Design
- Write independent, atomic tests
- Use data-driven approach for test coverage
- Implement proper assertions with messages
- Organize tests logically with priorities
- Handle test data properly

### 4. Waits and Synchronization
- Always use explicit waits over Thread.sleep
- Implement custom wait conditions when needed
- Use fluent waits for complex scenarios
- Configure timeouts appropriately
- Handle stale element exceptions

### 5. Reporting and Logging
- Implement comprehensive reporting (Extent Reports)
- Use proper logging levels (INFO, DEBUG, ERROR)
- Capture screenshots on failures
- Log meaningful messages for debugging
- Track test execution metrics

### 6. Configuration Management
- Externalize configuration in properties files
- Support multiple environments
- Use ConfigReader for centralized access
- Allow runtime parameter overrides
- Secure sensitive information

### 7. Data-Driven Testing
- Separate test data from test logic
- Support multiple data formats (Excel, JSON, CSV)
- Implement proper data providers
- Handle data validation
- Maintain test data independently

### 8. Exception Handling
- Create custom exception hierarchy
- Provide meaningful error messages
- Log exceptions with context
- Implement retry mechanisms for flaky tests
- Handle exceptions at appropriate levels

### 9. Utilities and Helper Methods
- Create reusable utility classes
- Keep utilities stateless (static methods)
- Document utility methods properly
- Follow single responsibility principle
- Test utilities independently

### 10. Browser Management
- Use WebDriverManager for driver management
- Implement ThreadLocal for parallel execution
- Support multiple browsers
- Configure browser options properly
- Clean up resources after tests

### 11. CI/CD Integration
- Automate test execution in pipelines
- Configure proper build stages
- Archive test artifacts
- Set up notifications
- Schedule regular test runs

### 12. Cross-Browser Testing
- Test on multiple browsers and versions
- Use Selenium Grid for distributed testing
- Implement browser-specific configurations
- Handle browser-specific issues
- Document browser compatibility

### 13. Docker Integration
- Containerize test execution
- Use Docker Compose for orchestration
- Configure Selenium Grid in containers
- Mount volumes for reports and screenshots
- Optimize container images

### 14. Best Practices
- Follow coding standards and conventions
- Write clean, readable code
- Use version control (Git) effectively
- Conduct code reviews
- Continuously refactor and improve

### 15. Performance Optimization
- Minimize wait times where possible
- Use parallel execution effectively
- Optimize page load strategies
- Reduce unnecessary operations
- Monitor test execution time

### 16. Maintainability
- Keep code DRY (Don't Repeat Yourself)
- Use constants for repeated values
- Implement proper abstraction
- Document complex logic
- Write self-explanatory code

### 17. Collaboration
- Share knowledge with team members
- Document framework architecture
- Provide clear README files
- Use descriptive commit messages
- Follow team conventions

### 18. Debugging Techniques
- Use IDE debugging features
- Implement proper logging
- Capture screenshots at failure points
- Analyze stack traces effectively
- Use browser developer tools

### 19. Test Data Management
- Generate test data dynamically when possible
- Use faker libraries for realistic data
- Maintain separate test data sets
- Clean up test data after execution
- Version control test data files

### 20. Security Considerations
- Don't commit sensitive data to repositories
- Use environment variables for secrets
- Encrypt sensitive configuration
- Follow security best practices
- Regular security audits

### 21. Continuous Improvement
- Learn from test failures
- Analyze and reduce flaky tests
- Gather metrics and insights
- Stay updated with new technologies
- Seek feedback and iterate

### 22. Career Development
- Build a strong portfolio
- Contribute to open-source projects
- Network with professionals
- Attend conferences and meetups
- Pursue relevant certifications

### 23. Problem-Solving Approach
- Break down complex problems
- Use systematic debugging
- Research and learn continuously
- Ask for help when needed
- Document solutions for future reference

### 24. Testing Mindset
- Think from user's perspective
- Question assumptions
- Be detail-oriented
- Balance automation and manual testing
- Focus on quality over quantity

### 25. Framework Evolution
- Start simple, grow organically
- Refactor regularly
- Incorporate feedback
- Stay flexible and adaptable
- Plan for future requirements

---

## 20. Final Assessment

### Section A: Multiple Choice Questions (20 Questions)

**1. What is the primary purpose of the Page Object Model (POM) design pattern?**
   a) To speed up test execution
   b) To separate test logic from page structure
   c) To reduce memory consumption
   d) To enable parallel execution

**2. Which wait strategy should be used for dynamic elements?**
   a) Thread.sleep()
   b) Implicit Wait
   c) Explicit Wait
   d) No wait needed

**3. What is ThreadLocal used for in Selenium framework?**
   a) To speed up execution
   b) To enable parallel test execution
   c) To reduce memory usage
   d) To handle exceptions

**4. Which annotation is used in TestNG to define test execution order?**
   a) @Order
   b) @Priority
   c) @Sequence
   d) @Rank

**5. What is the purpose of WebDriverManager?**
   a) To manage browser windows
   b) To automatically download and setup browser drivers
   c) To manage test execution
   d) To handle waits

**6. Which report format does Extent Reports generate?**
   a) PDF only
   b) HTML only
   c) XML only
   d) HTML, PDF, and others

**7. What is the advantage of data-driven testing?**
   a) Faster execution
   b) Testing with multiple data sets using the same test
   c) Better reporting
   d) Reduced code size

**8. Which TestNG feature allows running failed tests again?**
   a) Retry Analyzer
   b) Rerun Failed Tests
   c) Both a and b
   d) None

**9. What is the purpose of log4j2.xml?**
   a) To configure test execution
   b) To configure logging behavior
   c) To manage test data
   d) To setup browser options

**10. Which design principle states "a class should have only one reason to change"?**
    a) Open/Closed Principle
    b) Single Responsibility Principle
    c) Liskov Substitution Principle
    d) Dependency Inversion Principle

**11. What is the correct way to handle StaleElementReferenceException?**
    a) Use Thread.sleep()
    b) Increase implicit wait
    c) Re-find the element
    d) Restart the browser

**12. Which file is used for Maven dependencies?**
    a) build.xml
    b) pom.xml
    c) dependencies.xml
    d) maven.xml

**13. What is the purpose of @BeforeSuite annotation?**
    a) Runs before each test
    b) Runs before each method
    c) Runs once before all tests in the suite
    d) Runs after suite completion

**14. Which is NOT a valid Selenium locator strategy?**
    a) By ID
    b) By className
    c) By elementName
    d) By cssSelector

**15. What is Selenium Grid used for?**
    a) Data management
    b) Distributed test execution
    c) Report generation
    d) Code compilation

**16. Which TestNG attribute enables parallel test execution?**
    a) parallel="true"
    b) parallel="tests"
    c) parallel="enable"
    d) Both a and b

**17. What is the purpose of ConfigReader class?**
    a) To read test code
    b) To read configuration properties
    c) To read test data
    d) To read browser logs

**18. Which exception is thrown when an element is not found?**
    a) ElementNotFoundException
    b) NoSuchElementException
    c) ElementNotFoundError
    d) MissingElementException

**19. What is Docker used for in test automation?**
    a) Code compilation
    b) Containerized test execution
    c) Report generation
    d) Test data management

**20. Which CI/CD tool is commonly used with Selenium?**
    a) Jenkins
    b) GitHub Actions
    c) GitLab CI
    d) All of the above

### Answer Key
1. b  2. c  3. b  4. b  5. b  6. d  7. b  8. c  9. b  10. b
11. c  12. b  13. c  14. c  15. b  16. b  17. b  18. b  19. b  20. d

---

## Interview Questions

### Basic Level

1. **Q: What is the Page Object Model (POM) design pattern and why is it important?**
   - A: POM is a design pattern that creates an object repository for web elements, separating test logic from page-specific code. It's important because it improves code maintainability, reduces code duplication, makes tests more readable, and makes updates easier when UI changes occur.

2. **Q: What is the difference between @BeforeMethod and @BeforeClass in TestNG?**
   - A: @BeforeMethod runs before every test method in a class, while @BeforeClass runs once before any test methods in the class. Use @BeforeMethod for test-specific setup (like browser initialization) and @BeforeClass for class-level setup (like loading test data).

3. **Q: Why is it important to use explicit waits instead of Thread.sleep()?**
   - A: Explicit waits wait only as long as necessary for a condition to be met, making tests faster and more reliable. Thread.sleep() always waits the full duration regardless of page state, making tests slower and potentially unreliable if the wait time is insufficient.

### Intermediate Level

4. **Q: How do you implement data-driven testing in your framework?**
   - A: Use TestNG's @DataProvider annotation to supply test data from external sources (Excel, JSON, CSV), create utility classes to read data files, parameterize test methods to accept data, and use @Test(dataProvider = "name") to connect tests with data sources. This allows running the same test with multiple data sets.

5. **Q: Explain the role of ExtentReports in a test automation framework.**
   - A: ExtentReports generates comprehensive HTML test reports with test execution details, pass/fail status, screenshots on failure, test descriptions, execution time, and system information. It uses TestNG listeners to capture test events and creates visually appealing, stakeholder-friendly reports.

6. **Q: How do you handle parallel test execution in Selenium?**
   - A: Use TestNG's parallel execution feature in testng.xml (parallel="tests" or "methods"), implement ThreadLocal for WebDriver instances to ensure thread safety, configure appropriate thread-count based on system resources, ensure tests are independent with no shared state, and manage test data to prevent conflicts.

7. **Q: What is the purpose of a DriverFactory class in the framework?**
   - A: DriverFactory manages WebDriver instance creation and configuration, supports multiple browsers through a single interface, implements ThreadLocal for parallel execution, handles browser-specific options and capabilities, provides RemoteWebDriver for Grid execution, and ensures proper driver cleanup after tests.

### Advanced Level

8. **Q: How would you design a framework to support both local and cloud (BrowserStack/Sauce Labs) execution?**
   - A: Create a flexible DriverFactory that checks execution mode from configuration, use RemoteWebDriver with cloud URLs when in remote mode, abstract capabilities configuration, use environment variables for credentials, implement conditional logic for local vs remote execution, support both modes through testng.xml parameters, and maintain separate configurations for different execution environments.

9. **Q: Explain your approach to implementing a retry mechanism for flaky tests.**
   - A: Create a RetryAnalyzer class implementing IRetryAnalyzer interface, configure maximum retry count from properties file, implement retry logic checking failure count, log each retry attempt for debugging, create an AnnotationTransformer to apply RetryAnalyzer to all tests or specific groups, and track retry metrics in reports to identify and fix genuinely flaky tests.

10. **Q: How would you implement a complete CI/CD pipeline for your Selenium framework including Docker and cloud testing?**
    - A: Set up GitHub Actions or Jenkins pipeline with stages for: code checkout, dependency installation, Docker Compose to start Selenium Grid, test execution with different browsers in parallel, conditional cloud execution for specific test groups, artifact collection (reports, screenshots, logs), test result publishing, Docker cleanup, and notifications to team. Include scheduled runs, pull request triggers, and deployment to test environments.

---

### Section B: Practical Assessment

**Task 1: Framework Implementation (30 points)**
- Create a complete Page Object for a Login Page
- Implement proper waits and exception handling
- Include JavaDoc documentation

**Task 2: Test Case Development (25 points)**
- Write 3 test cases using TestNG
- Implement data-driven approach
- Include proper assertions

**Task 3: Utility Class (20 points)**
- Create a utility class with 5 methods
- Implement proper exception handling
- Follow best practices

**Task 4: Configuration (15 points)**
- Create config.properties file
- Implement ConfigReader class
- Support multiple environments

**Task 5: Reporting (10 points)**
- Integrate Extent Reports
- Add screenshot on failure
- Customize report appearance

---

## Congratulations!

You have completed the **7-Week Selenium Automation Course** and built a **production-ready test automation framework**. You now have:

- Solid understanding of Selenium WebDriver
- Expertise in framework design and development
- Knowledge of best practices and design patterns
- Hands-on experience with real-world projects
- Skills to excel in automation testing roles

**What's Next?**
- Practice regularly with real applications
- Contribute to open-source projects
- Build your portfolio
- Network with professionals
- Apply for automation testing positions

**Remember**: Continuous learning and improvement are key to success in test automation. Keep exploring, experimenting, and evolving your skills!

---

## Additional Resources

### Official Documentation
- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [TestNG Documentation](https://testng.org/doc/)
- [Maven Documentation](https://maven.apache.org/guides/)
- [Extent Reports Documentation](https://www.extentreports.com/)

### Learning Platforms
- [Test Automation University](https://testautomationu.applitools.com/)
- [Selenium Official Site](https://www.selenium.dev/)
- [GitHub Selenium Examples](https://github.com/topics/selenium)

### Communities
- [Selenium Slack Community](https://selenium-slack.herokuapp.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/selenium)
- [Reddit r/selenium](https://www.reddit.com/r/selenium/)

### Tools & Libraries
- [WebDriverManager](https://github.com/bonigarcia/webdrivermanager)
- [Extent Reports](https://www.extentreports.com/)
- [Apache POI](https://poi.apache.org/)
- [RestAssured](https://rest-assured.io/)

---

**Good luck with your automation testing journey!**

---

## Navigation

- **Previous:** [Day 48: Test Maintenance & Optimization](./day48_test_maintenance.md)
- **Week 7 Home:** [Week 7 Overview](./README.md)

---

**Congratulations!** You have completed the entire 7-week Selenium Automation course and built a production-ready framework. You're now ready for a successful career in test automation!
