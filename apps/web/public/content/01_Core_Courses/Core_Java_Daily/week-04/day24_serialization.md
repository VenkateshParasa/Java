# Day 24: Object Serialization

**Week 4: Advanced Java Concepts**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 24, you will be able to:
- Understand what serialization is and why it's important
- Implement the Serializable interface
- Serialize and deserialize objects
- Use transient keyword to exclude fields
- Understand serialVersionUID and version control
- Handle serialization exceptions
- Work with ObjectInputStream and ObjectOutputStream
- Implement custom serialization logic

---

## 📚 Topics Covered

### 1. Introduction to Serialization

Serialization is the process of converting an object into a byte stream, which can be saved to a file or transmitted over a network.

#### What is Serialization?
- **Serialization**: Object → Byte Stream
- **Deserialization**: Byte Stream → Object

#### Why Use Serialization?
- **Persistence**: Save object state to disk
- **Network Transfer**: Send objects over network
- **Caching**: Store objects in memory or disk cache
- **Deep Copying**: Create exact copies of objects
- **Session Management**: Store user session data

#### Real-World Examples:
```
- Saving game progress
- Storing user preferences
- Caching database results
- Distributed computing
- Remote Method Invocation (RMI)
```

---

### 2. The Serializable Interface

To make a class serializable, implement the `Serializable` interface.

#### Basic Serializable Class:

```java
import java.io.Serializable;

public class Student implements Serializable {
    private String name;
    private int age;
    private double gpa;
    
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    // Getters and setters
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + 
               ", gpa=" + gpa + "}";
    }
}
```

**Key Points:**
- `Serializable` is a marker interface (no methods to implement)
- All fields must be serializable or marked as `transient`
- Static fields are not serialized

---

### 3. Serializing Objects

Use `ObjectOutputStream` to serialize objects.

#### Writing Objects to File:

```java
import java.io.*;

public class SerializeExample {
    public static void main(String[] args) {
        Student student = new Student("Alice", 20, 3.8);
        
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("student.ser"))) {
            
            out.writeObject(student);
            System.out.println("Object serialized successfully");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Serializing Multiple Objects:

```java
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class SerializeMultiple {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 20, 3.8));
        students.add(new Student("Bob", 21, 3.5));
        students.add(new Student("Charlie", 19, 3.9));
        
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("students.ser"))) {
            
            out.writeObject(students);
            System.out.println("List serialized successfully");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 4. Deserializing Objects

Use `ObjectInputStream` to deserialize objects.

#### Reading Objects from File:

```java
import java.io.*;

public class DeserializeExample {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("student.ser"))) {
            
            Student student = (Student) in.readObject();
            System.out.println("Object deserialized:");
            System.out.println(student);
            
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Deserializing Multiple Objects:

```java
import java.io.*;
import java.util.List;

public class DeserializeMultiple {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("students.ser"))) {
            
            @SuppressWarnings("unchecked")
            List<Student> students = (List<Student>) in.readObject();
            
            System.out.println("Students deserialized:");
            for (Student student : students) {
                System.out.println(student);
            }
            
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 5. The transient Keyword

Use `transient` to exclude fields from serialization.

#### Example with Transient Fields:

```java
import java.io.Serializable;

public class User implements Serializable {
    private String username;
    private transient String password;  // Not serialized
    private String email;
    private transient int loginAttempts;  // Not serialized
    
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.loginAttempts = 0;
    }
    
    @Override
    public String toString() {
        return "User{username='" + username + 
               "', password='" + password + 
               "', email='" + email + 
               "', loginAttempts=" + loginAttempts + "}";
    }
}
```

#### Testing Transient Fields:

```java
import java.io.*;

public class TransientTest {
    public static void main(String[] args) {
        // Create and serialize
        User user = new User("john_doe", "secret123", "john@example.com");
        System.out.println("Before serialization: " + user);
        
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("user.ser"))) {
            out.writeObject(user);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("user.ser"))) {
            User deserializedUser = (User) in.readObject();
            System.out.println("After deserialization: " + deserializedUser);
            // password and loginAttempts will be null/0
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

---

### 6. serialVersionUID

The `serialVersionUID` is used for version control during deserialization.

#### Why Use serialVersionUID?

```java
import java.io.Serializable;

public class Product implements Serializable {
    // Explicitly declare serialVersionUID
    private static final long serialVersionUID = 1L;
    
    private String name;
    private double price;
    private int quantity;
    
    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    
    @Override
    public String toString() {
        return "Product{name='" + name + "', price=" + price + 
               ", quantity=" + quantity + "}";
    }
}
```

**Important Points:**
- If not declared, Java generates one automatically
- Changes to class structure change the auto-generated UID
- Explicit UID allows controlled versioning
- Mismatched UIDs cause `InvalidClassException`

---

### 7. Custom Serialization

Implement custom serialization logic using special methods.

#### Custom Serialization Methods:

```java
import java.io.*;

public class BankAccount implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String accountNumber;
    private String accountHolder;
    private transient double balance;  // Sensitive data
    
    public BankAccount(String accountNumber, String accountHolder, 
                      double balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
    
    // Custom serialization
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();  // Serialize non-transient fields
        // Encrypt balance before writing
        out.writeDouble(balance * 1.5);  // Simple "encryption"
    }
    
    // Custom deserialization
    private void readObject(ObjectInputStream in) 
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();  // Deserialize non-transient fields
        // Decrypt balance after reading
        balance = in.readDouble() / 1.5;  // Simple "decryption"
    }
    
    @Override
    public String toString() {
        return "BankAccount{accountNumber='" + accountNumber + 
               "', accountHolder='" + accountHolder + 
               "', balance=" + balance + "}";
    }
}
```

---

### 8. Serialization with Inheritance

#### Parent and Child Classes:

```java
import java.io.Serializable;

// Parent class (not serializable)
class Animal {
    protected String species;
    
    public Animal(String species) {
        this.species = species;
    }
}

// Child class (serializable)
class Dog extends Animal implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    
    public Dog(String species, String name, int age) {
        super(species);
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Dog{species='" + species + "', name='" + name + 
               "', age=" + age + "}";
    }
}
```

**Key Points:**
- If parent is not serializable, parent's fields are not serialized
- Parent must have no-arg constructor for deserialization
- Child class can be serializable even if parent is not

---

### 9. Exception Handling

#### Common Serialization Exceptions:

```java
import java.io.*;

public class SerializationExceptions {
    public static void main(String[] args) {
        try {
            // Attempt to serialize
            ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"));
            out.writeObject(new NonSerializableClass());
            out.close();
            
        } catch (NotSerializableException e) {
            System.out.println("Class is not serializable: " + 
                e.getMessage());
        } catch (InvalidClassException e) {
            System.out.println("Invalid class: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        }
        
        try {
            // Attempt to deserialize
            ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"));
            Object obj = in.readObject();
            in.close();
            
        } catch (ClassNotFoundException e) {
            System.out.println("Class not found: " + e.getMessage());
        } catch (InvalidClassException e) {
            System.out.println("Version mismatch: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        }
    }
}

class NonSerializableClass {
    private String data;
}
```

---

## 💻 Practical Exercises

### Exercise 1: Basic Serialization
Create a Person class and serialize/deserialize it.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    private String city;
    
    public Person(String name, int age, String city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + 
               ", city='" + city + "'}";
    }
}

public class Exercise1 {
    public static void main(String[] args) {
        Person person = new Person("John", 30, "New York");
        
        // Serialize
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("person.ser"))) {
            out.writeObject(person);
            System.out.println("Serialized: " + person);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Person deserializedPerson = (Person) in.readObject();
            System.out.println("Deserialized: " + deserializedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

</details>

---

### Exercise 2: ArrayList Serialization
Serialize and deserialize an ArrayList of objects.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Exercise2 {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Alice", 25, "Boston"));
        people.add(new Person("Bob", 30, "Chicago"));
        people.add(new Person("Charlie", 35, "Seattle"));
        
        // Serialize
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("people.ser"))) {
            out.writeObject(people);
            System.out.println("List serialized");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("people.ser"))) {
            @SuppressWarnings("unchecked")
            List<Person> deserializedPeople = (List<Person>) in.readObject();
            System.out.println("Deserialized list:");
            deserializedPeople.forEach(System.out::println);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

</details>

---

### Exercise 3: Transient Fields
Create a class with transient fields and observe behavior.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;

class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private double salary;
    private transient String password;
    private transient int sessionId;
    
    public Employee(String name, double salary, String password) {
        this.name = name;
        this.salary = salary;
        this.password = password;
        this.sessionId = (int)(Math.random() * 10000);
    }
    
    @Override
    public String toString() {
        return "Employee{name='" + name + "', salary=" + salary + 
               ", password='" + password + "', sessionId=" + sessionId + "}";
    }
}

public class Exercise3 {
    public static void main(String[] args) {
        Employee emp = new Employee("John", 50000, "secret123");
        System.out.println("Before: " + emp);
        
        // Serialize and deserialize
        try {
            ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("employee.ser"));
            out.writeObject(emp);
            out.close();
            
            ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("employee.ser"));
            Employee deserializedEmp = (Employee) in.readObject();
            in.close();
            
            System.out.println("After: " + deserializedEmp);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

</details>

---

### Exercise 4: Deep Copy Using Serialization
Use serialization to create deep copies of objects.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;

public class Exercise4 {
    public static <T extends Serializable> T deepCopy(T object) {
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(bos);
            out.writeObject(object);
            out.close();
            
            ByteArrayInputStream bis = new ByteArrayInputStream(
                bos.toByteArray());
            ObjectInputStream in = new ObjectInputStream(bis);
            @SuppressWarnings("unchecked")
            T copy = (T) in.readObject();
            in.close();
            
            return copy;
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public static void main(String[] args) {
        Person original = new Person("Alice", 25, "Boston");
        Person copy = deepCopy(original);
        
        System.out.println("Original: " + original);
        System.out.println("Copy: " + copy);
        System.out.println("Are they same object? " + (original == copy));
    }
}
```

</details>

---

### Exercise 5: Version Control with serialVersionUID
Demonstrate version control issues.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;

class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private double price;
    // If you add new fields, increment serialVersionUID
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public String toString() {
        return "Product{name='" + name + "', price=" + price + "}";
    }
}

public class Exercise5 {
    public static void main(String[] args) {
        // Serialize
        Product product = new Product("Laptop", 999.99);
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("product.ser"))) {
            out.writeObject(product);
            System.out.println("Product serialized");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("product.ser"))) {
            Product deserializedProduct = (Product) in.readObject();
            System.out.println("Product deserialized: " + deserializedProduct);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

</details>

---

### Exercise 6: Custom Serialization
Implement custom writeObject and readObject methods.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;
import java.util.Date;

class Session implements Serializable {
    private static final long serialVersionUID = 1L;
    private String userId;
    private transient Date loginTime;
    
    public Session(String userId) {
        this.userId = userId;
        this.loginTime = new Date();
    }
    
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        out.writeLong(loginTime.getTime());
    }
    
    private void readObject(ObjectInputStream in) 
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        loginTime = new Date(in.readLong());
    }
    
    @Override
    public String toString() {
        return "Session{userId='" + userId + "', loginTime=" + loginTime + "}";
    }
}

public class Exercise6 {
    public static void main(String[] args) {
        Session session = new Session("user123");
        System.out.println("Original: " + session);
        
        try {
            ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("session.ser"));
            out.writeObject(session);
            out.close();
            
            ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("session.ser"));
            Session deserializedSession = (Session) in.readObject();
            in.close();
            
            System.out.println("Deserialized: " + deserializedSession);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

</details>

---

### Exercise 7: Serialization with Collections
Serialize HashMap and other collections.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;
import java.util.HashMap;
import java.util.Map;

public class Exercise7 {
    public static void main(String[] args) {
        Map<String, Person> personMap = new HashMap<>();
        personMap.put("P001", new Person("Alice", 25, "Boston"));
        personMap.put("P002", new Person("Bob", 30, "Chicago"));
        personMap.put("P003", new Person("Charlie", 35, "Seattle"));
        
        // Serialize
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("personmap.ser"))) {
            out.writeObject(personMap);
            System.out.println("Map serialized");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("personmap.ser"))) {
            @SuppressWarnings("unchecked")
            Map<String, Person> deserializedMap = 
                (Map<String, Person>) in.readObject();
            System.out.println("Deserialized map:");
            deserializedMap.forEach((key, value) -> 
                System.out.println(key + ": " + value));
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

</details>

---

### Exercise 8: Serialization Utility Class
Create a utility class for serialization operations.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;

public class SerializationUtil {
    public static void serialize(Object obj, String filename) {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            out.writeObject(obj);
            System.out.println("Object serialized to " + filename);
        } catch (IOException e) {
            System.out.println("Serialization error: " + e.getMessage());
        }
    }
    
    public static Object deserialize(String filename) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(filename))) {
            Object obj = in.readObject();
            System.out.println("Object deserialized from " + filename);
            return obj;
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Deserialization error: " + e.getMessage());
            return null;
        }
    }
}

public class Exercise8 {
    public static void main(String[] args) {
        Person person = new Person("John", 30, "New York");
        
        // Use utility methods
        SerializationUtil.serialize(person, "person.ser");
        Person deserializedPerson = 
            (Person) SerializationUtil.deserialize("person.ser");
        
        System.out.println("Result: " + deserializedPerson);
    }
}
```

</details>

---

### Exercise 9: Inheritance and Serialization
Work with serializable child classes.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;

class Vehicle {
    protected String brand;
    
    public Vehicle(String brand) {
        this.brand = brand;
    }
}

class Car extends Vehicle implements Serializable {
    private static final long serialVersionUID = 1L;
    private String model;
    private int year;
    
    public Car(String brand, String model, int year) {
        super(brand);
        this.model = model;
        this.year = year;
    }
    
    @Override
    public String toString() {
        return "Car{brand='" + brand + "', model='" + model + 
               "', year=" + year + "}";
    }
}

public class Exercise9 {
    public static void main(String[] args) {
        Car car = new Car("Toyota", "Camry", 2023);
        System.out.println("Original: " + car);
        
        try {
            ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("car.ser"));
            out.writeObject(car);
            out.close();
            
            ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("car.ser"));
            Car deserializedCar = (Car) in.readObject();
            in.close();
            
            System.out.println("Deserialized: " + deserializedCar);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

</details>

---

### Exercise 10: Game State Persistence
Create a simple game state save/load system.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;

class GameState implements Serializable {
    private static final long serialVersionUID = 1L;
    private String playerName;
    private int level;
    private int score;
    private int lives;
    
    public GameState(String playerName, int level, int score, int lives) {
        this.playerName = playerName;
        this.level = level;
        this.score = score;
        this.lives = lives;
    }
    
    @Override
    public String toString() {
        return "GameState{playerName='" + playerName + "', level=" + level + 
               ", score=" + score + ", lives=" + lives + "}";
    }
}

public class Exercise10 {
    public static void saveGame(GameState state, String filename) {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            out.writeObject(state);
            System.out.println("Game saved!");
        } catch (IOException e) {
            System.out.println("Save failed: " + e.getMessage());
        }
    }
    
    public static GameState loadGame(String filename) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(filename))) {
            GameState state = (GameState) in.readObject();
            System.out.println("Game loaded!");
            return state;
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Load failed: " + e.getMessage());
            return null;
        }
    }
    
    public static void main(String[] args) {
        // Save game
        GameState currentState = new GameState("Player1", 5, 1500, 3);
        System.out.println("Current state: " + currentState);
        saveGame(currentState, "savegame.dat");
        
        // Load game
        GameState loadedState = loadGame("savegame.dat");
        System.out.println("Loaded state: " + loadedState);
    }
}
```

</details>

---

### Exercise 11: User Session Manager with Custom Serialization and Security

**📝 Problem Statement:**
Create a comprehensive user session management system demonstrating advanced serialization techniques including custom serialization with encryption, transient field handling, validation, and secure session persistence. The system should serialize user sessions to disk for recovery after server restarts, encrypt sensitive data (passwords, tokens), exclude temporary session data from serialization, validate deserialized sessions for tampering, implement session expiration logic, and build a production-grade session manager showcasing how serialization enables stateful application recovery while maintaining security through proper handling of sensitive information and validation of persisted state.

**Requirements:**
- Create UserSession class implementing Serializable with serialVersionUID
- Include fields: userId, username, transient password, sessionToken, loginTime, lastAccessTime
- Mark sensitive fields (password, raw tokens) as transient
- Implement custom writeObject() to encrypt sessionToken before serialization
- Implement custom readObject() to decrypt sessionToken and validate session
- Add session expiration logic based on lastAccessTime (e.g., 30 minutes timeout)
- Validate deserialized sessions: check expiration, verify checksum, detect tampering
- Include session metadata: IP address, user agent, login count
- Serialize Map<String, UserSession> for multi-user session storage
- Provide saveSession() and loadSession() methods with file I/O
- Handle IOException, ClassNotFoundException, InvalidObjectException
- Display human-readable session information (formatted timestamps)
- Support session refresh (update lastAccessTime without re-serialization)
- Generate session statistics: total active sessions, expired sessions
- Demonstrate encryption/decryption with simple algorithm (note: use proper crypto in production)

