
# Day 10: Methods & Method Overloading

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

By the end of Day 10, you will be able to:
- Understand what methods are and why they're important
- Declare and define methods with different return types
- Use method parameters effectively
- Understand pass-by-value in Java
- Implement method overloading
- Use variable arguments (varargs)
- Create and use recursive methods
- Apply best practices for method design

---

## 📚 Topics Covered

### 1. What are Methods?

A **method** is a block of code that performs a specific task. Methods are also called functions in other programming languages.

#### Why Use Methods?
- **Code Reusability**: Write once, use multiple times
- **Modularity**: Break complex problems into smaller parts
- **Maintainability**: Easier to update and debug
- **Readability**: Makes code more organized and understandable

#### Method Structure:
```java
accessModifier returnType methodName(parameters) {
    // Method body
    // Code to execute
    return value;  // if returnType is not void
}
```

#### Example:
```java
public class Calculator {
    // Method to add two numbers
    public int add(int a, int b) {
        int sum = a + b;
        return sum;
    }
    
    // Method to display a message
    public void displayMessage() {
        System.out.println("Welcome to Calculator!");
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        // Calling methods
        calc.displayMessage();
        int result = calc.add(10, 20);
        System.out.println("Sum: " + result);
    }
}
```

**Output:**
```
Welcome to Calculator!
Sum: 30
```

---

### 2. Method Declaration and Definition

#### Components of a Method:

**1. Access Modifier**: Controls visibility (public, private, protected, default)
**2. Return Type**: Data type of value returned (or void for no return)
**3. Method Name**: Identifier following naming conventions
**4. Parameters**: Input values (optional)
**5. Method Body**: Code to execute

#### Examples of Different Method Types:

```java
public class MethodExamples {
    // 1. Method with no parameters and no return value
    public void greet() {
        System.out.println("Hello!");
    }
    
    // 2. Method with parameters but no return value
    public void greetPerson(String name) {
        System.out.println("Hello, " + name + "!");
    }
    
    // 3. Method with no parameters but with return value
    public int getRandomNumber() {
        return 42;
    }
    
    // 4. Method with parameters and return value
    public int multiply(int a, int b) {
        return a * b;
    }
    
    // 5. Method with multiple parameters
    public double calculateAverage(int num1, int num2, int num3) {
        return (num1 + num2 + num3) / 3.0;
    }
}

public class Main {
    public static void main(String[] args) {
        MethodExamples obj = new MethodExamples();
        
        obj.greet();
        obj.greetPerson("Alice");
        
        int num = obj.getRandomNumber();
        System.out.println("Random number: " + num);
        
        int product = obj.multiply(5, 6);
        System.out.println("Product: " + product);
        
        double avg = obj.calculateAverage(10, 20, 30);
        System.out.println("Average: " + avg);
    }
}
```

**Output:**
```
Hello!
Hello, Alice!
Random number: 42
Product: 30
Average: 20.0
```

---

### 3. Return Types

The **return type** specifies what type of value a method returns.

#### void Return Type:
```java
public class Printer {
    // void means no return value
    public void printMessage(String message) {
        System.out.println(message);
        // No return statement needed
    }
    
    public void printNumbers(int start, int end) {
        for (int i = start; i <= end; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}
```

#### Primitive Return Types:
```java
public class MathOperations {
    public int add(int a, int b) {
        return a + b;
    }
    
    public double divide(double a, double b) {
        if (b != 0) {
            return a / b;
        }
        return 0.0;
    }
    
    public boolean isEven(int number) {
        return number % 2 == 0;
    }
    
    public char getGrade(int marks) {
        if (marks >= 90) return 'A';
        else if (marks >= 80) return 'B';
        else if (marks >= 70) return 'C';
        else if (marks >= 60) return 'D';
        else return 'F';
    }
}
```

#### Object Return Types:
```java
public class StringOperations {
    public String concatenate(String str1, String str2) {
        return str1 + str2;
    }
    
    public String[] splitString(String str, String delimiter) {
        return str.split(delimiter);
    }
}
```

---

### 4. Method Parameters

**Parameters** are variables that receive values when a method is called.

#### Types of Parameters:

**1. No Parameters:**
```java
public void sayHello() {
    System.out.println("Hello!");
}
```

**2. Single Parameter:**
```java
public void printSquare(int number) {
    System.out.println(number * number);
}
```

**3. Multiple Parameters:**
```java
public int calculateSum(int a, int b, int c) {
    return a + b + c;
}
```

**4. Different Data Types:**
```java
public void displayInfo(String name, int age, double salary) {
    System.out.println("Name: " + name);
    System.out.println("Age: " + age);
    System.out.println("Salary: $" + salary);
}
```

#### Complete Example:
```java
public class Student {
    String name;
    int rollNumber;
    
    // Method with multiple parameters
    public void setDetails(String studentName, int roll) {
        name = studentName;
        rollNumber = roll;
    }
    
    // Method with no parameters
    public void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
    }
    
    // Method with parameters and return value
    public String getFormattedInfo() {
        return "Student: " + name + " (Roll: " + rollNumber + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.setDetails("Alice", 101);
        student.display();
        
        String info = student.getFormattedInfo();
        System.out.println(info);
    }
}
```

