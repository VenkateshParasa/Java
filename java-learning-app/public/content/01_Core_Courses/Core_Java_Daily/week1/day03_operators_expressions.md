# Day 3: Operators & Expressions

**Week 1: Java Basics & Environment Setup**

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

By the end of Day 3, you will be able to:
- Use arithmetic operators for mathematical calculations
- Apply relational operators for comparisons
- Utilize logical operators for boolean logic
- Work with assignment and compound assignment operators
- Understand increment and decrement operators
- Apply operator precedence rules
- Create complex expressions

---

## 📚 Topics Covered

### 1. Arithmetic Operators

Used for mathematical calculations.

| Operator | Name           | Example | Result |
|----------|----------------|---------|--------|
| +        | Addition       | 5 + 3   | 8      |
| -        | Subtraction    | 5 - 3   | 2      |
| *        | Multiplication | 5 * 3   | 15     |
| /        | Division       | 5 / 2   | 2      |
| %        | Modulus        | 5 % 2   | 1      |

#### Examples:
```java
public class ArithmeticOperators {
    public static void main(String[] args) {
        int a = 10, b = 3;
        
        System.out.println("Addition: " + (a + b));        // 13
        System.out.println("Subtraction: " + (a - b));     // 7
        System.out.println("Multiplication: " + (a * b));  // 30
        System.out.println("Division: " + (a / b));        // 3
        System.out.println("Modulus: " + (a % b));         // 1
    }
}
```

#### Integer vs Float Division:
```java
// Integer division
int result1 = 5 / 2;        // result1 = 2 (not 2.5!)
int result2 = 7 / 3;        // result2 = 2

// Float division
double result3 = 5.0 / 2;   // result3 = 2.5
double result4 = 5 / 2.0;   // result4 = 2.5
double result5 = (double) 5 / 2;  // result5 = 2.5
```

#### Modulus Operator (%):
Returns the **remainder** of division.

```java
System.out.println(10 % 3);   // 1 (10 ÷ 3 = 3 remainder 1)
System.out.println(15 % 4);   // 3 (15 ÷ 4 = 3 remainder 3)
System.out.println(20 % 5);   // 0 (20 ÷ 5 = 4 remainder 0)

// Use case: Check if number is even or odd
int num = 7;
if (num % 2 == 0) {
    System.out.println("Even");
} else {
    System.out.println("Odd");  // This executes
}
```

---

### 2. Relational Operators

Used for **comparing** two values. Returns `boolean` (true/false).

| Operator | Name                     | Example | Result |
|----------|--------------------------|---------|--------|
| ==       | Equal to                 | 5 == 5  | true   |
| !=       | Not equal to             | 5 != 3  | true   |
| >        | Greater than             | 5 > 3   | true   |
| <        | Less than                | 5 < 3   | false  |
| >=       | Greater than or equal to | 5 >= 5  | true   |
| <=       | Less than or equal to    | 5 <= 3  | false  |

#### Examples:
```java
public class RelationalOperators {
    public static void main(String[] args) {
        int x = 10, y = 20;
        
        System.out.println("x == y: " + (x == y));  // false
        System.out.println("x != y: " + (x != y));  // true
        System.out.println("x > y: " + (x > y));    // false
        System.out.println("x < y: " + (x < y));    // true
        System.out.println("x >= 10: " + (x >= 10)); // true
        System.out.println("y <= 20: " + (y <= 20)); // true
    }
}
```

#### Common Use Cases:
```java
// Age verification
int age = 18;
boolean canVote = age >= 18;  // true

// Password check
String password = "secret123";
boolean isCorrect = password.equals("secret123");  // true

// Range check
int score = 85;
boolean isPassing = score >= 60;  // true
```

---

### 3. Logical Operators

Used to combine **multiple boolean expressions**.

| Operator | Name        | Description                    | Example              |
|----------|-------------|--------------------------------|----------------------|
| &&       | Logical AND | Both must be true              | true && false = false|
| \|\|     | Logical OR  | At least one must be true      | true \|\| false = true |
| !        | Logical NOT | Inverts boolean value          | !true = false        |

#### AND Operator (&&):
Both conditions must be **true**.

```java
int age = 25;
boolean hasLicense = true;

// Can drive if age >= 18 AND has license
boolean canDrive = (age >= 18) && hasLicense;  // true

// Truth table for AND
System.out.println(true && true);    // true
System.out.println(true && false);   // false
System.out.println(false && true);   // false
System.out.println(false && false);  // false
```

#### OR Operator (||):
At least one condition must be **true**.

```java
boolean isWeekend = true;
boolean isHoliday = false;

// Can relax if weekend OR holiday
boolean canRelax = isWeekend || isHoliday;  // true

// Truth table for OR
System.out.println(true || true);    // true
System.out.println(true || false);   // true
System.out.println(false || true);   // true
System.out.println(false || false);  // false
```

#### NOT Operator (!):
**Inverts** the boolean value.

```java
boolean isRaining = false;
boolean isSunny = !isRaining;  // true

System.out.println(!true);   // false
System.out.println(!false);  // true

// Double negation
boolean value = true;
System.out.println(!!value);  // true
```

#### Short-Circuit Evaluation:
```java
int x = 5;
int y = 0;

// && stops if first is false (doesn't evaluate second)
if (y != 0 && x / y > 2) {  // Safe! Doesn't divide by zero
    System.out.println("This won't execute");
}

// || stops if first is true (doesn't evaluate second)
if (x > 0 || x / y > 2) {  // Safe! Doesn't divide by zero
    System.out.println("This executes");
}
```

#### Complex Conditions:
```java
int age = 25;
double salary = 50000;
boolean hasExperience = true;

// Eligible if: (age > 21 AND salary > 40000) OR has experience
boolean isEligible = ((age > 21) && (salary > 40000)) || hasExperience;
System.out.println("Eligible: " + isEligible);  // true
```

