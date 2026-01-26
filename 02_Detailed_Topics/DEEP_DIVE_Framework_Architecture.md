# Deep Dive: Test Automation Framework Architecture
## Comprehensive Guide for Selenium Automation

---

## 📚 Table of Contents
1. [Introduction & Overview](#introduction)
2. [Framework Design Principles](#design-principles)
3. [Framework Structure](#structure)
4. [Core Components](#core-components)
5. [Configuration Management](#configuration)
6. [Utility Classes](#utilities)
7. [CI/CD Integration](#cicd)
8. [Reporting & Logging](#reporting)
9. [Complete Framework Example](#complete-example)

---

## <a name="introduction"></a>🎯 Introduction & Overview

### What is a Test Automation Framework?

**Simple Definition:**
> A test automation framework is a set of guidelines, coding standards, concepts, processes, practices, project hierarchies, and tools that help you create and design test cases efficiently.

**Real-World Analogy:**
Think of building a house:
- **Without Framework**: Like building without blueprints - chaotic, inefficient, unmaintainable
- **With Framework**: Like having architectural plans, standardized materials, and construction guidelines - organized, efficient, scalable

### Why Architecture Matters

**Problem Without Framework:**
```
Project Chaos:
- Tests scattered everywhere
- No standard naming
- Configuration hardcoded
- Duplicate utility code
- No reporting
- Can't run in CI/CD
- Maintenance nightmare
```

**Solution With Framework:**
```
Organized Project:
- Structured folder hierarchy
- Standard naming conventions
- Centralized configuration
- Reusable utilities
- Automated reporting
- CI/CD ready
- Easy maintenance
```

### Types of Frameworks

#### 1. Linear Scripting Framework
```
Simple, sequential test scripts
├── test1.java (login test)
├── test2.java (search test)
└── test3.java (checkout test)

Pros: Easy to create
Cons: No reusability, hard to maintain
```

#### 2. Modular Framework
```
Tests broken into modules/functions
├── LoginModule.java
├── SearchModule.java
└── CheckoutModule.java

Pros: Some reusability
Cons: Still coupled, limited scalability
```

#### 3. Data-Driven Framework
```
Test data separated from test logic
├── tests/
│   └── LoginTest.java
└── testdata/
    └── logindata.xlsx

Pros: Multiple data sets
Cons: No page abstractions
```

#### 4. Keyword-Driven Framework
```
High-level keywords for actions
├── keywords/
│   ├── Click.java
│   ├── EnterText.java
│   └── Verify.java
└── testcases.xlsx (keyword sequences)

Pros: Non-programmers can create tests
Cons: Complex setup, limited flexibility
```

#### 5. Hybrid Framework (Most Common)
```
Combines best practices from all
├── Page Object Model (structure)
├── Data-Driven (external data)
├── Modular (reusable components)
└── Reporting (TestNG/Extent)

Pros: Best of all worlds
Cons: Initial setup time
```

### Industry Statistics

- **89%** of companies use hybrid frameworks
- **75%** use Page Object Model as base
- **95%** integrate with CI/CD pipelines
- **4x faster** test development with good framework

---

## <a name="design-principles"></a>🏗️ Framework Design Principles

### SOLID Principles in Automation

#### 1. Single Responsibility Principle (SRP)

**Concept:**
> A class should have only one reason to change

**Example:**
```java
// ❌ BAD: One class doing everything
public class LoginTest {
    public void testLogin() {
        // Setup driver
        WebDriver driver = new ChromeDriver();

        // Navigate
        driver.get("https://example.com");

        // Login
        driver.findElement(By.id("username")).sendKeys("admin");
        driver.findElement(By.id("password")).sendKeys("pass");
        driver.findElement(By.id("loginBtn")).click();

        // Verify
        Assert.assertTrue(driver.findElement(By.id("welcome")).isDisplayed());

        // Generate report
        // ... reporting code

        // Close driver
        driver.quit();
    }
}

// ✅ GOOD: Each class has one responsibility
public class DriverManager {
    // Only manages WebDriver
    public WebDriver getDriver() { ... }
    public void quitDriver() { ... }
}

public class LoginPage {
    // Only handles login page
    public void login(String user, String pass) { ... }
}

public class LoginTest {
    // Only contains test logic
    @Test
    public void testLogin() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("admin", "pass");
        Assert.assertTrue(homePage.isWelcomeDisplayed());
    }
}
```

#### 2. Open/Closed Principle (OCP)

**Concept:**
> Open for extension, closed for modification

**Example:**
```java
// ✅ GOOD: Extendable without modification
public abstract class BasePage {
    protected WebDriver driver;

    protected void click(WebElement element) {
        element.click();
    }
}

// Extend for specific behavior
public class EnhancedBasePage extends BasePage {
    @Override
    protected void click(WebElement element) {
        // Add retry logic without modifying BasePage
        for (int i = 0; i < 3; i++) {
            try {
                element.click();
                break;
            } catch (Exception e) {
                if (i == 2) throw e;
            }
        }
    }
}
```

#### 3. Liskov Substitution Principle (LSP)

**Concept:**
> Subtypes must be substitutable for their base types

**Example:**
```java
// ✅ GOOD: Can substitute any browser driver
public interface BrowserDriver {
    WebDriver getDriver();
}

public class ChromeBrowser implements BrowserDriver {
    public WebDriver getDriver() {
        return new ChromeDriver();
    }
}

public class FirefoxBrowser implements BrowserDriver {
    public WebDriver getDriver() {
        return new FirefoxDriver();
    }
}

// Can use either - substitutable
BrowserDriver browser = new ChromeBrowser();
WebDriver driver = browser.getDriver(); // Works

browser = new FirefoxBrowser();
driver = browser.getDriver(); // Also works
```

#### 4. Interface Segregation Principle (ISP)

**Concept:**
> Many specific interfaces better than one general interface

**Example:**
```java
// ❌ BAD: One large interface
public interface PageActions {
    void click();
    void enterText();
    void selectDropdown();
    void uploadFile();
    void handleAlert();
    void switchFrame();
}

// ✅ GOOD: Specific interfaces
public interface Clickable {
    void click();
}

public interface Typeable {
    void enterText(String text);
}

public interface Selectable {
    void selectOption(String option);
}

// Implement only what's needed
public class LoginPage implements Clickable, Typeable {
    public void click() { ... }
    public void enterText(String text) { ... }
    // No unused methods
}
```

#### 5. Dependency Inversion Principle (DIP)

**Concept:**
> Depend on abstractions, not concrete implementations

**Example:**
```java
// ❌ BAD: Depends on concrete class
public class TestBase {
    private ChromeDriver driver; // Concrete dependency
}

// ✅ GOOD: Depends on interface
public class TestBase {
    private WebDriver driver; // Abstract dependency

    public TestBase(WebDriver driver) {
        this.driver = driver; // Any WebDriver implementation
    }
}
```

### DRY (Don't Repeat Yourself)

**Concept:**
> Every piece of knowledge must have a single, unambiguous representation

**Example:**
```java
// ❌ BAD: Repeated wait logic
@Test
public void test1() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.visibilityOf(element));
    element.click();
}

@Test
public void test2() {
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.visibilityOf(element));
    element.click();
}

// ✅ GOOD: Centralized wait utility
public class WaitUtils {
    public static void waitAndClick(WebDriver driver, WebElement element) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOf(element));
        element.click();
    }
}

@Test
public void test1() {
    WaitUtils.waitAndClick(driver, element);
}

@Test
public void test2() {
    WaitUtils.waitAndClick(driver, element);
}
```

### Modularity and Reusability

**Concept:**
> Break framework into independent, reusable modules

**Example:**
```
Framework Modules:
├── driver-manager/      (Browser management)
├── page-objects/        (Page classes)
├── test-data/          (Data providers)
├── utilities/          (Helper functions)
├── reports/            (Reporting)
└── listeners/          (Event handlers)

Each module:
- Independent
- Reusable
- Testable
- Maintainable
```

### Scalability Considerations

**Horizontal Scaling:**
```
Run tests in parallel across:
- Multiple machines
- Multiple browsers
- Multiple environments
```

**Vertical Scaling:**
```
Add more tests without:
- Performance degradation
- Code complexity
- Maintenance issues
```

**Design for Scale:**
```java
// Thread-safe driver management
public class DriverManager {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (driver.get() == null) {
            driver.set(createDriver());
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
```

---

## <a name="structure"></a>📁 Framework Structure

### Complete Project Structure

```
selenium-automation-framework/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── base/
│   │   │   │   └── BasePage.java
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.java
│   │   │   │   ├── HomePage.java
│   │   │   │   ├── ProductsPage.java
│   │   │   │   └── CheckoutPage.java
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── HeaderComponent.java
│   │   │   │   ├── FooterComponent.java
│   │   │   │   └── NavigationComponent.java
│   │   │   │
│   │   │   └── utils/
│   │   │       ├── ConfigReader.java
│   │   │       ├── ExcelReader.java
│   │   │       ├── JsonReader.java
│   │   │       ├── DatabaseUtils.java
│   │   │       ├── APIUtils.java
│   │   │       ├── WaitUtils.java
│   │   │       ├── ScreenshotUtils.java
│   │   │       ├── EmailUtils.java
│   │   │       └── DateUtils.java
│   │   │
│   │   └── resources/
│   │       ├── config/
│   │       │   ├── dev.properties
│   │       │   ├── qa.properties
│   │       │   ├── staging.properties
│   │       │   └── prod.properties
│   │       │
│   │       ├── testdata/
│   │       │   ├── login-data.xlsx
│   │       │   ├── products-data.json
│   │       │   └── users-data.csv
│   │       │
│   │       └── sql/
│   │           ├── setup.sql
│   │           └── cleanup.sql
│   │
│   └── test/
│       ├── java/
│       │   ├── base/
│       │   │   ├── BaseTest.java
│       │   │   └── TestRetry.java
│       │   │
│       │   ├── tests/
│       │   │   ├── smoke/
│       │   │   │   ├── LoginSmokeTests.java
│       │   │   │   └── HomeSmokeTests.java
│       │   │   │
│       │   │   ├── regression/
│       │   │   │   ├── LoginRegressionTests.java
│       │   │   │   ├── ProductRegressionTests.java
│       │   │   │   └── CheckoutRegressionTests.java
│       │   │   │
│       │   │   └── integration/
│       │   │       └── EndToEndTests.java
│       │   │
│       │   ├── listeners/
│       │   │   ├── TestListener.java
│       │   │   ├── RetryListener.java
│       │   │   └── ExtentReportListener.java
│       │   │
│       │   └── dataproviders/
│       │       ├── LoginDataProvider.java
│       │       └── ProductDataProvider.java
│       │
│       └── resources/
│           ├── testng-suites/
│           │   ├── smoke-suite.xml
│           │   ├── regression-suite.xml
│           │   └── full-suite.xml
│           │
│           └── log4j2.xml
│
├── drivers/
│   ├── chromedriver.exe
│   ├── geckodriver.exe
│   └── msedgedriver.exe
│
├── test-output/
│   ├── screenshots/
│   │   ├── passed/
│   │   └── failed/
│   │
│   ├── reports/
│   │   ├── extent-reports/
│   │   ├── testng-reports/
│   │   └── allure-reports/
│   │
│   └── logs/
│       ├── test-execution.log
│       └── error.log
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── jenkins/
│   └── Jenkinsfile
│
├── .github/
│   └── workflows/
│       └── test-automation.yml
│
├── pom.xml
├── .gitignore
├── README.md
└── CHANGELOG.md
```

### Folder Organization Best Practices

**1. src/main/java - Production Code**
```
Purpose: Reusable framework components
Contents:
- Page objects
- Base classes
- Utilities
- Components

Why separate: Can be packaged and shared across projects
```

**2. src/test/java - Test Code**
```
Purpose: Test classes and test-specific code
Contents:
- Test classes
- Test base setup
- Data providers
- Listeners

Why separate: Tests depend on main code, not vice versa
```

**3. src/main/resources - Configuration**
```
Purpose: Non-code resources needed by framework
Contents:
- Config files
- Test data
- SQL scripts

Why here: Packaged with framework JAR
```

**4. src/test/resources - Test Resources**
```
Purpose: Test-specific resources
Contents:
- TestNG XML files
- Log configuration
- Test-only data

Why here: Not packaged with framework
```

**5. test-output - Generated Artifacts**
```
Purpose: Runtime generated files
Contents:
- Screenshots
- Reports
- Logs

Why separate: Not committed to version control (in .gitignore)
```

---

## <a name="core-components"></a>🔧 Core Components

### 1. Base Test Class Design

**Purpose:**
- Common setup for all tests
- Driver initialization
- Test lifecycle management
- Report setup

**Complete BaseTest Implementation:**
```java
package base;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.*;
import utils.ConfigReader;
import utils.ScreenshotUtils;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.time.Duration;

public class BaseTest {
    // Thread-safe driver for parallel execution
    protected static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    protected static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    // Logger
    protected static final Logger logger = LogManager.getLogger(BaseTest.class);

    // Configuration
    protected ConfigReader config;

    @BeforeSuite
    public void beforeSuite() {
        logger.info("==== TEST SUITE STARTED ====");
        config = new ConfigReader();
        setupReporting();
    }

    @BeforeClass
    public void beforeClass() {
        logger.info("Starting test class: " + this.getClass().getName());
    }

    @BeforeMethod
    @Parameters({"browser"})
    public void beforeMethod(@Optional("chrome") String browser) {
        logger.info("Setting up test with browser: " + browser);

        // Initialize driver
        WebDriver webDriver = initializeDriver(browser);
        driver.set(webDriver);

        // Configure driver
        webDriver.manage().window().maximize();
        webDriver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(config.getImplicitWait())
        );
        webDriver.manage().timeouts().pageLoadTimeout(
            Duration.ofSeconds(config.getPageLoadTimeout())
        );

        // Navigate to base URL
        String baseUrl = config.getBaseUrl();
        logger.info("Navigating to: " + baseUrl);
        webDriver.get(baseUrl);
    }

    @AfterMethod
    public void afterMethod(ITestResult result) {
        WebDriver webDriver = driver.get();

        if (result.getStatus() == ITestResult.FAILURE) {
            logger.error("Test FAILED: " + result.getName());
            String screenshotPath = ScreenshotUtils.captureScreenshot(
                webDriver,
                result.getName()
            );
            logger.info("Screenshot saved: " + screenshotPath);
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            logger.info("Test PASSED: " + result.getName());
        } else if (result.getStatus() == ITestResult.SKIP) {
            logger.warn("Test SKIPPED: " + result.getName());
        }

        // Quit driver
        if (webDriver != null) {
            webDriver.quit();
            driver.remove();
        }
    }

    @AfterClass
    public void afterClass() {
        logger.info("Finished test class: " + this.getClass().getName());
    }

    @AfterSuite
    public void afterSuite() {
        logger.info("==== TEST SUITE COMPLETED ====");
        flushReports();
    }

    // Driver initialization
    private WebDriver initializeDriver(String browser) {
        WebDriver webDriver;

        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                if (config.isHeadless()) {
                    chromeOptions.addArguments("--headless");
                }
                chromeOptions.addArguments("--disable-notifications");
                chromeOptions.addArguments("--disable-popup-blocking");
                webDriver = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                webDriver = new FirefoxDriver();
                break;

            case "edge":
                WebDriverManager.edgedriver().setup();
                webDriver = new EdgeDriver();
                break;

            default:
                logger.error("Invalid browser: " + browser);
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        logger.info("Driver initialized: " + browser);
        return webDriver;
    }

    // Get driver instance
    public static WebDriver getDriver() {
        return driver.get();
    }

    // Reporting setup
    private void setupReporting() {
        // ExtentReports setup logic
        logger.info("Reports initialized");
    }

    private void flushReports() {
        // Flush ExtentReports
        logger.info("Reports flushed");
    }
}
```

### 2. Driver Factory/Manager

**Purpose:**
- Centralized driver management
- Browser-specific configurations
- Thread-safe for parallel execution

**Complete DriverFactory:**
```java
package utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import java.net.URL;
import java.time.Duration;

public class DriverFactory {
    private static final ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    private static ConfigReader config = new ConfigReader();

    // Initialize driver based on configuration
    public static WebDriver initializeDriver(String browser) {
        WebDriver webDriver;

        if (config.isRemoteExecution()) {
            webDriver = initializeRemoteDriver(browser);
        } else {
            webDriver = initializeLocalDriver(browser);
        }

        // Common configurations
        webDriver.manage().window().maximize();
        webDriver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(config.getImplicitWait())
        );
        webDriver.manage().timeouts().pageLoadTimeout(
            Duration.ofSeconds(config.getPageLoadTimeout())
        );
        webDriver.manage().deleteAllCookies();

        driver.set(webDriver);
        return webDriver;
    }

    // Local driver initialization
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

            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        return webDriver;
    }

    // Remote driver initialization (Selenium Grid/Cloud)
    private static WebDriver initializeRemoteDriver(String browser) {
        try {
            URL gridUrl = new URL(config.getGridUrl());
            WebDriver webDriver;

            switch (browser.toLowerCase()) {
                case "chrome":
                    webDriver = new RemoteWebDriver(gridUrl, getChromeOptions());
                    break;

                case "firefox":
                    webDriver = new RemoteWebDriver(gridUrl, getFirefoxOptions());
                    break;

                case "edge":
                    webDriver = new RemoteWebDriver(gridUrl, getEdgeOptions());
                    break;

                default:
                    throw new IllegalArgumentException("Browser not supported: " + browser);
            }

            return webDriver;
        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize remote driver", e);
        }
    }

    // Chrome options
    private static ChromeOptions getChromeOptions() {
        ChromeOptions options = new ChromeOptions();

        if (config.isHeadless()) {
            options.addArguments("--headless");
        }

        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--no-sandbox");
        options.addArguments("--remote-allow-origins=*");

        if (config.isIncognito()) {
            options.addArguments("--incognito");
        }

        // Set download directory
        options.setExperimentalOption("prefs", Map.of(
            "download.default_directory", config.getDownloadPath()
        ));

        return options;
    }

    // Firefox options
    private static FirefoxOptions getFirefoxOptions() {
        FirefoxOptions options = new FirefoxOptions();

        if (config.isHeadless()) {
            options.addArguments("--headless");
        }

        if (config.isIncognito()) {
            options.addArguments("-private");
        }

        return options;
    }

    // Edge options
    private static EdgeOptions getEdgeOptions() {
        EdgeOptions options = new EdgeOptions();

        if (config.isHeadless()) {
            options.addArguments("--headless");
        }

        options.addArguments("--disable-notifications");

        if (config.isIncognito()) {
            options.addArguments("-inprivate");
        }

        return options;
    }

    // Get current driver
    public static WebDriver getDriver() {
        return driver.get();
    }

    // Quit driver
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}
```

### 3. Configuration Manager

**Purpose:**
- Centralized configuration
- Environment-specific settings
- Easy property access

**ConfigReader Implementation:**
```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {
    private Properties properties;
    private static final String CONFIG_PATH = "src/main/resources/config/";

    public ConfigReader() {
        loadProperties();
    }

    private void loadProperties() {
        properties = new Properties();
        String environment = System.getProperty("env", "qa"); // Default to QA
        String configFile = CONFIG_PATH + environment + ".properties";

        try (FileInputStream fis = new FileInputStream(configFile)) {
            properties.load(fis);
            System.out.println("Loaded configuration: " + environment);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load config file: " + configFile, e);
        }
    }

    // Browser configuration
    public String getBrowser() {
        return properties.getProperty("browser", "chrome");
    }

    public boolean isHeadless() {
        return Boolean.parseBoolean(properties.getProperty("headless", "false"));
    }

    public boolean isIncognito() {
        return Boolean.parseBoolean(properties.getProperty("incognito", "false"));
    }

    // URL configuration
    public String getBaseUrl() {
        return properties.getProperty("base.url");
    }

    public String getApiBaseUrl() {
        return properties.getProperty("api.base.url");
    }

    // Timeout configuration
    public int getImplicitWait() {
        return Integer.parseInt(properties.getProperty("implicit.wait", "10"));
    }

    public int getExplicitWait() {
        return Integer.parseInt(properties.getProperty("explicit.wait", "15"));
    }

    public int getPageLoadTimeout() {
        return Integer.parseInt(properties.getProperty("page.load.timeout", "30"));
    }

    // Execution configuration
    public boolean isRemoteExecution() {
        return Boolean.parseBoolean(properties.getProperty("remote.execution", "false"));
    }

    public String getGridUrl() {
        return properties.getProperty("grid.url", "http://localhost:4444/wd/hub");
    }

    public boolean isParallelExecution() {
        return Boolean.parseBoolean(properties.getProperty("parallel.execution", "false"));
    }

    public int getThreadCount() {
        return Integer.parseInt(properties.getProperty("thread.count", "1"));
    }

    // Database configuration
    public String getDbUrl() {
        return properties.getProperty("db.url");
    }

    public String getDbUsername() {
        return properties.getProperty("db.username");
    }

    public String getDbPassword() {
        return properties.getProperty("db.password");
    }

    // Reporting configuration
    public boolean isScreenshotOnFailure() {
        return Boolean.parseBoolean(properties.getProperty("screenshot.on.failure", "true"));
    }

    public boolean isVideoRecording() {
        return Boolean.parseBoolean(properties.getProperty("video.recording", "false"));
    }

    public String getReportPath() {
        return properties.getProperty("report.path", "test-output/reports/");
    }

    public String getScreenshotPath() {
        return properties.getProperty("screenshot.path", "test-output/screenshots/");
    }

    // Paths
    public String getDownloadPath() {
        return properties.getProperty("download.path", "target/downloads/");
    }

    public String getTestDataPath() {
        return properties.getProperty("testdata.path", "src/main/resources/testdata/");
    }

    // Retry configuration
    public int getRetryCount() {
        return Integer.parseInt(properties.getProperty("retry.count", "1"));
    }

    // Generic property getter
    public String getProperty(String key) {
        return properties.getProperty(key);
    }

    public String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }
}
```

**Configuration Files:**

**config/qa.properties:**
```properties
# Browser Configuration
browser=chrome
headless=false
incognito=false

# Application URLs
base.url=https://qa.example.com
api.base.url=https://api-qa.example.com

# Timeouts (seconds)
implicit.wait=10
explicit.wait=15
page.load.timeout=30

# Execution Configuration
remote.execution=false
grid.url=http://localhost:4444/wd/hub
parallel.execution=true
thread.count=3

# Database Configuration
db.url=jdbc:mysql://qa-db.example.com:3306/testdb
db.username=qa_user
db.password=qa_pass

# Reporting
screenshot.on.failure=true
video.recording=false
report.path=test-output/reports/
screenshot.path=test-output/screenshots/

# Retry Configuration
retry.count=1

# Paths
download.path=target/downloads/
testdata.path=src/main/resources/testdata/
```

**config/prod.properties:**
```properties
# Browser Configuration
browser=chrome
headless=true
incognito=true

# Application URLs
base.url=https://www.example.com
api.base.url=https://api.example.com

# Timeouts (seconds)
implicit.wait=15
explicit.wait=20
page.load.timeout=45

# Execution Configuration
remote.execution=true
grid.url=http://prod-grid.example.com:4444/wd/hub
parallel.execution=true
thread.count=10

# Reporting
screenshot.on.failure=true
video.recording=true

# Retry Configuration
retry.count=2
```

### 4. Logger Integration

**Log4j2 Configuration:**

**src/test/resources/log4j2.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Properties>
        <Property name="logPath">test-output/logs</Property>
        <Property name="pattern">%d{yyyy-MM-dd HH:mm:ss} [%t] %-5level %logger{36} - %msg%n</Property>
    </Properties>

    <Appenders>
        <!-- Console Appender -->
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="${pattern}"/>
        </Console>

        <!-- File Appender - All Logs -->
        <RollingFile name="FileLogger"
                     fileName="${logPath}/test-execution.log"
                     filePattern="${logPath}/test-execution-%d{yyyy-MM-dd}.log">
            <PatternLayout pattern="${pattern}"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="10MB"/>
            </Policies>
            <DefaultRolloverStrategy max="10"/>
        </RollingFile>

        <!-- File Appender - Errors Only -->
        <RollingFile name="ErrorLogger"
                     fileName="${logPath}/error.log"
                     filePattern="${logPath}/error-%d{yyyy-MM-dd}.log">
            <PatternLayout pattern="${pattern}"/>
            <Filters>
                <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
            </Filters>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="5MB"/>
            </Policies>
        </RollingFile>
    </Appenders>

    <Loggers>
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="FileLogger"/>
            <AppenderRef ref="ErrorLogger"/>
        </Root>
    </Loggers>
</Configuration>
```

**Using Logger:**
```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LoginTest {
    private static final Logger logger = LogManager.getLogger(LoginTest.class);

    @Test
    public void testLogin() {
        logger.info("Starting login test");
        logger.debug("Username: testuser");

        try {
            loginPage.login("testuser", "password");
            logger.info("Login successful");
        } catch (Exception e) {
            logger.error("Login failed", e);
            throw e;
        }
    }
}
```

### 5. Report Manager

**ExtentReports Implementation:**
```java
package utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

import java.io.File;

public class ExtentManager {
    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();

    public static ExtentReports createInstance() {
        String reportPath = "test-output/reports/extent-report.html";

        // Create report directory if not exists
        File reportDir = new File("test-output/reports");
        if (!reportDir.exists()) {
            reportDir.mkdirs();
        }

        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);

        // Configuration
        sparkReporter.config().setDocumentTitle("Automation Test Report");
        sparkReporter.config().setReportName("Test Execution Results");
        sparkReporter.config().setTheme(Theme.STANDARD);
        sparkReporter.config().setEncoding("utf-8");

        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);

        // System information
        extent.setSystemInfo("OS", System.getProperty("os.name"));
        extent.setSystemInfo("Java Version", System.getProperty("java.version"));
        extent.setSystemInfo("User", System.getProperty("user.name"));
        extent.setSystemInfo("Browser", "Chrome");
        extent.setSystemInfo("Environment", "QA");

        return extent;
    }

    public static ExtentReports getInstance() {
        if (extent == null) {
            createInstance();
        }
        return extent;
    }

    public static ExtentTest getTest() {
        return test.get();
    }

    public static void setTest(ExtentTest extentTest) {
        test.set(extentTest);
    }

    public static void flush() {
        if (extent != null) {
            extent.flush();
        }
    }
}
```

**TestListener for Reports:**
```java
package listeners;

import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.markuputils.ExtentColor;
import com.aventstack.extentreports.markuputils.MarkupHelper;
import org.testng.*;
import utils.ExtentManager;
import utils.ScreenshotUtils;
import base.BaseTest;

public class TestListener implements ITestListener {

    @Override
    public void onStart(ITestContext context) {
        System.out.println("Test Suite Started: " + context.getName());
        ExtentManager.createInstance();
    }

    @Override
    public void onTestStart(ITestResult result) {
        ExtentTest test = ExtentManager.getInstance().createTest(
            result.getMethod().getMethodName(),
            result.getMethod().getDescription()
        );
        ExtentManager.setTest(test);
        test.log(Status.INFO, "Test Started: " + result.getMethod().getMethodName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        ExtentTest test = ExtentManager.getTest();
        test.log(Status.PASS, MarkupHelper.createLabel(
            "Test PASSED: " + result.getMethod().getMethodName(),
            ExtentColor.GREEN
        ));
    }

    @Override
    public void onTestFailure(ITestResult result) {
        ExtentTest test = ExtentManager.getTest();
        test.log(Status.FAIL, MarkupHelper.createLabel(
            "Test FAILED: " + result.getMethod().getMethodName(),
            ExtentColor.RED
        ));

        // Add failure details
        test.fail(result.getThrowable());

        // Attach screenshot
        try {
            String screenshotPath = ScreenshotUtils.captureScreenshot(
                BaseTest.getDriver(),
                result.getMethod().getMethodName()
            );
            test.addScreenCaptureFromPath(screenshotPath);
        } catch (Exception e) {
            test.log(Status.WARNING, "Failed to capture screenshot: " + e.getMessage());
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        ExtentTest test = ExtentManager.getTest();
        test.log(Status.SKIP, MarkupHelper.createLabel(
            "Test SKIPPED: " + result.getMethod().getMethodName(),
            ExtentColor.YELLOW
        ));
    }

    @Override
    public void onFinish(ITestContext context) {
        System.out.println("Test Suite Finished: " + context.getName());
        ExtentManager.flush();
    }
}
```

---

## <a name="configuration"></a>⚙️ Configuration Management

### Environment-Specific Configs

**Strategy:**
- Separate config file per environment
- Load based on system property
- Override with command-line parameters

**Environment Files:**
```
config/
├── dev.properties      (Development)
├── qa.properties       (QA/Testing)
├── staging.properties  (Pre-production)
└── prod.properties     (Production)
```

**Loading Configuration:**
```java
// Load based on system property
String env = System.getProperty("env", "qa");
String configFile = "config/" + env + ".properties";

// Command line: mvn test -Denv=staging
```

### Browser Configuration

**Multi-Browser Support:**
```java
public enum BrowserType {
    CHROME,
    FIREFOX,
    EDGE,
    SAFARI;

    public static BrowserType fromString(String browser) {
        try {
            return BrowserType.valueOf(browser.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid browser: " + browser);
        }
    }
}
```

**Browser Capabilities:**
```java
public class BrowserCapabilities {

    public static ChromeOptions getChromeOptions() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");

        // Performance optimizations
        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);
        options.setAcceptInsecureCerts(true);

        return options;
    }

    public static FirefoxOptions getFirefoxOptions() {
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--width=1920");
        options.addArguments("--height=1080");
        options.setAcceptInsecureCerts(true);

        return options;
    }
}
```

### Test Data Externalization

**Excel Data Provider:**
```java
package utils;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelReader {
    private String filePath;

    public ExcelReader(String filePath) {
        this.filePath = filePath;
    }

    public Object[][] getTestData(String sheetName) {
        Object[][] data = null;

        try (FileInputStream fis = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheet(sheetName);
            int rowCount = sheet.getPhysicalNumberOfRows();
            int colCount = sheet.getRow(0).getPhysicalNumberOfCells();

            data = new Object[rowCount - 1][colCount];

            for (int i = 1; i < rowCount; i++) {
                Row row = sheet.getRow(i);
                for (int j = 0; j < colCount; j++) {
                    Cell cell = row.getCell(j);
                    data[i - 1][j] = getCellValue(cell);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return data;
    }

    private Object getCellValue(Cell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue();
                }
                return cell.getNumericCellValue();
            case BOOLEAN:
                return cell.getBooleanCellValue();
            default:
                return "";
        }
    }
}
```

**JSON Data Provider:**
```java
package utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

public class JsonReader {

    public static List<Map<String, String>> readJson(String filePath) {
        try (FileReader reader = new FileReader(filePath)) {
            Gson gson = new Gson();
            Type type = new TypeToken<List<Map<String, String>>>(){}.getType();
            return gson.fromJson(reader, type);
        } catch (Exception e) {
            throw new RuntimeException("Failed to read JSON file: " + filePath, e);
        }
    }

    public static <T> T readJsonAs(String filePath, Class<T> clazz) {
        try (FileReader reader = new FileReader(filePath)) {
            Gson gson = new Gson();
            return gson.fromJson(reader, clazz);
        } catch (Exception e) {
            throw new RuntimeException("Failed to read JSON file: " + filePath, e);
        }
    }
}
```

**Data Provider in Tests:**
```java
@DataProvider(name = "loginData")
public Object[][] getLoginData() {
    String filePath = "src/main/resources/testdata/login-data.xlsx";
    ExcelReader reader = new ExcelReader(filePath);
    return reader.getTestData("LoginSheet");
}

@Test(dataProvider = "loginData")
public void testLogin(String username, String password, String expectedResult) {
    loginPage.login(username, password);

    if (expectedResult.equals("success")) {
        Assert.assertTrue(homePage.isWelcomeMessageDisplayed());
    } else {
        Assert.assertTrue(loginPage.isErrorDisplayed());
    }
}
```

### Properties Files Strategy

**Hierarchical Configuration:**
```
1. default.properties     (Base configuration)
2. env-specific.properties (Environment overrides)
3. System properties      (Runtime overrides)

Priority: System > Environment > Default
```

**Example:**
```java
public String getProperty(String key) {
    // 1. Check system property first
    String value = System.getProperty(key);

    // 2. Check environment-specific properties
    if (value == null) {
        value = envProperties.getProperty(key);
    }

    // 3. Fallback to default properties
    if (value == null) {
        value = defaultProperties.getProperty(key);
    }

    return value;
}
```

---

## <a name="utilities"></a>🛠️ Utility Classes

### 1. Common Utilities Needed

**WaitUtils:**
```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;

public class WaitUtils {
    private static final int DEFAULT_WAIT = 15;

    public static void waitForElementVisible(WebDriver driver, WebElement element) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_WAIT));
        wait.until(ExpectedConditions.visibilityOf(element));
    }

    public static void waitForElementClickable(WebDriver driver, WebElement element) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_WAIT));
        wait.until(ExpectedConditions.elementToBeClickable(element));
    }

    public static void waitForTextInElement(WebDriver driver, WebElement element, String text) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_WAIT));
        wait.until(ExpectedConditions.textToBePresentInElement(element, text));
    }

    public static void waitForPageLoad(WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        wait.until(webDriver -> ((JavascriptExecutor) webDriver)
            .executeScript("return document.readyState").equals("complete"));
    }

    public static boolean waitForElementInvisible(WebDriver driver, By locator, int timeout) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
            return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
        } catch (TimeoutException e) {
            return false;
        }
    }

    public static void fluentWait(WebDriver driver, WebElement element, int timeout) {
        Wait<WebDriver> wait = new FluentWait<>(driver)
            .withTimeout(Duration.ofSeconds(timeout))
            .pollingEvery(Duration.ofMillis(500))
            .ignoring(NoSuchElementException.class)
            .ignoring(StaleElementReferenceException.class);

        wait.until(d -> element.isDisplayed());
    }
}
```

### 2. Element Interaction Utilities

**ElementUtils:**
```java
package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;

