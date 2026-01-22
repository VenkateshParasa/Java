# Day 40: Configuration Management - Properties, Environment Variables & Config Files

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand configuration management principles
- Work with Properties files (application.properties)
- Read properties using ResourceBundle and Properties class
- Create and implement ConfigReader utility class
- Manage environment-specific configurations (QA, UAT, Prod)
- Work with YAML and JSON configuration files
- Handle environment variables and system properties
- Use Maven profiles for configuration management
- Understand configuration precedence and override mechanisms
- Implement secure sensitive data management
- Apply configuration factory pattern
- Build a complete configuration framework
- Follow configuration management best practices
- Prepare for configuration-related interview questions

---

## 1. Introduction to Configuration Management

### What is Configuration Management?

**Configuration Management** is the practice of handling application settings, parameters, and environment-specific values in a systematic and maintainable way. It allows your test automation framework to run in different environments without code changes.

### Why Configuration Management?

1. **Environment Flexibility**
   - Run tests in QA, UAT, Staging, Production
   - Switch environments without code changes

2. **Maintainability**
   - Central location for all configurations
   - Easy to update and manage

3. **Security**
   - Separate sensitive data from code
   - Environment-specific credentials

4. **Reusability**
   - Same test code, different configurations
   - Share framework across teams

5. **Version Control**
   - Track configuration changes
   - Environment-specific settings

### Configuration Types

```
Application Configurations:
├── URLs (baseUrl, apiUrl)
├── Credentials (username, password)
├── Timeouts (implicit, explicit)
├── Browser Settings (browser type, headless)
├── Database Connections
├── API Keys
├── File Paths
└── Environment-specific settings
```

---

## 2. Properties Files (application.properties)

### What are Properties Files?

Properties files are key-value pair files used to store configuration data in Java applications. They use `.properties` extension.

### Properties File Format

**config.properties:**
```properties
# Application Configuration
app.name=Selenium Test Framework
app.version=1.0.0

# URL Configuration
base.url=https://example.com
api.url=https://api.example.com

# Browser Configuration
browser=chrome
headless.mode=false
window.maximize=true

# Timeout Configuration (in seconds)
implicit.wait=10
explicit.wait=20
page.load.timeout=30

# Test Data
default.username=testuser
default.password=Test@123

# Report Configuration
screenshot.on.failure=true
report.path=./test-output/reports
```

### Properties File Best Practices

1. **Naming Convention**
   - Use lowercase with dots: `base.url`
   - Group related properties: `db.host`, `db.port`

2. **Comments**
   - Use `#` for comments
   - Document property purpose

3. **No Spaces**
   - Avoid spaces in keys
   - Use dots or underscores

4. **String Values**
   - No quotes needed for strings
   - Trim whitespace automatically

### Creating Properties Files

**Directory Structure:**
```
src/
├── main/
│   └── resources/
│       ├── config/
│       │   ├── application.properties
│       │   ├── qa.properties
│       │   ├── uat.properties
│       │   └── prod.properties
│       └── testdata/
│           └── users.properties
└── test/
    └── resources/
        └── test-config.properties
```

---

## 3. Reading Properties Using ResourceBundle

### What is ResourceBundle?

**ResourceBundle** is a Java class for reading property files. It's part of `java.util` package and designed for internationalization, but commonly used for configuration.

### Basic ResourceBundle Usage

```java
import java.util.ResourceBundle;

public class ConfigDemo {
    public static void main(String[] args) {
        // Load properties file from src/main/resources
        ResourceBundle bundle = ResourceBundle.getBundle("config");

        // Read properties
        String baseUrl = bundle.getString("base.url");
        String browser = bundle.getString("browser");

        System.out.println("Base URL: " + baseUrl);
        System.out.println("Browser: " + browser);
    }
}
```

### ResourceBundle Features

```java
public class ResourceBundleExample {

    public void demonstrateResourceBundle() {
        // Load bundle (without .properties extension)
        ResourceBundle config = ResourceBundle.getBundle("application");

        // Get string value
        String appName = config.getString("app.name");

        // Check if key exists
        if (config.containsKey("base.url")) {
            String url = config.getString("base.url");
            System.out.println("URL: " + url);
        }

        // Get all keys
        java.util.Enumeration<String> keys = config.getKeys();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            String value = config.getString(key);
            System.out.println(key + " = " + value);
        }
    }
}
```

### ResourceBundle Limitations

1. **Read-Only**: Cannot modify properties at runtime
2. **Cache**: Properties are cached (use `clearCache()`)
3. **String Only**: All values returned as strings
4. **No Comments**: Cannot preserve comments

---

## 4. Reading Properties Using Properties Class

### Properties Class Overview

The `Properties` class provides more flexibility than ResourceBundle for reading and writing property files.

### Basic Properties Usage

```java
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesExample {

    public void loadProperties() {
        Properties properties = new Properties();

        try (FileInputStream fis = new FileInputStream("src/main/resources/config.properties")) {
            // Load properties file
            properties.load(fis);

            // Read properties
            String baseUrl = properties.getProperty("base.url");
            String browser = properties.getProperty("browser");
            String timeout = properties.getProperty("implicit.wait");

            System.out.println("Base URL: " + baseUrl);
            System.out.println("Browser: " + browser);
            System.out.println("Timeout: " + timeout);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Properties Class Methods

```java
import java.io.*;
import java.util.*;

public class PropertiesMethodsDemo {

    public void demonstratePropertiesMethods() throws IOException {
        Properties props = new Properties();

        // Load from file
        props.load(new FileInputStream("config.properties"));

        // Get property with default value
        String browser = props.getProperty("browser", "chrome");

        // Set property
        props.setProperty("new.property", "value");

        // Check if property exists
        boolean exists = props.containsKey("base.url");

        // Get all property names
        Set<String> propertyNames = props.stringPropertyNames();

        // Save properties to file
        try (FileOutputStream fos = new FileOutputStream("output.properties")) {
            props.store(fos, "Updated Configuration");
        }

        // Print all properties
        props.list(System.out);
    }
}
```

---

## 5. ConfigReader Utility Class

### Basic ConfigReader Implementation

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigReader {

    private static Properties properties;
    private static final String CONFIG_FILE_PATH = "src/main/resources/config.properties";

    // Static block to load properties once
    static {
        loadProperties();
    }

    // Load properties from file
    private static void loadProperties() {
        properties = new Properties();
        try (FileInputStream fis = new FileInputStream(CONFIG_FILE_PATH)) {
            properties.load(fis);
            System.out.println("Configuration loaded successfully");
        } catch (IOException e) {
            System.err.println("Failed to load configuration file: " + e.getMessage());
            throw new RuntimeException("Configuration file not found at: " + CONFIG_FILE_PATH);
        }
    }

    // Get property value
    public static String getProperty(String key) {
        String value = properties.getProperty(key);
        if (value == null) {
            throw new RuntimeException("Property '" + key + "' not found in configuration");
        }
        return value.trim();
    }

    // Get property with default value
    public static String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue).trim();
    }

    // Get integer property
    public static int getIntProperty(String key) {
        return Integer.parseInt(getProperty(key));
    }

    // Get boolean property
    public static boolean getBooleanProperty(String key) {
        return Boolean.parseBoolean(getProperty(key));
    }

    // Get long property
    public static long getLongProperty(String key) {
        return Long.parseLong(getProperty(key));
    }
}
```

