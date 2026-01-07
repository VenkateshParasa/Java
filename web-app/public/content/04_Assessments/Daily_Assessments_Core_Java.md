# Java Core Fundamentals - Daily Assessment Questions (Days 1-30)

## How to Use This Assessment Guide

### Daily Routine:
1. **After completing the day's learning**, attempt these questions
2. **Don't look at answers** until you've tried all questions
3. **Time yourself**: Aim for 30-45 minutes per day's assessment
4. **Score yourself** using the answer key at the end

### Scoring Guide:
- **MCQs**: 2 points each
- **Short Answer**: 3 points each
- **Coding Problems**: 5 points each

### Performance Levels:
- **90-100%**: Excellent! Move to next day
- **75-89%**: Good. Review weak areas, then move on
- **60-74%**: Average. Review the day's topics again
- **Below 60%**: Needs work. Re-study the day's material

---

# WEEK 1 ASSESSMENTS

## Day 1: Introduction & Setup

### Multiple Choice Questions (2 points each)

**Q1.** What does JVM stand for?
- A) Java Virtual Method
- B) Java Variable Machine
- C) Java Virtual Machine
- D) Java Verified Machine

**Q2.** Which component is needed to run Java programs?
- A) JDK only
- B) JRE only
- C) JVM only
- D) IDE only

**Q3.** What is the correct extension for Java source files?
- A) .class
- B) .java
- C) .jv
- D) .src

**Q4.** Which command is used to compile Java programs?
- A) java
- B) javac
- C) compile
- D) run

**Q5.** What is the entry point of a Java application?
- A) start() method
- B) init() method
- C) main() method
- D) begin() method

**Q6.** What is the correct signature of the main method?
- A) public void main(String[] args)
- B) public static void main(String[] args)
- C) static void main(String args)
- D) public main(String[] args)

### Short Answer Questions (3 points each)

**Q7.** Explain the difference between JDK, JRE, and JVM in your own words.

**Q8.** Why is Java called a "platform-independent" language?

**Q9.** What happens when you compile a Java file? What files are generated?

### Coding Problems (5 points each)

**Q10.** Write a Java program that prints "Hello, Java!" to the console.

**Q11.** Write a Java program that prints your name on one line and your favorite programming language on the next line.

**Total Points: 35**

---

## Day 2: Variables & Data Types

### Multiple Choice Questions (2 points each)

**Q1.** Which of the following is NOT a primitive data type in Java?
- A) int
- B) boolean
- C) String
- D) char

**Q2.** What is the size of an int in Java?
- A) 2 bytes
- B) 4 bytes
- C) 8 bytes
- D) 16 bytes

**Q3.** Which keyword is used to define a constant in Java?
- A) const
- B) constant
- C) final
- D) static

**Q4.** What is the default value of a boolean variable?
- A) true
- B) false
- C) 0
- D) null

**Q5.** Which of these is a valid variable name?
- A) 2variable
- B) variable_2
- C) variable-2
- D) class

**Q6.** What will happen when you try: int x = 3.5;
- A) Compiles successfully
- B) Compilation error
- C) Runtime error
- D) x will be 3

**Q7.** Which suffix is used for float literals?
- A) l or L
- B) f or F
- C) d or D
- D) No suffix needed

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between primitive data types and reference types.

**Q9.** What is type casting? Give an example of implicit and explicit casting.

**Q10.** Why should we use the final keyword for constants? What benefit does it provide?

### Coding Problems (5 points each)

**Q11.** Write a program that declares variables of all 8 primitive types and prints their values.

**Q12.** Write a program to calculate the area of a circle. Use a constant for PI (3.14159) and take radius as input value of 5.

**Q13.** Write a program that demonstrates explicit type casting from double to int. Show data loss.

**Total Points: 44**

---

## Day 3: Operators & Expressions

### Multiple Choice Questions (2 points each)

**Q1.** What is the result of 10 % 3?
- A) 3
- B) 0
- C) 1
- D) 3.33

**Q2.** What is the value of x after: int x = 5; x++;
- A) 4
- B) 5
- C) 6
- D) 10

**Q3.** What is the difference between ++x and x++?
- A) No difference
- B) ++x increments before use, x++ increments after use
- C) ++x increments by 2, x++ increments by 1
- D) ++x is faster

**Q4.** What will be the output: System.out.println(5 > 3 && 2 < 1);
- A) true
- B) false
- C) 1
- D) Compilation error

**Q5.** What is the result of: 10 / 3 (integer division)
- A) 3.33
- B) 3.0
- C) 3
- D) 4

**Q6.** Which operator has the highest precedence?
- A) +
- B) *
- C) ()
- D) ==

**Q7.** What is the output: int a = 10; a += 5; System.out.println(a);
- A) 10
- B) 15
- C) 5
- D) 105

### Short Answer Questions (3 points each)

**Q8.** Explain short-circuit evaluation in logical operators with an example.

**Q9.** What is the difference between / (division) and % (modulus) operators?

### Coding Problems (5 points each)

**Q10.** Write a program that takes two integers and prints the result of all arithmetic operations (+, -, *, /, %).

**Q11.** Write a program to check if a number is even or odd using the modulus operator.

**Q12.** Write a program to swap two numbers without using a third variable.

**Total Points: 38**

---

## Day 4: Control Flow - Conditional Statements

### Multiple Choice Questions (2 points each)

**Q1.** What is the output of the following?
```java
int x = 10;
if (x > 5)
    System.out.println("A");
    System.out.println("B");
```
- A) A
- B) B
- C) A B
- D) Nothing

**Q2.** Which statement is true about switch-case?
- A) Can only use int
- B) Can use String (Java 7+)
- C) break is optional
- D) default must be last

**Q3.** What happens if break is omitted in a switch case?
- A) Compilation error
- B) Runtime error
- C) Fall-through to next case
- D) Nothing

**Q4.** What is the syntax of the ternary operator?
- A) condition ? true : false
- B) if ? then : else
- C) condition : true ? false
- D) true ? false : condition

**Q5.** In an if-else-if ladder, when does the else block execute?
- A) Always
- B) When all conditions are false
- C) When first condition is true
- D) Never

**Q6.** Can an if statement exist without an else?
- A) Yes
- B) No
- C) Only with switch
- D) Only in loops

### Short Answer Questions (3 points each)

**Q7.** Explain the difference between if-else and switch-case. When would you use each?

