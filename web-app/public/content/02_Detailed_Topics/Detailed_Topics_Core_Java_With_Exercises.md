# Java Core Fundamentals - Detailed Topics with Daily Coding Exercises

## How to Use This File

**For Each Day:**
1. Read all subtopics carefully
2. Understand each concept with examples
3. Complete ALL coding exercises in order
4. Type code yourself (don't copy-paste!)
5. Test your code thoroughly
6. Move to next day only after completing exercises

---

## Week 1: Java Basics & Environment Setup

### Day 1: Introduction & Setup

#### Subtopics:
1. **What is Java?**
   - Platform independence
   - Write Once, Run Anywhere (WORA)
   - Java's popularity and uses

2. **JDK vs JRE vs JVM**
   - JVM: Java Virtual Machine (runtime)
   - JRE: Java Runtime Environment (JVM + libraries)
   - JDK: Java Development Kit (JRE + development tools)

3. **Installing JDK**
   - Downloading JDK 11/17
   - Setting JAVA_HOME environment variable
   - Verifying installation

4. **IDE Setup**
   - IntelliJ IDEA Community Edition installation
   - Creating Java project
   - Understanding project structure

5. **First Java Program**
   - Class structure
   - main method syntax: `public static void main(String[] args)`
   - System.out.println()

6. **Compilation & Execution**
   - javac command (compilation)
   - java command (execution)
   - .java vs .class files

---

#### Daily Coding Exercises:

**Exercise 1: Hello World**
```
Task: Create your first Java program
- Create a class named HelloWorld
- Print "Hello, World!" to console
- Run the program successfully
```

**Exercise 2: Personal Info**
```
Task: Print your personal information
- Print your name on line 1
- Print your city on line 2
- Print your favorite hobby on line 3
- Use separate println statements
```

**Exercise 3: Multi-line Message**
```
Task: Print a formatted message
Output should look like:
========================
Welcome to Java Programming!
Author: [Your Name]
Date: January 2026
========================
```

**Exercise 4: ASCII Art**
```
Task: Print a simple pattern
Print:
  *
 ***
*****
 ***
  *
```

**Exercise 5: System Information**
```
Task: Print Java system information
- Print Java version (use System.out.println)
- Print a message: "Setup Complete!"
- Print "Ready to learn Java!"
```

**Expected Outcome:** By end of day, you should have 5 working Java programs in your IDE.

---

### Day 2: Variables & Data Types

#### Subtopics:
1. **Variables**
   - Variable definition
   - Variable naming rules (camelCase, no keywords, no spaces)
   - Declaration vs initialization

2. **Primitive Data Types (8 types)**
   - `byte`: -128 to 127, 1 byte
   - `short`: -32,768 to 32,767, 2 bytes
   - `int`: default integer, 4 bytes
   - `long`: large numbers, 8 bytes (suffix: L)
   - `float`: decimals, 4 bytes (suffix: f)
   - `double`: default decimal, 8 bytes
   - `char`: single character, 2 bytes
   - `boolean`: true/false

3. **Type Casting**
   - Implicit (widening): automatic
   - Explicit (narrowing): manual with ()

4. **Constants**
   - final keyword
   - UPPER_CASE naming

---

#### Daily Coding Exercises:

**Exercise 1: Variable Declaration**
```java
Task: Declare and initialize variables of all 8 primitive types
Requirements:
- byte: age = 25
- short: year = 2024
- int: population = 1000000
- long: distance = 123456789L
- float: price = 99.99f
- double: pi = 3.14159
- char: grade = 'A'
- boolean: isActive = true
Print all variables with labels
```

**Exercise 2: Student Information**
```java
Task: Store and display student data
Variables needed:
- String studentName
- int rollNumber
- double marks
- char grade
- boolean isPassed
Print in format:
"Student: [name], Roll: [number], Marks: [marks], Grade: [grade], Passed: [status]"
```

**Exercise 3: Type Casting Demo**
```java
Task: Demonstrate both types of casting
Part A - Implicit casting:
- int to double
- float to double
- char to int (see ASCII value)

Part B - Explicit casting:
- double to int (show data loss)
- long to int
- float to int
Print before and after values
```

**Exercise 4: Circle Calculations**
```java
Task: Calculate circle properties
Given: radius = 7.5
Calculate:
- Area = PI * r * r
- Circumference = 2 * PI * r
Use: final double PI = 3.14159
Print results with 2 decimal places
```

**Exercise 5: Temperature Converter**
```java
Task: Convert Celsius to Fahrenheit
Formula: F = (C * 9/5) + 32
Given: celsius = 25
Calculate and print Fahrenheit
Then, convert Fahrenheit back to Celsius
Print both conversions
```

**Exercise 6: Data Type Limits**
```java
Task: Print the range of data types
Use Wrapper classes:
- Byte.MIN_VALUE and Byte.MAX_VALUE
- Integer.MIN_VALUE and Integer.MAX_VALUE
- Double.MIN_VALUE and Double.MAX_VALUE
Print: "byte range: [min] to [max]"
```

**Challenge Exercise:**
```java
Task: Shopping Bill Calculator
Variables:
- Item names (3 items as String)
- Prices (double)
- Quantities (int)
- Tax rate (final double = 0.08)
Calculate:
- Subtotal
- Tax amount
- Final total
Print formatted bill
```

---

### Day 3: Operators & Expressions

#### Subtopics:
1. **Arithmetic Operators**
   - +, -, *, /, %
   - Integer vs float division

2. **Relational Operators**
   - ==, !=, >, <, >=, <=

3. **Logical Operators**
   - &&, ||, !
   - Short-circuit evaluation

4. **Assignment Operators**
   - =, +=, -=, *=, /=, %=

5. **Increment/Decrement**
   - ++i (pre-increment)
   - i++ (post-increment)

6. **Operator Precedence**

---

#### Daily Coding Exercises:

**Exercise 1: Basic Calculator**
```java
Task: Create a simple calculator
Given: int a = 15, b = 4
Perform and print:
- Addition: a + b
- Subtraction: a - b
- Multiplication: a * b
- Division: a / b (integer)
- Division: (double)a / b (with decimal)
- Modulus: a % b
- Result of: (a + b) * (a - b)
```

**Exercise 2: Even or Odd Checker**
```java
Task: Check if numbers are even or odd
Test numbers: 10, 15, 24, 33, 100
For each number:
- Use modulus operator (% 2)
- Print "[number] is Even" or "[number] is Odd"
```

**Exercise 3: Comparison Operations**
```java
Task: Compare two numbers
Given: int x = 10, y = 20
Print results of:
- x == y
- x != y
- x > y
- x < y
- x >= y
- x <= y
Format: "10 == 20: false"
```

**Exercise 4: Logical Operations**
```java
Task: Test logical operators
Given: int age = 25, int salary = 30000
Check conditions:
- age > 18 && salary > 20000
- age < 30 || salary > 50000
- !(age < 18)
Print each with meaningful message
Example: "Eligible for loan: true"
```

**Exercise 5: Increment/Decrement Demo**
```java
Task: Understand pre and post increment
int x = 5;
Print: x (should be 5)
Print: x++ (should be 5)
Print: x (should be 6)
Print: ++x (should be 7)
Print: x (should be 7)

int y = 10;
Print: y-- (should be 10)
Print: y (should be 9)
Print: --y (should be 8)
```

**Exercise 6: Compound Assignment**
```java
Task: Use compound operators
int score = 50;
score += 10;  // Add 10
Print score

score -= 5;   // Subtract 5
Print score

score *= 2;   // Multiply by 2
Print score

score /= 3;   // Divide by 3
Print score
```

**Exercise 7: Number Swapper**
```java
Task: Swap two numbers without third variable
Given: a = 10, b = 20
Use arithmetic operations:
a = a + b;
b = a - b;
a = a - b;
Print before and after values
```

**Challenge Exercise: Expression Evaluator**
```java
Task: Evaluate complex expressions
Given: int a = 10, b = 5, c = 3
Calculate and print:
1. a + b * c
2. (a + b) * c
3. a / b + c * 2
4. a % b + c
5. a > b && b > c
6. a + b > c || b < c
Show operator precedence effects
```

---

### Day 4: Control Flow - Conditional Statements

#### Subtopics:
1. **if Statement**
   - Basic syntax
   - Boolean conditions
   - Code block execution

2. **if-else Statement**
   - Two-way decision

3. **if-else-if Ladder**
   - Multiple conditions
   - Order matters

4. **Nested if**
   - if inside if

5. **switch-case**
   - Multiple options
   - break statement
   - default case

6. **Ternary Operator**
   - condition ? value1 : value2

---

#### Daily Coding Exercises:

**Exercise 1: Age Validator**
```java
Task: Check if age is valid for voting
Input: int age = 17
If age >= 18:
  Print "Eligible to vote"
Else:
  Print "Not eligible to vote"

Test with ages: 17, 18, 25, 10
```

**Exercise 2: Number Sign Checker**
```java
Task: Check if number is positive, negative, or zero
Input: int number
Three conditions:
- if number > 0: print "Positive"
- else if number < 0: print "Negative"
- else: print "Zero"

Test with: 10, -5, 0
```

**Exercise 3: Grade Calculator**
```java
Task: Assign grade based on marks
Input: int marks
Conditions:
- 90-100: Grade A
- 80-89: Grade B
- 70-79: Grade C
- 60-69: Grade D
- Below 60: Grade F

Test with: 95, 82, 75, 65, 45
```

**Exercise 4: Largest of Three Numbers**
```java
Task: Find largest among three numbers
Input: int a = 10, b = 25, c = 15
Use nested if or if-else-if
Print: "Largest number is: [number]"

Test with different combinations
```

**Exercise 5: Day of Week**
```java
Task: Print day name using switch-case
Input: int day (1-7)
1 = Monday
2 = Tuesday
...
7 = Sunday

Include default for invalid input
Test with: 1, 5, 7, 9
```

**Exercise 6: Simple Calculator with switch**
```java
Task: Calculator using switch-case
Inputs:
- int num1 = 10
- int num2 = 5
- char operator = '+' (or '-', '*', '/', '%')

Switch on operator:
case '+': print sum
case '-': print difference
case '*': print product
case '/': print quotient
case '%': print remainder
default: print "Invalid operator"
```

**Exercise 7: Leap Year Checker**
```java
Task: Check if year is leap year
Input: int year = 2024
Rules:
- Divisible by 4 AND not divisible by 100, OR
- Divisible by 400

Test with: 2024, 2023, 2000, 1900
```

**Exercise 8: Ternary Operator Practice**
```java
Task: Use ternary for quick decisions
1. Check if number is even/odd
   String result = (num % 2 == 0) ? "Even" : "Odd";

2. Find max of two numbers
   int max = (a > b) ? a : b;

3. Check pass/fail
   String status = (marks >= 40) ? "Pass" : "Fail";
```

**Challenge Exercise: Nested Decision - Loan Eligibility**
```java
Task: Check loan eligibility
Inputs:
- int age
- double salary
- int creditScore
- boolean hasLoan

Rules:
- Age must be between 21 and 60
- If age valid, check salary >= 25000
- If salary valid, check creditScore >= 650
- If all valid, check hasLoan == false
- Print appropriate message at each level
```

---

### Day 5: Control Flow - Loops

#### Subtopics:
1. **while Loop**
   - Entry-controlled
   - Condition first

2. **do-while Loop**
   - Exit-controlled
   - Executes at least once

3. **for Loop**
   - Most common
   - Initialization, condition, increment

4. **Enhanced for Loop**
   - For arrays and collections

5. **Loop Control**
   - break
   - continue

6. **Nested Loops**

---

#### Daily Coding Exercises:

**Exercise 1: Print Numbers 1 to 10**
```java
Task: Use while loop
Initialize: int i = 1
While i <= 10:
  Print i
  i++
```

**Exercise 2: Print Even Numbers**
```java
Task: Print even numbers from 2 to 20
Use for loop:
for(int i = 2; i <= 20; i += 2)
```

**Exercise 3: Countdown Timer**
```java
Task: Count down from 10 to 1
Use while loop
Print: 10, 9, 8, ... 1, "Blast off!"
```

**Exercise 4: Sum of Numbers**
```java
Task: Calculate sum of 1 to 100
Use for loop
int sum = 0;
Add each number to sum
Print final sum (should be 5050)
```

**Exercise 5: Multiplication Table**
```java
Task: Print multiplication table of 5
Output:
5 x 1 = 5
5 x 2 = 10
...
5 x 10 = 50

Use for loop from 1 to 10
```

**Exercise 6: Factorial Calculator**
```java
Task: Calculate factorial of number
Input: int n = 5
Result: 5! = 5 * 4 * 3 * 2 * 1 = 120
Use while or for loop
```

**Exercise 7: Fibonacci Series**
```java
Task: Print first 10 Fibonacci numbers
Output: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
Logic:
- Start with 0 and 1
- Next = previous1 + previous2
Use for loop
```

**Exercise 8: Do-While Demo**
```java
Task: Demonstrate do-while
Ask user to enter positive number
Keep asking until positive number entered
(Simulate with predefined values for practice)
```

**Exercise 9: Pattern - Right Triangle**
```java
Task: Print right triangle
*
**
***
****
*****

Use nested loops:
Outer loop: rows (1 to 5)
Inner loop: stars (1 to current row)
```

**Exercise 10: Pattern - Number Pyramid**
```java
Task: Print number pyramid
1
12
123
1234
12345

Outer loop: rows
Inner loop: numbers
```

**Exercise 11: Break Statement**
```java
Task: Find first number divisible by both 3 and 5
Check numbers from 1 to 100
When found, print it and break
```

**Exercise 12: Continue Statement**
```java
Task: Print odd numbers from 1 to 20
Use for loop from 1 to 20
If number is even, continue
Else print the number
```

**Exercise 13: Sum of Digits**
```java
Task: Find sum of digits in a number
Input: int number = 12345
Result: 1 + 2 + 3 + 4 + 5 = 15
Use while loop with % and / operators
```

**Challenge Exercise: Prime Number Checker**
```java
Task: Check if number is prime
Input: int num = 29
Logic:
- Check divisibility from 2 to num/2
- If divisible by any, not prime
- Use for loop with flag variable
Print: "[num] is Prime" or "Not Prime"
Test with: 2, 7, 15, 29, 100
```

**Challenge Exercise 2: Pattern - Diamond**
```java
Task: Print diamond pattern
  *
 ***
*****
 ***
  *

Hint: Two parts
Part 1: Increasing stars (pyramid)
Part 2: Decreasing stars (inverted pyramid)
Use nested loops
```

---

### Day 6: Arrays - Part 1

#### Subtopics:
1. **Array Basics**
   - Fixed size collection
   - Zero-based indexing
   - Homogeneous elements

2. **Declaration and Initialization**
   - `int[] arr = new int[5];`
   - `int[] arr = {1, 2, 3};`

3. **Accessing Elements**
   - arr[index]
   - ArrayIndexOutOfBoundsException

4. **Array Length**
   - arr.length

5. **Iterating Arrays**
   - for loop
   - enhanced for loop

---

#### Daily Coding Exercises:

**Exercise 1: Array Declaration and Initialization**
```java
Task: Create and initialize arrays
1. int[] numbers = new int[5];
   Assign values: 10, 20, 30, 40, 50

2. String[] names = {"Alice", "Bob", "Charlie"};

3. double[] prices = {99.99, 149.50, 79.99};

Print all arrays
```

**Exercise 2: Array Iteration**
```java
Task: Iterate and print arrays
Create: int[] numbers = {5, 10, 15, 20, 25};

Method 1: Using regular for loop with index
Method 2: Using enhanced for loop
Print each element with its index
```

**Exercise 3: Sum of Array Elements**
```java
Task: Calculate sum of array
int[] numbers = {10, 20, 30, 40, 50};
Use loop to add all elements
Print: "Sum = [result]"
Also print average
```

**Exercise 4: Find Maximum in Array**
```java
Task: Find largest element
int[] numbers = {45, 78, 12, 90, 34, 67};
Logic:
- Assume first element is max
- Compare with each element
- Update max if larger found
Print: "Maximum = [result]"
```

**Exercise 5: Find Minimum in Array**
```java
Task: Find smallest element
int[] numbers = {45, 78, 12, 90, 34, 67};
Similar logic to max
Print: "Minimum = [result]"
```

**Exercise 6: Search Element in Array**
```java
Task: Search for a number
int[] numbers = {10, 20, 30, 40, 50};
int searchKey = 30;

Use loop to search
If found: print "Found at index [i]"
If not found: print "Not found"

Test with existing and non-existing numbers
```

**Exercise 7: Reverse an Array**
```java
Task: Reverse array elements
Input: {1, 2, 3, 4, 5}
Output: {5, 4, 3, 2, 1}

Method 1: Create new array
Method 2: Swap elements in same array
Print original and reversed
```

**Exercise 8: Count Even and Odd**
```java
Task: Count even and odd numbers
int[] numbers = {12, 7, 18, 9, 24, 15, 30};
Use loop to count:
- Even numbers
- Odd numbers
Print both counts
```

**Exercise 9: Copy Array**
```java
Task: Copy one array to another
Original: {10, 20, 30, 40, 50}
Create new array of same size
Copy all elements using loop
Print both arrays
Modify copy and show original unchanged
```

**Exercise 10: Find Second Largest**
```java
Task: Find second largest element
int[] numbers = {45, 78, 12, 90, 34, 67, 90};
Logic:
- Find largest
- Find largest excluding first largest
- Handle duplicates
Print result
```

**Challenge Exercise: Array Statistics**
```java
Task: Calculate array statistics
int[] marks = {85, 92, 78, 95, 88, 76, 90};

Calculate and print:
1. Total marks
2. Average marks
3. Highest marks
4. Lowest marks
5. Number of students above average
6. Number of students below average

Format output nicely
```

---

### Day 7: Arrays - Part 2 & Week Review

#### Subtopics:
1. **Multi-dimensional Arrays**
   - 2D arrays (matrix)
   - Declaration: `int[][] arr = new int[3][3];`

2. **Jagged Arrays**
   - Arrays with different row sizes

3. **Arrays Utility Class**
   - `import java.util.Arrays;`
   - sort(), toString(), equals()

---

#### Daily Coding Exercises:

**Exercise 1: 2D Array Creation**
```java
Task: Create and print 2D array
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

Print in matrix format:
1 2 3
4 5 6
7 8 9

Use nested loops
```

**Exercise 2: Sum of 2D Array**
```java
Task: Calculate sum of all elements in matrix
int[][] numbers = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
Use nested loops
Print total sum
```

**Exercise 3: Row and Column Sums**
```java
Task: Calculate sum of each row and column
Matrix:
1 2 3
4 5 6
7 8 9

Output:
Row 0 sum: 6
Row 1 sum: 15
Row 2 sum: 24
Column 0 sum: 12
Column 1 sum: 15
Column 2 sum: 18
```

**Exercise 4: Matrix Transpose**
```java
Task: Transpose a matrix (swap rows and columns)
Original:
1 2 3
4 5 6

Transposed:
1 4
2 5
3 6

Create new matrix for result
```

**Exercise 5: Jagged Array**
```java
Task: Create and use jagged array
int[][] jagged = new int[3][];
jagged[0] = new int[]{1, 2};
jagged[1] = new int[]{3, 4, 5};
jagged[2] = new int[]{6, 7, 8, 9};

Print:
1 2
3 4 5
6 7 8 9
```

**Exercise 6: Arrays.sort() Demo**
```java
Task: Use Arrays utility class
import java.util.Arrays;

int[] numbers = {45, 12, 78, 23, 90};

Print original
Arrays.sort(numbers);
Print sorted

Sort in reverse order (hint: use Collections for Integer[])
```

**Exercise 7: Arrays.toString() Demo**
```java
Task: Print array easily
import java.util.Arrays;

int[] numbers = {10, 20, 30, 40, 50};

Print using loop
Print using Arrays.toString()
See the difference in output
```

**Exercise 8: Array Equality**
```java
Task: Compare arrays
int[] arr1 = {1, 2, 3, 4, 5};
int[] arr2 = {1, 2, 3, 4, 5};
int[] arr3 = {5, 4, 3, 2, 1};

Compare using ==
Compare using Arrays.equals()
Understand the difference
```

**Challenge Exercise: Student Marks Management**
```java
Task: Manage marks for multiple students and subjects
Create 2D array:
- 5 students
- 3 subjects each

Fill with marks (you can hardcode or random)

Calculate and print:
1. Each student's total marks
2. Each student's average
3. Each subject's average
4. Highest marks in each subject
5. Student with highest total
6. Subject with highest average

Format output in a table
```

**Week 1 Review Project: Student Grade System**
```java
Task: Complete student management system
Requirements:
1. Store 10 student names in array
2. Store their marks (0-100) in another array
3. Create functions:
   - displayAllStudents()
   - findHighestScorer()
   - findLowestScorer()
   - calculateAverage()
   - countAboveAverage()
   - searchStudent(name)
   - sortByMarks() (bonus)
4. Print a formatted report

This combines: variables, operators, conditions, loops, arrays
```

---

## Week 2: Object-Oriented Programming

### Day 8: Introduction to OOP & Classes

#### Subtopics:
1. **OOP Concepts**
   - Real-world modeling
   - Objects and classes

2. **Class Components**
   - Fields (attributes)
   - Methods (behavior)

3. **Creating Objects**
   - new keyword
   - Object reference

4. **Accessing Members**
   - Dot operator

---

#### Daily Coding Exercises:

**Exercise 1: First Class - Car**
```java
Task: Create Car class
Class Car {
    Fields:
    - String brand
    - String model
    - int year
    - String color

    Method:
    - void displayInfo()
}

In main:
- Create Car object
- Set field values
- Call displayInfo()
```

**Exercise 2: Student Class**
```java
Task: Create Student class
Fields:
- String name
- int rollNumber
- double marks

Methods:
- void display()
- void checkPass() // marks >= 40

Create 3 student objects
Display their info
Check if they passed
```

**Exercise 3: BankAccount Class**
```java
Task: Create BankAccount class
Fields:
- String accountNumber
- String holderName
- double balance

Methods:
- void displayBalance()
- void deposit(double amount)
- void withdraw(double amount)

Create account, perform transactions
```

**Exercise 4: Book Class**
```java
Task: Create Book class
Fields:
- String title
- String author
- double price
- int pages

Methods:
- void displayDetails()
- void applyDiscount(double percentage)

Create 2 books, apply different discounts
```

**Exercise 5: Rectangle Class**
```java
Task: Create Rectangle class
Fields:
- double length
- double width

Methods:
- double calculateArea()
- double calculatePerimeter()
- void displayDimensions()

Create rectangle, calculate and display results
```

**Challenge Exercise: Employee Management**
```java
Task: Create Employee class
Fields:
- int employeeId
- String name
- String department
- double salary

Methods:
- void displayEmployee()
- void giveRaise(double percentage)
- double calculateAnnualSalary()

Create array of 5 employees
Give raises based on conditions:
- Salary < 30000: 20% raise
- Salary 30000-50000: 15% raise
- Salary > 50000: 10% raise

Display all employee details before and after
```

---

### Day 9: Constructors & this Keyword

#### Subtopics:
1. **Constructors**
   - Special method
   - Same name as class
   - No return type

2. **Types**
   - Default constructor
   - Parameterized constructor
   - Constructor overloading

3. **this Keyword**
   - Refers to current object
   - Differentiates fields from parameters

---

#### Daily Coding Exercises:

**Exercise 1: Default Constructor**
```java
Task: Student class with default constructor
class Student {
    String name;
    int age;

    // Default constructor
    Student() {
        name = "Unknown";
        age = 0;
    }
}

Create object, print values
```

**Exercise 2: Parameterized Constructor**
```java
Task: Car with parameterized constructor
class Car {
    String brand;
    int year;

    Car(String b, int y) {
        brand = b;
        year = y;
    }
}

Create: Car c = new Car("Toyota", 2024);
```

**Exercise 3: this Keyword**
```java
Task: Use this to avoid confusion
class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;  // this.name is field
        this.age = age;    // name is parameter
    }
}
```

**Exercise 4: Constructor Overloading**
```java
Task: Rectangle with multiple constructors
class Rectangle {
    double length;
    double width;

    // Square (1 parameter)
    Rectangle(double side) {
        length = side;
        width = side;
    }

    // Rectangle (2 parameters)
    Rectangle(double l, double w) {
        length = l;
        width = w;
    }

    // Default (unit square)
    Rectangle() {
        length = 1;
        width = 1;
    }
}

Create 3 rectangles using each constructor
```

**Exercise 5: Constructor Chaining**
```java
Task: Employee with constructor chaining
class Employee {
    String name;
    double salary;
    String department;

    Employee(String name) {
        this(name, 30000); // Call 2-param constructor
    }

    Employee(String name, double salary) {
        this(name, salary, "General"); // Call 3-param
    }

    Employee(String name, double salary, String dept) {
        this.name = name;
        this.salary = salary;
        this.department = dept;
    }
}

Create employees with different constructors
```

**Challenge Exercise: Bank Account System**
```java
Task: Complete banking system with constructors

class BankAccount {
    String accountNumber;
    String holderName;
    double balance;
    String accountType; // "Savings" or "Current"

    // Constructor 1: New account with opening balance
    BankAccount(String accNum, String name, double openingBalance) {
        // Initialize all fields
    }

    // Constructor 2: New account (default balance = 1000)
    BankAccount(String accNum, String name) {
        // Call first constructor with 1000
    }

    // Constructor 3: Full specification
    BankAccount(String accNum, String name, double balance, String type) {
        // Initialize all fields
    }

    void deposit(double amount) {}
    void withdraw(double amount) {}
    void display() {}
}

Create 3 accounts using different constructors
Perform 5 transactions total
Display final state of all accounts
```

---

**[Continue for remaining days...]**

---

## Daily Practice Tips:

### For Each Exercise:
1. **Read carefully** - Understand requirements
2. **Plan first** - Write pseudocode or logic
3. **Code step by step** - Don't rush
4. **Test thoroughly** - Try different inputs
5. **Debug** - Fix errors yourself
6. **Optimize** - Can you make it better?

### Completion Checklist Per Day:
- [ ] Completed all basic exercises
- [ ] Completed challenge exercise
- [ ] All code compiles without errors
- [ ] All code produces expected output
- [ ] Understand WHY code works
- [ ] Can explain code to someone else

### When Stuck:
1. Re-read the problem
2. Break into smaller steps
3. Review subtopics section
4. Try similar examples
5. Google specific errors
6. Move to next exercise, return later

---

**Note:** This is a comprehensive practice workbook. Completing all exercises will give you solid practical skills. Don't skip exercises - each builds on previous ones!

**Continue this pattern for Days 10-30...**
