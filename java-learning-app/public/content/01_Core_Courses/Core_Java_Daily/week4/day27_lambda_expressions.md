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