**Q8.** What is a nested if statement? Give a real-world example where it would be useful.

**Q9.** Explain fall-through behavior in switch-case.

### Coding Problems (5 points each)

**Q10.** Write a program that takes a number (0-100) and prints the grade:
- 90-100: A
- 80-89: B
- 70-79: C
- 60-69: D
- Below 60: F

**Q11.** Write a program to find the largest of three numbers.

**Q12.** Write a program using switch-case that takes a number (1-7) and prints the corresponding day of the week.

**Total Points: 42**

---

## Day 5: Control Flow - Loops

### Multiple Choice Questions (2 points each)

**Q1.** What is the output of:
```java
for(int i = 0; i < 3; i++) {
    System.out.print(i + " ");
}
```
- A) 0 1 2
- B) 1 2 3
- C) 0 1 2 3
- D) 1 2

**Q2.** Which loop guarantees at least one execution?
- A) while
- B) for
- C) do-while
- D) All of them

**Q3.** What does the break statement do?
- A) Exits the loop
- B) Skips current iteration
- C) Restarts the loop
- D) Does nothing

**Q4.** What does the continue statement do?
- A) Exits the loop
- B) Skips to next iteration
- C) Restarts the loop
- D) Continues to next line

**Q5.** What is an infinite loop?
- A) A loop that never starts
- B) A loop that never ends
- C) A loop with no body
- D) A loop with break

**Q6.** How many times will this loop execute?
```java
int i = 5;
while(i < 5) {
    i++;
}
```
- A) 0
- B) 1
- C) 5
- D) Infinite

**Q7.** What is the enhanced for loop used for?
- A) Mathematical calculations
- B) Iterating arrays/collections
- C) Conditional logic
- D) Method calls

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between while and do-while loops.

**Q9.** What is the purpose of the continue statement? Give an example where it's useful.

### Coding Problems (5 points each)

**Q10.** Write a program to print all numbers from 1 to 100.

**Q11.** Write a program to calculate the factorial of a number (e.g., 5! = 5*4*3*2*1 = 120).

**Q12.** Write a program to print the Fibonacci series up to 10 terms (0, 1, 1, 2, 3, 5, 8, 13, 21, 34).

**Q13.** Write a program to print this pattern:
```
*
**
***
****
*****
```

**Total Points: 47**

---

## Day 6: Arrays - Part 1

### Multiple Choice Questions (2 points each)

**Q1.** What is the index of the first element in an array?
- A) -1
- B) 0
- C) 1
- D) Depends on declaration

**Q2.** How do you declare an integer array in Java?
- A) int[] arr
- B) int arr[]
- C) Both A and B
- D) array int arr

**Q3.** What exception is thrown when accessing an invalid array index?
- A) NullPointerException
- B) ArrayException
- C) ArrayIndexOutOfBoundsException
- D) IndexException

**Q4.** How do you find the length of an array?
- A) arr.length()
- B) arr.length
- C) arr.size()
- D) arr.size

**Q5.** What is the default value of int array elements?
- A) null
- B) 0
- C) -1
- D) Garbage value

**Q6.** Which is the correct way to initialize an array with values?
- A) int[] arr = {1, 2, 3};
- B) int[] arr = new int[]{1, 2, 3};
- C) Both A and B
- D) int[] arr = [1, 2, 3];

**Q7.** Can the size of an array change after creation?
- A) Yes
- B) No
- C) Only if using ArrayList
- D) Only with resize method

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between array declaration and initialization.

**Q9.** What happens when you try to access an array element beyond its length?

**Q10.** Why is array.length a property and not a method?

### Coding Problems (5 points each)

**Q11.** Write a program to find the maximum element in an array.

**Q12.** Write a program to calculate the sum and average of array elements.

**Q13.** Write a program to reverse an array.

**Total Points: 44**

---

## Day 7: Arrays - Part 2 & Week 1 Review

### Multiple Choice Questions (2 points each)

**Q1.** How do you declare a 2D array?
- A) int[][] arr
- B) int arr[][]
- C) Both A and B
- D) int[2D] arr

**Q2.** What is a jagged array?
- A) Array with irregular rows
- B) Array with missing elements
- C) 1D array only
- D) Sorted array

**Q3.** Which method sorts an array?
- A) Array.sort()
- B) Arrays.sort()
- C) array.sort()
- D) sort(array)

**Q4.** How do you access an element in a 2D array?
- A) arr[row][col]
- B) arr[row, col]
- C) arr(row)(col)
- D) arr.get(row, col)

**Q5.** What package contains the Arrays utility class?
- A) java.lang
- B) java.util
- C) java.array
- D) java.io

**Q6.** Which method converts an array to String?
- A) array.toString()
- B) Arrays.toString(array)
- C) String.valueOf(array)
- D) array.toStr()

### Short Answer Questions (3 points each)

**Q7.** Explain the difference between a regular 2D array and a jagged array.

**Q8.** List three useful methods from the Arrays utility class and what they do.

**Q9.** How do you copy an array? Mention at least two ways.

### Coding Problems (5 points each)

**Q10.** Write a program to create a 3x3 matrix and print it.

**Q11.** Write a program to find the sum of all elements in a 2D array.

**Q12.** Write a program to search for an element in an array and return its index (return -1 if not found).

**Week 1 Review Questions:**

**Q13.** Write a complete program that:
- Creates an array of 5 student names
- Uses a loop to print all names
- Searches for a specific name
- Handles the case when name is not found

**Total Points: 47**

---

# WEEK 2 ASSESSMENTS

## Day 8: Introduction to OOP & Classes

### Multiple Choice Questions (2 points each)

**Q1.** What is a class in Java?
- A) A function
- B) A blueprint for objects
- C) A variable
- D) A package

**Q2.** What is an object?
- A) A blueprint
- B) An instance of a class
- C) A method
- D) A data type

**Q3.** Which keyword is used to create an object?
- A) create
- B) new
- C) object
- D) instance

**Q4.** What are instance variables?
- A) Variables inside methods
- B) Variables in a class
- C) Static variables
- D) Local variables

**Q5.** How do you access a member of an object?
- A) object.member
- B) object->member
- C) object::member
- D) object[member]

**Q6.** Can you create multiple objects from one class?
- A) No
- B) Yes
- C) Only two
- D) Only with inheritance

**Q7.** Which of the following is NOT a pillar of OOP?
- A) Encapsulation
- B) Compilation
- C) Inheritance
- D) Polymorphism

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between a class and an object with a real-world example.

