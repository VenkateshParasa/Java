
# Day 9: Constructors & this Keyword

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

By the end of Day 9, you will be able to:
- Understand what constructors are and why they're needed
- Create and use default constructors
- Write parameterized constructors
- Implement constructor overloading
- Use the `this` keyword effectively
- Implement constructor chaining
- Initialize objects properly

---

## 📚 Topics Covered

### 1. What are Constructors?

A **constructor** is a special method used to initialize objects when they are created.

#### Characteristics:
- **Same name as class**: Constructor name must match class name exactly
- **No return type**: Not even void
- **Called automatically**: Invoked when object is created with `new`
- **Purpose**: Initialize instance variables

#### Syntax:
```java
class ClassName {
    // Constructor
    ClassName() {
        // Initialization code
    }
}
```

#### Example:
```java
public class Student {
    String name;
    int rollNumber;
    
    // Constructor
    Student() {
        name = "Unknown";
        rollNumber = 0;
        System.out.println("Student object created!");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();  // Constructor called automatically
        System.out.println("Name: " + s1.name);
        System.out.println("Roll Number: " + s1.rollNumber);
    }
}
```

**Output:**
```
Student object created!
Name: Unknown
Roll Number: 0
```

---

### 2. Default Constructor

A **default constructor** is a no-argument constructor.

#### Two Types:

**1. Compiler-Provided Default Constructor:**
- If you don't write any constructor, Java provides one automatically
- Does nothing except call parent class constructor
- Lost if you define your own constructor

```java
public class Car {
    String brand;
    String model;
    
    // No constructor written
    // Java provides: Car() { }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();  // Uses compiler-provided constructor
        System.out.println(car.brand);  // null
    }
}
```

**2. User-Defined Default Constructor:**
```java
public class Car {
    String brand;
    String model;
    int year;
    
    // User-defined default constructor
    Car() {
        brand = "Unknown";
        model = "Unknown";
        year = 2024;
        System.out.println("Car created with default values");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        System.out.println(car.brand + " " + car.model + " " + car.year);
    }
}
```

**Output:**
```
Car created with default values
Unknown Unknown 2024
```

---

### 3. Parameterized Constructor

A **parameterized constructor** accepts arguments to initialize fields with specific values.

#### Syntax:
```java
ClassName(parameters) {
    // Initialize fields using parameters
}
```

#### Example:
```java
public class Student {
    String name;
    int rollNumber;
    int age;
    
    // Parameterized constructor
    Student(String n, int roll, int a) {
        name = n;
        rollNumber = roll;
        age = a;
    }
    
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Age: " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 101, 20);
        Student s2 = new Student("Bob", 102, 21);
        
        s1.display();
        System.out.println();
        s2.display();
    }
}
```

**Output:**
```
Name: Alice
Roll Number: 101
Age: 20

Name: Bob
Roll Number: 102
Age: 21
```

---

### 4. Constructor Overloading

**Constructor overloading** means having multiple constructors with different parameter lists.

#### Rules:
- Same constructor name (class name)
- Different number of parameters, OR
- Different types of parameters, OR
- Different order of parameters

#### Example:
```java
public class Rectangle {
    double length;
    double width;
    
    // Constructor 1: No parameters
    Rectangle() {
        length = 1.0;
        width = 1.0;
        System.out.println("Default rectangle created (1x1)");
    }
    
    // Constructor 2: One parameter (square)
    Rectangle(double side) {
        length = side;
        width = side;
        System.out.println("Square created (" + side + "x" + side + ")");
    }
    
    // Constructor 3: Two parameters
    Rectangle(double l, double w) {
        length = l;
        width = w;
        System.out.println("Rectangle created (" + l + "x" + w + ")");
    }
    
    double calculateArea() {
        return length * width;
    }
    
    void display() {
        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
        System.out.println("Area: " + calculateArea());
        System.out.println();
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rect1 = new Rectangle();           // Calls constructor 1
        Rectangle rect2 = new Rectangle(5.0);        // Calls constructor 2
        Rectangle rect3 = new Rectangle(4.0, 6.0);   // Calls constructor 3
        
        rect1.display();
        rect2.display();
        rect3.display();
    }
}
```

**Output:**
```
Default rectangle created (1x1)
Square created (5.0x5.0)
Rectangle created (4.0x6.0)
Length: 1.0
Width: 1.0
Area: 1.0

Length: 5.0
Width: 5.0
Area: 25.0

Length: 4.0
Width: 6.0
Area: 24.0
```

---

### 5. The `this` Keyword

The **`this`** keyword is a reference to the current object.

#### Uses of `this`:

**1. Differentiate Between Instance Variables and Parameters:**

```java
public class Student {
    String name;
    int age;
    
    // Without this - naming conflict
    Student(String n, int a) {
        name = n;  // Parameter names different from fields
        age = a;
    }
    
    // With this - cleaner code
    Student(String name, int age) {
        this.name = name;  // this.name refers to instance variable
        this.age = age;    // name refers to parameter
    }
}
```

**Complete Example:**
```java
public class Employee {
    String name;
    int id;
    double salary;
    
    Employee(String name, int id, double salary) {
        this.name = name;      // this.name = instance variable
        this.id = id;          // name = parameter
        this.salary = salary;
    }
    
    void display() {
        System.out.println("Name: " + this.name);
        System.out.println("ID: " + this.id);
        System.out.println("Salary: $" + this.salary);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee("Alice", 1001, 50000);
        emp.display();
    }
}
```

**2. Call Another Method of Same Class:**
```java
public class Calculator {
    int num1, num2;
    
    Calculator(int num1, int num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    
    void add() {
        System.out.println("Sum: " + (num1 + num2));
    }
    
    void subtract() {
        System.out.println("Difference: " + (num1 - num2));
    }
    
    void performAllOperations() {
        this.add();       // Call add() method
        this.subtract();  // Call subtract() method
    }
}
```

**3. Return Current Object:**
```java
public class Builder {
    String name;
    int age;
    
    Builder setName(String name) {
        this.name = name;
        return this;  // Return current object
    }
    
    Builder setAge(int age) {
        this.age = age;
        return this;  // Return current object
    }
    
    void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Builder builder = new Builder();
        builder.setName("Alice").setAge(25).display();  // Method chaining
    }
}
```

---

### 6. Constructor Chaining

**Constructor chaining** is calling one constructor from another constructor using `this()`.

#### Rules:
- `this()` must be the **first statement** in constructor
- Cannot call two constructors
- Prevents code duplication

#### Example:
```java
public class Student {
    String name;
    int rollNumber;
    int age;
    String course;
    
    // Constructor 1: All parameters
    Student(String name, int rollNumber, int age, String course) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.age = age;
        this.course = course;
    }
    
    // Constructor 2: Three parameters (calls Constructor 1)
    Student(String name, int rollNumber, int age) {
        this(name, rollNumber, age, "Not Assigned");  // Call Constructor 1
    }
    
    // Constructor 3: Two parameters (calls Constructor 2)
    Student(String name, int rollNumber) {
        this(name, rollNumber, 18);  // Call Constructor 2
    }
    
    // Constructor 4: One parameter (calls Constructor 3)
    Student(String name) {
        this(name, 0);  // Call Constructor 3
    }
    
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Age: " + age);
        System.out.println("Course: " + course);
        System.out.println();
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 101, 20, "Computer Science");
        Student s2 = new Student("Bob", 102, 21);
        Student s3 = new Student("Charlie", 103);
        Student s4 = new Student("David");
        
        s1.display();
        s2.display();
        s3.display();
        s4.display();
    }
}
```

**Output:**
```
Name: Alice
Roll Number: 101
Age: 20
Course: Computer Science

Name: Bob
Roll Number: 102
Age: 21
Course: Not Assigned

Name: Charlie
Roll Number: 103
Age: 18
Course: Not Assigned

Name: David
Roll Number: 0
Age: 18
Course: Not Assigned
```

---

## 💻 Practical Exercises

### Exercise 1: Book Class with Constructors

**📝 Problem Statement:**
Create a Book class that demonstrates constructor overloading with three different constructors: default, partial, and complete initialization. The class should store book information and provide a display method.

**Requirements:**
- Create fields for title, author, price, and pages
- Implement a default constructor that initializes all fields to default values
- Implement a constructor that accepts only title and author
- Implement a constructor that accepts all four parameters
- Use the `this` keyword to differentiate between parameters and fields
- Provide a display method to show all book information

**Sample Test Cases:**
```
Input: Book() - default constructor
Expected Output:
=== Book Information ===
Title: Unknown
Author: Unknown
Price: $0.0
Pages: 0

Input: Book("Java Programming", "James Gosling")
Expected Output:
=== Book Information ===
Title: Java Programming
Author: James Gosling
Price: $0.0
Pages: 0

Input: Book("Clean Code", "Robert Martin", 45.99, 464)
Expected Output:
=== Book Information ===
Title: Clean Code
Author: Robert Martin
Price: $45.99
Pages: 464
```

