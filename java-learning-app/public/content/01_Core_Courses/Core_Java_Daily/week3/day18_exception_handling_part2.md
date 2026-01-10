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

## ⚠️ Common Mistakes

### 1. Throws Keyword Mistakes

#### ❌ Wrong - Confusing throw and throws:
```java
// WRONG
public class Main {
    public static void processData() throw IOException {  // Compilation error! "throw" instead of "throws"
        // Code that might throw IOException
    }
}
```
**Issue:** `throw` is for throwing exceptions; `throws` declares exceptions in method signature

#### ✅ Right:
```java
// CORRECT - Use "throws" in method signature
import java.io.*;

public class Main {
    public static void processData() throws IOException {  // "throws" keyword
        FileReader file = new FileReader("data.txt");
        // ...
    }

    public static void triggerError() {
        throw new IllegalArgumentException("Error");  // "throw" keyword to throw exception
    }
}
```

**Why:** `throws` declares exceptions (method signature); `throw` throws exception instance (inside method body).

**💡 Tip:** Remember: `throws` = declaration; `throw` = action.

---

#### ❌ Wrong - Declaring Unchecked Exceptions with throws:
```java
// WRONG (unnecessary)
public class Main {
    public static void divide(int a, int b)
            throws ArithmeticException {  // Unnecessary for unchecked exception
        return a / b;
    }
}
```
**Issue:** Unchecked exceptions (RuntimeException) don't need `throws` declaration; adds clutter

#### ✅ Right:
```java
// CORRECT - No throws for unchecked exceptions
public class Main {
    public static int divide(int a, int b) {
        // ArithmeticException is unchecked; no throws needed
        return a / b;
    }

    // Document unchecked exceptions in Javadoc instead
    /**
     * Divides two numbers.
     * @throws ArithmeticException if b is zero
     */
    public static int safeDivide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
}
```

**Why:** Unchecked exceptions optional in `throws`; document in Javadoc for API clarity.

**💡 Tip:** Use `throws` only for checked exceptions; document unchecked in Javadoc.

---

#### ❌ Wrong - Not Handling or Declaring Checked Exception:
```java
// WRONG
import java.io.*;

public class Main {
    public static void readFile(String filename) {  // Compilation error!
        FileReader file = new FileReader(filename);  // Checked exception not handled
    }
}
```
**Issue:** Checked exceptions must be either caught or declared with `throws`

#### ✅ Right:
```java
// CORRECT - Either handle or declare
import java.io.*;

public class Main {
    // Option 1: Declare with throws
    public static void readFile1(String filename) throws FileNotFoundException {
        FileReader file = new FileReader(filename);
    }

    // Option 2: Handle with try-catch
    public static void readFile2(String filename) {
        try {
            FileReader file = new FileReader(filename);
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + filename);
        }
    }
}
```

**Why:** Java enforces checked exception handling at compile time for reliability.

**💡 Tip:** Handle close to occurrence; declare if caller should decide handling.

---

#### ❌ Wrong - Declaring Exception Supertype Unnecessarily:
```java
// WRONG - Too broad
import java.io.*;

public class Main {
    public static void readFile(String filename) throws Exception {  // Too generic
        FileReader file = new FileReader(filename);
        // Only throws FileNotFoundException (subtype of IOException)
    }
}
```
**Issue:** Declaring generic `Exception` hides specific exceptions caller might want to handle differently

#### ✅ Right:
```java
// CORRECT - Declare specific exceptions
import java.io.*;

public class Main {
    public static void readFile(String filename)
            throws FileNotFoundException, IOException {  // Specific exceptions
        FileReader file = new FileReader(filename);
        BufferedReader reader = new BufferedReader(file);
        reader.readLine();
        reader.close();
    }

    public static void main(String[] args) {
        try {
            readFile("test.txt");
        } catch (FileNotFoundException e) {
            System.out.println("File not found - specific handling");
        } catch (IOException e) {
            System.out.println("IO error - different handling");
        }
    }
}
```

**Why:** Specific exceptions enable targeted handling by caller; better API design.

**💡 Tip:** Declare most specific exceptions; avoid generic `Exception` or `Throwable`.

---

### 2. Checked vs Unchecked Exception Mistakes

#### ❌ Wrong - Using Checked Exception for Programming Errors:
```java
// WRONG - Checked exception for programming error
public class Main {
    public static void processArray(int[] arr, int index) throws InvalidIndexException {
        if (index < 0 || index >= arr.length) {
            throw new InvalidIndexException("Invalid index: " + index);
        }
        System.out.println(arr[index]);
    }
}

class InvalidIndexException extends Exception {  // Checked - WRONG for programming error
    public InvalidIndexException(String message) {
        super(message);
    }
}
```
**Issue:** Programming errors (like invalid index) should be unchecked; caller can't reasonably recover

