
# Day 12: Inheritance

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

By the end of Day 12, you will be able to:
- Understand the concept of inheritance
- Use the `extends` keyword to create subclasses
- Understand the IS-A relationship
- Use the `super` keyword effectively
- Override methods from parent class
- Understand method overriding vs overloading
- Work with the Object class
- Apply inheritance best practices
- Understand types of inheritance in Java

---

## 📚 Topics Covered

### 1. What is Inheritance?

**Inheritance** is a mechanism where a new class (child/subclass) acquires properties and behaviors of an existing class (parent/superclass).

#### Key Concepts:
- **Code Reusability**: Reuse code from existing classes
- **IS-A Relationship**: Subclass IS-A type of superclass
- **Hierarchical Classification**: Organize classes in hierarchy
- **Extensibility**: Add new features to existing code

#### Real-World Analogy:
Think of **biological inheritance** - a child inherits characteristics from parents (eye color, height) but can also have unique characteristics.

#### Syntax:
```java
class Parent {
    // Parent class members
}

class Child extends Parent {
    // Child class members
    // Inherits all non-private members from Parent
}
```

#### Basic Example:
```java
// Parent class (Superclass)
public class Animal {
    String name;
    int age;
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class (Subclass)
public class Dog extends Animal {
    String breed;
    
    public void bark() {
        System.out.println(name + " is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.name = "Buddy";
        dog.age = 3;
        dog.breed = "Golden Retriever";
        
        // Inherited methods
        dog.eat();
        dog.sleep();
        
        // Own method
        dog.bark();
    }
}
```

**Output:**
```
Buddy is eating
Buddy is sleeping
Buddy is barking
```

---

### 2. The `extends` Keyword

The **`extends`** keyword is used to inherit from a class.

#### Rules:
- Java supports **single inheritance** (one parent class only)
- A class can have multiple children
- Inheritance is transitive (A→B→C means C inherits from A through B)

#### Example: Single Inheritance
```java
public class Vehicle {
    String brand;
    int year;
    
    public void start() {
        System.out.println("Vehicle starting...");
    }
    
    public void stop() {
        System.out.println("Vehicle stopping...");
    }
}

public class Car extends Vehicle {
    int numberOfDoors;
    
    public void honk() {
        System.out.println("Car honking!");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.brand = "Toyota";
        car.year = 2023;
        car.numberOfDoors = 4;
        
        car.start();  // Inherited
        car.honk();   // Own method
        car.stop();   // Inherited
    }
}
```

#### Example: Multilevel Inheritance
```java
// Level 1
public class LivingBeing {
    public void breathe() {
        System.out.println("Breathing...");
    }
}

// Level 2
public class Animal extends LivingBeing {
    public void eat() {
        System.out.println("Eating...");
    }
}

// Level 3
public class Dog extends Animal {
    public void bark() {
        System.out.println("Barking...");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.breathe();  // From LivingBeing
        dog.eat();      // From Animal
        dog.bark();     // From Dog
    }
}
```

---

### 3. The IS-A Relationship

**IS-A** relationship represents inheritance. If class B extends class A, then B IS-A A.

#### Examples:
- Dog IS-A Animal
- Car IS-A Vehicle
- Student IS-A Person
- Circle IS-A Shape

#### Testing IS-A Relationship:
```java
public class Person {
    String name;
    int age;
}

public class Student extends Person {
    String studentId;
    double gpa;
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        
        // Student IS-A Person (true)
        // Student IS-A Student (true)
        // Student IS-A Object (true - all classes inherit from Object)
        
        // Can assign subclass to superclass reference
        Person person = student;  // Valid - Student IS-A Person
        
        System.out.println("student is Person: " + (student instanceof Person));
        System.out.println("student is Student: " + (student instanceof Student));
        System.out.println("student is Object: " + (student instanceof Object));
    }
}
```

**Output:**
```
student is Person: true
student is Student: true
student is Object: true
```

---

### 4. The `super` Keyword

The **`super`** keyword refers to the parent class object.

#### Uses of `super`:

**1. Access Parent Class Variables:**
```java
public class Parent {
    String name = "Parent";
}

public class Child extends Parent {
    String name = "Child";
    
    public void display() {
        System.out.println("Child name: " + name);
        System.out.println("Parent name: " + super.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Child child = new Child();
        child.display();
    }
}
```

**Output:**
```
Child name: Child
Parent name: Parent
```

**2. Call Parent Class Methods:**
```java
public class Parent {
    public void display() {
        System.out.println("Parent display method");
    }
}

public class Child extends Parent {
    public void display() {
        super.display();  // Call parent method
        System.out.println("Child display method");
    }
}

public class Main {
    public static void main(String[] args) {
        Child child = new Child();
        child.display();
    }
}
```

**Output:**
```
Parent display method
Child display method
```

**3. Call Parent Class Constructor:**
```java
public class Parent {
    String name;
    
    public Parent(String name) {
        this.name = name;
        System.out.println("Parent constructor called");
    }
}

public class Child extends Parent {
    int age;
    
    public Child(String name, int age) {
        super(name);  // Must be first statement
        this.age = age;
        System.out.println("Child constructor called");
    }
    
    public void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Child child = new Child("Alice", 25);
        child.display();
    }
}
```

**Output:**
```
Parent constructor called
Child constructor called
Name: Alice
Age: 25
```

---

### 5. Method Overriding

**Method overriding** occurs when a subclass provides a specific implementation of a method already defined in its parent class.

#### Rules for Method Overriding:
1. Method name must be same
2. Parameters must be same
3. Return type must be same or covariant
4. Access modifier cannot be more restrictive
5. Cannot override final methods
6. Cannot override static methods (hiding occurs instead)

#### Basic Example:
```java
public class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

public class Dog extends Animal {
    @Override  // Annotation (optional but recommended)
    public void makeSound() {
        System.out.println("Dog barks");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();
        Dog dog = new Dog();
        Cat cat = new Cat();
        
        animal.makeSound();
        dog.makeSound();
        cat.makeSound();
    }
}
```

**Output:**
```
Animal makes a sound
Dog barks
Cat meows
```

#### @Override Annotation:
```java
public class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    @Override  // Compiler checks if method actually overrides
    public void display() {
        System.out.println("Child");
    }
    
    // @Override  // Compilation error - no such method in parent
    // public void show() {
    //     System.out.println("Show");
    // }
}
```

#### Calling Parent Method from Overridden Method:
```java
public class BankAccount {
    protected double balance;
    
    public void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited: $" + amount);
    }
}

public class SavingsAccount extends BankAccount {
    private double interestRate = 0.05;
    
    @Override
    public void deposit(double amount) {
        super.deposit(amount);  // Call parent method
        double interest = amount * interestRate;
        balance += interest;
        System.out.println("Interest added: $" + interest);
    }
}

public class Main {
    public static void main(String[] args) {
        SavingsAccount account = new SavingsAccount();
        account.deposit(1000);
        System.out.println("Total balance: $" + account.balance);
    }
}
```

**Output:**
```
Deposited: $1000.0
Interest added: $50.0
Total balance: $1050.0
```

---

### 6. Method Overriding vs Method Overloading

| Feature | Overriding | Overloading |
|---------|-----------|-------------|
| **Definition** | Redefining parent method in child | Multiple methods with same name, different parameters |
| **Occurs in** | Different classes (inheritance) | Same class or inherited class |
| **Parameters** | Must be same | Must be different |
| **Return type** | Same or covariant | Can be different |
| **Binding** | Runtime (dynamic) | Compile-time (static) |
| **Purpose** | Provide specific implementation | Provide multiple ways to call method |

