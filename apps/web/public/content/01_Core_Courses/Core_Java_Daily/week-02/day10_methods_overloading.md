
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

**📝 Problem Statement:**
Create a TemperatureConverter class that demonstrates method overloading by providing multiple temperature conversion methods. The class should handle conversions between Celsius, Fahrenheit, and Kelvin scales using overloaded methods.

**Requirements:**
- Create an overloaded `convert()` method that converts Celsius to Fahrenheit
- Create another overloaded `convert()` method that converts Fahrenheit to Celsius using a boolean parameter
- Implement `convertToKelvin()` method to convert Celsius to Kelvin
- Implement `convertFromKelvin()` method to convert Kelvin to Celsius
- Provide a `displayConversions()` method showing all temperature scales for a given Celsius value
- Test with standard temperature values (0°C, 25°C, 100°C)

**Sample Test Cases:**
```
Input: displayConversions(25.0)
Expected Output:
=== Temperature Conversions ===
Celsius: 25.0
Fahrenheit: 77.0
Kelvin: 298.15

Input: displayConversions(0.0)
Expected Output:
=== Temperature Conversions ===
Celsius: 0.0
Fahrenheit: 32.0
Kelvin: 273.15

Input: displayConversions(100.0)
Expected Output:
=== Temperature Conversions ===
Celsius: 100.0
Fahrenheit: 212.0
Kelvin: 373.15
```

**Solution:**
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

**💡 Tips:**
- Method overloading allows same method name with different parameters
- Use boolean parameters to distinguish between similar operations
- Celsius to Fahrenheit formula: (C × 9/5) + 32
- Fahrenheit to Celsius formula: (F - 32) × 5/9
- Celsius to Kelvin: Add 273.15
- Kelvin to Celsius: Subtract 273.15

---

### Exercise 2: String Manipulator

**📝 Problem Statement:**
Create a StringManipulator class that provides various string manipulation and analysis methods. The class should perform operations like reversing strings, counting vowels, checking palindromes, and counting words.

**Requirements:**
- Implement a `reverse()` method that returns the reversed string
- Create a `countVowels()` method that counts all vowels (a, e, i, o, u) in a string
- Implement an `isPalindrome()` method that checks if a string reads the same forwards and backwards
- Create a `countWords()` method that counts the number of words in a string
- Provide an `analyzeString()` method that displays comprehensive string analysis
- Handle edge cases like null strings and empty strings

**Sample Test Cases:**
```
Input: analyzeString("Hello World")
Expected Output:
=== String Analysis ===
Original: Hello World
Reversed: dlroW olleH
Vowel Count: 3
Is Palindrome: false
Word Count: 2

Input: analyzeString("madam")
Expected Output:
=== String Analysis ===
Original: madam
Reversed: madam
Vowel Count: 2
Is Palindrome: true
Word Count: 1

Input: analyzeString("Java Programming is fun")
Expected Output:
=== String Analysis ===
Original: Java Programming is fun
Reversed: nuf si gnimmargorP avaJ
Vowel Count: 7
Is Palindrome: false
Word Count: 4
```

**Solution:**
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

**💡 Tips:**
- Use StringBuilder for efficient string reversal
- Convert to lowercase for case-insensitive vowel counting
- Palindrome check requires case-insensitive comparison
- Use split("\\s+") to handle multiple spaces between words
- Always validate input for null or empty strings
- Regular expressions (\\s+) match one or more whitespace characters

---

### Exercise 3: Array Operations with Varargs

**📝 Problem Statement:**
Create an ArrayOperations class that demonstrates the use of varargs (variable arguments) for performing various statistical operations on arrays. The class should accept any number of integer arguments and calculate maximum, minimum, and average values.

**Requirements:**
- Implement `findMax(int... numbers)` method using varargs to find the maximum value
- Create `findMin(int... numbers)` method to find the minimum value
- Implement `calculateAverage(int... numbers)` method to compute the average
- Add validation to handle empty arrays
- Create `displayStats(int... numbers)` method showing comprehensive array statistics
- Test with different numbers of arguments (1 argument, 3 arguments, 6 arguments)

**Sample Test Cases:**
```
Input: displayStats(5, 2, 8, 1, 9, 3)
Expected Output:
=== Array Statistics ===
Numbers: 5 2 8 1 9 3
Count: 6
Maximum: 9
Minimum: 1
Average: 4.67

Input: displayStats(10, 20, 30)
Expected Output:
=== Array Statistics ===
Numbers: 10 20 30
Count: 3
Maximum: 30
Minimum: 10
Average: 20.00

Input: displayStats(100)
Expected Output:
=== Array Statistics ===
Numbers: 100
Count: 1
Maximum: 100
Minimum: 100
Average: 100.00
```

**Solution:**
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

**💡 Tips:**
- Varargs (int... numbers) allows passing variable number of arguments
- Varargs parameter must be the last parameter in method signature
- Internally, varargs are treated as arrays
- Use enhanced for loop to iterate through varargs
- Always validate that varargs array is not empty before operations
- Cast to double for average calculation to avoid integer division

---

### Exercise 4: Recursive Power Calculator

**📝 Problem Statement:**
Create a PowerCalculator class that implements recursive methods for calculating powers. The class should handle positive exponents, negative exponents, and provide power table generation functionality.

**Requirements:**
- Implement recursive `power(int base, int exponent)` method for positive exponents
- Create `powerWithNegative()` method that handles both positive and negative exponents
- Implement `displayPowerTable()` method that shows powers from 0 to a maximum exponent
- Use recursion with proper base cases
- Handle edge cases like exponent 0 and exponent 1
- Return appropriate data types (long for large values, double for negative exponents)

**Sample Test Cases:**
```
Input: power(2, 5)
Expected Output: 32

Input: power(3, 4)
Expected Output: 81

Input: power(5, 0)
Expected Output: 1

Input: powerWithNegative(2, -3)
Expected Output: 0.125

Input: displayPowerTable(2, 10)
Expected Output:
=== Power Table for 2 ===
2^0 = 1
2^1 = 2
2^2 = 4
2^3 = 8
2^4 = 16
2^5 = 32
2^6 = 64
2^7 = 128
2^8 = 256
2^9 = 512
2^10 = 1024
```

**Solution:**
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

**💡 Tips:**
- Recursive base cases prevent infinite recursion (exponent 0 and 1)
- Each recursive call reduces the exponent by 1
- Negative exponents: a^-n = 1/(a^n)
- Return long for large positive results
- Return double for negative exponents (fractional results)
- Power of 0 always equals 1 for any non-zero base

---

### Exercise 5: Method Overloading with Shapes

