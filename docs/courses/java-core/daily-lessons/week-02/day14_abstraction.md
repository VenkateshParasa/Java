
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

**📝 Problem Statement:**
Create a comprehensive banking system using abstract classes to demonstrate abstraction principles. The system should use an abstract BankAccount base class with concrete implementations for three account types (Savings, Checking, FixedDeposit), each with unique interest calculation, minimum balance rules, and withdrawal restrictions.

**Requirements:**
- Create abstract BankAccount class with protected fields: accountNumber, accountHolder, balance, interestRate
- Define abstract methods: calculateInterest(), getMinimumBalance(), getAccountType()
- Implement concrete methods in BankAccount: deposit(), withdraw(), displayInfo()
- withdraw() method must check balance >= getMinimumBalance() using abstract method polymorphically
- displayInfo() must call getAccountType() abstract method to display account type dynamically
- Create SavingsAccount subclass with withdrawalCount field and MAX_WITHDRAWALS constant (6)
- Set interestRate to 0.04 (4%) for SavingsAccount in constructor
- Override calculateInterest() in SavingsAccount with simple interest: balance × interestRate
- Override getMinimumBalance() returning 500.0 for SavingsAccount
- Override withdraw() in SavingsAccount to enforce withdrawal limit before calling super.withdraw()
- Implement resetWithdrawalCount() method in SavingsAccount
- Create CheckingAccount subclass with overdraftLimit field set to 1000.0
- Set interestRate to 0.01 (1%) for CheckingAccount
- Override calculateInterest() in CheckingAccount to only add interest if balance > 0
- Override getMinimumBalance() returning -overdraftLimit (allows negative balance)
- CheckingAccount overrides displayInfo() calling super then showing overdraft limit
- Create FixedDepositAccount subclass with termMonths and isMatured fields
- Set interestRate to 0.07 (7%) for FixedDepositAccount
- Override calculateInterest() using compound interest formula: balance × interestRate × (termMonths/12)
- Override getMinimumBalance() returning current balance (prevents withdrawals before maturity)
- Override withdraw() in FixedDepositAccount to check isMatured flag before allowing withdrawal
- FixedDepositAccount overrides displayInfo() showing term and maturity status
- Demonstrate polymorphism by storing different account types in BankAccount[] array

**Sample Test Cases:**
```
Input: SavingsAccount("SAV001", "Alice", 5000), deposit(1000), withdraw(500), calculateInterest()
Expected Output:
=== Savings Account ===
Account Number: SAV001
Account Holder: Alice
Balance: $5000.00
Interest Rate: 4.0%
Minimum Balance: $500.0

Deposited: $1000.0
Withdrawn: $500.0
Interest added: $220.00

=== Savings Account ===
Account Number: SAV001
Account Holder: Alice
Balance: $5720.00
Interest Rate: 4.0%
Minimum Balance: $500.0

Input: CheckingAccount("CHK001", "Bob", 2000), deposit(1000), withdraw(2500)
Expected Output:
=== Checking Account ===
Account Number: CHK001
Account Holder: Bob
Balance: $2000.00
Interest Rate: 1.0%
Minimum Balance: $-1000.0
Overdraft Limit: $1000.0

Deposited: $1000.0
Withdrawn: $2500.0

=== Checking Account ===
Account Number: CHK001
Account Holder: Bob
Balance: $500.00
Interest Rate: 1.0%
Minimum Balance: $-1000.0
Overdraft Limit: $1000.0

Input: FixedDepositAccount("FD001", "Charlie", 10000, 12), withdraw(500) [before maturity]
Expected Output:
Cannot withdraw before maturity!

Input: FixedDepositAccount after calculateInterest()
Expected Output:
Maturity interest: $700.00
=== Fixed Deposit Account ===
Account Number: FD001
Account Holder: Charlie
Balance: $11200.00
Interest Rate: 7.0%
Minimum Balance: $11200.00
Term: 12 months
Status: Matured
```

**Solution:**
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

**💡 Tips:**
- Abstract BankAccount class cannot be instantiated directly - only concrete subclasses can be created
- Abstract methods (calculateInterest, getMinimumBalance, getAccountType) force all subclasses to provide implementations
- withdraw() in BankAccount calls abstract getMinimumBalance() - polymorphic behavior determined at runtime by subclass
- Template Method pattern: BankAccount.withdraw() provides algorithm skeleton, subclasses fill in getMinimumBalance() details
- SavingsAccount withdrawal limit enforced by overriding withdraw() and calling super.withdraw() after checking count
- CheckingAccount allows negative balance by returning -overdraftLimit from getMinimumBalance()
- FixedDepositAccount prevents premature withdrawal by overriding getMinimumBalance() to return current balance
- Interest calculation differs per account type: Savings (simple), Checking (conditional), FixedDeposit (time-based)
- isMatured flag in FixedDepositAccount controls withdrawal permission - demonstrates state-based behavior
- BankAccount[] array holds different account types demonstrating polymorphism through abstraction
- super() constructor calls in subclasses initialize protected parent fields (accountNumber, accountHolder, balance)
- Override displayInfo() in subclasses calling super.displayInfo() first, then adding subclass-specific fields

---

### Exercise 2: Payment System with Interfaces

**📝 Problem Statement:**
Create a payment processing system using interfaces to demonstrate multiple interface implementation and interface segregation. The system should define Payment, Refundable, and Trackable interfaces, with concrete payment implementations (CreditCard, PayPal, Cash) that implement different combinations of these interfaces based on their capabilities, demonstrating that not all payment methods support all features.

**Requirements:**
- Create Payment interface with methods: processPayment(double amount), getPaymentMethod(), displayReceipt()
- Create Refundable interface with method: processRefund(double amount)
- Create Trackable interface with methods: getTransactionId(), getStatus()
- Implement CreditCardPayment class implementing Payment, Refundable, and Trackable interfaces
- CreditCardPayment has fields: cardNumber, cardHolder, amount, transactionId, status
- Implement maskCard() private method in CreditCardPayment showing only last 4 digits: "**** **** **** 1234"
- Override processPayment() in CreditCardPayment displaying card holder, masked card, and approval message
- Implement PayPalPayment class implementing Payment, Refundable, and Trackable interfaces
- PayPalPayment has fields: email, amount, transactionId, status
- Override processPayment() in PayPalPayment displaying email and PayPal-specific confirmation
- Implement CashPayment class implementing only Payment interface (NOT Refundable or Trackable)
- CashPayment has only amount field - demonstrates interface segregation (cash not refundable/trackable)
- Override processPayment() in CashPayment with simple cash receipt message
- Create PaymentProcessor class with process(Payment payment) method accepting any Payment implementation
- Demonstrate instanceof checks in PaymentProcessor to conditionally use Refundable and Trackable features
- Show that CashPayment can be processed but doesn't support refunds or tracking
- Use interface references (Payment, Refundable, Trackable) to demonstrate polymorphism

**Sample Test Cases:**
```
Input: CreditCardPayment("1234567890123456", "John Doe", "TXN001").processPayment(150.00)
Expected Output:
Processing credit card payment of $150.0
Card Holder: John Doe
Card Number: **** **** **** 3456
Payment of $150.0 approved!

=== Payment Receipt ===
Method: Credit Card
Card: **** **** **** 3456
Holder: John Doe
Amount: $150.0
Transaction ID: TXN001
Status: Completed

This payment method supports refunds
Transaction ID: TXN001

Input: PayPalPayment("john@example.com", "TXN002").processPayment(75.50)
Expected Output:
Processing PayPal payment of $75.5
PayPal Email: john@example.com
Payment of $75.5 sent via PayPal!

=== Payment Receipt ===
Method: PayPal
Email: john@example.com
Amount: $75.5
Transaction ID: TXN002
Status: Completed

This payment method supports refunds
Transaction ID: TXN002

Input: CashPayment().processPayment(50.00)
Expected Output:
Cash payment of $50.0 received

=== Payment Receipt ===
Method: Cash
Amount: $50.0
Status: Completed

[No refund or tracking support shown - CashPayment doesn't implement those interfaces]

Input: creditCard.processRefund(50.00) [after payment]
Expected Output:
Refund of $50.0 processed
```

**Solution:**

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