#### Example Showing Both:
```java
public class Calculator {
    // Overloading - same class, different parameters
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public void display() {
        System.out.println("Calculator");
    }
}

public class ScientificCalculator extends Calculator {
    // Overriding - different class, same signature
    @Override
    public void display() {
        System.out.println("Scientific Calculator");
    }
    
    // Overloading in child class
    public double add(double a, double b, double c) {
        return a + b + c;
    }
}
```

---

### 7. The Object Class

Every class in Java implicitly extends the **Object** class. It's the root of the class hierarchy.

#### Important Object Class Methods:

**1. toString():**
```java
public class Person {
    String name;
    int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person("Alice", 25);
        System.out.println(person);  // Calls toString()
    }
}
```

**Output:**
```
Person{name='Alice', age=25}
```

**2. equals():**
```java
public class Person {
    String name;
    int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person("Alice", 25);
        Person p3 = new Person("Bob", 30);
        
        System.out.println("p1 equals p2: " + p1.equals(p2));
        System.out.println("p1 equals p3: " + p1.equals(p3));
    }
}
```

**Output:**
```
p1 equals p2: true
p1 equals p3: false
```

**3. hashCode():**
```java
public class Person {
    String name;
    int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + age;
        return result;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }
}
```

---

### 8. Types of Inheritance

#### 1. Single Inheritance:
One class extends one parent class.
```java
class A { }
class B extends A { }
```

#### 2. Multilevel Inheritance:
Chain of inheritance.
```java
class A { }
class B extends A { }
class C extends B { }
```

#### 3. Hierarchical Inheritance:
Multiple classes extend one parent.
```java
class A { }
class B extends A { }
class C extends A { }
class D extends A { }
```

#### 4. Multiple Inheritance (NOT supported with classes):
Java doesn't support multiple inheritance with classes to avoid diamond problem.
```java
// NOT ALLOWED in Java
// class C extends A, B { }  // Compilation error

// Use interfaces instead (covered in Day 14)
```

#### Complete Example:
```java
// Single + Multilevel + Hierarchical
public class Vehicle {
    public void start() {
        System.out.println("Vehicle starting");
    }
}

// Hierarchical - Multiple classes extend Vehicle
public class Car extends Vehicle {
    public void drive() {
        System.out.println("Car driving");
    }
}

public class Bike extends Vehicle {
    public void ride() {
        System.out.println("Bike riding");
    }
}

// Multilevel - SportsCar extends Car which extends Vehicle
public class SportsCar extends Car {
    public void turboBoost() {
        System.out.println("Turbo boost activated!");
    }
}

public class Main {
    public static void main(String[] args) {
        SportsCar sportsCar = new SportsCar();
        sportsCar.start();      // From Vehicle
        sportsCar.drive();      // From Car
        sportsCar.turboBoost(); // From SportsCar
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Employee Hierarchy
Create an employee hierarchy with different employee types.

```java
// Base class
public class Employee {
    protected String employeeId;
    protected String name;
    protected double baseSalary;
    
    public Employee(String employeeId, String name, double baseSalary) {
        this.employeeId = employeeId;
        this.name = name;
        this.baseSalary = baseSalary;
    }
    
    public double calculateSalary() {
        return baseSalary;
    }
    
    public void displayInfo() {
        System.out.println("\n=== Employee Information ===");
        System.out.println("ID: " + employeeId);
        System.out.println("Name: " + name);
        System.out.println("Base Salary: $" + baseSalary);
        System.out.println("Total Salary: $" + calculateSalary());
    }
}

// Manager class
public class Manager extends Employee {
    private double bonus;
    private int teamSize;
    
    public Manager(String employeeId, String name, double baseSalary, double bonus, int teamSize) {
        super(employeeId, name, baseSalary);
        this.bonus = bonus;
        this.teamSize = teamSize;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + bonus;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Bonus: $" + bonus);
        System.out.println("Team Size: " + teamSize);
    }
}

// Developer class
public class Developer extends Employee {
    private String programmingLanguage;
    private int projectsCompleted;
    
    public Developer(String employeeId, String name, double baseSalary, 
                    String programmingLanguage, int projectsCompleted) {
        super(employeeId, name, baseSalary);
        this.programmingLanguage = programmingLanguage;
        this.projectsCompleted = projectsCompleted;
    }
    
    @Override
    public double calculateSalary() {
        double projectBonus = projectsCompleted * 500;
        return baseSalary + projectBonus;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Programming Language: " + programmingLanguage);
        System.out.println("Projects Completed: " + projectsCompleted);
    }
}

// Intern class
public class Intern extends Employee {
    private String university;
    private int duration;  // months
    
    public Intern(String employeeId, String name, double baseSalary, 
                 String university, int duration) {
        super(employeeId, name, baseSalary);
        this.university = university;
        this.duration = duration;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("University: " + university);
        System.out.println("Duration: " + duration + " months");
    }
}

public class TestEmployee {
    public static void main(String[] args) {
        Manager manager = new Manager("M001", "Alice Johnson", 80000, 20000, 10);
        Developer developer = new Developer("D001", "Bob Smith", 70000, "Java", 15);
        Intern intern = new Intern("I001", "Charlie Brown", 2000, "MIT", 6);
        
        manager.displayInfo();
        developer.displayInfo();
        intern.displayInfo();
    }
}
```

---

### Exercise 2: Shape Hierarchy
Create a shape hierarchy with area and perimeter calculations.

```java
// Base class
public class Shape {
    protected String color;
    protected boolean filled;
    
    public Shape(String color, boolean filled) {
        this.color = color;
        this.filled = filled;
    }
    
    public double getArea() {
        return 0.0;
    }
    
    public double getPerimeter() {
        return 0.0;
    }
    
    public void displayInfo() {
        System.out.println("\n=== Shape Information ===");
        System.out.println("Color: " + color);
        System.out.println("Filled: " + filled);
        System.out.println("Area: " + String.format("%.2f", getArea()));
        System.out.println("Perimeter: " + String.format("%.2f", getPerimeter()));
    }
}

// Circle class
public class Circle extends Shape {
    private double radius;
    private final double PI = 3.14159;
    
    public Circle(String color, boolean filled, double radius) {
        super(color, filled);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * PI * radius;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Radius: " + radius);
    }
}

// Rectangle class
public class Rectangle extends Shape {
    private double length;
    private double width;
    
    public Rectangle(String color, boolean filled, double length, double width) {
        super(color, filled);
        this.length = length;
        this.width = width;
    }
    
    @Override
    public double getArea() {
        return length * width;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * (length + width);
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
    }
}

// Triangle class
public class Triangle extends Shape {
    private double side1;
    private double side2;
    private double side3;
    
    public Triangle(String color, boolean filled, double side1, double side2, double side3) {
        super(color, filled);
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    
    @Override
    public double getArea() {
        double s = getPerimeter() / 2;
        return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    }
    
    @Override
    public double getPerimeter() {
        return side1 + side2 + side3;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Sides: " + side1 + ", " + side2 + ", " + side3);
    }
}

public class TestShape {
    public static void main(String[] args) {
        Circle circle = new Circle("Red", true, 5.0);
        Rectangle rectangle = new Rectangle("Blue", false, 4.0, 6.0);
        Triangle triangle = new Triangle("Green", true, 3.0, 4.0, 5.0);
        
        circle.displayInfo();
        rectangle.displayInfo();
        triangle.displayInfo();
    }
}
```

---

### Exercise 3: Vehicle Hierarchy with Polymorphism
Create a vehicle hierarchy demonstrating polymorphism.

```java
// Base class
public class Vehicle {
    protected String brand;
    protected String model;
    protected int year;
    protected double price;
    
    public Vehicle(String brand, String model, int year, double price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
    }
    