**📝 Problem Statement:**
Create a ShapeCalculator class that demonstrates method overloading by providing different calculation methods for various geometric shapes (circle, rectangle, triangle). Each shape should have overloaded methods for calculating area and perimeter.

**Requirements:**
- Implement overloaded `calculateArea(double radius)` for circles
- Implement overloaded `calculateArea(double length, double width)` for rectangles
- Implement overloaded `calculateArea(double base, double height, boolean isTriangle)` for triangles
- Create overloaded `calculatePerimeter()` methods for circles and rectangles
- Provide `displayShapeInfo()` method to show formatted output
- Use appropriate formulas for each shape

**Sample Test Cases:**
```
Input: Circle with radius = 5.0
Expected Output:
=== Circle (radius=5) ===
Area: 78.54
Perimeter: 31.42

Input: Rectangle with length = 4.0, width = 6.0
Expected Output:
=== Rectangle (4x6) ===
Area: 24.00
Perimeter: 20.00

Input: Triangle with base = 6.0, height = 4.0
Expected Output:
=== Triangle (base=6, height=4) ===
Area: 12.00
Perimeter: 0.00
```

**Solution:**
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

**💡 Tips:**
- Method overloading determined by number, type, or order of parameters
- Circle area: π × r²
- Rectangle area: length × width
- Triangle area: ½ × base × height
- Circle perimeter (circumference): 2 × π × r
- Rectangle perimeter: 2 × (length + width)
- Use String.format("%.2f") for consistent decimal formatting

---

### Exercise 6: Recursive String Operations

**📝 Problem Statement:**
Create a RecursiveString class that implements various string operations using recursion. The class should handle string reversal, character counting, and palindrome checking using recursive algorithms instead of loops.

**Requirements:**
- Implement recursive `reverse(String str)` method to reverse a string
- Create recursive `countChar(String str, char ch)` method to count occurrences of a character
- Implement recursive `isPalindrome(String str)` method to check palindrome status
- Use proper base cases for recursion termination
- Provide `analyzeString()` method for comprehensive analysis
- Test with various strings including palindromes

**Sample Test Cases:**
```
Input: analyzeString("Hello")
Expected Output:
=== Recursive String Analysis ===
Original: Hello
Reversed: olleH
Is Palindrome: false
Count of 'a': 0

Input: analyzeString("madam")
Expected Output:
=== Recursive String Analysis ===
Original: madam
Reversed: madam
Is Palindrome: true
Count of 'a': 2

Input: analyzeString("racecar")
Expected Output:
=== Recursive String Analysis ===
Original: racecar
Reversed: racecar
Is Palindrome: true
Count of 'a': 2
```

