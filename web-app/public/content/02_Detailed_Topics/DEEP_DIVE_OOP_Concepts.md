# Deep Dive: Object-Oriented Programming in Java
## Comprehensive Guide with Real-World Examples

---

## 📚 Table of Contents
1. [The Four Pillars of OOP](#four-pillars)
2. [Encapsulation in Depth](#encapsulation)
3. [Inheritance Explained](#inheritance)
4. [Polymorphism Mastery](#polymorphism)
5. [Abstraction Complete Guide](#abstraction)
6. [Real-World Design Patterns](#design-patterns)

---

## <a name="four-pillars"></a>🏛️ The Four Pillars of OOP

### Why OOP Matters for Test Automation

**Problem Without OOP:**
```java
// Nightmare scenario: Everything in one class
public class TestScript {
    public static void main(String[] args) {
        // Login code
        driver.findElement(By.id("username")).sendKeys("user");
        driver.findElement(By.id("password")).sendKeys("pass");
        driver.findElement(By.id("loginBtn")).click();

        // Add to cart code
        driver.findElement(By.id("product1")).click();
        driver.findElement(By.id("addToCart")).click();

        // Checkout code
        driver.findElement(By.id("checkout")).click();
        // ... 500 more lines of repeated code!
    }
}
```

**Problems:**
- ❌ Code duplication everywhere
- ❌ Hard to maintain (change login? Update 50 places!)
- ❌ No reusability
- ❌ Impossible to understand
- ❌ Can't test individual pieces

**Solution With OOP:**
```java
// Clean, organized, reusable
public class TestScript {
    public static void main(String[] args) {
        LoginPage loginPage = new LoginPage(driver);
        ProductPage productPage = loginPage.login("user", "pass");
        productPage.addToCart("product1");
        CheckoutPage checkoutPage = productPage.checkout();
        checkoutPage.completeOrder();
    }
}
```

**Benefits:**
- ✅ Clean and readable
- ✅ Reusable components
- ✅ Easy to maintain
- ✅ Testable
- ✅ Scalable

---

## <a name="encapsulation"></a>🔒 Encapsulation: Protecting Your Data

### What is Encapsulation?

**Simple Definition:**
> Encapsulation is hiding the internal details and exposing only what's necessary through public methods.

**Real-World Analogy:**
Think of an ATM machine:
- ✅ You CAN: Check balance, withdraw money (public methods)
- ❌ You CANNOT: Access the internal vault, modify account directly (private data)

### Without Encapsulation - The Problem

```java
// BAD EXAMPLE - No encapsulation
public class BankAccount {
    public String accountNumber;
    public double balance;

    // Anyone can do this!
    // account.balance = 1000000; // Hacker's dream!
}

// In test code:
BankAccount myAccount = new BankAccount();
myAccount.balance = -5000; // Negative balance? No validation!
myAccount.accountNumber = null; // Null account? Disaster!
```

**Problems:**
- ❌ No validation
- ❌ Direct access to sensitive data
- ❌ Can set invalid values
- ❌ No control over changes

### With Encapsulation - The Solution

```java
// GOOD EXAMPLE - Proper encapsulation
public class BankAccount {
    // PRIVATE - Hidden from outside
    private String accountNumber;
    private double balance;
    private String accountHolderName;

    // Constructor
    public BankAccount(String accountNumber, String accountHolderName) {
        if (accountNumber == null || accountNumber.isEmpty()) {
            throw new IllegalArgumentException("Account number cannot be empty");
        }
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = 0.0;
    }

    // PUBLIC METHODS - Controlled access with validation

    // Getter - READ ONLY
    public double getBalance() {
        return balance;
    }

    // No setter for balance! Can only change through deposit/withdraw

    // Deposit with validation
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        balance += amount;
        System.out.println("Deposited: $" + amount);
        System.out.println("New balance: $" + balance);
    }

    // Withdraw with validation
    public boolean withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("❌ Withdrawal amount must be positive");
            return false;
        }
        if (amount > balance) {
            System.out.println("❌ Insufficient funds");
            return false;
        }
        balance -= amount;
        System.out.println("✅ Withdrawn: $" + amount);
        System.out.println("New balance: $" + balance);
        return true;
    }

    // Getter for account number - READ ONLY
    public String getAccountNumber() {
        // Security: Only show last 4 digits
        return "XXXX-XXXX-" + accountNumber.substring(accountNumber.length() - 4);
    }

    // Account summary
    public void printAccountInfo() {
        System.out.println("=== Account Information ===");
        System.out.println("Account Holder: " + accountHolderName);
        System.out.println("Account Number: " + getAccountNumber());
        System.out.println("Balance: $" + balance);
        System.out.println("===========================");
    }
}

// Using the encapsulated class
public class BankDemo {
    public static void main(String[] args) {
        // Create account
        BankAccount myAccount = new BankAccount("1234567890", "John Doe");

        // Can't do this anymore:
        // myAccount.balance = 1000000; // COMPILE ERROR! balance is private

        // Must use public methods:
        myAccount.deposit(1000);    // ✅ Validated
        myAccount.withdraw(500);    // ✅ Validated
        myAccount.withdraw(600);    // ❌ Will fail - insufficient funds

        // Read balance safely
        System.out.println("Current balance: $" + myAccount.getBalance());

        // Account number is protected
        System.out.println("Account: " + myAccount.getAccountNumber()); // Shows XXXX-XXXX-7890

        myAccount.printAccountInfo();
    }
}
```

**Output:**
```
Deposited: $1000.0
New balance: $1000.0
✅ Withdrawn: $500.0
New balance: $500.0
❌ Insufficient funds
Current balance: $500.0
Account: XXXX-XXXX-7890
=== Account Information ===
Account Holder: John Doe
Account Number: XXXX-XXXX-7890
Balance: $500.0
===========================
```

### Encapsulation Rules

**1. Make Instance Variables Private**
```java
private String name;
private int age;
private double salary;
```

**2. Provide Public Getters (for reading)**
```java
public String getName() {
    return name;
}

public int getAge() {
    return age;
}
```

**3. Provide Public Setters (for writing) - WITH VALIDATION**
```java
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Invalid age");
    }
    this.age = age;
}

public void setName(String name) {
    if (name == null || name.trim().isEmpty()) {
        throw new IllegalArgumentException("Name cannot be empty");
    }
    this.name = name.trim();
}
```

**4. Sometimes NO Setter (read-only properties)**
```java
private final String employeeId; // Set once in constructor, never changes

public String getEmployeeId() {
    return employeeId;
}

// No setEmployeeId() method!
```

### Selenium Example: Encapsulated Page Object

```java
// BAD - No encapsulation
public class LoginPage {
    public WebElement usernameField;
    public WebElement passwordField;
    public WebElement loginButton;
    // Anyone can access elements directly!
}

// GOOD - Properly encapsulated
public class LoginPage {
    // PRIVATE - Internal implementation hidden
    private WebDriver driver;
    private By usernameLocator = By.id("username");
    private By passwordLocator = By.id("password");
    private By loginButtonLocator = By.id("loginBtn");
    private By errorMessageLocator = By.className("error-message");

    // Constructor
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }

    // PUBLIC METHODS - Exposed functionality
    public void enterUsername(String username) {
        driver.findElement(usernameLocator).clear();
        driver.findElement(usernameLocator).sendKeys(username);
    }

    public void enterPassword(String password) {
        driver.findElement(passwordLocator).clear();
        driver.findElement(passwordLocator).sendKeys(password);
    }

    public void clickLoginButton() {
        driver.findElement(loginButtonLocator).click();
    }

    // High-level method - combines multiple steps
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }

    // Validation
    public boolean isErrorDisplayed() {
        try {
            return driver.findElement(errorMessageLocator).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    public String getErrorMessage() {
        if (isErrorDisplayed()) {
            return driver.findElement(errorMessageLocator).getText();
        }
        return "";
    }
}

// Test using encapsulated page object
public class LoginTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/login");

        LoginPage loginPage = new LoginPage(driver);

        // Clean, readable test
        loginPage.login("testuser", "password123");

        // Validate
        if (loginPage.isErrorDisplayed()) {
            System.out.println("Login failed: " + loginPage.getErrorMessage());
        } else {
            System.out.println("Login successful!");
        }

        driver.quit();
    }
}
```

### Benefits of Encapsulation

✅ **Data Protection**
- Private fields can't be accessed directly
- All changes go through methods with validation

✅ **Flexibility**
- Change internal implementation without affecting users
- Example: Change locator strategy without changing test code

✅ **Code Maintainability**
- Locators in one place
- Easy to update when UI changes

✅ **Testability**
- Clear public interface
- Easy to mock/stub

✅ **Security**
- Sensitive data hidden
- Controlled access only

---

## <a name="inheritance"></a>🧬 Inheritance: Building on Existing Code

### What is Inheritance?

**Simple Definition:**
> Inheritance allows a new class to acquire properties and methods from an existing class.

**Real-World Analogy:**
- Parent → Child relationship
- Child inherits traits from parent
- Child can have additional traits

### Basic Inheritance Example

```java
// PARENT CLASS (Base/Super class)
public class Vehicle {
    // Common properties for ALL vehicles
    protected String brand;
    protected int year;
    protected String color;

    // Constructor
    public Vehicle(String brand, int year, String color) {
        this.brand = brand;
        this.year = year;
        this.color = color;
    }

    // Common methods for ALL vehicles
    public void start() {
        System.out.println("Vehicle is starting...");
    }

    public void stop() {
        System.out.println("Vehicle is stopping...");
    }

    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Year: " + year);
        System.out.println("Color: " + color);
    }
}

// CHILD CLASS 1 (Derived/Sub class)
public class Car extends Vehicle {
    // Additional properties specific to Car
    private int numberOfDoors;

    // Constructor
    public Car(String brand, int year, String color, int numberOfDoors) {
        super(brand, year, color); // Call parent constructor
        this.numberOfDoors = numberOfDoors;
    }

    // Additional method specific to Car
    public void openTrunk() {
        System.out.println("Car trunk is opening...");
    }

    // Override parent method
    @Override
    public void start() {
        System.out.println("Car engine is starting with key...");
    }

    // Enhanced display
    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent method
        System.out.println("Number of Doors: " + numberOfDoors);
        System.out.println("Type: Car");
    }
}

// CHILD CLASS 2
public class Motorcycle extends Vehicle {
    // Additional properties specific to Motorcycle
    private boolean hasSidecar;

    public Motorcycle(String brand, int year, String color, boolean hasSidecar) {
        super(brand, year, color);
        this.hasSidecar = hasSidecar;
    }

    // Additional method
    public void doWheelie() {
        System.out.println("Motorcycle is doing a wheelie!");
    }

    @Override
    public void start() {
        System.out.println("Motorcycle engine is starting with kick/button...");
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Has Sidecar: " + (hasSidecar ? "Yes" : "No"));
        System.out.println("Type: Motorcycle");
    }
}

// DEMO
public class InheritanceDemo {
    public static void main(String[] args) {
        System.out.println("=== CAR DEMO ===");
        Car myCar = new Car("Toyota", 2023, "Blue", 4);
        myCar.displayInfo();
        myCar.start();           // Car's version
        myCar.openTrunk();       // Car-specific method
        myCar.stop();            // Inherited from Vehicle

        System.out.println("\n=== MOTORCYCLE DEMO ===");
        Motorcycle myBike = new Motorcycle("Harley", 2022, "Black", false);
        myBike.displayInfo();
        myBike.start();          // Motorcycle's version
        myBike.doWheelie();      // Motorcycle-specific method
        myBike.stop();           // Inherited from Vehicle
    }
}
```

**Output:**
```
=== CAR DEMO ===
Brand: Toyota
Year: 2023
Color: Blue
Number of Doors: 4
Type: Car
Car engine is starting with key...
Car trunk is opening...
Vehicle is stopping...

=== MOTORCYCLE DEMO ===
Brand: Harley
Year: 2022
Color: Black
Has Sidecar: No
Type: Motorcycle
Motorcycle engine is starting with kick/button...
Motorcycle is doing a wheelie!
Vehicle is stopping...
```

### The `super` Keyword

**Purpose:** Access parent class members

**Uses:**
1. **Call parent constructor:** `super(args);`
2. **Call parent method:** `super.methodName();`
3. **Access parent variable:** `super.variableName;`

```java
public class Employee {
    protected String name;
    protected double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public void work() {
        System.out.println(name + " is working...");
    }

    public double calculateBonus() {
        return salary * 0.10; // 10% bonus
    }
}

public class Manager extends Employee {
    private int teamSize;

    public Manager(String name, double salary, int teamSize) {
        super(name, salary); // MUST be first line in constructor
        this.teamSize = teamSize;
    }

    @Override
    public void work() {
        super.work(); // Call parent method first
        System.out.println(name + " is also managing a team of " + teamSize);
    }

    @Override
    public double calculateBonus() {
        double baseBonus = super.calculateBonus(); // Parent's calculation
        double teamBonus = teamSize * 1000; // Additional per team member
        return baseBonus + teamBonus;
    }
}
```

### Selenium Example: Page Object Inheritance

```java
// PARENT PAGE - Common functionality for ALL pages
public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;

    // Constructor
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Common methods available to all pages
    protected WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    protected void clickElement(By locator) {
        waitForElement(locator).click();
    }

    protected void enterText(By locator, String text) {
        WebElement element = waitForElement(locator);
        element.clear();
        element.sendKeys(text);
    }

    protected String getElementText(By locator) {
        return waitForElement(locator).getText();
    }

    protected boolean isElementDisplayed(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    public String getPageTitle() {
        return driver.getTitle();
    }

    public String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
}

// CHILD PAGE 1 - Login Page inherits from BasePage
public class LoginPage extends BasePage {
    // Locators specific to Login Page
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.id("loginBtn");
    private By errorMessage = By.className("error");

    // Constructor
    public LoginPage(WebDriver driver) {
        super(driver); // Call parent constructor
    }

    // Login Page specific methods
    public void login(String username, String password) {
        enterText(usernameField, username);      // Using parent method
        enterText(passwordField, password);      // Using parent method
        clickElement(loginButton);               // Using parent method
    }

    public boolean isErrorDisplayed() {
        return isElementDisplayed(errorMessage); // Using parent method
    }

    public String getErrorText() {
        return getElementText(errorMessage);     // Using parent method
    }
}

// CHILD PAGE 2 - Dashboard Page
public class DashboardPage extends BasePage {
    private By welcomeMessage = By.id("welcome");
    private By logoutButton = By.id("logout");
    private By profileLink = By.linkText("Profile");

    public DashboardPage(WebDriver driver) {
        super(driver);
    }

    public String getWelcomeMessage() {
        return getElementText(welcomeMessage);   // Using parent method
    }

    public void logout() {
        clickElement(logoutButton);              // Using parent method
    }

    public ProfilePage goToProfile() {
        clickElement(profileLink);               // Using parent method
        return new ProfilePage(driver);
    }
}

// CHILD PAGE 3 - Profile Page
public class ProfilePage extends BasePage {
    private By nameField = By.id("name");
    private By emailField = By.id("email");
    private By saveButton = By.id("save");
    private By successMessage = By.className("success");

    public ProfilePage(WebDriver driver) {
        super(driver);
    }

    public void updateProfile(String name, String email) {
        enterText(nameField, name);              // Using parent method
        enterText(emailField, email);            // Using parent method
        clickElement(saveButton);                // Using parent method
    }

    public boolean isSuccessDisplayed() {
        return isElementDisplayed(successMessage); // Using parent method
    }
}

// TEST CLASS
public class InheritanceTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // All page objects inherit common functionality
        LoginPage loginPage = new LoginPage(driver);
        loginPage.login("testuser", "password");

        DashboardPage dashboard = new DashboardPage(driver);
        System.out.println(dashboard.getWelcomeMessage());

        ProfilePage profile = dashboard.goToProfile();
        profile.updateProfile("John Doe", "john@example.com");

        if (profile.isSuccessDisplayed()) {
            System.out.println("✅ Profile updated successfully!");
        }

        driver.quit();
    }
}
```

### Benefits of Inheritance

✅ **Code Reuse**
- Write common code once
- All child classes get it automatically

✅ **Easier Maintenance**
- Update parent class → all children updated
- Fix bug once, affects all

✅ **Logical Organization**
- Clear parent-child relationships
- Easy to understand structure

✅ **Extensibility**
- Easy to add new page objects
- Just extend BasePage

---

## 💡 Key Takeaways

### Encapsulation
- 🔒 Hide data (private)
- 🚪 Provide controlled access (public methods)
- ✅ Validate all inputs
- 🛡️ Protect sensitive information

### Inheritance
- 🧬 Reuse code from parent
- 🏗️ Build on existing functionality
- 🔄 Override when needed
- 📞 Use `super` to access parent

### When to Use What

**Use Encapsulation:**
- Always! Every class should encapsulate its data
- Page objects hiding locators
- Data classes protecting fields

**Use Inheritance:**
- Common functionality across multiple classes
- BasePage for all page objects
- Base test class for all tests
- Is-A relationship (Car IS-A Vehicle)

---

*Continue to next sections: Polymorphism and Abstraction...*
