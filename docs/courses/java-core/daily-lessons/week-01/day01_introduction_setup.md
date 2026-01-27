# Day 1: Introduction & Setup

**Week 1: Java Basics & Environment Setup**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Topics Covered](#topics-covered)
- [Detailed Content](#detailed-content)
- [Practical Exercises](#practical-exercises)
- [Key Takeaways](#key-takeaways)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 1, you will be able to:
- Understand what Java is and why it's popular
- Differentiate between JDK, JRE, and JVM
- Install and configure Java Development Kit (JDK)
- Set up an Integrated Development Environment (IDE)
- Write, compile, and run your first Java program
- Understand the basic structure of a Java program

---

## 📚 Topics Covered

### 1. What is Java?

Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle) in 1995.

#### Key Features:
- **Platform Independence**: Write Once, Run Anywhere (WORA)
  - Java code is compiled into bytecode
  - Bytecode runs on any platform with a JVM
  - No need to recompile for different operating systems

- **Object-Oriented**: Everything in Java is an object (except primitives)
  - Encapsulation, Inheritance, Polymorphism, Abstraction

- **Robust and Secure**: 
  - Strong memory management
  - Exception handling
  - No pointers (unlike C/C++)
  - Built-in security features

- **Popular Uses**:
  - Enterprise applications
  - Android mobile apps
  - Web applications
  - Big data technologies
  - Cloud-based applications

---

### 2. JDK vs JRE vs JVM

Understanding these three components is crucial:

#### JVM (Java Virtual Machine)
- **Runtime environment** for executing Java bytecode
- Platform-specific (different for Windows, Mac, Linux)
- Provides platform independence
- Handles memory management and garbage collection

#### JRE (Java Runtime Environment)
- **JVM + Standard Libraries**
- Needed to **run** Java applications
- Includes core classes and supporting files
- Does NOT include development tools

#### JDK (Java Development Kit)
- **JRE + Development Tools**
- Needed to **develop** Java applications
- Includes:
  - Compiler (`javac`)
  - Debugger
  - Documentation tools
  - Other development utilities

**Simple Analogy**:
```
JDK = JRE + Development Tools
JRE = JVM + Libraries
JVM = Execution Engine
```

---

### 3. Installing JDK

#### Step-by-Step Installation:

**For Windows:**
1. Download JDK from [Oracle's website](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
2. Choose JDK 11 or JDK 17 (LTS versions recommended)
3. Run the installer
4. Note the installation path (e.g., `C:\Program Files\Java\jdk-17`)

**For macOS:**
1. Download JDK from Oracle or use Homebrew:
   ```bash
   brew install openjdk@17
   ```
2. Follow installation prompts

**For Linux:**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

#### Setting JAVA_HOME Environment Variable:

**Windows:**
1. Right-click "This PC" → Properties → Advanced System Settings
2. Click "Environment Variables"
3. Under System Variables, click "New"
4. Variable name: `JAVA_HOME`
5. Variable value: `C:\Program Files\Java\jdk-17` (your JDK path)
6. Edit "Path" variable and add: `%JAVA_HOME%\bin`

**macOS/Linux:**
Add to `~/.bashrc` or `~/.zshrc`:
```bash
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH
```

#### Verifying Installation:
Open terminal/command prompt and run:
```bash
java -version
javac -version
```

You should see version information for both commands.

---

### 4. IDE Setup

An IDE (Integrated Development Environment) makes coding easier with features like syntax highlighting, auto-completion, and debugging.

#### Option 1: IntelliJ IDEA (Recommended)
- Download [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/) (Free)
- Install and launch
- Create a new Java project
- Configure JDK in project settings

#### Option 2: Eclipse
- Download [Eclipse IDE for Java Developers](https://www.eclipse.org/downloads/)
- Extract and run
- Create a new Java project

#### Option 3: VS Code
- Download [Visual Studio Code](https://code.visualstudio.com/)
- Install "Extension Pack for Java" from marketplace
- Configure Java path in settings

**For Beginners**: IntelliJ IDEA Community Edition is highly recommended for its user-friendly interface and powerful features.

---

### 5. First Java Program

Let's write the classic "Hello World" program:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

#### Understanding the Code:

**Line 1: `public class HelloWorld`**
- `public`: Access modifier (visible everywhere)
- `class`: Keyword to define a class
- `HelloWorld`: Class name (must match filename)

**Line 2: `public static void main(String[] args)`**
- `public`: Method is accessible from anywhere
- `static`: Method belongs to class, not object
- `void`: Method doesn't return any value
- `main`: Entry point of the program
- `String[] args`: Command-line arguments

**Line 3: `System.out.println("Hello, World!");`**
- `System`: Built-in class
- `out`: Static member of System class (PrintStream object)
- `println()`: Method to print with newline
- `"Hello, World!"`: String to be printed

#### Important Rules:
- Class name must match filename: `HelloWorld.java`
- Java is case-sensitive: `Main` ≠ `main`
- Every statement ends with semicolon (`;`)
- Code blocks use curly braces `{ }`

---

### 6. Compilation & Execution

#### Using Command Line:

**Step 1: Compile**
```bash
javac HelloWorld.java
```
- `javac`: Java compiler
- Creates `HelloWorld.class` file (bytecode)

**Step 2: Execute**
```bash
java HelloWorld
```
- `java`: Java interpreter
- Runs the bytecode
- Note: No `.class` extension when running

#### Using IDE:
- Click the "Run" button (▶️)
- IDE handles compilation and execution automatically

#### Understanding the Process:
```
HelloWorld.java → [javac] → HelloWorld.class → [JVM] → Output
(Source Code)    (Compiler)  (Bytecode)        (Runtime)
```

---

## 💻 Practical Exercises

### Exercise 1: Your First Java Program - Hello World

**📝 Problem Statement:**
Create your first Java program that displays "Hello, World!" to the console. This classic program demonstrates the basic structure of a Java application.

**Requirements:**
- Create a class named `HelloWorld`
- Include the main method as the entry point
- Use `System.out.println()` to print the message
- Save the file as `HelloWorld.java`
- Compile and run the program successfully

**Sample Test Case:**
```
Expected Output:
Hello, World!
```

**Solution:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**📝 Steps to Run:**
1. Save as `HelloWorld.java`
2. Compile: `javac HelloWorld.java`
3. Run: `java HelloWorld`

---

### Exercise 2: Personal Introduction

**📝 Problem Statement:**
Create a program that prints your personal introduction including your name, age, and favorite programming language.

**Requirements:**
- Print your name on the first line
- Print your age on the second line
- Print your favorite programming language on the third line
- Use proper formatting with labels

**Sample Test Case:**
```
Expected Output:
Name: John Doe
Age: 25
Favorite Language: Java
```

**Solution:**
```java
public class Introduction {
    public static void main(String[] args) {
        System.out.println("Name: John Doe");
        System.out.println("Age: 25");
        System.out.println("Favorite Language: Java");
    }
}
```

---

### Exercise 3: Print vs Println

**📝 Problem Statement:**
Understand the difference between `print()` and `println()` methods by creating a program that demonstrates both.

**Requirements:**
- Use `print()` to print text without moving to a new line
- Use `println()` to print text and move to a new line
- Demonstrate how they affect the output flow
- Include at least 4 print statements

**Sample Test Case:**
```
Expected Output:
Hello World!
This is on a new line
Java is awesome!
```

**Solution:**
```java
public class PrintMethods {
    public static void main(String[] args) {
        System.out.print("Hello ");
        System.out.print("World");
        System.out.println("!");
        System.out.println("This is on a new line");
        System.out.print("Java ");
        System.out.println("is awesome!");
    }
}
```

**💡 Key Difference:**
- `print()` - Prints text without newline
- `println()` - Prints text and adds newline at the end

---

### Exercise 4: Multiple Lines Output

**📝 Problem Statement:**
Create a program that prints a multi-line welcome message for a Java course.

**Requirements:**
- Print a welcome header
- Print course information on separate lines
- Use at least 5 `println()` statements
- Create visually formatted output

**Sample Test Case:**
```
Expected Output:
=============================
  Welcome to Java Course!
=============================
Course: Core Java Fundamentals
Duration: 30 Days
Level: Beginner
Start Date: Today
=============================
```

**Solution:**
```java
public class WelcomeMessage {
    public static void main(String[] args) {
        System.out.println("=============================");
        System.out.println("  Welcome to Java Course!");
        System.out.println("=============================");
        System.out.println("Course: Core Java Fundamentals");
        System.out.println("Duration: 30 Days");
        System.out.println("Level: Beginner");
        System.out.println("Start Date: Today");
        System.out.println("=============================");
    }
}
```

---

### Exercise 5: Escape Sequences Practice

**📝 Problem Statement:**
Learn and practice using Java escape sequences including tab, newline, quotes, and backslash.

**Requirements:**
- Demonstrate tab character (\t)
- Demonstrate newline character (\n)
- Demonstrate double quotes (\")
- Demonstrate backslash (\\)
- Demonstrate single quote (\')
- Print each example with a descriptive label

**Sample Test Case:**
```
Expected Output:
1. Tab:	This is tabbed text
2. Newline: First line
Second line
3. Quote: He said "Hello"
4. Path: C:\Users\Documents
5. Apostrophe: It's a nice day!
```

**Solution:**
```java
public class EscapeSequences {
    public static void main(String[] args) {
        System.out.println("1. Tab:\tThis is tabbed text");
        System.out.println("2. Newline: First line\nSecond line");
        System.out.println("3. Quote: He said \"Hello\"");
        System.out.println("4. Path: C:\\Users\\Documents");
        System.out.println("5. Apostrophe: It\'s a nice day!");
    }
}
```

**📝 Common Escape Sequences:**
- `\t` - Tab
- `\n` - Newline
- `\"` - Double quote
- `\\` - Backslash
- `\'` - Single quote

---

### Exercise 6: Comments Documentation

**📝 Problem Statement:**
Practice adding different types of comments to your Java code including single-line, multi-line, and documentation comments.

**Requirements:**
- Add at least 2 single-line comments
- Add one multi-line comment
- Add one documentation comment
- Comments should explain what the code does
- Code should still compile and run correctly

**Sample Test Case:**
```
Expected Output:
Welcome to Java!
Learning comments is important
Code documentation helps others understand your work
```

**Solution:**
```java
/**
 * This class demonstrates different types of comments in Java.
 * Documentation comments are used for generating API documentation.
 */
public class CommentsDemo {
    public static void main(String[] args) {
        // Single-line comment: This prints a welcome message
        System.out.println("Welcome to Java!");

        /*
         * Multi-line comment:
         * This section prints educational messages
         * about the importance of comments
         */
        System.out.println("Learning comments is important");

        System.out.println("Code documentation helps others understand your work"); // Inline comment
    }
}
```

**📝 Comment Types:**
- `// Single-line comment`
- `/* Multi-line comment */`
- `/** Documentation comment */`

---

### Exercise 7: Simple ASCII Art

**📝 Problem Statement:**
Create a program that displays ASCII art using special characters and spacing.

**Requirements:**
- Create a simple shape or pattern using asterisks (*)
- Use proper spacing to align the pattern
- The pattern should be at least 5 lines tall
- Display a tree or pyramid shape

**Sample Test Case:**
```
Expected Output:
    *
   ***
  *****
 *******
*********
    |
    |
```

**Solution:**
```java
public class TreeArt {
    public static void main(String[] args) {
        System.out.println("    *    ");
        System.out.println("   ***   ");
        System.out.println("  *****  ");
        System.out.println(" ******* ");
        System.out.println("*********");
        System.out.println("    |    ");
        System.out.println("    |    ");
    }
}
```

**💡 Challenge:** Try creating your own ASCII art of a house, star, or diamond!

---

### Exercise 8: Personal Information Card

**📝 Problem Statement:**
Create a formatted personal information card that displays your details in an organized manner.

**Requirements:**
- Display a header with your name
- Include at least 5 pieces of personal information
- Use proper formatting with labels and separators
- Create a visually appealing layout

**Sample Test Case:**
```
Expected Output:
================================
    PERSONAL INFORMATION CARD
================================
Name: John Doe
Age: 25 years
City: New York
Occupation: Software Developer
Education: Computer Science
Hobbies: Coding, Reading, Gaming
================================
```

**Solution:**
```java
public class PersonalCard {
    public static void main(String[] args) {
        System.out.println("================================");
        System.out.println("    PERSONAL INFORMATION CARD");
        System.out.println("================================");
        System.out.println("Name: John Doe");
        System.out.println("Age: 25 years");
        System.out.println("City: New York");
        System.out.println("Occupation: Software Developer");
        System.out.println("Education: Computer Science");
        System.out.println("Hobbies: Coding, Reading, Gaming");
        System.out.println("================================");
    }
}
```

---

### Exercise 9: Basic Arithmetic Display

**📝 Problem Statement:**
Create a program that displays the results of basic arithmetic operations with descriptive labels.

**Requirements:**
- Perform and display addition
- Perform and display subtraction
- Perform and display multiplication
- Perform and display division
- Perform and display modulus (remainder)
- Use parentheses to ensure correct calculation

**Sample Test Case:**
```
Expected Output:
=== Basic Arithmetic ===
5 + 3 = 8
10 - 4 = 6
6 * 7 = 42
20 / 4 = 5
15 % 4 = 3
```

**Solution:**
```java
public class BasicArithmetic {
    public static void main(String[] args) {
        System.out.println("=== Basic Arithmetic ===");
        System.out.println("5 + 3 = " + (5 + 3));
        System.out.println("10 - 4 = " + (10 - 4));
        System.out.println("6 * 7 = " + (6 * 7));
        System.out.println("20 / 4 = " + (20 / 4));
        System.out.println("15 % 4 = " + (15 % 4));
    }
}
```

**💡 Note:** Parentheses are important! `"Result: " + (5 + 3)` gives "Result: 8", but `"Result: " + 5 + 3` gives "Result: 53"

---

### Exercise 10: Box Pattern

**📝 Problem Statement:**
Create a program that draws a rectangular box using asterisks (*) for borders and spaces for the interior.

**Requirements:**
- Create a 10x5 box (10 characters wide, 5 rows tall)
- Use asterisks for the border
- Use spaces for the interior
- All sides should be properly aligned

**Sample Test Case:**
```
Expected Output:
**********
*        *
*        *
*        *
**********
```

**Solution:**
```java
public class BoxPattern {
    public static void main(String[] args) {
        System.out.println("**********");
        System.out.println("*        *");
        System.out.println("*        *");
        System.out.println("*        *");
        System.out.println("**********");
    }
}
```

**💡 Challenge:** Try creating a larger box or a filled pattern using different characters!

---

### Exercise 11: Java Program Structure Display

**📝 Problem Statement:**
Create a program that displays the basic structure of a Java program with proper indentation and comments.

**Requirements:**
- Display each component of a Java program structure
- Show class declaration
- Show main method signature
- Show example statements
- Use proper indentation in the output

**Sample Test Case:**
```
Expected Output:
=== Java Program Structure ===
public class ClassName {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello!");
    }
}
```

**Solution:**
```java
public class ProgramStructure {
    public static void main(String[] args) {
        System.out.println("=== Java Program Structure ===");
        System.out.println("public class ClassName {");
        System.out.println("    public static void main(String[] args) {");
        System.out.println("        // Your code here");
        System.out.println("        System.out.println(\"Hello!\");");
        System.out.println("    }");
        System.out.println("}");
    }
}
```

---

### Exercise 12: Course Schedule Display

**📝 Problem Statement:**
Create a program that displays a weekly Java course schedule in a formatted table-like structure.

**Requirements:**
- Display a header for the schedule
- Show at least 5 days with topics
- Use proper formatting and alignment
- Include visual separators between sections

**Sample Test Case:**
```
Expected Output:
+================================+
|    30-DAY JAVA COURSE SCHEDULE |
+================================+
Day 1:  Introduction & Setup
Day 2:  Variables & Data Types
Day 3:  Operators & Expressions
Day 4:  Control Flow - Conditionals
Day 5:  Control Flow - Loops
+================================+
Start your journey today!
+================================+
```

**Solution:**
```java
public class CourseSchedule {
    public static void main(String[] args) {
        System.out.println("+================================+");
        System.out.println("|    30-DAY JAVA COURSE SCHEDULE |");
        System.out.println("+================================+");
        System.out.println("Day 1:  Introduction & Setup");
        System.out.println("Day 2:  Variables & Data Types");
        System.out.println("Day 3:  Operators & Expressions");
        System.out.println("Day 4:  Control Flow - Conditionals");
        System.out.println("Day 5:  Control Flow - Loops");
        System.out.println("+================================+");
        System.out.println("Start your journey today!");
        System.out.println("+================================+");
    }
}
```

---

## 🔑 Key Takeaways

1. **Java is Platform Independent**: Write once, run anywhere (WORA)
2. **JDK vs JRE vs JVM**: 
   - JDK = Development tools
   - JRE = Runtime environment
   - JVM = Execution engine
3. **Every Java program needs**:
   - A class definition
   - A `main` method as entry point
4. **Compilation Process**: `.java` → `javac` → `.class` → `java` → Output
5. **File naming**: Class name must match filename
6. **Case Sensitivity**: Java is case-sensitive
7. **Semicolons**: Every statement ends with `;`

---

## ⚠️ Common Mistakes

### 1. Installation and Setup Errors

#### ❌ Wrong - Not Setting JAVA_HOME Environment Variable:
**Problem:** Installing JDK but forgetting to set JAVA_HOME and PATH variables.

```bash
# After installation, trying to run:
javac HelloWorld.java
# Error: 'javac' is not recognized as an internal or external command
```

**Why it's wrong:** Without proper environment variables, the system cannot find Java tools even though JDK is installed.

#### ✅ Right:
```bash
# Windows: Set environment variables
JAVA_HOME=C:\Program Files\Java\jdk-17
PATH=%JAVA_HOME%\bin;%PATH%

# Linux/Mac: Add to ~/.bashrc or ~/.zshrc
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH

# Verify installation
java -version
javac -version
```

**💡 Tip:** Always verify installation with both `java -version` and `javac -version` commands.

---

#### ❌ Wrong - Using JRE Instead of JDK:
**Problem:** Installing only Java Runtime Environment (JRE) for development.

```bash
# Trying to compile with only JRE installed
javac HelloWorld.java
# Error: 'javac' command not found
```

**Why it's wrong:** JRE only contains runtime components to run Java programs, not development tools like the compiler.

#### ✅ Right:
```
Download and install JDK (Java Development Kit):
- JDK includes JRE + development tools (javac, debugger, etc.)
- For development: Always install JDK
- For running apps only: JRE is sufficient
```

**💡 Tip:** JDK = JRE + Development Tools. Always install JDK for programming.

---

### 2. File Naming Issues

#### ❌ Wrong - Class Name Doesn't Match Filename:
```java
// File saved as: Hello.java
public class HelloWorld {  // Class name doesn't match!
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

**Compilation Error:**
```
Hello.java:1: error: class HelloWorld is public, should be declared in a file named HelloWorld.java
```

**Why it's wrong:** Java requires public class name to exactly match the filename.

#### ✅ Right:
```java
// File saved as: HelloWorld.java
public class HelloWorld {  // Matches filename exactly
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

**💡 Tip:** Filename must be ClassName.java (case-sensitive, exact match).

---

#### ❌ Wrong - Incorrect File Extension:
```
Saving file as: HelloWorld.txt
or: HelloWorld.java.txt (Windows hiding extensions)
```

**Problem:** File won't compile because it's not recognized as Java source.

#### ✅ Right:
```
1. Enable "Show file extensions" in Windows Explorer
2. Save as: HelloWorld.java
3. Ensure no hidden extensions: verify in command line with 'dir' or 'ls -la'
```

**💡 Tip:** Always verify the actual file extension, especially on Windows.

---

### 3. Syntax Errors

#### ❌ Wrong - Missing Semicolon:
```java
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello")  // Missing semicolon!
    }
}
```

**Compilation Error:**
```
Test.java:3: error: ';' expected
```

**Why it's wrong:** Every statement in Java must end with a semicolon.

#### ✅ Right:
```java
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello");  // Semicolon added
    }
}
```

**💡 Tip:** Semicolons are required at the end of every statement (not after method or class declarations).

---

#### ❌ Wrong - Incorrect Case Sensitivity:
```java
public class Test {
    public static void Main(String[] args) {  // Capital 'M'!
        System.out.Println("Hello");  // Capital 'P'!
    }
}
```

**Runtime Error:** Program compiles but doesn't run (no entry point found).

**Why it's wrong:** Java is case-sensitive. The entry point must be exactly `main`, and println is lowercase.

#### ✅ Right:
```java
public class Test {
    public static void main(String[] args) {  // Lowercase 'main'
        System.out.println("Hello");  // Lowercase 'println'
    }
}
```

**💡 Tip:** Java is case-sensitive: `main ≠ Main`, `println ≠ Println`, `String ≠ string`.

---

### 4. Compilation and Execution Mistakes

#### ❌ Wrong - Including .class Extension When Running:
```bash
javac HelloWorld.java  # Correct compilation
java HelloWorld.class  # WRONG!
```

**Error:**
```
Error: Could not find or load main class HelloWorld.class
```

**Why it's wrong:** The `java` command expects the class name, not the filename.

#### ✅ Right:
```bash
javac HelloWorld.java  # Compile (creates HelloWorld.class)
java HelloWorld        # Run (no .class extension)
```

**💡 Tip:** Compile with .java extension, run without any extension (just class name).

---

#### ❌ Wrong - Wrong Compilation/Execution Order:
```bash
java HelloWorld  # Trying to run before compiling
```

**Error:**
```
Error: Could not find or load main class HelloWorld
```

**Why it's wrong:** Must compile (.java → .class) before executing.

#### ✅ Right:
```bash
# Step 1: Compile first
javac HelloWorld.java  # Creates HelloWorld.class

# Step 2: Then execute
java HelloWorld        # Runs the bytecode
```

**💡 Tip:** Always compile (javac) before running (java).

---

### 5. main Method Signature Errors

#### ❌ Wrong - Incorrect main Method Signature:
```java
public class Test {
    // Missing 'static'
    public void main(String[] args) {
        System.out.println("Hello");
    }
}
```

**Runtime Error:** Program compiles but doesn't run.
```
Error: Main method is not static in class Test
```

**Why it's wrong:** The main method must be `public static void main(String[] args)` exactly.

#### ✅ Right:
```java
public class Test {
    public static void main(String[] args) {  // All keywords required
        System.out.println("Hello");
    }
}
```

**Required signature components:**
- `public`: accessible from anywhere
- `static`: can be called without creating object
- `void`: doesn't return value
- `main`: exact method name
- `String[] args`: command-line arguments parameter

**💡 Tip:** Memorize the exact signature: `public static void main(String[] args)`.

---

### 6. String and Output Errors

#### ❌ Wrong - Using Single Quotes for Strings:
```java
public class Test {
    public static void main(String[] args) {
        System.out.println('Hello');  // Single quotes!
    }
}
```

**Compilation Error:**
```
error: unclosed character literal
```

**Why it's wrong:** Single quotes are for single characters only; strings require double quotes.

#### ✅ Right:
```java
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello");  // Double quotes for strings
        System.out.println('H');      // Single quote for single character
    }
}
```

**💡 Tip:** Use double quotes `""` for strings, single quotes `''` for characters.

---

#### ❌ Wrong - Forgetting Escape Sequences:
```java
public class Test {
    public static void main(String[] args) {
        System.out.println("Path: C:\Users\Documents");  // Wrong!
    }
}
```

**Output:**
```
Path: C:UsersDocuments  (backslashes interpreted as escape characters)
```

**Why it's wrong:** Backslash `\` is an escape character; single backslash causes issues.

#### ✅ Right:
```java
public class Test {
    public static void main(String[] args) {
        System.out.println("Path: C:\\Users\\Documents");  // Double backslash
        System.out.println("Quote: He said \"Hello\"");     // Escaped quotes
    }
}
```

**Common escape sequences:**
- `\\` - Backslash
- `\"` - Double quote
- `\n` - Newline
- `\t` - Tab

**💡 Tip:** Use `\\` for file paths and `\"` for quotes inside strings.

---

### 7. IDE and Tool Confusion

#### ❌ Wrong - Mixing IDE and Command Line Compilation:
**Problem:** Creating project in IDE, then trying to compile individual files with command line in wrong directory.

```bash
# In wrong directory
cd C:\Projects
javac HelloWorld.java
# Error: cannot find file
```

**Why it's wrong:** IDE organizes files in specific folder structures (src, bin, out); simple command line compilation expects flat structure.

#### ✅ Right:
```bash
# Option 1: Use IDE's build system (recommended for IDE projects)
Click IDE's "Build" or "Run" button

# Option 2: Navigate to correct source directory for command line
cd C:\Projects\MyProject\src
javac HelloWorld.java
java HelloWorld

# Option 3: Use IDE's terminal with proper working directory
```

**💡 Tip:** When using an IDE, let it handle compilation. For command line, ensure you're in the directory containing your .java file.

---

This completes the Common Mistakes section for Day 1! The section covers 8 major categories of mistakes beginners make when starting with Java, including setup issues, file naming, syntax errors, compilation problems, main method signature errors, string/output issues, and IDE confusion. Each mistake includes a clear problem statement, explanation, and correct approach with examples.

---

## 📖 Additional Resources

### Official Documentation:
- [Oracle Java Documentation](https://docs.oracle.com/en/java/)
- [Java Tutorials](https://docs.oracle.com/javase/tutorial/)

### Video Tutorials:
- Search for "Java Hello World" on YouTube
- Look for "Java Installation Guide" for your OS

### Practice Platforms:
- [HackerRank Java](https://www.hackerrank.com/domains/java)
- [Codecademy Java](https://www.codecademy.com/learn/learn-java)

### Books:
- "Head First Java" by Kathy Sierra
- "Java: A Beginner's Guide" by Herbert Schildt

---

## 🧭 Navigation

### Week 1 Progress:
- **Day 1: Introduction & Setup** ← You are here
- [Day 2: Variables & Data Types](day02_variables_datatypes.md)
- [Day 3: Operators & Expressions](day03_operators_expressions.md)
- [Day 4: Control Flow - Conditional Statements](day04_control_flow_conditionals.md)
- [Day 5: Control Flow - Loops](day05_control_flow_loops.md)
- [Day 6: Arrays - Part 1](day06_arrays_part1.md)
- [Day 7: Arrays - Part 2 & Review](day07_arrays_part2_review.md)

### Related Resources:
- [📝 Day 1 Assessment](../../../java-learning-app/src/data/assessments/java/week1/day1.js)
- [💪 Week 1 Exercises](../../../03_BEGINNER_FRIENDLY_Exercises/Core_Java/Week1_Days01-07_Setup_and_Basics.md)
- [📚 Detailed Topics Reference](../../../02_Detailed_Topics/Detailed_Topics_Core_Java.md#day-1-introduction--setup)
- [🏠 Back to Week 1 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 1 Checklist

Before moving to Day 2, ensure you can:
- [ ] Explain what Java is and its key features
- [ ] Differentiate between JDK, JRE, and JVM
- [ ] Successfully install JDK on your system
- [ ] Set up JAVA_HOME environment variable
- [ ] Install and configure an IDE
- [ ] Write a simple Java program
- [ ] Compile Java code using `javac`
- [ ] Run Java programs using `java` command
- [ ] Understand the structure of a Java program
- [ ] Use `System.out.println()` to print output

---

**🎉 Congratulations on completing Day 1!**

You've taken your first step into Java programming. Tomorrow, we'll dive into variables and data types.

**Next**: [Day 2: Variables & Data Types →](day02_variables_datatypes.md)

---

*Last Updated: 2026-01-08*