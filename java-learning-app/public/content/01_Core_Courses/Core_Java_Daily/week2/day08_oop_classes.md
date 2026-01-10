
# Day 8: Introduction to OOP & Classes

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

By the end of Day 8, you will be able to:
- Understand the four pillars of OOP
- Define and create classes in Java
- Declare instance variables (fields)
- Create and use methods
- Instantiate objects using the `new` keyword
- Access object members using the dot operator
- Understand the difference between class and object

---

## 📚 Topics Covered

### 1. OOP Concepts Overview

**Object-Oriented Programming (OOP)** is a programming paradigm based on the concept of "objects" that contain data and code.

#### Why OOP?
- **Real-world modeling**: Represents real-world entities
- **Code reusability**: Write once, use many times
- **Modularity**: Break complex problems into smaller parts
- **Maintainability**: Easier to update and modify
- **Security**: Data hiding and encapsulation

#### The Four Pillars of OOP:

**1. Encapsulation**
- Bundling data and methods together
- Hiding internal details
- Controlling access to data

**2. Inheritance**
- Creating new classes from existing ones
- Code reusability
- IS-A relationship

**3. Polymorphism**
- Same interface, different implementations
- Method overloading and overriding
- Flexibility in code

**4. Abstraction**
- Hiding implementation details
- Showing only essential features
- Focus on WHAT, not HOW

---

### 2. What is a Class?

A **class** is a blueprint or template for creating objects.

#### Class Definition:
```java
class ClassName {
    // Fields (instance variables)
    // Methods (functions)
}
```

#### Real-World Analogy:
- **Class**: Blueprint of a house
- **Object**: Actual house built from the blueprint

```
Class: Car
├── Fields: brand, model, year, color, speed
└── Methods: start(), stop(), accelerate(), brake()

Objects created from Car class:
- car1: Toyota Camry, 2023, Red
- car2: Honda Accord, 2024, Blue
- car3: Ford Mustang, 2023, Black
```

---

### 3. Class Syntax

#### Basic Class Structure:
```java
public class Student {
    // Instance variables (fields)
    String name;
    int rollNumber;
    int age;
    
    // Methods
    void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Age: " + age);
    }
}
```

#### Naming Conventions:
- **Class names**: PascalCase (first letter of each word capitalized)
  - ✅ `Student`, `BankAccount`, `CarEngine`
  - ❌ `student`, `bankAccount`, `car_engine`

---

### 4. Instance Variables (Fields)

**Instance variables** are attributes or properties of a class.

#### Characteristics:
- Declared inside the class but outside methods
- Each object has its own copy
- Default values assigned if not initialized
- Accessed using object reference

#### Example:
```java
public class Person {
    // Instance variables
    String name;        // Default: null
    int age;           // Default: 0
    double height;     // Default: 0.0
    boolean isStudent; // Default: false
}
```

#### Default Values:
| Data Type | Default Value |
|-----------|---------------|
| byte, short, int, long | 0 |
| float, double | 0.0 |
| char | '\u0000' |
| boolean | false |
| Reference types | null |

---

### 5. Methods

**Methods** define the behavior or actions of a class.

#### Method Syntax:
```java
accessModifier returnType methodName(parameters) {
    // Method body
    return value; // if returnType is not void
}
```

#### Method Components:
1. **Access Modifier**: public, private, protected, default
2. **Return Type**: Data type of returned value, or void
3. **Method Name**: camelCase naming
4. **Parameters**: Input values (optional)
5. **Method Body**: Code to execute

#### Examples:

**Void Method (No Return Value):**
```java
public class Calculator {
    void displayWelcome() {
        System.out.println("Welcome to Calculator!");
    }
}
```

**Method with Return Value:**
```java
public class Calculator {
    int add(int a, int b) {
        return a + b;
    }
    
    double calculateArea(double radius) {
        return 3.14159 * radius * radius;
    }
}
```

**Method with Multiple Parameters:**
```java
public class Rectangle {
    double length;
    double width;
    
    double calculateArea() {
        return length * width;
    }
    
    double calculatePerimeter() {
        return 2 * (length + width);
    }
    
    void setDimensions(double l, double w) {
        length = l;
        width = w;
    }
}
```

---

### 6. Creating Objects

Objects are **instances** of a class created using the `new` keyword.

#### Syntax:
```java
ClassName objectName = new ClassName();
```

#### Example:
```java
public class Main {
    public static void main(String[] args) {
        // Creating objects
        Student student1 = new Student();
        Student student2 = new Student();
        Student student3 = new Student();
    }
}
```

#### What Happens When Creating an Object?
1. **Memory Allocation**: Space allocated in heap memory
2. **Constructor Call**: Default constructor is called
3. **Reference Assignment**: Reference variable points to object
4. **Initialization**: Fields get default values

#### Memory Representation:
```
Stack Memory:          Heap Memory:
┌──────────────┐      ┌─────────────────┐
│ student1  ───┼─────>│ Student Object  │
└──────────────┘      │ name: null      │
                      │ rollNo: 0       │
                      │ age: 0          │
                      └─────────────────┘
```

---

### 7. Accessing Members

Use the **dot operator (.)** to access fields and methods.

#### Syntax:
```java
objectName.fieldName       // Access field
objectName.methodName()    // Call method
```

