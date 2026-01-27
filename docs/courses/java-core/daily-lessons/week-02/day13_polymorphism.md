
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

**📝 Problem Statement:**
Create a polymorphic payment processing system demonstrating runtime polymorphism with multiple payment methods. The system should use an abstract Payment base class with concrete implementations for credit card, PayPal, and cash payments, each with unique processing behavior while sharing a common interface through polymorphism.

**Requirements:**
- Create abstract Payment base class with protected fields: amount, transactionId
- Define abstract methods processPayment() and getPaymentMethod() that subclasses must implement
- Implement displayReceipt() method in Payment showing transaction details
- Create CreditCardPayment subclass with fields: cardNumber, cardHolder
- Implement maskCardNumber() private method showing only last 4 digits: "**** **** **** 1234"
- Override processPayment() in CreditCardPayment to display card holder, masked card number, and approval message
- Create PayPalPayment subclass with email field
- Override processPayment() in PayPalPayment to display email and PayPal-specific confirmation
- Create CashPayment subclass with amountReceived field
- Override processPayment() in CashPayment to calculate and display change if amountReceived > amount
- Each payment subclass overrides getPaymentMethod() returning payment type as String
- Create PaymentProcessor class with process(Payment payment) method accepting any Payment type
- Implement processMultiple(Payment[] payments) method iterating array and calculating total amount
- Demonstrate polymorphism by storing different payment types in Payment[] array
- Use super(amount, transactionId) in all subclass constructors

**Sample Test Cases:**
```
Input: CreditCardPayment(150.00, "TXN001", "1234567890123456", "John Doe")
Expected Output:
Processing credit card payment...
Card Holder: John Doe
Card Number: **** **** **** 3456
Payment of $150.0 approved!

=== Payment Receipt ===
Transaction ID: TXN001
Amount: $150.00
Method: Credit Card

Input: PayPalPayment(75.50, "TXN002", "john@example.com")
Expected Output:
Processing PayPal payment...
PayPal Email: john@example.com
Payment of $75.5 sent via PayPal!

=== Payment Receipt ===
Transaction ID: TXN002
Amount: $75.50
Method: PayPal

Input: CashPayment(50.00, "TXN003", 100.00)
Expected Output:
Processing cash payment...
Amount Received: $100.0
Change: $50.00
Cash payment of $50.0 received!

=== Payment Receipt ===
Transaction ID: TXN003
Amount: $50.00
Method: Cash

Input: processMultiple([CreditCard, PayPal, Cash])
Expected Output:
[Individual receipts for each payment]
=== Total Processed: $275.50 ===
```

**Solution:**
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

**💡 Tips:**
- Abstract Payment class defines contract (processPayment, getPaymentMethod) that all payment methods must implement
- Runtime polymorphism: Payment reference can hold any subclass object (CreditCard, PayPal, Cash)
- Payment[] array demonstrates polymorphism - different payment types treated uniformly through common interface
- process(Payment payment) method parameter accepts any Payment subclass - key polymorphism benefit
- maskCardNumber() private helper method shows encapsulation: internal logic hidden from outside
- Change calculation in CashPayment: if (change > 0) only displays change when customer overpays
- String.format("%.2f", amount) ensures consistent currency formatting with 2 decimal places
- processMultiple() accumulates total by accessing protected amount field from base class
- Each payment type has unique behavior (card masking, email display, change calculation) but shares common interface
- Abstract methods force subclasses to provide implementation - ensures consistency across payment types
- Enhanced for loop (for-each) iterates Payment[] array, calling correct overridden method for each element

---

### Exercise 2: Vehicle Management System

**📝 Problem Statement:**
Create a comprehensive vehicle management system demonstrating polymorphism with abstract Vehicle class and concrete implementations for different vehicle types. The system should manage Car, Motorcycle, and Truck objects through a unified Vehicle interface, providing type-specific behavior for starting, stopping, and insurance calculations while enabling batch operations on Vehicle arrays.

**Requirements:**
- Create abstract Vehicle class with protected fields: brand, model, year, price
- Define abstract methods: start(), stop(), calculateInsurance(), getVehicleType()
- Implement displayInfo() in Vehicle showing vehicle details and calculated insurance
- Create Car subclass with fields: numberOfDoors, fuelType
- Car insurance calculation: base 5% of price, 10% discount for Electric fuel type
- Override start() in Car with car-specific message: "Car engine starting with key ignition..."
- Create Motorcycle subclass with fields: engineCC, type (Sport/Cruiser/Touring)
- Motorcycle insurance: base 4% of price, 30% surcharge if engineCC > 1000
- Override start() in Motorcycle with bike-specific message
- Create Truck subclass with fields: loadCapacity (tons), numberOfAxles
- Truck insurance: 6% of price + loadCapacity × $100
- Override start() in Truck with diesel engine message
- Each vehicle type overrides getVehicleType() returning class name as String
- Each subclass overrides displayInfo() calling super then showing type-specific fields
- Create VehicleManager class with methods operating on Vehicle[] arrays
- Implement startAll(Vehicle[] vehicles) method calling start() on all vehicles
- Implement displayAll(Vehicle[] vehicles) method showing all vehicle information
- Implement calculateTotalInsurance(Vehicle[] vehicles) method summing all insurance costs
- Implement filterByType(Vehicle[] vehicles, String type) method displaying vehicles matching type
- Demonstrate polymorphism by storing different vehicle types in Vehicle[] array

**Sample Test Cases:**
```
Input: Car("Toyota", "Camry", 2023, 30000, 4, "Hybrid")
Expected Output:
Car engine starting with key ignition...
=== Car Information ===
Brand: Toyota
Model: Camry
Year: 2023
Price: $30000.00
Insurance: $1500.00
Doors: 4
Fuel Type: Hybrid

Input: Motorcycle("Harley-Davidson", "Street 750", 2023, 8000, 750, "Cruiser")
Expected Output:
Motorcycle starting with kick/button...
=== Motorcycle Information ===
Brand: Harley-Davidson
Model: Street 750
Year: 2023
Price: $8000.00
Insurance: $320.00
Engine CC: 750
Type: Cruiser

Input: Truck("Ford", "F-150", 2023, 40000, 2.5, 2)
Expected Output:
Truck diesel engine starting...
=== Truck Information ===
Brand: Ford
Model: F-150
Year: 2023
Price: $40000.00
Insurance: $2650.00
Load Capacity: 2.5 tons
Axles: 2

Input: startAll([Car, Motorcycle, Truck, Car-Electric])
Expected Output:
=== Starting All Vehicles ===
Car engine starting with key ignition...
Motorcycle starting with kick/button...
Truck diesel engine starting...
Car engine starting with key ignition...

Input: filterByType(vehicles, "Car")
Expected Output:
=== Filtering by: Car ===
[Displays only Car vehicle information]
```

**Solution:**
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

**💡 Tips:**
- Abstract Vehicle class defines common contract that all vehicle types must implement through abstract methods
- Polymorphism allows Vehicle[] array to hold Car, Motorcycle, and Truck objects - unified interface for diverse types
- VehicleManager methods accept Vehicle[] parameter, working with any vehicle type through polymorphism
- Each vehicle type has unique insurance calculation demonstrating different business rules: Car (fuel-based), Motorcycle (engine-based), Truck (capacity-based)
- startAll() demonstrates polymorphism: for-each loop calls correct start() method for each vehicle type at runtime
- calculateTotalInsurance() accumulates insurance by calling abstract method calculateInsurance() polymorphically
- filterByType() uses getVehicleType() string comparison to filter vehicles - demonstrates instanceof alternative
- Electric Car gets 10% insurance discount (baseInsurance × 0.9) demonstrating conditional polymorphic behavior
- Motorcycle with engineCC > 1000 gets 30% surcharge (baseInsurance × 1.3) showing risk-based pricing
- Truck insurance includes load capacity fee showing additive calculation pattern
- displayInfo() override pattern: super.displayInfo() shows common Vehicle info, subclass adds type-specific fields
- Protected fields in Vehicle accessible to all subclasses, enabling inheritance without breaking encapsulation

---

### Exercise 3: Shape Drawing Application

**📝 Problem Statement:**
Create a polymorphic shape drawing application demonstrating runtime polymorphism with an abstract Shape base class. The system should manage Circle, Rectangle, and Triangle objects through a Canvas container, providing shape-specific implementations for area, perimeter, and drawing while enabling batch operations on Shape collections.

**Requirements:**
- Create abstract Shape class with protected fields: color (String), filled (boolean)
- Define abstract methods: getArea(), getPerimeter(), draw() that subclasses must implement
- Implement displayInfo() in Shape showing type (using getClass().getSimpleName()), color, filled status, area, and perimeter
- Create Circle subclass with private radius field
- Override getArea() in Circle using formula: π × radius²
- Override getPerimeter() in Circle using formula: 2 × π × radius
- Override draw() in Circle displaying color and radius
- Create Rectangle subclass with private fields: length, width
- Override getArea() in Rectangle using formula: length × width
- Override getPerimeter() in Rectangle using formula: 2 × (length + width)
- Override draw() in Rectangle displaying color and dimensions
- Create Triangle subclass with private fields: side1, side2, side3
- Override getArea() in Triangle using Heron's formula: √(s(s-a)(s-b)(s-c)) where s = perimeter/2
- Override getPerimeter() in Triangle using formula: side1 + side2 + side3
- Override draw() in Triangle displaying color and all three sides
- Create Canvas class with Shape[] array field and count field tracking number of shapes
- Implement addShape(Shape shape) method adding shape to array with bounds checking
- Implement drawAll() method calling draw() on all shapes polymorphically
- Implement displayAll() method calling displayInfo() on all shapes
- Implement getTotalArea() method summing areas of all shapes
- Implement filterByColor(String color) method displaying shapes matching specified color
- Format decimal output to 2 decimal places using String.format("%.2f")

