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

**📝 Problem Statement:**
Create a program that prints all numbers from 1 to 100, displaying 10 numbers per line for better readability.

**Requirements:**
- Use a for loop to iterate from 1 to 100
- Print each number followed by a space
- Insert a line break after every 10 numbers
- Use modulus operator to determine when to break the line

**Sample Test Cases:**
```
Expected Output:
1 2 3 4 5 6 7 8 9 10
11 12 13 14 15 16 17 18 19 20
21 22 23 24 25 26 27 28 29 30
31 32 33 34 35 36 37 38 39 40
41 42 43 44 45 46 47 48 49 50
51 52 53 54 55 56 57 58 59 60
61 62 63 64 65 66 67 68 69 70
71 72 73 74 75 76 77 78 79 80
81 82 83 84 85 86 87 88 89 90
91 92 93 94 95 96 97 98 99 100
```

**Solution:**
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

**💡 Tips:**
- For loop is ideal when you know the number of iterations in advance
- Use `print()` instead of `println()` to keep numbers on same line
- `i % 10 == 0` checks if number is divisible by 10
- Can modify the code to print any range or change numbers per line

---

### Exercise 2: Sum of Numbers

**📝 Problem Statement:**
Write a program that calculates the sum of all numbers from 1 to n, where n is provided by the user.

**Requirements:**
- Accept a positive integer n from the user
- Use a for loop to calculate sum of 1 + 2 + 3 + ... + n
- Use accumulator variable to store running sum
- Display the final sum with clear message

**Sample Test Cases:**
```
Input: n = 10
Expected Output:
Sum of 1 to 10 = 55

Input: n = 5
Expected Output:
Sum of 1 to 5 = 15

Input: n = 100
Expected Output:
Sum of 1 to 100 = 5050

Input: n = 1
Expected Output:
Sum of 1 to 1 = 1
```

**Solution:**
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

**💡 Tips:**
- Initialize sum to 0 before the loop
- Use `sum += i` which is shorthand for `sum = sum + i`
- Mathematical formula: Sum = n × (n + 1) / 2
- For large values, consider using `long` instead of `int`

---

### Exercise 3: Factorial Calculator

**📝 Problem Statement:**
Create a program that calculates the factorial of a number entered by the user. Factorial (n!) is the product of all positive integers up to n.

**Requirements:**
- Accept a non-negative integer from user
- Calculate factorial: n! = 1 × 2 × 3 × ... × n
- Use `long` data type to handle large results
- Display result with proper formatting

**Sample Test Cases:**
```
Input: n = 5
Expected Output:
5! = 120

Input: n = 7
Expected Output:
7! = 5040

Input: n = 10
Expected Output:
10! = 3628800

Input: n = 0
Expected Output:
0! = 1

Input: n = 1
Expected Output:
1! = 1
```

**Solution:**
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

**💡 Tips:**
- Initialize factorial to 1 (not 0, as 0! = 1)
- Use `long` because factorials grow very quickly
- Factorial of 0 is defined as 1
- Factorial of 20! is maximum for long type (2^63 - 1)
- Use BigInteger for very large factorials

---

### Exercise 4: Fibonacci Series

**📝 Problem Statement:**
Generate and display the Fibonacci series up to n terms. In Fibonacci series, each number is the sum of the two preceding ones.

**Requirements:**
- Accept number of terms from user
- First two terms are 0 and 1
- Each subsequent term = previous term + term before previous
- Display all terms in a single line separated by spaces

**Sample Test Cases:**
```
Input: n = 10
Expected Output:
Fibonacci Series: 0 1 1 2 3 5 8 13 21 34

Input: n = 5
Expected Output:
Fibonacci Series: 0 1 1 2 3

Input: n = 1
Expected Output:
Fibonacci Series: 0

Input: n = 2
Expected Output:
Fibonacci Series: 0 1
```

**Solution:**
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

**💡 Tips:**
- Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
- Pattern: F(n) = F(n-1) + F(n-2)
- Use three variables: first, second, and next
- Update variables: first = second, second = next for each iteration
- Real applications: nature patterns, golden ratio, algorithms

---

### Exercise 5: Prime Number Checker

**📝 Problem Statement:**
Write a program that checks whether a given number is prime or not. A prime number is divisible only by 1 and itself.

**Requirements:**
- Accept an integer input from user
- Check if number is prime using a loop
- Numbers ≤ 1 are not prime
- Display appropriate message

**Sample Test Cases:**
```
Input: number = 17
Expected Output:
17 is PRIME

Input: number = 20
Expected Output:
20 is NOT prime

Input: number = 2
Expected Output:
2 is PRIME

Input: number = 1
Expected Output:
1 is NOT prime

Input: number = 97
Expected Output:
97 is PRIME
```

**Solution:**
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
```

**💡 Tips:**
- Only need to check divisors up to n/2 (or better: √n)
- Use `break` to exit loop early when divisor is found
- 2 is the only even prime number
- Optimization: Check 2 separately, then check only odd numbers
- Prime numbers: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, ...

---

### Exercise 6: Pattern Printing

**📝 Problem Statement:**
Create a program that prints three different patterns using nested loops: right triangle, inverted triangle, and pyramid.

**Requirements:**
- Define number of rows (n = 5)
- Print three patterns consecutively
- Pattern 1: Right triangle (stars increase per row)
- Pattern 2: Inverted triangle (stars decrease per row)
- Pattern 3: Pyramid (centered stars with spaces)
- Use nested loops for all patterns

**Sample Test Cases:**
```
Expected Output:
Pattern 1:
*
* *
* * *
* * * *
* * * * *