### Enhanced ConfigReader with Type Safety

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class EnhancedConfigReader {

    private static Properties properties;
    private static final String CONFIG_PATH = "src/main/resources/config/";

    static {
        loadConfiguration();
    }

    private static void loadConfiguration() {
        properties = new Properties();
        String environment = System.getProperty("env", "qa");
        String configFile = CONFIG_PATH + environment + ".properties";

        try (FileInputStream fis = new FileInputStream(configFile)) {
            properties.load(fis);
            System.out.println("Loaded configuration for environment: " + environment);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load config file: " + configFile, e);
        }
    }

    // URL Configuration
    public static String getBaseUrl() {
        return getProperty("base.url");
    }

    public static String getApiUrl() {
        return getProperty("api.url");
    }

    // Browser Configuration
    public static String getBrowser() {
        return getProperty("browser", "chrome");
    }

    public static boolean isHeadlessMode() {
        return getBooleanProperty("headless.mode", false);
    }

    public static boolean shouldMaximizeWindow() {
        return getBooleanProperty("window.maximize", true);
    }

    // Timeout Configuration
    public static int getImplicitWait() {
        return getIntProperty("implicit.wait", 10);
    }

    public static int getExplicitWait() {
        return getIntProperty("explicit.wait", 20);
    }

    public static int getPageLoadTimeout() {
        return getIntProperty("page.load.timeout", 30);
    }

    // Credentials
    public static String getUsername() {
        return getProperty("default.username");
    }

    public static String getPassword() {
        return getProperty("default.password");
    }

    // Report Configuration
    public static boolean isScreenshotOnFailure() {
        return getBooleanProperty("screenshot.on.failure", true);
    }

    public static String getReportPath() {
        return getProperty("report.path", "./test-output/reports");
    }

    // Private helper methods
    private static String getProperty(String key) {
        String value = properties.getProperty(key);
        if (value == null || value.trim().isEmpty()) {
            throw new RuntimeException("Property '" + key + "' not found or empty");
        }
        return value.trim();
    }

    private static String getProperty(String key, String defaultValue) {
        String value = properties.getProperty(key);
        return (value != null && !value.trim().isEmpty()) ? value.trim() : defaultValue;
    }

    private static int getIntProperty(String key, int defaultValue) {
        try {
            return Integer.parseInt(getProperty(key));
        } catch (NumberFormatException | RuntimeException e) {
            return defaultValue;
        }
    }

    private static boolean getBooleanProperty(String key, boolean defaultValue) {
        try {
            return Boolean.parseBoolean(getProperty(key));
        } catch (RuntimeException e) {
            return defaultValue;
        }
    }

    // Reload configuration
    public static void reloadConfiguration() {
        loadConfiguration();
    }
}
```

### Using ConfigReader in Tests

```java
package tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import utils.EnhancedConfigReader;
import java.time.Duration;

public class ConfigReaderTest {

    private WebDriver driver;

    @BeforeClass
    public void setup() {
        // Initialize browser from config
        String browser = EnhancedConfigReader.getBrowser();

        if (browser.equalsIgnoreCase("chrome")) {
            driver = new ChromeDriver();
        }

        // Apply configurations
        if (EnhancedConfigReader.shouldMaximizeWindow()) {
            driver.manage().window().maximize();
        }

        // Set timeouts from config
        driver.manage().timeouts()
            .implicitlyWait(Duration.ofSeconds(
                EnhancedConfigReader.getImplicitWait()));

        // Navigate to base URL from config
        driver.get(EnhancedConfigReader.getBaseUrl());
    }

    @Test
    public void testWithConfiguration() {
        // Use credentials from config
        String username = EnhancedConfigReader.getUsername();
        String password = EnhancedConfigReader.getPassword();

        // Test implementation
        System.out.println("Testing with user: " + username);
    }
}
```

---

## 6. Environment-Specific Configurations

### Managing Multiple Environments

**qa.properties:**
```properties
# QA Environment Configuration
environment=QA
base.url=https://qa.example.com
api.url=https://qa-api.example.com

# QA Database
db.host=qa-db.example.com
db.port=3306
db.name=qa_testdb

# QA Credentials
default.username=qa_user
default.password=QA_Pass123

# Test Settings
headless.mode=false
implicit.wait=15
screenshot.on.failure=true
```

**uat.properties:**
```properties
# UAT Environment Configuration
environment=UAT
base.url=https://uat.example.com
api.url=https://uat-api.example.com

# UAT Database
db.host=uat-db.example.com
db.port=3306
db.name=uat_testdb

# UAT Credentials
default.username=uat_user
default.password=UAT_Pass456

# Test Settings
headless.mode=false
implicit.wait=20
screenshot.on.failure=true
```

**prod.properties:**
```properties
# Production Environment Configuration
environment=PRODUCTION
base.url=https://example.com
api.url=https://api.example.com

# Production Database
db.host=prod-db.example.com
db.port=3306
db.name=prod_db

# Production Credentials (use environment variables)
default.username=${PROD_USERNAME}
default.password=${PROD_PASSWORD}

# Test Settings
headless.mode=true
implicit.wait=10
screenshot.on.failure=true
```

### Environment Selector Utility

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class EnvironmentConfig {

    private static Properties properties;
    private static String currentEnvironment;

    // Environment enum
    public enum Environment {
        QA("qa"),
        UAT("uat"),
        STAGING("staging"),
        PROD("prod");

        private final String value;

        Environment(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    static {
        loadEnvironmentConfiguration();
    }

    private static void loadEnvironmentConfiguration() {
        // Get environment from system property or default to QA
        currentEnvironment = System.getProperty("env", Environment.QA.getValue());

        String configPath = String.format("src/main/resources/config/%s.properties",
                                         currentEnvironment);

        properties = new Properties();

        try (FileInputStream fis = new FileInputStream(configPath)) {
            properties.load(fis);
            System.out.println("=".repeat(50));
            System.out.println("Loaded Configuration for: " + currentEnvironment.toUpperCase());
            System.out.println("Base URL: " + properties.getProperty("base.url"));
            System.out.println("=".repeat(50));
        } catch (IOException e) {
            throw new RuntimeException("Failed to load config for environment: " +
                                     currentEnvironment, e);
        }
    }

    public static String getCurrentEnvironment() {
        return currentEnvironment;
    }

    public static String getProperty(String key) {
        String value = properties.getProperty(key);

        // Handle environment variable placeholders
        if (value != null && value.startsWith("${") && value.endsWith("}")) {
            String envVar = value.substring(2, value.length() - 1);
            value = System.getenv(envVar);
            if (value == null) {
                throw new RuntimeException("Environment variable not found: " + envVar);
            }
        }

        return value;
    }

    public static String getProperty(String key, String defaultValue) {
        try {
            return getProperty(key);
        } catch (Exception e) {
            return defaultValue;
        }
    }
}
```

### Running Tests with Different Environments

**Command Line:**
```bash
# Run with QA environment (default)
mvn test

# Run with UAT environment
mvn test -Denv=uat

# Run with Production environment
mvn test -Denv=prod

# Run with custom properties
mvn test -Denv=qa -Dbrowser=firefox -Dheadless=true
```

**TestNG XML:**
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Environment Suite">

    <!-- QA Suite -->
    <test name="QA Tests">
        <parameter name="env" value="qa"/>
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>

    <!-- UAT Suite -->
    <test name="UAT Tests">
        <parameter name="env" value="uat"/>
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>

</suite>
```

---

## 7. YAML Configuration Files

### What is YAML?

YAML (YAML Ain't Markup Language) is a human-readable data serialization format. It's cleaner and more readable than properties files.

### YAML Configuration Example

**config.yaml:**
```yaml
# Application Configuration
application:
  name: Selenium Test Framework
  version: 1.0.0
  environment: QA

