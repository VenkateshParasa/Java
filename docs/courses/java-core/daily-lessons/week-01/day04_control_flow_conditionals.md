# Day 4: Control Flow - Conditional Statements

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

By the end of Day 4, you will be able to:
- Use if statements for decision making
- Apply if-else for two-way branching
- Create if-else-if ladders for multiple conditions
- Implement nested if statements
- Use switch-case statements effectively
- Apply the ternary operator for simple conditions
- Choose the appropriate conditional structure

---

## 📚 Topics Covered

### 1. if Statement

The **if statement** executes code only when a condition is **true**.

#### Syntax:
```java
if (condition) {
    // Code executes if condition is true
}
```

#### Examples:
```java
public class IfStatement {
    public static void main(String[] args) {
        int age = 20;
        
        if (age >= 18) {
            System.out.println("You are an adult");
        }
        
        // Multiple statements
        int score = 85;
        if (score >= 60) {
            System.out.println("You passed!");
            System.out.println("Congratulations!");
        }
        
        // Without braces (single statement only)
        if (score > 90)
            System.out.println("Excellent!");
    }
}
```

#### Boolean Conditions:
```java
boolean isRaining = true;
if (isRaining) {
    System.out.println("Take an umbrella");
}

// Comparison
int temperature = 30;
if (temperature > 25) {
    System.out.println("It's hot outside");
}

// Logical operators
int age = 25;
boolean hasLicense = true;
if (age >= 18 && hasLicense) {
    System.out.println("You can drive");
}
```

---

### 2. if-else Statement

The **if-else statement** provides **two-way branching**.

#### Syntax:
```java
if (condition) {
    // Code if condition is true
} else {
    // Code if condition is false
}
```

#### Examples:
```java
public class IfElseStatement {
    public static void main(String[] args) {
        int number = 7;
        
        if (number % 2 == 0) {
            System.out.println(number + " is EVEN");
        } else {
            System.out.println(number + " is ODD");
        }
        
        // Age verification
        int age = 16;
        if (age >= 18) {
            System.out.println("You can vote");
        } else {
            System.out.println("You cannot vote yet");
        }
        
        // Password check
        String password = "secret123";
        if (password.equals("secret123")) {
            System.out.println("Access granted");
        } else {
            System.out.println("Access denied");
        }
    }
}
```

---

### 3. if-else-if Ladder

For **multiple conditions**, use if-else-if ladder.

#### Syntax:
```java
if (condition1) {
    // Code if condition1 is true
} else if (condition2) {
    // Code if condition2 is true
} else if (condition3) {
    // Code if condition3 is true
} else {
    // Code if all conditions are false (default)
}
```

#### Examples:

**Grade Calculator:**
```java
public class GradeCalculator {
    public static void main(String[] args) {
        int marks = 85;
        
        if (marks >= 90) {
            System.out.println("Grade: A");
        } else if (marks >= 80) {
            System.out.println("Grade: B");
        } else if (marks >= 70) {
            System.out.println("Grade: C");
        } else if (marks >= 60) {
            System.out.println("Grade: D");
        } else {
            System.out.println("Grade: F");
        }
    }
}
```

**Temperature Classification:**
```java
int temperature = 25;

if (temperature > 30) {
    System.out.println("Hot");
} else if (temperature > 20) {
    System.out.println("Warm");
} else if (temperature > 10) {
    System.out.println("Cool");
} else {
    System.out.println("Cold");
}
```

**Important**: Order matters! First matching condition executes.

```java
int score = 95;

// Correct order (specific to general)
if (score >= 90) {
    System.out.println("Excellent");  // This executes
} else if (score >= 80) {
    System.out.println("Good");
}

// Wrong order (general to specific)
if (score >= 80) {
    System.out.println("Good");  // This executes (wrong!)
} else if (score >= 90) {
    System.out.println("Excellent");  // Never reached
}
```

---

### 4. Nested if Statements

An **if statement inside another if statement**.

#### Syntax:
```java
if (condition1) {
    if (condition2) {
        // Code if both conditions are true
    }
}
```

#### Examples:

**Login System:**
```java
public class LoginSystem {
    public static void main(String[] args) {
        String username = "admin";
        String password = "pass123";
        
        if (username.equals("admin")) {
            if (password.equals("pass123")) {
                System.out.println("Login successful");
            } else {
                System.out.println("Wrong password");
            }
        } else {
            System.out.println("User not found");
        }
    }
}
```

