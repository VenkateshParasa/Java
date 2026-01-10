# Day 16: Packages & Static Keyword

## 📚 Learning Objectives
By the end of this lesson, you will be able to:
- Create and use packages to organize code
- Understand package naming conventions
- Use import statements effectively
- Master the static keyword
- Work with static variables, methods, and blocks
- Understand when to use static members

---

## 🎯 Topics Covered

### 1. Packages

#### What are Packages?
Packages are containers for classes that help organize code and prevent naming conflicts.

```java
// Package declaration (must be first statement)
package com.company.project;

public class MyClass {
    // Class code
}
```

#### Creating Packages
```java
// File: com/mycompany/utilities/Calculator.java
package com.mycompany.utilities;

public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int subtract(int a, int b) {
        return a - b;
    }
}
```

#### Package Naming Conventions
```java
// Domain-based naming (recommended)
package com.company.project.module;

// Examples:
package com.google.maps;
package org.apache.commons;
package edu.mit.csail;

// Naming rules:
// - All lowercase
// - Reverse domain name
// - Use dots to separate levels
```

---

### 2. Import Statements

#### Importing Classes
```java
// Single class import
import java.util.Scanner;
import java.util.ArrayList;

// Wildcard import (all classes from package)
import java.util.*;

public class ImportDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> list = new ArrayList<>();
    }
}
```

#### Import Examples
```java
package com.myapp.main;

// Import specific class
import com.mycompany.utilities.Calculator;

// Import all classes from package
import java.util.*;

// Import static members (covered later)
import static java.lang.Math.*;

public class MainApp {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(5, 3));
        
        List<String> names = new ArrayList<>();
    }
}
```

#### Fully Qualified Names
```java
public class FullyQualifiedDemo {
    public static void main(String[] args) {
        // Without import - use fully qualified name
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        java.util.ArrayList<String> list = new java.util.ArrayList<>();
        
        // Useful when classes have same name
        java.util.Date utilDate = new java.util.Date();
        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());
    }
}
```

---

### 3. Access Control with Packages

#### Access Modifiers Review
```java
package com.example.package1;

public class AccessDemo {
    public int publicVar = 1;        // Accessible everywhere
    protected int protectedVar = 2;  // Same package + subclasses
    int defaultVar = 3;              // Same package only (default)
    private int privateVar = 4;      // Same class only
    
    public void publicMethod() { }
    protected void protectedMethod() { }
    void defaultMethod() { }
    private void privateMethod() { }
}
```

#### Package-Level Access
```java
// File 1: com/example/package1/ClassA.java
package com.example.package1;

class ClassA {  // Default access - package-private
    void display() {
        System.out.println("ClassA");
    }
}

// File 2: com/example/package1/ClassB.java
package com.example.package1;

public class ClassB {
    public static void main(String[] args) {
        ClassA obj = new ClassA();  // OK - same package
        obj.display();
    }
}

// File 3: com/example/package2/ClassC.java
package com.example.package2;

public class ClassC {
    public static void main(String[] args) {
        // ClassA obj = new ClassA();  // ERROR - different package
    }
}
```

---

### 4. Static Variables

#### What is Static?
Static members belong to the class, not to instances.

```java
public class Counter {
    static int count = 0;  // Shared by all instances
    int instanceCount = 0; // Separate for each instance
    
    public Counter() {
        count++;
        instanceCount++;
    }
    
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();
        
        System.out.println("Total objects: " + Counter.count);  // 3
        System.out.println("c1 instance: " + c1.instanceCount); // 1
        System.out.println("c2 instance: " + c2.instanceCount); // 1
    }
}
```

#### Static Variable Examples
```java
public class Student {
    static String schoolName = "ABC School";  // Shared
    static int totalStudents = 0;             // Shared
    
    String name;        // Instance variable
    int rollNumber;     // Instance variable
    
    public Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
        totalStudents++;
    }
    
    public void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll: " + rollNumber);
        System.out.println("School: " + schoolName);
    }
    
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 101);
        Student s2 = new Student("Bob", 102);
        
        System.out.println("Total students: " + Student.totalStudents);
        
        // Change school name for all
        Student.schoolName = "XYZ School";
        s1.display();
        s2.display();
    }
}
```

---

### 5. Static Methods

#### Defining Static Methods
```java
public class MathUtils {
    // Static method - can be called without object
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    public static double square(double num) {
        return num * num;
    }
    
    public static void main(String[] args) {
        // Call static methods using class name
        int sum = MathUtils.add(5, 3);
        int product = MathUtils.multiply(4, 7);
        double sq = MathUtils.square(5.5);
        
        System.out.println("Sum: " + sum);
        System.out.println("Product: " + product);
        System.out.println("Square: " + sq);
    }
}
```

#### Static Method Restrictions
```java
public class StaticRestrictions {
    static int staticVar = 10;
    int instanceVar = 20;
    
    // Static method
    public static void staticMethod() {
        System.out.println(staticVar);      // OK
        // System.out.println(instanceVar); // ERROR - can't access instance
        // this.instanceVar = 30;           // ERROR - no 'this' in static
        
        staticHelper();    // OK - call static method
        // instanceMethod(); // ERROR - can't call instance method
    }
    
    public static void staticHelper() {
        System.out.println("Static helper");
    }
    
    // Instance method
    public void instanceMethod() {
        System.out.println(staticVar);    // OK
        System.out.println(instanceVar);  // OK
        staticMethod();                   // OK
    }
}
```

---

### 6. Static Blocks

#### Static Initialization Block
```java
public class StaticBlockDemo {
    static int value;
    static String message;
    
    // Static block - executes when class is loaded
    static {
        System.out.println("Static block executed");
        value = 100;
        message = "Initialized";
    }
    
    // Constructor
    public StaticBlockDemo() {
        System.out.println("Constructor executed");
    }
    
    public static void main(String[] args) {
        System.out.println("Main method started");
        System.out.println("Value: " + value);
        
        StaticBlockDemo obj1 = new StaticBlockDemo();
        StaticBlockDemo obj2 = new StaticBlockDemo();
    }
}

// Output:
// Static block executed
// Main method started
// Value: 100
// Constructor executed
// Constructor executed
```

#### Multiple Static Blocks
```java
public class MultipleStaticBlocks {
    static int a;
    static int b;
    
    // First static block
    static {
        System.out.println("First static block");
        a = 10;
    }
    
    // Second static block
    static {
        System.out.println("Second static block");
        b = 20;
    }
    
    // Third static block
    static {
        System.out.println("Third static block");
        System.out.println("a + b = " + (a + b));
    }
    
    public static void main(String[] args) {
        System.out.println("Main method");
    }
}
```

---

### 7. Static Import

#### Using Static Import
```java
// Without static import
import java.lang.Math;

public class WithoutStaticImport {
    public static void main(String[] args) {
        double result = Math.sqrt(16);
        double pi = Math.PI;
        double power = Math.pow(2, 3);
    }
}

// With static import
import static java.lang.Math.*;

public class WithStaticImport {
    public static void main(String[] args) {
        double result = sqrt(16);      // No Math. prefix
        double pi = PI;                // No Math. prefix
        double power = pow(2, 3);      // No Math. prefix
        
        System.out.println("Square root: " + result);
        System.out.println("PI: " + pi);
        System.out.println("Power: " + power);
    }
}
```

#### Static Import Examples
```java
import static java.lang.System.out;
import static java.lang.Math.*;

public class StaticImportDemo {
    public static void main(String[] args) {
        out.println("Hello");           // Instead of System.out
        out.println(sqrt(25));          // Instead of Math.sqrt
        out.println(max(10, 20));       // Instead of Math.max
        out.println(PI);                // Instead of Math.PI
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Multi-Package Employee Management System

**📝 Problem Statement:**
Create a multi-package employee management system demonstrating proper package organization, import statements, and access control. The system should have separate packages for models (Employee), utilities (SalaryCalculator), and main application, showing how to structure a real-world application with multiple packages working together through proper imports and access modifiers.

**Requirements:**
- Create three packages: com.mycompany.models, com.mycompany.utils, com.mycompany.main
- **Models package (com.mycompany.models)**: Employee class with private fields name and salary
- Employee class must be public with public constructor and public getter methods
- **Utils package (com.mycompany.utils)**: SalaryCalculator class with all static methods
- SalaryCalculator must import Employee class from models package
- Static method calculateAnnual(Employee emp) returning annual salary (monthly × 12)
- Static method calculateTax(Employee emp) returning tax amount (20% of monthly salary)
- **Main package (com.mycompany.main)**: Main class importing both Employee and SalaryCalculator
- Main class creates Employee object and uses SalaryCalculator static methods
- Demonstrate proper import statements for cross-package class usage
- Show that public classes accessible across packages while default classes are not

**Sample Test Cases:**
```
Input: Employee("John", 5000)
Expected Output:
Employee created: John with salary $5000
Annual Salary: $60000.0
Monthly Tax: $1000.0

Input: Employee("Alice", 7500)
Expected Output:
Employee created: Alice with salary $7500
Annual Salary: $90000.0
Monthly Tax: $1500.0

Input: Employee("Bob", 3000)
Expected Output:
Employee created: Bob with salary $3000
Annual Salary: $36000.0
Monthly Tax: $600.0

Input: Multiple employees with statistics
Expected Output:
Employee: John, Annual: $60000.0, Tax: $1000.0
Employee: Alice, Annual: $90000.0, Tax: $1500.0
Employee: Bob, Annual: $36000.0, Tax: $600.0

Input: Attempting to access package-private class from different package
Expected Output:
Compilation Error: class is not public in package; cannot be accessed from outside package
```

**Solution:**
```java
// File: com/mycompany/models/Employee.java
package com.mycompany.models;

