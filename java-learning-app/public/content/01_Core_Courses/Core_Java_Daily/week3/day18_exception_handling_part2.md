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

## 💻 Practical Exercises

### Exercise 1: Custom Validation Framework

**📝 Problem Statement:**
Create a user registration validation system demonstrating custom checked exceptions for different validation failures, multi-catch exception handling, and proper exception message formatting. The system should validate email format and password strength, throwing specific custom exceptions for each validation rule violation with detailed error messages.

**Requirements:**
- Create EmailValidationException extending Exception (checked exception)
- Create PasswordValidationException extending Exception (checked exception)
- EmailValidationException should include the invalid email in the message
- PasswordValidationException should specify which validation rule failed
- Implement validateEmail(String email) method throwing EmailValidationException if:
  - Email is null
  - Email doesn't contain "@" symbol
  - Email doesn't contain "." (dot)
- Implement validatePassword(String password) method throwing PasswordValidationException if:
  - Password is null or less than 8 characters
  - Password doesn't contain at least one uppercase letter
  - Password doesn't contain at least one digit
- Create registerUser(String email, String password) method that:
  - Calls both validation methods
  - Uses multi-catch to handle both exception types
  - Prints success message if validation passes
  - Prints failure message with exception details if validation fails
- Test with valid credentials, invalid email, and weak password

**Sample Test Cases:**
```
Input: registerUser("test@email.com", "Password123")
Expected Output:
User registered successfully!

Input: registerUser("invalid-email", "Password123")
Expected Output:
Registration failed: Invalid email format: invalid-email

Input: registerUser("test@email.com", "weak")
Expected Output:
Registration failed: Password validation failed: Must be at least 8 characters

Input: registerUser("test@email.com", "password")
Expected Output:
Registration failed: Password validation failed: Must contain uppercase letter

Input: registerUser("test@email.com", "Password")
Expected Output:
Registration failed: Password validation failed: Must contain digit
```

**Solution:**
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

**💡 Tips:**
- Custom checked exceptions: Extend Exception for validation errors that caller should handle
- Exception constructors: Pass descriptive messages to super() constructor for clear error reporting
- Multi-catch syntax: Use `catch (Exception1 | Exception2 e)` to handle multiple exception types with same logic
- throws keyword: Methods declare checked exceptions they might throw using throws clause
- Validation order: validateEmail first, then validatePassword - fails fast on first error
- Regular expressions: Use matches() with regex patterns to check for uppercase letters and digits
- Exception messages: Include context (invalid value, specific rule violated) for debugging
- Method separation: Separate validation logic into dedicated methods for reusability and clarity

### Exercise 2: File Processing with Exception Handling

**📝 Problem Statement:**
Create a file processing system demonstrating exception wrapping, exception chaining with causes, proper resource cleanup in finally blocks, and handling multiple exception types. The system should read lines from an input file, transform them (add line numbers and convert to uppercase), and write to an output file, properly handling all potential I/O errors with custom exceptions that preserve the original cause.

**Requirements:**
- Create FileProcessingException extending Exception (checked exception)
- FileProcessingException must have constructor accepting message and cause (Throwable)
- Implement processFile(String inputFile, String outputFile) method that:
  - Reads from inputFile using BufferedReader
  - Writes to outputFile using BufferedWriter
  - Transforms each line: adds line number prefix and converts to uppercase
  - Wraps FileNotFoundException in FileProcessingException with specific message
  - Wraps other IOExceptions in FileProcessingException with generic message
  - Preserves original exception as cause for debugging
  - Closes both reader and writer in finally block
  - Handles close() exceptions separately without masking original exception
- Main method should catch FileProcessingException and display both message and cause
- Demonstrate exception chaining: FileProcessingException → IOException/FileNotFoundException
- Use finally block for resource cleanup (not try-with-resources for this exercise)

**Sample Test Cases:**
```
Input: processFile("input.txt", "output.txt") [input.txt exists with content]
File content:
hello world
java programming
exception handling

Expected Output:
File processed successfully

Output file content:
1: HELLO WORLD
2: JAVA PROGRAMMING
3: EXCEPTION HANDLING

Input: processFile("missing.txt", "output.txt") [file doesn't exist]
Expected Output:
Processing failed: Input file not found: missing.txt
Caused by: missing.txt (No such file or directory)

Input: processFile("input.txt", "/readonly/output.txt") [write permission denied]
Expected Output:
Processing failed: Error processing file
Caused by: /readonly/output.txt (Permission denied)
```

**Solution:**
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

**💡 Tips:**
- Exception wrapping: Catch low-level IOException and wrap in domain-specific FileProcessingException
- Exception chaining: Pass original exception as cause to preserve full error context and stack trace
- getCause() method: Access wrapped exception to display or handle root cause separately
- finally block: Executes regardless of exception, ensuring resources always closed
- Null checks in finally: Check if resources initialized before closing to avoid NullPointerException
- Nested try-catch in finally: Catch close() exceptions separately to avoid masking original exception
- Specific vs generic catch: FileNotFoundException caught separately for specific error message
- Resource cleanup order: Close in reverse order of creation (writer before reader)
- Exception message context: Include filename in exception message for debugging
- throws declaration: Method declares FileProcessingException forcing caller to handle

---

### Exercise 3: E-Commerce Order Processing with Custom Exception Hierarchy

**📝 Problem Statement:**
Create an e-commerce order processing system demonstrating custom exception hierarchy with both checked and unchecked exceptions, exception inheritance, specific error handling for different business scenarios, and proper exception propagation through multiple layers. The system should handle inventory management, payment processing, order validation, and shipping operations with appropriate custom exceptions for each domain.

**Requirements:**
- Create base exception OrderProcessingException extending Exception (checked)
- Define specific checked exceptions: InsufficientStockException, PaymentFailedException, ShippingException
- Create unchecked exception InvalidOrderException extending RuntimeException for validation errors
- InsufficientStockException should include: productId, requestedQuantity, availableQuantity
- PaymentFailedException should include: transactionId, amount, paymentMethod, failureReason
- ShippingException should include: orderId, destination, carrier
- InvalidOrderException should include: orderId, validationErrors (List<String>)
- Implement Order class with fields: orderId, customerId, items (Map<String, Integer>), totalAmount
- Create InventoryManager with checkStock(String productId, int quantity) throwing InsufficientStockException
- Implement PaymentProcessor with processPayment(String customerId, double amount) throwing PaymentFailedException
- Add ShippingService with scheduleShipment(Order order) throwing ShippingException
- Create OrderService orchestrating full order processing: validateOrder → checkInventory → processPayment → scheduleShipping
- Each layer should catch lower-level exceptions, add context, and rethrow wrapped exceptions
- Demonstrate exception chaining preserving original causes throughout call stack
- Include comprehensive error messages with all relevant context for debugging

**Sample Test Cases:**
```
Input: processOrder(order) [order with invalid items]
Expected Output:
=== Processing Order: ORD-001 ===
ERROR: Order validation failed
Exception: InvalidOrderException
Validation Errors:
- Order must have at least one item
- Customer ID cannot be empty
Order processing aborted

Input: processOrder(order) [insufficient stock for product]
Expected Output:
=== Processing Order: ORD-002 ===
Validating order...
Order validation passed ✓
Checking inventory...
ERROR: Insufficient stock
Exception: InsufficientStockException
Product ID: PROD-123
Requested: 10 units
Available: 5 units
Shortfall: 5 units
Order processing failed: Cannot fulfill order due to stock shortage

Input: processOrder(order) [payment failure]
Expected Output:
=== Processing Order: ORD-003 ===
Validating order...
Order validation passed ✓
Checking inventory...
Inventory check passed ✓
Processing payment...
ERROR: Payment failed
Exception: PaymentFailedException
Transaction ID: TXN-456
Amount: $125.50
Payment Method: Credit Card
Reason: Card declined by issuer
Caused by: ConnectionException: Bank API connection timeout
Order processing failed: Payment could not be completed

Input: processOrder(order) [shipping failure]
Expected Output:
=== Processing Order: ORD-004 ===
Validating order...
Order validation passed ✓
Checking inventory...
Inventory check passed ✓
Processing payment...
Payment successful: TXN-789 ($125.50)
Scheduling shipment...
ERROR: Shipping failed
Exception: ShippingException
Order ID: ORD-004
Destination: 123 Main St, City, State 12345
Carrier: FastShip Express
Reason: No available carrier for destination
Order partially completed: Payment processed, shipping pending
Manual intervention required

Input: processOrder(order) [successful processing]
Expected Output:
=== Processing Order: ORD-005 ===
Validating order...
Order validation passed ✓
Checking inventory...
Inventory check passed ✓
Processing payment...
Payment successful: TXN-790 ($89.99)
Scheduling shipment...
Shipment scheduled: SHIP-101 via FastShip Express
Expected delivery: 2024-01-15
Order processing completed successfully!
```

