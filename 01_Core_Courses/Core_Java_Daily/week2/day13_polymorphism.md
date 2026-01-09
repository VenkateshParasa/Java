
# Day 13: Polymorphism

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

By the end of Day 13, you will be able to:
- Understand the concept of polymorphism
- Differentiate between compile-time and runtime polymorphism
- Implement method overriding effectively
- Use dynamic method dispatch
- Work with upcasting and downcasting
- Use the `instanceof` operator
- Apply polymorphism in real-world scenarios
- Understand covariant return types
- Work with polymorphic arrays and collections

---

## 📚 Topics Covered

### 1. What is Polymorphism?

**Polymorphism** means "many forms" - the ability of an object to take many forms. It allows one interface to be used for a general class of actions.

#### Key Concepts:
- **One Interface, Multiple Implementations**: Same method name, different behaviors
- **Flexibility**: Write code that works with parent class but executes child class methods
- **Extensibility**: Add new classes without modifying existing code
- **Code Reusability**: Write generic code that works with multiple types

#### Real-World Analogy:
Think of a **remote control** - the same button (interface) performs different actions on different devices:
- TV: Changes channel
- AC: Changes temperature
- Music System: Changes volume

#### Types of Polymorphism in Java:

**1. Compile-Time Polymorphism (Static Binding)**
- Method Overloading
- Operator Overloading (not supported in Java)
- Resolved at compile time

**2. Runtime Polymorphism (Dynamic Binding)**
- Method Overriding
- Resolved at runtime
- Focus of this lesson

---

### 2. Runtime Polymorphism

**Runtime polymorphism** occurs when a method call is resolved at runtime rather than compile time.

#### How It Works:
```java
Parent obj = new Child();  // Upcasting
obj.method();  // Calls Child's method (runtime decision)
```

#### Basic Example:
```java
// Parent class
class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

// Child classes
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks: Woof! Woof!");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows: Meow! Meow!");
    }
}

class Cow extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cow moos: Moo! Moo!");
    }
}

public class Main {
    public static void main(String[] args) {
        // Polymorphism - parent reference, child objects
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();
        Animal animal3 = new Cow();
        
        // Runtime polymorphism in action
        animal1.makeSound();  // Dog barks
        animal2.makeSound();  // Cat meows
        animal3.makeSound();  // Cow moos
    }
}
```

**Output:**
```
Dog barks: Woof! Woof!
Cat meows: Meow! Meow!
Cow moos: Moo! Moo!
```

---

### 3. Dynamic Method Dispatch

**Dynamic Method Dispatch** is the mechanism by which a call to an overridden method is resolved at runtime.

#### How It Works:
1. Java uses the **actual object type** (not reference type) to determine which method to call
2. Decision is made at **runtime** based on the object
3. Enables **runtime polymorphism**

#### Example:
```java
class Shape {
    public void draw() {
        System.out.println("Drawing a shape");
    }
    
    public double getArea() {
        return 0.0;
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double length;
    private double width;
    
    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
    
    @Override
    public double getArea() {
        return length * width;
    }
}

public class Main {
    public static void main(String[] args) {
        // Dynamic method dispatch
        Shape shape;
        
        shape = new Circle(5.0);
        shape.draw();  // Calls Circle's draw()
        System.out.println("Area: " + shape.getArea());
        
        shape = new Rectangle(4.0, 6.0);
        shape.draw();  // Calls Rectangle's draw()
        System.out.println("Area: " + shape.getArea());
    }
}
```

**Output:**
```
Drawing a circle
Area: 78.53981633974483
Drawing a rectangle
Area: 24.0
```

---

### 4. Upcasting and Downcasting

#### Upcasting (Implicit)
**Upcasting** = Converting child class reference to parent class reference (automatic)

```java
class Animal {
    public void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    public void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        
        // Upcasting (implicit/automatic)
        Animal animal = dog;  // Dog IS-A Animal
        
        animal.eat();  // Works - method in Animal
        // animal.bark();  // ERROR - bark() not in Animal
    }
}
```

#### Downcasting (Explicit)
**Downcasting** = Converting parent class reference to child class reference (manual, risky)

