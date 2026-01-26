
# Day 11: Encapsulation & Access Modifiers

**Week 2: Object-Oriented Programming Fundamentals**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Common Mistakes](#common-mistakes)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 11, you will be able to:
- Understand the concept of encapsulation
- Use access modifiers effectively (private, public, protected, default)
- Create getters and setters
- Implement data hiding and validation
- Apply encapsulation best practices
- Understand the benefits of encapsulation
- Design well-encapsulated classes

---

## 📚 Topics Covered

### 1. What is Encapsulation?

**Encapsulation** is the bundling of data (variables) and methods that operate on that data within a single unit (class), and restricting direct access to some of the object's components.

#### Key Concepts:
- **Data Hiding**: Hide internal state from outside world
- **Controlled Access**: Provide public methods to access/modify data
- **Validation**: Ensure data integrity through controlled access
- **Flexibility**: Change internal implementation without affecting external code

#### Real-World Analogy:
Think of a **capsule** (medicine) - the medicine is protected inside, and you can't directly access it. You take the whole capsule, which controls how the medicine is delivered.

#### Example:
```java
// Without Encapsulation - BAD
public class Student {
    public String name;
    public int age;
    public double gpa;
}

// Anyone can do this:
Student s = new Student();
s.age = -5;  // Invalid! But no protection
s.gpa = 10.0;  // Invalid! GPA should be 0-4

// With Encapsulation - GOOD
public class Student {
    private String name;
    private int age;
    private double gpa;
    
    // Controlled access with validation
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }
    
    public void setGPA(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA! Must be 0.0-4.0");
        }
    }
    
    public int getAge() {
        return age;
    }
    
    public double getGPA() {
        return gpa;
    }
}
```

---

### 2. Access Modifiers

Java provides four access modifiers to control visibility:

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| **public** | ✅ | ✅ | ✅ | ✅ |
| **protected** | ✅ | ✅ | ✅ | ❌ |
| **default** (no modifier) | ✅ | ✅ | ❌ | ❌ |
| **private** | ✅ | ❌ | ❌ | ❌ |

#### 1. Private Access Modifier

**private** = Accessible only within the same class

```java
public class BankAccount {
    private double balance;  // Only accessible within BankAccount class
    private String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    // Public method to access private data
    public double getBalance() {
        return balance;
    }
    
    // Public method to modify private data with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient balance");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("ACC001", 1000.0);
        
        // account.balance = 5000;  // ERROR! balance is private
        
        // Must use public methods
        System.out.println("Balance: $" + account.getBalance());
        account.deposit(500);
        account.withdraw(200);
        System.out.println("Final Balance: $" + account.getBalance());
    }
}
```

**Output:**
```
Balance: $1000.0
Deposited: $500.0
Withdrawn: $200.0
Final Balance: $1300.0
```

#### 2. Public Access Modifier

**public** = Accessible from anywhere

```java
public class Calculator {
    // Public methods - accessible from anywhere
    public int add(int a, int b) {
        return a + b;
    }
    
    public int subtract(int a, int b) {
        return a - b;
    }
    
    public int multiply(int a, int b) {
        return a * b;
    }
    
    public double divide(int a, int b) {
        if (b != 0) {
            return (double) a / b;
        }
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        // All public methods accessible
        System.out.println("Add: " + calc.add(10, 5));
        System.out.println("Subtract: " + calc.subtract(10, 5));
        System.out.println("Multiply: " + calc.multiply(10, 5));
        System.out.println("Divide: " + calc.divide(10, 5));
    }
}
```

#### 3. Protected Access Modifier

**protected** = Accessible within same package and subclasses

```java
// File: Person.java
public class Person {
    protected String name;  // Accessible in subclasses
    protected int age;
    
    protected void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

// File: Student.java (subclass)
public class Student extends Person {
    private String studentId;
    
    public Student(String name, int age, String studentId) {
        this.name = name;  // Can access protected member
        this.age = age;    // Can access protected member
        this.studentId = studentId;
    }
    
    public void display() {
        displayInfo();  // Can call protected method
        System.out.println("Student ID: " + studentId);
    }
}
```

#### 4. Default Access Modifier (Package-Private)

**default** (no modifier) = Accessible only within the same package

```java
// File: Helper.java (in package com.example)
package com.example;

class Helper {  // Default access - package-private
    void helperMethod() {
        System.out.println("Helper method");
    }
}

// File: Main.java (in same package com.example)
package com.example;

public class Main {
    public static void main(String[] args) {
        Helper helper = new Helper();  // OK - same package
        helper.helperMethod();  // OK - same package
    }
}

// File: Test.java (in different package com.test)
package com.test;
import com.example.Helper;  // ERROR! Helper is not public

public class Test {
    public static void main(String[] args) {
        // Helper helper = new Helper();  // ERROR! Cannot access
    }
}
```

---

### 3. Getters and Setters

**Getters** (accessor methods) and **Setters** (mutator methods) provide controlled access to private fields.

#### Naming Convention:
- **Getter**: `getFieldName()` - returns the field value
- **Setter**: `setFieldName(value)` - sets the field value
- **Boolean Getter**: `isFieldName()` - for boolean fields

#### Basic Example:
```java
public class Person {
    private String name;
    private int age;
    private boolean employed;
    
    // Getter for name
    public String getName() {
        return name;
    }
    
    // Setter for name
    public void setName(String name) {
        this.name = name;
    }
    
    // Getter for age
    public int getAge() {
        return age;
    }
    
    // Setter for age with validation
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }
    
    // Boolean getter
    public boolean isEmployed() {
        return employed;
    }
    
    // Boolean setter
    public void setEmployed(boolean employed) {
        this.employed = employed;
    }
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person();
        
        person.setName("Alice");
        person.setAge(25);
        person.setEmployed(true);
        
        System.out.println("Name: " + person.getName());
        System.out.println("Age: " + person.getAge());
        System.out.println("Employed: " + person.isEmployed());
    }
}
```

#### Advanced Getters and Setters with Validation:
```java
public class Product {
    private String productId;
    private String name;
    private double price;
    private int quantity;
    
    // Constructor
    public Product(String productId, String name, double price, int quantity) {
        this.productId = productId;
        setName(name);  // Use setter for validation
        setPrice(price);
        setQuantity(quantity);
    }
    
    // Getter for productId (read-only, no setter)
    public String getProductId() {
        return productId;
    }
    
    // Getter and Setter for name
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        } else {
            System.out.println("Invalid name!");
        }
    }
    
    // Getter and Setter for price
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double price) {
        if (price >= 0) {
            this.price = price;
        } else {
            System.out.println("Price cannot be negative!");
        }
    }
    
    // Getter and Setter for quantity
    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        if (quantity >= 0) {
            this.quantity = quantity;
        } else {
            System.out.println("Quantity cannot be negative!");
        }
    }
    
    // Calculated property (getter only)
    public double getTotalValue() {
        return price * quantity;
    }
    
    public void display() {
        System.out.println("\n=== Product Information ===");
        System.out.println("Product ID: " + productId);
        System.out.println("Name: " + name);
        System.out.println("Price: $" + price);
        System.out.println("Quantity: " + quantity);
        System.out.println("Total Value: $" + getTotalValue());
    }
}

public class Main {
    public static void main(String[] args) {
        Product product = new Product("P001", "Laptop", 999.99, 10);
        product.display();
        
        // Update using setters
        product.setPrice(899.99);
        product.setQuantity(15);
        product.display();
        
        // Try invalid values
        product.setPrice(-100);  // Will show error
        product.setQuantity(-5);  // Will show error
    }
}
```

---

### 4. Data Hiding and Validation

Encapsulation allows us to hide data and validate it before modification.

#### Example: Email Validation
```java
public class User {
    private String username;
    private String email;
    private String password;
    
    public User(String username, String email, String password) {
        setUsername(username);
        setEmail(email);
        setPassword(password);
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        if (username != null && username.length() >= 3) {
            this.username = username;
        } else {
            System.out.println("Username must be at least 3 characters!");
        }
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        if (email != null && email.contains("@") && email.contains(".")) {
            this.email = email;
        } else {
            System.out.println("Invalid email format!");
        }
    }
    
    // Password is write-only (no getter for security)
    public void setPassword(String password) {
        if (password != null && password.length() >= 8) {
            this.password = password;
            System.out.println("Password set successfully");
        } else {
            System.out.println("Password must be at least 8 characters!");
        }
    }
    
    // Method to verify password without exposing it
    public boolean verifyPassword(String password) {
        return this.password.equals(password);
    }
    
    public void display() {
        System.out.println("\n=== User Information ===");
        System.out.println("Username: " + username);
        System.out.println("Email: " + email);
        System.out.println("Password: ********");  // Hidden
    }
}

public class Main {
    public static void main(String[] args) {
        User user = new User("alice123", "alice@example.com", "password123");
        user.display();
        
        // Try invalid values
        user.setUsername("ab");  // Too short
        user.setEmail("invalid-email");  // Invalid format
        user.setPassword("short");  // Too short
        
        // Verify password
        System.out.println("\nPassword correct? " + user.verifyPassword("password123"));
        System.out.println("Password correct? " + user.verifyPassword("wrong"));
    }
}
```

---

### 5. Benefits of Encapsulation

#### 1. Data Protection
```java
public class Counter {
    private int count = 0;
    
    // Only increment allowed, no direct access
    public void increment() {
        count++;
    }
    
    public int getCount() {
        return count;
    }
    
    // Cannot set count directly - protects data integrity
}
```

#### 2. Flexibility to Change Implementation
```java
public class Temperature {
    private double celsius;
    
    // Store in Celsius internally
    public void setCelsius(double celsius) {
        this.celsius = celsius;
    }
    
    public double getCelsius() {
        return celsius;
    }
    
    // Provide Fahrenheit interface
    public void setFahrenheit(double fahrenheit) {
        this.celsius = (fahrenheit - 32) * 5 / 9;
    }
    
    public double getFahrenheit() {
        return (celsius * 9 / 5) + 32;
    }
    
    // Can change internal storage later without affecting users
}
```

#### 3. Validation and Business Logic
```java
public class ShoppingCart {
    private double totalAmount;
    private int itemCount;
    private static final double MAX_AMOUNT = 10000.0;
    
    public void addItem(double price) {
        if (price > 0 && totalAmount + price <= MAX_AMOUNT) {
            totalAmount += price;
            itemCount++;
            System.out.println("Item added. Total: $" + totalAmount);
        } else {
            System.out.println("Cannot add item. Exceeds maximum amount!");
        }
    }
    
    public double getTotalAmount() {
        return totalAmount;
    }
    
    public int getItemCount() {
        return itemCount;
    }
    
    public double getAveragePrice() {
        if (itemCount > 0) {
            return totalAmount / itemCount;
        }
        return 0;
    }
}
```

#### 4. Read-Only and Write-Only Properties
```java
public class Configuration {
    private final String appName = "MyApp";  // Read-only
    private String apiKey;  // Write-only
    
    // Read-only property (no setter)
    public String getAppName() {
        return appName;
    }
    
    // Write-only property (no getter)
    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }
    
    // Can use the key internally without exposing it
    public boolean validateApiKey(String key) {
        return this.apiKey.equals(key);
    }
}
```

---

### 6. Encapsulation Best Practices

#### 1. Make Fields Private
```java
// GOOD
public class Student {
    private String name;
    private int age;
    
    // Provide public getters/setters
}

// BAD
public class Student {
    public String name;  // Direct access - no control
    public int age;
}
```

#### 2. Provide Public Getters/Setters Only When Needed
```java
public class Employee {
    private String employeeId;  // Read-only
    private String name;
    private double salary;  // Controlled access
    
    public Employee(String employeeId, String name, double salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.salary = salary;
    }
    
    // Read-only: getter but no setter
    public String getEmployeeId() {
        return employeeId;
    }
    
    // Read-write: both getter and setter
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    // Controlled access with validation
    public double getSalary() {
        return salary;
    }
    
    public void setSalary(double salary) {
        if (salary > 0) {
            this.salary = salary;
        }
    }
}
```

#### 3. Validate in Setters
```java
public class Rectangle {
    private double length;
    private double width;
    
    public void setLength(double length) {
        if (length > 0) {
            this.length = length;
        } else {
            throw new IllegalArgumentException("Length must be positive");
        }
    }
    
    public void setWidth(double width) {
        if (width > 0) {
            this.width = width;
        } else {
            throw new IllegalArgumentException("Width must be positive");
        }
    }
    
    public double getLength() {
        return length;
    }
    
    public double getWidth() {
        return width;
    }
    
    public double getArea() {
        return length * width;
    }
}
```

#### 4. Use Immutable Objects When Appropriate
```java
public final class ImmutablePerson {
    private final String name;
    private final int age;
    
    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Only getters, no setters
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // To "modify", create new object
    public ImmutablePerson withAge(int newAge) {
        return new ImmutablePerson(this.name, newAge);
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Bank Account with Encapsulation
Create a fully encapsulated BankAccount class.

```java
public class BankAccount {
    private String accountNumber;
    private String accountHolder;
    private double balance;
    private String accountType;
    private boolean isActive;
    
    public BankAccount(String accountNumber, String accountHolder, double initialBalance, String accountType) {
        this.accountNumber = accountNumber;
        setAccountHolder(accountHolder);
        setBalance(initialBalance);
        setAccountType(accountType);
        this.isActive = true;
    }
    
    // Read-only property
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public String getAccountHolder() {
        return accountHolder;
    }
    
    public void setAccountHolder(String accountHolder) {
        if (accountHolder != null && !accountHolder.trim().isEmpty()) {
            this.accountHolder = accountHolder;
        } else {
            System.out.println("Invalid account holder name!");
        }
    }
    
    public double getBalance() {
        return balance;
    }
    
    private void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        } else {
            System.out.println("Balance cannot be negative!");
            this.balance = 0;
        }
    }
    
    public String getAccountType() {
        return accountType;
    }
    
    public void setAccountType(String accountType) {
        if (accountType.equals("Savings") || accountType.equals("Checking") || accountType.equals("Fixed")) {
            this.accountType = accountType;
        } else {
            System.out.println("Invalid account type!");
        }
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void deposit(double amount) {
        if (!isActive) {
            System.out.println("Account is inactive!");
            return;
        }
        
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
    
    public boolean withdraw(double amount) {
        if (!isActive) {
            System.out.println("Account is inactive!");
            return false;
        }
        
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            return true;
        } else {
            System.out.println("Invalid withdrawal or insufficient balance!");
            return false;
        }
    }
    
    public void closeAccount() {
        if (balance == 0) {
            isActive = false;
            System.out.println("Account closed successfully");
        } else {
            System.out.println("Cannot close account with non-zero balance!");
        }
    }
    
    public void displayInfo() {
        System.out.println("\n=== Account Information ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + String.format("%.2f", balance));
        System.out.println("Account Type: " + accountType);
        System.out.println("Status: " + (isActive ? "Active" : "Inactive"));
    }
}

public class TestBankAccount {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("ACC001", "Alice Johnson", 1000.0, "Savings");
        account.displayInfo();
        
        account.deposit(500);
        account.withdraw(200);
        account.displayInfo();
        
        // Try to close with balance
        account.closeAccount();
        
        // Withdraw all and close
        account.withdraw(1300);
        account.closeAccount();
        account.displayInfo();
    }
}
```

---

### Exercise 2: Student with Grade Validation
Create a Student class with proper encapsulation and validation.

```java
public class Student {
    private String studentId;
    private String name;
    private int age;
    private double gpa;
    private String major;
    private int creditsCompleted;
    