    public void start() {
        System.out.println("Vehicle is starting...");
    }
    
    public void stop() {
        System.out.println("Vehicle is stopping...");
    }
    
    public double calculateInsurance() {
        return price * 0.05;  // 5% of price
    }
    
    public void displayInfo() {
        System.out.println("\n=== Vehicle Information ===");
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Price: $" + price);
        System.out.println("Insurance: $" + String.format("%.2f", calculateInsurance()));
    }
}

// Car class
public class Car extends Vehicle {
    private int numberOfDoors;
    private String fuelType;
    
    public Car(String brand, String model, int year, double price, 
              int numberOfDoors, String fuelType) {
        super(brand, model, year, price);
        this.numberOfDoors = numberOfDoors;
        this.fuelType = fuelType;
    }
    
    @Override
    public void start() {
        System.out.println("Car engine starting with key...");
    }
    
    @Override
    public double calculateInsurance() {
        double baseInsurance = super.calculateInsurance();
        if (fuelType.equals("Electric")) {
            return baseInsurance * 0.9;  // 10% discount for electric
        }
        return baseInsurance;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Number of Doors: " + numberOfDoors);
        System.out.println("Fuel Type: " + fuelType);
    }
}

// Motorcycle class
public class Motorcycle extends Vehicle {
    private String type;  // Sport, Cruiser, Touring
    private int engineCC;
    
    public Motorcycle(String brand, String model, int year, double price, 
                     String type, int engineCC) {
        super(brand, model, year, price);
        this.type = type;
        this.engineCC = engineCC;
    }
    
    @Override
    public void start() {
        System.out.println("Motorcycle starting with kick/button...");
    }
    
    @Override
    public double calculateInsurance() {
        double baseInsurance = super.calculateInsurance();
        if (engineCC > 1000) {
            return baseInsurance * 1.2;  // 20% more for high CC
        }
        return baseInsurance;
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Type: " + type);
        System.out.println("Engine CC: " + engineCC);
    }
}

// Truck class
public class Truck extends Vehicle {
    private double loadCapacity;  // in tons
    private int numberOfAxles;
    
    public Truck(String brand, String model, int year, double price, 
                double loadCapacity, int numberOfAxles) {
        super(brand, model, year, price);
        this.loadCapacity = loadCapacity;
        this.numberOfAxles = numberOfAxles;
    }
    
    @Override
    public void start() {
        System.out.println("Truck diesel engine starting...");
    }
    
    @Override
    public double calculateInsurance() {
        double baseInsurance = super.calculateInsurance();
        return baseInsurance + (loadCapacity * 100);  // Additional based on capacity
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Load Capacity: " + loadCapacity + " tons");
        System.out.println("Number of Axles: " + numberOfAxles);
    }
}

public class TestVehicle {
    public static void main(String[] args) {
        Vehicle[] vehicles = {
            new Car("Toyota", "Camry", 2023, 30000, 4, "Hybrid"),
            new Motorcycle("Harley-Davidson", "Street 750", 2023, 8000, "Cruiser", 750),
            new Truck("Ford", "F-150", 2023, 40000, 2.5, 2)
        };
        
        for (Vehicle vehicle : vehicles) {
            vehicle.start();
            vehicle.displayInfo();
            vehicle.stop();
            System.out.println();
        }
    }
}
```

---

### Exercise 4: Bank Account Hierarchy
Create a banking system with different account types.

```java
// Base class
public class BankAccount {
    protected String accountNumber;
    protected String accountHolder;
    protected double balance;
    protected double interestRate;
    
    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.interestRate = 0.01;  // 1% default
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            return true;
        }
        System.out.println("Insufficient balance or invalid amount");
        return false;
    }
    
    public void addInterest() {
        double interest = balance * interestRate;
        balance += interest;
        System.out.println("Interest added: $" + String.format("%.2f", interest));
    }
    
    public void displayInfo() {
        System.out.println("\n=== Account Information ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + String.format("%.2f", balance));
        System.out.println("Interest Rate: " + (interestRate * 100) + "%");
    }
}

// Savings Account
public class SavingsAccount extends BankAccount {
    private int withdrawalLimit;
    private int withdrawalCount;
    
    public SavingsAccount(String accountNumber, String accountHolder, double initialBalance) {
        super(accountNumber, accountHolder, initialBalance);
        this.interestRate = 0.04;  // 4% for savings
        this.withdrawalLimit = 6;
        this.withdrawalCount = 0;
    }
    
    @Override
    public boolean withdraw(double amount) {
        if (withdrawalCount >= withdrawalLimit) {
            System.out.println("Withdrawal limit reached for this period");
            return false;
        }
        
        if (super.withdraw(amount)) {
            withdrawalCount++;
            return true;
        }
        return false;
    }
    
    public void resetWithdrawalCount() {
        withdrawalCount = 0;
        System.out.println("Withdrawal count reset");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Withdrawals: " + withdrawalCount + "/" + withdrawalLimit);
    }
}

// Checking Account
public class CheckingAccount extends BankAccount {
    private double overdraftLimit;
    
private double monthlyFee;
    
    public CheckingAccount(String accountNumber, String accountHolder, double initialBalance) {
        super(accountNumber, accountHolder, initialBalance);
        this.interestRate = 0.005;  // 0.5% for checking
        this.overdraftLimit = 500.0;
        this.monthlyFee = 10.0;
    }
    
    @Override
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= (balance + overdraftLimit)) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            if (balance < 0) {
                System.out.println("WARNING: Overdraft used. Balance: $" + balance);
            }
            return true;
        }
        System.out.println("Amount exceeds overdraft limit");
        return false;
    }
    
    public void chargeMonthlyFee() {
        balance -= monthlyFee;
        System.out.println("Monthly fee charged: $" + monthlyFee);
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Overdraft Limit: $" + overdraftLimit);
        System.out.println("Monthly Fee: $" + monthlyFee);
    }
}

public class TestBankAccount {
    public static void main(String[] args) {
        SavingsAccount savings = new SavingsAccount("SAV001", "Alice", 5000);
        CheckingAccount checking = new CheckingAccount("CHK001", "Bob", 1000);
        
        savings.deposit(1000);
        savings.withdraw(500);
        savings.addInterest();
        savings.displayInfo();
        
        System.out.println("\n" + "=".repeat(40));
        
        checking.deposit(500);
        checking.withdraw(1200);  // Uses overdraft
        checking.chargeMonthlyFee();
        checking.displayInfo();
    }
}
```

---

### Exercise 5: Person Hierarchy
Create a person hierarchy for a university system.

```java
// Base class
public class Person {
    protected String id;
    protected String name;
    protected int age;
    protected String email;
    
    public Person(String id, String name, int age, String email) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
    }
    
    public void displayInfo() {
        System.out.println("\n=== Person Information ===");
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Email: " + email);
    }
    
    @Override
    public String toString() {
        return "Person{id='" + id + "', name='" + name + "'}";
    }
}

// Student class
public class Student extends Person {
    private String major;
    private double gpa;
    private int creditsCompleted;
    
    public Student(String id, String name, int age, String email, String major) {
        super(id, name, age, email);
        this.major = major;
        this.gpa = 0.0;
        this.creditsCompleted = 0;
    }
    
    public void updateGPA(double newGPA) {
        if (newGPA >= 0.0 && newGPA <= 4.0) {
            this.gpa = newGPA;
            System.out.println("GPA updated to: " + gpa);
        }
    }
    
    public void addCredits(int credits) {
        this.creditsCompleted += credits;
        System.out.println("Credits added. Total: " + creditsCompleted);
    }
    
