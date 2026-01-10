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

### 1. Missing Braces Issues

#### ❌ Wrong - Forgetting Braces with Multiple Statements:
```java
// WRONG
int score = 95;
int totalPassed = 0;

if (score > 90)
    System.out.println("Great!");
    totalPassed++;  // Always executes!
```
**Issue:** `totalPassed++` always executes regardless of condition

#### ✅ Right:
```java
// CORRECT
int score = 95;
int totalPassed = 0;

if (score > 90) {
    System.out.println("Great!");
    totalPassed++;  // Executes only when score > 90
}
```

**Why:** Without braces, only the first statement belongs to the if block.

**💡 Tip:** Always use braces `{ }` even for single statements to prevent bugs when adding code later.

---

#### ❌ Wrong - Misleading Indentation:
```java
// WRONG
if (isValid)
    processData();
    saveData();  // Always runs despite indentation!
```
**Issue:** `saveData()` always runs despite indentation suggesting otherwise

#### ✅ Right:
```java
// CORRECT
if (isValid) {
    processData();
    saveData();  // Both execute only when isValid is true
}
```

**Why:** Java ignores indentation; only braces determine block scope.

**💡 Tip:** Use braces to make the code structure match the visual indentation.

---

#### ❌ Wrong - Adding Code Later Breaks Logic:
```java
// WRONG (initially worked, then broke)
if (age >= 18)
    canVote = true;
    hasVotingRights = true;  // Always true! Bug introduced later
```
**Issue:** Adding second statement without braces breaks the logic

#### ✅ Right:
```java
// CORRECT
if (age >= 18) {
    canVote = true;
    hasVotingRights = true;  // Both conditional
}
```

**Why:** Single-line if becomes multi-line, requires braces.

**💡 Tip:** Use braces from the start to prevent future bugs when code grows.

---

#### ❌ Wrong - Single Line if Becoming Complex:
```java
// WRONG
if (score >= 60) passed = true; System.out.println("Result processed");
```
**Issue:** Print statement always executes (not part of if)

#### ✅ Right:
```java
// CORRECT
if (score >= 60) {
    passed = true;
    System.out.println("Result processed");
}
```

**Why:** Multiple statements on one line are confusing and error-prone.

**💡 Tip:** Always use braces and proper formatting for clarity.

---

### 2. Semicolon Errors

#### ❌ Wrong - Accidental Semicolon After if:
```java
// WRONG
int x = 15;

if (x > 10);  // Semicolon here!
{
    System.out.println("Greater than 10");  // Always prints!
}
```
**Issue:** Semicolon creates empty if statement; block always executes

#### ✅ Right:
```java
// CORRECT
int x = 15;

if (x > 10) {  // No semicolon
    System.out.println("Greater than 10");  // Prints only if x > 10
}
```

**Why:** Semicolon terminates the if statement with an empty body; following block is independent.

**💡 Tip:** Never put semicolon after if, else, while, or for conditions (except do-while).

---

#### ❌ Wrong - Semicolon After while:
```java
// WRONG
int i = 0;

while (i < 5);  // Infinite loop!
{
    System.out.println(i);  // Never executes
    i++;
}
```
**Issue:** Infinite empty loop; block outside loop never runs

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

**💡 Tip:** Watch for accidental semicolons in all control structures.

---

### 3. if-else-if Ordering Issues

#### ❌ Wrong - General Before Specific:
```java
// WRONG
int score = 95;
String grade;

if (score >= 60) {
    grade = "Pass";  // This executes for score 95!
} else if (score >= 90) {
    grade = "A+";  // Never reached!
}
System.out.println(grade);  // Prints "Pass" not "A+"
```
**Issue:** Score 95 gets "Pass" not "A+" (first matching condition wins)

#### ✅ Right:
```java
// CORRECT
int score = 95;
String grade;

if (score >= 90) {
    grade = "A+";  // Checked first
} else if (score >= 60) {
    grade = "Pass";
}
System.out.println(grade);  // Prints "A+"
```

**Why:** if-else-if evaluates top to bottom and stops at first true condition.

