
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