#### Complete Example:
```java
public class Student {
    // Fields
    String name;
    int rollNumber;
    int age;
    
    // Method
    void displayInfo() {
        System.out.println("=== Student Information ===");
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Age: " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        // Create object
        Student student1 = new Student();
        
        // Set field values
        student1.name = "Alice";
        student1.rollNumber = 101;
        student1.age = 20;
        
        // Call method
        student1.displayInfo();
        
        // Access fields
        System.out.println("\nDirect access:");
        System.out.println("Name: " + student1.name);
    }
}
```

**Output:**
```
=== Student Information ===
Name: Alice
Roll Number: 101
Age: 20

Direct access:
Name: Alice
```

---

### 8. Multiple Objects

Each object has its **own copy** of instance variables.

#### Example:
```java
public class Car {
    String brand;
    String model;
    int year;
    String color;
    
    void displayInfo() {
        System.out.println(year + " " + brand + " " + model + " (" + color + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        // Create multiple objects
        Car car1 = new Car();
        car1.brand = "Toyota";
        car1.model = "Camry";
        car1.year = 2023;
        car1.color = "Red";
        
        Car car2 = new Car();
        car2.brand = "Honda";
        car2.model = "Accord";
        car2.year = 2024;
        car2.color = "Blue";
        
        Car car3 = new Car();
        car3.brand = "Ford";
        car3.model = "Mustang";
        car3.year = 2023;
        car3.color = "Black";
        
        // Each object has its own data
        car1.displayInfo();  // 2023 Toyota Camry (Red)
        car2.displayInfo();  // 2024 Honda Accord (Blue)
        car3.displayInfo();  // 2023 Ford Mustang (Black)
    }
}
```

#### Key Points:
- Each object has **independent** field values
- Methods are **shared** among all objects
- Changing one object doesn't affect others

---

## 💻 Practical Exercises

### Exercise 1: Create Car Class
Create a Car class with properties and methods.

```java
public class Car {
    // Fields
    String brand;
    String model;
    int year;
    String color;
    int speed;
    
    // Method to start car
    void start() {
        System.out.println(brand + " " + model + " is starting...");
        speed = 0;
    }
    
    // Method to accelerate
    void accelerate(int increment) {
        speed += increment;
        System.out.println("Speed increased to " + speed + " km/h");
    }
    
    // Method to brake
    void brake(int decrement) {
        speed -= decrement;
        if (speed < 0) speed = 0;
        System.out.println("Speed decreased to " + speed + " km/h");
    }
    
    // Method to display info
    void displayInfo() {
        System.out.println("\n=== Car Information ===");
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Color: " + color);
        System.out.println("Current Speed: " + speed + " km/h");
    }
}

public class TestCar {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.brand = "Toyota";
        myCar.model = "Camry";
        myCar.year = 2023;
        myCar.color = "Red";
        
        myCar.start();
        myCar.accelerate(50);
        myCar.accelerate(30);
        myCar.brake(20);
        myCar.displayInfo();
    }
}
```

---

### Exercise 2: Create Student Class
Create a Student class with grades calculation.

```java
public class Student {
    String name;
    int rollNumber;
    int mathMarks;
    int scienceMarks;
    int englishMarks;
    
    void inputDetails(String n, int roll, int math, int science, int english) {
        name = n;
        rollNumber = roll;
        mathMarks = math;
        scienceMarks = science;
        englishMarks = english;
    }
    
    int calculateTotal() {
        return mathMarks + scienceMarks + englishMarks;
    }
    
    double calculatePercentage() {
        return (calculateTotal() / 3.0);
    }
    
    String getGrade() {
        double percentage = calculatePercentage();
        if (percentage >= 90) return "A+";
        else if (percentage >= 80) return "A";
        else if (percentage >= 70) return "B";
        else if (percentage >= 60) return "C";
        else return "F";
    }
    
    void displayReport() {
        System.out.println("\n=== Student Report Card ===");
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Math: " + mathMarks);
        System.out.println("Science: " + scienceMarks);
        System.out.println("English: " + englishMarks);
        System.out.println("Total: " + calculateTotal() + "/300");
        System.out.println("Percentage: " + String.format("%.2f", calculatePercentage()) + "%");
        System.out.println("Grade: " + getGrade());
    }
}

public class TestStudent {
    public static void main(String[] args) {
        Student student1 = new Student();
        student1.inputDetails("Alice", 101, 85, 90, 88);
        student1.displayReport();
        
        Student student2 = new Student();
        student2.inputDetails("Bob", 102, 75, 80, 78);
        student2.displayReport();
    }
}
```

---

### Exercise 3: Create BankAccount Class
Create a BankAccount class with deposit and withdrawal.

```java
public class BankAccount {
    String accountNumber;
    String accountHolder;
    double balance;
    
    void createAccount(String accNum, String holder, double initialBalance) {
        accountNumber = accNum;
        accountHolder = holder;
        balance = initialBalance;
        System.out.println("Account created successfully!");
    }
    
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
            System.out.println("New Balance: $" + balance);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
    
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            System.out.println("New Balance: $" + balance);
        } else if (amount > balance) {
            System.out.println("Insufficient funds!");
        } else {
            System.out.println("Invalid withdrawal amount!");
        }
    }
    
    void checkBalance() {
        System.out.println("Current Balance: $" + balance);
    }
    
    void displayAccountInfo() {
        System.out.println("\n=== Account Information ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
    }
}

public class TestBankAccount {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.createAccount("ACC001", "John Doe", 1000.0);
        
        account.displayAccountInfo();
        account.deposit(500);
        account.withdraw(200);
        account.withdraw(2000);  // Insufficient funds
        account.checkBalance();
    }
}
```