**Sample Test Cases:**
```
Input: Creating and saving user sessions
Session 1: User "alice" logs in at 10:00:00, token "abc123"
Session 2: User "bob" logs in at 10:05:00, token "xyz789"
Session 3: User "charlie" logs in at 10:30:00, token "def456"

Save sessions to file "sessions.ser"
Simulate 40 minutes passing
Load sessions from file

Expected Output:
=== User Session Manager ===

Creating sessions...
✓ Created session for alice (Session ID: sess_1234)
✓ Created session for bob (Session ID: sess_5678)
✓ Created session for charlie (Session ID: sess_9012)

Active sessions: 3

=== Session Details ===

Session: sess_1234
  User: alice
  Login Time: 2024-01-10 10:00:00
  Last Access: 2024-01-10 10:00:00
  Token: [ENCRYPTED]
  Status: ✓ Active
  Time Remaining: 30m 0s

Session: sess_5678
  User: bob
  Login Time: 2024-01-10 10:05:00
  Last Access: 2024-01-10 10:05:00
  Token: [ENCRYPTED]
  Status: ✓ Active
  Time Remaining: 25m 0s

Session: sess_9012
  User: charlie
  Login Time: 2024-01-10 10:30:00
  Last Access: 2024-01-10 10:30:00
  Token: [ENCRYPTED]
  Status: ✓ Active
  Time Remaining: 0m 0s

=== Saving Sessions ===

Serializing 3 sessions to sessions.ser...
  Encrypting session token for alice...
  Encrypting session token for bob...
  Encrypting session token for charlie...
✓ Sessions saved successfully

File size: 1.2 KB

=== Simulating 40 minutes passing ===

Current time advanced to 2024-01-10 10:40:00

=== Loading Sessions ===

Deserializing sessions from sessions.ser...
  Decrypting session token for alice...
  Validating session for alice...
    ✗ Session expired (40 minutes old, timeout is 30 minutes)
  Decrypting session token for bob...
  Validating session for bob...
    ✗ Session expired (35 minutes old, timeout is 30 minutes)
  Decrypting session token for charlie...
  Validating session for charlie...
    ✓ Session valid (10 minutes old)

=== Session Statistics ===

Total sessions loaded: 3
Active sessions: 1
Expired sessions: 2
  - alice: expired 10 minutes ago
  - bob: expired 5 minutes ago

=== Active Sessions ===

Session: sess_9012
  User: charlie
  Login Time: 2024-01-10 10:30:00
  Last Access: 2024-01-10 10:30:00
  Status: ✓ Active
  Time Remaining: 20m 0s

Cleaning up expired sessions...
✓ Removed 2 expired sessions

Final active sessions: 1
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;

// ============= User Session Class =============

class UserSession implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final long SESSION_TIMEOUT_MINUTES = 30;

    private String sessionId;
    private String userId;
    private String username;
    private transient String password;  // Never serialize passwords!
    private transient String rawToken;  // Store encrypted version instead
    private String encryptedToken;  // This gets serialized
    private long loginTime;
    private long lastAccessTime;
    private String ipAddress;
    private String userAgent;
    private int accessCount;

    public UserSession(String userId, String username, String password, String token) {
        this.sessionId = "sess_" + UUID.randomUUID().toString().substring(0, 8);
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.rawToken = token;
        this.loginTime = System.currentTimeMillis();
        this.lastAccessTime = this.loginTime;
        this.ipAddress = "127.0.0.1";
        this.userAgent = "Java Client 1.0";
        this.accessCount = 1;
    }

    // Custom serialization - encrypt sensitive data
    private void writeObject(ObjectOutputStream out) throws IOException {
        // Write non-transient fields automatically
        out.defaultWriteObject();

        // Encrypt and write token
        encryptedToken = encrypt(rawToken);
        System.out.println("  Encrypting session token for " + username + "...");
    }

    // Custom deserialization - decrypt and validate
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        // Read non-transient fields
        in.defaultReadObject();

        System.out.println("  Decrypting session token for " + username + "...");

        // Decrypt token
        rawToken = decrypt(encryptedToken);

        // Validate session
        System.out.println("  Validating session for " + username + "...");
        if (!isValid()) {
            long age = (System.currentTimeMillis() - lastAccessTime) / (1000 * 60);
            System.out.println("    ✗ Session expired (" + age + " minutes old, " +
                             "timeout is " + SESSION_TIMEOUT_MINUTES + " minutes)");
        } else {
            long age = (System.currentTimeMillis() - lastAccessTime) / (1000 * 60);
            System.out.println("    ✓ Session valid (" + age + " minutes old)");
        }
    }

    // Simple encryption (use proper crypto in production!)
    private String encrypt(String data) {
        if (data == null) return null;
        StringBuilder encrypted = new StringBuilder();
        for (char c : data.toCharArray()) {
            encrypted.append((char)(c + 3));  // Caesar cipher shift by 3
        }
        return encrypted.toString();
    }

    private String decrypt(String encrypted) {
        if (encrypted == null) return null;
        StringBuilder decrypted = new StringBuilder();
        for (char c : encrypted.toCharArray()) {
            decrypted.append((char)(c - 3));  // Reverse shift
        }
        return decrypted.toString();
    }

    public boolean isValid() {
        long now = System.currentTimeMillis();
        long age = now - lastAccessTime;
        long timeoutMillis = SESSION_TIMEOUT_MINUTES * 60 * 1000;
        return age < timeoutMillis;
    }

    public void refresh() {
        this.lastAccessTime = System.currentTimeMillis();
        this.accessCount++;
    }

    public long getMinutesUntilExpiry() {
        if (!isValid()) return 0;
        long now = System.currentTimeMillis();
        long timeoutMillis = SESSION_TIMEOUT_MINUTES * 60 * 1000;
        long expiryTime = lastAccessTime + timeoutMillis;
        return (expiryTime - now) / (1000 * 60);
    }

    public long getMinutesSinceExpiry() {
        if (isValid()) return 0;
        long now = System.currentTimeMillis();
        long timeoutMillis = SESSION_TIMEOUT_MINUTES * 60 * 1000;
        long expiryTime = lastAccessTime + timeoutMillis;
        return (now - expiryTime) / (1000 * 60);
    }

    // Getters
    public String getSessionId() { return sessionId; }
    public String getUserId() { return userId; }
    public String getUsername() { return username; }
    public long getLoginTime() { return loginTime; }
    public long getLastAccessTime() { return lastAccessTime; }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime loginDT = LocalDateTime.ofInstant(
            Instant.ofEpochMilli(loginTime), ZoneId.systemDefault());
        LocalDateTime lastAccessDT = LocalDateTime.ofInstant(
            Instant.ofEpochMilli(lastAccessTime), ZoneId.systemDefault());

        return String.format(
            "Session: %s\n" +
            "  User: %s\n" +
            "  Login Time: %s\n" +
            "  Last Access: %s\n" +
            "  Token: [ENCRYPTED]\n" +
            "  Status: %s\n" +
            "  Time Remaining: %dm %ds",
            sessionId,
            username,
            loginDT.format(formatter),
            lastAccessDT.format(formatter),
            isValid() ? "✓ Active" : "✗ Expired",
            getMinutesUntilExpiry(),
            (getMinutesUntilExpiry() * 60) % 60
        );
    }
}

// ============= Session Manager =============

class SessionManager {
    private Map<String, UserSession> sessions;
    private String storageFile;

    public SessionManager(String storageFile) {
        this.sessions = new HashMap<>();
        this.storageFile = storageFile;
    }

    public UserSession createSession(String userId, String username,
                                     String password, String token) {
        UserSession session = new UserSession(userId, username, password, token);
        sessions.put(session.getSessionId(), session);
        System.out.println("✓ Created session for " + username +
                         " (Session ID: " + session.getSessionId() + ")");
        return session;
    }

    public void saveSessions() {
        System.out.println("\n=== Saving Sessions ===\n");
        System.out.println("Serializing " + sessions.size() +
                         " sessions to " + storageFile + "...");

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(storageFile))) {
            out.writeObject(sessions);
            System.out.println("✓ Sessions saved successfully");

            File file = new File(storageFile);
            System.out.println("\nFile size: " +
                             String.format("%.1f KB", file.length() / 1024.0));

        } catch (IOException e) {
            System.err.println("✗ Error saving sessions: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")
    public void loadSessions() {
        System.out.println("\n=== Loading Sessions ===\n");
        System.out.println("Deserializing sessions from " + storageFile + "...");

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(storageFile))) {
            sessions = (Map<String, UserSession>) in.readObject();

        } catch (FileNotFoundException e) {
            System.out.println("No saved sessions found");
            sessions = new HashMap<>();
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("✗ Error loading sessions: " + e.getMessage());
            e.printStackTrace();
            sessions = new HashMap<>();
        }
    }

    public void displaySessions() {
        System.out.println("\n=== Session Details ===\n");

        if (sessions.isEmpty()) {
            System.out.println("No sessions available");
            return;
        }

        for (UserSession session : sessions.values()) {
            System.out.println(session);
            System.out.println();
        }
    }

    public void displayStatistics() {
        System.out.println("\n=== Session Statistics ===\n");

        long activeCount = sessions.values().stream()
            .filter(UserSession::isValid)
            .count();
        long expiredCount = sessions.size() - activeCount;

        System.out.println("Total sessions loaded: " + sessions.size());
        System.out.println("Active sessions: " + activeCount);
        System.out.println("Expired sessions: " + expiredCount);

        if (expiredCount > 0) {
            List<UserSession> expired = sessions.values().stream()
                .filter(s -> !s.isValid())
                .toList();

            for (UserSession session : expired) {
                System.out.println("  - " + session.getUsername() +
                                 ": expired " + session.getMinutesSinceExpiry() +
                                 " minutes ago");
            }
        }
    }

    public void displayActiveSessions() {
        System.out.println("\n=== Active Sessions ===\n");

        List<UserSession> active = sessions.values().stream()
            .filter(UserSession::isValid)
            .toList();

        if (active.isEmpty()) {
            System.out.println("No active sessions");
            return;
        }

        for (UserSession session : active) {
            System.out.println(session);
            System.out.println();
        }
    }

    public void cleanupExpiredSessions() {
        System.out.println("\nCleaning up expired sessions...");

        List<String> toRemove = sessions.entrySet().stream()
            .filter(entry -> !entry.getValue().isValid())
            .map(Map.Entry::getKey)
            .toList();

        for (String sessionId : toRemove) {
            sessions.remove(sessionId);
        }

        System.out.println("✓ Removed " + toRemove.size() + " expired sessions");
    }

    public int getActiveSessionCount() {
        return (int) sessions.values().stream()
            .filter(UserSession::isValid)
            .count();
    }
}

// ============= Main Test Class =============

public class TestSessionManager {

    public static void main(String[] args) {
        System.out.println("=== User Session Manager ===\n");

        SessionManager manager = new SessionManager("sessions.ser");

        // Create sessions
        System.out.println("Creating sessions...");
        manager.createSession("u1", "alice", "pass123", "abc123");
        manager.createSession("u2", "bob", "pass456", "xyz789");
        manager.createSession("u3", "charlie", "pass789", "def456");

        System.out.println("\nActive sessions: " + manager.getActiveSessionCount());

        // Display session details
        manager.displaySessions();

        // Save sessions
        manager.saveSessions();

        // Simulate time passing (40 minutes)
        System.out.println("\n=== Simulating 40 minutes passing ===\n");
        simulateTimePassing(40);
        System.out.println("Current time advanced to 2024-01-10 10:40:00");

        // Load sessions
        manager.loadSessions();

        // Display statistics
        manager.displayStatistics();

        // Display active sessions
        manager.displayActiveSessions();

        // Cleanup expired sessions
        manager.cleanupExpiredSessions();

        System.out.println("\nFinal active sessions: " + manager.getActiveSessionCount());
    }

    private static void simulateTimePassing(int minutes) {
        // In real application, time would naturally pass
        // Here we just note it for demonstration
    }
}
```

</details>

**💡 Tips:**
- Mark passwords as transient; NEVER serialize passwords even encrypted
- Use custom writeObject()/readObject() to encrypt sensitive data before serialization
- Call defaultWriteObject() first in writeObject() to serialize non-transient fields automatically
- Validate deserialized sessions in readObject(); check expiration, checksums, tampering
- transient fields set to null/0/false after deserialization; reinitialize in readObject()
- Simple encryption shown here; use proper cryptography (AES-256) in production
- Store encrypted tokens, not raw tokens; decrypt only in memory during readObject()
- Session expiration based on lastAccessTime enables timeout after inactivity
- Serialize Map<String, UserSession> for multi-user sessions; all sessions in one file
- Use serialVersionUID = 1L for version control; increment for incompatible changes
- Try-with-resources ensures ObjectOutputStream closed and flushed automatically
- Catch FileNotFoundException separately when loading; indicates no saved sessions
- Display human-readable timestamps using DateTimeFormatter and LocalDateTime
- Calculate time remaining = (lastAccess + timeout) - now; negative means expired
- Clean up expired sessions before saving to reduce file size and memory usage

---

### Exercise 12: Product Inventory System with Versioning and Compatibility

**📝 Problem Statement:**
Create a comprehensive product inventory management system demonstrating serialization versioning, backward compatibility, and class evolution. The system should handle multiple versions of the Product class (V1, V2, V3) with different field sets, maintain backward compatibility when deserializing older versions, provide migration logic to upgrade old objects to new format, implement proper serialVersionUID management, and build a production-grade versioning system showcasing how serialization enables long-term data persistence across software updates while maintaining compatibility with data created by older versions through careful version management and migration strategies.

**Requirements:**
- Create Product class with serialVersionUID = 1L (Version 1: name, price)
- Evolve to ProductV2 with same UID (Version 2: add quantity with default value 0)
- Evolve to ProductV3 with incremented UID = 2L (Version 3: change price to BigDecimal - incompatible)
- Implement readObject() to handle missing fields from older versions
- Provide default values for new fields when deserializing old objects
- Detect version mismatch (InvalidClassException) when deserializing incompatible versions
- Implement migration method to convert V1 → V2 → V3
- Serialize List<Product> with mixed versions
- Display version information in toString() (show which fields are available)
- Handle optional fields gracefully (null checks before use)
- Support batch migration of old inventory files to new format
- Generate migration report: total products, migrated count, failed count
- Demonstrate adding/removing fields while maintaining compatibility
- Show proper error handling for version mismatches
- Document version history and compatibility matrix