#### ✅ Right:
```java
// CORRECT - Use unchecked exception for programming errors
public class Main {
    public static void processArray(int[] arr, int index) {
        // Use unchecked exception (no throws needed)
        if (index < 0 || index >= arr.length) {
            throw new IndexOutOfBoundsException("Invalid index: " + index);
        }
        System.out.println(arr[index]);
    }

    // OR use built-in IllegalArgumentException
    public static void processArray2(int[] arr, int index) {
        if (index < 0 || index >= arr.length) {
            throw new IllegalArgumentException("Invalid index: " + index);
        }
        System.out.println(arr[index]);
    }
}
```

**Why:** Programming errors = unchecked (RuntimeException); environmental errors = checked.

**💡 Tip:** Checked for recoverable errors; unchecked for programming bugs/contract violations.

---

#### ❌ Wrong - Using Unchecked Exception for Recoverable Errors:
```java
// WRONG - Unchecked for recoverable error
public class Main {
    public static void connectToDatabase(String url) {
        // Database connection might fail - recoverable error
        if (!isValidUrl(url)) {
            throw new IllegalArgumentException("Invalid URL");  // Unchecked - WRONG
        }
        // ... connect
    }

    private static boolean isValidUrl(String url) {
        return url != null && url.startsWith("jdbc:");
    }
}
```
**Issue:** Recoverable errors (database connection, network, file) should be checked; forces caller to handle

#### ✅ Right:
```java
// CORRECT - Use checked exception for recoverable errors
import java.sql.*;

public class Main {
    // Declare checked exception
    public static void connectToDatabase(String url)
            throws SQLException {  // Checked exception
        if (!isValidUrl(url)) {
            throw new SQLException("Invalid database URL: " + url);
        }
        // ... connect
    }

    private static boolean isValidUrl(String url) {
        return url != null && url.startsWith("jdbc:");
    }

    public static void main(String[] args) {
        try {
            connectToDatabase("jdbc:mysql://localhost/db");
        } catch (SQLException e) {
            System.out.println("Database connection failed: " + e.getMessage());
            // Can retry, use fallback, etc.
        }
    }
}
```

**Why:** Checked exceptions force caller awareness of recoverable failures.

**💡 Tip:** Recoverable environmental errors = checked; programming mistakes = unchecked.

---

#### ❌ Wrong - Catching Error Class:
```java
// WRONG - Catching Error
public class Main {
    public static void main(String[] args) {
        try {
            recursiveMethod();
        } catch (StackOverflowError e) {  // Don't catch Error!
            System.out.println("Stack overflow");
            // Can't recover from Error
        }
    }

    public static void recursiveMethod() {
        recursiveMethod();  // Infinite recursion
    }
}
```
**Issue:** `Error` indicates serious JVM problems; can't and shouldn't catch

#### ✅ Right:
```java
// CORRECT - Don't catch Error; fix the bug
public class Main {
    public static void main(String[] args) {
        recursiveMethod(0, 1000);  // Fixed with termination condition
    }

    public static void recursiveMethod(int current, int limit) {
        if (current >= limit) {  // Termination condition
            return;
        }
        recursiveMethod(current + 1, limit);
    }
}

// Errors indicate serious problems - don't catch them
// Examples: OutOfMemoryError, StackOverflowError, VirtualMachineError
```

**Why:** Errors indicate critical JVM failures; catching them masks serious bugs.

**💡 Tip:** Never catch `Error` or its subclasses; fix the underlying bug instead.

---

### 3. Custom Exception Creation Mistakes

#### ❌ Wrong - Not Providing Constructors for Custom Exception:
```java
// WRONG - Missing constructors
class CustomException extends Exception {
    // No constructors - limits usability
}

public class Main {
    public static void process() throws CustomException {
        throw new CustomException();  // Can only use default constructor
        // throw new CustomException("Message");  // Compilation error!
        // throw new CustomException("Message", cause);  // Compilation error!
    }
}
```
**Issue:** Custom exceptions should provide standard constructors for flexibility

#### ✅ Right:
```java
// CORRECT - Provide standard constructors
class CustomException extends Exception {
    // Constructor with message
    public CustomException(String message) {
        super(message);
    }

    // Constructor with message and cause
    public CustomException(String message, Throwable cause) {
        super(message, cause);
    }

    // Constructor with cause only
    public CustomException(Throwable cause) {
        super(cause);
    }

    // Default constructor (optional)
    public CustomException() {
        super();
    }
}

public class Main {
    public static void process() throws CustomException {
        try {
            // Some operation
        } catch (IOException e) {
            throw new CustomException("Processing failed", e);  // Wrap with cause
        }
    }
}
```

**Why:** Standard constructors enable flexible exception creation and cause chaining.

**💡 Tip:** Always provide at least message and message+cause constructors.

---

