# Day 17: Exception Handling - Part 1

## 📚 Learning Objectives
By the end of this lesson, you will be able to:
- Understand what exceptions are and why they occur
- Use try-catch blocks to handle exceptions
- Work with multiple catch blocks
- Understand the finally block
- Use try-with-resources for automatic resource management
- Know when to use the throw keyword

---

## 🎯 Topics Covered

### 1. What are Exceptions?

#### Understanding Exceptions
An exception is an event that disrupts the normal flow of program execution.

```java
public class ExceptionDemo {
    public static void main(String[] args) {
        // This will cause ArithmeticException
        int result = 10 / 0;
        System.out.println("This line won't execute");
    }
}
```

#### Types of Errors
```java
// 1. Compile-time errors (syntax errors)
// int x = 10
// Missing semicolon - won't compile

// 2. Runtime errors (exceptions)
public class RuntimeErrorDemo {
    public static void main(String[] args) {
        int[] arr = new int[5];
        System.out.println(arr[10]);  // ArrayIndexOutOfBoundsException
    }
}

// 3. Logical errors
public class LogicalErrorDemo {
    public static void main(String[] args) {
        // Intended to calculate average but has logical error
        int sum = 10 + 20 + 30;
        int average = sum * 3;  // Should be sum / 3
        System.out.println(average);
    }
}
```

---

### 2. Try-Catch Block

#### Basic Try-Catch
```java
public class TryCatchDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;  // This will throw exception
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero");
            System.out.println("Exception message: " + e.getMessage());
        }
        
        System.out.println("Program continues...");
    }
}
```

#### Exception Object Methods
```java
public class ExceptionMethods {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("getMessage(): " + e.getMessage());
            System.out.println("toString(): " + e.toString());
            System.out.println("\nprintStackTrace():");
            e.printStackTrace();
        }
    }
}
```

---

### 3. Multiple Catch Blocks

#### Handling Different Exceptions
```java
public class MultipleCatchDemo {
    public static void main(String[] args) {
        try {
            String str = null;
            System.out.println(str.length());  // NullPointerException
            
            int result = 10 / 0;  // ArithmeticException
            
            int[] arr = new int[5];
            arr[10] = 50;  // ArrayIndexOutOfBoundsException
            
        } catch (NullPointerException e) {
            System.out.println("Null pointer error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic error: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error: " + e.getMessage());
        }
    }
}
```

#### Catch Block Order (Important!)
```java
public class CatchBlockOrder {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            arr[10] = 50;
        } 
        // Specific exception first
        catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index out of bounds");
        }
        // General exception last
        catch (Exception e) {
            System.out.println("General exception");
        }
        
        // WRONG ORDER - Won't compile:
        // catch (Exception e) { }  // General first
        // catch (ArrayIndexOutOfBoundsException e) { }  // Specific later - ERROR!
    }
}
```

#### Multi-Catch (Java 7+)
```java
public class MultiCatch {
    public static void main(String[] args) {
        try {
            // Some code that might throw exceptions
            int result = 10 / 0;
        } catch (ArithmeticException | NullPointerException e) {
            System.out.println("Arithmetic or Null Pointer Exception: " + e);
        }
    }
}
```

---

### 4. Finally Block

#### Always Executes
```java
public class FinallyDemo {
    public static void main(String[] args) {
        try {
            System.out.println("Try block");
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Catch block");
        } finally {
            System.out.println("Finally block - always executes");
        }
        
        System.out.println("After try-catch-finally");
    }
}
```

#### Finally with Return
```java
public class FinallyWithReturn {
    public static int test() {
        try {
            System.out.println("Try block");
            return 1;
        } catch (Exception e) {
            System.out.println("Catch block");
            return 2;
        } finally {
            System.out.println("Finally block");
            // return 3;  // If uncommented, this will be the return value
        }
    }
    
    public static void main(String[] args) {
        int result = test();
        System.out.println("Result: " + result);
    }
}
```

#### Resource Cleanup
```java
import java.io.*;

public class ResourceCleanup {
    public static void main(String[] args) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        } finally {
            // Always close resources
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                System.out.println("Error closing file: " + e.getMessage());
            }
        }
    }
}
```

---

### 5. Try-With-Resources (Java 7+)

#### Automatic Resource Management
```java
import java.io.*;

public class TryWithResources {
    public static void main(String[] args) {
        // Resources are automatically closed
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // reader is automatically closed here
    }
}
```

