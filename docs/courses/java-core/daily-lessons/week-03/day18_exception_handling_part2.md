# Day 18: Exception Handling - Part 2

## 📚 Learning Objectives
By the end of this lesson, you will be able to:
- Understand the throws keyword
- Differentiate between checked and unchecked exceptions
- Create custom exceptions
- Understand the exception hierarchy
- Apply best practices for exception handling

---

## 🎯 Topics Covered

### 1. Throws Keyword

#### Declaring Exceptions
```java
import java.io.*;

public class ThrowsDemo {
    // Method declares it might throw IOException
    public static void readFile(String filename) throws IOException {
        FileReader file = new FileReader(filename);
        BufferedReader reader = new BufferedReader(file);
        System.out.println(reader.readLine());
        reader.close();
    }
    
    public static void main(String[] args) {
        try {
            readFile("test.txt");
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }
    }
}
```

#### Multiple Exceptions with Throws
```java
public class MultipleThrows {
    public static void processData(String data) 
            throws IOException, NumberFormatException {
        if (data == null) {
            throw new IOException("Data is null");
        }
        int number = Integer.parseInt(data);
        System.out.println("Number: " + number);
    }
    
    public static void main(String[] args) {
        try {
            processData("123");
            processData("abc");  // Will throw NumberFormatException
        } catch (IOException | NumberFormatException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 2. Checked vs Unchecked Exceptions

#### Exception Hierarchy
```
Throwable
├── Error (Unchecked)
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── ArithmeticException
    │   ├── ArrayIndexOutOfBoundsException
    │   └── ...
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        ├── ClassNotFoundException
        └── ...
```

#### Checked Exceptions
```java
import java.io.*;

public class CheckedExceptionDemo {
    // Must handle or declare checked exceptions
    public static void method1() {
        try {
            FileReader file = new FileReader("file.txt");  // Checked
        } catch (FileNotFoundException e) {
            System.out.println("File not found");
        }
    }
    
    // Or declare with throws
    public static void method2() throws IOException {
        FileReader file = new FileReader("file.txt");
    }
    
    public static void main(String[] args) {
        method1();
        try {
            method2();
        } catch (IOException e) {
            System.out.println("IO Error");
        }
    }
}
```

#### Unchecked Exceptions
```java
public class UncheckedExceptionDemo {
    // No need to handle or declare unchecked exceptions
    public static void method1() {
        int result = 10 / 0;  // ArithmeticException - unchecked
    }
    
    public static void method2() {
        String str = null;
        str.length();  // NullPointerException - unchecked
    }
    
    public static void main(String[] args) {
        // Can handle if needed
        try {
            method1();
        } catch (ArithmeticException e) {
            System.out.println("Division by zero");
        }
    }
}
```

---

### 3. Creating Custom Exceptions

#### Custom Checked Exception
```java
// Custom exception class
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class CustomCheckedException {
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be 18 or above. Got: " + age);
        }
        System.out.println("Age is valid: " + age);
    }
    
    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (InvalidAgeException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
        
        try {
            validateAge(25);
        } catch (InvalidAgeException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}
```

#### Custom Unchecked Exception
```java
// Custom runtime exception
class InsufficientBalanceException extends RuntimeException {
    private double balance;
    private double amount;
    
    public InsufficientBalanceException(double balance, double amount) {
        super("Insufficient balance. Balance: " + balance + ", Required: " + amount);
        this.balance = balance;
        this.amount = amount;
    }
    
    public double getBalance() { return balance; }
    public double getAmount() { return amount; }
}

public class BankAccount {
    private double balance;
    
    public BankAccount(double balance) {
        this.balance = balance;
    }
    
    public void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientBalanceException(balance, amount);
        }
        balance -= amount;
        System.out.println("Withdrawn: " + amount + ", Balance: " + balance);
    }
    
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);
        
        try {
            account.withdraw(500);   // OK
            account.withdraw(700);   // Will throw exception
        } catch (InsufficientBalanceException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Current balance: " + e.getBalance());
        }
    }
}
```

#### Exception with Additional Data
```java
class ValidationException extends Exception {
    private String fieldName;
    private Object invalidValue;
    
    public ValidationException(String fieldName, Object invalidValue, String message) {
        super(message);
        this.fieldName = fieldName;
        this.invalidValue = invalidValue;
    }
    
    public String getFieldName() { return fieldName; }
    public Object getInvalidValue() { return invalidValue; }
}

public class UserValidator {
    public static void validateUser(String username, String email, int age) 
            throws ValidationException {
        if (username == null || username.length() < 3) {
            throw new ValidationException("username", username, 
                "Username must be at least 3 characters");
        }
        if (!email.contains("@")) {
            throw new ValidationException("email", email, 
                "Invalid email format");
        }
        if (age < 18) {
            throw new ValidationException("age", age, 
                "Age must be 18 or above");
        }
    }
    
    public static void main(String[] args) {
        try {
            validateUser("ab", "test@email.com", 20);
        } catch (ValidationException e) {
            System.out.println("Validation failed for: " + e.getFieldName());
            System.out.println("Invalid value: " + e.getInvalidValue());
            System.out.println("Message: " + e.getMessage());
        }
    }
}
```

---

### 4. Exception Best Practices

#### 1. Be Specific with Exceptions
```java
// BAD - Too generic
public void processFile(String filename) throws Exception {
    // ...
}