**Q9.** What is the purpose of methods in a class?

**Q10.** What are the four pillars of OOP? Give a one-line explanation of each.

### Coding Problems (5 points each)

**Q11.** Create a Car class with attributes: brand, model, year. Create a method to display car details.

**Q12.** Create a Student class with name, rollNo, and marks. Create a method to check if the student passed (marks >= 40).

**Q13.** Create a BankAccount class with accountNo and balance. Create methods to deposit and withdraw money.

**Total Points: 44**

---

## Day 9: Constructors & this Keyword

### Multiple Choice Questions (2 points each)

**Q1.** What is a constructor?
- A) A method that returns void
- B) A special method to initialize objects
- C) A static method
- D) A final method

**Q2.** What is the name of a constructor?
- A) Can be anything
- B) Same as class name
- C) constructor
- D) init

**Q3.** Does a constructor have a return type?
- A) Yes, always void
- B) Yes, any type
- C) No return type
- D) Yes, must return an object

**Q4.** What is a default constructor?
- A) Constructor with parameters
- B) No-argument constructor
- C) Static constructor
- D) Private constructor

**Q5.** When is the default constructor provided by Java?
- A) Always
- B) Only if you don't define any constructor
- C) Never
- D) Only for public classes

**Q6.** What does the 'this' keyword refer to?
- A) Parent class
- B) Current class
- C) Current object
- D) Any object

**Q7.** Can you overload constructors?
- A) No
- B) Yes
- C) Only two constructors
- D) Only with different names

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between a default constructor and a parameterized constructor.

**Q9.** What is the purpose of the 'this' keyword? Give two use cases.

**Q10.** What is constructor chaining? How is it achieved?

### Coding Problems (5 points each)

**Q11.** Create an Employee class with two constructors: one with name only, another with name and salary.

**Q12.** Create a Rectangle class with constructors: default (1x1), one parameter (square), two parameters (rectangle).

**Q13.** Create a Person class demonstrating constructor chaining where one constructor calls another.

**Total Points: 44**

---

## Day 10: Methods & Method Overloading

### Multiple Choice Questions (2 points each)

**Q1.** What is method overloading?
- A) Having multiple methods with same name but different parameters
- B) Having multiple methods with different names
- C) Having methods in different classes
- D) Having static methods

**Q2.** Can methods be overloaded by changing only the return type?
- A) Yes
- B) No
- C) Sometimes
- D) Only for void methods

**Q3.** What is a varargs parameter?
- A) Variable arguments
- B) Array parameter
- C) Multiple parameters
- D) Optional parameter

**Q4.** What is the syntax for varargs?
- A) type... name
- B) type[] name
- C) ...type name
- D) type name...

**Q5.** Can a method have multiple varargs parameters?
- A) Yes, any number
- B) No, only one
- C) Yes, but only two
- D) No varargs allowed

**Q6.** What happens when you call a method without return statement (non-void)?
- A) Returns null
- B) Returns 0
- C) Compilation error
- D) Runtime error

**Q7.** Is Java pass-by-value or pass-by-reference?
- A) Pass-by-value
- B) Pass-by-reference
- C) Both
- D) Depends on type

### Short Answer Questions (3 points each)

**Q8.** Explain method overloading with an example. What are the rules for overloading?

**Q9.** What is the difference between a method and a function in Java?

**Q10.** Explain pass-by-value in Java. What happens when you pass objects?

### Coding Problems (5 points each)

**Q11.** Create a Calculator class with overloaded add() methods: add(int, int), add(double, double), add(int, int, int).

**Q12.** Create a method that takes varargs to calculate the sum of any number of integers.

**Q13.** Create a StringUtils class with methods: reverse(String), isPalindrome(String), countVowels(String).

**Total Points: 44**

---

## Day 11: Encapsulation & Access Modifiers

### Multiple Choice Questions (2 points each)

**Q1.** What is encapsulation?
- A) Wrapping data and methods together
- B) Inheritance
- C) Method overloading
- D) Creating objects

**Q2.** Which access modifier provides the most restricted access?
- A) public
- B) protected
- C) private
- D) default

**Q3.** What is the naming convention for a getter method?
- A) setFieldName()
- B) getFieldName()
- C) readFieldName()
- D) fieldName()

**Q4.** What is the naming convention for a setter method?
- A) getFieldName()
- B) setFieldName()
- C) writeFieldName()
- D) putFieldName()

**Q5.** Can a private member be accessed outside its class?
- A) Yes
- B) No
- C) Only in subclasses
- D) Only in same package

**Q6.** What access does default (no modifier) provide?
- A) Public access
- B) Private access
- C) Package-private access
- D) Protected access

**Q7.** Which modifier is used for data hiding?
- A) public
- B) private
- C) protected
- D) static

### Short Answer Questions (3 points each)

**Q8.** Explain the four access modifiers in Java and their visibility.

**Q9.** What are the benefits of encapsulation? Give at least three benefits.

**Q10.** Why do we use getters and setters instead of making fields public?

### Coding Problems (5 points each)

**Q11.** Create a properly encapsulated Person class with private fields: name, age. Include validation in setAge() (age > 0).

**Q12.** Create a BankAccount class with private balance. Include methods: deposit(), withdraw(), getBalance(). No setter for balance.

**Q13.** Create an Employee class demonstrating encapsulation with read-only field (no setter) for employeeId.

**Total Points: 44**

---

## Day 12: Inheritance

### Multiple Choice Questions (2 points each)

**Q1.** Which keyword is used for inheritance in Java?
- A) inherits
- B) extends
- C) implements
- D) uses

**Q2.** Which keyword is used to refer to the parent class?
- A) this
- B) parent
- C) super
- D) base

**Q3.** Can a class extend multiple classes in Java?
- A) Yes
- B) No
- C) Only interfaces
- D) Only abstract classes

**Q4.** What type of relationship does inheritance represent?
- A) HAS-A
- B) IS-A
- C) USES-A
- D) CONTAINS-A

**Q5.** Which constructor is called first in inheritance?
- A) Child class constructor
- B) Parent class constructor
- C) Both simultaneously
- D) No constructor is called

**Q6.** Can you override a private method?
- A) Yes
- B) No
- C) Only in subclass
- D) Only with super keyword

**Q7.** What is the root class of all classes in Java?
- A) Main
- B) Object
- C) Class
- D) System

### Short Answer Questions (3 points each)