Pattern 2:
* * * * *
* * * *
* * *
* *
*

Pattern 3:
        *
      * * *
    * * * * *
  * * * * * * *
* * * * * * * * *
```

**Solution:**
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

**💡 Tips:**
- Pattern 1: Outer loop controls rows, inner loop prints i stars
- Pattern 2: Similar to Pattern 1 but descending order
- Pattern 3: Requires two inner loops - one for spaces, one for stars
- Pyramid formula: Row i has (n-i) spaces and (2i-1) stars
- Practice drawing patterns on paper first to understand the logic

---

### Exercise 7: Reverse a Number

**📝 Problem Statement:**
Write a program that reverses the digits of a number using a while loop.

**Requirements:**
- Accept an integer from user
- Extract digits one by one from right to left
- Build reversed number by multiplying by 10 and adding digit
- Display both original and reversed numbers

**Sample Test Cases:**
```
Input: number = 12345
Expected Output:
Original: 12345
Reversed: 54321

Input: number = 100
Expected Output:
Original: 100
Reversed: 1

Input: number = 9876
Expected Output:
Original: 9876
Reversed: 6789

Input: number = 5
Expected Output:
Original: 5
Reversed: 5
```

**Solution:**
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

**💡 Tips:**
- `number % 10` extracts the last digit
- `number /= 10` removes the last digit
- `reverse = reverse * 10 + digit` builds reversed number
- Save original value before starting loop
- Use this logic to check palindrome numbers

---

### Exercise 8: Armstrong Number Checker

**📝 Problem Statement:**
Check if a number is an Armstrong number. An Armstrong number is equal to the sum of cubes of its digits. For example, 153 = 1³ + 5³ + 3³.

**Requirements:**
- Accept a number from user
- Extract each digit using modulus and division
- Calculate cube of each digit and sum them
- Compare sum with original number
- Display whether number is Armstrong or not

**Sample Test Cases:**
```
Input: number = 153
Expected Output:
153 is an ARMSTRONG number

Input: number = 370
Expected Output:
370 is an ARMSTRONG number

Input: number = 371
Expected Output:
371 is an ARMSTRONG number

Input: number = 123
Expected Output:
123 is NOT an Armstrong number

Input: number = 9
Expected Output:
9 is an ARMSTRONG number
```

**Solution:**
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

**💡 Tips:**
- 3-digit Armstrong numbers: 153, 370, 371, 407
- Single digit numbers (0-9) are also Armstrong numbers
- For general case, count digits and raise to that power
- Formula: digit³ = digit × digit × digit
- While loop is perfect for digit extraction

---

### Exercise 9: Sum of Digits

**📝 Problem Statement:**
Calculate the sum of all digits in a given number.

**Requirements:**
- Accept an integer from user
- Extract each digit using modulus operator
- Add all digits to get sum
- Display the sum with clear message

**Sample Test Cases:**
```
Input: number = 12345
Expected Output:
Sum of digits of 12345 = 15

Input: number = 999
Expected Output:
Sum of digits of 999 = 27

Input: number = 100
Expected Output:
Sum of digits of 100 = 1

Input: number = 54321
Expected Output:
Sum of digits of 54321 = 15
```

**Solution:**
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

**💡 Tips:**
- Similar to reversing, but simpler - just add digits
- `number % 10` gives last digit
- `number /= 10` removes last digit
- Continue until number becomes 0
- Can be used for digital root calculation

---

### Exercise 10: Perfect Number Checker

**📝 Problem Statement:**
Check if a number is a perfect number. A perfect number equals the sum of its proper divisors (excluding itself). For example, 6 = 1 + 2 + 3.

**Requirements:**
- Accept a positive integer from user
- Find all divisors of the number (excluding the number itself)
- Calculate sum of divisors
- Display divisors and determine if sum equals original number

**Sample Test Cases:**
```
Input: number = 6
Expected Output:
Divisors: 1 2 3
Sum of divisors: 6
6 is a PERFECT number

Input: number = 28
Expected Output:
Divisors: 1 2 4 7 14
Sum of divisors: 28
28 is a PERFECT number

Input: number = 12
Expected Output:
Divisors: 1 2 3 4 6
Sum of divisors: 16
12 is NOT a perfect number

Input: number = 496
Expected Output:
Divisors: 1 2 4 8 16 31 62 124 248
Sum of divisors: 496
496 is a PERFECT number
```

**Solution:**
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

**💡 Tips:**
- Perfect numbers: 6, 28, 496, 8128, ...
- Check divisors from 1 to n-1 (excluding n itself)
- Use `number % i == 0` to check if i is a divisor
- Perfect numbers are rare - only 51 known as of 2023
- Related to Mersenne primes

---

### Exercise 11: GCD (Greatest Common Divisor)

**📝 Problem Statement:**
Find the GCD (Greatest Common Divisor) and LCM (Least Common Multiple) of two numbers using the Euclidean algorithm.

**Requirements:**
- Accept two positive integers from user
- Use Euclidean algorithm: repeatedly divide and take remainder
- Calculate GCD using while loop
- Calculate LCM using formula: LCM = (num1 × num2) / GCD
- Display both GCD and LCM

**Sample Test Cases:**
```
Input: num1 = 12, num2 = 18
Expected Output:
GCD of 12 and 18 = 6
LCM of 12 and 18 = 36