**💡 Tip:** Always order conditions from most specific to most general (highest to lowest ranges).

---

#### ❌ Wrong - Overlapping Ranges:
```java
// WRONG
int age = 25;

if (age >= 18) {
    System.out.println("Adult");  // This prints
} else if (age >= 21) {
    System.out.println("Can drink");  // Never reached!
}
```
**Issue:** age >= 21 never evaluated (subset of age >= 18)

#### ✅ Right:
```java
// CORRECT
int age = 25;

if (age >= 21) {
    System.out.println("Can drink");  // Checked first
} else if (age >= 18) {
    System.out.println("Adult");
}
```

**Why:** More restrictive condition must come first.

**💡 Tip:** Order conditions from most restrictive to least restrictive.

---

#### ❌ Wrong - Unreachable else-if:
```java
// WRONG
int x = 15;

if (x > 5) {
    System.out.println("Greater than 5");  // This executes
} else if (x > 10) {
    System.out.println("Greater than 10");  // Never reached!
}
```
**Issue:** Second condition never reached (x > 10 is subset of x > 5)

#### ✅ Right:
```java
// CORRECT
int x = 15;

if (x > 10) {
    System.out.println("Greater than 10");  // Checked first
} else if (x > 5) {
    System.out.println("Greater than 5");
}
```

**Why:** First condition catches all cases where x > 10.

**💡 Tip:** Check condition logic - ensure else-if conditions can actually be reached.

---

#### ❌ Wrong - Wrong Priority Order:
```java
// WRONG
int marks = 85;
String grade;

if (marks >= 50) {
    grade = "Pass";
} else if (marks >= 75) {
    grade = "Distinction";  // Never reached
}
```
**Issue:** Distinction grade never assigned even when deserved

#### ✅ Right:
```java
// CORRECT
int marks = 85;
String grade;

if (marks >= 75) {
    grade = "Distinction";  // Checked first
} else if (marks >= 50) {
    grade = "Pass";
}
```

**Why:** Higher requirements must be checked before lower ones.

**💡 Tip:** Think of conditions as filters - finest filter first.

---

### 4. switch-case Issues

#### ❌ Wrong - Missing break Causes Fall-Through:
```java
// WRONG
int day = 1;

switch (day) {
    case 1:
        System.out.println("Monday");  // Prints
    case 2:
        System.out.println("Tuesday");  // Also prints!
    case 3:
        System.out.println("Wednesday");  // Also prints!
}
// Output: Monday Tuesday Wednesday
```
**Issue:** Execution falls through to all following cases

#### ✅ Right:
```java
// CORRECT
int day = 1;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;  // Exit switch
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
}
// Output: Monday
```

**Why:** Without break, execution continues to next case (fall-through behavior).

**💡 Tip:** Always add break unless intentional grouping; use default case for safety.

---

#### ❌ Wrong - Unintentional Fall-Through Overwrites Value:
```java
// WRONG
char grade = 'A';
int bonus = 0;

switch (grade) {
    case 'A':
        bonus = 100;  // Set to 100
    case 'B':
        bonus = 50;  // Overwrites to 50!
        break;
}
System.out.println(bonus);  // Prints 50, not 100!
```
**Issue:** Grade 'A' gets bonus = 50 (falls through and overwrites 100)

#### ✅ Right:
```java
// CORRECT
char grade = 'A';
int bonus = 0;

switch (grade) {
    case 'A':
        bonus = 100;
        break;  // Exit here
    case 'B':
        bonus = 50;
        break;
}
System.out.println(bonus);  // Prints 100
```

**Why:** Missing break causes next case to execute, overwriting previous assignment.

**💡 Tip:** Add break after every case unless intentionally grouping cases for same action.

---

#### ❌ Wrong - Missing default Case:
```java
// WRONG
int month = 13;  // Invalid
int days = 0;

switch (month) {
    case 1: case 3: case 5:
        days = 31;
        break;
    case 2:
        days = 28;
        break;
}
System.out.println(days);  // Prints 0 - no error message!
```
**Issue:** Invalid input silently fails (days remains 0)