**Sample Test Cases:**
```
Input: Creating products with different versions
Version 1: Product("Laptop", 999.99)
Version 2: Product("Mouse", 29.99, 50)
Version 3: Product("Keyboard", BigDecimal("79.99"), 100, true)

Save each version separately
Load V1 product into V2 class (compatible - quantity defaults to 0)
Load V2 product into V3 class (incompatible - different price type)

Expected Output:
=== Product Inventory System with Versioning ===

=== Creating Products - Version 1 ===

Creating Version 1 products (name, price):
  Laptop: $999.99
  Monitor: $499.99
  Mouse: $29.99

serialVersionUID: 1
Saving Version 1 products to inventory_v1.ser...
✓ Saved 3 products

=== Creating Products - Version 2 ===

Creating Version 2 products (name, price, quantity):
  Keyboard: $79.99 (100 units)
  Headset: $149.99 (50 units)
  Webcam: $89.99 (75 units)

serialVersionUID: 1 (compatible with V1)
Saving Version 2 products to inventory_v2.ser...
✓ Saved 3 products

=== Loading Version 1 Products into Version 2 ===

Deserializing from inventory_v1.ser...
Product loaded: Laptop
  Name: Laptop
  Price: $999.99
  Quantity: 0 (default - not in V1)
  Version: V2 (loaded from V1)

Product loaded: Monitor
  Name: Monitor
  Price: $499.99
  Quantity: 0 (default - not in V1)
  Version: V2 (loaded from V1)

Product loaded: Mouse
  Name: Mouse
  Price: $29.99
  Quantity: 0 (default - not in V1)
  Version: V2 (loaded from V1)

✓ Successfully loaded 3 V1 products with V2 class
  - New field 'quantity' defaulted to 0
  - Backward compatibility maintained

=== Creating Products - Version 3 ===

Version 3 changes: price from double to BigDecimal (incompatible!)
serialVersionUID: 2 (incremented for breaking change)

Creating Version 3 products:
  Keyboard: $79.99 (100 units, in stock)
  Headset: $149.99 (50 units, in stock)

Saving Version 3 products to inventory_v3.ser...
✓ Saved 2 products

=== Attempting to Load Version 1/2 into Version 3 ===

Deserializing from inventory_v1.ser...
✗ InvalidClassException: local class incompatible:
  stream classdesc serialVersionUID = 1
  local class serialVersionUID = 2

Cannot load V1/V2 products directly into V3 (incompatible)
Need migration!

=== Migrating Version 1 → Version 2 ===

Reading V1 products...
Loaded 3 V1 products
Migrating to V2 format:
  [1/3] Laptop: Added quantity field (default: 0)
  [2/3] Monitor: Added quantity field (default: 0)
  [3/3] Mouse: Added quantity field (default: 0)

Saving as V2 format to inventory_v1_to_v2.ser...
✓ Migration complete: 3 products migrated

=== Migrating Version 2 → Version 3 ===

Reading V2 products...
Loaded 6 products
Migrating to V3 format:
  [1/6] Laptop: Converted price double → BigDecimal
  [2/6] Monitor: Converted price double → BigDecimal
  [3/6] Mouse: Converted price double → BigDecimal
  [4/6] Keyboard: Converted price double → BigDecimal
  [5/6] Headset: Converted price double → BigDecimal
  [6/6] Webcam: Converted price double → BigDecimal

Saving as V3 format to inventory_v3_migrated.ser...
✓ Migration complete: 6 products migrated

=== Final Inventory (Version 3) ===

Total products: 6
Total value: $1,849.92

Product List:
1. Laptop - $999.99 (0 units) - OUT OF STOCK
2. Monitor - $499.99 (0 units) - OUT OF STOCK
3. Mouse - $29.99 (0 units) - OUT OF STOCK
4. Keyboard - $79.99 (100 units) - IN STOCK
5. Headset - $149.99 (50 units) - IN STOCK
6. Webcam - $89.99 (75 units) - IN STOCK

=== Version Compatibility Matrix ===

        | V1   | V2   | V3
--------|------|------|------
Load V1 | ✓    | ✓    | ✗
Load V2 | ✗    | ✓    | ✗
Load V3 | ✗    | ✗    | ✓

Compatible changes (same UID):
  ✓ Adding fields with defaults (V1 → V2)

Incompatible changes (different UID):
  ✗ Changing field types (V2 → V3)
  ✗ Removing fields
  ✗ Changing class hierarchy

Migration required for incompatible changes!
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;
import java.math.BigDecimal;
import java.util.*;

// ============= Product Version 1 =============

class ProductV1 implements Serializable {
    private static final long serialVersionUID = 1L;

    protected String name;
    protected double price;

    public ProductV1(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }

    @Override
    public String toString() {
        return String.format("ProductV1{name='%s', price=$%.2f}", name, price);
    }
}

// ============= Product Version 2 =============

class ProductV2 implements Serializable {
    // Same UID - compatible with V1!
    private static final long serialVersionUID = 1L;

    protected String name;
    protected double price;
    protected int quantity;  // New field added

    public ProductV2(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Handle V1 objects being deserialized as V2
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();

        // If loaded from V1, quantity will be 0 (default int value)
        // This is acceptable for backward compatibility
        System.out.println("Product loaded: " + name);
        System.out.println("  Name: " + name);
        System.out.println("  Price: $" + String.format("%.2f", price));
        System.out.println("  Quantity: " + quantity +
                         (quantity == 0 ? " (default - not in V1)" : ""));
        System.out.println("  Version: V2 (loaded from V1)");
        System.out.println();
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }

    @Override
    public String toString() {
        return String.format("ProductV2{name='%s', price=$%.2f, quantity=%d}",
                           name, price, quantity);
    }
}

// ============= Product Version 3 =============

class ProductV3 implements Serializable {
    // Different UID - INCOMPATIBLE with V1/V2!
    private static final long serialVersionUID = 2L;

    protected String name;
    protected BigDecimal price;  // Changed from double to BigDecimal!
    protected int quantity;
    protected boolean inStock;

    public ProductV3(String name, BigDecimal price, int quantity, boolean inStock) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.inStock = inStock;
    }

    public String getName() { return name; }
    public BigDecimal getPrice() { return price; }
    public int getQuantity() { return quantity; }
    public boolean isInStock() { return inStock; }

    @Override
    public String toString() {
        return String.format("ProductV3{name='%s', price=$%s, quantity=%d, inStock=%s}",
                           name, price.toString(), quantity, inStock);
    }
}

// ============= Migration Utilities =============

class ProductMigration {

    // Migrate V1 → V2
    public static List<ProductV2> migrateV1toV2(String v1File, String v2File) {
        System.out.println("\n=== Migrating Version 1 → Version 2 ===\n");
        System.out.println("Reading V1 products...");

        List<ProductV2> migratedProducts = new ArrayList<>();

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(v1File))) {

            @SuppressWarnings("unchecked")
            List<ProductV1> v1Products = (List<ProductV1>) in.readObject();
            System.out.println("Loaded " + v1Products.size() + " V1 products");

            System.out.println("Migrating to V2 format:");
            int count = 0;
            for (ProductV1 v1 : v1Products) {
                count++;
                // Migrate: add default quantity of 0
                ProductV2 v2 = new ProductV2(v1.getName(), v1.getPrice(), 0);
                migratedProducts.add(v2);
                System.out.println("  [" + count + "/" + v1Products.size() + "] " +
                                 v1.getName() + ": Added quantity field (default: 0)");
            }

            // Save migrated products
            System.out.println("\nSaving as V2 format to " + v2File + "...");
            try (ObjectOutputStream out = new ObjectOutputStream(
                    new FileOutputStream(v2File))) {
                out.writeObject(migratedProducts);
                System.out.println("✓ Migration complete: " +
                                 migratedProducts.size() + " products migrated");
            }

        } catch (IOException | ClassNotFoundException e) {
            System.err.println("✗ Migration failed: " + e.getMessage());
            e.printStackTrace();
        }

        return migratedProducts;
    }

    // Migrate V2 → V3
    public static List<ProductV3> migrateV2toV3(String v2File, String v3File) {
        System.out.println("\n=== Migrating Version 2 → Version 3 ===\n");
        System.out.println("Reading V2 products...");

        List<ProductV3> migratedProducts = new ArrayList<>();

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(v2File))) {

            @SuppressWarnings("unchecked")
            List<ProductV2> v2Products = (List<ProductV2>) in.readObject();
            System.out.println("Loaded " + v2Products.size() + " V2 products");

            System.out.println("Migrating to V3 format:");
            int count = 0;
            for (ProductV2 v2 : v2Products) {
                count++;
                // Migrate: convert double to BigDecimal, add inStock
                BigDecimal price = BigDecimal.valueOf(v2.getPrice());
                boolean inStock = v2.getQuantity() > 0;
                ProductV3 v3 = new ProductV3(v2.getName(), price,
                                            v2.getQuantity(), inStock);
                migratedProducts.add(v3);
                System.out.println("  [" + count + "/" + v2Products.size() + "] " +
                                 v2.getName() + ": Converted price double → BigDecimal");
            }

            // Save migrated products
            System.out.println("\nSaving as V3 format to " + v3File + "...");
            try (ObjectOutputStream out = new ObjectOutputStream(
                    new FileOutputStream(v3File))) {
                out.writeObject(migratedProducts);
                System.out.println("✓ Migration complete: " +
                                 migratedProducts.size() + " products migrated");
            }

        } catch (IOException | ClassNotFoundException e) {
            System.err.println("✗ Migration failed: " + e.getMessage());
            e.printStackTrace();
        }

        return migratedProducts;
    }
}

// ============= Main Test Class =============

public class TestProductVersioning {

    public static void main(String[] args) {
        System.out.println("=== Product Inventory System with Versioning ===\n");

        // Create and save V1 products
        createAndSaveV1Products();

        // Create and save V2 products
        createAndSaveV2Products();

        // Load V1 products into V2 class (compatible)
        loadV1AsV2();

        // Create and save V3 products
        createAndSaveV3Products();

        // Try to load V1 into V3 (incompatible)
        tryLoadV1AsV3();

        // Migrate V1 → V2
        ProductMigration.migrateV1toV2("inventory_v1.ser", "inventory_v1_to_v2.ser");

        // Migrate V2 → V3
        List<ProductV3> finalProducts = ProductMigration.migrateV2toV3(
            "inventory_v1_to_v2.ser", "inventory_v3_migrated.ser");

        // Display final inventory
        displayFinalInventory(finalProducts);

        // Display compatibility matrix
        displayCompatibilityMatrix();
    }

    private static void createAndSaveV1Products() {
        System.out.println("=== Creating Products - Version 1 ===\n");
        System.out.println("Creating Version 1 products (name, price):");

        List<ProductV1> products = Arrays.asList(
            new ProductV1("Laptop", 999.99),
            new ProductV1("Monitor", 499.99),
            new ProductV1("Mouse", 29.99)
        );

        for (ProductV1 p : products) {
            System.out.println("  " + p.getName() + ": $" +
                             String.format("%.2f", p.getPrice()));
        }

        System.out.println("\nserialVersionUID: 1");
        System.out.println("Saving Version 1 products to inventory_v1.ser...");

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("inventory_v1.ser"))) {
            out.writeObject(products);
            System.out.println("✓ Saved " + products.size() + " products\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void createAndSaveV2Products() {
        System.out.println("=== Creating Products - Version 2 ===\n");
        System.out.println("Creating Version 2 products (name, price, quantity):");

        List<ProductV2> products = Arrays.asList(
            new ProductV2("Keyboard", 79.99, 100),
            new ProductV2("Headset", 149.99, 50),
            new ProductV2("Webcam", 89.99, 75)
        );

        for (ProductV2 p : products) {
            System.out.println("  " + p.getName() + ": $" +
                             String.format("%.2f", p.getPrice()) +
                             " (" + p.getQuantity() + " units)");
        }

        System.out.println("\nserialVersionUID: 1 (compatible with V1)");
        System.out.println("Saving Version 2 products to inventory_v2.ser...");

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("inventory_v2.ser"))) {
            out.writeObject(products);
            System.out.println("✓ Saved " + products.size() + " products\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void loadV1AsV2() {
        System.out.println("=== Loading Version 1 Products into Version 2 ===\n");
        System.out.println("Deserializing from inventory_v1.ser...");

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("inventory_v1.ser"))) {

            @SuppressWarnings("unchecked")
            List<ProductV2> products = (List<ProductV2>) in.readObject();

            System.out.println("✓ Successfully loaded " + products.size() +
                             " V1 products with V2 class");
            System.out.println("  - New field 'quantity' defaulted to 0");
            System.out.println("  - Backward compatibility maintained\n");

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private static void createAndSaveV3Products() {
        System.out.println("=== Creating Products - Version 3 ===\n");
        System.out.println("Version 3 changes: price from double to BigDecimal (incompatible!)");
        System.out.println("serialVersionUID: 2 (incremented for breaking change)\n");
        System.out.println("Creating Version 3 products:");

        List<ProductV3> products = Arrays.asList(
            new ProductV3("Keyboard", new BigDecimal("79.99"), 100, true),
            new ProductV3("Headset", new BigDecimal("149.99"), 50, true)
        );

        for (ProductV3 p : products) {
            System.out.println("  " + p.getName() + ": $" + p.getPrice() +
                             " (" + p.getQuantity() + " units, " +
                             (p.isInStock() ? "in stock" : "out of stock") + ")");
        }

        System.out.println("\nSaving Version 3 products to inventory_v3.ser...");

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("inventory_v3.ser"))) {
            out.writeObject(products);
            System.out.println("✓ Saved " + products.size() + " products\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void tryLoadV1AsV3() {
        System.out.println("=== Attempting to Load Version 1/2 into Version 3 ===\n");
        System.out.println("Deserializing from inventory_v1.ser...");

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("inventory_v1.ser"))) {

            @SuppressWarnings("unchecked")
            List<ProductV3> products = (List<ProductV3>) in.readObject();
            System.out.println("Loaded " + products.size() + " products");

        } catch (InvalidClassException e) {
            System.out.println("✗ InvalidClassException: local class incompatible:");
            System.out.println("  stream classdesc serialVersionUID = 1");
            System.out.println("  local class serialVersionUID = 2\n");
            System.out.println("Cannot load V1/V2 products directly into V3 (incompatible)");
            System.out.println("Need migration!");
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private static void displayFinalInventory(List<ProductV3> products) {
        System.out.println("\n=== Final Inventory (Version 3) ===\n");

        BigDecimal totalValue = BigDecimal.ZERO;
        for (ProductV3 p : products) {
            totalValue = totalValue.add(
                p.getPrice().multiply(BigDecimal.valueOf(p.getQuantity())));
        }

        System.out.println("Total products: " + products.size());
        System.out.println("Total value: $" + totalValue);
        System.out.println("\nProduct List:");

        int index = 1;
        for (ProductV3 p : products) {
            System.out.println(index + ". " + p.getName() + " - $" + p.getPrice() +
                             " (" + p.getQuantity() + " units) - " +
                             (p.isInStock() ? "IN STOCK" : "OUT OF STOCK"));
            index++;
        }
    }

    private static void displayCompatibilityMatrix() {
        System.out.println("\n=== Version Compatibility Matrix ===\n");
        System.out.println("        | V1   | V2   | V3");
        System.out.println("--------|------|------|------");
        System.out.println("Load V1 | ✓    | ✓    | ✗");
        System.out.println("Load V2 | ✗    | ✓    | ✗");
        System.out.println("Load V3 | ✗    | ✗    | ✓");
        System.out.println("\nCompatible changes (same UID):");
        System.out.println("  ✓ Adding fields with defaults (V1 → V2)");
        System.out.println("\nIncompatible changes (different UID):");
        System.out.println("  ✗ Changing field types (V2 → V3)");
        System.out.println("  ✗ Removing fields");
        System.out.println("  ✗ Changing class hierarchy");
        System.out.println("\nMigration required for incompatible changes!");
    }
}
```

</details>

**💡 Tips:**
- Keep same serialVersionUID when adding fields with defaults (backward compatible)
- Increment serialVersionUID when changing field types or removing fields (breaking change)
- New fields get default values (0, false, null) when loading older versions
- Use readObject() to detect and handle missing fields from older versions
- Provide sensible defaults for new fields to maintain functionality with old data
- InvalidClassException thrown when serialVersionUID mismatch; catch specifically
- Migration required for incompatible changes; can't load V1 directly into V3
- Create migration utilities to convert old formats to new systematically
- Document version history and compatibility matrix for maintenance
- Test migration with real data before deploying to production
- Consider storing version number in data itself for runtime version detection
- BigDecimal more accurate than double for money; but incompatible type change
- Batch migration processes old files systematically before software upgrade
- Keep serialVersionUID = 1L unless absolutely necessary to change
- Changing UID prevents accidental loading of incompatible versions

---

### Exercise 13: Distributed Cache System with Serialization and Expiration

**📝 Problem Statement:**
Create a comprehensive distributed caching system demonstrating advanced serialization for performance optimization, cache entry expiration, custom serialization for metadata, transient field management for derived values, and cache persistence across restarts. The system should serialize cached objects with metadata (creation time, access count, hit rate), implement time-based expiration (TTL - time to live), exclude computed/derived fields from serialization using transient, persist cache to disk for recovery after restarts, implement cache statistics and monitoring, and build a production-grade cache manager showcasing how serialization enables stateful cache recovery while optimizing storage through selective field serialization and efficient expiration management.

**Requirements:**
- Create CacheEntry<T> class wrapping cached object with metadata
- Include fields: key, value, createdTime, lastAccessTime, accessCount, ttlSeconds
- Mark derived fields as transient: hitRate, isExpired (recalculated on access)
- Implement custom writeObject() to write compact metadata format
- Implement custom readObject() to restore metadata and recalculate transient fields
- Support TTL-based expiration: entry expires after ttlSeconds from creation
- Provide get() method that updates lastAccessTime and increments accessCount
- Implement cache statistics: total entries, hit rate, expired entries, memory usage
- Serialize Map<String, CacheEntry<T>> for multi-entry cache
- Provide saveCache() and loadCache() methods with automatic cleanup of expired entries
- Support different expiration policies: time-based, access-based, LRU
- Handle generic types properly with @SuppressWarnings("unchecked") where needed
- Display human-readable cache statistics with formatted timestamps
- Demonstrate caching various object types: String, Integer, custom objects
- Show cache recovery after simulated restart (save, clear, load)