```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();  // Upcasting
        
        // Downcasting (explicit)
        Dog dog = (Dog) animal;  // Cast required
        dog.bark();  // Now works
        
        // Dangerous downcasting
        Animal animal2 = new Animal();
        // Dog dog2 = (Dog) animal2;  // ClassCastException at runtime!
    }
}
```

#### Safe Downcasting with instanceof:
```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        
        // Safe downcasting
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();
        }
    }
}
```

---

### 5. The instanceof Operator

The **`instanceof`** operator tests whether an object is an instance of a specific class or interface.

#### Syntax:
```java
object instanceof ClassName
```

#### Examples:
```java
class Animal { }
class Dog extends Animal { }
class Cat extends Animal { }

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        
        // instanceof checks
        System.out.println(animal instanceof Dog);     // true
        System.out.println(animal instanceof Animal);  // true
        System.out.println(animal instanceof Cat);     // false
        System.out.println(animal instanceof Object);  // true (all classes extend Object)
        
        // Null check
        Animal nullAnimal = null;
        System.out.println(nullAnimal instanceof Animal);  // false (null is not instance of anything)
    }
}
```

#### Practical Use Case:
```java
public class AnimalShelter {
    public static void handleAnimal(Animal animal) {
        animal.eat();  // Common method
        
        // Type-specific behavior
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();
        } else if (animal instanceof Cat) {
            Cat cat = (Cat) animal;
            cat.meow();
        }
    }
    
    public static void main(String[] args) {
        handleAnimal(new Dog());
        handleAnimal(new Cat());
    }
}
```

---

### 6. Polymorphic Arrays

Arrays can hold parent class references pointing to child class objects.

#### Example:
```java
class Employee {
    protected String name;
    protected double salary;
    
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    public double calculateBonus() {
        return salary * 0.10;  // 10% default
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Salary: $" + salary);
        System.out.println("Bonus: $" + calculateBonus());
    }
}

class Manager extends Employee {
    public Manager(String name, double salary) {
        super(name, salary);
    }
    
    @Override
    public double calculateBonus() {
        return salary * 0.20;  // 20% for managers
    }
}

class Developer extends Employee {
    public Developer(String name, double salary) {
        super(name, salary);
    }
    
    @Override
    public double calculateBonus() {
        return salary * 0.15;  // 15% for developers
    }
}

public class Main {
    public static void main(String[] args) {
        // Polymorphic array
        Employee[] employees = {
            new Manager("Alice", 80000),
            new Developer("Bob", 70000),
            new Employee("Charlie", 50000),
            new Manager("Diana", 90000),
            new Developer("Eve", 75000)
        };
        
        // Process all employees polymorphically
        double totalBonus = 0;
        for (Employee emp : employees) {
            emp.displayInfo();
            totalBonus += emp.calculateBonus();
            System.out.println("---");
        }
        
        System.out.println("Total Bonus: $" + totalBonus);
    }
}
```

---

### 7. Covariant Return Types

**Covariant return type** allows an overriding method to return a subtype of the type returned by the overridden method.

#### Example:
```java
class Animal {
    public Animal reproduce() {
        System.out.println("Animal reproducing");
        return new Animal();
    }
}

class Dog extends Animal {
    @Override
    public Dog reproduce() {  // Covariant return type (Dog instead of Animal)
        System.out.println("Dog reproducing");
        return new Dog();
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();
        Animal baby1 = animal.reproduce();
        
        Dog dog = new Dog();
        Dog puppy = dog.reproduce();  // Returns Dog, not Animal
    }
}
```

---

### 8. Benefits of Polymorphism

#### 1. Code Flexibility
```java
public class PaymentProcessor {
    public void processPayment(Payment payment) {
        payment.pay();  // Works with any Payment subclass
    }
}

// Can add new payment methods without changing PaymentProcessor
class CreditCard extends Payment { }
class PayPal extends Payment { }
class Bitcoin extends Payment { }
```

#### 2. Code Reusability
```java
public class ShapeDrawer {
    public void drawShapes(Shape[] shapes) {
        for (Shape shape : shapes) {
            shape.draw();  // Works with any Shape subclass
        }
    }
}
```