# URL Configuration
urls:
  base: https://qa.example.com
  api: https://qa-api.example.com
  admin: https://qa-admin.example.com

# Browser Configuration
browser:
  type: chrome
  headless: false
  maximize: true
  options:
    - --disable-notifications
    - --disable-popup-blocking
    - --start-maximized

# Timeout Configuration (seconds)
timeouts:
  implicit: 10
  explicit: 20
  page_load: 30
  script: 30

# Database Configuration
database:
  host: qa-db.example.com
  port: 3306
  name: qa_testdb
  username: qa_user
  password: qa_pass123

# Test Users
users:
  admin:
    username: admin@example.com
    password: Admin@123
    role: ADMIN
  standard:
    username: user@example.com
    password: User@123
    role: USER

# Reporting
reporting:
  enabled: true
  screenshot_on_failure: true
  video_recording: false
  report_path: ./test-output/reports
  formats:
    - html
    - json
    - xml

# Feature Flags
features:
  api_testing: true
  performance_testing: false
  visual_testing: false
```

### Reading YAML Files

**Maven Dependency:**
```xml
<!-- SnakeYAML dependency -->
<dependency>
    <groupId>org.yaml</groupId>
    <artifactId>snakeyaml</artifactId>
    <version>2.0</version>
</dependency>
```

**YAMLConfigReader Class:**
```java
package utils;

import org.yaml.snakeyaml.Yaml;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

public class YAMLConfigReader {

    private static Map<String, Object> config;
    private static final String CONFIG_FILE = "src/main/resources/config/config.yaml";

    static {
        loadYAMLConfig();
    }

    @SuppressWarnings("unchecked")
    private static void loadYAMLConfig() {
        Yaml yaml = new Yaml();

        try (FileInputStream fis = new FileInputStream(CONFIG_FILE)) {
            config = yaml.load(fis);
            System.out.println("YAML configuration loaded successfully");
        } catch (IOException e) {
            throw new RuntimeException("Failed to load YAML config: " + CONFIG_FILE, e);
        }
    }

    // Get nested property using dot notation
    @SuppressWarnings("unchecked")
    public static String getProperty(String path) {
        String[] keys = path.split("\\.");
        Object value = config;

        for (String key : keys) {
            if (value instanceof Map) {
                value = ((Map<String, Object>) value).get(key);
            } else {
                throw new RuntimeException("Invalid path: " + path);
            }
        }

        return value != null ? value.toString() : null;
    }

    // Get map property
    @SuppressWarnings("unchecked")
    public static Map<String, Object> getMapProperty(String path) {
        String[] keys = path.split("\\.");
        Object value = config;

        for (String key : keys) {
            if (value instanceof Map) {
                value = ((Map<String, Object>) value).get(key);
            }
        }

        return (Map<String, Object>) value;
    }

    // Convenience methods for common configurations
    public static String getBaseUrl() {
        return getProperty("urls.base");
    }

    public static String getApiUrl() {
        return getProperty("urls.api");
    }

    public static String getBrowserType() {
        return getProperty("browser.type");
    }

    public static boolean isHeadless() {
        return Boolean.parseBoolean(getProperty("browser.headless"));
    }

    public static int getImplicitWait() {
        return Integer.parseInt(getProperty("timeouts.implicit"));
    }

    public static Map<String, Object> getUser(String userType) {
        return getMapProperty("users." + userType);
    }
}
```

### Using YAML Configuration

```java
package tests;

import org.testng.annotations.Test;
import utils.YAMLConfigReader;
import java.util.Map;

public class YAMLConfigTest {

    @Test
    public void testYAMLConfiguration() {
        // Read simple properties
        String baseUrl = YAMLConfigReader.getBaseUrl();
        String browser = YAMLConfigReader.getBrowserType();

        System.out.println("Base URL: " + baseUrl);
        System.out.println("Browser: " + browser);

        // Read nested properties
        String dbHost = YAMLConfigReader.getProperty("database.host");
        int dbPort = Integer.parseInt(YAMLConfigReader.getProperty("database.port"));

        System.out.println("DB Host: " + dbHost);
        System.out.println("DB Port: " + dbPort);

        // Read user configuration
        Map<String, Object> adminUser = YAMLConfigReader.getUser("admin");
        String adminUsername = (String) adminUser.get("username");
        String adminPassword = (String) adminUser.get("password");

        System.out.println("Admin User: " + adminUsername);
    }
}
```

---

## 8. JSON Configuration Files

### JSON Configuration Example

**config.json:**
```json
{
  "application": {
    "name": "Selenium Test Framework",
    "version": "1.0.0",
    "environment": "QA"
  },
  "urls": {
    "base": "https://qa.example.com",
    "api": "https://qa-api.example.com",
    "admin": "https://qa-admin.example.com"
  },
  "browser": {
    "type": "chrome",
    "headless": false,
    "maximize": true,
    "options": [
      "--disable-notifications",
      "--disable-popup-blocking"
    ]
  },
  "timeouts": {
    "implicit": 10,
    "explicit": 20,
    "pageLoad": 30
  },
  "database": {
    "host": "qa-db.example.com",
    "port": 3306,
    "name": "qa_testdb",
    "username": "qa_user",
    "password": "qa_pass123"
  },
  "users": {
    "admin": {
      "username": "admin@example.com",
      "password": "Admin@123",
      "role": "ADMIN"
    },
    "standard": {
      "username": "user@example.com",
      "password": "User@123",
      "role": "USER"
    }
  },
  "reporting": {
    "enabled": true,
    "screenshotOnFailure": true,
    "reportPath": "./test-output/reports"
  }
}
```

### Reading JSON Files

**Maven Dependency:**
```xml
<!-- Gson dependency -->
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>
```

**JSONConfigReader Class:**
```java
package utils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.FileReader;
import java.io.IOException;

public class JSONConfigReader {

    private static JsonObject config;
    private static final String CONFIG_FILE = "src/main/resources/config/config.json";

    static {
        loadJSONConfig();
    }

    private static void loadJSONConfig() {
        try (FileReader reader = new FileReader(CONFIG_FILE)) {
            config = JsonParser.parseReader(reader).getAsJsonObject();
            System.out.println("JSON configuration loaded successfully");
        } catch (IOException e) {
            throw new RuntimeException("Failed to load JSON config: " + CONFIG_FILE, e);
        }
    }

    // Get nested property using dot notation
    public static String getProperty(String path) {
        String[] keys = path.split("\\.");
        JsonObject current = config;

        for (int i = 0; i < keys.length - 1; i++) {
            current = current.getAsJsonObject(keys[i]);
        }

        return current.get(keys[keys.length - 1]).getAsString();
    }

    // Get integer property
    public static int getIntProperty(String path) {
        String[] keys = path.split("\\.");
        JsonObject current = config;

        for (int i = 0; i < keys.length - 1; i++) {
            current = current.getAsJsonObject(keys[i]);
        }

        return current.get(keys[keys.length - 1]).getAsInt();
    }

    // Get boolean property
    public static boolean getBooleanProperty(String path) {
        String[] keys = path.split("\\.");
        JsonObject current = config;

        for (int i = 0; i < keys.length - 1; i++) {
            current = current.getAsJsonObject(keys[i]);
        }

        return current.get(keys[keys.length - 1]).getAsBoolean();
    }