#### ✅ Right:
```java
// CORRECT
int month = 13;
int days = 0;

switch (month) {
    case 1: case 3: case 5:
        days = 31;
        break;
    case 2:
        days = 28;
        break;
    default:
        System.out.println("Invalid month!");
        days = -1;  // Or throw exception
}
```

**Why:** default case handles unexpected values.

**💡 Tip:** Always include default case to catch invalid input.

---

#### ❌ Wrong - Using double in switch:
```java
// WRONG
double price = 19.99;

switch (price) {  // Compilation error!
    case 19.99:
        System.out.println("Standard price");
        break;
}
```
**Issue:** switch doesn't support double/float types

#### ✅ Right:
```java
// CORRECT
double price = 19.99;

if (Math.abs(price - 19.99) < 0.01) {
    System.out.println("Standard price");
} else if (Math.abs(price - 29.99) < 0.01) {
    System.out.println("Premium price");
}
```

**Why:** switch only works with int, byte, short, char, String, and enums.

**💡 Tip:** Use if-else for boolean, double, float, and long types.

---

#### ❌ Wrong - Variable Declaration in case Without Braces:
```java
// WRONG
int choice = 1;

switch (choice) {
    case 1:
        int result = 10;  // Compilation error in some cases
        System.out.println(result);
        break;
    case 2:
        int result = 20;  // Error: duplicate variable
        System.out.println(result);
        break;
}
```
**Issue:** Variable scope extends to entire switch (duplicate declaration)

#### ✅ Right:
```java
// CORRECT
int choice = 1;

switch (choice) {
    case 1: {
        int result = 10;  // Scoped to this case
        System.out.println(result);
        break;
    }
    case 2: {
        int result = 20;  // Different scope
        System.out.println(result);
        break;
    }
}
```

**Why:** Variables declared in case are scoped to entire switch without braces.

**💡 Tip:** Use braces `{ }` in case blocks when declaring variables.

---

#### ❌ Wrong - Duplicate case Values:
```java
// WRONG
int num = 1;

switch (num) {
    case 1:
        System.out.println("One");
        break;
    case 1:  // Compilation error!
        System.out.println("Uno");
        break;
}
```
**Issue:** Duplicate case labels cause compilation error

#### ✅ Right:
```java
// CORRECT
int num = 1;

switch (num) {
    case 1:
        System.out.println("One");
        break;
    case 2:
        System.out.println("Two");
        break;
}
```

**Why:** Each case label must be unique.

**💡 Tip:** Check for typos and duplicate values when switch doesn't compile.

---

### 5. String Comparison Issues

#### ❌ Wrong - Using == for String Comparison:
```java
// WRONG
String input = new String("yes");

if (input == "yes") {  // FALSE! Different objects
    System.out.println("Confirmed");
}
// Nothing prints!
```
**Issue:** Compares memory addresses, not string content

#### ✅ Right:
```java
// CORRECT
String input = new String("yes");

if (input.equals("yes")) {  // TRUE! Compares content
    System.out.println("Confirmed");
}
// Prints "Confirmed"
```

**Why:** == compares references (memory addresses), not string values.

**💡 Tip:** Always use `.equals()` for strings; use `"yes".equals(input)` to avoid NullPointerException.

---

#### ❌ Wrong - Using != for String Comparison:
```java
// WRONG
String answer = "no";

if (answer != "yes") {  // Compares references!
    System.out.println("Not confirmed");
}
```
**Issue:** May give wrong result with string pool

#### ✅ Right:
```java
// CORRECT
String answer = "no";

if (!answer.equals("yes")) {  // Correctly compares content
    System.out.println("Not confirmed");
}
```

**Why:** != is opposite of ==, both compare references not content.

**💡 Tip:** Use `!str1.equals(str2)` for "not equal" comparison.

---

#### ❌ Wrong - Null Pointer with equals:
```java
// WRONG
String name = getName();  // May return null

if (name.equals("Admin")) {  // NullPointerException if null!
    System.out.println("Welcome Admin");
}
```
**Issue:** Throws NullPointerException if name is null