public class Employee {
    private String name;
    private double salary;
    
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
        System.out.println("Employee created: " + name + " with salary $" + salary);
    }
    
    public String getName() {
        return name;
    }
    
    public double getSalary() {
        return salary;
    }
    
    @Override
    public String toString() {
        return "Employee{name='" + name + "', salary=$" + salary + "}";
    }
}

// File: com/mycompany/utils/SalaryCalculator.java
package com.mycompany.utils;

import com.mycompany.models.Employee;

public class SalaryCalculator {
    // Private constructor (utility class pattern)
    private SalaryCalculator() {
        throw new AssertionError("Utility class - cannot instantiate");
    }
    
    public static double calculateAnnual(Employee emp) {
        return emp.getSalary() * 12;
    }
    
    public static double calculateTax(Employee emp) {
        return emp.getSalary() * 0.2;
    }
    
    public static double calculateNetSalary(Employee emp) {
        return emp.getSalary() - calculateTax(emp);
    }
}

// File: com/mycompany/main/Main.java
package com.mycompany.main;

import com.mycompany.models.Employee;
import com.mycompany.utils.SalaryCalculator;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Employee Management System ===\n");
        
        // Create employees
        Employee emp1 = new Employee("John", 5000);
        Employee emp2 = new Employee("Alice", 7500);
        Employee emp3 = new Employee("Bob", 3000);
        
        System.out.println();
        
        // Calculate and display salaries
        displayEmployeeDetails(emp1);
        displayEmployeeDetails(emp2);
        displayEmployeeDetails(emp3);
    }
    
    private static void displayEmployeeDetails(Employee emp) {
        System.out.println("Employee: " + emp.getName());
        System.out.println("Annual Salary: $" + SalaryCalculator.calculateAnnual(emp));
        System.out.println("Monthly Tax: $" + SalaryCalculator.calculateTax(emp));
        System.out.println("Net Monthly: $" + SalaryCalculator.calculateNetSalary(emp));
        System.out.println();
    }
}
```

**💡 Tips:**
- Package declaration must be first statement in file (before imports)
- Package name must match directory structure: com/mycompany/models → package com.mycompany.models
- Public classes accessible across packages; default (no modifier) classes only within same package
- Import statements bring classes from other packages into scope
- Static methods in utility classes don't require object creation
- Use specific imports (import com.mycompany.models.Employee) rather than wildcard (import com.mycompany.models.*)
- Private constructor in utility class prevents instantiation
- Getter methods provide controlled access to private fields
- Cross-package access requires both: class must be public AND members must be public
- File location must match package: com.mycompany.models.Employee → com/mycompany/models/Employee.java

---

### Exercise 2: Bank Account System with Static Counters

**📝 Problem Statement:**
Create a bank account management system demonstrating static variables for tracking aggregate data across all instances, static methods for displaying statistics, and the difference between static (shared) and instance (per-object) variables. The system should track total accounts created, total balance across all accounts, and provide statistics while maintaining individual account balances.

**Requirements:**
- Create BankAccount class with static fields: totalAccounts, totalBalance
- Instance fields: accountNumber (String), balance (double)
- Constructor increments totalAccounts and adds initialBalance to totalBalance
- deposit(double amount) method updates both instance balance and static totalBalance
- withdraw(double amount) method updates both balances if sufficient funds available
- Static method displayStatistics() showing total accounts, total balance, average balance
- getBalance() method returning individual account balance
- getAccountNumber() method returning account number
- Demonstrate that static variables shared across all instances
- Show that modifying one account's balance affects totalBalance but not other accounts' balances

**Sample Test Cases:**
```
Input: BankAccount("ACC001", 1000)
Expected Output:
Account ACC001 created with balance: $1000.0
Total accounts: 1
Total balance: $1000.0

Input: Create 3 accounts: ACC001($1000), ACC002($2000), ACC003($1500)
Expected Output:
Account ACC001 created with balance: $1000.0
Account ACC002 created with balance: $2000.0
Account ACC003 created with balance: $1500.0
Total accounts: 3
Total balance: $4500.0

Input: acc1.deposit(500)
Expected Output:
Deposited $500.0 to account ACC001
New balance: $1500.0
Total balance across all accounts: $5000.0

Input: acc2.withdraw(300)
Expected Output:
Withdrew $300.0 from account ACC002
New balance: $1700.0
Total balance across all accounts: $4700.0

Input: BankAccount.displayStatistics()
Expected Output:
=== Bank Statistics ===
Total Accounts: 3
Total Balance: $4700.0
Average Balance: $1566.67
```

**Solution:**
```java
public class BankAccount {
    // Static variables - shared by all instances
    private static int totalAccounts = 0;
    private static double totalBalance = 0;
    
    // Instance variables - separate for each account
    private String accountNumber;
    private double balance;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        totalAccounts++;
        totalBalance += initialBalance;
        
        System.out.println("Account " + accountNumber + " created with balance: $" + initialBalance);
        System.out.println("Total accounts: " + totalAccounts);
        System.out.println("Total balance: $" + totalBalance);
        System.out.println();
    }
    
    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Error: Deposit amount must be positive");
            return;
        }
        
        balance += amount;
        totalBalance += amount;
        
        System.out.println("Deposited $" + amount + " to account " + accountNumber);
        System.out.println("New balance: $" + balance);
        System.out.println("Total balance across all accounts: $" + totalBalance);
        System.out.println();
    }
    
    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Error: Withdrawal amount must be positive");
            return;
        }
        
        if (balance >= amount) {
            balance -= amount;
            totalBalance -= amount;
            
            System.out.println("Withdrew $" + amount + " from account " + accountNumber);
            System.out.println("New balance: $" + balance);
            System.out.println("Total balance across all accounts: $" + totalBalance);
        } else {
            System.out.println("Error: Insufficient funds in account " + accountNumber);
            System.out.println("Current balance: $" + balance + ", Requested: $" + amount);
        }
        System.out.println();
    }
    
    public static void displayStatistics() {
        System.out.println("=== Bank Statistics ===");
        System.out.println("Total Accounts: " + totalAccounts);
        System.out.println("Total Balance: $" + totalBalance);
        
        if (totalAccounts > 0) {
            double avgBalance = totalBalance / totalAccounts;
            System.out.println("Average Balance: $" + String.format("%.2f", avgBalance));
        } else {
            System.out.println("Average Balance: $0.00");
        }
        System.out.println();
    }
    
    public double getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public static int getTotalAccounts() {
        return totalAccounts;
    }
    
    public static double getTotalBalance() {
        return totalBalance;
    }
    
    public static void main(String[] args) {
        System.out.println("=== Bank Account Management System ===\n");
        
        // Create accounts
        BankAccount acc1 = new BankAccount("ACC001", 1000);
        BankAccount acc2 = new BankAccount("ACC002", 2000);
        BankAccount acc3 = new BankAccount("ACC003", 1500);
        
        // Display initial statistics
        BankAccount.displayStatistics();
        
        // Perform transactions
        acc1.deposit(500);
        acc2.withdraw(300);
        acc3.deposit(1000);
        
        // Display final statistics
        BankAccount.displayStatistics();
        
        // Show individual balances
        System.out.println("=== Individual Account Balances ===");
        System.out.println(acc1.getAccountNumber() + ": $" + acc1.getBalance());
        System.out.println(acc2.getAccountNumber() + ": $" + acc2.getBalance());
        System.out.println(acc3.getAccountNumber() + ": $" + acc3.getBalance());
    }
}
```

**💡 Tips:**
- Static variables (totalAccounts, totalBalance) shared by ALL instances - only one copy exists
- Instance variables (accountNumber, balance) separate for EACH object - each instance has its own copy
- Static variables accessed via class name: BankAccount.totalAccounts (preferred) or via instance: acc1.totalAccounts (works but confusing)
- Constructor increments static counters - runs once per object creation
- deposit/withdraw update both instance balance (this.balance) and static totalBalance
- Static method displayStatistics() can only access static variables directly
- To access instance variables from static method, need object reference as parameter
- Average calculation: totalBalance / totalAccounts (check totalAccounts > 0 to avoid division by zero)
- Static variables persist for entire program lifetime - not garbage collected when instances are
- Use static for aggregate data (totals, counts); instance for object-specific data (individual balances)

---

### Exercise 3: String Utility Class with Static Methods

**📝 Problem Statement:**
Create a utility class demonstrating the utility class pattern with all static methods, private constructor to prevent instantiation, and common string manipulation operations. The class should provide reusable string utilities that don't require object state, showing when to use static methods versus instance methods.

**Requirements:**
- Create StringUtils class with private constructor throwing AssertionError
- All methods must be static (no instance methods)
- isPalindrome(String str) method checking if string reads same forwards/backwards (ignore case and spaces)
- reverse(String str) method returning reversed string
- countVowels(String str) method counting vowels (a, e, i, o, u) ignoring case
- countWords(String str) method counting words separated by spaces
- capitalize(String str) method capitalizing first letter of each word
- Private constructor prevents instantiation: new StringUtils() should fail
- Methods should handle null and empty strings gracefully
- Demonstrate that utility class methods called without creating objects

**Sample Test Cases:**
```
Input: StringUtils.isPalindrome("racecar")
Expected Output: true

Input: StringUtils.isPalindrome("A man a plan a canal Panama")
Expected Output: true (ignoring spaces and case)

Input: StringUtils.isPalindrome("hello")
Expected Output: false

Input: StringUtils.reverse("Hello")
Expected Output: "olleH"

Input: StringUtils.reverse("Java Programming")
Expected Output: "gnimmargorP avaJ"

Input: StringUtils.countVowels("Education")
Expected Output: 5 (e, u, a, i, o)