    // Get JSON object
    public static JsonObject getJsonObject(String path) {
        String[] keys = path.split("\\.");
        JsonObject current = config;

        for (String key : keys) {
            current = current.getAsJsonObject(key);
        }

        return current;
    }

    // Convenience methods
    public static String getBaseUrl() {
        return getProperty("urls.base");
    }

    public static String getBrowser() {
        return getProperty("browser.type");
    }

    public static int getImplicitWait() {
        return getIntProperty("timeouts.implicit");
    }

    public static boolean isHeadless() {
        return getBooleanProperty("browser.headless");
    }
}
```

### Using JSON Configuration

```java
package tests;

import com.google.gson.JsonObject;
import org.testng.annotations.Test;
import utils.JSONConfigReader;

public class JSONConfigTest {

    @Test
    public void testJSONConfiguration() {
        // Read simple properties
        String baseUrl = JSONConfigReader.getBaseUrl();
        String browser = JSONConfigReader.getBrowser();

        System.out.println("Base URL: " + baseUrl);
        System.out.println("Browser: " + browser);

        // Read nested object
        JsonObject adminUser = JSONConfigReader.getJsonObject("users.admin");
        String username = adminUser.get("username").getAsString();
        String password = adminUser.get("password").getAsString();
        String role = adminUser.get("role").getAsString();

        System.out.println("Admin User: " + username);
        System.out.println("Role: " + role);

        // Read primitive types
        int implicitWait = JSONConfigReader.getIntProperty("timeouts.implicit");
        boolean headless = JSONConfigReader.getBooleanProperty("browser.headless");

        System.out.println("Implicit Wait: " + implicitWait);
        System.out.println("Headless: " + headless);
    }
}
```

---

## 9. Environment Variables and System Properties

### Environment Variables

**Setting Environment Variables:**

**Windows:**
```batch
# Set environment variable
set SELENIUM_ENV=QA
set BASE_URL=https://qa.example.com
set USERNAME=testuser
set PASSWORD=Test@123

# Set permanently
setx SELENIUM_ENV "QA"
```

**Mac/Linux:**
```bash
# Set environment variable
export SELENIUM_ENV=QA
export BASE_URL=https://qa.example.com
export USERNAME=testuser
export PASSWORD=Test@123

# Add to .bashrc or .zshrc for permanent
echo 'export SELENIUM_ENV=QA' >> ~/.bashrc
```

### Reading Environment Variables

```java
package utils;

public class EnvironmentVariableReader {

    // Get environment variable
    public static String getEnvVariable(String key) {
        String value = System.getenv(key);
        if (value == null || value.isEmpty()) {
            throw new RuntimeException("Environment variable not found: " + key);
        }
        return value;
    }

    // Get environment variable with default
    public static String getEnvVariable(String key, String defaultValue) {
        String value = System.getenv(key);
        return (value != null && !value.isEmpty()) ? value : defaultValue;
    }

    // Get all environment variables
    public static void printAllEnvVariables() {
        System.getenv().forEach((key, value) ->
            System.out.println(key + " = " + value));
    }

    // Configuration methods using environment variables
    public static String getEnvironment() {
        return getEnvVariable("SELENIUM_ENV", "QA");
    }

    public static String getBaseUrl() {
        return getEnvVariable("BASE_URL");
    }

    public static String getUsername() {
        return getEnvVariable("USERNAME");
    }

    public static String getPassword() {
        return getEnvVariable("PASSWORD");
    }
}
```

### System Properties

**Setting System Properties:**

```bash
# Command line
mvn test -Denv=qa -Dbrowser=chrome -Dheadless=true

# Java command
java -Denv=qa -Dbrowser=chrome -jar test.jar
```

### Reading System Properties

```java
package utils;

public class SystemPropertyReader {

    // Get system property
    public static String getSystemProperty(String key) {
        String value = System.getProperty(key);
        if (value == null || value.isEmpty()) {
            throw new RuntimeException("System property not found: " + key);
        }
        return value;
    }

    // Get system property with default
    public static String getSystemProperty(String key, String defaultValue) {
        return System.getProperty(key, defaultValue);
    }

    // Set system property
    public static void setSystemProperty(String key, String value) {
        System.setProperty(key, value);
    }

    // Configuration methods
    public static String getEnvironment() {
        return getSystemProperty("env", "qa");
    }

    public static String getBrowser() {
        return getSystemProperty("browser", "chrome");
    }

    public static boolean isHeadless() {
        return Boolean.parseBoolean(getSystemProperty("headless", "false"));
    }

    // Print all system properties
    public static void printAllSystemProperties() {
        System.getProperties().forEach((key, value) ->
            System.out.println(key + " = " + value));
    }
}
```

### Combined Configuration Strategy

```java
package utils;

public class HybridConfigReader {

    // Priority: System Property > Environment Variable > Properties File
    public static String getConfiguration(String key) {
        // 1. Check system property first
        String value = System.getProperty(key);
        if (value != null && !value.isEmpty()) {
            System.out.println("Using system property for: " + key);
            return value;
        }

        // 2. Check environment variable
        value = System.getenv(key.toUpperCase().replace(".", "_"));
        if (value != null && !value.isEmpty()) {
            System.out.println("Using environment variable for: " + key);
            return value;
        }

        // 3. Fall back to properties file
        System.out.println("Using properties file for: " + key);
        return EnhancedConfigReader.getProperty(key);
    }

    // Specific configuration methods
    public static String getBaseUrl() {
        return getConfiguration("base.url");
    }

    public static String getBrowser() {
        return getConfiguration("browser");
    }

    public static String getEnvironment() {
        return getConfiguration("environment");
    }
}
```

---

## 10. Maven Profiles for Configuration

### What are Maven Profiles?

Maven profiles allow you to define different build configurations for different environments.

### pom.xml with Profiles

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>selenium-framework</artifactId>
    <version>1.0.0</version>

    <!-- Default properties -->
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <env>qa</env>
    </properties>

    <!-- Profiles for different environments -->
    <profiles>

        <!-- QA Profile -->
        <profile>
            <id>qa</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <env>qa</env>
                <base.url>https://qa.example.com</base.url>
                <suite.xml>testng-qa.xml</suite.xml>
            </properties>
            <build>
                <resources>
                    <resource>
                        <directory>src/main/resources/config</directory>
                        <includes>
                            <include>qa.properties</include>
                        </includes>
                    </resource>
                </resources>
            </build>
        </profile>

        <!-- UAT Profile -->
        <profile>
            <id>uat</id>
            <properties>
                <env>uat</env>
                <base.url>https://uat.example.com</base.url>
                <suite.xml>testng-uat.xml</suite.xml>
            </properties>
            <build>
                <resources>
                    <resource>
                        <directory>src/main/resources/config</directory>
                        <includes>
                            <include>uat.properties</include>
                        </includes>
                    </resource>
                </resources>
            </build>
        </profile>

        <!-- Production Profile -->
        <profile>
            <id>prod</id>
            <properties>
                <env>prod</env>
                <base.url>https://example.com</base.url>
                <suite.xml>testng-prod.xml</suite.xml>
            </properties>
            <build>
                <resources>
                    <resource>
                        <directory>src/main/resources/config</directory>
                        <includes>
                            <include>prod.properties</include>
                        </includes>
                    </resource>
                </resources>
            </build>
        </profile>

        <!-- Headless Profile -->
        <profile>
            <id>headless</id>
            <properties>
                <headless>true</headless>
            </properties>
        </profile>

    </profiles>

    <build>
        <plugins>
            <!-- Surefire Plugin for TestNG -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.0.0-M9</version>
                <configuration>
                    <suiteXmlFiles>
                        <suiteXmlFile>${suite.xml}</suiteXmlFile>
                    </suiteXmlFiles>
                    <systemPropertyVariables>
                        <env>${env}</env>
                        <base.url>${base.url}</base.url>
                        <headless>${headless}</headless>
                    </systemPropertyVariables>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

### Running Maven with Profiles

```bash
# Run with default (QA) profile
mvn clean test