**Sample Test Cases:**
```
Input: Circle("Red", true, 5.0)
Expected Output:
Drawing a Red circle with radius 5.0
=== Shape Information ===
Type: Circle
Color: Red
Filled: true
Area: 78.54
Perimeter: 31.42

Input: Rectangle("Blue", false, 4.0, 6.0)
Expected Output:
Drawing a Blue rectangle 4.0x6.0
=== Shape Information ===
Type: Rectangle
Color: Blue
Filled: false
Area: 24.00
Perimeter: 20.00

Input: Triangle("Green", true, 3.0, 4.0, 5.0)
Expected Output:
Drawing a Green triangle with sides 3.0, 4.0, 5.0
=== Shape Information ===
Type: Triangle
Color: Green
Filled: true
Area: 6.00
Perimeter: 12.00

Input: Canvas with [Circle(Red), Rectangle(Blue), Triangle(Green), Circle(Red)]
      drawAll()
Expected Output:
=== Drawing All Shapes ===
Drawing a Red circle with radius 5.0
Drawing a Blue rectangle 4.0x6.0
Drawing a Green triangle with sides 3.0, 4.0, 5.0
Drawing a Red circle with radius 3.0

Input: getTotalArea()
Expected Output:
=== Total Area: 114.54 ===

Input: filterByColor("Red")
Expected Output:
=== Shapes with color: Red ===
[Displays info for all Red shapes]
```

**Solution:**
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

**💡 Tips:**
- Abstract Shape class enforces contract: all shapes must implement getArea(), getPerimeter(), and draw()
- getClass().getSimpleName() dynamically retrieves shape type name (Circle, Rectangle, Triangle) avoiding hard-coding
- Canvas uses Shape[] array demonstrating polymorphism: one array holds different shape types
- drawAll() and displayAll() iterate Shape array calling overridden methods - runtime polymorphism in action
- Heron's formula for triangle area: semi-perimeter s = (a+b+c)/2, then area = √(s(s-a)(s-b)(s-c))
- Math.PI provides precise π value for circle calculations (Math.PI × radius × radius)
- Math.sqrt() calculates square root needed for Heron's formula in Triangle.getArea()
- Canvas.count tracks actual number of shapes, preventing iteration beyond filled positions
- addShape() bounds checking prevents ArrayIndexOutOfBoundsException when canvas is full
- getTotalArea() demonstrates polymorphic accumulation: sum areas regardless of shape type
- filterByColor() uses equalsIgnoreCase() for case-insensitive color matching
- Protected color field accessible directly in filterByColor() - demonstrates protected access across classes in same package
- Each shape's draw() method has unique output format showing polymorphic behavior
- String.format("%.2f") ensures consistent formatting of area/perimeter decimals

---

### Exercise 4: E-Commerce Product System

**📝 Problem Statement:**
Create an e-commerce product catalog system demonstrating polymorphism with a Product base class. The system should manage Electronics, Clothing, and Books products through a unified Product interface, providing type-specific behavior for price calculation (including discounts and tax), warranty handling, and stock management while enabling batch operations on Product arrays.

**Requirements:**
- Create Product class with protected fields: productId, name, basePrice, stockQuantity
- Define methods: calculateFinalPrice(), displayInfo(), isInStock(), applyDiscount(double percentage)
- Implement getCategory() method in Product returning product category as String
- Create Electronics subclass with fields: brand, warrantyMonths, powerConsumption
- Electronics price calculation: basePrice + 18% tax, warranty extension adds $50 if > 12 months
- Override calculateFinalPrice() in Electronics applying tax and warranty premium
- Create Clothing subclass with fields: size, material, season
- Clothing price calculation: basePrice + 5% tax, seasonal discount 20% if season is "winter"
- Override calculateFinalPrice() in Clothing with seasonal pricing
- Create Books subclass with fields: author, publisher, pages
- Books price calculation: basePrice (no tax), bulk discount 15% if buying 5+ copies
- Override calculateFinalPrice() in Books with bulk discount logic
- Each product type overrides displayInfo() calling super then showing type-specific details
- Create ShoppingCart class with addProduct(Product product, int quantity) method
- Implement calculateTotal() method summing final prices of all products polymorphically
- Implement displayCart() method showing all products with quantities and prices
- Demonstrate polymorphism by storing different product types in ArrayList<Product>

**Sample Test Cases:**
```
Input: Electronics("E001", "Laptop", 1000.00, 50, "Dell", 24, 65)
Expected Output:
=== Product Information ===
ID: E001
Name: Laptop
Category: Electronics
Base Price: $1000.00
Stock: 50 units
Brand: Dell
Warranty: 24 months
Power Consumption: 65W
Final Price: $1230.00 (includes 18% tax + $50 warranty premium)

Input: Clothing("C001", "Winter Jacket", 150.00, 30, "L", "Wool", "winter")
Expected Output:
=== Product Information ===
ID: C001
Name: Winter Jacket
Category: Clothing
Base Price: $150.00
Stock: 30 units
Size: L
Material: Wool
Season: winter
Final Price: $126.00 (includes 5% tax, 20% seasonal discount applied)

Input: Books("B001", "Java Programming", 50.00, 100, "John Doe", "TechBooks", 500)
       Quantity: 6
Expected Output:
=== Product Information ===
ID: B001
Name: Java Programming
Category: Books
Base Price: $50.00
Stock: 100 units
Author: John Doe
Publisher: TechBooks
Pages: 500
Final Price per book: $42.50 (15% bulk discount for 6 copies)
Total for 6 books: $255.00

Input: ShoppingCart with [Laptop×1, Winter Jacket×2, Java Book×6]
Expected Output:
=== Shopping Cart ===
1. Laptop (Electronics) × 1 = $1230.00
2. Winter Jacket (Clothing) × 2 = $252.00
3. Java Programming (Books) × 6 = $255.00
---
Cart Total: $1737.00
Total Items: 9
```

**Solution:**
```java
import java.util.ArrayList;

// Product base class
class Product {
    protected String productId;
    protected String name;
    protected double basePrice;
    protected int stockQuantity;

    public Product(String productId, String name, double basePrice, int stockQuantity) {
        this.productId = productId;
        this.name = name;
        this.basePrice = basePrice;
        this.stockQuantity = stockQuantity;
    }

    public double calculateFinalPrice() {
        return basePrice;
    }

    public String getCategory() {
        return "General Product";
    }

    public boolean isInStock() {
        return stockQuantity > 0;
    }

    public void applyDiscount(double percentage) {
        basePrice = basePrice * (1 - percentage / 100);
        System.out.println("Discount of " + percentage + "% applied!");
    }

    public void displayInfo() {
        System.out.println("\n=== Product Information ===");
        System.out.println("ID: " + productId);
        System.out.println("Name: " + name);
        System.out.println("Category: " + getCategory());
        System.out.println("Base Price: $" + String.format("%.2f", basePrice));
        System.out.println("Stock: " + stockQuantity + " units");
    }

    public void updateStock(int quantity) {
        stockQuantity -= quantity;
    }
}

// Electronics
class Electronics extends Product {
    private String brand;
    private int warrantyMonths;
    private int powerConsumption;

    public Electronics(String productId, String name, double basePrice, int stockQuantity,
                      String brand, int warrantyMonths, int powerConsumption) {
        super(productId, name, basePrice, stockQuantity);
        this.brand = brand;
        this.warrantyMonths = warrantyMonths;
        this.powerConsumption = powerConsumption;
    }

    @Override
    public double calculateFinalPrice() {
        double price = basePrice * 1.18;  // 18% tax
        if (warrantyMonths > 12) {
            price += 50;  // Warranty premium
        }
        return price;
    }

    @Override
    public String getCategory() {
        return "Electronics";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Brand: " + brand);
        System.out.println("Warranty: " + warrantyMonths + " months");
        System.out.println("Power Consumption: " + powerConsumption + "W");
        System.out.println("Final Price: $" + String.format("%.2f", calculateFinalPrice()) +
                         " (includes 18% tax" + (warrantyMonths > 12 ? " + $50 warranty premium" : "") + ")");
    }
}

// Clothing
class Clothing extends Product {
    private String size;
    private String material;
    private String season;

    public Clothing(String productId, String name, double basePrice, int stockQuantity,
                   String size, String material, String season) {
        super(productId, name, basePrice, stockQuantity);
        this.size = size;
        this.material = material;
        this.season = season;
    }

    @Override
    public double calculateFinalPrice() {
        double price = basePrice * 1.05;  // 5% tax
        if (season.equalsIgnoreCase("winter")) {
            price = price * 0.80;  // 20% seasonal discount
        }
        return price;
    }

    @Override
    public String getCategory() {
        return "Clothing";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Size: " + size);
        System.out.println("Material: " + material);
        System.out.println("Season: " + season);
        System.out.println("Final Price: $" + String.format("%.2f", calculateFinalPrice()) +
                         " (includes 5% tax" + (season.equalsIgnoreCase("winter") ? ", 20% seasonal discount applied" : "") + ")");
    }
}

// Books
class Books extends Product {
    private String author;
    private String publisher;
    private int pages;

    public Books(String productId, String name, double basePrice, int stockQuantity,
                String author, String publisher, int pages) {
        super(productId, name, basePrice, stockQuantity);
        this.author = author;
        this.publisher = publisher;
        this.pages = pages;
    }

    public double calculateFinalPrice(int quantity) {
        if (quantity >= 5) {
            return basePrice * 0.85;  // 15% bulk discount
        }
        return basePrice;
    }

    @Override
    public double calculateFinalPrice() {
        return basePrice;  // No tax on books
    }

    @Override
    public String getCategory() {
        return "Books";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Author: " + author);
        System.out.println("Publisher: " + publisher);
        System.out.println("Pages: " + pages);
    }

    public void displayInfo(int quantity) {
        displayInfo();
        double pricePerBook = calculateFinalPrice(quantity);
        System.out.println("Final Price per book: $" + String.format("%.2f", pricePerBook) +
                         (quantity >= 5 ? " (15% bulk discount for " + quantity + " copies)" : ""));
        System.out.println("Total for " + quantity + " books: $" + String.format("%.2f", pricePerBook * quantity));
    }
}

// Shopping Cart
class ShoppingCart {
    private ArrayList<Product> products;
    private ArrayList<Integer> quantities;

    public ShoppingCart() {
        products = new ArrayList<>();
        quantities = new ArrayList<>();
    }

    public void addProduct(Product product, int quantity) {
        if (product.isInStock() && product.stockQuantity >= quantity) {
            products.add(product);
            quantities.add(quantity);
            product.updateStock(quantity);
            System.out.println("Added " + quantity + " × " + product.name + " to cart");
        } else {
            System.out.println("Insufficient stock for " + product.name);
        }
    }

    public double calculateTotal() {
        double total = 0;
        for (int i = 0; i < products.size(); i++) {
            Product product = products.get(i);
            int quantity = quantities.get(i);

            if (product instanceof Books) {
                total += ((Books) product).calculateFinalPrice(quantity) * quantity;
            } else {
                total += product.calculateFinalPrice() * quantity;
            }
        }
        return total;
    }

    public void displayCart() {
        System.out.println("\n=== Shopping Cart ===");
        int totalItems = 0;
        for (int i = 0; i < products.size(); i++) {
            Product product = products.get(i);
            int quantity = quantities.get(i);
            double itemTotal;

            if (product instanceof Books) {
                itemTotal = ((Books) product).calculateFinalPrice(quantity) * quantity;
            } else {
                itemTotal = product.calculateFinalPrice() * quantity;
            }

            System.out.println((i + 1) + ". " + product.name + " (" + product.getCategory() +
                             ") × " + quantity + " = $" + String.format("%.2f", itemTotal));
            totalItems += quantity;
        }
        System.out.println("---");
        System.out.println("Cart Total: $" + String.format("%.2f", calculateTotal()));
        System.out.println("Total Items: " + totalItems);
    }
}

public class TestEcommerce {
    public static void main(String[] args) {
        // Create products
        Electronics laptop = new Electronics("E001", "Laptop", 1000.00, 50, "Dell", 24, 65);
        Clothing jacket = new Clothing("C001", "Winter Jacket", 150.00, 30, "L", "Wool", "winter");
        Books javaBook = new Books("B001", "Java Programming", 50.00, 100, "John Doe", "TechBooks", 500);

        // Display individual products
        laptop.displayInfo();
        jacket.displayInfo();
        javaBook.displayInfo(6);

        // Shopping cart
        ShoppingCart cart = new ShoppingCart();
        cart.addProduct(laptop, 1);
        cart.addProduct(jacket, 2);
        cart.addProduct(javaBook, 6);
        cart.displayCart();
    }
}
```

