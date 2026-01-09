
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
Create a Book class with multiple constructors.

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

---

### Exercise 2: BankAccount with Constructor Chaining
Create a BankAccount class using constructor chaining.

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

---

### Exercise 3: Employee with this Keyword
Create an Employee class demonstrating `this` keyword usage.

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

---

### Exercise 4: Circle with Constructor Overloading
Create a Circle class with overloaded constructors.

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

---

### Exercise 5: Product with Initialization
Create a Product class with proper initialization.

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

---

### Exercise 6: Date Class with Constructor Chaining
Create a Date class with constructor chaining.

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

---

### Exercise 7: Person with Copy Constructor
Create a Person class with a copy constructor.

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

---

### Exercise 8: Box with Volume Calculation
Create a Box class with different constructors.

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

---

### Exercise 9: Student with Builder Pattern
Create a Student class using builder pattern with `this`.

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

---

### Exercise 10: Complex Number with Constructors
Create a ComplexNumber class with various constructors.

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

### 1. Adding Return Type to Constructor:
```java
// WRONG
public void Student() {  // Constructor cannot have return type
    name = "Unknown";
}

// CORRECT
public Student() {
    name = "Unknown";
}
```

### 2. Constructor Name Mismatch:
```java
// WRONG
public class Student {
    public student() {  // Lowercase 's' - not a constructor!
        // This is a regular method
    }
}

// CORRECT
public class Student {
    public Student() {  // Matches class name
        // This is a constructor
    }
}
```

### 3. `this()` Not First Statement:
```java
// WRONG
Student(String name) {
    System.out.println("Creating student");
    this(name, 0);  // ERROR! this() must be first
}

// CORRECT
Student(String name) {
    this(name, 0);  // First statement
    System.out.println("Creating student");
}
```

### 4. Calling Constructor Like Method:
```java
// WRONG
Student s = new Student();
s.Student();  // ERROR! Cannot call constructor like method

// CORRECT
Student s = new Student();  

### 4. Calling Constructor Like Method:
```java
// WRONG
Student s = new Student();
s.Student();  // ERROR! Cannot call constructor like method

// CORRECT
Student s = new Student();  // Constructor called only with 'new'
```

### 5. Forgetting `this` with Same Parameter Names:
```java
// WRONG - Assigns parameter to itself
Student(String name, int age) {
    name = name;  // Does nothing! Parameter shadows instance variable
    age = age;
}

// CORRECT
Student(String name, int age) {
    this.name = name;  // Assigns to instance variable
    this.age = age;
}
```

### 6. Losing Default Constructor:
```java
// WRONG
public class Student {
    String name;
    
    Student(String name) {  // Defined parameterized constructor
        this.name = name;
    }
}

// This will cause error:
Student s = new Student();  // ERROR! No default constructor available

// CORRECT - Provide both if needed
public class Student {
    String name;
    
    Student() {  // Explicit default constructor
        this.name = "Unknown";
    }
    
    Student(String name) {
        this.name = name;
    }
}
```

### 7. Circular Constructor Calls:
```java
// WRONG - Infinite loop
Student() {
    this("Unknown");
}

Student(String name) {
    this();  // ERROR! Circular call
}

// CORRECT
Student() {
    this("Unknown");
}

Student(String name) {
    this.name = name;  // No circular call
}
```

### 8. Multiple `this()` Calls:
```java
// WRONG
Student(String name) {
    this();           // ERROR! Only one this() allowed
    this(name, 0);
}

// CORRECT
Student(String name) {
    this(name, 0);    // Single this() call
}
```

### 9. Not Initializing All Fields:
```java
// WRONG - Some fields uninitialized
Student(String name) {
    this.name = name;
    // rollNumber and age remain 0 (default values)
}

// BETTER - Initialize all fields
Student(String name) {
    this.name = name;
    this.rollNumber = 0;
    this.age = 18;
}
```

### 10. Using `this()` After Other Statements:
```java
// WRONG
Student(String name) {
    System.out.println("Creating student");
    this(name, 0);  // ERROR! this() must be first
}

// CORRECT
Student(String name) {
    this(name, 0);  // First statement
    System.out.println("Creating student");
}
```

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