    public String getClassLevel() {
        if (creditsCompleted >= 90) return "Senior";
        else if (creditsCompleted >= 60) return "Junior";
        else if (creditsCompleted >= 30) return "Sophomore";
        else return "Freshman";
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Major: " + major);
        System.out.println("GPA: " + String.format("%.2f", gpa));
        System.out.println("Credits: " + creditsCompleted);
        System.out.println("Class Level: " + getClassLevel());
    }
    
    @Override
    public String toString() {
        return "Student{id='" + id + "', name='" + name + "', major='" + major + "'}";
    }
}

// Professor class
public class Professor extends Person {
    private String department;
    private String specialization;
    private int yearsOfExperience;
    private double salary;
    
    public Professor(String id, String name, int age, String email, 
                    String department, String specialization, int yearsOfExperience) {
        super(id, name, age, email);
        this.department = department;
        this.specialization = specialization;
        this.yearsOfExperience = yearsOfExperience;
        this.salary = 60000 + (yearsOfExperience * 2000);
    }
    
    public void giveRaise(double percentage) {
        salary += salary * (percentage / 100);
        System.out.println("Raise given. New salary: $" + String.format("%.2f", salary));
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Department: " + department);
        System.out.println("Specialization: " + specialization);
        System.out.println("Experience: " + yearsOfExperience + " years");
        System.out.println("Salary: $" + String.format("%.2f", salary));
    }
    
    @Override
    public String toString() {
        return "Professor{id='" + id + "', name='" + name + "', dept='" + department + "'}";
    }
}

// Staff class
public class Staff extends Person {
    private String position;
    private String department;
    private double hourlyRate;
    private int hoursWorked;
    
    public Staff(String id, String name, int age, String email, 
                String position, String department, double hourlyRate) {
        super(id, name, age, email);
        this.position = position;
        this.department = department;
        this.hourlyRate = hourlyRate;
        this.hoursWorked = 0;
    }
    
    public void logHours(int hours) {
        this.hoursWorked += hours;
        System.out.println("Logged " + hours + " hours. Total: " + hoursWorked);
    }
    
    public double calculatePay() {
        return hoursWorked * hourlyRate;
    }
    
    public void resetHours() {
        hoursWorked = 0;
        System.out.println("Hours reset");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Position: " + position);
        System.out.println("Department: " + department);
        System.out.println("Hourly Rate: $" + hourlyRate);
        System.out.println("Hours Worked: " + hoursWorked);
        System.out.println("Total Pay: $" + String.format("%.2f", calculatePay()));
    }
    
    @Override
    public String toString() {
        return "Staff{id='" + id + "', name='" + name + "', position='" + position + "'}";
    }
}

public class TestPerson {
    public static void main(String[] args) {
        Student student = new Student("S001", "Alice Johnson", 20, 
                                     "alice@university.edu", "Computer Science");
        student.updateGPA(3.7);
        student.addCredits(45);
        student.displayInfo();
        
        Professor professor = new Professor("P001", "Dr. Bob Smith", 45, 
                                           "bob@university.edu", "Computer Science", 
                                           "Artificial Intelligence", 15);
        professor.giveRaise(5);
        professor.displayInfo();
        
        Staff staff = new Staff("ST001", "Charlie Brown", 35, 
                               "charlie@university.edu", "IT Support", 
                               "Information Technology", 25.0);
        staff.logHours(40);
        staff.displayInfo();
    }
}
```

---

## 🔑 Key Takeaways

1. **Inheritance**: Mechanism to acquire properties from parent class
2. **extends Keyword**: Used to inherit from a class
3. **IS-A Relationship**: Subclass IS-A type of superclass
4. **super Keyword**: Reference to parent class (variables, methods, constructor)
5. **Method Overriding**: Redefining parent method in child class
6. **@Override Annotation**: Helps catch overriding errors at compile time
7. **Object Class**: Root of all classes in Java
8. **Single Inheritance**: Java supports only single inheritance with classes
9. **Code Reusability**: Main benefit of inheritance
10. **Polymorphism**: Ability to treat child objects as parent type

---

## ⚠️ Common Mistakes

### 1. `extends` Keyword and Inheritance Basics

#### ❌ Wrong - Attempting Multiple Inheritance with Classes:
```java
// WRONG
public class Animal {
    public void eat() {
        System.out.println("Eating");
    }
}

public class Flyable {
    public void fly() {
        System.out.println("Flying");
    }
}

// Compilation error! Java doesn't support multiple inheritance with classes
public class Bird extends Animal, Flyable {
    // ERROR!
}
```
**Issue:** Java prohibits extending multiple classes to avoid diamond problem

#### ✅ Right:
```java
// CORRECT - Use interfaces for multiple inheritance
public class Animal {
    public void eat() {
        System.out.println("Eating");
    }
}

public interface Flyable {
    void fly();
}

public class Bird extends Animal implements Flyable {
    @Override
    public void fly() {
        System.out.println("Flying");
    }
}
```

**Why:** Java supports single class inheritance but multiple interface implementation.

**💡 Tip:** Use interfaces for multiple inheritance; classes for single inheritance only.

---

#### ❌ Wrong - Missing `extends` Keyword:
```java
// WRONG
public class Dog Animal {  // Compilation error! Missing extends
    public void bark() {
        System.out.println("Barking");
    }
}
```
**Issue:** Wrong syntax for inheritance

#### ✅ Right:
```java
// CORRECT
public class Dog extends Animal {
    public void bark() {
        System.out.println("Barking");
    }
}
```

**Why:** Must use `extends` keyword to establish inheritance relationship.

**💡 Tip:** Syntax is always `class Child extends Parent`.

---

#### ❌ Wrong - Extending Final Class:
```java
// WRONG
public final class ImmutableClass {
    private final int value;

    public ImmutableClass(int value) {
        this.value = value;
    }
}

// Compilation error! Cannot extend final class
public class MyClass extends ImmutableClass {
    // ERROR!
}
```
**Issue:** final classes cannot be extended

#### ✅ Right:
```java
// CORRECT - Don't extend final classes
public final class ImmutableClass {
    private final int value;

    public ImmutableClass(int value) {
        this.value = value;
    }
}

// Use composition instead
public class MyClass {
    private ImmutableClass immutable;

    public MyClass(int value) {
        this.immutable = new ImmutableClass(value);
    }
}
```

**Why:** final modifier prevents inheritance; use composition when needed.

**💡 Tip:** final classes are designed to be non-extensible (e.g., String, Integer).

---

#### ❌ Wrong - Circular Inheritance:
```java
// WRONG (conceptual error - won't compile)
public class A extends B {  // A extends B
    // ...
}

public class B extends A {  // B extends A - ERROR! Circular dependency
    // ...
}
```
**Issue:** Classes cannot extend each other circularly

#### ✅ Right:
```java
// CORRECT - Proper hierarchy
public class A {
    // Base class
}

public class B extends A {
    // B extends A
}

public class C extends B {
    // C extends B which extends A
}
```

**Why:** Inheritance must form a directed acyclic graph (tree structure).

**💡 Tip:** Design clear parent-child hierarchies; avoid circular dependencies.

---

#### ❌ Wrong - Using Inheritance for HAS-A Relationship:
```java
// WRONG - Car HAS-A Engine, not IS-A Engine
public class Engine {
    public void start() {
        System.out.println("Engine starting");
    }
}

public class Car extends Engine {  // Wrong relationship!
    // Car is not a type of Engine
}
```
**Issue:** Misusing inheritance for composition relationship

#### ✅ Right:
```java
// CORRECT - Use composition for HAS-A
public class Engine {
    public void start() {
        System.out.println("Engine starting");
    }
}

public class Car {
    private Engine engine;  // Car HAS-A Engine