#### ✅ Right:
```java
// CORRECT
String name = getName();

if ("Admin".equals(name)) {  // Safe! Returns false if name is null
    System.out.println("Welcome Admin");
}
```

**Why:** Calling methods on null throws exception; literal first is safe.

**💡 Tip:** Put known non-null value first: `"literal".equals(variable)`, or check: `name != null && name.equals("Admin")`.

---

#### ❌ Wrong - Case Sensitivity Not Handled:
```java
// WRONG
String input = "YES";

if (input.equals("yes")) {  // FALSE! Case matters
    System.out.println("Confirmed");
}
```
**Issue:** Case-sensitive comparison fails

#### ✅ Right:
```java
// CORRECT
String input = "YES";

if (input.equalsIgnoreCase("yes")) {  // TRUE! Ignores case
    System.out.println("Confirmed");
}
```

**Why:** `.equals()` is case-sensitive by default.

**💡 Tip:** Use `.equalsIgnoreCase()` when case doesn't matter.

---

### 6. Floating-Point Comparison

#### ❌ Wrong - Direct == for Doubles:
```java
// WRONG
double result = 0.1 + 0.2;  // 0.30000000000000004

if (result == 0.3) {  // FALSE due to precision!
    System.out.println("Equal");
} else {
    System.out.println("Not equal");  // This prints
}
```
**Issue:** Floating-point precision causes comparison to fail

#### ✅ Right:
```java
// CORRECT
double result = 0.1 + 0.2;
final double EPSILON = 0.0001;

if (Math.abs(result - 0.3) < EPSILON) {  // TRUE!
    System.out.println("Equal");
}
```

**Why:** Floating-point arithmetic has precision limitations.

**💡 Tip:** Never use == for double/float; use threshold: `Math.abs(a - b) < epsilon`.

---

#### ❌ Wrong - Using != for Floats:
```java
// WRONG
double price = 10.0 / 3.0 * 3.0;

if (price != 10.0) {  // TRUE unexpectedly!
    System.out.println("Price changed");
}
```
**Issue:** Precision errors cause unexpected inequality

#### ✅ Right:
```java
// CORRECT
double price = 10.0 / 3.0 * 3.0;
final double EPSILON = 0.0001;

if (Math.abs(price - 10.0) >= EPSILON) {
    System.out.println("Price changed");
}
```

**Why:** Use threshold for all floating-point comparisons.

**💡 Tip:** Define epsilon constant: `final double EPSILON = 0.0001;` for consistency.

---

### 7. Null Pointer Issues

#### ❌ Wrong - Not Checking for Null:
```java
// WRONG
String text = getText();  // May return null

if (text.length() > 0) {  // NullPointerException!
    System.out.println(text);
}
```
**Issue:** Calling method on null throws exception

#### ✅ Right:
```java
// CORRECT
String text = getText();

if (text != null && text.length() > 0) {  // Safe!
    System.out.println(text);
}
```

**Why:** Must check null before calling methods.

**💡 Tip:** Always check for null before accessing object methods/fields.

---

#### ❌ Wrong - Checking Null After Usage:
```java
// WRONG
String data = getData();
int length = data.length();  // NullPointerException!

if (data != null) {
    System.out.println("Length: " + length);
}
```
**Issue:** Already crashed before null check

#### ✅ Right:
```java
// CORRECT
String data = getData();

if (data != null) {
    int length = data.length();  // Safe!
    System.out.println("Length: " + length);
}
```

**Why:** Check null BEFORE using the value.

**💡 Tip:** Null check must come first, before any usage.

---

#### ❌ Wrong - Wrong Order in Null Check with &&:
```java
// WRONG
String name = getName();

if (name.equals("John") && name != null) {  // Wrong order!
    // NullPointerException if name is null
}
```
**Issue:** First condition executes before null check

#### ✅ Right:
```java
// CORRECT
String name = getName();

if (name != null && name.equals("John")) {  // Correct order!
    // Safe - null check happens first
}
```

**Why:** && evaluates left to right; null check must be first.

**💡 Tip:** With &&, put null check on the left side.

---

### 8. Logic Errors