    public Student(String studentId, String name, int age) {
        this.studentId = studentId;
        setName(name);
        setAge(age);
        this.gpa = 0.0;
        this.creditsCompleted = 0;
    }
    
    // Read-only
    public String getStudentId() {
        return studentId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        if (name != null && name.length() >= 2) {
            this.name = name;
        } else {
            System.out.println("Invalid name!");
        }
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age >= 16 && age <= 100) {
            this.age = age;
        } else {
            System.out.println("Invalid age! Must be 16-100");
        }
    }
    
    public double getGPA() {
        return gpa;
    }
    
    public void setGPA(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA! Must be 0.0-4.0");
        }
    }
    
    public String getMajor() {
        return major;
    }
    
    public void setMajor(String major) {
        this.major = major;
    }
    
    public int getCreditsCompleted() {
        return creditsCompleted;
    }
    
    public void addCredits(int credits) {
        if (credits > 0) {
            this.creditsCompleted += credits;
            System.out.println("Added " + credits + " credits");
        } else {
            System.out.println("Invalid credit amount!");
        }
    }
    
    // Calculated property
    public String getAcademicStanding() {
        if (gpa >= 3.5) return "Dean's List";
        else if (gpa >= 3.0) return "Good Standing";
        else if (gpa >= 2.0) return "Satisfactory";
        else return "Academic Probation";
    }
    
    public String getClassLevel() {
        if (creditsCompleted >= 90) return "Senior";
        else if (creditsCompleted >= 60) return "Junior";
        else if (creditsCompleted >= 30) return "Sophomore";
        else return "Freshman";
    }
    
    public void displayInfo() {
        System.out.println("\n=== Student Information ===");
        System.out.println("Student ID: " + studentId);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Major: " + (major != null ? major : "Undeclared"));
        System.out.println("GPA: " + String.format("%.2f", gpa));
        System.out.println("Credits: " + creditsCompleted);
        System.out.println("Class Level: " + getClassLevel());
        System.out.println("Academic Standing: " + getAcademicStanding());
    }
}

