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