    public Car() {
        this.engine = new Engine();
    }

    public void start() {
        engine.start();
    }
}
```

**Why:** Inheritance is for IS-A; composition is for HAS-A relationships.

**💡 Tip:** Ask "IS-A" or "HAS-A"? Dog IS-A Animal (extends); Car HAS-A Engine (composition).

---

### 2. Constructor Chaining and super() Mistakes

#### ❌ Wrong - Missing super() When Parent Has No Default Constructor:
```java
// WRONG
public class Parent {
    private String name;

    public Parent(String name) {  // Parameterized constructor, no default
        this.name = name;
    }
}

public class Child extends Parent {
    public Child() {
        // Compilation error! Implicit super() fails because Parent has no default constructor
    }
}
```
**Issue:** Child constructor implicitly calls super() but Parent has no default constructor

#### ✅ Right:
```java
// CORRECT
public class Parent {
    private String name;

    public Parent(String name) {
        this.name = name;
    }
}

public class Child extends Parent {
    public Child() {
        super("Default Name");  // Explicitly call parameterized constructor
    }

    public Child(String name) {
        super(name);  // Pass parameter to parent
    }
}
```

**Why:** If parent has only parameterized constructors, child must explicitly call one.

**💡 Tip:** Always check parent constructors when creating child constructors.

---

#### ❌ Wrong - super() Not as First Statement:
```java
// WRONG
public class Child extends Parent {
    private int age;

    public Child(String name, int age) {
        this.age = age;  // ERROR! Must call super() first
        super(name);     // Compilation error! Must be first statement
    }
}
```
**Issue:** super() must be the very first statement in constructor

#### ✅ Right:
```java
// CORRECT
public class Child extends Parent {
    private int age;

    public Child(String name, int age) {
        super(name);     // First statement
        this.age = age;  // Then initialize child fields
    }
}
```

**Why:** Parent must be constructed before child can initialize its own fields.

**💡 Tip:** super() or this() must always be the first statement in a constructor.

---

#### ❌ Wrong - Calling Both super() and this() in Same Constructor:
```java
// WRONG
public class Child extends Parent {
    public Child() {
        super();         // Compilation error!
        this("Default"); // Cannot call both super() and this()
    }

    public Child(String name) {
        super(name);
    }
}
```
**Issue:** Cannot call both super() and this() in the same constructor

#### ✅ Right:
```java
// CORRECT - Chain through this(), then super()
public class Child extends Parent {
    public Child() {
        this("Default"); // Call other constructor
    }

    public Child(String name) {
        super(name);     // This calls super()
    }
}
```

**Why:** Constructor can delegate to super() OR this(), not both directly.

**💡 Tip:** Use this() to chain to another constructor which calls super().

---

#### ❌ Wrong - Accessing Child Fields Before super():
```java
// WRONG
public class Child extends Parent {
    private int childValue = 10;

    public Child() {
        super(childValue);  // Compilation error! childValue not initialized yet
    }
}
```
**Issue:** Child fields not initialized before super() call

#### ✅ Right:
```java
// CORRECT - Use literal or calculate separately
public class Child extends Parent {
    private int childValue = 10;

    public Child() {
        super(10);  // Use literal or static calculation
    }

    // OR
    public Child(int value) {
        super(value);        // Pass parameter
        this.childValue = value;
    }
}
```

**Why:** Child fields aren't initialized until after parent constructor completes.

**💡 Tip:** super() must use literals, parameters, or static expressions only.

---

#### ❌ Wrong - Forgetting super() with Parent's Important Initialization:
```java
// WRONG
public class Parent {
    private List<String> data;

    public Parent() {
        data = new ArrayList<>();  // Important initialization
        data.add("Initial data");
    }
}

public class Child extends Parent {
    public Child() {
        // No super() call, but default super() is called
        // However, if we override and don't understand it, we might break things
    }
}
```
**Issue:** Not understanding implicit super() behavior

#### ✅ Right:
```java
// CORRECT - Explicitly call super() for clarity
public class Parent {
    protected List<String> data;

    public Parent() {
        data = new ArrayList<>();
        data.add("Initial data");
    }
}

public class Child extends Parent {
    public Child() {
        super();  // Explicit call for clarity (happens implicitly anyway)
        // Parent's data is now initialized
        data.add("Child data");
    }
}
```

**Why:** Make constructor chaining explicit for better code clarity and maintenance.

**💡 Tip:** Explicitly call super() even when implicit, for documentation purposes.

---

### 3. `super` Keyword Usage Errors

#### ❌ Wrong - Using super in Static Context:
```java
// WRONG
public class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    public static void staticMethod() {
        super.display();  // Compilation error! Cannot use super in static context
    }
}
```
**Issue:** super refers to instance; cannot use in static methods

#### ✅ Right:
```java
// CORRECT - Use instance methods
public class Child extends Parent {
    public void instanceMethod() {
        super.display();  // OK in instance method
    }

    public static void staticMethod() {
        Child child = new Child();
        child.display();  // Call through instance
    }
}
```

**Why:** super is instance-specific; static methods have no instance context.

**💡 Tip:** super, this, and instance members cannot be used in static context.

---

#### ❌ Wrong - Confusing super and this:
```java
// WRONG (logic error)
public class Parent {
    protected String name = "Parent";
}

public class Child extends Parent {
    private String name = "Child";

    public void display() {
        System.out.println(super.name);  // Accesses parent's name
        System.out.println(this.name);   // Accesses child's name
        System.out.println(name);        // Accesses child's name (this.name)
    }
}
```
**Issue:** Not understanding which field is accessed with super vs this

#### ✅ Right:
```java
// CORRECT - Understand the distinction
public class Parent {
    protected String name = "Parent";
}

public class Child extends Parent {
    private String childName = "Child";  // Different name to avoid confusion

    public void display() {
        System.out.println("Parent name: " + super.name);     // Parent's field
        System.out.println("Child name: " + this.childName);  // Child's field
    }
}
```

**Why:** super accesses parent's members; this accesses current object's members.

**💡 Tip:** Avoid same field names in parent and child to reduce confusion.

---

#### ❌ Wrong - Using super to Access Private Parent Members:
```java
// WRONG
public class Parent {
    private int value = 10;  // Private!
}

public class Child extends Parent {
    public void display() {
        System.out.println(super.value);  // Compilation error! value is private
    }
}
```
**Issue:** super cannot access private members of parent

#### ✅ Right:
```java
// CORRECT - Use protected or provide getter
public class Parent {
    protected int value = 10;  // Protected or public

    // OR provide getter
    private int privateValue = 10;

    protected int getValue() {
        return privateValue;
    }
}

public class Child extends Parent {
    public void display() {
        System.out.println(super.value);      // OK if protected
        System.out.println(super.getValue()); // OK - calls parent's getter
    }
}
```

**Why:** private members are not inherited; use protected or getters for child access.

**💡 Tip:** Use protected for fields that subclasses need to access.

---

#### ❌ Wrong - Chaining super Calls Incorrectly:
```java
// WRONG
public class GrandParent {
    public void display() {
        System.out.println("GrandParent");
    }
}

public class Parent extends GrandParent {
    @Override
    public void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    public void display() {
        super.super.display();  // Compilation error! Cannot chain super
    }
}
```
**Issue:** Cannot use super.super to skip levels

#### ✅ Right:
```java
// CORRECT - super only refers to immediate parent
public class Child extends Parent {
    @Override
    public void display() {
        super.display();  // Calls Parent's display
        System.out.println("Child");
    }
}

// If you need GrandParent's method, Parent must expose it
public class Parent extends GrandParent {
    @Override
    public void display() {
        System.out.println("Parent");
    }