#### Multiple Resources
```java
import java.io.*;

public class MultipleResources {
    public static void main(String[] args) {
        try (
            FileInputStream fis = new FileInputStream("input.txt");
            FileOutputStream fos = new FileOutputStream("output.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(fis));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(fos))
        ) {
            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 6. Throw Keyword

#### Throwing Exceptions
```java
public class ThrowDemo {
    public static void checkAge(int age) {
        if (age < 18) {
            throw new ArithmeticException("Age must be 18 or above");
        }
        System.out.println("Age is valid: " + age);
    }
    
    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (ArithmeticException e) {
            System.out.println("Exception caught: " + e.getMessage());
        }
    }
}
```

#### Rethrowing Exceptions
```java
public class RethrowDemo {
    public static void method1() {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Exception in method1");
            throw e;  // Rethrow the exception
        }
    }
    
    public static void main(String[] args) {
        try {
            method1();
        } catch (ArithmeticException e) {
            System.out.println("Exception caught in main");
        }
    }
}
```

---

## 💻 Practice Exercises

### Exercise 1: Safe Division Calculator
```java
import java.util.Scanner;

public class SafeDivision {
    public static double divide(int numerator, int denominator) {
        try {
            return (double) numerator / denominator;
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero");
            return 0;
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        try {
            System.out.print("Enter numerator: ");
            int num = sc.nextInt();
            
            System.out.print("Enter denominator: ");
            int den = sc.nextInt();
            
            double result = divide(num, den);
            System.out.println("Result: " + result);
            
        } catch (Exception e) {
            System.out.println("Invalid input");
        } finally {
            sc.close();
        }
    }
}
```

### Exercise 2: Array Access Handler
```java
public class SafeArrayAccess {
    public static int getElement(int[] array, int index) {
        try {
            return array[index];
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid index: " + index);
            return -1;
        } catch (NullPointerException e) {
            System.out.println("Array is null");
            return -1;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        
        System.out.println(getElement(numbers, 2));   // 30
        System.out.println(getElement(numbers, 10));  // Invalid index
        System.out.println(getElement(null, 0));      // Array is null
    }
}
```

### Exercise 3: String to Number Converter
```java
public class StringToNumber {
    public static int convertToInt(String str) {
        try {
            return Integer.parseInt(str);
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + str);
            return 0;
        } catch (NullPointerException e) {
            System.out.println("String is null");
            return 0;
        }
    }
    
    public static void main(String[] args) {
        System.out.println(convertToInt("123"));      // 123
        System.out.println(convertToInt("abc"));      // 0 (invalid)
        System.out.println(convertToInt(null));       // 0 (null)
        System.out.println(convertToInt("45.67"));    // 0 (invalid)
    }
}
```

---

## 🎓 Key Takeaways

1. **Exceptions** disrupt normal program flow
2. **try-catch** blocks handle exceptions gracefully
3. **Multiple catch blocks** handle different exception types
4. **finally** block always executes (cleanup code)
5. **try-with-resources** automatically closes resources
6. **throw** keyword manually throws exceptions
7. **Specific exceptions** should be caught before general ones

---

## 📝 Summary

Today you learned:
- ✅ What exceptions are and why they occur
- ✅ Using try-catch blocks for exception handling
- ✅ Multiple catch blocks for different exceptions
- ✅ Finally block for cleanup code
- ✅ Try-with-resources for automatic resource management
- ✅ Throwing exceptions with throw keyword

---

## ⚠️ Common Mistakes

### 1. Try-Catch Basic Mistakes

#### ❌ Wrong - Empty Catch Block:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            // Empty catch - swallows exception silently!
        }
    }
}
```
**Issue:** Empty catch block hides errors; makes debugging impossible

#### ✅ Right:
```java
// CORRECT - Handle exception properly
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.err.println("Error: Cannot divide by zero");
            e.printStackTrace();  // Log for debugging

            // OR log properly
            // logger.error("Division by zero error", e);
        }
    }
}
```

**Why:** Always handle exceptions meaningfully; at minimum, log the error.

**💡 Tip:** Never leave catch blocks empty; always log, handle, or rethrow.

---

#### ❌ Wrong - Catching Exception Too Broadly:
```java
// WRONG - Catches everything, including programming errors
public class Main {
    public static void main(String[] args) {
        try {
            String str = null;
            System.out.println(str.length());  // NullPointerException
        } catch (Exception e) {  // Too broad!
            System.out.println("Something went wrong");
            // Can't tell what actually happened
        }
    }
}
```
**Issue:** Catching generic Exception masks specific problems; harder to debug

#### ✅ Right:
```java
// CORRECT - Catch specific exceptions
public class Main {
    public static void main(String[] args) {
        try {
            String str = null;
            System.out.println(str.length());
        } catch (NullPointerException e) {  // Specific exception
            System.out.println("String is null");
            e.printStackTrace();
        }
    }
}
```

**Why:** Specific exceptions enable targeted handling and better error messages.

**💡 Tip:** Catch the most specific exception possible; use Exception only as last resort.

---

#### ❌ Wrong - Not Using Exception Information:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array error");  // Generic message, no details
        }
    }
}
```
**Issue:** Doesn't use exception object's information; loses valuable debugging details

#### ✅ Right:
```java
// CORRECT - Use exception information
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: " + e.getMessage());  // Specific message
            System.out.println("Exception: " + e.toString());  // Full info
            e.printStackTrace();  // Stack trace for debugging
        }
    }
}
```

**Why:** Exception object contains valuable debugging information: message, type, stack trace.

**💡 Tip:** Use `getMessage()`, `toString()`, or `printStackTrace()` for debugging.

---

#### ❌ Wrong - Try Block Without Catch or Finally:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {  // Compilation error! Must have catch or finally
            int result = 10 / 0;
        }
        System.out.println("After try");
    }
}
```
**Issue:** Try block must be followed by catch, finally, or both