---

### Exercise 4: Create Book Class
Create a Book class for a library system.

```java
public class Book {
    String title;
    String author;
    String isbn;
    double price;
    int pages;
    boolean isAvailable;
    
    void setBookDetails(String t, String a, String i, double p, int pg) {
        title = t;
        author = a;
        isbn = i;
        price = p;
        pages = pg;
        isAvailable = true;
    }
    
    void borrowBook() {
        if (isAvailable) {
            isAvailable = false;
            System.out.println("Book '" + title + "' has been borrowed.");
        } else {
            System.out.println("Book '" + title + "' is not available.");
        }
    }
    
    void returnBook() {
        isAvailable = true;
        System.out.println("Book '" + title + "' has been returned.");
    }
    
    void displayBookInfo() {
        System.out.println("\n=== Book Information ===");
        System.out.println("Title: " + title);
        System.out.println("Author: " + author);
        System.out.println("ISBN: " + isbn);
        System.out.println("Price: $" + price);
        System.out.println("Pages: " + pages);
        System.out.println("Status: " + (isAvailable ? "Available" : "Borrowed"));
    }
}

public class TestBook {
    public static void main(String[] args) {
        Book book1 = new Book();
        book1.setBookDetails("Java Programming", "James Gosling", 
                            "978-0134685991", 45.99, 500);
        
        book1.displayBookInfo();
        book1.borrowBook();
        book1.displayBookInfo();
        book1.returnBook();
        book1.displayBookInfo();
    }
}
```

---

### Exercise 5: Create Rectangle Class
Create a Rectangle class with area and perimeter calculations.

```java
public class Rectangle {
    double length;
    double width;
    
    void setDimensions(double l, double w) {
        length = l;
        width = w;
    }
    
    double calculateArea() {
        return length * width;
    }
    
    double calculatePerimeter() {
        return 2 * (length + width);
    }
    
    boolean isSquare() {
        return length == width;
    }
    
    void displayInfo() {
        System.out.println("\n=== Rectangle Information ===");
        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
        System.out.println("Area: " + calculateArea());
        System.out.println("Perimeter: " + calculatePerimeter());
        System.out.println("Is Square: " + (isSquare() ? "Yes" : "No"));
    }
}

public class TestRectangle {
    public static void main(String[] args) {
        Rectangle rect1 = new Rectangle();
        rect1.setDimensions(10, 5);
        rect1.displayInfo();
        
        Rectangle rect2 = new Rectangle();
        rect2.setDimensions(7, 7);
        rect2.displayInfo();
    }
}
```

---

### Exercise 6: Create Employee Class
Create an Employee class with salary calculations.

```java
public class Employee {
    String name;
    int employeeId;
    String department;
    double baseSalary;
    double bonus;
    
    void setEmployeeDetails(String n, int id, String dept, double salary) {
        name = n;
        employeeId = id;
        department = dept;
        baseSalary = salary;
        bonus = 0;
    }
    
    void giveBonus(double bonusAmount) {
        bonus = bonusAmount;
        System.out.println("Bonus of $" + bonusAmount + " given to " + name);
    }
    
    double calculateTotalSalary() {
        return baseSalary + bonus;
    }
    
    void displayEmployeeInfo() {
        System.out.println("\n=== Employee Information ===");
        System.out.println("Name: " + name);
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Department: " + department);
        System.out.println("Base Salary: $" + baseSalary);
        System.out.println("Bonus: $" + bonus);
        System.out.println("Total Salary: $" + calculateTotalSalary());
    }
}

public class TestEmployee {
    public static void main(String[] args) {
        Employee emp1 = new Employee();
        emp1.setEmployeeDetails("Alice Johnson", 1001, "IT", 50000);
        emp1.giveBonus(5000);
        emp1.displayEmployeeInfo();
        
        Employee emp2 = new Employee();
        emp2.setEmployeeDetails("Bob Smith", 1002, "HR", 45000);
        emp2.giveBonus(3000);
        emp2.displayEmployeeInfo();
    }
}
```

---

### Exercise 7: Create Circle Class
Create a Circle class with geometric calculations.

```java
public class Circle {
    double radius;
    final double PI = 3.14159;
    
    void setRadius(double r) {
        radius = r;
    }
    
    double calculateArea() {
        return PI * radius * radius;
    }
    
    double calculateCircumference() {
        return 2 * PI * radius;
    }
    
    double calculateDiameter() {
        return 2 * radius;
    }
    
    void displayInfo() {
        System.out.println("\n=== Circle Information ===");
        System.out.println("Radius: " + radius);
        System.out.println("Diameter: " + calculateDiameter());
        System.out.println("Area: " + String.format("%.2f", calculateArea()));
        System.out.println("Circumference: " + String.format("%.2f", calculateCircumference()));
    }
}

public class TestCircle {
    public static void main(String[] args) {
        Circle circle1 = new Circle();
        circle1.setRadius(5.0);
        circle1.displayInfo();
        
        Circle circle2 = new Circle();
        circle2.setRadius(10.0);
        circle2.displayInfo();
    }
}
```