**Q8.** Explain the concept of inheritance with a real-world example.

**Q9.** What is the difference between method overloading and method overriding?

**Q10.** Explain the use of super keyword in inheritance.

### Coding Problems (5 points each)

**Q11.** Create an Animal class with eat() method. Create Dog class that extends Animal and adds bark() method.

**Q12.** Create an Employee class with basic details. Create Manager class extending Employee with additional team size field.

**Q13.** Demonstrate method overriding by creating Shape class with calculateArea() and override it in Circle class.

**Total Points: 44**

---

## Day 13: Polymorphism

### Multiple Choice Questions (2 points each)

**Q1.** What is polymorphism?
- A) Many classes
- B) Many forms
- C) Many objects
- D) Many methods

**Q2.** What is compile-time polymorphism?
- A) Method overriding
- B) Method overloading
- C) Inheritance
- D) Encapsulation

**Q3.** What is runtime polymorphism?
- A) Method overriding
- B) Method overloading
- C) Constructor overloading
- D) Inheritance

**Q4.** What is upcasting?
- A) Child to Parent reference
- B) Parent to Child reference
- C) Same class casting
- D) Interface casting

**Q5.** Is explicit casting required for upcasting?
- A) Yes
- B) No
- C) Sometimes
- D) Only for primitives

**Q6.** What does instanceof operator do?
- A) Creates instance
- B) Checks object type
- C) Casts object
- D) Deletes object

**Q7.** When would downcasting fail?
- A) Never
- B) When object is not of that type
- C) Always
- D) Only with interfaces

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between compile-time and runtime polymorphism.

**Q9.** What is dynamic method dispatch? How does it work?

**Q10.** When and why would you use the instanceof operator?

### Coding Problems (5 points each)

**Q11.** Create a demonstration of runtime polymorphism: Animal class with makeSound() method, Dog and Cat classes overriding it.

**Q12.** Create a Payment system demonstrating polymorphism: Payment class, CreditCard, DebitCard, and UPI classes.

**Q13.** Write a program demonstrating upcasting and downcasting with instanceof checking.

**Total Points: 44**

---

## Day 14: Abstraction - Abstract Classes & Interfaces & Week 2 Review

### Multiple Choice Questions (2 points each)

**Q1.** Which keyword is used to declare an abstract class?
- A) abstract
- B) interface
- C) virtual
- D) base

**Q2.** Can you instantiate an abstract class?
- A) Yes
- B) No
- C) Only with new keyword
- D) Only in subclass

**Q3.** Can an abstract class have constructors?
- A) No
- B) Yes
- C) Only default constructor
- D) Only parameterized constructor

**Q4.** Which keyword is used to declare an interface?
- A) interface
- B) abstract
- C) class
- D) type

**Q5.** Which keyword is used to implement an interface?
- A) extends
- B) implements
- C) inherits
- D) uses

**Q6.** Can a class implement multiple interfaces?
- A) No
- B) Yes
- C) Only two
- D) Only with abstract keyword

**Q7.** What are interface methods by default (before Java 8)?
- A) private
- B) protected
- C) public abstract
- D) public static

**Q8.** Can interfaces have concrete methods (Java 8+)?
- A) No
- B) Yes, default methods
- C) Yes, all methods
- D) Only static methods

### Short Answer Questions (3 points each)

**Q9.** Explain the difference between an abstract class and an interface.

**Q10.** When would you use an abstract class vs an interface?

**Q11.** What are default methods in interfaces? Why were they introduced in Java 8?

### Coding Problems (5 points each)

**Q12.** Create an abstract Shape class with abstract calculateArea() method. Create Circle and Rectangle classes.

**Q13.** Create a Drawable interface with draw() method. Implement it in Circle and Rectangle classes.

**Q14.** Create a Vehicle abstract class and Flyable interface. Create Airplane class that extends Vehicle and implements Flyable.

**Week 2 Review Question:**

**Q15.** Create a complete program demonstrating all OOP concepts:
- Create an abstract Animal class with eat() abstract method
- Create Herbivore interface with eatPlants() method
- Create Cow class extending Animal and implementing Herbivore
- Demonstrate polymorphism and encapsulation

**Total Points: 53**

---

# WEEK 3 ASSESSMENTS

## Day 15: Strings

### Multiple Choice Questions (2 points each)

**Q1.** Are strings mutable in Java?
- A) Yes
- B) No
- C) Sometimes
- D) Depends on declaration

**Q2.** What is the difference between String s1 = "Hello" and String s2 = new String("Hello")?
- A) No difference
- B) s1 goes to string pool, s2 goes to heap
- C) s1 is faster, s2 is slower
- D) s1 is mutable, s2 is immutable

**Q3.** Which method compares string content?
- A) ==
- B) equals()
- C) compareTo()
- D) Both B and C

**Q4.** What does str.length() return?
- A) Number of words
- B) Number of characters
- C) Size in bytes
- D) Number of lines

**Q5.** What is the index of the first character in a string?
- A) -1
- B) 0
- C) 1
- D) Depends on string

**Q6.** Which class is used for mutable strings?
- A) String
- B) StringBuilder
- C) StringBuffer
- D) Both B and C

**Q7.** What is the difference between StringBuilder and StringBuffer?
- A) No difference
- B) StringBuilder is not thread-safe, StringBuffer is
- C) StringBuilder is immutable
- D) StringBuffer is faster

### Short Answer Questions (3 points each)

**Q8.** Explain why strings are immutable in Java. What are the benefits?

**Q9.** What is the string pool? How does it help with memory optimization?

**Q10.** When should you use StringBuilder instead of String?

### Coding Problems (5 points each)

**Q11.** Write a program to check if a string is a palindrome (reads same forwards and backwards).

**Q12.** Write a program to count the number of vowels and consonants in a string.

**Q13.** Write a program to reverse a string without using built-in reverse method.

**Q14.** Write a program to check if two strings are anagrams (contain same characters in different order).

**Total Points: 47**

---

## Day 16: Packages & Static Keyword

### Multiple Choice Questions (2 points each)

**Q1.** What is a package in Java?
- A) A file
- B) A folder
- C) A namespace/grouping of classes
- D) A method

**Q2.** Which statement must be first in a Java file?
- A) import
- B) package
- C) class
- D) public

**Q3.** What is the naming convention for packages?
- A) UPPERCASE
- B) PascalCase
- C) camelCase
- D) lowercase