**Solution:**
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

    public void analyzeString(String str) {
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

**💡 Tips:**
- Base case for string recursion: empty string or single character
- Use substring() to reduce problem size in each recursive call
- Reverse: move first character to end, reverse rest
- Count: check first character, count rest recursively
- Palindrome: compare first and last, check middle recursively
- Always convert to lowercase for case-insensitive operations

---

### Exercise 7: Bank Account with Methods

**📝 Problem Statement:**
Create a comprehensive BankAccount class that demonstrates various methods for banking operations. The class should support deposits, withdrawals, balance inquiries, and money transfers between accounts with proper validation.

**Requirements:**
- Create private fields for accountNumber, accountHolder, and balance
- Implement constructor to initialize account with initial balance
- Create `deposit(double amount)` method with validation
- Implement `withdraw(double amount)` method returning boolean for success/failure
- Add `getBalance()` method to retrieve current balance
- Create `transfer(BankAccount targetAccount, double amount)` method
- Implement `displayInfo()` method showing formatted account details
- Test with multiple accounts and various transactions

**Sample Test Cases:**
```
Input: BankAccount("ACC001", "Alice", 1000.0), deposit(500), withdraw(200), transfer(acc2, 300)
Expected Output:
=== Account Information ===
Account Number: ACC001
Account Holder: Alice
Balance: $1000.00

Deposited: $500.0
Withdrawn: $200.0
Transferred $300.0 to Bob

=== Account Information ===
Account Number: ACC001
Account Holder: Alice
Balance: $1000.00

=== Account Information ===
Account Number: ACC002
Account Holder: Bob
Balance: $800.00
```

**Solution:**
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

**💡 Tips:**
- Use private fields with public methods for encapsulation
- Validate amounts before modifying balance (positive values only)
- Return boolean from withdraw/transfer to indicate success/failure
- transfer() method reuses withdraw() for validation
- Use String.format("%.2f") for consistent currency formatting
- Constructor parameter validation ensures valid initial state

---

### Exercise 8: Calculator with All Operations

**📝 Problem Statement:**
Create an AdvancedCalculator class demonstrating comprehensive method overloading with multiple arithmetic operations. The class should support integer and double operations, varargs for adding multiple numbers, and proper division-by-zero handling.

**Requirements:**
- Implement overloaded `add()` methods for int, double, and varargs
- Create overloaded `subtract()` methods for int and double
- Implement overloaded `multiply()` methods for int and double
- Create overloaded `divide()` methods with zero-division checking
- Add `modulus()` method for integer division remainder
- Provide `displayMenu()` method showing available operations
- Test all overloaded method variants

**Sample Test Cases:**
```
Input: add(10, 20) [int]
Expected Output: 30

Input: add(10.5, 20.3) [double]
Expected Output: 30.8

Input: add(1, 2, 3, 4, 5) [varargs]
Expected Output: 15

Input: divide(10, 3) [int to double]
Expected Output: 3.333...

Input: divide(10, 0)
Expected Output:
Error: Division by zero
0.0
```

**Solution:**
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

**💡 Tips:**
- Method overloading enables same method name with different parameter types
- Varargs (int... numbers) must be last parameter
- Cast to double in division to get decimal results: (double) a / b
- Always validate divisor is not zero before division
- Overloaded methods provide flexibility for different data types
- Integer division truncates decimal; use double for precise results

---

### Exercise 9: Recursive Array Operations

**📝 Problem Statement:**
Create a RecursiveArray class implementing recursive algorithms for array operations. The class should calculate sum, find maximum and minimum values, and check if an array is sorted, all using recursion instead of iterative loops.

**Requirements:**
- Implement recursive `sum(int[] arr, int index)` method to calculate array sum
- Create recursive `findMax(int[] arr, int index)` method for maximum value
- Implement recursive `findMin(int[] arr, int index)` method for minimum value
- Add recursive `isSorted(int[] arr, int index)` method to check sorting
- Use proper base cases for recursion termination
- Provide `analyzeArray()` method for comprehensive analysis
- Test with sorted and unsorted arrays

**Sample Test Cases:**
```
Input: analyzeArray([5, 2, 8, 1, 9])
Expected Output:
=== Array Analysis ===
Array: 5 2 8 1 9
Sum: 25
Maximum: 9
Minimum: 1
Is Sorted: false

Input: analyzeArray([1, 2, 3, 4, 5])
Expected Output:
=== Array Analysis ===
Array: 1 2 3 4 5
Sum: 15
Maximum: 5
Minimum: 1
Is Sorted: true
```

**Solution:**
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

**💡 Tips:**
- Base case for array recursion: index reaches array length
- Pass index parameter to track current position in recursion
- Sum: add current element to sum of rest
- Max/Min: compare current element with max/min of rest using Math.max/min
- isSorted: check if current element ≤ next element, recurse on rest
- Start recursion with index 0: sum(arr, 0)

---

### Exercise 10: Method Chaining with Student

**📝 Problem Statement:**
Create a Student class implementing the builder/fluent interface pattern through method chaining. Each setter method should return `this` to enable chaining multiple method calls in a single statement, providing an elegant and readable way to construct objects.

**Requirements:**
- Create private fields for name, rollNumber, course, gpa, email
- Constructor accepts only name (required field)
- Implement setter methods that return `this` for chaining
- Add validation in setGPA() method (0.0-4.0 range)
- Provide getter methods for all fields
- Create `display()` method showing all student information
- Implement `getFormattedInfo()` for one-line summary
- Test method chaining with multiple students

**Sample Test Cases:**
```
Input: new Student("Alice Johnson").setRollNumber(101).setCourse("Computer Science").setGPA(3.8).setEmail("alice@university.edu")
Expected Output:
=== Student Information ===
Name: Alice Johnson
Roll Number: 101
Course: Computer Science
GPA: 3.8
Email: alice@university.edu

Input: getFormattedInfo()
Expected Output:
Alice Johnson (Roll: 101) - Computer Science - GPA: 3.80
```

**Solution:**
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

**💡 Tips:**
- Builder pattern provides fluent, readable object construction
- Return `this` from setter methods to enable chaining
- Method chaining: `object.method1().method2().method3()`
- Constructor takes only required fields (name in this case)
- Optional fields are set through chained method calls
- Makes object creation more expressive and flexible

---

### Exercise 11: Prime Number Checker (Bonus)

**📝 Problem Statement:**
Create a PrimeChecker class that implements various methods for working with prime numbers. The class should check if a number is prime, find all primes up to a given number, count primes, and find the nth prime number using efficient algorithms.

**Requirements:**
- Implement `isPrime(int number)` method to check if a number is prime
- Create `printPrimes(int n)` method to display all prime numbers up to n
- Implement `countPrimes(int n)` method to count total primes up to n
- Add `nthPrime(int n)` method to find the nth prime number
- Use optimized algorithm: check divisibility only up to √n
- Check only odd numbers after 2 (even numbers > 2 are not prime)
- Provide comprehensive test cases demonstrating all methods

**Sample Test Cases:**
```
Input: isPrime(17), isPrime(20)
Expected Output:
Is 17 prime? true
Is 20 prime? false

Input: printPrimes(50)
Expected Output:
Prime numbers up to 50: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47

Input: countPrimes(100)
Expected Output:
Count of primes up to 100: 25

Input: nthPrime(10), nthPrime(25)
Expected Output:
10th prime number: 29
25th prime number: 97
```

**Solution:**
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

**💡 Tips:**
- Prime number: only divisible by 1 and itself
- Optimization: check divisibility only up to √n (if no divisor found by √n, none exists)
- Skip even numbers after 2 (all even numbers > 2 are composite)
- Use Math.sqrt(number) for square root calculation
- Early return for special cases: numbers ≤ 1 are not prime, 2 is prime
- isPrime() method is reused in other methods (DRY principle)

---

### Exercise 12: GCD and LCM Calculator (Bonus)

**📝 Problem Statement:**
Create a GCDLCMCalculator class that implements recursive methods for calculating Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of numbers. Use the Euclidean algorithm for GCD and leverage it to calculate LCM. Extend functionality to handle multiple numbers using varargs.

**Requirements:**
- Implement recursive `gcd(int a, int b)` method using Euclidean algorithm
- Create `lcm(int a, int b)` method that uses GCD formula: LCM = (a × b) / GCD
- Implement `gcdMultiple(int... numbers)` to find GCD of multiple numbers using varargs
- Create `lcmMultiple(int... numbers)` to find LCM of multiple numbers
- Provide `displayCalculations()` method showing both GCD and LCM for two numbers
- Test with various number pairs including coprime numbers (GCD = 1)
- Demonstrate varargs usage with 3+ numbers

**Sample Test Cases:**
```
Input: displayCalculations(12, 18)
Expected Output:
=== GCD and LCM ===
Numbers: 12 and 18
GCD: 6
LCM: 36

Input: displayCalculations(24, 36)
Expected Output:
=== GCD and LCM ===
Numbers: 24 and 36
GCD: 12
LCM: 72

Input: displayCalculations(7, 13) - coprime numbers
Expected Output:
=== GCD and LCM ===
Numbers: 7 and 13
GCD: 1
LCM: 91

Input: gcdMultiple(12, 18, 24)
Expected Output:
GCD of 12, 18, 24: 6

Input: lcmMultiple(4, 6, 8)
Expected Output:
LCM of 4, 6, 8: 24
```

**Solution:**
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

**💡 Tips:**
- GCD (Greatest Common Divisor): largest number that divides both numbers
- LCM (Least Common Multiple): smallest number divisible by both numbers
- Euclidean algorithm: gcd(a, b) = gcd(b, a % b) until b = 0
- Relationship: LCM(a, b) = (a × b) / GCD(a, b)
- Recursive base case: when b = 0, GCD is a
- For multiple numbers: apply GCD/LCM pairwise iteratively
- Coprime numbers (GCD = 1): LCM equals their product

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

### 1. Method Declaration and Syntax Errors

#### ❌ Wrong - Missing Return Statement in Non-Void Method:
```java
// WRONG
public class Calculator {
    public int add(int a, int b) {
        int sum = a + b;
        // Compilation error! Missing return statement
    }
}
```
**Issue:** Non-void method must return a value of the declared type

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {
        int sum = a + b;
        return sum;  // Must return int value
    }
}
```

**Why:** Methods with non-void return types must return a value matching that type.

**💡 Tip:** Every code path in a non-void method must have a return statement.

---

#### ❌ Wrong - Adding Return Type to Constructor-Like Method:
```java
// WRONG - This is NOT a constructor!
public class Student {
    String name;