#### 3. Loose Coupling
```java
// Interface defines contract
interface Database {
    void connect();
    void query(String sql);
}

// Multiple implementations
class MySQL implements Database { }
class PostgreSQL implements Database { }
class MongoDB implements Database { }

// Code depends on interface, not concrete class
public class Application {
    private Database db;
    
    public Application(Database db) {
        this.db = db;  // Works with any Database implementation
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Payment System
Create a polymorphic payment processing system.

```java
// Base class
abstract class Payment {
    protected double amount;
    protected String transactionId;
    
    public Payment(double amount, String transactionId) {
        this.amount = amount;
        this.transactionId = transactionId;
    }
    
    public abstract void processPayment();
    public abstract String getPaymentMethod();
    
    public void displayReceipt() {
        System.out.println("\n=== Payment Receipt ===");
        System.out.println("Transaction ID: " + transactionId);
        System.out.println("Amount: $" + String.format("%.2f", amount));
        System.out.println("Method: " + getPaymentMethod());
    }
}

// Credit Card Payment
class CreditCardPayment extends Payment {
    private String cardNumber;
    private String cardHolder;
    
    public CreditCardPayment(double amount, String transactionId, String cardNumber, String cardHolder) {
        super(amount, transactionId);
        this.cardNumber = maskCardNumber(cardNumber);
        this.cardHolder = cardHolder;
    }
    
    private String maskCardNumber(String cardNumber) {
        return "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
    }
    
    @Override
    public void processPayment() {
        System.out.println("Processing credit card payment...");
        System.out.println("Card Holder: " + cardHolder);
        System.out.println("Card Number: " + cardNumber);
        System.out.println("Payment of $" + amount + " approved!");
    }
    
    @Override
    public String getPaymentMethod() {
        return "Credit Card";
    }
}

// PayPal Payment
class PayPalPayment extends Payment {
    private String email;
    
    public PayPalPayment(double amount, String transactionId, String email) {
        super(amount, transactionId);
        this.email = email;
    }
    
    @Override
    public void processPayment() {
        System.out.println("Processing PayPal payment...");
        System.out.println("PayPal Email: " + email);
        System.out.println("Payment of $" + amount + " sent via PayPal!");
    }
    
    @Override
    public String getPaymentMethod() {
        return "PayPal";
    }
}

// Cash Payment
class CashPayment extends Payment {
    private double amountReceived;
    
    public CashPayment(double amount, String transactionId, double amountReceived) {
        super(amount, transactionId);
        this.amountReceived = amountReceived;
    }
    
    @Override
    public void processPayment() {
        System.out.println("Processing cash payment...");
        System.out.println("Amount Received: $" + amountReceived);
        double change = amountReceived - amount;
        if (change > 0) {
            System.out.println("Change: $" + String.format("%.2f", change));
        }
        System.out.println("Cash payment of $" + amount + " received!");
    }
    
    @Override
    public String getPaymentMethod() {
        return "Cash";
    }
}

// Payment Processor
class PaymentProcessor {
    public void process(Payment payment) {
        payment.processPayment();
        payment.displayReceipt();
    }
    
    public void processMultiple(Payment[] payments) {
        double total = 0;
        for (Payment payment : payments) {
            process(payment);
            total += payment.amount;
        }
        System.out.println("\n=== Total Processed: $" + String.format("%.2f", total) + " ===");
    }
}

public class TestPayment {
    public static void main(String[] args) {
        PaymentProcessor processor = new PaymentProcessor();
        
        Payment[] payments = {
            new CreditCardPayment(150.00, "TXN001", "1234567890123456", "John Doe"),
            new PayPalPayment(75.50, "TXN002", "john@example.com"),
            new CashPayment(50.00, "TXN003", 100.00)
        };
        
        processor.processMultiple(payments);
    }
}
```

---

### Exercise 2: Vehicle Management System
Create a polymorphic vehicle system with different vehicle types.

```java
// Base class
abstract class Vehicle {
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
    
    public abstract void start();
    public abstract void stop();
    public abstract double calculateInsurance();
    public abstract String getVehicleType();
    
