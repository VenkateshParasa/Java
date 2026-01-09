
# Day 14: Abstraction - Abstract Classes & Interfaces

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

By the end of Day 14, you will be able to:
- Understand the concept of abstraction
- Create and use abstract classes
- Define and implement interfaces
- Understand the difference between abstract classes and interfaces
- Use multiple inheritance with interfaces
- Work with default and static methods in interfaces (Java 8+)
- Apply abstraction in real-world scenarios
- Understand when to use abstract classes vs interfaces
- Implement functional interfaces

---

## 📚 Topics Covered

### 1. What is Abstraction?

**Abstraction** is the process of hiding implementation details and showing only essential features to the user.

#### Key Concepts:
- **Hide Complexity**: Show only what's necessary
- **Focus on WHAT, not HOW**: Define what to do, not how to do it
- **Contract**: Define a contract that must be followed
- **Flexibility**: Allow different implementations

#### Real-World Analogy:
Think of a **car** - you know how to drive it (steering wheel, pedals, gear) without knowing how the engine works internally. The car provides an abstraction of its complex internal mechanisms.

#### Abstraction in Java:
Java provides two ways to achieve abstraction:
1. **Abstract Classes** (0-100% abstraction)
2. **Interfaces** (100% abstraction)

---

### 2. Abstract Classes

An **abstract class** is a class that cannot be instantiated and may contain abstract methods (methods without implementation).

#### Syntax:
```java
abstract class ClassName {
    // Abstract method (no body)
    abstract returnType methodName();
    
    // Concrete method (with body)
    returnType concreteMethod() {
        // implementation
    }
}
```

#### Key Rules:
- Cannot create objects of abstract class
- Can have abstract and concrete methods
- Can have constructors
- Can have instance variables
- Can have static methods
- Child class must implement all abstract methods (or be abstract itself)

#### Basic Example:
```java
// Abstract class
abstract class Animal {
    String name;
    
    // Constructor
    public Animal(String name) {
        this.name = name;
    }
    
    // Abstract method (no implementation)
    abstract void makeSound();
    
    // Concrete method (with implementation)
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Concrete class
class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    // Must implement abstract method
    @Override
    void makeSound() {
        System.out.println(name + " barks: Woof! Woof!");
    }
}

class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " meows: Meow! Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        // Animal animal = new Animal("Generic");  // ERROR! Cannot instantiate
        
        Animal dog = new Dog("Buddy");
        Animal cat = new Cat("Whiskers");
        
        dog.makeSound();  // Dog barks
        dog.sleep();      // Inherited concrete method
        
        cat.makeSound();  // Cat meows
        cat.sleep();      // Inherited concrete method
    }
}
```

**Output:**
```
Buddy barks: Woof! Woof!
Buddy is sleeping
Whiskers meows: Meow! Meow!
Whiskers is sleeping
```

---

### 3. Abstract Class Features

#### 1. Abstract Methods
```java
abstract class Shape {
    // Abstract methods - no implementation
    abstract double getArea();
    abstract double getPerimeter();
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    double getPerimeter() {
        return 2 * Math.PI * radius;
    }
}
```

#### 2. Concrete Methods
```java
abstract class Vehicle {
    protected String brand;
    
    public Vehicle(String brand) {
        this.brand = brand;
    }
    
    // Abstract method
    abstract void start();
    
    // Concrete methods
    public void displayBrand() {
        System.out.println("Brand: " + brand);
    }
    
    public void stop() {
        System.out.println("Vehicle stopping...");
    }
}
```

#### 3. Constructors
```java
abstract class Employee {
    protected String name;
    protected double salary;
    
    // Constructor in abstract class
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
        System.out.println("Employee constructor called");
    }
    
    abstract double calculateBonus();
}

class Manager extends Employee {
    public Manager(String name, double salary) {
        super(name, salary);  // Call parent constructor
    }
    
    @Override
    double calculateBonus() {
        return salary * 0.20;
    }
}
```

#### 4. Instance Variables
```java
abstract class BankAccount {
    protected String accountNumber;
    protected double balance;
    protected String accountHolder;
    
    public BankAccount(String accountNumber, String accountHolder, double balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
    
    abstract void calculateInterest();
    
    public void deposit(double amount) {
        balance += amount;
    }
}
```

