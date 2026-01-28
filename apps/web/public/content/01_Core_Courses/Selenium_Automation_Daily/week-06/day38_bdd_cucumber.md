# Day 45: BDD with Cucumber & Selenium Integration

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand Behavior Driven Development (BDD) principles and methodology
- Write effective feature files using Gherkin language syntax
- Implement step definitions for Cucumber scenarios
- Integrate Cucumber with Selenium WebDriver
- Create comprehensive BDD test frameworks
- Use Scenario Outline for data-driven testing
- Work with Data Tables and Doc Strings
- Implement Background, Hooks, and Tags
- Configure Cucumber options and runners
- Integrate Cucumber with TestNG and JUnit
- Generate and customize Cucumber reports
- Implement Extent Reports with Cucumber
- Apply Page Object Model with BDD framework
- Follow BDD best practices and design patterns
- Avoid common BDD pitfalls and anti-patterns

---

## Table of Contents

1. [Introduction to BDD](#1-introduction-to-bdd)
2. [Why Use BDD](#2-why-use-bdd)
3. [Gherkin Language Syntax](#3-gherkin-language-syntax)
4. [Feature Files Structure](#4-feature-files-structure)
5. [Scenario and Scenario Outline](#5-scenario-and-scenario-outline)
6. [Data Tables and Doc Strings](#6-data-tables-and-doc-strings)
7. [Tags and Hooks](#7-tags-and-hooks)
8. [Cucumber Setup with Maven](#8-cucumber-setup-with-maven)
9. [Step Definitions](#9-step-definitions)
10. [Integrating Cucumber with Selenium](#10-integrating-cucumber-with-selenium)
11. [Page Object Model with Cucumber](#11-page-object-model-with-cucumber)
12. [Background and Examples](#12-background-and-examples)
13. [Cucumber Options and Runners](#13-cucumber-options-and-runners)
14. [TestNG/JUnit with Cucumber](#14-testng-junit-with-cucumber)
15. [Cucumber Reporting](#15-cucumber-reporting)
16. [Extent Reports with Cucumber](#16-extent-reports-with-cucumber)
17. [Best Practices for BDD Automation](#17-best-practices-for-bdd-automation)
18. [Common Pitfalls and Solutions](#18-common-pitfalls-and-solutions)
19. [Complete BDD Framework Example](#19-complete-bdd-framework-example)
20. [Practical Exercises](#20-practical-exercises)
21. [Key Takeaways](#21-key-takeaways)
22. [Interview Questions](#22-interview-questions)

---

## 1. Introduction to BDD

### What is BDD?

**Behavior Driven Development (BDD)** is a software development approach that emphasizes collaboration between developers, testers, and business stakeholders. It focuses on defining the behavior of an application from the end user's perspective.

### Core Concepts of BDD

```
BDD = TDD + Domain Driven Design + Ubiquitous Language

Key Principles:
1. Collaboration between all stakeholders
2. Behavior specification before implementation
3. Examples as shared understanding
4. Living documentation
5. Outside-in development
```

### BDD Methodology

```
The Three Amigos:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Business   │────▶│   Testing   │────▶│ Development │
│   Analyst   │     │   Team      │     │    Team     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │                    │
      └────────────────────┴────────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Behavior  │
                    │ Specifications│
                    └─────────────┘
```

### BDD Process Flow

```
Discovery Workshop
      ↓
Example Mapping
      ↓
Feature Files (Gherkin)
      ↓
Step Definitions (Glue Code)
      ↓
Implementation
      ↓
Automation
      ↓
Living Documentation
```

### BDD vs TDD

| Aspect | TDD | BDD |
|--------|-----|-----|
| Focus | Unit testing | Behavior specification |
| Language | Technical (code) | Business-readable (Gherkin) |
| Audience | Developers | All stakeholders |
| Approach | Inside-out | Outside-in |
| Tests | Unit tests | Acceptance tests |
| Documentation | Technical | Living documentation |

---

## 2. Why Use BDD

### Benefits of BDD

**1. Improved Collaboration**
- Bridges communication gap between technical and non-technical teams
- Shared understanding of requirements
- Common language for all stakeholders

**2. Living Documentation**
- Feature files serve as up-to-date documentation
- Executable specifications
- Always synchronized with code

**3. Better Test Coverage**
- Focus on business value
- User-centric scenarios
- Real-world use cases

**4. Early Bug Detection**
- Requirements clarification before coding
- Reduces misunderstandings
- Prevents feature creep

**5. Maintainable Tests**
- Clear separation of concerns
- Reusable step definitions
- Easy to understand and modify

### When to Use BDD

**Good Use Cases:**
- Complex business logic
- Stakeholder collaboration required
- Living documentation needed
- Acceptance criteria driven development
- User story implementation

**Not Ideal For:**
- Unit testing
- API testing (though possible)
- Performance testing
- Simple utility functions

### BDD in Agile Teams

```
Sprint Planning
      ↓
Story Definition → BDD Scenarios (Acceptance Criteria)
      ↓
Development → Step Definition Implementation
      ↓
Testing → Automated Scenario Execution
      ↓
Demo → Living Documentation Review
```

---

## 3. Gherkin Language Syntax

### What is Gherkin?

**Gherkin** is a domain-specific language for writing test scenarios in a human-readable format. It uses structured keywords to describe application behavior.

### Gherkin Keywords

```gherkin
Feature:         # High-level description of functionality
Background:      # Common steps for all scenarios
Scenario:        # Individual test case
Scenario Outline:# Template for multiple scenarios
Examples:        # Data table for Scenario Outline
Given:           # Precondition/Context
When:            # Action/Event
Then:            # Expected outcome
And:             # Additional steps (same type as previous)
But:             # Negative additional steps
* :              # Generic step
@tag:            # Scenario tag for organization
#:               # Comment
""":             # Doc Strings (multi-line text)
|:               # Data Tables
```

### Basic Gherkin Structure

```gherkin
Feature: Feature Name
  Brief description of feature

  Background:
    Given common preconditions

  Scenario: Scenario Name
    Given initial context
    When action occurs
    Then expected result

  Scenario Outline: Template Name
    Given <parameter1>
    When <parameter2>
    Then <parameter3>

    Examples:
      | parameter1 | parameter2 | parameter3 |
      | value1     | value2     | value3     |
```

### Gherkin Best Practices

**1. Declarative vs Imperative**

```gherkin
# BAD - Imperative (Too detailed)
Given I open the browser
And I navigate to "https://example.com"
And I click on login button
And I enter "user@example.com" in email field
And I enter "password123" in password field
And I click submit button
Then I should see welcome message

# GOOD - Declarative (Business focused)
Given I am on the login page
When I login with valid credentials
Then I should see the dashboard
```

**2. Use Business Language**

```gherkin
# BAD - Technical language
Given I send POST request to /api/users
When response code is 201
Then JSON contains user_id field

# GOOD - Business language
Given I have registered a new user account
When the registration is successful
Then I should receive confirmation with account details
```

**3. Independent Scenarios**

```gherkin
# BAD - Dependent scenarios
Scenario: Create user
  When I create a new user

Scenario: Edit user
  Given user from previous scenario exists  # Dependency!
  When I edit the user

# GOOD - Independent scenarios
Scenario: Create user
  Given I am logged in as admin
  When I create a new user
  Then user should be created

Scenario: Edit user
  Given I am logged in as admin
  And a user exists in the system
  When I edit the user details
  Then user should be updated
```

---

## 4. Feature Files Structure

### Feature File Template

```gherkin
@feature_tag
Feature: User Authentication
  As a registered user
  I want to log into the application
  So that I can access my account

  Background:
    Given the application is running
    And I am on the login page

  @smoke @login
  Scenario: Successful login with valid credentials
    Given I have a registered account
    When I enter valid username and password
    And I click the login button
    Then I should be logged in successfully
    And I should see the dashboard

  @negative
  Scenario: Failed login with invalid credentials
    When I enter invalid username and password
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @security
  Scenario: Account locked after multiple failed attempts
    Given I have failed to login 3 times
    When I attempt to login again
    Then my account should be locked
    And I should see a lockout message
```

### Feature File Best Practices

**1. Descriptive Feature Names**

```gherkin
# GOOD
Feature: User Registration
Feature: Shopping Cart Management
Feature: Payment Processing

# BAD
Feature: Test1
Feature: Login
Feature: Functionality
```

**2. User Story Format**

```gherkin
Feature: Product Search
  As a customer
  I want to search for products
  So that I can find items I want to purchase
```

**3. Clear Scenario Titles**

```gherkin
# GOOD
Scenario: User can add items to cart
Scenario: System displays error for invalid email
Scenario: Order confirmation sent after purchase

# BAD
Scenario: Test case 1
Scenario: Verify functionality
Scenario: Check if it works
```

### Feature File Organization

```
src/test/resources/features/
├── authentication/
│   ├── login.feature
│   ├── logout.feature
│   └── registration.feature
├── shopping/
│   ├── add_to_cart.feature
│   ├── checkout.feature
│   └── payment.feature
├── profile/
│   ├── update_profile.feature
│   └── change_password.feature
└── admin/
    ├── user_management.feature
    └── reports.feature
```

---

## 5. Scenario and Scenario Outline

### Scenario - Single Test Case

```gherkin
Scenario: User can successfully place an order
  Given I am logged in as a customer
  And I have items in my shopping cart
  When I proceed to checkout
  And I provide shipping information
  And I complete payment with valid card
  Then my order should be placed successfully
  And I should receive order confirmation email
  And my cart should be empty
```

### Scenario Outline - Data-Driven Testing

```gherkin
Scenario Outline: Login validation with different credentials
  Given I am on the login page
  When I enter "<username>" as username
  And I enter "<password>" as password
  And I click login button
  Then I should see "<result>"

  Examples:
    | username          | password    | result                |
    | valid@email.com   | ValidPass1  | Dashboard             |
    | invalid@email.com | WrongPass   | Invalid credentials   |
    | valid@email.com   | short       | Password too short    |
    | notanemail        | ValidPass1  | Invalid email format  |
    |                   | ValidPass1  | Username required     |
    | valid@email.com   |             | Password required     |
```

### Multiple Examples Tables

```gherkin
Scenario Outline: Product search with different inputs
  Given I am on the search page
  When I search for "<search_term>"
  Then I should see "<expected_results>"

  @valid_search
  Examples: Valid searches
    | search_term | expected_results        |
    | laptop      | Laptop products         |
    | phone       | Phone products          |
    | headphones  | Headphone products      |

  @invalid_search
  Examples: Invalid searches
    | search_term | expected_results        |
    | xyz123      | No products found       |
    | !@#$%       | Invalid search term     |
    |             | Please enter search term|
```

### Scenario Outline with Complex Data

```gherkin
Scenario Outline: User registration with different data
  Given I am on the registration page
  When I fill in registration form
    | Field         | Value           |
    | First Name    | <first_name>    |
    | Last Name     | <last_name>     |
    | Email         | <email>         |
    | Password      | <password>      |
    | Phone         | <phone>         |
  And I submit the form
  Then registration should "<status>"
  And I should see "<message>"

  Examples:
    | first_name | last_name | email              | password   | phone       | status  | message                 |
    | John       | Doe       | john@example.com   | Pass@123   | 1234567890  | succeed | Welcome John            |
    | Jane       | Smith     | invalid-email      | Pass@123   | 1234567890  | fail    | Invalid email format    |
    | Bob        | Wilson    | bob@example.com    | weak       | 1234567890  | fail    | Password too weak       |
    | Alice      | Brown     | alice@example.com  | Pass@123   | invalid     | fail    | Invalid phone number    |
```

---

## 6. Data Tables and Doc Strings

### Data Tables

**Vertical Data Table:**

```gherkin
Scenario: Create new user account
  Given I am on the user creation page
  When I enter the following user details
    | Field         | Value              |
    | First Name    | John               |
    | Last Name     | Doe                |
    | Email         | john@example.com   |
    | Role          | Admin              |
    | Department    | IT                 |
  And I click create button
  Then user should be created successfully
```

**Horizontal Data Table:**

```gherkin
Scenario: Add multiple products to cart
  Given I am logged in as customer
  When I add the following products to cart
    | Product      | Quantity | Price  |
    | Laptop       | 1        | 999.99 |
    | Mouse        | 2        | 25.50  |
    | Keyboard     | 1        | 79.99  |
  Then cart total should be calculated correctly
  And cart should contain 3 items
```

**List Data Table:**

```gherkin
Scenario: Verify navigation menu items
  Given I am on the homepage
  Then I should see the following menu items
    | Home       |
    | Products   |
    | About Us   |
    | Contact    |
    | My Account |
```

### Doc Strings (Multi-line Text)

```gherkin
Scenario: Submit feedback form with long message
  Given I am on the feedback page
  When I enter the following message
    """
    Dear Support Team,

    I am writing to express my concerns about the recent update.
    The new interface is confusing and some features are missing.

    Specifically:
    - The search function is slower
    - Export functionality is not working
    - Dashboard layout is cluttered

    Please address these issues in the next release.

    Best regards,
    John Doe
    """
  And I submit the feedback
  Then feedback should be submitted successfully
  And I should receive acknowledgment email
```

### Data Tables in Step Definitions

```java
// Handling vertical data table
@When("I enter the following user details")
public void enterUserDetails(Map<String, String> userDetails) {
    userPage.enterFirstName(userDetails.get("First Name"));
    userPage.enterLastName(userDetails.get("Last Name"));
    userPage.enterEmail(userDetails.get("Email"));
    userPage.selectRole(userDetails.get("Role"));
    userPage.selectDepartment(userDetails.get("Department"));
}

// Handling horizontal data table
@When("I add the following products to cart")
public void addProductsToCart(List<Map<String, String>> products) {
    for (Map<String, String> product : products) {
        String name = product.get("Product");
        int quantity = Integer.parseInt(product.get("Quantity"));
        double price = Double.parseDouble(product.get("Price"));

        cartPage.addProduct(name, quantity);
    }
}

// Handling list data table
@Then("I should see the following menu items")
public void verifyMenuItems(List<String> menuItems) {
    for (String item : menuItems) {
        Assert.assertTrue(homePage.isMenuItemDisplayed(item));
    }
}

// Handling doc string
@When("I enter the following message")
public void enterMessage(String message) {
    feedbackPage.enterMessage(message);
}
```

---

## 7. Tags and Hooks

### Tags for Scenario Organization

```gherkin
@all
Feature: E-commerce Shopping

  @smoke @critical
  Scenario: User can add product to cart
    Given I am on the product page
    When I click add to cart
    Then product should be added to cart

  @smoke @regression
  Scenario: User can remove product from cart
    Given I have a product in cart
    When I remove the product
    Then cart should be empty

  @regression @payment
  Scenario: User can complete checkout
    Given I have products in cart
    When I proceed to checkout
    Then order should be placed

  @wip @ignore
  Scenario: User can apply discount code
    Given I have products in cart
    When I apply discount code
    Then discount should be applied
```

### Running Tests with Tags

```java
// Run only smoke tests
@CucumberOptions(tags = "@smoke")

// Run smoke and regression tests
@CucumberOptions(tags = "@smoke or @regression")

// Run smoke tests but not wip
@CucumberOptions(tags = "@smoke and not @wip")

// Complex tag expressions
@CucumberOptions(tags = "(@smoke or @regression) and not @wip")
```

### Hooks - Before and After

**Global Hooks:**

```java
package hooks;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.openqa.selenium.WebDriver;

public class Hooks {
    private WebDriver driver;

    @Before
    public void setUp(Scenario scenario) {
        System.out.println("Starting scenario: " + scenario.getName());
        // Initialize WebDriver
        driver = DriverManager.getDriver();
    }

    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
            // Take screenshot
            byte[] screenshot = ((TakesScreenshot) driver)
                .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", scenario.getName());
        }

        System.out.println("Scenario status: " + scenario.getStatus());
        DriverManager.quitDriver();
    }
}
```

**Tagged Hooks:**

```java
@Before("@database")
public void setUpDatabase() {
    System.out.println("Setting up database connection");
    DatabaseManager.connect();
}

@After("@database")
public void tearDownDatabase() {
    System.out.println("Closing database connection");
    DatabaseManager.disconnect();
}

@Before("@api")
public void setUpAPI() {
    System.out.println("Initializing API client");
    RestAssured.baseURI = ConfigReader.getApiUrl();
}

@Before(order = 1)
public void firstHook() {
    System.out.println("This runs first");
}

@Before(order = 2)
public void secondHook() {
    System.out.println("This runs second");
}
```

**Conditional Hooks:**

```java
@BeforeStep
public void beforeEachStep() {
    System.out.println("Before each step");
}

@AfterStep
public void afterEachStep(Scenario scenario) {
    if (scenario.isFailed()) {
        System.out.println("Step failed, logging details");
    }
}
```

---

## 8. Cucumber Setup with Maven

### Maven Dependencies

**pom.xml:**

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.automation</groupId>
    <artifactId>cucumber-selenium-framework</artifactId>
    <version>1.0.0</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <cucumber.version>7.14.0</cucumber.version>
        <selenium.version>4.15.0</selenium.version>
    </properties>

    <dependencies>
        <!-- Cucumber Java -->
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-java</artifactId>
            <version>${cucumber.version}</version>
        </dependency>

        <!-- Cucumber TestNG -->
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-testng</artifactId>
            <version>${cucumber.version}</version>
        </dependency>

        <!-- Cucumber JUnit (Alternative) -->
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-junit</artifactId>
            <version>${cucumber.version}</version>
            <scope>test</scope>
        </dependency>

        <!-- Selenium WebDriver -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>${selenium.version}</version>
        </dependency>

        <!-- WebDriverManager -->
        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>5.6.2</version>
        </dependency>

        <!-- TestNG -->
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>7.8.0</version>
        </dependency>

        <!-- Extent Reports Cucumber Adapter -->
        <dependency>
            <groupId>tech.grasshopper</groupId>
            <artifactId>extentreports-cucumber7-adapter</artifactId>
            <version>1.14.0</version>
        </dependency>

        <!-- Logging -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.21.1</version>
        </dependency>

        <!-- AssertJ for fluent assertions -->
        <dependency>
            <groupId>org.assertj</groupId>
            <artifactId>assertj-core</artifactId>
            <version>3.24.2</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- Maven Surefire Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.0.0-M9</version>
                <configuration>
                    <includes>
                        <include>**/TestRunner.java</include>
                    </includes>
                    <systemPropertyVariables>
                        <cucumber.filter.tags>${cucumber.filter.tags}</cucumber.filter.tags>
                    </systemPropertyVariables>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### Project Structure

```
cucumber-selenium-framework/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.java
│   │   │   │   └── HomePage.java
│   │   │   └── utils/
│   │   │       ├── DriverManager.java
│   │   │       └── ConfigReader.java
│   │   └── resources/
│   │       └── config.properties
│   └── test/
│       ├── java/
│       │   ├── runners/
│       │   │   └── TestRunner.java
│       │   ├── stepdefinitions/
│       │   │   ├── LoginSteps.java
│       │   │   └── CommonSteps.java
│       │   └── hooks/
│       │       └── Hooks.java
│       └── resources/
│           ├── features/
│           │   ├── login.feature
│           │   └── registration.feature
│           └── extent.properties
├── pom.xml
└── README.md
```

---

## 9. Step Definitions

### Basic Step Definition

```java
package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.And;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;
import utils.DriverManager;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginSteps {

    private WebDriver driver;
    private LoginPage loginPage;

    public LoginSteps() {
        this.driver = DriverManager.getDriver();
        this.loginPage = new LoginPage(driver);
    }

    @Given("I am on the login page")
    public void navigateToLoginPage() {
        driver.get("https://example.com/login");
        assertThat(loginPage.isLoginPageDisplayed())
            .as("Login page should be displayed")
            .isTrue();
    }

    @When("I enter {string} as username")
    public void enterUsername(String username) {
        loginPage.enterUsername(username);
    }

    @When("I enter {string} as password")
    public void enterPassword(String password) {
        loginPage.enterPassword(password);
    }

    @When("I click login button")
    public void clickLoginButton() {
        loginPage.clickLoginButton();
    }

    @Then("I should see {string}")
    public void verifyMessage(String expectedMessage) {
        String actualMessage = loginPage.getMessage();
        assertThat(actualMessage)
            .as("Expected message to be displayed")
            .contains(expectedMessage);
    }

    @Then("I should be logged in successfully")
    public void verifySuccessfulLogin() {
        assertThat(loginPage.isLoginSuccessful())
            .as("User should be logged in")
            .isTrue();
    }
}
```

### Parameterized Step Definitions

```java
package stepdefinitions;

import io.cucumber.java.en.*;

public class ParameterizedSteps {

    // String parameter
    @Given("user with name {string} exists")
    public void userExists(String name) {
        System.out.println("User name: " + name);
    }

    // Integer parameter
    @When("I add {int} items to cart")
    public void addItemsToCart(int quantity) {
        System.out.println("Adding " + quantity + " items");
    }

    // Double parameter
    @Then("cart total should be {double}")
    public void verifyCartTotal(double expectedTotal) {
        System.out.println("Expected total: $" + expectedTotal);
    }

    // Boolean parameter
    @Given("user is {word}")
    public void checkUserStatus(String status) {
        boolean isActive = status.equals("active");
        System.out.println("User active: " + isActive);
    }

    // Multiple parameters
    @When("I login with {string} and {string}")
    public void login(String username, String password) {
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
    }
}
```

### Regular Expression in Step Definitions

```java
package stepdefinitions;

import io.cucumber.java.en.*;

public class RegexSteps {

    // Match any text
    @Given("^I am on the (.*) page$")
    public void navigateToPage(String pageName) {
        System.out.println("Navigating to: " + pageName);
    }

    // Match specific pattern
    @When("^I enter (\\d+) items?$")
    public void enterItems(int count) {
        System.out.println("Items: " + count);
    }

    // Optional text
    @Then("^the order should( not)? be placed$")
    public void verifyOrder(String negation) {
        boolean shouldBePlaced = (negation == null);
        System.out.println("Order placed: " + shouldBePlaced);
    }

    // Alternative text
    @Given("^user is (active|inactive|suspended)$")
    public void checkStatus(String status) {
        System.out.println("Status: " + status);
    }
}
```

### Data Table Step Definitions

```java
package stepdefinitions;

import io.cucumber.java.en.*;
import io.cucumber.datatable.DataTable;
import java.util.List;
import java.util.Map;

public class DataTableSteps {

    // Handle map data table (vertical)
    @When("I fill in user form")
    public void fillUserForm(Map<String, String> userData) {
        String firstName = userData.get("First Name");
        String lastName = userData.get("Last Name");
        String email = userData.get("Email");

        System.out.println("Filling form: " + firstName + " " + lastName);
    }

    // Handle list of maps (horizontal)
    @When("I add the following products")
    public void addProducts(List<Map<String, String>> products) {
        for (Map<String, String> product : products) {
            String name = product.get("Product");
            String quantity = product.get("Quantity");
            System.out.println("Adding: " + name + " x " + quantity);
        }
    }

    // Handle simple list
    @Then("I should see the following items")
    public void verifyItems(List<String> items) {
        for (String item : items) {
            System.out.println("Verifying: " + item);
        }
    }

    // Handle data table directly
    @When("I enter the following data")
    public void enterData(DataTable dataTable) {
        List<List<String>> rows = dataTable.asLists();
        for (List<String> row : rows) {
            System.out.println("Row: " + row);
        }
    }
}
```

---

## 10. Integrating Cucumber with Selenium

### DriverManager Utility

```java
package utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.edge.EdgeDriver;
import java.time.Duration;

public class DriverManager {

    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver getDriver() {
        if (driver.get() == null) {
            driver.set(createDriver());
        }
        return driver.get();
    }

    private static WebDriver createDriver() {
        String browser = ConfigReader.getProperty("browser", "chrome");
        WebDriver webDriver;

        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--start-maximized");
                chromeOptions.addArguments("--disable-notifications");
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
                throw new RuntimeException("Unsupported browser: " + browser);
        }

        webDriver.manage().timeouts().implicitlyWait(
            Duration.ofSeconds(ConfigReader.getIntProperty("timeout.implicit", 10)));
        webDriver.manage().window().maximize();

        return webDriver;
    }

    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}
```

### Cucumber Hooks for Selenium

```java
package hooks;

import io.cucumber.java.*;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import utils.DriverManager;

public class CucumberHooks {

    private WebDriver driver;

    @Before
    public void setUp(Scenario scenario) {
        System.out.println("===============================================");
        System.out.println("Starting Scenario: " + scenario.getName());
        System.out.println("Tags: " + scenario.getSourceTagNames());
        System.out.println("===============================================");

        driver = DriverManager.getDriver();
    }

    @After
    public void tearDown(Scenario scenario) {
        // Take screenshot if scenario failed
        if (scenario.isFailed()) {
            byte[] screenshot = ((TakesScreenshot) driver)
                .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", scenario.getName());
        }

        System.out.println("===============================================");
        System.out.println("Scenario Status: " + scenario.getStatus());
        System.out.println("===============================================");

        DriverManager.quitDriver();
    }

    @BeforeStep
    public void beforeStep(Scenario scenario) {
        System.out.println("Executing step...");
    }

    @AfterStep
    public void afterStep(Scenario scenario) {
        if (scenario.isFailed()) {
            // Additional logging for failed steps
            System.out.println("Step failed!");
        }
    }
}
```

### Complete Login Test Example

**Feature File: login.feature**

```gherkin
@login
Feature: User Login
  As a registered user
  I want to login to the application
  So that I can access my account

  Background:
    Given I am on the login page

  @smoke @positive
  Scenario: Successful login with valid credentials
    When I enter "john@example.com" as username
    And I enter "Password123" as password
    And I click login button
    Then I should be logged in successfully
    And I should see "Welcome, John"

  @negative
  Scenario: Failed login with invalid password
    When I enter "john@example.com" as username
    And I enter "WrongPassword" as password
    And I click login button
    Then I should see "Invalid credentials"
    And I should remain on login page

  @validation
  Scenario Outline: Login validation messages
    When I enter "<username>" as username
    And I enter "<password>" as password
    And I click login button
    Then I should see "<error_message>"

    Examples:
      | username          | password    | error_message           |
      |                   | Password123 | Username required       |
      | john@example.com  |             | Password required       |
      | invalid-email     | Password123 | Invalid email format    |
```

**Step Definitions: LoginSteps.java**

```java
package stepdefinitions;

import io.cucumber.java.en.*;
import org.openqa.selenium.WebDriver;
import pages.LoginPage;
import pages.HomePage;
import utils.DriverManager;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginSteps {

    private WebDriver driver;
    private LoginPage loginPage;
    private HomePage homePage;

    public LoginSteps() {
        this.driver = DriverManager.getDriver();
        this.loginPage = new LoginPage(driver);
        this.homePage = new HomePage(driver);
    }

    @Given("I am on the login page")
    public void navigateToLoginPage() {
        driver.get("https://example.com/login");
        assertThat(loginPage.isDisplayed())
            .as("Login page should be displayed")
            .isTrue();
    }

    @When("I enter {string} as username")
    public void enterUsername(String username) {
        loginPage.enterUsername(username);
    }

    @When("I enter {string} as password")
    public void enterPassword(String password) {
        loginPage.enterPassword(password);
    }

    @When("I click login button")
    public void clickLoginButton() {
        loginPage.clickLogin();
    }

    @Then("I should be logged in successfully")
    public void verifySuccessfulLogin() {
        assertThat(homePage.isDisplayed())
            .as("Home page should be displayed after login")
            .isTrue();
    }

    @Then("I should see {string}")
    public void verifyMessage(String expectedMessage) {
        String actualMessage = loginPage.getErrorMessage();
        assertThat(actualMessage)
            .as("Expected message to be displayed")
            .isEqualTo(expectedMessage);
    }

    @Then("I should remain on login page")
    public void verifyOnLoginPage() {
        assertThat(loginPage.isDisplayed())
            .as("Should still be on login page")
            .isTrue();
    }
}
```

---

## 11. Page Object Model with Cucumber

### Page Object Classes

**LoginPage.java:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class LoginPage {

    private WebDriver driver;
    private WebDriverWait wait;

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "login-button")
    private WebElement loginButton;

    @FindBy(css = ".error-message")
    private WebElement errorMessage;

    @FindBy(css = ".login-form")
    private WebElement loginForm;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public void enterUsername(String username) {
        wait.until(ExpectedConditions.visibilityOf(usernameField));
        usernameField.clear();
        usernameField.sendKeys(username);
    }

    public void enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
    }

    public void clickLogin() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton));
        loginButton.click();
    }

    public boolean isDisplayed() {
        try {
            return loginForm.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getErrorMessage() {
        wait.until(ExpectedConditions.visibilityOf(errorMessage));
        return errorMessage.getText();
    }

    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLogin();
    }
}
```

**HomePage.java:**

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

public class HomePage {

    private WebDriver driver;
    private WebDriverWait wait;

    @FindBy(css = ".welcome-message")
    private WebElement welcomeMessage;

    @FindBy(id = "logout-button")
    private WebElement logoutButton;

    @FindBy(css = ".dashboard")
    private WebElement dashboard;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public boolean isDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOf(dashboard));
            return dashboard.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public String getWelcomeMessage() {
        wait.until(ExpectedConditions.visibilityOf(welcomeMessage));
        return welcomeMessage.getText();
    }

    public void logout() {
        wait.until(ExpectedConditions.elementToBeClickable(logoutButton));
        logoutButton.click();
    }
}
```

### Context/State Management

**TestContext.java:**

```java
package context;

import org.openqa.selenium.WebDriver;
import pages.*;
import utils.DriverManager;

public class TestContext {

    private WebDriver driver;
    private LoginPage loginPage;
    private HomePage homePage;
    private ProductPage productPage;
    private CartPage cartPage;

    public TestContext() {
        this.driver = DriverManager.getDriver();
        initializePages();
    }

    private void initializePages() {
        loginPage = new LoginPage(driver);
        homePage = new HomePage(driver);
        productPage = new ProductPage(driver);
        cartPage = new CartPage(driver);
    }

    public WebDriver getDriver() {
        return driver;
    }

    public LoginPage getLoginPage() {
        return loginPage;
    }

    public HomePage getHomePage() {
        return homePage;
    }

    public ProductPage getProductPage() {
        return productPage;
    }

    public CartPage getCartPage() {
        return cartPage;
    }
}
```

**Using TestContext in Step Definitions:**

```java
package stepdefinitions;

import io.cucumber.java.en.*;
import context.TestContext;
import pages.LoginPage;
import pages.HomePage;

public class LoginSteps {

    private TestContext context;
    private LoginPage loginPage;
    private HomePage homePage;

    public LoginSteps(TestContext context) {
        this.context = context;
        this.loginPage = context.getLoginPage();
        this.homePage = context.getHomePage();
    }

    @Given("I am on the login page")
    public void navigateToLoginPage() {
        context.getDriver().get("https://example.com/login");
    }

    @When("I login with valid credentials")
    public void loginWithValidCredentials() {
        loginPage.login("john@example.com", "Password123");
    }

    @Then("I should see the dashboard")
    public void verifyDashboard() {
        assert homePage.isDisplayed();
    }
}
```

---

## 12. Background and Examples

### Background - Common Setup

```gherkin
Feature: Shopping Cart Management

  Background:
    Given I am logged in as a customer
    And I am on the products page

  Scenario: Add product to cart
    When I click add to cart for "Laptop"
    Then "Laptop" should be in my cart
    And cart count should be 1

  Scenario: Remove product from cart
    Given I have "Mouse" in my cart
    When I remove "Mouse" from cart
    Then cart should be empty
    And cart count should be 0

  Scenario: Update product quantity
    Given I have "Keyboard" in my cart
    When I update quantity to 3
    Then cart should show 3 "Keyboard" items
```

### Examples with Multiple Tables

```gherkin
Feature: Product Search

  Scenario Outline: Search for different products
    Given I am on the search page
    When I search for "<product>"
    Then I should see results for "<product>"
    And result count should be greater than <min_results>

    @valid_searches
    Examples: Electronics
      | product    | min_results |
      | Laptop     | 10          |
      | Phone      | 15          |
      | Tablet     | 5           |

    @valid_searches
    Examples: Accessories
      | product     | min_results |
      | Headphones  | 20          |
      | Mouse       | 25          |
      | Keyboard    | 15          |

    @invalid_searches
    Examples: No results
      | product    | min_results |
      | XYZ123     | 0           |
      | !!!@@@     | 0           |
```

### Background with Scenario Outline

```gherkin
Feature: User Registration

  Background:
    Given the registration page is accessible
    And email service is available

  Scenario Outline: Register with different user types
    When I register as "<user_type>" with following details
      | Field      | Value        |
      | First Name | <first_name> |
      | Last Name  | <last_name>  |
      | Email      | <email>      |
    Then registration should "<status>"
    And I should receive "<email_type>" email

    Examples:
      | user_type | first_name | last_name | email              | status  | email_type   |
      | customer  | John       | Doe       | john@example.com   | succeed | welcome      |
      | vendor    | Jane       | Smith     | jane@vendor.com    | succeed | verification |
      | admin     | Bob        | Wilson    | bob@admin.com      | succeed | admin_setup  |
```

---

## 13. Cucumber Options and Runners

### TestNG Runner

```java
package runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.DataProvider;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    tags = "@smoke",
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json",
        "junit:target/cucumber-reports/cucumber.xml",
        "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:"
    },
    monochrome = true,
    dryRun = false,
    publish = false
)
public class TestRunner extends AbstractTestNGCucumberTests {

    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
```

### JUnit Runner

```java
package runners;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    tags = "@regression",
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json"
    },
    monochrome = true,
    dryRun = false
)
public class TestRunner {
    // This class will be empty
}
```

### Multiple Runners for Different Tags

**SmokeTestRunner.java:**

```java
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    tags = "@smoke",
    plugin = {"pretty", "html:target/smoke-reports/cucumber.html"}
)
public class SmokeTestRunner extends AbstractTestNGCucumberTests {
}
```

**RegressionTestRunner.java:**

```java
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    tags = "@regression and not @wip",
    plugin = {"pretty", "html:target/regression-reports/cucumber.html"}
)
public class RegressionTestRunner extends AbstractTestNGCucumberTests {
}
```

### Cucumber Options Explained

```java
@CucumberOptions(
    // Feature files location
    features = "src/test/resources/features",

    // Package containing step definitions and hooks
    glue = {"stepdefinitions", "hooks"},

    // Tags to include/exclude scenarios
    tags = "@smoke or @regression",

    // Report plugins
    plugin = {
        "pretty",                    // Console output
        "html:target/cucumber.html", // HTML report
        "json:target/cucumber.json", // JSON report
        "junit:target/cucumber.xml"  // XML report
    },

    // Make console output readable
    monochrome = true,

    // Check for undefined steps without execution
    dryRun = false,

    // Strict mode (fail on undefined/pending steps)
    strict = true,

    // Publish report to Cucumber Reports
    publish = false
)
```

---

## 14. TestNG/JUnit with Cucumber

### TestNG Integration

**TestNG Runner with Parallel Execution:**

```java
package runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Parameters;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    tags = "@smoke",
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json"
    }
)
public class ParallelTestRunner extends AbstractTestNGCucumberTests {

    @BeforeClass
    @Parameters({"browser"})
    public void setUp(String browser) {
        System.out.println("Setting up browser: " + browser);
        System.setProperty("browser", browser);
    }

    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }

    @AfterClass
    public void tearDown() {
        System.out.println("Test execution completed");
    }
}
```

**testng.xml:**

```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Cucumber Test Suite" parallel="tests" thread-count="3">

    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="runners.ParallelTestRunner"/>
        </classes>
    </test>

    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="runners.ParallelTestRunner"/>
        </classes>
    </test>

</suite>
```

### JUnit Integration

**JUnit 4 Runner:**

```java
package runners;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    tags = "@regression",
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html"
    }
)
public class JUnit4Runner {

    @BeforeClass
    public static void setUp() {
        System.out.println("Before all tests");
    }

    @AfterClass
    public static void tearDown() {
        System.out.println("After all tests");
    }
}
```

**JUnit 5 Runner:**

```java
package runners;

import io.cucumber.junit.platform.engine.Constants;
import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(
    key = Constants.GLUE_PROPERTY_NAME,
    value = "stepdefinitions,hooks"
)
@ConfigurationParameter(
    key = Constants.FILTER_TAGS_PROPERTY_NAME,
    value = "@smoke"
)
@ConfigurationParameter(
    key = Constants.PLUGIN_PROPERTY_NAME,
    value = "pretty, html:target/cucumber-reports/cucumber.html"
)
public class JUnit5Runner {
}
```

---

## 15. Cucumber Reporting

### Built-in Reports

**Cucumber HTML Report:**

```java
@CucumberOptions(
    plugin = {"html:target/cucumber-reports/cucumber.html"}
)
```

**Cucumber JSON Report:**

```java
@CucumberOptions(
    plugin = {"json:target/cucumber-reports/cucumber.json"}
)
```

**Cucumber XML Report (JUnit format):**

```java
@CucumberOptions(
    plugin = {"junit:target/cucumber-reports/cucumber.xml"}
)
```

### Multiple Report Formats

```java
@CucumberOptions(
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json",
        "junit:target/cucumber-reports/cucumber.xml",
        "timeline:target/cucumber-reports/timeline"
    }
)
```

### Custom Report Generation

**ReportGenerator.java:**

```java
package utils;

import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class ReportGenerator {

    public static void generateReport(String jsonFilePath) {
        File reportOutputDirectory = new File("target/cucumber-html-reports");
        List<String> jsonFiles = new ArrayList<>();
        jsonFiles.add(jsonFilePath);

        String projectName = "Cucumber Selenium Framework";

        Configuration configuration = new Configuration(
            reportOutputDirectory,
            projectName
        );

        // Additional metadata
        configuration.setBuildNumber("1.0");
        configuration.addClassifications("Platform", "Windows");
        configuration.addClassifications("Browser", "Chrome");
        configuration.addClassifications("Environment", "QA");

        ReportBuilder reportBuilder = new ReportBuilder(
            jsonFiles,
            configuration
        );
        reportBuilder.generateReports();

        System.out.println("Report generated at: " +
            reportOutputDirectory.getAbsolutePath());
    }
}
```

---

## 16. Extent Reports with Cucumber

### Extent Reports Configuration

**extent.properties:**

```properties
extent.reporter.spark.start=true
extent.reporter.spark.out=target/extent-reports/SparkReport.html
extent.reporter.spark.config=src/test/resources/extent-config.xml

screenshot.dir=target/screenshots/
screenshot.rel.path=../screenshots/

extent.reporter.pdf.start=true
extent.reporter.pdf.out=target/extent-reports/ExtentPdf.pdf

basefolder.name=target/extent-reports
basefolder.datetimepattern=d-MMM-YY HH-mm-ss

systeminfo.os=Windows 10
systeminfo.browser=Chrome
systeminfo.environment=QA
```

**extent-config.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<extentreports>
    <configuration>
        <theme>dark</theme>
        <encoding>UTF-8</encoding>
        <protocol>https</protocol>

        <documentTitle>Cucumber Test Report</documentTitle>
        <reportName>Automation Test Results</reportName>

        <timeStampFormat>MMM dd, yyyy HH:mm:ss</timeStampFormat>

        <scripts>
            <![CDATA[
                $(document).ready(function() {
                    // Custom JavaScript
                });
            ]]>
        </scripts>

        <styles>
            <![CDATA[
                /* Custom CSS */
                .test-name {
                    font-weight: bold;
                }
            ]]>
        </styles>
    </configuration>
</extentreports>
```

### Extent Reports Runner

```java
package runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.DataProvider;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    tags = "@smoke",
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json",
        "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:"
    },
    monochrome = true
)
public class ExtentReportRunner extends AbstractTestNGCucumberTests {

    @Override
    @DataProvider(parallel = false)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
```

### Custom Extent Report Hooks

```java
package hooks;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import utils.DriverManager;

public class ExtentReportHooks {

    private static ExtentReports extent;
    private static ThreadLocal<ExtentTest> extentTest = new ThreadLocal<>();

    @Before
    public void setUp(Scenario scenario) {
        if (extent == null) {
            ExtentSparkReporter sparkReporter = new ExtentSparkReporter(
                "target/extent-reports/ExtentReport.html"
            );
            sparkReporter.config().setDocumentTitle("Test Report");
            sparkReporter.config().setReportName("Automation Report");

            extent = new ExtentReports();
            extent.attachReporter(sparkReporter);
            extent.setSystemInfo("OS", System.getProperty("os.name"));
            extent.setSystemInfo("Browser", "Chrome");
        }

        ExtentTest test = extent.createTest(scenario.getName());
        extentTest.set(test);

        test.info("Scenario: " + scenario.getName());
        test.info("Tags: " + scenario.getSourceTagNames());
    }

    @After
    public void tearDown(Scenario scenario) {
        ExtentTest test = extentTest.get();

        if (scenario.isFailed()) {
            test.log(Status.FAIL, "Scenario Failed");

            byte[] screenshot = ((TakesScreenshot) DriverManager.getDriver())
                .getScreenshotAs(OutputType.BYTES);
            test.addScreenCaptureFromBase64String(
                java.util.Base64.getEncoder().encodeToString(screenshot),
                scenario.getName()
            );
        } else {
            test.log(Status.PASS, "Scenario Passed");
        }

        extent.flush();
    }
}
```

---

## 17. Best Practices for BDD Automation

### 1. Feature File Best Practices

```gherkin
# GOOD - Declarative, business-focused
Feature: User Registration

  Scenario: Register new user successfully
    Given I am on the registration page
    When I complete registration with valid details
    Then my account should be created
    And I should receive confirmation email

# BAD - Imperative, UI-focused
Feature: Registration

  Scenario: User registration
    Given I navigate to http://example.com/register
    When I type "John" in first name textbox with id "fname"
    And I type "Doe" in last name textbox with id "lname"
    And I click submit button
    Then I verify success message appears
```

### 2. Step Definition Best Practices

```java
// GOOD - Reusable, single responsibility
@When("I complete registration with valid details")
public void completeRegistration() {
    User user = TestDataGenerator.generateValidUser();
    registrationPage.fillRegistrationForm(user);
    registrationPage.submit();
}

// BAD - Not reusable, too specific
@When("I type John in first name and Doe in last name")
public void fillSpecificNames() {
    registrationPage.enterFirstName("John");
    registrationPage.enterLastName("Doe");
}
```

### 3. Use Background Wisely

```gherkin
# GOOD - Common setup for all scenarios
Feature: Shopping Cart

  Background:
    Given I am logged in as customer
    And I am on the products page

  Scenario: Add product to cart
    When I add "Laptop" to cart
    Then cart should contain "Laptop"

# BAD - Background with scenario-specific steps
Feature: Shopping Cart

  Background:
    Given I am logged in as customer
    And I have "Laptop" in cart  # Too specific
```

### 4. Keep Scenarios Independent

```gherkin
# GOOD - Each scenario can run independently
Scenario: Create order
  Given I am logged in
  And I have products in cart
  When I place the order
  Then order should be created

Scenario: Cancel order
  Given I am logged in
  And I have an order in the system
  When I cancel the order
  Then order status should be cancelled

# BAD - Scenarios depend on each other
Scenario: Create order
  When I place an order

Scenario: Cancel order
  Given order from previous scenario
  When I cancel it
```

### 5. Use Tags Effectively

```gherkin
@critical @smoke
Scenario: User login

@regression @ui
Scenario: User profile update

@wip @ignore
Scenario: New feature in progress
```

### 6. Maintain DRY Principle

```java
// GOOD - Reusable helper method
public void login(String username, String password) {
    loginPage.enterUsername(username);
    loginPage.enterPassword(password);
    loginPage.clickLogin();
}

@Given("I am logged in as admin")
public void loginAsAdmin() {
    login("admin@example.com", "AdminPass123");
}

@Given("I am logged in as customer")
public void loginAsCustomer() {
    login("customer@example.com", "CustomerPass123");
}
```

### 7. Use Scenario Context

```java
public class ScenarioContext {
    private Map<String, Object> context = new HashMap<>();

    public void setContext(String key, Object value) {
        context.put(key, value);
    }

    public Object getContext(String key) {
        return context.get(key);
    }
}

// Usage in step definitions
@When("I create a new order")
public void createOrder() {
    Order order = orderService.createOrder();
    scenarioContext.setContext("current_order", order);
}

@Then("order should be visible in order list")
public void verifyOrder() {
    Order order = (Order) scenarioContext.getContext("current_order");
    assertTrue(orderPage.isOrderDisplayed(order.getId()));
}
```

---

## 18. Common Pitfalls and Solutions

### Pitfall 1: Mixing UI Implementation in Features

```gherkin
# BAD
Scenario: Login
  When I enter "john@example.com" in textbox with id "username"
  And I enter "password" in textbox with id "pwd"
  And I click button with class "btn-login"

# GOOD
Scenario: Login
  When I login with email "john@example.com" and password "password"
  Then I should be logged in successfully
```

### Pitfall 2: Too Many Steps in One Scenario

```gherkin
# BAD - Too long, hard to maintain
Scenario: Complete purchase flow
  Given I am logged in
  When I search for "laptop"
  And I click on first product
  And I add product to cart
  And I update quantity to 2
  And I proceed to checkout
  And I enter shipping address
  And I select express shipping
  And I enter payment details
  And I confirm order
  Then order should be placed

# GOOD - Break into smaller scenarios
Scenario: Add product to cart
  Given I am on product page
  When I add product to cart
  Then cart should contain the product

Scenario: Complete checkout
  Given I have products in cart
  When I complete checkout process
  Then order should be placed successfully
```

### Pitfall 3: Scenario Dependencies

```gherkin
# BAD - Dependent scenarios
@order_1
Scenario: Create user
  When I create user "John"

@order_2
Scenario: User places order
  Given user "John" exists
  When "John" places an order

# GOOD - Independent scenarios
Scenario: Create user
  When I create a new user
  Then user should be created

Scenario: User places order
  Given a user exists in the system
  When user places an order
  Then order should be created
```

### Pitfall 4: Not Using Page Objects

```java
// BAD - Direct WebDriver calls in step definitions
@When("I login")
public void login() {
    driver.findElement(By.id("username")).sendKeys("user");
    driver.findElement(By.id("password")).sendKeys("pass");
    driver.findElement(By.id("login")).click();
}

// GOOD - Using Page Objects
@When("I login")
public void login() {
    loginPage.login("user", "pass");
}
```

### Pitfall 5: Hardcoded Test Data

```gherkin
# BAD
Scenario: Register user
  When I register with "john@example.com" and "Password123"

# GOOD
Scenario: Register user
  When I register with valid credentials
  Then registration should be successful
```

---

## 19. Complete BDD Framework Example

### Project Structure

```
bdd-cucumber-framework/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/
│   │       │   ├── BasePage.java
│   │       │   ├── LoginPage.java
│   │       │   └── HomePage.java
│   │       ├── utils/
│   │       │   ├── DriverManager.java
│   │       │   ├── ConfigReader.java
│   │       │   └── TestDataGenerator.java
│   │       └── models/
│   │           └── User.java
│   └── test/
│       ├── java/
│       │   ├── runners/
│       │   │   ├── TestRunner.java
│       │   │   └── SmokeTestRunner.java
│       │   ├── stepdefinitions/
│       │   │   ├── LoginSteps.java
│       │   │   ├── RegistrationSteps.java
│       │   │   └── CommonSteps.java
│       │   ├── hooks/
│       │   │   └── Hooks.java
│       │   └── context/
│       │       ├── TestContext.java
│       │       └── ScenarioContext.java
│       └── resources/
│           ├── features/
│           │   ├── login.feature
│           │   └── registration.feature
│           ├── config.properties
│           ├── extent.properties
│           └── log4j2.xml
├── pom.xml
└── README.md
```

### Complete Feature File

**registration.feature:**

```gherkin
@registration
Feature: User Registration
  As a new user
  I want to register an account
  So that I can access the application

  Background:
    Given the application is accessible
    And I am on the registration page

  @smoke @positive
  Scenario: Successful registration with valid details
    When I register with the following details
      | Field         | Value                |
      | First Name    | John                 |
      | Last Name     | Doe                  |
      | Email         | john.doe@example.com |
      | Password      | SecurePass@123       |
      | Phone         | 1234567890           |
    Then registration should be successful
    And I should receive welcome email
    And I should be automatically logged in

  @negative @validation
  Scenario Outline: Registration validation for invalid inputs
    When I register with following details
      | Field         | Value         |
      | First Name    | <first_name>  |
      | Last Name     | <last_name>   |
      | Email         | <email>       |
      | Password      | <password>    |
    Then I should see error "<error_message>"
    And registration should not be completed

    Examples:
      | first_name | last_name | email              | password    | error_message           |
      |            | Doe       | john@example.com   | Pass@123    | First name required     |
      | John       |           | john@example.com   | Pass@123    | Last name required      |
      | John       | Doe       |                    | Pass@123    | Email required          |
      | John       | Doe       | invalid-email      | Pass@123    | Invalid email format    |
      | John       | Doe       | john@example.com   |             | Password required       |
      | John       | Doe       | john@example.com   | weak        | Password too weak       |

  @duplicate
  Scenario: Registration with existing email
    Given user with email "existing@example.com" already exists
    When I register with email "existing@example.com"
    Then I should see error "Email already registered"
    And I should see link to login page
```

### Complete Step Definitions

**RegistrationSteps.java:**

```java
package stepdefinitions;

import io.cucumber.java.en.*;
import io.cucumber.datatable.DataTable;
import context.TestContext;
import models.User;
import pages.RegistrationPage;
import pages.HomePage;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.Map;

public class RegistrationSteps {

    private TestContext context;
    private RegistrationPage registrationPage;
    private HomePage homePage;

    public RegistrationSteps(TestContext context) {
        this.context = context;
        this.registrationPage = context.getRegistrationPage();
        this.homePage = context.getHomePage();
    }

    @Given("I am on the registration page")
    public void navigateToRegistrationPage() {
        context.getDriver().get(
            ConfigReader.getProperty("base.url") + "/register"
        );
        assertThat(registrationPage.isDisplayed())
            .as("Registration page should be displayed")
            .isTrue();
    }

    @When("I register with the following details")
    public void registerWithDetails(DataTable dataTable) {
        Map<String, String> userDetails = dataTable.asMap();

        User user = new User();
        user.setFirstName(userDetails.get("First Name"));
        user.setLastName(userDetails.get("Last Name"));
        user.setEmail(userDetails.get("Email"));
        user.setPassword(userDetails.get("Password"));
        user.setPhone(userDetails.get("Phone"));

        registrationPage.fillRegistrationForm(user);
        registrationPage.submitRegistration();

        // Store user in scenario context
        context.getScenarioContext().setContext("current_user", user);
    }

    @When("I register with email {string}")
    public void registerWithEmail(String email) {
        User user = TestDataGenerator.generateRandomUser();
        user.setEmail(email);

        registrationPage.fillRegistrationForm(user);
        registrationPage.submitRegistration();
    }

    @Then("registration should be successful")
    public void verifySuccessfulRegistration() {
        assertThat(registrationPage.isRegistrationSuccessful())
            .as("Registration should be successful")
            .isTrue();

        String successMessage = registrationPage.getSuccessMessage();
        assertThat(successMessage)
            .as("Success message should be displayed")
            .contains("Registration successful");
    }

    @Then("I should receive welcome email")
    public void verifyWelcomeEmail() {
        User user = (User) context.getScenarioContext()
            .getContext("current_user");

        // Verify email was sent (mocked or actual)
        boolean emailSent = EmailService.wasEmailSent(
            user.getEmail(),
            "Welcome"
        );

        assertThat(emailSent)
            .as("Welcome email should be sent")
            .isTrue();
    }

    @Then("I should be automatically logged in")
    public void verifyAutoLogin() {
        assertThat(homePage.isDisplayed())
            .as("Home page should be displayed after registration")
            .isTrue();

        assertThat(homePage.isUserLoggedIn())
            .as("User should be automatically logged in")
            .isTrue();
    }

    @Then("I should see error {string}")
    public void verifyErrorMessage(String expectedError) {
        String actualError = registrationPage.getErrorMessage();
        assertThat(actualError)
            .as("Expected error message to be displayed")
            .contains(expectedError);
    }

    @Then("registration should not be completed")
    public void verifyRegistrationNotCompleted() {
        assertThat(registrationPage.isDisplayed())
            .as("Should still be on registration page")
            .isTrue();
    }

    @Given("user with email {string} already exists")
    public void createExistingUser(String email) {
        // Create user in database or via API
        UserService.createUser(email);
    }

    @Then("I should see link to login page")
    public void verifyLoginLink() {
        assertThat(registrationPage.isLoginLinkDisplayed())
            .as("Login link should be displayed")
            .isTrue();
    }
}
```

---

## 20. Beginner-Friendly Exercises

### Exercise 1: Create Your First BDD Login Feature (45 minutes)

**Objective:** Write a complete BDD feature file with step definitions for login functionality.

**Real-World Scenario:**
You're testing an e-commerce application's login feature. Users need to login with email and password to access their account.

**Requirements:**
1. Create login.feature file with 3 scenarios (valid login, invalid password, empty fields)
2. Write step definitions for all Gherkin steps
3. Create LoginPage using Page Object Model
4. Implement proper waits and assertions
5. Generate Cucumber HTML report

**Code Template:**
```gherkin
@login
Feature: User Login
  As a registered user
  I want to login to my account
  So that I can access personalized features

  Background:
    # TODO: Add background step to navigate to login page

  @smoke @positive
  Scenario: Successful login with valid credentials
    # TODO: Add Given, When, Then steps

  @negative
  Scenario: Login fails with invalid password
    # TODO: Add steps for invalid login

  @validation
  Scenario: Login validation for empty fields
    # TODO: Add steps for field validation
```

**Expected Outcome:**
- All scenarios execute successfully
- Step definitions properly implemented
- Page Object separates UI logic from test logic
- Cucumber report generated with pass/fail status
- Screenshots captured for failures

**Common Mistakes to Avoid:**
1. Writing imperative steps instead of declarative
2. Adding assertions in page objects
3. Not using Background for common steps
4. Hardcoding test data in step definitions
5. Forgetting to initialize PageFactory

**Solution Approach:**
1. Start with Gherkin scenarios using Given-When-Then
2. Create LoginPage with WebElements and methods
3. Implement step definitions that call page methods
4. Use TestContext to share data between steps
5. Configure Cucumber runner with appropriate options

---

### Exercise 2: Data-Driven BDD Shopping Cart (50 minutes)

**Objective:** Implement shopping cart scenarios using Scenario Outline and data tables.

**Real-World Scenario:**
Test adding multiple products to cart with different quantities and prices, then verify the total amount calculation.

**Requirements:**
1. Create shopping-cart.feature with Scenario Outline
2. Use Examples table with 5+ product combinations
3. Implement Data Table for product details
4. Create CartPage with add/remove/update methods
5. Verify cart total calculation with each scenario

**Code Template:**
```gherkin
@cart
Feature: Shopping Cart Management

  Background:
    # TODO: Login and navigate to products page

  @regression
  Scenario Outline: Add multiple products to cart
    When I add the following products to cart
      | Product   | Quantity   | Price   |
      | <product> | <quantity> | <price> |
    Then cart should show <quantity> items
    And cart total should be <expected_total>

    Examples:
      | product  | quantity | price  | expected_total |
      # TODO: Add 5+ test data rows

  @negative
  Scenario: Verify cart calculations with discounts
    # TODO: Add discount scenario
```

**Expected Outcome:**
- Scenario Outline runs for each example row
- Data table properly handled in step definitions
- Cart total calculations verified
- All edge cases covered (discounts, taxes)
- Each example generates separate test result

**Common Mistakes to Avoid:**
1. Not handling DataTable correctly in step definitions
2. Mixing different data table formats
3. Hardcoding calculations instead of using dynamic values
4. Not clearing cart between scenarios
5. Missing edge cases in Examples table

**Solution Approach:**
1. Define Scenario Outline with placeholders
2. Create Examples table with comprehensive test data
3. Use DataTable in step definitions: `List<Map<String, String>>`
4. Loop through products and add to cart
5. Implement cart total calculation verification

---

### Exercise 3: User Registration with BDD and API Validation (50 minutes)

**Objective:** Create hybrid BDD tests combining UI actions with API validation.

**Real-World Scenario:**
User registers through UI, then verify the user is created in database via API. This ensures UI and backend are in sync.

**Requirements:**
1. Create registration.feature with multiple validation scenarios
2. Implement UI steps for registration form
3. Add API step to verify user created in backend
4. Use Background for setup steps
5. Handle both positive and negative scenarios

**Code Template:**
```gherkin
@registration
Feature: User Registration

  Background:
    # TODO: Navigate to registration page

  @smoke
  Scenario: New user registration successful
    When I register with the following details
      | Field     | Value              |
      | Name      | TODO               |
      | Email     | TODO               |
      | Password  | TODO               |
    Then I should see registration success message
    And user should be created in database via API
    And welcome email should be sent

  @validation
  Scenario Outline: Registration validation
    # TODO: Add validation scenarios

    Examples:
      | field    | value   | error_message |
      # TODO: Add validation test data
```

**Expected Outcome:**
- UI registration completes successfully
- API validates user exists in backend
- Both UI and API assertions pass
- Validation scenarios catch all edge cases
- Proper error messages displayed for invalid inputs

**Common Mistakes to Avoid:**
1. Not cleaning up test data after scenario
2. Using same email for multiple test runs
3. Not verifying API response status codes
4. Missing timeout handling for API calls
5. Hardcoding API endpoints

**Solution Approach:**
1. Create RegistrationPage for UI interactions
2. Add API utility class for backend verification
3. Use unique identifiers (timestamp) for test data
4. Implement cleanup in @After hook
5. Store created user ID in ScenarioContext for cleanup

---

### Exercise 4: BDD Search Functionality with Tags (45 minutes)

**Objective:** Implement search feature scenarios with proper tag organization and filtering.

**Real-World Scenario:**
E-commerce site search needs to handle various scenarios: valid searches, no results, filters, sorting, and search suggestions.

**Requirements:**
1. Create search.feature with 6+ scenarios
2. Use tags for organization (@smoke, @regression, @negative)
3. Implement search with filters and sorting
4. Verify search results count and content
5. Handle "no results found" scenario

**Code Template:**
```gherkin
@search
Feature: Product Search

  Background:
    # TODO: Navigate to search page

  @smoke @positive
  Scenario: Search with valid product name
    # TODO: Implement valid search

  @regression
  Scenario: Search with filters applied
    Given I am on search page
    When I search for "laptop"
    And I apply the following filters
      | Filter   | Value      |
      | Brand    | Dell       |
      | Price    | 500-1000   |
      | Rating   | 4+         |
    Then I should see filtered results
    And all results should match filters

  @negative
  Scenario: Search with no results
    # TODO: Implement no results scenario
```

**Expected Outcome:**
- Different tag combinations execute correctly
- Filters work as expected
- Results are properly validated
- No results scenario handled gracefully
- Each scenario is independent

**Common Mistakes to Avoid:**
1. Not making scenarios independent
2. Using wrong tag expressions
3. Forgetting to clear previous search state
4. Not waiting for search results to load
5. Hardcoding expected result counts

**Solution Approach:**
1. Create SearchPage with filter methods
2. Implement tag-based execution in runner
3. Use WebDriverWait for dynamic results
4. Verify results with flexible assertions
5. Clear search state in Background or Before hook

---

### Exercise 5: BDD Reporting and Hooks (40 minutes)

**Objective:** Implement comprehensive BDD reporting with hooks for setup/teardown and screenshots.

**Real-World Scenario:**
Create detailed test reports with screenshots, execution time, and proper test organization for stakeholders.

**Requirements:**
1. Configure multiple Cucumber report plugins
2. Implement @Before and @After hooks
3. Capture screenshots on failure
4. Add execution time tracking
5. Generate both HTML and JSON reports

**Code Template:**
```java
// TODO: Create Hooks class
public class Hooks {

    @Before
    public void setUp(Scenario scenario) {
        // TODO: Initialize driver
        // TODO: Log scenario start
    }

    @After
    public void tearDown(Scenario scenario) {
        // TODO: Check if scenario failed
        // TODO: Capture screenshot
        // TODO: Attach to report
        // TODO: Close driver
    }

    @BeforeStep
    public void beforeStep() {
        // TODO: Optional step logging
    }

    @AfterStep
    public void afterStep(Scenario scenario) {
        // TODO: Capture screenshot after each step (optional)
    }
}

// Runner configuration
@CucumberOptions(
    plugin = {
        // TODO: Add report plugins
    }
)
```

**Expected Outcome:**
- HTML report generated with all scenarios
- JSON report available for CI/CD integration
- Screenshots embedded in reports for failures
- Execution time tracked for each scenario
- Hooks execute in correct order

**Common Mistakes to Avoid:**
1. Not attaching screenshots to Cucumber report
2. Using wrong image format for screenshots
3. Not handling driver null checks in @After
4. Forgetting to configure report output path
5. Not using Scenario object to check test status

**Solution Approach:**
1. Create Hooks class with @Before/@After annotations
2. Use Scenario.isFailed() to check test status
3. Capture screenshot as byte array
4. Attach to scenario: scenario.attach(bytes, "image/png", name)
5. Configure plugins in @CucumberOptions

---

### Exercise 6: Complete BDD Framework Integration (60 minutes)

**Objective:** Build an end-to-end BDD feature with Page Objects, TestContext, API validation, and comprehensive reporting.

**Real-World Scenario:**
Create a complete user journey: Registration → Login → Add to Cart → Checkout → Order Confirmation, with UI and API validations at each step.

**Requirements:**
1. Create multi-scenario feature file for complete flow
2. Implement Page Objects for each page
3. Use TestContext to share data between steps
4. Add API validations at key points
5. Generate comprehensive test report

**Code Template:**
```gherkin
@e2e @complete-flow
Feature: Complete User Journey

  Background:
    Given the application is accessible

  @critical
  Scenario: Complete purchase flow
    When I register a new user account
    Then user should be created via API

    When I login with registered credentials
    Then I should see dashboard

    When I search for "laptop"
    And I add first product to cart
    Then cart count should be 1
    And cart should be updated via API

    When I proceed to checkout
    And I complete payment
    Then order should be placed successfully
    And order should exist in database via API
    And confirmation email should be sent
```

**Expected Outcome:**
- Complete flow executes end-to-end
- All UI and API validations pass
- TestContext properly shares data across steps
- Test data cleaned up after execution
- Comprehensive report with all steps

**Common Mistakes to Avoid:**
1. Not handling dependencies between steps
2. Missing data cleanup causing test failures
3. Not using unique test data identifiers
4. Hardcoding user credentials
5. Not implementing proper wait strategies

**Solution Approach:**
1. Create TestContext class to store shared data
2. Implement Page Objects for each application page
3. Use DI (Dependency Injection) for context sharing
4. Add API validation steps alongside UI steps
5. Implement @AfterScenario hook for cleanup
6. Generate Extent Report with screenshots

---

## 21. Key Takeaways

1. **BDD** focuses on behavior from user perspective
2. **Gherkin** provides business-readable test scenarios
3. **Feature files** serve as living documentation
4. **Step definitions** connect Gherkin to automation code
5. **Page Object Model** maintains clean separation of concerns
6. **Background** defines common setup for scenarios
7. **Scenario Outline** enables data-driven testing
8. **Data Tables** handle complex test data
9. **Tags** organize and filter test execution
10. **Hooks** manage setup and teardown operations
11. **TestContext** shares state between steps
12. **Extent Reports** provide comprehensive test reports
13. **Best practices** ensure maintainable BDD framework
14. **Independent scenarios** are crucial for reliability
15. **Declarative steps** improve readability and maintenance
16. **DRY principle** reduces code duplication
17. **Proper organization** makes framework scalable
18. **Clear naming** improves understanding
19. **Avoid UI details** in feature files
20. **Focus on business value** not technical implementation

---

## 22. Interview Questions

### Basic Level

1. **What is BDD and how is it different from TDD?**
   - BDD focuses on behavior from business perspective using natural language, while TDD focuses on unit testing with technical language.

2. **What is Gherkin language?**
   - Gherkin is a domain-specific language for writing test scenarios in human-readable format using keywords like Given, When, Then.

3. **Explain the purpose of Given, When, Then keywords.**
   - Given: Sets up preconditions
   - When: Describes the action/event
   - Then: Verifies expected outcome

4. **What is a feature file?**
   - A feature file contains test scenarios written in Gherkin language with .feature extension.

5. **What are step definitions?**
   - Step definitions are Java methods that implement the steps written in Gherkin scenarios, connecting feature files to automation code.

### Intermediate Level

6. **What is the difference between Scenario and Scenario Outline?**
   - Scenario is a single test case, while Scenario Outline is a template that runs multiple times with different data from Examples table.

7. **Explain the purpose of Background in Cucumber.**
   - Background defines common setup steps that run before each scenario in a feature file.

8. **How do you handle test data in Cucumber?**
   - Using Data Tables, Scenario Outline with Examples, external files (Excel, JSON), or test data generators.

9. **What are Cucumber Hooks?**
   - Hooks are methods annotated with @Before, @After, @BeforeStep, @AfterStep that run before/after scenarios or steps.

10. **How do you implement parallel execution in Cucumber?**
    - Using TestNG DataProvider with parallel=true or JUnit parallel execution features.

### Advanced Level

11. **How do you implement Page Object Model with Cucumber?**
    - Create page classes with WebElement locators and action methods, use TestContext to share page objects across step definitions.

12. **Explain how to integrate Extent Reports with Cucumber.**
    - Add Extent Reports Cucumber adapter dependency, configure extent.properties, use ExtentCucumberAdapter plugin in CucumberOptions.

13. **How do you handle dynamic test data in BDD framework?**
    - Use ScenarioContext to store and retrieve data between steps, or use dependency injection frameworks like PicoContainer.

14. **What are Cucumber tags and how are they used?**
    - Tags are annotations (@tagname) used to organize, filter, and selectively execute scenarios. Can be combined with AND, OR, NOT operators.

15. **How do you implement cross-browser testing in Cucumber framework?**
    - Use DriverManager with browser parameter, configure TestNG with multiple browser parameters, or use Selenium Grid for parallel execution.

---

## Common Mistakes to Avoid

### 1. Writing Implementation Details in Gherkin Scenarios

**Problem:**
```gherkin
Scenario: User logs into the application
  Given I navigate to "https://example.com/login"
  When I locate element with id "username" and send keys "testuser"
  And I locate element with id "password" and send keys "pass123"
  And I locate element with xpath "//button[@type='submit']" and click
  Then I verify element with class "dashboard-header" is displayed
```

**Why It's Wrong:**
- Gherkin becomes too technical and loses business readability
- Exposes implementation details (IDs, XPaths) in feature files
- Non-technical stakeholders cannot understand the scenarios
- Defeats the purpose of BDD as living documentation
- Tightly couples feature files to UI implementation

**Correct Approach:**
```gherkin
Scenario: User logs into the application
  Given the user is on the login page
  When the user enters valid credentials
  And the user clicks the login button
  Then the user should be redirected to the dashboard

# Step Definitions separate the "what" from the "how"
```

**Step Definition Implementation:**
```java
public class LoginSteps {

    private WebDriver driver;
    private LoginPage loginPage;
    private DashboardPage dashboardPage;

    public LoginSteps(TestContext context) {
        this.driver = context.getDriver();
        this.loginPage = new LoginPage(driver);
        this.dashboardPage = new DashboardPage(driver);
    }

    @Given("the user is on the login page")
    public void userIsOnLoginPage() {
        loginPage.navigateToLoginPage();
    }

    @When("the user enters valid credentials")
    public void userEntersValidCredentials() {
        // Read credentials from config, not hardcoded
        String username = ConfigReader.getProperty("valid.username");
        String password = ConfigReader.getProperty("valid.password");
        loginPage.enterCredentials(username, password);
    }

    @When("the user clicks the login button")
    public void userClicksLoginButton() {
        loginPage.clickLoginButton();
    }

    @Then("the user should be redirected to the dashboard")
    public void userShouldBeRedirectedToDashboard() {
        Assert.assertTrue(dashboardPage.isDashboardDisplayed(),
            "Dashboard should be displayed after successful login");
        Assert.assertEquals(driver.getCurrentUrl(),
            ConfigReader.getProperty("dashboard.url"),
            "URL should match dashboard URL");
    }
}
```

---

### 2. Not Using TestContext for Sharing State Between Step Definitions

**Problem:**
```java
// LoginSteps.java
public class LoginSteps {
    private static WebDriver driver; // Static - causes issues in parallel execution
    private static String username; // Shared across all threads

    @Given("user logs in as {string}")
    public void userLogsIn(String user) {
        username = user;
        // ...
    }
}

// OrderSteps.java
public class OrderSteps {
    private static WebDriver driver; // Same static driver

    @When("user creates an order")
    public void userCreatesOrder() {
        // Uses shared static driver - thread-safety issues
    }
}
```

**Why It's Wrong:**
- Static variables cause thread-safety issues in parallel execution
- Different scenarios interfere with each other
- Cannot run tests in parallel reliably
- Difficult to manage state across multiple step definition classes
- Memory leaks from not cleaning up static resources

**Correct Approach:**
```java
// TestContext.java - Manages shared state per scenario
public class TestContext {

    private WebDriver driver;
    private ScenarioContext scenarioContext;
    private PageObjectManager pageObjectManager;

    public TestContext() {
        driver = DriverFactory.createDriver();
        scenarioContext = new ScenarioContext();
        pageObjectManager = new PageObjectManager(driver);
    }

    public WebDriver getDriver() {
        return driver;
    }

    public ScenarioContext getScenarioContext() {
        return scenarioContext;
    }

    public PageObjectManager getPageObjectManager() {
        return pageObjectManager;
    }

    public void quitDriver() {
        if (driver != null) {
            driver.quit();
        }
    }
}

// ScenarioContext.java - Stores data within scenario
public class ScenarioContext {

    private Map<String, Object> scenarioData;

    public ScenarioContext() {
        scenarioData = new HashMap<>();
    }

    public void setContext(String key, Object value) {
        scenarioData.put(key, value);
    }

    public Object getContext(String key) {
        return scenarioData.get(key);
    }

    public Boolean containsKey(String key) {
        return scenarioData.containsKey(key);
    }
}

// Use PicoContainer for dependency injection
// LoginSteps.java
public class LoginSteps {

    private TestContext testContext;
    private LoginPage loginPage;

    // Constructor injection via PicoContainer
    public LoginSteps(TestContext testContext) {
        this.testContext = testContext;
        this.loginPage = testContext.getPageObjectManager().getLoginPage();
    }

    @When("user logs in as {string}")
    public void userLogsIn(String username) {
        loginPage.login(username, "password");
        // Store username in scenario context for later use
        testContext.getScenarioContext().setContext("LOGGED_IN_USER", username);
    }
}

// OrderSteps.java
public class OrderSteps {

    private TestContext testContext;
    private OrderPage orderPage;

    public OrderSteps(TestContext testContext) {
        this.testContext = testContext;
        this.orderPage = testContext.getPageObjectManager().getOrderPage();
    }

    @When("user creates an order")
    public void userCreatesOrder() {
        // Retrieve data from scenario context
        String username = (String) testContext.getScenarioContext()
                                              .getContext("LOGGED_IN_USER");
        orderPage.createOrder(username);
    }
}

// Hooks.java
public class Hooks {

    private TestContext testContext;

    public Hooks(TestContext testContext) {
        this.testContext = testContext;
    }

    @After
    public void afterScenario(Scenario scenario) {
        // Clean up per scenario
        if (scenario.isFailed()) {
            // Take screenshot
            byte[] screenshot = ((TakesScreenshot) testContext.getDriver())
                    .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", "Screenshot on failure");
        }
        testContext.quitDriver();
    }
}
```

**POM Dependency for PicoContainer:**
```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-picocontainer</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
</dependency>
```

---

### 3. Overusing Scenario Outline Without Proper Validation

**Problem:**
```gherkin
Scenario Outline: User searches for products
  Given user is on search page
  When user searches for "<product>"
  Then results should be displayed

  Examples:
    | product   |
    | laptop    |
    | phone     |
    | tablet    |
    | watch     |
    | camera    |
    # ... 50 more rows without actual verification
```

**Why It's Wrong:**
- Tests become data-driven without meaningful assertions
- Just verifying "results displayed" doesn't validate correctness
- Creates numerous scenarios without adding test coverage
- Increases execution time without proportional value
- Masks failures in bulk execution

**Correct Approach:**
```gherkin
# Use Scenario Outline for meaningful variations with proper validation
Scenario Outline: User searches for products with different filters
  Given user is on the search page
  When user searches for "<product>" in category "<category>"
  And user applies price filter from <minPrice> to <maxPrice>
  Then search results should contain products matching "<product>"
  And all results should be in category "<category>"
  And all prices should be between <minPrice> and <maxPrice>
  And results count should be at least <expectedCount>

  Examples:
    | product  | category    | minPrice | maxPrice | expectedCount |
    | laptop   | Electronics | 500      | 2000     | 5             |
    | tablet   | Electronics | 200      | 800      | 3             |
    | watch    | Accessories | 50       | 500      | 10            |

# For large datasets, use single scenario with data table
Scenario: Verify product search functionality for multiple categories
  Given user is on the search page
  When user searches for products in following categories
    | Category    | Expected Products                    |
    | Electronics | laptop, phone, tablet, headphones    |
    | Clothing    | shirt, pants, jacket, shoes          |
    | Books       | fiction, non-fiction, textbooks      |
  Then each category should return relevant results
  And results should be properly categorized
```

**Step Definition with Proper Validation:**
```java
@When("user searches for {string} in category {string}")
public void userSearchesInCategory(String product, String category) {
    searchPage.selectCategory(category);
    searchPage.searchFor(product);
}

@When("user applies price filter from {int} to {int}")
public void userAppliesPriceFilter(int minPrice, int maxPrice) {
    searchPage.setPriceRange(minPrice, maxPrice);
}

@Then("all prices should be between {int} and {int}")
public void allPricesShouldBeInRange(int minPrice, int maxPrice) {
    List<Double> prices = searchPage.getAllProductPrices();

    for (Double price : prices) {
        Assert.assertTrue(price >= minPrice && price <= maxPrice,
            String.format("Price %.2f is not between %d and %d",
                        price, minPrice, maxPrice));
    }
}

@Then("results count should be at least {int}")
public void resultsCountShouldBeAtLeast(int expectedCount) {
    int actualCount = searchPage.getResultsCount();
    Assert.assertTrue(actualCount >= expectedCount,
        String.format("Expected at least %d results, but found %d",
                    expectedCount, actualCount));
}

// For data table approach
@When("user searches for products in following categories")
public void userSearchesForCategories(DataTable dataTable) {
    List<Map<String, String>> rows = dataTable.asMaps();

    Map<String, List<String>> categoryResults = new HashMap<>();

    for (Map<String, String> row : rows) {
        String category = row.get("Category");
        String expectedProducts = row.get("Expected Products");

        // Perform search and store results
        searchPage.selectCategory(category);
        List<String> products = searchPage.getAllProductNames();
        categoryResults.put(category, products);
    }

    // Store in scenario context for validation in next step
    testContext.getScenarioContext().setContext("CATEGORY_RESULTS", categoryResults);
}
```

---

### 4. Not Implementing Proper Hooks for Setup and Teardown

**Problem:**
```java
public class LoginSteps {

    @Given("user is on login page")
    public void userIsOnLoginPage() {
        // Driver initialization in step definition - Wrong!
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/login");
    }

    @After
    public void tearDown() {
        // No cleanup - driver instances keep accumulating
    }
}
```

**Why It's Wrong:**
- Driver creation mixed with test logic
- No centralized setup/teardown management
- Resources not properly cleaned up
- Cannot take screenshots on failure easily
- Difficult to configure different environments

**Correct Approach:**
```java
public class Hooks {

    private TestContext testContext;

    public Hooks(TestContext testContext) {
        this.testContext = testContext;
    }

    @Before(order = 0)
    public void beforeScenario(Scenario scenario) {
        System.out.println("Starting Scenario: " + scenario.getName());

        // Initialize driver through TestContext
        // Driver is already created in TestContext constructor via PicoContainer
    }

    @Before(value = "@database", order = 1)
    public void setupDatabase() {
        // Only runs for scenarios tagged with @database
        DatabaseHelper.clearTestData();
        DatabaseHelper.insertTestData();
    }

    @Before(value = "@api", order = 1)
    public void setupApiMocks() {
        // Only runs for scenarios tagged with @api
        MockServerHelper.startMockServer();
        MockServerHelper.setupDefaultMocks();
    }

    @After(order = 1)
    public void afterScenario(Scenario scenario) {
        // Take screenshot on failure
        if (scenario.isFailed()) {
            captureScreenshot(scenario);
        }

        // Log scenario result
        System.out.println("Scenario Status: " + scenario.getStatus());

        // Capture browser logs if failed
        if (scenario.isFailed()) {
            captureBrowserLogs(scenario);
        }
    }

    @After(order = 0)
    public void quitDriver() {
        // Always quit driver to free resources
        testContext.quitDriver();
    }

    @After(value = "@database", order = 2)
    public void cleanupDatabase() {
        DatabaseHelper.clearTestData();
    }

    @After(value = "@api", order = 2)
    public void stopMockServer() {
        MockServerHelper.stopMockServer();
    }

    @BeforeStep
    public void beforeStep(Scenario scenario) {
        // Optional: Log each step execution
        // System.out.println("Executing step...");
    }

    @AfterStep
    public void afterStep(Scenario scenario) {
        // Optional: Take screenshot after each step for detailed reporting
        if (ConfigReader.getProperty("screenshot.mode").equals("all_steps")) {
            captureStepScreenshot(scenario);
        }
    }

    private void captureScreenshot(Scenario scenario) {
        try {
            byte[] screenshot = ((TakesScreenshot) testContext.getDriver())
                    .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png",
                          "Screenshot_" + System.currentTimeMillis());
        } catch (Exception e) {
            System.out.println("Failed to capture screenshot: " + e.getMessage());
        }
    }

    private void captureBrowserLogs(Scenario scenario) {
        try {
            LogEntries logEntries = testContext.getDriver()
                    .manage().logs().get(LogType.BROWSER);

            StringBuilder logs = new StringBuilder("Browser Console Logs:\\n");
            for (LogEntry entry : logEntries) {
                logs.append(entry.getLevel()).append(": ")
                    .append(entry.getMessage()).append("\\n");
            }

            scenario.attach(logs.toString().getBytes(),
                          "text/plain", "BrowserLogs");
        } catch (Exception e) {
            System.out.println("Failed to capture browser logs: " + e.getMessage());
        }
    }

    private void captureStepScreenshot(Scenario scenario) {
        try {
            byte[] screenshot = ((TakesScreenshot) testContext.getDriver())
                    .getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png",
                          "Step_" + System.currentTimeMillis());
        } catch (Exception e) {
            // Silently fail for step screenshots
        }
    }
}
```

---

### 5. Not Using Tags Effectively for Test Organization

**Problem:**
```gherkin
# No tags - all tests run always, taking too long

Feature: User Management

  Scenario: Create new user
    Given admin is logged in
    When admin creates a new user
    Then user should be created successfully

  Scenario: Delete user
    Given admin is logged in
    When admin deletes a user
    Then user should be deleted

  Scenario: Update user profile
    Given user is logged in
    When user updates profile information
    Then profile should be updated
```

**Why It's Wrong:**
- Cannot run selective tests (smoke, regression, etc.)
- Cannot exclude slow or flaky tests in CI
- No way to run environment-specific tests
- All tests run in every execution, wasting time

**Correct Approach:**
```gherkin
Feature: User Management

  @smoke @critical @fast
  Scenario: Admin creates a new user
    Given admin is logged in
    When admin creates a user with following details
      | Field     | Value           |
      | Username  | testuser        |
      | Email     | test@email.com  |
      | Role      | User            |
    Then user should be created successfully
    And user should receive welcome email

  @regression @admin @database
  Scenario: Admin deletes inactive user accounts
    Given there are 5 inactive user accounts
    And admin is logged in
    When admin deletes all inactive accounts
    Then all inactive accounts should be removed from database
    And admin should see success message

  @regression @user @slow
  Scenario: User updates profile with image upload
    Given user "testuser" is logged in
    When user uploads profile picture
    And user updates profile information
    Then profile should be updated with new image
    And image should be resized and optimized

  @flaky @todo
  @ignore # Temporarily disabled due to service instability
  Scenario: Password reset email
    Given user requests password reset
    When user receives reset email
    Then user should be able to reset password

  @integration @api @security
  Scenario: API authentication with JWT token
    Given user obtains JWT token via API
    When user accesses protected endpoint with token
    Then API should return authorized response
    And token should be valid for 1 hour
```

**TestNG Runner with Tag Selection:**
```java
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json",
        "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:"
    },
    tags = "@smoke and not @ignore",
    monochrome = true,
    dryRun = false
)
public class SmokeTestRunner extends AbstractTestNGCucumberTests {
    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}

@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    tags = "@regression and not (@flaky or @ignore)",
    plugin = {"pretty", "html:target/cucumber-reports/regression.html"}
)
public class RegressionTestRunner extends AbstractTestNGCucumberTests {
    // Runs all regression tests except flaky ones
}

@CucumberOptions(
    tags = "(@critical or @smoke) and not @slow"
)
public class FastTestRunner extends AbstractTestNGCucumberTests {
    // Only fast, critical tests for quick feedback
}
```

**Maven Command-Line Tag Execution:**
```xml
<!-- pom.xml -->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0-M9</version>
            <configuration>
                <includes>
                    <include>**/*TestRunner.java</include>
                </includes>
                <systemPropertyVariables>
                    <cucumber.filter.tags>${cucumber.tags}</cucumber.filter.tags>
                </systemPropertyVariables>
            </configuration>
        </plugin>
    </plugins>
</build>
```

**Command Line Usage:**
```bash
# Run smoke tests only
mvn test -Dcucumber.tags="@smoke and not @ignore"

# Run all tests except flaky
mvn test -Dcucumber.tags="not @flaky"

# Run specific feature combinations
mvn test -Dcucumber.tags="(@smoke or @regression) and @database"
```

---

## Best Practices for BDD with Cucumber

### 1. Write Declarative, Business-Readable Scenarios

**Why:**
- BDD scenarios should serve as living documentation
- Non-technical stakeholders should understand test coverage
- Focus on business behavior, not implementation details

**How:**
```gherkin
# Good: Declarative, business-focused
Scenario: Customer places order with discount code
  Given the customer has items in their cart
  And a valid 20% discount code is available
  When the customer applies the discount code
  And proceeds to checkout
  Then the order total should reflect the 20% discount
  And the customer should receive order confirmation

# Avoid: Imperative, implementation-focused
Scenario: Customer places order with discount code
  Given I navigate to URL "https://shop.com"
  When I click on element with ID "product-123"
  And I click button with class "add-to-cart"
  And I enter "DISCOUNT20" in textbox with name "coupon"
  And I click submit button with xpath "//button[@type='submit']"
  Then I verify text "Order Confirmed" is present
```

**Implementation with Page Object Model:**
```java
@When("the customer applies the discount code")
public void customerAppliesDiscountCode() {
    String discountCode = (String) testContext.getScenarioContext()
                                              .getContext("DISCOUNT_CODE");
    checkoutPage.applyDiscountCode(discountCode);
}

@Then("the order total should reflect the {int}% discount")
public void orderTotalShouldReflectDiscount(int discountPercent) {
    double originalTotal = (double) testContext.getScenarioContext()
                                                .getContext("ORIGINAL_TOTAL");
    double expectedTotal = originalTotal * (1 - discountPercent / 100.0);
    double actualTotal = checkoutPage.getOrderTotal();

    Assert.assertEquals(actualTotal, expectedTotal, 0.01,
        String.format("Expected total %.2f after %d%% discount, but got %.2f",
                    expectedTotal, discountPercent, actualTotal));
}
```

---

### 2. Implement Proper Page Object Management

**Why:**
- Centralizes page object creation and lifecycle
- Ensures efficient resource usage
- Provides single source of truth for page objects
- Makes step definitions cleaner and more maintainable

**How:**
```java
public class PageObjectManager {

    private WebDriver driver;

    // Lazy initialization of page objects
    private LoginPage loginPage;
    private DashboardPage dashboardPage;
    private CheckoutPage checkoutPage;
    private OrderPage orderPage;

    public PageObjectManager(WebDriver driver) {
        this.driver = driver;
    }

    public LoginPage getLoginPage() {
        if (loginPage == null) {
            loginPage = new LoginPage(driver);
        }
        return loginPage;
    }

    public DashboardPage getDashboardPage() {
        if (dashboardPage == null) {
            dashboardPage = new DashboardPage(driver);
        }
        return dashboardPage;
    }

    public CheckoutPage getCheckoutPage() {
        if (checkoutPage == null) {
            checkoutPage = new CheckoutPage(driver);
        }
        return checkoutPage;
    }

    public OrderPage getOrderPage() {
        if (orderPage == null) {
            orderPage = new OrderPage(driver);
        }
        return orderPage;
    }
}

// Usage in Step Definitions
public class CheckoutSteps {

    private TestContext testContext;
    private CheckoutPage checkoutPage;

    public CheckoutSteps(TestContext testContext) {
        this.testContext = testContext;
        // Get page from manager - created only when needed
        this.checkoutPage = testContext.getPageObjectManager().getCheckoutPage();
    }

    @When("customer proceeds to checkout")
    public void customerProceedsToCheckout() {
        checkoutPage.proceedToCheckout();
    }
}
```

---

### 3. Use Background for Common Preconditions

**Why:**
- Reduces code duplication across scenarios
- Makes scenarios more concise and readable
- Clearly separates common setup from scenario-specific steps

**How:**
```gherkin
Feature: Order Management

  Background:
    Given the user is logged in as "customer@email.com"
    And the user has the following items in cart
      | Product   | Quantity | Price |
      | Laptop    | 1        | 999   |
      | Mouse     | 2        | 29    |

  Scenario: Apply discount code to order
    When the user applies discount code "SAVE20"
    Then the order total should be reduced by 20%

  Scenario: Remove item from cart
    When the user removes "Mouse" from cart
    Then the cart should contain only 1 item
    And the order total should be $999

  Scenario: Update item quantity
    When the user updates "Mouse" quantity to 3
    Then the order total should reflect updated quantity
```

---

### 4. Implement Comprehensive Reporting with Extent Reports

**Why:**
- Provides detailed, visual test execution reports
- Captures screenshots and logs automatically
- Shows test trends and execution history
- Facilitates stakeholder communication

**How:**

**POM Dependencies:**
```xml
<dependency>
    <groupId>tech.grasshopper</groupId>
    <artifactId>extentreports-cucumber7-adapter</artifactId>
    <version>1.14.0</version>
</dependency>
```

**extent.properties:**
```properties
extent.reporter.spark.start=true
extent.reporter.spark.out=target/extent-reports/ExtentReport.html

# Screenshots
screenshot.dir=target/screenshots
screenshot.rel.path=../screenshots

# System info
systeminfo.os=Windows 11
systeminfo.browser=Chrome
systeminfo.environment=QA

# Report theme
extent.reporter.spark.vieworder=dashboard,test,category,exception,author,device,log

# Charts
extent.reporter.spark.config=src/test/resources/extent-config.xml
```

**extent-config.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<extentreports>
    <configuration>
        <theme>dark</theme>
        <encoding>UTF-8</encoding>
        <protocol>https</protocol>
        <documentTitle>Cucumber BDD Test Report</documentTitle>
        <reportName>Automation Test Results</reportName>
        <timeStampFormat>MMM dd, yyyy HH:mm:ss</timeStampFormat>
        <css>
            <![CDATA[
                .test-name { font-weight: bold; }
            ]]>
        </css>
        <js>
            <![CDATA[
                // Custom JavaScript if needed
            ]]>
        </js>
    </configuration>
</extentreports>
```

**TestRunner with Extent Reports:**
```java
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    plugin = {
        "pretty",
        "html:target/cucumber-reports/cucumber.html",
        "json:target/cucumber-reports/cucumber.json",
        "junit:target/cucumber-reports/cucumber.xml",
        "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:",
        "timeline:target/test-output-thread/"
    },
    monochrome = true
)
public class TestRunner extends AbstractTestNGCucumberTests {

    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
```

---

### 5. Handle Test Data Externally with Configuration Management

**Why:**
- Separates test data from test logic
- Enables easy updates without code changes
- Supports multiple environments (dev, QA, staging)
- Allows non-technical users to manage test data

**How:**

**config.properties:**
```properties
# Environment URLs
base.url=https://qa.example.com
api.base.url=https://api-qa.example.com

# Test Users
admin.username=admin@example.com
admin.password=Admin@123
customer.username=customer@example.com
customer.password=Customer@123

# Database
db.url=jdbc:mysql://qa-db.example.com:3306/testdb
db.username=testuser
db.password=testpass

# Test Data
default.timeout=10
screenshot.mode=on_failure
```

**ConfigReader.java:**
```java
public class ConfigReader {

    private static Properties properties;
    private static final String CONFIG_FILE_PATH = "src/test/resources/config.properties";

    static {
        try {
            properties = new Properties();
            FileInputStream fis = new FileInputStream(CONFIG_FILE_PATH);
            properties.load(fis);
            fis.close();

            // Override with environment variables if present (for CI/CD)
            properties.stringPropertyNames().forEach(key -> {
                String envValue = System.getenv(key.toUpperCase().replace(".", "_"));
                if (envValue != null) {
                    properties.setProperty(key, envValue);
                }
            });

        } catch (IOException e) {
            throw new RuntimeException("Failed to load configuration file", e);
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    public static int getIntProperty(String key) {
        return Integer.parseInt(properties.getProperty(key));
    }

    public static boolean getBooleanProperty(String key) {
        return Boolean.parseBoolean(properties.getProperty(key));
    }
}
```

**Test Data JSON Files:**
```json
// testdata/users.json
{
  "admin": {
    "username": "admin@example.com",
    "password": "Admin@123",
    "role": "Administrator"
  },
  "customer": {
    "username": "customer@example.com",
    "password": "Customer@123",
    "role": "Customer"
  }
}

// testdata/products.json
{
  "products": [
    {
      "id": "PROD001",
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics"
    },
    {
      "id": "PROD002",
      "name": "Mouse",
      "price": 29.99,
      "category": "Accessories"
    }
  ]
}
```

**TestDataReader.java:**
```java
public class TestDataReader {

    private static final String TEST_DATA_PATH = "src/test/resources/testdata/";

    public static Map<String, Object> getUserData(String userType) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(new File(TEST_DATA_PATH + "users.json"));
            return mapper.convertValue(root.get(userType), Map.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read user test data", e);
        }
    }

    public static List<Map<String, Object>> getAllProducts() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(new File(TEST_DATA_PATH + "products.json"));
            return mapper.convertValue(root.get("products"), List.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read product test data", e);
        }
    }
}
```

**Usage in Step Definitions:**
```java
@Given("the user is logged in as {string}")
public void userIsLoggedInAs(String userType) {
    Map<String, Object> userData = TestDataReader.getUserData(userType);
    String username = (String) userData.get("username");
    String password = (String) userData.get("password");

    loginPage.login(username, password);

    // Store user info for later use in scenario
    testContext.getScenarioContext().setContext("CURRENT_USER", userData);
}
```

---

### 6. Implement Parallel Execution for Faster Feedback

**Why:**
- Reduces test execution time significantly
- Provides faster feedback to development team
- Better utilizes available system resources
- Essential for large test suites in CI/CD

**How:**

**TestNG Parallel Runner:**
```java
@CucumberOptions(
    features = "src/test/resources/features",
    glue = {"stepdefinitions", "hooks"},
    plugin = {
        "pretty",
        "json:target/cucumber-reports/cucumber.json",
        "com.aventstack.extentreports.cucumber.adapter.ExtentCucumberAdapter:"
    },
    tags = "@regression"
)
public class ParallelTestRunner extends AbstractTestNGCucumberTests {

    @Override
    @DataProvider(parallel = true)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
```

**testng.xml:**
```xml
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Cucumber BDD Suite" parallel="methods" thread-count="4">
    <test name="Cucumber Tests">
        <classes>
            <class name="runners.ParallelTestRunner"/>
        </classes>
    </test>
</suite>
```

**Thread-Safe Driver Management:**
```java
public class DriverFactory {

    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver getDriver() {
        return driver.get();
    }

    public static void setDriver(WebDriver driverInstance) {
        driver.set(driverInstance);
    }

    public static WebDriver initializeDriver() {
        String browser = ConfigReader.getProperty("browser");
        WebDriver driverInstance;

        switch (browser.toLowerCase()) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--start-maximized");
                chromeOptions.addArguments("--disable-notifications");
                driverInstance = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                driverInstance = new FirefoxDriver(firefoxOptions);
                break;

            default:
                throw new IllegalArgumentException("Browser not supported: " + browser);
        }

        driver.set(driverInstance);
        return driverInstance;
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

### 7. Use Regular Expressions and Custom Parameter Types

**Why:**
- Makes step definitions more flexible and reusable
- Reduces the number of step definitions needed
- Provides type safety and automatic conversions
- Improves code maintainability

**How:**
```java
// Custom Parameter Types
@ParameterType(".*")
public User user(String userName) {
    return TestDataReader.getUser(userName);
}

@ParameterType("[0-9]+")
public Product product(String productId) {
    return TestDataReader.getProduct(productId);
}

@ParameterType("\\$?[0-9]+\\.?[0-9]{0,2}")
public Money money(String amount) {
    amount = amount.replace("$", "");
    return new Money(new BigDecimal(amount));
}

// Usage in Step Definitions
@When("{user} adds {product} to cart")
public void userAddsProductToCart(User user, Product product) {
    // user and product are automatically converted
    cartPage.addProduct(product);
}

@Then("the total should be {money}")
public void totalShouldBe(Money expectedTotal) {
    Money actualTotal = checkoutPage.getTotal();
    Assert.assertEquals(actualTotal, expectedTotal);
}
```

**Feature File Usage:**
```gherkin
Scenario: Customer adds products to cart
  When John adds PROD001 to cart
  And John adds PROD002 to cart
  Then the total should be $1029.98
```

---

## Navigation

- **Previous:** [Day 37: CI/CD Integration](day37_ci_cd_integration.md)
- **Next:** [Day 39: API Testing Integration](day39_api_testing_integration.md)
- **Week 7 Home:** [Week 7 Overview](./README.md)

---

**Congratulations!** You have completed Day 45 on BDD with Cucumber & Selenium Integration. BDD provides a powerful approach to create maintainable, business-focused test automation that serves as living documentation for your application.