**💡 Tips:**
- Payment interface defines common contract that all payment methods must implement (processPayment, getPaymentMethod, displayReceipt)
- Multiple interface implementation: CreditCardPayment and PayPalPayment implement Payment + Refundable + Trackable (3 interfaces)
- Interface Segregation Principle: CashPayment only implements Payment interface - doesn't implement Refundable or Trackable since cash payments don't support those features
- instanceof checks in PaymentProcessor conditionally access Refundable/Trackable features: if (payment instanceof Refundable)
- Interfaces enable polymorphism: process(Payment payment) method accepts any Payment implementation
- CreditCardPayment uses maskCard() private helper to show only last 4 digits for security
- Casting after instanceof check: Trackable trackable = (Trackable) payment allows calling getTransactionId()
- All interface methods are public by default - implementations must explicitly use public modifier
- Interfaces define "CAN-DO" capabilities: Payment CAN process, Refundable CAN refund, Trackable CAN track
- Java supports multiple interface implementation but not multiple class inheritance - interfaces provide flexibility
- Payment reference can hold any payment type demonstrating polymorphism: Payment payment = new CreditCardPayment(...)
- Interface segregation prevents forcing unnecessary methods on classes - CashPayment doesn't need refund/tracking methods

---

### Exercise 3: Document Processing System

**📝 Problem Statement:**
Create a document processing system using abstract classes to handle different document types. The system should use an abstract Document base class with concrete implementations for PDF, Word, and Text documents, each with unique processing, validation, and encryption capabilities while sharing common document properties.

**Requirements:**
- Create abstract Document class with protected fields: fileName, fileSize, content, isEncrypted
- Define abstract methods: open(), save(), validate(), encrypt() that subclasses must implement
- Implement displayInfo() method in Document showing file details and encrypted status
- Implement getFileExtension() abstract method returning file extension as String
- Create PDFDocument subclass with fields: pageCount, isCompressed
- Override open() in PDFDocument with message: "Opening PDF document with Adobe Reader..."
- Override validate() in PDFDocument checking if pageCount > 0 and fileSize < 10MB
- Override encrypt() in PDFDocument with 256-bit encryption message
- Create WordDocument subclass with fields: wordCount, hasComments
- Override open() in WordDocument with message: "Opening Word document with Microsoft Word..."
- Override validate() in WordDocument checking if wordCount > 0 and content not empty
- Override encrypt() in WordDocument with password-protection message
- Create TextDocument subclass with fields: lineCount, encoding
- Override open() in TextDocument with message: "Opening text document with notepad..."
- Override validate() in TextDocument checking if lineCount > 0 and encoding is UTF-8
- Override encrypt() in TextDocument with simple XOR encryption message
- Each document type overrides displayInfo() calling super then showing type-specific fields
- Create DocumentManager class with processDocument(Document doc) method
- Demonstrate polymorphism by storing different document types in Document[] array
- Show validation before opening documents

**Sample Test Cases:**
```
Input: PDFDocument("report.pdf", 1024, "Annual Report", 50, true)
Expected Output:
Opening PDF document with Adobe Reader...
Validating PDF document...
Document is valid!
Encrypting with 256-bit AES encryption...
Document encrypted successfully!

=== Document Information ===
File Name: report.pdf
File Size: 1024 KB
Extension: .pdf
Encrypted: true
Page Count: 50
Compressed: true

Input: WordDocument("proposal.docx", 512, "Project Proposal", 2500, true)
Expected Output:
Opening Word document with Microsoft Word...
Validating Word document...
Document is valid!
Encrypting with password protection...
Document encrypted successfully!

=== Document Information ===
File Name: proposal.docx
File Size: 512 KB
Extension: .docx
Encrypted: true
Word Count: 2500
Has Comments: true

Input: TextDocument("notes.txt", 10, "Meeting notes", 120, "UTF-8")
Expected Output:
Opening text document with notepad...
Validating text document...
Document is valid!
Encrypting with XOR cipher...
Document encrypted successfully!

=== Document Information ===
File Name: notes.txt
File Size: 10 KB
Extension: .txt
Encrypted: true
Line Count: 120
Encoding: UTF-8
```

**Solution:**
```java
// Abstract Document class
abstract class Document {
    protected String fileName;
    protected int fileSize;  // in KB
    protected String content;
    protected boolean isEncrypted;

    public Document(String fileName, int fileSize, String content) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.content = content;
        this.isEncrypted = false;
    }

    // Abstract methods
    public abstract void open();
    public abstract void save();
    public abstract boolean validate();
    public abstract void encrypt();
    public abstract String getFileExtension();

    // Concrete method
    public void displayInfo() {
        System.out.println("\n=== Document Information ===");
        System.out.println("File Name: " + fileName);
        System.out.println("File Size: " + fileSize + " KB");
        System.out.println("Extension: " + getFileExtension());
        System.out.println("Encrypted: " + isEncrypted);
    }

    public void processDocument() {
        open();
        if (validate()) {
            System.out.println("Document is valid!");
            encrypt();
            displayInfo();
        } else {
            System.out.println("Document validation failed!");
        }
    }
}

// PDF Document
class PDFDocument extends Document {
    private int pageCount;
    private boolean isCompressed;

    public PDFDocument(String fileName, int fileSize, String content, int pageCount, boolean isCompressed) {
        super(fileName, fileSize, content);
        this.pageCount = pageCount;
        this.isCompressed = isCompressed;
    }

    @Override
    public void open() {
        System.out.println("Opening PDF document with Adobe Reader...");
    }

    @Override
    public void save() {
        System.out.println("Saving PDF document...");
    }

    @Override
    public boolean validate() {
        System.out.println("Validating PDF document...");
        return pageCount > 0 && fileSize < 10240;  // Less than 10MB
    }

    @Override
    public void encrypt() {
        System.out.println("Encrypting with 256-bit AES encryption...");
        isEncrypted = true;
        System.out.println("Document encrypted successfully!");
    }

    @Override
    public String getFileExtension() {
        return ".pdf";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Page Count: " + pageCount);
        System.out.println("Compressed: " + isCompressed);
    }
}

// Word Document
class WordDocument extends Document {
    private int wordCount;
    private boolean hasComments;

    public WordDocument(String fileName, int fileSize, String content, int wordCount, boolean hasComments) {
        super(fileName, fileSize, content);
        this.wordCount = wordCount;
        this.hasComments = hasComments;
    }

    @Override
    public void open() {
        System.out.println("Opening Word document with Microsoft Word...");
    }

    @Override
    public void save() {
        System.out.println("Saving Word document...");
    }

    @Override
    public boolean validate() {
        System.out.println("Validating Word document...");
        return wordCount > 0 && content != null && !content.isEmpty();
    }

    @Override
    public void encrypt() {
        System.out.println("Encrypting with password protection...");
        isEncrypted = true;
        System.out.println("Document encrypted successfully!");
    }

    @Override
    public String getFileExtension() {
        return ".docx";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Word Count: " + wordCount);
        System.out.println("Has Comments: " + hasComments);
    }
}

// Text Document
class TextDocument extends Document {
    private int lineCount;
    private String encoding;

    public TextDocument(String fileName, int fileSize, String content, int lineCount, String encoding) {
        super(fileName, fileSize, content);
        this.lineCount = lineCount;
        this.encoding = encoding;
    }

    @Override
    public void open() {
        System.out.println("Opening text document with notepad...");
    }

    @Override
    public void save() {
        System.out.println("Saving text document...");
    }

    @Override
    public boolean validate() {
        System.out.println("Validating text document...");
        return lineCount > 0 && encoding.equals("UTF-8");
    }

    @Override
    public void encrypt() {
        System.out.println("Encrypting with XOR cipher...");
        isEncrypted = true;
        System.out.println("Document encrypted successfully!");
    }

    @Override
    public String getFileExtension() {
        return ".txt";
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Line Count: " + lineCount);
        System.out.println("Encoding: " + encoding);
    }
}

// Document Manager
class DocumentManager {
    public void processDocument(Document doc) {
        doc.processDocument();
    }

    public void processMultiple(Document[] documents) {
        System.out.println("=== Processing Multiple Documents ===");
        for (Document doc : documents) {
            processDocument(doc);
            System.out.println("---");
        }
    }
}

public class TestDocument {
    public static void main(String[] args) {
        DocumentManager manager = new DocumentManager();

        Document[] documents = {
            new PDFDocument("report.pdf", 1024, "Annual Report", 50, true),
            new WordDocument("proposal.docx", 512, "Project Proposal", 2500, true),
            new TextDocument("notes.txt", 10, "Meeting notes", 120, "UTF-8")
        };

        manager.processMultiple(documents);
    }
}
```