Input: StringUtils.countVowels("Programming")
Expected Output: 3 (o, a, i)

Input: StringUtils.countWords("Hello World")
Expected Output: 2

Input: StringUtils.capitalize("hello world from java")
Expected Output: "Hello World From Java"

Input: new StringUtils() [attempting instantiation]
Expected Output: AssertionError: Utility class - do not instantiate
```

**Solution:**
```java
public class StringUtils {
    // Private constructor to prevent instantiation
    private StringUtils() {
        throw new AssertionError("Utility class - do not instantiate");
    }
    
    public static boolean isPalindrome(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        
        // Remove spaces and convert to lowercase
        str = str.toLowerCase().replaceAll("\\s+", "");
        
        int left = 0;
        int right = str.length() - 1;
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        
        return true;
    }
    
    public static String reverse(String str) {
        if (str == null) {
            return null;
        }
        
        return new StringBuilder(str).reverse().toString();
    }
    
    public static int countVowels(String str) {
        if (str == null || str.isEmpty()) {
            return 0;
        }
        
        int count = 0;
        str = str.toLowerCase();
        
        for (char c : str.toCharArray()) {
            if ("aeiou".indexOf(c) != -1) {
                count++;
            }
        }
        
        return count;
    }
    
    public static int countWords(String str) {
        if (str == null || str.trim().isEmpty()) {
            return 0;
        }
        
        String[] words = str.trim().split("\\s+");
        return words.length;
    }
    
    public static String capitalize(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        
        String[] words = str.split("\\s+");
        StringBuilder result = new StringBuilder();
        
        for (String word : words) {
            if (!word.isEmpty()) {
                result.append(Character.toUpperCase(word.charAt(0)))
                      .append(word.substring(1).toLowerCase())
                      .append(" ");
            }
        }
        
        return result.toString().trim();
    }
    
    public static void main(String[] args) {
        System.out.println("=== String Utilities Demo ===\n");
        
        // Test isPalindrome
        System.out.println("--- Palindrome Tests ---");
        System.out.println("'racecar' is palindrome: " + isPalindrome("racecar"));
        System.out.println("'A man a plan a canal Panama' is palindrome: " +
                          isPalindrome("A man a plan a canal Panama"));
        System.out.println("'hello' is palindrome: " + isPalindrome("hello"));
        System.out.println();
        
        // Test reverse
        System.out.println("--- Reverse Tests ---");
        System.out.println("Reverse of 'Hello': " + reverse("Hello"));
        System.out.println("Reverse of 'Java Programming': " + reverse("Java Programming"));
        System.out.println();
        
        // Test countVowels
        System.out.println("--- Count Vowels Tests ---");
        System.out.println("Vowels in 'Education': " + countVowels("Education"));
        System.out.println("Vowels in 'Programming': " + countVowels("Programming"));
        System.out.println();
        
        // Test countWords
        System.out.println("--- Count Words Tests ---");
        System.out.println("Words in 'Hello World': " + countWords("Hello World"));
        System.out.println("Words in 'Java is awesome': " + countWords("Java is awesome"));
        System.out.println();
        
        // Test capitalize
        System.out.println("--- Capitalize Tests ---");
        System.out.println("Capitalize 'hello world': " + capitalize("hello world"));
        System.out.println("Capitalize 'java programming language': " +
                          capitalize("java programming language"));
        
        // Attempting to instantiate (will throw error if uncommented)
        // StringUtils utils = new StringUtils();  // AssertionError!
    }
}
```

**💡 Tips:**
- Utility classes contain only static methods - no instance state needed
- Private constructor prevents instantiation: new StringUtils() throws AssertionError
- throw new AssertionError() in constructor makes intent clear - this class should never be instantiated
- All methods static because they don't depend on object state - operate only on parameters
- Call utility methods via class name: StringUtils.isPalindrome() not via object
- replaceAll("\\\\s+", "") removes all whitespace using regex
- StringBuilder.reverse() efficient for string reversal
- Two-pointer technique (left/right) efficient for palindrome checking
- String.split("\\\\s+") splits on one or more spaces
- Character.toUpperCase() capitalizes single character
- substring(1) gets all characters except first
- Null checks prevent NullPointerException - return sensible defaults
- Utility class pattern common in Java: Math, Arrays, Collections all use this pattern
- Final class modifier optional but recommended: public final class StringUtils prevents subclassing

---

### Exercise 4: Configuration Manager System

**📝 Problem Statement:**
Create a configuration management system demonstrating static block initialization, singleton pattern, and static methods for application-wide settings. The system should load configuration properties at class loading time, provide static access methods, manage default values, and demonstrate proper static initialization patterns for resource-intensive operations that should occur only once.

**Requirements:**
- Create ConfigManager class with private constructor (singleton pattern)
- Define static fields: appName, version, maxConnections, timeout, debugMode
- Implement static block reading configuration from simulated properties source
- Static block should initialize all configuration fields with default or loaded values
- Implement static getter methods: getAppName(), getVersion(), getMaxConnections(), getTimeout(), isDebugMode()
- Create static displayConfig() method showing all configuration values in formatted output
- Implement static updateTimeout(int newTimeout) method allowing runtime configuration updates
- Add static resetToDefaults() method resetting all values to default configuration
- Use private static final constants for DEFAULT_MAX_CONNECTIONS (10), DEFAULT_TIMEOUT (30000)
- Demonstrate that static block executes only once when class is first loaded
- Add validation in setter methods ensuring valid values (timeout > 0, maxConnections > 0)
- Show getInstance() method returning singleton instance if needed for future extensibility

**Sample Test Cases:**
```
Input: ConfigManager class loaded for first time
Expected Output:
=== Loading Configuration ===
Static block executed - initializing configuration
Configuration loaded successfully
App: MyApplication v1.0.0
Max Connections: 10
Timeout: 30000ms
Debug Mode: false

Input: ConfigManager.displayConfig()
Expected Output:
=== Application Configuration ===
Application Name: MyApplication
Version: 1.0.0
Max Connections: 10
Timeout: 30000 ms
Debug Mode: false

Input: ConfigManager.updateTimeout(60000)
Expected Output:
Timeout updated from 30000ms to 60000ms
Updated configuration:
Timeout: 60000 ms

Input: ConfigManager.resetToDefaults()
Expected Output:
Configuration reset to defaults
Max Connections: 10 (default)
Timeout: 30000 ms (default)
Debug Mode: false (default)

Input: Create multiple references to ConfigManager
Expected Output:
Static block executed - initializing configuration
[Only executes once, not for each reference]
```

**Solution:**
```java
public class ConfigManager {
    // Static fields for configuration
    private static String appName;
    private static String version;
    private static int maxConnections;
    private static int timeout;
    private static boolean debugMode;

    // Default values
    private static final int DEFAULT_MAX_CONNECTIONS = 10;
    private static final int DEFAULT_TIMEOUT = 30000;
    private static final String DEFAULT_APP_NAME = "MyApplication";
    private static final String DEFAULT_VERSION = "1.0.0";

    // Singleton instance
    private static ConfigManager instance;

    // Static initialization block
    static {
        System.out.println("\n=== Loading Configuration ===");
        System.out.println("Static block executed - initializing configuration");

        // Simulate loading from properties file
        // In real application, would read from file or database
        appName = DEFAULT_APP_NAME;
        version = DEFAULT_VERSION;
        maxConnections = DEFAULT_MAX_CONNECTIONS;
        timeout = DEFAULT_TIMEOUT;
        debugMode = false;

        System.out.println("Configuration loaded successfully");
        System.out.println("App: " + appName + " v" + version);
        System.out.println("Max Connections: " + maxConnections);
        System.out.println("Timeout: " + timeout + "ms");
        System.out.println("Debug Mode: " + debugMode);
    }

    // Private constructor (singleton pattern)
    private ConfigManager() {
        // Prevent instantiation
    }

    // Get singleton instance
    public static ConfigManager getInstance() {
        if (instance == null) {
            instance = new ConfigManager();
        }
        return instance;
    }

    // Static getter methods
    public static String getAppName() {
        return appName;
    }

    public static String getVersion() {
        return version;
    }

    public static int getMaxConnections() {
        return maxConnections;
    }

    public static int getTimeout() {
        return timeout;
    }

    public static boolean isDebugMode() {
        return debugMode;
    }

    // Update configuration at runtime
    public static void updateTimeout(int newTimeout) {
        if (newTimeout <= 0) {
            System.out.println("Error: Timeout must be positive");
            return;
        }
        System.out.println("\nTimeout updated from " + timeout + "ms to " + newTimeout + "ms");
        timeout = newTimeout;
        System.out.println("Updated configuration:");
        System.out.println("Timeout: " + timeout + " ms");
    }

    public static void updateMaxConnections(int newMax) {
        if (newMax <= 0) {
            System.out.println("Error: Max connections must be positive");
            return;
        }
        System.out.println("\nMax connections updated from " + maxConnections + " to " + newMax);
        maxConnections = newMax;
    }

    public static void setDebugMode(boolean enabled) {
        System.out.println("\nDebug mode " + (enabled ? "enabled" : "disabled"));
        debugMode = enabled;
    }

    // Reset to defaults
    public static void resetToDefaults() {
        System.out.println("\n=== Resetting Configuration to Defaults ===");
        appName = DEFAULT_APP_NAME;
        version = DEFAULT_VERSION;
        maxConnections = DEFAULT_MAX_CONNECTIONS;
        timeout = DEFAULT_TIMEOUT;
        debugMode = false;

        System.out.println("Configuration reset to defaults");
        System.out.println("Max Connections: " + maxConnections + " (default)");
        System.out.println("Timeout: " + timeout + " ms (default)");
        System.out.println("Debug Mode: " + debugMode + " (default)");
    }