Input: num1 = 24, num2 = 36
Expected Output:
GCD of 24 and 36 = 12
LCM of 24 and 36 = 72

Input: num1 = 7, num2 = 13
Expected Output:
GCD of 7 and 13 = 1
LCM of 7 and 13 = 91

Input: num1 = 100, num2 = 50
Expected Output:
GCD of 100 and 50 = 50
LCM of 100 and 50 = 100
```

**Solution:**
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

**💡 Tips:**
- Euclidean algorithm is very efficient for finding GCD
- Process: GCD(a, b) = GCD(b, a % b) until b becomes 0
- GCD(12, 18): 18 % 12 = 6, then 12 % 6 = 0, GCD = 6
- LCM formula: LCM = (a × b) / GCD(a, b)
- GCD is also called HCF (Highest Common Factor)

---

### Exercise 12: Number Pyramid

**📝 Problem Statement:**
Print a number pyramid pattern where each row contains ascending numbers followed by descending numbers, centered with spaces.

**Requirements:**
- Accept number of rows from user
- Use nested loops: outer for rows, inner for spaces and numbers
- First inner loop prints leading spaces
- Second inner loop prints ascending numbers (1 to row number)
- Third inner loop prints descending numbers (row-1 down to 1)

**Sample Test Cases:**
```
Input: rows = 5
Expected Output:
        1
      1 2 1
    1 2 3 2 1
  1 2 3 4 3 2 1
1 2 3 4 5 4 3 2 1

Input: rows = 3
Expected Output:
    1
  1 2 1
1 2 3 2 1
```

**Solution:**
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

**💡 Tips:**
- Three inner loops: spaces, ascending numbers, descending numbers
- Row i has (rows - i) spaces
- Row i has numbers from 1 to i ascending
- Row i has numbers from i-1 to 1 descending
- Spacing is crucial for pyramid alignment

---

### Exercise 13: Diamond Pattern

**📝 Problem Statement:**
Create a diamond shape pattern using asterisks with both upper and lower halves.

**Requirements:**
- Accept number of rows for diamond size from user
- Print upper half: increasing asterisks with decreasing spaces
- Print lower half: decreasing asterisks with increasing spaces
- Use nested loops for pattern generation

**Sample Test Cases:**
```
Input: n = 5
Expected Output:
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *

Input: n = 3
Expected Output:
  *
 ***
*****
 ***
  *
```

**Solution:**
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

**💡 Tips:**
- Diamond = Upper pyramid + Lower inverted pyramid
- Upper half: row i has (n-i) spaces and (2i-1) stars
- Lower half: mirror of upper half (start from n-1 down to 1)
- Pattern is symmetric both horizontally and vertically
- Can modify to create hollow diamond by checking edge conditions

---

### Exercise 14: Prime Numbers in Range

**📝 Problem Statement:**
Print all prime numbers within a given range (inclusive).

**Requirements:**
- Accept start and end of range from user
- Check each number in range for primality
- Use nested loop: outer for range, inner for checking divisors
- Display all prime numbers found in the range

**Sample Test Cases:**
```
Input: start = 10, end = 30
Expected Output:
Prime numbers between 10 and 30:
11 13 17 19 23 29

Input: start = 1, end = 20
Expected Output:
Prime numbers between 1 and 20:
2 3 5 7 11 13 17 19

Input: start = 50, end = 60
Expected Output:
Prime numbers between 50 and 60:
53 59
```

**Solution:**
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

**💡 Tips:**
- Nested loops: outer iterates through range, inner checks primality
- Use `continue` to skip numbers ≤ 1
- Use `break` to exit inner loop early when divisor found
- Optimization: Only check up to √num instead of num/2
- First 10 primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29

---

### Exercise 15: Power Calculator

**📝 Problem Statement:**
Calculate the power of a number (base^exponent) without using Math.pow() method.

**Requirements:**
- Accept base and exponent from user
- Calculate power using loop and multiplication
- Use long data type to handle large results
- Display result in format: base ^ exponent = result

**Sample Test Cases:**
```
Input: base = 2, exponent = 5
Expected Output:
2 ^ 5 = 32

Input: base = 3, exponent = 4
Expected Output:
3 ^ 4 = 81

Input: base = 5, exponent = 3
Expected Output:
5 ^ 3 = 125

Input: base = 10, exponent = 2
Expected Output:
10 ^ 2 = 100

Input: base = 2, exponent = 0
Expected Output:
2 ^ 0 = 1
```

**Solution:**
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

**💡 Tips:**
- Initialize result to 1 (any number^0 = 1)
- Multiply base by itself exponent times
- Use `long` for larger results
- Time complexity: O(n) where n is exponent
- For negative exponents, result would be 1/positive_power

---

### Exercise 16: Palindrome Number Checker

**📝 Problem Statement:**
Check if a number is a palindrome. A palindrome number reads the same forwards and backwards (e.g., 121, 12321).

**Requirements:**
- Accept an integer from user
- Reverse the number using while loop
- Compare reversed number with original
- Display whether number is palindrome or not

**Sample Test Cases:**
```
Input: number = 121
Expected Output:
121 is a PALINDROME