# Run with UAT profile
mvn clean test -Puat

# Run with Production profile
mvn clean test -Pprod

# Run with multiple profiles
mvn clean test -Pqa,headless

# Override properties
mvn clean test -Pqa -Dbrowser=firefox
```

---

## 11. Configuration Precedence

### Understanding Configuration Priority

Configuration can come from multiple sources. The typical precedence order (highest to lowest):

```
1. Command-line system properties (-Dkey=value)
2. Environment variables
3. Profile-specific properties
4. External configuration files
5. Default application properties
6. Hard-coded defaults
```

### Configuration Precedence Implementation

```java
package utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ConfigurationManager {

    private static Properties properties;
    private static final String DEFAULT_CONFIG = "src/main/resources/config/default.properties";

    static {
        loadConfiguration();
    }

    private static void loadConfiguration() {
        properties = new Properties();

        // 1. Load default properties
        loadDefaultProperties();

        // 2. Load environment-specific properties (overrides defaults)
        loadEnvironmentProperties();

        // 3. Override with system properties
        overrideWithSystemProperties();

        // 4. Override with environment variables
        overrideWithEnvironmentVariables();

        System.out.println("Configuration loaded with precedence applied");
    }

    private static void loadDefaultProperties() {
        try (FileInputStream fis = new FileInputStream(DEFAULT_CONFIG)) {
            properties.load(fis);
            System.out.println("Loaded default configuration");
        } catch (IOException e) {
            System.err.println("Failed to load default config: " + e.getMessage());
        }
    }

    private static void loadEnvironmentProperties() {
        String env = System.getProperty("env", "qa");
        String envConfigPath = String.format("src/main/resources/config/%s.properties", env);

        try (FileInputStream fis = new FileInputStream(envConfigPath)) {
            Properties envProps = new Properties();
            envProps.load(fis);

            // Merge with existing properties (environment-specific overrides defaults)
            envProps.forEach((key, value) -> properties.setProperty((String) key, (String) value));

            System.out.println("Loaded " + env + " environment configuration");
        } catch (IOException e) {
            System.err.println("Failed to load environment config: " + e.getMessage());
        }
    }

    private static void overrideWithSystemProperties() {
        // System properties take precedence
        System.getProperties().forEach((key, value) -> {
            String keyStr = (String) key;
            if (properties.containsKey(keyStr)) {
                properties.setProperty(keyStr, (String) value);
                System.out.println("Overriding with system property: " + keyStr);
            }
        });
    }

    private static void overrideWithEnvironmentVariables() {
        // Environment variables take highest precedence
        properties.stringPropertyNames().forEach(key -> {
            String envKey = key.toUpperCase().replace(".", "_");
            String envValue = System.getenv(envKey);

            if (envValue != null && !envValue.isEmpty()) {
                properties.setProperty(key, envValue);
                System.out.println("Overriding with environment variable: " + key);
            }
        });
    }

    public static String get(String key) {
        return properties.getProperty(key);
    }

    public static String get(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }

    public static void printConfiguration() {
        System.out.println("\n" + "=".repeat(50));
        System.out.println("FINAL CONFIGURATION");
        System.out.println("=".repeat(50));
        properties.forEach((key, value) ->
            System.out.println(key + " = " + value));
        System.out.println("=".repeat(50) + "\n");
    }
}
```

---

## 12. Sensitive Data Management

### Storing Sensitive Data

**Never commit sensitive data to version control:**
- Passwords
- API keys
- Database credentials
- Access tokens

### .gitignore Configuration

```
# Ignore sensitive configuration files
src/main/resources/config/prod.properties
src/main/resources/config/secrets.properties
*.secret
*.credentials

# Environment files
.env
.env.local
```

### Using Environment Variables for Secrets

```java
package utils;

public class SecureConfigReader {

    // Read sensitive data from environment variables
    public static String getDatabasePassword() {
        String password = System.getenv("DB_PASSWORD");
        if (password == null || password.isEmpty()) {
            throw new RuntimeException("Database password not found in environment");
        }
        return password;
    }

    public static String getApiKey() {
        String apiKey = System.getenv("API_KEY");
        if (apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException("API key not found in environment");
        }
        return apiKey;
    }

    public static String getUsername() {
        return System.getenv("APP_USERNAME");
    }

    public static String getPassword() {
        return System.getenv("APP_PASSWORD");
    }
}
```

### Property Placeholders

**production.properties:**
```properties
# Use placeholders for sensitive data
database.url=jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}
database.username=${DB_USERNAME}
database.password=${DB_PASSWORD}

api.key=${API_KEY}
api.secret=${API_SECRET}
```

### Resolving Placeholders

```java
package utils;

import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PropertyPlaceholderResolver {

    private static final Pattern PLACEHOLDER_PATTERN = Pattern.compile("\\$\\{([^}]+)\\}");

    public static String resolvePlaceholders(String value) {
        if (value == null) {
            return null;
        }

        Matcher matcher = PLACEHOLDER_PATTERN.matcher(value);
        StringBuffer result = new StringBuffer();

        while (matcher.find()) {
            String placeholder = matcher.group(1);
            String replacement = getEnvironmentVariable(placeholder);

            if (replacement != null) {
                matcher.appendReplacement(result, replacement);
            } else {
                throw new RuntimeException("Unable to resolve placeholder: " + placeholder);
            }
        }

        matcher.appendTail(result);
        return result.toString();
    }

    private static String getEnvironmentVariable(String key) {
        // Try environment variable
        String value = System.getenv(key);

        // Fall back to system property
        if (value == null) {
            value = System.getProperty(key);
        }

        return value;
    }

    public static Properties resolveAllPlaceholders(Properties properties) {
        Properties resolved = new Properties();

        properties.forEach((key, value) -> {
            String resolvedValue = resolvePlaceholders((String) value);
            resolved.setProperty((String) key, resolvedValue);
        });

        return resolved;
    }
}
```

---

## 13. Configuration Factory Pattern

### Configuration Factory Implementation

```java
package config;

public interface Configuration {
    String getBaseUrl();
    String getBrowser();
    int getImplicitWait();
    String getUsername();
    String getPassword();
    boolean isHeadless();
}
```

```java
package config;

public class QAConfiguration implements Configuration {

    @Override
    public String getBaseUrl() {
        return "https://qa.example.com";
    }

    @Override
    public String getBrowser() {
        return "chrome";
    }

    @Override
    public int getImplicitWait() {
        return 10;
    }

    @Override
    public String getUsername() {
        return "qa_user";
    }

    @Override
    public String getPassword() {
        return System.getenv("QA_PASSWORD");
    }

    @Override
    public boolean isHeadless() {
        return false;
    }
}
```

```java
package config;

public class UATConfiguration implements Configuration {

    @Override
    public String getBaseUrl() {
        return "https://uat.example.com";
    }

    @Override
    public String getBrowser() {
        return "chrome";
    }

    @Override
    public int getImplicitWait() {
        return 15;
    }

    @Override
    public String getUsername() {
        return "uat_user";
    }