#### ❌ Wrong - Custom Exception with Mutable State:
```java
// WRONG - Mutable exception state
class DataException extends Exception {
    private List<String> errors;  // Mutable!

    public DataException(List<String> errors) {
        super("Multiple errors occurred");
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;  // Returns mutable reference
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            List<String> errors = new ArrayList<>();
            errors.add("Error 1");
            throw new DataException(errors);
        } catch (DataException e) {
            e.getErrors().clear();  // External modification!
            // Exception state changed after creation
        }
    }
}
```
**Issue:** Mutable exception state can be modified externally; violates exception immutability

#### ✅ Right:
```java
// CORRECT - Immutable exception state
import java.util.*;

class DataException extends Exception {
    private final List<String> errors;  // Final

    public DataException(List<String> errors) {
        super("Multiple errors occurred");
        this.errors = Collections.unmodifiableList(new ArrayList<>(errors));  // Defensive copy + immutable
    }

    public List<String> getErrors() {
        return errors;  // Returns immutable list
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            List<String> errors = new ArrayList<>();
            errors.add("Error 1");
            throw new DataException(errors);
        } catch (DataException e) {
            // e.getErrors().clear();  // UnsupportedOperationException - can't modify
            System.out.println(e.getErrors());  // Can read only
        }
    }
}
```

**Why:** Exceptions should be immutable; state shouldn't change after creation.

**💡 Tip:** Make exception fields `final`; return defensive copies or immutable collections.

---

#### ❌ Wrong - Not Extending Appropriate Base Exception:
```java
// WRONG - Extending Throwable directly
class CustomException extends Throwable {  // Should extend Exception or RuntimeException
    public CustomException(String message) {
        super(message);
    }
}
```
**Issue:** Extending `Throwable` directly is non-standard; breaks exception hierarchy conventions

#### ✅ Right:
```java
// CORRECT - Extend Exception or RuntimeException
// For checked exception (recoverable errors)
class CustomCheckedException extends Exception {
    public CustomCheckedException(String message) {
        super(message);
    }
}

// For unchecked exception (programming errors)
class CustomUncheckedException extends RuntimeException {
    public CustomUncheckedException(String message) {
        super(message);
    }
}

// Usage
public class Main {
    // Checked - must declare or handle
    public static void method1() throws CustomCheckedException {
        throw new CustomCheckedException("Checked error");
    }

    // Unchecked - no declaration needed
    public static void method2() {
        throw new CustomUncheckedException("Unchecked error");
    }
}
```

**Why:** Exception/RuntimeException are standard bases; maintains proper exception hierarchy.

**💡 Tip:** Extend `Exception` for checked; extend `RuntimeException` for unchecked.

---

### 4. Exception Hierarchy Mistakes

#### ❌ Wrong - Catching Parent Before Child in Different Try Blocks:
```java
// WRONG understanding
public class Main {
    public static void main(String[] args) {
        // Student might think: different try blocks, order doesn't matter
        // Actually, each try-catch is independent - order within SAME try matters

        try {
            // Operation 1
        } catch (Exception e) {  // OK here
            // Handle
        }

        try {
            // Operation 2
        } catch (IOException e) {  // OK - different try block
            // Handle
        }

        // The issue is within SAME try block:
        try {
            // Operation
        } catch (Exception e) {  // Parent first
        } catch (IOException e) {  // Unreachable! Compilation error
        }
    }
}
```
**Issue:** Understanding that exception order matters only within same try block

#### ✅ Right:
```java
// CORRECT - Exception order within same try block
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Different try blocks - order doesn't matter between them
        try {
            processFile("test.txt");
        } catch (Exception e) {  // OK - this try block
            System.out.println("General error");
        }

        try {
            readFile("data.txt");
        } catch (FileNotFoundException e) {  // OK - different try block
            System.out.println("File not found");
        }

        // Same try block - specific before general
        try {
            processFile("test.txt");
            readFile("data.txt");
        } catch (FileNotFoundException e) {  // Specific first
            System.out.println("File not found");
        } catch (IOException e) {  // Less specific
            System.out.println("IO error");
        } catch (Exception e) {  // Most general last
            System.out.println("General error");
        }
    }

    static void processFile(String name) throws IOException { }
    static void readFile(String name) throws FileNotFoundException { }
}
```

**Why:** Catch block order matters only within same try; different try blocks are independent.

**💡 Tip:** Within same try: child → parent order; different try blocks: any order.

---

#### ❌ Wrong - Not Understanding Exception vs Error vs Throwable:
```java
// WRONG - Catching Throwable for everything
public class Main {
    public static void main(String[] args) {
        try {
            riskyOperation();
        } catch (Throwable t) {  // Too broad! Catches Error too
            System.out.println("Something went wrong");
            // Might catch OutOfMemoryError, VirtualMachineError, etc.
        }
    }

    static void riskyOperation() throws Exception {
        // ...
    }
}
```
**Issue:** Catching `Throwable` catches both `Exception` and `Error`; errors shouldn't be caught