**💡 Tips:**
- Product base class provides common structure for all product types - demonstrates IS-A relationship
- calculateFinalPrice() method overridden differently per product type: Electronics (tax + warranty), Clothing (tax + seasonal discount), Books (bulk discount)
- Polymorphism enables ShoppingCart to handle different product types uniformly through Product reference
- Method overloading in Books: calculateFinalPrice() vs calculateFinalPrice(int quantity) for bulk pricing
- instanceof check in calculateTotal() allows Books-specific bulk discount logic while processing mixed product types
- Electronics warranty premium logic: if (warrantyMonths > 12) adds $50 to demonstrate conditional pricing
- Clothing seasonal discount: equalsIgnoreCase("winter") provides case-insensitive season checking
- ArrayList<Product> demonstrates polymorphic collection - holds different product types in one list
- updateStock() method called automatically when adding to cart - demonstrates state management
- isInStock() method checks availability before allowing cart addition - validates business rules
- String.format("%.2f") ensures consistent currency formatting across all product types
- displayInfo() override pattern: super.displayInfo() shows common fields, subclass adds specific details

---

### Exercise 5: Media Player System

**📝 Problem Statement:**
Create a media player application demonstrating polymorphism with a MediaFile base class. The system should manage Audio, Video, and Image files through a unified interface, providing type-specific behavior for file playback, format conversion, metadata extraction, and quality adjustment while enabling playlist operations on MediaFile arrays.

**Requirements:**
- Create abstract MediaFile class with protected fields: fileName, fileSize, duration, quality
- Define abstract methods: play(), pause(), stop(), convert(String format), getMetadata()
- Implement displayInfo() method in MediaFile showing file details
- Create AudioFile subclass with fields: artist, album, bitrate
- Override play() in AudioFile with audio-specific playback message showing bitrate
- Implement convert() in AudioFile supporting MP3, WAV, FLAC formats
- Create VideoFile subclass with fields: resolution, frameRate, codec
- Override play() in VideoFile with video-specific playback showing resolution and FPS
- Implement convert() in VideoFile supporting MP4, AVI, MKV formats
- Create ImageFile subclass with fields: width, height, colorDepth
- Override play() in ImageFile with image display message (images viewed, not played)
- Implement convert() in ImageFile supporting JPG, PNG, BMP formats
- Each media type overrides getMetadata() returning type-specific metadata string
- Create MediaPlayer class with playMedia(MediaFile media) method
- Implement Playlist class managing MediaFile[] array with play all functionality
- Demonstrate polymorphism by storing different media types in MediaFile collection
- Implement quality adjustment: AudioFile (bitrate), VideoFile (resolution), ImageFile (compression)

**Sample Test Cases:**
```
Input: AudioFile("song.mp3", 5.2, 240, "High", "Artist Name", "Album Title", 320)
Expected Output:
Playing audio file: song.mp3
Artist: Artist Name
Album: Album Title
Duration: 4:00 minutes
Bitrate: 320 kbps
Quality: High
Audio playback started...

Metadata: song.mp3 [Audio] - Artist Name - Album Title (320 kbps, 4:00)

Input: VideoFile("movie.mp4", 1024.5, 7200, "1080p", "1920×1080", 30, "H.264")
Expected Output:
Playing video file: movie.mp4
Resolution: 1920×1080
Frame Rate: 30 FPS
Codec: H.264
Duration: 2:00:00
Quality: 1080p
Video playback started...

Metadata: movie.mp4 [Video] - 1920×1080 @ 30fps (H.264, 2:00:00)

Input: ImageFile("photo.jpg", 2.5, 0, "High", 4000, 3000, 24)
Expected Output:
Displaying image file: photo.jpg
Dimensions: 4000×3000 pixels
Color Depth: 24-bit
File Size: 2.5 MB
Quality: High
Image displayed in viewer...

Metadata: photo.jpg [Image] - 4000×3000 pixels (24-bit color)

Input: audioFile.convert("WAV")
Expected Output:
Converting song.mp3 from MP3 to WAV format...
Conversion successful! Output: song.wav

Input: Playlist with [Audio, Video, Audio, Image]
Expected Output:
=== Playing Playlist ===
1. song.mp3 (Audio) - Duration: 4:00
   [Audio playback started]
2. movie.mp4 (Video) - Duration: 2:00:00
   [Video playback started]
3. podcast.mp3 (Audio) - Duration: 45:00
   [Audio playback started]
4. thumbnail.png (Image) - No duration
   [Image displayed]
---
Playlist completed! Total media files: 4
```