    public void Student(String name) {  // This is a method, not constructor!
        this.name = name;
    }
}

Student s = new Student("Alice");  // Compilation error! No constructor
```
**Issue:** Adding return type (even void) makes it a regular method, not a constructor

#### ✅ Right:
```java
// CORRECT - Constructor has no return type
public class Student {
    String name;

    public Student(String name) {  // Constructor: no return type
        this.name = name;
    }
}

Student s = new Student("Alice");  // Works!
```

**Why:** Constructors must have no return type at all; any return type makes it a regular method.

**💡 Tip:** Constructor syntax: `ClassName()` with no return type, not even void.

---

#### ❌ Wrong - Missing Method Body Braces:
```java
// WRONG
public class Test {
    public void display();  // Compilation error! Missing body
}
```
**Issue:** Non-abstract methods must have a body with braces

#### ✅ Right:
```java
// CORRECT - Method 1: Empty body
public class Test {
    public void display() {
        // Empty but has braces
    }
}

// CORRECT - Method 2: With code
public class Test {
    public void display() {
        System.out.println("Hello");
    }
}
```

**Why:** Concrete methods need implementation; semicolon-only syntax is for abstract methods.

**💡 Tip:** Regular methods need `{ }` braces; abstract methods use `;` (covered later).

---

#### ❌ Wrong - Wrong Access Modifier Placement:
```java
// WRONG
public class Calculator {
    int public add(int a, int b) {  // Compilation error! Wrong order
        return a + b;
    }
}
```
**Issue:** Return type comes after access modifier, not before

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {  // Correct order: access, return, name
        return a + b;
    }
}
```

**Why:** Method syntax requires: access modifier → return type → method name → parameters.

**💡 Tip:** Order: `public int methodName(params)` not `int public methodName(params)`.

---

### 2. Return Type Mistakes

#### ❌ Wrong - Wrong Return Type Causing Data Loss:
```java
// WRONG
public class Calculator {
    public int divide(int a, int b) {
        return a / b;  // Integer division loses decimals!
    }
}

Calculator calc = new Calculator();
System.out.println(calc.divide(10, 3));  // Prints 3, not 3.333...
```
**Issue:** int return type causes truncation of decimal values

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public double divide(int a, int b) {
        return (double) a / b;  // Cast to double for precision
    }
}

Calculator calc = new Calculator();
System.out.println(calc.divide(10, 3));  // Prints 3.333...
```

**Why:** Use double return type when result needs decimal precision.

**💡 Tip:** For division with decimals, return double and cast at least one operand.

---

#### ❌ Wrong - Returning Value from Void Method:
```java
// WRONG
public class Display {
    public void showMessage() {
        return "Hello";  // Compilation error! void can't return value
    }
}
```
**Issue:** void methods cannot return any value

#### ✅ Right:
```java
// CORRECT - Method 1: Change to String return type
public class Display {
    public String getMessage() {
        return "Hello";  // Now returns String
    }
}

// CORRECT - Method 2: Keep void, just print
public class Display {
    public void showMessage() {
        System.out.println("Hello");
        // No return needed (or use: return; with no value)
    }
}
```

**Why:** void means no return value; must match return type with what you return.

**💡 Tip:** Use void for actions (printing, modifying state), non-void for calculations.

---

#### ❌ Wrong - Unreachable Code After Return:
```java
// WRONG
public class Calculator {
    public int calculate(int a, int b) {
        return a + b;
        System.out.println("Done");  // Compilation error! Unreachable
    }
}
```
**Issue:** Code after return statement can never execute

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int calculate(int a, int b) {
        System.out.println("Calculating...");  // Before return
        return a + b;
    }
}
```

**Why:** return immediately exits method; any code after is unreachable.

**💡 Tip:** Place all logic before the return statement.

---

#### ❌ Wrong - Not All Code Paths Return Value:
```java
// WRONG
public class Grader {
    public char getGrade(int marks) {
        if (marks >= 90) {
            return 'A';
        } else if (marks >= 80) {
            return 'B';
        }
        // Compilation error! Missing return for marks < 80
    }
}
```
**Issue:** Some execution paths don't have return statements

#### ✅ Right:
```java
// CORRECT
public class Grader {
    public char getGrade(int marks) {
        if (marks >= 90) {
            return 'A';
        } else if (marks >= 80) {
            return 'B';
        } else if (marks >= 70) {
            return 'C';
        } else {
            return 'F';  // Default case ensures all paths return
        }
    }
}
```

**Why:** Every possible execution path must return a value for non-void methods.

**💡 Tip:** Add a final else or return after all conditions to ensure all paths covered.

---

#### ❌ Wrong - Returning Wrong Type:
```java
// WRONG
public class Converter {
    public int convertToInt(String str) {
        return str;  // Compilation error! String can't be returned as int
    }
}
```
**Issue:** Return type doesn't match declared type

#### ✅ Right:
```java
// CORRECT
public class Converter {
    public int convertToInt(String str) {
        return Integer.parseInt(str);  // Convert String to int
    }
}
```

**Why:** Return value must be assignable to the declared return type.

**💡 Tip:** Return type must match or be convertible to declared type.

---

### 3. Parameter Issues

#### ❌ Wrong - Wrong Number of Arguments in Method Call:
```java
// WRONG
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
int result = calc.add(10);  // Compilation error! Missing argument
```
**Issue:** Method expects 2 arguments, only 1 provided

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
int result = calc.add(10, 20);  // Both arguments provided
```

**Why:** Must provide exact number of arguments matching method signature.

**💡 Tip:** Check method signature for required parameters and their types.

---

#### ❌ Wrong - Wrong Parameter Types:
```java
// WRONG
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
int result = calc.add("10", "20");  // Compilation error! Wrong types
```
**Issue:** Passing String arguments to int parameters

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
int result = calc.add(10, 20);  // Correct: int arguments
```

**Why:** Argument types must match or be compatible with parameter types.

**💡 Tip:** Ensure argument types match method parameter types exactly.

---

#### ❌ Wrong - Expecting Primitive Parameters to Change:
```java
// WRONG (logic error)
public class Test {
    public void increment(int number) {
        number++;  // Only modifies local copy!
    }

    public static void main(String[] args) {
        int value = 5;
        Test t = new Test();
        t.increment(value);
        System.out.println(value);  // Still 5! Not 6
    }
}
```
**Issue:** Modifying primitive parameter doesn't affect original variable