**💡 Tips:**
- Abstract Document class enforces contract: all document types must implement open(), save(), validate(), encrypt()
- Template Method pattern: processDocument() in Document provides algorithm skeleton, subclasses fill in specific steps
- validate() abstract method allows each document type to have unique validation rules (PDF checks page count, Word checks word count, Text checks encoding)
- encrypt() demonstrates different encryption strategies per document type: PDF uses AES-256, Word uses password protection, Text uses XOR
- getFileExtension() abstract method forces each subclass to return appropriate extension (.pdf, .docx, .txt)
- displayInfo() override pattern: super.displayInfo() shows common fields, then subclass adds type-specific fields
- processDocument() method validates before encrypting - demonstrates workflow control in abstract class
- isEncrypted flag updated in each encrypt() implementation - shared state managed across hierarchy
- Document[] array demonstrates polymorphism - different document types processed uniformly through common interface
- DocumentManager uses polymorphism: processDocument(Document doc) accepts any document type
- Each document type has unique fields reflecting real-world properties (PDF: pageCount/isCompressed, Word: wordCount/hasComments, Text: lineCount/encoding)
- Abstract class provides both structure (abstract methods) and behavior (processDocument, displayInfo)

---

### Exercise 4: Notification System with Interfaces

**📝 Problem Statement:**
Create a notification system using interfaces to demonstrate multiple interface implementation and the strategy pattern. The system should define Notification, Schedulable, and Retryable interfaces, with concrete implementations for Email, SMS, and Push notifications that implement different combinations based on their capabilities.

**Requirements:**
- Create Notification interface with methods: send(String recipient, String message), getNotificationType()
- Create Schedulable interface with methods: schedule(String dateTime), cancelSchedule()
- Create Retryable interface with methods: retry(), getMaxRetries()
- Implement EmailNotification class implementing Notification, Schedulable, and Retryable
- EmailNotification has fields: sender, subject, priority, retryCount, isScheduled
- Override send() in EmailNotification with SMTP server message and email details
- Implement retry() in EmailNotification with maximum 3 retry attempts
- Implement PushNotification class implementing Notification and Schedulable (NOT Retryable)
- PushNotification has fields: appName, deviceToken, isScheduled
- Override send() in PushNotification with push service message and device info
- Implement SMSNotification class implementing only Notification interface
- SMSNotification has fields: phoneNumber, carrierCode
- Override send() in SMSNotification with SMS gateway message
- Create NotificationService class with sendNotification(Notification notification) method
- Demonstrate instanceof checks to use Schedulable and Retryable features conditionally
- Show that SMSNotification can be sent but doesn't support scheduling or retry
- Implement batch sending with Notification[] array demonstrating polymorphism

**Sample Test Cases:**
```
Input: EmailNotification("admin@example.com", "john@example.com", "Account Alert", "HIGH")
       .send("john@example.com", "Your password was changed")
Expected Output:
Connecting to SMTP server...
Sending email notification...
From: admin@example.com
To: john@example.com
Subject: Account Alert
Priority: HIGH
Message: Your password was changed
Email sent successfully!

Notification Type: Email
This notification can be scheduled
This notification supports retry (Max retries: 3)

Input: PushNotification("MyApp", "device_token_12345")
       .schedule("2024-02-15 10:00")
       .send("device_token_12345", "New message received")
Expected Output:
Notification scheduled for: 2024-02-15 10:00
Connecting to push notification service...
Sending push notification...
App: MyApp
Device Token: device_token_12345
Message: New message received
Push notification sent successfully!

Notification Type: Push
This notification can be scheduled

Input: SMSNotification("+1234567890", "ATT")
       .send("+1234567890", "Your verification code is 123456")
Expected Output:
Connecting to SMS gateway...
Sending SMS notification...
Phone Number: +1234567890
Carrier: ATT
Message: Your verification code is 123456
SMS sent successfully!

Notification Type: SMS
[No scheduling or retry support - SMSNotification only implements Notification]

Input: emailNotification.retry() [after failed send]
Expected Output:
Retrying email notification... (Attempt 1/3)
Email sent successfully on retry!
```

**Solution:**
```java
// Notification interface
interface Notification {
    void send(String recipient, String message);
    String getNotificationType();
}

// Schedulable interface
interface Schedulable {
    void schedule(String dateTime);
    void cancelSchedule();
}

// Retryable interface
interface Retryable {
    boolean retry();
    int getMaxRetries();
}

// Email Notification
class EmailNotification implements Notification, Schedulable, Retryable {
    private String sender;
    private String recipient;
    private String subject;
    private String priority;
    private int retryCount;
    private boolean isScheduled;
    private String scheduledTime;
    private static final int MAX_RETRIES = 3;

    public EmailNotification(String sender, String recipient, String subject, String priority) {
        this.sender = sender;
        this.recipient = recipient;
        this.subject = subject;
        this.priority = priority;
        this.retryCount = 0;
        this.isScheduled = false;
    }

    @Override
    public void send(String recipient, String message) {
        System.out.println("Connecting to SMTP server...");
        System.out.println("Sending email notification...");
        System.out.println("From: " + sender);
        System.out.println("To: " + recipient);
        System.out.println("Subject: " + subject);
        System.out.println("Priority: " + priority);
        System.out.println("Message: " + message);
        System.out.println("Email sent successfully!");
    }

    @Override
    public String getNotificationType() {
        return "Email";
    }

    @Override
    public void schedule(String dateTime) {
        this.scheduledTime = dateTime;
        this.isScheduled = true;
        System.out.println("Notification scheduled for: " + dateTime);
    }

    @Override
    public void cancelSchedule() {
        this.isScheduled = false;
        System.out.println("Schedule cancelled for: " + scheduledTime);
    }

    @Override
    public boolean retry() {
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            System.out.println("Retrying email notification... (Attempt " + retryCount + "/" + MAX_RETRIES + ")");
            return true;
        }
        System.out.println("Max retries reached!");
        return false;
    }

    @Override
    public int getMaxRetries() {
        return MAX_RETRIES;
    }
}

// Push Notification
class PushNotification implements Notification, Schedulable {
    private String appName;
    private String deviceToken;
    private boolean isScheduled;
    private String scheduledTime;

    public PushNotification(String appName, String deviceToken) {
        this.appName = appName;
        this.deviceToken = deviceToken;
        this.isScheduled = false;
    }

    @Override
    public void send(String recipient, String message) {
        System.out.println("Connecting to push notification service...");
        System.out.println("Sending push notification...");
        System.out.println("App: " + appName);
        System.out.println("Device Token: " + recipient);
        System.out.println("Message: " + message);
        System.out.println("Push notification sent successfully!");
    }

    @Override
    public String getNotificationType() {
        return "Push";
    }

    @Override
    public void schedule(String dateTime) {
        this.scheduledTime = dateTime;
        this.isScheduled = true;
        System.out.println("Notification scheduled for: " + dateTime);
    }

    @Override
    public void cancelSchedule() {
        this.isScheduled = false;
        System.out.println("Schedule cancelled for: " + scheduledTime);
    }
}

// SMS Notification
class SMSNotification implements Notification {
    private String phoneNumber;
    private String carrierCode;

    public SMSNotification(String phoneNumber, String carrierCode) {
        this.phoneNumber = phoneNumber;
        this.carrierCode = carrierCode;
    }

    @Override
    public void send(String recipient, String message) {
        System.out.println("Connecting to SMS gateway...");
        System.out.println("Sending SMS notification...");
        System.out.println("Phone Number: " + recipient);
        System.out.println("Carrier: " + carrierCode);
        System.out.println("Message: " + message);
        System.out.println("SMS sent successfully!");
    }

    @Override
    public String getNotificationType() {
        return "SMS";
    }
}

// Notification Service
class NotificationService {
    public void sendNotification(Notification notification, String recipient, String message) {
        notification.send(recipient, message);

        System.out.println("\nNotification Type: " + notification.getNotificationType());

        // Check if schedulable
        if (notification instanceof Schedulable) {
            System.out.println("This notification can be scheduled");
        }

        // Check if retryable
        if (notification instanceof Retryable) {
            Retryable retryable = (Retryable) notification;
            System.out.println("This notification supports retry (Max retries: " + retryable.getMaxRetries() + ")");
        }
    }

    public void sendBatch(Notification[] notifications, String[] recipients, String[] messages) {
        System.out.println("=== Sending Batch Notifications ===");
        for (int i = 0; i < notifications.length; i++) {
            sendNotification(notifications[i], recipients[i], messages[i]);
            System.out.println("---");
        }
    }
}

public class TestNotification {
    public static void main(String[] args) {
        NotificationService service = new NotificationService();

        // Create different notification types
        EmailNotification email = new EmailNotification("admin@example.com", "john@example.com",
                                                         "Account Alert", "HIGH");
        PushNotification push = new PushNotification("MyApp", "device_token_12345");
        SMSNotification sms = new SMSNotification("+1234567890", "ATT");

        // Send individual notifications
        service.sendNotification(email, "john@example.com", "Your password was changed");
        System.out.println();

        // Schedule push notification
        push.schedule("2024-02-15 10:00");
        service.sendNotification(push, "device_token_12345", "New message received");
        System.out.println();

        service.sendNotification(sms, "+1234567890", "Your verification code is 123456");
        System.out.println();

        // Demonstrate retry
        System.out.println("=== Testing Retry Feature ===");
        if (email instanceof Retryable) {
            ((Retryable) email).retry();
        }
    }
}
```