#### ✅ Right:
```java
// CORRECT - Catch Exception, not Throwable
public class Main {
    public static void main(String[] args) {
        try {
            riskyOperation();
        } catch (Exception e) {  // Catch Exception (not Error)
            System.out.println("Exception occurred: " + e.getMessage());
            // Won't catch OutOfMemoryError, etc.
        }
    }

    static void riskyOperation() throws Exception {
        // ...
    }
}

// Hierarchy:
// Throwable
// ├── Error (don't catch)
// └── Exception (catch this)
//     ├── RuntimeException (unchecked)
//     └── Other exceptions (checked)
```

**Why:** `Throwable` includes `Error` (serious JVM problems); catch `Exception` instead.

**💡 Tip:** Catch `Exception` for all exceptions; never catch `Throwable` or `Error`.

---

### 5. Exception Message Mistakes

#### ❌ Wrong - Generic Uninformative Exception Messages:
```java
// WRONG - No useful information
public class Main {
    public static void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Invalid");  // What's invalid?
        }
        if (age < 18) {
            throw new IllegalArgumentException("Error");  // What error?
        }
    }
}
```
**Issue:** Generic messages don't help debugging; no context about what went wrong

#### ✅ Right:
```java
// CORRECT - Descriptive, contextual messages
public class Main {
    public static void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException(
                "Age cannot be negative. Received: " + age);
        }
        if (age < 18) {
            throw new IllegalArgumentException(
                "Age must be at least 18. Received: " + age);
        }
    }

    public static void processUser(String username, String email) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException(
                "Username is required and cannot be empty");
        }
        if (!email.contains("@")) {
            throw new IllegalArgumentException(
                "Invalid email format. Email must contain '@'. Received: " + email);
        }
    }
}
```

**Why:** Detailed messages speed debugging; include actual values and constraints.

**💡 Tip:** Include: what failed, expected value/format, actual value received.

---

#### ❌ Wrong - Including Sensitive Data in Exception Messages:
```java
// WRONG - Exposing sensitive data
public class Main {
    public static void authenticateUser(String username, String password) {
        if (!isValidCredentials(username, password)) {
            throw new SecurityException(
                "Authentication failed for user: " + username +
                " with password: " + password);  // SECURITY RISK!
        }
    }

    static boolean isValidCredentials(String u, String p) {
        return false;
    }
}
```
**Issue:** Exception messages may be logged/displayed; exposing passwords is security vulnerability

#### ✅ Right:
```java
// CORRECT - Don't expose sensitive data
public class Main {
    public static void authenticateUser(String username, String password) {
        if (!isValidCredentials(username, password)) {
            throw new SecurityException(
                "Authentication failed for user: " + username);  // No password!
        }
    }

    public static void processPayment(String cardNumber, double amount) {
        if (!isValidCard(cardNumber)) {
            // Mask sensitive data
            String masked = maskCardNumber(cardNumber);
            throw new IllegalArgumentException(
                "Invalid card number: " + masked);  // ****1234
        }
    }

    static String maskCardNumber(String cardNumber) {
        if (cardNumber.length() < 4) return "****";
        return "****" + cardNumber.substring(cardNumber.length() - 4);
    }

    static boolean isValidCredentials(String u, String p) { return false; }
    static boolean isValidCard(String c) { return false; }
}
```

**Why:** Exception messages may be logged, displayed to users, or sent to monitoring systems.

**💡 Tip:** Never include passwords, API keys, tokens, or full credit cards in exceptions.

---

#### ❌ Wrong - Hardcoding Messages Instead of Using Constants:
```java
// WRONG - Duplicated string literals
public class Main {
    public static void validateUser(String username, String email, int age) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null");
        }
        if (email == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }
        // Duplicated phrases, prone to typos
    }

    public static void processUser(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username cannot be null");  // Duplicate
        }
    }
}
```
**Issue:** Duplicated strings hard to maintain; typos cause inconsistencies

#### ✅ Right:
```java
// CORRECT - Use constants for common messages
public class Main {
    // Error message constants
    private static final String ERR_USERNAME_NULL = "Username cannot be null";
    private static final String ERR_EMAIL_NULL = "Email cannot be null";
    private static final String ERR_INVALID_AGE = "Age must be between %d and %d. Received: %d";

    public static void validateUser(String username, String email, int age) {
        if (username == null) {
            throw new IllegalArgumentException(ERR_USERNAME_NULL);
        }
        if (email == null) {
            throw new IllegalArgumentException(ERR_EMAIL_NULL);
        }
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException(
                String.format(ERR_INVALID_AGE, 0, 150, age));
        }
    }

    public static void processUser(String username) {
        if (username == null) {
            throw new IllegalArgumentException(ERR_USERNAME_NULL);  // Reuse constant
        }
    }
}
```

**Why:** Constants ensure consistency, ease refactoring, prevent typos.

**💡 Tip:** Define error message constants; use String.format() for parameterized messages.

---

### 6. Exception Wrapping and Cause Chain Mistakes