    public void displayInfo() {
        System.out.println("\n=== " + getVehicleType() + " Information ===");
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Price: $" + String.format("%.2f", price));
        System.out.println("Insurance: $" + String.format("%.2f", calculateInsurance()));
    }
}

// Car
class Car extends Vehicle {
    private int numberOfDoors;
    private String fuelType;
    
    public Car(String brand, String model, int year, double price, int numberOfDoors, String fuelType) {
        super(brand, model, year, price);
        this.numberOfDoors = numberOfDoors;
        this.fuelType = fuelType;
    }
    
    @Override
    public void start() {
        System.out.println("Car engine starting with key ignition...");
    }
    
    @Override
    public void stop() {
        System.out.println("Car engine stopping...");
    }
    
    @Override
    public double calculateInsurance() {
        double baseInsurance = price * 0.05;
        if (fuelType.equals("Electric")) {
            return baseInsurance * 0.9;  // 10% discount
        }
        return baseInsurance;
    }
    
    @Override
    public String getVehicleType() {
        return "Car";
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Doors: " + numberOfDoors);
        System.out.println("Fuel Type: " + fuelType);
    }
}

// Motorcycle
class Motorcycle extends Vehicle {
    private int engineCC;
    private String type;
    
    public Motorcycle(String brand, String model, int year, double price, int engineCC, String type) {
        super(brand, model, year, price);
        this.engineCC = engineCC;
        this.type = type;
    }
    
    @Override
    public void start() {
        System.out.println("Motorcycle starting with kick/button...");
    }
    
    @Override
    public void stop() {
        System.out.println("Motorcycle engine stopping...");
    }
    
    @Override
    public double calculateInsurance() {
        double baseInsurance = price * 0.04;
        if (engineCC > 1000) {
            return baseInsurance * 1.3;  // 30% more for high CC
        }
        return baseInsurance;
    }
    
    @Override
    public String getVehicleType() {
        return "Motorcycle";
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Engine CC: " + engineCC);
        System.out.println("Type: " + type);
    }
}

// Truck
class Truck extends Vehicle {
    private double loadCapacity;
    private int numberOfAxles;
    
    public Truck(String brand, String model, int year, double price, double loadCapacity, int numberOfAxles) {
        super(brand, model, year, price);
        this.loadCapacity = loadCapacity;
        this.numberOfAxles = numberOfAxles;
    }
    
    @Override
    public void start() {
        System.out.println("Truck diesel engine starting...");
    }
    
    @Override
    public void stop() {
        System.out.println("Truck engine stopping...");
    }
    
    @Override
    public double calculateInsurance() {
        return price * 0.06 + (loadCapacity * 100);
    }
    
    @Override
    public String getVehicleType() {
        return "Truck";
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Load Capacity: " + loadCapacity + " tons");
        System.out.println("Axles: " + numberOfAxles);
    }
}

// Vehicle Manager
class VehicleManager {
    public void startAll(Vehicle[] vehicles) {
        System.out.println("=== Starting All Vehicles ===");
        for (Vehicle vehicle : vehicles) {
            vehicle.start();
        }
    }
    
    public void displayAll(Vehicle[] vehicles) {
        for (Vehicle vehicle : vehicles) {
            vehicle.displayInfo();
        }
    }
    
    public double calculateTotalInsurance(Vehicle[] vehicles) {
        double total = 0;
        for (Vehicle vehicle : vehicles) {
            total += vehicle.calculateInsurance();
        }
        return total;
    }
    
    public void filterByType(Vehicle[] vehicles, String type) {
        System.out.println("\n=== Filtering by: " + type + " ===");
        for (Vehicle vehicle : vehicles) {
            if (vehicle.getVehicleType().equals(type)) {
                vehicle.displayInfo();
            }
        }
    }
}