**Q4.** What does import java.util.* do?
- A) Imports all packages
- B) Imports all classes from java.util
- C) Imports nothing
- D) Causes error

**Q5.** Can static methods access instance variables?
- A) Yes
- B) No
- C) Only with this keyword
- D) Only with super keyword

**Q6.** Can you call a static method without creating an object?
- A) No
- B) Yes
- C) Only in main method
- D) Only with new keyword

**Q7.** When is a static block executed?
- A) When object is created
- B) When class is loaded
- C) When main method runs
- D) Never

### Short Answer Questions (3 points each)

**Q8.** What is the purpose of packages in Java? Give at least three benefits.

**Q9.** Explain the difference between instance variables and static variables.

**Q10.** Why is the main method static in Java?

### Coding Problems (5 points each)

**Q11.** Create a package com.company.utils and create a MathUtils class with static methods for basic operations.

**Q12.** Create a Counter class with a static variable to count how many objects have been created.

**Q13.** Demonstrate the execution order of static blocks, constructors, and instance blocks.

**Total Points: 44**

---

## Day 17: Exception Handling - Part 1

### Multiple Choice Questions (2 points each)

**Q1.** What is an exception?
- A) A syntax error
- B) A runtime error
- C) A logical error
- D) A warning

**Q2.** Which block contains code that might throw an exception?
- A) catch
- B) try
- C) finally
- D) throw

**Q3.** Which block handles the exception?
- A) try
- B) catch
- C) finally
- D) throw

**Q4.** Does the finally block always execute?
- A) Yes
- B) No
- C) Only if exception occurs
- D) Only if no exception

**Q5.** What happens if an exception is not handled?
- A) Program continues
- B) Program terminates
- C) Exception is ignored
- D) Nothing

**Q6.** Can you have multiple catch blocks?
- A) No
- B) Yes
- C) Only two
- D) Only with multiple try blocks

**Q7.** Which keyword is used to manually throw an exception?
- A) throws
- B) throw
- C) try
- D) catch

### Short Answer Questions (3 points each)

**Q8.** Explain the purpose of try, catch, and finally blocks.

**Q9.** What is the difference between throw and throws?

**Q10.** What is try-with-resources? What advantage does it provide?

### Coding Problems (5 points each)

**Q11.** Write a program that handles ArithmeticException when dividing by zero.

**Q12.** Write a program with multiple catch blocks to handle different exceptions (ArithmeticException, ArrayIndexOutOfBoundsException).

**Q13.** Write a program demonstrating the finally block executes even when exception occurs.

**Total Points: 44**

---

## Day 18: Exception Handling - Part 2

### Multiple Choice Questions (2 points each)

**Q1.** What are checked exceptions?
- A) Exceptions checked at runtime
- B) Exceptions checked at compile time
- C) Syntax errors
- D) Logical errors

**Q2.** Which is a checked exception?
- A) NullPointerException
- B) ArithmeticException
- C) IOException
- D) ArrayIndexOutOfBoundsException

**Q3.** Which is an unchecked exception?
- A) IOException
- B) SQLException
- C) NullPointerException
- D) ClassNotFoundException

**Q4.** How do you create a custom exception?
- A) Extend Exception class
- B) Implement Exception interface
- C) Use exception keyword
- D) Cannot create custom exceptions

**Q5.** What is the parent class of all exceptions?
- A) Exception
- B) Throwable
- C) Object
- D) RuntimeException

**Q6.** What is the difference between Error and Exception?
- A) No difference
- B) Error is serious and not recoverable
- C) Exception is serious
- D) Error is syntax error

**Q7.** Can you throw multiple exceptions from a method?
- A) No
- B) Yes, using throws keyword
- C) Only two exceptions
- D) Only unchecked exceptions

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between checked and unchecked exceptions with examples.

**Q9.** What are some best practices for exception handling?

**Q10.** When should you create custom exceptions?

### Coding Problems (5 points each)

**Q11.** Create a custom InvalidAgeException and use it to validate age (must be 18+).

**Q12.** Create a method that throws IOException (checked exception) and handle it in the calling method.

**Q13.** Write a program demonstrating exception propagation through multiple methods.

**Total Points: 44**

---

## Day 19: Collections Framework - List & Set

### Multiple Choice Questions (2 points each)

**Q1.** Which package contains the Collections Framework?
- A) java.lang
- B) java.util
- C) java.io
- D) java.collection

**Q2.** Which collection allows duplicates and maintains order?
- A) Set
- B) List
- C) Map
- D) Queue

**Q3.** Which is the most commonly used List implementation?
- A) Vector
- B) LinkedList
- C) ArrayList
- D) Stack

**Q4.** What is the time complexity of get(index) in ArrayList?
- A) O(1)
- B) O(n)
- C) O(log n)
- D) O(n^2)

**Q5.** Which collection does NOT allow duplicates?
- A) List
- B) Set
- C) Queue
- D) ArrayList

**Q6.** Which Set implementation maintains insertion order?
- A) HashSet
- B) TreeSet
- C) LinkedHashSet
- D) Set

**Q7.** Which Set implementation keeps elements sorted?
- A) HashSet
- B) TreeSet
- C) LinkedHashSet
- D) Set

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between ArrayList and LinkedList. When would you use each?

**Q9.** What is the difference between List and Set?

**Q10.** What is the difference between HashSet, LinkedHashSet, and TreeSet?

### Coding Problems (5 points each)

**Q11.** Write a program to store and display a list of student names using ArrayList.

**Q12.** Write a program to remove duplicate elements from an array using a Set.

**Q13.** Write a program to demonstrate the difference between HashSet, LinkedHashSet, and TreeSet with output.

**Total Points: 44**

---

## Day 20: Collections Framework - Map & Utilities

### Multiple Choice Questions (2 points each)

**Q1.** What does a Map store?
- A) Single values
- B) Key-value pairs
- C) Only keys
- D) Only values

**Q2.** Can a Map have duplicate keys?
- A) Yes
- B) No
- C) Sometimes
- D) Depends on implementation

**Q3.** Which Map implementation maintains insertion order?
- A) HashMap
- B) TreeMap
- C) LinkedHashMap
- D) Hashtable

**Q4.** Which Map implementation sorts keys?
- A) HashMap
- B) TreeMap
- C) LinkedHashMap
- D) Hashtable

**Q5.** How do you get all keys from a Map?
- A) getKeys()
- B) keys()
- C) keySet()
- D) allKeys()