---

### 4. Interfaces

An **interface** is a completely abstract class that contains only abstract methods (before Java 8) and constants.

#### Syntax:
```java
interface InterfaceName {
    // Abstract methods (public abstract by default)
    returnType methodName();
    
    // Constants (public static final by default)
    int CONSTANT = 100;
}
```

#### Key Rules:
- All methods are public and abstract by default (before Java 8)
- All variables are public, static, and final by default
- Cannot have constructors
- Cannot have instance variables
- A class can implement multiple interfaces
- An interface can extend multiple interfaces

#### Basic Example:
```java
// Interface
interface Drawable {
    void draw();  // public abstract by default
}

// Implementing interface
class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

class Rectangle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
}

public class Main {
    public static void main(String[] args) {
        Drawable circle = new Circle();
        Drawable rectangle = new Rectangle();
        
        circle.draw();
        rectangle.draw();
    }
}
```

---

### 5. Multiple Inheritance with Interfaces

Java doesn't support multiple inheritance with classes, but supports it with interfaces.

#### Example:
```java
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

// Multiple interface implementation
class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck is swimming");
    }
}

class Fish implements Swimmable {
    @Override
    public void swim() {
        System.out.println("Fish is swimming");
    }
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("Bird is flying");
    }
}

public class Main {
    public static void main(String[] args) {
        Duck duck = new Duck();
        duck.fly();
        duck.swim();
        
        Fish fish = new Fish();
        fish.swim();
        
        Bird bird = new Bird();
        bird.fly();
    }
}
```

---

### 6. Interface Inheritance

Interfaces can extend other interfaces.

#### Example:
```java
interface Animal {
    void eat();
}

interface Mammal extends Animal {
    void breathe();
}

interface Carnivore extends Animal {
    void hunt();
}

// Implementing extended interface
class Lion implements Mammal, Carnivore {
    @Override
    public void eat() {
        System.out.println("Lion is eating");
    }
    
    @Override
    public void breathe() {
        System.out.println("Lion is breathing");
    }
    
    @Override
    public void hunt() {
        System.out.println("Lion is hunting");
    }
}
```

---

### 7. Default Methods (Java 8+)

Java 8 introduced **default methods** in interfaces - methods with implementation.

#### Syntax:
```java
interface MyInterface {
    // Abstract method
    void abstractMethod();
    
    // Default method (with implementation)
    default void defaultMethod() {
        System.out.println("Default implementation");
    }
}
```

#### Example:
```java
interface Vehicle {
    void start();
    
    // Default method
    default void honk() {
        System.out.println("Beep! Beep!");
    }
    
    default void displayInfo() {
        System.out.println("This is a vehicle");
    }
}

class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car starting...");
    }
    
    // Can override default method
    @Override
    public void honk() {
        System.out.println("Car horn: Honk! Honk!");
    }
    
    // Can use default displayInfo() as is
}

class Bike implements Vehicle {
    @Override
    public void start() {
        System.out.println("Bike starting...");
    }
    
    // Uses default honk() and displayInfo()
}

public class Main {
    public static void main(String[] args) {
        Vehicle car = new Car();
        car.start();
        car.honk();  // Overridden
        car.displayInfo();  // Default
        
        Vehicle bike = new Bike();
        bike.start();
        bike.honk();  // Default
        bike.displayInfo();  // Default
    }
}
```

---

### 8. Static Methods in Interfaces (Java 8+)

Interfaces can have static methods with implementation.

#### Example:
```java
interface MathOperations {
    // Abstract method
    int calculate(int a, int b);
    
    // Static method
    static int add(int a, int b) {
        return a + b;
    }
    
    static int multiply(int a, int b) {
        return a * b;
    }
}

class Calculator implements MathOperations {
    @Override
    public int calculate(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        // Call static methods directly on interface
        System.out.println("Add: " + MathOperations.add(10, 5));
        System.out.println("Multiply: " + MathOperations.multiply(10, 5));
        
        Calculator calc = new Calculator();
        System.out.println("Calculate: " + calc.calculate(10, 5));
    }
}
```

