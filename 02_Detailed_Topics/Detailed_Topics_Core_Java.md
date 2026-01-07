# Java Core Fundamentals - Detailed Topic Breakdown (30 Days)

## Week 1: Java Basics & Environment Setup

### Day 1: Introduction & Setup
#### Subtopics:
1. What is Java?
   - Platform independence
   - Write Once, Run Anywhere (WORA)
   - Java's popularity and uses
2. JDK vs JRE vs JVM
   - JVM: Java Virtual Machine (runtime)
   - JRE: Java Runtime Environment (JVM + libraries)
   - JDK: Java Development Kit (JRE + development tools)
3. Installing JDK
   - Downloading JDK 11/17
   - Setting JAVA_HOME environment variable
   - Verifying installation
4. IDE Setup
   - IntelliJ IDEA Community Edition installation
   - Eclipse installation (alternative)
   - VS Code with Java extension (alternative)
5. First Java Program
   - Class structure
   - main method syntax
   - public static void main(String[] args) explanation
   - System.out.println()
6. Compilation & Execution
   - javac command (compilation)
   - java command (execution)
   - .java vs .class files
   - IDE run buttons

**Practical Exercises:**
- Install all tools
- Write Hello World
- Print your name
- Print multiple lines

---

### Day 2: Variables & Data Types
#### Subtopics:
1. Variables
   - Variable definition
   - Variable naming rules and conventions
   - camelCase naming
   - Declaration vs initialization
2. Primitive Data Types (8 types)
   - **byte**: -128 to 127, 1 byte
   - **short**: -32,768 to 32,767, 2 bytes
   - **int**: default integer type, 4 bytes
   - **long**: large numbers, 8 bytes (suffix: L)
   - **float**: decimal numbers, 4 bytes (suffix: f)
   - **double**: default decimal type, 8 bytes
   - **char**: single character, 2 bytes (Unicode)
   - **boolean**: true/false
3. Reference Types
   - String (most common)
   - Arrays (reference type)
   - Objects
   - null value
4. Type Casting
   - Implicit casting (widening)
   - Explicit casting (narrowing)
   - Data loss in casting
5. Constants
   - final keyword
   - Naming convention (UPPER_CASE)
   - Why use constants?

**Practical Exercises:**
- Declare all 8 primitive types
- Perform type conversions
- Create constants
- Calculate area of circle

---

### Day 3: Operators & Expressions
#### Subtopics:
1. Arithmetic Operators
   - Addition (+)
   - Subtraction (-)
   - Multiplication (*)
   - Division (/)
   - Modulus (%)
   - Integer division vs float division
2. Relational Operators
   - Equal to (==)
   - Not equal to (!=)
   - Greater than (>)
   - Less than (<)
   - Greater than or equal to (>=)
   - Less than or equal to (<=)
3. Logical Operators
   - AND (&&) - both conditions must be true
   - OR (||) - at least one condition must be true
   - NOT (!) - inverts boolean value
   - Short-circuit evaluation
4. Assignment Operators
   - Simple (=)
   - Compound (+=, -=, *=, /=, %=)
5. Increment/Decrement
   - Pre-increment (++i)
   - Post-increment (i++)
   - Pre-decrement (--i)
   - Post-decrement (i--)
6. Operator Precedence
   - Order of evaluation
   - Parentheses for clarity
7. Expressions
   - Combining operators
   - Type promotion in expressions

**Practical Exercises:**
- Simple calculator
- Even/odd checker
- Temperature converter
- Swap two numbers

---

### Day 4: Control Flow - Conditional Statements
#### Subtopics:
1. if Statement
   - Syntax
   - Boolean condition
   - Code block execution
2. if-else Statement
   - Two-way branching
   - else block
3. if-else-if Ladder
   - Multiple conditions
   - Order matters
   - Final else (default case)
4. Nested if
   - if inside if
   - Indentation importance
   - When to use
5. switch-case Statement
   - Syntax
   - case labels
   - break statement
   - default case
   - Fall-through behavior
   - switch with String (Java 7+)
6. Ternary Operator
   - condition ? value1 : value2
   - Compact if-else
   - When to use

**Practical Exercises:**
- Grade calculator (A, B, C, D, F)
- Largest of 3 numbers
- Day of week finder
- Leap year checker
- Menu-driven calculator

---

### Day 5: Control Flow - Loops
#### Subtopics:
1. while Loop
   - Syntax
   - Entry-controlled loop
   - Condition checking
   - Infinite loops
2. do-while Loop
   - Exit-controlled loop
   - Executes at least once
   - Semicolon after while
3. for Loop
   - Initialization, condition, increment
   - Execution flow
   - Most common loop
