# Day 5: Control Flow - Loops

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

By the end of Day 5, you will be able to:
- Use while loops for repetitive tasks
- Apply do-while loops when at least one execution is needed
- Implement for loops for counter-based iteration
- Use enhanced for loops (for-each) for arrays
- Create nested loops for complex patterns
- Control loop execution with break and continue
- Choose the appropriate loop type for different scenarios

---

## 📚 Topics Covered

### 1. while Loop

The **while loop** repeats code while a condition is **true**. It's an **entry-controlled** loop.

#### Syntax:
```java
while (condition) {
    // Code to repeat
    // Update condition to avoid infinite loop
}
```

#### Examples:

**Print 1 to 5:**
```java
public class WhileLoop {
    public static void main(String[] args) {
        int i = 1;
        
        while (i <= 5) {
            System.out.println(i);
            i++;  // Important: update counter
        }
    }
}
// Output: 1 2 3 4 5
```

**Sum of Numbers:**
```java
int sum = 0;
int i = 1;

while (i <= 10) {
    sum += i;
    i++;
}

System.out.println("Sum: " + sum);  // Sum: 55
```

**User Input Until Valid:**
```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
int number = 0;

while (number <= 0) {
    System.out.print("Enter a positive number: ");
    number = scanner.nextInt();
    
    if (number <= 0) {
        System.out.println("Invalid! Try again.");
    }
}

System.out.println("You entered: " + number);
scanner.close();
```

#### Infinite Loop:
```java
// Infinite loop - condition never becomes false
while (true) {
    System.out.println("This runs forever!");
    // Need break statement to exit
}
```

---

### 2. do-while Loop

The **do-while loop** executes code **at least once**, then checks condition. It's an **exit-controlled** loop.

#### Syntax:
```java
do {
    // Code to repeat (executes at least once)
} while (condition);  // Note the semicolon!
```

#### Examples:

**Basic Example:**
```java
public class DoWhileLoop {
    public static void main(String[] args) {
        int i = 1;
        
        do {
            System.out.println(i);
            i++;
        } while (i <= 5);
    }
}
// Output: 1 2 3 4 5
```

**Menu System:**
```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
int choice;

do {
    System.out.println("\n=== Menu ===");
    System.out.println("1. Option 1");
    System.out.println("2. Option 2");
    System.out.println("3. Exit");
    System.out.print("Enter choice: ");
    choice = scanner.nextInt();
    
    switch (choice) {
        case 1:
            System.out.println("Option 1 selected");
            break;
        case 2:
            System.out.println("Option 2 selected");
            break;
        case 3:
            System.out.println("Goodbye!");
            break;
        default:
            System.out.println("Invalid choice");
    }
} while (choice != 3);

scanner.close();
```

#### while vs do-while:
```java
// while: may not execute at all
int x = 10;
while (x < 5) {
    System.out.println("This never prints");
}

// do-while: executes at least once
int y = 10;
do {
    System.out.println("This prints once");  // Executes!
} while (y < 5);
```

---

### 3. for Loop

The **for loop** is the most commonly used loop, ideal for **counter-based** iteration.

#### Syntax:
```java
for (initialization; condition; update) {
    // Code to repeat
}
```

#### Components:
1. **Initialization**: Executed once at start
2. **Condition**: Checked before each iteration
3. **Update**: Executed after each iteration

#### Examples:

**Print 1 to 10:**
```java
public class ForLoop {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.print(i + " ");
        }
    }
}
// Output: 1 2 3 4 5 6 7 8 9 10
```

**Countdown:**
```java
for (int i = 10; i >= 1; i--) {
    System.out.println(i);
}
System.out.println("Blast off!");
```

**Even Numbers:**
```java
for (int i = 2; i <= 20; i += 2) {
    System.out.print(i + " ");
}
// Output: 2 4 6 8 10 12 14 16 18 20
```

**Multiplication Table:**
```java
int number = 5;

for (int i = 1; i <= 10; i++) {
    System.out.println(number + " x " + i + " = " + (number * i));
}
```

**Multiple Variables:**
```java
for (int i = 0, j = 10; i < j; i++, j--) {
    System.out.println("i = " + i + ", j = " + j);
}
```

---

### 4. Enhanced for Loop (for-each)

The **enhanced for loop** (for-each) is used to iterate through **arrays and collections**.

#### Syntax:
```java
for (dataType variable : array) {
    // Use variable
}
```

#### Examples:

**Array Iteration:**
```java
public class ForEachLoop {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        
        for (int num : numbers) {
            System.out.println(num);
        }
    }
}
```