**Eligibility Checker:**
```java
int age = 25;
boolean hasExperience = true;
int yearsOfExperience = 3;

if (age >= 21) {
    if (hasExperience) {
        if (yearsOfExperience >= 2) {
            System.out.println("Eligible for the position");
        } else {
            System.out.println("Need more experience");
        }
    } else {
        System.out.println("Experience required");
    }
} else {
    System.out.println("Age requirement not met");
}
```

**Alternative using logical operators:**
```java
// Same logic without nesting
if (age >= 21 && hasExperience && yearsOfExperience >= 2) {
    System.out.println("Eligible for the position");
} else {
    System.out.println("Not eligible");
}
```

---

### 5. switch-case Statement

The **switch statement** is used for **multiple fixed values**.

#### Syntax:
```java
switch (expression) {
    case value1:
        // Code for value1
        break;
    case value2:
        // Code for value2
        break;
    case value3:
        // Code for value3
        break;
    default:
        // Code if no case matches
}
```

#### Examples:

**Day of Week:**
```java
public class DayOfWeek {
    public static void main(String[] args) {
        int day = 3;
        
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}
```

**Menu-Driven Calculator:**
```java
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        System.out.print("Enter operation (+, -, *, /): ");
        char operation = scanner.next().charAt(0);
        
        double result;
        
        switch (operation) {
            case '+':
                result = num1 + num2;
                System.out.println("Result: " + result);
                break;
            case '-':
                result = num1 - num2;
                System.out.println("Result: " + result);
                break;
            case '*':
                result = num1 * num2;
                System.out.println("Result: " + result);
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.println("Result: " + result);
                } else {
                    System.out.println("Cannot divide by zero");
                }
                break;
            default:
                System.out.println("Invalid operation");
        }
        
        scanner.close();
    }
}
```

#### switch with String (Java 7+):
```java
String month = "January";

switch (month) {
    case "January":
    case "February":
    case "December":
        System.out.println("Winter");
        break;
    case "March":
    case "April":
    case "May":
        System.out.println("Spring");
        break;
    case "June":
    case "July":
    case "August":
        System.out.println("Summer");
        break;
    case "September":
    case "October":
    case "November":
        System.out.println("Fall");
        break;
    default:
        System.out.println("Invalid month");
}
```

#### Fall-Through Behavior:
Without `break`, execution continues to next case.

```java
int number = 2;

switch (number) {
    case 1:
        System.out.println("One");
        // No break - falls through
    case 2:
        System.out.println("Two");
        // No break - falls through
    case 3:
        System.out.println("Three");
        break;
    default:
        System.out.println("Other");
}

// Output:
// Two
// Three
```

**Intentional Fall-Through (Grouping Cases):**
```java
char grade = 'B';

switch (grade) {
    case 'A':
    case 'B':
    case 'C':
        System.out.println("Passed");
        break;
    case 'D':
    case 'F':
        System.out.println("Failed");
        break;
    default:
        System.out.println("Invalid grade");
}
```

---

### 6. Ternary Operator

The **ternary operator** is a **compact if-else**.

#### Syntax:
```java
variable = (condition) ? valueIfTrue : valueIfFalse;
```

#### Examples:
```java
public class TernaryOperator {
    public static void main(String[] args) {
        // Simple example
        int age = 20;
        String status = (age >= 18) ? "Adult" : "Minor";
        System.out.println(status);  // Adult
        
        // Even/Odd
        int number = 7;
        String result = (number % 2 == 0) ? "Even" : "Odd";
        System.out.println(result);  // Odd
        
        // Maximum of two numbers
        int a = 10, b = 20;
        int max = (a > b) ? a : b;
        System.out.println("Max: " + max);  // 20
        
        // Nested ternary (not recommended - hard to read)
        int marks = 85;
        String grade = (marks >= 90) ? "A" : 
                       (marks >= 80) ? "B" : 
                       (marks >= 70) ? "C" : "F";
        System.out.println("Grade: " + grade);  // B
    }
}
```

#### When to Use:
- **Use**: Simple conditions with single assignment
- **Avoid**: Complex conditions (use if-else instead)