4. Enhanced for Loop (for-each)
   - Syntax: for(type var : array)
   - Read-only iteration
   - Works with arrays and collections
5. Nested Loops
   - Loop inside loop
   - Pattern printing
   - 2D array traversal
6. Loop Control Statements
   - **break**: exit loop
   - **continue**: skip current iteration
   - **return**: exit method
7. Common Loop Patterns
   - Counter loops
   - Sentinel-controlled loops
   - Flag-controlled loops

**Practical Exercises:**
- Print 1 to 100
- Sum of numbers
- Factorial calculation
- Fibonacci series
- Print patterns (pyramid, diamond)
- Table of a number
- Prime number checker

---

### Day 6: Arrays - Part 1
#### Subtopics:
1. Array Basics
   - What is an array?
   - Fixed size collection
   - Homogeneous elements
   - Zero-based indexing
2. Array Declaration
   - Syntax: type[] arrayName
   - Alternative: type arrayName[]
3. Array Initialization
   - new keyword
   - Size specification
   - Direct initialization with values
   - Default values (0, false, null)
4. Accessing Elements
   - Index notation: array[index]
   - ArrayIndexOutOfBoundsException
5. Array Length
   - length property (not method)
   - Using in loops
6. Iterating Arrays
   - for loop with index
   - for-each loop
   - while loop
7. Common Operations
   - Finding maximum/minimum
   - Sum and average
   - Searching for element
   - Reversing array

**Practical Exercises:**
- Initialize array of 10 integers
- Find largest and smallest element
- Calculate sum and average
- Search for an element
- Reverse an array
- Copy array elements

---

### Day 7: Arrays - Part 2 & Review
#### Subtopics:
1. Multi-dimensional Arrays
   - 2D arrays (matrix)
   - Declaration: type[][] arrayName
   - Initialization
   - Accessing elements: array[row][col]
   - Nested loops for traversal
2. Jagged Arrays
   - Array of arrays
   - Different row lengths
   - Dynamic size per row
3. Arrays Class (java.util.Arrays)
   - sort() method
   - binarySearch()
   - equals()
   - fill()
   - toString()
   - copyOf()
4. Copying Arrays
   - Manual copying
   - Arrays.copyOf()
   - System.arraycopy()
   - clone() method

**Week 1 Review:**
- Variables and data types
- Operators
- Conditional statements
- Loops
- Arrays

**Week 1 Project:**
Student Grade Management System
- Store student names and grades in arrays
- Calculate average grade
- Find highest and lowest grades
- Search for a student
- Display all students

---

## Week 2: Object-Oriented Programming Fundamentals

### Day 8: Introduction to OOP & Classes
#### Subtopics:
1. OOP Concepts Overview
   - Real-world modeling
   - Objects and classes
   - Four pillars: Encapsulation, Inheritance, Polymorphism, Abstraction
2. What is a Class?
   - Blueprint/template
   - Class definition
   - Class members: fields and methods
3. Class Syntax
   - class keyword
   - Class naming convention (PascalCase)
   - Class body with {}
4. Instance Variables (Fields)
   - Attributes/properties
   - Declaring fields
   - Data types of fields
5. Methods
   - Behavior/actions
   - Method syntax
   - Return types
   - void methods
6. Creating Objects
   - new keyword
   - Constructor call
   - Object reference
   - Memory allocation
7. Accessing Members
   - Dot operator (.)
   - objectName.field
   - objectName.method()
8. Multiple Objects
   - Creating multiple instances
   - Each object has own data
   - Shared methods

**Practical Exercises:**
- Create Car class (brand, model, year, color)
- Create Student class (name, rollNo, marks)
- Create BankAccount class (accountNo, balance)
- Create Book class (title, author, price)

---

### Day 9: Constructors & this Keyword
#### Subtopics:
1. What are Constructors?
   - Special method for initialization
   - Same name as class
   - No return type
   - Called when object is created
2. Default Constructor
   - No-argument constructor
   - Provided by Java if not defined
   - Lost if you define your own
3. Parameterized Constructor
   - Constructor with parameters
   - Initialize fields during creation
   - Multiple parameters
4. Constructor Overloading
   - Multiple constructors
   - Different parameter lists
   - Providing flexibility
5. this Keyword
   - Reference to current object
   - Differentiate field from parameter
   - this.fieldName
   - Resolving naming conflicts
6. Constructor Chaining
   - this() to call another constructor
   - Must be first statement
   - Avoiding code duplication

**Practical Exercises:**
- Create Employee class with multiple constructors
- Create Rectangle class (length, width)
- Create Person class with constructor chaining
- Initialize objects using different constructors

---

