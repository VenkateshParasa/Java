# Day 2: Variables & Data Types

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

By the end of Day 2, you will be able to:
- Understand what variables are and how to declare them
- Work with all 8 primitive data types in Java
- Differentiate between primitive and reference types
- Perform type casting (implicit and explicit)
- Use constants with the `final` keyword
- Follow Java naming conventions

---

## 📚 Topics Covered

### 1. Variables

A **variable** is a container that holds data that can be changed during program execution.

#### Variable Definition:
```java
dataType variableName = value;
```

#### Example:
```java
int age = 25;
String name = "John";
double salary = 50000.50;
```

#### Variable Naming Rules:
1. **Must start with**: letter, underscore (_), or dollar sign ($)
2. **Cannot start with**: digit
3. **Can contain**: letters, digits, underscores, dollar signs
4. **Cannot use**: Java keywords (int, class, public, etc.)
5. **Case-sensitive**: `age` and `Age` are different

#### Naming Conventions (camelCase):
```java
// Good naming
int studentAge;
String firstName;
double accountBalance;

// Bad naming
int student_age;  // Use camelCase, not snake_case
String FirstName; // Don't capitalize first letter
double x;         // Not descriptive
```

#### Declaration vs Initialization:
```java
// Declaration only
int age;

// Initialization
age = 25;

// Declaration + Initialization
int age = 25;

// Multiple declarations
int x, y, z;
int a = 10, b = 20, c = 30;
```

---

### 2. Primitive Data Types

Java has **8 primitive data types** that store simple values.

#### Integer Types:

**1. byte**
- Size: 1 byte (8 bits)
- Range: -128 to 127
- Use: Save memory in large arrays

```java
byte age = 25;
byte temperature = -10;
```

**2. short**
- Size: 2 bytes (16 bits)
- Range: -32,768 to 32,767
- Use: Save memory when int is too large

```java
short year = 2024;
short population = 30000;
```

**3. int**
- Size: 4 bytes (32 bits)
- Range: -2,147,483,648 to 2,147,483,647
- **Default integer type**
- Most commonly used

```java
int salary = 50000;
int distance = 1000000;
```

**4. long**
- Size: 8 bytes (64 bits)
- Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
- Use: Very large numbers
- **Suffix: L or l**

```java
long worldPopulation = 7800000000L;
long bigNumber = 9999999999L;
```

#### Floating-Point Types:

**5. float**
- Size: 4 bytes (32 bits)
- Precision: ~6-7 decimal digits
- **Suffix: f or F**

```java
float price = 19.99f;
float pi = 3.14159f;
```

**6. double**
- Size: 8 bytes (64 bits)
- Precision: ~15 decimal digits
- **Default decimal type**

```java
double salary = 50000.75;
double pi = 3.14159265359;
```

#### Character Type:

**7. char**
- Size: 2 bytes (16 bits)
- Stores: Single character (Unicode)
- Use: Single quotes (' ')

```java
char grade = 'A';
char symbol = '$';
char letter = 'Z';
```

#### Boolean Type:

**8. boolean**
- Size: 1 bit (implementation dependent)
- Values: `true` or `false`
- Use: Conditional logic

```java
boolean isJavaFun = true;
boolean isRaining = false;
boolean hasLicense = true;
```

#### Size Comparison Table:

| Type    | Size    | Range                                    | Default |
|---------|---------|------------------------------------------|---------|
| byte    | 1 byte  | -128 to 127                             | 0       |
| short   | 2 bytes | -32,768 to 32,767                       | 0       |
| int     | 4 bytes | -2.1B to 2.1B                           | 0       |
| long    | 8 bytes | -9.2E18 to 9.2E18                       | 0L      |
| float   | 4 bytes | ~6-7 decimal digits                      | 0.0f    |
| double  | 8 bytes | ~15 decimal digits                       | 0.0d    |
| char    | 2 bytes | 0 to 65,535 (Unicode)                   | '\u0000'|
| boolean | 1 bit   | true or false                            | false   |

---

### 3. Reference Types

Reference types store **references (addresses)** to objects, not the actual values.

#### String (Most Common Reference Type):
```java
String name = "John Doe";
String message = "Hello, World!";
String empty = "";
```

#### Arrays (Reference Type):
```java
int[] numbers = {1, 2, 3, 4, 5};
String[] names = {"Alice", "Bob", "Charlie"};
```

#### Objects:
```java
Scanner scanner = new Scanner(System.in);
ArrayList<Integer> list = new ArrayList<>();
```

#### null Value:
```java
String name = null;  // No object assigned
int age = null;      // ERROR! Primitives cannot be null
```