---

### Exercise 8: Create Product Class
Create a Product class for inventory management.

```java
public class Product {
    String productId;
    String productName;
    double price;
    int quantity;
    String category;
    
    void addProduct(String id, String name, double p, int qty, String cat) {
        productId = id;
        productName = name;
        price = p;
        quantity = qty;
        category = cat;
    }
    
    void updateStock(int qty) {
        quantity += qty;
        System.out.println("Stock updated. New quantity: " + quantity);
    }
    
    void sellProduct(int qty) {
        if (qty <= quantity) {
            quantity -= qty;
            double totalPrice = qty * price;
            System.out.println("Sold " + qty + " units");
            System.out.println("Total: $" + totalPrice);
            System.out.println("Remaining stock: " + quantity);
        } else {
            System.out.println("Insufficient stock!");
        }
    }
    
    double calculateInventoryValue() {
        return price * quantity;
    }
    
    void displayProductInfo() {
        System.out.println("\n=== Product Information ===");
        System.out.println("Product ID: " + productId);
        System.out.println("Name: " + productName);
        System.out.println("Price: $" + price);
        System.out.println("Quantity: " + quantity);
        System.out.println("Category: " + category);
        System.out.println("Inventory Value: $" + calculateInventoryValue());
    }
}

public class TestProduct {
    public static void main(String[] args) {
        Product product = new Product();
        product.addProduct("P001", "Laptop", 999.99, 50, "Electronics");
        
        product.displayProductInfo();
        product.sellProduct(5);
        product.updateStock(10);
        product.displayProductInfo();
    }
}
```

---

### Exercise 9: Create Temperature Class
Create a Temperature class with conversion methods.

```java
public class Temperature {
    double celsius;
    
    void setCelsius(double c) {
        celsius = c;
    }
    
    double toFahrenheit() {
        return (celsius * 9.0 / 5.0) + 32;
    }
    
    double toKelvin() {
        return celsius + 273.15;
    }
    
    void displayAllFormats() {
        System.out.println("\n=== Temperature Conversions ===");
        System.out.println("Celsius: " + celsius + "°C");
        System.out.println("Fahrenheit: " + String.format("%.2f", toFahrenheit()) + "°F");
        System.out.println("Kelvin: " + String.format("%.2f", toKelvin()) + "K");
    }
}

public class TestTemperature {
    public static void main(String[] args) {
        Temperature temp1 = new Temperature();
        temp1.setCelsius(25);
        temp1.displayAllFormats();
        
        Temperature temp2 = new Temperature();
        temp2.setCelsius(0);
        temp2.displayAllFormats();
        
        Temperature temp3 = new Temperature();
        temp3.setCelsius(100);
        temp3.displayAllFormats();
    }
}
```

---

### Exercise 10: Create Time Class
Create a Time class to represent and manipulate time.

```java
public class Time {
    int hours;
    int minutes;
    int seconds;
    
    void setTime(int h, int m, int s) {
        hours = h;
        minutes = m;
        seconds = s;
        normalize();
    }
    
    void normalize() {
        if (seconds >= 60) {
            minutes += seconds / 60;
            seconds = seconds % 60;
        }
        if (minutes >= 60) {
            hours += minutes / 60;
            minutes = minutes % 60;
        }
        if (hours >= 24) {
            hours = hours % 24;
        }
    }
    
    void addSeconds(int s) {
        seconds += s;
        normalize();
    }
    
    void addMinutes(int m) {
        minutes += m;
        normalize();
    }
    
    void addHours(int h) {
        hours += h;
        normalize();
    }
    
    int toSeconds() {
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    void displayTime() {
        System.out.printf("%02d:%02d:%02d\n", hours, minutes, seconds);
    }
    
    void displayTimeWithLabel() {
        System.out.println("\n=== Current Time ===");
        System.out.printf("Time: %02d:%02d:%02d\n", hours, minutes, seconds);
        System.out.println("Total seconds: " + toSeconds());
    }
}

public class TestTime {
    public static void main(String[] args) {
        Time time1 = new Time();
        time1.setTime(10, 30, 45);
        time1.displayTimeWithLabel();
        
        time1.addSeconds(30);
        System.out.println("\nAfter adding 30 seconds:");
        time1.displayTime();
        
        time1.addMinutes(45);
        System.out.println("After adding 45 minutes:");
        time1.displayTime();
        
        time1.addHours(5);
        System.out.println("After adding 5 hours:");
        time1.displayTime();
    }
}
```

---

## 🔑 Key Takeaways

1. **OOP Four Pillars**: Encapsulation, Inheritance, Polymorphism, Abstraction
2. **Class**: Blueprint/template for creating objects
3. **Object**: Instance of a class created with `new` keyword
4. **Instance Variables**: Fields that belong to each object
5. **Methods**: Define behavior of objects
6. **Dot Operator**: Used to access members (fields and methods)
7. **Multiple Objects**: Each has independent field values
8. **Naming Conventions**: 
   - Classes: PascalCase
   - Methods/Fields: camelCase
9. **Default Values**: Fields get default values if not initialized
10. **Memory**: Objects stored in heap, references in stack

---

## ⚠️ Common Mistakes

### 1. Class Definition and Structure Issues

