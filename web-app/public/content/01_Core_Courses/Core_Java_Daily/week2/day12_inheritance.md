
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

### 1. Forgetting super() in Constructor:
```java
// WRONG - Compilation error if parent has no default constructor
public class Child extends Parent {
    public Child(String name) {
        this.name = name;  // ERROR if Parent has no default constructor
    }
}

// CORRECT
public class Child extends Parent {
    public Child(String name) {
        super(name);  // Call parent constructor
    }
}
```

### 2. Calling super() Not as First Statement:
```java
// WRONG
public Child(String name) {
    System.out.println("Creating child");
    super(name);  // ERROR! Must be first statement
}

// CORRECT
public Child(String name) {
    super(name);  // First statement
    System.out.println("Creating child");
}
```

### 3. Trying to Override Private Methods:
```java
public class Parent {
    private void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    // This is NOT overriding, it's a new method
    private void display() {
        System.out.println("Child");
    }
}
```

### 4. Trying to Override Final Methods:
```java
public class Parent {
    public final void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    // @Override  // ERROR! Cannot override final method
    // public void display() {
    //     System.out.println("Child");
    // }
}
```

### 5. Making Overridden Method More Restrictive:
```java
public class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    // @Override  // ERROR! Cannot reduce visibility
    // private void display() {
    //     System.out.println("Child");
    // }
    
    // CORRECT - Same or less restrictive
    @Override
    public void display() {
        System.out.println("Child");
    }
}
```

### 6. Confusing Overriding with Overloading:
```java
public class Parent {
    public void display(int x) {
        System.out.println("Parent: " + x);
    }
}

public class Child extends Parent {
    // This is OVERLOADING, not overriding
    public void display(String x) {
        System.out.println("Child: " + x);
    }
    
    // This is OVERRIDING
    @Override
    public void display(int x) {
        System.out.println("Child: " + x);
    }
}
```

### 7. Not Using @Override Annotation:
```java
public class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

public class Child extends Parent {
    // RISKY - Typo won't be caught
    public void dispaly() {  // Typo! New method, not override
        System.out.println("Child");
    }
    
    // BETTER - Compiler will catch typo
    @Override
    public void display() {
        System.out.println("Child");
    }
}
```

### 8. Trying Multiple Inheritance:
```java
// WRONG - Not allowed in Java
// public class Child extends Parent1, Parent2 {  // ERROR!
// }

// CORRECT - Use interfaces (covered in Day 14)
public class Child extends Parent implements Interface1, Interface2 {
}
```

### 9. Accessing Private Members of Parent:
```java
public class Parent {
    private int value = 10;
}

public class Child extends Parent {
    public void display() {
        // System.out.println(value);  // ERROR! Cannot access private
        // Use protected or provide getter
    }
}
```

### 10. Not Calling super.method() When Needed:
```java
public class Parent {
    public void initialize() {
        System.out.println("Parent initialization");
        // Important setup code
    }
}

public class Child extends Parent {
    @Override
    public void initialize() {
        // WRONG - Parent initialization skipped
        System.out.println("Child initialization");
    }
    
    // CORRECT - Call parent method
    @Override
    public void initialize() {
        super.initialize();  // Call parent first
        System.out.println("Child initialization");
    }
}
```

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