**Solution:**
```java
import java.util.*;

// ============= Custom Exception Hierarchy =============

// Base checked exception for order processing
class OrderProcessingException extends Exception {
    public OrderProcessingException(String message) {
        super(message);
    }

    public OrderProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}

// Specific checked exception for stock issues
class InsufficientStockException extends OrderProcessingException {
    private final String productId;
    private final int requestedQuantity;
    private final int availableQuantity;

    public InsufficientStockException(String productId, int requested, int available) {
        super(String.format("Insufficient stock for product %s. Requested: %d, Available: %d",
            productId, requested, available));
        this.productId = productId;
        this.requestedQuantity = requested;
        this.availableQuantity = available;
    }

    public String getProductId() { return productId; }
    public int getRequestedQuantity() { return requestedQuantity; }
    public int getAvailableQuantity() { return availableQuantity; }
    public int getShortfall() { return requestedQuantity - availableQuantity; }
}

// Specific checked exception for payment failures
class PaymentFailedException extends OrderProcessingException {
    private final String transactionId;
    private final double amount;
    private final String paymentMethod;
    private final String failureReason;

    public PaymentFailedException(String txnId, double amount, String method, String reason, Throwable cause) {
        super(String.format("Payment failed. Transaction: %s, Amount: $%.2f, Method: %s, Reason: %s",
            txnId, amount, method, reason), cause);
        this.transactionId = txnId;
        this.amount = amount;
        this.paymentMethod = method;
        this.failureReason = reason;
    }

    public String getTransactionId() { return transactionId; }
    public double getAmount() { return amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getFailureReason() { return failureReason; }
}

// Specific checked exception for shipping issues
class ShippingException extends OrderProcessingException {
    private final String orderId;
    private final String destination;
    private final String carrier;

    public ShippingException(String orderId, String destination, String carrier, String reason) {
        super(String.format("Shipping failed for order %s to %s via %s. Reason: %s",
            orderId, destination, carrier, reason));
        this.orderId = orderId;
        this.destination = destination;
        this.carrier = carrier;
    }

    public String getOrderId() { return orderId; }
    public String getDestination() { return destination; }
    public String getCarrier() { return carrier; }
}

// Unchecked exception for validation errors (programming errors)
class InvalidOrderException extends RuntimeException {
    private final String orderId;
    private final List<String> validationErrors;

    public InvalidOrderException(String orderId, List<String> errors) {
        super("Order validation failed for order: " + orderId);
        this.orderId = orderId;
        this.validationErrors = new ArrayList<>(errors);
    }

    public String getOrderId() { return orderId; }
    public List<String> getValidationErrors() {
        return Collections.unmodifiableList(validationErrors);
    }
}

// ============= Domain Classes =============

class Order {
    private String orderId;
    private String customerId;
    private Map<String, Integer> items;  // productId -> quantity
    private double totalAmount;
    private String shippingAddress;

    public Order(String orderId, String customerId, String shippingAddress) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.shippingAddress = shippingAddress;
        this.items = new HashMap<>();
        this.totalAmount = 0.0;
    }

    public void addItem(String productId, int quantity, double price) {
        items.put(productId, quantity);
        totalAmount += quantity * price;
    }

    public String getOrderId() { return orderId; }
    public String getCustomerId() { return customerId; }
    public Map<String, Integer> getItems() { return items; }
    public double getTotalAmount() { return totalAmount; }
    public String getShippingAddress() { return shippingAddress; }
}

// ============= Service Layer Classes =============

class InventoryManager {
    private Map<String, Integer> stock;  // productId -> quantity

    public InventoryManager() {
        this.stock = new HashMap<>();
        // Initialize with some stock
        stock.put("PROD-001", 10);
        stock.put("PROD-002", 5);
        stock.put("PROD-003", 0);
    }

    public void checkStock(String productId, int quantity) throws InsufficientStockException {
        int available = stock.getOrDefault(productId, 0);
        if (available < quantity) {
            throw new InsufficientStockException(productId, quantity, available);
        }
    }

    public void reserveStock(String productId, int quantity) {
        int current = stock.get(productId);
        stock.put(productId, current - quantity);
    }
}

class PaymentProcessor {
    private Random random = new Random();

    public String processPayment(String customerId, double amount) throws PaymentFailedException {
        String transactionId = "TXN-" + (random.nextInt(900) + 100);

        // Simulate payment processing
        if (random.nextInt(10) < 2) {  // 20% failure rate for demo
            Throwable cause = new Exception("Bank API connection timeout");
            throw new PaymentFailedException(
                transactionId,
                amount,
                "Credit Card",
                "Card declined by issuer",
                cause
            );
        }

        return transactionId;
    }
}

class ShippingService {
    public String scheduleShipment(Order order) throws ShippingException {
        // Simulate shipping scheduling
        if (order.getShippingAddress() == null || order.getShippingAddress().isEmpty()) {
            throw new ShippingException(
                order.getOrderId(),
                order.getShippingAddress(),
                "FastShip Express",
                "Invalid shipping address"
            );
        }

        return "SHIP-" + (new Random().nextInt(900) + 100);
    }
}

class OrderService {
    private InventoryManager inventoryManager;
    private PaymentProcessor paymentProcessor;
    private ShippingService shippingService;

    public OrderService() {
        this.inventoryManager = new InventoryManager();
        this.paymentProcessor = new PaymentProcessor();
        this.shippingService = new ShippingService();
    }

    public void processOrder(Order order) throws OrderProcessingException {
        System.out.println("\n=== Processing Order: " + order.getOrderId() + " ===");

        try {
            // Step 1: Validate order (throws unchecked exception)
            System.out.println("Validating order...");
            validateOrder(order);
            System.out.println("Order validation passed ✓");

            // Step 2: Check inventory (throws InsufficientStockException)
            System.out.println("Checking inventory...");
            checkInventory(order);
            System.out.println("Inventory check passed ✓");

            // Step 3: Process payment (throws PaymentFailedException)
            System.out.println("Processing payment...");
            String transactionId = paymentProcessor.processPayment(
                order.getCustomerId(),
                order.getTotalAmount()
            );
            System.out.println("Payment successful: " + transactionId +
                " ($" + String.format("%.2f", order.getTotalAmount()) + ")");

            // Step 4: Schedule shipment (throws ShippingException)
            System.out.println("Scheduling shipment...");
            String shipmentId = shippingService.scheduleShipment(order);
            System.out.println("Shipment scheduled: " + shipmentId + " via FastShip Express");
            System.out.println("Expected delivery: 2024-01-15");

            System.out.println("Order processing completed successfully!");

        } catch (InvalidOrderException e) {
            System.out.println("ERROR: Order validation failed");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Validation Errors:");
            for (String error : e.getValidationErrors()) {
                System.out.println("- " + error);
            }
            System.out.println("Order processing aborted");
            throw new OrderProcessingException("Order validation failed", e);

        } catch (InsufficientStockException e) {
            System.out.println("ERROR: Insufficient stock");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Product ID: " + e.getProductId());
            System.out.println("Requested: " + e.getRequestedQuantity() + " units");
            System.out.println("Available: " + e.getAvailableQuantity() + " units");
            System.out.println("Shortfall: " + e.getShortfall() + " units");
            System.out.println("Order processing failed: Cannot fulfill order due to stock shortage");
            throw e;  // Rethrow

        } catch (PaymentFailedException e) {
            System.out.println("ERROR: Payment failed");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Transaction ID: " + e.getTransactionId());
            System.out.println("Amount: $" + String.format("%.2f", e.getAmount()));
            System.out.println("Payment Method: " + e.getPaymentMethod());
            System.out.println("Reason: " + e.getFailureReason());
            if (e.getCause() != null) {
                System.out.println("Caused by: " + e.getCause().getClass().getSimpleName() +
                    ": " + e.getCause().getMessage());
            }
            System.out.println("Order processing failed: Payment could not be completed");
            throw e;  // Rethrow

        } catch (ShippingException e) {
            System.out.println("ERROR: Shipping failed");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Order ID: " + e.getOrderId());
            System.out.println("Destination: " + e.getDestination());
            System.out.println("Carrier: " + e.getCarrier());
            System.out.println("Reason: " + e.getMessage());
            System.out.println("Order partially completed: Payment processed, shipping pending");
            System.out.println("Manual intervention required");
            throw e;  // Rethrow
        }
    }

    private void validateOrder(Order order) {
        List<String> errors = new ArrayList<>();

        if (order.getItems().isEmpty()) {
            errors.add("Order must have at least one item");
        }
        if (order.getCustomerId() == null || order.getCustomerId().isEmpty()) {
            errors.add("Customer ID cannot be empty");
        }
        if (order.getTotalAmount() <= 0) {
            errors.add("Order total must be greater than zero");
        }

        if (!errors.isEmpty()) {
            throw new InvalidOrderException(order.getOrderId(), errors);
        }
    }

    private void checkInventory(Order order) throws InsufficientStockException {
        for (Map.Entry<String, Integer> item : order.getItems().entrySet()) {
            inventoryManager.checkStock(item.getKey(), item.getValue());
        }
    }
}

public class TestOrderProcessing {
    public static void main(String[] args) {
        OrderService orderService = new OrderService();

        // Test 1: Valid order
        Order order1 = new Order("ORD-001", "CUST-123", "123 Main St, City, State 12345");
        order1.addItem("PROD-001", 2, 25.99);
        order1.addItem("PROD-002", 1, 37.99);

        try {
            orderService.processOrder(order1);
        } catch (OrderProcessingException e) {
            System.out.println("\nOrder processing exception occurred");
        }

        // Test 2: Invalid order (no items)
        Order order2 = new Order("ORD-002", "CUST-124", "456 Elm St");

        try {
            orderService.processOrder(order2);
        } catch (OrderProcessingException e) {
            System.out.println("\nExpected exception for invalid order");
        }

        // Test 3: Insufficient stock
        Order order3 = new Order("ORD-003", "CUST-125", "789 Oak Ave");
        order3.addItem("PROD-003", 10, 15.99);  // PROD-003 has 0 stock

        try {
            orderService.processOrder(order3);
        } catch (OrderProcessingException e) {
            System.out.println("\nExpected exception for insufficient stock");
        }
    }
}
```

