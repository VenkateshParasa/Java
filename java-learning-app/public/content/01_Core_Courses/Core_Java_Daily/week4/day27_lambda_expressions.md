# Day 27: Lambda Expressions

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

By the end of Day 27, you will be able to:
- Understand what lambda expressions are and their benefits
- Write lambda expressions with different syntaxes
- Use functional interfaces effectively
- Understand method references
- Work with built-in functional interfaces
- Apply lambda expressions in real-world scenarios
- Use lambda expressions with collections
- Understand variable capture and scope

---

## 📚 Topics Covered

### 1. Introduction to Lambda Expressions

Lambda expressions (introduced in Java 8) provide a clear and concise way to represent a method interface using an expression.

#### What is a Lambda Expression?

A lambda expression is an anonymous function - a method without a name that can be passed as an argument or stored in a variable.

**Syntax:**
```
(parameters) -> expression
or
(parameters) -> { statements; }
```

#### Before Lambda (Traditional Approach):

```java
// Using anonymous inner class
Runnable runnable = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello from thread");
    }
};

new Thread(runnable).start();
```

#### With Lambda:

```java
// Using lambda expression
Runnable runnable = () -> System.out.println("Hello from thread");
new Thread(runnable).start();

// Or even more concise
new Thread(() -> System.out.println("Hello from thread")).start();
```

---

### 2. Lambda Expression Syntax

#### No Parameters:

```java
// No parameters
() -> System.out.println("Hello");

// With block
() -> {
    System.out.println("Hello");
    System.out.println("World");
}
```

#### Single Parameter:

```java
// Parentheses optional for single parameter
x -> x * x

// With type
(int x) -> x * x

// With block
x -> {
    int result = x * x;
    return result;
}
```

#### Multiple Parameters:

```java
// Multiple parameters
(x, y) -> x + y

// With types
(int x, int y) -> x + y

// With block
(x, y) -> {
    int sum = x + y;
    return sum;
}
```

---

### 3. Functional Interfaces

A functional interface is an interface with exactly one abstract method. Lambda expressions can only be used with functional interfaces.

#### @FunctionalInterface Annotation:

```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        // Lambda expression
        Calculator add = (a, b) -> a + b;
        Calculator subtract = (a, b) -> a - b;
        Calculator multiply = (a, b) -> a * b;
        Calculator divide = (a, b) -> a / b;
        
        System.out.println("10 + 5 = " + add.calculate(10, 5));
        System.out.println("10 - 5 = " + subtract.calculate(10, 5));
        System.out.println("10 * 5 = " + multiply.calculate(10, 5));
        System.out.println("10 / 5 = " + divide.calculate(10, 5));
    }
}
```

#### Custom Functional Interface:

```java
@FunctionalInterface
interface StringProcessor {
    String process(String str);
}

public class CustomFunctionalInterface {
    public static void main(String[] args) {
        StringProcessor toUpperCase = str -> str.toUpperCase();
        StringProcessor toLowerCase = str -> str.toLowerCase();
        StringProcessor reverse = str -> new StringBuilder(str).reverse().toString();
        
        String text = "Hello World";
        System.out.println("Original: " + text);
        System.out.println("Upper: " + toUpperCase.process(text));
        System.out.println("Lower: " + toLowerCase.process(text));
        System.out.println("Reverse: " + reverse.process(text));
    }
}
```

---

### 4. Built-in Functional Interfaces

Java provides several built-in functional interfaces in `java.util.function` package.

#### Predicate<T>:

Tests a condition and returns boolean.

```java
import java.util.function.Predicate;

public class PredicateExample {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<String> isEmpty = str -> str.isEmpty();
        
        System.out.println("Is 10 even? " + isEven.test(10));
        System.out.println("Is 5 positive? " + isPositive.test(5));
        System.out.println("Is '' empty? " + isEmpty.test(""));
        
        // Combining predicates
        Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);
        System.out.println("Is 10 even and positive? " + 
            isEvenAndPositive.test(10));
    }
}
```

#### Function<T, R>:

Takes one argument and produces a result.

```java
import java.util.function.Function;

public class FunctionExample {
    public static void main(String[] args) {
        Function<String, Integer> stringLength = str -> str.length();
        Function<Integer, Integer> square = n -> n * n;
        Function<String, String> toUpper = str -> str.toUpperCase();
        
        System.out.println("Length of 'Hello': " + 
            stringLength.apply("Hello"));
        System.out.println("Square of 5: " + square.apply(5));
        System.out.println("Upper case: " + toUpper.apply("hello"));
        
        // Chaining functions
        Function<Integer, Integer> addTen = n -> n + 10;
        Function<Integer, Integer> multiplyByTwo = n -> n * 2;
        Function<Integer, Integer> combined = addTen.andThen(multiplyByTwo);
        
        System.out.println("(5 + 10) * 2 = " + combined.apply(5));
    }
}
```

#### Consumer<T>:

Takes one argument and returns no result.

```java
import java.util.function.Consumer;

public class ConsumerExample {
    public static void main(String[] args) {
        Consumer<String> print = str -> System.out.println(str);
        Consumer<Integer> printSquare = n -> System.out.println(n * n);
        
        print.accept("Hello, Lambda!");
        printSquare.accept(5);
        
        // Chaining consumers
        Consumer<String> printUpper = str -> 
            System.out.println(str.toUpperCase());
        Consumer<String> printLength = str -> 
            System.out.println("Length: " + str.length());
        
        Consumer<String> combined = printUpper.andThen(printLength);
        combined.accept("hello");
    }
}
```

#### Supplier<T>:

Takes no arguments and returns a result.

```java
import java.util.function.Supplier;
import java.util.Random;

public class SupplierExample {
    public static void main(String[] args) {
        Supplier<Double> randomValue = () -> Math.random();
        Supplier<Integer> randomInt = () -> new Random().nextInt(100);
        Supplier<String> greeting = () -> "Hello, World!";
        
        System.out.println("Random value: " + randomValue.get());
        System.out.println("Random int: " + randomInt.get());
        System.out.println("Greeting: " + greeting.get());
    }
}
```

---

### 5. Lambda with Collections

Lambda expressions work seamlessly with Java Collections.

#### forEach():

```java
import java.util.Arrays;
import java.util.List;

public class ForEachExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
        
        // Traditional approach
        for (String name : names) {
            System.out.println(name);
        }
        
        // Lambda approach
        names.forEach(name -> System.out.println(name));
        
        // Method reference (even more concise)
        names.forEach(System.out::println);
    }
}
```

#### removeIf():

```java
import java.util.ArrayList;
import java.util.List;

public class RemoveIfExample {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(
            Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        );
        
        // Remove even numbers
        numbers.removeIf(n -> n % 2 == 0);
        
        System.out.println("Odd numbers: " + numbers);
    }
}
```

#### sort():

```java
import java.util.ArrayList;
import java.util.List;

public class SortExample {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(
            Arrays.asList("Charlie", "Alice", "David", "Bob")
        );
        
        // Sort alphabetically
        names.sort((a, b) -> a.compareTo(b));
        System.out.println("Sorted: " + names);
        
        // Sort by length
        names.sort((a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("By length: " + names);
        
        // Reverse order
        names.sort((a, b) -> b.compareTo(a));
        System.out.println("Reverse: " + names);
    }
}
```

---

### 6. Method References

Method references are a shorthand notation of lambda expressions to call a method.

#### Types of Method References:

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class MethodReferenceExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        
        // 1. Reference to static method
        // Lambda: str -> Integer.parseInt(str)
        Function<String, Integer> parser = Integer::parseInt;
        System.out.println(parser.apply("123"));
        
        // 2. Reference to instance method of particular object
        String prefix = "Hello, ";
        // Lambda: str -> prefix.concat(str)
        Function<String, String> greeter = prefix::concat;
        System.out.println(greeter.apply("World"));
        
        // 3. Reference to instance method of arbitrary object
        // Lambda: str -> str.toUpperCase()
        names.forEach(String::toUpperCase);
        
        // 4. Reference to constructor
        // Lambda: () -> new ArrayList<>()
        java.util.function.Supplier<List<String>> listSupplier = 
            java.util.ArrayList::new;
        List<String> newList = listSupplier.get();
    }
    
    // Static method for reference
    public static void printMessage(String message) {
        System.out.println(message);
    }
}
```

---

### 7. Variable Capture

Lambda expressions can access variables from the enclosing scope.

#### Effectively Final Variables:

```java
public class VariableCaptureExample {
    public static void main(String[] args) {
        int multiplier = 10;  // Effectively final
        
        // Lambda captures multiplier
        java.util.function.Function<Integer, Integer> multiply = 
            n -> n * multiplier;
        
        System.out.println("5 * 10 = " + multiply.apply(5));
        
        // This would cause compilation error:
        // multiplier = 20;  // Cannot modify captured variable
    }
}
```

#### Instance Variables:

```java
public class InstanceVariableCapture {
    private int multiplier = 10;
    
    public void demonstrate() {
        java.util.function.Function<Integer, Integer> multiply = 
            n -> n * multiplier;
        
        System.out.println("5 * 10 = " + multiply.apply(5));
        
        // Can modify instance variable
        multiplier = 20;
        System.out.println("5 * 20 = " + multiply.apply(5));
    }
    
    public static void main(String[] args) {
        new InstanceVariableCapture().demonstrate();
    }
}
```

---

### 8. Lambda Best Practices

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

public class LambdaBestPractices {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // 1. Keep lambdas short and simple
        // Good
        numbers.forEach(n -> System.out.println(n));
        
        // 2. Use method references when possible
        // Better
        numbers.forEach(System.out::println);
        
        // 3. Extract complex logic to methods
        // Instead of complex lambda
        Predicate<Integer> isEvenAndGreaterThanFive = 
            n -> n % 2 == 0 && n > 5;
        
        // Better: extract to method
        numbers.stream()
               .filter(LambdaBestPractices::isEvenAndGreaterThanFive)
               .forEach(System.out::println);
        
        // 4. Use descriptive parameter names
        // Bad
        numbers.forEach(x -> System.out.println(x));
        
        // Good
        numbers.forEach(number -> System.out.println(number));
    }
    
    private static boolean isEvenAndGreaterThanFive(int n) {
        return n % 2 == 0 && n > 5;
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Basic Lambda Expressions
Create lambda expressions for basic operations.


<details>
<summary>👁️ View Solution Code</summary>

```java
@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

public class Exercise1 {
    public static void main(String[] args) {
        MathOperation add = (a, b) -> a + b;
        MathOperation subtract = (a, b) -> a - b;
        MathOperation multiply = (a, b) -> a * b;
        MathOperation divide = (a, b) -> a / b;
        MathOperation modulo = (a, b) -> a % b;
        
        int a = 20, b = 5;
        System.out.println(a + " + " + b + " = " + add.operate(a, b));
        System.out.println(a + " - " + b + " = " + subtract.operate(a, b));
        System.out.println(a + " * " + b + " = " + multiply.operate(a, b));
        System.out.println(a + " / " + b + " = " + divide.operate(a, b));
        System.out.println(a + " % " + b + " = " + modulo.operate(a, b));
    }
}
```

</details>

---

### Exercise 2: Predicate Examples
Use Predicate for filtering.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Exercise2 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isGreaterThanFive = n -> n > 5;
        Predicate<Integer> isEvenAndGreaterThanFive = 
            isEven.and(isGreaterThanFive);
        
        System.out.println("Even numbers: " + 
            filter(numbers, isEven));
        System.out.println("Numbers > 5: " + 
            filter(numbers, isGreaterThanFive));
        System.out.println("Even and > 5: " + 
            filter(numbers, isEvenAndGreaterThanFive));
    }
    
    private static List<Integer> filter(List<Integer> list, 
                                       Predicate<Integer> predicate) {
        return list.stream()
                   .filter(predicate)
                   .collect(Collectors.toList());
    }
}
```

</details>

---

### Exercise 3: Function Chaining
Chain multiple functions together.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.function.Function;

public class Exercise3 {
    public static void main(String[] args) {
        Function<Integer, Integer> addTen = n -> n + 10;
        Function<Integer, Integer> multiplyByTwo = n -> n * 2;
        Function<Integer, Integer> square = n -> n * n;
        
        // Chain functions
        Function<Integer, Integer> combined = 
            addTen.andThen(multiplyByTwo).andThen(square);
        
        int input = 5;
        System.out.println("Input: " + input);
        System.out.println("After addTen: " + addTen.apply(input));
        System.out.println("After multiplyByTwo: " + 
            multiplyByTwo.apply(addTen.apply(input)));
        System.out.println("Final result: " + combined.apply(input));
        // ((5 + 10) * 2)^2 = (15 * 2)^2 = 30^2 = 900
    }
}
```

</details>

---

### Exercise 4: Consumer Examples
Use Consumer for operations without return values.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class Exercise4 {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        
        Consumer<String> printName = name -> 
            System.out.println("Name: " + name);
        Consumer<String> printLength = name -> 
            System.out.println("Length: " + name.length());
        Consumer<String> printUpper = name -> 
            System.out.println("Upper: " + name.toUpperCase());
        
        // Apply each consumer
        System.out.println("=== Individual Consumers ===");
        names.forEach(printName);
        
        // Chain consumers
        System.out.println("\n=== Chained Consumers ===");
        Consumer<String> combined = printName
            .andThen(printLength)
            .andThen(printUpper);
        
        names.forEach(combined);
    }
}
```

</details>

---

### Exercise 5: Supplier Examples
Use Supplier to generate values.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.function.Supplier;
import java.util.Random;
import java.time.LocalDateTime;

public class Exercise5 {
    public static void main(String[] args) {
        Supplier<Integer> randomInt = () -> new Random().nextInt(100);
        Supplier<Double> randomDouble = () -> Math.random();
        Supplier<String> timestamp = () -> LocalDateTime.now().toString();
        Supplier<String> uuid = () -> 
            java.util.UUID.randomUUID().toString();
        
        System.out.println("Random int: " + randomInt.get());
        System.out.println("Random double: " + randomDouble.get());
        System.out.println("Timestamp: " + timestamp.get());
        System.out.println("UUID: " + uuid.get());
        
        // Generate multiple values
        System.out.println("\n5 random numbers:");
        for (int i = 0; i < 5; i++) {
            System.out.println(randomInt.get());
        }
    }
}
```

</details>

---

### Exercise 6: List Operations
Perform various operations on lists using lambdas.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Exercise6 {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList(
            "Apple", "Banana", "Cherry", "Date", "Elderberry"
        ));
        
        System.out.println("Original: " + fruits);
        
        // Print all fruits
        System.out.println("\nAll fruits:");
        fruits.forEach(fruit -> System.out.println("- " + fruit));
        
        // Remove fruits starting with 'D'
        fruits.removeIf(fruit -> fruit.startsWith("D"));
        System.out.println("\nAfter removing 'D': " + fruits);
        
        // Sort by length
        fruits.sort((a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("Sorted by length: " + fruits);
        
        // Convert to uppercase
        fruits.replaceAll(fruit -> fruit.toUpperCase());
        System.out.println("Uppercase: " + fruits);
    }
}
```

</details>

---

### Exercise 7: Method References
Practice different types of method references.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class Exercise7 {
    public static void main(String[] args) {
        List<String> numbers = Arrays.asList("1", "2", "3", "4", "5");
        
        // Static method reference
        System.out.println("Parsed numbers:");
        numbers.stream()
               .map(Integer::parseInt)
               .forEach(System.out::println);
        
        // Instance method reference
        String prefix = "Number: ";
        numbers.forEach(prefix::concat);
        
        // Constructor reference
        Function<String, StringBuilder> builderCreator = 
            StringBuilder::new;
        StringBuilder sb = builderCreator.apply("Hello");
        System.out.println(sb);
    }
    
    public static void printWithPrefix(String str) {
        System.out.println("Value: " + str);
    }
}
```

</details>

---

### Exercise 8: Custom Functional Interface
Create and use custom functional interfaces.


<details>
<summary>👁️ View Solution Code</summary>

```java
@FunctionalInterface
interface StringValidator {
    boolean validate(String str);
}

@FunctionalInterface
interface StringTransformer {
    String transform(String str);
}

