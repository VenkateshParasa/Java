# Day 7: Basic Test Framework Setup & Week 1 Review

## Table of Contents
1. [Introduction](#introduction)
2. [Learning Objectives](#learning-objectives)
3. [Why Framework Structure Matters](#why-framework-structure-matters)
4. [Setting Up Project Structure](#setting-up-project-structure)
5. [Introduction to TestNG](#introduction-to-testng)
6. [Creating Your First Test Class](#creating-your-first-test-class)
7. [Running Tests with TestNG](#running-tests-with-testng)
8. [Basic Utility Classes](#basic-utility-classes)
9. [Week 1 Review Summary](#week-1-review-summary)
10. [Week 1 Key Concepts Recap](#week-1-key-concepts-recap)
11. [Preparing for Week 2](#preparing-for-week-2)
12. [Practice Exercises](#practice-exercises)
13. [Week 1 Comprehensive Interview Questions](#week-1-comprehensive-interview-questions)
14. [Key Takeaways](#key-takeaways)

---

## Introduction

Welcome to Day 7, the final day of Week 1! Today, we'll bring together everything you've learned this week by setting up a proper test automation framework structure. We'll introduce TestNG, one of the most popular testing frameworks for Java, and review all the key concepts from Week 1.

A well-structured framework is the foundation of maintainable, scalable test automation. Without proper structure, tests become difficult to manage, reuse, and maintain. Today, you'll learn how to organize your Selenium tests professionally from the start.

---

## Learning Objectives

By the end of this lesson, you will be able to:

- Understand the importance of a proper test automation framework structure
- Set up a Maven project with all necessary dependencies
- Configure TestNG annotations and understand their execution order
- Create reusable test classes with setup and teardown methods
- Implement basic utility classes for browser management
- Run tests using TestNG from IDE and Maven
- Review and consolidate all Week 1 concepts
- Apply best practices in test automation from day one

---

## Why Framework Structure Matters

### The Problem with Unstructured Tests

When you first start learning Selenium, you might write all your code in a single class with a main method. This approach has several problems:

**Problems:**
1. **Code Duplication**: Browser setup code repeated in every test
2. **No Test Management**: No way to run tests selectively or in groups
3. **Poor Maintainability**: Changes require updating multiple places
4. **No Reporting**: Difficult to track test results
5. **Hard to Scale**: Adding more tests becomes increasingly difficult
6. **No Reusability**: Common operations written multiple times

### Benefits of a Proper Framework

A well-structured framework provides:

1. **Reusability**: Write once, use everywhere
2. **Maintainability**: Easy to update and modify
3. **Scalability**: Simple to add new tests
4. **Reporting**: Built-in test reports and logs
5. **Test Management**: Run specific tests, groups, or suites
6. **Parallel Execution**: Run tests concurrently
7. **Configuration Management**: Centralized settings
8. **Team Collaboration**: Clear structure for team members

### Framework Components

A basic test automation framework consists of:

1. **Project Structure**: Organized directories for tests, utilities, and resources
2. **Testing Framework**: TestNG or JUnit for test management
3. **Build Tool**: Maven or Gradle for dependency management
4. **Utility Classes**: Common methods and helper functions
5. **Test Classes**: Actual test cases
6. **Configuration Files**: Settings and test suites
7. **Reports**: Test execution results

---

## Setting Up Project Structure

### Step 1: Create a Maven Project

Maven is a powerful build automation and dependency management tool for Java projects.

**Using IDE (Eclipse/IntelliJ):**

**Eclipse:**
1. File → New → Maven Project
2. Check "Create a simple project"
3. Click Next
4. Enter Group Id: `com.automation`
5. Enter Artifact Id: `selenium-framework`
6. Click Finish

**IntelliJ IDEA:**
1. File → New → Project
2. Select Maven
3. Enter Name: `selenium-framework`
4. Enter Group Id: `com.automation`
5. Enter Artifact Id: `selenium-framework`
6. Click Create

**Using Command Line:**

```bash
mvn archetype:generate \
  -DgroupId=com.automation \
  -DartifactId=selenium-framework \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

### Step 2: Understanding Project Structure

A standard Maven project has this structure:

```
selenium-framework/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── automation/
│   │   │           ├── base/
│   │   │           │   └── BaseTest.java
│   │   │           ├── utils/
│   │   │           │   ├── BrowserFactory.java
│   │   │           │   └── TestUtils.java
│   │   │           └── config/
│   │   │               └── ConfigReader.java
│   │   └── resources/
│   │       └── config.properties
│   │
│   └── test/
│       ├── java/
│       │   └── com/
│       │       └── automation/
│       │           └── tests/
│       │               ├── LoginTests.java
│       │               ├── HomePageTests.java
│       │               └── FormTests.java
│       └── resources/
│           ├── testng.xml
│           └── test-data.properties
│
├── pom.xml
├── testng.xml
└── README.md
```

**Directory Explanation:**

- **src/main/java**: Contains framework code, utilities, and base classes
- **src/main/resources**: Contains configuration files, property files
- **src/test/java**: Contains actual test classes
- **src/test/resources**: Contains test-specific resources (testng.xml, test data)
- **pom.xml**: Maven configuration file with dependencies
- **testng.xml**: TestNG suite configuration

### Step 3: Configure pom.xml

The `pom.xml` file defines project dependencies and build configuration.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Project Information -->
    <groupId>com.automation</groupId>
    <artifactId>selenium-framework</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>Selenium Test Automation Framework</name>
    <description>A comprehensive Selenium test automation framework</description>

    <!-- Properties -->
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <selenium.version>4.16.1</selenium.version>
        <testng.version>7.8.0</testng.version>
        <webdrivermanager.version>5.6.2</webdrivermanager.version>
    </properties>

    <!-- Dependencies -->
    <dependencies>
        <!-- Selenium Java -->
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
            <scope>test</scope>
        </dependency>

        <!-- WebDriverManager -->
        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>${webdrivermanager.version}</version>
        </dependency>

        <!-- Apache Commons IO (for file operations) -->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.15.1</version>
        </dependency>

        <!-- Apache POI (for Excel operations - optional for now) -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.2.5</version>
        </dependency>

        <!-- ExtentReports (for reporting - optional for now) -->
        <dependency>
            <groupId>com.aventstack</groupId>
            <artifactId>extentreports</artifactId>
            <version>5.1.1</version>
        </dependency>

        <!-- Log4j (for logging) -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.22.0</version>
        </dependency>
    </dependencies>

    <!-- Build Configuration -->
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

            <!-- Maven Surefire Plugin (for running tests) -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.2.2</version>
                <configuration>
                    <suiteXmlFiles>
                        <suiteXmlFile>testng.xml</suiteXmlFile>
                    </suiteXmlFiles>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

**Key Sections Explained:**

1. **Properties**: Define versions centrally for easy updates
2. **Dependencies**: External libraries your project needs
3. **Build Plugins**: Tools for compiling and running tests

**After creating pom.xml:**
- Right-click project → Maven → Update Project (Eclipse)
- Click the Maven reload icon (IntelliJ)
- Or run: `mvn clean install`

### Step 4: Create Package Structure

Create the following packages in `src/main/java`:

```java
com.automation.base       // Base classes
com.automation.utils      // Utility classes
com.automation.config     // Configuration management
```

Create the following packages in `src/test/java`:

```java
com.automation.tests      // Test classes
```

---

## Introduction to TestNG

TestNG (Test Next Generation) is a testing framework inspired by JUnit and NUnit, designed to be more powerful and easier to use.

### Why TestNG?

**Advantages over JUnit:**
1. More annotations and flexibility
2. Parallel test execution
3. Grouping of test methods
4. Parameterization support
5. Data providers for data-driven testing
6. Better reporting
7. Test configuration flexibility
8. Dependencies between test methods

### TestNG Annotations

TestNG provides various annotations to control test execution flow:

#### Basic Annotations

```java
package com.automation.tests;

import org.testng.annotations.*;

public class TestNGAnnotationsDemo {

    // Runs once before any test in the suite
    @BeforeSuite
    public void beforeSuite() {
        System.out.println("@BeforeSuite - Runs once before all tests in suite");
        // Setup database connections, read global config, etc.
    }

    // Runs once before any test in this class
    @BeforeClass
    public void beforeClass() {
        System.out.println("@BeforeClass - Runs once before all tests in class");
        // Initialize WebDriver, load test data, etc.
    }

    // Runs before each test method
    @BeforeMethod
    public void beforeMethod() {
        System.out.println("@BeforeMethod - Runs before each test method");
        // Navigate to starting page, clear cookies, etc.
    }

    // Test method 1
    @Test(priority = 1)
    public void testOne() {
        System.out.println("@Test - Test Method 1");
        // Actual test code
    }

    // Test method 2
    @Test(priority = 2)
    public void testTwo() {
        System.out.println("@Test - Test Method 2");
        // Actual test code
    }

    // Runs after each test method
    @AfterMethod
    public void afterMethod() {
        System.out.println("@AfterMethod - Runs after each test method");
        // Take screenshot if test fails, clear data, etc.
    }

    // Runs once after all tests in this class
    @AfterClass
    public void afterClass() {
        System.out.println("@AfterClass - Runs once after all tests in class");
        // Quit WebDriver, cleanup resources, etc.
    }

    // Runs once after all tests in the suite
    @AfterSuite
    public void afterSuite() {
        System.out.println("@AfterSuite - Runs once after all tests in suite");
        // Close database connections, generate reports, etc.
    }
}
```

**Execution Output:**
```
@BeforeSuite - Runs once before all tests in suite
@BeforeClass - Runs once before all tests in class
@BeforeMethod - Runs before each test method
@Test - Test Method 1
@AfterMethod - Runs after each test method
@BeforeMethod - Runs before each test method
@Test - Test Method 2
@AfterMethod - Runs after each test method
@AfterClass - Runs once after all tests in class
@AfterSuite - Runs once after all tests in suite
```

#### Annotation Hierarchy

```
@BeforeSuite
    └── @BeforeTest
        └── @BeforeClass
            └── @BeforeMethod
                └── @Test
            └── @AfterMethod
        └── @AfterClass
    └── @AfterTest
└── @AfterSuite
```

### TestNG Annotation Attributes

```java
package com.automation.tests;

import org.testng.annotations.Test;

public class TestNGAttributesDemo {

    // Test with priority
    @Test(priority = 1)
    public void loginTest() {
        System.out.println("Login Test");
    }

    // Test with description
    @Test(priority = 2, description = "Verify user can add products to cart")
    public void addToCartTest() {
        System.out.println("Add to Cart Test");
    }

    // Test with groups
    @Test(groups = {"smoke", "regression"})
    public void smokeTest() {
        System.out.println("Smoke Test");
    }

    // Test with dependency
    @Test(dependsOnMethods = {"loginTest"})
    public void logoutTest() {
        System.out.println("Logout Test - Depends on loginTest");
    }

    // Test with timeout (in milliseconds)
    @Test(timeOut = 5000)
    public void timeoutTest() {
        System.out.println("Test with timeout");
    }

    // Test that is expected to fail
    @Test(expectedExceptions = ArithmeticException.class)
    public void exceptionTest() {
        System.out.println("Test expecting exception");
        int result = 10 / 0; // This will throw ArithmeticException
    }

    // Disabled test
    @Test(enabled = false)
    public void disabledTest() {
        System.out.println("This test is disabled");
    }

    // Test with invocation count (runs multiple times)
    @Test(invocationCount = 3)
    public void repeatedTest() {
        System.out.println("This test runs 3 times");
    }
}
```

### TestNG XML Configuration

The `testng.xml` file allows you to configure test execution:

**Basic testng.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Test Automation Suite">
    <test name="Smoke Tests">
        <classes>
            <class name="com.automation.tests.LoginTests"/>
            <class name="com.automation.tests.HomePageTests"/>
        </classes>
    </test>
</suite>
```

**Advanced testng.xml with groups:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Comprehensive Test Suite" verbose="1">

    <!-- Test 1: Smoke Tests -->
    <test name="Smoke Test Suite">
        <groups>
            <run>
                <include name="smoke"/>
            </run>
        </groups>
        <classes>
            <class name="com.automation.tests.LoginTests"/>
            <class name="com.automation.tests.HomePageTests"/>
        </classes>
    </test>

    <!-- Test 2: Regression Tests -->
    <test name="Regression Test Suite">
        <groups>
            <run>
                <include name="regression"/>
            </run>
        </groups>
        <packages>
            <package name="com.automation.tests.*"/>
        </packages>
    </test>

    <!-- Test 3: Specific Tests -->
    <test name="Login and Form Tests">
        <classes>
            <class name="com.automation.tests.LoginTests">
                <methods>
                    <include name="validLoginTest"/>
                    <include name="invalidLoginTest"/>
                </methods>
            </class>
        </classes>
    </test>
</suite>
```

**testng.xml with parameters:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Parameterized Test Suite">
    <parameter name="browser" value="chrome"/>
    <parameter name="baseUrl" value="https://example.com"/>

    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="com.automation.tests.LoginTests"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="com.automation.tests.LoginTests"/>
        </classes>
    </test>
</suite>
```

**Using parameters in test:**

```java
package com.automation.tests;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParameterizedTest {

    @Parameters({"browser", "baseUrl"})
    @Test
    public void testWithParameters(String browser, String url) {
        System.out.println("Browser: " + browser);
        System.out.println("URL: " + url);
    }
}
```

---

## Creating Your First Test Class

### Base Test Class

Create a base class that all test classes will extend:

**File: src/main/java/com/automation/base/BaseTest.java**

```java
package com.automation.base;

import com.automation.utils.BrowserFactory;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;

import java.time.Duration;

/**
 * Base class for all test classes
 * Contains common setup and teardown methods
 */
public class BaseTest {

    // ThreadLocal for parallel execution
    protected static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    /**
     * Get WebDriver instance
     */
    public static WebDriver getDriver() {
        return driver.get();
    }

    /**
     * Setup method - runs before each test
     * Initializes WebDriver and navigates to base URL
     */
    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(@Optional("chrome") String browser) {
        System.out.println("Setting up test in " + browser);

        // Initialize browser
        WebDriver webDriver = BrowserFactory.createDriver(browser);
        driver.set(webDriver);

        // Configure driver
        getDriver().manage().window().maximize();
        getDriver().manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        getDriver().manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));

        System.out.println("Browser launched successfully");
    }

    /**
     * Teardown method - runs after each test
     * Quits WebDriver instance
     */
    @AfterMethod
    public void tearDown() {
        System.out.println("Tearing down test");

        if (getDriver() != null) {
            getDriver().quit();
            driver.remove();
            System.out.println("Browser closed successfully");
        }
    }

    /**
     * Navigate to a specific URL
     */
    protected void navigateTo(String url) {
        System.out.println("Navigating to: " + url);
        getDriver().get(url);
    }

    /**
     * Get current page title
     */
    protected String getPageTitle() {
        return getDriver().getTitle();
    }

    /**
     * Get current page URL
     */
    protected String getCurrentUrl() {
        return getDriver().getCurrentUrl();
    }
}
```

### Sample Test Class

Create a test class that extends BaseTest:

**File: src/test/java/com/automation/tests/LoginTests.java**

```java
package com.automation.tests;

import com.automation.base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Test class for Login functionality
 */
public class LoginTests extends BaseTest {

    private static final String BASE_URL = "https://practicetestautomation.com/practice-test-login/";
    private static final String VALID_USERNAME = "student";
    private static final String VALID_PASSWORD = "Password123";

    /**
     * Test: Valid login with correct credentials
     */
    @Test(priority = 1, description = "Verify user can login with valid credentials",
          groups = {"smoke", "regression"})
    public void testValidLogin() {
        System.out.println("Starting testValidLogin");

        // Navigate to login page
        navigateTo(BASE_URL);

        // Enter username
        WebElement usernameField = getDriver().findElement(By.id("username"));
        usernameField.clear();
        usernameField.sendKeys(VALID_USERNAME);

        // Enter password
        WebElement passwordField = getDriver().findElement(By.id("password"));
        passwordField.clear();
        passwordField.sendKeys(VALID_PASSWORD);

        // Click submit button
        WebElement submitButton = getDriver().findElement(By.id("submit"));
        submitButton.click();

        // Verify successful login
        String currentUrl = getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("logged-in-successfully"),
                "Login was not successful");

        // Verify success message
        WebElement successMessage = getDriver().findElement(
                By.cssSelector(".post-title"));
        Assert.assertTrue(successMessage.isDisplayed(),
                "Success message is not displayed");

        String messageText = successMessage.getText();
        Assert.assertEquals(messageText, "Logged In Successfully",
                "Success message text does not match");

        System.out.println("testValidLogin completed successfully");
    }

    /**
     * Test: Invalid login with incorrect username
     */
    @Test(priority = 2, description = "Verify error message for invalid username",
          groups = {"regression"})
    public void testInvalidUsername() {
        System.out.println("Starting testInvalidUsername");

        // Navigate to login page
        navigateTo(BASE_URL);

        // Enter invalid username
        WebElement usernameField = getDriver().findElement(By.id("username"));
        usernameField.clear();
        usernameField.sendKeys("invaliduser");

        // Enter valid password
        WebElement passwordField = getDriver().findElement(By.id("password"));
        passwordField.clear();
        passwordField.sendKeys(VALID_PASSWORD);

        // Click submit button
        WebElement submitButton = getDriver().findElement(By.id("submit"));
        submitButton.click();

        // Verify error message
        WebElement errorMessage = getDriver().findElement(By.id("error"));
        Assert.assertTrue(errorMessage.isDisplayed(),
                "Error message is not displayed");

        String errorText = errorMessage.getText();
        Assert.assertTrue(errorText.contains("Your username is invalid"),
                "Error message does not contain expected text");

        System.out.println("testInvalidUsername completed successfully");
    }

    /**
     * Test: Invalid login with incorrect password
     */
    @Test(priority = 3, description = "Verify error message for invalid password",
          groups = {"regression"})
    public void testInvalidPassword() {
        System.out.println("Starting testInvalidPassword");

        // Navigate to login page
        navigateTo(BASE_URL);

        // Enter valid username
        WebElement usernameField = getDriver().findElement(By.id("username"));
        usernameField.clear();
        usernameField.sendKeys(VALID_USERNAME);

        // Enter invalid password
        WebElement passwordField = getDriver().findElement(By.id("password"));
        passwordField.clear();
        passwordField.sendKeys("wrongpassword");

        // Click submit button
        WebElement submitButton = getDriver().findElement(By.id("submit"));
        submitButton.click();

        // Verify error message
        WebElement errorMessage = getDriver().findElement(By.id("error"));
        Assert.assertTrue(errorMessage.isDisplayed(),
                "Error message is not displayed");

        String errorText = errorMessage.getText();
        Assert.assertTrue(errorText.contains("Your password is invalid"),
                "Error message does not contain expected text");

        System.out.println("testInvalidPassword completed successfully");
    }

    /**
     * Test: Login with empty credentials
     */
    @Test(priority = 4, description = "Verify behavior when login fields are empty")
    public void testEmptyCredentials() {
        System.out.println("Starting testEmptyCredentials");

        // Navigate to login page
        navigateTo(BASE_URL);

        // Click submit without entering credentials
        WebElement submitButton = getDriver().findElement(By.id("submit"));
        submitButton.click();

        // Verify error message (site-specific behavior may vary)
        WebElement errorMessage = getDriver().findElement(By.id("error"));
        Assert.assertTrue(errorMessage.isDisplayed(),
                "Error message is not displayed for empty credentials");

        System.out.println("testEmptyCredentials completed successfully");
    }
}
```

### Another Test Class Example

**File: src/test/java/com/automation/tests/FormTests.java**

```java
package com.automation.tests;

import com.automation.base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Test class for Form functionality
 */
public class FormTests extends BaseTest {

    private static final String FORM_URL = "https://www.selenium.dev/selenium/web/web-form.html";

    /**
     * Test: Fill and submit a simple form
     */
    @Test(priority = 1, description = "Verify form can be filled and submitted",
          groups = {"smoke", "regression"})
    public void testFormSubmission() {
        System.out.println("Starting testFormSubmission");

        // Navigate to form page
        navigateTo(FORM_URL);

        // Verify page title
        String pageTitle = getPageTitle();
        Assert.assertEquals(pageTitle, "Web form", "Page title does not match");

        // Fill text input
        WebElement textInput = getDriver().findElement(By.id("my-text-id"));
        textInput.sendKeys("Test Automation");

        // Fill password
        WebElement passwordInput = getDriver().findElement(
                By.name("my-password"));
        passwordInput.sendKeys("SecurePassword123");

        // Fill textarea
        WebElement textarea = getDriver().findElement(
                By.name("my-textarea"));
        textarea.sendKeys("This is a test message for automation testing");

        // Select from dropdown
        WebElement dropdown = getDriver().findElement(
                By.name("my-select"));
        Select select = new Select(dropdown);
        select.selectByVisibleText("Two");

        // Click checkbox
        WebElement checkbox = getDriver().findElement(
                By.id("my-check-1"));
        if (!checkbox.isSelected()) {
            checkbox.click();
        }

        // Select radio button
        WebElement radioButton = getDriver().findElement(
                By.id("my-radio-2"));
        radioButton.click();

        // Submit form
        WebElement submitButton = getDriver().findElement(
                By.cssSelector("button[type='submit']"));
        submitButton.click();

        // Verify submission (check URL or success message)
        String currentUrl = getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("submitted"),
                "Form was not submitted successfully");

        System.out.println("testFormSubmission completed successfully");
    }

    /**
     * Test: Verify required field validation
     */
    @Test(priority = 2, description = "Verify required fields cannot be empty")
    public void testRequiredFieldValidation() {
        System.out.println("Starting testRequiredFieldValidation");

        // Navigate to form page
        navigateTo(FORM_URL);

        // Try to submit form without filling required fields
        WebElement submitButton = getDriver().findElement(
                By.cssSelector("button[type='submit']"));
        submitButton.click();

        // Verify validation message (HTML5 validation)
        WebElement textInput = getDriver().findElement(By.id("my-text-id"));
        String validationMessage = textInput.getAttribute("validationMessage");

        // Note: Validation behavior depends on the specific form
        System.out.println("Validation message: " + validationMessage);

        System.out.println("testRequiredFieldValidation completed");
    }
}
```

---

## Running Tests with TestNG

### Running from IDE

#### Eclipse:
1. **Run Single Test Method:**
   - Right-click on test method → Run As → TestNG Test

2. **Run Entire Test Class:**
   - Right-click on test class → Run As → TestNG Test

3. **Run Test Suite (testng.xml):**
   - Right-click on testng.xml → Run As → TestNG Suite

#### IntelliJ IDEA:
1. **Run Single Test Method:**
   - Click green arrow next to test method → Run

2. **Run Entire Test Class:**
   - Click green arrow next to class name → Run

3. **Run Test Suite (testng.xml):**
   - Right-click on testng.xml → Run

### Running from Maven

**Run all tests:**
```bash
mvn clean test
```

**Run specific test class:**
```bash
mvn clean test -Dtest=LoginTests
```

**Run specific test method:**
```bash
mvn clean test -Dtest=LoginTests#testValidLogin
```

**Run with specific testng.xml:**
```bash
mvn clean test -DsuiteXmlFile=testng.xml
```

**Run with parameters:**
```bash
mvn clean test -Dbrowser=firefox
```

**Run with groups:**
```bash
mvn clean test -Dgroups=smoke
```

### Understanding Test Reports

#### TestNG Default Reports

After running tests, TestNG generates reports in `test-output` folder:

1. **index.html**: Main report page
2. **emailable-report.html**: Simplified HTML report
3. **testng-results.xml**: XML format results

**Report Contents:**
- Total tests run
- Passed tests count
- Failed tests count
- Skipped tests count
- Execution time
- Test method details
- Exception stack traces

**Opening Reports:**
Navigate to `test-output` folder and open `index.html` in browser.

#### Customizing Reports

**Generate reports after test run:**

```java
package com.automation.utils;

import org.testng.TestNG;
import java.util.ArrayList;
import java.util.List;

public class TestRunner {
    public static void main(String[] args) {
        TestNG testng = new TestNG();

        List<String> suites = new ArrayList<>();
        suites.add("testng.xml");
        testng.setTestSuites(suites);

        testng.setOutputDirectory("test-output");
        testng.run();
    }
}
```

---

## Basic Utility Classes

### Browser Factory

Create a utility class to manage browser instances:

**File: src/main/java/com/automation/utils/BrowserFactory.java**

```java
package com.automation.utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

/**
 * Factory class for creating WebDriver instances
 */
public class BrowserFactory {

    /**
     * Create WebDriver instance based on browser name
     *
     * @param browserName Name of the browser (chrome, firefox, edge)
     * @return WebDriver instance
     */
    public static WebDriver createDriver(String browserName) {
        WebDriver driver = null;

        switch (browserName.toLowerCase()) {
            case "chrome":
                driver = createChromeDriver();
                break;

            case "firefox":
                driver = createFirefoxDriver();
                break;

            case "edge":
                driver = createEdgeDriver();
                break;

            case "chrome-headless":
                driver = createChromeDriverHeadless();
                break;

            default:
                System.out.println("Browser not supported. Launching Chrome by default.");
                driver = createChromeDriver();
        }

        return driver;
    }

    /**
     * Create Chrome WebDriver
     */
    private static WebDriver createChromeDriver() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-notifications");
        options.addArguments("--disable-popup-blocking");

        return new ChromeDriver(options);
    }

    /**
     * Create Chrome WebDriver in headless mode
     */
    private static WebDriver createChromeDriverHeadless() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");

        return new ChromeDriver(options);
    }

    /**
     * Create Firefox WebDriver
     */
    private static WebDriver createFirefoxDriver() {
        WebDriverManager.firefoxdriver().setup();
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--start-maximized");

        return new FirefoxDriver(options);
    }

    /**
     * Create Edge WebDriver
     */
    private static WebDriver createEdgeDriver() {
        WebDriverManager.edgedriver().setup();
        EdgeOptions options = new EdgeOptions();
        options.addArguments("--start-maximized");

        return new EdgeDriver(options);
    }
}
```

### Test Utilities

Create common utility methods:

**File: src/main/java/com/automation/utils/TestUtils.java**

```java
package com.automation.utils;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;

/**
 * Common utility methods for test automation
 */
public class TestUtils {

    /**
     * Take screenshot and save to file
     *
     * @param driver WebDriver instance
     * @param fileName Name of the screenshot file
     * @return Path to saved screenshot
     */
    public static String takeScreenshot(WebDriver driver, String fileName) {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String screenshotName = fileName + "_" + timestamp + ".png";

        try {
            // Take screenshot
            TakesScreenshot ts = (TakesScreenshot) driver;
            File source = ts.getScreenshotAs(OutputType.FILE);

            // Save screenshot
            String destination = System.getProperty("user.dir") +
                    "/screenshots/" + screenshotName;
            File finalDestination = new File(destination);
            FileUtils.copyFile(source, finalDestination);

            System.out.println("Screenshot saved: " + destination);
            return destination;

        } catch (IOException e) {
            System.out.println("Failed to take screenshot: " + e.getMessage());
            return null;
        }
    }

    /**
     * Wait for element to be visible
     *
     * @param driver WebDriver instance
     * @param locator Element locator
     * @param timeoutInSeconds Maximum wait time
     * @return WebElement if found
     */
    public static WebElement waitForElementVisible(WebDriver driver,
            By locator, int timeoutInSeconds) {
        WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutInSeconds));
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    /**
     * Wait for element to be clickable
     *
     * @param driver WebDriver instance
     * @param locator Element locator
     * @param timeoutInSeconds Maximum wait time
     * @return WebElement if found
     */
    public static WebElement waitForElementClickable(WebDriver driver,
            By locator, int timeoutInSeconds) {
        WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutInSeconds));
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    /**
     * Wait for page title to contain specific text
     *
     * @param driver WebDriver instance
     * @param titleText Expected title text
     * @param timeoutInSeconds Maximum wait time
     * @return true if title contains text
     */
    public static boolean waitForTitleContains(WebDriver driver,
            String titleText, int timeoutInSeconds) {
        WebDriverWait wait = new WebDriverWait(driver,
                Duration.ofSeconds(timeoutInSeconds));
        return wait.until(ExpectedConditions.titleContains(titleText));
    }

    /**
     * Scroll to element
     *
     * @param driver WebDriver instance
     * @param element Element to scroll to
     */
    public static void scrollToElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    /**
     * Click element using JavaScript
     *
     * @param driver WebDriver instance
     * @param element Element to click
     */
    public static void jsClick(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", element);
    }

    /**
     * Highlight element (for debugging)
     *
     * @param driver WebDriver instance
     * @param element Element to highlight
     */
    public static void highlightElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        String originalStyle = element.getAttribute("style");

        js.executeScript(
                "arguments[0].setAttribute('style', 'border: 3px solid red;')",
                element);

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        js.executeScript(
                "arguments[0].setAttribute('style', '" + originalStyle + "')",
                element);
    }

    /**
     * Get current timestamp as string
     *
     * @return Formatted timestamp
     */
    public static String getTimestamp() {
        return new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
    }

    /**
     * Sleep/Wait for specified milliseconds
     *
     * @param milliseconds Time to sleep
     */
    public static void sleep(long milliseconds) {
        try {
            Thread.sleep(milliseconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

### Configuration Reader (Optional)

**File: src/main/resources/config.properties**

```properties
# Browser Configuration
browser=chrome
headless=false

# URL Configuration
baseUrl=https://practicetestautomation.com
loginUrl=https://practicetestautomation.com/practice-test-login/

# Timeout Configuration
implicitWait=10
explicitWait=20
pageLoadTimeout=30

# Test Data
validUsername=student
validPassword=Password123

# Screenshot Configuration
takeScreenshotOnFailure=true
screenshotLocation=screenshots/
```

**File: src/main/java/com/automation/config/ConfigReader.java**

```java
package com.automation.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * Configuration reader utility
 */
public class ConfigReader {

    private static Properties properties;
    private static final String CONFIG_FILE = "src/main/resources/config.properties";

    static {
        try {
            FileInputStream fis = new FileInputStream(CONFIG_FILE);
            properties = new Properties();
            properties.load(fis);
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load configuration file");
        }
    }

    /**
     * Get property value
     *
     * @param key Property key
     * @return Property value
     */
    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    /**
     * Get browser name
     */
    public static String getBrowser() {
        return getProperty("browser");
    }

    /**
     * Get base URL
     */
    public static String getBaseUrl() {
        return getProperty("baseUrl");
    }

    /**
     * Get implicit wait timeout
     */
    public static int getImplicitWait() {
        return Integer.parseInt(getProperty("implicitWait"));
    }

    /**
     * Get explicit wait timeout
     */
    public static int getExplicitWait() {
        return Integer.parseInt(getProperty("explicitWait"));
    }
}
```

---

## Week 1 Review Summary

Let's review everything we've covered in Week 1:

### Day 1: Introduction to Selenium

**Key Topics:**
- What is Selenium and why use it
- Selenium components (WebDriver, IDE, Grid)
- Setting up Java and Maven
- First Selenium script
- WebDriver basics

**Key Code:**
```java
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();
driver.get("https://www.example.com");
System.out.println(driver.getTitle());
driver.quit();
```

**Key Takeaways:**
- Selenium WebDriver automates browser interactions
- WebDriverManager simplifies driver management
- Always quit the driver after use
- Maven manages project dependencies

---

### Day 2: Locators

**Key Topics:**
- 8 types of locators in Selenium
- When to use each locator
- Best practices for locators
- Creating custom locators

**Locator Types:**
1. **ID**: `By.id("elementId")`
2. **Name**: `By.name("elementName")`
3. **Class Name**: `By.className("className")`
4. **Tag Name**: `By.tagName("tagName")`
5. **Link Text**: `By.linkText("Link Text")`
6. **Partial Link Text**: `By.partialLinkText("Partial")`
7. **CSS Selector**: `By.cssSelector("css selector")`
8. **XPath**: `By.xpath("//xpath/expression")`

**Locator Priority:**
1. ID (fastest and most reliable)
2. Name
3. CSS Selector
4. XPath (slowest but most flexible)

**Key Code Examples:**
```java
// CSS Selector patterns
By.cssSelector("input[type='email']")
By.cssSelector(".class-name")
By.cssSelector("#id-name")

// XPath patterns
By.xpath("//input[@id='email']")
By.xpath("//div[@class='container']//button")
By.xpath("//a[contains(text(),'Login')]")
```

---

### Day 3: WebDriver Commands

**Key Topics:**
- Browser commands
- Navigation commands
- WebDriver methods
- Window handling
- Browser information

**Browser Commands:**
```java
driver.get("url");                    // Navigate to URL
driver.getTitle();                    // Get page title
driver.getCurrentUrl();               // Get current URL
driver.getPageSource();               // Get page HTML
driver.close();                       // Close current window
driver.quit();                        // Close all windows
```

**Navigation Commands:**
```java
driver.navigate().to("url");         // Navigate to URL
driver.navigate().back();            // Go back
driver.navigate().forward();         // Go forward
driver.navigate().refresh();         // Refresh page
```

**Window Management:**
```java
driver.manage().window().maximize();  // Maximize window
driver.manage().window().minimize();  // Minimize window
driver.manage().window().fullscreen(); // Fullscreen mode
```

---

### Day 4: Web Elements

**Key Topics:**
- Finding elements
- Element interactions
- Element properties
- Working with different element types

**Finding Elements:**
```java
WebElement element = driver.findElement(By.id("id"));
List<WebElement> elements = driver.findElements(By.className("class"));
```

**Element Interactions:**
```java
element.click();                     // Click element
element.sendKeys("text");           // Enter text
element.clear();                    // Clear text
element.submit();                   // Submit form
```

**Element Properties:**
```java
element.getText();                  // Get visible text
element.getAttribute("attr");       // Get attribute value
element.isDisplayed();              // Check if visible
element.isEnabled();                // Check if enabled
element.isSelected();               // Check if selected
element.getTagName();               // Get tag name
element.getCssValue("property");    // Get CSS value
```

---

### Day 5: Waits

**Key Topics:**
- Implicit waits
- Explicit waits
- Fluent waits
- Expected conditions
- Custom wait conditions

**Implicit Wait:**
```java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

**Explicit Wait:**
```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("id"))
);
```

**Common Expected Conditions:**
- `visibilityOfElementLocated()`
- `elementToBeClickable()`
- `presenceOfElementLocated()`
- `titleContains()`
- `alertIsPresent()`

**Fluent Wait:**
```java
Wait<WebDriver> wait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofSeconds(2))
    .ignoring(NoSuchElementException.class);
```

**Best Practices:**
- Use explicit waits over implicit waits
- Don't combine implicit and explicit waits
- Use appropriate expected conditions
- Set reasonable timeout values

---

### Day 6: Dropdowns, Alerts, Frames

**Key Topics:**
- Select class for dropdowns
- Handling JavaScript alerts
- Working with frames/iframes
- Multiple window handling

**Dropdowns:**
```java
Select select = new Select(driver.findElement(By.id("dropdown")));
select.selectByVisibleText("Text");
select.selectByValue("value");
select.selectByIndex(2);
select.deselectAll();
```

**Alerts:**
```java
Alert alert = driver.switchTo().alert();
alert.getText();        // Get alert text
alert.accept();         // Click OK
alert.dismiss();        // Click Cancel
alert.sendKeys("text"); // Enter text in prompt
```

**Frames:**
```java
driver.switchTo().frame("frameName");           // By name
driver.switchTo().frame(0);                     // By index
driver.switchTo().frame(frameElement);          // By element
driver.switchTo().defaultContent();             // Back to main page
driver.switchTo().parentFrame();                // To parent frame
```

**Multiple Windows:**
```java
String mainWindow = driver.getWindowHandle();
Set<String> allWindows = driver.getWindowHandles();

for (String window : allWindows) {
    driver.switchTo().window(window);
    // Perform actions
}

driver.switchTo().window(mainWindow); // Switch back
```

---

## Week 1 Key Concepts Recap

### Core Concepts Mastered

1. **Selenium Architecture**
   - Understanding WebDriver interface
   - Browser-specific driver implementations
   - Client-server architecture

2. **Locator Strategies**
   - 8 locator types
   - Locator selection criteria
   - CSS vs XPath trade-offs

3. **WebDriver API**
   - Browser commands
   - Navigation methods
   - Window management
   - Timeouts configuration

4. **Element Interactions**
   - Finding single/multiple elements
   - Common element operations
   - Element state verification

5. **Synchronization**
   - Why waits are necessary
   - Different types of waits
   - Expected conditions
   - Custom wait logic

6. **Advanced Interactions**
   - Dropdown handling with Select class
   - Alert/popup management
   - Frame switching
   - Multiple window handling

7. **Framework Fundamentals**
   - Maven project structure
   - TestNG basics
   - Test organization
   - Reusable utilities

### Common Pitfalls to Avoid

1. **Not Using Waits:**
   - Always use appropriate waits
   - Don't rely on Thread.sleep()

2. **Poor Locator Choices:**
   - Avoid brittle locators
   - Use stable attributes
   - Don't use absolute XPaths

3. **Not Closing Browser:**
   - Always call driver.quit()
   - Use try-finally blocks

4. **Mixing Wait Types:**
   - Don't mix implicit and explicit waits
   - Be consistent in approach

5. **Ignoring Exceptions:**
   - Handle NoSuchElementException
   - Handle TimeoutException
   - Provide meaningful error messages

6. **Not Maximizing Browser:**
   - Elements may be hidden in small windows
   - Always maximize for consistency

7. **Forgetting to Switch Context:**
   - Switch to frames before accessing elements
   - Switch back to default content
   - Switch to appropriate windows

---

## Preparing for Week 2

### What's Coming Next

**Week 2 Overview: Intermediate Selenium Concepts**

**Day 8: Actions Class & Keyboard/Mouse Events**
- Advanced user interactions
- Drag and drop
- Mouse hover actions
- Keyboard combinations

**Day 9: JavaScript Executor**
- Executing JavaScript code
- Scrolling operations
- Element manipulation
- Handling hidden elements

**Day 10: File Upload & Download**
- Uploading files using sendKeys()
- Using Robot class
- Handling download dialogs
- Verifying downloaded files

**Day 11: Screenshots & Logging**
- Taking screenshots
- Screenshot on failure
- Logging framework setup
- Log4j configuration

**Day 12: Data-Driven Testing Basics**
- Reading data from Excel
- Apache POI library
- Parameterizing tests
- Test data management

**Day 13: Page Object Model (POM) Introduction**
- What is POM
- Creating page classes
- Page Factory
- Benefits of POM

**Day 14: Practice & Week 2 Review**
- Complete project setup
- Implementing learned concepts
- Week 2 review

### Preparation Tasks

**Before Week 2:**

1. **Practice Week 1 Concepts:**
   - Write 5 test scripts from scratch
   - Use all 8 locator types
   - Implement waits in every script
   - Handle alerts, frames, and windows

2. **Set Up Your Framework:**
   - Create Maven project
   - Add all dependencies
   - Set up project structure
   - Create base classes

3. **Master TestNG:**
   - Run tests with different annotations
   - Create testng.xml files
   - Use groups and priorities
   - Review test reports

4. **Explore Tools:**
   - Practice with browser DevTools
   - Learn CSS selector patterns
   - Practice XPath expressions
   - Use ChroPath extension

5. **Read Ahead:**
   - Review Actions class documentation
   - Learn about JavaScriptExecutor
   - Understand POM concept
   - Research data-driven testing

---

## Practice Exercises

### Exercise 1: Complete Login Test Suite

Create a comprehensive login test suite with the following tests:

**Requirements:**
1. Test valid login
2. Test invalid username
3. Test invalid password
4. Test empty credentials
5. Test SQL injection attempts
6. Test special characters in input
7. Verify error messages
8. Verify successful login redirect

**File Structure:**
```
src/test/java/com/automation/tests/LoginTestSuite.java
```

**Implementation Requirements:**
- Use TestNG annotations
- Implement BaseTest
- Use appropriate waits
- Add assertions
- Group tests appropriately
- Set test priorities

**Expected Output:**
- All tests should pass
- TestNG report generated
- Screenshots for failures

---

### Exercise 2: E-commerce Shopping Flow

Automate a complete shopping flow on a practice e-commerce site:

**Test Steps:**
1. Navigate to e-commerce site
2. Search for a product
3. Apply filters (price range, category)
4. Select a product from results
5. Add product to cart
6. Verify cart contents
7. Update quantity
8. Remove item from cart
9. Verify empty cart message

**Requirements:**
- Use explicit waits
- Verify each step with assertions
- Handle dynamic elements
- Use proper locators
- Add comments to code

**Suggested Site:**
- https://www.saucedemo.com
- https://demo.opencart.com
- https://www.demoblaze.com

---

### Exercise 3: Form Validation Testing

Test form validations on a registration form:

**Test Scenarios:**
1. Submit empty form
2. Test email format validation
3. Test password strength requirements
4. Test password confirmation matching
5. Test phone number format
6. Test date picker functionality
7. Test file upload restrictions
8. Test dropdown selections
9. Test checkbox/radio button behavior
10. Submit valid form

**Requirements:**
- Create separate test methods
- Use data providers for different inputs
- Verify validation messages
- Handle all form elements types
- Use Select class for dropdowns

---

### Exercise 4: Multi-Window & Frame Handling

Create tests for complex window and frame scenarios:

**Scenarios:**
1. Open new window and switch
2. Handle multiple windows simultaneously
3. Close specific windows
4. Switch between frames
5. Handle nested frames
6. Interact with elements in frames
7. Return to main content
8. Verify window titles

**Requirements:**
- Use window handles correctly
- Implement proper frame switching
- Clean up all windows in teardown
- Add verification at each step

---

### Exercise 5: Alert Handling Suite

Test different types of alerts:

**Alert Types:**
1. Simple alert (information)
2. Confirmation alert (OK/Cancel)
3. Prompt alert (text input)

**Test Cases:**
1. Handle simple alert
2. Accept confirmation
3. Dismiss confirmation
4. Enter text in prompt
5. Verify alert text
6. Handle alert in iframe

**Requirements:**
- Wait for alerts to appear
- Verify alert behavior
- Test both accept and dismiss
- Handle alert not present exception

---

### Exercise 6: Dropdown Comprehensive Testing

Test various dropdown scenarios:

**Requirements:**
1. Select by visible text
2. Select by value
3. Select by index
4. Verify selected option
5. Get all dropdown options
6. Multi-select dropdown
7. Deselect options
8. Verify dropdown states

**Test Data:**
- Test with different dropdown types
- Verify dropdown default value
- Test option count
- Verify option order

---

### Exercise 7: Build Complete Test Framework

Create a complete test automation framework:

**Framework Components:**

1. **Project Structure:**
   ```
   selenium-framework/
   ├── src/main/java/
   │   ├── base/BaseTest.java
   │   ├── utils/BrowserFactory.java
   │   ├── utils/TestUtils.java
   │   └── config/ConfigReader.java
   ├── src/test/java/
   │   └── tests/
   │       ├── LoginTests.java
   │       ├── FormTests.java
   │       └── NavigationTests.java
   ├── src/main/resources/
   │   └── config.properties
   ├── src/test/resources/
   │   └── testng.xml
   └── pom.xml
   ```

2. **BaseTest Class:**
   - Browser initialization
   - Common setup/teardown
   - Utility method access

3. **Utility Classes:**
   - BrowserFactory for browser creation
   - TestUtils for common operations
   - ConfigReader for configuration

4. **Test Classes:**
   - At least 3 test classes
   - Minimum 5 tests each
   - Use all Week 1 concepts

5. **Configuration:**
   - testng.xml with multiple tests
   - config.properties with settings
   - pom.xml with dependencies

6. **Execution:**
   - Run from IDE
   - Run from Maven command line
   - Generate TestNG reports

**Deliverables:**
- Complete working framework
- At least 15 test cases
- All tests passing
- Documentation (comments)
- TestNG reports

---

## Week 1 Comprehensive Interview Questions

### Conceptual Questions

**1. What is Selenium WebDriver and how does it work?**

**Answer:** Selenium WebDriver is a web automation tool that provides a programming interface to create and execute automated tests for web applications. It works by:
- Providing language bindings (Java, Python, C#, etc.)
- Communicating with browser drivers via W3C WebDriver protocol
- Browser drivers control the actual browsers
- Commands are executed directly in the browser
- Supports multiple browsers (Chrome, Firefox, Edge, Safari)

**Architecture:**
```
Test Script (Java) → Selenium WebDriver API → Browser Driver → Browser
```

---

**2. Explain the difference between driver.close() and driver.quit().**

**Answer:**

**driver.close():**
- Closes only the current browser window
- If multiple windows are open, others remain open
- WebDriver session continues
- Can still use the driver instance

**driver.quit():**
- Closes all browser windows
- Ends the WebDriver session completely
- Releases all resources
- Cannot use the driver instance after quit()

**Example:**
```java
// Scenario: Multiple windows open
driver.close();  // Closes current window only
driver.quit();   // Closes all windows and ends session
```

**Best Practice:** Always use `driver.quit()` in @AfterMethod or finally block.

---

**3. What are the different types of locators in Selenium? Which is the fastest?**

**Answer:**

**8 Types of Locators:**
1. ID - `By.id("id")`
2. Name - `By.name("name")`
3. Class Name - `By.className("class")`
4. Tag Name - `By.tagName("tag")`
5. Link Text - `By.linkText("text")`
6. Partial Link Text - `By.partialLinkText("partial")`
7. CSS Selector - `By.cssSelector("selector")`
8. XPath - `By.xpath("xpath")`

**Speed Ranking (Fastest to Slowest):**
1. ID (fastest - direct DOM access)
2. Name
3. CSS Selector
4. XPath (slowest - must traverse entire DOM)

**Recommendation:** Use ID when available, otherwise CSS Selector. Use XPath only when necessary.

---

**4. What is the difference between findElement() and findElements()?**

**Answer:**

**findElement():**
- Returns a single WebElement
- Returns the first matching element
- Throws NoSuchElementException if not found
- Return type: WebElement

**findElements():**
- Returns List<WebElement>
- Returns all matching elements
- Returns empty list if no elements found (no exception)
- Return type: List<WebElement>

**Example:**
```java
// Single element
WebElement element = driver.findElement(By.id("unique"));

// Multiple elements
List<WebElement> elements = driver.findElements(By.className("common"));
System.out.println("Found " + elements.size() + " elements");

// If no elements found
List<WebElement> notFound = driver.findElements(By.id("missing"));
System.out.println(notFound.size()); // Prints: 0 (no exception)
```

---

**5. Explain the difference between Implicit Wait and Explicit Wait.**

**Answer:**

**Implicit Wait:**
- Global wait applied to all elements
- Waits for specified time before throwing exception
- Set once per WebDriver session
- Polls DOM at regular intervals
- Not recommended to mix with explicit waits

```java
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
```

**Explicit Wait:**
- Applied to specific elements
- Waits for specific condition to be true
- More flexible and intelligent
- Can specify different conditions
- Recommended approach

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("id")));
```

**Key Differences:**

| Aspect | Implicit Wait | Explicit Wait |
|--------|--------------|---------------|
| Scope | All elements | Specific elements |
| Condition | Element presence only | Any condition |
| Flexibility | Low | High |
| Recommended | No | Yes |

---

**6. How do you handle dropdowns in Selenium?**

**Answer:**

Use the `Select` class for dropdown handling:

```java
// Import Select class
import org.openqa.selenium.support.ui.Select;

// Locate dropdown element
WebElement dropdown = driver.findElement(By.id("dropdown"));

// Create Select object
Select select = new Select(dropdown);

// Select by visible text
select.selectByVisibleText("Option Text");

// Select by value
select.selectByValue("option_value");

// Select by index
select.selectByIndex(2);

// For multi-select dropdowns
if (select.isMultiple()) {
    select.selectByIndex(0);
    select.selectByIndex(1);
    select.deselectAll();
}

// Get selected option
WebElement selectedOption = select.getFirstSelectedOption();
System.out.println("Selected: " + selectedOption.getText());

// Get all options
List<WebElement> allOptions = select.getOptions();
for (WebElement option : allOptions) {
    System.out.println(option.getText());
}
```

**Note:** Select class only works with `<select>` tags. For custom dropdowns, use regular element methods.

---

**7. How do you handle alerts in Selenium?**

**Answer:**

Use `driver.switchTo().alert()` to handle alerts:

```java
// Switch to alert
Alert alert = driver.switchTo().alert();

// Get alert text
String alertText = alert.getText();
System.out.println("Alert says: " + alertText);

// Accept alert (click OK)
alert.accept();

// Dismiss alert (click Cancel)
alert.dismiss();

// Enter text in prompt alert
alert.sendKeys("Input text");
alert.accept();

// Wait for alert to appear
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.alertIsPresent());
Alert alert = driver.switchTo().alert();
```

**Types of Alerts:**
1. **Simple Alert**: Information message with OK button
2. **Confirmation Alert**: Message with OK and Cancel buttons
3. **Prompt Alert**: Message with text input and OK/Cancel buttons

---

**8. How do you switch between frames/iframes in Selenium?**

**Answer:**

Use `driver.switchTo().frame()` methods:

```java
// Switch by frame name or ID
driver.switchTo().frame("frameName");
driver.switchTo().frame("frameId");

// Switch by frame index (0-based)
driver.switchTo().frame(0);

// Switch by frame WebElement
WebElement frameElement = driver.findElement(By.id("frameId"));
driver.switchTo().frame(frameElement);

// Switch back to main page (default content)
driver.switchTo().defaultContent();

// Switch to parent frame (from nested frame)
driver.switchTo().parentFrame();

// Complete example
driver.switchTo().frame("outerFrame");    // Switch to outer frame
driver.switchTo().frame("innerFrame");    // Switch to nested frame
// Perform actions in inner frame
driver.switchTo().parentFrame();          // Go back to outer frame
driver.switchTo().defaultContent();       // Go back to main page
```

**Important:** You must switch to a frame before interacting with elements inside it.

---

**9. How do you handle multiple windows in Selenium?**

**Answer:**

Use window handles to switch between windows:

```java
// Get current window handle
String mainWindow = driver.getWindowHandle();
System.out.println("Main window: " + mainWindow);

// Click element that opens new window
driver.findElement(By.linkText("Open New Window")).click();

// Get all window handles
Set<String> allWindows = driver.getWindowHandles();
System.out.println("Total windows: " + allWindows.size());

// Switch to new window
for (String window : allWindows) {
    if (!window.equals(mainWindow)) {
        driver.switchTo().window(window);
        System.out.println("Switched to: " + driver.getTitle());
        break;
    }
}

// Perform actions in new window
System.out.println("New window title: " + driver.getTitle());

// Close current window
driver.close();

// Switch back to main window
driver.switchTo().window(mainWindow);
System.out.println("Back to: " + driver.getTitle());
```

**Alternative approach using List:**
```java
List<String> windows = new ArrayList<>(driver.getWindowHandles());
driver.switchTo().window(windows.get(1)); // Switch to second window
```

---

**10. What is the difference between absolute and relative XPath?**

**Answer:**

**Absolute XPath:**
- Starts from root node (HTML)
- Uses single forward slash (/)
- Complete path from root to element
- Brittle and not recommended
- Breaks easily with DOM changes

```java
// Absolute XPath example
/html/body/div[1]/div[2]/form/input[1]
```

**Relative XPath:**
- Starts from anywhere in DOM
- Uses double forward slash (//)
- Searches for elements anywhere
- More flexible and maintainable
- Recommended approach

```java
// Relative XPath examples
//input[@id='username']
//div[@class='container']//button
//a[contains(text(),'Login')]
```

**Comparison:**

| Aspect | Absolute XPath | Relative XPath |
|--------|---------------|----------------|
| Symbol | / | // |
| Starting Point | Root | Anywhere |
| Flexibility | Low | High |
| Maintainability | Poor | Good |
| Recommendation | Avoid | Use |

---

**11. What is TestNG and why is it used in Selenium?**

**Answer:**

**TestNG** (Test Next Generation) is a testing framework for Java that provides:

**Key Features:**
1. **Annotations**: Control test execution (@Test, @BeforeMethod, etc.)
2. **Test Configuration**: Setup and teardown methods
3. **Grouping**: Organize tests into logical groups
4. **Parameterization**: Pass parameters to tests
5. **Parallel Execution**: Run tests concurrently
6. **Reports**: Built-in HTML reports
7. **Dependencies**: Define test dependencies
8. **Data Providers**: Data-driven testing

**Why Use with Selenium:**
- Better test management than main() method
- Automatic report generation
- Easy test grouping (smoke, regression)
- Parallel browser testing
- Built-in assertions
- Test configuration via XML
- Integration with build tools (Maven)

**Example:**
```java
@Test(priority=1, groups={"smoke"})
public void loginTest() {
    // Test code
}

@Test(priority=2, dependsOnMethods={"loginTest"})
public void dashboardTest() {
    // Test code
}
```

---

**12. Explain the TestNG annotation execution order.**

**Answer:**

TestNG annotations execute in this order:

```
@BeforeSuite
    @BeforeTest
        @BeforeClass
            @BeforeMethod
                @Test
            @AfterMethod
            @BeforeMethod
                @Test
            @AfterMethod
        @AfterClass
    @AfterTest
@AfterSuite
```

**Detailed Example:**

```java
public class TestExecutionOrder {

    @BeforeSuite
    public void beforeSuite() {
        System.out.println("1. @BeforeSuite - Once before all tests in suite");
    }

    @BeforeTest
    public void beforeTest() {
        System.out.println("2. @BeforeTest - Before tests in <test> tag");
    }

    @BeforeClass
    public void beforeClass() {
        System.out.println("3. @BeforeClass - Once before all methods in class");
    }

    @BeforeMethod
    public void beforeMethod() {
        System.out.println("4. @BeforeMethod - Before each test method");
    }

    @Test
    public void test1() {
        System.out.println("5. @Test - Test Method 1");
    }

    @Test
    public void test2() {
        System.out.println("5. @Test - Test Method 2");
    }

    @AfterMethod
    public void afterMethod() {
        System.out.println("6. @AfterMethod - After each test method");
    }

    @AfterClass
    public void afterClass() {
        System.out.println("7. @AfterClass - Once after all methods in class");
    }

    @AfterTest
    public void afterTest() {
        System.out.println("8. @AfterTest - After tests in <test> tag");
    }

    @AfterSuite
    public void afterSuite() {
        System.out.println("9. @AfterSuite - Once after all tests in suite");
    }
}
```

**Use Cases:**
- @BeforeSuite: Database connection, global config
- @BeforeClass: Browser initialization
- @BeforeMethod: Navigate to starting page
- @AfterMethod: Capture screenshot, clear data
- @AfterClass: Close browser
- @AfterSuite: Generate reports

---

**13. What is WebDriverManager and why is it useful?**

**Answer:**

**WebDriverManager** is a library that automatically manages browser drivers (chromedriver, geckodriver, etc.).

**Without WebDriverManager:**
```java
// Manual approach
System.setProperty("webdriver.chrome.driver",
    "C:/drivers/chromedriver.exe");
WebDriver driver = new ChromeDriver();
```

**Problems with manual approach:**
- Must download driver manually
- Must specify exact path
- Must update driver for browser updates
- Different paths on different machines
- Platform-specific drivers (Windows/Mac/Linux)

**With WebDriverManager:**
```java
// Automatic approach
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();
```

**Benefits:**
1. Automatic driver download
2. Version management
3. Cross-platform compatibility
4. Browser version detection
5. Driver caching
6. No manual configuration

**Maven Dependency:**
```xml
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.6.2</version>
</dependency>
```

---

**14. How do you verify if an element is displayed, enabled, or selected?**

**Answer:**

Use WebElement state verification methods:

```java
WebElement element = driver.findElement(By.id("elementId"));

// Check if element is displayed (visible on page)
boolean isDisplayed = element.isDisplayed();
System.out.println("Is Displayed: " + isDisplayed);

// Check if element is enabled (can interact with it)
boolean isEnabled = element.isEnabled();
System.out.println("Is Enabled: " + isEnabled);

// Check if element is selected (for checkbox/radio)
boolean isSelected = element.isSelected();
System.out.println("Is Selected: " + isSelected);

// Practical example
WebElement checkbox = driver.findElement(By.id("terms"));

if (checkbox.isDisplayed() && checkbox.isEnabled()) {
    if (!checkbox.isSelected()) {
        checkbox.click();
        System.out.println("Checkbox clicked");
    } else {
        System.out.println("Checkbox already selected");
    }
}

// With assertions (TestNG)
Assert.assertTrue(element.isDisplayed(), "Element is not displayed");
Assert.assertTrue(element.isEnabled(), "Element is not enabled");
Assert.assertFalse(checkbox.isSelected(), "Checkbox should not be selected");
```

**When to use:**
- `isDisplayed()`: Check if element is visible (CSS visible)
- `isEnabled()`: Check if element is interactive (not disabled)
- `isSelected()`: Check checkbox/radio button state

---

**15. What are the different types of assertions in TestNG?**

**Answer:**

TestNG provides two types of assertions:

**1. Hard Assertions:**
- Test stops immediately if assertion fails
- Remaining code doesn't execute
- Uses `Assert` class

```java
import org.testng.Assert;

// Equality assertions
Assert.assertEquals(actual, expected, "Values don't match");
Assert.assertNotEquals(actual, expected);

// Boolean assertions
Assert.assertTrue(condition, "Condition is not true");
Assert.assertFalse(condition, "Condition is not false");

// Null assertions
Assert.assertNull(object, "Object is not null");
Assert.assertNotNull(object, "Object is null");

// Example
@Test
public void testWithHardAssertions() {
    String actual = "Selenium";
    Assert.assertEquals(actual, "Selenium", "Text doesn't match");
    System.out.println("First assertion passed");

    Assert.assertTrue(actual.contains("Java"), "Should contain Java");
    System.out.println("This won't print if above fails");
}
```

**2. Soft Assertions:**
- Test continues even if assertion fails
- All assertions are verified
- Must call `assertAll()` at end
- Uses `SoftAssert` class

```java
import org.testng.asserts.SoftAssert;

@Test
public void testWithSoftAssertions() {
    SoftAssert softAssert = new SoftAssert();

    softAssert.assertEquals("Selenium", "Selenium", "Match 1");
    System.out.println("After first assertion");

    softAssert.assertTrue(false, "This will fail but test continues");
    System.out.println("After second assertion");

    softAssert.assertNotNull(null, "This will also fail");
    System.out.println("After third assertion");

    // Must call assertAll() - reports all failures
    softAssert.assertAll();
}
```

**Comparison:**

| Aspect | Hard Assert | Soft Assert |
|--------|------------|-------------|
| Class | Assert | SoftAssert |
| Behavior | Stops on failure | Continues on failure |
| Use Case | Single validation | Multiple validations |
| assertAll() | Not needed | Required |

**When to use:**
- **Hard Assert**: When single critical validation
- **Soft Assert**: When multiple independent validations

---

## Key Takeaways

### Week 1 Summary

You've completed an intensive week of Selenium WebDriver fundamentals! Here's what you've accomplished:

**Technical Skills Acquired:**

1. **Selenium Basics**
   - Set up development environment (Java, Maven, Selenium)
   - Understand Selenium architecture
   - Write basic automation scripts
   - Manage browser drivers with WebDriverManager

2. **Element Location**
   - Master all 8 locator strategies
   - Choose appropriate locators for different scenarios
   - Create custom CSS selectors and XPath expressions
   - Understand locator best practices

3. **WebDriver Commands**
   - Navigate websites programmatically
   - Manage browser windows and tabs
   - Execute browser operations
   - Configure timeouts and waits

4. **Element Interactions**
   - Find and interact with web elements
   - Verify element properties and states
   - Handle different input types
   - Extract information from pages

5. **Synchronization**
   - Implement implicit waits
   - Use explicit waits with conditions
   - Create fluent wait configurations
   - Handle dynamic elements

6. **Advanced Elements**
   - Work with dropdowns using Select class
   - Handle JavaScript alerts and prompts
   - Switch between frames and iframes
   - Manage multiple browser windows

7. **Test Framework**
   - Set up Maven project structure
   - Configure TestNG for test management
   - Create base classes for reusability
   - Organize tests professionally

### Best Practices Learned

1. **Always use waits** - Never rely on Thread.sleep()
2. **Prefer stable locators** - ID and CSS over absolute XPath
3. **Close resources** - Always quit driver in cleanup
4. **Organize code** - Use proper project structure
5. **Add verifications** - Assert expected outcomes
6. **Handle exceptions** - Proper error handling
7. **Write maintainable tests** - Clear, readable code
8. **Use descriptive names** - Self-documenting code

### Common Mistakes to Avoid

1. Not maximizing browser window
2. Mixing implicit and explicit waits
3. Using absolute XPath expressions
4. Not switching to frames/windows
5. Forgetting to call driver.quit()
6. Hard-coding wait times
7. Poor locator strategies
8. Not using TestNG annotations properly

### Next Steps

**Continue Learning:**
1. Practice daily with real websites
2. Explore Selenium documentation
3. Join Selenium communities
4. Review others' code on GitHub
5. Build personal projects
6. Prepare for Week 2 advanced topics

**Recommended Practice:**
- Spend 2-3 hours daily coding
- Automate at least 2 websites
- Complete all practice exercises
- Review concepts that are unclear
- Experiment with different scenarios

### Resources for Further Learning

**Official Documentation:**
- Selenium Documentation: https://www.selenium.dev/documentation/
- TestNG Documentation: https://testng.org/doc/documentation-main.html
- Maven Documentation: https://maven.apache.org/guides/

**Practice Websites:**
- https://practicetestautomation.com/
- https://the-internet.herokuapp.com/
- https://demo.opencart.com/
- https://www.saucedemo.com/
- https://www.selenium.dev/selenium/web/web-form.html

**Community:**
- Selenium Official Forum
- Stack Overflow Selenium tag
- Selenium Slack channels
- LinkedIn Selenium groups

### Your Progress Checklist

Mark off items as you master them:

**Selenium Fundamentals:**
- [ ] Install and configure Java, Maven, Selenium
- [ ] Write basic Selenium scripts
- [ ] Understand WebDriver architecture
- [ ] Use WebDriverManager

**Locators:**
- [ ] Use all 8 locator types
- [ ] Create CSS selectors
- [ ] Write XPath expressions
- [ ] Choose appropriate locators

**WebDriver Operations:**
- [ ] Navigate and control browser
- [ ] Execute browser commands
- [ ] Manage windows and tabs
- [ ] Configure browser settings

**Element Interactions:**
- [ ] Find elements reliably
- [ ] Interact with different element types
- [ ] Verify element states
- [ ] Extract element information

**Synchronization:**
- [ ] Implement implicit waits
- [ ] Use explicit waits effectively
- [ ] Create fluent waits
- [ ] Handle dynamic content

**Advanced Elements:**
- [ ] Work with dropdowns
- [ ] Handle alerts
- [ ] Switch frames
- [ ] Manage multiple windows

**Test Framework:**
- [ ] Set up Maven project
- [ ] Configure TestNG
- [ ] Create base classes
- [ ] Run tests multiple ways

### Congratulations!

You've completed Week 1 of the Selenium Automation course! You now have a solid foundation in web automation and are ready to tackle more advanced concepts in Week 2.

**Remember:**
- Practice is key to mastery
- Don't rush - understand each concept
- Build on what you've learned
- Ask questions when stuck
- Help others in the community

**Stay motivated and keep coding!**

---

## Navigation

- **Previous:** [Day 6: Dropdowns, Alerts, and Frames](day06_dropdowns_alerts_frames.md)
- **Next:** [Week 2 - Day 8: Actions Class & Advanced Interactions](../week2/day08_actions_class.md)
- **[Back to Course Home](../README.md)**

---

**Happy Testing!**