### Day 10: Methods & Method Overloading
#### Subtopics:
1. Method Definition
   - Return type
   - Method name
   - Parameters
   - Method body
2. Method Parameters
   - Formal parameters
   - Actual arguments
   - Pass by value
   - Multiple parameters
3. Return Statement
   - Returning values
   - return keyword
   - Early return
   - void methods
4. Method Overloading
   - Same method name
   - Different parameters
   - Compile-time polymorphism
   - Number of parameters
   - Type of parameters
   - Order of parameters
5. Variable Arguments (varargs)
   - type... variableName
   - Variable number of arguments
   - Treated as array
   - Must be last parameter
6. Method vs Function
   - Methods belong to class
   - Functions are standalone
7. Pass by Value
   - Copy of value is passed
   - Primitive types
   - Reference types (reference is copied)

**Practical Exercises:**
- Calculator class with overloaded methods
- StringUtils class with utility methods
- MathOperations class with varargs
- Create methods that return values

---

### Day 11: Encapsulation & Access Modifiers
#### Subtopics:
1. Encapsulation Concept
   - Data hiding
   - Bundling data and methods
   - Controlled access
   - Benefits: security, flexibility, maintainability
2. Access Modifiers
   - **private**: within class only
   - **default** (package-private): within package
   - **protected**: within package + subclasses
   - **public**: everywhere
3. Getters (Accessors)
   - Public methods to read private fields
   - Naming: getFieldName()
   - Return field value
   - Validation before returning
4. Setters (Mutators)
   - Public methods to modify private fields
   - Naming: setFieldName(value)
   - Validation before setting
   - Business logic in setters
5. Benefits of Encapsulation
   - Data validation
   - Read-only fields (no setter)
   - Write-only fields (no getter)
   - Flexibility to change implementation
6. JavaBeans Convention
   - Private fields
   - Public getters/setters
   - Naming conventions

**Practical Exercises:**
- Create properly encapsulated Person class
- BankAccount with validation in setters
- Employee class with read-only fields
- Product class with encapsulation

---

### Day 12: Inheritance
#### Subtopics:
1. Inheritance Concept
   - Code reusability
   - IS-A relationship
   - Parent-child relationship
   - Inheriting properties and methods
2. extends Keyword
   - Syntax: class Child extends Parent
   - Single inheritance in Java
3. super Keyword
   - Reference to parent class
   - super.method() - call parent method
   - super.field - access parent field
   - super() - call parent constructor
4. Method Overriding
   - Same method signature in child
   - Different implementation
   - @Override annotation
   - Runtime polymorphism
5. Constructor in Inheritance
   - Parent constructor called first
   - Implicit super() call
   - Explicit super() with arguments
   - Constructor chaining
6. Types of Inheritance
   - **Single**: A -> B
   - **Multilevel**: A -> B -> C
   - **Hierarchical**: A -> B, A -> C
   - Multiple NOT supported (diamond problem)
7. Object Class
   - Root of all classes
   - toString(), equals(), hashCode()
   - Every class extends Object

**Practical Exercises:**
- Animal -> Dog, Cat hierarchy
- Employee -> Manager, Developer
- Shape -> Circle, Rectangle
- Vehicle -> Car, Bike

---

### Day 13: Polymorphism
#### Subtopics:
1. Polymorphism Concept
   - Many forms
   - Same interface, different implementations
   - Flexibility and extensibility
2. Compile-time Polymorphism
   - Method overloading
   - Constructor overloading
   - Resolved at compile time
   - Static binding
3. Runtime Polymorphism
   - Method overriding
   - Resolved at runtime
   - Dynamic binding
   - Dynamic method dispatch
4. Upcasting
   - Parent reference = new Child()
   - Automatic/implicit
   - Accessing parent + overridden methods
   - Cannot access child-specific methods
5. Downcasting
   - Child reference = (Child) parentReference
   - Explicit casting required
   - ClassCastException risk
   - Use instanceof first
6. instanceof Operator
   - Check object type
   - Syntax: object instanceof Class
   - Returns boolean
   - Safe downcasting
7. Benefits of Polymorphism
   - Code flexibility
   - Loose coupling
   - Easier maintenance

**Practical Exercises:**
- Payment system (CreditCard, DebitCard, UPI)
- Shape area calculator
- Animal sound system
- Employee salary calculator

---

### Day 14: Abstraction - Abstract Classes & Interfaces
#### Subtopics:
1. Abstraction Concept
   - Hiding implementation details
   - Showing only essential features
   - Focus on WHAT, not HOW
2. Abstract Classes
   - abstract keyword
   - Cannot be instantiated
   - Can have abstract methods
   - Can have concrete methods
   - Can have constructors
   - Can have fields
