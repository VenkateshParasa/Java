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

## 20. Practical Exercises

### Exercise 1: Login Feature

Create a complete login feature with:
- Valid login scenario
- Invalid credentials scenario
- Locked account scenario
- Password reset scenario

### Exercise 2: Shopping Cart

Implement shopping cart functionality:
- Add single product
- Add multiple products
- Update quantity
- Remove product
- Calculate total

### Exercise 3: Search Functionality

Create search feature with:
- Valid search
- No results search
- Search filters
- Search suggestions

### Exercise 4: User Profile

Implement user profile management:
- View profile
- Update profile
- Change password
- Upload profile picture

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

## Navigation

- **Previous:** [Day 44: Cross-Browser Testing](../week7/day44_cross_browser_testing.md)
- **Next:** [Day 46: API Testing with REST Assured](../week7/day46_api_testing_rest_assured.md)
- **Week 7 Home:** [Week 7 Overview](./README.md)

---

**Congratulations!** You have completed Day 45 on BDD with Cucumber & Selenium Integration. BDD provides a powerful approach to create maintainable, business-focused test automation that serves as living documentation for your application.