**💡 Tips:**
- Custom exception hierarchy: base exception (OrderProcessingException) with specific subclasses for different error types
- Checked vs unchecked: OrderProcessingException checked (recoverable), InvalidOrderException unchecked (programming error)
- Exception chaining: PaymentFailedException wraps ConnectionException preserving root cause with getCause()
- Exception state: Each custom exception carries domain-specific data (productId, transactionId, etc.) for debugging
- Exception propagation: OrderService catches, logs, adds context, and rethrows exceptions up the call stack
- Multi-catch not used here - each exception type handled separately for specific error messages
- throws declaration: Each method declares specific checked exceptions it might throw
- Validation errors: InvalidOrderException uses List<String> to accumulate multiple validation failures
- Exception messages: Include all relevant context (IDs, amounts, reasons) for effective debugging
- finally not needed here - no resources to clean up, but demonstrate exception handling patterns
- Defensive copying: getValidationErrors() returns unmodifiable list preventing external modification
- RuntimeException for validation: Programming errors (empty order) shouldn't require throws declaration

---

### Exercise 4: Multi-Tier Application with Exception Propagation

**📝 Problem Statement:**
Create a multi-tier application architecture (Presentation → Business → Data layers) demonstrating proper exception handling at each tier, exception propagation through layers using throws keyword, exception wrapping for layer boundaries, and proper use of checked vs unchecked exceptions. The system should show how exceptions flow from data access layer through business logic to presentation layer with appropriate transformations and context additions at each level.

**Requirements:**
- Create three layers: DataAccessLayer, BusinessLogicLayer, PresentationLayer
- **Data Access Layer**: UserDAO with methods getUserById, saveUser, deleteUser throwing DataAccessException (checked)
- DataAccessException should include: operation, entityType, entityId, rootCause
- Simulate database exceptions: DatabaseConnectionException, RecordNotFoundException, DuplicateKeyException
- **Business Logic Layer**: UserService with methods: registerUser, loginUser, updateProfile
- Business layer wraps DataAccessException in BusinessException with business context
- BusinessException should include: operation, userId, businessReason, underlyingCause
- Implement business rules throwing BusinessValidationException (unchecked) for invalid inputs
- **Presentation Layer**: UserController processing requests and displaying user-friendly error messages
- Each layer should: catch exceptions from lower layer, add layer-specific context, decide whether to handle or propagate
- Demonstrate throws keyword usage: methods declare checked exceptions they propagate
- Show exception transformation: DataAccessException → BusinessException → User-facing message
- Include proper exception chaining maintaining full stack trace throughout layers
- Log exceptions at each layer with layer-specific details
- Handle both recoverable (checked) and programming errors (unchecked) appropriately

**Sample Test Cases:**
```
Input: userController.registerUser("alice@example.com", "password123")
Expected Output:
=== Registration Request ===
[Presentation Layer] Processing registration for: alice@example.com
[Business Layer] Validating user data...
[Business Layer] Validation passed
[Business Layer] Saving user to database...
[Data Access Layer] Executing INSERT for User: alice@example.com
[Data Access Layer] User saved successfully
[Business Layer] User registered successfully
[Presentation Layer] SUCCESS: User registered
User ID: USER-001
Welcome email sent

Input: userController.registerUser("", "weak") [invalid input]
Expected Output:
=== Registration Request ===
[Presentation Layer] Processing registration for:
[Business Layer] Validating user data...
ERROR: Validation failed
Exception: BusinessValidationException (Unchecked)
Validation errors:
- Email cannot be empty
- Password too short (minimum 8 characters)
[Presentation Layer] Registration failed
Error: Invalid user data provided
Please correct the errors and try again

Input: userController.registerUser("alice@example.com", "password") [duplicate email]
Expected Output:
=== Registration Request ===
[Presentation Layer] Processing registration for: alice@example.com
[Business Layer] Validating user data...
[Business Layer] Validation passed
[Business Layer] Saving user to database...
[Data Access Layer] Executing INSERT for User: alice@example.com
[Data Access Layer] ERROR: Duplicate key
Exception: DuplicateKeyException
Entity: User
Key: alice@example.com
[Business Layer] ERROR: User already exists
Exception: BusinessException
Operation: REGISTER_USER
User: alice@example.com
Reason: Email already registered in system
Caused by: DuplicateKeyException
[Presentation Layer] Registration failed
Error: Email address already in use
Please use a different email or try logging in

Input: userController.loginUser("bob@example.com", "password") [user not found]
Expected Output:
=== Login Request ===
[Presentation Layer] Processing login for: bob@example.com
[Business Layer] Authenticating user...
[Business Layer] Fetching user from database...
[Data Access Layer] Executing SELECT for User: bob@example.com
[Data Access Layer] ERROR: Record not found
Exception: RecordNotFoundException
Entity: User
ID: bob@example.com
[Business Layer] ERROR: Authentication failed
Exception: BusinessException
Operation: LOGIN
User: bob@example.com
Reason: User not found in system
Caused by: RecordNotFoundException
[Presentation Layer] Login failed
Error: Invalid email or password
Please check your credentials and try again

Input: userController.getUserProfile("USER-123") [database connection failure]
Expected Output:
=== Get Profile Request ===
[Presentation Layer] Fetching profile for: USER-123
[Business Layer] Retrieving user profile...
[Data Access Layer] Executing SELECT for User: USER-123
[Data Access Layer] ERROR: Database connection failed
Exception: DatabaseConnectionException
Server: localhost:5432
Database: userdb
Reason: Connection timeout after 30 seconds
[Business Layer] ERROR: Data access failed
Exception: BusinessException
Operation: GET_PROFILE
User: USER-123
Reason: Unable to retrieve user data from database
Caused by: DatabaseConnectionException
[Presentation Layer] Profile retrieval failed
Error: Service temporarily unavailable
Please try again in a few moments
```