**String Array:**
```java
String[] names = {"Alice", "Bob", "Charlie", "David"};

for (String name : names) {
    System.out.println("Hello, " + name);
}
```

**Sum of Array:**
```java
int[] scores = {85, 90, 78, 92, 88};
int sum = 0;

for (int score : scores) {
    sum += score;
}

double average = (double) sum / scores.length;
System.out.println("Average: " + average);
```

#### Limitations:
- **Read-only**: Cannot modify array elements
- **No index**: Cannot access element index
- **Forward only**: Cannot iterate backwards

```java
int[] arr = {1, 2, 3, 4, 5};

// Cannot modify
for (int num : arr) {
    num = num * 2;  // Doesn't change array!
}

// Use regular for loop to modify
for (int i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;  // This works
}
```

---

### 5. Nested Loops

A **loop inside another loop**.

#### Syntax:
```java
for (initialization; condition; update) {
    for (initialization; condition; update) {
        // Inner loop code
    }
}
```

#### Examples:

**Multiplication Table (1-5):**
```java
public class MultiplicationTable {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= 10; j++) {
                System.out.print(i + "x" + j + "=" + (i*j) + "\t");
            }
            System.out.println();
        }
    }
}
```

**Pattern Printing:**

**Rectangle:**
```java
for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= 5; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
// Output:
// * * * * *
// * * * * *
// * * * * *
// * * * * *
```

**Right Triangle:**
```java
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
// Output:
// *
// * *
// * * *
// * * * *
// * * * * *
```

**Number Pyramid:**
```java
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + " ");
    }
    System.out.println();
}
// Output:
// 1
// 1 2
// 1 2 3
// 1 2 3 4
// 1 2 3 4 5
```

**2D Array Traversal:**
```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}
```

---

### 6. Loop Control Statements

#### break Statement
**Exits the loop** immediately.

```java
// Find first number divisible by 7
for (int i = 1; i <= 100; i++) {
    if (i % 7 == 0) {
        System.out.println("First number divisible by 7: " + i);
        break;  // Exit loop
    }
}
```

**Search in Array:**
```java
int[] numbers = {10, 25, 30, 45, 50};
int target = 30;
boolean found = false;

for (int num : numbers) {
    if (num == target) {
        found = true;
        break;
    }
}

if (found) {
    System.out.println(target + " found!");
}
```

#### continue Statement
**Skips current iteration** and continues with next.

```java
// Print odd numbers only
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }
    System.out.print(i + " ");
}
// Output: 1 3 5 7 9
```

**Skip Negative Numbers:**
```java
int[] numbers = {5, -2, 10, -7, 15, -3, 20};
int sum = 0;

for (int num : numbers) {
    if (num < 0) {
        continue;  // Skip negative numbers
    }
    sum += num;
}

System.out.println("Sum of positive numbers: " + sum);  // 50
```

#### return Statement
**Exits the method** (and loop).

```java
public static boolean isPrime(int n) {
    if (n <= 1) return false;
    
    for (int i = 2; i <= n/2; i++) {
        if (n % i == 0) {
            return false;  // Not prime, exit method
        }
    }
    return true;  // Prime
}
```

---

### 7. Common Loop Patterns

#### Counter Loop:
```java
for (int i = 0; i < 10; i++) {
    // Fixed number of iterations
}
```

#### Sentinel-Controlled Loop:
```java
Scanner scanner = new Scanner(System.in);
int number;

do {
    System.out.print("Enter number (-1 to quit): ");
    number = scanner.nextInt();
    
    if (number != -1) {
        System.out.println("You entered: " + number);
    }
} while (number != -1);
```

#### Flag-Controlled Loop:
```java
boolean keepRunning = true;

while (keepRunning) {
    // Do something
    
    if (someCondition) {
        keepRunning = false;  // Stop loop
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Print 1 to 100
```java
public class Print1To100 {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            System.out.print(i + " ");
            if (i % 10 == 0) {
                System.out.println();  // New line every 10 numbers
            }
        }
    }
}
```

---

### Exercise 2: Sum of Numbers
```java
import java.util.Scanner;

public class SumOfNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter n: ");
        int n = scanner.nextInt();
        
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        
        System.out.println("Sum of 1 to " + n + " = " + sum);
        scanner.close();
    }
}
```

---

### Exercise 3: Factorial
```java
import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int n = scanner.nextInt();
        
        long factorial = 1;
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
        
        System.out.println(n + "! = " + factorial);
        scanner.close();
    }
}
```

---

### Exercise 4: Fibonacci Series
```java
import java.util.Scanner;

