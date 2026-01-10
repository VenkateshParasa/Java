
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

### 1. Access Modifier Misuse

#### ❌ Wrong - Making All Fields Public:
```java
// WRONG - No encapsulation
public class Student {
    public String name;
    public int age;
    public double gpa;
}

// Anyone can do this:
Student s = new Student();
s.age = -5;      // Invalid! No validation
s.gpa = 10.0;    // Invalid! GPA should be 0-4
```
**Issue:** Public fields expose data without validation or control

#### ✅ Right:
```java
// CORRECT - Proper encapsulation
public class Student {
    private String name;
    private int age;
    private double gpa;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age!");
        }
    }

    public double getGPA() {
        return gpa;
    }

    public void setGPA(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA!");
        }
    }
}
```

**Why:** Private fields with public getters/setters allow validation and controlled access.

**💡 Tip:** Default to private fields; only expose through methods when necessary.

---

#### ❌ Wrong - Using Default Access When Private Intended:
```java
// WRONG - Accidentally default access
public class BankAccount {
    double balance;  // Package-private! Other classes in same package can access
    String accountNumber;
}

// In another class in same package:
BankAccount account = new BankAccount();
account.balance = -1000;  // Direct access! Bad!
```
**Issue:** Missing access modifier makes field package-private, not private

#### ✅ Right:
```java
// CORRECT - Explicitly private
public class BankAccount {
    private double balance;
    private String accountNumber;

    public double getBalance() {
        return balance;
    }

    private void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        }
    }
}
```

**Why:** Explicit `private` ensures field is truly hidden from other classes.

**💡 Tip:** Always explicitly declare access modifiers; don't rely on defaults.

---

#### ❌ Wrong - Making Methods Private That Should Be Public:
```java
// WRONG
public class Calculator {
    private int add(int a, int b) {  // Private!
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int result = calc.add(5, 10);  // Compilation error! add is private
    }
}
```
**Issue:** Public API methods marked as private prevent external use

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {  // Public API
        return a + b;
    }

    private int validateInput(int value) {  // Private helper
        return Math.max(0, value);
    }
}
```

**Why:** Public for API methods users need; private for internal helper methods.

**💡 Tip:** Public = external API; Private = internal implementation.

---

#### ❌ Wrong - Using Protected for Non-Inheritance Scenarios:
```java
// WRONG
public class User {
    protected String password;  // Protected but not meant for inheritance

    public User(String password) {
        this.password = password;
    }
}

// Subclass can access password directly
public class AdminUser extends User {
    public AdminUser(String password) {
        super(password);
    }

    public void displayPassword() {
        System.out.println(password);  // Direct access! Security risk!
    }
}
```
**Issue:** Protected exposes sensitive fields to subclasses unnecessarily

#### ✅ Right:
```java
// CORRECT - Use private for sensitive data
public class User {
    private String password;  // Private

    public User(String password) {
        this.password = password;
    }

    // Provide protected method for subclasses if needed
    protected boolean verifyPassword(String input) {
        return this.password.equals(input);
    }
}

public class AdminUser extends User {
    public AdminUser(String password) {
        super(password);
    }

    public void checkPassword(String input) {
        if (verifyPassword(input)) {  // Controlled access
            System.out.println("Password correct");
        }
    }
}
```

**Why:** Private protects sensitive data; protected methods provide controlled access.

**💡 Tip:** Use protected only for fields/methods intended for subclass extension.

---

#### ❌ Wrong - Package-Private Classes When Public Needed:
```java
// File: Calculator.java
// WRONG - Missing public keyword
class Calculator {  // Default (package-private)
    public int add(int a, int b) {
        return a + b;
    }
}

// File: Main.java (different package)
import com.example.Calculator;  // Compilation error! Calculator not accessible

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();  // Error!
    }
}
```
**Issue:** Missing `public` on class makes it package-private

#### ✅ Right:
```java
// File: Calculator.java
// CORRECT - Public class
public class Calculator {  // Explicitly public
    public int add(int a, int b) {
        return a + b;
    }
}