**Solution:**
```java
public class Book {
    String title;
    String author;
    double price;
    int pages;

    // Default constructor
    Book() {
        title = "Unknown";
        author = "Unknown";
        price = 0.0;
        pages = 0;
    }

    // Constructor with title and author
    Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.price = 0.0;
        this.pages = 0;
    }

    // Constructor with all parameters
    Book(String title, String author, double price, int pages) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.pages = pages;
    }

    void display() {
        System.out.println("\n=== Book Information ===");
        System.out.println("Title: " + title);
        System.out.println("Author: " + author);
        System.out.println("Price: $" + price);
        System.out.println("Pages: " + pages);
    }
}

public class TestBook {
    public static void main(String[] args) {
        Book book1 = new Book();
        Book book2 = new Book("Java Programming", "James Gosling");
        Book book3 = new Book("Clean Code", "Robert Martin", 45.99, 464);

        book1.display();
        book2.display();
        book3.display();
    }
}
```

**💡 Tips:**
- Constructor overloading allows creating objects with different levels of detail
- Use `this.fieldName` when parameter names match field names
- Default constructor provides safe initial values for all fields
- Partial constructors are useful when some information is optional
- Ensure all fields are initialized in each constructor

---

### Exercise 2: BankAccount with Constructor Chaining

**📝 Problem Statement:**
Design a BankAccount class that demonstrates constructor chaining using `this()`. Create multiple constructors that chain to a master constructor, providing default values for optional parameters.

**Requirements:**
- Create fields for accountNumber, accountHolder, balance, and accountType
- Implement a master constructor accepting all four parameters
- Implement a constructor without accountType (default to "Savings")
- Implement a constructor accepting only accountNumber and accountHolder (default balance: 1000.0)
- Use constructor chaining with `this()` to avoid code duplication
- Provide a display method showing all account details

**Sample Test Cases:**
```
Input: BankAccount("ACC001", "Alice Johnson", 5000.0, "Checking")
Expected Output:
=== Account Information ===
Account Number: ACC001
Account Holder: Alice Johnson
Balance: $5000.0
Account Type: Checking

Input: BankAccount("ACC002", "Bob Smith", 3000.0)
Expected Output:
=== Account Information ===
Account Number: ACC002
Account Holder: Bob Smith
Balance: $3000.0
Account Type: Savings

Input: BankAccount("ACC003", "Charlie Brown")
Expected Output:
=== Account Information ===
Account Number: ACC003
Account Holder: Charlie Brown
Balance: $1000.0
Account Type: Savings
```

**Solution:**
```java
public class BankAccount {
    String accountNumber;
    String accountHolder;
    double balance;
    String accountType;

    // Constructor with all parameters
    BankAccount(String accountNumber, String accountHolder, double balance, String accountType) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.accountType = accountType;
    }

    // Constructor without account type (uses chaining)
    BankAccount(String accountNumber, String accountHolder, double balance) {
        this(accountNumber, accountHolder, balance, "Savings");
    }

    // Constructor with minimum balance (uses chaining)
    BankAccount(String accountNumber, String accountHolder) {
        this(accountNumber, accountHolder, 1000.0);
    }

    void display() {
        System.out.println("\n=== Account Information ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
        System.out.println("Account Type: " + accountType);
    }
}

public class TestBankAccount {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("ACC001", "Alice Johnson", 5000.0, "Checking");
        BankAccount acc2 = new BankAccount("ACC002", "Bob Smith", 3000.0);
        BankAccount acc3 = new BankAccount("ACC003", "Charlie Brown");

        acc1.display();
        acc2.display();
        acc3.display();
    }
}
```

**💡 Tips:**
- Constructor chaining with `this()` reduces code duplication
- The `this()` call must be the first statement in constructor
- Chain constructors from specific to general (more parameters → fewer parameters)
- Define one master constructor with all logic, others just call it
- Chaining creates a single initialization path

---

### Exercise 3: Employee with this Keyword

**📝 Problem Statement:**
Create an Employee class that extensively uses the `this` keyword to demonstrate its various purposes: differentiating parameters from fields, calling methods, and referencing the current object.

**Requirements:**
- Create fields for name, id, department, and salary
- Implement constructor using `this` to resolve parameter-field naming conflicts
- Create a giveRaise method that modifies salary using `this`
- Create a changeDepartment method that uses `this` to access current values
- Use `this` consistently throughout the class for clarity
- Provide a display method showing all employee information

**Sample Test Cases:**
```
Input: Employee("Alice", 1001, "IT", 50000), giveRaise(10), changeDepartment("Management")
Expected Output:
=== Employee Information ===
Name: Alice
ID: 1001
Department: IT
Salary: $50000.0

Alice received a 10.0% raise
Alice moved from IT to Management

=== Employee Information ===
Name: Alice
ID: 1001
Department: Management
Salary: $55000.0
```

**Solution:**
```java
public class Employee {
    String name;
    int id;
    String department;
    double salary;

    Employee(String name, int id, String department, double salary) {
        this.name = name;
        this.id = id;
        this.department = department;
        this.salary = salary;
    }

    void giveRaise(double percentage) {
        this.salary = this.salary + (this.salary * percentage / 100);
        System.out.println(this.name + " received a " + percentage + "% raise");
    }

    void changeDepartment(String newDepartment) {
        System.out.println(this.name + " moved from " + this.department +
                          " to " + newDepartment);
        this.department = newDepartment;
    }

    void display() {
        System.out.println("\n=== Employee Information ===");
        System.out.println("Name: " + this.name);
        System.out.println("ID: " + this.id);
        System.out.println("Department: " + this.department);
        System.out.println("Salary: $" + this.salary);
    }
}

public class TestEmployee {
    public static void main(String[] args) {
        Employee emp = new Employee("Alice", 1001, "IT", 50000);
        emp.display();

        emp.giveRaise(10);
        emp.changeDepartment("Management");
        emp.display();
    }
}
```

**💡 Tips:**
- Use `this` to differentiate between parameters and instance variables
- `this` refers to the current object instance
- Using `this` consistently improves code readability
- `this` is optional when there's no naming conflict, but can clarify intent
- Methods can use `this` to access other methods and fields of the same object

---

### Exercise 4: Circle with Constructor Overloading

**📝 Problem Statement:**
Design a Circle class that demonstrates constructor overloading with three constructors of different parameter counts, providing flexibility in object creation with default values.

**Requirements:**
- Create fields for radius, color, and constant PI
- Implement a default constructor (radius=1.0, color="Red")
- Implement a constructor accepting only radius (default color="Red")
- Implement a constructor accepting both radius and color
- Create methods to calculate area and circumference
- Use `this` keyword for parameter-field differentiation
- Display circle information with formatted output (2 decimal places)

**Sample Test Cases:**
```
Input: Circle() - default
Expected Output:
=== Circle Information ===
Radius: 1.0
Color: Red
Area: 3.14
Circumference: 6.28

Input: Circle(5.0)
Expected Output:
=== Circle Information ===
Radius: 5.0
Color: Red
Area: 78.54
Circumference: 31.42

Input: Circle(7.5, "Blue")
Expected Output:
=== Circle Information ===
Radius: 7.5
Color: Blue
Area: 176.71
Circumference: 47.12
```

**Solution:**
```java
public class Circle {
    double radius;
    String color;
    final double PI = 3.14159;

    // Default constructor
    Circle() {
        this.radius = 1.0;
        this.color = "Red";
    }

    // Constructor with radius
    Circle(double radius) {
        this.radius = radius;
        this.color = "Red";
    }

    // Constructor with radius and color
    Circle(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }

    double calculateArea() {
        return PI * radius * radius;
    }

    double calculateCircumference() {
        return 2 * PI * radius;
    }

    void display() {
        System.out.println("\n=== Circle Information ===");
        System.out.println("Radius: " + radius);
        System.out.println("Color: " + color);
        System.out.println("Area: " + String.format("%.2f", calculateArea()));
        System.out.println("Circumference: " + String.format("%.2f", calculateCircumference()));
    }
}

public class TestCircle {
    public static void main(String[] args) {
        Circle c1 = new Circle();
        Circle c2 = new Circle(5.0);
        Circle c3 = new Circle(7.5, "Blue");

        c1.display();
        c2.display();
        c3.display();
    }
}
```

**💡 Tips:**
- Constructor overloading provides flexibility in object creation
- Use `final` keyword for constants like PI
- Default values make constructors more convenient
- String.format("%.2f", value) formats doubles to 2 decimal places
- Each constructor provides different levels of customization

---

### Exercise 5: Product with Validation

**📝 Problem Statement:**
Create a Product class that validates constructor parameters before assignment, demonstrating proper input validation and defensive programming in constructors.

**Requirements:**
- Create fields for productId, productName, price, quantity, and category
- Implement a constructor accepting all five parameters
- Validate that price is non-negative (set to 0.0 if invalid)
- Validate that quantity is non-negative (set to 0 if invalid)
- Display validation error messages when invalid values are provided
- Implement a method to calculate total inventory value (price × quantity)
- Provide a comprehensive display method