public class TestStudent {
    public static void main(String[] args) {
        Student student = new Student("S001", "Alice Johnson", 20);
        student.setMajor("Computer Science");
        student.setGPA(3.7);
        student.addCredits(45);
        
        student.displayInfo();
        
        // Try invalid values
        student.setAge(15);  // Too young
        student.setGPA(5.0);  // Too high
        
        // Update and display again
        student.addCredits(20);
        student.setGPA(3.9);
        student.displayInfo();
    }
}
```

---

### Exercise 3: Product Inventory System
Create an encapsulated Product class for inventory management.

```java
public class Product {
    private String productId;
    private String name;
    private String category;
    private double price;
    private int stockQuantity;
    private int reorderLevel;
    private String supplier;
    
    public Product(String productId, String name, String category, double price, int stockQuantity) {
        this.productId = productId;
        setName(name);
        setCategory(category);
        setPrice(price);
        setStockQuantity(stockQuantity);
        this.reorderLevel = 10;  // Default
    }
    
    // Read-only
    public String getProductId() {
        return productId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        } else {
            System.out.println("Invalid product name!");
        }
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double price) {
        if (price >= 0) {
            this.price = price;
        } else {
            System.out.println("Price cannot be negative!");
        }
    }
    
    public int getStockQuantity() {
        return stockQuantity;
    }
    
    private void setStockQuantity(int quantity) {
        if (quantity >= 0) {
            this.stockQuantity = quantity;
        } else {
            System.out.println("Stock quantity cannot be negative!");
            this.stockQuantity = 0;
        }
    }
    
    public int getReorderLevel() {
        return reorderLevel;
    }
    
    public void setReorderLevel(int reorderLevel) {
        if (reorderLevel >= 0) {
            this.reorderLevel = reorderLevel;
        }
    }
    
    public String getSupplier() {
        return supplier;
    }
    
    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }
    
    // Business methods
    public boolean addStock(int quantity) {
        if (quantity > 0) {
            stockQuantity += quantity;
            System.out.println("Added " + quantity + " units to stock");
            return true;
        }
        System.out.println("Invalid quantity!");
        return false;
    }
    
    public boolean removeStock(int quantity) {
        if (quantity > 0 && quantity <= stockQuantity) {
            stockQuantity -= quantity;
            System.out.println("Removed " + quantity + " units from stock");
            
            if (needsReorder()) {
                System.out.println("WARNING: Stock below reorder level!");
            }
            return true;
        }
        System.out.println("Invalid quantity or insufficient stock!");
        return false;
    }
    
    public boolean needsReorder() {
        return stockQuantity

 <= reorderLevel;
    }
    
    public double getTotalValue() {
        return price * stockQuantity;
    }
    
    public void displayInfo() {
        System.out.println("\n=== Product Information ===");
        System.out.println("Product ID: " + productId);
        System.out.println("Name: " + name);
        System.out.println("Category: " + category);
        System.out.println("Price: $" + String.format("%.2f", price));
        System.out.println("Stock Quantity: " + stockQuantity);
        System.out.println("Reorder Level: " + reorderLevel);
        System.out.println("Supplier: " + (supplier != null ? supplier : "Not assigned"));
        System.out.println("Total Value: $" + String.format("%.2f", getTotalValue()));
        System.out.println("Status: " + (needsReorder() ? "NEEDS REORDER" : "OK"));
    }
}

