
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

### 1. Forgetting to Create Object:
```java
Student student;  // Only declaration, no object created
student.name = "Alice";  // ERROR! NullPointerException

Student student = new Student();  // CORRECT
student.name = "Alice";
```

### 2. Class Name vs Filename:
```java
// File: Student.java
public class Student { }  // CORRECT

// File: MyClass.java
public class Student { }  // ERROR! Class name must match filename
```

### 3. Accessing Non-Static Members from Static Context:
```java
public class Test {
    int x = 10;
    
    public static void main(String[] args) {
        System.out.println(x);  // ERROR! Cannot access non-static from static
        
        Test obj = new Test();
        System.out.println(obj.x);  // CORRECT
    }
}
```

### 4. Not Initializing Fields:
```java
Student student = new Student();
System.out.println(student.name);  // null (default value)
System.out.println(student.age);   // 0 (default value)

// Better: Initialize before use
student.name = "Alice";
student.age = 20;
```

### 5. Confusing Class and Object:
```java
// Wrong thinking
Student.name = "Alice";  // ERROR! Student is a class, not an object

// Correct
Student student1 = new Student();
student1.name = "Alice";  // Object has the data
```

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