**Solution:**
```java
// Abstract MediaFile class
abstract class MediaFile {
    protected String fileName;
    protected double fileSize;  // in MB
    protected int duration;  // in seconds
    protected String quality;

    public MediaFile(String fileName, double fileSize, int duration, String quality) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.duration = duration;
        this.quality = quality;
    }

    // Abstract methods
    public abstract void play();
    public abstract void pause();
    public abstract void stop();
    public abstract boolean convert(String format);
    public abstract String getMetadata();
    public abstract String getMediaType();

    // Concrete method
    public void displayInfo() {
        System.out.println("\n=== Media File Information ===");
        System.out.println("File Name: " + fileName);
        System.out.println("File Size: " + fileSize + " MB");
        System.out.println("Type: " + getMediaType());
        if (duration > 0) {
            System.out.println("Duration: " + formatDuration(duration));
        }
        System.out.println("Quality: " + quality);
    }

    protected String formatDuration(int seconds) {
        int hours = seconds / 3600;
        int minutes = (seconds % 3600) / 60;
        int secs = seconds % 60;
        if (hours > 0) {
            return String.format("%d:%02d:%02d", hours, minutes, secs);
        } else {
            return String.format("%d:%02d", minutes, secs);
        }
    }
}

// Audio File
class AudioFile extends MediaFile {
    private String artist;
    private String album;
    private int bitrate;  // in kbps

    public AudioFile(String fileName, double fileSize, int duration, String quality,
                    String artist, String album, int bitrate) {
        super(fileName, fileSize, duration, quality);
        this.artist = artist;
        this.album = album;
        this.bitrate = bitrate;
    }

    @Override
    public void play() {
        System.out.println("\nPlaying audio file: " + fileName);
        System.out.println("Artist: " + artist);
        System.out.println("Album: " + album);
        System.out.println("Duration: " + formatDuration(duration));
        System.out.println("Bitrate: " + bitrate + " kbps");
        System.out.println("Quality: " + quality);
        System.out.println("Audio playback started...");
    }

    @Override
    public void pause() {
        System.out.println("Audio playback paused");
    }

    @Override
    public void stop() {
        System.out.println("Audio playback stopped");
    }

    @Override
    public boolean convert(String format) {
        String[] supportedFormats = {"MP3", "WAV", "FLAC"};
        for (String supported : supportedFormats) {
            if (format.equalsIgnoreCase(supported)) {
                String currentFormat = fileName.substring(fileName.lastIndexOf('.') + 1);
                System.out.println("Converting " + fileName + " from " + currentFormat.toUpperCase() +
                                 " to " + format + " format...");
                System.out.println("Conversion successful! Output: " +
                                 fileName.substring(0, fileName.lastIndexOf('.')) + "." + format.toLowerCase());
                return true;
            }
        }
        System.out.println("Unsupported format: " + format);
        return false;
    }

    @Override
    public String getMetadata() {
        return fileName + " [Audio] - " + artist + " - " + album + " (" + bitrate + " kbps, " +
               formatDuration(duration) + ")";
    }

    @Override
    public String getMediaType() {
        return "Audio";
    }
}

// Video File
class VideoFile extends MediaFile {
    private String resolution;
    private int frameRate;
    private String codec;

    public VideoFile(String fileName, double fileSize, int duration, String quality,
                    String resolution, int frameRate, String codec) {
        super(fileName, fileSize, duration, quality);
        this.resolution = resolution;
        this.frameRate = frameRate;
        this.codec = codec;
    }

    @Override
    public void play() {
        System.out.println("\nPlaying video file: " + fileName);
        System.out.println("Resolution: " + resolution);
        System.out.println("Frame Rate: " + frameRate + " FPS");
        System.out.println("Codec: " + codec);
        System.out.println("Duration: " + formatDuration(duration));
        System.out.println("Quality: " + quality);
        System.out.println("Video playback started...");
    }

    @Override
    public void pause() {
        System.out.println("Video playback paused");
    }

    @Override
    public void stop() {
        System.out.println("Video playback stopped");
    }

    @Override
    public boolean convert(String format) {
        String[] supportedFormats = {"MP4", "AVI", "MKV"};
        for (String supported : supportedFormats) {
            if (format.equalsIgnoreCase(supported)) {
                String currentFormat = fileName.substring(fileName.lastIndexOf('.') + 1);
                System.out.println("Converting " + fileName + " from " + currentFormat.toUpperCase() +
                                 " to " + format + " format...");
                System.out.println("Estimated time: " + (duration / 60) + " minutes");
                System.out.println("Conversion successful! Output: " +
                                 fileName.substring(0, fileName.lastIndexOf('.')) + "." + format.toLowerCase());
                return true;
            }
        }
        System.out.println("Unsupported format: " + format);
        return false;
    }

    @Override
    public String getMetadata() {
        return fileName + " [Video] - " + resolution + " @ " + frameRate + "fps (" + codec + ", " +
               formatDuration(duration) + ")";
    }

    @Override
    public String getMediaType() {
        return "Video";
    }
}

// Image File
class ImageFile extends MediaFile {
    private int width;
    private int height;
    private int colorDepth;

    public ImageFile(String fileName, double fileSize, int duration, String quality,
                    int width, int height, int colorDepth) {
        super(fileName, fileSize, 0, quality);  // Images have no duration
        this.width = width;
        this.height = height;
        this.colorDepth = colorDepth;
    }

    @Override
    public void play() {
        System.out.println("\nDisplaying image file: " + fileName);
        System.out.println("Dimensions: " + width + "×" + height + " pixels");
        System.out.println("Color Depth: " + colorDepth + "-bit");
        System.out.println("File Size: " + fileSize + " MB");
        System.out.println("Quality: " + quality);
        System.out.println("Image displayed in viewer...");
    }

    @Override
    public void pause() {
        System.out.println("Cannot pause image display");
    }

    @Override
    public void stop() {
        System.out.println("Closing image viewer");
    }

    @Override
    public boolean convert(String format) {
        String[] supportedFormats = {"JPG", "PNG", "BMP", "GIF"};
        for (String supported : supportedFormats) {
            if (format.equalsIgnoreCase(supported)) {
                String currentFormat = fileName.substring(fileName.lastIndexOf('.') + 1);
                System.out.println("Converting " + fileName + " from " + currentFormat.toUpperCase() +
                                 " to " + format + " format...");
                System.out.println("Conversion successful! Output: " +
                                 fileName.substring(0, fileName.lastIndexOf('.')) + "." + format.toLowerCase());
                return true;
            }
        }
        System.out.println("Unsupported format: " + format);
        return false;
    }

    @Override
    public String getMetadata() {
        return fileName + " [Image] - " + width + "×" + height + " pixels (" + colorDepth + "-bit color)";
    }

    @Override
    public String getMediaType() {
        return "Image";
    }
}

// Media Player
class MediaPlayer {
    public void playMedia(MediaFile media) {
        media.play();
        System.out.println("\nMetadata: " + media.getMetadata());
    }
}

// Playlist
class Playlist {
    private MediaFile[] mediaFiles;
    private int count;

    public Playlist(int capacity) {
        mediaFiles = new MediaFile[capacity];
        count = 0;
    }

    public void addMedia(MediaFile media) {
        if (count < mediaFiles.length) {
            mediaFiles[count++] = media;
            System.out.println("Added " + media.fileName + " to playlist");
        } else {
            System.out.println("Playlist is full!");
        }
    }

    public void playAll() {
        System.out.println("\n=== Playing Playlist ===");
        for (int i = 0; i < count; i++) {
            System.out.println((i + 1) + ". " + mediaFiles[i].fileName +
                             " (" + mediaFiles[i].getMediaType() + ")" +
                             (mediaFiles[i].duration > 0 ? " - Duration: " + mediaFiles[i].formatDuration(mediaFiles[i].duration) : " - No duration"));
            mediaFiles[i].play();
            System.out.println("---");
        }
        System.out.println("Playlist completed! Total media files: " + count);
    }
}

public class TestMediaPlayer {
    public static void main(String[] args) {
        MediaPlayer player = new MediaPlayer();

        // Create media files
        AudioFile song = new AudioFile("song.mp3", 5.2, 240, "High", "Artist Name", "Album Title", 320);
        VideoFile movie = new VideoFile("movie.mp4", 1024.5, 7200, "1080p", "1920×1080", 30, "H.264");
        ImageFile photo = new ImageFile("photo.jpg", 2.5, 0, "High", 4000, 3000, 24);

        // Play individual files
        player.playMedia(song);
        player.playMedia(movie);
        player.playMedia(photo);

        // Convert file
        System.out.println();
        song.convert("WAV");

        // Create and play playlist
        Playlist playlist = new Playlist(5);
        playlist.addMedia(song);
        playlist.addMedia(movie);
        playlist.addMedia(new AudioFile("podcast.mp3", 45.0, 2700, "Medium", "Podcaster", "Tech Talk", 128));
        playlist.addMedia(photo);
        playlist.playAll();
    }
}
```

**💡 Tips:**
- Abstract MediaFile class enforces contract: all media types must implement play(), pause(), stop(), convert(), getMetadata()
- Polymorphism enables MediaPlayer to play different media types uniformly through MediaFile reference
- formatDuration() helper method demonstrates code reuse: converts seconds to HH:MM:SS format used across all media types
- AudioFile stores bitrate, VideoFile stores frameRate/resolution, ImageFile stores dimensions - demonstrates type-specific fields
- convert() method uses array of supported formats to validate conversion target format
- String manipulation: fileName.substring(fileName.lastIndexOf('.') + 1) extracts file extension
- ImageFile duration is 0 - demonstrates that not all media types have time-based playback
- getMetadata() returns different string format per type: Audio (artist-album-bitrate), Video (resolution-fps-codec), Image (dimensions-colorDepth)
- Playlist uses MediaFile[] array demonstrating polymorphic collection - mixed media types in one playlist
- Protected fields in MediaFile accessible to all subclasses enabling inheritance without breaking encapsulation
- Template Method pattern: play() workflow different per media type but all call formatDuration() helper
- instanceof not needed in Playlist.playAll() - demonstrates pure polymorphism without type checking

---

### Exercise 6: Hospital Management System

**📝 Problem Statement:**
Create a hospital management system demonstrating polymorphism with a Person base class. The system should manage Patients, Doctors, and Nurses through a unified Person interface, providing type-specific behavior for registration, treatment, billing, appointment scheduling, and role-specific operations while enabling batch processing on Person arrays.

**Requirements:**
- Create Person class with protected fields: id, name, age, contactNumber
- Define methods: displayInfo(), getRole(), updateContactInfo(String newContact)
- Create Patient subclass with fields: medicalRecordNumber, diagnosis, admissionDate, roomNumber
- Implement calculateBill(int days) method in Patient: $500 per day + $2000 admission fee
- Override displayInfo() in Patient showing medical record and current diagnosis
- Create Doctor subclass with fields: specialization, qualification, experience, consultationFee
- Implement performSurgery(Patient patient) method in Doctor
- Override displayInfo() in Doctor showing specialization, qualification, experience
- Create Nurse subclass with fields: department, shift, patientCount
- Implement assignPatient(Patient patient) method in Nurse checking patientCount limit (max 5)
- Override displayInfo() in Nurse showing department, shift, assigned patients
- Each person type overrides getRole() returning role as String ("Patient", "Doctor", "Nurse")
- Create Hospital class with registerPerson(Person person) method adding to staff/patient list
- Implement scheduleAppointment(Patient patient, Doctor doctor, String date) method
- Implement displayAllPersons() method showing all people with role-based grouping
- Demonstrate polymorphism by storing different person types in Person[] array
- Show instanceof usage for role-specific operations (only Patients can get bills, only Doctors can perform surgery)

**Sample Test Cases:**
```
Input: Patient("P001", "John Doe", 45, "555-0101", "MR12345", "Pneumonia", "2024-01-15", 301)
Expected Output:
=== Person Information ===
ID: P001
Name: John Doe
Age: 45
Contact: 555-0101
Role: Patient
Medical Record: MR12345
Diagnosis: Pneumonia
Admission Date: 2024-01-15
Room Number: 301

Bill for 5 days: $4500.00 ($500/day × 5 + $2000 admission fee)

Input: Doctor("D001", "Dr. Smith", 50, "555-0201", "Cardiology", "MD, PhD", 20, 300.00)
Expected Output:
=== Person Information ===
ID: D001
Name: Dr. Smith
Age: 50
Contact: 555-0201
Role: Doctor
Specialization: Cardiology
Qualification: MD, PhD
Experience: 20 years
Consultation Fee: $300.00 per visit

Input: Nurse("N001", "Jane Wilson", 35, "555-0301", "ICU", "Night", 3)
Expected Output:
=== Person Information ===
ID: N001
Name: Jane Wilson
Age: 35
Contact: 555-0301
Role: Nurse
Department: ICU
Shift: Night shift
Assigned Patients: 3/5

Input: nurse.assignPatient(patient1)
Expected Output:
Nurse Jane Wilson assigned to patient John Doe
Current patient count: 4/5

Input: doctor.performSurgery(patient1)
Expected Output:
Dr. Smith (Cardiology) performing surgery on patient John Doe
Diagnosis: Pneumonia
Surgery scheduled for operating room
Surgery completed successfully!

Input: Hospital with [3 Patients, 2 Doctors, 4 Nurses]
Expected Output:
=== Hospital Staff and Patients ===
Doctors (2):
1. Dr. Smith - Cardiology
2. Dr. Johnson - Neurology

Nurses (4):
1. Jane Wilson - ICU (Night shift)
2. Mary Brown - ER (Day shift)
3. Sarah Davis - Pediatrics (Evening shift)
4. Lisa Anderson - Surgery (Day shift)

Patients (3):
1. John Doe - Room 301 (Pneumonia)
2. Jane Smith - Room 205 (Fracture)
3. Bob Johnson - Room 102 (Diabetes)
---
Total People: 9
```