#### ✅ Right:
```java
// CORRECT - Try with catch
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // OR try with finally
        try {
            int result = 10 / 5;
        } finally {
            System.out.println("Cleanup");
        }

        // OR try with both
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Cleanup");
        }
    }
}
```

**Why:** Try must be paired with catch (to handle) or finally (to cleanup) or both.

**💡 Tip:** Try + (catch | finally | catch+finally) is the valid syntax.

---

### 2. Multiple Catch Block Mistakes

#### ❌ Wrong - Unreachable Catch Block:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (Exception e) {  // Catches everything first
            System.out.println("General exception");
        } catch (ArrayIndexOutOfBoundsException e) {  // Compilation error! Unreachable
            System.out.println("Array error");
        }
    }
}
```
**Issue:** General exception catches all subclasses; specific catch becomes unreachable

#### ✅ Right:
```java
// CORRECT - Specific exceptions first, general last
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {  // Specific first
            System.out.println("Array index error: " + e.getMessage());
        } catch (RuntimeException e) {  // Less specific
            System.out.println("Runtime error: " + e.getMessage());
        } catch (Exception e) {  // Most general last
            System.out.println("General error: " + e.getMessage());
        }
    }
}
```

**Why:** Exception hierarchy: child exceptions must be caught before parent exceptions.

**💡 Tip:** Order catch blocks from most specific to most general.

---

#### ❌ Wrong - Duplicate Catch Blocks:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("First catch");
        } catch (ArithmeticException e) {  // Compilation error! Duplicate
            System.out.println("Second catch");
        }
    }
}
```
**Issue:** Cannot have multiple catch blocks for same exception type

#### ✅ Right:
```java
// CORRECT - Catch each exception type once
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic error: " + e.getMessage());
            // Handle all arithmetic exceptions here
        }
    }
}
```

**Why:** Each exception type can only be caught once per try block.

**💡 Tip:** Consolidate handling logic for same exception type in one catch block.

---

#### ❌ Wrong - Not Handling All Possible Exceptions:
```java
// WRONG
public class Main {
    public static void processData(String str) {
        try {
            int num = Integer.parseInt(str);  // NumberFormatException
            int result = 100 / num;           // ArithmeticException
            System.out.println(result);
        } catch (ArithmeticException e) {  // Only handles one type!
            System.out.println("Division error");
        }
        // NumberFormatException not caught!
    }

    public static void main(String[] args) {
        processData("abc");  // Crashes with NumberFormatException!
    }
}
```
**Issue:** Code can throw multiple exception types; only one is caught

#### ✅ Right:
```java
// CORRECT - Handle all possible exceptions
public class Main {
    public static void processData(String str) {
        try {
            int num = Integer.parseInt(str);
            int result = 100 / num;
            System.out.println(result);
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + str);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }

    public static void main(String[] args) {
        processData("abc");   // Handles NumberFormatException
        processData("0");     // Handles ArithmeticException
    }
}
```

**Why:** Must handle all checked exceptions and foreseeable unchecked exceptions.

**💡 Tip:** Analyze code to identify all possible exception types; handle each.

---

### 3. Catch Block Order Mistakes