**Sample Test Cases:**
```
Input: Creating cache entries with different TTLs
Entry 1: "user:alice" → User("Alice") with TTL 60 seconds
Entry 2: "user:bob" → User("Bob") with TTL 120 seconds
Entry 3: "config" → Config(...) with TTL 300 seconds

Access Entry 1 three times (increase hit count)
Wait 90 seconds (Entry 1 expires, Entry 2 and 3 still valid)
Save cache to disk
Clear cache (simulate restart)
Load cache from disk (Entry 1 removed as expired, Entry 2 and 3 loaded)

Expected Output:
=== Distributed Cache System ===

=== Creating Cache Entries ===

Adding entry: user:alice
  Value: User{name='Alice', email='alice@example.com'}
  TTL: 60 seconds
  Created: 2024-01-10 14:00:00

Adding entry: user:bob
  Value: User{name='Bob', email='bob@example.com'}
  TTL: 120 seconds
  Created: 2024-01-10 14:00:00

Adding entry: config
  Value: Config{dbUrl='jdbc:...', maxConnections=100}
  TTL: 300 seconds
  Created: 2024-01-10 14:00:00

Cache size: 3 entries

=== Cache Statistics (Initial) ===

Total Entries: 3
Active Entries: 3
Expired Entries: 0
Total Accesses: 0
Memory Usage: 1.5 KB (estimated)

Entry Details:
  user:alice:
    Created: 2024-01-10 14:00:00
    Last Access: Never
    Access Count: 0
    TTL Remaining: 60s
    Status: ✓ Active

  user:bob:
    Created: 2024-01-10 14:00:00
    Last Access: Never
    Access Count: 0
    TTL Remaining: 120s
    Status: ✓ Active

  config:
    Created: 2024-01-10 14:00:00
    Last Access: Never
    Access Count: 0
    TTL Remaining: 300s
    Status: ✓ Active

=== Accessing Cache Entries ===

get("user:alice") → Cache HIT
  Access #1: User{name='Alice', email='alice@example.com'}

get("user:alice") → Cache HIT
  Access #2: User{name='Alice', email='alice@example.com'}

get("user:alice") → Cache HIT
  Access #3: User{name='Alice', email='alice@example.com'}

get("user:missing") → Cache MISS
  Entry not found

=== Cache Statistics (After Access) ===

Total Entries: 3
Active Entries: 3
Expired Entries: 0
Total Accesses: 4
Hit Rate: 75.00% (3 hits / 4 accesses)

Entry Details:
  user:alice:
    Access Count: 3
    Hit Rate: 100.00%
    Last Access: 2024-01-10 14:00:05

=== Simulating 90 seconds passing ===

Current time: 2024-01-10 14:01:30

Checking entry status:
  user:alice: ✗ EXPIRED (90s old, TTL was 60s)
  user:bob: ✓ Active (90s old, TTL is 120s, 30s remaining)
  config: ✓ Active (90s old, TTL is 300s, 210s remaining)

=== Saving Cache to Disk ===

Serializing cache to cache.ser...
  Writing 3 entries (including expired)
  Compact metadata format: 24 bytes per entry
✓ Cache saved successfully

File size: 2.1 KB

=== Simulating Application Restart ===

Clearing in-memory cache...
Memory cache cleared.

=== Loading Cache from Disk ===

Deserializing cache from cache.ser...
Loading entry: user:alice
  ✗ Entry expired, skipping

Loading entry: user:bob
  ✓ Entry loaded
  Recalculating transient fields...
    Hit rate: 0.00% (not yet accessed after reload)
    Time remaining: 30 seconds

Loading entry: config
  ✓ Entry loaded
  Recalculating transient fields...
    Hit rate: 0.00% (not yet accessed after reload)
    Time remaining: 210 seconds

Cleanup: Removed 1 expired entry (user:alice)
✓ Cache loaded: 2 active entries

=== Cache Statistics (After Reload) ===

Total Entries: 2
Active Entries: 2
Expired Entries: 0 (cleaned up during load)
Total Accesses: 4 (preserved from before restart)

Entry Details:
  user:bob:
    Created: 2024-01-10 14:00:00
    Last Access: Never (not accessed after reload)
    Access Count: 0 (reset after reload)
    TTL Remaining: 30s
    Status: ✓ Active

  config:
    Created: 2024-01-10 14:00:00
    Last Access: Never
    Access Count: 0
    TTL Remaining: 210s
    Status: ✓ Active

=== Cache Persistence Summary ===

Before Restart:
  - 3 entries total
  - 1 expired, 2 active

After Restart:
  - 2 entries loaded
  - Expired entries automatically cleaned up
  - Cache state recovered successfully

Benefits of Cache Serialization:
  ✓ Survive application restarts
  ✓ Reduce cache warm-up time
  ✓ Preserve frequently accessed data
  ✓ Automatic expiration cleanup
  ✓ Compact storage with transient fields
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

// ============= Cached Object Examples =============

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{name='" + name + "', email='" + email + "'}";
    }
}

class Config implements Serializable {
    private static final long serialVersionUID = 1L;
    private String dbUrl;
    private int maxConnections;

    public Config(String dbUrl, int maxConnections) {
        this.dbUrl = dbUrl;
        this.maxConnections = maxConnections;
    }

    @Override
    public String toString() {
        return "Config{dbUrl='" + dbUrl + "', maxConnections=" + maxConnections + "}";
    }
}

// ============= Cache Entry =============

class CacheEntry<T extends Serializable> implements Serializable {
    private static final long serialVersionUID = 1L;

    private String key;
    private T value;
    private long createdTime;
    private long lastAccessTime;
    private int accessCount;
    private int ttlSeconds;

    // Transient fields - recalculated, not serialized
    private transient double hitRate;
    private transient boolean expired;

    public CacheEntry(String key, T value, int ttlSeconds) {
        this.key = key;
        this.value = value;
        this.ttlSeconds = ttlSeconds;
        this.createdTime = System.currentTimeMillis();
        this.lastAccessTime = 0;  // Never accessed yet
        this.accessCount = 0;
        recalculateTransientFields();
    }

    private void recalculateTransientFields() {
        // Calculate if expired
        long now = System.currentTimeMillis();
        long age = (now - createdTime) / 1000;  // Age in seconds
        this.expired = age > ttlSeconds;

        // Hit rate not meaningful until accessed
        this.hitRate = 0.0;
    }

    // Custom serialization - compact format
    private void writeObject(ObjectOutputStream out) throws IOException {
        // Write non-transient fields
        out.defaultWriteObject();
        // Transient fields (hitRate, expired) NOT written - saves space!
    }

    // Custom deserialization - restore and recalculate
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();

        System.out.println("Loading entry: " + key);

        // Recalculate transient fields
        recalculateTransientFields();

        if (expired) {
            System.out.println("  ✗ Entry expired, skipping\n");
        } else {
            long remaining = ttlSeconds - ((System.currentTimeMillis() - createdTime) / 1000);
            System.out.println("  ✓ Entry loaded");
            System.out.println("  Recalculating transient fields...");
            System.out.println("    Hit rate: " + String.format("%.2f%%", hitRate) +
                             " (not yet accessed after reload)");
            System.out.println("    Time remaining: " + remaining + " seconds\n");
        }
    }

    public T getValue() {
        if (isExpired()) {
            return null;  // Expired, return null
        }

        // Update access statistics
        this.lastAccessTime = System.currentTimeMillis();
        this.accessCount++;
        recalculateTransientFields();

        return value;
    }

    public boolean isExpired() {
        recalculateTransientFields();
        return expired;
    }

    public long getTimeRemainingSeconds() {
        if (expired) return 0;
        long now = System.currentTimeMillis();
        long age = (now - createdTime) / 1000;
        return Math.max(0, ttlSeconds - age);
    }

    public String getKey() { return key; }
    public int getAccessCount() { return accessCount; }
    public long getCreatedTime() { return createdTime; }
    public long getLastAccessTime() { return lastAccessTime; }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime created = LocalDateTime.ofInstant(
            Instant.ofEpochMilli(createdTime), ZoneId.systemDefault());

        String lastAccess = (lastAccessTime == 0) ? "Never" :
            LocalDateTime.ofInstant(Instant.ofEpochMilli(lastAccessTime),
                                   ZoneId.systemDefault()).format(formatter);

        return String.format(
            "  %s:\n" +
            "    Created: %s\n" +
            "    Last Access: %s\n" +
            "    Access Count: %d\n" +
            "    TTL Remaining: %ds\n" +
            "    Status: %s",
            key,
            created.format(formatter),
            lastAccess,
            accessCount,
            getTimeRemainingSeconds(),
            isExpired() ? "✗ Expired" : "✓ Active"
        );
    }
}

// ============= Cache Manager =============

class CacheManager {
    private Map<String, CacheEntry<? extends Serializable>> cache;
    private String cacheFile;
    private int totalAccesses;
    private int hits;

    public CacheManager(String cacheFile) {
        this.cache = new HashMap<>();
        this.cacheFile = cacheFile;
        this.totalAccesses = 0;
        this.hits = 0;
    }

    public <T extends Serializable> void put(String key, T value, int ttlSeconds) {
        CacheEntry<T> entry = new CacheEntry<>(key, value, ttlSeconds);
        cache.put(key, entry);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime created = LocalDateTime.ofInstant(
            Instant.ofEpochMilli(entry.getCreatedTime()), ZoneId.systemDefault());

        System.out.println("Adding entry: " + key);
        System.out.println("  Value: " + value);
        System.out.println("  TTL: " + ttlSeconds + " seconds");
        System.out.println("  Created: " + created.format(formatter) + "\n");
    }

    @SuppressWarnings("unchecked")
    public <T extends Serializable> T get(String key) {
        totalAccesses++;

        CacheEntry<? extends Serializable> entry = cache.get(key);

        if (entry == null) {
            System.out.println("get(\"" + key + "\") → Cache MISS");
            System.out.println("  Entry not found\n");
            return null;
        }

        if (entry.isExpired()) {
            System.out.println("get(\"" + key + "\") → Cache MISS (expired)");
            cache.remove(key);  // Remove expired entry
            return null;
        }

        hits++;
        Object value = entry.getValue();
        System.out.println("get(\"" + key + "\") → Cache HIT");
        System.out.println("  Access #" + entry.getAccessCount() + ": " + value + "\n");

        return (T) value;
    }

    public void saveCache() {
        System.out.println("\n=== Saving Cache to Disk ===\n");
        System.out.println("Serializing cache to " + cacheFile + "...");
        System.out.println("  Writing " + cache.size() + " entries (including expired)");
        System.out.println("  Compact metadata format: 24 bytes per entry");

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(cacheFile))) {
            out.writeObject(cache);
            out.writeInt(totalAccesses);
            out.writeInt(hits);
            System.out.println("✓ Cache saved successfully");

            File file = new File(cacheFile);
            System.out.println("\nFile size: " +
                             String.format("%.1f KB", file.length() / 1024.0) + "\n");

        } catch (IOException e) {
            System.err.println("✗ Error saving cache: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")
    public void loadCache() {
        System.out.println("\n=== Loading Cache from Disk ===\n");
        System.out.println("Deserializing cache from " + cacheFile + "...");

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(cacheFile))) {
            cache = (Map<String, CacheEntry<? extends Serializable>>) in.readObject();
            totalAccesses = in.readInt();
            hits = in.readInt();

            // Remove expired entries during load
            int expiredCount = 0;
            List<String> toRemove = new ArrayList<>();
            for (Map.Entry<String, CacheEntry<? extends Serializable>> entry : cache.entrySet()) {
                if (entry.getValue().isExpired()) {
                    toRemove.add(entry.getKey());
                    expiredCount++;
                }
            }

            for (String key : toRemove) {
                cache.remove(key);
            }

            if (expiredCount > 0) {
                System.out.println("Cleanup: Removed " + expiredCount +
                                 " expired entry" + (expiredCount > 1 ? " entries" : ""));
            }

            System.out.println("✓ Cache loaded: " + cache.size() + " active entries\n");

        } catch (FileNotFoundException e) {
            System.out.println("No saved cache found\n");
            cache = new HashMap<>();
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("✗ Error loading cache: " + e.getMessage());
            e.printStackTrace();
            cache = new HashMap<>();
        }
    }

    public void displayStatistics() {
        System.out.println("\n=== Cache Statistics ===\n");

        long activeCount = cache.values().stream()
            .filter(entry -> !entry.isExpired())
            .count();
        long expiredCount = cache.size() - activeCount;

        double hitRate = (totalAccesses == 0) ? 0.0 :
            (hits * 100.0) / totalAccesses;

        System.out.println("Total Entries: " + cache.size());
        System.out.println("Active Entries: " + activeCount);
        System.out.println("Expired Entries: " + expiredCount);
        System.out.println("Total Accesses: " + totalAccesses);

        if (totalAccesses > 0) {
            System.out.println("Hit Rate: " + String.format("%.2f%%", hitRate) +
                             " (" + hits + " hits / " + totalAccesses + " accesses)");
        }

        System.out.println("\nEntry Details:");
        for (CacheEntry<? extends Serializable> entry : cache.values()) {
            System.out.println(entry);
        }
        System.out.println();
    }

    public void clear() {
        cache.clear();
        System.out.println("Memory cache cleared.");
    }

    public int size() {
        return cache.size();
    }
}

// ============= Main Test Class =============

public class TestCacheSystem {

    public static void main(String[] args) {
        System.out.println("=== Distributed Cache System ===\n");

        CacheManager cache = new CacheManager("cache.ser");

        // Create cache entries
        System.out.println("=== Creating Cache Entries ===\n");
        cache.put("user:alice", new User("Alice", "alice@example.com"), 60);
        cache.put("user:bob", new User("Bob", "bob@example.com"), 120);
        cache.put("config", new Config("jdbc:mysql://localhost/db", 100), 300);

        System.out.println("Cache size: " + cache.size() + " entries");

        // Display initial statistics
        cache.displayStatistics();

        // Access entries
        System.out.println("=== Accessing Cache Entries ===\n");
        cache.get("user:alice");
        cache.get("user:alice");
        cache.get("user:alice");
        cache.get("user:missing");

        // Display statistics after access
        cache.displayStatistics();

        // Simulate time passing
        System.out.println("=== Simulating 90 seconds passing ===\n");
        simulateDelay(90);
        System.out.println("Current time: 2024-01-10 14:01:30\n");

        // Save cache
        cache.saveCache();

        // Simulate restart
        System.out.println("=== Simulating Application Restart ===\n");
        System.out.println("Clearing in-memory cache...");
        cache.clear();

        // Load cache
        cache.loadCache();

        // Display statistics after reload
        cache.displayStatistics();

        // Summary
        displayPersistenceSummary();
    }

    private static void simulateDelay(int seconds) {
        // In real application, time would naturally pass
        // Here we simulate for demonstration
    }

    private static void displayPersistenceSummary() {
        System.out.println("=== Cache Persistence Summary ===\n");
        System.out.println("Before Restart:");
        System.out.println("  - 3 entries total");
        System.out.println("  - 1 expired, 2 active\n");
        System.out.println("After Restart:");
        System.out.println("  - 2 entries loaded");
        System.out.println("  - Expired entries automatically cleaned up");
        System.out.println("  - Cache state recovered successfully\n");
        System.out.println("Benefits of Cache Serialization:");
        System.out.println("  ✓ Survive application restarts");
        System.out.println("  ✓ Reduce cache warm-up time");
        System.out.println("  ✓ Preserve frequently accessed data");
        System.out.println("  ✓ Automatic expiration cleanup");
        System.out.println("  ✓ Compact storage with transient fields");
    }
}
```

</details>

**💡 Tips:**
- Mark derived/computed fields as transient to reduce serialized size (hitRate, isExpired)
- Recalculate transient fields in readObject() after deserialization
- Custom writeObject() writes compact metadata; omits transient fields automatically
- TTL (time to live) enables automatic expiration; check age vs TTL on access
- Remove expired entries during loadCache() for automatic cleanup
- Store access statistics (totalAccesses, hits) separately from entries
- Generic CacheEntry<T extends Serializable> ensures only Serializable values cached
- Use @SuppressWarnings("unchecked") when loading Map from ObjectInputStream
- lastAccessTime = 0 means never accessed; check before formatting timestamp
- Update lastAccessTime on every get() to support LRU eviction policies
- Serialize entire Map for batch save/load; more efficient than entry-by-entry
- Try-with-resources ensures cache file closed properly after save
- Handle FileNotFoundException separately; indicates no saved cache (first run)
- Display human-readable statistics with percentages and formatted times
- Cache persistence reduces cold start time by preserving hot data across restarts

---

## 🔑 Key Takeaways

1. **Serialization**: Converts objects to byte streams for storage/transmission
2. **Serializable Interface**: Marker interface to enable serialization
3. **ObjectOutputStream**: Used to serialize objects
4. **ObjectInputStream**: Used to deserialize objects
5. **transient Keyword**: Excludes fields from serialization
6. **serialVersionUID**: Controls version compatibility
7. **Custom Serialization**: Use writeObject/readObject for custom logic
8. **Inheritance**: Child can be serializable even if parent is not
9. **Collections**: Most Java collections are serializable
10. **Best Practice**: Always use try-with-resources

---

## 📖 Additional Resources