**💡 Tips:**
- Notification interface defines common contract for all notification types (send, getNotificationType)
- Interface Segregation Principle demonstrated: EmailNotification implements 3 interfaces, PushNotification implements 2, SMSNotification implements only 1
- Multiple interface implementation: EmailNotification implements Notification + Schedulable + Retryable (shows flexibility)
- instanceof checks enable conditional feature usage: if (notification instanceof Schedulable) only schedules when supported
- Strategy pattern: different notification strategies (Email, SMS, Push) implement same Notification interface
- Retryable interface with MAX_RETRIES constant demonstrates retry logic with attempt counting
- Schedulable interface separates scheduling concern - not all notifications need scheduling
- EmailNotification tracks retryCount state demonstrating stateful retry logic
- Cast after instanceof: Retryable retryable = (Retryable) notification enables calling retry-specific methods
- Polymorphic array Notification[] can hold mixed notification types processed uniformly
- Send method signature consistent across all types but implementation differs (SMTP vs SMS Gateway vs Push Service)
- Interface segregation prevents forcing unnecessary methods - SMSNotification doesn't need schedule/retry methods

---

### Exercise 5: Report Generator System

**📝 Problem Statement:**
Create a report generator system using abstract classes and interfaces to demonstrate abstraction. The system should use an abstract Report base class with concrete implementations for Sales, Inventory, and Financial reports, plus Exportable and Printable interfaces for reports that support these features.

**Requirements:**
- Create abstract Report class with protected fields: reportId, reportName, generatedDate, data
- Define abstract methods: generateReport(), analyze(), getReportType()
- Implement displaySummary() method in Report showing report header information
- Create Exportable interface with methods: exportToPDF(), exportToExcel()
- Create Printable interface with methods: print(), getPageCount()
- Implement SalesReport class extending Report and implementing Exportable and Printable
- SalesReport has fields: totalSales, numberOfOrders, topProduct
- Override generateReport() in SalesReport calculating sales metrics from data
- Override analyze() in SalesReport showing sales trends and insights
- Implement InventoryReport class extending Report and implementing Exportable only
- InventoryReport has fields: totalItems, lowStockItems, outOfStockItems
- Override generateReport() in InventoryReport calculating inventory metrics
- Override analyze() in InventoryReport showing stock level alerts
- Implement FinancialReport class extending Report and implementing Printable only
- FinancialReport has fields: revenue, expenses, profit, profitMargin
- Override generateReport() in FinancialReport calculating financial ratios
- Override analyze() in FinancialReport showing financial health indicators
- Create ReportManager class with processReport(Report report) method
- Use instanceof to conditionally export and print reports based on interface implementation
- Demonstrate polymorphism with Report[] array containing different report types

**Sample Test Cases:**
```
Input: SalesReport("SR-001", "Q1 Sales Report", "2024-01-31", salesData)
Expected Output:
Generating Sales Report...
Analyzing sales data...
Processing 150 orders...
Total Sales: $125,000.00
Average Order Value: $833.33
Top Product: Laptop Pro

=== Report Summary ===
Report ID: SR-001
Report Name: Q1 Sales Report
Generated Date: 2024-01-31
Type: Sales Report

Analysis:
- Sales increased by 15% compared to last quarter
- Top performing product: Laptop Pro
- Peak sales day: Friday

Exporting to PDF...
Sales Report exported to: SR-001.pdf

Exporting to Excel...
Sales Report exported to: SR-001.xlsx

Preparing to print...
Printing 5 pages...
Sales Report printed successfully!

Input: InventoryReport("IR-002", "Monthly Inventory", "2024-01-31", inventoryData)
Expected Output:
Generating Inventory Report...
Analyzing inventory data...
Checking stock levels...
Total Items: 1,250
Low Stock Items: 23
Out of Stock Items: 5

=== Report Summary ===
Report ID: IR-002
Report Name: Monthly Inventory
Generated Date: 2024-01-31
Type: Inventory Report

Analysis:
- 5 items need immediate restock
- 23 items approaching low stock threshold
- Recommend ordering: Product A, Product B, Product C

Exporting to PDF...
Inventory Report exported to: IR-002.pdf

Exporting to Excel...
Inventory Report exported to: IR-002.xlsx

[No print option - InventoryReport doesn't implement Printable]

Input: FinancialReport("FR-003", "Annual Financial Report", "2024-01-31", financialData)
Expected Output:
Generating Financial Report...
Analyzing financial data...
Calculating financial metrics...
Revenue: $500,000.00
Expenses: $350,000.00
Profit: $150,000.00
Profit Margin: 30.0%

=== Report Summary ===
Report ID: FR-003
Report Name: Annual Financial Report
Generated Date: 2024-01-31
Type: Financial Report

Analysis:
- Healthy profit margin of 30%
- Revenue growth: 20% year-over-year
- Expense ratio: 70% (within target)

Preparing to print...
Printing 15 pages...
Financial Report printed successfully!

[No export option - FinancialReport doesn't implement Exportable]
```