    // Display all configuration
    public static void displayConfig() {
        System.out.println("\n=== Application Configuration ===");
        System.out.println("Application Name: " + appName);
        System.out.println("Version: " + version);
        System.out.println("Max Connections: " + maxConnections);
        System.out.println("Timeout: " + timeout + " ms");
        System.out.println("Debug Mode: " + debugMode);
    }
}

public class TestConfigManager {
    public static void main(String[] args) {
        // Static block executes when class is first loaded
        System.out.println("\n=== Main Method Started ===");

        // Display initial configuration
        ConfigManager.displayConfig();

        // Update configuration
        ConfigManager.updateTimeout(60000);
        ConfigManager.updateMaxConnections(20);
        ConfigManager.setDebugMode(true);

        // Display updated configuration
        ConfigManager.displayConfig();

        // Reset to defaults
        ConfigManager.resetToDefaults();

        // Display after reset
        ConfigManager.displayConfig();

        // Test getter methods
        System.out.println("\n=== Testing Getter Methods ===");
        System.out.println("App Name: " + ConfigManager.getAppName());
        System.out.println("Version: " + ConfigManager.getVersion());
        System.out.println("Max Connections: " + ConfigManager.getMaxConnections());
        System.out.println("Timeout: " + ConfigManager.getTimeout());
        System.out.println("Debug Mode: " + ConfigManager.isDebugMode());
    }
}
```

**💡 Tips:**
- Static block executes once when class first loaded - perfect for one-time initialization like loading configuration
- Singleton pattern ensures only one instance exists - combines well with static methods for global access
- Private constructor prevents direct instantiation - forces use of static methods or getInstance()
- Static final constants (DEFAULT_*) provide compile-time constants that can't be changed
- ConfigManager provides centralized configuration management accessible from anywhere in application
- Static initialization guarantees configuration loaded before any method calls
- Validation in update methods (newTimeout > 0) ensures configuration integrity
- resetToDefaults() demonstrates resetting static state to known values
- displayConfig() shows all configuration in one place - useful for debugging
- getInstance() provides future extensibility if instance methods needed later
- Static block prints initialization messages showing when it executes (once only)
- All configuration access through static methods - no object creation needed

---

### Exercise 5: Database Connection Pool Manager

**📝 Problem Statement:**
Create a database connection pool management system demonstrating static resource management, connection counting with static variables, thread-safe static access patterns, and proper cleanup. The system should track total connections created, active connections, available connections, manage pool statistics, and provide static methods for acquiring and releasing connections.

**Requirements:**
- Create ConnectionPool class with private constructor preventing instantiation
- Define static fields: totalConnectionsCreated, activeConnections, maxPoolSize
- Static constant MAX_POOL_SIZE = 5 defining maximum allowed connections
- Implement static acquireConnection() method incrementing activeConnections if under limit
- Return connection ID string in format "CONN-001", "CONN-002", etc. using totalConnectionsCreated counter
- Implement static releaseConnection(String connectionId) method decrementing activeConnections
- Add validation ensuring activeConnections never goes negative or exceeds maxPoolSize
- Create static displayPoolStatus() method showing current pool statistics
- Implement static getAvailableConnections() returning (maxPoolSize - activeConnections)
- Add static resetPool() method resetting all counters (useful for testing)
- Include static isPoolAvailable() method checking if connections available
- Track connection IDs in static ArrayList for monitoring which connections are active
- Provide formatted output showing pool utilization percentage

**Sample Test Cases:**
```
Input: ConnectionPool.acquireConnection() [first call]
Expected Output:
=== Acquiring Connection ===
Connection CONN-001 acquired successfully
Active Connections: 1/5
Available: 4

Input: ConnectionPool.acquireConnection() [called 5 times]
Expected Output:
Connection CONN-001 acquired successfully
Connection CONN-002 acquired successfully
Connection CONN-003 acquired successfully
Connection CONN-004 acquired successfully
Connection CONN-005 acquired successfully
Pool Status: FULL (5/5 connections active)

Input: ConnectionPool.acquireConnection() [when pool is full]
Expected Output:
=== Acquiring Connection ===
ERROR: Connection pool exhausted!
Maximum pool size (5) reached.
Please release connections before acquiring new ones.
Active: 5/5

Input: ConnectionPool.releaseConnection("CONN-003")
Expected Output:
=== Releasing Connection ===
Connection CONN-003 released successfully
Active Connections: 4/5
Available: 1

Input: ConnectionPool.displayPoolStatus()
Expected Output:
=== Database Connection Pool Status ===
Max Pool Size: 5
Total Connections Created: 5
Active Connections: 4
Available Connections: 1
Pool Utilization: 80%
Status: Active

Input: ConnectionPool.resetPool()
Expected Output:
=== Resetting Connection Pool ===
Pool reset successfully
All counters cleared
Ready for new connections
```

**Solution:**
```java
import java.util.ArrayList;

public class ConnectionPool {
    // Static fields for pool management
    private static int totalConnectionsCreated = 0;
    private static int activeConnections = 0;
    private static final int MAX_POOL_SIZE = 5;
    private static ArrayList<String> activeConnectionIds = new ArrayList<>();

    // Private constructor (utility class pattern)
    private ConnectionPool() {
        throw new AssertionError("Utility class - cannot instantiate");
    }

    // Acquire connection from pool
    public static String acquireConnection() {
        System.out.println("\n=== Acquiring Connection ===");

        if (activeConnections >= MAX_POOL_SIZE) {
            System.out.println("ERROR: Connection pool exhausted!");
            System.out.println("Maximum pool size (" + MAX_POOL_SIZE + ") reached.");
            System.out.println("Please release connections before acquiring new ones.");
            System.out.println("Active: " + activeConnections + "/" + MAX_POOL_SIZE);
            return null;
        }

        totalConnectionsCreated++;
        activeConnections++;

        // Generate connection ID
        String connectionId = String.format("CONN-%03d", totalConnectionsCreated);
        activeConnectionIds.add(connectionId);

        System.out.println("Connection " + connectionId + " acquired successfully");
        System.out.println("Active Connections: " + activeConnections + "/" + MAX_POOL_SIZE);
        System.out.println("Available: " + getAvailableConnections());

        if (activeConnections == MAX_POOL_SIZE) {
            System.out.println("Pool Status: FULL (" + activeConnections + "/" + MAX_POOL_SIZE + " connections active)");
        }

        return connectionId;
    }

    // Release connection back to pool
    public static boolean releaseConnection(String connectionId) {
        System.out.println("\n=== Releasing Connection ===");

        if (connectionId == null) {
            System.out.println("ERROR: Invalid connection ID (null)");
            return false;
        }

        if (!activeConnectionIds.contains(connectionId)) {
            System.out.println("ERROR: Connection " + connectionId + " not found in active connections");
            return false;
        }

        if (activeConnections <= 0) {
            System.out.println("ERROR: No active connections to release");
            return false;
        }

        activeConnections--;
        activeConnectionIds.remove(connectionId);

        System.out.println("Connection " + connectionId + " released successfully");
        System.out.println("Active Connections: " + activeConnections + "/" + MAX_POOL_SIZE);
        System.out.println("Available: " + getAvailableConnections());

        return true;
    }

    // Get available connections
    public static int getAvailableConnections() {
        return MAX_POOL_SIZE - activeConnections;
    }

    // Check if pool has available connections
    public static boolean isPoolAvailable() {
        return activeConnections < MAX_POOL_SIZE;
    }

    // Get pool utilization percentage
    public static double getUtilizationPercentage() {
        return (activeConnections * 100.0) / MAX_POOL_SIZE;
    }

    // Display pool status
    public static void displayPoolStatus() {
        System.out.println("\n=== Database Connection Pool Status ===");
        System.out.println("Max Pool Size: " + MAX_POOL_SIZE);
        System.out.println("Total Connections Created: " + totalConnectionsCreated);
        System.out.println("Active Connections: " + activeConnections);
        System.out.println("Available Connections: " + getAvailableConnections());
        System.out.println("Pool Utilization: " + String.format("%.0f%%", getUtilizationPercentage()));

        if (activeConnections > 0) {
            System.out.println("Status: Active");
            System.out.println("Active Connection IDs: " + activeConnectionIds);
        } else {
            System.out.println("Status: Idle (no active connections)");
        }
    }

    // Reset pool (useful for testing)
    public static void resetPool() {
        System.out.println("\n=== Resetting Connection Pool ===");
        totalConnectionsCreated = 0;
        activeConnections = 0;
        activeConnectionIds.clear();
        System.out.println("Pool reset successfully");
        System.out.println("All counters cleared");
        System.out.println("Ready for new connections");
    }

    // Get max pool size
    public static int getMaxPoolSize() {
        return MAX_POOL_SIZE;
    }

    // Get active connection count
    public static int getActiveConnections() {
        return activeConnections;
    }
}