**Sample Test Cases:**
```
Input: Product("P001", "Laptop", 999.99, 10, "Electronics")
Expected Output:
=== Product Information ===
Product ID: P001
Name: Laptop
Price: $999.99
Quantity: 10
Category: Electronics
Total Value: $9999.9

Input: Product("P002", "Mouse", -15.99, 50, "Accessories")
Expected Output:
Invalid price! Set to 0.0
=== Product Information ===
Product ID: P002
Name: Mouse
Price: $0.0
Quantity: 50
Category: Accessories
Total Value: $0.0

Input: Product("P003", "Keyboard", 49.99, -5, "Accessories")
Expected Output:
Invalid quantity! Set to 0
=== Product Information ===
Product ID: P003
Name: Keyboard
Price: $49.99
Quantity: 0
Category: Accessories
Total Value: $0.0
```

**Solution:**
```java
public class Product {
    String productId;
    String productName;
    double price;
    int quantity;
    String category;

    // Constructor with validation
    Product(String productId, String productName, double price, int quantity, String category) {
        this.productId = productId;
        this.productName = productName;

        // Validate price
        if (price >= 0) {
            this.price = price;
        } else {
            this.price = 0.0;
            System.out.println("Invalid price! Set to 0.0");
        }

        // Validate quantity
        if (quantity >= 0) {
            this.quantity = quantity;
        } else {
            this.quantity = 0;
            System.out.println("Invalid quantity! Set to 0");
        }

        this.category = category;
    }

    double calculateTotalValue() {
        return this.price * this.quantity;
    }

    void display() {
        System.out.println("\n=== Product Information ===");
        System.out.println("Product ID: " + productId);
        System.out.println("Name: " + productName);
        System.out.println("Price: $" + price);
        System.out.println("Quantity: " + quantity);
        System.out.println("Category: " + category);
        System.out.println("Total Value: $" + calculateTotalValue());
    }
}

public class TestProduct {
    public static void main(String[] args) {
        Product p1 = new Product("P001", "Laptop", 999.99, 10, "Electronics");
        Product p2 = new Product("P002", "Mouse", -15.99, 50, "Accessories");  // Invalid price
        Product p3 = new Product("P003", "Keyboard", 49.99, -5, "Accessories"); // Invalid quantity

        p1.display();
        p2.display();
        p3.display();
    }
}
```

**💡 Tips:**
- Always validate constructor parameters before assignment
- Provide safe default values for invalid inputs
- Display clear error messages for debugging
- Constructor validation ensures objects are created in valid state
- Use defensive programming to prevent invalid object states

---

### Exercise 6: Date Class with Constructor Chaining

**📝 Problem Statement:**
Design a Date class that demonstrates constructor chaining by providing multiple constructors with progressively fewer parameters, each chaining to more complete constructors using `this()`.

**Requirements:**
- Create fields for day, month, and year
- Implement a master constructor accepting all three parameters
- Implement a constructor accepting day and month (default year: 2024)
- Implement a constructor accepting only day (default month: 1, year: 2024)
- Implement a default constructor (default: 01/01/2024)
- Use constructor chaining with `this()` for all constructors
- Provide both numeric and word-based display methods

**Sample Test Cases:**
```
Input: Date(15, 8, 2023)
Expected Output:
Date 1: 15/08/2023
August 15, 2023

Input: Date(25, 12)
Expected Output:
Date 2: 25/12/2024
December 25, 2024

Input: Date(10)
Expected Output:
Date 3: 10/01/2024

Input: Date()
Expected Output:
Date 4: 01/01/2024
```

**Solution:**
```java
public class Date {
    int day;
    int month;
    int year;

    // Constructor with all parameters
    Date(int day, int month, int year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    // Constructor with day and month (current year)
    Date(int day, int month) {
        this(day, month, 2024);
    }

    // Constructor with only day (current month and year)
    Date(int day) {
        this(day, 1, 2024);
    }

    // Default constructor (today's date simulation)
    Date() {
        this(1, 1, 2024);
    }

    void display() {
        System.out.printf("%02d/%02d/%04d\n", day, month, year);
    }

    void displayLong() {
        String[] months = {"", "January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"};
        System.out.println(months[month] + " " + day + ", " + year);
    }
}

public class TestDate {
    public static void main(String[] args) {
        Date date1 = new Date(15, 8, 2023);
        Date date2 = new Date(25, 12);
        Date date3 = new Date(10);
        Date date4 = new Date();

        System.out.print("Date 1: ");
        date1.display();
        date1.displayLong();

        System.out.print("\nDate 2: ");
        date2.display();
        date2.displayLong();

        System.out.print("\nDate 3: ");
        date3.display();

        System.out.print("\nDate 4: ");
        date4.display();
    }
}
```

**💡 Tips:**
- Constructor chaining creates a clear initialization hierarchy
- Each constructor calls a more complete constructor with default values
- `this()` must be the first statement in the constructor
- Use printf with %02d for zero-padded formatting
- Arrays are zero-indexed, so month names array has empty string at index 0

---

### Exercise 7: Person with Copy Constructor

**📝 Problem Statement:**
Create a Person class that implements a copy constructor to create independent copies of existing objects. Demonstrate that modifying the copy doesn't affect the original object.

**Requirements:**
- Create fields for name, age, and address
- Implement a regular constructor accepting all three parameters
- Implement a copy constructor that takes another Person object
- Copy constructor should create deep copy of all fields
- Display message when copy constructor is called
- Test that modifying copy doesn't affect original
- Provide a display method showing all person details

**Sample Test Cases:**
```
Input: Person("Alice", 25, "123 Main St"), then copy
Expected Output:
=== Person Information ===
Name: Alice
Age: 25
Address: 123 Main St

Copy constructor called

=== Person Information ===
Name: Alice
Age: 25
Address: 123 Main St

After modifying copy:
=== Person Information ===
Name: Alice
Age: 25
Address: 123 Main St

=== Person Information ===
Name: Alice Smith
Age: 26
Address: 123 Main St
```

**Solution:**
```java
public class Person {
    String name;
    int age;
    String address;

    // Regular constructor
    Person(String name, int age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    // Copy constructor
    Person(Person other) {
        this.name = other.name;
        this.age = other.age;
        this.address = other.address;
        System.out.println("Copy constructor called");
    }

    void display() {
        System.out.println("\n=== Person Information ===");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Address: " + address);
    }
}

public class TestPerson {
    public static void main(String[] args) {
        Person person1 = new Person("Alice", 25, "123 Main St");
        person1.display();

        // Create a copy
        Person person2 = new Person(person1);
        person2.display();

        // Modify copy
        person2.name = "Alice Smith";
        person2.age = 26;

        System.out.println("\nAfter modifying copy:");
        person1.display();
        person2.display();
    }
}
```

**💡 Tips:**
- Copy constructor creates independent object with same values
- Takes another object of same class as parameter
- For primitive types, simple assignment creates copy
- For reference types, be aware of shallow vs. deep copy
- Useful for creating duplicate objects without affecting originals

---

### Exercise 8: Box with Volume Calculation

**📝 Problem Statement:**
Design a Box class with three different constructors to handle cubes (equal sides), rectangular boxes (different dimensions), and default unit cubes. Demonstrate constructor chaining and geometric calculations.

**Requirements:**
- Create fields for length, width, and height
- Implement a constructor for cubes (one parameter for all sides)
- Implement a constructor for rectangular boxes (three parameters)
- Implement a default constructor creating unit cube (chaining to cube constructor)
- Calculate volume (length × width × height)
- Calculate surface area (2 × (lw + wh + hl))
- Provide comprehensive display method with all measurements

**Sample Test Cases:**
```
Input: Box() - default
Expected Output:
=== Box Dimensions ===
Length: 1.0
Width: 1.0
Height: 1.0
Volume: 1.0
Surface Area: 6.0

Input: Box(5.0) - cube
Expected Output:
=== Box Dimensions ===
Length: 5.0
Width: 5.0
Height: 5.0
Volume: 125.0
Surface Area: 150.0

Input: Box(3.0, 4.0, 5.0) - rectangular
Expected Output:
=== Box Dimensions ===
Length: 3.0
Width: 4.0
Height: 5.0
Volume: 60.0
Surface Area: 94.0
```

**Solution:**
```java
public class Box {
    double length;
    double width;
    double height;

    // Cube constructor (all sides equal)
    Box(double side) {
        this.length = side;
        this.width = side;
        this.height = side;
    }

    // Rectangular box constructor
    Box(double length, double width, double height) {
        this.length = length;
        this.width = width;
        this.height = height;
    }

    // Default constructor (unit cube)
    Box() {
        this(1.0);  // Call cube constructor
    }

    double calculateVolume() {
        return length * width * height;
    }

    double calculateSurfaceArea() {
        return 2 * (length * width + width * height + height * length);
    }

    void display() {
        System.out.println("\n=== Box Dimensions ===");
        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
        System.out.println("Height: " + height);
        System.out.println("Volume: " + calculateVolume());
        System.out.println("Surface Area: " + calculateSurfaceArea());
    }
}

public class TestBox {
    public static void main(String[] args) {
        Box box1 = new Box();                    // Unit cube
        Box box2 = new Box(5.0);                 // Cube with side 5
        Box box3 = new Box(3.0, 4.0, 5.0);      // Rectangular box

        box1.display();
        box2.display();
        box3.display();
    }
}
```