#### ❌ Wrong - Using OR Instead of AND:
```java
// WRONG
int age = 25;

if (age >= 18 || age <= 65) {  // Always true!
    System.out.println("Working age");
}
// Every number satisfies this (either >= 18 OR <= 65)
```
**Issue:** Condition is always true (every number is either >= 18 OR <= 65)

#### ✅ Right:
```java
// CORRECT
int age = 25;

if (age >= 18 && age <= 65) {  // Both must be true
    System.out.println("Working age");
}
```

**Why:** OR (||) means at least one true; AND (&&) means both must be true.

**💡 Tip:** Ask yourself: "both conditions?" (use &&) or "either condition?" (use ||).

---

#### ❌ Wrong - Inverted Logic:
```java
// WRONG
boolean isValid = checkValidity();

if (!isValid) {  // Negated
    processData();  // Processes invalid data!
}
```
**Issue:** Logic is backwards - processes when NOT valid

#### ✅ Right:
```java
// CORRECT
boolean isValid = checkValidity();

if (isValid) {  // Not negated
    processData();  // Processes valid data
}
```

**Why:** Double-check negation (!) to ensure logic is correct.

**💡 Tip:** Minimize use of negation; positive conditions are clearer.

---

#### ❌ Wrong - Always True Condition:
```java
// WRONG
int score = 75;

if (score >= 0) {  // Always true for valid scores!
    System.out.println("Valid score");
}
// Doesn't actually validate anything useful
```
**Issue:** Condition doesn't filter anything meaningful

#### ✅ Right:
```java
// CORRECT
int score = 75;

if (score >= 0 && score <= 100) {  // Actually validates range
    System.out.println("Valid score");
} else {
    System.out.println("Invalid score");
}
```

**Why:** Condition should have meaningful filtering logic.

**💡 Tip:** Ensure conditions actually check for real requirements.

---

#### ❌ Wrong - De Morgan's Law Violation:
```java
// WRONG
int age = 25;
boolean hasLicense = false;

if (!(age >= 18 && hasLicense)) {  // Confusing
    System.out.println("Cannot drive");
}
```
**Issue:** Negation of complex condition is hard to read

#### ✅ Right:
```java
// CORRECT
int age = 25;
boolean hasLicense = false;

if (age < 18 || !hasLicense) {  // Clear
    System.out.println("Cannot drive");
}
```

**Why:** De Morgan's Law: !(A && B) = !A || !B

**💡 Tip:** Convert negated complex conditions: !(A && B) → !A || !B, !(A || B) → !A && !B.

---

### 9. Nesting Problems

#### ❌ Wrong - Deep Nesting:
```java
// WRONG
if (age >= 18) {
    if (hasLicense) {
        if (hasInsurance) {
            if (carWorking) {
                System.out.println("Can drive");  // 4 levels deep!
            }
        }
    }
}
```
**Issue:** 4 levels of nesting - hard to read and maintain

#### ✅ Right:
```java
// CORRECT
if (age >= 18 && hasLicense && hasInsurance && carWorking) {
    System.out.println("Can drive");  // Clear and flat
}
```

**Why:** Deep nesting makes code hard to understand and error-prone.

**💡 Tip:** Combine conditions with &&/||, use early returns, or extract methods to reduce nesting.

---

#### ❌ Wrong - Nested When Flat is Better:
```java
// WRONG
int score = 85;
String grade;

if (score >= 90) {
    grade = "A";
} else {
    if (score >= 80) {
        grade = "B";
    } else {
        if (score >= 70) {
            grade = "C";
        } else {
            grade = "F";
        }
    }
}
```
**Issue:** Unnecessary nesting when else-if ladder works better

#### ✅ Right:
```java
// CORRECT
int score = 85;
String grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else {
    grade = "F";
}
```

**Why:** else-if ladder is clearer and flatter than nested if-else.

**💡 Tip:** Use else-if for mutually exclusive conditions.

---

### 10. Empty Blocks

#### ❌ Wrong - Empty if with Logic in else:
```java
// WRONG
int score = 75;

if (score < 60) {
    // Empty block
} else {
    System.out.println("Passed");
}
```
**Issue:** Empty if block serves no purpose - confusing