```java
// Good use
int discount = (isMember) ? 20 : 0;

// Bad use (too complex)
int price = (isMember) ? (isPremium) ? 100 : 150 : 200;

// Better as if-else
int price;
if (isMember) {
    if (isPremium) {
        price = 100;
    } else {
        price = 150;
    }
} else {
    price = 200;
}
```

---

## 💻 Practical Exercises

### Exercise 1: Grade Calculator
```java
import java.util.Scanner;

public class GradeCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter marks (0-100): ");
        int marks = scanner.nextInt();
        
        if (marks < 0 || marks > 100) {
            System.out.println("Invalid marks");
        } else if (marks >= 90) {
            System.out.println("Grade: A (Excellent)");
        } else if (marks >= 80) {
            System.out.println("Grade: B (Very Good)");
        } else if (marks >= 70) {
            System.out.println("Grade: C (Good)");
        } else if (marks >= 60) {
            System.out.println("Grade: D (Pass)");
        } else {
            System.out.println("Grade: F (Fail)");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 2: Largest of Three Numbers
```java
import java.util.Scanner;

public class LargestOfThree {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        int num1 = scanner.nextInt();
        
        System.out.print("Enter second number: ");
        int num2 = scanner.nextInt();
        
        System.out.print("Enter third number: ");
        int num3 = scanner.nextInt();
        
        int largest;
        
        if (num1 >= num2 && num1 >= num3) {
            largest = num1;
        } else if (num2 >= num1 && num2 >= num3) {
            largest = num2;
        } else {
            largest = num3;
        }
        
        System.out.println("Largest number: " + largest);
        
        scanner.close();
    }
}
```

---

### Exercise 3: Leap Year Checker
```java
import java.util.Scanner;

public class LeapYearChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a year: ");
        int year = scanner.nextInt();
        
        boolean isLeapYear;
        
        if (year % 4 == 0) {
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    isLeapYear = true;
                } else {
                    isLeapYear = false;
                }
            } else {

---

### Exercise 6: Triangle Type Checker
Determine the type of triangle based on sides.

```java
import java.util.Scanner;

public class TriangleType {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter side 1: ");
        int side1 = scanner.nextInt();
        
        System.out.print("Enter side 2: ");
        int side2 = scanner.nextInt();
        
        System.out.print("Enter side 3: ");
        int side3 = scanner.nextInt();
        
        // Check if valid triangle
        if (side1 + side2 > side3 && side2 + side3 > side1 && side1 + side3 > side2) {
            if (side1 == side2 && side2 == side3) {
                System.out.println("Equilateral Triangle");
            } else if (side1 == side2 || side2 == side3 || side1 == side3) {
                System.out.println("Isosceles Triangle");
            } else {
                System.out.println("Scalene Triangle");
            }
        } else {
            System.out.println("Not a valid triangle");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 7: Month Days Calculator
Display number of days in a month.

```java
import java.util.Scanner;

public class MonthDays {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter month number (1-12): ");
        int month = scanner.nextInt();
        
        System.out.print("Enter year: ");
        int year = scanner.nextInt();
        
        int days;
        
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                days = 31;
                break;
            case 4: case 6: case 9: case 11:
                days = 30;
                break;
            case 2:
                // Check leap year
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                    days = 29;
                } else {
                    days = 28;
                }
                break;
            default:
                days = 0;
                System.out.println("Invalid month!");
        }
        
        if (days > 0) {
            System.out.println("Number of days: " + days);
        }
        
        scanner.close();
    }
}
```

---

### Exercise 8: Discount Calculator
Calculate discount based on purchase amount.

```java
import java.util.Scanner;

public class DiscountCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter purchase amount: $");
        double amount = scanner.nextDouble();
        
        double discount = 0;
        
        if (amount >= 1000) {
            discount = 20;  // 20% discount
        } else if (amount >= 500) {
            discount = 10;  // 10% discount
        } else if (amount >= 200) {
            discount = 5;   // 5% discount
        }
        
        double discountAmount = amount * discount / 100;
        double finalAmount = amount - discountAmount;
        
        System.out.println("\nOriginal Amount: $" + amount);
        System.out.println("Discount: " + discount + "%");
        System.out.println("Discount Amount: $" + discountAmount);
        System.out.println("Final Amount: $" + finalAmount);
        
        scanner.close();
    }
}
```

---

### Exercise 9: Character Type Checker
Check if character is vowel, consonant, digit, or special character.

```java
import java.util.Scanner;