**Solution:**
```java
import java.util.ArrayList;

// Person base class
class Person {
    protected String id;
    protected String name;
    protected int age;
    protected String contactNumber;

    public Person(String id, String name, int age, String contactNumber) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.contactNumber = contactNumber;
    }

    public String getRole() {
        return "Person";
    }

    public void displayInfo() {
        System.out.println("\n=== Person Information ===");
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Contact: " + contactNumber);
        System.out.println("Role: " + getRole());
    }

    public void updateContactInfo(String newContact) {
        this.contactNumber = newContact;
        System.out.println("Contact information updated for " + name);
    }
}

// Patient
class Patient extends Person {
    private String medicalRecordNumber;
    private String diagnosis;
    private String admissionDate;
    private int roomNumber;

    public Patient(String id, String name, int age, String contactNumber,
                  String medicalRecordNumber, String diagnosis, String admissionDate, int roomNumber) {
        super(id, name, age, contactNumber);
        this.medicalRecordNumber = medicalRecordNumber;
        this.diagnosis = diagnosis;
        this.admissionDate = admissionDate;
        this.roomNumber = roomNumber;
    }

    @Override
    public String getRole() {
        return "Patient";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Medical Record: " + medicalRecordNumber);
        System.out.println("Diagnosis: " + diagnosis);
        System.out.println("Admission Date: " + admissionDate);
        System.out.println("Room Number: " + roomNumber);
    }

    public double calculateBill(int days) {
        double dailyRate = 500.00;
        double admissionFee = 2000.00;
        double total = (days * dailyRate) + admissionFee;
        System.out.println("\nBill for " + days + " days: $" + String.format("%.2f", total) +
                         " ($" + dailyRate + "/day × " + days + " + $" + admissionFee + " admission fee)");
        return total;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public int getRoomNumber() {
        return roomNumber;
    }
}

// Doctor
class Doctor extends Person {
    private String specialization;
    private String qualification;
    private int experience;
    private double consultationFee;

    public Doctor(String id, String name, int age, String contactNumber,
                 String specialization, String qualification, int experience, double consultationFee) {
        super(id, name, age, contactNumber);
        this.specialization = specialization;
        this.qualification = qualification;
        this.experience = experience;
        this.consultationFee = consultationFee;
    }

    @Override
    public String getRole() {
        return "Doctor";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Specialization: " + specialization);
        System.out.println("Qualification: " + qualification);
        System.out.println("Experience: " + experience + " years");
        System.out.println("Consultation Fee: $" + String.format("%.2f", consultationFee) + " per visit");
    }

    public void performSurgery(Patient patient) {
        System.out.println("\n" + name + " (" + specialization + ") performing surgery on patient " + patient.name);
        System.out.println("Diagnosis: " + patient.getDiagnosis());
        System.out.println("Surgery scheduled for operating room");
        System.out.println("Surgery completed successfully!");
    }

    public String getSpecialization() {
        return specialization;
    }
}

// Nurse
class Nurse extends Person {
    private String department;
    private String shift;
    private int patientCount;
    private static final int MAX_PATIENTS = 5;

    public Nurse(String id, String name, int age, String contactNumber,
                String department, String shift, int patientCount) {
        super(id, name, age, contactNumber);
        this.department = department;
        this.shift = shift;
        this.patientCount = patientCount;
    }

    @Override
    public String getRole() {
        return "Nurse";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Department: " + department);
        System.out.println("Shift: " + shift + " shift");
        System.out.println("Assigned Patients: " + patientCount + "/" + MAX_PATIENTS);
    }

    public boolean assignPatient(Patient patient) {
        if (patientCount < MAX_PATIENTS) {
            patientCount++;
            System.out.println("\nNurse " + name + " assigned to patient " + patient.name);
            System.out.println("Current patient count: " + patientCount + "/" + MAX_PATIENTS);
            return true;
        } else {
            System.out.println("\nNurse " + name + " has reached maximum patient capacity");
            return false;
        }
    }

    public String getDepartment() {
        return department;
    }

    public String getShift() {
        return shift;
    }
}

// Hospital
class Hospital {
    private ArrayList<Person> people;

    public Hospital() {
        people = new ArrayList<>();
    }

    public void registerPerson(Person person) {
        people.add(person);
        System.out.println(person.name + " registered as " + person.getRole());
    }

    public void scheduleAppointment(Patient patient, Doctor doctor, String date) {
        System.out.println("\n=== Appointment Scheduled ===");
        System.out.println("Patient: " + patient.name);
        System.out.println("Doctor: " + doctor.name + " (" + doctor.getSpecialization() + ")");
        System.out.println("Date: " + date);
        System.out.println("Room: " + patient.getRoomNumber());
    }

    public void displayAllPersons() {
        System.out.println("\n=== Hospital Staff and Patients ===");

        // Group by role
        System.out.println("\nDoctors:");
        int doctorCount = 0;
        for (Person person : people) {
            if (person instanceof Doctor) {
                doctorCount++;
                Doctor doctor = (Doctor) person;
                System.out.println(doctorCount + ". " + doctor.name + " - " + doctor.getSpecialization());
            }
        }

        System.out.println("\nNurses:");
        int nurseCount = 0;
        for (Person person : people) {
            if (person instanceof Nurse) {
                nurseCount++;
                Nurse nurse = (Nurse) person;
                System.out.println(nurseCount + ". " + nurse.name + " - " + nurse.getDepartment() +
                                 " (" + nurse.getShift() + " shift)");
            }
        }

        System.out.println("\nPatients:");
        int patientCount = 0;
        for (Person person : people) {
            if (person instanceof Patient) {
                patientCount++;
                Patient patient = (Patient) person;
                System.out.println(patientCount + ". " + patient.name + " - Room " +
                                 patient.getRoomNumber() + " (" + patient.getDiagnosis() + ")");
            }
        }

        System.out.println("---");
        System.out.println("Total People: " + people.size());
    }
}

public class TestHospital {
    public static void main(String[] args) {
        Hospital hospital = new Hospital();

        // Create people
        Patient patient1 = new Patient("P001", "John Doe", 45, "555-0101",
                                       "MR12345", "Pneumonia", "2024-01-15", 301);
        Patient patient2 = new Patient("P002", "Jane Smith", 32, "555-0102",
                                       "MR12346", "Fracture", "2024-01-16", 205);

        Doctor doctor1 = new Doctor("D001", "Dr. Smith", 50, "555-0201",
                                   "Cardiology", "MD, PhD", 20, 300.00);
        Doctor doctor2 = new Doctor("D002", "Dr. Johnson", 45, "555-0202",
                                   "Neurology", "MD", 15, 250.00);

        Nurse nurse1 = new Nurse("N001", "Jane Wilson", 35, "555-0301", "ICU", "Night", 3);
        Nurse nurse2 = new Nurse("N002", "Mary Brown", 28, "555-0302", "ER", "Day", 4);

        // Display individual information
        patient1.displayInfo();
        patient1.calculateBill(5);

        doctor1.displayInfo();
        nurse1.displayInfo();

        // Role-specific operations
        nurse1.assignPatient(patient1);
        doctor1.performSurgery(patient1);

        // Register everyone
        hospital.registerPerson(doctor1);
        hospital.registerPerson(doctor2);
        hospital.registerPerson(nurse1);
        hospital.registerPerson(nurse2);
        hospital.registerPerson(patient1);
        hospital.registerPerson(patient2);

        // Schedule appointment
        hospital.scheduleAppointment(patient1, doctor1, "2024-01-20");

        // Display all
        hospital.displayAll Persons();
    }
}
```

**💡 Tips:**
- Person base class provides common structure for all roles - demonstrates IS-A relationship (Patient IS-A Person, Doctor IS-A Person)
- Polymorphism enables Hospital to manage different person types uniformly through Person reference in ArrayList<Person>
- getRole() method overridden in each subclass returning role string - enables role-based grouping without instanceof
- Patient.calculateBill() demonstrates domain-specific calculations: daily rate + admission fee
- Doctor.performSurgery() takes Patient parameter showing interaction between different person types
- Nurse.assignPatient() implements business rule: maximum 5 patients per nurse with validation
- MAX_PATIENTS static constant in Nurse demonstrates class-level configuration
- instanceof checks in displayAllPersons() enable role-specific display logic while iterating mixed Person types
- Protected fields in Person accessible to all subclasses enabling inheritance without breaking encapsulation
- Hospital uses composition: ArrayList<Person> "has-many" Person objects demonstrating aggregation
- scheduleAppointment() method accepts Patient and Doctor parameters leveraging polymorphism for type safety
- Each role has domain-specific fields: Patient (medicalRecord, diagnosis), Doctor (specialization, qualification), Nurse (department, shift)

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

### 1. Upcasting and Downcasting Mistakes

#### ❌ Wrong - Attempting to Access Child-Specific Members After Upcasting:
```java
// WRONG
class Animal {
    public void eat() {
        System.out.println("Animal eating");
    }
}

class Dog extends Animal {
    public void bark() {
        System.out.println("Dog barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();  // Upcasting
        animal.eat();    // Works - method in Animal
        animal.bark();   // Compilation error! bark() not in Animal
    }
}
```
**Issue:** After upcasting, only parent class members are accessible through the reference

#### ✅ Right:
```java
// CORRECT - Downcast to access child-specific members
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();  // Upcasting
        animal.eat();    // Works

        // Downcast to access child-specific method
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();  // Now works
        }
    }
}
```

**Why:** Reference type determines accessible members; need downcasting for child-specific members.

**💡 Tip:** Use instanceof before downcasting to avoid ClassCastException.

---