// File: Main.java (different package)
import com.example.Calculator;  // Works!

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();  // Works!
    }
}
```

**Why:** Public classes are accessible from any package; package-private only within package.

**💡 Tip:** Classes meant for external use must be explicitly `public`.

---

### 2. Getter and Setter Mistakes

#### ❌ Wrong - No Validation in Setters:
```java
// WRONG
public class Person {
    private int age;

    public void setAge(int age) {
        this.age = age;  // Accepts negative values!
    }
}

Person p = new Person();
p.setAge(-5);  // No error, but logically wrong
System.out.println(p.getAge());  // -5
```
**Issue:** Setter accepts invalid values without validation

#### ✅ Right:
```java
// CORRECT
public class Person {
    private int age;

    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            throw new IllegalArgumentException("Age must be 0-150");
        }
    }

    public int getAge() {
        return age;
    }
}
```

**Why:** Setters enforce business rules and prevent invalid state.

**💡 Tip:** Always validate in setters; throw exceptions for invalid values.

---

#### ❌ Wrong - Setter Without Using `this` Keyword:
```java
// WRONG
public class Student {
    private String name;
    private int age;

    public void setName(String name) {
        name = name;  // Assigns parameter to itself! Instance variable unchanged
    }

    public void setAge(int age) {
        age = age;  // Same problem
    }
}

Student s = new Student();
s.setName("Alice");
System.out.println(s.getName());  // null! name not set
```
**Issue:** Parameter shadows field; assignment does nothing

#### ✅ Right:
```java
// CORRECT
public class Student {
    private String name;
    private int age;

