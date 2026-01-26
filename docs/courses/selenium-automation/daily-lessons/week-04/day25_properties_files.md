
# Day 25: Properties Files & Configuration Management

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the importance of configuration management in test automation
- Create and structure properties files for different environments
- Read properties files using Java Properties class
- Implement a ConfigReader utility class
- Manage environment-specific configurations
- Handle multiple properties files (dev, qa, prod)
- Use properties for test data management
- Implement property file encryption for sensitive data
- Apply best practices for configuration management
- Integrate properties files with test framework

---

## Table of Contents

1. [Introduction to Properties Files](#1-introduction-to-properties-files)
2. [Why Use Properties Files?](#2-why-use-properties-files)
3. [Creating Properties Files](#3-creating-properties-files)
4. [Reading Properties Files in Java](#4-reading-properties-files-in-java)
5. [ConfigReader Utility Class](#5-configreader-utility-class)
6. [Environment-Specific Configuration](#6-environment-specific-configuration)
7. [Test Data in Properties Files](#7-test-data-in-properties-files)
8. [Advanced Configuration Patterns](#8-advanced-configuration-patterns)
9. [Property File Encryption](#9-property-file-encryption)
10. [Best Practices](#10-best-practices)
11. [Complete Framework Integration](#11-complete-framework-integration)
12. [Practical Exercises](#12-practical-exercises)
13. [Key Takeaways](#13-key-takeaways)
14. [Interview Questions](#14-interview-questions)

---

## 1. Introduction to Properties Files

### What are Properties Files?

**Properties files** are simple text files with `.properties` extension that store configuration data as key-value pairs. They are widely used in Java applications for externalized configuration.

### Basic Format

```properties
# This is a comment
key=value
another.key=another value
url=https://example.com
timeout=30
```

### Why Properties Files in Selenium?

```java
package concepts;

public class PropertiesFileConcept {
    
    /*
     * Benefits of Using Properties Files:
     * 
     * 1. Externalized Configuration
     *    - Separate configuration from code
     *    - No code changes for config updates
     *    - Easy to maintain
     * 
     * 2. Environment Management
     *    - Different configs for dev/qa/prod
     *    - Easy environment switching
     *    - No hardcoded values
     * 
     * 3. Reusability
     *    - Share configs across tests
     *    - Centralized configuration
     *    - Single source of truth
     * 
     * 4. Security
     *    - Keep sensitive data separate
     *    - Can encrypt sensitive values
     *    - Not committed to version control
     * 
     * 5. Flexibility
     *    - Change configs without recompilation
     *    - Runtime configuration
     *    - Easy testing with different configs
     */
}
```

---

## 2. Why Use Properties Files?

### Problem Without Properties Files

```java
package examples;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class HardcodedConfigExample {
    
    public void testWithHardcodedValues() {
        // ❌ BAD: Hardcoded values
        WebDriver driver = new ChromeDriver();
        driver.get("https://qa.example.com/login");
        
        String username = "testuser@example.com";
        String password = "Test@123";
        int timeout = 30;
        
        // Problems:
        // 1. Need to change code for different environments
        // 2. Sensitive data in code
        // 3. Not reusable
        // 4. Hard to maintain
        // 5. Requires recompilation for changes
    }
}
```

### Solution With Properties Files

```java
package examples;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import utils.ConfigReader;

public class PropertiesConfigExample {
    
    public void testWithProperties() {
        // ✅ GOOD: Configuration from properties file
        WebDriver driver = new ChromeDriver();
        driver.get(ConfigReader.getProperty("app.url"));
        
        String username = ConfigReader.getProperty("test.username");
        String password = ConfigReader.getProperty("test.password");
        int timeout = Integer.parseInt(ConfigReader.getProperty("implicit.wait"));
        
        // Benefits:
        // 1. Easy environment switching
        // 2. No code changes needed
        // 3. Centralized configuration
        // 4. Reusable across tests
        // 5. No recompilation needed
    }
}
```

---

## 3. Creating Properties Files

### Basic Properties File Structure

**config.properties:**

```properties
# Application Configuration
app.name=E-Commerce Test Automation
app.version=1.0.0

# Environment URLs
app.url=https://qa.example.com
api.url=https://api-qa.example.com
admin.url=https://admin-qa.example.com

# Browser Configuration
browser=chrome
headless=false
maximize=true

# Timeouts (in seconds)
implicit.wait=10
explicit.wait=20
page.load.timeout=30
script.timeout=30

# Test User Credentials
test.username=testuser@example.com
test.password=Test@123
admin.username=admin@example.com
admin.password=Admin@123

# Database Configuration
db.url=jdbc:mysql://localhost:3306/testdb
db.username=dbuser
db.password=dbpass

# Reporting
report.path=./test-output/reports
screenshot.path=./test-output/screenshots
enable.screenshots=true
enable.video=false

# Grid Configuration
grid.enabled=false
grid.url=http://localhost:4444
```

### Environment-Specific Files

**qa.properties:**

```properties
# QA Environment Configuration
environment=QA
app.url=https://qa.example.com
api.url=https://api-qa.example.com

# QA Database
db.url=jdbc:mysql://qa-db.example.com:3306/testdb
db.username=qa_user
db.password=qa_pass

# QA Test Users
test.username=qa_testuser@example.com
test.password=QA_Test@123
```

**dev.properties:**

```properties
# Development Environment Configuration
environment=DEV
app.url=https://dev.example.com
api.url=https://api-dev.example.com

# Dev Database
db.url=jdbc:mysql://localhost:3306/devdb
db.username=dev_user
db.password=dev_pass

# Dev Test Users
test.username=dev_testuser@example.com
test.password=Dev_Test@123
```

**prod.properties:**

```properties
# Production Environment Configuration
environment=PROD
app.url=https://www.example.com
api.url=https://api.example.com

# Production Database (Read-only for tests)
db.url=jdbc:mysql://prod-db.example.com:3306/proddb
db.username=readonly_user
db.password=readonly_pass

# Production Test Users
test.username=prod_testuser@example.com
test.password=Prod_Test@123
```

### Test Data Properties

**testdata.properties:**

```properties
# Valid Test Data
valid.email=testuser@example.com
valid.password=Test@123
valid.firstname=John
valid.lastname=Doe
valid.phone=5551234567
valid.zipcode=12345

# Invalid Test Data
invalid.email=invalid-email
invalid.password=123
invalid.phone=abc
invalid.zipcode=00000

# Product Test Data
product.laptop=Laptop Pro 15
product.mouse=Wireless Mouse
product.keyboard=Mechanical Keyboard

# Payment Test Data
test.card.number=4111111111111111
test.card.expiry=12/25
test.card.cvv=123
test.card.name=Test User
```

### File Location

```
project-structure/
├── src/
│   ├── main/
│   │   └── java/
│   └── test/
│       ├── java/
│       └── resources/
│           ├── config/
│           │   ├── config.properties
│           │   ├── qa.properties
│           │   ├── dev.properties
│           │   └── prod.properties
│           └── testdata/
│               └── testdata.properties
```

---

## 4. Reading Properties Files in Java

### Using Java Properties Class

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class BasicPropertiesReader {
    
    /**
     * Basic method to read properties file
     */
    public static void readPropertiesFile() {
        Properties properties = new Properties();
        
        try {
            // Load properties file
            FileInputStream fis = new FileInputStream("src/test/resources/config/config.properties");
            properties.load(fis);
            fis.close();
            
            // Read properties
            String appUrl = properties.getProperty("app.url");
            String browser = properties.getProperty("browser");
            String timeout = properties.getProperty("implicit.wait");
            
            System.out.println("App URL: " + appUrl);
            System.out.println("Browser: " + browser);
            System.out.println("Timeout: " + timeout);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Read with default value
     */
    public static void readWithDefault() {
        Properties properties = new Properties();
        
        try {
            FileInputStream fis = new FileInputStream("src/test/resources/config/config.properties");
            properties.load(fis);
            fis.close();
            
            // Get property with default value if not found
            String browser = properties.getProperty("browser", "chrome");
            String headless = properties.getProperty("headless", "false");
            
            System.out.println("Browser: " + browser);
            System.out.println("Headless: " + headless);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * Read from classpath
     */
    public static void readFromClasspath() {
        Properties properties = new Properties();
        
        try {
            // Load from classpath (src/test/resources)
            properties.load(BasicPropertiesReader.class
                .getClassLoader()
                .getResourceAsStream("config/config.properties"));
            
            String appUrl = properties.getProperty("app.url");
            System.out.println("App URL: " + appUrl);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Reading Multiple Properties Files

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class MultiplePropertiesReader {
    
    /**
     * Load multiple properties files
     */
    public static Properties loadMultipleFiles() {
        Properties properties = new Properties();
        
        try {
            // Load base config
            FileInputStream configFile = new FileInputStream(
                "src/test/resources/config/config.properties");
            properties.load(configFile);
            configFile.close();
            
            // Load test data
            FileInputStream testDataFile = new FileInputStream(
                "src/test/resources/testdata/testdata.properties");
            properties.load(testDataFile);
            testDataFile.close();
            
            // Now properties contains values from both files
            return properties;
            
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * Merge properties with priority
     */
    public static Properties mergeProperties(String baseFile, String overrideFile) {
        Properties properties = new Properties();
        
        try {
            // Load base properties
            FileInputStream base = new FileInputStream(baseFile);
            properties.load(base);
            base.close();
            
            // Load override properties (will override base values)
            FileInputStream override = new FileInputStream(overrideFile);
            properties.load(override);
            override.close();
            
            return properties;
            
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

---

## 5. ConfigReader Utility Class

### Basic ConfigReader

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {
    
    private static Properties properties;
    private static final String CONFIG_FILE_PATH = "src/test/resources/config/config.properties";
    
    // Static block to load properties when class is loaded
    static {
        try {
            FileInputStream fis = new FileInputStream(CONFIG_FILE_PATH);
            properties = new Properties();
            properties.load(fis);
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load config file: " + CONFIG_FILE_PATH);
        }
    }
    
    /**
     * Get property value by key
     */
    public static String getProperty(String key) {
        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Property not found: " + key);
        }
        return value;
    }
    
    /**
     * Get property with default value
     */
    public static String getProperty(String key, String defaultValue) {
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
    
    /**
     * Get long property
     */
    public static long getLongProperty(String key) {
        return Long.parseLong(getProperty(key));
    }
    
    // Convenience methods for common properties
    
    public static String getAppUrl() {
        return getProperty("app.url");
    }
    
    public static String getBrowser() {
        return getProperty("browser", "chrome");
    }
    
    public static boolean isHeadless() {
        return getBooleanProperty("headless");
    }
    
    public static int getImplicitWait() {
        return getIntProperty("implicit.wait");
    }
    
    public static int getExplicitWait() {
        return getIntProperty("explicit.wait");
    }
    
    public static String getTestUsername() {
        return getProperty("test.username");
    }
    
    public static String getTestPassword() {
        return getProperty("test.password");
    }
}
```

### Advanced ConfigReader with Environment Support

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class AdvancedConfigReader {
    
    private static Properties properties;
    private static String environment;
    
    static {
        loadConfiguration();
    }
    
    /**
     * Load configuration based on environment
     */
    private static void loadConfiguration() {
        // Get environment from system property or default to QA
        environment = System.getProperty("env", "qa").toLowerCase();
        
        properties = new Properties();
        
        try {
            // Load base config first
            loadPropertiesFile("config/config.properties");
            
            // Load environment-specific config (overrides base)
            loadPropertiesFile("config/" + environment + ".properties");
            
            // Load test data
            loadPropertiesFile("testdata/testdata.properties");
            
            System.out.println("Configuration loaded for environment: " + environment);
            
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load configuration files");
        }
    }
    
    /**
     * Load properties file from classpath
     */
    private static void loadPropertiesFile(String fileName) throws IOException {
        InputStream inputStream = AdvancedConfigReader.class
            .getClassLoader()
            .getResourceAsStream(fileName);
        
        if (inputStream != null) {
            properties.load(inputStream);
            inputStream.close();
        } else {
            System.out.println("Warning: File not found: " + fileName);
        }
    }
    
    /**
     * Get property value
     */
    public static String getProperty(String key) {
        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Property not found: " + key);
        }
        return value.trim();
    }
    
    /**
     * Get property with default
     */
    public static String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue).trim();
    }
    
    /**
     * Get current environment
     */
    public static String getEnvironment() {
        return environment;
    }
    
    /**
     * Check if property exists
     */
    public static boolean hasProperty(String key) {
        return properties.containsKey(key);
    }
    
    /**
     * Get all properties
     */
    public static Properties getAllProperties() {
        return (Properties) properties.clone();
    }
    
    /**
     * Reload configuration
     */
    public static void reloadConfiguration() {
        properties.clear();
        loadConfiguration();
    }
    
    // Type-safe getters
    
    public static int getInt(String key) {
        return Integer.parseInt(getProperty(key));
    }
    
    public static int getInt(String key, int defaultValue) {
        try {
            return Integer.parseInt(getProperty(key));
        } catch (Exception e) {
            return defaultValue;
        }
    }
    
    public static boolean getBoolean(String key) {
        return Boolean.parseBoolean(getProperty(key));
    }
    
    public static boolean getBoolean(String key, boolean defaultValue) {
        try {
            return Boolean.parseBoolean(getProperty(key));
        } catch (Exception e) {
            return defaultValue;
        }
    }
    
    public static long getLong(String key) {
        return Long.parseLong(getProperty(key));
    }
    
    public static double getDouble(String key) {
        return Double.parseDouble(getProperty(key));
    }
    
    // Application-specific getters
    
    public static String getAppUrl() {
        return getProperty("app.url");
    }
    
    public static String getApiUrl() {
        return getProperty("api.url");
    }
    
    public static String getBrowser() {
        return getProperty("browser", "chrome");
    }
    
    public static boolean isHeadless() {
        return getBoolean("headless", false);
    }
    
    public static boolean shouldMaximize() {
        return getBoolean("maximize", true);
    }
    
    public static int getImplicitWait() {
        return getInt("implicit.wait", 10);
    }
    
    public static int getExplicitWait() {
        return getInt("explicit.wait", 20);
    }
    
    public static int getPageLoadTimeout() {
        return getInt("page.load.timeout", 30);
    }
    
    public static String getTestUsername() {
        return getProperty("test.username");
    }
    
    public static String getTestPassword() {
        return getProperty("test.password");
    }
    
    public static String getAdminUsername() {
        return getProperty("admin.username");
    }
    
    public static String getAdminPassword() {
        return getProperty("admin.password");
    }
    
    public static String getReportPath() {
        return getProperty("report.path", "./test-output/reports");
    }
    
    public static String getScreenshotPath() {
        return getProperty("screenshot.path", "./test-output/screenshots");
    }
    
    public static boolean isScreenshotEnabled() {
        return getBoolean("enable.screenshots", true);
    }
    
    public static boolean isGridEnabled() {
        return getBoolean("grid.enabled", false);
    }
    
    public static String getGridUrl() {
        return getProperty("grid.url", "http://localhost:4444");
    }
}
```

---

## 6. Environment-Specific Configuration

### Running Tests with Different Environments

**Command Line:**

```bash
# Run with QA environment (default)
mvn clean test

# Run with DEV environment
mvn clean test -Denv=dev

# Run with PROD environment
mvn clean test -Denv=prod

# Run with custom properties
mvn clean test -Denv=qa -Dbrowser=firefox -Dheadless=true
```

### Environment Manager Class

```java
package utils;

public class EnvironmentManager {
    
    private static final String DEFAULT_ENV = "qa";
    
    /**
     * Get current environment
     */
    public static String getCurrentEnvironment() {
        return System.getProperty("env", DEFAULT_ENV).toLowerCase();
    }
    
    /**
     * Set environment programmatically
     */
    public static void setEnvironment(String env) {
        System.setProperty("env", env.toLowerCase());
        AdvancedConfigReader.reloadConfiguration();
    }
    
    /**
     * Check if running in specific environment
     */
    public static boolean isQA() {
        return "qa".equals(getCurrentEnvironment());
    }
    
    public static boolean isDev() {
        return "dev".equals(getCurrentEnvironment());
    }
    
    public static boolean isProd() {
        return "prod".equals(getCurrentEnvironment());
    }
    
    /**
     * Get environment-specific URL
     */
    public static String getEnvironmentUrl() {
        String env = getCurrentEnvironment();
        switch (env) {
            case "dev":
                return "https://dev.example.com";
            case "qa":
                return "https://qa.example.com";
            case "prod":
                return "https://www.example.com";
            default:
                return "https://qa.example.com";
        }
    }
    
    /**
     * Print current configuration
     */
    public static void printConfiguration() {
        System.out.println("=== Current Configuration ===");
        System.out.println("Environment: " + getCurrentEnvironment());
        System.out.println("App URL: " + AdvancedConfigReader.getAppUrl());
        System.out.println("Browser: " + AdvancedConfigReader.getBrowser());
        System.out.println("Headless: " + AdvancedConfigReader.isHeadless());
        System.out.println("Grid Enabled: " + AdvancedConfigReader.isGridEnabled());
        System.out.println("============================");
    }
}
```

### Using Environment Configuration in Tests

```java
package tests;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import utils.AdvancedConfigReader;
import utils.EnvironmentManager;

public class EnvironmentConfigTest {
    
    @BeforeClass
    public void setup() {
        // Print current configuration
        EnvironmentManager.printConfiguration();
    }
    
    @Test
    public void testWithEnvironmentConfig() {
        String appUrl = AdvancedConfigReader.getAppUrl();
        String username = AdvancedConfigReader.getTestUsername();
        String password = AdvancedConfigReader.getTestPassword();
        
        System.out.println("Testing on: " + appUrl);
        System.out.println("Using credentials: " + username);
        
        // Test logic using configuration
    }
    
    @Test
    public void testEnvironmentSpecificBehavior() {
        if (EnvironmentManager.isProd()) {
            System.out.println("Running in PROD - using read-only operations");
            // Prod-specific test logic
        } else if (EnvironmentManager.isQA()) {
            System.out.println("Running in QA - full test suite");
            // QA-specific test logic
        } else {
            System.out.println("Running in DEV - including experimental tests");
            // Dev-specific test logic
        }
    }
}
```

---

## 7. Test Data in Properties Files

### Organizing Test Data

**testdata.properties:**

```properties
# User Test Data
user.valid.email=testuser@example.com
user.valid.password=Test@123
user.valid.firstname=John
user.valid.lastname=Doe
user.valid.phone=5551234567

user.invalid.email=invalid-email
user.invalid.password=123
user.invalid.phone=abc

# Product Test Data
product.1.name=Laptop Pro 15
product.1.price=999.99
product.1.category=Electronics

product.2.name=Wireless Mouse
product.2.price=29.99
product.2.category=Accessories

# Payment Test Data
payment.card.valid=4111111111111111
payment.card.expired=4111111111111111
payment.card.invalid=1234567890123456
payment.cvv=123
payment.expiry=12/25

# Search Test Data
search.valid.keyword=laptop
search.invalid.keyword=xyzabc123
search.special.chars=@#$%^&*

# Error Messages
error.invalid.login=Invalid username or password
error.required.field=This field is required
error.invalid.email=Please enter a valid email address
```

### TestDataReader Class

```java
package utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class TestDataReader {
    
    private static Properties testData;
    
    static {
        testData = new Properties();
        try {
            InputStream inputStream = TestDataReader.class
                .getClassLoader()
                .getResourceAsStream("testdata/testdata.properties");
            testData.load(inputStream);
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load test data");
        }
    }
    
    public static String getTestData(String key) {
        return testData.getProperty(key);
    }
    
    // User data getters
    public static String getValidEmail() {
        return getTestData("user.valid.email");
    }
    
    public static String getValidPassword() {
        return getTestData("user.valid.password");
    }
    
    public static String getValidFirstName() {
        return getTestData("user.valid.firstname");
    }
    
    public static String getValidLastName() {
        return getTestData("user.valid.lastname");
    }
    
    public static String getInvalidEmail() {
        return getTestData("user.invalid.email");
    }
    
    public static String getInvalidPassword() {
        return getTestData("user.invalid.password");
    }
    
    // Product data getters
    public static String getProductName(int productNumber) {
        return getTestData("product." + productNumber + ".name");
    }
    
    public static String getProductPrice(int productNumber) {
        return getTestData("product." + productNumber + ".price");
    }
    
    public static String getProductCategory(int productNumber) {
        return getTestData("product." + productNumber + ".category");
    }
    
    // Payment data getters
    public static String getValidCardNumber() {
        return getTestData("payment.card.valid");
    }
    
    public static String getCardCVV() {
        return getTestData("payment.cvv");
    }
    
    public static String getCardExpiry() {
        return getTestData("payment.expiry");
    }
    
    // Search data getters
    public static String getValidSearchKeyword() {
        return getTestData("search.valid.keyword");
    }
    
    public static String getInvalidSearchKeyword() {
        return getTestData("search.invalid.keyword");
    }
    
    // Error message getters
    public static String getInvalidLoginError() {
        return getTestData("error.invalid.login");
    }
    
    public static String getRequiredFieldError() {
        return getTestData("error.required.field");
    }
}
```

### Using Test Data in Tests

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import utils.TestDataReader;

public class LoginTestWithTestData {
    
    @Test
    public void testValidLogin() {
        String email = TestDataReader.getValidEmail();
        String password = TestDataReader.getValidPassword();
        
        // Use in test
        loginPage.login(email, password);
        
        Assert.assertTrue(homePage.isLoggedIn());
    }
    
    @Test
    public void testInvalidLogin() {
        String email = TestDataReader.getInvalidEmail();
        String password = TestDataReader.getInvalidPassword();
        
        loginPage.login(email, password);
        
        String expectedError = TestDataReader.getInvalidLoginError();
        String actualError = loginPage.getErrorMessage();
        
        Assert.assertEquals(actualError, expectedError);
    }
    
    @Test
    public void testProductSearch() {
        String productName = TestDataReader.getProductName(1);
        String expectedPrice = TestDataReader.getProductPrice(1);
        
        searchPage.search(productName);
        
        Assert.assertTrue(searchPage.isProductDisplayed(productName));
        Assert.assertEquals(searchPage.getProductPrice(productName), expectedPrice);
    }
}
```

---

*[Content continues with sections 8-14 covering Advanced Configuration Patterns, Property File Encryption, Best Practices, Complete Framework Integration, Practical Exercises, Key Takeaways, and Interview Questions...]*

---

## 12. Practical Exercises

---

### Exercise 1: Create Basic ConfigReader (25 min)

**Objective:** Build a foundational ConfigReader utility class to read and manage configuration properties.

**Scenario:** Your test automation framework needs centralized configuration management. Create a ConfigReader that loads properties and provides type-safe getters.

**Requirements:**
1. Create `config.properties` file with browser, URL, and timeout settings
2. Implement `ConfigReader` class with static initialization
3. Add getters for String, int, and boolean properties
4. Handle missing properties gracefully
5. Create convenience methods for common properties
6. Write tests demonstrating ConfigReader usage

**Code Template:**

```java
// TODO 1: Create config.properties in src/test/resources/config/
# config.properties
app.url=https://qa.example.com
browser=chrome
headless=false
implicit.wait=10
explicit.wait=15
page.load.timeout=30

// TODO 2: Implement ConfigReader class
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {

    private static Properties properties;
    private static final String CONFIG_FILE_PATH = "src/test/resources/config/config.properties";

    // TODO 3: Implement static block to load properties
    static {
        try {
            // Load properties file
            // Your code here
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load config file: " + CONFIG_FILE_PATH);
        }
    }

    // TODO 4: Implement getProperty() method
    public static String getProperty(String key) {
        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Property not found: " + key);
        }
        return value;
    }

    // TODO 5: Implement getProperty() with default value
    public static String getProperty(String key, String defaultValue) {
        // Your code here
        return null;
    }

    // TODO 6: Implement type-safe getters
    public static int getIntProperty(String key) {
        // Your code here
        return 0;
    }

    public static boolean getBooleanProperty(String key) {
        // Your code here
        return false;
    }

    // TODO 7: Implement convenience methods
    public static String getAppUrl() {
        // Your code here
        return null;
    }

    public static String getBrowser() {
        // Your code here
        return null;
    }

    public static int getImplicitWait() {
        // Your code here
        return 0;
    }
}
```

**Test Class:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import utils.ConfigReader;

public class ConfigReaderTest {

    @Test
    public void testReadProperties() {
        // TODO: Test reading different property types
        String appUrl = ConfigReader.getAppUrl();
        String browser = ConfigReader.getBrowser();
        int timeout = ConfigReader.getImplicitWait();

        Assert.assertNotNull(appUrl);
        Assert.assertEquals(browser, "chrome");
        Assert.assertEquals(timeout, 10);
    }

    @Test
    public void testDefaultValues() {
        // TODO: Test properties with default values
        String missingProp = ConfigReader.getProperty("nonexistent", "default");
        Assert.assertEquals(missingProp, "default");
    }
}
```

**Expected Outcome:**
- Properties loaded once during class initialization
- Type-safe methods preventing casting errors
- Graceful handling of missing properties
- Clean API for accessing configuration
- Tests verify configuration loading

**Common Mistakes to Avoid:**
- Loading properties multiple times
- Not handling missing files properly
- Hardcoding file paths without constants
- Forgetting null checks
- Not providing default values

---

### Exercise 2: Implement Environment-Specific Configuration (35 min)

**Objective:** Create a configuration system that supports multiple environments (dev, qa, prod) with dynamic switching.

**Scenario:** Your tests need to run against different environments. Implement an advanced ConfigReader that loads environment-specific properties based on system property.

**Requirements:**
1. Create separate property files: config.properties, qa.properties, dev.properties, prod.properties
2. Implement AdvancedConfigReader with environment detection
3. Support system property for environment selection
4. Merge base config with environment-specific overrides
5. Create EnvironmentManager utility
6. Write tests for different environments

**Code Template:**

```java
// TODO 1: Create base config.properties
# config.properties
app.name=Test Automation Framework
browser=chrome
implicit.wait=10
explicit.wait=15

// TODO 2: Create qa.properties
# qa.properties
environment=QA
app.url=https://qa.example.com
db.url=jdbc:mysql://qa-db:3306/testdb
test.username=qa_user@test.com
test.password=QA_Pass@123

// TODO 3: Create dev.properties
# dev.properties
environment=DEV
app.url=https://dev.example.com
db.url=jdbc:mysql://localhost:3306/devdb
test.username=dev_user@test.com
test.password=Dev_Pass@123

// TODO 4: Implement AdvancedConfigReader
package utils;

import java.io.InputStream;
import java.util.Properties;

public class AdvancedConfigReader {

    private static Properties properties;
    private static String environment;

    static {
        loadConfiguration();
    }

    // TODO: Implement loadConfiguration()
    private static void loadConfiguration() {
        // Get environment from system property or default to QA
        environment = System.getProperty("env", "qa").toLowerCase();

        properties = new Properties();

        try {
            // TODO: Load base config first
            // TODO: Load environment-specific config (overrides base)

            System.out.println("Configuration loaded for environment: " + environment);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load configuration");
        }
    }

    // TODO: Implement loadPropertiesFile()
    private static void loadPropertiesFile(String fileName) {
        try {
            InputStream inputStream = AdvancedConfigReader.class
                .getClassLoader()
                .getResourceAsStream(fileName);

            if (inputStream != null) {
                // Your code here
            } else {
                System.out.println("Warning: File not found: " + fileName);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String getProperty(String key) {
        // Your code here
        return null;
    }

    public static String getEnvironment() {
        return environment;
    }

    // TODO: Add more getters
}

// TODO 5: Implement EnvironmentManager
package utils;

public class EnvironmentManager {

    public static String getCurrentEnvironment() {
        // Your code here
        return null;
    }

    public static boolean isQA() {
        // Your code here
        return false;
    }

    public static boolean isDev() {
        // Your code here
        return false;
    }

    public static boolean isProd() {
        // Your code here
        return false;
    }

    public static void printConfiguration() {
        // TODO: Print current configuration details
    }
}
```

**Maven Command:**
```bash
# Run with QA environment (default)
mvn clean test

# Run with DEV environment
mvn clean test -Denv=dev

# Run with PROD environment
mvn clean test -Denv=prod
```

**Expected Outcome:**
- Environment-specific properties loaded correctly
- Base config merged with environment override
- System property determines environment
- Tests work across all environments
- Easy environment switching from command line

**Common Mistakes to Avoid:**
- Not trimming property values
- Loading files in wrong order
- Not checking if environment file exists
- Case-sensitive environment names
- Not reloading after environment change

---

### Exercise 3: Separate Test Data in Properties Files (30 min)

**Objective:** Organize test data in dedicated properties files separate from configuration.

**Scenario:** Your framework needs structured test data management. Create separate properties files for different test data categories with a TestDataReader utility.

**Requirements:**
1. Create testdata.properties with organized test data
2. Implement TestDataReader utility class
3. Organize data by category (users, products, payments, errors)
4. Create type-specific getters
5. Support data variations (valid/invalid)
6. Use test data in actual tests

**Code Template:**

```java
// TODO 1: Create testdata.properties
# testdata.properties

# Valid User Data
user.valid.email=testuser@example.com
user.valid.password=Test@123
user.valid.firstname=John
user.valid.lastname=Doe
user.valid.phone=5551234567

# Invalid User Data
user.invalid.email=invalid-email
user.invalid.password=123
user.invalid.phone=abc

# Product Test Data
product.1.name=Laptop Pro 15
product.1.price=999.99
product.1.category=Electronics

product.2.name=Wireless Mouse
product.2.price=29.99
product.2.category=Accessories

# Payment Test Data
payment.card.valid=4111111111111111
payment.card.expired=4111111111111110
payment.cvv=123
payment.expiry.valid=12/25
payment.expiry.expired=01/20

# Error Messages
error.invalid.login=Invalid username or password
error.required.field=This field is required
error.invalid.email=Please enter a valid email address
error.password.weak=Password is too weak

// TODO 2: Implement TestDataReader
package utils;

import java.io.InputStream;
import java.util.Properties;

public class TestDataReader {

    private static Properties testData;

    static {
        testData = new Properties();
        try {
            // TODO: Load testdata.properties from classpath

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load test data");
        }
    }

    public static String getTestData(String key) {
        // Your code here
        return null;
    }

    // TODO 3: Implement user data getters
    public static String getValidEmail() {
        // Your code here
        return null;
    }

    public static String getValidPassword() {
        // Your code here
        return null;
    }

    public static String getInvalidEmail() {
        // Your code here
        return null;
    }

    // TODO 4: Implement product data getters
    public static String getProductName(int productNumber) {
        // Your code here
        return null;
    }

    public static double getProductPrice(int productNumber) {
        // Parse as double
        return 0.0;
    }

    // TODO 5: Implement payment data getters
    public static String getValidCardNumber() {
        // Your code here
        return null;
    }

    public static String getCardCVV() {
        // Your code here
        return null;
    }

    // TODO 6: Implement error message getters
    public static String getInvalidLoginError() {
        // Your code here
        return null;
    }

    public static String getRequiredFieldError() {
        // Your code here
        return null;
    }
}
```

**Test Using Test Data:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import utils.TestDataReader;

public class LoginTestWithTestData {

    @Test
    public void testValidLogin() {
        // TODO: Use TestDataReader for test data
        String email = TestDataReader.getValidEmail();
        String password = TestDataReader.getValidPassword();

        loginPage.login(email, password);

        Assert.assertTrue(homePage.isLoggedIn());
    }

    @Test
    public void testInvalidLogin() {
        // TODO: Test with invalid data
        String email = TestDataReader.getInvalidEmail();
        String password = TestDataReader.getInvalidPassword();

        loginPage.login(email, password);

        String expectedError = TestDataReader.getInvalidLoginError();
        String actualError = loginPage.getErrorMessage();

        Assert.assertEquals(actualError, expectedError);
    }
}
```

**Expected Outcome:**
- Test data completely separated from code
- Easy to add new test data
- Tests use TestDataReader consistently
- Non-technical users can manage test data
- Clear organization by data category

**Common Mistakes to Avoid:**
- Mixing configuration and test data
- Not organizing data by category
- Hardcoding indices or keys in tests
- Not providing getters for common data
- Keeping sensitive data unencrypted

---

### Exercise 4: Handle Multiple Properties Files (40 min)

**Objective:** Build a system that loads and merges multiple properties files with priority handling.

**Scenario:** Your framework needs to load configuration from multiple sources: base config, environment config, local overrides, and test data. Implement proper merging with priority.

**Requirements:**
1. Create multiple properties files with different purposes
2. Implement PropertiesManager that loads all files
3. Handle file loading priority (base → environment → local)
4. Support local overrides file for personal settings
5. Merge properties correctly
6. Write tests verifying merge behavior

**Code Template:**

```java
// TODO 1: Create base config files
# config/base.properties
app.name=Test Framework
browser=chrome
timeout=10

# config/qa.properties
app.url=https://qa.example.com
db.url=jdbc:mysql://qa-db:3306/testdb

# config/local.properties (gitignored)
# Personal overrides
browser=firefox
headless=true

// TODO 2: Implement PropertiesManager
package utils;

import java.io.InputStream;
import java.util.Properties;

public class PropertiesManager {

    private static Properties mergedProperties;

    static {
        loadAllProperties();
    }

    // TODO: Implement loadAllProperties()
    private static void loadAllProperties() {
        mergedProperties = new Properties();

        try {
            // TODO: Load in priority order
            // 1. Base config
            loadPropertiesFile("config/base.properties");

            // 2. Environment-specific config
            String env = System.getProperty("env", "qa");
            loadPropertiesFile("config/" + env + ".properties");

            // 3. Local overrides (optional)
            loadPropertiesFile("config/local.properties");

            printLoadedProperties();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // TODO: Implement loadPropertiesFile()
    private static void loadPropertiesFile(String fileName) {
        try {
            InputStream inputStream = PropertiesManager.class
                .getClassLoader()
                .getResourceAsStream(fileName);

            if (inputStream != null) {
                // Your code here
                System.out.println("Loaded: " + fileName);
            } else {
                System.out.println("Optional file not found: " + fileName);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // TODO: Implement getProperty()
    public static String getProperty(String key) {
        // Your code here
        return null;
    }

    // TODO: Implement getProperty() with default
    public static String getProperty(String key, String defaultValue) {
        // Your code here
        return null;
    }

    // TODO: Implement hasProperty()
    public static boolean hasProperty(String key) {
        // Your code here
        return false;
    }

    // TODO: Implement getAllProperties()
    public static Properties getAllProperties() {
        return (Properties) mergedProperties.clone();
    }

    // TODO: Implement printLoadedProperties()
    private static void printLoadedProperties() {
        System.out.println("=== Loaded Properties ===");
        // Print all properties
        System.out.println("========================");
    }

    // TODO: Implement reloadProperties()
    public static void reloadProperties() {
        mergedProperties.clear();
        loadAllProperties();
    }
}
```

**Expected Outcome:**
- Multiple files loaded in correct order
- Later files override earlier ones
- Local overrides work correctly
- Optional files handled gracefully
- Clear visibility of loaded properties

**Common Mistakes to Avoid:**
- Wrong loading order
- Not handling missing optional files
- Committing local.properties to version control
- Not documenting override behavior
- Not validating loaded properties

---

### Exercise 5: Build Configuration Validation System (35 min)

**Objective:** Create a configuration validation system that checks for required properties and valid values.

**Scenario:** Your framework needs to validate configuration at startup to catch issues early. Implement validators for required properties, value ranges, and format checking.

**Requirements:**
1. Create ConfigValidator class
2. Check for required properties
3. Validate value formats (URL, email, numeric ranges)
4. Provide clear error messages
5. Validate on framework startup
6. Write comprehensive validation tests

**Code Template:**

```java
package utils;

import java.util.ArrayList;
import java.util.List;

public class ConfigValidator {

    private static List<String> validationErrors = new ArrayList<>();

    // TODO 1: Implement validateConfiguration()
    public static boolean validateConfiguration() {
        validationErrors.clear();

        // TODO: Validate all required properties
        validateRequiredProperties();
        validateUrls();
        validateNumericRanges();
        validateBrowserValue();

        // Print errors if any
        if (!validationErrors.isEmpty()) {
            System.err.println("Configuration Validation Errors:");
            for (String error : validationErrors) {
                System.err.println("  - " + error);
            }
            return false;
        }

        System.out.println("Configuration validation passed!");
        return true;
    }

    // TODO 2: Implement validateRequiredProperties()
    private static void validateRequiredProperties() {
        String[] requiredProps = {
            "app.url",
            "browser",
            "implicit.wait",
            "explicit.wait"
        };

        for (String prop : requiredProps) {
            // Your code here
        }
    }

    // TODO 3: Implement validateUrls()
    private static void validateUrls() {
        // TODO: Validate app.url format
        String appUrl = ConfigReader.getProperty("app.url", "");
        if (!isValidUrl(appUrl)) {
            validationErrors.add("Invalid app.url: " + appUrl);
        }
    }

    // TODO 4: Implement validateNumericRanges()
    private static void validateNumericRanges() {
        // TODO: Validate timeout values are positive
        try {
            int implicitWait = ConfigReader.getIntProperty("implicit.wait");
            if (implicitWait < 0 || implicitWait > 60) {
                validationErrors.add("implicit.wait must be between 0 and 60");
            }
        } catch (Exception e) {
            validationErrors.add("implicit.wait must be a valid number");
        }

        // TODO: Validate explicit.wait
    }

    // TODO 5: Implement validateBrowserValue()
    private static void validateBrowserValue() {
        String browser = ConfigReader.getProperty("browser", "");
        String[] validBrowsers = {"chrome", "firefox", "edge", "safari"};

        // Your code here
    }

    // TODO 6: Implement helper methods
    private static boolean isValidUrl(String url) {
        // Check if URL is valid format
        return url.matches("https?://.*");
    }

    private static boolean isPropertyPresent(String key) {
        try {
            String value = ConfigReader.getProperty(key);
            return value != null && !value.trim().isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    // TODO 7: Implement getValidationErrors()
    public static List<String> getValidationErrors() {
        return new ArrayList<>(validationErrors);
    }
}
```

**Test Class:**

```java
package tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import utils.ConfigValidator;

public class ConfigValidatorTest {

    @Test
    public void testValidConfiguration() {
        boolean isValid = ConfigValidator.validateConfiguration();
        Assert.assertTrue(isValid, "Configuration should be valid");
    }

    @Test
    public void testMissingRequiredProperty() {
        // TODO: Test with missing required property
        // This would require mocking or temporary config
    }

    @Test
    public void testInvalidUrl() {
        // TODO: Test with invalid URL format
    }

    @Test
    public void testInvalidNumericValue() {
        // TODO: Test with out-of-range timeout
    }
}
```

**Expected Outcome:**
- All configuration validated at startup
- Clear error messages for invalid config
- Tests catch configuration issues early
- Validation prevents runtime failures
- Easy to add new validation rules

**Common Mistakes to Avoid:**
- Not validating configuration early
- Cryptic error messages
- Not checking all required properties
- Not validating value formats
- Failing silently on validation errors

---

### Exercise 6: Create Property File Encryption Utility (45 min)

**Objective:** Implement encryption/decryption for sensitive properties like passwords and API keys.

**Scenario:** Your properties files contain sensitive data that shouldn't be stored in plain text. Create a utility to encrypt/decrypt sensitive properties.

**Requirements:**
1. Implement simple encryption/decryption utility
2. Mark sensitive properties with prefix (e.g., ENC(...))
3. Decrypt automatically when reading
4. Provide command-line tool to encrypt values
5. Update ConfigReader to handle encrypted properties
6. Test encryption/decryption workflow

**Code Template:**

```java
package utils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class PropertyEncryption {

    private static final String ALGORITHM = "AES";
    private static final String SECRET_KEY = "MySecretKey12345"; // Should be externalized

    // TODO 1: Implement encrypt()
    public static String encrypt(String value) {
        try {
            SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key);

            byte[] encrypted = cipher.doFinal(value.getBytes());
            return "ENC(" + Base64.getEncoder().encodeToString(encrypted) + ")";

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Encryption failed");
        }
    }

    // TODO 2: Implement decrypt()
    public static String decrypt(String encryptedValue) {
        try {
            // Remove ENC( ) wrapper
            if (!encryptedValue.startsWith("ENC(") || !encryptedValue.endsWith(")")) {
                return encryptedValue; // Not encrypted
            }

            String encrypted = encryptedValue.substring(4, encryptedValue.length() - 1);

            SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);

            byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(encrypted));
            return new String(decrypted);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Decryption failed");
        }
    }

    // TODO 3: Implement isEncrypted()
    public static boolean isEncrypted(String value) {
        // Your code here
        return false;
    }

    // TODO 4: Implement command-line encryption tool
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Usage: java PropertyEncryption <value-to-encrypt>");
            return;
        }

        String valueToEncrypt = args[0];
        String encrypted = encrypt(valueToEncrypt);

        System.out.println("Original: " + valueToEncrypt);
        System.out.println("Encrypted: " + encrypted);
        System.out.println("Decrypted: " + decrypt(encrypted));
    }
}

// TODO 5: Update SecureConfigReader to handle encryption
package utils;

public class SecureConfigReader extends ConfigReader {

    @Override
    public static String getProperty(String key) {
        String value = super.getProperty(key);

        // TODO: Decrypt if encrypted
        if (PropertyEncryption.isEncrypted(value)) {
            return PropertyEncryption.decrypt(value);
        }

        return value;
    }

    // Override other getters similarly
}
```

**Properties File:**
```properties
# Sensitive data encrypted
test.username=testuser@example.com
test.password=ENC(aGVsbG93b3JsZDE=)
api.key=ENC(c2VjcmV0a2V5MTIz)

# Non-sensitive data plain
app.url=https://qa.example.com
browser=chrome
```

**Expected Outcome:**
- Sensitive data encrypted in properties files
- Automatic decryption when reading
- Command-line tool for encrypting values
- Framework handles both encrypted and plain values
- Improved security for sensitive data

**Common Mistakes to Avoid:**
- Hardcoding encryption key in code
- Not marking encrypted values clearly
- Encrypting non-sensitive data unnecessarily
- Not testing decryption failures
- Committing unencrypted secrets

---

## Solution Approach for Exercises

### Exercise 1 Solution Hints:
- Use static block for one-time loading
- Store Properties instance as static field
- Catch and wrap IOException properly
- Provide defaults for optional properties
- Test with missing files to verify error handling

### Exercise 2 Solution Hints:
- Load files in correct order (base first)
- Use getResourceAsStream for classpath loading
- System.getProperty("env") gets environment
- Later loaded files override earlier ones
- Print loaded configuration for debugging

### Exercise 3 Solution Hints:
- Group related data with prefixes (user., product., etc.)
- Provide specific getters for common data
- Use descriptive key names
- Consider separate files for large data sets
- Document data structure in comments

### Exercise 4 Solution Hints:
- Each load() call merges with existing properties
- Check for null InputStream before loading
- Use try-catch for optional files
- Clone properties when returning
- Log which files were loaded

### Exercise 5 Solution Hints:
- Build list of errors, don't fail immediately
- Use regex for URL validation
- Check numeric ranges with try-catch
- Validate at framework initialization
- Provide clear, actionable error messages

### Exercise 6 Solution Hints:
- Use simple AES encryption for demo
- Mark encrypted values with ENC() wrapper
- Check prefix before attempting decryption
- Store encryption key securely (not in code)
- Provide CLI tool for generating encrypted values

---

## 13. Key Takeaways

1. **Properties files** provide externalized configuration for test automation
2. **ConfigReader utility** centralizes configuration access
3. **Environment-specific files** enable easy environment switching
4. **Test data separation** improves maintainability
5. **Type-safe getters** prevent runtime errors
6. **Static initialization** loads configuration once
7. **Default values** handle missing properties gracefully
8. **System properties** allow runtime configuration override
9. **Multiple files** can be merged for layered configuration
10. **Encryption** protects sensitive data in properties files

---

## 14. Interview Questions

### Basic Level

1. **Q: What are properties files and why use them in Selenium?**
   
   A: Properties files are text files with key-value pairs used to externalize configuration. Benefits include: no hardcoded values, easy environment switching, centralized configuration, no recompilation needed, and separation of code and configuration.

2. **Q: How do you read a properties file in Java?**
   
   A: Use Java's Properties class: create Properties object, load file using FileInputStream or from classpath, use getProperty() to read values.

### Intermediate Level

3. **Q: How do you handle multiple environments (dev, qa, prod) using properties files?**
   
   A: Create separate properties files for each environment, use system property to determine environment, load base config first then environment-specific config to override, use ConfigReader to abstract environment logic.

4. **Q: Explain the difference between loading from file path vs classpath.**
   
   A: File path uses FileInputStream with absolute/relative path, requires file system access. Classpath uses ClassLoader.getResourceAsStream(), loads from src/test/resources, works in JAR files, more portable.

### Advanced Level

5. **Q: Design a configuration management system for a large test automation framework.**
   
   A: Should include: layered configuration (base + environment + local), ConfigReader with caching, type-safe getters, environment manager, property encryption for sensitive data, validation on load, reload capability, integration with CI/CD, logging of loaded configuration.

---

## Navigation

- [Previous: Day 24 - POM Part 2](day24_pom_part2