#### ❌ Wrong - Unsafe Downcasting Without Type Check:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();  // Parent object
        Dog dog = (Dog) animal;  // ClassCastException at runtime!
        dog.bark();
    }
}
```
**Issue:** Downcasting parent object to child type causes ClassCastException

#### ✅ Right:
```java
// CORRECT - Check type before downcasting
public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();

        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();
        } else {
            System.out.println("Not a Dog instance");
        }
    }
}

// OR use pattern matching (Java 16+)
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();

        if (animal instanceof Dog dog) {  // Pattern matching
            dog.bark();  // dog variable automatically created
        }
    }
}
```

**Why:** instanceof checks actual object type before casting; prevents ClassCastException.

**💡 Tip:** Always verify with instanceof before downcasting to child type.

---

#### ❌ Wrong - Downcasting to Sibling Class:
```java
// WRONG
class Animal { }
class Dog extends Animal { }
class Cat extends Animal { }

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();

        // Trying to cast to sibling class
        Cat cat = (Cat) animal;  // ClassCastException! Dog cannot be Cat
        cat.meow();
    }
}
```
**Issue:** Cannot cast to sibling class; Dog and Cat are incompatible types

#### ✅ Right:
```java
// CORRECT - Check actual type before casting
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();

        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();
        } else if (animal instanceof Cat) {
            Cat cat = (Cat) animal;
            cat.meow();
        }
    }
}
```

**Why:** Object can only be cast to its actual type or supertypes, not sibling types.

**💡 Tip:** Sibling classes have no inheritance relationship; cannot cast between them.

---

#### ❌ Wrong - Downcasting null Reference:
```java
// WRONG
public class Main {
    public static Animal getAnimal() {
        return null;
    }

    public static void main(String[] args) {
        Animal animal = getAnimal();  // Returns null
        Dog dog = (Dog) animal;  // No exception here (null can be cast)
        dog.bark();  // NullPointerException!
    }
}
```
**Issue:** Downcasting null doesn't throw ClassCastException, but using it causes NPE

#### ✅ Right:
```java
// CORRECT - Check for null and type
public class Main {
    public static void main(String[] args) {
        Animal animal = getAnimal();

        if (animal != null && animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();  // Safe
        } else {
            System.out.println("Invalid animal or null");
        }
    }
}
```

**Why:** Must check both null and instanceof to ensure safe downcasting.

**💡 Tip:** instanceof returns false for null, so check simplifies to just instanceof.

---

#### ❌ Wrong - Multiple Unnecessary Downcasts:
```java
// WRONG - Repetitive downcasting
public class Main {
    public static void processAnimal(Animal animal) {
        if (animal instanceof Dog) {
            ((Dog) animal).bark();
            ((Dog) animal).fetch();
            ((Dog) animal).wagTail();
        }
    }
}
```
**Issue:** Multiple casts in same block are inefficient and verbose

#### ✅ Right:
```java
// CORRECT - Cast once, store in variable
public class Main {
    public static void processAnimal(Animal animal) {
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;  // Cast once
            dog.bark();
            dog.fetch();
            dog.wagTail();
        }
    }
}

// OR use pattern matching (Java 16+)
public class Main {
    public static void processAnimal(Animal animal) {
        if (animal instanceof Dog dog) {
            dog.bark();
            dog.fetch();
            dog.wagTail();
        }
    }
}
```

**Why:** Cast once and reuse variable for cleaner, more efficient code.

**💡 Tip:** Pattern matching eliminates need for explicit cast and variable declaration.

---

### 2. instanceof Operator Misuse

#### ❌ Wrong - Not Checking instanceof Before Downcast:
```java
// WRONG
public class Main {
    public static void feedAnimal(Animal animal) {
        Dog dog = (Dog) animal;  // Assumes it's always a Dog
        dog.eatDogFood();
    }

    public static void main(String[] args) {
        feedAnimal(new Cat());  // ClassCastException!
    }
}
```
**Issue:** Assuming object type without verification causes runtime error

#### ✅ Right:
```java
// CORRECT - Check type before casting
public class Main {
    public static void feedAnimal(Animal animal) {
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.eatDogFood();
        } else if (animal instanceof Cat) {
            Cat cat = (Cat) animal;
            cat.eatCatFood();
        } else {
            animal.eat();  // Generic method
        }
    }
}
```

**Why:** instanceof verifies actual object type before casting.

**💡 Tip:** Use instanceof in polymorphic methods when child-specific behavior needed.

---

#### ❌ Wrong - Redundant instanceof After Casting:
```java
// WRONG - Redundant check
public class Main {
    public static void process(Animal animal) {
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            if (dog instanceof Dog) {  // Redundant! Already checked
                dog.bark();
            }
        }
    }
}
```
**Issue:** Checking instanceof again after successful cast is unnecessary

#### ✅ Right:
```java
// CORRECT - Check once before casting
public class Main {
    public static void process(Animal animal) {
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.bark();  // Safe, already verified
        }
    }
}
```

**Why:** Once instanceof succeeds, object is guaranteed to be that type.

**💡 Tip:** Don't duplicate instanceof checks; trust the first verification.

---

#### ❌ Wrong - Using instanceof for Null Check:
```java
// WRONG approach
public class Main {
    public static void process(Animal animal) {
        if (animal instanceof Animal) {  // Inefficient for null check
            animal.eat();
        }
    }
}
```
**Issue:** instanceof is overkill for simple null check; returns false for null anyway

#### ✅ Right:
```java
// CORRECT - Use direct null check
public class Main {
    public static void process(Animal animal) {
        if (animal != null) {  // Simpler and clearer
            animal.eat();
        }
    }
}

// Or for type-specific check
public class Main {
    public static void process(Animal animal) {
        if (animal instanceof Dog) {  // Implicitly handles null (returns false)
            Dog dog = (Dog) animal;
            dog.bark();
        }
    }
}
```

**Why:** instanceof returns false for null, but direct null check is clearer for null-only checks.

**💡 Tip:** Use instanceof for type checking; use `!= null` for simple null checks.

---

#### ❌ Wrong - instanceof on Final Variables with Wrong Type:
```java
// WRONG - Compile-time known impossible check
public class Main {
    public static void main(String[] args) {
        final String str = "Hello";

        if (str instanceof Integer) {  // Compilation error! Incompatible types
            System.out.println("Is Integer");
        }
    }
}
```
**Issue:** Compiler knows String can never be Integer; incompatible types error

#### ✅ Right:
```java
// CORRECT - Use compatible type hierarchy
public class Main {
    public static void main(String[] args) {
        Object obj = "Hello";  // Upcasted to Object

        if (obj instanceof String) {  // Valid check
            String str = (String) obj;
            System.out.println("Is String: " + str);
        }

        if (obj instanceof Integer) {  // Valid check (returns false)
            System.out.println("Is Integer");
        }
    }
}
```

**Why:** instanceof only works within valid type hierarchy; compiler prevents impossible checks.

**💡 Tip:** Use common parent type (like Object) for runtime type checking across branches.

---

### 3. Method Overriding for Polymorphism

#### ❌ Wrong - Overriding Method with Different Signature:
```java
// WRONG - This is overloading, not overriding
class Parent {
    public void display(int x) {
        System.out.println("Parent: " + x);
    }
}

class Child extends Parent {
    @Override  // Compilation error! No such method to override
    public void display(double x) {  // Different parameter type
        System.out.println("Child: " + x);
    }
}
```
**Issue:** Different parameters = overloading, not overriding; polymorphism won't work

#### ✅ Right:
```java
// CORRECT - Exact same signature for overriding
class Child extends Parent {
    @Override
    public void display(int x) {  // Same parameter type
        System.out.println("Child: " + x);
    }

    // Overloading (additional method, not override)
    public void display(double x) {
        System.out.println("Child double: " + x);
    }
}

Parent p = new Child();
p.display(10);  // Calls Child's display(int) - polymorphic
```

**Why:** Overriding requires exact signature match for runtime polymorphism to work.

**💡 Tip:** Use @Override annotation to catch signature mismatches at compile time.

---

#### ❌ Wrong - Overriding and Changing Return Type to Incompatible Type:
```java
// WRONG
class Parent {
    public String getValue() {
        return "Parent";
    }
}

class Child extends Parent {
    @Override  // Compilation error! Incompatible return type
    public Integer getValue() {
        return 10;
    }
}
```
**Issue:** Return type must be same or covariant (subtype), not incompatible type

#### ✅ Right:
```java
// CORRECT - Same or covariant return type
class Parent {
    public Object getValue() {
        return "Parent";
    }
}

class Child extends Parent {
    @Override
    public String getValue() {  // String is subtype of Object (covariant)
        return "Child";
    }
}

Parent p = new Child();
Object value = p.getValue();  // Returns "Child"
```

**Why:** Covariant return types maintain polymorphic contract while allowing specificity.

**💡 Tip:** Return type can be more specific (child type), but not different unrelated type.

---

#### ❌ Wrong - Overriding Private Method:
```java
// WRONG - Private methods cannot be overridden
class Parent {
    private void calculate() {
        System.out.println("Parent calculation");
    }

    public void process() {
        calculate();  // Calls Parent's private method
    }
}

class Child extends Parent {
    // This is NOT overriding! It's a new method
    private void calculate() {
        System.out.println("Child calculation");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.process();  // Prints "Parent calculation" - NOT polymorphic!
    }
}
```
**Issue:** Private methods are not inherited, so cannot be overridden; polymorphism doesn't apply

#### ✅ Right:
```java
// CORRECT - Use protected or public for overridable methods
class Parent {
    protected void calculate() {  // Protected allows overriding
        System.out.println("Parent calculation");
    }

    public void process() {
        calculate();  // Polymorphic call
    }
}

class Child extends Parent {
    @Override
    protected void calculate() {  // Proper override
        System.out.println("Child calculation");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.process();  // Prints "Child calculation" - polymorphic!
    }
}
```

**Why:** Private methods not inherited; use protected/public for polymorphic behavior.

**💡 Tip:** Private methods are implementation details; not part of polymorphic interface.

---

#### ❌ Wrong - Overriding Final Method:
```java
// WRONG
class Parent {
    public final void display() {  // final method
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override  // Compilation error! Cannot override final method
    public void display() {
        System.out.println("Child");
    }
}
```
**Issue:** final methods cannot be overridden; prevents polymorphism for that method

#### ✅ Right:
```java
// CORRECT - Don't override final methods
class Parent {
    public final void display() {
        System.out.println("Parent");
    }