    @Override
    public String getPassword() {
        return System.getenv("UAT_PASSWORD");
    }

    @Override
    public boolean isHeadless() {
        return false;
    }
}
```

```java
package config;

public class ProductionConfiguration implements Configuration {

    @Override
    public String getBaseUrl() {
        return "https://example.com";
    }

    @Override
    public String getBrowser() {
        return "chrome";
    }

    @Override
    public int getImplicitWait() {
        return 10;
    }

    @Override
    public String getUsername() {
        return System.getenv("PROD_USERNAME");
    }

    @Override
    public String getPassword() {
        return System.getenv("PROD_PASSWORD");
    }

    @Override
    public boolean isHeadless() {
        return true;
    }
}
```

### Configuration Factory

```java
package config;

public class ConfigurationFactory {

    private static Configuration configuration;

    public static Configuration getConfiguration() {
        if (configuration == null) {
            String environment = System.getProperty("env", "qa").toLowerCase();

            switch (environment) {
                case "qa":
                    configuration = new QAConfiguration();
                    break;
                case "uat":
                    configuration = new UATConfiguration();
                    break;
                case "prod":
                    configuration = new ProductionConfiguration();
                    break;
                default:
                    throw new IllegalArgumentException("Unknown environment: " + environment);
            }

            System.out.println("Loaded configuration for: " + environment.toUpperCase());
        }

        return configuration;
    }
}
```

### Using Configuration Factory

```java
package tests;

import config.Configuration;
import config.ConfigurationFactory;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.time.Duration;

public class ConfigFactoryTest {

    private WebDriver driver;
    private Configuration config;

    @BeforeClass
    public void setup() {
        // Get configuration based on environment
        config = ConfigurationFactory.getConfiguration();

        // Initialize browser
        driver = new ChromeDriver();

        // Apply configuration
        if (config.isHeadless()) {
            // Configure headless mode
        }

        driver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(config.getImplicitWait()));

        driver.get(config.getBaseUrl());
    }

    @Test
    public void testWithConfiguration() {
        String username = config.getUsername();
        String password = config.getPassword();

        System.out.println("Testing with user: " + username);
        // Test implementation
    }
}
```

---

## 14. Complete Configuration Framework

### Unified Configuration Manager

```java
package framework.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class UnifiedConfigManager {

    private static UnifiedConfigManager instance;
    private Properties properties;
    private String environment;

    private UnifiedConfigManager() {
        loadConfiguration();
    }

    public static synchronized UnifiedConfigManager getInstance() {
        if (instance == null) {
            instance = new UnifiedConfigManager();
        }
        return instance;
    }

    private void loadConfiguration() {
        // Determine environment
        environment = determineEnvironment();

        // Load configuration
        properties = new Properties();

        // Load base configuration
        loadPropertiesFile("src/main/resources/config/default.properties");

        // Load environment-specific configuration
        loadPropertiesFile(String.format("src/main/resources/config/%s.properties", environment));

        // Override with system properties and environment variables
        applyOverrides();

        System.out.println("Configuration loaded for: " + environment);
    }

    private String determineEnvironment() {
        // Priority: System Property > Environment Variable > Default
        String env = System.getProperty("env");

        if (env == null || env.isEmpty()) {
            env = System.getenv("SELENIUM_ENV");
        }

        if (env == null || env.isEmpty()) {
            env = "qa";  // Default
        }

        return env.toLowerCase();
    }

    private void loadPropertiesFile(String filePath) {
        try (FileInputStream fis = new FileInputStream(filePath)) {
            properties.load(fis);
        } catch (IOException e) {
            System.err.println("Warning: Could not load " + filePath);
        }
    }

    private void applyOverrides() {
        // Override with system properties
        System.getProperties().forEach((key, value) -> {
            if (properties.containsKey(key)) {
                properties.setProperty((String) key, (String) value);
            }
        });

        // Override with environment variables
        properties.stringPropertyNames().forEach(key -> {
            String envKey = key.toUpperCase().replace(".", "_");
            String envValue = System.getenv(envKey);
            if (envValue != null) {
                properties.setProperty(key, envValue);
            }
        });
    }

    // Core configuration getters
    public String get(String key) {
        return properties.getProperty(key);
    }

    public String get(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }

    public int getInt(String key) {
        return Integer.parseInt(get(key));
    }

    public int getInt(String key, int defaultValue) {
        try {
            return Integer.parseInt(get(key));
        } catch (Exception e) {
            return defaultValue;
        }
    }

    public boolean getBoolean(String key) {
        return Boolean.parseBoolean(get(key));
    }

    public boolean getBoolean(String key, boolean defaultValue) {
        try {
            return Boolean.parseBoolean(get(key));
        } catch (Exception e) {
            return defaultValue;
        }
    }

    // Specific configuration methods
    public String getBaseUrl() {
        return get("base.url");
    }

    public String getApiUrl() {
        return get("api.url");
    }

    public String getBrowser() {
        return get("browser", "chrome");
    }

    public boolean isHeadless() {
        return getBoolean("headless.mode", false);
    }

    public int getImplicitWait() {
        return getInt("implicit.wait", 10);
    }

    public int getExplicitWait() {
        return getInt("explicit.wait", 20);
    }

    public String getUsername() {
        return get("default.username");
    }

    public String getPassword() {
        return get("default.password");
    }

    public String getEnvironment() {
        return environment;
    }

    public void printConfiguration() {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("CONFIGURATION SUMMARY");
        System.out.println("=".repeat(60));
        System.out.println("Environment: " + environment);
        System.out.println("Base URL: " + getBaseUrl());
        System.out.println("Browser: " + getBrowser());
        System.out.println("Headless: " + isHeadless());
        System.out.println("Implicit Wait: " + getImplicitWait() + "s");
        System.out.println("=".repeat(60) + "\n");
    }
}
```

### Using Unified Configuration Manager

```java
package tests;

import framework.config.UnifiedConfigManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import java.time.Duration;

public class UnifiedConfigTest {

    private WebDriver driver;
    private UnifiedConfigManager config;

    @BeforeClass
    public void setup() {
        // Get configuration instance
        config = UnifiedConfigManager.getInstance();
        config.printConfiguration();

        // Setup browser with configuration
        ChromeOptions options = new ChromeOptions();

        if (config.isHeadless()) {
            options.addArguments("--headless=new");
        }

        driver = new ChromeDriver(options);

        // Apply timeouts
        driver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(config.getImplicitWait()));

        // Navigate to base URL
        driver.get(config.getBaseUrl());
    }

    @Test
    public void testApplication() {
        System.out.println("Running test on: " + config.getEnvironment());
        System.out.println("Testing URL: " + driver.getCurrentUrl());

        // Use configuration in test
        String username = config.getUsername();
        String password = config.getPassword();

        // Test logic
    }
}
```

---

## 15. Best Practices

### 1. Centralize Configuration

```java
// GOOD - Single source of truth
UnifiedConfigManager.getInstance().getBaseUrl()

// BAD - Scattered configuration
driver.get("https://qa.example.com");  // Hardcoded
```

### 2. Use Environment Variables for Secrets

```properties
# GOOD - Reference environment variable
database.password=${DB_PASSWORD}