**Solution:**
```java
import java.util.*;

// ============= Data Access Layer Exceptions =============

class DataAccessException extends Exception {
    private final String operation;
    private final String entityType;
    private final String entityId;

    public DataAccessException(String operation, String entityType, String entityId, String message) {
        super(message);
        this.operation = operation;
        this.entityType = entityType;
        this.entityId = entityId;
    }

    public DataAccessException(String operation, String entityType, String entityId, String message, Throwable cause) {
        super(message, cause);
        this.operation = operation;
        this.entityType = entityType;
        this.entityId = entityId;
    }

    public String getOperation() { return operation; }
    public String getEntityType() { return entityType; }
    public String getEntityId() { return entityId; }
}

class DatabaseConnectionException extends DataAccessException {
    private final String server;
    private final String database;

    public DatabaseConnectionException(String server, String database, String reason) {
        super("CONNECT", "Database", database, "Database connection failed: " + reason);
        this.server = server;
        this.database = database;
    }

    public String getServer() { return server; }
    public String getDatabase() { return database; }
}

class RecordNotFoundException extends DataAccessException {
    public RecordNotFoundException(String entityType, String entityId) {
        super("SELECT", entityType, entityId,
            String.format("Record not found: %s with ID %s", entityType, entityId));
    }
}

class DuplicateKeyException extends DataAccessException {
    public DuplicateKeyException(String entityType, String key) {
        super("INSERT", entityType, key,
            String.format("Duplicate key violation: %s already exists with key %s", entityType, key));
    }
}

// ============= Business Layer Exceptions =============

class BusinessException extends Exception {
    private final String operation;
    private final String userId;
    private final String businessReason;

    public BusinessException(String operation, String userId, String businessReason, Throwable cause) {
        super(String.format("Business operation failed: %s for user %s. Reason: %s",
            operation, userId, businessReason), cause);
        this.operation = operation;
        this.userId = userId;
        this.businessReason = businessReason;
    }

    public String getOperation() { return operation; }
    public String getUserId() { return userId; }
    public String getBusinessReason() { return businessReason; }
}

class BusinessValidationException extends RuntimeException {
    private final List<String> validationErrors;

    public BusinessValidationException(List<String> errors) {
        super("Business validation failed");
        this.validationErrors = new ArrayList<>(errors);
    }

    public List<String> getValidationErrors() {
        return Collections.unmodifiableList(validationErrors);
    }
}

// ============= Domain Model =============

class User {
    private String userId;
    private String email;
    private String password;
    private String name;

    public User(String userId, String email, String password) {
        this.userId = userId;
        this.email = email;
        this.password = password;
    }

    public String getUserId() { return userId; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

// ============= Data Access Layer =============

class UserDAO {
    private Map<String, User> database = new HashMap<>();
    private Random random = new Random();

    public User getUserById(String userId) throws DataAccessException {
        System.out.println("[Data Access Layer] Executing SELECT for User: " + userId);

        // Simulate occasional connection failures (10% chance)
        if (random.nextInt(10) == 0) {
            System.out.println("[Data Access Layer] ERROR: Database connection failed");
            throw new DatabaseConnectionException(
                "localhost:5432",
                "userdb",
                "Connection timeout after 30 seconds"
            );
        }

        User user = database.get(userId);
        if (user == null) {
            System.out.println("[Data Access Layer] ERROR: Record not found");
            throw new RecordNotFoundException("User", userId);
        }

        System.out.println("[Data Access Layer] User retrieved successfully");
        return user;
    }

    public void saveUser(User user) throws DataAccessException {
        System.out.println("[Data Access Layer] Executing INSERT for User: " + user.getEmail());

        // Check for duplicate email
        for (User existingUser : database.values()) {
            if (existingUser.getEmail().equals(user.getEmail())) {
                System.out.println("[Data Access Layer] ERROR: Duplicate key");
                throw new DuplicateKeyException("User", user.getEmail());
            }
        }

        database.put(user.getUserId(), user);
        System.out.println("[Data Access Layer] User saved successfully");
    }

    public void deleteUser(String userId) throws DataAccessException {
        System.out.println("[Data Access Layer] Executing DELETE for User: " + userId);

        if (!database.containsKey(userId)) {
            throw new RecordNotFoundException("User", userId);
        }

        database.remove(userId);
        System.out.println("[Data Access Layer] User deleted successfully");
    }

    public User getUserByEmail(String email) throws DataAccessException {
        System.out.println("[Data Access Layer] Executing SELECT for User: " + email);

        for (User user : database.values()) {
            if (user.getEmail().equals(email)) {
                System.out.println("[Data Access Layer] User found");
                return user;
            }
        }

        System.out.println("[Data Access Layer] ERROR: Record not found");
        throw new RecordNotFoundException("User", email);
    }
}

// ============= Business Logic Layer =============

class UserService {
    private UserDAO userDAO;
    private int userCounter = 1;

    public UserService() {
        this.userDAO = new UserDAO();
    }

    public String registerUser(String email, String password) throws BusinessException {
        System.out.println("[Business Layer] Validating user data...");

        // Validate input (throws unchecked exception for programming errors)
        validateRegistrationData(email, password);
        System.out.println("[Business Layer] Validation passed");

        try {
            System.out.println("[Business Layer] Saving user to database...");

            String userId = "USER-" + String.format("%03d", userCounter++);
            User user = new User(userId, email, password);

            userDAO.saveUser(user);

            System.out.println("[Business Layer] User registered successfully");
            return userId;

        } catch (DuplicateKeyException e) {
            System.out.println("[Business Layer] ERROR: User already exists");
            throw new BusinessException(
                "REGISTER_USER",
                email,
                "Email already registered in system",
                e
            );
        } catch (DataAccessException e) {
            System.out.println("[Business Layer] ERROR: Data access failed");
            throw new BusinessException(
                "REGISTER_USER",
                email,
                "Unable to save user to database",
                e
            );
        }
    }

    public User loginUser(String email, String password) throws BusinessException {
        System.out.println("[Business Layer] Authenticating user...");
        System.out.println("[Business Layer] Fetching user from database...");

        try {
            User user = userDAO.getUserByEmail(email);

            if (!user.getPassword().equals(password)) {
                System.out.println("[Business Layer] ERROR: Invalid password");
                throw new BusinessException(
                    "LOGIN",
                    email,
                    "Invalid credentials provided",
                    null
                );
            }

            System.out.println("[Business Layer] Authentication successful");
            return user;

        } catch (RecordNotFoundException e) {
            System.out.println("[Business Layer] ERROR: Authentication failed");
            throw new BusinessException(
                "LOGIN",
                email,
                "User not found in system",
                e
            );
        } catch (DataAccessException e) {
            System.out.println("[Business Layer] ERROR: Data access failed");
            throw new BusinessException(
                "LOGIN",
                email,
                "Unable to authenticate user",
                e
            );
        }
    }

    public User getUserProfile(String userId) throws BusinessException {
        System.out.println("[Business Layer] Retrieving user profile...");

        try {
            User user = userDAO.getUserById(userId);
            System.out.println("[Business Layer] Profile retrieved successfully");
            return user;

        } catch (DataAccessException e) {
            System.out.println("[Business Layer] ERROR: Data access failed");
            throw new BusinessException(
                "GET_PROFILE",
                userId,
                "Unable to retrieve user data from database",
                e
            );
        }
    }

    private void validateRegistrationData(String email, String password) {
        List<String> errors = new ArrayList<>();

        if (email == null || email.trim().isEmpty()) {
            errors.add("Email cannot be empty");
        } else if (!email.contains("@")) {
            errors.add("Email must contain @ symbol");
        }

        if (password == null || password.length() < 8) {
            errors.add("Password too short (minimum 8 characters)");
        }

        if (!errors.isEmpty()) {
            System.out.println("ERROR: Validation failed");
            throw new BusinessValidationException(errors);
        }
    }
}

// ============= Presentation Layer =============

class UserController {
    private UserService userService;

    public UserController() {
        this.userService = new UserService();
    }

    public void registerUser(String email, String password) {
        System.out.println("\n=== Registration Request ===");
        System.out.println("[Presentation Layer] Processing registration for: " + email);

        try {
            String userId = userService.registerUser(email, password);

            System.out.println("[Presentation Layer] SUCCESS: User registered");
            System.out.println("User ID: " + userId);
            System.out.println("Welcome email sent");

        } catch (BusinessValidationException e) {
            System.out.println("Exception: " + e.getClass().getSimpleName() + " (Unchecked)");
            System.out.println("Validation errors:");
            for (String error : e.getValidationErrors()) {
                System.out.println("- " + error);
            }
            System.out.println("[Presentation Layer] Registration failed");
            System.out.println("Error: Invalid user data provided");
            System.out.println("Please correct the errors and try again");

        } catch (BusinessException e) {
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Operation: " + e.getOperation());
            System.out.println("User: " + e.getUserId());
            System.out.println("Reason: " + e.getBusinessReason());

            if (e.getCause() != null) {
                System.out.println("Caused by: " + e.getCause().getClass().getSimpleName());
            }

            System.out.println("[Presentation Layer] Registration failed");

            // User-friendly message
            if (e.getCause() instanceof DuplicateKeyException) {
                System.out.println("Error: Email address already in use");
                System.out.println("Please use a different email or try logging in");
            } else {
                System.out.println("Error: Unable to complete registration");
                System.out.println("Please try again later");
            }
        }
    }

    public void loginUser(String email, String password) {
        System.out.println("\n=== Login Request ===");
        System.out.println("[Presentation Layer] Processing login for: " + email);

        try {
            User user = userService.loginUser(email, password);

            System.out.println("[Presentation Layer] SUCCESS: Login successful");
            System.out.println("Welcome back, " + user.getEmail());
            System.out.println("Session created");

        } catch (BusinessException e) {
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Operation: " + e.getOperation());
            System.out.println("User: " + e.getUserId());
            System.out.println("Reason: " + e.getBusinessReason());

            if (e.getCause() != null) {
                System.out.println("Caused by: " + e.getCause().getClass().getSimpleName());
            }

            System.out.println("[Presentation Layer] Login failed");
            System.out.println("Error: Invalid email or password");
            System.out.println("Please check your credentials and try again");
        }
    }

    public void getUserProfile(String userId) {
        System.out.println("\n=== Get Profile Request ===");
        System.out.println("[Presentation Layer] Fetching profile for: " + userId);

        try {
            User user = userService.getUserProfile(userId);

            System.out.println("[Presentation Layer] SUCCESS: Profile retrieved");
            System.out.println("User: " + user.getEmail());
            System.out.println("User ID: " + user.getUserId());

        } catch (BusinessException e) {
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Operation: " + e.getOperation());
            System.out.println("User: " + e.getUserId());
            System.out.println("Reason: " + e.getBusinessReason());

            if (e.getCause() != null) {
                Throwable cause = e.getCause();
                System.out.println("Caused by: " + cause.getClass().getSimpleName());

                if (cause instanceof DatabaseConnectionException) {
                    DatabaseConnectionException dbEx = (DatabaseConnectionException) cause;
                    System.out.println("Server: " + dbEx.getServer());
                    System.out.println("Database: " + dbEx.getDatabase());
                }
            }

            System.out.println("[Presentation Layer] Profile retrieval failed");

            // User-friendly message based on exception type
            if (e.getCause() instanceof RecordNotFoundException) {
                System.out.println("Error: User not found");
                System.out.println("Please verify the user ID");
            } else if (e.getCause() instanceof DatabaseConnectionException) {
                System.out.println("Error: Service temporarily unavailable");
                System.out.println("Please try again in a few moments");
            } else {
                System.out.println("Error: Unable to retrieve profile");
                System.out.println("Please contact support if the problem persists");
            }
        }
    }
}

public class TestMultiTierApp {
    public static void main(String[] args) {
        UserController controller = new UserController();

        // Test 1: Successful registration
        controller.registerUser("alice@example.com", "password123");

        // Test 2: Invalid input (validation error)
        controller.registerUser("", "weak");

        // Test 3: Duplicate email
        controller.registerUser("alice@example.com", "anotherpassword");

        // Test 4: Successful login
        controller.loginUser("alice@example.com", "password123");

        // Test 5: Login with non-existent user
        controller.loginUser("bob@example.com", "password");

        // Test 6: Get profile (might fail with connection error due to simulation)
        controller.getUserProfile("USER-001");
    }
}
```