#### ❌ Wrong - Child Exception After Parent:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            System.out.println(arr[10]);
        } catch (RuntimeException e) {  // Parent first
            System.out.println("Runtime exception");
        } catch (ArrayIndexOutOfBoundsException e) {  // Compilation error! Child after parent
            System.out.println("Array error");
        }
    }
}
```
**Issue:** Parent exception catches child; subsequent child catch becomes unreachable

#### ✅ Right:
```java
// CORRECT - Child exceptions before parent
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {  // Child first
            System.out.println("Array index error");
        } catch (RuntimeException e) {  // Parent after
            System.out.println("Other runtime error");
        } catch (Exception e) {  // Most general last
            System.out.println("General error");
        }
    }
}
```

**Why:** Exception hierarchy: ArrayIndexOutOfBoundsException → RuntimeException → Exception.

**💡 Tip:** Know exception hierarchy; always catch child before parent.

---

#### ❌ Wrong - Sibling Exceptions in Wrong Context:
```java
// WRONG expectation
public class Main {
    public static void main(String[] args) {
        try {
            String str = "123abc";
            int num = Integer.parseInt(str);  // NumberFormatException
        } catch (ArithmeticException e) {  // Won't catch NumberFormatException!
            System.out.println("Error");
        }
        // Program crashes because NumberFormatException not caught
    }
}
```
**Issue:** ArithmeticException and NumberFormatException are siblings; one doesn't catch the other

#### ✅ Right:
```java
// CORRECT - Catch the actual exception type
public class Main {
    public static void main(String[] args) {
        try {
            String str = "123abc";
            int num = Integer.parseInt(str);
        } catch (NumberFormatException e) {  // Correct exception type
            System.out.println("Invalid number format: " + e.getMessage());
        }

        // OR catch common parent if both could occur
        try {
            String str = "123";
            int num = Integer.parseInt(str);
            int result = 10 / 0;  // Could throw ArithmeticException
        } catch (RuntimeException e) {  // Catches both NumberFormatException and ArithmeticException
            System.out.println("Runtime error: " + e.getMessage());
        }
    }
}
```

**Why:** Sibling exceptions are independent; need common parent or individual catches.

**💡 Tip:** Understand exception hierarchy tree; siblings don't catch each other.

---

### 4. Finally Block Mistakes

#### ❌ Wrong - Return in Finally Overrides Try Return:
```java
// WRONG - Confusing behavior
public class Main {
    public static int getValue() {
        try {
            return 1;  // This return value is discarded!
        } finally {
            return 2;  // Finally return overrides try return
        }
    }

    public static void main(String[] args) {
        System.out.println(getValue());  // Prints 2, not 1
    }
}
```
**Issue:** Return in finally block overrides return from try/catch; confusing and bad practice

#### ✅ Right:
```java
// CORRECT - Avoid return in finally
public class Main {
    public static int getValue() {
        int result = 0;
        try {
            result = 1;
        } finally {
            // Cleanup only, no return
            System.out.println("Cleanup");
        }
        return result;  // Return after try-catch-finally
    }

    public static void main(String[] args) {
        System.out.println(getValue());  // Prints 1 (clear)
    }
}
```

**Why:** Finally should be for cleanup only; returning from finally is confusing.

**💡 Tip:** Never use return, break, or continue in finally block.

---

#### ❌ Wrong - Exception in Finally Masks Original Exception:
```java
// WRONG
public class Main {
    public static void process() {
        try {
            throw new RuntimeException("Original exception");
        } finally {
            throw new RuntimeException("Finally exception");  // Masks original!
        }
    }

    public static void main(String[] args) {
        try {
            process();
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());  // Prints "Finally exception"
            // Original exception is lost!
        }
    }
}
```
**Issue:** Exception thrown in finally block masks exception from try block

#### ✅ Right:
```java
// CORRECT - Avoid throwing exceptions in finally
public class Main {
    public static void process() {
        try {
            throw new RuntimeException("Original exception");
        } finally {
            // Cleanup that doesn't throw exceptions
            try {
                // Risky cleanup code
            } catch (Exception e) {
                // Log but don't rethrow
                System.err.println("Cleanup error: " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        try {
            process();
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());  // Prints "Original exception"
        }
    }
}
```

**Why:** Finally exceptions mask try/catch exceptions; original error is lost.

**💡 Tip:** Wrap risky finally code in try-catch; log but don't rethrow.

---

#### ❌ Wrong - Assuming Finally Always Executes:
```java
// WRONG assumption
public class Main {
    public static void process() {
        try {
            System.out.println("Try block");
            System.exit(0);  // Terminates JVM immediately
        } finally {
            System.out.println("Finally");  // Never executes!
        }
    }

    public static void main(String[] args) {
        process();
    }
}
```
**Issue:** Finally doesn't execute if JVM exits (System.exit(), crash, infinite loop, etc.)

#### ✅ Right:
```java
// CORRECT - Understand finally limitations
public class Main {
    public static void process() {
        try {
            System.out.println("Try block");
            // Don't use System.exit() unless necessary
            return;  // Finally executes before return
        } finally {
            System.out.println("Finally");  // Executes
        }
    }

    public static void main(String[] args) {
        process();
        // If you must exit:
        // System.exit(0);  // Do this after finally blocks complete
    }
}
```

**Why:** Finally runs almost always, but not if JVM exits or infinite loop/deadlock occurs.

**💡 Tip:** Finally executes for return, break, continue, exceptions; not for System.exit().

---

#### ❌ Wrong - Not Checking Null Before Closing in Finally:
```java
// WRONG
import java.io.*;

public class Main {
    public static void readFile() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            reader.close();  // NullPointerException if file not found in try!
        }
    }
}
```
**Issue:** If exception occurs before reader is initialized, finally tries to close null

#### ✅ Right:
```java
// CORRECT - Check null before closing
import java.io.*;