Input: number = 12321
Expected Output:
12321 is a PALINDROME

Input: number = 123
Expected Output:
123 is NOT a palindrome

Input: number = 1001
Expected Output:
1001 is a PALINDROME

Input: number = 5
Expected Output:
5 is a PALINDROME
```

**Solution:**
```java
import java.util.Scanner;

public class PalindromeNumber {
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

        if (original == reverse) {
            System.out.println(original + " is a PALINDROME");
        } else {
            System.out.println(original + " is NOT a palindrome");
        }

        scanner.close();
    }
}
```

**💡 Tips:**
- Same logic as reversing a number
- Compare original with reversed number
- Single digit numbers are always palindromes
- Examples: 11, 101, 131, 1221, 12321, 123321
- Can also check strings for palindrome (covered later)

---

### Exercise 17: Multiplication Table

**📝 Problem Statement:**
Generate and display the multiplication table for a given number up to 10 times.

**Requirements:**
- Accept a number from user
- Print multiplication table from 1 to 10
- Display in format: number × i = result
- Use for loop to iterate from 1 to 10

**Sample Test Cases:**
```
Input: number = 5
Expected Output:
Multiplication Table of 5:
5 × 1 = 5
5 × 2 = 10
5 × 3 = 15
5 × 4 = 20
5 × 5 = 25
5 × 6 = 30
5 × 7 = 35
5 × 8 = 40
5 × 9 = 45
5 × 10 = 50

Input: number = 12
Expected Output:
Multiplication Table of 12:
12 × 1 = 12
12 × 2 = 24
12 × 3 = 36
...
12 × 10 = 120
```

**Solution:**
```java
import java.util.Scanner;

public class MultiplicationTable {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int number = scanner.nextInt();

        System.out.println("Multiplication Table of " + number + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.println(number + " × " + i + " = " + (number * i));
        }

        scanner.close();
    }
}
```

**💡 Tips:**
- Simple for loop from 1 to 10
- Use `×` symbol for better formatting (or use 'x')
- Can extend to any range (e.g., up to 20)
- Useful for learning basic multiplication
- Enhancement: Generate tables for multiple numbers

---

### Exercise 18: Count Digits

**📝 Problem Statement:**
Count the total number of digits in a given number.

**Requirements:**
- Accept an integer from user
- Use while loop to count digits
- Divide by 10 repeatedly until number becomes 0
- Display the total count of digits

**Sample Test Cases:**
```
Input: number = 12345
Expected Output:
Number of digits in 12345 = 5

Input: number = 7
Expected Output:
Number of digits in 7 = 1

Input: number = 1000000
Expected Output:
Number of digits in 1000000 = 7

Input: number = 999
Expected Output:
Number of digits in 999 = 3

Input: number = 0
Expected Output:
Number of digits in 0 = 1
```

**Solution:**
```java
import java.util.Scanner;

public class CountDigits {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int number = scanner.nextInt();
        int original = number;
        int count = 0;

        // Handle special case for 0
        if (number == 0) {
            count = 1;
        } else {
            while (number != 0) {
                count++;
                number /= 10;
            }
        }

        System.out.println("Number of digits in " + original + " = " + count);

        scanner.close();
    }
}
```

**💡 Tips:**
- Divide by 10 repeatedly and increment counter
- Special case: 0 has 1 digit
- Each division by 10 removes one digit
- Alternative: Convert to string and check length
- Can be used to validate phone numbers, PIN codes, etc.

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

### 1. Infinite Loop Issues

#### ❌ Wrong - Forgetting to Update Loop Counter:
```java
// WRONG
int i = 1;

while (i <= 10) {
    System.out.println(i);
    // i is never updated - infinite loop!
}
```
**Issue:** Loop runs forever because i never changes

#### ✅ Right:
```java
// CORRECT
int i = 1;

while (i <= 10) {
    System.out.println(i);
    i++;  // Counter increments each iteration
}
```

**Why:** Without updating the loop variable, condition remains true forever.

**💡 Tip:** Always ensure loop variables are updated inside the loop body to eventually make the condition false.

---

#### ❌ Wrong - Wrong Increment Direction:
```java
// WRONG
for (int i = 10; i > 0; i++) {  // Incrementing!
    System.out.println(i);
}
// Infinite loop! i starts at 10, keeps increasing
```
**Issue:** i starts at 10 and increases, so i > 0 is always true

#### ✅ Right:
```java
// CORRECT
for (int i = 10; i > 0; i--) {  // Decrementing!
    System.out.println(i);
}
// Prints 10, 9, 8, ..., 1
```

**Why:** Increment (i++) makes condition permanently true; need decrement (i--).

**💡 Tip:** Match the update direction with condition: use i++ when condition is <, use i-- when condition is >.

---

#### ❌ Wrong - Condition Never Becomes False:
```java
// WRONG
int count = 0;

while (count < 10) {
    System.out.println("Running");
    count--;  // Decrements instead of increments!
}
// Infinite loop!
```
**Issue:** count decreases, making condition permanently true

#### ✅ Right:
```java
// CORRECT
int count = 0;