**💡 Tips:**
- Constructor chaining reduces code duplication
- Default constructor calls more specific constructor with default value
- Volume formula: l × w × h
- Surface area formula: 2(lw + wh + hl)
- Different constructors provide flexibility for different use cases

---

### Exercise 9: Student with Builder Pattern

**📝 Problem Statement:**
Create a Student class implementing the builder pattern using `this` keyword. Methods should return `this` to enable method chaining for fluent object initialization.

**Requirements:**
- Create fields for name, rollNumber, course, gpa, and email
- Constructor should only accept name (required field)
- Create setter methods that return `this` for method chaining
- Each setter should set one field and return the current object
- Allow flexible object construction through method chaining
- Provide a display method showing all student information

**Sample Test Cases:**
```
Input: new Student("Alice").setRollNumber(101).setCourse("Computer Science").setGPA(3.8).setEmail("alice@university.edu")
Expected Output:
=== Student Information ===
Name: Alice
Roll Number: 101
Course: Computer Science
GPA: 3.8
Email: alice@university.edu
```

**Solution:**
```java
public class Student {
    String name;
    int rollNumber;
    String course;
    double gpa;
    String email;

    Student(String name) {
        this.name = name;
    }

    Student setRollNumber(int rollNumber) {
        this.rollNumber = rollNumber;
        return this;
    }

    Student setCourse(String course) {
        this.course = course;
        return this;
    }

    Student setGPA(double gpa) {
        this.gpa = gpa;
        return this;
    }

    Student setEmail(String email) {
        this.email = email;
        return this;
    }

    void display() {
        System.out.println("\n=== Student Information ===");
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Course: " + course);
        System.out.println("GPA: " + gpa);
        System.out.println("Email: " + email);
    }
}

public class TestStudent {
    public static void main(String[] args) {
        Student student = new Student("Alice")
                            .setRollNumber(101)
                            .setCourse("Computer Science")
                            .setGPA(3.8)
                            .setEmail("alice@university.edu");

        student.display();
    }
}
```

**💡 Tips:**
- Builder pattern provides fluent, readable object construction
- Return `this` from setter methods to enable chaining
- Method chaining: `object.method1().method2().method3()`
- Constructor takes only required fields (name in this case)
- Optional fields are set through chained method calls
- Makes object creation more expressive and flexible

---

### Exercise 10: ComplexNumber with Multiple Constructors

**📝 Problem Statement:**
Create a ComplexNumber class representing complex numbers (a + bi) with four different constructors and arithmetic operations. Demonstrate constructor overloading and copy constructor.

**Requirements:**
- Create fields for real and imaginary parts
- Implement default constructor (0 + 0i)
- Implement constructor with real part only (a + 0i)
- Implement constructor with both parts (a + bi)
- Implement copy constructor
- Create add and subtract methods returning new ComplexNumber
- Provide display method with proper format (handle positive and negative imaginary)

**Sample Test Cases:**
```
Input: ComplexNumber(3.0, 4.0), ComplexNumber(1.0, 2.0)
Expected Output:
c1 = 3.0 + 4.0i
c2 = 1.0 + 2.0i
c3 = 5.0
c4 = 0.0 + 0.0i

c1 + c2 = 4.0 + 6.0i
c1 - c2 = 2.0 + 2.0i
```

**Solution:**
```java
public class ComplexNumber {
    double real;
    double imaginary;

    // Default constructor (0 + 0i)
    ComplexNumber() {
        this.real = 0.0;
        this.imaginary = 0.0;
    }

    // Constructor with real part only
    ComplexNumber(double real) {
        this.real = real;
        this.imaginary = 0.0;
    }

    // Constructor with both parts
    ComplexNumber(double real, double imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    // Copy constructor
    ComplexNumber(ComplexNumber other) {
        this.real = other.real;
        this.imaginary = other.imaginary;
    }

    ComplexNumber add(ComplexNumber other) {
        return new ComplexNumber(this.real + other.real,
                                this.imaginary + other.imaginary);
    }

    ComplexNumber subtract(ComplexNumber other) {
        return new ComplexNumber(this.real - other.real,
                                this.imaginary - other.imaginary);
    }

    void display() {
        if (imaginary >= 0) {
            System.out.println(real + " + " + imaginary + "i");
        } else {
            System.out.println(real + " - " + (-imaginary) + "i");
        }
    }
}

public class TestComplexNumber {
    public static void main(String[] args) {
        ComplexNumber c1 = new ComplexNumber(3.0, 4.0);
        ComplexNumber c2 = new ComplexNumber(1.0, 2.0);
        ComplexNumber c3 = new ComplexNumber(5.0);
        ComplexNumber c4 = new ComplexNumber();

        System.out.print("c1 = ");
        c1.display();

        System.out.print("c2 = ");
        c2.display();

        System.out.print("c3 = ");
        c3.display();

        System.out.print("c4 = ");
        c4.display();

        ComplexNumber sum = c1.add(c2);
        System.out.print("\nc1 + c2 = ");
        sum.display();

        ComplexNumber diff = c1.subtract(c2);
        System.out.print("c1 - c2 = ");
        diff.display();
    }
}
```

**💡 Tips:**
- Complex numbers: a + bi where i = √(-1)
- Constructor overloading allows creating complex numbers in different ways
- Copy constructor creates independent copy
- Arithmetic operations create new objects (immutable pattern)
- Handle negative imaginary parts properly in display (use minus sign)

---

### Exercise 11: Time Class with Validation

**📝 Problem Statement:**
Design a Time class that validates time values in constructors, ensuring hours are 0-23, minutes are 0-59, and seconds are 0-59. Use constructor chaining and provide time manipulation methods.

**Requirements:**
- Create fields for hours, minutes, and seconds
- Implement a constructor accepting all three parameters with validation
- Implement a constructor accepting hours and minutes (seconds default to 0)
- Implement a constructor accepting only hours (minutes and seconds default to 0)
- Validate all parameters (hours: 0-23, minutes/seconds: 0-59)
- Set invalid values to 0 with error messages
- Provide methods to add hours, minutes, and seconds
- Implement display method in HH:MM:SS format

**Sample Test Cases:**
```
Input: Time(14, 30, 45)
Expected Output:
=== Time Information ===
14:30:45

Input: Time(25, 70, 80) - all invalid
Expected Output:
Invalid hours! Must be 0-23. Set to 0.
Invalid minutes! Must be 0-59. Set to 0.
Invalid seconds! Must be 0-59. Set to 0.
=== Time Information ===
00:00:00

Input: Time(10, 45).addHours(2).addMinutes(30)
Expected Output:
=== Time Information ===
13:15:00
```

**Solution:**
```java
public class Time {
    int hours;
    int minutes;
    int seconds;

    // Constructor with all parameters
    Time(int hours, int minutes, int seconds) {
        // Validate hours
        if (hours >= 0 && hours <= 23) {
            this.hours = hours;
        } else {
            this.hours = 0;
            System.out.println("Invalid hours! Must be 0-23. Set to 0.");
        }

        // Validate minutes
        if (minutes >= 0 && minutes <= 59) {
            this.minutes = minutes;
        } else {
            this.minutes = 0;
            System.out.println("Invalid minutes! Must be 0-59. Set to 0.");
        }

        // Validate seconds
        if (seconds >= 0 && seconds <= 59) {
            this.seconds = seconds;
        } else {
            this.seconds = 0;
            System.out.println("Invalid seconds! Must be 0-59. Set to 0.");
        }
    }

    // Constructor with hours and minutes
    Time(int hours, int minutes) {
        this(hours, minutes, 0);
    }

    // Constructor with only hours
    Time(int hours) {
        this(hours, 0, 0);
    }

    Time addHours(int h) {
        this.hours = (this.hours + h) % 24;
        return this;
    }

    Time addMinutes(int m) {
        this.minutes += m;
        this.hours += this.minutes / 60;
        this.minutes = this.minutes % 60;
        this.hours = this.hours % 24;
        return this;
    }

    Time addSeconds(int s) {
        this.seconds += s;
        this.minutes += this.seconds / 60;
        this.seconds = this.seconds % 60;
        this.addMinutes(0);  // Normalize minutes and hours
        return this;
    }

    void display() {
        System.out.println("\n=== Time Information ===");
        System.out.printf("%02d:%02d:%02d\n", hours, minutes, seconds);
    }
}

public class TestTime {
    public static void main(String[] args) {
        Time time1 = new Time(14, 30, 45);
        time1.display();

        Time time2 = new Time(25, 70, 80);  // All invalid
        time2.display();

        Time time3 = new Time(10, 45);
        time3.addHours(2).addMinutes(30);
        time3.display();
    }
}
```