**Q6.** Which method sorts a List?
- A) List.sort()
- B) Collections.sort()
- C) Arrays.sort()
- D) sort(List)

**Q7.** What does Comparable interface require?
- A) equals() method
- B) compare() method
- C) compareTo() method
- D) sort() method

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between HashMap and TreeMap.

**Q9.** What is the difference between Comparable and Comparator?

**Q10.** How do you iterate through a Map? Mention at least two ways.

### Coding Problems (5 points each)

**Q11.** Write a program to store student names and their marks in a HashMap and display them.

**Q12.** Write a program to count the frequency of each word in an array using HashMap.

**Q13.** Create a Student class and write a program to sort students by name using Comparable.

**Q14.** Create multiple Comparators to sort students by different fields (name, marks, age).

**Total Points: 47**

---

## Day 21: Generics & Week 3 Review

### Multiple Choice Questions (2 points each)

**Q1.** What is the purpose of generics?
- A) To generate code
- B) To provide type safety
- C) To improve performance
- D) To create generic methods

**Q2.** How do you declare a generic class?
- A) class MyClass<T>
- B) class MyClass(T)
- C) class<T> MyClass
- D) generic class MyClass<T>

**Q3.** What does <T> represent in generics?
- A) Type parameter
- B) Template
- C) Class name
- D) Package name

**Q4.** Can you create a generic array?
- A) Yes
- B) No
- C) Only with ArrayList
- D) Only with Object[]

**Q5.** What does <? extends Number> mean?
- A) Any type
- B) Number and its subclasses
- C) Only Number
- D) Number and its superclasses

**Q6.** What happens to generics at runtime?
- A) They are retained
- B) Type erasure occurs
- C) They cause errors
- D) They are converted to objects

### Short Answer Questions (3 points each)

**Q7.** Why were generics introduced in Java? What problems do they solve?

**Q8.** Explain the difference between <? extends T> and <? super T>.

**Q9.** What is type erasure in generics?

### Coding Problems (5 points each)

**Q10.** Create a generic Box class that can hold any type of object.

**Q11.** Write a generic method to print elements of any type of array.

**Q12.** Create a generic class with bounded type parameter that accepts only Number types.

**Week 3 Review Question:**

**Q13.** Create a Contact Management System:
- Store contacts in appropriate collection
- Handle exceptions for invalid data
- Use String manipulation for name formatting
- Implement search functionality
- Use generics where appropriate

**Total Points: 48**

---

# WEEK 4 ASSESSMENTS

## Day 22: File Handling - Part 1

### Multiple Choice Questions (2 points each)

**Q1.** Which class represents a file or directory?
- A) FileSystem
- B) File
- C) Path
- D) Directory

**Q2.** Which class is used to read text files character by character?
- A) FileInputStream
- B) FileReader
- C) BufferedReader
- D) Scanner

**Q3.** Which class is used to write to text files?
- A) FileOutputStream
- B) FileWriter
- C) PrintWriter
- D) All of the above

**Q4.** What exception is commonly thrown during file operations?
- A) FileException
- B) IOException
- C) FileNotFoundException
- D) Both B and C

**Q5.** Which method checks if a file exists?
- A) file.exists()
- B) file.isExists()
- C) File.exists(file)
- D) file.checkExists()

**Q6.** How do you open a file in append mode with FileWriter?
- A) FileWriter(filename, true)
- B) FileWriter(filename, append)
- C) FileWriter.append(filename)
- D) FileWriter(filename, "append")

### Short Answer Questions (3 points each)

**Q7.** What is the difference between FileReader and BufferedReader?

**Q8.** Why is it important to close file resources? What happens if you don't?

**Q9.** What is try-with-resources and how does it help with file handling?

### Coding Problems (5 points each)

**Q10.** Write a program to create a text file and write some content to it.

**Q11.** Write a program to read a text file line by line and display its contents.

**Q12.** Write a program to count the number of lines in a text file.

**Q13.** Write a program to copy contents from one file to another.

**Total Points: 47**

---

## Day 23: File Handling - Part 2

### Multiple Choice Questions (2 points each)

**Q1.** What is serialization?
- A) Converting object to bytes
- B) Converting bytes to object
- C) Writing to file
- D) Reading from file

**Q2.** Which interface must a class implement to be serializable?
- A) Serialization
- B) Serializable
- C) ObjectSerializable
- D) Writable

**Q3.** Which class is used to serialize objects?
- A) ObjectWriter
- B) ObjectOutputStream
- C) FileOutputStream
- D) Serializer

**Q4.** Which class is used to deserialize objects?
- A) ObjectReader
- B) ObjectInputStream
- C) FileInputStream
- D) Deserializer

**Q5.** What does the transient keyword do?
- A) Makes field final
- B) Skips field during serialization
- C) Makes field static
- D) Makes field volatile

**Q6.** Which package contains NIO.2 classes?
- A) java.io
- B) java.nio
- C) java.nio.file
- D) java.file

### Short Answer Questions (3 points each)

**Q7.** Explain the difference between byte streams and character streams.

**Q8.** What is the purpose of serialization? Give a real-world use case.

**Q9.** What are the advantages of NIO.2 over old File API?

### Coding Problems (5 points each)

**Q10.** Write a program to serialize and deserialize a Student object.

**Q11.** Create a class with transient field and demonstrate it is not serialized.

**Q12.** Write a program using Files class (NIO.2) to read all lines from a file.

**Total Points: 42**

---

## Day 24: Java 8 Features - Lambda & Streams

### Multiple Choice Questions (2 points each)

**Q1.** What is a lambda expression?
- A) A method
- B) An anonymous function
- C) A class
- D) An interface

**Q2.** What is a functional interface?
- A) Interface with multiple methods
- B) Interface with single abstract method
- C) Interface with no methods
- D) Abstract class

**Q3.** What is the syntax of a lambda with no parameters?
- A) -> expression
- B) () -> expression
- C) [] -> expression
- D) {} -> expression

**Q4.** What does the filter() operation do?
- A) Transforms elements
- B) Sorts elements
- C) Selects elements based on condition
- D) Counts elements

**Q5.** What does the map() operation do?
- A) Filters elements
- B) Transforms each element
- C) Sorts elements
- D) Groups elements

**Q6.** Which is a terminal operation?
- A) filter()
- B) map()
- C) collect()
- D) sorted()