while (count < 10) {
    System.out.println("Running");
    count++;  // Increments correctly
}
```

**Why:** Counter must move toward the exit condition.

**💡 Tip:** Trace loop variable values to ensure they approach the exit condition.

---

#### ❌ Wrong - Logic Error in Condition:
```java
// WRONG
for (int i = 0; i != 10; i += 2) {  // i skips 10!
    System.out.println(i);
}
// Prints 0,2,4,6,8,10,12,14... forever!
```
**Issue:** i skips 10 (goes from 8 to 10 to 12), never equals 10

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 10; i += 2) {  // Use < not !=
    System.out.println(i);
}
// Prints 0,2,4,6,8
```

**Why:** != is dangerous with steps > 1; use < or <= instead.

**💡 Tip:** Avoid != in loop conditions; use < or <= for safer bounds checking.

---

#### ❌ Wrong - Infinite Loop Missing break:
```java
// WRONG
while (true) {
    int input = getInput();
    processInput(input);
    // No break statement!
}
```
**Issue:** Intentional infinite loop but missing exit condition

#### ✅ Right:
```java
// CORRECT
while (true) {
    int input = getInput();
    if (input == -1) {
        break;  // Exit condition
    }
    processInput(input);
}
```

**Why:** Infinite loops need explicit break to exit.

**💡 Tip:** Always provide an exit mechanism in intentional infinite loops.

---

### 2. Off-by-One Errors

#### ❌ Wrong - Array Index Off-by-One:
```java
// WRONG
int[] arr = {10, 20, 30, 40, 50};

for (int i = 0; i <= arr.length; i++) {  // <= is wrong!
    System.out.println(arr[i]);  // ArrayIndexOutOfBoundsException!
}
```
**Issue:** Tries to access arr[5] which doesn't exist (indices are 0-4)

#### ✅ Right:
```java
// CORRECT
int[] arr = {10, 20, 30, 40, 50};

for (int i = 0; i < arr.length; i++) {  // Use <
    System.out.println(arr[i]);  // Correctly accesses 0-4
}
```

**Why:** Array indices are 0 to length-1, not 0 to length.

**💡 Tip:** Use `< arr.length`, not `<= arr.length`; or use enhanced for loop.

---

#### ❌ Wrong - Loop Iterations Off-by-One:
```java
// WRONG
for (int i = 1; i < 10; i++) {  // Executes 9 times!
    System.out.print(i + " ");
}
// Prints: 1 2 3 4 5 6 7 8 9 (missing 10)
```
**Issue:** Executes 9 times (i = 1 to 9), not 10 times as intended

#### ✅ Right:
```java
// CORRECT
for (int i = 1; i <= 10; i++) {  // Use <=
    System.out.print(i + " ");
}
// Prints: 1 2 3 4 5 6 7 8 9 10
```

**Why:** Using < instead of <= excludes the final value.

**💡 Tip:** For n iterations starting at 1, use `i <= n`; starting at 0, use `i < n`.

---

#### ❌ Wrong - Starting at Wrong Index:
```java
// WRONG
int[] numbers = {5, 10, 15, 20, 25};
int sum = 0;

for (int i = 1; i < numbers.length; i++) {  // Starts at 1!
    sum += numbers[i];
}
System.out.println(sum);  // Prints 70, not 75 (missed first element)
```
**Issue:** Starts at index 1, missing first element (index 0)

#### ✅ Right:
```java
// CORRECT
int[] numbers = {5, 10, 15, 20, 25};
int sum = 0;

for (int i = 0; i < numbers.length; i++) {  // Starts at 0
    sum += numbers[i];
}
System.out.println(sum);  // Prints 75
```

**Why:** Arrays start at index 0, not 1.

**💡 Tip:** Always start array loops at index 0 unless you have a specific reason not to.

---

#### ❌ Wrong - Boundary Condition Error:
```java
// WRONG
for (int i = 0; i <= 100; i++) {  // 101 iterations!
    // Process 0 to 100
}
```
**Issue:** Executes 101 times (0 to 100 inclusive), not 100 times

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 100; i++) {  // 100 iterations
    // Process 0 to 99
}
// OR if you need 0 to 100:
for (int i = 0; i <= 99; i++) {  // Also 100 iterations
    // Process 0 to 99
}
```

**Why:** `<=` includes both endpoints.

**💡 Tip:** Be clear about inclusive vs exclusive boundaries.

---

### 3. Semicolon Errors

#### ❌ Wrong - Accidental Semicolon After for:
```java
// WRONG
for (int i = 0; i < 10; i++);  // Semicolon here!
{
    System.out.println(i);  // Compilation error: i out of scope
}
```
**Issue:** Loop executes 10 times with empty body; block is outside loop

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 10; i++) {  // No semicolon
    System.out.println(i);  // Loop body
}
```

**Why:** Semicolon creates empty statement as loop body; following block is separate.

**💡 Tip:** Never put semicolon after for, while conditions (except do-while).

---

#### ❌ Wrong - Semicolon After while:
```java
// WRONG
int i = 0;

while (i < 5);  // Infinite empty loop!
{
    System.out.println(i);  // Never executes
    i++;
}
```
**Issue:** Infinite empty loop; block outside never runs

#### ✅ Right:
```java
// CORRECT
int i = 0;

while (i < 5) {  // No semicolon
    System.out.println(i);
    i++;
}
```

