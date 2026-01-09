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

## 💻 Practice Exercises

### Exercise 1: Package Organization
```java
// File: com/mycompany/models/Employee.java
package com.mycompany.models;

public class Employee {
    private String name;
    private double salary;
    
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    public String getName() { return name; }
    public double getSalary() { return salary; }
}

// File: com/mycompany/utils/SalaryCalculator.java
package com.mycompany.utils;

import com.mycompany.models.Employee;

public class SalaryCalculator {
    public static double calculateAnnual(Employee emp) {
        return emp.getSalary() * 12;
    }
    
    public static double calculateTax(Employee emp) {
        return emp.getSalary() * 0.2;
    }
}

// File: com/mycompany/main/Main.java
package com.mycompany.main;

import com.mycompany.models.Employee;
import com.mycompany.utils.SalaryCalculator;

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("John", 5000);
        System.out.println("Annual: " + SalaryCalculator.calculateAnnual(emp));
        System.out.println("Tax: " + SalaryCalculator.calculateTax(emp));
    }
}
```

### Exercise 2: Static Counter
```java
public class BankAccount {
    private static int totalAccounts = 0;
    private static double totalBalance = 0;
    
    private String accountNumber;
    private double balance;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        totalAccounts++;
        totalBalance += initialBalance;
    }
    
    public void deposit(double amount) {
        balance += amount;
        totalBalance += amount;
    }
    
    public void withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
            totalBalance -= amount;
        }
    }
    
    public static void displayStatistics() {
        System.out.println("Total Accounts: " + totalAccounts);
        System.out.println("Total Balance: $" + totalBalance);
        System.out.println("Average Balance: $" + (totalBalance / totalAccounts));
    }
    
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("ACC001", 1000);
        BankAccount acc2 = new BankAccount("ACC002", 2000);
        BankAccount acc3 = new BankAccount("ACC003", 1500);
        
        acc1.deposit(500);
        acc2.withdraw(300);
        
        BankAccount.displayStatistics();
    }
}
```

### Exercise 3: Utility Class
```java
public class StringUtils {
    // Private constructor to prevent instantiation
    private StringUtils() {
        throw new AssertionError("Utility class - do not instantiate");
    }
    
    public static boolean isPalindrome(String str) {
        str = str.toLowerCase().replaceAll("\\s+", "");
        int left = 0, right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left++) != str.charAt(right--)) {
                return false;
            }
        }
        return true;
    }
    
    public static String reverse(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    public static int countVowels(String str) {
        int count = 0;
        str = str.toLowerCase();
        for (char c : str.toCharArray()) {
            if ("aeiou".indexOf(c) != -1) {
                count++;
            }
        }
        return count;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar"));
        System.out.println(reverse("Hello"));
        System.out.println(countVowels("Education"));
    }
}
```

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