#### ✅ Right:
```java
// CORRECT - Return new value
public class Test {
    public int increment(int number) {
        return number + 1;  // Return modified value
    }

    public static void main(String[] args) {
        int value = 5;
        Test t = new Test();
        value = t.increment(value);  // Assign returned value
        System.out.println(value);  // Now 6
    }
}
```

**Why:** Java is pass-by-value; primitive parameters are copies, not references.

**💡 Tip:** For primitives, return new value instead of expecting parameter to change.

---

#### ❌ Wrong - Expecting Object Reference Reassignment to Affect Original:
```java
// WRONG (logic error)
public class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}

public class Test {
    public void changeReference(Person p) {
        p = new Person("New Person");  // Only changes local reference!
    }

    public static void main(String[] args) {
        Person person = new Person("Alice");
        Test t = new Test();
        t.changeReference(person);
        System.out.println(person.name);  // Still "Alice", not "New Person"
    }
}
```
**Issue:** Reassigning parameter reference doesn't affect original reference

#### ✅ Right:
```java
// CORRECT - Modify object properties
public class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}

public class Test {
    public void changeName(Person p) {
        p.name = "New Name";  // Modifies object through reference
    }

    public static void main(String[] args) {
        Person person = new Person("Alice");
        Test t = new Test();
        t.changeName(person);
        System.out.println(person.name);  // Now "New Name"
    }
}
```

**Why:** Reference is passed by value; reassigning parameter doesn't affect original reference.