**Q7.** What does :: represent in method reference?
- A) Lambda
- B) Method reference operator
- C) Scope operator
- D) Assignment

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between intermediate and terminal operations in streams.

**Q9.** What are the built-in functional interfaces in Java? Name at least four.

**Q10.** When would you use method references instead of lambda expressions?

### Coding Problems (5 points each)

**Q11.** Write a program using lambda to sort a list of strings by length.

**Q12.** Write a program using streams to filter even numbers from a list and square them.

**Q13.** Write a program using streams to find the sum of all elements in a list.

**Q14.** Use streams to group a list of strings by their first character.

**Total Points: 47**

---

## Day 25: Date & Time API

### Multiple Choice Questions (2 points each)

**Q1.** Which package contains the new Date-Time API?
- A) java.util
- B) java.time
- C) java.date
- D) java.datetime

**Q2.** Which class represents a date without time?
- A) Date
- B) LocalDate
- C) DateTime
- D) Calendar

**Q3.** Which class represents time without date?
- A) Time
- B) LocalTime
- C) DateTime
- D) Clock

**Q4.** Which class represents date and time together?
- A) DateTime
- B) LocalDateTime
- C) ZonedDateTime
- D) Date

**Q5.** What is the difference between Period and Duration?
- A) No difference
- B) Period is date-based, Duration is time-based
- C) Period is time-based, Duration is date-based
- D) Both are same

**Q6.** Which class is used to format dates?
- A) DateFormat
- B) SimpleDateFormat
- C) DateTimeFormatter
- D) Format

### Short Answer Questions (3 points each)

**Q7.** Why was a new Date-Time API introduced in Java 8? What were the problems with the old API?

**Q8.** Explain the difference between LocalDateTime and ZonedDateTime.

**Q9.** How do you calculate the difference between two dates?

### Coding Problems (5 points each)

**Q10.** Write a program to get the current date and time.

**Q11.** Write a program to calculate your age in years from your birthdate.

**Q12.** Write a program to format a date in "dd/MM/yyyy" pattern.

**Q13.** Write a program to add 10 days to the current date and display it.

**Total Points: 44**

---

## Day 26: Wrapper Classes & Autoboxing

### Multiple Choice Questions (2 points each)

**Q1.** What is a wrapper class?
- A) A class that wraps code
- B) Object representation of primitive
- C) A generic class
- D) A utility class

**Q2.** Which is the wrapper class for int?
- A) Int
- B) Integer
- C) Number
- D) Numeric

**Q3.** What is autoboxing?
- A) Primitive to wrapper conversion
- B) Wrapper to primitive conversion
- C) Creating boxes
- D) Type casting

**Q4.** What is unboxing?
- A) Primitive to wrapper conversion
- B) Wrapper to primitive conversion
- C) Opening boxes
- D) Type casting

**Q5.** Which method converts String to int?
- A) Integer.parseInt()
- B) Integer.toInt()
- C) Integer.valueOf()
- D) Both A and C

**Q6.** What is the difference between parseInt() and valueOf()?
- A) No difference
- B) parseInt() returns int, valueOf() returns Integer
- C) valueOf() returns int, parseInt() returns Integer
- D) Both return int

**Q7.** What is the Integer cache range?
- A) 0 to 100
- B) -128 to 127
- C) -256 to 255
- D) 0 to 256

### Short Answer Questions (3 points each)

**Q8.** Why do we need wrapper classes? Give at least three reasons.

**Q9.** Explain the Integer cache. Why does Integer.valueOf(100) == Integer.valueOf(100) return true?

**Q10.** What is the difference between == and equals() when comparing wrapper objects?

### Coding Problems (5 points each)

**Q11.** Write a program to convert String to different primitive types (int, double, boolean).

**Q12.** Write a program demonstrating autoboxing and unboxing.

**Q13.** Write a program that demonstrates the Integer cache behavior.

**Total Points: 44**

---

## Day 27: Multithreading Basics

### Multiple Choice Questions (2 points each)

**Q1.** What is a thread?
- A) A process
- B) A lightweight subprocess
- C) A method
- D) A class

**Q2.** How many ways can you create a thread?
- A) One
- B) Two
- C) Three
- D) Four

**Q3.** Which method do you override to define thread behavior?
- A) start()
- B) run()
- C) execute()
- D) begin()

**Q4.** Which method actually starts a thread?
- A) run()
- B) start()
- C) execute()
- D) begin()

**Q5.** What happens if you call run() instead of start()?
- A) Thread starts
- B) Runs in same thread (no new thread)
- C) Error
- D) Exception

**Q6.** Which method pauses thread execution?
- A) pause()
- B) wait()
- C) sleep()
- D) stop()

**Q7.** What is synchronization used for?
- A) Speed up threads
- B) Prevent concurrent access to shared resource
- C) Create threads
- D) Stop threads

### Short Answer Questions (3 points each)

**Q8.** Explain the difference between extending Thread class and implementing Runnable interface.

**Q9.** What is the difference between start() and run() methods?

**Q10.** What problem does synchronization solve?

### Coding Problems (5 points each)

**Q11.** Create a thread by extending Thread class that prints numbers 1 to 10.

**Q12.** Create a thread by implementing Runnable interface that prints your name 5 times.

**Q13.** Create two threads and demonstrate concurrent execution.

**Total Points: 44**

---

## Day 28: Inner Classes & Enums

### Multiple Choice Questions (2 points each)

**Q1.** What is an inner class?
- A) A class outside another class
- B) A class inside another class
- C) A subclass
- D) An interface

**Q2.** Can a static nested class access instance members of outer class?
- A) Yes
- B) No
- C) Only public members
- D) Only with object reference

**Q3.** Where is a local inner class defined?
- A) Inside a class
- B) Inside a method
- C) Inside a package
- D) Inside an interface

**Q4.** What is an anonymous inner class?
- A) A class with no name
- B) A class with private name
- C) A class inside method
- D) A static class

**Q5.** What is an enum?
- A) A class
- B) An interface
- C) A special class for constants
- D) A method

**Q6.** Can you add methods to an enum?
- A) No
- B) Yes
- C) Only static methods
- D) Only abstract methods

**Q7.** Which method returns all enum constants?
- A) getAll()
- B) values()
- C) constants()
- D) list()

### Short Answer Questions (3 points each)

**Q8.** Explain the four types of inner classes in Java.

**Q9.** When would you use an anonymous inner class?

**Q10.** What are the advantages of using enums over constants?