public class Exercise8 {
    public static void main(String[] args) {
        // Validators
        StringValidator isNotEmpty = str -> !str.isEmpty();
        StringValidator hasMinLength = str -> str.length() >= 5;
        StringValidator isAlphabetic = str -> str.matches("[a-zA-Z]+");
        
        // Transformers
        StringTransformer toUpper = str -> str.toUpperCase();
        StringTransformer reverse = str -> 
            new StringBuilder(str).reverse().toString();
        StringTransformer addPrefix = str -> "PREFIX_" + str;
        
        String input = "hello";
        
        System.out.println("Validations:");
        System.out.println("Not empty: " + isNotEmpty.validate(input));
        System.out.println("Min length 5: " + hasMinLength.validate(input));
        System.out.println("Alphabetic: " + isAlphabetic.validate(input));
        
        System.out.println("\nTransformations:");
        System.out.println("Upper: " + toUpper.transform(input));
        System.out.println("Reverse: " + reverse.transform(input));
        System.out.println("Prefix: " + addPrefix.transform(input));
    }
}
```

</details>

---

### Exercise 9: Lambda with Threads
Use lambdas with multithreading.


<details>
<summary>👁️ View Solution Code</summary>

```java
public class Exercise9 {
    public static void main(String[] args) {
        // Traditional Runnable
        Runnable task1 = () -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Task 1: " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        
        // Inline lambda
        Thread thread1 = new Thread(task1);
        Thread thread2 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Task 2: " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        thread1.start();
        thread2.start();
    }
}
```

</details>

---

### Exercise 10: Complex Lambda Application
Build a simple calculator using lambdas.


<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiFunction;

public class Exercise10 {
    private Map<String, BiFunction<Double, Double, Double>> operations;
    
    public Exercise10() {
        operations = new HashMap<>();
        operations.put("+", (a, b) -> a + b);
        operations.put("-", (a, b) -> a - b);
        operations.put("*", (a, b) -> a * b);
        operations.put("/", (a, b) -> a / b);
        operations.put("%", (a, b) -> a % b);
        operations.put("^", (a, b) -> Math.pow(a, b));
    }
    
    public double calculate(String operator, double a, double b) {
        BiFunction<Double, Double, Double> operation = 
            operations.get(operator);
        
        if (operation == null) {
            throw new IllegalArgumentException(
                "Unknown operator: " + operator);
        }
        
        return operation.apply(a, b);
    }
    
    public static void main(String[] args) {
        Exercise10 calculator = new Exercise10();
        
        System.out.println("10 + 5 = " + calculator.calculate("+", 10, 5));
        System.out.println("10 - 5 = " + calculator.calculate("-", 10, 5));
        System.out.println("10 * 5 = " + calculator.calculate("*", 10, 5));
        System.out.println("10 / 5 = " + calculator.calculate("/", 10, 5));
        System.out.println("10 % 3 = " + calculator.calculate("%", 10, 3));
        System.out.println("2 ^ 8 = " + calculator.calculate("^", 2, 8));
    }
}
```

</details>

---

### Exercise 11: Event-Driven Task Scheduler with Lambda-Based Callbacks

**📝 Problem Statement:**
Create a comprehensive event-driven task scheduler demonstrating lambda-based callback patterns, functional interface composition, event handling with custom functional interfaces, configurable event listeners using lambdas, support for multiple event types (SUCCESS, ERROR, TIMEOUT, RETRY), callback chaining with Consumer composition, task execution with pre/post hooks, error recovery strategies using Function, conditional event triggering using Predicate, and comprehensive event logging and statistics tracking. The system should support task registration with custom callbacks for different lifecycle events, allow multiple listeners per event type using Consumer chaining, provide fluent API for callback configuration, execute tasks with configurable timeout and retry policies, trigger appropriate callbacks based on task outcome, support custom event types beyond built-in ones, track event statistics (count, timing, success rate), and generate detailed execution reports, showcasing production-grade lambda usage patterns for event-driven architectures, callback composition techniques, and functional programming principles in real-world task scheduling scenarios.

**Requirements:**
- Create Task class with: id, name, action (Runnable/Callable), status, result, error
- Create TaskScheduler class managing task execution and event callbacks
- Support event types: TASK_STARTED, TASK_COMPLETED, TASK_FAILED, TASK_TIMEOUT, TASK_RETRY
- Use Consumer<Task> for event callbacks (void operation on task)
- Use Predicate<Task> for conditional callback execution
- Use Function<Task, Task> for task transformation/decoration
- Use Supplier<Task> for task creation factories
- Support registering multiple callbacks per event type using andThen()
- Provide fluent API: scheduler.onSuccess(callback).onError(callback).execute(task)
- Execute tasks with configurable timeout (use Thread or simulate)
- Implement retry logic with configurable attempts and backoff
- Trigger callbacks atomically after task state changes
- Support pre-execution hooks (modify task before run)
- Support post-execution hooks (modify result after run)
- Track event statistics: total fired, callbacks executed, average timing
- Generate execution report: task outcomes, events triggered, callback chains
- Demonstrate callback composition: combined.accept() executes all chained callbacks
- Show Predicate usage: only trigger callback if condition met
- Handle callback exceptions gracefully without affecting task execution

**Sample Test Cases:**
```
Input: 5 tasks with different outcomes (success, failure, timeout, retry scenarios)
Register callbacks for each event type, some with conditions

Expected Output:
=== Event-Driven Task Scheduler ===

Configuring task scheduler with callbacks...

✓ Registered SUCCESS callback: Log success message
✓ Registered SUCCESS callback: Update statistics
✓ Registered ERROR callback: Log error details
✓ Registered ERROR callback: Notify administrator
✓ Registered TIMEOUT callback: Log timeout and retry
✓ Registered RETRY callback: Log retry attempt

Creating tasks...
  Task #1: "Download File" (should succeed)
  Task #2: "Process Data" (should fail)
  Task #3: "Send Email" (should timeout then succeed)
  Task #4: "Validate Input" (should succeed immediately)
  Task #5: "Complex Calculation" (should fail with retry)

Executing tasks...

[Task #1] Download File - STARTED
  Event: TASK_STARTED
  ⏱ Pre-execution hook: Validate prerequisites
  ✓ Prerequisites validated

[Task #1] Download File - RUNNING
  Executing task action...
  ✓ Task completed successfully

[Task #1] Download File - COMPLETED
  Event: TASK_COMPLETED
  ⏱ Post-execution hook: Clean up resources
  ✓ Resources cleaned

  Event: SUCCESS triggered
  → Callback 1: Log success message
    ✓ [SUCCESS] Task 'Download File' completed successfully
  → Callback 2: Update statistics
    ✓ Statistics updated: success_count++

[Task #2] Process Data - STARTED
  Event: TASK_STARTED
  ⏱ Pre-execution hook: Validate prerequisites
  ✓ Prerequisites validated

[Task #2] Process Data - RUNNING
  Executing task action...
  ✗ Task failed: Invalid data format

[Task #2] Process Data - FAILED
  Event: TASK_FAILED
  Error: IllegalArgumentException: Invalid data format

  Event: ERROR triggered
  → Callback 1: Log error details
    ✗ [ERROR] Task 'Process Data' failed: Invalid data format
    Stack trace logged to error.log
  → Callback 2: Notify administrator
    ✓ Email sent to admin@example.com

[Task #3] Send Email - STARTED
  Event: TASK_STARTED

[Task #3] Send Email - RUNNING
  Executing task action...
  ⏱ Timeout after 5 seconds...
  ✗ Task timed out!

[Task #3] Send Email - TIMEOUT
  Event: TASK_TIMEOUT
  Timeout: 5000ms exceeded

  Event: TIMEOUT triggered
  → Callback: Log timeout and retry
    ⚠ [TIMEOUT] Task 'Send Email' timed out after 5000ms
    Scheduling retry...

[Task #3] Send Email - RETRY ATTEMPT #1
  Event: TASK_RETRY
  Retry attempt: 1/3

  Event: RETRY triggered
  → Callback: Log retry attempt
    ↻ [RETRY] Task 'Send Email' - Attempt 1 of 3

[Task #3] Send Email - RUNNING (retry)
  Executing task action...
  ✓ Task completed successfully

[Task #3] Send Email - COMPLETED
  Event: SUCCESS triggered
  → Callbacks executed (2 callbacks)

[Task #4] Validate Input - STARTED
  Event: TASK_STARTED

[Task #4] Validate Input - RUNNING
  Executing task action...
  ✓ Task completed successfully (fast: 50ms)

[Task #4] Validate Input - COMPLETED
  Event: SUCCESS triggered
  → Callbacks executed (2 callbacks)

[Task #5] Complex Calculation - STARTED
  Event: TASK_STARTED

[Task #5] Complex Calculation - RUNNING
  Executing task action...
  ✗ Task failed: Division by zero

[Task #5] Complex Calculation - FAILED
  Event: ERROR triggered
  → Callbacks executed (2 callbacks)

[Task #5] Complex Calculation - RETRY ATTEMPT #1
  Event: TASK_RETRY
  Executing task action...
  ✗ Task failed again: Division by zero

[Task #5] Complex Calculation - RETRY ATTEMPT #2
  Event: TASK_RETRY
  Executing task action...
  ✗ Task failed again: Division by zero

[Task #5] Complex Calculation - RETRY ATTEMPT #3
  Event: TASK_RETRY
  Executing task action...
  ✗ Task failed again: Division by zero

[Task #5] Complex Calculation - FAILED (max retries exceeded)
  Event: ERROR triggered (final)

=== Execution Report ===

Task Summary:
  Total tasks: 5
  Completed: 3 (60%)
  Failed: 2 (40%)
  Timed out: 1 (20%, 1 recovered)
  Retries: 4 total (1 successful, 3 failed)

Event Statistics:
  TASK_STARTED: 5 events, 5 callbacks executed
  TASK_COMPLETED: 3 events, 6 callbacks executed (2 per success)
  TASK_FAILED: 2 events, 4 callbacks executed (2 per error)
  TASK_TIMEOUT: 1 event, 1 callback executed
  TASK_RETRY: 4 events, 4 callbacks executed

Callback Performance:
  Total callbacks registered: 6
  Total callbacks executed: 20
  Average callback execution time: 2.3ms
  No callback failures

Task Details:
  ✓ Task #1 (Download File): SUCCESS - 1.2s
  ✗ Task #2 (Process Data): FAILED - 0.8s
  ✓ Task #3 (Send Email): SUCCESS after 1 retry - 7.5s total
  ✓ Task #4 (Validate Input): SUCCESS - 0.05s
  ✗ Task #5 (Complex Calculation): FAILED after 3 retries - 2.1s total

Callback Chain Demonstration:
  SUCCESS event has 2 chained callbacks:
    1. Log success message
    2. Update statistics
  Both execute atomically via andThen() composition

Conditional Callback Example:
  Predicate: Only log slow tasks (>1s)
  Triggered for: Task #1, Task #3, Task #5
  Skipped for: Task #2, Task #4

Fluent API Usage:
  scheduler.onSuccess(logSuccess)
           .onSuccess(updateStats)
           .onError(logError)
           .onError(notifyAdmin)
           .onTimeout(retryTask)
           .execute(task);
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.time.LocalDateTime;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.function.*;

// ============= Task Status Enum =============

enum TaskStatus {
    PENDING, STARTED, RUNNING, COMPLETED, FAILED, TIMEOUT, RETRYING
}

// ============= Event Type Enum =============

enum EventType {
    TASK_STARTED, TASK_COMPLETED, TASK_FAILED, TASK_TIMEOUT, TASK_RETRY
}

// ============= Task Class =============

class Task {
    private static int idCounter = 1;
    private int id;
    private String name;
    private Runnable action;
    private TaskStatus status;
    private String result;
    private Exception error;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int retryCount;

    public Task(String name, Runnable action) {
        this.id = idCounter++;
        this.name = name;
        this.action = action;
        this.status = TaskStatus.PENDING;
        this.retryCount = 0;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public Runnable getAction() { return action; }
    public TaskStatus getStatus() { return status; }
    public String getResult() { return result; }
    public Exception getError() { return error; }
    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public int getRetryCount() { return retryCount; }

    // Setters
    public void setStatus(TaskStatus status) { this.status = status; }
    public void setResult(String result) { this.result = result; }
    public void setError(Exception error) { this.error = error; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public void incrementRetryCount() { this.retryCount++; }

    public Duration getDuration() {
        if (startTime == null || endTime == null) return null;
        return Duration.between(startTime, endTime);
    }

    @Override
    public String toString() {
        return "Task #" + id + " (" + name + ")";
    }
}

// ============= Event Statistics Class =============

class EventStatistics {
    private Map<EventType, Integer> eventCounts = new HashMap<>();
    private Map<EventType, Integer> callbackCounts = new HashMap<>();
    private int totalCallbacksExecuted = 0;

    public void recordEvent(EventType type) {
        eventCounts.put(type, eventCounts.getOrDefault(type, 0) + 1);
    }

    public void recordCallback(EventType type) {
        callbackCounts.put(type, callbackCounts.getOrDefault(type, 0) + 1);
        totalCallbacksExecuted++;
    }

    public int getEventCount(EventType type) {
        return eventCounts.getOrDefault(type, 0);
    }

    public int getCallbackCount(EventType type) {
        return callbackCounts.getOrDefault(type, 0);
    }

    public int getTotalCallbacksExecuted() {
        return totalCallbacksExecuted;
    }

    public Map<EventType, Integer> getEventCounts() {
        return new HashMap<>(eventCounts);
    }
}

// ============= Task Scheduler Class =============

class TaskScheduler {
    private Map<EventType, Consumer<Task>> eventCallbacks;
    private EventStatistics statistics;
    private Consumer<Task> preExecutionHook;
    private Consumer<Task> postExecutionHook;
    private int maxRetries;
    private int timeoutMillis;

    public TaskScheduler() {
        this.eventCallbacks = new HashMap<>();
        this.statistics = new EventStatistics();
        this.maxRetries = 3;
        this.timeoutMillis = 5000;
    }

    // Fluent API: Register callbacks
    public TaskScheduler onSuccess(Consumer<Task> callback) {
        return on(EventType.TASK_COMPLETED, callback);
    }

    public TaskScheduler onError(Consumer<Task> callback) {
        return on(EventType.TASK_FAILED, callback);
    }

    public TaskScheduler onTimeout(Consumer<Task> callback) {
        return on(EventType.TASK_TIMEOUT, callback);
    }

    public TaskScheduler onRetry(Consumer<Task> callback) {
        return on(EventType.TASK_RETRY, callback);
    }

    public TaskScheduler onStarted(Consumer<Task> callback) {
        return on(EventType.TASK_STARTED, callback);
    }

    // Generic event registration with callback chaining
    public TaskScheduler on(EventType type, Consumer<Task> callback) {
        if (eventCallbacks.containsKey(type)) {
            // Chain with existing callback using andThen()
            eventCallbacks.put(type, eventCallbacks.get(type).andThen(callback));
        } else {
            eventCallbacks.put(type, callback);
        }
        System.out.println("✓ Registered " + type + " callback");
        return this;
    }

    // Set pre/post execution hooks
    public TaskScheduler preExecution(Consumer<Task> hook) {
        this.preExecutionHook = hook;
        return this;
    }

    public TaskScheduler postExecution(Consumer<Task> hook) {
        this.postExecutionHook = hook;
        return this;
    }

    // Configuration
    public TaskScheduler maxRetries(int retries) {
        this.maxRetries = retries;
        return this;
    }

    public TaskScheduler timeout(int millis) {
        this.timeoutMillis = millis;
        return this;
    }

    // Execute task with event handling
    public void execute(Task task) {
        System.out.println("\n[" + task + "] " + task.getName() + " - STARTED");
        task.setStatus(TaskStatus.STARTED);
        task.setStartTime(LocalDateTime.now());

        // Trigger TASK_STARTED event
        triggerEvent(EventType.TASK_STARTED, task);

        // Pre-execution hook
        if (preExecutionHook != null) {
            System.out.println("  ⏱ Pre-execution hook: Validate prerequisites");
            preExecutionHook.accept(task);
            System.out.println("  ✓ Prerequisites validated");
        }

        // Execute with retries
        boolean success = false;
        for (int attempt = 0; attempt <= maxRetries && !success; attempt++) {
            if (attempt > 0) {
                task.incrementRetryCount();
                task.setStatus(TaskStatus.RETRYING);
                System.out.println("\n[" + task + "] " + task.getName() +
                    " - RETRY ATTEMPT #" + attempt);
                triggerEvent(EventType.TASK_RETRY, task);
            }

            System.out.println("[" + task + "] " + task.getName() + " - RUNNING");
            task.setStatus(TaskStatus.RUNNING);

            try {
                System.out.println("  Executing task action...");
                task.getAction().run();
                task.setResult("Success");
                success = true;
                System.out.println("  ✓ Task completed successfully");
            } catch (Exception e) {
                task.setError(e);
                System.out.println("  ✗ Task failed: " + e.getMessage());
            }
        }

        task.setEndTime(LocalDateTime.now());

        // Determine final status and trigger appropriate event
        if (success) {
            task.setStatus(TaskStatus.COMPLETED);
            System.out.println("\n[" + task + "] " + task.getName() + " - COMPLETED");

            // Post-execution hook
            if (postExecutionHook != null) {
                System.out.println("  ⏱ Post-execution hook: Clean up resources");
                postExecutionHook.accept(task);
                System.out.println("  ✓ Resources cleaned");
            }

            triggerEvent(EventType.TASK_COMPLETED, task);
        } else {
            task.setStatus(TaskStatus.FAILED);
            System.out.println("\n[" + task + "] " + task.getName() + " - FAILED");
            System.out.println("  Error: " + task.getError().getClass().getSimpleName() +
                ": " + task.getError().getMessage());
            triggerEvent(EventType.TASK_FAILED, task);
        }
    }

    // Trigger event and execute callbacks
    private void triggerEvent(EventType type, Task task) {
        System.out.println("  Event: " + type);
        statistics.recordEvent(type);

        Consumer<Task> callback = eventCallbacks.get(type);
        if (callback != null) {
            try {
                System.out.println("  Event: " + type + " triggered");
                callback.accept(task);
                statistics.recordCallback(type);
            } catch (Exception e) {
                System.out.println("  ✗ Callback failed: " + e.getMessage());
            }
        }
    }

    public EventStatistics getStatistics() {
        return statistics;
    }
}

// ============= Main Demo =============

public class TestEventDrivenScheduler {

    public static void main(String[] args) {
        System.out.println("=== Event-Driven Task Scheduler ===\n");
        System.out.println("Configuring task scheduler with callbacks...\n");

        TaskScheduler scheduler = new TaskScheduler()
            .maxRetries(3)
            .timeout(5000);

        // Register callbacks using fluent API and Consumer chaining
        scheduler
            // Success callbacks (chained)
            .onSuccess(task -> {
                System.out.println("  → Callback 1: Log success message");
                System.out.println("    ✓ [SUCCESS] Task '" + task.getName() +
                    "' completed successfully");
            })
            .onSuccess(task -> {
                System.out.println("  → Callback 2: Update statistics");
                System.out.println("    ✓ Statistics updated: success_count++");
            })
            // Error callbacks (chained)
            .onError(task -> {
                System.out.println("  → Callback 1: Log error details");
                System.out.println("    ✗ [ERROR] Task '" + task.getName() +
                    "' failed: " + task.getError().getMessage());
                System.out.println("    Stack trace logged to error.log");
            })
            .onError(task -> {
                System.out.println("  → Callback 2: Notify administrator");
                System.out.println("    ✓ Email sent to admin@example.com");
            })
            // Retry callback
            .onRetry(task -> {
                System.out.println("  Event: TASK_RETRY");
                System.out.println("  Retry attempt: " + task.getRetryCount() +
                    "/" + 3);
                System.out.println("\n  Event: RETRY triggered");
                System.out.println("  → Callback: Log retry attempt");
                System.out.println("    ↻ [RETRY] Task '" + task.getName() +
                    "' - Attempt " + task.getRetryCount() + " of 3");
            })
            // Pre/post execution hooks
            .preExecution(task -> {
                // Validate prerequisites
            })
            .postExecution(task -> {
                // Clean up resources
            });

        System.out.println("\nCreating tasks...");

        // Create tasks with different outcomes
        List<Task> tasks = new ArrayList<>();

        // Task 1: Success
        tasks.add(new Task("Download File", () -> {
            try { Thread.sleep(100); } catch (InterruptedException e) {}
        }));

        // Task 2: Failure
        tasks.add(new Task("Process Data", () -> {
            throw new IllegalArgumentException("Invalid data format");
        }));

        // Task 3: Success (simulating no timeout for demo)
        tasks.add(new Task("Send Email", () -> {
            try { Thread.sleep(100); } catch (InterruptedException e) {}
        }));

        // Task 4: Fast success
        tasks.add(new Task("Validate Input", () -> {
            try { Thread.sleep(50); } catch (InterruptedException e) {}
        }));

        // Task 5: Failure with retries
        tasks.add(new Task("Complex Calculation", () -> {
            throw new ArithmeticException("Division by zero");
        }));

        for (int i = 0; i < tasks.size(); i++) {
            System.out.println("  Task #" + (i + 1) + ": \"" +
                tasks.get(i).getName() + "\"");
        }

        System.out.println("\nExecuting tasks...");

        // Execute all tasks
        for (Task task : tasks) {
            scheduler.execute(task);
        }

        // Generate report
        displayReport(tasks, scheduler.getStatistics());
    }

    private static void displayReport(List<Task> tasks, EventStatistics stats) {
        System.out.println("\n\n=== Execution Report ===\n");

        // Task summary
        long completed = tasks.stream().filter(t ->
            t.getStatus() == TaskStatus.COMPLETED).count();
        long failed = tasks.stream().filter(t ->
            t.getStatus() == TaskStatus.FAILED).count();
        int totalRetries = tasks.stream().mapToInt(Task::getRetryCount).sum();

        System.out.println("Task Summary:");
        System.out.println("  Total tasks: " + tasks.size());
        System.out.println("  Completed: " + completed + " (" +
            (completed * 100 / tasks.size()) + "%)");
        System.out.println("  Failed: " + failed + " (" +
            (failed * 100 / tasks.size()) + "%)");
        System.out.println("  Retries: " + totalRetries + " total");

        System.out.println("\nEvent Statistics:");
        for (EventType type : EventType.values()) {
            int eventCount = stats.getEventCount(type);
            int callbackCount = stats.getCallbackCount(type);
            if (eventCount > 0) {
                System.out.println("  " + type + ": " + eventCount +
                    " events, " + callbackCount + " callbacks executed");
            }
        }

        System.out.println("\nCallback Performance:");
        System.out.println("  Total callbacks executed: " +
            stats.getTotalCallbacksExecuted());
        System.out.println("  No callback failures");

        System.out.println("\nTask Details:");
        for (Task task : tasks) {
            String statusSymbol = task.getStatus() == TaskStatus.COMPLETED ? "✓" : "✗";
            String duration = task.getDuration() != null ?
                (task.getDuration().toMillis() / 1000.0) + "s" : "N/A";
            String retryInfo = task.getRetryCount() > 0 ?
                " after " + task.getRetryCount() + " retries" : "";
            System.out.println("  " + statusSymbol + " Task #" + task.getId() +
                " (" + task.getName() + "): " + task.getStatus() + retryInfo +
                " - " + duration);
        }

        System.out.println("\nCallback Chain Demonstration:");
        System.out.println("  SUCCESS event has 2 chained callbacks:");
        System.out.println("    1. Log success message");
        System.out.println("    2. Update statistics");
        System.out.println("  Both execute atomically via andThen() composition");
    }
}
```

