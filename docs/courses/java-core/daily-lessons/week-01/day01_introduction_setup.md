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

---

### Exercise 6: ASCII Art
Create a program that prints ASCII art.

```java
public class ASCIIArt {
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

**Expected Output:**
```
    *    
   ***   
  *****  
 ******* 
*********
    |    
    |    
```

---

### Exercise 7: Personal Information
Create a program that displays your personal information.

```java
public class PersonalInfo {
    public static void main(String[] args) {
        System.out.println("=== Personal Information ===");
        System.out.println("Name: John Doe");
        System.out.println("Age: 25");
        System.out.println("City: New York");
        System.out.println("Occupation: Software Developer");
        System.out.println("Hobbies: Coding, Reading, Gaming");
    }
}
```

---

### Exercise 8: Simple Math
Print the results of simple mathematical operations.

```java
public class SimpleMath {
    public static void main(String[] args) {
        System.out.println("5 + 3 = " + (5 + 3));
        System.out.println("10 - 4 = " + (10 - 4));
        System.out.println("6 * 7 = " + (6 * 7));
        System.out.println("20 / 4 = " + (20 / 4));
        System.out.println("15 % 4 = " + (15 % 4));
    }
}
```

---

### Exercise 9: Escape Sequences
Practice using escape sequences in Java.

```java
public class EscapeSequences {
    public static void main(String[] args) {
        System.out.println("Tab:\tThis is tabbed");
        System.out.println("Newline:\nThis is on a new line");
        System.out.println("Quote: \"Hello World\"");
        System.out.println("Backslash: C:\\Users\\Documents");
        System.out.println("Single quote: It\'s a beautiful day");
    }
}
```

---

### Exercise 10: Box Pattern
Create a simple box pattern using asterisks.

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


## 💻 Practical Exercises

### Exercise 1: Hello World
Write and run the Hello World program.

**Expected Output:**
```
Hello, World!
```

---

### Exercise 2: Print Your Name
Modify the program to print your name.

```java
public class PrintName {
    public static void main(String[] args) {
        System.out.println("My name is [Your Name]");
    }
}
```

---

### Exercise 3: Multiple Lines
Print multiple lines of text.

```java
public class MultipleLines {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Programming!");
        System.out.println("This is Day 1 of our journey.");
        System.out.println("Let's learn Java together!");
    }
}
```

**Expected Output:**
```
Welcome to Java Programming!
This is Day 1 of our journey.
Let's learn Java together!
```

---

### Exercise 4: Print vs Println
Understand the difference between `print()` and `println()`.

```java
public class PrintVsPrintln {
    public static void main(String[] args) {
        System.out.print("Hello ");
        System.out.print("World");
        System.out.println("!");
        System.out.println("Next line");
    }
}
```

**Expected Output:**
```
Hello World!
Next line
```

**Note**: `print()` doesn't add newline, `println()` does.

---

### Exercise 5: Comments Practice
Add comments to your code.

```java
public class CommentsExample {
    public static void main(String[] args) {
        // This is a single-line comment
        System.out.println("Hello!"); // Comment after code
        
        /*
         * This is a
         * multi-line comment
         */
        System.out.println("Java is fun!");
        
        /** 
         * This is a documentation comment
         * Used for generating API documentation
         */
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