3. Abstract Methods
   - No body/implementation
   - Must be overridden in child
   - abstract return-type methodName();
4. Interfaces
   - interface keyword
   - 100% abstraction (before Java 8)
   - All methods public abstract by default
   - All fields public static final
   - implements keyword
5. Multiple Interface Implementation
   - class implements Interface1, Interface2
   - Achieving multiple inheritance
6. Java 8+ Interface Features
   - **Default methods**: with implementation
   - **Static methods**: utility methods
   - Why added: backward compatibility
7. Abstract Class vs Interface
   - Abstract: partial abstraction, IS-A
   - Interface: complete abstraction, CAN-DO
   - When to use each
8. Interface Inheritance
   - interface extends interface
   - Multiple interface inheritance

**Practical Exercises:**
- Shape abstract class with concrete methods
- Drawable interface for graphics
- Vehicle abstract class
- Multiple interfaces (Flyable, Swimmable)

**Week 2 Review:**
- Classes and Objects
- Constructors
- Methods and Overloading
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

**Week 2 Project:**
Animal Kingdom System
- Abstract Animal class
- Different animal types (Lion, Eagle, Fish)
- Interfaces: Walkable, Flyable, Swimmable
- Polymorphic behavior
- Proper encapsulation

---

## Week 3: Advanced Java Concepts

### Day 15: Strings
#### Subtopics:
1. String Class
   - java.lang.String
   - Immutable class
   - Most used class in Java
2. String Immutability
   - Cannot be changed after creation
   - Why immutable?
   - String pool optimization
   - Thread safety
3. String Creation
   - String literal: "Hello"
   - new keyword: new String("Hello")
   - Difference between both
4. String Pool
   - Special memory region in heap
   - Reusing string literals
   - Memory efficiency
   - intern() method
5. String Methods (Part 1)
   - length()
   - charAt(index)
   - substring(start, end)
   - indexOf(str)
   - lastIndexOf(str)
   - contains(str)
6. String Methods (Part 2)
   - equals(str) - content comparison
   - equalsIgnoreCase(str)
   - == vs equals()
   - compareTo(str)
   - compareToIgnoreCase(str)
7. String Methods (Part 3)
   - toLowerCase()
   - toUpperCase()
   - trim()
   - replace(old, new)
   - split(delimiter)
   - startsWith(prefix)
   - endsWith(suffix)
8. StringBuilder
   - Mutable string
   - append(), insert(), delete()
   - Efficient for modifications
   - Not thread-safe
9. StringBuffer
   - Mutable and thread-safe
   - Synchronized methods
   - Slower than StringBuilder

**Practical Exercises:**
- Palindrome checker
- Reverse a string
- Count vowels and consonants
- Anagram checker
- Remove whitespaces
- String comparison programs

---

### Day 16: Packages & Static Keyword
#### Subtopics:
1. Packages
   - Grouping related classes
   - Namespace management
   - Access protection
   - Folder structure
2. Creating Packages
   - package statement
   - Must be first statement
   - Naming convention (lowercase)
   - com.company.project structure
3. import Statement
   - Importing classes
   - import package.ClassName
   - import package.* (not recommended)
   - Wildcard import
4. Access Control with Packages
   - default (package-private) access
   - public access across packages
   - protected with inheritance
5. Built-in Packages
   - java.lang (imported by default)
   - java.util
   - java.io
   - java.net
6. static Keyword
   - Class-level members
   - Shared by all instances
7. Static Variables
   - One copy per class
   - Accessed without object
   - ClassName.staticVariable
   - Use cases: counters, constants
8. Static Methods
   - Called without object
   - ClassName.staticMethod()
   - Cannot use instance members
   - Can only access static members
   - main method is static
9. Static Blocks
   - static { }
   - Executed when class is loaded
   - Initialization of static variables
10. static import
    - Import static members
    - import static package.Class.member
    - Use member directly

**Practical Exercises:**
- Create package structure
- Utility class with static methods
- Counter using static variable
- Math operations class
- Configuration class with static fields

---

### Day 17: Exception Handling - Part 1
#### Subtopics:
1. What are Exceptions?
   - Runtime errors
   - Abnormal conditions
   - Disruption in normal flow
2. Exception Hierarchy
   - Throwable class
   - Error vs Exception
   - Checked vs Unchecked
3. try-catch Block
   - try { risky code }
   - catch (ExceptionType e) { handler }
   - Exception object
4. Multiple catch Blocks
   - Catching different exceptions
   - Order matters (specific first)
   - Multi-catch (Java 7+): catch(E1 | E2 e)