**💡 Tips:**
- Constructor validation prevents invalid object states
- Use modulo (%) for wrapping time values
- Chain validation constructors using `this()`
- Return `this` from methods to enable chaining
- Use printf with %02d for zero-padded time display
- Handle time overflow properly (60 minutes = 1 hour, 24 hours = 0)

---

### Exercise 12: Point2D with Copy Constructor

**📝 Problem Statement:**
Create a Point2D class representing points in 2D coordinate space with a copy constructor. Demonstrate distance calculations and point transformations.

**Requirements:**
- Create fields for x and y coordinates
- Implement a constructor accepting x and y coordinates
- Implement a default constructor at origin (0, 0)
- Implement a copy constructor
- Create method to calculate distance from origin
- Create method to calculate distance to another point
- Implement translate method to move point
- Provide display method showing coordinates

**Sample Test Cases:**
```
Input: Point2D(3.0, 4.0)
Expected Output:
=== Point Information ===
Coordinates: (3.0, 4.0)
Distance from origin: 5.00

Input: point1.distanceTo(point2) where point1=(3,4), point2=(6,8)
Expected Output:
Distance between points: 5.00

Input: point1.translate(2.0, 3.0) from (3, 4)
Expected Output:
After translation:
=== Point Information ===
Coordinates: (5.0, 7.0)
```

**Solution:**
```java
public class Point2D {
    double x;
    double y;

    // Constructor with coordinates
    Point2D(double x, double y) {
        this.x = x;
        this.y = y;
    }

    // Default constructor (origin)
    Point2D() {
        this(0.0, 0.0);
    }

    // Copy constructor
    Point2D(Point2D other) {
        this.x = other.x;
        this.y = other.y;
        System.out.println("Copy constructor called");
    }

    double distanceFromOrigin() {
        return Math.sqrt(x * x + y * y);
    }

    double distanceTo(Point2D other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    Point2D translate(double dx, double dy) {
        this.x += dx;
        this.y += dy;
        return this;
    }

    void display() {
        System.out.println("\n=== Point Information ===");
        System.out.println("Coordinates: (" + x + ", " + y + ")");
        System.out.println("Distance from origin: " + String.format("%.2f", distanceFromOrigin()));
    }
}

public class TestPoint2D {
    public static void main(String[] args) {
        Point2D point1 = new Point2D(3.0, 4.0);
        point1.display();

        Point2D point2 = new Point2D(6.0, 8.0);
        System.out.println("\nDistance between points: " +
                          String.format("%.2f", point1.distanceTo(point2)));

        Point2D copy = new Point2D(point1);

        point1.translate(2.0, 3.0);
        System.out.println("\nAfter translation:");
        point1.display();

        System.out.println("\nOriginal copy unchanged:");
        copy.display();
    }
}
```

**💡 Tips:**
- Distance formula: √((x2-x1)² + (y2-y1)²)
- Distance from origin: √(x² + y²)
- Use Math.sqrt() for square root calculation
- Copy constructor creates independent point
- translate() modifies current object and returns `this` for chaining
- Use String.format("%.2f") for 2 decimal places

---

### Exercise 13: Counter with Static Tracking

**📝 Problem Statement:**
Create a Counter class that tracks the total number of Counter objects created using a static counter. Demonstrate the difference between instance and static variables in constructors.

**Requirements:**
- Create an instance field for individual counter value
- Create a static field to track total Counter objects created
- Increment static counter in every constructor
- Implement constructors with and without initial value
- Provide method to increment counter value
- Create static method to get total objects created
- Display both instance value and total objects

**Sample Test Cases:**
```
Input: Create 3 Counter objects: Counter(), Counter(10), Counter(5)
Expected Output:
Counter 1 created. Total counters: 1
=== Counter Information ===
Value: 0
Total Counters Created: 1

Counter 2 created. Total counters: 2
=== Counter Information ===
Value: 10
Total Counters Created: 2

Counter 3 created. Total counters: 3
=== Counter Information ===
Value: 5
Total Counters Created: 3
```

**Solution:**
```java
public class Counter {
    int value;                    // Instance variable
    static int totalCounters = 0; // Static variable

    // Constructor with initial value
    Counter(int value) {
        this.value = value;
        totalCounters++;  // Increment static counter
        System.out.println("Counter created. Total counters: " + totalCounters);
    }

    // Default constructor
    Counter() {
        this(0);  // Chain to parameterized constructor
    }

    void increment() {
        this.value++;
    }

    void incrementBy(int amount) {
        this.value += amount;
    }

    static int getTotalCounters() {
        return totalCounters;
    }

    void display() {
        System.out.println("\n=== Counter Information ===");
        System.out.println("Value: " + value);
        System.out.println("Total Counters Created: " + totalCounters);
    }
}

public class TestCounter {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        c1.display();

        Counter c2 = new Counter(10);
        c2.display();

        Counter c3 = new Counter(5);
        c3.display();

        c1.increment();
        c2.incrementBy(5);

        System.out.println("\nAfter modifications:");
        c1.display();
        c2.display();

        System.out.println("\nTotal counters via static method: " +
                          Counter.getTotalCounters());
    }
}
```

**💡 Tips:**
- Static variables are shared across all instances
- Static variable initialization happens once when class loads
- Each constructor call should increment static counter
- Instance variables are unique to each object
- Static methods can only access static variables directly
- Use static counter to track object creation count

---

## 💡 Best Practices

### 1. Always Use `this` Keyword for Parameter-Field Disambiguation

**Practice**: When constructor parameters have the same names as instance variables, always use `this.fieldName` to refer to the instance variable.

**Why It's Important**: This eliminates ambiguity and makes code more readable. Without `this`, the assignment `name = name` assigns the parameter to itself, leaving the field uninitialized.

**Example**:
```java
// ❌ Poor Practice - Ambiguous
public class Employee {
    String name;
    int id;

    Employee(String name, int id) {
        name = name;  // Assigns parameter to itself!
        id = id;      // Instance variables remain uninitialized
    }
}

// ✅ Best Practice - Clear and Explicit
public class Employee {
    String name;
    int id;

    Employee(String name, int id) {
        this.name = name;  // Clearly refers to instance variable
        this.id = id;
    }
}
```

---

### 2. Design One Master Constructor and Chain Others to It

**Practice**: Create one comprehensive constructor that performs all initialization and validation, then have other constructors call it using `this()`.

**Why It's Important**: Reduces code duplication, ensures consistent initialization logic, and makes maintenance easier. If you need to change initialization logic, you only update one place.

**Example**:
```java
// ❌ Poor Practice - Duplicated Logic
public class Account {
    String accountNumber;
    String holder;
    double balance;
    String type;

    Account(String accountNumber, String holder, double balance, String type) {
        this.accountNumber = accountNumber;
        this.holder = holder;
        this.balance = balance < 0 ? 0 : balance;  // Validation
        this.type = type;
    }

    Account(String accountNumber, String holder, double balance) {
        this.accountNumber = accountNumber;
        this.holder = holder;
        this.balance = balance < 0 ? 0 : balance;  // Duplicated validation!
        this.type = "Savings";
    }
}

// ✅ Best Practice - Single Source of Truth
public class Account {
    String accountNumber;
    String holder;
    double balance;
    String type;

    // Master constructor with all logic
    Account(String accountNumber, String holder, double balance, String type) {
        this.accountNumber = accountNumber;
        this.holder = holder;
        this.balance = balance < 0 ? 0 : balance;  // Validation in one place
        this.type = type;
    }

    // Chains to master constructor
    Account(String accountNumber, String holder, double balance) {
        this(accountNumber, holder, balance, "Savings");
    }

    // Chains to other constructor
    Account(String accountNumber, String holder) {
        this(accountNumber, holder, 0.0);
    }
}
```

---

### 3. Always Validate Constructor Parameters

**Practice**: Validate all constructor parameters before assigning them to fields. Throw IllegalArgumentException or set safe defaults for invalid inputs.

**Why It's Important**: Constructors are the gatekeepers of object creation. Validating parameters ensures objects are created in a valid state, preventing bugs and runtime errors later.

**Example**:
```java
// ❌ Poor Practice - No Validation
public class Rectangle {
    double length;
    double width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
        // Allows negative dimensions!
    }
}

// ✅ Best Practice - Defensive Programming
public class Rectangle {
    double length;
    double width;

    Rectangle(double length, double width) {
        if (length <= 0 || width <= 0) {
            throw new IllegalArgumentException(
                "Length and width must be positive. Got: length=" +
                length + ", width=" + width
            );
        }
        this.length = length;
        this.width = width;
    }

    // Alternative: Safe defaults with warning
    Rectangle(double length, double width, boolean useSafeDefaults) {
        if (length <= 0) {
            System.err.println("Invalid length " + length + ", using 1.0");
            this.length = 1.0;
        } else {
            this.length = length;
        }

        if (width <= 0) {
            System.err.println("Invalid width " + width + ", using 1.0");
            this.width = 1.0;
        } else {
            this.width = width;
        }
    }
}
```