**💡 Tips:**
- Layer separation: Each tier has specific responsibilities and exception types (DataAccessException, BusinessException)
- throws keyword: Methods declare checked exceptions propagated to caller (throws DataAccessException, throws BusinessException)
- Exception wrapping: Higher layers catch lower-level exceptions and wrap in layer-appropriate exceptions
- Exception chaining: Always preserve original cause when wrapping: new BusinessException(..., e)
- Checked exceptions: Used for recoverable errors that caller should handle (database failures, business logic errors)
- Unchecked exceptions: Used for programming errors that indicate bugs (BusinessValidationException for invalid input)
- Context addition: Each layer adds layer-specific context (operation, userId, business reason) to exceptions
- Exception transformation: Technical exceptions (DatabaseConnectionException) become user-friendly messages at presentation layer
- printStackTrace shows full chain: BusinessException → DataAccessException → DatabaseConnectionException
- getCause() accesses wrapped exception: useful for conditional handling based on root cause type
- Layer logging: Each layer logs exceptions with layer-specific details for troubleshooting
- User-friendly messages: Presentation layer translates technical exceptions to messages users understand
- Exception hierarchies: DataAccessException subclasses (RecordNotFoundException, DuplicateKeyException) enable specific handling

---

### Exercise 5: Advanced Configuration Management System with Complex Exception Handling

**📝 Problem Statement:**
Create an advanced configuration management system demonstrating sophisticated exception handling including custom exception hierarchies, error codes with enums, exception recovery strategies, multiple exception sources, configuration validation with detailed error reporting, and proper exception wrapping for external API calls. The system should handle configuration loading from multiple sources (files, environment variables, remote servers), validate configurations against schemas, handle parsing errors, and provide comprehensive error diagnostics.

**Requirements:**
- Create ConfigurationException hierarchy: base ConfigurationException, subclasses for specific errors
- Define ConfigurationErrorCode enum: INVALID_FORMAT, MISSING_REQUIRED, TYPE_MISMATCH, PARSE_ERROR, SOURCE_UNAVAILABLE, VALIDATION_FAILED
- Implement ConfigurationSource interface with methods: load() throws ConfigurationException
- Create multiple sources: FileConfigSource, EnvironmentConfigSource, RemoteConfigSource
- Each source should throw specific exceptions with error codes and detailed context
- ConfigurationManager orchestrates loading from multiple sources with fallback strategy
- Implement ConfigurationValidator with validate() method checking required fields, data types, value ranges
- ValidationException should aggregate multiple validation errors with field names and reasons
- RemoteConfigSource simulates network failures throwing NetworkException (checked) wrapping IOException
- FileConfigSource handles FileNotFoundException, IOException with appropriate wrapping
- Create ConfigurationParser parsing different formats (JSON-style, properties) throwing ParseException
- ParseException should include: line number, column number, expected format, actual content
- Implement retry logic for RemoteConfigSource with exponential backoff catching and handling failures
- ConfigurationManager should try multiple sources in priority order, falling back on failures
- Log all exception details at appropriate levels (ERROR for failures, WARN for fallbacks, INFO for recovery)
- Provide getDetailedErrorReport() method generating comprehensive error diagnostic including all failed attempts

