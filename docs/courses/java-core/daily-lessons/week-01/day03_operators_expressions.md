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

### Exercise 1: Simple Calculator
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

---

### Exercise 2: Even/Odd Checker
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

---

### Exercise 3: Temperature Converter
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

### 1. Integer Division:
```java
int result = 5 / 2;      // result = 2 (not 2.5!)
double result = 5 / 2;   // result = 2.0 (still wrong!)
double result = 5.0 / 2; // result = 2.5 (correct)
```

### 2. Assignment vs Comparison:
```java
int x = 5;
if (x = 10) { }  // ERROR! Should be x == 10
if (x == 10) { } // CORRECT
```

### 3. Logical Operator Confusion:
```java
// Wrong: checking if x is between 10 and 20
if (10 < x < 20) { }  // ERROR! Invalid syntax

// Correct
if (x > 10 && x < 20) { }
```

### 4. Increment/Decrement Confusion:
```java
int i = 5;
System.out.println(i++);  // Prints 5, then i becomes 6
System.out.println(++i);  // i becomes 7, then prints 7
```

### 5. Modulus with Negative Numbers:
```java
System.out.println(-5 % 3);   // -2 (not 1!)
System.out.println(5 % -3);   // 2
System.out.println(-5 % -3);  // -2
```

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