    public void displayGrandParent() {
        super.display();  // Calls GrandParent's display
    }
}
```

**Why:** super only accesses immediate parent; multilevel access requires parent cooperation.

**💡 Tip:** super refers to direct parent only; design hierarchy accordingly.

---

### 4. Method Overriding Mistakes

#### ❌ Wrong - Overriding Method with Different Signature:
```java
// WRONG - This is overloading, not overriding!
public class Parent {
    public void display(int x) {
        System.out.println("Parent: " + x);
    }
}

public class Child extends Parent {
    @Override  // Compilation error! No such method in parent to override
    public void display(String x) {  // Different parameter type
        System.out.println("Child: " + x);
    }
}
```
**Issue:** Different parameters = overloading, not overriding

#### ✅ Right:
```java
// CORRECT - Exact same signature for overriding
public class Child extends Parent {
    @Override
    public void display(int x) {  // Same parameter type
        System.out.println("Child: " + x);
    }
}
```

**Why:** Overriding requires exact same method signature (name + parameters).

**💡 Tip:** Use @Override to catch signature mismatches at compile time.

---

#### ❌ Wrong - Overriding with Incompatible Return Type:
```java
// WRONG
public class Parent {
    public String getName() {
        return "Parent";
    }
}

public class Child extends Parent {
    @Override  // Compilation error! Incompatible return type
    public int getName() {
        return 10;
    }
}
```
**Issue:** Return type must be same or covariant (subtype)

#### ✅ Right:
```java
// CORRECT - Same or covariant return type
public class Parent {
    public Object getData() {
        return "Parent";
    }
}

public class Child extends Parent {
    @Override
    public String getData() {  // String is subtype of Object (covariant)
        return "Child";
    }
}
```

**Why:** Return type must be same or more specific (covariant) for valid override.

**💡 Tip:** Same type is safest; covariant types allowed for flexibility.

---

#### ❌ Wrong - Reducing Access Modifier Visibility:
```java
// WRONG
public class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    @Override  // Compilation error! Cannot reduce visibility
    protected void display() {  // More restrictive than public
        System.out.println("Child");
    }
}
```
**Issue:** Cannot make overridden method more restrictive

#### ✅ Right:
```java
// CORRECT - Same or less restrictive
public class Child extends Parent {
    @Override
    public void display() {  // Same level (public)
        System.out.println("Child");
    }
}

// OR less restrictive (not common but allowed)
public class Parent {
    protected void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    @Override
    public void display() {  // Less restrictive (public > protected)
        System.out.println("Child");
    }
}
```

**Why:** Liskov Substitution Principle: child must be usable where parent is expected.

**💡 Tip:** Access hierarchy: private < default < protected < public.

---

#### ❌ Wrong - Not Using @Override Annotation:
```java
// WRONG (risky)
public class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    // Typo! Creates new method instead of overriding
    public void dispaly() {  // Missing 'l' - won't override
        System.out.println("Child");
    }
}

Parent p = new Child();
p.display();  // Prints "Parent" - not overridden!
```
**Issue:** Typo creates new method; no compiler error without @Override

#### ✅ Right:
```java
// CORRECT - Use @Override to catch typos
public class Child extends Parent {
    @Override  // Compiler will catch typo!
    public void display() {  // Correct spelling
        System.out.println("Child");
    }
}
```

**Why:** @Override annotation makes compiler verify method actually overrides parent method.

**💡 Tip:** Always use @Override annotation when overriding methods.

---

#### ❌ Wrong - Overriding and Throwing Broader Exception:
```java
// WRONG
public class Parent {
    public void read() throws IOException {
        // Read file
    }
}

public class Child extends Parent {
    @Override  // Compilation error! Cannot throw broader exception
    public void read() throws Exception {  // Exception is broader than IOException
        // Read file
    }
}
```
**Issue:** Overriding method cannot throw broader checked exceptions

#### ✅ Right:
```java
// CORRECT - Same or narrower exceptions
public class Child extends Parent {
    @Override
    public void read() throws IOException {  // Same exception
        // Read file
    }

    // OR narrower
    @Override
    public void read() throws FileNotFoundException {  // Subtype of IOException
        // Read file
    }

    // OR no exception
    @Override
    public void read() {  // No exception declared
        try {
            // Read file
        } catch (IOException e) {
            // Handle internally
        }
    }
}
```

**Why:** Overriding method must maintain or strengthen the contract (same/narrower exceptions).

**💡 Tip:** Can throw same, subtype, or no checked exception when overriding.

---

#### ❌ Wrong - Overriding final Methods:
```java
// WRONG
public class Parent {
    public final void display() {  // final method
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    @Override  // Compilation error! Cannot override final method
    public void display() {
        System.out.println("Child");
    }
}
```
**Issue:** final methods cannot be overridden

#### ✅ Right:
```java
// CORRECT - Don't override final methods
public class Parent {
    public final void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    // Don't override display()
    // Can add new methods
    public void show() {
        System.out.println("Child");
    }
}
```

**Why:** final keyword prevents method from being overridden in subclasses.

**💡 Tip:** Use final for methods that shouldn't be changed by subclasses.

---

### 5. Overriding vs Overloading Confusion

#### ❌ Wrong - Thinking Different Parameters is Overriding:
```java
// WRONG understanding
public class Parent {
    public void display(int x) {
        System.out.println("Parent: " + x);
    }
}

public class Child extends Parent {
    // Student thinks this overrides Parent's display
    public void display(String x) {  // This is OVERLOADING, not overriding!
        System.out.println("Child: " + x);
    }
}

Child c = new Child();
c.display(10);     // Calls Parent's display(int)
c.display("Hi");   // Calls Child's display(String)
```
**Issue:** Different parameters = overloading, not overriding

#### ✅ Right:
```java
// CORRECT understanding
public class Child extends Parent {
    // Overloading: different parameter
    public void display(String x) {
        System.out.println("Child String: " + x);
    }

    // Overriding: same signature as parent
    @Override
    public void display(int x) {
        System.out.println("Child int: " + x);
    }
}
```

**Why:** Overriding = same signature; Overloading = different parameters.

**💡 Tip:** Overriding replaces parent method; overloading adds new method version.

---

#### ❌ Wrong - Expecting Overloaded Method to Override:
```java
// WRONG (conceptual)
public class Parent {
    public void process(Object obj) {
        System.out.println("Parent Object: " + obj);
    }
}

public class Child extends Parent {
    // Student expects this to override Parent's process(Object)
    public void process(String str) {  // This OVERLOADS, not overrides!
        System.out.println("Child String: " + str);
    }
}

Parent p = new Child();
p.process("Hello");  // Calls Parent's process(Object), not Child's!
```
**Issue:** Polymorphism doesn't work without actual overriding

#### ✅ Right:
```java
// CORRECT - Override with exact signature
public class Child extends Parent {
    @Override
    public void process(Object obj) {  // Exact signature - overrides
        if (obj instanceof String) {
            System.out.println("Child String: " + obj);
        } else {
            System.out.println("Child Object: " + obj);
        }
    }
}

Parent p = new Child();
p.process("Hello");  // Calls Child's overridden method
```

**Why:** Overriding requires exact signature for polymorphic behavior.

**💡 Tip:** Use @Override and exact signature for runtime polymorphism.

---

#### ❌ Wrong - Mixing Static Overloading with Instance Overriding:
```java
// WRONG understanding
public class Parent {
    public void display() {
        System.out.println("Parent instance");
    }

    public static void show() {
        System.out.println("Parent static");
    }
}

public class Child extends Parent {
    // Overloading (different parameter)
    public void display(int x) {
        System.out.println("Child instance: " + x);
    }