#### ❌ Wrong - Wrapping Without Preserving Cause:
```java
// WRONG - Loses original exception
import java.io.*;

public class Main {
    public static void processFile(String filename) throws ApplicationException {
        try {
            FileReader file = new FileReader(filename);
        } catch (FileNotFoundException e) {
            throw new ApplicationException("File processing failed");  // Lost original exception!
        }
    }
}

class ApplicationException extends Exception {
    public ApplicationException(String message) {
        super(message);
    }
}
```
**Issue:** Original exception lost; can't see root cause in stack trace

#### ✅ Right:
```java
// CORRECT - Preserve exception cause
import java.io.*;

public class Main {
    public static void processFile(String filename) throws ApplicationException {
        try {
            FileReader file = new FileReader(filename);
        } catch (FileNotFoundException e) {
            throw new ApplicationException("File processing failed: " + filename, e);  // Preserve cause
        }
    }

    public static void main(String[] args) {
        try {
            processFile("missing.txt");
        } catch (ApplicationException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Caused by: " + e.getCause());
            e.printStackTrace();  // Shows full chain
        }
    }
}

class ApplicationException extends Exception {
    public ApplicationException(String message, Throwable cause) {  // Accept cause
        super(message, cause);
    }
}
```

**Why:** Preserving cause maintains full error context for debugging.

**💡 Tip:** Always pass original exception as cause when wrapping; use constructor with Throwable parameter.

---

#### ❌ Wrong - Creating Long Exception Chains Unnecessarily:
```java
// WRONG - Too many layers
public class Main {
    public static void main(String[] args) {
        try {
            layer1();
        } catch (Exception e) {
            e.printStackTrace();  // Very long stack trace
        }
    }

    static void layer1() throws Exception {
        try {
            layer2();
        } catch (Exception e) {
            throw new Exception("Layer 1 failed", e);  // Unnecessary wrapping
        }
    }

    static void layer2() throws Exception {
        try {
            layer3();
        } catch (Exception e) {
            throw new Exception("Layer 2 failed", e);  // Unnecessary wrapping
        }
    }

    static void layer3() throws Exception {
        try {
            actualWork();
        } catch (IOException e) {
            throw new Exception("Layer 3 failed", e);  // Unnecessary wrapping
        }
    }

    static void actualWork() throws IOException {
        throw new IOException("Actual error");
    }
}
```
**Issue:** Excessive wrapping creates long, confusing stack traces

#### ✅ Right:
```java
// CORRECT - Wrap only when adding value
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try {
            processUserData();
        } catch (DataProcessingException e) {
            e.printStackTrace();  // Clear, concise stack trace
        }
    }

    // Business layer - wrap with domain exception
    static void processUserData() throws DataProcessingException {
        try {
            readUserFile();
        } catch (IOException e) {
            throw new DataProcessingException("User data processing failed", e);
        }
    }

    // Infrastructure layer - just propagate
    static void readUserFile() throws IOException {
        actualWork();  // Don't wrap unnecessarily
    }

    static void actualWork() throws IOException {
        throw new IOException("File not found");
    }
}

class DataProcessingException extends Exception {
    public DataProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

**Why:** Wrap at layer boundaries for domain context; propagate within same layer.

**💡 Tip:** Wrap when crossing architectural layers or adding business context; otherwise propagate.

---

### 7. Exception Handling Best Practice Violations

#### ❌ Wrong - Swallowing Exceptions Silently:
```java
// WRONG - Silent failure
public class Main {
    public static void processData() {
        try {
            // Risky operation
            readFile("data.txt");
            parseData();
            saveToDatabase();
        } catch (Exception e) {
            // Empty catch - exception disappears!
        }
    }

    static void readFile(String name) throws IOException { }
    static void parseData() throws ParseException { }
    static void saveToDatabase() throws SQLException { }
}
```
**Issue:** Exceptions swallowed silently; failures go unnoticed, bugs hide

#### ✅ Right:
```java
// CORRECT - At minimum, log the exception
import java.util.logging.*;

public class Main {
    private static final Logger logger = Logger.getLogger(Main.class.getName());