---

### 4. Assignment Operators

Used to **assign values** to variables.

#### Simple Assignment (=):
```java
int x = 10;
int y = x;  // y gets value of x
```

#### Compound Assignment Operators:

| Operator | Example  | Equivalent To |
|----------|----------|---------------|
| +=       | x += 5   | x = x + 5     |
| -=       | x -= 5   | x = x - 5     |
| *=       | x *= 5   | x = x * 5     |
| /=       | x /= 5   | x = x / 5     |
| %=       | x %= 5   | x = x % 5     |

#### Examples:
```java
public class CompoundAssignment {
    public static void main(String[] args) {
        int x = 10;
        
        x += 5;  // x = x + 5 → x = 15
        System.out.println("After +=: " + x);
        
        x -= 3;  // x = x - 3 → x = 12
        System.out.println("After -=: " + x);
        
        x *= 2;  // x = x * 2 → x = 24
        System.out.println("After *=: " + x);
        
        x /= 4;  // x = x / 4 → x = 6
        System.out.println("After /=: " + x);
        
        x %= 4;  // x = x % 4 → x = 2
        System.out.println("After %=: " + x);
    }
}
```

---

### 5. Increment & Decrement Operators

Used to **increase or decrease** a value by 1.

| Operator | Name           | Description        |
|----------|----------------|--------------------|
| ++       | Increment      | Increase by 1      |
| --       | Decrement      | Decrease by 1      |

#### Pre-increment (++i):
Increment **first**, then use the value.

```java
int i = 5;
int result = ++i;  // i becomes 6, then result = 6
System.out.println("i: " + i);        // 6
System.out.println("result: " + result);  // 6
```

#### Post-increment (i++):
Use the value **first**, then increment.

```java
int i = 5;
int result = i++;  // result = 5, then i becomes 6
System.out.println("i: " + i);        // 6
System.out.println("result: " + result);  // 5
```

#### Pre-decrement (--i):
```java
int i = 5;
int result = --i;  // i becomes 4, then result = 4
System.out.println("i: " + i);        // 4
System.out.println("result: " + result);  // 4
```

#### Post-decrement (i--):
```java
int i = 5;
int result = i--;  // result = 5, then i becomes 4
System.out.println("i: " + i);        // 4
System.out.println("result: " + result);  // 5
```

#### Comparison:
```java
int a = 5, b = 5;

System.out.println(++a);  // 6 (pre-increment)
System.out.println(b++);  // 5 (post-increment)
System.out.println(a);    // 6
System.out.println(b);    // 6
```

---

### 6. Operator Precedence

Determines the **order** in which operators are evaluated.

#### Precedence Table (High to Low):

| Priority | Operators                    | Description              |
|----------|------------------------------|--------------------------|
| 1        | ()                           | Parentheses              |
| 2        | ++, --                       | Increment/Decrement      |
| 3        | !, +, - (unary)              | Unary operators          |
| 4        | *, /, %                      | Multiplication/Division  |
| 5        | +, -                         | Addition/Subtraction     |
| 6        | <, <=, >, >=                 | Relational               |
| 7        | ==, !=                       | Equality                 |
| 8        | &&                           | Logical AND              |
| 9        | \|\|                         | Logical OR               |
| 10       | =, +=, -=, *=, /=, %=        | Assignment               |

#### Examples:
```java
// Without parentheses
int result1 = 5 + 3 * 2;  // result1 = 11 (not 16!)
// Explanation: 3 * 2 = 6, then 5 + 6 = 11

// With parentheses
int result2 = (5 + 3) * 2;  // result2 = 16
// Explanation: 5 + 3 = 8, then 8 * 2 = 16

// Complex expression
int result3 = 10 + 5 * 2 - 3;  // result3 = 17
// Explanation: 5 * 2 = 10, then 10 + 10 = 20, then 20 - 3 = 17

// With parentheses for clarity
int result4 = 10 + (5 * 2) - 3;  // Same as above, but clearer
```

#### Best Practice:
Use **parentheses** for clarity, even when not required.

```java
// Less clear
boolean result = x > 5 && y < 10 || z == 0;

// More clear
boolean result = ((x > 5) && (y < 10)) || (z == 0);
```

---

### 7. Expressions

An **expression** is a combination of variables, operators, and values that produces a result.

#### Simple Expressions:
```java
int x = 5;           // Assignment expression
int y = x + 3;       // Arithmetic expression
boolean b = x > 3;   // Relational expression
```

#### Complex Expressions:
```java
int a = 10, b = 20, c = 30;

// Multiple operators
int result = a + b * c - 5;  // result = 605

// With type promotion
double avg = (a + b + c) / 3.0;  // avg = 20.0
```

#### Type Promotion in Expressions:
```java
byte b = 10;
short s = 20;
int i = 30;
long l = 40L;

// All promoted to long (largest type)
long result = b + s + i + l;

// Mixed with float
float f = 10.5f;
float result2 = b + f;  // byte promoted to float
```

---

## 💻 Practical Exercises