**Why:** Semicolon makes while loop empty; i never increments.

**💡 Tip:** Watch for accidental semicolons in all loop headers.

---

#### ❌ Wrong - Missing Semicolon After do-while:
```java
// WRONG
int i = 0;

do {
    System.out.println(i);
    i++;
} while (i < 5)  // Compilation error! Missing semicolon
```
**Issue:** do-while requires semicolon after condition

#### ✅ Right:
```java
// CORRECT
int i = 0;

do {
    System.out.println(i);
    i++;
} while (i < 5);  // Semicolon required!
```

**Why:** do-while is the only loop that requires semicolon after the condition.

**💡 Tip:** Remember: do-while is unique - it NEEDS semicolon at the end.

---

### 4. for-each Loop Issues

#### ❌ Wrong - Trying to Modify Array via for-each:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};

for (int num : arr) {
    num = num * 2;  // Doesn't change array!
}

System.out.println(Arrays.toString(arr));  // Prints [1, 2, 3, 4, 5]
```
**Issue:** num is a copy, not a reference to array element

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;  // Directly modifies array
}

System.out.println(Arrays.toString(arr));  // Prints [2, 4, 6, 8, 10]
```

**Why:** for-each gives you a copy of each element, not the actual element.

**💡 Tip:** Use regular for loop with index when you need to modify array elements.

---

#### ❌ Wrong - Need Index But Using for-each:
```java
// WRONG
String[] names = {"Alice", "Bob", "Charlie"};

for (String name : names) {
    // How to print index? Can't!
    System.out.println("Name: " + name);
}
```
**Issue:** Cannot access index in for-each loop

#### ✅ Right:
```java
// CORRECT
String[] names = {"Alice", "Bob", "Charlie"};

for (int i = 0; i < names.length; i++) {
    System.out.println(i + ": " + names[i]);
}
// Output: 0: Alice, 1: Bob, 2: Charlie
```

**Why:** for-each doesn't provide index access.

**💡 Tip:** Use regular for loop when you need the index.

---

#### ❌ Wrong - Trying to Iterate Backwards with for-each:
```java
// WRONG
int[] arr = {1, 2, 3, 4, 5};

// Cannot iterate backwards with for-each!
for (int num : arr) {  // Always goes forward
    System.out.print(num + " ");
}
```
**Issue:** for-each always iterates forward

#### ✅ Right:
```java
// CORRECT
int[] arr = {1, 2, 3, 4, 5};

for (int i = arr.length - 1; i >= 0; i--) {  // Backwards
    System.out.print(arr[i] + " ");
}
// Prints: 5 4 3 2 1
```

**Why:** for-each only goes forward; use regular for loop to go backwards.

**💡 Tip:** for-each is read-only, forward-only; use indexed loop for more control.

---

### 5. Loop Variable Scope

#### ❌ Wrong - Accessing Loop Variable Outside Scope:
```java
// WRONG
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

System.out.println("Final i: " + i);  // Compilation error!
```
**Issue:** i is not accessible outside the for loop

#### ✅ Right:
```java
// CORRECT
int i;  // Declare outside

for (i = 0; i < 10; i++) {
    System.out.println(i);
}

System.out.println("Final i: " + i);  // Works! Prints 10
```

**Why:** Variables declared in for loop initialization are scoped to the loop.

**💡 Tip:** Declare loop variable before the loop if you need to access it afterwards.

---

#### ❌ Wrong - Shadowing Variable in Nested Loop:
```java
// WRONG (compiles but confusing)
for (int i = 0; i < 3; i++) {
    for (int i = 0; i < 3; i++) {  // Shadows outer i!
        System.out.println(i);
    }
}
```
**Issue:** Inner loop variable shadows outer loop variable

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {  // Different name
        System.out.println("i=" + i + ", j=" + j);
    }
}
```

**Why:** Shadowing makes code confusing and error-prone.

**💡 Tip:** Use different variable names (i, j, k) for nested loops.

---

### 6. Wrong Loop Choice

#### ❌ Wrong - Using while When for is Better:
```java
// WRONG (works but less clear)
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
```
**Issue:** Counter initialization and update are separated

#### ✅ Right:
```java
// CORRECT (clearer)
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

**Why:** for loop is designed for counter-based iteration.

**💡 Tip:** Use for when you know iteration count; while when condition-based.

---

#### ❌ Wrong - Using for When while is Better:
```java
// WRONG (awkward)
for (; !done; ) {
    done = processNextItem();
}
```
**Issue:** Empty initialization and update make for loop awkward

#### ✅ Right:
```java
// CORRECT
while (!done) {
    done = processNextItem();
}
```

**Why:** while loop is clearer for condition-based loops.

**💡 Tip:** Use while when loop continuation depends on a condition, not a counter.

---

#### ❌ Wrong - Using while Instead of do-while:
```java
// WRONG (menu runs zero times if user doesn't want it)
int choice = -1;
while (choice != 0) {  // Doesn't run if choice is 0!
    displayMenu();
    choice = getChoice();
}
```
**Issue:** Menu never displays if choice starts at 0

#### ✅ Right:
```java
// CORRECT
int choice;
do {
    displayMenu();
    choice = getChoice();
} while (choice != 0);  // Runs at least once
```