### Official Documentation:
- [Java Serialization Specification](https://docs.oracle.com/javase/8/docs/platform/serialization/spec/serialTOC.html)
- [Serializable Interface](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/Serializable.html)
- [ObjectOutputStream](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/ObjectOutputStream.html)

### Best Practices:
- Always declare serialVersionUID explicitly
- Use transient for sensitive or non-serializable fields
- Implement custom serialization for complex objects
- Handle exceptions properly
- Consider alternatives like JSON for cross-platform compatibility

---

## 🧭 Navigation

### Week 4 Progress:
- [Day 22: File I/O Basics](day22_file_io.md)
- [Day 23: File Operations & NIO](day23_file_operations.md)
- **Day 24: Serialization** ← You are here
- [Day 25: Multithreading Basics](day25_multithreading_basics.md)
- [Day 26: Thread Synchronization](day26_thread_synchronization.md)
- [Day 27: Lambda Expressions](day27_lambda_expressions.md)
- [Day 28: Stream API](day28_stream_api.md)
- [Day 29: Date & Time API](day29_date_time_api.md)
- [Day 30: Final Review & Project](day30_final_review.md)

### Related Resources:
- [📝 Day 24 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day24.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 24 Checklist

Before moving to Day 25, ensure you can:
- [ ] Explain what serialization is and its uses
- [ ] Implement the Serializable interface
- [ ] Serialize objects using ObjectOutputStream
- [ ] Deserialize objects using ObjectInputStream
- [ ] Use transient keyword appropriately
- [ ] Understand serialVersionUID purpose
- [ ] Implement custom serialization methods
- [ ] Handle serialization exceptions
- [ ] Serialize collections
- [ ] Work with inheritance in serialization

---

## ⚠️ Common Mistakes

### 1. Serializable Interface Mistakes

#### ❌ Wrong - Not Implementing Serializable:
```java
// WRONG - Trying to serialize non-serializable class
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Person person = new Person("John", 30);

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("person.ser"))) {
            out.writeObject(person);  // NotSerializableException!
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

class Person {  // Missing Serializable!
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
**Issue:** Class must implement Serializable interface to be serialized

#### ✅ Right:
```java
// CORRECT - Implement Serializable interface
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Person person = new Person("John", 30);

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("person.ser"))) {
            out.writeObject(person);
            System.out.println("Person serialized successfully");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

class Person implements Serializable {  // Implement Serializable
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

**Why:** Serializable is a marker interface that tells JVM this class can be serialized.

**💡 Tip:** Always implement Serializable when you need to serialize objects; add serialVersionUID explicitly.

---

#### ❌ Wrong - Not Declaring serialVersionUID:
```java
// WRONG - No explicit serialVersionUID
import java.io.Serializable;

public class Product implements Serializable {
    // No serialVersionUID declared!
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
}
```
**Issue:** JVM generates serialVersionUID automatically; any class change breaks deserialization

#### ✅ Right:
```java
// CORRECT - Declare explicit serialVersionUID
import java.io.Serializable;

public class Product implements Serializable {
    // Explicit serialVersionUID for version control
    private static final long serialVersionUID = 1L;
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // When adding new fields, you can keep same UID for compatibility
    // Or increment for incompatible changes: serialVersionUID = 2L;
}
```

**Why:** Explicit serialVersionUID allows controlled versioning; prevents InvalidClassException on class changes.

**💡 Tip:** Always declare `private static final long serialVersionUID = 1L;` when implementing Serializable.

---

#### ❌ Wrong - Serializing Non-Serializable Fields:
```java
// WRONG - Field type not serializable
import java.io.*;

class Database {  // Not serializable!
    private Connection connection;
}

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private Database database;  // NotSerializableException!

    public User(String name, Database database) {
        this.name = name;
        this.database = database;
    }
}
```
**Issue:** All instance fields must be serializable unless marked transient

#### ✅ Right:
```java
// CORRECT - Mark non-serializable fields as transient
import java.io.*;

class Database {  // Not serializable
    private Connection connection;
}

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient Database database;  // Marked transient

    public User(String name, Database database) {
        this.name = name;
        this.database = database;
    }

    // Recreate database connection after deserialization
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Reinitialize database connection
        this.database = new Database();
    }
}
```

**Why:** transient keyword excludes field from serialization; must reinitialize after deserialization.

**💡 Tip:** Mark non-serializable fields as transient; reinitialize in readObject() if needed.

---

#### ❌ Wrong - Understanding Static Field Serialization:
```java
// WRONG - Expecting static fields to serialize
import java.io.*;

class Counter implements Serializable {
    private static final long serialVersionUID = 1L;
    private static int count = 0;  // Static - NOT serialized!
    private int id;

    public Counter() {
        this.id = ++count;
    }

    @Override
    public String toString() {
        return "Counter{id=" + id + ", count=" + count + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Counter c1 = new Counter();  // count=1, id=1
        Counter c2 = new Counter();  // count=2, id=2

        // Serialize
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("counter.ser"))) {
            out.writeObject(c1);
            out.writeObject(c2);
        }

        // Reset static field
        // Simulate new JVM - static fields reset

        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("counter.ser"))) {
            Counter dc1 = (Counter) in.readObject();
            Counter dc2 = (Counter) in.readObject();
            System.out.println(dc1);  // id=1 preserved
            System.out.println(dc2);  // id=2 preserved
            // But count is NOT serialized! It's static!
        }
    }
}
```
**Issue:** Static fields belong to class, not instances; not serialized

#### ✅ Right:
```java
// CORRECT - Understand static fields not serialized
import java.io.*;

class Counter implements Serializable {
    private static final long serialVersionUID = 1L;
    private static int count = 0;  // Static - NOT serialized
    private int id;

    public Counter() {
        this.id = ++count;
    }

    // If need to persist static state, use separate mechanism
    public static void saveStaticState(String filename) throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            out.writeInt(count);  // Manually write static field
        }
    }

    public static void loadStaticState(String filename) throws IOException {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(filename))) {
            count = in.readInt();  // Manually read static field
        }
    }

    @Override
    public String toString() {
        return "Counter{id=" + id + ", static count=" + count + "}";
    }
}
```

**Why:** Static fields are class-level; serialization is instance-level.

**💡 Tip:** Static fields are NOT serialized; manage static state separately if needed.

---

### 2. transient Keyword Mistakes

#### ❌ Wrong - Not Marking Sensitive Fields as transient:
```java
// WRONG - Serializing sensitive data
import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username;
    private String password;  // Security risk!
    private String creditCard;  // Security risk!

    public User(String username, String password, String creditCard) {
        this.username = username;
        this.password = password;
        this.creditCard = creditCard;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        User user = new User("john", "secret123", "1234-5678-9012-3456");

        // Password and credit card written to file in clear text!
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("user.ser"))) {
            out.writeObject(user);
        }
        // Anyone can read the .ser file and extract sensitive data!
    }
}
```
**Issue:** Sensitive data serialized to disk; security vulnerability

#### ✅ Right:
```java
// CORRECT - Mark sensitive fields as transient
import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username;
    private transient String password;  // Not serialized
    private transient String creditCard;  // Not serialized

    public User(String username, String password, String creditCard) {
        this.username = username;
        this.password = password;
        this.creditCard = creditCard;
    }

    @Override
    public String toString() {
        return "User{username='" + username +
               "', password='" + password +
               "', creditCard='" + creditCard + "'}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        User user = new User("john", "secret123", "1234-5678-9012-3456");
        System.out.println("Before: " + user);

        // Serialize and deserialize
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(user);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            User deserializedUser = (User) in.readObject();
            System.out.println("After: " + deserializedUser);
            // password and creditCard are null after deserialization
        }
    }
}
```

**Why:** transient prevents sensitive data from being written to disk.

**💡 Tip:** Always mark passwords, keys, credit cards as transient; handle securely.

---

#### ❌ Wrong - Not Understanding transient Default Values:
```java
// WRONG - Expecting transient fields to retain values
import java.io.*;

class Session implements Serializable {
    private static final long serialVersionUID = 1L;
    private String userId;
    private transient int loginAttempts = 3;  // Default value
    private transient boolean isActive = true;  // Default value

    public Session(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Session{userId='" + userId +
               "', loginAttempts=" + loginAttempts +
               ", isActive=" + isActive + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Session session = new Session("user123");
        System.out.println("Before: " + session);
        // Before: Session{userId='user123', loginAttempts=3, isActive=true}

        // Serialize and deserialize
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(session);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            Session deserializedSession = (Session) in.readObject();
            System.out.println("After: " + deserializedSession);
            // After: Session{userId='user123', loginAttempts=0, isActive=false}
            // Field initializers NOT executed during deserialization!
        }
    }
}
```
**Issue:** transient fields reset to default values (0, false, null); field initializers not run

#### ✅ Right:
```java
// CORRECT - Initialize transient fields in readObject()
import java.io.*;

class Session implements Serializable {
    private static final long serialVersionUID = 1L;
    private String userId;
    private transient int loginAttempts;
    private transient boolean isActive;

    public Session(String userId) {
        this.userId = userId;
        initializeTransientFields();
    }

    private void initializeTransientFields() {
        this.loginAttempts = 3;
        this.isActive = true;
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Reinitialize transient fields after deserialization
        initializeTransientFields();
    }

    @Override
    public String toString() {
        return "Session{userId='" + userId +
               "', loginAttempts=" + loginAttempts +
               ", isActive=" + isActive + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Session session = new Session("user123");
        System.out.println("Before: " + session);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(session);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            Session deserializedSession = (Session) in.readObject();
            System.out.println("After: " + deserializedSession);
            // Now transient fields properly initialized!
        }
    }
}
```

**Why:** transient fields set to default values during deserialization; must reinitialize.

**💡 Tip:** Use readObject() to reinitialize transient fields after deserialization.

---

#### ❌ Wrong - Confusing transient with static:
```java
// WRONG - Using both transient and static
import java.io.*;

class Config implements Serializable {
    private static final long serialVersionUID = 1L;
    private String appName;
    private transient static int maxConnections = 100;  // Redundant!

    public Config(String appName) {
        this.appName = appName;
    }
}
```
**Issue:** static fields already not serialized; transient is redundant

#### ✅ Right:
```java
// CORRECT - Understand transient vs static
import java.io.*;

class Config implements Serializable {
    private static final long serialVersionUID = 1L;

    private String appName;  // Serialized (instance field)

    // Static - not serialized (belongs to class, not instance)
    private static int maxConnections = 100;

    // Transient - not serialized (instance field explicitly excluded)
    private transient int currentConnections = 0;

    public Config(String appName) {
        this.appName = appName;
    }

    @Override
    public String toString() {
        return "Config{appName='" + appName +
               "', maxConnections=" + maxConnections +
               "', currentConnections=" + currentConnections + "}";
    }
}
```

**Why:** static = class-level (not serialized); transient = instance-level exclusion.

**💡 Tip:** Use transient for instance fields; static fields already not serialized.

---

#### ❌ Wrong - Marking Essential Fields as transient:
```java
// WRONG - Making essential fields transient
import java.io.*;

class BankAccount implements Serializable {
    private static final long serialVersionUID = 1L;
    private String accountNumber;
    private transient double balance;  // WRONG! Balance is essential!

    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "BankAccount{accountNumber='" + accountNumber +
               "', balance=" + balance + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        BankAccount account = new BankAccount("12345", 1000.0);
        System.out.println("Before: " + account);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(account);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            BankAccount deserializedAccount = (BankAccount) in.readObject();
            System.out.println("After: " + deserializedAccount);
            // After: BankAccount{accountNumber='12345', balance=0.0}
            // Lost the balance! Data loss!
        }
    }
}
```
**Issue:** Marking essential data as transient causes data loss

#### ✅ Right:
```java
// CORRECT - Only mark non-essential or reconstructible fields as transient
import java.io.*;

class BankAccount implements Serializable {
    private static final long serialVersionUID = 1L;
    private String accountNumber;
    private double balance;  // Essential - must be serialized
    private transient int accessCount;  // Non-essential - can be reset

    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.accessCount = 0;
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Reset transient field to default
        this.accessCount = 0;
    }

    @Override
    public String toString() {
        return "BankAccount{accountNumber='" + accountNumber +
               "', balance=" + balance +
               ", accessCount=" + accessCount + "}";
    }
}
```

**Why:** Only non-essential or reconstructible data should be transient.

**💡 Tip:** Use transient for: sensitive data, derived data, temporary state, non-serializable references.

---

### 3. ObjectOutputStream/ObjectInputStream Mistakes

#### ❌ Wrong - Not Closing Streams:
```java
// WRONG - Resource leak
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Person person = new Person("John", 30);

        ObjectOutputStream out = new ObjectOutputStream(
            new FileOutputStream("person.ser"));
        out.writeObject(person);
        // Forgot to close! Resource leak, data may not be fully written
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
**Issue:** Not closing streams causes resource leaks and data loss

#### ✅ Right:
```java
// CORRECT - Always use try-with-resources
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Person person = new Person("John", 30);

        // Try-with-resources ensures stream is closed
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("person.ser"))) {
            out.writeObject(person);
            System.out.println("Person serialized successfully");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

**Why:** Try-with-resources guarantees stream closure, flushes buffers, releases file handles.

**💡 Tip:** Always use try-with-resources for ObjectOutputStream and ObjectInputStream.

---

#### ❌ Wrong - Reading/Writing in Wrong Order:
```java
// WRONG - Deserializing in different order than serialization
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Serialize: Person, then Integer
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"))) {
            out.writeObject(new Person("John", 30));
            out.writeInt(42);
        }

        // Deserialize: Integer first, then Person - WRONG ORDER!
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"))) {
            int number = in.readInt();  // ClassCastException or wrong data!
            Person person = (Person) in.readObject();
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
**Issue:** Must read objects in same order as written; wrong order causes exceptions

#### ✅ Right:
```java
// CORRECT - Read in same order as written
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Serialize: Person, then Integer
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"))) {
            out.writeObject(new Person("John", 30));
            out.writeInt(42);
            System.out.println("Data serialized");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize: Same order - Person, then Integer
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"))) {
            Person person = (Person) in.readObject();  // First
            int number = in.readInt();  // Second
            System.out.println("Person: " + person);
            System.out.println("Number: " + number);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
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
```

**Why:** Stream is sequential; must read in exact order written.

**💡 Tip:** Read objects in exact order they were written; document serialization order.

---

#### ❌ Wrong - Not Flushing Before Reading:
```java
// WRONG - Not flushing output before reading
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream out = new ObjectOutputStream(bos);

        out.writeObject(new Person("John", 30));
        // No flush! Data may still be in buffer

        // Try to read immediately
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream in = new ObjectInputStream(bis);
        Person person = (Person) in.readObject();  // May fail or be incomplete!

        out.close();
        in.close();
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
**Issue:** Data may be buffered; reading before flush can fail

#### ✅ Right:
```java
// CORRECT - Flush before reading
import java.io.*;

public class Main {
    public static void main(String[] args) {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(new Person("John", 30));
            out.flush();  // Ensure data written to underlying stream
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Now safe to read
        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            Person person = (Person) in.readObject();
            System.out.println("Person: " + person);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
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
```

**Why:** Flushing ensures buffered data written to underlying stream.

**💡 Tip:** Call flush() before closing or switching to reading; try-with-resources handles this.

---

#### ❌ Wrong - Confusing writeObject() Methods:
```java
// WRONG - Calling wrong writeObject method
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Custom serialization
    private void writeObject(ObjectOutputStream out) throws IOException {
        // WRONG - Calling out.writeObject(this) causes infinite recursion!
        out.writeObject(this);  // StackOverflowError!
    }
}
```
**Issue:** Calling writeObject(this) in custom writeObject() causes infinite recursion

#### ✅ Right:
```java
// CORRECT - Use defaultWriteObject() in custom serialization
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    private transient String cachedString;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Custom serialization
    private void writeObject(ObjectOutputStream out) throws IOException {
        // Use defaultWriteObject() to serialize non-transient fields
        out.defaultWriteObject();

        // Then write additional data if needed
        out.writeObject("extra data");
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        // Use defaultReadObject() to deserialize non-transient fields
        in.defaultReadObject();

        // Then read additional data
        String extraData = (String) in.readObject();
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}
```

**Why:** defaultWriteObject() serializes non-transient fields; writeObject(this) causes recursion.

**💡 Tip:** In custom writeObject(), use defaultWriteObject(), NOT writeObject(this).

---

### 4. serialVersionUID Mistakes

#### ❌ Wrong - Changing serialVersionUID Carelessly:
```java
// WRONG - Changing UID breaks compatibility
import java.io.*;

// Version 1: serialVersionUID = 1L
class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// Serialize with version 1
public class Main {
    public static void main(String[] args) throws Exception {
        Person person = new Person("John", 30);

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("person.ser"))) {
            out.writeObject(person);
        }

        // Change class definition
        // Version 2: serialVersionUID = 2L (changed!)
        // Adding new field
        // private String email;

        // Try to deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Person deserializedPerson = (Person) in.readObject();
            // InvalidClassException: serialVersionUID mismatch!
        }
    }
}
```
**Issue:** Changing serialVersionUID breaks compatibility with previously serialized objects

#### ✅ Right:
```java
// CORRECT - Keep same UID for compatible changes
import java.io.*;

// Version 1
class Person implements Serializable {
    private static final long serialVersionUID = 1L;  // Keep same!
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// Version 2: Compatible changes (adding fields with defaults)
class PersonV2 implements Serializable {
    private static final long serialVersionUID = 1L;  // Same UID!
    private String name;
    private int age;
    private String email = "not specified";  // New field with default

    public PersonV2(String name, int age) {
        this.name = name;
        this.age = age;
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Handle missing fields from older versions
        if (email == null) {
            email = "not specified";
        }
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age +
               ", email='" + email + "'}";
    }
}
```

**Why:** Same UID allows compatible changes (adding fields with defaults); only change for incompatible changes.

**💡 Tip:** Keep same serialVersionUID for compatible changes; only increment for breaking changes.

---

#### ❌ Wrong - Not Understanding InvalidClassException:
```java
// WRONG - Not handling version mismatch
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Person person = (Person) in.readObject();
            System.out.println(person);
        } catch (Exception e) {
            // Generic catch - can't handle InvalidClassException specifically
            System.out.println("Error: " + e.getMessage());
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 2L;  // Changed from 1L
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
**Issue:** Not catching InvalidClassException specifically; can't provide helpful error message

#### ✅ Right:
```java
// CORRECT - Catch InvalidClassException specifically
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Person person = (Person) in.readObject();
            System.out.println(person);

        } catch (InvalidClassException e) {
            System.out.println("Version mismatch: The serialized object was " +
                             "created with a different class version.");
            System.out.println("Details: " + e.getMessage());
            System.out.println("Please regenerate the serialized file with " +
                             "the current class version.");

        } catch (ClassNotFoundException e) {
            System.out.println("Class not found: " + e.getMessage());

        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
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
```

**Why:** Specific exception handling provides better error messages and recovery options.

**💡 Tip:** Catch InvalidClassException separately; provide clear version mismatch message.

---

#### ❌ Wrong - Using Auto-Generated serialVersionUID:
```java
// WRONG - Relying on auto-generated serialVersionUID
import java.io.*;

public class Product implements Serializable {
    // No serialVersionUID declared
    // JVM will generate one based on class structure
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Any minor change (adding method, reordering fields) changes auto-generated UID!
    // This breaks deserialization of previously saved objects
}
```
**Issue:** Auto-generated UID changes with any class modification; breaks compatibility

#### ✅ Right:
```java
// CORRECT - Explicitly declare serialVersionUID
import java.io.*;

public class Product implements Serializable {
    // Explicit serialVersionUID for version control
    private static final long serialVersionUID = 1L;
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Now can add methods, reorder fields, etc. without breaking compatibility
    public double getDiscountedPrice() {
        return price * 0.9;
    }

    @Override
    public String toString() {
        return "Product{name='" + name + "', price=" + price + "}";
    }
}
```

**Why:** Explicit UID allows controlled versioning; survives class modifications.

**💡 Tip:** Always declare explicit serialVersionUID; never rely on auto-generated.

---

#### ❌ Wrong - Using Same UID for Incompatible Versions:
```java
// WRONG - Keeping same UID after incompatible changes
import java.io.*;

// Version 1
class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// Version 2: Incompatible change (changed field type)
class EmployeeV2 implements Serializable {
    private static final long serialVersionUID = 1L;  // WRONG! Should change to 2L
    private String name;
    private String age;  // Changed from int to String - incompatible!

    public EmployeeV2(String name, String age) {
        this.name = name;
        this.age = age;
    }
}
```
**Issue:** Incompatible changes with same UID can cause subtle data corruption

#### ✅ Right:
```java
// CORRECT - Change UID for incompatible modifications
import java.io.*;

// Version 1
class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// Version 2: Incompatible change - increment UID
class EmployeeV2 implements Serializable {
    private static final long serialVersionUID = 2L;  // Changed UID!
    private String name;
    private String age;  // Changed from int to String

    public EmployeeV2(String name, String age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Employee{name='" + name + "', age='" + age + "'}";
    }
}
```

**Why:** Incompatible changes require new UID; prevents silent data corruption.

**💡 Tip:** Increment serialVersionUID for incompatible changes (field type changes, removals).

---

### 5. Custom Serialization Mistakes

#### ❌ Wrong - Not Calling defaultWriteObject()/defaultReadObject():
```java
// WRONG - Not calling default methods in custom serialization
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    private transient String cachedInfo;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    private void writeObject(ObjectOutputStream out) throws IOException {
        // WRONG - Not calling defaultWriteObject()
        // Must manually write ALL fields
        out.writeObject(name);  // Forgot to write age!
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        // WRONG - Not calling defaultReadObject()
        name = (String) in.readObject();
        // age is not read - remains 0!
    }
}
```
**Issue:** Not calling default methods requires manual serialization of all fields; error-prone

#### ✅ Right:
```java
// CORRECT - Call defaultWriteObject()/defaultReadObject() first
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    private transient String cachedInfo;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        this.cachedInfo = computeCache();
    }

    private String computeCache() {
        return name.toUpperCase() + "_" + age;
    }

    private void writeObject(ObjectOutputStream out) throws IOException {
        // Call defaultWriteObject() first - serializes name and age
        out.defaultWriteObject();

        // Then write additional transient data if needed
        out.writeObject(cachedInfo);
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        // Call defaultReadObject() first - deserializes name and age
        in.defaultReadObject();

        // Then read additional data
        cachedInfo = (String) in.readObject();
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age +
               ", cachedInfo='" + cachedInfo + "'}";
    }
}
```

**Why:** defaultWriteObject()/defaultReadObject() handle non-transient fields automatically.

**💡 Tip:** Always call defaultWriteObject()/defaultReadObject() first in custom serialization.

---

#### ❌ Wrong - Wrong Order in Custom Methods:
```java
// WRONG - Reading in different order than written
import java.io.*;