public class TestProduct {
    public static void main(String[] args) {
        Product product = new Product("P001", "Laptop", "Electronics", 999.99, 25);
        product.setSupplier("TechSupply Inc.");
        product.setReorderLevel(15);
        
        product.displayInfo();
        
        // Sell some products
        product.removeStock(12);
        product.displayInfo();
        
        // Restock
        product.addStock(20);
        product.displayInfo();
    }
}
```

---

### Exercise 4: Employee with Salary Management
Create an Employee class with encapsulated salary management.

```java
public class Employee {
    private String employeeId;
    private String name;
    private String department;
    private double baseSalary;
    private double bonus;
    private int yearsOfService;
    private boolean isActive;
    
    public Employee(String employeeId, String name, String department, double baseSalary) {
        this.employeeId = employeeId;
        setName(name);
        setDepartment(department);
        setBaseSalary(baseSalary);
        this.bonus = 0.0;
        this.yearsOfService = 0;
        this.isActive = true;
    }
    
    // Read-only
    public String getEmployeeId() {
        return employeeId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public double getBaseSalary() {
        return baseSalary;
    }
    
    private void setBaseSalary(double baseSalary) {
        if (baseSalary > 0) {
            this.baseSalary = baseSalary;
        }
    }
    
    public double getBonus() {
        return bonus;
    }
    
    public void setBonus(double bonus) {
        if (bonus >= 0) {
            this.bonus = bonus;
        }
    }
    
    public int getYearsOfService() {
        return yearsOfService;
    }
    
    public void incrementYearsOfService() {
        yearsOfService++;
        System.out.println("Years of service updated to: " + yearsOfService);
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    // Business methods
    public void giveRaise(double percentage) {
        if (percentage > 0 && percentage <= 50) {
            double raiseAmount = baseSalary * (percentage / 100);
            baseSalary += raiseAmount;
            System.out.println("Raise of " + percentage + "% applied. New salary: $" + 
                             String.format("%.2f", baseSalary));
        } else {
            System.out.println("Invalid raise percentage!");
        }
    }
    
    public double getTotalCompensation() {
        return baseSalary + bonus;
    }
    
    public void terminate() {
        isActive = false;
        System.out.println("Employee " + name + " has been terminated");
    }
    
    public void displayInfo() {
        System.out.println("\n=== Employee Information ===");
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Name: " + name);
        System.out.println("Department: " + department);
        System.out.println("Base Salary: $" + String.format("%.2f", baseSalary));
        System.out.println("Bonus: $" + String.format("%.2f", bonus));
        System.out.println("Total Compensation: $" + String.format("%.2f", getTotalCompensation()));
        System.out.println("Years of Service: " + yearsOfService);
        System.out.println("Status: " + (isActive ? "Active" : "Terminated"));
    }
}

public class TestEmployee {
    public static void main(String[] args) {
        Employee emp = new Employee("E001", "Alice Johnson", "IT", 60000);
        emp.displayInfo();
        
        emp.setBonus(5000);
        emp.incrementYearsOfService();
        emp.giveRaise(10);
        emp.displayInfo();
    }
}
```

---

### Exercise 5: Car with Mileage Tracking
Create a Car class with encapsulated mileage and maintenance tracking.

```java
public class Car {
    private String vin;  // Vehicle Identification Number
    private String make;
    private String model;
    private int year;
    private int mileage;
    private double fuelLevel;
    private final double FUEL_CAPACITY = 50.0;  // gallons
    private int lastServiceMileage;
    private final int SERVICE_INTERVAL = 5000;  // miles
    
    public Car(String vin, String make, String model, int year) {
        this.vin = vin;
        this.make = make;
        this.model = model;
        setYear(year);
        this.mileage = 0;
        this.fuelLevel = FUEL_CAPACITY;
        this.lastServiceMileage = 0;
    }
    
    // Read-only properties
    public String getVin() {
        return vin;
    }
    
    public String getMake() {
        return make;
    }
    
    public String getModel() {
        return model;
    }
    
    public int getYear() {
        return year;
    }
    
    private void setYear(int year) {
        int currentYear = 2024;
        if (year >= 1900 && year <= currentYear) {
            this.year = year;
        } else {
            System.out.println("Invalid year!");
            this.year = currentYear;
        }
    }
    
    public int getMileage() {
        return mileage;
    }
    
    public double getFuelLevel() {
        return fuelLevel;
    }
    
    public double getFuelCapacity() {
        return FUEL_CAPACITY;
    }
    
    // Business methods
    public void drive(int miles) {
        if (miles <= 0) {
            System.out.println("Invalid miles!");
            return;
        }
        
        double fuelNeeded = miles / 25.0;  // 25 MPG
        
        if (fuelNeeded > fuelLevel) {
            System.out.println("Not enough fuel! Need to refuel.");
            return;
        }
        
        mileage += miles;
        fuelLevel -= fuelNeeded;
        System.out.println("Drove " + miles + " miles");
        
        if (needsService()) {
            System.out.println("WARNING: Service required!");
        }
        
        if (fuelLevel < 5.0) {
            System.out.println("WARNING: Low fuel!");
        }
    }
    
    public void refuel(double gallons) {
        if (gallons <= 0) {
            System.out.println("Invalid fuel amount!");
            return;
        }
        
        double spaceAvailable = FUEL_CAPACITY - fuelLevel;
        double actualFuel = Math.min(gallons, spaceAvailable);
        
        fuelLevel += actualFuel;
        System.out.println("Refueled " + String.format("%.2f", actualFuel) + " gallons");
        
        if (actualFuel < gallons) {
            System.out.println("Tank is full. " + 
                             String.format("%.2f", gallons - actualFuel) + 
                             " gallons not added");
        }
    }
    
    public boolean needsService() {
        return (mileage - lastServiceMileage) >= SERVICE_INTERVAL;
    }
    
    public void performService() {
        lastServiceMileage = mileage;
        System.out.println("Service completed at " + mileage + " miles");
    }
    
    public int getMilesSinceService() {
        return mileage - lastServiceMileage;
    }
    
    public int getMilesUntilService() {
        int remaining = SERVICE_INTERVAL - getMilesSinceService();
        return Math.max(0, remaining);
    }
    
    public void displayInfo() {
        System.out.println("\n=== Car Information ===");
        System.out.println("VIN: " + vin);
        System.out.println("Make: " + make);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Mileage: " + mileage + " miles");
        System.out.println("Fuel Level: " + String.format("%.2f", fuelLevel) + 
                         " / " + FUEL_CAPACITY + " gallons");
        System.out.println("Miles Since Service: " + getMilesSinceService());
        System.out.println("Miles Until Service: " + getMilesUntilService());
        System.out.println("Service Status: " + (needsService() ? "REQUIRED" : "OK"));
    }
}

public class TestCar {
    public static void main(String[] args) {
        Car car = new Car("1HGBH41JXMN109186", "Honda", "Accord", 2020);
        car.displayInfo();
        
        car.drive(100);
        car.displayInfo();
        
        car.drive(5000);
        car.displayInfo();
        
        car.performService();
        car.refuel(20);
        car.displayInfo();
    }
}
```

---

### Exercise 6: Temperature Sensor with Range Validation
Create a TemperatureSensor class with validation.

```java
public class TemperatureSensor {
    private String sensorId;
    private String location;
    private double currentTemperature;
    private double minTemperature;
    private double maxTemperature;
    private final double ABSOLUTE_MIN = -273.15;  // Celsius
    private final double ABSOLUTE_MAX = 1000.0;
    private boolean isActive;
    
    public TemperatureSensor(String sensorId, String location) {
        this.sensorId = sensorId;
        this.location = location;
        this.currentTemperature = 20.0;  // Default room temperature
        this.minTemperature = 20.0;
        this.maxTemperature = 20.0;
        this.isActive = true;
    }
    
    public String getSensorId() {
        return sensorId;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public double getCurrentTemperature() {
        return currentTemperature;
    }
    
    public void setCurrentTemperature(double temperature) {
        if (temperature >= ABSOLUTE_MIN && temperature <= ABSOLUTE_MAX) {
            this.currentTemperature = temperature;
            
            // Update min/max
            if (temperature < minTemperature) {
                minTemperature = temperature;
            }
            if (temperature > maxTemperature) {
                maxTemperature = temperature;
            }
            
            System.out.println("Temperature updated to: " + 
                             String.format("%.2f", temperature) + "°C");
        } else {
            System.out.println("Invalid temperature! Must be between " + 
                             ABSOLUTE_MIN + " and " + ABSOLUTE_MAX);
        }
    }
    
    public double getMinTemperature() {
        return minTemperature;
    }
    
    public double getMaxTemperature() {
        return maxTemperature;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void activate() {
        isActive = true;
        System.out.println("Sensor activated");
    }
    
    public void deactivate() {
        isActive = false;
        System.out.println("Sensor deactivated");
    }
    
    public double getTemperatureRange() {
        return maxTemperature - minTemperature;
    }
    
    public double getAverageTemperature() {
        return (minTemperature + maxTemperature) / 2.0;
    }
    
    public void resetMinMax() {
        minTemperature = currentTemperature;
        maxTemperature = currentTemperature;
        System.out.println("Min/Max temperatures reset");
    }
    
    public void displayInfo() {
        System.out.println("\n=== Temperature Sensor ===");
        System.out.println("Sensor ID: " + sensorId);
        System.out.println("Location: " + location);
        System.out.println("Current: " + String.format("%.2f", currentTemperature) + "°C");
        System.out.println("Minimum: " + String.format("%.2f", minTemperature) + "°C");
        System.out.println("Maximum: " + String.format("%.2f", maxTemperature) + "°C");
        System.out.println("Range: " + String.format("%.2f", getTemperatureRange()) + "°C");
        System.out.println("Average: " + String.format("%.2f", getAverageTemperature()) + "°C");
        System.out.println("Status: " + (isActive ? "Active" : "Inactive"));
    }
}

public class TestTemperatureSensor {
    public static void main(String[] args) {
        TemperatureSensor sensor = new TemperatureSensor("TEMP001", "Server Room");
        sensor.displayInfo();
        
        sensor.setCurrentTemperature(25.5);
        sensor.setCurrentTemperature(18.0);
        sensor.setCurrentTemperature(30.0);
        sensor.displayInfo();
        
        sensor.resetMinMax();
        sensor.displayInfo();
    }
}
```

---

### Exercise 7: Library Book with Checkout System
Create a Book class for library management.

```java
public class Book {
    private String isbn;
    private String title;
    private String author;
    private String category;
    private boolean isAvailable;
    private String borrowerName;
    private int checkoutCount;
    private final int MAX_CHECKOUTS = 50;
    
    public Book(String isbn, String title, String author, String category) {
        this.isbn = isbn;
        setTitle(title);
        setAuthor(author);
        this.category = category;
        this.isAvailable = true;
        this.checkoutCount = 0;
    }
    
    // Read-only
    public String getIsbn() {
        return isbn;
    }
    
    public String getTitle() {
        return title;
    }
    
    private void setTitle(String title) {
        if (title != null && !title.trim().isEmpty()) {
            this.title = title;
        }
    }
    
    public String getAuthor() {
        return author;
    }
    
    private void setAuthor(String author) {
        if (author != null && !author.trim().isEmpty()) {
            this.author = author;
        }
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public boolean isAvailable() {
        return isAvailable;
    }
    
    public String getBorrowerName() {
        return borrowerName;
    }
    
    public int getCheckoutCount() {
        return checkoutCount;
    }
    
    // Business methods
    public boolean checkout(String borrowerName) {
        if (!isAvailable) {
            System.out.println("Book is already checked out!");
            return false;
        }
        
        if (checkoutCount >= MAX_CHECKOUTS) {
            System.out.println("Book has reached maximum checkout limit!");
            return false;
        }
        
        if (borrowerName == null || borrowerName.trim().isEmpty()) {
            System.out.println("Invalid borrower name!");
            return false;
        }
        
        this.isAvailable = false;
        this.borrowerName = borrowerName;
        this.checkoutCount++;
        System.out.println("Book checked out to: " + borrowerName);
        return true;
    }
    
    public boolean returnBook() {
        if (isAvailable) {
            System.out.println("Book is not checked out!");
            return false;
        }
        
        System.out.println("Book returned by: " + borrowerName);
        this.isAvailable = true;
        this.borrowerName = null;
        return true;
    }
    
    public boolean needsReplacement() {
        return checkoutCount >= MAX_CHECKOUTS;
    }
    
    public int getRemainingCheckouts() {
        return Math.max(0, MAX_CHECKOUTS - checkoutCount);
    }
    
    public void displayInfo() {
        System.out.println("\n=== Book Information ===");
        System.out.println("ISBN: " + isbn);
        System.out.println("Title: " + title);
        System.out.println("Author: " + author);
        System.out.println("Category: " + category);
        System.out.println("Status: " + (isAvailable ? "Available" : "Checked Out"));
        if (!isAvailable) {
            System.out.println("Borrowed by: " + borrowerName);
        }
        System.out.println("Checkout Count: " + checkoutCount + " / " + MAX_CHECKOUTS);
        System.out.println("Remaining Checkouts: " + getRemainingCheckouts());
    }
}

public class TestBook {
    public static void main(String[] args) {
        Book book = new Book("978-0134685991", "Effective Java", 
                            "Joshua Bloch", "Programming");
        book.displayInfo();
        
        book.checkout("Alice Johnson");
        book.displayInfo();
        
        book.returnBook();
        book.displayInfo();
        
        book.checkout("Bob Smith");
        book.displayInfo();
    }
}
```

---

### Exercise 8: Circle with Immutable Properties
Create a Circle class demonstrating immutability.

```java
public final class Circle {
    private final double radius;
    private final String color;
    private final double PI = 3.14159;
    
    public Circle(double radius, String color) {
        if (radius > 0) {
            this.radius = radius;
        } else {
            this.radius = 1.0;
            System.out.println("Invalid radius! Set to 1.0");
        }
        this.color = color != null ? color : "Red";
    }
    
    // Only getters, no setters (immutable)
    public double getRadius() {
        return radius;
    }
    
    public String getColor() {
        return color;
    }
    
    public double getArea() {
        return PI * radius * radius;
    }
    
    public double getCircumference() {
        return 2 * PI * radius;
    }
    
    public double getDiameter() {
        return 2 * radius;
    }
    
    // To "modify", create new object
    public Circle withRadius(double newRadius) {
        return new Circle(newRadius, this.color);
    }
    
    public Circle withColor(String newColor) {
        return new Circle(this.radius, newColor);
    }
    
    public Circle scale(double factor) {
        return new Circle(this.radius * factor, this.color);
    }
    
    public void displayInfo() {
        System.out.println("\n=== Circle Information ===");
        System.out.println("Radius: " + radius);
        System.out.println("Color: " + color);
        System.out.println("Diameter: " + String.format("%.2f", getDiameter()));
        System.out.println("Area: " + String.format("%.2f", getArea()));
        System.out.println("Circumference: " + String.format("%.2f", getCircumference()));
    }
}

public class TestCircle {
    public static void main(String[] args) {
        Circle circle1 = new Circle(5.0, "Red");
        circle1.displayInfo();
        
        // Create new circles with modifications
        Circle circle2 = circle1.withRadius(10.0);
        circle2.displayInfo();
        
        Circle circle3 = circle1.withColor("Blue");
        circle3.displayInfo();
        
        Circle circle4 = circle1.scale(2.0);
        circle4.displayInfo();
        
        // Original unchanged
        System.out.println("\nOriginal circle:");
        circle1.displayInfo();
    }
}
```

---

### Exercise 9: Password Manager
Create a PasswordManager class with secure encapsulation.

```java
public class PasswordManager {
    private String username;
    private String password;
    private String email;
    private int failedAttempts;
    private final int MAX_ATTEMPTS = 3;
    private boolean isLocked;
    
    public PasswordManager(String username, String email) {
        setUsername(username);
        setEmail(email);
        this.failedAttempts = 0;
        this.isLocked = false;
    }
    
    public String getUsername() {
        return username;
    }
    
    private void setUsername(String username) {
        if (username != null && username.length() >= 3) {
            this.username = username;
        } else {
            System.out.println("Username must be at least 3 characters!");
        }
    }
    
    public String getEmail() {
        return email;
    }
    
    private void setEmail(String email) {
        if (email != null && email.contains("@")) {
            this.email = email;
        } else {
            System.out.println("Invalid email!");
        }
    }
    
    // No getter for password (security)
    public void setPassword(String password) {
        if (password == null || password.length() < 8) {
            System.out.println("Password must be at least 8 characters!");
            return;
        }
        
        if (!hasUpperCase(password)) {
            System.out.println("Password must contain at least one uppercase letter!");
            return;
        }
        
        if (!hasLowerCase(password)) {
            System.out.println("Password must contain at least one lowercase letter!");
            return;
        }
        
        if (!hasDigit(password)) {
            System.out.println("Password must contain at least one digit!");
            return;
        }
        
        this.password = password;
        System.out.println("Password set successfully!");
    }
    
    private boolean hasUpperCase(String str) {
        for (char c : str.toCharArray()) {
            if (Character.isUpperCase(c)) return true;
        }
        return false;
    }
    
    private boolean hasLowerCase(String str) {
        for (char c : str.toCharArray()) {
            if (Character.isLowerCase(c)) return true;
        }
        return false;
    }
    
    private boolean hasDigit(String str) {
        for (char c : str.toCharArray()) {
            if (Character.isDigit(c)) return true;
        }
        return false;
    }
    
    public boolean verifyPassword(String password) {
        if (isLocked) {
            System.out.println("Account is locked due to too many failed attempts!");
            return false;
        }
        
        if (this.password == null) {
            System.out.println("No password set!");
            return false;
        }
        
        if (this.password.equals(password)) {
            failedAttempts = 0;
            System.out.println("Password verified successfully!");
            return true;
        } else {
            failedAttempts++;
            System.out.println("Incorrect password! Attempts: " + failedAttempts + "/" + MAX_ATTEMPTS);
            
            if (failedAttempts >= MAX_ATTEMPTS) {
                isLocked = true;
                System.out.println("Account locked!");
            }
            return false;
        }
    }
    
    public boolean isLocked() {
        return isLocked;
    }
    
    public void unlock(String email) {
        if (this.email.equals(email)) {
            isLocked = false;
            failedAttempts = 0;
            System.out.println("Account unlocked!");
        } else {
            System.out.println("Email verification failed!");
        }
    }
    
    public int getRemainingAttempts() {
        return Math.max(0, MAX_ATTEMPTS - failedAttempts);
    }
    
    public void displayInfo() {
        System.out.println("\n=== Account Information ===");
        System.out.println("Username: " + username);
        System.out.println("Email: " + email);
        System.out.println("Password: " + (password != null ? "********" : "Not set"));
        System.out.println("Failed Attempts: " + failedAttempts);
        System.out.println("Remaining Attempts: " + getRemainingAttempts());
        System.out.println("Status: " + (isLocked ? "LOCKED" : "Active"));
    }
}

public class TestPasswordManager {
    public static void main(String[] args) {
        PasswordManager pm = new PasswordManager("alice123", "alice@example.com");
        pm.displayInfo();
        
        // Set password with validation
        pm.setPassword("weak");  // Too short
        pm.setPassword("weakpassword");  // No uppercase or digit
        pm.setPassword("StrongPass123");  // Valid
        
        pm.displayInfo();
        
        // Verify password
        pm.verifyPassword("wrong");
        pm.verifyPassword("wrong");
        pm.verifyPassword("wrong");  // Account locked
        
        pm.displayInfo();
        
        // Unlock
        pm.unlock("alice@example.com");
        pm.displayInfo();
    }
}
```

---

### Exercise 10: Shopping Cart with Price Calculation
Create a ShoppingCart class with encapsulated pricing logic.

```java
public class ShoppingCart {
    private String cartId;
    private String customerId;
    private double subtotal;
    private double taxRate;
    private double discountPercentage;
    private int itemCount;
    private final double MAX_CART_VALUE = 10000.0;
    
    public ShoppingCart(String cartId, String customerId) {
        this.cartId = cartId;
        this.customerId = customerId;
        this.subtotal = 0.0;
        this.taxRate = 0.08;  // 8% default
        this.discountPercentage = 0.0;
        this.itemCount = 0;
    }
    
    // Read-only
    public String getCartId() {
        return cartId;
    }
    
    public String getCustomerId() {
        return customerId;
    }
    
    public double getSubtotal() {
        return subtotal;
    }
    
    public double getTaxRate() {
        return taxRate;
    }
    
    public void setTaxRate(double taxRate) {
        if (taxRate >= 0 && taxRate <= 0.20) {  // Max 20%
            this.taxRate = taxRate;
        } else {
            System.out.println("Invalid tax rate!");
        }
    }
    
    public double getDiscountPercentage() {
        return discountPercentage;
    }
    
    public void setDiscountPercentage(double discountPercentage) {
        if (discountPercentage >= 0 && discountPercentage <= 100) {
            this.discountPercentage = discountPercentage;
        } else {
            System.out.println("Invalid discount percentage!");
        }
    }
    
    public int getItemCount() {
        return itemCount;
    }
    
    // Business methods
    public boolean addItem(double price) {
        if (price <= 0) {
            System.out.println("Invalid price!");
            return false;
        }
        
        if (subtotal + price > MAX_CART_VALUE) {
            System.out.println("Cannot add item. Exceeds maximum cart value!");
            return false;
        }
        
        subtotal += price;
        itemCount++;
        System.out.println("Item added. Price: $" + String.format("%.2f", price));
        return true;
    }
    
    public boolean removeItem(double price) {
        if (price <= 0 || price > subtotal) {
            System.out.println("Invalid price!");
            return false;
        }
        
        subtotal -= price;
        itemCount--;
        System.out.println("Item removed. Price: $" + String.format("%.2f", price));
        return true;
    }
    
    public double getDiscountAmount() {
        return subtotal * (discountPercentage / 100);
    }
    
    public double getTaxAmount() {
        double afterDiscount = subtotal - getDiscountAmount();
        return afterDiscount * taxRate;
    }
    
    public double getTotal() {
        return subtotal - getDiscountAmount() + getTaxAmount();
    }
    
    public void clear() {
        subtotal = 0.0;
        itemCount = 0;
        discountPercentage = 0.0;
        System.out.println("Cart cleared");
    }
    
    public void displaySummary() {
        System.out.println("\n=== Shopping Cart Summary ===");
        System.out.println("Cart ID: " + cartId);
        System.out.println("Customer ID: " + customerId);
        System.out.println("Items: " + itemCount);
        System.out.println("Subtotal: $" + String.format("%.2f", subtotal));
        System.out.println("Discount (" + discountPercentage + "%): -$" + 
                         String.format("%.2f", getDiscountAmount()));
        System.out.println("Tax (" + (taxRate * 100) + "%): $" + 
                         String.format("%.2f", getTaxAmount()));
        System.out.println("Total: $" + String.format("%.2f", getTotal()));
    }
}

public class TestShoppingCart {
    public static void main(String[] args) {
        Shopping
Cart cart = new ShoppingCart("CART001", "CUST123");
        
        cart.addItem(29.99);
        cart.addItem(49.99);
        cart.addItem(19.99);
        cart.displaySummary();
        
        cart.setDiscountPercentage(10);
        cart.displaySummary();
        
        cart.removeItem(19.99);
        cart.displaySummary();
    }
}
```

---

## 🔑 Key Takeaways

1. **Encapsulation**: Bundling data and methods, restricting direct access
2. **Data Hiding**: Make fields private, provide public methods
3. **Access Modifiers**: private, public, protected, default (package-private)
4. **Getters/Setters**: Controlled access to private fields
5. **Validation**: Ensure data integrity in setters
6. **Read-Only Properties**: Provide getter but no setter
7. **Write-Only Properties**: Provide setter but no getter
8. **Immutability**: Final fields, no setters, return new objects
9. **Security**: Hide sensitive data (passwords, keys)
10. **Flexibility**: Change implementation without affecting external code

---

## ⚠️ Common Mistakes

### 1. Making Everything Public:
```java
// WRONG - No encapsulation
public class Student {
    public String name;
    public int age;
    public double gpa;
}

// CORRECT - Proper encapsulation
public class Student {
    private String name;
    private int age;
    private double gpa;
    
    // Provide controlled access
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

### 2. No Validation in Setters:
```java
// WRONG - No validation
public void setAge(int age) {
    this.age = age;  // Could be negative!
}

// CORRECT - With validation
public void setAge(int age) {
    if (age > 0 && age < 150) {
        this.age = age;
    } else {
        System.out.println("Invalid age!");
    }
}
```

### 3. Exposing Mutable Objects:
```java
// WRONG - Exposes internal array
public class Classroom {
    private int[] grades;
    
    public int[] getGrades() {
        return grades;  // Caller can modify!
    }
}

// CORRECT - Return copy
public class Classroom {
    private int[] grades;
    
    public int[] getGrades() {
        return grades.clone();  // Return copy
    }
}
```

### 4. Inconsistent Naming:
```java
// WRONG - Inconsistent naming
public class Person {
    private String name;
    
    public String fetchName() { return name; }  // Should be getName()
    public void updateName(String name) { this.name = name; }  // Should be setName()
}

// CORRECT - Standard naming
public class Person {
    private String name;
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

### 5. Setter Returning void When Chaining Needed:
```java
// WRONG - Cannot chain
public void setName(String name) {
    this.name = name;
}

// CORRECT - Enables chaining
public Person setName(String name) {
    this.name = name;
    return this;
}

// Usage: person.setName("Alice").setAge(25).setEmail("alice@example.com");
```

### 6. Not Using `this` in Setters:
```java
// WRONG - Ambiguous
public void setName(String name) {
    name = name;  // Assigns parameter to itself!
}

// CORRECT - Use this
public void setName(String name) {
    this.name = name;  // Clear distinction
}
```

### 7. Providing Setter for ID Fields:
```java
// WRONG - ID should be immutable
public class Employee {
    private String employeeId;
    
    public void setEmployeeId(String id) {  // Should not exist!
        this.employeeId = id;
    }
}

// CORRECT - ID is read-only
public class Employee {
    private final String employeeId;
    
    public Employee(String employeeId) {
        this.employeeId = employeeId;
    }
    
    public String getEmployeeId() {
        return employeeId;
    }
    // No setter!
}
```

### 8. Exposing Implementation Details:
```java
// WRONG - Exposes ArrayList
public class StudentList {
    private ArrayList<String> students;
    
    public ArrayList<String> getStudents() {
        return students;  // Exposes implementation
    }
}

// CORRECT - Use interface
public class StudentList {
    private ArrayList<String> students;
    
    public List<String> getStudents() {
        return new ArrayList<>(students);  // Return copy as List
    }
}
```

### 9. Not Validating in Constructor:
```java
// WRONG - No validation
public class Product {
    private double price;
    
    public Product(double price) {
        this.price = price;  // Could be negative!
    }
}

// CORRECT - Validate in constructor
public class Product {
    private double price;
    
    public Product(double price) {
        setPrice(price);  // Use setter for validation
    }
    
    public void setPrice(double price) {
        if (price >= 0) {
            this.price = price;
        } else {
            throw new IllegalArgumentException("Price cannot be negative");
        }
    }
}
```

### 10. Over-Encapsulation:
```java
// WRONG - Too many getters/setters for simple data holder
public class Point {
    private int x;
    private int y;
    
    public int getX() { return x; }
    public void setX(int x) { this.x = x; }
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
}

// BETTER - For simple data holders, consider public fields or records (Java 14+)
public class Point {
    public final int x;
    public final int y;
    
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

---

## 🔗 Navigation

### Previous Day
← [Day 10: Methods & Method Overloading](day10_methods_overloading.md)

### Next Day
→ [Day 12: Inheritance](day12_inheritance.md)

### Week Overview
↑ [Week 2: Object-Oriented Programming Fundamentals](README.md)

### Course Home
🏠 [Core Java Daily Learning](../README.md)

### Related Topics
- [Day 9: Constructors](day09_constructors_this.md) - Using constructors with private fields
- [Day 10: Methods](day10_methods_overloading.md) - Public methods for controlled access
- [Day 12: Inheritance](day12_inheritance.md) - Protected access in inheritance

### Assessment
📝 [Day 11 Assessment](../../assessments/java/week2/day11_assessment.js) - Test your encapsulation knowledge

---

**Daily Practice Reminder**: Complete all exercises before moving to the next day. Encapsulation is fundamental to writing secure, maintainable code!

**Estimated Study Time**: 4-5 hours

**Difficulty Level**: ⭐⭐⭐⭐ Intermediate-Advanced

---

*Last Updated: 2024-01-08*
*Part of Week 2: Object-Oriented Programming Fundamentals*