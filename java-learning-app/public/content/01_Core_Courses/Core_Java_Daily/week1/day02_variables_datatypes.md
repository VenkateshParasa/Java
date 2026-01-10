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

**📝 Problem Statement:**
Create a Java program that declares and initializes variables of all 8 primitive data types, then prints their values to the console.

**Requirements:**
- Declare one variable for each of the 8 primitive types (byte, short, int, long, float, double, char, boolean)
- Initialize each variable with an appropriate value
- Use correct suffixes for long (L) and float (f) types
- Print all variable values with descriptive labels

**Sample Test Case:**
```
Expected Output:
Age: 25
Year: 2024
Population: 1000000
World Population: 7800000000
Price: 19.99
Salary: 50000.75
Grade: A
Is Student: true
```

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

**📝 Problem Statement:**
Create a program that demonstrates both implicit (automatic) and explicit (manual) type casting in Java.

**Requirements:**
- Demonstrate implicit casting from int to double
- Demonstrate explicit casting from double to int
- Show character to ASCII conversion
- Show ASCII to character conversion

**Sample Test Case:**
```
Expected Output:
Implicit: 100.0
Explicit: 19
ASCII of A: 65
Char of 66: B
```

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

**📝 Problem Statement:**
Write a program that calculates and displays the area and circumference of a circle given its radius.

**Requirements:**
- Declare PI as a final constant with value 3.14159
- Calculate area using formula: PI × radius²
- Calculate circumference using formula: 2 × PI × radius
- Display radius, area, and circumference

**Sample Test Cases:**
```
Test 1 - radius = 5.0:
Radius: 5.0
Area: 78.53975
Circumference: 31.4159

Test 2 - radius = 10.0:
Radius: 10.0
Area: 314.159
Circumference: 62.8318
```

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

---

### Exercise 4: Variable Swap

**📝 Problem Statement:**
Write a program that swaps the values of two integer variables using a temporary variable.

**Requirements:**
- Declare two integer variables a and b with initial values 10 and 20
- Display the values before swapping
- Swap the values using a temporary variable
- Display the values after swapping

**Sample Test Case:**
```
Before swap:
a = 10, b = 20
After swap:
a = 20, b = 10
```

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

---

### Exercise 5: Data Type Ranges

**📝 Problem Statement:**
Create a program that displays the minimum and maximum values for all numeric primitive data types in Java.

**Requirements:**
- Display the range (MIN_VALUE to MAX_VALUE) for byte, short, int, long, float, and double
- Use the wrapper class constants (e.g., Byte.MIN_VALUE, Byte.MAX_VALUE)
- Print each data type's range on a separate line

**Sample Test Case:**
```
byte: -128 to 127
short: -32768 to 32767
int: -2147483648 to 2147483647
long: -9223372036854775808 to 9223372036854775807
float: 1.4E-45 to 3.4028235E38
double: 4.9E-324 to 1.7976931348623157E308
```

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

### Exercise 6: BMI Calculator

**📝 Problem Statement:**
Calculate Body Mass Index (BMI) using variables and display the health category.

**Requirements:**
- Declare weight in kilograms and height in meters
- Calculate BMI using formula: weight / (height × height)
- Display weight, height, and calculated BMI
- Show health category based on BMI value

**Sample Test Case:**
```
Weight: 70.5 kg
Height: 1.75 m
BMI: 23.02
Category: Normal weight
```

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

**📝 Problem Statement:**
Convert USD to multiple currencies using constants for exchange rates.

**Requirements:**
- Declare exchange rate constants for EUR, GBP, and INR
- Convert a USD amount to all three currencies
- Display results with currency symbols

**Sample Test Case:**
```
Amount in USD: $100.0
Amount in EUR: €85.0
Amount in GBP: £73.0
Amount in INR: ₹8312.0
```

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

**📝 Problem Statement:**
Work with character data type and display ASCII values.

**Requirements:**
- Declare char variables for letter, digit, and symbol
- Display each character and its ASCII value
- Demonstrate character arithmetic

**Sample Test Case:**
```
Letter: A
ASCII value: 65

Digit: 5
ASCII value: 53

Symbol: @
ASCII value: 64

Next letter after A: B
```

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