5. finally Block
   - Always executes
   - Cleanup code
   - Resource closing
   - Executes even with return
6. try-with-resources (Java 7+)
   - Automatic resource management
   - AutoCloseable interface
   - No explicit finally needed
   - Multiple resources
7. throw Keyword
   - Throwing exception manually
   - throw new ExceptionType("message")
   - Re-throwing exceptions

**Practical Exercises:**
- Handle ArithmeticException (divide by zero)
- Handle ArrayIndexOutOfBoundsException
- Multiple catch blocks
- finally block execution
- File handling with try-with-resources

---

### Day 18: Exception Handling - Part 2
#### Subtopics:
1. throws Keyword
   - Method signature
   - Declaring exceptions
   - Caller must handle
   - Multiple exceptions: throws E1, E2
2. Checked Exceptions
   - Compile-time exceptions
   - Must be handled or declared
   - IOException, SQLException, etc.
   - Forced handling
3. Unchecked Exceptions
   - Runtime exceptions
   - Not forced to handle
   - NullPointerException
   - ArrayIndexOutOfBoundsException
   - ArithmeticException
4. Error
   - Serious problems
   - Cannot be handled
   - OutOfMemoryError
   - StackOverflowError
5. Creating Custom Exceptions
   - Extend Exception class
   - Custom exception message
   - Additional fields
   - When to create custom exceptions
6. Exception Best Practices
   - Specific exceptions
   - Don't catch Exception or Throwable
   - Meaningful error messages
   - Log exceptions
   - Clean up resources
   - Don't suppress exceptions
7. try-catch-finally Flow
   - Execution order
   - With and without exception
   - Return in try/catch/finally

**Practical Exercises:**
- Create custom validation exceptions
- Age validation program
- File reading with exception handling
- Banking system with exceptions
- Exception propagation example

---

### Day 19: Collections Framework - List & Set
#### Subtopics:
1. Collections Framework Overview
   - java.util package
   - Interfaces and implementations
   - Benefits over arrays
2. Collection Interface
   - Root interface
   - Common methods: add, remove, contains, size
3. List Interface
   - Ordered collection
   - Allows duplicates
   - Index-based access
4. ArrayList
   - Dynamic array
   - Fast random access
   - Slow insertion/deletion in middle
   - Most commonly used
   - Generic type: ArrayList<Type>
5. ArrayList Methods
   - add(element), add(index, element)
   - get(index)
   - set(index, element)
   - remove(index), remove(object)
   - size(), isEmpty()
   - contains(object)
   - clear()
6. LinkedList
   - Doubly-linked list
   - Fast insertion/deletion
   - Slow random access
   - Implements List and Deque
7. Vector
   - Synchronized ArrayList
   - Thread-safe but slow
   - Legacy class
8. Stack
   - LIFO structure
   - Extends Vector
   - push(), pop(), peek()
9. Set Interface
   - No duplicates
   - No guaranteed order (except TreeSet)
10. HashSet
    - No duplicates
    - No order
    - Fast operations (O(1))
    - Uses hashing
11. LinkedHashSet
    - Maintains insertion order
    - Slightly slower than HashSet
12. TreeSet
    - Sorted set
    - Implements SortedSet
    - Natural ordering or Comparator

**Practical Exercises:**
- Store and manipulate list of names
- Remove duplicates using Set
- Iterate through collections
- ArrayList vs LinkedList comparison
- Unique elements from array

---

### Day 20: Collections Framework - Map & Utilities
#### Subtopics:
1. Map Interface
   - Key-value pairs
   - No duplicate keys
   - Not part of Collection interface
2. HashMap
   - No order
   - Allows one null key
   - Multiple null values
   - Fast operations
3. HashMap Methods
   - put(key, value)
   - get(key)
   - remove(key)
   - containsKey(key)
   - containsValue(value)
   - keySet(), values(), entrySet()
   - size(), isEmpty()
4. LinkedHashMap
   - Maintains insertion order
   - Predictable iteration order
5. TreeMap
   - Sorted by keys
   - Natural ordering or Comparator
   - No null keys
6. Hashtable
   - Legacy class
   - Synchronized
   - No null keys or values
7. Iterating Maps
   - for-each on entrySet()
   - for-each on keySet()
   - forEach method (Java 8)
8. Collections Utility Class
   - sort(List)
   - reverse(List)
   - shuffle(List)
   - binarySearch(List, key)
   - min(Collection), max(Collection)
   - frequency(Collection, object)
9. Arrays Utility Class
   - sort(array)
   - binarySearch(array, key)
   - equals(array1, array2)
   - fill(array, value)
   - toString(array)