public class ElementUtils {

    public static void clickWithRetry(WebDriver driver, WebElement element, int maxRetries) {
        for (int i = 0; i < maxRetries; i++) {
            try {
                WaitUtils.waitForElementClickable(driver, element);
                element.click();
                return;
            } catch (Exception e) {
                if (i == maxRetries - 1) {
                    throw e;
                }
            }
        }
    }

    public static void jsClick(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", element);
    }

    public static void sendKeysWithClear(WebElement element, String text) {
        element.clear();
        element.sendKeys(text);
    }

    public static void selectDropdownByText(WebElement element, String text) {
        Select select = new Select(element);
        select.selectByVisibleText(text);
    }

    public static void selectDropdownByValue(WebElement element, String value) {
        Select select = new Select(element);
        select.selectByValue(value);
    }

    public static void hoverOverElement(WebDriver driver, WebElement element) {
        Actions actions = new Actions(driver);
        actions.moveToElement(element).perform();
    }

    public static void dragAndDrop(WebDriver driver, WebElement source, WebElement target) {
        Actions actions = new Actions(driver);
        actions.dragAndDrop(source, target).perform();
    }

    public static void scrollToElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    public static boolean isElementPresent(WebDriver driver, By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
```

### 3. Screenshot Utilities

**ScreenshotUtils:**
```java
package utils;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ScreenshotUtils {
    private static ConfigReader config = new ConfigReader();

    public static String captureScreenshot(WebDriver driver, String screenshotName) {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String fileName = screenshotName + "_" + timestamp + ".png";
        String directory = config.getScreenshotPath();

        // Create directory if not exists
        File dir = new File(directory);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fullPath = directory + fileName;

        try {
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);
            File destination = new File(fullPath);
            FileUtils.copyFile(source, destination);
            System.out.println("Screenshot captured: " + fullPath);
            return fullPath;
        } catch (Exception e) {
            System.out.println("Failed to capture screenshot: " + e.getMessage());
            return null;
        }
    }

    public static String captureElementScreenshot(WebElement element, String screenshotName) {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String fileName = screenshotName + "_" + timestamp + ".png";
        String directory = config.getScreenshotPath();
        String fullPath = directory + fileName;

        try {
            File source = element.getScreenshotAs(OutputType.FILE);
            File destination = new File(fullPath);
            FileUtils.copyFile(source, destination);
            return fullPath;
        } catch (Exception e) {
            System.out.println("Failed to capture element screenshot: " + e.getMessage());
            return null;
        }
    }

    public static byte[] captureScreenshotAsBytes(WebDriver driver) {
        TakesScreenshot ts = (TakesScreenshot) driver;
        return ts.getScreenshotAs(OutputType.BYTES);
    }
}
```

### 4. Database Utilities

**DatabaseUtils:**
```java
package utils;

import java.sql.*;
import java.util.*;

public class DatabaseUtils {
    private static ConfigReader config = new ConfigReader();