### Coding Problems (5 points each)

**Q11.** Create a class with a member inner class and demonstrate accessing outer class members.

**Q12.** Create an anonymous inner class to implement an interface (e.g., Runnable).

**Q13.** Create an enum for days of the week with a method to check if it's a weekend.

**Q14.** Create a Pizza enum with sizes (SMALL, MEDIUM, LARGE) where each size has a price.

**Total Points: 47**

---

## Day 29: Comprehensive Review

### Mixed Concept Questions (2 points each)

**Q1.** Which collection should you use to store unique elements in sorted order?
- A) ArrayList
- B) HashSet
- C) TreeSet
- D) LinkedHashSet

**Q2.** What makes a class immutable?
- A) final fields
- B) private fields
- C) No setters
- D) All of the above

**Q3.** Which is faster: StringBuilder or StringBuffer?
- A) StringBuilder
- B) StringBuffer
- C) Both same
- D) Depends on usage

**Q4.** What is the output: System.out.println("Hello".substring(1, 4));
- A) Hell
- B) ell
- C) ello
- D) Hel

**Q5.** Which statement is true about static methods?
- A) Can access instance variables
- B) Can be overridden
- C) Cannot access instance variables
- D) Must have return type

### Problem-Solving Questions (5 points each)

**Q6.** Write a program to find the second largest number in an array.

**Q7.** Write a program to check if a string contains only digits.

**Q8.** Write a program to remove all whitespaces from a string.

**Q9.** Write a program to merge two ArrayLists and remove duplicates.

**Q10.** Write a program to find the most frequent element in an array.

**Q11.** Write a program that reads a file and counts the frequency of each word.

**Q12.** Create a simple calculator using enums for operations (ADD, SUBTRACT, MULTIPLY, DIVIDE).

**Total Points: 45**

---

## Day 30: Final Project Assessment

### Project Evaluation Criteria

Evaluate your Library Management System project based on these criteria:

#### 1. Code Structure (10 points)
- [ ] Proper package organization (2 points)
- [ ] Logical class separation (3 points)
- [ ] Clear and meaningful names (2 points)
- [ ] Proper imports (1 point)
- [ ] No unnecessary code (2 points)

#### 2. OOP Implementation (15 points)
- [ ] Proper use of classes and objects (3 points)
- [ ] Encapsulation with getters/setters (3 points)
- [ ] Constructors properly defined (2 points)
- [ ] Methods with appropriate access modifiers (2 points)
- [ ] Use of interfaces where appropriate (3 points)
- [ ] Inheritance if applicable (2 points)

#### 3. Collections Usage (10 points)
- [ ] Appropriate collection chosen for books (3 points)
- [ ] Appropriate collection for members (3 points)
- [ ] Proper collection operations (add, remove, search) (4 points)

#### 4. Exception Handling (10 points)
- [ ] Custom exceptions created (3 points)
- [ ] try-catch blocks where needed (3 points)
- [ ] Meaningful error messages (2 points)
- [ ] Proper exception propagation (2 points)

#### 5. File I/O (10 points)
- [ ] Data saved to file correctly (4 points)
- [ ] Data loaded from file correctly (4 points)
- [ ] Proper resource handling (2 points)

#### 6. Functionality (25 points)
- [ ] Add books feature works (4 points)
- [ ] Remove books feature works (3 points)
- [ ] Issue book feature works (5 points)
- [ ] Return book feature works (5 points)
- [ ] Search functionality works (4 points)
- [ ] Display all books works (2 points)
- [ ] Display available books works (2 points)

#### 7. Code Quality (10 points)
- [ ] Code is readable and well-formatted (3 points)
- [ ] Proper indentation (2 points)
- [ ] Logical flow (2 points)
- [ ] No redundant code (3 points)

#### 8. Testing (5 points)
- [ ] All features tested (3 points)
- [ ] Edge cases handled (2 points)

#### 9. Documentation (5 points)
- [ ] Class-level comments (2 points)
- [ ] Complex method comments (2 points)
- [ ] README with instructions (1 point)

**Total Points: 100**

### Performance Levels:
- **90-100**: Excellent! Ready for Selenium
- **75-89**: Good! Review weak areas and you're ready
- **60-74**: Average. Spend a few more days strengthening concepts
- **Below 60**: Needs more practice. Review OOP, Collections, and Exception Handling

---

## Answer Keys Available Separately
(Answer keys for all 30 days will be provided in a separate document)

## Progress Tracking

Mark each day after completing assessment:
- [ ] Day 1 - Score: ___/35
- [ ] Day 2 - Score: ___/44
- [ ] Day 3 - Score: ___/38
- [ ] Day 4 - Score: ___/42
- [ ] Day 5 - Score: ___/47
- [ ] Day 6 - Score: ___/44
- [ ] Day 7 - Score: ___/47
- [ ] Day 8 - Score: ___/44
- [ ] Day 9 - Score: ___/44
- [ ] Day 10 - Score: ___/44
- [ ] Day 11 - Score: ___/44
- [ ] Day 12 - Score: ___/44
- [ ] Day 13 - Score: ___/44
- [ ] Day 14 - Score: ___/53
- [ ] Day 15 - Score: ___/47
- [ ] Day 16 - Score: ___/44
- [ ] Day 17 - Score: ___/44
- [ ] Day 18 - Score: ___/44
- [ ] Day 19 - Score: ___/44
- [ ] Day 20 - Score: ___/47
- [ ] Day 21 - Score: ___/48
- [ ] Day 22 - Score: ___/47
- [ ] Day 23 - Score: ___/42
- [ ] Day 24 - Score: ___/47
- [ ] Day 25 - Score: ___/44
- [ ] Day 26 - Score: ___/44
- [ ] Day 27 - Score: ___/44
- [ ] Day 28 - Score: ___/47
- [ ] Day 29 - Score: ___/45
- [ ] Day 30 - Score: ___/100

**Average Score**: _______
**Total Score**: _______/1,324

---

## Tips for Success

1. **Attempt honestly** - Don't look at answers first
2. **Time yourself** - Practice under time pressure
3. **Review mistakes** - Understand why you got it wrong
4. **Revisit weak topics** - If you score low, review that day's material
5. **Code by hand first** - For coding problems, write logic on paper
6. **Test your code** - Always run and test your programs
7. **Keep notes** - Write down key learnings from mistakes

**Remember**: The goal is not just to score high, but to truly understand the concepts!