---

### 5. Pass by Value in Java

Java is **strictly pass-by-value**. This means a copy of the value is passed to the method.

#### With Primitive Types:
```java
public class PassByValueDemo {
    public void modifyPrimitive(int number) {
        number = number * 2;
        System.out.println("Inside method: " + number);
    }
    
    public static void main(String[] args) {
        PassByValueDemo demo = new PassByValueDemo();
        int value = 10;
        
        System.out.println("Before method call: " + value);
        demo.modifyPrimitive(value);
        System.out.println("After method call: " + value);
    }
}
```

**Output:**
```
Before method call: 10
Inside method: 20
After method call: 10
```

**Explanation**: The original variable `value` is not modified because only a copy was passed.

#### With Objects:
```java
public class Person {
    String name;
    
    Person(String name) {
        this.name = name;
    }
}

public class PassByValueDemo {
    public void modifyObject(Person person) {
        person.name = "Modified Name";
        System.out.println("Inside method: " + person.name);
    }
    
    public void reassignObject(Person person) {
        person = new Person("New Person");
        System.out.println("Inside method: " + person.name);
    }
    
    public static void main(String[] args) {
        PassByValueDemo demo = new PassByValueDemo();
        
        // Test 1: Modifying object properties
        Person p1 = new Person("Alice");
        System.out.println("Before modifyObject: " + p1.name);
        demo.modifyObject(p1);
        System.out.println("After modifyObject: " + p1.name);
        
        System.out.println();
        
        // Test 2: Reassigning object reference
        Person p2 = new Person("Bob");
        System.out.println("Before reassignObject: " + p2.name);
        demo.reassignObject(p2);
        System.out.println("After reassignObject: " + p2.name);
    }
}
```

**Output:**
```
Before modifyObject: Alice
Inside method: Modified Name
After modifyObject: Modified Name

Before reassignObject: Bob
Inside method: New Person
After reassignObject: Bob
```

**Explanation**: 
- Modifying object properties affects the original object (reference is copied)
- Reassigning the reference doesn't affect the original reference

---

### 6. Method Overloading

**Method overloading** allows multiple methods with the same name but different parameters.

#### Rules for Method Overloading:
1. Same method name
2. Different parameter list (number, type, or order)
3. Return type can be different (but not sufficient alone)
4. Access modifiers can be different

#### Example 1: Different Number of Parameters
```java
public class Calculator {
    // Method with 2 parameters
    public int add(int a, int b) {
        return a + b;
    }
    
    // Method with 3 parameters
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    // Method with 4 parameters
    public int add(int a, int b, int c, int d) {
        return a + b + c + d;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        System.out.println("Sum of 2 numbers: " + calc.add(10, 20));
        System.out.println("Sum of 3 numbers: " + calc.add(10, 20, 30));
        System.out.println("Sum of 4 numbers: " + calc.add(10, 20, 30, 40));
    }
}
```

**Output:**
```
Sum of 2 numbers: 30
Sum of 3 numbers: 60
Sum of 4 numbers: 100
```

#### Example 2: Different Parameter Types
```java
public class Printer {
    // Print integer
    public void print(int value) {
        System.out.println("Integer: " + value);
    }
    
    // Print double
    public void print(double value) {
        System.out.println("Double: " + value);
    }
    
    // Print string
    public void print(String value) {
        System.out.println("String: " + value);
    }
    
    // Print boolean
    public void print(boolean value) {
        System.out.println("Boolean: " + value);
    }
}

public class Main {
    public static void main(String[] args) {
        Printer printer = new Printer();
        
        printer.print(42);
        printer.print(3.14);
        printer.print("Hello");
        printer.print(true);
    }
}
```

**Output:**
```
Integer: 42
Double: 3.14
String: Hello
Boolean: true
```

#### Example 3: Different Order of Parameters
```java
public class Display {
    public void show(String name, int age) {
        System.out.println("Name: " + name + ", Age: " + age);
    }
    
    public void show(int age, String name) {
        System.out.println("Age: " + age + ", Name: " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Display display = new Display();
        
        display.show("Alice", 25);
        display.show(30, "Bob");
    }
}
```

#### Complex Overloading Example:
```java
public class Shape {
    // Calculate area of square
    public double calculateArea(double side) {
        return side * side;
    }
    
    // Calculate area of rectangle
    public double calculateArea(double length, double width) {
        return length * width;
    }
    
    // Calculate area of circle
    public double calculateArea(double radius, boolean isCircle) {
        if (isCircle) {
            return 3.14159 * radius * radius;
        }
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape shape = new Shape();
        
        System.out.println("Square area: " + shape.calculateArea(5.0));
        System.out.println("Rectangle area: " + shape.calculateArea(4.0, 6.0));
        System.out.println("Circle area: " + shape.calculateArea(3.0, true));
    }
}
```

