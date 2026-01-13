# Java Core - BEGINNER-FRIENDLY Detailed Exercises (Days 1-15)

## 📌 How to Use These Exercises

**Each exercise includes:**
1. ✅ Exact step-by-step instructions
2. ✅ Code structure to follow
3. ✅ Expected output format
4. ✅ Common mistakes to avoid
5. ✅ Hints and tips

**For Weeks 1-2, exercises are VERY detailed. As you progress, they become less hand-holdy.**

---

## Week 1: Java Basics

### Day 1: Introduction & Setup

---

#### Exercise 1: Hello World (5 minutes)

**What you'll learn:** Creating your first Java class and printing to console

**Step-by-Step:**
1. In IntelliJ, right-click on `src` folder
2. Select: New → Java Class
3. Name it: `HelloWorld`
4. IntelliJ creates this:
```java
public class HelloWorld {

}
```

5. Place your cursor inside the class (between the { })
6. Type: `psvm` and press Tab (this is a shortcut for main method)
7. IntelliJ creates:
```java
public class HelloWorld {
    public static void main(String[] args) {

    }
}
```

8. Inside main method, type: `sout` and press Tab (shortcut for System.out.println)
9. IntelliJ creates: `System.out.println();`
10. Between the parentheses, type: `"Hello, World!"`

**Your complete code should look like:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Run the program:**
- Click the green ▶ button next to main method
- OR right-click anywhere → Run 'HelloWorld.main()'

**Expected Output (in console at bottom):**
```
Hello, World!
```

**✅ Success Criteria:**
- No red underlines in code
- Output appears in console
- Exactly matches expected output

**❌ Common Mistakes:**
- Forgetting semicolon `;` at end of line
- Not putting text in quotes `""`
- Misspelling `System` or `println`

---

#### Exercise 2: Print Multiple Lines (10 minutes)

**What you'll learn:** Using println multiple times, understanding each statement executes separately

**Create new class: `PersonalInfo`**

**Your Task:** Print your information in this EXACT format:
```
Name: [Your Name]
City: [Your City]
Age: [Your Age]
Hobby: [Your Hobby]
```

**Step-by-Step:**

1. Create new class: `PersonalInfo`
2. Add main method (remember: `psvm` + Tab)
3. Add FOUR println statements

**Start typing:**
```java
public class PersonalInfo {
    public static void main(String[] args) {
        // TODO: Add your code below

    }
}
```

**Now add the println statements:**
```java
public class PersonalInfo {
    public static void main(String[] args) {
        System.out.println("Name: John Doe");      // Replace with your name
        System.out.println("City: New York");       // Replace with your city
        System.out.println("Age: 25");              // Replace with your age
        System.out.println("Hobby: Coding");        // Replace with your hobby
    }
}
```

**My Output (yours will be different):**
```
Name: John Doe
City: New York
Age: 25
Hobby: Coding
```

**✅ Success Criteria:**
- 4 separate lines of output
- Each line has label and value
- No errors when running

**💡 Key Learning:**
- Each `println` creates a new line
- You can have as many println statements as you want
- Order matters - they print top to bottom

---

#### Exercise 3: Creating a Box with Text (15 minutes)

**What you'll learn:** Printing special characters, creating formatted output

**Create new class: `WelcomeBox`**

**Your Task:** Print this EXACT pattern:
```
============================
    Welcome to Java!
    Author: [Your Name]
    Date: January 2026
============================
```

**Step-by-Step:**

```java
public class WelcomeBox {
    public static void main(String[] args) {
        // Line 1: Top border (28 equal signs)
        System.out.println("============================");

        // Line 2: Title with 4 spaces before it
        System.out.println("    Welcome to Java!");

        // Line 3: Author with 4 spaces before it
        System.out.println("    Author: Your Name");  // Replace Your Name

        // Line 4: Date with 4 spaces before it
        System.out.println("    Date: January 2026");

        // Line 5: Bottom border (28 equal signs)
        System.out.println("============================");
    }
}
```

**Expected Output:**
```
============================
    Welcome to Java!
    Author: Your Name
    Date: January 2026
============================
```

**✅ Success Criteria:**
- 5 lines of output
- Top and bottom borders match (same number of = signs)
- Middle lines have 4 spaces at start

**💡 Tips:**
- Count the equal signs carefully (28 in this example)
- Use spaces (spacebar) to create indentation
- Comments help you remember what each line does

---

#### Exercise 4: Simple Pattern (15 minutes)

**What you'll learn:** Printing patterns using characters

**Create new class: `StarPattern`**

**Your Task:** Print this EXACT pattern:
```
  *
 ***
*****
 ***
  *
```

**Step-by-Step:**

```java
public class StarPattern {
    public static void main(String[] args) {
        // Line 1: 2 spaces, then 1 star
        System.out.println("  *");

        // Line 2: 1 space, then 3 stars
        System.out.println(" ***");

        // Line 3: 0 spaces, then 5 stars
        System.out.println("*****");

        // Line 4: 1 space, then 3 stars
        System.out.println(" ***");

        // Line 5: 2 spaces, then 1 star
        System.out.println("  *");
    }
}
```

**Expected Output:**
```
  *
 ***
*****
 ***
  *
```

**✅ Success Criteria:**
- Diamond shape appears
- Stars are centered
- 5 lines total

**❌ Common Mistakes:**
- Not counting spaces correctly
- Using tabs instead of spaces (don't!)
- Extra spaces at the end (they're invisible but wrong)

**💡 How to check your spacing:**
Put your cursor at the start of each line in the code and count:
- Line 1: Space, Space, *
- Line 2: Space, *, *, *
- Line 3: *, *, *, *, *

---

#### Exercise 5: System Information (10 minutes)

**What you'll learn:** Combining text and numbers, creating a report

**Create new class: `SetupComplete`**

**Your Task:** Print a setup completion report

```java
public class SetupComplete {
    public static void main(String[] args) {
        System.out.println("===== Java Setup Report =====");
        System.out.println("Java Version: 17");
        System.out.println("IDE: IntelliJ IDEA");
        System.out.println("Status: Ready to Learn!");
        System.out.println("Day 1 Exercises: 5/5 Complete");
        System.out.println("=============================");
    }
}
```

**Expected Output:**
```
===== Java Setup Report =====
Java Version: 17
IDE: IntelliJ IDEA
Status: Ready to Learn!
Day 1 Exercises: 5/5 Complete
=============================
```

**✅ Congratulations! Day 1 Complete!**

---

### Day 2: Variables & Data Types

---

#### Exercise 1: Your First Variable (10 minutes)

**What you'll learn:** Creating and using variables

**Create new class: `FirstVariable`**

**Concept:** A variable is like a labeled box that stores a value.

**Step-by-Step:**

```java
public class FirstVariable {
    public static void main(String[] args) {
        // Step 1: Create a variable to store your age
        // Format: dataType variableName = value;
        int age = 25;  // Replace 25 with your age

        // Step 2: Print the variable
        System.out.println(age);

        // Step 3: Print with a label
        System.out.println("My age is: " + age);
    }
}
```

**Expected Output (if age = 25):**
```
25
My age is: 25
```

**Key Concepts:**
- `int` = integer (whole number)
- `age` = variable name (use camelCase)
- `=` = assignment operator (not equals!)
- `25` = the value stored
- `;` = end of statement

**To print variable with text:**
- Use `+` to join text and variable
- Text in quotes `"My age is: "`
- Variable without quotes `age`

---

#### Exercise 2: All Primitive Types (20 minutes)

**What you'll learn:** The 8 primitive data types in Java

**Create new class: `AllDataTypes`**

**Your Task:** Create one variable of each primitive type and print them

```java
public class AllDataTypes {
    public static void main(String[] args) {
        // 1. byte: Very small integer (-128 to 127)
        byte myAge = 25;
        System.out.println("byte - Age: " + myAge);

        // 2. short: Small integer (-32,768 to 32,767)
        short yearOfBirth = 1999;
        System.out.println("short - Year: " + yearOfBirth);

        // 3. int: Regular integer (most commonly used)
        int population = 1000000;
        System.out.println("int - Population: " + population);

        // 4. long: Large integer (needs 'L' at end)
        long distanceToSun = 149600000L;  // Don't forget the L!
        System.out.println("long - Distance: " + distanceToSun + " km");

        // 5. float: Decimal number (needs 'f' at end)
        float price = 99.99f;  // Don't forget the f!
        System.out.println("float - Price: $" + price);

        // 6. double: Larger decimal number (most commonly used for decimals)
        double piValue = 3.14159;
        System.out.println("double - Pi: " + piValue);

        // 7. char: Single character (use single quotes '')
        char grade = 'A';  // Single quotes, not double!
        System.out.println("char - Grade: " + grade);

        // 8. boolean: True or false only
        boolean isPassed = true;
        System.out.println("boolean - Passed: " + isPassed);

        System.out.println("\n✅ All 8 primitive types demonstrated!");
    }
}
```

**Expected Output:**
```
byte - Age: 25
short - Year: 1999
int - Population: 1000000
long - Distance: 149600000 km
float - Price: $99.99
double - Pi: 3.14159
char - Grade: A
boolean - Passed: true

✅ All 8 primitive types demonstrated!
```

**✅ Success Criteria:**
- All 8 variables declared correctly
- Long has 'L' at end
- Float has 'f' at end
- Char uses single quotes ' '
- All print correctly

**❌ Common Mistakes:**
| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `long x = 123456789;` | Might be too big | `long x = 123456789L;` |
| `float price = 99.99;` | 99.99 is double by default | `float price = 99.99f;` |
| `char letter = "A";` | Double quotes are for String | `char letter = 'A';` |
| `boolean test = 1;` | 1 is not true in Java | `boolean test = true;` |

---

#### Exercise 3: Student Information System (25 minutes)

**What you'll learn:** Using multiple variables together, creating meaningful programs

**Create new class: `StudentInfo`**

**Your Task:** Store and display a student's complete information

**Step-by-Step with EXACT code:**

```java
public class StudentInfo {
    public static void main(String[] args) {
        // ===== STEP 1: Declare all variables =====

        // Student's name (String, not primitive but we'll use it)
        String studentName = "Alice Johnson";

        // Roll number (unique ID)
        int rollNumber = 101;

        // Marks obtained (out of 100)
        double marksObtained = 87.5;

        // Maximum marks
        int maxMarks = 100;

        // Grade received
        char grade = 'B';

        // Did the student pass? (passing marks = 40)
        boolean hasPassed = true;

        // ===== STEP 2: Print the information =====
        System.out.println("====== STUDENT REPORT CARD ======");
        System.out.println("Name: " + studentName);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marksObtained + "/" + maxMarks);
        System.out.println("Grade: " + grade);
        System.out.println("Status: " + (hasPassed ? "PASSED" : "FAILED"));
        System.out.println("=================================");

        // ===== STEP 3: Calculate percentage =====
        double percentage = (marksObtained / maxMarks) * 100;
        System.out.println("Percentage: " + percentage + "%");
    }
}
```

**Expected Output:**
```
====== STUDENT REPORT CARD ======
Name: Alice Johnson
Roll Number: 101
Marks: 87.5/100
Grade: B
Status: PASSED
=================================
Percentage: 87.5%
```

**✅ Success Criteria:**
- All variables declared with correct types
- Report prints in formatted way
- Percentage calculates correctly

**💡 New Concepts Used:**
1. **String**: Text data (multiple characters)
   - `String name = "Alice";`

2. **Concatenation**: Joining with `+`
   - `"Marks: " + marks + "/" + maxMarks`

3. **Calculation**: Math in println
   - `(marksObtained / maxMarks) * 100`

4. **Ternary Operator** (bonus, don't worry if confusing):
   - `(condition ? valueIfTrue : valueIfFalse)`

**🎯 Challenge:** Modify this program with YOUR information!

---

#### Exercise 4: Type Casting - Seeing Data Loss (20 minutes)

**What you'll learn:** Converting between data types, understanding data loss

**Create new class: `TypeCastingDemo`**

**Concept:**
- **Implicit Casting** (Automatic): Small → Large (safe, no data loss)
- **Explicit Casting** (Manual): Large → Small (may lose data!)

```java
public class TypeCastingDemo {
    public static void main(String[] args) {
        System.out.println("===== IMPLICIT CASTING (Automatic) =====");

        // Example 1: int to double (safe, no data loss)
        int wholeNumber = 42;
        double decimalNumber = wholeNumber;  // Automatic conversion

        System.out.println("Original int: " + wholeNumber);
        System.out.println("Converted to double: " + decimalNumber);
        System.out.println("Notice: 42 became 42.0");
        System.out.println();

        // Example 2: char to int (see ASCII value)
        char letter = 'A';
        int asciiValue = letter;  // Automatic conversion

        System.out.println("Character: " + letter);
        System.out.println("ASCII value: " + asciiValue);
        System.out.println("'A' has ASCII value 65!");
        System.out.println();

        System.out.println("===== EXPLICIT CASTING (Manual) =====");

        // Example 3: double to int (data loss!)
        double price = 99.99;
        int roundedPrice = (int) price;  // Manual conversion with (int)

        System.out.println("Original double: " + price);
        System.out.println("Converted to int: " + roundedPrice);
        System.out.println("Lost decimal part: " + (price - roundedPrice));
        System.out.println();

        // Example 4: long to int (might lose data)
        long bigNumber = 123456L;
        int smallNumber = (int) bigNumber;  // Manual conversion

        System.out.println("Original long: " + bigNumber);
        System.out.println("Converted to int: " + smallNumber);
        System.out.println();

        // Example 5: Dangerous casting (data corruption)
        long tooBig = 9999999999L;  // Too big for int!
        int result = (int) tooBig;  // Will give wrong value!

        System.out.println("DANGER ZONE:");
        System.out.println("Original long: " + tooBig);
        System.out.println("Converted to int: " + result);
        System.out.println("⚠️ Data corrupted! Number is wrong!");
    }
}
```

**Expected Output:**
```
===== IMPLICIT CASTING (Automatic) =====
Original int: 42
Converted to double: 42.0
Notice: 42 became 42.0

Character: A
ASCII value: 65
'A' has ASCII value 65!

===== EXPLICIT CASTING (Manual) =====
Original double: 99.99
Converted to int: 99
Lost decimal part: 0.9900000000000091

Original long: 123456
Converted to int: 123456

DANGER ZONE:
Original long: 9999999999
Converted to int: 1410065407
⚠️ Data corrupted! Number is wrong!
```

**✅ Key Takeaways:**
1. **Widening** (small → large) is automatic and safe
2. **Narrowing** (large → small) needs `(type)` and may lose data
3. Decimal part is LOST when converting double → int
4. Too-large numbers become garbage when converted

**Syntax for Explicit Casting:**
```java
double price = 99.99;
int intPrice = (int) price;  // Put (int) before the variable
//             ^^^^^ This is the casting operator
```

---

#### Exercise 5: Circle Calculator with Constants (20 minutes)

**What you'll learn:** Using final keyword for constants, performing calculations

**Create new class: `CircleCalculator`**

**Your Task:** Calculate area and circumference of a circle

**Formula Reminder:**
- Area = π × radius × radius
- Circumference = 2 × π × radius

```java
public class CircleCalculator {
    public static void main(String[] args) {
        // STEP 1: Define constant for PI
        // 'final' means this value cannot be changed
        // Constant names are UPPERCASE by convention
        final double PI = 3.14159;

        // STEP 2: Define the radius
        double radius = 7.5;

        // STEP 3: Calculate area
        // Area = PI * radius * radius
        double area = PI * radius * radius;

        // STEP 4: Calculate circumference
        // Circumference = 2 * PI * radius
        double circumference = 2 * PI * radius;

        // STEP 5: Print results
        System.out.println("===== CIRCLE CALCULATOR =====");
        System.out.println("Radius: " + radius + " units");
        System.out.println("PI value: " + PI);
        System.out.println();
        System.out.println("Area: " + area + " square units");
        System.out.println("Circumference: " + circumference + " units");
        System.out.println("=============================");

        // BONUS: Try to change PI (this will cause an error!)
        // Uncomment the line below to see the error
        // PI = 3.14;  // ERROR! Cannot assign a value to final variable PI
    }
}
```

**Expected Output:**
```
===== CIRCLE CALCULATOR =====
Radius: 7.5 units
PI value: 3.14159

Area: 176.71459375 square units
Circumference: 47.12385 units
=============================
```

**✅ Success Criteria:**
- PI is declared as final
- Calculations are correct
- Output shows all values

**💡 Why use 'final'?**
- PI never changes (it's always 3.14159...)
- 'final' prevents accidental modification
- Makes code safer and clearer
- Constants in UPPERCASE make them easy to spot

**🎯 Challenge Tasks:**
1. Change radius to 10 and re-run
2. Add calculation for diameter (diameter = 2 × radius)
3. Try to change PI value and see the error

---

#### Exercise 6: Temperature Converter (25 minutes)

**What you'll learn:** More complex calculations, formatting output

**Create new class: `TemperatureConverter`**

**Formulas:**
- Celsius to Fahrenheit: F = (C × 9/5) + 32
- Fahrenheit to Celsius: C = (F - 32) × 5/9

```java
public class TemperatureConverter {
    public static void main(String[] args) {
        System.out.println("===== TEMPERATURE CONVERTER =====");
        System.out.println();

        // ===== PART 1: Celsius to Fahrenheit =====
        System.out.println("--- Celsius to Fahrenheit ---");

        double celsius = 25.0;

        // Formula: F = (C * 9/5) + 32
        // IMPORTANT: Use 9.0/5.0 not 9/5 to avoid integer division!
        double fahrenheit = (celsius * 9.0 / 5.0) + 32;

        System.out.println("Celsius: " + celsius + "°C");
        System.out.println("Fahrenheit: " + fahrenheit + "°F");
        System.out.println();

        // ===== PART 2: Fahrenheit to Celsius =====
        System.out.println("--- Fahrenheit to Celsius ---");

        double fahrenheit2 = 77.0;

        // Formula: C = (F - 32) * 5/9
        double celsius2 = (fahrenheit2 - 32) * 5.0 / 9.0;

        System.out.println("Fahrenheit: " + fahrenheit2 + "°F");
        System.out.println("Celsius: " + celsius2 + "°C");
        System.out.println();

        // ===== PART 3: Verify round-trip conversion =====
        System.out.println("--- Verification ---");
        System.out.println("Started with: " + celsius + "°C");
        System.out.println("Converted to: " + fahrenheit + "°F");
        System.out.println("Converted back: " + celsius2 + "°C");

        // Check if we got back to original (approximately)
        if (Math.abs(celsius - celsius2) < 0.01) {
            System.out.println("✅ Conversion verified!");
        } else {
            System.out.println("❌ Something went wrong!");
        }

        System.out.println("=================================");
    }
}
```

**Expected Output:**
```
===== TEMPERATURE CONVERTER =====

--- Celsius to Fahrenheit ---
Celsius: 25.0°C
Fahrenheit: 77.0°F

--- Fahrenheit to Celsius ---
Fahrenheit: 77.0°F
Celsius: 25.0°C

--- Verification ---
Started with: 25.0°C
Converted to: 77.0°F
Converted back: 25.0°C
✅ Conversion verified!
=================================
```

**❌ CRITICAL MISTAKE TO AVOID:**

**WRONG WAY:**
```java
double result = (celsius * 9/5) + 32;  // ❌ INTEGER DIVISION!
// 9/5 = 1 (not 1.8) because both are integers!
```

**RIGHT WAY:**
```java
double result = (celsius * 9.0/5.0) + 32;  // ✅ DECIMAL DIVISION!
// 9.0/5.0 = 1.8 (correct!)
```

**✅ Success Criteria:**
- Both conversions work correctly
- 25°C = 77°F
- 77°F = 25°C
- Verification shows ✅

**🎯 Test Your Understanding:**
Try these temperatures:
1. Convert 0°C to Fahrenheit (should be 32°F)
2. Convert 100°C to Fahrenheit (should be 212°F - boiling point!)
3. Convert -40°C to Fahrenheit (should be -40°F - they're the same!)

---

#### Exercise 7: Data Type Size Explorer (15 minutes)

**What you'll learn:** Understanding range and size of data types

**Create new class: `DataTypeSizes`**

```java
public class DataTypeSizes {
    public static void main(String[] args) {
        System.out.println("===== JAVA DATA TYPE RANGES =====");
        System.out.println();

        // Byte
        System.out.println("BYTE:");
        System.out.println("  Size: 1 byte (8 bits)");
        System.out.println("  Min value: " + Byte.MIN_VALUE);
        System.out.println("  Max value: " + Byte.MAX_VALUE);
        System.out.println();

        // Short
        System.out.println("SHORT:");
        System.out.println("  Size: 2 bytes (16 bits)");
        System.out.println("  Min value: " + Short.MIN_VALUE);
        System.out.println("  Max value: " + Short.MAX_VALUE);
        System.out.println();

        // Integer
        System.out.println("INTEGER:");
        System.out.println("  Size: 4 bytes (32 bits)");
        System.out.println("  Min value: " + Integer.MIN_VALUE);
        System.out.println("  Max value: " + Integer.MAX_VALUE);
        System.out.println();

        // Long
        System.out.println("LONG:");
        System.out.println("  Size: 8 bytes (64 bits)");
        System.out.println("  Min value: " + Long.MIN_VALUE);
        System.out.println("  Max value: " + Long.MAX_VALUE);
        System.out.println();

        // Float
        System.out.println("FLOAT:");
        System.out.println("  Size: 4 bytes (32 bits)");
        System.out.println("  Min value: " + Float.MIN_VALUE);
        System.out.println("  Max value: " + Float.MAX_VALUE);
        System.out.println();

        // Double
        System.out.println("DOUBLE:");
        System.out.println("  Size: 8 bytes (64 bits)");
        System.out.println("  Min value: " + Double.MIN_VALUE);
        System.out.println("  Max value: " + Double.MAX_VALUE);
        System.out.println();

        System.out.println("===================================");

        // Practical example
        System.out.println("\nPRACTICAL EXAMPLE:");
        System.out.println("If you try to store 200 in a byte:");
        byte smallNumber = 100;  // OK
        System.out.println("  byte = 100 ✅ Works fine");

        // This would cause an error:
        // byte tooBig = 200;  // ❌ Error! 200 is too big for byte
        System.out.println("  byte = 200 ❌ ERROR! Max is 127");
    }
}
```

**Expected Output:**
```
===== JAVA DATA TYPE RANGES =====

BYTE:
  Size: 1 byte (8 bits)
  Min value: -128
  Max value: 127

SHORT:
  Size: 2 bytes (16 bits)
  Min value: -32768
  Max value: 32767

INTEGER:
  Size: 4 bytes (32 bits)
  Min value: -2147483648
  Max value: 2147483647

LONG:
  Size: 8 bytes (64 bits)
  Min value: -9223372036854775808
  Max value: 9223372036854775807

FLOAT:
  Size: 4 bytes (32 bits)
  Min value: 1.4E-45
  Max value: 3.4028235E38

DOUBLE:
  Size: 8 bytes (64 bits)
  Min value: 4.9E-324
  Max value: 1.7976931348623157E308

===================================

PRACTICAL EXAMPLE:
If you try to store 200 in a byte:
  byte = 100 ✅ Works fine
  byte = 200 ❌ ERROR! Max is 127
```

**💡 Key Learnings:**
1. **Wrapper Classes** (Byte, Short, Integer, Long, Float, Double):
   - Capital letter versions of primitives
   - Have useful methods like MIN_VALUE, MAX_VALUE

2. **Choosing the right type:**
   - Age? Use `byte` (0-127 is enough)
   - Year? Use `short` (up to 32,767)
   - Money? Use `double` (needs decimals)
   - ID numbers? Use `int` (up to 2 billion+)

**✅ Day 2 Complete! You now understand:**
- All 8 primitive data types
- When to use each type
- Type casting (automatic and manual)
- Constants with final keyword
- Basic calculations

---

### Day 3: Operators & Expressions

---

#### Exercise 1: Calculator - All Operations (20 minutes)

**What you'll learn:** Using arithmetic operators (+, -, *, /, %)

**Create new class: `BasicCalculator`**

```java
public class BasicCalculator {
    public static void main(String[] args) {
        // Our two numbers
        int number1 = 10;
        int number2 = 3;

        System.out.println("===== BASIC CALCULATOR =====");
        System.out.println("Number 1: " + number1);
        System.out.println("Number 2: " + number2);
        System.out.println();

        // ADDITION (+)
        int sum = number1 + number2;
        System.out.println("Addition: " + number1 + " + " + number2 + " = " + sum);

        // SUBTRACTION (-)
        int difference = number1 - number2;
        System.out.println("Subtraction: " + number1 + " - " + number2 + " = " + difference);

        // MULTIPLICATION (*)
        int product = number1 * number2;
        System.out.println("Multiplication: " + number1 + " * " + number2 + " = " + product);

        // DIVISION (/) - INTEGER DIVISION
        int quotient = number1 / number2;
        System.out.println("Division (int): " + number1 + " / " + number2 + " = " + quotient);
        System.out.println("  ⚠️ Note: 10/3 = 3 (decimal part lost!)");

        // DIVISION - WITH DECIMALS
        double exactQuotient = (double) number1 / number2;
        System.out.println("Division (exact): " + number1 + " / " + number2 + " = " + exactQuotient);

        // MODULUS (%) - REMAINDER
        int remainder = number1 % number2;
        System.out.println("Modulus: " + number1 + " % " + number2 + " = " + remainder);
        System.out.println("  💡 Explanation: 10 ÷ 3 = 3 remainder 1");

        System.out.println("============================");

        // PRACTICAL EXAMPLE OF MODULUS
        System.out.println("\n--- Practical Use of % ---");
        System.out.println("Hours in 50 minutes: " + (50 / 60));
        System.out.println("Remaining minutes: " + (50 % 60));
    }
}
```

**Expected Output:**
```
===== BASIC CALCULATOR =====
Number 1: 10
Number 2: 3

Addition: 10 + 3 = 13
Subtraction: 10 - 3 = 7
Multiplication: 10 * 3 = 30
Division (int): 10 / 3 = 3
  ⚠️ Note: 10/3 = 3 (decimal part lost!)
Division (exact): 10 / 3 = 3.3333333333333335
Modulus: 10 % 3 = 1
  💡 Explanation: 10 ÷ 3 = 3 remainder 1
============================

--- Practical Use of % ---
Hours in 50 minutes: 0
Remaining minutes: 50
```

**✅ Key Concepts:**

**Integer Division:**
```java
int result = 10 / 3;  // result = 3 (not 3.333...)
```

**Exact Division:**
```java
double result = (double) 10 / 3;  // result = 3.333...
// OR
double result = 10.0 / 3.0;  // result = 3.333...
```

**Modulus (%) - Getting Remainder:**
- 10 % 3 = 1 (because 10 ÷ 3 = 3 remainder 1)
- 7 % 2 = 1 (odd number)
- 8 % 2 = 0 (even number)
- 15 % 10 = 5

**💡 Real-World Uses of %:**
- Check even/odd: `number % 2 == 0` means even
- Get last digit: `number % 10`
- Cycle through values: `index % arraySize`

---

#### Exercise 2: Even or Odd Checker (15 minutes)

**What you'll learn:** Using modulus operator, comparison operators

**Create new class: `EvenOddChecker`**

```java
public class EvenOddChecker {
    public static void main(String[] args) {
        System.out.println("===== EVEN OR ODD CHECKER =====");
        System.out.println();

        // Test multiple numbers
        int num1 = 10;
        int num2 = 15;
        int num3 = 24;
        int num4 = 33;
        int num5 = 100;

        // Check each number
        // Logic: If number % 2 == 0, it's even

        // Number 1
        System.out.println("Checking: " + num1);
        System.out.println("  " + num1 + " % 2 = " + (num1 % 2));
        System.out.println("  Result: " + num1 + " is " + (num1 % 2 == 0 ? "EVEN" : "ODD"));
        System.out.println();

        // Number 2
        System.out.println("Checking: " + num2);
        System.out.println("  " + num2 + " % 2 = " + (num2 % 2));
        System.out.println("  Result: " + num2 + " is " + (num2 % 2 == 0 ? "EVEN" : "ODD"));
        System.out.println();

        // Number 3
        System.out.println("Checking: " + num3);
        System.out.println("  " + num3 + " % 2 = " + (num3 % 2));
        System.out.println("  Result: " + num3 + " is " + (num3 % 2 == 0 ? "EVEN" : "ODD"));
        System.out.println();

        // Number 4
        System.out.println("Checking: " + num4);
        System.out.println("  " + num4 + " % 2 = " + (num4 % 2));
        System.out.println("  Result: " + num4 + " is " + (num4 % 2 == 0 ? "EVEN" : "ODD"));
        System.out.println();

        // Number 5
        System.out.println("Checking: " + num5);
        System.out.println("  " + num5 + " % 2 = " + (num5 % 2));
        System.out.println("  Result: " + num5 + " is " + (num5 % 2 == 0 ? "EVEN" : "ODD"));

        System.out.println("===============================");
    }
}
```

**Expected Output:**
```
===== EVEN OR ODD CHECKER =====

Checking: 10
  10 % 2 = 0
  Result: 10 is EVEN

Checking: 15
  15 % 2 = 1
  Result: 15 is ODD

Checking: 24
  24 % 2 = 0
  Result: 24 is EVEN

Checking: 33
  33 % 2 = 1
  Result: 33 is ODD

Checking: 100
  100 % 2 = 0
  Result: 100 is EVEN

===============================
```

**💡 The Logic:**
```
Even numbers: 2, 4, 6, 8, 10...
  When divided by 2, remainder = 0

Odd numbers: 1, 3, 5, 7, 9...
  When divided by 2, remainder = 1
```

**✅ Success Criteria:**
- Correctly identifies even numbers (remainder 0)
- Correctly identifies odd numbers (remainder 1)
- Shows the calculation (number % 2)

---

### Day 4: Control Flow - Conditional Statements

---

#### Exercise 1: Your First if Statement (10 minutes)

**What you'll learn:** Making decisions in code using if statements

**Create new class: `FirstIfStatement`**

**Concept:** An if statement lets your program make decisions. It's like saying "IF this is true, THEN do that."

**Step-by-Step:**

```java
public class FirstIfStatement {
    public static void main(String[] args) {
        System.out.println("===== IF STATEMENT BASICS =====\n");

        // ===== EXAMPLE 1: Simple if statement =====
        System.out.println("--- Example 1: Age Check ---");

        int age = 20;
        System.out.println("Age: " + age);

        // if (condition) { code to execute if true }
        if (age >= 18) {
            System.out.println("✅ You are an adult!");
            System.out.println("   You can vote.");
        }

        System.out.println("This line always prints.\n");

        // ===== EXAMPLE 2: Another if statement =====
        System.out.println("--- Example 2: Password Length Check ---");

        String password = "mySecret123";
        int passwordLength = password.length();

        System.out.println("Password: " + password);
        System.out.println("Length: " + passwordLength);

        if (passwordLength >= 8) {
            System.out.println("✅ Password is strong enough!");
        }

        System.out.println();

        // ===== EXAMPLE 3: If statement that doesn't execute =====
        System.out.println("--- Example 3: Failed Condition ---");

        int score = 35;
        System.out.println("Score: " + score);

        if (score >= 50) {
            System.out.println("This won't print because 35 < 50");
        }

        System.out.println("Code continues after if statement.\n");

        System.out.println("===============================");
    }
}
```

**Expected Output:**
```
===== IF STATEMENT BASICS =====

--- Example 1: Age Check ---
Age: 20
✅ You are an adult!
   You can vote.
This line always prints.

--- Example 2: Password Length Check ---
Password: mySecret123
Length: 11
✅ Password is strong enough!

--- Example 3: Failed Condition ---
Score: 35
Code continues after if statement.

===============================
```

**💡 How if Statement Works:**

```java
if (condition) {
    // This code runs ONLY if condition is true
}
// This code runs regardless
```

**Breakdown:**
1. **if** - keyword that starts the statement
2. **(condition)** - expression that evaluates to true or false
3. **{ }** - curly braces contain code to execute if true

**Common Conditions:**
```java
if (age >= 18)           // Greater than or equal
if (score < 50)          // Less than
if (name.equals("John")) // String equality
if (isLoggedIn)          // Boolean variable
if (count == 0)          // Equals (two equals signs!)
```

**✅ Success Criteria:**
- Understand when code inside if { } runs
- Can write simple conditions
- Know difference between = and ==

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `if age >= 18` | Missing parentheses | `if (age >= 18)` |
| `if (age = 18)` | Single = is assignment | `if (age == 18)` |
| `if (name == "John")` | Don't use == for Strings | `if (name.equals("John"))` |

---

#### Exercise 2: if-else Statements (15 minutes)

**What you'll learn:** Handling both true and false cases

**Create new class: `IfElseDemo`**

```java
public class IfElseDemo {
    public static void main(String[] args) {
        System.out.println("===== IF-ELSE STATEMENTS =====\n");

        // ===== EXAMPLE 1: Adult or Minor =====
        System.out.println("--- Example 1: Age Classification ---");

        int age = 15;
        System.out.println("Age: " + age);

        if (age >= 18) {
            System.out.println("✅ You are an adult.");
            System.out.println("   You can vote.");
        } else {
            System.out.println("❌ You are a minor.");
            System.out.println("   Wait " + (18 - age) + " more years to vote.");
        }
        System.out.println();

        // ===== EXAMPLE 2: Even or Odd =====
        System.out.println("--- Example 2: Even or Odd ---");

        int number = 42;
        System.out.println("Number: " + number);

        if (number % 2 == 0) {
            System.out.println("✅ " + number + " is EVEN");
            System.out.println("   (Divisible by 2 with no remainder)");
        } else {
            System.out.println("❌ " + number + " is ODD");
            System.out.println("   (Has remainder when divided by 2)");
        }
        System.out.println();

        // ===== EXAMPLE 3: Pass or Fail =====
        System.out.println("--- Example 3: Exam Result ---");

        int marks = 38;
        int passingMarks = 40;

        System.out.println("Marks Obtained: " + marks);
        System.out.println("Passing Marks: " + passingMarks);

        if (marks >= passingMarks) {
            System.out.println("🎉 PASSED!");
            System.out.println("   Congratulations!");
        } else {
            System.out.println("😞 FAILED");
            System.out.println("   Need " + (passingMarks - marks) + " more marks to pass.");
        }
        System.out.println();

        // ===== EXAMPLE 4: String Comparison =====
        System.out.println("--- Example 4: Login Check ---");

        String enteredPassword = "admin123";
        String correctPassword = "admin123";

        System.out.println("Entered Password: " + enteredPassword);

        if (enteredPassword.equals(correctPassword)) {
            System.out.println("✅ Login Successful!");
            System.out.println("   Welcome to the system.");
        } else {
            System.out.println("❌ Login Failed!");
            System.out.println("   Incorrect password.");
        }

        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== IF-ELSE STATEMENTS =====

--- Example 1: Age Classification ---
Age: 15
❌ You are a minor.
   Wait 3 more years to vote.

--- Example 2: Even or Odd ---
Number: 42
✅ 42 is EVEN
   (Divisible by 2 with no remainder)

--- Example 3: Exam Result ---
Marks Obtained: 38
Passing Marks: 40
😞 FAILED
   Need 2 more marks to pass.

--- Example 4: Login Check ---
Entered Password: admin123
✅ Login Successful!
   Welcome to the system.

===============================
```

**💡 if-else Structure:**

```java
if (condition) {
    // Executes if condition is TRUE
} else {
    // Executes if condition is FALSE
}
```

**Key Point:** Exactly ONE of these blocks will execute, never both!

**🎯 Challenge Tasks:**
1. Change age to 20 and re-run - what changes?
2. Change number to 17 - what happens?
3. Change enteredPassword to "wrong" - see the error message
4. Add your own if-else for temperature (>30 = hot, else = cold)

---

#### Exercise 3: if-else-if Ladder (20 minutes)

**What you'll learn:** Handling multiple conditions

**Create new class: `IfElseIfLadder`**

```java
public class IfElseIfLadder {
    public static void main(String[] args) {
        System.out.println("===== IF-ELSE-IF LADDER =====\n");

        // ===== EXAMPLE 1: Grade Calculator =====
        System.out.println("--- Example 1: Grade Calculator ---");

        int marks = 78;
        String grade;

        System.out.println("Marks: " + marks);
        System.out.println("Grade Scale:");
        System.out.println("  90-100: A");
        System.out.println("  80-89:  B");
        System.out.println("  70-79:  C");
        System.out.println("  60-69:  D");
        System.out.println("  Below 60: F");
        System.out.println();

        // Check from highest to lowest
        if (marks >= 90) {
            grade = "A";
            System.out.println("Grade: A - Excellent! 🌟");
        } else if (marks >= 80) {
            grade = "B";
            System.out.println("Grade: B - Very Good! 👍");
        } else if (marks >= 70) {
            grade = "C";
            System.out.println("Grade: C - Good! ✅");
        } else if (marks >= 60) {
            grade = "D";
            System.out.println("Grade: D - Pass ⚠️");
        } else {
            grade = "F";
            System.out.println("Grade: F - Fail ❌");
        }
        System.out.println();

        // ===== EXAMPLE 2: Day of Week =====
        System.out.println("--- Example 2: Day of Week ---");

        int dayNumber = 3;
        String dayName;

        System.out.println("Day Number: " + dayNumber);

        if (dayNumber == 1) {
            dayName = "Monday";
            System.out.println("It's Monday - Start of work week 💼");
        } else if (dayNumber == 2) {
            dayName = "Tuesday";
            System.out.println("It's Tuesday 📅");
        } else if (dayNumber == 3) {
            dayName = "Wednesday";
            System.out.println("It's Wednesday - Midweek! 🎯");
        } else if (dayNumber == 4) {
            dayName = "Thursday";
            System.out.println("It's Thursday 📆");
        } else if (dayNumber == 5) {
            dayName = "Friday";
            System.out.println("It's Friday - Weekend coming! 🎉");
        } else if (dayNumber == 6) {
            dayName = "Saturday";
            System.out.println("It's Saturday - Weekend! 🎊");
        } else if (dayNumber == 7) {
            dayName = "Sunday";
            System.out.println("It's Sunday - Rest day! 😴");
        } else {
            dayName = "Invalid";
            System.out.println("❌ Invalid day number! (Use 1-7)");
        }
        System.out.println();

        // ===== EXAMPLE 3: Age Category =====
        System.out.println("--- Example 3: Age Category ---");

        int age = 35;

        System.out.println("Age: " + age);

        if (age < 0) {
            System.out.println("❌ Invalid age!");
        } else if (age <= 12) {
            System.out.println("Category: Child 👶");
            System.out.println("  Focus: School and play");
        } else if (age <= 19) {
            System.out.println("Category: Teenager 🧑");
            System.out.println("  Focus: High school and college");
        } else if (age <= 59) {
            System.out.println("Category: Adult 👨");
            System.out.println("  Focus: Career and family");
        } else if (age <= 120) {
            System.out.println("Category: Senior 👴");
            System.out.println("  Focus: Retirement and leisure");
        } else {
            System.out.println("❌ Age seems too high!");
        }
        System.out.println();

        // ===== EXAMPLE 4: BMI Category =====
        System.out.println("--- Example 4: BMI Calculator ---");

        double height = 1.75; // meters
        double weight = 70;   // kg
        double bmi = weight / (height * height);

        System.out.println("Height: " + height + " m");
        System.out.println("Weight: " + weight + " kg");
        System.out.println("BMI: " + String.format("%.2f", bmi));
        System.out.println();

        if (bmi < 18.5) {
            System.out.println("Category: Underweight ⚠️");
            System.out.println("  Suggestion: Consult a nutritionist");
        } else if (bmi < 25) {
            System.out.println("Category: Normal weight ✅");
            System.out.println("  Great! Maintain your lifestyle");
        } else if (bmi < 30) {
            System.out.println("Category: Overweight ⚠️");
            System.out.println("  Suggestion: Exercise more");
        } else {
            System.out.println("Category: Obese ❌");
            System.out.println("  Suggestion: Consult a doctor");
        }

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== IF-ELSE-IF LADDER =====

--- Example 1: Grade Calculator ---
Marks: 78
Grade Scale:
  90-100: A
  80-89:  B
  70-79:  C
  60-69:  D
  Below 60: F

Grade: C - Good! ✅

--- Example 2: Day of Week ---
Day Number: 3
It's Wednesday - Midweek! 🎯

--- Example 3: Age Category ---
Age: 35
Category: Adult 👨
  Focus: Career and family

--- Example 4: BMI Calculator ---
Height: 1.75 m
Weight: 70 kg
BMI: 22.86

Category: Normal weight ✅
  Great! Maintain your lifestyle

==============================
```

**💡 How if-else-if Works:**

```java
if (condition1) {
    // Runs if condition1 is true
} else if (condition2) {
    // Runs if condition1 is false AND condition2 is true
} else if (condition3) {
    // Runs if condition1 and condition2 are false AND condition3 is true
} else {
    // Runs if ALL conditions are false (optional)
}
```

**Key Points:**
1. **Checks happen in order** - Top to bottom
2. **First true condition wins** - Only ONE block executes
3. **Order matters!** - Put most specific conditions first
4. **else is optional** - But recommended as a catch-all

**⚠️ Common Mistake - Wrong Order:**

```java
// ❌ WRONG - Will never reach grade A!
if (marks >= 60) {
    grade = "D";  // This catches 90 too!
} else if (marks >= 90) {
    grade = "A";  // Never reached!
}

// ✅ RIGHT - Check highest first
if (marks >= 90) {
    grade = "A";
} else if (marks >= 60) {
    grade = "D";
}
```

**✅ Success Criteria:**
- Understand ladder stops at first true condition
- Know why order matters
- Can create multi-level decision logic

**🎯 Challenge:**
Create a ticket pricing system:
- Age 0-2: Free
- Age 3-12: $5 (Child)
- Age 13-17: $8 (Teen)
- Age 18-64: $12 (Adult)
- Age 65+: $7 (Senior)

---

#### Exercise 4: Nested if Statements (20 minutes)

**What you'll learn:** Using if statements inside other if statements

**Create new class: `NestedIfStatements`**

```java
public class NestedIfStatements {
    public static void main(String[] args) {
        System.out.println("===== NESTED IF STATEMENTS =====\n");

        // ===== EXAMPLE 1: Voting Eligibility =====
        System.out.println("--- Example 1: Voting Eligibility ---");

        int age = 20;
        boolean isCitizen = true;

        System.out.println("Age: " + age);
        System.out.println("Is Citizen: " + isCitizen);
        System.out.println();

        // Outer if: Check age first
        if (age >= 18) {
            System.out.println("✅ Age requirement met (18+)");

            // Inner if: Check citizenship if age is OK
            if (isCitizen) {
                System.out.println("✅ Citizenship verified");
                System.out.println("🗳️  You CAN vote!");
            } else {
                System.out.println("❌ Not a citizen");
                System.out.println("   Cannot vote without citizenship");
            }
        } else {
            System.out.println("❌ Too young to vote");
            System.out.println("   Must be at least 18 years old");
        }
        System.out.println();

        // ===== EXAMPLE 2: Loan Approval =====
        System.out.println("--- Example 2: Loan Approval System ---");

        int salary = 50000;
        int creditScore = 720;
        int loanAmount = 100000;

        System.out.println("Annual Salary: $" + salary);
        System.out.println("Credit Score: " + creditScore);
        System.out.println("Loan Amount: $" + loanAmount);
        System.out.println();

        System.out.println("Checking eligibility...");

        // First check: Salary
        if (salary >= 30000) {
            System.out.println("✅ Salary requirement met ($30,000+)");

            // Second check: Credit score (nested)
            if (creditScore >= 650) {
                System.out.println("✅ Credit score acceptable (650+)");

                // Third check: Loan to salary ratio (nested deeper)
                if (loanAmount <= salary * 3) {
                    System.out.println("✅ Loan amount reasonable (<3x salary)");
                    System.out.println("\n🎉 LOAN APPROVED!");
                } else {
                    System.out.println("❌ Loan amount too high");
                    System.out.println("   Maximum loan: $" + (salary * 3));
                }
            } else {
                System.out.println("❌ Credit score too low");
                System.out.println("   Minimum required: 650");
                System.out.println("   Your score: " + creditScore);
            }
        } else {
            System.out.println("❌ Salary too low");
            System.out.println("   Minimum required: $30,000");
            System.out.println("   Your salary: $" + salary);
        }
        System.out.println();

        // ===== EXAMPLE 3: Movie Rating System =====
        System.out.println("--- Example 3: Movie Access Control ---");

        int viewerAge = 16;
        String movieRating = "PG-13";
        boolean parentPresent = false;

        System.out.println("Viewer Age: " + viewerAge);
        System.out.println("Movie Rating: " + movieRating);
        System.out.println("Parent Present: " + parentPresent);
        System.out.println();

        if (movieRating.equals("G")) {
            System.out.println("✅ G-Rated: All ages allowed");
            System.out.println("🎬 Enjoy the movie!");

        } else if (movieRating.equals("PG")) {
            System.out.println("✅ PG: Parental Guidance suggested");
            System.out.println("🎬 You may watch");

        } else if (movieRating.equals("PG-13")) {
            System.out.println("⚠️  PG-13: Some material inappropriate for children under 13");

            if (viewerAge >= 13) {
                System.out.println("✅ Age 13+ - You may watch");
                System.out.println("🎬 Enjoy!");
            } else {
                if (parentPresent) {
                    System.out.println("✅ Under 13 but parent present");
                    System.out.println("🎬 You may watch with parent");
                } else {
                    System.out.println("❌ Under 13 and no parent");
                    System.out.println("   Bring a parent or guardian");
                }
            }

        } else if (movieRating.equals("R")) {
            System.out.println("⚠️  R-Rated: Restricted");

            if (viewerAge >= 17) {
                System.out.println("✅ Age 17+ - You may watch");
                System.out.println("🎬 Enjoy!");
            } else {
                if (parentPresent) {
                    System.out.println("✅ Under 17 but parent present");
                    System.out.println("🎬 You may watch with parent");
                } else {
                    System.out.println("❌ Under 17 and no parent");
                    System.out.println("   Must be 17+ or bring parent");
                }
            }
        }

        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== NESTED IF STATEMENTS =====

--- Example 1: Voting Eligibility ---
Age: 20
Is Citizen: true

✅ Age requirement met (18+)
✅ Citizenship verified
🗳️  You CAN vote!

--- Example 2: Loan Approval System ---
Annual Salary: $50000
Credit Score: 720
Loan Amount: $100000

Checking eligibility...
✅ Salary requirement met ($30,000+)
✅ Credit score acceptable (650+)
✅ Loan amount reasonable (<3x salary)

🎉 LOAN APPROVED!

--- Example 3: Movie Access Control ---
Viewer Age: 16
Movie Rating: PG-13
Parent Present: false

⚠️  PG-13: Some material inappropriate for children under 13
✅ Age 13+ - You may watch
🎬 Enjoy!

================================
```

**💡 Nested if Structure:**

```java
if (condition1) {
    // Runs if condition1 is true

    if (condition2) {
        // Runs if BOTH condition1 AND condition2 are true

        if (condition3) {
            // Runs if ALL THREE conditions are true
        }
    }
}
```

**When to Use Nested if:**
- Multiple requirements must ALL be true
- Conditions depend on each other
- Need to check something only if previous check passed

**Alternative: Logical Operators (Often Better)**

```java
// Nested if (3 levels)
if (age >= 18) {
    if (isCitizen) {
        if (hasID) {
            System.out.println("Can vote");
        }
    }
}

// Same thing with && (cleaner!)
if (age >= 18 && isCitizen && hasID) {
    System.out.println("Can vote");
}
```

**✅ Success Criteria:**
- Understand when ALL conditions must be true
- Can read nested if logic
- Know when to use && instead

**🎯 Practice:**
Test the examples with different values:
1. Voting: age=16, isCitizen=true (what happens?)
2. Loan: creditScore=600 (where does it fail?)
3. Movie: viewerAge=12, parentPresent=true (can they watch?)

---

#### Exercise 5: switch-case Statement (25 minutes)

**What you'll learn:** Cleaner way to handle multiple specific values

**Create new class: `SwitchCaseDemo`**

```java
public class SwitchCaseDemo {
    public static void main(String[] args) {
        System.out.println("===== SWITCH-CASE STATEMENTS =====\n");

        // ===== EXAMPLE 1: Day of Week =====
        System.out.println("--- Example 1: Day of Week ---");

        int day = 3;
        String dayName;

        System.out.println("Day Number: " + day);

        switch (day) {
            case 1:
                dayName = "Monday";
                System.out.println("It's Monday! 💼");
                System.out.println("Start of work week");
                break;  // IMPORTANT: Exits the switch

            case 2:
                dayName = "Tuesday";
                System.out.println("It's Tuesday! 📅");
                break;

            case 3:
                dayName = "Wednesday";
                System.out.println("It's Wednesday! 🎯");
                System.out.println("Midweek!");
                break;

            case 4:
                dayName = "Thursday";
                System.out.println("It's Thursday! 📆");
                break;

            case 5:
                dayName = "Friday";
                System.out.println("It's Friday! 🎉");
                System.out.println("Weekend is coming!");
                break;

            case 6:
                dayName = "Saturday";
                System.out.println("It's Saturday! 🎊");
                System.out.println("Weekend!");
                break;

            case 7:
                dayName = "Sunday";
                System.out.println("It's Sunday! 😴");
                System.out.println("Rest day");
                break;

            default:
                dayName = "Invalid";
                System.out.println("❌ Invalid day number!");
                System.out.println("   Use 1-7");
                break;
        }
        System.out.println("Day: " + dayName + "\n");

        // ===== EXAMPLE 2: Grade Description =====
        System.out.println("--- Example 2: Grade Feedback ---");

        char grade = 'B';

        System.out.println("Grade: " + grade);

        switch (grade) {
            case 'A':
                System.out.println("🌟 Excellent! Outstanding work!");
                System.out.println("   Keep it up!");
                break;

            case 'B':
                System.out.println("👍 Very Good! Great job!");
                System.out.println("   Just a bit more effort for A!");
                break;

            case 'C':
                System.out.println("✅ Good! Satisfactory work.");
                System.out.println("   You're doing fine!");
                break;

            case 'D':
                System.out.println("⚠️  Pass. Needs improvement.");
                System.out.println("   Study more!");
                break;

            case 'F':
                System.out.println("❌ Fail. Need to work harder.");
                System.out.println("   Don't give up!");
                break;

            default:
                System.out.println("❌ Invalid grade!");
                System.out.println("   Use A, B, C, D, or F");
                break;
        }
        System.out.println();

        // ===== EXAMPLE 3: Calculator =====
        System.out.println("--- Example 3: Simple Calculator ---");

        int num1 = 10;
        int num2 = 3;
        char operator = '*';
        int result;

        System.out.println("Number 1: " + num1);
        System.out.println("Operator: " + operator);
        System.out.println("Number 2: " + num2);
        System.out.println();

        switch (operator) {
            case '+':
                result = num1 + num2;
                System.out.println("Operation: Addition");
                System.out.println("Result: " + num1 + " + " + num2 + " = " + result);
                break;

            case '-':
                result = num1 - num2;
                System.out.println("Operation: Subtraction");
                System.out.println("Result: " + num1 + " - " + num2 + " = " + result);
                break;

            case '*':
                result = num1 * num2;
                System.out.println("Operation: Multiplication");
                System.out.println("Result: " + num1 + " * " + num2 + " = " + result);
                break;

            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.println("Operation: Division");
                    System.out.println("Result: " + num1 + " / " + num2 + " = " + result);
                } else {
                    System.out.println("❌ Error: Cannot divide by zero!");
                }
                break;

            case '%':
                result = num1 % num2;
                System.out.println("Operation: Modulus");
                System.out.println("Result: " + num1 + " % " + num2 + " = " + result);
                break;

            default:
                System.out.println("❌ Invalid operator!");
                System.out.println("   Use +, -, *, /, or %");
                break;
        }
        System.out.println();

        // ===== EXAMPLE 4: Month Days =====
        System.out.println("--- Example 4: Days in Month ---");

        String month = "February";
        int days;

        System.out.println("Month: " + month);

        switch (month) {
            case "January":
            case "March":
            case "May":
            case "July":
            case "August":
            case "October":
            case "December":
                days = 31;
                System.out.println("This month has 31 days");
                break;

            case "April":
            case "June":
            case "September":
            case "November":
                days = 30;
                System.out.println("This month has 30 days");
                break;

            case "February":
                days = 28;  // Ignoring leap year for simplicity
                System.out.println("This month has 28 days");
                System.out.println("(29 in leap years)");
                break;

            default:
                days = 0;
                System.out.println("❌ Invalid month name!");
                break;
        }
        System.out.println("Days: " + days);

        System.out.println("\n==================================");
    }
}
```

**Expected Output:**
```
===== SWITCH-CASE STATEMENTS =====

--- Example 1: Day of Week ---
Day Number: 3
It's Wednesday! 🎯
Midweek!
Day: Wednesday

--- Example 2: Grade Feedback ---
Grade: B
👍 Very Good! Great job!
   Just a bit more effort for A!

--- Example 3: Simple Calculator ---
Number 1: 10
Operator: *
Number 2: 3

Operation: Multiplication
Result: 10 * 3 = 30

--- Example 4: Days in Month ---
Month: February
This month has 28 days
(29 in leap years)
Days: 28

==================================
```

**💡 switch-case Structure:**

```java
switch (variable) {
    case value1:
        // Code if variable == value1
        break;

    case value2:
        // Code if variable == value2
        break;

    default:
        // Code if no case matches (optional)
        break;
}
```

**⚠️ CRITICAL: The break Statement**

```java
// ❌ WITHOUT break (WRONG!)
switch (day) {
    case 1:
        System.out.println("Monday");
        // No break - falls through!
    case 2:
        System.out.println("Tuesday");
        // Both Monday and Tuesday will print!
}

// ✅ WITH break (CORRECT!)
switch (day) {
    case 1:
        System.out.println("Monday");
        break;  // Exits the switch
    case 2:
        System.out.println("Tuesday");
        break;
}
```

**Multiple Cases, Same Code:**

```java
switch (month) {
    case "January":
    case "March":
    case "May":
        // All three fall through to here
        days = 31;
        break;
}
```

**switch vs if-else-if:**

| Feature | switch | if-else-if |
|---------|--------|------------|
| **Use for** | Exact value matching | Ranges, complex conditions |
| **Works with** | int, char, String, enum | Any boolean condition |
| **Example** | day == 1, day == 2 | score >= 90, score < 80 |
| **Cleaner for** | Many specific values | Few complex conditions |

**✅ Success Criteria:**
- Know when to use switch vs if-else-if
- Remember to add break statements
- Understand case fall-through
- Can use default case

**❌ Common Mistakes:**

| Mistake | Problem | Fix |
|---------|---------|-----|
| Forgetting `break` | All cases after match execute | Add `break;` after each case |
| Using ranges | `case x > 5:` doesn't work | Use if-else-if for ranges |
| Wrong types | Can't switch on double/float | Use int, char, or String |

**🎯 Challenge:**
Create a season identifier:
- Months 12, 1, 2: Winter
- Months 3, 4, 5: Spring
- Months 6, 7, 8: Summer
- Months 9, 10, 11: Fall

---

#### Exercise 6: Ternary Operator (15 minutes)

**What you'll learn:** The shorthand if-else (? :) operator

**Create new class: `TernaryOperator`**

```java
public class TernaryOperator {
    public static void main(String[] args) {
        System.out.println("===== TERNARY OPERATOR =====\n");

        // ===== COMPARING if-else vs Ternary =====
        System.out.println("--- Comparison: if-else vs Ternary ---\n");

        int age = 20;

        // METHOD 1: Using if-else (5 lines)
        System.out.println("Method 1: if-else");
        String status1;
        if (age >= 18) {
            status1 = "Adult";
        } else {
            status1 = "Minor";
        }
        System.out.println("Age: " + age);
        System.out.println("Status: " + status1);
        System.out.println();

        // METHOD 2: Using ternary (1 line!)
        System.out.println("Method 2: Ternary Operator");
        String status2 = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Age: " + age);
        System.out.println("Status: " + status2);
        System.out.println("Same result, shorter code!\n");

        // ===== SYNTAX BREAKDOWN =====
        System.out.println("--- Ternary Syntax ---");
        System.out.println("Format: (condition) ? valueIfTrue : valueIfFalse");
        System.out.println();
        System.out.println("Example: int max = (a > b) ? a : b;");
        System.out.println("         └──────┘   └──┘   └──┘");
        System.out.println("         condition  true   false");
        System.out.println();

        // ===== EXAMPLE 1: Max of Two Numbers =====
        System.out.println("--- Example 1: Find Maximum ---");

        int num1 = 15;
        int num2 = 20;

        int max = (num1 > num2) ? num1 : num2;

        System.out.println("Number 1: " + num1);
        System.out.println("Number 2: " + num2);
        System.out.println("Maximum: " + max);
        System.out.println();

        // ===== EXAMPLE 2: Even or Odd =====
        System.out.println("--- Example 2: Even or Odd ---");

        int number = 17;
        String evenOdd = (number % 2 == 0) ? "Even" : "Odd";

        System.out.println("Number: " + number);
        System.out.println("Type: " + evenOdd);
        System.out.println();

        // ===== EXAMPLE 3: Pass or Fail =====
        System.out.println("--- Example 3: Exam Result ---");

        int marks = 72;
        String result = (marks >= 40) ? "PASS ✅" : "FAIL ❌";

        System.out.println("Marks: " + marks);
        System.out.println("Result: " + result);
        System.out.println();

        // ===== EXAMPLE 4: Discount Eligibility =====
        System.out.println("--- Example 4: Discount Check ---");

        double price = 100.0;
        boolean isMember = true;

        double finalPrice = isMember ? (price * 0.9) : price;  // 10% off for members
        double savings = price - finalPrice;

        System.out.println("Original Price: $" + price);
        System.out.println("Member: " + isMember);
        System.out.println("Final Price: $" + finalPrice);
        System.out.println("Savings: $" + savings);
        System.out.println();

        // ===== EXAMPLE 5: Using in println (inline) =====
        System.out.println("--- Example 5: Inline Usage ---");

        int score = 85;

        // Ternary directly in println!
        System.out.println("Score: " + score);
        System.out.println("Grade: " + (score >= 90 ? "A" : score >= 80 ? "B" : "C"));
        // Note: Nested ternary - harder to read!
        System.out.println();

        // ===== EXAMPLE 6: Login Messages =====
        System.out.println("--- Example 6: Login Status ---");

        boolean isLoggedIn = false;
        String username = "John";

        String message = isLoggedIn
                         ? "Welcome back, " + username + "!"
                         : "Please log in to continue";

        System.out.println("Logged In: " + isLoggedIn);
        System.out.println("Message: " + message);
        System.out.println();

        // ===== WHEN NOT TO USE TERNARY =====
        System.out.println("--- When NOT to use Ternary ---");
        System.out.println("❌ Complex conditions (hard to read)");
        System.out.println("❌ Multiple statements needed");
        System.out.println("❌ Nested ternaries (confusing!)");
        System.out.println();
        System.out.println("✅ USE for: Simple, single-value decisions");
        System.out.println("✅ USE for: Making code more concise");

        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== TERNARY OPERATOR =====

--- Comparison: if-else vs Ternary ---

Method 1: if-else
Age: 20
Status: Adult

Method 2: Ternary Operator
Age: 20
Status: Adult
Same result, shorter code!

--- Ternary Syntax ---
Format: (condition) ? valueIfTrue : valueIfFalse

Example: int max = (a > b) ? a : b;
         └──────┘   └──┘   └──┘
         condition  true   false

--- Example 1: Find Maximum ---
Number 1: 15
Number 2: 20
Maximum: 20

--- Example 2: Even or Odd ---
Number: 17
Type: Odd

--- Example 3: Exam Result ---
Marks: 72
Result: PASS ✅

--- Example 4: Discount Check ---
Original Price: $100.0
Member: true
Final Price: $90.0
Savings: $10.0

--- Example 5: Inline Usage ---
Score: 85
Grade: B

--- Example 6: Login Status ---
Logged In: false
Message: Please log in to continue

--- When NOT to use Ternary ---
❌ Complex conditions (hard to read)
❌ Multiple statements needed
❌ Nested ternaries (confusing!)

✅ USE for: Simple, single-value decisions
✅ USE for: Making code more concise

============================
```

**💡 Ternary Operator Syntax:**

```java
variable = (condition) ? valueIfTrue : valueIfFalse;
```

**Breakdown:**
1. **condition** - Boolean expression
2. **?** - Separates condition from true value
3. **valueIfTrue** - Returned if condition is true
4. **:** - Separates true value from false value
5. **valueIfFalse** - Returned if condition is false

**Comparison:**

```java
// if-else (verbose)
String result;
if (score >= 50) {
    result = "Pass";
} else {
    result = "Fail";
}

// Ternary (concise)
String result = (score >= 50) ? "Pass" : "Fail";
```

**When to Use:**

| Use Ternary ✅ | Use if-else ✅ |
|---------------|---------------|
| Simple condition | Complex logic |
| Single assignment | Multiple statements |
| Short expressions | Need debugging space |
| Making code concise | Nested conditions |

**Nested Ternary (Use Carefully!):**

```java
// Can be hard to read!
String grade = (marks >= 90) ? "A"
             : (marks >= 80) ? "B"
             : (marks >= 70) ? "C"
             : "F";

// Better as if-else-if for readability
```

**✅ Success Criteria:**
- Understand ternary syntax
- Know when to use vs if-else
- Can write simple ternary expressions
- Avoid complex nested ternaries

**🎯 Practice:**
Convert these to ternary:
1. `if (x > 0) { sign = "Positive"; } else { sign = "Negative"; }`
2. `if (temp > 30) { weather = "Hot"; } else { weather = "Cold"; }`
3. `if (age >= 65) { ticket = 7; } else { ticket = 12; }`

---

#### Exercise 7: Real-World Application - ATM System (30 minutes)

**What you'll learn:** Combining all conditional statements in a practical program

**Create new class: `ATMSystem`**

```java
public class ATMSystem {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════╗");
        System.out.println("║     WELCOME TO JAVA BANK      ║");
        System.out.println("║         ATM SYSTEM            ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println();

        // ===== ACCOUNT DETAILS =====
        String accountHolder = "John Doe";
        int pin = 1234;
        double balance = 5000.00;
        boolean isCardInserted = true;
        boolean isAccountActive = true;

        // ===== USER INPUT (In real app, this would be Scanner input) =====
        int enteredPIN = 1234;
        int selectedOption = 2;  // 1=Check Balance, 2=Withdraw, 3=Deposit
        double transactionAmount = 1000.00;

        System.out.println("═══════════════════════════════════");
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("═══════════════════════════════════");
        System.out.println();

        // ===== STEP 1: Check if card is inserted =====
        if (!isCardInserted) {
            System.out.println("❌ ERROR: No card detected");
            System.out.println("   Please insert your ATM card");
            return;  // Exit program
        }
        System.out.println("✅ Card detected");

        // ===== STEP 2: Verify PIN =====
        System.out.println("\n--- PIN Verification ---");
        if (enteredPIN == pin) {
            System.out.println("✅ PIN verified successfully");
        } else {
            System.out.println("❌ Incorrect PIN!");
            System.out.println("   Access denied");
            System.out.println("   Card blocked after 3 attempts");
            return;  // Exit program
        }

        // ===== STEP 3: Check account status =====
        System.out.println("\n--- Account Status Check ---");
        if (isAccountActive) {
            System.out.println("✅ Account is active");
        } else {
            System.out.println("❌ Account is suspended");
            System.out.println("   Contact customer service");
            return;  // Exit program
        }

        // ===== STEP 4: Show Menu and Process Transaction =====
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║          MAIN MENU             ║");
        System.out.println("╠════════════════════════════════╣");
        System.out.println("║  1. Check Balance              ║");
        System.out.println("║  2. Withdraw Cash              ║");
        System.out.println("║  3. Deposit Cash               ║");
        System.out.println("║  4. Exit                       ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("\nSelected Option: " + selectedOption);
        System.out.println();

        // Process the selected option
        switch (selectedOption) {
            case 1:
                // CHECK BALANCE
                System.out.println("═══════════════════════════════");
                System.out.println("     BALANCE INQUIRY");
                System.out.println("═══════════════════════════════");
                System.out.println("Current Balance: $" + balance);
                System.out.println("═══════════════════════════════");
                break;

            case 2:
                // WITHDRAW CASH
                System.out.println("═══════════════════════════════");
                System.out.println("     CASH WITHDRAWAL");
                System.out.println("═══════════════════════════════");
                System.out.println("Current Balance: $" + balance);
                System.out.println("Withdrawal Amount: $" + transactionAmount);
                System.out.println();

                // Validate withdrawal
                if (transactionAmount <= 0) {
                    System.out.println("❌ Invalid amount!");
                    System.out.println("   Amount must be positive");

                } else if (transactionAmount > balance) {
                    System.out.println("❌ Insufficient funds!");
                    System.out.println("   Available: $" + balance);
                    System.out.println("   Requested: $" + transactionAmount);
                    System.out.println("   Short by: $" + (transactionAmount - balance));

                } else if (transactionAmount > 2000) {
                    System.out.println("❌ Daily limit exceeded!");
                    System.out.println("   Maximum withdrawal: $2000");
                    System.out.println("   Requested: $" + transactionAmount);

                } else {
                    // Successful withdrawal
                    balance = balance - transactionAmount;
                    System.out.println("✅ Transaction Successful!");
                    System.out.println("   Withdrawn: $" + transactionAmount);
                    System.out.println("   New Balance: $" + balance);
                    System.out.println("\n   Please collect your cash");
                }
                System.out.println("═══════════════════════════════");
                break;

            case 3:
                // DEPOSIT CASH
                System.out.println("═══════════════════════════════");
                System.out.println("     CASH DEPOSIT");
                System.out.println("═══════════════════════════════");
                System.out.println("Current Balance: $" + balance);
                System.out.println("Deposit Amount: $" + transactionAmount);
                System.out.println();

                // Validate deposit
                if (transactionAmount <= 0) {
                    System.out.println("❌ Invalid amount!");
                    System.out.println("   Amount must be positive");

                } else if (transactionAmount > 10000) {
                    System.out.println("❌ Deposit limit exceeded!");
                    System.out.println("   Maximum deposit: $10,000");
                    System.out.println("   Visit branch for larger deposits");

                } else {
                    // Successful deposit
                    balance = balance + transactionAmount;
                    System.out.println("✅ Transaction Successful!");
                    System.out.println("   Deposited: $" + transactionAmount);
                    System.out.println("   New Balance: $" + balance);
                }
                System.out.println("═══════════════════════════════");
                break;

            case 4:
                // EXIT
                System.out.println("Thank you for using Java Bank!");
                System.out.println("Please collect your card");
                System.out.println("Have a great day! 😊");
                break;

            default:
                // INVALID OPTION
                System.out.println("❌ Invalid option selected!");
                System.out.println("   Please select 1-4");
                break;
        }

        // ===== RECEIPT =====
        System.out.println("\n\n╔════════════════════════════════╗");
        System.out.println("║         RECEIPT                ║");
        System.out.println("╠════════════════════════════════╣");
        System.out.println("║ Account: " + accountHolder);
        System.out.println("║ Final Balance: $" + balance);
        System.out.println("║ Status: " + (balance > 1000 ? "Healthy ✅" : "Low ⚠️"));
        System.out.println("╚════════════════════════════════╝");

        System.out.println("\n════════════════════════════════");
        System.out.println("  Session ended successfully");
        System.out.println("════════════════════════════════");
    }
}
```

**Expected Output (with selectedOption=2, amount=1000):**
```
╔════════════════════════════════╗
║     WELCOME TO JAVA BANK      ║
║         ATM SYSTEM            ║
╚════════════════════════════════╝

═══════════════════════════════════
Account Holder: John Doe
═══════════════════════════════════

✅ Card detected

--- PIN Verification ---
✅ PIN verified successfully

--- Account Status Check ---
✅ Account is active

╔════════════════════════════════╗
║          MAIN MENU             ║
╠════════════════════════════════╣
║  1. Check Balance              ║
║  2. Withdraw Cash              ║
║  3. Deposit Cash               ║
║  4. Exit                       ║
╚════════════════════════════════╝

Selected Option: 2

═══════════════════════════════
     CASH WITHDRAWAL
═══════════════════════════════
Current Balance: $5000.0
Withdrawal Amount: $1000.0

✅ Transaction Successful!
   Withdrawn: $1000.0
   New Balance: $4000.0

   Please collect your cash
═══════════════════════════════


╔════════════════════════════════╗
║         RECEIPT                ║
╠════════════════════════════════╣
║ Account: John Doe
║ Final Balance: $4000.0
║ Status: Healthy ✅
╚════════════════════════════════╝

════════════════════════════════
  Session ended successfully
════════════════════════════════
```

**💡 What This Program Demonstrates:**

1. **Sequential if statements** - Multiple checks in order
2. **if-else** - PIN verification (correct or incorrect)
3. **switch-case** - Menu selection
4. **Nested if** - Withdrawal validation (multiple conditions)
5. **Ternary operator** - Receipt status message
6. **return statement** - Exit early on errors

**Real-World Logic Flow:**
```
1. Check card → No? Exit
                Yes? Continue

2. Check PIN → Wrong? Exit
               Right? Continue

3. Check account → Inactive? Exit
                   Active? Continue

4. Show menu → Process selected option

5. Print receipt
```

**✅ Key Learnings:**
- Multiple validation layers
- Error handling with early returns
- switch for menu options
- Nested if for complex validation
- Professional output formatting

**🎯 Challenges:**
1. Change transactionAmount to 6000 (exceeds balance)
2. Change enteredPIN to 9999 (wrong PIN)
3. Change selectedOption to 1 (check balance)
4. Add a new option 5 for "Transfer Money"

---

**✅ Day 4 Complete!**

You've learned:
- ✅ if statements (single condition)
- ✅ if-else (true/false cases)
- ✅ if-else-if ladder (multiple conditions)
- ✅ Nested if (dependent conditions)
- ✅ switch-case (specific value matching)
- ✅ Ternary operator (shorthand if-else)
- ✅ Real-world application (ATM system)

**🎯 Before moving to Day 5:**
- [ ] Can write all types of conditional statements
- [ ] Understand when to use each type
- [ ] Know the difference between = and ==
- [ ] Comfortable with switch-case and break
- [ ] Can use ternary operator appropriately
- [ ] Built a complete practical application

### Day 5: Control Flow - Loops

---

#### Exercise 1: Your First while Loop (10 minutes)

**What you'll learn:** Repeating code using while loops

**Create new class: `FirstWhileLoop`**

**Concept:** A loop repeats code multiple times. A while loop continues AS LONG AS the condition is true.

**Step-by-Step:**

```java
public class FirstWhileLoop {
    public static void main(String[] args) {
        System.out.println("===== WHILE LOOP BASICS =====\n");

        // ===== EXAMPLE 1: Count from 1 to 5 =====
        System.out.println("--- Example 1: Counting 1 to 5 ---");

        int count = 1;  // Starting point

        while (count <= 5) {  // Condition: continue while count is 5 or less
            System.out.println("Count: " + count);
            count++;  // Increment (count = count + 1)
        }

        System.out.println("Final count: " + count);
        System.out.println("Loop finished!\n");

        // ===== EXAMPLE 2: Countdown =====
        System.out.println("--- Example 2: Countdown from 5 ---");

        int number = 5;

        while (number > 0) {
            System.out.println(number + "...");
            number--;  // Decrement
        }

        System.out.println("Blast off! 🚀\n");

        // ===== EXAMPLE 3: Sum of numbers =====
        System.out.println("--- Example 3: Sum 1 to 10 ---");

        int i = 1;
        int sum = 0;

        while (i <= 10) {
            sum = sum + i;  // Add current number to sum
            System.out.println("Added " + i + ", sum now: " + sum);
            i++;
        }

        System.out.println("Total sum of 1-10: " + sum + "\n");

        // ===== EXAMPLE 4: Print even numbers =====
        System.out.println("--- Example 4: Even numbers 2-10 ---");

        int num = 2;

        while (num <= 10) {
            System.out.println(num);
            num = num + 2;  // Jump by 2
        }

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== WHILE LOOP BASICS =====

--- Example 1: Counting 1 to 5 ---
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
Final count: 6
Loop finished!

--- Example 2: Countdown from 5 ---
5...
4...
3...
2...
1...
Blast off! 🚀

--- Example 3: Sum 1 to 10 ---
Added 1, sum now: 1
Added 2, sum now: 3
Added 3, sum now: 6
Added 4, sum now: 10
Added 5, sum now: 15
Added 6, sum now: 21
Added 7, sum now: 28
Added 8, sum now: 36
Added 9, sum now: 45
Added 10, sum now: 55
Total sum of 1-10: 55

--- Example 4: Even numbers 2-10 ---
2
4
6
8
10

==============================
```

**💡 while Loop Structure:**

```java
while (condition) {
    // Code to repeat
    // MUST change something that affects condition!
}
```

**How it Works:**
1. **Check** condition
2. **If true** → execute code inside { }
3. **Repeat** from step 1
4. **If false** → exit loop, continue after }

**⚠️ CRITICAL: Avoid Infinite Loops!**

```java
// ❌ INFINITE LOOP - Never stops!
int x = 1;
while (x <= 5) {
    System.out.println(x);
    // Forgot to increment x!
    // x will always be 1, condition always true!
}

// ✅ CORRECT - Loop will end
int x = 1;
while (x <= 5) {
    System.out.println(x);
    x++;  // Changes x, eventually makes condition false
}
```

**Common while Loop Patterns:**

```java
// Counting UP
int i = 1;
while (i <= 10) {
    // do something
    i++;
}

// Counting DOWN
int i = 10;
while (i > 0) {
    // do something
    i--;
}

// Jumping by N
int i = 0;
while (i < 100) {
    // do something
    i = i + 5;  // Jump by 5
}
```

**✅ Success Criteria:**
- Understand while loop logic
- Can write basic counting loops
- Remember to update loop variable
- Know how to avoid infinite loops

---

#### Exercise 2: do-while Loop (15 minutes)

**What you'll learn:** Loops that ALWAYS run at least once

**Create new class: `DoWhileLoop`**

**Key Difference:**
- **while** → Check FIRST, then maybe run
- **do-while** → Run FIRST, then check

```java
public class DoWhileLoop {
    public static void main(String[] args) {
        System.out.println("===== DO-WHILE LOOP =====\n");

        // ===== COMPARING while vs do-while =====
        System.out.println("--- Comparison: while vs do-while ---\n");

        // WHILE LOOP - Doesn't run even once!
        System.out.println("Testing WHILE loop with false condition:");
        int count1 = 10;
        while (count1 < 5) {  // 10 < 5 is false!
            System.out.println("This never prints");
        }
        System.out.println("while loop: Didn't run at all!\n");

        // DO-WHILE LOOP - Runs once even with false condition!
        System.out.println("Testing DO-WHILE with same false condition:");
        int count2 = 10;
        do {
            System.out.println("This prints once! count2 = " + count2);
        } while (count2 < 5);  // Check happens AFTER first run
        System.out.println("do-while: Ran once even though condition false!\n");

        // ===== EXAMPLE 1: Menu System =====
        System.out.println("--- Example 1: ATM Menu (Simulated) ---");

        int choice = 1;  // Simulating user input
        int attempts = 0;

        do {
            attempts++;
            System.out.println("\n=== ATM MENU ===");
            System.out.println("1. Check Balance");
            System.out.println("2. Withdraw");
            System.out.println("3. Deposit");
            System.out.println("4. Exit");
            System.out.println("================");

            System.out.println("Attempt " + attempts + ": Selected option " + choice);

            // Process choice
            switch (choice) {
                case 1:
                    System.out.println("Your balance: $1000");
                    break;
                case 2:
                    System.out.println("Withdrawal processed");
                    break;
                case 3:
                    System.out.println("Deposit processed");
                    break;
                case 4:
                    System.out.println("Thank you! Goodbye!");
                    break;
            }

            choice++;  // Simulating different choices

        } while (choice <= 4);  // Keep showing menu until they exit

        System.out.println("\nMenu closed after " + attempts + " attempts\n");

        // ===== EXAMPLE 2: Password Validation =====
        System.out.println("--- Example 2: Password Entry ---");

        String password = "wrong1";  // Simulating user input
        int tryCount = 0;
        boolean isCorrect = false;

        do {
            tryCount++;
            System.out.println("\nAttempt " + tryCount + ":");
            System.out.println("Entered password: " + password);

            if (password.equals("secret123")) {
                System.out.println("✅ Password correct!");
                isCorrect = true;
            } else {
                System.out.println("❌ Wrong password!");

                if (tryCount < 3) {
                    System.out.println("   You have " + (3 - tryCount) + " attempts remaining");
                }
            }

            // Simulate different password attempts
            if (tryCount == 1) password = "wrong2";
            if (tryCount == 2) password = "secret123";

        } while (!isCorrect && tryCount < 3);

        if (!isCorrect) {
            System.out.println("\n🔒 Account locked after 3 failed attempts!");
        } else {
            System.out.println("\n🔓 Access granted!");
        }
        System.out.println();

        // ===== EXAMPLE 3: Number Doubling =====
        System.out.println("--- Example 3: Doubling Numbers ---");

        int number = 1;

        System.out.println("Doubling " + number + " until it exceeds 100:");

        do {
            System.out.println("Current: " + number);
            number = number * 2;  // Double it
        } while (number <= 100);

        System.out.println("Final: " + number);
        System.out.println("Stopped because " + number + " > 100\n");

        System.out.println("===========================");
    }
}
```

**Expected Output:**
```
===== DO-WHILE LOOP =====

--- Comparison: while vs do-while ---

Testing WHILE loop with false condition:
while loop: Didn't run at all!

Testing DO-WHILE with same false condition:
This prints once! count2 = 10
do-while: Ran once even though condition false!

--- Example 1: ATM Menu (Simulated) ---

=== ATM MENU ===
1. Check Balance
2. Withdraw
3. Deposit
4. Exit
================
Attempt 1: Selected option 1
Your balance: $1000

=== ATM MENU ===
1. Check Balance
2. Withdraw
3. Deposit
4. Exit
================
Attempt 2: Selected option 2
Withdrawal processed

=== ATM MENU ===
1. Check Balance
2. Withdraw
3. Deposit
4. Exit
================
Attempt 3: Selected option 3
Deposit processed

=== ATM MENU ===
1. Check Balance
2. Withdraw
3. Deposit
4. Exit
================
Attempt 4: Selected option 4
Thank you! Goodbye!

Menu closed after 4 attempts

--- Example 2: Password Entry ---

Attempt 1:
Entered password: wrong1
❌ Wrong password!
   You have 2 attempts remaining

Attempt 2:
Entered password: wrong2
❌ Wrong password!
   You have 1 attempts remaining

Attempt 3:
Entered password: secret123
✅ Password correct!

🔓 Access granted!

--- Example 3: Number Doubling ---
Doubling 1 until it exceeds 100:
Current: 1
Current: 2
Current: 4
Current: 8
Current: 16
Current: 32
Current: 64
Final: 128
Stopped because 128 > 100

===========================
```

**💡 do-while Structure:**

```java
do {
    // Code runs AT LEAST ONCE
    // Then checks condition
} while (condition);  // Note the semicolon!
```

**When to Use do-while:**
1. **Menus** - Show menu at least once
2. **Validation** - Get input at least once, validate, repeat if invalid
3. **Games** - Play at least one round, ask if want to play again

**while vs do-while Comparison:**

| Feature | while | do-while |
|---------|-------|----------|
| **Check condition** | Before running | After running |
| **Minimum runs** | 0 times (if condition false) | 1 time (always) |
| **Use when** | Might not need to run at all | Must run at least once |
| **Example** | Count IF number > 0 | Show menu, THEN check choice |

**✅ Success Criteria:**
- Understand difference from while loop
- Know it always runs at least once
- Can identify when to use do-while
- Remember the semicolon after while

---

#### Exercise 3: for Loop - The Counter Loop (20 minutes)

**What you'll learn:** The most common loop type

**Create new class: `ForLoopBasics`**

```java
public class ForLoopBasics {
    public static void main(String[] args) {
        System.out.println("===== FOR LOOP BASICS =====\n");

        // ===== EXAMPLE 1: Basic for loop =====
        System.out.println("--- Example 1: Count 1 to 5 ---");

        for (int i = 1; i <= 5; i++) {
            System.out.println("i = " + i);
        }
        System.out.println();

        // Breaking down the for loop
        System.out.println("--- Understanding for loop parts ---");
        System.out.println("for (int i = 1; i <= 5; i++)");
        System.out.println("     └─────┘  └────┘  └──┘");
        System.out.println("     START   CONTINUE UPDATE");
        System.out.println();
        System.out.println("  START:    int i = 1    (runs ONCE at beginning)");
        System.out.println("  CONTINUE: i <= 5       (checked BEFORE each iteration)");
        System.out.println("  UPDATE:   i++          (runs AFTER each iteration)");
        System.out.println();

        // ===== EXAMPLE 2: Counting backwards =====
        System.out.println("--- Example 2: Countdown 10 to 1 ---");

        for (int i = 10; i >= 1; i--) {
            System.out.print(i + " ");
        }
        System.out.println("\nLiftoff! 🚀\n");

        // ===== EXAMPLE 3: Skip counting =====
        System.out.println("--- Example 3: Count by 2s (even numbers) ---");

        for (int i = 0; i <= 20; i += 2) {  // i = i + 2
            System.out.print(i + " ");
        }
        System.out.println("\n");

        System.out.println("--- Example 4: Count by 5s ---");

        for (int i = 5; i <= 50; i += 5) {
            System.out.print(i + " ");
        }
        System.out.println("\n");

        // ===== EXAMPLE 5: Multiplication table =====
        System.out.println("--- Example 5: Multiplication Table of 7 ---");

        for (int i = 1; i <= 10; i++) {
            int result = 7 * i;
            System.out.println("7 × " + i + " = " + result);
        }
        System.out.println();

        // ===== EXAMPLE 6: Sum calculation =====
        System.out.println("--- Example 6: Sum of 1 to 100 ---");

        int sum = 0;

        for (int i = 1; i <= 100; i++) {
            sum += i;  // sum = sum + i
        }

        System.out.println("Sum of numbers 1-100: " + sum);
        System.out.println();

        // ===== EXAMPLE 7: Factorial =====
        System.out.println("--- Example 7: Factorial of 5 ---");

        int number = 5;
        int factorial = 1;

        System.out.print("5! = ");

        for (int i = 1; i <= number; i++) {
            factorial *= i;  // factorial = factorial * i
            System.out.print(i);
            if (i < number) System.out.print(" × ");
        }

        System.out.println(" = " + factorial);
        System.out.println();

        // ===== EXAMPLE 8: Pattern printing =====
        System.out.println("--- Example 8: Star Pattern ---");

        for (int i = 1; i <= 5; i++) {
            // Print i stars
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        System.out.println();

        System.out.println("===============================");
    }
}
```

**Expected Output:**
```
===== FOR LOOP BASICS =====

--- Example 1: Count 1 to 5 ---
i = 1
i = 2
i = 3
i = 4
i = 5

--- Understanding for loop parts ---
for (int i = 1; i <= 5; i++)
     └─────┘  └────┘  └──┘
     START   CONTINUE UPDATE

  START:    int i = 1    (runs ONCE at beginning)
  CONTINUE: i <= 5       (checked BEFORE each iteration)
  UPDATE:   i++          (runs AFTER each iteration)

--- Example 2: Countdown 10 to 1 ---
10 9 8 7 6 5 4 3 2 1
Liftoff! 🚀

--- Example 3: Count by 2s (even numbers) ---
0 2 4 6 8 10 12 14 16 18 20

--- Example 4: Count by 5s ---
5 10 15 20 25 30 35 40 45 50

--- Example 5: Multiplication Table of 7 ---
7 × 1 = 7
7 × 2 = 14
7 × 3 = 21
7 × 4 = 28
7 × 5 = 35
7 × 6 = 42
7 × 7 = 49
7 × 8 = 56
7 × 9 = 63
7 × 10 = 70

--- Example 6: Sum of 1 to 100 ---
Sum of numbers 1-100: 5050

--- Example 7: Factorial of 5 ---
5! = 1 × 2 × 3 × 4 × 5 = 120

--- Example 8: Star Pattern ---
*
* *
* * *
* * * *
* * * * *

===============================
```

**💡 for Loop Structure:**

```java
for (initialization; condition; update) {
    // Code to repeat
}
```

**Three Parts Explained:**

```java
for (int i = 0;  i < 10;  i++)
//   ┌────────┐ ┌──────┐ ┌──┐
//   │        │ │      │ │
//   START    CHECK    STEP

// 1. START: Runs ONCE at beginning
// 2. CHECK: Before EACH iteration (if false, exit loop)
// 3. STEP:  After EACH iteration
```

**Execution Flow:**
```
1. START → int i = 0
2. CHECK → i < 10? Yes → execute body
3. STEP  → i++
4. CHECK → i < 10? Yes → execute body
5. STEP  → i++
...
N. CHECK → i < 10? No → exit loop
```

**Common for Loop Patterns:**

```java
// Standard forward count
for (int i = 0; i < n; i++) { }

// Count backwards
for (int i = n; i > 0; i--) { }

// Count by steps
for (int i = 0; i < n; i += 2) { }  // Every 2nd
for (int i = 0; i < n; i += 5) { }  // Every 5th

// Specific range
for (int i = 10; i <= 20; i++) { }  // 10 to 20
```

**Comparison: while vs for**

```java
// WHILE LOOP (3 separate lines)
int i = 0;           // 1. Initialization
while (i < 5) {      // 2. Condition
    System.out.println(i);
    i++;             // 3. Update
}

// FOR LOOP (all in one line)
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
// Cleaner when you know exact number of iterations!
```

**✅ Success Criteria:**
- Understand three parts of for loop
- Can count forwards and backwards
- Know when to use for vs while
- Can write skip counting loops

**🎯 Challenges:**
1. Print numbers 1-20, but only multiples of 3
2. Calculate sum of all even numbers from 2 to 50
3. Create multiplication table for any number

---

#### Exercise 4: Nested Loops (20 minutes)

**What you'll learn:** Loops inside loops

**Create new class: `NestedLoops`**

```java
public class NestedLoops {
    public static void main(String[] args) {
        System.out.println("===== NESTED LOOPS =====\n");

        // ===== EXAMPLE 1: Basic nested loop =====
        System.out.println("--- Example 1: Understanding Nested Loops ---");

        for (int i = 1; i <= 3; i++) {
            System.out.println("Outer loop: i = " + i);

            for (int j = 1; j <= 4; j++) {
                System.out.println("  Inner loop: j = " + j);
            }

            System.out.println();
        }

        // ===== EXAMPLE 2: Multiplication table (full) =====
        System.out.println("--- Example 2: Multiplication Table 1-5 ---\n");

        // Print header
        System.out.print("   ");
        for (int i = 1; i <= 5; i++) {
            System.out.printf("%4d", i);
        }
        System.out.println();
        System.out.println("  " + "----".repeat(5));

        // Print table
        for (int row = 1; row <= 5; row++) {
            System.out.printf("%2d |", row);

            for (int col = 1; col <= 5; col++) {
                int product = row * col;
                System.out.printf("%4d", product);
            }

            System.out.println();
        }
        System.out.println();

        // ===== EXAMPLE 3: Rectangle pattern =====
        System.out.println("--- Example 3: Rectangle (4×6) ---");

        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= 6; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        System.out.println();

        // ===== EXAMPLE 4: Right triangle =====
        System.out.println("--- Example 4: Right Triangle ---");

        for (int i = 1; i <= 5; i++) {
            // Inner loop runs i times
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        System.out.println();

        // ===== EXAMPLE 5: Inverted triangle =====
        System.out.println("--- Example 5: Inverted Triangle ---");

        for (int i = 5; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        System.out.println();

        // ===== EXAMPLE 6: Number pyramid =====
        System.out.println("--- Example 6: Number Pyramid ---");

        for (int i = 1; i <= 5; i++) {
            // Print numbers from 1 to i
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
        System.out.println();

        // ===== EXAMPLE 7: Number pattern (repeated) =====
        System.out.println("--- Example 7: Row Number Pattern ---");

        for (int i = 1; i <= 5; i++) {
            // Print row number i times
            for (int j = 1; j <= i; j++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
        System.out.println();

        // ===== EXAMPLE 8: Finding pairs =====
        System.out.println("--- Example 8: All Pairs (1-3, 1-3) ---");

        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.println("(" + i + ", " + j + ")");
            }
        }
        System.out.println();

        System.out.println("============================");
    }
}
```

**Expected Output:**
```
===== NESTED LOOPS =====

--- Example 1: Understanding Nested Loops ---
Outer loop: i = 1
  Inner loop: j = 1
  Inner loop: j = 2
  Inner loop: j = 3
  Inner loop: j = 4

Outer loop: i = 2
  Inner loop: j = 1
  Inner loop: j = 2
  Inner loop: j = 3
  Inner loop: j = 4

Outer loop: i = 3
  Inner loop: j = 1
  Inner loop: j = 2
  Inner loop: j = 3
  Inner loop: j = 4

--- Example 2: Multiplication Table 1-5 ---

      1   2   3   4   5
  --------------------
 1 |   1   2   3   4   5
 2 |   2   4   6   8  10
 3 |   3   6   9  12  15
 4 |   4   8  12  16  20
 5 |   5  10  15  20  25

--- Example 3: Rectangle (4×6) ---
* * * * * *
* * * * * *
* * * * * *
* * * * * *

--- Example 4: Right Triangle ---
*
* *
* * *
* * * *
* * * * *

--- Example 5: Inverted Triangle ---
* * * * *
* * * *
* * *
* *
*

--- Example 6: Number Pyramid ---
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5

--- Example 7: Row Number Pattern ---
1
2 2
3 3 3
4 4 4 4
5 5 5 5 5

--- Example 8: All Pairs (1-3, 1-3) ---
(1, 1)
(1, 2)
(1, 3)
(2, 1)
(2, 2)
(2, 3)
(3, 1)
(3, 2)
(3, 3)

============================
```

**💡 How Nested Loops Work:**

```java
for (int i = 1; i <= 3; i++) {      // Outer loop: 3 times
    for (int j = 1; j <= 4; j++) {  // Inner loop: 4 times
        // This body runs 3 × 4 = 12 times!
    }
}
```

**Execution Flow:**
```
i=1: j runs 1,2,3,4 (4 times)
i=2: j runs 1,2,3,4 (4 times)
i=3: j runs 1,2,3,4 (4 times)
Total: 12 times
```

**Common Nested Loop Patterns:**

**1. Rectangle (fixed width & height):**
```java
for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
```

**2. Triangle (increasing):**
```java
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) {  // j depends on i!
        System.out.print("* ");
    }
    System.out.println();
}
```

**3. Triangle (decreasing):**
```java
for (int i = n; i >= 1; i--) {
    for (int j = 1; j <= i; j++) {
        System.out.print("* ");
    }
    System.out.println();
}
```

**Key Insight:**
- **Outer loop** = Rows
- **Inner loop** = Columns (or items per row)
- Inner loop can depend on outer loop variable!

**Performance Note:**
```java
// This runs 1,000,000 times!
for (int i = 0; i < 1000; i++) {
    for (int j = 0; j < 1000; j++) {
        // Be careful with nested loops on large data!
    }
}
```

**✅ Success Criteria:**
- Understand outer loop controls rows
- Know inner loop runs completely each outer iteration
- Can create simple patterns
- Understand nesting increases iterations (multiply)

**🎯 Challenges:**
1. Create a square pattern (5×5)
2. Print a diamond shape
3. Create times tables for 1-10

---

#### Exercise 5: break and continue Statements (15 minutes)

**What you'll learn:** Controlling loop flow

**Create new class: `BreakContinue`**

```java
public class BreakContinue {
    public static void main(String[] args) {
        System.out.println("===== BREAK AND CONTINUE =====\n");

        // ===== BREAK: Exit loop immediately =====
        System.out.println("--- BREAK Statement ---\n");

        System.out.println("Example 1: Stop at 5");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                System.out.println("  Found 5! Breaking loop...");
                break;  // Exit loop immediately
            }
            System.out.println("  i = " + i);
        }
        System.out.println("  Loop exited\n");

        System.out.println("Example 2: Search for target");
        int[] numbers = {10, 20, 30, 40, 50};
        int target = 30;
        boolean found = false;

        for (int i = 0; i < numbers.length; i++) {
            System.out.println("  Checking: " + numbers[i]);

            if (numbers[i] == target) {
                System.out.println("  ✅ Found " + target + " at index " + i);
                found = true;
                break;  // No need to keep searching!
            }
        }

        if (!found) {
            System.out.println("  ❌ Target not found");
        }
        System.out.println();

        // ===== CONTINUE: Skip to next iteration =====
        System.out.println("--- CONTINUE Statement ---\n");

        System.out.println("Example 3: Skip odd numbers");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 != 0) {  // If odd
                continue;  // Skip the rest, go to next iteration
            }
            System.out.println("  Even number: " + i);
        }
        System.out.println();

        System.out.println("Example 4: Skip multiples of 3");
        for (int i = 1; i <= 15; i++) {
            if (i % 3 == 0) {
                continue;  // Skip this iteration
            }
            System.out.print(i + " ");
        }
        System.out.println("\n");

        // ===== BREAK vs CONTINUE Comparison =====
        System.out.println("--- Comparison: break vs continue ---\n");

        System.out.println("With BREAK (stops completely):");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) break;
            System.out.print(i + " ");
        }
        System.out.println("\n");

        System.out.println("With CONTINUE (skips only 5):");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) continue;
            System.out.print(i + " ");
        }
        System.out.println("\n");

        // ===== REAL-WORLD EXAMPLE: Password validator =====
        System.out.println("--- Example 5: Password Validator ---");

        String password = "Abc12!xyz";
        System.out.println("Validating password: " + password);
        System.out.println();

        boolean hasUpper = false;
        boolean hasLower = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;

        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);

            if (Character.isUpperCase(ch)) {
                hasUpper = true;
                System.out.println("  ✅ Found uppercase: " + ch);
                continue;
            }

            if (Character.isLowerCase(ch)) {
                hasLower = true;
                continue;  // Skip further checks for this character
            }

            if (Character.isDigit(ch)) {
                hasDigit = true;
                System.out.println("  ✅ Found digit: " + ch);
                continue;
            }

            if (!Character.isLetterOrDigit(ch)) {
                hasSpecial = true;
                System.out.println("  ✅ Found special char: " + ch);
            }
        }

        System.out.println("\nValidation Results:");
        System.out.println("  Uppercase: " + (hasUpper ? "✅" : "❌"));
        System.out.println("  Lowercase: " + (hasLower ? "✅" : "❌"));
        System.out.println("  Digit: " + (hasDigit ? "✅" : "❌"));
        System.out.println("  Special: " + (hasSpecial ? "✅" : "❌"));

        if (hasUpper && hasLower && hasDigit && hasSpecial) {
            System.out.println("\n🎉 Password is strong!");
        } else {
            System.out.println("\n⚠️  Password needs improvement");
        }
        System.out.println();

        // ===== NESTED LOOPS with break =====
        System.out.println("--- Example 6: Break in Nested Loops ---");

        System.out.println("(break only exits innermost loop)\n");

        for (int i = 1; i <= 3; i++) {
            System.out.println("Outer: i = " + i);

            for (int j = 1; j <= 5; j++) {
                if (j == 3) {
                    System.out.println("  Breaking inner loop at j=3");
                    break;  // Only exits inner loop!
                }
                System.out.println("  Inner: j = " + j);
            }

            System.out.println();
        }

        System.out.println("===============================");
    }
}
```

**Expected Output:**
```
===== BREAK AND CONTINUE =====

--- BREAK Statement ---

Example 1: Stop at 5
  i = 1
  i = 2
  i = 3
  i = 4
  Found 5! Breaking loop...
  Loop exited

Example 2: Search for target
  Checking: 10
  Checking: 20
  Checking: 30
  ✅ Found 30 at index 2

--- CONTINUE Statement ---

Example 3: Skip odd numbers
  Even number: 2
  Even number: 4
  Even number: 6
  Even number: 8
  Even number: 10

Example 4: Skip multiples of 3
1 2 4 5 7 8 10 11 13 14

--- Comparison: break vs continue ---

With BREAK (stops completely):
1 2 3 4

With CONTINUE (skips only 5):
1 2 3 4 6 7 8 9 10

--- Example 5: Password Validator ---
Validating password: Abc12!xyz

  ✅ Found uppercase: A
  ✅ Found digit: 1
  ✅ Found digit: 2
  ✅ Found special char: !

Validation Results:
  Uppercase: ✅
  Lowercase: ✅
  Digit: ✅
  Special: ✅

🎉 Password is strong!

--- Example 6: Break in Nested Loops ---
(break only exits innermost loop)

Outer: i = 1
  Inner: j = 1
  Inner: j = 2
  Breaking inner loop at j=3

Outer: i = 2
  Inner: j = 1
  Inner: j = 2
  Breaking inner loop at j=3

Outer: i = 3
  Inner: j = 1
  Inner: j = 2
  Breaking inner loop at j=3

===============================
```

**💡 break vs continue:**

| Statement | Effect | Use When |
|-----------|--------|----------|
| **break** | Exit loop completely | Found what you're looking for |
| **continue** | Skip to next iteration | Want to skip certain items |

**break Example:**
```java
// Stop when found
for (int i = 0; i < 100; i++) {
    if (arr[i] == target) {
        break;  // Found it! Stop searching
    }
}
```

**continue Example:**
```java
// Process only even numbers
for (int i = 0; i < 100; i++) {
    if (i % 2 != 0) {
        continue;  // Skip odd numbers
    }
    // Process even number
}
```

**Important Notes:**
1. **break** only exits the INNERMOST loop it's in
2. **continue** only affects the current iteration
3. Both work with while, do-while, and for loops
4. Use wisely - too many can make code hard to follow

**✅ Success Criteria:**
- Know break exits loop immediately
- Know continue skips to next iteration
- Understand difference between them
- Can use both in real-world scenarios

---

#### Exercise 6: Real-World Application - Prime Number Finder (25 minutes)

**What you'll learn:** Combining all loop concepts

**Create new class: `PrimeNumberFinder`**

```java
public class PrimeNumberFinder {
    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════╗");
        System.out.println("║     PRIME NUMBER FINDER              ║");
        System.out.println("╚═══════════════════════════════════════╝");
        System.out.println();

        // ===== PART 1: Check if single number is prime =====
        System.out.println("═══ PART 1: Single Number Check ═══\n");

        int numberToCheck = 29;
        System.out.println("Checking if " + numberToCheck + " is prime...\n");

        boolean isPrime = true;

        if (numberToCheck <= 1) {
            isPrime = false;
            System.out.println(numberToCheck + " is NOT prime");
            System.out.println("(Numbers ≤ 1 are not prime by definition)\n");

        } else {
            System.out.println("Testing divisors from 2 to " + (numberToCheck - 1) + ":");

            for (int i = 2; i < numberToCheck; i++) {
                System.out.print("  " + numberToCheck + " ÷ " + i + " = ");

                if (numberToCheck % i == 0) {
                    System.out.println(numberToCheck / i + " (divisible!)");
                    System.out.println("  ❌ Found divisor! " + numberToCheck + " = " + i + " × " + (numberToCheck / i));
                    isPrime = false;
                    break;  // Found a divisor, no need to continue
                } else {
                    System.out.println((double) numberToCheck / i + " (not divisible)");
                }
            }

            if (isPrime) {
                System.out.println("\n✅ " + numberToCheck + " IS PRIME!");
                System.out.println("   (No divisors found)");
            }
        }
        System.out.println();

        // ===== PART 2: Find all primes in a range =====
        System.out.println("═══ PART 2: Find Primes 1-50 ═══\n");

        int start = 1;
        int end = 50;
        int primeCount = 0;

        System.out.println("Prime numbers between " + start + " and " + end + ":\n");

        for (int num = start; num <= end; num++) {
            boolean isNumPrime = true;

            // Check if num is prime
            if (num <= 1) {
                isNumPrime = false;
            } else {
                for (int i = 2; i < num; i++) {
                    if (num % i == 0) {
                        isNumPrime = false;
                        break;  // Not prime, stop checking
                    }
                }
            }

            // If prime, print it
            if (isNumPrime) {
                System.out.printf("%4d", num);
                primeCount++;

                // New line every 10 primes
                if (primeCount % 10 == 0) {
                    System.out.println();
                }
            }
        }

        System.out.println("\n");
        System.out.println("Total primes found: " + primeCount);
        System.out.println();

        // ===== PART 3: Optimized prime checker =====
        System.out.println("═══ PART 3: Optimized Method ═══\n");
        System.out.println("(Only check up to √n instead of n-1)\n");

        int testNumber = 97;
        System.out.println("Testing if " + testNumber + " is prime (optimized):\n");

        boolean isPrimeOptimized = true;

        if (testNumber <= 1) {
            isPrimeOptimized = false;
        } else {
            int limit = (int) Math.sqrt(testNumber);
            System.out.println("Only need to check divisors up to √" + testNumber + " = " + limit);
            System.out.println("(If no divisor ≤ " + limit + ", then no divisor exists)\n");

            System.out.println("Checking divisors:");

            for (int i = 2; i <= limit; i++) {
                System.out.println("  " + testNumber + " % " + i + " = " + (testNumber % i));

                if (testNumber % i == 0) {
                    isPrimeOptimized = false;
                    break;
                }
            }

            if (isPrimeOptimized) {
                System.out.println("\n✅ " + testNumber + " IS PRIME!");
            } else {
                System.out.println("\n❌ " + testNumber + " is NOT prime");
            }
        }
        System.out.println();

        // ===== PART 4: Statistics =====
        System.out.println("═══ PART 4: Prime Statistics ═══\n");

        int range = 100;
        int count = 0;
        int sum = 0;
        int largestPrime = 0;

        System.out.println("Analyzing primes from 1 to " + range + "...\n");

        for (int num = 2; num <= range; num++) {
            boolean prime = true;

            for (int i = 2; i * i <= num; i++) {  // Optimized check
                if (num % i == 0) {
                    prime = false;
                    break;
                }
            }

            if (prime) {
                count++;
                sum += num;
                largestPrime = num;  // Keep updating with each prime
            }
        }

        System.out.println("📊 Statistics:");
        System.out.println("   Count: " + count + " primes");
        System.out.println("   Sum: " + sum);
        System.out.println("   Average: " + (double) sum / count);
        System.out.println("   Largest: " + largestPrime);
        System.out.println();

        System.out.println("═══════════════════════════════════════");
        System.out.println("          Session Complete");
        System.out.println("═══════════════════════════════════════");
    }
}
```

**Expected Output:** (Partial - output is long)
```
╔═══════════════════════════════════════╗
║     PRIME NUMBER FINDER              ║
╚═══════════════════════════════════════╝

═══ PART 1: Single Number Check ═══

Checking if 29 is prime...

Testing divisors from 2 to 28:
  29 ÷ 2 = 14.5 (not divisible)
  29 ÷ 3 = 9.666666666666666 (not divisible)
  29 ÷ 4 = 7.25 (not divisible)
  ...
  29 ÷ 28 = 1.0357142857142858 (not divisible)

✅ 29 IS PRIME!
   (No divisors found)

═══ PART 2: Find Primes 1-50 ═══

Prime numbers between 1 and 50:

   2   3   5   7  11  13  17  19  23  29
  31  37  41  43  47

Total primes found: 15

═══ PART 3: Optimized Method ═══

(Only check up to √n instead of n-1)

Testing if 97 is prime (optimized):

Only need to check divisors up to √97 = 9
(If no divisor ≤ 9, then no divisor exists)

Checking divisors:
  97 % 2 = 1
  97 % 3 = 1
  97 % 4 = 1
  97 % 5 = 2
  97 % 6 = 1
  97 % 7 = 6
  97 % 8 = 1
  97 % 9 = 7

✅ 97 IS PRIME!

═══ PART 4: Prime Statistics ═══

Analyzing primes from 1 to 100...

📊 Statistics:
   Count: 25 primes
   Sum: 1060
   Average: 42.4
   Largest: 97

═══════════════════════════════════════
          Session Complete
═══════════════════════════════════════
```

**💡 What This Program Demonstrates:**

1. **Nested loops** - Checking each divisor
2. **break statement** - Stop when divisor found
3. **Optimization** - Only check up to √n
4. **Accumulation** - Counting, summing primes
5. **Boolean logic** - Tracking isPrime state

**Prime Number Algorithm:**

```
To check if n is prime:
1. If n ≤ 1: NOT prime
2. For each number i from 2 to n-1:
   - If n % i == 0: NOT prime (found divisor)
3. If no divisor found: IS prime
```

**Optimization:**
```
Only need to check i from 2 to √n

Why? If n = a × b where a ≤ b:
- Then a ≤ √n
- So we'll find 'a' before √n
```

**✅ Key Learnings:**
- Complex logic with nested loops
- Using break for efficiency
- Optimization techniques
- Real-world application

**🎯 Challenges:**
1. Find first 10 prime numbers
2. Check if a number is a perfect square
3. Find all factors of a number

---

**✅ Day 5 Complete!**

You've learned:
- ✅ while loops (condition-based repetition)
- ✅ do-while loops (run at least once)
- ✅ for loops (counter-based repetition)
- ✅ Nested loops (loops inside loops)
- ✅ break statement (exit loop)
- ✅ continue statement (skip iteration)
- ✅ Real-world application (prime finder)

**🎯 Before moving to Day 6:**
- [ ] Can write all three types of loops
- [ ] Understand when to use each loop type
- [ ] Comfortable with nested loops
- [ ] Know how to use break and continue
- [ ] Can solve problems requiring loops
- [ ] Built a complete algorithm (prime finder)

### Day 6: Arrays Basics

---

#### Exercise 1: Your First Array (10 minutes)

**What you'll learn:** Creating and using arrays

**Create new class: `FirstArray`**

**Concept:** An array is a container that holds multiple values of the same type. Think of it like a row of numbered boxes.

**Step-by-Step:**

```java
public class FirstArray {
    public static void main(String[] args) {
        System.out.println("===== YOUR FIRST ARRAY =====\n");

        // ===== CREATING AN ARRAY =====
        System.out.println("--- Creating Arrays ---\n");

        // Method 1: Declare, then create
        int[] numbers;              // Declare (says "I'll have an int array")
        numbers = new int[5];       // Create (makes 5 spaces)

        System.out.println("Created array with 5 spaces");
        System.out.println("Array: " + java.util.Arrays.toString(numbers));
        System.out.println("Initial values are all 0\n");

        // Method 2: Declare and create in one line
        int[] scores = new int[3];
        System.out.println("Created scores array: " + java.util.Arrays.toString(scores));
        System.out.println();

        // Method 3: Create with values directly
        int[] ages = {25, 30, 35, 40, 45};
        System.out.println("Created ages array with values: " + java.util.Arrays.toString(ages));
        System.out.println();

        // ===== ACCESSING ARRAY ELEMENTS =====
        System.out.println("--- Accessing Elements ---\n");

        System.out.println("Array: " + java.util.Arrays.toString(ages));
        System.out.println("Indexes:  0   1   2   3   4");
        System.out.println();

        System.out.println("ages[0] = " + ages[0] + " (first element)");
        System.out.println("ages[1] = " + ages[1]);
        System.out.println("ages[2] = " + ages[2]);
        System.out.println("ages[3] = " + ages[3]);
        System.out.println("ages[4] = " + ages[4] + " (last element)");
        System.out.println();

        // ===== MODIFYING ARRAY ELEMENTS =====
        System.out.println("--- Modifying Elements ---\n");

        System.out.println("Before: " + java.util.Arrays.toString(numbers));

        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;

        System.out.println("After:  " + java.util.Arrays.toString(numbers));
        System.out.println();

        // ===== ARRAY LENGTH =====
        System.out.println("--- Array Length ---\n");

        System.out.println("ages array: " + java.util.Arrays.toString(ages));
        System.out.println("Length: " + ages.length);
        System.out.println("Last index: " + (ages.length - 1));
        System.out.println("Last element: ages[" + (ages.length - 1) + "] = " + ages[ages.length - 1]);
        System.out.println();

        System.out.println("============================");
    }
}
```

**Expected Output:**
```
===== YOUR FIRST ARRAY =====

--- Creating Arrays ---

Created array with 5 spaces
Array: [0, 0, 0, 0, 0]
Initial values are all 0

Created scores array: [0, 0, 0]

Created ages array with values: [25, 30, 35, 40, 45]

--- Accessing Elements ---

Array: [25, 30, 35, 40, 45]
Indexes:  0   1   2   3   4

ages[0] = 25 (first element)
ages[1] = 30
ages[2] = 35
ages[3] = 40
ages[4] = 45 (last element)

--- Modifying Elements ---

Before: [0, 0, 0, 0, 0]
After:  [10, 20, 30, 40, 50]

--- Array Length ---

ages array: [25, 30, 35, 40, 45]
Length: 5
Last index: 4
Last element: ages[4] = 45

============================
```

**💡 Array Basics:**

**Declaration and Creation:**
```java
// Declare
int[] numbers;

// Create (allocate memory)
numbers = new int[5];  // Array of 5 integers

// Or both in one line
int[] numbers = new int[5];

// Or create with values
int[] numbers = {10, 20, 30, 40, 50};
```

**Key Points:**
- **Index starts at 0** - First element is [0], not [1]!
- **Length is fixed** - Can't change after creation
- **Default values** - Numbers: 0, boolean: false, Objects: null
- **Access:** `array[index]`
- **Modify:** `array[index] = value`
- **Length:** `array.length` (no parentheses!)

**Index Visualization:**
```
Array: [10, 20, 30, 40, 50]
Index:  0   1   2   3   4
        ↑               ↑
      first          last
```

**Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `array[5]` for length 5 | Index 5 doesn't exist! | `array[4]` (last is length-1) |
| `array.length()` | length is property, not method | `array.length` |
| `int[5] array` | Wrong syntax order | `int[] array` or `int array[]` |

**✅ Success Criteria:**
- Can create arrays three different ways
- Understand zero-based indexing
- Know how to access and modify elements
- Remember array.length (no parentheses)

---

#### Exercise 2: Looping Through Arrays (15 minutes)

**What you'll learn:** Accessing all elements using loops

**Create new class: `ArrayLoops`**

```java
public class ArrayLoops {
    public static void main(String[] args) {
        System.out.println("===== LOOPING THROUGH ARRAYS =====\n");

        int[] numbers = {5, 10, 15, 20, 25, 30};

        // ===== METHOD 1: for loop with index =====
        System.out.println("--- Method 1: for loop with index ---\n");

        System.out.println("Array: " + java.util.Arrays.toString(numbers));
        System.out.println();

        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }
        System.out.println();

        // ===== METHOD 2: for-each loop (enhanced for) =====
        System.out.println("--- Method 2: for-each loop ---\n");

        System.out.println("Printing all values:");
        for (int num : numbers) {  // Read as: "for each num in numbers"
            System.out.println("  " + num);
        }
        System.out.println();

        // ===== COMPARING BOTH METHODS =====
        System.out.println("--- Comparison ---\n");

        System.out.println("With INDEX (when you need position):");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("  Position " + i + " = " + numbers[i]);
        }
        System.out.println();

        System.out.println("WITHOUT INDEX (when you just need values):");
        for (int num : numbers) {
            System.out.println("  Value: " + num);
        }
        System.out.println();

        // ===== PRACTICAL EXAMPLES =====
        System.out.println("--- Practical Examples ---\n");

        // Example 1: Sum of all elements
        System.out.println("Example 1: Calculate Sum");
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Array: " + java.util.Arrays.toString(numbers));
        System.out.println("Sum: " + sum);
        System.out.println();

        // Example 2: Find maximum
        System.out.println("Example 2: Find Maximum");
        int max = numbers[0];  // Start with first element
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }
        System.out.println("Maximum value: " + max);
        System.out.println();

        // Example 3: Count even numbers
        System.out.println("Example 3: Count Even Numbers");
        int evenCount = 0;
        for (int num : numbers) {
            if (num % 2 == 0) {
                System.out.println("  " + num + " is even");
                evenCount++;
            }
        }
        System.out.println("Total even numbers: " + evenCount);
        System.out.println();

        // Example 4: Double each value
        System.out.println("Example 4: Double Each Value");
        System.out.println("Before: " + java.util.Arrays.toString(numbers));

        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = numbers[i] * 2;  // Need index to modify!
        }

        System.out.println("After:  " + java.util.Arrays.toString(numbers));
        System.out.println();

        System.out.println("==================================");
    }
}
```

**Expected Output:**
```
===== LOOPING THROUGH ARRAYS =====

--- Method 1: for loop with index ---

Array: [5, 10, 15, 20, 25, 30]

Index 0: 5
Index 1: 10
Index 2: 15
Index 3: 20
Index 4: 25
Index 5: 30

--- Method 2: for-each loop ---

Printing all values:
  5
  10
  15
  20
  25
  30

--- Comparison ---

With INDEX (when you need position):
  Position 0 = 5
  Position 1 = 10
  Position 2 = 15
  Position 3 = 20
  Position 4 = 25
  Position 5 = 30

WITHOUT INDEX (when you just need values):
  Value: 5
  Value: 10
  Value: 15
  Value: 20
  Value: 25
  Value: 30

--- Practical Examples ---

Example 1: Calculate Sum
Array: [5, 10, 15, 20, 25, 30]
Sum: 105

Example 2: Find Maximum
Maximum value: 30

Example 3: Count Even Numbers
  10 is even
  20 is even
  30 is even
Total even numbers: 3

Example 4: Double Each Value
Before: [5, 10, 15, 20, 25, 30]
After:  [10, 20, 30, 40, 50, 60]

==================================
```

**💡 Two Ways to Loop:**

**1. Regular for loop (with index):**
```java
for (int i = 0; i < array.length; i++) {
    // Use array[i]
    // Can modify: array[i] = newValue;
}
```

**2. For-each loop (enhanced for):**
```java
for (int element : array) {
    // Use element directly
    // CANNOT modify array (element is a copy)
}
```

**When to Use Each:**

| Use regular for | Use for-each |
|----------------|--------------|
| Need index/position | Just need values |
| Want to modify array | Just reading values |
| Need to skip elements | Process all elements |
| Counting/tracking position | Simple iteration |

**Common Array Operations:**

```java
// Sum
int sum = 0;
for (int num : array) {
    sum += num;
}

// Average
double avg = sum / (double) array.length;

// Find max
int max = array[0];
for (int num : array) {
    if (num > max) max = num;
}

// Find min
int min = array[0];
for (int num : array) {
    if (num < min) min = num;
}

// Count specific values
int count = 0;
for (int num : array) {
    if (num == target) count++;
}
```

**✅ Success Criteria:**
- Can use both loop types
- Know when to use each one
- Can calculate sum, max, min
- Understand for-each can't modify array

---

#### Exercise 3: Array Input and Search (20 minutes)

**What you'll learn:** Working with user data and searching

**Create new class: `ArraySearch`**

```java
public class ArraySearch {
    public static void main(String[] args) {
        System.out.println("===== ARRAY SEARCH =====\n");

        // Sample data: student scores
        int[] scores = {85, 92, 78, 95, 88, 76, 90, 83};
        String[] names = {"Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"};

        System.out.println("Student Scores:");
        for (int i = 0; i < names.length; i++) {
            System.out.println("  " + names[i] + ": " + scores[i]);
        }
        System.out.println();

        // ===== LINEAR SEARCH: Find a specific value =====
        System.out.println("--- Linear Search ---\n");

        int targetScore = 90;
        int foundIndex = -1;  // -1 means "not found"

        System.out.println("Searching for score: " + targetScore);

        for (int i = 0; i < scores.length; i++) {
            System.out.println("  Checking index " + i + ": " + scores[i]);

            if (scores[i] == targetScore) {
                foundIndex = i;
                System.out.println("  ✅ Found it!");
                break;  // Stop searching
            }
        }

        if (foundIndex != -1) {
            System.out.println("\nResult: " + names[foundIndex] + " scored " + targetScore);
        } else {
            System.out.println("\nScore " + targetScore + " not found");
        }
        System.out.println();

        // ===== FIND ALL MATCHES =====
        System.out.println("--- Find All Students Above 85 ---\n");

        System.out.println("Students with scores > 85:");
        int count = 0;

        for (int i = 0; i < scores.length; i++) {
            if (scores[i] > 85) {
                System.out.println("  " + names[i] + ": " + scores[i]);
                count++;
            }
        }

        System.out.println("\nTotal: " + count + " students");
        System.out.println();

        // ===== FIND MINIMUM AND MAXIMUM =====
        System.out.println("--- Find Top and Bottom Scores ---\n");

        int minScore = scores[0];
        int maxScore = scores[0];
        int minIndex = 0;
        int maxIndex = 0;

        for (int i = 0; i < scores.length; i++) {
            if (scores[i] < minScore) {
                minScore = scores[i];
                minIndex = i;
            }
            if (scores[i] > maxScore) {
                maxScore = scores[i];
                maxIndex = i;
            }
        }

        System.out.println("Lowest score: " + minScore + " (" + names[minIndex] + ")");
        System.out.println("Highest score: " + maxScore + " (" + names[maxIndex] + ")");
        System.out.println();

        // ===== SEARCH BY NAME =====
        System.out.println("--- Search Student by Name ---\n");

        String searchName = "Diana";
        int studentIndex = -1;

        System.out.println("Searching for: " + searchName);

        for (int i = 0; i < names.length; i++) {
            if (names[i].equals(searchName)) {
                studentIndex = i;
                break;
            }
        }

        if (studentIndex != -1) {
            System.out.println("✅ Found: " + names[studentIndex] + " scored " + scores[studentIndex]);
        } else {
            System.out.println("❌ Student not found");
        }
        System.out.println();

        // ===== CHECK IF ARRAY CONTAINS VALUE =====
        System.out.println("--- Check if Score Exists ---\n");

        int[] scoresToCheck = {80, 90, 100};

        for (int score : scoresToCheck) {
            boolean found = false;

            for (int s : scores) {
                if (s == score) {
                    found = true;
                    break;
                }
            }

            System.out.println("Score " + score + ": " + (found ? "✅ Exists" : "❌ Not found"));
        }

        System.out.println("\n========================");
    }
}
```

**Expected Output:**
```
===== ARRAY SEARCH =====

Student Scores:
  Alice: 85
  Bob: 92
  Charlie: 78
  Diana: 95
  Eve: 88
  Frank: 76
  Grace: 90
  Henry: 83

--- Linear Search ---

Searching for score: 90
  Checking index 0: 85
  Checking index 1: 92
  Checking index 2: 78
  Checking index 3: 95
  Checking index 4: 88
  Checking index 5: 76
  Checking index 6: 90
  ✅ Found it!

Result: Grace scored 90

--- Find All Students Above 85 ---

Students with scores > 85:
  Bob: 92
  Diana: 95
  Eve: 88
  Grace: 90

Total: 4 students

--- Find Top and Bottom Scores ---

Lowest score: 76 (Frank)
Highest score: 95 (Diana)

--- Search Student by Name ---

Searching for: Diana
✅ Found: Diana scored 95

--- Check if Score Exists ---

Score 80: ❌ Not found
Score 90: ✅ Exists
Score 100: ❌ Not found

========================
```

**💡 Search Algorithms:**

**Linear Search (Sequential Search):**
```java
int search(int[] array, int target) {
    for (int i = 0; i < array.length; i++) {
        if (array[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}
```

**Search Pattern:**
1. Loop through array
2. Check each element
3. Return index if found
4. Return -1 if not found

**Common Search Tasks:**

```java
// Find first occurrence
for (int i = 0; i < array.length; i++) {
    if (array[i] == target) {
        return i;  // Return first match
    }
}

// Find all occurrences
for (int i = 0; i < array.length; i++) {
    if (array[i] == target) {
        System.out.println("Found at " + i);
    }
}

// Check if exists (boolean)
boolean exists = false;
for (int num : array) {
    if (num == target) {
        exists = true;
        break;
    }
}
```

**String Comparison in Arrays:**
```java
// ❌ WRONG - Don't use ==
if (names[i] == "Bob") { }

// ✅ RIGHT - Use .equals()
if (names[i].equals("Bob")) { }
```

**✅ Success Criteria:**
- Can search for specific values
- Understand linear search concept
- Can find min/max with index
- Know to use .equals() for strings

---

#### Exercise 4: Array Manipulation (20 minutes)

**What you'll learn:** Copying, reversing, and transforming arrays

**Create new class: `ArrayManipulation`**

```java
public class ArrayManipulation {
    public static void main(String[] args) {
        System.out.println("===== ARRAY MANIPULATION =====\n");

        // ===== COPYING ARRAYS =====
        System.out.println("--- Copying Arrays ---\n");

        int[] original = {10, 20, 30, 40, 50};

        // ❌ WRONG WAY - This doesn't copy!
        int[] wrong = original;  // Just copies reference!
        wrong[0] = 999;

        System.out.println("Original: " + java.util.Arrays.toString(original));
        System.out.println("'Copy':   " + java.util.Arrays.toString(wrong));
        System.out.println("⚠️  Both changed! They point to same array!\n");

        // Reset
        original[0] = 10;

        // ✅ RIGHT WAY 1: Manual copy
        int[] copy1 = new int[original.length];
        for (int i = 0; i < original.length; i++) {
            copy1[i] = original[i];
        }

        System.out.println("Manual copy:");
        System.out.println("Original: " + java.util.Arrays.toString(original));
        System.out.println("Copy:     " + java.util.Arrays.toString(copy1));

        copy1[0] = 111;
        System.out.println("After changing copy[0] to 111:");
        System.out.println("Original: " + java.util.Arrays.toString(original));
        System.out.println("Copy:     " + java.util.Arrays.toString(copy1));
        System.out.println("✅ Only copy changed!\n");

        // ===== REVERSING AN ARRAY =====
        System.out.println("--- Reversing Array ---\n");

        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Before: " + java.util.Arrays.toString(numbers));

        // Swap elements from both ends
        for (int i = 0; i < numbers.length / 2; i++) {
            int oppositeIndex = numbers.length - 1 - i;

            System.out.println("  Swap index " + i + " with " + oppositeIndex);

            // Swap using temp variable
            int temp = numbers[i];
            numbers[i] = numbers[oppositeIndex];
            numbers[oppositeIndex] = temp;
        }

        System.out.println("After:  " + java.util.Arrays.toString(numbers));
        System.out.println();

        // ===== SHIFTING ELEMENTS =====
        System.out.println("--- Shifting Elements Right ---\n");

        int[] shift = {10, 20, 30, 40, 50};
        System.out.println("Before: " + java.util.Arrays.toString(shift));

        // Save last element
        int last = shift[shift.length - 1];

        // Shift all elements right
        for (int i = shift.length - 1; i > 0; i--) {
            shift[i] = shift[i - 1];
        }

        // Put last at beginning
        shift[0] = last;

        System.out.println("After:  " + java.util.Arrays.toString(shift));
        System.out.println("(Last element moved to first)\n");

        // ===== FILTERING - Create new array with only even numbers =====
        System.out.println("--- Filtering (Extract Even Numbers) ---\n");

        int[] data = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        System.out.println("Original: " + java.util.Arrays.toString(data));

        // Count even numbers first
        int evenCount = 0;
        for (int num : data) {
            if (num % 2 == 0) evenCount++;
        }

        // Create array of right size
        int[] evens = new int[evenCount];
        int index = 0;

        // Fill with even numbers
        for (int num : data) {
            if (num % 2 == 0) {
                evens[index] = num;
                index++;
            }
        }

        System.out.println("Evens:    " + java.util.Arrays.toString(evens));
        System.out.println();

        // ===== DOUBLING ALL VALUES =====
        System.out.println("--- Transform: Double All Values ---\n");

        int[] values = {5, 10, 15, 20};
        System.out.println("Before: " + java.util.Arrays.toString(values));

        for (int i = 0; i < values.length; i++) {
            values[i] *= 2;  // values[i] = values[i] * 2
        }

        System.out.println("After:  " + java.util.Arrays.toString(values));
        System.out.println();

        // ===== FINDING DUPLICATES =====
        System.out.println("--- Finding Duplicates ---\n");

        int[] nums = {1, 2, 3, 2, 4, 5, 3, 6};
        System.out.println("Array: " + java.util.Arrays.toString(nums));
        System.out.println("Duplicates found:");

        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) {
                    System.out.println("  " + nums[i] + " (at index " + i + " and " + j + ")");
                    break;  // Only report once per number
                }
            }
        }

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== ARRAY MANIPULATION =====

--- Copying Arrays ---

Original: [999, 20, 30, 40, 50]
'Copy':   [999, 20, 30, 40, 50]
⚠️  Both changed! They point to same array!

Manual copy:
Original: [10, 20, 30, 40, 50]
Copy:     [10, 20, 30, 40, 50]
After changing copy[0] to 111:
Original: [10, 20, 30, 40, 50]
Copy:     [111, 20, 30, 40, 50]
✅ Only copy changed!

--- Reversing Array ---

Before: [1, 2, 3, 4, 5]
  Swap index 0 with 4
  Swap index 1 with 3
After:  [5, 4, 3, 2, 1]

--- Shifting Elements Right ---

Before: [10, 20, 30, 40, 50]
After:  [50, 10, 20, 30, 40]
(Last element moved to first)

--- Filtering (Extract Even Numbers) ---

Original: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Evens:    [2, 4, 6, 8, 10]

--- Transform: Double All Values ---

Before: [5, 10, 15, 20]
After:  [10, 20, 30, 40]

--- Finding Duplicates ---

Array: [1, 2, 3, 2, 4, 5, 3, 6]
Duplicates found:
  2 (at index 1 and 3)
  3 (at index 2 and 6)

==============================
```

**💡 Array Operations:**

**Copying:**
```java
// ❌ WRONG - Just copies reference
int[] copy = original;

// ✅ RIGHT - Manual copy
int[] copy = new int[original.length];
for (int i = 0; i < original.length; i++) {
    copy[i] = original[i];
}

// ✅ ALSO RIGHT - Using Arrays.copyOf()
int[] copy = java.util.Arrays.copyOf(original, original.length);
```

**Reversing:**
```java
for (int i = 0; i < array.length / 2; i++) {
    int j = array.length - 1 - i;
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
```

**Swapping Two Elements:**
```java
int temp = array[i];
array[i] = array[j];
array[j] = temp;
```

**✅ Success Criteria:**
- Understand reference vs copy
- Can reverse an array
- Can shift/rotate elements
- Can filter and transform arrays

---

#### Exercise 5: Real-World Application - Grade Analyzer (25 minutes)

**What you'll learn:** Complete array-based application

**Create new class: `GradeAnalyzer`**

```java
public class GradeAnalyzer {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════╗");
        System.out.println("║      STUDENT GRADE ANALYZER       ║");
        System.out.println("╚════════════════════════════════════╝");
        System.out.println();

        // ===== STUDENT DATA =====
        String[] students = {"Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"};
        int[] scores = {88, 92, 76, 95, 85, 72, 90, 83};

        System.out.println("Class Size: " + students.length + " students");
        System.out.println();

        // ===== DISPLAY ALL SCORES =====
        System.out.println("═══ STUDENT SCORES ═══");
        for (int i = 0; i < students.length; i++) {
            System.out.printf("%-10s: %3d\n", students[i], scores[i]);
        }
        System.out.println();

        // ===== CALCULATE STATISTICS =====
        System.out.println("═══ STATISTICS ═══");

        // Calculate sum
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }

        // Calculate average
        double average = (double) sum / scores.length;

        // Find min and max
        int min = scores[0];
        int max = scores[0];
        int minIndex = 0;
        int maxIndex = 0;

        for (int i = 0; i < scores.length; i++) {
            if (scores[i] < min) {
                min = scores[i];
                minIndex = i;
            }
            if (scores[i] > max) {
                max = scores[i];
                maxIndex = i;
            }
        }

        System.out.println("Total Points: " + sum);
        System.out.printf("Average: %.2f\n", average);
        System.out.println("Highest: " + max + " (" + students[maxIndex] + ")");
        System.out.println("Lowest: " + min + " (" + students[minIndex] + ")");
        System.out.println("Range: " + (max - min) + " points");
        System.out.println();

        // ===== GRADE DISTRIBUTION =====
        System.out.println("═══ GRADE DISTRIBUTION ═══");

        int countA = 0, countB = 0, countC = 0, countD = 0, countF = 0;

        for (int score : scores) {
            if (score >= 90) countA++;
            else if (score >= 80) countB++;
            else if (score >= 70) countC++;
            else if (score >= 60) countD++;
            else countF++;
        }

        System.out.println("A (90-100): " + countA + " students");
        System.out.println("B (80-89):  " + countB + " students");
        System.out.println("C (70-79):  " + countC + " students");
        System.out.println("D (60-69):  " + countD + " students");
        System.out.println("F (0-59):   " + countF + " students");
        System.out.println();

        // ===== STUDENTS ABOVE/BELOW AVERAGE =====
        System.out.println("═══ PERFORMANCE ANALYSIS ═══");

        System.out.printf("Class Average: %.2f\n\n", average);

        System.out.println("Above Average:");
        int aboveCount = 0;
        for (int i = 0; i < students.length; i++) {
            if (scores[i] > average) {
                System.out.printf("  %-10s: %3d (+%.1f)\n",
                    students[i], scores[i], scores[i] - average);
                aboveCount++;
            }
        }

        System.out.println("\nBelow Average:");
        int belowCount = 0;
        for (int i = 0; i < students.length; i++) {
            if (scores[i] < average) {
                System.out.printf("  %-10s: %3d (%.1f)\n",
                    students[i], scores[i], scores[i] - average);
                belowCount++;
            }
        }

        System.out.println("\nAt Average:");
        for (int i = 0; i < students.length; i++) {
            if (scores[i] == average) {
                System.out.println("  " + students[i] + ": " + scores[i]);
            }
        }
        System.out.println();

        // ===== RANKING (Sort and Display) =====
        System.out.println("═══ CLASS RANKING ═══");

        // Create copies to sort (don't modify original)
        String[] rankNames = new String[students.length];
        int[] rankScores = new int[scores.length];

        for (int i = 0; i < students.length; i++) {
            rankNames[i] = students[i];
            rankScores[i] = scores[i];
        }

        // Bubble sort (simple sorting algorithm)
        for (int i = 0; i < rankScores.length - 1; i++) {
            for (int j = 0; j < rankScores.length - 1 - i; j++) {
                if (rankScores[j] < rankScores[j + 1]) {
                    // Swap scores
                    int tempScore = rankScores[j];
                    rankScores[j] = rankScores[j + 1];
                    rankScores[j + 1] = tempScore;

                    // Swap names
                    String tempName = rankNames[j];
                    rankNames[j] = rankNames[j + 1];
                    rankNames[j + 1] = tempName;
                }
            }
        }

        // Display ranking
        for (int i = 0; i < rankNames.length; i++) {
            String medal = "";
            if (i == 0) medal = "🥇";
            else if (i == 1) medal = "🥈";
            else if (i == 2) medal = "🥉";

            System.out.printf("%2d. %-10s %3d %s\n",
                (i + 1), rankNames[i], rankScores[i], medal);
        }
        System.out.println();

        // ===== PASS/FAIL SUMMARY =====
        System.out.println("═══ PASS/FAIL SUMMARY ═══");

        int passingScore = 70;
        int passed = 0;
        int failed = 0;

        System.out.println("Passing Score: " + passingScore);
        System.out.println();

        for (int i = 0; i < students.length; i++) {
            if (scores[i] >= passingScore) {
                passed++;
            } else {
                System.out.println("⚠️  " + students[i] + " needs help (score: " + scores[i] + ")");
                failed++;
            }
        }

        System.out.println();
        System.out.println("Passed: " + passed + " (" +
            String.format("%.1f", passed * 100.0 / students.length) + "%)");
        System.out.println("Failed: " + failed + " (" +
            String.format("%.1f", failed * 100.0 / students.length) + "%)");

        System.out.println();
        System.out.println("════════════════════════════════════");
        System.out.println("     Analysis Complete");
        System.out.println("════════════════════════════════════");
    }
}
```

**Expected Output:** (Partial)
```
╔════════════════════════════════════╗
║      STUDENT GRADE ANALYZER       ║
╚════════════════════════════════════╝

Class Size: 8 students

═══ STUDENT SCORES ═══
Alice     :  88
Bob       :  92
Charlie   :  76
Diana     :  95
Eve       :  85
Frank     :  72
Grace     :  90
Henry     :  83

═══ STATISTICS ═══
Total Points: 681
Average: 85.12
Highest: 95 (Diana)
Lowest: 72 (Frank)
Range: 23 points

═══ GRADE DISTRIBUTION ═══
A (90-100): 3 students
B (80-89):  3 students
C (70-79):  2 students
D (60-69):  0 students
F (0-59):   0 students

═══ PERFORMANCE ANALYSIS ═══
Class Average: 85.12

Above Average:
  Bob       :  92 (+6.9)
  Diana     :  95 (+9.9)
  Alice     :  88 (+2.9)
  Grace     :  90 (+4.9)

Below Average:
  Charlie   :  76 (-9.1)
  Frank     :  72 (-13.1)
  Henry     :  83 (-2.1)

At Average:

═══ CLASS RANKING ═══
 1. Diana      95 🥇
 2. Bob        92 🥈
 3. Grace      90 🥉
 4. Alice      88
 5. Eve        85
 6. Henry      83
 7. Charlie    76
 8. Frank      72

═══ PASS/FAIL SUMMARY ═══
Passing Score: 70

Passed: 8 (100.0%)
Failed: 0 (0.0%)

════════════════════════════════════
     Analysis Complete
════════════════════════════════════
```

**💡 Key Concepts Demonstrated:**
1. **Parallel arrays** - Related data in separate arrays
2. **Statistical calculations** - Sum, average, min, max
3. **Counting and categorizing** - Grade distribution
4. **Sorting** - Bubble sort algorithm
5. **Formatting output** - printf for aligned columns

**✅ Success Criteria:**
- Comprehensive array operations
- Real-world data analysis
- Professional output formatting
- Multiple parallel operations

---

**✅ Day 6 Complete!**

You've learned:
- ✅ Creating and initializing arrays
- ✅ Accessing and modifying elements
- ✅ Looping through arrays (for and for-each)
- ✅ Searching arrays (linear search)
- ✅ Copying, reversing, transforming arrays
- ✅ Real-world application (grade analyzer)

**🎯 Before moving to Day 7:**
- [ ] Understand zero-based indexing
- [ ] Can create arrays multiple ways
- [ ] Comfortable with both loop types
- [ ] Can search and find elements
- [ ] Know how to properly copy arrays
- [ ] Built a complete data analysis tool

### Day 7: Arrays Advanced

---

#### Exercise 1: Two-Dimensional Arrays (2D Arrays) (15 minutes)

**What you'll learn:** Working with arrays of arrays (tables/grids)

**Create new class: `TwoDimensionalArrays`**

**Concept:** A 2D array is like a table with rows and columns. Think of a spreadsheet or a chess board.

**Step-by-Step:**

```java
public class TwoDimensionalArrays {
    public static void main(String[] args) {
        System.out.println("===== 2D ARRAYS =====\n");

        // ===== CREATING 2D ARRAYS =====
        System.out.println("--- Creating 2D Arrays ---\n");

        // Method 1: Declare and create empty
        int[][] matrix1 = new int[3][4];  // 3 rows, 4 columns
        System.out.println("Created 3×4 matrix (all zeros)");
        System.out.println("Rows: " + matrix1.length);
        System.out.println("Columns in first row: " + matrix1[0].length);
        System.out.println();

        // Method 2: Create with values
        int[][] matrix2 = {
            {1, 2, 3},      // Row 0
            {4, 5, 6},      // Row 1
            {7, 8, 9}       // Row 2
        };

        System.out.println("Created 3×3 matrix with values:");
        for (int i = 0; i < matrix2.length; i++) {
            for (int j = 0; j < matrix2[i].length; j++) {
                System.out.print(matrix2[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println();

        // ===== ACCESSING ELEMENTS =====
        System.out.println("--- Accessing Elements ---\n");

        System.out.println("Matrix:");
        System.out.println("   Col 0  Col 1  Col 2");
        for (int i = 0; i < matrix2.length; i++) {
            System.out.print("Row " + i + ": ");
            for (int j = 0; j < matrix2[i].length; j++) {
                System.out.printf("%4d  ", matrix2[i][j]);
            }
            System.out.println();
        }
        System.out.println();

        System.out.println("matrix[0][0] = " + matrix2[0][0] + " (top-left)");
        System.out.println("matrix[0][2] = " + matrix2[0][2] + " (top-right)");
        System.out.println("matrix[1][1] = " + matrix2[1][1] + " (center)");
        System.out.println("matrix[2][0] = " + matrix2[2][0] + " (bottom-left)");
        System.out.println("matrix[2][2] = " + matrix2[2][2] + " (bottom-right)");
        System.out.println();

        // ===== FILLING A 2D ARRAY =====
        System.out.println("--- Filling a 2D Array ---\n");

        int[][] numbers = new int[4][5];  // 4 rows, 5 columns

        int value = 1;
        for (int row = 0; row < numbers.length; row++) {
            for (int col = 0; col < numbers[row].length; col++) {
                numbers[row][col] = value;
                value++;
            }
        }

        System.out.println("4×5 matrix filled with 1-20:");
        for (int row = 0; row < numbers.length; row++) {
            for (int col = 0; col < numbers[row].length; col++) {
                System.out.printf("%3d ", numbers[row][col]);
            }
            System.out.println();
        }
        System.out.println();

        // ===== SUM OF ALL ELEMENTS =====
        System.out.println("--- Sum of All Elements ---\n");

        int sum = 0;
        for (int row = 0; row < numbers.length; row++) {
            for (int col = 0; col < numbers[row].length; col++) {
                sum += numbers[row][col];
            }
        }

        System.out.println("Total sum: " + sum);
        System.out.println();

        System.out.println("========================");
    }
}
```

**Expected Output:**
```
===== 2D ARRAYS =====

--- Creating 2D Arrays ---

Created 3×4 matrix (all zeros)
Rows: 3
Columns in first row: 4

Created 3×3 matrix with values:
1 2 3
4 5 6
7 8 9

--- Accessing Elements ---

Matrix:
   Col 0  Col 1  Col 2
Row 0:    1     2     3
Row 1:    4     5     6
Row 2:    7     8     9

matrix[0][0] = 1 (top-left)
matrix[0][2] = 3 (top-right)
matrix[1][1] = 5 (center)
matrix[2][0] = 7 (bottom-left)
matrix[2][2] = 9 (bottom-right)

--- Filling a 2D Array ---

4×5 matrix filled with 1-20:
  1   2   3   4   5
  6   7   8   9  10
 11  12  13  14  15
 16  17  18  19  20

--- Sum of All Elements ---

Total sum: 210

========================
```

**💡 2D Array Basics:**

**Declaration:**
```java
// Declare
int[][] matrix;

// Create
matrix = new int[rows][columns];

// Or both together
int[][] matrix = new int[3][4];  // 3 rows, 4 columns

// With values
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};
```

**Accessing:**
```java
// Get element
int value = matrix[row][column];

// Set element
matrix[row][column] = value;

// Number of rows
int numRows = matrix.length;

// Number of columns (in first row)
int numCols = matrix[0].length;
```

**Looping:**
```java
// Nested loop
for (int i = 0; i < matrix.length; i++) {           // Rows
    for (int j = 0; j < matrix[i].length; j++) {    // Columns
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println();
}

// Enhanced for
for (int[] row : matrix) {      // Each row
    for (int value : row) {      // Each value in row
        System.out.print(value + " ");
    }
    System.out.println();
}
```

**✅ Success Criteria:**
- Understand [row][column] notation
- Can create 2D arrays
- Know how to loop through rows and columns
- Can access individual elements

---

#### Exercise 2: Practical 2D Arrays - Seating Chart (20 minutes)

**What you'll learn:** Real-world application of 2D arrays

**Create new class: `SeatingChart`**

```java
public class SeatingChart {
    public static void main(String[] args) {
        System.out.println("╔═════════════════════════════╗");
        System.out.println("║   MOVIE THEATER SEATING    ║");
        System.out.println("╚═════════════════════════════╝");
        System.out.println();

        // Create seating chart: 6 rows, 8 seats per row
        // 0 = available, 1 = booked
        int[][] seats = new int[6][8];

        // Some seats already booked
        seats[0][3] = 1;  // Row A, Seat 4
        seats[0][4] = 1;  // Row A, Seat 5
        seats[2][2] = 1;  // Row C, Seat 3
        seats[2][3] = 1;  // Row C, Seat 4
        seats[2][4] = 1;  // Row C, Seat 5
        seats[3][5] = 1;  // Row D, Seat 6
        seats[4][1] = 1;  // Row E, Seat 2
        seats[5][6] = 1;  // Row F, Seat 7

        // ===== DISPLAY SEATING CHART =====
        System.out.println("═══ CURRENT SEATING ═══");
        System.out.println();
        System.out.println("        SCREEN");
        System.out.println("  ━━━━━━━━━━━━━━━━━━━━");
        System.out.println();
        System.out.print("    ");
        for (int i = 1; i <= 8; i++) {
            System.out.print(" " + i + " ");
        }
        System.out.println();

        char rowLabel = 'A';
        for (int row = 0; row < seats.length; row++) {
            System.out.print(" " + rowLabel + " ");

            for (int col = 0; col < seats[row].length; col++) {
                if (seats[row][col] == 0) {
                    System.out.print(" ○ ");  // Available
                } else {
                    System.out.print(" ✖ ");  // Booked
                }
            }

            System.out.println();
            rowLabel++;
        }
        System.out.println();
        System.out.println("○ = Available  ✖ = Booked");
        System.out.println();

        // ===== STATISTICS =====
        System.out.println("═══ STATISTICS ═══");

        int totalSeats = seats.length * seats[0].length;
        int bookedSeats = 0;

        for (int row = 0; row < seats.length; row++) {
            for (int col = 0; col < seats[row].length; col++) {
                if (seats[row][col] == 1) {
                    bookedSeats++;
                }
            }
        }

        int availableSeats = totalSeats - bookedSeats;
        double occupancyRate = (bookedSeats * 100.0) / totalSeats;

        System.out.println("Total Seats: " + totalSeats);
        System.out.println("Booked: " + bookedSeats);
        System.out.println("Available: " + availableSeats);
        System.out.printf("Occupancy: %.1f%%\n", occupancyRate);
        System.out.println();

        // ===== AVAILABILITY BY ROW =====
        System.out.println("═══ AVAILABILITY BY ROW ═══");

        rowLabel = 'A';
        for (int row = 0; row < seats.length; row++) {
            int rowBooked = 0;
            int rowAvailable = 0;

            for (int col = 0; col < seats[row].length; col++) {
                if (seats[row][col] == 1) {
                    rowBooked++;
                } else {
                    rowAvailable++;
                }
            }

            System.out.printf("Row %c: %d available, %d booked\n",
                rowLabel, rowAvailable, rowBooked);
            rowLabel++;
        }
        System.out.println();

        // ===== FIND BEST AVAILABLE SEATS =====
        System.out.println("═══ BEST AVAILABLE SEATS ═══");
        System.out.println("(Looking for 2 adjacent seats)");
        System.out.println();

        boolean found = false;
        rowLabel = 'A';

        for (int row = 0; row < seats.length; row++) {
            for (int col = 0; col < seats[row].length - 1; col++) {
                // Check if current and next seat are available
                if (seats[row][col] == 0 && seats[row][col + 1] == 0) {
                    System.out.println("✓ Row " + rowLabel + ", Seats " +
                        (col + 1) + "-" + (col + 2));
                    found = true;
                    break;  // Found one in this row
                }
            }
            if (found && row < 3) break;  // Stop after first good row (front rows preferred)
            rowLabel++;
        }

        if (!found) {
            System.out.println("No adjacent seats available");
        }
        System.out.println();

        System.out.println("═════════════════════════════");
    }
}
```

**Expected Output:**
```
╔═════════════════════════════╗
║   MOVIE THEATER SEATING    ║
╚═════════════════════════════╝

═══ CURRENT SEATING ═══

        SCREEN
  ━━━━━━━━━━━━━━━━━━━━

     1  2  3  4  5  6  7  8
 A  ○  ○  ○  ✖  ✖  ○  ○  ○
 B  ○  ○  ○  ○  ○  ○  ○  ○
 C  ○  ○  ✖  ✖  ✖  ○  ○  ○
 D  ○  ○  ○  ○  ○  ✖  ○  ○
 E  ○  ✖  ○  ○  ○  ○  ○  ○
 F  ○  ○  ○  ○  ○  ○  ✖  ○

○ = Available  ✖ = Booked

═══ STATISTICS ═══
Total Seats: 48
Booked: 8
Available: 40
Occupancy: 16.7%

═══ AVAILABILITY BY ROW ═══
Row A: 6 available, 2 booked
Row B: 8 available, 0 booked
Row C: 5 available, 3 booked
Row D: 7 available, 1 booked
Row E: 7 available, 1 booked
Row F: 7 available, 1 booked

═══ BEST AVAILABLE SEATS ═══
(Looking for 2 adjacent seats)

✓ Row A, Seats 1-2

═════════════════════════════
```

**💡 Real-World 2D Array Use Cases:**
1. **Seating charts** (theaters, planes)
2. **Game boards** (chess, tic-tac-toe)
3. **Spreadsheets** (rows and columns)
4. **Images** (pixels in grid)
5. **Maps** (tile-based games)

**✅ Success Criteria:**
- Applied 2D arrays to real problem
- Can visualize data as grid
- Understand row/column traversal
- Can find patterns in 2D data

---

#### Exercise 3: Jagged Arrays (15 minutes)

**What you'll learn:** Arrays with different row lengths

**Create new class: `JaggedArrays`**

```java
public class JaggedArrays {
    public static void main(String[] args) {
        System.out.println("===== JAGGED ARRAYS =====\n");

        // ===== CREATING JAGGED ARRAYS =====
        System.out.println("--- What is a Jagged Array? ---\n");

        // Regular 2D array: All rows same length
        int[][] regular = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("Regular 2D Array (3×3):");
        for (int[] row : regular) {
            for (int num : row) {
                System.out.print(num + " ");
            }
            System.out.println();
        }
        System.out.println();

        // Jagged array: Rows can have different lengths!
        int[][] jagged = {
            {1},              // Row 0: 1 element
            {2, 3},           // Row 1: 2 elements
            {4, 5, 6},        // Row 2: 3 elements
            {7, 8, 9, 10}     // Row 3: 4 elements
        };

        System.out.println("Jagged Array (different row lengths):");
        for (int i = 0; i < jagged.length; i++) {
            System.out.print("Row " + i + " (" + jagged[i].length + " elements): ");
            for (int j = 0; j < jagged[i].length; j++) {
                System.out.print(jagged[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println();

        // ===== PRACTICAL EXAMPLE: CLASS GRADES =====
        System.out.println("--- Example: Student Test Scores ---\n");

        // Each student took different number of tests
        int[][] scores = {
            {85, 90, 88},              // Student 0: 3 tests
            {92, 87},                  // Student 1: 2 tests
            {78, 82, 85, 90},          // Student 2: 4 tests
            {95}                       // Student 3: 1 test
        };

        String[] students = {"Alice", "Bob", "Charlie", "Diana"};

        System.out.println("Student Test Scores:");
        System.out.println();

        for (int i = 0; i < scores.length; i++) {
            System.out.print(students[i] + ": ");

            // Print all scores
            for (int j = 0; j < scores[i].length; j++) {
                System.out.print(scores[i][j]);
                if (j < scores[i].length - 1) {
                    System.out.print(", ");
                }
            }

            // Calculate average
            int sum = 0;
            for (int score : scores[i]) {
                sum += score;
            }
            double average = (double) sum / scores[i].length;

            System.out.printf(" → Avg: %.1f", average);
            System.out.println(" (" + scores[i].length + " tests)");
        }
        System.out.println();

        // ===== CREATING JAGGED ARRAY DYNAMICALLY =====
        System.out.println("--- Creating Jagged Array Step by Step ---\n");

        // Create array of 4 rows
        int[][] triangle = new int[4][];

        // Create each row with different length
        for (int i = 0; i < triangle.length; i++) {
            triangle[i] = new int[i + 1];  // Row i has i+1 elements

            // Fill with values
            for (int j = 0; j < triangle[i].length; j++) {
                triangle[i][j] = (i + 1) * (j + 1);
            }
        }

        System.out.println("Triangle pattern:");
        for (int i = 0; i < triangle.length; i++) {
            for (int j = 0; j < triangle[i].length; j++) {
                System.out.printf("%3d ", triangle[i][j]);
            }
            System.out.println();
        }
        System.out.println();

        // ===== MONTHLY EXPENSES EXAMPLE =====
        System.out.println("--- Example: Monthly Expenses ---\n");

        // Each month has different number of expense entries
        double[][] expenses = {
            {50.25, 30.00, 75.50},                    // January: 3 expenses
            {100.00, 25.75, 60.00, 15.50},           // February: 4 expenses
            {80.00, 45.25},                          // March: 2 expenses
            {120.00, 95.50, 30.00, 55.00, 70.25}    // April: 5 expenses
        };

        String[] months = {"January", "February", "March", "April"};

        System.out.println("Monthly Expense Summary:");
        System.out.println();

        double yearTotal = 0;

        for (int i = 0; i < expenses.length; i++) {
            double monthTotal = 0;

            for (double expense : expenses[i]) {
                monthTotal += expense;
            }

            yearTotal += monthTotal;

            System.out.printf("%-10s: $%7.2f (%d expenses)\n",
                months[i], monthTotal, expenses[i].length);
        }

        System.out.println("─────────────────────────────");
        System.out.printf("Year Total: $%7.2f\n", yearTotal);
        System.out.printf("Average/Month: $%.2f\n", yearTotal / months.length);

        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== JAGGED ARRAYS =====

--- What is a Jagged Array? ---

Regular 2D Array (3×3):
1 2 3
4 5 6
7 8 9

Jagged Array (different row lengths):
Row 0 (1 elements): 1
Row 1 (2 elements): 2 3
Row 2 (3 elements): 4 5 6
Row 3 (4 elements): 7 8 9 10

--- Example: Student Test Scores ---

Student Test Scores:

Alice: 85, 90, 88 → Avg: 87.7 (3 tests)
Bob: 92, 87 → Avg: 89.5 (2 tests)
Charlie: 78, 82, 85, 90 → Avg: 83.8 (4 tests)
Diana: 95 → Avg: 95.0 (1 test)

--- Creating Jagged Array Step by Step ---

Triangle pattern:
  1
  2   4
  3   6   9
  4   8  12  16

--- Example: Monthly Expenses ---

Monthly Expense Summary:

January  : $ 155.75 (3 expenses)
February : $ 201.25 (4 expenses)
March    : $ 125.25 (2 expenses)
April    : $ 370.75 (5 expenses)
─────────────────────────────
Year Total: $ 853.00
Average/Month: $213.25

============================
```

**💡 Jagged Arrays:**

**Key Difference:**
```java
// Regular 2D: All rows same length
int[][] regular = new int[3][4];  // 3 rows, each with 4 columns

// Jagged: Each row can be different length
int[][] jagged = new int[3][];   // 3 rows, lengths not specified yet
jagged[0] = new int[2];          // Row 0: 2 elements
jagged[1] = new int[5];          // Row 1: 5 elements
jagged[2] = new int[3];          // Row 2: 3 elements
```

**When to Use:**
- Data naturally has varying lengths
- Want to save memory
- Real-world data (different number of items per category)

**✅ Success Criteria:**
- Understand jagged vs regular 2D arrays
- Can create jagged arrays
- Know when rows can have different lengths
- Can handle varying row lengths safely

---

#### Exercise 4: Array Algorithms - Sorting (20 minutes)

**What you'll learn:** Bubble Sort algorithm

**Create new class: `BubbleSort`**

```java
public class BubbleSort {
    public static void main(String[] args) {
        System.out.println("===== BUBBLE SORT ALGORITHM =====\n");

        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original array:");
        printArray(numbers);
        System.out.println();

        // ===== BUBBLE SORT STEP BY STEP =====
        System.out.println("--- Bubble Sort Process ---\n");

        int n = numbers.length;
        int passCount = 0;

        // Outer loop: Number of passes
        for (int i = 0; i < n - 1; i++) {
            passCount++;
            System.out.println("Pass " + passCount + ":");

            boolean swapped = false;

            // Inner loop: Compare adjacent elements
            for (int j = 0; j < n - 1 - i; j++) {
                System.out.print("  Compare " + numbers[j] + " and " + numbers[j + 1]);

                if (numbers[j] > numbers[j + 1]) {
                    // Swap
                    int temp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = temp;

                    swapped = true;
                    System.out.println(" → Swap!");
                } else {
                    System.out.println(" → No swap");
                }
            }

            System.out.print("  After pass " + passCount + ": ");
            printArray(numbers);
            System.out.println();

            // Optimization: If no swaps, array is sorted
            if (!swapped) {
                System.out.println("  No swaps needed - Array is sorted!");
                break;
            }
        }

        System.out.println("Final sorted array:");
        printArray(numbers);
        System.out.println();

        // ===== SORTING DIFFERENT DATA =====
        System.out.println("--- Sorting Names Alphabetically ---\n");

        String[] names = {"Diana", "Alice", "Charlie", "Bob", "Eve"};

        System.out.println("Before:");
        printStringArray(names);

        bubbleSortStrings(names);

        System.out.println("\nAfter:");
        printStringArray(names);
        System.out.println();

        // ===== DESCENDING ORDER =====
        System.out.println("--- Sorting in Descending Order ---\n");

        int[] scores = {85, 92, 78, 95, 88};

        System.out.println("Before:");
        printArray(scores);

        bubbleSortDescending(scores);

        System.out.println("\nAfter (highest first):");
        printArray(scores);

        System.out.println("\n==================================");
    }

    // Helper method to print int array
    static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    // Helper method to print String array
    static void printStringArray(String[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    // Sort strings alphabetically
    static void bubbleSortStrings(String[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j].compareTo(arr[j + 1]) > 0) {
                    String temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // Sort in descending order
    static void bubbleSortDescending(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] < arr[j + 1]) {  // Note: < instead of >
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}
```

**Expected Output:** (Partial)
```
===== BUBBLE SORT ALGORITHM =====

Original array:
[64, 34, 25, 12, 22, 11, 90]

--- Bubble Sort Process ---

Pass 1:
  Compare 64 and 34 → Swap!
  Compare 64 and 25 → Swap!
  Compare 64 and 12 → Swap!
  Compare 64 and 22 → Swap!
  Compare 64 and 11 → Swap!
  Compare 64 and 90 → No swap
  After pass 1: [34, 25, 12, 22, 11, 64, 90]

Pass 2:
  Compare 34 and 25 → Swap!
  Compare 34 and 12 → Swap!
  Compare 34 and 22 → Swap!
  Compare 34 and 11 → Swap!
  Compare 34 and 64 → No swap
  After pass 2: [25, 12, 22, 11, 34, 64, 90]

...

Final sorted array:
[11, 12, 22, 25, 34, 64, 90]

--- Sorting Names Alphabetically ---

Before:
[Diana, Alice, Charlie, Bob, Eve]

After:
[Alice, Bob, Charlie, Diana, Eve]

--- Sorting in Descending Order ---

Before:
[85, 92, 78, 95, 88]

After (highest first):
[95, 92, 88, 85, 78]

==================================
```

**💡 Bubble Sort Algorithm:**

**How it works:**
1. Compare adjacent elements
2. Swap if in wrong order
3. Repeat until sorted

**Pseudocode:**
```
for each pass:
    for each pair of adjacent elements:
        if first > second:
            swap them
```

**Visualization:**
```
[64, 34, 25, 12]  Start
[34, 64, 25, 12]  Swap 64 and 34
[34, 25, 64, 12]  Swap 64 and 25
[34, 25, 12, 64]  Swap 64 and 12
...continue until sorted
```

**Time Complexity:**
- Best case: O(n) if already sorted
- Worst case: O(n²)
- Not efficient for large arrays!

**✅ Success Criteria:**
- Understand bubble sort algorithm
- Can implement basic sorting
- Know when elements swap
- Can sort different data types

---

#### Exercise 5: Real-World Application - Tic-Tac-Toe Game (25 minutes)

**What you'll learn:** Complete game using 2D arrays

**Create new class: `TicTacToe`**

```java
public class TicTacToe {
    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════╗");
        System.out.println("║     TIC-TAC-TOE GAME     ║");
        System.out.println("╚═══════════════════════════╝");
        System.out.println();

        // Create 3×3 board
        char[][] board = {
            {' ', ' ', ' '},
            {' ', ' ', ' '},
            {' ', ' ', ' '}
        };

        // Simulate a game
        System.out.println("Simulating a game...\n");

        // Move 1: X at center
        board[1][1] = 'X';
        System.out.println("Move 1: X plays center");
        displayBoard(board);

        // Move 2: O at top-left
        board[0][0] = 'O';
        System.out.println("Move 2: O plays top-left");
        displayBoard(board);

        // Move 3: X at top-center
        board[0][1] = 'X';
        System.out.println("Move 3: X plays top-center");
        displayBoard(board);

        // Move 4: O at bottom-left
        board[2][0] = 'O';
        System.out.println("Move 4: O plays bottom-left");
        displayBoard(board);

        // Move 5: X at bottom-center
        board[2][1] = 'X';
        System.out.println("Move 5: X plays bottom-center");
        displayBoard(board);

        // Check for winner
        char winner = checkWinner(board);
        if (winner != ' ') {
            System.out.println("🎉 " + winner + " WINS!");
        }
        System.out.println();

        // ===== GAME ANALYSIS =====
        System.out.println("═══ GAME ANALYSIS ═══\n");

        int xCount = 0, oCount = 0, emptyCount = 0;

        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 3; col++) {
                if (board[row][col] == 'X') xCount++;
                else if (board[row][col] == 'O') oCount++;
                else emptyCount++;
            }
        }

        System.out.println("X pieces: " + xCount);
        System.out.println("O pieces: " + oCount);
        System.out.println("Empty spaces: " + emptyCount);
        System.out.println();

        // Check each row, column, diagonal
        System.out.println("Row analysis:");
        for (int i = 0; i < 3; i++) {
            System.out.println("  Row " + i + ": " +
                board[i][0] + " " + board[i][1] + " " + board[i][2]);
        }
        System.out.println();

        System.out.println("Column analysis:");
        for (int i = 0; i < 3; i++) {
            System.out.println("  Col " + i + ": " +
                board[0][i] + " " + board[1][i] + " " + board[2][i]);
        }
        System.out.println();

        System.out.println("Diagonal analysis:");
        System.out.println("  Main diagonal: " +
            board[0][0] + " " + board[1][1] + " " + board[2][2]);
        System.out.println("  Anti-diagonal: " +
            board[0][2] + " " + board[1][2] + " " + board[2][0]);

        System.out.println("\n═══════════════════════════");
    }

    // Display the board
    static void displayBoard(char[][] board) {
        System.out.println();
        System.out.println("     0   1   2");
        System.out.println("   ┌───┬───┬───┐");
        for (int i = 0; i < 3; i++) {
            System.out.print(" " + i + " │");
            for (int j = 0; j < 3; j++) {
                System.out.print(" " + board[i][j] + " │");
            }
            System.out.println();
            if (i < 2) {
                System.out.println("   ├───┼───┼───┤");
            }
        }
        System.out.println("   └───┴───┴───┘");
        System.out.println();
    }

    // Check for winner
    static char checkWinner(char[][] board) {
        // Check rows
        for (int i = 0; i < 3; i++) {
            if (board[i][0] != ' ' &&
                board[i][0] == board[i][1] &&
                board[i][1] == board[i][2]) {
                return board[i][0];
            }
        }

        // Check columns
        for (int i = 0; i < 3; i++) {
            if (board[0][i] != ' ' &&
                board[0][i] == board[1][i] &&
                board[1][i] == board[2][i]) {
                return board[0][i];
            }
        }

        // Check main diagonal
        if (board[0][0] != ' ' &&
            board[0][0] == board[1][1] &&
            board[1][1] == board[2][2]) {
            return board[0][0];
        }

        // Check anti-diagonal
        if (board[0][2] != ' ' &&
            board[0][2] == board[1][1] &&
            board[1][1] == board[2][0]) {
            return board[0][2];
        }

        return ' ';  // No winner
    }
}
```

**Expected Output:** (Partial)
```
╔═══════════════════════════╗
║     TIC-TAC-TOE GAME     ║
╚═══════════════════════════╝

Simulating a game...

Move 1: X plays center

     0   1   2
   ┌───┬───┬───┐
 0 │   │   │   │
   ├───┼───┼───┤
 1 │   │ X │   │
   ├───┼───┼───┤
 2 │   │   │   │
   └───┴───┴───┘

Move 2: O plays top-left

     0   1   2
   ┌───┬───┬───┐
 0 │ O │   │   │
   ├───┼───┼───┤
 1 │   │ X │   │
   ├───┼───┼───┤
 2 │   │   │   │
   └───┴───┴───┘

...

Move 5: X plays bottom-center

     0   1   2
   ┌───┬───┬───┐
 0 │ O │ X │   │
   ├───┼───┼───┤
 1 │   │ X │   │
   ├───┼───┼───┤
 2 │ O │ X │   │
   └───┴───┴───┘

🎉 X WINS!

═══ GAME ANALYSIS ═══

X pieces: 3
O pieces: 2
Empty spaces: 4

Row analysis:
  Row 0: O X
  Row 1:   X
  Row 2: O X

Column analysis:
  Col 0: O   O
  Col 1: X X X
  Col 2:

Diagonal analysis:
  Main diagonal: O X
  Anti-diagonal:     O

═══════════════════════════
```

**💡 Key Concepts:**
1. **2D array as game board**
2. **Checking win conditions** (rows, columns, diagonals)
3. **Grid visualization**
4. **Game state tracking**

**✅ Success Criteria:**
- Complete working game
- Proper use of 2D arrays
- Win detection logic
- Professional board display

---

**✅ Day 7 Complete! Week 1 FINISHED! 🎉**

You've learned:
- ✅ Two-dimensional arrays (2D arrays)
- ✅ Practical applications (seating charts)
- ✅ Jagged arrays (variable row lengths)
- ✅ Bubble sort algorithm
- ✅ Real-world application (Tic-Tac-Toe)

**🏆 Week 1 Achievement:**
- [ ] Master all array operations
- [ ] Understand multi-dimensional data structures
- [ ] Know basic sorting algorithms
- [ ] Built multiple complete applications
- [ ] Ready for Week 2 (Methods & OOP)!

---

## 📌 Pattern for All Exercises:

Every exercise includes:
1. ✅ **Clear title** - What you're building
2. ✅ **Learning objective** - What you'll learn
3. ✅ **Step-by-step instructions** - Exactly what to type
4. ✅ **Complete code** - Full working example
5. ✅ **Expected output** - What you should see
6. ✅ **Key concepts** - What to remember
7. ✅ **Common mistakes** - What to avoid
8. ✅ **Success criteria** - How to know you're done
9. ✅ **Challenges** - Extra practice ideas

---

**CONGRATULATIONS! You've completed Week 1 of Core Java!** 🎊

Ready for Week 2? You'll learn about Methods, OOP Concepts, and much more!

---

## Week 2: Object-Oriented Programming Fundamentals

### Day 8: Methods/Functions

---

#### Exercise 1: Your First Method (10 minutes)

**What you'll learn:** Creating and calling methods

**Create new class: `FirstMethod`**

**Concept:** A method is a block of code that performs a specific task. Think of it as a mini-program inside your program. Methods help organize code and avoid repetition.

**Step-by-Step:**

```java
public class FirstMethod {
    public static void main(String[] args) {
        System.out.println("===== YOUR FIRST METHOD =====\n");

        // Call the method
        System.out.println("Before calling method");
        greet();
        System.out.println("After calling method\n");

        // Call it multiple times
        System.out.println("Calling method 3 times:");
        greet();
        greet();
        greet();

        System.out.println("\n============================");
    }

    // Define a method
    // Format: [access] [static] [return-type] [name]() { }
    public static void greet() {
        System.out.println("Hello from the greet method!");
    }
}
```

**Expected Output:**
```
===== YOUR FIRST METHOD =====

Before calling method
Hello from the greet method!
After calling method

Calling method 3 times:
Hello from the greet method!
Hello from the greet method!
Hello from the greet method!

============================
```

**💡 Method Structure:**

```java
public static void methodName() {
    // Method body - code to execute
}

// Breaking it down:
// public    - can be called from anywhere
// static    - belongs to the class (required for now)
// void      - returns nothing
// methodName - name of the method (use camelCase)
// ()        - parameters go here (empty for now)
// { }       - method body
```

**How Methods Work:**
1. **Define** the method (write what it does)
2. **Call** the method (execute it) using `methodName();`
3. Program jumps to method, executes code, returns to caller

**Key Rules:**
- Method name should describe what it does
- Use camelCase: `printMessage`, `calculateSum`, `checkAge`
- Method must be defined inside a class
- Methods can be called multiple times

**✅ Success Criteria:**
- Understand method definition vs method call
- Can create a simple method
- Know how to call a method
- Understand execution flow

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `greet;` | Missing parentheses | `greet();` |
| Calling before defining | Java reads top to bottom in main | Define method after main |
| Forgetting `static` | Non-static can't be called from static main | Use `static` keyword |

**🎯 Challenge:**
1. Create a method called `printLine()` that prints "================="
2. Create a method called `showMenu()` that prints a menu
3. Call these methods from main

---

#### Exercise 2: Methods with Parameters (15 minutes)

**What you'll learn:** Passing data to methods

**Create new class: `MethodsWithParameters`**

```java
public class MethodsWithParameters {
    public static void main(String[] args) {
        System.out.println("===== METHODS WITH PARAMETERS =====\n");

        // ===== EXAMPLE 1: Single Parameter =====
        System.out.println("--- Example 1: Greet by Name ---");

        greetPerson("Alice");
        greetPerson("Bob");
        greetPerson("Charlie");
        System.out.println();

        // ===== EXAMPLE 2: Multiple Parameters =====
        System.out.println("--- Example 2: Multiple Parameters ---");

        printSum(10, 20);
        printSum(5, 15);
        printSum(100, 250);
        System.out.println();

        // ===== EXAMPLE 3: Different Data Types =====
        System.out.println("--- Example 3: Different Data Types ---");

        printStudentInfo("Diana", 20, 85.5);
        printStudentInfo("Eve", 22, 92.0);
        System.out.println();

        // ===== EXAMPLE 4: Using Variables =====
        System.out.println("--- Example 4: Passing Variables ---");

        String myName = "Frank";
        int myAge = 25;

        greetPerson(myName);
        printAge(myAge);

        System.out.println("\n===================================");
    }

    // Method with one parameter
    public static void greetPerson(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // Method with two parameters
    public static void printSum(int num1, int num2) {
        int sum = num1 + num2;
        System.out.println(num1 + " + " + num2 + " = " + sum);
    }

    // Method with three parameters of different types
    public static void printStudentInfo(String name, int age, double grade) {
        System.out.println("Student: " + name);
        System.out.println("  Age: " + age);
        System.out.println("  Grade: " + grade);
    }

    // Another single parameter method
    public static void printAge(int age) {
        System.out.println("Age: " + age + " years old");
    }
}
```

**Expected Output:**
```
===== METHODS WITH PARAMETERS =====

--- Example 1: Greet by Name ---
Hello, Alice!
Hello, Bob!
Hello, Charlie!

--- Example 2: Multiple Parameters ---
10 + 20 = 30
5 + 15 = 20
100 + 250 = 350

--- Example 3: Different Data Types ---
Student: Diana
  Age: 20
  Grade: 85.5
Student: Eve
  Age: 22
  Grade: 92.0

--- Example 4: Passing Variables ---
Hello, Frank!
Age: 25 years old

===================================
```

**💡 Parameters Explained:**

```java
public static void methodName(dataType paramName) {
    // Use paramName here
}

// Multiple parameters - separate with commas
public static void methodName(type1 param1, type2 param2) {
    // Use param1 and param2 here
}
```

**How Parameters Work:**
1. **Parameters** = Variables that receive values
2. **Arguments** = Actual values you pass
3. Parameters act like local variables inside the method

```java
// Definition with parameters
public static void greet(String name) {  // name is parameter
    System.out.println("Hello, " + name);
}

// Calling with arguments
greet("Alice");  // "Alice" is argument
```

**Parameter Rules:**
- Must specify data type for each parameter
- Can have multiple parameters (separate with comma)
- Parameters only exist inside the method
- Order matters! First argument → first parameter

**✅ Success Criteria:**
- Can pass values to methods
- Understand parameters vs arguments
- Can use multiple parameters
- Know parameters are local to method

**🎯 Challenge:**
1. Create `printRectangle(int width, int height)` that prints rectangle info
2. Create `calculateArea(double length, double width)` that prints area
3. Create `printFullName(String first, String last)` that prints full name

---

#### Exercise 3: Methods with Return Values (20 minutes)

**What you'll learn:** Getting results back from methods

**Create new class: `MethodsWithReturn`**

```java
public class MethodsWithReturn {
    public static void main(String[] args) {
        System.out.println("===== METHODS WITH RETURN VALUES =====\n");

        // ===== EXAMPLE 1: Simple Return =====
        System.out.println("--- Example 1: Return Integer ---");

        int result = add(10, 20);
        System.out.println("10 + 20 = " + result);

        // Can use return value directly
        System.out.println("5 + 15 = " + add(5, 15));
        System.out.println();

        // ===== EXAMPLE 2: Return Different Types =====
        System.out.println("--- Example 2: Different Return Types ---");

        double average = calculateAverage(80, 90, 75);
        System.out.println("Average: " + average);

        boolean passed = isPassing(65);
        System.out.println("Score 65 passing? " + passed);

        String grade = getGrade(85);
        System.out.println("Grade for 85: " + grade);
        System.out.println();

        // ===== EXAMPLE 3: Using Return in Calculations =====
        System.out.println("--- Example 3: Using Return Values ---");

        int num1 = 10;
        int num2 = 5;

        int sum = add(num1, num2);
        int difference = subtract(num1, num2);
        int product = multiply(num1, num2);
        int quotient = divide(num1, num2);

        System.out.println(num1 + " + " + num2 + " = " + sum);
        System.out.println(num1 + " - " + num2 + " = " + difference);
        System.out.println(num1 + " * " + num2 + " = " + product);
        System.out.println(num1 + " / " + num2 + " = " + quotient);
        System.out.println();

        // ===== EXAMPLE 4: Return in Conditions =====
        System.out.println("--- Example 4: Return in Conditions ---");

        int age = 20;

        if (isAdult(age)) {
            System.out.println("Age " + age + ": You are an adult");
        } else {
            System.out.println("Age " + age + ": You are a minor");
        }

        // ===== EXAMPLE 5: Chaining Methods =====
        System.out.println("\n--- Example 5: Method Chaining ---");

        int a = 5;
        int b = 10;
        int c = 15;

        // Using return values in other method calls
        int total = add(add(a, b), c);
        System.out.println(a + " + " + b + " + " + c + " = " + total);

        System.out.println("\n======================================");
    }

    // Return integer
    public static int add(int x, int y) {
        int sum = x + y;
        return sum;  // Send back the result
    }

    public static int subtract(int x, int y) {
        return x - y;  // Can return directly
    }

    public static int multiply(int x, int y) {
        return x * y;
    }

    public static int divide(int x, int y) {
        return x / y;
    }

    // Return double
    public static double calculateAverage(int n1, int n2, int n3) {
        int sum = n1 + n2 + n3;
        return sum / 3.0;  // Return double
    }

    // Return boolean
    public static boolean isPassing(int score) {
        return score >= 40;  // Returns true or false
    }

    public static boolean isAdult(int age) {
        return age >= 18;
    }

    // Return String
    public static String getGrade(int marks) {
        if (marks >= 90) return "A";
        else if (marks >= 80) return "B";
        else if (marks >= 70) return "C";
        else if (marks >= 60) return "D";
        else return "F";
    }
}
```

**Expected Output:**
```
===== METHODS WITH RETURN VALUES =====

--- Example 1: Return Integer ---
10 + 20 = 30
5 + 15 = 20

--- Example 2: Different Return Types ---
Average: 81.66666666666667
Score 65 passing? true
Grade for 85: B

--- Example 3: Using Return Values ---
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2

--- Example 4: Return in Conditions ---
Age 20: You are an adult

--- Example 5: Method Chaining ---
5 + 10 + 15 = 30

======================================
```

**💡 Return Statement:**

```java
public static returnType methodName(parameters) {
    // Do some work
    return value;  // Must match returnType
}

// Examples:
public static int getNumber() {
    return 42;  // Returns int
}

public static String getName() {
    return "Alice";  // Returns String
}

public static boolean isValid() {
    return true;  // Returns boolean
}
```

**Key Concepts:**
1. **return** keyword sends a value back to the caller
2. Return type must match what you return
3. Method execution stops at return
4. Can use returned value in expressions

**void vs Return:**
```java
// void - no return
public static void printSum(int a, int b) {
    System.out.println(a + b);
    // No return statement needed
}

// return - gives back a value
public static int getSum(int a, int b) {
    return a + b;
    // Must return an int
}
```

**✅ Success Criteria:**
- Understand return keyword
- Know return type must match
- Can use returned values
- Understand void vs return methods

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `public static void add() { return 5; }` | void can't return value | Use `int` instead of `void` |
| `public static int add() { }` | Must return int | Add `return` statement |
| `return "hello";` in int method | Type mismatch | Return must match type |

**🎯 Challenge:**
1. Create `max(int a, int b)` that returns the larger number
2. Create `isEven(int n)` that returns true if even
3. Create `celsiusToFahrenheit(double c)` that returns converted temp

---

#### Exercise 4: Multiple Methods Working Together (20 minutes)

**What you'll learn:** Methods calling other methods

**Create new class: `MethodsWorking Together`**

```java
public class MethodsWorkingTogether {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════╗");
        System.out.println("║   STUDENT GRADE CALCULATOR    ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println();

        // Student data
        String name = "Alice";
        int test1 = 85;
        int test2 = 92;
        int test3 = 78;

        // Process student using multiple methods
        processStudent(name, test1, test2, test3);

        System.out.println("\n" + "=".repeat(34));

        // Process another student
        processStudent("Bob", 72, 68, 75);

        System.out.println("\n════════════════════════════════");
    }

    // Main processing method - coordinates other methods
    public static void processStudent(String name, int t1, int t2, int t3) {
        printHeader(name);

        int total = calculateTotal(t1, t2, t3);
        double average = calculateAverage(total, 3);
        char grade = determineGrade(average);
        boolean passed = checkPassing(average);

        printScores(t1, t2, t3);
        printResults(total, average, grade, passed);
    }

    // Print student header
    public static void printHeader(String name) {
        System.out.println("\n--- Student: " + name + " ---");
    }

    // Calculate total of three scores
    public static int calculateTotal(int score1, int score2, int score3) {
        return score1 + score2 + score3;
    }

    // Calculate average
    public static double calculateAverage(int total, int count) {
        return (double) total / count;
    }

    // Determine letter grade
    public static char determineGrade(double average) {
        if (average >= 90) return 'A';
        else if (average >= 80) return 'B';
        else if (average >= 70) return 'C';
        else if (average >= 60) return 'D';
        else return 'F';
    }

    // Check if student passed
    public static boolean checkPassing(double average) {
        return average >= 60;
    }

    // Print individual scores
    public static void printScores(int s1, int s2, int s3) {
        System.out.println("Test 1: " + s1);
        System.out.println("Test 2: " + s2);
        System.out.println("Test 3: " + s3);
    }

    // Print final results
    public static void printResults(int total, double avg, char grade, boolean passed) {
        System.out.println("\nTotal: " + total);
        System.out.printf("Average: %.2f\n", avg);
        System.out.println("Grade: " + grade);
        System.out.println("Status: " + (passed ? "PASSED ✅" : "FAILED ❌"));
    }
}
```

**Expected Output:**
```
╔════════════════════════════════╗
║   STUDENT GRADE CALCULATOR    ║
╚════════════════════════════════╝

--- Student: Alice ---
Test 1: 85
Test 2: 92
Test 3: 78

Total: 255
Average: 85.00
Grade: B
Status: PASSED ✅

==================================

--- Student: Bob ---
Test 1: 72
Test 2: 68
Test 3: 75

Total: 215
Average: 71.67
Grade: C
Status: PASSED ✅

════════════════════════════════
```

**💡 Method Collaboration:**

```
processStudent()        ← Main coordinator
    ↓
    ├─→ printHeader()
    ├─→ calculateTotal()
    ├─→ calculateAverage()
    ├─→ determineGrade()
    ├─→ checkPassing()
    ├─→ printScores()
    └─→ printResults()
```

**Benefits of Multiple Methods:**
1. **Organization** - Each method has one clear purpose
2. **Reusability** - Can call same method multiple times
3. **Readability** - Easy to understand what code does
4. **Maintenance** - Fix bugs in one place
5. **Testing** - Test each method separately

**Method Design Principles:**
- **Single Responsibility** - Each method does ONE thing
- **Clear Names** - Name describes what it does
- **Short** - Keep methods focused and concise
- **Independent** - Method should work on its own

**✅ Success Criteria:**
- Can create multiple related methods
- Understand method cooperation
- Know how to organize code with methods
- Can break complex task into smaller methods

**🎯 Challenge:**
1. Add `getHighestScore(int a, int b, int c)` method
2. Add `getLowestScore(int a, int b, int c)` method
3. Modify `printResults()` to show highest and lowest scores

---

#### Exercise 5: void vs Return Methods (15 minutes)

**What you'll learn:** When to use void vs return

**Create new class: `VoidVsReturn`**

```java
public class VoidVsReturn {
    public static void main(String[] args) {
        System.out.println("===== VOID VS RETURN METHODS =====\n");

        // ===== VOID METHODS - Perform actions, don't return values =====
        System.out.println("--- void Methods (Actions) ---\n");

        printWelcome();
        printLine();
        displayMessage("This is a message");
        printLine();
        System.out.println();

        // ===== RETURN METHODS - Calculate and return values =====
        System.out.println("--- Return Methods (Calculations) ---\n");

        int sum = getSum(10, 20);
        System.out.println("Sum: " + sum);

        int product = getProduct(5, 6);
        System.out.println("Product: " + product);

        boolean result = isPositive(-5);
        System.out.println("Is -5 positive? " + result);
        System.out.println();

        // ===== COMPARING BOTH =====
        System.out.println("--- Comparison ---\n");

        System.out.println("void method - prints directly:");
        printSquare(5);  // Just call it

        System.out.println("\nReturn method - gives back value:");
        int squared = getSquare(5);  // Store returned value
        System.out.println("5 squared = " + squared);
        System.out.println();

        // ===== PRACTICAL EXAMPLE =====
        System.out.println("--- Practical Example ---\n");

        // void - for output/display
        printTemperature(25);

        // return - for calculation
        double fahrenheit = celsiusToFahrenheit(25);
        System.out.println("Calculated value: " + fahrenheit + "°F");
        System.out.println("Can use in math: " + (fahrenheit + 10));

        System.out.println("\n==================================");
    }

    // ===== VOID METHODS =====

    public static void printWelcome() {
        System.out.println("Welcome to Java Methods!");
    }

    public static void printLine() {
        System.out.println("=".repeat(30));
    }

    public static void displayMessage(String message) {
        System.out.println("Message: " + message);
    }

    public static void printSquare(int number) {
        int square = number * number;
        System.out.println(number + " squared = " + square);
    }

    public static void printTemperature(double celsius) {
        System.out.println("Temperature: " + celsius + "°C");
    }

    // ===== RETURN METHODS =====

    public static int getSum(int a, int b) {
        return a + b;
    }

    public static int getProduct(int a, int b) {
        return a * b;
    }

    public static boolean isPositive(int number) {
        return number > 0;
    }

    public static int getSquare(int number) {
        return number * number;
    }

    public static double celsiusToFahrenheit(double celsius) {
        return (celsius * 9.0 / 5.0) + 32;
    }
}
```

**Expected Output:**
```
===== VOID VS RETURN METHODS =====

--- void Methods (Actions) ---

Welcome to Java Methods!
==============================
Message: This is a message
==============================

--- Return Methods (Calculations) ---

Sum: 30
Product: 30
Is -5 positive? false

--- Comparison ---

void method - prints directly:
5 squared = 25

Return method - gives back value:
5 squared = 25

--- Practical Example ---

Temperature: 25°C
Calculated value: 77.0°F
Can use in math: 87.0

==================================
```

**💡 When to Use Each:**

| Use **void** when: | Use **return** when: |
|-------------------|---------------------|
| Printing output | Calculating a value |
| Displaying information | Need result for further use |
| Performing an action | Checking a condition |
| Side effects only | Value needed elsewhere |

**Examples:**

```java
// void - just prints (action)
public static void printAge(int age) {
    System.out.println("Age: " + age);
}

// return - gives back value (calculation)
public static int calculateAge(int birthYear, int currentYear) {
    return currentYear - birthYear;
}

// void - displays result (output)
public static void showResult(int score) {
    System.out.println("Score: " + score);
}

// return - returns boolean (decision)
public static boolean isPassing(int score) {
    return score >= 40;
}
```

**Decision Guide:**
```
Do you need the value for something else?
    ├─ YES → Use return
    └─ NO (just display) → Use void

Will you use the result in calculations?
    ├─ YES → Use return
    └─ NO → Use void

Do you need to make decisions based on result?
    ├─ YES → Use return (boolean)
    └─ NO → Use void
```

**✅ Success Criteria:**
- Understand difference between void and return
- Know when to use each
- Can choose appropriate return type
- Understand void methods perform actions

**🎯 Challenge:**
Create pairs of methods:
1. `printCircleArea(double radius)` - void, prints area
2. `getCircleArea(double radius)` - returns area as double
3. Try both and see the difference!

---

#### Exercise 6: Real-World Application - Calculator with Methods (25 minutes)

**What you'll learn:** Building a complete application with methods

**Create new class: `MethodCalculator`**

```java
public class MethodCalculator {
    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════╗");
        System.out.println("║      METHOD-BASED CALCULATOR     ║");
        System.out.println("╚═══════════════════════════════════╝");
        System.out.println();

        // Test all operations
        double num1 = 15.5;
        double num2 = 4.5;

        displayCalculation(num1, num2);

        System.out.println("\n" + "─".repeat(37));

        // Test with different numbers
        num1 = 100;
        num2 = 25;

        displayCalculation(num1, num2);

        System.out.println("\n" + "─".repeat(37));

        // Additional functions
        System.out.println("\n--- Additional Functions ---\n");

        int number = 7;
        System.out.println("Square of " + number + ": " + square(number));
        System.out.println("Cube of " + number + ": " + cube(number));
        System.out.println("Factorial of " + number + ": " + factorial(number));

        System.out.println();

        int base = 2;
        int exponent = 8;
        System.out.println(base + " raised to " + exponent + ": " + power(base, exponent));

        System.out.println();

        // Number properties
        System.out.println("--- Number Properties ---\n");
        int testNumber = 17;

        System.out.println("Number: " + testNumber);
        System.out.println("  Even? " + isEven(testNumber));
        System.out.println("  Odd? " + isOdd(testNumber));
        System.out.println("  Positive? " + isPositive(testNumber));
        System.out.println("  Prime? " + isPrime(testNumber));

        System.out.println("\n═══════════════════════════════════");
    }

    // ===== DISPLAY METHODS =====

    public static void displayCalculation(double a, double b) {
        printHeader(a, b);
        printBasicOperations(a, b);
        printComparisons(a, b);
    }

    public static void printHeader(double a, double b) {
        System.out.println("Numbers: " + a + " and " + b);
        System.out.println();
    }

    public static void printBasicOperations(double a, double b) {
        System.out.println("--- Basic Operations ---");
        System.out.println("Addition:       " + a + " + " + b + " = " + add(a, b));
        System.out.println("Subtraction:    " + a + " - " + b + " = " + subtract(a, b));
        System.out.println("Multiplication: " + a + " × " + b + " = " + multiply(a, b));
        System.out.println("Division:       " + a + " ÷ " + b + " = " + divide(a, b));
        System.out.println("Modulus:        " + a + " % " + b + " = " + modulus(a, b));
    }

    public static void printComparisons(double a, double b) {
        System.out.println("\n--- Comparisons ---");
        System.out.println("Maximum: " + max(a, b));
        System.out.println("Minimum: " + min(a, b));
        System.out.println("Are equal? " + areEqual(a, b));
        System.out.println("First is larger? " + isGreater(a, b));
    }

    // ===== BASIC OPERATIONS =====

    public static double add(double a, double b) {
        return a + b;
    }

    public static double subtract(double a, double b) {
        return a - b;
    }

    public static double multiply(double a, double b) {
        return a * b;
    }

    public static double divide(double a, double b) {
        if (b == 0) {
            System.out.println("Error: Division by zero!");
            return 0;
        }
        return a / b;
    }

    public static double modulus(double a, double b) {
        return a % b;
    }

    // ===== COMPARISON METHODS =====

    public static double max(double a, double b) {
        return (a > b) ? a : b;
    }

    public static double min(double a, double b) {
        return (a < b) ? a : b;
    }

    public static boolean areEqual(double a, double b) {
        return a == b;
    }

    public static boolean isGreater(double a, double b) {
        return a > b;
    }

    // ===== ADVANCED OPERATIONS =====

    public static int square(int n) {
        return n * n;
    }

    public static int cube(int n) {
        return n * n * n;
    }

    public static int power(int base, int exponent) {
        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }

    public static int factorial(int n) {
        if (n <= 1) return 1;

        int result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // ===== NUMBER PROPERTIES =====

    public static boolean isEven(int n) {
        return n % 2 == 0;
    }

    public static boolean isOdd(int n) {
        return n % 2 != 0;
    }

    public static boolean isPositive(int n) {
        return n > 0;
    }

    public static boolean isPrime(int n) {
        if (n <= 1) return false;

        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}
```

**Expected Output:**
```
╔═══════════════════════════════════╗
║      METHOD-BASED CALCULATOR     ║
╚═══════════════════════════════════╝

Numbers: 15.5 and 4.5

--- Basic Operations ---
Addition:       15.5 + 4.5 = 20.0
Subtraction:    15.5 - 4.5 = 11.0
Multiplication: 15.5 × 4.5 = 69.75
Division:       15.5 ÷ 4.5 = 3.4444444444444446
Modulus:        15.5 % 4.5 = 2.5

--- Comparisons ---
Maximum: 15.5
Minimum: 4.5
Are equal? false
First is larger? true

─────────────────────────────────────

Numbers: 100.0 and 25.0

--- Basic Operations ---
Addition:       100.0 + 25.0 = 125.0
Subtraction:    100.0 - 25.0 = 75.0
Multiplication: 100.0 × 25.0 = 2500.0
Division:       100.0 ÷ 25.0 = 4.0
Modulus:        100.0 % 25.0 = 0.0

--- Comparisons ---
Maximum: 100.0
Minimum: 25.0
Are equal? false
First is larger? true

─────────────────────────────────────

--- Additional Functions ---

Square of 7: 49
Cube of 7: 343
Factorial of 7: 5040

2 raised to 8: 256

--- Number Properties ---

Number: 17
  Even? false
  Odd? true
  Positive? true
  Prime? true

═══════════════════════════════════
```

**💡 What This Demonstrates:**

1. **Code Organization** - Each operation is a separate method
2. **Reusability** - Methods can be called multiple times
3. **Maintainability** - Easy to add new operations
4. **Readability** - Clear what each method does
5. **Testing** - Can test each method independently

**Method Categories:**
```
Display Methods (void)
├── displayCalculation()
├── printHeader()
├── printBasicOperations()
└── printComparisons()

Calculation Methods (return)
├── add(), subtract(), multiply(), divide()
├── max(), min()
├── square(), cube(), power(), factorial()
└── isEven(), isOdd(), isPrime()
```

**Benefits of This Structure:**
- **Modular** - Each piece is independent
- **Testable** - Test one method at a time
- **Extensible** - Easy to add new features
- **Clear** - Each method has one job

**✅ Success Criteria:**
- Complete working calculator
- Multiple methods working together
- Proper separation of concerns
- Clean, organized code

**🎯 Challenges:**
1. Add `absolute(double n)` method
2. Add `average(double a, double b)` method
3. Add `percentage(double part, double whole)` method
4. Create a method that finds GCD (Greatest Common Divisor)

---

**✅ Day 8 Complete!**

You've learned:
- ✅ Creating and calling methods
- ✅ Methods with parameters
- ✅ Methods with return values
- ✅ Methods working together
- ✅ void vs return methods
- ✅ Real-world application (calculator)

**🎯 Before moving to Day 9:**
- [ ] Can create methods with and without parameters
- [ ] Understand return values and void
- [ ] Know when to use each type
- [ ] Can organize code with multiple methods
- [ ] Built a complete method-based application

---

## ✅ Completion Checklist (Per Exercise):

Before moving to next exercise:
- [ ] Typed all code yourself (no copy-paste!)
- [ ] Code compiles without errors
- [ ] Output matches expected output
- [ ] Understand WHY it works
- [ ] Can explain it to someone else
- [ ] Tried the challenge modifications

---

## 💡 Tips for Success:

### While Coding:
1. **Type, don't copy** - Builds muscle memory
2. **Read error messages** - They tell you what's wrong
3. **Test frequently** - Run after each step
4. **Add comments** - Explain what each part does
5. **Experiment** - Change values and see what happens

### When Stuck:
1. **Read the error** - What line? What's it say?
2. **Check syntax** - Missing semicolon? Wrong brackets?
3. **Compare with example** - What's different?
4. **Take a break** - Fresh eyes help
5. **Google the error** - Others had same issue

### Before Moving On:
1. **Can you do it from scratch?** - Close file, try again
2. **Can you explain it?** - Talk through the code
3. **Can you modify it?** - Change requirements slightly
4. **Does it work every time?** - Test with different inputs

---

# DAY 9: METHOD OVERLOADING & VARIABLE SCOPE

**Focus**: Learn how to create multiple methods with the same name (overloading) and understand where variables can be used (scope).

**Why This Matters**: Method overloading makes code more flexible and easier to use. Understanding scope prevents bugs and helps organize your code properly.

---

## 📚 Exercise 1: Introduction to Method Overloading (15 min)

### 🎯 Learning Objective:
Understand what method overloading is and how Java decides which method to call.

### 📖 Concept:
**Method Overloading** = Having multiple methods with the **same name** but **different parameters**.

```
Why overload?
- More flexible code
- Same action, different ways to do it
- Easier to remember (one name for similar actions)

Example in real life:
- print(int x)        → prints an integer
- print(String s)     → prints a string
- print(double d)     → prints a decimal
All do "printing" but handle different types!
```

### 💻 Code:

```java
public class MethodOverloadingIntro {
    public static void main(String[] args) {
        System.out.println("===== METHOD OVERLOADING DEMO =====\n");

        // Call different versions of the greet method
        // Java decides which one based on parameters!

        greet();                    // Calls greet() with no parameters
        greet("Alice");             // Calls greet(String) with 1 parameter
        greet("Bob", 25);          // Calls greet(String, int) with 2 parameters

        System.out.println("\n============================");
    }

    // Version 1: No parameters
    public static void greet() {
        System.out.println("Hello, there!");
    }

    // Version 2: One String parameter
    // Same method name "greet", but different parameters!
    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // Version 3: String and int parameters
    // Again same name, but even more parameters!
    public static void greet(String name, int age) {
        System.out.println("Hello, " + name + "! You are " + age + " years old.");
    }

    // This is METHOD OVERLOADING!
    // Same name (greet) but different parameters
    // Java knows which one to call based on what you pass
}
```

### 🖥️ Expected Output:
```
===== METHOD OVERLOADING DEMO =====

Hello, there!
Hello, Alice!
Hello, Bob! You are 25 years old.

============================
```

### 🔑 Key Concepts:

| Concept | Explanation |
|---------|-------------|
| **Method Overloading** | Multiple methods with same name, different parameters |
| **Method Signature** | Method name + parameter types (not return type!) |
| **Compiler Decision** | Java picks the right method based on arguments passed |
| **Why Useful** | One name, multiple behaviors - easier to remember |

### ❌ Common Mistakes:

| Mistake | Why It's Wrong | Solution |
|---------|----------------|----------|
| Same parameters, different return type | `int add(int a, int b)` and `double add(int a, int b)` won't work | Change parameters, not just return type |
| Confusing parameter order | `greet(String, int)` ≠ `greet(int, String)` | Order matters! These are different |
| Same parameter types but different names | `add(int a, int b)` and `add(int x, int y)` are NOT different | Parameter names don't matter, types do |

### ✅ Success Criteria:
- [ ] All three greet methods are called successfully
- [ ] Understand why Java calls each specific method
- [ ] Can explain what makes methods "different"
- [ ] Output matches expected output exactly

### 🏆 Challenge:
1. Add a fourth `greet` method that takes only an `int age` and prints "Hello! You are X years old."
2. Add a fifth `greet` method that takes a String name and a String city, printing "Hello, name from city!"
3. Call all five versions from main and verify each works

---

## 📚 Exercise 2: Overloading with Different Number of Parameters (15 min)

### 🎯 Learning Objective:
Practice creating overloaded methods with different numbers of parameters.

### 📖 Concept:
The most common way to overload: **same name, different NUMBER of parameters**.

```
add(int a, int b)           → 2 parameters
add(int a, int b, int c)    → 3 parameters
add(int a, int b, int c, int d) → 4 parameters

All named "add", all do addition, but handle different quantities\!
```

### 💻 Code:

```java
public class OverloadingByNumber {
    public static void main(String[] args) {
        System.out.println("===== ADDITION WITH OVERLOADING =====\n");

        // Call add with different numbers of parameters
        int sum2 = add(10, 20);
        int sum3 = add(10, 20, 30);
        int sum4 = add(10, 20, 30, 40);

        System.out.println("Sum of 2 numbers: " + sum2);
        System.out.println("Sum of 3 numbers: " + sum3);
        System.out.println("Sum of 4 numbers: " + sum4);

        System.out.println("\n===== MULTIPLICATION WITH OVERLOADING =====\n");

        int product2 = multiply(5, 4);
        int product3 = multiply(5, 4, 2);

        System.out.println("Product of 2 numbers: " + product2);
        System.out.println("Product of 3 numbers: " + product3);

        System.out.println("\n============================");
    }

    // Add: 2 parameters
    public static int add(int a, int b) {
        System.out.println("  [Called add with 2 parameters]");
        return a + b;
    }

    // Add: 3 parameters (OVERLOADED\!)
    public static int add(int a, int b, int c) {
        System.out.println("  [Called add with 3 parameters]");
        return a + b + c;
    }

    // Add: 4 parameters (OVERLOADED AGAIN\!)
    public static int add(int a, int b, int c, int d) {
        System.out.println("  [Called add with 4 parameters]");
        return a + b + c + d;
    }

    // Multiply: 2 parameters
    public static int multiply(int a, int b) {
        System.out.println("  [Called multiply with 2 parameters]");
        return a * b;
    }

    // Multiply: 3 parameters (OVERLOADED\!)
    public static int multiply(int a, int b, int c) {
        System.out.println("  [Called multiply with 3 parameters]");
        return a * b * c;
    }
}
```

### 🖥️ Expected Output:
```
===== ADDITION WITH OVERLOADING =====

  [Called add with 2 parameters]
  [Called add with 3 parameters]
  [Called add with 4 parameters]
Sum of 2 numbers: 30
Sum of 3 numbers: 60
Sum of 4 numbers: 100

===== MULTIPLICATION WITH OVERLOADING =====

  [Called multiply with 2 parameters]
  [Called multiply with 3 parameters]
Product of 2 numbers: 20
Product of 3 numbers: 40

============================
```

### 🔑 Key Concepts:

| Concept | Explanation |
|---------|-------------|
| **Parameter Count** | Number of parameters determines which method is called |
| **Method Selection** | Java automatically picks correct method at compile time |
| **Code Reuse** | One method name for similar operations |
| **Flexibility** | Users can call the version they need |

### ❌ Common Mistakes:

| Mistake | Example | Fix |
|---------|---------|-----|
| Trying to use wrong number | `add(5)` when no 1-param version exists | Add the method or use correct number |
| Not returning value | Forgetting `return` statement | Always return what method promises |
| Wrong type returned | Returning `double` from `int` method | Match return type exactly |

### ✅ Success Criteria:
- [ ] Understand how parameter count creates different methods
- [ ] Can call any version successfully
- [ ] See which method is actually called (from the debug prints)
- [ ] All calculations are correct

### 🏆 Challenge:
1. Create an overloaded `average` method:
   - `average(int a, int b)` → returns average of 2 numbers
   - `average(int a, int b, int c)` → returns average of 3 numbers
2. Create an overloaded `max` method:
   - `max(int a, int b)` → returns larger of 2 numbers
   - `max(int a, int b, int c)` → returns largest of 3 numbers
3. Test all methods from main

---

## 📚 Exercise 3: Overloading with Different Parameter Types (20 min)

### 🎯 Learning Objective:
Learn to overload methods by changing parameter TYPES, not just numbers.

### 📖 Concept:
**Type-based overloading**: Same number of parameters, but DIFFERENT TYPES.

```
print(int x)      → prints integer
print(double x)   → prints decimal
print(String x)   → prints text
print(boolean x)  → prints true/false

All take 1 parameter, but different types!
```

### 💻 Code:

```java
public class OverloadingByType {
    public static void main(String[] args) {
        System.out.println("===== TYPE-BASED OVERLOADING =====\n");

        // Call display with different types
        display(42);              // int version
        display(3.14);            // double version
        display("Hello");         // String version
        display(true);            // boolean version

        System.out.println("\n===== AREA CALCULATIONS =====\n");

        // Calculate area - same method name, different shapes!
        double squareArea = calculateArea(5);           // Square (int)
        double rectangleArea = calculateArea(4, 6);     // Rectangle (int, int)
        double circleArea = calculateArea(3.5);         // Circle (double)

        System.out.println("Square area (side=5): " + squareArea);
        System.out.println("Rectangle area (4x6): " + rectangleArea);
        System.out.println("Circle area (radius=3.5): " + circleArea);

        System.out.println("\n============================");
    }

    // Display methods - overloaded by type

    public static void display(int number) {
        System.out.println("[INT] The integer is: " + number);
    }

    public static void display(double number) {
        System.out.println("[DOUBLE] The decimal is: " + number);
    }

    public static void display(String text) {
        System.out.println("[STRING] The text is: " + text);
    }

    public static void display(boolean value) {
        System.out.println("[BOOLEAN] The boolean is: " + value);
    }

    // Area calculation methods - overloaded by type and count

    // Square area (one int parameter)
    public static double calculateArea(int side) {
        System.out.println("  → Calculating SQUARE area");
        return side * side;
    }

    // Rectangle area (two int parameters)
    public static double calculateArea(int length, int width) {
        System.out.println("  → Calculating RECTANGLE area");
        return length * width;
    }

    // Circle area (one double parameter)
    // Same number of params as square, but DIFFERENT TYPE!
    public static double calculateArea(double radius) {
        System.out.println("  → Calculating CIRCLE area");
        return 3.14159 * radius * radius;
    }
}
```

### 🖥️ Expected Output:
```
===== TYPE-BASED OVERLOADING =====

[INT] The integer is: 42
[DOUBLE] The decimal is: 3.14
[STRING] The text is: Hello
[BOOLEAN] The boolean is: true

===== AREA CALCULATIONS =====

  → Calculating SQUARE area
  → Calculating RECTANGLE area
  → Calculating CIRCLE area
Square area (side=5): 25.0
Rectangle area (4x6): 24.0
Circle area (radius=3.5): 38.48

============================
```

### 🔑 Key Concepts:

| Concept | Explanation |
|---------|-------------|
| **Type Matters** | `int` and `double` are different, even with same number of params |
| **Best Match** | Java picks the method that best matches parameter types |
| **Automatic Casting** | Java may convert types if exact match not found |
| **Primitive vs Reference** | Primitives (int, double) vs Objects (String) both work |

### 🧠 How Java Decides Which Method to Call:

```
Step 1: Check exact match
  calculateArea(5) → Is there calculateArea(int)? YES! Use it.

Step 2: If no exact match, try widening conversion
  If you had calculateArea(5.0) but no (double) version,
  Java would try to widen to long, then float, etc.

Step 3: If still no match, compiler error!
```

### ❌ Common Mistakes:

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| `calculateArea(int)` and `calculateArea(long)` confusion | Calling with literal 5 - which one? | Be explicit: `calculateArea(5L)` for long |
| Ambiguous calls | Two methods match equally well | Make one more specific |
| Assuming String is special | It's just another type! | Treat like any other type |

### ✅ Success Criteria:
- [ ] All four display methods work correctly
- [ ] Understand why square (int) and circle (double) are different
- [ ] Can predict which method will be called
- [ ] All outputs match expected

### 🏆 Challenge:
1. Add overloaded `convert` methods:
   - `convert(int inches)` → converts inches to centimeters
   - `convert(double pounds)` → converts pounds to kilograms
   - `convert(String fahrenheit)` → converts F to C (parse the string first!)
2. Create `formatPrice` methods:
   - `formatPrice(int dollars)` → prints "$X.00"
   - `formatPrice(double dollars)` → prints "$X.XX"
3. Test all conversions

---

## 📚 Exercise 4: Understanding Variable Scope - Local Variables (20 min)

### 🎯 Learning Objective:
Understand where variables exist and where they can be used (scope).

### 📖 Concept:
**Variable Scope** = Where in your code a variable can be accessed.

```
LOCAL VARIABLES:
- Declared inside a method or block { }
- Only exist within that method/block
- Destroyed when method/block ends
- Must be initialized before use

Example:
void myMethod() {
    int x = 5;     ← x is LOCAL to myMethod
    // x exists here
}
// x does NOT exist here! (outside method)
```

### 💻 Code:

```java
public class LocalVariableScope {
    public static void main(String[] args) {
        System.out.println("===== LOCAL VARIABLE SCOPE =====\n");

        // Variables declared here are local to main method
        int mainNumber = 100;
        System.out.println("In main: mainNumber = " + mainNumber);

        // Call other methods
        method1();
        method2();

        // This would cause an ERROR - method1Number doesn't exist here!
        // System.out.println(method1Number);  // COMPILE ERROR!

        System.out.println("\nBack in main: mainNumber = " + mainNumber);
        // mainNumber still exists because we're still in main

        // Demonstrate block scope
        demonstrateBlockScope();

        System.out.println("\n============================");
    }

    public static void method1() {
        // This variable is LOCAL to method1
        int method1Number = 200;
        System.out.println("\nIn method1: method1Number = " + method1Number);

        // Can't access mainNumber here!
        // System.out.println(mainNumber);  // ERROR!

        // method1Number will be destroyed when this method ends
    }

    public static void method2() {
        // This is a DIFFERENT variable, also named method1Number
        // It's in a different scope, so it's completely separate!
        int method1Number = 300;  // No conflict! Different scope!
        System.out.println("In method2: method1Number = " + method1Number);

        // This method1Number is different from the one in method1
    }

    public static void demonstrateBlockScope() {
        System.out.println("\n--- Block Scope Demo ---");

        int outerVariable = 10;
        System.out.println("Before block: outerVariable = " + outerVariable);

        // Start a new block (scope)
        {
            int innerVariable = 20;  // Only exists in this block!
            System.out.println("Inside block: innerVariable = " + innerVariable);
            System.out.println("Inside block: outerVariable = " + outerVariable);
            // outerVariable is accessible here
        }
        // Block ends - innerVariable is destroyed!

        System.out.println("After block: outerVariable = " + outerVariable);
        // This would ERROR - innerVariable doesn't exist anymore!
        // System.out.println(innerVariable);  // COMPILE ERROR!

        // Demonstrate loop scope
        for (int i = 0; i < 3; i++) {
            int loopVariable = i * 10;
            System.out.println("Loop iteration " + i + ": loopVariable = " + loopVariable);
        }
        // i and loopVariable don't exist here!
        // System.out.println(i);  // ERROR!
    }
}
```

### 🖥️ Expected Output:
```
===== LOCAL VARIABLE SCOPE =====

In main: mainNumber = 100

In method1: method1Number = 200
In method2: method1Number = 300

Back in main: mainNumber = 100

--- Block Scope Demo ---
Before block: outerVariable = 10
Inside block: innerVariable = 20
Inside block: outerVariable = 10
After block: outerVariable = 10
Loop iteration 0: loopVariable = 0
Loop iteration 1: loopVariable = 10
Loop iteration 2: loopVariable = 20

============================
```

### 🔑 Key Concepts:

| Concept | Explanation |
|---------|-------------|
| **Local Variable** | Exists only in the method/block where it's declared |
| **Scope** | The region of code where a variable can be accessed |
| **Lifetime** | Variable exists from declaration to end of block |
| **Shadowing** | Can't have two variables with same name in same scope |

### 📊 Variable Scope Visualization:

```
public class Example {
    public static void main(String[] args) {
        int a = 1;  ← a's scope starts
        {
            int b = 2;  ← b's scope starts
            // a and b both accessible here
        } ← b's scope ends (b destroyed)
        // Only a accessible here
    } ← a's scope ends (a destroyed)
}
```

### ❌ Common Mistakes:

| Mistake | Why It Fails | Solution |
|---------|--------------|----------|
| Using variable outside its scope | Variable doesn't exist there | Declare in wider scope if needed |
| Not initializing local variables | Local variables don't have default values | Always initialize: `int x = 0;` |
| Trying to access loop variable after loop | Loop variable destroyed after loop | Declare before loop if needed after |
| Redeclaring in same scope | `int x = 5; int x = 10;` | Use different names or wider scope |

### ✅ Success Criteria:
- [ ] Understand that each method has its own variables
- [ ] Know that variables in one method can't access variables in another
- [ ] Can explain why certain lines would cause errors
- [ ] Understand block scope (curly braces create scope)

### 🏆 Challenge:
1. Create a method that demonstrates you CAN have the same variable name in different methods
2. Create a method that shows loop variables are destroyed after the loop
3. Try to create a compile error by accessing a variable outside its scope (then comment it out)
4. Create nested blocks and show which variables are accessible where

---

## 📚 Exercise 5: Instance Variables vs Local Variables (25 min)

### 🎯 Learning Objective:
Learn about instance variables (belong to a class/object) vs local variables (belong to a method).

### 📖 Concept:
**Two Types of Variables:**

```
LOCAL VARIABLES:
- Declared inside methods
- Only exist during method execution
- Destroyed when method ends
- Must initialize before use

INSTANCE VARIABLES:
- Declared inside class, outside methods
- Belong to each object/instance
- Exist as long as object exists
- Automatically initialized (0, false, null)
- Accessed with "this" keyword or directly
```

### 💻 Code:

```java
public class VariableScopeComparison {

    // INSTANCE VARIABLES - belong to the class
    // These exist for the entire lifetime of the program
    static int instanceCounter = 0;      // Shared by all methods
    static String instanceMessage = "I'm an instance variable";

    public static void main(String[] args) {
        System.out.println("===== LOCAL VS INSTANCE VARIABLES =====\n");

        // LOCAL VARIABLE - only exists in main
        int localCounter = 0;

        System.out.println("Initial state:");
        System.out.println("  Instance counter: " + instanceCounter);
        System.out.println("  Local counter: " + localCounter);
        System.out.println("  Instance message: " + instanceMessage);

        // Call methods that modify variables
        System.out.println("\nCalling incrementCounters() three times:");
        incrementCounters();
        incrementCounters();
        incrementCounters();

        System.out.println("\nAfter method calls:");
        System.out.println("  Instance counter: " + instanceCounter);
        System.out.println("  Local counter: " + localCounter);
        // Local counter is STILL 0! Method calls didn't change it!

        // Demonstrate scope differences
        demonstrateScopeDifferences();

        System.out.println("\n============================");
    }

    public static void incrementCounters() {
        // LOCAL variable - new one created each time method is called!
        int localCounter = 0;

        // Increment BOTH counters
        instanceCounter++;   // Instance variable - persists!
        localCounter++;      // Local variable - destroyed at end!

        System.out.println("  Inside method:");
        System.out.println("    Instance counter: " + instanceCounter);
        System.out.println("    Local counter: " + localCounter);

        // When method ends, localCounter is destroyed
        // but instanceCounter remains!
    }

    public static void demonstrateScopeDifferences() {
        System.out.println("\n--- Scope Differences ---");

        // Instance variable is accessible everywhere in the class
        System.out.println("Can access instanceMessage: " + instanceMessage);
        System.out.println("Can access instanceCounter: " + instanceCounter);

        // Modify instance variable - change persists!
        instanceMessage = "I've been modified!";
        instanceCounter = 100;

        System.out.println("After modification:");
        System.out.println("  instanceMessage: " + instanceMessage);
        System.out.println("  instanceCounter: " + instanceCounter);

        // These changes affect ALL methods!
    }
}
```

### 🖥️ Expected Output:
```
===== LOCAL VS INSTANCE VARIABLES =====

Initial state:
  Instance counter: 0
  Local counter: 0
  Instance message: I'm an instance variable

Calling incrementCounters() three times:
  Inside method:
    Instance counter: 1
    Local counter: 1
  Inside method:
    Instance counter: 2
    Local counter: 1
  Inside method:
    Instance counter: 3
    Local counter: 1

After method calls:
  Instance counter: 3
  Local counter: 0

--- Scope Differences ---
Can access instanceMessage: I'm an instance variable
Can access instanceCounter: 3
After modification:
  instanceMessage: I've been modified!
  instanceCounter: 100

============================
```

### 🔑 Key Concepts:

| Feature | Local Variable | Instance Variable (static in this example) |
|---------|----------------|-------------------------------------------|
| **Where declared** | Inside method/block | Inside class, outside methods |
| **Lifetime** | Method execution only | Entire program |
| **Scope** | Only in declaring method | Entire class |
| **Default value** | None - must initialize | 0, false, null (auto-initialized) |
| **Access** | Only within method | From any method in class |
| **Memory** | Stack | Heap (or method area for static) |

### 📊 Visual Comparison:

```
public class Example {
    static int instanceVar = 0;  ← Accessible everywhere

    public static void method1() {
        int localVar = 0;  ← Only accessible in method1
        instanceVar++;     ← Can use instanceVar
    }

    public static void method2() {
        // Can't use localVar from method1!
        instanceVar++;     ← Can use instanceVar
    }
}
```

### ❌ Common Mistakes:

| Mistake | Issue | Solution |
|---------|-------|----------|
| Expecting local variable to persist | Gets reset each method call | Use instance variable instead |
| Not initializing local variable | Compiler error | Always initialize: `int x = 0;` |
| Shadowing instance variable | Local variable hides instance variable | Use different names or `this.` |
| Modifying wrong variable | Changing local instead of instance | Be clear about which you're using |

### ✅ Success Criteria:
- [ ] Understand local variables are created and destroyed each method call
- [ ] Understand instance variables persist across method calls
- [ ] Can predict which counter will change and which won't
- [ ] See that localCounter resets to 1 each time, instanceCounter keeps growing

### 🏆 Challenge:
1. Add another instance variable `totalSum` that accumulates all values passed to a method
2. Create a method `addToSum(int value)` that adds to `totalSum` (instance) but also uses a local variable
3. Show that calling the method multiple times accumulates in `totalSum` but local variable always resets
4. Add a method to reset all instance variables to 0

---

## 📚 Exercise 6: Practical Application - Banking System (25 min)

### 🎯 Learning Objective:
Apply method overloading and variable scope to build a simple banking system.

### 📖 Concept:
Combine everything you've learned:
- Overloaded methods for different deposit/withdrawal scenarios
- Instance variables to track account state
- Local variables for temporary calculations

### 💻 Code:

```java
public class BankingSystem {

    // INSTANCE VARIABLES - Account state
    static String accountHolder = "John Doe";
    static double balance = 1000.0;
    static int transactionCount = 0;

    public static void main(String[] args) {
        System.out.println("===== BANKING SYSTEM =====\n");

        displayAccountInfo();

        // Demonstrate overloaded deposit methods
        System.out.println("\n--- DEPOSITS ---");
        deposit(500.0);                        // Basic deposit
        deposit(200.0, "Salary");              // Deposit with description
        deposit(100, 50, 25);                  // Deposit multiple amounts

        // Demonstrate overloaded withdrawal methods
        System.out.println("\n--- WITHDRAWALS ---");
        withdraw(150.0);                       // Basic withdrawal
        withdraw(75.0, "Groceries");           // Withdrawal with description

        // Try to withdraw more than balance
        System.out.println("\n--- INSUFFICIENT FUNDS TEST ---");
        withdraw(5000.0);

        // Final summary
        System.out.println();
        displayAccountInfo();
        displayStatistics();

        System.out.println("\n============================");
    }

    // OVERLOADED deposit methods

    // Basic deposit (just amount)
    public static void deposit(double amount) {
        // LOCAL variables for this transaction
        double oldBalance = balance;      // Remember old balance

        balance += amount;                // Update instance variable
        transactionCount++;               // Update transaction counter

        System.out.println("Deposited: $" + amount);
        System.out.println("  Old balance: $" + oldBalance);
        System.out.println("  New balance: $" + balance);
    }

    // Deposit with description (overloaded!)
    public static void deposit(double amount, String description) {
        // LOCAL variable
        double oldBalance = balance;

        balance += amount;
        transactionCount++;

        System.out.println("Deposited: $" + amount + " (" + description + ")");
        System.out.println("  Old balance: $" + oldBalance);
        System.out.println("  New balance: $" + balance);
    }

    // Deposit multiple amounts (overloaded!)
    public static void deposit(double amount1, double amount2, double amount3) {
        // LOCAL variables for calculation
        double oldBalance = balance;
        double totalDeposit = amount1 + amount2 + amount3;

        balance += totalDeposit;
        transactionCount++;

        System.out.println("Multiple deposits: $" + amount1 + ", $" + amount2 + ", $" + amount3);
        System.out.println("  Total deposited: $" + totalDeposit);
        System.out.println("  Old balance: $" + oldBalance);
        System.out.println("  New balance: $" + balance);
    }

    // OVERLOADED withdraw methods

    // Basic withdrawal
    public static void withdraw(double amount) {
        // LOCAL variable to check if we have enough
        boolean hasEnoughFunds = (balance >= amount);

        if (hasEnoughFunds) {
            double oldBalance = balance;  // LOCAL variable
            balance -= amount;            // Update INSTANCE variable
            transactionCount++;

            System.out.println("Withdrew: $" + amount);
            System.out.println("  Old balance: $" + oldBalance);
            System.out.println("  New balance: $" + balance);
        } else {
            System.out.println("INSUFFICIENT FUNDS!");
            System.out.println("  Attempted withdrawal: $" + amount);
            System.out.println("  Current balance: $" + balance);
            System.out.println("  Short by: $" + (amount - balance));
        }
    }

    // Withdrawal with description (overloaded!)
    public static void withdraw(double amount, String description) {
        boolean hasEnoughFunds = (balance >= amount);

        if (hasEnoughFunds) {
            double oldBalance = balance;
            balance -= amount;
            transactionCount++;

            System.out.println("Withdrew: $" + amount + " (" + description + ")");
            System.out.println("  Old balance: $" + oldBalance);
            System.out.println("  New balance: $" + balance);
        } else {
            System.out.println("INSUFFICIENT FUNDS for: " + description);
            System.out.println("  Attempted withdrawal: $" + amount);
            System.out.println("  Current balance: $" + balance);
        }
    }

    // Helper methods (not overloaded)

    public static void displayAccountInfo() {
        System.out.println("--- ACCOUNT INFORMATION ---");
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Current Balance: $" + balance);
        System.out.println("Transaction Count: " + transactionCount);
    }

    public static void displayStatistics() {
        // LOCAL variables for statistics calculation
        double averageTransactionAmount = balance / transactionCount;

        System.out.println("\n--- STATISTICS ---");
        System.out.println("Total Transactions: " + transactionCount);
        System.out.println("Average per transaction: $" + averageTransactionAmount);
    }
}
```

### 🖥️ Expected Output:
```
===== BANKING SYSTEM =====

--- ACCOUNT INFORMATION ---
Account Holder: John Doe
Current Balance: $1000.0
Transaction Count: 0

--- DEPOSITS ---
Deposited: $500.0
  Old balance: $1000.0
  New balance: $1500.0
Deposited: $200.0 (Salary)
  Old balance: $1500.0
  New balance: $1700.0
Multiple deposits: $100.0, $50.0, $25.0
  Total deposited: $175.0
  Old balance: $1700.0
  New balance: $1875.0

--- WITHDRAWALS ---
Withdrew: $150.0
  Old balance: $1875.0
  New balance: $1725.0
Withdrew: $75.0 (Groceries)
  Old balance: $1725.0
  New balance: $1650.0

--- INSUFFICIENT FUNDS TEST ---
INSUFFICIENT FUNDS!
  Attempted withdrawal: $5000.0
  Current balance: $1650.0
  Short by: $3350.0

--- ACCOUNT INFORMATION ---
Account Holder: John Doe
Current Balance: $1650.0
Transaction Count: 5

--- STATISTICS ---
Total Transactions: 5
Average per transaction: $330.0

============================
```

### 🔑 Key Concepts Applied:

| Concept | Where Used | Why Important |
|---------|------------|---------------|
| **Method Overloading** | Multiple deposit/withdraw methods | Flexibility - different ways to transact |
| **Instance Variables** | balance, transactionCount, accountHolder | Persist across all method calls |
| **Local Variables** | oldBalance, hasEnoughFunds, etc. | Temporary calculations within methods |
| **Scope** | Each method has its own locals | Prevents variable name conflicts |

### 📊 How It All Works Together:

```
INSTANCE VARIABLES (persist):
  balance = 1000.0  ← Shared by all methods
  transactionCount = 0  ← Shared by all methods

METHOD CALLS:
  deposit(500.0):
    LOCAL: oldBalance = 1000.0  ← Temporary
    UPDATE: balance = 1500.0    ← Persists!
    LOCAL destroyed when method ends

  deposit(200.0, "Salary"):  ← Different method (overloaded!)
    LOCAL: oldBalance = 1500.0  ← New local variable
    UPDATE: balance = 1700.0    ← Persists!
    LOCAL destroyed when method ends
```

### ❌ Common Mistakes:

| Mistake | Problem | Solution |
|---------|---------|----------|
| Using local balance variable | Changes don't persist | Use instance variable |
| Forgetting to increment transactionCount | Wrong statistics | Update in every transaction method |
| Not checking sufficient funds | Negative balance allowed | Check before withdrawal |
| Confusing which method is called | Wrong overload selected | Check parameter types carefully |

### ✅ Success Criteria:
- [ ] All deposits increase balance correctly
- [ ] All withdrawals decrease balance correctly
- [ ] Transaction count increments with each transaction
- [ ] Insufficient funds check works
- [ ] Can see difference between instance and local variables
- [ ] Understand why balance persists but oldBalance doesn't

### 🏆 Challenge:
1. Add an overloaded `transfer` method:
   - `transfer(double amount, String toAccount)` → transfers with description
   - `transfer(double amount)` → basic transfer
2. Add a transaction fee: instance variable `transactionFee = 1.50`
   - Deduct fee from balance after each transaction
   - Update statistics to show total fees paid
3. Add an `applyInterest` method that adds 2% to the current balance
4. Create a method `resetAccount()` that resets balance to 1000 and transactionCount to 0

---

## 🎓 Day 9 Summary

### What You Learned Today:

**Method Overloading:**
- ✅ Same method name, different parameters
- ✅ Overload by number of parameters
- ✅ Overload by type of parameters
- ✅ Java decides which method to call at compile time
- ✅ Makes code more flexible and easier to use

**Variable Scope:**
- ✅ Local variables exist only in their method/block
- ✅ Instance variables (static in our examples) exist for the entire program
- ✅ Local variables must be initialized before use
- ✅ Instance variables are auto-initialized
- ✅ Scope determines where a variable can be accessed

**Practical Applications:**
- ✅ Banking system with overloaded methods
- ✅ Using instance variables to maintain state
- ✅ Using local variables for temporary calculations
- ✅ Combining both for real-world programs

### 🎯 Before Moving to Day 10:
- [ ] Can create overloaded methods with different parameters
- [ ] Understand how Java selects which overloaded method to call
- [ ] Know the difference between local and instance variables
- [ ] Can predict variable scope and lifetime
- [ ] Built a complete application using both concepts

---

**Next Up: Day 10 - Introduction to Object-Oriented Programming (Classes, Objects, Constructors)**


---

## Week 2: Object-Oriented Programming Fundamentals (Continued)

### Day 10: Introduction to Object-Oriented Programming

---

#### Exercise 1: Understanding Objects in Real Life (10 minutes)

**What you'll learn:** The concept of objects and how they relate to real-world things

**Create new class: `RealWorldObjects`**

**Concept:** Everything in the real world is an object. A car, a person, a book - these are all objects with properties (characteristics) and behaviors (actions).

**Step-by-Step:**

```java
public class RealWorldObjects {
    public static void main(String[] args) {
        System.out.println("===== UNDERSTANDING OBJECTS =====\n");
        
        // Let's think about a CAR as an object
        System.out.println("--- CAR Object ---");
        System.out.println("Properties (What it HAS):");
        System.out.println("  - Brand: Toyota");
        System.out.println("  - Color: Red");
        System.out.println("  - Year: 2023");
        System.out.println("  - Speed: 0 km/h");
        System.out.println();
        
        System.out.println("Behaviors (What it DOES):");
        System.out.println("  - start()");
        System.out.println("  - accelerate()");
        System.out.println("  - brake()");
        System.out.println("  - turn()");
        System.out.println();
        
        // Let's think about a PERSON as an object
        System.out.println("--- PERSON Object ---");
        System.out.println("Properties (What they HAVE):");
        System.out.println("  - Name: Alice");
        System.out.println("  - Age: 25");
        System.out.println("  - Height: 165 cm");
        System.out.println("  - Weight: 60 kg");
        System.out.println();
        
        System.out.println("Behaviors (What they DO):");
        System.out.println("  - walk()");
        System.out.println("  - talk()");
        System.out.println("  - eat()");
        System.out.println("  - sleep()");
        System.out.println();
        
        // Let's think about a BANK ACCOUNT as an object
        System.out.println("--- BANK ACCOUNT Object ---");
        System.out.println("Properties (What it HAS):");
        System.out.println("  - Account Number: 123456");
        System.out.println("  - Account Holder: John Doe");
        System.out.println("  - Balance: $1000.00");
        System.out.println("  - Account Type: Savings");
        System.out.println();
        
        System.out.println("Behaviors (What it DOES):");
        System.out.println("  - deposit()");
        System.out.println("  - withdraw()");
        System.out.println("  - checkBalance()");
        System.out.println("  - transfer()");
        
        System.out.println("\n=================================");
        System.out.println("💡 Key Insight:");
        System.out.println("Objects = Properties + Behaviors");
        System.out.println("Properties = Data (variables)");
        System.out.println("Behaviors = Actions (methods)");
        System.out.println("=================================");
    }
}
```

**Expected Output:**
```
===== UNDERSTANDING OBJECTS =====

--- CAR Object ---
Properties (What it HAS):
  - Brand: Toyota
  - Color: Red
  - Year: 2023
  - Speed: 0 km/h

Behaviors (What it DOES):
  - start()
  - accelerate()
  - brake()
  - turn()

--- PERSON Object ---
Properties (What they HAVE):
  - Name: Alice
  - Age: 25
  - Height: 165 cm
  - Weight: 60 kg

Behaviors (What they DO):
  - walk()
  - talk()
  - eat()
  - sleep()

--- BANK ACCOUNT Object ---
Properties (What it HAS):
  - Account Number: 123456
  - Account Holder: John Doe
  - Balance: $1000.00
  - Account Type: Savings

Behaviors (What it DOES):
  - deposit()
  - withdraw()
  - checkBalance()
  - transfer()

=================================
💡 Key Insight:
Objects = Properties + Behaviors
Properties = Data (variables)
Behaviors = Actions (methods)
=================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Object** | A thing with properties and behaviors |
| **Properties** | Characteristics/data (variables) |
| **Behaviors** | Actions/functions (methods) |
| **Real-World Mapping** | Programming objects model real things |

**✅ Success Criteria:**
- [ ] Understand objects have properties and behaviors
- [ ] Can identify properties vs behaviors
- [ ] See how real-world things map to programming
- [ ] Recognize the pattern in all examples

**🎯 Challenge:**
Think of 3 more real-world objects and list their:
1. Properties (at least 4)
2. Behaviors (at least 4)

Examples: Phone, Book, Student, Dog, House

---

---

#### Exercise 2: Your First Class (15 minutes)

**What you'll learn:** Creating a class - the blueprint for objects

**Create new class: `Dog`**

**Concept:** A **class** is like a blueprint or template. It defines what properties and behaviors an object will have. The **object** is the actual thing created from that blueprint.

```
Think of it like:
- Class = Cookie cutter (blueprint)
- Object = Actual cookie (created from blueprint)

You can make many cookies from one cookie cutter!
```

**Step-by-Step:**

```java
// This is a CLASS - a blueprint for Dog objects
public class Dog {
    // PROPERTIES (what a dog HAS)
    String name;
    String breed;
    int age;
    String color;
    
    // BEHAVIORS (what a dog DOES)
    void bark() {
        System.out.println(name + " says: Woof! Woof!");
    }
    
    void eat() {
        System.out.println(name + " is eating...");
    }
    
    void sleep() {
        System.out.println(name + " is sleeping... Zzz");
    }
    
    void displayInfo() {
        System.out.println("--- Dog Information ---");
        System.out.println("Name: " + name);
        System.out.println("Breed: " + breed);
        System.out.println("Age: " + age + " years");
        System.out.println("Color: " + color);
    }
    
    // Main method to test our Dog class
    public static void main(String[] args) {
        System.out.println("===== CREATING DOG OBJECTS =====\n");
        
        // CREATE an object (actual dog) from the Dog class (blueprint)
        Dog myDog = new Dog();
        
        // SET the properties
        myDog.name = "Buddy";
        myDog.breed = "Golden Retriever";
        myDog.age = 3;
        myDog.color = "Golden";
        
        // USE the behaviors (call methods)
        myDog.displayInfo();
        System.out.println();
        myDog.bark();
        myDog.eat();
        myDog.sleep();
        
        System.out.println("\n" + "=".repeat(35));
        
        // CREATE ANOTHER dog object from the SAME class!
        Dog anotherDog = new Dog();
        anotherDog.name = "Max";
        anotherDog.breed = "German Shepherd";
        anotherDog.age = 5;
        anotherDog.color = "Brown and Black";
        
        System.out.println();
        anotherDog.displayInfo();
        System.out.println();
        anotherDog.bark();
        
        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== CREATING DOG OBJECTS =====

--- Dog Information ---
Name: Buddy
Breed: Golden Retriever
Age: 3 years
Color: Golden

Buddy says: Woof! Woof!
Buddy is eating...
Buddy is sleeping... Zzz

===================================

--- Dog Information ---
Name: Max
Breed: German Shepherd
Age: 5 years
Color: Brown and Black

Max says: Woof! Woof!

================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Class** | Blueprint/template for creating objects |
| **Object** | Actual instance created from a class |
| **Properties** | Variables inside the class (name, breed, age, color) |
| **Methods** | Functions inside the class (bark, eat, sleep) |
| **`new` keyword** | Creates a new object from the class |
| **Dot notation** | `object.property` or `object.method()` to access |

**Class vs Object:**
```
Class Dog {          ← Blueprint (one)
    name, breed...
    bark(), eat()...
}

Dog myDog = new Dog();      ← Object 1 (Buddy)
Dog anotherDog = new Dog(); ← Object 2 (Max)
Dog thirdDog = new Dog();   ← Object 3 (Charlie)

One class, many objects!
```

**✅ Success Criteria:**
- [ ] Understand class is a blueprint
- [ ] Can create objects using `new`
- [ ] Can set properties using dot notation
- [ ] Can call methods using dot notation
- [ ] See that multiple objects can be created from one class

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `Dog myDog;` without `new` | Object not created, just declared | `Dog myDog = new Dog();` |
| `myDog.name` without creating object | NullPointerException | Create object first with `new` |
| Forgetting `()` on methods | `myDog.bark` | `myDog.bark()` |

**🎯 Challenge:**
1. Create a third dog object with your own values
2. Add a new method `play()` that prints "[name] is playing!"
3. Add a new property `weight` and display it in `displayInfo()`

---

#### Exercise 3: Adding Methods to Classes (20 minutes)

**What you'll learn:** Creating methods that make objects do things

**Create new class: `BankAccount`**

**Concept:** Methods are the behaviors of an object. They can perform actions, calculate values, or change the object's properties.

```java
public class BankAccount {
    // PROPERTIES
    String accountNumber;
    String accountHolder;
    double balance;
    
    // METHOD 1: Display account information
    void displayAccountInfo() {
        System.out.println("=== Account Information ===");
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
        System.out.println("===========================");
    }
    
    // METHOD 2: Deposit money
    void deposit(double amount) {
        System.out.println("\nDepositing $" + amount + "...");
        balance = balance + amount;  // Update the balance
        System.out.println("Deposit successful!");
        System.out.println("New balance: $" + balance);
    }
    
    // METHOD 3: Withdraw money
    void withdraw(double amount) {
        System.out.println("\nWithdrawing $" + amount + "...");
        
        if (balance >= amount) {
            balance = balance - amount;  // Update the balance
            System.out.println("Withdrawal successful!");
            System.out.println("New balance: $" + balance);
        } else {
            System.out.println("Insufficient funds!");
            System.out.println("Current balance: $" + balance);
        }
    }
    
    // METHOD 4: Check balance
    void checkBalance() {
        System.out.println("\nCurrent balance: $" + balance);
    }
    
    // METHOD 5: Add interest
    void addInterest(double rate) {
        System.out.println("\nAdding " + rate + "% interest...");
        double interest = balance * (rate / 100);
        balance = balance + interest;
        System.out.println("Interest added: $" + interest);
        System.out.println("New balance: $" + balance);
    }
    
    public static void main(String[] args) {
        System.out.println("===== BANK ACCOUNT DEMO =====\n");
        
        // Create a bank account object
        BankAccount account = new BankAccount();
        
        // Set initial values
        account.accountNumber = "ACC001";
        account.accountHolder = "Alice Johnson";
        account.balance = 1000.0;
        
        // Use the methods
        account.displayAccountInfo();
        
        account.deposit(500.0);
        account.withdraw(200.0);
        account.checkBalance();
        account.addInterest(5.0);  // 5% interest
        
        account.displayAccountInfo();
        
        // Try to withdraw more than balance
        account.withdraw(2000.0);
        
        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== BANK ACCOUNT DEMO =====

=== Account Information ===
Account Number: ACC001
Account Holder: Alice Johnson
Balance: $1000.0
===========================

Depositing $500.0...
Deposit successful!
New balance: $1500.0

Withdrawing $200.0...
Withdrawal successful!
New balance: $1300.0

Current balance: $1300.0

Adding 5.0% interest...
Interest added: $65.0
New balance: $1365.0

=== Account Information ===
Account Number: ACC001
Account Holder: Alice Johnson
Balance: $1365.0
===========================

Withdrawing $2000.0...
Insufficient funds!
Current balance: $1365.0

=============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Method with parameters** | `deposit(double amount)` - receives input |
| **Modifying properties** | Methods can change object's properties |
| **Conditional logic** | `if` statement in withdraw method |
| **Method calls** | `account.deposit(500)` - calling with arguments |

**Method Types:**
```
1. Display methods (void, no parameters)
   void displayInfo() { }

2. Action methods (void, with parameters)
   void deposit(double amount) { }

3. Calculation methods (return value)
   double calculateInterest() { return ...; }
```

**✅ Success Criteria:**
- [ ] All methods work correctly
- [ ] Deposit increases balance
- [ ] Withdraw decreases balance (if sufficient funds)
- [ ] Methods can access and modify properties
- [ ] Understand methods make objects "do things"

**🎯 Challenge:**
1. Add a `transfer(BankAccount other, double amount)` method
2. Add a `getAccountAge()` method that returns years since account opened
3. Add validation to prevent negative deposits

---

#### Exercise 4: Multiple Objects with Different States (20 minutes)

**What you'll learn:** Creating multiple objects, each with its own data

**Create new class: `Student`**

**Concept:** Each object has its own copy of properties. Changing one object doesn't affect others.

```java
public class Student {
    // PROPERTIES - each student object has its own copy
    String name;
    int rollNumber;
    double marks;
    char grade;
    
    // METHOD: Calculate grade based on marks
    void calculateGrade() {
        if (marks >= 90) {
            grade = 'A';
        } else if (marks >= 80) {
            grade = 'B';
        } else if (marks >= 70) {
            grade = 'C';
        } else if (marks >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }
    }
    
    // METHOD: Display student information
    void displayInfo() {
        System.out.println("--- Student Information ---");
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marks);
        System.out.println("Grade: " + grade);
        System.out.println("---------------------------");
    }
    
    // METHOD: Check if student passed
    void checkPassStatus() {
        if (marks >= 40) {
            System.out.println(name + " has PASSED ✅");
        } else {
            System.out.println(name + " has FAILED ❌");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== STUDENT MANAGEMENT SYSTEM =====\n");
        
        // Create FIRST student
        Student student1 = new Student();
        student1.name = "Alice";
        student1.rollNumber = 101;
        student1.marks = 85.5;
        student1.calculateGrade();
        
        // Create SECOND student
        Student student2 = new Student();
        student2.name = "Bob";
        student2.rollNumber = 102;
        student2.marks = 72.0;
        student2.calculateGrade();
        
        // Create THIRD student
        Student student3 = new Student();
        student3.name = "Charlie";
        student3.rollNumber = 103;
        student3.marks = 35.0;
        student3.calculateGrade();
        
        // Display all students
        System.out.println("All Students:");
        System.out.println();
        student1.displayInfo();
        System.out.println();
        student2.displayInfo();
        System.out.println();
        student3.displayInfo();
        
        // Check pass status
        System.out.println("\nPass/Fail Status:");
        student1.checkPassStatus();
        student2.checkPassStatus();
        student3.checkPassStatus();
        
        // Demonstrate independence of objects
        System.out.println("\n--- Demonstrating Object Independence ---");
        System.out.println("Changing Alice's marks to 95...");
        student1.marks = 95.0;
        student1.calculateGrade();
        
        System.out.println("\nAlice's new info:");
        student1.displayInfo();
        
        System.out.println("\nBob's info (unchanged):");
        student2.displayInfo();
        
        System.out.println("\n=====================================");
    }
}
```

**Expected Output:**
```
===== STUDENT MANAGEMENT SYSTEM =====

All Students:

--- Student Information ---
Name: Alice
Roll Number: 101
Marks: 85.5
Grade: B
---------------------------

--- Student Information ---
Name: Bob
Roll Number: 102
Marks: 72.0
Grade: C
---------------------------

--- Student Information ---
Name: Charlie
Roll Number: 103
Marks: 35.0
Grade: F
---------------------------

Pass/Fail Status:
Alice has PASSED ✅
Bob has PASSED ✅
Charlie has FAILED ❌

--- Demonstrating Object Independence ---
Changing Alice's marks to 95...

Alice's new info:
--- Student Information ---
Name: Alice
Roll Number: 101
Marks: 95.0
Grade: A
---------------------------

Bob's info (unchanged):
--- Student Information ---
Name: Bob
Roll Number: 102
Marks: 72.0
Grade: C
---------------------------

=====================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Object Independence** | Each object has its own data |
| **Encapsulation** | Data and methods bundled together |
| **State** | Current values of an object's properties |
| **Multiple Instances** | Many objects from one class |

**Object Independence Visualization:**
```
Class Student {
    name, rollNumber, marks, grade
}

student1:           student2:           student3:
name = "Alice"      name = "Bob"        name = "Charlie"
rollNumber = 101    rollNumber = 102    rollNumber = 103
marks = 85.5        marks = 72.0        marks = 35.0
grade = 'B'         grade = 'C'         grade = 'F'

Each object has its OWN copy of properties!
Changing student1 doesn't affect student2 or student3!
```

**✅ Success Criteria:**
- [ ] Three separate student objects created
- [ ] Each has different data
- [ ] Changing one doesn't affect others
- [ ] All methods work for all objects
- [ ] Understand object independence

**🎯 Challenge:**
1. Create 5 students with different marks
2. Add a method `compareWith(Student other)` that compares two students
3. Find the student with highest marks
4. Calculate class average

---

#### Exercise 5: Return Values from Methods (20 minutes)

**What you'll learn:** Methods that calculate and return values

**Create new class: `Calculator`**

**Concept:** Methods can return values that can be used elsewhere. This is different from void methods that just perform actions.

```java
public class Calculator {
    // PROPERTIES
    String brand;
    String model;
    
    // METHOD: Add two numbers and RETURN the result
    int add(int a, int b) {
        int sum = a + b;
        return sum;  // Send the result back
    }
    
    // METHOD: Subtract and return
    int subtract(int a, int b) {
        return a - b;  // Can return directly
    }
    
    // METHOD: Multiply and return
    int multiply(int a, int b) {
        return a * b;
    }
    
    // METHOD: Divide and return (with error checking)
    double divide(double a, double b) {
        if (b == 0) {
            System.out.println("Error: Cannot divide by zero!");
            return 0;
        }
        return a / b;
    }
    
    // METHOD: Calculate percentage and return
    double calculatePercentage(double obtained, double total) {
        return (obtained / total) * 100;
    }
    
    // METHOD: Find maximum of two numbers
    int findMax(int a, int b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
    
    // METHOD: Check if number is even (returns boolean)
    boolean isEven(int number) {
        return number % 2 == 0;
    }
    
    // METHOD: Get calculator info (returns String)
    String getInfo() {
        return brand + " " + model + " Calculator";
    }
    
    public static void main(String[] args) {
        System.out.println("===== CALCULATOR WITH RETURN VALUES =====\n");
        
        // Create calculator object
        Calculator calc = new Calculator();
        calc.brand = "Casio";
        calc.model = "FX-991";
        
        System.out.println("Using: " + calc.getInfo());
        System.out.println();
        
        // Use methods that return values
        int num1 = 15;
        int num2 = 7;
        
        System.out.println("Numbers: " + num1 + " and " + num2);
        System.out.println();
        
        // Store returned values in variables
        int sum = calc.add(num1, num2);
        int difference = calc.subtract(num1, num2);
        int product = calc.multiply(num1, num2);
        double quotient = calc.divide(num1, num2);
        
        System.out.println("Addition: " + num1 + " + " + num2 + " = " + sum);
        System.out.println("Subtraction: " + num1 + " - " + num2 + " = " + difference);
        System.out.println("Multiplication: " + num1 + " × " + num2 + " = " + product);
        System.out.println("Division: " + num1 + " ÷ " + num2 + " = " + quotient);
        
        // Use return value directly in println
        System.out.println("\nMaximum: " + calc.findMax(num1, num2));
        
        // Use boolean return value
        System.out.println("\nIs " + num1 + " even? " + calc.isEven(num1));
        System.out.println("Is " + num2 + " even? " + calc.isEven(num2));
        
        // Calculate percentage
        double obtained = 85;
        double total = 100;
        double percentage = calc.calculatePercentage(obtained, total);
        System.out.println("\nPercentage: " + obtained + "/" + total + " = " + percentage + "%");
        
        // Use return value in calculations
        int result = calc.add(10, 20) + calc.multiply(5, 3);
        System.out.println("\n(10 + 20) + (5 × 3) = " + result);
        
        // Test division by zero
        System.out.println("\nTesting division by zero:");
        double invalid = calc.divide(10, 0);
        System.out.println("Result: " + invalid);
        
        System.out.println("\n=========================================");
    }
}
```

**Expected Output:**
```
===== CALCULATOR WITH RETURN VALUES =====

Using: Casio FX-991 Calculator

Numbers: 15 and 7

Addition: 15 + 7 = 22
Subtraction: 15 - 7 = 8
Multiplication: 15 × 7 = 105
Division: 15 ÷ 7 = 2.142857142857143

Maximum: 15

Is 15 even? false
Is 7 even? false

Percentage: 85.0/100.0 = 85.0%

(10 + 20) + (5 × 3) = 45

Testing division by zero:
Error: Cannot divide by zero!
Result: 0.0

=========================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Return Type** | Specifies what type of value method returns |
| **return statement** | Sends value back to caller |
| **Using returned values** | Can store in variable or use directly |
| **Multiple returns** | Method can have multiple return statements |

**Return Types:**
```java
int add(int a, int b) { return 5; }           // Returns int
double divide(double a, double b) { return 2.5; }  // Returns double
boolean isEven(int n) { return true; }        // Returns boolean
String getName() { return "Alice"; }          // Returns String
void display() { }                            // Returns nothing
```

**Using Return Values:**
```java
// Store in variable
int result = calc.add(5, 3);

// Use directly
System.out.println(calc.add(5, 3));

// Use in calculations
int total = calc.add(10, 20) + calc.add(5, 15);

// Use in conditions
if (calc.isEven(number)) { }
```

**✅ Success Criteria:**
- [ ] Understand methods can return values
- [ ] Know different return types (int, double, boolean, String)
- [ ] Can use returned values in variables
- [ ] Can use returned values directly
- [ ] Understand void vs return methods

**🎯 Challenge:**
1. Add `power(int base, int exponent)` that returns base^exponent
2. Add `factorial(int n)` that returns n!
3. Add `isPrime(int n)` that returns true if prime
4. Use these methods to solve a problem

---

#### Exercise 6: Real-World Application - Student Management System (30 minutes)

**What you'll learn:** Building a complete OOP application

**Create new class: `StudentManagementSystem`**

**Concept:** Putting it all together - classes, objects, properties, methods, and return values in a real application.

```java
public class StudentManagementSystem {
    
    // PROPERTIES - Student data
    int studentId;
    String name;
    int age;
    String course;
    double[] testScores;  // Array to store multiple test scores
    double gpa;
    
    // METHOD: Initialize student with test scores array
    void initializeScores(int numberOfTests) {
        testScores = new double[numberOfTests];
        System.out.println("Initialized " + numberOfTests + " test scores for " + name);
    }
    
    // METHOD: Set a test score
    void setTestScore(int testNumber, double score) {
        if (testNumber >= 0 && testNumber < testScores.length) {
            testScores[testNumber] = score;
            System.out.println("Test " + (testNumber + 1) + " score set to " + score);
        } else {
            System.out.println("Invalid test number!");
        }
    }
    
    // METHOD: Calculate average of all tests (RETURNS double)
    double calculateAverage() {
        if (testScores == null || testScores.length == 0) {
            return 0.0;
        }
        
        double sum = 0;
        for (double score : testScores) {
            sum += score;
        }
        return sum / testScores.length;
    }
    
    // METHOD: Calculate GPA based on average
    void calculateGPA() {
        double average = calculateAverage();
        
        if (average >= 90) {
            gpa = 4.0;
        } else if (average >= 80) {
            gpa = 3.0;
        } else if (average >= 70) {
            gpa = 2.0;
        } else if (average >= 60) {
            gpa = 1.0;
        } else {
            gpa = 0.0;
        }
    }
    
    // METHOD: Get letter grade (RETURNS char)
    char getLetterGrade() {
        double average = calculateAverage();
        
        if (average >= 90) return 'A';
        else if (average >= 80) return 'B';
        else if (average >= 70) return 'C';
        else if (average >= 60) return 'D';
        else return 'F';
    }
    
    // METHOD: Check if student is passing (RETURNS boolean)
    boolean isPassing() {
        return calculateAverage() >= 60;
    }
    
    // METHOD: Get highest test score (RETURNS double)
    double getHighestScore() {
        if (testScores == null || testScores.length == 0) {
            return 0.0;
        }
        
        double highest = testScores[0];
        for (double score : testScores) {
            if (score > highest) {
                highest = score;
            }
        }
        return highest;
    }
    
    // METHOD: Get lowest test score (RETURNS double)
    double getLowestScore() {
        if (testScores == null || testScores.length == 0) {
            return 0.0;
        }
        
        double lowest = testScores[0];
        for (double score : testScores) {
            if (score < lowest) {
                lowest = score;
            }
        }
        return lowest;
    }
    
    // METHOD: Display complete student report
    void displayReport() {
        System.out.println("\n╔════════════════════════════════════╗");
        System.out.println("║       STUDENT REPORT CARD         ║");
        System.out.println("╚════════════════════════════════════╝");
        System.out.println();
        System.out.println("Student ID: " + studentId);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Course: " + course);
        System.out.println();
        
        System.out.println("--- Test Scores ---");
        for (int i = 0; i < testScores.length; i++) {
            System.out.println("Test " + (i + 1) + ": " + testScores[i]);
        }
        System.out.println();
        
        System.out.println("--- Performance Summary ---");
        System.out.printf("Average Score: %.2f\n", calculateAverage());
        System.out.println("Letter Grade: " + getLetterGrade());
        System.out.println("GPA: " + gpa);
        System.out.println("Highest Score: " + getHighestScore());
        System.out.println("Lowest Score: " + getLowestScore());
        System.out.println("Status: " + (isPassing() ? "PASSING ✅" : "FAILING ❌"));
        System.out.println();
        System.out.println("════════════════════════════════════");
    }
    
    // METHOD: Update GPA and display message
    void updateGPA() {
        double oldGPA = gpa;
        calculateGPA();
        
        System.out.println("\nGPA Updated:");
        System.out.println("  Old GPA: " + oldGPA);
        System.out.println("  New GPA: " + gpa);
        
        if (gpa > oldGPA) {
            System.out.println("  📈 Improved!");
        } else if (gpa < oldGPA) {
            System.out.println("  📉 Decreased");
        } else {
            System.out.println("  ➡️  No change");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   STUDENT MANAGEMENT SYSTEM v1.0      ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println();
        
        // Create first student
        StudentManagementSystem student1 = new StudentManagementSystem();
        student1.studentId = 1001;
        student1.name = "Alice Johnson";
        student1.age = 20;
        student1.course = "Computer Science";
        
        // Initialize and set test scores
        System.out.println("--- Setting up " + student1.name + " ---");
        student1.initializeScores(5);
        student1.setTestScore(0, 85.5);
        student1.setTestScore(1, 92.0);
        student1.setTestScore(2, 78.5);
        student1.setTestScore(3, 88.0);
        student1.setTestScore(4, 95.5);
        
        // Calculate GPA
        student1.calculateGPA();
        
        // Display report
        student1.displayReport();
        
        // Create second student
        StudentManagementSystem student2 = new StudentManagementSystem();
        student2.studentId = 1002;
        student2.name = "Bob Smith";
        student2.age = 21;
        student2.course = "Mathematics";
        
        System.out.println("\n--- Setting up " + student2.name + " ---");
        student2.initializeScores(4);
        student2.setTestScore(0, 72.0);
        student2.setTestScore(1, 68.5);
        student2.setTestScore(2, 75.0);
        student2.setTestScore(3, 70.5);
        
        student2.calculateGPA();
        student2.displayReport();
        
        // Demonstrate updating scores
        System.out.println("\n--- Updating Bob's Test 1 Score ---");
        student2.setTestScore(0, 85.0);
        student2.updateGPA();
        
        // Compare students
        System.out.println("\n--- Student Comparison ---");
        System.out.println(student1.name + " average: " + student1.calculateAverage());
        System.out.println(student2.name + " average: " + student2.calculateAverage());
        
        if (student1.calculateAverage() > student2.calculateAverage()) {
            System.out.println(student1.name + " has higher average");
        } else {
            System.out.println(student2.name + " has higher average");
        }
        
        System.out.println("\n════════════════════════════════════════");
        System.out.println("     System Demo Complete");
        System.out.println("════════════════════════════════════════");
    }
}
```

**Expected Output:** (Partial - output is long)
```
╔════════════════════════════════════════╗
║   STUDENT MANAGEMENT SYSTEM v1.0      ║
╚════════════════════════════════════════╝

--- Setting up Alice Johnson ---
Initialized 5 test scores for Alice Johnson
Test 1 score set to 85.5
Test 2 score set to 92.0
Test 3 score set to 78.5
Test 4 score set to 88.0
Test 5 score set to 95.5

╔════════════════════════════════════╗
║       STUDENT REPORT CARD         ║
╚════════════════════════════════════╝

Student ID: 1001
Name: Alice Johnson
Age: 20
Course: Computer Science

--- Test Scores ---
Test 1: 85.5
Test 2: 92.0
Test 3: 78.5
Test 4: 88.0
Test 5: 95.5

--- Performance Summary ---
Average Score: 87.90
Letter Grade: B
GPA: 3.0
Highest Score: 95.5
Lowest Score: 78.5
Status: PASSING ✅

════════════════════════════════════

[... Bob's report ...]

--- Student Comparison ---
Alice Johnson average: 87.9
Bob Smith average: 71.5
Alice Johnson has higher average

════════════════════════════════════
     System Demo Complete
════════════════════════════════════
```

**💡 What This Demonstrates:**

| Feature | Implementation |
|---------|----------------|
| **Properties** | studentId, name, testScores, gpa |
| **Methods with parameters** | setTestScore(int, double) |
| **Methods returning values** | calculateAverage(), getLetterGrade() |
| **Void methods** | displayReport(), updateGPA() |
| **Arrays in objects** | testScores array |
| **Object independence** | Two separate student objects |
| **Real-world logic** | GPA calculation, grade assignment |

**✅ Success Criteria:**
- [ ] Complete working student management system
- [ ] Multiple students with independent data
- [ ] Methods that calculate and return values
- [ ] Methods that modify object state
- [ ] Professional output formatting
- [ ] Understand how OOP organizes code

**🎯 Challenges:**
1. Add a `compareWith(StudentManagementSystem other)` method
2. Add attendance tracking (present/absent days)
3. Add a method to calculate final grade including attendance
4. Create an array of 5 students and find the top performer

---

**✅ Day 10 Complete!**

You've learned:
- ✅ Objects and their properties/behaviors
- ✅ Creating classes (blueprints)
- ✅ Creating objects (instances)
- ✅ Adding methods to classes
- ✅ Multiple independent objects
- ✅ Methods that return values
- ✅ Real-world OOP application

**🎯 Before moving to Day 11:**
- [ ] Understand class vs object
- [ ] Can create classes with properties and methods
- [ ] Know how to create multiple objects
- [ ] Understand object independence
- [ ] Can use methods that return values
- [ ] Built a complete OOP application

---

### Day 11: Classes & Objects Deep Dive

---

#### Exercise 1: Understanding Class Structure (15 minutes)

**What you'll learn:** The anatomy of a class and its components

**Create new class: `Car`**

**Concept:** A class has several parts: properties (fields), methods (behaviors), and constructors. Let's explore each part in detail.

```java
public class Car {
    // ===== PROPERTIES (Instance Variables) =====
    // These belong to each object created from this class
    String brand;
    String model;
    int year;
    String color;
    double price;
    int mileage;
    boolean isRunning;
    
    // ===== METHODS (Behaviors) =====
    
    // Method to start the car
    void start() {
        if (!isRunning) {
            isRunning = true;
            System.out.println(brand + " " + model + " is starting...");
            System.out.println("Engine started! 🚗");
        } else {
            System.out.println("Car is already running!");
        }
    }
    
    // Method to stop the car
    void stop() {
        if (isRunning) {
            isRunning = false;
            System.out.println(brand + " " + model + " is stopping...");
            System.out.println("Engine stopped.");
        } else {
            System.out.println("Car is already stopped!");
        }
    }
    
    // Method to drive (increases mileage)
    void drive(int distance) {
        if (isRunning) {
            mileage += distance;
            System.out.println("Drove " + distance + " km");
            System.out.println("Total mileage: " + mileage + " km");
        } else {
            System.out.println("Cannot drive! Start the car first.");
        }
    }
    
    // Method to display car information
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║        CAR INFORMATION        ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Color: " + color);
        System.out.println("Price: $" + price);
        System.out.println("Mileage: " + mileage + " km");
        System.out.println("Status: " + (isRunning ? "Running 🟢" : "Stopped 🔴"));
        System.out.println("════════════════════════════════");
    }
    
    // Method to calculate car age
    int calculateAge(int currentYear) {
        return currentYear - year;
    }
    
    // Method to check if car is vintage (>25 years old)
    boolean isVintage(int currentYear) {
        return calculateAge(currentYear) > 25;
    }
    
    // Method to apply depreciation
    void applyDepreciation(int currentYear) {
        int age = calculateAge(currentYear);
        double depreciationRate = 0.15; // 15% per year
        double depreciatedValue = price * Math.pow((1 - depreciationRate), age);
        
        System.out.println("\n--- Depreciation Calculation ---");
        System.out.println("Original Price: $" + price);
        System.out.println("Car Age: " + age + " years");
        System.out.println("Current Value: $" + String.format("%.2f", depreciatedValue));
        System.out.println("Depreciation: $" + String.format("%.2f", (price - depreciatedValue)));
    }
    
    public static void main(String[] args) {
        System.out.println("===== CAR CLASS DEMONSTRATION =====\n");
        
        // Create a car object
        Car myCar = new Car();
        
        // Set properties
        myCar.brand = "Toyota";
        myCar.model = "Camry";
        myCar.year = 2020;
        myCar.color = "Silver";
        myCar.price = 25000.0;
        myCar.mileage = 15000;
        myCar.isRunning = false;
        
        // Display initial information
        myCar.displayInfo();
        
        // Use methods
        System.out.println("\n--- Testing Car Operations ---");
        myCar.start();
        myCar.drive(50);
        myCar.drive(30);
        myCar.stop();
        
        // Try to drive when stopped
        System.out.println();
        myCar.drive(20);
        
        // Calculate age and check if vintage
        System.out.println();
        int currentYear = 2024;
        int age = myCar.calculateAge(currentYear);
        System.out.println("Car age: " + age + " years");
        System.out.println("Is vintage? " + myCar.isVintage(currentYear));
        
        // Apply depreciation
        myCar.applyDepreciation(currentYear);
        
        // Display final information
        myCar.displayInfo();
        
        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== CAR CLASS DEMONSTRATION =====

╔════════════════════════════════╗
║        CAR INFORMATION        ║
╚════════════════════════════════╝
Brand: Toyota
Model: Camry
Year: 2020
Color: Silver
Price: $25000.0
Mileage: 15000 km
Status: Stopped 🔴
════════════════════════════════

--- Testing Car Operations ---
Toyota Camry is starting...
Engine started! 🚗
Drove 50 km
Total mileage: 15050 km
Drove 30 km
Total mileage: 15080 km
Toyota Camry is stopping...
Engine stopped.

Cannot drive! Start the car first.

Car age: 4 years
Is vintage? false

--- Depreciation Calculation ---
Original Price: $25000.0
Car Age: 4 years
Current Value: $13050.06
Depreciation: $11949.94

╔════════════════════════════════╗
║        CAR INFORMATION        ║
╚════════════════════════════════╝
Brand: Toyota
Model: Camry
Year: 2020
Color: Silver
Price: $25000.0
Mileage: 15080 km
Status: Stopped 🔴
════════════════════════════════

===================================
```

**💡 Key Concepts:**

| Component | Purpose | Example |
|-----------|---------|---------|
| **Properties** | Store object's state/data | `String brand;` |
| **Methods** | Define object's behavior | `void start() { }` |
| **Parameters** | Input to methods | `void drive(int distance)` |
| **Return values** | Output from methods | `int calculateAge()` |
| **this keyword** | Refers to current object | (We'll see more later) |

**Class Structure:**
```
public class ClassName {
    // 1. PROPERTIES (what object HAS)
    dataType propertyName;
    
    // 2. METHODS (what object DOES)
    returnType methodName(parameters) {
        // method body
    }
    
    // 3. MAIN METHOD (for testing)
    public static void main(String[] args) {
        // create and test objects
    }
}
```

**✅ Success Criteria:**
- [ ] Understand all parts of a class
- [ ] Can identify properties vs methods
- [ ] Know how properties store state
- [ ] Know how methods define behavior
- [ ] See how methods can use and modify properties

**🎯 Challenge:**
1. Add a `refuel(double liters)` method
2. Add a `fuelLevel` property
3. Make `drive()` consume fuel
4. Add a `needsService()` method based on mileage

---

#### Exercise 2: Object Creation and Initialization (20 minutes)

**What you'll learn:** Different ways to create and initialize objects

**Create new class: `Book`**

**Concept:** Objects can be created and initialized in different ways. Understanding these patterns helps write cleaner code.

```java
public class Book {
    // Properties
    String title;
    String author;
    int pages;
    double price;
    String isbn;
    boolean isAvailable;
    
    // Method to display book information
    void displayInfo() {
        System.out.println("╔════════════════════════════════╗");
        System.out.println("║         BOOK DETAILS          ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Title: " + title);
        System.out.println("Author: " + author);
        System.out.println("Pages: " + pages);
        System.out.println("Price: $" + price);
        System.out.println("ISBN: " + isbn);
        System.out.println("Available: " + (isAvailable ? "Yes ✅" : "No ❌"));
        System.out.println("════════════════════════════════");
    }
    
    // Method to borrow book
    void borrow() {
        if (isAvailable) {
            isAvailable = false;
            System.out.println("✅ Book borrowed successfully!");
            System.out.println("   \"" + title + "\" is now unavailable.");
        } else {
            System.out.println("❌ Sorry, \"" + title + "\" is already borrowed.");
        }
    }
    
    // Method to return book
    void returnBook() {
        if (!isAvailable) {
            isAvailable = true;
            System.out.println("✅ Book returned successfully!");
            System.out.println("   \"" + title + "\" is now available.");
        } else {
            System.out.println("⚠️  This book wasn't borrowed.");
        }
    }
    
    // Method to apply discount
    void applyDiscount(double percentage) {
        double discount = price * (percentage / 100);
        double newPrice = price - discount;
        
        System.out.println("\n--- Applying " + percentage + "% Discount ---");
        System.out.println("Original Price: $" + price);
        System.out.println("Discount: $" + String.format("%.2f", discount));
        System.out.println("New Price: $" + String.format("%.2f", newPrice));
        
        price = newPrice;
    }
    
    public static void main(String[] args) {
        System.out.println("===== OBJECT CREATION PATTERNS =====\n");
        
        // PATTERN 1: Create object, then set properties one by one
        System.out.println("--- Pattern 1: Step-by-Step Initialization ---");
        Book book1 = new Book();
        book1.title = "Java Programming";
        book1.author = "John Smith";
        book1.pages = 450;
        book1.price = 49.99;
        book1.isbn = "978-0-123456-78-9";
        book1.isAvailable = true;
        
        book1.displayInfo();
        
        // PATTERN 2: Create and initialize in a more compact way
        System.out.println("\n--- Pattern 2: Compact Initialization ---");
        Book book2 = new Book();
        book2.title = "Python Basics";
        book2.author = "Jane Doe";
        book2.pages = 320;
        book2.price = 39.99;
        book2.isbn = "978-0-987654-32-1";
        book2.isAvailable = true;
        
        book2.displayInfo();
        
        // PATTERN 3: Create multiple objects
        System.out.println("\n--- Pattern 3: Multiple Objects ---");
        Book book3 = new Book();
        book3.title = "Data Structures";
        book3.author = "Alice Johnson";
        book3.pages = 520;
        book3.price = 59.99;
        book3.isbn = "978-0-111222-33-4";
        book3.isAvailable = false;  // Already borrowed
        
        // Test borrowing system
        System.out.println("\n--- Testing Borrow/Return System ---");
        book1.borrow();
        book1.borrow();  // Try to borrow again
        book1.returnBook();
        book1.returnBook();  // Try to return again
        
        // Apply discount
        book2.applyDiscount(20);  // 20% off
        
        // Display all books
        System.out.println("\n--- Library Inventory ---");
        book1.displayInfo();
        System.out.println();
        book2.displayInfo();
        System.out.println();
        book3.displayInfo();
        
        System.out.println("\n====================================");
    }
}
```

**Expected Output:**
```
===== OBJECT CREATION PATTERNS =====

--- Pattern 1: Step-by-Step Initialization ---
╔════════════════════════════════╗
║         BOOK DETAILS          ║
╚════════════════════════════════╝
Title: Java Programming
Author: John Smith
Pages: 450
Price: $49.99
ISBN: 978-0-123456-78-9
Available: Yes ✅
════════════════════════════════

--- Pattern 2: Compact Initialization ---
╔════════════════════════════════╗
║         BOOK DETAILS          ║
╚════════════════════════════════╝
Title: Python Basics
Author: Jane Doe
Pages: 320
Price: $39.99
ISBN: 978-0-987654-32-1
Available: Yes ✅
════════════════════════════════

--- Pattern 3: Multiple Objects ---

--- Testing Borrow/Return System ---
✅ Book borrowed successfully!
   "Java Programming" is now unavailable.
❌ Sorry, "Java Programming" is already borrowed.
✅ Book returned successfully!
   "Java Programming" is now available.
⚠️  This book wasn't borrowed.

--- Applying 20% Discount ---
Original Price: $39.99
Discount: $8.00
New Price: $31.99

--- Library Inventory ---
╔════════════════════════════════╗
║         BOOK DETAILS          ║
╚════════════════════════════════╝
Title: Java Programming
Author: John Smith
Pages: 450
Price: $49.99
ISBN: 978-0-123456-78-9
Available: Yes ✅
════════════════════════════════

╔════════════════════════════════╗
║         BOOK DETAILS          ║
╚════════════════════════════════╝
Title: Python Basics
Author: Jane Doe
Pages: 320
Price: $31.99
ISBN: 978-0-987654-32-1
Available: Yes ✅
════════════════════════════════

╔════════════════════════════════╗
║         BOOK DETAILS          ║
╚════════════════════════════════╝
Title: Data Structures
Author: Alice Johnson
Pages: 520
Price: $59.99
ISBN: 978-0-111222-33-4
Available: No ❌
════════════════════════════════

====================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Object Creation** | `Book book1 = new Book();` creates new object |
| **Initialization** | Setting initial values for properties |
| **Default Values** | Uninitialized: numbers=0, boolean=false, objects=null |
| **State Management** | Properties track object's current state |

**Object Lifecycle:**
```
1. Declaration:  Book book1;
2. Creation:     book1 = new Book();
3. Initialization: book1.title = "...";
4. Usage:        book1.displayInfo();
5. Modification: book1.price = 29.99;
```

**✅ Success Criteria:**
- [ ] Can create multiple objects from one class
- [ ] Understand each object has independent state
- [ ] Can initialize objects with different values
- [ ] Know how to modify object properties
- [ ] See how methods use and change properties

**🎯 Challenge:**
1. Create an array of 5 Book objects
2. Add a method `comparePrice(Book other)` to compare prices
3. Find the most expensive book in your array
4. Calculate total value of all books

---

#### Exercise 3: Methods Calling Other Methods (20 minutes)

**What you'll learn:** How methods within a class can call each other

**Create new class: `Rectangle`**

**Concept:** Methods in a class can call other methods in the same class. This helps organize code and avoid repetition.

```java
public class Rectangle {
    // Properties
    double length;
    double width;
    
    // Method to calculate area
    double calculateArea() {
        return length * width;
    }
    
    // Method to calculate perimeter
    double calculatePerimeter() {
        return 2 * (length + width);
    }
    
    // Method to calculate diagonal
    double calculateDiagonal() {
        return Math.sqrt(length * length + width * width);
    }
    
    // Method that CALLS other methods
    void displayAllMeasurements() {
        System.out.println("╔════════════════════════════════╗");
        System.out.println("║    RECTANGLE MEASUREMENTS     ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Length: " + length + " units");
        System.out.println("Width: " + width + " units");
        System.out.println();
        
        // Calling other methods from this method!
        System.out.println("Area: " + calculateArea() + " square units");
        System.out.println("Perimeter: " + calculatePerimeter() + " units");
        System.out.printf("Diagonal: %.2f units\n", calculateDiagonal());
        System.out.println("════════════════════════════════");
    }
    
    // Method to check if it's a square
    boolean isSquare() {
        return length == width;
    }
    
    // Method to compare with another rectangle
    String compareArea(Rectangle other) {
        double thisArea = calculateArea();  // Call own method
        double otherArea = other.calculateArea();  // Call other object's method
        
        if (thisArea > otherArea) {
            return "This rectangle is larger";
        } else if (thisArea < otherArea) {
            return "Other rectangle is larger";
        } else {
            return "Both rectangles have equal area";
        }
    }
    
    // Method to scale (resize) the rectangle
    void scale(double factor) {
        System.out.println("\n--- Scaling Rectangle ---");
        System.out.println("Original dimensions: " + length + " × " + width);
        System.out.println("Original area: " + calculateArea());
        
        length *= factor;
        width *= factor;
        
        System.out.println("New dimensions: " + length + " × " + width);
        System.out.println("New area: " + calculateArea());
        System.out.println("Scale factor: " + factor + "x");
    }
    
    // Method to display summary (calls multiple methods)
    void displaySummary() {
        System.out.println("\n--- Rectangle Summary ---");
        System.out.println("Dimensions: " + length + " × " + width);
        System.out.println("Type: " + (isSquare() ? "Square" : "Rectangle"));
        System.out.println("Area: " + calculateArea());
        System.out.println("Perimeter: " + calculatePerimeter());
        
        // Calculate and display area-to-perimeter ratio
        double ratio = calculateArea() / calculatePerimeter();
        System.out.printf("Area/Perimeter Ratio: %.2f\n", ratio);
    }
    
    public static void main(String[] args) {
        System.out.println("===== METHODS CALLING METHODS =====\n");
        
        // Create first rectangle
        Rectangle rect1 = new Rectangle();
        rect1.length = 10.0;
        rect1.width = 5.0;
        
        System.out.println("Rectangle 1:");
        rect1.displayAllMeasurements();
        
        // Create second rectangle (square)
        Rectangle rect2 = new Rectangle();
        rect2.length = 7.0;
        rect2.width = 7.0;
        
        System.out.println("\nRectangle 2:");
        rect2.displayAllMeasurements();
        
        // Check if square
        System.out.println("\n--- Square Check ---");
        System.out.println("Rectangle 1 is square? " + rect1.isSquare());
        System.out.println("Rectangle 2 is square? " + rect2.isSquare());
        
        // Compare areas
        System.out.println("\n--- Area Comparison ---");
        System.out.println(rect1.compareArea(rect2));
        
        // Display summaries
        rect1.displaySummary();
        rect2.displaySummary();
        
        // Scale rectangle
        rect1.scale(2.0);  // Double the size
        
        // Compare again after scaling
        System.out.println("\n--- After Scaling ---");
        System.out.println(rect1.compareArea(rect2));
        
        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== METHODS CALLING METHODS =====

Rectangle 1:
╔════════════════════════════════╗
║    RECTANGLE MEASUREMENTS     ║
╚════════════════════════════════╝
Length: 10.0 units
Width: 5.0 units

Area: 50.0 square units
Perimeter: 30.0 units
Diagonal: 11.18 units
════════════════════════════════

Rectangle 2:
╔════════════════════════════════╗
║    RECTANGLE MEASUREMENTS     ║
╚════════════════════════════════╝
Length: 7.0 units
Width: 7.0 units

Area: 49.0 square units
Perimeter: 28.0 units
Diagonal: 9.90 units
════════════════════════════════

--- Square Check ---
Rectangle 1 is square? false
Rectangle 2 is square? true

--- Area Comparison ---
This rectangle is larger

--- Rectangle Summary ---
Dimensions: 10.0 × 5.0
Type: Rectangle
Area: 50.0
Perimeter: 30.0
Area/Perimeter Ratio: 1.67

--- Rectangle Summary ---
Dimensions: 7.0 × 7.0
Type: Square
Area: 49.0
Perimeter: 28.0
Area/Perimeter Ratio: 1.75

--- Scaling Rectangle ---
Original dimensions: 10.0 × 5.0
Original area: 50.0
New dimensions: 20.0 × 10.0
New area: 200.0
Scale factor: 2.0x

--- After Scaling ---
This rectangle is larger

===================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Method Reuse** | One method calls another to avoid code duplication |
| **Composition** | Complex methods built from simpler ones |
| **this (implicit)** | Methods call other methods in same object |
| **Object Communication** | Methods can call methods on other objects |

**Method Calling Patterns:**
```java
class Example {
    // Method A
    void methodA() {
        methodB();  // Calling another method in same class
    }
    
    // Method B
    void methodB() {
        // Do something
    }
    
    // Method calling method with return value
    void methodC() {
        int result = methodD();  // Store returned value
        System.out.println(result);
    }
    
    int methodD() {
        return 42;
    }
}
```

**✅ Success Criteria:**
- [ ] Understand methods can call other methods
- [ ] See how this avoids code duplication
- [ ] Can build complex methods from simple ones
- [ ] Know how to call methods on other objects
- [ ] Understand method composition

**🎯 Challenge:**
1. Add a `rotate()` method that swaps length and width
2. Add a `fitInside(Rectangle other)` method to check if this rectangle fits inside another
3. Create a `clone()` method that creates a copy with same dimensions
4. Add validation methods that other methods call

---

#### Exercise 4: Static vs Instance Members (25 minutes)

**What you'll learn:** The difference between static (class-level) and instance (object-level) members

**Create new class: `Counter`**

**Concept:** 
- **Instance members** belong to each object (each object has its own copy)
- **Static members** belong to the class (shared by all objects)

```java
public class Counter {
    // INSTANCE VARIABLE - each object has its own copy
    int instanceCount;
    
    // STATIC VARIABLE - shared by ALL objects
    static int staticCount;
    
    // INSTANCE METHOD - works with instance variables
    void incrementInstance() {
        instanceCount++;
        System.out.println("Instance count: " + instanceCount);
    }
    
    // STATIC METHOD - works with static variables
    static void incrementStatic() {
        staticCount++;
        System.out.println("Static count: " + staticCount);
    }
    
    // INSTANCE METHOD - can access both instance and static
    void displayBoth() {
        System.out.println("  Instance: " + instanceCount);
        System.out.println("  Static: " + staticCount);
    }
    
    // STATIC METHOD - can only access static members
    static void displayStatic() {
        System.out.println("  Static count: " + staticCount);
        // Cannot access instanceCount here!
        // System.out.println(instanceCount);  // ERROR!
    }
    
    public static void main(String[] args) {
        System.out.println("===== STATIC VS INSTANCE =====\n");
        
        // Create first counter object
        Counter counter1 = new Counter();
        System.out.println("Created counter1");
        System.out.println("Initial values:");
        counter1.displayBoth();
        
        // Increment counter1
        System.out.println("\nIncrementing counter1:");
        counter1.incrementInstance();
        counter1.incrementStatic();
        
        System.out.println("\nCounter1 values:");
        counter1.displayBoth();
        
        // Create second counter object
        System.out.println("\n--- Creating counter2 ---");
        Counter counter2 = new Counter();
        System.out.println("Counter2 initial values:");
        counter2.displayBoth();
        
        System.out.println("\n💡 Notice: counter2's instance count is 0");
        System.out.println("   But static count is 1 (shared from counter1!)");
        
        // Increment counter2
        System.out.println("\nIncrementing counter2:");
        counter2.incrementInstance();
        counter2.incrementStatic();
        
        // Display both counters
        System.out.println("\n--- Final Values ---");
        System.out.println("Counter1:");
        counter1.displayBoth();
        System.out.println("\nCounter2:");
        counter2.displayBoth();
        
        System.out.println("\n💡 Key Insight:");
        System.out.println("   Instance counts are different (1 and 1)");
        System.out.println("   Static count is same for both (2)");
        
        // Call static method without object
        System.out.println("\n--- Calling Static Method ---");
        Counter.incrementStatic();  // No object needed!
        Counter.displayStatic();
        
        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== STATIC VS INSTANCE =====

Created counter1
Initial values:
  Instance: 0
  Static: 0

Incrementing counter1:
Instance count: 1
Static count: 1

Counter1 values:
  Instance: 1
  Static: 1

--- Creating counter2 ---
Counter2 initial values:
  Instance: 0
  Static: 1

💡 Notice: counter2's instance count is 0
   But static count is 1 (shared from counter1!)

Incrementing counter2:
Instance count: 1
Static count: 2

--- Final Values ---
Counter1:
  Instance: 1
  Static: 2

Counter2:
  Instance: 1
  Static: 2

💡 Key Insight:
   Instance counts are different (1 and 1)
   Static count is same for both (2)

--- Calling Static Method ---
Static count: 3
  Static count: 3

==============================
```

**💡 Key Concepts:**

| Feature | Instance | Static |
|---------|----------|--------|
| **Belongs to** | Each object | The class |
| **Keyword** | No keyword | `static` keyword |
| **Access** | Through object | Through class or object |
| **Memory** | One copy per object | One copy total |
| **Use case** | Object-specific data | Shared data/utilities |

**Visual Representation:**
```
Class Counter {
    static staticCount = 0  ← ONE copy shared by all
}

counter1:               counter2:               counter3:
instanceCount = 5       instanceCount = 3       instanceCount = 8
↓                       ↓                       ↓
All share same staticCount!
```

**Common Uses of Static:**
```java
// Utility methods
static int max(int a, int b) { }

// Constants
static final double PI = 3.14159;

// Counters
static int objectCount = 0;

// Main method
public static void main(String[] args) { }
```

**✅ Success Criteria:**
- [ ] Understand instance variables are per-object
- [ ] Understand static variables are per-class
- [ ] Know static methods can't access instance members
- [ ] Can call static methods without creating objects
- [ ] See how static members are shared

**🎯 Challenge:**
1. Create a `Student` class with static `totalStudents` counter
2. Increment `totalStudents` each time a student is created
3. Add a static method `getTotalStudents()`
4. Create 5 students and verify the count

---

#### Exercise 5: The `this` Keyword (20 minutes)

**What you'll learn:** Using `this` to refer to the current object

**Create new class: `Employee`**

**Concept:** `this` is a reference to the current object. It's useful when parameter names match property names, or when you need to pass the current object to another method.

```java
public class Employee {
    // Properties
    String name;
    int id;
    double salary;
    String department;
    
    // Method with parameters that match property names
    void setDetails(String name, int id, double salary, String department) {
        // Without 'this', this would assign parameter to itself!
        // name = name;  // WRONG! Assigns parameter to parameter
        
        // With 'this', we can distinguish property from parameter
        this.name = name;           // this.name = property, name = parameter
        this.id = id;
        this.salary = salary;
        this.department = department;
        
        System.out.println("✅ Employee details set for: " + this.name);
    }
    
    // Method to display information
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║      EMPLOYEE INFORMATION     ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("ID: " + this.id);
        System.out.println("Name: " + this.name);
        System.out.println("Department: " + this.department);
        System.out.println("Salary: $" + this.salary);
        System.out.println("════════════════════════════════");
    }
    
    // Method to give raise
    void giveRaise(double percentage) {
        double raiseAmount = this.salary * (percentage / 100);
        double oldSalary = this.salary;
        this.salary += raiseAmount;
        
        System.out.println("\n--- Salary Raise ---");
        System.out.println("Employee: " + this.name);
        System.out.println("Old Salary: $" + oldSalary);
        System.out.println("Raise: " + percentage + "% ($" + raiseAmount + ")");
        System.out.println("New Salary: $" + this.salary);
    }
    
    // Method to compare salary with another employee
    boolean earnMoreThan(Employee other) {
        return this.salary > other.salary;
    }
    
    // Method that returns this object
    Employee getThis() {
        return this;  // Returns the current object
    }
    
    // Method chaining example - returns this
    Employee setName(String name) {
        this.name = name;
        return this;  // Return current object for chaining
    }
    
    Employee setId(int id) {
        this.id = id;
        return this;
    }
    
    Employee setSalary(double salary) {
        this.salary = salary;
        return this;
    }
    
    // Method to display comparison
    void compareWith(Employee other) {
        System.out.println("\n--- Salary Comparison ---");
        System.out.println(this.name + ": $" + this.salary);
        System.out.println(other.name + ": $" + other.salary);
        
        if (this.earnMoreThan(other)) {
            System.out.println(this.name + " earns more");
        } else if (other.earnMoreThan(this)) {
            System.out.println(other.name + " earns more");
        } else {
            System.out.println("Both earn the same");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== THE 'this' KEYWORD =====\n");
        
        // Create first employee
        Employee emp1 = new Employee();
        emp1.setDetails("Alice Johnson", 1001, 75000, "Engineering");
        emp1.displayInfo();
        
        // Create second employee
        Employee emp2 = new Employee();
        emp2.setDetails("Bob Smith", 1002, 65000, "Marketing");
        emp2.displayInfo();
        
        // Give raises
        emp1.giveRaise(10);  // 10% raise
        emp2.giveRaise(15);  // 15% raise
        
        // Compare salaries
        emp1.compareWith(emp2);
        
        // Demonstrate method chaining
        System.out.println("\n--- Method Chaining Example ---");
        Employee emp3 = new Employee();
        emp3.setName("Charlie Brown")
            .setId(1003)
            .setSalary(80000);  // Chaining!
        
        System.out.println("Created employee using method chaining:");
        System.out.println("Name: " + emp3.name);
        System.out.println("ID: " + emp3.id);
        System.out.println("Salary: $" + emp3.salary);
        
        // Demonstrate getThis()
        System.out.println("\n--- Using getThis() ---");
        Employee sameEmp = emp1.getThis();
        System.out.println("emp1 and sameEmp refer to same object? " + (emp1 == sameEmp));
        
        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== THE 'this' KEYWORD =====

✅ Employee details set for: Alice Johnson

╔════════════════════════════════╗
║      EMPLOYEE INFORMATION     ║
╚════════════════════════════════╝
ID: 1001
Name: Alice Johnson
Department: Engineering
Salary: $75000.0
════════════════════════════════
✅ Employee details set for: Bob Smith

╔════════════════════════════════╗
║      EMPLOYEE INFORMATION     ║
╚════════════════════════════════╝
ID: 1002
Name: Bob Smith
Department: Marketing
Salary: $65000.0
════════════════════════════════

--- Salary Raise ---
Employee: Alice Johnson
Old Salary: $75000.0
Raise: 10.0% ($7500.0)
New Salary: $82500.0

--- Salary Raise ---
Employee: Bob Smith
Old Salary: $65000.0
Raise: 15.0% ($9750.0)
New Salary: $74750.0

--- Salary Comparison ---
Alice Johnson: $82500.0
Bob Smith: $74750.0
Alice Johnson earns more

--- Method Chaining Example ---
Created employee using method chaining:
Name: Charlie Brown
ID: 1003
Salary: $80000.0

--- Using getThis() ---
emp1 and sameEmp refer to same object? true

==============================
```

**💡 Key Concepts:**

| Use of `this` | Purpose | Example |
|---------------|---------|---------|
| **Disambiguate** | Distinguish property from parameter | `this.name = name;` |
| **Pass current object** | Send object to another method | `other.compare(this);` |
| **Return current object** | Enable method chaining | `return this;` |
| **Explicit reference** | Make code clearer | `this.displayInfo();` |

**When to Use `this`:**
```java
// 1. When parameter names match property names
void setName(String name) {
    this.name = name;  // MUST use this
}

// 2. When passing current object
void compareWith(Employee other) {
    if (other.earnMoreThan(this)) { }  // Pass this object
}

// 3. For method chaining
Employee setAge(int age) {
    this.age = age;
    return this;  // Return current object
}

// 4. Optional but clearer
void display() {
    System.out.println(this.name);  // this is optional here
}
```

**✅ Success Criteria:**
- [ ] Understand `this` refers to current object
- [ ] Know when `this` is required vs optional
- [ ] Can use `this` to disambiguate names
- [ ] Understand method chaining with `this`
- [ ] Can pass current object using `this`

**🎯 Challenge:**
1. Create a `Product` class with method chaining for all setters
2. Add a `copyFrom(Product other)` method that copies all properties
3. Add a `isCheaperThan(Product other)` method
4. Test all methods with multiple products

---

#### Exercise 6: Real-World Application - Library Management System (30 minutes)

**What you'll learn:** Building a complete OOP application with multiple interacting classes

**Create new class: `LibraryManagementSystem`**

**Concept:** Bringing together everything learned - classes, objects, properties, methods, static members, and the `this` keyword in a real-world application.

```java
public class LibraryManagementSystem {
    
    // PROPERTIES
    String bookId;
    String title;
    String author;
    String isbn;
    int totalCopies;
    int availableCopies;
    double price;
    String category;
    
    // STATIC PROPERTIES - shared by all books
    static int totalBooks = 0;
    static int totalBorrowedBooks = 0;
    
    // METHOD: Initialize book (like a setup method)
    void initializeBook(String bookId, String title, String author, String isbn, 
                       int copies, double price, String category) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.totalCopies = copies;
        this.availableCopies = copies;
        this.price = price;
        this.category = category;
        
        totalBooks++;  // Increment static counter
        System.out.println("✅ Book added: " + this.title);
    }
    
    // METHOD: Display book details
    void displayDetails() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║           BOOK DETAILS                ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Book ID: " + this.bookId);
        System.out.println("Title: " + this.title);
        System.out.println("Author: " + this.author);
        System.out.println("ISBN: " + this.isbn);
        System.out.println("Category: " + this.category);
        System.out.println("Price: $" + this.price);
        System.out.println("Total Copies: " + this.totalCopies);
        System.out.println("Available: " + this.availableCopies);
        System.out.println("Status: " + (this.isAvailable() ? "Available ✅" : "All Borrowed ❌"));
        System.out.println("════════════════════════════════════════");
    }
    
    // METHOD: Check if book is available
    boolean isAvailable() {
        return this.availableCopies > 0;
    }
    
    // METHOD: Borrow book
    boolean borrowBook() {
        if (this.isAvailable()) {
            this.availableCopies--;
            totalBorrowedBooks++;
            System.out.println("\n✅ Book borrowed successfully!");
            System.out.println("   Title: " + this.title);
            System.out.println("   Remaining copies: " + this.availableCopies);
            return true;
        } else {
            System.out.println("\n❌ Sorry, \"" + this.title + "\" is not available.");
            System.out.println("   All copies are currently borrowed.");
            return false;
        }
    }
    
    // METHOD: Return book
    void returnBook() {
        if (this.availableCopies < this.totalCopies) {
            this.availableCopies++;
            totalBorrowedBooks--;
            System.out.println("\n✅ Book returned successfully!");
            System.out.println("   Title: " + this.title);
            System.out.println("   Available copies: " + this.availableCopies);
        } else {
            System.out.println("\n⚠️  Error: All copies are already in library.");
        }
    }
    
    // METHOD: Add more copies
    void addCopies(int count) {
        this.totalCopies += count;
        this.availableCopies += count;
        System.out.println("\n📚 Added " + count + " copies of \"" + this.title + "\"");
        System.out.println("   Total copies now: " + this.totalCopies);
    }
    
    // METHOD: Apply discount
    void applyDiscount(double percentage) {
        double discount = this.price * (percentage / 100);
        double oldPrice = this.price;
        this.price -= discount;
        
        System.out.println("\n💰 Discount Applied!");
        System.out.println("   Book: " + this.title);
        System.out.println("   Original Price: $" + oldPrice);
        System.out.println("   Discount: " + percentage + "% ($" + String.format("%.2f", discount) + ")");
        System.out.println("   New Price: $" + String.format("%.2f", this.price));
    }
    
    // METHOD: Compare with another book
    void compareWith(LibraryManagementSystem other) {
        System.out.println("\n--- Book Comparison ---");
        System.out.println("Book 1: " + this.title + " by " + this.author);
        System.out.println("  Price: $" + this.price);
        System.out.println("  Available: " + this.availableCopies);
        System.out.println();
        System.out.println("Book 2: " + other.title + " by " + other.author);
        System.out.println("  Price: $" + other.price);
        System.out.println("  Available: " + other.availableCopies);
        System.out.println();
        
        if (this.price < other.price) {
            System.out.println("💡 \"" + this.title + "\" is cheaper");
        } else if (this.price > other.price) {
            System.out.println("💡 \"" + other.title + "\" is cheaper");
        } else {
            System.out.println("💡 Both books have the same price");
        }
    }
    
    // METHOD: Check if same author
    boolean isSameAuthor(LibraryManagementSystem other) {
        return this.author.equals(other.author);
    }
    
    // METHOD: Display availability status
    void displayAvailability() {
        System.out.println("\n📖 " + this.title);
        System.out.println("   Available: " + this.availableCopies + "/" + this.totalCopies);
        
        double availabilityPercentage = (this.availableCopies * 100.0) / this.totalCopies;
        System.out.print("   Status: ");
        
        if (availabilityPercentage == 100) {
            System.out.println("All copies available 🟢");
        } else if (availabilityPercentage >= 50) {
            System.out.println("Good availability 🟡");
        } else if (availabilityPercentage > 0) {
            System.out.println("Low availability 🟠");
        } else {
            System.out.println("Not available 🔴");
        }
    }
    
    // STATIC METHOD: Display library statistics
    static void displayLibraryStats() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║       LIBRARY STATISTICS              ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Total Books in System: " + totalBooks);
        System.out.println("Total Borrowed Books: " + totalBorrowedBooks);
        System.out.println("Books in Library: " + (totalBooks - totalBorrowedBooks));
        System.out.println("════════════════════════════════════════");
    }
    
    // STATIC METHOD: Reset statistics
    static void resetStats() {
        totalBooks = 0;
        totalBorrowedBooks = 0;
        System.out.println("\n🔄 Library statistics reset.");
    }
    
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   LIBRARY MANAGEMENT SYSTEM v2.0      ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println();
        
        // Create Book 1
        LibraryManagementSystem book1 = new LibraryManagementSystem();
        book1.initializeBook("B001", "Java Programming", "John Smith", 
                           "978-0-123456-78-9", 5, 49.99, "Programming");
        
        // Create Book 2
        LibraryManagementSystem book2 = new LibraryManagementSystem();
        book2.initializeBook("B002", "Python Basics", "Jane Doe", 
                           "978-0-987654-32-1", 3, 39.99, "Programming");
        
        // Create Book 3
        LibraryManagementSystem book3 = new LibraryManagementSystem();
        book3.initializeBook("B003", "Data Structures", "John Smith", 
                           "978-0-111222-33-4", 4, 59.99, "Computer Science");
        
        // Display all books
        System.out.println("\n" + "=".repeat(42));
        System.out.println("INITIAL LIBRARY INVENTORY");
        System.out.println("=".repeat(42));
        
        book1.displayDetails();
        book2.displayDetails();
        book3.displayDetails();
        
        // Display library statistics
        displayLibraryStats();
        
        // Test borrowing
        System.out.println("\n" + "=".repeat(42));
        System.out.println("BORROWING OPERATIONS");
        System.out.println("=".repeat(42));
        
        book1.borrowBook();
        book1.borrowBook();
        book2.borrowBook();
        book2.borrowBook();
        book2.borrowBook();
        book2.borrowBook();  // Should fail - no copies left
        
        // Display availability
        System.out.println("\n" + "=".repeat(42));
        System.out.println("AVAILABILITY STATUS");
        System.out.println("=".repeat(42));
        
        book1.displayAvailability();
        book2.displayAvailability();
        book3.displayAvailability();
        
        // Display updated statistics
        displayLibraryStats();
        
        // Test returning
        System.out.println("\n" + "=".repeat(42));
        System.out.println("RETURN OPERATIONS");
        System.out.println("=".repeat(42));
        
        book1.returnBook();
        book2.returnBook();
        
        // Add more copies
        System.out.println("\n" + "=".repeat(42));
        System.out.println("INVENTORY MANAGEMENT");
        System.out.println("=".repeat(42));
        
        book2.addCopies(2);
        
        // Apply discounts
        System.out.println("\n" + "=".repeat(42));
        System.out.println("DISCOUNT OPERATIONS");
        System.out.println("=".repeat(42));
        
        book1.applyDiscount(15);  // 15% off
        book3.applyDiscount(20);  // 20% off
        
        // Compare books
        System.out.println("\n" + "=".repeat(42));
        System.out.println("BOOK COMPARISONS");
        System.out.println("=".repeat(42));
        
        book1.compareWith(book2);
        
        // Check same author
        System.out.println("\n--- Author Check ---");
        System.out.println("Do \"" + book1.title + "\" and \"" + book3.title + 
                         "\" have the same author?");
        System.out.println(book1.isSameAuthor(book3) ? "Yes ✅" : "No ❌");
        
        // Final statistics
        System.out.println("\n" + "=".repeat(42));
        System.out.println("FINAL REPORT");
        System.out.println("=".repeat(42));
        
        displayLibraryStats();
        
        System.out.println("\n" + "=".repeat(42));
        System.out.println("   System Demo Complete");
        System.out.println("=".repeat(42));
    }
}
```

**Expected Output:** (Partial - output is long)
```
╔════════════════════════════════════════╗
║   LIBRARY MANAGEMENT SYSTEM v2.0      ║
╚════════════════════════════════════════╝

✅ Book added: Java Programming
✅ Book added: Python Basics
✅ Book added: Data Structures

==========================================
INITIAL LIBRARY INVENTORY
==========================================

╔════════════════════════════════════════╗
║           BOOK DETAILS                ║
╚════════════════════════════════════════╝
Book ID: B001
Title: Java Programming
Author: John Smith
ISBN: 978-0-123456-78-9
Category: Programming
Price: $49.99
Total Copies: 5
Available: 5
Status: Available ✅
════════════════════════════════════════

[... other books ...]

╔════════════════════════════════════════╗
║       LIBRARY STATISTICS              ║
╚════════════════════════════════════════╝
Total Books in System: 3
Total Borrowed Books: 0
Books in Library: 3
════════════════════════════════════════

==========================================
BORROWING OPERATIONS
==========================================

✅ Book borrowed successfully!
   Title: Java Programming
   Remaining copies: 4

✅ Book borrowed successfully!
   Title: Java Programming
   Remaining copies: 3

✅ Book borrowed successfully!
   Title: Python Basics
   Remaining copies: 2

[... more operations ...]

❌ Sorry, "Python Basics" is not available.
   All copies are currently borrowed.

==========================================
AVAILABILITY STATUS
==========================================

📖 Java Programming
   Available: 3/5
   Status: Good availability 🟡

📖 Python Basics
   Available: 0/3
   Status: Not available 🔴

📖 Data Structures
   Available: 4/4
   Status: All copies available 🟢

[... rest of output ...]
```

**💡 What This Demonstrates:**

| Feature | Implementation |
|---------|----------------|
| **Instance Properties** | Each book has its own data |
| **Static Properties** | Shared counters across all books |
| **this keyword** | Distinguishing properties from parameters |
| **Method Chaining** | Methods calling other methods |
| **Object Interaction** | Books comparing with each other |
| **Static Methods** | Library-wide statistics |
| **Real-World Logic** | Borrowing, returning, inventory management |

**Key OOP Concepts Applied:**
```
1. ENCAPSULATION
   - Data (properties) and behavior (methods) together
   
2. ABSTRACTION
   - Complex operations hidden in simple methods
   
3. OBJECT INDEPENDENCE
   - Each book object maintains its own state
   
4. CLASS-LEVEL DATA
   - Static members shared by all objects
   
5. OBJECT COMMUNICATION
   - Objects can interact (compareWith, isSameAuthor)
```

**✅ Success Criteria:**
- [ ] Complete working library system
- [ ] Multiple books with independent data
- [ ] Static counters working correctly
- [ ] Borrowing/returning logic works
- [ ] Books can compare with each other
- [ ] Professional output formatting
- [ ] All OOP concepts demonstrated

**🎯 Challenges:**
1. Add a `Member` class to track who borrowed which books
2. Add a `dueDate` property and `isOverdue()` method
3. Add a `reserveBook()` method for unavailable books
4. Create a search method to find books by author or title
5. Add a rating system (1-5 stars) with average rating calculation

---

**✅ Day 11 Complete!**

You've learned:
- ✅ Detailed class structure (properties, methods)
- ✅ Object creation and initialization patterns
- ✅ Methods calling other methods
- ✅ Static vs instance members
- ✅ The `this` keyword and its uses
- ✅ Real-world OOP application (Library System)

**🎯 Before moving to Day 12:**
- [ ] Understand class anatomy completely
- [ ] Can create and initialize objects multiple ways
- [ ] Know difference between static and instance
- [ ] Comfortable using `this` keyword
- [ ] Can build methods that call other methods
- [ ] Built a complete multi-object system

**Next Up: Day 12 - Constructors (Special methods for object initialization)**

---

### Day 12: Constructors

---

#### Exercise 1: Your First Constructor (15 minutes)

**What you'll learn:** What constructors are and how to create them

**Create new class: `Person`**

**Concept:** A **constructor** is a special method that runs automatically when you create an object. It's used to initialize the object's properties.

```java
public class Person {
    // Properties
    String name;
    int age;
    String city;
    
    // CONSTRUCTOR - special method with same name as class
    // No return type (not even void!)
    Person(String name, int age, String city) {
        this.name = name;
        this.age = age;
        this.city = city;
        System.out.println("✅ Person object created: " + name);
    }
    
    // Method to display information
    void displayInfo() {
        System.out.println("\n--- Person Information ---");
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
        System.out.println("City: " + this.city);
        System.out.println("-------------------------");
    }
    
    public static void main(String[] args) {
        System.out.println("===== CONSTRUCTORS DEMO =====\n");
        
        // OLD WAY (without constructor):
        // Person p = new Person();
        // p.name = "Alice";
        // p.age = 25;
        // p.city = "New York";
        
        // NEW WAY (with constructor):
        // Create and initialize in ONE step!
        Person person1 = new Person("Alice", 25, "New York");
        person1.displayInfo();
        
        Person person2 = new Person("Bob", 30, "London");
        person2.displayInfo();
        
        Person person3 = new Person("Charlie", 22, "Tokyo");
        person3.displayInfo();
        
        System.out.println("\n💡 Key Insight:");
        System.out.println("   Constructor runs automatically when object is created");
        System.out.println("   It initializes the object with values");
        System.out.println("   Much cleaner than setting properties one by one!");
        
        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== CONSTRUCTORS DEMO =====

✅ Person object created: Alice

--- Person Information ---
Name: Alice
Age: 25
City: New York
-------------------------
✅ Person object created: Bob

--- Person Information ---
Name: Bob
Age: 30
City: London
-------------------------
✅ Person object created: Charlie

--- Person Information ---
Name: Charlie
Age: 22
City: Tokyo
-------------------------

💡 Key Insight:
   Constructor runs automatically when object is created
   It initializes the object with values
   Much cleaner than setting properties one by one!

=============================
```

**💡 Key Concepts:**

| Feature | Constructor | Regular Method |
|---------|-------------|----------------|
| **Name** | Same as class name | Any valid name |
| **Return type** | No return type | Must have return type |
| **When called** | Automatically when object created | Manually when needed |
| **Purpose** | Initialize object | Perform actions |
| **Syntax** | `ClassName(params) { }` | `returnType name(params) { }` |

**Constructor Rules:**
```java
// ✅ CORRECT Constructor
Person(String name, int age) {
    this.name = name;
    this.age = age;
}

// ❌ WRONG - has return type
void Person(String name, int age) { }

// ❌ WRONG - different name than class
void person(String name, int age) { }

// ❌ WRONG - returns something
Person(String name) {
    return this;  // Constructors don't return!
}
```

**✅ Success Criteria:**
- [ ] Understand constructor is a special method
- [ ] Know constructor name must match class name
- [ ] Know constructor has no return type
- [ ] See constructor runs automatically
- [ ] Can create objects with initial values

**🎯 Challenge:**
1. Add a `profession` property
2. Update constructor to include profession
3. Create 3 people with different professions
4. Add validation in constructor (e.g., age must be positive)

---

#### Exercise 2: Default Constructor vs Parameterized Constructor (20 minutes)

**What you'll learn:** Different types of constructors

**Create new class: `BankAccount`**

**Concept:** 
- **Default Constructor**: No parameters, sets default values
- **Parameterized Constructor**: Takes parameters to set custom values

```java
public class BankAccount {
    String accountNumber;
    String accountHolder;
    double balance;
    String accountType;
    
    // DEFAULT CONSTRUCTOR (no parameters)
    BankAccount() {
        this.accountNumber = "ACC000000";
        this.accountHolder = "Unknown";
        this.balance = 0.0;
        this.accountType = "Savings";
        System.out.println("✅ Default account created");
    }
    
    // PARAMETERIZED CONSTRUCTOR (with parameters)
    BankAccount(String accountNumber, String accountHolder, double balance, String accountType) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.accountType = accountType;
        System.out.println("✅ Custom account created for: " + accountHolder);
    }
    
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║      ACCOUNT INFORMATION      ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Account Number: " + this.accountNumber);
        System.out.println("Account Holder: " + this.accountHolder);
        System.out.println("Balance: $" + this.balance);
        System.out.println("Type: " + this.accountType);
        System.out.println("════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== DEFAULT VS PARAMETERIZED CONSTRUCTORS =====\n");
        
        // Using DEFAULT constructor
        System.out.println("--- Creating with Default Constructor ---");
        BankAccount account1 = new BankAccount();
        account1.displayInfo();
        
        // Using PARAMETERIZED constructor
        System.out.println("\n--- Creating with Parameterized Constructor ---");
        BankAccount account2 = new BankAccount("ACC123456", "Alice Johnson", 5000.0, "Checking");
        account2.displayInfo();
        
        BankAccount account3 = new BankAccount("ACC789012", "Bob Smith", 10000.0, "Savings");
        account3.displayInfo();
        
        System.out.println("\n💡 Key Differences:");
        System.out.println("   Default Constructor: Quick creation with default values");
        System.out.println("   Parameterized Constructor: Custom values at creation");
        System.out.println("   Both are useful in different situations!");
        
        System.out.println("\n================================================");
    }
}
```

**Expected Output:**
```
===== DEFAULT VS PARAMETERIZED CONSTRUCTORS =====

--- Creating with Default Constructor ---
✅ Default account created

╔════════════════════════════════╗
║      ACCOUNT INFORMATION      ║
╚════════════════════════════════╝
Account Number: ACC000000
Account Holder: Unknown
Balance: $0.0
Type: Savings
════════════════════════════════

--- Creating with Parameterized Constructor ---
✅ Custom account created for: Alice Johnson

╔════════════════════════════════╗
║      ACCOUNT INFORMATION      ║
╚════════════════════════════════╝
Account Number: ACC123456
Account Holder: Alice Johnson
Balance: $5000.0
Type: Checking
════════════════════════════════
✅ Custom account created for: Bob Smith

╔════════════════════════════════╗
║      ACCOUNT INFORMATION      ║
╚════════════════════════════════╝
Account Number: ACC789012
Account Holder: Bob Smith
Balance: $10000.0
Type: Savings
════════════════════════════════

💡 Key Differences:
   Default Constructor: Quick creation with default values
   Parameterized Constructor: Custom values at creation
   Both are useful in different situations!

================================================
```

**💡 Key Concepts:**

| Constructor Type | Parameters | Use Case |
|-----------------|------------|----------|
| **Default** | None | Quick object creation with defaults |
| **Parameterized** | One or more | Custom initialization |
| **No Constructor** | Java provides default | Basic objects |

**Important Notes:**
```java
// If you DON'T write ANY constructor:
// Java automatically provides a default constructor
class Example {
    int x;
    // Java adds: Example() { }
}

// If you write ANY constructor:
// Java does NOT provide default constructor
class Example {
    int x;
    Example(int x) { this.x = x; }
    // No default constructor!
    // Example e = new Example(); // ERROR!
}
```

**✅ Success Criteria:**
- [ ] Understand default constructor sets default values
- [ ] Understand parameterized constructor takes custom values
- [ ] Know when to use each type
- [ ] Can create both types of constructors
- [ ] Understand Java's automatic default constructor

**🎯 Challenge:**
1. Add a third constructor that takes only accountHolder and balance
2. Set accountNumber automatically (generate it)
3. Set accountType to "Savings" by default
4. Test all three constructors

---

#### Exercise 3: Constructor Overloading (25 minutes)

**What you'll learn:** Creating multiple constructors with different parameters

**Create new class: `Product`**

**Concept:** **Constructor Overloading** = Having multiple constructors with different parameter lists. Java chooses the right one based on arguments passed.

```java
public class Product {
    String productId;
    String name;
    double price;
    int quantity;
    String category;
    
    // CONSTRUCTOR 1: All parameters
    Product(String productId, String name, double price, int quantity, String category) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        System.out.println("✅ Product created with all details: " + name);
    }
    
    // CONSTRUCTOR 2: Without category (default to "General")
    Product(String productId, String name, double price, int quantity) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = "General";  // Default value
        System.out.println("✅ Product created (default category): " + name);
    }
    
    // CONSTRUCTOR 3: Only essential info (quantity defaults to 0)
    Product(String productId, String name, double price) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = 0;  // Default
        this.category = "General";  // Default
        System.out.println("✅ Product created (minimal info): " + name);
    }
    
    // CONSTRUCTOR 4: Copy constructor (creates copy of another product)
    Product(Product other) {
        this.productId = other.productId + "-COPY";
        this.name = other.name + " (Copy)";
        this.price = other.price;
        this.quantity = other.quantity;
        this.category = other.category;
        System.out.println("✅ Product copied: " + this.name);
    }
    
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║      PRODUCT INFORMATION      ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Product ID: " + this.productId);
        System.out.println("Name: " + this.name);
        System.out.println("Price: $" + this.price);
        System.out.println("Quantity: " + this.quantity);
        System.out.println("Category: " + this.category);
        System.out.println("════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== CONSTRUCTOR OVERLOADING =====\n");
        
        // Using CONSTRUCTOR 1 (all parameters)
        System.out.println("--- Using Constructor 1 (5 parameters) ---");
        Product product1 = new Product("P001", "Laptop", 999.99, 10, "Electronics");
        product1.displayInfo();
        
        // Using CONSTRUCTOR 2 (4 parameters)
        System.out.println("\n--- Using Constructor 2 (4 parameters) ---");
        Product product2 = new Product("P002", "Desk Chair", 149.99, 25);
        product2.displayInfo();
        
        // Using CONSTRUCTOR 3 (3 parameters)
        System.out.println("\n--- Using Constructor 3 (3 parameters) ---");
        Product product3 = new Product("P003", "Coffee Mug", 12.99);
        product3.displayInfo();
        
        // Using CONSTRUCTOR 4 (copy constructor)
        System.out.println("\n--- Using Constructor 4 (copy constructor) ---");
        Product product4 = new Product(product1);
        product4.displayInfo();
        
        System.out.println("\n💡 Key Insight:");
        System.out.println("   Java automatically chooses the right constructor");
        System.out.println("   based on the number and types of arguments!");
        System.out.println("   This makes object creation very flexible!");
        
        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== CONSTRUCTOR OVERLOADING =====

--- Using Constructor 1 (5 parameters) ---
✅ Product created with all details: Laptop

╔════════════════════════════════╗
║      PRODUCT INFORMATION      ║
╚════════════════════════════════╝
Product ID: P001
Name: Laptop
Price: $999.99
Quantity: 10
Category: Electronics
════════════════════════════════

--- Using Constructor 2 (4 parameters) ---
✅ Product created (default category): Desk Chair

╔════════════════════════════════╗
║      PRODUCT INFORMATION      ║
╚════════════════════════════════╝
Product ID: P002
Name: Desk Chair
Price: $149.99
Quantity: 25
Category: General
════════════════════════════════

--- Using Constructor 3 (3 parameters) ---
✅ Product created (minimal info): Coffee Mug

╔════════════════════════════════╗
║      PRODUCT INFORMATION      ║
╚════════════════════════════════╝
Product ID: P003
Name: Coffee Mug
Price: $12.99
Quantity: 0
Category: General
════════════════════════════════

--- Using Constructor 4 (copy constructor) ---
✅ Product copied: Laptop (Copy)

╔════════════════════════════════╗
║      PRODUCT INFORMATION      ║
╚════════════════════════════════╝
Product ID: P001-COPY
Name: Laptop (Copy)
Price: $999.99
Quantity: 10
Category: Electronics
════════════════════════════════

💡 Key Insight:
   Java automatically chooses the right constructor
   based on the number and types of arguments!
   This makes object creation very flexible!

===================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Constructor Overloading** | Multiple constructors with different parameters |
| **Flexibility** | Users can create objects in different ways |
| **Default Values** | Constructors can set defaults for missing parameters |
| **Copy Constructor** | Creates a copy of an existing object |

**Constructor Overloading Rules:**
```java
// ✅ VALID - Different number of parameters
Product(String id, String name) { }
Product(String id, String name, double price) { }

// ✅ VALID - Different types of parameters
Product(String id, int code) { }
Product(int code, String id) { }  // Order matters!

// ❌ INVALID - Same parameters (only names different)
Product(String id, String name) { }
Product(String productId, String productName) { }  // ERROR!
```

**✅ Success Criteria:**
- [ ] Understand multiple constructors can exist
- [ ] Know Java chooses based on arguments
- [ ] Can create constructors with different parameters
- [ ] Understand copy constructor concept
- [ ] See how overloading provides flexibility

**🎯 Challenge:**
1. Add a constructor that takes only name and price
2. Add a constructor that takes name, price, and category
3. Create 5 products using all different constructors
4. Add validation in constructors (price > 0, quantity >= 0)

---

#### Exercise 4: Constructor Chaining with `this()` (25 minutes)

**What you'll learn:** Calling one constructor from another using `this()`

**Create new class: `Student`**

**Concept:** **Constructor Chaining** = One constructor calling another constructor in the same class using `this()`. This avoids code duplication.

```java
public class Student {
    int studentId;
    String name;
    int age;
    String course;
    double gpa;
    
    // CONSTRUCTOR 1: All parameters (master constructor)
    Student(int studentId, String name, int age, String course, double gpa) {
        this.studentId = studentId;
        this.name = name;
        this.age = age;
        this.course = course;
        this.gpa = gpa;
        System.out.println("✅ Full student record created: " + name);
    }
    
    // CONSTRUCTOR 2: Without GPA (calls Constructor 1)
    Student(int studentId, String name, int age, String course) {
        this(studentId, name, age, course, 0.0);  // Call Constructor 1
        System.out.println("   (GPA set to default: 0.0)");
    }
    
    // CONSTRUCTOR 3: Without course and GPA (calls Constructor 2)
    Student(int studentId, String name, int age) {
        this(studentId, name, age, "Undecided");  // Call Constructor 2
        System.out.println("   (Course set to default: Undecided)");
    }
    
    // CONSTRUCTOR 4: Minimal info (calls Constructor 3)
    Student(int studentId, String name) {
        this(studentId, name, 18);  // Call Constructor 3
        System.out.println("   (Age set to default: 18)");
    }
    
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║     STUDENT INFORMATION       ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Student ID: " + this.studentId);
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
        System.out.println("Course: " + this.course);
        System.out.println("GPA: " + this.gpa);
        System.out.println("════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== CONSTRUCTOR CHAINING =====\n");
        
        // Using different constructors
        System.out.println("--- Creating Student 1 (all parameters) ---");
        Student student1 = new Student(1001, "Alice", 20, "Computer Science", 3.8);
        student1.displayInfo();
        
        System.out.println("\n--- Creating Student 2 (no GPA) ---");
        Student student2 = new Student(1002, "Bob", 21, "Mathematics");
        student2.displayInfo();
        
        System.out.println("\n--- Creating Student 3 (no course, no GPA) ---");
        Student student3 = new Student(1003, "Charlie", 19);
        student3.displayInfo();
        
        System.out.println("\n--- Creating Student 4 (minimal info) ---");
        Student student4 = new Student(1004, "Diana");
        student4.displayInfo();
        
        System.out.println("\n💡 Constructor Chaining Flow:");
        System.out.println("   Student(id, name)");
        System.out.println("   → calls Student(id, name, 18)");
        System.out.println("   → calls Student(id, name, 18, \"Undecided\")");
        System.out.println("   → calls Student(id, name, 18, \"Undecided\", 0.0)");
        System.out.println("   All initialization happens in the master constructor!");
        
        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== CONSTRUCTOR CHAINING =====

--- Creating Student 1 (all parameters) ---
✅ Full student record created: Alice

╔════════════════════════════════╗
║     STUDENT INFORMATION       ║
╚════════════════════════════════╝
Student ID: 1001
Name: Alice
Age: 20
Course: Computer Science
GPA: 3.8
════════════════════════════════

--- Creating Student 2 (no GPA) ---
✅ Full student record created: Bob
   (GPA set to default: 0.0)

╔════════════════════════════════╗
║     STUDENT INFORMATION       ║
╚════════════════════════════════╝
Student ID: 1002
Name: Bob
Age: 21
Course: Mathematics
GPA: 0.0
════════════════════════════════

--- Creating Student 3 (no course, no GPA) ---
✅ Full student record created: Charlie
   (Course set to default: Undecided)
   (GPA set to default: 0.0)

╔════════════════════════════════╗
║     STUDENT INFORMATION       ║
╚════════════════════════════════╝
Student ID: 1003
Name: Charlie
Age: 19
Course: Undecided
GPA: 0.0
════════════════════════════════

--- Creating Student 4 (minimal info) ---
✅ Full student record created: Diana
   (Age set to default: 18)
   (Course set to default: Undecided)
   (GPA set to default: 0.0)

╔════════════════════════════════╗
║     STUDENT INFORMATION       ║
╚════════════════════════════════╝
Student ID: 1004
Name: Diana
Age: 18
Course: Undecided
GPA: 0.0
════════════════════════════════

💡 Constructor Chaining Flow:
   Student(id, name)
   → calls Student(id, name, 18)
   → calls Student(id, name, 18, "Undecided")
   → calls Student(id, name, 18, "Undecided", 0.0)
   All initialization happens in the master constructor!

================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **this()** | Calls another constructor in same class |
| **Must be first** | `this()` must be the first statement in constructor |
| **Avoids duplication** | Write initialization code once |
| **Chain of calls** | Constructors can chain to each other |

**Constructor Chaining Rules:**
```java
// ✅ CORRECT - this() is first statement
Student(int id, String name) {
    this(id, name, 18);  // First statement
    System.out.println("Done");
}

// ❌ WRONG - this() not first
Student(int id, String name) {
    System.out.println("Creating...");
    this(id, name, 18);  // ERROR! Must be first
}

// ❌ WRONG - can't call this() and super() together
Student(int id) {
    super();  // Call parent constructor
    this(id, "Unknown");  // ERROR! Can't have both
}
```

**Benefits of Constructor Chaining:**
```
1. DRY Principle (Don't Repeat Yourself)
   - Write initialization logic once
   - All constructors use the same logic

2. Easier Maintenance
   - Change logic in one place
   - All constructors automatically updated

3. Consistency
   - All objects initialized the same way
   - No risk of forgetting initialization steps
```

**✅ Success Criteria:**
- [ ] Understand `this()` calls another constructor
- [ ] Know `this()` must be first statement
- [ ] See how chaining avoids code duplication
- [ ] Can create constructor chains
- [ ] Understand the flow of constructor calls

**🎯 Challenge:**
1. Add validation in the master constructor
2. Create a 5-parameter constructor that validates all inputs
3. Make all other constructors chain to it
4. Test with valid and invalid data

---

#### Exercise 5: Copy Constructor Deep Dive (25 minutes)

**What you'll learn:** Creating copies of objects and understanding shallow vs deep copy

**Create new class: `BankAccount`**

**Concept:** **Copy Constructor** = A constructor that creates a new object as a copy of an existing object. Important for creating independent copies.

```java
public class BankAccount {
    String accountNumber;
    String accountHolder;
    double balance;
    String accountType;
    
    // Regular constructor
    BankAccount(String accountNumber, String accountHolder, double balance, String accountType) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.accountType = accountType;
        System.out.println("✅ New account created: " + accountNumber);
    }
    
    // COPY CONSTRUCTOR - Creates a copy of another account
    BankAccount(BankAccount original) {
        // Copy all properties from original
        this.accountNumber = original.accountNumber + "-COPY";
        this.accountHolder = original.accountHolder + " (Copy)";
        this.balance = original.balance;
        this.accountType = original.accountType;
        System.out.println("✅ Account copied: " + this.accountNumber);
    }
    
    void deposit(double amount) {
        this.balance += amount;
        System.out.println("💰 Deposited $" + amount + " to " + this.accountNumber);
        System.out.println("   New balance: $" + this.balance);
    }
    
    void withdraw(double amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            System.out.println("💸 Withdrew $" + amount + " from " + this.accountNumber);
            System.out.println("   New balance: $" + this.balance);
        } else {
            System.out.println("❌ Insufficient funds in " + this.accountNumber);
        }
    }
    
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║    BANK ACCOUNT INFORMATION   ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Account Number: " + this.accountNumber);
        System.out.println("Account Holder: " + this.accountHolder);
        System.out.println("Balance: $" + this.balance);
        System.out.println("Account Type: " + this.accountType);
        System.out.println("════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== COPY CONSTRUCTOR =====\n");
        
        // Create original account
        System.out.println("--- Creating Original Account ---");
        BankAccount original = new BankAccount("ACC001", "John Doe", 1000.0, "Savings");
        original.displayInfo();
        
        // Create copy using copy constructor
        System.out.println("\n--- Creating Copy of Account ---");
        BankAccount copy = new BankAccount(original);
        copy.displayInfo();
        
        // Modify original account
        System.out.println("\n--- Modifying Original Account ---");
        original.deposit(500.0);
        
        // Check both accounts
        System.out.println("\n--- After Modification ---");
        System.out.println("Original Account:");
        original.displayInfo();
        
        System.out.println("\nCopy Account:");
        copy.displayInfo();
        
        System.out.println("\n💡 Key Insight:");
        System.out.println("   The copy is INDEPENDENT of the original!");
        System.out.println("   Changes to original don't affect the copy.");
        System.out.println("   Each object has its own memory space.");
        
        // Demonstrate independence
        System.out.println("\n--- Demonstrating Independence ---");
        copy.withdraw(200.0);
        
        System.out.println("\nFinal State:");
        System.out.println("Original balance: $" + original.balance);
        System.out.println("Copy balance: $" + copy.balance);
        
        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== COPY CONSTRUCTOR =====

--- Creating Original Account ---
✅ New account created: ACC001

╔════════════════════════════════╗
║    BANK ACCOUNT INFORMATION   ║
╚════════════════════════════════╝
Account Number: ACC001
Account Holder: John Doe
Balance: $1000.0
Account Type: Savings
════════════════════════════════

--- Creating Copy of Account ---
✅ Account copied: ACC001-COPY

╔════════════════════════════════╗
║    BANK ACCOUNT INFORMATION   ║
╚════════════════════════════════╝
Account Number: ACC001-COPY
Account Holder: John Doe (Copy)
Balance: $1000.0
Account Type: Savings
════════════════════════════════

--- Modifying Original Account ---
💰 Deposited $500.0 to ACC001
   New balance: $1500.0

--- After Modification ---
Original Account:

╔════════════════════════════════╗
║    BANK ACCOUNT INFORMATION   ║
╚════════════════════════════════╝
Account Number: ACC001
Account Holder: John Doe
Balance: $1500.0
Account Type: Savings
════════════════════════════════

Copy Account:

╔════════════════════════════════╗
║    BANK ACCOUNT INFORMATION   ║
╚════════════════════════════════╝
Account Number: ACC001-COPY
Account Holder: John Doe (Copy)
Balance: $1000.0
Account Type: Savings
════════════════════════════════

💡 Key Insight:
   The copy is INDEPENDENT of the original!
   Changes to original don't affect the copy.
   Each object has its own memory space.

--- Demonstrating Independence ---
💸 Withdrew $200.0 from ACC001-COPY
   New balance: $800.0

Final State:
Original balance: $1500.0
Copy balance: $800.0

============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Copy Constructor** | Creates new object as copy of existing one |
| **Independence** | Copy is separate from original |
| **Shallow Copy** | Copies primitive values directly |
| **Deep Copy** | For objects, creates new copies (advanced) |

**Why Copy Constructors Matter:**
```java
// WITHOUT copy constructor - both variables point to SAME object
BankAccount acc1 = new BankAccount("ACC001", "John", 1000.0, "Savings");
BankAccount acc2 = acc1;  // Both point to same object!
acc2.deposit(500);  // Changes acc1 too! ⚠️

// WITH copy constructor - creates INDEPENDENT copy
BankAccount acc1 = new BankAccount("ACC001", "John", 1000.0, "Savings");
BankAccount acc2 = new BankAccount(acc1);  // New independent object
acc2.deposit(500);  // Only acc2 changes ✅
```

**Common Use Cases:**
```
1. Backup/Snapshot
   - Save current state before modifications
   - Undo functionality

2. Template Pattern
   - Create similar objects from a template
   - Modify copies without affecting template

3. Data Protection
   - Return copies instead of originals
   - Prevent external modifications
```

**✅ Success Criteria:**
- [ ] Understand copy constructor creates independent copy
- [ ] Can implement copy constructor
- [ ] Know difference between copy and reference
- [ ] See how copies are independent
- [ ] Understand when to use copy constructors

**🎯 Challenge:**
1. Create a `Person` class with copy constructor
2. Add an array property (like `hobbies[]`)
3. Implement deep copy for the array
4. Test that modifying copy's array doesn't affect original

---

#### Exercise 6: Real-World Application - Employee Management System (30 minutes)

**What you'll learn:** Applying all constructor concepts in a complete system

**Create new class: `Employee`**

**Concept:** Combining all constructor techniques in a real-world application.

```java
public class Employee {
    // Properties
    int employeeId;
    String name;
    String department;
    double salary;
    int yearsOfExperience;
    String position;
    
    // CONSTRUCTOR 1: Full details (master constructor with validation)
    Employee(int employeeId, String name, String department, double salary, 
             int yearsOfExperience, String position) {
        // Validation
        if (employeeId <= 0) {
            System.out.println("❌ Invalid employee ID. Setting to 1.");
            this.employeeId = 1;
        } else {
            this.employeeId = employeeId;
        }
        
        if (name == null || name.trim().isEmpty()) {
            System.out.println("❌ Invalid name. Setting to 'Unknown'.");
            this.name = "Unknown";
        } else {
            this.name = name;
        }
        
        if (salary < 0) {
            System.out.println("❌ Invalid salary. Setting to 0.");
            this.salary = 0;
        } else {
            this.salary = salary;
        }
        
        this.department = department;
        this.yearsOfExperience = yearsOfExperience;
        this.position = position;
        
        System.out.println("✅ Employee created: " + this.name + " (ID: " + this.employeeId + ")");
    }
    
    // CONSTRUCTOR 2: Without position (chains to Constructor 1)
    Employee(int employeeId, String name, String department, double salary, int yearsOfExperience) {
        this(employeeId, name, department, salary, yearsOfExperience, "Staff");
        System.out.println("   Position set to default: Staff");
    }
    
    // CONSTRUCTOR 3: New employee (minimal experience)
    Employee(int employeeId, String name, String department, double salary) {
        this(employeeId, name, department, salary, 0, "Junior");
        System.out.println("   New employee defaults applied");
    }
    
    // CONSTRUCTOR 4: Copy constructor
    Employee(Employee original) {
        this(original.employeeId + 1000, 
             original.name + " (Transfer)", 
             original.department, 
             original.salary, 
             original.yearsOfExperience, 
             original.position);
        System.out.println("   Employee record copied for transfer");
    }
    
    // Method to give raise
    void giveRaise(double percentage) {
        double raiseAmount = this.salary * (percentage / 100);
        this.salary += raiseAmount;
        System.out.println("💰 " + this.name + " received " + percentage + "% raise");
        System.out.println("   Raise amount: $" + raiseAmount);
        System.out.println("   New salary: $" + this.salary);
    }
    
    // Method to promote
    void promote(String newPosition) {
        System.out.println("🎉 " + this.name + " promoted!");
        System.out.println("   From: " + this.position);
        this.position = newPosition;
        System.out.println("   To: " + this.position);
    }
    
    // Method to add experience
    void addExperience(int years) {
        this.yearsOfExperience += years;
        System.out.println("📈 " + this.name + " now has " + this.yearsOfExperience + " years of experience");
    }
    
    // Display employee information
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      EMPLOYEE INFORMATION             ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Employee ID: " + this.employeeId);
        System.out.println("Name: " + this.name);
        System.out.println("Department: " + this.department);
        System.out.println("Position: " + this.position);
        System.out.println("Salary: $" + this.salary);
        System.out.println("Years of Experience: " + this.yearsOfExperience);
        System.out.println("════════════════════════════════════════");
    }
    
    // Display summary for all employees
    static void displaySummary(Employee[] employees) {
        System.out.println("\n╔════════════════════════════════════════════════════════════╗");
        System.out.println("║                  EMPLOYEE SUMMARY                         ║");
        System.out.println("╚════════════════════════════════════════════════════════════╝");
        System.out.println(String.format("%-6s %-20s %-15s %-15s %s", 
                          "ID", "Name", "Department", "Position", "Salary"));
        System.out.println("────────────────────────────────────────────────────────────");
        
        for (Employee emp : employees) {
            System.out.println(String.format("%-6d %-20s %-15s %-15s $%.2f", 
                              emp.employeeId, emp.name, emp.department, 
                              emp.position, emp.salary));
        }
        System.out.println("════════════════════════════════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== EMPLOYEE MANAGEMENT SYSTEM =====\n");
        
        // Create employees using different constructors
        System.out.println("--- Creating Employees ---\n");
        
        Employee emp1 = new Employee(101, "Alice Johnson", "Engineering", 75000, 5, "Senior Developer");
        Employee emp2 = new Employee(102, "Bob Smith", "Marketing", 60000, 3);
        Employee emp3 = new Employee(103, "Charlie Brown", "Sales", 50000);
        Employee emp4 = new Employee(emp1);  // Copy for transfer
        
        // Display all employees
        Employee[] employees = {emp1, emp2, emp3, emp4};
        Employee.displaySummary(employees);
        
        // Perform operations
        System.out.println("\n--- Employee Operations ---\n");
        
        emp1.giveRaise(10);
        System.out.println();
        
        emp2.promote("Marketing Manager");
        System.out.println();
        
        emp3.addExperience(1);
        emp3.giveRaise(5);
        System.out.println();
        
        // Display updated information
        System.out.println("\n--- Updated Employee Information ---");
        emp1.displayInfo();
        emp2.displayInfo();
        emp3.displayInfo();
        
        // Final summary
        Employee.displaySummary(employees);
        
        System.out.println("\n💡 Constructor Concepts Applied:");
        System.out.println("   ✅ Constructor overloading (4 different constructors)");
        System.out.println("   ✅ Constructor chaining (using this())");
        System.out.println("   ✅ Input validation (checking for invalid data)");
        System.out.println("   ✅ Copy constructor (for employee transfer)");
        System.out.println("   ✅ Default values (for missing parameters)");
        
        System.out.println("\n======================================");
    }
}
```

**Expected Output:**
```
===== EMPLOYEE MANAGEMENT SYSTEM =====

--- Creating Employees ---

✅ Employee created: Alice Johnson (ID: 101)
✅ Employee created: Bob Smith (ID: 102)
   Position set to default: Staff
✅ Employee created: Charlie Brown (ID: 103)
   New employee defaults applied
✅ Employee created: Alice Johnson (Transfer) (ID: 1101)
   Employee record copied for transfer

╔════════════════════════════════════════════════════════════╗
║                  EMPLOYEE SUMMARY                         ║
╚════════════════════════════════════════════════════════════╝
ID     Name                 Department      Position        Salary
────────────────────────────────────────────────────────────
101    Alice Johnson        Engineering     Senior Developer $75000.00
102    Bob Smith            Marketing       Staff           $60000.00
103    Charlie Brown        Sales           Junior          $50000.00
1101   Alice Johnson (Transfer) Engineering     Senior Developer $75000.00
════════════════════════════════════════════════════════════

--- Employee Operations ---

💰 Alice Johnson received 10.0% raise
   Raise amount: $7500.0
   New salary: $82500.0

🎉 Bob Smith promoted!
   From: Staff
   To: Marketing Manager

📈 Charlie Brown now has 1 years of experience
💰 Charlie Brown received 5.0% raise
   Raise amount: $2500.0
   New salary: $52500.0

--- Updated Employee Information ---

╔════════════════════════════════════════╗
║      EMPLOYEE INFORMATION             ║
╚════════════════════════════════════════╝
Employee ID: 101
Name: Alice Johnson
Department: Engineering
Position: Senior Developer
Salary: $82500.0
Years of Experience: 5
════════════════════════════════════════

╔════════════════════════════════════════╗
║      EMPLOYEE INFORMATION             ║
╚════════════════════════════════════════╝
Employee ID: 102
Name: Bob Smith
Department: Marketing
Position: Marketing Manager
Salary: $60000.0
Years of Experience: 3
════════════════════════════════════════

╔════════════════════════════════════════╗
║      EMPLOYEE INFORMATION             ║
╚════════════════════════════════════════╝
Employee ID: 103
Name: Charlie Brown
Department: Sales
Position: Junior
Salary: $52500.0
Years of Experience: 1
════════════════════════════════════════

╔════════════════════════════════════════════════════════════╗
║                  EMPLOYEE SUMMARY                         ║
╚════════════════════════════════════════════════════════════╝
ID     Name                 Department      Position        Salary
────────────────────────────────────────────────────────────
101    Alice Johnson        Engineering     Senior Developer $82500.00
102    Bob Smith            Marketing       Marketing Manager $60000.00
103    Charlie Brown        Sales           Junior          $52500.00
1101   Alice Johnson (Transfer) Engineering     Senior Developer $75000.00
════════════════════════════════════════════════════════════

💡 Constructor Concepts Applied:
   ✅ Constructor overloading (4 different constructors)
   ✅ Constructor chaining (using this())
   ✅ Input validation (checking for invalid data)
   ✅ Copy constructor (for employee transfer)
   ✅ Default values (for missing parameters)

======================================
```

**💡 Key Concepts:**

| Concept | Application in System |
|---------|----------------------|
| **Constructor Overloading** | 4 constructors for different scenarios |
| **Constructor Chaining** | All chain to master constructor |
| **Validation** | Master constructor validates all inputs |
| **Copy Constructor** | Creates employee transfer records |
| **Default Values** | Provides sensible defaults |

**Real-World Benefits:**
```
1. Flexibility
   - Create employees with varying amounts of information
   - System adapts to available data

2. Data Integrity
   - Validation ensures no invalid data
   - Consistent initialization

3. Code Reusability
   - Constructor chaining avoids duplication
   - Easy to maintain and update

4. Business Logic
   - Copy constructor for transfers
   - Default values match business rules
```

**✅ Success Criteria:**
- [ ] Understand complete constructor implementation
- [ ] Can combine all constructor techniques
- [ ] See validation in constructors
- [ ] Understand real-world applications
- [ ] Can create similar systems independently

**🎯 Challenge:**
1. Add a constructor that reads employee data from a file
2. Add a constructor that takes a comma-separated string
3. Implement a method to export employee data
4. Add more validation rules (e.g., department must be from a list)
5. Create a `Manager` class that extends `Employee`

---

### 🎓 Day 12 Summary: Constructors

**What You Learned:**
1. ✅ Constructor basics and syntax
2. ✅ Default vs parameterized constructors
3. ✅ Constructor overloading
4. ✅ Constructor chaining with `this()`
5. ✅ Copy constructors
6. ✅ Real-world application

**Key Takeaways:**
- Constructors initialize objects when created
- Can have multiple constructors (overloading)
- Use `this()` to chain constructors
- Copy constructors create independent copies
- Validation in constructors ensures data integrity

**Next Steps:**
- Day 13: Encapsulation (private fields, getters/setters)
- Day 14: Inheritance (extends, super)
- Day 15: Polymorphism (method overriding)

---

## Day 13: Encapsulation (2 hours)

**Learning Objectives:**
- Understand data hiding and encapsulation
- Learn to use private fields and public methods
- Master getters and setters
- Implement validation in setters
- Understand immutability
- Build secure, maintainable classes

---

#### Exercise 1: Understanding Private Fields and Data Hiding (20 minutes)

**What you'll learn:** Why we hide data and how to protect class properties

**Create new class: `BankAccount`**

**Concept:** **Encapsulation** = Hiding internal data and providing controlled access through methods. This protects data from invalid modifications.

```java
public class BankAccount {
    // ❌ BAD: Public fields - anyone can modify directly
    // public double balance;  // DON'T DO THIS!
    
    // ✅ GOOD: Private fields - controlled access only
    private String accountNumber;
    private String accountHolder;
    private double balance;
    
    // Constructor
    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        System.out.println("✅ Account created: " + accountNumber);
    }
    
    // Public method to deposit (controlled access)
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("💰 Deposited: $" + amount);
            System.out.println("   New balance: $" + this.balance);
        } else {
            System.out.println("❌ Invalid deposit amount: $" + amount);
        }
    }
    
    // Public method to withdraw (controlled access with validation)
    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("❌ Invalid withdrawal amount: $" + amount);
        } else if (amount > this.balance) {
            System.out.println("❌ Insufficient funds!");
            System.out.println("   Requested: $" + amount);
            System.out.println("   Available: $" + this.balance);
        } else {
            this.balance -= amount;
            System.out.println("💸 Withdrew: $" + amount);
            System.out.println("   New balance: $" + this.balance);
        }
    }
    
    // Public method to check balance (read-only access)
    public double getBalance() {
        return this.balance;
    }
    
    // Public method to display account info
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║    BANK ACCOUNT INFORMATION   ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Account Number: " + this.accountNumber);
        System.out.println("Account Holder: " + this.accountHolder);
        System.out.println("Balance: $" + this.balance);
        System.out.println("════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== ENCAPSULATION DEMO =====\n");
        
        // Create account
        BankAccount account = new BankAccount("ACC001", "John Doe", 1000.0);
        account.displayInfo();
        
        // Try to access balance directly (will cause error if uncommented)
        // System.out.println(account.balance);  // ❌ ERROR! balance is private
        
        // ✅ CORRECT: Use public method to access balance
        System.out.println("\n--- Checking Balance (Correct Way) ---");
        double currentBalance = account.getBalance();
        System.out.println("Current balance: $" + currentBalance);
        
        // Try to modify balance directly (will cause error if uncommented)
        // account.balance = 999999.99;  // ❌ ERROR! balance is private
        
        // ✅ CORRECT: Use public methods to modify balance
        System.out.println("\n--- Valid Operations ---");
        account.deposit(500.0);
        account.withdraw(200.0);
        
        // Try invalid operations (validation prevents them)
        System.out.println("\n--- Invalid Operations (Protected by Encapsulation) ---");
        account.deposit(-100.0);  // Negative deposit
        account.withdraw(5000.0);  // Insufficient funds
        account.withdraw(-50.0);   // Negative withdrawal
        
        // Final state
        account.displayInfo();
        
        System.out.println("\n💡 Key Benefits of Encapsulation:");
        System.out.println("   ✅ Data Protection: Can't set invalid values");
        System.out.println("   ✅ Validation: All changes go through validation");
        System.out.println("   ✅ Flexibility: Can change internal implementation");
        System.out.println("   ✅ Maintainability: Easier to debug and update");
        
        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== ENCAPSULATION DEMO =====

✅ Account created: ACC001

╔════════════════════════════════╗
║    BANK ACCOUNT INFORMATION   ║
╚════════════════════════════════╝
Account Number: ACC001
Account Holder: John Doe
Balance: $1000.0
════════════════════════════════

--- Checking Balance (Correct Way) ---
Current balance: $1000.0

--- Valid Operations ---
💰 Deposited: $500.0
   New balance: $1500.0
💸 Withdrew: $200.0
   New balance: $1300.0

--- Invalid Operations (Protected by Encapsulation) ---
❌ Invalid deposit amount: $-100.0
❌ Insufficient funds!
   Requested: $5000.0
   Available: $1300.0
❌ Invalid withdrawal amount: $-50.0

╔════════════════════════════════╗
║    BANK ACCOUNT INFORMATION   ║
╚════════════════════════════════╝
Account Number: ACC001
Account Holder: John Doe
Balance: $1300.0
════════════════════════════════

💡 Key Benefits of Encapsulation:
   ✅ Data Protection: Can't set invalid values
   ✅ Validation: All changes go through validation
   ✅ Flexibility: Can change internal implementation
   ✅ Maintainability: Easier to debug and update

==============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Private Fields** | Data hidden from outside access |
| **Public Methods** | Controlled interface to access data |
| **Data Hiding** | Internal details hidden from users |
| **Validation** | Methods can validate before modifying data |

**Why Encapsulation Matters:**
```java
// WITHOUT Encapsulation (public fields)
class BadAccount {
    public double balance;  // Anyone can modify!
}

BadAccount bad = new BadAccount();
bad.balance = -1000;  // ❌ Negative balance! No validation!
bad.balance = 999999999;  // ❌ Unrealistic! No control!

// WITH Encapsulation (private fields + public methods)
class GoodAccount {
    private double balance;  // Protected!
    
    public void deposit(double amount) {
        if (amount > 0) {  // ✅ Validation!
            balance += amount;
        }
    }
}

GoodAccount good = new GoodAccount();
good.deposit(-1000);  // ✅ Rejected by validation!
```

**✅ Success Criteria:**
- [ ] Understand why fields should be private
- [ ] Can create private fields
- [ ] Know how to provide controlled access
- [ ] See benefits of validation
- [ ] Understand data protection

**🎯 Challenge:**
1. Try to access private fields directly (see the error)
2. Add a `transfer()` method that transfers money between accounts
3. Add validation to prevent negative balances
4. Add a transaction history feature

---

#### Exercise 2: Getters and Setters (20 minutes)

**What you'll learn:** Creating accessor and mutator methods for private fields

**Create new class: `Person`**

**Concept:** **Getters** (accessors) read private data. **Setters** (mutators) modify private data with validation.

```java
public class Person {
    // Private fields (hidden from outside)
    private String name;
    private int age;
    private String email;
    private String phoneNumber;
    
    // Constructor
    public Person(String name, int age, String email, String phoneNumber) {
        // Use setters for validation even in constructor
        this.setName(name);
        this.setAge(age);
        this.setEmail(email);
        this.setPhoneNumber(phoneNumber);
    }
    
    // GETTER for name (read access)
    public String getName() {
        return this.name;
    }
    
    // SETTER for name (write access with validation)
    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            System.out.println("❌ Invalid name. Name cannot be empty.");
            this.name = "Unknown";
        } else {
            this.name = name;
            System.out.println("✅ Name set to: " + this.name);
        }
    }
    
    // GETTER for age
    public int getAge() {
        return this.age;
    }
    
    // SETTER for age (with validation)
    public void setAge(int age) {
        if (age < 0 || age > 150) {
            System.out.println("❌ Invalid age: " + age + ". Age must be 0-150.");
            this.age = 0;
        } else {
            this.age = age;
            System.out.println("✅ Age set to: " + this.age);
        }
    }
    
    // GETTER for email
    public String getEmail() {
        return this.email;
    }
    
    // SETTER for email (with validation)
    public void setEmail(String email) {
        if (email == null || !email.contains("@")) {
            System.out.println("❌ Invalid email: " + email);
            this.email = "unknown@example.com";
        } else {
            this.email = email;
            System.out.println("✅ Email set to: " + this.email);
        }
    }
    
    // GETTER for phone number
    public String getPhoneNumber() {
        return this.phoneNumber;
    }
    
    // SETTER for phone number (with validation)
    public void setPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.length() < 10) {
            System.out.println("❌ Invalid phone number: " + phoneNumber);
            this.phoneNumber = "0000000000";
        } else {
            this.phoneNumber = phoneNumber;
            System.out.println("✅ Phone number set to: " + this.phoneNumber);
        }
    }
    
    // Display person information
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║     PERSON INFORMATION        ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Name: " + this.getName());
        System.out.println("Age: " + this.getAge());
        System.out.println("Email: " + this.getEmail());
        System.out.println("Phone: " + this.getPhoneNumber());
        System.out.println("════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== GETTERS AND SETTERS =====\n");
        
        // Create person with valid data
        System.out.println("--- Creating Person with Valid Data ---");
        Person person1 = new Person("Alice Johnson", 25, "alice@email.com", "1234567890");
        person1.displayInfo();
        
        // Create person with invalid data (validation kicks in)
        System.out.println("\n--- Creating Person with Invalid Data ---");
        Person person2 = new Person("", -5, "invalid-email", "123");
        person2.displayInfo();
        
        // Update person1 using setters
        System.out.println("\n--- Updating Person1 Information ---");
        person1.setAge(26);
        person1.setEmail("alice.johnson@email.com");
        person1.setPhoneNumber("9876543210");
        person1.displayInfo();
        
        // Try to set invalid values (validation prevents them)
        System.out.println("\n--- Attempting Invalid Updates ---");
        person1.setAge(200);  // Too old
        person1.setEmail("not-an-email");  // No @
        person1.setPhoneNumber("123");  // Too short
        person1.displayInfo();
        
        // Reading values using getters
        System.out.println("\n--- Reading Values Using Getters ---");
        System.out.println("Person1 name: " + person1.getName());
        System.out.println("Person1 age: " + person1.getAge());
        System.out.println("Person1 email: " + person1.getEmail());
        
        System.out.println("\n💡 Getter/Setter Naming Convention:");
        System.out.println("   Field: private String name");
        System.out.println("   Getter: public String getName()");
        System.out.println("   Setter: public void setName(String name)");
        
        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== GETTERS AND SETTERS =====

--- Creating Person with Valid Data ---
✅ Name set to: Alice Johnson
✅ Age set to: 25
✅ Email set to: alice@email.com
✅ Phone number set to: 1234567890

╔════════════════════════════════╗
║     PERSON INFORMATION        ║
╚════════════════════════════════╝
Name: Alice Johnson
Age: 25
Email: alice@email.com
Phone: 1234567890
════════════════════════════════

--- Creating Person with Invalid Data ---
❌ Invalid name. Name cannot be empty.
✅ Name set to: Unknown
❌ Invalid age: -5. Age must be 0-150.
✅ Age set to: 0
❌ Invalid email: invalid-email
✅ Email set to: unknown@example.com
❌ Invalid phone number: 123
✅ Phone number set to: 0000000000

╔════════════════════════════════╗
║     PERSON INFORMATION        ║
╚════════════════════════════════╝
Name: Unknown
Age: 0
Email: unknown@example.com
Phone: 0000000000
════════════════════════════════

--- Updating Person1 Information ---
✅ Age set to: 26
✅ Email set to: alice.johnson@email.com
✅ Phone number set to: 9876543210

╔════════════════════════════════╗
║     PERSON INFORMATION        ║
╚════════════════════════════════╝
Name: Alice Johnson
Age: 26
Email: alice.johnson@email.com
Phone: 9876543210
════════════════════════════════

--- Attempting Invalid Updates ---
❌ Invalid age: 200. Age must be 0-150.
✅ Age set to: 0
❌ Invalid email: not-an-email
✅ Email set to: unknown@example.com
❌ Invalid phone number: 123
✅ Phone number set to: 0000000000

╔════════════════════════════════╗
║     PERSON INFORMATION        ║
╚════════════════════════════════╝
Name: Alice Johnson
Age: 0
Email: unknown@example.com
Phone: 0000000000
════════════════════════════════

--- Reading Values Using Getters ---
Person1 name: Alice Johnson
Person1 age: 0
Person1 email: unknown@example.com

💡 Getter/Setter Naming Convention:
   Field: private String name
   Getter: public String getName()
   Setter: public void setName(String name)

===============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Getter** | Method that returns private field value |
| **Setter** | Method that sets private field value |
| **Validation** | Setters check data before setting |
| **Naming Convention** | get/set + FieldName (camelCase) |

**Getter/Setter Patterns:**
```java
// Standard pattern for any field
private DataType fieldName;

// Getter (accessor)
public DataType getFieldName() {
    return this.fieldName;
}

// Setter (mutator)
public void setFieldName(DataType fieldName) {
    // Optional: validation
    if (/* valid */) {
        this.fieldName = fieldName;
    }
}

// Boolean fields use "is" instead of "get"
private boolean active;

public boolean isActive() {
    return this.active;
}

public void setActive(boolean active) {
    this.active = active;
}
```

**✅ Success Criteria:**
- [ ] Understand getter/setter purpose
- [ ] Can create getters and setters
- [ ] Know naming conventions
- [ ] Can add validation in setters
- [ ] See how they protect data

**🎯 Challenge:**
1. Add a `dateOfBirth` field with getter/setter
2. Add validation to ensure email has both @ and .
3. Create a `isAdult()` method that returns true if age >= 18
4. Add a `updateContactInfo()` method that updates email and phone together

---

#### Exercise 3: Read-Only and Write-Only Properties (20 minutes)

**What you'll learn:** Creating properties that can only be read or only be written

**Create new class: `Product`**

**Concept:** Sometimes you want properties that can only be read (no setter) or only be written (no getter). This provides fine-grained control over data access.

```java
public class Product {
    // Read-only property (no setter)
    private final String productId;  // final = can't be changed after initialization
    
    // Read-only property (calculated, no direct field)
    private String name;
    private double price;
    private int quantity;
    
    // Write-only property (no getter) - for security
    private String internalNotes;  // Only staff can write, never read back
    
    // Constructor
    public Product(String productId, String name, double price, int quantity) {
        this.productId = productId;  // Set once, never changes
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.internalNotes = "";
        System.out.println("✅ Product created: " + productId);
    }
    
    // READ-ONLY: Getter for productId (no setter)
    public String getProductId() {
        return this.productId;
    }
    // No setProductId() method - productId cannot be changed!
    
    // NORMAL: Getter and setter for name
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
            System.out.println("✅ Name updated to: " + this.name);
        } else {
            System.out.println("❌ Invalid name");
        }
    }
    
    // NORMAL: Getter and setter for price
    public double getPrice() {
        return this.price;
    }
    
    public void setPrice(double price) {
        if (price >= 0) {
            this.price = price;
            System.out.println("✅ Price updated to: $" + this.price);
        } else {
            System.out.println("❌ Price cannot be negative");
        }
    }
    
    // NORMAL: Getter and setter for quantity
    public int getQuantity() {
        return this.quantity;
    }
    
    public void setQuantity(int quantity) {
        if (quantity >= 0) {
            this.quantity = quantity;
            System.out.println("✅ Quantity updated to: " + this.quantity);
        } else {
            System.out.println("❌ Quantity cannot be negative");
        }
    }
    
    // WRITE-ONLY: Setter for internal notes (no getter)
    public void setInternalNotes(String notes) {
        this.internalNotes = notes;
        System.out.println("✅ Internal notes updated (hidden from public)");
    }
    // No getInternalNotes() method - notes are write-only!
    
    // READ-ONLY: Calculated property (no setter, no direct field)
    public double getTotalValue() {
        return this.price * this.quantity;
    }
    // No setTotalValue() - it's calculated, not stored!
    
    // READ-ONLY: Another calculated property
    public boolean isInStock() {
        return this.quantity > 0;
    }
    
    // READ-ONLY: Status based on quantity
    public String getStockStatus() {
        if (this.quantity == 0) {
            return "OUT OF STOCK";
        } else if (this.quantity < 10) {
            return "LOW STOCK";
        } else {
            return "IN STOCK";
        }
    }
    
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║    PRODUCT INFORMATION        ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Product ID: " + this.getProductId() + " (Read-Only)");
        System.out.println("Name: " + this.getName());
        System.out.println("Price: $" + this.getPrice());
        System.out.println("Quantity: " + this.getQuantity());
        System.out.println("Total Value: $" + this.getTotalValue() + " (Calculated)");
        System.out.println("Stock Status: " + this.getStockStatus() + " (Calculated)");
        System.out.println("In Stock: " + this.isInStock() + " (Calculated)");
        System.out.println("Internal Notes: [HIDDEN - Write-Only]");
        System.out.println("════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== READ-ONLY AND WRITE-ONLY PROPERTIES =====\n");
        
        // Create product
        Product product = new Product("PROD001", "Laptop", 999.99, 15);
        product.displayInfo();
        
        // Try to modify read-only property (will cause error if uncommented)
        // product.setProductId("PROD002");  // ❌ ERROR! No setter exists
        
        System.out.println("\n--- Reading Read-Only Properties ---");
        System.out.println("Product ID: " + product.getProductId());
        System.out.println("Total Value: $" + product.getTotalValue());
        System.out.println("Stock Status: " + product.getStockStatus());
        
        // Modify normal properties
        System.out.println("\n--- Modifying Normal Properties ---");
        product.setName("Gaming Laptop");
        product.setPrice(1299.99);
        product.setQuantity(5);
        
        // Write to write-only property
        System.out.println("\n--- Writing to Write-Only Property ---");
        product.setInternalNotes("Supplier: TechCorp, Discount: 10%");
        
        // Try to read write-only property (will cause error if uncommented)
        // String notes = product.getInternalNotes();  // ❌ ERROR! No getter exists
        
        // Display updated info
        product.displayInfo();
        
        // Demonstrate calculated properties update automatically
        System.out.println("\n--- Calculated Properties Update Automatically ---");
        System.out.println("Before: Total Value = $" + product.getTotalValue());
        product.setQuantity(10);
        System.out.println("After: Total Value = $" + product.getTotalValue());
        
        System.out.println("\n💡 Property Types:");
        System.out.println("   📖 Read-Only: Has getter, no setter (productId, totalValue)");
        System.out.println("   ✍️  Write-Only: Has setter, no getter (internalNotes)");
        System.out.println("   🔄 Read-Write: Has both getter and setter (name, price)");
        System.out.println("   🧮 Calculated: Computed from other properties (totalValue)");
        
        System.out.println("\n===============================================");
    }
}
```

**Expected Output:**
```
===== READ-ONLY AND WRITE-ONLY PROPERTIES =====

✅ Product created: PROD001

╔════════════════════════════════╗
║    PRODUCT INFORMATION        ║
╚════════════════════════════════╝
Product ID: PROD001 (Read-Only)
Name: Laptop
Price: $999.99
Quantity: 15
Total Value: $14999.85 (Calculated)
Stock Status: IN STOCK (Calculated)
In Stock: true (Calculated)
Internal Notes: [HIDDEN - Write-Only]
════════════════════════════════

--- Reading Read-Only Properties ---
Product ID: PROD001
Total Value: $14999.85
Stock Status: IN STOCK

--- Modifying Normal Properties ---
✅ Name updated to: Gaming Laptop
✅ Price updated to: $1299.99
✅ Quantity updated to: 5

--- Writing to Write-Only Property ---
✅ Internal notes updated (hidden from public)

╔════════════════════════════════╗
║    PRODUCT INFORMATION        ║
╚════════════════════════════════╝
Product ID: PROD001 (Read-Only)
Name: Gaming Laptop
Price: $1299.99
Quantity: 5
Total Value: $6499.95 (Calculated)
Stock Status: LOW STOCK (Calculated)
In Stock: true (Calculated)
Internal Notes: [HIDDEN - Write-Only]
════════════════════════════════

--- Calculated Properties Update Automatically ---
Before: Total Value = $6499.95
✅ Quantity updated to: 10
After: Total Value = $12999.9

💡 Property Types:
   📖 Read-Only: Has getter, no setter (productId, totalValue)
   ✍️  Write-Only: Has setter, no getter (internalNotes)
   🔄 Read-Write: Has both getter and setter (name, price)
   🧮 Calculated: Computed from other properties (totalValue)

===============================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Read-Only** | Has getter, no setter (can't be changed) |
| **Write-Only** | Has setter, no getter (can't be read) |
| **Calculated** | Computed from other properties |
| **final keyword** | Makes field unchangeable after initialization |

**When to Use Each Type:**
```
READ-ONLY Properties:
✅ IDs that shouldn't change
✅ Calculated values (total, average, etc.)
✅ Status flags derived from other data
✅ Creation timestamps

WRITE-ONLY Properties:
✅ Passwords (write but never read back)
✅ Internal notes/logs
✅ Security tokens
✅ Sensitive configuration

CALCULATED Properties:
✅ Totals, averages, sums
✅ Status derived from other fields
✅ Formatted strings
✅ Boolean flags based on conditions
```

**✅ Success Criteria:**
- [ ] Understand read-only properties
- [ ] Understand write-only properties
- [ ] Can create calculated properties
- [ ] Know when to use each type
- [ ] Understand `final` keyword

**🎯 Challenge:**
1. Add a read-only `createdDate` field
2. Add a calculated `discountedPrice` property (10% off)
3. Add a write-only `supplierCode` field
4. Create a method to apply bulk discount

---

#### Exercise 4: Immutable Objects (25 minutes)

**What you'll learn:** Creating objects that cannot be modified after creation

**Create new class: `ImmutablePerson`**

**Concept:** **Immutable Object** = An object whose state cannot be changed after creation. All fields are final and there are no setters.

```java
public final class ImmutablePerson {
    // All fields are final (cannot be changed after initialization)
    private final String name;
    private final int age;
    private final String email;
    private final String address;
    
    // Constructor - only way to set values
    public ImmutablePerson(String name, int age, String email, String address) {
        // Validate and set values (only once!)
        if (name == null || name.trim().isEmpty()) {
            this.name = "Unknown";
        } else {
            this.name = name;
        }
        
        if (age < 0 || age > 150) {
            this.age = 0;
        } else {
            this.age = age;
        }
        
        if (email == null || !email.contains("@")) {
            this.email = "unknown@example.com";
        } else {
            this.email = email;
        }
        
        this.address = address != null ? address : "Unknown";
        
        System.out.println("✅ Immutable person created: " + this.name);
    }
    
    // ONLY GETTERS - No setters!
    public String getName() {
        return this.name;
    }
    
    public int getAge() {
        return this.age;
    }
    
    public String getEmail() {
        return this.email;
    }
    
    public String getAddress() {
        return this.address;
    }
    
    // To "modify" an immutable object, create a new one
    public ImmutablePerson withName(String newName) {
        return new ImmutablePerson(newName, this.age, this.email, this.address);
    }
    
    public ImmutablePerson withAge(int newAge) {
        return new ImmutablePerson(this.name, newAge, this.email, this.address);
    }
    
    public ImmutablePerson withEmail(String newEmail) {
        return new ImmutablePerson(this.name, this.age, newEmail, this.address);
    }
    
    public ImmutablePerson withAddress(String newAddress) {
        return new ImmutablePerson(this.name, this.age, this.email, newAddress);
    }
    
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║   IMMUTABLE PERSON INFO       ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
        System.out.println("Email: " + this.email);
        System.out.println("Address: " + this.address);
        System.out.println("════════════════════════════════");
    }
    
    // Override toString for easy printing
    @Override
    public String toString() {
        return "ImmutablePerson{name='" + name + "', age=" + age + 
               ", email='" + email + "', address='" + address + "'}";
    }
    
    public static void main(String[] args) {
        System.out.println("===== IMMUTABLE OBJECTS =====\n");
        
        // Create immutable person
        System.out.println("--- Creating Immutable Person ---");
        ImmutablePerson person1 = new ImmutablePerson("Alice", 25, "alice@email.com", "123 Main St");
        person1.displayInfo();
        
        // Try to modify (will cause error if uncommented)
        // person1.setName("Bob");  // ❌ ERROR! No setter exists
        // person1.name = "Bob";    // ❌ ERROR! Field is private
        
        System.out.println("\n--- Reading Values (Always Safe) ---");
        System.out.println("Name: " + person1.getName());
        System.out.println("Age: " + person1.getAge());
        System.out.println("Email: " + person1.getEmail());
        
        // To "change" values, create new object
        System.out.println("\n--- Creating Modified Versions ---");
        ImmutablePerson person2 = person1.withName("Alice Johnson");
        ImmutablePerson person3 = person1.withAge(26);
        ImmutablePerson person4 = person1.withEmail("alice.j@email.com");
        
        System.out.println("\nOriginal person:");
        person1.displayInfo();
        
        System.out.println("\nPerson with new name:");
        person2.displayInfo();
        
        System.out.println("\nPerson with new age:");
        person3.displayInfo();
        
        System.out.println("\nPerson with new email:");
        person4.displayInfo();
        
        // Demonstrate immutability
        System.out.println("\n--- Demonstrating Immutability ---");
        System.out.println("person1 == person2? " + (person1 == person2));
        System.out.println("person1 unchanged: " + person1);
        System.out.println("person2 is new object: " + person2);
        
        // Chain modifications
        System.out.println("\n--- Chaining Modifications ---");
        ImmutablePerson person5 = person1
            .withName("Alice Smith")
            .withAge(27)
            .withEmail("alice.smith@email.com");
        
        System.out.println("Original: " + person1);
        System.out.println("Modified: " + person5);
        
        System.out.println("\n💡 Benefits of Immutability:");
        System.out.println("   ✅ Thread-Safe: Multiple threads can safely access");
        System.out.println("   ✅ Predictable: State never changes unexpectedly");
        System.out.println("   ✅ Cacheable: Safe to cache and reuse");
        System.out.println("   ✅ Hashable: Can be used as HashMap keys");
        System.out.println("   ✅ Simple: No need to worry about state changes");
        
        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== IMMUTABLE OBJECTS =====

--- Creating Immutable Person ---
✅ Immutable person created: Alice

╔════════════════════════════════╗
║   IMMUTABLE PERSON INFO       ║
╚════════════════════════════════╝
Name: Alice
Age: 25
Email: alice@email.com
Address: 123 Main St
════════════════════════════════

--- Reading Values (Always Safe) ---
Name: Alice
Age: 25
Email: alice@email.com

--- Creating Modified Versions ---
✅ Immutable person created: Alice Johnson
✅ Immutable person created: Alice
✅ Immutable person created: Alice

Original person:

╔════════════════════════════════╗
║   IMMUTABLE PERSON INFO       ║
╚════════════════════════════════╝
Name: Alice
Age: 25
Email: alice@email.com
Address: 123 Main St
════════════════════════════════

Person with new name:

╔════════════════════════════════╗
║   IMMUTABLE PERSON INFO       ║
╚════════════════════════════════╝
Name: Alice Johnson
Age: 25
Email: alice@email.com
Address: 123 Main St
════════════════════════════════

Person with new age:

╔════════════════════════════════╗
║   IMMUTABLE PERSON INFO       ║
╚════════════════════════════════╝
Name: Alice
Age: 26
Email: alice@email.com
Address: 123 Main St
════════════════════════════════

Person with new email:

╔════════════════════════════════╗
║   IMMUTABLE PERSON INFO       ║
╚════════════════════════════════╝
Name: Alice
Age: 25
Email: alice.j@email.com
Address: 123 Main St
════════════════════════════════

--- Demonstrating Immutability ---
person1 == person2? false
person1 unchanged: ImmutablePerson{name='Alice', age=25, email='alice@email.com', address='123 Main St'}
person2 is new object: ImmutablePerson{name='Alice Johnson', age=25, email='alice@email.com', address='123 Main St'}

--- Chaining Modifications ---
✅ Immutable person created: Alice Smith
✅ Immutable person created: Alice Smith
✅ Immutable person created: Alice Smith
Original: ImmutablePerson{name='Alice', age=25, email='alice@email.com', address='123 Main St'}
Modified: ImmutablePerson{name='Alice Smith', age=27, email='alice.smith@email.com', address='123 Main St'}

💡 Benefits of Immutability:
   ✅ Thread-Safe: Multiple threads can safely access
   ✅ Predictable: State never changes unexpectedly
   ✅ Cacheable: Safe to cache and reuse
   ✅ Hashable: Can be used as HashMap keys
   ✅ Simple: No need to worry about state changes

=============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Immutable** | Object state cannot change after creation |
| **final fields** | All fields marked final |
| **No setters** | Only getters, no methods to modify state |
| **with methods** | Create new objects with modified values |

**How to Create Immutable Classes:**
```java
// 1. Make class final (can't be extended)
public final class ImmutableClass {
    
    // 2. Make all fields private and final
    private final String field1;
    private final int field2;
    
    // 3. Initialize all fields in constructor
    public ImmutableClass(String field1, int field2) {
        this.field1 = field1;
        this.field2 = field2;
    }
    
    // 4. Provide only getters (no setters)
    public String getField1() {
        return field1;
    }
    
    public int getField2() {
        return field2;
    }
    
    // 5. Provide "with" methods that return new objects
    public ImmutableClass withField1(String newField1) {
        return new ImmutableClass(newField1, this.field2);
    }
}
```

**Real-World Examples:**
```
Java's Immutable Classes:
- String (most famous immutable class)
- Integer, Double, etc. (wrapper classes)
- LocalDate, LocalDateTime (date/time classes)
- BigDecimal, BigInteger (math classes)
```

**✅ Success Criteria:**
- [ ] Understand immutability concept
- [ ] Can create immutable classes
- [ ] Know benefits of immutability
- [ ] Can use "with" methods pattern
- [ ] Understand final keyword usage

**🎯 Challenge:**
1. Create an immutable `Point` class with x and y coordinates
2. Add methods like `moveBy(dx, dy)` that return new Point
3. Create an immutable `Rectangle` class using two Points
4. Implement `equals()` and `hashCode()` methods

---


#### Exercise 5: Validation and Business Rules in Encapsulation (25 minutes)

**What you'll learn:** Implementing complex validation and business logic in setters

**Create new class: `BankAccount`**

**Concept:** Encapsulation allows you to enforce business rules and complex validation logic, ensuring data integrity.

```java
public class BankAccount {
    // Private fields
    private String accountNumber;
    private String accountHolder;
    private double balance;
    private String accountType;  // "Savings" or "Checking"
    private boolean isActive;
    private int transactionCount;
    
    // Business rule constants
    private static final double MIN_BALANCE_SAVINGS = 500.0;
    private static final double MIN_BALANCE_CHECKING = 100.0;
    private static final double MAX_WITHDRAWAL_LIMIT = 5000.0;
    private static final int MAX_DAILY_TRANSACTIONS = 10;
    
    // Constructor
    public BankAccount(String accountNumber, String accountHolder, 
                      double initialBalance, String accountType) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.accountType = accountType;
        this.isActive = true;
        this.transactionCount = 0;
        
        // Use setter for validation
        this.setBalance(initialBalance);
        
        System.out.println("✅ Account created: " + accountNumber);
    }
    
    // Getters
    public String getAccountNumber() {
        return this.accountNumber;
    }
    
    public String getAccountHolder() {
        return this.accountHolder;
    }
    
    public double getBalance() {
        return this.balance;
    }
    
    public String getAccountType() {
        return this.accountType;
    }
    
    public boolean isActive() {
        return this.isActive;
    }
    
    public int getTransactionCount() {
        return this.transactionCount;
    }
    
    // Setter with complex validation
    private void setBalance(double balance) {
        double minBalance = this.accountType.equals("Savings") ? 
                           MIN_BALANCE_SAVINGS : MIN_BALANCE_CHECKING;
        
        if (balance < minBalance) {
            System.out.println("❌ Balance below minimum for " + this.accountType + " account");
            System.out.println("   Minimum required: $" + minBalance);
            this.balance = minBalance;
        } else {
            this.balance = balance;
        }
    }
    
    // Business method: Deposit with validation
    public boolean deposit(double amount) {
        // Check if account is active
        if (!this.isActive) {
            System.out.println("❌ Account is inactive. Cannot deposit.");
            return false;
        }
        
        // Check transaction limit
        if (this.transactionCount >= MAX_DAILY_TRANSACTIONS) {
            System.out.println("❌ Daily transaction limit reached (" + 
                             MAX_DAILY_TRANSACTIONS + " transactions)");
            return false;
        }
        
        // Validate amount
        if (amount <= 0) {
            System.out.println("❌ Deposit amount must be positive");
            return false;
        }
        
        if (amount > 50000) {
            System.out.println("❌ Deposit amount exceeds limit ($50,000)");
            return false;
        }
        
        // Perform deposit
        this.balance += amount;
        this.transactionCount++;
        System.out.println("✅ Deposited: $" + amount);
        System.out.println("   New balance: $" + this.balance);
        System.out.println("   Transactions today: " + this.transactionCount);
        return true;
    }
    
    // Business method: Withdraw with validation
    public boolean withdraw(double amount) {
        // Check if account is active
        if (!this.isActive) {
            System.out.println("❌ Account is inactive. Cannot withdraw.");
            return false;
        }
        
        // Check transaction limit
        if (this.transactionCount >= MAX_DAILY_TRANSACTIONS) {
            System.out.println("❌ Daily transaction limit reached");
            return false;
        }
        
        // Validate amount
        if (amount <= 0) {
            System.out.println("❌ Withdrawal amount must be positive");
            return false;
        }
        
        if (amount > MAX_WITHDRAWAL_LIMIT) {
            System.out.println("❌ Withdrawal exceeds daily limit ($" + 
                             MAX_WITHDRAWAL_LIMIT + ")");
            return false;
        }
        
        // Check minimum balance requirement
        double minBalance = this.accountType.equals("Savings") ? 
                           MIN_BALANCE_SAVINGS : MIN_BALANCE_CHECKING;
        
        if (this.balance - amount < minBalance) {
            System.out.println("❌ Insufficient funds");
            System.out.println("   Requested: $" + amount);
            System.out.println("   Available: $" + (this.balance - minBalance));
            System.out.println("   (Must maintain minimum balance: $" + minBalance + ")");
            return false;
        }
        
        // Perform withdrawal
        this.balance -= amount;
        this.transactionCount++;
        System.out.println("✅ Withdrew: $" + amount);
        System.out.println("   New balance: $" + this.balance);
        System.out.println("   Transactions today: " + this.transactionCount);
        return true;
    }
    
    // Business method: Transfer with validation
    public boolean transfer(BankAccount recipient, double amount) {
        System.out.println("\n--- Transfer: " + this.accountNumber + 
                         " → " + recipient.getAccountNumber() + " ---");
        
        // Validate recipient
        if (!recipient.isActive()) {
            System.out.println("❌ Recipient account is inactive");
            return false;
        }
        
        // Attempt withdrawal from this account
        if (this.withdraw(amount)) {
            // Attempt deposit to recipient account
            if (recipient.deposit(amount)) {
                System.out.println("✅ Transfer successful!");
                return true;
            } else {
                // Rollback: deposit back to this account
                this.balance += amount;
                this.transactionCount--;
                System.out.println("❌ Transfer failed. Amount returned.");
                return false;
            }
        }
        
        return false;
    }
    
    // Business method: Deactivate account
    public void deactivate() {
        this.isActive = false;
        System.out.println("⚠️  Account deactivated: " + this.accountNumber);
    }
    
    // Business method: Activate account
    public void activate() {
        this.isActive = true;
        System.out.println("✅ Account activated: " + this.accountNumber);
    }
    
    // Business method: Reset daily transaction count
    public void resetDailyTransactions() {
        this.transactionCount = 0;
        System.out.println("🔄 Daily transaction count reset");
    }
    
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      BANK ACCOUNT INFORMATION         ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Account Number: " + this.accountNumber);
        System.out.println("Account Holder: " + this.accountHolder);
        System.out.println("Account Type: " + this.accountType);
        System.out.println("Balance: $" + this.balance);
        System.out.println("Status: " + (this.isActive ? "Active" : "Inactive"));
        System.out.println("Transactions Today: " + this.transactionCount + 
                         "/" + MAX_DAILY_TRANSACTIONS);
        
        double minBalance = this.accountType.equals("Savings") ? 
                           MIN_BALANCE_SAVINGS : MIN_BALANCE_CHECKING;
        System.out.println("Minimum Balance: $" + minBalance);
        System.out.println("Available to Withdraw: $" + (this.balance - minBalance));
        System.out.println("════════════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== VALIDATION AND BUSINESS RULES =====\n");
        
        // Create accounts
        System.out.println("--- Creating Accounts ---");
        BankAccount savings = new BankAccount("SAV001", "Alice", 1000.0, "Savings");
        BankAccount checking = new BankAccount("CHK001", "Bob", 500.0, "Checking");
        
        savings.displayInfo();
        checking.displayInfo();
        
        // Test valid operations
        System.out.println("\n--- Valid Operations ---");
        savings.deposit(500.0);
        savings.withdraw(200.0);
        
        // Test invalid operations
        System.out.println("\n--- Invalid Operations ---");
        savings.deposit(-100.0);  // Negative amount
        savings.deposit(60000.0);  // Exceeds limit
        savings.withdraw(1500.0);  // Below minimum balance
        savings.withdraw(6000.0);  // Exceeds withdrawal limit
        
        // Test transfer
        System.out.println("\n--- Transfer Test ---");
        savings.transfer(checking, 300.0);
        
        savings.displayInfo();
        checking.displayInfo();
        
        // Test transaction limit
        System.out.println("\n--- Testing Transaction Limit ---");
        for (int i = 1; i <= 12; i++) {
            System.out.println("\nTransaction " + i + ":");
            checking.deposit(10.0);
        }
        
        // Reset and try again
        System.out.println("\n--- After Reset ---");
        checking.resetDailyTransactions();
        checking.deposit(10.0);
        
        // Test inactive account
        System.out.println("\n--- Testing Inactive Account ---");
        checking.deactivate();
        checking.deposit(100.0);
        checking.activate();
        checking.deposit(100.0);
        
        checking.displayInfo();
        
        System.out.println("\n💡 Business Rules Enforced:");
        System.out.println("   ✅ Minimum balance requirements");
        System.out.println("   ✅ Daily transaction limits");
        System.out.println("   ✅ Withdrawal limits");
        System.out.println("   ✅ Deposit limits");
        System.out.println("   ✅ Account status checks");
        System.out.println("   ✅ Transfer validation and rollback");
        
        System.out.println("\n=========================================");
    }
}
```

**Expected Output:**
```
===== VALIDATION AND BUSINESS RULES =====

--- Creating Accounts ---
✅ Account created: SAV001
✅ Account created: CHK001

╔════════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION         ║
╚════════════════════════════════════════╝
Account Number: SAV001
Account Holder: Alice
Account Type: Savings
Balance: $1000.0
Status: Active
Transactions Today: 0/10
Minimum Balance: $500.0
Available to Withdraw: $500.0
════════════════════════════════════════

╔════════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION         ║
╚════════════════════════════════════════╝
Account Number: CHK001
Account Holder: Bob
Account Type: Checking
Balance: $500.0
Status: Active
Transactions Today: 0/10
Minimum Balance: $100.0
Available to Withdraw: $400.0
════════════════════════════════════════

--- Valid Operations ---
✅ Deposited: $500.0
   New balance: $1500.0
   Transactions today: 1
✅ Withdrew: $200.0
   New balance: $1300.0
   Transactions today: 2

--- Invalid Operations ---
❌ Deposit amount must be positive
❌ Deposit amount exceeds limit ($50,000)
❌ Insufficient funds
   Requested: $1500.0
   Available: $800.0
   (Must maintain minimum balance: $500.0)
❌ Withdrawal exceeds daily limit ($5000.0)

--- Transfer Test ---

--- Transfer: SAV001 → CHK001 ---
✅ Withdrew: $300.0
   New balance: $1000.0
   Transactions today: 3
✅ Deposited: $300.0
   New balance: $800.0
   Transactions today: 1
✅ Transfer successful!

╔════════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION         ║
╚════════════════════════════════════════╝
Account Number: SAV001
Account Holder: Alice
Account Type: Savings
Balance: $1000.0
Status: Active
Transactions Today: 3/10
Minimum Balance: $500.0
Available to Withdraw: $500.0
════════════════════════════════════════

╔════════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION         ║
╚════════════════════════════════════════╝
Account Number: CHK001
Account Holder: Bob
Account Type: Checking
Balance: $800.0
Status: Active
Transactions Today: 1/10
Minimum Balance: $100.0
Available to Withdraw: $700.0
════════════════════════════════════════

--- Testing Transaction Limit ---

Transaction 1:
✅ Deposited: $10.0
   New balance: $810.0
   Transactions today: 2

Transaction 2:
✅ Deposited: $10.0
   New balance: $820.0
   Transactions today: 3

[... continues until transaction 10 ...]

Transaction 11:
❌ Daily transaction limit reached (10 transactions)

Transaction 12:
❌ Daily transaction limit reached (10 transactions)

--- After Reset ---
🔄 Daily transaction count reset
✅ Deposited: $10.0
   New balance: $830.0
   Transactions today: 1

--- Testing Inactive Account ---
⚠️  Account deactivated: CHK001
❌ Account is inactive. Cannot deposit.
✅ Account activated: CHK001
✅ Deposited: $100.0
   New balance: $930.0
   Transactions today: 2

╔════════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION         ║
╚════════════════════════════════════════╝
Account Number: CHK001
Account Holder: Bob
Account Type: Checking
Balance: $930.0
Status: Active
Transactions Today: 2/10
Minimum Balance: $100.0
Available to Withdraw: $830.0
════════════════════════════════════════

💡 Business Rules Enforced:
   ✅ Minimum balance requirements
   ✅ Daily transaction limits
   ✅ Withdrawal limits
   ✅ Deposit limits
   ✅ Account status checks
   ✅ Transfer validation and rollback

=========================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Business Rules** | Real-world constraints enforced in code |
| **Validation** | Checking data before accepting it |
| **Constants** | Using static final for business rule values |
| **Rollback** | Undoing operations if validation fails |

**Common Validation Patterns:**
```java
// 1. Range validation
if (value < MIN || value > MAX) {
    // reject
}

// 2. State validation
if (!isActive) {
    // reject
}

// 3. Limit validation
if (count >= LIMIT) {
    // reject
}

// 4. Format validation
if (!email.contains("@")) {
    // reject
}

// 5. Business logic validation
if (balance - amount < MIN_BALANCE) {
    // reject
}
```

**✅ Success Criteria:**
- [ ] Understand business rule enforcement
- [ ] Can implement complex validation
- [ ] Know how to use constants for rules
- [ ] Understand rollback patterns
- [ ] See real-world validation examples

**🎯 Challenge:**
1. Add overdraft protection feature
2. Implement interest calculation for savings accounts
3. Add account freeze/unfreeze functionality
4. Create transaction history logging

---

#### Exercise 6: Real-World Application - Student Management System (30 minutes)

**What you'll learn:** Building a complete encapsulated system with all concepts

**Create new class: `Student`**

**Concept:** Combining all encapsulation concepts in a real-world application.

```java
public class Student {
    // Private fields (encapsulated data)
    private final int studentId;  // Read-only (immutable)
    private String name;
    private int age;
    private String email;
    private String major;
    private double gpa;
    private int creditsCompleted;
    private boolean isActive;
    
    // Business rule constants
    private static final double MIN_GPA = 0.0;
    private static final double MAX_GPA = 4.0;
    private static final int MIN_AGE = 16;
    private static final int MAX_AGE = 100;
    private static final int CREDITS_FOR_GRADUATION = 120;
    
    // Constructor
    public Student(int studentId, String name, int age, String email, String major) {
        this.studentId = studentId;
        this.isActive = true;
        this.creditsCompleted = 0;
        this.gpa = 0.0;
        
        // Use setters for validation
        this.setName(name);
        this.setAge(age);
        this.setEmail(email);
        this.setMajor(major);
        
        System.out.println("✅ Student enrolled: " + this.name + " (ID: " + studentId + ")");
    }
    
    // READ-ONLY: Student ID (no setter)
    public int getStudentId() {
        return this.studentId;
    }
    
    // Name with validation
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            System.out.println("❌ Invalid name");
            this.name = "Unknown";
        } else if (name.length() < 2) {
            System.out.println("❌ Name too short");
            this.name = "Unknown";
        } else {
            this.name = name;
        }
    }
    
    // Age with validation
    public int getAge() {
        return this.age;
    }
    
    public void setAge(int age) {
        if (age < MIN_AGE || age > MAX_AGE) {
            System.out.println("❌ Invalid age: " + age + 
                             " (must be " + MIN_AGE + "-" + MAX_AGE + ")");
            this.age = MIN_AGE;
        } else {
            this.age = age;
        }
    }
    
    // Email with validation
    public String getEmail() {
        return this.email;
    }
    
    public void setEmail(String email) {
        if (email == null || !email.contains("@") || !email.contains(".")) {
            System.out.println("❌ Invalid email format");
            this.email = "unknown@university.edu";
        } else {
            this.email = email;
        }
    }
    
    // Major with validation
    public String getMajor() {
        return this.major;
    }
    
    public void setMajor(String major) {
        if (major == null || major.trim().isEmpty()) {
            System.out.println("❌ Invalid major");
            this.major = "Undeclared";
        } else {
            this.major = major;
        }
    }
    
    // GPA with validation
    public double getGpa() {
        return this.gpa;
    }
    
    private void setGpa(double gpa) {
        if (gpa < MIN_GPA || gpa > MAX_GPA) {
            System.out.println("❌ Invalid GPA: " + gpa + 
                             " (must be " + MIN_GPA + "-" + MAX_GPA + ")");
            this.gpa = MIN_GPA;
        } else {
            this.gpa = gpa;
        }
    }
    
    // Credits completed
    public int getCreditsCompleted() {
        return this.creditsCompleted;
    }
    
    // Active status
    public boolean isActive() {
        return this.isActive;
    }
    
    // CALCULATED: Credits remaining for graduation
    public int getCreditsRemaining() {
        return Math.max(0, CREDITS_FOR_GRADUATION - this.creditsCompleted);
    }
    
    // CALCULATED: Academic standing
    public String getAcademicStanding() {
        if (this.gpa >= 3.5) return "Dean's List";
        if (this.gpa >= 3.0) return "Good Standing";
        if (this.gpa >= 2.0) return "Satisfactory";
        if (this.gpa >= 1.0) return "Academic Warning";
        return "Academic Probation";
    }
    
    // CALCULATED: Class level
    public String getClassLevel() {
        if (this.creditsCompleted >= 90) return "Senior";
        if (this.creditsCompleted >= 60) return "Junior";
        if (this.creditsCompleted >= 30) return "Sophomore";
        return "Freshman";
    }
    
    // CALCULATED: Graduation eligibility
    public boolean isEligibleForGraduation() {
        return this.creditsCompleted >= CREDITS_FOR_GRADUATION && 
               this.gpa >= 2.0 && 
               this.isActive;
    }
    
    // Business method: Complete course
    public void completeCourse(String courseName, int credits, double grade) {
        if (!this.isActive) {
            System.out.println("❌ Student is not active");
            return;
        }
        
        if (credits <= 0 || credits > 6) {
            System.out.println("❌ Invalid credit hours: " + credits);
            return;
        }
        
        if (grade < 0.0 || grade > 4.0) {
            System.out.println("❌ Invalid grade: " + grade);
            return;
        }
        
        // Update credits
        this.creditsCompleted += credits;
        
        // Recalculate GPA (simplified)
        double totalPoints = (this.gpa * (this.creditsCompleted - credits)) + 
                            (grade * credits);
        this.gpa = totalPoints / this.creditsCompleted;
        
        System.out.println("✅ Course completed: " + courseName);
        System.out.println("   Credits earned: " + credits);
        System.out.println("   Grade: " + grade);
        System.out.println("   New GPA: " + String.format("%.2f", this.gpa));
        System.out.println("   Total credits: " + this.creditsCompleted);
    }
    
    // Business method: Withdraw from university
    public void withdraw() {
        this.isActive = false;
        System.out.println("⚠️  Student withdrawn: " + this.name);
    }
    
    // Business method: Re-enroll
    public void reEnroll() {
        this.isActive = true;
        System.out.println("✅ Student re-enrolled: " + this.name);
    }
    
    // Display comprehensive information
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════════════════════╗");
        System.out.println("║         STUDENT INFORMATION                   ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        System.out.println("Student ID: " + this.studentId);
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
        System.out.println("Email: " + this.email);
        System.out.println("Major: " + this.major);
        System.out.println("Status: " + (this.isActive ? "Active" : "Inactive"));
        System.out.println("────────────────────────────────────────────────");
        System.out.println("GPA: " + String.format("%.2f", this.gpa));
        System.out.println("Credits Completed: " + this.creditsCompleted);
        System.out.println("Credits Remaining: " + this.getCreditsRemaining());
        System.out.println("Class Level: " + this.getClassLevel());
        System.out.println("Academic Standing: " + this.getAcademicStanding());
        System.out.println("Eligible for Graduation: " + 
                         (this.isEligibleForGraduation() ? "Yes" : "No"));
        System.out.println("════════════════════════════════════════════════");
    }
    
    // Display summary (compact)
    public void displaySummary() {
        System.out.printf("%-8d %-20s %-15s %6.2f %4d/%-4d %-12s%n",
                         this.studentId, this.name, this.major, 
                         this.gpa, this.creditsCompleted, CREDITS_FOR_GRADUATION,
                         this.getClassLevel());
    }
    
    public static void main(String[] args) {
        System.out.println("===== STUDENT MANAGEMENT SYSTEM =====\n");
        
        // Create students
        System.out.println("--- Enrolling Students ---\n");
        Student student1 = new Student(1001, "Alice Johnson", 20, 
                                      "alice@university.edu", "Computer Science");
        Student student2 = new Student(1002, "Bob Smith", 19, 
                                      "bob@university.edu", "Mathematics");
        Student student3 = new Student(1003, "Charlie Brown", 21, 
                                      "charlie@university.edu", "Physics");
        
        // Complete courses for student1
        System.out.println("\n--- Alice's Academic Progress ---");
        student1.completeCourse("Intro to Programming", 3, 3.7);
        student1.completeCourse("Data Structures", 4, 3.9);
        student1.completeCourse("Algorithms", 4, 3.8);
        student1.completeCourse("Database Systems", 3, 4.0);
        student1.displayInfo();
        
        // Complete courses for student2
        System.out.println("\n--- Bob's Academic Progress ---");
        student2.completeCourse("Calculus I", 4, 3.0);
        student2.completeCourse("Calculus II", 4, 2.8);
        student2.completeCourse("Linear Algebra", 3, 3.2);
        student2.displayInfo();
        
        // Complete many courses for student3 (approaching graduation)
        System.out.println("\n--- Charlie's Academic Progress ---");
        for (int i = 0; i < 30; i++) {
            student3.completeCourse("Course " + (i + 1), 4, 3.5);
        }
        student3.displayInfo();
        
        // Test validation
        System.out.println("\n--- Testing Validation ---");
        student1.setAge(200);  // Invalid
        student1.setEmail("invalid");  // Invalid
        student1.completeCourse("Invalid Course", 10, 5.0);  // Invalid
        
        // Test withdrawal and re-enrollment
        System.out.println("\n--- Testing Withdrawal ---");
        student2.withdraw();
        student2.completeCourse("Test Course", 3, 3.0);  // Should fail
        student2.reEnroll();
        student2.completeCourse("Test Course", 3, 3.0);  // Should succeed
        
        // Display summary table
        System.out.println("\n--- Student Summary ---");
        System.out.println("╔════════════════════════════════════════════════════════════════════╗");
        System.out.println("║                    STUDENT ROSTER                                 ║");
        System.out.println("╚════════════════════════════════════════════════════════════════════╝");
        System.out.printf("%-8s %-20s %-15s %6s %9s %-12s%n",
                         "ID", "Name", "Major", "GPA", "Credits", "Level");
        System.out.println("────────────────────────────────────────────────────────────────────");
        student1.displaySummary();
        student2.displaySummary();
        student3.displaySummary();
        System.out.println("════════════════════════════════════════════════════════════════════");
        
        System.out.println("\n💡 Encapsulation Concepts Applied:");
        System.out.println("   ✅ Private fields with public getters/setters");
        System.out.println("   ✅ Read-only properties (studentId)");
        System.out.println("   ✅ Calculated properties (classLevel, academicStanding)");
        System.out.println("   ✅ Input validation in all setters");
        System.out.println("   ✅ Business rules enforcement");
        System.out.println("   ✅ State management (active/inactive)");
        System.out.println("   ✅ Complex business logic (GPA calculation)");
        
        System.out.println("\n=====================================");
    }
}
```

**Expected Output:**
```
===== STUDENT MANAGEMENT SYSTEM =====

--- Enrolling Students ---

✅ Student enrolled: Alice Johnson (ID: 1001)
✅ Student enrolled: Bob Smith (ID: 1002)
✅ Student enrolled: Charlie Brown (ID: 1003)

--- Alice's Academic Progress ---
✅ Course completed: Intro to Programming
   Credits earned: 3
   Grade: 3.7
   New GPA: 3.70
   Total credits: 3
✅ Course completed: Data Structures
   Credits earned: 4
   Grade: 3.9
   New GPA: 3.83
   Total credits: 7
✅ Course completed: Algorithms
   Credits earned: 4
   Grade: 3.8
   New GPA: 3.82
   Total credits: 11
✅ Course completed: Database Systems
   Credits earned: 3
   Grade: 4.0
   New GPA: 3.86
   Total credits: 14

╔════════════════════════════════════════════════╗
║         STUDENT INFORMATION                   ║
╚════════════════════════════════════════════════╝
Student ID: 1001
Name: Alice Johnson
Age: 20
Email: alice@university.edu
Major: Computer Science
Status: Active
────────────────────────────────────────────────
GPA: 3.86
Credits Completed: 14
Credits Remaining: 106
Class Level: Freshman
Academic Standing: Dean's List
Eligible for Graduation: No
════════════════════════════════════════════════

[... similar output for Bob and Charlie ...]

--- Testing Validation ---
❌ Invalid age: 200 (must be 16-100)
❌ Invalid email format
❌ Invalid credit hours: 10

--- Testing Withdrawal ---
⚠️  Student withdrawn: Bob Smith
❌ Student is not active
✅ Student re-enrolled: Bob Smith

✅ Course completed: Test Course
   Credits earned: 3
   Grade: 3.0
   New GPA: 2.93
   Total credits: 14

--- Student Summary ---
╔════════════════════════════════════════════════════════════════════╗
║                    STUDENT ROSTER                                 ║
╚════════════════════════════════════════════════════════════════════╝
ID       Name                 Major           GPA    Credits Level       
────────────────────────────────────────────────────────────────────
1001     Alice Johnson        Computer Science  3.86   14/120  Freshman    
1002     Bob Smith            Mathematics       2.93   14/120  Freshman    
1003     Charlie Brown        Physics           3.50  120/120  Senior      
════════════════════════════════════════════════════════════════════

💡 Encapsulation Concepts Applied:
   ✅ Private fields with public getters/setters
   ✅ Read-only properties (studentId)
   ✅ Calculated properties (classLevel, academicStanding)
   ✅ Input validation in all setters
   ✅ Business rules enforcement
   ✅ State management (active/inactive)
   ✅ Complex business logic (GPA calculation)

=====================================
```

**💡 Key Concepts:**

| Concept | Application in System |
|---------|----------------------|
| **Private Fields** | All student data hidden |
| **Getters/Setters** | Controlled access with validation |
| **Read-Only** | studentId cannot be changed |
| **Calculated Properties** | GPA, class level, academic standing |
| **Business Rules** | Credit limits, GPA ranges, graduation requirements |
| **State Management** | Active/inactive status |

**Real-World Benefits:**
```
1. Data Integrity
   - All data validated before acceptance
   - Invalid data rejected or corrected
   - Consistent state maintained

2. Business Logic Centralization
   - All rules in one place
   - Easy to update and maintain
   - Consistent enforcement

3. Flexibility
   - Can change internal implementation
   - External code doesn't break
   - Easy to add new features

4. Security
   - Data cannot be corrupted
   - Access controlled through methods
   - Sensitive data protected
```

**✅ Success Criteria:**
- [ ] Understand complete encapsulation implementation
- [ ] Can combine all encapsulation concepts
- [ ] See real-world application benefits
- [ ] Can create similar systems independently
- [ ] Understand data integrity importance

**🎯 Challenge:**
1. Add course enrollment system (max 5 courses per semester)
2. Implement transcript generation
3. Add scholarship eligibility calculation
4. Create academic advisor assignment system
5. Add grade appeal process

---

### 🎓 Day 13 Summary: Encapsulation

**What You Learned:**
1. ✅ Private fields and data hiding
2. ✅ Getters and setters with validation
3. ✅ Read-only and write-only properties
4. ✅ Immutable objects
5. ✅ Business rules and validation
6. ✅ Real-world application

**Key Takeaways:**
- Encapsulation protects data from invalid modifications
- Private fields + public methods = controlled access
- Validation in setters ensures data integrity
- Immutable objects are thread-safe and predictable
- Business rules should be enforced in code
- Calculated properties derive from other data

**Encapsulation Checklist:**
```
✅ Make fields private
✅ Provide public getters/setters
✅ Validate in setters
✅ Use final for read-only fields
✅ Calculate derived properties
✅ Enforce business rules
✅ Document validation rules
```

**Next Steps:**
- Day 14: Inheritance (extends, super, method overriding)
- Day 15: Polymorphism (runtime polymorphism, upcasting)
- Day 16: Abstract Classes and Interfaces

---

## Day 14: Inheritance (2 hours)

**Learning Objectives:**
- Understand inheritance and code reuse
- Learn to use the `extends` keyword
- Master the `super` keyword
- Understand method overriding
- Learn inheritance hierarchies
- Build real-world inheritance systems

---

#### Exercise 1: Introduction to Inheritance with `extends` (20 minutes)

**What you'll learn:** Creating child classes that inherit from parent classes

**Create two classes: `Animal` (parent) and `Dog` (child)**

**Concept:** **Inheritance** = A child class inherits properties and methods from a parent class. Use `extends` keyword to create inheritance relationship.

```java
// PARENT CLASS (also called superclass or base class)
class Animal {
    // Properties
    String name;
    int age;
    
    // Constructor
    Animal(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("✅ Animal created: " + name);
    }
    
    // Methods
    void eat() {
        System.out.println(this.name + " is eating...");
    }
    
    void sleep() {
        System.out.println(this.name + " is sleeping... 💤");
    }
    
    void makeSound() {
        System.out.println(this.name + " makes a sound");
    }
    
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║      ANIMAL INFORMATION       ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age + " years");
        System.out.println("════════════════════════════════");
    }
}

// CHILD CLASS (also called subclass or derived class)
class Dog extends Animal {
    // Additional property specific to Dog
    String breed;
    
    // Constructor
    Dog(String name, int age, String breed) {
        super(name, age);  // Call parent constructor
        this.breed = breed;
        System.out.println("   Breed: " + breed);
    }
    
    // Additional method specific to Dog
    void bark() {
        System.out.println(this.name + " says: Woof! Woof! 🐕");
    }
    
    void wagTail() {
        System.out.println(this.name + " is wagging tail happily! 🐕");
    }
    
    // Override parent's displayInfo to include breed
    @Override
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║       DOG INFORMATION         ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age + " years");
        System.out.println("Breed: " + this.breed);
        System.out.println("════════════════════════════════");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        System.out.println("===== INHERITANCE BASICS =====\n");
        
        // Create Animal object
        System.out.println("--- Creating Animal ---");
        Animal animal = new Animal("Generic Animal", 5);
        animal.displayInfo();
        
        System.out.println("\n--- Animal Actions ---");
        animal.eat();
        animal.sleep();
        animal.makeSound();
        
        // Create Dog object (inherits from Animal)
        System.out.println("\n--- Creating Dog ---");
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        dog.displayInfo();
        
        System.out.println("\n--- Dog Actions ---");
        // Inherited methods from Animal
        dog.eat();
        dog.sleep();
        dog.makeSound();
        
        // Dog-specific methods
        dog.bark();
        dog.wagTail();
        
        System.out.println("\n💡 What Dog Inherited from Animal:");
        System.out.println("   ✅ Properties: name, age");
        System.out.println("   ✅ Methods: eat(), sleep(), makeSound()");
        System.out.println("   ✅ Plus Dog adds: breed property");
        System.out.println("   ✅ Plus Dog adds: bark(), wagTail() methods");
        
        System.out.println("\n💡 Inheritance Relationship:");
        System.out.println("   Animal (Parent/Superclass)");
        System.out.println("      ↓ extends");
        System.out.println("   Dog (Child/Subclass)");
        
        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== INHERITANCE BASICS =====

--- Creating Animal ---
✅ Animal created: Generic Animal

╔════════════════════════════════╗
║      ANIMAL INFORMATION       ║
╚════════════════════════════════╝
Name: Generic Animal
Age: 5 years
════════════════════════════════

--- Animal Actions ---
Generic Animal is eating...
Generic Animal is sleeping... 💤
Generic Animal makes a sound

--- Creating Dog ---
✅ Animal created: Buddy
   Breed: Golden Retriever

╔════════════════════════════════╗
║       DOG INFORMATION         ║
╚════════════════════════════════╝
Name: Buddy
Age: 3 years
Breed: Golden Retriever
════════════════════════════════

--- Dog Actions ---
Buddy is eating...
Buddy is sleeping... 💤
Buddy makes a sound
Buddy says: Woof! Woof! 🐕
Buddy is wagging tail happily! 🐕

💡 What Dog Inherited from Animal:
   ✅ Properties: name, age
   ✅ Methods: eat(), sleep(), makeSound()
   ✅ Plus Dog adds: breed property
   ✅ Plus Dog adds: bark(), wagTail() methods

💡 Inheritance Relationship:
   Animal (Parent/Superclass)
      ↓ extends
   Dog (Child/Subclass)

==============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Inheritance** | Child class inherits from parent class |
| **extends** | Keyword to create inheritance relationship |
| **Parent/Superclass** | Class being inherited from |
| **Child/Subclass** | Class that inherits |
| **super()** | Calls parent class constructor |
| **Code Reuse** | Don't repeat code, inherit it |

**Inheritance Syntax:**
```java
// Parent class
class Parent {
    // properties and methods
}

// Child class inherits from Parent
class Child extends Parent {
    // inherits all Parent properties/methods
    // can add new properties/methods
    // can override Parent methods
}
```

**Benefits of Inheritance:**
```
1. Code Reuse
   - Write common code once in parent
   - All children automatically get it

2. Logical Organization
   - Group related classes
   - Clear hierarchy

3. Easier Maintenance
   - Update parent, all children benefit
   - Fix bugs in one place

4. Extensibility
   - Easy to add new child classes
   - Existing code doesn't break
```

**✅ Success Criteria:**
- [ ] Understand inheritance concept
- [ ] Can use `extends` keyword
- [ ] Know what gets inherited
- [ ] Can call parent constructor with `super()`
- [ ] See benefits of code reuse

**🎯 Challenge:**
1. Create a `Cat` class that extends `Animal`
2. Add cat-specific properties (color, indoor/outdoor)
3. Add cat-specific methods (meow(), scratch())
4. Create multiple cats and test all methods

---

#### Exercise 2: The `super` Keyword (25 minutes)

**What you'll learn:** Using `super` to access parent class members

**Create classes: `Vehicle` (parent) and `Car` (child)**

**Concept:** **super** keyword is used to:
1. Call parent class constructor: `super()`
2. Access parent class methods: `super.methodName()`
3. Access parent class properties: `super.propertyName`

```java
class Vehicle {
    String brand;
    int year;
    double price;
    
    // Constructor
    Vehicle(String brand, int year, double price) {
        this.brand = brand;
        this.year = year;
        this.price = price;
        System.out.println("✅ Vehicle created: " + brand);
    }
    
    void start() {
        System.out.println(this.brand + " is starting...");
    }
    
    void stop() {
        System.out.println(this.brand + " is stopping...");
    }
    
    void displayInfo() {
        System.out.println("Brand: " + this.brand);
        System.out.println("Year: " + this.year);
        System.out.println("Price: $" + this.price);
    }
    
    double calculateDepreciation() {
        int age = 2024 - this.year;
        double depreciation = this.price * 0.1 * age;
        return Math.max(0, this.price - depreciation);
    }
}

class Car extends Vehicle {
    int numberOfDoors;
    String fuelType;
    
    // Constructor using super()
    Car(String brand, int year, double price, int numberOfDoors, String fuelType) {
        // MUST call parent constructor first
        super(brand, year, price);
        this.numberOfDoors = numberOfDoors;
        this.fuelType = fuelType;
        System.out.println("   Type: Car with " + numberOfDoors + " doors");
    }
    
    // Method that uses super to call parent method
    @Override
    void start() {
        System.out.println("🔑 Inserting key...");
        super.start();  // Call parent's start() method
        System.out.println("🚗 Car is ready to drive!");
    }
    
    // Method that uses super to call parent method
    @Override
    void stop() {
        System.out.println("🚗 Applying brakes...");
        super.stop();  // Call parent's stop() method
        System.out.println("🔒 Car is parked!");
    }
    
    // Override displayInfo but use super to call parent version
    @Override
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║       CAR INFORMATION         ║");
        System.out.println("╚════════════════════════════════╝");
        
        // Call parent's displayInfo
        super.displayInfo();
        
        // Add car-specific info
        System.out.println("Number of Doors: " + this.numberOfDoors);
        System.out.println("Fuel Type: " + this.fuelType);
        
        // Use parent's method
        System.out.println("Current Value: $" + super.calculateDepreciation());
        System.out.println("════════════════════════════════");
    }
    
    // Car-specific method
    void honk() {
        System.out.println(this.brand + " says: Beep! Beep! 🚗");
    }
}

public class SuperKeywordDemo {
    public static void main(String[] args) {
        System.out.println("===== SUPER KEYWORD =====\n");
        
        // Create Vehicle
        System.out.println("--- Creating Vehicle ---");
        Vehicle vehicle = new Vehicle("Generic Vehicle", 2020, 15000);
        vehicle.displayInfo();
        
        System.out.println("\n--- Vehicle Actions ---");
        vehicle.start();
        vehicle.stop();
        
        // Create Car
        System.out.println("\n--- Creating Car ---");
        Car car = new Car("Toyota Camry", 2022, 28000, 4, "Gasoline");
        car.displayInfo();
        
        System.out.println("\n--- Car Actions ---");
        car.start();  // Uses super.start()
        car.honk();
        car.stop();   // Uses super.stop()
        
        System.out.println("\n💡 How super is Used:");
        System.out.println("   1. super(brand, year, price) - Calls parent constructor");
        System.out.println("   2. super.start() - Calls parent's start() method");
        System.out.println("   3. super.displayInfo() - Calls parent's displayInfo()");
        System.out.println("   4. super.calculateDepreciation() - Uses parent's method");
        
        System.out.println("\n💡 super vs this:");
        System.out.println("   this  = refers to current object");
        System.out.println("   super = refers to parent class");
        
        System.out.println("\n=========================");
    }
}
```

**Expected Output:**
```
===== SUPER KEYWORD =====

--- Creating Vehicle ---
✅ Vehicle created: Generic Vehicle
Brand: Generic Vehicle
Year: 2020
Price: $15000.0

--- Vehicle Actions ---
Generic Vehicle is starting...
Generic Vehicle is stopping...

--- Creating Car ---
✅ Vehicle created: Toyota Camry
   Type: Car with 4 doors

╔════════════════════════════════╗
║       CAR INFORMATION         ║
╚════════════════════════════════╝
Brand: Toyota Camry
Year: 2022
Price: $28000.0
Number of Doors: 4
Fuel Type: Gasoline
Current Value: $27200.0
════════════════════════════════

--- Car Actions ---
🔑 Inserting key...
Toyota Camry is starting...
🚗 Car is ready to drive!
Toyota Camry says: Beep! Beep! 🚗
🚗 Applying brakes...
Toyota Camry is stopping...
🔒 Car is parked!

💡 How super is Used:
   1. super(brand, year, price) - Calls parent constructor
   2. super.start() - Calls parent's start() method
   3. super.displayInfo() - Calls parent's displayInfo()
   4. super.calculateDepreciation() - Uses parent's method

💡 super vs this:
   this  = refers to current object
   super = refers to parent class

=========================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **super()** | Calls parent class constructor |
| **super.method()** | Calls parent class method |
| **super.property** | Accesses parent class property |
| **Must be first** | super() must be first in constructor |

**Three Uses of super:**
```java
class Child extends Parent {
    // 1. Call parent constructor
    Child() {
        super();  // Must be first statement
    }
    
    // 2. Call parent method
    void someMethod() {
        super.someMethod();  // Call parent's version
        // Add child-specific code
    }
    
    // 3. Access parent property
    void display() {
        System.out.println(super.propertyName);
    }
}
```

**Common Patterns:**
```java
// Pattern 1: Extend parent behavior
@Override
void start() {
    super.start();  // Do parent's work first
    // Add child-specific work
}

// Pattern 2: Reuse parent code
@Override
void displayInfo() {
    super.displayInfo();  // Show parent info
    // Add child-specific info
}

// Pattern 3: Initialize parent first
Child(params) {
    super(parentParams);  // Initialize parent
    // Initialize child-specific fields
}
```

**✅ Success Criteria:**
- [ ] Understand three uses of `super`
- [ ] Can call parent constructor
- [ ] Can call parent methods
- [ ] Know `super()` must be first in constructor
- [ ] See how to extend parent behavior

**🎯 Challenge:**
1. Create `ElectricCar` that extends `Car`
2. Add battery capacity and charging methods
3. Override `start()` to include battery check
4. Use `super` to reuse parent functionality

---

#### Exercise 3: Method Overriding (25 minutes)

**What you'll learn:** Overriding parent methods to provide child-specific implementations

**Create classes: `Shape` (parent), `Circle`, and `Rectangle` (children)**

**Concept:** **Method Overriding** = Child class provides its own implementation of a parent class method. Use `@Override` annotation to indicate overriding.

```java
class Shape {
    String color;
    
    Shape(String color) {
        this.color = color;
        System.out.println("✅ Shape created with color: " + color);
    }
    
    // Method to be overridden by child classes
    double calculateArea() {
        System.out.println("⚠️  Generic shape - area calculation not defined");
        return 0.0;
    }
    
    // Method to be overridden by child classes
    double calculatePerimeter() {
        System.out.println("⚠️  Generic shape - perimeter calculation not defined");
        return 0.0;
    }
    
    // Method that won't be overridden
    void displayColor() {
        System.out.println("Color: " + this.color);
    }
    
    // Method that will be overridden
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║      SHAPE INFORMATION        ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Type: Generic Shape");
        System.out.println("Color: " + this.color);
        System.out.println("════════════════════════════════");
    }
}

class Circle extends Shape {
    double radius;
    
    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
        System.out.println("   Shape: Circle with radius " + radius);
    }
    
    // OVERRIDE: Provide Circle-specific area calculation
    @Override
    double calculateArea() {
        double area = Math.PI * radius * radius;
        System.out.println("🔵 Circle area = π × r² = π × " + radius + "² = " + 
                         String.format("%.2f", area));
        return area;
    }
    
    // OVERRIDE: Provide Circle-specific perimeter calculation
    @Override
    double calculatePerimeter() {
        double perimeter = 2 * Math.PI * radius;
        System.out.println("🔵 Circle perimeter = 2 × π × r = 2 × π × " + radius + 
                         " = " + String.format("%.2f", perimeter));
        return perimeter;
    }
    
    // OVERRIDE: Provide Circle-specific display
    @Override
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║      CIRCLE INFORMATION       ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Type: Circle");
        System.out.println("Color: " + this.color);
        System.out.println("Radius: " + this.radius);
        System.out.println("Area: " + String.format("%.2f", calculateArea()));
        System.out.println("Perimeter: " + String.format("%.2f", calculatePerimeter()));
        System.out.println("════════════════════════════════");
    }
}

class Rectangle extends Shape {
    double length;
    double width;
    
    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
        System.out.println("   Shape: Rectangle " + length + " × " + width);
    }
    
    // OVERRIDE: Provide Rectangle-specific area calculation
    @Override
    double calculateArea() {
        double area = length * width;
        System.out.println("🟦 Rectangle area = length × width = " + length + 
                         " × " + width + " = " + area);
        return area;
    }
    
    // OVERRIDE: Provide Rectangle-specific perimeter calculation
    @Override
    double calculatePerimeter() {
        double perimeter = 2 * (length + width);
        System.out.println("🟦 Rectangle perimeter = 2 × (length + width) = 2 × (" + 
                         length + " + " + width + ") = " + perimeter);
        return perimeter;
    }
    
    // OVERRIDE: Provide Rectangle-specific display
    @Override
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║    RECTANGLE INFORMATION      ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Type: Rectangle");
        System.out.println("Color: " + this.color);
        System.out.println("Length: " + this.length);
        System.out.println("Width: " + this.width);
        System.out.println("Area: " + String.format("%.2f", calculateArea()));
        System.out.println("Perimeter: " + String.format("%.2f", calculatePerimeter()));
        System.out.println("════════════════════════════════");
    }
    
    // Rectangle-specific method (not overriding)
    boolean isSquare() {
        return length == width;
    }
}

public class MethodOverridingDemo {
    public static void main(String[] args) {
        System.out.println("===== METHOD OVERRIDING =====\n");
        
        // Create generic shape
        System.out.println("--- Creating Generic Shape ---");
        Shape shape = new Shape("Gray");
        shape.displayInfo();
        System.out.println("\n--- Generic Shape Calculations ---");
        shape.calculateArea();
        shape.calculatePerimeter();
        
        // Create circle
        System.out.println("\n--- Creating Circle ---");
        Circle circle = new Circle("Red", 5.0);
        circle.displayInfo();
        
        // Create rectangle
        System.out.println("\n--- Creating Rectangle ---");
        Rectangle rectangle = new Rectangle("Blue", 10.0, 5.0);
        rectangle.displayInfo();
        
        // Demonstrate overriding
        System.out.println("\n--- Demonstrating Method Overriding ---");
        System.out.println("Each shape calculates area differently:");
        
        System.out.println("\nGeneric Shape:");
        shape.calculateArea();
        
        System.out.println("\nCircle:");
        circle.calculateArea();
        
        System.out.println("\nRectangle:");
        rectangle.calculateArea();
        
        // Test rectangle-specific method
        System.out.println("\n--- Rectangle-Specific Method ---");
        System.out.println("Is rectangle a square? " + rectangle.isSquare());
        
        Rectangle square = new Rectangle("Green", 5.0, 5.0);
        System.out.println("Is square a square? " + square.isSquare());
        
        System.out.println("\n💡 Method Overriding Rules:");
        System.out.println("   ✅ Same method name as parent");
        System.out.println("   ✅ Same parameters as parent");
        System.out.println("   ✅ Same or compatible return type");
        System.out.println("   ✅ Use @Override annotation");
        System.out.println("   ✅ Cannot reduce access level");
        
        System.out.println("\n💡 Benefits:");
        System.out.println("   ✅ Each child provides specific implementation");
        System.out.println("   ✅ Same method name, different behavior");
        System.out.println("   ✅ Polymorphism (covered in Day 15)");
        
        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== METHOD OVERRIDING =====

--- Creating Generic Shape ---
✅ Shape created with color: Gray

╔════════════════════════════════╗
║      SHAPE INFORMATION        ║
╚════════════════════════════════╝
Type: Generic Shape
Color: Gray
════════════════════════════════

--- Generic Shape Calculations ---
⚠️  Generic shape - area calculation not defined
⚠️  Generic shape - perimeter calculation not defined

--- Creating Circle ---
✅ Shape created with color: Red
   Shape: Circle with radius 5.0

╔════════════════════════════════╗
║      CIRCLE INFORMATION       ║
╚════════════════════════════════╝
Type: Circle
Color: Red
Radius: 5.0
🔵 Circle area = π × r² = π × 5.0² = 78.54
Area: 78.54
🔵 Circle perimeter = 2 × π × r = 2 × π × 5.0 = 31.42
Perimeter: 31.42
════════════════════════════════

--- Creating Rectangle ---
✅ Shape created with color: Blue
   Shape: Rectangle 10.0 × 5.0

╔════════════════════════════════╗
║    RECTANGLE INFORMATION      ║
╚════════════════════════════════╝
Type: Rectangle
Color: Blue
Length: 10.0
Width: 5.0
🟦 Rectangle area = length × width = 10.0 × 5.0 = 50.0
Area: 50.00
🟦 Rectangle perimeter = 2 × (length + width) = 2 × (10.0 + 5.0) = 30.0
Perimeter: 30.00
════════════════════════════════

--- Demonstrating Method Overriding ---
Each shape calculates area differently:

Generic Shape:
⚠️  Generic shape - area calculation not defined

Circle:
🔵 Circle area = π × r² = π × 5.0² = 78.54

Rectangle:
🟦 Rectangle area = length × width = 10.0 × 5.0 = 50.0

--- Rectangle-Specific Method ---
Is rectangle a square? false
✅ Shape created with color: Green
   Shape: Rectangle 5.0 × 5.0
Is square a square? true

💡 Method Overriding Rules:
   ✅ Same method name as parent
   ✅ Same parameters as parent
   ✅ Same or compatible return type
   ✅ Use @Override annotation
   ✅ Cannot reduce access level

💡 Benefits:
   ✅ Each child provides specific implementation
   ✅ Same method name, different behavior
   ✅ Polymorphism (covered in Day 15)

=============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Method Overriding** | Child provides own implementation |
| **@Override** | Annotation to indicate overriding |
| **Same signature** | Method name and parameters must match |
| **Runtime decision** | Which method to call decided at runtime |

**Method Overriding Rules:**
```java
class Parent {
    // Original method
    public void display() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    // ✅ CORRECT: Override with same signature
    @Override
    public void display() {
        System.out.println("Child");
    }
    
    // ❌ WRONG: Different parameters = overloading, not overriding
    public void display(String msg) {
        System.out.println(msg);
    }
    
    // ❌ WRONG: Cannot reduce access level
    // Parent has public, child cannot be private
    // private void display() { }
    
    // ✅ CORRECT: Can increase access level
    // If parent was protected, child can be public
}
```

**Overriding vs Overloading:**
```
OVERRIDING (same method, different class):
- Same method name
- Same parameters
- Parent and child classes
- Runtime polymorphism

OVERLOADING (same class, different parameters):
- Same method name
- Different parameters
- Same class
- Compile-time polymorphism
```

**✅ Success Criteria:**
- [ ] Understand method overriding
- [ ] Can use @Override annotation
- [ ] Know overriding rules
- [ ] See different implementations per child
- [ ] Understand overriding vs overloading

**🎯 Challenge:**
1. Create a `Triangle` class that extends `Shape`
2. Override `calculateArea()` and `calculatePerimeter()`
3. Add triangle-specific methods
4. Create an array of different shapes and calculate total area

---

#### Exercise 4: Inheritance Hierarchy (25 minutes)

**What you'll learn:** Creating multi-level inheritance hierarchies

**Create hierarchy: `Person` → `Employee` → `Manager`**

**Concept:** **Inheritance Hierarchy** = Multiple levels of inheritance where a child class can also be a parent to another class.

```java
// LEVEL 1: Base class
class Person {
    String name;
    int age;
    String address;
    
    Person(String name, int age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
        System.out.println("✅ Person created: " + name);
    }
    
    void displayInfo() {
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
        System.out.println("Address: " + this.address);
    }
    
    void introduce() {
        System.out.println("Hi, I'm " + this.name + ", " + this.age + " years old.");
    }
}

// LEVEL 2: Employee extends Person
class Employee extends Person {
    int employeeId;
    String department;
    double salary;
    
    Employee(String name, int age, String address, int employeeId, 
             String department, double salary) {
        super(name, age, address);  // Initialize Person
        this.employeeId = employeeId;
        this.department = department;
        this.salary = salary;
        System.out.println("   Role: Employee in " + department);
    }
    
    @Override
    void displayInfo() {
        super.displayInfo();  // Show Person info
        System.out.println("Employee ID: " + this.employeeId);
        System.out.println("Department: " + this.department);
        System.out.println("Salary: $" + this.salary);
    }
    
    @Override
    void introduce() {
        super.introduce();  // Person's introduction
        System.out.println("I work in " + this.department + " department.");
    }
    
    void work() {
        System.out.println(this.name + " is working in " + this.department);
    }
    
    double calculateAnnualSalary() {
        return this.salary * 12;
    }
}

// LEVEL 3: Manager extends Employee
class Manager extends Employee {
    int teamSize;
    double bonus;
    
    Manager(String name, int age, String address, int employeeId, 
            String department, double salary, int teamSize, double bonus) {
        super(name, age, address, employeeId, department, salary);
        this.teamSize = teamSize;
        this.bonus = bonus;
        System.out.println("   Position: Manager of " + teamSize + " people");
    }
    
    @Override
    void displayInfo() {
        super.displayInfo();  // Show Employee info
        System.out.println("Team Size: " + this.teamSize);
        System.out.println("Bonus: $" + this.bonus);
        System.out.println("Total Compensation: $" + calculateTotalCompensation());
    }
    
    @Override
    void introduce() {
        super.introduce();  // Employee's introduction
        System.out.println("I manage a team of " + this.teamSize + " people.");
    }
    
    @Override
    void work() {
        System.out.println(this.name + " is managing the " + this.department + 
                         " team (" + this.teamSize + " members)");
    }
    
    // Manager-specific method
    void conductMeeting() {
        System.out.println(this.name + " is conducting a team meeting with " + 
                         this.teamSize + " members");
    }
    
    // Override to include bonus
    @Override
    double calculateAnnualSalary() {
        return (this.salary * 12) + this.bonus;
    }
    
    double calculateTotalCompensation() {
        return calculateAnnualSalary();
    }
}

public class InheritanceHierarchyDemo {
    public static void main(String[] args) {
        System.out.println("===== INHERITANCE HIERARCHY =====\n");
        
        // Create Person (Level 1)
        System.out.println("--- Creating Person ---");
        Person person = new Person("John Doe", 30, "123 Main St");
        System.out.println("\n--- Person Information ---");
        person.displayInfo();
        System.out.println("\n--- Person Introduction ---");
        person.introduce();
        
        // Create Employee (Level 2)
        System.out.println("\n--- Creating Employee ---");
        Employee employee = new Employee("Jane Smith", 28, "456 Oak Ave", 
                                        1001, "Engineering", 5000);
        System.out.println("\n--- Employee Information ---");
        employee.displayInfo();
        System.out.println("\n--- Employee Introduction ---");
        employee.introduce();
        System.out.println("\n--- Employee Actions ---");
        employee.work();
        System.out.println("Annual Salary: $" + employee.calculateAnnualSalary());
        
        // Create Manager (Level 3)
        System.out.println("\n--- Creating Manager ---");
        Manager manager = new Manager("Bob Johnson", 35, "789 Pine Rd", 
                                     2001, "Engineering", 8000, 10, 15000);
        System.out.println("\n--- Manager Information ---");
        manager.displayInfo();
        System.out.println("\n--- Manager Introduction ---");
        manager.introduce();
        System.out.println("\n--- Manager Actions ---");
        manager.work();
        manager.conductMeeting();
        System.out.println("Annual Salary: $" + manager.calculateAnnualSalary());
        
        System.out.println("\n💡 Inheritance Hierarchy:");
        System.out.println("   Person (Level 1)");
        System.out.println("      ↓ extends");
        System.out.println("   Employee (Level 2)");
        System.out.println("      ↓ extends");
        System.out.println("   Manager (Level 3)");
        
        System.out.println("\n💡 What Each Level Inherits:");
        System.out.println("   Employee inherits from Person:");
        System.out.println("      - name, age, address");
        System.out.println("      - displayInfo(), introduce()");
        System.out.println("   Manager inherits from Employee (and Person):");
        System.out.println("      - Everything from Person");
        System.out.println("      - Everything from Employee");
        System.out.println("      - Plus Manager-specific features");
        
        System.out.println("\n=================================");
    }
}
```

**Expected Output:**
```
===== INHERITANCE HIERARCHY =====

--- Creating Person ---
✅ Person created: John Doe

--- Person Information ---
Name: John Doe
Age: 30
Address: 123 Main St

--- Person Introduction ---
Hi, I'm John Doe, 30 years old.

--- Creating Employee ---
✅ Person created: Jane Smith
   Role: Employee in Engineering

--- Employee Information ---
Name: Jane Smith
Age: 28
Address: 456 Oak Ave
Employee ID: 1001
Department: Engineering
Salary: $5000.0

--- Employee Introduction ---
Hi, I'm Jane Smith, 28 years old.
I work in Engineering department.

--- Employee Actions ---
Jane Smith is working in Engineering
Annual Salary: $60000.0

--- Creating Manager ---
✅ Person created: Bob Johnson
   Role: Employee in Engineering
   Position: Manager of 10 people

--- Manager Information ---
Name: Bob Johnson
Age: 35
Address: 789 Pine Rd
Employee ID: 2001
Department: Engineering
Salary: $8000.0
Team Size: 10
Bonus: $15000.0
Total Compensation: $111000.0

--- Manager Introduction ---
Hi, I'm Bob Johnson, 35 years old.
I work in Engineering department.
I manage a team of 10 people.

--- Manager Actions ---
Bob Johnson is managing the Engineering team (10 members)
Bob Johnson is conducting a team meeting with 10 members
Annual Salary: $111000.0

💡 Inheritance Hierarchy:
   Person (Level 1)
      ↓ extends
   Employee (Level 2)
      ↓ extends
   Manager (Level 3)

💡 What Each Level Inherits:
   Employee inherits from Person:
      - name, age, address
      - displayInfo(), introduce()
   Manager inherits from Employee (and Person):
      - Everything from Person
      - Everything from Employee
      - Plus Manager-specific features

=================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Multi-level Inheritance** | Class extends class that extends class |
| **Transitive Inheritance** | Grandchild inherits from grandparent |
| **Hierarchy** | Organized levels of inheritance |
| **Specialization** | Each level adds more specific features |

**Inheritance Hierarchy Patterns:**
```
SINGLE INHERITANCE:
Parent → Child

MULTI-LEVEL INHERITANCE:
Grandparent → Parent → Child

HIERARCHICAL INHERITANCE:
        Parent
       /      \
   Child1    Child2

Note: Java does NOT support multiple inheritance
(a class cannot extend multiple classes)
```

**✅ Success Criteria:**
- [ ] Understand multi-level inheritance
- [ ] Can create inheritance hierarchies
- [ ] Know transitive inheritance
- [ ] See specialization at each level
- [ ] Understand inheritance flow

**🎯 Challenge:**
1. Add a `Director` class that extends `Manager`
2. Add an `Intern` class that extends `Employee`
3. Create a method to display the entire hierarchy
4. Calculate total payroll for all employees

---

#### Exercise 5: Protected Access Modifier (20 minutes)

**What you'll learn:** Using protected access for inheritance

**Create classes: `BankAccount` (parent) and `SavingsAccount` (child)**

**Concept:** **protected** access modifier allows access within the same package and by subclasses (even in different packages). It's between private and public.

```java
class BankAccount {
    // private: Only accessible within this class
    private String accountNumber;
    
    // protected: Accessible in this class, subclasses, and same package
    protected double balance;
    protected String accountHolder;
    
    // public: Accessible everywhere
    public String bankName;
    
    public BankAccount(String accountNumber, String accountHolder, double balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.bankName = "MyBank";
        System.out.println("✅ Bank account created: " + accountNumber);
    }
    
    // protected method: Accessible to subclasses
    protected void updateBalance(double amount) {
        this.balance += amount;
        System.out.println("💰 Balance updated: $" + this.balance);
    }
    
    // protected method: Can be used by subclasses
    protected boolean hasMinimumBalance(double minimum) {
        return this.balance >= minimum;
    }
    
    // public method
    public void displayBalance() {
        System.out.println("Current balance: $" + this.balance);
    }
    
    // private method: NOT accessible to subclasses
    private void logTransaction(String type, double amount) {
        System.out.println("[LOG] " + type + ": $" + amount);
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            this.updateBalance(amount);  // Call protected method
            this.logTransaction("Deposit", amount);  // Call private method
        }
    }
    
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║   BANK ACCOUNT INFORMATION    ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Account Holder: " + this.accountHolder);
        System.out.println("Balance: $" + this.balance);
        System.out.println("Bank: " + this.bankName);
        System.out.println("════════════════════════════════");
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate;
    private static final double MIN_BALANCE = 500.0;
    
    public SavingsAccount(String accountNumber, String accountHolder, 
                         double balance, double interestRate) {
        super(accountNumber, accountHolder, balance);
        this.interestRate = interestRate;
        System.out.println("   Type: Savings Account");
        System.out.println("   Interest Rate: " + (interestRate * 100) + "%");
    }
    
    // Can access protected members from parent
    public void addInterest() {
        // ✅ Can access protected field 'balance'
        double interest = this.balance * this.interestRate;
        System.out.println("💵 Calculating interest...");
        System.out.println("   Current balance: $" + this.balance);
        System.out.println("   Interest rate: " + (this.interestRate * 100) + "%");
        System.out.println("   Interest earned: $" + interest);
        
        // ✅ Can call protected method 'updateBalance'
        this.updateBalance(interest);
    }
    
    public void withdraw(double amount) {
        System.out.println("\n--- Withdrawal Request ---");
        System.out.println("Requested amount: $" + amount);
        
        // ✅ Can access protected field 'balance'
        System.out.println("Current balance: $" + this.balance);
        
        // ✅ Can call protected method 'hasMinimumBalance'
        if (this.balance - amount < MIN_BALANCE) {
            System.out.println("❌ Cannot withdraw: Must maintain minimum balance of $" + 
                             MIN_BALANCE);
            System.out.println("   Available to withdraw: $" + 
                             (this.balance - MIN_BALANCE));
        } else {
            // ✅ Can call protected method 'updateBalance'
            this.updateBalance(-amount);
            System.out.println("✅ Withdrawal successful");
        }
        
        // ❌ Cannot access private method 'logTransaction'
        // this.logTransaction("Withdrawal", amount);  // ERROR!
    }
    
    @Override
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║  SAVINGS ACCOUNT INFORMATION  ║");
        System.out.println("╚════════════════════════════════╝");
        // ✅ Can access protected field 'accountHolder'
        System.out.println("Account Holder: " + this.accountHolder);
        // ✅ Can access protected field 'balance'
        System.out.println("Balance: $" + this.balance);
        // ✅ Can access public field 'bankName'
        System.out.println("Bank: " + this.bankName);
        System.out.println("Interest Rate: " + (this.interestRate * 100) + "%");
        System.out.println("Minimum Balance: $" + MIN_BALANCE);
        // ❌ Cannot access private field 'accountNumber'
        // System.out.println("Account: " + this.accountNumber);  // ERROR!
        System.out.println("════════════════════════════════");
    }
}

public class ProtectedAccessDemo {
    public static void main(String[] args) {
        System.out.println("===== PROTECTED ACCESS MODIFIER =====\n");
        
        // Create BankAccount
        System.out.println("--- Creating Bank Account ---");
        BankAccount account = new BankAccount("ACC001", "John Doe", 1000.0);
        account.displayInfo();
        
        System.out.println("\n--- Bank Account Operations ---");
        account.deposit(500.0);
        account.displayBalance();
        
        // Create SavingsAccount
        System.out.println("\n--- Creating Savings Account ---");
        SavingsAccount savings = new SavingsAccount("SAV001", "Jane Smith", 
                                                    2000.0, 0.05);
        savings.displayInfo();
        
        System.out.println("\n--- Savings Account Operations ---");
        savings.addInterest();
        savings.withdraw(500.0);
        savings.withdraw(2000.0);  // Should fail
        
        savings.displayInfo();
        
        System.out.println("\n💡 Access Modifiers Summary:");
        System.out.println("   ┌─────────────┬─────────┬─────────┬──────────┬───────────┐");
        System.out.println("   │  Modifier   │  Class  │ Package │ Subclass │ Everywhere│");
        System.out.println("   ├─────────────┼─────────┼─────────┼──────────┼───────────┤");
        System.out.println("   │  private    │    ✅   │    ❌   │    ❌    │     ❌    │");
        System.out.println("   │  (default)  │    ✅   │    ✅   │    ❌    │     ❌    │");
        System.out.println("   │  protected  │    ✅   │    ✅   │    ✅    │     ❌    │");
        System.out.println("   │  public     │    ✅   │    ✅   │    ✅    │     ✅    │");
        System.out.println("   └─────────────┴─────────┴─────────┴──────────┴───────────┘");
        
        System.out.println("\n💡 When to Use Protected:");
        System.out.println("   ✅ Fields/methods that subclasses need to access");
        System.out.println("   ✅ Helper methods for subclasses");
        System.out.println("   ✅ Internal state that subclasses can modify");
        System.out.println("   ❌ Don't use for public API");
        System.out.println("   ❌ Don't use if private is sufficient");
        
        System.out.println("\n=====================================");
    }
}
```

**Expected Output:**
```
===== PROTECTED ACCESS MODIFIER =====

--- Creating Bank Account ---
✅ Bank account created: ACC001

╔════════════════════════════════╗
║   BANK ACCOUNT INFORMATION    ║
╚════════════════════════════════╝
Account Holder: John Doe
Balance: $1000.0
Bank: MyBank
════════════════════════════════

--- Bank Account Operations ---
💰 Balance updated: $1500.0
[LOG] Deposit: $500.0
Current balance: $1500.0

--- Creating Savings Account ---
✅ Bank account created: SAV001
   Type: Savings Account
   Interest Rate: 5.0%

╔════════════════════════════════╗
║  SAVINGS ACCOUNT INFORMATION  ║
╚════════════════════════════════╝
Account Holder: Jane Smith
Balance: $2000.0
Bank: MyBank
Interest Rate: 5.0%
Minimum Balance: $500.0
════════════════════════════════

--- Savings Account Operations ---
💵 Calculating interest...
   Current balance: $2000.0
   Interest rate: 5.0%
   Interest earned: $100.0
💰 Balance updated: $2100.0

--- Withdrawal Request ---
Requested amount: $500.0
Current balance: $2100.0
💰 Balance updated: $1600.0
✅ Withdrawal successful

--- Withdrawal Request ---
Requested amount: $2000.0
Current balance: $1600.0
❌ Cannot withdraw: Must maintain minimum balance of $500.0
   Available to withdraw: $1100.0

╔════════════════════════════════╗
║  SAVINGS ACCOUNT INFORMATION  ║
╚════════════════════════════════╝
Account Holder: Jane Smith
Balance: $1600.0
Bank: MyBank
Interest Rate: 5.0%
Minimum Balance: $500.0
════════════════════════════════

💡 Access Modifiers Summary:
   ┌─────────────┬─────────┬─────────┬──────────┬───────────┐
   │  Modifier   │  Class  │ Package │ Subclass │ Everywhere│
   ├─────────────┼─────────┼─────────┼──────────┼───────────┤
   │  private    │    ✅   │    ❌   │    ❌    │     ❌    │
   │  (default)  │    ✅   │    ✅   │    ❌    │     ❌    │
   │  protected  │    ✅   │    ✅   │    ✅    │     ❌    │
   │  public     │    ✅   │    ✅   │    ✅    │     ✅    │
   └─────────────┴─────────┴─────────┴──────────┴───────────┘

💡 When to Use Protected:
   ✅ Fields/methods that subclasses need to access
   ✅ Helper methods for subclasses
   ✅ Internal state that subclasses can modify
   ❌ Don't use for public API
   ❌ Don't use if private is sufficient

=====================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **protected** | Accessible in class, package, and subclasses |
| **Inheritance access** | Subclasses can access protected members |
| **Encapsulation** | Still hides from outside world |
| **Design choice** | Balance between private and public |

**Access Modifier Guidelines:**
```java
class Parent {
    // Use private for internal implementation
    private String secret;
    
    // Use protected for subclass access
    protected String sharedData;
    
    // Use public for external API
    public String publicData;
    
    // Use private for helper methods
    private void internalHelper() { }
    
    // Use protected for subclass helpers
    protected void subclassHelper() { }
    
    // Use public for API methods
    public void publicMethod() { }
}
```

**✅ Success Criteria:**
- [ ] Understand protected access modifier
- [ ] Know when to use protected
- [ ] See difference from private and public
- [ ] Can access protected members in subclass
- [ ] Understand access modifier hierarchy

**🎯 Challenge:**
1. Create a `CheckingAccount` that extends `BankAccount`
2. Use protected members to implement overdraft protection
3. Add protected helper methods
4. Test access from different contexts

---

#### Exercise 6: Real-World Application - University System (30 minutes)

**What you'll learn:** Building a complete inheritance-based system

**Create hierarchy: `Person` → `Student`/`Professor`**

**Concept:** Applying all inheritance concepts in a real-world university management system.

```java
// BASE CLASS
class Person {
    protected String name;
    protected int age;
    protected String email;
    protected String address;
    
    public Person(String name, int age, String email, String address) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.address = address;
        System.out.println("✅ Person registered: " + name);
    }
    
    public void displayInfo() {
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
        System.out.println("Email: " + this.email);
        System.out.println("Address: " + this.address);
    }
    
    public void updateEmail(String newEmail) {
        this.email = newEmail;
        System.out.println("✅ Email updated to: " + newEmail);
    }
    
    public void updateAddress(String newAddress) {
        this.address = newAddress;
        System.out.println("✅ Address updated");
    }
}

// STUDENT CLASS
class Student extends Person {
    private int studentId;
    private String major;
    private double gpa;
    private int creditsCompleted;
    
    public Student(String name, int age, String email, String address,
                  int studentId, String major) {
        super(name, age, email, address);
        this.studentId = studentId;
        this.major = major;
        this.gpa = 0.0;
        this.creditsCompleted = 0;
        System.out.println("   Role: Student");
        System.out.println("   Student ID: " + studentId);
        System.out.println("   Major: " + major);
    }
    
    @Override
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║       STUDENT INFORMATION             ║");
        System.out.println("╚════════════════════════════════════════╝");
        super.displayInfo();
        System.out.println("Student ID: " + this.studentId);
        System.out.println("Major: " + this.major);
        System.out.println("GPA: " + String.format("%.2f", this.gpa));
        System.out.println("Credits Completed: " + this.creditsCompleted);
        System.out.println("Class Level: " + getClassLevel());
        System.out.println("════════════════════════════════════════");
    }
    
    public void completeCourse(String courseName, int credits, double grade) {
        this.creditsCompleted += credits;
        
        // Recalculate GPA (simplified)
        double totalPoints = (this.gpa * (this.creditsCompleted - credits)) + 
                            (grade * credits);
        this.gpa = totalPoints / this.creditsCompleted;
        
        System.out.println("✅ Course completed: " + courseName);
        System.out.println("   Credits: " + credits + ", Grade: " + grade);
        System.out.println("   New GPA: " + String.format("%.2f", this.gpa));
    }
    
    public String getClassLevel() {
        if (creditsCompleted >= 90) return "Senior";
        if (creditsCompleted >= 60) return "Junior";
        if (creditsCompleted >= 30) return "Sophomore";
        return "Freshman";
    }
    
    public void study() {
        System.out.println(this.name + " is studying " + this.major);
    }
}

// PROFESSOR CLASS
class Professor extends Person {
    private int employeeId;
    private String department;
    private double salary;
    private String[] coursesTeaching;
    private int courseCount;
    
    public Professor(String name, int age, String email, String address,
                    int employeeId, String department, double salary) {
        super(name, age, email, address);
        this.employeeId = employeeId;
        this.department = department;
        this.salary = salary;
        this.coursesTeaching = new String[10];
        this.courseCount = 0;
        System.out.println("   Role: Professor");
        System.out.println("   Employee ID: " + employeeId);
        System.out.println("   Department: " + department);
    }
    
    @Override
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      PROFESSOR INFORMATION            ║");
        System.out.println("╚════════════════════════════════════════╝");
        super.displayInfo();
        System.out.println("Employee ID: " + this.employeeId);
        System.out.println("Department: " + this.department);
        System.out.println("Salary: $" + this.salary);
        System.out.println("Courses Teaching: " + this.courseCount);
        if (this.courseCount > 0) {
            System.out.println("Course List:");
            for (int i = 0; i < this.courseCount; i++) {
                System.out.println("   " + (i + 1) + ". " + this.coursesTeaching[i]);
            }
        }
        System.out.println("════════════════════════════════════════");
    }
    
    public void assignCourse(String courseName) {
        if (this.courseCount < this.coursesTeaching.length) {
            this.coursesTeaching[this.courseCount] = courseName;
            this.courseCount++;
            System.out.println("✅ Course assigned: " + courseName);
        } else {
            System.out.println("❌ Cannot assign more courses (limit reached)");
        }
    }
    
    public void teach() {
        System.out.println(this.name + " is teaching in " + this.department + 
                         " department");
        if (this.courseCount > 0) {
            System.out.println("Current courses:");
            for (int i = 0; i < this.courseCount; i++) {
                System.out.println("   - " + this.coursesTeaching[i]);
            }
        }
    }
    
    public void conductResearch(String topic) {
        System.out.println(this.name + " is conducting research on: " + topic);
    }
    
    public void giveRaise(double percentage) {
        double raiseAmount = this.salary * (percentage / 100);
        this.salary += raiseAmount;
        System.out.println("💰 Raise given: " + percentage + "%");
        System.out.println("   Raise amount: $" + raiseAmount);
        System.out.println("   New salary: $" + this.salary);
    }
}

public class UniversitySystemDemo {
    public static void main(String[] args) {
        System.out.println("===== UNIVERSITY MANAGEMENT SYSTEM =====\n");
        
        // Create students
        System.out.println("--- Enrolling Students ---\n");
        Student student1 = new Student("Alice Johnson", 20, "alice@university.edu",
                                      "123 Campus Dr", 1001, "Computer Science");
        
        Student student2 = new Student("Bob Smith", 19, "bob@university.edu",
                                      "456 Dorm St", 1002, "Mathematics");
        
        // Create professors
        System.out.println("\n--- Hiring Professors ---\n");
        Professor prof1 = new Professor("Dr. Emily Brown", 45, "emily@university.edu",
                                       "789 Faculty Ave", 2001, "Computer Science", 85000);
        
        Professor prof2 = new Professor("Dr. Michael Davis", 50, "michael@university.edu",
                                       "321 Professor Ln", 2002, "Mathematics", 90000);
        
        // Display initial information
        student1.displayInfo();
        student2.displayInfo();
        prof1.displayInfo();
        prof2.displayInfo();
        
        // Student operations
        System.out.println("\n--- Student Activities ---\n");
        student1.study();
        student1.completeCourse("Intro to Programming", 3, 3.7);
        student1.completeCourse("Data Structures", 4, 3.9);
        student1.completeCourse("Algorithms", 4, 3.8);
        
        student2.study();
        student2.completeCourse("Calculus I", 4, 3.5);
        student2.completeCourse("Linear Algebra", 3, 3.8);
        
        // Professor operations
        System.out.println("\n--- Professor Activities ---\n");
        prof1.assignCourse("CS101: Intro to Programming");
        prof1.assignCourse("CS201: Data Structures");
        prof1.assignCourse("CS301: Algorithms");
        prof1.teach();
        prof1.conductResearch("Artificial Intelligence");
        
        prof2.assignCourse("MATH101: Calculus I");
        prof2.assignCourse("MATH201: Linear Algebra");
        prof2.teach();
        prof2.conductResearch("Number Theory");
        
        // Update operations
        System.out.println("\n--- Updates ---\n");
        student1.updateEmail("alice.johnson@university.edu");
        prof1.giveRaise(10);
        
        // Display updated information
        System.out.println("\n--- Updated Information ---");
        student1.displayInfo();
        prof1.displayInfo();
        
        // Summary
        System.out.println("\n--- University Summary ---");
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║          UNIVERSITY STATISTICS                ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        System.out.println("Total Students: 2");
        System.out.println("Total Professors: 2");
        System.out.println("Departments: Computer Science, Mathematics");
        System.out.println("════════════════════════════════════════════════");
        
        System.out.println("\n💡 Inheritance Concepts Applied:");
        System.out.println("   ✅ Base class (Person) with common properties");
        System.out.println("   ✅ Derived classes (Student, Professor) with specific features");
        System.out.println("   ✅ Method overriding (displayInfo)");
        System.out.println("   ✅ super keyword for parent access");
        System.out.println("   ✅ protected fields for subclass access");
        System.out.println("   ✅ Code reuse through inheritance");
        
        System.out.println("\n========================================");
    }
}
```

**Expected Output:**
```
===== UNIVERSITY MANAGEMENT SYSTEM =====

--- Enrolling Students ---

✅ Person registered: Alice Johnson
   Role: Student
   Student ID: 1001
   Major: Computer Science
✅ Person registered: Bob Smith
   Role: Student
   Student ID: 1002
   Major: Mathematics

--- Hiring Professors ---

✅ Person registered: Dr. Emily Brown
   Role: Professor
   Employee ID: 2001
   Department: Computer Science
✅ Person registered: Dr. Michael Davis
   Role: Professor
   Employee ID: 2002
   Department: Mathematics

[... displays all information ...]

--- Student Activities ---

Alice Johnson is studying Computer Science
✅ Course completed: Intro to Programming
   Credits: 3, Grade: 3.7
   New GPA: 3.70
✅ Course completed: Data Structures
   Credits: 4, Grade: 3.9
   New GPA: 3.81
✅ Course completed: Algorithms
   Credits: 4, Grade: 3.8
   New GPA: 3.81

[... continues with all activities ...]

💡 Inheritance Concepts Applied:
   ✅ Base class (Person) with common properties
   ✅ Derived classes (Student, Professor) with specific features
   ✅ Method overriding (displayInfo)
   ✅ super keyword for parent access
   ✅ protected fields for subclass access
   ✅ Code reuse through inheritance

========================================
```

**💡 Key Concepts:**

| Concept | Application |
|---------|-------------|
| **Base Class** | Person with common properties |
| **Inheritance** | Student and Professor extend Person |
| **Method Overriding** | Each class has custom displayInfo |
| **Code Reuse** | Common functionality in Person |
| **Specialization** | Each subclass adds specific features |

**✅ Success Criteria:**
- [ ] Understand complete inheritance system
- [ ] Can design inheritance hierarchies
- [ ] See real-world benefits
- [ ] Can combine all inheritance concepts
- [ ] Ready to build similar systems

**🎯 Challenge:**
1. Add a `TeachingAssistant` class (Student who also teaches)
2. Add course enrollment system
3. Implement grade management
4. Create department management
5. Add scholarship system for students

---

### 🎓 Day 14 Summary: Inheritance

**What You Learned:**
1. ✅ Inheritance basics with `extends`
2. ✅ The `super` keyword
3. ✅ Method overriding
4. ✅ Inheritance hierarchies
5. ✅ Protected access modifier
6. ✅ Real-world inheritance systems

**Key Takeaways:**
- Inheritance enables code reuse
- Child classes inherit parent properties/methods
- Use `super` to access parent members
- Override methods for child-specific behavior
- Protected allows subclass access
- Design hierarchies from general to specific

**Inheritance Checklist:**
```
✅ Identify common properties/methods
✅ Create base class with common features
✅ Use extends for child classes
✅ Call super() in child constructors
✅ Override methods as needed
✅ Use protected for subclass access
✅ Test inheritance relationships
```

**Next Steps:**
- Day 15: Polymorphism (runtime polymorphism, upcasting, downcasting)
- Day 16: Abstract Classes and Interfaces
- Day 17: Advanced OOP Concepts

---

## Day 15: Polymorphism (2 hours)

**Learning Objectives:**
- Understand polymorphism concept
- Learn runtime polymorphism
- Master upcasting and downcasting
- Use instanceof operator
- Understand dynamic method dispatch
- Build polymorphic systems

---

#### Exercise 1: Introduction to Polymorphism (20 minutes)

**What you'll learn:** Understanding polymorphism and its basic usage

**Create classes: `Animal`, `Dog`, `Cat`**

**Concept:** **Polymorphism** = "Many forms". One reference type can refer to objects of different types. The actual method called is determined at runtime.

```java
class Animal {
    String name;
    
    Animal(String name) {
        this.name = name;
    }
    
    void makeSound() {
        System.out.println(this.name + " makes a sound");
    }
    
    void eat() {
        System.out.println(this.name + " is eating");
    }
    
    void sleep() {
        System.out.println(this.name + " is sleeping");
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(this.name + " says: Woof! Woof! 🐕");
    }
    
    void fetch() {
        System.out.println(this.name + " is fetching the ball!");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(this.name + " says: Meow! Meow! 🐱");
    }
    
    void scratch() {
        System.out.println(this.name + " is scratching the furniture!");
    }
}

class Bird extends Animal {
    Bird(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(this.name + " says: Tweet! Tweet! 🐦");
    }
    
    void fly() {
        System.out.println(this.name + " is flying!");
    }
}

public class PolymorphismIntro {
    public static void main(String[] args) {
        System.out.println("===== POLYMORPHISM BASICS =====\n");
        
        // Normal way - each variable has its own type
        System.out.println("--- Without Polymorphism ---");
        Dog dog = new Dog("Buddy");
        Cat cat = new Cat("Whiskers");
        Bird bird = new Bird("Tweety");
        
        dog.makeSound();
        cat.makeSound();
        bird.makeSound();
        
        // POLYMORPHISM - Animal reference can hold any Animal subclass
        System.out.println("\n--- With Polymorphism ---");
        Animal animal1 = new Dog("Max");      // Animal reference, Dog object
        Animal animal2 = new Cat("Fluffy");   // Animal reference, Cat object
        Animal animal3 = new Bird("Chirpy");  // Animal reference, Bird object
        
        System.out.println("All stored as Animal references:");
        animal1.makeSound();  // Calls Dog's makeSound()
        animal2.makeSound();  // Calls Cat's makeSound()
        animal3.makeSound();  // Calls Bird's makeSound()
        
        // Array of Animals (polymorphism in action)
        System.out.println("\n--- Array of Animals ---");
        Animal[] animals = {
            new Dog("Rocky"),
            new Cat("Shadow"),
            new Bird("Polly"),
            new Dog("Duke"),
            new Cat("Mittens")
        };
        
        System.out.println("Making all animals speak:");
        for (Animal animal : animals) {
            animal.makeSound();  // Each calls its own version!
        }
        
        System.out.println("\n--- All Animals Eating ---");
        for (Animal animal : animals) {
            animal.eat();  // Inherited method
        }
        
        System.out.println("\n💡 Key Points:");
        System.out.println("   ✅ Animal reference can hold Dog, Cat, or Bird objects");
        System.out.println("   ✅ Correct method is called based on actual object type");
        System.out.println("   ✅ Decided at runtime (Runtime Polymorphism)");
        System.out.println("   ✅ Enables treating different objects uniformly");
        
        System.out.println("\n💡 Benefits:");
        System.out.println("   ✅ Write code that works with parent type");
        System.out.println("   ✅ Code works with all child types automatically");
        System.out.println("   ✅ Easy to add new animal types");
        System.out.println("   ✅ Flexible and extensible code");
        
        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== POLYMORPHISM BASICS =====

--- Without Polymorphism ---
Buddy says: Woof! Woof! 🐕
Whiskers says: Meow! Meow! 🐱
Tweety says: Tweet! Tweet! 🐦

--- With Polymorphism ---
All stored as Animal references:
Max says: Woof! Woof! 🐕
Fluffy says: Meow! Meow! 🐱
Chirpy says: Tweet! Tweet! 🐦

--- Array of Animals ---
Making all animals speak:
Rocky says: Woof! Woof! 🐕
Shadow says: Meow! Meow! 🐱
Polly says: Tweet! Tweet! 🐦
Duke says: Woof! Woof! 🐕
Mittens says: Meow! Meow! 🐱

--- All Animals Eating ---
Rocky is eating
Shadow is eating
Polly is eating
Duke is eating
Mittens is eating

💡 Key Points:
   ✅ Animal reference can hold Dog, Cat, or Bird objects
   ✅ Correct method is called based on actual object type
   ✅ Decided at runtime (Runtime Polymorphism)
   ✅ Enables treating different objects uniformly

💡 Benefits:
   ✅ Write code that works with parent type
   ✅ Code works with all child types automatically
   ✅ Easy to add new animal types
   ✅ Flexible and extensible code

===============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Polymorphism** | One interface, many implementations |
| **Runtime Polymorphism** | Method called determined at runtime |
| **Parent Reference** | Can hold child objects |
| **Dynamic Dispatch** | Correct method chosen automatically |

**Polymorphism Formula:**
```java
// Parent reference = Child object
ParentClass reference = new ChildClass();

// When you call a method:
reference.method();  // Calls ChildClass version!

// This is decided at RUNTIME, not compile time
```

**✅ Success Criteria:**
- [ ] Understand polymorphism concept
- [ ] Can use parent reference for child objects
- [ ] See runtime method selection
- [ ] Understand benefits of polymorphism
- [ ] Can work with arrays of parent type

**🎯 Challenge:**
1. Add more animal types (Fish, Rabbit)
2. Create a method that accepts Animal parameter
3. Test with different animal types
4. Create a zoo management system using polymorphism

---

#### Exercise 2: Upcasting and Downcasting (25 minutes)

**What you'll learn:** Converting between parent and child references

**Create classes: `Shape`, `Circle`, `Rectangle`**

**Concept:** 
- **Upcasting** = Child → Parent (automatic, safe)
- **Downcasting** = Parent → Child (manual, needs checking)

```java
class Shape {
    String color;
    
    Shape(String color) {
        this.color = color;
    }
    
    double calculateArea() {
        return 0.0;
    }
    
    void display() {
        System.out.println("Shape with color: " + this.color);
    }
}

class Circle extends Shape {
    double radius;
    
    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    void display() {
        System.out.println("Circle - Color: " + this.color + ", Radius: " + this.radius);
    }
    
    void roll() {
        System.out.println("Circle is rolling! 🔵");
    }
}

class Rectangle extends Shape {
    double length;
    double width;
    
    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }
    
    @Override
    double calculateArea() {
        return length * width;
    }
    
    @Override
    void display() {
        System.out.println("Rectangle - Color: " + this.color + 
                         ", Length: " + this.length + ", Width: " + this.width);
    }
    
    void stack() {
        System.out.println("Rectangle is stacking! 🟦");
    }
}

public class CastingDemo {
    // Method that accepts Shape (works with any shape)
    static void printShapeInfo(Shape shape) {
        System.out.println("\n--- Shape Information ---");
        shape.display();
        System.out.println("Area: " + String.format("%.2f", shape.calculateArea()));
    }
    
    // Method demonstrating downcasting
    static void performSpecialAction(Shape shape) {
        System.out.println("\n--- Special Action ---");
        
        // Check actual type before downcasting
        if (shape instanceof Circle) {
            System.out.println("This is a Circle!");
            Circle circle = (Circle) shape;  // DOWNCAST
            circle.roll();
        } else if (shape instanceof Rectangle) {
            System.out.println("This is a Rectangle!");
            Rectangle rectangle = (Rectangle) shape;  // DOWNCAST
            rectangle.stack();
        } else {
            System.out.println("Generic shape - no special action");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== UPCASTING AND DOWNCASTING =====\n");
        
        // Create objects
        Circle circle = new Circle("Red", 5.0);
        Rectangle rectangle = new Rectangle("Blue", 10.0, 5.0);
        
        // UPCASTING (automatic, implicit)
        System.out.println("--- Upcasting (Child → Parent) ---");
        Shape shape1 = circle;      // Automatic upcasting
        Shape shape2 = rectangle;   // Automatic upcasting
        
        System.out.println("✅ Upcasting successful!");
        System.out.println("Circle stored as Shape");
        System.out.println("Rectangle stored as Shape");
        
        // Use polymorphism
        System.out.println("\n--- Using Polymorphism ---");
        shape1.display();  // Calls Circle's display()
        shape2.display();  // Calls Rectangle's display()
        
        // Can call parent methods
        System.out.println("\nAreas:");
        System.out.println("Shape1 area: " + String.format("%.2f", shape1.calculateArea()));
        System.out.println("Shape2 area: " + String.format("%.2f", shape2.calculateArea()));
        
        // Cannot call child-specific methods without downcasting
        // shape1.roll();  // ❌ ERROR! Shape doesn't have roll()
        
        // DOWNCASTING (manual, explicit)
        System.out.println("\n--- Downcasting (Parent → Child) ---");
        
        // Safe downcasting with instanceof check
        if (shape1 instanceof Circle) {
            System.out.println("✅ shape1 is a Circle, safe to downcast");
            Circle c = (Circle) shape1;  // DOWNCAST
            c.roll();  // Now we can call Circle-specific method
            System.out.println("Radius: " + c.radius);
        }
        
        if (shape2 instanceof Rectangle) {
            System.out.println("✅ shape2 is a Rectangle, safe to downcast");
            Rectangle r = (Rectangle) shape2;  // DOWNCAST
            r.stack();  // Now we can call Rectangle-specific method
            System.out.println("Dimensions: " + r.length + " × " + r.width);
        }
        
        // Demonstrate unsafe downcasting
        System.out.println("\n--- Unsafe Downcasting (DON'T DO THIS!) ---");
        try {
            // shape1 is actually a Circle, trying to cast to Rectangle
            Rectangle wrongCast = (Rectangle) shape1;  // ❌ ClassCastException!
            wrongCast.stack();
        } catch (ClassCastException e) {
            System.out.println("❌ ClassCastException: Cannot cast Circle to Rectangle!");
            System.out.println("   Always use instanceof before downcasting!");
        }
        
        // Using helper methods
        System.out.println("\n--- Using Helper Methods ---");
        printShapeInfo(circle);
        printShapeInfo(rectangle);
        
        performSpecialAction(shape1);
        performSpecialAction(shape2);
        
        // Array of shapes (polymorphism)
        System.out.println("\n--- Array of Shapes ---");
        Shape[] shapes = {
            new Circle("Green", 3.0),
            new Rectangle("Yellow", 8.0, 4.0),
            new Circle("Purple", 6.0),
            new Rectangle("Orange", 5.0, 5.0)
        };
        
        System.out.println("Processing all shapes:");
        for (Shape shape : shapes) {
            printShapeInfo(shape);
            performSpecialAction(shape);
        }
        
        System.out.println("\n💡 Upcasting:");
        System.out.println("   ✅ Automatic (implicit)");
        System.out.println("   ✅ Always safe");
        System.out.println("   ✅ Child → Parent");
        System.out.println("   ✅ Syntax: Shape s = new Circle();");
        
        System.out.println("\n💡 Downcasting:");
        System.out.println("   ⚠️  Manual (explicit)");
        System.out.println("   ⚠️  Can fail at runtime");
        System.out.println("   ⚠️  Parent → Child");
        System.out.println("   ⚠️  Syntax: Circle c = (Circle) shape;");
        System.out.println("   ✅ Always check with instanceof first!");
        
        System.out.println("\n=====================================");
    }
}
```

**Expected Output:**
```
===== UPCASTING AND DOWNCASTING =====

--- Upcasting (Child → Parent) ---
✅ Upcasting successful!
Circle stored as Shape
Rectangle stored as Shape

--- Using Polymorphism ---
Circle - Color: Red, Radius: 5.0
Rectangle - Color: Blue, Length: 10.0, Width: 5.0

Areas:
Shape1 area: 78.54
Shape2 area: 50.00

--- Downcasting (Parent → Child) ---
✅ shape1 is a Circle, safe to downcast
Circle is rolling! 🔵
Radius: 5.0
✅ shape2 is a Rectangle, safe to downcast
Rectangle is stacking! 🟦
Dimensions: 10.0 × 5.0

--- Unsafe Downcasting (DON'T DO THIS!) ---
❌ ClassCastException: Cannot cast Circle to Rectangle!
   Always use instanceof before downcasting!

--- Using Helper Methods ---

--- Shape Information ---
Circle - Color: Red, Radius: 5.0
Area: 78.54

--- Shape Information ---
Rectangle - Color: Blue, Length: 10.0, Width: 5.0
Area: 50.00

--- Special Action ---
This is a Circle!
Circle is rolling! 🔵

--- Special Action ---
This is a Rectangle!
Rectangle is stacking! 🟦

[... continues with array processing ...]

💡 Upcasting:
   ✅ Automatic (implicit)
   ✅ Always safe
   ✅ Child → Parent
   ✅ Syntax: Shape s = new Circle();

💡 Downcasting:
   ⚠️  Manual (explicit)
   ⚠️  Can fail at runtime
   ⚠️  Parent → Child
   ⚠️  Syntax: Circle c = (Circle) shape;
   ✅ Always check with instanceof first!

=====================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Upcasting** | Child to parent (automatic) |
| **Downcasting** | Parent to child (manual) |
| **instanceof** | Check object type before casting |
| **ClassCastException** | Error from invalid downcast |

**Casting Patterns:**
```java
// UPCASTING (automatic)
Circle circle = new Circle("Red", 5.0);
Shape shape = circle;  // ✅ Automatic, always safe

// DOWNCASTING (manual, check first!)
Shape shape = new Circle("Red", 5.0);

// ✅ CORRECT: Check before casting
if (shape instanceof Circle) {
    Circle c = (Circle) shape;
    c.roll();
}

// ❌ WRONG: Cast without checking
Circle c = (Circle) shape;  // Might throw ClassCastException!
```

**✅ Success Criteria:**
- [ ] Understand upcasting vs downcasting
- [ ] Can use instanceof operator
- [ ] Know when casting is needed
- [ ] Understand ClassCastException
- [ ] Can safely downcast

**🎯 Challenge:**
1. Create a `Triangle` class
2. Add it to the shapes array
3. Implement safe downcasting for all shapes
4. Create a method that counts each shape type

---

#### Exercise 3: The instanceof Operator (20 minutes)

**What you'll learn:** Using instanceof to check object types safely

**Create classes: `Employee`, `Manager`, `Developer`, `Designer`**

**Concept:** **instanceof** operator checks if an object is an instance of a specific class or its subclasses. Returns true or false.

```java
class Employee {
    String name;
    int id;
    double salary;
    
    Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    
    void work() {
        System.out.println(this.name + " is working");
    }
    
    void displayInfo() {
        System.out.println("Employee: " + this.name + " (ID: " + this.id + ")");
    }
}

class Manager extends Employee {
    int teamSize;
    
    Manager(String name, int id, double salary, int teamSize) {
        super(name, id, salary);
        this.teamSize = teamSize;
    }
    
    @Override
    void work() {
        System.out.println(this.name + " is managing a team of " + this.teamSize);
    }
    
    void conductMeeting() {
        System.out.println(this.name + " is conducting a meeting");
    }
}

class Developer extends Employee {
    String programmingLanguage;
    
    Developer(String name, int id, double salary, String language) {
        super(name, id, salary);
        this.programmingLanguage = language;
    }
    
    @Override
    void work() {
        System.out.println(this.name + " is coding in " + this.programmingLanguage);
    }
    
    void writeCode() {
        System.out.println(this.name + " is writing " + this.programmingLanguage + " code");
    }
    
    void debugCode() {
        System.out.println(this.name + " is debugging code");
    }
}

class Designer extends Employee {
    String designTool;
    
    Designer(String name, int id, double salary, String tool) {
        super(name, id, salary);
        this.designTool = tool;
    }
    
    @Override
    void work() {
        System.out.println(this.name + " is designing using " + this.designTool);
    }
    
    void createDesign() {
        System.out.println(this.name + " is creating a design in " + this.designTool);
    }
}

public class InstanceofDemo {
    // Method that handles different employee types
    static void processEmployee(Employee emp) {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      PROCESSING EMPLOYEE              ║");
        System.out.println("╚════════════════════════════════════════╝");
        
        // Basic info (works for all employees)
        emp.displayInfo();
        emp.work();
        
        // Check specific type and perform type-specific actions
        System.out.println("\n--- Type-Specific Actions ---");
        
        // Check if Manager
        if (emp instanceof Manager) {
            System.out.println("✅ This is a Manager");
            Manager manager = (Manager) emp;
            System.out.println("   Team size: " + manager.teamSize);
            manager.conductMeeting();
        }
        // Check if Developer
        else if (emp instanceof Developer) {
            System.out.println("✅ This is a Developer");
            Developer dev = (Developer) emp;
            System.out.println("   Language: " + dev.programmingLanguage);
            dev.writeCode();
            dev.debugCode();
        }
        // Check if Designer
        else if (emp instanceof Designer) {
            System.out.println("✅ This is a Designer");
            Designer designer = (Designer) emp;
            System.out.println("   Tool: " + designer.designTool);
            designer.createDesign();
        }
        // Generic Employee
        else {
            System.out.println("✅ This is a generic Employee");
        }
        
        System.out.println("════════════════════════════════════════");
    }
    
    // Method to count employees by type
    static void analyzeEmployees(Employee[] employees) {
        int managerCount = 0;
        int developerCount = 0;
        int designerCount = 0;
        int genericCount = 0;
        
        System.out.println("\n--- Analyzing Employee Types ---");
        
        for (Employee emp : employees) {
            // Count by type using instanceof
            if (emp instanceof Manager) {
                managerCount++;
            } else if (emp instanceof Developer) {
                developerCount++;
            } else if (emp instanceof Designer) {
                designerCount++;
            } else {
                genericCount++;
            }
        }
        
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║      EMPLOYEE TYPE ANALYSIS           ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Total Employees: " + employees.length);
        System.out.println("Managers: " + managerCount);
        System.out.println("Developers: " + developerCount);
        System.out.println("Designers: " + designerCount);
        System.out.println("Generic: " + genericCount);
        System.out.println("════════════════════════════════════════");
    }
    
    // Method to give bonuses based on type
    static void giveBonuses(Employee[] employees) {
        System.out.println("\n--- Giving Bonuses ---");
        
        for (Employee emp : employees) {
            double bonus = 0;
            
            if (emp instanceof Manager) {
                bonus = emp.salary * 0.20;  // 20% for managers
                System.out.println("💰 Manager " + emp.name + ": $" + bonus + " (20%)");
            } else if (emp instanceof Developer) {
                bonus = emp.salary * 0.15;  // 15% for developers
                System.out.println("💰 Developer " + emp.name + ": $" + bonus + " (15%)");
            } else if (emp instanceof Designer) {
                bonus = emp.salary * 0.12;  // 12% for designers
                System.out.println("💰 Designer " + emp.name + ": $" + bonus + " (12%)");
            } else {
                bonus = emp.salary * 0.10;  // 10% for others
                System.out.println("💰 Employee " + emp.name + ": $" + bonus + " (10%)");
            }
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== INSTANCEOF OPERATOR =====\n");
        
        // Create different types of employees
        Employee emp1 = new Manager("Alice", 101, 90000, 10);
        Employee emp2 = new Developer("Bob", 102, 75000, "Java");
        Employee emp3 = new Designer("Charlie", 103, 70000, "Figma");
        Employee emp4 = new Developer("Diana", 104, 80000, "Python");
        Employee emp5 = new Manager("Eve", 105, 95000, 15);
        
        // Process each employee
        System.out.println("--- Processing Individual Employees ---");
        processEmployee(emp1);
        processEmployee(emp2);
        processEmployee(emp3);
        
        // Create array of employees
        Employee[] employees = {emp1, emp2, emp3, emp4, emp5};
        
        // Analyze employee types
        analyzeEmployees(employees);
        
        // Give bonuses
        giveBonuses(employees);
        
        // Demonstrate instanceof checks
        System.out.println("\n--- instanceof Check Results ---");
        Employee testEmp = new Developer("Test Dev", 999, 70000, "JavaScript");
        
        System.out.println("testEmp instanceof Employee: " + (testEmp instanceof Employee));
        System.out.println("testEmp instanceof Developer: " + (testEmp instanceof Developer));
        System.out.println("testEmp instanceof Manager: " + (testEmp instanceof Manager));
        System.out.println("testEmp instanceof Designer: " + (testEmp instanceof Designer));
        
        // Inheritance chain check
        System.out.println("\n--- Inheritance Chain ---");
        Manager manager = new Manager("Frank", 106, 100000, 20);
        System.out.println("manager instanceof Manager: " + (manager instanceof Manager));
        System.out.println("manager instanceof Employee: " + (manager instanceof Employee));
        System.out.println("manager instanceof Object: " + (manager instanceof Object));
        
        System.out.println("\n💡 instanceof Rules:");
        System.out.println("   ✅ Returns true if object is instance of class");
        System.out.println("   ✅ Returns true for parent classes too");
        System.out.println("   ✅ Returns false for unrelated classes");
        System.out.println("   ✅ Returns false if object is null");
        System.out.println("   ✅ Use before downcasting to avoid exceptions");
        
        System.out.println("\n💡 Common Patterns:");
        System.out.println("   if (obj instanceof SpecificClass) {");
        System.out.println("       SpecificClass specific = (SpecificClass) obj;");
        System.out.println("       // Use specific methods");
        System.out.println("   }");
        
        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== INSTANCEOF OPERATOR =====

--- Processing Individual Employees ---

╔════════════════════════════════════════╗
║      PROCESSING EMPLOYEE              ║
╚════════════════════════════════════════╝
Employee: Alice (ID: 101)
Alice is managing a team of 10

--- Type-Specific Actions ---
✅ This is a Manager
   Team size: 10
Alice is conducting a meeting
════════════════════════════════════════

╔════════════════════════════════════════╗
║      PROCESSING EMPLOYEE              ║
╚════════════════════════════════════════╝
Employee: Bob (ID: 102)
Bob is coding in Java

--- Type-Specific Actions ---
✅ This is a Developer
   Language: Java
Bob is writing Java code
Bob is debugging code
════════════════════════════════════════

[... continues for all employees ...]

--- Analyzing Employee Types ---
╔════════════════════════════════════════╗
║      EMPLOYEE TYPE ANALYSIS           ║
╚════════════════════════════════════════╝
Total Employees: 5
Managers: 2
Developers: 2
Designers: 1
Generic: 0
════════════════════════════════════════

--- Giving Bonuses ---
💰 Manager Alice: $18000.0 (20%)
💰 Developer Bob: $11250.0 (15%)
💰 Designer Charlie: $8400.0 (12%)
💰 Developer Diana: $12000.0 (15%)
💰 Manager Eve: $19000.0 (20%)

--- instanceof Check Results ---
testEmp instanceof Employee: true
testEmp instanceof Developer: true
testEmp instanceof Manager: false
testEmp instanceof Designer: false

--- Inheritance Chain ---
manager instanceof Manager: true
manager instanceof Employee: true
manager instanceof Object: true

💡 instanceof Rules:
   ✅ Returns true if object is instance of class
   ✅ Returns true for parent classes too
   ✅ Returns false for unrelated classes
   ✅ Returns false if object is null
   ✅ Use before downcasting to avoid exceptions

💡 Common Patterns:
   if (obj instanceof SpecificClass) {
       SpecificClass specific = (SpecificClass) obj;
       // Use specific methods
   }

===============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **instanceof** | Checks if object is instance of class |
| **Type checking** | Verify type before downcasting |
| **Inheritance aware** | Returns true for parent classes |
| **Null safe** | Returns false for null |

**instanceof Patterns:**
```java
// Pattern 1: Check before cast
if (obj instanceof SpecificClass) {
    SpecificClass specific = (SpecificClass) obj;
    specific.specificMethod();
}

// Pattern 2: Multiple checks
if (obj instanceof Manager) {
    // Handle Manager
} else if (obj instanceof Developer) {
    // Handle Developer
} else if (obj instanceof Employee) {
    // Handle generic Employee
}

// Pattern 3: Null check (automatic)
Employee emp = null;
if (emp instanceof Manager) {  // false, no NullPointerException
    // Won't execute
}
```

**✅ Success Criteria:**
- [ ] Understand instanceof operator
- [ ] Can check types before casting
- [ ] Know inheritance chain checking
- [ ] See practical use cases
- [ ] Can handle multiple types safely

**🎯 Challenge:**
1. Add an `Intern` class that extends `Employee`
2. Create a method to promote employees
3. Use instanceof to determine promotion eligibility
4. Calculate department-wise statistics

---

#### Exercise 4: Dynamic Method Dispatch (25 minutes)

**What you'll learn:** Understanding how Java decides which method to call at runtime

**Create classes: `Payment`, `CreditCard`, `DebitCard`, `PayPal`**

**Concept:** **Dynamic Method Dispatch** = Java determines which overridden method to call at runtime based on the actual object type, not the reference type.

```java
class Payment {
    String paymentId;
    double amount;
    
    Payment(String paymentId, double amount) {
        this.paymentId = paymentId;
        this.amount = amount;
    }
    
    // Method to be overridden
    void processPayment() {
        System.out.println("Processing generic payment of $" + this.amount);
    }
    
    // Method to be overridden
    String getPaymentMethod() {
        return "Generic Payment";
    }
    
    // Method to be overridden
    double calculateFee() {
        return this.amount * 0.02;  // 2% default fee
    }
    
    void displayReceipt() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║         PAYMENT RECEIPT               ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Payment ID: " + this.paymentId);
        System.out.println("Method: " + this.getPaymentMethod());  // Dynamic dispatch!
        System.out.println("Amount: $" + this.amount);
        System.out.println("Fee: $" + String.format("%.2f", this.calculateFee()));  // Dynamic dispatch!
        System.out.println("Total: $" + String.format("%.2f", this.amount + this.calculateFee()));
        System.out.println("════════════════════════════════════════");
    }
}

class CreditCardPayment extends Payment {
    String cardNumber;
    String cardType;
    
    CreditCardPayment(String paymentId, double amount, String cardNumber, String cardType) {
        super(paymentId, amount);
        this.cardNumber = cardNumber;
        this.cardType = cardType;
    }
    
    @Override
    void processPayment() {
        System.out.println("💳 Processing Credit Card payment");
        System.out.println("   Card: " + this.cardType + " ending in " + 
                         this.cardNumber.substring(this.cardNumber.length() - 4));
        System.out.println("   Amount: $" + this.amount);
        System.out.println("   ✅ Payment authorized!");
    }
    
    @Override
    String getPaymentMethod() {
        return "Credit Card (" + this.cardType + ")";
    }
    
    @Override
    double calculateFee() {
        return this.amount * 0.025;  // 2.5% for credit cards
    }
}

class DebitCardPayment extends Payment {
    String cardNumber;
    String bankName;
    
    DebitCardPayment(String paymentId, double amount, String cardNumber, String bankName) {
        super(paymentId, amount);
        this.cardNumber = cardNumber;
        this.bankName = bankName;
    }
    
    @Override
    void processPayment() {
        System.out.println("💳 Processing Debit Card payment");
        System.out.println("   Bank: " + this.bankName);
        System.out.println("   Card ending in " + 
                         this.cardNumber.substring(this.cardNumber.length() - 4));
        System.out.println("   Amount: $" + this.amount);
        System.out.println("   ✅ Payment processed!");
    }
    
    @Override
    String getPaymentMethod() {
        return "Debit Card (" + this.bankName + ")";
    }
    
    @Override
    double calculateFee() {
        return this.amount * 0.01;  // 1% for debit cards
    }
}

class PayPalPayment extends Payment {
    String email;
    
    PayPalPayment(String paymentId, double amount, String email) {
        super(paymentId, amount);
        this.email = email;
    }
    
    @Override
    void processPayment() {
        System.out.println("💰 Processing PayPal payment");
        System.out.println("   Account: " + this.email);
        System.out.println("   Amount: $" + this.amount);
        System.out.println("   ✅ Payment sent!");
    }
    
    @Override
    String getPaymentMethod() {
        return "PayPal";
    }
    
    @Override
    double calculateFee() {
        return this.amount * 0.029 + 0.30;  // 2.9% + $0.30 for PayPal
    }
}

class CryptocurrencyPayment extends Payment {
    String walletAddress;
    String cryptoType;
    
    CryptocurrencyPayment(String paymentId, double amount, String walletAddress, String cryptoType) {
        super(paymentId, amount);
        this.walletAddress = walletAddress;
        this.cryptoType = cryptoType;
    }
    
    @Override
    void processPayment() {
        System.out.println("₿ Processing Cryptocurrency payment");
        System.out.println("   Type: " + this.cryptoType);
        System.out.println("   Wallet: " + this.walletAddress.substring(0, 10) + "...");
        System.out.println("   Amount: $" + this.amount);
        System.out.println("   ✅ Transaction confirmed!");
    }
    
    @Override
    String getPaymentMethod() {
        return "Cryptocurrency (" + this.cryptoType + ")";
    }
    
    @Override
    double calculateFee() {
        return this.amount * 0.005;  // 0.5% for crypto
    }
}

public class DynamicDispatchDemo {
    // Method that accepts any Payment type
    static void processTransaction(Payment payment) {
        System.out.println("\n═══════════════════════════════════════");
        System.out.println("PROCESSING TRANSACTION");
        System.out.println("═══════════════════════════════════════");
        
        // These method calls use DYNAMIC DISPATCH
        // The actual method called depends on the object type at RUNTIME
        payment.processPayment();      // Calls appropriate version
        payment.displayReceipt();      // Calls parent, but uses dynamic dispatch inside
    }
    
    // Calculate total fees
    static void calculateTotalFees(Payment[] payments) {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║         FEE CALCULATION               ║");
        System.out.println("╚════════════════════════════════════════╝");
        
        double totalAmount = 0;
        double totalFees = 0;
        
        for (Payment payment : payments) {
            double fee = payment.calculateFee();  // Dynamic dispatch!
            totalAmount += payment.amount;
            totalFees += fee;
            
            System.out.println(payment.getPaymentMethod() + ": $" + 
                             String.format("%.2f", payment.amount) + 
                             " (Fee: $" + String.format("%.2f", fee) + ")");
        }
        
        System.out.println("────────────────────────────────────────");
        System.out.println("Total Amount: $" + String.format("%.2f", totalAmount));
        System.out.println("Total Fees: $" + String.format("%.2f", totalFees));
        System.out.println("════════════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== DYNAMIC METHOD DISPATCH =====\n");
        
        // Create different payment types, all stored as Payment references
        System.out.println("--- Creating Payments ---");
        Payment payment1 = new CreditCardPayment("PAY001", 100.00, "1234567890123456", "Visa");
        Payment payment2 = new DebitCardPayment("PAY002", 75.00, "9876543210987654", "Chase");
        Payment payment3 = new PayPalPayment("PAY003", 50.00, "user@email.com");
        Payment payment4 = new CryptocurrencyPayment("PAY004", 200.00, "1A2B3C4D5E6F7G8H9I0J", "Bitcoin");
        
        System.out.println("✅ All payments created and stored as Payment references");
        
        // Process each payment - dynamic dispatch in action!
        System.out.println("\n--- Processing Payments (Dynamic Dispatch) ---");
        processTransaction(payment1);  // Calls CreditCardPayment methods
        processTransaction(payment2);  // Calls DebitCardPayment methods
        processTransaction(payment3);  // Calls PayPalPayment methods
        processTransaction(payment4);  // Calls CryptocurrencyPayment methods
        
        // Array of payments
        Payment[] payments = {payment1, payment2, payment3, payment4};
        
        // Calculate fees - dynamic dispatch for each payment type
        calculateTotalFees(payments);
        
        // Demonstrate dynamic dispatch explicitly
        System.out.println("\n--- Explicit Dynamic Dispatch Demo ---");
        Payment[] mixedPayments = {
            new CreditCardPayment("PAY005", 150.00, "1111222233334444", "Mastercard"),
            new DebitCardPayment("PAY006", 80.00, "5555666677778888", "Bank of America"),
            new PayPalPayment("PAY007", 120.00, "buyer@email.com"),
            new CryptocurrencyPayment("PAY008", 300.00, "9Z8Y7X6W5V4U3T2S1R0Q", "Ethereum")
        };
        
        System.out.println("Calling getPaymentMethod() on each:");
        for (Payment p : mixedPayments) {
            // Reference type: Payment
            // Actual object type: varies (CreditCard, Debit, PayPal, Crypto)
            // Method called: determined at RUNTIME based on actual object
            System.out.println("  → " + p.getPaymentMethod());  // Dynamic dispatch!
        }
        
        System.out.println("\n💡 Dynamic Method Dispatch:");
        System.out.println("   ✅ Method called determined at RUNTIME");
        System.out.println("   ✅ Based on actual object type, not reference type");
        System.out.println("   ✅ Enables polymorphic behavior");
        System.out.println("   ✅ Core mechanism of runtime polymorphism");
        
        System.out.println("\n💡 How It Works:");
        System.out.println("   Payment p = new CreditCardPayment(...);");
        System.out.println("   p.processPayment();  // Calls CreditCardPayment version");
        System.out.println("   ");
        System.out.println("   Reference type (Payment) doesn't matter!");
        System.out.println("   Actual object type (CreditCardPayment) determines method!");
        
        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== DYNAMIC METHOD DISPATCH =====

--- Creating Payments ---
✅ All payments created and stored as Payment references

--- Processing Payments (Dynamic Dispatch) ---

═══════════════════════════════════════
PROCESSING TRANSACTION
═══════════════════════════════════════
💳 Processing Credit Card payment
   Card: Visa ending in 3456
   Amount: $100.0
   ✅ Payment authorized!

╔════════════════════════════════════════╗
║         PAYMENT RECEIPT               ║
╚════════════════════════════════════════╝
Payment ID: PAY001
Method: Credit Card (Visa)
Amount: $100.0
Fee: $2.50
Total: $102.50
════════════════════════════════════════

[... continues for all payment types ...]

╔════════════════════════════════════════╗
║         FEE CALCULATION               ║
╚════════════════════════════════════════╝
Credit Card (Visa): $100.00 (Fee: $2.50)
Debit Card (Chase): $75.00 (Fee: $0.75)
PayPal: $50.00 (Fee: $1.75)
Cryptocurrency (Bitcoin): $200.00 (Fee: $1.00)
────────────────────────────────────────
Total Amount: $425.00
Total Fees: $6.00
════════════════════════════════════════

--- Explicit Dynamic Dispatch Demo ---
Calling getPaymentMethod() on each:
  → Credit Card (Mastercard)
  → Debit Card (Bank of America)
  → PayPal
  → Cryptocurrency (Ethereum)

💡 Dynamic Method Dispatch:
   ✅ Method called determined at RUNTIME
   ✅ Based on actual object type, not reference type
   ✅ Enables polymorphic behavior
   ✅ Core mechanism of runtime polymorphism

💡 How It Works:
   Payment p = new CreditCardPayment(...);
   p.processPayment();  // Calls CreditCardPayment version
   
   Reference type (Payment) doesn't matter!
   Actual object type (CreditCardPayment) determines method!

===================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Dynamic Dispatch** | Method selection at runtime |
| **Runtime Polymorphism** | Behavior determined by actual object |
| **Virtual Methods** | Methods that can be overridden |
| **Late Binding** | Method binding happens at runtime |

**✅ Success Criteria:**
- [ ] Understand dynamic method dispatch
- [ ] See runtime method selection
- [ ] Know difference from compile-time
- [ ] Can use polymorphism effectively
- [ ] Understand virtual method calls

**🎯 Challenge:**
1. Add a `BankTransferPayment` class
2. Implement refund functionality
3. Add payment validation
4. Create payment history tracking

---

#### Exercise 5: Polymorphism with Arrays and Collections (20 minutes)

**What you'll learn:** Using polymorphism with arrays and collections

**Create classes: `Vehicle`, `Car`, `Motorcycle`, `Truck`**

**Concept:** Polymorphism shines when working with collections of objects. You can store different types in a single array/collection using the parent type.

```java
class Vehicle {
    String brand;
    String model;
    int year;
    
    Vehicle(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    
    void start() {
        System.out.println(this.brand + " " + this.model + " is starting...");
    }
    
    void stop() {
        System.out.println(this.brand + " " + this.model + " is stopping...");
    }
    
    String getType() {
        return "Vehicle";
    }
    
    double calculateMaintenanceCost() {
        return 500.0;  // Base cost
    }
}

class Car extends Vehicle {
    int numberOfDoors;
    
    Car(String brand, String model, int year, int doors) {
        super(brand, model, year);
        this.numberOfDoors = doors;
    }
    
    @Override
    void start() {
        System.out.println("🚗 Car " + this.brand + " " + this.model + " - Engine starting...");
    }
    
    @Override
    String getType() {
        return "Car";
    }
    
    @Override
    double calculateMaintenanceCost() {
        return 800.0;
    }
}

class Motorcycle extends Vehicle {
    String bikeType;
    
    Motorcycle(String brand, String model, int year, String bikeType) {
        super(brand, model, year);
        this.bikeType = bikeType;
    }
    
    @Override
    void start() {
        System.out.println("🏍️  Motorcycle " + this.brand + " " + this.model + " - Revving engine...");
    }
    
    @Override
    String getType() {
        return "Motorcycle";
    }
    
    @Override
    double calculateMaintenanceCost() {
        return 400.0;
    }
}

class Truck extends Vehicle {
    double cargoCapacity;
    
    Truck(String brand, String model, int year, double capacity) {
        super(brand, model, year);
        this.cargoCapacity = capacity;
    }
    
    @Override
    void start() {
        System.out.println("🚚 Truck " + this.brand + " " + this.model + " - Diesel engine starting...");
    }
    
    @Override
    String getType() {
        return "Truck";
    }
    
    @Override
    double calculateMaintenanceCost() {
        return 1200.0;
    }
}

public class PolymorphicCollectionsDemo {
    // Method that works with any vehicle array
    static void startAllVehicles(Vehicle[] vehicles) {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      STARTING ALL VEHICLES            ║");
        System.out.println("╚════════════════════════════════════════╝");
        
        for (Vehicle vehicle : vehicles) {
            vehicle.start();  // Polymorphic call!
        }
    }
    
    // Method to calculate total maintenance cost
    static void calculateFleetMaintenance(Vehicle[] vehicles) {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║    FLEET MAINTENANCE ANALYSIS         ║");
        System.out.println("╚════════════════════════════════════════╝");
        
        double totalCost = 0;
        int carCount = 0, motorcycleCount = 0, truckCount = 0;
        
        for (Vehicle vehicle : vehicles) {
            double cost = vehicle.calculateMaintenanceCost();  // Polymorphic!
            totalCost += cost;
            
            System.out.println(vehicle.getType() + " - " + vehicle.brand + " " + 
                             vehicle.model + ": $" + cost);
            
            // Count by type
            if (vehicle instanceof Car) carCount++;
            else if (vehicle instanceof Motorcycle) motorcycleCount++;
            else if (vehicle instanceof Truck) truckCount++;
        }
        
        System.out.println("────────────────────────────────────────");
        System.out.println("Total Vehicles: " + vehicles.length);
        System.out.println("  Cars: " + carCount);
        System.out.println("  Motorcycles: " + motorcycleCount);
        System.out.println("  Trucks: " + truckCount);
        System.out.println("Total Maintenance Cost: $" + totalCost);
        System.out.println("Average Cost: $" + (totalCost / vehicles.length));
        System.out.println("════════════════════════════════════════");
    }
    
    // Method to filter vehicles by type
    static Vehicle[] filterByType(Vehicle[] vehicles, String type) {
        // Count matching vehicles
        int count = 0;
        for (Vehicle v : vehicles) {
            if (v.getType().equals(type)) count++;
        }
        
        // Create array of matching vehicles
        Vehicle[] filtered = new Vehicle[count];
        int index = 0;
        for (Vehicle v : vehicles) {
            if (v.getType().equals(type)) {
                filtered[index++] = v;
            }
        }
        
        return filtered;
    }
    
    // Method to find oldest vehicle
    static Vehicle findOldest(Vehicle[] vehicles) {
        if (vehicles.length == 0) return null;
        
        Vehicle oldest = vehicles[0];
        for (Vehicle v : vehicles) {
            if (v.year < oldest.year) {
                oldest = v;
            }
        }
        return oldest;
    }
    
    public static void main(String[] args) {
        System.out.println("===== POLYMORPHISM WITH COLLECTIONS =====\n");
        
        // Create array of different vehicle types
        System.out.println("--- Creating Vehicle Fleet ---");
        Vehicle[] fleet = {
            new Car("Toyota", "Camry", 2020, 4),
            new Motorcycle("Harley", "Sportster", 2019, "Cruiser"),
            new Truck("Ford", "F-150", 2021, 2000),
            new Car("Honda", "Civic", 2022, 4),
            new Motorcycle("Yamaha", "R1", 2021, "Sport"),
            new Truck("Chevy", "Silverado", 2020, 2500),
            new Car("Tesla", "Model 3", 2023, 4),
            new Motorcycle("Ducati", "Monster", 2022, "Naked")
        };
        
        System.out.println("✅ Fleet created with " + fleet.length + " vehicles");
        
        // Start all vehicles using polymorphism
        startAllVehicles(fleet);
        
        // Calculate maintenance costs
        calculateFleetMaintenance(fleet);
        
        // Filter by type
        System.out.println("\n--- Filtering Vehicles ---");
        Vehicle[] cars = filterByType(fleet, "Car");
        System.out.println("Cars in fleet: " + cars.length);
        for (Vehicle car : cars) {
            System.out.println("  - " + car.brand + " " + car.model);
        }
        
        Vehicle[] motorcycles = filterByType(fleet, "Motorcycle");
        System.out.println("\nMotorcycles in fleet: " + motorcycles.length);
        for (Vehicle bike : motorcycles) {
            System.out.println("  - " + bike.brand + " " + bike.model);
        }
        
        // Find oldest vehicle
        System.out.println("\n--- Finding Oldest Vehicle ---");
        Vehicle oldest = findOldest(fleet);
        if (oldest != null) {
            System.out.println("Oldest vehicle: " + oldest.year + " " + 
                             oldest.brand + " " + oldest.model);
        }
        
        // Demonstrate polymorphic behavior
        System.out.println("\n--- Polymorphic Behavior Demo ---");
        System.out.println("Calling getType() on each vehicle:");
        for (Vehicle v : fleet) {
            System.out.println("  " + v.brand + " " + v.model + " → " + v.getType());
        }
        
        System.out.println("\n💡 Benefits of Polymorphic Collections:");
        System.out.println("   ✅ Store different types in one array");
        System.out.println("   ✅ Process all uniformly with loops");
        System.out.println("   ✅ Add new types without changing code");
        System.out.println("   ✅ Write generic methods that work with all types");
        System.out.println("   ✅ Flexible and maintainable code");
        
        System.out.println("\n=========================================");
    }
}
```

**Expected Output:**
```
===== POLYMORPHISM WITH COLLECTIONS =====

--- Creating Vehicle Fleet ---
✅ Fleet created with 8 vehicles

╔════════════════════════════════════════╗
║      STARTING ALL VEHICLES            ║
╚════════════════════════════════════════╝
🚗 Car Toyota Camry - Engine starting...
🏍️  Motorcycle Harley Sportster - Revving engine...
🚚 Truck Ford F-150 - Diesel engine starting...
🚗 Car Honda Civic - Engine starting...
🏍️  Motorcycle Yamaha R1 - Revving engine...
🚚 Truck Chevy Silverado - Diesel engine starting...
🚗 Car Tesla Model 3 - Engine starting...
🏍️  Motorcycle Ducati Monster - Revving engine...

╔════════════════════════════════════════╗
║    FLEET MAINTENANCE ANALYSIS         ║
╚════════════════════════════════════════╝
Car - Toyota Camry: $800.0
Motorcycle - Harley Sportster: $400.0
Truck - Ford F-150: $1200.0
Car - Honda Civic: $800.0
Motorcycle - Yamaha R1: $400.0
Truck - Chevy Silverado: $1200.0
Car - Tesla Model 3: $800.0
Motorcycle - Ducati Monster: $400.0
────────────────────────────────────────
Total Vehicles: 8
  Cars: 3
  Motorcycles: 3
  Trucks: 2
Total Maintenance Cost: $6000.0
Average Cost: $750.0
════════════════════════════════════════

--- Filtering Vehicles ---
Cars in fleet: 3
  - Toyota Camry
  - Honda Civic
  - Tesla Model 3

Motorcycles in fleet: 3
  - Harley Sportster
  - Yamaha R1
  - Ducati Monster

--- Finding Oldest Vehicle ---
Oldest vehicle: 2019 Harley Sportster

--- Polymorphic Behavior Demo ---
Calling getType() on each vehicle:
  Toyota Camry → Car
  Harley Sportster → Motorcycle
  Ford F-150 → Truck
  Honda Civic → Car
  Yamaha R1 → Motorcycle
  Chevy Silverado → Truck
  Tesla Model 3 → Car
  Ducati Monster → Motorcycle

💡 Benefits of Polymorphic Collections:
   ✅ Store different types in one array
   ✅ Process all uniformly with loops
   ✅ Add new types without changing code
   ✅ Write generic methods that work with all types
   ✅ Flexible and maintainable code

=========================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Polymorphic Arrays** | Array of parent type holds child objects |
| **Uniform Processing** | Loop through different types uniformly |
| **Type Filtering** | Use instanceof to filter by type |
| **Generic Methods** | Methods work with parent type |

**✅ Success Criteria:**
- [ ] Can create polymorphic arrays
- [ ] Can process different types uniformly
- [ ] Understand benefits for collections
- [ ] Can filter and search polymorphically
- [ ] See real-world applications

**🎯 Challenge:**
1. Add a `Bus` class
2. Implement sorting by year
3. Create a method to find vehicles by brand
4. Calculate total fleet value

---

#### Exercise 6: Real-World Application - E-Commerce System (30 minutes)

**What you'll learn:** Building a complete polymorphic system

**Create hierarchy: `Product` → `Electronics`, `Clothing`, `Book`**

**Concept:** Applying all polymorphism concepts in a real e-commerce system.

```java
abstract class Product {
    protected String productId;
    protected String name;
    protected double price;
    protected int stock;
    
    public Product(String productId, String name, double price, int stock) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    
    // Abstract method - must be implemented by subclasses
    abstract String getCategory();
    abstract double calculateShippingCost();
    abstract void displayDetails();
    
    // Concrete methods
    public double calculateTax() {
        return this.price * 0.08;  // 8% tax
    }
    
    public double getFinalPrice() {
        return this.price + calculateTax() + calculateShippingCost();
    }
    
    public boolean isInStock() {
        return this.stock > 0;
    }
    
    public void reduceStock(int quantity) {
        if (quantity <= this.stock) {
            this.stock -= quantity;
            System.out.println("✅ Stock reduced by " + quantity);
        } else {
            System.out.println("❌ Insufficient stock");
        }
    }
}

class Electronics extends Product {
    private String brand;
    private int warrantyMonths;
    
    public Electronics(String productId, String name, double price, int stock,
                      String brand, int warrantyMonths) {
        super(productId, name, price, stock);
        this.brand = brand;
        this.warrantyMonths = warrantyMonths;
    }
    
    @Override
    String getCategory() {
        return "Electronics";
    }
    
    @Override
    double calculateShippingCost() {
        return this.price > 500 ? 0 : 15.99;  // Free shipping over $500
    }
    
    @Override
    public void displayDetails() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      ELECTRONICS PRODUCT              ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("ID: " + this.productId);
        System.out.println("Name: " + this.name);
        System.out.println("Brand: " + this.brand);
        System.out.println("Price: $" + this.price);
        System.out.println("Warranty: " + this.warrantyMonths + " months");
        System.out.println("Stock: " + this.stock);
        System.out.println("Shipping: $" + calculateShippingCost());
        System.out.println("Tax: $" + String.format("%.2f", calculateTax()));
        System.out.println("Final Price: $" + String.format("%.2f", getFinalPrice()));
        System.out.println("════════════════════════════════════════");
    }
}

class Clothing extends Product {
    private String size;
    private String color;
    
    public Clothing(String productId, String name, double price, int stock,
                   String size, String color) {
        super(productId, name, price, stock);
        this.size = size;
        this.color = color;
    }
    
    @Override
    String getCategory() {
        return "Clothing";
    }
    
    @Override
    double calculateShippingCost() {
        return 5.99;  // Flat rate for clothing
    }
    
    @Override
    public void displayDetails() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║       CLOTHING PRODUCT                ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("ID: " + this.productId);
        System.out.println("Name: " + this.name);
        System.out.println("Size: " + this.size);
        System.out.println("Color: " + this.color);
        System.out.println("Price: $" + this.price);
        System.out.println("Stock: " + this.stock);
        System.out.println("Shipping: $" + calculateShippingCost());
        System.out.println("Tax: $" + String.format("%.2f", calculateTax()));
        System.out.println("Final Price: $" + String.format("%.2f", getFinalPrice()));
        System.out.println("════════════════════════════════════════");
    }
}

class Book extends Product {
    private String author;
    private int pages;
    
    public Book(String productId, String name, double price, int stock,
               String author, int pages) {
        super(productId, name, price, stock);
        this.author = author;
        this.pages = pages;
    }
    
    @Override
    String getCategory() {
        return "Book";
    }
    
    @Override
    double calculateShippingCost() {
        return 3.99;  // Low shipping for books
    }
    
    @Override
    public void displayDetails() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║         BOOK PRODUCT                  ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("ID: " + this.productId);
        System.out.println("Title: " + this.name);
        System.out.println("Author: " + this.author);
        System.out.println("Pages: " + this.pages);
        System.out.println("Price: $" + this.price);
        System.out.println("Stock: " + this.stock);
        System.out.println("Shipping: $" + calculateShippingCost());
        System.out.println("Tax: $" + String.format("%.2f", calculateTax()));
        System.out.println("Final Price: $" + String.format("%.2f", getFinalPrice()));
        System.out.println("════════════════════════════════════════");
    }
}

class ShoppingCart {
    private Product[] items;
    private int itemCount;
    
    public ShoppingCart(int capacity) {
        this.items = new Product[capacity];
        this.itemCount = 0;
    }
    
    public void addProduct(Product product) {
        if (itemCount < items.length) {
            items[itemCount++] = product;
            System.out.println("✅ Added to cart: " + product.name);
        } else {
            System.out.println("❌ Cart is full");
        }
    }
    
    public void displayCart() {
        System.out.println("\n╔════════════════════════════════════════════════╗");
        System.out.println("║           SHOPPING CART                       ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        if (itemCount == 0) {
            System.out.println("Cart is empty");
            return;
        }
        
        double subtotal = 0;
        double totalShipping = 0;
        double totalTax = 0;
        
        for (int i = 0; i < itemCount; i++) {
            Product p = items[i];
            System.out.println((i + 1) + ". " + p.name + " (" + p.getCategory() + ")");
            System.out.println("   Price: $" + p.price);
            System.out.println("   Shipping: $" + p.calculateShippingCost());
            System.out.println("   Tax: $" + String.format("%.2f", p.calculateTax()));
            
            subtotal += p.price;
            totalShipping += p.calculateShippingCost();
            totalTax += p.calculateTax();
        }
        
        System.out.println("────────────────────────────────────────────────");
        System.out.println("Subtotal: $" + String.format("%.2f", subtotal));
        System.out.println("Shipping: $" + String.format("%.2f", totalShipping));
        System.out.println("Tax: $" + String.format("%.2f", totalTax));
        System.out.println("TOTAL: $" + String.format("%.2f", 
                         subtotal + totalShipping + totalTax));
        System.out.println("════════════════════════════════════════════════");
    }
    
    public Product[] getItems() {
        Product[] result = new Product[itemCount];
        System.arraycopy(items, 0, result, 0, itemCount);
        return result;
    }
}

public class ECommerceSystemDemo {
    static void displayCatalog(Product[] products) {
        System.out.println("\n╔════════════════════════════════════════════════╗");
        System.out.println("║           PRODUCT CATALOG                     ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        for (Product p : products) {
            System.out.println(p.productId + " - " + p.name + " (" + 
                             p.getCategory() + ") - $" + p.price + 
                             (p.isInStock() ? " ✅" : " ❌ Out of Stock"));
        }
        System.out.println("════════════════════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== E-COMMERCE SYSTEM =====\n");
        
        // Create product catalog
        System.out.println("--- Creating Product Catalog ---");
        Product[] catalog = {
            new Electronics("E001", "Laptop", 999.99, 10, "Dell", 24),
            new Electronics("E002", "Smartphone", 699.99, 15, "Samsung", 12),
            new Clothing("C001", "T-Shirt", 29.99, 50, "L", "Blue"),
            new Clothing("C002", "Jeans", 59.99, 30, "32", "Black"),
            new Book("B001", "Java Programming", 49.99, 20, "John Doe", 500),
            new Book("B002", "Design Patterns", 54.99, 15, "Gang of Four", 395)
        };
        
        System.out.println("✅ Catalog created with " + catalog.length + " products");
        
        // Display catalog
        displayCatalog(catalog);
        
        // Display individual product details
        System.out.println("\n--- Product Details ---");
        catalog[0].displayDetails();
        catalog[2].displayDetails();
        catalog[4].displayDetails();
        
        // Create shopping cart
        System.out.println("\n--- Shopping Cart ---");
        ShoppingCart cart = new ShoppingCart(10);
        
        // Add products to cart
        cart.addProduct(catalog[0]);  // Laptop
        cart.addProduct(catalog[2]);  // T-Shirt
        cart.addProduct(catalog[4]);  // Book
        
        // Display cart
        cart.displayCart();
        
        // Process order
        System.out.println("\n--- Processing Order ---");
        Product[] orderItems = cart.getItems();
        for (Product item : orderItems) {
            item.reduceStock(1);
        }
        
        // Category analysis
        System.out.println("\n--- Category Analysis ---");
        int electronicsCount = 0, clothingCount = 0, bookCount = 0;
        double electronicsValue = 0, clothingValue = 0, bookValue = 0;
        
        for (Product p : catalog) {
            if (p instanceof Electronics) {
                electronicsCount++;
                electronicsValue += p.price * p.stock;
            } else if (p instanceof Clothing) {
                clothingCount++;
                clothingValue += p.price * p.stock;
            } else if (p instanceof Book) {
                bookCount++;
                bookValue += p.price * p.stock;
            }
        }
        
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║        INVENTORY ANALYSIS                     ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        System.out.println("Electronics: " + electronicsCount + " products, $" + 
                         String.format("%.2f", electronicsValue) + " value");
        System.out.println("Clothing: " + clothingCount + " products, $" + 
                         String.format("%.2f", clothingValue) + " value");
        System.out.println("Books: " + bookCount + " products, $" + 
                         String.format("%.2f", bookValue) + " value");
        System.out.println("════════════════════════════════════════════════");
        
        System.out.println("\n💡 Polymorphism Concepts Applied:");
        System.out.println("   ✅ Abstract base class (Product)");
        System.out.println("   ✅ Multiple concrete implementations");
        System.out.println("   ✅ Polymorphic arrays and collections");
        System.out.println("   ✅ Dynamic method dispatch");
        System.out.println("   ✅ instanceof for type checking");
        System.out.println("   ✅ Uniform processing of different types");
        
        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== E-COMMERCE SYSTEM =====

--- Creating Product Catalog ---
✅ Catalog created with 6 products

╔════════════════════════════════════════════════╗
║           PRODUCT CATALOG                     ║
╚════════════════════════════════════════════════╝
E001 - Laptop (Electronics) - $999.99 ✅
E002 - Smartphone (Electronics) - $699.99 ✅
C001 - T-Shirt (Clothing) - $29.99 ✅
C002 - Jeans (Clothing) - $59.99 ✅
B001 - Java Programming (Book) - $49.99 ✅
B002 - Design Patterns (Book) - $54.99 ✅
════════════════════════════════════════════════

[... displays product details ...]

--- Shopping Cart ---
✅ Added to cart: Laptop
✅ Added to cart: T-Shirt
✅ Added to cart: Java Programming

╔════════════════════════════════════════════════╗
║           SHOPPING CART                       ║
╚════════════════════════════════════════════════╝
1. Laptop (Electronics)
   Price: $999.99
   Shipping: $0.0
   Tax: $79.99
2. T-Shirt (Clothing)
   Price: $29.99
   Shipping: $5.99
   Tax: $2.40
3. Java Programming (Book)
   Price: $49.99
   Shipping: $3.99
   Tax: $4.00
────────────────────────────────────────────────
Subtotal: $1079.97
Shipping: $9.98
Tax: $86.39
TOTAL: $1176.34
════════════════════════════════════════════════

[... continues with order processing and analysis ...]

💡 Polymorphism Concepts Applied:
   ✅ Abstract base class (Product)
   ✅ Multiple concrete implementations
   ✅ Polymorphic arrays and collections
   ✅ Dynamic method dispatch
   ✅ instanceof for type checking
   ✅ Uniform processing of different types

=============================
```

**💡 Key Concepts:**

| Concept | Application |
|---------|-------------|
| **Abstract Class** | Product as base with abstract methods |
| **Polymorphism** | Different products treated uniformly |
| **Dynamic Dispatch** | Correct methods called at runtime |
| **Type Checking** | instanceof for category analysis |

**✅ Success Criteria:**
- [ ] Understand complete polymorphic system
- [ ] Can design with abstract base classes
- [ ] See real-world benefits
- [ ] Can combine all OOP concepts
- [ ] Ready to build similar systems

**🎯 Challenge:**
1. Add a `Food` product category
2. Implement discount system
3. Add customer reviews
4. Create order history tracking
5. Implement search and filter functionality

---

### 🎓 Day 15 Summary: Polymorphism

**What You Learned:**
1. ✅ Polymorphism basics
2. ✅ Upcasting and downcasting
3. ✅ instanceof operator
4. ✅ Dynamic method dispatch
5. ✅ Polymorphic collections
6. ✅ Real-world polymorphic systems

**Key Takeaways:**
- Polymorphism = "many forms"
- Parent reference can hold child objects
- Correct method chosen at runtime
- Upcasting is automatic, downcasting needs checking
- instanceof prevents ClassCastException
- Enables flexible, extensible code

**Polymorphism Checklist:**
```
✅ Use parent type for references
✅ Override methods in child classes
✅ Let Java choose correct method at runtime
✅ Use instanceof before downcasting
✅ Store different types in collections
✅ Write generic methods with parent type
✅ Test with multiple child types
```

**The Four Pillars of OOP (Complete!):**
1. ✅ **Encapsulation** - Data hiding and controlled access
2. ✅ **Inheritance** - Code reuse through parent-child relationships
3. ✅ **Polymorphism** - One interface, many implementations
4. ⏭️  **Abstraction** - Coming in Day 16!

**Next Steps:**
- Day 16: Abstract Classes and Interfaces
- Day 17: Exception Handling
- Day 18: Collections Framework

**🎉 Congratulations!**
You've completed the core OOP concepts! You now understand:
- Classes and Objects
- Constructors
- Encapsulation
- Inheritance
- Polymorphism

These are the foundations of object-oriented programming in Java!

---

## Day 16: Abstraction (2 hours)

**Learning Objectives:**
- Understand abstraction concept
- Learn abstract classes and methods
- Master abstract class design
- Understand when to use abstraction
- Combine abstraction with other OOP concepts
- Build real-world abstract systems

---

#### Exercise 1: Introduction to Abstract Classes (20 minutes)

**What you'll learn:** Understanding abstract classes and why they're needed

**Create classes: `Shape` (abstract) and concrete implementations**

**Concept:** **Abstract Class** = A class that cannot be instantiated directly. It serves as a blueprint for other classes. Use `abstract` keyword to create abstract classes and methods.

```java
// ABSTRACT CLASS - Cannot create objects directly
abstract class Shape {
    String color;
    
    // Regular constructor
    Shape(String color) {
        this.color = color;
        System.out.println("✅ Shape created with color: " + color);
    }
    
    // ABSTRACT METHOD - No implementation, must be overridden
    abstract double calculateArea();
    abstract double calculatePerimeter();
    
    // CONCRETE METHOD - Has implementation, can be inherited
    void displayColor() {
        System.out.println("Color: " + this.color);
    }
    
    // CONCRETE METHOD using abstract methods
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║      SHAPE INFORMATION        ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Color: " + this.color);
        System.out.println("Area: " + String.format("%.2f", calculateArea()));
        System.out.println("Perimeter: " + String.format("%.2f", calculatePerimeter()));
        System.out.println("════════════════════════════════");
    }
}

// CONCRETE CLASS - Must implement all abstract methods
class Circle extends Shape {
    double radius;
    
    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
        System.out.println("   Type: Circle with radius " + radius);
    }
    
    // MUST implement abstract method
    @Override
    double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    // MUST implement abstract method
    @Override
    double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }
}

// CONCRETE CLASS - Must implement all abstract methods
class Rectangle extends Shape {
    double length;
    double width;
    
    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
        System.out.println("   Type: Rectangle " + length + " × " + width);
    }
    
    // MUST implement abstract method
    @Override
    double calculateArea() {
        return length * width;
    }
    
    // MUST implement abstract method
    @Override
    double calculatePerimeter() {
        return 2 * (length + width);
    }
}

class Triangle extends Shape {
    double side1, side2, side3;
    
    Triangle(String color, double side1, double side2, double side3) {
        super(color);
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
        System.out.println("   Type: Triangle with sides " + side1 + ", " + side2 + ", " + side3);
    }
    
    @Override
    double calculateArea() {
        // Using Heron's formula
        double s = (side1 + side2 + side3) / 2;
        return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    }
    
    @Override
    double calculatePerimeter() {
        return side1 + side2 + side3;
    }
}

public class AbstractClassIntro {
    public static void main(String[] args) {
        System.out.println("===== ABSTRACT CLASSES =====\n");
        
        // Cannot create abstract class object
        // Shape shape = new Shape("Red");  // ❌ ERROR! Cannot instantiate abstract class
        
        // Can create concrete class objects
        System.out.println("--- Creating Shapes ---");
        Circle circle = new Circle("Red", 5.0);
        Rectangle rectangle = new Rectangle("Blue", 10.0, 5.0);
        Triangle triangle = new Triangle("Green", 3.0, 4.0, 5.0);
        
        // Display information
        System.out.println("\n--- Shape Information ---");
        circle.displayInfo();
        rectangle.displayInfo();
        triangle.displayInfo();
        
        // Polymorphism with abstract class
        System.out.println("\n--- Polymorphism with Abstract Class ---");
        Shape[] shapes = {circle, rectangle, triangle};
        
        double totalArea = 0;
        for (Shape shape : shapes) {
            System.out.println(shape.getClass().getSimpleName() + " area: " + 
                             String.format("%.2f", shape.calculateArea()));
            totalArea += shape.calculateArea();
        }
        
        System.out.println("\nTotal area of all shapes: " + String.format("%.2f", totalArea));
        
        System.out.println("\n💡 Key Points:");
        System.out.println("   ✅ Abstract class cannot be instantiated");
        System.out.println("   ✅ Abstract methods have no body");
        System.out.println("   ✅ Concrete classes must implement all abstract methods");
        System.out.println("   ✅ Abstract class can have concrete methods");
        System.out.println("   ✅ Abstract class can have constructors");
        System.out.println("   ✅ Can use abstract class as reference type");
        
        System.out.println("\n💡 Why Use Abstract Classes?");
        System.out.println("   ✅ Define common interface for subclasses");
        System.out.println("   ✅ Force subclasses to implement specific methods");
        System.out.println("   ✅ Share common code through concrete methods");
        System.out.println("   ✅ Achieve abstraction (hide implementation details)");
        
        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== ABSTRACT CLASSES =====

--- Creating Shapes ---
✅ Shape created with color: Red
   Type: Circle with radius 5.0
✅ Shape created with color: Blue
   Type: Rectangle 10.0 × 5.0
✅ Shape created with color: Green
   Type: Triangle with sides 3.0, 4.0, 5.0

--- Shape Information ---

╔════════════════════════════════╗
║      SHAPE INFORMATION        ║
╚════════════════════════════════╝
Color: Red
Area: 78.54
Perimeter: 31.42
════════════════════════════════

╔════════════════════════════════╗
║      SHAPE INFORMATION        ║
╚════════════════════════════════╝
Color: Blue
Area: 50.00
Perimeter: 30.00
════════════════════════════════

╔════════════════════════════════╗
║      SHAPE INFORMATION        ║
╚════════════════════════════════╝
Color: Green
Area: 6.00
Perimeter: 12.00
════════════════════════════════

--- Polymorphism with Abstract Class ---
Circle area: 78.54
Rectangle area: 50.00
Triangle area: 6.00

Total area of all shapes: 134.54

💡 Key Points:
   ✅ Abstract class cannot be instantiated
   ✅ Abstract methods have no body
   ✅ Concrete classes must implement all abstract methods
   ✅ Abstract class can have concrete methods
   ✅ Abstract class can have constructors
   ✅ Can use abstract class as reference type

💡 Why Use Abstract Classes?
   ✅ Define common interface for subclasses
   ✅ Force subclasses to implement specific methods
   ✅ Share common code through concrete methods
   ✅ Achieve abstraction (hide implementation details)

============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Abstract Class** | Class that cannot be instantiated |
| **Abstract Method** | Method without implementation |
| **Concrete Class** | Non-abstract class that can be instantiated |
| **Must Override** | Concrete subclass must implement abstract methods |

**Abstract Class Syntax:**
```java
// Define abstract class
abstract class AbstractClass {
    // Abstract method (no body)
    abstract returnType methodName();
    
    // Concrete method (has body)
    void concreteMethod() {
        // implementation
    }
}

// Concrete subclass must implement abstract methods
class ConcreteClass extends AbstractClass {
    @Override
    returnType methodName() {
        // must provide implementation
    }
}
```

**Abstract vs Concrete:**
```
ABSTRACT CLASS:
- Cannot create objects: new Shape() ❌
- Can have abstract methods
- Can have concrete methods
- Can have constructors
- Can have fields
- Use as reference type ✅

CONCRETE CLASS:
- Can create objects: new Circle() ✅
- Must implement all abstract methods
- Can override concrete methods
- Must call super() if parent has constructor
```

**✅ Success Criteria:**
- [ ] Understand abstract class concept
- [ ] Can create abstract classes
- [ ] Can define abstract methods
- [ ] Know concrete classes must implement abstract methods
- [ ] See benefits of abstraction

**🎯 Challenge:**
1. Add a `Square` class (special rectangle)
2. Add abstract method `getShapeType()`
3. Create method to find largest shape by area
4. Add validation in constructors

---

#### Exercise 2: Abstract Methods and Implementation (25 minutes)

**What you'll learn:** Working with abstract methods and forcing implementation

**Create classes: `Employee` (abstract) and different employee types**

**Concept:** Abstract methods define "what" must be done, but not "how". Each subclass provides its own implementation.

```java
abstract class Employee {
    protected String name;
    protected int id;
    protected String department;
    
    Employee(String name, int id, String department) {
        this.name = name;
        this.id = id;
        this.department = department;
    }
    
    // ABSTRACT METHODS - Each employee type calculates differently
    abstract double calculateSalary();
    abstract double calculateBonus();
    abstract String getEmployeeType();
    
    // CONCRETE METHOD - Common for all employees
    void displayBasicInfo() {
        System.out.println("Name: " + this.name);
        System.out.println("ID: " + this.id);
        System.out.println("Department: " + this.department);
        System.out.println("Type: " + getEmployeeType());
    }
    
    // CONCRETE METHOD using abstract methods
    void displayFullInfo() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      EMPLOYEE INFORMATION             ║");
        System.out.println("╚════════════════════════════════════════╝");
        displayBasicInfo();
        System.out.println("Salary: $" + String.format("%.2f", calculateSalary()));
        System.out.println("Bonus: $" + String.format("%.2f", calculateBonus()));
        System.out.println("Total: $" + String.format("%.2f", 
                         calculateSalary() + calculateBonus()));
        System.out.println("════════════════════════════════════════");
    }
    
    // CONCRETE METHOD
    double getTotalCompensation() {
        return calculateSalary() + calculateBonus();
    }
}

class FullTimeEmployee extends Employee {
    private double monthlySalary;
    
    FullTimeEmployee(String name, int id, String department, double monthlySalary) {
        super(name, id, department);
        this.monthlySalary = monthlySalary;
    }
    
    @Override
    double calculateSalary() {
        return monthlySalary * 12;  // Annual salary
    }
    
    @Override
    double calculateBonus() {
        return calculateSalary() * 0.10;  // 10% bonus
    }
    
    @Override
    String getEmployeeType() {
        return "Full-Time Employee";
    }
}

class PartTimeEmployee extends Employee {
    private double hourlyRate;
    private int hoursPerWeek;
    
    PartTimeEmployee(String name, int id, String department, 
                    double hourlyRate, int hoursPerWeek) {
        super(name, id, department);
        this.hourlyRate = hourlyRate;
        this.hoursPerWeek = hoursPerWeek;
    }
    
    @Override
    double calculateSalary() {
        return hourlyRate * hoursPerWeek * 52;  // Annual (52 weeks)
    }
    
    @Override
    double calculateBonus() {
        return calculateSalary() * 0.05;  // 5% bonus
    }
    
    @Override
    String getEmployeeType() {
        return "Part-Time Employee";
    }
}

class Contractor extends Employee {
    private double projectRate;
    private int projectsPerYear;
    
    Contractor(String name, int id, String department, 
              double projectRate, int projectsPerYear) {
        super(name, id, department);
        this.projectRate = projectRate;
        this.projectsPerYear = projectsPerYear;
    }
    
    @Override
    double calculateSalary() {
        return projectRate * projectsPerYear;
    }
    
    @Override
    double calculateBonus() {
        return 0;  // Contractors don't get bonuses
    }
    
    @Override
    String getEmployeeType() {
        return "Contractor";
    }
}

class Intern extends Employee {
    private double monthlyStipend;
    private int months;
    
    Intern(String name, int id, String department, double monthlyStipend, int months) {
        super(name, id, department);
        this.monthlyStipend = monthlyStipend;
        this.months = months;
    }
    
    @Override
    double calculateSalary() {
        return monthlyStipend * months;
    }
    
    @Override
    double calculateBonus() {
        return 500;  // Fixed bonus for interns
    }
    
    @Override
    String getEmployeeType() {
        return "Intern";
    }
}

public class AbstractMethodsDemo {
    static void processPayroll(Employee[] employees) {
        System.out.println("\n╔════════════════════════════════════════════════╗");
        System.out.println("║           PAYROLL PROCESSING                  ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        double totalPayroll = 0;
        
        for (Employee emp : employees) {
            double compensation = emp.getTotalCompensation();
            totalPayroll += compensation;
            
            System.out.println(emp.name + " (" + emp.getEmployeeType() + "): $" + 
                             String.format("%.2f", compensation));
        }
        
        System.out.println("────────────────────────────────────────────────");
        System.out.println("Total Payroll: $" + String.format("%.2f", totalPayroll));
        System.out.println("════════════════════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== ABSTRACT METHODS =====\n");
        
        // Create different employee types
        System.out.println("--- Creating Employees ---");
        Employee emp1 = new FullTimeEmployee("Alice", 101, "Engineering", 8000);
        Employee emp2 = new PartTimeEmployee("Bob", 102, "Marketing", 25, 20);
        Employee emp3 = new Contractor("Charlie", 103, "Design", 5000, 10);
        Employee emp4 = new Intern("Diana", 104, "HR", 1500, 6);
        
        System.out.println("✅ All employees created");
        
        // Display individual information
        System.out.println("\n--- Employee Details ---");
        emp1.displayFullInfo();
        emp2.displayFullInfo();
        emp3.displayFullInfo();
        emp4.displayFullInfo();
        
        // Process payroll
        Employee[] employees = {emp1, emp2, emp3, emp4};
        processPayroll(employees);
        
        // Demonstrate polymorphism
        System.out.println("\n--- Salary Calculation Methods ---");
        for (Employee emp : employees) {
            System.out.println(emp.getEmployeeType() + ":");
            System.out.println("  Salary: $" + String.format("%.2f", emp.calculateSalary()));
            System.out.println("  Bonus: $" + String.format("%.2f", emp.calculateBonus()));
        }
        
        System.out.println("\n💡 Abstract Method Benefits:");
        System.out.println("   ✅ Forces all subclasses to implement");
        System.out.println("   ✅ Each type has its own calculation logic");
        System.out.println("   ✅ Polymorphism works seamlessly");
        System.out.println("   ✅ Easy to add new employee types");
        System.out.println("   ✅ Consistent interface for all types");
        
        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== ABSTRACT METHODS =====

--- Creating Employees ---
✅ All employees created

--- Employee Details ---

╔════════════════════════════════════════╗
║      EMPLOYEE INFORMATION             ║
╚════════════════════════════════════════╝
Name: Alice
ID: 101
Department: Engineering
Type: Full-Time Employee
Salary: $96000.00
Bonus: $9600.00
Total: $105600.00
════════════════════════════════════════

[... similar for other employees ...]

╔════════════════════════════════════════════════╗
║           PAYROLL PROCESSING                  ║
╚════════════════════════════════════════════════╝
Alice (Full-Time Employee): $105600.00
Bob (Part-Time Employee): $27300.00
Charlie (Contractor): $50000.00
Diana (Intern): $9500.00
────────────────────────────────────────────────
Total Payroll: $192400.00
════════════════════════════════════════════════

--- Salary Calculation Methods ---
Full-Time Employee:
  Salary: $96000.00
  Bonus: $9600.00
Part-Time Employee:
  Salary: $26000.00
  Bonus: $1300.00
Contractor:
  Salary: $50000.00
  Bonus: $0.00
Intern:
  Salary: $9000.00
  Bonus: $500.00

💡 Abstract Method Benefits:
   ✅ Forces all subclasses to implement
   ✅ Each type has its own calculation logic
   ✅ Polymorphism works seamlessly
   ✅ Easy to add new employee types
   ✅ Consistent interface for all types

============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Abstract Method** | Declares method signature, no implementation |
| **Must Implement** | All concrete subclasses must provide implementation |
| **Polymorphism** | Call abstract methods through parent reference |
| **Flexibility** | Each subclass implements differently |

**✅ Success Criteria:**
- [ ] Can define abstract methods
- [ ] Understand implementation requirement
- [ ] See different implementations per subclass
- [ ] Use abstract methods polymorphically
- [ ] Understand benefits of abstraction

**🎯 Challenge:**
1. Add a `Manager` employee type
2. Add abstract method `getWorkSchedule()`
3. Create method to find highest paid employee
4. Add tax calculation method

---

#### Exercise 3: Abstract Classes with Constructors and Fields (20 minutes)

**What you'll learn:** Using constructors and fields in abstract classes

**Create classes: `Vehicle` (abstract) with different vehicle types**

**Concept:** Abstract classes can have constructors, fields, and concrete methods just like regular classes. They provide common functionality to subclasses.

```java
abstract class Vehicle {
    // Fields (can be accessed by subclasses)
    protected String brand;
    protected String model;
    protected int year;
    protected double price;
    
    // Constructor
    Vehicle(String brand, String model, int year, double price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        System.out.println("✅ Vehicle registered: " + brand + " " + model);
    }
    
    // Abstract methods
    abstract String getVehicleType();
    abstract double calculateInsurance();
    abstract double calculateMaintenanceCost();
    
    // Concrete method
    int getAge() {
        return 2024 - this.year;
    }
    
    // Concrete method
    double calculateDepreciation() {
        int age = getAge();
        double depreciation = this.price * 0.10 * age;
        return Math.max(0, this.price - depreciation);
    }
    
    // Concrete method using abstract methods
    double calculateTotalCost() {
        return calculateInsurance() + calculateMaintenanceCost();
    }
    
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      VEHICLE INFORMATION              ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Type: " + getVehicleType());
        System.out.println("Brand: " + this.brand);
        System.out.println("Model: " + this.model);
        System.out.println("Year: " + this.year);
        System.out.println("Age: " + getAge() + " years");
        System.out.println("Original Price: $" + this.price);
        System.out.println("Current Value: $" + String.format("%.2f", calculateDepreciation()));
        System.out.println("Insurance: $" + String.format("%.2f", calculateInsurance()));
        System.out.println("Maintenance: $" + String.format("%.2f", calculateMaintenanceCost()));
        System.out.println("Total Annual Cost: $" + String.format("%.2f", calculateTotalCost()));
        System.out.println("════════════════════════════════════════");
    }
}

class Car extends Vehicle {
    int numberOfDoors;
    
    Car(String brand, String model, int year, double price, int doors) {
        super(brand, model, year, price);  // Call parent constructor
        this.numberOfDoors = doors;
        System.out.println("   Doors: " + doors);
    }
    
    @Override
    String getVehicleType() {
        return "Car";
    }
    
    @Override
    double calculateInsurance() {
        return this.price * 0.05;  // 5% of price
    }
    
    @Override
    double calculateMaintenanceCost() {
        return 1200 + (getAge() * 100);  // Base + age factor
    }
}

class Motorcycle extends Vehicle {
    int engineCC;
    
    Motorcycle(String brand, String model, int year, double price, int engineCC) {
        super(brand, model, year, price);
        this.engineCC = engineCC;
        System.out.println("   Engine: " + engineCC + "cc");
    }
    
    @Override
    String getVehicleType() {
        return "Motorcycle";
    }
    
    @Override
    double calculateInsurance() {
        return this.price * 0.03;  // 3% of price
    }
    
    @Override
    double calculateMaintenanceCost() {
        return 600 + (getAge() * 50);
    }
}

class Truck extends Vehicle {
    double cargoCapacity;
    
    Truck(String brand, String model, int year, double price, double capacity) {
        super(brand, model, year, price);
        this.cargoCapacity = capacity;
        System.out.println("   Capacity: " + capacity + " tons");
    }
    
    @Override
    String getVehicleType() {
        return "Truck";
    }
    
    @Override
    double calculateInsurance() {
        return this.price * 0.07;  // 7% of price
    }
    
    @Override
    double calculateMaintenanceCost() {
        return 2000 + (getAge() * 200);
    }
}

public class AbstractConstructorsDemo {
    public static void main(String[] args) {
        System.out.println("===== ABSTRACT CLASSES WITH CONSTRUCTORS =====\n");
        
        // Create vehicles
        System.out.println("--- Registering Vehicles ---");
        Vehicle car = new Car("Toyota", "Camry", 2020, 28000, 4);
        Vehicle motorcycle = new Motorcycle("Harley", "Sportster", 2019, 12000, 883);
        Vehicle truck = new Truck("Ford", "F-150", 2021, 45000, 2.5);
        
        // Display information
        System.out.println("\n--- Vehicle Details ---");
        car.displayInfo();
        motorcycle.displayInfo();
        truck.displayInfo();
        
        // Calculate fleet costs
        System.out.println("\n--- Fleet Cost Analysis ---");
        Vehicle[] fleet = {car, motorcycle, truck};
        
        double totalInsurance = 0;
        double totalMaintenance = 0;
        double totalValue = 0;
        
        for (Vehicle v : fleet) {
            totalInsurance += v.calculateInsurance();
            totalMaintenance += v.calculateMaintenanceCost();
            totalValue += v.calculateDepreciation();
        }
        
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║      FLEET SUMMARY                    ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Total Vehicles: " + fleet.length);
        System.out.println("Total Fleet Value: $" + String.format("%.2f", totalValue));
        System.out.println("Total Insurance: $" + String.format("%.2f", totalInsurance));
        System.out.println("Total Maintenance: $" + String.format("%.2f", totalMaintenance));
        System.out.println("Total Annual Cost: $" + String.format("%.2f", 
                         totalInsurance + totalMaintenance));
        System.out.println("════════════════════════════════════════");
        
        System.out.println("\n💡 Abstract Class Features:");
        System.out.println("   ✅ Can have constructors (called by subclasses)");
        System.out.println("   ✅ Can have fields (inherited by subclasses)");
        System.out.println("   ✅ Can have concrete methods (shared code)");
        System.out.println("   ✅ Can have abstract methods (must implement)");
        System.out.println("   ✅ Provides common functionality");
        
        System.out.println("\n==============================================");
    }
}
```

**Expected Output:**
```
===== ABSTRACT CLASSES WITH CONSTRUCTORS =====

--- Registering Vehicles ---
✅ Vehicle registered: Toyota Camry
   Doors: 4
✅ Vehicle registered: Harley Sportster
   Engine: 883cc
✅ Vehicle registered: Ford F-150
   Capacity: 2.5 tons

--- Vehicle Details ---

╔════════════════════════════════════════╗
║      VEHICLE INFORMATION              ║
╚════════════════════════════════════════╝
Type: Car
Brand: Toyota
Model: Camry
Year: 2020
Age: 4 years
Original Price: $28000.0
Current Value: $16800.00
Insurance: $1400.00
Maintenance: $1600.00
Total Annual Cost: $3000.00
════════════════════════════════════════

[... similar for other vehicles ...]

╔════════════════════════════════════════╗
║      FLEET SUMMARY                    ║
╚════════════════════════════════════════╝
Total Vehicles: 3
Total Fleet Value: $62400.00
Total Insurance: $4900.00
Total Maintenance: $5000.00
Total Annual Cost: $9900.00
════════════════════════════════════════

💡 Abstract Class Features:
   ✅ Can have constructors (called by subclasses)
   ✅ Can have fields (inherited by subclasses)
   ✅ Can have concrete methods (shared code)
   ✅ Can have abstract methods (must implement)
   ✅ Provides common functionality

==============================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Constructor** | Abstract class can have constructor |
| **super()** | Subclass must call parent constructor |
| **Fields** | Abstract class can have fields |
| **Concrete Methods** | Shared functionality for all subclasses |

**✅ Success Criteria:**
- [ ] Understand abstract classes can have constructors
- [ ] Can use fields in abstract classes
- [ ] Know how to call parent constructor
- [ ] See shared functionality benefits
- [ ] Combine abstract and concrete methods

**🎯 Challenge:**
1. Add an `ElectricCar` class
2. Add abstract method `getFuelType()`
3. Calculate total cost of ownership
4. Add warranty calculation

---

#### Exercise 4: When to Use Abstract Classes (25 minutes)

**What you'll learn:** Understanding when abstract classes are the right choice

**Create classes: `BankAccount` (abstract) with different account types**

**Concept:** Use abstract classes when you have a clear "is-a" relationship and want to share code among related classes.

```java
abstract class BankAccount {
    protected String accountNumber;
    protected String accountHolder;
    protected double balance;
    protected int transactionCount;
    
    // Constructor
    BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.transactionCount = 0;
        System.out.println("✅ Account created: " + accountNumber);
    }
    
    // Abstract methods - each account type implements differently
    abstract double calculateInterest();
    abstract double getMinimumBalance();
    abstract String getAccountType();
    abstract double getMonthlyFee();
    
    // Concrete method - common for all accounts
    void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactionCount++;
            System.out.println("💰 Deposited $" + amount);
            System.out.println("   New balance: $" + this.balance);
        } else {
            System.out.println("❌ Invalid deposit amount");
        }
    }
    
    // Concrete method with validation
    boolean withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("❌ Invalid withdrawal amount");
            return false;
        }
        
        if (this.balance - amount < getMinimumBalance()) {
            System.out.println("❌ Insufficient funds (minimum balance: $" + 
                             getMinimumBalance() + ")");
            return false;
        }
        
        this.balance -= amount;
        this.transactionCount++;
        System.out.println("💸 Withdrew $" + amount);
        System.out.println("   New balance: $" + this.balance);
        return true;
    }
    
    // Concrete method using abstract method
    void applyMonthlyCharges() {
        double fee = getMonthlyFee();
        double interest = calculateInterest();
        
        this.balance -= fee;
        this.balance += interest;
        
        System.out.println("📅 Monthly charges applied:");
        System.out.println("   Fee: -$" + fee);
        System.out.println("   Interest: +$" + String.format("%.2f", interest));
        System.out.println("   New balance: $" + this.balance);
    }
    
    void displayInfo() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      ACCOUNT INFORMATION              ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Type: " + getAccountType());
        System.out.println("Account Number: " + this.accountNumber);
        System.out.println("Account Holder: " + this.accountHolder);
        System.out.println("Balance: $" + this.balance);
        System.out.println("Minimum Balance: $" + getMinimumBalance());
        System.out.println("Monthly Fee: $" + getMonthlyFee());
        System.out.println("Transactions: " + this.transactionCount);
        System.out.println("════════════════════════════════════════");
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate = 0.03;  // 3% annual
    
    SavingsAccount(String accountNumber, String accountHolder, double initialBalance) {
        super(accountNumber, accountHolder, initialBalance);
        System.out.println("   Type: Savings Account");
    }
    
    @Override
    double calculateInterest() {
        return this.balance * (interestRate / 12);  // Monthly interest
    }
    
    @Override
    double getMinimumBalance() {
        return 500.0;
    }
    
    @Override
    String getAccountType() {
        return "Savings Account";
    }
    
    @Override
    double getMonthlyFee() {
        return this.balance < getMinimumBalance() ? 10.0 : 0.0;
    }
}

class CheckingAccount extends BankAccount {
    private int freeTransactions = 10;
    
    CheckingAccount(String accountNumber, String accountHolder, double initialBalance) {
        super(accountNumber, accountHolder, initialBalance);
        System.out.println("   Type: Checking Account");
    }
    
    @Override
    double calculateInterest() {
        return 0;  // No interest on checking
    }
    
    @Override
    double getMinimumBalance() {
        return 100.0;
    }
    
    @Override
    String getAccountType() {
        return "Checking Account";
    }
    
    @Override
    double getMonthlyFee() {
        double baseFee = 5.0;
        double transactionFee = this.transactionCount > freeTransactions ? 
                               (this.transactionCount - freeTransactions) * 0.50 : 0;
        return baseFee + transactionFee;
    }
}

class BusinessAccount extends BankAccount {
    private double transactionFeeRate = 0.001;  // 0.1% per transaction
    
    BusinessAccount(String accountNumber, String accountHolder, double initialBalance) {
        super(accountNumber, accountHolder, initialBalance);
        System.out.println("   Type: Business Account");
    }
    
    @Override
    double calculateInterest() {
        return this.balance * 0.01 / 12;  // 1% annual
    }
    
    @Override
    double getMinimumBalance() {
        return 1000.0;
    }
    
    @Override
    String getAccountType() {
        return "Business Account";
    }
    
    @Override
    double getMonthlyFee() {
        return 25.0;  // Fixed monthly fee
    }
}

public class AbstractClassUsageDemo {
    public static void main(String[] args) {
        System.out.println("===== WHEN TO USE ABSTRACT CLASSES =====\n");
        
        // Create different account types
        System.out.println("--- Opening Accounts ---");
        BankAccount savings = new SavingsAccount("SAV001", "Alice", 2000);
        BankAccount checking = new CheckingAccount("CHK001", "Bob", 1500);
        BankAccount business = new BusinessAccount("BUS001", "TechCorp", 10000);
        
        // Perform operations
        System.out.println("\n--- Account Operations ---");
        savings.deposit(500);
        savings.withdraw(200);
        
        checking.deposit(300);
        checking.withdraw(100);
        
        business.deposit(5000);
        business.withdraw(2000);
        
        // Apply monthly charges
        System.out.println("\n--- Monthly Charges ---");
        savings.applyMonthlyCharges();
        checking.applyMonthlyCharges();
        business.applyMonthlyCharges();
        
        // Display all accounts
        System.out.println("\n--- Account Details ---");
        savings.displayInfo();
        checking.displayInfo();
        business.displayInfo();
        
        // Polymorphic array
        System.out.println("\n--- Bank Summary ---");
        BankAccount[] accounts = {savings, checking, business};
        
        double totalBalance = 0;
        double totalFees = 0;
        
        for (BankAccount account : accounts) {
            totalBalance += account.balance;
            totalFees += account.getMonthlyFee();
        }
        
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║         BANK SUMMARY                  ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Total Accounts: " + accounts.length);
        System.out.println("Total Balance: $" + String.format("%.2f", totalBalance));
        System.out.println("Total Monthly Fees: $" + String.format("%.2f", totalFees));
        System.out.println("════════════════════════════════════════");
        
        System.out.println("\n💡 When to Use Abstract Classes:");
        System.out.println("   ✅ Clear 'is-a' relationship (all are BankAccounts)");
        System.out.println("   ✅ Share common code (deposit, withdraw)");
        System.out.println("   ✅ Force implementation of specific methods");
        System.out.println("   ✅ Provide default behavior with option to override");
        System.out.println("   ✅ Have common fields and constructors");
        
        System.out.println("\n💡 Abstract Class vs Interface:");
        System.out.println("   Abstract Class:");
        System.out.println("   - Can have constructors");
        System.out.println("   - Can have fields");
        System.out.println("   - Can have concrete methods");
        System.out.println("   - Single inheritance only");
        System.out.println("   ");
        System.out.println("   Interface (Day 17):");
        System.out.println("   - No constructors");
        System.out.println("   - Only constants");
        System.out.println("   - All methods abstract (Java 7)");
        System.out.println("   - Multiple inheritance");
        
        System.out.println("\n========================================");
    }
}
```

**Expected Output:**
```
===== WHEN TO USE ABSTRACT CLASSES =====

--- Opening Accounts ---
✅ Account created: SAV001
   Type: Savings Account
✅ Account created: CHK001
   Type: Checking Account
✅ Account created: BUS001
   Type: Business Account

--- Account Operations ---
💰 Deposited $500.0
   New balance: $2500.0
💸 Withdrew $200.0
   New balance: $2300.0
💰 Deposited $300.0
   New balance: $1800.0
💸 Withdrew $100.0
   New balance: $1700.0
💰 Deposited $5000.0
   New balance: $15000.0
💸 Withdrew $2000.0
   New balance: $13000.0

--- Monthly Charges ---
📅 Monthly charges applied:
   Fee: -$0.0
   Interest: +$5.75
   New balance: $2305.75
📅 Monthly charges applied:
   Fee: -$5.0
   Interest: +$0.0
   New balance: $1695.0
📅 Monthly charges applied:
   Fee: -$25.0
   Interest: +$10.83
   New balance: $12985.83

[... displays account details ...]

💡 When to Use Abstract Classes:
   ✅ Clear 'is-a' relationship (all are BankAccounts)
   ✅ Share common code (deposit, withdraw)
   ✅ Force implementation of specific methods
   ✅ Provide default behavior with option to override
   ✅ Have common fields and constructors

💡 Abstract Class vs Interface:
   Abstract Class:
   - Can have constructors
   - Can have fields
   - Can have concrete methods
   - Single inheritance only
   
   Interface (Day 17):
   - No constructors
   - Only constants
   - All methods abstract (Java 7)
   - Multiple inheritance

========================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Is-A Relationship** | All subclasses are types of parent |
| **Code Sharing** | Common functionality in parent |
| **Forced Implementation** | Abstract methods must be implemented |
| **Flexibility** | Each type can customize behavior |

**✅ Success Criteria:**
- [ ] Understand when to use abstract classes
- [ ] See code sharing benefits
- [ ] Know abstract vs interface differences
- [ ] Can design abstract class hierarchies
- [ ] Understand real-world applications

**🎯 Challenge:**
1. Add a `StudentAccount` with special rules
2. Add transaction history tracking
3. Implement account transfer method
4. Add interest calculation for different periods

---

#### Exercise 5: Abstract Classes in Hierarchies (20 minutes)

**What you'll learn:** Creating multi-level abstract class hierarchies

**Create hierarchy: `Animal` → `Mammal`/`Bird` → specific animals**

**Concept:** Abstract classes can extend other abstract classes, creating hierarchies of abstraction levels.

```java
// LEVEL 1: Most abstract
abstract class Animal {
    protected String name;
    protected int age;
    
    Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Abstract methods all animals must have
    abstract void makeSound();
    abstract void move();
    abstract String getSpecies();
    
    // Concrete method
    void sleep() {
        System.out.println(this.name + " is sleeping... 💤");
    }
    
    void displayBasicInfo() {
        System.out.println("Name: " + this.name);
        System.out.println("Age: " + this.age);
        System.out.println("Species: " + getSpecies());
    }
}

// LEVEL 2: Intermediate abstraction for mammals
abstract class Mammal extends Animal {
    protected boolean hasFur;
    
    Mammal(String name, int age, boolean hasFur) {
        super(name, age);
        this.hasFur = hasFur;
    }
    
    // Abstract method specific to mammals
    abstract void nurse();
    
    // Concrete method for all mammals
    void breathe() {
        System.out.println(this.name + " breathes with lungs");
    }
    
    @Override
    void displayBasicInfo() {
        super.displayBasicInfo();
        System.out.println("Has Fur: " + (this.hasFur ? "Yes" : "No"));
    }
}

// LEVEL 2: Intermediate abstraction for birds
abstract class Bird extends Animal {
    protected boolean canFly;
    
    Bird(String name, int age, boolean canFly) {
        super(name, age);
        this.canFly = canFly;
    }
    
    // Abstract method specific to birds
    abstract void layEggs();
    
    // Concrete method for all birds
    void preen() {
        System.out.println(this.name + " is preening feathers");
    }
    
    @Override
    void displayBasicInfo() {
        super.displayBasicInfo();
        System.out.println("Can Fly: " + (this.canFly ? "Yes" : "No"));
    }
}

// LEVEL 3: Concrete mammal
class Dog extends Mammal {
    String breed;
    
    Dog(String name, int age, String breed) {
        super(name, age, true);
        this.breed = breed;
    }
    
    @Override
    void makeSound() {
        System.out.println(this.name + " says: Woof! Woof! 🐕");
    }
    
    @Override
    void move() {
        System.out.println(this.name + " runs on four legs");
    }
    
    @Override
    String getSpecies() {
        return "Dog (" + this.breed + ")";
    }
    
    @Override
    void nurse() {
        System.out.println(this.name + " nurses puppies");
    }
    
    void fetch() {
        System.out.println(this.name + " fetches the ball!");
    }
}

// LEVEL 3: Concrete mammal
class Dolphin extends Mammal {
    Dolphin(String name, int age) {
        super(name, age, false);  // No fur
    }
    
    @Override
    void makeSound() {
        System.out.println(this.name + " makes clicking sounds 🐬");
    }
    
    @Override
    void move() {
        System.out.println(this.name + " swims gracefully");
    }
    
    @Override
    String getSpecies() {
        return "Dolphin";
    }
    
    @Override
    void nurse() {
        System.out.println(this.name + " nurses calf underwater");
    }
    
    void jump() {
        System.out.println(this.name + " jumps out of water!");
    }
}

// LEVEL 3: Concrete bird
class Eagle extends Bird {
    Eagle(String name, int age) {
        super(name, age, true);
    }
    
    @Override
    void makeSound() {
        System.out.println(this.name + " screeches 🦅");
    }
    
    @Override
    void move() {
        System.out.println(this.name + " soars through the sky");
    }
    
    @Override
    String getSpecies() {
        return "Eagle";
    }
    
    @Override
    void layEggs() {
        System.out.println(this.name + " lays eggs in a nest");
    }
    
    void hunt() {
        System.out.println(this.name + " hunts for prey");
    }
}

// LEVEL 3: Concrete bird
class Penguin extends Bird {
    Penguin(String name, int age) {
        super(name, age, false);  // Cannot fly
    }
    
    @Override
    void makeSound() {
        System.out.println(this.name + " makes honking sounds 🐧");
    }
    
    @Override
    void move() {
        System.out.println(this.name + " waddles and swims");
    }
    
    @Override
    String getSpecies() {
        return "Penguin";
    }
    
    @Override
    void layEggs() {
        System.out.println(this.name + " lays eggs on ice");
    }
    
    void slide() {
        System.out.println(this.name + " slides on belly!");
    }
}

public class AbstractHierarchyDemo {
    public static void main(String[] args) {
        System.out.println("===== ABSTRACT CLASS HIERARCHIES =====\n");
        
        // Create animals
        System.out.println("--- Creating Animals ---");
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        Dolphin dolphin = new Dolphin("Flipper", 5);
        Eagle eagle = new Eagle("Sky", 4);
        Penguin penguin = new Penguin("Waddles", 2);
        
        // Store in most abstract type
        Animal[] animals = {dog, dolphin, eagle, penguin};
        
        // Common operations (from Animal)
        System.out.println("\n--- Common Animal Behaviors ---");
        for (Animal animal : animals) {
            System.out.println("\n" + animal.name + ":");
            animal.displayBasicInfo();
            animal.makeSound();
            animal.move();
            animal.sleep();
        }
        
        // Mammal-specific operations
        System.out.println("\n--- Mammal-Specific Behaviors ---");
        Mammal[] mammals = {dog, dolphin};
        for (Mammal mammal : mammals) {
            System.out.println("\n" + mammal.name + ":");
            mammal.breathe();
            mammal.nurse();
        }
        
        // Bird-specific operations
        System.out.println("\n--- Bird-Specific Behaviors ---");
        Bird[] birds = {eagle, penguin};
        for (Bird bird : birds) {
            System.out.println("\n" + bird.name + ":");
            bird.preen();
            bird.layEggs();
        }
        
        // Specific animal behaviors
        System.out.println("\n--- Specific Animal Behaviors ---");
        dog.fetch();
        dolphin.jump();
        eagle.hunt();
        penguin.slide();
        
        System.out.println("\n💡 Abstract Class Hierarchy:");
        System.out.println("   Level 1: Animal (most abstract)");
        System.out.println("      ├── Level 2: Mammal (intermediate)");
        System.out.println("      │   ├── Level 3: Dog (concrete)");
        System.out.println("      │   └── Level 3: Dolphin (concrete)");
        System.out.println("      └── Level 2: Bird (intermediate)");
        System.out.println("          ├── Level 3: Eagle (concrete)");
        System.out.println("          └── Level 3: Penguin (concrete)");
        
        System.out.println("\n💡 Benefits of Hierarchies:");
        System.out.println("   ✅ Organize related abstractions");
        System.out.println("   ✅ Share code at appropriate levels");
        System.out.println("   ✅ Add specificity gradually");
        System.out.println("   ✅ Flexible and maintainable");
        
        System.out.println("\n======================================");
    }
}
```

**Expected Output:**
```
===== ABSTRACT CLASS HIERARCHIES =====

--- Creating Animals ---

--- Common Animal Behaviors ---

Buddy:
Name: Buddy
Age: 3
Species: Dog (Golden Retriever)
Has Fur: Yes
Buddy says: Woof! Woof! 🐕
Buddy runs on four legs
Buddy is sleeping... 💤

Flipper:
Name: Flipper
Age: 5
Species: Dolphin
Has Fur: No
Flipper makes clicking sounds 🐬
Flipper swims gracefully
Flipper is sleeping... 💤

[... continues for all animals ...]

--- Mammal-Specific Behaviors ---

Buddy:
Buddy breathes with lungs
Buddy nurses puppies

Flipper:
Flipper breathes with lungs
Flipper nurses calf underwater

--- Bird-Specific Behaviors ---

Sky:
Sky is preening feathers
Sky lays eggs in a nest

Waddles:
Waddles is preening feathers
Waddles lays eggs on ice

--- Specific Animal Behaviors ---
Buddy fetches the ball!
Flipper jumps out of water!
Sky hunts for prey
Waddles slides on belly!

💡 Abstract Class Hierarchy:
   Level 1: Animal (most abstract)
      ├── Level 2: Mammal (intermediate)
      │   ├── Level 3: Dog (concrete)
      │   └── Level 3: Dolphin (concrete)
      └── Level 2: Bird (intermediate)
          ├── Level 3: Eagle (concrete)
          └── Level 3: Penguin (concrete)

💡 Benefits of Hierarchies:
   ✅ Organize related abstractions
   ✅ Share code at appropriate levels
   ✅ Add specificity gradually
   ✅ Flexible and maintainable

======================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Multi-level** | Abstract classes can extend abstract classes |
| **Gradual Specificity** | Each level adds more specific behavior |
| **Code Organization** | Related abstractions grouped together |
| **Flexibility** | Can reference at any level |

**✅ Success Criteria:**
- [ ] Understand multi-level abstract hierarchies
- [ ] Can create intermediate abstract classes
- [ ] See gradual specialization
- [ ] Know when to add abstraction levels
- [ ] Can design complex hierarchies

**🎯 Challenge:**
1. Add a `Reptile` abstract class
2. Add `Snake` and `Turtle` concrete classes
3. Create a zoo management system
4. Add feeding and habitat methods

---

#### Exercise 6: Real-World Application - Payment Processing System (30 minutes)

**What you'll learn:** Building a complete abstract system for real-world use

**Create hierarchy: `Payment` (abstract) with multiple payment methods**

**Concept:** Applying all abstraction concepts in a production-ready payment system.

```java
abstract class Payment {
    protected String paymentId;
    protected double amount;
    protected String currency;
    protected String status;
    
    Payment(String paymentId, double amount, String currency) {
        this.paymentId = paymentId;
        this.amount = amount;
        this.currency = currency;
        this.status = "PENDING";
    }
    
    // Abstract methods - each payment type implements differently
    abstract boolean validatePayment();
    abstract boolean processPayment();
    abstract String getPaymentMethod();
    abstract double calculateProcessingFee();
    
    // Concrete method - common workflow
    boolean executePayment() {
        System.out.println("\n═══════════════════════════════════════");
        System.out.println("PROCESSING PAYMENT: " + this.paymentId);
        System.out.println("═══════════════════════════════════════");
        
        // Step 1: Validate
        System.out.println("Step 1: Validating payment...");
        if (!validatePayment()) {
            this.status = "FAILED";
            System.out.println("❌ Validation failed");
            return false;
        }
        System.out.println("✅ Validation successful");
        
        // Step 2: Calculate fee
        double fee = calculateProcessingFee();
        System.out.println("Step 2: Processing fee: $" + String.format("%.2f", fee));
        
        // Step 3: Process
        System.out.println("Step 3: Processing payment...");
        if (!processPayment()) {
            this.status = "FAILED";
            System.out.println("❌ Processing failed");
            return false;
        }
        
        this.status = "COMPLETED";
        System.out.println("✅ Payment completed successfully");
        System.out.println("═══════════════════════════════════════");
        return true;
    }
    
    void displayReceipt() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║         PAYMENT RECEIPT               ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Payment ID: " + this.paymentId);
        System.out.println("Method: " + getPaymentMethod());
        System.out.println("Amount: " + this.currency + " " + this.amount);
        System.out.println("Processing Fee: " + this.currency + " " + 
                         String.format("%.2f", calculateProcessingFee()));
        System.out.println("Total: " + this.currency + " " + 
                         String.format("%.2f", this.amount + calculateProcessingFee()));
        System.out.println("Status: " + this.status);
        System.out.println("════════════════════════════════════════");
    }
}

class CreditCardPayment extends Payment {
    private String cardNumber;
    private String cvv;
    private String expiryDate;
    
    CreditCardPayment(String paymentId, double amount, String currency,
                     String cardNumber, String cvv, String expiryDate) {
        super(paymentId, amount, currency);
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate;
    }
    
    @Override
    boolean validatePayment() {
        // Validate card number (simplified)
        if (cardNumber.length() != 16) {
            System.out.println("   Invalid card number length");
            return false;
        }
        
        // Validate CVV
        if (cvv.length() != 3) {
            System.out.println("   Invalid CVV");
            return false;
        }
        
        // Validate expiry (simplified)
        if (expiryDate.length() != 5) {
            System.out.println("   Invalid expiry date");
            return false;
        }
        
        return true;
    }
    
    @Override
    boolean processPayment() {
        System.out.println("   Contacting card issuer...");
        System.out.println("   Card ending in " + cardNumber.substring(12));
        System.out.println("   Authorization received");
        return true;
    }
    
    @Override
    String getPaymentMethod() {
        return "Credit Card";
    }
    
    @Override
    double calculateProcessingFee() {
        return amount * 0.029;  // 2.9%
    }
}

class BankTransferPayment extends Payment {
    private String accountNumber;
    private String routingNumber;
    private String bankName;
    
    BankTransferPayment(String paymentId, double amount, String currency,
                       String accountNumber, String routingNumber, String bankName) {
        super(paymentId, amount, currency);
        this.accountNumber = accountNumber;
        this.routingNumber = routingNumber;
        this.bankName = bankName;
    }
    
    @Override
    boolean validatePayment() {
        if (accountNumber.length() < 8) {
            System.out.println("   Invalid account number");
            return false;
        }
        
        if (routingNumber.length() != 9) {
            System.out.println("   Invalid routing number");
            return false;
        }
        
        return true;
    }
    
    @Override
    boolean processPayment() {
        System.out.println("   Initiating bank transfer...");
        System.out.println("   Bank: " + bankName);
        System.out.println("   Account: ****" + accountNumber.substring(accountNumber.length() - 4));
        System.out.println("   Transfer initiated");
        return true;
    }
    
    @Override
    String getPaymentMethod() {
        return "Bank Transfer";
    }
    
    @Override
    double calculateProcessingFee() {
        return 5.00;  // Flat fee
    }
}

class DigitalWalletPayment extends Payment {
    private String walletId;
    private String walletProvider;
    
    DigitalWalletPayment(String paymentId, double amount, String currency,
                        String walletId, String walletProvider) {
        super(paymentId, amount, currency);
        this.walletId = walletId;
        this.walletProvider = walletProvider;
    }
    
    @Override
    boolean validatePayment() {
        if (walletId == null || walletId.isEmpty()) {
            System.out.println("   Invalid wallet ID");
            return false;
        }
        return true;
    }
    
    @Override
    boolean processPayment() {
        System.out.println("   Connecting to " + walletProvider + "...");
        System.out.println("   Wallet ID: " + walletId);
        System.out.println("   Payment authorized");
        return true;
    }
    
    @Override
    String getPaymentMethod() {
        return "Digital Wallet (" + walletProvider + ")";
    }
    
    @Override
    double calculateProcessingFee() {
        return amount * 0.015;  // 1.5%
    }
}

class CryptocurrencyPayment extends Payment {
    private String walletAddress;
    private String cryptoType;
    
    CryptocurrencyPayment(String paymentId, double amount, String currency,
                         String walletAddress, String cryptoType) {
        super(paymentId, amount, currency);
        this.walletAddress = walletAddress;
        this.cryptoType = cryptoType;
    }
    
    @Override
    boolean validatePayment() {
        if (walletAddress.length() < 26) {
            System.out.println("   Invalid wallet address");
            return false;
        }
        return true;
    }
    
    @Override
    boolean processPayment() {
        System.out.println("   Broadcasting " + cryptoType + " transaction...");
        System.out.println("   Wallet: " + walletAddress.substring(0, 10) + "...");
        System.out.println("   Transaction confirmed");
        return true;
    }
    
    @Override
    String getPaymentMethod() {
        return "Cryptocurrency (" + cryptoType + ")";
    }
    
    @Override
    double calculateProcessingFee() {
        return amount * 0.01;  // 1%
    }
}

public class PaymentSystemDemo {
    static void generateReport(Payment[] payments) {
        System.out.println("\n╔════════════════════════════════════════════════╗");
        System.out.println("║         PAYMENT PROCESSING REPORT             ║");
        System.out.println("╚════════════════════════════════════════════════╝");
        
        int successful = 0;
        int failed = 0;
        double totalAmount = 0;
        double totalFees = 0;
        
        for (Payment payment : payments) {
            if (payment.status.equals("COMPLETED")) {
                successful++;
                totalAmount += payment.amount;
                totalFees += payment.calculateProcessingFee();
            } else {
                failed++;
            }
        }
        
        System.out.println("Total Payments: " + payments.length);
        System.out.println("Successful: " + successful);
        System.out.println("Failed: " + failed);
        System.out.println("Total Amount: $" + String.format("%.2f", totalAmount));
        System.out.println("Total Fees: $" + String.format("%.2f", totalFees));
        System.out.println("Net Amount: $" + String.format("%.2f", totalAmount - totalFees));
        System.out.println("════════════════════════════════════════════════");
    }
    
    public static void main(String[] args) {
        System.out.println("===== PAYMENT PROCESSING SYSTEM =====\n");
        
        // Create different payment types
        System.out.println("--- Creating Payments ---");
        Payment payment1 = new CreditCardPayment("PAY001", 150.00, "USD",
                                                 "1234567890123456", "123", "12/25");
        Payment payment2 = new BankTransferPayment("PAY002", 500.00, "USD",
                                                   "987654321", "123456789", "Chase Bank");
        Payment payment3 = new DigitalWalletPayment("PAY003", 75.00, "USD",
                                                    "wallet@example.com", "PayPal");
        Payment payment4 = new CryptocurrencyPayment("PAY004", 1000.00, "USD",
                                                     "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P", "Bitcoin");
        
        System.out.println("✅ All payments created");
        
        // Process payments
        System.out.println("\n--- Processing Payments ---");
        payment1.executePayment();
        payment2.executePayment();
        payment3.executePayment();
        payment4.executePayment();
        
        // Display receipts
        System.out.println("\n--- Payment Receipts ---");
        payment1.displayReceipt();
        payment2.displayReceipt();
        payment3.displayReceipt();
        payment4.displayReceipt();
        
        // Generate report
        Payment[] payments = {payment1, payment2, payment3, payment4};
        generateReport(payments);
        
        System.out.println("\n💡 Abstraction Benefits in This System:");
        System.out.println("   ✅ Common payment workflow (executePayment)");
        System.out.println("   ✅ Each method has own validation logic");
        System.out.println("   ✅ Each method has own processing logic");
        System.out.println("   ✅ Each method has own fee structure");
        System.out.println("   ✅ Easy to add new payment methods");
        System.out.println("   ✅ Consistent interface for all payments");
        
        System.out.println("\n=====================================");
    }
}
```

**Expected Output:**
```
===== PAYMENT PROCESSING SYSTEM =====

--- Creating Payments ---
✅ All payments created

--- Processing Payments ---

═══════════════════════════════════════
PROCESSING PAYMENT: PAY001
═══════════════════════════════════════
Step 1: Validating payment...
✅ Validation successful
Step 2: Processing fee: $4.35
Step 3: Processing payment...
   Contacting card issuer...
   Card ending in 3456
   Authorization received
✅ Payment completed successfully
═══════════════════════════════════════

[... similar for other payments ...]

--- Payment Receipts ---

╔════════════════════════════════════════╗
║         PAYMENT RECEIPT               ║
╚════════════════════════════════════════╝
Payment ID: PAY001
Method: Credit Card
Amount: USD 150.0
Processing Fee: USD 4.35
Total: USD 154.35
Status: COMPLETED
════════════════════════════════════════

[... receipts for other payments ...]

╔════════════════════════════════════════════════╗
║         PAYMENT PROCESSING REPORT             ║
╚════════════════════════════════════════════════╝
Total Payments: 4
Successful: 4
Failed: 0
Total Amount: $1725.00
Total Fees: $24.48
Net Amount: $1700.52
════════════════════════════════════════════════

💡 Abstraction Benefits in This System:
   ✅ Common payment workflow (executePayment)
   ✅ Each method has own validation logic
   ✅ Each method has own processing logic
   ✅ Each method has own fee structure
   ✅ Easy to add new payment methods
   ✅ Consistent interface for all payments

=====================================
```

**💡 Key Concepts:**

| Concept | Application |
|---------|-------------|
| **Abstract Workflow** | Common payment processing steps |
| **Polymorphism** | Different payment methods, same interface |
| **Extensibility** | Easy to add new payment types |
| **Maintainability** | Changes isolated to specific classes |

**✅ Success Criteria:**
- [ ] Understand complete abstract system design
- [ ] Can implement abstract workflows
- [ ] See real-world abstraction benefits
- [ ] Can add new implementations easily
- [ ] Ready to design similar systems

**🎯 Challenge:**
1. Add a `RefundPayment` abstract class
2. Implement refund for each payment type
3. Add payment status tracking
4. Create fraud detection system
5. Add multi-currency support

---

### 🎓 Day 16 Summary: Abstraction

**What You Learned:**
1. ✅ Abstract classes and methods
2. ✅ Abstract method implementation
3. ✅ Constructors and fields in abstract classes
4. ✅ When to use abstract classes
5. ✅ Abstract class hierarchies
6. ✅ Real-world abstract systems

**Key Takeaways:**
- Abstract classes cannot be instantiated
- Abstract methods have no implementation
- Concrete subclasses must implement abstract methods
- Abstract classes can have constructors and fields
- Use for "is-a" relationships with shared code
- Provides template for subclasses

**Abstraction Checklist:**
```
✅ Identify common behavior
✅ Create abstract base class
✅ Define abstract methods (what to do)
✅ Add concrete methods (shared code)
✅ Create concrete subclasses
✅ Implement all abstract methods
✅ Test polymorphic behavior
```

**Abstract Class vs Interface:**
```
ABSTRACT CLASS:
- Can have constructors
- Can have fields (any access)
- Can have concrete methods
- Single inheritance
- Use when: sharing code + forcing implementation

INTERFACE (Day 17):
- No constructors
- Only constants (public static final)
- All methods abstract (Java 7)
- Multiple inheritance
- Use when: defining contract only
```

**Next Steps:**
- Day 17: Interfaces (pure abstraction, multiple inheritance)
- Day 18: Exception Handling
- Day 19: Collections Framework

---

## Day 17: Interfaces (2 hours)

**Learning Objectives:**
- Understand interface concept
- Learn to define and implement interfaces
- Master multiple interface implementation
- Understand interface vs abstract class
- Use interfaces for loose coupling
- Build flexible, maintainable systems

---

#### Exercise 1: Introduction to Interfaces (20 minutes)

**What you'll learn:** Understanding interfaces and basic implementation

**Create interface: `Drawable` and implementing classes**

**Concept:** **Interface** = A contract that defines what a class must do, but not how. All methods are abstract (in Java 7). Use `interface` keyword to define and `implements` to use.

```java
// INTERFACE - Defines contract (what to do)
interface Drawable {
    // All methods are public and abstract by default
    void draw();
    void erase();
    String getColor();
}

// CLASS implementing interface - Must implement all methods
class Circle implements Drawable {
    private double radius;
    private String color;
    
    Circle(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }
    
    // MUST implement all interface methods
    @Override
    public void draw() {
        System.out.println("🔵 Drawing a " + color + " circle with radius " + radius);
    }
    
    @Override
    public void erase() {
        System.out.println("⚪ Erasing the circle");
    }
    
    @Override
    public String getColor() {
        return this.color;
    }
    
    // Can have additional methods
    double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Drawable {
    private double length;
    private double width;
    private String color;
    
    Rectangle(double length, double width, String color) {
        this.length = length;
        this.width = width;
        this.color = color;
    }
    
    @Override
    public void draw() {
        System.out.println("🟦 Drawing a " + color + " rectangle " + length + " × " + width);
    }
    
    @Override
    public void erase() {
        System.out.println("⬜ Erasing the rectangle");
    }
    
    @Override
    public String getColor() {
        return this.color;
    }
    
    double getArea() {
        return length * width;
    }
}

class Triangle implements Drawable {
    private double base;
    private double height;
    private String color;
    
    Triangle(double base, double height, String color) {
        this.base = base;
        this.height = height;
        this.color = color;
    }
    
    @Override
    public void draw() {
        System.out.println("🔺 Drawing a " + color + " triangle (base: " + base + 
                         ", height: " + height + ")");
    }
    
    @Override
    public void erase() {
        System.out.println("⬜ Erasing the triangle");
    }
    
    @Override
    public String getColor() {
        return this.color;
    }
    
    double getArea() {
        return 0.5 * base * height;
    }
}

public class InterfaceIntro {
    // Method that works with any Drawable
    static void renderShape(Drawable shape) {
        System.out.println("\n--- Rendering Shape ---");
        System.out.println("Color: " + shape.getColor());
        shape.draw();
    }
    
    static void clearCanvas(Drawable[] shapes) {
        System.out.println("\n--- Clearing Canvas ---");
        for (Drawable shape : shapes) {
            shape.erase();
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== INTERFACES =====\n");
        
        // Cannot instantiate interface
        // Drawable drawable = new Drawable();  // ❌ ERROR!
        
        // Create objects that implement interface
        System.out.println("--- Creating Shapes ---");
        Drawable circle = new Circle(5.0, "Red");
        Drawable rectangle = new Rectangle(10.0, 5.0, "Blue");
        Drawable triangle = new Triangle(6.0, 4.0, "Green");
        
        System.out.println("✅ All shapes created");
        
        // Use interface reference
        System.out.println("\n--- Drawing Shapes ---");
        circle.draw();
        rectangle.draw();
        triangle.draw();
        
        // Polymorphism with interface
        System.out.println("\n--- Polymorphic Rendering ---");
        renderShape(circle);
        renderShape(rectangle);
        renderShape(triangle);
        
        // Array of interface type
        Drawable[] shapes = {circle, rectangle, triangle};
        
        // Process all shapes uniformly
        System.out.println("\n--- Processing All Shapes ---");
        for (Drawable shape : shapes) {
            System.out.println("Shape color: " + shape.getColor());
            shape.draw();
        }
        
        // Clear canvas
        clearCanvas(shapes);
        
        System.out.println("\n💡 Key Points:");
        System.out.println("   ✅ Interface defines contract (what to do)");
        System.out.println("   ✅ Classes implement interface (how to do)");
        System.out.println("   ✅ All methods are public and abstract");
        System.out.println("   ✅ Class must implement ALL methods");
        System.out.println("   ✅ Can use interface as reference type");
        System.out.println("   ✅ Enables polymorphism");
        
        System.out.println("\n💡 Interface Syntax:");
        System.out.println("   interface InterfaceName {");
        System.out.println("       returnType methodName();");
        System.out.println("   }");
        System.out.println("   ");
        System.out.println("   class ClassName implements InterfaceName {");
        System.out.println("       @Override");
        System.out.println("       public returnType methodName() {");
        System.out.println("           // implementation");
        System.out.println("       }");
        System.out.println("   }");
        
        System.out.println("\n======================");
    }
}
```

**Expected Output:**
```
===== INTERFACES =====

--- Creating Shapes ---
✅ All shapes created

--- Drawing Shapes ---
🔵 Drawing a Red circle with radius 5.0
🟦 Drawing a Blue rectangle 10.0 × 5.0
🔺 Drawing a Green triangle (base: 6.0, height: 4.0)

--- Polymorphic Rendering ---

--- Rendering Shape ---
Color: Red
🔵 Drawing a Red circle with radius 5.0

--- Rendering Shape ---
Color: Blue
🟦 Drawing a Blue rectangle 10.0 × 5.0

--- Rendering Shape ---
Color: Green
🔺 Drawing a Green triangle (base: 6.0, height: 4.0)

--- Processing All Shapes ---
Shape color: Red
🔵 Drawing a Red circle with radius 5.0
Shape color: Blue
🟦 Drawing a Blue rectangle 10.0 × 5.0
Shape color: Green
🔺 Drawing a Green triangle (base: 6.0, height: 4.0)

--- Clearing Canvas ---
⚪ Erasing the circle
⬜ Erasing the rectangle
⬜ Erasing the triangle

💡 Key Points:
   ✅ Interface defines contract (what to do)
   ✅ Classes implement interface (how to do)
   ✅ All methods are public and abstract
   ✅ Class must implement ALL methods
   ✅ Can use interface as reference type
   ✅ Enables polymorphism

💡 Interface Syntax:
   interface InterfaceName {
       returnType methodName();
   }
   
   class ClassName implements InterfaceName {
       @Override
       public returnType methodName() {
           // implementation
       }
   }

======================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Interface** | Contract defining what class must do |
| **implements** | Keyword to implement interface |
| **Must Override** | All interface methods must be implemented |
| **Public** | All interface methods are public |

**Interface Rules:**
```java
// Interface definition
interface MyInterface {
    // All methods are public abstract (implicit)
    void method1();
    int method2();
    
    // Can have constants (public static final)
    int CONSTANT = 100;
}

// Implementing class
class MyClass implements MyInterface {
    // MUST implement all methods
    @Override
    public void method1() {
        // implementation
    }
    
    @Override
    public int method2() {
        return 0;
    }
}
```

**Interface vs Abstract Class:**
```
INTERFACE:
- Cannot have constructors
- Cannot have instance fields
- All methods abstract (Java 7)
- Multiple inheritance ✅
- Pure contract

ABSTRACT CLASS:
- Can have constructors
- Can have instance fields
- Can have concrete methods
- Single inheritance only
- Can share code
```

**✅ Success Criteria:**
- [ ] Understand interface concept
- [ ] Can define interfaces
- [ ] Can implement interfaces
- [ ] Know all methods must be implemented
- [ ] See polymorphism with interfaces

**🎯 Challenge:**
1. Create a `Resizable` interface
2. Add methods `resize()` and `getSize()`
3. Implement in Circle and Rectangle
4. Test resizing functionality

---

#### Exercise 2: Multiple Interface Implementation (25 minutes)

**What you'll learn:** Implementing multiple interfaces in a single class

**Create interfaces: `Flyable`, `Swimmable` and implementing classes**

**Concept:** Unlike classes (single inheritance), a class can implement multiple interfaces. This provides great flexibility.

```java
// INTERFACE 1
interface Flyable {
    void fly();
    double getAltitude();
    void land();
}

// INTERFACE 2
interface Swimmable {
    void swim();
    double getDepth();
    void surface();
}

// INTERFACE 3
interface Walkable {
    void walk();
    double getSpeed();
}

// Class implementing ONE interface
class Airplane implements Flyable {
    private String model;
    private double altitude;
    
    Airplane(String model) {
        this.model = model;
        this.altitude = 0;
    }
    
    @Override
    public void fly() {
        this.altitude = 10000;
        System.out.println("✈️  " + model + " is flying at " + altitude + " feet");
    }
    
    @Override
    public double getAltitude() {
        return this.altitude;
    }
    
    @Override
    public void land() {
        this.altitude = 0;
        System.out.println("✈️  " + model + " has landed");
    }
}

// Class implementing TWO interfaces
class Duck implements Flyable, Swimmable, Walkable {
    private String name;
    private double altitude;
    private double depth;
    private double speed;
    
    Duck(String name) {
        this.name = name;
        this.altitude = 0;
        this.depth = 0;
        this.speed = 0;
    }
    
    // Implement Flyable methods
    @Override
    public void fly() {
        this.altitude = 100;
        System.out.println("🦆 " + name + " is flying at " + altitude + " feet");
    }
    
    @Override
    public double getAltitude() {
        return this.altitude;
    }
    
    @Override
    public void land() {
        this.altitude = 0;
        System.out.println("🦆 " + name + " has landed");
    }
    
    // Implement Swimmable methods
    @Override
    public void swim() {
        this.depth = 5;
        System.out.println("🦆 " + name + " is swimming at " + depth + " feet deep");
    }
    
    @Override
    public double getDepth() {
        return this.depth;
    }
    
    @Override
    public void surface() {
        this.depth = 0;
        System.out.println("🦆 " + name + " surfaced");
    }
    
    // Implement Walkable methods
    @Override
    public void walk() {
        this.speed = 2;
        System.out.println("🦆 " + name + " is walking at " + speed + " mph");
    }
    
    @Override
    public double getSpeed() {
        return this.speed;
    }
    
    void quack() {
        System.out.println("🦆 " + name + " says: Quack! Quack!");
    }
}

// Class implementing TWO interfaces
class Submarine implements Swimmable, Walkable {
    private String name;
    private double depth;
    private double speed;
    
    Submarine(String name) {
        this.name = name;
        this.depth = 0;
        this.speed = 0;
    }
    
    @Override
    public void swim() {
        this.depth = 500;
        System.out.println("🚢 " + name + " is submerged at " + depth + " feet");
    }
    
    @Override
    public double getDepth() {
        return this.depth;
    }
    
    @Override
    public void surface() {
        this.depth = 0;
        System.out.println("🚢 " + name + " has surfaced");
    }
    
    @Override
    public void walk() {
        this.speed = 1;
        System.out.println("🚢 " + name + " is moving on seafloor at " + speed + " mph");
    }
    
    @Override
    public double getSpeed() {
        return this.speed;
    }
}

class Fish implements Swimmable {
    private String species;
    private double depth;
    
    Fish(String species) {
        this.species = species;
        this.depth = 0;
    }
    
    @Override
    public void swim() {
        this.depth = 50;
        System.out.println("🐟 " + species + " is swimming at " + depth + " feet deep");
    }
    
    @Override
    public double getDepth() {
        return this.depth;
    }
    
    @Override
    public void surface() {
        this.depth = 0;
        System.out.println("🐟 " + species + " came to surface");
    }
}

public class MultipleInterfacesDemo {
    static void testFlying(Flyable flyer) {
        System.out.println("\n--- Testing Flying Ability ---");
        flyer.fly();
        System.out.println("Altitude: " + flyer.getAltitude() + " feet");
        flyer.land();
    }
    
    static void testSwimming(Swimmable swimmer) {
        System.out.println("\n--- Testing Swimming Ability ---");
        swimmer.swim();
        System.out.println("Depth: " + swimmer.getDepth() + " feet");
        swimmer.surface();
    }
    
    static void testWalking(Walkable walker) {
        System.out.println("\n--- Testing Walking Ability ---");
        walker.walk();
        System.out.println("Speed: " + walker.getSpeed() + " mph");
    }
    
    public static void main(String[] args) {
        System.out.println("===== MULTIPLE INTERFACES =====\n");
        
        // Create objects
        System.out.println("--- Creating Objects ---");
        Airplane plane = new Airplane("Boeing 747");
        Duck duck = new Duck("Donald");
        Submarine sub = new Submarine("USS Nautilus");
        Fish fish = new Fish("Salmon");
        
        System.out.println("✅ All objects created");
        
        // Test airplane (only flies)
        System.out.println("\n--- Airplane Capabilities ---");
        testFlying(plane);
        
        // Test duck (flies, swims, walks)
        System.out.println("\n--- Duck Capabilities ---");
        testFlying(duck);
        testSwimming(duck);
        testWalking(duck);
        duck.quack();
        
        // Test submarine (swims, walks)
        System.out.println("\n--- Submarine Capabilities ---");
        testSwimming(sub);
        testWalking(sub);
        
        // Test fish (only swims)
        System.out.println("\n--- Fish Capabilities ---");
        testSwimming(fish);
        
        // Polymorphic arrays
        System.out.println("\n--- Polymorphic Collections ---");
        
        Flyable[] flyers = {plane, duck};
        System.out.println("\nAll flyers:");
        for (Flyable flyer : flyers) {
            flyer.fly();
        }
        
        Swimmable[] swimmers = {duck, sub, fish};
        System.out.println("\nAll swimmers:");
        for (Swimmable swimmer : swimmers) {
            swimmer.swim();
        }
        
        Walkable[] walkers = {duck, sub};
        System.out.println("\nAll walkers:");
        for (Walkable walker : walkers) {
            walker.walk();
        }
        
        System.out.println("\n💡 Multiple Interface Benefits:");
        System.out.println("   ✅ Class can have multiple capabilities");
        System.out.println("   ✅ Mix and match interfaces as needed");
        System.out.println("   ✅ More flexible than single inheritance");
        System.out.println("   ✅ Duck can fly, swim, AND walk!");
        System.out.println("   ✅ Each interface represents one capability");
        
        System.out.println("\n💡 Syntax:");
        System.out.println("   class Duck implements Flyable, Swimmable, Walkable {");
        System.out.println("       // Must implement ALL methods from ALL interfaces");
        System.out.println("   }");
        
        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== MULTIPLE INTERFACES =====

--- Creating Objects ---
✅ All objects created

--- Airplane Capabilities ---

--- Testing Flying Ability ---
✈️  Boeing 747 is flying at 10000.0 feet
Altitude: 10000.0 feet
✈️  Boeing 747 has landed

--- Duck Capabilities ---

--- Testing Flying Ability ---
🦆 Donald is flying at 100.0 feet
Altitude: 100.0 feet
🦆 Donald has landed

--- Testing Swimming Ability ---
🦆 Donald is swimming at 5.0 feet deep
Depth: 5.0 feet
🦆 Donald surfaced

--- Testing Walking Ability ---
🦆 Donald is walking at 2.0 mph
Speed: 2.0 mph
🦆 Donald says: Quack! Quack!

[... continues for submarine and fish ...]

--- Polymorphic Collections ---

All flyers:
✈️  Boeing 747 is flying at 10000.0 feet
🦆 Donald is flying at 100.0 feet

All swimmers:
🦆 Donald is swimming at 5.0 feet deep
🚢 USS Nautilus is submerged at 500.0 feet
🐟 Salmon is swimming at 50.0 feet deep

All walkers:
🦆 Donald is walking at 2.0 mph
🚢 USS Nautilus is moving on seafloor at 1.0 mph

💡 Multiple Interface Benefits:
   ✅ Class can have multiple capabilities
   ✅ Mix and match interfaces as needed
   ✅ More flexible than single inheritance
   ✅ Duck can fly, swim, AND walk!
   ✅ Each interface represents one capability

💡 Syntax:
   class Duck implements Flyable, Swimmable, Walkable {
       // Must implement ALL methods from ALL interfaces
   }

===============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Multiple Interfaces** | Class can implement many interfaces |
| **Flexibility** | Mix capabilities as needed |
| **Separation of Concerns** | Each interface = one capability |
| **Polymorphism** | Use any interface as reference type |

**✅ Success Criteria:**
- [ ] Can implement multiple interfaces
- [ ] Understand capability-based design
- [ ] See flexibility benefits
- [ ] Can use polymorphism with each interface
- [ ] Know when to use multiple interfaces

**🎯 Challenge:**
1. Add a `Diveable` interface
2. Create a `Penguin` class (swims, walks, dives)
3. Add a `Boat` class with appropriate interfaces
4. Test all capabilities

---

#### Exercise 3: Interface Constants (20 minutes)

**What you'll learn:** Using constants in interfaces

**Create interface: `GameConstants` with game-related constants**

**Concept:** Interfaces can have constants (public static final by default). These are shared across all implementing classes.

```java
// Interface with constants
interface GameConstants {
    // All fields are public static final (implicit)
    int MAX_PLAYERS = 4;
    int MIN_PLAYERS = 2;
    int MAX_SCORE = 1000;
    int BONUS_POINTS = 100;
    String GAME_VERSION = "1.0.0";
    
    // Methods
    void startGame();
    void endGame();
    int getScore();
}

interface Playable {
    // Constants
    int MAX_LIVES = 3;
    int STARTING_LEVEL = 1;
    
    // Methods
    void play();
    void pause();
    void resume();
}

class VideoGame implements GameConstants, Playable {
    private String name;
    private int players;
    private int score;
    private int lives;
    private int level;
    private boolean isPlaying;
    
    VideoGame(String name, int players) {
        this.name = name;
        
        // Use interface constants
        if (players < MIN_PLAYERS) {
            this.players = MIN_PLAYERS;
            System.out.println("⚠️  Minimum " + MIN_PLAYERS + " players required");
        } else if (players > MAX_PLAYERS) {
            this.players = MAX_PLAYERS;
            System.out.println("⚠️  Maximum " + MAX_PLAYERS + " players allowed");
        } else {
            this.players = players;
        }
        
        this.score = 0;
        this.lives = MAX_LIVES;  // Use constant from Playable
        this.level = STARTING_LEVEL;  // Use constant from Playable
        this.isPlaying = false;
        
        System.out.println("✅ Game created: " + name);
        System.out.println("   Players: " + this.players);
        System.out.println("   Lives: " + this.lives);
        System.out.println("   Version: " + GAME_VERSION);
    }
    
    @Override
    public void startGame() {
        this.isPlaying = true;
        System.out.println("\n🎮 Starting " + name + "...");
        System.out.println("   Level: " + level);
        System.out.println("   Lives: " + lives);
        System.out.println("   Target Score: " + MAX_SCORE);
    }
    
    @Override
    public void endGame() {
        this.isPlaying = false;
        System.out.println("\n🏁 Game Over!");
        System.out.println("   Final Score: " + score);
        System.out.println("   Level Reached: " + level);
    }
    
    @Override
    public int getScore() {
        return this.score;
    }
    
    @Override
    public void play() {
        if (!isPlaying) {
            System.out.println("❌ Game not started");
            return;
        }
        System.out.println("🎮 Playing " + name + "...");
    }
    
    @Override
    public void pause() {
        if (isPlaying) {
            System.out.println("⏸️  Game paused");
        }
    }
    
    @Override
    public void resume() {
        if (isPlaying) {
            System.out.println("▶️  Game resumed");
        }
    }
    
    void addPoints(int points) {
        this.score += points;
        System.out.println("💰 +" + points + " points! Total: " + score);
        
        // Check for bonus
        if (score % BONUS_POINTS == 0 && score > 0) {
            System.out.println("🎉 Bonus milestone reached!");
        }
        
        // Check for max score
        if (score >= MAX_SCORE) {
            System.out.println("🏆 Maximum score reached!");
            endGame();
        }
    }
    
    void loseLife() {
        if (lives > 0) {
            lives--;
            System.out.println("💔 Lost a life! Remaining: " + lives);
            
            if (lives == 0) {
                System.out.println("☠️  No lives left!");
                endGame();
            }
        }
    }
    
    void levelUp() {
        level++;
        System.out.println("⬆️  Level up! Now at level " + level);
    }
    
    void displayStatus() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║       GAME STATUS                     ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("Game: " + name);
        System.out.println("Players: " + players + "/" + MAX_PLAYERS);
        System.out.println("Score: " + score + "/" + MAX_SCORE);
        System.out.println("Lives: " + lives + "/" + MAX_LIVES);
        System.out.println("Level: " + level);
        System.out.println("Status: " + (isPlaying ? "Playing" : "Stopped"));
        System.out.println("Version: " + GAME_VERSION);
        System.out.println("════════════════════════════════════════");
    }
}

public class InterfaceConstantsDemo {
    public static void main(String[] args) {
        System.out.println("===== INTERFACE CONSTANTS =====\n");
        
        // Access constants directly from interface
        System.out.println("--- Game Configuration ---");
        System.out.println("Max Players: " + GameConstants.MAX_PLAYERS);
        System.out.println("Min Players: " + GameConstants.MIN_PLAYERS);
        System.out.println("Max Score: " + GameConstants.MAX_SCORE);
        System.out.println("Max Lives: " + Playable.MAX_LIVES);
        System.out.println("Game Version: " + GameConstants.GAME_VERSION);
        
        // Create game
        System.out.println("\n--- Creating Games ---");
        VideoGame game1 = new VideoGame("Space Invaders", 2);
        VideoGame game2 = new VideoGame("Pac-Man", 1);  // Below minimum
        VideoGame game3 = new VideoGame("Mario Kart", 5);  // Above maximum
        
        // Play game1
        System.out.println("\n--- Playing Space Invaders ---");
        game1.displayStatus();
        game1.startGame();
        game1.play();
        
        game1.addPoints(50);
        game1.addPoints(50);  // Bonus at 100
        game1.addPoints(150);
        game1.levelUp();
        
        game1.pause();
        game1.resume();
        
        game1.loseLife();
        game1.addPoints(200);
        
        game1.displayStatus();
        
        // Try to modify constant (will cause error if uncommented)
        // GameConstants.MAX_PLAYERS = 10;  // ❌ ERROR! Cannot modify final
        
        System.out.println("\n💡 Interface Constants:");
        System.out.println("   ✅ All fields are public static final (implicit)");
        System.out.println("   ✅ Shared across all implementing classes");
        System.out.println("   ✅ Cannot be modified");
        System.out.println("   ✅ Accessed via interface name or class");
        System.out.println("   ✅ Good for configuration values");
        
        System.out.println("\n💡 Constant Declaration:");
        System.out.println("   interface MyInterface {");
        System.out.println("       int CONSTANT = 100;  // public static final");
        System.out.println("   }");
        System.out.println("   ");
        System.out.println("   Access: MyInterface.CONSTANT");
        
        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== INTERFACE CONSTANTS =====

--- Game Configuration ---
Max Players: 4
Min Players: 2
Max Score: 1000
Max Lives: 3
Game Version: 1.0.0

--- Creating Games ---
✅ Game created: Space Invaders
   Players: 2
   Lives: 3
   Version: 1.0.0
⚠️  Minimum 2 players required
✅ Game created: Pac-Man
   Players: 2
   Lives: 3
   Version: 1.0.0
⚠️  Maximum 4 players allowed
✅ Game created: Mario Kart
   Players: 4
   Lives: 3
   Version: 1.0.0

--- Playing Space Invaders ---

╔════════════════════════════════════════╗
║       GAME STATUS                     ║
╚════════════════════════════════════════╝
Game: Space Invaders
Players: 2/4
Score: 0/1000
Lives: 3/3
Level: 1
Status: Stopped
Version: 1.0.0
════════════════════════════════════════

🎮 Starting Space Invaders...
   Level: 1
   Lives: 3
   Target Score: 1000
🎮 Playing Space Invaders...
💰 +50 points! Total: 50
💰 +50 points! Total: 100
🎉 Bonus milestone reached!
💰 +150 points! Total: 250
⬆️  Level up! Now at level 2
⏸️  Game paused
▶️  Game resumed
💔 Lost a life! Remaining: 2
💰 +200 points! Total: 450

[... continues ...]

💡 Interface Constants:
   ✅ All fields are public static final (implicit)
   ✅ Shared across all implementing classes
   ✅ Cannot be modified
   ✅ Accessed via interface name or class
   ✅ Good for configuration values

💡 Constant Declaration:
   interface MyInterface {
       int CONSTANT = 100;  // public static final
   }
   
   Access: MyInterface.CONSTANT

===============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Constants** | public static final by default |
| **Shared** | All implementing classes share constants |
| **Immutable** | Cannot be changed |
| **Access** | Via interface name or implementing class |

**✅ Success Criteria:**
- [ ] Understand interface constants
- [ ] Know they're public static final
- [ ] Can use constants in implementing classes
- [ ] See benefits for configuration
- [ ] Know constants are immutable

**🎯 Challenge:**
1. Add more game constants (difficulty levels)
2. Create different game types using constants
3. Add validation using constants
4. Create a settings system

---

#### Exercise 4: Interface Inheritance (25 minutes)

**What you'll learn:** Interfaces can extend other interfaces

**Create interface hierarchy: `Vehicle` → `ElectricVehicle`**

**Concept:** Interfaces can extend other interfaces using `extends` keyword. A class implementing the child interface must implement all methods from both interfaces.

```java
// BASE INTERFACE
interface Vehicle {
    void start();
    void stop();
    double getSpeed();
    String getType();
}

// INTERFACE extending Vehicle
interface ElectricVehicle extends Vehicle {
    // Inherits all methods from Vehicle
    // Adds new methods
    void charge();
    double getBatteryLevel();
    double getRange();
}

// INTERFACE extending Vehicle
interface GasVehicle extends Vehicle {
    // Inherits all methods from Vehicle
    // Adds new methods
    void refuel();
    double getFuelLevel();
    double getMPG();
}

// Class implementing base interface
class Bicycle implements Vehicle {
    private double speed;
    
    Bicycle() {
        this.speed = 0;
    }
    
    @Override
    public void start() {
        System.out.println("🚴 Starting to pedal");
        this.speed = 15;
    }
    
    @Override
    public void stop() {
        System.out.println("🚴 Stopping bicycle");
        this.speed = 0;
    }
    
    @Override
    public double getSpeed() {
        return this.speed;
    }
    
    @Override
    public String getType() {
        return "Bicycle";
    }
}

// Class implementing extended interface
class ElectricCar implements ElectricVehicle {
    private double speed;
    private double batteryLevel;
    private double range;
    
    ElectricCar() {
        this.speed = 0;
        this.batteryLevel = 100;
        this.range = 300;
    }
    
    // Implement Vehicle methods
    @Override
    public void start() {
        if (batteryLevel > 0) {
            System.out.println("⚡ Electric car starting silently");
            this.speed = 60;
        } else {
            System.out.println("❌ Battery empty!");
        }
    }
    
    @Override
    public void stop() {
        System.out.println("⚡ Electric car stopping");
        this.speed = 0;
    }
    
    @Override
    public double getSpeed() {
        return this.speed;
    }
    
    @Override
    public String getType() {
        return "Electric Car";
    }
    
    // Implement ElectricVehicle methods
    @Override
    public void charge() {
        System.out.println("🔌 Charging battery...");
        this.batteryLevel = 100;
        System.out.println("✅ Battery fully charged!");
    }
    
    @Override
    public double getBatteryLevel() {
        return this.batteryLevel;
    }
    
    @Override
    public double getRange() {
        return this.range * (batteryLevel / 100);
    }
    
    void drive(double miles) {
        double batteryUsed = (miles / range) * 100;
        if (batteryUsed <= batteryLevel) {
            batteryLevel -= batteryUsed;
            System.out.println("🚗 Drove " + miles + " miles");
            System.out.println("   Battery: " + String.format("%.1f", batteryLevel) + "%");
        } else {
            System.out.println("❌ Not enough battery!");
        }
    }
}

// Class implementing extended interface
class GasCar implements GasVehicle {
    private double speed;
    private double fuelLevel;
    private double mpg;
    
    GasCar() {
        this.speed = 0;
        this.fuelLevel = 15;  // gallons
        this.mpg = 30;
    }
    
    // Implement Vehicle methods
    @Override
    public void start() {
        if (fuelLevel > 0) {
            System.out.println("🚗 Gas car engine starting");
            this.speed = 60;
        } else {
            System.out.println("❌ Out of gas!");
        }
    }
    
    @Override
    public void stop() {
        System.out.println("🚗 Gas car stopping");
        this.speed = 0;
    }
    
    @Override
    public double getSpeed() {
        return this.speed;
    }
    
    @Override
    public String getType() {
        return "Gas Car";
    }
    
    // Implement GasVehicle methods
    @Override
    public void refuel() {
        System.out.println("⛽ Refueling...");
        this.fuelLevel = 15;
        System.out.println("✅ Tank full!");
    }
    
    @Override
    public double getFuelLevel() {
        return this.fuelLevel;
    }
    
    @Override
    public double getMPG() {
        return this.mpg;
    }
    
    void drive(double miles) {
        double fuelNeeded = miles / mpg;
        if (fuelNeeded <= fuelLevel) {
            fuelLevel -= fuelNeeded;
            System.out.println("🚗 Drove " + miles + " miles");
            System.out.println("   Fuel: " + String.format("%.1f", fuelLevel) + " gallons");
        } else {
            System.out.println("❌ Not enough fuel!");
        }
    }
}

public class InterfaceInheritanceDemo {
    static void testVehicle(Vehicle vehicle) {
        System.out.println("\n--- Testing " + vehicle.getType() + " ---");
        vehicle.start();
        System.out.println("Speed: " + vehicle.getSpeed() + " mph");
        vehicle.stop();
    }
    
    static void testElectricVehicle(ElectricVehicle ev) {
        System.out.println("\n--- Testing Electric Vehicle ---");
        System.out.println("Battery: " + ev.getBatteryLevel() + "%");
        System.out.println("Range: " + ev.getRange() + " miles");
        ev.start();
        ev.charge();
    }
    
    static void testGasVehicle(GasVehicle gv) {
        System.out.println("\n--- Testing Gas Vehicle ---");
        System.out.println("Fuel: " + gv.getFuelLevel() + " gallons");
        System.out.println("MPG: " + gv.getMPG());
        gv.start();
        gv.refuel();
    }
    
    public static void main(String[] args) {
        System.out.println("===== INTERFACE INHERITANCE =====\n");
        
        // Create vehicles
        System.out.println("--- Creating Vehicles ---");
        Bicycle bike = new Bicycle();
        ElectricCar electricCar = new ElectricCar();
        GasCar gasCar = new GasCar();
        
        System.out.println("✅ All vehicles created");
        
        // Test as Vehicle (base interface)
        System.out.println("\n--- Testing as Vehicle Interface ---");
        testVehicle(bike);
        testVehicle(electricCar);
        testVehicle(gasCar);
        
        // Test electric-specific features
        testElectricVehicle(electricCar);
        electricCar.drive(50);
        electricCar.drive(100);
        
        // Test gas-specific features
        testGasVehicle(gasCar);
        gasCar.drive(60);
        gasCar.drive(150);
        
        // Polymorphic array of base interface
        System.out.println("\n--- All Vehicles ---");
        Vehicle[] vehicles = {bike, electricCar, gasCar};
        
        for (Vehicle v : vehicles) {
            System.out.println("\n" + v.getType() + ":");
            v.start();
            System.out.println("Speed: " + v.getSpeed() + " mph");
            v.stop();
        }
        
        System.out.println("\n💡 Interface Inheritance:");
        System.out.println("   ✅ Interfaces can extend other interfaces");
        System.out.println("   ✅ Child interface inherits all parent methods");
        System.out.println("   ✅ Implementing class must implement ALL methods");
        System.out.println("   ✅ Can extend multiple interfaces");
        System.out.println("   ✅ Creates hierarchy of contracts");
        
        System.out.println("\n💡 Hierarchy:");
        System.out.println("   Vehicle (base)");
        System.out.println("      ├── ElectricVehicle (extends Vehicle)");
        System.out.println("      └── GasVehicle (extends Vehicle)");
        System.out.println("   ");
        System.out.println("   ElectricCar implements ElectricVehicle");
        System.out.println("   → Must implement Vehicle + ElectricVehicle methods");
        
        System.out.println("\n=================================");
    }
}
```

**Expected Output:**
```
===== INTERFACE INHERITANCE =====

--- Creating Vehicles ---
✅ All vehicles created

--- Testing as Vehicle Interface ---

--- Testing Bicycle ---
🚴 Starting to pedal
Speed: 15.0 mph
🚴 Stopping bicycle

--- Testing Electric Car ---
⚡ Electric car starting silently
Speed: 60.0 mph
⚡ Electric car stopping

--- Testing Gas Car ---
🚗 Gas car engine starting
Speed: 60.0 mph
🚗 Gas car stopping

--- Testing Electric Vehicle ---
Battery: 100.0%
Range: 300.0 miles
⚡ Electric car starting silently
🔌 Charging battery...
✅ Battery fully charged!
🚗 Drove 50.0 miles
   Battery: 83.3%
🚗 Drove 100.0 miles
   Battery: 50.0%

--- Testing Gas Vehicle ---
Fuel: 15.0 gallons
MPG: 30.0
🚗 Gas car engine starting
⛽ Refueling...
✅ Tank full!
🚗 Drove 60.0 miles
   Fuel: 13.0 gallons
🚗 Drove 150.0 miles
   Fuel: 8.0 gallons

--- All Vehicles ---

Bicycle:
🚴 Starting to pedal
Speed: 15.0 mph
🚴 Stopping bicycle

Electric Car:
⚡ Electric car starting silently
Speed: 60.0 mph
⚡ Electric car stopping

Gas Car:
🚗 Gas car engine starting
Speed: 60.0 mph
🚗 Gas car stopping

💡 Interface Inheritance:
   ✅ Interfaces can extend other interfaces
   ✅ Child interface inherits all parent methods
   ✅ Implementing class must implement ALL methods
   ✅ Can extend multiple interfaces
   ✅ Creates hierarchy of contracts

💡 Hierarchy:
   Vehicle (base)
      ├── ElectricVehicle (extends Vehicle)
      └── GasVehicle (extends Vehicle)
   
   ElectricCar implements ElectricVehicle
   → Must implement Vehicle + ElectricVehicle methods

=================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Interface Extends** | Interface can extend another interface |
| **Method Inheritance** | Child inherits all parent methods |
| **Multiple Extends** | Interface can extend multiple interfaces |
| **Implementation** | Class must implement all methods from hierarchy |

**✅ Success Criteria:**
- [ ] Understand interface inheritance
- [ ] Can create interface hierarchies
- [ ] Know implementing class must implement all methods
- [ ] See benefits of interface hierarchies
- [ ] Can use polymorphism at any level

**🎯 Challenge:**
1. Add a `HybridVehicle` interface extending both
2. Create a `HybridCar` class
3. Add autonomous driving interface
4. Test all combinations

---

#### Exercise 5: Interfaces for Loose Coupling (20 minutes)

**What you'll learn:** Using interfaces to create loosely coupled, flexible code

**Create system with interfaces for dependency injection**

**Concept:** **Loose Coupling** = Classes depend on interfaces, not concrete implementations. This makes code flexible and easy to change.

```java
// INTERFACE for data storage
interface DataStorage {
    void save(String data);
    String load();
    void delete();
}

// INTERFACE for notification
interface Notifier {
    void sendNotification(String message);
}

// CONCRETE IMPLEMENTATION 1: File Storage
class FileStorage implements DataStorage {
    private String filename;
    private String data;
    
    FileStorage(String filename) {
        this.filename = filename;
        this.data = "";
    }
    
    @Override
    public void save(String data) {
        this.data = data;
        System.out.println("💾 Saved to file: " + filename);
        System.out.println("   Data: " + data);
    }
    
    @Override
    public String load() {
        System.out.println("📂 Loading from file: " + filename);
        return this.data;
    }
    
    @Override
    public void delete() {
        this.data = "";
        System.out.println("🗑️  Deleted file: " + filename);
    }
}

// CONCRETE IMPLEMENTATION 2: Database Storage
class DatabaseStorage implements DataStorage {
    private String tableName;
    private String data;
    
    DatabaseStorage(String tableName) {
        this.tableName = tableName;
        this.data = "";
    }
    
    @Override
    public void save(String data) {
        this.data = data;
        System.out.println("💾 Saved to database table: " + tableName);
        System.out.println("   Data: " + data);
    }
    
    @Override
    public String load() {
        System.out.println("📊 Loading from database: " + tableName);
        return this.data;
    }
    
    @Override
    public void delete() {
        this.data = "";
        System.out.println("🗑️  Deleted from database: " + tableName);
    }
}

// CONCRETE IMPLEMENTATION 3: Cloud Storage
class CloudStorage implements DataStorage {
    private String bucketName;
    private String data;
    
    CloudStorage(String bucketName) {
        this.bucketName = bucketName;
        this.data = "";
    }
    
    @Override
    public void save(String data) {
        this.data = data;
        System.out.println("☁️  Saved to cloud: " + bucketName);
        System.out.println("   Data: " + data);
    }
    
    @Override
    public String load() {
        System.out.println("☁️  Loading from cloud: " + bucketName);
        return this.data;
    }
    
    @Override
    public void delete() {
        this.data = "";
        System.out.println("🗑️  Deleted from cloud: " + bucketName);
    }
}

// CONCRETE IMPLEMENTATION 1: Email Notifier
class EmailNotifier implements Notifier {
    private String email;
    
    EmailNotifier(String email) {
        this.email = email;
    }
    
    @Override
    public void sendNotification(String message) {
        System.out.println("📧 Email sent to: " + email);
        System.out.println("   Message: " + message);
    }
}

// CONCRETE IMPLEMENTATION 2: SMS Notifier
class SMSNotifier implements Notifier {
    private String phoneNumber;
    
    SMSNotifier(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    @Override
    public void sendNotification(String message) {
        System.out.println("📱 SMS sent to: " + phoneNumber);
        System.out.println("   Message: " + message);
    }
}

// APPLICATION CLASS - Depends on interfaces, not implementations
class UserManager {
    private DataStorage storage;  // Interface, not concrete class
    private Notifier notifier;    // Interface, not concrete class
    
    // DEPENDENCY INJECTION through constructor
    UserManager(DataStorage storage, Notifier notifier) {
        this.storage = storage;
        this.notifier = notifier;
        System.out.println("✅ UserManager created");
        System.out.println("   Storage: " + storage.getClass().getSimpleName());
        System.out.println("   Notifier: " + notifier.getClass().getSimpleName());
    }
    
    void createUser(String username) {
        System.out.println("\n--- Creating User: " + username + " ---");
        
        // Use interface methods - don't care about implementation
        storage.save("User: " + username);
        notifier.sendNotification("Welcome " + username + "!");
        
        System.out.println("✅ User created successfully");
    }
    
    void deleteUser(String username) {
        System.out.println("\n--- Deleting User: " + username + " ---");
        
        storage.delete();
        notifier.sendNotification("Account deleted for " + username);
        
        System.out.println("✅ User deleted successfully");
    }
    
    void loadUser() {
        System.out.println("\n--- Loading User ---");
        String data = storage.load();
        System.out.println("Loaded: " + data);
    }
}

public class LooseCouplingDemo {
    public static void main(String[] args) {
        System.out.println("===== LOOSE COUPLING WITH INTERFACES =====\n");
        
        // SCENARIO 1: File storage + Email notifications
        System.out.println("--- Scenario 1: File + Email ---");
        DataStorage fileStorage = new FileStorage("users.txt");
        Notifier emailNotifier = new EmailNotifier("user@example.com");
        UserManager manager1 = new UserManager(fileStorage, emailNotifier);
        
        manager1.createUser("Alice");
        manager1.loadUser();
        
        // SCENARIO 2: Database storage + SMS notifications
        System.out.println("\n--- Scenario 2: Database + SMS ---");
        DataStorage dbStorage = new DatabaseStorage("users_table");
        Notifier smsNotifier = new SMSNotifier("+1234567890");
        UserManager manager2 = new UserManager(dbStorage, smsNotifier);
        
        manager2.createUser("Bob");
        manager2.loadUser();
        
        // SCENARIO 3: Cloud storage + Email notifications
        System.out.println("\n--- Scenario 3: Cloud + Email ---");
        DataStorage cloudStorage = new CloudStorage("user-bucket");
        Notifier emailNotifier2 = new EmailNotifier("admin@example.com");
        UserManager manager3 = new UserManager(cloudStorage, emailNotifier2);
        
        manager3.createUser("Charlie");
        manager3.deleteUser("Charlie");
        
        System.out.println("\n💡 Loose Coupling Benefits:");
        System.out.println("   ✅ UserManager doesn't know about concrete classes");
        System.out.println("   ✅ Easy to switch implementations");
        System.out.println("   ✅ Easy to test (use mock implementations)");
        System.out.println("   ✅ Easy to add new storage/notifier types");
        System.out.println("   ✅ Changes to implementations don't affect UserManager");
        
        System.out.println("\n💡 Tight Coupling (BAD):");
        System.out.println("   class UserManager {");
        System.out.println("       FileStorage storage = new FileStorage();");
        System.out.println("       EmailNotifier notifier = new EmailNotifier();");
        System.out.println("       // Hard to change, hard to test");
        System.out.println("   }");
        
        System.out.println("\n💡 Loose Coupling (GOOD):");
        System.out.println("   class UserManager {");
        System.out.println("       DataStorage storage;  // Interface");
        System.out.println("       Notifier notifier;    // Interface");
        System.out.println("       ");
        System.out.println("       UserManager(DataStorage s, Notifier n) {");
        System.out.println("           storage = s;  // Inject dependency");
        System.out.println("           notifier = n;");
        System.out.println("       }");
        System.out.println("   }");
        
        System.out.println("\n==========================================");
    }
}
```

**Expected Output:**
```
===== LOOSE COUPLING WITH INTERFACES =====

--- Scenario 1: File + Email ---
✅ UserManager created
   Storage: FileStorage
   Notifier: EmailNotifier

--- Creating User: Alice ---
💾 Saved to file: users.txt
   Data: User: Alice
📧 Email sent to: user@example.com
   Message: Welcome Alice!
✅ User created successfully

--- Loading User ---
📂 Loading from file: users.txt
Loaded: User: Alice

--- Scenario 2: Database + SMS ---
✅ UserManager created
   Storage: DatabaseStorage
   Notifier: SMSNotifier

--- Creating User: Bob ---
💾 Saved to database table: users_table
   Data: User: Bob
📱 SMS sent to: +1234567890
   Message: Welcome Bob!
✅ User created successfully

[... continues ...]

💡 Loose Coupling Benefits:
   ✅ UserManager doesn't know about concrete classes
   ✅ Easy to switch implementations
   ✅ Easy to test (use mock implementations)
   ✅ Easy to add new storage/notifier types
   ✅ Changes to implementations don't affect UserManager

💡 Tight Coupling (BAD):
   class UserManager {
       FileStorage storage = new FileStorage();
       EmailNotifier notifier = new EmailNotifier();
       // Hard to change, hard to test
   }

💡 Loose Coupling (GOOD):
   class UserManager {
       DataStorage storage;  // Interface
       Notifier notifier;    // Interface
       
       UserManager(DataStorage s, Notifier n) {
           storage = s;  // Inject dependency
           notifier = n;
       }
   }

==========================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Loose Coupling** | Classes depend on interfaces, not implementations |
| **Dependency Injection** | Pass dependencies through constructor |
| **Flexibility** | Easy to swap implementations |
| **Testability** | Easy to use mock objects for testing |

**✅ Success Criteria:**
- [ ] Understand loose coupling concept
- [ ] Can use interfaces for dependencies
- [ ] See benefits of dependency injection
- [ ] Know how to swap implementations
- [ ] Understand testability benefits

**🎯 Challenge:**
1. Add a `Logger` interface
2. Create different logger implementations
3. Add logging to UserManager
4. Create mock implementations for testing

---

#### Exercise 6: Real-World Application - Plugin System (30 minutes)

**What you'll learn:** Building an extensible plugin system using interfaces

**Create plugin architecture for a text editor**

**Concept:** Interfaces enable plugin architectures where new functionality can be added without modifying existing code.

```java
// PLUGIN INTERFACE
interface Plugin {
    String getName();
    String getVersion();
    void initialize();
    void execute(String input);
    void shutdown();
}

// PLUGIN 1: Spell Checker
class SpellCheckerPlugin implements Plugin {
    private boolean isInitialized;
    
    @Override
    public String getName() {
        return "Spell Checker";
    }
    
    @Override
    public String getVersion() {
        return "1.0.0";
    }
    
    @Override
    public void initialize() {
        System.out.println("📝 Initializing Spell Checker...");
        System.out.println("   Loading dictionary...");
        this.isInitialized = true;
        System.out.println("✅ Spell Checker ready");
    }
    
    @Override
    public void execute(String input) {
        if (!isInitialized) {
            System.out.println("❌ Plugin not initialized");
            return;
        }
        
        System.out.println("\n--- Spell Checking ---");
        System.out.println("Text: " + input);
        
        // Simplified spell checking
        String[] words = input.split(" ");
        int errors = 0;
        for (String word : words) {
            if (word.length() > 10) {  // Simplified check
                System.out.println("⚠️  Possible error: " + word);
                errors++;
            }
        }
        
        if (errors == 0) {
            System.out.println("✅ No spelling errors found");
        } else {
            System.out.println("Found " + errors + " possible errors");
        }
    }
    
    @Override
    public void shutdown() {
        System.out.println("📝 Shutting down Spell Checker");
        this.isInitialized = false;
    }
}

// PLUGIN 2: Word Counter
class WordCounterPlugin implements Plugin {
    private boolean isInitialized;
    
    @Override
    public String getName() {
        return "Word Counter";
    }
    
    @Override
    public String getVersion() {
        return "2.0.0";
    }
    
    @Override
    public void initialize() {
        System.out.println("🔢 Initializing Word Counter...");
        this.isInitialized = true;
        System.out.println("✅ Word Counter ready");
    }
    
    @Override
    public void execute(String input) {
        if (!isInitialized) {
            System.out.println("❌ Plugin not initialized");
            return;
        }
        
        System.out.println("\n--- Word Count Analysis ---");
        System.out.println("Text: " + input);
        
        String[] words = input.split("\\s+");
        int wordCount = words.length;
        int charCount = input.length();
        int charNoSpaces = input.replace(" ", "").length();
        
        System.out.println("╔════════════════════════════════╗");
        System.out.println("║      STATISTICS               ║");
        System.out.println("╚════════════════════════════════╝");
        System.out.println("Words: " + wordCount);
        System.out.println("Characters (with spaces): " + charCount);
        System.out.println("Characters (no spaces): " + charNoSpaces);
        System.out.println("════════════════════════════════");
    }
    
    @Override
    public void shutdown() {
        System.out.println("🔢 Shutting down Word Counter");
        this.isInitialized = false;
    }
}

// PLUGIN 3: Text Formatter
class FormatterPlugin implements Plugin {
    private boolean isInitialized;
    
    @Override
    public String getName() {
        return "Text Formatter";
    }
    
    @Override
    public String getVersion() {
        return "1.5.0";
    }
    
    @Override
    public void initialize() {
        System.out.println("✨ Initializing Text Formatter...");
        this.isInitialized = true;
        System.out.println("✅ Text Formatter ready");
    }
    
    @Override
    public void execute(String input) {
        if (!isInitialized) {
            System.out.println("❌ Plugin not initialized");
            return;
        }
        
        System.out.println("\n--- Text Formatting ---");
        System.out.println("Original: " + input);
        System.out.println("\nFormatted versions:");
        System.out.println("UPPERCASE: " + input.toUpperCase());
        System.out.println("lowercase: " + input.toLowerCase());
        System.out.println("Title Case: " + toTitleCase(input));
    }
    
    private String toTitleCase(String input) {
        String[] words = input.split(" ");
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            if (word.length() > 0) {
                result.append(Character.toUpperCase(word.charAt(0)));
                if (word.length() > 1) {
                    result.append(word.substring(1).toLowerCase());
                }
                result.append(" ");
            }
        }
        return result.toString().trim();
    }
    
    @Override
    public void shutdown() {
        System.out.println("✨ Shutting down Text Formatter");
        this.isInitialized = false;
    }
}

// PLUGIN 4: Auto-Save
class AutoSavePlugin implements Plugin {
    private boolean isInitialized;
    private int saveCount;
    
    @Override
    public String getName() {
        return "Auto-Save";
    }
    
    @Override
    public String getVersion() {
        return "3.0.0";
    }
    
    @Override
    public void initialize() {
        System.out.println("💾 Initializing Auto-Save...");
        this.saveCount = 0;
        this.isInitialized = true;
        System.out.println("✅ Auto-Save ready");
    }
    
    @Override
    public void execute(String input) {
        if (!isInitialized) {
            System.out.println("❌ Plugin not initialized");
            return;
        }
        
        saveCount++;
        System.out.println("\n--- Auto-Saving ---");
        System.out.println("💾 Saving document...");
        System.out.println("   Length: " + input.length() + " characters");
        System.out.println("   Save #" + saveCount);
        System.out.println("✅ Document saved successfully");
    }
    
    @Override
    public void shutdown() {
        System.out.println("💾 Shutting down Auto-Save");
        System.out.println("   Total saves: " + saveCount);
        this.isInitialized = false;
    }
}

// TEXT EDITOR - Plugin Manager
class TextEditor {
    private Plugin[] plugins;
    private int pluginCount;
    
    TextEditor(int maxPlugins) {
        this.plugins = new Plugin[maxPlugins];
        this.pluginCount = 0;
    }
    
    void installPlugin(Plugin plugin) {
        if (pluginCount < plugins.length) {
            plugins[pluginCount++] = plugin;
            System.out.println("🔌 Installing plugin: " + plugin.getName() + 
                             " v" + plugin.getVersion());
            plugin.initialize();
        } else {
            System.out.println("❌ Maximum plugins reached");
        }
    }
    
    void listPlugins() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║      INSTALLED PLUGINS                ║");
        System.out.println("╚════════════════════════════════════════╝");
        
        if (pluginCount == 0) {
            System.out.println("No plugins installed");
        } else {
            for (int i = 0; i < pluginCount; i++) {
                System.out.println((i + 1) + ". " + plugins[i].getName() + 
                                 " v" + plugins[i].getVersion());
            }
        }
        System.out.println("════════════════════════════════════════");
    }
    
    void processText(String text) {
        System.out.println("\n═══════════════════════════════════════");
        System.out.println("PROCESSING TEXT WITH ALL PLUGINS");
        System.out.println("═══════════════════════════════════════");
        
        for (int i = 0; i < pluginCount; i++) {
            plugins[i].execute(text);
        }
    }
    
    void shutdown() {
        System.out.println("\n--- Shutting Down Editor ---");
        for (int i = 0; i < pluginCount; i++) {
            plugins[i].shutdown();
        }
        System.out.println("✅ Editor closed");
    }
}

public class PluginSystemDemo {
    public static void main(String[] args) {
        System.out.println("===== PLUGIN SYSTEM =====\n");
        
        // Create text editor
        System.out.println("--- Starting Text Editor ---");
        TextEditor editor = new TextEditor(10);
        
        // Install plugins
        System.out.println("\n--- Installing Plugins ---");
        editor.installPlugin(new SpellCheckerPlugin());
        editor.installPlugin(new WordCounterPlugin());
        editor.installPlugin(new FormatterPlugin());
        editor.installPlugin(new AutoSavePlugin());
        
        // List installed plugins
        editor.listPlugins();
        
        // Process text with all plugins
        String text = "Hello world this is a demonstration of the plugin system";
        editor.processText(text);
        
        // Process another text
        String text2 = "INTERFACES enable EXTENSIBILITY and FLEXIBILITY";
        editor.processText(text2);
        
        // Shutdown
        editor.shutdown();
        
        System.out.println("\n💡 Plugin System Benefits:");
        System.out.println("   ✅ Add new plugins without modifying editor");
        System.out.println("   ✅ Plugins are independent and reusable");
        System.out.println("   ✅ Easy to enable/disable plugins");
        System.out.println("   ✅ Third parties can create plugins");
        System.out.println("   ✅ Follows Open/Closed Principle");
        
        System.out.println("\n💡 Interface as Contract:");
        System.out.println("   Editor knows: Plugin interface");
        System.out.println("   Editor doesn't know: Plugin implementations");
        System.out.println("   Result: Flexible, extensible system");
        
        System.out.println("\n=========================");
    }
}
```

**Expected Output:**
```
===== PLUGIN SYSTEM =====

--- Starting Text Editor ---

--- Installing Plugins ---
🔌 Installing plugin: Spell Checker v1.0.0
📝 Initializing Spell Checker...
   Loading dictionary...
✅ Spell Checker ready
🔌 Installing plugin: Word Counter v2.0.0
🔢 Initializing Word Counter...
✅ Word Counter ready
🔌 Installing plugin: Text Formatter v1.5.0
✨ Initializing Text Formatter...
✅ Text Formatter ready
🔌 Installing plugin: Auto-Save v3.0.0
💾 Initializing Auto-Save...
✅ Auto-Save ready

╔════════════════════════════════════════╗
║      INSTALLED PLUGINS                ║
╚════════════════════════════════════════╝
1. Spell Checker v1.0.0
2. Word Counter v2.0.0
3. Text Formatter v1.5.0
4. Auto-Save v3.0.0
════════════════════════════════════════

═══════════════════════════════════════
PROCESSING TEXT WITH ALL PLUGINS
═══════════════════════════════════════

--- Spell Checking ---
Text: Hello world this is a demonstration of the plugin system
⚠️  Possible error: demonstration
Found 1 possible errors

--- Word Count Analysis ---
Text: Hello world this is a demonstration of the plugin system
╔════════════════════════════════╗
║      STATISTICS               ║
╚════════════════════════════════╝
Words: 10
Characters (with spaces): 58
Characters (no spaces): 49
════════════════════════════════

[... continues with all plugins ...]

--- Shutting Down Editor ---
📝 Shutting down Spell Checker
🔢 Shutting down Word Counter
✨ Shutting down Text Formatter
💾 Shutting down Auto-Save
   Total saves: 2
✅ Editor closed

💡 Plugin System Benefits:
   ✅ Add new plugins without modifying editor
   ✅ Plugins are independent and reusable
   ✅ Easy to enable/disable plugins
   ✅ Third parties can create plugins
   ✅ Follows Open/Closed Principle

💡 Interface as Contract:
   Editor knows: Plugin interface
   Editor doesn't know: Plugin implementations
   Result: Flexible, extensible system

=========================
```

**💡 Key Concepts:**

| Concept | Application |
|---------|-------------|
| **Plugin Interface** | Contract all plugins must follow |
| **Extensibility** | Add plugins without changing editor |
| **Independence** | Plugins don't know about each other |
| **Flexibility** | Easy to add/remove plugins |

**✅ Success Criteria:**
- [ ] Understand plugin architecture
- [ ] Can create extensible systems
- [ ] See interface benefits for plugins
- [ ] Know Open/Closed Principle
- [ ] Ready to build similar systems

**🎯 Challenge:**
1. Add plugin priority/ordering
2. Create plugin dependencies
3. Add plugin configuration
4. Implement plugin marketplace
5. Add plugin enable/disable feature

---

### 🎓 Day 17 Summary: Interfaces

**What You Learned:**
1. ✅ Interface basics and implementation
2. ✅ Multiple interface implementation
3. ✅ Interface constants
4. ✅ Interface inheritance
5. ✅ Loose coupling with interfaces
6. ✅ Plugin systems and extensibility

**Key Takeaways:**
- Interfaces define contracts (what to do)
- Classes implement interfaces (how to do)
- Can implement multiple interfaces
- All methods public and abstract (Java 7)
- Enables loose coupling and flexibility
- Perfect for plugin architectures

**Interface Checklist:**
```
✅ Define interface with methods
✅ Implement all methods in class
✅ Use interface as reference type
✅ Leverage polymorphism
✅ Design for loose coupling
✅ Enable extensibility
✅ Follow interface segregation
```

**Interface vs Abstract Class:**
```
INTERFACE:
✅ Pure contract
✅ No constructors
✅ No instance fields
✅ All methods abstract (Java 7)
✅ Multiple inheritance
✅ Use when: defining capability

ABSTRACT CLASS:
✅ Can share code
✅ Can have constructors
✅ Can have instance fields
✅ Can have concrete methods
✅ Single inheritance
✅ Use when: sharing implementation
```

**When to Use Interfaces:**
```
✅ Define capabilities (Flyable, Swimmable)
✅ Create loose coupling
✅ Enable multiple inheritance
✅ Build plugin systems
✅ Dependency injection
✅ Strategy pattern
✅ API design
```

**Next Steps:**
- Day 18: Exception Handling Basics
- Day 19: Exception Handling Advanced
- Day 20: Collections Framework

**🎉 Congratulations!**
You've completed all core OOP concepts:
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction
- Interfaces

You're now ready for advanced Java topics!

---

## Day 18: Exception Handling Basics (2 hours)

**Learning Objectives:**
- Understand what exceptions are
- Learn try-catch blocks
- Master different exception types
- Understand exception hierarchy
- Handle multiple exceptions
- Use finally block

---

#### Exercise 1: Introduction to Exceptions (20 minutes)

**What you'll learn:** Understanding what exceptions are and why we need them

**Create class: `ExceptionIntro`**

**Concept:** **Exception** = An event that disrupts normal program flow. Without handling, the program crashes. With handling, we can recover gracefully.

```java
public class ExceptionIntro {
    
    // Method that can cause an exception
    static void divideNumbers(int a, int b) {
        System.out.println("\n--- Dividing " + a + " by " + b + " ---");
        int result = a / b;  // Can throw ArithmeticException if b is 0
        System.out.println("Result: " + result);
    }
    
    // Method that can cause array exception
    static void accessArray(int[] array, int index) {
        System.out.println("\n--- Accessing array at index " + index + " ---");
        int value = array[index];  // Can throw ArrayIndexOutOfBoundsException
        System.out.println("Value: " + value);
    }
    
    // Method that can cause null pointer exception
    static void getStringLength(String str) {
        System.out.println("\n--- Getting length of string ---");
        int length = str.length();  // Can throw NullPointerException if str is null
        System.out.println("Length: " + length);
    }
    
    public static void main(String[] args) {
        System.out.println("===== INTRODUCTION TO EXCEPTIONS =====\n");
        
        // SCENARIO 1: Normal execution (no exception)
        System.out.println("--- Scenario 1: Normal Execution ---");
        divideNumbers(10, 2);
        System.out.println("✅ Program continues normally");
        
        // SCENARIO 2: Division by zero (exception occurs)
        System.out.println("\n--- Scenario 2: Division by Zero ---");
        try {
            divideNumbers(10, 0);  // This will throw ArithmeticException
            System.out.println("This line won't execute");
        } catch (ArithmeticException e) {
            System.out.println("❌ Exception caught: " + e.getMessage());
            System.out.println("✅ Program recovered and continues");
        }
        
        // SCENARIO 3: Array index out of bounds
        System.out.println("\n--- Scenario 3: Array Index Out of Bounds ---");
        int[] numbers = {10, 20, 30};
        
        try {
            accessArray(numbers, 1);  // Valid index
            System.out.println("✅ Access successful");
            
            accessArray(numbers, 5);  // Invalid index - throws exception
            System.out.println("This line won't execute");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("❌ Exception caught: " + e.getMessage());
            System.out.println("✅ Program recovered");
        }
        
        // SCENARIO 4: Null pointer exception
        System.out.println("\n--- Scenario 4: Null Pointer ---");
        String text = "Hello";
        String nullText = null;
        
        try {
            getStringLength(text);  // Works fine
            System.out.println("✅ First call successful");
            
            getStringLength(nullText);  // Throws NullPointerException
            System.out.println("This line won't execute");
        } catch (NullPointerException e) {
            System.out.println("❌ Exception caught: Cannot call method on null");
            System.out.println("✅ Program recovered");
        }
        
        System.out.println("\n--- Program Completed Successfully ---");
        System.out.println("💡 Without exception handling, program would have crashed!");
        
        System.out.println("\n💡 What Happens Without Exception Handling:");
        System.out.println("   1. Exception occurs");
        System.out.println("   2. Program prints error message");
        System.out.println("   3. Program TERMINATES immediately");
        System.out.println("   4. Remaining code doesn't execute");
        
        System.out.println("\n💡 What Happens With Exception Handling:");
        System.out.println("   1. Exception occurs");
        System.out.println("   2. catch block executes");
        System.out.println("   3. Program CONTINUES normally");
        System.out.println("   4. Remaining code executes");
        
        System.out.println("\n======================================");
    }
}
```

**Expected Output:**
```
===== INTRODUCTION TO EXCEPTIONS =====

--- Scenario 1: Normal Execution ---

--- Dividing 10 by 2 ---
Result: 5
✅ Program continues normally

--- Scenario 2: Division by Zero ---

--- Dividing 10 by 0 ---
❌ Exception caught: / by zero
✅ Program recovered and continues

--- Scenario 3: Array Index Out of Bounds ---

--- Accessing array at index 1 ---
Value: 20
✅ Access successful

--- Accessing array at index 5 ---
❌ Exception caught: Index 5 out of bounds for length 3
✅ Program recovered

--- Scenario 4: Null Pointer ---

--- Getting length of string ---
Length: 5
✅ First call successful

--- Getting length of string ---
❌ Exception caught: Cannot call method on null
✅ Program recovered

--- Program Completed Successfully ---
💡 Without exception handling, program would have crashed!

💡 What Happens Without Exception Handling:
   1. Exception occurs
   2. Program prints error message
   3. Program TERMINATES immediately
   4. Remaining code doesn't execute

💡 What Happens With Exception Handling:
   1. Exception occurs
   2. catch block executes
   3. Program CONTINUES normally
   4. Remaining code executes

======================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Exception** | Event that disrupts normal flow |
| **try block** | Code that might throw exception |
| **catch block** | Code that handles exception |
| **Crash** | Program terminates without handling |
| **Recovery** | Program continues with handling |

**Common Exceptions:**
```
ArithmeticException - Division by zero
NullPointerException - Using null reference
ArrayIndexOutOfBoundsException - Invalid array index
NumberFormatException - Invalid number format
IllegalArgumentException - Invalid argument
```

**✅ Success Criteria:**
- [ ] Understand what exceptions are
- [ ] Know why exception handling is important
- [ ] Can identify common exceptions
- [ ] See difference between handled and unhandled
- [ ] Understand program flow with exceptions

**🎯 Challenge:**
1. Create method that parses string to integer
2. Handle NumberFormatException
3. Test with valid and invalid inputs
4. Add logging for each exception

---

#### Exercise 2: Try-Catch Blocks (25 minutes)

**What you'll learn:** Using try-catch blocks to handle exceptions

**Create class: `TryCatchDemo`**

**Concept:** **try-catch** = try block contains risky code, catch block handles exceptions. Multiple catch blocks can handle different exception types.

```java
public class TryCatchDemo {
    
    static void demonstrateSingleCatch() {
        System.out.println("\n--- Single Catch Block ---");
        
        try {
            System.out.println("Attempting division...");
            int result = 10 / 0;  // Throws ArithmeticException
            System.out.println("Result: " + result);  // Won't execute
        } catch (ArithmeticException e) {
            System.out.println("❌ Caught ArithmeticException");
            System.out.println("   Message: " + e.getMessage());
            System.out.println("   Handling: Cannot divide by zero");
        }
        
        System.out.println("✅ Method continues after exception");
    }
    
    static void demonstrateMultipleCatch() {
        System.out.println("\n--- Multiple Catch Blocks ---");
        
        String[] data = {"10", "20", "abc", "30"};
        int[] numbers = new int[3];
        
        for (int i = 0; i < 5; i++) {
            try {
                System.out.println("\nProcessing index " + i + "...");
                
                // Can throw ArrayIndexOutOfBoundsException
                String value = data[i];
                System.out.println("  Data: " + value);
                
                // Can throw NumberFormatException
                int num = Integer.parseInt(value);
                System.out.println("  Parsed: " + num);
                
                // Can throw ArrayIndexOutOfBoundsException
                numbers[i] = num;
                System.out.println("  Stored at index " + i);
                
                System.out.println("✅ Success");
                
            } catch (NumberFormatException e) {
                System.out.println("❌ NumberFormatException: Invalid number format");
                System.out.println("   Value '" + data[i] + "' is not a valid number");
                
            } catch (ArrayIndexOutOfBoundsException e) {
                System.out.println("❌ ArrayIndexOutOfBoundsException: Index out of range");
                System.out.println("   Index " + i + " is invalid");
            }
        }
    }
    
    static void demonstrateCatchOrder() {
        System.out.println("\n--- Catch Block Order Matters ---");
        
        try {
            String text = null;
            System.out.println("Length: " + text.length());
            
        } catch (NullPointerException e) {
            System.out.println("❌ Specific: NullPointerException caught");
            
        } catch (Exception e) {
            System.out.println("❌ General: Exception caught");
            // This won't execute because NullPointerException is caught first
        }
        
        System.out.println("💡 Specific exceptions must come before general ones");
    }
    
    static void demonstrateExceptionInfo() {
        System.out.println("\n--- Exception Information ---");
        
        try {
            int[] array = {1, 2, 3};
            int value = array[10];
            
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("╔════════════════════════════════════════╗");
            System.out.println("║      EXCEPTION DETAILS                ║");
            System.out.println("╚════════════════════════════════════════╝");
            System.out.println("Type: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
            System.out.println("toString(): " + e.toString());
            System.out.println("\nStack Trace:");
            e.printStackTrace();
            System.out.println("════════════════════════════════════════");
        }
    }
    
    static int safeDivide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            System.out.println("⚠️  Division by zero, returning 0");
            return 0;
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== TRY-CATCH BLOCKS =====\n");
        
        // Demonstrate single catch
        demonstrateSingleCatch();
        
        // Demonstrate multiple catch blocks
        demonstrateMultipleCatch();
        
        // Demonstrate catch order
        demonstrateCatchOrder();
        
        // Demonstrate exception information
        demonstrateExceptionInfo();
        
        // Demonstrate return in catch
        System.out.println("\n--- Return in Catch Block ---");
        int result1 = safeDivide(10, 2);
        System.out.println("10 / 2 = " + result1);
        
        int result2 = safeDivide(10, 0);
        System.out.println("10 / 0 = " + result2);
        
        System.out.println("\n💡 Try-Catch Syntax:");
        System.out.println("   try {");
        System.out.println("       // risky code");
        System.out.println("   } catch (ExceptionType e) {");
        System.out.println("       // handle exception");
        System.out.println("   }");
        
        System.out.println("\n💡 Multiple Catch:");
        System.out.println("   try {");
        System.out.println("       // risky code");
        System.out.println("   } catch (SpecificException e) {");
        System.out.println("       // handle specific");
        System.out.println("   } catch (GeneralException e) {");
        System.out.println("       // handle general");
        System.out.println("   }");
        
        System.out.println("\n============================");
    }
}
```

**Expected Output:**
```
===== TRY-CATCH BLOCKS =====

--- Single Catch Block ---
Attempting division...
❌ Caught ArithmeticException
   Message: / by zero
   Handling: Cannot divide by zero
✅ Method continues after exception

--- Multiple Catch Blocks ---

Processing index 0...
  Data: 10
  Parsed: 10
  Stored at index 0
✅ Success

Processing index 1...
  Data: 20
  Parsed: 20
  Stored at index 1
✅ Success

Processing index 2...
  Data: abc
  Parsed: abc
❌ NumberFormatException: Invalid number format
   Value 'abc' is not a valid number

Processing index 3...
  Data: 30
  Parsed: 30
❌ ArrayIndexOutOfBoundsException: Index out of range
   Index 3 is invalid

Processing index 4...
❌ ArrayIndexOutOfBoundsException: Index out of range
   Index 4 is invalid

--- Catch Block Order Matters ---
❌ Specific: NullPointerException caught
💡 Specific exceptions must come before general ones

--- Exception Information ---
╔════════════════════════════════════════╗
║      EXCEPTION DETAILS                ║
╚════════════════════════════════════════╝
Type: ArrayIndexOutOfBoundsException
Message: Index 10 out of bounds for length 3
toString(): java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 3

Stack Trace:
[... stack trace output ...]
════════════════════════════════════════

--- Return in Catch Block ---
10 / 2 = 5
⚠️  Division by zero, returning 0
10 / 0 = 0

💡 Try-Catch Syntax:
   try {
       // risky code
   } catch (ExceptionType e) {
       // handle exception
   }

💡 Multiple Catch:
   try {
       // risky code
   } catch (SpecificException e) {
       // handle specific
   } catch (GeneralException e) {
       // handle general
   }

============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **try block** | Contains code that might throw exception |
| **catch block** | Handles specific exception type |
| **Multiple catch** | Handle different exceptions differently |
| **Catch order** | Specific before general |
| **Exception object** | Contains error information |

**✅ Success Criteria:**
- [ ] Can write try-catch blocks
- [ ] Understand multiple catch blocks
- [ ] Know catch order matters
- [ ] Can access exception information
- [ ] See how program flow continues

**🎯 Challenge:**
1. Create calculator with exception handling
2. Handle division by zero
3. Handle invalid input
4. Add detailed error messages

---

#### Exercise 3: Exception Hierarchy (20 minutes)

**What you'll learn:** Understanding the exception class hierarchy

**Create class: `ExceptionHierarchyDemo`**

**Concept:** All exceptions inherit from `Throwable`. Two main branches: `Exception` (recoverable) and `Error` (system errors). `RuntimeException` is unchecked, others are checked.

```java
public class ExceptionHierarchyDemo {
    
    static void demonstrateRuntimeExceptions() {
        System.out.println("\n--- Runtime Exceptions (Unchecked) ---");
        System.out.println("These don't need to be declared or caught");
        
        // ArithmeticException
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("1. ArithmeticException: " + e.getMessage());
        }
        
        // NullPointerException
        try {
            String str = null;
            str.length();
        } catch (NullPointerException e) {
            System.out.println("2. NullPointerException: Cannot call method on null");
        }
        
        // ArrayIndexOutOfBoundsException
        try {
            int[] arr = {1, 2, 3};
            int val = arr[10];
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("3. ArrayIndexOutOfBoundsException: " + e.getMessage());
        }
        
        // NumberFormatException
        try {
            int num = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("4. NumberFormatException: " + e.getMessage());
        }
        
        // IllegalArgumentException
        try {
            Thread.sleep(-1000);  // Negative sleep time
        } catch (IllegalArgumentException e) {
            System.out.println("5. IllegalArgumentException: " + e.getMessage());
        } catch (InterruptedException e) {
            // Required for Thread.sleep
        }
        
        // ClassCastException
        try {
            Object obj = "Hello";
            Integer num = (Integer) obj;  // Invalid cast
        } catch (ClassCastException e) {
            System.out.println("6. ClassCastException: Cannot cast String to Integer");
        }
    }
    
    static void demonstrateExceptionHierarchy() {
        System.out.println("\n--- Exception Hierarchy ---");
        
        try {
            // This throws ArithmeticException
            int result = 10 / 0;
            
        } catch (ArithmeticException e) {
            System.out.println("✅ Caught as ArithmeticException");
            System.out.println("   instanceof ArithmeticException: " + 
                             (e instanceof ArithmeticException));
            System.out.println("   instanceof RuntimeException: " + 
                             (e instanceof RuntimeException));
            System.out.println("   instanceof Exception: " + 
                             (e instanceof Exception));
            System.out.println("   instanceof Throwable: " + 
                             (e instanceof Throwable));
        }
    }
    
    static void demonstrateCatchingParent() {
        System.out.println("\n--- Catching Parent Exception ---");
        
        // Can catch specific exception with parent type
        try {
            int result = 10 / 0;  // ArithmeticException
        } catch (RuntimeException e) {  // Parent of ArithmeticException
            System.out.println("✅ Caught ArithmeticException as RuntimeException");
            System.out.println("   Actual type: " + e.getClass().getSimpleName());
        }
        
        // Can catch any exception with Exception
        try {
            String str = null;
            str.length();  // NullPointerException
        } catch (Exception e) {  // Parent of all exceptions
            System.out.println("✅ Caught NullPointerException as Exception");
            System.out.println("   Actual type: " + e.getClass().getSimpleName());
        }
    }
    
    static void demonstrateMultipleCatchWithHierarchy() {
        System.out.println("\n--- Multiple Catch with Hierarchy ---");
        
        String[] testCases = {"10", "abc", null};
        
        for (String test : testCases) {
            try {
                System.out.println("\nTesting: " + test);
                int num = Integer.parseInt(test);
                System.out.println("Parsed: " + num);
                
            } catch (NumberFormatException e) {
                System.out.println("❌ NumberFormatException: Invalid format");
                
            } catch (NullPointerException e) {
                System.out.println("❌ NullPointerException: Null value");
                
            } catch (Exception e) {
                System.out.println("❌ Other Exception: " + e.getClass().getSimpleName());
            }
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== EXCEPTION HIERARCHY =====\n");
        
        System.out.println("💡 Exception Hierarchy:");
        System.out.println("   Throwable");
        System.out.println("   ├── Error (System errors - don't catch)");
        System.out.println("   │   ├── OutOfMemoryError");
        System.out.println("   │   └── StackOverflowError");
        System.out.println("   └── Exception (Application errors - catch these)");
        System.out.println("       ├── RuntimeException (Unchecked)");
        System.out.println("       │   ├── ArithmeticException");
        System.out.println("       │   ├── NullPointerException");
        System.out.println("       │   ├── ArrayIndexOutOfBoundsException");
        System.out.println("       │   ├── NumberFormatException");
        System.out.println("       │   └── IllegalArgumentException");
        System.out.println("       └── IOException (Checked)");
        System.out.println("           ├── FileNotFoundException");
        System.out.println("           └── SocketException");
        
        // Demonstrate runtime exceptions
        demonstrateRuntimeExceptions();
        
        // Demonstrate hierarchy
        demonstrateExceptionHierarchy();
        
        // Demonstrate catching parent
        demonstrateCatchingParent();
        
        // Demonstrate multiple catch with hierarchy
        demonstrateMultipleCatchWithHierarchy();
        
        System.out.println("\n💡 Checked vs Unchecked:");
        System.out.println("   UNCHECKED (RuntimeException):");
        System.out.println("   - Don't need to be declared");
        System.out.println("   - Don't need to be caught");
        System.out.println("   - Usually programming errors");
        System.out.println("   - Examples: NullPointer, ArrayIndex");
        System.out.println("   ");
        System.out.println("   CHECKED (Exception but not RuntimeException):");
        System.out.println("   - Must be declared or caught");
        System.out.println("   - Compiler enforces handling");
        System.out.println("   - Usually external errors");
        System.out.println("   - Examples: IOException, SQLException");
        
        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== EXCEPTION HIERARCHY =====

💡 Exception Hierarchy:
   Throwable
   ├── Error (System errors - don't catch)
   │   ├── OutOfMemoryError
   │   └── StackOverflowError
   └── Exception (Application errors - catch these)
       ├── RuntimeException (Unchecked)
       │   ├── ArithmeticException
       │   ├── NullPointerException
       │   ├── ArrayIndexOutOfBoundsException
       │   ├── NumberFormatException
       │   └── IllegalArgumentException
       └── IOException (Checked)
           ├── FileNotFoundException
           └── SocketException

--- Runtime Exceptions (Unchecked) ---
These don't need to be declared or caught
1. ArithmeticException: / by zero
2. NullPointerException: Cannot call method on null
3. ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 3
4. NumberFormatException: For input string: "abc"
5. IllegalArgumentException: timeout value is negative
6. ClassCastException: Cannot cast String to Integer

--- Exception Hierarchy ---
✅ Caught as ArithmeticException
   instanceof ArithmeticException: true
   instanceof RuntimeException: true
   instanceof Exception: true
   instanceof Throwable: true

--- Catching Parent Exception ---
✅ Caught ArithmeticException as RuntimeException
   Actual type: ArithmeticException
✅ Caught NullPointerException as Exception
   Actual type: NullPointerException

--- Multiple Catch with Hierarchy ---

Testing: 10
Parsed: 10

Testing: abc
❌ NumberFormatException: Invalid format

Testing: null
❌ NullPointerException: Null value

💡 Checked vs Unchecked:
   UNCHECKED (RuntimeException):
   - Don't need to be declared
   - Don't need to be caught
   - Usually programming errors
   - Examples: NullPointer, ArrayIndex
   
   CHECKED (Exception but not RuntimeException):
   - Must be declared or caught
   - Compiler enforces handling
   - Usually external errors
   - Examples: IOException, SQLException

===============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Throwable** | Root of exception hierarchy |
| **Error** | System errors (don't catch) |
| **Exception** | Application errors (catch these) |
| **RuntimeException** | Unchecked exceptions |
| **Checked Exception** | Must be handled |

**✅ Success Criteria:**
- [ ] Understand exception hierarchy
- [ ] Know difference between Error and Exception
- [ ] Understand checked vs unchecked
- [ ] Can catch exceptions at different levels
- [ ] Know common exception types

**🎯 Challenge:**
1. Create custom exception hierarchy
2. Test catching at different levels
3. Demonstrate instanceof with exceptions
4. Create exception type analyzer

---

#### Exercise 4: The finally Block (25 minutes)

**What you'll learn:** Using finally block for cleanup code

**Create class: `FinallyBlockDemo`**

**Concept:** **finally block** = Always executes, whether exception occurs or not. Perfect for cleanup (closing files, connections, etc.).

```java
public class FinallyBlockDemo {
    
    static void demonstrateBasicFinally() {
        System.out.println("\n--- Basic Finally Block ---");
        
        // Case 1: No exception
        System.out.println("\nCase 1: No Exception");
        try {
            System.out.println("  try: Executing code");
            int result = 10 / 2;
            System.out.println("  try: Result = " + result);
        } catch (ArithmeticException e) {
            System.out.println("  catch: Handling exception");
        } finally {
            System.out.println("  finally: Always executes!");
        }
        
        // Case 2: With exception
        System.out.println("\nCase 2: With Exception");
        try {
            System.out.println("  try: Executing code");
            int result = 10 / 0;  // Exception!
            System.out.println("  try: Result = " + result);  // Won't execute
        } catch (ArithmeticException e) {
            System.out.println("  catch: Handling exception");
        } finally {
            System.out.println("  finally: Still executes!");
        }
    }
    
    static void demonstrateFinallyWithReturn() {
        System.out.println("\n--- Finally with Return ---");
        
        String result = methodWithReturn(true);
        System.out.println("Returned: " + result);
        
        result = methodWithReturn(false);
        System.out.println("Returned: " + result);
    }
    
    static String methodWithReturn(boolean throwException) {
        try {
            System.out.println("\n  try: Starting");
            if (throwException) {
                throw new RuntimeException("Test exception");
            }
            System.out.println("  try: Returning normally");
            return "Normal return";
            
        } catch (RuntimeException e) {
            System.out.println("  catch: Handling exception");
            System.out.println("  catch: Returning from catch");
            return "Exception return";
            
        } finally {
            System.out.println("  finally: Executes even with return!");
            // Note: return in finally overrides other returns (not recommended)
        }
    }
    
    static void demonstrateResourceCleanup() {
        System.out.println("\n--- Resource Cleanup Pattern ---");
        
        // Simulating resource (like file or database connection)
        class Resource {
            String name;
            boolean isOpen;
            
            Resource(String name) {
                this.name = name;
                this.isOpen = false;
            }
            
            void open() {
                isOpen = true;
                System.out.println("  📂 Opened: " + name);
            }
            
            void use() throws Exception {
                if (!isOpen) {
                    throw new Exception("Resource not open");
                }
                System.out.println("  ✅ Using: " + name);
            }
            
            void close() {
                if (isOpen) {
                    isOpen = false;
                    System.out.println("  🔒 Closed: " + name);
                }
            }
        }
        
        // Good pattern: Use finally for cleanup
        Resource resource = new Resource("database.db");
        
        try {
            System.out.println("\nOpening resource...");
            resource.open();
            
            System.out.println("Using resource...");
            resource.use();
            
            // Simulate error
            if (Math.random() > -1) {  // Always true
                throw new RuntimeException("Simulated error");
            }
            
        } catch (Exception e) {
            System.out.println("  ❌ Error: " + e.getMessage());
            
        } finally {
            System.out.println("\nCleanup in finally:");
            resource.close();  // Always closes, even if exception occurred
        }
        
        System.out.println("\n✅ Resource properly cleaned up");
    }
    
    static void demonstrateFinallyWithoutCatch() {
        System.out.println("\n--- Finally Without Catch ---");
        
        try {
            System.out.println("  try: Executing code");
            System.out.println("  try: No exception here");
        } finally {
            System.out.println("  finally: Can have finally without catch");
        }
        
        System.out.println("💡 try-finally is valid (without catch)");
    }
    
    static void demonstrateNestedTryFinally() {
        System.out.println("\n--- Nested Try-Finally ---");
        
        try {
            System.out.println("  Outer try");
            
            try {
                System.out.println("    Inner try");
                int result = 10 / 0;
            } catch (ArithmeticException e) {
                System.out.println("    Inner catch");
            } finally {
                System.out.println("    Inner finally");
            }
            
            System.out.println("  Outer try continues");
            
        } finally {
            System.out.println("  Outer finally");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== FINALLY BLOCK =====\n");
        
        // Demonstrate basic finally
        demonstrateBasicFinally();
        
        // Demonstrate finally with return
        demonstrateFinallyWithReturn();
        
        // Demonstrate resource cleanup
        demonstrateResourceCleanup();
        
        // Demonstrate finally without catch
        demonstrateFinallyWithoutCatch();
        
        // Demonstrate nested try-finally
        demonstrateNestedTryFinally();
        
        System.out.println("\n💡 Finally Block Rules:");
        System.out.println("   ✅ Always executes (with or without exception)");
        System.out.println("   ✅ Executes even if try/catch has return");
        System.out.println("   ✅ Perfect for cleanup code");
        System.out.println("   ✅ Can exist without catch block");
        System.out.println("   ⚠️  Avoid return in finally (overrides other returns)");
        
        System.out.println("\n💡 Common Use Cases:");
        System.out.println("   - Close files");
        System.out.println("   - Close database connections");
        System.out.println("   - Release locks");
        System.out.println("   - Free resources");
        System.out.println("   - Cleanup temporary data");
        
        System.out.println("\n💡 Syntax:");
        System.out.println("   try {");
        System.out.println("       // risky code");
        System.out.println("   } catch (Exception e) {");
        System.out.println("       // handle exception");
        System.out.println("   } finally {");
        System.out.println("       // cleanup code (always runs)");
        System.out.println("   }");
        
        System.out.println("\n=========================");
    }
}
```

**Expected Output:**
```
===== FINALLY BLOCK =====

--- Basic Finally Block ---

Case 1: No Exception
  try: Executing code
  try: Result = 5
  finally: Always executes!

Case 2: With Exception
  try: Executing code
  catch: Handling exception
  finally: Still executes!

--- Finally with Return ---

  try: Starting
  catch: Handling exception
  catch: Returning from catch
  finally: Executes even with return!
Returned: Exception return

  try: Starting
  try: Returning normally
  finally: Executes even with return!
Returned: Normal return

--- Resource Cleanup Pattern ---

Opening resource...
  📂 Opened: database.db
Using resource...
  ✅ Using: database.db
  ❌ Error: Simulated error

Cleanup in finally:
  🔒 Closed: database.db

✅ Resource properly cleaned up

--- Finally Without Catch ---
  try: Executing code
  try: No exception here
  finally: Can have finally without catch
💡 try-finally is valid (without catch)

--- Nested Try-Finally ---
  Outer try
    Inner try
    Inner catch
    Inner finally
  Outer try continues
  Outer finally

💡 Finally Block Rules:
   ✅ Always executes (with or without exception)
   ✅ Executes even if try/catch has return
   ✅ Perfect for cleanup code
   ✅ Can exist without catch block
   ⚠️  Avoid return in finally (overrides other returns)

💡 Common Use Cases:
   - Close files
   - Close database connections
   - Release locks
   - Free resources
   - Cleanup temporary data

💡 Syntax:
   try {
       // risky code
   } catch (Exception e) {
       // handle exception
   } finally {
       // cleanup code (always runs)
   }

=========================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **finally** | Always executes |
| **Cleanup** | Perfect for resource cleanup |
| **With/Without Exception** | Runs in both cases |
| **With Return** | Runs even if method returns |
| **Optional catch** | Can have try-finally without catch |

**✅ Success Criteria:**
- [ ] Understand finally always executes
- [ ] Know when to use finally
- [ ] Can implement cleanup pattern
- [ ] Understand finally with return
- [ ] See try-finally without catch

**🎯 Challenge:**
1. Create file handler with finally
2. Implement connection pool cleanup
3. Test finally with multiple returns
4. Create resource manager class

---

#### Exercise 5: Handling Multiple Exceptions (20 minutes)

**What you'll learn:** Different ways to handle multiple exception types

**Create class: `MultipleExceptionsDemo`**

**Concept:** Can handle multiple exceptions with separate catch blocks or with multi-catch (Java 7+).

```java
public class MultipleExceptionsDemo {
    
    static void demonstrateSeparateCatch() {
        System.out.println("\n--- Separate Catch Blocks ---");
        
        String[] testData = {"10", "abc", null, "20"};
        int[] results = new int[2];
        
        for (int i = 0; i < testData.length; i++) {
            try {
                System.out.println("\nProcessing index " + i + ": " + testData[i]);
                
                // Parse string to integer (can throw NumberFormatException or NullPointerException)
                int value = Integer.parseInt(testData[i]);
                System.out.println("  Parsed: " + value);
                
                // Store in array (can throw ArrayIndexOutOfBoundsException)
                results[i] = value;
                System.out.println("  Stored at index " + i);
                
                System.out.println("✅ Success");
                
            } catch (NumberFormatException e) {
                System.out.println("❌ NumberFormatException: Invalid number format");
                System.out.println("   Cannot parse '" + testData[i] + "' to integer");
                
            } catch (NullPointerException e) {
                System.out.println("❌ NullPointerException: Null value encountered");
                System.out.println("   Cannot parse null");
                
            } catch (ArrayIndexOutOfBoundsException e) {
                System.out.println("❌ ArrayIndexOutOfBoundsException: Array full");
                System.out.println("   Cannot store at index " + i);
            }
        }
    }
    
    static void demonstrateMultiCatch() {
        System.out.println("\n--- Multi-Catch (Java 7+) ---");
        
        String[] testData = {"10", "abc", null};
        
        for (String data : testData) {
            try {
                System.out.println("\nProcessing: " + data);
                int value = Integer.parseInt(data);
                System.out.println("  Parsed: " + value);
                System.out.println("✅ Success");
                
            } catch (NumberFormatException | NullPointerException e) {
                // Handle both exceptions the same way
                System.out.println("❌ " + e.getClass().getSimpleName());
                System.out.println("   Invalid input: " + data);
            }
        }
        
        System.out.println("\n💡 Multi-catch syntax: catch (Type1 | Type2 e)");
    }
    
    static void demonstrateCatchAll() {
        System.out.println("\n--- Catch-All with Exception ---");
        
        Object[] testData = {"10", 20, null, "abc"};
        
        for (Object data : testData) {
            try {
                System.out.println("\nProcessing: " + data);
                
                // Convert to string
                String str = (String) data;  // Can throw ClassCastException
                
                // Parse to integer
                int value = Integer.parseInt(str);  // Can throw NumberFormatException
                
                System.out.println("  Value: " + value);
                System.out.println("✅ Success");
                
            } catch (ClassCastException e) {
                System.out.println("❌ ClassCastException: Not a string");
                
            } catch (Exception e) {
                // Catches all other exceptions
                System.out.println("❌ " + e.getClass().getSimpleName());
                System.out.println("   General error occurred");
            }
        }
    }
    
    static void demonstrateExceptionPriority() {
        System.out.println("\n--- Exception Catch Priority ---");
        
        try {
            String str = null;
            str.length();  // NullPointerException
            
        } catch (NullPointerException e) {
            System.out.println("✅ Caught by NullPointerException catch");
            
        } catch (RuntimeException e) {
            System.out.println("Would catch here if above didn't exist");
            
        } catch (Exception e) {
            System.out.println("Would catch here if above didn't exist");
        }
        
        System.out.println("\n💡 First matching catch block executes");
        System.out.println("💡 More specific exceptions must come first");
    }
    
    public static void main(String[] args) {
        System.out.println("===== HANDLING MULTIPLE EXCEPTIONS =====\n");
        
        // Demonstrate separate catch blocks
        demonstrateSeparateCatch();
        
        // Demonstrate multi-catch
        demonstrateMultiCatch();
        
        // Demonstrate catch-all
        demonstrateCatchAll();
        
        // Demonstrate exception priority
        demonstrateExceptionPriority();
        
        System.out.println("\n💡 Ways to Handle Multiple Exceptions:");
        System.out.println("   ");
        System.out.println("   1. Separate Catch Blocks:");
        System.out.println("      try { }");
        System.out.println("      catch (Type1 e) { }");
        System.out.println("      catch (Type2 e) { }");
        System.out.println("   ");
        System.out.println("   2. Multi-Catch (Java 7+):");
        System.out.println("      try { }");
        System.out.println("      catch (Type1 | Type2 e) { }");
        System.out.println("   ");
        System.out.println("   3. Catch Parent Type:");
        System.out.println("      try { }");
        System.out.println("      catch (Exception e) { }");
        
        System.out.println("\n💡 Best Practices:");
        System.out.println("   ✅ Catch specific exceptions first");
        System.out.println("   ✅ Use multi-catch for same handling");
        System.out.println("   ✅ Catch general exceptions last");
        System.out.println("   ✅ Don't catch Exception unless necessary");
        System.out.println("   ❌ Don't catch Throwable or Error");
        
        System.out.println("\n========================================");
    }
}
```

**Expected Output:**
```
===== HANDLING MULTIPLE EXCEPTIONS =====

--- Separate Catch Blocks ---

Processing index 0: 10
  Parsed: 10
  Stored at index 0
✅ Success

Processing index 1: abc
  Parsed: abc
❌ NumberFormatException: Invalid number format
   Cannot parse 'abc' to integer

Processing index 2: null
❌ NullPointerException: Null value encountered
   Cannot parse null

Processing index 3: 20
  Parsed: 20
❌ ArrayIndexOutOfBoundsException: Array full
   Cannot store at index 3

--- Multi-Catch (Java 7+) ---

Processing: 10
  Parsed: 10
✅ Success

Processing: abc
❌ NumberFormatException
   Invalid input: abc

Processing: null
❌ NullPointerException
   Invalid input: null

💡 Multi-catch syntax: catch (Type1 | Type2 e)

--- Catch-All with Exception ---

Processing: 10
  Value: 10
✅ Success

Processing: 20
❌ ClassCastException: Not a string

Processing: null
❌ ClassCastException: Not a string

Processing: abc
❌ NumberFormatException
   General error occurred

--- Exception Catch Priority ---
✅ Caught by NullPointerException catch

💡 First matching catch block executes
💡 More specific exceptions must come first

💡 Ways to Handle Multiple Exceptions:
   
   1. Separate Catch Blocks:
      try { }
      catch (Type1 e) { }
      catch (Type2 e) { }
   
   2. Multi-Catch (Java 7+):
      try { }
      catch (Type1 | Type2 e) { }
   
   3. Catch Parent Type:
      try { }
      catch (Exception e) { }

💡 Best Practices:
   ✅ Catch specific exceptions first
   ✅ Use multi-catch for same handling
   ✅ Catch general exceptions last
   ✅ Don't catch Exception unless necessary
   ❌ Don't catch Throwable or Error

========================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Separate Catch** | Different handling for each exception |
| **Multi-Catch** | Same handling for multiple exceptions |
| **Catch Order** | Specific before general |
| **Catch-All** | Using Exception to catch all |

**✅ Success Criteria:**
- [ ] Can handle multiple exceptions
- [ ] Know multi-catch syntax
- [ ] Understand catch order importance
- [ ] Can use catch-all appropriately
- [ ] See different handling strategies

**🎯 Challenge:**
1. Create input validator with multiple exceptions
2. Use multi-catch where appropriate
3. Add specific error messages for each type
4. Test all exception paths

---

#### Exercise 6: Real-World Application - User Input Validator (30 minutes)

**What you'll learn:** Building a complete input validation system with exception handling

**Create class: `UserInputValidator`**

**Concept:** Applying all exception handling concepts in a real-world user input validation system.

```java
import java.util.Scanner;

public class UserInputValidator {
    
    // Custom validation methods
    static int validateAge(String input) throws NumberFormatException, IllegalArgumentException {
        // Parse to integer (can throw NumberFormatException)
        int age = Integer.parseInt(input);
        
        // Validate range
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be between 0 and 150");
        }
        
        return age;
    }
    
    static String validateEmail(String input) throws IllegalArgumentException {
        if (input == null || input.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        
        if (!input.contains("@") || !input.contains(".")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        
        return input.trim();
    }
    
    static String validatePhone(String input) throws IllegalArgumentException {
        if (input == null || input.trim().isEmpty()) {
            throw new IllegalArgumentException("Phone cannot be empty");
        }
        
        // Remove spaces and dashes
        String cleaned = input.replaceAll("[\\s-]", "");
        
        if (cleaned.length() != 10) {
            throw new IllegalArgumentException("Phone must be 10 digits");
        }
        
        // Check if all digits
        for (char c : cleaned.toCharArray()) {
            if (!Character.isDigit(c)) {
                throw new IllegalArgumentException("Phone must contain only digits");
            }
        }
        
        return cleaned;
    }
    
    static double validateSalary(String input) throws NumberFormatException, IllegalArgumentException {
        double salary = Double.parseDouble(input);
        
        if (salary < 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
        
        if (salary > 1000000) {
            throw new IllegalArgumentException("Salary seems unrealistic");
        }
        
        return salary;
    }
    
    // User registration system
    static class User {
        String name;
        int age;
        String email;
        String phone;
        double salary;
        
        void displayInfo() {
            System.out.println("\n╔════════════════════════════════════════╗");
            System.out.println("║      USER REGISTRATION SUCCESS        ║");
            System.out.println("╚════════════════════════════════════════╝");
            System.out.println("Name: " + name);
            System.out.println("Age: " + age);
            System.out.println("Email: " + email);
            System.out.println("Phone: " + phone);
            System.out.println("Salary: $" + String.format("%.2f", salary));
            System.out.println("════════════════════════════════════════");
        }
    }
    
    static User registerUser(String name, String ageStr, String email, 
                            String phone, String salaryStr) {
        User user = new User();
        int errors = 0;
        
        System.out.println("\n═══════════════════════════════════════");
        System.out.println("VALIDATING USER INPUT");
        System.out.println("═══════════════════════════════════════");
        
        // Validate name
        try {
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalArgumentException("Name cannot be empty");
            }
            user.name = name.trim();
            System.out.println("✅ Name: Valid");
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Name: " + e.getMessage());
            errors++;
        }
        
        // Validate age
        try {
            user.age = validateAge(ageStr);
            System.out.println("✅ Age: Valid (" + user.age + ")");
        } catch (NumberFormatException e) {
            System.out.println("❌ Age: Must be a number");
            errors++;
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Age: " + e.getMessage());
            errors++;
        }
        
        // Validate email
        try {
            user.email = validateEmail(email);
            System.out.println("✅ Email: Valid");
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Email: " + e.getMessage());
            errors++;
        }
        
        // Validate phone
        try {
            user.phone = validatePhone(phone);
            System.out.println("✅ Phone: Valid");
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Phone: " + e.getMessage());
            errors++;
        }
        
        // Validate salary
        try {
            user.salary = validateSalary(salaryStr);
            System.out.println("✅ Salary: Valid");
        } catch (NumberFormatException e) {
            System.out.println("❌ Salary: Must be a number");
            errors++;
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Salary: " + e.getMessage());
            errors++;
        }
        
        System.out.println("═══════════════════════════════════════");
        
        if (errors > 0) {
            System.out.println("❌ Registration failed: " + errors + " error(s)");
            return null;
        }
        
        return user;
    }
    
    public static void main(String[] args) {
        System.out.println("===== USER INPUT VALIDATOR =====\n");
        
        // Test Case 1: Valid input
        System.out.println("--- Test Case 1: Valid Input ---");
        User user1 = registerUser("John Doe", "30", "john@email.com", 
                                  "123-456-7890", "75000");
        if (user1 != null) {
            user1.displayInfo();
        }
        
        // Test Case 2: Invalid age
        System.out.println("\n--- Test Case 2: Invalid Age ---");
        User user2 = registerUser("Jane Smith", "abc", "jane@email.com", 
                                  "9876543210", "60000");
        
        // Test Case 3: Multiple errors
        System.out.println("\n--- Test Case 3: Multiple Errors ---");
        User user3 = registerUser("", "200", "invalid-email", 
                                  "123", "-5000");
        
        // Test Case 4: Edge cases
        System.out.println("\n--- Test Case 4: Edge Cases ---");
        User user4 = registerUser("Bob Johnson", "0", "bob@test.com", 
                                  "5555555555", "0");
        if (user4 != null) {
            user4.displayInfo();
        }
        
        // Interactive mode (commented out for automated testing)
        /*
        Scanner scanner = new Scanner(System.in);
        System.out.println("\n--- Interactive Registration ---");
        
        System.out.print("Enter name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter age: ");
        String age = scanner.nextLine();
        
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        
        System.out.print("Enter phone: ");
        String phone = scanner.nextLine();
        
        System.out.print("Enter salary: ");
        String salary = scanner.nextLine();
        
        User user = registerUser(name, age, email, phone, salary);
        if (user != null) {
            user.displayInfo();
        }
        
        scanner.close();
        */
        
        System.out.println("\n💡 Exception Handling in Real Applications:");
        System.out.println("   ✅ Validate all user input");
        System.out.println("   ✅ Provide clear error messages");
        System.out.println("   ✅ Handle each error type appropriately");
        System.out.println("   ✅ Continue processing after errors");
        System.out.println("   ✅ Collect all errors before failing");
        System.out.println("   ✅ Log errors for debugging");
        
        System.out.println("\n💡 Benefits:");
        System.out.println("   ✅ Prevents invalid data");
        System.out.println("   ✅ Improves user experience");
        System.out.println("   ✅ Makes debugging easier");
        System.out.println("   ✅ Increases application reliability");
        
        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== USER INPUT VALIDATOR =====

--- Test Case 1: Valid Input ---

═══════════════════════════════════════
VALIDATING USER INPUT
═══════════════════════════════════════
✅ Name: Valid
✅ Age: Valid (30)
✅ Email: Valid
✅ Phone: Valid
✅ Salary: Valid
═══════════════════════════════════════

╔════════════════════════════════════════╗
║      USER REGISTRATION SUCCESS        ║
╚════════════════════════════════════════╝
Name: John Doe
Age: 30
Email: john@email.com
Phone: 1234567890
Salary: $75000.00
════════════════════════════════════════

--- Test Case 2: Invalid Age ---

═══════════════════════════════════════
VALIDATING USER INPUT
═══════════════════════════════════════
✅ Name: Valid
❌ Age: Must be a number
✅ Email: Valid
✅ Phone: Valid
✅ Salary: Valid
═══════════════════════════════════════
❌ Registration failed: 1 error(s)

--- Test Case 3: Multiple Errors ---

═══════════════════════════════════════
VALIDATING USER INPUT
═══════════════════════════════════════
❌ Name: Name cannot be empty
❌ Age: Age must be between 0 and 150
❌ Email: Invalid email format
❌ Phone: Phone must be 10 digits
❌ Salary: Salary cannot be negative
═══════════════════════════════════════
❌ Registration failed: 5 error(s)

--- Test Case 4: Edge Cases ---

═══════════════════════════════════════
VALIDATING USER INPUT
═══════════════════════════════════════
✅ Name: Valid
✅ Age: Valid (0)
✅ Email: Valid
✅ Phone: Valid
✅ Salary: Valid
═══════════════════════════════════════

╔════════════════════════════════════════╗
║      USER REGISTRATION SUCCESS        ║
╚════════════════════════════════════════╝
Name: Bob Johnson
Age: 0
Email: bob@test.com
Phone: 5555555555
Salary: $0.00
════════════════════════════════════════

💡 Exception Handling in Real Applications:
   ✅ Validate all user input
   ✅ Provide clear error messages
   ✅ Handle each error type appropriately
   ✅ Continue processing after errors
   ✅ Collect all errors before failing
   ✅ Log errors for debugging

💡 Benefits:
   ✅ Prevents invalid data
   ✅ Improves user experience
   ✅ Makes debugging easier
   ✅ Increases application reliability

================================
```

**💡 Key Concepts:**

| Concept | Application |
|---------|-------------|
| **Input Validation** | Check all user input |
| **Multiple Exceptions** | Handle different error types |
| **Error Collection** | Collect all errors before failing |
| **Clear Messages** | User-friendly error messages |

**✅ Success Criteria:**
- [ ] Understand complete validation system
- [ ] Can handle multiple validation errors
- [ ] Provide clear error messages
- [ ] Continue after errors
- [ ] Ready to build similar systems

**🎯 Challenge:**
1. Add password validation
2. Implement retry mechanism
3. Add logging for all errors
4. Create validation result object
5. Add custom exception types

---

### 🎓 Day 18 Summary: Exception Handling Basics

**What You Learned:**
1. ✅ What exceptions are and why they matter
2. ✅ Try-catch blocks
3. ✅ Exception hierarchy
4. ✅ Finally block for cleanup
5. ✅ Handling multiple exceptions
6. ✅ Real-world input validation

**Key Takeaways:**
- Exceptions disrupt normal program flow
- try-catch prevents program crashes
- finally always executes (cleanup)
- Catch specific exceptions before general
- Multiple ways to handle multiple exceptions
- Always validate user input

**Exception Handling Checklist:**
```
✅ Identify risky code
✅ Wrap in try block
✅ Catch specific exceptions
✅ Provide meaningful error messages
✅ Use finally for cleanup
✅ Don't catch Exception unless necessary
✅ Log exceptions for debugging
```

**Common Exceptions:**
```
RuntimeException (Unchecked):
- ArithmeticException
- NullPointerException
- ArrayIndexOutOfBoundsException
- NumberFormatException
- IllegalArgumentException
- ClassCastException

Checked Exceptions (Day 19):
- IOException
- SQLException
- FileNotFoundException
```

**Next Steps:**
- Day 19: Exception Handling Advanced (throws, custom exceptions, best practices)
- Day 20: Collections Framework
- Day 21: File I/O

---


## Day 19: Exception Handling Advanced

### 🎯 Learning Objectives
By the end of Day 19, you will:
- Create custom exception classes
- Use throws keyword to declare exceptions
- Understand exception propagation
- Learn exception handling best practices
- Use try-with-resources for automatic resource management
- Build a complete exception handling system

### 📚 Topics Covered
1. Custom Exception Classes
2. Throwing Exceptions (throw keyword)
3. Declaring Exceptions (throws keyword)
4. Exception Propagation
5. Try-with-Resources (Java 7+)
6. Exception Handling Best Practices

---

#### Exercise 1: Creating Custom Exceptions (20 minutes)

**What you'll learn:** How to create your own exception classes for domain-specific errors

**Create class: `CustomExceptionsDemo`**

**Concept:** Custom exceptions make code more readable and provide domain-specific error handling.

```java
// Custom exception for invalid age
class InvalidAgeException extends Exception {
    private int age;
    
    public InvalidAgeException(int age) {
        super("Invalid age: " + age);
        this.age = age;
    }
    
    public InvalidAgeException(String message, int age) {
        super(message);
        this.age = age;
    }
    
    public int getAge() {
        return age;
    }
    
    public String getDetailedMessage() {
        return getMessage() + " (Age must be between 0 and 150)";
    }
}

// Custom exception for insufficient balance
class InsufficientBalanceException extends Exception {
    private double balance;
    private double requestedAmount;
    
    public InsufficientBalanceException(double balance, double requestedAmount) {
        super("Insufficient balance: $" + balance + " (Requested: $" + requestedAmount + ")");
        this.balance = balance;
        this.requestedAmount = requestedAmount;
    }
    
    public double getShortfall() {
        return requestedAmount - balance;
    }
    
    public double getBalance() {
        return balance;
    }
    
    public double getRequestedAmount() {
        return requestedAmount;
    }
}

// Custom unchecked exception for invalid operation
class InvalidOperationException extends RuntimeException {
    private String operation;
    
    public InvalidOperationException(String operation) {
        super("Invalid operation: " + operation);
        this.operation = operation;
    }
    
    public InvalidOperationException(String operation, String reason) {
        super("Invalid operation: " + operation + " - " + reason);
        this.operation = operation;
    }
    
    public String getOperation() {
        return operation;
    }
}

public class CustomExceptionsDemo {
    
    static void demonstrateInvalidAgeException() {
        System.out.println("\n--- InvalidAgeException Demo ---");
        
        int[] testAges = {25, -5, 200, 150};
        
        for (int age : testAges) {
            try {
                System.out.println("\nValidating age: " + age);
                
                if (age < 0 || age > 150) {
                    throw new InvalidAgeException(age);
                }
                
                System.out.println("✅ Age is valid");
                
            } catch (InvalidAgeException e) {
                System.out.println("❌ " + e.getDetailedMessage());
                System.out.println("   Provided age: " + e.getAge());
            }
        }
    }
    
    static void demonstrateInsufficientBalanceException() {
        System.out.println("\n--- InsufficientBalanceException Demo ---");
        
        double balance = 1000.0;
        double[] withdrawals = {500, 600, 1500};
        
        for (double amount : withdrawals) {
            try {
                System.out.println("\nAttempting to withdraw: $" + amount);
                System.out.println("Current balance: $" + balance);
                
                if (amount > balance) {
                    throw new InsufficientBalanceException(balance, amount);
                }
                
                balance -= amount;
                System.out.println("✅ Withdrawal successful");
                System.out.println("   New balance: $" + balance);
                
            } catch (InsufficientBalanceException e) {
                System.out.println("❌ " + e.getMessage());
                System.out.println("   Shortfall: $" + e.getShortfall());
                System.out.println("   Transaction denied");
            }
        }
    }
    
    static void demonstrateInvalidOperationException() {
        System.out.println("\n--- InvalidOperationException Demo ---");
        
        String[] operations = {"ADD", "SUBTRACT", "MULTIPLY", "DIVIDE", "INVALID"};
        
        for (String op : operations) {
            try {
                System.out.println("\nPerforming operation: " + op);
                
                switch (op) {
                    case "ADD":
                    case "SUBTRACT":
                    case "MULTIPLY":
                    case "DIVIDE":
                        System.out.println("✅ Operation executed");
                        break;
                    default:
                        throw new InvalidOperationException(op, "Operation not supported");
                }
                
            } catch (InvalidOperationException e) {
                System.out.println("❌ " + e.getMessage());
                System.out.println("   Operation attempted: " + e.getOperation());
            }
        }
    }
    
    static void demonstrateCustomExceptionHierarchy() {
        System.out.println("\n--- Custom Exception Hierarchy ---");
        
        System.out.println("\nInvalidAgeException:");
        System.out.println("  extends Exception (checked)");
        System.out.println("  Must be caught or declared");
        
        System.out.println("\nInsufficientBalanceException:");
        System.out.println("  extends Exception (checked)");
        System.out.println("  Must be caught or declared");
        
        System.out.println("\nInvalidOperationException:");
        System.out.println("  extends RuntimeException (unchecked)");
        System.out.println("  Optional to catch or declare");
        
        System.out.println("\n💡 Choose Exception Type:");
        System.out.println("   Checked (extends Exception):");
        System.out.println("   - For recoverable errors");
        System.out.println("   - Caller must handle");
        System.out.println("   ");
        System.out.println("   Unchecked (extends RuntimeException):");
        System.out.println("   - For programming errors");
        System.out.println("   - Optional to handle");
    }
    
    public static void main(String[] args) {
        System.out.println("===== CUSTOM EXCEPTIONS =====\n");
        
        // Demonstrate InvalidAgeException
        demonstrateInvalidAgeException();
        
        // Demonstrate InsufficientBalanceException
        demonstrateInsufficientBalanceException();
        
        // Demonstrate InvalidOperationException
        demonstrateInvalidOperationException();
        
        // Explain hierarchy
        demonstrateCustomExceptionHierarchy();
        
        System.out.println("\n💡 Benefits of Custom Exceptions:");
        System.out.println("   ✅ More descriptive error messages");
        System.out.println("   ✅ Domain-specific error handling");
        System.out.println("   ✅ Additional error context");
        System.out.println("   ✅ Better code organization");
        System.out.println("   ✅ Easier debugging");
        
        System.out.println("\n💡 Custom Exception Template:");
        System.out.println("   ");
        System.out.println("   class MyException extends Exception {");
        System.out.println("       // Fields for error context");
        System.out.println("       private String context;");
        System.out.println("       ");
        System.out.println("       // Constructor with message");
        System.out.println("       public MyException(String message) {");
        System.out.println("           super(message);");
        System.out.println("       }");
        System.out.println("       ");
        System.out.println("       // Getters for context");
        System.out.println("       public String getContext() {");
        System.out.println("           return context;");
        System.out.println("       }");
        System.out.println("   }");
        
        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== CUSTOM EXCEPTIONS =====

--- InvalidAgeException Demo ---

Validating age: 25
✅ Age is valid

Validating age: -5
❌ Invalid age: -5 (Age must be between 0 and 150)
   Provided age: -5

Validating age: 200
❌ Invalid age: 200 (Age must be between 0 and 150)
   Provided age: 200

Validating age: 150
✅ Age is valid

--- InsufficientBalanceException Demo ---

Attempting to withdraw: $500.0
Current balance: $1000.0
✅ Withdrawal successful
   New balance: $500.0

Attempting to withdraw: $600.0
Current balance: $500.0
❌ Insufficient balance: $500.0 (Requested: $600.0)
   Shortfall: $100.0
   Transaction denied

Attempting to withdraw: $1500.0
Current balance: $500.0
❌ Insufficient balance: $500.0 (Requested: $1500.0)
   Shortfall: $1000.0
   Transaction denied

--- InvalidOperationException Demo ---

Performing operation: ADD
✅ Operation executed

Performing operation: SUBTRACT
✅ Operation executed

Performing operation: MULTIPLY
✅ Operation executed

Performing operation: DIVIDE
✅ Operation executed

Performing operation: INVALID
❌ Invalid operation: INVALID - Operation not supported
   Operation attempted: INVALID

--- Custom Exception Hierarchy ---

InvalidAgeException:
  extends Exception (checked)
  Must be caught or declared

InsufficientBalanceException:
  extends Exception (checked)
  Must be caught or declared

InvalidOperationException:
  extends RuntimeException (unchecked)
  Optional to catch or declare

💡 Choose Exception Type:
   Checked (extends Exception):
   - For recoverable errors
   - Caller must handle
   
   Unchecked (extends RuntimeException):
   - For programming errors
   - Optional to handle

💡 Benefits of Custom Exceptions:
   ✅ More descriptive error messages
   ✅ Domain-specific error handling
   ✅ Additional error context
   ✅ Better code organization
   ✅ Easier debugging

💡 Custom Exception Template:
   
   class MyException extends Exception {
       // Fields for error context
       private String context;
       
       // Constructor with message
       public MyException(String message) {
           super(message);
       }
       
       // Getters for context
       public String getContext() {
           return context;
       }
   }

=============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Custom Exception** | User-defined exception class |
| **Checked Exception** | Extends Exception, must handle |
| **Unchecked Exception** | Extends RuntimeException |
| **Error Context** | Additional fields for details |

**✅ Success Criteria:**
- [ ] Can create custom exception classes
- [ ] Understand checked vs unchecked
- [ ] Add context fields to exceptions
- [ ] Provide meaningful error messages
- [ ] Choose appropriate exception type

**🎯 Challenge:**
1. Create custom exception for invalid email
2. Add multiple constructors
3. Include timestamp in exception
4. Create exception hierarchy for banking system

---

#### Exercise 2: Throwing Exceptions (throw keyword) (20 minutes)

**What you'll learn:** How to explicitly throw exceptions using the throw keyword

**Create class: `ThrowingExceptionsDemo`**

**Concept:** Use `throw` keyword to explicitly throw an exception when error conditions are detected.

```java
public class ThrowingExceptionsDemo {
    
    // Method that throws exception based on condition
    static void validateAge(int age) {
        System.out.println("Validating age: " + age);
        
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
        
        if (age > 150) {
            throw new IllegalArgumentException("Age too high: " + age);
        }
        
        if (age < 18) {
            throw new IllegalArgumentException("Must be 18 or older: " + age);
        }
        
        System.out.println("✅ Age is valid");
    }
    
    // Method that throws different exception types
    static double divide(int numerator, int denominator) {
        System.out.println("\nDividing " + numerator + " by " + denominator);
        
        if (denominator == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        
        if (numerator < 0 || denominator < 0) {
            throw new IllegalArgumentException("Negative numbers not allowed");
        }
        
        double result = (double) numerator / denominator;
        System.out.println("✅ Result: " + result);
        return result;
    }
    
    // Method that re-throws exception
    static void processData(String data) {
        try {
            System.out.println("\nProcessing: " + data);
            
            if (data == null) {
                throw new NullPointerException("Data is null");
            }
            
            if (data.isEmpty()) {
                throw new IllegalArgumentException("Data is empty");
            }
            
            int value = Integer.parseInt(data);
            System.out.println("✅ Parsed value: " + value);
            
        } catch (NumberFormatException e) {
            System.out.println("❌ Invalid number format");
            // Re-throw with more context
            throw new IllegalArgumentException("Cannot parse data: " + data, e);
        }
    }
    
    // Method that throws custom exception
    static class Account {
        private double balance;
        
        Account(double initialBalance) {
            this.balance = initialBalance;
        }
        
        void withdraw(double amount) {
            System.out.println("\nWithdrawing $" + amount);
            System.out.println("Current balance: $" + balance);
            
            if (amount <= 0) {
                throw new IllegalArgumentException("Amount must be positive");
            }
            
            if (amount > balance) {
                throw new RuntimeException(
                    "Insufficient funds: Balance=$" + balance + 
                    ", Requested=$" + amount
                );
            }
            
            balance -= amount;
            System.out.println("✅ Withdrawal successful");
            System.out.println("   New balance: $" + balance);
        }
        
        double getBalance() {
            return balance;
        }
    }
    
    static void demonstrateThrowingExceptions() {
        System.out.println("\n--- Throwing Exceptions Demo ---");
        
        // Test validateAge
        int[] ages = {25, -5, 200, 15};
        for (int age : ages) {
            try {
                System.out.println();
                validateAge(age);
            } catch (IllegalArgumentException e) {
                System.out.println("❌ " + e.getMessage());
            }
        }
    }
    
    static void demonstrateDivideExceptions() {
        System.out.println("\n--- Divide Exceptions Demo ---");
        
        int[][] testCases = {{10, 2}, {10, 0}, {-10, 5}};
        
        for (int[] test : testCases) {
            try {
                divide(test[0], test[1]);
            } catch (ArithmeticException e) {
                System.out.println("❌ ArithmeticException: " + e.getMessage());
            } catch (IllegalArgumentException e) {
                System.out.println("❌ IllegalArgumentException: " + e.getMessage());
            }
        }
    }
    
    static void demonstrateReThrow() {
        System.out.println("\n--- Re-throwing Exceptions Demo ---");
        
        String[] testData = {"123", "abc", null, ""};
        
        for (String data : testData) {
            try {
                processData(data);
            } catch (IllegalArgumentException e) {
                System.out.println("❌ Caught: " + e.getMessage());
                if (e.getCause() != null) {
                    System.out.println("   Caused by: " + e.getCause().getClass().getSimpleName());
                }
            } catch (NullPointerException e) {
                System.out.println("❌ Caught: " + e.getMessage());
            }
        }
    }
    
    static void demonstrateAccountExceptions() {
        System.out.println("\n--- Account Exceptions Demo ---");
        
        Account account = new Account(1000);
        double[] withdrawals = {500, 600, -100};
        
        for (double amount : withdrawals) {
            try {
                account.withdraw(amount);
            } catch (IllegalArgumentException e) {
                System.out.println("❌ " + e.getMessage());
            } catch (RuntimeException e) {
                System.out.println("❌ " + e.getMessage());
            }
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== THROWING EXCEPTIONS =====\n");
        
        // Demonstrate throwing exceptions
        demonstrateThrowingExceptions();
        
        // Demonstrate divide exceptions
        demonstrateDivideExceptions();
        
        // Demonstrate re-throwing
        demonstrateReThrow();
        
        // Demonstrate account exceptions
        demonstrateAccountExceptions();
        
        System.out.println("\n💡 throw Keyword:");
        System.out.println("   Syntax: throw new ExceptionType(\"message\");");
        System.out.println("   ");
        System.out.println("   Examples:");
        System.out.println("   throw new IllegalArgumentException(\"Invalid input\");");
        System.out.println("   throw new NullPointerException(\"Object is null\");");
        System.out.println("   throw new ArithmeticException(\"Division by zero\");");
        
        System.out.println("\n💡 When to Throw Exceptions:");
        System.out.println("   ✅ Invalid method arguments");
        System.out.println("   ✅ Invalid object state");
        System.out.println("   ✅ Operation cannot complete");
        System.out.println("   ✅ Preconditions not met");
        System.out.println("   ✅ Business rule violations");
        
        System.out.println("\n💡 Re-throwing Exceptions:");
        System.out.println("   catch (Exception e) {");
        System.out.println("       // Log or process");
        System.out.println("       throw e;  // Re-throw same");
        System.out.println("       // OR");
        System.out.println("       throw new CustomException(\"message\", e);  // Wrap");
        System.out.println("   }");
        
        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== THROWING EXCEPTIONS =====

--- Throwing Exceptions Demo ---

Validating age: 25
✅ Age is valid

Validating age: -5
❌ Age cannot be negative: -5

Validating age: 200
❌ Age too high: 200

Validating age: 15
❌ Must be 18 or older: 15

--- Divide Exceptions Demo ---

Dividing 10 by 2
✅ Result: 5.0

Dividing 10 by 0
❌ ArithmeticException: Cannot divide by zero

Dividing -10 by 5
❌ IllegalArgumentException: Negative numbers not allowed

--- Re-throwing Exceptions Demo ---

Processing: 123
✅ Parsed value: 123

Processing: abc
❌ Invalid number format
❌ Caught: Cannot parse data: abc
   Caused by: NumberFormatException

Processing: null
❌ Caught: Data is null

Processing: 
❌ Caught: Data is empty

--- Account Exceptions Demo ---

Withdrawing $500.0
Current balance: $1000.0
✅ Withdrawal successful
   New balance: $500.0

Withdrawing $600.0
Current balance: $500.0
❌ Insufficient funds: Balance=$500.0, Requested=$600.0

Withdrawing $-100.0
Current balance: $500.0
❌ Amount must be positive

💡 throw Keyword:
   Syntax: throw new ExceptionType("message");
   
   Examples:
   throw new IllegalArgumentException("Invalid input");
   throw new NullPointerException("Object is null");
   throw new ArithmeticException("Division by zero");

💡 When to Throw Exceptions:
   ✅ Invalid method arguments
   ✅ Invalid object state
   ✅ Operation cannot complete
   ✅ Preconditions not met
   ✅ Business rule violations

💡 Re-throwing Exceptions:
   catch (Exception e) {
       // Log or process
       throw e;  // Re-throw same
       // OR
       throw new CustomException("message", e);  // Wrap
   }

===============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **throw** | Explicitly throw an exception |
| **Validation** | Check conditions before proceeding |
| **Re-throwing** | Catch and throw again |
| **Wrapping** | Wrap in new exception with context |

**✅ Success Criteria:**
- [ ] Can throw exceptions explicitly
- [ ] Validate method parameters
- [ ] Re-throw exceptions with context
- [ ] Choose appropriate exception types
- [ ] Provide clear error messages

**🎯 Challenge:**
1. Create validation method for email
2. Throw custom exceptions
3. Add exception chaining
4. Create guard clauses for methods

---

#### Exercise 3: Declaring Exceptions (throws keyword) (20 minutes)

**What you'll learn:** How to declare that a method might throw exceptions using the throws keyword

**Create class: `DeclaringExceptionsDemo`**

**Concept:** Use `throws` keyword in method signature to declare checked exceptions that might be thrown.

```java
import java.io.*;

public class DeclaringExceptionsDemo {
    
    // Method declares it might throw checked exception
    static void readFile(String filename) throws IOException {
        System.out.println("\nAttempting to read: " + filename);
        
        FileReader reader = new FileReader(filename);
        BufferedReader bufferedReader = new BufferedReader(reader);
        
        String line = bufferedReader.readLine();
        System.out.println("First line: " + line);
        
        bufferedReader.close();
        System.out.println("✅ File read successfully");
    }
    
    // Method declares multiple exceptions
    static int parseAndValidate(String input) throws NumberFormatException, IllegalArgumentException {
        System.out.println("\nParsing: " + input);
        
        if (input == null || input.trim().isEmpty()) {
            throw new IllegalArgumentException("Input cannot be empty");
        }
        
        int value = Integer.parseInt(input);  // Can throw NumberFormatException
        
        if (value < 0) {
            throw new IllegalArgumentException("Value must be positive");
        }
        
        System.out.println("✅ Parsed value: " + value);
        return value;
    }
    
    // Method that calls another method with throws
    static void processFile(String filename) {
        try {
            readFile(filename);  // Must handle IOException
        } catch (IOException e) {
            System.out.println("❌ IOException: " + e.getMessage());
        }
    }
    
    // Method that propagates exception
    static void validateAndProcess(String input) throws IllegalArgumentException {
        // Exception propagates to caller
        int value = parseAndValidate(input);
        System.out.println("Processing value: " + value);
    }
    
    // Method with custom checked exception
    static class InvalidDataException extends Exception {
        public InvalidDataException(String message) {
            super(message);
        }
    }
    
    static void validateData(String data) throws InvalidDataException {
        System.out.println("\nValidating data: " + data);
        
        if (data == null) {
            throw new InvalidDataException("Data is null");
        }
        
        if (data.length() < 5) {
            throw new InvalidDataException("Data too short (minimum 5 characters)");
        }
        
        if (!data.matches("[a-zA-Z0-9]+")) {
            throw new InvalidDataException("Data contains invalid characters");
        }
        
        System.out.println("✅ Data is valid");
    }
    
    // Demonstrating throws vs throw
    static void demonstrateThrowsVsThrow() {
        System.out.println("\n--- throws vs throw ---");
        
        System.out.println("\n'throws' keyword:");
        System.out.println("  - Used in method signature");
        System.out.println("  - Declares exceptions method might throw");
        System.out.println("  - Example: void method() throws IOException");
        
        System.out.println("\n'throw' keyword:");
        System.out.println("  - Used in method body");
        System.out.println("  - Actually throws an exception");
        System.out.println("  - Example: throw new IOException(\"error\")");
        
        System.out.println("\nExample:");
        System.out.println("  void readFile() throws IOException {  // declares");
        System.out.println("      if (error) {");
        System.out.println("          throw new IOException();  // throws");
        System.out.println("      }");
        System.out.println("  }");
    }
    
    // Demonstrating exception propagation
    static void level3() throws IOException {
        System.out.println("  Level 3: Throwing exception");
        throw new IOException("Error at level 3");
    }
    
    static void level2() throws IOException {
        System.out.println("  Level 2: Calling level 3");
        level3();  // Propagates exception
    }
    
    static void level1() {
        System.out.println("  Level 1: Calling level 2");
        try {
            level2();  // Must handle exception
        } catch (IOException e) {
            System.out.println("  Level 1: Caught exception from level 3");
            System.out.println("  Message: " + e.getMessage());
        }
    }
    
    static void demonstratePropagation() {
        System.out.println("\n--- Exception Propagation ---");
        System.out.println("Call stack: level1 → level2 → level3");
        level1();
        System.out.println("✅ Exception handled at level 1");
    }
    
    public static void main(String[] args) {
        System.out.println("===== DECLARING EXCEPTIONS (throws) =====\n");
        
        // Demonstrate file reading
        System.out.println("--- File Reading Demo ---");
        processFile("test.txt");
        processFile("nonexistent.txt");
        
        // Demonstrate parsing with throws
        System.out.println("\n--- Parsing Demo ---");
        String[] inputs = {"123", "abc", "", "-5"};
        
        for (String input : inputs) {
            try {
                validateAndProcess(input);
            } catch (IllegalArgumentException e) {
                System.out.println("❌ " + e.getMessage());
            } catch (NumberFormatException e) {
                System.out.println("❌ NumberFormatException: Invalid number");
            }
        }
        
        // Demonstrate custom checked exception
        System.out.println("\n--- Custom Checked Exception Demo ---");
        String[] testData = {"ValidData123", "abc", null, "Data@#$"};
        
        for (String data : testData) {
            try {
                validateData(data);
            } catch (InvalidDataException e) {
                System.out.println("❌ " + e.getMessage());
            }
        }
        
        // Demonstrate throws vs throw
        demonstrateThrowsVsThrow();
        
        // Demonstrate propagation
        demonstratePropagation();
        
        System.out.println("\n💡 throws Keyword Rules:");
        System.out.println("   ✅ Used in method signature");
        System.out.println("   ✅ Declares checked exceptions");
        System.out.println("   ✅ Multiple exceptions: throws Ex1, Ex2");
        System.out.println("   ✅ Caller must handle or declare");
        System.out.println("   ❌ Not needed for unchecked exceptions");
        
        System.out.println("\n💡 When to Use throws:");
        System.out.println("   ✅ Method can't handle exception itself");
        System.out.println("   ✅ Let caller decide how to handle");
        System.out.println("   ✅ Exception is part of method contract");
        System.out.println("   ✅ Propagate to higher level");
        
        System.out.println("\n💡 Checked vs Unchecked:");
        System.out.println("   Checked (must declare with throws):");
        System.out.println("   - IOException");
        System.out.println("   - SQLException");
        System.out.println("   - Custom exceptions extending Exception");
        System.out.println("   ");
        System.out.println("   Unchecked (optional to declare):");
        System.out.println("   - RuntimeException and subclasses");
        System.out.println("   - NullPointerException");
        System.out.println("   - IllegalArgumentException");
        
        System.out.println("\n=========================================");
    }
}
```

**Expected Output:**
```
===== DECLARING EXCEPTIONS (throws) =====

--- File Reading Demo ---

Attempting to read: test.txt
❌ IOException: test.txt (No such file or directory)

Attempting to read: nonexistent.txt
❌ IOException: nonexistent.txt (No such file or directory)

--- Parsing Demo ---

Parsing: 123
✅ Parsed value: 123
Processing value: 123

Parsing: abc
❌ NumberFormatException: Invalid number

Parsing: 
❌ Input cannot be empty

Parsing: -5
✅ Parsed value: -5
❌ Value must be positive

--- Custom Checked Exception Demo ---

Validating data: ValidData123
✅ Data is valid

Validating data: abc
❌ Data too short (minimum 5 characters)

Validating data: null
❌ Data is null

Validating data: Data@#$
❌ Data contains invalid characters

--- throws vs throw ---

'throws' keyword:
  - Used in method signature
  - Declares exceptions method might throw
  - Example: void method() throws IOException

'throw' keyword:
  - Used in method body
  - Actually throws an exception
  - Example: throw new IOException("error")

Example:
  void readFile() throws IOException {  // declares
      if (error) {
          throw new IOException();  // throws
      }
  }

--- Exception Propagation ---
Call stack: level1 → level2 → level3
  Level 1: Calling level 2
  Level 2: Calling level 3
  Level 3: Throwing exception
  Level 1: Caught exception from level 3
  Message: Error at level 3
✅ Exception handled at level 1

💡 throws Keyword Rules:
   ✅ Used in method signature
   ✅ Declares checked exceptions
   ✅ Multiple exceptions: throws Ex1, Ex2
   ✅ Caller must handle or declare
   ❌ Not needed for unchecked exceptions

💡 When to Use throws:
   ✅ Method can't handle exception itself
   ✅ Let caller decide how to handle
   ✅ Exception is part of method contract
   ✅ Propagate to higher level

💡 Checked vs Unchecked:
   Checked (must declare with throws):
   - IOException
   - SQLException
   - Custom exceptions extending Exception
   
   Unchecked (optional to declare):
   - RuntimeException and subclasses
   - NullPointerException
   - IllegalArgumentException

=========================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **throws** | Declares exceptions in signature |
| **Propagation** | Exception moves up call stack |
| **Checked Exception** | Must be declared or handled |
| **Method Contract** | Declares what can go wrong |

**✅ Success Criteria:**
- [ ] Can use throws keyword correctly
- [ ] Understand exception propagation
- [ ] Know when to use throws
- [ ] Differentiate throws vs throw
- [ ] Handle or declare checked exceptions

**🎯 Challenge:**
1. Create method chain with exception propagation
2. Mix checked and unchecked exceptions
3. Create custom checked exception
4. Demonstrate proper exception handling at different levels

---

#### Exercise 4: Exception Propagation & Best Practices (25 minutes)

**What you'll learn:** How exceptions propagate through the call stack and best practices for exception handling

**Create class: `ExceptionBestPracticesDemo`**

**Concept:** Understanding exception flow and applying industry best practices.

```java
import java.io.*;
import java.util.*;

public class ExceptionBestPracticesDemo {
    
    // ❌ BAD: Catching Exception (too broad)
    static void badPractice1() {
        System.out.println("\n❌ BAD: Catching Exception");
        try {
            String str = null;
            str.length();
        } catch (Exception e) {
            System.out.println("Caught exception (too broad!)");
        }
    }
    
    // ✅ GOOD: Catching specific exception
    static void goodPractice1() {
        System.out.println("\n✅ GOOD: Catching specific exception");
        try {
            String str = null;
            str.length();
        } catch (NullPointerException e) {
            System.out.println("Caught NullPointerException (specific!)");
        }
    }
    
    // ❌ BAD: Empty catch block
    static void badPractice2() {
        System.out.println("\n❌ BAD: Empty catch block");
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            // Silent failure - very bad!
        }
        System.out.println("Error was silently ignored");
    }
    
    // ✅ GOOD: Proper error handling
    static void goodPractice2() {
        System.out.println("\n✅ GOOD: Proper error handling");
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
            // Log the error
            System.out.println("Logged to error log");
        }
    }
    
    // ❌ BAD: Using exceptions for control flow
    static void badPractice3() {
        System.out.println("\n❌ BAD: Using exceptions for control flow");
        try {
            for (int i = 0; ; i++) {
                int[] arr = {1, 2, 3};
                System.out.print(arr[i] + " ");
            }
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("\nUsed exception to exit loop (bad!)");
        }
    }
    
    // ✅ GOOD: Proper loop control
    static void goodPractice3() {
        System.out.println("\n✅ GOOD: Proper loop control");
        int[] arr = {1, 2, 3};
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println("\nUsed proper loop condition");
    }
    
    // ❌ BAD: Losing exception information
    static void badPractice4() {
        System.out.println("\n❌ BAD: Losing exception information");
        try {
            throw new IOException("Original error");
        } catch (IOException e) {
            throw new RuntimeException("New error");  // Lost original!
        }
    }
    
    // ✅ GOOD: Preserving exception chain
    static void goodPractice4() {
        System.out.println("\n✅ GOOD: Preserving exception chain");
        try {
            throw new IOException("Original error");
        } catch (IOException e) {
            throw new RuntimeException("New error", e);  // Preserved!
        }
    }
    
    // ✅ GOOD: Proper resource cleanup
    static void goodPractice5() {
        System.out.println("\n✅ GOOD: Proper resource cleanup");
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new StringReader("test data"));
            String line = reader.readLine();
            System.out.println("Read: " + line);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                    System.out.println("Resource closed properly");
                } catch (IOException e) {
                    System.out.println("Error closing resource");
                }
            }
        }
    }
    
    // Demonstrating exception propagation
    static void methodC() throws Exception {
        System.out.println("    Method C: Throwing exception");
        throw new Exception("Error in method C");
    }
    
    static void methodB() throws Exception {
        System.out.println("  Method B: Calling method C");
        methodC();  // Exception propagates up
        System.out.println("  Method B: This won't execute");
    }
    
    static void methodA() {
        System.out.println("Method A: Calling method B");
        try {
            methodB();
        } catch (Exception e) {
            System.out.println("Method A: Caught exception from C");
            System.out.println("  Message: " + e.getMessage());
            
            // Print stack trace
            System.out.println("  Stack trace:");
            for (StackTraceElement element : e.getStackTrace()) {
                System.out.println("    at " + element);
            }
        }
    }
    
    static void demonstratePropagation() {
        System.out.println("\n--- Exception Propagation Demo ---");
        System.out.println("Call chain: A → B → C");
        methodA();
    }
    
    // Best practices summary
    static void demonstrateBestPractices() {
        System.out.println("\n--- Best Practices Comparison ---");
        
        // Bad vs Good practice 1
        badPractice1();
        goodPractice1();
        
        // Bad vs Good practice 2
        badPractice2();
        goodPractice2();
        
        // Bad vs Good practice 3
        badPractice3();
        goodPractice3();
        
        // Good practice 5
        goodPractice5();
    }
    
    public static void main(String[] args) {
        System.out.println("===== EXCEPTION BEST PRACTICES =====\n");
        
        // Demonstrate best practices
        demonstrateBestPractices();
        
        // Demonstrate propagation
        demonstratePropagation();
        
        System.out.println("\n💡 Exception Handling Best Practices:");
        System.out.println("\n✅ DO:");
        System.out.println("   1. Catch specific exceptions");
        System.out.println("   2. Provide meaningful error messages");
        System.out.println("   3. Log exceptions properly");
        System.out.println("   4. Clean up resources in finally");
        System.out.println("   5. Preserve exception chain");
        System.out.println("   6. Document exceptions in JavaDoc");
        System.out.println("   7. Fail fast (detect errors early)");
        System.out.println("   8. Use custom exceptions for domain errors");
        
        System.out.println("\n❌ DON'T:");
        System.out.println("   1. Catch Exception (too broad)");
        System.out.println("   2. Use empty catch blocks");
        System.out.println("   3. Use exceptions for control flow");
        System.out.println("   4. Ignore exceptions");
        System.out.println("   5. Lose exception information");
        System.out.println("   6. Catch Throwable or Error");
        System.out.println("   7. Return null instead of throwing");
        System.out.println("   8. Swallow exceptions without logging");
        
        System.out.println("\n💡 Exception Propagation:");
        System.out.println("   1. Exception thrown in method C");
        System.out.println("   2. Propagates to method B (if not caught)");
        System.out.println("   3. Propagates to method A (if not caught)");
        System.out.println("   4. Continues until caught or program terminates");
        System.out.println("   5. Stack trace shows propagation path");
        
        System.out.println("\n💡 When to Catch vs Propagate:");
        System.out.println("   Catch when:");
        System.out.println("   - You can handle the error");
        System.out.println("   - You can recover from the error");
        System.out.println("   - You need to clean up resources");
        System.out.println("   ");
        System.out.println("   Propagate when:");
        System.out.println("   - You can't handle the error");
        System.out.println("   - Caller is better positioned to handle");
        System.out.println("   - Error is part of method contract");
        
        System.out.println("\n💡 Logging Best Practices:");
        System.out.println("   logger.error(\"Error message\", exception);");
        System.out.println("   - Include context information");
        System.out.println("   - Log at appropriate level");
        System.out.println("   - Include stack trace");
        System.out.println("   - Don't log and rethrow (duplicate logs)");
        
        System.out.println("\n====================================");
    }
}
```

**Expected Output:**
```
===== EXCEPTION BEST PRACTICES =====

--- Best Practices Comparison ---

❌ BAD: Catching Exception
Caught exception (too broad!)

✅ GOOD: Catching specific exception
Caught NullPointerException (specific!)

❌ BAD: Empty catch block
Error was silently ignored

✅ GOOD: Proper error handling
Error: / by zero
Logged to error log

❌ BAD: Using exceptions for control flow
1 2 3 
Used exception to exit loop (bad!)

✅ GOOD: Proper loop control
1 2 3 
Used proper loop condition

✅ GOOD: Proper resource cleanup
Read: test data
Resource closed properly

--- Exception Propagation Demo ---
Call chain: A → B → C
Method A: Calling method B
  Method B: Calling method C
    Method C: Throwing exception
Method A: Caught exception from C
  Message: Error in method C
  Stack trace:
    at ExceptionBestPracticesDemo.methodC(ExceptionBestPracticesDemo.java:XX)
    at ExceptionBestPracticesDemo.methodB(ExceptionBestPracticesDemo.java:XX)
    at ExceptionBestPracticesDemo.methodA(ExceptionBestPracticesDemo.java:XX)

💡 Exception Handling Best Practices:

✅ DO:
   1. Catch specific exceptions
   2. Provide meaningful error messages
   3. Log exceptions properly
   4. Clean up resources in finally
   5. Preserve exception chain
   6. Document exceptions in JavaDoc
   7. Fail fast (detect errors early)
   8. Use custom exceptions for domain errors

❌ DON'T:
   1. Catch Exception (too broad)
   2. Use empty catch blocks
   3. Use exceptions for control flow
   4. Ignore exceptions
   5. Lose exception information
   6. Catch Throwable or Error
   7. Return null instead of throwing
   8. Swallow exceptions without logging

💡 Exception Propagation:
   1. Exception thrown in method C
   2. Propagates to method B (if not caught)
   3. Propagates to method A (if not caught)
   4. Continues until caught or program terminates
   5. Stack trace shows propagation path

💡 When to Catch vs Propagate:
   Catch when:
   - You can handle the error
   - You can recover from the error
   - You need to clean up resources
   
   Propagate when:
   - You can't handle the error
   - Caller is better positioned to handle
   - Error is part of method contract

💡 Logging Best Practices:
   logger.error("Error message", exception);
   - Include context information
   - Log at appropriate level
   - Include stack trace
   - Don't log and rethrow (duplicate logs)

====================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Specific Exceptions** | Catch exact exception type |
| **Exception Chain** | Preserve original exception |
| **Propagation** | Exception moves up call stack |
| **Resource Cleanup** | Always clean up in finally |

**✅ Success Criteria:**
- [ ] Understand exception propagation
- [ ] Know best practices
- [ ] Avoid common mistakes
- [ ] Can write clean exception handling code
- [ ] Understand when to catch vs propagate

**🎯 Challenge:**
1. Identify bad practices in existing code
2. Refactor to use best practices
3. Add proper logging
4. Create exception handling guidelines document

---


#### Exercise 5: Try-with-Resources (Java 7+) (25 minutes)

**What you'll learn:** Automatic resource management using try-with-resources statement

**Create class: `TryWithResourcesDemo`**

**Concept:** Try-with-resources automatically closes resources that implement AutoCloseable, eliminating the need for explicit finally blocks.

```java
import java.io.*;
import java.util.Scanner;

public class TryWithResourcesDemo {
    
    // Custom resource class
    static class CustomResource implements AutoCloseable {
        private String name;
        
        public CustomResource(String name) {
            this.name = name;
            System.out.println("  Opening resource: " + name);
        }
        
        public void doWork() {
            System.out.println("  Working with resource: " + name);
        }
        
        @Override
        public void close() {
            System.out.println("  Closing resource: " + name);
        }
    }
    
    // ❌ OLD WAY: Manual resource management
    static void oldWayManualClose() {
        System.out.println("\n--- OLD WAY: Manual Close ---");
        
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new StringReader("Line 1\nLine 2\nLine 3"));
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Read: " + line);
            }
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
            
        } finally {
            // Must manually close
            if (reader != null) {
                try {
                    reader.close();
                    System.out.println("✅ Resource closed manually");
                } catch (IOException e) {
                    System.out.println("Error closing resource");
                }
            }
        }
    }
    
    // ✅ NEW WAY: Try-with-resources
    static void newWayAutoClose() {
        System.out.println("\n--- NEW WAY: Try-with-Resources ---");
        
        try (BufferedReader reader = new BufferedReader(
                new StringReader("Line 1\nLine 2\nLine 3"))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Read: " + line);
            }
            
            // Resource automatically closed here
            System.out.println("✅ Resource will auto-close");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // No finally needed!
    }
    
    // Multiple resources
    static void multipleResources() {
        System.out.println("\n--- Multiple Resources ---");
        
        try (
            BufferedReader reader1 = new BufferedReader(new StringReader("Data 1"));
            BufferedReader reader2 = new BufferedReader(new StringReader("Data 2"));
            BufferedWriter writer = new BufferedWriter(new StringWriter())
        ) {
            System.out.println("Read 1: " + reader1.readLine());
            System.out.println("Read 2: " + reader2.readLine());
            writer.write("Output");
            System.out.println("✅ All operations completed");
            
            // All resources closed automatically in reverse order
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        System.out.println("✅ All resources auto-closed (reverse order)");
    }
    
    // Custom resource with try-with-resources
    static void customResourceDemo() {
        System.out.println("\n--- Custom Resource Demo ---");
        
        try (CustomResource resource = new CustomResource("MyResource")) {
            resource.doWork();
            System.out.println("✅ Work completed");
        }
        // close() called automatically
        System.out.println("✅ Resource auto-closed");
    }
    
    // Multiple custom resources
    static void multipleCustomResources() {
        System.out.println("\n--- Multiple Custom Resources ---");
        
        try (
            CustomResource r1 = new CustomResource("Resource-1");
            CustomResource r2 = new CustomResource("Resource-2");
            CustomResource r3 = new CustomResource("Resource-3")
        ) {
            r1.doWork();
            r2.doWork();
            r3.doWork();
            System.out.println("✅ All work completed");
        }
        System.out.println("✅ All resources auto-closed (reverse order)");
    }
    
    // Exception during resource creation
    static void exceptionDuringCreation() {
        System.out.println("\n--- Exception During Creation ---");
        
        try (
            CustomResource r1 = new CustomResource("Resource-1");
            CustomResource r2 = new CustomResource("Resource-2");
            // Simulate exception
            CustomResource r3 = createResourceWithError()
        ) {
            System.out.println("This won't execute");
            
        } catch (Exception e) {
            System.out.println("❌ Caught: " + e.getMessage());
        }
        System.out.println("✅ Successfully created resources were closed");
    }
    
    static CustomResource createResourceWithError() throws Exception {
        throw new Exception("Failed to create resource");
    }
    
    // Exception during work
    static void exceptionDuringWork() {
        System.out.println("\n--- Exception During Work ---");
        
        try (CustomResource resource = new CustomResource("WorkResource")) {
            resource.doWork();
            throw new RuntimeException("Error during work");
            
        } catch (RuntimeException e) {
            System.out.println("❌ Caught: " + e.getMessage());
        }
        System.out.println("✅ Resource still auto-closed despite exception");
    }
    
    // Suppressed exceptions
    static class ProblematicResource implements AutoCloseable {
        @Override
        public void close() throws Exception {
            throw new Exception("Error closing resource");
        }
    }
    
    static void suppressedExceptions() {
        System.out.println("\n--- Suppressed Exceptions ---");
        
        try (ProblematicResource resource = new ProblematicResource()) {
            throw new Exception("Error during work");
            
        } catch (Exception e) {
            System.out.println("❌ Primary exception: " + e.getMessage());
            
            // Check for suppressed exceptions
            Throwable[] suppressed = e.getSuppressed();
            if (suppressed.length > 0) {
                System.out.println("   Suppressed exceptions:");
                for (Throwable t : suppressed) {
                    System.out.println("   - " + t.getMessage());
                }
            }
        }
    }
    
    // Real-world example: File operations
    static void fileOperationsExample() {
        System.out.println("\n--- File Operations Example ---");
        
        // Create temporary file content
        String content = "Line 1\nLine 2\nLine 3";
        
        // Read and process
        try (
            BufferedReader reader = new BufferedReader(new StringReader(content));
            StringWriter stringWriter = new StringWriter();
            BufferedWriter writer = new BufferedWriter(stringWriter)
        ) {
            String line;
            int lineNumber = 1;
            
            while ((line = reader.readLine()) != null) {
                String processed = lineNumber + ": " + line.toUpperCase();
                writer.write(processed);
                writer.newLine();
                lineNumber++;
            }
            
            writer.flush();
            System.out.println("Processed content:");
            System.out.println(stringWriter.toString());
            System.out.println("✅ File operations completed");
            
        } catch (IOException e) {
            System.out.println("❌ Error: " + e.getMessage());
        }
        System.out.println("✅ All resources auto-closed");
    }
    
    public static void main(String[] args) {
        System.out.println("===== TRY-WITH-RESOURCES =====\n");
        
        // Compare old vs new way
        oldWayManualClose();
        newWayAutoClose();
        
        // Multiple resources
        multipleResources();
        
        // Custom resources
        customResourceDemo();
        multipleCustomResources();
        
        // Exception scenarios
        exceptionDuringCreation();
        exceptionDuringWork();
        suppressedExceptions();
        
        // Real-world example
        fileOperationsExample();
        
        System.out.println("\n💡 Try-with-Resources Benefits:");
        System.out.println("   ✅ Automatic resource cleanup");
        System.out.println("   ✅ No explicit finally needed");
        System.out.println("   ✅ Cleaner, more readable code");
        System.out.println("   ✅ Resources closed in reverse order");
        System.out.println("   ✅ Handles suppressed exceptions");
        System.out.println("   ✅ Prevents resource leaks");
        
        System.out.println("\n💡 Syntax:");
        System.out.println("   try (Resource r = new Resource()) {");
        System.out.println("       // Use resource");
        System.out.println("   } catch (Exception e) {");
        System.out.println("       // Handle exception");
        System.out.println("   }");
        System.out.println("   // Resource automatically closed");
        
        System.out.println("\n💡 Multiple Resources:");
        System.out.println("   try (");
        System.out.println("       Resource r1 = new Resource1();");
        System.out.println("       Resource r2 = new Resource2()");
        System.out.println("   ) {");
        System.out.println("       // Use resources");
        System.out.println("   }");
        System.out.println("   // Closed in reverse: r2, then r1");
        
        System.out.println("\n💡 Requirements:");
        System.out.println("   - Resource must implement AutoCloseable");
        System.out.println("   - Or implement Closeable (extends AutoCloseable)");
        System.out.println("   - close() method called automatically");
        System.out.println("   - Works with any AutoCloseable resource");
        
        System.out.println("\n💡 Common AutoCloseable Resources:");
        System.out.println("   - BufferedReader/Writer");
        System.out.println("   - FileInputStream/OutputStream");
        System.out.println("   - Scanner");
        System.out.println("   - Connection (JDBC)");
        System.out.println("   - Statement/ResultSet (JDBC)");
        System.out.println("   - Socket");
        
        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== TRY-WITH-RESOURCES =====

--- OLD WAY: Manual Close ---
Read: Line 1
Read: Line 2
Read: Line 3
✅ Resource closed manually

--- NEW WAY: Try-with-Resources ---
Read: Line 1
Read: Line 2
Read: Line 3
✅ Resource will auto-close

--- Multiple Resources ---
Read 1: Data 1
Read 2: Data 2
✅ All operations completed
✅ All resources auto-closed (reverse order)

--- Custom Resource Demo ---
  Opening resource: MyResource
  Working with resource: MyResource
✅ Work completed
  Closing resource: MyResource
✅ Resource auto-closed

--- Multiple Custom Resources ---
  Opening resource: Resource-1
  Opening resource: Resource-2
  Opening resource: Resource-3
  Working with resource: Resource-1
  Working with resource: Resource-2
  Working with resource: Resource-3
✅ All work completed
  Closing resource: Resource-3
  Closing resource: Resource-2
  Closing resource: Resource-1
✅ All resources auto-closed (reverse order)

--- Exception During Creation ---
  Opening resource: Resource-1
  Opening resource: Resource-2
  Closing resource: Resource-2
  Closing resource: Resource-1
❌ Caught: Failed to create resource
✅ Successfully created resources were closed

--- Exception During Work ---
  Opening resource: WorkResource
  Working with resource: WorkResource
  Closing resource: WorkResource
❌ Caught: Error during work
✅ Resource still auto-closed despite exception

--- Suppressed Exceptions ---
❌ Primary exception: Error during work
   Suppressed exceptions:
   - Error closing resource

--- File Operations Example ---
Processed content:
1: LINE 1
2: LINE 2
3: LINE 3

✅ File operations completed
✅ All resources auto-closed

💡 Try-with-Resources Benefits:
   ✅ Automatic resource cleanup
   ✅ No explicit finally needed
   ✅ Cleaner, more readable code
   ✅ Resources closed in reverse order
   ✅ Handles suppressed exceptions
   ✅ Prevents resource leaks

💡 Syntax:
   try (Resource r = new Resource()) {
       // Use resource
   } catch (Exception e) {
       // Handle exception
   }
   // Resource automatically closed

💡 Multiple Resources:
   try (
       Resource r1 = new Resource1();
       Resource r2 = new Resource2()
   ) {
       // Use resources
   }
   // Closed in reverse: r2, then r1

💡 Requirements:
   - Resource must implement AutoCloseable
   - Or implement Closeable (extends AutoCloseable)
   - close() method called automatically
   - Works with any AutoCloseable resource

💡 Common AutoCloseable Resources:
   - BufferedReader/Writer
   - FileInputStream/OutputStream
   - Scanner
   - Connection (JDBC)
   - Statement/ResultSet (JDBC)
   - Socket

==============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Try-with-Resources** | Automatic resource management |
| **AutoCloseable** | Interface for auto-closeable resources |
| **Reverse Order** | Resources closed in reverse creation order |
| **Suppressed Exceptions** | Exceptions during close() |

**✅ Success Criteria:**
- [ ] Understand try-with-resources syntax
- [ ] Can use with multiple resources
- [ ] Know AutoCloseable interface
- [ ] Understand resource closing order
- [ ] Can create custom AutoCloseable resources

**🎯 Challenge:**
1. Create custom AutoCloseable database connection
2. Use try-with-resources for file operations
3. Handle multiple resources with exceptions
4. Create resource pool with AutoCloseable

---

#### Exercise 6: Complete Exception Handling System (30 minutes)

**What you'll learn:** Building a complete, production-ready exception handling system

**Create class: `CompleteExceptionSystem`**

**Concept:** Combining all exception handling concepts into a real-world application.

```java
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class CompleteExceptionSystem {
    
    // ========== CUSTOM EXCEPTIONS ==========
    
    static class ValidationException extends Exception {
        private String field;
        private Object value;
        
        public ValidationException(String field, Object value, String message) {
            super(message);
            this.field = field;
            this.value = value;
        }
        
        public String getField() { return field; }
        public Object getValue() { return value; }
        
        @Override
        public String toString() {
            return String.format("ValidationException[field=%s, value=%s, message=%s]",
                field, value, getMessage());
        }
    }
    
    static class BusinessException extends Exception {
        private String errorCode;
        
        public BusinessException(String errorCode, String message) {
            super(message);
            this.errorCode = errorCode;
        }
        
        public BusinessException(String errorCode, String message, Throwable cause) {
            super(message, cause);
            this.errorCode = errorCode;
        }
        
        public String getErrorCode() { return errorCode; }
    }
    
    static class DataAccessException extends RuntimeException {
        public DataAccessException(String message, Throwable cause) {
            super(message, cause);
        }
    }
    
    // ========== LOGGING SYSTEM ==========
    
    static class Logger {
        private static final DateTimeFormatter formatter = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        public static void info(String message) {
            log("INFO", message, null);
        }
        
        public static void error(String message, Throwable e) {
            log("ERROR", message, e);
        }
        
        public static void warn(String message) {
            log("WARN", message, null);
        }
        
        private static void log(String level, String message, Throwable e) {
            String timestamp = LocalDateTime.now().format(formatter);
            System.out.println(String.format("[%s] %s: %s", timestamp, level, message));
            
            if (e != null) {
                System.out.println("  Exception: " + e.getClass().getSimpleName());
                System.out.println("  Message: " + e.getMessage());
                if (e.getCause() != null) {
                    System.out.println("  Caused by: " + e.getCause().getMessage());
                }
            }
        }
    }
    
    // ========== DOMAIN MODEL ==========
    
    static class User {
        private String username;
        private String email;
        private int age;
        
        public User(String username, String email, int age) {
            this.username = username;
            this.email = email;
            this.age = age;
        }
        
        public String getUsername() { return username; }
        public String getEmail() { return email; }
        public int getAge() { return age; }
        
        @Override
        public String toString() {
            return String.format("User[username=%s, email=%s, age=%d]",
                username, email, age);
        }
    }
    
    // ========== VALIDATION SERVICE ==========
    
    static class ValidationService {
        
        public static void validateUser(String username, String email, int age) 
                throws ValidationException {
            
            // Validate username
            if (username == null || username.trim().isEmpty()) {
                throw new ValidationException("username", username, 
                    "Username cannot be empty");
            }
            
            if (username.length() < 3) {
                throw new ValidationException("username", username,
                    "Username must be at least 3 characters");
            }
            
            // Validate email
            if (email == null || !email.contains("@")) {
                throw new ValidationException("email", email,
                    "Invalid email format");
            }
            
            // Validate age
            if (age < 0 || age > 150) {
                throw new ValidationException("age", age,
                    "Age must be between 0 and 150");
            }
            
            if (age < 18) {
                throw new ValidationException("age", age,
                    "User must be 18 or older");
            }
        }
    }
    
    // ========== DATA ACCESS LAYER ==========
    
    static class UserRepository {
        private static Map<String, User> database = new HashMap<>();
        
        public void save(User user) throws BusinessException {
            try {
                Logger.info("Saving user: " + user.getUsername());
                
                // Check if user exists
                if (database.containsKey(user.getUsername())) {
                    throw new BusinessException("USER_EXISTS",
                        "User already exists: " + user.getUsername());
                }
                
                // Simulate database operation
                database.put(user.getUsername(), user);
                Logger.info("User saved successfully");
                
            } catch (Exception e) {
                Logger.error("Failed to save user", e);
                throw new DataAccessException("Database error", e);
            }
        }
        
        public User findByUsername(String username) throws BusinessException {
            Logger.info("Finding user: " + username);
            
            User user = database.get(username);
            if (user == null) {
                throw new BusinessException("USER_NOT_FOUND",
                    "User not found: " + username);
            }
            
            return user;
        }
        
        public List<User> findAll() {
            return new ArrayList<>(database.values());
        }
    }
    
    // ========== SERVICE LAYER ==========
    
    static class UserService {
        private UserRepository repository = new UserRepository();
        
        public User registerUser(String username, String email, int age) {
            Logger.info("Registering user: " + username);
            
            try {
                // Validate input
                ValidationService.validateUser(username, email, age);
                
                // Create user
                User user = new User(username, email, age);
                
                // Save to database
                repository.save(user);
                
                Logger.info("User registered successfully: " + username);
                return user;
                
            } catch (ValidationException e) {
                Logger.error("Validation failed", e);
                System.out.println("❌ Validation Error: " + e.getMessage());
                System.out.println("   Field: " + e.getField());
                System.out.println("   Value: " + e.getValue());
                return null;
                
            } catch (BusinessException e) {
                Logger.error("Business rule violation", e);
                System.out.println("❌ Business Error [" + e.getErrorCode() + "]: " 
                    + e.getMessage());
                return null;
                
            } catch (DataAccessException e) {
                Logger.error("Data access error", e);
                System.out.println("❌ Database Error: " + e.getMessage());
                return null;
                
            } catch (Exception e) {
                Logger.error("Unexpected error", e);
                System.out.println("❌ Unexpected Error: " + e.getMessage());
                return null;
            }
        }
        
        public User getUser(String username) {
            try {
                return repository.findByUsername(username);
                
            } catch (BusinessException e) {
                Logger.warn("User not found: " + username);
                System.out.println("❌ " + e.getMessage());
                return null;
            }
        }
        
        public void displayAllUsers() {
            Logger.info("Displaying all users");
            List<User> users = repository.findAll();
            
            if (users.isEmpty()) {
                System.out.println("No users found");
            } else {
                System.out.println("\n📋 Registered Users:");
                for (User user : users) {
                    System.out.println("  - " + user);
                }
            }
        }
    }
    
    // ========== MAIN APPLICATION ==========
    
    public static void main(String[] args) {
        System.out.println("===== COMPLETE EXCEPTION HANDLING SYSTEM =====\n");
        
        UserService userService = new UserService();
        
        System.out.println("--- Test Case 1: Valid User ---");
        User user1 = userService.registerUser("john_doe", "john@email.com", 25);
        if (user1 != null) {
            System.out.println("✅ Success: " + user1);
        }
        
        System.out.println("\n--- Test Case 2: Invalid Username ---");
        User user2 = userService.registerUser("ab", "short@email.com", 30);
        
        System.out.println("\n--- Test Case 3: Invalid Email ---");
        User user3 = userService.registerUser("jane_doe", "invalid-email", 28);
        
        System.out.println("\n--- Test Case 4: Invalid Age ---");
        User user4 = userService.registerUser("bob_smith", "bob@email.com", 15);
        
        System.out.println("\n--- Test Case 5: Duplicate User ---");
        User user5 = userService.registerUser("john_doe", "john2@email.com", 30);
        
        System.out.println("\n--- Test Case 6: Valid User 2 ---");
        User user6 = userService.registerUser("alice_wonder", "alice@email.com", 22);
        if (user6 != null) {
            System.out.println("✅ Success: " + user6);
        }
        
        System.out.println("\n--- Test Case 7: Find Existing User ---");
        User found = userService.getUser("john_doe");
        if (found != null) {
            System.out.println("✅ Found: " + found);
        }
        
        System.out.println("\n--- Test Case 8: Find Non-Existing User ---");
        userService.getUser("nonexistent");
        
        System.out.println("\n--- Test Case 9: Display All Users ---");
        userService.displayAllUsers();
        
        System.out.println("\n💡 Exception Handling Architecture:");
        System.out.println("   ");
        System.out.println("   Presentation Layer (UI)");
        System.out.println("          ↓");
        System.out.println("   Service Layer (Business Logic)");
        System.out.println("          ↓");
        System.out.println("   Repository Layer (Data Access)");
        System.out.println("          ↓");
        System.out.println("   Database");
        System.out.println("   ");
        System.out.println("   Each layer handles appropriate exceptions");
        System.out.println("   Exceptions propagate up the stack");
        System.out.println("   Logging at each level");
        
        System.out.println("\n💡 Exception Types Used:");
        System.out.println("   ValidationException (Checked):");
        System.out.println("   - Input validation errors");
        System.out.println("   - Recoverable, user can fix");
        System.out.println("   ");
        System.out.println("   BusinessException (Checked):");
        System.out.println("   - Business rule violations");
        System.out.println("   - Domain-specific errors");
        System.out.println("   ");
        System.out.println("   DataAccessException (Unchecked):");
        System.out.println("   - Database/infrastructure errors");
        System.out.println("   - Usually not recoverable");
        
        System.out.println("\n💡 Best Practices Applied:");
        System.out.println("   ✅ Custom exceptions for domain errors");
        System.out.println("   ✅ Proper exception hierarchy");
        System.out.println("   ✅ Logging at all levels");
        System.out.println("   ✅ Specific exception handling");
        System.out.println("   ✅ Exception chaining");
        System.out.println("   ✅ Meaningful error messages");
        System.out.println("   ✅ Separation of concerns");
        System.out.println("   ✅ Fail-fast validation");
        
        System.out.println("\n==============================================");
    }
}
```

**Expected Output:**
```
===== COMPLETE EXCEPTION HANDLING SYSTEM =====

--- Test Case 1: Valid User ---
[2026-01-12 20:45:30] INFO: Registering user: john_doe
[2026-01-12 20:45:30] INFO: Saving user: john_doe
[2026-01-12 20:45:30] INFO: User saved successfully
[2026-01-12 20:45:30] INFO: User registered successfully: john_doe
✅ Success: User[username=john_doe, email=john@email.com, age=25]

--- Test Case 2: Invalid Username ---
[2026-01-12 20:45:30] INFO: Registering user: ab
[2026-01-12 20:45:30] ERROR: Validation failed
  Exception: ValidationException
  Message: Username must be at least 3 characters
❌ Validation Error: Username must be at least 3 characters
   Field: username
   Value: ab

--- Test Case 3: Invalid Email ---
[2026-01-12 20:45:30] INFO: Registering user: jane_doe
[2026-01-12 20:45:30] ERROR: Validation failed
  Exception: ValidationException
  Message: Invalid email format
❌ Validation Error: Invalid email format
   Field: email
   Value: invalid-email

--- Test Case 4: Invalid Age ---
[2026-01-12 20:45:30] INFO: Registering user: bob_smith
[2026-01-12 20:45:30] ERROR: Validation failed
  Exception: ValidationException
  Message: User must be 18 or older
❌ Validation Error: User must be 18 or older
   Field: age
   Value: 15

--- Test Case 5: Duplicate User ---
[2026-01-12 20:45:30] INFO: Registering user: john_doe
[2026-01-12 20:45:30] INFO: Saving user: john_doe
[2026-01-12 20:45:30] ERROR: Failed to save user
  Exception: BusinessException
  Message: User already exists: john_doe
[2026-01-12 20:45:30] ERROR: Business rule violation
  Exception: BusinessException
  Message: User already exists: john_doe
❌ Business Error [USER_EXISTS]: User already exists: john_doe

--- Test Case 6: Valid User 2 ---
[2026-01-12 20:45:30] INFO: Registering user: alice_wonder
[2026-01-12 20:45:30] INFO: Saving user: alice_wonder
[2026-01-12 20:45:30] INFO: User saved successfully
[2026-01-12 20:45:30] INFO: User registered successfully: alice_wonder
✅ Success: User[username=alice_wonder, email=alice@email.com, age=22]

--- Test Case 7: Find Existing User ---
[2026-01-12 20:45:30] INFO: Finding user: john_doe
✅ Found: User[username=john_doe, email=john@email.com, age=25]

--- Test Case 8: Find Non-Existing User ---
[2026-01-12 20:45:30] INFO: Finding user: nonexistent
[2026-01-12 20:45:30] WARN: User not found: nonexistent
❌ User not found: nonexistent

--- Test Case 9: Display All Users ---
[2026-01-12 20:45:30] INFO: Displaying all users

📋 Registered Users:
  - User[username=john_doe, email=john@email.com, age=25]
  - User[username=alice_wonder, email=alice@email.com, age=22]

💡 Exception Handling Architecture:
   
   Presentation Layer (UI)
          ↓
   Service Layer (Business Logic)
          ↓
   Repository Layer (Data Access)
          ↓
   Database
   
   Each layer handles appropriate exceptions
   Exceptions propagate up the stack
   Logging at each level

💡 Exception Types Used:
   ValidationException (Checked):
   - Input validation errors
   - Recoverable, user can fix
   
   BusinessException (Checked):
   - Business rule violations
   - Domain-specific errors
   
   DataAccessException (Unchecked):
   - Database/infrastructure errors
   - Usually not recoverable

💡 Best Practices Applied:
   ✅ Custom exceptions for domain errors
   ✅ Proper exception hierarchy
   ✅ Logging at all levels
   ✅ Specific exception handling
   ✅ Exception chaining
   ✅ Meaningful error messages
   ✅ Separation of concerns
   ✅ Fail-fast validation

==============================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
|

**Layered Architecture** | Separation of concerns |
| **Custom Exceptions** | Domain-specific error types |
| **Logging** | Track errors at all levels |
| **Validation** | Fail-fast input checking |

**✅ Success Criteria:**
- [ ] Understand complete exception handling system
- [ ] Can build layered architecture
- [ ] Implement custom exceptions properly
- [ ] Add comprehensive logging
- [ ] Handle errors at appropriate layers
- [ ] Create production-ready code

**🎯 Challenge:**
1. Add transaction management
2. Implement retry logic for failures
3. Add email notification for critical errors
4. Create exception handling middleware
5. Add metrics and monitoring
6. Implement circuit breaker pattern

---

### 🎓 Day 19 Summary: Exception Handling Advanced

**What You Learned:**
1. ✅ Creating custom exception classes
2. ✅ Throwing exceptions with throw keyword
3. ✅ Declaring exceptions with throws keyword
4. ✅ Exception propagation through call stack
5. ✅ Try-with-resources for automatic cleanup
6. ✅ Complete exception handling system

**Key Takeaways:**
- Custom exceptions provide domain-specific error handling
- throw keyword explicitly throws exceptions
- throws keyword declares what exceptions method might throw
- Exceptions propagate up the call stack until caught
- Try-with-resources automatically closes AutoCloseable resources
- Proper exception handling improves code reliability

**Exception Handling Complete Checklist:**
```
✅ Use specific exception types
✅ Create custom exceptions when needed
✅ Provide meaningful error messages
✅ Log exceptions properly
✅ Clean up resources (try-with-resources)
✅ Preserve exception chain
✅ Handle at appropriate layer
✅ Document exceptions in JavaDoc
✅ Fail fast (validate early)
✅ Don't catch Exception unless necessary
✅ Never use empty catch blocks
✅ Don't use exceptions for control flow
```

**Exception Hierarchy Summary:**
```
Throwable
├── Error (Don't catch)
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   ├── ArithmeticException
    │   └── ...
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── Custom Exceptions
```

**Try-with-Resources Pattern:**
```java
// Old way
Resource r = null;
try {
    r = new Resource();
    r.use();
} finally {
    if (r != null) r.close();
}

// New way (Java 7+)
try (Resource r = new Resource()) {
    r.use();
}  // Automatically closed
```

**Best Practices Applied:**
- ✅ Custom exceptions for domain errors
- ✅ Proper exception hierarchy
- ✅ Comprehensive logging
- ✅ Layered architecture
- ✅ Fail-fast validation
- ✅ Resource management
- ✅ Exception chaining
- ✅ Meaningful error messages

**Next Steps:**
- Day 20: Collections Framework (ArrayList, LinkedList, HashSet)
- Day 21: Collections Advanced (HashMap, TreeMap, Iterators)
- Day 22: File I/O (Reading and Writing Files)

---