**Sample Test Cases:**
```
Input: configManager.loadConfiguration() [all sources succeed]
Expected Output:
=== Loading Configuration ===
[Config Manager] Attempting to load from multiple sources...
[Config Manager] Source 1: FileConfigSource
[File Source] Reading configuration from file: config.json
[File Source] File loaded successfully
[Parser] Parsing JSON configuration...
[Parser] Parse successful
[Validator] Validating configuration...
[Validator] All validations passed ✓
[Config Manager] Configuration loaded successfully from FileConfigSource
Configuration ready: 5 properties loaded

Input: configManager.loadConfiguration() [file source fails, fallback to environment]
Expected Output:
=== Loading Configuration ===
[Config Manager] Attempting to load from multiple sources...
[Config Manager] Source 1: FileConfigSource
[File Source] Reading configuration from file: config.json
[File Source] ERROR: File not found
Exception: ConfigurationException
Error Code: SOURCE_UNAVAILABLE
Source: FileConfigSource
Message: Configuration file not found: config.json
[Config Manager] FileConfigSource failed, trying next source...
[Config Manager] Source 2: EnvironmentConfigSource
[Env Source] Reading environment variables...
[Env Source] Loaded 5 variables
[Parser] Parsing environment configuration...
[Parser] Parse successful
[Validator] Validating configuration...
[Validator] All validations passed ✓
[Config Manager] Configuration loaded successfully from EnvironmentConfigSource
Warning: Using fallback source
Configuration ready: 5 properties loaded

Input: configManager.loadConfiguration() [parse error in file]
Expected Output:
=== Loading Configuration ===
[Config Manager] Attempting to load from multiple sources...
[Config Manager] Source 1: FileConfigSource
[File Source] Reading configuration from file: config.json
[File Source] File loaded successfully
[Parser] Parsing JSON configuration...
[Parser] ERROR: Parse failed
Exception: ParseException
Error Code: PARSE_ERROR
Line: 12
Column: 45
Expected: closing brace '}'
Found: comma ','
Context: "server": { "port": 8080, , }
[Config Manager] Parse error in FileConfigSource
[Config Manager] Source 2: EnvironmentConfigSource
[Env Source] Loaded configuration
[Config Manager] Configuration loaded from fallback source
Configuration ready with warnings

Input: configManager.loadConfiguration() [validation failures]
Expected Output:
=== Loading Configuration ===
[Config Manager] Attempting to load from multiple sources...
[Config Manager] Source 1: FileConfigSource
[File Source] File loaded and parsed successfully
[Validator] Validating configuration...
[Validator] ERROR: Validation failed
Exception: ValidationException
Error Code: VALIDATION_FAILED
Validation Errors:
1. Field: server.port
   Error: Value out of range
   Expected: 1024-65535
   Found: 999999

2. Field: database.url
   Error: Missing required field
   Required: true

3. Field: timeout
   Error: Type mismatch
   Expected: integer
   Found: string ("thirty")

Configuration load failed: 3 validation errors
[Config Manager] All sources exhausted
Error: Unable to load valid configuration

Input: configManager.loadConfiguration() [remote source with retries]
Expected Output:
=== Loading Configuration ===
[Config Manager] Source: RemoteConfigSource
[Remote Source] Connecting to: https://config-server.example.com/config
[Remote Source] Attempt 1/3...
[Remote Source] ERROR: Connection timeout
Exception: NetworkException
Error Code: SOURCE_UNAVAILABLE
Server: config-server.example.com
Timeout: 30 seconds
[Remote Source] Retry 1: Waiting 2 seconds...
[Remote Source] Attempt 2/3...
[Remote Source] ERROR: Connection refused
[Remote Source] Retry 2: Waiting 4 seconds...
[Remote Source] Attempt 3/3...
[Remote Source] Connected successfully
[Remote Source] Configuration downloaded
[Config Manager] Configuration loaded after 3 attempts
Configuration ready
```