    public static Connection getConnection() throws SQLException {
        String url = config.getDbUrl();
        String username = config.getDbUsername();
        String password = config.getDbPassword();

        return DriverManager.getConnection(url, username, password);
    }

    public static List<Map<String, String>> executeQuery(String query) {
        List<Map<String, String>> results = new ArrayList<>();

        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {

            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, String> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    String value = rs.getString(i);
                    row.put(columnName, value);
                }
                results.add(row);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return results;
    }

    public static int executeUpdate(String query) {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            return stmt.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public static void closeConnection(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 5. API Utilities

**APIUtils:**
```java
package utils;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.Map;

public class APIUtils {
    private static ConfigReader config = new ConfigReader();

    static {
        RestAssured.baseURI = config.getApiBaseUrl();
    }

    public static Response get(String endpoint) {
        return RestAssured.given()
            .when()
            .get(endpoint);
    }

    public static Response get(String endpoint, Map<String, String> headers) {
        RequestSpecification request = RestAssured.given();
        headers.forEach(request::header);
        return request.when().get(endpoint);
    }

    public static Response post(String endpoint, Object body) {
        return RestAssured.given()
            .contentType("application/json")
            .body(body)
            .when()
            .post(endpoint);
    }

    public static Response put(String endpoint, Object body) {
        return RestAssured.given()
            .contentType("application/json")
            .body(body)
            .when()
            .put(endpoint);
    }

    public static Response delete(String endpoint) {
        return RestAssured.given()
            .when()
            .delete(endpoint);
    }

    public static Response authenticatedGet(String endpoint, String token) {
        return RestAssured.given()
            .header("Authorization", "Bearer " + token)
            .when()
            .get(endpoint);
    }
}
```

---

## <a name="cicd"></a>🔄 CI/CD Integration

### Jenkins Integration

**Jenkinsfile:**
```groovy
pipeline {
    agent any

    parameters {
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge'], description: 'Browser to run tests')
        choice(name: 'ENVIRONMENT', choices: ['qa', 'staging', 'prod'], description: 'Environment to test')
        booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Run in headless mode')
    }

    tools {
        maven 'Maven3'
        jdk 'JDK11'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/your-repo/selenium-framework.git'
            }
        }

        stage('Compile') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Run Tests') {
            steps {
                sh """
                    mvn test \
                    -Dbrowser=${params.BROWSER} \
                    -Denv=${params.ENVIRONMENT} \
                    -Dheadless=${params.HEADLESS}
                """
            }
        }

        stage('Generate Reports') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'test-output/reports',
                    reportFiles: 'extent-report.html',
                    reportName: 'Test Execution Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-output/**/*', allowEmptyArchive: true
            junit 'test-output/testng-results.xml'
        }

        failure {
            emailext (
                subject: "Test Execution Failed: ${env.JOB_NAME}",
                body: "Build failed. Check console output at ${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }

        success {
            emailext (
                subject: "Test Execution Passed: ${env.JOB_NAME}",
                body: "All tests passed successfully.",
                to: 'team@example.com'
            )
        }
    }
}
```

### Docker Containerization

**Dockerfile:**
```dockerfile
FROM maven:3.8.5-openjdk-11-slim

# Install Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install ChromeDriver
RUN CHROME_VERSION=$(google-chrome --version | awk '{print $3}' | cut -d. -f1) \
    && CHROMEDRIVER_VERSION=$(curl -s "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_VERSION}") \
    && wget -O /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip" \
    && unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/ \
    && rm /tmp/chromedriver.zip

# Set working directory
WORKDIR /app

# Copy project files
COPY pom.xml .
COPY src ./src

# Run tests
CMD ["mvn", "test"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  selenium-hub:
    image: selenium/hub:latest
    ports:
      - "4444:4444"
    environment:
      - GRID_MAX_SESSION=5
      - GRID_BROWSER_TIMEOUT=300
      - GRID_TIMEOUT=300

  chrome:
    image: selenium/node-chrome:latest
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    shm_size: 2gb

  firefox:
    image: selenium/node-firefox:latest
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
    environment:
      - GRID_URL=http://selenium-hub:4444/wd/hub
    volumes:
      - ./test-output:/app/test-output
```

### Parallel Execution Setup

**testng.xml for Parallel Execution:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parallel Test Suite" parallel="tests" thread-count="3">

    <listeners>
        <listener class-name="listeners.TestListener"/>
    </listeners>

    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.LoginTests"/>
            <class name="tests.ProductTests"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.LoginTests"/>
            <class name="tests.ProductTests"/>
        </classes>
    </test>

    <test name="Edge Tests">
        <parameter name="browser" value="edge"/>
        <classes>
            <class name="tests.LoginTests"/>
            <class name="tests.ProductTests"/>
        </classes>
    </test>

</suite>
```

**Thread-Safe Configuration:**
```java
public class ThreadLocalDriver {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static synchronized WebDriver getDriver() {
        if (driver.get() == null) {
            setDriver(initializeDriver());
        }
        return driver.get();
    }

    public static synchronized void setDriver(WebDriver webDriver) {
        driver.set(webDriver);
    }

    public static synchronized void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}
```

### Remote Execution (Selenium Grid)

**Grid Configuration:**
```yaml
# grid-config.yml
configs:
  - port: 4444
    maxSession: 5
    newSessionWaitTimeout: -1
    sessionRequestTimeout: 300
    sessionRetryInterval: 5
    cleanupCycle: 5000
    timeout: 300
    browserTimeout: 300
    hubHost: localhost
    hubPort: 4444

nodes:
  - browser: chrome
    version: latest
    maxInstances: 3
    platform: LINUX

  - browser: firefox
    version: latest
    maxInstances: 3
    platform: LINUX
```

**Remote Driver Implementation:**
```java
public class GridDriver {

    public static WebDriver getRemoteDriver(String browser) {
        String gridUrl = "http://localhost:4444/wd/hub";
        DesiredCapabilities capabilities;

        switch (browser.toLowerCase()) {
            case "chrome":
                capabilities = DesiredCapabilities.chrome();
                capabilities.setCapability(ChromeOptions.CAPABILITY, getChromeOptions());
                break;
            case "firefox":
                capabilities = DesiredCapabilities.firefox();
                capabilities.setCapability(FirefoxOptions.FIREFOX_OPTIONS, getFirefoxOptions());
                break;
            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        try {
            return new RemoteWebDriver(new URL(gridUrl), capabilities);
        } catch (MalformedURLException e) {
            throw new RuntimeException("Invalid Grid URL: " + gridUrl, e);
        }
    }
}
```

---

## <a name="reporting"></a>📊 Reporting & Logging

### TestNG Reports

**Built-in Reports:**
- `test-output/index.html` - Main test report
- `test-output/emailable-report.html` - Email-friendly report
- `test-output/testng-results.xml` - XML results

**Customizing TestNG Reports:**
```java
@Listeners({TestListener.class})
public class BaseTest {
    // Test implementation
}
```

### Extent Reports

**Complete Extent Setup:**
```java
public class ExtentReportManager {
    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();

    public static ExtentReports getInstance() {
        if (extent == null) {
            String reportPath = "test-output/reports/ExtentReport.html";
            ExtentSparkReporter sparkReporter = new ExtentSparkReporter(reportPath);

            // Report configuration
            sparkReporter.config().setDocumentTitle("Test Execution Report");
            sparkReporter.config().setReportName("Automation Test Results");
            sparkReporter.config().setTheme(Theme.DARK);
            sparkReporter.config().setTimeStampFormat("MMM dd, yyyy HH:mm:ss");

            // CSS Customization
            String css = "body { font-family: Arial; }";
            sparkReporter.config().setCss(css);

            extent = new ExtentReports();
            extent.attachReporter(sparkReporter);

            // System Info
            extent.setSystemInfo("Application", "E-Commerce App");
            extent.setSystemInfo("Environment", "QA");
            extent.setSystemInfo("OS", System.getProperty("os.name"));
            extent.setSystemInfo("Java Version", System.getProperty("java.version"));
            extent.setSystemInfo("User", System.getProperty("user.name"));

            // Categories
            extent.setAnalysisStrategy(AnalysisStrategy.TEST);
        }
        return extent;
    }

    public static synchronized ExtentTest createTest(String testName, String description) {
        ExtentTest extentTest = getInstance().createTest(testName, description);
        test.set(extentTest);
        return extentTest;
    }

    public static synchronized ExtentTest getTest() {
        return test.get();
    }

    public static synchronized void log(Status status, String message) {
        getTest().log(status, message);
    }

    public static synchronized void logWithScreenshot(Status status, String message, String screenshotPath) {
        try {
            getTest().log(status, message,
                MediaEntityBuilder.createScreenCaptureFromPath(screenshotPath).build());
        } catch (Exception e) {
            getTest().log(Status.WARNING, "Failed to attach screenshot: " + e.getMessage());
        }
    }

    public static synchronized void flush() {
        if (extent != null) {
            extent.flush();
        }
    }
}
```

### Allure Reports

**Allure Configuration:**

**pom.xml:**
```xml
<dependency>
    <groupId>io.qameta.allure</groupId>
    <artifactId>allure-testng</artifactId>
    <version>2.20.0</version>
</dependency>
```

**Allure Annotations:**
```java
import io.qameta.allure.*;

@Epic("E-Commerce Application")
@Feature("User Authentication")
public class LoginTests {

    @Test
    @Story("Valid Login")
    @Description("Test valid login with correct credentials")
    @Severity(SeverityLevel.BLOCKER)
    public void testValidLogin() {
        // Test code
    }

    @Step("Enter username: {username}")
    public void enterUsername(String username) {
        // Implementation
    }

    @Attachment(value = "Screenshot", type = "image/png")
    public byte[] saveScreenshot() {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }
}
```

**Generate Allure Report:**
```bash
# Generate report
mvn allure:serve

# Or manually
allure generate target/allure-results --clean -o target/allure-report
allure open target/allure-report
```

### Log4j Integration

**Complete Log4j2 Setup:**

**pom.xml:**
```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.20.0</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.20.0</version>
</dependency>
```

**Advanced log4j2.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">
    <Properties>
        <Property name="logPath">test-output/logs</Property>
        <Property name="pattern">%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n</Property>
    </Properties>

    <Appenders>
        <!-- Console Appender -->
        <Console name="ConsoleAppender" target="SYSTEM_OUT">
            <PatternLayout pattern="${pattern}"/>
            <Filters>
                <ThresholdFilter level="INFO" onMatch="ACCEPT" onMismatch="DENY"/>
            </Filters>
        </Console>

        <!-- File Appender - All Logs -->
        <RollingFile name="FileAppender"
                     fileName="${logPath}/application.log"
                     filePattern="${logPath}/application-%d{yyyy-MM-dd}-%i.log">
            <PatternLayout pattern="${pattern}"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="10MB"/>
            </Policies>
            <DefaultRolloverStrategy max="10"/>
        </RollingFile>

        <!-- File Appender - Error Logs Only -->
        <RollingFile name="ErrorAppender"
                     fileName="${logPath}/error.log"
                     filePattern="${logPath}/error-%d{yyyy-MM-dd}-%i.log">
            <PatternLayout pattern="${pattern}"/>
            <Filters>
                <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
            </Filters>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="5MB"/>
            </Policies>
        </RollingFile>

        <!-- File Appender - Debug Logs -->
        <RollingFile name="DebugAppender"
                     fileName="${logPath}/debug.log"
                     filePattern="${logPath}/debug-%d{yyyy-MM-dd}-%i.log">
            <PatternLayout pattern="${pattern}"/>
            <Filters>
                <ThresholdFilter level="DEBUG" onMatch="ACCEPT" onMismatch="DENY"/>
            </Filters>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="20MB"/>
            </Policies>
        </RollingFile>
    </Appenders>

    <Loggers>
        <!-- Root Logger -->
        <Root level="info">
            <AppenderRef ref="ConsoleAppender"/>
            <AppenderRef ref="FileAppender"/>
            <AppenderRef ref="ErrorAppender"/>
        </Root>

        <!-- Package-specific Loggers -->
        <Logger name="pages" level="debug" additivity="false">
            <AppenderRef ref="ConsoleAppender"/>
            <AppenderRef ref="DebugAppender"/>
        </Logger>

        <Logger name="tests" level="info" additivity="false">
            <AppenderRef ref="ConsoleAppender"/>
            <AppenderRef ref="FileAppender"/>
        </Logger>
    </Loggers>
</Configuration>
```

**Using Logger in Tests:**
```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LoginTests extends BaseTest {
    private static final Logger logger = LogManager.getLogger(LoginTests.class);

    @Test
    public void testLogin() {
        logger.info("========== Starting Login Test ==========");
        logger.debug("Opening login page");

        try {
            loginPage.enterUsername("admin");
            logger.debug("Entered username");

            loginPage.enterPassword("password");
            logger.debug("Entered password");

            loginPage.clickLogin();
            logger.info("Login successful");
        } catch (Exception e) {
            logger.error("Login failed: " + e.getMessage(), e);
            throw e;
        } finally {
            logger.info("========== Login Test Completed ==========");
        }
    }
}
```

---

## <a name="complete-example"></a>🎯 Complete Framework Example

### Full Project Structure

```
selenium-automation-framework/
├── pom.xml
├── README.md
├── .gitignore
│
├── src/main/java/
│   ├── base/
│   │   └── BasePage.java
│   │
│   ├── pages/
│   │   ├── LoginPage.java
│   │   ├── HomePage.java
│   │   └── ProductPage.java
│   │
│   ├── components/
│   │   └── HeaderComponent.java
│   │
│   └── utils/
│       ├── ConfigReader.java
│       ├── DriverFactory.java
│       ├── WaitUtils.java
│       ├── ScreenshotUtils.java
│       └── ExtentManager.java
│
├── src/main/resources/
│   ├── config/
│   │   ├── qa.properties
│   │   └── staging.properties
│   │
│   └── testdata/
│       └── login-data.xlsx
│
├── src/test/java/
│   ├── base/
│   │   └── BaseTest.java
│   │
│   ├── tests/
│   │   ├── LoginTests.java
│   │   └── ProductTests.java
│   │
│   └── listeners/
│       └── TestListener.java
│
├── src/test/resources/
│   ├── testng.xml
│   └── log4j2.xml
│
└── test-output/
    ├── reports/
    ├── screenshots/
    └── logs/
```

### Sample Test Class

**Complete Test Implementation:**
```java
package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.*;
import pages.LoginPage;
import pages.HomePage;

public class LoginTests extends BaseTest {

    private LoginPage loginPage;
    private HomePage homePage;

    @BeforeMethod
    public void setupTest() {
        loginPage = new LoginPage(getDriver());
        logger.info("Login Page initialized");
    }

    @Test(priority = 1, description = "Verify successful login with valid credentials")
    public void testValidLogin() {
        logger.info("Test: Valid Login");

        // Perform login
        homePage = loginPage.login(
            config.getProperty("valid.username"),
            config.getProperty("valid.password")
        );

        // Verify
        Assert.assertTrue(homePage.isWelcomeMessageDisplayed(),
            "Welcome message should be displayed after successful login");

        String actualUser = homePage.getLoggedInUsername();
        String expectedUser = config.getProperty("valid.username");
        Assert.assertEquals(actualUser, expectedUser,
            "Logged in username should match");

        logger.info("Login successful - Test Passed");
    }

    @Test(priority = 2, description = "Verify error message with invalid credentials")
    public void testInvalidLogin() {
        logger.info("Test: Invalid Login");

        // Attempt invalid login
        loginPage.login("invalid@example.com", "wrongpassword");

        // Verify error
        Assert.assertTrue(loginPage.isErrorDisplayed(),
            "Error message should be displayed for invalid credentials");

        String errorMsg = loginPage.getErrorMessage();
        Assert.assertTrue(errorMsg.contains("Invalid"),
            "Error message should indicate invalid credentials");

        logger.info("Error message displayed correctly - Test Passed");
    }

    @Test(priority = 3, description = "Verify empty fields validation")
    public void testEmptyFieldsValidation() {
        logger.info("Test: Empty Fields Validation");

        // Try to login with empty fields
        loginPage.clickLoginButton();

        // Verify validation
        Assert.assertFalse(loginPage.isLoginButtonEnabled(),
            "Login button should be disabled with empty fields");

        logger.info("Validation working correctly - Test Passed");
    }

    @AfterMethod
    public void teardownTest(ITestResult result) {
        if (result.getStatus() == ITestResult.FAILURE) {
            String screenshotPath = ScreenshotUtils.captureScreenshot(
                getDriver(),
                result.getName()
            );
            logger.error("Test Failed - Screenshot: " + screenshotPath);
        }
    }
}
```

---

## 📚 Summary

### Framework Best Practices Checklist

**✅ Structure:**
- [ ] Clear folder hierarchy
- [ ] Separation of concerns
- [ ] Reusable components
- [ ] Centralized configuration

**✅ Design:**
- [ ] SOLID principles followed
- [ ] DRY principle applied
- [ ] Modular architecture
- [ ] Scalable design

**✅ Code Quality:**
- [ ] Consistent naming conventions
- [ ] Comprehensive logging
- [ ] Error handling
- [ ] Code documentation

**✅ Execution:**
- [ ] Parallel execution support
- [ ] CI/CD integration
- [ ] Cross-browser testing
- [ ] Remote execution capability

**✅ Reporting:**
- [ ] Detailed test reports
- [ ] Screenshot on failure
- [ ] Comprehensive logs
- [ ] Email notifications

### Next Steps

1. **Implement:** Start building your framework
2. **Customize:** Adapt to project needs
3. **Optimize:** Improve performance
4. **Maintain:** Keep framework updated
5. **Train:** Educate team on framework

---

**End of Deep Dive: Framework Architecture**

**Total Length:** ~800 lines
**Skill Level:** Advanced
**Time to Master:** 4-6 weeks of hands-on practice

🎉 **Congratulations! You now have expert knowledge of framework architecture!** 🎉