**📝 Problem Statement:**
Practice with boolean variables and logical operators.

**Requirements:**
- Declare multiple boolean variables
- Use logical AND (&&) and OR (||) operators
- Display results of logical operations

**Sample Test Case:**
```
Is Java fun? true
Is fish tasty? false

Can go outside? true
Need umbrella? false
```

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

**📝 Problem Statement:**
Understand variable scope and lifetime in different blocks.

**Requirements:**
- Demonstrate outer and inner variable scope
- Show variables in loop scope
- Include commented examples of scope errors

**Sample Test Case:**
```
Outer variable: 10
Inner variable: 20
Can access outer: 10
Loop variable: 0
Loop variable: 1
Loop variable: 2
```

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

**📝 Problem Statement:**
Demonstrate overflow and underflow behavior with data types.

**Requirements:**
- Show byte overflow when exceeding maximum value
- Show integer overflow
- Show byte underflow when going below minimum value

**Sample Test Case:**
```
Max byte: 127
After increment: -128

Max int: 2147483647
After increment: -2147483648

Min byte: -128
After decrement: 127
```

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

**📝 Problem Statement:**
Practice string concatenation with different data types and understand operator precedence.

**Requirements:**
- Concatenate string with int, double, and boolean
- Demonstrate concatenation order matters
- Show difference between concatenation and arithmetic

**Sample Test Case:**
```
Name: Alice, Age: 25, Height: 5.6 ft, Student: true
Result 1: 53
Result 2: 8
Result 3: 15
```

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

---

## 🔑 Key Takeaways

1. **8 Primitive Types**: byte, short, int, long, float, double, char, boolean
2. **Default Types**: `int` for integers, `double` for decimals
3. **Suffixes**: `L` for long, `f` for float
4. **Naming Convention**: camelCase for variables, UPPER_CASE for constants
5. **Type Casting**:
   - Implicit: Smaller → Larger (automatic)
   - Explicit: Larger → Smaller (manual, possible data loss)
6. **Constants**: Use `final` keyword, cannot be changed
7. **Reference Types**: Store addresses, can be `null`
8. **Primitive vs Reference**: Primitives store values, references store addresses

---

## ⚠️ Common Mistakes

### 1. Missing Suffixes for long and float

#### ❌ Wrong - Forgetting 'L' Suffix for long:
```java
// WRONG - Compilation error
long big = 9999999999;  // ERROR! Treated as int, causes overflow
```
**Issue:** Compiler treats as int, causes overflow error

#### ✅ Right:
```java
// CORRECT
long big = 9999999999L;  // 'L' suffix tells compiler it's a long
```

**Why:** Java defaults large numbers to int. Values exceeding int range need explicit 'L' suffix.

**💡 Tip:** Always add 'L' for long values and 'f' for float values to avoid compilation errors.

---

#### ❌ Wrong - Float Without 'f' Suffix:
```java
// WRONG - Compilation error
float price = 19.99;  // ERROR! Compiler treats 19.99 as double
```
**Issue:** Compiler treats 19.99 as double, incompatible with float

#### ✅ Right:
```java
// CORRECT
float price = 19.99f;  // 'f' suffix specifies float type
```

**Why:** Decimal literals default to double type in Java.

**💡 Tip:** Use 'f' or 'F' suffix for all float values.

---

### 2. Integer Division Pitfall

#### ❌ Wrong - Integer Division Truncates Decimals:
```java
// WRONG
int result = 5 / 2;  // result = 2 (not 2.5!) - decimal part lost
```
**Issue:** result = 2 (not 2.5!) - decimal part is lost

#### ✅ Right:
```java
// CORRECT
double result = 5.0 / 2;  // result = 2.5 (correct decimal result)
```

**Why:** When both operands are integers, Java performs integer division which truncates the decimal part.

**💡 Tip:** Use at least one double value (5.0) or cast one operand: `(double)5 / 2`

---

#### ❌ Wrong - Double Variable Doesn't Fix Integer Division:
```java
// WRONG
double result = 5 / 2;  // result = 2.0 (division happens first as integers!)
```
**Issue:** result = 2.0 (division happens first as integers, then converted to double)

#### ✅ Right:
```java
// CORRECT
double result = 5.0 / 2;  // result = 2.5 (one operand is double)
```

