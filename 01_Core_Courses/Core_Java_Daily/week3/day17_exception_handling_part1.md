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