public class TestConnectionPool {
    public static void main(String[] args) {
        System.out.println("=== Connection Pool Manager Test ===\n");

        // Acquire multiple connections
        String conn1 = ConnectionPool.acquireConnection();
        String conn2 = ConnectionPool.acquireConnection();
        String conn3 = ConnectionPool.acquireConnection();

        // Display pool status
        ConnectionPool.displayPoolStatus();

        // Acquire more connections
        String conn4 = ConnectionPool.acquireConnection();
        String conn5 = ConnectionPool.acquireConnection();

        // Display status when full
        ConnectionPool.displayPoolStatus();

        // Try to acquire when pool is full
        String conn6 = ConnectionPool.acquireConnection();  // Should fail

        // Release some connections
        ConnectionPool.releaseConnection(conn3);
        ConnectionPool.releaseConnection(conn5);

        // Display status after release
        ConnectionPool.displayPoolStatus();

        // Acquire new connection
        String conn7 = ConnectionPool.acquireConnection();

        // Final status
        ConnectionPool.displayPoolStatus();

        // Test reset
        ConnectionPool.resetPool();
        ConnectionPool.displayPoolStatus();
    }
}
```

**💡 Tips:**
- Static counters (totalConnectionsCreated, activeConnections) track pool state across entire application
- MAX_POOL_SIZE static final constant ensures compile-time constant that can't be changed
- Private constructor with AssertionError prevents instantiation - utility class pattern
- Connection ID generation using String.format("CONN-%03d") creates formatted IDs: CONN-001, CONN-002
- ArrayList<String> activeConnectionIds tracks which specific connections are currently active
- Validation checks (activeConnections < MAX_POOL_SIZE) prevent pool overflow
- acquireConnection() returns null when pool exhausted - caller must check before using
- releaseConnection() validates connection ID exists in active list before releasing
- Prevents activeConnections going negative with validation check
- displayPoolStatus() provides comprehensive view of pool state - useful for monitoring
- getUtilizationPercentage() calculates percentage: (active / max) × 100
- resetPool() useful for testing - clears all state back to initial values
- Static methods enable global access: ConnectionPool.acquireConnection() from anywhere
- Thread-safety note: This implementation NOT thread-safe - production code would need synchronization
- Resource management pattern: acquire → use → release ensures connections returned to pool

---

### Exercise 6: Library Management System with Multi-Package Structure

**📝 Problem Statement:**
Create a comprehensive library management system demonstrating proper package organization, static utility classes, package-level access control, and inter-package communication. The system should have separate packages for models (Book, Member), utilities (ValidationUtils, DateUtils), and services (LibraryService), showing how to structure a real-world application with multiple packages working together.

**Requirements:**
- Create package structure: com.library.models, com.library.utils, com.library.services
- **Models package (com.library.models)**:
  - Book class with fields: bookId, title, author, isbn, available (boolean)
  - Member class with fields: memberId, name, email, booksIssued (int)
  - Both classes should be public with proper getters and public methods
- **Utils package (com.library.utils)**:
  - ValidationUtils class: all static methods with private constructor
  - Static methods: isValidISBN(String isbn), isValidEmail(String email), isNotEmpty(String str)
  - DateUtils class: all static methods for date formatting
  - Static method: getCurrentDate() returning formatted current date string
- **Services package (com.library.services)**:
  - LibraryService class managing books and members
  - Static fields: totalBooks, totalMembers, libraryName
  - Static methods: addBook(Book book), registerMember(Member member)
  - Static method: issueBook(String bookId, String memberId) with validation
  - Static method: returnBook(String bookId, String memberId)
  - Static displayStatistics() showing library statistics
- Demonstrate imports: each package imports classes from other packages
- Use static import for utility methods in LibraryService
- Show proper use of public classes across packages and default (package-private) helper classes
- Include validation using ValidationUtils before adding books/members

**Sample Test Cases:**
```
Input: Book("B001", "Java Programming", "John Doe", "978-0-13-468599-1")
Expected Output:
=== Adding Book ===
Validating ISBN: 978-0-13-468599-1
ISBN format valid ✓
Book added successfully: Java Programming by John Doe
Total books in library: 1

Input: Member("M001", "Alice Smith", "alice@example.com")
Expected Output:
=== Registering Member ===
Validating email: alice@example.com
Email format valid ✓
Member registered successfully: Alice Smith
Total members: 1

Input: LibraryService.issueBook("B001", "M001")
Expected Output:
=== Issuing Book ===
Book: Java Programming
Member: Alice Smith
Checking availability...
Book issued successfully!
Issued to: Alice Smith
Issue Date: 2024-01-10
Return by: 2024-01-24 (14 days)
Member's books issued: 1

Input: LibraryService.issueBook("B001", "M002") [book already issued]
Expected Output:
=== Issuing Book ===
ERROR: Book not available
Current status: Issued to Alice Smith
Please wait for book to be returned

Input: LibraryService.returnBook("B001", "M001")
Expected Output:
=== Returning Book ===
Book: Java Programming
Returned by: Alice Smith
Return Date: 2024-01-15
Book available for next member
Member's books issued: 0

Input: LibraryService.displayStatistics()
Expected Output:
=== Library Statistics ===
Library Name: City Central Library
Total Books: 5
Total Members: 3
Available Books: 4
Issued Books: 1
Active Members: 2
```

**Solution:**
```java
// File: com/library/models/Book.java
package com.library.models;

public class Book {
    private String bookId;
    private String title;
    private String author;
    private String isbn;
    private boolean available;
    private String issuedTo;

    public Book(String bookId, String title, String author, String isbn) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.available = true;
        this.issuedTo = null;
    }

    // Getters
    public String getBookId() { return bookId; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }
    public boolean isAvailable() { return available; }
    public String getIssuedTo() { return issuedTo; }

    // Issue/return methods
    public void issueBook(String memberName) {
        this.available = false;
        this.issuedTo = memberName;
    }

    public void returnBook() {
        this.available = true;
        this.issuedTo = null;
    }

    @Override
    public String toString() {
        return title + " by " + author + " (ISBN: " + isbn + ")";
    }
}

// File: com/library/models/Member.java
package com.library.models;

public class Member {
    private String memberId;
    private String name;
    private String email;
    private int booksIssued;

    public Member(String memberId, String name, String email) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.booksIssued = 0;
    }

    // Getters
    public String getMemberId() { return memberId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public int getBooksIssued() { return booksIssued; }

    // Increment/decrement book count
    public void issueBook() {
        booksIssued++;
    }

    public void returnBook() {
        if (booksIssued > 0) {
            booksIssued--;
        }
    }

    @Override
    public String toString() {
        return name + " (ID: " + memberId + ", Email: " + email + ")";
    }
}

// File: com/library/utils/ValidationUtils.java
package com.library.utils;

public final class ValidationUtils {
    // Private constructor (utility class)
    private ValidationUtils() {
        throw new AssertionError("Utility class - cannot instantiate");
    }

    // Validate ISBN format (simplified)
    public static boolean isValidISBN(String isbn) {
        if (isbn == null || isbn.isEmpty()) {
            return false;
        }
        // Remove hyphens for validation
        String cleanIsbn = isbn.replaceAll("-", "");
        // Check length (10 or 13 digits)
        return cleanIsbn.matches("\\d{10}") || cleanIsbn.matches("\\d{13}");
    }

    // Validate email format (simplified)
    public static boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        // Basic email regex
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    }

    // Check if string is not empty
    public static boolean isNotEmpty(String str) {
        return str != null && !str.trim().isEmpty();
    }

    // Validate book ID format
    public static boolean isValidBookId(String bookId) {
        return bookId != null && bookId.matches("B\\d{3}");
    }

    // Validate member ID format
    public static boolean isValidMemberId(String memberId) {
        return memberId != null && memberId.matches("M\\d{3}");
    }
}

// File: com/library/utils/DateUtils.java
package com.library.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public final class DateUtils {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    // Private constructor
    private DateUtils() {
        throw new AssertionError("Utility class - cannot instantiate");
    }

    // Get current date as formatted string
    public static String getCurrentDate() {
        return LocalDate.now().format(DATE_FORMATTER);
    }

    // Get future date (for return date calculation)
    public static String getFutureDate(int daysFromNow) {
        return LocalDate.now().plusDays(daysFromNow).format(DATE_FORMATTER);
    }

    // Format date for display
    public static String formatDate(LocalDate date) {
        return date.format(DATE_FORMATTER);
    }
}

// File: com/library/services/LibraryService.java
package com.library.services;

import com.library.models.Book;
import com.library.models.Member;
import static com.library.utils.ValidationUtils.*;
import static com.library.utils.DateUtils.*;

import java.util.HashMap;
import java.util.Map;

public class LibraryService {
    // Static fields for library management
    private static String libraryName = "City Central Library";
    private static int totalBooks = 0;
    private static int totalMembers = 0;
    private static int booksIssued = 0;

    // Storage
    private static Map<String, Book> books = new HashMap<>();
    private static Map<String, Member> members = new HashMap<>();

    // Private constructor (utility class)
    private LibraryService() {
        throw new AssertionError("Service class - cannot instantiate");
    }

    // Add book to library
    public static boolean addBook(Book book) {
        System.out.println("\n=== Adding Book ===");

        // Validate ISBN using static import
        System.out.println("Validating ISBN: " + book.getIsbn());
        if (!isValidISBN(book.getIsbn())) {
            System.out.println("ERROR: Invalid ISBN format");
            return false;
        }
        System.out.println("ISBN format valid ✓");

        // Validate title and author
        if (!isNotEmpty(book.getTitle()) || !isNotEmpty(book.getAuthor())) {
            System.out.println("ERROR: Title and author cannot be empty");
            return false;
        }

        // Add book
        books.put(book.getBookId(), book);
        totalBooks++;

        System.out.println("Book added successfully: " + book.getTitle() + " by " + book.getAuthor());
        System.out.println("Total books in library: " + totalBooks);

        return true;
    }

    // Register new member
    public static boolean registerMember(Member member) {
        System.out.println("\n=== Registering Member ===");

        // Validate email using static import
        System.out.println("Validating email: " + member.getEmail());
        if (!isValidEmail(member.getEmail())) {
            System.out.println("ERROR: Invalid email format");
            return false;
        }
        System.out.println("Email format valid ✓");

        // Validate name
        if (!isNotEmpty(member.getName())) {
            System.out.println("ERROR: Member name cannot be empty");
            return false;
        }

        // Register member
        members.put(member.getMemberId(), member);
        totalMembers++;

        System.out.println("Member registered successfully: " + member.getName());
        System.out.println("Total members: " + totalMembers);

        return true;
    }

