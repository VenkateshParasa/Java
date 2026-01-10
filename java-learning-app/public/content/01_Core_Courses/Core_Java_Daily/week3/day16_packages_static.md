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