    public void setName(String name) {
        this.name = name;  // this.name = field, name = parameter
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

**Why:** `this` keyword distinguishes instance variable from parameter.

**💡 Tip:** Use `this.fieldName` in setters when parameter names match fields.

---

#### ❌ Wrong - Inconsistent Getter/Setter Naming:
```java
// WRONG
public class Product {
    private String name;
    private double price;

    public String fetchName() { return name; }       // Should be getName()
    public void updateName(String name) { this.name = name; }  // Should be setName()
    public double retrievePrice() { return price; }  // Should be getPrice()
    public void modifyPrice(double price) { this.price = price; }  // Should be setPrice()
}
```
**Issue:** Non-standard naming breaks JavaBeans convention and tools

#### ✅ Right:
```java
// CORRECT
public class Product {
    private String name;
    private double price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if (price >= 0) {
            this.price = price;
        }
    }
}
```

**Why:** Standard get/set naming enables frameworks and IDEs to recognize properties.

**💡 Tip:** Always use `getName()`, `setName()` pattern; `isName()` for booleans.

---

#### ❌ Wrong - Boolean Getter Not Using `is` Prefix:
```java
// WRONG
public class User {
    private boolean active;
    private boolean admin;

    public boolean getActive() { return active; }    // Should be isActive()
    public boolean getAdmin() { return admin; }      // Should be isAdmin()
}
```
**Issue:** Boolean getters should use `is` prefix, not `get`

#### ✅ Right:
```java
// CORRECT
public class User {
    private boolean active;
    private boolean admin;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
}
```

**Why:** `is` prefix is standard convention for boolean getters.

**💡 Tip:** Boolean getters: `isFieldName()`, not `getFieldName()`.

---

#### ❌ Wrong - Providing Setter for Immutable Fields:
```java
// WRONG
public class Employee {
    private String employeeId;  // Should be immutable

    public Employee(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {  // Should not exist!
        this.employeeId = employeeId;  // IDs shouldn't change
    }
}
```
**Issue:** Providing setter for fields that should never change

#### ✅ Right:
```java
// CORRECT - Immutable ID
public class Employee {
    private final String employeeId;  // final = immutable

    public Employee(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeId() {
        return employeeId;
    }
    // No setter! ID is read-only
}
```

**Why:** Immutable fields prevent accidental changes to critical data.

**💡 Tip:** Use `final` for immutable fields; provide getter but no setter.

---

#### ❌ Wrong - Returning Mutable Object Directly from Getter:
```java
// WRONG
public class Classroom {
    private int[] grades;

    public Classroom(int[] grades) {
        this.grades = grades;
    }

    public int[] getGrades() {
        return grades;  // Returns direct reference!
    }
}

Classroom classroom = new Classroom(new int[]{90, 85, 95});
int[] grades = classroom.getGrades();
grades[0] = 0;  // Modifies internal array!
System.out.println(classroom.getGrades()[0]);  // 0 - changed!
```
**Issue:** Returning direct reference allows external modification

#### ✅ Right:
```java
// CORRECT - Return defensive copy
public class Classroom {
    private int[] grades;

    public Classroom(int[] grades) {
        this.grades = grades.clone();  // Store copy
    }

    public int[] getGrades() {
        return grades.clone();  // Return copy
    }
}

Classroom classroom = new Classroom(new int[]{90, 85, 95});
int[] grades = classroom.getGrades();
grades[0] = 0;  // Modifies copy only
System.out.println(classroom.getGrades()[0]);  // 90 - original unchanged
```

**Why:** Defensive copying prevents external code from modifying internal state.

**💡 Tip:** Clone arrays/collections before returning from getters.

---

### 3. Encapsulation Principle Violations

#### ❌ Wrong - Exposing Implementation Details:
```java
// WRONG
public class StudentList {
    private ArrayList<String> students;  // Implementation detail

    public ArrayList<String> getStudents() {
        return students;  // Exposes ArrayList implementation
    }
}

// Code becomes coupled to ArrayList
StudentList list = new StudentList();
ArrayList<String> students = list.getStudents();
students.add("New Student");  // Direct modification
```
**Issue:** Exposing concrete implementation prevents future changes

#### ✅ Right:
```java
// CORRECT - Use interface
public class StudentList {
    private ArrayList<String> students;  // Implementation hidden

    public List<String> getStudents() {
        return new ArrayList<>(students);  // Return copy as interface
    }

    public void addStudent(String student) {
        students.add(student);
    }
}

// Code uses interface, implementation can change
StudentList list = new StudentList();
List<String> students = list.getStudents();  // Can't modify original
```

**Why:** Returning interface allows changing implementation without breaking clients.

**💡 Tip:** Return copies and use interfaces to hide implementation details.

---

#### ❌ Wrong - Direct Field Access Between Classes:
```java
// WRONG
public class Car {
    String brand;  // Package-private
    int speed;
}

public class CarRental {
    void rentCar(Car car) {
        car.speed = 100;  // Direct field access
        car.brand = "Modified";  // No validation
    }
}
```
**Issue:** Other classes directly access and modify fields

#### ✅ Right:
```java
// CORRECT
public class Car {
    private String brand;
    private int speed;

    public Car(String brand) {
        this.brand = brand;
        this.speed = 0;
    }

    public void accelerate(int increment) {
        if (increment > 0 && speed + increment <= 200) {
            speed += increment;
        }
    }

    public int getSpeed() {
        return speed;
    }
}

public class CarRental {
    void rentCar(Car car) {
        car.accelerate(100);  // Through controlled method
    }
}
```

**Why:** Methods provide controlled access with validation and business logic.

**💡 Tip:** All field access should go through methods, not direct access.

---

#### ❌ Wrong - Not Validating in Constructor:
```java
// WRONG
public class Rectangle {
    private double length;
    private double width;

    public Rectangle(double length, double width) {
        this.length = length;  // No validation
        this.width = width;    // Could be negative!
    }
}

Rectangle rect = new Rectangle(-5, -10);  // Invalid object created!
```
**Issue:** Constructor accepts invalid values, creating invalid object state

#### ✅ Right:
```java
// CORRECT
public class Rectangle {
    private double length;
    private double width;

    public Rectangle(double length, double width) {
        setLength(length);  // Use setters for validation
        setWidth(width);
    }

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
}
```

**Why:** Constructor validation ensures objects are never in invalid state.

**💡 Tip:** Call setters from constructor to reuse validation logic.

---

#### ❌ Wrong - Breaking Encapsulation in toString():
```java
// WRONG
public class User {
    private String username;
    private String password;  // Sensitive!

    @Override
    public String toString() {
        return "User{username='" + username + "', password='" + password + "'}";
        // Exposes password!
    }
}

User user = new User();
user.setPassword("secret123");
System.out.println(user);  // Prints password in plain text!
```
**Issue:** toString() exposes sensitive information

#### ✅ Right:
```java
// CORRECT
public class User {
    private String username;
    private String password;

    @Override
    public String toString() {
        return "User{username='" + username + "', password='********'}";
        // Hide sensitive data
    }
}
```

**Why:** toString() should never expose sensitive or internal state.

**💡 Tip:** Mask sensitive fields in toString(), equals(), and hashCode().

---

### 4. Package Visibility Issues

#### ❌ Wrong - Assuming Package-Private Provides Encapsulation:
```java
// File: com/example/BankAccount.java
// WRONG
package com.example;

public class BankAccount {
    double balance;  // Package-private, thinking it's protected

    public void deposit(double amount) {
        balance += amount;
    }
}

// File: com/example/Hacker.java
package com.example;  // Same package!

public class Hacker {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.balance = 1000000;  // Direct access! Security breach!
    }
}
```
**Issue:** Package-private allows access from any class in same package

#### ✅ Right:
```java
// File: com/example/BankAccount.java
// CORRECT
package com.example;

public class BankAccount {
    private double balance;  // Private

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

**Why:** Private ensures only the class itself can access the field.

**💡 Tip:** Use private for sensitive data, not package-private.

---

#### ❌ Wrong - Forgetting Access Modifier on Method:
```java
// WRONG
public class Employee {
    private double salary;

    void setSalary(double salary) {  // Package-private! Missing public
        this.salary = salary;
    }

    double getSalary() {  // Package-private! Missing public
        return salary;
    }
}

// Different package
import com.example.Employee;

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.setSalary(50000);  // Compilation error! setSalary is package-private
    }
}
```
**Issue:** Missing access modifier makes methods package-private

#### ✅ Right:
```java
// CORRECT
public class Employee {
    private double salary;