public class CharacterType {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a character: ");
        char ch = scanner.next().charAt(0);
        
        if (Character.isLetter(ch)) {
            ch = Character.toLowerCase(ch);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                System.out.println(ch + " is a VOWEL");
            } else {
                System.out.println(ch + " is a CONSONANT");
            }
        } else if (Character.isDigit(ch)) {
            System.out.println(ch + " is a DIGIT");
        } else {
            System.out.println(ch + " is a SPECIAL CHARACTER");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 10: Quadrant Finder
Find the quadrant of a point in coordinate system.

```java
import java.util.Scanner;

public class QuadrantFinder {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter x coordinate: ");
        int x = scanner.nextInt();
        
        System.out.print("Enter y coordinate: ");
        int y = scanner.nextInt();
        
        if (x == 0 && y == 0) {
            System.out.println("Point is at the ORIGIN");
        } else if (x == 0) {
            System.out.println("Point is on the Y-AXIS");
        } else if (y == 0) {
            System.out.println("Point is on the X-AXIS");
        } else if (x > 0 && y > 0) {
            System.out.println("Point is in QUADRANT I");
        } else if (x < 0 && y > 0) {
            System.out.println("Point is in QUADRANT II");
        } else if (x < 0 && y < 0) {
            System.out.println("Point is in QUADRANT III");
        } else {
            System.out.println("Point is in QUADRANT IV");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 11: Eligibility Checker
Check eligibility for voting, driving, and senior citizen benefits.

```java
import java.util.Scanner;

public class EligibilityChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        System.out.println("\n=== Eligibility Status ===");
        
        if (age >= 18) {
            System.out.println("✓ Eligible to VOTE");
        } else {
            System.out.println("✗ Not eligible to vote (need " + (18 - age) + " more years)");
        }
        
        if (age >= 16) {
            System.out.println("✓ Eligible for DRIVING LICENSE");
        } else {
            System.out.println("✗ Not eligible for driving license");
        }
        
        if (age >= 60) {
            System.out.println("✓ Eligible for SENIOR CITIZEN benefits");
        } else {
            System.out.println("✗ Not a senior citizen yet");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 12: Rock Paper Scissors Game
Simple rock-paper-scissors game.

```java
import java.util.Scanner;
import java.util.Random;

public class RockPaperScissors {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        System.out.println("=== Rock Paper Scissors ===");
        System.out.println("1. Rock");
        System.out.println("2. Paper");
        System.out.println("3. Scissors");
        System.out.print("Enter your choice (1-3): ");
        
        int userChoice = scanner.nextInt();
        int computerChoice = random.nextInt(3) + 1;
        
        String[] choices = {"", "Rock", "Paper", "Scissors"};
        
        System.out.println("\nYou chose: " + choices[userChoice]);
        System.out.println("Computer chose: " + choices[computerChoice]);
        
        if (userChoice == computerChoice) {
            System.out.println("It's a TIE!");
        } else if ((userChoice == 1 && computerChoice == 3) ||
                   (userChoice == 2 && computerChoice == 1) ||
                   (userChoice == 3 && computerChoice == 2)) {
            System.out.println("You WIN!");
        } else {
            System.out.println("Computer WINS!");
        }
        
        scanner.close();
    }
}
```

                isLeapYear = true;
            }
        } else {
            isLeapYear = false;
        }
        
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

### Exercise 4: Simple ATM Menu
```java
import java.util.Scanner;

public class ATMMenu {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double balance = 1000.0;
        
        System.out.println("=== ATM Menu ===");
        System.out.println("1. Check Balance");
        System.out.println("2. Deposit");
        System.out.println("3. Withdraw");
        System.out.println("4. Exit");
        System.out.print("Enter choice: ");
        
        int choice = scanner.nextInt();
        
        switch (choice) {
            case 1:
                System.out.println("Current Balance: $" + balance);
                break;
            case 2:
                System.out.print("Enter deposit amount: $");
                double deposit = scanner.nextDouble();
                balance += deposit;
                System.out.println("Deposit successful. New balance: $" + balance);
                break;
            case 3:
                System.out.print("Enter withdrawal amount: $");
                double withdraw = scanner.nextDouble();
                if (withdraw <= balance) {
                    balance -= withdraw;
                    System.out.println("Withdrawal successful. New balance: $" + balance);
                } else {
                    System.out.println("Insufficient funds");
                }
                break;
            case 4:
                System.out.println("Thank you for using ATM");
                break;
            default:
                System.out.println("Invalid choice");
        }
        
        scanner.close();
    }
}
```

