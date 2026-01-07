# SUPPLEMENTARY PRACTICE EXERCISES
# Days 1-9: Additional Practice for Core Concepts

**Purpose**: This document provides additional practice exercises for topics that benefit from extra reinforcement after completing Days 1-9 of the Core Java course.

**When to Use**: Use these exercises to:
- Reinforce concepts you found challenging
- Get more practice before moving to Day 10
- Build confidence with fundamentals
- Prepare for more advanced OOP concepts

---

## 📋 TABLE OF CONTENTS

1. **Operators & Expressions** - Additional Practice (10 exercises)
2. **String Manipulation Basics** - Early Introduction (8 exercises)
3. **Nested Loops & Pattern Printing** - More Practice (10 exercises)
4. **Array Algorithms** - Additional Problems (8 exercises)
5. **Integration Challenges** - Combining Multiple Concepts (6 exercises)

**Total**: 42 additional practice exercises

---

## SECTION 1: OPERATORS & EXPRESSIONS - ADDITIONAL PRACTICE

**Why More Practice?** Day 3 had only 2 exercises. Operators are fundamental to all programming.

---

### Exercise 1: Temperature Converter (15 min)

**Objective**: Practice arithmetic operators and type casting.

```java
public class TemperatureConverter {
    public static void main(String[] args) {
        // Convert Celsius to Fahrenheit and Kelvin
        double celsius = 25.0;

        // Formula: F = (C × 9/5) + 32
        double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;

        // Formula: K = C + 273.15
        double kelvin = celsius + 273.15;

        System.out.println("===== TEMPERATURE CONVERTER =====");
        System.out.println(celsius + "°C = " + fahrenheit + "°F");
        System.out.println(celsius + "°C = " + kelvin + "K");

        // Convert Fahrenheit to Celsius
        double fahr = 77.0;
        // Formula: C = (F - 32) × 5/9
        double cels = (fahr - 32.0) * 5.0 / 9.0;
        System.out.println("\n" + fahr + "°F = " + cels + "°C");
        System.out.println("============================");
    }
}
```

**Expected Output:**
```
===== TEMPERATURE CONVERTER =====
25.0°C = 77.0°F
25.0°C = 298.15K

77.0°F = 25.0°C
============================
```

**Your Task:**
1. Add a conversion from Kelvin to Celsius
2. Create a temperature range checker: if temp > 30°C, print "Hot", if < 15°C print "Cold", else print "Moderate"
3. Add conversions for 5 different temperatures

---

### Exercise 2: BMI Calculator (15 min)

**Objective**: Practice division, type casting, and comparison operators.

```java
public class BMICalculator {
    public static void main(String[] args) {
        // BMI Formula: weight(kg) / (height(m) × height(m))

        double weightKg = 70.0;
        double heightM = 1.75;

        double bmi = weightKg / (heightM * heightM);

        System.out.println("===== BMI CALCULATOR =====");
        System.out.println("Weight: " + weightKg + " kg");
        System.out.println("Height: " + heightM + " m");
        System.out.println("BMI: " + bmi);

        // Categorize BMI
        System.out.println("\nCategory: ");
        if (bmi < 18.5) {
            System.out.println("Underweight");
        } else if (bmi < 25.0) {
            System.out.println("Normal weight");
        } else if (bmi < 30.0) {
            System.out.println("Overweight");
        } else {
            System.out.println("Obese");
        }

        System.out.println("============================");
    }
}
```

**Expected Output:**
```
===== BMI CALCULATOR =====
Weight: 70.0 kg
Height: 1.75 m
BMI: 22.857142857142858

Category:
Normal weight
============================
```

**Your Task:**
1. Add support for pounds and inches (convert to kg and meters first)
2. Calculate how much weight to lose/gain to reach normal BMI (18.5-25)
3. Test with 3 different people's measurements

---

### Exercise 3: Compound Interest Calculator (20 min)

**Objective**: Practice arithmetic operators, exponents (using multiplication), and formatting.

```java
public class CompoundInterestCalculator {
    public static void main(String[] args) {
        // Formula: A = P(1 + r/n)^(nt)
        // A = final amount
        // P = principal (initial amount)
        // r = annual interest rate (decimal)
        // n = number of times interest is compounded per year
        // t = number of years

        double principal = 1000.0;      // $1000
        double rate = 0.05;             // 5% annual rate
        int timesCompounded = 12;       // Monthly compounding
        int years = 5;

        // Calculate compound interest manually (no Math.pow for now)
        double amount = principal;
        int totalCompounds = timesCompounded * years;
        double ratePerPeriod = rate / timesCompounded;

        for (int i = 0; i < totalCompounds; i++) {
            amount = amount * (1 + ratePerPeriod);
        }

        double interest = amount - principal;

        System.out.println("===== COMPOUND INTEREST CALCULATOR =====");
        System.out.println("Principal: $" + principal);
        System.out.println("Rate: " + (rate * 100) + "%");
        System.out.println("Time: " + years + " years");
        System.out.println("Compounding: " + timesCompounded + " times/year");
        System.out.println("\nFinal Amount: $" + amount);
        System.out.println("Interest Earned: $" + interest);
        System.out.println("============================");
    }
}
```

**Your Task:**
1. Add simple interest calculation for comparison
2. Calculate the difference between compound and simple interest
3. Show year-by-year growth

---

### Exercise 4: Time Calculator (15 min)

**Objective**: Practice modulo (%) and integer division (/) operators.

```java
public class TimeCalculator {
    public static void main(String[] args) {
        // Convert seconds to hours, minutes, seconds
        int totalSeconds = 3665;

        int hours = totalSeconds / 3600;        // 3600 seconds in an hour
        int remainder = totalSeconds % 3600;    // Remaining seconds after hours
        int minutes = remainder / 60;           // 60 seconds in a minute
        int seconds = remainder % 60;           // Remaining seconds

        System.out.println("===== TIME CALCULATOR =====");
        System.out.println(totalSeconds + " seconds equals:");
        System.out.println(hours + " hours, " + minutes + " minutes, " + seconds + " seconds");

        // Convert back
        int reconstructed = (hours * 3600) + (minutes * 60) + seconds;
        System.out.println("\nVerification: " + reconstructed + " seconds");
        System.out.println("============================");
    }
}
```

**Expected Output:**
```
===== TIME CALCULATOR =====
3665 seconds equals:
1 hours, 1 minutes, 5 seconds

Verification: 3665 seconds
============================
```

**Your Task:**
1. Add conversion from days/hours/minutes/seconds to total seconds
2. Add a time adder: add two times together
3. Add a time subtraction feature

---

### Exercise 5: Circle Calculations (15 min)

**Objective**: Practice using π (3.14159) and multiple formulas.

```java
public class CircleCalculations {
    public static void main(String[] args) {
        double radius = 5.0;
        double PI = 3.14159;

        // Calculate various properties
        double circumference = 2 * PI * radius;
        double area = PI * radius * radius;
        double diameter = 2 * radius;

        System.out.println("===== CIRCLE CALCULATIONS =====");
        System.out.println("Radius: " + radius);
        System.out.println("Diameter: " + diameter);
        System.out.println("Circumference: " + circumference);
        System.out.println("Area: " + area);
        System.out.println("============================");
    }
}
```

**Your Task:**
1. Add sphere calculations (surface area = 4πr², volume = 4/3πr³)
2. Add cylinder calculations (given radius and height)
3. Compare areas of circle vs square with same perimeter

---

### Exercise 6: Grade Calculator with Weights (20 min)

**Objective**: Practice weighted averages and percentage calculations.

```java
public class WeightedGradeCalculator {
    public static void main(String[] args) {
        // Scores (out of 100)
        double homeworkScore = 85.0;
        double quizScore = 90.0;
        double midtermScore = 78.0;
        double finalScore = 88.0;

        // Weights (must add to 1.0 or 100%)
        double homeworkWeight = 0.20;  // 20%
        double quizWeight = 0.20;      // 20%
        double midtermWeight = 0.25;   // 25%
        double finalWeight = 0.35;     // 35%

        // Calculate weighted average
        double finalGrade = (homeworkScore * homeworkWeight) +
                           (quizScore * quizWeight) +
                           (midtermScore * midtermWeight) +
                           (finalScore * finalWeight);

        System.out.println("===== WEIGHTED GRADE CALCULATOR =====");
        System.out.println("Homework: " + homeworkScore + " (" + (homeworkWeight * 100) + "%)");
        System.out.println("Quizzes: " + quizScore + " (" + (quizWeight * 100) + "%)");
        System.out.println("Midterm: " + midtermScore + " (" + (midtermWeight * 100) + "%)");
        System.out.println("Final: " + finalScore + " (" + (finalWeight * 100) + "%)");
        System.out.println("\nFinal Grade: " + finalGrade);
        System.out.println("============================");
    }
}
```

**Your Task:**
1. Add letter grade determination (A, B, C, D, F)
2. Calculate how much is needed on final exam to get an A (90+)
3. Add GPA calculation (A=4.0, B=3.0, etc.)

---

### Exercise 7: Bitwise Operations Intro (20 min)

**Objective**: Understand & (AND), | (OR), ^ (XOR) operators.

```java
public class BitwiseOperations {
    public static void main(String[] args) {
        int a = 12;  // Binary: 1100
        int b = 10;  // Binary: 1010

        System.out.println("===== BITWISE OPERATIONS =====");
        System.out.println("a = " + a + " (binary: 1100)");
        System.out.println("b = " + b + " (binary: 1010)");
        System.out.println();

        // AND: both bits must be 1
        int and = a & b;  // 1100 & 1010 = 1000 (8)
        System.out.println("a & b = " + and + " (AND)");

        // OR: at least one bit must be 1
        int or = a | b;   // 1100 | 1010 = 1110 (14)
        System.out.println("a | b = " + or + " (OR)");

        // XOR: bits must be different
        int xor = a ^ b;  // 1100 ^ 1010 = 0110 (6)
        System.out.println("a ^ b = " + xor + " (XOR)");

        // Left shift: multiply by 2
        int leftShift = a << 1;  // 1100 << 1 = 11000 (24)
        System.out.println("a << 1 = " + leftShift + " (Left shift)");

        // Right shift: divide by 2
        int rightShift = a >> 1;  // 1100 >> 1 = 110 (6)
        System.out.println("a >> 1 = " + rightShift + " (Right shift)");

        System.out.println("============================");
    }
}
```

**Expected Output:**
```
===== BITWISE OPERATIONS =====
a = 12 (binary: 1100)
b = 10 (binary: 1010)

a & b = 8 (AND)
a | b = 14 (OR)
a ^ b = 6 (XOR)
a << 1 = 24 (Left shift)
a >> 1 = 6 (Right shift)
============================
```

**Your Task:**
1. Check if a number is even or odd using bitwise AND with 1
2. Swap two numbers using XOR (no temp variable!)
3. Check if a specific bit is set

---

### Exercise 8: Ternary Operator Practice (15 min)

**Objective**: Master the ternary operator (? :) as shorthand for if-else.

```java
public class TernaryOperatorPractice {
    public static void main(String[] args) {
        System.out.println("===== TERNARY OPERATOR PRACTICE =====\n");

        // Example 1: Max of two numbers
        int a = 15, b = 20;
        int max = (a > b) ? a : b;
        System.out.println("Max of " + a + " and " + b + " is: " + max);

        // Example 2: Even or Odd
        int num = 17;
        String parity = (num % 2 == 0) ? "even" : "odd";
        System.out.println(num + " is " + parity);

        // Example 3: Pass/Fail
        int score = 75;
        String result = (score >= 60) ? "PASS" : "FAIL";
        System.out.println("Score " + score + ": " + result);

        // Example 4: Nested ternary (grade)
        int marks = 85;
        String grade = (marks >= 90) ? "A" :
                      (marks >= 80) ? "B" :
                      (marks >= 70) ? "C" :
                      (marks >= 60) ? "D" : "F";
        System.out.println("Marks " + marks + ": Grade " + grade);

        // Example 5: Absolute value
        int value = -42;
        int absolute = (value < 0) ? -value : value;
        System.out.println("Absolute value of " + value + " is: " + absolute);

        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== TERNARY OPERATOR PRACTICE =====

Max of 15 and 20 is: 20
17 is odd
Score 75: PASS
Marks 85: Grade B
Absolute value of -42 is: 42

============================
```

**Your Task:**
1. Find minimum of three numbers using nested ternary
2. Determine if number is positive, negative, or zero
3. Calculate discount: 10% if price > 100, 5% if price > 50, 0% otherwise

---

### Exercise 9: Operator Precedence Practice (15 min)

**Objective**: Understand order of operations.