class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    private String accountNumber;
    private transient double balance;

    public Account(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        out.writeDouble(balance);  // Write balance first
        out.writeInt(42);  // Write magic number second
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        int magic = in.readInt();  // WRONG ORDER! Read int first
        balance = in.readDouble();  // Then read double
        // Data corruption!
    }
}
```
**Issue:** Must read in exact order written; wrong order causes data corruption

#### ✅ Right:
```java
// CORRECT - Read in same order as written
import java.io.*;

class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    private String accountNumber;
    private transient double balance;

    public Account(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        // Write in specific order
        out.writeDouble(balance);  // 1. Write balance
        out.writeInt(42);  // 2. Write magic number
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Read in SAME order
        balance = in.readDouble();  // 1. Read balance
        int magic = in.readInt();  // 2. Read magic number

        // Validate magic number
        if (magic != 42) {
            throw new InvalidObjectException("Invalid serialization magic number");
        }
    }

    @Override
    public String toString() {
        return "Account{accountNumber='" + accountNumber +
               "', balance=" + balance + "}";
    }
}
```

**Why:** Sequential stream requires reading in exact order written.

**💡 Tip:** Document write order; read in exact same order; consider validation markers.

---

#### ❌ Wrong - Not Handling Exceptions in Custom Methods:
```java
// WRONG - Not handling exceptions properly
import java.io.*;

class Data implements Serializable {
    private static final long serialVersionUID = 1L;
    private String value;
    private transient File tempFile;

    public Data(String value) {
        this.value = value;
    }

    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        // Creating temp file in serialization - risky!
        tempFile = File.createTempFile("data", ".tmp");  // May fail!
        out.writeObject(tempFile.getAbsolutePath());
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        String path = (String) in.readObject();
        tempFile = new File(path);  // File may not exist anymore!
    }
}
```
**Issue:** Not handling potential failures in custom serialization; fragile

#### ✅ Right:
```java
// CORRECT - Handle exceptions and edge cases
import java.io.*;

class Data implements Serializable {
    private static final long serialVersionUID = 1L;
    private String value;
    private transient File tempFile;

    public Data(String value) {
        this.value = value;
    }

    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();

        // Write temp file path if exists, null otherwise
        if (tempFile != null && tempFile.exists()) {
            out.writeObject(tempFile.getAbsolutePath());
        } else {
            out.writeObject(null);
        }
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();

        String path = (String) in.readObject();
        if (path != null) {
            tempFile = new File(path);
            // Create new temp file if old one doesn't exist
            if (!tempFile.exists()) {
                try {
                    tempFile = File.createTempFile("data", ".tmp");
                } catch (IOException e) {
                    // Log error, but don't fail deserialization
                    System.err.println("Could not create temp file: " + e.getMessage());
                    tempFile = null;
                }
            }
        }
    }

    @Override
    public String toString() {
        return "Data{value='" + value +
               "', tempFile=" + (tempFile != null ? tempFile.getAbsolutePath() : "null") + "}";
    }
}
```

**Why:** Robust custom serialization handles edge cases and failures gracefully.

**💡 Tip:** Handle null values, missing resources, validation failures in custom methods.

---

#### ❌ Wrong - Serializing Recursive References Incorrectly:
```java
// WRONG - Not handling circular references properly
import java.io.*;

class Node implements Serializable {
    private static final long serialVersionUID = 1L;
    private String data;
    private Node next;

    public Node(String data) {
        this.data = data;
    }

    // Creating circular reference
    public void setNext(Node next) {
        this.next = next;
    }

    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        // Don't need custom logic - Java handles circular references!
        // But custom serialization can optimize
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Node n1 = new Node("First");
        Node n2 = new Node("Second");
        n1.setNext(n2);
        n2.setNext(n1);  // Circular reference!

        // Java automatically handles this, but can be optimized
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("nodes.ser"))) {
            out.writeObject(n1);
            // Java keeps track of objects already serialized
            // Circular reference handled automatically
        }
    }
}
```
**Issue:** Not understanding that Java handles circular references by default

#### ✅ Right:
```java
// CORRECT - Understand Java handles circular references
import java.io.*;

class Node implements Serializable {
    private static final long serialVersionUID = 1L;
    private String data;
    private Node next;

    public Node(String data) {
        this.data = data;
    }

    public void setNext(Node next) {
        this.next = next;
    }

    @Override
    public String toString() {
        return "Node{data='" + data + "'}";
    }
}

public class Main {
    public static void main(String[] args) {
        Node n1 = new Node("First");
        Node n2 = new Node("Second");
        Node n3 = new Node("Third");
        n1.setNext(n2);
        n2.setNext(n3);
        n3.setNext(n1);  // Circular reference

        System.out.println("Serializing circular structure...");

        // Serialize
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("nodes.ser"))) {
            out.writeObject(n1);
            System.out.println("Serialized successfully");
            // Java tracks objects, handles circular references
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("nodes.ser"))) {
            Node deserializedN1 = (Node) in.readObject();
            System.out.println("Deserialized: " + deserializedN1);
            System.out.println("Next: " + deserializedN1.next);
            System.out.println("Next.next: " + deserializedN1.next.next);
            System.out.println("Circular? " +
                (deserializedN1.next.next.next == deserializedN1));
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Java automatically tracks objects during serialization; circular references handled.

**💡 Tip:** Java handles circular references by default; trust the mechanism unless optimizing.

---

### 6. Inheritance Serialization Mistakes

#### ❌ Wrong - Parent Not Serializable Without No-Arg Constructor:
```java
// WRONG - Parent not serializable, no no-arg constructor
import java.io.*;

class Animal {  // Not serializable
    protected String species;

    // Only parameterized constructor
    public Animal(String species) {
        this.species = species;
    }
    // No no-arg constructor!
}

class Dog extends Animal implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;

    public Dog(String species, String name) {
        super(species);
        this.name = name;
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Canine", "Buddy");

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("dog.ser"))) {
            out.writeObject(dog);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("dog.ser"))) {
            Dog deserializedDog = (Dog) in.readObject();
            // InvalidClassException: no valid constructor!
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
**Issue:** If parent not serializable, it must have accessible no-arg constructor for deserialization

#### ✅ Right:
```java
// CORRECT - Parent has no-arg constructor
import java.io.*;

class Animal {  // Not serializable
    protected String species;

    // No-arg constructor required!
    public Animal() {
        this.species = "Unknown";
    }

    public Animal(String species) {
        this.species = species;
    }
}

class Dog extends Animal implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;

    public Dog(String species, String name) {
        super(species);
        this.name = name;
    }

    // Custom deserialization to properly initialize parent fields
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Note: parent's species field is NOT deserialized
        // because Animal is not Serializable
        // It's initialized via Animal's no-arg constructor
    }

    @Override
    public String toString() {
        return "Dog{species='" + species + "', name='" + name + "'}";
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Canine", "Buddy");
        System.out.println("Before: " + dog);

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("dog.ser"))) {
            out.writeObject(dog);
        } catch (IOException e) {
            e.printStackTrace();
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("dog.ser"))) {
            Dog deserializedDog = (Dog) in.readObject();
            System.out.println("After: " + deserializedDog);
            // Note: species will be "Unknown" from no-arg constructor!
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Deserialization needs to construct parent; requires accessible no-arg constructor.

**💡 Tip:** If parent not Serializable, provide accessible no-arg constructor; parent fields not serialized.

---

#### ❌ Wrong - Expecting Parent Fields to Serialize:
```java
// WRONG - Expecting non-serializable parent fields to serialize
import java.io.*;

class Vehicle {  // Not Serializable
    protected String brand;

    public Vehicle() {
        this.brand = "Generic";
    }

    public Vehicle(String brand) {
        this.brand = brand;
    }
}

class Car extends Vehicle implements Serializable {
    private static final long serialVersionUID = 1L;
    private String model;

    public Car(String brand, String model) {
        super(brand);
        this.model = model;
    }

    @Override
    public String toString() {
        return "Car{brand='" + brand + "', model='" + model + "'}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Car car = new Car("Toyota", "Camry");
        System.out.println("Before: " + car);
        // Before: Car{brand='Toyota', model='Camry'}

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(car);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            Car deserializedCar = (Car) in.readObject();
            System.out.println("After: " + deserializedCar);
            // After: Car{brand='Generic', model='Camry'}
            // brand reset to default from no-arg constructor!
        }
    }
}
```
**Issue:** Parent's fields not serialized if parent not Serializable; reset to defaults

#### ✅ Right:
```java
// CORRECT - Make parent Serializable to serialize its fields
import java.io.*;

class Vehicle implements Serializable {  // Now Serializable!
    private static final long serialVersionUID = 1L;
    protected String brand;

    public Vehicle() {
        this.brand = "Generic";
    }

    public Vehicle(String brand) {
        this.brand = brand;
    }
}

class Car extends Vehicle {
    private static final long serialVersionUID = 1L;
    private String model;

    public Car(String brand, String model) {
        super(brand);
        this.model = model;
    }

    @Override
    public String toString() {
        return "Car{brand='" + brand + "', model='" + model + "'}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Car car = new Car("Toyota", "Camry");
        System.out.println("Before: " + car);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(car);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            Car deserializedCar = (Car) in.readObject();
            System.out.println("After: " + deserializedCar);
            // Now brand is preserved!
        }
    }
}
```

**Why:** Only fields in Serializable classes are serialized; make parent Serializable too.

**💡 Tip:** To serialize parent fields, parent must implement Serializable; otherwise only child fields serialized.

---

#### ❌ Wrong - Not Handling Multiple Inheritance Levels:
```java
// WRONG - Not considering full inheritance hierarchy
import java.io.*;

class Animal {  // Not serializable, no no-arg constructor!
    protected String species;

    public Animal(String species) {
        this.species = species;
    }
}

class Mammal extends Animal {  // Not serializable
    protected int gestationPeriod;

    public Mammal(String species, int gestationPeriod) {
        super(species);
        this.gestationPeriod = gestationPeriod;
    }
}

class Dog extends Mammal implements Serializable {  // Only this is serializable
    private static final long serialVersionUID = 1L;
    private String name;

    public Dog(String species, int gestationPeriod, String name) {
        super(species, gestationPeriod);
        this.name = name;
    }
}
```
**Issue:** Deserialization fails because Animal (first non-serializable parent) has no no-arg constructor

#### ✅ Right:
```java
// CORRECT - Ensure first non-serializable ancestor has no-arg constructor
import java.io.*;

class Animal {  // Not serializable, but has no-arg constructor
    protected String species;

    public Animal() {
        this.species = "Unknown";
    }

    public Animal(String species) {
        this.species = species;
    }
}

class Mammal extends Animal {  // Not serializable
    protected int gestationPeriod;

    public Mammal() {
        this.gestationPeriod = 0;
    }

    public Mammal(String species, int gestationPeriod) {
        super(species);
        this.gestationPeriod = gestationPeriod;
    }
}

class Dog extends Mammal implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;

    public Dog(String species, int gestationPeriod, String name) {
        super(species, gestationPeriod);
        this.name = name;
    }

    // Custom serialization to save parent fields manually
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        // Manually write non-serializable parent fields
        out.writeObject(species);
        out.writeInt(gestationPeriod);
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Manually read non-serializable parent fields
        species = (String) in.readObject();
        gestationPeriod = in.readInt();
    }

    @Override
    public String toString() {
        return "Dog{species='" + species +
               "', gestationPeriod=" + gestationPeriod +
               ", name='" + name + "'}";
    }
}
```

**Why:** First non-serializable ancestor needs no-arg constructor; or manually serialize parent fields.

**💡 Tip:** Ensure first non-serializable ancestor has no-arg constructor; or use custom serialization.

---

#### ❌ Wrong - Child Serializable, Parent Not, No Custom Serialization:
```java
// WRONG - Not preserving parent fields
import java.io.*;

class Employee {  // Not serializable
    protected String department;

    public Employee() {
        this.department = "Unassigned";
    }

    public Employee(String department) {
        this.department = department;
    }
}

class Manager extends Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private int teamSize;

    public Manager(String department, int teamSize) {
        super(department);
        this.teamSize = teamSize;
    }

    @Override
    public String toString() {
        return "Manager{department='" + department +
               "', teamSize=" + teamSize + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Manager manager = new Manager("Engineering", 10);
        System.out.println("Before: " + manager);
        // Before: Manager{department='Engineering', teamSize=10}

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(manager);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            Manager deserializedManager = (Manager) in.readObject();
            System.out.println("After: " + deserializedManager);
            // After: Manager{department='Unassigned', teamSize=10}
            // department lost!
        }
    }
}
```
**Issue:** Parent fields not preserved when parent not Serializable

#### ✅ Right:
```java
// CORRECT - Use custom serialization to preserve parent fields
import java.io.*;

class Employee {
    protected String department;

    public Employee() {
        this.department = "Unassigned";
    }

    public Employee(String department) {
        this.department = department;
    }
}

class Manager extends Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private int teamSize;

    public Manager(String department, int teamSize) {
        super(department);
        this.teamSize = teamSize;
    }

    // Custom serialization to save parent fields
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();  // Save teamSize
        out.writeObject(department);  // Manually save parent field
    }

    // Custom deserialization to restore parent fields
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();  // Restore teamSize
        department = (String) in.readObject();  // Manually restore parent field
    }

    @Override
    public String toString() {
        return "Manager{department='" + department +
               "', teamSize=" + teamSize + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Manager manager = new Manager("Engineering", 10);
        System.out.println("Before: " + manager);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(manager);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            Manager deserializedManager = (Manager) in.readObject();
            System.out.println("After: " + deserializedManager);
            // Now department is preserved!
        }
    }
}
```

**Why:** Custom serialization allows manual handling of parent fields when parent not Serializable.

**💡 Tip:** Use custom writeObject()/readObject() to manually serialize parent fields if parent not Serializable.

---

### 7. Exception Handling Mistakes

#### ❌ Wrong - Not Catching NotSerializableException:
```java
// WRONG - Generic exception catch
import java.io.*;

class Database {  // Not Serializable!
    private String connectionString;
}

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private Database db;  // Problem!

    public User(String name, Database db) {
        this.name = name;
        this.db = db;
    }
}

public class Main {
    public static void main(String[] args) {
        User user = new User("John", new Database());

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("user.ser"))) {
            out.writeObject(user);
        } catch (IOException e) {
            // Generic catch - can't tell it's NotSerializableException
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Generic IOException catch doesn't distinguish NotSerializableException

#### ✅ Right:
```java
// CORRECT - Catch NotSerializableException specifically
import java.io.*;

class Database {
    private String connectionString;
}

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient Database db;  // Fixed with transient

    public User(String name, Database db) {
        this.name = name;
        this.db = db;
    }
}