---

### 9. Abstract Class vs Interface

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| **Methods** | Can have abstract and concrete methods | All methods abstract (before Java 8) |
| **Variables** | Can have instance variables | Only constants (public static final) |
| **Constructors** | Can have constructors | Cannot have constructors |
| **Access Modifiers** | Can use any access modifier | Methods public by default |
| **Multiple Inheritance** | Cannot extend multiple classes | Can implement multiple interfaces |
| **When to Use** | IS-A relationship, shared code | CAN-DO relationship, contract |
| **Abstraction Level** | 0-100% abstraction | 100% abstraction (before Java 8) |

#### When to Use Abstract Class:
- When you want to share code among related classes
- When you need non-static or non-final fields
- When you need to define non-public members
- When you have a clear IS-A relationship

#### When to Use Interface:
- When you want to define a contract
- When you need multiple inheritance
- When unrelated classes should implement your interface
- When you want to specify behavior of a particular data type

#### Example Showing Both:
```java
// Abstract class for IS-A relationship
abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    abstract void makeSound();
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Interfaces for CAN-DO capabilities
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

// Duck IS-A Animal, CAN fly and swim
class Duck extends Animal implements Flyable, Swimmable {
    public Duck(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " quacks");
    }
    
    @Override
    public void fly() {
        System.out.println(name + " is flying");
    }
    
    @Override
    public void swim() {
        System.out.println(name + " is swimming");
    }
}

// Fish IS-A Animal, CAN swim
class Fish extends Animal implements Swimmable {
    public Fish(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " makes bubbles");
    }
    
    @Override
    public void swim() {
        System.out.println(name + " is swimming");
    }
}
```

---

### 10. Functional Interfaces

A **functional interface** is an interface with exactly one abstract method. Used with lambda expressions.

#### Example:
```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);  // Single abstract method
}

public class Main {
    public static void main(String[] args) {
        // Using lambda expression
        Calculator add = (a, b) -> a + b;
        Calculator subtract = (a, b) -> a - b;
        Calculator multiply = (a, b) -> a * b;
        
        System.out.println("Add: " + add.calculate(10, 5));
        System.out.println("Subtract: " + subtract.calculate(10, 5));
        System.out.println("Multiply: " + multiply.calculate(10, 5));
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Banking System with Abstract Classes
Create a banking system using abstract classes.

```java
// Abstract base class
abstract class BankAccount {
    protected String accountNumber;
    protected String accountHolder;
    protected double balance;
    protected double interestRate;
    
    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    
    // Abstract methods
    abstract void calculateInterest();
    abstract double getMinimumBalance();
    abstract String getAccountType();
    
    // Concrete methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && balance - amount >= getMinimumBalance()) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            return true;
        }
        System.out.println("Insufficient balance or below minimum!");
        return false;
    }
    
    public void displayInfo() {
        System.out.println("\n=== " + getAccountType() + " ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + String.format("%.2f", balance));
        System.out.println("Interest Rate: " + (interestRate * 100) + "%");
        System.out.println("Minimum Balance: $" + getMinimumBalance());
    }
}

// Savings Account
class SavingsAccount extends BankAccount {
    private int withdrawalCount;
    private static final int MAX_WITHDRAWALS = 6;
    
    public SavingsAccount(String accountNumber, String accountHolder, double initialBalance) {
        super(accountNumber, accountHolder, initialBalance);
        this.interestRate = 0.04;  // 4%
        this.withdrawalCount = 0;
    }
    
    @Override
    void calculateInterest() {
        double interest = balance * interestRate;
        balance += interest;
        System.out.println("Interest added: $" + String.format("%.2f", interest));
    }
    
    @Override
    double getMinimumBalance() {
        return 500.0;
    }
    
    @Override
    String getAccountType() {
        return "Savings Account";
    }
    