```exercise
title: Exercise 1: Simple Calculator
description: Create a Java program that performs all five basic arithmetic operations (addition, subtraction, multiplication, division, and modulus) on two numbers entered by the user. This exercise demonstrates the use of arithmetic operators and user input handling.
requirements:
- Import Scanner class for user input
- Accept two numbers from the user (use double for decimal support)
- Perform all five arithmetic operations: +, -, *, /, %
- Display results for each operation with clear labels
- Close the Scanner resource after use
testcases:
- input: "num1 = 10, num2 = 3"
  output: "Addition: 13.0\nSubtraction: 7.0\nMultiplication: 30.0\nDivision: 3.333...\nModulus: 1.0"
- input: "num1 = 20, num2 = 4"
  output: "Addition: 24.0\nSubtraction: 16.0\nMultiplication: 80.0\nDivision: 5.0\nModulus: 0.0"
- input: "num1 = 15.5, num2 = 2.5"
  output: "Addition: 18.0\nSubtraction: 13.0\nMultiplication: 38.75\nDivision: 6.2\nModulus: 0.5"
hints:
- Use Scanner's nextDouble() method to read decimal numbers
- Remember to import java.util.Scanner
- Use parentheses in println to ensure arithmetic happens before concatenation
- Division by zero will cause an error - consider adding a check
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
        System.out.println("Division: " + (num1 / num2));
        System.out.println("Modulus: " + (num1 % num2));
        
        scanner.close();
    }
}
```
```

---

```exercise
title: Exercise 2: Even/Odd Checker
description: Write a program that determines whether a number entered by the user is even or odd using the modulus operator. This demonstrates the practical use of the modulus operator (%) and conditional logic.
requirements:
- Accept an integer input from the user
- Use the modulus operator (%) to check if the number is divisible by 2
- Display whether the number is EVEN or ODD
- Use proper conditional statements (if-else)
- Close the Scanner resource
testcases:
- input: "number = 10"
  output: "10 is EVEN"
- input: "number = 7"
  output: "7 is ODD"
- input: "number = 0"
  output: "0 is EVEN"
- input: "number = -5"
  output: "-5 is ODD"
hints:
- A number is even if number % 2 == 0
- A number is odd if number % 2 != 0 (or == 1)
- The modulus operator returns the remainder of division
- Even zero is considered even
solution:
```java
import java.util.Scanner;

public class EvenOddChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        
        if (number % 2 == 0) {
            System.out.println(number + " is EVEN");
        } else {
            System.out.println(number + " is ODD");
        }
        
        scanner.close();
    }
}
```
```

---

```exercise
title: Exercise 3: Temperature Converter
description: Create a program that converts temperature from Celsius to Fahrenheit using the conversion formula. This exercise demonstrates arithmetic operators, formula implementation, and working with floating-point numbers.
requirements:
- Accept temperature in Celsius from the user
- Use the formula: F = (C × 9/5) + 32
- Display the result in Fahrenheit with proper formatting
- Use double data type for decimal precision
- Close the Scanner resource
testcases:
- input: "celsius = 0"
  output: "0.0°C = 32.0°F"
- input: "celsius = 100"
  output: "100.0°C = 212.0°F"
- input: "celsius = 37"
  output: "37.0°C = 98.6°F"
- input: "celsius = -40"
  output: "-40.0°C = -40.0°F"