    // Method hiding, not overriding (static methods)
    public static void show() {
        System.out.println("Child static");
    }
}
```
**Issue:** Static methods are hidden, not overridden (covered later)

#### ✅ Right:
```java
// CORRECT understanding
public class Child extends Parent {
    // Instance method overriding
    @Override
    public void display() {
        System.out.println("Child instance");
    }

    // Static method hiding (not overriding)
    public static void show() {
        System.out.println("Child static");
    }
}

Child c = new Child();
c.display();      // Calls Child's overridden display()
Child.show();     // Calls Child's static show()
Parent.show();    // Calls Parent's static show()
```

**Why:** Instance methods override; static methods hide (method hiding, not overriding).

**💡 Tip:** Overriding is for instance methods; static methods use method hiding.

---

### 6. Access Modifier Issues in Inheritance

#### ❌ Wrong - Accessing Parent's Private Fields Directly:
```java
// WRONG
public class Parent {
    private int value = 10;  // Private field
}

public class Child extends Parent {
    public void display() {
        System.out.println(value);  // Compilation error! Cannot access private field
    }
}
```
**Issue:** private members are not inherited and cannot be accessed

#### ✅ Right:
```java
// CORRECT - Use protected or getter
public class Parent {
    protected int value = 10;  // Protected - accessible in subclasses

    // OR provide getter
    private int privateValue = 10;

    protected int getPrivateValue() {
        return privateValue;
    }
}

public class Child extends Parent {
    public void display() {
        System.out.println(value);              // OK with protected
        System.out.println(getPrivateValue());  // OK with getter
    }
}
```

**Why:** private members are class-private; use protected for subclass access.

**💡 Tip:** Use protected for fields/methods that subclasses need to access.

---

#### ❌ Wrong - Misunderstanding Protected Access:
```java
// WRONG understanding
package com.example.parent;

public class Parent {
    protected int value = 10;
}

// Different package
package com.example.other;
import com.example.parent.Parent;

public class NotChild {
    public void test() {
        Parent p = new Parent();
        System.out.println(p.value);  // Compilation error! Cannot access
    }
}
```
**Issue:** protected is not accessible in different package without inheritance

#### ✅ Right:
```java
// CORRECT - Protected accessible in subclass even across packages
package com.example.other;
import com.example.parent.Parent;

public class Child extends Parent {
    public void test() {
        System.out.println(value);       // OK - inherited protected field
        System.out.println(this.value);  // OK - through this

        // But cannot access through other Parent instances
        Parent p = new Parent();
        // System.out.println(p.value);  // ERROR! Not accessible this way
    }
}
```

**Why:** protected is accessible in subclasses across packages, but only through this/super.

**💡 Tip:** protected = package + subclasses (through inheritance, not instances).

---

#### ❌ Wrong - Making Overridden Method Private:
```java
// WRONG
public class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    @Override  // Compilation error! Cannot reduce visibility
    private void display() {
        System.out.println("Child");
    }
}
```
**Issue:** Cannot make overridden method more restrictive

#### ✅ Right:
```java
// CORRECT - Keep same or less restrictive
public class Child extends Parent {
    @Override
    public void display() {  // Same visibility
        System.out.println("Child");
    }
}
```

**Why:** Subclass must honor parent's contract; cannot reduce accessibility.

**💡 Tip:** Visibility can stay same or increase, never decrease when overriding.

---

#### ❌ Wrong - Confusing Default (Package-Private) Access:
```java
// WRONG understanding
// File: com/example/Parent.java
package com.example;

public class Parent {
    void display() {  // Default (package-private)
        System.out.println("Parent");
    }
}

// File: com/other/Child.java
package com.other;
import com.example.Parent;

public class Child extends Parent {
    @Override  // Compilation error! Method not visible in different package
    void display() {
        System.out.println("Child");
    }
}
```
**Issue:** Default access not visible across packages, even with inheritance

#### ✅ Right:
```java
// CORRECT - Use protected or public for cross-package inheritance
package com.example;

public class Parent {
    protected void display() {  // Protected - accessible in subclasses
        System.out.println("Parent");
    }
}

package com.other;
import com.example.Parent;

public class Child extends Parent {
    @Override
    protected void display() {  // Can override now
        System.out.println("Child");
    }
}
```

**Why:** Default access is package-private; won't work for subclasses in different packages.

**💡 Tip:** Use protected for methods intended to be overridden across packages.

---

### 7. final Keyword Mistakes

#### ❌ Wrong - Attempting to Override final Method:
```java
// WRONG
public class Parent {
    public final void calculate() {
        System.out.println("Parent calculation");
    }
}

public class Child extends Parent {
    @Override  // Compilation error! Cannot override final method
    public void calculate() {
        System.out.println("Child calculation");
    }
}
```
**Issue:** final methods cannot be overridden

#### ✅ Right:
```java
// CORRECT - Don't override; create new method
public class Child extends Parent {
    // Don't override calculate()

    public void calculateNew() {
        System.out.println("Child calculation");
    }
}
```

**Why:** final prevents method modification in subclasses.

**💡 Tip:** Use final for template methods that must not change.

---

#### ❌ Wrong - Extending final Class:
```java
// WRONG
public final class UtilityClass {
    public static void helper() {
        System.out.println("Helper");
    }
}

// Compilation error! Cannot extend final class
public class MyUtility extends UtilityClass {
    // ERROR!
}
```
**Issue:** final classes cannot be extended

#### ✅ Right:
```java
// CORRECT - Use composition or utility methods
public final class UtilityClass {
    public static void helper() {
        System.out.println("Helper");
    }
}

public class MyUtility {
    // Use composition
    public void myHelper() {
        UtilityClass.helper();  // Call static method
        System.out.println("My helper");
    }
}
```

**Why:** final class design prevents extension (e.g., String, Integer).

**💡 Tip:** final classes are immutable designs; use them, don't extend them.

---

#### ❌ Wrong - Misunderstanding final in Inheritance Context:
```java
// WRONG (conceptual)
public class Parent {
    public final int value = 10;  // final field
}

public class Child extends Parent {
    public Child() {
        super();
        value = 20;  // Compilation error! Cannot assign to final field
    }
}
```
**Issue:** final fields cannot be modified, even in subclass

#### ✅ Right:
```java
// CORRECT - Accept final field value from parent
public class Parent {
    public final int value;

    public Parent(int value) {
        this.value = value;  // Initialize final field
    }
}

public class Child extends Parent {
    public Child(int value) {
        super(value);  // Pass to parent constructor
        // Cannot modify value after construction
    }
}
```

**Why:** final fields are immutable after initialization.

**💡 Tip:** final fields initialized once (declaration or constructor), never changed.

---

### 8. IS-A Relationship Violations

#### ❌ Wrong - Violating IS-A Relationship:
```java
// WRONG - Square IS-NOT-A Rectangle (mathematically wrong for mutable objects)
public class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;  // Force square constraint
    }

    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}

// Breaks Liskov Substitution Principle:
Rectangle r = new Square();
r.setWidth(5);
r.setHeight(10);  // Square becomes non-square!
```
**Issue:** Square cannot truly substitute Rectangle due to different invariants

#### ✅ Right:
```java
// CORRECT - Use composition or separate hierarchies
public class Shape {
    public double getArea() {
        return 0;
    }
}

public class Rectangle extends Shape {
    private int width;
    private int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double getArea() {
        return width * height;
    }
}

public class Square extends Shape {
    private int side;

    public Square(int side) {
        this.side = side;
    }