**Why:** Variable type doesn't affect the division operation; operand types determine the division type.

**💡 Tip:** The division itself must involve a double/float, not just the result variable.

---

### 3. Overflow and Underflow

#### ❌ Wrong - Byte Overflow:
```java
// WRONG
byte b = 127;
b = b + 1;  // b becomes -128 (wraps around to minimum value!)
```
**Issue:** b becomes -128 (wraps around to minimum value)

#### ✅ Right:
```java
// CORRECT
byte b = 127;
if (b < Byte.MAX_VALUE) {
    b++;  // Check before increment to prevent overflow
}
```

**Why:** Exceeding max value wraps to minimum value (127 + 1 = -128).

**💡 Tip:** Be aware of range limits. Use int for most calculations, cast to byte only when storing.

---

#### ❌ Wrong - Integer Overflow in Calculations:
```java
// WRONG
int large = Integer.MAX_VALUE;
int bigger = large + 1;  // bigger = -2147483648 (overflow to minimum int!)
```
**Issue:** bigger = -2147483648 (overflow to minimum int)

#### ✅ Right:
```java
// CORRECT
long bigger = (long)Integer.MAX_VALUE + 1;  // Use long for values beyond int range
```

**Why:** Arithmetic operations that exceed type limits wrap around.

**💡 Tip:** For large calculations, use long or check `Math.addExact()` which throws on overflow.

---

#### ❌ Wrong - Silent Overflow in Multiplication:
```java
// WRONG
int million = 1000000;
int billion = million * 1000;  // Overflow! Result is wrong
System.out.println(billion);  // Prints unexpected value
```
**Issue:** Result overflows int range silently

#### ✅ Right:
```java
// CORRECT
long million = 1000000L;
long billion = million * 1000;  // Use long for large calculations
System.out.println(billion);  // Prints 1000000000
```

**Why:** Multiplication happens in int, then assigned to result. Use long from start.

**💡 Tip:** For large multiplications, ensure at least one operand is long.

---

### 4. String Comparison with ==

#### ❌ Wrong - Using == to Compare String Content:
```java
// WRONG
String s1 = "Hello";
String s2 = "Hello";
if (s1 == s2) { }  // Works here but unreliable!
```
**Issue:** Works due to string pool but fails with new String()

#### ✅ Right:
```java
// CORRECT
String s1 = "Hello";
String s2 = "Hello";
if (s1.equals(s2)) { }  // Always compares content correctly
```

**Why:** == checks if both variables reference the same object in memory, not content equality.

**💡 Tip:** Always use `.equals()` for strings, `.equalsIgnoreCase()` for case-insensitive comparison.

---

#### ❌ Wrong - String Comparison with new String():
```java
// WRONG
String s1 = new String("Hello");
String s2 = new String("Hello");
if (s1 == s2) {  // FALSE! Different objects in memory
    System.out.println("Equal");
}
```
**Issue:** Creates two different objects, == compares references not content

#### ✅ Right:
```java
// CORRECT
String s1 = new String("Hello");
String s2 = new String("Hello");
if (s1.equals(s2)) {  // TRUE! Compares content
    System.out.println("Equal");
}
```

**Why:** new String() creates a new object each time, bypassing string pool.

**💡 Tip:** Avoid using `new String()` unnecessarily; use string literals.

---

#### ❌ Wrong - Null Pointer with String Comparison:
```java
// WRONG
String name = null;
if (name.equals("John")) { }  // Throws NullPointerException!
```
**Issue:** Throws NullPointerException

#### ✅ Right:
```java
// CORRECT
String name = null;
if ("John".equals(name)) { }  // Safe - literal first prevents null errors
```

**Why:** Calling methods on null throws NullPointerException.

**💡 Tip:** Put the known non-null string literal first in equals() comparison.

---

#### ❌ Wrong - Using != for String Comparison:
```java
// WRONG
String input = "yes";
if (input != "yes") {  // Compares references, not content!
    System.out.println("Not yes");
}
```
**Issue:** != compares memory addresses, not string content

#### ✅ Right:
```java
// CORRECT
String input = "yes";
if (!input.equals("yes")) {  // Correctly compares content
    System.out.println("Not yes");
}
```