10. Comparable Interface
    - compareTo(object)
    - Natural ordering
    - Implemented by class itself
11. Comparator Interface
    - compare(obj1, obj2)
    - Custom ordering
    - External to class
    - Multiple comparators possible

**Practical Exercises:**
- Student database using HashMap
- Sort list of custom objects
- Frequency counter using Map
- Implement Comparable in custom class
- Create custom Comparators

---

### Day 21: Generics
#### Subtopics:
1. Why Generics?
   - Type safety at compile time
   - Eliminating type casting
   - Enabling generic algorithms
2. Generic Classes
   - class ClassName<T>
   - Type parameter
   - Using T in class
3. Generic Methods
   - <T> returnType methodName(T param)
   - Independent of class generics
4. Multiple Type Parameters
   - <T, U>
   - <K, V> for maps
5. Bounded Type Parameters
   - <T extends UpperBound>
   - Restricting type
   - Multiple bounds: <T extends Class & Interface>
6. Wildcards
   - Unknown type
   - ? wildcard
7. Upper Bounded Wildcards
   - <? extends Type>
   - Read-only effectively
8. Lower Bounded Wildcards
   - <? super Type>
   - Write operations
9. Type Erasure
   - Generics removed at runtime
   - Backward compatibility
   - Bridge methods
10. Generic Restrictions
    - Cannot instantiate type parameter
    - Cannot create array of generic type
    - No static members with type parameter

**Practical Exercises:**
- Generic Box class
- Generic method to print array
- Bounded type parameter example
- Generic Stack implementation
- Wildcard usage examples

**Week 3 Review:**
- Strings and StringBuilder
- Packages and static keyword
- Exception handling
- Collections (List, Set, Map)
- Generics

**Week 3 Project:**
Contact Management System
- Store contacts in collections
- Search and update contacts
- Exception handling for validation
- Use generics where appropriate
- Sorting and filtering

---

## Week 4: Essential Java Features

### Day 22: File Handling - Part 1
#### Subtopics:
1. File Class
   - java.io.File
   - Represents file or directory
   - File path
2. File Operations
   - exists()
   - createNewFile()
   - delete()
   - renameTo(newFile)
   - isFile(), isDirectory()
   - length() - file size
   - lastModified()
3. Reading Files - Character Streams
   - FileReader
   - BufferedReader
   - readLine() method
4. Writing Files - Character Streams
   - FileWriter
   - BufferedWriter
   - write() method
   - append mode
5. Closing Resources
   - close() method
   - try-with-resources
   - Resource leak prevention
6. Reading Text Files
   - Line by line
   - Entire file
   - Scanner class alternative

**Practical Exercises:**
- Create and delete files
- Write text to file
- Read file line by line
- Append to existing file
- Copy file contents

---

### Day 23: File Handling - Part 2
#### Subtopics:
1. Byte Streams
   - FileInputStream
   - FileOutputStream
   - Reading/writing bytes
   - Binary files
2. Object Serialization
   - What is serialization?
   - Converting object to bytes
   - Saving object state
3. Serializable Interface
   - Marker interface
   - implements Serializable
   - serialVersionUID
4. ObjectOutputStream
   - writeObject() method
   - Serializing objects
5. ObjectInputStream
   - readObject() method
   - Deserializing objects
   - Type casting required
6. transient Keyword
   - Skip field during serialization
   - Sensitive data
7. NIO.2 (java.nio.file)
   - Path interface
   - Paths class
   - Files class
8. Files Class Methods
   - readAllLines(path)
   - write(path, lines)
   - copy(source, target)
   - move(source, target)
   - delete(path)
   - exists(path)

**Practical Exercises:**
- Serialize and deserialize objects
- Copy files using streams
- Read binary files
- Use NIO.2 for file operations
- Handle IOException properly

---

### Day 24: Java 8 Features - Lambda & Streams
#### Subtopics:
1. Functional Programming Basics
   - Functions as first-class citizens
   - Immutability
   - Declarative style
2. Functional Interfaces
   - Single abstract method (SAM)
   - @FunctionalInterface annotation
   - Predicate, Function, Consumer, Supplier
3. Lambda Expressions
   - Anonymous functions
   - Syntax: (parameters) -> expression
   - () -> expression
   - (x) -> expression
   - (x, y) -> { statements; }
4. Method References
   - ClassName::staticMethod
   - object::instanceMethod
   - ClassName::instanceMethod
   - ClassName::new (constructor reference)
5. Stream API
   - java.util.stream
   - Sequence of elements
   - Source -> operations -> result
6. Creating Streams
   - collection.stream()
   - Stream.of(elements)
   - Arrays.stream(array)