**💡 Tip:** Modify object properties (works), not reassign reference (doesn't work).

---

#### ❌ Wrong - Parameter Shadowing Without Understanding:
```java
// WRONG (confusing)
public class Calculator {
    int result = 100;  // Instance variable

    public void calculate(int result) {  // Parameter shadows instance variable
        result = result + 10;  // Which result? Parameter, not instance!
        System.out.println(result);  // Prints parameter value
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        calc.calculate(5);  // Prints 15
        System.out.println(calc.result);  // Still 100! Instance variable unchanged
    }
}
```
**Issue:** Parameter name shadows instance variable, causing confusion

#### ✅ Right:
```java
// CORRECT - Use different names or 'this'
public class Calculator {
    int result = 100;

    public void calculate(int value) {  // Different parameter name
        this.result = this.result + value;  // Clear: instance variable
        System.out.println(this.result);
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        calc.calculate(5);  // Prints 105
        System.out.println(calc.result);  // 105 - instance variable modified
    }
}
```

**Why:** When parameter and field have same name, parameter takes precedence; use this to access field.

**💡 Tip:** Use different parameter names or this.fieldName to avoid shadowing confusion.

---

### 4. Method Overloading Errors

#### ❌ Wrong - Overloading by Return Type Only:
```java
// WRONG
public class Calculator {
    public int calculate(int a, int b) {
        return a + b;
    }

    // Compilation error! Cannot overload by return type alone
    public double calculate(int a, int b) {
        return a + b;
    }
}
```
**Issue:** Methods cannot be overloaded based solely on return type

#### ✅ Right:
```java
// CORRECT - Different parameter types
public class Calculator {
    public int calculate(int a, int b) {
        return a + b;
    }

    public double calculate(double a, double b) {  // Different parameter types
        return a + b;
    }
}
```

**Why:** Method signature includes name and parameters, not return type.

**💡 Tip:** Overload by changing number, type, or order of parameters, not return type.

---

#### ❌ Wrong - Duplicate Method Signatures:
```java
// WRONG
public class Display {
    public void show(int value) {
        System.out.println("First: " + value);
    }

    // Compilation error! Duplicate method
    public void show(int number) {  // Same signature!
        System.out.println("Second: " + number);
    }
}
```
**Issue:** Parameter names don't matter; both methods have same signature (int)

#### ✅ Right:
```java
// CORRECT - Different parameter types or count
public class Display {
    public void show(int value) {
        System.out.println("Integer: " + value);
    }

    public void show(double number) {  // Different type
        System.out.println("Double: " + number);
    }

    public void show(int a, int b) {  // Different count
        System.out.println("Two integers: " + a + ", " + b);
    }
}
```

**Why:** Method signature is method name + parameter types (names don't matter).

**💡 Tip:** Parameter names don't distinguish methods; only types, order, and count matter.

---

#### ❌ Wrong - Ambiguous Method Calls with Autoboxing:
```java
// WRONG (ambiguous)
public class Printer {
    public void print(int value) {
        System.out.println("int: " + value);
    }

    public void print(Integer value) {  // Wrapper type
        System.out.println("Integer: " + value);
    }
}

Printer p = new Printer();
p.print(10);  // Which method? Ambiguous with autoboxing!
```
**Issue:** Autoboxing creates ambiguity between primitive and wrapper overloads

#### ✅ Right:
```java
// CORRECT - Use clearly different types
public class Printer {
    public void print(int value) {
        System.out.println("int: " + value);
    }

    public void print(String value) {  // Clearly different type
        System.out.println("String: " + value);
    }
}

Printer p = new Printer();
p.print(10);      // Calls int version
p.print("Hello"); // Calls String version
```

**Why:** Avoid primitive/wrapper pairs to prevent autoboxing ambiguity.

**💡 Tip:** Design overloads with clearly distinct parameter types.

---

#### ❌ Wrong - Confusing Method Overloading with Overriding:
```java
// WRONG (conceptual confusion)
// Student thinks overloading and overriding are the same thing

// Overloading: SAME CLASS, DIFFERENT PARAMETERS
public class Calculator {
    public int add(int a, int b) { return a + b; }
    public double add(double a, double b) { return a + b; }
}

// Overriding: DIFFERENT CLASSES (inheritance), SAME SIGNATURE
// Will be covered in Day 12-13
```
**Issue:** Mixing up overloading (compile-time) with overriding (runtime)

#### ✅ Right:
```java
// CORRECT Understanding:

// Overloading: Same class, different signatures
public class MathOps {
    public int max(int a, int b) {
        return a > b ? a : b;
    }

    public double max(double a, double b) {  // Overloading
        return a > b ? a : b;
    }
}

// Note: Overriding is covered in inheritance lessons
```

**Why:** Overloading = same class, different parameters; Overriding = subclass, same signature.

**💡 Tip:** Overloading is within one class with different parameters.

---

#### ❌ Wrong - Order of Parameters Not Creating Valid Overload:
```java
// WRONG (might not work as expected)
public class Display {
    public void show(int a, int b) {
        System.out.println("Version 1: " + a + ", " + b);
    }

    public void show(int b, int a) {  // Same signature! Not overloaded!
        System.out.println("Version 2: " + b + ", " + a);
    }
}
```
**Issue:** Same types in same order = same signature, even with different names

#### ✅ Right:
```java
// CORRECT - Different types in different order
public class Display {
    public void show(int num, String text) {
        System.out.println("int, String: " + num + ", " + text);
    }

    public void show(String text, int num) {  // Different order of TYPES
        System.out.println("String, int: " + text + ", " + num);
    }
}

Display d = new Display();
d.show(10, "Hello");    // Calls first method
d.show("Hello", 10);    // Calls second method
```

**Why:** Signature is based on parameter types and order, not parameter names.

**💡 Tip:** Different order of TYPES (not names) creates valid overload.

---

#### ❌ Wrong - Overloading with Too Similar Types:
```java
// WRONG (confusing for users)
public class NumberProcessor {
    public void process(int value) {
        System.out.println("int: " + value);
    }

    public void process(long value) {
        System.out.println("long: " + value);
    }
}

NumberProcessor np = new NumberProcessor();
np.process(10);   // Calls int version
np.process(10L);  // Calls long version - easy to confuse!
```
**Issue:** Very similar types make method calls confusing

#### ✅ Right:
```java
// CORRECT - Use clearly different types or names
public class NumberProcessor {
    public void processInteger(int value) {  // Clear naming
        System.out.println("int: " + value);
    }

    public void processLong(long value) {  // Clear naming
        System.out.println("long: " + value);
    }
}

NumberProcessor np = new NumberProcessor();
np.processInteger(10);
np.processLong(10L);
```

**Why:** Similar types in overloads can confuse users; clear names help.

**💡 Tip:** For subtle type differences, use descriptive method names instead.

---

### 5. Varargs Mistakes

#### ❌ Wrong - Varargs Not as Last Parameter:
```java
// WRONG
public class Formatter {
    public String format(String... words, String separator) {
        // Compilation error! varargs must be last
        return String.join(separator, words);
    }
}
```
**Issue:** Varargs parameter must be the last parameter

#### ✅ Right:
```java
// CORRECT
public class Formatter {
    public String format(String separator, String... words) {
        return String.join(separator, words);
    }
}

Formatter f = new Formatter();
String result = f.format(", ", "Apple", "Banana", "Cherry");
```

**Why:** Varargs creates ambiguity if not last; compiler can't determine where varargs ends.

**💡 Tip:** Varargs syntax: `type... name` must always be the last parameter.

---

#### ❌ Wrong - Multiple Varargs Parameters:
```java
// WRONG
public class Combiner {
    public void combine(int... numbers, String... words) {
        // Compilation error! Only one varargs allowed
    }
}
```
**Issue:** Only one varargs parameter allowed per method

#### ✅ Right:
```java
// CORRECT - Use array for additional variable-length parameters
public class Combiner {
    public void combine(int[] numbers, String... words) {
        // OR pass array explicitly for both
    }

    // OR separate methods
    public void combineNumbers(int... numbers) {
        // Process numbers
    }

    public void combineWords(String... words) {
        // Process words
    }
}
```

**Why:** Multiple varargs would create ambiguity in determining which values belong to which parameter.

**💡 Tip:** Only one varargs per method; use arrays for additional variable-length parameters.

---

#### ❌ Wrong - Not Checking Varargs Length Before Access:
```java
// WRONG
public class ArrayOps {
    public int getFirst(int... numbers) {
        return numbers[0];  // ArrayIndexOutOfBoundsException if empty!
    }
}

ArrayOps ops = new ArrayOps();
int first = ops.getFirst();  // Crashes! No elements passed
```
**Issue:** Varargs can be empty; accessing without checking causes error

#### ✅ Right:
```java
// CORRECT
public class ArrayOps {
    public int getFirst(int... numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("At least one number required");
        }
        return numbers[0];
    }
}

ArrayOps ops = new ArrayOps();
try {
    int first = ops.getFirst();  // Throws descriptive exception
} catch (IllegalArgumentException e) {
    System.out.println(e.getMessage());
}
```

**Why:** Varargs can be empty array; always validate length before accessing elements.

**💡 Tip:** Check `varargs.length` before accessing elements; provide clear error messages.

---

#### ❌ Wrong - Ambiguous Varargs Method Calls:
```java
// WRONG (ambiguous)
public class Printer {
    public void print(String... messages) {
        for (String msg : messages) {
            System.out.println(msg);
        }
    }

    public void print(String message, String... more) {
        System.out.println("First: " + message);
        for (String msg : more) {
            System.out.println(msg);
        }
    }
}

Printer p = new Printer();
p.print("Hello");  // Ambiguous! Which method?
```
**Issue:** Compiler can't determine which overloaded varargs method to call

#### ✅ Right:
```java
// CORRECT - Avoid ambiguous varargs overloads
public class Printer {
    public void printAll(String... messages) {
        for (String msg : messages) {
            System.out.println(msg);
        }
    }

    public void printWithHeader(String header, String... messages) {
        System.out.println("Header: " + header);
        for (String msg : messages) {
            System.out.println(msg);
        }
    }
}

Printer p = new Printer();
p.printAll("Hello", "World");
p.printWithHeader("Messages:", "Hello", "World");
```

**Why:** Ambiguous varargs overloads confuse compiler; use distinct method names or parameters.

**💡 Tip:** Avoid overloading with similar varargs signatures; use different method names.

---

#### ❌ Wrong - Passing null to Varargs:
```java
// WRONG (ambiguous)
public class Test {
    public void process(String... items) {
        System.out.println("String varargs");
    }

    public void process(Integer... items) {
        System.out.println("Integer varargs");
    }
}

Test t = new Test();
t.process(null);  // Compilation error! Ambiguous
```
**Issue:** null matches both String[] and Integer[], creating ambiguity

#### ✅ Right:
```java
// CORRECT - Explicit type casting
public class Test {
    public void process(String... items) {
        System.out.println("String varargs");
    }

    public void process(Integer... items) {
        System.out.println("Integer varargs");
    }
}

Test t = new Test();
t.process((String[])null);   // Explicitly cast to resolve ambiguity
t.process((Integer[])null);  // OR pass empty array
t.process(new String[0]);    // Empty array
```

**Why:** null literal matches any reference type array; explicit cast removes ambiguity.

**💡 Tip:** Cast null to specific array type or pass empty array instead.

---

### 6. Recursion Problems

#### ❌ Wrong - Missing Base Case (Infinite Recursion):
```java
// WRONG
public class Factorial {
    public int factorial(int n) {
        return n * factorial(n - 1);  // No base case! Infinite recursion!
    }
}

Factorial f = new Factorial();
int result = f.factorial(5);  // StackOverflowError!
```
**Issue:** No base case to stop recursion; runs forever until stack overflows

#### ✅ Right:
```java
// CORRECT
public class Factorial {
    public int factorial(int n) {
        // Base case
        if (n == 0 || n == 1) {
            return 1;
        }
        // Recursive case
        return n * factorial(n - 1);
    }
}

Factorial f = new Factorial();
int result = f.factorial(5);  // Returns 120
```

**Why:** Every recursive method needs a base case to stop recursion.

**💡 Tip:** Always define base case first; it's the exit condition for recursion.

---

#### ❌ Wrong - Base Case Never Reached:
```java
// WRONG
public class Counter {
    public int countdown(int n) {
        if (n == 0) {  // Base case
            return 0;
        }
        return countdown(n + 1);  // Incrementing! Never reaches 0
    }
}

Counter c = new Counter();
int result = c.countdown(5);  // StackOverflowError!
```
**Issue:** Recursive call moves away from base case instead of toward it

#### ✅ Right:
```java
// CORRECT
public class Counter {
    public int countdown(int n) {
        if (n == 0) {
            return 0;
        }
        System.out.println(n);
        return countdown(n - 1);  // Decrementing toward base case
    }
}

Counter c = new Counter();
int result = c.countdown(5);  // Prints 5, 4, 3, 2, 1
```

**Why:** Recursive calls must progress toward the base case.

**💡 Tip:** Ensure recursive parameter changes move toward base case condition.

---

#### ❌ Wrong - Not Handling Negative Input in Recursion:
```java
// WRONG
public class Factorial {
    public int factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
}

Factorial f = new Factorial();
int result = f.factorial(-5);  // StackOverflowError! Never reaches base
```
**Issue:** Negative input never reaches base case (0 or 1)

#### ✅ Right:
```java
// CORRECT - Validate input
public class Factorial {
    public int factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Factorial not defined for negative numbers");
        }
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
}

Factorial f = new Factorial();
int result = f.factorial(5);  // Works: 120
// f.factorial(-5);  // Throws exception with clear message
```

**Why:** Validate inputs to ensure they can reach base case.

**💡 Tip:** Add input validation before recursive logic to catch invalid values.

---

#### ❌ Wrong - Stack Overflow from Deep Recursion:
```java
// WRONG (inefficient)
public class Fibonacci {
    public int fibonacci(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

Fibonacci fib = new Fibonacci();
int result = fib.fibonacci(50);  // Extremely slow! May cause stack overflow
```
**Issue:** Deep recursion without optimization causes exponential time and stack overflow

#### ✅ Right:
```java
// CORRECT - Use iteration or memoization
public class Fibonacci {
    // Iterative approach (more efficient)
    public int fibonacci(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;

        int prev = 0, curr = 1;
        for (int i = 2; i <= n; i++) {
            int next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }
}

Fibonacci fib = new Fibonacci();
int result = fib.fibonacci(50);  // Fast!
```

**Why:** Some recursive problems need iterative or memoized solutions for efficiency.

**💡 Tip:** Consider iteration or memoization for problems with deep recursion.

---

#### ❌ Wrong - Not Returning Recursive Call Result:
```java
// WRONG
public class StringReverse {
    public String reverse(String str) {
        if (str.isEmpty()) {
            return str;
        }
        reverse(str.substring(1));  // Not returning result!
        return str.charAt(0) + "";  // Wrong logic
    }
}
```
**Issue:** Not capturing and returning the result of recursive call

#### ✅ Right:
```java
// CORRECT
public class StringReverse {
    public String reverse(String str) {
        if (str.isEmpty()) {
            return str;
        }
        return reverse(str.substring(1)) + str.charAt(0);  // Return recursive result
    }
}

StringReverse sr = new StringReverse();
String result = sr.reverse("Hello");  // Returns "olleH"
```

**Why:** Must return the result of recursive call to build up final result.

**💡 Tip:** Always return the recursive call result (unless void method).

---

### 7. Method Invocation Errors

#### ❌ Wrong - Calling Non-Static Method from Static Context:
```java
// WRONG
public class Test {
    public void instanceMethod() {
        System.out.println("Instance method");
    }

    public static void main(String[] args) {
        instanceMethod();  // Compilation error! Can't call from static
    }
}
```
**Issue:** Static methods cannot directly call instance methods

#### ✅ Right:
```java
// CORRECT
public class Test {
    public void instanceMethod() {
        System.out.println("Instance method");
    }

    public static void main(String[] args) {
        Test obj = new Test();  // Create instance
        obj.instanceMethod();   // Call through instance
    }
}
```

**Why:** Instance methods belong to objects; static context has no implicit object.

**💡 Tip:** Create object instance to call non-static methods from static context.

---

#### ❌ Wrong - Calling Method Without Object:
```java
// WRONG
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        int result = Calculator.add(10, 20);  // Compilation error! add is not static
    }
}
```
**Issue:** Non-static methods require an object instance

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();  // Create object
        int result = calc.add(10, 20);       // Call through object
        System.out.println(result);
    }
}
```

**Why:** Instance methods need an object; they operate on object state.

**💡 Tip:** Instance methods: create object first. Static methods: call on class.

---

#### ❌ Wrong - Ignoring Return Value When Needed:
```java
// WRONG (logic error)
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
calc.add(10, 20);  // Return value ignored! Result lost
System.out.println("Result: ???");  // Can't access result
```
**Issue:** Method returns value but it's not captured

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();
int result = calc.add(10, 20);  // Capture return value
System.out.println("Result: " + result);  // Use it
```