**Why:** != is the opposite of ==, both compare references not content.

**💡 Tip:** Use `!str1.equals(str2)` for "not equal" comparison.

---

### 5. Uninitialized Local Variables

#### ❌ Wrong - Using Variables Before Initialization:
```java
// WRONG
int age;
System.out.println(age);  // Compilation error: variable might not be initialized
```
**Issue:** Compilation error: variable might not be initialized

#### ✅ Right:
```java
// CORRECT
int age = 0;
System.out.println(age);  // Always initialize local variables before use
```

**Why:** Local variables don't have default values unlike instance variables.

**💡 Tip:** Initialize variables at declaration or in a constructor. Instance variables auto-initialize to 0/false/null.

---

#### ❌ Wrong - Conditional Initialization Not Guaranteed:
```java
// WRONG
int score;
if (true) {
    score = 100;
}
System.out.println(score);  // May cause error if compiler can't verify initialization
```
**Issue:** Compiler may not guarantee initialization even if logically correct

#### ✅ Right:
```java
// CORRECT
int score = 0;  // Initialize with default
if (true) {
    score = 100;
}
System.out.println(score);
```

**Why:** Compiler performs flow analysis; complex conditions may not be verified.

**💡 Tip:** Always initialize variables at declaration, even if overwritten later.

---

### 6. Mixing up Assignment and Comparison

#### ❌ Wrong - Using = Instead of ==:
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

**💡 Tip:** Read = as "gets the value" and == as "equals to". Java prevents this in boolean expressions.

---

### 7. char vs String Confusion

#### ❌ Wrong - Using Double Quotes for char:
```java
// WRONG
char letter = "A";  // Compilation error! "A" is a String, not a char
```
**Issue:** "A" is a String, not a char (compilation error)

#### ✅ Right:
```java
// CORRECT
char letter = 'A';  // Single quotes for char type
```

**Why:** Single quotes denote char (single character), double quotes denote String (object).

**💡 Tip:** `char = 'A'`, `String = "A"` - different types entirely.

---

#### ❌ Wrong - Empty char Literal:
```java
// WRONG
char empty = '';  // Compilation error! char must have exactly one character
```
**Issue:** char cannot be empty

#### ✅ Right:
```java
// CORRECT
char space = ' ';  // Use space character if you need "empty"
char nullChar = '\0';  // Or use null character (Unicode 0)
```

**Why:** char is a 16-bit Unicode character; must have a value.

**💡 Tip:** For empty values, use `'\0'` (null character) or space `' '`.

---

#### ❌ Wrong - Multiple Characters in char:
```java
// WRONG
char word = 'AB';  // Compilation error! char holds only ONE character
```
**Issue:** char can only hold a single character

#### ✅ Right:
```java
// CORRECT
String word = "AB";  // Use String for multiple characters
```

**Why:** char is designed for single characters only.

**💡 Tip:** Use String for any text longer than one character.

---

### 8. Null Assignment to Primitives

#### ❌ Wrong - Assigning null to Primitive Types:
```java
// WRONG
int age = null;  // Compilation error! Primitives cannot be null
```
**Issue:** Primitives cannot be null (compilation error)

#### ✅ Right:
```java
// CORRECT
Integer age = null;  // Use wrapper class for nullable integers
```

**Why:** Primitives store values directly; only objects/references can be null.

**💡 Tip:** Use wrapper classes (Integer, Double, Boolean) when you need null capability.

---

### 9. Type Mismatch Errors

#### ❌ Wrong - Assigning Larger Type to Smaller Without Cast:
```java
// WRONG
long big = 100000L;
int small = big;  // Compilation error! Possible loss of precision
```
**Issue:** Cannot assign long to int without explicit cast

#### ✅ Right:
```java
// CORRECT
long big = 100000L;
int small = (int) big;  // Explicit cast required
```

**Why:** Narrowing conversions require explicit cast to acknowledge potential data loss.

**💡 Tip:** Check value is within target type's range before casting to avoid data loss.

---

#### ❌ Wrong - byte Range Exceeded:
```java
// WRONG
byte b = 130;  // Compilation error! 130 exceeds byte range (-128 to 127)
```
**Issue:** Value exceeds byte range