**Solution:**
```java
import java.util.*;
import java.io.*;

// ============= Error Codes =============

enum ConfigurationErrorCode {
    INVALID_FORMAT("Invalid configuration format"),
    MISSING_REQUIRED("Required field missing"),
    TYPE_MISMATCH("Type mismatch in configuration"),
    PARSE_ERROR("Configuration parsing failed"),
    SOURCE_UNAVAILABLE("Configuration source unavailable"),
    VALIDATION_FAILED("Configuration validation failed");

    private final String description;

    ConfigurationErrorCode(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}

// ============= Custom Exceptions =============

class ConfigurationException extends Exception {
    private final ConfigurationErrorCode errorCode;
    private final String source;

    public ConfigurationException(ConfigurationErrorCode errorCode, String source, String message) {
        super(message);
        this.errorCode = errorCode;
        this.source = source;
    }

    public ConfigurationException(ConfigurationErrorCode errorCode, String source, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        this.source = source;
    }

    public ConfigurationErrorCode getErrorCode() {
        return errorCode;
    }

    public String getSource() {
        return source;
    }

    @Override
    public String toString() {
        return String.format("%s [%s]: %s (Source: %s)",
            getClass().getSimpleName(),
            errorCode,
            getMessage(),
            source);
    }
}

class ParseException extends ConfigurationException {
    private final int lineNumber;
    private final int columnNumber;
    private final String expected;
    private final String found;
    private final String context;

    public ParseException(String source, int line, int column, String expected, String found, String context) {
        super(ConfigurationErrorCode.PARSE_ERROR, source,
            String.format("Parse error at line %d, column %d. Expected: %s, Found: %s",
                line, column, expected, found));
        this.lineNumber = line;
        this.columnNumber = column;
        this.expected = expected;
        this.found = found;
        this.context = context;
    }

    public int getLineNumber() { return lineNumber; }
    public int getColumnNumber() { return columnNumber; }
    public String getExpected() { return expected; }
    public String getFound() { return found; }
    public String getContext() { return context; }
}

class ValidationException extends ConfigurationException {
    private final List<ValidationError> validationErrors;

    public ValidationException(String source, List<ValidationError> errors) {
        super(ConfigurationErrorCode.VALIDATION_FAILED, source,
            String.format("Configuration validation failed with %d error(s)", errors.size()));
        this.validationErrors = new ArrayList<>(errors);
    }

    public List<ValidationError> getValidationErrors() {
        return Collections.unmodifiableList(validationErrors);
    }
}

class NetworkException extends ConfigurationException {
    private final String server;
    private final int timeout;

    public NetworkException(String server, int timeout, String message, Throwable cause) {
        super(ConfigurationErrorCode.SOURCE_UNAVAILABLE, "RemoteConfigSource", message, cause);
        this.server = server;
        this.timeout = timeout;
    }

    public String getServer() { return server; }
    public int getTimeout() { return timeout; }
}

// ============= Supporting Classes =============

class ValidationError {
    private final String fieldName;
    private final String errorMessage;
    private final String expected;
    private final String found;

    public ValidationError(String fieldName, String errorMessage, String expected, String found) {
        this.fieldName = fieldName;
        this.errorMessage = errorMessage;
        this.expected = expected;
        this.found = found;
    }

    public String getFieldName() { return fieldName; }
    public String getErrorMessage() { return errorMessage; }
    public String getExpected() { return expected; }
    public String getFound() { return found; }

    @Override
    public String toString() {
        return String.format("Field: %s\n   Error: %s\n   Expected: %s\n   Found: %s",
            fieldName, errorMessage, expected, found);
    }
}

class Configuration {
    private Map<String, Object> properties;

    public Configuration() {
        this.properties = new HashMap<>();
    }

    public void setProperty(String key, Object value) {
        properties.put(key, value);
    }

    public Object getProperty(String key) {
        return properties.get(key);
    }

    public Map<String, Object> getAllProperties() {
        return new HashMap<>(properties);
    }

    public int size() {
        return properties.size();
    }
}

// ============= Configuration Sources =============

interface ConfigurationSource {
    Configuration load() throws ConfigurationException;
    String getSourceName();
}

class FileConfigSource implements ConfigurationSource {
    private String filename;
    private Random random = new Random();

    public FileConfigSource(String filename) {
        this.filename = filename;
    }

    @Override
    public Configuration load() throws ConfigurationException {
        System.out.println("[File Source] Reading configuration from file: " + filename);

        try {
            // Simulate file reading (20% chance of file not found)
            if (random.nextInt(5) == 0) {
                System.out.println("[File Source] ERROR: File not found");
                throw new ConfigurationException(
                    ConfigurationErrorCode.SOURCE_UNAVAILABLE,
                    "FileConfigSource",
                    "Configuration file not found: " + filename
                );
            }

            System.out.println("[File Source] File loaded successfully");

            // Simulate parsing (10% chance of parse error)
            if (random.nextInt(10) == 0) {
                System.out.println("[Parser] ERROR: Parse failed");
                throw new ParseException(
                    "FileConfigSource",
                    12,
                    45,
                    "closing brace '}'",
                    "comma ','",
                    "\"server\": { \"port\": 8080, , }"
                );
            }

            System.out.println("[Parser] Parsing JSON configuration...");
            System.out.println("[Parser] Parse successful");

            Configuration config = new Configuration();
            config.setProperty("server.port", 8080);
            config.setProperty("server.host", "localhost");
            config.setProperty("database.url", "jdbc:mysql://localhost/db");
            config.setProperty("timeout", 30);
            config.setProperty("debug", true);

            return config;

        } catch (ParseException e) {
            throw e;  // Rethrow parse exception
        }
    }

    @Override
    public String getSourceName() {
        return "FileConfigSource";
    }
}

class EnvironmentConfigSource implements ConfigurationSource {
    @Override
    public Configuration load() throws ConfigurationException {
        System.out.println("[Env Source] Reading environment variables...");
        System.out.println("[Env Source] Loaded 5 variables");

        Configuration config = new Configuration();
        config.setProperty("server.port", 9090);
        config.setProperty("server.host", "0.0.0.0");
        config.setProperty("database.url", "jdbc:postgresql://localhost/db");
        config.setProperty("timeout", 60);
        config.setProperty("debug", false);

        System.out.println("[Parser] Parsing environment configuration...");
        System.out.println("[Parser] Parse successful");

        return config;
    }

    @Override
    public String getSourceName() {
        return "EnvironmentConfigSource";
    }
}

class RemoteConfigSource implements ConfigurationSource {
    private String serverUrl;
    private int maxRetries = 3;
    private int baseDelay = 2000;  // milliseconds
    private Random random = new Random();

    public RemoteConfigSource(String serverUrl) {
        this.serverUrl = serverUrl;
    }

    @Override
    public Configuration load() throws ConfigurationException {
        System.out.println("[Remote Source] Connecting to: " + serverUrl);

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                System.out.println("[Remote Source] Attempt " + attempt + "/" + maxRetries + "...");

                // Simulate network call (fails first 2 attempts, succeeds on 3rd)
                if (attempt < maxRetries) {
                    String errorMsg = (attempt == 1) ? "Connection timeout" : "Connection refused";
                    System.out.println("[Remote Source] ERROR: " + errorMsg);

                    IOException cause = new IOException(errorMsg);
                    throw new NetworkException(
                        "config-server.example.com",
                        30,
                        "Failed to connect to remote configuration server",
                        cause
                    );
                }

                System.out.println("[Remote Source] Connected successfully");
                System.out.println("[Remote Source] Configuration downloaded");

                Configuration config = new Configuration();
                config.setProperty("server.port", 7070);
                config.setProperty("server.host", "remote-host");
                config.setProperty("database.url", "jdbc:oracle://remote/db");
                config.setProperty("timeout", 45);
                config.setProperty("debug", false);

                return config;

            } catch (NetworkException e) {
                if (attempt < maxRetries) {
                    int delay = baseDelay * (int)Math.pow(2, attempt - 1);
                    System.out.println("[Remote Source] Retry " + attempt + ": Waiting " + (delay/1000) + " seconds...");
                    try {
                        Thread.sleep(delay);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                    }
                } else {
                    throw e;  // Last attempt failed, rethrow
                }
            }
        }

        throw new ConfigurationException(
            ConfigurationErrorCode.SOURCE_UNAVAILABLE,
            "RemoteConfigSource",
            "Failed to load configuration after " + maxRetries + " attempts"
        );
    }

    @Override
    public String getSourceName() {
        return "RemoteConfigSource";
    }
}

// ============= Configuration Validator =============

class ConfigurationValidator {
    public void validate(Configuration config) throws ValidationException {
        System.out.println("[Validator] Validating configuration...");
        List<ValidationError> errors = new ArrayList<>();

        // Validate server.port
        Object port = config.getProperty("server.port");
        if (port == null) {
            errors.add(new ValidationError(
                "server.port",
                "Missing required field",
                "integer (1024-65535)",
                "null"
            ));
        } else if (port instanceof Integer) {
            int portNum = (Integer) port;
            if (portNum < 1024 || portNum > 65535) {
                errors.add(new ValidationError(
                    "server.port",
                    "Value out of range",
                    "1024-65535",
                    String.valueOf(portNum)
                ));
            }
        } else {
            errors.add(new ValidationError(
                "server.port",
                "Type mismatch",
                "integer",
                port.getClass().getSimpleName()
            ));
        }

        // Validate database.url
        Object dbUrl = config.getProperty("database.url");
        if (dbUrl == null) {
            errors.add(new ValidationError(
                "database.url",
                "Missing required field",
                "string (jdbc:...)",
                "null"
            ));
        }

        if (!errors.isEmpty()) {
            System.out.println("[Validator] ERROR: Validation failed");
            throw new ValidationException("ConfigurationValidator", errors);
        }

        System.out.println("[Validator] All validations passed ✓");
    }
}

// ============= Configuration Manager =============

class ConfigurationManager {
    private List<ConfigurationSource> sources;
    private ConfigurationValidator validator;
    private StringBuilder errorLog;

    public ConfigurationManager() {
        this.sources = new ArrayList<>();
        this.validator = new ConfigurationValidator();
        this.errorLog = new StringBuilder();
    }

    public void addSource(ConfigurationSource source) {
        sources.add(source);
    }

    public Configuration loadConfiguration() throws ConfigurationException {
        System.out.println("\n=== Loading Configuration ===");
        System.out.println("[Config Manager] Attempting to load from multiple sources...");

        errorLog.setLength(0);  // Clear previous logs

        for (int i = 0; i < sources.size(); i++) {
            ConfigurationSource source = sources.get(i);
            System.out.println("[Config Manager] Source " + (i + 1) + ": " + source.getSourceName());

            try {
                Configuration config = source.load();
                validator.validate(config);

                System.out.println("[Config Manager] Configuration loaded successfully from " + source.getSourceName());

                if (i > 0) {
                    System.out.println("Warning: Using fallback source");
                }

                System.out.println("Configuration ready: " + config.size() + " properties loaded");
                return config;

            } catch (ParseException e) {
                System.out.println("Exception: " + e.getClass().getSimpleName());
                System.out.println("Error Code: " + e.getErrorCode());
                System.out.println("Line: " + e.getLineNumber());
                System.out.println("Column: " + e.getColumnNumber());
                System.out.println("Expected: " + e.getExpected());
                System.out.println("Found: " + e.getFound());
                System.out.println("Context: " + e.getContext());
                System.out.println("[Config Manager] Parse error in " + source.getSourceName());

                errorLog.append(source.getSourceName()).append(": ").append(e.getMessage()).append("\n");

                if (i < sources.size() - 1) {
                    System.out.println("[Config Manager] Trying next source...");
                }

            } catch (ValidationException e) {
                System.out.println("Exception: " + e.getClass().getSimpleName());
                System.out.println("Error Code: " + e.getErrorCode());
                System.out.println("Validation Errors:");
                int errorNum = 1;
                for (ValidationError error : e.getValidationErrors()) {
                    System.out.println(errorNum + ". " + error);
                    errorNum++;
                }
                System.out.println("\nConfiguration load failed: " + e.getValidationErrors().size() + " validation errors");

                errorLog.append(source.getSourceName()).append(": Validation failed\n");

            } catch (ConfigurationException e) {
                System.out.println("Exception: " + e.getClass().getSimpleName());
                System.out.println("Error Code: " + e.getErrorCode());
                System.out.println("Source: " + e.getSource());
                System.out.println("Message: " + e.getMessage());

                if (e instanceof NetworkException) {
                    NetworkException ne = (NetworkException) e;
                    System.out.println("Server: " + ne.getServer());
                    System.out.println("Timeout: " + ne.getTimeout() + " seconds");
                }

                System.out.println("[Config Manager] " + source.getSourceName() + " failed, trying next source...");

                errorLog.append(source.getSourceName()).append(": ").append(e.getMessage()).append("\n");
            }
        }

        System.out.println("[Config Manager] All sources exhausted");
        System.out.println("Error: Unable to load valid configuration");

        throw new ConfigurationException(
            ConfigurationErrorCode.SOURCE_UNAVAILABLE,
            "ConfigurationManager",
            "Failed to load configuration from any source. Errors:\n" + errorLog.toString()
        );
    }

    public String getDetailedErrorReport() {
        return errorLog.toString();
    }
}

public class TestConfigurationSystem {
    public static void main(String[] args) {
        ConfigurationManager configManager = new ConfigurationManager();

        // Add sources in priority order
        configManager.addSource(new FileConfigSource("config.json"));
        configManager.addSource(new EnvironmentConfigSource());
        configManager.addSource(new RemoteConfigSource("https://config-server.example.com/config"));

        try {
            Configuration config = configManager.loadConfiguration();
            System.out.println("\n=== Configuration Loaded Successfully ===");
            System.out.println("Properties: " + config.getAllProperties());
        } catch (ConfigurationException e) {
            System.out.println("\n=== Configuration Load Failed ===");
            System.out.println("Error: " + e.getMessage());
            System.out.println("\nDetailed Error Report:");
            System.out.println(configManager.getDetailedErrorReport());
        }
    }
}
```