**Solution:**
```java
// Exportable interface
interface Exportable {
    void exportToPDF();
    void exportToExcel();
}

// Printable interface
interface Printable {
    void print();
    int getPageCount();
}

// Abstract Report class
abstract class Report {
    protected String reportId;
    protected String reportName;
    protected String generatedDate;
    protected String data;

    public Report(String reportId, String reportName, String generatedDate, String data) {
        this.reportId = reportId;
        this.reportName = reportName;
        this.generatedDate = generatedDate;
        this.data = data;
    }

    // Abstract methods
    public abstract void generateReport();
    public abstract void analyze();
    public abstract String getReportType();

    // Concrete method
    public void displaySummary() {
        System.out.println("\n=== Report Summary ===");
        System.out.println("Report ID: " + reportId);
        System.out.println("Report Name: " + reportName);
        System.out.println("Generated Date: " + generatedDate);
        System.out.println("Type: " + getReportType());
    }
}

// Sales Report
class SalesReport extends Report implements Exportable, Printable {
    private double totalSales;
    private int numberOfOrders;
    private String topProduct;
    private int pageCount;

    public SalesReport(String reportId, String reportName, String generatedDate, String data) {
        super(reportId, reportName, generatedDate, data);
        this.pageCount = 5;
    }

    @Override
    public void generateReport() {
        System.out.println("Generating Sales Report...");
        System.out.println("Analyzing sales data...");

        // Simulate data processing
        this.numberOfOrders = 150;
        this.totalSales = 125000.00;
        this.topProduct = "Laptop Pro";

        System.out.println("Processing " + numberOfOrders + " orders...");
        System.out.println("Total Sales: $" + String.format("%.2f", totalSales));
        System.out.println("Average Order Value: $" + String.format("%.2f", totalSales / numberOfOrders));
        System.out.println("Top Product: " + topProduct);
    }

    @Override
    public void analyze() {
        System.out.println("\nAnalysis:");
        System.out.println("- Sales increased by 15% compared to last quarter");
        System.out.println("- Top performing product: " + topProduct);
        System.out.println("- Peak sales day: Friday");
    }

    @Override
    public String getReportType() {
        return "Sales Report";
    }

    @Override
    public void exportToPDF() {
        System.out.println("\nExporting to PDF...");
        System.out.println("Sales Report exported to: " + reportId + ".pdf");
    }

    @Override
    public void exportToExcel() {
        System.out.println("\nExporting to Excel...");
        System.out.println("Sales Report exported to: " + reportId + ".xlsx");
    }

    @Override
    public void print() {
        System.out.println("\nPreparing to print...");
        System.out.println("Printing " + pageCount + " pages...");
        System.out.println("Sales Report printed successfully!");
    }

    @Override
    public int getPageCount() {
        return pageCount;
    }
}

// Inventory Report
class InventoryReport extends Report implements Exportable {
    private int totalItems;
    private int lowStockItems;
    private int outOfStockItems;

    public InventoryReport(String reportId, String reportName, String generatedDate, String data) {
        super(reportId, reportName, generatedDate, data);
    }

    @Override
    public void generateReport() {
        System.out.println("Generating Inventory Report...");
        System.out.println("Analyzing inventory data...");

        // Simulate data processing
        this.totalItems = 1250;
        this.lowStockItems = 23;
        this.outOfStockItems = 5;

        System.out.println("Checking stock levels...");
        System.out.println("Total Items: " + totalItems);
        System.out.println("Low Stock Items: " + lowStockItems);
        System.out.println("Out of Stock Items: " + outOfStockItems);
    }

    @Override
    public void analyze() {
        System.out.println("\nAnalysis:");
        System.out.println("- " + outOfStockItems + " items need immediate restock");
        System.out.println("- " + lowStockItems + " items approaching low stock threshold");
        System.out.println("- Recommend ordering: Product A, Product B, Product C");
    }

    @Override
    public String getReportType() {
        return "Inventory Report";
    }

    @Override
    public void exportToPDF() {
        System.out.println("\nExporting to PDF...");
        System.out.println("Inventory Report exported to: " + reportId + ".pdf");
    }

    @Override
    public void exportToExcel() {
        System.out.println("\nExporting to Excel...");
        System.out.println("Inventory Report exported to: " + reportId + ".xlsx");
    }
}

// Financial Report
class FinancialReport extends Report implements Printable {
    private double revenue;
    private double expenses;
    private double profit;
    private double profitMargin;
    private int pageCount;

    public FinancialReport(String reportId, String reportName, String generatedDate, String data) {
        super(reportId, reportName, generatedDate, data);
        this.pageCount = 15;
    }

    @Override
    public void generateReport() {
        System.out.println("Generating Financial Report...");
        System.out.println("Analyzing financial data...");

        // Simulate data processing
        this.revenue = 500000.00;
        this.expenses = 350000.00;
        this.profit = revenue - expenses;
        this.profitMargin = (profit / revenue) * 100;

        System.out.println("Calculating financial metrics...");
        System.out.println("Revenue: $" + String.format("%.2f", revenue));
        System.out.println("Expenses: $" + String.format("%.2f", expenses));
        System.out.println("Profit: $" + String.format("%.2f", profit));
        System.out.println("Profit Margin: " + String.format("%.1f", profitMargin) + "%");
    }

    @Override
    public void analyze() {
        System.out.println("\nAnalysis:");
        System.out.println("- Healthy profit margin of " + String.format("%.0f", profitMargin) + "%");
        System.out.println("- Revenue growth: 20% year-over-year");
        System.out.println("- Expense ratio: 70% (within target)");
    }

    @Override
    public String getReportType() {
        return "Financial Report";
    }

    @Override
    public void print() {
        System.out.println("\nPreparing to print...");
        System.out.println("Printing " + pageCount + " pages...");
        System.out.println("Financial Report printed successfully!");
    }

    @Override
    public int getPageCount() {
        return pageCount;
    }
}

// Report Manager
class ReportManager {
    public void processReport(Report report) {
        report.generateReport();
        report.displaySummary();
        report.analyze();

        // Check if exportable
        if (report instanceof Exportable) {
            Exportable exportable = (Exportable) report;
            exportable.exportToPDF();
            exportable.exportToExcel();
        }

        // Check if printable
        if (report instanceof Printable) {
            Printable printable = (Printable) report;
            printable.print();
        }
    }

    public void processMultiple(Report[] reports) {
        System.out.println("=== Processing Multiple Reports ===");
        for (Report report : reports) {
            processReport(report);
            System.out.println("\n" + "=".repeat(50) + "\n");
        }
    }
}

public class TestReport {
    public static void main(String[] args) {
        ReportManager manager = new ReportManager();

        Report[] reports = {
            new SalesReport("SR-001", "Q1 Sales Report", "2024-01-31", "sales_data"),
            new InventoryReport("IR-002", "Monthly Inventory", "2024-01-31", "inventory_data"),
            new FinancialReport("FR-003", "Annual Financial Report", "2024-01-31", "financial_data")
        };

        manager.processMultiple(reports);
    }
}
```

**💡 Tips:**
- Abstract Report class provides common structure (reportId, reportName, generatedDate) and behavior (displaySummary)
- Abstract methods (generateReport, analyze, getReportType) force each report type to provide specific implementations
- Interface segregation: SalesReport implements both Exportable and Printable, InventoryReport only Exportable, FinancialReport only Printable
- Demonstrates that different reports have different capabilities based on business needs (not all reports need printing, not all need exporting)
- instanceof checks in ReportManager enable conditional feature usage based on interface implementation
- Exportable interface groups export-related methods (exportToPDF, exportToExcel) - cohesive interface design
- Printable interface groups print-related methods (print, getPageCount) - single responsibility
- Each report type has domain-specific fields: SalesReport (totalSales, numberOfOrders), InventoryReport (stockLevels), FinancialReport (revenue, expenses, profit)
- Template Method pattern: processReport() workflow calls generateReport(), displaySummary(), analyze() in sequence
- Polymorphic Report[] array holds different report types processed uniformly through common interface
- analyze() abstract method demonstrates domain-specific analysis: sales trends, stock alerts, financial health
- String.format("%.2f") ensures consistent currency formatting across all report types
- ReportManager uses composition: "has-a" Report, not "is-a" Report - demonstrates proper OOP design

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

### 1. Abstract Class Instantiation and Definition

#### ❌ Wrong - Attempting to Instantiate Abstract Class:
```java
// WRONG
abstract class Animal {
    abstract void makeSound();
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();  // Compilation error! Cannot instantiate
        animal.makeSound();
    }
}
```
**Issue:** Abstract classes cannot be instantiated directly; they're incomplete

#### ✅ Right:
```java
// CORRECT - Create concrete subclass
abstract class Animal {
    abstract void makeSound();
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();  // Instantiate concrete subclass
        animal.makeSound();
    }
}
```

**Why:** Abstract classes define templates; concrete subclasses provide implementations.

**💡 Tip:** Abstract classes are meant to be extended, not instantiated.

---

#### ❌ Wrong - Declaring Concrete Class with Abstract Methods:
```java
// WRONG
public class Shape {  // Compilation error! Concrete class cannot have abstract methods
    abstract double getArea();
    abstract double getPerimeter();
}
```
**Issue:** Non-abstract class cannot contain abstract methods

#### ✅ Right:
```java
// CORRECT - Declare class as abstract
public abstract class Shape {  // Abstract class
    abstract double getArea();
    abstract double getPerimeter();

    // Can also have concrete methods
    public void display() {
        System.out.println("Area: " + getArea());
        System.out.println("Perimeter: " + getPerimeter());
    }
}
```

**Why:** Abstract methods need abstract class; concrete class must implement all methods.

**💡 Tip:** Class with any abstract method must be declared abstract.

---

#### ❌ Wrong - Making Abstract Class Final:
```java
// WRONG
public final abstract class Animal {  // Compilation error! Contradictory modifiers
    abstract void makeSound();
}
```
**Issue:** `final` prevents inheritance; `abstract` requires inheritance

#### ✅ Right:
```java
// CORRECT - Remove final or abstract
public abstract class Animal {  // Abstract - can be extended
    abstract void makeSound();
}

// OR

public final class Dog {  // Final - cannot be extended, but must be concrete
    public void makeSound() {
        System.out.println("Bark!");
    }
}
```

**Why:** Abstract classes must be extended; final classes cannot be extended; mutually exclusive.

**💡 Tip:** Never use `final` and `abstract` together on class or method.

---

#### ❌ Wrong - Making Abstract Method Private:
```java
// WRONG
public abstract class Shape {
    private abstract double getArea();  // Compilation error! Cannot be private
}
```
**Issue:** Abstract methods must be visible to subclasses to be overridden

#### ✅ Right:
```java
// CORRECT - Use protected or public
public abstract class Shape {
    protected abstract double getArea();  // Accessible in subclasses

    public void display() {
        System.out.println("Area: " + getArea());
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    protected double getArea() {
        return Math.PI * radius * radius;
    }
}
```

**Why:** Private methods cannot be overridden; abstract methods must be overridden.

**💡 Tip:** Abstract methods should be protected or public for subclass access.

---

#### ❌ Wrong - Making Abstract Method Static:
```java
// WRONG
public abstract class MathOperations {
    abstract static int calculate(int a, int b);  // Compilation error!
}
```
**Issue:** Static methods cannot be abstract; static means class-level, abstract means override-required

#### ✅ Right:
```java
// CORRECT - Make instance method abstract or static method concrete
public abstract class MathOperations {
    // Option 1: Abstract instance method
    abstract int calculate(int a, int b);

    // Option 2: Static concrete method
    static int add(int a, int b) {
        return a + b;
    }
}
```

**Why:** Static methods belong to class, not overridden; abstract methods must be overridden.

**💡 Tip:** Abstract methods are instance methods; static methods must have implementation.

---

### 2. Abstract Method Implementation Mistakes

#### ❌ Wrong - Not Implementing All Abstract Methods:
```java
// WRONG
abstract class Shape {
    abstract double getArea();
    abstract double getPerimeter();
}

class Circle extends Shape {  // Compilation error! Must implement both or be abstract
    private double radius;

    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
    // Missing getPerimeter() implementation!
}
```
**Issue:** Concrete subclass must implement all inherited abstract methods