#### ✅ Right:
```java
// CORRECT
int score = 75;

if (score >= 60) {
    System.out.println("Passed");
}
```

**Why:** Empty blocks waste space and reduce readability.

**💡 Tip:** Invert the condition (< becomes >=) and remove the else block.

---

#### ❌ Wrong - Empty else Block:
```java
// WRONG
boolean isActive = true;

if (isActive) {
    activate();
} else {
    // Empty - why is this here?
}
```
**Issue:** Empty else adds no value

#### ✅ Right:
```java
// CORRECT
boolean isActive = true;

if (isActive) {
    activate();
}
// No else needed
```

**Why:** Remove empty else blocks - they add no logic.

**💡 Tip:** Only include else if there's actual alternative logic.

---

### 11. Ternary Operator Issues

#### ❌ Wrong - Complex Nested Ternary:
```java
// WRONG
int score = 85;
String grade = (score >= 90) ? "A" :
               (score >= 80) ? "B" :
               (score >= 70) ? "C" :
               (score >= 60) ? "D" : "F";
```
**Issue:** Difficult to read with multiple nested ternary operators

#### ✅ Right:
```java
// CORRECT
int score = 85;
String grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}
```

**Why:** Nested ternary operators reduce readability significantly.

**💡 Tip:** Use ternary only for simple two-way assignments; use if-else for complex logic.

---

#### ❌ Wrong - Side Effects in Ternary:
```java
// WRONG
int count = 0;
boolean flag = true;

String result = flag ? "Yes: " + ++count : "No: " + ++count;
```
**Issue:** Side effect (++count) in ternary is confusing

#### ✅ Right:
```java
// CORRECT
int count = 0;
boolean flag = true;
String result;

if (flag) {
    count++;
    result = "Yes: " + count;
} else {
    count++;
    result = "No: " + count;
}
```

**Why:** Side effects in ternary expressions are hard to track.

**💡 Tip:** Avoid side effects (++, --, assignments) in ternary expressions.

---

#### ❌ Wrong - Ternary for Complex Logic:
```java
// WRONG
String status = (user != null && user.isActive() &&
                user.hasPermission("admin")) ?
                "Authorized Admin" : "Unauthorized";
```
**Issue:** Complex condition in ternary reduces readability

#### ✅ Right:
```java
// CORRECT
String status;

if (user != null && user.isActive() && user.hasPermission("admin")) {
    status = "Authorized Admin";
} else {
    status = "Unauthorized";
}
```

**Why:** Complex conditions are clearer in if-else.

**💡 Tip:** Use ternary only for simple conditions: `int max = (a > b) ? a : b;`.

---

### 12. Type and Scope Issues

#### ❌ Wrong - Using long in switch:
```java
// WRONG
long id = 123456789L;

switch (id) {  // Compilation error!
    case 123456789L:
        System.out.println("Found");
        break;
}
```
**Issue:** switch doesn't support long type

#### ✅ Right:
```java
// CORRECT
long id = 123456789L;

if (id == 123456789L) {
    System.out.println("Found");
} else if (id == 987654321L) {
    System.out.println("Other ID");
}
```

**Why:** switch only works with int, byte, short, char, String, and enums.

**💡 Tip:** Use if-else for long, double, float, and boolean types.

---

#### ❌ Wrong - Variable Declared in if Not Accessible:
```java
// WRONG
if (score >= 60) {
    String grade = "Pass";
}

System.out.println(grade);  // Compilation error! Out of scope
```
**Issue:** Variable declared inside if block not accessible outside

#### ✅ Right:
```java
// CORRECT
String grade;  // Declare outside

if (score >= 60) {
    grade = "Pass";  // Assign inside
} else {
    grade = "Fail";
}

System.out.println(grade);  // Accessible here
```

**Why:** Variables are scoped to the block they're declared in.

**💡 Tip:** Declare variables in the outermost scope where they're needed.

---

This comprehensive list now contains **38+ conditional statement mistakes** covering every aspect of Day 4: Control Flow - Conditional Statements!

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