---

### Exercise 5: Vowel or Consonant
```java
import java.util.Scanner;

public class VowelConsonant {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a character: ");
        char ch = scanner.next().charAt(0);
        
        // Convert to lowercase for easier checking
        ch = Character.toLowerCase(ch);
        
        if (Character.isLetter(ch)) {
            switch (ch) {
                case 'a':
                case 'e':
                case 'i':
                case 'o':
                case 'u':
                    System.out.println(ch + " is a VOWEL");
                    break;
                default:
                    System.out.println(ch + " is a CONSONANT");
            }
        } else {
            System.out.println("Not a letter");
        }
        
        scanner.close();
    }
}
```

---

## 🔑 Key Takeaways

1. **if**: Execute code when condition is true
2. **if-else**: Two-way branching
3. **if-else-if**: Multiple conditions (order matters!)
4. **Nested if**: if inside if (can be complex)
5. **switch-case**: Multiple fixed values
   - Don't forget `break`
   - Use `default` for unmatched cases
6. **Ternary operator**: Compact if-else for simple conditions
7. **Choose wisely**:
   - if-else: Boolean conditions, ranges
   - switch: Fixed values, equality checks
   - Ternary: Simple assignments

---

## ⚠️ Common Mistakes

### 1. Missing Braces:
```java
// Dangerous without braces
if (condition)
    statement1;
    statement2;  // Always executes! Not part of if

// Safe with braces
if (condition) {
    statement1;
    statement2;
}
```

### 2. Assignment vs Comparison:
```java
int x = 5;
if (x = 10) { }  // ERROR! Should be x == 10
if (x == 10) { } // CORRECT
```

### 3. Missing break in switch:
```java
switch (day) {
    case 1:
        System.out.println("Monday");
        // Missing break - falls through!
    case 2:
        System.out.println("Tuesday");
        break;
}
```

### 4. Wrong Order in if-else-if:
```java
// Wrong - general condition first
if (score >= 60) {
    System.out.println("Pass");  // Always executes for 90+
} else if (score >= 90) {
    System.out.println("Excellent");  // Never reached!
}

// Correct - specific first
if (score >= 90) {
    System.out.println("Excellent");
} else if (score >= 60) {
    System.out.println("Pass");
}
```

### 5. Semicolon After if:
```java
if (condition);  // Empty statement!
{
    System.out.println("Always executes");
}
```

---

## 🧭 Navigation

### Week 1 Progress:
- [← Day 3: Operators & Expressions](day03_operators_expressions.md)
- **Day 4: Control Flow - Conditional Statements** ← You are here
- [Day 5: Control Flow - Loops →](day05_control_flow_loops.md)
- [Day 6: Arrays - Part 1](day06_arrays_part1.md)
- [Day 7: Arrays - Part 2 & Review](day07_arrays_part2_review.md)

### Related Resources:
- [📝 Day 4 Assessment](../../../java-learning-app/src/data/assessments/java/week1/day4.js)
- [💪 Week 1 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Core_Java/Week1_Days01-07_Setup_and_Basics.md)
- [📚 Detailed Topics Reference](../../../02_Detailed_Topics/Detailed_Topics_Core_Java.md#day-4-control-flow---conditional-statements)
- [🏠 Back to Week 1 Overview](README.md)

---

## ✅ Day 4 Checklist

Before moving to Day 5, ensure you can:
- [ ] Write if statements for simple conditions
- [ ] Use if-else for two-way decisions
- [ ] Create if-else-if ladders correctly
- [ ] Implement nested if statements
- [ ] Use switch-case with break statements
- [ ] Apply the ternary operator appropriately
- [ ] Choose the right conditional structure
- [ ] Avoid common conditional mistakes

---

**🎉 Congratulations on completing Day 4!**

You now understand conditional statements and can make decisions in your programs. Tomorrow, we'll learn about loops.

**Next**: [Day 5: Control Flow - Loops →](day05_control_flow_loops.md)

---

*Last Updated: 2026-01-08*