#### ✅ Right:
```java
// CORRECT
byte b = 127;  // Within byte range
// OR
int value = 130;  // Use larger type for values outside byte range
byte b = (byte) value;  // Explicit cast (but causes overflow!)
```

**Why:** byte range is -128 to 127; values outside require larger types.

**💡 Tip:** Use int for general integers; use byte only when memory is critical.

---

#### ❌ Wrong - Mixing float and double:
```java
// WRONG
float f = 3.14;  // Compilation error! 3.14 is double by default
```
**Issue:** Decimal literals are double by default

#### ✅ Right:
```java
// CORRECT
float f = 3.14f;  // Add 'f' suffix for float literals
// OR
float f = (float) 3.14;  // Cast double to float
```

**Why:** Java defaults decimal literals to double for precision.

**💡 Tip:** Prefer double for most decimal calculations; use float only for memory optimization.

---

### 10. Variable Naming Mistakes

#### ❌ Wrong - Using Java Keywords as Variable Names:
```java
// WRONG
int class = 10;  // Compilation error! 'class' is a keyword
int public = 20;  // Compilation error! 'public' is a keyword
```
**Issue:** Cannot use reserved keywords as variable names

#### ✅ Right:
```java
// CORRECT
int className = 10;  // Add suffix or prefix to make it valid
int publicCount = 20;  // Make it descriptive and valid
```

**Why:** Keywords are reserved for Java syntax.

**💡 Tip:** If your IDE highlights a name in blue/purple, it's likely a keyword.

---

#### ❌ Wrong - Starting Variable Names with Digits:
```java
// WRONG
int 1value = 100;  // Compilation error! Cannot start with digit
int 2ndPlace = 2;  // Compilation error!
```
**Issue:** Variable names cannot start with digits

#### ✅ Right:
```java
// CORRECT
int value1 = 100;  // Start with letter
int secondPlace = 2;  // Or use descriptive word
```

**Why:** Java syntax requires variables to start with letter, $, or _.

**💡 Tip:** Use descriptive names like `firstValue`, `secondValue` instead of numbers.

---

#### ❌ Wrong - Not Following camelCase Convention:
```java
// WRONG (compiles but poor practice)
int student_age = 20;  // snake_case (Python/C style)
int StudentName;  // PascalCase (for classes)
int TOTAL_COUNT = 100;  // UPPER_CASE (for constants)
```
**Issue:** Not following Java naming conventions makes code inconsistent

#### ✅ Right:
```java
// CORRECT
int studentAge = 20;  // camelCase for variables
String studentName;  // camelCase for variables
final int TOTAL_COUNT = 100;  // UPPER_CASE only for constants
```

**Why:** Java conventions: camelCase for variables/methods, PascalCase for classes, UPPER_CASE for constants.

**💡 Tip:** Follow conventions for code readability and team consistency.

---

#### ❌ Wrong - Unclear Single-Letter Variable Names:
```java
// WRONG (poor readability)
int a = 25;  // What does 'a' represent?
double x = 50000.50;  // What is 'x'?
String s = "John";  // What does 's' mean?
```
**Issue:** Single letters provide no context about purpose

#### ✅ Right:
```java
// CORRECT
int studentAge = 25;  // Clear purpose
double annualSalary = 50000.50;  // Self-documenting
String studentName = "John";  // Descriptive
```

**Why:** Code is read more than written; clarity is crucial.

**💡 Tip:** Only use single letters for loop counters (i, j, k) and common math variables (x, y in coordinates).

---

#### ❌ Wrong - Declaring Same Variable Twice in Same Scope:
```java
// WRONG
int count = 10;
int count = 20;  // Compilation error! Variable already defined
```
**Issue:** Cannot declare same variable name twice in same scope

#### ✅ Right:
```java
// CORRECT
int count = 10;
count = 20;  // Reassignment (no 'int' keyword)
// OR
int count = 10;
{
    int count = 20;  // Different scope, allowed
}
```

**Why:** Each variable name must be unique within its scope.

**💡 Tip:** Use assignment (without type) to change existing variable values.

---

### 11. Type Casting Mistakes