    @Override
    public boolean withdraw(double amount) {
        if (withdrawalCount >= MAX_WITHDRAWALS) {
            System.out.println("Monthly withdrawal limit reached!");
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
}

// Checking Account
class CheckingAccount extends BankAccount {
    private double overdraftLimit;
    
    public CheckingAccount(String accountNumber, String accountHolder, double initialBalance) {
        super(accountNumber, accountHolder, initialBalance);
        this.interestRate = 0.01;  // 1%
        this.overdraftLimit = 1000.0;
    }
    
    @Override
    void calculateInterest() {
        if (balance > 0) {
            double interest = balance * interestRate;
            balance += interest;
            System.out.println("Interest added: $" + String.format("%.2f", interest));
        }
    }
    
    @Override
    double getMinimumBalance() {
        return -overdraftLimit;  // Can go negative
    }
    
    @Override
    String getAccountType() {
        return "Checking Account";
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Overdraft Limit: $" + overdraftLimit);
    }
}

// Fixed Deposit Account
class FixedDepositAccount extends BankAccount {
    private int termMonths;
    private boolean isMatured;
    
    public FixedDepositAccount(String accountNumber, String accountHolder, 
                              double initialBalance, int termMonths) {
        super(accountNumber, accountHolder, initialBalance);
        this.termMonths = termMonths;
        this.interestRate = 0.07;  // 7%
        this.isMatured = false;
    }
    
    @Override
    void calculateInterest() {
        double interest = balance * interestRate * (termMonths / 12.0);
        balance += interest;
        System.out.println("Maturity interest: $" + String.format("%.2f", interest));
        isMatured = true;
    }
    
    @Override
    double getMinimumBalance() {
        return balance;  // Cannot withdraw before maturity
    }
    
    @Override
    String getAccountType() {
        return "Fixed Deposit Account";
    }
    
    @Override
    public boolean withdraw(double amount) {
        if (!isMatured) {
            System.out.println("Cannot withdraw before maturity!");
            return false;
        }
        return super.withdraw(amount);
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Term: " + termMonths + " months");
        System.out.println("Status: " + (isMatured ? "Matured" : "Active"));
    }
}

public class TestBankAccount {
    public static void main(String[] args) {
        BankAccount[] accounts = {
            new SavingsAccount("SAV001", "Alice", 5000),
            new CheckingAccount("CHK001", "Bob", 2000),
            new FixedDepositAccount("FD001", "Charlie", 10000, 12)
        };
        
        for (BankAccount account : accounts) {
            account.displayInfo();
            account.deposit(1000);
            account.withdraw(500);
            account.calculateInterest();
            account.displayInfo();
            System.out.println("---");
        }
    }
}
```

---

### Exercise 2: Payment System with Interfaces
Create a payment processing system using interfaces.

```java
// Payment interface
interface Payment {
    boolean processPayment(double amount);
    String getPaymentMethod();
    void displayReceipt();
}

// Refundable interface
interface Refundable {
    boolean processRefund(double amount);
}

// Trackable interface
interface Trackable {
    String getTransactionId();
    String getStatus();
}

// Credit Card Payment
class CreditCardPayment implements Payment, Refundable, Trackable {
    private String cardNumber;
    private String cardHolder;
    private double amount;
    private String transactionId;
    private String status;
    
    public CreditCardPayment(String cardNumber, String cardHolder, String transactionId) {
        this.cardNumber = maskCard(cardNumber);
        this.cardHolder = cardHolder;
        this.transactionId = transactionId;
        this.status = "Pending";
    }
    
    private String maskCard(String cardNumber) {
        return "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
    }
    
    @Override
    public boolean processPayment(double amount) {
        this.amount = amount;
        System.out.println("Processing credit card payment of $" + amount);
        status = "Completed";
        return true;
    }
    
    @Override
    public String getPaymentMethod() {
        return "Credit Card";
    }
    
    @Override
    public void displayReceipt() {
        System.out.println("\n=== Payment Receipt ===");
        System.out.println("Method: " + getPaymentMethod());
        System.out.println("Card: " + cardNumber);
        System.out.println("Holder: " + cardHolder);
        System.out.println("Amount: $" + amount);
        System.out.println("Transaction ID: " + transactionId);
        System.out.println("Status: " + status);
    }
    
    @Override
    public boolean processRefund(double amount) {
        if (amount <= this.amount) {
            System.out.println("Refund of $" + amount + " processed");
            this.amount -= amount;
            return true;
        }
        return false;
    }
    
    @Override
    public String getTransactionId() {
        return transactionId;
    }
    
    @Override
    public String getStatus() {
        return status;
    }
}

// PayPal Payment
class PayPalPayment implements Payment, Refundable, Trackable {
    private String email;
    private double amount;
    private String transactionId;
    private String status;
    
    public PayPalPayment(String email, String transactionId) {
        this.email = email;
        this.transactionId = transactionId;
        this.status = "Pending";
    }
    
    @Override
    public boolean processPayment(double amount) {
        this.amount = amount;
        System.out.println("Processing PayPal payment of $" + amount);
        status = "Completed";
        return true;
    }
    
    @Override
    public String getPaymentMethod() {
        return "PayPal";
    }
    
    @Override
    public void displayReceipt() {
        System.out.println("\n=== Payment Receipt ===");
        System.out.println("Method: " + getPaymentMethod());
        System.out.println("Email: " + email);
        System.out.println("Amount: $" + amount);
        System.out.println("Transaction ID: " + transactionId);
        System.out.println("Status: " + status);
    }
    
    @Override
    public boolean processRefund(double amount) {
        if (amount <= this.amount) {
            System.out.println("Refund of $" + amount + " processed to PayPal");
            this.amount -= amount;
            return true;
        }
        return false;
    }
    
    @Override
    public String getTransactionId() {
        return transactionId;
    }
    
    @Override
    public String getStatus() {
        return status;
    }
}

// Cash Payment (not refundable or trackable)
class CashPayment implements Payment {
    private double amount;
    
    @Override
    public boolean processPayment(double amount) {
        this.amount = amount;
        System.out.println("Cash payment of $" + amount + " received");
        return true;
    }
    
    @Override
    public String getPaymentMethod() {
        return "Cash";
    }
    
    @Override
    public void displayReceipt() {
        System.out.println("\n=== Payment Receipt ===");
        System.out.println("Method: " + getPaymentMethod());
        System.out.println("Amount: $" + amount);
        System.out.println("Status: Completed");
    }
}

// Payment Processor
class PaymentProcessor {
    public void process(Payment payment, double amount) {
        payment.processPayment(amount);
        payment.displayReceipt();
        
        // Check if refundable
        if (payment instanceof Refundable) {
            System.out.println("This payment method supports refunds");
        }
        
        // Check if trackable
        if (payment instanceof Trackable) {
            Trackable trackable = (Trackable) payment;
            System.out.println("Transaction ID: " + trackable.getTransactionId());
        }
    }
}

public class TestPayment {
    public static void main(String[] args) {
        PaymentProcessor processor = new PaymentProcessor();
        
        Payment creditCard = new CreditCardPayment("1234567890123456", "John Doe", "TXN001");
        Payment paypal = new PayPalPayment("john@example.com", "TXN002");
        Payment cash = new CashPayment();
        
        processor.process(creditCard, 150.00);
        System.out.println();
        processor.process(paypal, 75.50);
        System.out.println();
        processor.process(cash, 50.00);
    }
}
```

---

## 🔑 Key Takeaways

1. **Abstraction**: Hide implementation details, show only essential features
2. **Abstract Class**: Can have abstract and concrete methods, constructors, instance variables
3. **Interface**: Contract that classes must follow, supports multiple inheritance
4. **Abstract Methods**: Methods without implementation (must be overridden)
5. **Default Methods**: Interface methods with implementation (Java 8+)
6. **Static Methods**: Interface static methods (Java 8+)
7. **Multiple Inheritance**: Achieved through interfaces, not classes
8. **Abstract Class vs Interface**: Use abstract class for IS-A, interface for CAN-DO
9. **Functional Interface**: Interface with single abstract method
10. **Polymorphism**: Both abstract classes and interfaces enable polymorphism

---

## ⚠️ Common Mistakes

### 1. Trying to Instantiate Abstract Class:
```java
// WRONG
abstract class Animal { }
Animal animal = new Animal();  // ERROR!

// CORRECT
class Dog extends Animal { }
Animal animal = new Dog();
```

### 2. Not Implementing All Abstract Methods:
```java
// WRONG
abstract class Shape {
    abstract double getArea();
    abstract double getPerimeter();
}

class Circle extends Shape {
    // ERROR! Must implement both methods
    double getArea() { return 0; }
    // Missing getPerimeter()
}

// CORRECT
class Circle extends Shape {
    double getArea() { return 0; }
    double getPerimeter() { return 0; }
}
```

### 3. Declaring Variables in Interface (Before Java 8):
```java
// WRONG
interface MyInterface {
    int value;  // ERROR! Must be initialized
}

// CORRECT
interface MyInterface {
    int VALUE = 100;  // public static final by default
}
```

### 4. Using Private Methods in Interface (Before Java 9):
```java
// WRONG (before Java 9)
interface MyInterface {
    private void helper() { }  // ERROR!
}

// CORRECT (Java 9+)
interface MyInterface {
    private void helper() { }  // OK in Java 9+
}
```

### 5. Multiple Class Inheritance:
```java
// WRONG
class A { }
class B { }
class C extends A, B { }  // ERROR! Cannot extend multiple classes

// CORRECT
interface A { }
interface B { }
class C implements A, B { }  // OK with interfaces
```

### 6. Forgetting to Override Abstract Methods:
```java
// WRONG
abstract class Animal {
    abstract void makeSound();
}

class Dog extends Animal {
    // ERROR! Must override makeSound()
}

// CORRECT
class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark");
    }
}
```

### 7. Reducing Visibility When Implementing:
```java
// WRONG
interface MyInterface {
    void method();  // public by default
}