    public void show() {  // Not final - can be overridden
        System.out.println("Parent show");
    }
}

class Child extends Parent {
    // Don't override display()

    @Override
    public void show() {  // Override non-final method
        System.out.println("Child show");
    }
}
```

**Why:** final keyword prevents method overriding; respect design intent.

**💡 Tip:** Use final for methods that must not change behavior in subclasses.

---

#### ❌ Wrong - Reducing Access Modifier in Override:
```java
// WRONG
class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override  // Compilation error! Cannot reduce visibility
    protected void display() {  // More restrictive than public
        System.out.println("Child");
    }
}
```
**Issue:** Violates Liskov Substitution Principle; reduces accessibility

#### ✅ Right:
```java
// CORRECT - Same or less restrictive access
class Parent {
    protected void display() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override
    public void display() {  // Less restrictive (public > protected)
        System.out.println("Child");
    }
}

Parent p = new Child();
p.display();  // Works - Child's public method called
```

**Why:** Override can increase visibility (more accessible) but never decrease it.

**💡 Tip:** Access hierarchy: private < default < protected < public.

---

### 4. Reference Type vs Object Type Confusion

#### ❌ Wrong - Thinking Reference Type Determines Method Called:
```java
// WRONG understanding
class Animal {
    public void makeSound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark");
    }
}

// Student thinks:
Animal animal = new Dog();
animal.makeSound();  // Student thinks: "Animal sound" (WRONG!)
// Actually prints: "Bark" - object type determines method
```
**Issue:** Misunderstanding runtime polymorphism; object type, not reference type, determines method

#### ✅ Right:
```java
// CORRECT understanding
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();  // Reference type: Animal, Object type: Dog
        animal.makeSound();  // Prints "Bark" - Dog's method called (runtime decision)

        // Explanation:
        // 1. Reference type (Animal) determines ACCESSIBLE methods
        // 2. Object type (Dog) determines WHICH IMPLEMENTATION runs
    }
}
```

**Why:** Runtime polymorphism: JVM uses actual object type to resolve method calls.

**💡 Tip:** Reference type = compile-time check; Object type = runtime execution.

---

#### ❌ Wrong - Accessing Child-Only Fields Through Parent Reference:
```java
// WRONG
class Animal {
    String name;
}

class Dog extends Animal {
    String breed;
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        animal.name = "Buddy";     // Works - field in Animal
        animal.breed = "Bulldog";  // Compilation error! breed not in Animal
    }
}
```
**Issue:** Reference type determines accessible fields, even if object has them

#### ✅ Right:
```java
// CORRECT - Downcast to access child fields
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        animal.name = "Buddy";  // Works

        // Downcast to access child-specific field
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.breed = "Bulldog";  // Now works
        }
    }
}
```

**Why:** Reference type controls compile-time accessibility; downcast for child members.

**💡 Tip:** Fields don't have polymorphism; always accessed based on reference type.

---

#### ❌ Wrong - Variable Shadowing in Polymorphic Context:
```java
// WRONG understanding
class Parent {
    int value = 10;
}

class Child extends Parent {
    int value = 20;  // Shadows parent's value
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.value);  // Prints 10, not 20!
        // Student expects 20 (polymorphic), but variables don't override
    }
}
```
**Issue:** Variables don't participate in polymorphism; reference type determines access

#### ✅ Right:
```java
// CORRECT - Use methods for polymorphic behavior
class Parent {
    public int getValue() {
        return 10;
    }
}

class Child extends Parent {
    @Override
    public int getValue() {
        return 20;  // Overrides method
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.getValue());  // Prints 20 - polymorphic!
    }
}
```

**Why:** Only methods are polymorphic; fields are accessed based on reference type.

**💡 Tip:** Avoid public fields; use getters for polymorphic behavior.

---

#### ❌ Wrong - Assuming Constructor is Polymorphic:
```java
// WRONG understanding
class Animal {
    public Animal() {
        System.out.println("Animal constructor");
        init();
    }

    public void init() {
        System.out.println("Animal init");
    }
}

class Dog extends Animal {
    private String breed = "Unknown";

    public Dog(String breed) {
        super();
        this.breed = breed;
        System.out.println("Dog constructor");
    }

    @Override
    public void init() {
        System.out.println("Dog init: " + breed);  // breed is null here!
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Bulldog");
        // Output:
        // Animal constructor
        // Dog init: null      <- breed not initialized yet!
        // Dog constructor
    }
}
```
**Issue:** Calling overridden methods from constructor is dangerous; child fields not initialized

#### ✅ Right:
```java
// CORRECT - Avoid calling overridable methods from constructor
class Animal {
    public Animal() {
        System.out.println("Animal constructor");
        // Don't call overridable methods here
    }

    public final void initialize() {  // final prevents override
        System.out.println("Animal init");
    }
}

class Dog extends Animal {
    private String breed;

    public Dog(String breed) {
        super();
        this.breed = breed;
        System.out.println("Dog constructor");
        init();  // Call after construction complete
    }

    public void init() {
        System.out.println("Dog init: " + breed);  // breed initialized
    }
}
```

**Why:** Overridden methods called during construction access uninitialized child fields.

**💡 Tip:** Never call overridable methods from constructors; use final methods or factory patterns.

---

### 5. Static Methods and Polymorphism

#### ❌ Wrong - Expecting Static Methods to Override:
```java
// WRONG understanding
class Parent {
    public static void display() {
        System.out.println("Parent static");
    }
}

class Child extends Parent {
    public static void display() {  // This HIDES, not overrides
        System.out.println("Child static");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.display();  // Prints "Parent static" - NOT polymorphic!
        // Student expects "Child static" (WRONG!)
    }
}
```
**Issue:** Static methods use method hiding, not overriding; no runtime polymorphism

#### ✅ Right:
```java
// CORRECT - Understand static method hiding
public class Main {
    public static void main(String[] args) {
        Parent.display();  // Prints "Parent static"
        Child.display();   // Prints "Child static"

        Parent p = new Child();
        p.display();  // Prints "Parent static" - reference type matters for static!

        // Static methods bound at compile-time, not runtime
    }
}
```

**Why:** Static methods belong to class, not instance; decided at compile time by reference type.

**💡 Tip:** Avoid hiding static methods; use different names for clarity.

---

#### ❌ Wrong - Using @Override with Static Methods:
```java
// WRONG
class Parent {
    public static void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override  // Compilation error! @Override not for static methods
    public static void show() {
        System.out.println("Child");
    }
}
```
**Issue:** @Override annotation only for instance methods; static methods hide, not override

#### ✅ Right:
```java
// CORRECT - No @Override for static methods
class Parent {
    public static void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    // No @Override - this is method hiding
    public static void show() {
        System.out.println("Child");
    }
}
```

**Why:** @Override is specifically for overriding instance methods; static methods hide.

**💡 Tip:** Compiler prevents @Override on static methods; method hiding is not polymorphic.

---

#### ❌ Wrong - Changing Static to Instance or Vice Versa:
```java
// WRONG
class Parent {
    public static void method() {
        System.out.println("Static method");
    }
}

class Child extends Parent {
    // Compilation error! Cannot override static with instance
    public void method() {
        System.out.println("Instance method");
    }
}

// ALSO WRONG (opposite direction)
class Parent2 {
    public void method() {
        System.out.println("Instance method");
    }
}

class Child2 extends Parent2 {
    // Compilation error! Cannot hide instance with static
    public static void method() {
        System.out.println("Static method");
    }
}
```
**Issue:** Cannot change method from static to instance or vice versa

#### ✅ Right:
```java
// CORRECT - Keep same static/instance nature
class Parent {
    public static void staticMethod() {
        System.out.println("Static");
    }

    public void instanceMethod() {
        System.out.println("Instance");
    }
}

class Child extends Parent {
    // Static hides static
    public static void staticMethod() {
        System.out.println("Child static");
    }

    // Instance overrides instance
    @Override
    public void instanceMethod() {
        System.out.println("Child instance");
    }
}
```

**Why:** Static and instance methods are fundamentally different; cannot be interchanged.

**💡 Tip:** Static methods belong to class; instance methods belong to objects.

---

### 6. Polymorphic Arrays and Collections

#### ❌ Wrong - ArrayStoreException in Polymorphic Arrays:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        Animal[] animals = new Dog[5];  // Array of Dogs
        animals[0] = new Dog();   // OK
        animals[1] = new Cat();   // ArrayStoreException at runtime!
    }
}
```
**Issue:** Array created as Dog[] cannot store Cat objects, even with Animal[] reference

#### ✅ Right:
```java
// CORRECT - Declare array with parent type
public class Main {
    public static void main(String[] args) {
        Animal[] animals = new Animal[5];  // Array of Animals
        animals[0] = new Dog();   // OK
        animals[1] = new Cat();   // OK
        animals[2] = new Animal(); // OK

        // Process polymorphically
        for (Animal animal : animals) {
            if (animal != null) {
                animal.makeSound();
            }
        }
    }
}
```

**Why:** Array type is fixed at creation; use parent type for polymorphic storage.

**💡 Tip:** For flexibility, use collections (ArrayList<Animal>) instead of arrays.

---

#### ❌ Wrong - Forgetting to Check Type in Polymorphic Array:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        Animal[] animals = {new Dog(), new Cat(), new Bird()};

        for (Animal animal : animals) {
            Dog dog = (Dog) animal;  // ClassCastException for Cat and Bird!
            dog.bark();
        }
    }
}
```
**Issue:** Casting all elements to one specific type without checking

#### ✅ Right:
```java
// CORRECT - Check type before casting
public class Main {
    public static void main(String[] args) {
        Animal[] animals = {new Dog(), new Cat(), new Bird()};

        for (Animal animal : animals) {
            if (animal instanceof Dog) {
                Dog dog = (Dog) animal;
                dog.bark();
            } else if (animal instanceof Cat) {
                Cat cat = (Cat) animal;
                cat.meow();
            } else if (animal instanceof Bird) {
                Bird bird = (Bird) animal;
                bird.chirp();
            }
        }
    }
}