#### ❌ Wrong - Unnecessary Casting:
```java
// WRONG (compiles but redundant)
int x = 10;
int y = (int) 20;  // Unnecessary cast, 20 is already int
double d = (double) (5 + 3);  // Unnecessary, can just use 5.0
```
**Issue:** Clutters code with unnecessary casts

#### ✅ Right:
```java
// CORRECT
int x = 10;
int y = 20;  // No cast needed
double d = 5.0 + 3;  // Use literal to trigger double arithmetic
```

**Why:** Only cast when needed for type conversion.

**💡 Tip:** Let Java's type promotion handle upward conversions automatically.

---

#### ❌ Wrong - Casting Causing Data Loss Without Awareness:
```java
// WRONG (compiles but loses data)
double price = 19.99;
int dollars = (int) price;  // dollars = 19, loses 0.99!
System.out.println(dollars);  // Prints 19, not 20
```
**Issue:** Casting truncates decimal part without rounding

#### ✅ Right:
```java
// CORRECT
double price = 19.99;
int dollars = (int) Math.round(price);  // dollars = 20 (rounded)
System.out.println(dollars);  // Prints 20
```

**Why:** (int) cast truncates; use Math.round() for proper rounding.

**💡 Tip:** For money calculations, use Math.round() or BigDecimal for precision.

---

#### ❌ Wrong - Multiple Chained Casts:
```java
// WRONG (confusing and error-prone)
byte b = (byte) (int) (long) 100L;  // Multiple unnecessary casts
```
**Issue:** Confusing and unnecessary

#### ✅ Right:
```java
// CORRECT
byte b = (byte) 100L;  // Direct cast to target type
```

**Why:** Java handles intermediate conversions automatically.

**💡 Tip:** Cast directly to final type; Java handles the rest.

---

### 12. Constant (final) Mistakes

#### ❌ Wrong - Trying to Reassign final Variables:
```java
// WRONG
final int MAX_SIZE = 100;
MAX_SIZE = 200;  // Compilation error! Cannot reassign final variable
```
**Issue:** final variables cannot be reassigned after initialization

#### ✅ Right:
```java
// CORRECT
final int MAX_SIZE = 100;
// Use the constant, don't reassign it
int size = MAX_SIZE;
```

**Why:** final keyword makes variables immutable (constant).

**💡 Tip:** Use final for values that should never change (PI, MAX_COUNT, etc.).

---

#### ❌ Wrong - Not Initializing final Variables:
```java
// WRONG
final int MAX_USERS;  // Compilation error! Must be initialized
System.out.println(MAX_USERS);
```
**Issue:** final variables must be initialized when declared (or in constructor for instance variables)

#### ✅ Right:
```java
// CORRECT
final int MAX_USERS = 1000;  // Initialize at declaration
System.out.println(MAX_USERS);
```

**Why:** final variables cannot be assigned later, so must be initialized immediately.

**💡 Tip:** Initialize final variables at declaration for clarity.

---

#### ❌ Wrong - Using lowercase for Constants:
```java
// WRONG (compiles but violates convention)
final int maxSize = 100;  // Should be UPPER_CASE
final double pi = 3.14159;  // Should be UPPER_CASE
```
**Issue:** Constants should use UPPER_CASE naming convention

#### ✅ Right:
```java
// CORRECT
final int MAX_SIZE = 100;  // UPPER_CASE with underscores
final double PI = 3.14159;  // Clear that it's a constant
```

**Why:** UPPER_CASE naming makes constants easily identifiable.

**💡 Tip:** Use UPPER_CASE_WITH_UNDERSCORES for all final constants.

---

### 13. Division by Zero

#### ❌ Wrong - Integer Division by Zero:
```java
// WRONG
int result = 10 / 0;  // Runtime error! ArithmeticException: / by zero
```
**Issue:** Throws ArithmeticException at runtime

#### ✅ Right:
```java
// CORRECT
int dividend = 10;
int divisor = 0;
if (divisor != 0) {
    int result = dividend / divisor;
} else {
    System.out.println("Cannot divide by zero!");
}
```

**Why:** Division by zero is undefined and causes runtime exception.

**💡 Tip:** Always check divisor is not zero before division.

---