#### ❌ Wrong - Missing 'new' Keyword When Creating Object:
```java
// WRONG
Student student;  // Only declaration, no object created
student.name = "Alice";  // NullPointerException!
```
**Issue:** Variable declared but no object instantiated; reference is null

#### ✅ Right:
```java
// CORRECT
Student student = new Student();  // Object created in heap
student.name = "Alice";  // Now safe to access
```

**Why:** Object declaration creates a reference variable; must use `new` to actually create the object in heap memory.

**💡 Tip:** Always initialize object references with `new` before accessing members.

---

#### ❌ Wrong - Class Name Doesn't Match Filename:
```java
// File: Student.java
public class Person { }  // Compilation error!
```
**Issue:** Public class name must exactly match the filename

#### ✅ Right:
```java
// File: Student.java
public class Student { }  // Correct: matches filename

// OR for non-public classes:
// File: MyClasses.java
class Student { }  // OK: non-public class
class Teacher { }  // OK: non-public class
```

**Why:** Java requires public class name to match filename for proper compilation and class loading.

**💡 Tip:** Filename must be `ClassName.java` where ClassName is the public class name.

---

#### ❌ Wrong - Multiple Public Classes in One File:
```java
// File: Test.java
// WRONG
public class Student { }
public class Teacher { }  // Compilation error!
```
**Issue:** Only one public class allowed per file

#### ✅ Right:
```java
// File: Student.java
// CORRECT - Method 1: One public class per file
public class Student { }

// File: Teacher.java
public class Teacher { }

// OR Method 2: One public, rest non-public
// File: Student.java
public class Student { }
class Teacher { }  // Non-public, OK in same file
```

**Why:** Java's file organization requires one public class per file for clarity and proper class loading.

**💡 Tip:** Create separate files for public classes; non-public helper classes can share a file.

---

#### ❌ Wrong - Wrong Class Naming Convention:
```java
// WRONG - Not following PascalCase
public class student { }       // Starts with lowercase
public class bank_account { }  // Uses underscores
public class EMPLOYEE { }      // All uppercase
```
**Issue:** Class names should use PascalCase convention

#### ✅ Right:
```java
// CORRECT - PascalCase
public class Student { }
public class BankAccount { }
public class Employee { }
public class CarEngine { }
```

**Why:** Java naming conventions improve code readability and follow industry standards.

**💡 Tip:** Classes: PascalCase, methods/variables: camelCase, constants: UPPER_CASE.

---

#### ❌ Wrong - Missing Class Body Braces:
```java
// WRONG
public class Student;  // Compilation error!
```
**Issue:** Class must have a body enclosed in braces, even if empty

#### ✅ Right:
```java
// CORRECT
public class Student { }  // Empty class is valid

// OR with members
public class Student {
    String name;
    int age;
}
```

**Why:** Class syntax requires braces to define the class body.

**💡 Tip:** Every class needs `{ }` even if it's empty.

---

### 2. Object Creation and Instantiation Mistakes

#### ❌ Wrong - Trying to Use Class Name as Object:
```java
// WRONG
public class Student {
    String name;
}

Student.name = "Alice";  // Compilation error!
```
**Issue:** Trying to access instance members through class name

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;
}

Student student = new Student();
student.name = "Alice";  // Access through object reference
```

**Why:** Instance variables belong to objects, not the class itself.

**💡 Tip:** Create an object first, then access its members through the reference variable.

---

#### ❌ Wrong - Assigning One Object Reference to Another Without Understanding:
```java
// WRONG (conceptual mistake)
Student student1 = new Student();
student1.name = "Alice";

Student student2 = student1;  // Both point to same object!
student2.name = "Bob";

System.out.println(student1.name);  // Prints "Bob", not "Alice"!
```
**Issue:** Assignment copies reference, not the object; both variables point to same object

#### ✅ Right:
```java
// CORRECT - Create separate objects
Student student1 = new Student();
student1.name = "Alice";

Student student2 = new Student();  // New object
student2.name = "Bob";

System.out.println(student1.name);  // Prints "Alice"
System.out.println(student2.name);  // Prints "Bob"
```

**Why:** Reference assignment creates an alias, not a copy of the object.

**💡 Tip:** Each `new` creates a separate object in memory; assignment copies references.

---

#### ❌ Wrong - Creating Array of Objects Without Initializing Elements:
```java
// WRONG
Student[] students = new Student[3];  // Array created
students[0].name = "Alice";  // NullPointerException!
```
**Issue:** Array of objects only creates array; each element is null

#### ✅ Right:
```java
// CORRECT
Student[] students = new Student[3];  // Array created
students[0] = new Student();  // Create object
students[0].name = "Alice";   // Now safe

// OR initialize all elements
for (int i = 0; i < students.length; i++) {
    students[i] = new Student();
}
```

**Why:** Array allocation doesn't create the objects, only creates space for references.

**💡 Tip:** After creating object array, initialize each element with `new`.

---

#### ❌ Wrong - Not Checking for Null Before Access:
```java
// WRONG
Student student = null;
System.out.println(student.name);  // NullPointerException!
```
**Issue:** Accessing member on null reference

#### ✅ Right:
```java
// CORRECT
Student student = null;