#### Primitive vs Reference:

| Aspect          | Primitive                | Reference                |
|-----------------|--------------------------|--------------------------|
| Storage         | Actual value             | Memory address           |
| Memory Location | Stack                    | Heap (object in heap)    |
| Default Value   | 0, false, '\u0000'       | null                     |
| Comparison      | Use ==                   | Use .equals()            |
| Examples        | int, double, boolean     | String, Arrays, Objects  |

---

### 4. Type Casting

Converting one data type to another.

#### Implicit Casting (Widening/Automatic):
Smaller type → Larger type (No data loss)

```java
// Automatic conversion
byte b = 10;
int i = b;        // byte → int
long l = i;       // int → long
float f = l;      // long → float
double d = f;     // float → double

// Order: byte → short → int → long → float → double
```

#### Explicit Casting (Narrowing/Manual):
Larger type → Smaller type (Possible data loss)

```java
// Manual conversion required
double d = 100.99;
int i = (int) d;        // i = 100 (decimal part lost)

long l = 1000L;
int i = (int) l;        // Possible data loss if l > int range

float f = 10.5f;
int i = (int) f;        // i = 10
```

#### Data Loss Example:
```java
int bigNumber = 130;
byte smallNumber = (byte) bigNumber;  // smallNumber = -126 (overflow!)

double price = 19.99;
int dollars = (int) price;  // dollars = 19 (decimal lost)
```

#### Casting with char:
```java
char letter = 'A';
int ascii = letter;        // ascii = 65 (implicit)
int code = (int) letter;   // code = 65 (explicit)

int num = 66;
char ch = (char) num;      // ch = 'B'
```

---

### 5. Constants

Constants are variables whose values **cannot be changed** after initialization.

#### Using final Keyword:
```java
final int MAX_AGE = 100;
final double PI = 3.14159;
final String COMPANY_NAME = "TechCorp";

// MAX_AGE = 150;  // ERROR! Cannot reassign
```

#### Naming Convention:
- Use **UPPER_CASE** with underscores
- Makes constants easily identifiable

```java
final int MAX_STUDENTS = 50;
final double TAX_RATE = 0.18;
final String DATABASE_URL = "localhost:3306";
```

#### Why Use Constants?
1. **Readability**: `MAX_SPEED` is clearer than `120`
2. **Maintainability**: Change in one place
3. **Prevention of errors**: Cannot accidentally modify
4. **Performance**: Compiler can optimize

#### Example:
```java
public class Circle {
    final double PI = 3.14159;
    
    public double calculateArea(double radius) {
        return PI * radius * radius;
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Declare All Primitive Types
```java
public class PrimitiveTypes {
    public static void main(String[] args) {
        // Integer types
        byte age = 25;
        short year = 2024;
        int population = 1000000;
        long worldPopulation = 7800000000L;
        
        // Floating-point types
        float price = 19.99f;
        double salary = 50000.75;
        
        // Character type
        char grade = 'A';
        
        // Boolean type
        boolean isStudent = true;
        
        // Print all
        System.out.println("Age: " + age);
        System.out.println("Year: " + year);
        System.out.println("Population: " + population);
        System.out.println("World Population: " + worldPopulation);
        System.out.println("Price: " + price);
        System.out.println("Salary: " + salary);
        System.out.println("Grade: " + grade);
        System.out.println("Is Student: " + isStudent);
    }
}
```

---

### Exercise 2: Type Casting Practice
```java
public class TypeCasting {
    public static void main(String[] args) {
        // Implicit casting
        int num = 100;
        double decimal = num;  // int → double
        System.out.println("Implicit: " + decimal);  // 100.0
        
        // Explicit casting
        double price = 19.99;
        int dollars = (int) price;  // double → int
        System.out.println("Explicit: " + dollars);  // 19
        
        // Char casting
        char letter = 'A';
        int ascii = letter;
        System.out.println("ASCII of A: " + ascii);  // 65
        
        int code = 66;
        char ch = (char) code;
        System.out.println("Char of 66: " + ch);  // B
    }
}
```

---

### Exercise 3: Calculate Circle Area
```java
public class CircleArea {
    public static void main(String[] args) {
        final double PI = 3.14159;
        double radius = 5.0;
        
        double area = PI * radius * radius;
        double circumference = 2 * PI * radius;
        
        System.out.println("Radius: " + radius);
        System.out.println("Area: " + area);
        System.out.println("Circumference: " + circumference);
    }
}
```

**Expected Output:**
```
Radius: 5.0
Area: 78.53975
Circumference: 31.4159
```

---

### Exercise 4: Variable Swap
```java
public class SwapVariables {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        
        System.out.println("Before swap:");
        System.out.println("a = " + a + ", b = " + b);
        