---

### 7. Variable Arguments (Varargs)

**Varargs** allow a method to accept zero or more arguments of a specified type.

#### Syntax:
```java
returnType methodName(dataType... variableName) {
    // Method body
}
```

#### Basic Example:
```java
public class VarargsDemo {
    // Method with varargs
    public int sum(int... numbers) {
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        return total;
    }
    
    public static void main(String[] args) {
        VarargsDemo demo = new VarargsDemo();
        
        System.out.println("Sum of 0 numbers: " + demo.sum());
        System.out.println("Sum of 2 numbers: " + demo.sum(10, 20));
        System.out.println("Sum of 5 numbers: " + demo.sum(1, 2, 3, 4, 5));
    }
}
```

**Output:**
```
Sum of 0 numbers: 0
Sum of 2 numbers: 30
Sum of 5 numbers: 15
```

#### Varargs with Other Parameters:
```java
public class StringFormatter {
    // Varargs must be the last parameter
    public String format(String separator, String... words) {
        if (words.length == 0) {
            return "";
        }
        
        StringBuilder result = new StringBuilder(words[0]);
        for (int i = 1; i < words.length; i++) {
            result.append(separator).append(words[i]);
        }
        return result.toString();
    }
    
    public static void main(String[] args) {
        StringFormatter formatter = new StringFormatter();
        
        System.out.println(formatter.format(", ", "Apple", "Banana", "Cherry"));
        System.out.println(formatter.format(" - ", "Java", "Python", "C++"));
        System.out.println(formatter.format(" | ", "One"));
    }
}
```

**Output:**
```
Apple, Banana, Cherry
Java - Python - C++
One
```

#### Varargs Rules:
1. Only one varargs parameter per method
2. Varargs must be the last parameter
3. Can be used with method overloading

```java
public class VarargsRules {
    // Valid: varargs is last parameter
    public void method1(int a, String... strings) {
        // Valid
    }
    
    // Invalid: varargs is not last parameter
    // public void method2(String... strings, int a) {
    //     // Compilation error
    // }
    
    // Invalid: multiple varargs
    // public void method3(int... numbers, String... strings) {
    //     // Compilation error
    // }
    
    // Valid: overloading with varargs
    public void print(String... messages) {
        for (String msg : messages) {
            System.out.println(msg);
        }
    }
    
    public void print(int... numbers) {
        for (int num : numbers) {
            System.out.println(num);
        }
    }
}
```

---

### 8. Recursive Methods

A **recursive method** is a method that calls itself.

#### Components of Recursion:
1. **Base Case**: Condition to stop recursion
2. **Recursive Case**: Method calls itself with modified parameters

#### Example 1: Factorial
```java
public class RecursionDemo {
    public int factorial(int n) {
        // Base case
        if (n == 0 || n == 1) {
            return 1;
        }
        // Recursive case
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        RecursionDemo demo = new RecursionDemo();
        
        System.out.println("Factorial of 5: " + demo.factorial(5));
        System.out.println("Factorial of 0: " + demo.factorial(0));
        System.out.println("Factorial of 7: " + demo.factorial(7));
    }
}
```

**Output:**
```
Factorial of 5: 120
Factorial of 0: 1
Factorial of 7: 5040
```

**How it works:**
```
factorial(5)
= 5 * factorial(4)
= 5 * (4 * factorial(3))
= 5 * (4 * (3 * factorial(2)))
= 5 * (4 * (3 * (2 * factorial(1))))
= 5 * (4 * (3 * (2 * 1)))
= 120
```

#### Example 2: Fibonacci Series
```java
public class Fibonacci {
    public int fibonacci(int n) {
        // Base cases
        if (n == 0) return 0;
        if (n == 1) return 1;
        
        // Recursive case
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public void printFibonacciSeries(int count) {
        System.out.print("Fibonacci Series: ");
        for (int i = 0; i < count; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        Fibonacci fib = new Fibonacci();
        
        fib.printFibonacciSeries(10);
        System.out.println("10th Fibonacci number: " + fib.fibonacci(10));
    }
}
```

**Output:**
```
Fibonacci Series: 0 1 1 2 3 5 8 13 21 34 
10th Fibonacci number: 55
```

#### Example 3: Sum of Digits
```java
public class DigitSum {
    public int sumOfDigits(int number) {
        // Base case
        if (number == 0) {
            return 0;
        }
        // Recursive case
        return (number % 10) + sumOfDigits(number / 10);
    }
    
    public static void main(String[] args) {
        DigitSum ds = new DigitSum();
        
        System.out.println("Sum of digits of 12345: " + ds.sumOfDigits(12345));
        System.out.println("Sum of digits of 999: " + ds.sumOfDigits(999));
    }
}
```

**Output:**
```
Sum of digits of 12345: 15
Sum of digits of 999: 27
```

---

## 💻 Practical Exercises

### Exercise 1: Temperature Converter
Create a class with overloaded methods to convert temperatures.