</details>

**💡 Tips:**
- Consumer.andThen() chains callbacks; all execute in sequence atomically
- Fluent API returns `this`; enables method chaining for readable configuration
- Pre/post execution hooks demonstrate decorator pattern with lambdas
- Event callbacks isolated from task execution; failures don't affect task
- Consumer<Task> perfect for event callbacks; accepts task, returns void
- Predicate<Task> enables conditional callback execution; filter events
- Function<Task, Task> allows task transformation; modify before/after execution
- Supplier<Task> useful for task factories; lazy task creation
- EventType enum centralizes event types; type-safe event handling
- Statistics tracking demonstrates side-effect accumulation in callbacks
- Lambda variable capture: callbacks capture `this` reference to scheduler
- Method reference alternative: `System.out::println` instead of lambda
- Functional composition: combine multiple predicates with and()/or()
- Optional<Exception> could wrap errors; functional error handling
- BiConsumer<Task, EventType> alternative: callback receives both task and event

---

### Exercise 12: Data Transformation Pipeline with Function Chaining

**📝 Problem Statement:**
Create a comprehensive data transformation pipeline demonstrating function composition, functional interface chaining, multi-stage data processing, data validation with Predicate composition, data transformation with Function chaining (andThen/compose), data enrichment with external lookups, error handling with Optional and Function, pipeline configuration with builder pattern, support for parallel and sequential processing modes, conditional transformations using Predicate guards, transformation statistics tracking, and rollback support for failed transformations. The system should accept raw data records as input, validate data through multiple validation rules using Predicate composition, transform data through multiple stages using Function chaining, enrich data with additional information from external sources, handle transformation errors gracefully using Optional, support branching pipelines (different paths based on conditions), track transformation metrics (success rate, timing, error types), allow pipeline configuration through fluent API, and generate comprehensive transformation reports, showcasing production-grade functional programming patterns for ETL-like data processing, proper function composition techniques, and real-world data pipeline implementation.

**Requirements:**
- Create DataRecord class with: id, data (Map<String, Object>), metadata, errors
- Create Pipeline class managing transformation stages
- Use Predicate<DataRecord> for validation rules (can compose with and()/or())
- Use Function<DataRecord, DataRecord> for transformations (can chain with andThen())
- Use Function<DataRecord, Optional<DataRecord>> for error-prone transformations
- Support validation stage: multiple predicates combined with and()
- Support transformation stage: multiple functions chained with andThen()
- Support enrichment stage: lookup additional data (simulate with Function)
- Support filtering stage: remove records based on Predicate
- Support error handling: wrap errors in Optional, continue pipeline
- Provide fluent API: pipeline.validate(pred1).transform(func1).enrich(func2).execute()
- Track stage metrics: records in, records out, errors, timing
- Support conditional transformations: apply function only if predicate true
- Support transformation rollback: restore original state on error
- Generate transformation report: success/failure counts, error details
- Demonstrate andThen(): f1.andThen(f2) applies f1 then f2
- Demonstrate compose(): f1.compose(f2) applies f2 then f1
- Show Predicate composition: isValid.and(isComplete).and(isClean)
- Handle null values safely using Optional
- Support custom transformation functions passed as lambdas

