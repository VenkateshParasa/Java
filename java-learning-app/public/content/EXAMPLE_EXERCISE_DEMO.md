# Exercise Demo - Simple Calculator

This file demonstrates the new exercise format with collapsible solutions.

---

## Traditional Exercise (Old Format)

### Exercise 1: Hello World

Write a simple program that prints "Hello, World!" to the console.

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

---

## New Interactive Exercise Format

```exercise
title: Exercise 2: Simple Calculator
description: Create a Java program that performs basic arithmetic operations (addition, subtraction, multiplication, division, and modulus) on two numbers entered by the user. The program should display the results of all five operations.
requirements:
- Accept two numbers as input from the user using Scanner
- Perform all five arithmetic operations: +, -, *, /, %
- Display results for each operation with proper labels
- Handle division by zero appropriately
- Close the Scanner resource after use
testcases:
- input: "num1 = 10, num2 = 3"
  output: "Addition: 13\nSubtraction: 7\nMultiplication: 30\nDivision: 3.33\nModulus: 1"
- input: "num1 = 20, num2 = 4"
  output: "Addition: 24\nSubtraction: 16\nMultiplication: 80\nDivision: 5.0\nModulus: 0"
- input: "num1 = 15, num2 = 0"
  output: "Addition: 15\nSubtraction: 15\nMultiplication: 0\nDivision: Error\nModulus: Error"
hints:
- Import java.util.Scanner at the beginning of your program
- Use Scanner's nextDouble() method to read decimal numbers
- Remember to check if the second number is zero before division
- Use System.out.println() to display results
solution:
```java
import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        System.out.println("\nResults:");
        System.out.println("Addition: " + (num1 + num2));
        System.out.println("Subtraction: " + (num1 - num2));
        System.out.println("Multiplication: " + (num1 * num2));
        
        if (num2 != 0) {
            System.out.println("Division: " + (num1 / num2));
            System.out.println("Modulus: " + (num1 % num2));
        } else {
            System.out.println("Division: Error - Cannot divide by zero");
            System.out.println("Modulus: Error - Cannot divide by zero");
        }
        
        scanner.close();
    }
}
```
```

---

## Another Example: Temperature Converter

```exercise
title: Exercise 3: Temperature Converter
description: Create a program that converts temperatures between Celsius and Fahrenheit. The program should display a menu, accept the user's choice, and perform the appropriate conversion.
requirements:
- Display a menu with two options: 1) Celsius to Fahrenheit, 2) Fahrenheit to Celsius
- Accept user's choice (1 or 2)
- Accept the temperature value to convert
- Perform the conversion using the correct formula
- Display the result with 2 decimal places
- Handle invalid menu choices gracefully
testcases:
- input: "Choice: 1, Temperature: 0"
  output: "0.00°C = 32.00°F"
- input: "Choice: 1, Temperature: 100"
  output: "100.00°C = 212.00°F"
- input: "Choice: 2, Temperature: 32"
  output: "32.00°F = 0.00°C"
- input: "Choice: 2, Temperature: 98.6"
  output: "98.60°F = 37.00°C"
hints:
- Formula for C to F: (C × 9/5) + 32
- Formula for F to C: (F - 32) × 5/9
- Use System.out.printf("%.2f", value) for 2 decimal places
- Use switch statement or if-else for menu choices
solution:
```java
import java.util.Scanner;

public class TemperatureConverter {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Temperature Converter");
        System.out.println("1. Celsius to Fahrenheit");
        System.out.println("2. Fahrenheit to Celsius");
        System.out.print("Enter your choice (1 or 2): ");
        
        int choice = scanner.nextInt();
        
        System.out.print("Enter temperature: ");
        double temp = scanner.nextDouble();
        
        double result;
        
        switch (choice) {
            case 1:
                result = (temp * 9/5) + 32;
                System.out.printf("%.2f°C = %.2f°F%n", temp, result);
                break;
            case 2:
                result = (temp - 32) * 5/9;
                System.out.printf("%.2f°F = %.2f°C%n", temp, result);
                break;
            default:
                System.out.println("Invalid choice! Please select 1 or 2.");
        }
        
        scanner.close();
    }
}
```
```

---

## Benefits of the New Format

1. **Clear Problem Statement**: Students understand what to build before seeing the solution
2. **Defined Requirements**: Specific checklist of what the program must do
3. **Test Cases**: Examples showing expected behavior with different inputs
4. **Optional Hints**: Guidance available without spoiling the solution
5. **Collapsible Solution**: Encourages students to try first before viewing the answer
6. **Professional Presentation**: Clean, organized, and easy to follow

---

*This demo file shows both the old and new exercise formats for comparison.*