**💡 Tips:**
- Error codes enum: Provides standardized error classification enabling programmatic error handling
- Custom exception hierarchy: Base ConfigurationException with specialized subclasses (ParseException, ValidationException, NetworkException)
- Exception state: Each exception type carries relevant context (line/column for parse errors, field names for validation errors)
- Multiple exception sources: System handles exceptions from file I/O, network calls, parsing, and validation
- Exception chaining: NetworkException wraps IOException preserving original cause for debugging
- Retry logic: RemoteConfigSource demonstrates exception handling in retry scenarios with exponential backoff
- Fallback strategy: ConfigurationManager tries sources in order, catching exceptions and trying next source
- Error aggregation: ValidationException accumulates multiple validation errors instead of failing on first error
- Comprehensive error reporting: getDetailedErrorReport() provides full diagnostic of all failed attempts
- Exception wrapping: Low-level IOException wrapped in domain-specific NetworkException adding business context
- Logging at exception points: Each layer logs exceptions with layer-specific details
- Recovery strategies: System gracefully handles failures by falling back to alternative sources
- Error context preservation: ParseException includes line, column, expected, found, and surrounding context
- throws declaration: Methods declare checked exceptions they propagate (throws ConfigurationException)
- Unchecked vs checked: Configuration loading uses checked exceptions (caller must handle)

---

### Beginner Exercises

#### Exercise 1: Throws Keyword Practice
**Difficulty:** Beginner
**Objective:** Practice declaring exceptions with throws keyword.

**Problem:** Create a file reader utility that declares checked exceptions using throws keyword.

**Requirements:**
- Create `FileUtils` class with method `readFirstLine(String filename) throws IOException`
- Method reads first line from file (use BufferedReader)
- Caller must handle or declare the IOException
- Create main method that catches the exception and displays error message
- Test with existing and non-existing files

**Example Output:**
```
=== Reading existing file ===
First line: Hello World

=== Reading non-existing file ===
Error: File not found: missing.txt
Please check the file path and try again.
```

**Hint:** `throws` keyword in method signature forces caller to handle exception.

---

#### Exercise 2: Checked vs Unchecked Exceptions
**Difficulty:** Easy
**Objective:** Understand difference between checked and unchecked exceptions.

**Problem:** Create two validator classes demonstrating checked vs unchecked exceptions.

**Requirements:**
- Create `AgeValidator` with method `validateAge(int age)`
  - Throws checked exception `InvalidAgeException` if age < 0 or age > 150
- Create `EmailValidator` with method `validateEmail(String email)`
  - Throws unchecked `IllegalArgumentException` if email invalid
- Main method demonstrates:
  - Checked exception must be caught or declared
  - Unchecked exception optional to catch

**Example Output:**
```
=== Age Validation (Checked) ===
Age 25: Valid
Age -5: Error - InvalidAgeException: Age cannot be negative: -5

=== Email Validation (Unchecked) ===
Email "test@example.com": Valid
Email "invalid": Error - IllegalArgumentException: Email must contain @
```

**Hint:** Checked exceptions extend Exception; unchecked extend RuntimeException.

---

#### Exercise 3: Creating Custom Checked Exception
**Difficulty:** Easy
**Objective:** Practice creating custom checked exception class.

**Problem:** Create custom exception for insufficient balance scenario in banking.

**Requirements:**
- Create `InsufficientBalanceException` extending Exception
- Constructor takes: currentBalance, requestedAmount, message
- Getter methods for balance and amount
- Method `getShortfall()` returning difference
- Use in `BankAccount` class `withdraw()` method
- Demonstrate exception with detailed information

**Example Output:**
```
=== Withdrawal Test ===
Current Balance: $500.0
Attempting to withdraw: $750.0

Error: InsufficientBalanceException
Message: Insufficient funds for withdrawal
Current Balance: $500.0
Requested Amount: $750.0
Shortfall: $250.0
```

**Hint:** Custom exception stores additional context (balance, amount) for debugging.

---

#### Exercise 4: Creating Custom Unchecked Exception
**Difficulty:** Easy
**Objective:** Practice creating custom unchecked exception for validation errors.

**Problem:** Create custom unchecked exception for product validation in inventory system.

**Requirements:**
- Create `InvalidProductException` extending RuntimeException
- Constructor takes: productId, fieldName, errorReason
- Getter methods for all fields
- Use in `Product` class for validation:
  - Product ID cannot be null or empty
  - Price cannot be negative
  - Quantity cannot be negative
- No throws declaration needed (unchecked)

**Example Output:**
```
=== Product Creation Tests ===
Product 1: PROD-001, Price: $29.99, Quantity: 10 - Success

Product 2: null, Price: $19.99, Quantity: 5
Error: InvalidProductException
Field: productId
Reason: Product ID cannot be null or empty

Product 3: PROD-003, Price: -10.0, Quantity: 5
Error: InvalidProductException
Field: price
Reason: Price cannot be negative
```

**Hint:** Unchecked exceptions for programming errors that caller shouldn't be forced to handle.

---

#### Exercise 5: Exception Chaining Practice
**Difficulty:** Medium
**Objective:** Practice preserving exception cause through exception chaining.

**Problem:** Create layered application showing exception propagation with cause preservation.

**Requirements:**
- Data layer: throws `DataAccessException` wrapping SQLException
- Business layer: catches DataAccessException, throws `BusinessException` wrapping it
- Presentation layer: catches BusinessException, displays full exception chain
- Each layer adds context to exception message
- Demonstrate using `getCause()` to access original exception

**Example Output:**
```
=== Processing User Request ===
[Presentation Layer] Processing user data...
[Business Layer] Validating business rules...
[Data Layer] Accessing database...
[Data Layer] ERROR: Database connection failed

Error at Presentation Layer:
Exception: BusinessException
Message: Failed to process user data
Caused by: DataAccessException - Database operation failed
Caused by: SQLException - Connection timeout

Full Exception Chain:
1. SQLException: Connection timeout
2. DataAccessException: Database operation failed
3. BusinessException: Failed to process user data
```

**Hint:** Pass original exception as cause parameter to preserve full error context.

---

#### Exercise 6: Multi-Exception Handling Scenario
**Difficulty:** Medium
**Objective:** Handle multiple exception types in comprehensive data processing system.

**Requirements:**
- Create `DataProcessor` class with method `processData(String[] data)`
- Parse each data element (NumberFormatException)
- Validate range 1-100 (IllegalArgumentException)
- Store in array (ArrayIndexOutOfBoundsException)
- Multiple catch blocks for different exceptions
- Finally block for cleanup
- Count successful and failed operations

**Example Output:**
```
=== Processing Data ===
Data: ["42", "abc", "75", "150", "88"]

Processing element 0: "42" - Success (added to results)
Processing element 1: "abc" - Failed (NumberFormatException: Invalid number format)
Processing element 2: "75" - Success (added to results)
Processing element 3: "150" - Failed (IllegalArgumentException: Value must be 1-100)
Processing element 4: "88" - Success (added to results)

=== Summary ===
Total elements: 5
Successful: 3
Failed: 2
Cleanup completed in finally block

Valid Results: [42, 75, 88]
```

**Hint:** Use multiple catch blocks ordered specific to general, finally for cleanup.

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