**Why:** Return values contain the method's result; must capture if needed.

**💡 Tip:** Assign return values to variables if you need to use the result.

---

#### ❌ Wrong - Wrong Method Call Syntax:
```java
// WRONG
public class Test {
    public void display() {
        System.out.println("Hello");
    }
}

Test obj = new Test();
obj.display;  // Compilation error! Missing parentheses
```
**Issue:** Missing parentheses in method call

#### ✅ Right:
```java
// CORRECT
public class Test {
    public void display() {
        System.out.println("Hello");
    }
}

Test obj = new Test();
obj.display();  // Parentheses required even for no parameters
```

**Why:** Parentheses are required for all method calls, even with no arguments.

**💡 Tip:** Always use `()` for method calls, even if no parameters.

---

### 8. Pass-by-Value Confusion

#### ❌ Wrong - Thinking Java is Pass-by-Reference:
```java
// WRONG (conceptual)
public class Swapper {
    public void swap(int a, int b) {
        int temp = a;
        a = b;
        b = temp;
        System.out.println("Inside: a=" + a + ", b=" + b);
    }
}

int x = 10, y = 20;
Swapper s = new Swapper();
s.swap(x, y);  // Inside: a=20, b=10
System.out.println("Outside: x=" + x + ", y=" + y);  // Outside: x=10, y=20 (unchanged!)
```
**Issue:** Expecting primitive parameters to swap; Java is pass-by-value for primitives