hints:
- Use 9.0 and 5.0 (not 9 and 5) to ensure floating-point division
- The formula is: (celsius * 9.0 / 5.0) + 32
- Remember operator precedence: multiplication and division before addition
- -40°C equals -40°F (interesting fact!)
solution:
```java
import java.util.Scanner;

public class TemperatureConverter {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter temperature in Celsius: ");
        double celsius = scanner.nextDouble();
        
        // Formula: F = (C × 9/5) + 32
        double fahrenheit = (celsius * 9.0 / 5.0) + 32;
        
        System.out.println(celsius + "°C = " + fahrenheit + "°F");
        
        scanner.close();
    }
}
```
```

---

### Exercise 4: Swap Two Numbers
```java
public class SwapNumbers {
    public static void main(String[] args) {
        int a = 10, b = 20;
        
        System.out.println("Before swap: a = " + a + ", b = " + b);
        
        // Method 1: Using temporary variable
        int temp = a;
        a = b;
        b = temp;
        
        System.out.println("After swap: a = " + a + ", b = " + b);
        
        // Method 2: Without temporary variable (arithmetic)
        a = 10; b = 20;  // Reset
        a = a + b;  // a = 30
        b = a - b;  // b = 10
        a = a - b;  // a = 20
        
        System.out.println("After arithmetic swap: a = " + a + ", b = " + b);
    }
}
```


---

### Exercise 6: Compound Interest Calculator
Calculate compound interest using operators.

```java
public class CompoundInterest {
    public static void main(String[] args) {
        double principal = 10000;
        double rate = 5.0;  // 5% annual interest
        int time = 3;       // 3 years
        int n = 4;          // Compounded quarterly
        
        // Formula: A = P(1 + r/n)^(nt)
        double amount = principal * Math.pow((1 + rate/(100*n)), n*time);
        double interest = amount - principal;
        
        System.out.println("Principal: $" + principal);
        System.out.println("Rate: " + rate + "%");
        System.out.println("Time: " + time + " years");
        System.out.println("Compounded: " + n + " times per year");
        System.out.println("\nFinal Amount: $" + String.format("%.2f", amount));
        System.out.println("Interest Earned: $" + String.format("%.2f", interest));
    }
}
```

---

### Exercise 7: Bitwise Operators
Practice with bitwise operators.

```java
public class BitwiseOperators {
    public static void main(String[] args) {
        int a = 5;   // Binary: 0101
        int b = 3;   // Binary: 0011
        
        System.out.println("a = " + a + " (Binary: " + Integer.toBinaryString(a) + ")");
        System.out.println("b = " + b + " (Binary: " + Integer.toBinaryString(b) + ")");
        
        System.out.println("\nBitwise AND (a & b): " + (a & b));  // 0001 = 1
        System.out.println("Bitwise OR (a | b): " + (a | b));     // 0111 = 7
        System.out.println("Bitwise XOR (a ^ b): " + (a ^ b));    // 0110 = 6
        System.out.println("Bitwise NOT (~a): " + (~a));          // Inverts bits
        System.out.println("Left Shift (a << 1): " + (a << 1));   // 1010 = 10
        System.out.println("Right Shift (a >> 1): " + (a >> 1));  // 0010 = 2
    }
}
```

---

### Exercise 8: Distance Calculator
Calculate distance between two points.

```java
public class DistanceCalculator {
    public static void main(String[] args) {
        // Point 1: (x1, y1)
        double x1 = 3.0, y1 = 4.0;
        
        // Point 2: (x2, y2)
        double x2 = 6.0, y2 = 8.0;
        
        // Distance formula: sqrt((x2-x1)² + (y2-y1)²)
        double distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        
        System.out.println("Point 1: (" + x1 + ", " + y1 + ")");
        System.out.println("Point 2: (" + x2 + ", " + y2 + ")");
        System.out.println("Distance: " + String.format("%.2f", distance));
    }
}
```

---

### Exercise 9: Time Converter
Convert seconds to hours, minutes, and seconds.

```java
public class TimeConverter {
    public static void main(String[] args) {
        int totalSeconds = 3665;
        
        int hours = totalSeconds / 3600;
        int minutes = (totalSeconds % 3600) / 60;
        int seconds = totalSeconds % 60;
        
        System.out.println("Total seconds: " + totalSeconds);
        System.out.println("Converted: " + hours + " hours, " + 
                          minutes + " minutes, " + seconds + " seconds");
    }
}
```

---

### Exercise 10: Quadratic Equation Solver
Solve quadratic equation ax² + bx + c = 0.

```java
public class QuadraticSolver {
    public static void main(String[] args) {
        double a = 1, b = -5, c = 6;  // x² - 5x + 6 = 0
        
        System.out.println("Equation: " + a + "x² + " + b + "x + " + c + " = 0");
        
        double discriminant = b * b - 4 * a * c;
        
        if (discriminant > 0) {
            double root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            double root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            System.out.println("Two real roots:");
            System.out.println("Root 1: " + root1);
            System.out.println("Root 2: " + root2);
        } else if (discriminant == 0) {
            double root = -b / (2 * a);
            System.out.println("One real root: " + root);
        } else {
            System.out.println("No real roots (complex roots)");
        }
    }
}
```

---

### Exercise 11: Percentage Calculator
Calculate percentage and grade.

```java
public class PercentageCalculator {
    public static void main(String[] args) {
        int totalMarks = 500;
        int obtainedMarks = 425;
        
        double percentage = (double) obtainedMarks / totalMarks * 100;
        
        System.out.println("Total Marks: " + totalMarks);
        System.out.println("Obtained Marks: " + obtainedMarks);
        System.out.println("Percentage: " + String.format("%.2f", percentage) + "%");
        
        String grade = (percentage >= 90) ? "A+" :
                      (percentage >= 80) ? "A" :
                      (percentage >= 70) ? "B" :
                      (percentage >= 60) ? "C" :
                      (percentage >= 50) ? "D" : "F";
        
        System.out.println("Grade: " + grade);
    }
}
```

---

### Exercise 12: Electricity Bill Calculator
Calculate electricity bill based on units consumed.

```java
public class ElectricityBill {
    public static void main(String[] args) {
        int units = 350;
        double billAmount = 0;
        
        // Rate structure
        // 0-100: $1 per unit
        // 101-200: $1.5 per unit
        // 201-300: $2 per unit
        // Above 300: $2.5 per unit
        
        if (units <= 100) {
            billAmount = units * 1.0;
        } else if (units <= 200) {
            billAmount = 100 * 1.0 + (units - 100) * 1.5;
        } else if (units <= 300) {
            billAmount = 100 * 1.0 + 100 * 1.5 + (units - 200) * 2.0;
        } else {
            billAmount = 100 * 1.0 + 100 * 1.5 + 100 * 2.0 + (units - 300) * 2.5;
        }
        
        System.out.println("Units Consumed: " + units);
        System.out.println("Bill Amount: $" + String.format("%.2f", billAmount));
    }
}
```

---

### Exercise 5: Leap Year Checker
```java
import java.util.Scanner;

