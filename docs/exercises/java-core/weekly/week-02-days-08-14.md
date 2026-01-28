# Java Core - Week 2: Object-Oriented Programming Fundamentals (Days 8-14)

## Week Overview

This week introduces Object-Oriented Programming (OOP) concepts:
- Creating and using methods
- Method overloading and scope
- Understanding classes and objects
- Encapsulation (private fields, getters, setters)
- Inheritance (extends, super keyword)
- Polymorphism (method overriding)
- Abstract classes and abstraction

**Time Commitment:** ~14-16 hours (2 hours per day)

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

**Common Mistakes:**

1. ❌ **Missing Parentheses When Calling Method**: Writing `greet;` instead of `greet();`
   - Why: Students often forget that parentheses are required to actually execute/call a method. Without them, Java thinks you're trying to reference the method itself, not run it.
   - Fix: Always include `()` when calling a method, even if it has no parameters. Write `greet();` not `greet;`
   - Example:
     ```java
     // Wrong
     greet;  // Compile error: "not a statement"

     // Correct
     greet();  // Method is called and executed
     ```

2. ❌ **Forgetting the `static` Keyword**: Defining method without `static` when calling from `main`
   - Why: The `main` method is static, which means it belongs to the class itself, not to any object. You can only call other static methods directly from a static context.
   - Fix: Add the `static` keyword to your method definition when calling it from `main`: `public static void methodName()`
   - Example:
     ```java
     // Wrong - will cause error
     public void greet() { }  // Can't call from static main

     // Correct
     public static void greet() { }  // Can be called from static main
     ```

3. ❌ **Trying to Call Method Before It's Defined**: Writing method call in main before method definition appears in code
   - Why: This is a conceptual misunderstanding. While Java reads the entire class, beginners often think methods must be defined before they're called in the code order.
   - Fix: Define methods after the main method (standard convention) or before it - both work in Java. Java reads the entire class first.
   - Example:
     ```java
     // Both approaches work fine
     public class Example {
         public static void main(String[] args) {
             greet();  // Calling method - this works!
         }

         public static void greet() {  // Defined after main - perfectly valid
             System.out.println("Hello!");
         }
     }
     ```

4. ❌ **Confusing Method Definition with Method Call**: Not understanding the difference between creating and using a method
   - Why: Beginners often don't distinguish between defining what a method does vs. actually executing it.
   - Fix: Method definition (with full structure) goes outside main. Method call (just the name with parentheses) goes inside main.
   - Example:
     ```java
     // Definition - what the method does
     public static void greet() {
         System.out.println("Hello!");
     }

     // Call - executing the method
     greet();  // This goes in main
     ```

**Best Practices:**
1. ✅ **Use Verb Names for Methods**: Name methods after actions they perform
   - Why: Makes code self-documenting and shows what method does at a glance
   - How: Start method names with verbs like calculate, print, display, validate, process
   - Example: `printWelcome()`, `calculateTotal()`, `validateInput()` (not `welcome()`, `total()`, `input()`)

2. ✅ **Keep Methods Small and Focused**: Each method should do one thing well
   - Why: Easier to understand, test, debug, and reuse
   - How: If method does multiple tasks, split into separate methods
   - Example: Have `printHeader()`, `printBody()`, `printFooter()` instead of one giant `printEverything()` method

3. ✅ **Add Method Documentation**: Write comment above method explaining purpose
   - Why: Helps others (and future you) understand what method does and when to use it
   - How: Add brief comment describing method's purpose, parameters, and return value
   - Example:
     ```java
     // Prints a welcome message to the console
     public static void greet() { }
     ```

4. ✅ **Order Methods Logically**: Place related methods near each other
   - Why: Makes code easier to navigate and understand
   - How: Group similar methods together, put main() first, helper methods after
   - Example: Keep all printing methods together, all calculation methods together

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

**Common Mistakes:**

1. ❌ **Missing Data Type in Parameter Declaration**: Writing `greetPerson(name)` instead of `greetPerson(String name)`
   - Why: Students coming from languages like Python forget that Java requires explicit type declarations for all parameters.
   - Fix: Always specify the data type before the parameter name: `methodName(dataType paramName)`
   - Example:
     ```java
     // Wrong
     public static void greet(name) { }  // Compile error

     // Correct
     public static void greet(String name) { }  // Type specified
     ```

2. ❌ **Wrong Parameter Order**: Passing arguments in different order than parameters are defined
   - Why: Students don't realize that parameter order matters. Java matches arguments to parameters by position, not by meaning.
   - Fix: Pass arguments in the exact same order as parameters are defined in the method signature.
   - Example:
     ```java
     public static void printInfo(String name, int age) {
         System.out.println(name + " is " + age);
     }

     // Wrong
     printInfo(25, "Alice");  // Compile error: int cannot be String

     // Correct
     printInfo("Alice", 25);  // Arguments match parameter order
     ```

3. ❌ **Confusing Parameters with Arguments**: Not understanding the difference between the two terms
   - Why: The terminology is confusing for beginners - both involve passing data to methods.
   - Fix: Parameters are variables in method definition; arguments are actual values you pass when calling.
   - Example:
     ```java
     // name and age are PARAMETERS
     public static void greet(String name, int age) {
         System.out.println("Hello " + name);
     }

     // "Alice" and 25 are ARGUMENTS
     greet("Alice", 25);
     ```

4. ❌ **Trying to Use Parameter Outside Method**: Attempting to access a parameter variable outside the method where it's defined
   - Why: Students don't understand that parameters have local scope - they only exist within their method.
   - Fix: Parameters are local variables that only exist inside the method body. To use a value elsewhere, return it or make it a class variable.
   - Example:
     ```java
     public static void greet(String name) {
         System.out.println("Hello " + name);
     }

     public static void main(String[] args) {
         greet("Alice");
         System.out.println(name);  // Error: cannot find symbol 'name'
     }
     ```

5. ❌ **Wrong Number of Arguments**: Calling a method with more or fewer arguments than it has parameters
   - Why: Students forget to count parameters or accidentally skip/add arguments.
   - Fix: The number of arguments must exactly match the number of parameters.
   - Example:
     ```java
     public static void printSum(int a, int b) {
         System.out.println(a + b);
     }

     // Wrong
     printSum(5);          // Error: needs 2 arguments
     printSum(5, 10, 15);  // Error: too many arguments

     // Correct
     printSum(5, 10);      // Exactly 2 arguments
     ```

**Best Practices:**
1. ✅ **Use Descriptive Parameter Names**: Choose clear names that explain what data represents
   - Why: Makes method calls self-documenting and easier to understand
   - How: Use meaningful names like `userName`, `userAge`, `totalPrice` instead of `x`, `y`, `data`
   - Example: `greetUser(String userName)` is clearer than `greetUser(String s)`

2. ✅ **Limit Number of Parameters**: Keep methods to 3-4 parameters maximum
   - Why: Too many parameters make methods hard to use and understand
   - How: If you need many parameters, consider creating a class to hold the data
   - Example: Instead of `createUser(String name, int age, String email, String phone, String address)`, create a User class

3. ✅ **Order Parameters Logically**: Put most important/common parameters first
   - Why: Makes method calls more intuitive and consistent
   - How: Place required parameters before optional ones, group related parameters
   - Example: `sendEmail(String to, String subject, String body)` - recipient first, content after

4. ✅ **Validate Parameters Inside Methods**: Check that parameter values are valid
   - Why: Prevents bugs from invalid input
   - How: Add checks at method start to verify parameters are not null, in valid range
   - Example:
     ```java
     public static void printAge(int age) {
         if (age < 0 || age > 150) {
             System.out.println("Invalid age");
             return;
         }
         System.out.println("Age: " + age);
     }
     ```

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

**Common Mistakes:**

1. ❌ **Using `void` When Method Should Return a Value**: Declaring method as `void` but trying to return a value
   - Why: Students don't understand that `void` means "no return value" and cannot be used with return statements that return values.
   - Fix: If your method needs to send back a value, change `void` to the appropriate return type (int, String, boolean, etc.)
   - Example:
     ```java
     // Wrong
     public static void add(int a, int b) {
         return a + b;  // Error: void method cannot return a value
     }

     // Correct
     public static int add(int a, int b) {
         return a + b;  // Returns int
     }
     ```

2. ❌ **Forgetting Return Statement**: Method promises to return a value but doesn't have a return statement
   - Why: Students forget that if a method has a return type other than void, it MUST return that type in all execution paths.
   - Fix: Ensure every possible path through your method has a return statement that returns the correct type.
   - Example:
     ```java
     // Wrong
     public static int getNumber() {
         System.out.println("Number");
         // Error: missing return statement
     }

     // Correct
     public static int getNumber() {
         System.out.println("Number");
         return 42;  // Returns an int
     }
     ```

3. ❌ **Return Type Mismatch**: Returning wrong data type than what method signature declares
   - Why: Students don't carefully match what they return with the declared return type.
   - Fix: The value after `return` must exactly match the return type in the method signature.
   - Example:
     ```java
     // Wrong
     public static int getName() {
         return "Alice";  // Error: String cannot be converted to int
     }

     // Correct
     public static String getName() {
         return "Alice";  // Returns String as declared
     }
     ```

4. ❌ **Not Using the Returned Value**: Calling a return method but ignoring its returned value
   - Why: Students call a method that returns something but don't store or use the result, making the return pointless.
   - Fix: Store the returned value in a variable or use it directly in an expression.
   - Example:
     ```java
     public static int add(int a, int b) {
         return a + b;
     }

     // Wrong (wasteful, not an error)
     add(5, 10);  // Returns 15 but value is lost

     // Correct
     int sum = add(5, 10);  // Store the returned value
     System.out.println(add(5, 10));  // Use it directly
     ```

5. ❌ **Unreachable Code After Return**: Writing code after a return statement
   - Why: Students don't realize that `return` immediately exits the method - nothing after it will execute.
   - Fix: Place all logic before the return statement. Code after return is unreachable.
   - Example:
     ```java
     // Wrong
     public static int add(int a, int b) {
         return a + b;
         System.out.println("Done");  // Error: unreachable statement
     }

     // Correct
     public static int add(int a, int b) {
         System.out.println("Adding...");
         return a + b;  // Return should be last
     }
     ```

**Best Practices:**
1. ✅ **Use Return Values Instead of Printing**: Return data rather than printing inside methods
   - Why: Makes methods more flexible and reusable in different contexts
   - How: Return the calculated value and let the caller decide what to do with it
   - Example: `return sum;` instead of `System.out.println(sum);` inside the method

2. ✅ **Keep Return Type Simple and Specific**: Use the most appropriate return type
   - Why: Makes method contract clear and prevents unnecessary type conversions
   - How: Return `int` for counts, `boolean` for yes/no, `String` for text, `double` for calculations
   - Example: `public static boolean isValid()` is clearer than `public static int isValid()` returning 1/0

3. ✅ **Ensure All Code Paths Return a Value**: Every branch must return appropriate type
   - Why: Prevents compilation errors and logic bugs
   - How: Check if/else branches, loops all have return statements
   - Example:
     ```java
     public static String getGrade(int score) {
         if (score >= 90) return "A";
         else if (score >= 80) return "B";
         else return "F";  // Must have final return
     }
     ```

4. ✅ **Return Early for Error Conditions**: Check and return immediately for invalid cases
   - Why: Reduces nesting and makes code clearer
   - How: Validate parameters at start, return error value/throw exception early
   - Example:
     ```java
     public static int divide(int a, int b) {
         if (b == 0) return -1;  // Error case first
         return a / b;  // Main logic after
     }
     ```

5. ✅ **Assign Return Values to Well-Named Variables**: Store returned values with descriptive names
   - Why: Makes code more readable and easier to debug
   - How: Use meaningful variable names that describe what the returned value represents
   - Example: `int totalPrice = calculatePrice();` not `int x = calculatePrice();`

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

**Common Mistakes:**

1. ❌ **Duplicate Code Instead of Method Reuse**: Writing the same code multiple times instead of calling a method
   - Why: Students don't recognize when they're repeating code and miss opportunities to use methods for reusability.
   - Fix: If you're writing the same code twice, create a method for it and call it multiple times.
   - Example:
     ```java
     // Wrong - duplicate code
     System.out.println("Score: " + score1);
     System.out.println("Score: " + score2);
     System.out.println("Score: " + score3);

     // Correct - use a method
     public static void printScore(int score) {
         System.out.println("Score: " + score);
     }
     // Then call: printScore(score1); printScore(score2); printScore(score3);
     ```

2. ❌ **Methods That Do Too Much**: Creating one giant method instead of breaking tasks into smaller methods
   - Why: Students try to solve everything in one method, leading to long, hard-to-understand code.
   - Fix: Follow Single Responsibility Principle - each method should do ONE thing well. Break complex tasks into smaller methods.
   - Example:
     ```java
     // Wrong - one method does everything
     public static void processStudent() {
         // 50 lines of code doing input, calculation, validation, output...
     }

     // Correct - separate methods
     public static int getInput() { ... }
     public static double calculateAverage(int a, int b, int c) { ... }
     public static boolean isPassing(double avg) { ... }
     public static void printResults(double avg, boolean passed) { ... }
     ```

3. ❌ **Poor Method Naming**: Using vague or unclear names like `doStuff()` or `method1()`
   - Why: Students rush and don't think about descriptive names, making code hard to understand.
   - Fix: Method names should clearly describe what the method does. Use verb + noun format: `calculateAverage`, `printReport`, `validateInput`
   - Example:
     ```java
     // Wrong - unclear names
     public static void x() { }
     public static void doIt(int n) { }
     public static void method2() { }

     // Correct - descriptive names
     public static void displayWelcomeMessage() { }
     public static void calculateGrade(int score) { }
     public static void printResults() { }
     ```

4. ❌ **Forgetting Return Values When Needed**: Using void methods when you need to get a value back
   - Why: Students don't plan ahead and realize too late they need the calculated value elsewhere.
   - Fix: If you need to use a calculated value in multiple places, use a return method instead of void.
   - Example:
     ```java
     // Wrong - can't reuse the average
     public static void calculateAverage(int a, int b, int c) {
         double avg = (a + b + c) / 3.0;
         System.out.println("Average: " + avg);
     }

     // Correct - returns value for reuse
     public static double calculateAverage(int a, int b, int c) {
         return (a + b + c) / 3.0;
     }
     // Can now use: double avg = calculateAverage(x, y, z);
     ```

**Best Practices:**
1. ✅ **Apply Single Responsibility Principle**: Each method should have one clear purpose
   - Why: Makes code easier to understand, test, and maintain
   - How: If a method name needs "and" to describe it, split into separate methods
   - Example: Instead of `calculateAndPrintAverage()`, have `calculateAverage()` and `printAverage()`

2. ✅ **Create Helper Methods for Common Tasks**: Extract repeated code into reusable methods
   - Why: Reduces duplication, makes updates easier (change once, not everywhere)
   - How: Identify repeated patterns and create methods for them
   - Example: Create `printHeader()` method if you print headers multiple times

3. ✅ **Design Methods for Reusability**: Make methods generic enough to use in different contexts
   - Why: Increases code reuse and reduces overall code size
   - How: Use parameters to make methods flexible, avoid hardcoding values
   - Example: `printBox(String title, int width)` instead of `printStudentBox()` with fixed values

4. ✅ **Use Method Chaining When Appropriate**: Return values that can be used by other methods
   - Why: Enables composing multiple operations in a clean, readable way
   - How: Return values from methods that can be passed to other methods
   - Example: `printResult(calculateAverage(getScores()));` - each method returns value for the next

5. ✅ **Keep Methods Focused and Cohesive**: Group related methods together in code
   - Why: Makes code organization clear and easy to navigate
   - How: Place related calculation methods together, I/O methods together, validation methods together
   - Example: All grade calculation methods near each other, all printing methods grouped separately

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

**Common Mistakes:**

1. ❌ **Using void When You Need the Value Later**: Choosing void when you actually need to use the calculated value
   - Why: Students don't think ahead about whether they'll need the result for further calculations or logic.
   - Fix: If you need to use a value more than once or in another calculation, use a return method instead of void.
   - Example:
     ```java
     // Wrong - can't use the result
     public static void calculateDiscount(double price) {
         double discount = price * 0.10;
         System.out.println("Discount: " + discount);
     }
     // Problem: Can't get the discount value to calculate final price!

     // Correct - returns the value
     public static double calculateDiscount(double price) {
         return price * 0.10;
     }
     // Now can use: double finalPrice = price - calculateDiscount(price);
     ```

2. ❌ **Returning a Value from void Method**: Trying to return a value when method is declared as void
   - Why: Students write void but then realize they want to return something, creating a conflict.
   - Fix: Change the return type from void to the appropriate type (int, double, String, etc.)
   - Example:
     ```java
     // Wrong
     public static void add(int a, int b) {
         return a + b;  // Error: void method cannot return a value
     }

     // Correct
     public static int add(int a, int b) {
         return a + b;  // Now it matches the return type
     }
     ```

3. ❌ **Trying to Store void Method Result**: Attempting to assign a void method call to a variable
   - Why: Students don't understand that void methods don't return anything, so there's nothing to store.
   - Fix: Only assign return methods to variables. void methods just perform actions.
   - Example:
     ```java
     public static void printMessage() {
         System.out.println("Hello");
     }

     // Wrong
     String result = printMessage();  // Error: void method doesn't return anything

     // Correct
     printMessage();  // Just call it, don't try to store result
     ```

4. ❌ **Using Return Method But Not Capturing Value**: Calling a return method but ignoring what it returns
   - Why: Students create return methods but forget to actually use the returned value, wasting the return.
   - Fix: Store the returned value in a variable or use it directly in an expression.
   - Example:
     ```java
     public static int add(int a, int b) {
         return a + b;
     }

     // Wrong (wasteful)
     add(5, 10);  // Returns 15 but value is ignored

     // Correct
     int sum = add(5, 10);  // Store it
     System.out.println(add(5, 10));  // Or use it directly
     ```

5. ❌ **Confusion About When to Use Each**: Not having clear criteria for choosing void vs return
   - Why: Students randomly pick void or return without thinking about the method's purpose.
   - Fix: Use this rule: If the method just displays/prints, use void. If it calculates/checks something you'll use elsewhere, use return.
   - Example:
     ```java
     // void - just displays (action only)
     public static void displayWelcome() {
         System.out.println("Welcome!");
     }

     // return - calculates for use elsewhere
     public static double calculateTax(double amount) {
         return amount * 0.08;  // Return value needed for total
     }
     ```

**Best Practices:**
1. ✅ **Choose Return Type Based on Method Purpose**: Decide void vs return by asking "Will I use this result elsewhere?"
   - Why: Makes method design intentional and appropriate for use case
   - How: If method just displays information, use void. If it calculates/checks something needed elsewhere, return it
   - Example: `void printReceipt()` for display, `double calculateTotal()` for calculations

2. ✅ **Prefer Return Methods for Testability**: Return values make methods easier to test
   - Why: Can verify returned value matches expected result without checking console output
   - How: When possible, return computed values rather than printing them inside method
   - Example: `return sum;` instead of `System.out.println(sum);` - caller can print if needed

3. ✅ **Avoid Side Effects in Return Methods**: Return methods should focus on computing and returning values
   - Why: Makes method behavior predictable and easier to reason about
   - How: Don't print or modify global state in return methods, just calculate and return
   - Example: `return price * 1.10;` (pure calculation) not `System.out.println(...); return price * 1.10;` (mixed concerns)

4. ✅ **Use void for User Interface Methods**: Print/display methods should typically be void
   - Why: Their purpose is to show information, not produce values for further use
   - How: Methods that print menus, reports, messages should be void
   - Example: `void displayMenu()`, `void printReport()`, `void showError(String msg)`

5. ✅ **Always Capture or Use Return Values**: Don't waste returned values
   - Why: If method returns a value, use it - otherwise the return is pointless
   - How: Store in variable or use directly in expression/condition
   - Example: `int total = calculateSum(a, b);` or `if (isValid(input)) { ... }`

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

**Common Mistakes:**

1. ❌ **Not Handling Division by Zero**: Forgetting to check if divisor is zero before dividing
   - Why: Students don't think about edge cases and error conditions in their calculations.
   - Fix: Always validate input before performing division. Check if divisor is zero and handle appropriately.
   - Example:
     ```java
     // Wrong - will crash with division by zero
     public static double divide(double a, double b) {
         return a / b;  // What if b is 0?
     }

     // Correct - handles edge case
     public static double divide(double a, double b) {
         if (b == 0) {
             System.out.println("Error: Cannot divide by zero!");
             return 0;  // or throw exception
         }
         return a / b;
     }
     ```

2. ❌ **Mixing Logic with Display**: Putting calculation and printing code in the same method
   - Why: Students don't separate concerns - methods should either calculate OR display, not both.
   - Fix: Create separate methods: one to calculate and return, another to display results.
   - Example:
     ```java
     // Wrong - mixed concerns
     public static void add(double a, double b) {
         double result = a + b;
         System.out.println(a + " + " + b + " = " + result);  // Calculation + display
     }

     // Correct - separated concerns
     public static double add(double a, double b) {
         return a + b;  // Only calculation
     }

     public static void displayOperation(String op, double a, double b, double result) {
         System.out.println(a + " " + op + " " + b + " = " + result);  // Only display
     }
     ```

3. ❌ **Not Reusing Helper Methods**: Duplicating logic instead of calling existing methods
   - Why: Students write redundant code instead of utilizing methods they've already created.
   - Fix: Look for opportunities to call existing methods. Don't repeat calculations that you've already written methods for.
   - Example:
     ```java
     // Wrong - duplicating max logic
     public static double max(double a, double b) {
         return (a > b) ? a : b;
     }

     public static void compareNumbers(double a, double b, double c) {
         double largest = (a > b) ? a : b;  // Duplicating max logic
         largest = (largest > c) ? largest : c;
     }

     // Correct - reusing max method
     public static void compareNumbers(double a, double b, double c) {
         double largest = max(max(a, b), c);  // Reuse existing method
     }
     ```

4. ❌ **Poor Organization and Code Structure**: Placing methods in random order without logical grouping
   - Why: Students add methods as they think of them, leading to disorganized code that's hard to navigate.
   - Fix: Group related methods together (all arithmetic, all comparisons, all utilities). Use consistent ordering.
   - Example:
     ```java
     // Wrong - scattered organization
     public static double add(double a, double b) { }
     public static boolean isPrime(int n) { }
     public static double subtract(double a, double b) { }
     public static boolean isEven(int n) { }

     // Correct - logical grouping
     // Arithmetic operations
     public static double add(double a, double b) { }
     public static double subtract(double a, double b) { }

     // Number checks
     public static boolean isEven(int n) { }
     public static boolean isPrime(int n) { }
     ```

5. ❌ **Inconsistent Method Design**: Some methods return values, others print, without clear pattern
   - Why: Students don't follow consistent design patterns throughout their application.
   - Fix: Decide on a clear pattern: calculation methods return values, display methods are void. Be consistent.
   - Example:
     ```java
     // Wrong - inconsistent design
     public static int add(int a, int b) {
         return a + b;  // Returns value
     }

     public static void subtract(int a, int b) {
         System.out.println(a - b);  // Prints result - inconsistent!
     }

     // Correct - consistent design
     public static int add(int a, int b) {
         return a + b;  // All calculations return
     }

     public static int subtract(int a, int b) {
         return a - b;  // Consistent pattern
     }
     ```

**Best Practices:**
1. ✅ **Separate Calculation Logic from Presentation**: Keep business logic and UI concerns separate
   - Why: Makes code more reusable, testable, and maintainable
   - How: Calculation methods return values, display methods handle formatting and printing
   - Example: `double result = calculate()` then `displayResult(result)` - not mixed in one method

2. ✅ **Validate Input Parameters**: Check for invalid inputs before processing
   - Why: Prevents runtime errors and unexpected behavior
   - How: Add parameter validation at start of methods (check for null, zero, negative, out of range)
   - Example: Check `if (divisor == 0)` before dividing, `if (n < 0)` before factorial

3. ✅ **Use Consistent Naming Patterns**: Follow clear naming conventions across all methods
   - Why: Makes codebase predictable and easier to understand
   - How: Use verbs for actions (calculate, display, validate), nouns for getters (getMax, getSum)
   - Example: `calculateSum()`, `isValid()`, `displayMenu()` - all follow verb+noun pattern

4. ✅ **Group Related Methods Together**: Organize methods by functionality
   - Why: Makes code easier to navigate and understand structure
   - How: Place all arithmetic methods together, all validation methods together, all display methods together
   - Example: Group add/subtract/multiply/divide in one section, max/min/abs in another

5. ✅ **Create Reusable Building Blocks**: Design methods to be called by other methods
   - Why: Promotes code reuse and reduces duplication
   - How: Make methods generic with parameters, avoid hardcoded values
   - Example: `max(a, b)` can be reused: `max(max(a, b), c)` for three numbers

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

### Common Mistakes:

1. ❌ **Trying to Overload by Changing Only Return Type**: Creating methods with same name and parameters but different return types
   - Why: Students think return type is part of the method signature, but Java only looks at method name + parameter types to differentiate methods.
   - Fix: To overload, you MUST change the parameters (number, type, or order). Return type alone is not enough.
   - Example:
     ```java
     // Wrong - won't compile
     public static int add(int a, int b) {
         return a + b;
     }

     public static double add(int a, int b) {  // Error: already defined
         return a + b;
     }

     // Correct - different parameters
     public static int add(int a, int b) {
         return a + b;
     }

     public static double add(double a, double b) {  // Different parameter types
         return a + b;
     }
     ```

2. ❌ **Thinking Parameter Names Matter**: Believing that changing parameter names creates different methods
   - Why: Students don't understand that Java ignores parameter names when determining method signatures - only types matter.
   - Fix: Remember: method signature = name + parameter TYPES (not names). Changing `int a` to `int x` doesn't create a new overload.
   - Example:
     ```java
     // Wrong - these are NOT different methods
     public static void display(int a, int b) {
         System.out.println(a + b);
     }

     public static void display(int x, int y) {  // Error: already defined
         System.out.println(x + y);  // Same signature as above!
     }

     // Correct - actually different
     public static void display(int a, int b) {
         System.out.println(a + b);
     }

     public static void display(double a, double b) {  // Different types
         System.out.println(a + b);
     }
     ```

3. ❌ **Forgetting That Parameter Order Matters**: Not realizing (String, int) is different from (int, String)
   - Why: Students think Java is smart enough to match by meaning, but it strictly matches by position and type.
   - Fix: Understand that `greet(String name, int age)` and `greet(int age, String name)` are completely different methods.
   - Example:
     ```java
     // These are DIFFERENT methods - order matters
     public static void printInfo(String name, int age) {
         System.out.println(name + " is " + age);
     }

     public static void printInfo(int age, String name) {
         System.out.println(age + " years old: " + name);
     }

     // You can call either:
     printInfo("Alice", 25);  // Calls first version
     printInfo(25, "Alice");  // Calls second version
     ```

4. ❌ **Overloading Confusion - Which Method Gets Called?**: Not understanding how Java chooses which overloaded method to use
   - Why: Students don't realize Java matches arguments to parameters at compile-time based on type and count.
   - Fix: Java picks the method whose parameter list EXACTLY matches your arguments (by type and order).
   - Example:
     ```java
     public static void print(int x) {
         System.out.println("int: " + x);
     }

     public static void print(double x) {
         System.out.println("double: " + x);
     }

     // Java automatically picks the right one
     print(5);      // Calls print(int) - exact match
     print(5.5);    // Calls print(double) - exact match
     print(5.0);    // Calls print(double) - double literal
     ```

5. ❌ **Creating Too Many Overloads**: Making dozens of overloaded versions when they're not needed
   - Why: Students overuse overloading, creating confusion rather than clarity.
   - Fix: Only overload when the methods do essentially the SAME thing with different inputs. If logic is different, use different names.
   - Example:
     ```java
     // Wrong - overloading unrelated operations
     public static int process(int x) {
         return x * 2;  // Doubles the number
     }

     public static String process(String s) {
         return s.toUpperCase();  // Uppercases string - totally different!
     }

     // Correct - use different names for different operations
     public static int doubleNumber(int x) {
         return x * 2;
     }

     public static String toUpperCase(String s) {
         return s.toUpperCase();
     }
     ```

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

### Common Mistakes:

1. ❌ **Calling Method with Wrong Number of Arguments**: Trying to call a method with a parameter count that doesn't exist
   - Why: Students forget which overloaded versions they've created and call with the wrong number of arguments.
   - Fix: Make sure you've defined an overloaded version for the number of arguments you're passing, or adjust your call to match existing methods.
   - Example:
     ```java
     // Defined methods
     public static int add(int a, int b) {
         return a + b;
     }

     public static int add(int a, int b, int c) {
         return a + b + c;
     }

     // Wrong - no version with 4 parameters
     int result = add(1, 2, 3, 4);  // Error: no suitable method found

     // Correct - use existing versions
     int result1 = add(1, 2);       // Uses 2-parameter version
     int result2 = add(1, 2, 3);    // Uses 3-parameter version
     ```

2. ❌ **Not Realizing More Parameters Doesn't Mean "Better"**: Creating many overloads without real need
   - Why: Students think more options is always better, but it can make code confusing and hard to maintain.
   - Fix: Only create overloads when there's a genuine use case. Consider using varargs for truly variable numbers of parameters.
   - Example:
     ```java
     // Wrong - excessive overloading
     public static int add(int a, int b) { }
     public static int add(int a, int b, int c) { }
     public static int add(int a, int b, int c, int d) { }
     public static int add(int a, int b, int c, int d, int e) { }
     // This gets ridiculous!

     // Better - use varargs (covered later)
     public static int add(int... numbers) {
         int sum = 0;
         for (int num : numbers) {
             sum += num;
         }
         return sum;
     }
     // Can now handle any number of arguments!
     ```

3. ❌ **Inconsistent Return Types Across Overloads**: Having different return types for similar overloaded methods
   - Why: Students change return types unnecessarily, causing confusion when some versions return int and others return void.
   - Fix: Keep return types consistent across overloads unless there's a compelling reason. All versions should return the same type.
   - Example:
     ```java
     // Wrong - inconsistent return types
     public static int add(int a, int b) {
         return a + b;  // Returns int
     }

     public static void add(int a, int b, int c) {
         System.out.println(a + b + c);  // Returns nothing - confusing!
     }

     // Correct - consistent returns
     public static int add(int a, int b) {
         return a + b;
     }

     public static int add(int a, int b, int c) {
         return a + b + c;  // All return int
     }
     ```

4. ❌ **Forgetting to Return Values**: Missing return statements in non-void overloaded methods
   - Why: Students get confused managing multiple method versions and forget return statements in some.
   - Fix: Every path in every overloaded method that has a return type must return a value.
   - Example:
     ```java
     // Wrong - missing return
     public static int add(int a, int b) {
         return a + b;  // Has return - good
     }

     public static int add(int a, int b, int c) {
         int sum = a + b + c;
         // Error: missing return statement!
     }

     // Correct - all versions return
     public static int add(int a, int b) {
         return a + b;
     }

     public static int add(int a, int b, int c) {
         return a + b + c;  // Returns value
     }
     ```

5. ❌ **Not Leveraging Method Reuse**: Writing duplicate logic instead of calling simpler overloaded versions
   - Why: Students don't realize they can call one overloaded method from another to reduce code duplication.
   - Fix: Have more complex overloads call simpler ones when possible to reuse logic.
   - Example:
     ```java
     // Wrong - duplicated logic
     public static int add(int a, int b) {
         return a + b;
     }

     public static int add(int a, int b, int c) {
         return a + b + c;  // Repeating addition logic
     }

     // Correct - reuse simpler version
     public static int add(int a, int b) {
         return a + b;
     }

     public static int add(int a, int b, int c) {
         return add(a, b) + c;  // Reuses 2-parameter version!
     }
     ```

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

### Common Mistakes:

1. ❌ **Ambiguous Method Calls**: Having overloads that Java can't distinguish between at compile time
   - Why: Students create overloads where multiple methods could match the arguments, confusing the compiler.
   - Fix: Ensure each overloaded version has a distinct parameter signature that can't be confused with others.
   - Example:
     ```java
     // Potentially ambiguous
     public static void process(int x) {
         System.out.println("int: " + x);
     }

     public static void process(long x) {
         System.out.println("long: " + x);
     }

     process(5);  // Calls int version (exact match)
     process(5L); // Calls long version (L suffix makes it clear)
     ```

2. ❌ **Not Understanding Type Widening**: Confusion about which method gets called with implicit type conversions
   - Why: Students don't realize Java will automatically widen primitive types if there's no exact match (int→long→float→double).
   - Fix: Understand Java's type promotion rules. Provide explicit overloads for the types you expect or use explicit casts.
   - Example:
     ```java
     public static void display(double x) {
         System.out.println("double: " + x);
     }

     display(5);    // int is widened to double automatically
     display(5.0);  // double - exact match
     ```

3. ❌ **Overloading Unrelated Operations**: Using same method name for completely different operations just because parameters differ
   - Why: Students misuse overloading for convenience, making code confusing rather than clearer.
   - Fix: Only overload when methods do the SAME conceptual operation with different inputs. Use different names for different operations.
   - Example:
     ```java
     // Wrong - unrelated operations with same name
     public static double calculate(int side) {
         return side * side;  // Square area
     }

     public static double calculate(double radius) {
         return Math.PI * radius * radius;  // Circle area - different concept!
     }

     // Correct - different names for different operations
     public static double calculateSquareArea(int side) {
         return side * side;
     }

     public static double calculateCircleArea(double radius) {
         return Math.PI * radius * radius;
     }
     ```

4. ❌ **Treating Wrapper Classes Like Primitives in Overloading**: Confusing Integer with int in method signatures
   - Why: Students don't realize Integer and int are different types for overloading purposes.
   - Fix: Understand that Integer and int are distinct types. Java will NOT automatically choose one if you pass the other.
     ```java
     public static void display(int x) {
         System.out.println("primitive int: " + x);
     }

     public static void display(Integer x) {
         System.out.println("Integer object: " + x);
     }

     display(5);              // Calls int version
     display(Integer.valueOf(5));  // Calls Integer version
     ```

5. ❌ **Inconsistent Overload Behavior**: Having overloaded methods that behave too differently from each other
   - Why: Students make overloads that are conceptually supposed to be the same but implement different logic.
   - Fix: All overloads of a method should do essentially the same thing. Users shouldn't get surprised by calling one version vs another.
   - Example:
     ```java
     // Wrong - inconsistent behavior
     public static double calculateArea(int side) {
         return side * side;  // Returns square area
     }

     public static double calculateArea(double radius) {
         return 2 * Math.PI * radius;  // Returns circumference?! Inconsistent!
     }

     // Correct - consistent behavior
     public static double calculateArea(int side) {
         return side * side;  // Square area
     }

     public static double calculateArea(double radius) {
         return Math.PI * radius * radius;  // Circle area - both calculate area!
     }
     ```

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

### Common Mistakes:

1. ❌ **Trying to Access Variable Outside Its Scope**: Attempting to use a variable where it doesn't exist
   - Why: Students don't understand that variables only exist within their enclosing curly braces { }.
   - Fix: Variables declared in a method/block can only be used within that method/block. Declare variables in a wider scope if needed elsewhere.
   - Example:
     ```java
     // Wrong - accessing outside scope
     public static void method1() {
         int x = 10;
     }

     public static void method2() {
         System.out.println(x);  // Error: cannot find symbol 'x'
     }

     // Correct - each method has its own variables
     public static void method1() {
         int x = 10;
         System.out.println(x);  // Use x here
     }

     public static void method2() {
         int x = 20;  // Different x, separate scope
         System.out.println(x);
     }
     ```

2. ❌ **Forgetting to Initialize Local Variables**: Using a local variable before assigning it a value
   - Why: Unlike instance/class variables, local variables do NOT have default values. They must be explicitly initialized.
   - Fix: Always initialize local variables before using them: `int x = 0;`
   - Example:
     ```java
     // Wrong - uninitialized local variable
     public static void calculate() {
         int result;
         result = result + 5;  // Error: variable might not have been initialized
         System.out.println(result);
     }

     // Correct - initialize before use
     public static void calculate() {
         int result = 0;  // Initialize
         result = result + 5;
         System.out.println(result);  // Prints 5
     }
     ```

3. ❌ **Accessing Loop Variables After Loop Ends**: Trying to use loop control variables outside the loop
   - Why: Variables declared in a for loop (like `int i`) only exist during the loop execution.
   - Fix: Declare the variable before the loop if you need it afterward, or don't try to access it outside.
   - Example:
     ```java
     // Wrong - loop variable not accessible
     for (int i = 0; i < 5; i++) {
         System.out.println(i);
     }
     System.out.println("Final i: " + i);  // Error: cannot find symbol 'i'

     // Correct - declare outside if needed after
     int i;
     for (i = 0; i < 5; i++) {
         System.out.println(i);
     }
     System.out.println("Final i: " + i);  // Works - i is 5
     ```

4. ❌ **Redeclaring Variable in Same Scope**: Declaring the same variable name twice in the same scope
   - Why: Students forget they already declared a variable and try to declare it again.
   - Fix: Each variable name can only be declared once per scope. Either use different names or reuse the existing variable.
   - Example:
     ```java
     // Wrong - duplicate declaration
     public static void method() {
         int x = 10;
         System.out.println(x);
         int x = 20;  // Error: variable x is already defined in method method()
     }

     // Correct - reassign instead of redeclare
     public static void method() {
         int x = 10;
         System.out.println(x);
         x = 20;  // Just reassign, don't redeclare
         System.out.println(x);
     }
     ```

5. ❌ **Block Scope Confusion**: Not understanding that curly braces { } create new scopes
   - Why: Students don't realize that variables declared inside if statements, loops, or any { } block are local to that block.
   - Fix: Variables declared in a block only exist in that block. Outer blocks can't see inner variables.
   - Example:
     ```java
     // Wrong - inner variable not accessible
     public static void method() {
         if (true) {
             int innerVar = 100;
             System.out.println(innerVar);  // Works here
         }
         System.out.println(innerVar);  // Error: cannot find symbol
     }

     // Correct - declare outside block if needed after
     public static void method() {
         int innerVar = 0;  // Declare in outer scope
         if (true) {
             innerVar = 100;  // Assign value
             System.out.println(innerVar);
         }
         System.out.println(innerVar);  // Now accessible
     }
     ```

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

### Common Mistakes:

1. ❌ **Expecting Local Variables to Persist Across Method Calls**: Thinking local variables keep their values between calls
   - Why: Students don't understand that local variables are created fresh each time a method is called and destroyed when it ends.
   - Fix: Use instance/class variables (static) if you need values to persist across multiple method calls.
   - Example:
     ```java
     // Wrong - local variable resets each time
     public static void countCalls() {
         int callCount = 0;  // Reset to 0 every time!
         callCount++;
         System.out.println("Calls: " + callCount);  // Always prints 1
     }

     // Correct - use static/instance variable
     static int callCount = 0;  // Persists across calls

     public static void countCalls() {
         callCount++;  // Accumulates
         System.out.println("Calls: " + callCount);  // 1, 2, 3...
     }
     ```

2. ❌ **Not Initializing Local Variables**: Forgetting that local variables don't have default values
   - Why: Instance variables are auto-initialized (0, false, null), but local variables are NOT. Students confuse the two.
   - Fix: Always explicitly initialize local variables before use: `int x = 0;`
   - Example:
     ```java
     static int instanceVar;  // Auto-initialized to 0

     public static void method() {
         int localVar;  // NOT initialized!
         System.out.println(instanceVar);  // Works - prints 0
         System.out.println(localVar);  // Error: variable might not have been initialized
     }

     // Correct
     public static void method() {
         int localVar = 0;  // Must initialize explicitly
         System.out.println(localVar);  // Works
     }
     ```

3. ❌ **Variable Shadowing**: Declaring local variable with same name as instance variable, hiding the instance variable
   - Why: Students accidentally create a local variable with the same name, which "shadows" (hides) the instance variable in that scope.
   - Fix: Use different names for local vs instance variables, or use `this.` to access instance variables (in non-static context).
   - Example:
     ```java
     static int count = 10;  // Instance variable

     // Wrong - shadows instance variable
     public static void method() {
         int count = 5;  // Local variable shadows instance variable
         count++;  // Modifies LOCAL count (now 6), NOT instance count
         System.out.println(count);  // Prints 6, instance count still 10!
     }

     // Correct - use different name
     public static void method() {
         int localCount = 5;
         count++;  // Modifies instance variable
         System.out.println("Instance: " + count);  // 11
         System.out.println("Local: " + localCount);  // 5
     }
     ```

4. ❌ **Confusing Which Variable is Being Modified**: Not knowing if you're changing local or instance variable
   - Why: Students lose track of which variable they're modifying when names are similar or scopes overlap.
   - Fix: Use clear, distinct names. Prefix instance variables (like `this.balance` in classes) or use naming conventions (`mCount`, `sCount` etc).
   - Example:
     ```java
     static int total = 100;  // Instance variable

     public static void calculate(int total) {  // Parameter shadows instance variable
         total = total + 10;  // Which total? The parameter!
         System.out.println(total);  // Prints parameter value, NOT instance total
     }

     // Correct - use different parameter name
     public static void calculate(int amount) {
         total = total + amount;  // Clear: modifying instance total
         System.out.println("Total: " + total);
     }
     ```

5. ❌ **Using Instance Variables Like Local Variables**: Expecting instance variables to reset or behave like local ones
   - Why: Students don't realize instance variables maintain their state across all method calls.
   - Fix: Understand that instance variables persist. If you need a fresh value each time, use a local variable.
   - Example:
     ```java
     static int sum = 0;  // Instance variable persists

     public static void addValue(int value) {
         sum = sum + value;  // Keeps accumulating!
         System.out.println("Sum: " + sum);
     }

     // Called multiple times:
     addValue(5);   // sum = 5
     addValue(10);  // sum = 15 (not 10!)
     addValue(3);   // sum = 18 (not 3!)

     // If you want fresh calculation each time, use local:
     public static void addValue(int value) {
         int localSum = 0;  // Fresh every call
         localSum = localSum + value;
         System.out.println("Sum: " + localSum);  // Always equals value
     }
     ```

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

### Common Mistakes:

1. ❌ **Using Local Balance Variable Instead of Instance Variable**: Creating a local `balance` instead of modifying the instance balance
   - Why: Students declare a new local variable accidentally, which doesn't affect the persistent balance.
   - Fix: Modify the instance variable (static field) directly. Don't create a new local variable with the same name.
   - Example:
     ```java
     static double balance = 1000.0;  // Instance variable

     // Wrong - creates local variable
     public static void deposit(double amount) {
         double balance = 0;  // New local variable!
         balance += amount;  // Only modifies local, not instance balance
     }

     // Correct - modifies instance variable
     public static void deposit(double amount) {
         balance += amount;  // Modifies the static instance variable
     }
     ```

2. ❌ **Forgetting to Increment Transaction Count**: Not updating `transactionCount` in all transaction methods
   - Why: Students focus on the main logic (updating balance) and forget to track the transaction count.
   - Fix: Every method that performs a transaction (deposit, withdraw, transfer) must increment `transactionCount`.
   - Example:
     ```java
     static int transactionCount = 0;
     static double balance = 1000.0;

     // Wrong - missing transaction count
     public static void deposit(double amount) {
         balance += amount;
         // Forgot to increment transactionCount!
     }

     // Correct - tracks all transactions
     public static void deposit(double amount) {
         balance += amount;
         transactionCount++;  // Track every transaction
     }
     ```

3. ❌ **Not Validating Withdrawals**: Allowing withdrawals that exceed the balance, creating negative balances
   - Why: Students implement the withdrawal logic without checking if there are sufficient funds first.
   - Fix: Always check if `balance >= amount` before allowing a withdrawal.
   - Example:
     ```java
     // Wrong - allows negative balance
     public static void withdraw(double amount) {
         balance -= amount;  // What if amount > balance?
         transactionCount++;
     }

     // Correct - validates before withdrawing
     public static void withdraw(double amount) {
         if (balance >= amount) {
             balance -= amount;
             transactionCount++;
         } else {
             System.out.println("INSUFFICIENT FUNDS!");
             System.out.println("Balance: $" + balance);
             System.out.println("Attempted: $" + amount);
         }
     }
     ```

4. ❌ **Confusing Which Overloaded Method is Called**: Not understanding which version executes based on arguments
   - Why: Students pass arguments without thinking about which overload will match, causing unexpected behavior.
   - Fix: Understand method resolution: Java picks the version that exactly matches your argument types.
   - Example:
     ```java
     public static void deposit(double amount) {
         balance += amount;
         transactionCount++;
     }

     public static void deposit(double amount, String description) {
         balance += amount;
         transactionCount++;
         System.out.println("Deposited: $" + amount + " (" + description + ")");
     }

     // Be intentional about which you call
     deposit(100.0);  // Calls first version (no description)
     deposit(50.0, "Paycheck");  // Calls second version (with description)
     ```

5. ❌ **Not Maintaining Consistent State**: Updating balance but not related variables, or vice versa
   - Why: Students modify one part of the state (like balance) but forget to update related state (like transaction count or totals).
   - Fix: Think about ALL state variables that need updating in each operation. Keep state consistent.
   - Example:
     ```java
     static double balance = 1000.0;
     static int transactionCount = 0;
     static double totalDeposited = 0.0;

     // Wrong - inconsistent state
     public static void deposit(double amount) {
         balance += amount;  // Updates balance
         // Forgot transactionCount and totalDeposited!
     }

     // Correct - maintains all related state
     public static void deposit(double amount) {
         balance += amount;
         transactionCount++;
         totalDeposited += amount;  // Keep all state synchronized
     }
     ```

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


---

## Week 2: Object-Oriented Programming Fundamentals (CORRECTED)

### Day 10: Methods & Method Overloading

---

#### Exercise 1: Creating Your First Method (15 minutes)

**What you'll learn:** Understanding methods, creating and calling them

**Create new class: `MethodBasics`**

**Concept:** A **method** is a reusable block of code that performs a specific task. Think of it as a mini-program inside your program that you can call whenever needed.

**Why Methods?**
- **Avoid repetition**: Write code once, use many times
- **Organization**: Break big problems into smaller pieces
- **Readability**: Makes code easier to understand

**Step-by-Step:**

```java
public class MethodBasics {
    public static void main(String[] args) {
        System.out.println("===== METHOD BASICS =====\n");
        
        // Calling methods
        System.out.println("1. Calling greet():");
        greet();
        
        System.out.println("\n2. Calling greet() three times:");
        greet();
        greet();
        greet();
        
        System.out.println("\n3. Calling printLine() to create dividers:");
        printLine();
        System.out.println("Important Message Here\!");
        printLine();
        
        System.out.println("\n4. Calling welcome():");
        welcome();
        
        System.out.println("\n===========================");
    }
    
    // METHOD 1: Simple method with no parameters, no return value
    public static void greet() {
        System.out.println("  Hello from the greet() method\!");
    }
    
    // METHOD 2: Print a line of equals signs
    public static void printLine() {
        System.out.println("  ================================");
    }
    
    // METHOD 3: More complex welcome message
    public static void welcome() {
        System.out.println("  ╔════════════════════════════╗");
        System.out.println("  ║  Welcome to Java Methods\!  ║");
        System.out.println("  ╚════════════════════════════╝");
    }
}
```

**Expected Output:**
```
===== METHOD BASICS =====

1. Calling greet():
  Hello from the greet() method\!

2. Calling greet() three times:
  Hello from the greet() method\!
  Hello from the greet() method\!
  Hello from the greet() method\!

3. Calling printLine() to create dividers:
  ================================
Important Message Here\!
  ================================

4. Calling welcome():
  ╔════════════════════════════════╗
  ║  Welcome to Java Methods\!  ║
  ╚════════════════════════════════╝

===========================
```

**💡 Method Structure Explained:**

```java
public static void methodName() {
    // Code to execute
}

// Breaking it down:
// public  - Can be called from anywhere
// static  - Belongs to class (not object) - needed to call from main
// void    - Returns nothing
// methodName - Name of the method (use camelCase)
// ()      - Parameters go here (empty for now)
// { }     - Method body - the code that runs
```

**How Method Calls Work:**
```
1. Program starts at main()
2. Encounters greet(); 
3. Jumps to greet() method
4. Executes all code in greet()
5. Returns back to main()
6. Continues with next line
```

**✅ Success Criteria:**
- Understand method definition vs method call
- Can create simple methods
- Know methods execute when called, then return to caller
- Recognize methods help avoid code repetition

**Common Mistakes:**

1. ❌ **Missing Parentheses When Calling Method**: Writing `greet;` instead of `greet();`
   - Why: Students often forget that parentheses are required to actually execute/call a method. Without them, Java thinks you're trying to reference the method itself, not run it.
   - Fix: Always include `()` when calling a method, even if it has no parameters. Write `greet();` not `greet;`
   - Example:
     ```java
     // Wrong
     greet;  // Compile error: "not a statement"

     // Correct
     greet();  // Method is called and executed
     ```

2. ❌ **Defining Method Inside main Method**: Trying to write a method inside the main method's curly braces
   - Why: Java doesn't allow nested method definitions. Methods must be defined at the class level, not inside other methods.
   - Fix: Define your methods outside and after the main method's closing brace, at the class level.
   - Example:
     ```java
     // Wrong
     public class Example {
         public static void main(String[] args) {
             public static void greet() { }  // Error: can't define method here
         }
     }

     // Correct
     public class Example {
         public static void main(String[] args) {
             greet();  // Call the method
         }

         public static void greet() {  // Defined at class level
             System.out.println("Hello!");
         }
     }
     ```

3. ❌ **Forgetting the `static` Keyword**: Defining method without `static` when calling from `main`
   - Why: The `main` method is static, which means it belongs to the class itself, not to any object. You can only call other static methods directly from a static context.
   - Fix: Add the `static` keyword to your method definition when calling it from `main`: `public static void methodName()`
   - Example:
     ```java
     // Wrong
     public void greet() { }  // Can't call from static main

     // Correct
     public static void greet() { }  // Can be called from static main
     ```

4. ❌ **Typo in Method Name**: Defining a method with one name but calling it with a different name
   - Why: Java is case-sensitive and requires exact name matching. Students make typos like defining `greet()` but calling `great()`.
   - Fix: Method name in the call must exactly match the method definition, including capitalization.
   - Example:
     ```java
     public static void greet() {  // Defined as "greet"
         System.out.println("Hello!");
     }

     // Wrong
     great();  // Error: cannot find symbol "great"
     greet;    // Error: missing parentheses

     // Correct
     greet();  // Exact match with parentheses
     ```

5. ❌ **Not Understanding Method Execution Flow**: Thinking methods run automatically when defined
   - Why: Students don't realize that defining a method doesn't run it. You must explicitly call the method.
   - Fix: Methods only execute when called. A method definition just describes what to do; a method call actually does it.
   - Example:
     ```java
     public static void main(String[] args) {
         // Method is defined below but won't run unless called
         System.out.println("Before");
         greet();  // Only runs when we call it here
         System.out.println("After");
     }

     public static void greet() {
         System.out.println("Hello!");  // Only executes when greet() is called
     }
     ```

**Best Practices:**

1. ✅ **Use Descriptive Method Names**: Choose names that clearly describe what the method does
   - Why: Makes code self-documenting and easier to understand without reading implementation
   - How: Use verb-noun combinations like `printReport()`, `calculateTotal()`, `displayMenu()`
   - Example:
     ```java
     // Poor - vague, unclear purpose
     public static void doIt() { }
     public static void method1() { }

     // Good - clear, descriptive
     public static void displayWelcomeMessage() { }
     public static void printLine() { }
     ```

2. ✅ **Follow Naming Conventions**: Use camelCase for method names, start with lowercase
   - Why: Follows Java standards, makes code consistent and professional
   - How: First word lowercase, capitalize first letter of each subsequent word
   - Example: `greet()`, `printLine()`, `displayWelcomeMessage()`, `calculateStudentGrade()`

3. ✅ **Keep Methods Small and Focused**: Each method should do ONE thing well
   - Why: Easier to understand, test, debug, and reuse
   - How: If a method does multiple unrelated tasks, split it into separate methods
   - Example: Have `printHeader()` and `printFooter()` instead of one `printEverything()` method

4. ✅ **Write Methods for Reusability**: Design methods to be called multiple times
   - Why: Eliminates code duplication and makes updates easier
   - How: Extract any code you use more than once into a method
   - Example:
     ```java
     // Instead of repeating:
     System.out.println("==========");
     System.out.println("==========");

     // Create reusable method:
     public static void printLine() {
         System.out.println("==========");
     }
     // Call it: printLine(); printLine();
     ```

**🎯 Challenge:**
1. Create a method `printStars()` that prints "*****"
2. Create a method `sayGoodbye()` that prints "Goodbye\!"
3. Call both methods from main

---

#### Exercise 2: Methods with Parameters (20 minutes)

**What you'll learn:** Passing data to methods using parameters

**Create new class: `MethodParameters`**

**Concept:** **Parameters** are variables that let you pass information into a method. This makes methods flexible and reusable with different data.

```
Think of parameters like:
- Method = Coffee machine
- Parameters = Your customization (size, sugar, milk)
- Result = Customized coffee

Same machine, different inputs, different results\!
```

**Step-by-Step:**

```java
public class MethodParameters {
    public static void main(String[] args) {
        System.out.println("===== METHODS WITH PARAMETERS =====\n");
        
        // Example 1: Single parameter
        System.out.println("--- Example 1: Greeting with name ---");
        greetPerson("Alice");
        greetPerson("Bob");
        greetPerson("Charlie");
        
        // Example 2: Multiple parameters
        System.out.println("\n--- Example 2: Personal info ---");
        displayInfo("Alice", 25);
        displayInfo("Bob", 30);
        
        // Example 3: Different data types
        System.out.println("\n--- Example 3: Product details ---");
        showProduct("Laptop", 999.99, 5);
        showProduct("Mouse", 25.50, 50);
        
        // Example 4: Calculation with parameters
        System.out.println("\n--- Example 4: Calculations ---");
        printSquare(5);
        printSquare(10);
        printSquare(7);
        
        System.out.println("\n=====================================");
    }
    
    // METHOD 1: Single String parameter
    public static void greetPerson(String name) {
        System.out.println("  Hello, " + name + "\! Welcome\!");
    }
    
    // METHOD 2: Two parameters (String and int)
    public static void displayInfo(String name, int age) {
        System.out.println("  Name: " + name);
        System.out.println("  Age: " + age);
        System.out.println();
    }
    
    // METHOD 3: Multiple parameters, different types
    public static void showProduct(String productName, double price, int stock) {
        System.out.println("  Product: " + productName);
        System.out.println("  Price: $" + price);
        System.out.println("  In Stock: " + stock + " units");
        System.out.println();
    }
    
    // METHOD 4: Parameter used in calculation
    public static void printSquare(int number) {
        int square = number * number;
        System.out.println("  Square of " + number + " is " + square);
    }
}
```

**Expected Output:**
```
===== METHODS WITH PARAMETERS =====

--- Example 1: Greeting with name ---
  Hello, Alice\! Welcome\!
  Hello, Bob\! Welcome\!
  Hello, Charlie\! Welcome\!

--- Example 2: Personal info ---
  Name: Alice
  Age: 25

  Name: Bob
  Age: 30

--- Example 3: Product details ---
  Product: Laptop
  Price: $999.99
  In Stock: 5 units

  Product: Mouse
  Price: $25.5
  In Stock: 50 units

--- Example 4: Calculations ---
  Square of 5 is 25
  Square of 10 is 100
  Square of 7 is 49

=====================================
```

**💡 Parameter Terminology:**

```java
// Definition (parameters are declared here)
public static void greetPerson(String name) {
    //                           ^^^^^^^^^ Parameter
    System.out.println("Hello, " + name);
}

// Call (arguments are passed here)
greetPerson("Alice");
//          ^^^^^^^ Argument

// Parameters = Variables in method definition
// Arguments = Actual values passed when calling
```

**How Parameters Work:**
```
1. Method is called: greetPerson("Alice")
2. Value "Alice" is copied to parameter 'name'
3. Inside method, name = "Alice"
4. Method executes using that value
5. Method ends, parameter is destroyed
```

**✅ Success Criteria:**
- Understand parameters vs arguments
- Can create methods with multiple parameters
- Know how to pass different data types
- Recognize parameters make methods flexible

**Common Mistakes:**

1. ❌ **Wrong Number of Arguments**: Passing more or fewer arguments than the method has parameters
   - Why: Java requires the exact number of arguments to match the number of parameters. Each parameter needs a corresponding argument.
   - Fix: Count the parameters in the method definition and pass exactly that many arguments when calling.
   - Example:
     ```java
     public static void displayInfo(String name, int age) {
         System.out.println(name + " is " + age);
     }

     // Wrong
     displayInfo("Alice");        // Error: needs 2 arguments
     displayInfo("Alice", 25, 5); // Error: too many arguments

     // Correct
     displayInfo("Alice", 25);    // Exactly 2 arguments
     ```

2. ❌ **Wrong Argument Order**: Passing arguments in different order than parameters are defined
   - Why: Java matches arguments to parameters by position, not by meaning. The first argument goes to the first parameter, second to second, etc.
   - Fix: Pass arguments in the exact same order as parameters are defined in the method signature.
   - Example:
     ```java
     public static void displayInfo(String name, int age) {
         System.out.println(name + " is " + age);
     }

     // Wrong
     displayInfo(25, "Alice");  // Error: int cannot be String

     // Correct
     displayInfo("Alice", 25);  // Arguments match parameter order
     ```

3. ❌ **Wrong Data Type**: Passing an argument of incompatible type
   - Why: Each parameter has a specific type, and you must pass an argument of that type or one that can be automatically converted.
   - Fix: Ensure each argument's type matches the corresponding parameter's type.
   - Example:
     ```java
     public static void printAge(int age) {
         System.out.println("Age: " + age);
     }

     // Wrong
     printAge("25");      // Error: String cannot be int
     printAge(25.5);      // Error: double cannot be int (loses precision)

     // Correct
     printAge(25);        // int matches int parameter
     ```

4. ❌ **Using Parameter Name as Argument**: Writing `greetPerson(name)` when `name` is not defined in the calling scope
   - Why: Students confuse the parameter name in the method definition with what they should pass when calling.
   - Fix: Pass an actual value or a variable that exists in the scope where you're calling the method.
   - Example:
     ```java
     public static void greetPerson(String name) {
         System.out.println("Hello, " + name);
     }

     public static void main(String[] args) {
         // Wrong
         greetPerson(name);  // Error: cannot find symbol 'name'

         // Correct - pass actual value
         greetPerson("Alice");

         // Or use a variable that exists in main
         String myName = "Alice";
         greetPerson(myName);
     }
     ```

5. ❌ **Missing Data Type in Parameter Declaration**: Writing `greet(name)` instead of `greet(String name)`
   - Why: Students coming from languages like Python forget that Java requires explicit type declarations for all parameters.
   - Fix: Always specify the data type before the parameter name: `methodName(dataType paramName)`
   - Example:
     ```java
     // Wrong
     public static void greet(name) { }  // Compile error

     // Correct
     public static void greet(String name) { }  // Type specified
     ```

**Best Practices:**

1. ✅ **Use Meaningful Parameter Names**: Choose names that clearly describe the data
   - Why: Makes method calls self-documenting and reduces need for comments
   - How: Use descriptive names like `customerName`, `orderTotal`, `studentAge` instead of `x`, `y`, `data`
   - Example:
     ```java
     // Poor - unclear what parameters represent
     public static void display(String s, int n) { }

     // Good - immediately clear
     public static void displayStudent(String studentName, int studentAge) { }
     ```

2. ✅ **Order Parameters Logically**: Put most important or most used parameters first
   - Why: Makes method calls more intuitive and easier to remember
   - How: Required parameters first, optional-like parameters last; related parameters together
   - Example:
     ```java
     // Good ordering - name is primary, details follow
     public static void showProduct(String name, double price, int quantity) { }
     ```

3. ✅ **Limit Number of Parameters**: Keep to 3-4 parameters maximum
   - Why: Too many parameters make methods hard to use and remember
   - How: If you need many parameters, consider creating a class to group related data
   - Example:
     ```java
     // Avoid - too many parameters
     public static void createUser(String name, int age, String email,
                                   String phone, String address, String city) { }

     // Better - limit to essentials
     public static void createUser(String name, int age, String email) { }
     ```

4. ✅ **Match Parameter Types to Data**: Use the most appropriate type for each parameter
   - Why: Prevents type conversion errors and makes method purpose clearer
   - How: `int` for whole numbers, `double` for decimals, `String` for text, `boolean` for yes/no
   - Example:
     ```java
     // Good type choices
     public static void calculateGrade(double score, int totalQuestions) { }
     public static void displayUser(String name, boolean isPremium) { }
     ```

5. ✅ **Validate Parameters When Needed**: Check parameter values for validity
   - Why: Prevents errors and unexpected behavior from invalid input
   - How: Add checks at start of method for critical validations
   - Example:
     ```java
     public static void displayAge(int age) {
         if (age < 0 || age > 150) {
             System.out.println("Invalid age!");
             return;
         }
         System.out.println("Age: " + age);
     }
     ```

**🎯 Challenge:**
1. Create method `calculateRectangleArea(int length, int width)` that prints the area
2. Create method `introduce(String name, int age, String city)` that prints all three
3. Call both methods with different values

---

#### Exercise 3: Methods with Return Values (20 minutes)

**What you'll learn:** Getting results back from methods using return statements

**Create new class: `MethodReturns`**

**Concept:** **Return values** let methods send data back to the caller. Instead of just printing, the method gives you a result you can use, store, or pass to other methods.

```
void method = Worker that does job, doesn't report back
return method = Worker that does job AND reports the result
```

**Step-by-Step:**

```java
public class MethodReturns {
    public static void main(String[] args) {
        System.out.println("===== METHODS WITH RETURN VALUES =====\n");
        
        // Example 1: Basic return
        System.out.println("--- Example 1: Getting values ---");
        int lucky = getLuckyNumber();
        System.out.println("Lucky number: " + lucky);
        
        String greeting = getGreeting();
        System.out.println("Greeting: " + greeting);
        
        // Example 2: Return with parameters
        System.out.println("\n--- Example 2: Calculations ---");
        int sum = add(10, 20);
        System.out.println("10 + 20 = " + sum);
        
        int product = multiply(5, 6);
        System.out.println("5 × 6 = " + product);
        
        double average = calculateAverage(10, 20, 30);
        System.out.println("Average of 10, 20, 30 = " + average);
        
        // Example 3: Using return value directly
        System.out.println("\n--- Example 3: Direct usage ---");
        System.out.println("Is 10 even? " + isEven(10));
        System.out.println("Is 7 even? " + isEven(7));
        
        // Example 4: Using return in decisions
        System.out.println("\n--- Example 4: Return in if statements ---");
        if (isPositive(5)) {
            System.out.println("5 is positive\!");
        }
        
        if (\!isPositive(-3)) {
            System.out.println("-3 is not positive\!");
        }
        
        // Example 5: Chaining returns
        System.out.println("\n--- Example 5: Using return as input ---");
        int num1 = add(5, 10);     // Returns 15
        int num2 = multiply(2, 3); // Returns 6
        int result = add(num1, num2); // add(15, 6) = 21
        System.out.println("(5+10) + (2×3) = " + result);
        
        System.out.println("\n========================================");
    }
    
    // METHOD 1: Return int, no parameters
    public static int getLuckyNumber() {
        return 7;
    }
    
    // METHOD 2: Return String, no parameters
    public static String getGreeting() {
        return "Hello, World\!";
    }
    
    // METHOD 3: Return int, with parameters
    public static int add(int a, int b) {
        int sum = a + b;
        return sum;
        // OR simply: return a + b;
    }
    
    // METHOD 4: Return int
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    // METHOD 5: Return double
    public static double calculateAverage(int num1, int num2, int num3) {
        double avg = (num1 + num2 + num3) / 3.0;
        return avg;
    }
    
    // METHOD 6: Return boolean
    public static boolean isEven(int number) {
        if (number % 2 == 0) {
            return true;
        } else {
            return false;
        }
        // OR simply: return number % 2 == 0;
    }
    
    // METHOD 7: Return boolean
    public static boolean isPositive(int number) {
        return number > 0;
    }
}
```

**Expected Output:**
```
===== METHODS WITH RETURN VALUES =====

--- Example 1: Getting values ---
Lucky number: 7
Greeting: Hello, World\!

--- Example 2: Calculations ---
10 + 20 = 30
5 × 6 = 30
Average of 10, 20, 30 = 20.0

--- Example 3: Direct usage ---
Is 10 even? true
Is 7 even? false

--- Example 4: Return in if statements ---
5 is positive\!
-3 is not positive\!

--- Example 5: Using return as input ---
(5+10) + (2×3) = 21

========================================
```

**💡 Return Type Rules:**

```java
// Return type must match the declared type
public static int add(int a, int b) {
    return a + b;  // ✅ Returning int - matches
}

public static String getName() {
    return "Alice";  // ✅ Returning String - matches
}

public static void printMessage() {
    // No return needed for void
    System.out.println("Message");
    // Can use: return;  (to exit early)
}
```

**Return Value Flow:**
```
1. Method is called: int result = add(5, 10);
2. Method executes: calculates 5 + 10 = 15
3. Return statement: return 15;
4. Value 15 is sent back to caller
5. Value is stored in 'result' variable
```

**✅ Success Criteria:**
- Understand return vs void methods
- Can match return type with actual return value
- Know how to store and use return values
- Recognize return exits the method immediately

**Common Mistakes:**

1. ❌ **Using `void` When Method Should Return a Value**: Declaring method as `void` but trying to return a value
   - Why: Students don't understand that `void` means "no return value" and cannot be used with return statements that return values.
   - Fix: If your method needs to send back a value, change `void` to the appropriate return type (int, String, boolean, double, etc.)
   - Example:
     ```java
     // Wrong
     public static void add(int a, int b) {
         return a + b;  // Error: void method cannot return a value
     }

     // Correct
     public static int add(int a, int b) {
         return a + b;  // Returns int as declared
     }
     ```

2. ❌ **Forgetting Return Statement**: Method declares a return type but doesn't return anything
   - Why: Students forget that if a method has a return type other than void, it MUST return that type in all execution paths.
   - Fix: Ensure every possible path through your method has a return statement that returns the correct type.
   - Example:
     ```java
     // Wrong
     public static int getNumber() {
         System.out.println("Getting number");
         // Error: missing return statement
     }

     // Correct
     public static int getNumber() {
         System.out.println("Getting number");
         return 42;  // Returns an int
     }
     ```

3. ❌ **Return Type Mismatch**: Returning wrong data type than what method signature declares
   - Why: Students don't carefully match what they return with the declared return type.
   - Fix: The value after `return` must exactly match the return type in the method signature.
   - Example:
     ```java
     // Wrong
     public static int getName() {
         return "Alice";  // Error: String cannot be converted to int
     }

     // Correct - option 1: match the return type
     public static String getName() {
         return "Alice";  // Returns String as declared
     }

     // Correct - option 2: return the right type
     public static int getAge() {
         return 25;  // Returns int as declared
     }
     ```

4. ❌ **Writing Code After Return Statement**: Placing code after return that will never execute
   - Why: The return statement immediately exits the method, so any code after it is unreachable.
   - Fix: Put all necessary code before the return statement, or use conditional logic if you need multiple return points.
   - Example:
     ```java
     // Wrong
     public static int calculate() {
         return 42;
         System.out.println("Done");  // Error: unreachable statement
     }

     // Correct
     public static int calculate() {
         System.out.println("Calculating...");
         return 42;  // Return at the end
     }
     ```

5. ❌ **Not Using the Returned Value**: Calling a method that returns a value but ignoring the result
   - Why: Students call methods like `add(5, 10)` without capturing the return value, so the result is lost.
   - Fix: Store the returned value in a variable or use it directly in an expression or print statement.
   - Example:
     ```java
     public static int add(int a, int b) {
         return a + b;
     }

     // Wrong - value is calculated but lost
     add(5, 10);  // Result 15 is thrown away

     // Correct - store the value
     int sum = add(5, 10);
     System.out.println(sum);

     // Or use directly
     System.out.println(add(5, 10));
     ```

**Best Practices:**

1. ✅ **Prefer Return Values Over Printing**: Return calculated values rather than printing them
   - Why: Makes methods more flexible, reusable, and testable
   - How: Calculate the result, return it, let the caller decide what to do with it
   - Example:
     ```java
     // Poor - limited to printing
     public static void calculateSum(int a, int b) {
         System.out.println(a + b);
     }

     // Better - flexible, reusable
     public static int calculateSum(int a, int b) {
         return a + b;  // Caller can print, store, or use in calculations
     }
     ```

2. ✅ **Match Return Type to Purpose**: Choose the most appropriate return type
   - Why: Makes method contract clear and prevents unnecessary type conversions
   - How: `int` for counts/whole numbers, `double` for calculations, `boolean` for yes/no checks, `String` for text
   - Example:
     ```java
     public static boolean isValid(int age) { return age >= 0 && age <= 150; }
     public static double calculateAverage(int a, int b) { return (a + b) / 2.0; }
     public static int countItems(String text) { return text.length(); }
     ```

3. ✅ **Ensure All Code Paths Return**: Every possible path through method must return a value
   - Why: Compiler requires all execution paths to return the declared type
   - How: Check all if/else branches return appropriate value; add default return at end if needed
   - Example:
     ```java
     public static String getGrade(int score) {
         if (score >= 90) return "A";
         else if (score >= 80) return "B";
         else if (score >= 70) return "C";
         else if (score >= 60) return "D";
         else return "F";  // All paths covered
     }
     ```

4. ✅ **Use Clear Return Names**: When storing return values, use descriptive variable names
   - Why: Makes code readable and shows intent clearly
   - How: Name variables after what they represent, not generic names
   - Example:
     ```java
     // Poor
     int x = add(5, 10);

     // Good
     int totalScore = add(score1, score2);
     double average = calculateAverage(test1, test2, test3);
     boolean isEligible = checkAge(userAge);
     ```

5. ✅ **Simplify Boolean Returns**: Return boolean expressions directly instead of if-else
   - Why: More concise, clearer, professional code
   - How: Instead of if-else returning true/false, return the condition itself
   - Example:
     ```java
     // Verbose
     public static boolean isEven(int n) {
         if (n % 2 == 0) {
             return true;
         } else {
             return false;
         }
     }

     // Better - direct and clear
     public static boolean isEven(int n) {
         return n % 2 == 0;
     }
     ```

**🎯 Challenge:**
1. Create `getMax(int a, int b)` that returns the larger number
2. Create `getFullName(String first, String last)` that returns combined name
3. Create `calculateCircleArea(double radius)` that returns area (π × r²)

---

#### Exercise 4: Method Overloading Basics (25 minutes)

**What you'll learn:** Creating multiple methods with the same name but different parameters

**Create new class: `MethodOverloading`**

**Concept:** **Method overloading** means having multiple methods with the **same name** but **different parameters**. Java knows which one to call based on the arguments you pass.

```
Why overload?
- Same operation, different input types
- Example: print(int), print(String), print(double)
- One name, multiple versions - easier to remember\!
```

**Overloading Rules:**
1. ✅ Same method name
2. ✅ Different parameters (number, type, or order)
3. ❌ Return type alone is NOT enough

**Step-by-Step:**

```java
public class MethodOverloading {
    public static void main(String[] args) {
        System.out.println("===== METHOD OVERLOADING =====\n");
        
        // Example 1: Overloading by NUMBER of parameters
        System.out.println("--- Example 1: Adding numbers ---");
        System.out.println("add(5, 10) = " + add(5, 10));
        System.out.println("add(5, 10, 15) = " + add(5, 10, 15));
        System.out.println("add(5, 10, 15, 20) = " + add(5, 10, 15, 20));
        
        // Example 2: Overloading by TYPE of parameters
        System.out.println("\n--- Example 2: Printing different types ---");
        print(42);              // Calls print(int)
        print(3.14);            // Calls print(double)
        print("Hello");         // Calls print(String)
        print(true);            // Calls print(boolean)
        
        // Example 3: Overloading by ORDER of parameters
        System.out.println("\n--- Example 3: Display person info ---");
        displayPerson("Alice", 25);      // (String, int)
        displayPerson(30, "Bob");        // (int, String)
        
        // Example 4: Real-world example - Area calculations
        System.out.println("\n--- Example 4: Calculate areas ---");
        System.out.println("Square (side=5): " + calculateArea(5.0));
        System.out.println("Rectangle (4×6): " + calculateArea(4.0, 6.0));
        System.out.println("Circle (radius=3): " + calculateArea(3.0, true));
        
        System.out.println("\n================================");
    }
    
    // OVERLOAD GROUP 1: Add methods
    // Different NUMBER of parameters
    
    public static int add(int a, int b) {
        System.out.println("  Calling add(int, int)");
        return a + b;
    }
    
    public static int add(int a, int b, int c) {
        System.out.println("  Calling add(int, int, int)");
        return a + b + c;
    }
    
    public static int add(int a, int b, int c, int d) {
        System.out.println("  Calling add(int, int, int, int)");
        return a + b + c + d;
    }
    
    // OVERLOAD GROUP 2: Print methods
    // Different TYPES of parameters
    
    public static void print(int value) {
        System.out.println("  Integer: " + value);
    }
    
    public static void print(double value) {
        System.out.println("  Double: " + value);
    }
    
    public static void print(String value) {
        System.out.println("  String: " + value);
    }
    
    public static void print(boolean value) {
        System.out.println("  Boolean: " + value);
    }
    
    // OVERLOAD GROUP 3: Display person
    // Different ORDER of parameters
    
    public static void displayPerson(String name, int age) {
        System.out.println("  (String, int) → Name: " + name + ", Age: " + age);
    }
    
    public static void displayPerson(int age, String name) {
        System.out.println("  (int, String) → Age: " + age + ", Name: " + name);
    }
    
    // OVERLOAD GROUP 4: Calculate area
    // Different combinations for different shapes
    
    // Square: one parameter (side)
    public static double calculateArea(double side) {
        return side * side;
    }
    
    // Rectangle: two parameters (length, width)
    public static double calculateArea(double length, double width) {
        return length * width;
    }
    
    // Circle: two parameters (radius, boolean flag)
    public static double calculateArea(double radius, boolean isCircle) {
        if (isCircle) {
            return 3.14159 * radius * radius;
        }
        return 0;
    }
}
```

**Expected Output:**
```
===== METHOD OVERLOADING =====

--- Example 1: Adding numbers ---
  Calling add(int, int)
add(5, 10) = 15
  Calling add(int, int, int)
add(5, 10, 15) = 40
  Calling add(int, int, int, int)
add(5, 10, 15, 20) = 50

--- Example 2: Printing different types ---
  Integer: 42
  Double: 3.14
  String: Hello
  Boolean: true

--- Example 3: Display person info ---
  (String, int) → Name: Alice, Age: 25
  (int, String) → Age: 30, Name: Bob

--- Example 4: Calculate areas ---
Square (side=5): 25.0
Rectangle (4×6): 24.0
Circle (radius=3): 28.27431

================================
```

**💡 How Java Chooses Which Method:**

```java
print(42);
// 1. Checks method name: "print" ✅
// 2. Checks argument count: 1 ✅
// 3. Checks argument type: int ✅
// 4. Calls: print(int value)

add(5, 10, 15);
// 1. Checks method name: "add" ✅
// 2. Checks argument count: 3 ✅
// 3. Calls: add(int a, int b, int c)
```

**Overloading Decision Chart:**
```
Is method name same?
├─ NO → Not overloading (different methods)
└─ YES → Is parameter list different?
   ├─ NO → ❌ Compile error (duplicate method)
   └─ YES → ✅ Valid overloading
      └─ Different by:
         ├─ Number of parameters ✅
         ├─ Type of parameters ✅
         └─ Order of parameters ✅
```

**✅ Success Criteria:**
- Understand overloading lets same name = different versions
- Can overload by number, type, order of parameters
- Know Java chooses method based on arguments
- Recognize overloading makes APIs easier to use

**Common Mistakes:**

1. ❌ **Trying to Overload by Return Type Only**: Creating two methods with same name and parameters but different return types
   - Why: Java identifies methods by their signature (name + parameters), not by return type. Two methods with identical signatures but different return types cause a compile error.
   - Fix: If you want to overload, you must change the parameter list (number, type, or order), not just the return type.
   - Example:
     ```java
     // Wrong - can't distinguish by return type alone
     public static int calculate(int a, int b) {
         return a + b;
     }
     public static double calculate(int a, int b) {  // Error: duplicate method
         return (a + b) / 2.0;
     }

     // Correct - different parameter types
     public static int calculate(int a, int b) {
         return a + b;
     }
     public static double calculate(double a, double b) {
         return (a + b) / 2.0;
     }
     ```

2. ❌ **Creating Exact Duplicate Method Signatures**: Defining two methods with identical name and parameter list
   - Why: Java cannot have two methods with the exact same signature (name + parameter types). This creates ambiguity about which method to call.
   - Fix: Change at least one aspect of the parameter list: number, type, or order of parameters.
   - Example:
     ```java
     // Wrong - identical signatures
     public static void print(int value) {
         System.out.println("First: " + value);
     }
     public static void print(int number) {  // Error: duplicate method
         System.out.println("Second: " + number);
     }

     // Correct - different parameter types
     public static void print(int value) {
         System.out.println("Int: " + value);
     }
     public static void print(String value) {
         System.out.println("String: " + value);
     }
     ```

3. ❌ **Creating Ambiguous Overloads**: Defining overloaded methods that Java cannot clearly distinguish
   - Why: When Java can automatically convert types (like int to double), it may not be able to decide which overloaded method to call.
   - Fix: Make parameter lists clearly distinct so Java can always determine the correct method to call.
   - Example:
     ```java
     // Potentially ambiguous
     public static void process(int x, double y) { }
     public static void process(double x, int y) { }

     // Calling: process(5, 10) - Java can't decide which one!

     // Better - clearly different
     public static void process(int x, int y) { }
     public static void process(double x, double y) { }
     ```

4. ❌ **Overloading Unrelated Operations**: Using same method name for completely different operations
   - Why: Overloading should be for the same operation with different input types, not for different operations. This confuses users of your code.
   - Fix: Only overload when all versions perform conceptually the same operation. Use different names for different operations.
   - Example:
     ```java
     // Wrong - different operations with same name
     public static void process(int x) {
         // Calculates sum
         System.out.println("Sum: " + (x + x));
     }
     public static void process(String s) {
         // Reverses string - completely different!
         System.out.println(new StringBuilder(s).reverse());
     }

     // Correct - different names for different operations
     public static void calculateSum(int x) {
         System.out.println("Sum: " + (x + x));
     }
     public static void reverseString(String s) {
         System.out.println(new StringBuilder(s).reverse());
     }
     ```

5. ❌ **Confusing Parameter Order in Overloads**: Overloading by only swapping parameter order without clear naming
   - Why: When you overload by changing parameter order (like int, String vs String, int), it's easy to accidentally call the wrong version.
   - Fix: Use meaningful parameter names and be very careful when calling. Consider if parameter order overloading is really necessary.
   - Example:
     ```java
     public static void display(String name, int age) {
         System.out.println(name + " is " + age);
     }
     public static void display(int age, String name) {
         System.out.println(name + " is " + age);
     }

     // Confusing to call - easy to mix up
     display("Alice", 25);  // Which one gets called?
     display(25, "Alice");  // This one? They do the same thing!

     // Better - use one method instead
     public static void display(String name, int age) {
         System.out.println(name + " is " + age);
     }
     ```

**Best Practices:**

1. ✅ **Overload for Flexibility, Not Complexity**: Use overloading when operations are truly the same
   - Why: Overloading should make code simpler, not more confusing
   - How: Only overload when methods perform the same logical operation with different input types/counts
   - Example:
     ```java
     // Good - same operation (addition), different parameter counts
     public static int add(int a, int b) { return a + b; }
     public static int add(int a, int b, int c) { return a + b + c; }

     // Poor - different operations with same name confuses users
     public static void process(int x) { /* calculates sum */ }
     public static void process(String s) { /* sorts characters */ }
     ```

2. ✅ **Keep Overloaded Methods Consistent**: All overloads should behave similarly
   - Why: Users expect same method name to do conceptually the same thing
   - How: Ensure all overloaded versions perform the same core operation
   - Example:
     ```java
     // Good - all versions print, just different formats
     public static void print(int value) { System.out.println("Int: " + value); }
     public static void print(double value) { System.out.println("Double: " + value); }
     public static void print(String value) { System.out.println("String: " + value); }
     ```

3. ✅ **Make Parameter Lists Clearly Distinct**: Avoid ambiguous overloads
   - Why: Prevents compilation errors and makes method selection clear
   - How: Ensure parameter lists differ enough that Java can always determine which to call
   - Example:
     ```java
     // Good - clearly different
     public static void display(String name, int age) { }
     public static void display(int age, String name) { }

     // Avoid - can be ambiguous with type promotions
     public static void calculate(int x, double y) { }
     public static void calculate(double x, int y) { }
     ```

4. ✅ **Use Varargs for Unlimited Parameters**: Consider varargs instead of many overloads
   - Why: More flexible and cleaner than creating many overloaded versions
   - How: If you need to support many parameter counts, use `type... paramName` instead
   - Example:
     ```java
     // Instead of many overloads:
     // public static int sum(int a, int b) { }
     // public static int sum(int a, int b, int c) { }
     // public static int sum(int a, int b, int c, int d) { }

     // Use varargs - one method handles all:
     public static int sum(int... numbers) {
         int total = 0;
         for (int num : numbers) total += num;
         return total;
     }
     ```

5. ✅ **Document Overloaded Methods**: Clearly explain differences between overloads
   - Why: Helps users understand when to use each version
   - How: Add comments explaining what makes each overload different and when to use it
   - Example:
     ```java
     // Calculate area of square (one side length)
     public static double calculateArea(double side) { return side * side; }

     // Calculate area of rectangle (length and width)
     public static double calculateArea(double length, double width) { return length * width; }
     ```

**🎯 Challenge:**
1. Create overloaded `greet()` methods:
   - `greet()` → prints "Hello\!"
   - `greet(String name)` → prints "Hello, [name]\!"
   - `greet(String name, String time)` → prints "Good [time], [name]\!"
2. Create overloaded `multiply()` methods for 2, 3, and 4 numbers
3. Test all versions in main

---

#### Exercise 5: Variable Arguments (Varargs) (20 minutes)

**What you'll learn:** Creating methods that accept any number of arguments

**Create new class: `VarargsDemo`**

**Concept:** **Varargs (variable arguments)** let a method accept zero or more arguments of the same type. Instead of creating multiple overloaded methods, you create one flexible method.

```
Without varargs:
add(int a, int b)
add(int a, int b, int c)
add(int a, int b, int c, int d)
... tedious\!

With varargs:
add(int... numbers)  // Accepts any number of ints\!
```

**Syntax:** `dataType... variableName`

**Step-by-Step:**

```java
public class VarargsDemo {
    public static void main(String[] args) {
        System.out.println("===== VARARGS DEMO =====\n");
        
        // Example 1: Sum with different number of arguments
        System.out.println("--- Example 1: Flexible sum ---");
        System.out.println("sum() = " + sum());
        System.out.println("sum(5) = " + sum(5));
        System.out.println("sum(1, 2) = " + sum(1, 2));
        System.out.println("sum(1, 2, 3, 4, 5) = " + sum(1, 2, 3, 4, 5));
        System.out.println("sum(10, 20, 30, 40, 50, 60) = " + sum(10, 20, 30, 40, 50, 60));
        
        // Example 2: Print all values
        System.out.println("\n--- Example 2: Print any number of values ---");
        printAll("Apple");
        printAll("Apple", "Banana");
        printAll("Apple", "Banana", "Cherry", "Date", "Elderberry");
        
        // Example 3: Varargs with regular parameter
        System.out.println("\n--- Example 3: Join with separator ---");
        System.out.println(join(", ", "Java", "Python", "C++"));
        System.out.println(join(" - ", "Monday", "Tuesday", "Wednesday"));
        System.out.println(join(" | ", "One"));
        
        // Example 4: Find maximum
        System.out.println("\n--- Example 4: Find maximum ---");
        System.out.println("max(5, 2, 9, 1, 7) = " + max(5, 2, 9, 1, 7));
        System.out.println("max(100, 50) = " + max(100, 50));
        System.out.println("max(42) = " + max(42));
        
        // Example 5: Calculate average
        System.out.println("\n--- Example 5: Calculate average ---");
        System.out.println("average(10, 20, 30) = " + average(10, 20, 30));
        System.out.println("average(5, 10) = " + average(5, 10));
        
        System.out.println("\n==========================");
    }
    
    // METHOD 1: Sum any number of integers
    public static int sum(int... numbers) {
        System.out.print("  Received " + numbers.length + " number(s): ");
        
        int total = 0;
        for (int num : numbers) {
            System.out.print(num + " ");
            total += num;
        }
        System.out.println();
        
        return total;
    }
    
    // METHOD 2: Print any number of strings
    public static void printAll(String... items) {
        System.out.print("  Items (" + items.length + "): ");
        for (String item : items) {
            System.out.print(item + " ");
        }
        System.out.println();
    }
    
    // METHOD 3: Varargs with regular parameter
    // NOTE: Varargs MUST be the LAST parameter
    public static String join(String separator, String... words) {
        if (words.length == 0) {
            return "";
        }
        
        String result = words[0];
        for (int i = 1; i < words.length; i++) {
            result += separator + words[i];
        }
        
        return result;
    }
    
    // METHOD 4: Find maximum from any number of integers
    public static int max(int... numbers) {
        if (numbers.length == 0) {
            return 0;
        }
        
        int maximum = numbers[0];
        for (int num : numbers) {
            if (num > maximum) {
                maximum = num;
            }
        }
        
        return maximum;
    }
    
    // METHOD 5: Calculate average
    public static double average(int... numbers) {
        if (numbers.length == 0) {
            return 0;
        }
        
        int total = 0;
        for (int num : numbers) {
            total += num;
        }
        
        return (double) total / numbers.length;
    }
}
```

**Expected Output:**
```
===== VARARGS DEMO =====

--- Example 1: Flexible sum ---
  Received 0 number(s): 
sum() = 0
  Received 1 number(s): 5 
sum(5) = 5
  Received 2 number(s): 1 2 
sum(1, 2) = 3
  Received 5 number(s): 1 2 3 4 5 
sum(1, 2, 3, 4, 5) = 15
  Received 6 number(s): 10 20 30 40 50 60 
sum(10, 20, 30, 40, 50, 60) = 210

--- Example 2: Print any number of values ---
  Items (1): Apple 
  Items (2): Apple Banana 
  Items (5): Apple Banana Cherry Date Elderberry 

--- Example 3: Join with separator ---
Java, Python, C++
Monday - Tuesday - Wednesday
One

--- Example 4: Find maximum ---
max(5, 2, 9, 1, 7) = 9
max(100, 50) = 100
max(42) = 42

--- Example 5: Calculate average ---
average(10, 20, 30) = 20.0
average(5, 10) = 7.5

==========================
```

**💡 Varargs Behind the Scenes:**

```java
// When you write:
public static int sum(int... numbers)

// Java treats it like:
public static int sum(int[] numbers)

// So you can use it like an array:
for (int num : numbers) {
    // Process each number
}

// Access with index:
int first = numbers[0];
int count = numbers.length;
```

**Varargs Rules:**

| Rule | Example | Valid? |
|------|---------|--------|
| Only ONE varargs per method | `method(int... a, int... b)` | ❌ NO |
| Varargs must be LAST parameter | `method(int... nums, String s)` | ❌ NO |
| Varargs must be LAST parameter | `method(String s, int... nums)` | ✅ YES |
| Can have other params before | `method(int x, String... words)` | ✅ YES |
| Can pass zero arguments | `sum()` | ✅ YES |
| Can pass array directly | `sum(new int[]{1,2,3})` | ✅ YES |

**✅ Success Criteria:**
- Understand varargs = variable number of arguments
- Know varargs must be last parameter
- Can use varargs like an array inside method
- Recognize when varargs is better than overloading

**Common Mistakes:**

1. ❌ **Declaring Multiple Varargs Parameters**: Trying to have more than one varargs parameter in a method
   - Why: Java only allows one varargs parameter per method. Multiple varargs would create ambiguity about which arguments go to which parameter.
   - Fix: Use only one varargs parameter per method. If you need multiple variable-length inputs, use arrays instead.
   - Example:
     ```java
     // Wrong - can't have two varargs
     public static void process(int... numbers, String... words) {  // Error!
         // Which arguments go to numbers? Which to words?
     }

     // Correct - only one varargs
     public static void process(int... numbers) {
         // Works fine
     }

     // Alternative - use arrays for multiple variable inputs
     public static void process(int[] numbers, String[] words) {
         // Both can be variable length
     }
     ```

2. ❌ **Placing Varargs Before Other Parameters**: Putting varargs parameter before regular parameters
   - Why: Java requires varargs to be the last parameter because it consumes all remaining arguments. If it's not last, Java can't figure out where varargs ends and next parameter begins.
   - Fix: Always place varargs as the final parameter in the method signature.
   - Example:
     ```java
     // Wrong - varargs must be last
     public static String join(String... words, String separator) {  // Error!
         return "";
     }

     // Correct - varargs is last
     public static String join(String separator, String... words) {
         // Now Java knows: first arg = separator, rest = words
         return "";
     }
     ```

3. ❌ **Not Checking Varargs Length Before Accessing**: Accessing array elements without verifying the array isn't empty
   - Why: Varargs can receive zero arguments, resulting in an empty array. Accessing elements without checking causes ArrayIndexOutOfBoundsException.
   - Fix: Always check the length before accessing elements by index. Use length property or check in a loop.
   - Example:
     ```java
     // Wrong - might be empty
     public static int getFirst(int... numbers) {
         return numbers[0];  // Crash if no arguments passed!
     }

     // Correct - check length first
     public static int getFirst(int... numbers) {
         if (numbers.length == 0) {
             return 0;  // or throw exception, or use default
         }
         return numbers[0];  // Safe now
     }
     ```

4. ❌ **Wrong Varargs Syntax**: Placing the dots (...) in the wrong position
   - Why: The varargs syntax is specific: dots must come right after the type, then space, then variable name.
   - Fix: Use the correct format: `type... variableName` (dots immediately after type).
   - Example:
     ```java
     // Wrong - various incorrect placements
     public static void method(int ...numbers) {  // Space before dots
     }
     public static void method(int. ..numbers) {  // Space between dots
     }
     public static void method(...int numbers) {  // Dots before type
     }

     // Correct - dots right after type
     public static void method(int... numbers) {
         // This is the right way
     }
     ```

5. ❌ **Confusing Varargs with Arrays**: Not understanding that varargs is syntactic sugar for arrays
   - Why: Students don't realize that inside the method, varargs behaves exactly like an array. You can use array operations on it.
   - Fix: Understand that `type... name` becomes `type[] name` inside the method. Use array methods like length, loops, indexing.
   - Example:
     ```java
     public static void printAll(String... items) {
         // items is actually String[] inside the method

         // You can use .length
         System.out.println("Count: " + items.length);

         // You can index it
         if (items.length > 0) {
             System.out.println("First: " + items[0]);
         }

         // You can loop through it
         for (String item : items) {
             System.out.println(item);
         }
     }
     ```

**Best Practices:**

1. ✅ **Always Validate Varargs Length**: Check for empty varargs before processing
   - Why: Prevents ArrayIndexOutOfBoundsException when accessing elements
   - How: Check `parameters.length` before iterating or accessing elements
   - Example:
     ```java
     public static int max(int... numbers) {
         if (numbers.length == 0) {
             return 0;  // or throw exception, or return Integer.MIN_VALUE
         }
         // Now safe to process
         int maximum = numbers[0];
         for (int num : numbers) {
             if (num > maximum) maximum = num;
         }
         return maximum;
     }
     ```

2. ✅ **Use Varargs for Flexible APIs**: Prefer varargs over multiple overloaded methods
   - Why: Cleaner, more maintainable, and more flexible than many overloads
   - How: When a method needs to accept varying numbers of same-type arguments, use varargs
   - Example:
     ```java
     // Instead of:
     // public static int sum(int a, int b) { }
     // public static int sum(int a, int b, int c) { }
     // public static int sum(int a, int b, int c, int d) { }

     // Use varargs:
     public static int sum(int... numbers) {
         int total = 0;
         for (int num : numbers) total += num;
         return total;
     }
     ```

3. ✅ **Place Varargs Last**: Always put varargs as the last parameter
   - Why: Java requirement - only one varargs per method and must be last
   - How: Regular parameters first, varargs parameter last
   - Example:
     ```java
     // Good
     public static String join(String separator, String... words) { }

     // Wrong - won't compile
     public static String join(String... words, String separator) { }
     ```

4. ✅ **Use Enhanced For Loop with Varargs**: Iterate using for-each loop
   - Why: Cleaner, safer, and more readable than index-based loops
   - How: Use `for (Type element : varargsParam)` pattern
   - Example:
     ```java
     public static void printAll(String... items) {
         // Good - clean and simple
         for (String item : items) {
             System.out.println(item);
         }

         // Less preferred - more verbose
         for (int i = 0; i < items.length; i++) {
             System.out.println(items[i]);
         }
     }
     ```

5. ✅ **Consider Varargs vs. Collections**: Choose appropriate data structure
   - Why: Varargs for simple cases, Collections for complex operations
   - How: Use varargs for utility methods; use List/Set for methods that need collection operations
   - Example:
     ```java
     // Good for simple aggregation
     public static int sum(int... numbers) { }

     // Better for complex operations (sorting, filtering, etc.)
     public static void processData(List<Integer> numbers) { }
     ```

**🎯 Challenge:**
1. Create `concatenate(String... words)` that joins all strings with spaces
2. Create `min(int... numbers)` that finds the smallest number
3. Create `multiply(int... factors)` that multiplies all numbers together
4. Test each with different numbers of arguments

---

#### Exercise 6: Pass by Value Concept (20 minutes)

**What you'll learn:** Understanding how Java passes data to methods

**Create new class: `PassByValueDemo`**

**Concept:** Java is **strictly pass-by-value**. This means when you pass a variable to a method, Java passes a **copy** of the value, not the original variable itself.

```
For primitive types (int, double, boolean, etc.):
- A copy of the value is passed
- Changes inside method don't affect original

For objects (String, arrays, custom classes):
- A copy of the reference is passed
- You can modify object's contents
- But can't change what the reference points to
```

**Step-by-Step:**

```java
public class PassByValueDemo {
    public static void main(String[] args) {
        System.out.println("===== PASS BY VALUE DEMO =====\n");
        
        // Example 1: Primitive types - value doesn't change
        System.out.println("--- Example 1: Primitive types ---");
        int number = 10;
        System.out.println("Before method: number = " + number);
        modifyPrimitive(number);
        System.out.println("After method: number = " + number);
        System.out.println("  → Original NOT changed\!\n");
        
        // Example 2: Trying to swap two numbers
        System.out.println("--- Example 2: Swap attempt ---");
        int a = 5;
        int b = 10;
        System.out.println("Before swap: a = " + a + ", b = " + b);
        swap(a, b);
        System.out.println("After swap: a = " + a + ", b = " + b);
        System.out.println("  → Swap didn't work\! Values copied, not originals\n");
        
        // Example 3: Arrays - CAN modify contents
        System.out.println("--- Example 3: Arrays ---");
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Before: " + arrayToString(numbers));
        modifyArray(numbers);
        System.out.println("After: " + arrayToString(numbers));
        System.out.println("  → Array contents CHANGED\!\n");
        
        // Example 4: Strings - immutable
        System.out.println("--- Example 4: Strings (immutable) ---");
        String text = "Hello";
        System.out.println("Before: " + text);
        modifyString(text);
        System.out.println("After: " + text);
        System.out.println("  → String NOT changed (Strings are immutable)\n");
        
        // Example 5: Multiple primitives
        System.out.println("--- Example 5: Multiple values ---");
        int x = 100;
        int y = 200;
        int z = 300;
        System.out.println("Before: x=" + x + ", y=" + y + ", z=" + z);
        changeValues(x, y, z);
        System.out.println("After: x=" + x + ", y=" + y + ", z=" + z);
        System.out.println("  → All original values unchanged\!\n");
        
        System.out.println("================================");
    }
    
    // METHOD 1: Try to modify primitive
    public static void modifyPrimitive(int num) {
        System.out.println("  Inside method before: num = " + num);
        num = num * 2;  // Modifying the COPY
        System.out.println("  Inside method after: num = " + num);
    }
    
    // METHOD 2: Try to swap two numbers
    public static void swap(int x, int y) {
        System.out.println("  Inside swap before: x = " + x + ", y = " + y);
        int temp = x;
        x = y;
        y = temp;
        System.out.println("  Inside swap after: x = " + x + ", y = " + y);
        // x and y are LOCAL copies, originals unchanged
    }
    
    // METHOD 3: Modify array contents (this WORKS)
    public static void modifyArray(int[] arr) {
        System.out.println("  Inside method: Doubling all values...");
        for (int i = 0; i < arr.length; i++) {
            arr[i] = arr[i] * 2;  // Modifying contents through reference
        }
        // We have a copy of the reference, but it points to same array
    }
    
    // METHOD 4: Try to modify String (doesn't work)
    public static void modifyString(String str) {
        System.out.println("  Inside method before: " + str);
        str = str + " World";  // Creates NEW string, doesn't change original
        System.out.println("  Inside method after: " + str);
        // str is local copy of reference, and Strings are immutable anyway
    }
    
    // METHOD 5: Try to change multiple values
    public static void changeValues(int a, int b, int c) {
        System.out.println("  Inside method: Changing values...");
        a = 0;
        b = 0;
        c = 0;
        System.out.println("  Inside method: a=" + a + ", b=" + b + ", c=" + c);
        // Only local copies changed
    }
    
    // HELPER METHOD: Convert array to string
    public static String arrayToString(int[] arr) {
        String result = "[";
        for (int i = 0; i < arr.length; i++) {
            result += arr[i];
            if (i < arr.length - 1) {
                result += ", ";
            }
        }
        result += "]";
        return result;
    }
}
```

**Expected Output:**
```
===== PASS BY VALUE DEMO =====

--- Example 1: Primitive types ---
Before method: number = 10
  Inside method before: num = 10
  Inside method after: num = 20
After method: number = 10
  → Original NOT changed\!

--- Example 2: Swap attempt ---
Before swap: a = 5, b = 10
  Inside swap before: x = 5, y = 10
  Inside swap after: x = 10, y = 5
After swap: a = 5, b = 10
  → Swap didn't work\! Values copied, not originals

--- Example 3: Arrays ---
Before: [1, 2, 3, 4, 5]
  Inside method: Doubling all values...
After: [2, 4, 6, 8, 10]
  → Array contents CHANGED\!

--- Example 4: Strings (immutable) ---
Before: Hello
  Inside method before: Hello
  Inside method after: Hello World
After: Hello
  → String NOT changed (Strings are immutable)

--- Example 5: Multiple values ---
Before: x=100, y=200, z=300
  Inside method: Changing values...
  Inside method: a=0, b=0, c=0
After: x=100, y=200, z=300
  → All original values unchanged\!

================================
```

**💡 How Pass-by-Value Works:**

**Primitives:**
```java
int x = 10;
modifyPrimitive(x);

// What happens:
// 1. Value 10 is COPIED
// 2. Copy is passed to method
// 3. Method modifies the COPY
// 4. Original 'x' unchanged
```

**Arrays/Objects:**
```java
int[] arr = {1, 2, 3};
modifyArray(arr);

// What happens:
// 1. Reference to array is COPIED
// 2. Copy of reference is passed
// 3. Both references point to SAME array
// 4. Can modify array contents
// 5. But can't change what original reference points to
```

**Visual Diagram:**
```
Primitive:
┌──────────────┐
│ main()       │
│ int x = 10;  │
└──────────────┘
       │ Pass x
       ├─ Copy: 10
       ▼
┌──────────────────┐
│ method(int num)  │
│ num = 10 (copy)  │
│ num = 20         │ ← Changes copy only
└──────────────────┘
  x still = 10 ✓

Array:
┌──────────────────────┐
│ main()               │
│ int[] arr ──────┐    │
└─────────────────│────┘
       │ Pass arr│
       ├─ Copy   │
       ▼         ▼
┌────────────────┴─────┐
│ method(int[] a)      │
│ a[0] = 99 ──────┐    │
└─────────────────│────┘
                  ▼
          [99, 2, 3] ← Same array modified
```

**✅ Success Criteria:**
- Understand Java passes copies, not originals
- Know primitives can't be modified by methods
- Know array/object contents CAN be modified
- Recognize why swap doesn't work in Java

**Common Mistakes:**

1. ❌ **Expecting Primitive Values to Change After Method Call**: Thinking that modifying a parameter inside a method will change the original variable
   - Why: Java passes a copy of primitive values, not the original. Changes to the copy don't affect the original variable outside the method.
   - Fix: If you need to modify a primitive value, return the new value from the method and assign it back to the variable.
   - Example:
     ```java
     public static void modifyNumber(int x) {
         x = x * 2;  // Only modifies the copy
     }

     public static void main(String[] args) {
         int number = 10;
         modifyNumber(number);
         System.out.println(number);  // Still 10, not 20!

         // Correct approach - return the value
         number = doubleNumber(number);  // Now number = 20
     }

     public static int doubleNumber(int x) {
         return x * 2;  // Return the modified value
     }
     ```

2. ❌ **Thinking Java Has Pass-by-Reference**: Believing Java passes references like C++ or C#
   - Why: Java is ALWAYS pass-by-value. Even for objects, Java passes a copy of the reference value, not the reference itself.
   - Fix: Understand that you get a copy of the reference. You can modify object contents through the copy, but can't change what the original reference points to.
   - Example:
     ```java
     public static void reassignArray(int[] arr) {
         arr = new int[]{10, 20, 30};  // Changes only the copy of reference
     }

     public static void main(String[] args) {
         int[] numbers = {1, 2, 3};
         reassignArray(numbers);
         System.out.println(numbers[0]);  // Still 1, not 10!
         // The original reference still points to {1,2,3}

         // But you CAN modify contents:
         modifyContents(numbers);
         System.out.println(numbers[0]);  // Now 99!
     }

     public static void modifyContents(int[] arr) {
         arr[0] = 99;  // This works - modifying through the reference
     }
     ```

3. ❌ **Trying to Swap Primitive Values Without Return**: Attempting to swap two primitives by passing them to a method
   - Why: The swap only affects the copies of the values inside the method, not the originals.
     - Fix: Can't directly swap primitives through parameters. Either use an array wrapper or return multiple values (via array/object).
   - Example:
     ```java
     // Wrong - doesn't work
     public static void swap(int a, int b) {
         int temp = a;
         a = b;
         b = temp;  // Only swaps the copies!
     }

     int x = 5, y = 10;
     swap(x, y);
     System.out.println(x + ", " + y);  // Still 5, 10

     // Correct - use an array
     public static void swap(int[] values) {
         int temp = values[0];
         values[0] = values[1];
         values[1] = temp;
     }

     int[] nums = {5, 10};
     swap(nums);
     System.out.println(nums[0] + ", " + nums[1]);  // Now 10, 5
     ```

4. ❌ **Confusing Array Contents vs Array Reference**: Not understanding the difference between modifying array contents and reassigning the reference
   - Why: You can modify the contents of an array through a reference copy, but you can't make the original reference point to a different array.
   - Fix: Understand two concepts: (1) modifying existing array elements works, (2) reassigning the parameter to a new array doesn't affect original.
   - Example:
     ```java
     public static void modifyArray(int[] arr) {
         arr[0] = 100;           // ✓ Works - modifies original array contents
         arr = new int[]{1,2,3}; // ✗ Doesn't affect original reference
     }

     int[] numbers = {5, 10, 15};
     modifyArray(numbers);
     System.out.println(numbers[0]);     // 100 (first modification worked)
     System.out.println(numbers.length); // 3 (reassignment didn't work)
     ```

5. ❌ **Expecting Immutable Objects to Change**: Trying to modify immutable objects like String and expecting changes
   - Why: Strings are immutable in Java. Any "modification" creates a new String object without changing the original.
   - Fix: Return the new String from the method and assign it back to the variable.
   - Example:
     ```java
     public static void modifyString(String s) {
         s = s + " World";  // Creates new String, doesn't change original
     }

     String text = "Hello";
     modifyString(text);
     System.out.println(text);  // Still "Hello"

     // Correct - return the new string
     public static String appendWorld(String s) {
         return s + " World";
     }

     text = appendWorld(text);
     System.out.println(text);  // Now "Hello World"
     ```

**Best Practices:**

1. ✅ **Return Modified Values for Primitives**: Use return values when you need to modify primitives
   - Why: Java passes primitive values by copy, so changes inside method don't affect original
   - How: Return the modified value and assign it back to the variable
   - Example:
     ```java
     // Won't work - passes copy
     public static void increment(int n) {
         n++;  // Only affects copy
     }

     // Works - returns new value
     public static int increment(int n) {
         return n + 1;  // Caller assigns: x = increment(x);
     }
     ```

2. ✅ **Understand Reference Copying for Objects**: Know that object references are copied, not objects themselves
   - Why: Helps avoid confusion about why object contents change but reassignment doesn't
   - How: Remember you can modify object contents but can't make parameter point to different object
   - Example:
     ```java
     public static void modifyArray(int[] arr) {
         arr[0] = 100;  // Works - modifies array contents
         arr = new int[]{1, 2, 3};  // Doesn't affect original - only changes local reference
     }
     ```

3. ✅ **Use Return Values for Swap Operations**: Can't swap primitive variables directly in Java
   - Why: Pass-by-value means you only have copies of the values
   - How: Return swapped values in an array or use a wrapper class
   - Example:
     ```java
     // Won't work
     public static void swap(int a, int b) {
         int temp = a;
         a = b;
         b = temp;  // Only swaps copies
     }

     // Works - return array with swapped values
     public static int[] swap(int a, int b) {
         return new int[]{b, a};
     }
     // Usage: int[] result = swap(x, y); x = result[0]; y = result[1];
     ```

4. ✅ **Leverage Arrays/Objects for Multiple Return Values**: Use array or object when method needs to modify multiple values
   - Why: Can modify array/object contents which persists after method returns
   - How: Pass array or object, modify its contents, changes are visible to caller
   - Example:
     ```java
     public static void updateCoordinates(int[] point) {
         point[0] += 10;  // Move x
         point[1] += 20;  // Move y
         // Changes persist after method ends
     }
     // Usage: int[] position = {0, 0}; updateCoordinates(position);
     ```

5. ✅ **Document Pass-by-Value Behavior**: Clearly indicate whether method modifies parameters
   - Why: Helps users understand method's effect on arguments
   - How: Add comments explaining if/how parameters are affected
   - Example:
     ```java
     // Modifies array contents in place
     public static void sortArray(int[] numbers) { }

     // Returns new value, doesn't modify parameter
     public static int double(int number) { return number * 2; }
     ```

**Key Distinctions:**
```java
// WRONG expectation:
int x = 5;
increment(x);
// Expect x = 6? NO\! Still 5

// RIGHT approach:
int x = 5;
x = increment(x);  // Get return value
// Now x = 6 ✓

// OR use array:
int[] x = {5};
increment(x);  // Pass array
// x[0] is now 6 ✓
```

**🎯 Challenge:**
1. Create `tryToDouble(int n)` that tries to double a number - observe it doesn't work
2. Create `doubleCorrectly(int n)` that returns doubled value - this works\!
3. Create `resetArray(int[] arr)` that sets all elements to 0 - observe this works
4. Experiment and explain why each behaves differently

---

### 🎓 Day 10 Summary: Methods & Method Overloading

**What You Learned:**
1. ✅ Creating and calling basic methods
2. ✅ Using parameters to pass data to methods
3. ✅ Returning values from methods
4. ✅ Method overloading (same name, different parameters)
5. ✅ Varargs for flexible parameter counts
6. ✅ Pass-by-value concept in Java

**Key Takeaways:**
- Methods organize code into reusable blocks
- Parameters make methods flexible with different inputs
- Return values let methods send results back
- Overloading provides multiple versions of same method
- Varargs accept any number of arguments
- Java passes copies of values, not original variables

**Method Design Checklist:**
```
✅ Use descriptive method names (verbs: calculate, get, set, display)
✅ Keep methods focused on ONE task
✅ Use parameters instead of global variables
✅ Return values instead of printing (when possible)
✅ Overload when same operation needs different inputs
✅ Use varargs for unlimited same-type parameters
✅ Remember: Java passes by value always
```

**Before vs After:**
```java
// Before (without methods):
int sum = num1 + num2 + num3;
System.out.println(sum);
int product = num1 * num2 * num3;
System.out.println(product);
// Repetitive, hard to reuse

// After (with methods):
int sum = add(num1, num2, num3);
int product = multiply(num1, num2, num3);
// Clean, reusable, organized
```

**Next Steps:**
- Day 11: Encapsulation (Getters, Setters, Access Modifiers)
- Day 12: Inheritance (Extending classes, super keyword)
- Day 13: Polymorphism (Method overriding, dynamic dispatch)

---


### Day 11: Encapsulation & Access Modifiers

---

#### Exercise 1: Understanding Encapsulation Basics (15 minutes)

**What you'll learn:** The concept of encapsulation and why it's important

**Create new class: `BankAccountBad` and `BankAccountGood`**

**Concept:** **Encapsulation** means bundling data (variables) and methods together in a class, and controlling access to that data. It's like putting something valuable in a safe - you control who can access it and how.

```
Without Encapsulation:
- Anyone can directly change data
- No validation
- Data can become invalid
- Hard to maintain

With Encapsulation:
- Data is private
- Access through methods only
- Validation before changes
- Easy to maintain
```

**Step-by-Step:**

```java
// ❌ WITHOUT Encapsulation - BAD Practice
class BankAccountBad {
    public double balance;  // Anyone can access\!
    public String accountNumber;
}

// ✅ WITH Encapsulation - GOOD Practice
class BankAccountGood {
    private double balance;  // Hidden from outside
    private String accountNumber;
    
    // Controlled access through methods
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid amount\!");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Invalid withdrawal\!");
        }
    }
}

public class EncapsulationBasics {
    public static void main(String[] args) {
        System.out.println("===== ENCAPSULATION DEMO =====\n");
        
        // Example 1: Without encapsulation (BAD)
        System.out.println("--- WITHOUT Encapsulation ---");
        BankAccountBad badAccount = new BankAccountBad();
        badAccount.balance = 1000.0;
        System.out.println("Initial balance: $" + badAccount.balance);
        
        // PROBLEM: Anyone can do this\!
        badAccount.balance = -5000.0;  // Invalid\! But nothing stops it
        System.out.println("After invalid change: $" + badAccount.balance);
        System.out.println("  ❌ Data is corrupted\!\n");
        
        // Example 2: With encapsulation (GOOD)
        System.out.println("--- WITH Encapsulation ---");
        BankAccountGood goodAccount = new BankAccountGood();
        goodAccount.deposit(1000.0);
        System.out.println("Balance: $" + goodAccount.getBalance());
        
        // Try invalid operations
        goodAccount.deposit(-500.0);  // Rejected\!
        goodAccount.withdraw(2000.0);  // Rejected\!
        
        // Valid operations
        goodAccount.withdraw(300.0);
        System.out.println("Final balance: $" + goodAccount.getBalance());
        System.out.println("  ✅ Data protected\!\n");
        
        System.out.println("================================");
    }
}
```

**Expected Output:**
```
===== ENCAPSULATION DEMO =====

--- WITHOUT Encapsulation ---
Initial balance: $1000.0
After invalid change: $-5000.0
  ❌ Data is corrupted\!

--- WITH Encapsulation ---
Deposited: $1000.0
Balance: $1000.0
Invalid amount\!
Invalid withdrawal\!
Withdrawn: $300.0
Final balance: $700.0
  ✅ Data protected\!

================================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **Data Hiding** | Make variables private to hide them |
| **Controlled Access** | Use public methods to access private data |
| **Validation** | Check data before changing it |
| **Protection** | Prevent invalid states |

**Benefits of Encapsulation:**
1. **Data Protection**: Can't accidentally corrupt data
2. **Validation**: Ensure data is always valid
3. **Flexibility**: Change internal implementation without affecting users
4. **Maintenance**: Easier to find and fix bugs

**✅ Success Criteria:**
- Understand encapsulation = data hiding + controlled access
- Know why private variables are better than public
- Can validate data in setter methods
- Recognize encapsulation protects data integrity

**Common Mistakes:**

1. ❌ **Making All Instance Variables Public**: Declaring class fields as public instead of private
   - Why: Public fields can be directly accessed and modified by anyone, bypassing validation and breaking encapsulation. This leads to data corruption and hard-to-track bugs.
   - Fix: Always declare instance variables as `private` and provide controlled access through getter/setter methods.
   - Example:
     ```java
     // Wrong - no protection
     public class BankAccount {
         public double balance;  // Anyone can do: account.balance = -1000;
     }

     // Correct - encapsulated
     public class BankAccount {
         private double balance;  // Hidden from outside

         public double getBalance() {
             return balance;
         }

         public void deposit(double amount) {
             if (amount > 0) {
                 balance += amount;  // Controlled access with validation
             }
         }
     }
     ```

2. ❌ **No Validation in Setter Methods**: Accepting any value without checking if it's valid
   - Why: Without validation, invalid or malicious data can corrupt the object's state, leading to bugs and security issues.
   - Fix: Add validation logic in setter methods to ensure only valid data is accepted.
   - Example:
     ```java
     // Wrong - accepts any value
     public void setAge(int age) {
         this.age = age;  // Could be -100 or 9999!
     }

     // Correct - validates before setting
     public void setAge(int age) {
         if (age >= 0 && age <= 150) {
             this.age = age;
         } else {
             System.out.println("Invalid age! Must be 0-150");
         }
     }
     ```

3. ❌ **Not Using Getters/Setters**: Accessing or modifying private variables directly from outside the class
   - Why: This defeats the purpose of encapsulation. Students make variables private but then try to access them directly like `person.name`.
   - Fix: Always use getter and setter methods to access private variables.
   - Example:
     ```java
     public class Person {
         private String name;

         public String getName() { return name; }
         public void setName(String name) { this.name = name; }
     }

     // Wrong - can't access private field directly
     Person p = new Person();
     p.name = "Alice";  // Error: name has private access

     // Correct - use setter method
     p.setName("Alice");
     String name = p.getName();
     ```

4. ❌ **Exposing Private Data Through Getters**: Returning mutable objects directly from getters
   - Why: If you return a reference to a mutable object (like an array or ArrayList), callers can modify it directly, bypassing encapsulation.
   - Fix: Return a copy of mutable objects, or use Collections.unmodifiableList() for collections.
   - Example:
     ```java
     // Wrong - exposes internal array
     private int[] scores;
     public int[] getScores() {
         return scores;  // Caller can modify the array!
     }

     // Correct - return a copy
     public int[] getScores() {
         return Arrays.copyOf(scores, scores.length);
     }
     ```

5. ❌ **Forgetting the `this` Keyword**: Not using `this` when parameter name matches field name
   - Why: When a setter parameter has the same name as the field, you must use `this` to distinguish between them. Without it, you're just assigning the parameter to itself.
   - Fix: Use `this.fieldName` to refer to the instance variable.
   - Example:
     ```java
     // Wrong - doesn't actually set the field
     private String name;
     public void setName(String name) {
         name = name;  // Just assigns parameter to itself!
     }

     // Correct - uses this to refer to instance variable
     public void setName(String name) {
         this.name = name;  // this.name is the field
     }
     ```

**Best Practices:**

1. ✅ **Always Use private for Fields**: Make instance variables private by default
   - Why: Protects data from unauthorized access and modification
   - How: Declare all fields as `private` unless there's a specific reason not to
   - Example: `private String name;` not `public String name;`

2. ✅ **Provide Controlled Access via Methods**: Use getters and setters to access private fields
   - Why: Allows validation and maintains encapsulation while providing necessary access
   - How: Create public getter/setter methods for fields that need external access

3. ✅ **Initialize Fields in Constructor**: Set initial values when object is created
   - Why: Ensures object starts in valid state
   - How: Create constructor that accepts parameters and initializes fields

4. ✅ **Validate Input in Setters**: Check values before assigning to fields
   - Why: Prevents invalid data from corrupting object state
   - How: Add validation checks in setter methods before assignment

**🎯 Challenge:**
Create a `Student` class with:
- Private variables: name, age, gpa
- Validate: age (0-150), gpa (0.0-4.0)
- Public getters and setters with validation
- Test with valid and invalid data

---

#### Exercise 2: Getters and Setters (20 minutes)

**What you'll learn:** Creating getter and setter methods for controlled access

**Create new class: `Person`**

**Concept:** **Getters** and **Setters** are methods that provide controlled access to private variables.

```
Getter = Get the value (read)
  - public returnType getVariableName()
  - Returns the private variable

Setter = Set the value (write)
  - public void setVariableName(type value)
  - Sets the private variable (with validation)
  
Boolean Getter:
  - public boolean isVariableName()
```

**Step-by-Step:**

```java
public class Person {
    // Private variables - hidden from outside
    private String name;
    private int age;
    private double height;
    private boolean employed;
    
    // GETTER for name (read access)
    public String getName() {
        return name;
    }
    
    // SETTER for name (write access with validation)
    public void setName(String name) {
        if (name \!= null && \!name.trim().isEmpty()) {
            this.name = name;
        } else {
            System.out.println("Invalid name\!");
        }
    }
    
    // GETTER for age
    public int getAge() {
        return age;
    }
    
    // SETTER for age with validation
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            System.out.println("Invalid age\! Must be 0-150");
        }
    }
    
    // GETTER for height
    public double getHeight() {
        return height;
    }
    
    // SETTER for height with validation
    public void setHeight(double height) {
        if (height > 0 && height < 300) {  // cm
            this.height = height;
        } else {
            System.out.println("Invalid height\!");
        }
    }
    
    // BOOLEAN GETTER (notice "is" instead of "get")
    public boolean isEmployed() {
        return employed;
    }
    
    // SETTER for boolean
    public void setEmployed(boolean employed) {
        this.employed = employed;
    }
    
    // Display all info
    public void displayInfo() {
        System.out.println("--- Person Information ---");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Height: " + height + " cm");
        System.out.println("Employed: " + (employed ? "Yes" : "No"));
    }
}

public class GettersSettersDemo {
    public static void main(String[] args) {
        System.out.println("===== GETTERS & SETTERS =====\n");
        
        Person person = new Person();
        
        // Set values using setters
        System.out.println("--- Setting valid values ---");
        person.setName("Alice");
        person.setAge(25);
        person.setHeight(165.5);
        person.setEmployed(true);
        
        // Get values using getters
        System.out.println("Name: " + person.getName());
        System.out.println("Age: " + person.getAge());
        System.out.println("Height: " + person.getHeight());
        System.out.println("Employed: " + person.isEmployed());
        System.out.println();
        
        // Display all info
        person.displayInfo();
        
        // Try invalid values
        System.out.println("\n--- Testing validation ---");
        person.setName("");  // Empty name - invalid
        person.setAge(200);  // Too old - invalid
        person.setHeight(-10);  // Negative - invalid
        
        System.out.println("\n--- After invalid attempts ---");
        person.displayInfo();
        System.out.println("  (Values unchanged due to validation)\n");
        
        System.out.println("===============================");
    }
}
```

**Expected Output:**
```
===== GETTERS & SETTERS =====

--- Setting valid values ---
Name: Alice
Age: 25
Height: 165.5
Employed: true

--- Person Information ---
Name: Alice
Age: 25
Height: 165.5 cm
Employed: Yes

--- Testing validation ---
Invalid name\!
Invalid age\! Must be 0-150
Invalid height\!

--- After invalid attempts ---
--- Person Information ---
Name: Alice
Age: 25
Height: 165.5 cm
Employed: Yes
  (Values unchanged due to validation)

===============================
```

**💡 Getter/Setter Naming Rules:**

```java
private int age;
public int getAge()           // ✅ Correct
public void setAge(int age)   // ✅ Correct

private boolean active;
public boolean isActive()     // ✅ Correct for boolean
public void setActive(boolean active)  // ✅ Correct

// Common mistakes:
public int age()              // ❌ Missing "get"
public void age(int a)        // ❌ Missing "set"
public boolean getActive()    // ⚠️  Should be "is" for boolean
```

**Why Use Getters/Setters?**

| Reason | Explanation | Example |
|--------|-------------|---------|
| **Validation** | Check values before setting | Age must be 0-150 |
| **Read-Only** | Getter without setter | ID number (can't change) |
| **Write-Only** | Setter without getter | Password (can set, can't read) |
| **Calculated** | Getter computes value | Full name = first + last |
| **Logging** | Track access to data | Log when balance is checked |

**✅ Success Criteria:**
- Can write getters and setters for any variable
- Know naming convention (get/set/is)
- Add validation in setters
- Understand when to omit getter or setter

**Common Mistakes:**

1. ❌ **Missing "get" Prefix in Getter Methods**: Writing `public int age()` instead of `public int getAge()`
   - Why: Java naming conventions and frameworks like JavaBeans expect getters to start with "get" (or "is" for booleans). Missing this prefix breaks convention and can cause issues with frameworks.
   - Fix: Always prefix getters with "get" for non-boolean types and "is" for boolean types.
   - Example:
     ```java
     private int age;

     // Wrong - doesn't follow convention
     public int age() {
         return age;
     }

     // Correct - follows JavaBeans convention
     public int getAge() {
         return age;
     }
     ```

2. ❌ **Using "get" for Boolean Getters**: Writing `public boolean getActive()` instead of `public boolean isActive()`
   - Why: The convention for boolean getters is to use "is" prefix, not "get". This makes the code more readable and natural.
   - Fix: Use "is" prefix for boolean getters: `isActive()`, `isValid()`, `isEmpty()`.
   - Example:
     ```java
     private boolean active;
     private boolean employed;

     // Wrong - uses get for boolean
     public boolean getActive() {
         return active;
     }

     // Correct - uses is for boolean
     public boolean isActive() {
         return active;
     }

     public boolean isEmployed() {
         return employed;
     }
     ```

3. ❌ **No Validation in Setter Methods**: Accepting any value without checking if it's valid
   - Why: Setters should validate input to prevent invalid data from corrupting object state.
   - Fix: Add validation checks in setters before assigning values.
   - Example:
     ```java
     // Wrong - no validation
     public void setAge(int age) {
         this.age = age;  // Could be negative or unrealistic!
     }

     // Correct - validates input
     public void setAge(int age) {
         if (age >= 0 && age <= 150) {
             this.age = age;
         } else {
             System.out.println("Invalid age! Must be 0-150");
         }
     }
     ```

4. ❌ **Setter Returning a Value**: Making setter return something other than void
   - Why: By convention, setters should be void methods that just set the value. Returning a value confuses the method's purpose.
   - Fix: Make setters return `void` (or return `this` for method chaining if intentional).
   - Example:
     ```java
     // Wrong - setter returns a value
     public int setAge(int age) {
         this.age = age;
         return age;  // Why return? Confusing!
     }

     // Correct - setter is void
     public void setAge(int age) {
         if (age >= 0 && age <= 150) {
             this.age = age;
         }
     }

     // Alternative - return this for method chaining
     public Person setAge(int age) {
         this.age = age;
         return this;  // Allows: person.setAge(25).setName("Alice")
     }
     ```

5. ❌ **Getter with Complex Logic**: Putting complicated calculations or side effects in getter methods
   - Why: Getters should be simple, fast, and predictable. Complex logic makes the method slow and unpredictable.
   - Fix: Keep getters simple - just return the field. Move complex calculations to separate methods with descriptive names.
   - Example:
     ```java
     // Wrong - getter does too much
     public String getName() {
         connectToDatabase();
         logAccess();
         updateStatistics();
         return name;  // Too much happening for a simple "get"!
     }

     // Correct - getter is simple
     public String getName() {
         return name;
     }

     // Complex logic in separate method
     public String getNameWithStats() {
         updateStatistics();
         return name;
     }
     ```

**Best Practices:**

1. ✅ **Follow JavaBeans Naming Convention**: Use get/set/is prefixes consistently
   - Why: Standard recognized by frameworks and IDEs
   - How: `getName()`, `setName()`, `isActive()` for boolean
   - Example: Field `age` → `getAge()` and `setAge(int age)`

2. ✅ **Keep Getters Simple**: Just return the field value
   - Why: Getters should be fast, predictable accessors
   - How: Simple `return field;` without complex logic
   - Example: `public String getName() { return name; }`

3. ✅ **Add Validation in Setters**: Protect against invalid data
   - Why: Maintains object integrity and data quality
   - How: Check parameter value before assignment
   - Example: `public void setAge(int age) { if (age >= 0 && age <= 150) this.age = age; }`

4. ✅ **Return this for Method Chaining**: Enable fluent interfaces in setters
   - Why: Allows convenient chaining of setter calls
   - How: Return `this` instead of `void` from setters
   - Example: `public Person setName(String name) { this.name = name; return this; }`

**🎯 Challenge:**
Create a `Product` class with:
1. Private variables: productId (read-only), name, price, quantity
2. Getters for all
3. Setters for name (not empty), price (>0), quantity (>=0)
4. No setter for productId (set in constructor only)
5. Add method `getTotalValue()` that returns price × quantity

---

#### Exercise 3: Access Modifiers in Action (25 minutes)

**What you'll learn:** Understanding and using different access modifiers

**Create classes: `Employee`, `TestAccess`**

**Concept:** Java has 4 **access modifiers** that control who can access your class members:

| Modifier | Same Class | Same Package | Subclass | Everywhere |
|----------|------------|--------------|----------|------------|
| **private** | ✅ | ❌ | ❌ | ❌ |
| **default** | ✅ | ✅ | ❌ | ❌ |
| **protected** | ✅ | ✅ | ✅ | ❌ |
| **public** | ✅ | ✅ | ✅ | ✅ |

**Step-by-Step:**

```java
public class Employee {
    // PRIVATE - only accessible within this class
    private String socialSecurityNumber;
    private double salary;
    
    // DEFAULT (no modifier) - accessible within same package
    String department;
    int employeeId;
    
    // PROTECTED - accessible in subclasses and same package
    protected String name;
    protected int age;
    
    // PUBLIC - accessible everywhere
    public String email;
    public String phoneNumber;
    
    // Constructor
    public Employee(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    
    // PRIVATE method - only used internally
    private double calculateBonus() {
        return salary * 0.10;  // 10% bonus
    }
    
    // PUBLIC method - can be called from anywhere
    public void displayPublicInfo() {
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Phone: " + phoneNumber);
    }
    
    // PUBLIC method to access private data
    public void setSalary(double salary) {
        if (salary > 0) {
            this.salary = salary;
        }
    }
    
    public double getSalary() {
        return salary;
    }
    
    // PROTECTED method - for use in subclasses
    protected void displayProtectedInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
    
    // Method that uses private method internally
    public void displaySalaryInfo() {
        System.out.println("Salary: $" + salary);
        System.out.println("Bonus: $" + calculateBonus());  // Calling private method
        System.out.println("Total: $" + (salary + calculateBonus()));
    }
}

public class TestAccess {
    public static void main(String[] args) {
        System.out.println("===== ACCESS MODIFIERS DEMO =====\n");
        
        Employee emp = new Employee("John Doe", 30, "john@company.com");
        
        // PUBLIC access - works everywhere
        System.out.println("--- PUBLIC members (accessible) ---");
        emp.email = "john@company.com";
        emp.phoneNumber = "555-1234";
        System.out.println("Email: " + emp.email);
        System.out.println("Phone: " + emp.phoneNumber);
        emp.displayPublicInfo();
        
        // PROTECTED access - works in same package
        System.out.println("\n--- PROTECTED members (accessible in same package) ---");
        emp.name = "John Doe";
        emp.age = 30;
        System.out.println("Name: " + emp.name);
        System.out.println("Age: " + emp.age);
        
        // DEFAULT access - works in same package
        System.out.println("\n--- DEFAULT members (accessible in same package) ---");
        emp.department = "Engineering";
        emp.employeeId = 1001;
        System.out.println("Department: " + emp.department);
        System.out.println("Employee ID: " + emp.employeeId);
        
        // PRIVATE access - must use public methods
        System.out.println("\n--- PRIVATE members (must use public methods) ---");
        // emp.salary = 50000;  // ❌ ERROR\! Cannot access private
        // double bonus = emp.calculateBonus();  // ❌ ERROR\! Private method
        
        // Must use public methods instead
        emp.setSalary(75000.0);
        System.out.println("Salary: $" + emp.getSalary());
        emp.displaySalaryInfo();
        
        System.out.println("\n====================================");
        
        // Summary
        System.out.println("\n📚 ACCESS MODIFIER SUMMARY:");
        System.out.println("✅ PUBLIC: email, phoneNumber - accessed directly");
        System.out.println("✅ PROTECTED: name, age - accessed directly (same package)");
        System.out.println("✅ DEFAULT: department, employeeId - accessed directly (same package)");
        System.out.println("❌ PRIVATE: salary, calculateBonus() - accessed via public methods only");
    }
}
```

**Expected Output:**
```
===== ACCESS MODIFIERS DEMO =====

--- PUBLIC members (accessible) ---
Email: john@company.com
Phone: 555-1234
Name: John Doe
Email: john@company.com
Phone: 555-1234

--- PROTECTED members (accessible in same package) ---
Name: John Doe
Age: 30

--- DEFAULT members (accessible in same package) ---
Department: Engineering
Employee ID: 1001

--- PRIVATE members (must use public methods) ---
Salary: $75000.0
Bonus: $7500.0
Total: $82500.0

====================================

📚 ACCESS MODIFIER SUMMARY:
✅ PUBLIC: email, phoneNumber - accessed directly
✅ PROTECTED: name, age - accessed directly (same package)
✅ DEFAULT: department, employeeId - accessed directly (same package)
❌ PRIVATE: salary, calculateBonus() - accessed via public methods only
```

**💡 When to Use Each Modifier:**

```java
class BankAccount {
    // PRIVATE - sensitive data, internal implementation
    private double balance;
    private String accountNumber;
    private String password;
    
    // PROTECTED - for use in subclasses
    protected String accountType;
    protected Date createdDate;
    
    // DEFAULT - package-level sharing
    String bankBranch;
    int customerId;
    
    // PUBLIC - interface to outside world
    public void deposit(double amount) { }
    public void withdraw(double amount) { }
    public double getBalance() { }
}
```

**Access Modifier Decision Tree:**
```
Should everyone access this?
├─ YES → public
└─ NO → Is it for subclasses?
   ├─ YES → protected
   └─ NO → Is it for same package only?
      ├─ YES → default (no modifier)
      └─ NO → private
```

**✅ Success Criteria:**
- Understand all 4 access modifiers
- Know which modifier to use when
- Can explain visibility of each modifier
- Recognize private is most restrictive, public is least

**Common Mistakes:**

1. ❌ **Making Everything Public**: Declaring all variables and methods as public without considering security
   - Why: Public access means anyone can access and modify data directly, defeating encapsulation and creating security risks.
   - Fix: Start with `private` by default and only use `public` for methods that need to be accessed from outside.
   - Example:
     ```java
     // Wrong - everything exposed
     public class BankAccount {
         public String password;  // Security risk!
         public double balance;   // Can be modified directly!
     }

     // Correct - appropriate access levels
     public class BankAccount {
         private String password;  // Hidden
         private double balance;   // Protected

         public double getBalance() {  // Controlled access
             return balance;
         }
     }
     ```

2. ❌ **Forgetting Access Modifier**: Omitting the access modifier and getting default (package-private) accidentally
   - Why: When you don't specify an access modifier, Java uses "default" (package-private), which might not be what you intend. This makes code unclear.
   - Fix: Always explicitly specify the access modifier to make your intentions clear.
   - Example:
     ```java
     // Wrong - unclear intent, defaults to package-private
     String name;
     int age;

     // Correct - explicit intent
     private String name;  // Clear: only this class
     public int getAge() { // Clear: accessible everywhere
         return age;
     }
     ```

3. ❌ **Using Protected Unnecessarily**: Making fields protected when private would suffice
   - Why: Protected gives access to subclasses and the same package, which is more permissive than needed in most cases.
   - Fix: Use `private` unless you specifically need subclasses to access the member.
   - Example:
     ```java
     // Wrong - unnecessarily permissive
     public class User {
         protected String internalId;  // Do subclasses really need this?
     }

     // Correct - restrictive until proven otherwise
     public class User {
         private String internalId;  // Hidden by default

         // Provide access method if subclasses need it
         protected String getInternalId() {
             return internalId;
         }
     }
     ```

4. ❌ **Making Helper Methods Public**: Exposing internal utility methods that should be private
   - Why: Helper methods are implementation details that users don't need to know about. Making them public clutters the public API.
   - Fix: Mark internal helper methods as `private`.
   - Example:
     ```java
     // Wrong - implementation details exposed
     public class Calculator {
         public double add(double a, double b) {
             return a + b;
         }

         public boolean validateNumber(double n) {  // Internal helper, shouldn't be public!
             return !Double.isNaN(n);
         }
     }

     // Correct - helpers are private
     public class Calculator {
         public double add(double a, double b) {
             validateNumber(a);
             validateNumber(b);
             return a + b;
         }

         private boolean validateNumber(double n) {  // Internal only
             return !Double.isNaN(n);
         }
     }
     ```

5. ❌ **Confusing Default with Public**: Thinking that omitting an access modifier makes a member public
   - Why: Many beginners think no modifier = public, but it actually means package-private (default). This leads to unexpected access restrictions.
   - Fix: Understand that no modifier = default (package-private), not public. Be explicit with modifiers.
   - Example:
     ```java
     // What students think default means:
     class Example {
         String name;  // Student thinks: "This is public"
     }
     // Reality: name is only accessible within the same package

     // Be explicit:
     class Example {
         public String name;   // Truly public - accessible everywhere
         private String name2; // Private - this class only
     }
     ```

**🎯 Challenge:**
1. Create a `BankAccount` class with appropriate access modifiers:
   - Private: balance, pin
   - Protected: accountType
   - Default: branchCode
   - Public: deposit(), withdraw(), getBalance()
2. Try accessing each member from a test class
3. Observe what works and what doesn't

**📋 Best Practices:**

✅ **Follow the Principle of Least Privilege**
- **Why:** Grant the minimum level of access necessary for functionality
- **How:** Start with `private` by default, only increase visibility when needed
- **Example:**
```java
// ❌ Bad - Unnecessarily public
public class User {
    public String password;  // Security risk!
}

// ✅ Good - Minimal necessary access
public class User {
    private String password;  // Hidden from outside
    public boolean verifyPassword(String input) {
        return password.equals(input);
    }
}
```

✅ **Use Private for Implementation Details**
- **Why:** Internal helper methods and data should be hidden to allow implementation changes
- **How:** Mark all internal calculations, validations, and helper methods as `private`
- **Example:**
```java
public class Calculator {
    private double validateInput(double value) {  // Internal helper
        if (value < 0) throw new IllegalArgumentException();
        return value;
    }

    public double add(double a, double b) {  // Public interface
        return validateInput(a) + validateInput(b);
    }
}
```

✅ **Protected for Inheritance, Not General Access**
- **Why:** `protected` is for subclass extension, not package-wide sharing
- **How:** Only use `protected` when you intend for subclasses to access or override members
- **Example:**
```java
public class Employee {
    protected String name;  // ✅ Subclasses need this
    protected void calculateBonus() { }  // ✅ For override

    String department;  // ❌ Use private, not default
}
```

✅ **Avoid Default (Package-Private) Unless Intentional**
- **Why:** Default access is often used unintentionally, creating unclear boundaries
- **How:** Always explicitly declare `private` or `public`; use default only for package-internal utilities
- **Example:**
```java
// ✅ Good - Intentional package-private for testing
class TestHelper {  // Package-private class
    static void resetTestData() { }
}

// ❌ Bad - Accidental default access
class User {
    String username;  // Forgot to add private!
}
```

✅ **Document Access Level Decisions**
- **Why:** Future developers need to understand why certain access levels were chosen
- **How:** Add comments explaining non-obvious access choices
- **Example:**
```java
public class Cache {
    // Protected to allow test subclasses to verify internal state
    protected Map<String, Object> data;

    // Package-private for use by CacheManager in same package
    void clearExpired() { }
}
```

---

#### Exercise 4: Building a Complete Encapsulated Class (30 minutes)

**What you'll learn:** Putting it all together - building a real-world encapsulated class

**Create new class: `BankAccount`**

**Concept:** A well-encapsulated class has:
1. Private data members
2. Public getters/setters with validation
3. Business logic methods
4. Proper constructors
5. Data integrity guaranteed

**Step-by-Step:**

```java
public class BankAccount {
    // PRIVATE data members - fully encapsulated
    private String accountNumber;
    private String accountHolderName;
    private double balance;
    private String accountType;  // "Savings" or "Checking"
    private boolean active;
    
    // Constants
    private static final double MIN_BALANCE = 100.0;
    private static final double MAX_WITHDRAWAL = 5000.0;
    
    // CONSTRUCTOR with validation
    public BankAccount(String accountNumber, String accountHolderName, String accountType) {
        this.accountNumber = accountNumber;
        setAccountHolderName(accountHolderName);  // Use setter for validation
        setAccountType(accountType);
        this.balance = 0.0;
        this.active = true;
    }
    
    // GETTER for accountNumber (read-only, no setter)
    public String getAccountNumber() {
        return accountNumber;
    }
    
    // GETTER and SETTER for accountHolderName
    public String getAccountHolderName() {
        return accountHolderName;
    }
    
    public void setAccountHolderName(String name) {
        if (name \!= null && name.trim().length() >= 2) {
            this.accountHolderName = name;
        } else {
            System.out.println("Invalid name\! Must be at least 2 characters");
        }
    }
    
    // GETTER for balance (read-only from outside)
    public double getBalance() {
        return balance;
    }
    
    // No public setBalance() - balance can only change through deposit/withdraw
    
    // GETTER and SETTER for accountType
    public String getAccountType() {
        return accountType;
    }
    
    public void setAccountType(String type) {
        if ("Savings".equalsIgnoreCase(type) || "Checking".equalsIgnoreCase(type)) {
            this.accountType = type;
        } else {
            System.out.println("Invalid account type\! Must be Savings or Checking");
        }
    }
    
    // BOOLEAN GETTER for active
    public boolean isActive() {
        return active;
    }
    
    // BUSINESS LOGIC METHODS
    
    public void deposit(double amount) {
        if (\!active) {
            System.out.println("Account is inactive\!");
            return;
        }
        
        if (amount > 0) {
            balance += amount;
            System.out.println("✅ Deposited: $" + amount);
            System.out.println("   New balance: $" + balance);
        } else {
            System.out.println("❌ Invalid deposit amount\!");
        }
    }
    
    public void withdraw(double amount) {
        if (\!active) {
            System.out.println("Account is inactive\!");
            return;
        }
        
        if (amount <= 0) {
            System.out.println("❌ Invalid withdrawal amount\!");
            return;
        }
        
        if (amount > MAX_WITHDRAWAL) {
            System.out.println("❌ Exceeds maximum withdrawal of $" + MAX_WITHDRAWAL);
            return;
        }
        
        if (balance - amount < MIN_BALANCE) {
            System.out.println("❌ Cannot withdraw\! Minimum balance of $" + MIN_BALANCE + " required");
            System.out.println("   Current: $" + balance + ", After withdrawal: $" + (balance - amount));
            return;
        }
        
        balance -= amount;
        System.out.println("✅ Withdrawn: $" + amount);
        System.out.println("   New balance: $" + balance);
    }
    
    public void transfer(BankAccount recipient, double amount) {
        if (\!active) {
            System.out.println("Your account is inactive\!");
            return;
        }
        
        if (\!recipient.isActive()) {
            System.out.println("Recipient account is inactive\!");
            return;
        }
        
        System.out.println("\n--- Transfer Process ---");
        System.out.println("From: " + this.accountNumber + " (Balance: $" + this.balance + ")");
        System.out.println("To: " + recipient.getAccountNumber() + " (Balance: $" + recipient.getBalance() + ")");
        System.out.println("Amount: $" + amount);
        
        // Check if we can withdraw
        if (balance - amount >= MIN_BALANCE && amount <= MAX_WITHDRAWAL) {
            this.balance -= amount;
            recipient.balance += amount;
            System.out.println("✅ Transfer successful\!");
            System.out.println("   Your new balance: $" + this.balance);
            System.out.println("   Recipient balance: $" + recipient.getBalance());
        } else {
            System.out.println("❌ Transfer failed\! Check balance and limits");
        }
    }
    
    public void closeAccount() {
        this.active = false;
        System.out.println("Account " + accountNumber + " has been closed");
    }
    
    public void displayInfo() {
        System.out.println("\n╔════════════════════════════════════╗");
        System.out.println("║      BANK ACCOUNT INFORMATION      ║");
        System.out.println("╠════════════════════════════════════╣");
        System.out.println("║ Account #: " + accountNumber);
        System.out.println("║ Holder: " + accountHolderName);
        System.out.println("║ Type: " + accountType);
        System.out.println("║ Balance: $" + String.format("%.2f", balance));
        System.out.println("║ Status: " + (active ? "Active" : "Inactive"));
        System.out.println("╚════════════════════════════════════╝");
    }
}

public class BankAccountDemo {
    public static void main(String[] args) {
        System.out.println("===== COMPLETE ENCAPSULATION DEMO =====\n");
        
        // Create accounts
        BankAccount alice = new BankAccount("ACC001", "Alice Smith", "Savings");
        BankAccount bob = new BankAccount("ACC002", "Bob Johnson", "Checking");
        
        // Display initial state
        alice.displayInfo();
        bob.displayInfo();
        
        // Deposit money
        System.out.println("\n--- Deposits ---");
        alice.deposit(5000.0);
        bob.deposit(3000.0);
        
        // Try withdrawals
        System.out.println("\n--- Withdrawals ---");
        alice.withdraw(500.0);  // Valid
        alice.withdraw(10000.0);  // Too much
        alice.withdraw(4500.0);  // Would violate minimum balance
        
        // Transfer
        System.out.println("\n--- Transfer ---");
        alice.transfer(bob, 1000.0);
        
        // Display final state
        alice.displayInfo();
        bob.displayInfo();
        
        // Try to access private members
        System.out.println("\n--- Encapsulation Protection ---");
        // alice.balance = 1000000;  // ❌ ERROR\! balance is private
        // alice.accountNumber = "HACK";  // ❌ ERROR\! no setter
        System.out.println("✅ Cannot directly modify balance or account number\!");
        System.out.println("✅ Can only use public methods with validation\!");
        
        // Close account and try operations
        System.out.println("\n--- Closing Account ---");
        alice.closeAccount();
        alice.deposit(100.0);  // Should fail - account inactive
        
        System.out.println("\n=======================================");
    }
}
```

**Expected Output:**
```
===== COMPLETE ENCAPSULATION DEMO =====

╔════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION      ║
╠════════════════════════════════════╣
║ Account #: ACC001
║ Holder: Alice Smith
║ Type: Savings
║ Balance: $0.00
║ Status: Active
╚════════════════════════════════════╝

╔════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION      ║
╠════════════════════════════════════╣
║ Account #: ACC002
║ Holder: Bob Johnson
║ Type: Checking
║ Balance: $0.00
║ Status: Active
╚════════════════════════════════════╝

--- Deposits ---
✅ Deposited: $5000.0
   New balance: $5000.0
✅ Deposited: $3000.0
   New balance: $3000.0

--- Withdrawals ---
✅ Withdrawn: $500.0
   New balance: $4500.0
❌ Exceeds maximum withdrawal of $5000.0
❌ Cannot withdraw\! Minimum balance of $100.0 required
   Current: $4500.0, After withdrawal: $0.0

--- Transfer ---

--- Transfer Process ---
From: ACC001 (Balance: $4500.0)
To: ACC002 (Balance: $3000.0)
Amount: $1000.0
✅ Transfer successful\!
   Your new balance: $3500.0
   Recipient balance: $4000.0

╔════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION      ║
╠════════════════════════════════════╣
║ Account #: ACC001
║ Holder: Alice Smith
║ Type: Savings
║ Balance: $3500.00
║ Status: Active
╚════════════════════════════════════╝

╔════════════════════════════════════╗
║      BANK ACCOUNT INFORMATION      ║
╠════════════════════════════════════╣
║ Account #: ACC002
║ Holder: Bob Johnson
║ Type: Checking
║ Balance: $4000.00
║ Status: Active
╚════════════════════════════════════╝

--- Encapsulation Protection ---
✅ Cannot directly modify balance or account number\!
✅ Can only use public methods with validation\!

--- Closing Account ---
Account ACC001 has been closed
Account is inactive\!

=======================================
```

**💡 Encapsulation Best Practices Used:**

| Practice | Implementation | Benefit |
|----------|----------------|---------|
| Private data | All variables private | Data hiding |
| Read-only fields | Getter without setter | Immutability |
| Validation | Checks in all setters | Data integrity |
| Business rules | Min balance, max withdrawal | Domain logic |
| State management | Active/inactive status | Consistency |
| Controlled modification | deposit/withdraw only | Protection |

**Design Decisions Explained:**
```
1. accountNumber:
   - Getter: YES (need to read it)
   - Setter: NO (never changes after creation)

2. balance:
   - Getter: YES (need to check balance)
   - Setter: NO (only deposit/withdraw can change it)

3. accountHolderName:
   - Getter: YES (need to display)
   - Setter: YES (can update name, with validation)

4. active:
   - Getter: YES (isActive())
   - Setter: NO (closeAccount() manages this)
```

**✅ Success Criteria:**
- Understand complete encapsulation pattern
- Can design class with private data + public interface
- Know when to provide getter, setter, both, or neither
- Can implement business logic with validation

**🎯 Challenge:**
Create a `ShoppingCart` class with:
1. Private: items (array/list), totalAmount
2. Public methods: addItem(), removeItem(), getTotal(), checkout()
3. Validation: can't add negative prices, can't checkout if empty
4. Read-only: itemCount (calculated, no setter)

**📋 Best Practices:**

✅ **Make Data Members Private by Default**
- **Why:** Private fields enforce encapsulation and prevent uncontrolled external access
- **How:** Declare all instance variables as `private`, expose only through controlled methods
- **Example:**
```java
// ❌ Bad - Direct access possible
public class Product {
    public double price;  // Anyone can set negative price!
}

// ✅ Good - Controlled access only
public class Product {
    private double price;
    public void setPrice(double price) {
        if (price >= 0) this.price = price;
    }
}
```

✅ **Use Read-Only Properties for Derived or Immutable Data**
- **Why:** Some data shouldn't be directly set but should still be readable
- **How:** Provide getter only, no setter; value is set in constructor or calculated
- **Example:**
```java
public class BankAccount {
    private String accountNumber;  // Set once in constructor
    private double balance;

    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;  // Never changes
    }

    public String getAccountNumber() { return accountNumber; }
    // No setAccountNumber() - read-only!
}
```

✅ **Implement Business Logic Through Methods, Not Direct Field Access**
- **Why:** Business rules need validation and side effects; direct field access bypasses this
- **How:** Create methods like `deposit()`, `withdraw()` instead of `setBalance()`
- **Example:**
```java
// ❌ Bad - No business logic
public void setBalance(double balance) {
    this.balance = balance;  // Can set any value!
}

// ✅ Good - Enforces business rules
public void withdraw(double amount) {
    if (amount > 0 && amount <= balance && balance - amount >= MIN_BALANCE) {
        balance -= amount;
    } else {
        throw new IllegalArgumentException("Invalid withdrawal");
    }
}
```

✅ **Validate All Input in Setters and Constructors**
- **Why:** Prevents invalid object states that could cause bugs or security issues
- **How:** Check all parameters before assigning; throw exceptions or return error messages
- **Example:**
```java
public void setAccountType(String type) {
    if (type == null || type.trim().isEmpty()) {
        throw new IllegalArgumentException("Account type cannot be empty");
    }
    if (!type.equals("Savings") && !type.equals("Checking")) {
        throw new IllegalArgumentException("Invalid account type");
    }
    this.accountType = type;
}
```

✅ **Use Constants for Business Rules and Limits**
- **Why:** Makes business rules visible, reusable, and easy to change
- **How:** Define `private static final` constants at class level
- **Example:**
```java
public class BankAccount {
    private static final double MIN_BALANCE = 100.0;
    private static final double MAX_WITHDRAWAL = 5000.0;
    private static final String[] VALID_TYPES = {"Savings", "Checking"};

    public void withdraw(double amount) {
        if (amount > MAX_WITHDRAWAL) {
            throw new IllegalArgumentException("Exceeds max withdrawal");
        }
        // Use constants consistently
    }
}
```

**Common Mistakes:**

1. ❌ **Exposing Private Fields with Public Setters That Don't Validate**: Creating setters that blindly accept any value without checking if it makes sense
   - Why: Students think adding getters/setters is enough for encapsulation, but if setters don't validate, anyone can still set invalid data. This defeats the purpose of encapsulation.
   - Fix: Every setter must validate input before accepting it. Use constants for limits and throw exceptions or print errors for invalid values.
   - Example:
     ```java
     // Wrong - no validation
     public void setBalance(double balance) {
         this.balance = balance;  // Can set negative balance!
     }

     // Correct - with validation
     public void deposit(double amount) {
         if (amount <= 0) {
             throw new IllegalArgumentException("Deposit amount must be positive");
         }
         this.balance += amount;
     }

     // For balance, don't provide setter at all - use deposit/withdraw methods
     ```

2. ❌ **Providing Setters for Fields That Should Be Immutable**: Creating public setters for fields like account numbers that should never change after creation
   - Why: Not all private fields need setters. Some data (like account numbers, IDs) should be set once in the constructor and never modified.
   - Fix: Only provide getters for read-only fields. Set them in the constructor and omit the setter method entirely.
   - Example:
     ```java
     // Wrong - account number can be changed
     private String accountNumber;

     public void setAccountNumber(String accountNumber) {
         this.accountNumber = accountNumber;  // Should never change!
     }

     // Correct - read-only after construction
     private String accountNumber;

     public BankAccount(String accountNumber) {
         this.accountNumber = accountNumber;  // Set once
     }

     public String getAccountNumber() {
         return accountNumber;  // Only getter, no setter
     }
     ```

3. ❌ **Not Using Constants for Business Rules**: Hardcoding magic numbers in validation logic instead of defining constants
   - Why: Business rules (min balance, max withdrawal, etc.) should be clear and easy to change. Hardcoding values like `100.0` throughout the class makes it hard to maintain and understand.
   - Fix: Define `private static final` constants at the top of the class with meaningful names.
   - Example:
     ```java
     // Wrong - magic numbers everywhere
     public void withdraw(double amount) {
         if (balance - amount < 100.0) {  // What does 100 mean?
             // error
         }
         if (amount > 5000.0) {  // What does 5000 mean?
             // error
         }
     }

     // Correct - using constants
     private static final double MIN_BALANCE = 100.0;
     private static final double MAX_WITHDRAWAL = 5000.0;

     public void withdraw(double amount) {
         if (balance - amount < MIN_BALANCE) {
             System.out.println("Minimum balance of $" + MIN_BALANCE + " required");
         }
         if (amount > MAX_WITHDRAWAL) {
             System.out.println("Exceeds maximum withdrawal of $" + MAX_WITHDRAWAL);
         }
     }
     ```

4. ❌ **Mixing Direct Field Access with Method Access in Business Logic**: Accessing private fields directly in some methods but through getters in others, leading to inconsistency
   - Why: While methods in the same class can access private fields directly, using getters internally can sometimes be better for consistency and future refactoring (if getter logic changes).
   - Fix: Be consistent. For simple fields, direct access is fine within the class. For computed or validated fields, consider using getters even internally.
   - Example:
     ```java
     // Inconsistent
     public void transfer(BankAccount recipient, double amount) {
         this.balance -= amount;  // Direct access
         recipient.balance += amount;  // Direct access
         System.out.println(recipient.getBalance());  // Using getter
     }

     // Consistent approach 1 - direct access (common for same class)
     public void transfer(BankAccount recipient, double amount) {
         this.balance -= amount;
         recipient.balance += amount;
     }

     // Consistent approach 2 - using getters (more flexible)
     public void transfer(BankAccount recipient, double amount) {
         this.balance -= amount;
         recipient.balance += amount;
         // When displaying, use getter for consistency
     }
     ```

5. ❌ **Forgetting to Validate in Constructors**: Validating in setters but directly assigning in constructors, bypassing validation
   - Why: Constructors are the first point where data enters the object. If you validate in setters but not in constructors, invalid objects can still be created.
   - Fix: Call setters from the constructor instead of assigning directly, or duplicate validation logic in constructor.
   - Example:
     ```java
     // Wrong - bypasses validation
     public BankAccount(String accountHolderName, String accountType) {
         this.accountHolderName = accountHolderName;  // No validation!
         this.accountType = accountType;  // No validation!
     }

     // Correct - uses setters for validation
     public BankAccount(String accountHolderName, String accountType) {
         setAccountHolderName(accountHolderName);  // Validation happens here
         setAccountType(accountType);  // Validation happens here
     }
     ```

---

#### Exercise 5: Data Validation in Setters (20 minutes)

**What you'll learn:** Implementing robust validation logic in setter methods

**Create new class: `ValidatedStudent`**

**Concept:** **Validation** is critical for encapsulation. Setters should validate data before accepting it. This prevents invalid states and maintains data integrity.

```
Good Validation Practices:
1. Check for null/empty strings
2. Verify numeric ranges
3. Ensure logical constraints
4. Provide clear feedback on invalid input
5. Use constants for limits
```

**Step-by-Step:**

```java
public class ValidatedStudent {
    // Constants for validation
    private static final int MIN_AGE = 5;
    private static final int MAX_AGE = 100;
    private static final double MIN_GPA = 0.0;
    private static final double MAX_GPA = 4.0;
    private static final int MIN_CREDITS = 0;
    private static final int MAX_CREDITS = 200;

    // Private instance variables
    private String studentId;
    private String name;
    private int age;
    private double gpa;
    private int creditsCompleted;
    private String major;
    private boolean isEnrolled;

    // Constructor with validation
    public ValidatedStudent(String studentId, String name) {
        setStudentId(studentId);
        setName(name);
        this.isEnrolled = true;
    }

    // VALIDATED SETTERS

    public void setStudentId(String studentId) {
        if (studentId == null || studentId.trim().isEmpty()) {
            System.out.println("❌ ERROR: Student ID cannot be empty");
            return;
        }
        if (!studentId.matches("STU\\d{4}")) {
            System.out.println("❌ ERROR: Student ID must be in format STU#### (e.g., STU1001)");
            return;
        }
        this.studentId = studentId;
        System.out.println("✅ Student ID set: " + studentId);
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            System.out.println("❌ ERROR: Name cannot be empty");
            return;
        }
        if (name.length() < 2) {
            System.out.println("❌ ERROR: Name must be at least 2 characters");
            return;
        }
        if (!name.matches("[a-zA-Z\\s]+")) {
            System.out.println("❌ ERROR: Name can only contain letters and spaces");
            return;
        }
        this.name = name;
        System.out.println("✅ Name set: " + name);
    }

    public void setAge(int age) {
        if (age < MIN_AGE || age > MAX_AGE) {
            System.out.println("❌ ERROR: Age must be between " + MIN_AGE + " and " + MAX_AGE);
            return;
        }
        this.age = age;
        System.out.println("✅ Age set: " + age);
    }

    public void setGpa(double gpa) {
        if (gpa < MIN_GPA || gpa > MAX_GPA) {
            System.out.println("❌ ERROR: GPA must be between " + MIN_GPA + " and " + MAX_GPA);
            return;
        }
        this.gpa = gpa;
        System.out.println("✅ GPA set: " + gpa);
    }

    public void setCreditsCompleted(int credits) {
        if (credits < MIN_CREDITS) {
            System.out.println("❌ ERROR: Credits cannot be negative");
            return;
        }
        if (credits > MAX_CREDITS) {
            System.out.println("❌ ERROR: Credits cannot exceed " + MAX_CREDITS);
            return;
        }
        this.creditsCompleted = credits;
        System.out.println("✅ Credits set: " + credits);
    }

    public void setMajor(String major) {
        if (major == null || major.trim().isEmpty()) {
            System.out.println("❌ ERROR: Major cannot be empty");
            return;
        }
        String[] validMajors = {"Computer Science", "Engineering", "Business", "Medicine", "Arts"};
        boolean isValid = false;
        for (String validMajor : validMajors) {
            if (major.equalsIgnoreCase(validMajor)) {
                isValid = true;
                break;
            }
        }
        if (!isValid) {
            System.out.println("❌ ERROR: Invalid major. Choose from: Computer Science, Engineering, Business, Medicine, Arts");
            return;
        }
        this.major = major;
        System.out.println("✅ Major set: " + major);
    }

    public void setEnrolled(boolean enrolled) {
        if (!enrolled && creditsCompleted == 0) {
            System.out.println("❌ ERROR: Cannot unenroll student with 0 credits");
            return;
        }
        this.isEnrolled = enrolled;
        System.out.println("✅ Enrollment status: " + (enrolled ? "Enrolled" : "Not Enrolled"));
    }

    // GETTERS
    public String getStudentId() { return studentId; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
    public int getCreditsCompleted() { return creditsCompleted; }
    public String getMajor() { return major; }
    public boolean isEnrolled() { return isEnrolled; }

    // Additional methods
    public String getClassification() {
        if (creditsCompleted < 30) return "Freshman";
        if (creditsCompleted < 60) return "Sophomore";
        if (creditsCompleted < 90) return "Junior";
        return "Senior";
    }

    public void displayStudentInfo() {
        System.out.println("\n╔════════════════════════════════════╗");
        System.out.println("║      STUDENT INFORMATION          ║");
        System.out.println("╚════════════════════════════════════╝");
        System.out.println("ID: " + studentId);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
        System.out.println("Credits: " + creditsCompleted);
        System.out.println("Major: " + (major != null ? major : "Undeclared"));
        System.out.println("Classification: " + getClassification());
        System.out.println("Status: " + (isEnrolled ? "Enrolled ✓" : "Not Enrolled"));
        System.out.println("════════════════════════════════════");
    }

    public static void main(String[] args) {
        System.out.println("===== DATA VALIDATION IN SETTERS =====\n");

        // Create student with valid data
        System.out.println("--- Creating Student ---");
        ValidatedStudent student = new ValidatedStudent("STU1001", "Alice Johnson");

        // Test valid data
        System.out.println("\n--- Setting Valid Data ---");
        student.setAge(20);
        student.setGpa(3.75);
        student.setCreditsCompleted(45);
        student.setMajor("Computer Science");

        // Display info
        student.displayStudentInfo();

        // Test invalid data
        System.out.println("\n--- Testing Invalid Data ---");

        System.out.println("\n1. Invalid Student ID:");
        student.setStudentId("ABC123");  // Wrong format
        student.setStudentId("");  // Empty

        System.out.println("\n2. Invalid Name:");
        student.setName("");  // Empty
        student.setName("A");  // Too short
        student.setName("Alice123");  // Contains numbers

        System.out.println("\n3. Invalid Age:");
        student.setAge(3);  // Too young
        student.setAge(150);  // Too old
        student.setAge(-5);  // Negative

        System.out.println("\n4. Invalid GPA:");
        student.setGpa(-1.0);  // Below minimum
        student.setGpa(5.0);  // Above maximum

        System.out.println("\n5. Invalid Credits:");
        student.setCreditsCompleted(-10);  // Negative
        student.setCreditsCompleted(250);  // Too high

        System.out.println("\n6. Invalid Major:");
        student.setMajor("Underwater Basket Weaving");  // Not in list
        student.setMajor("");  // Empty

        System.out.println("\n7. Invalid Enrollment Status:");
        ValidatedStudent newStudent = new ValidatedStudent("STU1002", "Bob Smith");
        newStudent.setEnrolled(false);  // Can't unenroll with 0 credits

        // Final state
        System.out.println("\n--- Final Student State ---");
        student.displayStudentInfo();

        System.out.println("\n=======================================");
    }
}
```

**Expected Output:**
```
===== DATA VALIDATION IN SETTERS =====

--- Creating Student ---
✅ Student ID set: STU1001
✅ Name set: Alice Johnson

--- Setting Valid Data ---
✅ Age set: 20
✅ GPA set: 3.75
✅ Credits set: 45
✅ Major set: Computer Science

╔════════════════════════════════════╗
║      STUDENT INFORMATION          ║
╚════════════════════════════════════╝
ID: STU1001
Name: Alice Johnson
Age: 20
GPA: 3.75
Credits: 45
Major: Computer Science
Classification: Sophomore
Status: Enrolled ✓
════════════════════════════════════

--- Testing Invalid Data ---

1. Invalid Student ID:
❌ ERROR: Student ID must be in format STU#### (e.g., STU1001)
❌ ERROR: Student ID cannot be empty

2. Invalid Name:
❌ ERROR: Name cannot be empty
❌ ERROR: Name must be at least 2 characters
❌ ERROR: Name can only contain letters and spaces

3. Invalid Age:
❌ ERROR: Age must be between 5 and 100
❌ ERROR: Age must be between 5 and 100
❌ ERROR: Age must be between 5 and 100

4. Invalid GPA:
❌ ERROR: GPA must be between 0.0 and 4.0
❌ ERROR: GPA must be between 0.0 and 4.0

5. Invalid Credits:
❌ ERROR: Credits cannot be negative
❌ ERROR: Credits cannot exceed 200

6. Invalid Major:
❌ ERROR: Invalid major. Choose from: Computer Science, Engineering, Business, Medicine, Arts
❌ ERROR: Major cannot be empty

7. Invalid Enrollment Status:
✅ Student ID set: STU1002
✅ Name set: Bob Smith
❌ ERROR: Cannot unenroll student with 0 credits

--- Final Student State ---

╔════════════════════════════════════╗
║      STUDENT INFORMATION          ║
╚════════════════════════════════════╝
ID: STU1001
Name: Alice Johnson
Age: 20
GPA: 3.75
Credits: 45
Major: Computer Science
Classification: Sophomore
Status: Enrolled ✓
════════════════════════════════════

=======================================
```

**💡 Validation Patterns:**

| Validation Type | Example | Purpose |
|-----------------|---------|---------|
| **Null/Empty Check** | `if (value == null \|\| value.trim().isEmpty())` | Prevent missing data |
| **Range Check** | `if (value < MIN \|\| value > MAX)` | Ensure within bounds |
| **Pattern Matching** | `if (!value.matches("regex"))` | Validate format |
| **Business Logic** | `if (credits == 0 && !enrolled)` | Enforce rules |
| **List Validation** | Check against array of valid values | Limit choices |

**Validation Best Practices:**
```java
// ✅ GOOD: Use constants
private static final int MAX_AGE = 100;
if (age > MAX_AGE) { /* error */ }

// ❌ BAD: Magic numbers
if (age > 100) { /* error */ }

// ✅ GOOD: Clear error messages
System.out.println("❌ ERROR: Age must be between 5 and 100");

// ❌ BAD: Vague messages
System.out.println("Invalid input");

// ✅ GOOD: Return early on error
if (invalid) {
    System.out.println("Error");
    return;
}
// continue with valid data

// ❌ BAD: Nested if-else
if (valid) {
    // many lines
} else {
    // error
}
```

**✅ Success Criteria:**
- Understand importance of validation in setters
- Can implement multiple validation types
- Use constants for validation limits
- Provide clear error messages
- Handle edge cases (null, empty, negative, out of range)

**Common Mistakes:**

1. ❌ **No Validation in Setters**: Accepting any value without checking if it's valid
   - Why: Setters without validation allow invalid data to corrupt object state, leading to bugs, crashes, or security vulnerabilities.
   - Fix: Always add validation logic in setters to check that input meets requirements before assigning.
   - Example:
     ```java
     // Wrong - no validation
     public void setAge(int age) {
         this.age = age;  // Could be -100 or 9999!
     }

     // Correct - validates input
     public void setAge(int age) {
         if (age >= 0 && age <= 150) {
             this.age = age;
         } else {
             System.out.println("Error: Age must be between 0 and 150");
         }
     }
     ```

2. ❌ **Silent Failures in Validation**: Not informing the user when validation fails
   - Why: When validation fails silently, users don't know their input was rejected, making debugging and user experience terrible.
   - Fix: Print clear error messages or throw exceptions when validation fails to inform the caller what went wrong.
   - Example:
     ```java
     // Wrong - silent failure
     public void setEmail(String email) {
         if (email.contains("@")) {
             this.email = email;
         }
         // Silently ignores invalid email - user has no idea!
     }

     // Correct - clear feedback
     public void setEmail(String email) {
         if (email != null && email.contains("@")) {
             this.email = email;
         } else {
             System.out.println("Error: Invalid email format. Must contain @");
         }
     }
     ```

3. ❌ **Using Magic Numbers in Validation**: Hard-coding validation values directly in the code
   - Why: Magic numbers make code hard to understand and maintain. If business rules change, you have to find and update every instance.
   - Fix: Define constants with descriptive names for all validation limits and use them throughout the class.
   - Example:
     ```java
     // Wrong - magic numbers
     public void setAge(int age) {
         if (age >= 0 && age <= 150) {  // What do these numbers mean?
             this.age = age;
         }
     }

     // Correct - named constants
     private static final int MIN_AGE = 0;
     private static final int MAX_AGE = 150;

     public void setAge(int age) {
         if (age >= MIN_AGE && age <= MAX_AGE) {  // Clear intent!
             this.age = age;
         }
     }
     ```

4. ❌ **Not Checking for Null Values**: Forgetting to validate that String or object parameters aren't null
   - Why: Null parameters can cause NullPointerException when you try to use them, crashing the program.
   - Fix: Always check for null before processing String or object parameters in setters.
   - Example:
     ```java
     // Wrong - will crash if null
     public void setName(String name) {
         if (name.trim().isEmpty()) {  // NullPointerException if name is null!
             System.out.println("Name cannot be empty");
         } else {
             this.name = name;
         }
     }

     // Correct - null check first
     public void setName(String name) {
         if (name == null) {
             System.out.println("Error: Name cannot be null");
             return;
         }
         if (name.trim().isEmpty()) {
             System.out.println("Error: Name cannot be empty");
         } else {
             this.name = name;
         }
     }
     ```

5. ❌ **Inconsistent Validation Logic**: Using different validation rules in constructor vs setter
   - Why: If constructor and setter have different validation rules, the object can end up in an invalid state depending on how it's created.
   - Fix: Use the same validation logic in both constructor and setter. Extract validation to a private helper method that both use.
   - Example:
     ```java
     // Wrong - inconsistent validation
     public Person(String name, int age) {
         this.name = name;  // No validation!
         this.age = age;
     }

     public void setAge(int age) {
         if (age >= 0 && age <= 150) {  // Validates here
             this.age = age;
         }
     }

     // Correct - consistent validation
     public Person(String name, int age) {
         setName(name);  // Reuse validation
         setAge(age);    // Reuse validation
     }

     public void setName(String name) {
         if (name != null && !name.trim().isEmpty()) {
             this.name = name;
         } else {
             System.out.println("Error: Invalid name");
         }
     }
     ```

**🎯 Challenge:**
Create a `CreditCard` class with validation for:
1. cardNumber (16 digits, format: ####-####-####-####)
2. cvv (3 digits)
3. expiryMonth (1-12)
4. expiryYear (current year or later)
5. creditLimit (1000-100000)
6. balance (0 to creditLimit)

**📋 Best Practices:**

✅ **Use Constants for Validation Limits**
- **Why:** Makes validation rules visible, maintainable, and prevents magic numbers
- **How:** Declare `private static final` constants at the top of your class
- **Example:**
```java
// ❌ Bad - Magic numbers scattered
public void setAge(int age) {
    if (age < 5 || age > 100) return;  // What do these mean?
}

// ✅ Good - Named constants
private static final int MIN_AGE = 5;
private static final int MAX_AGE = 100;
public void setAge(int age) {
    if (age < MIN_AGE || age > MAX_AGE) return;  // Clear meaning
}
```

✅ **Validate in Both Setters and Constructors**
- **Why:** Ensures objects are never in an invalid state from creation onwards
- **How:** Call setters from constructors to reuse validation logic
- **Example:**
```java
public class Student {
    public Student(String name, int age) {
        setName(name);  // ✅ Reuses validation
        setAge(age);    // ✅ Reuses validation
    }

    public void setName(String name) {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Name required");
        }
        this.name = name;
    }
}
```

✅ **Provide Clear, Actionable Error Messages**
- **Why:** Users need to understand what went wrong and how to fix it
- **How:** Include the invalid value, the constraint, and expected format in error messages
- **Example:**
```java
// ❌ Bad - Vague message
if (gpa < 0 || gpa > 4) {
    System.out.println("Invalid GPA");
}

// ✅ Good - Specific and helpful
if (gpa < MIN_GPA || gpa > MAX_GPA) {
    System.out.println("❌ ERROR: GPA " + gpa +
        " is invalid. Must be between " + MIN_GPA + " and " + MAX_GPA);
}
```

✅ **Use Regular Expressions for Format Validation**
- **Why:** Ensures data matches expected patterns (emails, IDs, phone numbers)
- **How:** Use `String.matches()` with appropriate regex patterns
- **Example:**
```java
public void setStudentId(String id) {
    if (!id.matches("STU\\d{4}")) {  // STU followed by 4 digits
        throw new IllegalArgumentException(
            "Student ID must match format STU#### (e.g., STU1234)");
    }
    this.studentId = id;
}

public void setEmail(String email) {
    if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
        throw new IllegalArgumentException("Invalid email format");
    }
    this.email = email;
}
```

✅ **Validate Related Fields Together (Cross-Field Validation)**
- **Why:** Some constraints depend on multiple fields working together
- **How:** Check relationships between fields in setters or dedicated validation methods
- **Example:**
```java
public void setEnrolled(boolean enrolled) {
    // Cross-field validation: can't unenroll with 0 credits
    if (!enrolled && creditsCompleted == 0) {
        throw new IllegalStateException(
            "Cannot unenroll student with no completed credits");
    }
    this.isEnrolled = enrolled;
}

public void setEndDate(Date endDate) {
    if (startDate != null && endDate.before(startDate)) {
        throw new IllegalArgumentException(
            "End date must be after start date");
    }
    this.endDate = endDate;
}
```

---

#### Exercise 6: Read-Only and Write-Only Properties (15 minutes)

**What you'll learn:** Creating properties with restricted access patterns

**Create new class: `Transaction`**

**Concept:** Not all properties need both getters and setters. Some properties should be:
- **Read-Only**: Can read but not change (getter only)
- **Write-Only**: Can set but not read (setter only)
- **Calculated**: Computed from other properties (getter only, no backing field)

```
Read-Only Properties:
- Set once (in constructor)
- Never changed after creation
- Examples: ID, creation date, transaction number

Write-Only Properties:
- Can be set but not retrieved
- Examples: passwords, PINs, secrets

Calculated Properties:
- No backing field
- Computed on-the-fly
- Examples: full name from first+last, age from birthdate
```

**Step-by-Step:**

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Transaction {
    // READ-ONLY properties (final, set once)
    private final String transactionId;
    private final LocalDateTime timestamp;
    private final String transactionType;

    // NORMAL properties (can read and write)
    private double amount;
    private String description;
    private boolean processed;

    // WRITE-ONLY property (can set but not get)
    private String authorizationCode;

    // For calculated properties
    private String fromAccount;
    private String toAccount;

    // Constructor - sets read-only properties
    public Transaction(String transactionId, String type) {
        this.transactionId = transactionId;
        this.timestamp = LocalDateTime.now();
        this.transactionType = type;
        this.processed = false;
    }

    // ===== READ-ONLY GETTERS (no setters) =====

    public String getTransactionId() {
        return transactionId;
    }

    public String getTimestamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return timestamp.format(formatter);
    }

    public String getTransactionType() {
        return transactionType;
    }

    // ===== NORMAL PROPERTIES (getter + setter) =====

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        if (processed) {
            System.out.println("❌ Cannot modify processed transaction");
            return;
        }
        if (amount <= 0) {
            System.out.println("❌ Amount must be positive");
            return;
        }
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if (processed) {
            System.out.println("❌ Cannot modify processed transaction");
            return;
        }
        this.description = description;
    }

    public boolean isProcessed() {
        return processed;
    }

    // ===== WRITE-ONLY SETTER (no getter) =====

    public void setAuthorizationCode(String code) {
        if (code != null && code.length() == 6) {
            this.authorizationCode = code;
            System.out.println("✅ Authorization code accepted");
        } else {
            System.out.println("❌ Invalid authorization code (must be 6 characters)");
        }
    }

    // Can verify but not retrieve
    public boolean verifyAuthorization(String code) {
        return this.authorizationCode != null &&
               this.authorizationCode.equals(code);
    }

    // ===== PROPERTIES FOR CALCULATED FIELDS =====

    public void setFromAccount(String fromAccount) {
        this.fromAccount = fromAccount;
    }

    public void setToAccount(String toAccount) {
        this.toAccount = toAccount;
    }

    // ===== CALCULATED PROPERTIES (no backing field) =====

    // Calculated: Transaction summary (computed from other fields)
    public String getTransactionSummary() {
        return String.format("%s: $%.2f from %s to %s",
            transactionType, amount, fromAccount, toAccount);
    }

    // Calculated: Fee based on amount
    public double getTransactionFee() {
        if (amount < 100) return 1.0;
        if (amount < 1000) return 2.5;
        return amount * 0.005;  // 0.5% for large transactions
    }

    // Calculated: Total including fee
    public double getTotalAmount() {
        return amount + getTransactionFee();
    }

    // Calculated: Status message
    public String getStatusMessage() {
        if (processed) {
            return "✅ Transaction completed on " + getTimestamp();
        } else {
            return "⏳ Transaction pending";
        }
    }

    // ===== METHODS =====

    public void processTransaction() {
        if (processed) {
            System.out.println("❌ Transaction already processed");
            return;
        }
        if (authorizationCode == null) {
            System.out.println("❌ Authorization required before processing");
            return;
        }
        processed = true;
        System.out.println("✅ Transaction processed successfully");
    }

    public void displayTransaction() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║       TRANSACTION DETAILS             ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("ID: " + getTransactionId() + " (READ-ONLY)");
        System.out.println("Timestamp: " + getTimestamp() + " (READ-ONLY)");
        System.out.println("Type: " + getTransactionType() + " (READ-ONLY)");
        System.out.println("Description: " + description);
        System.out.println("Amount: $" + amount);
        System.out.println("Fee: $" + getTransactionFee() + " (CALCULATED)");
        System.out.println("Total: $" + getTotalAmount() + " (CALCULATED)");
        System.out.println("Summary: " + getTransactionSummary() + " (CALCULATED)");
        System.out.println("Status: " + getStatusMessage() + " (CALCULATED)");
        System.out.println("Auth Code: [HIDDEN - WRITE-ONLY]");
        System.out.println("════════════════════════════════════════");
    }

    public static void main(String[] args) {
        System.out.println("===== READ-ONLY & WRITE-ONLY PROPERTIES =====\n");

        // Create transaction
        System.out.println("--- Creating Transaction ---");
        Transaction txn = new Transaction("TXN001", "Transfer");
        txn.setAmount(500.0);
        txn.setDescription("Rent payment");
        txn.setFromAccount("ACC1001");
        txn.setToAccount("ACC2002");

        // Display transaction
        txn.displayTransaction();

        // Test READ-ONLY properties
        System.out.println("\n--- Testing READ-ONLY Properties ---");
        System.out.println("Transaction ID: " + txn.getTransactionId());
        System.out.println("Timestamp: " + txn.getTimestamp());
        System.out.println("Type: " + txn.getTransactionType());
        System.out.println("✅ Can READ these values");
        System.out.println("❌ Cannot CHANGE these values (no setters)");

        // Test WRITE-ONLY property
        System.out.println("\n--- Testing WRITE-ONLY Property ---");
        txn.setAuthorizationCode("ABC123");
        System.out.println("✅ Can WRITE authorization code");
        System.out.println("❌ Cannot READ authorization code (no getter)");
        System.out.println("Verification test: " +
            (txn.verifyAuthorization("ABC123") ? "Correct" : "Wrong"));

        // Test CALCULATED properties
        System.out.println("\n--- Testing CALCULATED Properties ---");
        System.out.println("Transaction Fee: $" + txn.getTransactionFee());
        System.out.println("Total Amount: $" + txn.getTotalAmount());
        System.out.println("Summary: " + txn.getTransactionSummary());
        System.out.println("Status: " + txn.getStatusMessage());
        System.out.println("✅ These are COMPUTED on-the-fly");

        // Process transaction
        System.out.println("\n--- Processing Transaction ---");
        txn.processTransaction();

        // Try to modify after processing
        System.out.println("\n--- Attempting Modification After Processing ---");
        txn.setAmount(1000.0);  // Should fail
        txn.setDescription("Changed");  // Should fail

        // Final state
        System.out.println("\n--- Final Transaction State ---");
        txn.displayTransaction();

        System.out.println("\n=============================================");
    }
}
```

**Expected Output:**
```
===== READ-ONLY & WRITE-ONLY PROPERTIES =====

--- Creating Transaction ---

╔════════════════════════════════════════╗
║       TRANSACTION DETAILS             ║
╚════════════════════════════════════════╝
ID: TXN001 (READ-ONLY)
Timestamp: 2026-01-22 10:30:45 (READ-ONLY)
Type: Transfer (READ-ONLY)
Description: Rent payment
Amount: $500.0
Fee: $2.5 (CALCULATED)
Total: $502.5 (CALCULATED)
Summary: Transfer: $500.00 from ACC1001 to ACC2002 (CALCULATED)
Status: ⏳ Transaction pending (CALCULATED)
Auth Code: [HIDDEN - WRITE-ONLY]
════════════════════════════════════════

--- Testing READ-ONLY Properties ---
Transaction ID: TXN001
Timestamp: 2026-01-22 10:30:45
Type: Transfer
✅ Can READ these values
❌ Cannot CHANGE these values (no setters)

--- Testing WRITE-ONLY Property ---
✅ Authorization code accepted
✅ Can WRITE authorization code
❌ Cannot READ authorization code (no getter)
Verification test: Correct

--- Testing CALCULATED Properties ---
Transaction Fee: $2.5
Total Amount: $502.5
Summary: Transfer: $500.00 from ACC1001 to ACC2002
Status: ⏳ Transaction pending
✅ These are COMPUTED on-the-fly

--- Processing Transaction ---
✅ Transaction processed successfully

--- Attempting Modification After Processing ---
❌ Cannot modify processed transaction
❌ Cannot modify processed transaction

--- Final Transaction State ---

╔════════════════════════════════════════╗
║       TRANSACTION DETAILS             ║
╚════════════════════════════════════════╝
ID: TXN001 (READ-ONLY)
Timestamp: 2026-01-22 10:30:45 (READ-ONLY)
Type: Transfer (READ-ONLY)
Description: Rent payment
Amount: $500.0
Fee: $2.5 (CALCULATED)
Total: $502.5 (CALCULATED)
Summary: Transfer: $500.00 from ACC1001 to ACC2002 (CALCULATED)
Status: ✅ Transaction completed on 2026-01-22 10:30:45 (CALCULATED)
Auth Code: [HIDDEN - WRITE-ONLY]
════════════════════════════════════════

=============================================
```

**💡 Property Access Patterns:**

| Pattern | Getter | Setter | Backing Field | Use Case |
|---------|--------|--------|---------------|----------|
| **Read-Write** | ✅ | ✅ | ✅ | Normal properties |
| **Read-Only** | ✅ | ❌ | ✅ (final) | IDs, timestamps, immutable data |
| **Write-Only** | ❌ | ✅ | ✅ | Passwords, secrets |
| **Calculated** | ✅ | ❌ | ❌ | Derived values, computed fields |

**When to Use Each Pattern:**

```java
class Example {
    // READ-ONLY: Set once, never changes
    private final String id;
    public String getId() { return id; }
    // Use for: IDs, creation dates, constants

    // WRITE-ONLY: Can set, cannot retrieve
    private String password;
    public void setPassword(String pwd) { this.password = pwd; }
    public boolean checkPassword(String pwd) { return password.equals(pwd); }
    // Use for: Passwords, PINs, security tokens

    // CALCULATED: No backing field, computed
    private String firstName;
    private String lastName;
    public String getFullName() { return firstName + " " + lastName; }
    // Use for: Derived data, computed values

    // READ-WRITE: Normal property
    private int age;
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    // Use for: Regular mutable data
}
```

**✅ Success Criteria:**
- Understand read-only properties (getter only)
- Know when to use write-only properties (setter only)
- Can create calculated properties (computed values)
- Use `final` keyword for immutable properties
- Choose appropriate access pattern for each property

**Common Mistakes:**

1. ❌ **Providing Setter for ID or Immutable Fields**: Creating a setter for fields that should never change after initialization
   - Why: IDs, timestamps, and other identifiers should be immutable. Allowing them to change breaks referential integrity and causes bugs.
   - Fix: Make the field `final`, initialize it in the constructor, and provide only a getter (no setter).
   - Example:
     ```java
     // Wrong - ID can be changed
     public class Account {
         private String accountId;

         public void setAccountId(String id) {  // Dangerous!
             this.accountId = id;
         }
     }

     // Correct - ID is read-only
     public class Account {
         private final String accountId;  // Can't be reassigned

         public Account(String id) {
             this.accountId = id;  // Set once in constructor
         }

         public String getAccountId() {
             return accountId;
         }
         // No setter - read-only!
     }
     ```

2. ❌ **Providing Getter for Password or Sensitive Data**: Exposing passwords, pins, or secrets through getter methods
   - Why: Security risk! Passwords should never be retrieved directly. Instead, use comparison methods or hash verification.
   - Fix: Make the field write-only (setter but no getter) and provide a verification method like `checkPassword()`.
   - Example:
     ```java
     // Wrong - password can be read!
     public class User {
         private String password;

         public String getPassword() {  // Security risk!
             return password;
         }
     }

     // Correct - write-only with verification
     public class User {
         private String password;

         public void setPassword(String pwd) {  // Can write
             this.password = pwd;
         }

         public boolean verifyPassword(String pwd) {  // Can check, can't read
             return this.password.equals(pwd);
         }
         // No getter - write-only!
     }
     ```

3. ❌ **Storing Calculated Values Instead of Computing Them**: Creating a field to store a value that can be calculated from other fields
   - Why: Stored calculated values can get out of sync when source data changes, causing bugs and wasting memory.
   - Fix: Compute the value in the getter method instead of storing it. This ensures it's always accurate.
   - Example:
     ```java
     // Wrong - stored value can become stale
     public class Person {
         private String firstName;
         private String lastName;
         private String fullName;  // Risk: might not match first+last

         public void setFirstName(String name) {
             this.firstName = name;
             // Forgot to update fullName - now it's wrong!
         }
     }

     // Correct - always computed correctly
     public class Person {
         private String firstName;
         private String lastName;

         public String getFullName() {
             return firstName + " " + lastName;  // Always current
         }
         // No field needed - computed on demand
     }
     ```

4. ❌ **Not Using `final` for Read-Only Properties**: Forgetting to mark immutable fields as final
   - Why: Without `final`, the field can accidentally be reassigned within the class, breaking immutability. `final` enforces immutability at compile time.
   - Fix: Always mark read-only fields as `final` to prevent accidental modification.
   - Example:
     ```java
     // Wrong - can be changed accidentally
     public class Transaction {
         private String transactionId;  // Not final

         public Transaction(String id) {
             this.transactionId = id;
         }

         private void someMethod() {
             this.transactionId = "new_id";  // Oops! Can be changed
         }
     }

     // Correct - enforced immutability
     public class Transaction {
         private final String transactionId;  // Final

         public Transaction(String id) {
             this.transactionId = id;
         }

         private void someMethod() {
             // this.transactionId = "new_id";  // Compile error - can't change final
         }
     }
     ```

5. ❌ **Confusing Read-Only with Constant**: Using `static final` for instance-specific values
   - Why: `static final` creates a class-level constant shared by all instances. Read-only instance fields should use `final` only (not static).
   - Fix: Use `final` (without static) for read-only instance fields. Use `static final` only for true constants.
   - Example:
     ```java
     // Wrong - same ID for all accounts!
     public class Account {
         private static final String accountId = "ACC001";  // Shared!
     }

     // Correct - each account has its own ID
     public class Account {
         private final String accountId;  // Instance-specific

         public Account(String id) {
             this.accountId = id;  // Each account gets unique ID
         }
     }

     // Constants ARE static final
     private static final double TAX_RATE = 0.08;  // Same for all instances
     ```

**🎯 Challenge:**
Create an `Invoice` class with:
1. Read-only: invoiceNumber, invoiceDate
2. Read-write: customerName, items[], tax
3. Calculated: subtotal (sum of items), total (subtotal + tax), dueDate (invoiceDate + 30 days)
4. Write-only: approvalCode (6-digit code)

**📋 Best Practices:**

✅ **Use Read-Only Properties for Immutable Identifiers**
- **Why:** IDs, timestamps, and other identifiers should never change after creation
- **How:** Use `final` keyword and provide getter only; initialize in constructor
- **Example:**
```java
// ✅ Good - Immutable identifier
public class Transaction {
    private final String transactionId;  // Can't be changed
    private final LocalDateTime createdAt;

    public Transaction(String id) {
        this.transactionId = id;
        this.createdAt = LocalDateTime.now();
    }

    public String getTransactionId() { return transactionId; }
    // No setter - read-only!
}
```

✅ **Use Calculated Properties for Derived Values**
- **Why:** Avoids data duplication and keeps derived values always accurate
- **How:** Compute in getter method, don't store as field
- **Example:**
```java
// ❌ Bad - Stored derived value can get out of sync
public class Person {
    private String firstName;
    private String lastName;
    private String fullName;  // Risk: might not match first+last

    public void setFirstName(String name) {
        this.firstName = name;
        // Forgot to update fullName!
    }
}

// ✅ Good - Always computed correctly
public class Person {
    private String firstName;
    private String lastName;

    public String getFullName() {
        return firstName + " " + lastName;  // Always current
    }
}
```

✅ **Use Write-Only Properties for Sensitive Data**
- **Why:** Passwords and secrets should be set but never retrieved
- **How:** Provide setter for input, comparison method for verification; no getter
- **Example:**
```java
public class UserAccount {
    private String passwordHash;  // Store hash, not plain text

    // Write-only: can set but not get
    public void setPassword(String password) {
        this.passwordHash = hashPassword(password);
    }

    // Verification instead of getter
    public boolean verifyPassword(String input) {
        return hashPassword(input).equals(passwordHash);
    }

    // ❌ NO getter for password!
    // public String getPassword() { ... }  // Security risk!
}
```

✅ **Prefer final for Truly Immutable Fields**
- **Why:** Compiler enforces immutability, preventing accidental changes
- **How:** Declare field as `final` and initialize in constructor only
- **Example:**
```java
public class BankAccount {
    private final String accountNumber;  // Cannot change
    private final LocalDate createdDate;

    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;  // Set once
        this.createdDate = LocalDate.now();
        // accountNumber = "new";  // ❌ Compiler error!
    }
}
```

✅ **Document Property Access Patterns**
- **Why:** Helps other developers understand design decisions
- **How:** Add comments explaining why properties are read-only, write-only, or calculated
- **Example:**
```java
public class Order {
    // Read-only: Order ID never changes after creation
    private final String orderId;

    // Calculated: Total is always sum of items, no need to store
    public double getTotal() { /* calculate */ }

    // Write-only: Security code verified but never exposed
    private String securityCode;
    public void setSecurityCode(String code) { this.securityCode = code; }
}
```

---

#### Exercise 7: Real-World Application - Employee Management System (30 minutes)

**What you'll learn:** Building a complete encapsulated system with multiple classes

**Create classes: `Employee`, `Department`, `EmployeeManagementSystem`**

**Concept:** This exercise brings together all encapsulation concepts:
- Private data with public interface
- Validation in setters
- Read-only and calculated properties
- Business logic encapsulation
- Multiple classes working together

**Step-by-Step:**

```java
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

// ===== EMPLOYEE CLASS =====
class Employee {
    // Read-only properties
    private final String employeeId;
    private final LocalDate hireDate;

    // Read-write properties
    private String firstName;
    private String lastName;
    private String email;
    private String position;
    private double salary;
    private String departmentId;
    private boolean active;

    // Write-only property
    private String accessPin;

    // Static counter for generating IDs
    private static int nextId = 1001;

    // Constructor
    public Employee(String firstName, String lastName, String position, double salary) {
        this.employeeId = "EMP" + (nextId++);
        this.hireDate = LocalDate.now();
        this.active = true;

        setFirstName(firstName);
        setLastName(lastName);
        setPosition(position);
        setSalary(salary);
        generateEmail();
    }

    // ===== VALIDATED SETTERS =====

    public void setFirstName(String firstName) {
        if (firstName == null || firstName.trim().isEmpty()) {
            System.out.println("❌ First name cannot be empty");
            return;
        }
        this.firstName = firstName.trim();
        generateEmail();  // Update email when name changes
    }

    public void setLastName(String lastName) {
        if (lastName == null || lastName.trim().isEmpty()) {
            System.out.println("❌ Last name cannot be empty");
            return;
        }
        this.lastName = lastName.trim();
        generateEmail();  // Update email when name changes
    }

    public void setPosition(String position) {
        if (position == null || position.trim().isEmpty()) {
            System.out.println("❌ Position cannot be empty");
            return;
        }
        this.position = position;
    }

    public void setSalary(double salary) {
        if (salary < 30000) {
            System.out.println("❌ Salary must be at least $30,000");
            return;
        }
        if (salary > 500000) {
            System.out.println("❌ Salary cannot exceed $500,000");
            return;
        }
        this.salary = salary;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    // ===== WRITE-ONLY SETTER =====

    public void setAccessPin(String pin) {
        if (pin == null || !pin.matches("\\d{4}")) {
            System.out.println("❌ PIN must be 4 digits");
            return;
        }
        this.accessPin = pin;
        System.out.println("✅ Access PIN set for " + getFullName());
    }

    public boolean verifyPin(String pin) {
        return this.accessPin != null && this.accessPin.equals(pin);
    }

    // ===== READ-ONLY GETTERS =====

    public String getEmployeeId() {
        return employeeId;
    }

    public String getHireDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        return hireDate.format(formatter);
    }

    // ===== NORMAL GETTERS =====

    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPosition() { return position; }
    public double getSalary() { return salary; }
    public String getDepartmentId() { return departmentId; }
    public boolean isActive() { return active; }

    // ===== CALCULATED PROPERTIES =====

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public int getYearsOfService() {
        return Period.between(hireDate, LocalDate.now()).getYears();
    }

    public double getAnnualBonus() {
        int years = getYearsOfService();
        double baseBonus = salary * 0.05;  // 5% base bonus
        double loyaltyBonus = years * (salary * 0.01);  // 1% per year
        return baseBonus + loyaltyBonus;
    }

    public double getTotalCompensation() {
        return salary + getAnnualBonus();
    }

    public String getSeniorityLevel() {
        int years = getYearsOfService();
        if (years < 1) return "New Hire";
        if (years < 3) return "Junior";
        if (years < 7) return "Mid-Level";
        if (years < 15) return "Senior";
        return "Veteran";
    }

    // ===== BUSINESS METHODS =====

    private void generateEmail() {
        if (firstName != null && lastName != null) {
            this.email = (firstName + "." + lastName + "@company.com").toLowerCase();
        }
    }

    public void giveRaise(double percentage) {
        if (percentage <= 0 || percentage > 50) {
            System.out.println("❌ Raise must be between 0% and 50%");
            return;
        }
        double oldSalary = salary;
        salary += salary * (percentage / 100);
        System.out.printf("✅ %s received %.1f%% raise: $%.2f → $%.2f%n",
            getFullName(), percentage, oldSalary, salary);
    }

    public void promote(String newPosition, double salaryIncrease) {
        String oldPosition = position;
        setPosition(newPosition);
        giveRaise(salaryIncrease);
        System.out.printf("🎉 %s promoted from %s to %s%n",
            getFullName(), oldPosition, newPosition);
    }

    public void terminate() {
        this.active = false;
        System.out.println("❌ " + getFullName() + " has been terminated");
    }

    public void displayEmployeeCard() {
        System.out.println("\n┌─────────────────────────────────────────┐");
        System.out.println("│         EMPLOYEE ID CARD                │");
        System.out.println("├─────────────────────────────────────────┤");
        System.out.printf("│ ID: %-35s │%n", employeeId);
        System.out.printf("│ Name: %-33s │%n", getFullName());
        System.out.printf("│ Position: %-29s │%n", position);
        System.out.printf("│ Department: %-27s │%n",
            departmentId != null ? departmentId : "Unassigned");
        System.out.printf("│ Email: %-32s │%n", email);
        System.out.printf("│ Hire Date: %-28s │%n", getHireDate());
        System.out.printf("│ Years of Service: %-23d │%n", getYearsOfService());
        System.out.printf("│ Seniority: %-28s │%n", getSeniorityLevel());
        System.out.printf("│ Status: %-31s │%n", active ? "Active ✓" : "Inactive");
        System.out.println("└─────────────────────────────────────────┘");
    }

    public void displayCompensationSummary() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║     COMPENSATION SUMMARY              ║");
        System.out.println("╠════════════════════════════════════════╣");
        System.out.printf("║ Employee: %-29s║%n", getFullName());
        System.out.printf("║ Base Salary: $%-26.2f║%n", salary);
        System.out.printf("║ Annual Bonus: $%-25.2f║%n", getAnnualBonus());
        System.out.printf("║ Total Compensation: $%-18.2f║%n", getTotalCompensation());
        System.out.println("╚════════════════════════════════════════╝");
    }
}

// ===== DEPARTMENT CLASS =====
class Department {
    private final String departmentId;
    private String departmentName;
    private String managerEmployeeId;
    private Employee[] employees;
    private int employeeCount;
    private double budget;

    private static int nextDeptId = 101;

    public Department(String name, double budget) {
        this.departmentId = "DEPT" + (nextDeptId++);
        this.departmentName = name;
        this.budget = budget;
        this.employees = new Employee[50];  // Max 50 employees
        this.employeeCount = 0;
    }

    // Getters
    public String getDepartmentId() { return departmentId; }
    public String getDepartmentName() { return departmentName; }
    public int getEmployeeCount() { return employeeCount; }
    public double getBudget() { return budget; }

    // Setters with validation
    public void setDepartmentName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.departmentName = name;
        }
    }

    public void setBudget(double budget) {
        if (budget > 0) {
            this.budget = budget;
        }
    }

    public void setManager(String employeeId) {
        this.managerEmployeeId = employeeId;
    }

    // Business methods
    public boolean addEmployee(Employee emp) {
        if (employeeCount >= employees.length) {
            System.out.println("❌ Department is full");
            return false;
        }
        employees[employeeCount++] = emp;
        emp.setDepartmentId(departmentId);
        System.out.println("✅ " + emp.getFullName() + " added to " + departmentName);
        return true;
    }

    public double getTotalSalaryExpense() {
        double total = 0;
        for (int i = 0; i < employeeCount; i++) {
            if (employees[i].isActive()) {
                total += employees[i].getSalary();
            }
        }
        return total;
    }

    public double getAverageSalary() {
        if (employeeCount == 0) return 0;
        return getTotalSalaryExpense() / employeeCount;
    }

    public void displayDepartmentInfo() {
        System.out.println("\n╔═══════════════════════════════════════════╗");
        System.out.println("║        DEPARTMENT INFORMATION            ║");
        System.out.println("╠═══════════════════════════════════════════╣");
        System.out.printf("║ ID: %-37s║%n", departmentId);
        System.out.printf("║ Name: %-35s║%n", departmentName);
        System.out.printf("║ Budget: $%-32.2f║%n", budget);
        System.out.printf("║ Employees: %-30d║%n", employeeCount);
        System.out.printf("║ Total Salaries: $%-24.2f║%n", getTotalSalaryExpense());
        System.out.printf("║ Average Salary: $%-24.2f║%n", getAverageSalary());
        System.out.printf("║ Remaining Budget: $%-21.2f║%n",
            budget - getTotalSalaryExpense());
        System.out.println("╚═══════════════════════════════════════════╝");

        if (employeeCount > 0) {
            System.out.println("\nEmployees:");
            for (int i = 0; i < employeeCount; i++) {
                System.out.printf("  %d. %s - %s ($%.2f)%n",
                    i + 1,
                    employees[i].getFullName(),
                    employees[i].getPosition(),
                    employees[i].getSalary());
            }
        }
    }
}

// ===== MAIN SYSTEM CLASS =====
public class EmployeeManagementSystem {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════════════╗");
        System.out.println("║    EMPLOYEE MANAGEMENT SYSTEM v1.0            ║");
        System.out.println("╚════════════════════════════════════════════════╝");

        // Create departments
        System.out.println("\n===== CREATING DEPARTMENTS =====");
        Department engineering = new Department("Engineering", 1000000);
        Department sales = new Department("Sales", 750000);
        Department hr = new Department("Human Resources", 400000);

        // Create employees
        System.out.println("\n===== HIRING EMPLOYEES =====");
        Employee emp1 = new Employee("Sarah", "Johnson", "Senior Developer", 95000);
        Employee emp2 = new Employee("Michael", "Chen", "Software Engineer", 75000);
        Employee emp3 = new Employee("Emily", "Rodriguez", "Sales Manager", 85000);
        Employee emp4 = new Employee("David", "Kim", "Sales Representative", 55000);
        Employee emp5 = new Employee("Lisa", "Anderson", "HR Manager", 70000);

        // Set access PINs
        System.out.println("\n===== SETTING SECURITY =====");
        emp1.setAccessPin("1234");
        emp2.setAccessPin("5678");
        emp3.setAccessPin("9012");

        // Assign to departments
        System.out.println("\n===== ASSIGNING TO DEPARTMENTS =====");
        engineering.addEmployee(emp1);
        engineering.addEmployee(emp2);
        sales.addEmployee(emp3);
        sales.addEmployee(emp4);
        hr.addEmployee(emp5);

        // Display employee cards
        System.out.println("\n===== EMPLOYEE ID CARDS =====");
        emp1.displayEmployeeCard();
        emp3.displayEmployeeCard();

        // Display compensation
        System.out.println("\n===== COMPENSATION DETAILS =====");
        emp1.displayCompensationSummary();
        emp2.displayCompensationSummary();

        // Test business operations
        System.out.println("\n===== BUSINESS OPERATIONS =====");

        System.out.println("\n1. Giving raises:");
        emp2.giveRaise(10);  // 10% raise

        System.out.println("\n2. Promotion:");
        emp2.promote("Senior Software Engineer", 15);

        System.out.println("\n3. PIN verification:");
        System.out.println("Sarah's PIN 1234: " +
            (emp1.verifyPin("1234") ? "✅ Correct" : "❌ Wrong"));
        System.out.println("Sarah's PIN 0000: " +
            (emp1.verifyPin("0000") ? "✅ Correct" : "❌ Wrong"));

        // Display department summaries
        System.out.println("\n===== DEPARTMENT SUMMARIES =====");
        engineering.displayDepartmentInfo();
        sales.displayDepartmentInfo();
        hr.displayDepartmentInfo();

        // Test validation
        System.out.println("\n===== TESTING VALIDATION =====");
        System.out.println("\n1. Invalid salary:");
        Employee badEmp = new Employee("Test", "User", "Tester", 25000);  // Too low

        System.out.println("\n2. Invalid name:");
        emp1.setFirstName("");  // Empty name

        System.out.println("\n3. Invalid PIN:");
        emp1.setAccessPin("12");  // Too short

        System.out.println("\n4. Invalid raise:");
        emp1.giveRaise(100);  // Too high

        // Final statistics
        System.out.println("\n╔════════════════════════════════════════════════╗");
        System.out.println("║              SYSTEM SUMMARY                   ║");
        System.out.println("╠════════════════════════════════════════════════╣");
        System.out.printf("║ Total Employees: %-29d║%n", 5);
        System.out.printf("║ Total Departments: %-27d║%n", 3);
        System.out.printf("║ Total Payroll: $%-28.2f║%n",
            engineering.getTotalSalaryExpense() +
            sales.getTotalSalaryExpense() +
            hr.getTotalSalaryExpense());
        System.out.println("╚════════════════════════════════════════════════╝");

        System.out.println("\n✅ System demonstration complete!");
    }
}
```

**Expected Output:**
```
╔════════════════════════════════════════════════╗
║    EMPLOYEE MANAGEMENT SYSTEM v1.0            ║
╚════════════════════════════════════════════════╝

===== CREATING DEPARTMENTS =====

===== HIRING EMPLOYEES =====

===== SETTING SECURITY =====
✅ Access PIN set for Sarah Johnson
✅ Access PIN set for Michael Chen
✅ Access PIN set for Emily Rodriguez

===== ASSIGNING TO DEPARTMENTS =====
✅ Sarah Johnson added to Engineering
✅ Michael Chen added to Engineering
✅ Emily Rodriguez added to Sales
✅ David Kim added to Sales
✅ Lisa Anderson added to Human Resources

===== EMPLOYEE ID CARDS =====

┌─────────────────────────────────────────┐
│         EMPLOYEE ID CARD                │
├─────────────────────────────────────────┤
│ ID: EMP1001                             │
│ Name: Sarah Johnson                     │
│ Position: Senior Developer              │
│ Department: DEPT101                     │
│ Email: sarah.johnson@company.com        │
│ Hire Date: Jan 22, 2026                 │
│ Years of Service: 0                     │
│ Seniority: New Hire                     │
│ Status: Active ✓                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         EMPLOYEE ID CARD                │
├─────────────────────────────────────────┤
│ ID: EMP1003                             │
│ Name: Emily Rodriguez                   │
│ Position: Sales Manager                 │
│ Department: DEPT102                     │
│ Email: emily.rodriguez@company.com      │
│ Hire Date: Jan 22, 2026                 │
│ Years of Service: 0                     │
│ Seniority: New Hire                     │
│ Status: Active ✓                        │
└─────────────────────────────────────────┘

===== COMPENSATION DETAILS =====

╔════════════════════════════════════════╗
║     COMPENSATION SUMMARY              ║
╠════════════════════════════════════════╣
║ Employee: Sarah Johnson               ║
║ Base Salary: $95000.00                ║
║ Annual Bonus: $4750.00                ║
║ Total Compensation: $99750.00         ║
╚════════════════════════════════════════╝

╔════════════════════════════════════════╗
║     COMPENSATION SUMMARY              ║
╠════════════════════════════════════════╣
║ Employee: Michael Chen                ║
║ Base Salary: $75000.00                ║
║ Annual Bonus: $3750.00                ║
║ Total Compensation: $78750.00         ║
╚════════════════════════════════════════╝

===== BUSINESS OPERATIONS =====

1. Giving raises:
✅ Michael Chen received 10.0% raise: $75000.00 → $82500.00

2. Promotion:
✅ Michael Chen received 15.0% raise: $82500.00 → $94875.00
🎉 Michael Chen promoted from Software Engineer to Senior Software Engineer

3. PIN verification:
Sarah's PIN 1234: ✅ Correct
Sarah's PIN 0000: ❌ Wrong

===== DEPARTMENT SUMMARIES =====

╔═══════════════════════════════════════════╗
║        DEPARTMENT INFORMATION            ║
╠═══════════════════════════════════════════╣
║ ID: DEPT101                              ║
║ Name: Engineering                        ║
║ Budget: $1000000.00                      ║
║ Employees: 2                             ║
║ Total Salaries: $189875.00               ║
║ Average Salary: $94937.50                ║
║ Remaining Budget: $810125.00             ║
╚═══════════════════════════════════════════╝

Employees:
  1. Sarah Johnson - Senior Developer ($95000.00)
  2. Michael Chen - Senior Software Engineer ($94875.00)

╔═══════════════════════════════════════════╗
║        DEPARTMENT INFORMATION            ║
╠═══════════════════════════════════════════╣
║ ID: DEPT102                              ║
║ Name: Sales                              ║
║ Budget: $750000.00                       ║
║ Employees: 2                             ║
║ Total Salaries: $140000.00               ║
║ Average Salary: $70000.00                ║
║ Remaining Budget: $610000.00             ║
╚═══════════════════════════════════════════╝

Employees:
  1. Emily Rodriguez - Sales Manager ($85000.00)
  2. David Kim - Sales Representative ($55000.00)

╔═══════════════════════════════════════════╗
║        DEPARTMENT INFORMATION            ║
╠═══════════════════════════════════════════╣
║ ID: DEPT103                              ║
║ Name: Human Resources                    ║
║ Budget: $400000.00                       ║
║ Employees: 1                             ║
║ Total Salaries: $70000.00                ║
║ Average Salary: $70000.00                ║
║ Remaining Budget: $330000.00             ║
╚═══════════════════════════════════════════╝

Employees:
  1. Lisa Anderson - HR Manager ($70000.00)

===== TESTING VALIDATION =====

1. Invalid salary:
❌ Salary must be at least $30,000

2. Invalid name:
❌ First name cannot be empty

3. Invalid PIN:
❌ PIN must be 4 digits

4. Invalid raise:
❌ Raise must be between 0% and 50%

╔════════════════════════════════════════════════╗
║              SYSTEM SUMMARY                   ║
╠════════════════════════════════════════════════╣
║ Total Employees: 5                            ║
║ Total Departments: 3                          ║
║ Total Payroll: $399875.00                     ║
╚════════════════════════════════════════════════╝

✅ System demonstration complete!
```

**💡 Real-World Encapsulation Patterns Used:**

| Pattern | Implementation | Benefit |
|---------|----------------|---------|
| **Immutable IDs** | `final String employeeId` | IDs never change |
| **Auto-generation** | Static counter for IDs | Unique identifiers |
| **Calculated fields** | `getFullName()`, `getTotalCompensation()` | No duplicate data |
| **Write-only secrets** | PIN with verification method | Security |
| **Validation** | All setters check validity | Data integrity |
| **Business logic** | `giveRaise()`, `promote()` | Encapsulated operations |
| **Cascading updates** | Email updates when name changes | Consistency |
| **Relationships** | Employee ↔ Department | Object composition |

**Encapsulation Principles Demonstrated:**

```
1. Data Hiding:
   ✅ All fields are private
   ✅ Access only through public methods

2. Validation:
   ✅ All setters validate input
   ✅ Business rules enforced (min/max salary)

3. Immutability:
   ✅ IDs and dates are final
   ✅ No setters for read-only fields

4. Calculated Properties:
   ✅ Full name derived from first+last
   ✅ Years of service computed from hire date
   ✅ Bonuses calculated based on rules

5. Security:
   ✅ PINs are write-only
   ✅ Verification without exposure

6. Business Logic:
   ✅ Methods like giveRaise() encapsulate rules
   ✅ Email auto-generated from name

7. Consistency:
   ✅ State changes managed internally
   ✅ Related fields updated together
```

**Design Patterns Applied:**
- **Value Object**: Employee, Department as self-contained entities
- **Factory Pattern**: Auto-generated IDs
- **Composition**: Department contains Employees
- **Information Expert**: Each class manages its own data

**✅ Success Criteria:**
- Can build complete encapsulated classes
- Implement read-only, read-write, write-only, and calculated properties
- Add comprehensive validation
- Create business logic methods
- Design class relationships
- Apply real-world encapsulation patterns

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Public fields | No encapsulation | Make private, add methods |
| No validation | Bad data accepted | Validate in all setters |
| Mutable IDs | IDs shouldn't change | Use `final` keyword |
| Storing calculated data | Can become stale | Calculate in getter |
| No business methods | Logic scattered | Encapsulate in class methods |

**🎯 Final Challenge:**
Extend the system with:
1. `Project` class with budget, deadline, assigned employees
2. Method to assign employees to projects
3. Calculate total project cost (sum of employee salaries)
4. Check if project is over budget
5. Display project status report

**📋 Best Practices:**

✅ **Design Classes Around Real-World Entities**
- **Why:** Makes code intuitive, maintainable, and aligned with business requirements
- **How:** Each class represents one business concept with its own responsibilities
- **Example:**
```java
// ✅ Good - Clear separation of concerns
class Employee { /* employee data and behavior */ }
class Department { /* department data and behavior */ }
class EmployeeManagementSystem { /* coordinates Employee and Department */ }

// ❌ Bad - Everything mixed together
class System {
    String[] employeeNames;
    String[] departmentNames;
    // Confusing and hard to maintain
}
```

✅ **Combine All Encapsulation Patterns Together**
- **Why:** Real applications need private fields, validation, read-only properties, and business logic
- **How:** Use final for IDs, validation in setters, calculated properties, and meaningful methods
- **Example:**
```java
public class Employee {
    private final String employeeId;  // Read-only identifier
    private String name;
    private double salary;

    public void setName(String name) {  // Validation
        if (name == null || name.isEmpty()) throw new IllegalArgumentException();
        this.name = name;
    }

    public int getYearsOfService() {  // Calculated property
        return Period.between(hireDate, LocalDate.now()).getYears();
    }

    public void giveRaise(double percentage) {  // Business logic
        if (percentage > 0 && percentage <= 20) {
            salary *= (1 + percentage / 100);
        }
    }
}
```

✅ **Create Coordinating Classes for System-Level Operations**
- **Why:** Separates business logic from data classes; follows Single Responsibility Principle
- **How:** Create manager/service classes that coordinate multiple entity classes
- **Example:**
```java
// ✅ Good - Separation of concerns
class Employee { /* data and basic operations */ }
class Department { /* data and basic operations */ }

class EmployeeManagementSystem {
    public void transferEmployee(Employee emp, Department from, Department to) {
        from.removeEmployee(emp);
        to.addEmployee(emp);
        emp.setDepartment(to.getId());
    }
}

// ❌ Bad - Employee class knows about system-wide operations
class Employee {
    public void transfer(Department from, Department to) { /* too much responsibility */ }
}
```

✅ **Use Immutable Objects Where Appropriate**
- **Why:** Prevents accidental modification, simplifies concurrency, reduces bugs
- **How:** Make all fields final, provide values in constructor, no setters
- **Example:**
```java
// ✅ Immutable class - safe to share
public final class EmployeeId {
    private final String id;
    private final LocalDate issueDate;

    public EmployeeId(String id) {
        this.id = id;
        this.issueDate = LocalDate.now();
    }

    public String getId() { return id; }
    public LocalDate getIssueDate() { return issueDate; }
    // No setters - completely immutable
}
```

✅ **Validate Cross-Object Relationships**
- **Why:** Multi-object operations need coordinated validation
- **How:** Check relationships and states across objects before executing operations
- **Example:**
```java
public class EmployeeManagementSystem {
    public void assignToDepartment(Employee emp, Department dept) {
        // Validate employee state
        if (!emp.isActive()) {
            throw new IllegalStateException("Cannot assign inactive employee");
        }

        // Validate department state
        if (dept.isFull()) {
            throw new IllegalStateException("Department is at capacity");
        }

        // Cross-object validation
        if (emp.getSalary() > dept.getBudgetPerEmployee()) {
            throw new IllegalStateException("Employee salary exceeds department budget");
        }

        // All validations passed, proceed
        dept.addEmployee(emp);
        emp.setDepartmentId(dept.getId());
    }
}
```

**Real-World Applications:**
- HR Management Systems
- Banking Applications
- E-commerce Order Systems
- Hospital Patient Records
- School Student Management
- Library Book Tracking

**Common Mistakes:**

1. ❌ **Exposing Internal Collections Without Protection**: Returning direct references to internal lists/arrays, allowing external modification
   - Why: When a getter returns a reference to a mutable collection (like ArrayList), the caller can modify it directly, bypassing all validation and breaking encapsulation.
   - Fix: Return copies of collections or use unmodifiable wrappers. Never return direct references to internal mutable data structures.
   - Example:
     ```java
     // Wrong - exposes internal list
     public class Department {
         private List<Employee> employees = new ArrayList<>();

         public List<Employee> getEmployees() {
             return employees;  // Caller can now do: dept.getEmployees().clear()
         }
     }

     // Correct - returns unmodifiable view
     public List<Employee> getEmployees() {
         return Collections.unmodifiableList(employees);
     }

     // Also correct - returns a copy
     public List<Employee> getEmployees() {
         return new ArrayList<>(employees);
     }
     ```

2. ❌ **Not Updating Dependent Fields When Related Data Changes**: Forgetting to regenerate calculated fields when their dependencies change
   - Why: When fields like email depend on other fields (firstName, lastName), changing those fields should trigger recalculation. Forgetting this leads to stale data.
   - Fix: Call update methods in setters whenever dependent data changes. In the Employee example, changing name should regenerate email.
   - Example:
     ```java
     // Wrong - email becomes outdated
     public void setFirstName(String firstName) {
         this.firstName = firstName;
         // Email still has old first name!
     }

     // Correct - updates dependent field
     public void setFirstName(String firstName) {
         this.firstName = firstName;
         generateEmail();  // Regenerate email with new name
     }

     private void generateEmail() {
         this.email = (firstName + "." + lastName + "@company.com").toLowerCase();
     }
     ```

3. ❌ **Mixing Business Logic Validation with Data Validation**: Combining simple data validation with complex business rules in the same setter
   - Why: Setters should do basic data validation (null checks, range checks). Complex business rules involving multiple objects belong in separate business methods.
   - Fix: Keep setters focused on basic validation. Put multi-object business rules in dedicated methods in a service/manager class.
   - Example:
     ```java
     // Wrong - complex business logic in setter
     public void setDepartmentId(String deptId) {
         if (deptId == null) throw new IllegalArgumentException("Department ID required");

         // Too complex for a setter:
         Department dept = companyDatabase.findDepartment(deptId);
         if (dept.isFull()) throw new IllegalStateException("Department full");
         if (this.salary > dept.getBudgetPerEmployee()) throw new IllegalStateException("Salary too high");

         this.departmentId = deptId;
     }

     // Correct - simple validation in setter
     public void setDepartmentId(String deptId) {
         if (deptId == null || deptId.trim().isEmpty()) {
             throw new IllegalArgumentException("Department ID required");
         }
         this.departmentId = deptId;
     }

     // Business logic in separate method
     public class EmployeeManagementSystem {
         public void assignToDepartment(Employee emp, Department dept) {
             if (dept.isFull()) throw new IllegalStateException("Department full");
             if (emp.getSalary() > dept.getBudgetPerEmployee()) {
                 throw new IllegalStateException("Salary exceeds budget");
             }
             emp.setDepartmentId(dept.getId());
             dept.addEmployee(emp);
         }
     }
     ```

4. ❌ **Using Strings for Relationships Instead of Object References**: Storing only IDs to relate objects instead of maintaining actual object references
   - Why: Storing just a departmentId means you need to look up the Department object every time. This is inefficient and creates tight coupling with a data store.
   - Fix: For in-memory systems, consider storing object references. For persistence, store both the ID (for database) and a transient reference (for runtime).
   - Example:
     ```java
     // Weak approach - only ID
     public class Employee {
         private String departmentId;

         // Always need external lookup
         public Department getDepartment(DepartmentService service) {
             return service.findById(departmentId);
         }
     }

     // Better - store reference
     public class Employee {
         private String departmentId;  // For persistence
         private Department department;  // For runtime use

         public void setDepartment(Department dept) {
             this.department = dept;
             this.departmentId = dept.getId();
         }

         public Department getDepartment() {
             return department;  // Direct access
         }
     }
     ```

5. ❌ **Forgetting to Make Calculated Properties Read-Only**: Providing setters for fields that should always be computed
   - Why: Fields like fullName, yearsOfService, totalCompensation should be calculated from other data, not set directly. Allowing setters creates inconsistency.
   - Fix: Only provide getters for calculated properties. Compute them on-the-fly in the getter method.
   - Example:
     ```java
     // Wrong - calculated field with setter
     public class Employee {
         private String firstName;
         private String lastName;
         private String fullName;  // Stored separately

         public void setFullName(String fullName) {
             this.fullName = fullName;  // Now firstName+lastName != fullName!
         }
     }

     // Correct - calculated in getter
     public class Employee {
         private String firstName;
         private String lastName;
         // No fullName field!

         public String getFullName() {
             return firstName + " " + lastName;  // Always consistent
         }
     }
     ```

---

### 🎓 Day 11 Summary: Encapsulation & Access Modifiers

**What You Learned:**
1. ✅ Encapsulation concept - bundling data + methods
2. ✅ Access modifiers - private, public, protected, default
3. ✅ Getters and setters for controlled access
4. ✅ Data validation and protection
5. ✅ Building complete encapsulated classes

**Key Takeaways:**
- Encapsulation = data hiding + controlled access
- Make variables private, provide public methods
- Validate data in setters
- Use appropriate access modifier for each member
- Encapsulation protects data integrity

**Encapsulation Checklist:**
```
✅ All data members are private
✅ Public getters for readable fields
✅ Public setters with validation for writable fields
✅ Read-only fields have getter but no setter
✅ Business logic methods are public
✅ Helper methods are private
✅ Validation prevents invalid states
✅ Class maintains its own consistency
```

**Before vs After:**
```java
// Before (no encapsulation):
public class Student {
    public int age;
    public double gpa;
}
Student s = new Student();
s.age = -5;  // Invalid\! But nothing stops it

// After (with encapsulation):
public class Student {
    private int age;
    private double gpa;
    
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        }
    }
}
Student s = new Student();
s.setAge(-5);  // Rejected by validation ✓
```

**Next Steps:**
- Day 12: Inheritance (extends, super, IS-A relationship)
- Day 13: Polymorphism (method overriding, dynamic dispatch)
- Day 14: Abstraction (abstract classes, interfaces)

---


### Day 12: Inheritance

---

#### Exercise 1: Introduction to Inheritance (15 minutes)

**What you'll learn:** The fundamental concept of inheritance and the IS-A relationship

**Create classes: `Animal`, `Dog`, `Cat`**

**Concept:** **Inheritance** is when a class (child/subclass) inherits properties and methods from another class (parent/superclass). It's like how children inherit traits from parents in real life.

```
Parent Class (Superclass) = General
  ↓ extends
Child Class (Subclass) = Specific

Dog IS-A Animal
Cat IS-A Animal
```

**Why Inheritance?**
- **Code Reuse**: Don't repeat common code across similar classes
- **Organization**: Group related classes in a hierarchy
- **Extensibility**: Add specific features to general concepts
- **Maintainability**: Update common code in one place

**Real-World Analogy:**
```
Vehicle (general)
├── Car (specific type of vehicle)
├── Motorcycle (specific type of vehicle)
└── Truck (specific type of vehicle)

All vehicles have: engine, wheels, speed
Each type adds: specific features
```

**Step-by-Step:**

```java
// PARENT CLASS (Superclass, Base Class)
class Animal {
    // Common properties for ALL animals
    String name;
    int age;

    // Common behaviors for ALL animals
    void eat() {
        System.out.println(name + " is eating");
    }

    void sleep() {
        System.out.println(name + " is sleeping");
    }

    void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age + " years");
    }
}

// CHILD CLASS 1 - Dog extends Animal
class Dog extends Animal {
    // Dog-specific property
    String breed;

    // Dog-specific behavior
    void bark() {
        System.out.println(name + " says: Woof! Woof!");
    }

    void fetch() {
        System.out.println(name + " is fetching the ball");
    }
}

// CHILD CLASS 2 - Cat extends Animal
class Cat extends Animal {
    // Cat-specific property
    String color;

    // Cat-specific behavior
    void meow() {
        System.out.println(name + " says: Meow! Meow!");
    }

    void scratch() {
        System.out.println(name + " is scratching");
    }
}

public class InheritanceBasics {
    public static void main(String[] args) {
        System.out.println("===== INHERITANCE BASICS =====\n");

        // Create a Dog
        System.out.println("--- Creating a Dog ---");
        Dog dog = new Dog();
        dog.name = "Buddy";  // Inherited from Animal
        dog.age = 3;         // Inherited from Animal
        dog.breed = "Golden Retriever";  // Dog's own property

        dog.displayInfo();   // Inherited method
        dog.eat();          // Inherited method
        dog.sleep();        // Inherited method
        dog.bark();         // Dog's own method
        dog.fetch();        // Dog's own method

        // Create a Cat
        System.out.println("\n--- Creating a Cat ---");
        Cat cat = new Cat();
        cat.name = "Whiskers";  // Inherited from Animal
        cat.age = 2;            // Inherited from Animal
        cat.color = "Orange";   // Cat's own property

        cat.displayInfo();  // Inherited method
        cat.eat();         // Inherited method
        cat.sleep();       // Inherited method
        cat.meow();        // Cat's own method
        cat.scratch();     // Cat's own method

        System.out.println("\n--- IS-A Relationship ---");
        System.out.println("Buddy IS-A Dog: true");
        System.out.println("Buddy IS-A Animal: true");
        System.out.println("Whiskers IS-A Cat: true");
        System.out.println("Whiskers IS-A Animal: true");

        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== INHERITANCE BASICS =====

--- Creating a Dog ---
Name: Buddy
Age: 3 years
Buddy is eating
Buddy is sleeping
Buddy says: Woof! Woof!
Buddy is fetching the ball

--- Creating a Cat ---
Name: Whiskers
Age: 2 years
Whiskers is eating
Whiskers is sleeping
Whiskers says: Meow! Meow!
Whiskers is scratching

--- IS-A Relationship ---
Buddy IS-A Dog: true
Buddy IS-A Animal: true
Whiskers IS-A Cat: true
Whiskers IS-A Animal: true

================================
```

**💡 What Dog Inherits:**

```
Animal (Parent)
├── Properties: name, age
├── Methods: eat(), sleep(), displayInfo()

Dog (Child) gets:
├── INHERITED: name, age, eat(), sleep(), displayInfo()
└── OWN: breed, bark(), fetch()

Total for Dog = Inherited + Own
```

**Inheritance Syntax:**
```java
class ChildClass extends ParentClass {
    // Child class members
}

// "extends" keyword creates inheritance
```

**✅ Success Criteria:**
- [ ] Understand child class inherits from parent
- [ ] Know the IS-A relationship (Dog IS-A Animal)
- [ ] Can use inherited members in child class
- [ ] Recognize child can add own members
- [ ] Create both parent and child classes successfully

**Common Mistakes:**

1. ❌ **Trying to Use Multiple Inheritance**: Attempting to extend multiple classes at once
   - Why: Students coming from languages like C++ or Python try `class Dog extends Animal, Pet`, but Java only supports single inheritance to avoid the diamond problem and keep the language simple.
   - Fix: A class can only extend ONE parent class. Use interfaces for multiple type relationships (covered later).
   - Example:
     ```java
     // Wrong - Java doesn't support this
     class Dog extends Animal, Mammal {  // Compile error!
     }

     // Correct - single inheritance only
     class Dog extends Animal {
     }
     ```

2. ❌ **Forgetting the `extends` Keyword**: Trying to create inheritance relationship without proper syntax
   - Why: Students assume naming or proximity creates inheritance, but Java requires explicit `extends` keyword.
   - Fix: Always use `class ChildClass extends ParentClass` syntax.
   - Example:
     ```java
     // Wrong - no inheritance relationship
     class Animal { }
     class Dog { }  // Not inheriting from Animal!

     // Correct - explicit inheritance
     class Animal { }
     class Dog extends Animal { }  // Now Dog inherits from Animal
     ```

3. ❌ **Attempting to Access Private Parent Members in Child Class**: Trying to directly use parent's private fields/methods in the child
   - Why: Students don't understand that `private` means "only accessible within the same class." Even though the field exists in the child object, it's not accessible from child class code.
   - Fix: Use `protected` or `public` for members that children need to access. Use getters/setters for private fields.
   - Example:
     ```java
     // Wrong - can't access private members
     class Animal {
         private String name;
     }
     class Dog extends Animal {
         void bark() {
             System.out.println(name + " says Woof!");  // Error: name has private access
         }
     }

     // Correct - use protected or public
     class Animal {
         protected String name;  // or public
     }
     class Dog extends Animal {
         void bark() {
             System.out.println(name + " says Woof!");  // Works!
         }
     }

     // Also correct - use getters
     class Animal {
         private String name;
         public String getName() { return name; }
     }
     class Dog extends Animal {
         void bark() {
             System.out.println(getName() + " says Woof!");  // Works!
         }
     }
     ```

4. ❌ **Duplicating Parent Code in Child Classes**: Copying the same properties/methods from parent into each child
   - Why: Students don't trust inheritance or don't realize that child automatically has parent's members. This defeats the purpose of inheritance.
   - Fix: Only define members in the child that are specific to that child. Don't redefine parent members.
   - Example:
     ```java
     // Wrong - duplicating code
     class Animal {
         String name;
         void eat() { System.out.println("Eating"); }
     }
     class Dog extends Animal {
         String name;  // Unnecessary duplication!
         void eat() { System.out.println("Eating"); }  // Unnecessary duplication!
         void bark() { System.out.println("Woof"); }
     }

     // Correct - only child-specific code
     class Animal {
         String name;
         void eat() { System.out.println("Eating"); }
     }
     class Dog extends Animal {
         // name and eat() are inherited automatically
         void bark() { System.out.println("Woof"); }  // Only Dog-specific method
     }
     ```

5. ❌ **Using Inheritance for HAS-A Relationships**: Using `extends` when composition would be better
   - Why: Not everything should use inheritance. If the relationship is "has a" instead of "is a", use composition (a field) instead.
   - Fix: Use inheritance only for true IS-A relationships. Use composition (fields) for HAS-A relationships.
   - Example:
     ```java
     // Wrong - Car HAS-A engine, not IS-A engine
     class Engine {
         void start() { }
     }
     class Car extends Engine {  // Wrong relationship!
     }

     // Correct - Car HAS-A engine (composition)
     class Engine {
         void start() { }
     }
     class Car {
         private Engine engine;  // Composition
         Car() {
             this.engine = new Engine();
         }
         void start() {
             engine.start();
         }
     }

     // Another example:
     // Wrong: class Student extends School { }  // Student doesn't "IS-A" School
     // Correct: Student HAS-A school field
     ```

**🎯 Challenge:**
Create:
1. `Vehicle` parent class (brand, year, start(), stop())
2. `Car` child class (numberOfDoors, honk())
3. `Motorcycle` child class (hasSidecar, wheelie())
4. Test both children, use inherited and own methods

**📋 Best Practices:**

✅ **Use Inheritance for IS-A Relationships Only**
- **Why:** Inheritance represents true type relationships; misuse leads to confusing code
- **How:** Ask "Is the child truly a type of parent?" before using `extends`
- **Example:**
```java
// ✅ Good - Clear IS-A relationships
class Dog extends Animal { }  // Dog IS-A Animal
class SavingsAccount extends BankAccount { }  // SavingsAccount IS-A BankAccount

// ❌ Bad - Wrong relationships
class Car extends Engine { }  // Car HAS-A Engine (composition, not inheritance)
class Student extends School { }  // Student belongs to School (association, not IS-A)
```

✅ **Put Common Code in Parent Class**
- **Why:** Eliminates code duplication; changes propagate automatically to all children
- **How:** Identify shared properties and behaviors; move them up to parent class
- **Example:**
```java
// ❌ Bad - Duplicated code
class Dog {
    String name;
    void eat() { System.out.println("Eating"); }
}
class Cat {
    String name;  // Duplicated!
    void eat() { System.out.println("Eating"); }  // Duplicated!
}

// ✅ Good - Common code in parent
class Animal {
    String name;
    void eat() { System.out.println("Eating"); }
}
class Dog extends Animal { }  // Inherits name and eat()
class Cat extends Animal { }  // Inherits name and eat()
```

✅ **Keep Parent Classes General, Child Classes Specific**
- **Why:** Maintains clear hierarchy; parent represents broad category, children add specifics
- **How:** Parent has common features; children add specialized behavior
- **Example:**
```java
// ✅ Good - Clear generalization
class Animal {  // General
    void eat() { }
    void sleep() { }
}
class Dog extends Animal {  // Specific
    void bark() { }  // Dog-specific
    void fetch() { }  // Dog-specific
}
```

✅ **Don't Access Private Parent Members from Child**
- **Why:** Private members are implementation details; use protected or public instead
- **How:** Use `protected` for members that children need; keep truly private as `private`
- **Example:**
```java
class Animal {
    private String secretId;  // Only Animal should access
    protected String name;  // Children can access

    protected String getName() { return name; }  // Accessible to children
}

class Dog extends Animal {
    void printInfo() {
        // System.out.println(secretId);  // ❌ Error - private
        System.out.println(name);  // ✅ OK - protected
        System.out.println(getName());  // ✅ OK - protected method
    }
}
```

✅ **Design Parent Classes as Reusable Base Components**
- **Why:** Well-designed parent classes enable easy extension without modification
- **How:** Include methods/properties all children will need; avoid child-specific details
- **Example:**
```java
// ✅ Good - Reusable parent
class Employee {
    protected String name;
    protected double baseSalary;

    public double calculatePay() {
        return baseSalary;  // Default implementation
    }
}

class Manager extends Employee {
    private double bonus;
    @Override
    public double calculatePay() {
        return baseSalary + bonus;  // Specialized
    }
}
```

---

#### Exercise 2: Accessing Parent Class Members (15 minutes)

**What you'll learn:** How child classes access and use parent class members

**Create classes: `Person`, `Employee`**

**Concept:** Child classes automatically inherit all non-private members from parent class. They can access them directly as if they were defined in the child class itself.

```
Access Levels in Inheritance:
✅ public    - Inherited, accessible everywhere
✅ protected - Inherited, accessible in child
❌ private   - NOT inherited, not accessible
✅ default   - Inherited if same package
```

**Step-by-Step:**

```java
// PARENT CLASS
class Person {
    // public members - accessible everywhere
    public String name;
    public int age;

    // protected member - accessible in child classes
    protected String address;

    // private member - NOT accessible in child classes
    private String ssn;

    // Public method
    public void displayBasicInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }

    // Protected method
    protected void displayAddress() {
        System.out.println("Address: " + address);
    }

    // Private method
    private void displaySSN() {
        System.out.println("SSN: " + ssn);
    }
}

// CHILD CLASS
class Employee extends Person {
    // Employee's own properties
    String employeeId;
    double salary;
    String department;

    void displayEmployeeInfo() {
        // Access inherited public members
        System.out.println("Employee: " + name);  // ✅ Can access
        System.out.println("Age: " + age);        // ✅ Can access

        // Access inherited protected members
        System.out.println("Address: " + address);  // ✅ Can access

        // CANNOT access private members
        // System.out.println("SSN: " + ssn);  // ❌ Compile error!

        // Employee's own data
        System.out.println("ID: " + employeeId);
        System.out.println("Department: " + department);
        System.out.println("Salary: $" + salary);
    }

    void useInheritedMethods() {
        // Call inherited public method
        displayBasicInfo();  // ✅ Can call

        // Call inherited protected method
        displayAddress();    // ✅ Can call

        // CANNOT call private method
        // displaySSN();     // ❌ Compile error!
    }
}

public class AccessingParentMembers {
    public static void main(String[] args) {
        System.out.println("===== ACCESSING PARENT MEMBERS =====\n");

        // Create Employee object
        Employee emp = new Employee();

        // Set inherited properties (from Person)
        emp.name = "John Smith";      // public - accessible
        emp.age = 30;                 // public - accessible
        emp.address = "123 Main St";  // protected - accessible

        // Set own properties
        emp.employeeId = "EMP001";
        emp.salary = 75000;
        emp.department = "Engineering";

        System.out.println("--- Display Employee Info ---");
        emp.displayEmployeeInfo();

        System.out.println("\n--- Using Inherited Methods ---");
        emp.useInheritedMethods();

        System.out.println("\n--- Direct Method Calls ---");
        emp.displayBasicInfo();  // Inherited public method

        System.out.println("\n====================================");
    }
}
```

**Expected Output:**
```
===== ACCESSING PARENT MEMBERS =====

--- Display Employee Info ---
Employee: John Smith
Age: 30
Address: 123 Main St
ID: EMP001
Department: Engineering
Salary: $75000.0

--- Using Inherited Methods ---
Name: John Smith
Age: 30
Address: 123 Main St

--- Direct Method Calls ---
Name: John Smith
Age: 30

====================================
```

**💡 Access Level Summary:**

```
                    Accessible in Child?
public              ✅ YES
protected           ✅ YES
private             ❌ NO
default (no modifier) ✅ YES (same package)
```

**Visual Representation:**
```
Person (Parent)
├── public name      → Employee can access ✅
├── public age       → Employee can access ✅
├── protected address → Employee can access ✅
└── private ssn      → Employee CANNOT access ❌
```

**✅ Success Criteria:**
- [ ] Understand public members are inherited and accessible
- [ ] Know protected members are inherited and accessible in child
- [ ] Recognize private members are NOT accessible in child
- [ ] Can access inherited properties and methods directly
- [ ] Understand difference between access levels

**Common Mistakes:**

1. ❌ **Attempting to Access Private Parent Fields Directly**: Trying to use `parent.privateField` in child class code
   - Why: Students see the field exists in the parent and assume they can access it, but `private` means "only within the same class." Even child classes cannot access parent's private members.
   - Fix: Use `protected` for fields children need, or provide protected/public getters.
   - Example:
     ```java
     // Wrong
     class Person {
         private String ssn;
     }
     class Employee extends Person {
         void display() {
             System.out.println(ssn);  // Error: ssn has private access
         }
     }

     // Correct option 1 - use protected
     class Person {
         protected String ssn;
     }
     class Employee extends Person {
         void display() {
             System.out.println(ssn);  // Works!
         }
     }

     // Correct option 2 - use getter
     class Person {
         private String ssn;
         protected String getSSN() { return ssn; }
     }
     class Employee extends Person {
         void display() {
             System.out.println(getSSN());  // Works!
         }
     }
     ```

2. ❌ **Confusing Default (Package-Private) with Public Access**: Thinking fields with no access modifier are accessible from child classes in different packages
   - Why: Default (no modifier) access means "same package only." If child class is in a different package, it cannot access default members.
   - Fix: Use `public` or `protected` for cross-package inheritance. Default is for same-package access only.
   - Example:
     ```java
     // Wrong - different packages
     package com.company.parent;
     class Person {
         String name;  // Default access
     }

     package com.company.child;
     class Employee extends Person {
         void display() {
             System.out.println(name);  // Error: name is not accessible (different package)
         }
     }

     // Correct - use protected or public
     package com.company.parent;
     class Person {
         protected String name;  // or public
     }

     package com.company.child;
     class Employee extends Person {
         void display() {
             System.out.println(name);  // Works!
         }
     }
     ```

3. ❌ **Making Everything Public to Avoid Access Issues**: Setting all fields to public to make them accessible in child classes
   - Why: Using `public` for everything breaks encapsulation. External code can now access and modify these fields directly, defeating the purpose of information hiding.
   - Fix: Use `protected` for inheritance access. This allows child classes to access while still protecting from external modification.
   - Example:
     ```java
     // Wrong - breaks encapsulation
     class BankAccount {
         public double balance;  // Anyone can modify!
     }

     class SavingsAccount extends BankAccount {
         void addInterest() {
             balance *= 1.05;
         }
     }

     // External code can do this:
     SavingsAccount account = new SavingsAccount();
     account.balance = -1000;  // Disaster! No validation

     // Correct - use protected
     class BankAccount {
         protected double balance;  // Only subclasses can access
     }

     class SavingsAccount extends BankAccount {
         void addInterest() {
             balance *= 1.05;  // Works for child
         }
     }

     // External code CANNOT do this:
     // account.balance = -1000;  // Error: balance has protected access
     ```

4. ❌ **Not Understanding That Protected Allows Package Access Too**: Thinking `protected` means "only child classes"
   - Why: Protected actually means "child classes AND same package." Classes in the same package can access protected members even without inheritance.
   - Fix: Be aware that `protected` is not just for inheritance. Use `private` with protected methods if you need strict control.
   - Example:
     ```java
     // Protected is accessible in same package
     package com.company;

     class Person {
         protected String name;
     }

     class UnrelatedClass {  // Not a child of Person
         void test() {
             Person p = new Person();
             p.name = "Test";  // Works! Same package
         }
     }

     // To restrict to children only, use private + protected methods
     class Person {
         private String name;

         protected String getName() { return name; }  // Only through method
     }
     ```

5. ❌ **Forgetting That Inherited Members Can Be Used as If They Were Declared in Child**: Thinking you need special syntax to access inherited members
   - Why: Students sometimes try `super.inheritedField` or `parent.inheritedMethod()` unnecessarily. Inherited members become part of the child class and can be accessed directly.
   - Fix: Access inherited public/protected members directly with no special syntax (unless shadowed/overridden).
   - Example:
     ```java
     class Person {
         protected String name;
         protected void greet() { System.out.println("Hello"); }
     }

     class Employee extends Person {
         void display() {
             // Wrong - unnecessary 'super'
             System.out.println(super.name);  // Works but unnecessary
             super.greet();  // Works but unnecessary

             // Correct - direct access
             System.out.println(name);  // Inherited, use directly
             greet();  // Inherited, call directly

             // Note: 'super' is only needed when:
             // 1. Child has same-named field/method
             // 2. You want to access parent's version explicitly
         }
     }
     ```

**🎯 Challenge:**
Create:
1. `BankAccount` class with public balance, protected accountNumber, private pin
2. `SavingsAccount` extends BankAccount
3. Try accessing each member type in SavingsAccount
4. Document which ones work and which give errors

**📋 Best Practices:**

✅ **Use Protected for Members Children Need to Access**
- **Why:** Protected balances encapsulation with inheritance; children can access but external code cannot
- **How:** Mark fields/methods as `protected` when subclasses need direct access
- **Example:**
```java
class Employee {
    protected String name;  // ✅ Subclasses can access
    private String ssn;     // ✅ Truly private, no access

    protected double getBaseSalary() {  // ✅ For subclasses to use
        return baseSalary;
    }
}

class Manager extends Employee {
    void display() {
        System.out.println(name);  // ✅ Works - protected
        // System.out.println(ssn);  // ❌ Error - private
    }
}
```

✅ **Understand the Four Access Levels in Inheritance**
- **Why:** Choosing the right access level prevents bugs and maintains encapsulation
- **How:** Use public (everywhere), protected (subclasses), default (same package), private (same class only)
- **Example:**
```java
class Parent {
    public String publicField;      // Accessible everywhere
    protected String protectedField; // Accessible in subclasses
    String defaultField;            // Accessible in same package
    private String privateField;    // Only in Parent class
}

class Child extends Parent {
    void test() {
        publicField = "ok";     // ✅ Public accessible
        protectedField = "ok";  // ✅ Protected accessible
        defaultField = "ok";    // ✅ If same package
        // privateField = "no";  // ❌ Private not accessible
    }
}
```

✅ **Prefer Private with Protected Getters/Setters**
- **Why:** Maintains encapsulation while allowing controlled subclass access
- **How:** Keep fields private, provide protected methods for subclass access
- **Example:**
```java
// ✅ Good - Controlled access
class BankAccount {
    private double balance;  // Private field

    protected double getBalance() {  // Protected getter for subclasses
        return balance;
    }

    protected void setBalance(double balance) {  // Protected setter with validation
        if (balance >= 0) this.balance = balance;
    }
}

class SavingsAccount extends BankAccount {
    void addInterest() {
        double current = getBalance();  // ✅ Access via protected method
        setBalance(current * 1.05);
    }
}
```

✅ **Don't Make Everything Public Just for Inheritance**
- **Why:** Public access breaks encapsulation and exposes implementation details
- **How:** Use the minimum necessary access level; prefer protected over public for inheritance
- **Example:**
```java
// ❌ Bad - Unnecessarily public
class Parent {
    public double internalCalculation;  // Exposed to everyone!
}

// ✅ Good - Appropriate access levels
class Parent {
    private double internalCalculation;  // Hidden

    protected double calculate() {  // Available to subclasses only
        return internalCalculation * 2;
    }
}
```

---

#### Exercise 3: The super Keyword (20 minutes)

**What you'll learn:** Using super to access parent class members and constructors

**Create classes: `Vehicle`, `Car`**

**Concept:** The **super** keyword refers to the parent class. Use it to:
1. Call parent constructor
2. Access parent methods
3. Access parent variables (when hidden by child)

```
super() = Call parent constructor
super.method() = Call parent method
super.variable = Access parent variable
```

**Important Rules:**
- `super()` must be the FIRST statement in child constructor
- If you don't call `super()`, Java automatically calls `super()` (no-arg version)
- Can only call `super()` once per constructor

**Step-by-Step:**

```java
// PARENT CLASS
class Vehicle {
    String brand;
    int year;
    String color;

    // Parent constructor with parameters
    Vehicle(String brand, int year, String color) {
        this.brand = brand;
        this.year = year;
        this.color = color;
        System.out.println("Vehicle constructor called");
    }

    void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Year: " + year);
        System.out.println("Color: " + color);
    }

    void start() {
        System.out.println("Vehicle is starting...");
    }

    void stop() {
        System.out.println("Vehicle is stopping...");
    }
}

// CHILD CLASS
class Car extends Vehicle {
    int numberOfDoors;
    String fuelType;

    // Child constructor
    Car(String brand, int year, String color, int numberOfDoors, String fuelType) {
        // MUST call parent constructor first using super()
        super(brand, year, color);  // Calls Vehicle(brand, year, color)

        System.out.println("Car constructor called");

        // Now initialize Car's own properties
        this.numberOfDoors = numberOfDoors;
        this.fuelType = fuelType;
    }

    // Override parent method but use super to call parent version
    @Override
    void displayInfo() {
        // First call parent's displayInfo
        super.displayInfo();  // Displays brand, year, color

        // Then add Car-specific info
        System.out.println("Doors: " + numberOfDoors);
        System.out.println("Fuel: " + fuelType);
    }

    // Override start method but enhance it
    @Override
    void start() {
        System.out.println("Checking car systems...");
        super.start();  // Call parent's start method
        System.out.println("Car is ready to drive!");
    }

    // New method that uses super
    void honk() {
        System.out.println("Car horn: Beep! Beep!");
    }
}

public class SuperKeywordDemo {
    public static void main(String[] args) {
        System.out.println("===== SUPER KEYWORD DEMO =====\n");

        // Create Car (watch constructor chaining)
        System.out.println("--- Creating Car ---");
        Car car = new Car("Toyota", 2023, "Red", 4, "Gasoline");

        System.out.println("\n--- Display Info (using super) ---");
        car.displayInfo();  // Uses super.displayInfo() inside

        System.out.println("\n--- Start Car (using super) ---");
        car.start();  // Uses super.start() inside

        System.out.println("\n--- Car-specific method ---");
        car.honk();

        System.out.println("\n--- Stop Car ---");
        car.stop();  // Inherited method (not overridden)

        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== SUPER KEYWORD DEMO =====

--- Creating Car ---
Vehicle constructor called
Car constructor called

--- Display Info (using super) ---
Brand: Toyota
Year: 2023
Color: Red
Doors: 4
Fuel: Gasoline

--- Start Car (using super) ---
Checking car systems...
Vehicle is starting...
Car is ready to drive!

--- Car-specific method ---
Car horn: Beep! Beep!

--- Stop Car ---
Vehicle is stopping...

================================
```

**💡 Constructor Chaining with super():**

```
Step-by-step execution:

1. Car car = new Car("Toyota", 2023, "Red", 4, "Gasoline");
2. Car constructor called
3. super(brand, year, color) executed → jumps to Vehicle constructor
4. Vehicle constructor executes
5. Returns to Car constructor
6. Car constructor continues and finishes

Flow: Car constructor → Vehicle constructor → back to Car constructor
```

**Three Uses of super:**

```java
// 1. Call parent constructor
class Child extends Parent {
    Child() {
        super();  // Calls Parent()
    }
}

// 2. Call parent method
class Child extends Parent {
    void method() {
        super.method();  // Calls Parent's method()
    }
}

// 3. Access parent variable
class Child extends Parent {
    void display() {
        System.out.println(super.variable);  // Parent's variable
    }
}
```

**✅ Success Criteria:**
- [ ] Understand super accesses parent class
- [ ] Know super() must be first in constructor
- [ ] Can call parent constructor with super()
- [ ] Can call parent methods with super.method()
- [ ] Recognize constructor chaining sequence
- [ ] Successfully compile and run the program

**Common Mistakes:**

1. ❌ **Not Placing super() as First Statement in Constructor**: Writing code before `super()` call
   - Why: Java requires parent initialization to happen first. The parent must be fully constructed before the child can safely access inherited members or initialize its own fields.
   - Fix: Always make `super()` the very first statement in child constructor. Nothing can come before it.
   - Example:
     ```java
     // Wrong - code before super()
     class Car extends Vehicle {
         Car(String brand, int year) {
             System.out.println("Creating car");  // Error: super() not first
             super(brand, year);
         }
     }

     // Also wrong - field initialization before super()
     class Car extends Vehicle {
         int doors;
         Car(String brand, int year, int d) {
             this.doors = d;  // Error: super() must be first
             super(brand, year);
         }
     }

     // Correct - super() first
     class Car extends Vehicle {
         Car(String brand, int year) {
             super(brand, year);  // First statement
             System.out.println("Creating car");  // Now OK
         }
     }
     ```

2. ❌ **Forgetting to Call super() When Parent Has No Default Constructor**: Not calling super with arguments when parent only has parameterized constructor
   - Why: If parent class doesn't have a no-arg constructor, Java cannot automatically call `super()`. You must explicitly call `super(args)` with the required parameters.
   - Fix: When parent has only parameterized constructors, explicitly call `super(args)` with matching parameters.
   - Example:
     ```java
     // Wrong - parent needs parameters
     class Vehicle {
         String brand;
         Vehicle(String brand) {  // No default constructor!
             this.brand = brand;
         }
     }

     class Car extends Vehicle {
         Car() {
             // Implicit super() fails - Vehicle needs a parameter!
         }  // Compile error: constructor Vehicle in class Vehicle cannot be applied
     }

     // Correct - explicit super with parameters
     class Car extends Vehicle {
         Car(String brand) {
             super(brand);  // Must provide required parameter
         }
     }
     ```

3. ❌ **Calling super() Multiple Times**: Trying to call parent constructor more than once
   - Why: Each object can only be constructed once. Calling super() multiple times would try to initialize the parent multiple times, which makes no sense.
   - Fix: Call super() exactly once, as the first statement. If you need to initialize multiple things, pass all necessary data in one super() call.
     ```java
     // Wrong - multiple super() calls
     class Car extends Vehicle {
         Car(String brand, int year) {
             super(brand);  // First call
             super(year);   // Error: Call to super must be first statement
         }
     }

     // Correct - one super() call with all parameters
     class Car extends Vehicle {
         Car(String brand, int year) {
             super(brand, year);  // One call with all needed data
         }
     }
     ```

4. ❌ **Confusing super.method() with this.method()**: Using `this` when you mean `super`, or vice versa
   - Why: `this` refers to the current object (child), while `super` refers to the parent class. Using the wrong one calls the wrong version of the method.
   - Fix: Use `super.method()` to explicitly call parent's version, `this.method()` for current class version (or just `method()` for current class).
   - Example:
     ```java
     class Animal {
         void sound() { System.out.println("Generic sound"); }
     }

     class Dog extends Animal {
         @Override
         void sound() { System.out.println("Woof!"); }

         void makeAllSounds() {
             this.sound();   // Calls Dog's sound() → "Woof!"
             // or just: sound();  // Same as this.sound()

             super.sound();  // Calls Animal's sound() → "Generic sound"
         }
     }

     // Wrong - using this when you want parent behavior
     class Dog extends Animal {
         @Override
         void sound() {
             this.sound();  // Infinite recursion! Calls itself
         }
     }

     // Correct - use super for parent behavior
     class Dog extends Animal {
         @Override
         void sound() {
             super.sound();  // Calls parent's sound()
             System.out.println("Woof!");
         }
     }
     ```

5. ❌ **Using super in Static Methods**: Trying to access super keyword in static context
   - Why: `super` refers to an instance of the parent class, but static methods don't have instances. They belong to the class itself.
   - Fix: Don't use `super` in static methods. Use the parent class name directly if needed.
   - Example:
     ```java
     class Parent {
         static void staticMethod() {
             System.out.println("Parent static");
         }
         void instanceMethod() {
             System.out.println("Parent instance");
         }
     }

     class Child extends Parent {
         static void childStatic() {
             // super.staticMethod();  // Error: non-static variable super cannot be referenced from static context
             Parent.staticMethod();  // Correct - use class name
         }

         void childInstance() {
             super.instanceMethod();  // OK - instance method can use super
         }
     }
     ```

**🎯 Challenge:**
Create:
1. `Employee` class (name, salary, constructor, displayInfo())
2. `Manager` class extends Employee (department, bonus)
3. Manager constructor calls super(name, salary)
4. Manager.displayInfo() calls super.displayInfo() then adds department/bonus
5. Test with multiple managers

**📋 Best Practices:**

✅ **Always Call super() First in Child Constructors**
- **Why:** Parent must be initialized before child; Java enforces super() as first statement
- **How:** Place `super(...)` as the very first line in child constructor
- **Example:**
```java
class Employee {
    String name;
    Employee(String name) { this.name = name; }
}

class Manager extends Employee {
    String department;

    Manager(String name, String dept) {
        super(name);  // ✅ First statement
        this.department = dept;  // Then child initialization
    }
}
```

✅ **Use super to Call Parent Methods When Extending Behavior**
- **Why:** Reuses parent logic instead of duplicating; maintains DRY principle
- **How:** Call `super.methodName()` to execute parent version, then add child-specific logic
- **Example:**
```java
class Animal {
    void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        super.makeSound();  // ✅ Call parent version
        System.out.println("Woof!");  // Add child-specific behavior
    }
}
```

✅ **Pass Correct Arguments to Parent Constructor**
- **Why:** Parent constructor needs proper initialization data
- **How:** Match parent constructor parameters exactly in super() call
- **Example:**
```java
class Vehicle {
    String brand;
    int year;

    Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
}

class Car extends Vehicle {
    int doors;

    Car(String brand, int year, int doors) {
        super(brand, year);  // ✅ Passes required parent parameters
        this.doors = doors;
    }
}
```

✅ **Avoid super Calls for Complete Method Replacement**
- **Why:** If you're completely replacing behavior, calling super() adds unnecessary overhead
- **How:** Only use super.method() when you want to extend, not replace
- **Example:**
```java
// ❌ Bad - Calling super when completely replacing
class Square extends Shape {
    @Override
    double getArea() {
        super.getArea();  // Pointless - not using result
        return side * side;  // Complete replacement
    }
}

// ✅ Good - No super call for complete replacement
class Square extends Shape {
    @Override
    double getArea() {
        return side * side;  // Complete replacement, no super needed
    }
}
```

✅ **Don't Use super in Static Contexts**
- **Why:** super refers to instance, but static methods belong to class
- **How:** Keep super usage to instance methods and constructors only
- **Example:**
```java
class Parent {
    static void staticMethod() { }
    void instanceMethod() { }
}

class Child extends Parent {
    static void childStatic() {
        // super.staticMethod();  // ❌ Error - can't use super in static
        Parent.staticMethod();  // ✅ Use class name instead
    }

    void childInstance() {
        super.instanceMethod();  // ✅ OK in instance method
    }
}
```

---

#### Exercise 4: Method Overriding (20 minutes)

**What you'll learn:** Overriding parent methods to provide child-specific implementations

**Create classes: `Shape`, `Circle`, `Rectangle`, `Triangle`**

**Concept:** **Method Overriding** is when a child class provides its own implementation of a parent method. Same method name and parameters, but different behavior.

```
Parent method = General implementation
Child overrides = Specific implementation

Same method signature
Different behavior
Decided at runtime
```

**Rules for Overriding:**
1. Same method name
2. Same parameters (number, type, order)
3. Same or compatible return type
4. Cannot have stricter access modifier
5. Use @Override annotation (highly recommended)

**Why Override?**
- Provide specific implementation for child class
- Customize behavior while keeping same interface
- Enable polymorphism

**Step-by-Step:**

```java
// PARENT CLASS
class Shape {
    String name;
    String color;

    Shape(String name, String color) {
        this.name = name;
        this.color = color;
    }

    // Method to be overridden - generic implementation
    double getArea() {
        System.out.println("Shape: getArea() called (generic)");
        return 0.0;
    }

    // Method to be overridden
    double getPerimeter() {
        System.out.println("Shape: getPerimeter() called (generic)");
        return 0.0;
    }

    // Method NOT overridden - stays same for all shapes
    void displayInfo() {
        System.out.println("Shape: " + name);
        System.out.println("Color: " + color);
    }
}

// CHILD CLASS 1: Circle
class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super("Circle", color);
        this.radius = radius;
    }

    // OVERRIDE getArea() - Circle-specific implementation
    @Override
    double getArea() {
        System.out.println("Circle: getArea() called");
        return Math.PI * radius * radius;
    }

    // OVERRIDE getPerimeter()
    @Override
    double getPerimeter() {
        System.out.println("Circle: getPerimeter() called");
        return 2 * Math.PI * radius;
    }
}

// CHILD CLASS 2: Rectangle
class Rectangle extends Shape {
    double length;
    double width;

    Rectangle(String color, double length, double width) {
        super("Rectangle", color);
        this.length = length;
        this.width = width;
    }

    // OVERRIDE getArea() - Rectangle-specific implementation
    @Override
    double getArea() {
        System.out.println("Rectangle: getArea() called");
        return length * width;
    }

    // OVERRIDE getPerimeter()
    @Override
    double getPerimeter() {
        System.out.println("Rectangle: getPerimeter() called");
        return 2 * (length + width);
    }
}

// CHILD CLASS 3: Triangle
class Triangle extends Shape {
    double base;
    double height;
    double side1, side2, side3;

    Triangle(String color, double base, double height, double side1, double side2, double side3) {
        super("Triangle", color);
        this.base = base;
        this.height = height;
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    // OVERRIDE getArea() - Triangle-specific implementation
    @Override
    double getArea() {
        System.out.println("Triangle: getArea() called");
        return 0.5 * base * height;
    }

    // OVERRIDE getPerimeter()
    @Override
    double getPerimeter() {
        System.out.println("Triangle: getPerimeter() called");
        return side1 + side2 + side3;
    }
}

public class MethodOverridingDemo {
    public static void main(String[] args) {
        System.out.println("===== METHOD OVERRIDING =====\n");

        // Create different shapes
        Circle circle = new Circle("Red", 5.0);
        Rectangle rectangle = new Rectangle("Blue", 4.0, 6.0);
        Triangle triangle = new Triangle("Green", 6.0, 4.0, 5.0, 5.0, 6.0);

        // Test Circle
        System.out.println("--- CIRCLE ---");
        circle.displayInfo();
        System.out.println("Area: " + circle.getArea());
        System.out.println("Perimeter: " + circle.getPerimeter());

        // Test Rectangle
        System.out.println("\n--- RECTANGLE ---");
        rectangle.displayInfo();
        System.out.println("Area: " + rectangle.getArea());
        System.out.println("Perimeter: " + rectangle.getPerimeter());

        // Test Triangle
        System.out.println("\n--- TRIANGLE ---");
        triangle.displayInfo();
        System.out.println("Area: " + triangle.getArea());
        System.out.println("Perimeter: " + triangle.getPerimeter());

        // Demonstrate polymorphism with overridden methods
        System.out.println("\n--- POLYMORPHISM WITH OVERRIDING ---");
        Shape shape1 = new Circle("Yellow", 3.0);
        Shape shape2 = new Rectangle("Purple", 5.0, 7.0);

        System.out.println("\nShape1 (Circle):");
        System.out.println("Area: " + shape1.getArea());  // Calls Circle's version

        System.out.println("\nShape2 (Rectangle):");
        System.out.println("Area: " + shape2.getArea());  // Calls Rectangle's version

        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== METHOD OVERRIDING =====

--- CIRCLE ---
Shape: Circle
Color: Red
Circle: getArea() called
Area: 78.53981633974483
Circle: getPerimeter() called
Perimeter: 31.41592653589793

--- RECTANGLE ---
Shape: Rectangle
Color: Blue
Rectangle: getArea() called
Area: 24.0
Rectangle: getPerimeter() called
Perimeter: 20.0

--- TRIANGLE ---
Shape: Triangle
Color: Green
Triangle: getArea() called
Area: 12.0
Triangle: getPerimeter() called
Perimeter: 16.0

--- POLYMORPHISM WITH OVERRIDING ---

Shape1 (Circle):
Circle: getArea() called
Area: 28.274333882308138

Shape2 (Rectangle):
Rectangle: getArea() called
Area: 35.0

================================
```

**💡 Overriding vs Overloading:**

| Aspect | Overriding | Overloading |
|--------|-----------|-------------|
| **Where** | Parent vs Child class | Same class |
| **Method name** | Same | Same |
| **Parameters** | Same | Different |
| **Return type** | Same/compatible | Can be different |
| **Binding** | Runtime (dynamic) | Compile-time (static) |
| **Purpose** | Change behavior | Multiple versions |
| **@Override** | Required annotation | Not applicable |

**Method Signature Must Match:**
```java
// Parent
double getArea() { }

// Child - CORRECT override
@Override
double getArea() { }  // ✅ Same signature

// Child - NOT override (different params = overloading)
double getArea(int x) { }  // This is OVERLOADING
```

**@Override Annotation Benefits:**
```java
class Child extends Parent {
    @Override  // Compiler checks it's valid override
    void method() {
        // If this doesn't match parent, compiler error!
    }

    // Without @Override, typos create NEW methods:
    void methd() {  // Oops! Typo - doesn't override anything
        // This creates a NEW method, doesn't override
    }
}
```

**✅ Success Criteria:**
- [ ] Understand overriding = same signature, different implementation
- [ ] Can override parent methods in child class
- [ ] Know @Override annotation prevents mistakes
- [ ] Recognize overriding enables polymorphism
- [ ] Successfully override multiple methods
- [ ] Understand when to override vs when to inherit as-is

**Common Mistakes:**

1. ❌ **Changing Method Parameters (Overloading Instead of Overriding)**: Adding or changing parameters when trying to override
   - Why: Students don't realize that overriding requires the exact same method signature. Changing parameters creates a new method (overloading), not an override.
   - Fix: Match the parent method's signature exactly - same name, same parameters (type, order, number).
   - Example:
     ```java
     // Wrong - this is overloading, not overriding
     class Shape {
         double getArea() { return 0; }
     }

     class Circle extends Shape {
         @Override  // Error: method does not override a method from its superclass
         double getArea(double radius) {  // Different parameters!
             return Math.PI * radius * radius;
         }
     }

     // Correct - exact match
     class Circle extends Shape {
         double radius = 5;

         @Override
         double getArea() {  // Same signature
             return Math.PI * radius * radius;
         }
     }
     ```

2. ❌ **Not Using @Override Annotation**: Omitting `@Override` and making typos that create new methods instead of overriding
   - Why: Without `@Override`, the compiler doesn't know you intended to override. A typo will silently create a new method instead of giving an error.
   - Fix: Always use `@Override` annotation. The compiler will verify you're actually overriding a parent method.
   - Example:
     ```java
     // Wrong - typo creates new method
     class Animal {
         void makeSound() { System.out.println("Generic sound"); }
     }

     class Dog extends Animal {
         void makeSond() {  // Typo! Creates NEW method, doesn't override
             System.out.println("Woof");
         }
     }

     // Correct - @Override catches typos
     class Dog extends Animal {
         @Override
         void makeSond() {  // Compile error: method does not override
             System.out.println("Woof");
         }
     }

     // Fixed - correct spelling with @Override
     class Dog extends Animal {
         @Override
         void makeSound() {  // Now it works!
             System.out.println("Woof");
         }
     }
     ```

3. ❌ **Using Stricter Access Modifier in Child**: Making overridden method less accessible than parent
   - Why: Overriding method must be at least as accessible as the parent method. You can't reduce visibility (e.g., public → private).
   - Fix: Keep the same access level or make it wider. If parent is public, child must be public. If parent is protected, child can be protected or public.
   - Example:
     ```java
     // Wrong - reducing visibility
     class Animal {
         public void eat() {  // public
             System.out.println("Eating");
         }
     }

     class Dog extends Animal {
         @Override
         private void eat() {  // Error: attempting to assign weaker access privileges
             System.out.println("Dog eating");
         }
     }

     // Correct - same or wider access
     class Dog extends Animal {
         @Override
         public void eat() {  // public (same level)
             System.out.println("Dog eating");
         }
     }
     ```

4. ❌ **Trying to Override final Methods**: Attempting to override a method marked as final in parent class
   - Why: The `final` keyword explicitly prevents overriding. It's used when the parent wants to lock down behavior.
   - Fix: Don't try to override final methods. Either accept the parent's implementation or discuss with your team if final should be removed.
   - Example:
     ```java
     // Wrong - can't override final
     class Animal {
         final void breathe() {  // final method
             System.out.println("Breathing air");
         }
     }

     class Fish extends Animal {
         @Override
         void breathe() {  // Error: cannot override final method
             System.out.println("Breathing underwater");
         }
     }

     // Correct - create a different method
     class Fish extends Animal {
         // breathe() is inherited and cannot be overridden
         void breatheUnderwater() {  // New method instead
             System.out.println("Breathing underwater");
         }
     }
     ```

5. ❌ **Confusing Overriding with Hiding (Static Methods)**: Trying to override static methods
   - Why: Static methods belong to the class, not instances. You cannot override static methods - you can only hide them (which works differently).
   - Fix: Don't use @Override with static methods. If you need polymorphic behavior, use instance methods.
   - Example:
     ```java
     // Wrong understanding - this hides, doesn't override
     class Parent {
         static void staticMethod() {
             System.out.println("Parent static");
         }
     }

     class Child extends Parent {
         @Override  // Error: method does not override
         static void staticMethod() {  // This hides, not overrides
             System.out.println("Child static");
         }
     }

     // Correct - remove @Override for static (but this is hiding, not overriding)
     class Child extends Parent {
         static void staticMethod() {  // Hides parent's static method
             System.out.println("Child static");
         }
     }

     // Better - use instance methods for true overriding
     class Parent {
         void instanceMethod() {  // Instance method
             System.out.println("Parent");
         }
     }

     class Child extends Parent {
         @Override
         void instanceMethod() {  // True override
             System.out.println("Child");
         }
     }
     ```

**🎯 Challenge:**
Create:
1. `Animal` class with makeSound() and move() methods
2. `Dog`, `Cat`, `Bird` classes that override both methods
3. Each animal makes different sound and moves differently
4. Create array of Animals, loop through calling overridden methods
5. Verify polymorphism works correctly

**📋 Best Practices:**

✅ **Use @Override Annotation**
- **Why:** Catches errors at compile-time if method doesn't actually override parent
- **How:** Add `@Override` annotation above any method that overrides a parent method
- **Example:**
```java
class Animal {
    void makeSound() { }
}

class Dog extends Animal {
    @Override  // ✅ Compiler verifies this actually overrides
    void makeSound() {
        System.out.println("Woof");
    }

    @Override
    void makeSond() {  // ❌ Compiler error - typo detected!
        // Parent has makeSound not makeSond
    }
}
```

✅ **Keep Override Signatures Identical**
- **Why:** Different signatures create overloading, not overriding
- **How:** Match exact method name, parameter types, and order
- **Example:**
```java
class Shape {
    double getArea() { return 0; }
}

// ❌ Bad - This is overloading, not overriding
class Circle extends Shape {
    double getArea(double radius) { return Math.PI * radius * radius; }
}

// ✅ Good - Exact match = overriding
class Circle extends Shape {
    @Override
    double getArea() { return Math.PI * radius * radius; }
}
```

✅ **Override for Specialized Behavior, Not Just to Change**
- **Why:** Overriding should provide meaningful specialized implementation
- **How:** Override when child has fundamentally different behavior for same concept
- **Example:**
```java
// ✅ Good - Each shape calculates area differently
class Shape {
    double getArea() { return 0; }
}

class Circle extends Shape {
    @Override
    double getArea() { return Math.PI * radius * radius; }  // Circle-specific formula
}

class Rectangle extends Shape {
    @Override
    double getArea() { return width * height; }  // Rectangle-specific formula
}
```

✅ **Don't Override final Methods**
- **Why:** final methods are locked and cannot be overridden
- **How:** Check if parent method is final before attempting to override
- **Example:**
```java
class Parent {
    final void lockedMethod() { }  // Cannot override
    void flexibleMethod() { }      // Can override
}

class Child extends Parent {
    // @Override
    // void lockedMethod() { }  // ❌ Compiler error - final method

    @Override
    void flexibleMethod() { }  // ✅ OK - not final
}
```

✅ **Maintain Behavioral Consistency When Overriding**
- **Why:** Child's override should honor parent's contract (Liskov Substitution Principle)
- **How:** Don't completely change expected behavior; specialize it
- **Example:**
```java
// ❌ Bad - Violates parent contract
class BankAccount {
    void deposit(double amount) {
        balance += amount;  // Increases balance
    }
}

class BrokenAccount extends BankAccount {
    @Override
    void deposit(double amount) {
        balance -= amount;  // ❌ Decreases? Violates expectation!
    }
}

// ✅ Good - Specializes but maintains contract
class SavingsAccount extends BankAccount {
    @Override
    void deposit(double amount) {
        super.deposit(amount);  // Still increases balance
        balance += amount * 0.01;  // Adds 1% bonus
    }
}
```

---

#### Exercise 5: Constructor Chaining (20 minutes)

**What you'll learn:** How constructors work in inheritance hierarchies

**Create classes: `Person`, `Employee`, `Manager`**

**Concept:** **Constructor Chaining** is the process where child constructor calls parent constructor, which may call grandparent constructor, and so on. This ensures all parts of the object are properly initialized.

```
Constructor Call Flow:
Manager() → Employee() → Person()

Execution Flow (reverse order):
Person() executes first
↓
Employee() executes second
↓
Manager() executes last
```

**Important Rules:**
1. Parent constructor ALWAYS executes before child constructor
2. If you don't call `super()`, Java automatically adds `super()` (no-arg)
3. `super()` must be first statement in constructor
4. Can pass arguments to parent constructor: `super(arg1, arg2)`

**Step-by-Step:**

```java
// GRANDPARENT CLASS (Level 1)
class Person {
    String name;
    int age;

    // No-arg constructor
    Person() {
        System.out.println("1. Person() no-arg constructor called");
        this.name = "Unknown";
        this.age = 0;
    }

    // Parameterized constructor
    Person(String name, int age) {
        System.out.println("1. Person(name, age) constructor called");
        this.name = name;
        this.age = age;
    }

    void displayPersonInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

// PARENT CLASS (Level 2)
class Employee extends Person {
    String employeeId;
    double salary;

    // No-arg constructor
    Employee() {
        super();  // Calls Person() - optional, Java adds automatically
        System.out.println("2. Employee() no-arg constructor called");
        this.employeeId = "EMP000";
        this.salary = 0.0;
    }

    // Parameterized constructor
    Employee(String name, int age, String employeeId, double salary) {
        super(name, age);  // MUST call parent constructor first
        System.out.println("2. Employee(name, age, id, salary) constructor called");
        this.employeeId = employeeId;
        this.salary = salary;
    }

    void displayEmployeeInfo() {
        displayPersonInfo();
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Salary: $" + salary);
    }
}

// CHILD CLASS (Level 3)
class Manager extends Employee {
    String department;
    int teamSize;

    // No-arg constructor
    Manager() {
        super();  // Calls Employee(), which calls Person()
        System.out.println("3. Manager() no-arg constructor called");
        this.department = "General";
        this.teamSize = 0;
    }

    // Parameterized constructor
    Manager(String name, int age, String employeeId, double salary,
            String department, int teamSize) {
        super(name, age, employeeId, salary);  // Calls Employee constructor
        System.out.println("3. Manager(all params) constructor called");
        this.department = department;
        this.teamSize = teamSize;
    }

    void displayManagerInfo() {
        displayEmployeeInfo();
        System.out.println("Department: " + department);
        System.out.println("Team Size: " + teamSize);
    }
}

public class ConstructorChainingDemo {
    public static void main(String[] args) {
        System.out.println("===== CONSTRUCTOR CHAINING =====\n");

        // Test 1: No-arg constructor chain
        System.out.println("--- Creating Manager with no-arg constructor ---");
        Manager manager1 = new Manager();
        System.out.println("\nManager1 Info:");
        manager1.displayManagerInfo();

        // Test 2: Parameterized constructor chain
        System.out.println("\n\n--- Creating Manager with parameterized constructor ---");
        Manager manager2 = new Manager(
            "Sarah Johnson",      // name (Person)
            35,                   // age (Person)
            "EMP001",            // employeeId (Employee)
            95000.0,             // salary (Employee)
            "Engineering",       // department (Manager)
            10                   // teamSize (Manager)
        );
        System.out.println("\nManager2 Info:");
        manager2.displayManagerInfo();

        // Test 3: Show the chain with Employee
        System.out.println("\n\n--- Creating Employee (not Manager) ---");
        Employee emp = new Employee("Bob Smith", 28, "EMP002", 65000.0);
        System.out.println("\nEmployee Info:");
        emp.displayEmployeeInfo();

        System.out.println("\n\n================================");

        // Summary of constructor chaining
        System.out.println("\n📝 Constructor Chaining Summary:");
        System.out.println("══════════════════════════════════");
        System.out.println("When creating Manager:");
        System.out.println("  1. Manager() called");
        System.out.println("  2. super() calls Employee()");
        System.out.println("  3. super() calls Person()");
        System.out.println("  4. Person() executes");
        System.out.println("  5. Employee() executes");
        System.out.println("  6. Manager() executes");
        System.out.println("\nOrder: Person → Employee → Manager");
    }
}
```

**Expected Output:**
```
===== CONSTRUCTOR CHAINING =====

--- Creating Manager with no-arg constructor ---
1. Person() no-arg constructor called
2. Employee() no-arg constructor called
3. Manager() no-arg constructor called

Manager1 Info:
Name: Unknown
Age: 0
Employee ID: EMP000
Salary: $0.0
Department: General
Team Size: 0


--- Creating Manager with parameterized constructor ---
1. Person(name, age) constructor called
2. Employee(name, age, id, salary) constructor called
3. Manager(all params) constructor called

Manager2 Info:
Name: Sarah Johnson
Age: 35
Employee ID: EMP001
Salary: $95000.0
Department: Engineering
Team Size: 10


--- Creating Employee (not Manager) ---
1. Person(name, age) constructor called
2. Employee(name, age, id, salary) constructor called

Employee Info:
Name: Bob Smith
Age: 28
Employee ID: EMP002
Salary: $65000.0


================================

📝 Constructor Chaining Summary:
══════════════════════════════════
When creating Manager:
  1. Manager() called
  2. super() calls Employee()
  3. super() calls Person()
  4. Person() executes
  5. Employee() executes
  6. Manager() executes

Order: Person → Employee → Manager
```

**💡 Constructor Chaining Flow:**

```
Code: Manager manager = new Manager("Sarah", 35, ...);

Call Stack (order called):
    Manager constructor
         ↓ super()
    Employee constructor
         ↓ super()
    Person constructor

Execution Order (reverse):
    Person constructor executes     ← 1st
         ↓ returns
    Employee constructor executes   ← 2nd
         ↓ returns
    Manager constructor executes    ← 3rd

Result: Fully initialized Manager object
```

**Visual Hierarchy:**
```
┌──────────────┐
│   Person     │ ← Initialized first
└──────┬───────┘
       │ extends
┌──────▼───────┐
│  Employee    │ ← Initialized second
└──────┬───────┘
       │ extends
┌──────▼───────┐
│   Manager    │ ← Initialized last
└──────────────┘
```

**✅ Success Criteria:**
- [ ] Understand constructor chaining sequence
- [ ] Know parent constructor executes before child
- [ ] Can trace constructor execution order
- [ ] Properly use super() to call parent constructor
- [ ] Understand why constructor chaining is important
- [ ] Successfully create multilevel inheritance hierarchy

**Common Mistakes:**

1. ❌ **Forgetting super() When Parent Has Only Parameterized Constructor**: Not calling super() explicitly when parent class doesn't have a default constructor
   - Why: If parent has no no-arg constructor, Java cannot automatically insert `super()`. You must explicitly call `super(params)`.
   - Fix: Always call `super(params)` with required arguments when parent doesn't have a default constructor.
   - Example:
     ```java
     // Wrong - missing super()
     class Person {
         String name;
         Person(String name) {  // No default constructor
             this.name = name;
         }
     }

     class Employee extends Person {
         String id;
         Employee(String id) {
             // Error: implicit super() cannot be called - no default constructor
             this.id = id;
         }
     }

     // Correct - explicit super() call
     class Employee extends Person {
         String id;
         Employee(String name, String id) {
             super(name);  // Must call parameterized constructor
             this.id = id;
         }
     }
     ```

2. ❌ **Putting super() Anywhere Other Than First Line**: Placing code before the super() call
   - Why: Parent must be fully initialized before child can use inherited members or initialize its own fields.
   - Fix: Always make `super()` the absolute first statement in the constructor.
   - Example:
     ```java
     // Wrong - code before super()
     class Employee extends Person {
         Employee(String name, String id) {
             System.out.println("Creating employee");  // Error!
             super(name);  // super() must be first
         }
     }

     // Correct - super() first
     class Employee extends Person {
         Employee(String name, String id) {
             super(name);  // First statement
             System.out.println("Creating employee");
         }
     }
     ```

3. ❌ **Not Understanding Constructor Execution Order**: Expecting child constructor to execute before parent
   - Why: Students see child constructor called first in their code and think it executes first, but parent always executes first due to super() call.
   - Fix: Understand the flow: Child constructor called → super() jumps to parent → parent executes → returns to child → child continues.
   - Example:
     ```java
     class Person {
         Person() {
             System.out.println("1. Person constructor");  // Executes FIRST
         }
     }

     class Employee extends Person {
         Employee() {
             super();  // Jumps to parent constructor
             System.out.println("2. Employee constructor");  // Executes SECOND
         }
     }

     // When you call: new Employee()
     // Output:
     // 1. Person constructor
     // 2. Employee constructor
     ```

4. ❌ **Trying to Access Child Fields in Parent Constructor**: Using child's fields before they're initialized
   - Why: Parent constructor runs before child fields are initialized. Accessing them in parent constructor will see uninitialized values.
   - Fix: Don't access child-specific fields in parent constructor. Parent should only work with its own data.
   - Example:
     ```java
     // Wrong - accessing child field from parent
     class Person {
         Person() {
             // Can't access Employee's field here - it doesn't exist yet!
         }
     }

     class Employee extends Person {
         String employeeId;
         Employee(String id) {
             super();  // Parent runs first, employeeId not initialized yet
             this.employeeId = id;  // Now it's initialized
         }
     }
     ```

5. ❌ **Creating Circular Constructor Dependencies**: Child constructor calls super(), which tries to call child, creating infinite loop
   - Why: This is usually a design error. Constructors should form a clear parent→child initialization chain, not a cycle.
   - Fix: Design proper constructor hierarchy. Parent should not depend on child's constructor.
   - Example:
     ```java
     // Wrong - circular dependency (conceptual error)
     class Parent {
         Parent() {
             // Some logic that somehow depends on child being constructed first
         }
     }

     class Child extends Parent {
         Child() {
             super();  // Calls Parent constructor
             // But Parent constructor expects Child to be ready - CIRCULAR!
         }
     }

     // Correct - proper hierarchy
     class Parent {
         Parent() {
             // Initialize parent-specific data only
         }
     }

     class Child extends Parent {
         Child() {
             super();  // Parent initializes first (independent of child)
             // Then child initializes its own data
         }
     }
     ```

**🎯 Challenge:**
Create a 4-level hierarchy:
1. `LivingBeing` (isAlive)
2. `Animal` extends LivingBeing (name, age)
3. `Mammal` extends Animal (furColor)
4. `Dog` extends Mammal (breed)
5. Create constructors at each level with chaining
6. Print message in each constructor to see execution order
7. Create a Dog object and verify all constructors execute

**📋 Best Practices:**

✅ **Chain Constructors from Child to Parent**
- **Why:** Ensures all levels of the hierarchy are properly initialized
- **How:** Call `super()` as first statement in every child constructor
- **Example:**
```java
class Person {
    String name;
    Person(String name) { this.name = name; }
}

class Employee extends Person {
    String id;
    Employee(String name, String id) {
        super(name);  // ✅ Initialize parent first
        this.id = id;
    }
}

class Manager extends Employee {
    String department;
    Manager(String name, String id, String dept) {
        super(name, id);  // ✅ Chain continues
        this.department = dept;
    }
}
```

✅ **Initialize Parent Data Through super(), Not Direct Assignment**
- **Why:** Parent constructor may have validation or initialization logic
- **How:** Pass data to parent via super() instead of setting parent fields directly
- **Example:**
```java
// ❌ Bad - Bypasses parent constructor logic
class Manager extends Employee {
    Manager(String name, String id) {
        this.name = name;  // Direct assignment to parent field
        this.employeeId = id;
    }
}

// ✅ Good - Uses parent constructor
class Manager extends Employee {
    Manager(String name, String id) {
        super(name, id);  // Parent handles its own initialization
    }
}
```

✅ **Keep Constructor Chains Short and Logical**
- **Why:** Deep hierarchies become hard to maintain and understand
- **How:** Limit inheritance depth to 3-4 levels; prefer composition for deeper structures
- **Example:**
```java
// ✅ Good - Reasonable depth
LivingBeing → Animal → Dog  // 3 levels

// ❌ Bad - Too deep
Entity → LivingThing → Creature → Animal → Mammal
  → Carnivore → Canine → WildDog → Wolf  // 9 levels!
```

✅ **Provide Default and Parameterized Constructors at Each Level**
- **Why:** Gives flexibility in object creation; supports various initialization scenarios
- **How:** Create both no-arg and parameterized constructors, chain appropriately
- **Example:**
```java
class Employee {
    String name;
    double salary;

    // Default constructor
    Employee() {
        this("Unknown", 0.0);
    }

    // Parameterized constructor
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
}

class Manager extends Employee {
    String department;

    Manager() {
        super();  // ✅ Calls parent default
        this.department = "General";
    }

    Manager(String name, double salary, String dept) {
        super(name, salary);  // ✅ Calls parent parameterized
        this.department = dept;
    }
}
```

✅ **Validate Data at the Appropriate Level**
- **Why:** Each level should validate its own concerns
- **How:** Validate parent-level data in parent constructor, child-level in child
- **Example:**
```java
class Employee {
    protected double salary;

    Employee(double salary) {
        if (salary < 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
        this.salary = salary;  // ✅ Parent validates parent data
    }
}

class Manager extends Employee {
    private int teamSize;

    Manager(double salary, int teamSize) {
        super(salary);  // Parent validates salary
        if (teamSize < 0) {  // ✅ Child validates child data
            throw new IllegalArgumentException("Team size cannot be negative");
        }
        this.teamSize = teamSize;
    }
}
```

---

#### Exercise 6: Inheritance Hierarchy - Shapes (30 minutes)

**What you'll learn:** Building a complete inheritance hierarchy with multiple child classes

**Create classes: `Shape`, `Circle`, `Rectangle`, `Triangle`, `Square`**

**Concept:** A well-designed inheritance hierarchy allows you to share common code in the parent while giving each child its own specific behavior. This is a practical application of all inheritance concepts: extends, super, overriding, and polymorphism.

**Real-World Application:** Shape hierarchies are used in graphics programs, game engines, CAD software, and drawing applications.

**Design:**
```
        Shape (abstract concept)
         ↓
    ┌────┴────┬────────┬────────┐
    ↓         ↓        ↓        ↓
  Circle  Rectangle Triangle Square
```

**Step-by-Step:**

```java
import java.util.ArrayList;

// PARENT CLASS - Shape
class Shape {
    // Common properties
    String name;
    String color;

    // Constructor
    Shape(String name, String color) {
        this.name = name;
        this.color = color;
    }

    // Methods to be overridden
    double getArea() {
        return 0.0;
    }

    double getPerimeter() {
        return 0.0;
    }

    // Common method NOT overridden
    void displayInfo() {
        System.out.println("\n┌─────────────────────────┐");
        System.out.println("│  " + name + " Information");
        System.out.println("└─────────────────────────┘");
        System.out.println("Shape: " + name);
        System.out.println("Color: " + color);
        System.out.printf("Area: %.2f\n", getArea());
        System.out.printf("Perimeter: %.2f\n", getPerimeter());
    }

    // Calculate cost based on area (common formula)
    double calculateCost(double pricePerUnit) {
        return getArea() * pricePerUnit;
    }
}

// CHILD CLASS 1 - Circle
class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super("Circle", color);
        this.radius = radius;
    }

    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }

    @Override
    double getPerimeter() {
        return 2 * Math.PI * radius;
    }

    double getDiameter() {
        return 2 * radius;
    }
}

// CHILD CLASS 2 - Rectangle
class Rectangle extends Shape {
    double length;
    double width;

    Rectangle(String color, double length, double width) {
        super("Rectangle", color);
        this.length = length;
        this.width = width;
    }

    @Override
    double getArea() {
        return length * width;
    }

    @Override
    double getPerimeter() {
        return 2 * (length + width);
    }

    boolean isSquare() {
        return length == width;
    }
}

// CHILD CLASS 3 - Triangle
class Triangle extends Shape {
    double side1, side2, side3;
    double base, height;

    Triangle(String color, double base, double height,
             double side1, double side2, double side3) {
        super("Triangle", color);
        this.base = base;
        this.height = height;
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    @Override
    double getArea() {
        return 0.5 * base * height;
    }

    @Override
    double getPerimeter() {
        return side1 + side2 + side3;
    }

    boolean isEquilateral() {
        return side1 == side2 && side2 == side3;
    }
}

// CHILD CLASS 4 - Square (special type of Rectangle)
class Square extends Rectangle {

    Square(String color, double side) {
        super(color, side, side);  // Rectangle with equal sides
        this.name = "Square";  // Override name from Rectangle
    }

    double getSide() {
        return length;  // or width, they're equal
    }

    double getDiagonal() {
        return length * Math.sqrt(2);
    }
}

public class ShapeHierarchy {
    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════╗");
        System.out.println("║   SHAPE HIERARCHY SYSTEM         ║");
        System.out.println("╚═══════════════════════════════════╝");

        // Create various shapes
        Circle circle = new Circle("Red", 5.0);
        Rectangle rectangle = new Rectangle("Blue", 6.0, 4.0);
        Triangle triangle = new Triangle("Green", 6.0, 4.0, 5.0, 5.0, 6.0);
        Square square = new Square("Yellow", 5.0);

        // Display each shape
        circle.displayInfo();
        System.out.println("Diameter: " + circle.getDiameter());

        rectangle.displayInfo();
        System.out.println("Is Square? " + rectangle.isSquare());

        triangle.displayInfo();
        System.out.println("Is Equilateral? " + triangle.isEquilateral());

        square.displayInfo();
        System.out.printf("Diagonal: %.2f\n", square.getDiagonal());

        // Polymorphism - store all shapes in array
        System.out.println("\n\n╔═══════════════════════════════════╗");
        System.out.println("║   POLYMORPHISM DEMONSTRATION     ║");
        System.out.println("╚═══════════════════════════════════╝");

        Shape[] shapes = {circle, rectangle, triangle, square};

        double totalArea = 0;
        double totalPerimeter = 0;

        for (Shape shape : shapes) {
            System.out.println(shape.name + ": Area = " +
                             String.format("%.2f", shape.getArea()) +
                             ", Perimeter = " +
                             String.format("%.2f", shape.getPerimeter()));

            totalArea += shape.getArea();
            totalPerimeter += shape.getPerimeter();
        }

        System.out.println("\n--- Totals ---");
        System.out.printf("Total Area: %.2f\n", totalArea);
        System.out.printf("Total Perimeter: %.2f\n", totalPerimeter);

        // Calculate costs
        System.out.println("\n\n╔═══════════════════════════════════╗");
        System.out.println("║   COST CALCULATION               ║");
        System.out.println("╚═══════════════════════════════════╝");

        double pricePerSquareUnit = 10.0;
        System.out.println("Price per square unit: $" + pricePerSquareUnit);
        System.out.println();

        double totalCost = 0;
        for (Shape shape : shapes) {
            double cost = shape.calculateCost(pricePerSquareUnit);
            System.out.printf("%s cost: $%.2f\n", shape.name, cost);
            totalCost += cost;
        }

        System.out.printf("\nTotal Cost: $%.2f\n", totalCost);

        // Find largest shape
        System.out.println("\n\n╔═══════════════════════════════════╗");
        System.out.println("║   FIND LARGEST SHAPE             ║");
        System.out.println("╚═══════════════════════════════════╝");

        Shape largest = shapes[0];
        for (Shape shape : shapes) {
            if (shape.getArea() > largest.getArea()) {
                largest = shape;
            }
        }

        System.out.println("Largest shape: " + largest.name);
        System.out.printf("Area: %.2f\n", largest.getArea());

        System.out.println("\n═══════════════════════════════════");
    }
}
```

**Expected Output:**
```
╔═══════════════════════════════════╗
║   SHAPE HIERARCHY SYSTEM         ║
╚═══════════════════════════════════╝

┌─────────────────────────┐
│  Circle Information
└─────────────────────────┘
Shape: Circle
Color: Red
Area: 78.54
Perimeter: 31.42
Diameter: 10.0

┌─────────────────────────┐
│  Rectangle Information
└─────────────────────────┘
Shape: Rectangle
Color: Blue
Area: 24.00
Perimeter: 20.00
Is Square? false

┌─────────────────────────┐
│  Triangle Information
└─────────────────────────┘
Shape: Triangle
Color: Green
Area: 12.00
Perimeter: 16.00
Is Equilateral? false

┌─────────────────────────┐
│  Square Information
└─────────────────────────┘
Shape: Square
Color: Yellow
Area: 25.00
Perimeter: 20.00
Diagonal: 7.07


╔═══════════════════════════════════╗
║   POLYMORPHISM DEMONSTRATION     ║
╚═══════════════════════════════════╝
Circle: Area = 78.54, Perimeter = 31.42
Rectangle: Area = 24.00, Perimeter = 20.00
Triangle: Area = 12.00, Perimeter = 16.00
Square: Area = 25.00, Perimeter = 20.00

--- Totals ---
Total Area: 139.54
Total Perimeter: 87.42


╔═══════════════════════════════════╗
║   COST CALCULATION               ║
╚═══════════════════════════════════╝
Price per square unit: $10.0

Circle cost: $785.40
Rectangle cost: $240.00
Triangle cost: $120.00
Square cost: $250.00

Total Cost: $1395.40


╔═══════════════════════════════════╗
║   FIND LARGEST SHAPE             ║
╚═══════════════════════════════════╝
Largest shape: Circle
Area: 78.54

═══════════════════════════════════
```

**💡 What This Demonstrates:**

| Concept | How It's Used |
|---------|---------------|
| **Inheritance** | All shapes extend Shape class |
| **super keyword** | Child constructors call super() |
| **Method Overriding** | Each shape overrides getArea() and getPerimeter() |
| **Polymorphism** | Shape array holds all different types |
| **Code Reuse** | displayInfo() and calculateCost() shared by all |
| **Specialization** | Each child adds unique methods (getDiameter, isSquare, etc.) |

**✅ Success Criteria:**
- [ ] Create complete inheritance hierarchy
- [ ] All shapes properly extend Shape class
- [ ] Each shape correctly overrides area and perimeter methods
- [ ] Polymorphism works (Shape array holds all types)
- [ ] Code demonstrates proper use of super
- [ ] Each child class adds its own unique methods
- [ ] Program produces correct calculations
- [ ] Professional output formatting

**Common Mistakes:**

1. ❌ **Duplicating Code Across Child Classes**: Repeating the same methods (like displayInfo) in each child class
   - Why: This violates DRY (Don't Repeat Yourself) and defeats the purpose of inheritance. Changes must be made in multiple places.
   - Fix: Put common behavior in the parent class. All children inherit and reuse it automatically.
   - Example:
     ```java
     // Wrong - duplicating displayInfo in every child
     class Circle extends Shape {
         void displayInfo() {
             System.out.println("Color: " + color);  // Duplicated
         }
     }
     class Rectangle extends Shape {
         void displayInfo() {
             System.out.println("Color: " + color);  // Duplicated again!
         }
     }

     // Correct - define once in parent
     class Shape {
         void displayInfo() {
             System.out.println("Color: " + color);  // Defined once
         }
     }
     class Circle extends Shape {
         // Inherits displayInfo automatically
     }
     class Rectangle extends Shape {
         // Inherits displayInfo automatically
     }
     ```

2. ❌ **Using Incorrect Geometry Formulas**: Making math errors in area/perimeter calculations
   - Why: Students mix up formulas or forget mathematical constants, leading to wrong results.
   - Fix: Double-check geometry formulas. Use Math.PI for circles, correct formulas for each shape.
   - Example:
     ```java
     // Wrong - incorrect formulas
     class Circle extends Shape {
         @Override
         double getArea() {
             return 2 * Math.PI * radius;  // Wrong! This is circumference
         }
     }

     class Triangle extends Shape {
         @Override
         double getArea() {
             return base * height;  // Wrong! Missing 0.5
         }
     }

     // Correct - right formulas
     class Circle extends Shape {
         @Override
         double getArea() {
             return Math.PI * radius * radius;  // π r²
         }
     }

     class Triangle extends Shape {
         @Override
         double getArea() {
             return 0.5 * base * height;  // ½ × base × height
         }
     }
     ```

3. ❌ **Not Testing Polymorphism**: Only creating objects with specific types, not using parent reference
   - Why: Students test each shape individually but miss testing polymorphism, which is a key benefit of inheritance.
   - Fix: Create an array of the parent type (Shape[]) and store different child objects to demonstrate polymorphism.
   - Example:
     ```java
     // Wrong - no polymorphism demonstrated
     Circle circle = new Circle("Red", 5);
     Rectangle rect = new Rectangle("Blue", 4, 6);
     // Just testing individually

     // Correct - demonstrate polymorphism
     Shape[] shapes = {
         new Circle("Red", 5),
         new Rectangle("Blue", 4, 6),
         new Triangle("Green", 3, 4, 3, 4, 5)
     };

     // Polymorphism: Same code works for all shapes
     for (Shape shape : shapes) {
         System.out.println(shape.getArea());  // Calls correct version for each
     }
     ```

**🎯 Challenges:**
1. Add a `Pentagon` class (5 sides)
2. Add a method to check which shapes fit inside a bounding box
3. Implement a method to scale all shapes by a factor
4. Add a `getType()` method that returns "2D Shape"
5. Create a method to compare two shapes by area

**📋 Best Practices:**

✅ **Design Parent Class with Common Behavior**
- **Why:** Shared methods belong in parent; avoids duplication across children
- **How:** Identify operations all children need; implement once in parent
- **Example:**
```java
// ✅ Good - Common behavior in parent
class Shape {
    protected String color;

    void displayInfo() {  // All shapes can use this
        System.out.println("Color: " + color);
    }

    double calculateCost(double pricePerUnit) {  // Shared logic
        return getArea() * pricePerUnit;
    }

    abstract double getArea();  // Each child implements differently
}
```

✅ **Let Each Child Provide Specialized Implementation**
- **Why:** Children add specifics while inheriting common structure
- **How:** Override methods that need shape-specific logic
- **Example:**
```java
class Shape {
    abstract double getArea();  // Different for each shape
}

class Circle extends Shape {
    @Override
    double getArea() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    @Override
    double getArea() { return width * height; }
}
```

✅ **Use Polymorphism to Process Mixed Collections**
- **Why:** Allows treating different types uniformly while maintaining specific behavior
- **How:** Store children in parent-type arrays/lists; call overridden methods
- **Example:**
```java
// ✅ Polymorphism in action
Shape[] shapes = {
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5)
};

for (Shape shape : shapes) {
    System.out.println("Area: " + shape.getArea());  // Calls correct version
}
```

✅ **Organize Hierarchy by True IS-A Relationships**
- **Why:** Inheritance should represent genuine type relationships
- **How:** Verify each child truly "is a" type of parent
- **Example:**
```java
// ✅ Good - Clear IS-A relationships
class Shape { }
class Circle extends Shape { }  // Circle IS-A Shape
class Rectangle extends Shape { }  // Rectangle IS-A Shape

// ❌ Bad - Wrong relationship
class Circle extends Color { }  // Circle is NOT-A Color (has-a relationship)
```

✅ **Keep Hierarchy Shallow and Focused**
- **Why:** Deep hierarchies become fragile and hard to maintain
- **How:** Limit to 2-3 levels; use composition for complex structures
- **Example:**
```java
// ✅ Good - Shallow hierarchy
Shape → Circle, Rectangle, Triangle  // 2 levels

// ❌ Bad - Too deep
Shape → Polygon → Quadrilateral → Parallelogram
  → Rectangle → Square  // 6 levels!
```

---

#### Exercise 7: Real-World Application - Employee Hierarchy (30 minutes)

**What you'll learn:** Building a complete real-world inheritance system

**Create classes: `Employee`, `Developer`, `Manager`, `Intern`**

**Concept:** This exercise demonstrates how inheritance is used in real business applications. We'll create an employee management system where different employee types share common properties but have their own specific attributes and behaviors.

**Real-World Application:** HR systems, payroll software, and employee management systems use inheritance to handle different employee types efficiently.

**Business Requirements:**
- All employees have: name, ID, base salary
- Developers have: programming language skills, project bonus
- Managers have: department, team size, management bonus
- Interns have: school, stipend (instead of salary), mentor name

**Step-by-Step:**

```java
import java.util.ArrayList;

// PARENT CLASS - Base Employee
class Employee {
    // Common properties
    protected String name;
    protected String employeeId;
    protected double baseSalary;
    protected String email;

    // Constructor
    Employee(String name, String employeeId, double baseSalary) {
        this.name = name;
        this.employeeId = employeeId;
        this.baseSalary = baseSalary;
        this.email = generateEmail(name);
    }

    // Common method - generate email
    protected String generateEmail(String name) {
        return name.toLowerCase().replace(" ", ".") + "@company.com";
    }

    // Method to be overridden - calculate total pay
    double calculateTotalPay() {
        return baseSalary;
    }

    // Method to be overridden - get role
    String getRole() {
        return "Employee";
    }

    // Common method - display basic info
    void displayBasicInfo() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + employeeId);
        System.out.println("Email: " + email);
        System.out.println("Role: " + getRole());
    }

    // Full display method
    void displayFullInfo() {
        System.out.println("\n╔════════════════════════════════════╗");
        System.out.println("║     EMPLOYEE INFORMATION          ║");
        System.out.println("╚════════════════════════════════════╝");
        displayBasicInfo();
        System.out.printf("Base Salary: $%.2f\n", baseSalary);
        System.out.printf("Total Pay: $%.2f\n", calculateTotalPay());
        System.out.println("════════════════════════════════════");
    }
}

// CHILD CLASS 1 - Developer
class Developer extends Employee {
    private String primaryLanguage;
    private String[] skills;
    private int projectsCompleted;
    private double projectBonus;

    Developer(String name, String employeeId, double baseSalary,
              String primaryLanguage, String[] skills) {
        super(name, employeeId, baseSalary);
        this.primaryLanguage = primaryLanguage;
        this.skills = skills;
        this.projectsCompleted = 0;
        this.projectBonus = 0;
    }

    @Override
    String getRole() {
        return "Software Developer (" + primaryLanguage + ")";
    }

    @Override
    double calculateTotalPay() {
        return baseSalary + projectBonus;
    }

    void completeProject(int difficulty) {
        projectsCompleted++;
        projectBonus += (difficulty * 1000);  // $1000 per difficulty point
        System.out.println("✅ Project completed! Bonus: $" + (difficulty * 1000));
    }

    @Override
    void displayFullInfo() {
        System.out.println("\n╔════════════════════════════════════╗");
        System.out.println("║     DEVELOPER INFORMATION         ║");
        System.out.println("╚════════════════════════════════════╝");
        displayBasicInfo();
        System.out.printf("Base Salary: $%.2f\n", baseSalary);
        System.out.println("Primary Language: " + primaryLanguage);
        System.out.print("Skills: ");
        for (int i = 0; i < skills.length; i++) {
            System.out.print(skills[i]);
            if (i < skills.length - 1) System.out.print(", ");
        }
        System.out.println();
        System.out.println("Projects Completed: " + projectsCompleted);
        System.out.printf("Project Bonus: $%.2f\n", projectBonus);
        System.out.printf("Total Pay: $%.2f\n", calculateTotalPay());
        System.out.println("════════════════════════════════════");
    }
}

// CHILD CLASS 2 - Manager
class Manager extends Employee {
    private String department;
    private int teamSize;
    private double managementBonus;
    private ArrayList<String> teamMembers;

    Manager(String name, String employeeId, double baseSalary, String department) {
        super(name, employeeId, baseSalary);
        this.department = department;
        this.teamSize = 0;
        this.managementBonus = 5000;  // Base management bonus
        this.teamMembers = new ArrayList<>();
    }

    @Override
    String getRole() {
        return "Manager - " + department;
    }

    @Override
    double calculateTotalPay() {
        // Management bonus increases with team size
        double teamBonus = teamSize * 500;  // $500 per team member
        return baseSalary + managementBonus + teamBonus;
    }

    void addTeamMember(String memberName) {
        teamMembers.add(memberName);
        teamSize++;
        System.out.println("✅ Added " + memberName + " to team");
    }

    void conductReview() {
        System.out.println("📊 Conducting performance review for " + teamSize + " team members");
    }

    @Override
    void displayFullInfo() {
        System.out.println("\n╔════════════════════════════════════╗");
        System.out.println("║     MANAGER INFORMATION           ║");
        System.out.println("╚════════════════════════════════════╝");
        displayBasicInfo();
        System.out.printf("Base Salary: $%.2f\n", baseSalary);
        System.out.println("Department: " + department);
        System.out.println("Team Size: " + teamSize);
        if (teamSize > 0) {
            System.out.println("Team Members:");
            for (String member : teamMembers) {
                System.out.println("  - " + member);
            }
        }
        System.out.printf("Management Bonus: $%.2f\n", managementBonus);
        System.out.printf("Team Bonus: $%.2f\n", teamSize * 500.0);
        System.out.printf("Total Pay: $%.2f\n", calculateTotalPay());
        System.out.println("════════════════════════════════════");
    }
}

// CHILD CLASS 3 - Intern
class Intern extends Employee {
    private String school;
    private String major;
    private String mentor;
    private int weekNumber;

    Intern(String name, String employeeId, String school, String major) {
        super(name, employeeId, 2000);  // Fixed stipend
        this.school = school;
        this.major = major;
        this.mentor = "Not assigned";
        this.weekNumber = 1;
    }

    @Override
    String getRole() {
        return "Intern (" + major + ")";
    }

    @Override
    double calculateTotalPay() {
        return baseSalary;  // Fixed stipend, no bonuses
    }

    void assignMentor(String mentorName) {
        this.mentor = mentorName;
        System.out.println("✅ Mentor assigned: " + mentorName);
    }

    void completeWeek() {
        weekNumber++;
        System.out.println("📚 Week " + weekNumber + " completed!");
    }

    @Override
    void displayFullInfo() {
        System.out.println("\n╔════════════════════════════════════╗");
        System.out.println("║     INTERN INFORMATION            ║");
        System.out.println("╚════════════════════════════════════╝");
        displayBasicInfo();
        System.out.println("School: " + school);
        System.out.println("Major: " + major);
        System.out.println("Mentor: " + mentor);
        System.out.println("Weeks Completed: " + weekNumber);
        System.out.printf("Monthly Stipend: $%.2f\n", baseSalary);
        System.out.printf("Total Pay: $%.2f\n", calculateTotalPay());
        System.out.println("════════════════════════════════════");
    }
}

public class EmployeeHierarchy {
    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════╗");
        System.out.println("║   EMPLOYEE MANAGEMENT SYSTEM         ║");
        System.out.println("╚═══════════════════════════════════════╝\n");

        // Create different employee types
        Developer dev1 = new Developer(
            "Alice Johnson",
            "DEV001",
            85000,
            "Java",
            new String[]{"Java", "Spring", "SQL", "REST API"}
        );

        Manager manager1 = new Manager(
            "Bob Smith",
            "MGR001",
            95000,
            "Engineering"
        );

        Intern intern1 = new Intern(
            "Charlie Brown",
            "INT001",
            "MIT",
            "Computer Science"
        );

        // Demonstrate Developer actions
        System.out.println("=== DEVELOPER ACTIONS ===");
        dev1.completeProject(3);  // Difficulty 3
        dev1.completeProject(5);  // Difficulty 5
        dev1.displayFullInfo();

        // Demonstrate Manager actions
        System.out.println("\n=== MANAGER ACTIONS ===");
        manager1.addTeamMember("Alice Johnson");
        manager1.addTeamMember("Dave Wilson");
        manager1.addTeamMember("Emma Davis");
        manager1.conductReview();
        manager1.displayFullInfo();

        // Demonstrate Intern actions
        System.out.println("\n=== INTERN ACTIONS ===");
        intern1.assignMentor("Alice Johnson");
        intern1.completeWeek();
        intern1.completeWeek();
        intern1.displayFullInfo();

        // Polymorphism - treat all as Employee
        System.out.println("\n\n╔═══════════════════════════════════════╗");
        System.out.println("║   PAYROLL SUMMARY (Polymorphism)     ║");
        System.out.println("╚═══════════════════════════════════════╝\n");

        Employee[] employees = {dev1, manager1, intern1};

        double totalPayroll = 0;
        System.out.println("Employee Payroll Report:");
        System.out.println("─────────────────────────────────────────");

        for (Employee emp : employees) {
            double pay = emp.calculateTotalPay();
            System.out.printf("%-20s %-25s $%,.2f\n",
                            emp.name, emp.getRole(), pay);
            totalPayroll += pay;
        }

        System.out.println("─────────────────────────────────────────");
        System.out.printf("Total Payroll: $%,.2f\n", totalPayroll);

        // Find highest paid employee
        System.out.println("\n\n╔═══════════════════════════════════════╗");
        System.out.println("║   HIGHEST PAID EMPLOYEE              ║");
        System.out.println("╚═══════════════════════════════════════╝\n");

        Employee highestPaid = employees[0];
        for (Employee emp : employees) {
            if (emp.calculateTotalPay() > highestPaid.calculateTotalPay()) {
                highestPaid = emp;
            }
        }

        System.out.println("Highest Paid: " + highestPaid.name);
        System.out.println("Role: " + highestPaid.getRole());
        System.out.printf("Total Pay: $%,.2f\n", highestPaid.calculateTotalPay());

        System.out.println("\n═══════════════════════════════════════");
        System.out.println("     System Complete");
        System.out.println("═══════════════════════════════════════");
    }
}
```

**Expected Output:**
```
╔═══════════════════════════════════════╗
║   EMPLOYEE MANAGEMENT SYSTEM         ║
╚═══════════════════════════════════════╝

=== DEVELOPER ACTIONS ===
✅ Project completed! Bonus: $3000
✅ Project completed! Bonus: $5000

╔════════════════════════════════════╗
║     DEVELOPER INFORMATION         ║
╚════════════════════════════════════╝
Name: Alice Johnson
ID: DEV001
Email: alice.johnson@company.com
Role: Software Developer (Java)
Base Salary: $85000.00
Primary Language: Java
Skills: Java, Spring, SQL, REST API
Projects Completed: 2
Project Bonus: $8000.00
Total Pay: $93000.00
════════════════════════════════════

=== MANAGER ACTIONS ===
✅ Added Alice Johnson to team
✅ Added Dave Wilson to team
✅ Added Emma Davis to team
📊 Conducting performance review for 3 team members

╔════════════════════════════════════╗
║     MANAGER INFORMATION           ║
╚════════════════════════════════════╝
Name: Bob Smith
ID: MGR001
Email: bob.smith@company.com
Role: Manager - Engineering
Base Salary: $95000.00
Department: Engineering
Team Size: 3
Team Members:
  - Alice Johnson
  - Dave Wilson
  - Emma Davis
Management Bonus: $5000.00
Team Bonus: $1500.00
Total Pay: $101500.00
════════════════════════════════════

=== INTERN ACTIONS ===
✅ Mentor assigned: Alice Johnson
📚 Week 2 completed!
📚 Week 3 completed!

╔════════════════════════════════════╗
║     INTERN INFORMATION            ║
╚════════════════════════════════════╝
Name: Charlie Brown
ID: INT001
Email: charlie.brown@company.com
Role: Intern (Computer Science)
School: MIT
Major: Computer Science
Mentor: Alice Johnson
Weeks Completed: 3
Monthly Stipend: $2000.00
Total Pay: $2000.00
════════════════════════════════════


╔═══════════════════════════════════════╗
║   PAYROLL SUMMARY (Polymorphism)     ║
╚═══════════════════════════════════════╝

Employee Payroll Report:
─────────────────────────────────────────
Alice Johnson        Software Developer (Java)  $93,000.00
Bob Smith            Manager - Engineering       $101,500.00
Charlie Brown        Intern (Computer Science)   $2,000.00
─────────────────────────────────────────
Total Payroll: $196,500.00


╔═══════════════════════════════════════╗
║   HIGHEST PAID EMPLOYEE              ║
╚═══════════════════════════════════════╝

Highest Paid: Bob Smith
Role: Manager - Engineering
Total Pay: $101,500.00

═══════════════════════════════════════
     System Complete
═══════════════════════════════════════
```

**💡 What This Demonstrates:**

| Feature | Implementation |
|---------|----------------|
| **Inheritance** | All employee types extend Employee |
| **Encapsulation** | Protected fields, private implementation details |
| **Polymorphism** | Employee array holds different types |
| **Method Overriding** | Each type has custom calculateTotalPay() and getRole() |
| **super keyword** | Child constructors call super() |
| **Code Reuse** | Common methods in Employee class |
| **Real-world logic** | Bonuses, stipends, team management |

**✅ Success Criteria:**
- [ ] Complete working employee management system
- [ ] All employee types properly extend Employee class
- [ ] Each type correctly calculates its own pay
- [ ] Polymorphism works (Employee array holds all types)
- [ ] Proper use of constructor chaining with super()
- [ ] Each employee type has unique behaviors
- [ ] Professional output with proper formatting
- [ ] System demonstrates real-world business logic

**Common Mistakes:**

1. ❌ **Duplicating Common Employee Logic in Each Subclass**: Repeating fields like name, id, baseSalary in Developer, Manager, Intern
   - Why: Violates DRY principle. Common employee data should be defined once in the parent Employee class.
   - Fix: Put all common fields (name, id, email, baseSalary) in the Employee class. Children only add their specific fields.
   - Example:
     ```java
     // Wrong - duplicating fields
     class Employee { }

     class Developer extends Employee {
         String name;  // Duplicated
         String id;    // Duplicated
         double baseSalary;  // Duplicated
         String primaryLanguage;
     }

     class Manager extends Employee {
         String name;  // Duplicated again!
         String id;    // Duplicated again!
         double baseSalary;  // Duplicated again!
         String department;
     }

     // Correct - common fields in parent
     class Employee {
         protected String name;
         protected String id;
         protected double baseSalary;
     }

     class Developer extends Employee {
         private String primaryLanguage;  // Only Developer-specific
     }

     class Manager extends Employee {
         private String department;  // Only Manager-specific
     }
     ```

2. ❌ **Incorrect Pay Calculation Logic**: Making errors in business logic for bonuses, stipends, or total pay
   - Why: Each employee type has different pay calculation rules. Getting the formula wrong leads to incorrect payroll.
   - Fix: Carefully implement each type's calculateTotalPay() according to business rules. Test with known values.
   - Example:
     ```java
     // Wrong - incorrect logic
     class Developer extends Employee {
         @Override
         public double calculateTotalPay() {
             return baseSalary + projectsCompleted;  // Wrong! Missing calculation
         }
     }

     // Correct - proper business logic
     class Developer extends Employee {
         @Override
         public double calculateTotalPay() {
             double projectBonus = projectsCompleted * BONUS_PER_PROJECT;
             return baseSalary + projectBonus;  // Base + bonus per project
         }
     }
     ```

3. ❌ **Using Public Fields Instead of Protected for Inheritance**: Making fields public when they should be protected
   - Why: Public breaks encapsulation - any code can modify the fields. Protected allows only the class and its children to access.
   - Fix: Use `protected` for fields that children need to access, `private` for truly internal fields.
   - Example:
     ```java
     // Wrong - public breaks encapsulation
     class Employee {
         public String name;  // Anyone can modify!
         public double baseSalary;  // Anyone can set any value!
     }

     // Correct - protected for inheritance
     class Employee {
         protected String name;  // Accessible to children only
         protected double baseSalary;

         public String getName() { return name; }  // Controlled external access
     }
     ```

**🎯 Challenges:**
1. Add a `Contractor` class (hourly rate, hours worked)
2. Implement a method to give raises to all employees
3. Add a `Department` class that contains multiple employees
4. Create a method to generate a detailed company report
5. Add a `calculateYearlyBonus()` method with different formulas per employee type
6. Implement an `Employee of the Month` feature
7. Add ability to promote Intern to Developer

**📋 Best Practices:**

✅ **Model Real Business Entities and Rules**
- **Why:** Code should reflect actual business requirements and relationships
- **How:** Map classes to real-world entities; implement actual business logic
- **Example:**
```java
// ✅ Good - Models real business structure
class Employee {
    protected String name;
    protected double baseSalary;

    double calculateTotalPay() {
        return baseSalary;  // Base implementation
    }
}

class Manager extends Employee {
    private double bonus;
    @Override
    double calculateTotalPay() {
        return baseSalary + bonus;  // Real business rule
    }
}
```

✅ **Use Polymorphism for Uniform Processing**
- **Why:** Process different employee types uniformly while maintaining unique behaviors
- **How:** Store all types in parent-type collection; call overridden methods
- **Example:**
```java
// ✅ Polymorphism enables uniform processing
Employee[] employees = {
    new Developer(...),
    new Manager(...),
    new Intern(...)
};

double totalPayroll = 0;
for (Employee emp : employees) {
    totalPayroll += emp.calculateTotalPay();  // Calls correct version for each type
}
```

✅ **Implement Type-Specific Behavior Through Overriding**
- **Why:** Each employee type has unique compensation, responsibilities, and behaviors
- **How:** Override methods to provide type-specific implementations
- **Example:**
```java
class Developer extends Employee {
    private int projectsCompleted;

    @Override
    double calculateTotalPay() {
        return baseSalary + (projectsCompleted * 1000);  // Project bonuses
    }

    @Override
    String getRole() { return "Software Developer"; }
}

class Manager extends Employee {
    private int teamSize;

    @Override
    double calculateTotalPay() {
        return baseSalary + (teamSize * 500);  // Team management bonus
    }

    @Override
    String getRole() { return "Team Manager"; }
}
```

✅ **Use Protected for Subclass-Accessible Fields**
- **Why:** Subclasses need access to base employee data without breaking encapsulation
- **How:** Mark parent fields as `protected`; keep truly private as `private`
- **Example:**
```java
class Employee {
    protected String name;       // ✅ Subclasses can access
    protected double baseSalary; // ✅ Needed for pay calculations
    private String ssn;          // ✅ Truly private - security

    protected String getName() { return name; }  // ✅ Safe access
}

class Developer extends Employee {
    void displayInfo() {
        System.out.println(name);  // ✅ Can access protected field
        // System.out.println(ssn);  // ❌ Error - private
    }
}
```

✅ **Combine All OOP Principles in Real Systems**
- **Why:** Real applications use encapsulation, inheritance, polymorphism together
- **How:** Encapsulate data, inherit common structure, override for specialization, use polymorphism
- **Example:**
```java
// ✅ Complete OOP design
class Employee {
    // Encapsulation
    private String name;
    protected double baseSalary;

    // Constructor chaining
    public Employee(String name, double salary) {
        this.name = name;
        this.baseSalary = salary;
    }

    // Overridable behavior
    public double calculateTotalPay() {
        return baseSalary;
    }
}

// Inheritance + Overriding
class Manager extends Employee {
    private int teamSize;

    public Manager(String name, double salary, int teamSize) {
        super(name, salary);  // Chaining
        this.teamSize = teamSize;
    }

    @Override
    public double calculateTotalPay() {
        return baseSalary + (teamSize * 500);  // Specialization
    }
}

// Polymorphism in action
Employee[] staff = {new Manager(...), new Developer(...)};
for (Employee e : staff) { System.out.println(e.calculateTotalPay()); }
```

---

### 🎓 Day 12 Summary: Inheritance

**What You Learned:**
1. ✅ Inheritance fundamentals and IS-A relationship
2. ✅ Accessing parent class members (public, protected, private)
3. ✅ Using the super keyword (constructors and methods)
4. ✅ Method overriding with @Override annotation
5. ✅ Constructor chaining in inheritance hierarchies
6. ✅ Building complete shape hierarchy
7. ✅ Real-world employee management system

**Key Takeaways:**
- Inheritance enables code reuse and organization
- Child class IS-A type of parent class
- super accesses parent members and constructors
- Overriding changes parent method behavior
- Constructor chaining ensures proper initialization
- Polymorphism works through inheritance
- Real applications use inheritance extensively

**Inheritance Checklist:**
```
✅ Use extends keyword for inheritance
✅ Ensure IS-A relationship makes sense
✅ Call super() in child constructor (first statement)
✅ Override methods with @Override annotation
✅ Understand what child inherits (public/protected)
✅ Use super.method() to call parent version
✅ Design parent for common code, child for specific code
✅ Don't inherit just for code reuse - must be IS-A
```

**Before vs After:**
```java
// Before (code duplication):
class Dog {
    void eat() { }
    void sleep() { }
    void bark() { }
}
class Cat {
    void eat() { }    // Duplicate!
    void sleep() { }  // Duplicate!
    void meow() { }
}

// After (with inheritance):
class Animal {
    void eat() { }
    void sleep() { }
}
class Dog extends Animal {
    void bark() { }   // Only unique code
}
class Cat extends Animal {
    void meow() { }   // Only unique code
}
```

**Inheritance Hierarchy Best Practices:**
```
1. Keep parent classes general
2. Keep child classes specific
3. Don't go too deep (3-4 levels maximum)
4. Only use inheritance for IS-A relationships
5. Use composition (HAS-A) when inheritance doesn't fit
6. Make parent constructors flexible
7. Document the inheritance hierarchy
```

**Common Inheritance Patterns:**
```
1. Specialization: Vehicle → Car, Truck, Motorcycle
2. Type Hierarchy: Shape → Circle, Rectangle, Triangle
3. Role Hierarchy: Employee → Manager, Developer, Intern
4. Feature Levels: Product → DigitalProduct, PhysicalProduct
```

**Next Steps:**
- Day 13: Polymorphism (Runtime polymorphism, dynamic dispatch)
- Day 14: Abstraction (Abstract classes, interfaces)
- Day 15: Abstract Classes (Pure abstraction, contracts)

---


### Day 13: Polymorphism

---

#### Exercise 1: Runtime Polymorphism Basics (15 minutes)

**What you'll learn:** Understanding polymorphism and dynamic method dispatch

**Create classes: `Animal`, `Dog`, `Cat`, `Cow`**

**Concept:** **Polymorphism** means "many forms". One interface (parent type) can refer to different implementations (child objects). Java decides which method to call at runtime based on the actual object type.

```
Polymorphism = Parent reference → Child object

Animal animal = new Dog();  // Parent type, child object
animal.makeSound();         // Calls Dog's method (not Animal's)
                           // Decision made at RUNTIME
```

**Why Polymorphism?**
- **Flexibility**: Write code that works with parent type
- **Extensibility**: Add new child classes without changing existing code
- **Simplicity**: One interface for many implementations

**Step-by-Step:**

```java
// PARENT CLASS
class Animal {
    String name;
    
    Animal(String name) {
        this.name = name;
    }
    
    void makeSound() {
        System.out.println(name + " makes a sound");
    }
}

// CHILD CLASSES
class Dog extends Animal {
    Dog(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " says: Woof\! Woof\!");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " says: Meow\! Meow\!");
    }
}

class Cow extends Animal {
    Cow(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + " says: Moo\! Moo\!");
    }
}

public class PolymorphismBasics {
    public static void main(String[] args) {
        System.out.println("===== RUNTIME POLYMORPHISM =====\n");
        
        // Without polymorphism - specific types
        System.out.println("--- Without Polymorphism ---");
        Dog dog = new Dog("Buddy");
        Cat cat = new Cat("Whiskers");
        Cow cow = new Cow("Bessie");
        
        dog.makeSound();
        cat.makeSound();
        cow.makeSound();
        
        // With polymorphism - parent type reference
        System.out.println("\n--- With Polymorphism ---");
        Animal animal1 = new Dog("Max");      // Parent type\!
        Animal animal2 = new Cat("Fluffy");   // Parent type\!
        Animal animal3 = new Cow("Daisy");    // Parent type\!
        
        // Same method call, different behaviors
        animal1.makeSound();  // Calls Dog's makeSound()
        animal2.makeSound();  // Calls Cat's makeSound()
        animal3.makeSound();  // Calls Cow's makeSound()
        
        // The magic: Java decides which method at RUNTIME
        System.out.println("\n--- Dynamic Method Dispatch ---");
        Animal animal;  // Parent reference
        
        animal = new Dog("Rocky");
        System.out.print("Animal is Dog: ");
        animal.makeSound();  // Dog's version
        
        animal = new Cat("Tom");
        System.out.print("Animal is Cat: ");
        animal.makeSound();  // Cat's version
        
        animal = new Cow("Molly");
        System.out.print("Animal is Cow: ");
        animal.makeSound();  // Cow's version
        
        System.out.println("\n==================================");
    }
}
```

**Expected Output:**
```
===== RUNTIME POLYMORPHISM =====

--- Without Polymorphism ---
Buddy says: Woof\! Woof\!
Whiskers says: Meow\! Meow\!
Bessie says: Moo\! Moo\!

--- With Polymorphism ---
Max says: Woof\! Woof\!
Fluffy says: Meow\! Meow\!
Daisy says: Moo\! Moo\!

--- Dynamic Method Dispatch ---
Animal is Dog: Rocky says: Woof\! Woof\!
Animal is Cat: Tom says: Meow\! Meow\!
Animal is Cow: Molly says: Moo\! Moo\!

==================================
```

**💡 How It Works:**

```java
Animal animal = new Dog("Buddy");
animal.makeSound();

// Compile time:
// - Compiler checks: Does Animal have makeSound()? YES ✓
// - Allows the call

// Runtime:
// - JVM checks: What's the actual object? Dog\!
// - Calls: Dog's makeSound() ✓

Reference Type = Animal (compile time)
Object Type = Dog (runtime)
Method Called = Dog's version (runtime decision)
```

**Polymorphism Requirements:**
1. ✅ Inheritance (IS-A relationship)
2. ✅ Method overriding
3. ✅ Parent reference to child object

**✅ Success Criteria:**
- Understand polymorphism = one interface, many forms
- Know parent reference can hold child object
- Recognize method called is based on actual object (runtime)
- Can create polymorphic references

**Common Mistakes:**

1. ❌ **Thinking Polymorphism Is Compile-Time**: Believing the method to call is decided when code is compiled
   - Why: Students confuse polymorphism (runtime) with overloading (compile-time). Polymorphism's power is that the JVM decides which method to call based on the actual object at runtime.
   - Fix: Understand that polymorphism = runtime decision. The actual object type determines which overridden method runs, not the reference type.
   - Example:
     ```java
     Animal animal = new Dog();  // Reference type: Animal, Actual type: Dog
     animal.makeSound();  // At RUNTIME, JVM sees it's a Dog and calls Dog's makeSound()

     // Compile time: Compiler only checks that Animal has makeSound()
     // Runtime: JVM calls Dog's version because object is actually a Dog
     ```

2. ❌ **Trying to Call Child-Specific Methods Through Parent Reference**: Attempting to use methods that only exist in child class
   - Why: When using a parent reference (Animal a = new Dog()), you can only call methods defined in the parent class, even though the object is actually a child.
   - Fix: Cast to child type if you need child-specific methods, or redesign to put method in parent.
   - Example:
     ```java
     class Animal {
         void makeSound() { }
     }

     class Dog extends Animal {
         void makeSound() { System.out.println("Woof"); }
         void fetch() { System.out.println("Fetching"); }  // Dog-only method
     }

     // Wrong - can't call child-only method
     Animal animal = new Dog();
     animal.makeSound();  // OK - makeSound() exists in Animal
     animal.fetch();  // Error: cannot find symbol fetch() in Animal

     // Correct - cast to child type
     Animal animal = new Dog();
     ((Dog) animal).fetch();  // Works - cast to Dog first

     // Or check type first
     if (animal instanceof Dog) {
         Dog dog = (Dog) animal;
         dog.fetch();
     }
     ```

3. ❌ **Confusing Polymorphism with Overloading**: Mixing up method overriding (polymorphism) with method overloading
   - Why: Both involve multiple methods with same name, but they're completely different mechanisms with different timing.
   - Fix: Remember: Overloading = compile-time (different parameters), Overriding = runtime (same signature, different class).
   - Example:
     ```java
     // Overloading - compile-time (NOT polymorphism)
     class Calculator {
         int add(int a, int b) { return a + b; }
         double add(double a, double b) { return a + b; }  // Different parameters
         // Compiler picks which one based on arguments at compile-time
     }

     // Overriding - runtime (IS polymorphism)
     class Animal {
         void makeSound() { System.out.println("Generic"); }
     }
     class Dog extends Animal {
         @Override
         void makeSound() { System.out.println("Woof"); }  // Same signature
     }

     Animal animal = new Dog();
     animal.makeSound();  // JVM decides at RUNTIME which version to call
     ```

**🎯 Challenge:**
1. Create `Shape` with `draw()` and `getArea()`
2. Create `Circle`, `Rectangle`, `Triangle` children
3. Override both methods in each
4. Create Shape array, fill with different shapes, call methods

**📋 Best Practices:**

✅ **Use Parent Type References for Flexibility**
- **Why:** Enables code to work with any child type; increases flexibility and reusability
- **How:** Declare variables/parameters as parent type; assign child objects
- **Example:**
```java
// ✅ Good - Flexible, works with any Animal
Animal pet1 = new Dog("Buddy");
Animal pet2 = new Cat("Whiskers");
pet1.makeSound();  // Calls Dog's version
pet2.makeSound();  // Calls Cat's version

// ❌ Limited - Hardcoded to specific type
Dog dog = new Dog("Buddy");
Cat cat = new Cat("Whiskers");
```

✅ **Understand Runtime vs Compile-Time Method Resolution**
- **Why:** Polymorphism uses actual object type at runtime, not reference type
- **How:** Declared type determines what methods you can call; actual type determines which version runs
- **Example:**
```java
Animal animal = new Dog();
animal.makeSound();  // ✅ Calls Dog.makeSound() - runtime decision

// animal.fetch();  // ❌ Compile error - Animal doesn't have fetch()
// Even though object IS a Dog, reference type is Animal
```

✅ **Design Methods to Accept Parent Types**
- **Why:** Single method can process all child types; avoid writing duplicate methods
- **How:** Use parent type for method parameters
- **Example:**
```java
// ✅ Good - Works with any Animal
public void feedAnimal(Animal animal) {
    animal.eat();  // Works for Dog, Cat, Cow, etc.
}

// ❌ Bad - Need separate methods for each type
public void feedDog(Dog dog) { dog.eat(); }
public void feedCat(Cat cat) { cat.eat(); }
public void feedCow(Cow cow) { cow.eat(); }
```

✅ **Override Methods for Type-Specific Behavior**
- **Why:** Each child provides its own implementation while maintaining common interface
- **How:** Use `@Override` to replace parent method with child-specific version
- **Example:**
```java
class Animal {
    void makeSound() { System.out.println("Some sound"); }
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Woof!"); }  // Dog-specific
}

class Cat extends Animal {
    @Override
    void makeSound() { System.out.println("Meow!"); }  // Cat-specific
}
```

✅ **Remember: Can Only Call Methods Declared in Reference Type**
- **Why:** Compiler checks based on declared type, not actual object type
- **How:** Cast to child type if you need child-specific methods
- **Example:**
```java
Animal animal = new Dog();
animal.makeSound();  // ✅ OK - Animal has makeSound()
// animal.fetch();    // ❌ Compile error - Animal doesn't have fetch()

// Need to cast for child-specific methods
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.fetch();  // ✅ Now OK
}
```

---

#### Exercise 2: Polymorphic Arrays (20 minutes)

**What you'll learn:** Using polymorphism with arrays and collections

**Create classes: `Employee`, `Manager`, `Developer`, `Intern`**

**Concept:** **Polymorphic Arrays** let you store different child objects in one parent array. This is powerful for processing different types uniformly.

```
Employee[] team = new Employee[5];
team[0] = new Manager(...);    // ✓
team[1] = new Developer(...);  // ✓
team[2] = new Intern(...);     // ✓

// All are Employees, can call common methods
```

**Step-by-Step:**

```java
// PARENT CLASS
class Employee {
    String name;
    double salary;
    
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    
    void work() {
        System.out.println(name + " is working");
    }
    
    double calculateBonus() {
        return salary * 0.05;  // 5% default
    }
    
    void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Salary: $" + salary);
        System.out.println("Bonus: $" + calculateBonus());
    }
}

// CHILD CLASS 1
class Manager extends Employee {
    int teamSize;
    
    Manager(String name, double salary, int teamSize) {
        super(name, salary);
        this.teamSize = teamSize;
    }
    
    @Override
    void work() {
        System.out.println(name + " is managing " + teamSize + " people");
    }
    
    @Override
    double calculateBonus() {
        return salary * 0.15;  // 15% for managers
    }
}

// CHILD CLASS 2
class Developer extends Employee {
    String programmingLanguage;
    
    Developer(String name, double salary, String language) {
        super(name, salary);
        this.programmingLanguage = language;
    }
    
    @Override
    void work() {
        System.out.println(name + " is coding in " + programmingLanguage);
    }
    
    @Override
    double calculateBonus() {
        return salary * 0.10;  // 10% for developers
    }
}

// CHILD CLASS 3
class Intern extends Employee {
    int duration;  // months
    
    Intern(String name, double salary, int duration) {
        super(name, salary);
        this.duration = duration;
    }
    
    @Override
    void work() {
        System.out.println(name + " is learning (intern for " + duration + " months)");
    }
    
    @Override
    double calculateBonus() {
        return salary * 0.02;  // 2% for interns
    }
}

public class PolymorphicArrayDemo {
    public static void main(String[] args) {
        System.out.println("===== POLYMORPHIC ARRAYS =====\n");
        
        // Polymorphic array - parent type, child objects
        Employee[] team = new Employee[5];
        team[0] = new Manager("Alice", 100000, 10);
        team[1] = new Developer("Bob", 80000, "Java");
        team[2] = new Developer("Charlie", 75000, "Python");
        team[3] = new Intern("David", 30000, 6);
        team[4] = new Manager("Eve", 120000, 15);
        
        // Process all employees uniformly
        System.out.println("--- All Employees Working ---");
        for (Employee emp : team) {
            emp.work();  // Calls appropriate version for each
        }
        
        // Calculate total payroll
        System.out.println("\n--- Payroll Calculation ---");
        double totalSalary = 0;
        double totalBonus = 0;
        
        for (Employee emp : team) {
            totalSalary += emp.salary;
            totalBonus += emp.calculateBonus();  // Different for each type\!
        }
        
        System.out.println("Total Salary: $" + totalSalary);
        System.out.println("Total Bonus: $" + totalBonus);
        System.out.println("Total Cost: $" + (totalSalary + totalBonus));
        
        // Display each employee's info
        System.out.println("\n--- Employee Details ---");
        for (int i = 0; i < team.length; i++) {
            System.out.println("\nEmployee " + (i + 1) + ":");
            team[i].displayInfo();
        }
        
        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== POLYMORPHIC ARRAYS =====

--- All Employees Working ---
Alice is managing 10 people
Bob is coding in Java
Charlie is coding in Python
David is learning (intern for 6 months)
Eve is managing 15 people

--- Payroll Calculation ---
Total Salary: $405000.0
Total Bonus: $45100.0
Total Cost: $450100.0

--- Employee Details ---

Employee 1:
Name: Alice
Salary: $100000.0
Bonus: $15000.0

Employee 2:
Name: Bob
Salary: $80000.0
Bonus: $8000.0

Employee 3:
Name: Charlie
Salary: $75000.0
Bonus: $7500.0

Employee 4:
Name: David
Salary: $30000.0
Bonus: $600.0

Employee 5:
Name: Eve
Salary: $120000.0
Bonus: $18000.0

================================
```

**💡 Power of Polymorphic Arrays:**

```java
// ONE loop handles ALL employee types
for (Employee emp : team) {
    emp.work();  // Different behavior for each\!
}

// Without polymorphism, need separate loops:
for (Manager m : managers) { m.work(); }
for (Developer d : devs) { d.work(); }
for (Intern i : interns) { i.work(); }
// Tedious and not extensible\!
```

**Benefits:**

| Benefit | Explanation |
|---------|-------------|
| **Uniform Processing** | One loop for all types |
| **Extensibility** | Add new Employee type, no code change |
| **Simplicity** | Treat different objects uniformly |
| **Flexibility** | Mix different types in one collection |

**✅ Success Criteria:**
- Can create arrays of parent type
- Can store different child objects in array
- Understand each object behaves according to its type
- Recognize polymorphism enables uniform processing

**Common Mistakes:**

1. ❌ **Using Separate Arrays for Each Child Type**: Creating one array for each subclass instead of using a parent array
   - Why: Defeats the purpose of polymorphism. With separate arrays, you lose the ability to process all objects uniformly.
   - Fix: Use a single array of the parent type that can hold all child objects.
   - Example:
     ```java
     // Wrong - separate arrays
     Manager[] managers = {new Manager(), new Manager()};
     Developer[] developers = {new Developer(), new Developer()};
     Intern[] interns = {new Intern()};

     // Need separate loops for each type
     for (Manager m : managers) { m.work(); }
     for (Developer d : developers) { d.work(); }
     for (Intern i : interns) { i.work(); }

     // Correct - one parent array
     Employee[] employees = {
         new Manager(),
         new Developer(),
         new Intern(),
         new Manager(),
         new Developer()
     };

     // One loop for all types
     for (Employee emp : employees) {
         emp.work();  // Polymorphic call
     }
     ```

2. ❌ **Casting Every Element Without instanceof Check**: Blindly casting array elements to child type
   - Why: If the array contains mixed types and you cast to the wrong type, you get a ClassCastException at runtime.
   - Fix: Use `instanceof` to check type before casting, or better yet, use polymorphism to avoid casting.
   - Example:
     ```java
     Employee[] team = {new Manager(), new Developer(), new Manager()};

     // Wrong - unsafe casting
     for (Employee emp : team) {
         Manager m = (Manager) emp;  // Throws ClassCastException when emp is Developer!
         m.managTeam();
     }

     // Correct - check before casting
     for (Employee emp : team) {
         if (emp instanceof Manager) {
             Manager m = (Manager) emp;
             m.manageTeam();
         }
     }

     // Best - use polymorphism, avoid casting
     for (Employee emp : team) {
         emp.work();  // No casting needed
     }
     ```

3. ❌ **Not Leveraging Polymorphism for Aggregate Operations**: Using type checks and casting instead of relying on polymorphism
   - Why: Defeats the purpose of polymorphism. Code becomes cluttered with instanceof checks and type-specific logic.
   - Fix: Design parent class with methods that all children override. Use those methods directly without checking types.
   - Example:
     ```java
     Shape[] shapes = {new Circle(5), new Rectangle(4, 6), new Triangle(3, 4, 5)};

     // Wrong - checking types explicitly
     double totalArea = 0;
     for (Shape shape : shapes) {
         if (shape instanceof Circle) {
             Circle c = (Circle) shape;
             totalArea += Math.PI * c.radius * c.radius;
         } else if (shape instanceof Rectangle) {
             Rectangle r = (Rectangle) shape;
             totalArea += r.width * r.height;
         }
         // ... more type checks
     }

     // Correct - polymorphism handles it
     double totalArea = 0;
     for (Shape shape : shapes) {
         totalArea += shape.getArea();  // Calls correct version automatically
     }
     ```

**🎯 Challenge:**
Create:
1. `Vehicle` parent with `start()`, `getFuelEfficiency()`
2. `Car`, `Truck`, `Motorcycle` children with different implementations
3. Array of Vehicles with mixed types
4. Loop through, start all, calculate average fuel efficiency

**📋 Best Practices:**

✅ **Use Parent-Type Arrays for Heterogeneous Collections**
- **Why:** Store and process different child types uniformly
- **How:** Declare array as parent type, populate with various child objects
- **Example:**
```java
// ✅ Good - One array for all shapes
Shape[] shapes = {
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5)
};

for (Shape shape : shapes) {
    shape.draw();  // Polymorphic call
}

// ❌ Bad - Separate arrays for each type
Circle[] circles = {new Circle(5)};
Rectangle[] rectangles = {new Rectangle(4, 6)};
// Hard to process together
```

✅ **Process Collections Uniformly with Polymorphism**
- **Why:** Single loop can handle all types; cleaner, more maintainable code
- **How:** Iterate once, call overridden methods
- **Example:**
```java
Employee[] team = {new Manager(...), new Developer(...), new Intern(...)};

double totalPay = 0;
for (Employee emp : team) {
    totalPay += emp.calculatePay();  // Each calculates differently
}
```

✅ **Leverage Polymorphism for Aggregate Operations**
- **Why:** Perform operations across all types without type-specific logic
- **How:** Use common parent methods to calculate totals, averages, find max/min
- **Example:**
```java
Shape[] shapes = {new Circle(5), new Rectangle(4, 6), new Triangle(3, 4)};

// Find largest shape
Shape largest = shapes[0];
for (Shape shape : shapes) {
    if (shape.getArea() > largest.getArea()) {
        largest = shape;
    }
}

// Calculate total area
double totalArea = 0;
for (Shape shape : shapes) {
    totalArea += shape.getArea();
}
```

---

#### Exercise 3: The instanceof Operator (20 minutes)

**What you'll learn:** Checking object types at runtime

**Create classes: `Animal`, `Dog`, `Cat`, `Bird`**

**Concept:** The **instanceof** operator checks if an object is an instance of a particular class. Useful when you need type-specific behavior with polymorphic references.

```
object instanceof ClassName
Returns: true if object is instance of ClassName
        false otherwise
```

**Step-by-Step:**

```java
// PARENT CLASS
class Animal {
    String name;
    
    Animal(String name) {
        this.name = name;
    }
    
    void makeSound() {
        System.out.println(name + " makes a sound");
    }
}

// CHILD CLASSES
class Dog extends Animal {
    Dog(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + ": Woof\!");
    }
    
    void fetch() {
        System.out.println(name + " is fetching");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + ": Meow\!");
    }
    
    void scratch() {
        System.out.println(name + " is scratching");
    }
}

class Bird extends Animal {
    Bird(String name) {
        super(name);
    }
    
    @Override
    void makeSound() {
        System.out.println(name + ": Chirp\!");
    }
    
    void fly() {
        System.out.println(name + " is flying");
    }
}

public class InstanceofDemo {
    public static void main(String[] args) {
        System.out.println("===== INSTANCEOF OPERATOR =====\n");
        
        // Create polymorphic array
        Animal[] animals = new Animal[4];
        animals[0] = new Dog("Buddy");
        animals[1] = new Cat("Whiskers");
        animals[2] = new Bird("Tweety");
        animals[3] = new Dog("Max");
        
        // Process each animal
        System.out.println("--- Processing Animals ---");
        for (Animal animal : animals) {
            // Common method - all have it
            animal.makeSound();
            
            // Type-specific behavior using instanceof
            if (animal instanceof Dog) {
                System.out.println("  → This is a Dog\!");
                Dog dog = (Dog) animal;  // Downcast
                dog.fetch();
                
            } else if (animal instanceof Cat) {
                System.out.println("  → This is a Cat\!");
                Cat cat = (Cat) animal;  // Downcast
                cat.scratch();
                
            } else if (animal instanceof Bird) {
                System.out.println("  → This is a Bird\!");
                Bird bird = (Bird) animal;  // Downcast
                bird.fly();
            }
            
            System.out.println();
        }
        
        // Counting types
        System.out.println("--- Counting Animals ---");
        int dogCount = 0, catCount = 0, birdCount = 0;
        
        for (Animal animal : animals) {
            if (animal instanceof Dog) {
                dogCount++;
            } else if (animal instanceof Cat) {
                catCount++;
            } else if (animal instanceof Bird) {
                birdCount++;
            }
        }
        
        System.out.println("Dogs: " + dogCount);
        System.out.println("Cats: " + catCount);
        System.out.println("Birds: " + birdCount);
        
        // Testing instanceof
        System.out.println("\n--- Testing instanceof ---");
        Animal animal = new Dog("Rocky");
        
        System.out.println("animal instanceof Dog: " + (animal instanceof Dog));
        System.out.println("animal instanceof Cat: " + (animal instanceof Cat));
        System.out.println("animal instanceof Animal: " + (animal instanceof Animal));
        System.out.println("animal instanceof Object: " + (animal instanceof Object));
        
        System.out.println("\n=================================");
    }
}
```

**Expected Output:**
```
===== INSTANCEOF OPERATOR =====

--- Processing Animals ---
Buddy: Woof\!
  → This is a Dog\!
Buddy is fetching

Whiskers: Meow\!
  → This is a Cat\!
Whiskers is scratching

Tweety: Chirp\!
  → This is a Bird\!
Tweety is flying

Max: Woof\!
  → This is a Dog\!
Max is fetching

--- Counting Animals ---
Dogs: 2
Cats: 1
Birds: 1

--- Testing instanceof ---
animal instanceof Dog: true
animal instanceof Cat: false
animal instanceof Animal: true
animal instanceof Object: true

=================================
```

**💡 instanceof Checks:**

```java
Animal animal = new Dog("Buddy");

// Checks go from specific to general
animal instanceof Dog     // true  - exact type
animal instanceof Animal  // true  - is parent
animal instanceof Object  // true  // everything is Object
animal instanceof Cat     // false - not this type
```

**Downcasting with instanceof:**
```java
Animal animal = new Dog("Buddy");

// UNSAFE - might crash
Dog dog = (Dog) animal;  // Works if animal is Dog
                         // Runtime error if not\!

// SAFE - check first
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;  // Safe now\!
    dog.fetch();
}
```

**Common Pattern:**
```java
// Process polymorphic collection with type-specific behavior
for (Animal animal : animals) {
    // Common behavior for all
    animal.makeSound();
    
    // Specific behavior for each type
    if (animal instanceof Dog) {
        ((Dog) animal).fetch();
    } else if (animal instanceof Cat) {
        ((Cat) animal).scratch();
    }
}
```

**✅ Success Criteria:**
- Understand instanceof checks object type
- Can use instanceof before downcasting
- Know instanceof returns boolean
- Recognize instanceof checks inheritance hierarchy

**Common Mistakes:**

1. ❌ **Downcasting Without instanceof Check**: Casting directly without checking type first
   - Why: If the object is not actually of the type you're casting to, you get a ClassCastException at runtime.
   - Fix: Always use `instanceof` to check before casting.
   - Example:
     ```java
     // Wrong - unsafe casting
     Animal animal = getAnimal();  // Could be any Animal type
     Dog dog = (Dog) animal;  // ClassCastException if it's not a Dog!
     dog.fetch();

     // Correct - check first
     Animal animal = getAnimal();
     if (animal instanceof Dog) {
         Dog dog = (Dog) animal;  // Safe - we checked
         dog.fetch();
     }
     ```

2. ❌ **Checking Type After Downcasting**: Using instanceof after you've already cast
   - Why: Too late! If the cast fails, exception is thrown before you can check. The check must come BEFORE the cast.
   - Fix: Always check with instanceof BEFORE casting, not after.
   - Example:
     ```java
     // Wrong - checking after cast
     Animal animal = getAnimal();
     Dog dog = (Dog) animal;  // May throw exception here!
     if (dog instanceof Dog) {  // Too late!
         dog.fetch();
     }

     // Correct - check before cast
     Animal animal = getAnimal();
     if (animal instanceof Dog) {  // Check first
         Dog dog = (Dog) animal;  // Then cast
         dog.fetch();
     }
     ```

3. ❌ **Using == to Check Object Type**: Trying `object.getClass() == ClassName.class` instead of instanceof
   - Why: `==` checks for exact class match, while instanceof also returns true for subclasses. instanceof is usually what you want.
   - Fix: Use instanceof for type checking in most cases.
   - Example:
     ```java
     class Animal { }
     class Dog extends Animal { }
     class Bulldog extends Dog { }

     Bulldog bulldog = new Bulldog();

     // Wrong - too specific
     if (bulldog.getClass() == Dog.class) {  // false! Bulldog != Dog
         // Never executes
     }

     // Correct - checks inheritance
     if (bulldog instanceof Dog) {  // true! Bulldog IS-A Dog
         // Executes as expected
     }
     ```

4. ❌ **Overusing instanceof Instead of Polymorphism**: Checking types everywhere instead of using overridden methods
   - Why: Defeats the purpose of polymorphism. Code becomes hard to maintain with lots of type checks.
   - Fix: Use polymorphism. Override methods in children. Only use instanceof when absolutely necessary.
   - Example:
     ```java
     // Wrong - type-checking everywhere
     for (Animal animal : animals) {
         if (animal instanceof Dog) {
             System.out.println("Woof");
         } else if (animal instanceof Cat) {
             System.out.println("Meow");
         } else if (animal instanceof Bird) {
             System.out.println("Tweet");
         }
     }

     // Correct - polymorphism
     for (Animal animal : animals) {
         animal.makeSound();  // Each type has overridden makeSound()
     }
     ```

**🎯 Challenge:**
Create payment system:
1. `Payment` parent with `processPayment()`
2. `CreditCard`, `PayPal`, `Cash` children
3. Array of mixed Payment objects
4. Use instanceof to apply different fees for each type

**📋 Best Practices:**

✅ **Always Check with instanceof Before Downcasting**
- **Why:** Prevents ClassCastException at runtime
- **How:** Use instanceof check before casting to child type
- **Example:**
```java
// ✅ Good - Safe downcasting
Animal animal = getAnimal();
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.fetch();  // Safe - we know it's a Dog
}

// ❌ Bad - Unsafe cast
Dog dog = (Dog) animal;  // ClassCastException if not a Dog!
```

✅ **Use instanceof Sparingly - Prefer Polymorphism**
- **Why:** Excessive type checking defeats the purpose of polymorphism
- **How:** Override methods instead of checking types
- **Example:**
```java
// ❌ Bad - Type checking everywhere
for (Animal animal : animals) {
    if (animal instanceof Dog) {
        System.out.println("Woof");
    } else if (animal instanceof Cat) {
        System.out.println("Meow");
    }
}

// ✅ Good - Polymorphism
for (Animal animal : animals) {
    animal.makeSound();  // Each type knows its own sound
}
```

✅ **Check Most Specific Types First**
- **Why:** More general types will match subclasses too
- **How:** Check child types before parent types
- **Example:**
```java
// ✅ Good - Specific to general
if (animal instanceof Dog) {
    // Handle Dog
} else if (animal instanceof Animal) {
    // Handle other Animals
}

// ❌ Bad - General first catches everything
if (animal instanceof Animal) {  // Always true!
    // This catches Dog, Cat, etc.
} else if (animal instanceof Dog) {
    // Never reached!
}
```

✅ **Use instanceof for Optional Type-Specific Operations**
- **Why:** Sometimes you genuinely need to handle specific types differently
- **How:** Use for legitimately type-dependent operations
- **Example:**
```java
// ✅ Good use case - Optional behavior
for (Animal animal : animals) {
    animal.feed();  // Common operation

    // Optional: Groom only dogs
    if (animal instanceof Dog) {
        Dog dog = (Dog) animal;
        dog.groom();
    }
}
```

---

### 🎓 Day 13 Summary: Polymorphism

**What You Learned:**
1. ✅ Runtime polymorphism and dynamic method dispatch
2. ✅ Polymorphic arrays and collections
3. ✅ The instanceof operator for type checking
4. ✅ Upcasting and downcasting

**Key Takeaways:**
- Polymorphism = one interface, multiple implementations
- Parent reference can hold child object
- Method called depends on actual object (runtime)
- instanceof checks object type safely
- Polymorphism enables flexible, extensible code

**Polymorphism Checklist:**
```
✅ Parent reference → Child object
✅ Method overriding in child classes
✅ Runtime decision on which method to call
✅ Use instanceof before downcasting
✅ Polymorphic arrays for uniform processing
✅ Prefer polymorphism over type checking
✅ Enables flexible, extensible designs
```

**Next Steps:**
- Day 14: Abstraction (Abstract classes and interfaces)

---

### Day 14: Abstraction

---

#### Exercise 1: Abstract Classes Basics (20 minutes)

**What you'll learn:** Creating and using abstract classes

**Create classes: `Animal` (abstract), `Dog`, `Cat`**

**Concept:** An **abstract class** is a class that cannot be instantiated. It serves as a template for child classes. It can have:
- Abstract methods (no implementation - must be overridden)
- Concrete methods (with implementation - can be inherited)

```
Abstract Class = Incomplete class
Cannot create objects directly
Must be extended by child class
Child must implement abstract methods
```

**Why Abstract Classes?**
- Define common structure for children
- Force children to implement certain methods
- Provide some common implementation
- Represent concepts that are too general to instantiate

**Step-by-Step:**

```java
// ABSTRACT CLASS - cannot be instantiated
abstract class Animal {
    String name;
    int age;
    
    // Constructor (yes, abstract classes can have constructors\!)
    Animal(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Animal constructor called for: " + name);
    }
    
    // ABSTRACT method - no implementation
    // Child classes MUST implement this
    abstract void makeSound();
    
    // ABSTRACT method
    abstract void move();
    
    // CONCRETE method - has implementation
    // Children inherit this as-is
    void eat() {
        System.out.println(name + " is eating");
    }
    
    void sleep() {
        System.out.println(name + " is sleeping");
    }
    
    void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// CONCRETE CLASS - must implement all abstract methods
class Dog extends Animal {
    String breed;
    
    Dog(String name, int age, String breed) {
        super(name, age);  // Call abstract class constructor
        this.breed = breed;
    }
    
    // MUST implement abstract method
    @Override
    void makeSound() {
        System.out.println(name + " barks: Woof\! Woof\!");
    }
    
    // MUST implement abstract method
    @Override
    void move() {
        System.out.println(name + " runs on four legs");
    }
}

class Cat extends Animal {
    String color;
    
    Cat(String name, int age, String color) {
        super(name, age);
        this.color = color;
    }
    
    // MUST implement abstract method
    @Override
    void makeSound() {
        System.out.println(name + " meows: Meow\! Meow\!");
    }
    
    // MUST implement abstract method
    @Override
    void move() {
        System.out.println(name + " walks gracefully");
    }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        System.out.println("===== ABSTRACT CLASSES =====\n");
        
        // Animal animal = new Animal("Generic", 1);  // ❌ ERROR\! Cannot instantiate
        
        // Create concrete objects
        System.out.println("--- Creating Dog ---");
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        
        System.out.println("\n--- Creating Cat ---");
        Cat cat = new Cat("Whiskers", 2, "Orange");
        
        // Call methods
        System.out.println("\n--- Dog Behaviors ---");
        dog.displayInfo();  // Inherited concrete method
        dog.makeSound();    // Implemented abstract method
        dog.move();         // Implemented abstract method
        dog.eat();          // Inherited concrete method
        dog.sleep();        // Inherited concrete method
        
        System.out.println("\n--- Cat Behaviors ---");
        cat.displayInfo();
        cat.makeSound();
        cat.move();
        cat.eat();
        cat.sleep();
        
        // Polymorphism with abstract class
        System.out.println("\n--- Polymorphism with Abstract Class ---");
        Animal animal1 = new Dog("Max", 5, "Labrador");
        Animal animal2 = new Cat("Fluffy", 1, "White");
        
        animal1.makeSound();  // Dog's implementation
        animal2.makeSound();  // Cat's implementation
        
        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== ABSTRACT CLASSES =====

--- Creating Dog ---
Animal constructor called for: Buddy

--- Creating Cat ---
Animal constructor called for: Whiskers

--- Dog Behaviors ---
Name: Buddy, Age: 3
Buddy barks: Woof\! Woof\!
Buddy runs on four legs
Buddy is eating
Buddy is sleeping

--- Cat Behaviors ---
Name: Whiskers, Age: 2
Whiskers meows: Meow\! Meow\!
Whiskers walks gracefully
Whiskers is eating
Whiskers is sleeping

--- Polymorphism with Abstract Class ---
Animal constructor called for: Max
Animal constructor called for: Fluffy
Max barks: Woof\! Woof\!
Fluffy meows: Meow\! Meow\!

==============================
```

**💡 Abstract Class Rules:**

| Rule | Explanation |
|------|-------------|
| Cannot instantiate | `new Animal()` ❌ - error |
| Can have constructor | Called when child is created |
| Can have abstract methods | No body, must be overridden |
| Can have concrete methods | Full implementation, inherited |
| Can have variables | Inherited by children |
| Child must implement | All abstract methods (or be abstract itself) |

**Abstract vs Concrete Methods:**
```java
abstract class Example {
    // Abstract - no implementation
    abstract void mustImplement();
    
    // Concrete - has implementation
    void canInherit() {
        System.out.println("This is inherited");
    }
}
```

**✅ Success Criteria:**
- Understand abstract classes cannot be instantiated
- Know abstract methods have no body
- Can implement all abstract methods in child
- Recognize abstract classes force common structure

**Common Mistakes:**

1. ❌ **Trying to Instantiate an Abstract Class**: Using `new AbstractClassName()`
   - Why: Abstract classes are incomplete by definition - they have abstract methods with no implementation. You cannot create objects from incomplete classes.
   - Fix: Create instances of concrete child classes that implement all abstract methods.
   - Example:
     ```java
     abstract class Animal {
         abstract void makeSound();
     }

     // Wrong - cannot instantiate abstract class
     Animal animal = new Animal();  // Error: Animal is abstract; cannot be instantiated

     // Correct - instantiate concrete child class
     class Dog extends Animal {
         void makeSound() { System.out.println("Woof"); }
     }

     Animal animal = new Dog();  // OK - Dog is concrete
     ```

2. ❌ **Forgetting to Implement All Abstract Methods in Child Class**: Creating child class but not implementing all required abstract methods
   - Why: If child doesn't implement all abstract methods, it becomes abstract too. You must implement every abstract method from the parent.
   - Fix: Either implement all abstract methods, or declare the child class as abstract too.
   - Example:
     ```java
     abstract class Shape {
         abstract double getArea();
         abstract double getPerimeter();
     }

     // Wrong - missing implementations
     class Circle extends Shape {
         double getArea() { return 0; }
         // Error: Circle is not abstract and does not override getPerimeter()
     }

     // Correct - all methods implemented
     class Circle extends Shape {
         double radius;
         double getArea() { return Math.PI * radius * radius; }
         double getPerimeter() { return 2 * Math.PI * radius; }
     }
     ```

3. ❌ **Providing Method Body for Abstract Methods**: Writing implementation in abstract method declaration
   - Why: Abstract methods are meant to be declarations only - no body. The body goes in child classes.
   - Fix: Remove the method body. Use semicolon after declaration.
   - Example:
     ```java
     // Wrong - abstract method with body
     abstract class Animal {
         abstract void makeSound() {  // Error: abstract methods cannot have a body
             System.out.println("Sound");
         }
     }

     // Correct - no body
     abstract class Animal {
         abstract void makeSound();  // Declaration only
     }

     class Dog extends Animal {
         void makeSound() {  // Implementation in child
             System.out.println("Woof");
         }
     }
     ```

4. ❌ **Making Everything Abstract**: Declaring all methods as abstract with no concrete methods
   - Why: Defeats the purpose of abstract classes. If everything is abstract, use an interface instead. Abstract classes should provide some shared concrete implementation.
   - Fix: Mix abstract methods (for customization) with concrete methods (for shared behavior).
   - Example:
     ```java
     // Wrong - everything abstract (use interface instead)
     abstract class Shape {
         abstract double getArea();
         abstract double getPerimeter();
         abstract void displayInfo();  // Could be concrete
     }

     // Correct - mix of abstract and concrete
     abstract class Shape {
         protected String color;

         // Concrete - shared by all shapes
         void displayInfo() {
             System.out.println("Shape: " + color);
             System.out.println("Area: " + getArea());
         }

         // Abstract - each shape calculates differently
         abstract double getArea();
         abstract double getPerimeter();
     }
     ```

**🎯 Challenge:**
Create abstract `Shape` class:
1. Abstract methods: getArea(), getPerimeter()
2. Concrete method: displayInfo()
3. Create `Circle`, `Rectangle` that implement abstract methods
4. Test both shapes

**📋 Best Practices:**

✅ **Use Abstract Classes for Partial Implementation**
- **Why:** Share common code while forcing children to implement specific parts
- **How:** Provide concrete methods for shared behavior; abstract methods for required customization
- **Example:**
```java
// ✅ Good - Mix of concrete and abstract
abstract class Shape {
    protected String color;

    // Concrete - shared by all shapes
    void displayInfo() {
        System.out.println("Color: " + color);
        System.out.println("Area: " + getArea());
    }

    // Abstract - each shape calculates differently
    abstract double getArea();
}
```

✅ **Force Consistent API Through Abstract Methods**
- **Why:** Ensures all children provide required functionality
- **How:** Declare abstract methods for operations all children must implement
- **Example:**
```java
abstract class Animal {
    abstract void makeSound();  // All animals must make sound
    abstract void move();       // All animals must move

    // ✅ Compiler enforces implementation
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Woof"); }  // Must implement
    @Override
    void move() { System.out.println("Runs"); }       // Must implement
}
```

✅ **Don't Instantiate Abstract Classes**
- **Why:** Abstract classes are incomplete; they require child implementation
- **How:** Always create instances of concrete child classes
- **Example:**
```java
abstract class Vehicle {
    abstract void start();
}

// ❌ Cannot instantiate
// Vehicle v = new Vehicle();  // Compiler error!

// ✅ Instantiate concrete child
class Car extends Vehicle {
    @Override
    void start() { System.out.println("Car starting"); }
}
Vehicle v = new Car();  // ✅ OK
```

✅ **Mix Abstract and Concrete Methods Strategically**
- **Why:** Provide shared functionality while requiring customization
- **How:** Concrete for common behavior, abstract for type-specific behavior
- **Example:**
```java
abstract class Employee {
    protected String name;
    protected double baseSalary;

    // Concrete - shared logic
    void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Pay: " + calculatePay());
    }

    // Abstract - each type calculates differently
    abstract double calculatePay();
}
```

✅ **Use Abstract Classes When You Need Shared State**
- **Why:** Abstract classes can have fields and constructors; interfaces cannot (pre-Java 8)
- **How:** Use abstract class when children share common fields
- **Example:**
```java
// ✅ Abstract class with shared state
abstract class Shape {
    protected String color;     // Shared field
    protected int x, y;         // Position

    Shape(String color, int x, int y) {  // Constructor
        this.color = color;
        this.x = x;
        this.y = y;
    }

    abstract double getArea();  // Still enforce this
}
```

---

#### Exercise 2: Interfaces (25 minutes)

**What you'll learn:** Creating and implementing interfaces

**Create interface: `Drawable`, `Movable`; Classes: `Circle`, `Rectangle`**

**Concept:** An **interface** is a contract that defines what a class can do (methods) without saying how (implementation). It's 100% abstraction.

```
Interface = Pure contract
All methods are abstract (by default)
Class "implements" interface
Can implement multiple interfaces
```

**Interface vs Abstract Class:**

| Feature | Interface | Abstract Class |
|---------|-----------|----------------|
| Methods | Abstract (default) | Abstract + Concrete |
| Variables | Constants only | Any |
| Inheritance | Multiple | Single |
| Constructor | No | Yes |
| Purpose | Contract/capability | Common code + contract |

**Step-by-Step:**

```java
// INTERFACE 1
interface Drawable {
    // All methods are public abstract by default
    void draw();
    void erase();
}

// INTERFACE 2
interface Movable {
    void moveUp();
    void moveDown();
    void moveLeft();
    void moveRight();
}

// CLASS implementing interfaces
class Circle implements Drawable, Movable {
    int x, y;
    int radius;
    
    Circle(int x, int y, int radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    // Implement Drawable interface
    @Override
    public void draw() {
        System.out.println("Drawing circle at (" + x + "," + y + ") with radius " + radius);
    }
    
    @Override
    public void erase() {
        System.out.println("Erasing circle at (" + x + "," + y + ")");
    }
    
    // Implement Movable interface
    @Override
    public void moveUp() {
        y--;
        System.out.println("Circle moved up to (" + x + "," + y + ")");
    }
    
    @Override
    public void moveDown() {
        y++;
        System.out.println("Circle moved down to (" + x + "," + y + ")");
    }
    
    @Override
    public void moveLeft() {
        x--;
        System.out.println("Circle moved left to (" + x + "," + y + ")");
    }
    
    @Override
    public void moveRight() {
        x++;
        System.out.println("Circle moved right to (" + x + "," + y + ")");
    }
}

class Rectangle implements Drawable, Movable {
    int x, y;
    int width, height;
    
    Rectangle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    // Implement Drawable
    @Override
    public void draw() {
        System.out.println("Drawing rectangle at (" + x + "," + y + ") " + width + "x" + height);
    }
    
    @Override
    public void erase() {
        System.out.println("Erasing rectangle at (" + x + "," + y + ")");
    }
    
    // Implement Movable
    @Override
    public void moveUp() {
        y--;
        System.out.println("Rectangle moved up to (" + x + "," + y + ")");
    }
    
    @Override
    public void moveDown() {
        y++;
        System.out.println("Rectangle moved down to (" + x + "," + y + ")");
    }
    
    @Override
    public void moveLeft() {
        x--;
        System.out.println("Rectangle moved left to (" + x + "," + y + ")");
    }
    
    @Override
    public void moveRight() {
        x++;
        System.out.println("Rectangle moved right to (" + x + "," + y + ")");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        System.out.println("===== INTERFACES =====\n");
        
        Circle circle = new Circle(5, 5, 10);
        Rectangle rectangle = new Rectangle(10, 10, 20, 15);
        
        // Use Drawable interface
        System.out.println("--- Drawable Interface ---");
        circle.draw();
        rectangle.draw();
        
        // Use Movable interface
        System.out.println("\n--- Movable Interface ---");
        circle.moveRight();
        circle.moveDown();
        rectangle.moveLeft();
        rectangle.moveUp();
        
        // Polymorphism with interfaces
        System.out.println("\n--- Polymorphism with Interfaces ---");
        Drawable drawable1 = new Circle(0, 0, 5);
        Drawable drawable2 = new Rectangle(0, 0, 10, 10);
        
        drawable1.draw();
        drawable2.draw();
        
        // Array of interface type
        System.out.println("\n--- Array of Movable Objects ---");
        Movable[] movables = new Movable[2];
        movables[0] = new Circle(1, 1, 3);
        movables[1] = new Rectangle(2, 2, 5, 5);
        
        for (Movable m : movables) {
            m.moveRight();
        }
        
        System.out.println("\n========================");
    }
}
```

**Expected Output:**
```
===== INTERFACES =====

--- Drawable Interface ---
Drawing circle at (5,5) with radius 10
Drawing rectangle at (10,10) 20x15

--- Movable Interface ---
Circle moved right to (6,5)
Circle moved down to (6,6)
Rectangle moved left to (9,10)
Rectangle moved up to (9,9)

--- Polymorphism with Interfaces ---
Drawing circle at (0,0) with radius 5
Drawing rectangle at (0,0) 10x10

--- Array of Movable Objects ---
Circle moved right to (2,1)
Rectangle moved right to (3,2)

========================
```

**💡 Multiple Interfaces:**

```java
// Can implement multiple interfaces
class Circle implements Drawable, Movable {
    // Must implement ALL methods from BOTH interfaces
}

// Cannot extend multiple classes (Java = single inheritance)
class Circle extends Shape1, Shape2 { }  // ❌ ERROR\!

// But CAN extend one class AND implement multiple interfaces
class Circle extends Shape implements Drawable, Movable { }  // ✅ OK\!
```

**Interface Benefits:**

| Benefit | Explanation |
|---------|-------------|
| **Multiple Inheritance** | Class can implement many interfaces |
| **Contract** | Defines what class must do |
| **Flexibility** | Same interface, different implementations |
| **Polymorphism** | Interface reference to implementing objects |

**✅ Success Criteria:**
- Understand interfaces are contracts
- Can implement multiple interfaces
- Know all interface methods must be implemented
- Recognize interfaces enable polymorphism

**Common Mistakes:**

1. ❌ **Forgetting to Implement All Interface Methods**: Implementing interface but missing one or more methods
   - Why: When you say a class "implements" an interface, you're promising to provide implementations for ALL methods declared in that interface.
   - Fix: Implement every single method from the interface, or declare the class as abstract.
   - Example:
     ```java
     interface Drawable {
         void draw();
         void erase();
         void resize();
     }

     // Wrong - missing methods
     class Circle implements Drawable {
         public void draw() { }
         // Error: Circle is not abstract and does not override erase() and resize()
     }

     // Correct - all methods implemented
     class Circle implements Drawable {
         public void draw() { System.out.println("Drawing circle"); }
         public void erase() { System.out.println("Erasing circle"); }
         public void resize() { System.out.println("Resizing circle"); }
     }
     ```

2. ❌ **Not Making Interface Methods public**: Implementing interface methods without public access modifier
   - Why: Interface methods are implicitly public. When implementing them, you must use public (or wider) access modifier. You cannot reduce visibility.
   - Fix: Always declare implemented methods as public.
   - Example:
     ```java
     interface Flyable {
         void fly();  // Implicitly public
     }

     // Wrong - not public
     class Bird implements Flyable {
         void fly() {  // Error: attempting to assign weaker access privileges
             System.out.println("Flying");
         }
     }

     // Correct - public
     class Bird implements Flyable {
         public void fly() {  // Must be public
             System.out.println("Flying");
         }
     }
     ```

3. ❌ **Trying to Create Interface Variables (Fields)**: Trying to put regular instance variables in an interface
   - Why: Interfaces can only have constants (public static final), not instance variables. Interfaces define behavior, not state.
   - Fix: Put instance variables in implementing classes. Use constants in interfaces only when needed.
   - Example:
     ```java
     // Wrong - trying to have instance variables
     interface Animal {
         String name;  // Error: interface variables are implicitly static final, need initialization
         int age;
     }

     // Correct - constants only
     interface Animal {
         int MAX_AGE = 100;  // Constant (public static final)
         void makeSound();   // Method declaration
     }

     // Put instance variables in implementing class
     class Dog implements Animal {
         private String name;  // Instance variable
         private int age;

         public void makeSound() { System.out.println("Woof"); }
     }
     ```

4. ❌ **Confusing Interfaces with Abstract Classes**: Using interface when abstract class would be better, or vice versa
   - Why: Interfaces are for pure contracts (no implementation or state). Abstract classes can have both abstract methods AND concrete methods/fields.
   - Fix: Use interface for pure "can do" contracts. Use abstract class when you need shared implementation.
   - Example:
     ```java
     // Wrong - interface can't have shared implementation
     interface Shape {
         String color;  // Error - can't have instance variables
         void displayInfo() {  // Error - can't have method body
             System.out.println("Color: " + color);
         }
         void getArea();
     }

     // Correct - use abstract class for shared implementation
     abstract class Shape {
         protected String color;  // Shared field

         void displayInfo() {  // Shared concrete method
             System.out.println("Color: " + color);
         }

         abstract double getArea();  // Abstract - each shape implements differently
     }

     // Use interface for pure contract
     interface Drawable {
         void draw();  // All classes must provide their own implementation
     }
     ```

**🎯 Challenge:**
Create:
1. `Playable` interface (play(), pause(), stop())
2. `Recordable` interface (record(), save())
3. `MusicPlayer` class implements Playable
4. `VoiceRecorder` class implements Recordable
5. `SmartPhone` class implements BOTH

**📋 Best Practices:**

✅ **Use Interfaces to Define Contracts**
- **Why:** Interfaces specify what a class can do without dictating how
- **How:** Define interface with method signatures; implementing classes provide behavior
- **Example:**
```java
// ✅ Interface defines contract
interface Drawable {
    void draw();  // What, not how
    void erase();
}

class Circle implements Drawable {
    @Override
    public void draw() {
        // Circle-specific drawing logic
    }
    @Override
    public void erase() {
        // Circle-specific erasing logic
    }
}
```

✅ **Implement Multiple Interfaces for Multiple Capabilities**
- **Why:** Java single inheritance limitation; interfaces enable multiple behaviors
- **How:** Use `implements Interface1, Interface2` to gain multiple capabilities
- **Example:**
```java
// ✅ Multiple interfaces = multiple capabilities
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    @Override
    public void fly() { System.out.println("Duck flying"); }

    @Override
    public void swim() { System.out.println("Duck swimming"); }
}
```

✅ **Prefer Interfaces Over Abstract Classes for Pure Contracts**
- **Why:** Interfaces are more flexible; classes can implement multiple interfaces
- **How:** Use interface when you don't need shared state or implementation
- **Example:**
```java
// ✅ Good - Pure contract
interface Sortable {
    int compareTo(Sortable other);
}

// ❌ Overkill - No shared state/behavior needed
abstract class Sortable {
    abstract int compareTo(Sortable other);
}
```

✅ **Make All Interface Methods public**
- **Why:** Interface methods are implicitly public; explicit declaration prevents confusion
- **How:** Add `public` modifier to interface methods (though not required)
- **Example:**
```java
// ✅ Explicit - Clear intent
interface Drawable {
    public void draw();
    public void erase();
}

// Also OK - Implicitly public
interface Drawable {
    void draw();
    void erase();
}
```

✅ **Use Interfaces for Polymorphism Across Unrelated Classes**
- **Why:** Enables polymorphism without forcing inheritance relationship
- **How:** Unrelated classes implement same interface; process them uniformly
- **Example:**
```java
interface Printable {
    void print();
}

class Document implements Printable {
    public void print() { /* print document */ }
}

class Photo implements Printable {
    public void print() { /* print photo */ }
}

// ✅ Polymorphism without inheritance
Printable[] items = {new Document(), new Photo()};
for (Printable item : items) {
    item.print();  // Each prints differently
}
```

---

### 🎓 Day 14 Summary: Abstraction

**What You Learned:**
1. ✅ Abstract classes and abstract methods
2. ✅ Interfaces and implementing them
3. ✅ Multiple interface implementation
4. ✅ Abstract class vs interface differences

**Key Takeaways:**
- Abstraction hides implementation details
- Abstract classes = partial abstraction
- Interfaces = complete abstraction
- Cannot instantiate abstract classes or interfaces
- Child/implementing class provides concrete implementation

**Abstraction Checklist:**
```
✅ Use abstract class for common code + contract
✅ Use interface for pure contract
✅ Implement all abstract methods
✅ Interface methods are public by default
✅ Can implement multiple interfaces
✅ Cannot instantiate abstract class/interface
✅ Use for polymorphism and flexibility
```

**Week 2 Complete\! 🎉**

You've mastered OOP fundamentals:
- Day 8-9: Classes, Objects, Constructors
- Day 10: Methods & Method Overloading
- Day 11: Encapsulation & Access Modifiers
- Day 12: Inheritance
- Day 13: Polymorphism
- Day 14: Abstraction

**Next: Week 3 - Advanced Java Concepts\!**

---

# ═══════════════════════════════════════════════════════════════════════
# 📚 WEEK 3: ADVANCED JAVA CONCEPTS (DAYS 15-21)
# ═══════════════════════════════════════════════════════════════════════

---

## 📅 DAY 15: STRINGS

### 🎯 Exercise 1: String Basics and Immutability (15 minutes)

**What you'll learn:**
- Understanding String immutability
- String creation methods (literal vs new)
- String pool concept
- Why strings can't be modified

**📖 Concept: String Immutability**

In Java, Strings are **immutable** - once created, they cannot be changed. Any modification creates a new String object.

**Real-world Analogy:**
Think of a String like a printed book - you can't change the text on the pages. If you want different text, you need a new book!

**Why Immutability?**
1. ✅ **Security**: Strings can't be modified after creation
2. ✅ **Thread-safe**: Multiple threads can safely use strings
3. ✅ **Memory efficient**: String pool can reuse identical strings
4. ✅ **Hashcode caching**: Strings can cache their hash values

---

**📝 Step-by-Step Code:**

```java
public class StringImmutability {
    public static void main(String[] args) {
        System.out.println("===== STRING IMMUTABILITY DEMO =====\n");

        // 1. Creating strings - two ways
        System.out.println("--- String Creation ---");
        String s1 = "Hello";           // String literal (recommended)
        String s2 = "Hello";           // Points to same object in pool
        String s3 = new String("Hello"); // New object in heap

        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("s3: " + s3);

        // 2. Testing object equality
        System.out.println("\n--- Object Equality (==) ---");
        System.out.println("s1 == s2: " + (s1 == s2));     // true (same object)
        System.out.println("s1 == s3: " + (s1 == s3));     // false (different objects)

        // 3. Testing content equality
        System.out.println("\n--- Content Equality (equals) ---");
        System.out.println("s1.equals(s2): " + s1.equals(s2));  // true
        System.out.println("s1.equals(s3): " + s1.equals(s3));  // true

        // 4. Demonstrating immutability
        System.out.println("\n--- Immutability Test ---");
        String original = "Java";
        System.out.println("Original string: " + original);

        String modified = original.concat(" Programming");
        System.out.println("After concat:");
        System.out.println("  original: " + original);     // Still "Java"
        System.out.println("  modified: " + modified);     // "Java Programming"

        // 5. String pool demonstration
        System.out.println("\n--- String Pool ---");
        String pool1 = "Programming";
        String pool2 = "Programming";
        String heap1 = new String("Programming");

        System.out.println("pool1 == pool2: " + (pool1 == pool2));  // true
        System.out.println("pool1 == heap1: " + (pool1 == heap1));  // false

        // But intern() can move to pool
        String heap2 = new String("Programming").intern();
        System.out.println("pool1 == heap2: " + (pool1 == heap2));  // true
    }
}
```

**Expected Output:**
```
===== STRING IMMUTABILITY DEMO =====

--- String Creation ---
s1: Hello
s2: Hello
s3: Hello

--- Object Equality (==) ---
s1 == s2: true
s1 == s3: false

--- Content Equality (equals) ---
s1.equals(s2): true
s1.equals(s3): true

--- Immutability Test ---
Original string: Java
After concat:
  original: Java
  modified: Java Programming

--- String Pool ---
pool1 == pool2: true
pool1 == heap1: false
pool1 == heap2: true
```

**✅ Success Criteria:**
- [ ] Program compiles without errors
- [ ] Understand difference between == and equals()
- [ ] Can explain why original string doesn't change
- [ ] Understand string pool concept
- [ ] Know when to use literal vs new

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `if (str1 == str2)` for content | Compares references, not content | `if (str1.equals(str2))` |
| `String s = new String("text")` | Creates unnecessary object | `String s = "text"` |
| Expecting `original.concat()` to modify original | Strings are immutable | `original = original.concat()` |
| Using `==` after string operations | Operations create new objects | Always use `equals()` |

**🎯 Challenge:**
1. Create 5 String variables with value "Java"
2. Use both literal and new keyword
3. Use == to find which ones point to same object
4. Use equals() to verify all have same content
5. Print a table showing the results

---

### 🎯 Exercise 2: String Methods - charAt, indexOf, substring (20 minutes)

**What you'll learn:**
- Accessing individual characters with charAt()
- Finding character/substring positions with indexOf()
- Extracting parts of strings with substring()
- Getting string length

**📖 Concept: String Inspection Methods**

Java provides powerful methods to inspect and extract parts of strings.

**Essential Methods:**
1. **length()** - Returns number of characters
2. **charAt(index)** - Returns character at position
3. **indexOf(char/string)** - Returns first occurrence position
4. **lastIndexOf(char/string)** - Returns last occurrence position
5. **substring(start, end)** - Extracts part of string

---

**📝 Step-by-Step Code:**

```java
public class StringMethods1 {
    public static void main(String[] args) {
        System.out.println("===== STRING INSPECTION METHODS =====\n");

        String text = "Java Programming Language";
        System.out.println("Text: " + text);
        System.out.println();

        // 1. length() - Get string length
        System.out.println("--- length() Method ---");
        System.out.println("Length: " + text.length());
        System.out.println("Last index: " + (text.length() - 1));
        System.out.println();

        // 2. charAt() - Get character at index
        System.out.println("--- charAt() Method ---");
        System.out.println("First character: " + text.charAt(0));
        System.out.println("5th character: " + text.charAt(4));
        System.out.println("Last character: " + text.charAt(text.length() - 1));

        // Print all characters
        System.out.print("All characters: ");
        for (int i = 0; i < text.length(); i++) {
            System.out.print(text.charAt(i) + " ");
        }
        System.out.println("\n");

        // 3. indexOf() - Find position
        System.out.println("--- indexOf() Method ---");
        System.out.println("Index of 'a': " + text.indexOf('a'));
        System.out.println("Index of 'P': " + text.indexOf('P'));
        System.out.println("Index of 'Programming': " + text.indexOf("Programming"));
        System.out.println("Index of 'Python': " + text.indexOf("Python"));  // -1 (not found)

        // Find all occurrences of 'a'
        System.out.print("All positions of 'a': ");
        int index = text.indexOf('a');
        while (index >= 0) {
            System.out.print(index + " ");
            index = text.indexOf('a', index + 1);
        }
        System.out.println("\n");

        // 4. lastIndexOf() - Find last occurrence
        System.out.println("--- lastIndexOf() Method ---");
        System.out.println("First 'a': " + text.indexOf('a'));
        System.out.println("Last 'a': " + text.lastIndexOf('a'));
        System.out.println("Last 'g': " + text.lastIndexOf('g'));
        System.out.println();

        // 5. substring() - Extract parts
        System.out.println("--- substring() Method ---");
        System.out.println("substring(0, 4): " + text.substring(0, 4));     // "Java"
        System.out.println("substring(5, 16): " + text.substring(5, 16));   // "Programming"
        System.out.println("substring(17): " + text.substring(17));         // "Language"
        System.out.println("substring(5): " + text.substring(5));           // "Programming Language"

        // 6. Practical example: Extract email parts
        System.out.println("\n--- Practical Example ---");
        String email = "user@example.com";
        int atIndex = email.indexOf('@');
        int dotIndex = email.lastIndexOf('.');

        String username = email.substring(0, atIndex);
        String domain = email.substring(atIndex + 1, dotIndex);
        String extension = email.substring(dotIndex + 1);

        System.out.println("Email: " + email);
        System.out.println("  Username: " + username);
        System.out.println("  Domain: " + domain);
        System.out.println("  Extension: " + extension);
    }
}
```

**Expected Output:**
```
===== STRING INSPECTION METHODS =====

Text: Java Programming Language

--- length() Method ---
Length: 25
Last index: 24

--- charAt() Method ---
First character: J
5th character:
Last character: e
All characters: J a v a   P r o g r a m m i n g   L a n g u a g e

--- indexOf() Method ---
Index of 'a': 1
Index of 'P': 5
Index of 'Programming': 5
Index of 'Python': -1
All positions of 'a': 1 3 9 19 23

--- lastIndexOf() Method ---
First 'a': 1
Last 'a': 23
Last 'g': 24

--- substring() Method ---
substring(0, 4): Java
substring(5, 16): Programming
substring(17): Language
substring(5): Programming Language

--- Practical Example ---
Email: user@example.com
  Username: user
  Domain: example
  Extension: com
```

**✅ Success Criteria:**
- [ ] Can find any character in a string
- [ ] Can extract substrings correctly
- [ ] Understand indexOf returns -1 when not found
- [ ] Can find all occurrences of a character
- [ ] Can parse structured strings (like emails)

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `charAt(text.length())` | Index out of bounds | `charAt(text.length() - 1)` |
| `substring(5, 5)` expecting 1 char | Returns empty string | `substring(5, 6)` or `charAt(5)` |
| Not checking indexOf() result | May get -1 (not found) | `if (index >= 0) { ... }` |
| `substring(end, start)` | Start must be ≤ end | `substring(start, end)` |

**🎯 Challenge:**
Create a program that:
1. Takes a string: "The quick brown fox jumps over the lazy dog"
2. Finds all positions of the word "the" (case-insensitive)
3. Extracts and prints each word that starts with 'b' or 'q'
4. Counts how many times each vowel appears

---

### 🎯 Exercise 3: String Methods - split, trim, replace (20 minutes)

**What you'll learn:**
- Splitting strings into arrays with split()
- Removing whitespace with trim()
- Replacing characters/strings with replace()
- Converting case with toUpperCase/toLowerCase

**📖 Concept: String Manipulation Methods**

These methods help you transform and clean string data.

---

**📝 Step-by-Step Code:**

```java
public class StringMethods2 {
    public static void main(String[] args) {
        System.out.println("===== STRING MANIPULATION METHODS =====\n");

        // 1. split() - Split string into array
        System.out.println("--- split() Method ---");
        String sentence = "Java is awesome and powerful";
        String[] words = sentence.split(" ");

        System.out.println("Sentence: " + sentence);
        System.out.println("Word count: " + words.length);
        System.out.print("Words: ");
        for (String word : words) {
            System.out.print("[" + word + "] ");
        }
        System.out.println("\n");

        // Split CSV data
        String csvData = "John,25,Engineer,New York";
        String[] data = csvData.split(",");
        System.out.println("CSV: " + csvData);
        System.out.println("Name: " + data[0]);
        System.out.println("Age: " + data[1]);
        System.out.println("Job: " + data[2]);
        System.out.println("City: " + data[3]);
        System.out.println();

        // 2. trim() - Remove leading/trailing spaces
        System.out.println("--- trim() Method ---");
        String messy = "   Hello World   ";
        System.out.println("Original: [" + messy + "]");
        System.out.println("Trimmed: [" + messy.trim() + "]");
        System.out.println("Length before: " + messy.length());
        System.out.println("Length after: " + messy.trim().length());
        System.out.println();

        // 3. replace() - Replace characters/strings
        System.out.println("--- replace() Method ---");
        String text = "I love Java. Java is great!";
        System.out.println("Original: " + text);
        System.out.println("Replace 'Java' with 'Python': " + text.replace("Java", "Python"));
        System.out.println("Replace 'a' with 'X': " + text.replace('a', 'X'));
        System.out.println("Original (unchanged): " + text);  // Immutability!
        System.out.println();

        // 4. replaceAll() - Replace with regex
        System.out.println("--- replaceAll() Method ---");
        String phoneNumber = "123-456-7890";
        System.out.println("Phone: " + phoneNumber);
        System.out.println("Remove dashes: " + phoneNumber.replaceAll("-", ""));

        String textWithNumbers = "abc123def456ghi";
        System.out.println("Text: " + textWithNumbers);
        System.out.println("Remove digits: " + textWithNumbers.replaceAll("\\d", ""));
        System.out.println();

        // 5. toUpperCase() and toLowerCase()
        System.out.println("--- Case Conversion ---");
        String mixed = "Hello World";
        System.out.println("Original: " + mixed);
        System.out.println("Uppercase: " + mixed.toUpperCase());
        System.out.println("Lowercase: " + mixed.toLowerCase());
        System.out.println();

        // 6. Practical example: Clean and format user input
        System.out.println("--- Practical Example: Data Cleaning ---");
        String userInput = "  john.doe@EXAMPLE.com   ";
        String cleaned = userInput.trim().toLowerCase();
        System.out.println("Raw input: [" + userInput + "]");
        System.out.println("Cleaned: [" + cleaned + "]");

        // Format name
        String name = "  JOHN   DOE  ";
        String formatted = formatName(name);
        System.out.println("Raw name: [" + name + "]");
        System.out.println("Formatted: [" + formatted + "]");
    }

    // Helper method to format names
    public static String formatName(String name) {
        // Trim and split by spaces
        String trimmed = name.trim();
        String[] parts = trimmed.split("\\s+");  // Split by any whitespace

        // Capitalize each part
        String result = "";
        for (int i = 0; i < parts.length; i++) {
            String part = parts[i].toLowerCase();
            String capitalized = part.substring(0, 1).toUpperCase() + part.substring(1);
            result += capitalized;
            if (i < parts.length - 1) {
                result += " ";
            }
        }
        return result;
    }
}
```

**Expected Output:**
```
===== STRING MANIPULATION METHODS =====

--- split() Method ---
Sentence: Java is awesome and powerful
Word count: 5
Words: [Java] [is] [awesome] [and] [powerful]

CSV: John,25,Engineer,New York
Name: John
Age: 25
Job: Engineer
City: New York

--- trim() Method ---
Original: [   Hello World   ]
Trimmed: [Hello World]
Length before: 17
Length after: 11

--- replace() Method ---
Original: I love Java. Java is great!
Replace 'Java' with 'Python': I love Python. Python is great!
Replace 'a' with 'X': I love JXvX. JXvX is greXt!
Original (unchanged): I love Java. Java is great!

--- replaceAll() Method ---
Phone: 123-456-7890
Remove dashes: 1234567890
Text: abc123def456ghi
Remove digits: abcdefghi

--- Case Conversion ---
Original: Hello World
Uppercase: HELLO WORLD
Lowercase: hello world

--- Practical Example: Data Cleaning ---
Raw input: [  john.doe@EXAMPLE.com   ]
Cleaned: [john.doe@example.com]
Raw name: [  JOHN   DOE  ]
Formatted: [John Doe]
```

**✅ Success Criteria:**
- [ ] Can split strings into arrays
- [ ] Can clean messy input with trim()
- [ ] Understand replace() creates new string
- [ ] Can convert case for comparison
- [ ] Can parse and format structured data

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `split(".")` for splitting by dot | `.` is regex special char | `split("\\.")` |
| Forgetting trim() on user input | May have hidden spaces | Always `input.trim()` |
| `str = str.replace()` without assignment | Doesn't modify original | `str = str.replace()` |
| Case-sensitive comparison | "Java" ≠ "java" | Convert to same case first |

**🎯 Challenge:**
Create a program that:
1. Takes input: "  apple, BANANA ,  Orange  , grape  "
2. Splits by comma
3. Trims each item
4. Capitalizes first letter of each
5. Joins back with " | " separator
6. Expected output: "Apple | Banana | Orange | Grape"

---


### 🎯 Exercise 4: String Comparison (equals vs ==) (15 minutes)

**What you'll learn:**
- Difference between == and equals()
- When to use each comparison method
- Case-insensitive comparison with equalsIgnoreCase()
- Understanding compareTo() for sorting

**📖 Concept: String Comparison**

**Critical Rule:** ALWAYS use `equals()` to compare string content, NOT `==`

- **==** compares object references (memory addresses)
- **equals()** compares actual content

---

**📝 Step-by-Step Code:**

```java
public class StringComparison {
    public static void main(String[] args) {
        System.out.println("===== STRING COMPARISON =====\n");

        // 1. == vs equals() demonstration
        System.out.println("--- == vs equals() ---");
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        String s4 = "JAVA";

        System.out.println("s1 = \"Java\" (literal)");
        System.out.println("s2 = \"Java\" (literal)");
        System.out.println("s3 = new String(\"Java\")");
        System.out.println("s4 = \"JAVA\"\n");

        System.out.println("s1 == s2: " + (s1 == s2));           // true (same object)
        System.out.println("s1 == s3: " + (s1 == s3));           // false (different objects)
        System.out.println("s1.equals(s2): " + s1.equals(s2));   // true (same content)
        System.out.println("s1.equals(s3): " + s1.equals(s3));   // true (same content)
        System.out.println("s1.equals(s4): " + s1.equals(s4));   // false (different case)
        System.out.println();

        // 2. Case-insensitive comparison
        System.out.println("--- equalsIgnoreCase() ---");
        System.out.println("s1.equalsIgnoreCase(s4): " + s1.equalsIgnoreCase(s4));  // true

        String email1 = "user@example.com";
        String email2 = "USER@EXAMPLE.COM";
        System.out.println("Email comparison:");
        System.out.println("  equals(): " + email1.equals(email2));                    // false
        System.out.println("  equalsIgnoreCase(): " + email1.equalsIgnoreCase(email2)); // true
        System.out.println();

        // 3. compareTo() - Lexicographic comparison
        System.out.println("--- compareTo() Method ---");
        String str1 = "Apple";
        String str2 = "Banana";
        String str3 = "Apple";

        System.out.println("str1 = \"Apple\"");
        System.out.println("str2 = \"Banana\"");
        System.out.println("str3 = \"Apple\"\n");

        int result1 = str1.compareTo(str2);
        int result2 = str2.compareTo(str1);
        int result3 = str1.compareTo(str3);

        System.out.println("str1.compareTo(str2): " + result1 + " (negative = str1 comes first)");
        System.out.println("str2.compareTo(str1): " + result2 + " (positive = str2 comes after)");
        System.out.println("str1.compareTo(str3): " + result3 + " (zero = equal)");
        System.out.println();

        // 4. Practical example: User authentication
        System.out.println("--- Practical Example: Login System ---");
        String correctPassword = "SecurePass123";

        String attempt1 = "SecurePass123";
        String attempt2 = "securepass123";
        String attempt3 = new String("SecurePass123");

        System.out.println("Correct password: " + correctPassword);
        System.out.println();

        System.out.println("Attempt 1: \"SecurePass123\"");
        if (correctPassword.equals(attempt1)) {
            System.out.println("  ✅ Login successful\!");
        } else {
            System.out.println("  ❌ Login failed\!");
        }

        System.out.println("\nAttempt 2: \"securepass123\"");
        if (correctPassword.equals(attempt2)) {
            System.out.println("  ✅ Login successful\!");
        } else {
            System.out.println("  ❌ Login failed\! (Case sensitive)");
        }

        System.out.println("\nAttempt 3: new String(\"SecurePass123\")");
        if (correctPassword == attempt3) {
            System.out.println("  ✅ Login successful\! (using ==)");
        } else {
            System.out.println("  ❌ Failed with == (different objects\!)");
        }

        if (correctPassword.equals(attempt3)) {
            System.out.println("  ✅ Login successful\! (using equals)");
        }

        // 5. Sorting example
        System.out.println("\n--- Sorting with compareTo() ---");
        String[] fruits = {"Banana", "Apple", "Orange", "Grape"};
        System.out.print("Before sorting: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }

        // Bubble sort using compareTo()
        for (int i = 0; i < fruits.length - 1; i++) {
            for (int j = 0; j < fruits.length - i - 1; j++) {
                if (fruits[j].compareTo(fruits[j + 1]) > 0) {
                    String temp = fruits[j];
                    fruits[j] = fruits[j + 1];
                    fruits[j + 1] = temp;
                }
            }
        }

        System.out.print("\nAfter sorting: ");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();
    }
}
```

**Expected Output:**
```
===== STRING COMPARISON =====

--- == vs equals() ---
s1 = "Java" (literal)
s2 = "Java" (literal)
s3 = new String("Java")
s4 = "JAVA"

s1 == s2: true
s1 == s3: false
s1.equals(s2): true
s1.equals(s3): true
s1.equals(s4): false

--- equalsIgnoreCase() ---
s1.equalsIgnoreCase(s4): true
Email comparison:
  equals(): false
  equalsIgnoreCase(): true

--- compareTo() Method ---
str1 = "Apple"
str2 = "Banana"
str3 = "Apple"

str1.compareTo(str2): -1 (negative = str1 comes first)
str2.compareTo(str1): 1 (positive = str2 comes after)
str1.compareTo(str3): 0 (zero = equal)

--- Practical Example: Login System ---
Correct password: SecurePass123

Attempt 1: "SecurePass123"
  ✅ Login successful\!

Attempt 2: "securepass123"
  ❌ Login failed\! (Case sensitive)

Attempt 3: new String("SecurePass123")
  ❌ Failed with == (different objects\!)
  ✅ Login successful\! (using equals)

--- Sorting with compareTo() ---
Before sorting: Banana Apple Orange Grape
After sorting: Apple Banana Grape Orange
```

**✅ Success Criteria:**
- [ ] Never use == for string content comparison
- [ ] Always use equals() for content comparison
- [ ] Use equalsIgnoreCase() when case doesn't matter
- [ ] Understand compareTo() returns negative/zero/positive
- [ ] Can implement string sorting

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `if (str1 == str2)` for content | Compares references | `if (str1.equals(str2))` |
| `if (str.equals(""))` for empty check | Verbose | `if (str.isEmpty())` or `if (str.length() == 0)` |
| `if (str == null || str.equals(""))` | NullPointerException if null | `if (str == null || str.isEmpty())` |
| Not handling null before equals() | May crash | Check null first |

**🎯 Challenge:**
Create a program that:
1. Stores array of usernames: ["Admin", "admin", "ADMIN", "user1"]
2. Takes login attempt: "admin"
3. Checks if username exists (case-insensitive)
4. Sorts all usernames alphabetically
5. Prints results

---

### 🎯 Exercise 5: StringBuilder for Efficient String Building (25 minutes)

**What you'll learn:**
- Why StringBuilder is faster than String concatenation
- Creating and using StringBuilder
- Common StringBuilder methods
- When to use StringBuilder vs String

**📖 Concept: StringBuilder**

**Problem with String concatenation:**
```java
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // Creates 1000 new String objects\!
}
```

**Solution: StringBuilder**
```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);  // Modifies same object\!
}
String result = sb.toString();
```

**When to use StringBuilder:**
- ✅ Loops with string concatenation
- ✅ Building strings from multiple parts
- ✅ Dynamic string construction
- ❌ Simple concatenation (use + operator)

---

**📝 Step-by-Step Code:**

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        System.out.println("===== STRINGBUILDER DEMO =====\n");

        // 1. Creating StringBuilder
        System.out.println("--- Creating StringBuilder ---");
        StringBuilder sb1 = new StringBuilder();
        StringBuilder sb2 = new StringBuilder("Hello");
        StringBuilder sb3 = new StringBuilder(50);  // Initial capacity

        System.out.println("Empty StringBuilder: [" + sb1 + "]");
        System.out.println("With initial text: [" + sb2 + "]");
        System.out.println("With capacity 50: [" + sb3 + "] (length: " + sb3.length() + ")");
        System.out.println();

        // 2. append() - Add to end
        System.out.println("--- append() Method ---");
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("Initial: " + sb);

        sb.append(" World");
        System.out.println("After append(\" World\"): " + sb);

        sb.append('\!');
        System.out.println("After append('\!'): " + sb);

        sb.append(123);
        System.out.println("After append(123): " + sb);

        sb.append(true);
        System.out.println("After append(true): " + sb);
        System.out.println();

        // 3. insert() - Add at position
        System.out.println("--- insert() Method ---");
        StringBuilder sb4 = new StringBuilder("Hello World");
        System.out.println("Original: " + sb4);

        sb4.insert(6, "Beautiful ");
        System.out.println("After insert(6, \"Beautiful \"): " + sb4);

        sb4.insert(0, "** ");
        System.out.println("After insert(0, \"** \"): " + sb4);
        System.out.println();

        // 4. delete() and deleteCharAt()
        System.out.println("--- delete() Methods ---");
        StringBuilder sb5 = new StringBuilder("Hello Beautiful World");
        System.out.println("Original: " + sb5);

        sb5.delete(6, 16);  // Delete "Beautiful "
        System.out.println("After delete(6, 16): " + sb5);

        sb5.deleteCharAt(5);  // Delete space
        System.out.println("After deleteCharAt(5): " + sb5);
        System.out.println();

        // 5. reverse()
        System.out.println("--- reverse() Method ---");
        StringBuilder sb6 = new StringBuilder("Java Programming");
        System.out.println("Original: " + sb6);
        sb6.reverse();
        System.out.println("Reversed: " + sb6);
        sb6.reverse();  // Reverse back
        System.out.println("Reversed again: " + sb6);
        System.out.println();

        // 6. replace() and setCharAt()
        System.out.println("--- replace() and setCharAt() ---");
        StringBuilder sb7 = new StringBuilder("I love Python");
        System.out.println("Original: " + sb7);

        sb7.replace(7, 13, "Java");
        System.out.println("After replace(7, 13, \"Java\"): " + sb7);

        sb7.setCharAt(0, 'W');
        System.out.println("After setCharAt(0, 'W'): " + sb7);
        System.out.println();

        // 7. Performance comparison
        System.out.println("--- Performance Comparison ---");
        int iterations = 10000;

        // String concatenation
        long start1 = System.currentTimeMillis();
        String str = "";
        for (int i = 0; i < iterations; i++) {
            str += i;
        }
        long end1 = System.currentTimeMillis();
        System.out.println("String concatenation: " + (end1 - start1) + " ms");

        // StringBuilder
        long start2 = System.currentTimeMillis();
        StringBuilder sbPerf = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sbPerf.append(i);
        }
        String result = sbPerf.toString();
        long end2 = System.currentTimeMillis();
        System.out.println("StringBuilder: " + (end2 - start2) + " ms");
        System.out.println();

        // 8. Practical example: Build HTML
        System.out.println("--- Practical Example: HTML Builder ---");
        String[] items = {"Apple", "Banana", "Orange", "Grape"};

        StringBuilder html = new StringBuilder();
        html.append("<ul>\n");
        for (String item : items) {
            html.append("  <li>").append(item).append("</li>\n");
        }
        html.append("</ul>");

        System.out.println(html);
        System.out.println();

        // 9. Practical example: Format table
        System.out.println("--- Practical Example: Table Formatter ---");
        String[][] data = {
            {"John", "25", "Engineer"},
            {"Alice", "30", "Doctor"},
            {"Bob", "28", "Teacher"}
        };

        String table = formatTable(data);
        System.out.println(table);
    }

    // Helper method to format table
    public static String formatTable(String[][] data) {
        StringBuilder sb = new StringBuilder();
        sb.append("╔════════════╦═════╦═══════════╗\n");
        sb.append("║ Name       ║ Age ║ Job       ║\n");
        sb.append("╠════════════╬═════╬═══════════╣\n");

        for (String[] row : data) {
            sb.append("║ ");
            sb.append(String.format("%-10s", row[0]));
            sb.append(" ║ ");
            sb.append(String.format("%-3s", row[1]));
            sb.append(" ║ ");
            sb.append(String.format("%-9s", row[2]));
            sb.append(" ║\n");
        }

        sb.append("╚════════════╩═════╩═══════════╝");
        return sb.toString();
    }
}
```

**Expected Output:**
```
===== STRINGBUILDER DEMO =====

--- Creating StringBuilder ---
Empty StringBuilder: []
With initial text: [Hello]
With capacity 50: [] (length: 0)

--- append() Method ---
Initial: Hello
After append(" World"): Hello World
After append('\!'): Hello World\!
After append(123): Hello World\!123
After append(true): Hello World\!123true

--- insert() Method ---
Original: Hello World
After insert(6, "Beautiful "): Hello Beautiful World
After insert(0, "** "): ** Hello Beautiful World

--- delete() Methods ---
Original: Hello Beautiful World
After delete(6, 16): Hello World
After deleteCharAt(5): HelloWorld

--- reverse() Method ---
Original: Java Programming
Reversed: gnimmargorP avaJ
Reversed again: Java Programming

--- replace() and setCharAt() ---
Original: I love Python
After replace(7, 13, "Java"): I love Java
After setCharAt(0, 'W'): W love Java

--- Performance Comparison ---
String concatenation: 145 ms
StringBuilder: 2 ms

--- Practical Example: HTML Builder ---
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
  <li>Grape</li>
</ul>

--- Practical Example: Table Formatter ---
╔════════════╦═════╦═══════════╗
║ Name       ║ Age ║ Job       ║
╠════════════╬═════╬═══════════╣
║ John       ║ 25  ║ Engineer  ║
║ Alice      ║ 30  ║ Doctor    ║
║ Bob        ║ 28  ║ Teacher   ║
╚════════════╩═════╩═══════════╝
```

**✅ Success Criteria:**
- [ ] Can create and use StringBuilder
- [ ] Understand append(), insert(), delete()
- [ ] Know when StringBuilder is better than String
- [ ] Can convert StringBuilder to String with toString()
- [ ] Understand performance benefits

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `String s = sb` | Type mismatch | `String s = sb.toString()` |
| Using + with StringBuilder | Less readable | Use `.append()` |
| `StringBuilder` for simple concat | Overkill | Use `String s = a + b` |
| Forgetting `toString()` | Can't assign to String | Always call `toString()` |

**🎯 Challenge:**
Create a program that:
1. Takes array of numbers: [1, 2, 3, 4, 5]
2. Uses StringBuilder to create: "[1, 2, 3, 4, 5]"
3. Creates: "1 + 2 + 3 + 4 + 5 = 15"
4. Reverses the number string
5. Measures performance vs String concatenation

---

### 🎯 Exercise 6: Common String Problems (25 minutes)

**What you'll learn:**
- Checking if a string is palindrome
- Reversing a string
- Counting vowels and consonants
- Removing duplicates from a string

**📖 Concept: String Algorithms**

Common string problems help you master string manipulation and logical thinking.

---

**📝 Step-by-Step Code:**

```java
public class StringAlgorithms {
    public static void main(String[] args) {
        System.out.println("===== COMMON STRING PROBLEMS =====\n");

        // Problem 1: Palindrome Checker
        System.out.println("--- Problem 1: Palindrome Checker ---");
        String[] words = {"radar", "hello", "level", "world", "madam"};

        for (String word : words) {
            boolean isPalindrome = checkPalindrome(word);
            System.out.println(word + " -> " + (isPalindrome ? "✅ Palindrome" : "❌ Not palindrome"));
        }
        System.out.println();

        // Problem 2: Reverse String
        System.out.println("--- Problem 2: Reverse String ---");
        String original = "Hello World";
        String reversed1 = reverseUsingStringBuilder(original);
        String reversed2 = reverseManually(original);

        System.out.println("Original: " + original);
        System.out.println("Reversed (StringBuilder): " + reversed1);
        System.out.println("Reversed (Manual): " + reversed2);
        System.out.println();

        // Problem 3: Count Vowels and Consonants
        System.out.println("--- Problem 3: Count Vowels & Consonants ---");
        String text = "Hello World Programming";
        countVowelsConsonants(text);
        System.out.println();

        // Problem 4: Count Word Occurrences
        System.out.println("--- Problem 4: Count Word Occurrences ---");
        String sentence = "Java is great and Java is powerful and Java is fun";
        String searchWord = "Java";
        int count = countWordOccurrences(sentence, searchWord);
        System.out.println("Sentence: " + sentence);
        System.out.println("Word '" + searchWord + "' appears " + count + " times");
        System.out.println();

        // Problem 5: Remove Duplicates
        System.out.println("--- Problem 5: Remove Duplicate Characters ---");
        String withDuplicates = "programming";
        String withoutDuplicates = removeDuplicates(withDuplicates);
        System.out.println("Original: " + withDuplicates);
        System.out.println("After removing duplicates: " + withoutDuplicates);
        System.out.println();

        // Problem 6: First Non-Repeating Character
        System.out.println("--- Problem 6: First Non-Repeating Character ---");
        String str = "programming";
        char firstNonRepeating = findFirstNonRepeating(str);
        System.out.println("String: " + str);
        if (firstNonRepeating \!= '\0') {
            System.out.println("First non-repeating character: " + firstNonRepeating);
        } else {
            System.out.println("No non-repeating character found");
        }
    }

    // Method 1: Check if string is palindrome
    public static boolean checkPalindrome(String str) {
        str = str.toLowerCase();  // Case-insensitive
        int left = 0;
        int right = str.length() - 1;

        while (left < right) {
            if (str.charAt(left) \!= str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    // Method 2a: Reverse using StringBuilder
    public static String reverseUsingStringBuilder(String str) {
        return new StringBuilder(str).reverse().toString();
    }

    // Method 2b: Reverse manually
    public static String reverseManually(String str) {
        char[] chars = str.toCharArray();
        int left = 0;
        int right = chars.length - 1;

        while (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        return new String(chars);
    }

    // Method 3: Count vowels and consonants
    public static void countVowelsConsonants(String str) {
        str = str.toLowerCase();
        int vowels = 0;
        int consonants = 0;
        int spaces = 0;

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);

            if (ch == ' ') {
                spaces++;
            } else if (Character.isLetter(ch)) {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }

        System.out.println("Text: " + str);
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        System.out.println("Spaces: " + spaces);
    }

    // Method 4: Count word occurrences
    public static int countWordOccurrences(String sentence, String word) {
        int count = 0;
        int index = 0;

        while ((index = sentence.indexOf(word, index)) \!= -1) {
            count++;
            index += word.length();
        }
        return count;
    }

    // Method 5: Remove duplicate characters
    public static String removeDuplicates(String str) {
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            // Add character only if it's not already in result
            if (result.indexOf(String.valueOf(ch)) == -1) {
                result.append(ch);
            }
        }
        return result.toString();
    }

    // Method 6: Find first non-repeating character
    public static char findFirstNonRepeating(String str) {
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            boolean isUnique = true;

            // Check if character appears again in string
            for (int j = 0; j < str.length(); j++) {
                if (i \!= j && str.charAt(j) == ch) {
                    isUnique = false;
                    break;
                }
            }

            if (isUnique) {
                return ch;
            }
        }
        return '\0';  // Return null character if none found
    }
}
```

**Expected Output:**
```
===== COMMON STRING PROBLEMS =====

--- Problem 1: Palindrome Checker ---
radar -> ✅ Palindrome
hello -> ❌ Not palindrome
level -> ✅ Palindrome
world -> ❌ Not palindrome
madam -> ✅ Palindrome

--- Problem 2: Reverse String ---
Original: Hello World
Reversed (StringBuilder): dlroW olleH
Reversed (Manual): dlroW olleH

--- Problem 3: Count Vowels & Consonants ---
Text: hello world programming
Vowels: 6
Consonants: 15
Spaces: 2

--- Problem 4: Count Word Occurrences ---
Sentence: Java is great and Java is powerful and Java is fun
Word 'Java' appears 3 times

--- Problem 5: Remove Duplicate Characters ---
Original: programming
After removing duplicates: progamin

--- Problem 6: First Non-Repeating Character ---
String: programming
First non-repeating character: p
```

**✅ Success Criteria:**
- [ ] Can check if string is palindrome
- [ ] Can reverse string two different ways
- [ ] Can count specific characters
- [ ] Can find and count substrings
- [ ] Can remove duplicates
- [ ] Understand character-by-character processing

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Case-sensitive palindrome check | "Radar" fails | Convert to lowercase first |
| Not handling spaces in palindrome | "race car" fails | Remove spaces or skip them |
| Using `==` for character comparison | May fail | Use `charAt()` or `equals()` |
| Infinite loop in indexOf() | Forget to increment index | `index += word.length()` |

**🎯 Challenge:**
Create a comprehensive String utility class with methods:
1. `isAnagram(String s1, String s2)` - Check if two strings are anagrams
2. `capitalizeWords(String s)` - Capitalize first letter of each word
3. `countWords(String s)` - Count number of words
4. `isPalindrome(String s)` - Ignore spaces and case
5. `longestWord(String s)` - Find the longest word
Test all methods with sample data\!

---

### 🎓 Day 15 Summary: Strings

**What You Learned:**
1. ✅ String immutability and string pool
2. ✅ Essential string methods (charAt, indexOf, substring, split, trim, replace)
3. ✅ String comparison (equals, equalsIgnoreCase, compareTo)
4. ✅ StringBuilder for efficient string building
5. ✅ Common string algorithms (palindrome, reverse, counting)

**Key Takeaways:**
- Strings are immutable - operations create new strings
- Always use `equals()` for content comparison, not `==`
- Use StringBuilder for loops with concatenation
- Master basic string methods before complex algorithms
- Practice makes perfect with string manipulation

**String Methods Checklist:**
```
✅ length() - Get string length
✅ charAt(index) - Get character at position
✅ indexOf() / lastIndexOf() - Find position
✅ substring(start, end) - Extract part
✅ split(delimiter) - Split into array
✅ trim() - Remove leading/trailing spaces
✅ replace() - Replace characters/strings
✅ toUpperCase() / toLowerCase() - Convert case
✅ equals() / equalsIgnoreCase() - Compare content
✅ compareTo() - Lexicographic comparison
```

**Next: Day 16 - Packages & Static Keyword\!**

---

## 📅 DAY 16: PACKAGES & STATIC KEYWORD

### 🎯 Exercise 1: Understanding Packages Basics (15 minutes)

**What you'll learn:**
- Creating packages in Java
- Package naming conventions
- How packages organize code
- Package declaration syntax

**📖 Concept: Packages**

Packages are like folders for your Java classes. They help organize code and prevent naming conflicts.

**Real-world Analogy:**
Think of packages like organizing files in your computer:
- `com/company/project/models/` = Models folder
- `com/company/project/utils/` = Utilities folder
- `com/company/project/main/` = Main application folder

**Package Naming Convention:**
- All lowercase letters
- Reverse domain name: `com.company.project`
- Use dots to separate levels

---

**📝 Step-by-Step Code:**

**Step 1: Create a simple class WITHOUT package**

```java
// File: SimpleClass.java (no package)
public class SimpleClass {
    public void display() {
        System.out.println("No package - default package");
    }
    
    public static void main(String[] args) {
        SimpleClass obj = new SimpleClass();
        obj.display();
    }
}
```

**Step 2: Create a class WITH package**

```java
// File: com/mycompany/demo/PackageDemo.java
package com.mycompany.demo;

public class PackageDemo {
    public void display() {
        System.out.println("Package: com.mycompany.demo");
    }
    
    public static void main(String[] args) {
        PackageDemo obj = new PackageDemo();
        obj.display();
        System.out.println("Class name: " + obj.getClass().getName());
    }
}
```

**Step 3: Create multiple classes in same package**

```java
// File: com/mycompany/models/Student.java
package com.mycompany.models;

public class Student {
    private String name;
    private int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void display() {
        System.out.println("Student: " + name + ", Age: " + age);
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
}
```

```java
// File: com/mycompany/models/Teacher.java
package com.mycompany.models;

public class Teacher {
    private String name;
    private String subject;
    
    public Teacher(String name, String subject) {
        this.name = name;
        this.subject = subject;
    }
    
    public void display() {
        System.out.println("Teacher: " + name + ", Subject: " + subject);
    }
}
```

**Step 4: Use classes from same package**

```java
// File: com/mycompany/models/School.java
package com.mycompany.models;

// No import needed - same package
public class School {
    public static void main(String[] args) {
        System.out.println("===== SCHOOL MANAGEMENT =====\n");
        
        // Create students (same package - no import)
        Student s1 = new Student("Alice", 20);
        Student s2 = new Student("Bob", 21);
        
        // Create teacher (same package - no import)
        Teacher t1 = new Teacher("Dr. Smith", "Mathematics");
        
        System.out.println("--- Students ---");
        s1.display();
        s2.display();
        
        System.out.println("\n--- Teacher ---");
        t1.display();
    }
}
```

**Expected Output:**
```
===== SCHOOL MANAGEMENT =====

--- Students ---
Student: Alice, Age: 20
Student: Bob, Age: 21

--- Teacher ---
Teacher: Dr. Smith, Subject: Mathematics
```

**✅ Success Criteria:**
- [ ] Understand package declaration comes first
- [ ] Can create folder structure matching package name
- [ ] Know package naming conventions
- [ ] Can use classes within same package
- [ ] Understand packages organize code

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Package statement not first | Must be before imports/class | Put `package` statement first |
| Uppercase in package name | Convention is lowercase | `com.mycompany` not `Com.MyCompany` |
| Wrong folder structure | Must match package name | `com/mycompany` for `com.mycompany` |
| Missing semicolon | Syntax error | `package com.example;` |

**🎯 Challenge:**
Create a package structure:
1. `com.library.models` - Book, Author classes
2. `com.library.services` - LibraryService class
3. `com.library.main` - Main class
4. Book has: title, author, ISBN
5. Test creating and displaying books

---

### 🎯 Exercise 2: Import Statements (15 minutes)

**What you'll learn:**
- Importing classes from other packages
- Single import vs wildcard import
- Using fully qualified names
- When to use which import style

**📖 Concept: Import Statements**

Import statements let you use classes from other packages without typing the full package name every time.

**Three Ways to Use Classes:**
1. **Import specific class**: `import java.util.Scanner;`
2. **Import all classes**: `import java.util.*;`
3. **Fully qualified name**: `java.util.Scanner sc = new java.util.Scanner(System.in);`

---

**📝 Step-by-Step Code:**

**Step 1: Using imports for Java built-in classes**

```java
// File: ImportDemo1.java
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Random;

public class ImportDemo1 {
    public static void main(String[] args) {
        System.out.println("===== IMPORT DEMO =====\n");
        
        // Scanner - imported
        Scanner sc = new Scanner(System.in);
        System.out.println("Scanner created: " + sc.getClass().getName());
        
        // ArrayList - imported
        ArrayList<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        System.out.println("ArrayList: " + list);
        
        // Random - imported
        Random rand = new Random();
        System.out.println("Random number: " + rand.nextInt(100));
        
        sc.close();
    }
}
```

**Step 2: Using wildcard import**

```java
// File: ImportDemo2.java
import java.util.*;  // Import ALL classes from java.util

public class ImportDemo2 {
    public static void main(String[] args) {
        System.out.println("===== WILDCARD IMPORT =====\n");
        
        // All from java.util
        ArrayList<Integer> numbers = new ArrayList<>();
        LinkedList<String> names = new LinkedList<>();
        HashMap<String, Integer> ages = new HashMap<>();
        Date today = new Date();
        
        numbers.add(10);
        numbers.add(20);
        
        names.add("Alice");
        names.add("Bob");
        
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        
        System.out.println("ArrayList: " + numbers);
        System.out.println("LinkedList: " + names);
        System.out.println("HashMap: " + ages);
        System.out.println("Date: " + today);
    }
}
```

**Step 3: Fully qualified names (no import)**

```java
// File: ImportDemo3.java
// No imports - using fully qualified names

public class ImportDemo3 {
    public static void main(String[] args) {
        System.out.println("===== FULLY QUALIFIED NAMES =====\n");
        
        // Use full package path
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        java.util.ArrayList<String> list = new java.util.ArrayList<>();
        java.util.Random random = new java.util.Random();
        
        list.add("Java");
        list.add("Python");
        
        System.out.println("List: " + list);
        System.out.println("Random: " + random.nextInt(50));
        
        scanner.close();
    }
}
```

**Step 4: Handling name conflicts**

```java
// File: DateConflictDemo.java
// Two Date classes: java.util.Date and java.sql.Date

public class DateConflictDemo {
    public static void main(String[] args) {
        System.out.println("===== HANDLING NAME CONFLICTS =====\n");
        
        // Both classes named "Date" - use fully qualified names
        java.util.Date utilDate = new java.util.Date();
        java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());
        
        System.out.println("java.util.Date: " + utilDate);
        System.out.println("java.sql.Date: " + sqlDate);
        
        System.out.println("\nClass names:");
        System.out.println("Util: " + utilDate.getClass().getName());
        System.out.println("SQL: " + sqlDate.getClass().getName());
    }
}
```

**Step 5: Importing custom packages**

```java
// File: com/myapp/models/Product.java
package com.myapp.models;

public class Product {
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    public void display() {
        System.out.println(name + ": $" + price);
    }
}
```

```java
// File: com/myapp/main/ShopApp.java
package com.myapp.main;

import com.myapp.models.Product;  // Import from different package
import java.util.ArrayList;

public class ShopApp {
    public static void main(String[] args) {
        System.out.println("===== SHOP APPLICATION =====\n");
        
        // Use imported Product class
        ArrayList<Product> products = new ArrayList<>();
        
        products.add(new Product("Laptop", 999.99));
        products.add(new Product("Mouse", 25.50));
        products.add(new Product("Keyboard", 75.00));
        
        System.out.println("--- Products ---");
        for (Product p : products) {
            p.display();
        }
    }
}
```

**Expected Output:**
```
===== SHOP APPLICATION =====

--- Products ---
Laptop: $999.99
Mouse: $25.5
Keyboard: $75.0
```

**✅ Success Criteria:**
- [ ] Can import single classes
- [ ] Can use wildcard imports
- [ ] Understand when to use fully qualified names
- [ ] Can handle name conflicts
- [ ] Can import from custom packages

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Import after class declaration | Must be before class | Imports go after package, before class |
| `import java.util.Scanner()` | No parentheses | `import java.util.Scanner;` |
| Importing same package classes | Not needed | Only import from different packages |
| Forgetting semicolon | Syntax error | `import java.util.*;` |

**🎯 Challenge:**
Create a program that:
1. Uses Scanner, ArrayList, HashMap from java.util
2. Uses both java.util.Date and java.sql.Date (handle conflict)
3. Imports a custom class from different package
4. Shows all three import styles (single, wildcard, fully qualified)

---

### 🎯 Exercise 3: Static Variables (20 minutes)

**What you'll learn:**
- Difference between static and instance variables
- Static variables are shared by all instances
- Using static for counting objects
- Accessing static variables

**📖 Concept: Static Variables**

**Instance Variable** (without static):
- Each object has its own copy
- Separate for every instance

**Static Variable** (with static):
- ONE copy shared by ALL objects
- Belongs to class, not instances

---

**📝 Step-by-Step Code:**

**Step 1: Instance vs Static Variables**

```java
public class VariableDemo {
    static int staticCounter = 0;    // SHARED by all objects
    int instanceCounter = 0;         // SEPARATE for each object
    
    public VariableDemo() {
        staticCounter++;
        instanceCounter++;
        System.out.println("Object created:");
        System.out.println("  Static counter: " + staticCounter);
        System.out.println("  Instance counter: " + instanceCounter);
    }
    
    public static void main(String[] args) {
        System.out.println("===== STATIC VS INSTANCE VARIABLES =====\n");
        
        System.out.println("Creating object 1:");
        VariableDemo obj1 = new VariableDemo();
        
        System.out.println("\nCreating object 2:");
        VariableDemo obj2 = new VariableDemo();
        
        System.out.println("\nCreating object 3:");
        VariableDemo obj3 = new VariableDemo();
        
        System.out.println("\n--- Final Values ---");
        System.out.println("Static counter: " + VariableDemo.staticCounter);  // 3
        System.out.println("obj1 instance counter: " + obj1.instanceCounter);  // 1
        System.out.println("obj2 instance counter: " + obj2.instanceCounter);  // 1
        System.out.println("obj3 instance counter: " + obj3.instanceCounter);  // 1
    }
}
```

**Expected Output:**
```
===== STATIC VS INSTANCE VARIABLES =====

Creating object 1:
Object created:
  Static counter: 1
  Instance counter: 1

Creating object 2:
Object created:
  Static counter: 2
  Instance counter: 1

Creating object 3:
Object created:
  Static counter: 3
  Instance counter: 1

--- Final Values ---
Static counter: 3
obj1 instance counter: 1
obj2 instance counter: 1
obj3 instance counter: 1
```

**Step 2: Static variables for shared data**

```java
public class Student {
    // Static variables - shared by ALL students
    static String schoolName = "ABC High School";
    static int totalStudents = 0;
    
    // Instance variables - unique to each student
    String name;
    int rollNumber;
    int age;
    
    public Student(String name, int rollNumber, int age) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.age = age;
        totalStudents++;
    }
    
    public void display() {
        System.out.println("╔═══════════════════════════════╗");
        System.out.println("║  STUDENT INFORMATION         ║");
        System.out.println("╠═══════════════════════════════╣");
        System.out.println("║ School: " + schoolName);
        System.out.println("║ Name: " + name);
        System.out.println("║ Roll: " + rollNumber);
        System.out.println("║ Age: " + age);
        System.out.println("╚═══════════════════════════════╝");
    }
    
    public static void showStatistics() {
        System.out.println("\n╔═══════════════════════════════╗");
        System.out.println("║  SCHOOL STATISTICS           ║");
        System.out.println("╠═══════════════════════════════╣");
        System.out.println("║ School: " + schoolName);
        System.out.println("║ Total Students: " + totalStudents);
        System.out.println("╚═══════════════════════════════╝");
    }
    
    public static void main(String[] args) {
        System.out.println("===== STUDENT MANAGEMENT SYSTEM =====\n");
        
        Student s1 = new Student("Alice", 101, 16);
        Student s2 = new Student("Bob", 102, 17);
        Student s3 = new Student("Charlie", 103, 16);
        
        s1.display();
        System.out.println();
        s2.display();
        System.out.println();
        s3.display();
        
        Student.showStatistics();
        
        // Change school name for ALL students
        System.out.println("\n--- Changing School Name ---");
        Student.schoolName = "XYZ International School";
        
        s1.display();
        Student.showStatistics();
    }
}
```

**Step 3: Practical example - Bank Account Counter**

```java
public class BankAccount {
    // Static variables - track ALL accounts
    private static int totalAccounts = 0;
    private static double totalBankBalance = 0.0;
    
    // Instance variables - specific to each account
    private String accountNumber;
    private String customerName;
    private double balance;
    
    public BankAccount(String accountNumber, String customerName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.customerName = customerName;
        this.balance = initialBalance;
        
        // Update static counters
        totalAccounts++;
        totalBankBalance += initialBalance;
    }
    
    public void deposit(double amount) {
        balance += amount;
        totalBankBalance += amount;
        System.out.println("✅ Deposited $" + amount + " to " + accountNumber);
    }
    
    public void withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
            totalBankBalance -= amount;
            System.out.println("✅ Withdrawn $" + amount + " from " + accountNumber);
        } else {
            System.out.println("❌ Insufficient balance in " + accountNumber);
        }
    }
    
    public void display() {
        System.out.println("\n--- Account Details ---");
        System.out.println("Account: " + accountNumber);
        System.out.println("Customer: " + customerName);
        System.out.println("Balance: $" + balance);
    }
    
    public static void displayBankStatistics() {
        System.out.println("\n╔═══════════════════════════════════════╗");
        System.out.println("║     BANK-WIDE STATISTICS             ║");
        System.out.println("╠═══════════════════════════════════════╣");
        System.out.println("║ Total Accounts: " + totalAccounts);
        System.out.println("║ Total Bank Balance: $" + totalBankBalance);
        System.out.println("║ Average Balance: $" + (totalBankBalance / totalAccounts));
        System.out.println("╚═══════════════════════════════════════╝");
    }
    
    public static void main(String[] args) {
        System.out.println("===== BANK MANAGEMENT SYSTEM =====\n");
        
        BankAccount acc1 = new BankAccount("ACC001", "Alice Johnson", 5000);
        BankAccount acc2 = new BankAccount("ACC002", "Bob Smith", 3000);
        BankAccount acc3 = new BankAccount("ACC003", "Charlie Brown", 7000);
        
        acc1.display();
        acc2.display();
        acc3.display();
        
        BankAccount.displayBankStatistics();
        
        System.out.println("\n--- Transactions ---");
        acc1.deposit(1000);
        acc2.withdraw(500);
        acc3.deposit(2000);
        
        BankAccount.displayBankStatistics();
    }
}
```

**✅ Success Criteria:**
- [ ] Understand difference between static and instance
- [ ] Can use static for counting objects
- [ ] Know static variables are shared
- [ ] Access static with ClassName.variableName
- [ ] Can update static variables correctly

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `static int count;` in method | Can't have static local vars | Declare at class level |
| Using `this` with static | Static has no instance | Use `ClassName.staticVar` |
| Each object has own static copy | Only ONE copy exists | All objects share same value |
| Not incrementing counter properly | Won't track correctly | Increment in constructor |

**🎯 Challenge:**
Create a Car dealership system:
1. Static: totalCarsSold, totalRevenue, dealershipName
2. Instance: model, price, color
3. Method: sellCar() - updates both static and instance data
4. Static method: showDealershipStats()
5. Create 5 cars, sell 3, show statistics

---

### 🎯 Exercise 4: Static Methods (20 minutes)

**What you'll learn:**
- Creating and using static methods
- Calling static methods without objects
- Restrictions of static methods
- Utility classes with static methods

**📖 Concept: Static Methods**

**Static methods** belong to the class, not to any specific object.

**Key Rules:**
- ✅ Can call static methods without creating an object
- ✅ Can access static variables
- ❌ CANNOT access instance variables
- ❌ CANNOT use `this` keyword

---

**📝 Step-by-Step Code:**

**Step 1: Basic static method**

```java
public class MathOperations {
    // Static methods - no object needed
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static int subtract(int a, int b) {
        return a - b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    public static double divide(double a, double b) {
        if (b \!= 0) {
            return a / b;
        }
        System.out.println("Error: Division by zero");
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println("===== STATIC METHODS DEMO =====\n");
        
        // Call static methods using ClassName.methodName()
        System.out.println("--- Math Operations ---");
        System.out.println("10 + 5 = " + MathOperations.add(10, 5));
        System.out.println("10 - 5 = " + MathOperations.subtract(10, 5));
        System.out.println("10 * 5 = " + MathOperations.multiply(10, 5));
        System.out.println("10 / 5 = " + MathOperations.divide(10, 5));
        
        // Or call directly (within same class)
        System.out.println("\n--- Direct Calls ---");
        System.out.println("20 + 15 = " + add(20, 15));
        System.out.println("20 - 15 = " + subtract(20, 15));
    }
}
```

**Expected Output:**
```
===== STATIC METHODS DEMO =====

--- Math Operations ---
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2.0

--- Direct Calls ---
20 + 15 = 35
20 - 15 = 5
```

**Step 2: Static vs Instance methods**

```java
public class MethodTypes {
    static int staticVar = 100;
    int instanceVar = 200;
    
    // Static method
    public static void staticMethod() {
        System.out.println("--- Static Method ---");
        System.out.println("Can access static var: " + staticVar);
        // System.out.println(instanceVar);  // ERROR\!
        // System.out.println(this.staticVar); // ERROR - no 'this'\!
        
        staticHelper();  // OK - call other static method
        // instanceMethod(); // ERROR - can't call instance method\!
    }
    
    public static void staticHelper() {
        System.out.println("Static helper method called");
    }
    
    // Instance method
    public void instanceMethod() {
        System.out.println("\n--- Instance Method ---");
        System.out.println("Can access static var: " + staticVar);
        System.out.println("Can access instance var: " + instanceVar);
        System.out.println("Can use 'this': " + this.instanceVar);
        
        staticMethod();   // OK - can call static
        instanceHelper(); // OK - call other instance method
    }
    
    public void instanceHelper() {
        System.out.println("Instance helper method called");
    }
    
    public static void main(String[] args) {
        System.out.println("===== METHOD TYPES COMPARISON =====\n");
        
        // Call static method - no object needed
        MethodTypes.staticMethod();
        
        // Call instance method - need object
        MethodTypes obj = new MethodTypes();
        obj.instanceMethod();
    }
}
```

**Step 3: Utility class with static methods**

```java
public class StringUtility {
    // Private constructor - prevent instantiation
    private StringUtility() {
        throw new AssertionError("Utility class - do not instantiate\!");
    }
    
    // All methods are static
    public static boolean isPalindrome(String str) {
        str = str.toLowerCase().replaceAll("\\s+", "");
        int left = 0, right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left++) \!= str.charAt(right--)) {
                return false;
            }
        }
        return true;
    }
    
    public static String reverse(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    public static int countVowels(String str) {
        int count = 0;
        str = str.toLowerCase();
        for (char c : str.toCharArray()) {
            if ("aeiou".indexOf(c) \!= -1) {
                count++;
            }
        }
        return count;
    }
    
    public static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
    
    public static void main(String[] args) {
        System.out.println("===== STRING UTILITY CLASS =====\n");
        
        // Use all static methods
        System.out.println("--- Palindrome Check ---");
        System.out.println("'racecar' is palindrome: " + StringUtility.isPalindrome("racecar"));
        System.out.println("'hello' is palindrome: " + StringUtility.isPalindrome("hello"));
        
        System.out.println("\n--- Reverse String ---");
        System.out.println("Reverse of 'Java': " + StringUtility.reverse("Java"));
        
        System.out.println("\n--- Count Vowels ---");
        System.out.println("Vowels in 'Education': " + StringUtility.countVowels("Education"));
        
        System.out.println("\n--- Capitalize ---");
        System.out.println("Capitalize 'hello world': " + StringUtility.capitalize("hello world"));
    }
}
```

**Step 4: Temperature Converter Utility**

```java
public class TemperatureConverter {
    // Constants (static final)
    private static final double CELSIUS_TO_FAHRENHEIT_RATIO = 1.8;
    private static final int FAHRENHEIT_OFFSET = 32;
    
    // Private constructor
    private TemperatureConverter() {
        throw new AssertionError("Utility class");
    }
    
    // Static utility methods
    public static double celsiusToFahrenheit(double celsius) {
        return (celsius * CELSIUS_TO_FAHRENHEIT_RATIO) + FAHRENHEIT_OFFSET;
    }
    
    public static double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - FAHRENHEIT_OFFSET) / CELSIUS_TO_FAHRENHEIT_RATIO;
    }
    
    public static double celsiusToKelvin(double celsius) {
        return celsius + 273.15;
    }
    
    public static double kelvinToCelsius(double kelvin) {
        return kelvin - 273.15;
    }
    
    public static void displayConversions(double celsius) {
        System.out.println("╔═══════════════════════════════════════╗");
        System.out.println("║   TEMPERATURE CONVERSIONS            ║");
        System.out.println("╠═══════════════════════════════════════╣");
        System.out.println("║ Celsius:    " + celsius + "°C");
        System.out.println("║ Fahrenheit: " + celsiusToFahrenheit(celsius) + "°F");
        System.out.println("║ Kelvin:     " + celsiusToKelvin(celsius) + "K");
        System.out.println("╚═══════════════════════════════════════╝");
    }
    
    public static void main(String[] args) {
        System.out.println("===== TEMPERATURE CONVERTER =====\n");
        
        displayConversions(0);
        System.out.println();
        displayConversions(25);
        System.out.println();
        displayConversions(100);
    }
}
```

**✅ Success Criteria:**
- [ ] Can create static methods
- [ ] Call static methods without objects
- [ ] Understand static method restrictions
- [ ] Can create utility classes
- [ ] Know when to use static methods

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Accessing instance vars in static | Static has no instance | Only access static vars |
| Using `this` in static method | No instance context | Remove `this` keyword |
| Creating object for utility class | Wastes memory | Private constructor + all static |
| Non-static main method | Won't run | `public static void main()` |

**🎯 Challenge:**
Create a Calculator utility class with:
1. Private constructor
2. Static methods: power(base, exp), factorial(n), isPrime(n)
3. Static method: gcd(a, b) - greatest common divisor
4. Test all methods without creating objects

---

### 🎯 Exercise 5: Static Blocks (20 minutes)

**What you'll learn:**
- What static blocks are
- When static blocks execute
- Using static blocks for initialization
- Execution order of static blocks

**📖 Concept: Static Blocks**

**Static blocks** execute when the class is loaded, BEFORE any object is created.

**Execution Order:**
1. Static blocks (when class loads)
2. Constructors (when object created)

**Use cases:**
- Initialize static variables
- Load configuration
- One-time setup code

---

**📝 Step-by-Step Code:**

**Step 1: Basic static block**

```java
public class StaticBlockDemo {
    static int value;
    static String message;
    
    // Static block - runs when class is loaded
    static {
        System.out.println("🔵 Static block 1 executed");
        value = 100;
        message = "Hello from static block";
    }
    
    // Constructor
    public StaticBlockDemo() {
        System.out.println("🟢 Constructor executed");
    }
    
    public static void main(String[] args) {
        System.out.println("===== STATIC BLOCK DEMO =====\n");
        
        System.out.println("🟡 Main method started");
        System.out.println("Value: " + value);
        System.out.println("Message: " + message);
        
        System.out.println("\nCreating first object:");
        StaticBlockDemo obj1 = new StaticBlockDemo();
        
        System.out.println("\nCreating second object:");
        StaticBlockDemo obj2 = new StaticBlockDemo();
    }
}
```

**Expected Output:**
```
🔵 Static block 1 executed
===== STATIC BLOCK DEMO =====

🟡 Main method started
Value: 100
Message: Hello from static block

Creating first object:
🟢 Constructor executed

Creating second object:
🟢 Constructor executed
```

**Step 2: Multiple static blocks**

```java
public class MultipleStaticBlocks {
    static int a;
    static int b;
    static int c;
    
    // First static block
    static {
        System.out.println("🔵 Static block 1: Initializing 'a'");
        a = 10;
    }
    
    // Second static block
    static {
        System.out.println("🔵 Static block 2: Initializing 'b'");
        b = 20;
    }
    
    // Third static block
    static {
        System.out.println("🔵 Static block 3: Computing 'c'");
        c = a + b;
        System.out.println("   a + b = " + c);
    }
    
    public MultipleStaticBlocks() {
        System.out.println("🟢 Constructor: a=" + a + ", b=" + b + ", c=" + c);
    }
    
    public static void main(String[] args) {
        System.out.println("\n===== MULTIPLE STATIC BLOCKS =====\n");
        System.out.println("🟡 Main method started\n");
        
        System.out.println("Creating objects:");
        new MultipleStaticBlocks();
        new MultipleStaticBlocks();
    }
}
```

**Expected Output:**
```
🔵 Static block 1: Initializing 'a'
🔵 Static block 2: Initializing 'b'
🔵 Static block 3: Computing 'c'
   a + b = 30

===== MULTIPLE STATIC BLOCKS =====

🟡 Main method started

Creating objects:
🟢 Constructor: a=10, b=20, c=30
🟢 Constructor: a=10, b=20, c=30
```

**Step 3: Static block for configuration**

```java
public class DatabaseConfig {
    static String dbUrl;
    static String dbUser;
    static String dbPassword;
    static boolean isConfigured;
    
    // Static block for configuration
    static {
        System.out.println("⚙️  Loading database configuration...");
        
        // Simulate loading from config file
        dbUrl = "jdbc:mysql://localhost:3306/mydb";
        dbUser = "admin";
        dbPassword = "secret123";
        isConfigured = true;
        
        System.out.println("✅ Configuration loaded successfully");
        System.out.println("   DB URL: " + dbUrl);
        System.out.println("   DB User: " + dbUser);
    }
    
    public static void connect() {
        if (isConfigured) {
            System.out.println("\n🔌 Connecting to database...");
            System.out.println("   URL: " + dbUrl);
            System.out.println("   User: " + dbUser);
            System.out.println("✅ Connected\!");
        } else {
            System.out.println("❌ Configuration not loaded");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("===== DATABASE CONFIG =====\n");
        System.out.println("🟡 Application started\n");
        
        connect();
    }
}
```

**Step 4: Execution order demo**

```java
public class ExecutionOrderDemo {
    static int staticVar = initStatic();
    int instanceVar = initInstance();
    
    // Static initializer
    static {
        System.out.println("2️⃣ Static block executed");
    }
    
    // Instance initializer
    {
        System.out.println("4️⃣ Instance block executed");
    }
    
    // Constructor
    public ExecutionOrderDemo() {
        System.out.println("5️⃣ Constructor executed");
    }
    
    // Static method
    static int initStatic() {
        System.out.println("1️⃣ Static variable initializer");
        return 100;
    }
    
    // Instance method
    int initInstance() {
        System.out.println("3️⃣ Instance variable initializer");
        return 200;
    }
    
    public static void main(String[] args) {
        System.out.println("\n===== EXECUTION ORDER =====\n");
        System.out.println("Creating first object:");
        new ExecutionOrderDemo();
        
        System.out.println("\nCreating second object:");
        new ExecutionOrderDemo();
    }
}
```

**Expected Output:**
```
1️⃣ Static variable initializer
2️⃣ Static block executed

===== EXECUTION ORDER =====

Creating first object:
3️⃣ Instance variable initializer
4️⃣ Instance block executed
5️⃣ Constructor executed

Creating second object:
3️⃣ Instance variable initializer
4️⃣ Instance block executed
5️⃣ Constructor executed
```

**✅ Success Criteria:**
- [ ] Understand static blocks execute once when class loads
- [ ] Know execution order: static → instance → constructor
- [ ] Can use static blocks for initialization
- [ ] Understand multiple static blocks execute in order
- [ ] Know static blocks run before main()

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Expecting static block per object | Runs only ONCE | Use constructor for per-object |
| Accessing instance vars | No instance yet | Only static vars allowed |
| Putting complex logic | Hard to debug | Keep it simple - initialization only |
| Missing semicolon after block | Syntax error | `static { ... }` - no semicolon |

**🎯 Challenge:**
Create a class that demonstrates complete execution order:
1. Static variable initialization
2. Static block (print "Config loaded")
3. Instance variable initialization
4. Instance initialization block
5. Constructor
6. Create 3 objects and observe the order

---

### 🎯 Exercise 6: Complete Package & Static Example (25 minutes)

**What you'll learn:**
- Combining packages and static concepts
- Creating a multi-file application
- Organizing code professionally
- Best practices for packages and static

**📖 Concept: Real-World Application**

Let's build a complete Employee Management System using:
- Packages for organization
- Static for company-wide data
- Import statements
- Utility classes

---

**📝 Step-by-Step Code:**

**Step 1: Create Employee model**

```java
// File: com/company/models/Employee.java
package com.company.models;

public class Employee {
    // Static - shared by all employees
    private static String companyName = "Tech Corp";
    private static int totalEmployees = 0;
    private static double totalSalary = 0;
    
    // Instance - unique to each employee
    private int empId;
    private String name;
    private String department;
    private double salary;
    
    // Static block
    static {
        System.out.println("⚙️  Employee class loaded");
        System.out.println("   Company: " + companyName);
    }
    
    // Constructor
    public Employee(int empId, String name, String department, double salary) {
        this.empId = empId;
        this.name = name;
        this.department = department;
        this.salary = salary;
        
        totalEmployees++;
        totalSalary += salary;
    }
    
    // Instance method
    public void display() {
        System.out.println("╔═══════════════════════════════════════╗");
        System.out.println("║  EMPLOYEE DETAILS                    ║");
        System.out.println("╠═══════════════════════════════════════╣");
        System.out.println("║ Company: " + companyName);
        System.out.println("║ ID: " + empId);
        System.out.println("║ Name: " + name);
        System.out.println("║ Department: " + department);
        System.out.println("║ Salary: $" + salary);
        System.out.println("╚═══════════════════════════════════════╝");
    }
    
    // Static method
    public static void displayCompanyStats() {
        System.out.println("\n╔═══════════════════════════════════════╗");
        System.out.println("║  COMPANY STATISTICS                  ║");
        System.out.println("╠═══════════════════════════════════════╣");
        System.out.println("║ Company: " + companyName);
        System.out.println("║ Total Employees: " + totalEmployees);
        System.out.println("║ Total Salary Budget: $" + totalSalary);
        System.out.println("║ Average Salary: $" + (totalSalary / totalEmployees));
        System.out.println("╚═══════════════════════════════════════╝");
    }
    
    // Getters
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }
}
```

**Step 2: Create utility class for calculations**

```java
// File: com/company/utils/SalaryCalculator.java
package com.company.utils;

import com.company.models.Employee;

public class SalaryCalculator {
    // Tax rates (static final constants)
    private static final double TAX_RATE = 0.20;
    private static final double BONUS_RATE = 0.10;
    
    // Private constructor - utility class
    private SalaryCalculator() {
        throw new AssertionError("Utility class");
    }
    
    // Static utility methods
    public static double calculateAnnualSalary(Employee emp) {
        return emp.getSalary() * 12;
    }
    
    public static double calculateTax(Employee emp) {
        return emp.getSalary() * TAX_RATE;
    }
    
    public static double calculateBonus(Employee emp) {
        return emp.getSalary() * BONUS_RATE;
    }
    
    public static double calculateNetSalary(Employee emp) {
        return emp.getSalary() - calculateTax(emp);
    }
    
    public static void displaySalaryBreakdown(Employee emp) {
        System.out.println("\n╔═══════════════════════════════════════╗");
        System.out.println("║  SALARY BREAKDOWN: " + emp.getName());
        System.out.println("╠═══════════════════════════════════════╣");
        System.out.println("║ Gross Salary: $" + emp.getSalary());
        System.out.println("║ Tax (20%): $" + calculateTax(emp));
        System.out.println("║ Net Salary: $" + calculateNetSalary(emp));
        System.out.println("║ Bonus (10%): $" + calculateBonus(emp));
        System.out.println("║ Annual Salary: $" + calculateAnnualSalary(emp));
        System.out.println("╚═══════════════════════════════════════╝");
    }
}
```

**Step 3: Create main application**

```java
// File: com/company/main/HRApplication.java
package com.company.main;

import com.company.models.Employee;
import com.company.utils.SalaryCalculator;
import java.util.ArrayList;

public class HRApplication {
    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════╗");
        System.out.println("║   EMPLOYEE MANAGEMENT SYSTEM                 ║");
        System.out.println("╚═══════════════════════════════════════════════╝\n");
        
        // Create employees
        ArrayList<Employee> employees = new ArrayList<>();
        
        employees.add(new Employee(101, "Alice Johnson", "Engineering", 8000));
        employees.add(new Employee(102, "Bob Smith", "Marketing", 6000));
        employees.add(new Employee(103, "Charlie Brown", "Engineering", 7500));
        employees.add(new Employee(104, "Diana Prince", "HR", 6500));
        employees.add(new Employee(105, "Eve Adams", "Finance", 7000));
        
        // Display all employees
        System.out.println("--- ALL EMPLOYEES ---");
        for (Employee emp : employees) {
            emp.display();
            System.out.println();
        }
        
        // Company statistics
        Employee.displayCompanyStats();
        
        // Salary breakdown for first employee
        SalaryCalculator.displaySalaryBreakdown(employees.get(0));
        
        // Find department with highest average salary
        System.out.println("\n--- DEPARTMENT ANALYSIS ---");
        analyzeDepartment(employees, "Engineering");
        analyzeDepartment(employees, "Marketing");
    }
    
    private static void analyzeDepartment(ArrayList<Employee> employees, String dept) {
        double totalSalary = 0;
        int count = 0;
        
        for (Employee emp : employees) {
            if (emp.getDepartment().equals(dept)) {
                totalSalary += emp.getSalary();
                count++;
            }
        }
        
        if (count > 0) {
            System.out.println(dept + " Department:");
            System.out.println("  Employees: " + count);
            System.out.println("  Average Salary: $" + (totalSalary / count));
        }
    }
}
```

**Expected Output:**
```
⚙️  Employee class loaded
   Company: Tech Corp
╔═══════════════════════════════════════════════╗
║   EMPLOYEE MANAGEMENT SYSTEM                 ║
╚═══════════════════════════════════════════════╝

--- ALL EMPLOYEES ---
╔═══════════════════════════════════════╗
║  EMPLOYEE DETAILS                    ║
╠═══════════════════════════════════════╣
║ Company: Tech Corp
║ ID: 101
║ Name: Alice Johnson
║ Department: Engineering
║ Salary: $8000.0
╚═══════════════════════════════════════╝

[... other employees ...]

╔═══════════════════════════════════════╗
║  COMPANY STATISTICS                  ║
╠═══════════════════════════════════════╣
║ Company: Tech Corp
║ Total Employees: 5
║ Total Salary Budget: $35000.0
║ Average Salary: $7000.0
╚═══════════════════════════════════════╝

╔═══════════════════════════════════════╗
║  SALARY BREAKDOWN: Alice Johnson
╠═══════════════════════════════════════╣
║ Gross Salary: $8000.0
║ Tax (20%): $1600.0
║ Net Salary: $6400.0
║ Bonus (10%): $800.0
║ Annual Salary: $96000.0
╚═══════════════════════════════════════╝

--- DEPARTMENT ANALYSIS ---
Engineering Department:
  Employees: 2
  Average Salary: $7750.0
Marketing Department:
  Employees: 1
  Average Salary: $6000.0
```

**✅ Success Criteria:**
- [ ] Can organize code into packages
- [ ] Use static for shared data correctly
- [ ] Create utility classes with static methods
- [ ] Import and use classes from different packages
- [ ] Understand complete application structure

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Wrong package structure | Won't compile | Match folder to package name |
| Missing imports | Can't find classes | Import from other packages |
| Public fields in model | Breaks encapsulation | Private fields + getters |
| Instantiating utility class | Not needed | Private constructor |

**🎯 Challenge:**
Extend the system:
1. Add Department class (package: com.company.models)
2. Add EmployeeValidator utility (package: com.company.utils)
   - validateSalary(double) - must be > 0
   - validateName(String) - not null/empty
3. Add EmployeeReport utility (package: com.company.reports)
   - generateReport(List<Employee>)
   - exportToCSV(List<Employee>)
4. Test everything from main application

---

### 🎓 Day 16 Summary: Packages & Static

**What You Learned:**
1. ✅ Creating and using packages
2. ✅ Import statements (single, wildcard, fully qualified)
3. ✅ Static variables (shared by all instances)
4. ✅ Static methods (called without objects)
5. ✅ Static blocks (initialization when class loads)
6. ✅ Creating professional utility classes

**Key Takeaways:**
- Packages organize code and prevent naming conflicts
- Use reverse domain naming: `com.company.project`
- Static belongs to class, not instances
- Static methods can't access instance members
- Static blocks execute once when class loads
- Utility classes should have private constructors

**Static Checklist:**
```
✅ Static variables - shared by all objects
✅ Static methods - no object needed
✅ Static blocks - initialize once
✅ Static import - use without class name
✅ Utility classes - all static + private constructor
✅ Constants - static final
✅ main() method - must be static
```

**Packages Checklist:**
```
✅ Package declaration first line
✅ Lowercase naming convention
✅ Reverse domain: com.company.project
✅ Folder structure matches package
✅ Import from different packages
✅ Use access modifiers correctly
```

**Next: Day 17 - Exception Handling Part 1\!**

---

## 📅 DAY 17: EXCEPTION HANDLING - PART 1

### 🎯 Exercise 1: Understanding Exceptions & Try-Catch Basics (15 minutes)

**What you'll learn:**
- What exceptions are and why they occur
- Basic try-catch syntax
- Exception object methods
- How to handle runtime errors gracefully

**📖 Concept: Exceptions**

**Exception** = An event that disrupts the normal flow of a program

**Without Exception Handling:**
```java
int result = 10 / 0;  // Program crashes\!
System.out.println("This line never executes");
```

**With Exception Handling:**
```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Can't divide by zero");
}
System.out.println("Program continues normally");
```

---

**📝 Step-by-Step Code:**

```java
public class ExceptionBasics {
    public static void main(String[] args) {
        System.out.println("===== EXCEPTION HANDLING BASICS =====\n");
        
        // Example 1: Without exception handling (commented to prevent crash)
        System.out.println("--- Without Exception Handling ---");
        System.out.println("This would crash:");
        System.out.println("int result = 10 / 0;  // ArithmeticException\!");
        
        // Example 2: With exception handling
        System.out.println("\n--- With Exception Handling ---");
        try {
            System.out.println("Trying to divide 10 by 0...");
            int result = 10 / 0;
            System.out.println("Result: " + result);  // Never executes
        } catch (ArithmeticException e) {
            System.out.println("✅ Exception caught\!");
            System.out.println("   Error: Cannot divide by zero");
        }
        System.out.println("Program continues after exception");
        
        // Example 3: Array index exception
        System.out.println("\n--- Array Index Exception ---");
        try {
            int[] numbers = {1, 2, 3, 4, 5};
            System.out.println("Accessing index 10...");
            System.out.println(numbers[10]);  // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("✅ Exception caught\!");
            System.out.println("   Error: Array index out of bounds");
        }
        
        // Example 4: Exception object methods
        System.out.println("\n--- Exception Object Methods ---");
        try {
            String str = null;
            System.out.println(str.length());  // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Exception caught\!");
            System.out.println("getMessage(): " + e.getMessage());
            System.out.println("toString(): " + e.toString());
            System.out.print("\nprintStackTrace(): ");
            e.printStackTrace();
        }
        
        // Example 5: Number format exception
        System.out.println("\n--- Number Format Exception ---");
        try {
            String text = "abc123";
            int number = Integer.parseInt(text);
            System.out.println("Number: " + number);
        } catch (NumberFormatException e) {
            System.out.println("✅ Exception caught\!");
            System.out.println("   Cannot convert '" + "abc123" + "' to number");
        }
        
        System.out.println("\n✅ Program completed successfully\!");
    }
}
```

**Expected Output:**
```
===== EXCEPTION HANDLING BASICS =====

--- Without Exception Handling ---
This would crash:
int result = 10 / 0;  // ArithmeticException\!

--- With Exception Handling ---
Trying to divide 10 by 0...
✅ Exception caught\!
   Error: Cannot divide by zero
Program continues after exception

--- Array Index Exception ---
Accessing index 10...
✅ Exception caught\!
   Error: Array index out of bounds

--- Exception Object Methods ---
Exception caught\!
getMessage(): null
toString(): java.lang.NullPointerException
printStackTrace(): java.lang.NullPointerException
	at ExceptionBasics.main(ExceptionBasics.java:XX)

--- Number Format Exception ---
✅ Exception caught\!
   Cannot convert 'abc123' to number

✅ Program completed successfully\!
```

**✅ Success Criteria:**
- [ ] Understand what exceptions are
- [ ] Can write try-catch blocks
- [ ] Know how to catch specific exceptions
- [ ] Can use getMessage(), toString(), printStackTrace()
- [ ] Program doesn't crash when exception occurs

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| No try-catch for risky code | Program crashes | Wrap in try-catch |
| Empty catch block | Swallows errors | Handle or log exception |
| Catching wrong exception type | Won't catch the error | Use correct exception class |
| Code after risky line in try | May not execute | Put in finally or after catch |

**🎯 Challenge:**
Create a calculator that handles:
1. Division by zero (ArithmeticException)
2. Invalid input (NumberFormatException)
3. Array access errors (ArrayIndexOutOfBoundsException)
4. Null pointer errors (NullPointerException)

---

### 🎯 Exercise 2: Multiple Exception Handling (20 minutes)

**What you'll learn:**
- Handling multiple different exceptions
- Proper order of catch blocks
- Multi-catch syntax (Java 7+)
- When to use Exception as catch-all

**📖 Concept: Multiple Catch Blocks**

**Important Rule:** Catch specific exceptions BEFORE general ones\!

```java
try {
    // risky code
} catch (ArrayIndexOutOfBoundsException e) {  // Specific first
    // handle
} catch (RuntimeException e) {  // More general
    // handle
} catch (Exception e) {  // Most general last
    // handle
}
```

---

**📝 Step-by-Step Code:**

```java
import java.util.Scanner;

public class MultipleExceptions {
    public static void main(String[] args) {
        System.out.println("===== MULTIPLE EXCEPTION HANDLING =====\n");
        
        Scanner sc = new Scanner(System.in);
        
        // Example 1: Multiple different exceptions
        System.out.println("--- Example 1: Different Exceptions ---");
        try {
            System.out.print("Enter array size: ");
            int size = sc.nextInt();
            
            int[] array = new int[size];
            
            System.out.print("Enter index to access: ");
            int index = sc.nextInt();
            
            System.out.print("Enter value to store: ");
            int value = sc.nextInt();
            
            array[index] = value;
            
            System.out.println("Value stored: " + array[index]);
            
            // Division operation
            System.out.print("Divide value by: ");
            int divisor = sc.nextInt();
            int result = array[index] / divisor;
            System.out.println("Result: " + result);
            
        } catch (NegativeArraySizeException e) {
            System.out.println("❌ Array size cannot be negative\!");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("❌ Array index out of bounds\!");
        } catch (ArithmeticException e) {
            System.out.println("❌ Cannot divide by zero\!");
        } catch (Exception e) {
            System.out.println("❌ Some error occurred: " + e.getMessage());
        }
        
        // Example 2: Multi-catch (Java 7+)
        System.out.println("\n--- Example 2: Multi-Catch Syntax ---");
        try {
            String str = "Hello";
            System.out.println(str.charAt(100));
        } catch (NullPointerException | StringIndexOutOfBoundsException e) {
            System.out.println("❌ String error: " + e.getClass().getSimpleName());
        }
        
        // Example 3: Catch block order matters
        System.out.println("\n--- Example 3: Proper Catch Order ---");
        demonstrateCatchOrder();
        
        sc.close();
        System.out.println("\n✅ Program completed\!");
    }
    
    public static void demonstrateCatchOrder() {
        int[] numbers = {10, 20, 30};
        
        try {
            System.out.println(numbers[5]);
        }
        // CORRECT ORDER: Specific before general
        catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("✅ Caught ArrayIndexOutOfBounds");
        }
        catch (RuntimeException e) {
            System.out.println("   Caught RuntimeException");
        }
        catch (Exception e) {
            System.out.println("   Caught Exception");
        }
        
        /* WRONG ORDER - Won't compile:
        catch (Exception e) {  // Too general first
        }
        catch (ArrayIndexOutOfBoundsException e) {  // Unreachable\!
        }
        */
    }
}
```

**Expected Output (sample):**
```
===== MULTIPLE EXCEPTION HANDLING =====

--- Example 1: Different Exceptions ---
Enter array size: 5
Enter index to access: 2
Enter value to store: 100
Value stored: 100
Divide value by: 0
❌ Cannot divide by zero\!

--- Example 2: Multi-Catch Syntax ---
❌ String error: StringIndexOutOfBoundsException

--- Example 3: Proper Catch Order ---
✅ Caught ArrayIndexOutOfBounds

✅ Program completed\!
```

**✅ Success Criteria:**
- [ ] Can handle multiple different exceptions
- [ ] Know specific exceptions go before general
- [ ] Can use multi-catch syntax
- [ ] Understand catch block execution order
- [ ] Know when to use Exception as catch-all

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| General exception first | Specific blocks unreachable | Specific → General order |
| Too many specific catches | Verbose | Use multi-catch for similar handling |
| Catching Exception always | Hides specific errors | Catch specific when possible |
| Wrong exception type | Won't catch the error | Match the actual exception |

**🎯 Challenge:**
Create a method that:
1. Takes String input and converts to integer
2. Uses that integer as array index
3. Divides a value by that integer
4. Handles: NumberFormatException, ArrayIndexOutOfBoundsException, ArithmeticException
5. Use proper catch order

---

### 🎯 Exercise 3: Finally Block (20 minutes)

**What you'll learn:**
- Finally block always executes
- Using finally for cleanup code
- Finally with and without exceptions
- Finally with return statements

**📖 Concept: Finally Block**

**Finally** = Code that ALWAYS executes, whether exception occurs or not

**Use cases:**
- Closing files
- Releasing resources
- Cleanup operations
- Logging

---

**📝 Step-by-Step Code:**

```java
import java.util.Scanner;

public class FinallyBlockDemo {
    public static void main(String[] args) {
        System.out.println("===== FINALLY BLOCK DEMO =====\n");
        
        // Example 1: Finally always executes
        System.out.println("--- Example 1: Basic Finally ---");
        try {
            System.out.println("1️⃣ Try block");
            int result = 10 / 2;
            System.out.println("   Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("2️⃣ Catch block");
        } finally {
            System.out.println("3️⃣ Finally block - ALWAYS executes");
        }
        System.out.println("4️⃣ After try-catch-finally\n");
        
        // Example 2: Finally with exception
        System.out.println("--- Example 2: Finally With Exception ---");
        try {
            System.out.println("1️⃣ Try block");
            int result = 10 / 0;  // Exception\!
            System.out.println("   This won't print");
        } catch (ArithmeticException e) {
            System.out.println("2️⃣ Catch block - exception handled");
        } finally {
            System.out.println("3️⃣ Finally block - still executes\!");
        }
        System.out.println("4️⃣ After try-catch-finally\n");
        
        // Example 3: Finally without catch
        System.out.println("--- Example 3: Try-Finally (No Catch) ---");
        Scanner sc = null;
        try {
            sc = new Scanner(System.in);
            System.out.println("Scanner created");
        } finally {
            if (sc \!= null) {
                sc.close();
                System.out.println("Scanner closed in finally");
            }
        }
        
        // Example 4: Finally with return
        System.out.println("\n--- Example 4: Finally With Return ---");
        int value = methodWithReturn();
        System.out.println("Returned value: " + value);
        
        // Example 5: Resource cleanup
        System.out.println("\n--- Example 5: Resource Cleanup ---");
        demonstrateResourceCleanup();
        
        System.out.println("\n✅ All examples completed\!");
    }
    
    public static int methodWithReturn() {
        try {
            System.out.println("1️⃣ Try block");
            return 10;
        } catch (Exception e) {
            System.out.println("2️⃣ Catch block");
            return 20;
        } finally {
            System.out.println("3️⃣ Finally block (executes before return\!)");
            // If we return here, it overrides the try's return:
            // return 30;
        }
    }
    
    public static void demonstrateResourceCleanup() {
        Scanner scanner = null;
        try {
            scanner = new Scanner(System.in);
            System.out.println("Resource acquired (Scanner created)");
            
            // Simulate some work
            System.out.println("Using resource...");
            
            // Uncomment to test exception scenario:
            // throw new RuntimeException("Simulated error\!");
            
        } catch (Exception e) {
            System.out.println("Exception occurred: " + e.getMessage());
        } finally {
            // Cleanup ALWAYS happens
            if (scanner \!= null) {
                scanner.close();
                System.out.println("✅ Resource released (Scanner closed)");
            }
        }
    }
}
```

**Expected Output:**
```
===== FINALLY BLOCK DEMO =====

--- Example 1: Basic Finally ---
1️⃣ Try block
   Result: 5
3️⃣ Finally block - ALWAYS executes
4️⃣ After try-catch-finally

--- Example 2: Finally With Exception ---
1️⃣ Try block
2️⃣ Catch block - exception handled
3️⃣ Finally block - still executes\!
4️⃣ After try-catch-finally

--- Example 3: Try-Finally (No Catch) ---
Scanner created
Scanner closed in finally

--- Example 4: Finally With Return ---
1️⃣ Try block
3️⃣ Finally block (executes before return\!)
Returned value: 10

--- Example 5: Resource Cleanup ---
Resource acquired (Scanner created)
Using resource...
✅ Resource released (Scanner closed)

✅ All examples completed\!
```

**✅ Success Criteria:**
- [ ] Understand finally always executes
- [ ] Can use finally for cleanup
- [ ] Know finally runs even with return
- [ ] Can write try-finally without catch
- [ ] Understand resource management

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Forgetting to close resources | Resource leak | Always close in finally |
| Returning from finally | Overrides try/catch returns | Avoid return in finally |
| Catching in finally | Not allowed | Only try-catch or try-finally |
| Not null-checking in finally | May throw NullPointerException | Check if resource \!= null |

**🎯 Challenge:**
Create a file operation simulator:
1. Open file (print "File opened")
2. Read data (may throw exception)
3. Process data (may throw exception)
4. ALWAYS close file in finally
5. Test with and without exceptions

---

Due to length constraints, I'll create a summary version of the remaining exercises (4-6) for Day 17. Would you like me to continue with the remaining exercises for Day 17, or shall we proceed with updating the progress trackers for Week 3 completion summary?


### 🎯 Exercise 4: Try-With-Resources (20 minutes)

**What you'll learn:**
- Automatic resource management (Java 7+)
- Resources that implement AutoCloseable
- Multiple resources in try-with-resources
- Benefits over manual cleanup

**📖 Concept: Try-With-Resources**

**Old Way (Manual Cleanup):**
```java
Scanner sc = null;
try {
    sc = new Scanner(System.in);
    // use scanner
} finally {
    if (sc \!= null) sc.close();
}
```

**New Way (Automatic):**
```java
try (Scanner sc = new Scanner(System.in)) {
    // use scanner
} // Scanner automatically closed\!
```

---

**📝 Step-by-Step Code:**

```java
import java.util.Scanner;
import java.io.*;

public class TryWithResourcesDemo {
    public static void main(String[] args) {
        System.out.println("===== TRY-WITH-RESOURCES DEMO =====\n");
        
        // Example 1: Single resource
        System.out.println("--- Example 1: Scanner (Auto-Close) ---");
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Scanner created and will auto-close");
            System.out.println("Scanner class: " + scanner.getClass().getName());
        } // Scanner automatically closed here\!
        System.out.println("✅ Scanner automatically closed\n");
        
        // Example 2: Custom AutoCloseable class
        System.out.println("--- Example 2: Custom Resource ---");
        try (MyResource resource = new MyResource("Database Connection")) {
            resource.doWork();
        } // Automatically calls close()
        
        // Example 3: Multiple resources
        System.out.println("\n--- Example 3: Multiple Resources ---");
        try (
            MyResource r1 = new MyResource("File1");
            MyResource r2 = new MyResource("File2");
            MyResource r3 = new MyResource("Network")
        ) {
            r1.doWork();
            r2.doWork();
            r3.doWork();
        } // All closed automatically in reverse order
        
        // Example 4: With exception handling
        System.out.println("\n--- Example 4: With Exception Handling ---");
        try (Scanner sc = new Scanner(System.in)) {
            System.out.println("Enter a number:");
            // Simulated input - in real code, use sc.nextInt()
            String input = "abc";
            int num = Integer.parseInt(input);  // NumberFormatException\!
            System.out.println("Number: " + num);
        } catch (NumberFormatException e) {
            System.out.println("❌ Invalid number format");
        } // Scanner still auto-closes even with exception\!
        System.out.println("✅ Scanner auto-closed despite exception");
        
        System.out.println("\n✅ All examples completed\!");
    }
}

// Custom resource class
class MyResource implements AutoCloseable {
    private String name;
    
    public MyResource(String name) {
        this.name = name;
        System.out.println("  ✅ " + name + " opened");
    }
    
    public void doWork() {
        System.out.println("  ⚙️  " + name + " working...");
    }
    
    @Override
    public void close() {
        System.out.println("  ❌ " + name + " closed");
    }
}
```

**Expected Output:**
```
===== TRY-WITH-RESOURCES DEMO =====

--- Example 1: Scanner (Auto-Close) ---
Scanner created and will auto-close
Scanner class: java.util.Scanner
✅ Scanner automatically closed

--- Example 2: Custom Resource ---
  ✅ Database Connection opened
  ⚙️  Database Connection working...
  ❌ Database Connection closed

--- Example 3: Multiple Resources ---
  ✅ File1 opened
  ✅ File2 opened
  ✅ Network opened
  ⚙️  File1 working...
  ⚙️  File2 working...
  ⚙️  Network working...
  ❌ Network closed
  ❌ File2 closed
  ❌ File1 closed

--- Example 4: With Exception Handling ---
Enter a number:
❌ Invalid number format
✅ Scanner auto-closed despite exception

✅ All examples completed\!
```

**✅ Success Criteria:**
- [ ] Understand automatic resource management
- [ ] Can use try-with-resources syntax
- [ ] Know resources must implement AutoCloseable
- [ ] Can use multiple resources
- [ ] Understand resources close automatically

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Not implementing AutoCloseable | Won't work with try-with-resources | Implement AutoCloseable interface |
| Forgetting parentheses | Syntax error | `try (Resource r = new Resource())` |
| Using non-AutoCloseable resource | Compilation error | Only use AutoCloseable resources |
| Manual close() call | Not needed | Let try-with-resources handle it |

**🎯 Challenge:**
Create your own resource classes:
1. DatabaseConnection (AutoCloseable)
2. FileHandler (AutoCloseable)
3. Use both in try-with-resources
4. Test with exception to verify auto-close
5. Print open/close messages

---

### 🎯 Exercise 5: Throwing Exceptions (20 minutes)

**What you'll learn:**
- Using throw keyword to throw exceptions
- When to throw exceptions
- Rethrowing caught exceptions
- Creating exception throwing methods

**📖 Concept: Throw Keyword**

**throw** = Manually throw an exception

```java
if (age < 18) {
    throw new IllegalArgumentException("Too young");
}
```

---

**📝 Step-by-Step Code:**

```java
public class ThrowDemo {
    public static void main(String[] args) {
        System.out.println("===== THROW KEYWORD DEMO =====\n");
        
        // Example 1: Throw exception based on condition
        System.out.println("--- Example 1: Age Validation ---");
        try {
            checkAge(25);
            checkAge(15);  // Will throw exception
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Exception: " + e.getMessage());
        }
        
        // Example 2: Throw in method
        System.out.println("\n--- Example 2: Division Validation ---");
        try {
            int result = safeDivide(10, 2);
            System.out.println("10 / 2 = " + result);
            
            result = safeDivide(10, 0);  // Will throw exception
        } catch (ArithmeticException e) {
            System.out.println("❌ " + e.getMessage());
        }
        
        // Example 3: Withdraw validation
        System.out.println("\n--- Example 3: Bank Withdrawal ---");
        try {
            withdraw(1000, 500);
            withdraw(1000, 1500);  // Will throw exception
        } catch (IllegalArgumentException e) {
            System.out.println("❌ " + e.getMessage());
        }
        
        // Example 4: Rethrowing exceptions
        System.out.println("\n--- Example 4: Rethrowing Exceptions ---");
        try {
            methodThatRethrows();
        } catch (RuntimeException e) {
            System.out.println("❌ Caught rethrown exception in main");
        }
        
        System.out.println("\n✅ All examples completed\!");
    }
    
    // Validate age
    public static void checkAge(int age) {
        System.out.println("Checking age: " + age);
        if (age < 18) {
            throw new IllegalArgumentException("Age must be 18 or above");
        }
        System.out.println("✅ Age is valid");
    }
    
    // Safe division
    public static int safeDivide(int numerator, int denominator) {
        if (denominator == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        return numerator / denominator;
    }
    
    // Bank withdrawal
    public static void withdraw(double balance, double amount) {
        System.out.println("Attempting to withdraw $" + amount + " from balance $" + balance);
        
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient balance");
        }
        
        double newBalance = balance - amount;
        System.out.println("✅ Withdrawal successful. New balance: $" + newBalance);
    }
    
    // Rethrowing example
    public static void methodThatRethrows() {
        try {
            System.out.println("Method: attempting risky operation");
            throw new RuntimeException("Something went wrong\!");
        } catch (RuntimeException e) {
            System.out.println("Method: caught exception, logging and rethrowing");
            throw e;  // Rethrow to caller
        }
    }
}
```

**Expected Output:**
```
===== THROW KEYWORD DEMO =====

--- Example 1: Age Validation ---
Checking age: 25
✅ Age is valid
Checking age: 15
❌ Exception: Age must be 18 or above

--- Example 2: Division Validation ---
10 / 2 = 5
❌ Cannot divide by zero

--- Example 3: Bank Withdrawal ---
Attempting to withdraw $500.0 from balance $1000.0
✅ Withdrawal successful. New balance: $500.0
Attempting to withdraw $1500.0 from balance $1000.0
❌ Insufficient balance

--- Example 4: Rethrowing Exceptions ---
Method: attempting risky operation
Method: caught exception, logging and rethrowing
❌ Caught rethrown exception in main

✅ All examples completed\!
```

**✅ Success Criteria:**
- [ ] Can throw exceptions manually
- [ ] Understand when to throw exceptions
- [ ] Can validate input and throw on invalid data
- [ ] Know how to rethrow exceptions
- [ ] Can create validation methods

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `throw new Exception` | Too general | Use specific exception type |
| Not providing message | Hard to debug | `throw new Exception("message")` |
| Throwing checked exceptions without throws clause | Won't compile | Add throws or use unchecked |
| Catching and ignoring before throw | Defeats purpose | Rethrow or handle properly |

**🎯 Challenge:**
Create a Student registration system:
1. validateName(String) - throw if null/empty
2. validateAge(int) - throw if < 16 or > 100
3. validateEmail(String) - throw if doesn't contain @
4. registerStudent(name, age, email) - calls all validators
5. Handle all thrown exceptions in main

---

### 🎯 Exercise 6: Complete Exception Handling Example (25 minutes)

**What you'll learn:**
- Combining all exception handling concepts
- Building robust applications
- Proper exception handling strategy
- Real-world exception scenarios

**📖 Concept: Comprehensive Exception Handling**

A complete application using:
- try-catch for handling
- multiple catch blocks
- finally for cleanup
- throw for validation
- try-with-resources

---

**📝 Step-by-Step Code:**

```java
import java.util.Scanner;
import java.util.ArrayList;

public class BankAccountSystem {
    
    // Custom exception-safe bank account
    static class BankAccount {
        private String accountNumber;
        private String ownerName;
        private double balance;
        
        public BankAccount(String accountNumber, String ownerName, double initialBalance) {
            // Validation with exceptions
            if (accountNumber == null || accountNumber.trim().isEmpty()) {
                throw new IllegalArgumentException("Account number cannot be empty");
            }
            if (ownerName == null || ownerName.trim().isEmpty()) {
                throw new IllegalArgumentException("Owner name cannot be empty");
            }
            if (initialBalance < 0) {
                throw new IllegalArgumentException("Initial balance cannot be negative");
            }
            
            this.accountNumber = accountNumber;
            this.ownerName = ownerName;
            this.balance = initialBalance;
        }
        
        public void deposit(double amount) {
            if (amount <= 0) {
                throw new IllegalArgumentException("Deposit amount must be positive");
            }
            balance += amount;
            System.out.println("✅ Deposited $" + amount);
        }
        
        public void withdraw(double amount) {
            if (amount <= 0) {
                throw new IllegalArgumentException("Withdrawal amount must be positive");
            }
            if (amount > balance) {
                throw new IllegalArgumentException("Insufficient balance");
            }
            balance -= amount;
            System.out.println("✅ Withdrawn $" + amount);
        }
        
        public void displayInfo() {
            System.out.println("╔════════════════════════════════╗");
            System.out.println("║  ACCOUNT INFORMATION          ║");
            System.out.println("╠════════════════════════════════╣");
            System.out.println("║ Account: " + accountNumber);
            System.out.println("║ Owner: " + ownerName);
            System.out.println("║ Balance: $" + balance);
            System.out.println("╚════════════════════════════════╝");
        }
        
        public double getBalance() { return balance; }
    }
    
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   BANK ACCOUNT MANAGEMENT SYSTEM      ║");
        System.out.println("╚════════════════════════════════════════╝\n");
        
        ArrayList<BankAccount> accounts = new ArrayList<>();
        
        // Example 1: Create account with validation
        System.out.println("--- Creating Accounts ---");
        try {
            BankAccount acc1 = new BankAccount("ACC001", "John Doe", 1000);
            accounts.add(acc1);
            System.out.println("✅ Account created successfully");
            
            // Try invalid account
            BankAccount acc2 = new BankAccount("", "Invalid", 500);  // Throws exception
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Account creation failed: " + e.getMessage());
        }
        
        // Example 2: Perform transactions with exception handling
        System.out.println("\n--- Performing Transactions ---");
        if (\!accounts.isEmpty()) {
            BankAccount account = accounts.get(0);
            
            // Multiple operations with different exceptions
            try {
                account.deposit(500);
                account.withdraw(200);
                account.withdraw(2000);  // Will throw insufficient balance
            } catch (IllegalArgumentException e) {
                System.out.println("❌ Transaction failed: " + e.getMessage());
            } finally {
                System.out.println("\n--- Current Account Status ---");
                account.displayInfo();
            }
        }
        
        // Example 3: Try-with-resources for user input
        System.out.println("\n--- Interactive Banking ---");
        performInteractiveBanking();
        
        System.out.println("\n✅ Banking system demonstration complete\!");
    }
    
    public static void performInteractiveBanking() {
        // Try-with-resources ensures Scanner is closed
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("Enter account number:");
            String accNum = "ACC123";  // Simulated input
            
            System.out.println("Enter owner name:");
            String owner = "Alice Smith";  // Simulated input
            
            System.out.println("Enter initial balance:");
            String balanceStr = "1000";  // Simulated input
            
            try {
                double balance = Double.parseDouble(balanceStr);
                BankAccount acc = new BankAccount(accNum, owner, balance);
                
                System.out.println("\n✅ Account created successfully:");
                acc.displayInfo();
                
            } catch (NumberFormatException e) {
                System.out.println("❌ Invalid balance format");
            } catch (IllegalArgumentException e) {
                System.out.println("❌ Invalid account data: " + e.getMessage());
            } catch (Exception e) {
                System.out.println("❌ Unexpected error: " + e.getMessage());
            }
            
        } // Scanner automatically closed here
        System.out.println("✅ Resources cleaned up automatically");
    }
}
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   BANK ACCOUNT MANAGEMENT SYSTEM      ║
╚════════════════════════════════════════╝

--- Creating Accounts ---
✅ Account created successfully
❌ Account creation failed: Account number cannot be empty

--- Performing Transactions ---
✅ Deposited $500.0
✅ Withdrawn $200.0
❌ Transaction failed: Insufficient balance

--- Current Account Status ---
╔════════════════════════════════╗
║  ACCOUNT INFORMATION          ║
╠════════════════════════════════╣
║ Account: ACC001
║ Owner: John Doe
║ Balance: $1300.0
╚════════════════════════════════╝

--- Interactive Banking ---
Enter account number:
Enter owner name:
Enter initial balance:

✅ Account created successfully:
╔════════════════════════════════╗
║  ACCOUNT INFORMATION          ║
╠════════════════════════════════╣
║ Account: ACC123
║ Owner: Alice Smith
║ Balance: $1000.0
╚════════════════════════════════╝
✅ Resources cleaned up automatically

✅ Banking system demonstration complete\!
```

**✅ Success Criteria:**
- [ ] Can combine all exception concepts
- [ ] Use throw for validation
- [ ] Multiple catch blocks for different errors
- [ ] Finally for guaranteed cleanup
- [ ] Try-with-resources for auto-close
- [ ] Build robust, crash-proof applications

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| No validation before operations | Silent failures | Validate and throw |
| Not closing resources | Resource leak | Use try-with-resources |
| Generic error messages | Hard to debug | Specific, descriptive messages |
| Empty catch blocks | Hides errors | Log or handle properly |

**🎯 Challenge:**
Extend the banking system:
1. Add transfer(from, to, amount) method
2. Add transaction history (ArrayList)
3. Handle: account not found, insufficient balance, invalid amount
4. Use try-with-resources for file logging (simulate)
5. Create comprehensive exception handling throughout

---

### 🎓 Day 17 Summary: Exception Handling - Part 1

**What You Learned:**
1. ✅ What exceptions are and when they occur
2. ✅ Try-catch blocks for exception handling
3. ✅ Multiple catch blocks and proper ordering
4. ✅ Finally block for cleanup code
5. ✅ Try-with-resources for automatic resource management
6. ✅ Throw keyword for manual exception throwing

**Key Takeaways:**
- Exceptions prevent program crashes
- Always handle exceptions in risky code
- Specific exceptions before general in catch blocks
- Finally always executes (even with return)
- Try-with-resources automatically closes resources
- Throw exceptions for validation and error conditions

**Exception Handling Checklist:**
```
✅ Use try-catch for risky operations
✅ Catch specific exceptions first
✅ Use finally for cleanup
✅ Try-with-resources for AutoCloseable
✅ Throw for validation
✅ Provide meaningful error messages
✅ Never leave catch blocks empty
✅ Log or handle all exceptions
```

**Common Exceptions:**
- **ArithmeticException** - Division by zero
- **NullPointerException** - Null reference access
- **ArrayIndexOutOfBoundsException** - Invalid array index
- **NumberFormatException** - Invalid number format
- **IllegalArgumentException** - Invalid method argument
- **RuntimeException** - General runtime error

**Next: Day 18 - Exception Handling Part 2\!**
(throws keyword, checked vs unchecked, custom exceptions, exception hierarchy)

---