7. Intermediate Operations
   - filter(predicate) - filtering
   - map(function) - transformation
   - sorted() - sorting
   - distinct() - remove duplicates
   - limit(n) - first n elements
   - skip(n) - skip n elements
8. Terminal Operations
   - forEach(consumer) - iteration
   - collect(collector) - to collection
   - count() - count elements
   - reduce() - combine elements
   - findFirst(), findAny()
   - anyMatch(), allMatch(), noneMatch()
9. Collectors
   - toList()
   - toSet()
   - toMap()
   - joining()
   - groupingBy()

**Practical Exercises:**
- Filter list using lambda
- Map and transform collections
- Find sum using reduce
- Sort using lambda
- Count elements with condition
- Group employees by department

---

### Day 25: Date & Time API
#### Subtopics:
1. Old Date API Problems
   - java.util.Date
   - java.util.Calendar
   - Mutable and thread-unsafe
   - Poor design
2. Java 8 Date-Time API
   - java.time package
   - Immutable and thread-safe
   - Better design
3. LocalDate
   - Date without time
   - now() - current date
   - of(year, month, day)
   - Methods: getYear(), getMonth(), getDayOfMonth()
4. LocalTime
   - Time without date
   - now() - current time
   - of(hour, minute, second)
   - Methods: getHour(), getMinute(), getSecond()
5. LocalDateTime
   - Date and time
   - Combines LocalDate and LocalTime
   - now(), of()
6. ZonedDateTime
   - Date-time with timezone
   - ZoneId
   - Different timezones
7. Period
   - Date-based amount
   - between(date1, date2)
   - Years, months, days
8. Duration
   - Time-based amount
   - between(time1, time2)
   - Hours, minutes, seconds
9. Formatting and Parsing
   - DateTimeFormatter
   - ofPattern(pattern)
   - format() method
   - parse() method
   - Common patterns: yyyy-MM-dd, dd/MM/yyyy
10. Arithmetic Operations
    - plusDays(), minusMonths()
    - plusHours(), minusMinutes()

**Practical Exercises:**
- Get current date and time
- Calculate age from birthdate
- Add/subtract days from date
- Format dates in different patterns
- Calculate difference between dates
- Work with different timezones

---

### Day 26: Wrapper Classes & Autoboxing
#### Subtopics:
1. Wrapper Classes
   - Object representation of primitives
   - Byte, Short, Integer, Long
   - Float, Double
   - Character, Boolean
2. Why Wrapper Classes?
   - Collections need objects
   - Null values
   - Utility methods
3. Creating Wrapper Objects
   - Constructor (deprecated)
   - valueOf() method (preferred)
4. Autoboxing
   - Automatic primitive to wrapper
   - Integer i = 5; (auto-converts)
5. Unboxing
   - Automatic wrapper to primitive
   - int x = integerObject; (auto-converts)
6. Utility Methods
   - Integer.parseInt(string)
   - Integer.valueOf(string)
   - Double.parseDouble(string)
   - Character.isDigit(char)
   - Character.isLetter(char)
7. Number Class
   - Parent of numeric wrappers
   - intValue(), doubleValue(), etc.
8. Caching
   - Integer cache: -128 to 127
   - == vs equals() with wrappers

**Practical Exercises:**
- Convert String to int
- Convert primitives to objects
- Use wrapper utility methods
- Understand autoboxing behavior
- Compare wrapper objects

---

### Day 27: Multithreading Basics
#### Subtopics:
1. Thread Concept
   - Lightweight process
   - Concurrent execution
   - Multiple threads in one program
2. Process vs Thread
   - Process: heavy, separate memory
   - Thread: light, shared memory
3. Main Thread
   - Starts when program runs
   - main() method executes in main thread
4. Creating Threads
   - Two ways to create
5. Extending Thread Class
   - class MyThread extends Thread
   - Override run() method
   - Create object and call start()
6. Implementing Runnable Interface
   - class MyClass implements Runnable
   - Implement run() method
   - Pass to Thread constructor
   - Preferred approach
7. Thread Lifecycle
   - New, Runnable, Running, Blocked, Terminated
8. start() vs run()
   - start(): creates new thread
   - run(): normal method call
9. Thread Methods
   - sleep(milliseconds) - pause execution
   - join() - wait for thread to die
   - setName(name), getName()
   - setPriority(priority), getPriority()
10. Thread Synchronization Basics
    - Shared resource problem
    - synchronized keyword
    - synchronized method
    - synchronized block

**Practical Exercises:**
- Create thread by extending Thread
- Create thread using Runnable
- Multiple threads example
- Thread sleep example
- Simple synchronization

---

### Day 28: Inner Classes & Enums
#### Subtopics:
1. Inner Classes
   - Class inside class
   - Access to outer class members
