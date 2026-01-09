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

---

### Exercise 2: Predicate Examples
Use Predicate for filtering.

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

---

### Exercise 3: Function Chaining
Chain multiple functions together.

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

---

### Exercise 4: Consumer Examples
Use Consumer for operations without return values.

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

---

### Exercise 5: Supplier Examples
Use Supplier to generate values.

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

---

### Exercise 6: List Operations
Perform various operations on lists using lambdas.

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

---

### Exercise 7: Method References
Practice different types of method references.

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

---

### Exercise 8: Custom Functional Interface
Create and use custom functional interfaces.

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

---

### Exercise 9: Lambda with Threads
Use lambdas with multithreading.

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

---

### Exercise 10: Complex Lambda Application
Build a simple calculator using lambdas.

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

**🎉 Congratulations on completing Day 27!**

You've mastered lambda expressions in Java. Tomorrow, we'll explore the powerful Stream API.

**Next**: [Day 28: Stream API →](day28_stream_api.md)

---

*Last Updated: 2026-01-09*