```java
public class TemperatureConverter {
    // Celsius to Fahrenheit
    public double convert(double celsius) {
        return (celsius * 9/5) + 32;
    }
    
    // Fahrenheit to Celsius
    public double convert(double fahrenheit, boolean toC) {
        if (toC) {
            return (fahrenheit - 32) * 5/9;
        }
        return fahrenheit;
    }
    
    // Celsius to Kelvin
    public double convertToKelvin(double celsius) {
        return celsius + 273.15;
    }
    
    // Kelvin to Celsius
    public double convertFromKelvin(double kelvin) {
        return kelvin - 273.15;
    }
    
    void displayConversions(double temp) {
        System.out.println("\n=== Temperature Conversions ===");
        System.out.println("Celsius: " + temp);
        System.out.println("Fahrenheit: " + convert(temp));
        System.out.println("Kelvin: " + convertToKelvin(temp));
    }
}

public class TestTemperature {
    public static void main(String[] args) {
        TemperatureConverter converter = new TemperatureConverter();
        
        converter.displayConversions(25.0);
        converter.displayConversions(0.0);
        converter.displayConversions(100.0);
    }
}
```

---

### Exercise 2: String Manipulator
Create methods for various string operations.

```java
public class StringManipulator {
    // Reverse a string
    public String reverse(String str) {
        StringBuilder reversed = new StringBuilder(str);
        return reversed.reverse().toString();
    }
    
    // Count vowels
    public int countVowels(String str) {
        int count = 0;
        str = str.toLowerCase();
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                count++;
            }
        }
        return count;
    }
    
    // Check if palindrome
    public boolean isPalindrome(String str) {
        String reversed = reverse(str);
        return str.equalsIgnoreCase(reversed);
    }
    
    // Count words
    public int countWords(String str) {
        if (str == null || str.trim().isEmpty()) {
            return 0;
        }
        String[] words = str.trim().split("\\s+");
        return words.length;
    }
    
    // Display all operations
    public void analyzeString(String str) {
        System.out.println("\n=== String Analysis ===");
        System.out.println("Original: " + str);
        System.out.println("Reversed: " + reverse(str));
        System.out.println("Vowel Count: " + countVowels(str));
        System.out.println("Is Palindrome: " + isPalindrome(str));
        System.out.println("Word Count: " + countWords(str));
    }
}

public class TestStringManipulator {
    public static void main(String[] args) {
        StringManipulator sm = new StringManipulator();
        
        sm.analyzeString("Hello World");
        sm.analyzeString("madam");
        sm.analyzeString("Java Programming is fun");
    }
}
```

---

### Exercise 3: Array Operations with Varargs
Create methods using varargs for array operations.

```java
public class ArrayOperations {
    // Find maximum using varargs
    public int findMax(int... numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("At least one number required");
        }
        
        int max = numbers[0];
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }
    
    // Find minimum using varargs
    public int findMin(int... numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("At least one number required");
        }
        
        int min = numbers[0];
        for (int num : numbers) {
            if (num < min) {
                min = num;
            }
        }
        return min;
    }
    
    // Calculate average using varargs
    public double calculateAverage(int... numbers) {
        if (numbers.length == 0) {
            return 0.0;
        }
        
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return (double) sum / numbers.length;
    }
    
    // Display statistics
    public void displayStats(int... numbers) {
        System.out.println("\n=== Array Statistics ===");
        System.out.print("Numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        System.out.println("Count: " + numbers.length);
        System.out.println("Maximum: " + findMax(numbers));
        System.out.println("Minimum: " + findMin(numbers));
        System.out.println("Average: " + String.format("%.2f", calculateAverage(numbers)));
    }
}

public class TestArrayOperations {
    public static void main(String[] args) {
        ArrayOperations ops = new ArrayOperations();
        
        ops.displayStats(5, 2, 8, 1, 9, 3);
        ops.displayStats(10, 20, 30);
        ops.displayStats(100);
    }
}
```

---

### Exercise 4: Recursive Power Calculator
Create recursive methods for mathematical operations.

```java
public class PowerCalculator {
    // Calculate power recursively
    public long power(int base, int exponent) {
        // Base case
        if (exponent == 0) {
            return 1;
        }
        if (exponent == 1) {
            return base;
        }
        
        // Recursive case
        return base * power(base, exponent - 1);
    }
    
    // Calculate power with negative exponents
    public double powerWithNegative(int base, int exponent) {
        if (exponent >= 0) {
            return power(base, exponent);
        } else {
            return 1.0 / power(base, -exponent);
        }
    }
    
    // Display power table
    public void displayPowerTable(int base, int maxExponent) {
        System.out.println("\n=== Power Table for " + base + " ===");
        for (int i = 0; i <= maxExponent; i++) {
            System.out.println(base + "^" + i + " = " + power(base, i));
        }
    }
}

public class TestPowerCalculator {
    public static void main(String[] args) {
        PowerCalculator calc = new PowerCalculator();
        
        System.out.println("2^5 = " + calc.power(2, 5));
        System.out.println("3^4 = " + calc.power(3, 4));
        System.out.println("5^0 = " + calc.power(5, 0));
        
        System.out.println("\n2^-3 = " + calc.powerWithNegative(2, -3));
        
        calc.displayPowerTable(2, 10);
    }
}
```

