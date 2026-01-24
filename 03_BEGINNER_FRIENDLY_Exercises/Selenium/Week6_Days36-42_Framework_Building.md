# Week 6: Framework Building - Beginner-Friendly Exercises

## Day 36: Framework Architecture

### Exercise 1: Design Framework Structure

```exercise
title: Create Scalable Framework Architecture
description: Design and implement a complete framework structure with proper package organization.
requirements:
- Create package structure
- Separate pages, tests, utils, config
- Implement base classes
- Add constants and enums
- Create factory patterns
testcases:
- input: "Build framework structure"
  output: "Should have organized package hierarchy"
hints:
- Use Maven/Gradle for dependencies
- Separate src/main and src/test
- Group related classes in packages
- Use meaningful package names
- Follow naming conventions
solution:
```text
Framework Structure:
selenium-framework/
├── src/main/java/
│   ├── com.framework.pages/
│   │   ├── BasePage.java
│   │   ├── LoginPage.java
│   │   └── HomePage.java
│   ├── com.framework.utils/
│   │   ├── DriverFactory.java
│   │   ├── ConfigReader.java
│   │   ├── ExcelUtils.java
│   │   └── WaitUtils.java
│   ├── com.framework.constants/
│   │   └── FrameworkConstants.java
│   └── com.framework.enums/
│       └── BrowserType.java
├── src/test/java/
│   ├── com.framework.base/
│   │   └── BaseTest.java
│   └── com.framework.tests/
│       ├── LoginTests.java
│       └── CheckoutTests.java
├── src/test/resources/
│   ├── testng.xml
│   ├── config.properties
│   └── testdata/
│       └── login-data.xlsx
└── pom.xml
```

```java
// FrameworkConstants.java
package com.framework.constants;

public class FrameworkConstants {
    public static final String CONFIG_FILE = "config.properties";
    public static final String EXCEL_PATH = "src/test/resources/testdata/";
    public static final String SCREENSHOT_PATH = "test-output/screenshots/";
    public static final int EXPLICIT_WAIT = 10;
    public static final int PAGE_LOAD_TIMEOUT = 30;
}

// BrowserType.java
package com.framework.enums;

public enum BrowserType {
    CHROME,
    FIREFOX,
    EDGE,
    SAFARI
}

// DriverFactory.java
package com.framework.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import com.framework.enums.BrowserType;

public class DriverFactory {
    
    public static WebDriver createDriver(BrowserType browserType) {
        WebDriver driver;
        
        switch (browserType) {
            case CHROME:
                driver = new ChromeDriver();
                break;
            case FIREFOX:
                driver = new FirefoxDriver();
                break;
            default:
                driver = new ChromeDriver();
        }
        
        driver.manage().window().maximize();
        return driver;
    }
}
```
\```
```

## Day 37: Configuration Management

### Exercise 2: Implement Configuration System

```exercise
title: Create Flexible Configuration Management
description: Build a configuration system supporting multiple environments and properties.
requirements:
- Read from properties files
- Support multiple environments
- Implement singleton pattern
- Add environment-specific configs
- Handle missing properties
testcases:
- input: "Load configuration"
  output: "Should read and provide config values"
hints:
- Use Properties class
- Implement lazy initialization
- Cache loaded properties
- Provide default values
- Support environment variables
solution:
```java
// ConfigReader.java
package com.framework.utils;

import java.io.FileInputStream;
import java.util.Properties;

public class ConfigReader {
    private static ConfigReader instance;
    private Properties properties;
    
    private ConfigReader() {
        loadProperties();
    }
    
    public static ConfigReader getInstance() {
        if (instance == null) {
            synchronized (ConfigReader.class) {
                if (instance == null) {
                    instance = new ConfigReader();
                }
            }
        }
        return instance;
    }
    
    private void loadProperties() {
        properties = new Properties();
        String env = System.getProperty("env", "qa");
        String configFile = "src/test/resources/config-" + env + ".properties";
        
        try (FileInputStream fis = new FileInputStream(configFile)) {
            properties.load(fis);
            System.out.println("✓ Loaded configuration for: " + env);
        } catch (Exception e) {
            System.out.println("Error loading config: " + e.getMessage());
        }
    }
    
    public String getProperty(String key) {
        return properties.getProperty(key);
    }
    
    public String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }
    
    public String getBrowser() {
        return getProperty("browser", "chrome");
    }
    
    public String getBaseUrl() {
        return getProperty("baseUrl");
    }
    
    public int getTimeout() {
        return Integer.parseInt(getProperty("timeout", "10"));
    }
}
```

```properties
# config-qa.properties
browser=chrome
baseUrl=https://qa.saucedemo.com
timeout=10
headless=false

# config-prod.properties
browser=chrome
baseUrl=https://www.saucedemo.com
timeout=15
headless=true
```
\```
```

## Day 38: Logging Framework

### Exercise 3: Integrate Log4j Logging