    public void setSalary(double salary) {  // Explicitly public
        if (salary > 0) {
            this.salary = salary;
        }
    }

    public double getSalary() {  // Explicitly public
        return salary;
    }
}
```

**Why:** Public access modifier makes methods accessible from anywhere.

**💡 Tip:** Always explicitly declare access modifiers; don't rely on defaults.

---

### 5. Immutability Mistakes

#### ❌ Wrong - Claiming Immutable But Providing Setters:
```java
// WRONG - Not truly immutable
public final class Point {
    private int x;
    private int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }

    public void setX(int x) { this.x = x; }  // Breaks immutability!
    public void setY(int y) { this.y = y; }  // Breaks immutability!
}

Point p = new Point(5, 10);
p.setX(20);  // Modified! Not immutable
```
**Issue:** Setters allow modification, breaking immutability

#### ✅ Right:
```java
// CORRECT - Truly immutable
public final class Point {
    private final int x;  // final fields
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    // No setters! To "modify", create new object
    public Point withX(int newX) {
        return new Point(newX, this.y);
    }

    public Point withY(int newY) {
        return new Point(this.x, newY);
    }
}
```

**Why:** Immutable objects have no setters; modifications create new objects.

**💡 Tip:** Immutable class: `final` class, `final` fields, no setters, return new objects.

---

#### ❌ Wrong - Mutable Fields in Immutable Class:
```java
// WRONG
public final class Person {
    private final String name;
    private final int[] scores;  // Mutable array!