if (student != null) {
    System.out.println(student.name);
} else {
    System.out.println("Student is null");
}
```

**Why:** Null references don't point to any object; accessing members causes runtime error.

**💡 Tip:** Always check for null before accessing object members.

---

### 3. Instance Variable (Field) Mistakes

#### ❌ Wrong - Declaring Variables Inside Methods as Instance Variables:
```java
// WRONG
public class Student {
    void setName() {
        String name;  // Local variable, not instance variable!
    }

    void displayName() {
        System.out.println(name);  // Compilation error! name not found
    }
}
```
**Issue:** Variable declared inside method is local, not accessible elsewhere

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;  // Instance variable (field)

    void setName(String n) {
        name = n;  // Accessible throughout class
    }

    void displayName() {
        System.out.println(name);  // Works!
    }
}
```

**Why:** Instance variables declared at class level; local variables exist only within their method.

**💡 Tip:** Declare fields at class level (outside methods) for class-wide access.

---

#### ❌ Wrong - Using Uninitialized Instance Variables in Calculations:
```java
// WRONG (logic error)
public class Calculator {
    int result;  // Default: 0

    void add(int a, int b) {
        result = result + a + b;  // First call: 0 + a + b
    }
}

Calculator calc = new Calculator();
calc.add(5, 10);  // result = 15
calc.add(3, 7);   // result = 25 (includes previous 15)
```
**Issue:** Not resetting or aware result accumulates across method calls

#### ✅ Right:
```java
// CORRECT - Be explicit about accumulation
public class Calculator {
    int result;

    void add(int a, int b) {
        result = a + b;  // Replace, don't accumulate
    }

    // OR if accumulation intended:
    void addToResult(int value) {
        result += value;  // Clear that we're accumulating
    }
}
```

**Why:** Instance variables retain values between method calls; be intentional about accumulation.

**💡 Tip:** Reset instance variables when needed; make accumulation explicit.

---

#### ❌ Wrong - Shadowing Instance Variables with Parameters:
```java
// WRONG (confusing)
public class Student {
    String name;
    int age;

    void setDetails(String name, int age) {
        name = name;  // Assigns parameter to itself!
        age = age;    // Doesn't update instance variable!
    }
}
```
**Issue:** Parameter names shadow instance variables; assignment does nothing

#### ✅ Right:
```java
// CORRECT - Method 1: Use 'this' keyword
public class Student {
    String name;
    int age;

    void setDetails(String name, int age) {
        this.name = name;  // 'this' refers to instance variable
        this.age = age;
    }
}

// CORRECT - Method 2: Different parameter names
public class Student {
    String name;
    int age;

    void setDetails(String n, int a) {
        name = n;
        age = a;
    }
}
```

**Why:** When parameter and field have same name, parameter takes precedence; use `this` to access field.

**💡 Tip:** Use `this.fieldName` when parameter shadows instance variable.

---

#### ❌ Wrong - Wrong Field Naming Convention:
```java
// WRONG
public class Student {
    String Name;           // PascalCase (wrong for fields)
    int roll_number;       // snake_case (wrong)
    String STUDENT_ID;     // UPPER_CASE (for constants only)
}
```
**Issue:** Fields should use camelCase, not other conventions

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;           // camelCase
    int rollNumber;        // camelCase
    String studentId;      // camelCase
    final int MAX_AGE = 150;  // UPPER_CASE for constants
}
```

**Why:** Java conventions use camelCase for fields and methods; UPPER_CASE for constants.

**💡 Tip:** Fields: camelCase, Constants: UPPER_CASE with final keyword.

---

### 4. Method-Related Mistakes

#### ❌ Wrong - Missing Return Statement:
```java
// WRONG
public class Calculator {
    int add(int a, int b) {
        int sum = a + b;
        // Missing return statement! Compilation error!
    }
}
```
**Issue:** Method with non-void return type must return a value

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    int add(int a, int b) {
        int sum = a + b;
        return sum;  // Must return int value
    }

    // OR directly
    int multiply(int a, int b) {
        return a * b;
    }
}
```

**Why:** Non-void methods must return a value matching the declared return type.

**💡 Tip:** Every code path in a non-void method must have a return statement.

---

#### ❌ Wrong - Returning Value from Void Method:
```java
// WRONG
public class Display {
    void showMessage() {
        return "Hello";  // Compilation error! void can't return value
    }
}
```
**Issue:** Void methods cannot return values

#### ✅ Right:
```java
// CORRECT - Method 1: Change to String return type
public class Display {
    String getMessage() {
        return "Hello";
    }
}

// CORRECT - Method 2: Keep void, just print
public class Display {
    void showMessage() {
        System.out.println("Hello");
        return;  // Optional; void methods can have empty return
    }
}
```

**Why:** void means no return value; change return type if you need to return data.

**💡 Tip:** Use void for methods that perform actions without returning data.

---

#### ❌ Wrong - Wrong Return Type:
```java
// WRONG
public class Calculator {
    int divide(int a, int b) {
        return a / b;  // Integer division loses decimal!
    }
}

Calculator calc = new Calculator();
System.out.println(calc.divide(10, 3));  // Prints 3, not 3.333...
```
**Issue:** int return type causes truncation; decimal part lost

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    double divide(int a, int b) {
        return (double) a / b;  // Cast to double for decimal result
    }
}