public class Main {
    public static void readFile() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            if (reader != null) {  // Check null first
                try {
                    reader.close();
                } catch (IOException e) {
                    System.err.println("Error closing: " + e.getMessage());
                }
            }
        }
    }
}
```

**Why:** Resources may be null if initialization fails; must check before closing.

**💡 Tip:** Always null-check resources before closing in finally.

---

### 5. Try-With-Resources Mistakes

#### ❌ Wrong - Not Implementing AutoCloseable:
```java
// WRONG
class MyResource {  // Doesn't implement AutoCloseable
    public void use() {
        System.out.println("Using resource");
    }

    public void cleanup() {
        System.out.println("Cleanup");
    }
}

public class Main {
    public static void main(String[] args) {
        try (MyResource res = new MyResource()) {  // Compilation error!
            res.use();
        }
    }
}
```
**Issue:** Try-with-resources requires AutoCloseable or Closeable implementation

#### ✅ Right:
```java
// CORRECT - Implement AutoCloseable
class MyResource implements AutoCloseable {
    public void use() {
        System.out.println("Using resource");
    }

    @Override
    public void close() {  // Must implement close()
        System.out.println("Cleanup");
    }
}

public class Main {
    public static void main(String[] args) {
        try (MyResource res = new MyResource()) {  // OK
            res.use();
        }  // close() called automatically
    }
}
```

**Why:** Try-with-resources only works with AutoCloseable/Closeable resources.

**💡 Tip:** Implement AutoCloseable and override close() for custom resources.

---

#### ❌ Wrong - Trying to Access Resource After Try Block:
```java
// WRONG
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // reader.close();  // Compilation error! reader out of scope
    }
}
```
**Issue:** Resources declared in try-with-resources are scoped to try block only

#### ✅ Right:
```java
// CORRECT - Resource scope limited to try block
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
            // All resource usage must be inside try block
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader is automatically closed and out of scope here
    }
}
```

**Why:** Try-with-resources resources are scoped to try block; auto-closed at end.

**💡 Tip:** Complete all resource operations within try block; resource unavailable after.

---

#### ❌ Wrong - Manually Closing Try-With-Resources Resource:
```java
// WRONG - Redundant
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
            reader.close();  // Manual close - redundant and risky!
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader.close() called again automatically - double close!
    }
}
```
**Issue:** Try-with-resources automatically closes; manual close causes double-close

#### ✅ Right:
```java
// CORRECT - Let try-with-resources handle closing
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
            // Don't manually close - automatic
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader.close() called automatically here
    }
}
```

**Why:** Try-with-resources manages closing; manual close is redundant and error-prone.

**💡 Tip:** Never manually close resources in try-with-resources; automatic closing is the point.

---

#### ❌ Wrong - Wrong Syntax for Multiple Resources:
```java
// WRONG
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (
            BufferedReader reader = new BufferedReader(new FileReader("input.txt")),  // Comma
            BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))  // No comma after last
        ) {
            String line = reader.readLine();
            writer.write(line);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
**Issue:** Actually this is CORRECT! But students often forget semicolons or use wrong separators

#### ✅ Right:
```java
// CORRECT - Semicolons separate resources
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (
            BufferedReader reader = new BufferedReader(new FileReader("input.txt"));  // Semicolon
            BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))   // No semicolon after last
        ) {
            String line = reader.readLine();
            writer.write(line);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// OR (Java 9+) - use var
try (var reader = new BufferedReader(new FileReader("input.txt"));
     var writer = new BufferedWriter(new FileWriter("output.txt"))) {
    // ...
}
```

**Why:** Multiple resources separated by semicolons; last resource has no separator.

**💡 Tip:** Semicolons between resources; no semicolon after last resource.

---

### 6. Throw Keyword Mistakes

#### ❌ Wrong - Throwing Without Try-Catch or throws Declaration:
```java
// WRONG
public class Main {
    public static void checkAge(int age) {
        if (age < 18) {
            throw new Exception("Too young");  // Compilation error! Checked exception
        }
    }

    public static void main(String[] args) {
        checkAge(15);  // Compilation error!
    }
}
```
**Issue:** Checked exceptions must be caught or declared with throws

#### ✅ Right:
```java
// CORRECT - Catch or declare
public class Main {
    // Option 1: Declare with throws
    public static void checkAge(int age) throws Exception {
        if (age < 18) {
            throw new Exception("Too young");
        }
    }

    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    // Option 2: Use unchecked exception (no throws needed)
    public static void validateAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Too young");  // Unchecked
        }
    }
}
```

**Why:** Checked exceptions require handling; unchecked don't (but should be documented).

**💡 Tip:** Use unchecked exceptions (RuntimeException) for programming errors.

---

#### ❌ Wrong - Throwing Null:
```java
// WRONG
public class Main {
    public static void process(boolean flag) {
        if (flag) {
            throw null;  // NullPointerException at runtime!
        }
    }

    public static void main(String[] args) {
        try {
            process(true);
        } catch (Exception e) {
            System.out.println("Caught: " + e);  // NullPointerException
        }
    }
}
```
**Issue:** Throwing null causes NullPointerException; meaningless error

#### ✅ Right:
```java
// CORRECT - Throw proper exception object
public class Main {
    public static void process(boolean flag) {
        if (flag) {
            throw new IllegalStateException("Invalid state");  // Proper exception
        }
    }

    public static void main(String[] args) {
        try {
            process(true);
        } catch (IllegalStateException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}
```

**Why:** Exceptions must be proper exception objects; null is invalid.

**💡 Tip:** Always throw new exception instances with descriptive messages.

---

#### ❌ Wrong - Losing Exception Information When Rethrowing:
```java
// WRONG
public class Main {
    public static void method1() {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            throw new RuntimeException("Error occurred");  // Lost original exception!
        }
    }

    public static void main(String[] args) {
        try {
            method1();
        } catch (RuntimeException e) {
            e.printStackTrace();  // Stack trace doesn't show original ArithmeticException
        }
    }
}
```
**Issue:** Creating new exception without cause loses original exception details

#### ✅ Right:
```java
// CORRECT - Preserve original exception
public class Main {
    public static void method1() {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            // Option 1: Rethrow original
            throw e;

            // Option 2: Wrap with cause
            // throw new RuntimeException("Error in method1", e);  // Preserves original
        }
    }

    public static void main(String[] args) {
        try {
            method1();
        } catch (RuntimeException e) {
            e.printStackTrace();  // Full stack trace with original exception
            Throwable cause = e.getCause();  // Can access original exception
        }
    }
}
```

**Why:** Preserving exception chain helps debugging; shows full error context.

**💡 Tip:** When wrapping exceptions, always pass original as cause parameter.

---

#### ❌ Wrong - Throwing Generic Exception:
```java
// WRONG - Too generic
public class Main {
    public static void processAge(int age) {
        if (age < 0) {
            throw new Exception("Invalid age");  // Too generic
        }
    }
}
```
**Issue:** Generic Exception provides no semantic meaning; harder to catch specifically

#### ✅ Right:
```java
// CORRECT - Use specific exception
public class Main {
    public static void processAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
    }

    // OR create custom exception for domain
    public static void validateUser(User user) {
        if (user.getAge() < 18) {
            throw new InvalidUserException("User must be 18 or older");
        }
    }
}

class InvalidUserException extends RuntimeException {
    public InvalidUserException(String message) {
        super(message);
    }
}
```

**Why:** Specific exceptions enable targeted handling and clearer semantics.

**💡 Tip:** Use most specific exception type; create custom exceptions for domain logic.

---

### 7. Exception Object Usage Mistakes

#### ❌ Wrong - Not Using getMessage():
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException("Invalid argument provided");
        } catch (IllegalArgumentException e) {
            System.out.println("Error occurred");  // Generic message, loses details
        }
    }
}
```
**Issue:** Doesn't use exception's specific message; loses valuable error details

#### ✅ Right:
```java
// CORRECT - Use exception information
public class Main {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException("Invalid argument provided");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());  // Specific message
            System.out.println("Type: " + e.getClass().getName());
            e.printStackTrace();  // Full stack trace
        }
    }
}
```

**Why:** Exception object contains detailed error information; use it for debugging.

**💡 Tip:** Use getMessage(), getClass(), printStackTrace() to extract exception details.

---

#### ❌ Wrong - Printing Exception Object Directly:
```java
// WRONG (poor practice)
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println(e);  // Prints toString() - not detailed enough
        }
    }
}
```
**Issue:** Printing exception directly gives basic info; misses stack trace

#### ✅ Right:
```java
// CORRECT - Use appropriate method
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            // For user-facing message
            System.out.println("Error: " + e.getMessage());

            // For debugging/logging
            e.printStackTrace();

            // OR use logger
            // logger.error("Arithmetic error", e);
        }
    }
}
```

**Why:** printStackTrace() provides full debugging info; getMessage() for user messages.

**💡 Tip:** Use getMessage() for users, printStackTrace() for developers/logs.

---

### 8. Resource Management Mistakes

#### ❌ Wrong - Not Closing Resources in Finally:
```java
// WRONG
import java.io.*;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = new BufferedReader(new FileReader("file.txt"));
        try {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader never closed - resource leak!
    }
}
```
**Issue:** Resources not closed; causes resource leaks and potential system issues

#### ✅ Right:
```java
// CORRECT - Close in finally or use try-with-resources
import java.io.*;