---

### Exercise 5: Method Overloading with Shapes
Create overloaded methods for different shapes.

```java
public class ShapeCalculator {
    // Circle area
    public double calculateArea(double radius) {
        return Math.PI * radius * radius;
    }
    
    // Rectangle area
    public double calculateArea(double length, double width) {
        return length * width;
    }
    
    // Triangle area
    public double calculateArea(double base, double height, boolean isTriangle) {
        if (isTriangle) {
            return 0.5 * base * height;
        }
        return 0;
    }
    
    // Circle perimeter
    public double calculatePerimeter(double radius) {
        return 2 * Math.PI * radius;
    }
    
    // Rectangle perimeter
    public double calculatePerimeter(double length, double width) {
        return 2 * (length + width);
    }
    
    // Display shape info
    public void displayShapeInfo(String shapeName, double area, double perimeter) {
        System.out.println("\n=== " + shapeName + " ===");
        System.out.println("Area: " + String.format("%.2f", area));
        System.out.println("Perimeter: " + String.format("%.2f", perimeter));
    }
}

public class TestShapeCalculator {
    public static void main(String[] args) {
        ShapeCalculator calc = new ShapeCalculator();
        
        // Circle
        double circleArea = calc.calculateArea(5.0);
        double circlePerimeter = calc.calculatePerimeter(5.0);
        calc.displayShapeInfo("Circle (radius=5)", circleArea, circlePerimeter);
        
        // Rectangle
        double rectArea = calc.calculateArea(4.0, 6.0);
        double rectPerimeter = calc.calculatePerimeter(4.0, 6.0);
        calc.displayShapeInfo("Rectangle (4x6)", rectArea, rectPerimeter);
        
        // Triangle
        double triangleArea = calc.calculateArea(6.0, 4.0, true);
        calc.displayShapeInfo("Triangle (base=6, height=4)", triangleArea, 0);
    }
}
```

---

### Exercise 6: Recursive String Operations
Create recursive methods for string manipulation.

```java
public class RecursiveString {
    // Reverse string recursively
    public String reverse(String str) {
        // Base case
        if (str.isEmpty()) {
            return str;
        }
        // Recursive case
        return reverse(str.substring(1)) + str.charAt(0);
    }
    
    // Count characters recursively
    public int countChar(String str, char ch) {
        // Base case
        if (str.isEmpty()) {
            return 0;
        }
        // Recursive case
        int count = (str.charAt(0) == ch) ? 1 : 0;
        return count + countChar(str.substring(1), ch);
    }
    
    // Check palindrome recursively
    public boolean isPalindrome(String str) {
        // Base cases
        if (str.length() <= 1) {
            return true;
        }
        
        // Check first and last characters
        if (str.charAt(0) != str.charAt(str.length() - 1)) {
            return false;
        }
        
        // Recursive case: check middle substring
        return isPalindrome(str.substring(1, str.length() - 1));
    }
    
    public void analyzeString(
String str) {
        System.out.println("\n=== Recursive String Analysis ===");
        System.out.println("Original: " + str);
        System.out.println("Reversed: " + reverse(str));
        System.out.println("Is Palindrome: " + isPalindrome(str.toLowerCase()));
        System.out.println("Count of 'a': " + countChar(str.toLowerCase(), 'a'));
    }
}

public class TestRecursiveString {
    public static void main(String[] args) {
        RecursiveString rs = new RecursiveString();
        
        rs.analyzeString("Hello");
        rs.analyzeString("madam");
        rs.analyzeString("racecar");
        rs.analyzeString("Java Programming");
    }
}
```

---

### Exercise 7: Bank Account with Methods
Create a BankAccount class with various methods.

```java
public class BankAccount {
    private String accountNumber;
    private String accountHolder;
    private double balance;
    
    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    
    // Deposit money
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }
    
    // Withdraw money
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
            return true;
        } else {
            System.out.println("Insufficient balance or invalid amount");
            return false;
        }
    }
    
    // Get balance
    public double getBalance() {
        return balance;
    }
    
    // Transfer money to another account
    public boolean transfer(BankAccount targetAccount, double amount) {
        if (withdraw(amount)) {
            targetAccount.deposit(amount);
            System.out.println("Transferred $" + amount + " to " + targetAccount.accountHolder);
            return true;
        }
        return false;
    }
    
    // Display account info
    public void displayInfo() {
        System.out.println("\n=== Account Information ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + String.format("%.2f", balance));
    }
}

public class TestBankAccount {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("ACC001", "Alice", 1000.0);
        BankAccount acc2 = new BankAccount("ACC002", "Bob", 500.0);
        
        acc1.displayInfo();
        acc2.displayInfo();
        
        System.out.println("\n--- Transactions ---");
        acc1.deposit(500);
        acc1.withdraw(200);
        acc1.transfer(acc2, 300);
        
        acc1.displayInfo();
        acc2.displayInfo();
    }
}
```