# BAD - Hardcoded password
database.password=mypassword123
```

### 3. Support Multiple Environments

```
config/
├── default.properties     # Common configuration
├── qa.properties         # QA-specific
├── uat.properties        # UAT-specific
└── prod.properties       # Production-specific
```

### 4. Implement Configuration Precedence

```
Priority (High to Low):
1. Command-line arguments
2. Environment variables
3. Environment-specific files
4. Default configuration
```

### 5. Validate Configuration

```java
public void validateConfiguration() {
    if (getBaseUrl() == null) {
        throw new ConfigurationException("base.url is required");
    }

    if (getImplicitWait() < 0) {
        throw new ConfigurationException("implicit.wait must be positive");
    }
}
```

### 6. Use Type-Safe Methods

```java
// GOOD - Type-safe getters
public int getTimeout() {
    return getInt("timeout");
}

// BAD - String parsing in tests
String timeout = config.get("timeout");
int timeoutInt = Integer.parseInt(timeout);  // Repetitive
```

### 7. Document Configuration Properties

```properties
# Browser Configuration
# Supported values: chrome, firefox, edge, safari
browser=chrome

# Headless Mode
# Set to true to run tests without UI
# Default: false
headless.mode=false
```

### 8. Separate Test Data from Configuration

```
resources/
├── config/              # Application configuration
│   ├── qa.properties
│   └── uat.properties
└── testdata/            # Test data
    ├── users.json
    └── products.json
```

### 9. Use Configuration for Feature Flags

```properties
# Feature Flags
feature.api.testing=true
feature.performance.testing=false
feature.visual.testing=false
```

### 10. Implement Singleton Pattern

```java
// Ensure only one configuration instance
public static synchronized UnifiedConfigManager getInstance() {
    if (instance == null) {
        instance = new UnifiedConfigManager();
    }
    return instance;
}
```

---

## 16. Key Takeaways

1. **Configuration Management** separates configuration from code
2. **Properties Files** are simple key-value storage for configuration
3. **ResourceBundle** and **Properties** class read property files
4. **ConfigReader** utility provides centralized configuration access
5. **Environment-specific** configurations enable multi-environment testing
6. **YAML and JSON** offer hierarchical configuration structure
7. **Environment Variables** and **System Properties** provide runtime overrides
8. **Maven Profiles** manage build-specific configurations
9. **Configuration Precedence** determines which values take priority
10. **Sensitive Data** should use environment variables, not files
11. **Configuration Factory** pattern provides environment-specific configurations
12. **Unified Configuration Manager** combines all configuration strategies
13. **Best Practices** include centralization, validation, and security
14. **Type-safe methods** prevent runtime errors
15. **Proper structure** makes configuration maintainable and scalable

---

## 17. Common Interview Questions

1. What is configuration management in test automation?
2. How do you read properties files in Java?
3. Explain the difference between ResourceBundle and Properties class.
4. How do you manage multiple environment configurations?
5. What is the purpose of a ConfigReader utility class?
6. How do you handle sensitive data in configuration files?
7. Explain configuration precedence in your framework.
8. What are Maven profiles and how are they used?
9. How do environment variables differ from system properties?
10. What is the Configuration Factory pattern?
11. How do you implement YAML configuration in Java?
12. What are the best practices for configuration management?
13. How do you prevent committing sensitive data to Git?
14. Explain property placeholder resolution.
15. How do you validate configuration at runtime?

### Sample Answers

**Q: How do you handle sensitive data in configuration files?**

A: "I use multiple strategies for handling sensitive data:
1. Store sensitive values as environment variables
2. Use property placeholders like ${DB_PASSWORD} in config files
3. Never commit sensitive files to version control
4. Use .gitignore to exclude secret files
5. Encrypt sensitive data if storing in files
6. Use CI/CD secret management for automated tests
7. Load credentials from secure vaults in production"

**Q: Explain configuration precedence in your framework.**

A: "My framework follows this precedence order (highest to lowest):
1. Command-line system properties (-Dkey=value)
2. Environment variables
3. Environment-specific property files (qa.properties)
4. Default property file (default.properties)
5. Hard-coded default values

This allows flexibility to override any configuration at runtime while maintaining sensible defaults."

---

## Navigation

- **Previous:** [Day 33: Logging & Reporting Part 2](./day33_logging_reporting_part2.md)
- **Next:** [Day 35: Utility Classes](./day35_utility_classes.md)
- **Week 5 Home:** [Week 5 Overview](./README.md)

---

**Happy Learning!** Configuration management is essential for building maintainable and scalable test automation frameworks that work across multiple environments.
## Hands-On Exercises for Configuration Management

### Exercise 1: Creating Basic ConfigReader Utility (40 minutes)

**Objective**: Build a ConfigReader utility class to read properties from application.properties file with type-safe methods.

**Scenario**: Your automation framework needs centralized configuration management. Create a ConfigReader that loads properties and provides type-safe getter methods.

**Tasks**:
1. Create config.properties file with various configuration parameters
2. Implement ConfigReader class with static initialization
3. Add type-safe methods (getString, getInt, getBoolean)
4. Implement default value support
5. Add error handling for missing properties
6. Test ConfigReader in a sample test class

**Code Template**:

```java
// TODO 1: Create config.properties file in src/main/resources/
# Application Configuration
app.name=Selenium Framework
base.url=https://qa.example.com
browser=chrome
headless.mode=false
implicit.wait=10
explicit.wait=20
default.username=testuser
default.password=Test@123

// TODO 2: Complete ConfigReader class
package utils;

import java.io.FileInputStream;
import java.util.Properties;

public class ConfigReader {

    private static Properties properties;
    private static final String CONFIG_FILE = "src/main/resources/config.properties";

    static {
        // TODO: Load properties in static block
    }

    private static void loadProperties() {
        // TODO: Initialize Properties object
        // TODO: Load file using FileInputStream
        // TODO: Handle IOException
    }

    // TODO: Implement getProperty method
    public static String getProperty(String key) {
        // TODO: Get property value
        // TODO: Throw exception if key not found
        return null;
    }

    // TODO: Implement getProperty with default value
    public static String getProperty(String key, String defaultValue) {
        // TODO: Return property or default value
        return null;
    }

    // TODO: Implement getIntProperty
    public static int getIntProperty(String key) {
        // TODO: Parse string to int
        return 0;
    }

    // TODO: Implement getBooleanProperty
    public static boolean getBooleanProperty(String key) {
        // TODO: Parse string to boolean
        return false;
    }
}

// TODO 3: Test ConfigReader
public class ConfigReaderTest {
    public static void main(String[] args) {
        // TODO: Read and print all configuration values
    }
}
```

**Expected Output**:
```
✓ Properties file loaded successfully
✓ All property values retrieved correctly
✓ Type conversions working (int, boolean)
✓ Default values applied when key missing
✓ Exception thrown for non-existent required keys
```

**Common Mistakes**:
1. Not using static block for initialization
2. File path issues (absolute vs relative)
3. Not closing FileInputStream properly
4. Not handling NumberFormatException
5. Returning null instead of throwing exception

<details>
<summary><b>Solution Hints</b></summary>

```java
static {
    loadProperties();
}

private static void loadProperties() {
    properties = new Properties();
    try (FileInputStream fis = new FileInputStream(CONFIG_FILE)) {
        properties.load(fis);
    } catch (IOException e) {
        throw new RuntimeException("Config file not found", e);
    }
}

public static String getProperty(String key) {
    String value = properties.getProperty(key);
    if (value == null) {
        throw new RuntimeException("Property not found: " + key);
    }
    return value.trim();
}
```
</details>

---

### Exercise 2: Implementing Environment-Specific Configurations (45 minutes)

**Objective**: Create multiple environment configuration files (QA, UAT, PROD) and implement environment selector utility.

**Tasks**:
1. Create separate properties files for each environment
2. Implement EnvironmentConfig class with environment enum
3. Load configuration based on system property
4. Handle environment variable placeholders
5. Test switching between environments
6. Run tests with different environments using -Denv parameter

**Code Template**:

```java
// TODO 1: Create qa.properties
environment=QA
base.url=https://qa.example.com
db.host=qa-db.example.com
default.username=qa_user