    public Person(String name, int[] scores) {
        this.name = name;
        this.scores = scores;  // Direct assignment!
    }

    public int[] getScores() {
        return scores;  // Returns direct reference!
    }
}

int[] scores = {90, 85, 95};
Person person = new Person("Alice", scores);
scores[0] = 0;  // Modifies person's scores!
person.getScores()[1] = 0;  // Also modifies!
```
**Issue:** Array fields can be modified even with `final`

#### ✅ Right:
```java
// CORRECT
public final class Person {
    private final String name;
    private final int[] scores;

    public Person(String name, int[] scores) {
        this.name = name;
        this.scores = scores.clone();  // Defensive copy
    }

    public int[] getScores() {
        return scores.clone();  // Return copy
    }
}

int[] scores = {90, 85, 95};
Person person = new Person("Alice", scores);
scores[0] = 0;  // Doesn't affect person
person.getScores()[1] = 0;  // Doesn't affect person
```

**Why:** Clone arrays in constructor and getter to maintain immutability.

**💡 Tip:** Immutable classes must defensively copy mutable fields.

---

### 6. Validation and Business Logic Errors

#### ❌ Wrong - Weak Validation in Setters:
```java
// WRONG
public class Product {
    private String name;
    private double price;

    public void setName(String name) {
        if (name != null) {  // Only checks null
            this.name = name;
        }
    }

    public void setPrice(double price) {
        this.price = price;  // No validation at all
    }
}

Product p = new Product();
p.setName("");  // Empty name accepted!
p.setPrice(-100);  // Negative price accepted!
```
**Issue:** Insufficient validation allows logically invalid values

#### ✅ Right:
```java
// CORRECT
public class Product {
    private String name;
    private double price;

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = name;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        if (price > 1000000) {
            throw new IllegalArgumentException("Price too high");
        }
        this.price = price;
    }
}
```

**Why:** Comprehensive validation prevents invalid business states.

**💡 Tip:** Validate all constraints: null, empty, range, format, business rules.

---

#### ❌ Wrong - No Range Checking:
```java
// WRONG
public class Student {
    private int age;
    private double gpa;

    public void setAge(int age) {
        this.age = age;  // No range check
    }

    public void setGPA(double gpa) {
        this.gpa = gpa;  // No range check
    }
}

Student s = new Student();
s.setAge(500);  // Unrealistic age
s.setGPA(10.0);  // GPA should be 0-4
```
**Issue:** No range validation for bounded values

#### ✅ Right:
```java
// CORRECT
public class Student {
    private int age;
    private double gpa;

    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be 0-150");
        }
        this.age = age;
    }

    public void setGPA(double gpa) {
        if (gpa < 0.0 || gpa > 4.0) {
            throw new IllegalArgumentException("GPA must be 0.0-4.0");
        }
        this.gpa = gpa;
    }
}
```

**Why:** Range validation enforces realistic and valid values.

**💡 Tip:** Define min/max constants for validation ranges.

---

### 7. Method Chaining Issues

#### ❌ Wrong - Setters Returning void Preventing Chaining:
```java
// WRONG
public class Person {
    private String name;
    private int age;
    private String email;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

// Verbose usage
Person p = new Person();
p.setName("Alice");
p.setAge(25);
p.setEmail("alice@example.com");
```
**Issue:** Void setters require separate statements; can't chain

#### ✅ Right:
```java
// CORRECT - Fluent interface with method chaining
public class Person {
    private String name;
    private int age;
    private String email;

    public Person setName(String name) {
        this.name = name;
        return this;  // Return this for chaining
    }

    public Person setAge(int age) {
        this.age = age;
        return this;
    }

