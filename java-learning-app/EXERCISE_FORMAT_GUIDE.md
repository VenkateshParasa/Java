m# Exercise Format Guide

This guide shows how to format exercises in markdown files to use the new collapsible Exercise component.

## Format 1: Using Custom Exercise Block (Recommended)

Use this format for new exercises. It provides the most control and best user experience.

### Syntax:

````markdown
```exercise
title: Exercise 1: Simple Calculator
description: Create a Java program that performs basic arithmetic operations (addition, subtraction, multiplication, division, and modulus) on two numbers entered by the user.
requirements:
- Accept two numbers as input from the user
- Perform all five operations: +, -, *, /, %
- Display results for each operation with proper labels
- Handle division by zero appropriately
testcases:
- input: "num1 = 10, num2 = 3"
  output: "Addition: 13\nSubtraction: 7\nMultiplication: 30\nDivision: 3.33\nModulus: 1"
- input: "num1 = 20, num2 = 4"
  output: "Addition: 24\nSubtraction: 16\nMultiplication: 80\nDivision: 5.0\nModulus: 0"
- input: "num1 = 15, num2 = 0"
  output: "Addition: 15\nSubtraction: 15\nMultiplication: 0\nDivision: Error - Cannot divide by zero\nModulus: Error - Cannot divide by zero"
hints:
- Use Scanner class to get user input
- Remember to import java.util.Scanner
- Use double for division to get decimal results
- Check if the second number is zero before division
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
````

### Result:

This will render as a beautiful, interactive exercise component with:
- ✅ Clear problem statement
- ✅ List of requirements
- ✅ Sample test cases with inputs and expected outputs
- ✅ Optional hints (collapsible)
- ✅ Solution code (collapsible with warning)

---

## Format 2: Simple Exercise (Backward Compatible)

For simpler exercises or quick examples, you can still use the traditional format:

```markdown
### Exercise 2: Hello World

Write a program that prints "Hello, World!" to the console.

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```
```

This will render as regular markdown with syntax highlighting.

---

## Best Practices

### 1. **Clear Problem Statements**
- Start with what the program should do
- Be specific about inputs and outputs
- Mention any special cases or constraints

### 2. **Comprehensive Requirements**
- List all functional requirements
- Include technical requirements (imports, classes, etc.)
- Mention edge cases to handle

### 3. **Realistic Test Cases**
- Provide at least 2-3 test cases
- Include normal cases and edge cases
- Show exact expected output format

### 4. **Helpful Hints**
- Provide hints that guide without giving away the solution
- Order hints from general to specific
- Keep hints optional (students can choose to view them)

### 5. **Complete Solutions**
- Include all necessary imports
- Add comments for complex logic
- Follow Java best practices
- Ensure code is properly formatted

---

## Example: Complete Exercise

Here's a complete example showing all features:

````markdown
```exercise
title: Exercise 3: Temperature Converter
description: Create a program that converts temperatures between Celsius and Fahrenheit. The program should ask the user which conversion they want to perform and then convert the temperature accordingly.
requirements:
- Display a menu for conversion choice (1: C to F, 2: F to C)
- Accept user's choice and temperature value
- Perform the appropriate conversion
- Display the result with 2 decimal places
- Handle invalid menu choices
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
- Formula C to F: (C × 9/5) + 32
- Formula F to C: (F - 32) × 5/9
- Use printf for formatting: System.out.printf("%.2f", value)
- Use if-else or switch for menu choices
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
                System.out.println("Invalid choice!");
        }
        
        scanner.close();
    }
}
```
```
````

---

## Migration Guide

To convert existing exercises to the new format:

1. **Identify the exercise** - Look for headings like "Exercise N: Title"
2. **Extract components**:
   - Title from the heading
   - Description from the text before the code
   - Code from the java code block
3. **Add new elements**:
   - Requirements list
   - Test cases with inputs/outputs
   - Optional hints
4. **Wrap in exercise block** - Use the ```exercise syntax

---

## Tips for Writing Great Exercises

1. **Start Simple**: Begin with basic concepts, gradually increase complexity
2. **Real-World Context**: Use practical examples students can relate to
3. **Progressive Difficulty**: Each exercise should build on previous knowledge
4. **Clear Success Criteria**: Students should know when they've solved it correctly
5. **Encourage Exploration**: Hints should guide, not solve

---

*This format enhances the learning experience by providing clear expectations and interactive elements while maintaining the ability to try solving problems independently.*