**Sample Test Cases:**
```
Input: 10 data records with various quality issues (missing fields, invalid formats, duplicates)

Expected Output:
=== Data Transformation Pipeline ===

Creating data transformation pipeline...
  Pipeline Mode: SEQUENTIAL
  Error Handling: CONTINUE_ON_ERROR
  Transformation Stages: 5

Input Dataset: 10 records
  Record #1: {id=1, name="Alice", age=25, email="alice@example.com"}
  Record #2: {id=2, name="Bob", age=-5, email="invalid"}
  Record #3: {id=3, name=null, age=30, email="charlie@example.com"}
  Record #4: {id=4, name="David", age=35, email="david@example.com"}
  Record #5: {id=5, name="Eve", age=28, email="eve@example.com"}
  Record #6: {id=6, name="Frank", age=150, email="frank@example.com"}
  Record #7: {id=7, name="Grace", age=32, email="grace@example.com"}
  Record #8: {id=8, name="Henry", age=29, email=""}
  Record #9: {id=9, name="Ivy", age=27, email="ivy@example.com"}
  Record #10: {id=10, name="Jack", age=31, email="jack@example.com"}

Stage 1: Validation
  Validation Rules:
    1. name must not be null
    2. age must be 0-120
    3. email must contain '@'
  Combining predicates with and() composition...

  ✓ Record #1: VALID
  ✗ Record #2: INVALID - age must be 0-120
  ✗ Record #3: INVALID - name must not be null
  ✓ Record #4: VALID
  ✓ Record #5: VALID
  ✗ Record #6: INVALID - age must be 0-120
  ✓ Record #7: VALID
  ✗ Record #8: INVALID - email must contain '@'
  ✓ Record #9: VALID
  ✓ Record #10: VALID

  Stage Result: 6 valid, 4 invalid
  Continuing with 6 valid records...

Stage 2: Transformation (Name Normalization)
  Transformation: Capitalize names
  Using Function<DataRecord, DataRecord>

  Record #1: "Alice" → "ALICE"
  Record #4: "David" → "DAVID"
  Record #5: "Eve" → "EVE"
  Record #7: "Grace" → "GRACE"
  Record #9: "Ivy" → "IVY"
  Record #10: "Jack" → "JACK"

  Stage Result: 6 records transformed

Stage 3: Transformation (Email Domain Extraction)
  Transformation: Extract email domain
  Chaining with andThen() composition...

  Record #1: "alice@example.com" → domain: "example.com"
  Record #4: "david@example.com" → domain: "example.com"
  Record #5: "eve@example.com" → domain: "example.com"
  Record #7: "grace@example.com" → domain: "example.com"
  Record #9: "ivy@example.com" → domain: "example.com"
  Record #10: "jack@example.com" → domain: "example.com"

  Stage Result: 6 records transformed

Stage 4: Enrichment (External Lookup)
  Enrichment: Lookup company by email domain
  Using Function<String, Optional<Company>>

  Record #1: domain "example.com" → Company: "Example Corp"
  Record #4: domain "example.com" → Company: "Example Corp"
  Record #5: domain "example.com" → Company: "Example Corp"
  Record #7: domain "example.com" → Company: "Example Corp"
  Record #9: domain "example.com" → Company: "Example Corp"
  Record #10: domain "example.com" → Company: "Example Corp"

  Stage Result: 6 records enriched

Stage 5: Conditional Transformation (Age Category)
  Condition: Only for age > 30
  Transformation: Add "senior" category

  Record #1: age=25 → SKIPPED (not > 30)
  Record #4: age=35 → category: "senior"
  Record #5: age=28 → SKIPPED (not > 30)
  Record #7: age=32 → category: "senior"
  Record #9: age=27 → SKIPPED (not > 30)
  Record #10: age=31 → category: "senior"

  Stage Result: 3 records transformed, 3 skipped

Pipeline Execution Complete!

Final Output Dataset: 6 records
  Record #1: {id=1, name="ALICE", age=25, email="alice@example.com", domain="example.com", company="Example Corp"}
  Record #4: {id=4, name="DAVID", age=35, email="david@example.com", domain="example.com", company="Example Corp", category="senior"}
  Record #5: {id=5, name="EVE", age=28, email="eve@example.com", domain="example.com", company="Example Corp"}
  Record #7: {id=7, name="GRACE", age=32, email="grace@example.com", domain="example.com", company="Example Corp", category="senior"}
  Record #9: {id=9, name="IVY", age=27, email="ivy@example.com", domain="example.com", company="Example Corp"}
  Record #10: {id=10, name="JACK", age=31, email="jack@example.com", domain="example.com", company="Example Corp", category="senior"}

=== Transformation Report ===

Pipeline Statistics:
  Input records: 10
  Output records: 6
  Success rate: 60%
  Total processing time: 145ms
  Average time per record: 24ms

Stage Breakdown:
  Stage 1 (Validation): 10 in → 6 out (4 filtered)
  Stage 2 (Transformation): 6 in → 6 out
  Stage 3 (Transformation): 6 in → 6 out
  Stage 4 (Enrichment): 6 in → 6 out
  Stage 5 (Conditional): 6 in → 6 out (3 transformed)

Validation Errors:
  Record #2: age must be 0-120
  Record #3: name must not be null
  Record #6: age must be 0-120
  Record #8: email must contain '@'

Function Composition Demonstration:
  1. andThen() example:
     capitalizeNames.andThen(extractDomain)
     First capitalizes, then extracts domain
     Result: "Alice" → "ALICE" → domain extracted

  2. Predicate composition:
     hasName.and(hasValidAge).and(hasValidEmail)
     All conditions must be true
     Short-circuits on first false

  3. Optional handling:
     enrichData returns Optional<DataRecord>
     Pipeline continues only if present
     Errors wrapped, doesn't break pipeline

Performance Metrics:
  ✓ No transformations failed
  ✓ All enrichments successful
  ✓ Pipeline completed without errors
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.*;
import java.util.function.*;
import java.util.stream.Collectors;

// ============= Data Record Class =============

class DataRecord {
    private int id;
    private Map<String, Object> data;
    private Map<String, String> metadata;
    private List<String> errors;

    public DataRecord(int id) {
        this.id = id;
        this.data = new HashMap<>();
        this.metadata = new HashMap<>();
        this.errors = new ArrayList<>();
    }

    public int getId() { return id; }
    public Map<String, Object> getData() { return data; }
    public Map<String, String> getMetadata() { return metadata; }
    public List<String> getErrors() { return errors; }

    public Object get(String key) { return data.get(key); }
    public void put(String key, Object value) { data.put(key, value); }
    public void addMetadata(String key, String value) { metadata.put(key, value); }
    public void addError(String error) { errors.add(error); }
    public boolean hasErrors() { return !errors.isEmpty(); }

    @Override
    public String toString() {
        return "Record #" + id + ": " + data.toString();
    }
}

// ============= Pipeline Stage Class =============

class PipelineStage {
    private String name;
    private Function<List<DataRecord>, List<DataRecord>> operation;
    private int recordsIn;
    private int recordsOut;
    private long executionTime;

    public PipelineStage(String name,
                         Function<List<DataRecord>, List<DataRecord>> operation) {
        this.name = name;
        this.operation = operation;
    }

    public List<DataRecord> execute(List<DataRecord> input) {
        recordsIn = input.size();
        long start = System.nanoTime();
        List<DataRecord> output = operation.apply(input);
        executionTime = (System.nanoTime() - start) / 1_000_000;
        recordsOut = output.size();
        return output;
    }

    public String getName() { return name; }
    public int getRecordsIn() { return recordsIn; }
    public int getRecordsOut() { return recordsOut; }
    public long getExecutionTime() { return executionTime; }
}

// ============= Data Pipeline Class =============

class DataPipeline {
    private List<PipelineStage> stages;
    private String mode;

    public DataPipeline() {
        this.stages = new ArrayList<>();
        this.mode = "SEQUENTIAL";
    }

    // Fluent API: Add validation stage
    public DataPipeline validate(Predicate<DataRecord> predicate, String ruleName) {
        PipelineStage stage = new PipelineStage("Validation", records -> {
            List<DataRecord> valid = new ArrayList<>();
            for (DataRecord record : records) {
                if (predicate.test(record)) {
                    System.out.println("  ✓ Record #" + record.getId() + ": VALID");
                    valid.add(record);
                } else {
                    System.out.println("  ✗ Record #" + record.getId() +
                        ": INVALID - " + ruleName);
                    record.addError(ruleName);
                }
            }
            return valid;
        });
        stages.add(stage);
        return this;
    }

    // Fluent API: Add transformation stage
    public DataPipeline transform(Function<DataRecord, DataRecord> transformation,
                                  String transformName) {
        PipelineStage stage = new PipelineStage("Transformation (" + transformName + ")",
            records -> records.stream()
                .map(transformation)
                .collect(Collectors.toList())
        );
        stages.add(stage);
        return this;
    }

    // Fluent API: Add conditional transformation
    public DataPipeline transformIf(Predicate<DataRecord> condition,
                                    Function<DataRecord, DataRecord> transformation,
                                    String conditionName) {
        PipelineStage stage = new PipelineStage(
            "Conditional Transformation (" + conditionName + ")",
            records -> records.stream()
                .map(record -> {
                    if (condition.test(record)) {
                        return transformation.apply(record);
                    }
                    return record;
                })
                .collect(Collectors.toList())
        );
        stages.add(stage);
        return this;
    }

    // Fluent API: Add enrichment stage
    public DataPipeline enrich(Function<DataRecord, DataRecord> enrichment,
                              String enrichName) {
        PipelineStage stage = new PipelineStage("Enrichment (" + enrichName + ")",
            records -> records.stream()
                .map(enrichment)
                .collect(Collectors.toList())
        );
        stages.add(stage);
        return this;
    }

    // Execute pipeline
    public List<DataRecord> execute(List<DataRecord> input) {
        System.out.println("\nInput Dataset: " + input.size() + " records");
        for (DataRecord record : input) {
            System.out.println("  " + record);
        }

        List<DataRecord> current = input;
        int stageNum = 1;

        for (PipelineStage stage : stages) {
            System.out.println("\nStage " + stageNum++ + ": " + stage.getName());
            current = stage.execute(current);
            System.out.println("  Stage Result: " + stage.getRecordsOut() +
                " records processed");
        }

        System.out.println("\nPipeline Execution Complete!");
        System.out.println("\nFinal Output Dataset: " + current.size() + " records");
        for (DataRecord record : current) {
            System.out.println("  " + record);
        }

        return current;
    }

    public List<PipelineStage> getStages() {
        return stages;
    }
}

// ============= Main Demo =============

public class TestDataPipeline {

    public static void main(String[] args) {
        System.out.println("=== Data Transformation Pipeline ===\n");

        // Create input data
        List<DataRecord> input = createSampleData();

        // Create pipeline with function composition
        DataPipeline pipeline = new DataPipeline();

        // Stage 1: Validation with Predicate composition
        System.out.println("Creating data transformation pipeline...");
        System.out.println("  Pipeline Mode: SEQUENTIAL");
        System.out.println("  Error Handling: CONTINUE_ON_ERROR");

        Predicate<DataRecord> hasName = record -> record.get("name") != null;
        Predicate<DataRecord> hasValidAge = record -> {
            Object age = record.get("age");
            return age != null && (int) age >= 0 && (int) age <= 120;
        };
        Predicate<DataRecord> hasValidEmail = record -> {
            Object email = record.get("email");
            return email != null && email.toString().contains("@");
        };

        // Compose predicates with and()
        Predicate<DataRecord> isValid = hasName.and(hasValidAge).and(hasValidEmail);

        System.out.println("  Transformation Stages: 5\n");

        // Configure pipeline
        pipeline
            // Stage 1: Validation
            .validate(hasName, "name must not be null")
            .validate(hasValidAge, "age must be 0-120")
            .validate(hasValidEmail, "email must contain '@'")

            // Stage 2: Transform name to uppercase
            .transform(record -> {
                String name = (String) record.get("name");
                System.out.println("  Record #" + record.getId() + ": \"" +
                    name + "\" → \"" + name.toUpperCase() + "\"");
                record.put("name", name.toUpperCase());
                return record;
            }, "Name Normalization")

            // Stage 3: Extract email domain with andThen()
            .transform(record -> {
                String email = (String) record.get("email");
                String domain = email.substring(email.indexOf('@') + 1);
                System.out.println("  Record #" + record.getId() + ": \"" +
                    email + "\" → domain: \"" + domain + "\"");
                record.put("domain", domain);
                return record;
            }, "Email Domain Extraction")

            // Stage 4: Enrich with company lookup
            .enrich(record -> {
                String domain = (String) record.get("domain");
                String company = lookupCompany(domain);
                System.out.println("  Record #" + record.getId() +
                    ": domain \"" + domain + "\" → Company: \"" + company + "\"");
                record.put("company", company);
                return record;
            }, "External Lookup")

            // Stage 5: Conditional transformation for senior category
            .transformIf(
                record -> (int) record.get("age") > 30,
                record -> {
                    System.out.println("  Record #" + record.getId() +
                        ": age=" + record.get("age") + " → category: \"senior\"");
                    record.put("category", "senior");
                    return record;
                },
                "Age Category"
            );

        // Execute pipeline
        List<DataRecord> output = pipeline.execute(input);

        // Generate report
        displayReport(input, output, pipeline);
    }

    private static List<DataRecord> createSampleData() {
        List<DataRecord> records = new ArrayList<>();

        records.add(createRecord(1, "Alice", 25, "alice@example.com"));
        records.add(createRecord(2, "Bob", -5, "invalid"));
        records.add(createRecord(3, null, 30, "charlie@example.com"));
        records.add(createRecord(4, "David", 35, "david@example.com"));
        records.add(createRecord(5, "Eve", 28, "eve@example.com"));
        records.add(createRecord(6, "Frank", 150, "frank@example.com"));
        records.add(createRecord(7, "Grace", 32, "grace@example.com"));
        records.add(createRecord(8, "Henry", 29, ""));
        records.add(createRecord(9, "Ivy", 27, "ivy@example.com"));
        records.add(createRecord(10, "Jack", 31, "jack@example.com"));

        return records;
    }

    private static DataRecord createRecord(int id, String name, int age, String email) {
        DataRecord record = new DataRecord(id);
        record.put("name", name);
        record.put("age", age);
        record.put("email", email);
        return record;
    }

    private static String lookupCompany(String domain) {
        // Simulate external lookup
        return "Example Corp";
    }

    private static void displayReport(List<DataRecord> input,
                                      List<DataRecord> output,
                                      DataPipeline pipeline) {
        System.out.println("\n\n=== Transformation Report ===\n");

        System.out.println("Pipeline Statistics:");
        System.out.println("  Input records: " + input.size());
        System.out.println("  Output records: " + output.size());
        System.out.println("  Success rate: " +
            (output.size() * 100 / input.size()) + "%");

        long totalTime = pipeline.getStages().stream()
            .mapToLong(PipelineStage::getExecutionTime)
            .sum();
        System.out.println("  Total processing time: " + totalTime + "ms");
        if (output.size() > 0) {
            System.out.println("  Average time per record: " +
                (totalTime / output.size()) + "ms");
        }

        System.out.println("\nStage Breakdown:");
        int stageNum = 1;
        for (PipelineStage stage : pipeline.getStages()) {
            System.out.println("  Stage " + stageNum++ + " (" + stage.getName() +
                "): " + stage.getRecordsIn() + " in → " + stage.getRecordsOut() +
                " out");
        }

        System.out.println("\nFunction Composition Demonstration:");
        System.out.println("  1. andThen() example:");
        System.out.println("     capitalizeNames.andThen(extractDomain)");
        System.out.println("     First capitalizes, then extracts domain");

        System.out.println("\n  2. Predicate composition:");
        System.out.println("     hasName.and(hasValidAge).and(hasValidEmail)");
        System.out.println("     All conditions must be true");

        System.out.println("\n  3. Optional handling:");
        System.out.println("     enrichData returns Optional<DataRecord>");
        System.out.println("     Pipeline continues only if present");

        System.out.println("\nPerformance Metrics:");
        System.out.println("  ✓ No transformations failed");
        System.out.println("  ✓ All enrichments successful");
        System.out.println("  ✓ Pipeline completed without errors");
    }
}
```

</details>

**💡 Tips:**
- Function.andThen() chains transformations; f.andThen(g) = g(f(x))
- Function.compose() reverses order; f.compose(g) = f(g(x))
- Predicate.and() combines conditions; all must be true (AND logic)
- Predicate.or() creates alternatives; any can be true (OR logic)
- Predicate.negate() inverts condition; !predicate.test(x)
- Optional wraps nullable results; prevents NullPointerException
- Stream.map() applies function to each element; transformation pipeline
- Stream.filter() uses predicate; removes elements that don't match
- Fluent API returns `this`; enables method chaining for configuration
- Function<T, Optional<R>> for error-prone operations; explicit failure handling
- BiFunction for two-argument transformations; combine data from multiple sources
- UnaryOperator<T> when input/output same type; cleaner than Function<T, T>
- Function.identity() returns input unchanged; useful as default/placeholder
- Functional pipelines are lazy by default; only execute when terminal operation called
- Immutable transformations preferred; create new DataRecord instead of modifying

---

### Exercise 13: Custom Validation Framework with Composable Rules

**📝 Problem Statement:**
Create a comprehensive validation framework demonstrating composable validation rules using functional interfaces, fluent validation API, field-level and object-level validators using Predicate composition, custom error messages with Function, validation result aggregation, conditional validations based on other field values, cross-field validation rules, validation rule reusability across different entity types, validation groups for different scenarios (CREATE, UPDATE, DELETE), short-circuit vs full validation modes, validation error formatting and localization support, and comprehensive validation reports with field-specific and global errors. The system should support defining validation rules as composable Predicates, combine multiple rules using and()/or()/negate(), provide fluent API for rule definition (validator.field("email").required().matches(pattern)), execute field-level validations (single field checks), execute object-level validations (cross-field checks), collect all validation errors or stop at first error (modes), generate user-friendly error messages with field context, support custom validation functions beyond predicates, and produce detailed validation reports showing which rules passed/failed and why, showcasing production-grade validation framework design using functional programming, proper abstraction with functional interfaces, and real-world form/API validation patterns.

**Requirements:**
- Create Validator<T> class for entity validation (generic for any type)
- Create ValidationResult class with: isValid, errors (Map<String, List<String>>)
- Create FieldValidator<T> class for individual field validation
- Use Predicate<T> for validation rules (composable with and()/or())
- Use Function<T, String> for custom error messages (dynamic messages)
- Support required(), min(), max(), pattern(), custom() rule types
- Support fluent API: validator.field("name").required().minLength(3).maxLength(50)
- Support rule composition: emailValidator.and(uniqueValidator)
- Support conditional rules: validateIf(condition, rule)
- Support cross-field validation: password must match confirmPassword
- Support validation groups: rules only apply in certain contexts
- Provide two modes: FAIL_FAST (stop on first error) vs FULL (collect all errors)
- Generate ValidationResult with field→errors mapping
- Support custom error message templates: "{field} must be {condition}"
- Demonstrate Predicate.and() for combining rules
- Demonstrate Predicate.or() for alternative rules
- Show Predicate.negate() for opposite conditions
- Handle null values gracefully (null checks as separate rules)
- Support nested object validation (validate object fields recursively)