```exercise
title: Add Comprehensive Logging System
description: Implement Log4j for detailed test execution logging.
requirements:
- Add Log4j dependency
- Create log4j2.xml configuration
- Implement Logger wrapper
- Log at different levels
- Create separate log files
testcases:
- input: "Execute tests with logging"
  output: "Should create detailed log files"
hints:
- Use Log4j2 for better performance
- Configure console and file appenders
- Use appropriate log levels
- Include timestamps
- Rotate log files
solution:
```xml
<!-- log4j2.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
        
        <RollingFile name="File" fileName="logs/automation.log"
                     filePattern="logs/automation-%d{yyyy-MM-dd}-%i.log">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} [%t] %-5level %logger{36} - %msg%n"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="10MB"/>
            </Policies>
        </RollingFile>
    </Appenders>
    
    <Loggers>
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="File"/>
        </Root>
    </Loggers>
</Configuration>
```

```java
// LoggerUtil.java
package com.framework.utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LoggerUtil {
    private static final Logger logger = LogManager.getLogger(LoggerUtil.class);
    
    public static void info(String message) {
        logger.info(message);
    }
    
    public static void debug(String message) {
        logger.debug(message);
    }
    
    public static void error(String message) {
        logger.error(message);
    }
    
    public static void warn(String message) {
        logger.warn(message);
    }
}

// Usage in tests
public class LoginTest extends BaseTest {
    
    @Test
    public void testLogin() {
        LoggerUtil.info("Starting login test");
        LoginPage loginPage = new LoginPage(driver);
        
        LoggerUtil.debug("Entering credentials");
        loginPage.login("user", "pass");
        
        LoggerUtil.info("Login test completed");
    }
}
```
\```
```

## Day 39: Retry Mechanism

### Exercise 4: Implement Test Retry Logic

```exercise
title: Add Automatic Test Retry on Failure
description: Create retry analyzer to rerun failed tests automatically.
requirements:
- Implement IRetryAnalyzer
- Configure retry count
- Log retry attempts
- Update test results
- Add to TestNG
testcases:
- input: "Run flaky test"
  output: "Should retry on failure"
hints:
- Implement IRetryAnalyzer interface
- Track retry count
- Return true to retry
- Use @Test(retryAnalyzer)
- Log each attempt
solution:
```java
// RetryAnalyzer.java
package com.framework.listeners;

import org.testng.IRetryAnalyzer;
import org.testng.ITestResult;

public class RetryAnalyzer implements IRetryAnalyzer {
    private int retryCount = 0;
    private static final int MAX_RETRY = 2;
    
    @Override
    public boolean retry(ITestResult result) {
        if (retryCount < MAX_RETRY) {
            retryCount++;
            System.out.println("Retrying test: " + result.getName() + 
                " (Attempt " + (retryCount + 1) + ")");
            return true;
        }
        return false;
    }
}

// RetryListener.java
package com.framework.listeners;

import org.testng.IAnnotationTransformer;
import org.testng.annotations.ITestAnnotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

public class RetryListener implements IAnnotationTransformer {
    
    @Override
    public void transform(ITestAnnotation annotation, Class testClass,
                         Constructor testConstructor, Method testMethod) {
        annotation.setRetryAnalyzer(RetryAnalyzer.class);
    }
}

// Usage
@Listeners(RetryListener.class)
public class FlakyTest {
    private int attempt = 0;
    
    @Test
    public void testFlaky() {
        attempt++;
        System.out.println("Test attempt: " + attempt);
        
        // Simulate flaky test - fails first 2 times
        if (attempt < 3) {
            Assert.fail("Simulated failure");
        }
        
        Assert.assertTrue(true);
    }
}
```
\```
```

## Day 40: Database Integration

### Exercise 5: Connect to Database for Test Data

```exercise
title: Integrate Database Connectivity
description: Add JDBC connectivity to fetch test data from database.
requirements:
- Add JDBC driver dependency
- Create database connection utility
- Execute SQL queries
- Fetch test data
- Close connections properly
testcases:
- input: "Query database for test data"
  output: "Should retrieve and use data"
hints:
- Use try-with-resources
- Handle SQLException
- Use PreparedStatement
- Close ResultSet
- Pool connections
solution:
```java
// DatabaseUtil.java
package com.framework.utils;

import java.sql.*;
import java.util.*;

public class DatabaseUtil {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String USER = "root";
    private static final String PASS = "password";
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, USER, PASS);
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
                    row.put(metaData.getColumnName(i), rs.getString(i));
                }
                results.add(row);
            }
            
            System.out.println("✓ Retrieved " + results.size() + " rows");
            
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
        
        return results;
    }
    
    public static Object[][] getTestData(String query) {
        List<Map<String, String>> data = executeQuery(query);
        Object[][] testData = new Object[data.size()][];
        
        for (int i = 0; i < data.size(); i++) {
            Map<String, String> row = data.get(i);
            testData[i] = row.values().toArray();
        }
        
        return testData;
    }
}

// Usage in test
public class DatabaseTest {
    
    @DataProvider(name = "dbData")
    public Object[][] getDataFromDB() {
        String query = "SELECT username, password FROM users WHERE active = 1";
        return DatabaseUtil.getTestData(query);
    }
    
    @Test(dataProvider = "dbData")
    public void testWithDBData(String username, String password) {
        System.out.println("Testing with: " + username);
        // Use data in test
    }
}
```
\```
```