#### ✅ Right:
```java
// CORRECT - Implement all abstract methods
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
    double getPerimeter() {  // Implement all abstract methods
        return 2 * Math.PI * radius;
    }
}

// OR declare subclass as abstract
abstract class PartialCircle extends Shape {
    @Override
    double getArea() {
        return 0;
    }
    // Can leave getPerimeter() for further subclasses
}
```

**Why:** Concrete class must be complete; abstract class can remain incomplete.

**💡 Tip:** Either implement all abstract methods or declare subclass abstract.

---

#### ❌ Wrong - Providing Method Body for Abstract Method:
```java
// WRONG
public abstract class Animal {
    abstract void makeSound() {  // Compilation error! Abstract method cannot have body
        System.out.println("Sound");
    }
}
```
**Issue:** Abstract methods define contract only, no implementation

#### ✅ Right:
```java
// CORRECT - Remove body for abstract method
public abstract class Animal {
    abstract void makeSound();  // No body

    // If you need default implementation, make it concrete
    public void sleep() {  // Concrete method with body
        System.out.println("Sleeping...");
    }
}
```

**Why:** Abstract = no implementation; concrete = with implementation.

**💡 Tip:** Abstract methods end with semicolon; concrete methods have braces.

---

#### ❌ Wrong - Reducing Visibility When Implementing Abstract Method:
```java
// WRONG
abstract class Parent {
    protected abstract void display();
}

class Child extends Parent {
    @Override
    private void display() {  // Compilation error! Cannot reduce visibility
        System.out.println("Child");
    }
}
```
**Issue:** Cannot make overridden method more restrictive than parent

#### ✅ Right:
```java
// CORRECT - Same or less restrictive visibility
class Child extends Parent {
    @Override
    protected void display() {  // Same visibility
        System.out.println("Child");
    }
}

// OR increase visibility
class Child extends Parent {
    @Override
    public void display() {  // Less restrictive (public > protected)
        System.out.println("Child");
    }
}
```

**Why:** Liskov Substitution Principle: subclass must be substitutable for parent.

**💡 Tip:** Can increase visibility, never decrease when overriding.

---

#### ❌ Wrong - Making Abstract Method Final:
```java
// WRONG
public abstract class Shape {
    final abstract double getArea();  // Compilation error! Contradictory modifiers
}
```
**Issue:** `final` prevents override; `abstract` requires override

#### ✅ Right:
```java
// CORRECT - Remove final or abstract
public abstract class Shape {
    abstract double getArea();  // Abstract - must be overridden

    // OR

    final double calculateTwiceArea() {  // Final concrete - cannot be overridden
        return 2 * getArea();
    }
}
```

**Why:** Abstract methods must be overridden; final methods cannot be overridden; mutually exclusive.

**💡 Tip:** Never use `final` and `abstract` together.

---

### 3. Interface Definition and Variables

#### ❌ Wrong - Attempting to Instantiate Interface:
```java
// WRONG
interface Drawable {
    void draw();
}

public class Main {
    public static void main(String[] args) {
        Drawable drawable = new Drawable();  // Compilation error!
    }
}
```
**Issue:** Interfaces cannot be instantiated; they define contracts only

#### ✅ Right:
```java
// CORRECT - Instantiate implementing class
class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}

public class Main {
    public static void main(String[] args) {
        Drawable drawable = new Circle();  // Instantiate implementing class
        drawable.draw();

        // OR use anonymous class
        Drawable drawable2 = new Drawable() {
            @Override
            public void draw() {
                System.out.println("Drawing shape");
            }
        };
    }
}
```

**Why:** Interfaces are contracts; concrete classes provide implementations.

**💡 Tip:** Interfaces define "what", classes define "how".

---

#### ❌ Wrong - Declaring Uninitialized Variables in Interface:
```java
// WRONG
interface Constants {
    int MAX_SIZE;  // Compilation error! Must be initialized
    String DEFAULT_NAME;  // Compilation error!
}
```
**Issue:** Interface variables are implicitly `public static final` constants; must be initialized

#### ✅ Right:
```java
// CORRECT - Initialize all interface variables
interface Constants {
    int MAX_SIZE = 100;  // public static final by default
    String DEFAULT_NAME = "Default";
    double PI = 3.14159;

    // Explicit modifiers (redundant but allowed)
    public static final int MIN_SIZE = 0;
}

// Usage
public class Main {
    public static void main(String[] args) {
        System.out.println(Constants.MAX_SIZE);
        // Constants.MAX_SIZE = 200;  // Compilation error! final variable
    }
}
```

**Why:** Interface variables are compile-time constants; must have values.

**💡 Tip:** Interface variables are automatically `public static final`; always initialize.

---

#### ❌ Wrong - Adding Constructor to Interface:
```java
// WRONG
interface Drawable {
    Drawable() {  // Compilation error! Interfaces cannot have constructors
        // initialization
    }

    void draw();
}
```
**Issue:** Interfaces cannot be instantiated, so constructors are meaningless

#### ✅ Right:
```java
// CORRECT - Remove constructor from interface
interface Drawable {
    void draw();
}

// If you need initialization, use abstract class
abstract class DrawableShape {
    protected String color;

    public DrawableShape(String color) {  // Constructor in abstract class
        this.color = color;
    }

    abstract void draw();
}
```

**Why:** Constructors create instances; interfaces cannot be instantiated.

**💡 Tip:** Use abstract classes if you need constructors or instance variables.

---

#### ❌ Wrong - Using Private/Protected Methods in Interface (Before Java 9):
```java
// WRONG (before Java 9)
interface MyInterface {
    private void helper() {  // Compilation error in Java 8!
        System.out.println("Helper");
    }

    protected void utility() {  // Compilation error!
        System.out.println("Utility");
    }
}
```
**Issue:** Before Java 9, all interface methods were implicitly public

#### ✅ Right:
```java
// CORRECT for Java 8
interface MyInterface {
    void publicMethod();  // public by default

    default void defaultMethod() {  // public default method
        System.out.println("Default");
    }

    static void staticMethod() {  // public static method
        System.out.println("Static");
    }
}

// CORRECT for Java 9+
interface MyInterface {
    void publicMethod();

    default void defaultMethod() {
        helperMethod();  // Can call private helper
    }

    private void helperMethod() {  // Private helper (Java 9+)
        System.out.println("Helper");
    }
}
```

**Why:** Java 8 allows public methods only; Java 9+ allows private methods for helpers.

**💡 Tip:** Use private methods in interfaces only with Java 9+; check language level.

---

### 4. Interface Method Implementation

#### ❌ Wrong - Not Implementing All Interface Methods:
```java
// WRONG
interface Drawable {
    void draw();
    void resize();
    void move();
}

class Circle implements Drawable {  // Compilation error!
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
    // Missing resize() and move()!
}
```
**Issue:** Implementing class must implement all abstract methods from interface

#### ✅ Right:
```java
// CORRECT - Implement all interface methods
class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }

    @Override
    public void resize() {
        System.out.println("Resizing circle");
    }

    @Override
    public void move() {
        System.out.println("Moving circle");
    }
}
```

**Why:** Interface is contract; implementing class must fulfill entire contract.

**💡 Tip:** IDE will highlight missing implementations; use @Override for safety.

---

#### ❌ Wrong - Reducing Visibility When Implementing Interface Methods:
```java
// WRONG
interface Printable {
    void print();  // public by default
}

class Document implements Printable {
    @Override
    void print() {  // Compilation error! Package-private is more restrictive
        System.out.println("Printing...");
    }
}
```
**Issue:** Interface methods are implicitly public; implementation cannot be less visible

#### ✅ Right:
```java
// CORRECT - Must be public
class Document implements Printable {
    @Override
    public void print() {  // Must explicitly say public
        System.out.println("Printing...");
    }
}
```

**Why:** Interface methods are public contract; implementation must honor public visibility.

**💡 Tip:** Always explicitly use `public` when implementing interface methods.

---

#### ❌ Wrong - Throwing Broader Checked Exception in Implementation:
```java
// WRONG
interface FileProcessor {
    void process() throws IOException;
}

class DataProcessor implements FileProcessor {
    @Override
    public void process() throws Exception {  // Compilation error! Broader exception
        // Process data
    }
}
```
**Issue:** Implementation cannot throw broader checked exception than interface declares