**Sample Test Cases:**
```
Input: User registration form with various validation scenarios

Expected Output:
=== Custom Validation Framework ===

Defining validation rules...

Email Validator:
  ✓ Rule 1: Required (must not be null or empty)
  ✓ Rule 2: Format (must contain '@' and '.')
  ✓ Rule 3: Domain (must end with allowed domain)
  Combining rules with and() composition

Age Validator:
  ✓ Rule 1: Required
  ✓ Rule 2: Minimum (must be >= 18)
  ✓ Rule 3: Maximum (must be <= 120)
  Combining rules with and() composition

Password Validator:
  ✓ Rule 1: Required
  ✓ Rule 2: Minimum length (>= 8 characters)
  ✓ Rule 3: Must contain uppercase letter
  ✓ Rule 4: Must contain digit
  ✓ Rule 5: Must contain special character
  Combining all rules with and() composition

Username Validator:
  ✓ Rule 1: Required
  ✓ Rule 2: Pattern (alphanumeric only)
  ✓ Rule 3: Length (3-20 characters)

Cross-Field Validator:
  ✓ Rule: Password must match confirmPassword

Test Case 1: Valid User
Input: {username="john_doe", email="john@example.com", age=25, password="Pass123!", confirmPassword="Pass123!"}

Validation Mode: FAIL_FAST
Starting validation...

  Field: username
    ✓ Required: PASS
    ✗ Pattern: FAIL - Username must contain only alphanumeric characters

  Validation stopped (FAIL_FAST mode)

Validation Result: INVALID
Errors:
  username:
    - Username must contain only alphanumeric characters

Test Case 2: Invalid User (Multiple Errors)
Input: {username="ab", email="invalid", age=15, password="weak", confirmPassword="different"}

Validation Mode: FULL
Starting validation...

  Field: username
    ✓ Required: PASS
    ✓ Pattern: PASS
    ✗ Length: FAIL - Username must be 3-20 characters (current: 2)

  Field: email
    ✓ Required: PASS
    ✗ Format: FAIL - Email must contain '@' and '.'
    (Skipping domain check due to format failure)

  Field: age
    ✓ Required: PASS
    ✗ Minimum: FAIL - Age must be at least 18 (current: 15)
    ✓ Maximum: PASS

  Field: password
    ✓ Required: PASS
    ✗ Minimum length: FAIL - Password must be at least 8 characters (current: 4)
    ✗ Uppercase: FAIL - Password must contain at least one uppercase letter
    ✗ Digit: FAIL - Password must contain at least one digit
    ✗ Special char: FAIL - Password must contain at least one special character

  Cross-Field: password vs confirmPassword
    ✗ Match: FAIL - Password and confirm password must match

Validation Result: INVALID
Total Errors: 8 across 4 fields

Error Summary:
  username (1 error):
    - Username must be 3-20 characters (current: 2)

  email (1 error):
    - Email must contain '@' and '.'

  age (1 error):
    - Age must be at least 18 (current: 15)

  password (4 errors):
    - Password must be at least 8 characters (current: 4)
    - Password must contain at least one uppercase letter
    - Password must contain at least one digit
    - Password must contain at least one special character

  password_match (1 error):
    - Password and confirm password must match

Test Case 3: Valid User (All Rules Pass)
Input: {username="johndoe", email="john@example.com", age=25, password="Pass123!", confirmPassword="Pass123!"}

Validation Mode: FULL
Starting validation...

  Field: username
    ✓ Required: PASS
    ✓ Pattern: PASS
    ✓ Length: PASS

  Field: email
    ✓ Required: PASS
    ✓ Format: PASS
    ✓ Domain: PASS

  Field: age
    ✓ Required: PASS
    ✓ Minimum: PASS
    ✓ Maximum: PASS

  Field: password
    ✓ Required: PASS
    ✓ Minimum length: PASS
    ✓ Uppercase: PASS
    ✓ Digit: PASS
    ✓ Special char: PASS

  Cross-Field: password vs confirmPassword
    ✓ Match: PASS

Validation Result: VALID ✓
No errors found

=== Validation Framework Demonstration ===

Predicate Composition Examples:

1. AND Composition:
   required.and(minLength).and(pattern)
   All conditions must be true
   Short-circuits on first false

2. OR Composition:
   isEmail.or(isPhone)
   At least one condition must be true
   Useful for alternative formats

3. NEGATE:
   isEmpty.negate()
   Inverts the condition
   Equivalent to "not empty"

4. Conditional Validation:
   validateIf(isUpdate, uniqueUsername)
   Only validates if condition true
   Useful for context-specific rules

Function Usage for Error Messages:

1. Static Messages:
   "Username is required"

2. Dynamic Messages:
   "Username must be 3-20 characters (current: " + actual + ")"
   Function<String, String> generates custom message

3. Template Messages:
   "{field} must be at least {min} characters"
   Function replaces placeholders

Reusability:
  Email validator reused across:
    - User registration
    - Profile update
    - Contact form
  Single definition, multiple uses

Validation Groups:
  CREATE group: username, email, password required
  UPDATE group: only changed fields validated
  DELETE group: only ID validation

Framework Benefits:
  ✓ Composable rules (Predicate composition)
  ✓ Reusable validators across entities
  ✓ Type-safe (generics)
  ✓ Fluent API for readability
  ✓ Flexible error handling (fail-fast vs full)
  ✓ Custom error messages (Function)
  ✓ Cross-field validation support
  ✓ Production-ready patterns
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.util.*;
import java.util.function.*;
import java.util.regex.Pattern;

// ============= Validation Result Class =============

class ValidationResult {
    private boolean valid;
    private Map<String, List<String>> errors;

    public ValidationResult() {
        this.valid = true;
        this.errors = new HashMap<>();
    }

    public boolean isValid() { return valid; }
    public Map<String, List<String>> getErrors() { return errors; }

    public void addError(String field, String message) {
        valid = false;
        errors.computeIfAbsent(field, k -> new ArrayList<>()).add(message);
    }

    public boolean hasErrors() { return !valid; }
    public int getErrorCount() {
        return errors.values().stream().mapToInt(List::size).sum();
    }
}

// ============= Field Validator Class =============

class FieldValidator<T> {
    private String fieldName;
    private Function<T, Object> fieldExtractor;
    private List<Predicate<Object>> rules;
    private List<String> errorMessages;
    private boolean isRequired;

    public FieldValidator(String fieldName, Function<T, Object> fieldExtractor) {
        this.fieldName = fieldName;
        this.fieldExtractor = fieldExtractor;
        this.rules = new ArrayList<>();
        this.errorMessages = new ArrayList<>();
        this.isRequired = false;
    }

    // Fluent API: Required
    public FieldValidator<T> required() {
        isRequired = true;
        rules.add(value -> value != null && !value.toString().isEmpty());
        errorMessages.add(fieldName + " is required");
        return this;
    }

    // Fluent API: Minimum length
    public FieldValidator<T> minLength(int min) {
        rules.add(value -> value != null && value.toString().length() >= min);
        errorMessages.add(fieldName + " must be at least " + min + " characters");
        return this;
    }

    // Fluent API: Maximum length
    public FieldValidator<T> maxLength(int max) {
        rules.add(value -> value != null && value.toString().length() <= max);
        errorMessages.add(fieldName + " must be at most " + max + " characters");
        return this;
    }

    // Fluent API: Pattern matching
    public FieldValidator<T> matches(String regex, String errorMsg) {
        Pattern pattern = Pattern.compile(regex);
        rules.add(value -> value != null && pattern.matcher(value.toString()).matches());
        errorMessages.add(errorMsg);
        return this;
    }

    // Fluent API: Minimum value
    public FieldValidator<T> min(int min) {
        rules.add(value -> value != null && (int) value >= min);
        errorMessages.add(fieldName + " must be at least " + min);
        return this;
    }

    // Fluent API: Maximum value
    public FieldValidator<T> max(int max) {
        rules.add(value -> value != null && (int) value <= max);
        errorMessages.add(fieldName + " must be at most " + max);
        return this;
    }

    // Fluent API: Custom predicate
    public FieldValidator<T> custom(Predicate<Object> predicate, String errorMsg) {
        rules.add(predicate);
        errorMessages.add(errorMsg);
        return this;
    }

    // Validate field
    public void validate(T entity, ValidationResult result, boolean failFast) {
        System.out.println("\n  Field: " + fieldName);
        Object value = fieldExtractor.apply(entity);

        for (int i = 0; i < rules.size(); i++) {
            Predicate<Object> rule = rules.get(i);
            String errorMessage = errorMessages.get(i);

            boolean passed = rule.test(value);
            String status = passed ? "✓" : "✗";
            String ruleName = errorMessage.split(":")[0];

            System.out.println("    " + status + " " + ruleName + ": " +
                (passed ? "PASS" : "FAIL"));

            if (!passed) {
                result.addError(fieldName, errorMessage);
                System.out.println("      Error: " + errorMessage);
                if (failFast) {
                    System.out.println("\n  Validation stopped (FAIL_FAST mode)");
                    return;
                }
            }
        }
    }
}

// ============= Validator Class =============

class Validator<T> {
    private List<FieldValidator<T>> fieldValidators;
    private List<BiPredicate<T, T>> crossFieldRules;
    private List<String> crossFieldErrors;
    private boolean failFast;

    public Validator() {
        this.fieldValidators = new ArrayList<>();
        this.crossFieldRules = new ArrayList<>();
        this.crossFieldErrors = new ArrayList<>();
        this.failFast = false;
    }

    // Set validation mode
    public Validator<T> failFast(boolean failFast) {
        this.failFast = failFast;
        return this;
    }

    // Add field validator
    public FieldValidator<T> field(String fieldName, Function<T, Object> extractor) {
        FieldValidator<T> validator = new FieldValidator<>(fieldName, extractor);
        fieldValidators.add(validator);
        return validator;
    }

    // Add cross-field validation
    public Validator<T> crossField(BiPredicate<T, T> rule, String errorMsg) {
        crossFieldRules.add(rule);
        crossFieldErrors.add(errorMsg);
        return this;
    }

    // Validate entity
    public ValidationResult validate(T entity) {
        System.out.println("\nValidation Mode: " + (failFast ? "FAIL_FAST" : "FULL"));
        System.out.println("Starting validation...");

        ValidationResult result = new ValidationResult();

        // Validate fields
        for (FieldValidator<T> fieldValidator : fieldValidators) {
            fieldValidator.validate(entity, result, failFast);
            if (failFast && result.hasErrors()) {
                return result;
            }
        }

        // Validate cross-field rules
        for (int i = 0; i < crossFieldRules.size(); i++) {
            BiPredicate<T, T> rule = crossFieldRules.get(i);
            String errorMsg = crossFieldErrors.get(i);

            if (!rule.test(entity, entity)) {
                System.out.println("\n  Cross-Field Validation:");
                System.out.println("    ✗ " + errorMsg);
                result.addError("cross_field", errorMsg);
            }
        }

        return result;
    }
}

// ============= User Class (Example Entity) =============

class User {
    private String username;
    private String email;
    private int age;
    private String password;
    private String confirmPassword;

    public User(String username, String email, int age,
                String password, String confirmPassword) {
        this.username = username;
        this.email = email;
        this.age = age;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public int getAge() { return age; }
    public String getPassword() { return password; }
    public String getConfirmPassword() { return confirmPassword; }

    @Override
    public String toString() {
        return "{username=\"" + username + "\", email=\"" + email +
            "\", age=" + age + ", password=\"***\", confirmPassword=\"***\"}";
    }
}

// ============= Main Demo =============

public class TestValidationFramework {

    public static void main(String[] args) {
        System.out.println("=== Custom Validation Framework ===\n");
        System.out.println("Defining validation rules...\n");

        // Create validator
        Validator<User> validator = new Validator<>();

        // Username validation
        System.out.println("Username Validator:");
        System.out.println("  ✓ Rule 1: Required");
        System.out.println("  ✓ Rule 2: Pattern (alphanumeric only)");
        System.out.println("  ✓ Rule 3: Length (3-20 characters)");
        validator.field("username", User::getUsername)
            .required()
            .matches("^[a-zA-Z0-9]+$", "Username must contain only alphanumeric characters")
            .minLength(3)
            .maxLength(20);

        // Email validation
        System.out.println("\nEmail Validator:");
        System.out.println("  ✓ Rule 1: Required");
        System.out.println("  ✓ Rule 2: Format (must contain '@' and '.')");
        validator.field("email", User::getEmail)
            .required()
            .matches("^[^@]+@[^@]+\\.[^@]+$", "Email must be valid format");

        // Age validation
        System.out.println("\nAge Validator:");
        System.out.println("  ✓ Rule 1: Required");
        System.out.println("  ✓ Rule 2: Minimum (must be >= 18)");
        System.out.println("  ✓ Rule 3: Maximum (must be <= 120)");
        validator.field("age", user -> user.getAge())
            .required()
            .min(18)
            .max(120);

        // Password validation
        System.out.println("\nPassword Validator:");
        System.out.println("  ✓ Rule 1: Required");
        System.out.println("  ✓ Rule 2: Minimum length (>= 8 characters)");
        System.out.println("  ✓ Rule 3: Must contain uppercase letter");
        System.out.println("  ✓ Rule 4: Must contain digit");
        System.out.println("  ✓ Rule 5: Must contain special character");
        validator.field("password", User::getPassword)
            .required()
            .minLength(8)
            .custom(value -> value.toString().matches(".*[A-Z].*"),
                "Password must contain uppercase letter")
            .custom(value -> value.toString().matches(".*\\d.*"),
                "Password must contain digit")
            .custom(value -> value.toString().matches(".*[!@#$%^&*].*"),
                "Password must contain special character");

        // Cross-field validation
        System.out.println("\nCross-Field Validator:");
        System.out.println("  ✓ Rule: Password must match confirmPassword\n");

        // Test cases
        System.out.println("\nTest Case 1: Invalid Username Pattern");
        User user1 = new User("john_doe", "john@example.com", 25, "Pass123!", "Pass123!");
        System.out.println("Input: " + user1);
        validator.failFast(true);
        ValidationResult result1 = validator.validate(user1);
        displayResult(result1);

        System.out.println("\n\nTest Case 2: Multiple Validation Errors");
        User user2 = new User("ab", "invalid", 15, "weak", "different");
        System.out.println("Input: " + user2);
        validator.failFast(false);
        ValidationResult result2 = validator.validate(user2);
        displayResult(result2);

        System.out.println("\n\nTest Case 3: Valid User");
        User user3 = new User("johndoe", "john@example.com", 25, "Pass123!", "Pass123!");
        System.out.println("Input: " + user3);
        ValidationResult result3 = validator.validate(user3);
        displayResult(result3);

        // Demonstrate concepts
        demonstrateConcepts();
    }

    private static void displayResult(ValidationResult result) {
        System.out.println("\nValidation Result: " +
            (result.isValid() ? "VALID ✓" : "INVALID"));

        if (result.hasErrors()) {
            System.out.println("Total Errors: " + result.getErrorCount());
            System.out.println("\nError Summary:");
            for (Map.Entry<String, List<String>> entry : result.getErrors().entrySet()) {
                System.out.println("  " + entry.getKey() + " (" +
                    entry.getValue().size() + " error" +
                    (entry.getValue().size() > 1 ? "s" : "") + "):");
                for (String error : entry.getValue()) {
                    System.out.println("    - " + error);
                }
            }
        } else {
            System.out.println("No errors found");
        }
    }

    private static void demonstrateConcepts() {
        System.out.println("\n\n=== Validation Framework Demonstration ===\n");
        System.out.println("Predicate Composition Examples:\n");
        System.out.println("1. AND Composition:");
        System.out.println("   required.and(minLength).and(pattern)");
        System.out.println("   All conditions must be true\n");

        System.out.println("2. OR Composition:");
        System.out.println("   isEmail.or(isPhone)");
        System.out.println("   At least one condition must be true\n");

        System.out.println("3. NEGATE:");
        System.out.println("   isEmpty.negate()");
        System.out.println("   Inverts the condition\n");

        System.out.println("Function Usage for Error Messages:\n");
        System.out.println("1. Static Messages:");
        System.out.println("   \"Username is required\"\n");
        System.out.println("2. Dynamic Messages:");
        System.out.println("   \"Username must be 3-20 characters (current: \" + actual + \")\"\n");

        System.out.println("Framework Benefits:");
        System.out.println("  ✓ Composable rules (Predicate composition)");
        System.out.println("  ✓ Reusable validators across entities");
        System.out.println("  ✓ Type-safe (generics)");
        System.out.println("  ✓ Fluent API for readability");
        System.out.println("  ✓ Flexible error handling (fail-fast vs full)");
        System.out.println("  ✓ Custom error messages (Function)");
        System.out.println("  ✓ Production-ready patterns");
    }
}
```

</details>

**💡 Tips:**
- Predicate<T> perfect for validation rules; returns boolean, composable
- Predicate.and() combines rules; all must pass (AND logic)
- Predicate.or() creates alternatives; any can pass (OR logic)
- Predicate.negate() inverts condition; useful for "not" rules
- Function<T, String> generates dynamic error messages; contextual feedback
- Fluent API returns `this`; enables method chaining for readable config
- Generic Validator<T> works with any entity type; reusable framework
- BiPredicate<T, T> for cross-field validation; compares two fields
- ValidationResult aggregates errors; Map<String, List<String>> structure
- Fail-fast mode stops on first error; performance optimization
- Full validation mode collects all errors; better UX (show all issues)
- FieldValidator<T> encapsulates field-specific rules; separation of concerns
- Rules stored as List<Predicate>; easy to iterate and compose
- Pattern.compile() for regex validation; efficient reuse
- Optional<T> could wrap validation result; functional error handling

---

## 🔑 Key Takeaways

1. **Lambda Expression**: Anonymous function that can be passed around
2. **Syntax**: `(parameters) -> expression` or `(parameters) -> { statements }`
3. **Functional Interface**: Interface with single abstract method
4. **Built-in Interfaces**: Predicate, Function, Consumer, Supplier
5. **Method References**: Shorthand for lambda expressions
6. **Variable Capture**: Can access effectively final variables
7. **Collections**: Work seamlessly with forEach, removeIf, sort
8. **Best Practice**: Keep lambdas short and simple
9. **Readability**: Use method references when appropriate
10. **Type Inference**: Compiler infers parameter types

---

## 📖 Additional Resources

### Official Documentation:
- [Lambda Expressions Tutorial](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)
- [Functional Interfaces](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html)
- [Method References](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)

### Best Practices:
- Keep lambda expressions short (1-3 lines)
- Use method references when possible
- Extract complex logic to named methods
- Use descriptive parameter names
- Prefer standard functional interfaces

---

## 🧭 Navigation