## Day 41: API Integration

### Exercise 6: Integrate REST API Testing

```exercise
title: Add REST API Testing Capability
description: Integrate REST Assured for API testing alongside UI tests.
requirements:
- Add REST Assured dependency
- Create API utility class
- Send GET/POST requests
- Validate responses
- Combine with UI tests
testcases:
- input: "Execute API and UI tests"
  output: "Should test both layers"
hints:
- Use REST Assured library
- Set base URI
- Use given-when-then syntax
- Validate status codes
- Extract response data
solution:
```java
// APIUtil.java
package com.framework.utils;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import static io.restassured.RestAssured.*;

public class APIUtil {
    
    static {
        RestAssured.baseURI = "https://reqres.in/api";
    }
    
    public static Response get(String endpoint) {
        return given()
                .header("Content-Type", "application/json")
                .when()
                .get(endpoint)
                .then()
                .extract().response();
    }
    
    public static Response post(String endpoint, String body) {
        return given()
                .header("Content-Type", "application/json")
                .body(body)
                .when()
                .post(endpoint)
                .then()
                .extract().response();
    }
}

// APITest.java
import org.testng.Assert;
import org.testng.annotations.Test;
import io.restassured.response.Response;

public class APITest {
    
    @Test
    public void testGetUser() {
        Response response = APIUtil.get("/users/2");
        
        Assert.assertEquals(response.getStatusCode(), 200);
        Assert.assertTrue(response.getBody().asString().contains("Janet"));
        
        System.out.println("✓ API test passed");
    }
    
    @Test
    public void testCreateUser() {
        String body = "{\"name\": \"John\", \"job\": \"QA\"}";
        Response response = APIUtil.post("/users", body);
        
        Assert.assertEquals(response.getStatusCode(), 201);
        System.out.println("✓ User created via API");
    }
}
```
\```
```

## Day 42: CI/CD Integration

### Exercise 7: Configure Jenkins Integration

```exercise
title: Set Up CI/CD Pipeline
description: Configure framework to run in Jenkins CI/CD pipeline.
requirements:
- Create Jenkinsfile
- Configure Maven goals
- Set up test execution
- Archive test reports
- Send notifications
testcases:
- input: "Run tests in Jenkins"
  output: "Should execute and report results"
hints:
- Use declarative pipeline
- Configure Maven in Jenkins
- Archive artifacts
- Publish test results
- Use post actions
solution:
```groovy
// Jenkinsfile
pipeline {
    agent any
    
    tools {
        maven 'Maven 3.8.1'
        jdk 'JDK 11'
    }
    
    parameters {
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Browser')
        choice(name: 'ENV', choices: ['qa', 'staging', 'prod'], description: 'Environment')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/selenium-framework.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh "mvn test -Dbrowser=${params.BROWSER} -Denv=${params.ENV}"
            }
        }
    }
    
    post {
        always {
            publishHTML([
                reportDir: 'test-output',
                reportFiles: 'ExtentReport.html',
                reportName: 'Test Report'
            ])
            
            archiveArtifacts artifacts: 'test-output/**/*', allowEmptyArchive: true
        }
        
        success {
            echo 'Tests passed successfully!'
        }
        
        failure {
            echo 'Tests failed!'
        }
    }
}
```

```xml
<!-- pom.xml - Maven configuration -->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.22.2</version>
            <configuration>
                <suiteXmlFiles>
                    <suiteXmlFile>testng.xml</suiteXmlFile>
                </suiteXmlFiles>
                <systemPropertyVariables>
                    <browser>${browser}</browser>
                    <env>${env}</env>
                </systemPropertyVariables>
            </configuration>
        </plugin>
    </plugins>
</build>
```
\```
```

---

## Summary

Congratulations! You've completed Week 6 of Framework Building. You've learned:

### Day 36: Framework Architecture
- ✅ Package structure design
- ✅ Separation of concerns
- ✅ Factory patterns
- ✅ Constants and enums

### Day 37: Configuration Management
- ✅ Properties file handling
- ✅ Multi-environment support
- ✅ Singleton pattern
- ✅ Configuration utilities

### Day 38: Logging Framework
- ✅ Log4j2 integration
- ✅ Multiple appenders
- ✅ Log levels
- ✅ Log rotation

### Day 39: Retry Mechanism
- ✅ IRetryAnalyzer implementation
- ✅ Automatic retry logic
- ✅ Flaky test handling
- ✅ Retry configuration

### Day 40: Database Integration
- ✅ JDBC connectivity
- ✅ SQL query execution
- ✅ Test data from DB
- ✅ Connection management

### Day 41: API Integration
- ✅ REST Assured setup
- ✅ API testing
- ✅ Response validation
- ✅ UI + API testing

### Day 42: CI/CD Integration
- ✅ Jenkins pipeline
- ✅ Maven configuration
- ✅ Report publishing
- ✅ Automated execution

### Next Steps
- Deploy framework to CI/CD
- Move on to Week 7 for advanced project
- Practice with real applications
- Optimize framework performance

**Framework Complete! 🚀**