// TODO 2: Create uat.properties
environment=UAT
base.url=https://uat.example.com
db.host=uat-db.example.com
default.username=uat_user

// TODO 3: Create prod.properties
environment=PRODUCTION
base.url=https://example.com
db.host=prod-db.example.com
default.username=${PROD_USERNAME}
default.password=${PROD_PASSWORD}

// TODO 4: Implement EnvironmentConfig
package utils;

public class EnvironmentConfig {

    private static Properties properties;
    private static String currentEnvironment;

    public enum Environment {
        QA("qa"), UAT("uat"), PROD("prod");
        private final String value;
        Environment(String value) { this.value = value; }
        public String getValue() { return value; }
    }

    static {
        // TODO: Load environment configuration
    }

    private static void loadEnvironmentConfiguration() {
        // TODO: Get environment from system property (default to QA)
        // TODO: Build config file path
        // TODO: Load properties
        // TODO: Print loaded environment
    }

    public static String getProperty(String key) {
        // TODO: Get property value
        // TODO: Resolve placeholders like ${ENV_VAR}
        return null;
    }
}

// TODO 5: Test with different environments
// Run: mvn test -Denv=qa
// Run: mvn test -Denv=uat
```

**Expected Output**:
```
✓ QA configuration loaded when no parameter specified
✓ UAT configuration loaded with -Denv=uat
✓ PROD configuration loaded with -Denv=prod
✓ Environment variables resolved in PROD config
✓ Correct base URL for each environment
```

<details>
<summary><b>Solution Hints</b></summary>

```java
currentEnvironment = System.getProperty("env", Environment.QA.getValue());
String configPath = "src/main/resources/config/" + currentEnvironment + ".properties";

// Placeholder resolution
if (value != null && value.startsWith("${") && value.endsWith("}")) {
    String envVar = value.substring(2, value.length() - 1);
    value = System.getenv(envVar);
}
```
</details>

---

### Exercise 3: Building Enhanced ConfigReader with All Features (50 minutes)

**Objective**: Create a production-ready ConfigReader with type-safe methods, default values, and environment-specific loading.

**Tasks**:
1. Combine basic and environment-specific features
2. Add convenience methods for common configurations
3. Implement configuration validation
4. Add thread-safety for parallel execution
5. Create comprehensive test coverage

**Code Template**:

```java
package utils;

public class EnhancedConfigReader {

    private static Properties properties;
    private static final Object lock = new Object();

    static {
        loadConfiguration();
    }

    private static void loadConfiguration() {
        synchronized (lock) {
            // TODO: Load environment-specific config
        }
    }

    // Convenience methods
    public static String getBaseUrl() {
        // TODO: Return base.url
        return null;
    }

    public static String getBrowser() {
        // TODO: Return browser with default "chrome"
        return null;
    }

    public static int getImplicitWait() {
        // TODO: Return implicit.wait with default 10
        return 0;
    }

    public static boolean isHeadlessMode() {
        // TODO: Return headless.mode with default false
        return false;
    }

    // TODO: Add more convenience methods
}
```

**Expected Output**:
```
✓ All configuration methods working correctly
✓ Thread-safe for parallel test execution
✓ Default values applied correctly
✓ Environment switching seamless
✓ Type conversions accurate
```

---

### Exercise 4: Working with YAML Configuration Files (40 minutes)

**Objective**: Implement YAML-based configuration as an alternative to properties files.

**Tasks**:
1. Add SnakeYAML Maven dependency
2. Create config.yaml with hierarchical structure
3. Implement YAMLConfigReader class
4. Support nested property access (urls.base, timeouts.implicit)
5. Test reading complex YAML structures

**Code Template**:

```yaml
# TODO 1: Create config.yaml
application:
  name: Selenium Framework
  version: 1.0.0

urls:
  base: https://qa.example.com
  api: https://api.qa.example.com

browser:
  type: chrome
  headless: false
  options:
    - --disable-notifications
    - --start-maximized

timeouts:
  implicit: 10
  explicit: 20
  page_load: 30

users:
  admin:
    username: admin@example.com
    password: Admin@123
  standard:
    username: user@example.com
    password: User@123
```

```java
// TODO 2: Implement YAMLConfigReader
package utils;

import org.yaml.snakeyaml.Yaml;
import java.util.Map;

public class YAMLConfigReader {

    private static Map<String, Object> config;

    static {
        // TODO: Load YAML config
    }

    public static String getProperty(String path) {
        // TODO: Support dot notation (urls.base)
        return null;
    }

    public static Map<String, Object> getMapProperty(String path) {
        // TODO: Return map for nested objects
        return null;
    }
}
```

**Expected Output**:
```
✓ YAML file loaded successfully
✓ Nested properties accessible via dot notation
✓ Map objects retrieved correctly
✓ Lists and arrays supported
✓ Type preservation maintained
```

---

### Exercise 5: Implementing Configuration Precedence (45 minutes)

**Objective**: Build a configuration manager that supports multiple configuration sources with proper precedence order.

**Tasks**:
1. Implement precedence: System Properties > Environment Variables > Config Files
2. Create ConfigurationManager with layered loading
3. Test precedence by overriding values
4. Print final configuration with source indication

**Code Template**:

```java
package utils;

public class ConfigurationManager {

    private static Properties properties;

    static {
        loadConfiguration();
    }

    private static void loadConfiguration() {
        properties = new Properties();

        // TODO: 1. Load default properties
        loadDefaultProperties();

        // TODO: 2. Load environment-specific (overrides defaults)
        loadEnvironmentProperties();

        // TODO: 3. Override with system properties
        overrideWithSystemProperties();

        // TODO: 4. Override with environment variables
        overrideWithEnvironmentVariables();
    }

    // TODO: Implement each loading method
}
```

**Expected Output**:
```
✓ Default configuration loaded
✓ Environment-specific overrides applied
✓ System properties take precedence
✓ Environment variables highest priority
✓ Final configuration printed with sources
```

---

### Exercise 6: Creating Complete Configuration Framework (60 minutes)

**Objective**: Build an enterprise-grade unified configuration framework combining all features.

**Tasks**:
1. Combine properties and YAML support
2. Add environment variable resolution
3. Implement configuration validation
4. Create singleton pattern implementation
5. Add configuration reload capability
6. Build comprehensive test suite

**Code Template**:

```java
package framework.config;

public class UnifiedConfigManager {

    private static UnifiedConfigManager instance;
    private Properties properties;
    private String environment;

    private UnifiedConfigManager() {
        loadConfiguration();
    }

    public static synchronized UnifiedConfigManager getInstance() {
        // TODO: Implement singleton
        return null;
    }

    private void loadConfiguration() {
        // TODO: Determine environment
        // TODO: Load base config
        // TODO: Load environment-specific config
        // TODO: Apply overrides
    }

    // TODO: Add all getter methods
    // TODO: Add validation
    // TODO: Add reload capability
}
```

**Expected Output**:
```
✓ Singleton pattern working correctly
✓ All configuration sources integrated
✓ Validation catching invalid configurations
✓ Reload functionality working
✓ Thread-safe for parallel execution
✓ Comprehensive configuration printed
```

---