    @Override
    public double getArea() {
        return side * side;
    }
}
```

**Why:** Inheritance must maintain Liskov Substitution Principle (LSP).

**💡 Tip:** If subclass breaks parent's behavior contract, don't use inheritance.

---

#### ❌ Wrong - Using Inheritance for Code Reuse Without IS-A:
```java
// WRONG - Stack IS-NOT-A ArrayList
public class Stack extends ArrayList<Integer> {
    public void push(int value) {
        add(value);
    }

    public int pop() {
        return remove(size() - 1);
    }
}

// Problem: Stack exposes all ArrayList methods
Stack stack = new Stack();
stack.push(10);
stack.add(0, 20);  // Breaks stack semantics! Can insert anywhere
```
**Issue:** Inheritance exposes all parent methods, breaking encapsulation

#### ✅ Right:
```java
// CORRECT - Use composition for code reuse
public class Stack {
    private List<Integer> data = new ArrayList<>();  // Composition

    public void push(int value) {
        data.add(value);
    }

    public int pop() {
        return data.remove(data.size() - 1);
    }

    public int size() {
        return data.size();
    }

    // Only expose methods that make sense for Stack
}
```

**Why:** Composition provides better encapsulation and control.

**💡 Tip:** Prefer composition over inheritance for code reuse without IS-A.

---

### 9. Object Class Method Mistakes

#### ❌ Wrong - Not Overriding toString() Properly:
```java
// WRONG - Using default Object.toString()
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

Person p = new Person("Alice", 25);
System.out.println(p);  // Prints: Person@15db9742 (not useful!)
```
**Issue:** Default toString() returns class name + hash code

#### ✅ Right:
```java
// CORRECT - Override toString()
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

Person p = new Person("Alice", 25);
System.out.println(p);  // Prints: Person{name='Alice', age=25}
```

**Why:** Custom toString() provides meaningful string representation.

**💡 Tip:** Always override toString() for classes you'll print or debug.

---

#### ❌ Wrong - Overriding equals() Without hashCode():
```java
// WRONG - Breaking equals/hashCode contract
public class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Person) {
            Person other = (Person) obj;
            return this.name.equals(other.name) && this.age == other.age;
        }
        return false;
    }

    // Missing hashCode()! Breaks contract
}

// Problem with HashSet/HashMap:
Person p1 = new Person("Alice", 25);
Person p2 = new Person("Alice", 25);
Set<Person> set = new HashSet<>();
set.add(p1);
System.out.println(set.contains(p2));  // May return false! Broken
```
**Issue:** equals() and hashCode() must be consistent

#### ✅ Right:
```java
// CORRECT - Override both equals() and hashCode()
public class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + age;
        return result;
    }
}
```

**Why:** hashCode() must return same value for equal objects.

**💡 Tip:** Always override hashCode() when overriding equals(); IDEs can generate both.

---

#### ❌ Wrong - equals() Not Handling null or Different Types:
```java
// WRONG - NullPointerException and ClassCastException risks
public class Person {
    private String name;

    @Override
    public boolean equals(Object obj) {
        Person other = (Person) obj;  // Crashes if obj is null or different type!
        return this.name.equals(other.name);
    }
}

Person p = new Person("Alice");
p.equals(null);       // NullPointerException!
p.equals("String");   // ClassCastException!
```
**Issue:** equals() must handle null and different types safely

#### ✅ Right:
```java
// CORRECT - Proper null and type checking
public class Person {
    private String name;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;              // Same reference
        if (obj == null) return false;             // Null check
        if (getClass() != obj.getClass()) return false;  // Type check

        Person person = (Person) obj;              // Safe cast
        return name.equals(person.name);
    }
}
```

**Why:** equals() must be robust against null and wrong types.

**💡 Tip:** Standard pattern: check ==, null, type, then compare fields.

---

### 10. Static Method and Variable Shadowing

#### ❌ Wrong - Thinking Static Methods Override:
```java
// WRONG understanding
public class Parent {
    public static void display() {
        System.out.println("Parent static");
    }
}

public class Child extends Parent {
    // This HIDES parent's static method, doesn't override!
    public static void display() {
        System.out.println("Child static");
    }
}

Parent p = new Child();
p.display();  // Prints "Parent static" - NOT polymorphic!
```
**Issue:** Static methods are hidden, not overridden (no polymorphism)

#### ✅ Right:
```java
// CORRECT understanding - Static methods use method hiding
public class Parent {
    public static void display() {
        System.out.println("Parent static");
    }
}

public class Child extends Parent {
    public static void display() {  // Hides parent's method
        System.out.println("Child static");
    }
}

Parent.display();  // Prints "Parent static"
Child.display();   // Prints "Child static"

Parent p = new Child();
p.display();       // Prints "Parent static" - reference type matters!
```

**Why:** Static methods belong to class, not instance; decided at compile time.

**💡 Tip:** Static methods don't participate in polymorphism; avoid hiding static methods.

---

#### ❌ Wrong - Using @Override with Static Methods:
```java
// WRONG
public class Parent {
    public static void display() {
        System.out.println("Parent static");
    }
}

public class Child extends Parent {
    @Override  // Compilation error! @Override not allowed for static methods
    public static void display() {
        System.out.println("Child static");
    }
}
```
**Issue:** @Override not applicable to static methods (they hide, don't override)

#### ✅ Right:
```java
// CORRECT - Don't use @Override for static
public class Child extends Parent {
    // No @Override annotation
    public static void display() {  // Method hiding, not overriding
        System.out.println("Child static");
    }
}
```

**Why:** @Override is for instance method overriding; static methods hide.

**💡 Tip:** Avoid hiding static methods; give child's static method a different name.

---

#### ❌ Wrong - Variable Shadowing Confusion:
```java
// WRONG understanding
public class Parent {
    public int value = 10;
}

public class Child extends Parent {
    public int value = 20;  // Shadows parent's value
}

Parent p = new Child();
System.out.println(p.value);  // Prints 10, not 20! Reference type matters
```
**Issue:** Variables don't override; they shadow (reference type determines which is accessed)

#### ✅ Right:
```java
// CORRECT - Avoid variable shadowing
public class Parent {
    private int parentValue = 10;

    public int getParentValue() {
        return parentValue;
    }
}

public class Child extends Parent {
    private int childValue = 20;

    public int getChildValue() {
        return childValue;
    }
}

Child c = new Child();
System.out.println(c.getParentValue());  // 10
System.out.println(c.getChildValue());   // 20
```

**Why:** Variable access determined by reference type, not object type.

**💡 Tip:** Use different names for child variables; avoid shadowing parent variables.

---

This comprehensive list now contains **40+ Inheritance mistakes** covering all fundamental concepts!

---

---

## 🔗 Navigation

### Previous Day
← [Day 11: Encapsulation & Access Modifiers](day11_encapsulation.md)

### Next Day
→ [Day 13: Polymorphism](day13_polymorphism.md)

### Week Overview
↑ [Week 2: Object-Oriented Programming Fundamentals](README.md)

### Course Home
🏠 [Core Java Daily Learning](../README.md)

### Related Topics
- [Day 11: Encapsulation](day11_encapsulation.md) - Protected access in inheritance
- [Day 13: Polymorphism](day13_polymorphism.md) - Runtime polymorphism with inheritance
- [Day 14: Abstraction](day14_abstraction.md) - Abstract classes and interfaces

### Assessment
📝 [Day 12 Assessment](../../assessments/java/week2/day12_assessment.js) - Test your inheritance knowledge

---

**Daily Practice Reminder**: Complete all exercises before moving to the next day. Inheritance is a cornerstone of OOP!

**Estimated Study Time**: 4-5 hours

**Difficulty Level**: ⭐⭐⭐⭐ Intermediate-Advanced

---

*Last Updated: 2024-01-08*
*Part of Week 2: Object-Oriented Programming Fundamentals*