#### ✅ Right:
```java
// CORRECT - Same, narrower, or no checked exception
class DataProcessor implements FileProcessor {
    // Option 1: Same exception
    @Override
    public void process() throws IOException {
        // Process data
    }

    // Option 2: Narrower exception
    @Override
    public void process() throws FileNotFoundException {  // Subtype of IOException
        // Process data
    }

    // Option 3: No exception
    @Override
    public void process() {
        try {
            // Process data
        } catch (IOException e) {
            // Handle internally
        }
    }

    // Option 4: Any unchecked exception
    @Override
    public void process() throws RuntimeException {
        // Process data
    }
}
```

**Why:** Implementation must maintain or strengthen contract; cannot weaken it.

**💡 Tip:** Can throw same/narrower/no checked exception; any unchecked exception allowed.

---

#### ❌ Wrong - Making Interface Method Static in Implementation:
```java
// WRONG
interface Calculator {
    int add(int a, int b);
}

class SimpleCalculator implements Calculator {
    @Override  // Compilation error! Cannot override with static
    public static int add(int a, int b) {
        return a + b;
    }
}
```
**Issue:** Cannot implement abstract instance method with static method

#### ✅ Right:
```java
// CORRECT - Implement as instance method
class SimpleCalculator implements Calculator {
    @Override
    public int add(int a, int b) {  // Instance method
        return a + b;
    }
}
```

**Why:** Interface methods are instance methods (unless declared static in interface itself).

**💡 Tip:** Interface abstract methods must be implemented as instance methods.

---

### 5. Multiple Inheritance Mistakes

#### ❌ Wrong - Attempting Multiple Class Inheritance:
```java
// WRONG
class Animal {
    public void eat() {
        System.out.println("Eating");
    }
}

class Mammal {
    public void breathe() {
        System.out.println("Breathing");
    }
}

class Dog extends Animal, Mammal {  // Compilation error! Cannot extend multiple classes
}
```
**Issue:** Java doesn't support multiple inheritance with classes (diamond problem)

#### ✅ Right:
```java
// CORRECT - Use interfaces for multiple inheritance
class Animal {
    public void eat() {
        System.out.println("Eating");
    }
}

interface Breathable {
    void breathe();
}

interface Walkable {
    void walk();
}

class Dog extends Animal implements Breathable, Walkable {  // OK
    @Override
    public void breathe() {
        System.out.println("Breathing");
    }

    @Override
    public void walk() {
        System.out.println("Walking");
    }
}
```

**Why:** Single class inheritance + multiple interface implementation avoids diamond problem.

**💡 Tip:** Use interfaces for multiple inheritance; classes for single inheritance only.

---

#### ❌ Wrong - Diamond Problem with Default Methods:
```java
// WRONG (ambiguous)
interface A {
    default void show() {
        System.out.println("A");
    }
}

interface B {
    default void show() {
        System.out.println("B");
    }
}

class C implements A, B {  // Compilation error! Ambiguous which show() to use
    // Must override to resolve ambiguity
}
```
**Issue:** Multiple interfaces with same default method create ambiguity

#### ✅ Right:
```java
// CORRECT - Override to resolve ambiguity
class C implements A, B {
    @Override
    public void show() {
        // Choose one
        A.super.show();  // Explicitly call A's version

        // OR
        B.super.show();  // Explicitly call B's version

        // OR provide own implementation
        System.out.println("C");
    }
}
```

**Why:** Compiler cannot decide which default method to use; must explicitly resolve.

**💡 Tip:** Override conflicting default methods and use `InterfaceName.super.method()`.

---

#### ❌ Wrong - Mixing extends and implements Order:
```java
// WRONG - implements must come after extends
class Dog implements Runnable extends Animal {  // Syntax error!
}
```
**Issue:** Java syntax requires `extends` before `implements`

#### ✅ Right:
```java
// CORRECT - extends first, then implements
class Dog extends Animal implements Runnable, Serializable {
    // extends Animal - single class inheritance
    // implements Runnable, Serializable - multiple interface implementation
}
```

**Why:** Java syntax rule: extend one class first, then implement multiple interfaces.

**💡 Tip:** Remember: `extends` (1 class) then `implements` (N interfaces).

---

### 6. Default Methods in Interfaces

#### ❌ Wrong - Declaring Default Method Without Body:
```java
// WRONG
interface MyInterface {
    default void show();  // Compilation error! Default method must have body
}
```
**Issue:** `default` keyword means method has implementation; cannot be abstract

#### ✅ Right:
```java
// CORRECT - Provide body for default method
interface MyInterface {
    default void show() {  // Must have body
        System.out.println("Default implementation");
    }

    // OR make it abstract
    void display();  // No default keyword = abstract
}
```

**Why:** Default methods provide default implementation; abstract methods don't.

**💡 Tip:** `default` = has body; no keyword = abstract.

---

#### ❌ Wrong - Overriding Default Method and Reducing Visibility:
```java
// WRONG
interface Printable {
    default void print() {
        System.out.println("Printing");
    }
}

class Document implements Printable {
    @Override
    void print() {  // Compilation error! Cannot reduce visibility
        System.out.println("Document printing");
    }
}
```
**Issue:** Default methods are public; cannot reduce visibility when overriding

#### ✅ Right:
```java
// CORRECT - Maintain public visibility
class Document implements Printable {
    @Override
    public void print() {  // Must be public
        System.out.println("Document printing");
    }
}
```

**Why:** Interface methods (including default) are public; override must be public.

**💡 Tip:** Always use `public` when overriding interface methods.

---

#### ❌ Wrong - Calling Default Method Without super:
```java
// WRONG
interface Vehicle {
    default void start() {
        System.out.println("Vehicle starting");
    }
}

class Car implements Vehicle {
    @Override
    public void start() {
        start();  // Stack overflow! Calls itself recursively
        System.out.println("Car starting");
    }
}
```
**Issue:** Calling `start()` without qualifier calls own method recursively

#### ✅ Right:
```java
// CORRECT - Use InterfaceName.super to call default method
class Car implements Vehicle {
    @Override
    public void start() {
        Vehicle.super.start();  // Call interface's default method
        System.out.println("Car starting");
    }
}
```

**Why:** `InterfaceName.super.method()` explicitly calls interface's default implementation.

**💡 Tip:** Use `InterfaceName.super.method()` to call interface default methods.

---

### 7. Static Methods in Interfaces

#### ❌ Wrong - Calling Interface Static Method on Instance:
```java
// WRONG
interface MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
}

class Calculator implements MathUtils {
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int result = calc.add(10, 5);  // Compilation error! Cannot call through instance
    }
}
```
**Issue:** Interface static methods belong to interface, not implementing classes

#### ✅ Right:
```java
// CORRECT - Call static method on interface directly
public class Main {
    public static void main(String[] args) {
        int result = MathUtils.add(10, 5);  // Call on interface name
        System.out.println("Result: " + result);

        // NOT through implementing class:
        // Calculator.add(10, 5);  // Compilation error!
    }
}
```

**Why:** Interface static methods are not inherited; accessed through interface name only.

**💡 Tip:** Interface static methods: `InterfaceName.method()`, not through instances.

---

#### ❌ Wrong - Overriding Interface Static Method:
```java
// WRONG expectation
interface Parent {
    static void show() {
        System.out.println("Parent");
    }
}

interface Child extends Parent {
    static void show() {  // This HIDES, not overrides
        System.out.println("Child");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent.show();  // Prints "Parent"
        Child.show();   // Prints "Child"
        // Student expects polymorphism (WRONG! Static methods don't override)
    }
}
```
**Issue:** Static methods use method hiding, not overriding; no polymorphism

#### ✅ Right:
```java
// CORRECT understanding
public class Main {
    public static void main(String[] args) {
        Parent.show();  // Calls Parent's static method
        Child.show();   // Calls Child's static method
        // These are independent static methods, not polymorphic
    }
}
```

**Why:** Static methods belong to interface/class, not instances; decided at compile time.

**💡 Tip:** Static methods don't override or participate in polymorphism.

---

#### ❌ Wrong - Declaring Static Method Without Body:
```java
// WRONG
interface MyInterface {
    static void helper();  // Compilation error! Static method must have body
}
```
**Issue:** Interface static methods must have implementation

#### ✅ Right:
```java
// CORRECT - Provide body for static method
interface MyInterface {
    static void helper() {  // Must have body
        System.out.println("Helper method");
    }

    // Abstract methods don't use static
    void process();  // Abstract instance method
}
```

**Why:** Static methods must be complete; cannot be abstract.

**💡 Tip:** Interface static methods always have bodies; abstract methods never do.

---

### 8. Abstract Class vs Interface Misuse