---

### 4. Provide Both Default and Parameterized Constructors When Appropriate

**Practice**: Offer multiple constructor options - a default constructor with sensible defaults and parameterized constructors for custom initialization.

**Why It's Important**: Provides flexibility for object creation. Default constructors allow quick instantiation with safe defaults, while parameterized constructors enable customization.

**Example**:
```java
// ❌ Poor Practice - Only One Option
public class Configuration {
    String environment;
    int timeout;
    boolean debugMode;

    // Only parameterized constructor - forces users to provide all values
    Configuration(String environment, int timeout, boolean debugMode) {
        this.environment = environment;
        this.timeout = timeout;
        this.debugMode = debugMode;
    }
}

// ✅ Best Practice - Multiple Options
public class Configuration {
    String environment;
    int timeout;
    boolean debugMode;

    // Default constructor with safe defaults
    Configuration() {
        this("production", 30000, false);
    }

    // Partial customization
    Configuration(String environment) {
        this(environment, 30000, false);
    }

    // Full customization
    Configuration(String environment, int timeout, boolean debugMode) {
        this.environment = environment;
        this.timeout = timeout;
        this.debugMode = debugMode;
    }
}

// Usage flexibility:
Configuration config1 = new Configuration();                    // Quick defaults
Configuration config2 = new Configuration("development");        // Custom environment
Configuration config3 = new Configuration("staging", 60000, true); // Full control
```

---

### 5. Initialize All Fields in Constructors

**Practice**: Ensure every instance variable is initialized in the constructor, either explicitly or through safe defaults.

**Why It's Important**: Prevents NullPointerException and unexpected behavior. Uninitialized reference types default to null, which can cause runtime errors when accessed.

**Example**:
```java
// ❌ Poor Practice - Partial Initialization
public class User {
    String username;
    String email;
    String role;      // Not initialized!
    Date created;     // Not initialized!

    User(String username, String email) {
        this.username = username;
        this.email = email;
        // role and created are null
    }
}

// Later in code:
User user = new User("john", "john@example.com");
System.out.println(user.role.toUpperCase());  // NullPointerException!

// ✅ Best Practice - Complete Initialization
public class User {
    String username;
    String email;
    String role;
    Date created;

    User(String username, String email) {
        this.username = username;
        this.email = email;
        this.role = "USER";              // Safe default
        this.created = new Date();        // Initialize with current date
    }

    User(String username, String email, String role) {
        this.username = username;
        this.email = email;
        this.role = role != null ? role : "USER";  // Null-safe
        this.created = new Date();
    }
}
```

---

### 6. Use Constructor Chaining to Avoid Code Duplication

**Practice**: When you have multiple constructors, use `this()` to call other constructors rather than duplicating initialization code.

**Why It's Important**: Follows the DRY (Don't Repeat Yourself) principle. Makes code more maintainable - changes to initialization logic only need to be made in one place.

**Example**:
```java
// ❌ Poor Practice - Duplicated Code
public class Product {
    String id;
    String name;
    double price;
    String category;
    boolean available;

    Product(String id, String name, double price, String category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.available = true;  // Default logic
    }

    Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = "General";
        this.available = true;  // Duplicated default logic
    }

    Product(String id, String name) {
        this.id = id;
        this.name = name;
        this.price = 0.0;
        this.category = "General";
        this.available = true;  // Duplicated again!
    }
}

// ✅ Best Practice - Constructor Chaining
public class Product {
    String id;
    String name;
    double price;
    String category;
    boolean available;

    // Most complete constructor - contains all logic
    Product(String id, String name, double price, String category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.available = true;  // Default logic in ONE place
    }

    // Chains to the complete constructor
    Product(String id, String name, double price) {
        this(id, name, price, "General");
    }

    // Chains to intermediate constructor
    Product(String id, String name) {
        this(id, name, 0.0);
    }
}
```

---

### 7. Keep Constructors Simple - Avoid Complex Logic

**Practice**: Constructors should focus on initialization. Avoid performing complex computations, I/O operations, or calling non-final methods.

**Why It's Important**: Complex constructor logic makes objects harder to create, test, and debug. It can also lead to partially initialized objects if exceptions occur mid-construction.

**Example**:
```java
// ❌ Poor Practice - Complex Constructor Logic
public class DataProcessor {
    List<String> data;
    int processedCount;

    DataProcessor(String filename) {
        try {
            // Complex I/O in constructor - bad idea!
            BufferedReader reader = new BufferedReader(new FileReader(filename));
            this.data = new ArrayList<>();
            String line;
            while ((line = reader.readLine()) != null) {
                // Complex processing in constructor
                if (line.length() > 10 && line.startsWith("DATA:")) {
                    this.data.add(line.substring(5).trim().toUpperCase());
                    this.processedCount++;
                }
            }
            reader.close();
        } catch (IOException e) {
            // What if this fails? Partially constructed object!
            this.data = new ArrayList<>();
            this.processedCount = 0;
        }
    }
}

// ✅ Best Practice - Simple Constructor, Separate Initialization
public class DataProcessor {
    List<String> data;
    int processedCount;

    // Simple constructor - just initializes fields
    DataProcessor() {
        this.data = new ArrayList<>();
        this.processedCount = 0;
    }

    // Separate method for complex operations
    public void loadFromFile(String filename) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(filename));
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.length() > 10 && line.startsWith("DATA:")) {
                this.data.add(line.substring(5).trim().toUpperCase());
                this.processedCount++;
            }
        }
        reader.close();
    }
}

// Usage:
DataProcessor processor = new DataProcessor();  // Always succeeds
try {
    processor.loadFromFile("data.txt");  // Complex operation separate
} catch (IOException e) {
    // Handle error with fully constructed object
    System.err.println("Failed to load file: " + e.getMessage());
}
```

---

### 8. Document Constructor Parameters and Preconditions

**Practice**: Add clear JavaDoc comments to constructors explaining parameters, preconditions, and any exceptions thrown.

**Why It's Important**: Makes the API clear for other developers (including future you). Documents expected input ranges, valid values, and error conditions.

**Example**:
```java
// ❌ Poor Practice - No Documentation
public class Employee {
    private String name;
    private int age;
    private double salary;

    public Employee(String name, int age, double salary) {
        if (age < 18 || age > 65) throw new IllegalArgumentException("Invalid age");
        if (salary < 0) throw new IllegalArgumentException("Invalid salary");
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}

// ✅ Best Practice - Well Documented
public class Employee {
    private String name;
    private int age;
    private double salary;

    /**
     * Creates a new Employee with the specified details.
     *
     * @param name the employee's full name (must not be null or empty)
     * @param age the employee's age (must be between 18 and 65 inclusive)
     * @param salary the employee's annual salary (must be non-negative)
     * @throws IllegalArgumentException if age is not in range [18, 65]
     * @throws IllegalArgumentException if salary is negative
     * @throws NullPointerException if name is null
     */
    public Employee(String name, int age, double salary) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (age < 18 || age > 65) {
            throw new IllegalArgumentException(
                "Age must be between 18 and 65, got: " + age
            );
        }
        if (salary < 0) {
            throw new IllegalArgumentException(
                "Salary cannot be negative, got: " + salary
            );
        }

        this.name = name.trim();
        this.age = age;
        this.salary = salary;
    }
}
```

---

## 🔑 Key Takeaways

1. **Constructor**: Special method to initialize objects
2. **Same Name**: Constructor name must match class name
3. **No Return Type**: Not even void
4. **Default Constructor**: No-argument constructor (provided by Java if not defined)
5. **Parameterized Constructor**: Accepts arguments for initialization
6. **Constructor Overloading**: Multiple constructors with different parameters
7. **`this` Keyword**: Reference to current object
8. **`this()` Call**: Constructor chaining (must be first statement)
9. **Initialization**: Constructors ensure proper object initialization
10. **Copy Constructor**: Creates new object from existing one

---

## ⚠️ Common Mistakes

### 1. Constructor Syntax Errors

#### ❌ Wrong - Adding Return Type to Constructor:
```java
// WRONG
public class Student {
    String name;

    public void Student() {  // Compilation error! Constructor can't have return type
        name = "Unknown";
    }
}
```
**Issue:** Constructors must not have any return type, not even void

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;

    public Student() {  // No return type
        name = "Unknown";
    }
}
```

**Why:** Adding a return type makes it a regular method, not a constructor; constructors are special methods that implicitly return the new object.

**💡 Tip:** Constructor syntax: `ClassName()` with no return type at all.

---

#### ❌ Wrong - Constructor Name Doesn't Match Class Name:
```java
// WRONG
public class Student {
    String name;

    public student() {  // Lowercase! Not a constructor!
        name = "Unknown";
    }
}

Student s = new Student();  // Compilation error! No constructor found
```
**Issue:** Constructor name must exactly match class name including case

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;

    public Student() {  // Exact match with class name
        name = "Unknown";
    }
}

Student s = new Student();  // Works!
```

**Why:** Java requires exact name matching for constructors; different case creates a regular method.