// BETTER - Use polymorphism instead of instanceof
public class Main {
    public static void main(String[] args) {
        Animal[] animals = {new Dog(), new Cat(), new Bird()};

        for (Animal animal : animals) {
            animal.makeSound();  // Polymorphic call - no casting needed
        }
    }
}
```

**Why:** Polymorphic arrays contain mixed types; check before casting or use polymorphism.

**💡 Tip:** Prefer polymorphic methods over instanceof checks for cleaner code.

---

#### ❌ Wrong - Modifying Array Through Different Reference:
```java
// WRONG (conceptual issue)
public class Main {
    public static void main(String[] args) {
        Dog[] dogs = {new Dog(), new Dog()};
        Animal[] animals = dogs;  // Both reference same array

        // Can access through both references
        dogs[0].bark();      // OK
        animals[0].eat();    // OK

        // But be careful:
        animals[0] = new Cat();  // ArrayStoreException! Array is still Dog[]
    }
}
```
**Issue:** Array type is fixed; polymorphic reference doesn't change actual array type

#### ✅ Right:
```java
// CORRECT - Understand array covariance limitations
public class Main {
    public static void main(String[] args) {
        // Option 1: Use parent array type from start
        Animal[] animals = {new Dog(), new Dog(), new Cat()};
        animals[0] = new Bird();  // OK

        // Option 2: Use collections for type safety
        List<Animal> animalList = new ArrayList<>();
        animalList.add(new Dog());
        animalList.add(new Cat());
        animalList.add(new Bird());  // All OK
    }
}
```

**Why:** Arrays are covariant but reified; collections with generics provide type safety.

**💡 Tip:** Prefer `List<Animal>` over `Animal[]` for polymorphic collections.

---

### 7. Covariant Return Types and Exceptions

#### ❌ Wrong - Returning Unrelated Type in Override:
```java
// WRONG
class Animal {
    public Animal reproduce() {
        return new Animal();
    }
}

class Dog extends Animal {
    @Override  // Compilation error! Integer not subtype of Animal
    public Integer reproduce() {
        return 1;
    }
}
```
**Issue:** Return type must be same or covariant (subtype), not unrelated type

#### ✅ Right:
```java
// CORRECT - Return same or covariant type
class Animal {
    public Animal reproduce() {
        return new Animal();
    }
}

class Dog extends Animal {
    @Override
    public Dog reproduce() {  // Dog is subtype of Animal (covariant)
        return new Dog();
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        Animal baby = animal.reproduce();  // Returns Dog, stored as Animal

        Dog dog = new Dog();
        Dog puppy = dog.reproduce();  // Returns Dog directly
    }
}
```

**Why:** Covariant return types allow override to return more specific type.

**💡 Tip:** Covariant returns enable type-safe method chaining in subclasses.

---

#### ❌ Wrong - Throwing Broader Exception in Override:
```java
// WRONG
class Parent {
    public void readFile() throws IOException {
        // Read file
    }
}

class Child extends Parent {
    @Override  // Compilation error! Cannot throw broader checked exception
    public void readFile() throws Exception {  // Exception broader than IOException
        // Read file
    }
}
```
**Issue:** Overriding method cannot throw broader checked exception than parent

#### ✅ Right:
```java
// CORRECT - Same, narrower, or no checked exception
class Child extends Parent {
    // Option 1: Same exception
    @Override
    public void readFile() throws IOException {
        // Read file
    }

    // Option 2: Narrower exception (subtype)
    @Override
    public void readFile() throws FileNotFoundException {  // Subtype of IOException
        // Read file
    }

    // Option 3: No exception
    @Override
    public void readFile() {  // Handle internally
        try {
            // Read file
        } catch (IOException e) {
            // Handle
        }
    }

    // Option 4: Can throw any unchecked exception
    @Override
    public void readFile() throws RuntimeException {  // Unchecked - always allowed
        // Read file
    }
}
```

**Why:** Override must maintain or strengthen method contract; broader exceptions weaken it.

**💡 Tip:** Can throw same, narrower, no checked exception; any unchecked exception allowed.

---

### 8. Polymorphism Design Mistakes

#### ❌ Wrong - Overusing instanceof Instead of Polymorphism:
```java
// WRONG - Anti-pattern
public class AnimalProcessor {
    public void process(Animal animal) {
        if (animal instanceof Dog) {
            System.out.println("Processing dog...");
            ((Dog) animal).bark();
        } else if (animal instanceof Cat) {
            System.out.println("Processing cat...");
            ((Cat) animal).meow();
        } else if (animal instanceof Bird) {
            System.out.println("Processing bird...");
            ((Bird) animal).chirp();
        }
        // Adding new animal requires modifying this method!
    }
}
```
**Issue:** Violates Open/Closed Principle; requires modification for new types

#### ✅ Right:
```java
// CORRECT - Use polymorphism
abstract class Animal {
    public abstract void makeSound();

    public void process() {
        System.out.println("Processing " + getClass().getSimpleName() + "...");
        makeSound();
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark!");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
}

public class AnimalProcessor {
    public void process(Animal animal) {
        animal.process();  // Polymorphic - no instanceof needed
        // Adding new animal doesn't require changing this code!
    }
}
```

**Why:** Polymorphism enables extensibility without modifying existing code.

**💡 Tip:** Excessive instanceof checks indicate missing polymorphic design.

---

#### ❌ Wrong - Creating Parallel Type Hierarchies:
```java
// WRONG - Difficult to maintain
class Shape { }
class Circle extends Shape { }
class Rectangle extends Shape { }

// Parallel hierarchy - bad design
class ShapeDrawer { }
class CircleDrawer extends ShapeDrawer { }
class RectangleDrawer extends ShapeDrawer { }

// Usage becomes complex
public class Main {
    public void draw(Shape shape) {
        if (shape instanceof Circle) {
            new CircleDrawer().draw((Circle) shape);
        } else if (shape instanceof Rectangle) {
            new RectangleDrawer().draw((Rectangle) shape);
        }
    }
}
```
**Issue:** Two parallel hierarchies hard to maintain; adding shape requires two new classes

#### ✅ Right:
```java
// CORRECT - Behavior in hierarchy
abstract class Shape {
    public abstract void draw();
}

class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
        // Circle-specific drawing logic here
    }
}

class Rectangle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing rectangle");
        // Rectangle-specific drawing logic here
    }
}

// Simple usage
public class Main {
    public void draw(Shape shape) {
        shape.draw();  // Polymorphic - one line!
    }
}
```

**Why:** Single hierarchy with behavior included is easier to maintain and extend.

**💡 Tip:** Avoid parallel type hierarchies; use Strategy pattern if separation needed.

---

#### ❌ Wrong - Not Providing Base Implementation in Abstract Class:
```java
// WRONG - Forces all subclasses to implement
abstract class Animal {
    public abstract void eat();
    public abstract void sleep();
    public abstract void breathe();
    // Every animal eats, sleeps, breathes similarly
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("Eating...");  // Same in all subclasses
    }

    @Override
    public void sleep() {
        System.out.println("Sleeping...");  // Same in all subclasses
    }

    @Override
    public void breathe() {
        System.out.println("Breathing...");  // Same in all subclasses
    }
}

class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("Eating...");  // Duplicate code
    }

    @Override
    public void sleep() {
        System.out.println("Sleeping...");  // Duplicate code
    }

    @Override
    public void breathe() {
        System.out.println("Breathing...");  // Duplicate code
    }
}
```
**Issue:** Forcing override of common behavior causes code duplication

#### ✅ Right:
```java
// CORRECT - Provide default implementation, allow override
abstract class Animal {
    // Common behavior with default implementation
    public void eat() {
        System.out.println("Eating...");
    }

    public void sleep() {
        System.out.println("Sleeping...");
    }

    public void breathe() {
        System.out.println("Breathing...");
    }

    // Only unique behavior is abstract
    public abstract void makeSound();
}

class Dog extends Animal {
    @Override
    public void makeSound() {  // Override only what's different
        System.out.println("Bark!");
    }

    // Inherits eat(), sleep(), breathe() implementations
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }

    // Can override common behavior if needed
    @Override
    public void eat() {
        System.out.println("Cat eating fish...");
    }
}
```

**Why:** Template Method pattern: provide defaults for common behavior, abstract for unique behavior.

**💡 Tip:** Abstract class should provide common functionality; only make truly variable methods abstract.

---

#### ❌ Wrong - Breaking Liskov Substitution Principle:
```java
// WRONG - LSP violation
class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getArea() {
        return width * height;
    }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;  // Force square
    }

    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;  // Force square
    }
}

// Breaks LSP:
public class Main {
    public static void testRectangle(Rectangle r) {
        r.setWidth(5);
        r.setHeight(10);
        assert r.getArea() == 50;  // Fails for Square!
    }

    public static void main(String[] args) {
        testRectangle(new Rectangle());  // Pass
        testRectangle(new Square());     // Fail - area is 100, not 50!
    }
}
```
**Issue:** Square changes behavior in unexpected way; violates LSP; subclass not substitutable

#### ✅ Right:
```java
// CORRECT - Use separate classes or immutable design
abstract class Shape {
    public abstract int getArea();
}

class Rectangle extends Shape {
    private final int width;
    private final int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public int getArea() {
        return width * height;
    }
}

class Square extends Shape {
    private final int side;

    public Square(int side) {
        this.side = side;
    }

    @Override
    public int getArea() {
        return side * side;
    }
}

// LSP maintained
public class Main {
    public static void printArea(Shape shape) {
        System.out.println("Area: " + shape.getArea());
        // Works for both Rectangle and Square
    }
}
```

**Why:** Immutable design or separate hierarchies prevent LSP violations.

**💡 Tip:** If subclass must break parent's contract, inheritance is wrong; use composition instead.

---

This comprehensive list now contains **40+ Polymorphism mistakes** covering all fundamental concepts!

---

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