---

### Exercise 8: Calculator with All Operations
Create a comprehensive calculator with overloaded methods.

```java
public class AdvancedCalculator {
    // Addition - integers
    public int add(int a, int b) {
        return a + b;
    }
    
    // Addition - doubles
    public double add(double a, double b) {
        return a + b;
    }
    
    // Addition - varargs
    public int add(int... numbers) {
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return sum;
    }
    
    // Subtraction
    public int subtract(int a, int b) {
        return a - b;
    }
    
    public double subtract(double a, double b) {
        return a - b;
    }
    
    // Multiplication
    public int multiply(int a, int b) {
        return a * b;
    }
    
    public double multiply(double a, double b) {
        return a * b;
    }
    
    // Division
    public double divide(int a, int b) {
        if (b == 0) {
            System.out.println("Error: Division by zero");
            return 0;
        }
        return (double) a / b;
    }
    
    public double divide(double a, double b) {
        if (b == 0) {
            System.out.println("Error: Division by zero");
            return 0;
        }
        return a / b;
    }
    
    // Modulus
    public int modulus(int a, int b) {
        if (b == 0) {
            System.out.println("Error: Division by zero");
            return 0;
        }
        return a % b;
    }
    
    // Display menu
    public void displayMenu() {
        System.out.println("\n=== Advanced Calculator ===");
        System.out.println("1. Addition");
        System.out.println("2. Subtraction");
        System.out.println("3. Multiplication");
        System.out.println("4. Division");
        System.out.println("5. Modulus");
    }
}

public class TestAdvancedCalculator {
    public static void main(String[] args) {
        AdvancedCalculator calc = new AdvancedCalculator();
        
        System.out.println("Integer Addition: " + calc.add(10, 20));
        System.out.println("Double Addition: " + calc.add(10.5, 20.3));
        System.out.println("Varargs Addition: " + calc.add(1, 2, 3, 4, 5));
        
        System.out.println("\nSubtraction: " + calc.subtract(50, 20));
        System.out.println("Multiplication: " + calc.multiply(5, 6));
        System.out.println("Division: " + calc.divide(10, 3));
        System.out.println("Modulus: " + calc.modulus(17, 5));
    }
}
```

---

### Exercise 9: Recursive Array Operations
Create recursive methods for array operations.

```java
public class RecursiveArray {
    // Find sum of array elements recursively
    public int sum(int[] arr, int index) {
        // Base case
        if (index >= arr.length) {
            return 0;
        }
        // Recursive case
        return arr[index] + sum(arr, index + 1);
    }
    
    // Find maximum in array recursively
    public int findMax(int[] arr, int index) {
        // Base case
        if (index == arr.length - 1) {
            return arr[index];
        }
        // Recursive case
        int maxOfRest = findMax(arr, index + 1);
        return Math.max(arr[index], maxOfRest);
    }
    
    // Find minimum in array recursively
    public int findMin(int[] arr, int index) {
        // Base case
        if (index == arr.length - 1) {
            return arr[index];
        }
        // Recursive case
        int minOfRest = findMin(arr, index + 1);
        return Math.min(arr[index], minOfRest);
    }
    
    // Check if array is sorted recursively
    public boolean isSorted(int[] arr, int index) {
        // Base case
        if (index == arr.length - 1) {
            return true;
        }
        // Check current and next element
        if (arr[index] > arr[index + 1]) {
            return false;
        }
        // Recursive case
        return isSorted(arr, index + 1);
    }
    
    // Display array analysis
    public void analyzeArray(int[] arr) {
        System.out.println("\n=== Array Analysis ===");
        System.out.print("Array: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
        System.out.println("Sum: " + sum(arr, 0));
        System.out.println("Maximum: " + findMax(arr, 0));
        System.out.println("Minimum: " + findMin(arr, 0));
        System.out.println("Is Sorted: " + isSorted(arr, 0));
    }
}

public class TestRecursiveArray {
    public static void main(String[] args) {
        RecursiveArray ra = new RecursiveArray();
        
        int[] arr1 = {5, 2, 8, 1, 9};
        int[] arr2 = {1, 2, 3, 4, 5};
        int[] arr3 = {10, 20, 15, 25};
        
        ra.analyzeArray(arr1);
        ra.analyzeArray(arr2);
        ra.analyzeArray(arr3);
    }
}
```

---

### Exercise 10: Method Chaining with Student
Create a Student class with method chaining.