public class FibonacciSeries {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter number of terms: ");
        int n = scanner.nextInt();
        
        int first = 0, second = 1;
        
        System.out.print("Fibonacci Series: " + first + " " + second);
        
        for (int i = 3; i <= n; i++) {
            int next = first + second;
            System.out.print(" " + next);
            first = second;
            second = next;
        }
        
        scanner.close();
    }
}
```

---

### Exercise 5: Prime Number Checker
```java
import java.util.Scanner;

public class PrimeChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        
        boolean isPrime = true;
        
        if (number <= 1) {
            isPrime = false;
        } else {
            for (int i = 2; i <= number / 2; i++) {
                if (number % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        
        if (isPrime) {
            System.out.println(number + " is PRIME");
        } else {
            System.out.println(number + " is NOT prime");
        }
        
        scanner.close();
    }
}

---

### Exercise 8: Armstrong Number Checker
Check if a number is an Armstrong number (sum of cubes of digits equals the number).

```java
import java.util.Scanner;

public class ArmstrongNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        int original = number;
        int sum = 0;
        
        while (number > 0) {
            int digit = number % 10;
            sum += digit * digit * digit;
            number /= 10;
        }
        
        if (sum == original) {
            System.out.println(original + " is an ARMSTRONG number");
        } else {
            System.out.println(original + " is NOT an Armstrong number");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 9: Sum of Digits
Calculate the sum of digits of a number.

```java
import java.util.Scanner;

public class SumOfDigits {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        int original = number;
        int sum = 0;
        
        while (number > 0) {
            sum += number % 10;
            number /= 10;
        }
        
        System.out.println("Sum of digits of " + original + " = " + sum);
        
        scanner.close();
    }
}
```

---

### Exercise 10: Perfect Number Checker
Check if a number is a perfect number (sum of divisors equals the number).

```java
import java.util.Scanner;