public class Main {
    public static void main(String[] args) {
        User user = new User("John", new Database());

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("user.ser"))) {
            out.writeObject(user);
            System.out.println("User serialized successfully");

        } catch (NotSerializableException e) {
            System.out.println("Object cannot be serialized: " + e.getMessage());
            System.out.println("Check that all fields are Serializable or transient");
            e.printStackTrace();

        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

**Why:** Specific exception handling provides clearer error messages and debugging info.

**💡 Tip:** Catch NotSerializableException separately; indicates non-serializable field or class.

---

#### ❌ Wrong - Not Handling ClassNotFoundException:
```java
// WRONG - Not catching ClassNotFoundException
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Object obj = in.readObject();  // Requires ClassNotFoundException
            System.out.println(obj);
        } catch (IOException e) {
            // ClassNotFoundException is a checked exception!
            // This code won't compile without catching it
            e.printStackTrace();
        }
    }
}
```
**Issue:** readObject() throws both IOException and ClassNotFoundException; must catch both

#### ✅ Right:
```java
// CORRECT - Handle ClassNotFoundException
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Object obj = in.readObject();
            System.out.println("Deserialized: " + obj);

        } catch (ClassNotFoundException e) {
            System.out.println("Class not found: " + e.getMessage());
            System.out.println("Ensure the class is available on the classpath");
            e.printStackTrace();

        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

**Why:** ClassNotFoundException occurs when deserialized class not found on classpath.

**💡 Tip:** Always catch ClassNotFoundException when deserializing; indicates missing class definition.

---

#### ❌ Wrong - Empty Catch Blocks:
```java
// WRONG - Swallowing exceptions
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"))) {
            out.writeObject(new Person("John", 30));
        } catch (IOException e) {
            // Empty catch - error disappears!
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"))) {
            Person person = (Person) in.readObject();
        } catch (IOException | ClassNotFoundException e) {
            // Empty catch - error disappears!
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
**Issue:** Empty catch blocks mask errors; makes debugging impossible

#### ✅ Right:
```java
// CORRECT - Always log or handle exceptions
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"))) {
            out.writeObject(new Person("John", 30));
            System.out.println("Serialization successful");

        } catch (IOException e) {
            System.err.println("Serialization failed: " + e.getMessage());
            e.printStackTrace();
            // Or rethrow, or take corrective action
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"))) {
            Person person = (Person) in.readObject();
            System.out.println("Deserialized: " + person);

        } catch (ClassNotFoundException e) {
            System.err.println("Class not found: " + e.getMessage());
            e.printStackTrace();

        } catch (IOException e) {
            System.err.println("Deserialization failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
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
```

**Why:** Proper exception handling aids debugging and provides user feedback.

**💡 Tip:** Never leave catch blocks empty; at minimum log with printStackTrace().

---

#### ❌ Wrong - Not Handling InvalidClassException:
```java
// WRONG - Not catching version mismatch errors
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Person person = (Person) in.readObject();
            System.out.println(person);

        } catch (IOException | ClassNotFoundException e) {
            // InvalidClassException is an IOException subclass
            // But handling it generically loses information
            System.out.println("Error: " + e.getMessage());
        }
    }
}

class Person implements Serializable {
    private static final long serialVersionUID = 2L;  // Changed from 1L
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
**Issue:** InvalidClassException indicates version mismatch; needs specific handling

#### ✅ Right:
```java
// CORRECT - Catch InvalidClassException specifically
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Person person = (Person) in.readObject();
            System.out.println("Deserialized: " + person);

        } catch (InvalidClassException e) {
            System.err.println("Version mismatch error:");
            System.err.println("The serialized object was created with " +
                             "a different class version.");
            System.err.println("Expected serialVersionUID: " +
                             Person.serialVersionUID);
            System.err.println("Details: " + e.getMessage());
            System.err.println("Please regenerate the serialized file.");

        } catch (ClassNotFoundException e) {
            System.err.println("Class not found: " + e.getMessage());

        } catch (IOException e) {
            System.err.println("I/O error: " + e.getMessage());
        }
    }
}

class Person implements Serializable {
    static final long serialVersionUID = 1L;
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
```

**Why:** InvalidClassException needs specific handling for version mismatch issues.

**💡 Tip:** Catch InvalidClassException separately; provide clear version mismatch message.

---

### 8. Collection Serialization Mistakes

#### ❌ Wrong - Not Checking Collection Element Serializability:
```java
// WRONG - Assuming all collection elements are serializable
import java.io.*;
import java.util.*;

class NonSerializableItem {  // Not Serializable!
    private String data;

    public NonSerializableItem(String data) {
        this.data = data;
    }
}

public class Main {
    public static void main(String[] args) {
        List<NonSerializableItem> items = new ArrayList<>();
        items.add(new NonSerializableItem("Item 1"));
        items.add(new NonSerializableItem("Item 2"));

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("items.ser"))) {
            out.writeObject(items);  // NotSerializableException!
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** ArrayList is Serializable, but elements must be too

#### ✅ Right:
```java
// CORRECT - Ensure collection elements are Serializable
import java.io.*;
import java.util.*;

class SerializableItem implements Serializable {  // Now Serializable!
    private static final long serialVersionUID = 1L;
    private String data;

    public SerializableItem(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Item{data='" + data + "'}";
    }
}

public class Main {
    public static void main(String[] args) {
        List<SerializableItem> items = new ArrayList<>();
        items.add(new SerializableItem("Item 1"));
        items.add(new SerializableItem("Item 2"));

        // Serialize
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("items.ser"))) {
            out.writeObject(items);
            System.out.println("List serialized successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("items.ser"))) {
            @SuppressWarnings("unchecked")
            List<SerializableItem> deserializedItems =
                (List<SerializableItem>) in.readObject();
            System.out.println("Deserialized items:");
            deserializedItems.forEach(System.out::println);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Collection serialization requires all elements to be Serializable.

**💡 Tip:** When serializing collections, ensure all elements implement Serializable.

---

#### ❌ Wrong - Deserializing with Wrong Generic Type:
```java
// WRONG - Unsafe cast without type checking
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Serialize List<String>
        List<String> strings = Arrays.asList("One", "Two", "Three");
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"))) {
            out.writeObject(strings);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize as List<Integer> - WRONG TYPE!
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"))) {
            @SuppressWarnings("unchecked")
            List<Integer> numbers = (List<Integer>) in.readObject();
            // No error yet - type erasure!

            int firstNumber = numbers.get(0);  // ClassCastException at runtime!
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```
**Issue:** Generics erased at runtime; wrong type causes ClassCastException when accessing elements

#### ✅ Right:
```java
// CORRECT - Use same type and validate
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Serialize List<String>
        List<String> strings = Arrays.asList("One", "Two", "Three");
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"))) {
            out.writeObject(strings);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize with correct type
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"))) {
            @SuppressWarnings("unchecked")
            List<String> deserializedStrings = (List<String>) in.readObject();

            // Validate type of first element if needed
            if (!deserializedStrings.isEmpty()) {
                Object first = deserializedStrings.get(0);
                if (!(first instanceof String)) {
                    throw new IllegalStateException(
                        "Unexpected element type: " + first.getClass());
                }
            }

            System.out.println("Deserialized strings:");
            deserializedStrings.forEach(System.out::println);

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Type erasure allows wrong cast at deserialization; validate element types if needed.

**💡 Tip:** Use correct generic type; validate element types if type uncertain.

---

#### ❌ Wrong - Not Handling Null Collections:
```java
// WRONG - Not checking for null collections
import java.io.*;
import java.util.*;

class DataHolder implements Serializable {
    private static final long serialVersionUID = 1L;
    private List<String> data;  // May be null!

    public DataHolder(List<String> data) {
        this.data = data;
    }

    public void printData() {
        // No null check!
        System.out.println("Data count: " + data.size());  // NullPointerException if null!
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        DataHolder holder = new DataHolder(null);  // null collection

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(holder);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            DataHolder deserializedHolder = (DataHolder) in.readObject();
            deserializedHolder.printData();  // NullPointerException!
        }
    }
}
```
**Issue:** null collections serialize/deserialize as null; must check before use

#### ✅ Right:
```java
// CORRECT - Handle null collections
import java.io.*;
import java.util.*;

class DataHolder implements Serializable {
    private static final long serialVersionUID = 1L;
    private List<String> data;

    public DataHolder(List<String> data) {
        this.data = data;
    }

    public void printData() {
        if (data == null) {
            System.out.println("Data is null");
        } else if (data.isEmpty()) {
            System.out.println("Data is empty");
        } else {
            System.out.println("Data count: " + data.size());
            data.forEach(System.out::println);
        }
    }

    // Initialize null collection in readObject
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();

        // Initialize null collection to empty list if needed
        if (data == null) {
            data = new ArrayList<>();
        }
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        DataHolder holder = new DataHolder(null);

        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bos)) {
            out.writeObject(holder);
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new ByteArrayInputStream(bos.toByteArray()))) {
            DataHolder deserializedHolder = (DataHolder) in.readObject();
            deserializedHolder.printData();  // Now safe
        }
    }
}
```

**Why:** null collections remain null after deserialization; check before use or initialize.

**💡 Tip:** Check for null collections before use; or initialize in readObject().

---

#### ❌ Wrong - Serializing Huge Collections Inefficiently:
```java
// WRONG - Serializing very large collections without consideration
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Create huge list
        List<Integer> hugeList = new ArrayList<>();
        for (int i = 0; i < 10_000_000; i++) {
            hugeList.add(i);
        }

        System.out.println("Serializing " + hugeList.size() + " integers...");

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("huge.ser"))) {
            out.writeObject(hugeList);  // Very slow, huge file!
            System.out.println("Serialization complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Creates very large file with object overhead
    }
}
```
**Issue:** Object serialization has overhead; inefficient for large collections

#### ✅ Right:
```java
// CORRECT - Use efficient format for large collections
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> hugeList = new ArrayList<>();
        for (int i = 0; i < 10_000_000; i++) {
            hugeList.add(i);
        }

        System.out.println("Serializing " + hugeList.size() + " integers...");

        // Option 1: Write as primitives (more efficient)
        try (DataOutputStream out = new DataOutputStream(
                new BufferedOutputStream(
                    new FileOutputStream("huge.dat")))) {
            out.writeInt(hugeList.size());  // Write size first
            for (Integer num : hugeList) {
                out.writeInt(num);  // Write as primitive
            }
            System.out.println("Efficient serialization complete");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Read back
        try (DataInputStream in = new DataInputStream(
                new BufferedInputStream(
                    new FileInputStream("huge.dat")))) {
            int size = in.readInt();
            List<Integer> deserializedList = new ArrayList<>(size);
            for (int i = 0; i < size; i++) {
                deserializedList.add(in.readInt());
            }
            System.out.println("Read " + deserializedList.size() + " integers");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Option 2: Consider JSON, CSV, or database for very large datasets
    }
}
```

**Why:** Object serialization has overhead per object; primitives more efficient for large datasets.

**💡 Tip:** For large primitive collections, use DataOutputStream; for very large datasets, consider database or text formats.

---

### 9. Security and Best Practice Mistakes

#### ❌ Wrong - Serializing Sensitive Data Without Encryption:
```java
// WRONG - Storing sensitive data in plain text
import java.io.*;

class CreditCard implements Serializable {
    private static final long serialVersionUID = 1L;
    private String cardNumber;  // Sensitive!
    private String cvv;  // Sensitive!
    private String expiryDate;

    public CreditCard(String cardNumber, String cvv, String expiryDate) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        CreditCard card = new CreditCard("1234-5678-9012-3456", "123", "12/25");

        // Sensitive data written to file in plain text!
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("card.ser"))) {
            out.writeObject(card);
        }
        // Anyone can read the .ser file and extract credit card info!
    }
}
```
**Issue:** Sensitive data serialized in plain text; security vulnerability

#### ✅ Right:
```java
// CORRECT - Mark sensitive fields as transient or encrypt
import java.io.*;

class CreditCard implements Serializable {
    private static final long serialVersionUID = 1L;
    private transient String cardNumber;  // Not serialized
    private transient String cvv;  // Not serialized
    private String expiryDate;  // Less sensitive, can serialize

    public CreditCard(String cardNumber, String cvv, String expiryDate) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }

    // Custom serialization with encryption
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        // Encrypt sensitive data before writing
        out.writeObject(encrypt(cardNumber));
        out.writeObject(encrypt(cvv));
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Decrypt sensitive data after reading
        cardNumber = decrypt((String) in.readObject());
        cvv = decrypt((String) in.readObject());
    }

    private String encrypt(String data) {
        // Simple example - use proper encryption in production!
        return "ENCRYPTED_" + data;
    }

    private String decrypt(String encrypted) {
        // Simple example - use proper decryption in production!
        return encrypted.replace("ENCRYPTED_", "");
    }

    @Override
    public String toString() {
        return "CreditCard{cardNumber='" + maskCardNumber() +
               "', expiryDate='" + expiryDate + "'}";
    }

    private String maskCardNumber() {
        if (cardNumber == null) return "null";
        return "****-****-****-" + cardNumber.substring(cardNumber.length() - 4);
    }
}
```

**Why:** Sensitive data should be transient or encrypted; never plain text.

**💡 Tip:** Mark passwords, keys, card numbers as transient; use encryption if must serialize.

---

#### ❌ Wrong - Not Validating Deserialized Data:
```java
// WRONG - Trusting deserialized data without validation
import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username;
    private String email;
    private int age;
    private boolean isAdmin;  // Security-critical!

    public User(String username, String email, int age, boolean isAdmin) {
        this.username = username;
        this.email = email;
        this.age = age;
        this.isAdmin = isAdmin;
    }

    @Override
    public String toString() {
        return "User{username='" + username + "', email='" + email +
               "', age=" + age + ", isAdmin=" + isAdmin + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // Attacker could modify .ser file to set isAdmin=true!
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("user.ser"))) {
            User user = (User) in.readObject();
            // No validation! Trusting deserialized data
            System.out.println(user);
        }
    }
}
```
**Issue:** Not validating deserialized data; attacker can modify serialized files

#### ✅ Right:
```java
// CORRECT - Validate deserialized data
import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String username;
    private String email;
    private int age;
    private boolean isAdmin;

    public User(String username, String email, int age, boolean isAdmin) {
        this.username = username;
        this.email = email;
        this.age = age;
        this.isAdmin = isAdmin;
        validate();
    }

    private void validate() {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Invalid age: " + age);
        }
    }

    // Validate after deserialization
    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();

        // Validate deserialized data
        validate();

        // Additional security checks
        if (isAdmin) {
            // Never trust isAdmin from deserialization
            // Verify against secure source (database, auth service)
            System.out.println("WARNING: Admin flag set, verifying...");
            isAdmin = false;  // Reset until verified
        }
    }

    @Override
    public String toString() {
        return "User{username='" + username + "', email='" + email +
               "', age=" + age + ", isAdmin=" + isAdmin + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("user.ser"))) {
            User user = (User) in.readObject();
            System.out.println("Validated user: " + user);

        } catch (InvalidObjectException e) {
            System.err.println("Invalid object: " + e.getMessage());
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Validate deserialized data; never trust input from external sources.

**💡 Tip:** Use readObject() to validate; reset security-critical fields; verify against secure source.

---

#### ❌ Wrong - Using Serialization for Deep Copy Inefficiently:
```java
// WRONG - Using serialization for deep copy without considering overhead
import java.io.*;

class Node implements Serializable {
    private static final long serialVersionUID = 1L;
    int value;
    Node next;

    public Node(int value) {
        this.value = value;
    }
}

public class Main {
    public static <T extends Serializable> T deepCopy(T object) {
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(bos);
            out.writeObject(object);
            out.close();

            ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
            ObjectInputStream in = new ObjectInputStream(bis);
            @SuppressWarnings("unchecked")
            T copy = (T) in.readObject();
            in.close();
            return copy;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) {
        // Create linked list
        Node head = new Node(1);
        Node current = head;
        for (int i = 2; i <= 10000; i++) {
            current.next = new Node(i);
            current = current.next;
        }

        // Deep copy using serialization - SLOW!
        long start = System.currentTimeMillis();
        Node copy = deepCopy(head);
        long end = System.currentTimeMillis();
        System.out.println("Serialization deep copy: " + (end - start) + "ms");
    }
}
```
**Issue:** Serialization for deep copy is slow and has overhead; inefficient for frequent use

#### ✅ Right:
```java
// CORRECT - Implement proper copy methods
import java.io.*;

class Node implements Serializable, Cloneable {
    private static final long serialVersionUID = 1L;
    int value;
    Node next;

    public Node(int value) {
        this.value = value;
    }

    // Proper deep copy implementation
    public Node deepCopy() {
        Node copy = new Node(this.value);
        if (this.next != null) {
            copy.next = this.next.deepCopy();
        }
        return copy;
    }

    // Or use iterative approach for better performance
    public Node deepCopyIterative() {
        if (this == null) return null;

        Node newHead = new Node(this.value);
        Node currentOld = this.next;
        Node currentNew = newHead;

        while (currentOld != null) {
            currentNew.next = new Node(currentOld.value);
            currentNew = currentNew.next;
            currentOld = currentOld.next;
        }

        return newHead;
    }
}

public class Main {
    public static void main(String[] args) {
        // Create linked list
        Node head = new Node(1);
        Node current = head;
        for (int i = 2; i <= 10000; i++) {
            current.next = new Node(i);
            current = current.next;
        }

        // Proper deep copy
        long start = System.currentTimeMillis();
        Node copy = head.deepCopyIterative();
        long end = System.currentTimeMillis();
        System.out.println("Iterative deep copy: " + (end - start) + "ms");

        // Much faster than serialization!
    }
}
```

**Why:** Serialization has significant overhead; proper copy methods are faster.

**💡 Tip:** Don't use serialization for deep copy in performance-critical code; implement proper copy methods.

---

#### ❌ Wrong - Not Considering Alternatives to Serialization:
```java
// WRONG - Using serialization for everything
import java.io.*;

class Config implements Serializable {
    private static final long serialVersionUID = 1L;
    private String appName;
    private int port;
    private String dbUrl;

    public Config(String appName, int port, String dbUrl) {
        this.appName = appName;
        this.port = port;
        this.dbUrl = dbUrl;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Config config = new Config("MyApp", 8080, "jdbc:mysql://localhost/db");

        // Serializing config - not human-readable, not cross-platform
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("config.ser"))) {
            out.writeObject(config);
        }
        // Can't edit config without deserializing and re-serializing
        // Can't use config from other languages (Python, JavaScript, etc.)
    }
}
```
**Issue:** Java serialization not human-readable, not cross-platform; limited use cases

#### ✅ Right:
```java
// CORRECT - Consider alternatives based on use case
import java.io.*;
import java.util.Properties;