#### ❌ Wrong - Floating-Point Division by Zero:
```java
// WRONG (no exception but result is Infinity)
double result = 10.0 / 0.0;  // result = Infinity
System.out.println(result);  // Prints "Infinity"
```
**Issue:** Results in Infinity, not an error, which may cause bugs later

#### ✅ Right:
```java
// CORRECT
double dividend = 10.0;
double divisor = 0.0;
if (divisor != 0.0) {
    double result = dividend / divisor;
    System.out.println(result);
} else {
    System.out.println("Cannot divide by zero!");
}
```

**Why:** Floating-point division by zero returns Infinity/NaN instead of throwing exception.

**💡 Tip:** Check for zero before division to avoid Infinity/NaN in calculations.

---

### 14. Modulo Mistakes

#### ❌ Wrong - Modulo by Zero:
```java
// WRONG
int remainder = 10 % 0;  // Runtime error! ArithmeticException: / by zero
```
**Issue:** Throws ArithmeticException at runtime

#### ✅ Right:
```java
// CORRECT
int dividend = 10;
int divisor = 0;
if (divisor != 0) {
    int remainder = dividend % divisor;
} else {
    System.out.println("Cannot modulo by zero!");
}
```

**Why:** Modulo by zero is undefined, same as division by zero.

**💡 Tip:** Always validate divisor before modulo operation.

---

#### ❌ Wrong - Expecting Positive Modulo with Negative Numbers:
```java
// WRONG (compiles but unexpected result)
int result = -5 % 3;  // result = -2 (not 1!)
System.out.println(result);  // Prints -2
```
**Issue:** Modulo result takes sign of dividend, not divisor

#### ✅ Right:
```java
// CORRECT
int dividend = -5;
int divisor = 3;
int result = ((dividend % divisor) + divisor) % divisor;  // result = 1
System.out.println(result);  // Prints 1
```

**Why:** Java modulo result follows sign of dividend.

**💡 Tip:** For always-positive modulo, use: `((x % n) + n) % n`

---

### 15. Compound Assignment Issues

#### ❌ Wrong - Compound Assignment Narrowing:
```java
// WRONG (compiles due to implicit cast but can be unexpected)
byte b = 10;
b = b + 5;  // Compilation error! int cannot be assigned to byte
```
**Issue:** b + 5 promotes to int, cannot assign back to byte without cast

#### ✅ Right:
```java
// CORRECT
byte b = 10;
b += 5;  // Compound operator includes implicit cast
// OR
b = (byte) (b + 5);  // Explicit cast
```

**Why:** b + 5 evaluates as int; b += 5 includes automatic narrowing cast.

**💡 Tip:** Use compound operators (+=, -=) for automatic casting with narrow types.

---

### 16. Wrapper Class Mistakes

#### ❌ Wrong - NullPointerException with Unboxing:
```java
// WRONG
Integer num = null;
int value = num;  // Runtime error! NullPointerException during unboxing
```
**Issue:** Unboxing null wrapper throws NullPointerException

#### ✅ Right:
```java
// CORRECT
Integer num = null;
if (num != null) {
    int value = num;  // Safe unboxing
} else {
    int value = 0;  // Default value
}
```

**Why:** Auto-unboxing calls .intValue() on null, throwing exception.

**💡 Tip:** Always check wrapper objects for null before unboxing.

---

#### ❌ Wrong - Using == with Wrapper Classes:
```java
// WRONG (unreliable)
Integer a = 128;
Integer b = 128;
if (a == b) {  // FALSE! Different objects
    System.out.println("Equal");
}
```
**Issue:** == compares references, not values (works for -128 to 127 due to cache)

#### ✅ Right:
```java
// CORRECT
Integer a = 128;
Integer b = 128;
if (a.equals(b)) {  // TRUE! Compares values
    System.out.println("Equal");
}
```

**Why:** Integer cache only caches -128 to 127; outside this range, == compares different objects.

**💡 Tip:** Always use .equals() for wrapper class comparison.

---

#### ❌ Wrong - Integer Cache Confusion:
```java
// WRONG (misleading behavior)
Integer a = 100;
Integer b = 100;
System.out.println(a == b);  // TRUE (cached)

Integer c = 200;
Integer d = 200;
System.out.println(c == d);  // FALSE (not cached)
```
**Issue:** Behavior differs based on value range