public class PerfectNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        int sum = 0;
        
        System.out.print("Divisors: ");
        for (int i = 1; i < number; i++) {
            if (number % i == 0) {
                System.out.print(i + " ");
                sum += i;
            }
        }
        
        System.out.println("\nSum of divisors: " + sum);
        
        if (sum == number) {
            System.out.println(number + " is a PERFECT number");
        } else {
            System.out.println(number + " is NOT a perfect number");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 11: GCD (Greatest Common Divisor)
Find GCD of two numbers using Euclidean algorithm.

```java
import java.util.Scanner;

public class GCDCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int num1 = scanner.nextInt();
        
        System.out.print("Enter second number: ");
        int num2 = scanner.nextInt();
        
        int a = num1, b = num2;
        
        // Euclidean algorithm
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        
        System.out.println("GCD of " + num1 + " and " + num2 + " = " + a);
        
        // LCM = (num1 * num2) / GCD
        int lcm = (num1 * num2) / a;
        System.out.println("LCM of " + num1 + " and " + num2 + " = " + lcm);
        
        scanner.close();
    }
}
```

---

### Exercise 12: Number Pyramid
Print a number pyramid pattern.

```java
import java.util.Scanner;

public class NumberPyramid {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter number of rows: ");
        int rows = scanner.nextInt();
        
        for (int i = 1; i <= rows; i++) {
            // Print spaces
            for (int j = 1; j <= rows - i; j++) {
                System.out.print("  ");
            }
            
            // Print ascending numbers
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            
            // Print descending numbers
            for (int j = i - 1; j >= 1; j--) {
                System.out.print(j + " ");
            }
            
            System.out.println();
        }
        
        scanner.close();
    }
}
```

---

### Exercise 13: Diamond Pattern
Print a diamond pattern using asterisks.

```java
import java.util.Scanner;

public class DiamondPattern {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter number of rows: ");
        int n = scanner.nextInt();
        
        // Upper half
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        
        // Lower half
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        
        scanner.close();
    }
}
```

---

### Exercise 14: Prime Numbers in Range
Print all prime numbers in a given range.

```java
import java.util.Scanner;

public class PrimesInRange {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter start of range: ");
        int start = scanner.nextInt();
        
        System.out.print("Enter end of range: ");
        int end = scanner.nextInt();
        
        System.out.println("Prime numbers between " + start + " and " + end + ":");
        
        for (int num = start; num <= end; num++) {
            if (num <= 1) continue;
            
            boolean isPrime = true;
            for (int i = 2; i <= num / 2; i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
            
            if (isPrime) {
                System.out.print(num + " ");
            }
        }
        
        scanner.close();
    }
}
```

---

### Exercise 15: Power Calculator
Calculate power of a number without using Math.pow().

```java
import java.util.Scanner;

public class PowerCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter base: ");
        int base = scanner.nextInt();
        
        System.out.print("Enter exponent: ");
        int exponent = scanner.nextInt();
        
        long result = 1;
        
        for (int i = 1; i <= exponent; i++) {
            result *= base;
        }
        
        System.out.println(base + " ^ " + exponent + " = " + result);
        
        scanner.close();
    }
}
```

```

---

### Exercise 6: Pattern Printing
```java
public class Patterns {
    public static void main(String[] args) {
        int n = 5;
        
        // Pattern 1: Right triangle
        System.out.println("Pattern 1:");
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        // Pattern 2: Inverted triangle
        System.out.println("\nPattern 2:");
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        
        // Pattern 3: Pyramid
        System.out.println("\nPattern 3:");
        for (int i = 1; i <= n; i++) {
            // Print spaces
            for (int j = 1; j <= n - i; j++) {
                System.out.print("  ");
            }
            // Print stars
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

---

### Exercise 7: Reverse a Number
```java
import java.util.Scanner;

public class ReverseNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        int original = number;
        int reverse = 0;
        
        while (number != 0) {
            int digit = number % 10;
            reverse = reverse * 10 + digit;
            number /= 10;
        }
        
        System.out.println("Original: " + original);
        System.out.println("Reversed: " + reverse);
        
        scanner.close();
    }
}
```

---

## 🔑 Key Takeaways

1. **while Loop**: Entry-controlled, condition checked first
2. **do-while Loop**: Exit-controlled, executes at least once
3. **for Loop**: Best for counter-based iteration
4. **for-each Loop**: Read-only iteration for arrays/collections
5. **Nested Loops**: Loop inside loop (patterns, 2D arrays)
6. **break**: Exit loop immediately
7. **continue**: Skip current iteration
8. **return**: Exit method (and loop)
9. **Choose wisely**:
   - Known iterations → for loop
   - Unknown iterations → while loop
   - At least once → do-while loop
   - Array iteration → for-each loop

---

## ⚠️ Common Mistakes

### 1. Infinite Loop:
```java
// Missing update
int i = 1;
while (i <= 10) {
    System.out.println(i);
    // Forgot i++; - infinite loop!
}
```

### 2. Off-by-One Error:
```java
// Wrong: prints 0 to 9 (10 numbers)
for (int i = 0; i < 10; i++) { }

// Correct: prints 1 to 10 (10 numbers)
for (int i = 1; i <= 10; i++) { }
```

### 3. Modifying for-each Variable:
```java
int[] arr = {1, 2, 3};
for (int num : arr) {
    num = num * 2;  // Doesn't change array!
}
```

### 4. Semicolon After for:
```java
for (int i = 0; i < 10; i++);  // Empty loop!
{
    System.out.println(i);  // Error: i not in scope
}
```

### 5. Wrong Loop Choice:
```java
// Bad: using while when for is better
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}

// Good: use for loop
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

---

## 🧭 Navigation

### Week 1 Progress:
- [← Day 4: Control Flow - Conditional Statements](day04_control_flow_conditionals.md)
- **Day 5: Control Flow - Loops** ← You are here
- [Day 6: Arrays - Part 1 →](day06_arrays_part1.md)
- [Day 7: Arrays - Part 2 & Review](day07_arrays_part2_review.md)

### Related Resources:
- [📝 Day 5 Assessment](../../../java-learning-app/src/data/assessments/java/week1/day5.js)
- [💪 Week 1 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Core_Java/Week1_Days01-07_Setup_and_Basics.md)
- [📚 Detailed Topics Reference](../../../02_Detailed_Topics/Detailed_Topics_Core_Java.md#day-5-control-flow---loops)
- [🏠 Back to Week 1 Overview](README.md)

---

## ✅ Day 5 Checklist

Before moving to Day 6, ensure you can:
- [ ] Write while loops correctly
- [ ] Use do-while loops when needed
- [ ] Implement for loops for counting
- [ ] Use for-each loops for arrays
- [ ] Create nested loops for patterns
- [ ] Apply break and continue appropriately
- [ ] Avoid infinite loops
- [ ] Choose the right loop type
- [ ] Debug common loop errors

---

**🎉 Congratulations on completing Day 5!**

You now understand loops and can repeat code efficiently. Tomorrow, we'll learn about arrays.

**Next**: [Day 6: Arrays - Part 1 →](day06_arrays_part1.md)

---

*Last Updated: 2026-01-08*