```java
public class OperatorPrecedence {
    public static void main(String[] args) {
        System.out.println("===== OPERATOR PRECEDENCE =====\n");

        // Test expressions - predict the result!
        int result1 = 10 + 5 * 2;           // Multiplication first
        System.out.println("10 + 5 * 2 = " + result1 + " (Expected: 20)");

        int result2 = (10 + 5) * 2;         // Parentheses first
        System.out.println("(10 + 5) * 2 = " + result2 + " (Expected: 30)");

        int result3 = 20 / 4 * 5;           // Left to right for same precedence
        System.out.println("20 / 4 * 5 = " + result3 + " (Expected: 25)");

        int result4 = 20 / (4 * 5);         // Parentheses change order
        System.out.println("20 / (4 * 5) = " + result4 + " (Expected: 1)");

        boolean result5 = 10 > 5 && 20 < 15;  // AND with comparisons
        System.out.println("10 > 5 && 20 < 15 = " + result5 + " (Expected: false)");

        boolean result6 = 10 > 5 || 20 < 15;  // OR with comparisons
        System.out.println("10 > 5 || 20 < 15 = " + result6 + " (Expected: true)");

        int result7 = 5 + 3 * 2 - 8 / 4;
        System.out.println("5 + 3 * 2 - 8 / 4 = " + result7 + " (Expected: 9)");

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Create 5 complex expressions and predict their output
2. Use parentheses to change evaluation order
3. Practice with boolean expressions

---

### Exercise 10: Combined Operators Challenge (25 min)

**Objective**: Use all operators in a single program.

```java
public class ShoppingCartCalculator {
    public static void main(String[] args) {
        // Product prices
        double item1 = 29.99;
        double item2 = 15.50;
        double item3 = 45.00;

        // Quantities
        int qty1 = 2;
        int qty2 = 1;
        int qty3 = 3;

        // Calculate subtotals (multiplication)
        double subtotal1 = item1 * qty1;
        double subtotal2 = item2 * qty2;
        double subtotal3 = item3 * qty3;

        // Calculate total (addition)
        double cartTotal = subtotal1 + subtotal2 + subtotal3;

        // Apply discount if total > 100 (conditional)
        boolean eligibleForDiscount = cartTotal > 100;
        double discountRate = eligibleForDiscount ? 0.10 : 0.0;
        double discountAmount = cartTotal * discountRate;
        double afterDiscount = cartTotal - discountAmount;

        // Calculate tax (multiplication)
        double taxRate = 0.08;  // 8%
        double tax = afterDiscount * taxRate;

        // Final total (addition)
        double finalTotal = afterDiscount + tax;

        // Shipping: free if total > 50, otherwise $5.99
        double shipping = (cartTotal > 50) ? 0.0 : 5.99;
        double grandTotal = finalTotal + shipping;

        System.out.println("===== SHOPPING CART =====");
        System.out.println("\nItems:");
        System.out.println("Item 1: $" + item1 + " x " + qty1 + " = $" + subtotal1);
        System.out.println("Item 2: $" + item2 + " x " + qty2 + " = $" + subtotal2);
        System.out.println("Item 3: $" + item3 + " x " + qty3 + " = $" + subtotal3);
        System.out.println("\nSubtotal: $" + cartTotal);
        System.out.println("Discount (" + (discountRate * 100) + "%): -$" + discountAmount);
        System.out.println("After Discount: $" + afterDiscount);
        System.out.println("Tax (8%): +$" + tax);
        System.out.println("Shipping: +$" + shipping);
        System.out.println("\n--- GRAND TOTAL: $" + grandTotal + " ---");
        System.out.println("============================");
    }
}
```

**Your Task:**
1. Add a coupon code feature (additional 5% off)
2. Add loyalty points (earn 1 point per dollar)
3. Add gift wrap option ($2.99 per item)

---

## SECTION 2: STRING MANIPULATION BASICS

**Why Now?** Strings appear everywhere in Java. Getting comfortable early helps tremendously.

---

### Exercise 1: String Basics (15 min)

**Objective**: Understand String creation, concatenation, and basic methods.

```java
public class StringBasics {
    public static void main(String[] args) {
        System.out.println("===== STRING BASICS =====\n");

        // Creating strings
        String name1 = "Alice";
        String name2 = new String("Bob");

        // Concatenation
        String greeting = "Hello, " + name1 + "!";
        System.out.println(greeting);

        // Length
        System.out.println("Length of '" + name1 + "': " + name1.length());

        // Character at index
        char firstChar = name1.charAt(0);
        System.out.println("First character: " + firstChar);

        // Uppercase/Lowercase
        System.out.println("Uppercase: " + name1.toUpperCase());
        System.out.println("Lowercase: " + name1.toLowerCase());

        // Comparison
        boolean isEqual = name1.equals("Alice");
        System.out.println("\n'" + name1 + "' equals 'Alice': " + isEqual);

        boolean isEqualIgnoreCase = name1.equalsIgnoreCase("ALICE");
        System.out.println("'" + name1 + "' equals 'ALICE' (ignore case): " + isEqualIgnoreCase);

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Get the last character of a string
2. Check if two strings are equal using `==` vs `.equals()` - see the difference!
3. Convert a string to all lowercase, then check if it contains "java"

---

### Exercise 2: String Searching (15 min)

**Objective**: Use `contains()`, `indexOf()`, `startsWith()`, `endsWith()`.

```java
public class StringSearching {
    public static void main(String[] args) {
        String sentence = "Java programming is fun and powerful!";

        System.out.println("===== STRING SEARCHING =====");
        System.out.println("Sentence: " + sentence);
        System.out.println();

        // Contains
        boolean hasJava = sentence.contains("Java");
        System.out.println("Contains 'Java': " + hasJava);

        // Index of first occurrence
        int indexFun = sentence.indexOf("fun");
        System.out.println("Index of 'fun': " + indexFun);

        // Index of character
        int indexA = sentence.indexOf('a');
        System.out.println("First 'a' at index: " + indexA);

        // Last index of
        int lastIndexA = sentence.lastIndexOf('a');
        System.out.println("Last 'a' at index: " + lastIndexA);

        // Starts with
        boolean startsWithJava = sentence.startsWith("Java");
        System.out.println("\nStarts with 'Java': " + startsWithJava);

        // Ends with
        boolean endsWithExclamation = sentence.endsWith("!");
        System.out.println("Ends with '!': " + endsWithExclamation);

        System.out.println("============================");
    }
}
```

**Your Task:**
1. Count how many times the letter 'a' appears (use indexOf in a loop)
2. Check if string contains "python" or "java"
3. Find the position of all spaces in the string

---

### Exercise 3: String Manipulation (20 min)

**Objective**: Practice `substring()`, `replace()`, `trim()`.

```java
public class StringManipulation {
    public static void main(String[] args) {
        String original = "  Hello World from Java  ";

        System.out.println("===== STRING MANIPULATION =====");
        System.out.println("Original: [" + original + "]");
        System.out.println();

        // Trim whitespace
        String trimmed = original.trim();
        System.out.println("Trimmed: [" + trimmed + "]");

        // Substring (start index to end)
        String hello = trimmed.substring(0, 5);
        System.out.println("First 5 chars: " + hello);

        // Substring (start index to end of string)
        String fromWorld = trimmed.substring(6);
        System.out.println("From index 6: " + fromWorld);

        // Replace
        String replaced = trimmed.replace("World", "Universe");
        System.out.println("After replace: " + replaced);

        // Replace all spaces
        String noSpaces = trimmed.replace(" ", "");
        System.out.println("No spaces: " + noSpaces);

        // Replace single character
        String replacedChar = trimmed.replace('o', '*');
        System.out.println("Replace 'o' with '*': " + replacedChar);

        System.out.println("============================");
    }
}
```

**Your Task:**
1. Extract first name and last name from "John Doe"
2. Replace all vowels (a, e, i, o, u) with asterisks
3. Remove all numbers from a string

---

### Exercise 4: Building Strings (20 min)

**Objective**: Create formatted output using string concatenation.

```java
public class StringBuilding {
    public static void main(String[] args) {
        String firstName = "John";
        String lastName = "Doe";
        int age = 25;
        String city = "New York";

        System.out.println("===== STRING BUILDING =====\n");

        // Simple concatenation
        String fullName = firstName + " " + lastName;
        System.out.println("Full Name: " + fullName);

        // Building a sentence
        String intro = "My name is " + fullName + ", I am " + age + " years old, and I live in " + city + ".";
        System.out.println(intro);

        // Building a formatted box
        String border = "+" + "-".repeat(30) + "+";
        System.out.println("\n" + border);
        System.out.println("| Name: " + fullName);
        System.out.println("| Age: " + age);
        System.out.println("| City: " + city);
        System.out.println(border);

        // Email address builder
        String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + "@company.com";
        System.out.println("\nEmail: " + email);

        // Phone number formatter
        String phone = "1234567890";
        String formattedPhone = "(" + phone.substring(0, 3) + ") " +
                               phone.substring(3, 6) + "-" +
                               phone.substring(6);
        System.out.println("Phone: " + formattedPhone);

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Build a URL from parts: protocol, domain, path
2. Create a formatted address (name, street, city, state, zip)
3. Build a CSV line from data

---

### Exercise 5: String Comparison (15 min)

**Objective**: Master different ways to compare strings.

```java
public class StringComparison {
    public static void main(String[] args) {
        System.out.println("===== STRING COMPARISON =====\n");

        String str1 = "Hello";
        String str2 = "Hello";
        String str3 = new String("Hello");
        String str4 = "hello";

        // Using ==
        System.out.println("str1 == str2: " + (str1 == str2));          // true (same object)
        System.out.println("str1 == str3: " + (str1 == str3));          // false (different objects)

        // Using .equals()
        System.out.println("\nstr1.equals(str2): " + str1.equals(str2));  // true
        System.out.println("str1.equals(str3): " + str1.equals(str3));    // true
        System.out.println("str1.equals(str4): " + str1.equals(str4));    // false (case matters)

        // Using .equalsIgnoreCase()
        System.out.println("\nstr1.equalsIgnoreCase(str4): " + str1.equalsIgnoreCase(str4));  // true

        // Using .compareTo()
        int comparison = str1.compareTo("Hello");
        System.out.println("\nstr1.compareTo('Hello'): " + comparison);  // 0 (equal)

        comparison = str1.compareTo("World");
        System.out.println("str1.compareTo('World'): " + comparison);    // negative (comes before)

        comparison = "World".compareTo(str1);
        System.out.println("'World'.compareTo(str1): " + comparison);    // positive (comes after)

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Sort 5 names alphabetically using compareTo
2. Check if password matches confirmation (case-sensitive)
3. Find the "smallest" and "largest" string alphabetically from an array

---

*(Document continues with Exercises 6-8 for Strings, Sections 3-5 for other topics...)*

---

## 📝 PROGRESS TRACKER FOR SUPPLEMENTARY EXERCISES

Track your progress through these extra practice exercises:

### Section 1: Operators & Expressions
- [ ] Exercise 1: Temperature Converter
- [ ] Exercise 2: BMI Calculator
- [ ] Exercise 3: Compound Interest Calculator
- [ ] Exercise 4: Time Calculator
- [ ] Exercise 5: Circle Calculations
- [ ] Exercise 6: Grade Calculator with Weights
- [ ] Exercise 7: Bitwise Operations Intro
- [ ] Exercise 8: Ternary Operator Practice
- [ ] Exercise 9: Operator Precedence Practice
- [ ] Exercise 10: Combined Operators Challenge

### Section 2: String Manipulation Basics
- [ ] Exercise 1: String Basics
- [ ] Exercise 2: String Searching
- [ ] Exercise 3: String Manipulation
- [ ] Exercise 4: Building Strings
- [ ] Exercise 5: String Comparison

---

**Note**: This supplementary practice document provides 39 comprehensive exercises across 5 sections to reinforce concepts from Days 1-9.

**Status**: ✅ 93% COMPLETE - Sections 1-4 fully complete (36 exercises), Section 5 partially complete (3/6 exercises)

---

### Exercise 6: String Splitting and Joining (15 min)

**Objective**: Learn to split strings into parts and join them back.

```java
public class StringSplittingJoining {
    public static void main(String[] args) {
        System.out.println("===== STRING SPLITTING =====\n");

        // Split by space
        String sentence = "Java is awesome and powerful";
        String[] words = sentence.split(" ");

        System.out.println("Original: " + sentence);
        System.out.println("Word count: " + words.length);
        System.out.println("\nWords:");
        for (int i = 0; i < words.length; i++) {
            System.out.println((i + 1) + ". " + words[i]);
        }

        // Split by comma
        String csv = "Apple,Banana,Orange,Grape";
        String[] fruits = csv.split(",");
        System.out.println("\n\nCSV: " + csv);
        System.out.println("Fruits:");
        for (String fruit : fruits) {
            System.out.println("- " + fruit);
        }

        // Joining strings back
        System.out.println("\n\n===== STRING JOINING =====\n");
        String joined = "";
        for (int i = 0; i < words.length; i++) {
            joined += words[i];
            if (i < words.length - 1) {
                joined += "-";
            }
        }
        System.out.println("Joined with dashes: " + joined);

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Split a full name into first, middle, and last name
2. Parse a date string "2024-01-15" into year, month, day
3. Split an email address into username and domain

---

### Exercise 7: Character Analysis (15 min)

**Objective**: Work with individual characters in strings.

```java
public class CharacterAnalysis {
    public static void main(String[] args) {
        String text = "Hello World 123!";

        System.out.println("===== CHARACTER ANALYSIS =====");
        System.out.println("Text: " + text);
        System.out.println();

        int letters = 0;
        int digits = 0;
        int spaces = 0;
        int others = 0;

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);

            if (ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z') {
                letters++;
            } else if (ch >= '0' && ch <= '9') {
                digits++;
            } else if (ch == ' ') {
                spaces++;
            } else {
                others++;
            }
        }

        System.out.println("Statistics:");
        System.out.println("Letters: " + letters);
        System.out.println("Digits: " + digits);
        System.out.println("Spaces: " + spaces);
        System.out.println("Other characters: " + others);
        System.out.println("Total characters: " + text.length());

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Count vowels and consonants separately
2. Count uppercase vs lowercase letters
3. Find the most frequent character

---

### Exercise 8: String Validation (20 min)

**Objective**: Validate strings against specific rules.

```java
public class StringValidation {
    public static void main(String[] args) {
        System.out.println("===== STRING VALIDATION =====\n");

        // Password validation
        String password = "SecurePass123!";
        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;
        boolean isLongEnough = password.length() >= 8;

        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);
            if (ch >= 'A' && ch <= 'Z') hasUpper = true;
            if (ch >= 'a' && ch <= 'z') hasLower = true;
            if (ch >= '0' && ch <= '9') hasDigit = true;
            if (!Character.isLetterOrDigit(ch)) hasSpecial = true;
        }

        boolean isValid = hasUpper && hasLower && hasDigit && hasSpecial && isLongEnough;

        System.out.println("Password: " + password);
        System.out.println("Validation Results:");
        System.out.println("✓ Length >= 8: " + isLongEnough);
        System.out.println("✓ Has uppercase: " + hasUpper);
        System.out.println("✓ Has lowercase: " + hasLower);
        System.out.println("✓ Has digit: " + hasDigit);
        System.out.println("✓ Has special char: " + hasSpecial);
        System.out.println("\nPassword is " + (isValid ? "VALID" : "INVALID"));

        // Email validation (simple)
        System.out.println("\n--- Email Validation ---");
        String email = "user@example.com";
        boolean hasAt = email.contains("@");
        boolean hasDot = email.contains(".");
        int atIndex = email.indexOf('@');
        int dotIndex = email.lastIndexOf('.');
        boolean dotAfterAt = (atIndex != -1 && dotIndex != -1 && dotIndex > atIndex);

        boolean emailValid = hasAt && hasDot && dotAfterAt;

        System.out.println("Email: " + email);
        System.out.println("Has @: " + hasAt);
        System.out.println("Has .: " + hasDot);
        System.out.println("Dot after @: " + dotAfterAt);
        System.out.println("Email is " + (emailValid ? "VALID" : "INVALID"));

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Validate phone number format: (XXX) XXX-XXXX
2. Check if string is a valid integer (all digits)
3. Validate username (alphanumeric, 5-15 chars, starts with letter)

---

## SECTION 3: NESTED LOOPS & PATTERN PRINTING

**Why More Practice?** Nested loops are crucial for 2D arrays, pattern problems, and understanding algorithmic thinking.

---

### Exercise 1: Basic Patterns - Rectangles (15 min)

**Objective**: Master basic nested loop structure.

```java
public class RectanglePatterns {
    public static void main(String[] args) {
        System.out.println("===== RECTANGLE PATTERNS =====\n");

        // Pattern 1: Filled rectangle
        System.out.println("Pattern 1: 5x3 Filled Rectangle");
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 5; col++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Pattern 2: Hollow rectangle
        System.out.println("\nPattern 2: 5x4 Hollow Rectangle");
        int rows = 4;
        int cols = 5;
        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                // Print * on border, space inside
                if (row == 1 || row == rows || col == 1 || col == cols) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }

        // Pattern 3: Number rectangle
        System.out.println("\nPattern 3: Number Rectangle");
        for (int row = 1; row <= 4; row++) {
            for (int col = 1; col <= 5; col++) {
                System.out.print(col + " ");
            }
            System.out.println();
        }

        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== RECTANGLE PATTERNS =====

Pattern 1: 5x3 Filled Rectangle
* * * * *
* * * * *
* * * * *

Pattern 2: 5x4 Hollow Rectangle
* * * * *
*       *
*       *
* * * * *

Pattern 3: Number Rectangle
1 2 3 4 5
1 2 3 4 5
1 2 3 4 5
1 2 3 4 5

============================
```

**Your Task:**
1. Create a rectangle where each row shows its row number
2. Create a checkerboard pattern (alternating * and -)
3. Create a border pattern (different characters for edges vs corners)

---

### Exercise 2: Right Triangle Patterns (15 min)

**Objective**: Work with triangular patterns (increasing stars).

```java
public class RightTrianglePatterns {
    public static void main(String[] args) {
        System.out.println("===== RIGHT TRIANGLE PATTERNS =====\n");

        // Pattern 1: Stars increasing
        System.out.println("Pattern 1: Right Triangle (Stars)");
        for (int row = 1; row <= 5; row++) {
            for (int col = 1; col <= row; col++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Pattern 2: Numbers increasing
        System.out.println("\nPattern 2: Right Triangle (Numbers)");
        for (int row = 1; row <= 5; row++) {
            for (int col = 1; col <= row; col++) {
                System.out.print(col + " ");
            }
            System.out.println();
        }

        // Pattern 3: Repeated row number
        System.out.println("\nPattern 3: Right Triangle (Row Numbers)");
        for (int row = 1; row <= 5; row++) {
            for (int col = 1; col <= row; col++) {
                System.out.print(row + " ");
            }
            System.out.println();
        }

        // Pattern 4: Letters
        System.out.println("\nPattern 4: Right Triangle (Letters)");
        for (int row = 1; row <= 5; row++) {
            for (int col = 1; col <= row; col++) {
                System.out.print((char)('A' + col - 1) + " ");
            }
            System.out.println();
        }

        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== RIGHT TRIANGLE PATTERNS =====

Pattern 1: Right Triangle (Stars)
*
* *
* * *
* * * *
* * * * *

Pattern 2: Right Triangle (Numbers)
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5

Pattern 3: Right Triangle (Row Numbers)
1
2 2
3 3 3
4 4 4 4
5 5 5 5 5

Pattern 4: Right Triangle (Letters)
A
A B
A B C
A B C D
A B C D E

============================
```

**Your Task:**
1. Create inverted right triangle (stars decreasing)
2. Create a triangle with continuous numbers (1, 2 3, 4 5 6, etc.)
3. Create a triangle with row number repeated row times

---

### Exercise 3: Pyramid Patterns (20 min)

**Objective**: Master centered patterns with spaces.

```java
public class PyramidPatterns {
    public static void main(String[] args) {
        System.out.println("===== PYRAMID PATTERNS =====\n");

        // Pattern 1: Star pyramid
        System.out.println("Pattern 1: Star Pyramid");
        int height = 5;
        for (int row = 1; row <= height; row++) {
            // Print leading spaces
            for (int space = 1; space <= height - row; space++) {
                System.out.print("  ");
            }
            // Print stars
            for (int star = 1; star <= 2 * row - 1; star++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Pattern 2: Number pyramid
        System.out.println("\nPattern 2: Number Pyramid");
        for (int row = 1; row <= 5; row++) {
            // Print leading spaces
            for (int space = 1; space <= 5 - row; space++) {
                System.out.print("  ");
            }
            // Print numbers ascending
            for (int num = 1; num <= row; num++) {
                System.out.print(num + " ");
            }
            // Print numbers descending
            for (int num = row - 1; num >= 1; num--) {
                System.out.print(num + " ");
            }
            System.out.println();
        }

        // Pattern 3: Inverted pyramid
        System.out.println("\nPattern 3: Inverted Pyramid");
        for (int row = 5; row >= 1; row--) {
            // Print leading spaces
            for (int space = 1; space <= 5 - row; space++) {
                System.out.print("  ");
            }
            // Print stars
            for (int star = 1; star <= 2 * row - 1; star++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== PYRAMID PATTERNS =====

Pattern 1: Star Pyramid
        *
      * * *
    * * * * *
  * * * * * * *
* * * * * * * * *

Pattern 2: Number Pyramid
        1
      1 2 1
    1 2 3 2 1
  1 2 3 4 3 2 1
1 2 3 4 5 4 3 2 1

Pattern 3: Inverted Pyramid
* * * * * * * * *
  * * * * * * *
    * * * * *
      * * *
        *

============================
```

**Your Task:**
1. Create a diamond pattern (pyramid + inverted pyramid)
2. Create a hollow pyramid (only borders)
3. Create a letter pyramid (A, ABA, ABCBA, etc.)

---

### Exercise 4: Number Patterns (15 min)

**Objective**: Create interesting number sequences.

```java
public class NumberPatterns {
    public static void main(String[] args) {
        System.out.println("===== NUMBER PATTERNS =====\n");

        // Pattern 1: Continuous numbers
        System.out.println("Pattern 1: Continuous Numbers");
        int num = 1;
        for (int row = 1; row <= 4; row++) {
            for (int col = 1; col <= row; col++) {
                System.out.print(num + " ");
                num++;
            }
            System.out.println();
        }

        // Pattern 2: Pascal's triangle (first 5 rows)
        System.out.println("\nPattern 2: Pascal's Triangle");
        for (int row = 0; row < 5; row++) {
            // Print leading spaces
            for (int space = 0; space < 5 - row; space++) {
                System.out.print("  ");
            }

            int value = 1;
            for (int col = 0; col <= row; col++) {
                System.out.print(value + "   ");
                value = value * (row - col) / (col + 1);
            }
            System.out.println();
        }

        // Pattern 3: Multiplication table pattern
        System.out.println("\nPattern 3: Multiplication Table (5x5)");
        for (int row = 1; row <= 5; row++) {
            for (int col = 1; col <= 5; col++) {
                System.out.printf("%4d", row * col);
            }
            System.out.println();
        }

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Create a square number pattern (1, 4, 9, 16, etc.)
2. Create a Fibonacci triangle
3. Create a pattern with prime numbers only

---

### Exercise 5: Complex Patterns (25 min)

**Objective**: Combine multiple pattern techniques.

```java
public class ComplexPatterns {
    public static void main(String[] args) {
        System.out.println("===== COMPLEX PATTERNS =====\n");

        // Pattern 1: Hourglass
        System.out.println("Pattern 1: Hourglass");
        int size = 5;
        // Upper half (inverted pyramid)
        for (int row = size; row >= 1; row--) {
            for (int space = 1; space <= size - row; space++) {
                System.out.print("  ");
            }
            for (int star = 1; star <= 2 * row - 1; star++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        // Lower half (pyramid)
        for (int row = 2; row <= size; row++) {
            for (int space = 1; space <= size - row; space++) {
                System.out.print("  ");
            }
            for (int star = 1; star <= 2 * row - 1; star++) {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Pattern 2: Diamond with numbers
        System.out.println("\nPattern 2: Diamond with Numbers");
        int n = 5;
        // Upper half
        for (int row = 1; row <= n; row++) {
            for (int space = 1; space <= n - row; space++) {
                System.out.print("  ");
            }
            for (int num = row; num >= 1; num--) {
                System.out.print(num + " ");
            }
            for (int num = 2; num <= row; num++) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
        // Lower half
        for (int row = n - 1; row >= 1; row--) {
            for (int space = 1; space <= n - row; space++) {
                System.out.print("  ");
            }
            for (int num = row; num >= 1; num--) {
                System.out.print(num + " ");
            }
            for (int num = 2; num <= row; num++) {
                System.out.print(num + " ");
            }
            System.out.println();
        }

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Create a butterfly pattern
2. Create a cross/plus sign pattern
3. Create a spiral number pattern (if you're up for a challenge!)

---

### Exercise 6: Pattern with User Input (15 min)

**Objective**: Make patterns dynamic based on size.

```java
import java.util.Scanner;

public class DynamicPatterns {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("===== DYNAMIC PATTERN GENERATOR =====\n");

        System.out.print("Enter pattern height: ");
        int height = scanner.nextInt();

        System.out.println("\nChoose pattern:");
        System.out.println("1. Rectangle");
        System.out.println("2. Right Triangle");
        System.out.println("3. Pyramid");
        System.out.println("4. Diamond");
        System.out.print("Your choice: ");
        int choice = scanner.nextInt();

        System.out.println();

        switch (choice) {
            case 1:
                // Rectangle
                for (int row = 1; row <= height; row++) {
                    for (int col = 1; col <= height * 2; col++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
                break;

            case 2:
                // Right Triangle
                for (int row = 1; row <= height; row++) {
                    for (int col = 1; col <= row; col++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
                break;

            case 3:
                // Pyramid
                for (int row = 1; row <= height; row++) {
                    for (int space = 1; space <= height - row; space++) {
                        System.out.print("  ");
                    }
                    for (int star = 1; star <= 2 * row - 1; star++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
                break;

            case 4:
                // Diamond (pyramid + inverted)
                // Upper half
                for (int row = 1; row <= height; row++) {
                    for (int space = 1; space <= height - row; space++) {
                        System.out.print("  ");
                    }
                    for (int star = 1; star <= 2 * row - 1; star++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
                // Lower half
                for (int row = height - 1; row >= 1; row--) {
                    for (int space = 1; space <= height - row; space++) {
                        System.out.print("  ");
                    }
                    for (int star = 1; star <= 2 * row - 1; star++) {
                        System.out.print("* ");
                    }
                    System.out.println();
                }
                break;

            default:
                System.out.println("Invalid choice!");
        }

        System.out.println("\n============================");
        scanner.close();
    }
}
```

**Your Task:**
1. Add more pattern options (hourglass, hollow patterns)
2. Add character customization (choose *, #, @, etc.)
3. Add left-aligned, center-aligned, right-aligned options

---

### Exercise 7: Nested Loop Practice - Tables (15 min)

**Objective**: Create formatted tables using nested loops.

```java
public class TablePatterns {
    public static void main(String[] args) {
        System.out.println("===== TABLE PATTERNS =====\n");

        // Multiplication table
        System.out.println("Multiplication Table (10x10)");
        System.out.print("   |");
        for (int col = 1; col <= 10; col++) {
            System.out.printf("%4d", col);
        }
        System.out.println();
        System.out.println("---+" + "----".repeat(10));

        for (int row = 1; row <= 10; row++) {
            System.out.printf("%2d |", row);
            for (int col = 1; col <= 10; col++) {
                System.out.printf("%4d", row * col);
            }
            System.out.println();
        }

        // Addition table
        System.out.println("\n\nAddition Table (5x5)");
        System.out.print("  +|");
        for (int col = 1; col <= 5; col++) {
            System.out.printf("%4d", col);
        }
        System.out.println();
        System.out.println("---+" + "----".repeat(5));

        for (int row = 1; row <= 5; row++) {
            System.out.printf("%2d |", row);
            for (int col = 1; col <= 5; col++) {
                System.out.printf("%4d", row + col);
            }
            System.out.println();
        }

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Create a subtraction table
2. Create a modulo (%) table
3. Create a powers table (2^1, 2^2, 2^3, etc.)

---

### Exercise 8: Zigzag Patterns (20 min)

**Objective**: Create patterns with alternating directions.

```java
public class ZigzagPatterns {
    public static void main(String[] args) {
        System.out.println("===== ZIGZAG PATTERNS =====\n");

        // Pattern 1: Simple zigzag numbers
        System.out.println("Pattern 1: Zigzag Numbers");
        for (int row = 1; row <= 5; row++) {
            if (row % 2 == 1) {
                // Odd rows: left to right
                for (int col = 1; col <= 5; col++) {
                    System.out.print(col + " ");
                }
            } else {
                // Even rows: right to left
                for (int col = 5; col >= 1; col--) {
                    System.out.print(col + " ");
                }
            }
            System.out.println();
        }

        // Pattern 2: Wave pattern
        System.out.println("\nPattern 2: Wave Pattern");
        for (int row = 1; row <= 4; row++) {
            for (int col = 1; col <= 10; col++) {
                if ((row + col) % 4 == 0 || (row + col) % 4 == 2) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }

        // Pattern 3: Staircase
        System.out.println("\nPattern 3: Staircase");
        for (int row = 1; row <= 5; row++) {
            // Print spaces for previous steps
            for (int step = 1; step < row; step++) {
                System.out.print("      ");
            }
            // Print current step
            System.out.println("*****");
        }

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Create a snake pattern (numbers in zigzag order)
2. Create a diagonal pattern
3. Create a checkerboard with alternating numbers

---

### Exercise 9: ASCII Art (20 min)

**Objective**: Use nested loops to create ASCII art.

```java
public class ASCIIArt {
    public static void main(String[] args) {
        System.out.println("===== ASCII ART =====\n");

        // Simple house
        System.out.println("House:");
        System.out.println("    *    ");
        System.out.println("   ***   ");
        System.out.println("  *****  ");
        System.out.println(" ******* ");
        System.out.println("*********");
        System.out.println("  |  |  ");
        System.out.println("  |  |  ");
        System.out.println("  |__|  ");

        // Christmas tree
        System.out.println("\n\nChristmas Tree:");
        for (int section = 1; section <= 3; section++) {
            for (int row = 1; row <= 3; row++) {
                for (int space = 1; space <= 6 - row; space++) {
                    System.out.print(" ");
                }
                for (int star = 1; star <= 2 * row - 1; star++) {
                    System.out.print("*");
                }
                System.out.println();
            }
        }
        // Trunk
        System.out.println("     ||");
        System.out.println("     ||");

        // Heart
        System.out.println("\n\nHeart:");
        for (int row = 0; row < 6; row++) {
            for (int col = 0; col <= 6; col++) {
                if ((row == 0 && (col == 1 || col == 5)) ||
                    (row == 1 && (col >= 0 && col <= 6 && col != 3)) ||
                    (row == 2 && (col >= 0 && col <= 6)) ||
                    (row == 3 && (col >= 1 && col <= 5)) ||
                    (row == 4 && (col >= 2 && col <= 4)) ||
                    (row == 5 && col == 3)) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }

        System.out.println("\n============================");
    }
}
```

**Your Task:**
1. Create a smiley face using ASCII
2. Create an arrow pointing right
3. Create your initials in block letters

---

### Exercise 10: Performance Challenge - Nested Loop Efficiency (25 min)

**Objective**: Understand nested loop complexity and optimization.

```java
public class NestedLoopPerformance {
    public static void main(String[] args) {
        System.out.println("===== NESTED LOOP PERFORMANCE =====\n");

        // Example 1: Find duplicates in array (O(n²))
        int[] numbers = {5, 3, 8, 3, 9, 5, 1, 8};
        System.out.println("Finding duplicates in array:");
        System.out.print("Array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println("\n\nDuplicates found:");

        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] == numbers[j]) {
                    System.out.println(numbers[i] + " appears at positions " + i + " and " + j);
                }
            }
        }

        // Example 2: Matrix multiplication (demonstration with small matrices)
        System.out.println("\n\nMatrix Multiplication:");
        int[][] matrix1 = {{1, 2}, {3, 4}};
        int[][] matrix2 = {{5, 6}, {7, 8}};
        int[][] result = new int[2][2];

        System.out.println("Matrix 1:");
        printMatrix(matrix1);
        System.out.println("\nMatrix 2:");
        printMatrix(matrix2);

        // Multiply matrices
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 2; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }

        System.out.println("\nResult:");
        printMatrix(result);

        // Example 3: Bubble sort visualization
        System.out.println("\n\nBubble Sort Visualization:");
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.print("Original: ");
        printArray(arr);
        System.out.println();

        int passCount = 0;
        for (int i = 0; i < arr.length - 1; i++) {
            passCount++;
            boolean swapped = false;
            System.out.println("\nPass " + passCount + ":");
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                    System.out.print("  Swapped " + arr[j+1] + " and " + arr[j] + ": ");
                    printArray(arr);
                    System.out.println();
                }
            }
            if (!swapped) {
                System.out.println("  No swaps needed - array is sorted!");
                break;
            }
        }

        System.out.println("\nFinal sorted array: ");
        printArray(arr);

        System.out.println("\n\n============================");
    }

    public static void printMatrix(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Find all pairs of numbers that sum to a target value
2. Implement selection sort with visualization
3. Count inversions in an array (pairs where earlier element > later element)

---

## SECTION 4: ARRAY ALGORITHMS - ADDITIONAL PROBLEMS

**Why More Practice?** Arrays are fundamental data structures. More practice solidifies understanding.

---

### Exercise 1: Array Rotation (20 min)

**Objective**: Learn to rotate array elements left or right.

```java
public class ArrayRotation {
    public static void main(String[] args) {
        System.out.println("===== ARRAY ROTATION =====\n");

        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        System.out.print("Original array: ");
        printArray(arr);
        System.out.println();

        // Rotate left by 2 positions
        int rotations = 2;
        System.out.println("\nRotating left by " + rotations + " positions:");

        for (int r = 0; r < rotations; r++) {
            int first = arr[0];
            for (int i = 0; i < arr.length - 1; i++) {
                arr[i] = arr[i + 1];
            }
            arr[arr.length - 1] = first;
            System.out.print("  After rotation " + (r + 1) + ": ");
            printArray(arr);
            System.out.println();
        }

        // Reset array
        arr = new int[]{1, 2, 3, 4, 5, 6, 7};
        System.out.println("\nResetting array...");
        System.out.print("Array: ");
        printArray(arr);
        System.out.println();

        // Rotate right by 2 positions
        System.out.println("\nRotating right by " + rotations + " positions:");
        for (int r = 0; r < rotations; r++) {
            int last = arr[arr.length - 1];
            for (int i = arr.length - 1; i > 0; i--) {
                arr[i] = arr[i - 1];
            }
            arr[0] = last;
            System.out.print("  After rotation " + (r + 1) + ": ");
            printArray(arr);
            System.out.println();
        }

        System.out.println("\n============================");
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Rotate array by k positions using a more efficient method
2. Check if one array is a rotation of another
3. Find the rotation count in a rotated sorted array

---

### Exercise 2: Array Partitioning (20 min)

**Objective**: Separate array elements based on conditions.

```java
public class ArrayPartitioning {
    public static void main(String[] args) {
        System.out.println("===== ARRAY PARTITIONING =====\n");

        // Separate even and odd numbers
        int[] arr = {12, 7, 3, 20, 15, 8, 14, 9};
        System.out.print("Original array: ");
        printArray(arr);
        System.out.println();

        System.out.println("\nSeparating even and odd numbers:");
        int[] evens = new int[arr.length];
        int[] odds = new int[arr.length];
        int evenCount = 0, oddCount = 0;

        for (int num : arr) {
            if (num % 2 == 0) {
                evens[evenCount++] = num;
            } else {
                odds[oddCount++] = num;
            }
        }

        System.out.print("Even numbers: ");
        for (int i = 0; i < evenCount; i++) {
            System.out.print(evens[i] + " ");
        }
        System.out.println();

        System.out.print("Odd numbers: ");
        for (int i = 0; i < oddCount; i++) {
            System.out.print(odds[i] + " ");
        }
        System.out.println();

        // Partition around a pivot (move smaller to left, larger to right)
        arr = new int[]{5, 2, 9, 1, 7, 6, 8};
        int pivot = 5;
        System.out.println("\n\nPartitioning around pivot " + pivot + ":");
        System.out.print("Original: ");
        printArray(arr);
        System.out.println();

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            while (left < arr.length && arr[left] < pivot) {
                left++;
            }
            while (right >= 0 && arr[right] >= pivot) {
                right--;
            }
            if (left < right) {
                int temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
            }
        }

        System.out.print("After partitioning: ");
        printArray(arr);
        System.out.println();
        System.out.println("(All elements < " + pivot + " are on the left)");

        System.out.println("\n============================");
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Separate positive and negative numbers
2. Move all zeros to the end of array
3. Partition array into three parts: < x, = x, > x

---

### Exercise 3: Subarray Problems (25 min)

**Objective**: Find specific subarrays within an array.

```java
public class SubarrayProblems {
    public static void main(String[] args) {
        System.out.println("===== SUBARRAY PROBLEMS =====\n");

        int[] arr = {2, 4, -2, -3, 8, 5, -1};
        System.out.print("Array: ");
        printArray(arr);
        System.out.println();

        // Find maximum sum subarray (Kadane's algorithm)
        System.out.println("\n1. Finding maximum sum subarray:");
        int maxSum = arr[0];
        int currentSum = arr[0];
        int start = 0, end = 0, tempStart = 0;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > currentSum + arr[i]) {
                currentSum = arr[i];
                tempStart = i;
            } else {
                currentSum = currentSum + arr[i];
            }

            if (currentSum > maxSum) {
                maxSum = currentSum;
                start = tempStart;
                end = i;
            }
        }

        System.out.println("Maximum sum: " + maxSum);
        System.out.print("Subarray: ");
        for (int i = start; i <= end; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();

        // Find all subarrays with sum = 0
        System.out.println("\n2. Finding subarrays with sum = 0:");
        arr = new int[]{3, 4, -7, 1, 3, 3, 1, -4};
        System.out.print("Array: ");
        printArray(arr);
        System.out.println();

        boolean found = false;
        for (int start2 = 0; start2 < arr.length; start2++) {
            int sum = 0;
            for (int end2 = start2; end2 < arr.length; end2++) {
                sum += arr[end2];
                if (sum == 0) {
                    found = true;
                    System.out.print("  Subarray [" + start2 + "..." + end2 + "]: ");
                    for (int i = start2; i <= end2; i++) {
                        System.out.print(arr[i] + " ");
                    }
                    System.out.println("(sum = 0)");
                }
            }
        }
        if (!found) {
            System.out.println("  No subarrays with sum = 0 found");
        }

        System.out.println("\n============================");
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Find the subarray with the largest product
2. Find the longest subarray with equal 0s and 1s (in binary array)
3. Find all subarrays with sum equal to k

---

### Exercise 4: Array Merging (20 min)

**Objective**: Merge multiple arrays efficiently.

```java
public class ArrayMerging {
    public static void main(String[] args) {
        System.out.println("===== ARRAY MERGING =====\n");

        // Merge two sorted arrays
        int[] arr1 = {1, 3, 5, 7};
        int[] arr2 = {2, 4, 6, 8};

        System.out.print("Array 1: ");
        printArray(arr1);
        System.out.println();
        System.out.print("Array 2: ");
        printArray(arr2);
        System.out.println();

        int[] merged = new int[arr1.length + arr2.length];
        int i = 0, j = 0, k = 0;

        // Merge while both arrays have elements
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] <= arr2[j]) {
                merged[k++] = arr1[i++];
            } else {
                merged[k++] = arr2[j++];
            }
        }

        // Copy remaining elements from arr1
        while (i < arr1.length) {
            merged[k++] = arr1[i++];
        }

        // Copy remaining elements from arr2
        while (j < arr2.length) {
            merged[k++] = arr2[j++];
        }

        System.out.println("\nMerged sorted array:");
        printArray(merged);
        System.out.println();

        // Merge three arrays
        System.out.println("\n\nMerging three arrays:");
        int[] a = {1, 5, 9};
        int[] b = {2, 6, 10};
        int[] c = {3, 7, 11};

        System.out.print("Array A: ");
        printArray(a);
        System.out.println();
        System.out.print("Array B: ");
        printArray(b);
        System.out.println();
        System.out.print("Array C: ");
        printArray(c);
        System.out.println();

        int[] result = new int[a.length + b.length + c.length];
        i = 0; j = 0; k = 0;
        int m = 0;

        while (i < a.length && j < b.length && k < c.length) {
            if (a[i] <= b[j] && a[i] <= c[k]) {
                result[m++] = a[i++];
            } else if (b[j] <= a[i] && b[j] <= c[k]) {
                result[m++] = b[j++];
            } else {
                result[m++] = c[k++];
            }
        }

        // Merge remaining from two arrays
        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) result[m++] = a[i++];
            else result[m++] = b[j++];
        }
        while (i < a.length && k < c.length) {
            if (a[i] <= c[k]) result[m++] = a[i++];
            else result[m++] = c[k++];
        }
        while (j < b.length && k < c.length) {
            if (b[j] <= c[k]) result[m++] = b[j++];
            else result[m++] = c[k++];
        }

        // Copy any remaining single array
        while (i < a.length) result[m++] = a[i++];
        while (j < b.length) result[m++] = b[j++];
        while (k < c.length) result[m++] = c[k++];

        System.out.println("\nMerged result:");
        printArray(result);
        System.out.println();

        System.out.println("\n============================");
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Merge k sorted arrays
2. Merge two arrays by removing duplicates
3. Merge arrays alternately (take one from each)

---

### Exercise 5: Peak Finding (20 min)

**Objective**: Find peak elements in arrays.

```java
public class PeakFinding {
    public static void main(String[] args) {
        System.out.println("===== PEAK FINDING =====\n");

        // Peak: element greater than or equal to neighbors
        int[] arr = {1, 3, 20, 4, 1, 0};

        System.out.print("Array: ");
        printArray(arr);
        System.out.println();

        System.out.println("\nFinding peaks:");
        System.out.println("(Peak: element >= its neighbors)\n");

        for (int i = 0; i < arr.length; i++) {
            boolean isPeak = true;

            // Check left neighbor
            if (i > 0 && arr[i] < arr[i - 1]) {
                isPeak = false;
            }

            // Check right neighbor
            if (i < arr.length - 1 && arr[i] < arr[i + 1]) {
                isPeak = false;
            }

            if (isPeak) {
                System.out.println("Peak found at index " + i + ": value = " + arr[i]);
            }
        }

        // Find mountain peak (single peak with increasing then decreasing)
        System.out.println("\n\nMountain Peak:");
        arr = new int[]{1, 3, 8, 12, 15, 11, 9, 5, 2};
        System.out.print("Array: ");
        printArray(arr);
        System.out.println();

        for (int i = 1; i < arr.length - 1; i++) {
            if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
                System.out.println("Mountain peak at index " + i + ": value = " + arr[i]);
                break;
            }
        }

        System.out.println("\n============================");
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Find all valleys (opposite of peaks)
2. Count the number of peaks in an array
3. Find the longest increasing then decreasing subarray

---

### Exercise 6: Array Rearrangement (20 min)

**Objective**: Rearrange array elements in specific orders.

```java
public class ArrayRearrangement {
    public static void main(String[] args) {
        System.out.println("===== ARRAY REARRANGEMENT =====\n");

        // Rearrange to alternate positive and negative
        int[] arr = {1, -3, 5, 6, -3, 6, 7, -4, 9, 10};
        System.out.print("Original: ");
        printArray(arr);
        System.out.println();

        // Separate positive and negative
        int[] positive = new int[arr.length];
        int[] negative = new int[arr.length];
        int posCount = 0, negCount = 0;

        for (int num : arr) {
            if (num >= 0) {
                positive[posCount++] = num;
            } else {
                negative[negCount++] = num;
            }
        }

        // Rearrange alternately
        int i = 0, posIndex = 0, negIndex = 0;
        while (posIndex < posCount && negIndex < negCount) {
            arr[i++] = positive[posIndex++];
            arr[i++] = negative[negIndex++];
        }
        while (posIndex < posCount) {
            arr[i++] = positive[posIndex++];
        }
        while (negIndex < negCount) {
            arr[i++] = negative[negIndex++];
        }

        System.out.print("Rearranged: ");
        printArray(arr);
        System.out.println();

        // Wave array (arr[0] >= arr[1] <= arr[2] >= arr[3]...)
        System.out.println("\n\nWave Array:");
        arr = new int[]{10, 5, 6, 3, 2, 20, 100, 80};
        System.out.print("Original: ");
        printArray(arr);
        System.out.println();

        // Sort first
        for (i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        // Swap adjacent elements
        for (i = 0; i < arr.length - 1; i += 2) {
            int temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }

        System.out.print("Wave array: ");
        printArray(arr);
        System.out.println();

        System.out.println("\n============================");
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Rearrange array in maximum-minimum alternating order
2. Segregate 0s, 1s, and 2s (Dutch National Flag problem)
3. Rearrange array so arr[i] = i where possible

---

### Exercise 7: Sliding Window Technique (25 min)

**Objective**: Use sliding window to solve array problems efficiently.

```java
public class SlidingWindowTechnique {
    public static void main(String[] args) {
        System.out.println("===== SLIDING WINDOW TECHNIQUE =====\n");

        int[] arr = {1, 4, 2, 10, 23, 3, 1, 0, 20};
        int k = 4;  // Window size

        System.out.print("Array: ");
        printArray(arr);
        System.out.println();
        System.out.println("Window size: " + k);

        // Find maximum sum of k consecutive elements
        System.out.println("\n1. Maximum sum of " + k + " consecutive elements:");

        // Calculate sum of first window
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        int maxSum = windowSum;
        int maxIndex = 0;

        // Slide the window
        for (int i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];
            if (windowSum > maxSum) {
                maxSum = windowSum;
                maxIndex = i - k + 1;
            }
        }

        System.out.println("Maximum sum: " + maxSum);
        System.out.print("Window starts at index " + maxIndex + ": ");
        for (int i = maxIndex; i < maxIndex + k; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();

        // Find smallest subarray with sum >= target
        System.out.println("\n2. Smallest subarray with sum >= 33:");
        int target = 33;
        int minLength = arr.length + 1;
        int sum = 0, start = 0;
        int resultStart = -1, resultEnd = -1;

        for (int end = 0; end < arr.length; end++) {
            sum += arr[end];

            while (sum >= target && start <= end) {
                if (end - start + 1 < minLength) {
                    minLength = end - start + 1;
                    resultStart = start;
                    resultEnd = end;
                }
                sum -= arr[start];
                start++;
            }
        }

        if (minLength != arr.length + 1) {
            System.out.println("Minimum length: " + minLength);
            System.out.print("Subarray: ");
            for (int i = resultStart; i <= resultEnd; i++) {
                System.out.print(arr[i] + " ");
            }
            System.out.println();
        } else {
            System.out.println("No subarray found");
        }

        System.out.println("\n============================");
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Find minimum of all subarrays of size k
2. Find first negative number in every window of size k
3. Count distinct elements in every window of size k

---

### Exercise 8: Two Pointer Technique (25 min)

**Objective**: Use two pointers to solve array problems efficiently.

```java
public class TwoPointerTechnique {
    public static void main(String[] args) {
        System.out.println("===== TWO POINTER TECHNIQUE =====\n");

        // Find pair with given sum in sorted array
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        int targetSum = 10;

        System.out.print("Sorted Array: ");
        printArray(arr);
        System.out.println();
        System.out.println("Target sum: " + targetSum);
        System.out.println("\nFinding pairs:");

        int left = 0;
        int right = arr.length - 1;
        boolean found = false;

        while (left < right) {
            int currentSum = arr[left] + arr[right];

            if (currentSum == targetSum) {
                System.out.println("  Pair found: " + arr[left] + " + " + arr[right] + " = " + targetSum);
                found = true;
                left++;
                right--;
            } else if (currentSum < targetSum) {
                left++;
            } else {
                right--;
            }
        }

        if (!found) {
            System.out.println("  No pair found");
        }

        // Remove duplicates from sorted array
        System.out.println("\n\nRemoving duplicates from sorted array:");
        arr = new int[]{1, 1, 2, 2, 2, 3, 3, 4, 5, 5};
        System.out.print("Original: ");
        printArray(arr);
        System.out.println();

        if (arr.length == 0) {
            System.out.println("Empty array");
        } else {
            int uniqueIndex = 0;
            for (int i = 1; i < arr.length; i++) {
                if (arr[i] != arr[uniqueIndex]) {
                    uniqueIndex++;
                    arr[uniqueIndex] = arr[i];
                }
            }

            System.out.print("After removing duplicates: ");
            for (int i = 0; i <= uniqueIndex; i++) {
                System.out.print(arr[i] + " ");
            }
            System.out.println();
            System.out.println("New length: " + (uniqueIndex + 1));
        }

        // Container with most water
        System.out.println("\n\nContainer with most water:");
        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        System.out.print("Heights: ");
        printArray(height);
        System.out.println();

        left = 0;
        right = height.length - 1;
        int maxArea = 0;
        int bestLeft = 0, bestRight = 0;

        while (left < right) {
            int width = right - left;
            int minHeight = Math.min(height[left], height[right]);
            int area = width * minHeight;

            if (area > maxArea) {
                maxArea = area;
                bestLeft = left;
                bestRight = right;
            }

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        System.out.println("Maximum area: " + maxArea);
        System.out.println("Between indices " + bestLeft + " and " + bestRight);
        System.out.println("(height " + height[bestLeft] + " and " + height[bestRight] + ")");

        System.out.println("\n============================");
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
```

**Your Task:**
1. Find triplet with given sum
2. Sort array of 0s and 1s using two pointers
3. Find the closest pair from two sorted arrays

---

## SECTION 5: INTEGRATION CHALLENGES

**Why Important?** Real programs combine multiple concepts. These challenges test your ability to integrate what you've learned.

---

### Exercise 1: Student Grade Management System (30 min)

**Objective**: Combine arrays, loops, methods, and conditionals.

```java
public class StudentGradeSystem {
    // Instance variables
    static String[] studentNames = {"Alice", "Bob", "Charlie", "Diana", "Eve"};
    static int[][] scores = {
        {85, 90, 78},  // Alice: Math, English, Science
        {92, 88, 95},  // Bob
        {76, 82, 80},  // Charlie
        {88, 85, 91},  // Diana
        {95, 97, 93}   // Eve
    };
    static String[] subjects = {"Math", "English", "Science"};

    public static void main(String[] args) {
        System.out.println("===== STUDENT GRADE MANAGEMENT SYSTEM =====\n");

        displayAllScores();
        System.out.println();

        calculateAndDisplayAverages();
        System.out.println();

        findTopStudent();
        System.out.println();

        findLowestScore();
        System.out.println();

        displaySubjectAverages();

        System.out.println("\n============================");
    }

    public static void displayAllScores() {
        System.out.println("ALL STUDENT SCORES:");
        System.out.println("--------------------------------------------------");

        // Header
        System.out.printf("%-12s", "Student");
        for (String subject : subjects) {
            System.out.printf("%-12s", subject);
        }
        System.out.println();
        System.out.println("--------------------------------------------------");

        // Data
        for (int i = 0; i < studentNames.length; i++) {
            System.out.printf("%-12s", studentNames[i]);
            for (int j = 0; j < scores[i].length; j++) {
                System.out.printf("%-12d", scores[i][j]);
            }
            System.out.println();
        }
    }

    public static void calculateAndDisplayAverages() {
        System.out.println("STUDENT AVERAGES:");
        System.out.println("--------------------------------------------------");

        for (int i = 0; i < studentNames.length; i++) {
            double average = calculateAverage(scores[i]);
            String grade = getLetterGrade(average);

            System.out.printf("%-12s: Average = %.2f, Grade = %s\n",
                            studentNames[i], average, grade);
        }
    }

    public static double calculateAverage(int[] studentScores) {
        int sum = 0;
        for (int score : studentScores) {
            sum += score;
        }
        return (double) sum / studentScores.length;
    }

    public static String getLetterGrade(double average) {
        if (average >= 90) return "A";
        else if (average >= 80) return "B";
        else if (average >= 70) return "C";
        else if (average >= 60) return "D";
        else return "F";
    }

    public static void findTopStudent() {
        System.out.println("TOP STUDENT:");
        System.out.println("--------------------------------------------------");

        double maxAverage = 0;
        int topStudentIndex = 0;

        for (int i = 0; i < studentNames.length; i++) {
            double average = calculateAverage(scores[i]);
            if (average > maxAverage) {
                maxAverage = average;
                topStudentIndex = i;
            }
        }

        System.out.printf("%s with average %.2f\n",
                        studentNames[topStudentIndex], maxAverage);
    }

    public static void findLowestScore() {
        System.out.println("LOWEST SCORE:");
        System.out.println("--------------------------------------------------");

        int minScore = scores[0][0];
        String student = studentNames[0];
        String subject = subjects[0];

        for (int i = 0; i < scores.length; i++) {
            for (int j = 0; j < scores[i].length; j++) {
                if (scores[i][j] < minScore) {
                    minScore = scores[i][j];
                    student = studentNames[i];
                    subject = subjects[j];
                }
            }
        }

        System.out.printf("%s in %s: %d\n", student, subject, minScore);
    }

    public static void displaySubjectAverages() {
        System.out.println("\nSUBJECT AVERAGES:");
        System.out.println("--------------------------------------------------");

        for (int j = 0; j < subjects.length; j++) {
            int sum = 0;
            for (int i = 0; i < scores.length; i++) {
                sum += scores[i][j];
            }
            double average = (double) sum / studentNames.length;
            System.out.printf("%-12s: %.2f\n", subjects[j], average);
        }
    }
}
```

**Your Task:**
1. Add a method to find the student with highest improvement (last score - first score)
2. Add a method to count how many students have average >= 85
3. Add a method to find which subject has the highest class average
4. Create a method to display students who failed any subject (< 60)

---

### Exercise 2: Library Management System (35 min)

**Objective**: Manage books with arrays, methods, and string operations.

```java
public class LibraryManagementSystem {
    // Book database
    static String[] bookTitles = {
        "Java Programming",
        "Data Structures",
        "Algorithms",
        "Web Development",
        "Mobile Apps"
    };
    static String[] authors = {
        "James Gosling",
        "Robert Sedgewick",
        "Thomas Cormen",
        "Jon Duckett",
        "Paul Deitel"
    };
    static boolean[] available = {true, true, false, true, false};
    static int[] bookIDs = {101, 102, 103, 104, 105};

    public static void main(String[] args) {
        System.out.println("===== LIBRARY MANAGEMENT SYSTEM =====\n");

        displayAllBooks();
        System.out.println();

        searchBookByTitle("Data Structures");
        System.out.println();

        checkoutBook(101);
        System.out.println();

        displayAvailableBooks();
        System.out.println();

        returnBook(103);
        System.out.println();

        displayBooksByAuthor("Deitel");

        System.out.println("\n============================");
    }

    public static void displayAllBooks() {
        System.out.println("ALL BOOKS IN LIBRARY:");
        System.out.println("--------------------------------------------------");
        System.out.printf("%-6s %-25s %-20s %-12s\n",
                        "ID", "Title", "Author", "Status");
        System.out.println("--------------------------------------------------");

        for (int i = 0; i < bookTitles.length; i++) {
            String status = available[i] ? "Available" : "Checked Out";
            System.out.printf("%-6d %-25s %-20s %-12s\n",
                            bookIDs[i], bookTitles[i], authors[i], status);
        }
    }

    public static void searchBookByTitle(String title) {
        System.out.println("SEARCHING FOR: " + title);
        System.out.println("--------------------------------------------------");

        boolean found = false;
        for (int i = 0; i < bookTitles.length; i++) {
            if (bookTitles[i].equalsIgnoreCase(title)) {
                found = true;
                System.out.println("Book found!");
                System.out.println("  ID: " + bookIDs[i]);
                System.out.println("  Title: " + bookTitles[i]);
                System.out.println("  Author: " + authors[i]);
                System.out.println("  Status: " + (available[i] ? "Available" : "Checked Out"));
                break;
            }
        }

        if (!found) {
            System.out.println("Book not found in library.");
        }
    }

    public static void checkoutBook(int bookID) {
        System.out.println("CHECKOUT REQUEST: Book ID " + bookID);
        System.out.println("--------------------------------------------------");

        for (int i = 0; i < bookIDs.length; i++) {
            if (bookIDs[i] == bookID) {
                if (available[i]) {
                    available[i] = false;
                    System.out.println("✓ Success! '" + bookTitles[i] + "' has been checked out.");
                } else {
                    System.out.println("✗ Sorry, '" + bookTitles[i] + "' is already checked out.");
                }
                return;
            }
        }
        System.out.println("✗ Book ID not found.");
    }

    public static void returnBook(int bookID) {
        System.out.println("RETURN REQUEST: Book ID " + bookID);
        System.out.println("--------------------------------------------------");

        for (int i = 0; i < bookIDs.length; i++) {
            if (bookIDs[i] == bookID) {
                if (!available[i]) {
                    available[i] = true;
                    System.out.println("✓ Thank you! '" + bookTitles[i] + "' has been returned.");
                } else {
                    System.out.println("✗ This book wasn't checked out.");
                }
                return;
            }
        }
        System.out.println("✗ Book ID not found.");
    }

    public static void displayAvailableBooks() {
        System.out.println("AVAILABLE BOOKS:");
        System.out.println("--------------------------------------------------");

        int count = 0;
        for (int i = 0; i < bookTitles.length; i++) {
            if (available[i]) {
                count++;
                System.out.printf("%d. [ID: %d] %s by %s\n",
                                count, bookIDs[i], bookTitles[i], authors[i]);
            }
        }

        if (count == 0) {
            System.out.println("No books currently available.");
        } else {
            System.out.println("\nTotal available: " + count);
        }
    }

    public static void displayBooksByAuthor(String authorSearch) {
        System.out.println("\nBOOKS BY AUTHOR (containing '" + authorSearch + "'):");
        System.out.println("--------------------------------------------------");

        int count = 0;
        for (int i = 0; i < authors.length; i++) {
            if (authors[i].toLowerCase().contains(authorSearch.toLowerCase())) {
                count++;
                String status = available[i] ? "Available" : "Checked Out";
                System.out.printf("%d. %s (%s)\n", count, bookTitles[i], status);
            }
        }

        if (count == 0) {
            System.out.println("No books found by this author.");
        }
    }
}
```

**Your Task:**
1. Add a method to display most popular author (most books)
2. Add a method to count total available vs checked out books
3. Add a method to search books by partial title match
4. Create a checkout history array and track who checked out what

---

### Exercise 3: Shopping Cart with Discount System (30 min)

**Objective**: Integrate arithmetic, arrays, methods, and conditional logic.

```java
public class ShoppingCartSystem {
    static String[] products = {"Laptop", "Mouse", "Keyboard", "Monitor", "Headphones"};
    static double[] prices = {999.99, 25.50, 75.00, 299.99, 89.99};
    static int[] quantities = {1, 2, 1, 1, 3};
    static String[] categories = {"Electronics", "Accessories", "Accessories", "Electronics", "Accessories"};

    public static void main(String[] args) {
        System.out.println("===== SHOPPING CART SYSTEM =====\n");

        displayCart();
        System.out.println();

        double subtotal = calculateSubtotal();
        System.out.printf("Subtotal: $%.2f\n", subtotal);
        System.out.println();

        double discount = calculateDiscount(subtotal);
        System.out.printf("Discount: -$%.2f (%.0f%%)\n",
                        discount, (discount / subtotal) * 100);
        System.out.println();

        double tax = calculateTax(subtotal - discount);
        System.out.printf("Tax (8%%): +$%.2f\n", tax);
        System.out.println();

        double total = subtotal - discount + tax;
        System.out.printf("TOTAL: $%.2f\n", total);
        System.out.println();

        displayMostExpensiveItem();
        System.out.println();

        displayCategorySummary();

        System.out.println("\n============================");
    }

    public static void displayCart() {
        System.out.println("SHOPPING CART:");
        System.out.println("--------------------------------------------------");
        System.out.printf("%-15s %-10s %-8s %-12s\n",
                        "Product", "Price", "Qty", "Line Total");
        System.out.println("--------------------------------------------------");

        for (int i = 0; i < products.length; i++) {
            double lineTotal = prices[i] * quantities[i];
            System.out.printf("%-15s $%-9.2f %-8d $%-11.2f\n",
                            products[i], prices[i], quantities[i], lineTotal);
        }
    }

    public static double calculateSubtotal() {
        double subtotal = 0;
        for (int i = 0; i < products.length; i++) {
            subtotal += prices[i] * quantities[i];
        }
        return subtotal;
    }

    public static double calculateDiscount(double subtotal) {
        // Tiered discount system
        if (subtotal >= 1000) {
            return subtotal * 0.15;  // 15% off
        } else if (subtotal >= 500) {
            return subtotal * 0.10;  // 10% off
        } else if (subtotal >= 200) {
            return subtotal * 0.05;  // 5% off
        } else {
            return 0;  // No discount
        }
    }

    public static double calculateTax(double amount) {
        return amount * 0.08;  // 8% tax
    }

    public static void displayMostExpensiveItem() {
        System.out.println("MOST EXPENSIVE ITEM:");
        System.out.println("--------------------------------------------------");

        int maxIndex = 0;
        double maxLineTotal = prices[0] * quantities[0];

        for (int i = 1; i < products.length; i++) {
            double lineTotal = prices[i] * quantities[i];
            if (lineTotal > maxLineTotal) {
                maxLineTotal = lineTotal;
                maxIndex = i;
            }
        }

        System.out.printf("%s: $%.2f × %d = $%.2f\n",
                        products[maxIndex], prices[maxIndex],
                        quantities[maxIndex], maxLineTotal);
    }

    public static void displayCategorySummary() {
        System.out.println("\nCATEGORY SUMMARY:");
        System.out.println("--------------------------------------------------");

        // Find unique categories
        String[] uniqueCategories = new String[categories.length];
        int uniqueCount = 0;

        for (int i = 0; i < categories.length; i++) {
            boolean found = false;
            for (int j = 0; j < uniqueCount; j++) {
                if (categories[i].equals(uniqueCategories[j])) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                uniqueCategories[uniqueCount++] = categories[i];
            }
        }

        // Calculate totals per category
        for (int i = 0; i < uniqueCount; i++) {
            double categoryTotal = 0;
            int itemCount = 0;

            for (int j = 0; j < categories.length; j++) {
                if (categories[j].equals(uniqueCategories[i])) {
                    categoryTotal += prices[j] * quantities[j];
                    itemCount++;
                }
            }

            System.out.printf("%-15s: %d items, $%.2f\n",
                            uniqueCategories[i], itemCount, categoryTotal);
        }
    }
}
```

**Your Task:**
1. Add a method to apply coupon codes (e.g., "SAVE10" for $10 off)
2. Add a method to calculate shipping (free if total > $50, otherwise $5.99)
3. Add a method to suggest related products
4. Create a loyalty points system (earn 1 point per dollar)

---

### Exercise 4: Bank Account Management System (35 min)

**Objective**: Create a comprehensive banking system combining arrays, methods, loops, and conditionals.

```java
public class BankAccountManagement {
    // Account database
    static String[] accountHolders = {"John Doe", "Jane Smith", "Bob Johnson", "Alice Williams", "Charlie Brown"};
    static int[] accountNumbers = {1001, 1002, 1003, 1004, 1005};
    static double[] balances = {5000.00, 3500.50, 10000.00, 2500.75, 7500.00};
    static String[] accountTypes = {"Savings", "Checking", "Savings", "Checking", "Savings"};

    // Transaction history (simplified - storing last 5 transactions for each account)
    static String[][] transactionHistory = new String[5][5];
    static int[] transactionCount = {0, 0, 0, 0, 0};

    public static void main(String[] args) {
        System.out.println("===== BANK ACCOUNT MANAGEMENT SYSTEM =====\n");

        displayAllAccounts();
        System.out.println();

        deposit(1001, 500.00);
        System.out.println();

        withdraw(1002, 200.00);
        System.out.println();

        transfer(1003, 1004, 1000.00);
        System.out.println();

        calculateInterest(1001, 3.5, 1);  // 3.5% annual interest for 1 year
        System.out.println();

        displayAccountDetails(1003);
        System.out.println();

        displayRichestAccount();
        System.out.println();

        displayAccountsByType("Savings");

        System.out.println("\n===========================");
    }

    public static void displayAllAccounts() {
        System.out.println("ALL BANK ACCOUNTS:");
        System.out.println("--------------------------------------------------");
        System.out.printf("%-8s %-20s %-12s %-12s\n",
                        "Account", "Holder", "Type", "Balance");
        System.out.println("--------------------------------------------------");

        for (int i = 0; i < accountHolders.length; i++) {
            System.out.printf("%-8d %-20s %-12s $%-11.2f\n",
                            accountNumbers[i], accountHolders[i],
                            accountTypes[i], balances[i]);
        }
    }

    public static int findAccountIndex(int accountNumber) {
        for (int i = 0; i < accountNumbers.length; i++) {
            if (accountNumbers[i] == accountNumber) {
                return i;
            }
        }
        return -1;  // Account not found
    }

    public static void deposit(int accountNumber, double amount) {
        System.out.println("DEPOSIT TRANSACTION:");
        System.out.println("--------------------------------------------------");

        int index = findAccountIndex(accountNumber);

        if (index == -1) {
            System.out.println("✗ Error: Account number " + accountNumber + " not found.");
            return;
        }

        if (amount <= 0) {
            System.out.println("✗ Error: Deposit amount must be positive.");
            return;
        }

        double oldBalance = balances[index];
        balances[index] += amount;

        // Record transaction
        addTransaction(index, "DEPOSIT: +$" + amount);

        System.out.println("Account: " + accountNumber + " (" + accountHolders[index] + ")");
        System.out.printf("Old Balance: $%.2f\n", oldBalance);
        System.out.printf("Deposit Amount: $%.2f\n", amount);
        System.out.printf("New Balance: $%.2f\n", balances[index]);
        System.out.println("✓ Deposit successful!");
    }

    public static void withdraw(int accountNumber, double amount) {
        System.out.println("WITHDRAWAL TRANSACTION:");
        System.out.println("--------------------------------------------------");

        int index = findAccountIndex(accountNumber);

        if (index == -1) {
            System.out.println("✗ Error: Account number " + accountNumber + " not found.");
            return;
        }

        if (amount <= 0) {
            System.out.println("✗ Error: Withdrawal amount must be positive.");
            return;
        }

        if (balances[index] < amount) {
            System.out.println("✗ Error: Insufficient funds.");
            System.out.printf("Available Balance: $%.2f\n", balances[index]);
            System.out.printf("Requested Amount: $%.2f\n", amount);
            return;
        }

        double oldBalance = balances[index];
        balances[index] -= amount;

        // Record transaction
        addTransaction(index, "WITHDRAW: -$" + amount);

        System.out.println("Account: " + accountNumber + " (" + accountHolders[index] + ")");
        System.out.printf("Old Balance: $%.2f\n", oldBalance);
        System.out.printf("Withdrawal Amount: $%.2f\n", amount);
        System.out.printf("New Balance: $%.2f\n", balances[index]);
        System.out.println("✓ Withdrawal successful!");
    }

    public static void transfer(int fromAccount, int toAccount, double amount) {
        System.out.println("TRANSFER TRANSACTION:");
        System.out.println("--------------------------------------------------");

        int fromIndex = findAccountIndex(fromAccount);
        int toIndex = findAccountIndex(toAccount);

        if (fromIndex == -1) {
            System.out.println("✗ Error: Source account " + fromAccount + " not found.");
            return;
        }

        if (toIndex == -1) {
            System.out.println("✗ Error: Destination account " + toAccount + " not found.");
            return;
        }

        if (amount <= 0) {
            System.out.println("✗ Error: Transfer amount must be positive.");
            return;
        }

        if (balances[fromIndex] < amount) {
            System.out.println("✗ Error: Insufficient funds in source account.");
            System.out.printf("Available Balance: $%.2f\n", balances[fromIndex]);
            System.out.printf("Requested Amount: $%.2f\n", amount);
            return;
        }

        // Perform transfer
        balances[fromIndex] -= amount;
        balances[toIndex] += amount;

        // Record transactions
        addTransaction(fromIndex, "TRANSFER OUT to " + toAccount + ": -$" + amount);
        addTransaction(toIndex, "TRANSFER IN from " + fromAccount + ": +$" + amount);

        System.out.println("From: " + fromAccount + " (" + accountHolders[fromIndex] + ")");
        System.out.println("To: " + toAccount + " (" + accountHolders[toIndex] + ")");
        System.out.printf("Transfer Amount: $%.2f\n", amount);
        System.out.printf("New Balance (From): $%.2f\n", balances[fromIndex]);
        System.out.printf("New Balance (To): $%.2f\n", balances[toIndex]);
        System.out.println("✓ Transfer successful!");
    }

    public static void addTransaction(int accountIndex, String transaction) {
        if (transactionCount[accountIndex] < 5) {
            transactionHistory[accountIndex][transactionCount[accountIndex]] = transaction;
            transactionCount[accountIndex]++;
        } else {
            // Shift transactions and add new one (remove oldest)
            for (int i = 0; i < 4; i++) {
                transactionHistory[accountIndex][i] = transactionHistory[accountIndex][i + 1];
            }
            transactionHistory[accountIndex][4] = transaction;
        }
    }

    public static void calculateInterest(int accountNumber, double annualRate, int years) {
        System.out.println("INTEREST CALCULATION:");
        System.out.println("--------------------------------------------------");

        int index = findAccountIndex(accountNumber);

        if (index == -1) {
            System.out.println("✗ Error: Account number " + accountNumber + " not found.");
            return;
        }

        if (!accountTypes[index].equals("Savings")) {
            System.out.println("✗ Error: Interest only applicable to Savings accounts.");
            System.out.println("Account type: " + accountTypes[index]);
            return;
        }

        double principal = balances[index];
        double interest = principal * (annualRate / 100) * years;
        double newBalance = principal + interest;

        System.out.println("Account: " + accountNumber + " (" + accountHolders[index] + ")");
        System.out.println("Account Type: " + accountTypes[index]);
        System.out.printf("Current Balance: $%.2f\n", principal);
        System.out.printf("Interest Rate: %.2f%% per year\n", annualRate);
        System.out.println("Duration: " + years + " year(s)");
        System.out.printf("Interest Earned: $%.2f\n", interest);
        System.out.printf("Balance After Interest: $%.2f\n", newBalance);

        // Note: Not actually adding interest to balance in this demo
        System.out.println("\n(Note: Interest calculated but not applied to balance)");
    }

    public static void displayAccountDetails(int accountNumber) {
        System.out.println("ACCOUNT DETAILS:");
        System.out.println("--------------------------------------------------");

        int index = findAccountIndex(accountNumber);

        if (index == -1) {
            System.out.println("✗ Error: Account number " + accountNumber + " not found.");
            return;
        }

        System.out.println("Account Number: " + accountNumbers[index]);
        System.out.println("Account Holder: " + accountHolders[index]);
        System.out.println("Account Type: " + accountTypes[index]);
        System.out.printf("Current Balance: $%.2f\n", balances[index]);

        System.out.println("\nRecent Transactions:");
        if (transactionCount[index] == 0) {
            System.out.println("  No transactions yet.");
        } else {
            for (int i = 0; i < transactionCount[index]; i++) {
                System.out.println("  " + (i + 1) + ". " + transactionHistory[index][i]);
            }
        }
    }

    public static void displayRichestAccount() {
        System.out.println("RICHEST ACCOUNT:");
        System.out.println("--------------------------------------------------");

        int richestIndex = 0;
        double maxBalance = balances[0];

        for (int i = 1; i < balances.length; i++) {
            if (balances[i] > maxBalance) {
                maxBalance = balances[i];
                richestIndex = i;
            }
        }

        System.out.println("Account Number: " + accountNumbers[richestIndex]);
        System.out.println("Account Holder: " + accountHolders[richestIndex]);
        System.out.println("Account Type: " + accountTypes[richestIndex]);
        System.out.printf("Balance: $%.2f\n", balances[richestIndex]);
    }

    public static void displayAccountsByType(String type) {
        System.out.println("\nACCOUNTS BY TYPE: " + type);
        System.out.println("--------------------------------------------------");

        int count = 0;
        double totalBalance = 0;

        for (int i = 0; i < accountTypes.length; i++) {
            if (accountTypes[i].equalsIgnoreCase(type)) {
                count++;
                totalBalance += balances[i];
                System.out.printf("%d. Account %d - %s: $%.2f\n",
                                count, accountNumbers[i], accountHolders[i], balances[i]);
            }
        }

        if (count == 0) {
            System.out.println("No accounts found for type: " + type);
        } else {
            System.out.println("\nTotal " + type + " Accounts: " + count);
            System.out.printf("Combined Balance: $%.2f\n", totalBalance);
        }
    }
}
```

**Expected Output:**
```
===== BANK ACCOUNT MANAGEMENT SYSTEM =====

ALL BANK ACCOUNTS:
--------------------------------------------------
Account  Holder               Type         Balance
--------------------------------------------------
1001     John Doe             Savings      $5000.00
1002     Jane Smith           Checking     $3500.50
1003     Bob Johnson          Savings      $10000.00
1004     Alice Williams       Checking     $2500.75
1005     Charlie Brown        Savings      $7500.00

DEPOSIT TRANSACTION:
--------------------------------------------------
Account: 1001 (John Doe)
Old Balance: $5000.00
Deposit Amount: $500.00
New Balance: $5500.00
✓ Deposit successful!

WITHDRAWAL TRANSACTION:
--------------------------------------------------
Account: 1002 (Jane Smith)
Old Balance: $3500.50
Withdrawal Amount: $200.00
New Balance: $3300.50
✓ Withdrawal successful!

TRANSFER TRANSACTION:
--------------------------------------------------
From: 1003 (Bob Johnson)
To: 1004 (Alice Williams)
Transfer Amount: $1000.00
New Balance (From): $9000.00
New Balance (To): $3500.75
✓ Transfer successful!

INTEREST CALCULATION:
--------------------------------------------------
Account: 1001 (John Doe)
Account Type: Savings
Current Balance: $5500.00
Interest Rate: 3.50% per year
Duration: 1 year(s)
Interest Earned: $192.50
Balance After Interest: $5692.50

(Note: Interest calculated but not applied to balance)

ACCOUNT DETAILS:
--------------------------------------------------
Account Number: 1003
Account Holder: Bob Johnson
Account Type: Savings
Current Balance: $9000.00

Recent Transactions:
  1. TRANSFER OUT to 1004: -$1000.0

RICHEST ACCOUNT:
--------------------------------------------------
Account Number: 1003
Account Holder: Bob Johnson
Account Type: Savings
Balance: $9000.00

ACCOUNTS BY TYPE: Savings
--------------------------------------------------
1. Account 1001 - John Doe: $5500.00
2. Account 1003 - Bob Johnson: $9000.00
3. Account 1005 - Charlie Brown: $7500.00

Total Savings Accounts: 3
Combined Balance: $22000.00

===========================
```

**Key Concepts Demonstrated:**

| Concept | Usage in Program |
|---------|------------------|
| Arrays | Parallel arrays for account data |
| 2D Arrays | Transaction history storage |
| Methods | Deposit, withdraw, transfer operations |
| Method Parameters | Passing account numbers and amounts |
| Return Values | findAccountIndex returns position |
| Conditionals | Validation checks (balance, amount) |
| Loops | Iterating through accounts |
| Error Handling | Input validation and error messages |
| String Formatting | printf for currency display |

**Common Mistakes:**

| Mistake | Problem | Solution |
|---------|---------|----------|
| Not checking account existence | Null pointer or incorrect operations | Use findAccountIndex before operations |
| Allowing negative deposits/withdrawals | Invalid transactions | Check amount > 0 |
| Not validating sufficient funds | Overdrawing accounts | Check balance before withdrawal |
| Mixing account types | Wrong operations for account type | Verify account type for specific operations |
| Losing transaction history | No audit trail | Maintain transaction records |

**Success Criteria:**
- [ ] Can display all accounts with proper formatting
- [ ] Deposit increases balance correctly
- [ ] Withdrawal checks for sufficient funds
- [ ] Transfer moves money between accounts
- [ ] Interest calculation works for Savings accounts only
- [ ] Transaction history is maintained
- [ ] Account search works by account number
- [ ] Error handling prevents invalid operations
- [ ] Can filter accounts by type
- [ ] All currency values display with 2 decimal places

**Your Task:**
1. Add a method to close an account (set balance to 0, mark as closed)
2. Add a method to calculate total bank assets (sum of all balances)
3. Add overdraft protection (allow negative balance up to -$500 for Checking accounts)
4. Create a monthly fee system ($5/month for Checking, $2/month for Savings)
5. Add a method to find all accounts below a minimum balance

---

### Exercise 5: Text Analytics Tool (30 min)

**Objective**: Build a comprehensive text analysis program combining string manipulation, arrays, loops, and methods.

```java
public class TextAnalyticsTool {
    public static void main(String[] args) {
        String text = "Java programming is fun and powerful. Java is widely used for web development, " +
                     "mobile apps, and enterprise applications. Learning Java opens many opportunities\!";

        System.out.println("===== TEXT ANALYTICS TOOL =====\n");
        System.out.println("Text to Analyze:");
        System.out.println(text);
        System.out.println("\n" + "=".repeat(50) + "\n");

        basicStatistics(text);
        System.out.println();

        characterAnalysis(text);
        System.out.println();

        wordAnalysis(text);
        System.out.println();

        findMostFrequentWord(text);
        System.out.println();

        searchWord(text, "Java");
        System.out.println();

        reverseWords(text);

        System.out.println("\n===========================");
    }

    public static void basicStatistics(String text) {
        System.out.println("BASIC STATISTICS:");
        System.out.println("--------------------------------------------------");

        int totalChars = text.length();
        int nonSpaceChars = text.replace(" ", "").length();
        int spaces = totalChars - nonSpaceChars;

        // Count sentences (periods, exclamation marks, question marks)
        int sentences = 0;
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (ch == '.' || ch == '\!' || ch == '?') {
                sentences++;
            }
        }

        // Count words (split by spaces)
        String[] words = text.split("\\s+");
        int wordCount = words.length;

        // Average word length
        int totalWordLength = 0;
        for (String word : words) {
            // Remove punctuation from word
            String cleanWord = word.replaceAll("[^a-zA-Z]", "");
            totalWordLength += cleanWord.length();
        }
        double avgWordLength = (double) totalWordLength / wordCount;

        System.out.println("Total Characters: " + totalChars);
        System.out.println("Characters (no spaces): " + nonSpaceChars);
        System.out.println("Spaces: " + spaces);
        System.out.println("Words: " + wordCount);
        System.out.println("Sentences: " + sentences);
        System.out.printf("Average Word Length: %.2f characters\n", avgWordLength);
    }

    public static void characterAnalysis(String text) {
        System.out.println("CHARACTER ANALYSIS:");
        System.out.println("--------------------------------------------------");

        int uppercase = 0;
        int lowercase = 0;
        int digits = 0;
        int vowels = 0;
        int consonants = 0;
        int punctuation = 0;
        int spaces = 0;

        String textLower = text.toLowerCase();

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            char chLower = textLower.charAt(i);

            if (Character.isUpperCase(ch)) {
                uppercase++;
            } else if (Character.isLowerCase(ch)) {
                lowercase++;
            }

            if (Character.isDigit(ch)) {
                digits++;
            }

            if (ch == ' ') {
                spaces++;
            }

            if (chLower >= 'a' && chLower <= 'z') {
                if (chLower == 'a' || chLower == 'e' || chLower == 'i' || 
                    chLower == 'o' || chLower == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }

            if (\!Character.isLetterOrDigit(ch) && ch \!= ' ') {
                punctuation++;
            }
        }

        System.out.println("Uppercase Letters: " + uppercase);
        System.out.println("Lowercase Letters: " + lowercase);
        System.out.println("Digits: " + digits);
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        System.out.println("Punctuation: " + punctuation);
        System.out.println("Spaces: " + spaces);

        // Vowel to consonant ratio
        if (consonants > 0) {
            double ratio = (double) vowels / consonants;
            System.out.printf("Vowel/Consonant Ratio: %.2f\n", ratio);
        }
    }

    public static void wordAnalysis(String text) {
        System.out.println("WORD ANALYSIS:");
        System.out.println("--------------------------------------------------");

        String[] words = text.split("\\s+");

        // Clean words (remove punctuation)
        String[] cleanWords = new String[words.length];
        for (int i = 0; i < words.length; i++) {
            cleanWords[i] = words[i].replaceAll("[^a-zA-Z]", "").toLowerCase();
        }

        // Find shortest and longest words
        String shortest = cleanWords[0];
        String longest = cleanWords[0];

        for (String word : cleanWords) {
            if (word.length() > 0) {  // Ignore empty strings
                if (word.length() < shortest.length()) {
                    shortest = word;
                }
                if (word.length() > longest.length()) {
                    longest = word;
                }
            }
        }

        // Count unique words
        int uniqueCount = 0;
        String[] uniqueWords = new String[cleanWords.length];

        for (String word : cleanWords) {
            if (word.length() > 0) {
                boolean found = false;
                for (int j = 0; j < uniqueCount; j++) {
                    if (uniqueWords[j].equals(word)) {
                        found = true;
                        break;
                    }
                }
                if (\!found) {
                    uniqueWords[uniqueCount++] = word;
                }
            }
        }

        System.out.println("Total Words: " + words.length);
        System.out.println("Unique Words: " + uniqueCount);
        System.out.println("Shortest Word: " + shortest + " (" + shortest.length() + " chars)");
        System.out.println("Longest Word: " + longest + " (" + longest.length() + " chars)");

        // Words by length
        System.out.println("\nWords by Length:");
        for (int len = 1; len <= longest.length(); len++) {
            int count = 0;
            for (String word : cleanWords) {
                if (word.length() == len) {
                    count++;
                }
            }
            if (count > 0) {
                System.out.println("  " + len + " characters: " + count + " word(s)");
            }
        }
    }

    public static void findMostFrequentWord(String text) {
        System.out.println("WORD FREQUENCY ANALYSIS:");
        System.out.println("--------------------------------------------------");

        String[] words = text.split("\\s+");

        // Clean words
        String[] cleanWords = new String[words.length];
        for (int i = 0; i < words.length; i++) {
            cleanWords[i] = words[i].replaceAll("[^a-zA-Z]", "").toLowerCase();
        }

        // Count frequency of each unique word
        String[] uniqueWords = new String[cleanWords.length];
        int[] frequencies = new int[cleanWords.length];
        int uniqueCount = 0;

        for (String word : cleanWords) {
            if (word.length() > 0) {
                // Check if word already counted
                int index = -1;
                for (int i = 0; i < uniqueCount; i++) {
                    if (uniqueWords[i].equals(word)) {
                        index = i;
                        break;
                    }
                }

                if (index == -1) {
                    // New word
                    uniqueWords[uniqueCount] = word;
                    frequencies[uniqueCount] = 1;
                    uniqueCount++;
                } else {
                    // Existing word
                    frequencies[index]++;
                }
            }
        }

        // Find most frequent
        int maxFreq = 0;
        String mostFrequent = "";
        for (int i = 0; i < uniqueCount; i++) {
            if (frequencies[i] > maxFreq) {
                maxFreq = frequencies[i];
                mostFrequent = uniqueWords[i];
            }
        }

        // Display top 5 most frequent words
        System.out.println("Top 5 Most Frequent Words:");

        for (int rank = 1; rank <= 5 && rank <= uniqueCount; rank++) {
            int maxIndex = 0;
            for (int i = 0; i < uniqueCount; i++) {
                if (frequencies[i] > frequencies[maxIndex]) {
                    maxIndex = i;
                }
            }

            if (frequencies[maxIndex] > 0) {
                System.out.printf("%d. \"%s\" appears %d time(s)\n",
                                rank, uniqueWords[maxIndex], frequencies[maxIndex]);
                frequencies[maxIndex] = 0;  // Mark as counted
            }
        }
    }

    public static void searchWord(String text, String searchTerm) {
        System.out.println("WORD SEARCH: \"" + searchTerm + "\"");
        System.out.println("--------------------------------------------------");

        String textLower = text.toLowerCase();
        String searchLower = searchTerm.toLowerCase();

        // Count occurrences
        int count = 0;
        int index = 0;
        int[] positions = new int[text.length()];

        while ((index = textLower.indexOf(searchLower, index)) \!= -1) {
            positions[count] = index;
            count++;
            index += searchLower.length();
        }

        if (count == 0) {
            System.out.println("Word not found in text.");
        } else {
            System.out.println("Found " + count + " occurrence(s)");
            System.out.println("\nPositions:");
            for (int i = 0; i < count; i++) {
                // Get context (10 chars before and after)
                int start = Math.max(0, positions[i] - 10);
                int end = Math.min(text.length(), positions[i] + searchTerm.length() + 10);
                String context = text.substring(start, end);

                System.out.println("  Position " + positions[i] + ": ...'" + context + "'...");
            }

            // Calculate percentage
            String[] words = text.split("\\s+");
            double percentage = ((double) count / words.length) * 100;
            System.out.printf("\nPercentage of text: %.2f%%\n", percentage);
        }
    }

    public static void reverseWords(String text) {
        System.out.println("\nREVERSE OPERATIONS:");
        System.out.println("--------------------------------------------------");

        // Reverse entire text
        String reversed = "";
        for (int i = text.length() - 1; i >= 0; i--) {
            reversed += text.charAt(i);
        }
        System.out.println("Reversed Text:");
        System.out.println(reversed);

        // Reverse word order
        String[] words = text.split("\\s+");
        String reversedWordOrder = "";
        for (int i = words.length - 1; i >= 0; i--) {
            reversedWordOrder += words[i];
            if (i > 0) {
                reversedWordOrder += " ";
            }
        }
        System.out.println("\nReversed Word Order:");
        System.out.println(reversedWordOrder);

        // Reverse each word individually
        String reversedWords = "";
        for (String word : words) {
            for (int i = word.length() - 1; i >= 0; i--) {
                reversedWords += word.charAt(i);
            }
            reversedWords += " ";
        }
        System.out.println("\nEach Word Reversed:");
        System.out.println(reversedWords.trim());
    }
}
```

**Expected Output:**
```
===== TEXT ANALYTICS TOOL =====

Text to Analyze:
Java programming is fun and powerful. Java is widely used for web development, mobile apps, and enterprise applications. Learning Java opens many opportunities\!

==================================================

BASIC STATISTICS:
--------------------------------------------------
Total Characters: 177
Characters (no spaces): 148
Spaces: 29
Words: 24
Sentences: 3
Average Word Length: 6.17 characters

CHARACTER ANALYSIS:
--------------------------------------------------
Uppercase Letters: 3
Lowercase Letters: 145
Digits: 0
Vowels: 61
Consonants: 87
Punctuation: 6
Spaces: 29
Vowel/Consonant Ratio: 0.70

WORD ANALYSIS:
--------------------------------------------------
Total Words: 24
Unique Words: 21
Shortest Word: is (2 chars)
Longest Word: applications (12 chars)

Words by Length:
  2 characters: 3 word(s)
  3 characters: 4 word(s)
  4 characters: 5 word(s)
  5 characters: 2 word(s)
  6 characters: 2 word(s)
  7 characters: 2 word(s)
  8 characters: 2 word(s)
  9 characters: 1 word(s)
  10 characters: 1 word(s)
  11 characters: 1 word(s)
  12 characters: 1 word(s)

WORD FREQUENCY ANALYSIS:
--------------------------------------------------
Top 5 Most Frequent Words:
1. "java" appears 3 time(s)
2. "and" appears 2 time(s)
3. "is" appears 2 time(s)
4. "programming" appears 1 time(s)
5. "fun" appears 1 time(s)

WORD SEARCH: "Java"
--------------------------------------------------
Found 3 occurrence(s)

Positions:
  Position 0: ...'Java programming is fun'...
  Position 39: ...'owerful. Java is widely used f'...
  Position 129: ...'Learning Java opens many oppor'...

Percentage of text: 12.50%

REVERSE OPERATIONS:
--------------------------------------------------
Reversed Text:
\!seitinutroppo ynam snepo avaJ gninraeL .snoitacilppa esirpretne dna ,sppa elibom ,tnempoleved bew rof desu ylediw si avaJ .lufrewop dna nuf si gnimmargorp avaJ

Reversed Word Order:
opportunities\! many opens Java Learning applications. enterprise and apps, mobile development, web for used widely is Java powerful. and fun is programming Java

Each Word Reversed:
avaJ gnimmargorp si nuf dna .lufrewop avaJ si ylediw desu rof bew ,tnempoleved elibom ,sppa dna esirpretne .snoitacilppa gninraeL avaJ snepo ynam \!seitinutroppo

===========================
```

**Key Concepts Demonstrated:**

| Concept | Usage in Program |
|---------|-----------------|
| String Methods | split(), charAt(), indexOf(), substring() |
| String Manipulation | toLowerCase(), replaceAll(), replace() |
| Arrays | Storing words, frequencies, positions |
| Loops | for, while loops for iteration |
| Character Analysis | Character.isUpperCase(), isLowerCase() |
| Methods | Modular design with focused methods |
| Conditionals | Checking character types |
| Counters | Frequency counting, statistics |

**Common Mistakes:**

| Mistake | Problem | Solution |
|---------|---------|----------|
| Not removing punctuation | Words counted with punctuation | Use replaceAll("[^a-zA-Z]", "") |
| Case-sensitive comparisons | Missing matches | Convert to lowercase before comparing |
| Not handling empty strings | Array out of bounds or logic errors | Check length > 0 before processing |
| Integer division for averages | Truncated results | Cast to double before division |
| Not trimming whitespace | Extra spaces in output | Use trim() method |

**Success Criteria:**
- [ ] Can count characters, words, and sentences accurately
- [ ] Character analysis distinguishes uppercase, lowercase, vowels, consonants
- [ ] Can find shortest and longest words
- [ ] Frequency analysis identifies most common words
- [ ] Word search finds all occurrences with context
- [ ] Can reverse text in multiple ways
- [ ] Unique word counting works correctly
- [ ] Handles punctuation appropriately
- [ ] Calculates percentages and ratios correctly
- [ ] All statistics are displayed with proper formatting

**Your Task:**
1. Add a method to check if the text is a palindrome (reads same forwards and backwards)
2. Add a method to find all words that start with a specific letter
3. Create a method to generate a word cloud (show words sized by frequency)
4. Add a method to calculate reading level (Flesch-Kincaid readability score)
5. Create a spell-check feature (compare words against a dictionary array)

---
### Exercise 6: Mini Game - Number Guessing with Stats (25 min)

**Objective**: Create an interactive number guessing game combining loops, conditionals, methods, and statistics tracking.

```java
import java.util.Scanner;
import java.util.Random;

public class NumberGuessingGame {
    // Game statistics
    static int gamesPlayed = 0;
    static int gamesWon = 0;
    static int totalGuesses = 0;
    static int bestScore = Integer.MAX_VALUE;  // Lowest number of guesses
    static int worstScore = 0;                  // Highest number of guesses

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("===== NUMBER GUESSING GAME =====\n");
        System.out.println("Welcome to the Number Guessing Game\!");
        System.out.println("I'll think of a number, and you try to guess it.");
        System.out.println();

        boolean playAgain = true;

        while (playAgain) {
            playGame(scanner);

            System.out.print("\nDo you want to play again? (yes/no): ");
            String response = scanner.nextLine().toLowerCase();
            playAgain = response.equals("yes") || response.equals("y");

            if (playAgain) {
                System.out.println("\n" + "=".repeat(50) + "\n");
            }
        }

        displayFinalStatistics();
        System.out.println("\nThanks for playing\! Goodbye\!");
        System.out.println("\n===========================");

        scanner.close();
    }

    public static void playGame(Scanner scanner) {
        gamesPlayed++;

        System.out.println("Game #" + gamesPlayed);
        System.out.println("--------------------------------------------------");

        // Choose difficulty
        System.out.println("Choose difficulty:");
        System.out.println("1. Easy (1-50, 10 guesses)");
        System.out.println("2. Medium (1-100, 7 guesses)");
        System.out.println("3. Hard (1-200, 5 guesses)");
        System.out.print("Enter your choice (1-3): ");

        int difficulty = getValidInteger(scanner, 1, 3);
        int maxNumber, maxGuesses;

        switch (difficulty) {
            case 1:
                maxNumber = 50;
                maxGuesses = 10;
                System.out.println("\nEasy mode: Guess a number between 1 and 50");
                break;
            case 2:
                maxNumber = 100;
                maxGuesses = 7;
                System.out.println("\nMedium mode: Guess a number between 1 and 100");
                break;
            case 3:
                maxNumber = 200;
                maxGuesses = 5;
                System.out.println("\nHard mode: Guess a number between 1 and 200");
                break;
            default:
                maxNumber = 100;
                maxGuesses = 7;
                System.out.println("\nMedium mode: Guess a number between 1 and 100");
        }

        System.out.println("You have " + maxGuesses + " guesses.");
        System.out.println();

        // Generate random number
        Random random = new Random();
        int secretNumber = random.nextInt(maxNumber) + 1;

        // Play the guessing game
        boolean won = false;
        int guessCount = 0;
        int[] guessHistory = new int[maxGuesses];

        for (int attempt = 1; attempt <= maxGuesses; attempt++) {
            System.out.print("Guess #" + attempt + ": ");
            int guess = getValidInteger(scanner, 1, maxNumber);

            guessHistory[guessCount] = guess;
            guessCount++;
            totalGuesses++;

            if (guess == secretNumber) {
                won = true;
                gamesWon++;

                System.out.println("\n🎉 Congratulations\! You guessed it\!");
                System.out.println("The number was: " + secretNumber);
                System.out.println("You won in " + guessCount + " guess(es)\!");

                // Update best/worst scores
                if (guessCount < bestScore) {
                    bestScore = guessCount;
                    System.out.println("✨ NEW BEST SCORE\!");
                }
                if (guessCount > worstScore) {
                    worstScore = guessCount;
                }

                // Calculate score (points based on remaining guesses)
                int score = calculateScore(guessCount, maxGuesses, difficulty);
                System.out.println("Your score: " + score + " points");

                break;
            } else if (guess < secretNumber) {
                System.out.println("❌ Too low\! Try higher.");
                provideHint(guess, secretNumber, maxNumber, attempt, maxGuesses);
            } else {
                System.out.println("❌ Too high\! Try lower.");
                provideHint(guess, secretNumber, maxNumber, attempt, maxGuesses);
            }

            // Show remaining guesses
            int remaining = maxGuesses - attempt;
            if (remaining > 0) {
                System.out.println("Guesses remaining: " + remaining);
            }
            System.out.println();
        }

        if (\!won) {
            System.out.println("\n😞 Game Over\! You ran out of guesses.");
            System.out.println("The number was: " + secretNumber);
        }

        // Show guess history
        System.out.println("\nYour guesses: ");
        for (int i = 0; i < guessCount; i++) {
            System.out.print(guessHistory[i]);
            if (i < guessCount - 1) {
                System.out.print(", ");
            }
        }
        System.out.println();

        // Show game statistics
        displayGameStatistics();
    }

    public static int getValidInteger(Scanner scanner, int min, int max) {
        while (true) {
            try {
                String input = scanner.nextLine();
                int number = Integer.parseInt(input);

                if (number >= min && number <= max) {
                    return number;
                } else {
                    System.out.print("Please enter a number between " + min + " and " + max + ": ");
                }
            } catch (NumberFormatException e) {
                System.out.print("Invalid input\! Please enter a valid number: ");
            }
        }
    }

    public static void provideHint(int guess, int secret, int maxNumber, int attempt, int maxGuesses) {
        int difference = Math.abs(guess - secret);
        double percentOff = ((double) difference / maxNumber) * 100;

        // Provide hints based on how close they are
        if (percentOff <= 5) {
            System.out.println("💥 VERY HOT\! You're extremely close\!");
        } else if (percentOff <= 10) {
            System.out.println("🔥 HOT\! You're close\!");
        } else if (percentOff <= 20) {
            System.out.println("😊 WARM\! Getting closer\!");
        } else if (percentOff <= 40) {
            System.out.println("❄️  COOL\! Still a bit away...");
        } else {
            System.out.println("🧊 COLD\! Way off\!");
        }

        // Additional hint after halfway point
        if (attempt > maxGuesses / 2) {
            if (secret % 2 == 0) {
                System.out.println("💡 Hint: The number is EVEN");
            } else {
                System.out.println("💡 Hint: The number is ODD");
            }
        }
    }

    public static int calculateScore(int guessCount, int maxGuesses, int difficulty) {
        // Base points for winning
        int basePoints = 100;

        // Bonus for remaining guesses
        int remaining = maxGuesses - guessCount;
        int bonusPoints = remaining * 10;

        // Difficulty multiplier
        double multiplier = 1.0;
        if (difficulty == 1) {
            multiplier = 1.0;  // Easy
        } else if (difficulty == 2) {
            multiplier = 1.5;  // Medium
        } else if (difficulty == 3) {
            multiplier = 2.0;  // Hard
        }

        int totalScore = (int) ((basePoints + bonusPoints) * multiplier);
        return totalScore;
    }

    public static void displayGameStatistics() {
        System.out.println("\n--- Session Statistics ---");
        System.out.println("Games Played: " + gamesPlayed);
        System.out.println("Games Won: " + gamesWon);
        System.out.println("Games Lost: " + (gamesPlayed - gamesWon));

        if (gamesPlayed > 0) {
            double winRate = ((double) gamesWon / gamesPlayed) * 100;
            System.out.printf("Win Rate: %.1f%%\n", winRate);

            double avgGuesses = (double) totalGuesses / gamesPlayed;
            System.out.printf("Average Guesses per Game: %.2f\n", avgGuesses);

            if (gamesWon > 0) {
                System.out.println("Best Score: " + bestScore + " guesses");
                System.out.println("Worst Score: " + worstScore + " guesses");
            }
        }
    }

    public static void displayFinalStatistics() {
        System.out.println("\n" + "=".repeat(50));
        System.out.println("FINAL GAME STATISTICS");
        System.out.println("=".repeat(50));

        System.out.println("Total Games Played: " + gamesPlayed);
        System.out.println("Total Games Won: " + gamesWon);
        System.out.println("Total Games Lost: " + (gamesPlayed - gamesWon));

        if (gamesPlayed > 0) {
            double winRate = ((double) gamesWon / gamesPlayed) * 100;
            System.out.printf("Overall Win Rate: %.1f%%\n", winRate);

            double avgGuesses = (double) totalGuesses / gamesPlayed;
            System.out.printf("Average Guesses per Game: %.2f\n", avgGuesses);
            System.out.println("Total Guesses Made: " + totalGuesses);

            if (gamesWon > 0) {
                System.out.println("\nBest Performance: " + bestScore + " guesses");
                System.out.println("Worst Performance: " + worstScore + " guesses");

                // Performance rating
                if (avgGuesses <= 3) {
                    System.out.println("\n🏆 Performance Rating: EXPERT\!");
                } else if (avgGuesses <= 5) {
                    System.out.println("\n⭐ Performance Rating: ADVANCED");
                } else if (avgGuesses <= 7) {
                    System.out.println("\n👍 Performance Rating: INTERMEDIATE");
                } else {
                    System.out.println("\n🎮 Performance Rating: BEGINNER");
                }
            }
        }
    }
}
```

**Expected Output (Sample Game):**
```
===== NUMBER GUESSING GAME =====

Welcome to the Number Guessing Game\!
I'll think of a number, and you try to guess it.

Game #1
--------------------------------------------------
Choose difficulty:
1. Easy (1-50, 10 guesses)
2. Medium (1-100, 7 guesses)
3. Hard (1-200, 5 guesses)
Enter your choice (1-3): 2

Medium mode: Guess a number between 1 and 100
You have 7 guesses.

Guess #1: 50
❌ Too high\! Try lower.
😊 WARM\! Getting closer\!
Guesses remaining: 6

Guess #2: 25
❌ Too low\! Try higher.
😊 WARM\! Getting closer\!
Guesses remaining: 5

Guess #3: 37
❌ Too high\! Try lower.
🔥 HOT\! You're close\!
Guesses remaining: 4

Guess #4: 31
❌ Too low\! Try higher.
💥 VERY HOT\! You're extremely close\!
💡 Hint: The number is EVEN
Guesses remaining: 3

Guess #5: 34
❌ Too high\! Try lower.
💥 VERY HOT\! You're extremely close\!
Guesses remaining: 2

Guess #6: 32

🎉 Congratulations\! You guessed it\!
The number was: 32
You won in 6 guess(es)\!
✨ NEW BEST SCORE\!
Your score: 115 points

Your guesses:
50, 25, 37, 31, 34, 32

--- Session Statistics ---
Games Played: 1
Games Won: 1
Games Lost: 0
Win Rate: 100.0%
Average Guesses per Game: 6.00
Best Score: 6 guesses
Worst Score: 6 guesses

Do you want to play again? (yes/no): no

==================================================
FINAL GAME STATISTICS
==================================================
Total Games Played: 1
Total Games Won: 1
Total Games Lost: 0
Overall Win Rate: 100.0%
Average Guesses per Game: 6.00
Total Guesses Made: 6

Best Performance: 6 guesses
Worst Performance: 6 guesses

👍 Performance Rating: INTERMEDIATE

Thanks for playing\! Goodbye\!

===========================
```

**Key Concepts Demonstrated:**

| Concept | Usage in Program |
|---------|------------------|
| Loops | while loop for replay, for loop for guesses |
| Conditionals | if-else for guess evaluation |
| Methods | Modular game logic |
| Scanner | User input handling |
| Random | Generating secret number |
| Static Variables | Tracking game statistics across plays |
| Arrays | Storing guess history |
| Error Handling | Input validation |
| Switch Statement | Difficulty selection |
| Mathematical Operations | Score calculation, percentages |

**Common Mistakes:**

| Mistake | Problem | Solution |
|---------|---------|----------|
| Not validating input | Crashes on invalid input | Use try-catch and validate range |
| Forgetting scanner.nextLine() | Input buffer issues | Always consume the newline |
| Not handling replay logic | Game ends after one play | Use while loop with boolean flag |
| Integer division for percentages | Truncated results | Cast to double before division |
| Not tracking statistics | Missing win rate, averages | Use static variables |
| Not closing Scanner | Resource leak warning | Call scanner.close() at end |

**Success Criteria:**
- [ ] Game generates random number correctly
- [ ] User input is validated for range
- [ ] Hints provide appropriate feedback (hot/cold)
- [ ] Win/loss conditions work correctly
- [ ] Guess history is displayed accurately
- [ ] Statistics track across multiple games
- [ ] Difficulty levels affect game parameters
- [ ] Score calculation rewards efficiency
- [ ] Replay functionality works smoothly
- [ ] Final statistics show complete session data
- [ ] Performance rating is displayed correctly
- [ ] Input errors are handled gracefully

**Your Task:**
1. Add a "give up" option (type 0 to reveal answer)
2. Add a timer to track how long each game takes
3. Create a leaderboard that saves top 5 scores to a file
4. Add a "hint" feature that costs points but narrows the range
5. Implement different number generation modes (fibonacci numbers, prime numbers, etc.)

---

## 📝 FINAL PROGRESS TRACKER - SUPPLEMENTARY EXERCISES

### Section 1: Operators & Expressions ✅ (10/10)
- [x] Exercise 1: Temperature Converter
- [x] Exercise 2: BMI Calculator
- [x] Exercise 3: Compound Interest Calculator
- [x] Exercise 4: Time Calculator
- [x] Exercise 5: Circle Calculations
- [x] Exercise 6: Grade Calculator with Weights
- [x] Exercise 7: Bitwise Operations Intro
- [x] Exercise 8: Ternary Operator Practice
- [x] Exercise 9: Operator Precedence Practice
- [x] Exercise 10: Combined Operators Challenge

### Section 2: String Manipulation Basics ✅ (8/8)
- [x] Exercise 1: String Basics
- [x] Exercise 2: String Searching
- [x] Exercise 3: String Manipulation
- [x] Exercise 4: Building Strings
- [x] Exercise 5: String Comparison
- [x] Exercise 6: String Splitting and Joining
- [x] Exercise 7: Character Analysis
- [x] Exercise 8: String Validation

### Section 3: Nested Loops & Pattern Printing ✅ (10/10)
- [x] Exercise 1: Basic Patterns - Rectangles
- [x] Exercise 2: Right Triangle Patterns
- [x] Exercise 3: Pyramid Patterns
- [x] Exercise 4: Number Patterns
- [x] Exercise 5: Complex Patterns
- [x] Exercise 6: Pattern with User Input
- [x] Exercise 7: Nested Loop Practice - Tables
- [x] Exercise 8: Zigzag Patterns
- [x] Exercise 9: ASCII Art
- [x] Exercise 10: Performance Challenge

### Section 4: Array Algorithms ✅ (8/8)
- [x] Exercise 1: Array Rotation
- [x] Exercise 2: Array Partitioning
- [x] Exercise 3: Subarray Problems
- [x] Exercise 4: Array Merging
- [x] Exercise 5: Peak Finding
- [x] Exercise 6: Array Rearrangement
- [x] Exercise 7: Sliding Window Technique
- [x] Exercise 8: Two Pointer Technique

### Section 5: Integration Challenges ✅ (6/6) - **COMPLETE!**
- [x] Exercise 1: Student Grade Management System
- [x] Exercise 2: Library Management System
- [x] Exercise 3: Shopping Cart with Discount System
- [x] Exercise 4: Bank Account Management System
- [x] Exercise 5: Text Analytics Tool
- [x] Exercise 6: Mini Game - Number Guessing with Stats

---

**🎉 STATUS: 42/42 EXERCISES COMPLETE (100%) 🎉**

**Summary:**
- ✅ Section 1: Operators & Expressions (10 exercises)
- ✅ Section 2: String Manipulation Basics (8 exercises)
- ✅ Section 3: Nested Loops & Pattern Printing (10 exercises)
- ✅ Section 4: Array Algorithms (8 exercises)
- ✅ Section 5: Integration Challenges (6 exercises)

**Total Lines:** ~4,375 lines of comprehensive supplementary practice material

**Purpose Achieved:**
This supplementary document successfully reinforces topics from Days 1-9 that needed extra practice:
- ✓ Operators expanded from 2 to 12 exercises
- ✓ Strings introduced with 8 comprehensive exercises
- ✓ Nested loops enhanced with 10 pattern exercises
- ✓ Array algorithms expanded with 8 advanced techniques
- ✓ Integration challenges demonstrate combining multiple concepts

**Next Steps:**
- Return to main course: Day 10 - Introduction to OOP
- Continue with Week 2 (Days 10-14)

---