        // Swap using temporary variable
        int temp = a;
        a = b;
        b = temp;
        
        System.out.println("After swap:");
        System.out.println("a = " + a + ", b = " + b);
    }
}
```

**Expected Output:**
```
Before swap:
a = 10, b = 20
After swap:
a = 20, b = 10
```

---

### Exercise 5: Data Type Ranges
```java
public class DataTypeRanges {
    public static void main(String[] args) {
        System.out.println("byte: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("short: " + Short.MIN_VALUE + " to " + Short.MAX_VALUE);
        System.out.println("int: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("long: " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);
        System.out.println("float: " + Float.MIN_VALUE + " to " + Float.MAX_VALUE);
        System.out.println("double: " + Double.MIN_VALUE + " to " + Double.MAX_VALUE);
    }
}
```

---

## 🔑 Key Takeaways

1. **8 Primitive Types**: byte, short, int, long, float, double, char, boolean
2. **Default Types**: `int` for integers, `double` for decimals
3. **Suffixes**: `L` for long, `f` for float

---

### Exercise 6: BMI Calculator
Calculate Body Mass Index using variables.

```java
public class BMICalculator {
    public static void main(String[] args) {
        double weightKg = 70.5;
        double heightM = 1.75;
        
        double bmi = weightKg / (heightM * heightM);
        
        System.out.println("Weight: " + weightKg + " kg");
        System.out.println("Height: " + heightM + " m");
        System.out.println("BMI: " + bmi);
        
        if (bmi < 18.5) {
            System.out.println("Category: Underweight");
        } else if (bmi < 25) {
            System.out.println("Category: Normal weight");
        } else if (bmi < 30) {
            System.out.println("Category: Overweight");
        } else {
            System.out.println("Category: Obese");
        }
    }
}
```

---

### Exercise 7: Currency Converter
Convert between different currencies.

```java
public class CurrencyConverter {
    public static void main(String[] args) {
        final double USD_TO_EUR = 0.85;
        final double USD_TO_GBP = 0.73;
        final double USD_TO_INR = 83.12;
        
        double amountUSD = 100.0;
        
        System.out.println("Amount in USD: $" + amountUSD);
        System.out.println("Amount in EUR: €" + (amountUSD * USD_TO_EUR));
        System.out.println("Amount in GBP: £" + (amountUSD * USD_TO_GBP));
        System.out.println("Amount in INR: ₹" + (amountUSD * USD_TO_INR));
    }
}
```

---

### Exercise 8: Character Operations
Work with character data type.

```java
public class CharacterOperations {
    public static void main(String[] args) {
        char letter = 'A';
        char digit = '5';
        char symbol = '@';
        
        System.out.println("Letter: " + letter);
        System.out.println("ASCII value: " + (int) letter);
        
        System.out.println("\nDigit: " + digit);
        System.out.println("ASCII value: " + (int) digit);
        
        System.out.println("\nSymbol: " + symbol);
        System.out.println("ASCII value: " + (int) symbol);
        
        // Character arithmetic
        char nextLetter = (char) (letter + 1);
        System.out.println("\nNext letter after " + letter + ": " + nextLetter);
    }
}
```

---

### Exercise 9: Boolean Logic
Practice with boolean variables.

```java
public class BooleanLogic {
    public static void main(String[] args) {
        boolean isJavaFun = true;
        boolean isFishTasty = false;
        boolean isSunny = true;
        boolean isRaining = false;
        
        System.out.println("Is Java fun? " + isJavaFun);
        System.out.println("Is fish tasty? " + isFishTasty);
        
        boolean canGoOutside = isSunny && !isRaining;
        System.out.println("\nCan go outside? " + canGoOutside);
        
        boolean needUmbrella = isRaining || !isSunny;
        System.out.println("Need umbrella? " + needUmbrella);
    }
}
```

---

### Exercise 10: Variable Scope
Understand variable scope and lifetime.

```java
public class VariableScope {
    public static void main(String[] args) {
        int outerVariable = 10;
        System.out.println("Outer variable: " + outerVariable);
        
        {
            int innerVariable = 20;
            System.out.println("Inner variable: " + innerVariable);
            System.out.println("Can access outer: " + outerVariable);
        }
        
        // System.out.println(innerVariable); // ERROR! Out of scope
        
        for (int i = 0; i < 3; i++) {
            System.out.println("Loop variable: " + i);
        }
        
        // System.out.println(i); // ERROR! Out of scope
    }
}
```

---

### Exercise 11: Overflow and Underflow
Demonstrate overflow and underflow with data types.

```java
public class OverflowUnderflow {
    public static void main(String[] args) {
        // Byte overflow
        byte maxByte = 127;
        System.out.println("Max byte: " + maxByte);
        maxByte++;
        System.out.println("After increment: " + maxByte); // -128 (overflow)
        
        // Integer overflow
        int maxInt = Integer.MAX_VALUE;
        System.out.println("\nMax int: " + maxInt);
        System.out.println("After increment: " + (maxInt + 1)); // Negative (overflow)
        
        // Underflow
        byte minByte = -128;
        System.out.println("\nMin byte: " + minByte);
        minByte--;
        System.out.println("After decrement: " + minByte); // 127 (underflow)
    }
}
```

---

### Exercise 12: String Concatenation
Practice string concatenation with different types.

```java
public class StringConcatenation {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 25;
        double height = 5.6;
        boolean isStudent = true;
        
        String info = "Name: " + name + ", Age: " + age + 
                      ", Height: " + height + " ft, Student: " + isStudent;
        
        System.out.println(info);
        
        // Concatenation order matters
        System.out.println("Result 1: " + 5 + 3);      // "53" (string)
        System.out.println("Result 2: " + (5 + 3));    // "8" (number)
        System.out.println("Result 3: " + 5 * 3);      // "15" (number)
    }
}
```

4. **Naming Convention**: camelCase for variables, UPPER_CASE for constants
5. **Type Casting**:
   - Implicit: Smaller → Larger (automatic)
   - Explicit: Larger → Smaller (manual, possible data loss)
6. **Constants**: Use `final` keyword, cannot be changed
7. **Reference Types**: Store addresses, can be `null`
8. **Primitive vs Reference**: Primitives store values, references store addresses

---

## ⚠️ Common Mistakes

### 1. Forgetting Suffixes:
```java
long big = 9999999999;   // ERROR! Treated as int
long big = 9999999999L;  // CORRECT

float price = 19.99;     // ERROR! Treated as double
float price = 19.99f;    // CORRECT
```

### 2. Integer Division:
```java
int result = 5 / 2;      // result = 2 (not 2.5!)
double result = 5 / 2;   // result = 2.0 (still wrong!)
double result = 5.0 / 2; // result = 2.5 (correct)
```

### 3. Overflow:
```java
byte b = 127;
b = b + 1;  // b = -128 (overflow!)
```

### 4. Comparing Strings with ==:
```java
String s1 = "Hello";
String s2 = "Hello";
if (s1 == s2) { }        // May work, but wrong approach
if (s1.equals(s2)) { }   // CORRECT way
```

### 5. Uninitialized Variables:
```java
int age;
System.out.println(age);  // ERROR! Variable not initialized
```

---

## 🧭 Navigation

### Week 1 Progress:
- [← Day 1: Introduction & Setup](day01_introduction_setup.md)
- **Day 2: Variables & Data Types** ← You are here
- [Day 3: Operators & Expressions →](day03_operators_expressions.md)
- [Day 4: Control Flow - Conditional Statements](day04_control_flow_conditionals.md)
- [Day 5: Control Flow - Loops](day05_control_flow_loops.md)
- [Day 6: Arrays - Part 1](day06_arrays_part1.md)
- [Day 7: Arrays - Part 2 & Review](day07_arrays_part2_review.md)

### Related Resources:
- [📝 Day 2 Assessment](../../../java-learning-app/src/data/assessments/java/week1/day2.js)
- [💪 Week 1 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Core_Java/Week1_Days01-07_Setup_and_Basics.md)
- [📚 Detailed Topics Reference](../../../02_Detailed_Topics/Detailed_Topics_Core_Java.md#day-2-variables--data-types)
- [🏠 Back to Week 1 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 2 Checklist

Before moving to Day 3, ensure you can:
- [ ] Declare and initialize variables
- [ ] Use all 8 primitive data types correctly
- [ ] Apply proper naming conventions (camelCase)
- [ ] Differentiate between primitive and reference types
- [ ] Perform implicit and explicit type casting
- [ ] Create and use constants with `final`
- [ ] Understand data type ranges and sizes
- [ ] Avoid common mistakes (suffixes, overflow, etc.)

---

**🎉 Congratulations on completing Day 2!**

You now understand Java's data types and variables. Tomorrow, we'll learn about operators and expressions.

**Next**: [Day 3: Operators & Expressions →](day03_operators_expressions.md)

---

*Last Updated: 2026-01-08*