```java
public class Student {
    private String name;
    private int rollNumber;
    private String course;
    private double gpa;
    private String email;
    
    public Student(String name) {
        this.name = name;
    }
    
    // Method chaining - each method returns 'this'
    public Student setRollNumber(int rollNumber) {
        this.rollNumber = rollNumber;
        return this;
    }
    
    public Student setCourse(String course) {
        this.course = course;
        return this;
    }
    
    public Student setGPA(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA. Must be between 0.0 and 4.0");
        }
        return this;
    }
    
    public Student setEmail(String email) {
        this.email = email;
        return this;
    }
    
    // Getters
    public String getName() {
        return name;
    }
    
    public int getRollNumber() {
        return rollNumber;
    }
    
    public String getCourse() {
        return course;
    }
    
    public double getGPA() {
        return gpa;
    }
    
    public String getEmail() {
        return email;
    }
    
    // Display student info
    public void display() {
        System.out.println("\n=== Student Information ===");
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Course: " + course);
        System.out.println("GPA: " + gpa);
        System.out.println("Email: " + email);
    }
    
    // Get formatted string
    public String getFormattedInfo() {
        return String.format("%s (Roll: %d) - %s - GPA: %.2f", 
                           name, rollNumber, course, gpa);
    }
}

public class TestStudent {
    public static void main(String[] args) {
        // Method chaining in action
        Student student1 = new Student("Alice Johnson")
                            .setRollNumber(101)
                            .setCourse("Computer Science")
                            .setGPA(3.8)
                            .setEmail("alice@university.edu");
        
        Student student2 = new Student("Bob Smith")
                            .setRollNumber(102)
                            .setCourse("Electrical Engineering")
                            .setGPA(3.5)
                            .setEmail("bob@university.edu");
        
        student1.display();
        student2.display();
        
        System.out.println("\n--- Formatted Info ---");
        System.out.println(student1.getFormattedInfo());
        System.out.println(student2.getFormattedInfo());
    }
}
```

---

### Exercise 11: Prime Number Checker (Bonus)
Create methods to work with prime numbers.

```java
public class PrimeChecker {
    // Check if number is prime
    public boolean isPrime(int number) {
        if (number <= 1) {
            return false;
        }
        if (number == 2) {
            return true;
        }
        if (number % 2 == 0) {
            return false;
        }
        
        for (int i = 3; i <= Math.sqrt(number); i += 2) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }
    
    // Find all primes up to n
    public void printPrimes(int n) {
        System.out.print("Prime numbers up to " + n + ": ");
        for (int i = 2; i <= n; i++) {
            if (isPrime(i)) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
    
    // Count primes up to n
    public int countPrimes(int n) {
        int count = 0;
        for (int i = 2; i <= n; i++) {
            if (isPrime(i)) {
                count++;
            }
        }
        return count;
    }
    
    // Find nth prime number
    public int nthPrime(int n) {
        int count = 0;
        int number = 2;
        
        while (count < n) {
            if (isPrime(number)) {
                count++;
                if (count == n) {
                    return number;
                }
            }
            number++;
        }
        return -1;
    }
}

public class TestPrimeChecker {
    public static void main(String[] args) {
        PrimeChecker pc = new PrimeChecker();
        
        System.out.println("Is 17 prime? " + pc.isPrime(17));
        System.out.println("Is 20 prime? " + pc.isPrime(20));
        
        pc.printPrimes(50);
        
        System.out.println("\nCount of primes up to 100: " + pc.countPrimes(100));
        System.out.println("10th prime number: " + pc.nthPrime(10));
        System.out.println("25th prime number: " + pc.nthPrime(25));
    }
}
```

---

### Exercise 12: GCD and LCM Calculator (Bonus)
Create recursive methods for GCD and LCM.

```java
public class GCDLCMCalculator {
    // Calculate GCD using Euclidean algorithm (recursive)
    public int gcd(int a, int b) {
        // Base case
        if (b == 0) {
            return a;
        }
        // Recursive case
        return gcd(b, a % b);
    }
    
    // Calculate LCM using GCD
    public int lcm(int a, int b) {
        return (a * b) / gcd(a, b);
    }
    
    // Calculate GCD of multiple numbers using varargs
    public int gcdMultiple(int... numbers) {
        if (numbers.length == 0) {
            return 0;
        }
        if (numbers.length == 1) {
            return numbers[0];
        }
        
        int result = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            result = gcd(result, numbers[i]);
        }
        return result;
    }
    
    // Calculate LCM of multiple numbers using varargs
    public int lcmMultiple(int... numbers) {
        if (numbers.length == 0) {
            return 0;
        }
        if (numbers.length == 1) {
            return numbers[0];
        }
        
        int result = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            result = lcm(result, numbers[i]);
        }
        return result;
    }
    
    // Display calculations
    public void displayCalculations(int a, int b) {
        System.out.println("\n=== GCD and LCM ===");
        System.out.println("Numbers: " + a + " and " + b);
        System.out.println("GCD: " + gcd(a, b));
        System.out.println("LCM: " + lcm(a, b));
    }
}

public class TestGCDLCM {
    public static void main(String[] args) {
        GCDLCMCalculator calc = new GCDLCMCalculator();
        
        calc.displayCalculations(12, 18);
        calc.displayCalculations(24, 36);
        calc.displayCalculations(7, 13);
        
        System.out.println("\nGCD of 12, 18, 24: " + calc.gcdMultiple(12, 18, 24));
        System.out.println("LCM of 4, 6, 8: " + calc.lcmMultiple(4, 6, 8));
    }
}
```