    public Person setEmail(String email) {
        this.email = email;
        return this;
    }
}

// Fluent usage
Person p = new Person()
    .setName("Alice")
    .setAge(25)
    .setEmail("alice@example.com");
```

**Why:** Returning `this` enables fluent, readable method chaining.

**💡 Tip:** Return `this` from setters for builder-style fluent APIs.

---

### 8. Access Control Best Practices Violations

#### ❌ Wrong - Making Helper Methods Public:
```java
// WRONG
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int validateInput(int value) {  // Should be private
        return Math.max(0, value);
    }

    public void logOperation(String op) {  // Should be private
        System.out.println("Operation: " + op);
    }
}

// Users can call internal methods
Calculator calc = new Calculator();
calc.logOperation("Random");  // Not intended for external use
```
**Issue:** Internal helper methods exposed as public API

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {  // Public API
        int validA = validateInput(a);
        int validB = validateInput(b);
        logOperation("add");
        return validA + validB;
    }

    private int validateInput(int value) {  // Private helper
        return Math.max(0, value);
    }

    private void logOperation(String op) {  // Private helper
        System.out.println("Operation: " + op);
    }
}
```

**Why:** Private helpers hide implementation details and reduce API surface.

**💡 Tip:** Make methods private by default; only make public if needed externally.

---

#### ❌ Wrong - Over-Encapsulation for Simple Data Holders:
```java
// WRONG - Over-engineered for simple data transfer
public class Coordinates {
    private int x;
    private int y;

    public Coordinates(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public void setX(int x) { this.x = x; }
    public int getY() { return y; }
    public void setY(int y) { this.y = y; }
}
```
**Issue:** Excessive boilerplate for simple immutable data

#### ✅ Right:
```java
// CORRECT - For simple immutable data holders
public class Coordinates {
    public final int x;
    public final int y;

    public Coordinates(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

// Or use record (Java 14+)
public record Coordinates(int x, int y) { }
```

**Why:** Simple immutable data doesn't need full encapsulation overhead.

**💡 Tip:** For simple data transfer, public final fields or records are acceptable.

---

### 9. Exposing Sensitive Information

#### ❌ Wrong - Providing Getter for Password:
```java
// WRONG
public class User {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {  // Security risk!
        return password;  // Exposes password
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

User user = new User();
user.setPassword("secret123");
System.out.println(user.getPassword());  // Prints password!
```
**Issue:** Password exposed through getter

#### ✅ Right:
```java
// CORRECT - Write-only password, verification method
public class User {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    // No getter for password!

    public void setPassword(String password) {
        if (password != null && password.length() >= 8) {
            this.password = password;
        }
    }

    public boolean verifyPassword(String input) {
        return this.password != null && this.password.equals(input);
    }
}
```

**Why:** Sensitive fields should be write-only; provide verification methods instead.

**💡 Tip:** Never expose passwords, keys, or tokens through getters.

---

### 10. Constructor and Initialization Issues

#### ❌ Wrong - Bypassing Setter Validation in Constructor:
```java
// WRONG
public class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;      // No validation
        this.salary = salary;  // No validation
    }

    public void setSalary(double salary) {
        if (salary > 0) {  // Validation in setter
            this.salary = salary;
        } else {
            throw new IllegalArgumentException("Salary must be positive");
        }
    }
}

// Can create invalid object through constructor
Employee emp = new Employee("Alice", -1000);  // Negative salary!
```
**Issue:** Constructor bypasses setter validation, allowing invalid state

#### ✅ Right:
```java
// CORRECT
public class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        setName(name);      // Use setter for validation
        setSalary(salary);  // Use setter for validation
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = name;
    }

    public void setSalary(double salary) {
        if (salary <= 0) {
            throw new IllegalArgumentException("Salary must be positive");
        }
        this.salary = salary;
    }
}
```

**Why:** Calling setters from constructor reuses validation logic consistently.

**💡 Tip:** Always call setters from constructors to ensure validation.

---

This comprehensive list now contains **40+ Encapsulation and Access Modifier mistakes** covering all fundamental concepts!

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