    // Issue book to member
    public static boolean issueBook(String bookId, String memberId) {
        System.out.println("\n=== Issuing Book ===");

        // Validate IDs
        Book book = books.get(bookId);
        Member member = members.get(memberId);

        if (book == null) {
            System.out.println("ERROR: Book not found (ID: " + bookId + ")");
            return false;
        }

        if (member == null) {
            System.out.println("ERROR: Member not found (ID: " + memberId + ")");
            return false;
        }

        System.out.println("Book: " + book.getTitle());
        System.out.println("Member: " + member.getName());

        // Check availability
        System.out.println("Checking availability...");
        if (!book.isAvailable()) {
            System.out.println("ERROR: Book not available");
            System.out.println("Current status: Issued to " + book.getIssuedTo());
            System.out.println("Please wait for book to be returned");
            return false;
        }

        // Issue book
        book.issueBook(member.getName());
        member.issueBook();
        booksIssued++;

        System.out.println("Book issued successfully!");
        System.out.println("Issued to: " + member.getName());
        System.out.println("Issue Date: " + getCurrentDate());
        System.out.println("Return by: " + getFutureDate(14) + " (14 days)");
        System.out.println("Member's books issued: " + member.getBooksIssued());

        return true;
    }

    // Return book
    public static boolean returnBook(String bookId, String memberId) {
        System.out.println("\n=== Returning Book ===");

        Book book = books.get(bookId);
        Member member = members.get(memberId);

        if (book == null || member == null) {
            System.out.println("ERROR: Invalid book or member ID");
            return false;
        }

        if (book.isAvailable()) {
            System.out.println("ERROR: Book is not currently issued");
            return false;
        }

        // Return book
        book.returnBook();
        member.returnBook();
        booksIssued--;

        System.out.println("Book: " + book.getTitle());
        System.out.println("Returned by: " + member.getName());
        System.out.println("Return Date: " + getCurrentDate());
        System.out.println("Book available for next member");
        System.out.println("Member's books issued: " + member.getBooksIssued());

        return true;
    }

    // Display library statistics
    public static void displayStatistics() {
        System.out.println("\n=== Library Statistics ===");
        System.out.println("Library Name: " + libraryName);
        System.out.println("Total Books: " + totalBooks);
        System.out.println("Total Members: " + totalMembers);
        System.out.println("Available Books: " + (totalBooks - booksIssued));
        System.out.println("Issued Books: " + booksIssued);

        // Count active members (members with issued books)
        int activeMembers = 0;
        for (Member member : members.values()) {
            if (member.getBooksIssued() > 0) {
                activeMembers++;
            }
        }
        System.out.println("Active Members: " + activeMembers);
    }
}

// File: com/library/main/LibraryApp.java
package com.library.main;

import com.library.models.Book;
import com.library.models.Member;
import com.library.services.LibraryService;

public class LibraryApp {
    public static void main(String[] args) {
        System.out.println("=== Library Management System ===\n");

        // Create and add books
        Book book1 = new Book("B001", "Java Programming", "John Doe", "978-0-13-468599-1");
        Book book2 = new Book("B002", "Data Structures", "Jane Smith", "978-0-262-03384-8");
        Book book3 = new Book("B003", "Algorithms", "Robert Sedgewick", "978-0-321-57351-3");

        LibraryService.addBook(book1);
        LibraryService.addBook(book2);
        LibraryService.addBook(book3);

        // Register members
        Member member1 = new Member("M001", "Alice Smith", "alice@example.com");
        Member member2 = new Member("M002", "Bob Johnson", "bob@example.com");

        LibraryService.registerMember(member1);
        LibraryService.registerMember(member2);

        // Issue books
        LibraryService.issueBook("B001", "M001");
        LibraryService.issueBook("B002", "M001");

        // Try to issue already issued book
        LibraryService.issueBook("B001", "M002");

        // Display statistics
        LibraryService.displayStatistics();

        // Return book
        LibraryService.returnBook("B001", "M001");

        // Issue to another member
        LibraryService.issueBook("B001", "M002");

        // Final statistics
        LibraryService.displayStatistics();
    }
}
```

**💡 Tips:**
- Package structure organizes code by responsibility: models (data), utils (helpers), services (business logic)
- Package naming convention: reverse domain name (com.library.models) ensures uniqueness
- Public classes (Book, Member) accessible across packages - used in other packages via imports
- Utility classes (ValidationUtils, DateUtils) use private constructor + final class preventing instantiation/extension
- Static import (import static com.library.utils.ValidationUtils.*) allows direct use: isValidISBN() instead of ValidationUtils.isValidISBN()
- HashMap<String, Book> stores books with bookId as key enabling O(1) lookup
- Static fields in LibraryService maintain library state across entire application
- Validation methods centralized in ValidationUtils ensuring consistent validation everywhere
- DateUtils provides date formatting utilities - demonstrates utility class for common operations
- Models package contains data classes (Book, Member) with getters and domain methods
- Services package contains business logic managing models and using utilities
- File location matches package: com/library/models/Book.java for package com.library.models
- Static methods in LibraryService enable global access: LibraryService.addBook() from anywhere
- Method chaining: book.issueBook() + member.issueBook() + booksIssued++ updates all related state
- isValid methods return boolean allowing if (!isValidISBN()) pattern for error handling

---

## 🎓 Key Takeaways

1. **Packages** organize code and prevent naming conflicts
2. **Package naming**: use reverse domain name (com.company.project)
3. **Static variables** are shared by all instances
4. **Static methods** can be called without creating objects
5. **Static blocks** execute when class is loaded
6. **Static import** allows using static members without class name
7. **Utility classes** should have private constructors and all static methods

---

## 📝 Summary

Today you learned:
- ✅ Creating and using packages
- ✅ Import statements and access control
- ✅ Static variables and methods
- ✅ Static blocks for initialization
- ✅ Static import for convenience
- ✅ Best practices for organizing code

---

## ⚠️ Common Mistakes

### 1. Package Declaration Mistakes

#### ❌ Wrong - Package Declaration Not First Statement:
```java
// WRONG
import java.util.*;  // Import before package!

package com.mycompany.app;  // Compilation error! Package must be first

public class MyClass {
}
```
**Issue:** Package declaration must be the very first statement in file

#### ✅ Right:
```java
// CORRECT - Package first, then imports, then class
package com.mycompany.app;

import java.util.*;

public class MyClass {
}
```

**Why:** Java requires package declaration before any other code (except comments).

**💡 Tip:** Order: 1) package, 2) imports, 3) class/interface declarations.

---

#### ❌ Wrong - Package Name Doesn't Match Directory Structure:
```java
// File location: src/com/example/utilities/Helper.java
// WRONG package name
package com.company.tools;  // Doesn't match directory!

public class Helper {
}
```
**Issue:** Package name must exactly match directory structure

#### ✅ Right:
```java
// File location: src/com/example/utilities/Helper.java
// CORRECT package name
package com.example.utilities;  // Matches directory structure

public class Helper {
}
```

**Why:** Java compiler uses package name to find class files in directory structure.

**💡 Tip:** Package name = directory path from source root.

---

#### ❌ Wrong - Using Uppercase in Package Names:
```java
// WRONG - Package names should be lowercase
package Com.MyCompany.MyApp;  // Not following convention

public class MyClass {
}
```
**Issue:** Package naming convention violated; should be all lowercase

#### ✅ Right:
```java
// CORRECT - All lowercase
package com.mycompany.myapp;

public class MyClass {
}
```

**Why:** Java naming convention: packages = lowercase, classes = PascalCase.

**💡 Tip:** Always use lowercase for package names; use dots to separate levels.

---

### 2. Import Statement Mistakes

#### ❌ Wrong - Importing Entire Package Unnecessarily:
```java
// WRONG - Import * when only using one class
import java.util.*;  // Imports all classes from java.util

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();  // Only use ArrayList
    }
}
```
**Issue:** Wildcard import reduces code clarity; harder to see dependencies

#### ✅ Right:
```java
// CORRECT - Import specific classes
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
    }
}
```

**Why:** Specific imports make dependencies explicit; better for readability.

**💡 Tip:** Use specific imports in production code; * okay for quick prototypes.

---

#### ❌ Wrong - Not Resolving Class Name Conflicts:
```java
// WRONG - Both packages have Date class
import java.util.*;
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        Date date = new Date();  // Compilation error! Ambiguous - which Date?
    }
}
```
**Issue:** Both java.util and java.sql have Date class; ambiguous reference

#### ✅ Right:
```java
// CORRECT - Use fully qualified name or specific import
import java.util.ArrayList;
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        java.util.Date utilDate = new java.util.Date();  // Fully qualified
        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());

        // OR import one, fully qualify the other
        // import java.util.Date;
        // Date utilDate = new Date();
        // java.sql.Date sqlDate = new java.sql.Date(...);
    }
}
```

**Why:** Use fully qualified names when classes have same simple name.

**💡 Tip:** Import the one you use most; fully qualify the less common one.

---

#### ❌ Wrong - Unnecessary java.lang Import:
```java
// WRONG - java.lang imported automatically
import java.lang.String;  // Unnecessary!
import java.lang.System;  // Unnecessary!