public class TestVehicle {
    public static void main(String[] args) {
        Vehicle[] vehicles = {
            new Car("Toyota", "Camry", 2023, 30000, 4, "Hybrid"),
            new Motorcycle("Harley-Davidson", "Street 750", 2023, 8000, 750, "Cruiser"),
            new Truck("Ford", "F-150", 2023, 40000, 2.5, 2),
            new Car("Tesla", "Model 3", 2024, 45000, 4, "Electric")
        };
        
        VehicleManager manager = new VehicleManager();
        
        manager.startAll(vehicles);
        manager.displayAll(vehicles);
        
        System.out.println("\n=== Total Insurance: $" + 
                         String.format("%.2f", manager.calculateTotalInsurance(vehicles)) + " ===");
        
        manager.filterByType(vehicles, "Car");
    }
}
```

---

### Exercise 3: Shape Drawing Application
Create a polymorphic shape drawing system.

```java
// Base class
abstract class Shape {
    protected String color;
    protected boolean filled;
    
    public Shape(String color, boolean filled) {
        this.color = color;
        this.filled = filled;
    }
    
    public abstract double getArea();
    public abstract double getPerimeter();
    public abstract void draw();
    
    public void displayInfo() {
        System.out.println("\n=== Shape Information ===");
        System.out.println("Type: " + getClass().getSimpleName());
        System.out.println("Color: " + color);
        System.out.println("Filled: " + filled);
        System.out.println("Area: " + String.format("%.2f", getArea()));
        System.out.println("Perimeter: " + String.format("%.2f", getPerimeter()));
    }
}

// Circle
class Circle extends Shape {
    private double radius;
    
    public Circle(String color, boolean filled, double radius) {
        super(color, filled);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " circle with radius " + radius);
    }
}

// Rectangle
class Rectangle extends Shape {
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
    public void draw() {
        System.out.println("Drawing a " + color + " rectangle " + length + "x" + width);
    }
}

// Triangle
class Triangle extends Shape {
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
    public void draw() {
        System.out.println("Drawing a " + color + " triangle with sides " + 
                         side1 + ", " + side2 + ", " + side3);
    }
}

// Canvas
class Canvas {
    private Shape[] shapes;
    private int count;
    
    public Canvas(int capacity) {
        shapes = new Shape[capacity];
        count = 0;
    }
    
    public void addShape(Shape shape) {
        if (count < shapes.length) {
            shapes[count++] = shape;
            System.out.println("Shape added to canvas");
        } else {
            System.out.println("Canvas is full!");
        }
    }
    
    public void drawAll() {
        System.out.println("\n=== Drawing All Shapes ===");
        for (int i = 0; i < count; i++) {
            shapes[i].draw();
        }
    }
    
    public void displayAll() {
        for (int i = 0; i < count; i++) {
            shapes[i].displayInfo();
        }
    }
    
    public double getTotalArea() {
        double total = 0;
        for (int i = 0; i < count; i++) {
            total += shapes[i].getArea();
        }
        return total;
    }
    
    public void filterByColor(String color) {
        System.out.println("\n=== Shapes with color: " + color + " ===");
        for (int i = 0; i < count; i++) {
            if (shapes[i].color.equalsIgnoreCase(color)) {
                shapes[i].displayInfo();
            }
        }
    }
}

public class TestShape {
    public static void main(String[] args) {
        Canvas canvas = new Canvas(10);
        
        canvas.addShape(new Circle("Red", true, 5.0));
        canvas.addShape(new Rectangle("Blue", false, 4.0, 6.0));
        canvas.addShape(new Triangle("Green", true, 3.0, 4.0, 5.0));
        canvas.addShape(new Circle("Red", false, 3.0));
        
        canvas.drawAll();
        canvas.displayAll();
        
        System.out.println("\n=== Total Area: " + 
                         String.format("%.2f", canvas.getTotalArea()) + " ===");
        
        canvas.filterByColor("Red");
    }
}
```

---

## 🔑 Key Takeaways

1. **Polymorphism**: One interface, multiple implementations
2. **Runtime Polymorphism**: Method calls resolved at runtime based on actual object type
3. **Dynamic Method Dispatch**: Mechanism for runtime polymorphism
4. **Upcasting**: Child to parent (automatic, safe)
5. **Downcasting**: Parent to child (manual, risky)
6. **instanceof**: Check object type before downcasting
7. **Polymorphic Arrays**: Store different subclass objects in parent array
8. **Covariant Return Types**: Override method can return subtype
9. **Benefits**: Flexibility, reusability, extensibility, loose coupling
10. **Method Overriding**: Essential for runtime polymorphism

---

## ⚠️ Common Mistakes

### 1. Accessing Child-Specific Methods Without Downcasting:
```java
// WRONG
Animal animal = new Dog();
animal.bark();  // ERROR! bark() not in Animal