class MyClass implements MyInterface {
    void method() { }  // ERROR! Cannot reduce to package-private
}

// CORRECT
class MyClass implements MyInterface {
    public void method() { }  // Must be public
}
```

### 8. Constructor in Interface:
```java
// WRONG
interface MyInterface {
    MyInterface() { }  // ERROR! Interfaces cannot have constructors
}

// CORRECT - Use abstract class if you need constructor
abstract class MyClass {
    MyClass() { }  // OK
}
```

### 9. Confusing Abstract Class with Interface:
```java
// WRONG - Using interface when abstract class is better
interface Animal {
    // Cannot have instance variables
    // Cannot have constructors
}

// CORRECT - Use abstract class for shared state
abstract class Animal {
    protected String name;  // Instance variable
    
    public Animal(String name) {  // Constructor
        this.name = name;
    }
}
```

### 10. Not Using @FunctionalInterface:
```java
// RISKY - No compile-time check
interface Calculator {
    int calculate(int a, int b);
    int another(int x);  // Oops! Two methods
}

// BETTER - Compiler will catch error
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
    // int another(int x);  // ERROR! Only one abstract method allowed
}
```

---

## 🔗 Navigation

### Previous Day
← [Day 13: Polymorphism](day13_polymorphism.md)

### Week Overview
↑ [Week 2:
 Object-Oriented Programming Fundamentals](README.md)

### Course Home
🏠 [Core Java Daily Learning](../README.md)

### Related Topics
- [Day 12: Inheritance](day12_inheritance.md) - Foundation for abstraction
- [Day 13: Polymorphism](day13_polymorphism.md) - Works with abstraction
- [Day 11: Encapsulation](day11_encapsulation.md) - Another pillar of OOP

### Assessment
📝 [Day 14 Assessment](../../../java-learning-app/src/data/assessments/java/week2/day14.js) - Test your abstraction knowledge

---

**Daily Practice Reminder**: Complete all exercises before moving forward. Abstraction is the final pillar of OOP!

**Estimated Study Time**: 5-6 hours

**Difficulty Level**: ⭐⭐⭐⭐⭐ Advanced

---

**🎉 Congratulations on completing Week 2!**

You've now mastered all four pillars of Object-Oriented Programming:
1. ✅ Encapsulation
2. ✅ Inheritance
3. ✅ Polymorphism
4. ✅ Abstraction

You're ready to move on to Week 3: Advanced Java Concepts!

---

*Last Updated: 2026-01-08*
*Part of Week 2: Object-Oriented Programming Fundamentals*