Calculator calc = new Calculator();
System.out.println(calc.divide(10, 3));  // Prints 3.333...
```

**Why:** Choose return type based on expected result; use double for decimal values.

**💡 Tip:** Use double for division when you need decimal precision.

---

#### ❌ Wrong - Calling Method Without Object (Non-Static):
```java
// WRONG
public class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        int result = Calculator.add(5, 10);  // Compilation error!
    }
}
```
**Issue:** Non-static methods require an object to be called

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();  // Create object
        int result = calc.add(5, 10);  // Call through object
        System.out.println(result);
    }
}
```

**Why:** Non-static methods belong to objects; must create object first.

**💡 Tip:** Instance methods require object; static methods can be called on class.

---

#### ❌ Wrong - Method Name Not Following camelCase:
```java
// WRONG
public class Student {
    void DisplayInfo() { }      // PascalCase (wrong)
    void display_info() { }     // snake_case (wrong)
    void DISPLAYINFO() { }      // All uppercase (wrong)
}
```
**Issue:** Method names should follow camelCase convention

#### ✅ Right:
```java
// CORRECT
public class Student {
    void displayInfo() { }      // camelCase
    void calculateGrade() { }   // camelCase
    void setStudentName() { }   // camelCase
}
```

**Why:** Java conventions use camelCase for method names.

**💡 Tip:** Methods start with lowercase, capitalize each subsequent word.

---

### 5. Static vs Non-Static Confusion

#### ❌ Wrong - Accessing Instance Members from Static Context:
```java
// WRONG
public class Test {
    int instanceVar = 10;

    public static void main(String[] args) {
        System.out.println(instanceVar);  // Compilation error!
    }
}
```
**Issue:** Static methods can't directly access instance members

#### ✅ Right:
```java
// CORRECT
public class Test {
    int instanceVar = 10;

    public static void main(String[] args) {
        Test obj = new Test();  // Create object
        System.out.println(obj.instanceVar);  // Access through object
    }
}
```

**Why:** Static methods belong to class; instance members belong to objects.

**💡 Tip:** Create object to access instance members from static context.

---

#### ❌ Wrong - Calling Instance Method from Static Method:
```java
// WRONG
public class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = add(5, 10);  // Compilation error!
    }
}
```
**Issue:** Can't call instance method without object from static context

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int result = calc.add(5, 10);  // Call through object
        System.out.println(result);
    }
}
```

**Why:** Instance methods need an object; static methods don't have implicit object reference.

**💡 Tip:** From static context, create object first to call instance methods.

---

### 6. Dot Operator and Access Issues

#### ❌ Wrong - Forgetting Dot Operator:
```java
// WRONG
Student student = new Student();
student name = "Alice";  // Syntax error!
```
**Issue:** Missing dot operator to access member

#### ✅ Right:
```java
// CORRECT
Student student = new Student();
student.name = "Alice";  // Dot operator required
```

**Why:** Dot operator (.) is required to access object members.

**💡 Tip:** Syntax is `objectName.memberName` with the dot.

---

#### ❌ Wrong - Chaining Dots Incorrectly:
```java
// WRONG
public class Address {
    String city;
}

public class Student {
    Address address;  // Not initialized!
    String name;
}

Student student = new Student();
student.address.city = "New York";  // NullPointerException!
```
**Issue:** Intermediate reference (address) is null

#### ✅ Right:
```java
// CORRECT
public class Address {
    String city;
}

public class Student {
    Address address;
    String name;
}

Student student = new Student();
student.address = new Address();  // Initialize first
student.address.city = "New York";  // Now safe
```

**Why:** Must initialize all references in the chain before accessing nested members.

**💡 Tip:** Initialize reference fields before accessing their members.

---

### 7. Parameter and Argument Mistakes

#### ❌ Wrong - Wrong Number of Arguments:
```java
// WRONG
public class Rectangle {
    void setDimensions(double length, double width) {
        // ...
    }
}

Rectangle rect = new Rectangle();
rect.setDimensions(10.5);  // Compilation error! Missing argument
```
**Issue:** Method expects 2 arguments, only 1 provided

#### ✅ Right:
```java
// CORRECT
public class Rectangle {
    void setDimensions(double length, double width) {
        // ...
    }
}

Rectangle rect = new Rectangle();
rect.setDimensions(10.5, 5.0);  // Both arguments provided
```

**Why:** Must provide exact number of arguments matching method signature.

**💡 Tip:** Check method signature for required parameters and their types.

---

#### ❌ Wrong - Wrong Argument Type:
```java
// WRONG
public class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
int result = calc.add("5", "10");  // Compilation error! Strings not ints
```
**Issue:** Passing String arguments to int parameters

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
int result = calc.add(5, 10);  // Correct types
```

**Why:** Argument types must match parameter types (or be compatible).

**💡 Tip:** Ensure argument types match method parameter types.

---

### 8. Default Values Misunderstanding

#### ❌ Wrong - Assuming Non-Default Values:
```java
// WRONG (logic error)
public class Counter {
    int count;  // Default: 0

    void increment() {
        count++;
    }
}

Counter counter = new Counter();
if (counter.count == 1) {  // False! count is 0, not 1
    System.out.println("One");
}
```
**Issue:** Assuming count starts at 1; actually starts at 0 (default)