#### ✅ Right:
```java
// CORRECT
Integer a = 100;
Integer b = 100;
System.out.println(a.equals(b));  // TRUE (always reliable)

Integer c = 200;
Integer d = 200;
System.out.println(c.equals(d));  // TRUE (always reliable)
```

**Why:** Integer caches values -128 to 127; use .equals() for consistent behavior.

**💡 Tip:** Never rely on == for wrapper classes; always use .equals().

---

### 17. Variable Scope Mistakes

#### ❌ Wrong - Accessing Variable Outside Scope:
```java
// WRONG
if (true) {
    int x = 10;
}
System.out.println(x);  // Compilation error! x is out of scope
```
**Issue:** Variables declared inside blocks are not accessible outside

#### ✅ Right:
```java
// CORRECT
int x;  // Declare outside block
if (true) {
    x = 10;  // Assign inside block
}
System.out.println(x);  // Accessible here
```

**Why:** Variables are scoped to the block they're declared in.

**💡 Tip:** Declare variables in the outermost scope where they're needed.

---

#### ❌ Wrong - Variable Shadowing:
```java
// WRONG (compiles but confusing)
int count = 10;
{
    int count = 20;  // Shadows outer count
    System.out.println(count);  // Prints 20
}
System.out.println(count);  // Prints 10
```
**Issue:** Inner variable shadows outer, causing confusion

#### ✅ Right:
```java
// CORRECT
int count = 10;
{
    int innerCount = 20;  // Different name, no shadowing
    System.out.println(innerCount);  // Prints 20
}
System.out.println(count);  // Prints 10
```

**Why:** Shadowing makes code hard to understand and debug.

**💡 Tip:** Use distinct names for variables in different scopes.

---

### 18. Redundant Code Mistakes

#### ❌ Wrong - Redundant Initialization:
```java
// WRONG (redundant)
int count = 0;
count = 10;  // Why initialize to 0 first?
```
**Issue:** Unnecessary extra assignment

#### ✅ Right:
```java
// CORRECT
int count = 10;  // Initialize to final value directly
```

**Why:** Direct initialization is clearer and more efficient.

**💡 Tip:** Initialize variables to their intended value, not placeholders.

---

#### ❌ Wrong - Unnecessary Type Specification:
```java
// WRONG (verbose)
int number = new Integer(10);  // Boxing then unboxing
```
**Issue:** Unnecessary object creation

#### ✅ Right:
```java
// CORRECT
int number = 10;  // Direct primitive assignment
// OR if you need Integer object:
Integer number = 10;  // Autoboxing
```

**Why:** Primitives don't need wrapper objects unless specifically required.

**💡 Tip:** Use primitives for simple values; wrappers only when needed (collections, null values).

---

### 19. Printing Mistakes

#### ❌ Wrong - Concatenating Primitives Before String:
```java
// WRONG (unexpected result)
System.out.println(5 + 3 + " is the sum");  // Prints "8 is the sum" (OK)
System.out.println("Sum: " + 5 + 3);  // Prints "Sum: 53" (WRONG!)
```
**Issue:** Left-to-right evaluation: "Sum: " + 5 = "Sum: 5", then + 3 = "Sum: 53"

#### ✅ Right:
```java
// CORRECT
System.out.println("Sum: " + (5 + 3));  // Prints "Sum: 8"
```

**Why:** Parentheses force arithmetic before concatenation.

**💡 Tip:** Use parentheses around arithmetic when mixing with strings.

---

### 20. Implicit Type Conversion Mistakes

#### ❌ Wrong - Assuming Precision is Maintained:
```java
// WRONG (data loss)
float f = 123456789f;
System.out.println(f);  // Prints 1.23456792E8 (not exact!)
```
**Issue:** float has limited precision (~7 digits)

#### ✅ Right:
```java
// CORRECT
double d = 123456789.0;  // Use double for higher precision (~15 digits)
System.out.println(d);  // Prints 1.23456789E8 (more accurate)
```

**Why:** float uses 32 bits, double uses 64 bits for better precision.

**💡 Tip:** Prefer double over float unless memory is critically constrained.

---

This comprehensive list now contains **30+ common mistakes** covering every aspect of Day 2: Variables & Data Types!

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