#### ✅ Right:
```java
// CORRECT - Use return value or object wrapper
public class Swapper {
    // Method 1: Return array with swapped values
    public int[] swap(int a, int b) {
        return new int[]{b, a};
    }

    // Method 2: Use object wrapper
    public void swap(int[] arr) {
        if (arr.length >= 2) {
            int temp = arr[0];
            arr[0] = arr[1];
            arr[1] = temp;
        }
    }
}

Swapper s = new Swapper();
int[] result = s.swap(10, 20);
System.out.println("x=" + result[0] + ", y=" + result[1]);  // x=20, y=10
```

**Why:** Java is strictly pass-by-value; primitive parameters are copies.

**💡 Tip:** For "swap" effect, return new values or use array/object wrapper.

---

#### ❌ Wrong - Misunderstanding Object Parameter Behavior:
```java
// WRONG (conceptual)
public class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}

public class Test {
    public void rename(Person p) {
        p.name = "Modified";  // This DOES modify original object
    }

    public void replace(Person p) {
        p = new Person("New Person");  // This does NOT affect original
    }
}

Person person = new Person("Alice");
Test t = new Test();
t.rename(person);
System.out.println(person.name);  // "Modified" - changed!

t.replace(person);
System.out.println(person.name);  // Still "Modified" - NOT "New Person"
```
**Issue:** Confusing modification (works) with reassignment (doesn't work)

#### ✅ Right:
```java
// CORRECT Understanding:
public class Person {
    String name;
    Person(String name) { this.name = name; }
}

public class Test {
    // Modifying object properties WORKS (reference copied, not object)
    public void modify(Person p) {
        p.name = "Modified";  // Modifies original object
    }

    // Reassigning parameter reference does NOT affect original
    public void reassign(Person p) {
        p = new Person("New");  // Only changes local reference
    }

    // To change reference, return new object
    public Person create(String name) {
        return new Person(name);
    }
}
```

**Why:** Reference value is copied; can modify object through it, but can't change original reference.

**💡 Tip:** Object properties can be modified; object reference reassignment doesn't work.

---

### 9. Method Naming and Convention Issues

#### ❌ Wrong - Not Following camelCase Convention:
```java
// WRONG
public class Student {
    public void DisplayInfo() { }       // PascalCase (wrong for methods)
    public void display_info() { }      // snake_case (wrong)
    public void DISPLAYINFO() { }       // ALL_CAPS (wrong)
}
```
**Issue:** Not following Java method naming conventions

#### ✅ Right:
```java
// CORRECT
public class Student {
    public void displayInfo() { }       // camelCase (correct)
    public void calculateGrade() { }    // camelCase
    public void setStudentName() { }    // camelCase
}
```

**Why:** Java convention is camelCase for methods: start lowercase, capitalize subsequent words.

**💡 Tip:** Methods: camelCase, Classes: PascalCase, Constants: UPPER_CASE.

---

#### ❌ Wrong - Non-Descriptive Method Names:
```java
// WRONG
public class Calculator {
    public int calc(int a, int b) { return a + b; }
    public void doIt() { }
    public int x(int n) { return n * 2; }
}
```
**Issue:** Method names don't describe what they do

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int calculateSum(int a, int b) { return a + b; }
    public void displayResults() { }
    public int doubleValue(int number) { return number * 2; }
}
```

**Why:** Descriptive names make code self-documenting and easier to understand.

**💡 Tip:** Method names should clearly describe the action: verb + noun pattern.

---

#### ❌ Wrong - Method Name Starting with Capital Letter:
```java
// WRONG
public class Test {
    public void DisplayMessage() {  // Looks like class name!
        System.out.println("Hello");
    }
}
```
**Issue:** Method name follows class naming convention (PascalCase)

#### ✅ Right:
```java
// CORRECT
public class Test {
    public void displayMessage() {  // Starts with lowercase
        System.out.println("Hello");
    }
}
```

**Why:** Methods start with lowercase to distinguish from classes.

**💡 Tip:** Classes: PascalCase (Capital first), Methods: camelCase (lowercase first).

---

### 10. Visibility and Access Issues

#### ❌ Wrong - Trying to Access Private Methods from Outside:
```java
// WRONG
public class Calculator {
    private int add(int a, int b) {  // Private method
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int result = calc.add(10, 20);  // Compilation error! add is private
    }
}
```
**Issue:** Private methods cannot be accessed from outside the class

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {  // Public method
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int result = calc.add(10, 20);  // Works!
    }
}
```

**Why:** Private members are only accessible within the same class.

**💡 Tip:** Use public for methods you want accessible from outside the class.

---

#### ❌ Wrong - Making Everything Static:
```java
// WRONG
public class Student {
    static String name;     // All students share one name!
    static int rollNumber;  // All students share one roll number!

    static void setName(String n) {
        name = n;
    }

    static void display() {
        System.out.println(name + " - " + rollNumber);
    }
}

Student.setName("Alice");
Student s1 = new Student();
Student s2 = new Student();
// Both s1 and s2 have the same name "Alice"!
```
**Issue:** Making instance data static shares it across all instances

#### ✅ Right:
```java
// CORRECT
public class Student {
    String name;            // Instance variable (each student has own)
    int rollNumber;         // Instance variable

    void setName(String n) {  // Instance method
        this.name = n;
    }

    void display() {
        System.out.println(name + " - " + rollNumber);
    }
}

Student s1 = new Student();
s1.setName("Alice");
Student s2 = new Student();
s2.setName("Bob");
// s1 and s2 have different names
```

**Why:** Instance members belong to each object; static members are shared across all instances.

**💡 Tip:** Use instance variables/methods for object-specific data; static for shared data.

---

#### ❌ Wrong - Calling Instance Method on Class:
```java
// WRONG
public class Calculator {
    public int add(int a, int b) {  // Instance method
        return a + b;
    }
}

int result = Calculator.add(10, 20);  // Compilation error!
```
**Issue:** Trying to call instance method without creating object

#### ✅ Right:
```java
// CORRECT
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}

Calculator calc = new Calculator();  // Create object
int result = calc.add(10, 20);       // Call on object
```

**Why:** Instance methods need an object; they may access instance variables.

**💡 Tip:** ClassName.method() for static; object.method() for instance.

---

This comprehensive list now contains **40+ Method and Method Overloading mistakes** covering all fundamental concepts!

---

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