#### ✅ Right:
```java
// CORRECT - Be aware of default values
public class Counter {
    int count = 1;  // Explicitly initialize if not 0

    void increment() {
        count++;
    }
}

// OR check the actual default
Counter counter = new Counter();
if (counter.count == 0) {  // Correct! Default is 0
    System.out.println("Zero");
}
```

**Why:** Numeric fields default to 0; explicitly initialize if different value needed.

**💡 Tip:** Know default values: numbers=0, boolean=false, references=null.

---

#### ❌ Wrong - Using Reference Type Defaults Without Initialization:
```java
// WRONG
public class Student {
    String name;  // Default: null

    void printLength() {
        System.out.println(name.length());  // NullPointerException!
    }
}

Student student = new Student();
student.printLength();  // Crashes!
```
**Issue:** String field is null by default; calling methods on null causes error

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name = "";  // Initialize to empty string

    void printLength() {
        System.out.println(name.length());  // Works! Prints 0
    }
}

// OR check for null
public class Student {
    String name;

    void printLength() {
        if (name != null) {
            System.out.println(name.length());
        } else {
            System.out.println("Name not set");
        }
    }
}
```

**Why:** Reference types default to null; initialize or check before use.

**💡 Tip:** Initialize String fields to "" or check for null before operations.

---

### 9. Memory and Reference Confusion

#### ❌ Wrong - Comparing Objects with ==:
```java
// WRONG (logic error)
Student student1 = new Student();
student1.name = "Alice";

Student student2 = new Student();
student2.name = "Alice";

if (student1 == student2) {  // False! Different objects
    System.out.println("Same");
}
```
**Issue:** == compares references, not object contents

#### ✅ Right:
```java
// CORRECT - Compare field values
Student student1 = new Student();
student1.name = "Alice";

Student student2 = new Student();
student2.name = "Alice";

if (student1.name.equals(student2.name)) {  // True! Same names
    System.out.println("Same name");
}

// For complete object comparison, override equals() (Day 12)
```

**Why:** == checks if references point to same object, not if contents are equal.

**💡 Tip:** Use == for reference equality; compare fields or use equals() for content equality.

---

#### ❌ Wrong - Modifying Shared Reference Unknowingly:
```java
// WRONG (logic error)
Student original = new Student();
original.name = "Alice";
original.age = 20;

Student copy = original;  // Both point to same object!
copy.age = 25;  // Modifies the only object

System.out.println(original.age);  // Prints 25, not 20!
```
**Issue:** Assignment copies reference; both variables point to same object

#### ✅ Right:
```java
// CORRECT - Create separate object
Student original = new Student();
original.name = "Alice";
original.age = 20;

Student copy = new Student();  // New object
copy.name = original.name;
copy.age = 25;

System.out.println(original.age);  // Prints 20
System.out.println(copy.age);      // Prints 25
```

**Why:** Reference assignment creates alias; to copy, must create new object.

**💡 Tip:** Use `new` to create independent copy; assignment only copies reference.

---

### 10. Scope and Visibility Issues

#### ❌ Wrong - Accessing Local Variable from Another Method:
```java
// WRONG
public class Test {
    void method1() {
        int x = 10;
    }

    void method2() {
        System.out.println(x);  // Compilation error! x not in scope
    }
}
```
**Issue:** Local variables exist only within their method

#### ✅ Right:
```java
// CORRECT - Use instance variable
public class Test {
    int x;  // Instance variable

    void method1() {
        x = 10;  // Set instance variable
    }

    void method2() {
        System.out.println(x);  // Access instance variable
    }
}
```

**Why:** Local variables have method scope; instance variables have class scope.

**💡 Tip:** Use instance variables for data shared across methods.

---

This comprehensive list now contains **35+ OOP and Class mistakes** covering all fundamental concepts!

---

## 🧭 Navigation

### Week 2 Progress:
- **Day 8: Introduction to OOP & Classes** ← You are here
- [Day 9: Constructors & this Keyword →](day09_constructors_this.md)
- [Day 10: Methods & Method Overloading](day10_methods_overloading.md)
- [Day 11: Encapsulation & Access Modifiers](day11_encapsulation_access.md)
- [Day 12: Inheritance](day12_inheritance.md)
- [Day 13: Polymorphism](day13_polymorphism.md)
- [Day 14: Abstraction - Abstract Classes & Interfaces](day14_abstraction.md)

### Related Resources:
- [📝 Day 8 Assessment](../../../java-learning-app/src/data/assessments/java/week2/day8.js)
- [💪 Week 2 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Core_Java/Week2_Days08-14_OOP_Fundamentals.md)
- [📚 Detailed Topics Reference](../../../02_Detailed_Topics/Detailed_Topics_Core_Java.md#day-8-introduction-to-oop--classes)
- [🏠 Back to Week 2 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)
- [← Week 1: Java Basics](../week1/README.md)

---

## ✅ Day 8 Checklist

Before moving to Day 9, ensure you can:
- [ ] Explain the four pillars of OOP
- [ ] Define a class with fields and methods
- [ ] Create objects using the new keyword
- [ ] Access object members using dot operator
- [ ] Understand the difference between class and object
- [ ] Create multiple independent objects
- [ ] Write methods with and without return values
- [ ] Use proper naming conventions
- [ ] Understand default values for fields
- [ ] Complete all 10 practical exercises

---

**🎉 Congratulations on completing Day 8!**

You've taken your first step into Object-Oriented Programming! You now understand classes, objects, and how to model