**Why:** do-while guarantees at least one execution.

**💡 Tip:** Use do-while when you need to execute loop body before checking condition.

---

### 7. break and continue Issues

#### ❌ Wrong - Using break When continue is Needed:
```java
// WRONG
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // Exits loop entirely!
    }
    System.out.print(i + " ");
}
// Prints: 1 2 3 4 (stops at 5)
```
**Issue:** break exits entire loop; wanted to skip only 5

#### ✅ Right:
```java
// CORRECT
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        continue;  // Skips just this iteration
    }
    System.out.print(i + " ");
}
// Prints: 1 2 3 4 6 7 8 9 10 (skips 5)
```

**Why:** break exits the loop completely; continue skips to next iteration.

**💡 Tip:** break = "stop the loop", continue = "skip this iteration".

---

#### ❌ Wrong - break Only Exits Inner Loop:
```java
// WRONG
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) {
            break;  // Only exits inner loop!
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}
// Inner loop breaks at j=1, but outer continues
```
**Issue:** break only exits inner loop, outer loop continues

#### ✅ Right:
```java
// CORRECT
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) {
            break outer;  // Exits both loops
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}
```

**Why:** break without label only exits the immediate enclosing loop.

**💡 Tip:** Use labeled break to exit outer loop from inside nested loop.

---

#### ❌ Wrong - continue in Wrong Place:
```java
// WRONG
for (int i = 0; i < 10; i++) {
    continue;  // Skips everything!
    System.out.println(i);  // Never executes
}
// Prints nothing!
```
**Issue:** continue at start skips all code in loop body

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;  // Skip only even numbers
    }
    System.out.println(i);  // Prints odd numbers
}
```

**Why:** continue should be used conditionally, not unconditionally.

**💡 Tip:** Use continue with an if condition to skip specific iterations.

---

#### ❌ Wrong - Unreachable Code After break:
```java
// WRONG
while (true) {
    break;
    System.out.println("Never reached");  // Unreachable!
}
```
**Issue:** Code after break never executes

#### ✅ Right:
```java
// CORRECT
while (true) {
    if (condition) {
        break;
    }
    System.out.println("May execute");
}
```

**Why:** break immediately exits; code after it is unreachable.

**💡 Tip:** Place break inside conditional; don't put code after unconditional break.

---

#### ❌ Wrong - Using continue in switch Inside Loop:
```java
// WRONG
for (int i = 0; i < 5; i++) {
    switch (i) {
        case 2:
            continue;  // Continues loop, not switch!
        case 3:
            System.out.println(i);
            break;
    }
}
```
**Issue:** continue applies to loop, not switch

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 5; i++) {
    switch (i) {
        case 2:
            break;  // Exits switch, continues loop
        case 3:
            System.out.println(i);
            break;
    }
}
```

**Why:** continue affects the loop, not the switch.

**💡 Tip:** Use break to exit switch; continue exits current loop iteration.

---

### 8. Loop Counter Issues

#### ❌ Wrong - Counter Overflow:
```java
// WRONG
for (int i = Integer.MAX_VALUE - 1; i <= Integer.MAX_VALUE + 1; i++) {
    System.out.println(i);
}
// Infinite loop! i overflows to negative
```
**Issue:** i overflows and wraps to negative, never reaches MAX_VALUE + 1

#### ✅ Right:
```java
// CORRECT
for (long i = Integer.MAX_VALUE - 1; i <= (long)Integer.MAX_VALUE + 1; i++) {
    System.out.println(i);
}
```

**Why:** Integer overflow causes wrapping to negative values.

**💡 Tip:** Be careful with loop boundaries near Integer.MAX_VALUE; use long if needed.

---

#### ❌ Wrong - Counter Modified in Wrong Place:
```java
// WRONG
for (int i = 0; i < 10; i++) {
    System.out.println(i);
    i++;  // Incremented twice!
}
// Prints only even numbers: 0, 2, 4, 6, 8
```
**Issue:** i incremented both in loop header and body (twice per iteration)

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 10; i++) {
    System.out.println(i);
    // Don't modify i in loop body
}
```

**Why:** Loop counter should only be updated in one place.

**💡 Tip:** Don't modify loop counter inside loop body; let the header handle it.

---

#### ❌ Wrong - Multiple Counters Confusion:
```java
// WRONG
for (int i = 0, j = 10; i < j; i++, j++) {  // j also increments!
    System.out.println("i=" + i + ", j=" + j);
}
// Infinite loop! i and j both increase, never meet
```
**Issue:** Both counters increment, condition never becomes false

#### ✅ Right:
```java
// CORRECT
for (int i = 0, j = 10; i < j; i++, j--) {  // j decrements
    System.out.println("i=" + i + ", j=" + j);
}
// They meet in the middle
```

**Why:** Counters must move toward each other for condition to become false.

**💡 Tip:** When using multiple counters, ensure they eventually make condition false.

---

### 9. Condition Issues

#### ❌ Wrong - Side Effect in Loop Condition:
```java
// WRONG (confusing)
int i = 0;

while (i++ < 10) {  // i incremented in condition!
    System.out.println(i);
}
// Prints 1 to 10 (not 0 to 9)
```
**Issue:** i is incremented in condition, prints 1-10 instead of 0-9

#### ✅ Right:
```java
// CORRECT (clear)
int i = 0;