    public static void processData() {
        try {
            readFile("data.txt");
            parseData();
            saveToDatabase();
        } catch (IOException e) {
            logger.severe("File read failed: " + e.getMessage());
            e.printStackTrace();
        } catch (ParseException e) {
            logger.severe("Data parsing failed: " + e.getMessage());
            e.printStackTrace();
        } catch (SQLException e) {
            logger.severe("Database save failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    static void readFile(String name) throws IOException { }
    static void parseData() throws ParseException { }
    static void saveToDatabase() throws SQLException { }
}
```

**Why:** Silent failures mask problems; always log, rethrow, or handle meaningfully.

**💡 Tip:** Never leave catch blocks empty; at minimum: log + printStackTrace.

---

#### ❌ Wrong - Using Exceptions for Control Flow:
```java
// WRONG - Exception as control flow
public class Main {
    public static int findIndex(String[] array, String target) {
        try {
            for (int i = 0; ; i++) {  // Infinite loop!
                if (array[i].equals(target)) {
                    throw new FoundException(i);  // Using exception to exit loop
                }
            }
        } catch (ArrayIndexOutOfBoundsException e) {
            return -1;  // Using exception for end of array
        } catch (FoundException e) {
            return e.getIndex();
        }
    }
}

class FoundException extends Exception {
    private int index;
    public FoundException(int index) {
        this.index = index;
    }
    public int getIndex() {
        return index;
    }
}
```
**Issue:** Exceptions expensive (stack trace creation); control flow should use returns/breaks

#### ✅ Right:
```java
// CORRECT - Use normal control flow
public class Main {
    public static int findIndex(String[] array, String target) {
        for (int i = 0; i < array.length; i++) {  // Proper loop condition
            if (array[i].equals(target)) {
                return i;  // Normal return
            }
        }
        return -1;  // Normal return
    }

    // Exceptions for exceptional conditions only
    public static int findIndexChecked(String[] array, String target) {
        if (array == null) {
            throw new IllegalArgumentException("Array cannot be null");
        }
        if (target == null) {
            throw new IllegalArgumentException("Target cannot be null");
        }

        for (int i = 0; i < array.length; i++) {
            if (array[i].equals(target)) {
                return i;
            }
        }
        return -1;
    }
}
```

**Why:** Exceptions for exceptional conditions; use return/break/continue for normal flow.

**💡 Tip:** If it's expected, it's not exceptional; use normal control structures.

---

#### ❌ Wrong - Catching and Rethrowing Without Adding Value:
```java
// WRONG - Useless catch-rethrow
public class Main {
    public static void processFile(String filename) throws IOException {
        try {
            FileReader file = new FileReader(filename);
            // Process file
        } catch (IOException e) {
            throw e;  // Just rethrowing - adds no value!
        }
    }
}
```
**Issue:** Catching just to rethrow adds no value; unnecessary code clutter

#### ✅ Right:
```java
// CORRECT - Either add value or don't catch
import java.io.*;

public class Main {
    // Option 1: Don't catch if not handling
    public static void processFile1(String filename) throws IOException {
        FileReader file = new FileReader(filename);
        // Process file
        // No catch - just let exception propagate
    }

    // Option 2: Catch if adding value (logging, cleanup, context)
    public static void processFile2(String filename) throws IOException {
        try {
            FileReader file = new FileReader(filename);
            // Process file
        } catch (IOException e) {
            // Add value: log with context
            System.err.println("Failed to process file: " + filename);
            throw e;  // Now rethrow makes sense
        }
    }

    // Option 3: Wrap with business exception
    public static void processFile3(String filename) throws DataException {
        try {
            FileReader file = new FileReader(filename);
            // Process file
        } catch (IOException e) {
            throw new DataException("File processing failed: " + filename, e);
        }
    }
}

class DataException extends Exception {
    public DataException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

**Why:** Catch only if adding value (logging, context, wrapping, recovery).

**💡 Tip:** Don't catch-rethrow unless logging, adding context, or performing cleanup.

---

### 8. Resource Cleanup Mistakes

#### ❌ Wrong - Not Closing Resources on Exception:
```java
// WRONG - Resource leak on exception
import java.io.*;

public class Main {
    public static void processFile(String filename) throws IOException {
        FileReader file = new FileReader(filename);
        BufferedReader reader = new BufferedReader(file);

        String line = reader.readLine();
        if (line == null) {
            throw new IOException("Empty file");  // Exception thrown, reader never closed!
        }

        reader.close();  // Only reached if no exception
    }
}
```
**Issue:** Exception thrown before close() means resource never closed; resource leak

#### ✅ Right:
```java
// CORRECT - Close in finally or use try-with-resources
import java.io.*;

public class Main {
    // Option 1: try-with-resources (preferred)
    public static void processFile1(String filename) throws IOException {
        try (FileReader file = new FileReader(filename);
             BufferedReader reader = new BufferedReader(file)) {

            String line = reader.readLine();
            if (line == null) {
                throw new IOException("Empty file");
            }
            // Resources auto-closed even if exception thrown
        }
    }

    // Option 2: finally block (pre-Java 7)
    public static void processFile2(String filename) throws IOException {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(filename));
            String line = reader.readLine();
            if (line == null) {
                throw new IOException("Empty file");
            }
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    // Log but don't mask original exception
                    System.err.println("Error closing: " + e);
                }
            }
        }
    }
}
```

**Why:** Finally or try-with-resources ensures cleanup even when exceptions thrown.

**💡 Tip:** Use try-with-resources for all AutoCloseable resources; automatic cleanup.

---

#### ❌ Wrong - Closing Resources in Wrong Order:
```java
// WRONG - Close wrapped resource first
import java.io.*;

public class Main {
    public static void copyFile(String src, String dest) throws IOException {
        FileInputStream fis = new FileInputStream(src);
        BufferedInputStream bis = new BufferedInputStream(fis);
        FileOutputStream fos = new FileOutputStream(dest);
        BufferedOutputStream bos = new BufferedOutputStream(fos);

        try {
            // Copy data
            int b;
            while ((b = bis.read()) != -1) {
                bos.write(b);
            }
        } finally {
            // WRONG order - wrapped before base
            fis.close();  // Close base first - WRONG
            bis.close();  // Then wrapped - may fail
            fos.close();  // Wrong order
            bos.close();
        }
    }
}
```
**Issue:** Closing base stream before wrapper can cause issues; wrapper needs base to flush

#### ✅ Right:
```java
// CORRECT - Close wrappers first (reverse of creation)
import java.io.*;

public class Main {
    public static void copyFile(String src, String dest) throws IOException {
        // Try-with-resources handles order automatically
        try (FileInputStream fis = new FileInputStream(src);
             BufferedInputStream bis = new BufferedInputStream(fis);
             FileOutputStream fos = new FileOutputStream(dest);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {

            int b;
            while ((b = bis.read()) != -1) {
                bos.write(b);
            }
            // Closed in reverse order: bos, fos, bis, fis
        }
    }

    // Manual closing (if not using try-with-resources)
    public static void copyFileManual(String src, String dest) throws IOException {
        FileInputStream fis = null;
        BufferedInputStream bis = null;
        FileOutputStream fos = null;
        BufferedOutputStream bos = null;

        try {
            fis = new FileInputStream(src);
            bis = new BufferedInputStream(fis);
            fos = new FileOutputStream(dest);
            bos = new BufferedOutputStream(fos);

            int b;
            while ((b = bis.read()) != -1) {
                bos.write(b);
            }
        } finally {
            // Close in reverse order (wrapper → base)
            closeQuietly(bos);  // Close output wrapper
            closeQuietly(fos);  // Close output base
            closeQuietly(bis);  // Close input wrapper
            closeQuietly(fis);  // Close input base
        }
    }

    private static void closeQuietly(Closeable c) {
        if (c != null) {
            try {
                c.close();
            } catch (IOException e) {
                // Log but don't rethrow
                System.err.println("Close error: " + e);
            }
        }
    }
}
```

**Why:** Wrappers need underlying streams to flush; close wrappers before base streams.

**💡 Tip:** Try-with-resources handles order; manual: close in reverse construction order.

---

### 9. Exception Declaration Mistakes

#### ❌ Wrong - Declaring More Exceptions Than Actually Thrown:
```java
// WRONG - Over-declaration
import java.io.*;
import java.sql.*;

public class Main {
    // Declares exceptions it doesn't throw
    public static void processData(String data)
            throws IOException, SQLException, ClassNotFoundException {  // Too many!
        if (data == null) {
            throw new IllegalArgumentException("Data is null");  // Only throws this
        }
        System.out.println(data.toUpperCase());
    }
}
```
**Issue:** Misleading API; callers forced to handle exceptions that will never occur

#### ✅ Right:
```java
// CORRECT - Declare only actually thrown exceptions
public class Main {
    // Declare only what's actually thrown
    public static void processData(String data) {  // No throws needed
        if (data == null) {
            throw new IllegalArgumentException("Data is null");  // Unchecked
        }
        System.out.println(data.toUpperCase());
    }

    // Only declare checked exceptions actually thrown
    public static void readFile(String filename)
            throws FileNotFoundException {  // Actually thrown
        FileReader file = new FileReader(filename);
    }
}
```

**Why:** Accurate `throws` clause documents true exceptions; prevents unnecessary handling.

**💡 Tip:** Only declare checked exceptions actually thrown by method or propagated.

---

#### ❌ Wrong - Widening Exception Types in Overriding:
```java
// WRONG - Overriding method declares broader exception
import java.io.*;

class Parent {
    public void process() throws IOException {
        // ...
    }
}

class Child extends Parent {
    @Override
    public void process() throws Exception {  // Compilation error! Broader than parent
        // ...
    }
}
```
**Issue:** Overriding method cannot declare broader checked exceptions than parent method

#### ✅ Right:
```java
// CORRECT - Same, narrower, or no exceptions
import java.io.*;

class Parent {
    public void process() throws IOException {
        // ...
    }
}

class Child extends Parent {
    // Option 1: Same exception
    @Override
    public void process() throws IOException {
        // ...
    }

    // Option 2: Narrower exception
    @Override
    public void process() throws FileNotFoundException {  // Subclass of IOException - OK
        // ...
    }

    // Option 3: No exception
    @Override
    public void process() {  // No throws - OK
        // Handle IOException internally
    }

    // Option 4: Add unchecked exceptions (allowed)
    @Override
    public void process() throws IOException, IllegalArgumentException {  // Unchecked OK
        // ...
    }
}
```

**Why:** Liskov Substitution Principle: subclass must not weaken parent's contract.

**💡 Tip:** Override can declare: same, narrower checked, or any unchecked exceptions.

---

### 10. Custom Exception Design Mistakes

#### ❌ Wrong - Creating Too Many Custom Exceptions:
```java
// WRONG - Excessive granularity
class UserNotFoundException extends Exception { }
class UsernameTooShortException extends Exception { }
class UsernameTooLongException extends Exception { }
class UsernameInvalidCharException extends Exception { }
class EmailMissingAtException extends Exception { }
class EmailMissingDotException extends Exception { }
class AgeNegativeException extends Exception { }
class AgeTooYoungException extends Exception { }
class AgeTooOldException extends Exception { }
// ... 50 more exceptions

public class Main {
    public static void validateUser(User user)
            throws UserNotFoundException, UsernameTooShortException,
                   UsernameTooLongException, UsernameInvalidCharException,
                   EmailMissingAtException, EmailMissingDotException,
                   AgeNegativeException, AgeTooYoungException, AgeTooOldException {
        // Validation with specific exception for each error
    }
}
```
**Issue:** Too many custom exceptions makes API complex; hard to handle

#### ✅ Right:
```java
// CORRECT - Appropriate granularity with error codes
class ValidationException extends Exception {
    public enum ErrorCode {
        USERNAME_TOO_SHORT,
        USERNAME_TOO_LONG,
        USERNAME_INVALID_CHARS,
        EMAIL_INVALID_FORMAT,
        AGE_OUT_OF_RANGE
    }

    private final ErrorCode errorCode;
    private final String fieldName;

    public ValidationException(ErrorCode errorCode, String fieldName, String message) {
        super(message);
        this.errorCode = errorCode;
        this.fieldName = fieldName;
    }

    public ErrorCode getErrorCode() { return errorCode; }
    public String getFieldName() { return fieldName; }
}

public class Main {
    public static void validateUser(User user) throws ValidationException {
        if (user.getUsername().length() < 3) {
            throw new ValidationException(
                ValidationException.ErrorCode.USERNAME_TOO_SHORT,
                "username",
                "Username must be at least 3 characters"
            );
        }
        // ... other validations
    }

    public static void main(String[] args) {
        try {
            validateUser(new User("ab", "email", 20));
        } catch (ValidationException e) {
            System.out.println("Field: " + e.getFieldName());
            System.out.println("Error: " + e.getErrorCode());
            System.out.println("Message: " + e.getMessage());

            // Can handle specific errors if needed
            if (e.getErrorCode() == ValidationException.ErrorCode.USERNAME_TOO_SHORT) {
                // Specific handling
            }
        }
    }
}

class User {
    private String username, email;
    private int age;
    public User(String u, String e, int a) { username = u; email = e; age = a; }
    public String getUsername() { return username; }
}
```

**Why:** Few well-designed exceptions with error codes > many specific exception classes.

**💡 Tip:** Use error codes/enums for variants; reserve custom exceptions for distinct error categories.

---

#### ❌ Wrong - Custom Exception Without Meaningful toString():
```java
// WRONG - Default toString not helpful
class DataException extends Exception {
    private String dataType;
    private int errorCount;

    public DataException(String message, String dataType, int errorCount) {
        super(message);
        this.dataType = dataType;
        this.errorCount = errorCount;
    }

    // No toString override - loses dataType and errorCount in output
}

public class Main {
    public static void main(String[] args) {
        try {
            throw new DataException("Validation failed", "User", 5);
        } catch (DataException e) {
            System.out.println(e);  // Only shows: DataException: Validation failed
            // Lost dataType and errorCount!
        }
    }
}
```
**Issue:** Additional exception state not shown in toString(); important context lost

#### ✅ Right:
```java
// CORRECT - Override toString for complete info
class DataException extends Exception {
    private final String dataType;
    private final int errorCount;

    public DataException(String message, String dataType, int errorCount) {
        super(message);
        this.dataType = dataType;
        this.errorCount = errorCount;
    }

    public String getDataType() { return dataType; }
    public int getErrorCount() { return errorCount; }

    @Override
    public String toString() {
        return String.format("%s: %s [DataType: %s, ErrorCount: %d]",
            getClass().getName(),
            getMessage(),
            dataType,
            errorCount);
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            throw new DataException("Validation failed", "User", 5);
        } catch (DataException e) {
            System.out.println(e);
            // Shows: DataException: Validation failed [DataType: User, ErrorCount: 5]

            // Can also access fields directly
            System.out.println("Type: " + e.getDataType());
            System.out.println("Errors: " + e.getErrorCount());
        }
    }
}
```

**Why:** toString() used in logging/debugging; should include all relevant exception state.

**💡 Tip:** Override toString() in custom exceptions to include all additional fields.

---

This comprehensive list contains **40+ Exception Handling Part 2 mistakes** covering all fundamental concepts!

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