---

## 🔑 Key Takeaways

1. **Methods**: Reusable blocks of code that perform specific tasks
2. **Return Types**: Specify what type of value a method returns (or void)
3. **Parameters**: Input values passed to methods
4. **Pass by Value**: Java passes copies of values, not references
5. **Method Overloading**: Multiple methods with same name but different parameters
6. **Varargs**: Allow methods to accept variable number of arguments
7. **Recursion**: Method calling itself with base and recursive cases
8. **Method Chaining**: Returning `this` to enable fluent interfaces
9. **Code Reusability**: Methods promote DRY (Don't Repeat Yourself) principle
10. **Modularity**: Breaking complex problems into smaller, manageable methods

---

## ⚠️ Common Mistakes

### 1. Missing Return Statement:
```java
// WRONG
public int add(int a, int b) {
    int sum = a + b;
    // Missing return statement
}

// CORRECT
public int add(int a, int b) {
    int sum = a + b;
    return sum;
}
```

### 2. Wrong Return Type:
```java
// WRONG
public int divide(int a, int b) {
    return a / b;  // Returns int, loses decimal precision
}

// CORRECT
public double divide(int a, int b) {
    return (double) a / b;  // Returns double with precision
}
```

### 3. Overloading Only by Return Type:
```java
// WRONG - Cannot overload by return type alone
public int calculate(int a, int b) {
    return a + b;
}

public double calculate(int a, int b) {  // ERROR!
    return a + b;
}

// CORRECT - Different parameters
public int calculate(int a, int b) {
    return a + b;
}

public double calculate(double a, double b) {
    return a + b;
}
```

### 4. Varargs Not Last Parameter:
```java
// WRONG
public void method(int... numbers, String name) {  // ERROR!
    // Varargs must be last
}

// CORRECT
public void method(String name, int... numbers) {
    // Varargs is last parameter
}
```

### 5. Missing Base Case in Recursion:
```java
// WRONG - Infinite recursion
public int factorial(int n) {
    return n * factorial(n - 1);  // No base case!
}

// CORRECT
public int factorial(int n) {
    if (n == 0 || n == 1) {  // Base case
        return 1;
    }
    return n * factorial(n - 1);
}
```

### 6. Modifying Parameters Expecting Change:
```java
// WRONG - Expecting parameter to change
public void increment(int number) {
    number++;  // Only changes local copy
}

int value = 5;
increment(value);
System.out.println(value);  // Still 5!

// CORRECT - Return new value
public int increment(int number) {
    return number + 1;
}

int value = 5;
value = increment(value);
System.out.println(value);  // Now 6
```

### 7. Not Handling Division by Zero:
```java
// WRONG
public double divide(int a, int b) {
    return a / b;  // Crashes if b is 0
}

// CORRECT
public double divide(int a, int b) {
    if (b == 0) {
        System.out.println("Error: Division by zero");
        return 0;
    }
    return (double) a / b;
}
```

### 8. Confusing Method Overloading with Overriding:
```java
// Overloading - Same class, different parameters
public class Calculator {
    public int add(int a, int b) { return a + b; }
    public double add(double a, double b) { return a + b; }
}

// Overriding - Different class (inheritance), same signature
// (Will be covered in later lessons)
```

### 9. Unreachable Code After Return:
```java
// WRONG
public int calculate(int a, int b) {
    return a + b;
    System.out.println("Done");  // ERROR! Unreachable
}

// CORRECT
public int calculate(int a, int b) {
    System.out.println("Calculating...");
    return a + b;
}
```

### 10. Not Using Descriptive Method Names:
```java
// WRONG - Unclear names
public int calc(int a, int b) { return a + b; }
public void doIt() { /* ... */ }

// CORRECT - Descriptive names
public int calculateSum(int a, int b) { return a + b; }
public void displayUserInformation() { /* ... */ }
```

---

## 🔗 Navigation

### Previous Day
← [Day 9: Constructors & this Keyword](day09_constructors_this.md)

### Next Day
→ [Day 11: Encapsulation & Access Modifiers](day11_encapsulation.md)

### Week Overview
↑ [Week 2: Object-Oriented Programming Fundamentals](README.md)

### Course Home
🏠 [Core Java Daily Learning](../README.md)

### Related Topics
- [Day 9: Constructors](day09_constructors_this.md) - Special methods for initialization
- [Day 11: Encapsulation](day11_encapsulation.md) - Using methods with access modifiers
- [Day 13: Polymorphism](day13_polymorphism.md) - Method overriding

### Assessment
📝 [Day 10 Assessment](../../assessments/java/week2/day10_assessment.js) - Test your method knowledge

---

**Daily Practice Reminder**: Complete all exercises before moving to the next day. Understanding methods is fundamental to all Java programming!

**Estimated Study Time**: 4-5 hours

**Difficulty Level**: ⭐⭐⭐ Intermediate

---

*Last Updated: 2024-01-08*
*Part of Week 2: Object-Oriented Programming Fundamentals*