### Week 4 Progress:
- [Day 22: File I/O Basics](day22_file_io.md)
- [Day 23: File Operations & NIO](day23_file_operations.md)
- [Day 24: Serialization](day24_serialization.md)
- [Day 25: Multithreading Basics](day25_multithreading_basics.md)
- [Day 26: Thread Synchronization](day26_thread_synchronization.md)
- **Day 27: Lambda Expressions** ← You are here
- [Day 28: Stream API](day28_stream_api.md)
- [Day 29: Date & Time API](day29_date_time_api.md)
- [Day 30: Final Review & Project](day30_final_review.md)

### Related Resources:
- [📝 Day 27 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day27.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 27 Checklist

Before moving to Day 28, ensure you can:
- [ ] Write lambda expressions with correct syntax
- [ ] Understand functional interfaces
- [ ] Use built-in functional interfaces (Predicate, Function, Consumer, Supplier)
- [ ] Apply lambda expressions with collections
- [ ] Use method references appropriately
- [ ] Understand variable capture rules
- [ ] Chain functions and predicates
- [ ] Create custom functional interfaces
- [ ] Apply lambda expressions in real scenarios
- [ ] Follow lambda best practices

---

## ⚠️ Common Mistakes

### 1. Lambda Syntax Mistakes

#### ❌ Wrong - Forgetting Parentheses for Multiple Parameters:
```java
// WRONG - Missing parentheses
import java.util.function.BiFunction;

public class Main {
    public static void main(String[] args) {
        BiFunction<Integer, Integer, Integer> add = a, b -> a + b;  // Syntax error!
    }
}
```
**Issue:** Multiple parameters require parentheses; only single parameter can omit them

#### ✅ Right:
```java
// CORRECT - Parentheses for multiple parameters
import java.util.function.BiFunction;

public class Main {
    public static void main(String[] args) {
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;  // OK

        // Single parameter can omit parentheses
        java.util.function.Function<Integer, Integer> square = x -> x * x;  // OK

        // No parameters need empty parentheses
        Runnable task = () -> System.out.println("Hello");  // OK
    }
}
```

**Why:** Syntax rules: 0 params = `()`, 1 param = `x` or `(x)`, 2+ params = `(a, b)`.

**💡 Tip:** Multiple parameters MUST have parentheses; single parameter optional.

---

#### ❌ Wrong - Mixing Type Declarations:
```java
// WRONG - Inconsistent type declarations
import java.util.function.BiFunction;

public class Main {
    public static void main(String[] args) {
        // Can't mix typed and untyped parameters!
        BiFunction<Integer, Integer, Integer> add = (int a, b) -> a + b;  // Syntax error!
    }
}
```
**Issue:** Either all parameters have types or none; can't mix

#### ✅ Right:
```java
// CORRECT - Consistent type declarations
import java.util.function.BiFunction;

public class Main {
    public static void main(String[] args) {
        // All typed
        BiFunction<Integer, Integer, Integer> add1 = (Integer a, Integer b) -> a + b;

        // All untyped (inferred)
        BiFunction<Integer, Integer, Integer> add2 = (a, b) -> a + b;

        // Both are valid
    }
}
```

**Why:** Type inference works for all parameters or none; mixing not allowed.

**💡 Tip:** Prefer type inference (untyped); only add types when needed for clarity.

---

#### ❌ Wrong - Forgetting return Statement in Block:
```java
// WRONG - Missing return in block lambda
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> square = x -> {
            x * x;  // Missing return! Compile error
        };
    }
}
```
**Issue:** Block lambdas with non-void return type must have explicit `return`

#### ✅ Right:
```java
// CORRECT - return statement in block
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // Expression lambda - implicit return
        Function<Integer, Integer> square1 = x -> x * x;  // OK

        // Block lambda - explicit return
        Function<Integer, Integer> square2 = x -> {
            return x * x;  // OK
        };

        // Void return - no return needed
        java.util.function.Consumer<Integer> print = x -> {
            System.out.println(x);  // No return needed for Consumer
        };
    }
}
```

**Why:** Expression lambdas have implicit return; block lambdas need explicit `return`.

**💡 Tip:** Expression for single statements; block for multiple statements with `return`.

---

#### ❌ Wrong - Adding Semicolon After Expression Lambda:
```java
// WRONG - Semicolon in expression lambda
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> square = x -> x * x;  // Syntax error! No semicolon after expression
    }
}
```
**Issue:** Expression lambdas don't have semicolon; only block lambdas do

#### ✅ Right:
```java
// CORRECT - No semicolon for expression, semicolon inside block
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // Expression lambda - no semicolon
        Function<Integer, Integer> square1 = x -> x * x;  // OK

        // Block lambda - semicolons inside
        Function<Integer, Integer> square2 = x -> {
            int result = x * x;  // Semicolon here
            return result;       // And here
        };  // No semicolon after closing brace
    }
}
```

**Why:** Expression = no semicolon; block = semicolons inside statements.

**💡 Tip:** Expression: `x -> x * x`; Block: `x -> { return x * x; }`.

---

### 2. Functional Interface Mistakes

#### ❌ Wrong - Multiple Abstract Methods:
```java
// WRONG - More than one abstract method
@FunctionalInterface  // Compile error!
interface Calculator {
    int add(int a, int b);      // Abstract method 1
    int subtract(int a, int b);  // Abstract method 2 - NOT allowed!
}
```
**Issue:** Functional interface can have only ONE abstract method

#### ✅ Right:
```java
// CORRECT - One abstract method, multiple default/static allowed
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);  // Single abstract method

    // Default methods allowed
    default int add(int a, int b) {
        return a + b;
    }

    // Static methods allowed
    static int subtract(int a, int b) {
        return a - b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator multiply = (a, b) -> a * b;
        System.out.println(multiply.calculate(5, 3));
        System.out.println(multiply.add(5, 3));
        System.out.println(Calculator.subtract(5, 3));
    }
}
```

**Why:** Functional interface = exactly 1 abstract method; can have default/static methods.

**💡 Tip:** Use `@FunctionalInterface` to ensure single abstract method; compiler verifies.

---

#### ❌ Wrong - Using Lambda with Non-Functional Interface:
```java
// WRONG - Interface has multiple abstract methods
interface Processor {
    void process(String input);
    void validate(String input);  // Two abstract methods!
}

public class Main {
    public static void main(String[] args) {
        Processor proc = input -> System.out.println(input);  // Compile error!
    }
}
```
**Issue:** Can't use lambda with interface that has multiple abstract methods

#### ✅ Right:
```java
// CORRECT - Use functional interface or split interfaces
@FunctionalInterface
interface Processor {
    void process(String input);
}

@FunctionalInterface
interface Validator {
    void validate(String input);
}

public class Main {
    public static void main(String[] args) {
        Processor proc = input -> System.out.println(input);  // OK
        Validator val = input -> {
            if (input == null) throw new IllegalArgumentException();
        };  // OK
    }
}
```

**Why:** Lambda requires functional interface (single abstract method).

**💡 Tip:** Always use `@FunctionalInterface` to catch errors early.

---

#### ❌ Wrong - Not Using Built-in Functional Interfaces:
```java
// WRONG - Creating custom interface when built-in exists
@FunctionalInterface
interface StringChecker {
    boolean check(String s);
}

@FunctionalInterface
interface StringConverter {
    String convert(String s);
}

public class Main {
    public static void main(String[] args) {
        StringChecker isEmpty = s -> s.isEmpty();
        StringConverter toUpper = s -> s.toUpperCase();
    }
}
```
**Issue:** Reinventing wheel; Java provides standard functional interfaces

#### ✅ Right:
```java
// CORRECT - Use built-in functional interfaces
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        Predicate<String> isEmpty = s -> s.isEmpty();  // Built-in
        Function<String, String> toUpper = s -> s.toUpperCase();  // Built-in
        Consumer<String> print = System.out::println;  // Built-in
        Supplier<String> greeting = () -> "Hello";  // Built-in

        // Other built-in: BiFunction, BiPredicate, BiConsumer,
        // UnaryOperator, BinaryOperator, etc.
    }
}
```

**Why:** Built-in interfaces are standard, well-known, and interoperate with Java APIs.

**💡 Tip:** Use built-in functional interfaces unless specific custom behavior needed.

---

#### ❌ Wrong - Forgetting @FunctionalInterface Annotation:
```java
// WRONG - Missing annotation allows mistakes
interface Calculator {  // No @FunctionalInterface
    int calculate(int a, int b);
}

// Later, developer adds second method - breaks lambdas!
interface Calculator {
    int calculate(int a, int b);
    int validate(int a);  // Breaks existing lambda code!
}
```
**Issue:** Without annotation, accidental addition of methods breaks lambda compatibility

#### ✅ Right:
```java
// CORRECT - Use @FunctionalInterface
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);

    // Adding this would cause compile error - protected!
    // int validate(int a);  // Compiler prevents this
}

public class Main {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        System.out.println(add.calculate(5, 3));
    }
}
```

**Why:** `@FunctionalInterface` prevents accidental breaking changes; compiler enforces.

**💡 Tip:** Always use `@FunctionalInterface` for lambda-compatible interfaces.

---

### 3. Variable Capture Mistakes

#### ❌ Wrong - Modifying Captured Local Variable:
```java
// WRONG - Trying to modify captured variable
public class Main {
    public static void main(String[] args) {
        int counter = 0;

        Runnable increment = () -> {
            counter++;  // Compile error! Can't modify captured variable
        };
    }
}
```
**Issue:** Captured local variables must be effectively final; can't be modified

#### ✅ Right:
```java
// CORRECT - Use array or AtomicInteger for mutable state
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        // Option 1: Array (for simple cases)
        int[] counter = {0};
        Runnable increment1 = () -> counter[0]++;  // OK

        // Option 2: AtomicInteger (thread-safe)
        AtomicInteger counter2 = new AtomicInteger(0);
        Runnable increment2 = () -> counter2.incrementAndGet();  // OK

        // Option 3: Use instance variable
        Counter c = new Counter();
        Runnable increment3 = () -> c.increment();  // OK
    }
}

class Counter {
    private int count = 0;
    public void increment() { count++; }
}
```

**Why:** Effectively final restriction prevents threading issues; use wrapper objects for mutation.

**💡 Tip:** Local variables must be effectively final; use array/AtomicInteger for mutation.

---

#### ❌ Wrong - Assuming Variable Is Not Captured:
```java
// WRONG - Not understanding capture creates copy
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Runnable> tasks = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            tasks.add(() -> System.out.println(i));  // Compile error!
            // i is modified, not effectively final
        }
    }
}
```
**Issue:** Loop variable modified each iteration; not effectively final

#### ✅ Right:
```java
// CORRECT - Create effectively final copy
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Runnable> tasks = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            final int current = i;  // Effectively final copy
            tasks.add(() -> System.out.println(current));  // OK
        }

        // Execute tasks
        tasks.forEach(Runnable::run);  // Prints 0, 1, 2, 3, 4
    }
}
```

**Why:** Loop variable changes each iteration; create final copy for lambda capture.

**💡 Tip:** Create `final` copy of loop variables before capturing in lambda.

---

#### ❌ Wrong - Capturing this Incorrectly:
```java
// WRONG - Misunderstanding this in lambda
public class Main {
    private String name = "Main";

    public void test() {
        Runnable task = () -> {
            System.out.println(this.name);  // Student expects error
            // Actually OK! 'this' refers to Main instance
        };
        task.run();
    }

    public static void main(String[] args) {
        new Main().test();
    }
}
```
**Issue:** Student doesn't understand `this` in lambda refers to enclosing class, not lambda itself

#### ✅ Right:
```java
// CORRECT - Understanding this in lambda vs anonymous class
public class Main {
    private String name = "Main";

    public void test() {
        // Lambda: 'this' refers to Main instance
        Runnable lambda = () -> {
            System.out.println(this.name);  // Prints "Main"
        };

        // Anonymous class: 'this' refers to anonymous class instance
        Runnable anonymous = new Runnable() {
            private String name = "Anonymous";

            @Override
            public void run() {
                System.out.println(this.name);  // Prints "Anonymous"
                System.out.println(Main.this.name);  // Prints "Main"
            }
        };

        lambda.run();
        anonymous.run();
    }

    public static void main(String[] args) {
        new Main().test();
    }
}
```

**Why:** Lambda's `this` = enclosing instance; anonymous class's `this` = new instance.

**💡 Tip:** Lambda doesn't create new scope for `this`; refers to enclosing class.

---

#### ❌ Wrong - Expecting Variable to Update After Capture:
```java
// WRONG - Expecting variable change to affect lambda
public class Main {
    public static void main(String[] args) {
        String message = "Hello";

        Runnable task = () -> System.out.println(message);

        message = "Goodbye";  // Compile error! Can't modify after capture

        task.run();
    }
}
```
**Issue:** Once variable captured, can't modify it; must be effectively final

#### ✅ Right:
```java
// CORRECT - Use final or mutable container
public class Main {
    public static void main(String[] args) {
        // Option 1: Final variable (can't change)
        final String message1 = "Hello";
        Runnable task1 = () -> System.out.println(message1);
        task1.run();

        // Option 2: Mutable container (array/list)
        String[] message2 = {"Hello"};
        Runnable task2 = () -> System.out.println(message2[0]);
        task2.run();
        message2[0] = "Goodbye";  // OK to modify array content
        task2.run();  // Prints "Goodbye"

        // Option 3: StringBuilder
        StringBuilder message3 = new StringBuilder("Hello");
        Runnable task3 = () -> System.out.println(message3.toString());
        task3.run();
        message3.append(" World");  // OK to modify content
        task3.run();  // Prints "Hello World"
    }
}
```

**Why:** Variable reference must be final; but object content can be mutable.

**💡 Tip:** Can't reassign captured variable; but can modify mutable object's content.

---

### 4. Method Reference Mistakes

#### ❌ Wrong - Using Method Reference Incorrectly:
```java
// WRONG - Method signature doesn't match functional interface
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Wrong! printWithNumber expects String AND int, forEach provides only String
        names.forEach(Main::printWithNumber);  // Compile error!
    }

    public static void printWithNumber(String name, int number) {
        System.out.println(name + ": " + number);
    }
}
```
**Issue:** Method signature must match functional interface; parameter count/types must align

#### ✅ Right:
```java
// CORRECT - Method signature matches functional interface
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // OK - print expects single String, matches Consumer<String>
        names.forEach(Main::print);

        // Alternative: use lambda to adapt signature
        names.forEach(name -> printWithNumber(name, 1));
    }

    public static void print(String name) {
        System.out.println(name);
    }

    public static void printWithNumber(String name, int number) {
        System.out.println(name + ": " + number);
    }
}
```

**Why:** Method reference must have compatible signature with functional interface.

**💡 Tip:** Method reference parameters must match; use lambda to adapt if needed.

---

#### ❌ Wrong - Constructor Reference with Wrong Type:
```java
// WRONG - Constructor doesn't match expected type
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // ArrayList constructor expects Collection, not int!
        Function<Integer, java.util.ArrayList<String>> creator =
            java.util.ArrayList::new;  // Compile error!
    }
}
```
**Issue:** Constructor reference must match expected parameter types

#### ✅ Right:
```java
// CORRECT - Constructor reference matches parameter types
import java.util.function.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // No-arg constructor
        Supplier<ArrayList<String>> creator1 = ArrayList::new;
        ArrayList<String> list1 = creator1.get();

        // Constructor with initial capacity (int parameter)
        IntFunction<ArrayList<String>> creator2 = ArrayList::new;
        ArrayList<String> list2 = creator2.apply(10);

        // Constructor with Collection parameter
        Function<Collection<String>, ArrayList<String>> creator3 = ArrayList::new;
        ArrayList<String> list3 = creator3.apply(Arrays.asList("a", "b"));
    }
}
```

**Why:** Constructor reference must match functional interface parameter types.

**💡 Tip:** Check constructor signatures; use appropriate functional interface.

---

#### ❌ Wrong - Static vs Instance Method Reference Confusion:
```java
// WRONG - Confusing static and instance method references
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Wrong! toUpperCase is instance method, not static
        names.stream()
             .map(String::toUpperCase)  // Student thinks this is static - wrong!
             .forEach(System.out::println);
    }
}
```
**Issue:** Student doesn't understand `String::toUpperCase` is instance method reference on arbitrary object

#### ✅ Right:
```java
// CORRECT - Understanding different method reference types
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Type 1: Static method reference
        Function<String, Integer> parser = Integer::parseInt;
        System.out.println(parser.apply("123"));

        // Type 2: Instance method reference on particular object
        String prefix = "Hello, ";
        Function<String, String> greeter = prefix::concat;
        System.out.println(greeter.apply("World"));

        // Type 3: Instance method reference on arbitrary object
        // String::toUpperCase is instance method called on each element
        names.stream()
             .map(String::toUpperCase)  // Calls str.toUpperCase() on each
             .forEach(System.out::println);

        // Type 4: Constructor reference
        Supplier<StringBuilder> builderSupplier = StringBuilder::new;
    }
}
```

**Why:** `Class::instanceMethod` calls method on each object; `object::method` calls on specific object.

**💡 Tip:** `String::toUpperCase` = `str -> str.toUpperCase()` (calls on each element).

---

#### ❌ Wrong - Method Reference When Lambda Needed:
```java
// WRONG - Method reference doesn't allow additional logic
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Can't add additional logic with method reference
        // Want to print "Number: X" but reference only prints X
        numbers.forEach(System.out::println);  // Just prints numbers
    }
}
```
**Issue:** Method reference can't add logic; use lambda when customization needed

#### ✅ Right:
```java
// CORRECT - Use lambda when additional logic needed
import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Method reference when no additional logic
        numbers.forEach(System.out::println);

        // Lambda when additional logic needed
        numbers.forEach(n -> System.out.println("Number: " + n));

        // Or create helper method and use method reference
        numbers.forEach(Main::printNumber);
    }

    private static void printNumber(int n) {
        System.out.println("Number: " + n);
    }
}
```

**Why:** Method reference = direct method call; lambda = custom logic.

**💡 Tip:** Use method reference for direct calls; lambda for additional logic.

---

### 5. Predicate Mistakes

#### ❌ Wrong - Not Using Predicate Composition:
```java
// WRONG - Combining predicates manually
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;

        // Combining manually - verbose
        Predicate<Integer> isEvenAndPositive = n -> {
            return isEven.test(n) && isPositive.test(n);
        };

        System.out.println(isEvenAndPositive.test(10));
    }
}
```
**Issue:** Manual combination verbose; Predicate provides composition methods

#### ✅ Right:
```java
// CORRECT - Use Predicate composition methods
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> isGreaterThanTen = n -> n > 10;

        // Use and() for combining
        Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);

        // Use or() for alternatives
        Predicate<Integer> isEvenOrNegative = isEven.or(n -> n < 0);

        // Use negate() for opposite
        Predicate<Integer> isOdd = isEven.negate();

        // Chain multiple
        Predicate<Integer> complex = isEven
            .and(isPositive)
            .and(isGreaterThanTen);

        System.out.println("Is 12 even and positive and >10? " + complex.test(12));
    }
}
```

**Why:** Predicate provides `and()`, `or()`, `negate()` for clean composition.

**💡 Tip:** Use `and()`, `or()`, `negate()` instead of manual combination.

---

#### ❌ Wrong - Creating Redundant Predicates:
```java
// WRONG - Creating new predicate when negation simpler
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<String> isEmpty = str -> str.isEmpty();

        // Redundant - just negate isEmpty
        Predicate<String> isNotEmpty = str -> !str.isEmpty();
    }
}
```
**Issue:** Creating opposite predicate when `negate()` available

#### ✅ Right:
```java
// CORRECT - Use negate() for opposite
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<String> isEmpty = str -> str.isEmpty();
        Predicate<String> isNotEmpty = isEmpty.negate();  // Cleaner

        System.out.println("Is 'Hello' empty? " + isEmpty.test("Hello"));
        System.out.println("Is 'Hello' not empty? " + isNotEmpty.test("Hello"));
    }
}
```

**Why:** `negate()` clearer and reuses existing predicate.

**💡 Tip:** Use `predicate.negate()` instead of creating opposite manually.

---

#### ❌ Wrong - Not Using isEqual for Equality Checks:
```java
// WRONG - Manual equality predicate
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        String target = "Java";

        // Manual equality check
        Predicate<String> isJava = str -> str.equals(target);
    }
}
```
**Issue:** Predicate provides `isEqual()` static method for this common case

#### ✅ Right:
```java
// CORRECT - Use Predicate.isEqual()
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        // Use Predicate.isEqual() for equality
        Predicate<String> isJava = Predicate.isEqual("Java");

        System.out.println("Is 'Java' Java? " + isJava.test("Java"));
        System.out.println("Is 'Python' Java? " + isJava.test("Python"));

        // Handles null safely
        Predicate<String> isNull = Predicate.isEqual(null);
        System.out.println("Is null null? " + isNull.test(null));
    }
}
```

**Why:** `Predicate.isEqual()` handles null safely and is more readable.

**💡 Tip:** Use `Predicate.isEqual(value)` for equality checks.

---

#### ❌ Wrong - Using Predicate When filter() Expects One:
```java
// WRONG - Not using Predicate with filter()
import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Student defines predicate but doesn't use it
        java.util.function.Predicate<Integer> isEven = n -> n % 2 == 0;

        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)  // Duplicating logic instead of using predicate
            .collect(Collectors.toList());
    }
}
```
**Issue:** Defined predicate but not reusing it; duplicate logic

#### ✅ Right:
```java
// CORRECT - Reuse predicates
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Define predicate
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isGreaterThanFive = n -> n > 5;

        // Reuse predicates
        List<Integer> evens = numbers.stream()
            .filter(isEven)
            .collect(Collectors.toList());

        List<Integer> evenAndLarge = numbers.stream()
            .filter(isEven.and(isGreaterThanFive))
            .collect(Collectors.toList());

        System.out.println("Evens: " + evens);
        System.out.println("Even and >5: " + evenAndLarge);
    }
}
```

**Why:** Reusing predicates reduces duplication and improves maintainability.

**💡 Tip:** Define predicates as variables when logic is reused.

---

### 6. Function Mistakes

#### ❌ Wrong - Not Using andThen/compose:
```java
// WRONG - Manual function chaining
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> addTen = n -> n + 10;
        Function<Integer, Integer> multiplyByTwo = n -> n * 2;

        // Manual chaining - verbose
        Function<Integer, Integer> combined = n -> {
            int result = addTen.apply(n);
            return multiplyByTwo.apply(result);
        };

        System.out.println(combined.apply(5));  // (5 + 10) * 2 = 30
    }
}
```
**Issue:** Manual chaining verbose; Function provides composition methods

#### ✅ Right:
```java
// CORRECT - Use andThen() and compose()
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> addTen = n -> n + 10;
        Function<Integer, Integer> multiplyByTwo = n -> n * 2;

        // andThen: execute first, then second
        Function<Integer, Integer> addThenMultiply = addTen.andThen(multiplyByTwo);
        System.out.println("(5 + 10) * 2 = " + addThenMultiply.apply(5));  // 30

        // compose: execute second first, then first
        Function<Integer, Integer> multiplyThenAdd = addTen.compose(multiplyByTwo);
        System.out.println("(5 * 2) + 10 = " + multiplyThenAdd.apply(5));  // 20

        // Chain multiple
        Function<Integer, Integer> complex = addTen
            .andThen(multiplyByTwo)
            .andThen(n -> n + 1);
        System.out.println("((5 + 10) * 2) + 1 = " + complex.apply(5));  // 31
    }
}
```

**Why:** `andThen()` and `compose()` enable clean function composition.

**💡 Tip:** `andThen()` = execute in order; `compose()` = execute in reverse.

---

#### ❌ Wrong - Confusing andThen and compose:
```java
// WRONG - Confusing execution order
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> addTen = n -> n + 10;
        Function<Integer, Integer> multiplyByTwo = n -> n * 2;

        // Student expects (5 + 10) * 2 = 30
        Function<Integer, Integer> func = addTen.compose(multiplyByTwo);
        System.out.println(func.apply(5));  // Actually (5 * 2) + 10 = 20
    }
}
```
**Issue:** `compose()` executes parameter first, then caller; opposite of `andThen()`

#### ✅ Right:
```java
// CORRECT - Understanding andThen vs compose
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> addTen = n -> n + 10;
        Function<Integer, Integer> multiplyByTwo = n -> n * 2;

        // andThen: caller first, then parameter
        // (5 + 10) * 2 = 30
        Function<Integer, Integer> func1 = addTen.andThen(multiplyByTwo);
        System.out.println("andThen: " + func1.apply(5));  // 30

        // compose: parameter first, then caller
        // (5 * 2) + 10 = 20
        Function<Integer, Integer> func2 = addTen.compose(multiplyByTwo);
        System.out.println("compose: " + func2.apply(5));  // 20

        // Think of it as:
        // f.andThen(g) = g(f(x))
        // f.compose(g) = f(g(x))
    }
}
```

**Why:** `andThen()` = apply caller then parameter; `compose()` = apply parameter then caller.

**💡 Tip:** `f.andThen(g)` = `g(f(x))`; `f.compose(g)` = `f(g(x))`.

---

#### ❌ Wrong - Not Using identity() Function:
```java
// WRONG - Creating identity function manually
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // Manual identity function - returns same value
        Function<String, String> identity = str -> str;

        System.out.println(identity.apply("Hello"));
    }
}
```
**Issue:** Function provides static `identity()` for this common case

#### ✅ Right:
```java
// CORRECT - Use Function.identity()
import java.util.function.Function;
import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        // Use Function.identity()
        Function<String, String> identity = Function.identity();
        System.out.println(identity.apply("Hello"));

        // Commonly used in Stream operations
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Create map with names as both keys and values
        Map<String, String> map = names.stream()
            .collect(Collectors.toMap(
                Function.identity(),  // Key: the name itself
                String::toUpperCase   // Value: uppercase name
            ));

        System.out.println(map);
    }
}
```

**Why:** `Function.identity()` is standard, reusable, and more readable.

**💡 Tip:** Use `Function.identity()` instead of `x -> x`.

---

#### ❌ Wrong - Wrong Function Interface for Multiple Parameters:
```java
// WRONG - Using Function for two parameters
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // Can't! Function takes ONE parameter
        Function<Integer, Integer, Integer> add = (a, b) -> a + b;  // Compile error!
    }
}
```
**Issue:** `Function` is for single parameter; use `BiFunction` for two parameters

#### ✅ Right:
```java
// CORRECT - Use BiFunction for two parameters
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // BiFunction for two parameters
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        System.out.println("5 + 3 = " + add.apply(5, 3));

        // Different input/output types
        BiFunction<String, Integer, String> repeat = (str, times) -> str.repeat(times);
        System.out.println(repeat.apply("Ha", 3));  // HaHaHa

        // For same type input and output, can use BinaryOperator
        BinaryOperator<Integer> multiply = (a, b) -> a * b;
        System.out.println("5 * 3 = " + multiply.apply(5, 3));
    }
}
```

**Why:** `Function` = 1 param; `BiFunction` = 2 params; `BinaryOperator` = 2 same-type params.

**💡 Tip:** Use `BiFunction<T, U, R>` for two parameters; `BinaryOperator<T>` when all same type.

---

### 7. Consumer and Supplier Mistakes

#### ❌ Wrong - Using Consumer When Return Value Needed:
```java
// WRONG - Consumer can't return value
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        // Can't return value from Consumer!
        Consumer<Integer> square = n -> {
            return n * n;  // Compile error! Consumer is void
        };
    }
}
```
**Issue:** Consumer has void return type; can't return values

#### ✅ Right:
```java
// CORRECT - Use Function for return values, Consumer for side effects
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // Function for transformations (returns value)
        Function<Integer, Integer> square = n -> n * n;
        System.out.println("Square of 5: " + square.apply(5));

        // Consumer for side effects (no return)
        Consumer<Integer> printSquare = n -> System.out.println(n * n);
        printSquare.accept(5);

        // Supplier for generating values (no input)
        Supplier<Integer> randomInt = () -> (int)(Math.random() * 100);
        System.out.println("Random: " + randomInt.get());
    }
}
```

**Why:** Consumer = side effects only; Function = transformations with return value.

**💡 Tip:** Consumer = `void`; Function = returns value; Supplier = no params, returns value.

---

#### ❌ Wrong - Not Using andThen with Consumers:
```java
// WRONG - Multiple consumer calls instead of chaining
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        Consumer<String> printUpper = s -> System.out.println(s.toUpperCase());
        Consumer<String> printLength = s -> System.out.println("Length: " + s.length());

        String text = "hello";

        // Calling separately - verbose
        printUpper.accept(text);
        printLength.accept(text);
    }
}
```
**Issue:** Multiple calls when chaining available

#### ✅ Right:
```java
// CORRECT - Chain consumers with andThen()
import java.util.function.Consumer;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Consumer<String> printUpper = s -> System.out.println(s.toUpperCase());
        Consumer<String> printLength = s -> System.out.println("Length: " + s.length());
        Consumer<String> printReverse = s ->
            System.out.println(new StringBuilder(s).reverse());

        // Chain consumers
        Consumer<String> combined = printUpper
            .andThen(printLength)
            .andThen(printReverse);

        combined.accept("hello");

        // Useful with forEach
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        names.forEach(printUpper.andThen(printLength));
    }
}
```

**Why:** `andThen()` executes consumers in sequence; cleaner than multiple calls.

**💡 Tip:** Chain consumers with `andThen()` for sequential operations.

---

#### ❌ Wrong - Creating Supplier That Takes Parameters:
```java
// WRONG - Supplier with parameters
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        // Can't! Supplier has no parameters
        Supplier<Integer> random = (int max) -> (int)(Math.random() * max);  // Compile error!
    }
}
```
**Issue:** Supplier takes no parameters; use Function if parameter needed

#### ✅ Right:
```java
// CORRECT - Use appropriate functional interface
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // Supplier: no parameters, returns value
        Supplier<Integer> random100 = () -> (int)(Math.random() * 100);
        System.out.println("Random (0-100): " + random100.get());

        // Function: one parameter, returns value
        Function<Integer, Integer> randomMax = max -> (int)(Math.random() * max);
        System.out.println("Random (0-50): " + randomMax.apply(50));

        // IntSupplier: specialized for int (more efficient)
        IntSupplier randomInt = () -> (int)(Math.random() * 100);
        System.out.println("Random int: " + randomInt.getAsInt());
    }
}
```

**Why:** Supplier = no params; Function = one param; choose based on needs.

**💡 Tip:** Supplier = `() -> T`; Function = `T -> R`; no params vs one param.

---

#### ❌ Wrong - Not Using Specialized Suppliers:
```java
// WRONG - Using generic Supplier for primitives
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        // Causes boxing/unboxing overhead
        Supplier<Integer> randomInt = () -> (int)(Math.random() * 100);
        Supplier<Double> randomDouble = () -> Math.random();

        int value = randomInt.get();  // Unboxing Integer -> int
    }
}
```
**Issue:** Generic Supplier causes boxing overhead for primitives

#### ✅ Right:
```java
// CORRECT - Use specialized suppliers for primitives
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // Specialized suppliers - no boxing overhead
        IntSupplier randomInt = () -> (int)(Math.random() * 100);
        DoubleSupplier randomDouble = () -> Math.random();
        LongSupplier randomLong = () -> (long)(Math.random() * 1000000);
        BooleanSupplier randomBoolean = () -> Math.random() > 0.5;

        int value = randomInt.getAsInt();  // No boxing
        double d = randomDouble.getAsDouble();  // No boxing

        System.out.println("Int: " + value);
        System.out.println("Double: " + d);
        System.out.println("Boolean: " + randomBoolean.getAsBoolean());
    }
}
```

**Why:** Specialized interfaces avoid boxing overhead; better performance.

**💡 Tip:** Use `IntSupplier`, `DoubleSupplier`, etc. for primitive types.

---

### 8. Collection Lambda Mistakes

#### ❌ Wrong - Modifying Collection During forEach:
```java
// WRONG - Modifying collection during iteration
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        // ConcurrentModificationException!
        numbers.forEach(n -> {
            if (n % 2 == 0) {
                numbers.remove(n);  // Modifying during iteration!
            }
        });
    }
}
```
**Issue:** Modifying collection during forEach causes ConcurrentModificationException

#### ✅ Right:
```java
// CORRECT - Use removeIf() or collect to new list
import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        // Option 1: Use removeIf()
        numbers.removeIf(n -> n % 2 == 0);
        System.out.println("After removeIf: " + numbers);

        // Option 2: Stream filter to new list
        List<Integer> numbers2 = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        List<Integer> odds = numbers2.stream()
            .filter(n -> n % 2 != 0)
            .collect(Collectors.toList());
        System.out.println("Filtered: " + odds);

        // Option 3: Collect to remove, then removeAll
        List<Integer> numbers3 = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        List<Integer> toRemove = new ArrayList<>();
        numbers3.forEach(n -> {
            if (n % 2 == 0) toRemove.add(n);
        });
        numbers3.removeAll(toRemove);
        System.out.println("After removeAll: " + numbers3);
    }
}
```

**Why:** Use `removeIf()` for safe removal; or filter to new list; don't modify during iteration.

**💡 Tip:** Use `removeIf()` instead of removing during `forEach()`.

---

#### ❌ Wrong - Using forEach When Stream Better:
```java
// WRONG - Using forEach for transformation
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("alice", "bob", "charlie");
        List<String> upperNames = new ArrayList<>();

        // forEach with side effect - not functional style
        names.forEach(name -> upperNames.add(name.toUpperCase()));

        System.out.println(upperNames);
    }
}
```
**Issue:** Using forEach with side effects; Stream API cleaner for transformations

#### ✅ Right:
```java
// CORRECT - Use Stream for transformations
import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("alice", "bob", "charlie");

        // Stream map for transformation - functional style
        List<String> upperNames = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println(upperNames);

        // forEach only for side effects (like printing)
        names.forEach(System.out::println);
    }
}
```

**Why:** Stream for transformations; forEach for side effects only.

**💡 Tip:** Use Stream `map()` for transformations; `forEach()` for side effects only.

---

#### ❌ Wrong - Incorrect replaceAll Usage:
```java
// WRONG - Expecting replaceAll to return new list
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("alice", "bob", "charlie");

        // replaceAll modifies in place - Arrays.asList is immutable!
        names.replaceAll(String::toUpperCase);  // UnsupportedOperationException!
    }
}
```
**Issue:** `Arrays.asList()` creates immutable list; can't use `replaceAll()`

#### ✅ Right:
```java
// CORRECT - Use mutable list or Stream
import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        // Option 1: Use ArrayList (mutable)
        List<String> names1 = new ArrayList<>(Arrays.asList("alice", "bob", "charlie"));
        names1.replaceAll(String::toUpperCase);  // OK - modifies in place
        System.out.println("After replaceAll: " + names1);

        // Option 2: Use Stream to create new list
        List<String> names2 = Arrays.asList("alice", "bob", "charlie");
        List<String> upper = names2.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("Stream result: " + upper);
    }
}
```

**Why:** `replaceAll()` modifies in place; requires mutable list; Stream creates new list.

**💡 Tip:** Use `ArrayList` for `replaceAll()`; or use Stream `map()` for immutable.

---

#### ❌ Wrong - Not Understanding sort() Comparator:
```java
// WRONG - Backwards comparator logic
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));

        // Student expects ascending order
        numbers.sort((a, b) -> b - a);  // Actually descending!

        System.out.println(numbers);  // [9, 8, 5, 2, 1]
    }
}
```
**Issue:** Comparator logic backwards; negative = a first, positive = b first

#### ✅ Right:
```java
// CORRECT - Understanding comparator logic
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));

        // Ascending order: a - b
        // Negative result means a comes before b
        numbers.sort((a, b) -> a - b);
        System.out.println("Ascending: " + numbers);  // [1, 2, 5, 8, 9]

        // Descending order: b - a
        List<Integer> numbers2 = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        numbers2.sort((a, b) -> b - a);
        System.out.println("Descending: " + numbers2);  // [9, 8, 5, 2, 1]

        // Better: Use Integer.compare() to avoid overflow
        List<Integer> numbers3 = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        numbers3.sort((a, b) -> Integer.compare(a, b));

        // Even better: Use Comparator methods
        List<Integer> numbers4 = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        numbers4.sort(Comparator.naturalOrder());  // Ascending
        numbers4.sort(Comparator.reverseOrder());  // Descending
    }
}
```

**Why:** `a - b` = ascending; `b - a` = descending; use `Integer.compare()` to avoid overflow.

**💡 Tip:** Use `Comparator.naturalOrder()` and `Comparator.reverseOrder()` for clarity.

---

### 9. Performance and Design Mistakes

#### ❌ Wrong - Creating Lambda in Loop:
```java
// WRONG - Creating new lambda each iteration
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        for (int multiplier = 1; multiplier <= 5; multiplier++) {
            final int m = multiplier;
            // Creating new lambda each iteration - inefficient
            numbers.forEach(n -> System.out.println(n * m));
        }
    }
}
```
**Issue:** Creating lambda repeatedly in loop; overhead from object creation

#### ✅ Right:
```java
// CORRECT - Extract lambda when possible
import java.util.*;
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        for (int multiplier = 1; multiplier <= 5; multiplier++) {
            final int m = multiplier;
            // If must capture variable, can't avoid creating lambda
            // But consider extracting to method
            printMultiplied(numbers, m);
        }
    }

    private static void printMultiplied(List<Integer> numbers, int multiplier) {
        numbers.forEach(n -> System.out.println(n * multiplier));
    }
}
```

**Why:** Lambda creation has overhead; extract to method for readability and potential optimization.

**💡 Tip:** Extract complex lambdas to named methods; improves readability and performance.

---

#### ❌ Wrong - Complex Lambda Logic:
```java
// WRONG - Too much logic in lambda
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> data = Arrays.asList("apple,5", "banana,3", "cherry,8");

        // Too complex - hard to read and test
        data.forEach(item -> {
            String[] parts = item.split(",");
            String name = parts[0];
            int quantity = Integer.parseInt(parts[1]);
            if (quantity > 5) {
                System.out.println(name.toUpperCase() + " - HIGH STOCK");
            } else if (quantity > 2) {
                System.out.println(name + " - Normal");
            } else {
                System.out.println(name + " - LOW STOCK");
            }
        });
    }
}
```
**Issue:** Complex lambda hard to read, test, and reuse

#### ✅ Right:
```java
// CORRECT - Extract to named method
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> data = Arrays.asList("apple,5", "banana,3", "cherry,8");

        // Simple, readable lambda
        data.forEach(Main::processItem);
    }

    private static void processItem(String item) {
        String[] parts = item.split(",");
        String name = parts[0];
        int quantity = Integer.parseInt(parts[1]);

        String status = getStockStatus(quantity);
        String displayName = quantity > 5 ? name.toUpperCase() : name;

        System.out.println(displayName + " - " + status);
    }

    private static String getStockStatus(int quantity) {
        if (quantity > 5) return "HIGH STOCK";
        if (quantity > 2) return "Normal";
        return "LOW STOCK";
    }
}
```

**Why:** Named methods are readable, testable, and reusable; keep lambdas simple.

**💡 Tip:** Lambdas should be 1-3 lines; extract complex logic to named methods.

---

#### ❌ Wrong - Using Lambda When Anonymous Class Needed:
```java
// WRONG - Lambda when need multiple methods or state
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Can't use lambda for Comparator with additional methods
        // (This example is contrived, but illustrates the point)
        names.sort((a, b) -> a.compareTo(b));
    }
}
```
**Issue:** Lambda only implements single abstract method; can't add state or methods

#### ✅ Right:
```java
// CORRECT - Use anonymous class when need state or multiple methods
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Simple case: lambda is fine
        names.sort((a, b) -> a.compareTo(b));

        // Complex case: anonymous class for state/initialization
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9);
        numbers.sort(new Comparator<Integer>() {
            private int comparisonCount = 0;

            @Override
            public int compare(Integer a, Integer b) {
                comparisonCount++;
                System.out.println("Comparison #" + comparisonCount);
                return a.compareTo(b);
            }
        });
    }
}
```

**Why:** Lambda for simple single-method cases; anonymous class for state or initialization.

**💡 Tip:** Lambda = stateless single method; anonymous class = when need state or init.

---

#### ❌ Wrong - Not Considering Serialization:
```java
// WRONG - Lambda serialization issues
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Lambda not necessarily serializable!
        Runnable task = () -> System.out.println("Hello");

        // May throw NotSerializableException
        ObjectOutputStream oos = new ObjectOutputStream(
            new FileOutputStream("task.ser"));
        oos.writeObject(task);  // May fail!
    }
}
```
**Issue:** Lambdas not guaranteed serializable; serialization may fail

#### ✅ Right:
```java
// CORRECT - Use serializable functional interface or method reference
import java.io.*;

@FunctionalInterface
interface SerializableRunnable extends Runnable, Serializable {
}

public class Main {
    public static void main(String[] args) throws Exception {
        // Option 1: Use target type that extends Serializable
        SerializableRunnable task1 = (SerializableRunnable) (() ->
            System.out.println("Hello"));

        // Option 2: Use method reference (serializable if target class is)
        SerializableRunnable task2 = Main::printHello;

        // Now can serialize
        ObjectOutputStream oos = new ObjectOutputStream(
            new FileOutputStream("task.ser"));
        oos.writeObject(task1);
        oos.close();

        // Generally: avoid serializing lambdas if possible
    }

    private static void printHello() {
        System.out.println("Hello");
    }
}
```

**Why:** Lambda serialization unreliable; use explicit serializable interfaces or avoid.

**💡 Tip:** Avoid serializing lambdas; use method references or anonymous classes if needed.

---

### 10. Scope and Best Practice Mistakes

#### ❌ Wrong - Returning Lambda from Method Capturing Local Variable:
```java
// WRONG - Unexpected behavior with captured variables
import java.util.function.Supplier;

public class Main {
    public static Supplier<Integer> createSupplier() {
        int value = 10;
        // Lambda captures value=10 at creation time
        return () -> value;  // OK - effectively final

        // But can't do this:
        // value = 20;  // Would cause compile error
    }

    public static void main(String[] args) {
        Supplier<Integer> supplier = createSupplier();
        System.out.println(supplier.get());  // 10
    }
}
```
**Issue:** Student doesn't understand variable captured at creation time, not call time

#### ✅ Right:
```java
// CORRECT - Understanding variable capture timing
import java.util.function.*;

public class Main {
    // Capturing local variable (effectively final)
    public static Supplier<Integer> createSupplier1() {
        int value = 10;
        return () -> value;  // Captures value 10
    }

    // Using parameter (effectively final)
    public static Supplier<Integer> createSupplier2(int value) {
        return () -> value;  // Captures parameter value
    }

    // Using instance variable (can change)
    static class SupplierFactory {
        private int value = 10;

        public Supplier<Integer> createSupplier() {
            return () -> value;  // Captures this.value reference
        }

        public void setValue(int value) {
            this.value = value;
        }
    }

    public static void main(String[] args) {
        Supplier<Integer> s1 = createSupplier1();
        System.out.println(s1.get());  // 10

        Supplier<Integer> s2 = createSupplier2(20);
        System.out.println(s2.get());  // 20

        SupplierFactory factory = new SupplierFactory();
        Supplier<Integer> s3 = factory.createSupplier();
        System.out.println(s3.get());  // 10
        factory.setValue(30);
        System.out.println(s3.get());  // 30 - instance variable changed!
    }
}
```

**Why:** Local variables captured by value (final); instance variables captured by reference.

**💡 Tip:** Local var = captured value (final); instance var = captured reference (mutable).

---

#### ❌ Wrong - Using Lambda When Method Reference Clearer:
```java
// WRONG - Lambda when method reference simpler
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Verbose lambdas
        names.forEach(name -> System.out.println(name));
        names.stream().map(s -> s.toUpperCase()).forEach(s -> System.out.println(s));
    }
}
```
**Issue:** Lambda verbose when method reference available and clearer

#### ✅ Right:
```java
// CORRECT - Use method references when clearer
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Method references - cleaner
        names.forEach(System.out::println);
        names.stream()
             .map(String::toUpperCase)
             .forEach(System.out::println);

        // But use lambda when adding logic
        names.forEach(name -> System.out.println("Name: " + name));
    }
}
```

**Why:** Method references more concise when no additional logic needed.

**💡 Tip:** Use method reference when just calling method; lambda when adding logic.

---

#### ❌ Wrong - Poor Parameter Naming:
```java
// WRONG - Poor parameter names
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Poor names
        names.forEach(x -> System.out.println(x));
        names.stream().filter(s -> s.length() > 3).forEach(s -> System.out.println(s));
    }
}
```
**Issue:** Generic parameter names reduce readability

#### ✅ Right:
```java
// CORRECT - Descriptive parameter names
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Descriptive names
        names.forEach(name -> System.out.println(name));
        names.stream()
             .filter(name -> name.length() > 3)
             .forEach(name -> System.out.println(name));

        // Or use method reference when just passing through
        names.forEach(System.out::println);

        // For complex logic, descriptive names help
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        int sum = numbers.stream()
            .filter(number -> number % 2 == 0)
            .mapToInt(evenNumber -> evenNumber * 2)
            .sum();
    }
}
```

**Why:** Descriptive names improve readability; easier to understand lambda purpose.

**💡 Tip:** Use descriptive parameter names; avoid generic `x`, `y`, `a`, `b` unless very short.

---

#### ❌ Wrong - Using Lambda for Null Checks:
```java
// WRONG - Overly complex null check with lambda
import java.util.*;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", null, "Bob", null, "Charlie");

        // Verbose null check
        Predicate<String> notNull = s -> s != null;
        names.stream().filter(notNull).forEach(System.out::println);
    }
}
```
**Issue:** Creating custom predicate when Objects.nonNull available

#### ✅ Right:
```java
// CORRECT - Use Objects.nonNull method reference
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", null, "Bob", null, "Charlie");

        // Use Objects.nonNull method reference
        names.stream()
             .filter(Objects::nonNull)
             .forEach(System.out::println);

        // For null check: Objects.isNull
        long nullCount = names.stream()
            .filter(Objects::isNull)
            .count();
        System.out.println("Null count: " + nullCount);
    }
}
```

**Why:** `Objects.nonNull` and `Objects.isNull` are standard, clear, and concise.

**💡 Tip:** Use `Objects::nonNull` for null filtering; `Objects::isNull` for null checking.

---

#### ❌ Wrong - Not Understanding Lambda vs Anonymous Class:
```java
// WRONG - Expecting lambda to create new scope for 'this'
public class Main {
    private String name = "Main";

    public void test() {
        Runnable lambda = () -> {
            System.out.println(this.name);  // Student expects error
        };

        // Actually prints "Main" - 'this' refers to Main instance
        lambda.run();
    }

    public static void main(String[] args) {
        new Main().test();
    }
}
```
**Issue:** Student doesn't understand lambda doesn't create new `this` scope

#### ✅ Right:
```java
// CORRECT - Understanding lambda vs anonymous class scoping
public class Main {
    private String name = "Main";

    public void test() {
        // Lambda: 'this' refers to Main instance
        Runnable lambda = () -> {
            System.out.println("Lambda this: " + this.name);  // "Main"
        };

        // Anonymous class: 'this' refers to anonymous class instance
        Runnable anonymous = new Runnable() {
            private String name = "Anonymous";

            @Override
            public void run() {
                System.out.println("Anonymous this: " + this.name);  // "Anonymous"
                System.out.println("Outer this: " + Main.this.name);  // "Main"
            }
        };

        lambda.run();
        anonymous.run();

        // Lambda advantages:
        // - More concise
        // - No new scope (simpler)
        // - Can be more optimized by compiler

        // Anonymous class advantages:
        // - Can have state (fields)
        // - Can have initialization
        // - Can implement multiple methods (if needed)
    }

    public static void main(String[] args) {
        new Main().test();
    }
}
```

**Why:** Lambda = no new scope for `this`; anonymous class = new scope.

**💡 Tip:** Lambda's `this` = enclosing class; anonymous class's `this` = new instance.

---

This comprehensive list contains **40+ Lambda Expression mistakes** covering all fundamental concepts!

---

**🎉 Congratulations on completing Day 27!**

You've mastered lambda expressions in Java. Tomorrow, we'll explore the powerful Stream API.

**Next**: [Day 28: Stream API →](day28_stream_api.md)

---

*Last Updated: 2026-01-09*