public class LeapYearChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a year: ");
        int year = scanner.nextInt();
        
        // Leap year if: divisible by 4 AND (not divisible by 100 OR divisible by 400)
        boolean isLeapYear = (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
        
        if (isLeapYear) {
            System.out.println(year + " is a LEAP YEAR");
        } else {
            System.out.println(year + " is NOT a leap year");
        }
        
        scanner.close();
    }
}
```

---

## 🔑 Key Takeaways

1. **Arithmetic Operators**: +, -, *, /, % for calculations
2. **Integer Division**: 5 / 2 = 2 (not 2.5!)
3. **Relational Operators**: ==, !=, >, <, >=, <= return boolean
4. **Logical Operators**: && (AND), || (OR), ! (NOT)
5. **Short-Circuit**: && and || stop early when result is determined
6. **Compound Assignment**: +=, -=, *=, /=, %= are shortcuts
7. **Increment/Decrement**: 
   - Pre (++i): increment first, then use
   - Post (i++): use first, then increment
8. **Operator Precedence**: Use parentheses for clarity
9. **Type Promotion**: Smaller types promoted to larger in expressions

---

## ⚠️ Common Mistakes

### 1. Integer Division Pitfall

#### ❌ Wrong - Integer Division Truncates Decimals:
```java
// WRONG
int result = 5 / 2;  // result = 2 (not 2.5!) - decimal part lost
System.out.println(result);  // Prints 2
```
**Issue:** result = 2 (not 2.5!) - decimal part is lost

#### ✅ Right:
```java
// CORRECT
double result = 5.0 / 2;  // result = 2.5 (correct decimal result)
System.out.println(result);  // Prints 2.5
```

**Why:** When both operands are integers, Java performs integer division which truncates the decimal part.

**💡 Tip:** Use at least one double value (5.0) or cast one operand: `(double)5 / 2`

---

#### ❌ Wrong - Double Variable Doesn't Fix Integer Division:
```java
// WRONG
double result = 5 / 2;  // result = 2.0 (division happens first as integers!)
System.out.println(result);  // Prints 2.0
```
**Issue:** result = 2.0 (division happens first as integers, then converted to double)

#### ✅ Right:
```java
// CORRECT
double result = 5.0 / 2;  // result = 2.5 (one operand is double)
System.out.println(result);  // Prints 2.5
```

**Why:** Variable type doesn't affect the division operation; operand types determine the division type.

**💡 Tip:** The division itself must involve a double/float, not just the result variable.

---

#### ❌ Wrong - Integer Division in Complex Calculations:
```java
// WRONG
int totalPoints = 87;
int numTests = 5;
double average = totalPoints / numTests;  // average = 17.0 (not 17.4!)
```
**Issue:** Integer division happens before assignment to double

#### ✅ Right:
```java
// CORRECT
int totalPoints = 87;
int numTests = 5;
double average = (double) totalPoints / numTests;  // average = 17.4
```

**Why:** Cast at least one operand to double to trigger floating-point division.

**💡 Tip:** For averages, always ensure at least one operand is double or cast it.

---

### 2. Assignment vs Comparison

#### ❌ Wrong - Using = Instead of == in Conditions:
```java
// WRONG
int x = 5;
if (x = 10) { }  // Compilation error in Java (assignment in condition)
```
**Issue:** Assigns 10 to x instead of comparing (compilation error in Java)

#### ✅ Right:
```java
// CORRECT
int x = 5;
if (x == 10) { }  // Correctly compares x with 10
```

**Why:** Single = is assignment operator, double == is comparison operator.

**💡 Tip:** Read = as "gets the value" and == as "equals to". Java prevents this in if conditions.

---

#### ❌ Wrong - Confusing = with == in While Loops:
```java
// WRONG
int count = 0;
while (count = 5) {  // Compilation error! Assignment instead of comparison
    System.out.println(count);
}
```
**Issue:** Assignment returns the assigned value, not a boolean

#### ✅ Right:
```java
// CORRECT
int count = 0;
while (count < 5) {  // Correct comparison
    System.out.println(count);
    count++;
}
```

**Why:** Loop conditions need boolean expressions, not assignments.

**💡 Tip:** Always use comparison operators (==, <, >, etc.) in loop conditions.

---

### 3. Logical Operator Confusion

#### ❌ Wrong - Chaining Comparison Operators:
```java
// WRONG
int x = 15;
if (10 < x < 20) { }  // Compilation error! Invalid syntax
```
**Issue:** Cannot chain comparisons like mathematical notation

#### ✅ Right:
```java
// CORRECT
int x = 15;
if (x > 10 && x < 20) { }  // Use logical AND (&&) to combine conditions
```

**Why:** Java evaluates 10 < x first (returns boolean), then tries boolean < 20 which is invalid.

**💡 Tip:** Always use logical operators (&&, ||) to combine multiple conditions.

---

#### ❌ Wrong - OR When AND is Needed:
```java
// WRONG
int age = 25;
if (age >= 18 || age <= 65) {  // Always true!
    System.out.println("Working age");
}
```
**Issue:** Condition is always true (every number is >= 18 OR <= 65)

#### ✅ Right:
```java
// CORRECT
int age = 25;
if (age >= 18 && age <= 65) {  // Both conditions must be true
    System.out.println("Working age");
}
```

**Why:** OR (||) means at least one true; AND (&&) means both must be true.

**💡 Tip:** Ask yourself: "both conditions?" (use &&) or "either condition?" (use ||).

---

#### ❌ Wrong - Negating Complex Conditions Incorrectly:
```java
// WRONG
int age = 25;
if (!(age >= 18 && age <= 65)) { }  // Correct but confusing
// Beginners often write:
if (!age >= 18 && !age <= 65) { }  // Compilation error!
```
**Issue:** ! only negates what immediately follows it

#### ✅ Right:
```java
// CORRECT
int age = 25;
if (age < 18 || age > 65) {  // Clear: outside the range
    System.out.println("Not working age");
}
```

**Why:** De Morgan's Law: !(A && B) = !A || !B

**💡 Tip:** Rewrite negated complex conditions using opposite operators for clarity.

---

#### ❌ Wrong - Using & or | Instead of && or ||:
```java
// WRONG (works but inefficient and confusing)
int x = 5;
if (x > 0 & x < 10) {  // Bitwise AND, no short-circuit
    System.out.println("Valid");
}
```
**Issue:** Uses bitwise operator instead of logical operator, no short-circuiting

#### ✅ Right:
```java
// CORRECT
int x = 5;
if (x > 0 && x < 10) {  // Logical AND with short-circuit
    System.out.println("Valid");
}
```

**Why:** && and || short-circuit (stop early), & and | evaluate both sides.

**💡 Tip:** Use && and || for boolean logic, & and | only for bit manipulation.

---

### 4. Increment/Decrement Confusion

#### ❌ Wrong - Pre vs Post Increment in Expressions:
```java
// WRONG (confusing)
int i = 5;
int result = i++;  // result = 5, i = 6 (post-increment uses old value)
System.out.println("result = " + result + ", i = " + i);  // result = 5, i = 6
```
**Issue:** result gets 5, then i becomes 6 (post-increment uses old value first)

#### ✅ Right:
```java
// CORRECT (clear intent)
int i = 5;
int result = ++i;  // i = 6, result = 6 (pre-increment updates first)
System.out.println("result = " + result + ", i = " + i);  // result = 6, i = 6
```

**Why:** Post-increment (i++) uses value then increments; Pre-increment (++i) increments first then uses value.

**💡 Tip:** When in doubt, use increment/decrement on its own line: `i++; result = i;`

---

#### ❌ Wrong - Increment in Complex Expressions:
```java
// WRONG (very confusing!)
int x = 5;
int y = x++ + ++x;  // y = 5 + 7 = 12 (x is 5, becomes 6, then becomes 7)
System.out.println("x = " + x + ", y = " + y);  // x = 7, y = 12
```
**Issue:** Multiple increments in one expression are hard to read and can vary by compiler

#### ✅ Right:
```java
// CORRECT (clear and predictable)
int x = 5;
x++;  // x = 6
x++;  // x = 7
int y = x + x;  // y = 14
System.out.println("x = " + x + ", y = " + y);  // x = 7, y = 14
```

**Why:** Separate statements make the order of operations explicit.

**💡 Tip:** Never use multiple ++/-- operators in the same expression; split into separate statements.

---

#### ❌ Wrong - Using ++ in Array Index:
```java
// WRONG (confusing)
int[] arr = {10, 20, 30};
int i = 0;
System.out.println(arr[i++]);  // Prints 10, then i becomes 1
System.out.println(arr[i++]);  // Prints 20, then i becomes 2
```
**Issue:** Hard to track what index is being accessed

#### ✅ Right:
```java
// CORRECT (clear)
int[] arr = {10, 20, 30};
int i = 0;
System.out.println(arr[i]);  // Prints 10
i++;
System.out.println(arr[i]);  // Prints 20
i++;
```

**Why:** Separating increment from array access makes code more readable.

**💡 Tip:** Avoid ++ or -- inside array index expressions for clarity.

---

#### ❌ Wrong - Decrement with Unsigned Behavior Expectation:
```java
// WRONG (unexpected for beginners)
int i = 0;
i--;
System.out.println(i);  // Prints -1 (not max int value!)
```
**Issue:** Java integers are signed; decrementing 0 gives -1, not wraparound

#### ✅ Right:
```java
// CORRECT
int i = 0;
if (i > 0) {
    i--;  // Only decrement if positive
}
System.out.println(i);  // Prints 0
```

**Why:** Java doesn't have unsigned integers by default; 0 - 1 = -1.

**💡 Tip:** Check bounds before decrementing to avoid negative values if needed.

---

### 5. Modulus with Negative Numbers

#### ❌ Wrong - Expecting Positive Modulo Result:
```java
// WRONG (unexpected result)
int result = -5 % 3;  // result = -2 (not 1!)
System.out.println(result);  // Prints -2
```
**Issue:** Output is -2, not 1 (sign matches first operand)

#### ✅ Right:
```java
// CORRECT
int result = Math.abs(-5) % 3;  // result = 2
System.out.println(result);  // Prints 2
// OR for always positive modulo:
int result2 = ((-5 % 3) + 3) % 3;  // result2 = 1
System.out.println(result2);  // Prints 1
```

**Why:** In Java, result of modulus takes the sign of the dividend (first operand).

**💡 Tip:** For positive results with negative numbers, use `((a % b) + b) % b` or `Math.abs()`.

---

#### ❌ Wrong - Modulo with Floating-Point:
```java
// WRONG (works but often unintended)
double result = 5.5 % 2.0;  // result = 1.5
System.out.println(result);  // Prints 1.5
```
**Issue:** Modulo with doubles can give unexpected decimal remainders

#### ✅ Right:
```java
// CORRECT (use integers for modulo)
int result = 5 % 2;  // result = 1
System.out.println(result);  // Prints 1
// OR explicitly cast if needed:
int result2 = (int)(5.5 % 2.0);  // result2 = 1
```

**Why:** Modulo is typically used with integers; floating-point modulo is rarely needed.

**💡 Tip:** Prefer integer modulo for clearer intent; cast to int if working with doubles.

---

### 6. Operator Precedence Issues

#### ❌ Wrong - Forgetting Multiplication Before Addition:
```java
// WRONG (developer expects 16)
int result = 5 + 3 * 2;  // result = 11 (not 16!)
System.out.println(result);  // Prints 11
```
**Issue:** result = 11 (multiplication happens first: 3 * 2 = 6, then 5 + 6 = 11)

#### ✅ Right:
```java
// CORRECT
int result = (5 + 3) * 2;  // result = 16 (parentheses force addition first)
System.out.println(result);  // Prints 16
```

**Why:** Multiplication has higher precedence than addition.

**💡 Tip:** Use parentheses to make order of operations explicit, even when not required.

---

#### ❌ Wrong - Complex Boolean Expression Without Parentheses:
```java
// WRONG (hard to read)
boolean result = x > 5 && y < 10 || z == 0;  // What's the grouping?
```
**Issue:** Evaluates as (x > 5 && y < 10) || z == 0 - hard to read intent

#### ✅ Right:
```java
// CORRECT
boolean result = ((x > 5) && (y < 10)) || (z == 0);  // Clear grouping
```

**Why:** && has higher precedence than ||, but relying on precedence reduces readability.

**💡 Tip:** Always use parentheses in complex boolean expressions for clarity.

---

#### ❌ Wrong - Mixing Arithmetic and Shift Operators:
```java
// WRONG (confusing precedence)
int result = 5 + 3 << 2;  // What's evaluated first?
System.out.println(result);  // Prints 32: (5 + 3) << 2 = 8 << 2 = 32
```
**Issue:** Shift operators have lower precedence than arithmetic, causing confusion

#### ✅ Right:
```java
// CORRECT (explicit with parentheses)
int result = (5 + 3) << 2;  // Clearly (8) << 2 = 32
System.out.println(result);  // Prints 32
```

**Why:** Addition happens before shift, but it's unclear without parentheses.

**💡 Tip:** Always use parentheses with shift operators to make precedence explicit.

---

### 7. Short-Circuit Evaluation Issues

#### ❌ Wrong - Side Effects After Short-Circuit:
```java
// WRONG (side effect may not execute)
int x = 5, y = 0;
boolean result = (x > 0) || (y++ > 0);  // y++ never executes!
System.out.println("y = " + y);  // Prints y = 0 (not 1!)
```
**Issue:** If x > 0 is true, y++ never executes (short-circuit)

#### ✅ Right:
```java
// CORRECT (separate side effect)
int x = 5, y = 0;
y++;  // Execute increment first
boolean result = (x > 0) || (y > 0);
System.out.println("y = " + y);  // Prints y = 1
```

**Why:** || stops evaluating when first condition is true; && stops when first is false.

**💡 Tip:** Never rely on side effects (like ++) inside logical expressions; separate them.

---

#### ❌ Wrong - Division by Zero Not Prevented:
```java
// WRONG (may throw exception)
int divisor = 0;
boolean safe = divisor != 0 & 10 / divisor > 5;  // Throws ArithmeticException!
```
**Issue:** Bitwise & doesn't short-circuit, so 10 / divisor is evaluated even when divisor is 0

#### ✅ Right:
```java
// CORRECT (short-circuit prevents division by zero)
int divisor = 0;
boolean safe = divisor != 0 && 10 / divisor > 5;  // No exception!
System.out.println(safe);  // Prints false
```

**Why:** && short-circuits; if first condition is false, second is never evaluated.

**💡 Tip:** Use && and || for conditions that might cause errors; short-circuiting protects you.

---

### 8. String Concatenation Issues

#### ❌ Wrong - Addition vs Concatenation Order:
```java
// WRONG
System.out.println("Result: " + 5 + 3);  // Prints "Result: 53" (not "Result: 8"!)
```
**Issue:** Left-to-right evaluation: "Result: " + 5 = "Result: 5", then + 3 = "Result: 53"

#### ✅ Right:
```java
// CORRECT
System.out.println("Result: " + (5 + 3));  // Prints "Result: 8"
```

**Why:** Parentheses force arithmetic before concatenation.

**💡 Tip:** Use parentheses around arithmetic operations when mixing with strings.

---

#### ❌ Wrong - Starting with Numbers:
```java
// WRONG (unexpected)
System.out.println(5 + 3 + " is the sum");  // Prints "8 is the sum" (OK)
System.out.println("The sum is " + 5 + 3);  // Prints "The sum is 53" (WRONG!)
```
**Issue:** Once string appears, everything becomes concatenation

#### ✅ Right:
```java
// CORRECT
System.out.println("The sum is " + (5 + 3));  // Prints "The sum is 8"
```

**Why:** String turns all subsequent + into concatenation operators.

**💡 Tip:** When string comes first, wrap arithmetic in parentheses.

---

### 9. Compound Assignment Issues

#### ❌ Wrong - Compound Assignment with Narrow Types:
```java
// WRONG
byte b = 10;
b = b + 5;  // Compilation error! int cannot be assigned to byte
```
**Issue:** b + 5 promotes to int, cannot assign back to byte without cast

#### ✅ Right:
```java
// CORRECT
byte b = 10;
b += 5;  // Works! Compound assignment includes implicit cast
System.out.println(b);  // Prints 15
```

**Why:** b + 5 evaluates as int; b += 5 includes automatic narrowing cast.

**💡 Tip:** Use compound operators (+=, -=) for automatic casting with narrow types.

---

#### ❌ Wrong - Assuming += Behaves Same as =:
```java
// WRONG (unexpected for complex expressions)
int x = 5;
x =+ 3;  // Typo! This is x = +3, not x += 3
System.out.println(x);  // Prints 3 (not 8!)
```
**Issue:** =+ is parsed as = +, assigning +3 (which is just 3)

#### ✅ Right:
```java
// CORRECT
int x = 5;
x += 3;  // Correctly adds 3 to x
System.out.println(x);  // Prints 8
```

**Why:** += is a single operator; =+ is = followed by unary +.

**💡 Tip:** Ensure no space between compound operator symbols.

---

### 10. Floating-Point Comparison

#### ❌ Wrong - Direct Equality Check for Doubles:
```java
// WRONG
double d1 = 0.1 + 0.2;  // d1 = 0.30000000000000004
if (d1 == 0.3) {  // FALSE!
    System.out.println("Equal");
} else {
    System.out.println("Not equal");  // This prints!
}
```
**Issue:** Condition is false due to floating-point precision (d1 = 0.30000000000000004)

#### ✅ Right:
```java
// CORRECT
double d1 = 0.1 + 0.2;
if (Math.abs(d1 - 0.3) < 0.0001) {  // TRUE!
    System.out.println("Equal");  // This prints!
}
```

**Why:** Floating-point arithmetic has precision limitations.

**💡 Tip:** Never use == for double/float; use threshold comparison: `Math.abs(a - b) < epsilon`

---

#### ❌ Wrong - Using != for Floating-Point:
```java
// WRONG
double price = 19.99;
if (price != 20.0) {  // May fail unexpectedly
    System.out.println("Not 20");
}
```
**Issue:** != also affected by floating-point precision issues

#### ✅ Right:
```java
// CORRECT
double price = 19.99;
if (Math.abs(price - 20.0) >= 0.0001) {  // Threshold comparison
    System.out.println("Not 20");
}
```

**Why:** Use threshold for all floating-point comparisons (==, !=, <, >, etc.).

**💡 Tip:** Define epsilon constant: `final double EPSILON = 0.0001;` for consistency.

---

### 11. Unary Operator Mistakes

#### ❌ Wrong - Double Negation Confusion:
```java
// WRONG (confusing)
boolean flag = true;
if (!!flag) {  // Double negation
    System.out.println("True");
}
```
**Issue:** Double negation is confusing and unnecessary

#### ✅ Right:
```java
// CORRECT
boolean flag = true;
if (flag) {  // Direct usage
    System.out.println("True");
}
```

**Why:** !!flag equals flag; double negation adds no value.

**💡 Tip:** Avoid double negation; use the boolean directly.

---

#### ❌ Wrong - Negating Integer Instead of Comparison:
```java
// WRONG
int age = -25;  // Negative age
if (!age >= 18) {  // Compilation error! Can't negate int
    System.out.println("Not adult");
}
```
**Issue:** ! only works on booleans, not integers

#### ✅ Right:
```java
// CORRECT
int age = 25;
if (!(age >= 18)) {  // Negate the boolean result
    System.out.println("Not adult");
}
// OR better:
if (age < 18) {  // Use opposite operator
    System.out.println("Not adult");
}
```

**Why:** ! (NOT) operator requires boolean operand.

**💡 Tip:** Negate the entire comparison, or use opposite operator for clarity.

---

### 12. Ternary Operator Mistakes

#### ❌ Wrong - Nested Ternary Without Parentheses:
```java
// WRONG (very hard to read!)
int score = 75;
String grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
```
**Issue:** Difficult to read with multiple nested ternary operators

#### ✅ Right:
```java
// CORRECT (use if-else for multiple conditions)
int score = 75;
String grade;
if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else if (score >= 70) grade = "C";
else grade = "F";
```

**Why:** if-else ladder is clearer for multiple conditions.

**💡 Tip:** Use ternary only for simple two-way assignments; use if-else for complex logic.

---

#### ❌ Wrong - Side Effects in Ternary:
```java
// WRONG (confusing)
int count = 0;
boolean result = true;
int value = result ? count++ : count--;  // Side effect in ternary
```
**Issue:** Side effects in ternary expressions are hard to track

#### ✅ Right:
```java
// CORRECT (separate side effect)
int count = 0;
boolean result = true;
if (result) {
    count++;
} else {
    count--;
}
int value = count;
```

**Why:** Explicit if-else makes side effects clear.

**💡 Tip:** Avoid side effects (++, --, assignments) in ternary expressions.

---

### 13. Bitwise Operator Confusion

#### ❌ Wrong - Using Bitwise Instead of Logical:
```java
// WRONG (works but no short-circuit)
if (x > 0 & y > 0) {  // Bitwise AND, both sides always evaluated
    System.out.println("Both positive");
}
```
**Issue:** Bitwise & doesn't short-circuit, evaluates both conditions

#### ✅ Right:
```java
// CORRECT (logical AND with short-circuit)
if (x > 0 && y > 0) {  // Logical AND, may skip second condition
    System.out.println("Both positive");
}
```

**Why:** && short-circuits for efficiency; & is for bit manipulation.

**💡 Tip:** Use && and || for boolean logic; reserve &, |, ^ for bitwise operations on integers.

---

### 14. Overflow in Arithmetic Operations

#### ❌ Wrong - Multiplication Causing Overflow:
```java
// WRONG
int big = 1000000;
int result = big * big;  // Overflow! Result is wrong
System.out.println(result);  // Prints -727379968 (overflow wraps!)
```
**Issue:** Multiplication exceeds int range, causing overflow

#### ✅ Right:
```java
// CORRECT
long big = 1000000L;
long result = big * big;  // Use long for large calculations
System.out.println(result);  // Prints 1000000000000
```

**Why:** int range is limited; use long for large multiplications.

**💡 Tip:** For large arithmetic, ensure at least one operand is long.

---

### 15. Mixed Type Operations

#### ❌ Wrong - Unexpected Type Promotion:
```java
// WRONG (unexpected result type)
byte b1 = 10, b2 = 20;
byte result = b1 + b2;  // Compilation error! Result is int
```
**Issue:** byte + byte promotes to int

#### ✅ Right:
```java
// CORRECT
byte b1 = 10, b2 = 20;
int result = b1 + b2;  // Result is int (30)
// OR if you need byte:
byte result2 = (byte)(b1 + b2);  // Explicit cast
```

**Why:** Java promotes byte, short to int in arithmetic operations.

**💡 Tip:** Arithmetic on byte/short always results in int; cast back if needed.

---

This comprehensive list now contains **35+ operator-related mistakes** covering every aspect of Day 3: Operators & Expressions!

---

## 🧭 Navigation

### Week 1 Progress:
- [← Day 2: Variables & Data Types](day02_variables_datatypes.md)
- **Day 3: Operators & Expressions** ← You are here
- [Day 4: Control Flow - Conditional Statements →](day04_control_flow_conditionals.md)
- [Day 5: Control Flow - Loops](day05_control_flow_loops.md)
- [Day 6: Arrays - Part 1](day06_arrays_part1.md)
- [Day 7: Arrays - Part 2 & Review](day07_arrays_part2_review.md)

### Related Resources:
- [📝 Day 3 Assessment](../../../java-learning-app/src/data/assessments/java/week1/day3.js)
- [💪 Week 1 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Core_Java/Week1_Days01-07_Setup_and_Basics.md)
- [📚 Detailed Topics Reference](../../../02_Detailed_Topics/Detailed_Topics_Core_Java.md#day-3-operators--expressions)
- [🏠 Back to Week 1 Overview](README.md)

---

## ✅ Day 3 Checklist

Before moving to Day 4, ensure you can:
- [ ] Use all arithmetic operators correctly
- [ ] Understand integer vs float division
- [ ] Apply relational operators for comparisons
- [ ] Combine conditions with logical operators
- [ ] Use compound assignment operators
- [ ] Differentiate between pre and post increment/decrement
- [ ] Apply operator precedence rules
- [ ] Create and evaluate complex expressions
- [ ] Avoid common operator mistakes

---

**🎉 Congratulations on completing Day 3!**

You now understand Java operators and can create complex expressions. Tomorrow, we'll learn about conditional statements.

**Next**: [Day 4: Control Flow - Conditional Statements →](day04_control_flow_conditionals.md)

---

*Last Updated: 2026-01-08*