2. Member Inner Class
   - Regular inner class
   - Non-static nested class
   - Needs outer class instance
3. Static Nested Class
   - static class inside class
   - Can access only static members of outer
   - Like regular class
4. Local Inner Class
   - Inside a method
   - Local to that method
   - Can access final/effectively final variables
5. Anonymous Inner Class
   - Class without name
   - Instantiate and define at same time
   - Often used for interfaces
   - One-time use
6. Enumerations (enum)
   - Special class for constants
   - enum keyword
   - Finite set of constants
7. Defining Enums
   - enum EnumName { VALUE1, VALUE2 }
   - Each value is object of enum
8. Enum Methods
   - values() - get all constants
   - valueOf(string) - get enum by name
   - ordinal() - get position
   - name() - get name
9. Enum with Fields and Methods
   - Constructor
   - Fields
   - Methods
   - Each constant can have different data
10. Enum in switch Statement
    - Clean way to handle constants
    - Type-safe

**Practical Exercises:**
- Create different types of inner classes
- Use anonymous class for interface
- Create Days enum
- Create Season enum with fields
- Use enum in switch-case
- Pizza size enum with prices

---

## Week 5: Practice & Projects

### Day 29: Comprehensive Review
#### Topics to Review:
1. Core Java Basics
   - Variables, data types
   - Operators, control flow
   - Arrays
2. OOP Concepts
   - Classes, objects
   - Inheritance
   - Polymorphism
   - Abstraction
   - Encapsulation
3. Advanced Topics
   - Strings
   - Collections
   - Exception handling
   - File I/O
   - Generics
4. Modern Java
   - Lambda expressions
   - Streams API
   - New Date-Time API

**Practice Activities:**
- Solve coding problems
- Debug code samples
- Refactor old code
- Write clean code
- Practice on HackerRank/LeetCode

---

### Day 30: Final Project
#### Project: Library Management System

**Requirements:**
1. Classes Required
   - Book (isbn, title, author, available)
   - Member (memberId, name, email)
   - Library (main class)
   - Custom exceptions

2. Features to Implement
   - Add books
   - Remove books
   - Issue book to member
   - Return book
   - Search books by title/author
   - List all books
   - List available books
   - Save/load data from file

3. Technical Requirements
   - Use OOP principles
   - Collections for storing data
   - Exception handling
   - File I/O for persistence
   - Proper package structure
   - Encapsulation
   - Use interfaces where appropriate

4. Additional Features (Optional)
   - Fine calculation for late returns
   - Multiple copies of same book
   - Reservation system
   - Member borrowing history

**Project Structure:**
```
library/
├── model/
│   ├── Book.java
│   ├── Member.java
├── service/
│   ├── LibraryService.java
├── exception/
│   ├── BookNotFoundException.java
│   ├── BookNotAvailableException.java
├── util/
│   ├── FileHandler.java
├── Main.java
```

**Deliverables:**
- Complete working code
- Proper documentation
- Test all features
- Handle edge cases
- Clean, readable code

---

## Appendix: Key Concepts Summary

### OOP Principles
- **Encapsulation**: Data hiding using private fields and public methods
- **Inheritance**: Code reusability through extends keyword
- **Polymorphism**: Same interface, different implementations
- **Abstraction**: Hiding complexity using abstract classes/interfaces

### Important Syntax Patterns
- Class: `class ClassName { }`
- Constructor: `public ClassName(params) { }`
- Method: `accessModifier returnType methodName(params) { }`
- Inheritance: `class Child extends Parent { }`
- Interface: `interface InterfaceName { }`, `class ClassName implements InterfaceName { }`
- Exception: `try { } catch(Exception e) { } finally { }`
- Generic class: `class ClassName<T> { }`
- Lambda: `(params) -> expression`
- Stream: `collection.stream().filter().map().collect()`

### Common Naming Conventions
- Classes: PascalCase (MyClass)
- Methods: camelCase (calculateTotal)
- Variables: camelCase (totalAmount)
- Constants: UPPER_SNAKE_CASE (MAX_VALUE)
- Packages: lowercase (com.company.project)

---

## Assessment Criteria for Day 30

You are ready to move to Selenium if you can:
- [ ] Write classes with proper OOP
- [ ] Use inheritance and polymorphism correctly
- [ ] Handle exceptions appropriately
- [ ] Work with collections (ArrayList, HashMap)
- [ ] Read and write files
- [ ] Understand and use interfaces
- [ ] Debug Java code
- [ ] Explain your code
- [ ] Solve medium-level coding problems

**Congratulations on completing Java Core Fundamentals!**