**💡 Tip:** Constructor name must be identical to class name: `Student` class needs `Student()` constructor.

---

#### ❌ Wrong - Constructor with Return Statement:
```java
// WRONG
public class Car {
    String brand;

    public Car() {
        brand = "Unknown";
        return;  // Compilation error! Constructor can't return value
    }
}
```
**Issue:** Constructors cannot have return statements with values

#### ✅ Right:
```java
// CORRECT
public class Car {
    String brand;

    public Car() {
        brand = "Unknown";
        // No return statement needed
    }
}
```

**Why:** Constructors implicitly return the new object; explicit return not allowed.

**💡 Tip:** Never use `return` in constructors; they automatically return the created object.

---

### 2. Default Constructor Issues

#### ❌ Wrong - Assuming Default Constructor Exists After Defining Parameterized:
```java
// WRONG
public class Student {
    String name;
    int rollNumber;

    Student(String name, int rollNumber) {  // Parameterized constructor defined
        this.name = name;
        this.rollNumber = rollNumber;
    }
}

// Compilation error! No default constructor
Student s = new Student();  // Fails!
```
**Issue:** Defining any constructor removes compiler-provided default constructor

#### ✅ Right:
```java
// CORRECT - Explicitly provide default constructor if needed
public class Student {
    String name;
    int rollNumber;

    Student() {  // Explicit default constructor
        this.name = "Unknown";
        this.rollNumber = 0;
    }

    Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }
}

Student s1 = new Student();  // Works!
Student s2 = new Student("Alice", 101);  // Also works!
```

**Why:** Once you define any constructor, Java doesn't provide default constructor; must explicitly create it.

**💡 Tip:** If you need both default and parameterized constructors, define both explicitly.

---

#### ❌ Wrong - Not Understanding Default Constructor Behavior:
```java
// WRONG (conceptual error)
public class Book {
    String title;
    double price;

    // No constructor defined
}

Book book = new Book();  // Compiler provides: Book() { }
System.out.println(book.title);  // null
System.out.println(book.price);  // 0.0
// Expecting initialized values!
```
**Issue:** Compiler-provided default constructor doesn't initialize fields to meaningful values

#### ✅ Right:
```java
// CORRECT - Provide explicit constructor with initialization
public class Book {
    String title;
    double price;

    Book() {  // Explicit initialization
        title = "Untitled";
        price = 0.0;
    }
}

Book book = new Book();
System.out.println(book.title);  // "Untitled"
System.out.println(book.price);  // 0.0
```

**Why:** Compiler-provided constructor only calls super(); doesn't initialize fields to non-default values.

**💡 Tip:** Define explicit constructor to control field initialization; don't rely on compiler's default.

---

### 3. Parameter and this Keyword Issues

#### ❌ Wrong - Shadowing Instance Variables Without this:
```java
// WRONG
public class Student {
    String name;
    int age;

    Student(String name, int age) {
        name = name;  // Assigns parameter to itself! Instance variable unchanged
        age = age;    // Same problem
    }
}

Student s = new Student("Alice", 20);
System.out.println(s.name);  // null! Not "Alice"
System.out.println(s.age);   // 0! Not 20
```
**Issue:** Parameters shadow instance variables; assignment does nothing

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;  // this.name = instance variable
        this.age = age;    // name/age = parameters
    }
}

Student s = new Student("Alice", 20);
System.out.println(s.name);  // "Alice"
System.out.println(s.age);   // 20
```

**Why:** When parameter and field have same name, parameter takes precedence; use `this` to access field.

**💡 Tip:** Always use `this.fieldName` when parameter names match field names.

---

#### ❌ Wrong - Using this for Non-Instance Members:
```java
// WRONG
public class Math Calculator {
    static int count = 0;

    MathCalculator() {
        this.count++;  // Confusing! this refers to instance, count is static
    }
}
```
**Issue:** Using `this` with static members is misleading

#### ✅ Right:
```java
// CORRECT
public class MathCalculator {
    static int count = 0;

    MathCalculator() {
        MathCalculator.count++;  // Clear that it's static
        // OR just: count++;
    }
}
```

**Why:** `this` refers to current instance; static members belong to class, not instances.

**💡 Tip:** Access static members through class name, not `this`.

---

#### ❌ Wrong - Forgetting this When Returning Current Object:
```java
// WRONG
public class Builder {
    String name;

    Builder setName(String name) {
        this.name = name;
        return;  // Returns void, not object!
    }
}

Builder b = new Builder();
b.setName("Alice").setAge(25);  // Compilation error! Can't chain
```
**Issue:** Method returns void; cannot chain method calls

#### ✅ Right:
```java
// CORRECT
public class Builder {
    String name;
    int age;

    Builder setName(String name) {
        this.name = name;
        return this;  // Return current object
    }

    Builder setAge(int age) {
        this.age = age;
        return this;
    }
}

Builder b = new Builder();
b.setName("Alice").setAge(25);  // Method chaining works!
```

**Why:** Returning `this` allows method chaining by returning the current object reference.

**💡 Tip:** Return `this` from setter methods to enable fluent/builder pattern.

---

### 4. Constructor Chaining Mistakes

#### ❌ Wrong - this() Not as First Statement:
```java
// WRONG
public class Student {
    String name;
    int rollNumber;

    Student(String name) {
        System.out.println("Creating student");
        this(name, 0);  // Compilation error! this() must be first
    }

    Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }
}
```
**Issue:** Constructor call `this()` must be the very first statement

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;
    int rollNumber;

    Student(String name) {
        this(name, 0);  // First statement
        System.out.println("Creating student");  // After this()
    }

    Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }
}
```

**Why:** Java syntax requires `this()` as first statement to ensure proper object initialization order.

**💡 Tip:** Always place `this()` as the very first line in constructor body.

---

#### ❌ Wrong - Circular Constructor Calls:
```java
// WRONG
public class Student {
    String name;

    Student() {
        this("Unknown");  // Calls Student(String)
    }

    Student(String name) {
        this();  // Calls Student()! Infinite recursion! Compilation error
    }
}
```
**Issue:** Constructors call each other in a circle; creates infinite loop

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;

    Student() {
        this("Unknown");  // Calls Student(String)
    }

    Student(String name) {
        this.name = name;  // No further this() call; recursion ends
    }
}
```

**Why:** Circular calls create infinite recursion; one constructor must do actual initialization.

**💡 Tip:** Constructor chaining must eventually reach a constructor that doesn't call `this()`.

---

#### ❌ Wrong - Multiple this() Calls:
```java
// WRONG
public class Student {
    String name;
    int rollNumber;
    int age;

    Student(String name) {
        this();              // Compilation error!
        this(name, 0, 18);   // Only one this() allowed
    }
}
```
**Issue:** Constructor can only call one other constructor

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;
    int rollNumber;
    int age;

    Student(String name) {
        this(name, 0, 18);  // Single this() call
    }

    Student(String name, int rollNumber, int age) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.age = age;
    }
}
```

**Why:** Java allows only one constructor call to avoid ambiguity and ensure single initialization path.

**💡 Tip:** Choose the most appropriate constructor to chain to; only one `this()` per constructor.

---

#### ❌ Wrong - Using this() and super() Together:
```java
// WRONG
public class Student extends Person {
    int rollNumber;

    Student(String name, int rollNumber) {
        super(name);         // Compilation error!
        this(rollNumber);    // Can't call both super() and this()
    }

    Student(int rollNumber) {
        this.rollNumber = rollNumber;
    }
}
```
**Issue:** Cannot call both `super()` and `this()` in same constructor

#### ✅ Right:
```java
// CORRECT - Method 1: Use super()
public class Student extends Person {
    int rollNumber;

    Student(String name, int rollNumber) {
        super(name);  // Call parent constructor
        this.rollNumber = rollNumber;
    }
}

// CORRECT - Method 2: Use this(), which then calls super()
public class Student extends Person {
    int rollNumber;

    Student(String name, int rollNumber) {
        this(rollNumber);  // this() will call Student(int), which calls super()
        // Cannot access name here
    }

    Student(int rollNumber) {
        super("Unknown");  // This constructor calls super()
        this.rollNumber = rollNumber;
    }
}
```

**Why:** Either `this()` or `super()` can be first statement, not both; choose one path.

**💡 Tip:** Use either `this()` or `super()` as first statement, never both.

---

### 5. Constructor Overloading Errors

#### ❌ Wrong - Duplicate Constructor Signatures:
```java
// WRONG
public class Rectangle {
    double length;
    double width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    // Compilation error! Duplicate constructor
    Rectangle(double width, double length) {
        this.width = width;
        this.length = length;
    }
}
```
**Issue:** Same parameter types in same order; compiler can't distinguish

#### ✅ Right:
```java
// CORRECT - Different number or types of parameters
public class Rectangle {
    double length;
    double width;

    Rectangle(double side) {  // Single parameter (square)
        this.length = side;
        this.width = side;
    }

    Rectangle(double length, double width) {  // Two parameters
        this.length = length;
        this.width = width;
    }
}
```