public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        System.out.println(str);
    }
}
```
**Issue:** java.lang is imported automatically; explicit import redundant

#### ✅ Right:
```java
// CORRECT - No import needed for java.lang
public class Main {
    public static void main(String[] args) {
        String str = "Hello";  // java.lang.String automatically available
        System.out.println(str);  // java.lang.System automatically available
    }
}
```

**Why:** java.lang classes (String, System, Math, etc.) auto-imported by Java.

**💡 Tip:** Never import java.lang classes; they're always available.

---

### 3. Access Modifier with Packages Mistakes

#### ❌ Wrong - Expecting Protected to Work Across All Packages:
```java
// Package: com.example.package1
package com.example.package1;

public class Parent {
    protected void display() {
        System.out.println("Parent");
    }
}

// Package: com.example.package2
package com.example.package2;

import com.example.package1.Parent;

public class NonChildClass {
    public static void main(String[] args) {
        Parent p = new Parent();
        p.display();  // Compilation error! Not subclass, different package
    }
}
```
**Issue:** protected accessible only in same package OR subclass in different package

#### ✅ Right:
```java
// Package: com.example.package2
package com.example.package2;

import com.example.package1.Parent;

// Option 1: Inherit to access protected
public class Child extends Parent {
    public static void main(String[] args) {
        Child c = new Child();
        c.display();  // OK - subclass
    }
}

// Option 2: Change to public in Parent if needed by non-subclasses
```

**Why:** protected = same package OR subclass only, not all packages.

**💡 Tip:** protected for inheritance; public for general access across packages.

---

#### ❌ Wrong - Default Access Across Packages:
```java
// Package: com.example.package1
package com.example.package1;

class Helper {  // Default (package-private) access
    void help() {
        System.out.println("Helping");
    }
}

// Package: com.example.package2
package com.example.package2;

import com.example.package1.Helper;  // Compilation error! Not accessible

public class Main {
    public static void main(String[] args) {
        Helper h = new Helper();  // Error!
    }
}
```
**Issue:** Default (no modifier) = package-private; only accessible in same package

#### ✅ Right:
```java
// Package: com.example.package1
package com.example.package1;

public class Helper {  // Public access
    public void help() {
        System.out.println("Helping");
    }
}

// Package: com.example.package2
package com.example.package2;

import com.example.package1.Helper;

public class Main {
    public static void main(String[] args) {
        Helper h = new Helper();  // OK
        h.help();
    }
}
```

**Why:** Default access limited to same package; use public for cross-package access.

**💡 Tip:** Use public for classes meant to be used across packages.

---

### 4. Static Variable Mistakes

#### ❌ Wrong - Thinking Static Variables are Instance-Specific:
```java
// WRONG understanding
public class Counter {
    static int count = 0;

    public Counter() {
        count++;
    }

    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();

        // Student expects each object to have separate count
        System.out.println(c1.count);  // Prints 2, not 1!
        System.out.println(c2.count);  // Prints 2, not 1!
        // count is shared, not separate
    }
}
```
**Issue:** Static variables shared by all instances; not separate copies

#### ✅ Right:
```java
// CORRECT - Understand static is shared
public class Counter {
    static int totalCount = 0;  // Shared by all
    int instanceId;             // Separate for each

    public Counter() {
        totalCount++;
        this.instanceId = totalCount;
    }

    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();

        System.out.println("Total: " + Counter.totalCount);  // 2 (shared)
        System.out.println("c1 ID: " + c1.instanceId);      // 1 (separate)
        System.out.println("c2 ID: " + c2.instanceId);      // 2 (separate)
    }
}
```

**Why:** Static = class-level, one copy; instance = object-level, separate copies.

**💡 Tip:** Use static for shared data; instance variables for object-specific data.

---

#### ❌ Wrong - Accessing Static Via Instance (Bad Practice):
```java
// WRONG (compiles but confusing)
public class MyClass {
    static int staticVar = 100;

    public static void main(String[] args) {
        MyClass obj = new MyClass();
        System.out.println(obj.staticVar);  // Bad practice! Looks like instance var
    }
}
```
**Issue:** Accessing static via instance reference is confusing; looks like instance access

#### ✅ Right:
```java
// CORRECT - Access static via class name
public class MyClass {
    static int staticVar = 100;

    public static void main(String[] args) {
        System.out.println(MyClass.staticVar);  // Clear: static access
        // NOT: obj.staticVar
    }
}
```

**Why:** Class name makes it clear variable is static, not instance-specific.

**💡 Tip:** Always use ClassName.staticMember for clarity.

---

#### ❌ Wrong - Not Initializing Static Variables Properly:
```java
// WRONG - Complex initialization in declaration
public class Config {
    static String config;
    static {
        // Trying to read file, may throw exception
        config = readConfigFile();  // Checked exception!
    }

    private static String readConfigFile() throws IOException {
        // Read file...
        return "config";
    }
}
```
**Issue:** Checked exceptions in static block require try-catch or throw declaration

#### ✅ Right:
```java
// CORRECT - Handle exceptions in static block
public class Config {
    static String config;

    static {
        try {
            config = readConfigFile();
        } catch (IOException e) {
            System.err.println("Failed to load config");
            config = "default";  // Fallback
        }
    }

    private static String readConfigFile() throws IOException {
        // Read file...
        return "config";
    }
}
```

**Why:** Static blocks can't declare thrown exceptions; must handle with try-catch.

**💡 Tip:** Always handle checked exceptions inside static blocks with try-catch.

---

### 5. Static Method Mistakes

#### ❌ Wrong - Accessing Instance Members from Static Method:
```java
// WRONG
public class MyClass {
    int instanceVar = 10;

    public static void staticMethod() {
        System.out.println(instanceVar);  // Compilation error! No instance
    }
}
```
**Issue:** Static methods have no implicit instance (no "this"); can't access instance members

#### ✅ Right:
```java
// CORRECT - Pass instance or make variable static
public class MyClass {
    int instanceVar = 10;
    static int staticVar = 20;

    public static void staticMethod(MyClass obj) {
        System.out.println(obj.instanceVar);  // OK - explicit instance
        System.out.println(staticVar);        // OK - static
    }

    public static void main(String[] args) {
        MyClass obj = new MyClass();
        staticMethod(obj);
    }
}
```

**Why:** Static context has no "this"; need explicit object to access instance members.

**💡 Tip:** Static methods can only directly access other static members.

---

#### ❌ Wrong - Using 'this' in Static Method:
```java
// WRONG
public class MyClass {
    static int value = 10;

    public static void staticMethod() {
        System.out.println(this.value);  // Compilation error! 'this' in static context
    }
}
```
**Issue:** Static methods have no "this" reference; "this" refers to current instance

#### ✅ Right:
```java
// CORRECT - Use class name for static members
public class MyClass {
    static int value = 10;

    public static void staticMethod() {
        System.out.println(MyClass.value);  // OK - use class name
        // OR just: value (implicit class reference)
        System.out.println(value);  // Also OK
    }
}
```

**Why:** "this" refers to current instance; static methods have no instance.

**💡 Tip:** Never use "this" or "super" in static methods.

---

#### ❌ Wrong - Calling Instance Method from Static Method:
```java
// WRONG
public class MyClass {
    public void instanceMethod() {
        System.out.println("Instance method");
    }

    public static void staticMethod() {
        instanceMethod();  // Compilation error! No instance
    }
}
```
**Issue:** Instance methods require an instance; static context has none

#### ✅ Right:
```java
// CORRECT - Create instance or make method static
public class MyClass {
    public void instanceMethod() {
        System.out.println("Instance method");
    }

    public static void staticMethod() {
        MyClass obj = new MyClass();
        obj.instanceMethod();  // OK - have instance
    }

    // OR make the method static if appropriate
    public static void helperMethod() {
        System.out.println("Static helper");
    }

    public static void anotherStaticMethod() {
        helperMethod();  // OK - both static
    }
}
```

**Why:** Instance methods need instance; provide one or make method static.

**💡 Tip:** Static methods can only directly call other static methods.

---

### 6. Static Block Mistakes

#### ❌ Wrong - Multiple Static Blocks in Wrong Order:
```java
// WRONG assumption
public class InitOrder {
    static int a;
    static int b;

    static {
        b = a + 10;  // a is 0 (default), so b = 10
    }

    static {
        a = 5;  // a set to 5, but b already calculated
    }

    public static void main(String[] args) {
        System.out.println("a = " + a);  // 5
        System.out.println("b = " + b);  // 10 (not 15 as student might expect)
    }
}
```
**Issue:** Static blocks execute in order they appear; later blocks don't re-execute earlier ones

#### ✅ Right:
```java
// CORRECT - Order static blocks properly
public class InitOrder {
    static int a;
    static int b;

    static {
        a = 5;  // Initialize a first
    }

    static {
        b = a + 10;  // Now b = 15
    }

    public static void main(String[] args) {
        System.out.println("a = " + a);  // 5
        System.out.println("b = " + b);  // 15
    }
}
```

**Why:** Static blocks execute top-to-bottom once when class loads.

**💡 Tip:** Order static blocks by dependency; initialize prerequisites first.

---

#### ❌ Wrong - Thinking Static Block Executes for Each Instance:
```java
// WRONG expectation
public class Counter {
    static int count = 0;

    static {
        count++;
        System.out.println("Static block: count = " + count);
    }

    public Counter() {
        System.out.println("Constructor: count = " + count);
    }

    public static void main(String[] args) {
        // Student expects static block to run 3 times
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();
    }
}
```
**Issue:** Static block runs ONCE when class first loaded, not per instance

#### ✅ Right:
```java
// CORRECT - Understand execution
public class Counter {
    static int count = 0;

    static {
        System.out.println("Static block executed (once)");
    }

    public Counter() {
        count++;
        System.out.println("Constructor: count = " + count);
    }