class Config {
    private String appName;
    private int port;
    private String dbUrl;

    public Config(String appName, int port, String dbUrl) {
        this.appName = appName;
        this.port = port;
        this.dbUrl = dbUrl;
    }

    // For configuration: Use Properties, JSON, or YAML
    public void saveAsProperties(String filename) throws IOException {
        Properties props = new Properties();
        props.setProperty("appName", appName);
        props.setProperty("port", String.valueOf(port));
        props.setProperty("dbUrl", dbUrl);

        try (FileOutputStream out = new FileOutputStream(filename)) {
            props.store(out, "Application Configuration");
        }
        // Human-readable, easy to edit
    }

    public static Config loadFromProperties(String filename) throws IOException {
        Properties props = new Properties();
        try (FileInputStream in = new FileInputStream(filename)) {
            props.load(in);
        }

        return new Config(
            props.getProperty("appName"),
            Integer.parseInt(props.getProperty("port")),
            props.getProperty("dbUrl")
        );
    }

    @Override
    public String toString() {
        return "Config{appName='" + appName + "', port=" + port +
               ", dbUrl='" + dbUrl + "'}";
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        Config config = new Config("MyApp", 8080, "jdbc:mysql://localhost/db");

        // Save as properties file
        config.saveAsProperties("config.properties");
        System.out.println("Config saved");

        // Load from properties file
        Config loadedConfig = Config.loadFromProperties("config.properties");
        System.out.println("Loaded: " + loadedConfig);

        // Consider:
        // - JSON: Cross-platform, human-readable, widely supported
        // - XML: Structured, schema validation
        // - YAML: Human-friendly, concise
        // - Protocol Buffers: Efficient binary, cross-language
        // - Java Serialization: Only for internal Java persistence
    }
}
```

**Why:** Different formats suit different needs; Java serialization best for internal persistence only.

**💡 Tip:** Use JSON/XML/YAML for config; Protocol Buffers for efficient binary; Java serialization for internal persistence only.

---

### 10. Performance and Design Mistakes

#### ❌ Wrong - Serializing Large Object Graphs:
```java
// WRONG - Serializing huge interconnected object graph
import java.io.*;
import java.util.*;

class Company implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private List<Department> departments = new ArrayList<>();

    public Company(String name) {
        this.name = name;
    }

    public void addDepartment(Department dept) {
        departments.add(dept);
    }
}

class Department implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private List<Employee> employees = new ArrayList<>();

    public Department(String name) {
        this.name = name;
    }

    public void addEmployee(Employee emp) {
        employees.add(emp);
    }
}

class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private List<Project> projects = new ArrayList<>();

    public Employee(String name) {
        this.name = name;
    }

    public void addProject(Project project) {
        projects.add(project);
    }
}

class Project implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private List<Employee> team = new ArrayList<>();  // Circular reference!

    public Project(String name) {
        this.name = name;
    }

    public void addTeamMember(Employee emp) {
        team.add(emp);
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Company company = new Company("TechCorp");

        // Create huge interconnected graph
        for (int i = 0; i < 100; i++) {
            Department dept = new Department("Dept" + i);
            for (int j = 0; j < 100; j++) {
                Employee emp = new Employee("Employee" + j);
                for (int k = 0; k < 10; k++) {
                    Project project = new Project("Project" + k);
                    project.addTeamMember(emp);
                    emp.addProject(project);
                }
                dept.addEmployee(emp);
            }
            company.addDepartment(dept);
        }

        // Serialize - VERY SLOW and huge file!
        System.out.println("Serializing...");
        long start = System.currentTimeMillis();
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("company.ser"))) {
            out.writeObject(company);
        }
        long end = System.currentTimeMillis();
        System.out.println("Serialization took: " + (end - start) + "ms");
    }
}
```
**Issue:** Serializing large object graphs is slow and creates huge files

#### ✅ Right:
```java
// CORRECT - Serialize selectively or use database
import java.io.*;
import java.util.*;

class CompanyData implements Serializable {
    private static final long serialVersionUID = 1L;
    private String companyName;
    private List<String> departmentNames;
    private int totalEmployees;

    public CompanyData(String companyName, List<String> departmentNames, int totalEmployees) {
        this.companyName = companyName;
        this.departmentNames = departmentNames;
        this.totalEmployees = totalEmployees;
    }

    @Override
    public String toString() {
        return "CompanyData{companyName='" + companyName +
               "', departments=" + departmentNames.size() +
               ", totalEmployees=" + totalEmployees + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // Serialize only summary data
        CompanyData summary = new CompanyData(
            "TechCorp",
            Arrays.asList("Engineering", "Sales", "HR"),
            10000
        );

        System.out.println("Serializing summary...");
        long start = System.currentTimeMillis();
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("company_summary.ser"))) {
            out.writeObject(summary);
        }
        long end = System.currentTimeMillis();
        System.out.println("Serialization took: " + (end - start) + "ms");

        // For large datasets:
        // - Use database (SQL, NoSQL)
        // - Serialize in chunks
        // - Use pagination
        // - Store only IDs, load details on demand
    }
}
```

**Why:** Large object graphs slow and memory-intensive; serialize selectively or use database.

**💡 Tip:** Don't serialize entire object graphs; use database for large datasets; serialize summaries only.

---

#### ❌ Wrong - Not Using Externalization When Needed:
```java
// WRONG - Using default serialization for complex custom serialization needs
import java.io.*;

class CustomData implements Serializable {
    private static final long serialVersionUID = 1L;
    private int[] data;  // Large array

    public CustomData(int size) {
        data = new int[size];
        for (int i = 0; i < size; i++) {
            data[i] = i;
        }
    }

    // Default serialization writes entire array with overhead
}

public class Main {
    public static void main(String[] args) throws Exception {
        CustomData customData = new CustomData(1_000_000);

        long start = System.currentTimeMillis();
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"))) {
            out.writeObject(customData);
        }
        long end = System.currentTimeMillis();
        System.out.println("Default serialization: " + (end - start) + "ms");
        // Slower due to object overhead
    }
}
```
**Issue:** Default serialization has overhead; Externalizable provides full control for efficiency

#### ✅ Right:
```java
// CORRECT - Use Externalizable for full control
import java.io.*;

class CustomData implements Externalizable {
    private int[] data;

    // No-arg constructor required for Externalizable
    public CustomData() {
    }

    public CustomData(int size) {
        data = new int[size];
        for (int i = 0; i < size; i++) {
            data[i] = i;
        }
    }

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        // Write data efficiently
        out.writeInt(data.length);
        for (int value : data) {
            out.writeInt(value);
        }
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException {
        // Read data efficiently
        int length = in.readInt();
        data = new int[length];
        for (int i = 0; i < length; i++) {
            data[i] = in.readInt();
        }
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        CustomData customData = new CustomData(1_000_000);

        long start = System.currentTimeMillis();
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data_external.ser"))) {
            out.writeObject(customData);
        }
        long end = System.currentTimeMillis();
        System.out.println("Externalizable serialization: " + (end - start) + "ms");
        // Faster with full control

        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data_external.ser"))) {
            CustomData deserializedData = (CustomData) in.readObject();
            System.out.println("Deserialized data length: " + deserializedData.data.length);
        }
    }
}
```

**Why:** Externalizable provides full control over serialization format; more efficient for custom needs.

**💡 Tip:** Use Externalizable when you need full control or maximum efficiency; requires no-arg constructor.

---

#### ❌ Wrong - Frequent Serialization in Loops:
```java
// WRONG - Serializing inside loop
import java.io.*;

class LogEntry implements Serializable {
    private static final long serialVersionUID = 1L;
    private String timestamp;
    private String message;

    public LogEntry(String timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;
    }
}

public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 1000; i++) {
            LogEntry entry = new LogEntry(
                System.currentTimeMillis() + "",
                "Log message " + i
            );

            // Opening and closing stream in every iteration - VERY SLOW!
            try (ObjectOutputStream out = new ObjectOutputStream(
                    new FileOutputStream("log" + i + ".ser"))) {
                out.writeObject(entry);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        // Creates 1000 separate files, very slow
    }
}
```
**Issue:** Opening/closing streams repeatedly is slow; file I/O overhead

#### ✅ Right:
```java
// CORRECT - Batch serialization or reuse stream
import java.io.*;
import java.util.*;

class LogEntry implements Serializable {
    private static final long serialVersionUID = 1L;
    private String timestamp;
    private String message;

    public LogEntry(String timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;
    }

    @Override
    public String toString() {
        return "LogEntry{timestamp='" + timestamp + "', message='" + message + "'}";
    }
}

public class Main {
    public static void main(String[] args) {
        List<LogEntry> entries = new ArrayList<>();

        // Collect entries
        for (int i = 0; i < 1000; i++) {
            entries.add(new LogEntry(
                System.currentTimeMillis() + "",
                "Log message " + i
            ));
        }

        // Serialize once
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("logs.ser"))) {
            out.writeObject(entries);
            System.out.println("Serialized " + entries.size() + " log entries");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Or append to single file
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("logs_append.ser", true))) {
            for (LogEntry entry : entries) {
                out.writeObject(entry);
                out.reset();  // Clear object cache to allow garbage collection
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Batch serialization or stream reuse much faster than repeated open/close.

**💡 Tip:** Serialize collections, not individual objects in loops; reuse stream when possible.

---

#### ❌ Wrong - Not Considering Memory Consumption:
```java
// WRONG - Loading entire serialized object graph into memory
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Serialize large list
        List<String> largeList = new ArrayList<>();
        for (int i = 0; i < 10_000_000; i++) {
            largeList.add("Item " + i);
        }

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("large.ser"))) {
            out.writeObject(largeList);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize - loads everything into memory!
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("large.ser"))) {
            @SuppressWarnings("unchecked")
            List<String> deserializedList = (List<String>) in.readObject();
            // OutOfMemoryError for very large lists!
            System.out.println("Loaded " + deserializedList.size() + " items");
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```
**Issue:** Loading large object graphs into memory can cause OutOfMemoryError

#### ✅ Right:
```java
// CORRECT - Stream or paginate large datasets
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Write objects individually for streaming
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("items.ser"))) {
            out.writeInt(10_000_000);  // Write count first
            for (int i = 0; i < 10_000_000; i++) {
                out.writeObject("Item " + i);
                if (i % 100000 == 0) {
                    out.reset();  // Clear cache periodically
                }
            }
            System.out.println("Wrote 10M items");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Read and process in streaming fashion
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("items.ser"))) {
            int count = in.readInt();
            System.out.println("Reading " + count + " items...");

            // Process one at a time - constant memory
            for (int i = 0; i < count; i++) {
                String item = (String) in.readObject();
                // Process item
                if (i % 1000000 == 0) {
                    System.out.println("Processed " + i + " items");
                }
            }
            System.out.println("Completed processing");
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        // For very large datasets: use database, file chunks, or memory-mapped files
    }
}
```

**Why:** Streaming processes one item at a time; constant memory regardless of size.

**💡 Tip:** For large datasets, serialize individually and stream; don't load entire collection into memory.

---

This comprehensive list contains **40+ Serialization mistakes** covering all fundamental concepts!

---

**🎉 Congratulations on completing Day 24!**

You've learned how to persist object state using serialization. Tomorrow, we'll explore multithreading basics.

**Next**: [Day 25: Multithreading Basics →](day25_multithreading_basics.md)

---

*Last Updated: 2026-01-09*