while (i < 10) {
    System.out.println(i);
    i++;  // Increment in expected location
}
// Prints 0 to 9
```

**Why:** Side effects in conditions make code hard to read and debug.

**💡 Tip:** Keep loop conditions simple; put updates in the update section or loop body.

---

#### ❌ Wrong - Wrong Comparison Operator:
```java
// WRONG
for (int i = 0; i <= 10; i++) {  // Should be <
    processItem(i);
}
// Processes 11 items (0 to 10), not 10
```
**Issue:** Using <= instead of < adds extra iteration

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 10; i++) {  // Correct operator
    processItem(i);
}
// Processes 10 items (0 to 9)
```

**Why:** <= includes both endpoints; < excludes the end.

**💡 Tip:** For n iterations starting at 0, use `< n`, not `<= n`.

---

#### ❌ Wrong - Complex Condition Error:
```java
// WRONG
int i = 0;
while (i < 10 && i > 0) {  // Never true initially!
    System.out.println(i);
    i++;
}
// Loop never executes!
```
**Issue:** Condition is false from start (0 is not > 0)

#### ✅ Right:
```java
// CORRECT
int i = 0;
while (i < 10) {  // Correct condition
    System.out.println(i);
    i++;
}
```

**Why:** Complex conditions can have logic errors.

**💡 Tip:** Test loop conditions with initial values to ensure they work correctly.

---

### 10. Empty Loop Issues

#### ❌ Wrong - Empty Loop Without Comment:
```java
// WRONG
int i = 0;
while (++i < 1000);  // What's this doing?
```
**Issue:** Empty loop without explanation looks like a bug

#### ✅ Right:
```java
// CORRECT
int i = 0;
while (++i < 1000) {
    // Intentionally empty - just incrementing i to 1000
}
```

**Why:** Empty loops look like mistakes and confuse readers.

**💡 Tip:** If you intentionally have an empty loop body, add a comment explaining why.

---

#### ❌ Wrong - Accidental Empty Loop:
```java
// WRONG
for (int i = 0; i < 10; i++);  // Accidental semicolon
System.out.println("Done");  // Executes once after empty loop
```
**Issue:** Semicolon creates empty loop; following code not in loop

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 10; i++) {
    processItem(i);
}
System.out.println("Done");
```

**Why:** Accidental semicolon creates unintended empty loop.

**💡 Tip:** Avoid semicolons after loop headers unless using do-while.

---

### 11. Nested Loop Issues

#### ❌ Wrong - Using Same Variable Name:
```java
// WRONG
for (int i = 0; i < 3; i++) {
    for (int i = 0; i < 3; i++) {  // Shadows outer i!
        System.out.println(i);
    }
}
```
**Issue:** Inner loop variable shadows outer, causing confusion

#### ✅ Right:
```java
// CORRECT
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {  // Different name
        System.out.println("i=" + i + ", j=" + j);
    }
}
```

**Why:** Shadowing makes code hard to understand and maintain.

**💡 Tip:** Use i, j, k for nested loop variables; never reuse names.

---

#### ❌ Wrong - Inefficient Nested Loops:
```java
// WRONG (O(n²) when O(n) possible)
int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr.length; j++) {
        // Only need inner loop when checking pairs
    }
}
```
**Issue:** Nested loops create O(n²) complexity unnecessarily

#### ✅ Right:
```java
// CORRECT (consider if inner loop is really needed)
int[] arr = {1, 2, 3, 4, 5};

for (int i = 0; i < arr.length; i++) {
    // Often you can avoid nested loop
    process(arr[i]);
}
```

**Why:** Nested loops multiply complexity; avoid when possible.

**💡 Tip:** Think twice before nesting loops; often there's a better way.

---

#### ❌ Wrong - Wrong Bounds in Nested Loop:
```java
// WRONG
int[][] matrix = new int[3][4];  // 3 rows, 4 columns

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix.length; j++) {  // Wrong! Uses rows for columns
        matrix[i][j] = i + j;  // ArrayIndexOutOfBoundsException!
    }
}
```
**Issue:** Inner loop uses matrix.length instead of matrix[i].length

#### ✅ Right:
```java
// CORRECT
int[][] matrix = new int[3][4];

for (int i = 0; i < matrix.length; i++) {
    for (int j = 0; j < matrix[i].length; j++) {  // Correct column count
        matrix[i][j] = i + j;
    }
}
```

**Why:** 2D arrays can have different row lengths.

**💡 Tip:** Use matrix[i].length for columns, not matrix.length.

---

### 12. do-while Specific Issues

#### ❌ Wrong - Not Executing When Intended:
```java
// WRONG (do-while when while was needed)
int count = 10;

do {
    System.out.println(count);  // Prints once!
} while (count < 5);  // Condition false, but already ran
```
**Issue:** do-while executes once even when condition is false

#### ✅ Right:
```java
// CORRECT (use while if shouldn't run when condition false)
int count = 10;

while (count < 5) {
    System.out.println(count);  // Doesn't run
}
```

**Why:** do-while guarantees at least one execution; use while if not desired.

**💡 Tip:** Use do-while only when you need guaranteed first execution.

---

This comprehensive list now contains **40+ loop mistakes** covering every aspect of Day 5: Control Flow - Loops!

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