// GOOD - Specific exceptions
public void processFile(String filename) 
        throws FileNotFoundException, IOException {
    // ...
}
```

#### 2. Don't Swallow Exceptions
```java
// BAD - Silent failure
try {
    riskyOperation();
} catch (Exception e) {
    // Do nothing - exception is lost!
}

// GOOD - At least log it
try {
    riskyOperation();
} catch (Exception e) {
    System.err.println("Error in riskyOperation: " + e.getMessage());
    e.printStackTrace();
}
```

#### 3. Clean Up Resources
```java
// BAD - Resource leak
public void readFile(String filename) throws IOException {
    FileReader file = new FileReader(filename);
    // If exception occurs, file is never closed
}

// GOOD - Use try-with-resources
public void readFile(String filename) throws IOException {
    try (FileReader file = new FileReader(filename)) {
        // File automatically closed
    }
}
```

#### 4. Provide Context in Exception Messages
```java
// BAD - No context
throw new IllegalArgumentException("Invalid value");

// GOOD - Detailed context
throw new IllegalArgumentException(
    "Invalid age value: " + age + ". Must be between 0 and 150");
```

#### 5. Don't Use Exceptions for Flow Control
```java
// BAD - Using exceptions for logic
try {
    while (true) {
        array[index++] = value;
    }
} catch (ArrayIndexOutOfBoundsException e) {
    // End of array
}

// GOOD - Use proper logic
for (int i = 0; i < array.length; i++) {
    array[i] = value;
}
```

---

## 💻 Practice Exercises

### Exercise 1: Custom Validation Framework
```java
class EmailValidationException extends Exception {
    public EmailValidationException(String email) {
        super("Invalid email format: " + email);
    }
}

class PasswordValidationException extends Exception {
    public PasswordValidationException(String reason) {
        super("Password validation failed: " + reason);
    }
}

public class UserRegistration {
    public static void validateEmail(String email) 
            throws EmailValidationException {
        if (email == null || !email.contains("@") || !email.contains(".")) {
            throw new EmailValidationException(email);
        }
    }
    
    public static void validatePassword(String password) 
            throws PasswordValidationException {
        if (password == null || password.length() < 8) {
            throw new PasswordValidationException("Must be at least 8 characters");
        }
        if (!password.matches(".*[A-Z].*")) {
            throw new PasswordValidationException("Must contain uppercase letter");
        }
        if (!password.matches(".*[0-9].*")) {
            throw new PasswordValidationException("Must contain digit");
        }
    }
    
    public static void registerUser(String email, String password) {
        try {
            validateEmail(email);
            validatePassword(password);
            System.out.println("User registered successfully!");
        } catch (EmailValidationException | PasswordValidationException e) {
            System.out.println("Registration failed: " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        registerUser("test@email.com", "Password123");  // Success
        registerUser("invalid-email", "Password123");    // Email fail
        registerUser("test@email.com", "weak");          // Password fail
    }
}
```

### Exercise 2: File Processing with Exception Handling
```java
import java.io.*;

class FileProcessingException extends Exception {
    public FileProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class FileProcessor {
    public static void processFile(String inputFile, String outputFile) 
            throws FileProcessingException {
        BufferedReader reader = null;
        BufferedWriter writer = null;
        
        try {
            reader = new BufferedReader(new FileReader(inputFile));
            writer = new BufferedWriter(new FileWriter(outputFile));
            
            String line;
            int lineNumber = 0;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                writer.write(lineNumber + ": " + line.toUpperCase());
                writer.newLine();
            }
            
            System.out.println("File processed successfully");
            
        } catch (FileNotFoundException e) {
            throw new FileProcessingException(
                "Input file not found: " + inputFile, e);
        } catch (IOException e) {
            throw new FileProcessingException(
                "Error processing file", e);
        } finally {
            try {
                if (reader != null) reader.close();
                if (writer != null) writer.close();
            } catch (IOException e) {
                System.err.println("Error closing files: " + e.getMessage());
            }
        }
    }
    
    public static void main(String[] args) {
        try {
            processFile("input.txt", "output.txt");
        } catch (FileProcessingException e) {
            System.out.println("Processing failed: " + e.getMessage());
            if (e.getCause() != null) {
                System.out.println("Caused by: " + e.getCause().getMessage());
            }
        }
    }
}
```

---

## 🎓 Key Takeaways

1. **throws** declares exceptions a method might throw
2. **Checked exceptions** must be handled or declared
3. **Unchecked exceptions** (RuntimeException) don't require handling
4. **Custom exceptions** provide domain-specific error handling
5. **Best practices**: Be specific, don't swallow exceptions, clean up resources
6. **Exception messages** should provide context and details

---

## 📝 Summary

Today you learned:
- ✅ Using throws keyword to declare exceptions
- ✅ Difference between checked and unchecked exceptions
- ✅ Creating custom exception classes
- ✅ Exception hierarchy in Java
- ✅ Best practices for exception handling

---

## 🔗 What's Next?

Tomorrow (Day 19), we'll learn about:
- Collections Framework overview
- ArrayList and LinkedList
- Vector and Stack
- HashSet, LinkedHashSet, TreeSet
- List vs Set interfaces

---

## 📚 Additional Resources

- [Oracle Exception Handling Best Practices](https://docs.oracle.com/javase/tutorial/essential/exceptions/)
- [Effective Java - Exception Handling](https://www.oreilly.com/library/view/effective-java/9780134686097/)
- [Custom Exceptions in Java](https://www.baeldung.com/java-new-custom-exception)