// CORRECT
Animal animal = new Dog();
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.bark();  // Now works
}
```

### 2. Unsafe Downcasting:
```java
// WRONG - ClassCastException
Animal animal = new Animal();
Dog dog = (Dog) animal;  // Runtime error!

// CORRECT - Check first
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
}
```

### 3. Overriding Private Methods:
```java
// WRONG - Private methods cannot be overridden
class Parent {
    private void display() { }
}

class Child extends Parent {
    private void display() { }  // This is NOT overriding!
}
```

### 4. Overriding Static Methods:
```java
// WRONG - Static methods are hidden, not overridden
class Parent {
    public static void show() { }
}

class Child extends Parent {
    public static void show() { }  // Method hiding, not overriding
}
```

### 5. Forgetting @Override Annotation:
```java
// RISKY - Typo won't be caught
class Child extends Parent {
    public void dispaly() { }  // Typo! New method, not override
}

// BETTER
class Child extends Parent {
    @Override
    public void display() { }  // Compiler checks
}
```

### 6. Changing Method Signature:
```java
// WRONG - This is overloading, not overriding
class Parent {
    public void method(int x) { }
}

class Child extends Parent {
    public void method(double x) { }  // Different parameter - overloading!
}
```

### 7. Making Overridden Method More Restrictive:
```java
// WRONG
class Parent {
    public void method() { }
}

class Child extends Parent {
    private void method() { }  // ERROR! Cannot reduce visibility
}
```

### 8. Not Using Polymorphism When Appropriate:
```java
// WRONG - Repetitive code
public void processPayment(CreditCardPayment payment) { }
public void processPayment(PayPalPayment payment) { }
public void processPayment(CashPayment payment) { }

// CORRECT - Use polymorphism
public void processPayment(Payment payment) {
    payment.processPayment();  // Works with all payment types
}
```

### 9. Confusing Method Hiding with Overriding:
```java
// Static method hiding (NOT polymorphic)
class Parent {
    public static void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    public static void show() {
        System.out.println("Child");
    }
}

Parent p = new Child();
p.show();  // Prints "Parent" - not polymorphic!
```

### 10. Not Checking null Before instanceof:
```java
// WRONG - NullPointerException possible
Animal animal = getAnimal();  // might return null
Dog dog = (Dog) animal;  // NPE if null!

// CORRECT
Animal animal = getAnimal();
if (animal != null && animal instanceof Dog) {
    Dog dog = (Dog) animal;
}
```

---

## 🔗 Navigation

### Previous Day
← [Day 12: Inheritance](day12_inheritance.md)

### Next Day
→ [Day 14: Abstraction - Abstract Classes & Interfaces](day14_abstraction.md)

### Week Overview
↑ [Week 2: Object-Oriented Programming Fundamentals](README.md)

### Course Home
🏠 [Core Java Daily Learning](../README.md)

### Related Topics
- [Day 12: Inheritance](day12_inheritance.md) - Foundation for polymorphism
- [Day 14: Abstraction](day14_abstraction.md) - Abstract classes and interfaces
- [Day 10: Method Overloading](day10_methods_overloading.md) - Compile-time polymorphism

### Assessment
📝 [Day 13 Assessment](../../../java-learning-app/src/data/assessments/java/week2/day13.js) - Test your polymorphism knowledge

---

**Daily Practice Reminder**: Complete all exercises before moving to the next day. Polymorphism is crucial for writing flexible, maintainable code!

**Estimated Study Time**: 4-5 hours

**Difficulty Level**: ⭐⭐⭐⭐⭐ Advanced

---

*Last Updated: 2026-01-08*
*Part of Week 2: Object-Oriented Programming Fundamentals*