    public static void main(String[] args) {
        Counter c1 = new Counter();  // Static block runs before this
        Counter c2 = new Counter();  // Static block does NOT run again
        Counter c3 = new Counter();

        // Output:
        // Static block executed (once)
        // Constructor: count = 1
        // Constructor: count = 2
        // Constructor: count = 3
    }
}
```

**Why:** Static block executes once when class loaded; constructor runs per instance.

**💡 Tip:** Static block = class initialization (once); constructor = instance initialization (per object).

---

### 7. Static Import Mistakes

#### ❌ Wrong - Overusing Static Import:
```java
// WRONG - Too many static imports reduce clarity
import static java.lang.Math.*;
import static java.lang.System.*;
import static java.util.Arrays.*;
import static java.util.Collections.*;

public class Main {
    public static void main(String[] args) {
        out.println(sqrt(16));  // Hard to know where sqrt and out come from
        sort(new int[]{3, 1, 2});
    }
}
```
**Issue:** Excessive static imports obscure where methods come from

#### ✅ Right:
```java
// CORRECT - Use static import sparingly
import static java.lang.Math.sqrt;
import static java.lang.Math.pow;

public class Main {
    public static void main(String[] args) {
        double result = sqrt(16);  // Clear: from Math
        System.out.println(result);
    }
}

// OR don't use static import at all
public class Main {
    public static void main(String[] args) {
        double result = Math.sqrt(16);  // Very clear
        System.out.println(result);
    }
}
```

**Why:** Static import convenient but can reduce readability if overused.

**💡 Tip:** Use static import only for frequently used constants/methods (like Math, Assert).

---

#### ❌ Wrong - Static Import Causing Name Conflicts:
```java
// WRONG - Name conflict
import static java.lang.Math.max;
import static java.util.Collections.max;

public class Main {
    public static void main(String[] args) {
        int result = max(10, 20);  // Compilation error! Which max()?
    }
}
```
**Issue:** Two static imports with same method name cause ambiguity

#### ✅ Right:
```java
// CORRECT - Import one, fully qualify the other
import static java.lang.Math.max;

public class Main {
    public static void main(String[] args) {
        int result1 = max(10, 20);  // Math.max
        int result2 = Collections.max(Arrays.asList(10, 20));  // Fully qualified
    }
}

// OR don't use static import
public class Main {
    public static void main(String[] args) {
        int result1 = Math.max(10, 20);
        int result2 = Collections.max(Arrays.asList(10, 20));
    }
}
```

**Why:** Fully qualifying disambiguates; or avoid static import for conflicting names.

**💡 Tip:** When names conflict, skip static import and use class name.

---

### 8. Utility Class Mistakes

#### ❌ Wrong - Forgetting Private Constructor in Utility Class:
```java
// WRONG - Can be instantiated
public class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }

    public static int multiply(int a, int b) {
        return a * b;
    }
}

// Problem: Can create useless instance
MathUtils utils = new MathUtils();  // Doesn't make sense!
```
**Issue:** Utility classes shouldn't be instantiated; all methods static

#### ✅ Right:
```java
// CORRECT - Private constructor prevents instantiation
public class MathUtils {
    // Private constructor
    private MathUtils() {
        throw new AssertionError("Utility class - cannot instantiate");
    }

    public static int add(int a, int b) {
        return a + b;
    }

    public static int multiply(int a, int b) {
        return a * b;
    }
}

// Now cannot instantiate:
// MathUtils utils = new MathUtils();  // Compilation error!
```

**Why:** Private constructor prevents instantiation of utility class.

**💡 Tip:** Utility classes: all static methods + private constructor.

---

#### ❌ Wrong - Making Utility Class Extendable:
```java
// WRONG - Can be subclassed
public class StringUtils {
    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }
}

// Problem: Can subclass (doesn't make sense)
public class MyStringUtils extends StringUtils {
}
```
**Issue:** Utility classes shouldn't be extended; defeats purpose

#### ✅ Right:
```java
// CORRECT - Make class final with private constructor
public final class StringUtils {  // final prevents subclassing
    private StringUtils() {
        throw new AssertionError("Utility class");
    }

    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }
}

// Cannot extend:
// public class MyStringUtils extends StringUtils {  // Error!
// }
```

**Why:** final + private constructor prevents both instantiation and inheritance.

**💡 Tip:** Utility classes should be final with private constructor.

---

### 9. Static vs Instance Choice Mistakes

#### ❌ Wrong - Making Everything Static:
```java
// WRONG - Inappropriate use of static
public class Employee {
    static String name;  // BAD - each employee has different name!
    static int age;      // BAD - each employee has different age!
    static double salary;  // BAD!

    public static void display() {
        System.out.println(name + ", " + age + ", " + salary);
    }

    public static void main(String[] args) {
        // Problem: All employees share same variables!
        name = "Alice"; age = 30; salary = 50000;
        display();  // Alice, 30, 50000

        name = "Bob"; age = 25; salary = 45000;
        display();  // Bob, 25, 45000 - Alice data lost!
    }
}
```
**Issue:** Using static for object-specific data; all instances share same variables

#### ✅ Right:
```java
// CORRECT - Instance variables for object-specific data
public class Employee {
    static int employeeCount = 0;  // Static - shared counter
    static String companyName = "ABC Corp";  // Static - same for all

    String name;  // Instance - each employee different
    int age;      // Instance
    double salary;  // Instance

    public Employee(String name, int age, double salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        employeeCount++;
    }

    public void display() {
        System.out.println(name + ", " + age + ", " + salary);
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Alice", 30, 50000);
        Employee e2 = new Employee("Bob", 25, 45000);

        e1.display();  // Alice, 30, 50000
        e2.display();  // Bob, 25, 45000 - both maintained

        System.out.println("Total: " + Employee.employeeCount);  // 2
    }
}
```

**Why:** Static for shared data; instance for object-specific data.

**💡 Tip:** Ask: "Is this same for all instances?" → static. "Different per instance?" → instance.

---

#### ❌ Wrong - Using Instance When Static Would Be Better:
```java
// WRONG - Instance method for stateless operation
public class Calculator {
    public int add(int a, int b) {  // Doesn't use instance state
        return a + b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();  // Unnecessary object creation
        int result = calc.add(5, 3);
    }
}
```
**Issue:** Method doesn't use instance state; doesn't need instance

#### ✅ Right:
```java
// CORRECT - Static for stateless operations
public class Calculator {
    public static int add(int a, int b) {  // Static - no state needed
        return a + b;
    }

    public static void main(String[] args) {
        int result = Calculator.add(5, 3);  // No object needed
    }
}
```

**Why:** Static methods for operations that don't need instance state.

**💡 Tip:** If method doesn't use instance variables, make it static.

---

### 10. Memory and Initialization Mistakes

#### ❌ Wrong - Not Understanding Static Memory Allocation:
```java
// WRONG understanding
public class MemoryTest {
    static int[] staticArray = new int[1000000];  // 4MB
    int[] instanceArray = new int[1000000];       // 4MB per instance

    public static void main(String[] args) {
        // Student thinks each instance gets its own static array
        MemoryTest t1 = new MemoryTest();  // Creates instanceArray (4MB)
        MemoryTest t2 = new MemoryTest();  // Creates another instanceArray (4MB)
        MemoryTest t3 = new MemoryTest();  // Creates another instanceArray (4MB)

        // Total memory: staticArray (4MB, once) + 3 × instanceArray (12MB)
        // = 16MB, not 12MB as student might think
    }
}
```
**Issue:** Static allocated once; instance allocated per object; memory implications

#### ✅ Right:
```java
// CORRECT - Understand memory allocation
public class MemoryTest {
    static int staticCount = 0;  // Allocated once, shared
    int instanceId;              // Allocated per instance

    public MemoryTest() {
        staticCount++;
        this.instanceId = staticCount;
    }

    public static void main(String[] args) {
        // Static: allocated once (small memory)
        // Instance: allocated per object (scales with instances)

        MemoryTest t1 = new MemoryTest();
        MemoryTest t2 = new MemoryTest();
        MemoryTest t3 = new MemoryTest();

        System.out.println("Static count: " + staticCount);  // 3 (one location)
        System.out.println("t1 ID: " + t1.instanceId);      // 1
        System.out.println("t2 ID: " + t2.instanceId);      // 2
        System.out.println("t3 ID: " + t3.instanceId);      // 3
    }
}
```

**Why:** Static = class-level (once), instance = object-level (per object).

**💡 Tip:** Use static for shared data to save memory; instance for object-specific data.

---

#### ❌ Wrong - Static Variable Initialization Order:
```java
// WRONG - Using uninitialized static
public class InitError {
    static int a = b + 1;  // Compilation error! b not yet declared
    static int b = 10;
}
```
**Issue:** Cannot use variable before it's declared in class

#### ✅ Right:
```java
// CORRECT - Declare before use
public class InitCorrect {
    static int b = 10;
    static int a = b + 1;  // OK - b already declared

    // OR use static block for complex initialization
    static int x;
    static int y;

    static {
        x = 10;
        y = x + 5;  // OK in static block
    }
}
```

**Why:** Variables must be declared before use; static blocks allow complex initialization.

**💡 Tip:** Declare static variables in dependency order; use static blocks for complex init.

---

This comprehensive list contains **40+ Packages & Static mistakes** covering all fundamental concepts!

---

## 🔗 What's Next?

Tomorrow (Day 17), we'll learn about:
- Exception handling basics
- try-catch blocks
- Multiple catch blocks
- finally block
- try-with-resources

---

## 📚 Additional Resources

- [Oracle Packages Tutorial](https://docs.oracle.com/javase/tutorial/java/package/)
- [Understanding Static in Java](https://www.geeksforgeeks.org/static-keyword-java/)
- [Java Naming Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html)