public class Main {
    // Option 1: Finally block
    public static void method1() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    System.err.println("Error closing: " + e);
                }
            }
        }
    }

    // Option 2: Try-with-resources (preferred)
    public static void method2() {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Unclosed resources waste system resources and can cause failures.

**💡 Tip:** Always close resources; use try-with-resources for automatic management.

---

#### ❌ Wrong - Closing Resources in Wrong Order:
```java
// WRONG
import java.io.*;

public class Main {
    public static void main(String[] args) {
        FileInputStream fis = null;
        BufferedInputStream bis = null;
        try {
            fis = new FileInputStream("file.txt");
            bis = new BufferedInputStream(fis);
            // ... use bis
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fis.close();  // Close base first - WRONG!
                bis.close();  // May fail if fis already closed
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
**Issue:** Closing base stream before wrapper can cause issues

#### ✅ Right:
```java
// CORRECT - Close in reverse order (wrapper first)
import java.io.*;

public class Main {
    public static void main(String[] args) {
        FileInputStream fis = null;
        BufferedInputStream bis = null;
        try {
            fis = new FileInputStream("file.txt");
            bis = new BufferedInputStream(fis);
            // ... use bis
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bis != null) bis.close();  // Close wrapper first
                // fis.close() not needed - bis.close() closes underlying stream
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // OR use try-with-resources (handles order automatically)
        try (FileInputStream fis2 = new FileInputStream("file.txt");
             BufferedInputStream bis2 = new BufferedInputStream(fis2)) {
            // ... use bis2
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Wrapper streams close underlying streams; close in reverse construction order.

**💡 Tip:** Close wrappers first (they close underlying); or use try-with-resources.

---

### 9. Exception Handling Flow Mistakes

#### ❌ Wrong - Code After throw:
```java
// WRONG
public class Main {
    public static void process(int value) {
        if (value < 0) {
            throw new IllegalArgumentException("Negative value");
            System.out.println("After throw");  // Unreachable code - compilation error!
        }
    }
}
```
**Issue:** Code after throw is unreachable; won't compile

#### ✅ Right:
```java
// CORRECT - No code after throw
public class Main {
    public static void process(int value) {
        if (value < 0) {
            throw new IllegalArgumentException("Negative value");
        }
        System.out.println("Valid value: " + value);  // After if block - OK
    }
}
```

**Why:** throw terminates method execution; subsequent code unreachable.

**💡 Tip:** throw acts like return; no code after it in same block.

---

#### ❌ Wrong - Exception Handling Changes Program Logic:
```java
// WRONG - Using exceptions for control flow
public class Main {
    public static int findIndex(int[] arr, int target) {
        try {
            for (int i = 0; i < arr.length; i++) {
                if (arr[i] == target) {
                    throw new Exception();  // Using exception for control flow!
                }
            }
            return -1;
        } catch (Exception e) {
            return i;  // Wrong: i out of scope
        }
    }
}
```
**Issue:** Using exceptions for control flow is expensive and confusing

#### ✅ Right:
```java
// CORRECT - Use normal control flow
public class Main {
    public static int findIndex(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Normal return
            }
        }
        return -1;  // Not found
    }
}
```

**Why:** Exceptions for exceptional conditions only; not for normal control flow.

**💡 Tip:** Exceptions are expensive; use return, break, continue for normal flow.

---

#### ❌ Wrong - Not Handling Exception at Right Level:
```java
// WRONG - Handle too high
public class Main {
    public static void main(String[] args) {
        try {
            processUsers();
            generateReport();
            sendEmails();
        } catch (Exception e) {  // Catches all exceptions from all methods
            System.out.println("Error");  // Can't tell which method failed
        }
    }
}
```
**Issue:** Handling exceptions too high up loses context; can't take specific action

#### ✅ Right:
```java
// CORRECT - Handle at appropriate level
public class Main {
    public static void main(String[] args) {
        // Handle each operation separately for specific recovery
        try {
            processUsers();
        } catch (UserException e) {
            System.out.println("User processing failed: " + e.getMessage());
            // Specific recovery for user errors
        }

        try {
            generateReport();
        } catch (ReportException e) {
            System.out.println("Report generation failed: " + e.getMessage());
            // Specific recovery for report errors
        }

        try {
            sendEmails();
        } catch (EmailException e) {
            System.out.println("Email sending failed: " + e.getMessage());
            // Specific recovery for email errors
        }
    }
}
```

**Why:** Handle exceptions where you have enough context for recovery.

**💡 Tip:** Catch exceptions at the level where you can meaningfully handle them.

---

### 10. Multi-Catch Mistakes

#### ❌ Wrong - Using Multi-Catch with Related Exceptions:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException | Exception e) {  // Compilation error!
            // Exception is parent of ArrayIndexOutOfBoundsException
        }
    }
}
```
**Issue:** Multi-catch cannot have parent-child relationship; redundant

#### ✅ Right:
```java
// CORRECT - Multi-catch with unrelated exceptions
public class Main {
    public static void main(String[] args) {
        try {
            String str = args[0];
            int num = Integer.parseInt(str);
            int result = 100 / num;
        } catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {
            // Both are RuntimeException siblings - OK
            System.out.println("Input error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Math error: " + e.getMessage());
        }
    }
}
```

**Why:** Multi-catch for independent exceptions with same handling; not parent-child.

**💡 Tip:** Use multi-catch for sibling exceptions with identical handling logic.

---

#### ❌ Wrong - Modifying Multi-Catch Exception Parameter:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException | NullPointerException e) {
            e = new RuntimeException();  // Compilation error! Implicitly final
            throw e;
        }
    }
}
```
**Issue:** Multi-catch exception parameter is implicitly final; cannot reassign

#### ✅ Right:
```java
// CORRECT - Don't reassign multi-catch parameter
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException | NullPointerException e) {
            // Use e directly; don't reassign
            System.out.println("Error: " + e.getMessage());
            throw e;  // Rethrow original - OK

            // If you need to wrap:
            // throw new RuntimeException("Wrapped error", e);
        }
    }
}
```

**Why:** Multi-catch parameters are final to prevent type confusion.

**💡 Tip:** Multi-catch exception parameters cannot be reassigned; use as-is.

---

#### ❌ Wrong - Overusing Multi-Catch:
```java
// WRONG - Different handling needed
public class Main {
    public static void main(String[] args) {
        try {
            String str = args[0];
            int num = Integer.parseInt(str);
            int[] arr = {1, 2, 3};
            System.out.println(arr[num]);
        } catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {
            // Problem: These need different messages/handling
            System.out.println("Error: " + e.getMessage());  // Generic
        }
    }
}
```
**Issue:** Using multi-catch when exceptions need different handling

#### ✅ Right:
```java
// CORRECT - Separate catches for different handling
public class Main {
    public static void main(String[] args) {
        try {
            String str = args[0];
            int num = Integer.parseInt(str);
            int[] arr = {1, 2, 3};
            System.out.println(arr[num]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid array index: " + e.getMessage());
            // Specific recovery: use default index
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + e.getMessage());
            // Specific recovery: use default number
        }
    }
}
```

**Why:** Use multi-catch only when handling logic is identical for all exception types.

**💡 Tip:** Multi-catch for same handling; separate catches for different handling.

---

This comprehensive list contains **40+ Exception Handling Part 1 mistakes** covering all fundamental concepts!

---

## 🔗 What's Next?

Tomorrow (Day 18), we'll learn about:
- throws keyword
- Checked vs unchecked exceptions
- Creating custom exceptions
- Exception hierarchy
- Best practices for exception handling

---

## 📚 Additional Resources

- [Oracle Exception Handling Tutorial](https://docs.oracle.com/javase/tutorial/essential/exceptions/)
- [Java Exception Hierarchy](https://www.geeksforgeeks.org/exceptions-in-java/)
- Practice exception handling on HackerRank