**Why:** Overloading requires different parameter lists; same types in same order is duplicate.

**💡 Tip:** Vary number of parameters, types, or order; just renaming parameters doesn't work.

---

#### ❌ Wrong - Ambiguous Constructor Calls:
```java
// WRONG
public class Number {
    int value;

    Number(int value) {
        this.value = value;
    }

    Number(Integer value) {  // Wrapper type
        this.value = value;
    }
}

// Ambiguous! Which constructor?
Number n = new Number(10);  // Could be int or Integer (autoboxing)
```
**Issue:** Autoboxing creates ambiguity between primitive and wrapper constructors

#### ✅ Right:
```java
// CORRECT - Avoid ambiguity
public class Number {
    int value;

    Number(int value) {
        this.value = value;
    }

    Number(String stringValue) {  // Different type, clear distinction
        this.value = Integer.parseInt(stringValue);
    }
}

Number n1 = new Number(10);      // Calls int constructor
Number n2 = new Number("10");    // Calls String constructor
```

**Why:** Autoboxing can create ambiguity; use clearly different types.

**💡 Tip:** Design constructors with distinct parameter types to avoid ambiguity.

---

### 6. Calling Constructor Mistakes

#### ❌ Wrong - Calling Constructor Like a Method:
```java
// WRONG
public class Student {
    String name;

    Student(String name) {
        this.name = name;
    }

    void resetName() {
        Student("Unknown");  // Compilation error! Can't call constructor like method
    }
}
```
**Issue:** Constructors can only be called with `new` keyword or `this()`

#### ✅ Right:
```java
// CORRECT - Reinitialize fields directly
public class Student {
    String name;

    Student(String name) {
        this.name = name;
    }

    void resetName() {
        this.name = "Unknown";  // Directly set field
    }
}
```

**Why:** Constructors are special; called only during object creation with `new`.

**💡 Tip:** To reset fields, directly assign values; don't try to call constructor.

---

#### ❌ Wrong - Trying to Call Constructor on Existing Object:
```java
// WRONG
Student student = new Student("Alice");
student.Student("Bob");  // Compilation error! Constructor not a method
```
**Issue:** Constructor cannot be called on existing object

#### ✅ Right:
```java
// CORRECT - Create new object OR use setter
Student student = new Student("Alice");

// Option 1: Create new object
student = new Student("Bob");  // New object

// Option 2: Use setter method
public class Student {
    String name;

    Student(String name) {
        this.name = name;
    }

    void setName(String name) {
        this.name = name;
    }
}

student.setName("Bob");  // Modify existing object
```

**Why:** Each constructor call creates a new object; use setters to modify existing objects.

**💡 Tip:** Constructors for creation; setters for modification.

---

### 7. Initialization Issues

#### ❌ Wrong - Partial Initialization in Constructor:
```java
// WRONG (logic error)
public class Employee {
    String name;
    int id;
    double salary;
    String department;

    Employee(String name, int id) {
        this.name = name;
        this.id = id;
        // salary and department remain default (0.0 and null)
    }
}

Employee emp = new Employee("Alice", 101);
System.out.println(emp.department.length());  // NullPointerException!
```
**Issue:** Not initializing all fields; some remain null or zero

#### ✅ Right:
```java
// CORRECT - Initialize all fields
public class Employee {
    String name;
    int id;
    double salary;
    String department;

    Employee(String name, int id) {
        this.name = name;
        this.id = id;
        this.salary = 0.0;              // Explicit initialization
        this.department = "Unassigned";  // Safe default
    }
}

Employee emp = new Employee("Alice", 101);
System.out.println(emp.department.length());  // Works! Returns 10
```

**Why:** Uninitialized reference fields are null; accessing causes NullPointerException.

**💡 Tip:** Initialize all fields in constructor; use safe defaults for optional values.

---

#### ❌ Wrong - Not Validating Constructor Parameters:
```java
// WRONG
public class Rectangle {
    double length;
    double width;

    Rectangle(double length, double width) {
        this.length = length;  // What if negative?
        this.width = width;
    }
}

Rectangle rect = new Rectangle(-5, -10);  // Invalid! Negative dimensions
System.out.println(rect.calculateArea());  // Positive (incorrect)!
```
**Issue:** Accepting invalid values without validation

#### ✅ Right:
```java
// CORRECT - Validate parameters
public class Rectangle {
    double length;
    double width;

    Rectangle(double length, double width) {
        if (length <= 0 || width <= 0) {
            throw new IllegalArgumentException("Dimensions must be positive");
        }
        this.length = length;
        this.width = width;
    }
}

Rectangle rect = new Rectangle(-5, -10);  // Throws exception!
```

**Why:** Constructors should ensure object created in valid state; validate inputs.

**💡 Tip:** Add validation in constructors to prevent invalid object states.

---

### 8. Access Modifier Confusion

#### ❌ Wrong - Private Constructor Without Static Method:
```java
// WRONG (usually)
public class Utility {
    private Utility() {  // Private constructor
    }

    void helperMethod() {
        // ...
    }
}

// Can't create instance!
Utility util = new Utility();  // Compilation error! Constructor is private
```
**Issue:** Private constructor prevents object creation; no way to use class

#### ✅ Right:
```java
// CORRECT - Use for singleton or utility classes
public class Utility {
    private static Utility instance = new Utility();

    private Utility() {  // Private for singleton
    }

    public static Utility getInstance() {
        return instance;
    }

    public void helperMethod() {
        // ...
    }
}

Utility util = Utility.getInstance();  // Access through static method
```

**Why:** Private constructors used for singletons or utility classes; provide static access method.

**💡 Tip:** Private constructor + static method = Singleton pattern or utility class.

---

### 9. Order of Execution Confusion

#### ❌ Wrong - Assuming Constructor Runs Before Field Initialization:
```java
// WRONG (conceptual error)
public class Counter {
    int count = initializeCount();  // Runs BEFORE constructor

    Counter() {
        System.out.println("Constructor: count = " + count);  // Prints: 10
        count = 0;  // Overwrites field initialization!
    }

    int initializeCount() {
        System.out.println("Field init: count = 10");
        return 10;
    }
}

Counter c = new Counter();
// Output: Field init: count = 10
//         Constructor: count = 10
// Final count = 0 (constructor overwrites)
```
**Issue:** Not understanding initialization order: fields → constructor

#### ✅ Right:
```java
// CORRECT - Understand order: field initialization → constructor
public class Counter {
    int count;  // Default: 0

    Counter() {
        count = initializeCount();  // Explicit call in constructor
    }

    int initializeCount() {
        return 10;
    }
}
```

**Why:** Initialization order: (1) Default values (2) Field initializers (3) Constructor body

**💡 Tip:** Fields initialize before constructor runs; constructor can override field initializers.

---

### 10. Inheritance-Related Constructor Mistakes

#### ❌ Wrong - Forgetting super() Call:
```java
// WRONG (implicit super() may fail)
public class Student extends Person {
    int rollNumber;

    Student(String name, int rollNumber) {
        // Implicit super() call here! What if Person has no default constructor?
        this.rollNumber = rollNumber;
    }
}

public class Person {
    String name;

    Person(String name) {  // Only parameterized constructor
        this.name = name;
    }
}

// Compilation error! No default constructor in Person
```
**Issue:** Implicit `super()` fails when parent has no default constructor

#### ✅ Right:
```java
// CORRECT - Explicitly call super()
public class Student extends Person {
    int rollNumber;

    Student(String name, int rollNumber) {
        super(name);  // Explicit call to Person(String)
        this.rollNumber = rollNumber;
    }
}

public class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}
```

**Why:** If no explicit `super()`, Java inserts implicit `super()`; fails if parent has no default constructor.

**💡 Tip:** Explicitly call `super(args)` when parent class has no default constructor.

---

This comprehensive list now contains **35+ Constructor and this keyword mistakes** covering all fundamental concepts!

---

## 🔗 Navigation

### Previous Day
← [Day 8: Introduction to OOP & Classes](day08_oop_classes.md)

### Next Day
→ [Day 10: Methods & Method Overloading](day10_methods_overloading.md)

### Week Overview
↑ [Week 2: Object-Oriented Programming Fundamentals](README.md)

### Course Home
🏠 [Core Java Daily Learning](../README.md)

### Related Topics
- [Day 8: Classes & Objects](day08_oop_classes.md) - Foundation for constructors
- [Day 10: Methods & Method Overloading](day10_methods_overloading.md) - Similar to constructor overloading
- [Day 11: Encapsulation](day11_encapsulation.md) - Using constructors with private fields

### Assessment
📝 [Day 9 Assessment](../../assessments/java/week2/day09_assessment.js) - Test your constructor knowledge

---

**Daily Practice Reminder**: Complete all exercises before moving to the next day. Understanding constructors is crucial for object initialization!

**Estimated Study Time**: 3-4 hours

**Difficulty Level**: ⭐⭐⭐ Intermediate

---

*Last Updated: 2024-01-08*
*Part of Week 2: Object-Oriented Programming Fundamentals*