#### ❌ Wrong - Using Interface When Abstract Class is Better:
```java
// WRONG - Should use abstract class for shared state
interface Animal {
    // Cannot have instance variables
    // Cannot have constructors

    void eat();
    void sleep();
    void setName(String name);  // No state to store name!
    String getName();
}

class Dog implements Animal {
    private String name;  // Each class must duplicate state

    @Override
    public void eat() {
        System.out.println(name + " eating");
    }

    @Override
    public void sleep() {
        System.out.println(name + " sleeping");
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
}
```
**Issue:** Using interface when shared state and behavior needed; code duplication

#### ✅ Right:
```java
// CORRECT - Use abstract class for shared state and behavior
abstract class Animal {
    protected String name;  // Shared instance variable

    public Animal(String name) {  // Constructor
        this.name = name;
    }

    // Shared concrete behavior
    public void sleep() {
        System.out.println(name + " is sleeping");
    }

    // Abstract behavior (different for each animal)
    abstract void makeSound();
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    void makeSound() {
        System.out.println(name + " barks");
    }
}
```

**Why:** Abstract class provides shared state and behavior; interface defines contracts only.

**💡 Tip:** Use abstract class for IS-A with shared code; interface for CAN-DO capabilities.

---

#### ❌ Wrong - Using Abstract Class When Interface is Better:
```java
// WRONG - Should use interface for unrelated classes
abstract class Sortable {
    abstract void sort();
}

class StudentList extends Sortable {  // OK
    @Override
    void sort() {
        // Sort students
    }
}

class ProductCatalog extends Sortable {  // OK
    @Override
    void sort() {
        // Sort products
    }
}

// Problem: What if Product needs to extend Product class AND be Sortable?
class Product {
    String name;
}

class SpecialProduct extends Product, Sortable {  // ERROR! Cannot extend both
}
```
**Issue:** Using abstract class for capability limits flexibility (no multiple inheritance)

#### ✅ Right:
```java
// CORRECT - Use interface for capabilities
interface Sortable {
    void sort();
}

class Product {
    String name;
}

class SpecialProduct extends Product implements Sortable {  // Works!
    @Override
    public void sort() {
        // Sort logic
    }
}

// Now many unrelated classes can be Sortable
class StudentList implements Sortable {
    @Override
    public void sort() {
        // Sort students
    }
}
```

**Why:** Interface defines capability without constraining inheritance hierarchy.

**💡 Tip:** Use interface for "can-do" capabilities; abstract class for "is-a" relationships.

---

#### ❌ Wrong - Creating Marker Interface with Methods:
```java
// WRONG - Marker interface should have no methods
interface Serializable {
    void serialize();  // Defeats purpose of marker interface
    void deserialize();
}
```
**Issue:** Marker interfaces should be empty; they tag classes for special treatment

#### ✅ Right:
```java
// CORRECT - Empty marker interface
interface Serializable {
    // Empty - just marks class as serializable
}

class User implements Serializable {
    private String name;
    private int age;
    // Framework can check: if (obj instanceof Serializable)
}

// OR use annotation instead (modern approach)
@Serializable
class User {
    private String name;
    private int age;
}
```

**Why:** Marker interfaces/annotations indicate capability without requiring implementation.

**💡 Tip:** Use empty marker interfaces for tagging; use annotations in modern code.

---

### 9. Functional Interface Mistakes

#### ❌ Wrong - Multiple Abstract Methods in Functional Interface:
```java
// WRONG
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
    int multiply(int a, int b);  // Compilation error! Only one abstract method allowed
}
```
**Issue:** Functional interface must have exactly one abstract method (SAM - Single Abstract Method)

#### ✅ Right:
```java
// CORRECT - Single abstract method
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);  // One abstract method

    // Can have default methods
    default int square(int a) {
        return calculate(a, a);
    }

    // Can have static methods
    static int add(int a, int b) {
        return a + b;
    }
}

// Usage with lambda
public class Main {
    public static void main(String[] args) {
        Calculator multiply = (a, b) -> a * b;
        System.out.println(multiply.calculate(5, 3));  // 15
    }
}
```

**Why:** Lambda expressions require exactly one abstract method to implement.

**💡 Tip:** Functional interface = 1 abstract method + any number of default/static methods.

---

#### ❌ Wrong - Not Using @FunctionalInterface Annotation:
```java
// RISKY - No compiler check
interface Processor {
    void process(String data);
}

// Later, someone adds another method...
interface Processor {
    void process(String data);
    void validate(String data);  // No error, but breaks existing lambda code!
}

// Existing lambda code breaks:
Processor p = data -> System.out.println(data);  // Now compilation error!
```
**Issue:** Without annotation, accidental additions break functional interface contract

#### ✅ Right:
```java
// CORRECT - Use @FunctionalInterface
@FunctionalInterface
interface Processor {
    void process(String data);

    // Compiler prevents accidental additions
    // void validate(String data);  // Compilation error with annotation!
}

// Safe to use with lambdas
Processor p = data -> System.out.println(data);
```

**Why:** @FunctionalInterface annotation ensures compile-time enforcement of SAM rule.

**💡 Tip:** Always use @FunctionalInterface for interfaces intended for lambdas.

---

#### ❌ Wrong - Confusing Functional Interface with Regular Interface:
```java
// WRONG usage expectation
interface Drawable {
    void draw();
    void resize();
    void move();
}

// Student tries to use lambda (WRONG!)
Drawable d = () -> System.out.println("Drawing");  // Compilation error!
```
**Issue:** Multiple abstract methods; not a functional interface; cannot use lambda

#### ✅ Right:
```java
// CORRECT - Use functional interface with lambda
@FunctionalInterface
interface Drawable {
    void draw();  // Single abstract method
}

// Can use lambda
Drawable d = () -> System.out.println("Drawing");
d.draw();

// Regular interface needs anonymous class or concrete class
interface MultiMethod {
    void method1();
    void method2();
}

MultiMethod m = new MultiMethod() {
    @Override
    public void method1() {
        System.out.println("Method 1");
    }

    @Override
    public void method2() {
        System.out.println("Method 2");
    }
};
```

**Why:** Lambdas work only with single abstract method (functional interface).

**💡 Tip:** Functional interface = lambda compatible; multiple methods = need class.

---

### 10. Access Modifiers and Visibility

#### ❌ Wrong - Using Protected in Interface:
```java
// WRONG
interface MyInterface {
    protected void method();  // Compilation error! Interface methods must be public
}
```
**Issue:** Interface methods are implicitly public; cannot use protected

#### ✅ Right:
```java
// CORRECT - Use public (or omit, it's default)
interface MyInterface {
    void method();  // public by default

    // Explicit public (redundant but allowed)
    public void anotherMethod();
}
```

**Why:** Interface defines public contract; all methods public by default.

**💡 Tip:** Interface methods are always public; don't use protected/private (except private in Java 9+).

---

#### ❌ Wrong - Making Implementing Class Less Visible Than Interface:
```java
// WRONG (design issue)
public interface Processor {
    void process();
}

class DefaultProcessor implements Processor {  // Package-private class
    @Override
    public void process() {
        System.out.println("Processing");
    }
}

// Problem: Public interface, but implementation not accessible from other packages
```
**Issue:** Public interface implemented by package-private class limits usability

#### ✅ Right:
```java
// CORRECT - Match visibility
public interface Processor {
    void process();
}

public class DefaultProcessor implements Processor {  // Public implementation
    @Override
    public void process() {
        System.out.println("Processing");
    }
}

// OR use package-private interface if implementation is internal
interface InternalProcessor {  // Package-private
    void process();
}

class InternalProcessorImpl implements InternalProcessor {  // Package-private
    @Override
    public void process() {
        System.out.println("Processing");
    }
}
```

**Why:** Interface and implementing class visibility should match intended use.

**💡 Tip:** Public interfaces usually need public implementations; internal interfaces can be package-private.

---

#### ❌ Wrong - Trying to Make Interface Variable Mutable:
```java
// WRONG
interface Config {
    int MAX_SIZE = 100;  // public static final by default
}

public class Main {
    public static void main(String[] args) {
        Config.MAX_SIZE = 200;  // Compilation error! Cannot assign to final variable
    }
}
```
**Issue:** Interface variables are implicitly final constants; cannot be modified

#### ✅ Right:
```java
// CORRECT - Accept constants as immutable
interface Config {
    int MAX_SIZE = 100;  // Constant
    String DEFAULT_NAME = "Default";
}

public class Main {
    public static void main(String[] args) {
        System.out.println(Config.MAX_SIZE);  // Read only

        // If you need mutable config, use class
        class MutableConfig {
            static int maxSize = 100;  // Mutable
        }

        MutableConfig.maxSize = 200;  // OK
    }
}
```

**Why:** Interface variables are compile-time constants; use classes for mutable state.

**💡 Tip:** Interface variables = constants only; use classes for mutable configuration.

---

This comprehensive list now contains **40+ Abstraction mistakes** covering all fundamental concepts!

---

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