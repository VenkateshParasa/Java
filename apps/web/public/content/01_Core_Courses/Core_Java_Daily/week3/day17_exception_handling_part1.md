# Day 17: Exception Handling - Part 1

## 📚 Learning Objectives
By the end of this lesson, you will be able to:
- Understand what exceptions are and why they occur
- Use try-catch blocks to handle exceptions
- Work with multiple catch blocks
- Understand the finally block
- Use try-with-resources for automatic resource management
- Know when to use the throw keyword

---

## 🎯 Topics Covered

### 1. What are Exceptions?

#### Understanding Exceptions
An exception is an event that disrupts the normal flow of program execution.

```java
public class ExceptionDemo {
    public static void main(String[] args) {
        // This will cause ArithmeticException
        int result = 10 / 0;
        System.out.println("This line won't execute");
    }
}
```

#### Types of Errors
```java
// 1. Compile-time errors (syntax errors)
// int x = 10
// Missing semicolon - won't compile

// 2. Runtime errors (exceptions)
public class RuntimeErrorDemo {
    public static void main(String[] args) {
        int[] arr = new int[5];
        System.out.println(arr[10]);  // ArrayIndexOutOfBoundsException
    }
}

// 3. Logical errors
public class LogicalErrorDemo {
    public static void main(String[] args) {
        // Intended to calculate average but has logical error
        int sum = 10 + 20 + 30;
        int average = sum * 3;  // Should be sum / 3
        System.out.println(average);
    }
}
```

---

### 2. Try-Catch Block

#### Basic Try-Catch
```java
public class TryCatchDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;  // This will throw exception
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero");
            System.out.println("Exception message: " + e.getMessage());
        }
        
        System.out.println("Program continues...");
    }
}
```

#### Exception Object Methods
```java
public class ExceptionMethods {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("getMessage(): " + e.getMessage());
            System.out.println("toString(): " + e.toString());
            System.out.println("\nprintStackTrace():");
            e.printStackTrace();
        }
    }
}
```

---

### 3. Multiple Catch Blocks

#### Handling Different Exceptions
```java
public class MultipleCatchDemo {
    public static void main(String[] args) {
        try {
            String str = null;
            System.out.println(str.length());  // NullPointerException
            
            int result = 10 / 0;  // ArithmeticException
            
            int[] arr = new int[5];
            arr[10] = 50;  // ArrayIndexOutOfBoundsException
            
        } catch (NullPointerException e) {
            System.out.println("Null pointer error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic error: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error: " + e.getMessage());
        }
    }
}
```

#### Catch Block Order (Important!)
```java
public class CatchBlockOrder {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            arr[10] = 50;
        } 
        // Specific exception first
        catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index out of bounds");
        }
        // General exception last
        catch (Exception e) {
            System.out.println("General exception");
        }
        
        // WRONG ORDER - Won't compile:
        // catch (Exception e) { }  // General first
        // catch (ArrayIndexOutOfBoundsException e) { }  // Specific later - ERROR!
    }
}
```

#### Multi-Catch (Java 7+)
```java
public class MultiCatch {
    public static void main(String[] args) {
        try {
            // Some code that might throw exceptions
            int result = 10 / 0;
        } catch (ArithmeticException | NullPointerException e) {
            System.out.println("Arithmetic or Null Pointer Exception: " + e);
        }
    }
}
```

---

### 4. Finally Block

#### Always Executes
```java
public class FinallyDemo {
    public static void main(String[] args) {
        try {
            System.out.println("Try block");
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Catch block");
        } finally {
            System.out.println("Finally block - always executes");
        }
        
        System.out.println("After try-catch-finally");
    }
}
```

#### Finally with Return
```java
public class FinallyWithReturn {
    public static int test() {
        try {
            System.out.println("Try block");
            return 1;
        } catch (Exception e) {
            System.out.println("Catch block");
            return 2;
        } finally {
            System.out.println("Finally block");
            // return 3;  // If uncommented, this will be the return value
        }
    }
    
    public static void main(String[] args) {
        int result = test();
        System.out.println("Result: " + result);
    }
}
```

#### Resource Cleanup
```java
import java.io.*;

public class ResourceCleanup {
    public static void main(String[] args) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        } finally {
            // Always close resources
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                System.out.println("Error closing file: " + e.getMessage());
            }
        }
    }
}
```

---

### 5. Try-With-Resources (Java 7+)

#### Automatic Resource Management
```java
import java.io.*;

public class TryWithResources {
    public static void main(String[] args) {
        // Resources are automatically closed
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // reader is automatically closed here
    }
}
```

#### Multiple Resources
```java
import java.io.*;

public class MultipleResources {
    public static void main(String[] args) {
        try (
            FileInputStream fis = new FileInputStream("input.txt");
            FileOutputStream fos = new FileOutputStream("output.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(fis));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(fos))
        ) {
            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 6. Throw Keyword

#### Throwing Exceptions
```java
public class ThrowDemo {
    public static void checkAge(int age) {
        if (age < 18) {
            throw new ArithmeticException("Age must be 18 or above");
        }
        System.out.println("Age is valid: " + age);
    }
    
    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (ArithmeticException e) {
            System.out.println("Exception caught: " + e.getMessage());
        }
    }
}
```

#### Rethrowing Exceptions
```java
public class RethrowDemo {
    public static void method1() {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Exception in method1");
            throw e;  // Rethrow the exception
        }
    }
    
    public static void main(String[] args) {
        try {
            method1();
        } catch (ArithmeticException e) {
            System.out.println("Exception caught in main");
        }
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Safe Division Calculator
```java
import java.util.Scanner;

public class SafeDivision {
    public static double divide(int numerator, int denominator) {
        try {
            return (double) numerator / denominator;
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero");
            return 0;
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        try {
            System.out.print("Enter numerator: ");
            int num = sc.nextInt();
            
            System.out.print("Enter denominator: ");
            int den = sc.nextInt();
            
            double result = divide(num, den);
            System.out.println("Result: " + result);
            
        } catch (Exception e) {
            System.out.println("Invalid input");
        } finally {
            sc.close();
        }
    }
}
```

### Exercise 2: Array Access Handler
```java
public class SafeArrayAccess {
    public static int getElement(int[] array, int index) {
        try {
            return array[index];
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid index: " + index);
            return -1;
        } catch (NullPointerException e) {
            System.out.println("Array is null");
            return -1;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        
        System.out.println(getElement(numbers, 2));   // 30
        System.out.println(getElement(numbers, 10));  // Invalid index
        System.out.println(getElement(null, 0));      // Array is null
    }
}
```

### Exercise 3: String to Number Converter
```java
public class StringToNumber {
    public static int convertToInt(String str) {
        try {
            return Integer.parseInt(str);
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + str);
            return 0;
        } catch (NullPointerException e) {
            System.out.println("String is null");
            return 0;
        }
    }
    
    public static void main(String[] args) {
        System.out.println(convertToInt("123"));      // 123
        System.out.println(convertToInt("abc"));      // 0 (invalid)
        System.out.println(convertToInt(null));       // 0 (null)
        System.out.println(convertToInt("45.67"));    // 0 (invalid)
    }
}
```

---

### Exercise 4: File Reader with Exception Handling

**📝 Problem Statement:**
Create a comprehensive file reading system demonstrating proper exception handling with try-with-resources, finally blocks, multiple exception types, and resource cleanup. The system should safely read files, handle various I/O exceptions, provide meaningful error messages, display file statistics (line count, character count, word count), and ensure resources are properly closed even when exceptions occur.

**Requirements:**
- Create FileReaderUtil class with static method readFile(String filePath)
- Use try-with-resources to automatically manage BufferedReader resource
- Handle FileNotFoundException separately with specific error message about missing file
- Handle IOException for general file reading errors with appropriate messaging
- Implement displayFileStats(String filePath) method showing line count, word count, character count
- Add countLines(String filePath) method returning number of lines in file
- Implement searchInFile(String filePath, String searchTerm) method finding lines containing search term
- Use multiple catch blocks to handle different exception types with specific messages
- Demonstrate finally block with resource cleanup message (though try-with-resources auto-closes)
- Add validation checking if file path is null or empty before attempting to read
- Provide copyFile(String source, String destination) method using try-with-resources for both streams
- Include error recovery: if file not found, create sample file with default content

**Sample Test Cases:**
```
Input: readFile("existing_file.txt") [file exists with content "Hello World"]
Expected Output:
=== Reading File: existing_file.txt ===
File opened successfully
Line 1: Hello World
File read successfully
Total lines read: 1
Resource cleanup: BufferedReader closed automatically

Input: readFile("missing_file.txt") [file doesn't exist]
Expected Output:
=== Reading File: missing_file.txt ===
ERROR: File not found
File path: missing_file.txt
Please check if the file exists and path is correct
Would you like to create a sample file? (yes/no)

Input: displayFileStats("data.txt") [file with multiple lines]
Expected Output:
=== File Statistics: data.txt ===
Total Lines: 10
Total Words: 156
Total Characters: 842
Average Words Per Line: 15.6
File Size: 842 bytes
File read successfully

Input: searchInFile("log.txt", "ERROR")
Expected Output:
=== Searching for "ERROR" in log.txt ===
Found 3 matches:
Line 5: ERROR: Connection timeout
Line 12: ERROR: Invalid user credentials
Line 23: ERROR: Database connection failed

Input: copyFile("source.txt", "destination.txt")
Expected Output:
=== Copying File ===
Source: source.txt
Destination: destination.txt
Opening source file...
Creating destination file...
Copying content... 100%
Copy completed successfully
Copied 1024 bytes
Both files closed automatically
```

**Solution:**
```java
import java.io.*;
import java.util.Scanner;

public class FileReaderUtil {

    // Read and display file content
    public static void readFile(String filePath) {
        System.out.println("\n=== Reading File: " + filePath + " ===");

        // Validation
        if (filePath == null || filePath.trim().isEmpty()) {
            System.out.println("ERROR: File path cannot be null or empty");
            return;
        }

        // Try-with-resources - automatically closes BufferedReader
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            System.out.println("File opened successfully");

            String line;
            int lineNumber = 0;

            while ((line = reader.readLine()) != null) {
                lineNumber++;
                System.out.println("Line " + lineNumber + ": " + line);
            }

            System.out.println("File read successfully");
            System.out.println("Total lines read: " + lineNumber);

        } catch (FileNotFoundException e) {
            System.out.println("ERROR: File not found");
            System.out.println("File path: " + filePath);
            System.out.println("Please check if the file exists and path is correct");
            System.out.println("Exception details: " + e.getMessage());

            // Offer to create sample file
            offerCreateSampleFile(filePath);

        } catch (IOException e) {
            System.out.println("ERROR: Error reading file");
            System.out.println("IO Exception occurred: " + e.getMessage());
            e.printStackTrace();

        } finally {
            // Finally always executes (even though try-with-resources auto-closes)
            System.out.println("Resource cleanup: BufferedReader closed automatically");
        }
    }

    // Display file statistics
    public static void displayFileStats(String filePath) {
        System.out.println("\n=== File Statistics: " + filePath + " ===");

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            int lineCount = 0;
            int wordCount = 0;
            int charCount = 0;
            String line;

            while ((line = reader.readLine()) != null) {
                lineCount++;
                charCount += line.length();

                // Count words (split by spaces)
                String[] words = line.trim().split("\\s+");
                if (!line.trim().isEmpty()) {
                    wordCount += words.length;
                }
            }

            System.out.println("Total Lines: " + lineCount);
            System.out.println("Total Words: " + wordCount);
            System.out.println("Total Characters: " + charCount);

            if (lineCount > 0) {
                double avgWordsPerLine = (double) wordCount / lineCount;
                System.out.println("Average Words Per Line: " + String.format("%.1f", avgWordsPerLine));
            }

            System.out.println("File Size: " + charCount + " bytes");
            System.out.println("File read successfully");

        } catch (FileNotFoundException e) {
            System.out.println("ERROR: File not found - " + filePath);
        } catch (IOException e) {
            System.out.println("ERROR: Could not read file statistics");
            System.out.println("Details: " + e.getMessage());
        }
    }

    // Count lines in file
    public static int countLines(String filePath) {
        int count = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            while (reader.readLine() != null) {
                count++;
            }
        } catch (IOException e) {
            System.out.println("ERROR: Could not count lines - " + e.getMessage());
            return -1;
        }
        return count;
    }

    // Search for term in file
    public static void searchInFile(String filePath, String searchTerm) {
        System.out.println("\n=== Searching for \"" + searchTerm + "\" in " + filePath + " ===");

        if (searchTerm == null || searchTerm.isEmpty()) {
            System.out.println("ERROR: Search term cannot be empty");
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            int lineNumber = 0;
            int matchCount = 0;

            while ((line = reader.readLine()) != null) {
                lineNumber++;
                if (line.toLowerCase().contains(searchTerm.toLowerCase())) {
                    matchCount++;
                    System.out.println("Line " + lineNumber + ": " + line);
                }
            }

            if (matchCount == 0) {
                System.out.println("No matches found for \"" + searchTerm + "\"");
            } else {
                System.out.println("\nFound " + matchCount + " match(es)");
            }

        } catch (FileNotFoundException e) {
            System.out.println("ERROR: File not found - " + filePath);
        } catch (IOException e) {
            System.out.println("ERROR: Error searching file - " + e.getMessage());
        }
    }

    // Copy file
    public static boolean copyFile(String sourcePath, String destPath) {
        System.out.println("\n=== Copying File ===");
        System.out.println("Source: " + sourcePath);
        System.out.println("Destination: " + destPath);

        // Try-with-resources with multiple resources
        try (BufferedReader reader = new BufferedReader(new FileReader(sourcePath));
             BufferedWriter writer = new BufferedWriter(new FileWriter(destPath))) {

            System.out.println("Opening source file...");
            System.out.println("Creating destination file...");
            System.out.println("Copying content...");

            String line;
            int bytesWritten = 0;

            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();
                bytesWritten += line.length() + 1;
            }

            System.out.println("Copy completed successfully");
            System.out.println("Copied " + bytesWritten + " bytes");
            System.out.println("Both files closed automatically");
            return true;

        } catch (FileNotFoundException e) {
            System.out.println("ERROR: Source file not found - " + sourcePath);
            return false;
        } catch (IOException e) {
            System.out.println("ERROR: Error during file copy");
            System.out.println("Details: " + e.getMessage());
            return false;
        }
    }

    // Helper method to offer creating sample file
    private static void offerCreateSampleFile(String filePath) {
        System.out.println("\nWould you like to create a sample file? (yes/no)");
        Scanner scanner = new Scanner(System.in);
        String response = scanner.nextLine();

        if (response.equalsIgnoreCase("yes")) {
            createSampleFile(filePath);
        }
    }

    // Create sample file with default content
    private static void createSampleFile(String filePath) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write("This is a sample file.");
            writer.newLine();
            writer.write("Created automatically by FileReaderUtil.");
            System.out.println("Sample file created: " + filePath);
        } catch (IOException e) {
            System.out.println("ERROR: Could not create sample file");
        }
    }
}

public class TestFileReader {
    public static void main(String[] args) {
        // Test reading file
        FileReaderUtil.readFile("test.txt");

        // Test file statistics
        FileReaderUtil.displayFileStats("test.txt");

        // Test line count
        int lines = FileReaderUtil.countLines("test.txt");
        System.out.println("\nLine count: " + lines);

        // Test search
        FileReaderUtil.searchInFile("test.txt", "Java");

        // Test copy
        FileReaderUtil.copyFile("test.txt", "test_copy.txt");

        // Test with missing file
        FileReaderUtil.readFile("missing.txt");
    }
}
```

**💡 Tips:**
- Try-with-resources (try (...)) automatically closes resources implementing AutoCloseable/Closeable
- BufferedReader and BufferedWriter both implement AutoCloseable, so perfect for try-with-resources
- Multiple resources in try-with-resources separated by semicolons: try (R1; R2; R3)
- Resources closed in reverse order of declaration: R3, then R2, then R1
- FileNotFoundException is subclass of IOException - catch specific exceptions first
- finally block executes even if return statement in try/catch - useful for cleanup logging
- readLine() returns null when end of file reached - standard pattern: while ((line = reader.readLine()) != null)
- Validation before file operations prevents NullPointerException: check null and empty strings
- split("\\s+") splits by one or more whitespace characters for word counting
- trim().isEmpty() check prevents counting empty lines as having words
- BufferedWriter.newLine() writes platform-specific line separator (\\n on Unix, \\r\\n on Windows)
- Exception chaining: catch specific exceptions first (FileNotFoundException), then general (IOException)
- Error recovery: offerCreateSampleFile() demonstrates graceful degradation when file missing
- Resource scope: variables declared in try-with-resources parentheses only accessible inside try block

---

### Exercise 5: Student Grade Management System with Exception Handling

**📝 Problem Statement:**
Create a student grade management system demonstrating comprehensive exception handling for user input validation, data processing, and business logic errors. The system should handle invalid input gracefully, validate grade ranges, manage student records with proper exception handling, calculate statistics safely, and provide meaningful error messages for various failure scenarios including invalid grades, duplicate student IDs, and invalid operations.

**Requirements:**
- Create Student class with fields: studentId, name, grade (0-100)
- Implement GradeManager class with ArrayList<Student> for storing students
- Create addStudent(String id, String name, int grade) method with validation
- Throw IllegalArgumentException if student ID is empty or null
- Throw IllegalArgumentException if name is empty or null
- Throw IllegalArgumentException if grade < 0 or grade > 100
- Check for duplicate student IDs and throw IllegalStateException if duplicate found
- Implement getStudent(String studentId) method throwing NoSuchElementException if not found
- Create updateGrade(String studentId, int newGrade) method with validation
- Implement removeStudent(String studentId) method handling non-existent student gracefully
- Add calculateAverage() method returning average grade, handling empty list with try-catch
- Create displayAllStudents() method with exception handling for empty list
- Implement findTopStudent() method throwing exception if no students exist
- Add inputStudentFromConsole() method using Scanner with InputMismatchException handling
- Validate all user input with appropriate exception messages
- Use finally block to close Scanner resources

**Sample Test Cases:**
```
Input: addStudent("S001", "Alice", 85)
Expected Output:
=== Adding Student ===
Student ID: S001
Name: Alice
Grade: 85
Validating student data...
All validations passed ✓
Student added successfully

Input: addStudent("", "Bob", 90)
Expected Output:
=== Adding Student ===
ERROR: Invalid student ID
Exception: IllegalArgumentException
Message: Student ID cannot be empty or null
Student not added

Input: addStudent("S002", "Charlie", 150)
Expected Output:
=== Adding Student ===
ERROR: Invalid grade
Exception: IllegalArgumentException
Message: Grade must be between 0 and 100. Received: 150
Student not added

Input: addStudent("S001", "David", 88) [S001 already exists]
Expected Output:
=== Adding Student ===
ERROR: Duplicate student ID
Exception: IllegalStateException
Message: Student with ID S001 already exists
Cannot add duplicate student

Input: getStudent("S999") [student doesn't exist]
Expected Output:
=== Retrieving Student ===
Searching for student ID: S999
ERROR: Student not found
Exception: NoSuchElementException
Message: No student found with ID: S999

Input: calculateAverage() [no students]
Expected Output:
=== Calculating Average Grade ===
ERROR: No students in system
Cannot calculate average for empty student list
Returning default value: 0.0

Input: updateGrade("S001", 95)
Expected Output:
=== Updating Grade ===
Student ID: S001
Current Grade: 85
New Grade: 95
Validating new grade...
Grade validation passed ✓
Grade updated successfully
Updated student: Alice (S001) - Grade: 95

Input: findTopStudent()
Expected Output:
=== Finding Top Student ===
Searching through 5 students...
Top Student Found:
Name: Alice
ID: S001
Grade: 95
```

**Solution:**
```java
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.NoSuchElementException;
import java.util.Scanner;

// Student class
class Student {
    private String studentId;
    private String name;
    private int grade;

    public Student(String studentId, String name, int grade) {
        this.studentId = studentId;
        this.name = name;
        this.grade = grade;
    }

    public String getStudentId() { return studentId; }
    public String getName() { return name; }
    public int getGrade() { return grade; }
    public void setGrade(int grade) { this.grade = grade; }

    @Override
    public String toString() {
        return name + " (ID: " + studentId + ", Grade: " + grade + ")";
    }
}

// Grade Manager class
class GradeManager {
    private ArrayList<Student> students;

    public GradeManager() {
        students = new ArrayList<>();
    }

    // Add student with validation
    public void addStudent(String studentId, String name, int grade) {
        System.out.println("\n=== Adding Student ===");
        System.out.println("Student ID: " + studentId);
        System.out.println("Name: " + name);
        System.out.println("Grade: " + grade);
        System.out.println("Validating student data...");

        try {
            // Validate student ID
            if (studentId == null || studentId.trim().isEmpty()) {
                throw new IllegalArgumentException("Student ID cannot be empty or null");
            }

            // Validate name
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalArgumentException("Student name cannot be empty or null");
            }

            // Validate grade range
            if (grade < 0 || grade > 100) {
                throw new IllegalArgumentException("Grade must be between 0 and 100. Received: " + grade);
            }

            // Check for duplicate ID
            for (Student student : students) {
                if (student.getStudentId().equals(studentId)) {
                    throw new IllegalStateException("Student with ID " + studentId + " already exists");
                }
            }

            // All validations passed
            Student student = new Student(studentId, name, grade);
            students.add(student);
            System.out.println("All validations passed ✓");
            System.out.println("Student added successfully");

        } catch (IllegalArgumentException e) {
            System.out.println("ERROR: Invalid student data");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
            System.out.println("Student not added");

        } catch (IllegalStateException e) {
            System.out.println("ERROR: Duplicate student ID");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
            System.out.println("Cannot add duplicate student");
        }
    }

    // Get student by ID
    public Student getStudent(String studentId) {
        System.out.println("\n=== Retrieving Student ===");
        System.out.println("Searching for student ID: " + studentId);

        try {
            for (Student student : students) {
                if (student.getStudentId().equals(studentId)) {
                    System.out.println("Student found: " + student);
                    return student;
                }
            }
            // If not found, throw exception
            throw new NoSuchElementException("No student found with ID: " + studentId);

        } catch (NoSuchElementException e) {
            System.out.println("ERROR: Student not found");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
            return null;
        }
    }

    // Update student grade
    public boolean updateGrade(String studentId, int newGrade) {
        System.out.println("\n=== Updating Grade ===");
        System.out.println("Student ID: " + studentId);

        try {
            // Validate new grade
            if (newGrade < 0 || newGrade > 100) {
                throw new IllegalArgumentException("Grade must be between 0 and 100. Received: " + newGrade);
            }

            Student student = null;
            for (Student s : students) {
                if (s.getStudentId().equals(studentId)) {
                    student = s;
                    break;
                }
            }

            if (student == null) {
                throw new NoSuchElementException("Student with ID " + studentId + " not found");
            }

            System.out.println("Current Grade: " + student.getGrade());
            System.out.println("New Grade: " + newGrade);
            System.out.println("Validating new grade...");

            student.setGrade(newGrade);
            System.out.println("Grade validation passed ✓");
            System.out.println("Grade updated successfully");
            System.out.println("Updated student: " + student);
            return true;

        } catch (IllegalArgumentException e) {
            System.out.println("ERROR: Invalid grade value");
            System.out.println("Message: " + e.getMessage());
            return false;
        } catch (NoSuchElementException e) {
            System.out.println("ERROR: Student not found");
            System.out.println("Message: " + e.getMessage());
            return false;
        }
    }

    // Calculate average grade
    public double calculateAverage() {
        System.out.println("\n=== Calculating Average Grade ===");

        try {
            if (students.isEmpty()) {
                throw new IllegalStateException("No students in system");
            }

            int sum = 0;
            for (Student student : students) {
                sum += student.getGrade();
            }

            double average = (double) sum / students.size();
            System.out.println("Total students: " + students.size());
            System.out.println("Total grades sum: " + sum);
            System.out.println("Average grade: " + String.format("%.2f", average));
            return average;

        } catch (IllegalStateException e) {
            System.out.println("ERROR: " + e.getMessage());
            System.out.println("Cannot calculate average for empty student list");
            System.out.println("Returning default value: 0.0");
            return 0.0;
        }
    }

    // Find top student
    public Student findTopStudent() {
        System.out.println("\n=== Finding Top Student ===");

        try {
            if (students.isEmpty()) {
                throw new IllegalStateException("No students in system");
            }

            System.out.println("Searching through " + students.size() + " students...");

            Student topStudent = students.get(0);
            for (Student student : students) {
                if (student.getGrade() > topStudent.getGrade()) {
                    topStudent = student;
                }
            }

            System.out.println("Top Student Found:");
            System.out.println("Name: " + topStudent.getName());
            System.out.println("ID: " + topStudent.getStudentId());
            System.out.println("Grade: " + topStudent.getGrade());
            return topStudent;

        } catch (IllegalStateException e) {
            System.out.println("ERROR: " + e.getMessage());
            System.out.println("Cannot find top student without any students");
            return null;
        }
    }

    // Display all students
    public void displayAllStudents() {
        System.out.println("\n=== All Students ===");

        try {
            if (students.isEmpty()) {
                throw new IllegalStateException("No students to display");
            }

            System.out.println("Total Students: " + students.size());
            System.out.println("---");

            for (int i = 0; i < students.size(); i++) {
                System.out.println((i + 1) + ". " + students.get(i));
            }

        } catch (IllegalStateException e) {
            System.out.println("Student list is empty");
            System.out.println("Please add students first");
        }
    }

    // Input student from console
    public void inputStudentFromConsole() {
        System.out.println("\n=== Input Student from Console ===");
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Enter Student ID: ");
            String id = scanner.nextLine();

            System.out.print("Enter Student Name: ");
            String name = scanner.nextLine();

            System.out.print("Enter Grade (0-100): ");
            int grade = scanner.nextInt();

            addStudent(id, name, grade);

        } catch (InputMismatchException e) {
            System.out.println("\nERROR: Invalid input format");
            System.out.println("Grade must be a number");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            scanner.nextLine(); // Clear invalid input

        } finally {
            System.out.println("Input operation completed");
        }
    }
}

public class TestGradeManager {
    public static void main(String[] args) {
        GradeManager manager = new GradeManager();

        // Test adding students
        manager.addStudent("S001", "Alice", 85);
        manager.addStudent("S002", "Bob", 92);
        manager.addStudent("S003", "Charlie", 78);

        // Test invalid inputs
        manager.addStudent("", "Invalid", 80);          // Empty ID
        manager.addStudent("S004", "David", 150);       // Invalid grade
        manager.addStudent("S001", "Duplicate", 90);    // Duplicate ID

        // Display all students
        manager.displayAllStudents();

        // Test get student
        manager.getStudent("S002");
        manager.getStudent("S999");  // Not found

        // Test update grade
        manager.updateGrade("S001", 95);
        manager.updateGrade("S001", 110);  // Invalid grade

        // Calculate average
        manager.calculateAverage();

        // Find top student
        manager.findTopStudent();

        // Test with empty manager
        GradeManager emptyManager = new GradeManager();
        emptyManager.calculateAverage();
        emptyManager.findTopStudent();
        emptyManager.displayAllStudents();
    }
}
```

**💡 Tips:**
- IllegalArgumentException used for invalid method arguments (null, empty, out-of-range values)
- IllegalStateException used for invalid state (duplicate ID, operations on empty list)
- NoSuchElementException used when search fails to find requested element
- Validation order matters: check null/empty first, then range, then business rules (duplicates)
- try-catch blocks isolate validation logic from main logic - cleaner error handling
- Exception messages should be descriptive: include actual invalid value received
- ArrayList.isEmpty() check prevents operations on empty collections
- Scanner.nextInt() throws InputMismatchException if user enters non-integer
- scanner.nextLine() after InputMismatchException clears the invalid input from buffer
- finally block in inputStudentFromConsole() ensures completion message printed regardless of exceptions
- Return null from get methods when not found after catching exception - caller can check for null
- Enhanced for loop (for-each) simplifies iteration when checking duplicates or searching

---

### Exercise 6: Banking Transaction System with Exception Handling

**📝 Problem Statement:**
Create a banking transaction system demonstrating comprehensive exception handling for financial operations, business rule validation, concurrent access scenarios, and transaction rollback. The system should manage bank accounts, process deposits and withdrawals with proper validation, handle insufficient funds gracefully, validate transaction amounts, maintain transaction history, and ensure data integrity with atomic operations using exception handling to roll back failed transactions.

**Requirements:**
- Create BankAccount class with fields: accountNumber, accountHolderName, balance (private)
- Implement deposit(double amount) method throwing IllegalArgumentException if amount <= 0
- Create withdraw(double amount) method throwing InsufficientFundsException if balance < amount
- Define custom InsufficientFundsException extending Exception with required and available amounts
- Implement transfer(BankAccount from, BankAccount to, double amount) method as atomic operation
- If transfer fails at any step, roll back previous changes using try-catch-finally
- Add getBalance() method that requires authentication (throws UnauthorizedException if not authenticated)
- Create validateTransaction(double amount) method checking amount > 0 and amount < 1000000 (transaction limit)
- Implement processTransaction(String type, double amount) with multiple exception handling
- Add transaction history with addTransactionRecord(String type, double amount, boolean success)
- Include displayTransactionHistory() method showing successful and failed transactions
- Use multiple catch blocks to handle different exception types with specific error messages
- Demonstrate exception chaining: wrap low-level exceptions with high-level business exceptions
- Add freezeAccount() and unfreezeAccount() methods throwing AccountFrozenException on frozen account operations
- Implement dailyWithdrawalLimit with LimitExceededException when limit exceeded

**Sample Test Cases:**
```
Input: deposit(500.00)
Expected Output:
=== Processing Deposit ===
Account: 12345
Current Balance: $1000.00
Deposit Amount: $500.00
Validating transaction...
Validation passed ✓
Processing deposit...
New Balance: $1500.00
Transaction successful
Transaction recorded: DEPOSIT $500.00

Input: deposit(-100.00)
Expected Output:
=== Processing Deposit ===
ERROR: Invalid deposit amount
Exception: IllegalArgumentException
Message: Deposit amount must be positive. Received: -100.0
Transaction failed
Transaction recorded: DEPOSIT $-100.00 [FAILED]

Input: withdraw(2000.00) [balance is 1500.00]
Expected Output:
=== Processing Withdrawal ===
Account: 12345
Current Balance: $1500.00
Withdrawal Amount: $2000.00
Checking account balance...
ERROR: Insufficient funds
Exception: InsufficientFundsException
Required: $2000.00
Available: $1500.00
Shortfall: $500.00
Transaction declined
Transaction recorded: WITHDRAWAL $2000.00 [FAILED - INSUFFICIENT FUNDS]

Input: transfer(account1, account2, 500.00) [both accounts valid]
Expected Output:
=== Processing Transfer ===
From Account: 12345 (Alice)
To Account: 67890 (Bob)
Amount: $500.00
Validating transfer...
Checking source account balance...
Balance check passed ✓
Step 1: Withdrawing from source account...
Withdrawn: $500.00
Source new balance: $1000.00
Step 2: Depositing to destination account...
Deposited: $500.00
Destination new balance: $2500.00
Transfer completed successfully
Both accounts updated

Input: transfer(account1, account2, 2000.00) [insufficient funds, demonstrate rollback]
Expected Output:
=== Processing Transfer ===
From Account: 12345 (Alice)
To Account: 67890 (Bob)
Amount: $2000.00
Validating transfer...
ERROR: Transfer failed
Exception: InsufficientFundsException
Message: Insufficient funds in source account
Rolling back transaction...
No changes made to either account
Transfer cancelled

Input: withdraw(300.00) [account frozen]
Expected Output:
=== Processing Withdrawal ===
ERROR: Account frozen
Exception: AccountFrozenException
Message: Account 12345 is currently frozen
Cannot perform transactions on frozen account
Please contact customer service
Transaction blocked

Input: displayTransactionHistory()
Expected Output:
=== Transaction History ===
Account: 12345 (Alice)
Total Transactions: 6

Successful Transactions:
1. DEPOSIT $500.00 - Success
2. WITHDRAWAL $200.00 - Success
3. TRANSFER OUT $500.00 - Success

Failed Transactions:
1. DEPOSIT $-100.00 - Failed (Invalid amount)
2. WITHDRAWAL $2000.00 - Failed (Insufficient funds)
3. TRANSFER OUT $2000.00 - Failed (Insufficient funds)

Success Rate: 50% (3/6)
```

**Solution:**
```java
import java.util.ArrayList;

// Custom exception for insufficient funds
class InsufficientFundsException extends Exception {
    private double required;
    private double available;

    public InsufficientFundsException(double required, double available) {
        super("Insufficient funds. Required: $" + required + ", Available: $" + available);
        this.required = required;
        this.available = available;
    }

    public double getRequired() { return required; }
    public double getAvailable() { return available; }
    public double getShortfall() { return required - available; }
}

// Custom exception for frozen account
class AccountFrozenException extends Exception {
    public AccountFrozenException(String accountNumber) {
        super("Account " + accountNumber + " is currently frozen");
    }
}

// Transaction record class
class TransactionRecord {
    private String type;
    private double amount;
    private boolean success;
    private String failureReason;

    public TransactionRecord(String type, double amount, boolean success, String failureReason) {
        this.type = type;
        this.amount = amount;
        this.success = success;
        this.failureReason = failureReason;
    }

    @Override
    public String toString() {
        if (success) {
            return type + " $" + String.format("%.2f", amount) + " - Success";
        } else {
            return type + " $" + String.format("%.2f", amount) + " - Failed (" + failureReason + ")";
        }
    }
}

// Bank Account class
class BankAccount {
    private String accountNumber;
    private String accountHolderName;
    private double balance;
    private boolean frozen;
    private ArrayList<TransactionRecord> transactionHistory;

    public BankAccount(String accountNumber, String accountHolderName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = initialBalance;
        this.frozen = false;
        this.transactionHistory = new ArrayList<>();
    }

    // Getters
    public String getAccountNumber() { return accountNumber; }
    public String getAccountHolderName() { return accountHolderName; }
    public double getBalance() { return balance; }
    public boolean isFrozen() { return frozen; }

    // Freeze/unfreeze account
    public void freezeAccount() {
        frozen = true;
        System.out.println("Account " + accountNumber + " has been frozen");
    }

    public void unfreezeAccount() {
        frozen = false;
        System.out.println("Account " + accountNumber + " has been unfrozen");
    }

    // Deposit money
    public void deposit(double amount) {
        System.out.println("\n=== Processing Deposit ===");
        System.out.println("Account: " + accountNumber);
        System.out.println("Current Balance: $" + String.format("%.2f", balance));
        System.out.println("Deposit Amount: $" + String.format("%.2f", amount));

        try {
            // Check if account is frozen
            if (frozen) {
                throw new AccountFrozenException(accountNumber);
            }

            // Validate amount
            if (amount <= 0) {
                throw new IllegalArgumentException("Deposit amount must be positive. Received: " + amount);
            }

            System.out.println("Validating transaction...");
            validateTransaction(amount);
            System.out.println("Validation passed ✓");

            // Process deposit
            System.out.println("Processing deposit...");
            balance += amount;
            System.out.println("New Balance: $" + String.format("%.2f", balance));
            System.out.println("Transaction successful");

            // Record successful transaction
            addTransactionRecord("DEPOSIT", amount, true, null);

        } catch (IllegalArgumentException e) {
            System.out.println("ERROR: Invalid deposit amount");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
            System.out.println("Transaction failed");
            addTransactionRecord("DEPOSIT", amount, false, "Invalid amount");

        } catch (AccountFrozenException e) {
            System.out.println("ERROR: Account frozen");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
            System.out.println("Cannot perform transactions on frozen account");
            System.out.println("Please contact customer service");
            System.out.println("Transaction blocked");
            addTransactionRecord("DEPOSIT", amount, false, "Account frozen");

        } catch (Exception e) {
            System.out.println("ERROR: Transaction validation failed");
            System.out.println("Message: " + e.getMessage());
            System.out.println("Transaction failed");
            addTransactionRecord("DEPOSIT", amount, false, e.getMessage());
        }
    }

    // Withdraw money
    public void withdraw(double amount) throws InsufficientFundsException {
        System.out.println("\n=== Processing Withdrawal ===");
        System.out.println("Account: " + accountNumber);
        System.out.println("Current Balance: $" + String.format("%.2f", balance));
        System.out.println("Withdrawal Amount: $" + String.format("%.2f", amount));

        try {
            // Check if account is frozen
            if (frozen) {
                throw new AccountFrozenException(accountNumber);
            }

            // Validate amount
            if (amount <= 0) {
                throw new IllegalArgumentException("Withdrawal amount must be positive");
            }

            System.out.println("Checking account balance...");
            // Check sufficient funds
            if (balance < amount) {
                throw new InsufficientFundsException(amount, balance);
            }

            validateTransaction(amount);

            // Process withdrawal
            balance -= amount;
            System.out.println("Withdrawal successful");
            System.out.println("New Balance: $" + String.format("%.2f", balance));
            addTransactionRecord("WITHDRAWAL", amount, true, null);

        } catch (IllegalArgumentException e) {
            System.out.println("ERROR: Invalid withdrawal amount");
            System.out.println("Message: " + e.getMessage());
            addTransactionRecord("WITHDRAWAL", amount, false, "Invalid amount");
            throw new InsufficientFundsException(amount, balance);

        } catch (InsufficientFundsException e) {
            System.out.println("ERROR: Insufficient funds");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Required: $" + String.format("%.2f", e.getRequired()));
            System.out.println("Available: $" + String.format("%.2f", e.getAvailable()));
            System.out.println("Shortfall: $" + String.format("%.2f", e.getShortfall()));
            System.out.println("Transaction declined");
            addTransactionRecord("WITHDRAWAL", amount, false, "Insufficient funds");
            throw e;  // Rethrow for caller

        } catch (AccountFrozenException e) {
            System.out.println("ERROR: Account frozen");
            System.out.println("Message: " + e.getMessage());
            addTransactionRecord("WITHDRAWAL", amount, false, "Account frozen");
            throw new InsufficientFundsException(amount, balance);

        } catch (Exception e) {
            System.out.println("ERROR: Withdrawal failed");
            System.out.println("Message: " + e.getMessage());
            addTransactionRecord("WITHDRAWAL", amount, false, e.getMessage());
            throw new InsufficientFundsException(amount, balance);
        }
    }

    // Validate transaction
    private void validateTransaction(double amount) throws Exception {
        if (amount > 1000000) {
            throw new Exception("Transaction amount exceeds limit of $1,000,000");
        }
    }

    // Add transaction record
    private void addTransactionRecord(String type, double amount, boolean success, String failureReason) {
        TransactionRecord record = new TransactionRecord(type, amount, success, failureReason);
        transactionHistory.add(record);
        System.out.println("Transaction recorded: " + record);
    }

    // Display transaction history
    public void displayTransactionHistory() {
        System.out.println("\n=== Transaction History ===");
        System.out.println("Account: " + accountNumber + " (" + accountHolderName + ")");
        System.out.println("Total Transactions: " + transactionHistory.size());
        System.out.println();

        int successCount = 0;
        int failureCount = 0;

        System.out.println("Successful Transactions:");
        int successIndex = 1;
        for (TransactionRecord record : transactionHistory) {
            if (record.toString().contains("Success")) {
                System.out.println(successIndex + ". " + record);
                successIndex++;
                successCount++;
            }
        }

        System.out.println("\nFailed Transactions:");
        int failureIndex = 1;
        for (TransactionRecord record : transactionHistory) {
            if (record.toString().contains("Failed")) {
                System.out.println(failureIndex + ". " + record);
                failureIndex++;
                failureCount++;
            }
        }

        int total = successCount + failureCount;
        if (total > 0) {
            double successRate = (successCount * 100.0) / total;
            System.out.println("\nSuccess Rate: " + String.format("%.0f%%", successRate) + " (" + successCount + "/" + total + ")");
        }
    }

    // Transfer money between accounts
    public static void transfer(BankAccount from, BankAccount to, double amount) {
        System.out.println("\n=== Processing Transfer ===");
        System.out.println("From Account: " + from.getAccountNumber() + " (" + from.getAccountHolderName() + ")");
        System.out.println("To Account: " + to.getAccountNumber() + " (" + to.getAccountHolderName() + ")");
        System.out.println("Amount: $" + String.format("%.2f", amount));
        System.out.println("Validating transfer...");

        try {
            System.out.println("Checking source account balance...");
            if (from.getBalance() < amount) {
                throw new InsufficientFundsException(amount, from.getBalance());
            }
            System.out.println("Balance check passed ✓");

            // Atomic transaction: both steps must succeed
            System.out.println("Step 1: Withdrawing from source account...");
            from.withdraw(amount);
            System.out.println("Withdrawn: $" + String.format("%.2f", amount));
            System.out.println("Source new balance: $" + String.format("%.2f", from.getBalance()));

            System.out.println("Step 2: Depositing to destination account...");
            to.deposit(amount);
            System.out.println("Deposited: $" + String.format("%.2f", amount));
            System.out.println("Destination new balance: $" + String.format("%.2f", to.getBalance()));

            System.out.println("Transfer completed successfully");
            System.out.println("Both accounts updated");
            from.addTransactionRecord("TRANSFER OUT", amount, true, null);
            to.addTransactionRecord("TRANSFER IN", amount, true, null);

        } catch (InsufficientFundsException e) {
            System.out.println("ERROR: Transfer failed");
            System.out.println("Exception: " + e.getClass().getSimpleName());
            System.out.println("Message: " + e.getMessage());
            System.out.println("Rolling back transaction...");
            System.out.println("No changes made to either account");
            System.out.println("Transfer cancelled");
            from.addTransactionRecord("TRANSFER OUT", amount, false, "Insufficient funds");
            to.addTransactionRecord("TRANSFER IN", amount, false, "Source insufficient funds");
        }
    }
}

public class TestBankingSystem {
    public static void main(String[] args) {
        // Create accounts
        BankAccount alice = new BankAccount("12345", "Alice", 1000.00);
        BankAccount bob = new BankAccount("67890", "Bob", 2000.00);

        // Test deposits
        alice.deposit(500.00);
        alice.deposit(-100.00);  // Invalid

        // Test withdrawals
        try {
            alice.withdraw(200.00);
            alice.withdraw(2000.00);  // Insufficient funds
        } catch (InsufficientFundsException e) {
            // Already handled in method
        }

        // Test transfers
        BankAccount.transfer(alice, bob, 500.00);  // Success
        BankAccount.transfer(alice, bob, 2000.00); // Fail - insufficient funds

        // Test frozen account
        alice.freezeAccount();
        alice.deposit(100.00);  // Should fail
        alice.unfreezeAccount();

        // Display transaction history
        alice.displayTransactionHistory();
        bob.displayTransactionHistory();
    }
}
```

**💡 Tips:**
- Custom exceptions (InsufficientFundsException, AccountFrozenException) extend Exception for checked exceptions
- Custom exception constructor takes parameters (required, available) storing state for later access
- Exception chaining: low-level exceptions (IllegalArgumentException) wrapped in high-level exceptions (InsufficientFundsException)
- Atomic operations: transfer() either completes fully or rolls back completely - no partial state
- Transaction history ArrayList stores both successful and failed transactions for auditing
- Multiple catch blocks handle different scenarios: invalid input, insufficient funds, frozen account, general errors
- Rethrowing exceptions (throw e;) passes exception up call stack for higher-level handling
- Validation order: frozen check → amount validation → balance check → transaction limit
- finally block would ensure cleanup even if exceptions occur (not needed here but important pattern)
- Business exceptions (InsufficientFundsException) more meaningful than generic exceptions
- getMessage() provides user-friendly error message; getClass().getSimpleName() shows exception type
- Success rate calculation demonstrates using transaction history for analytics
- Static transfer method operates on two account objects showing multi-object transaction handling

---

### Beginner Exercises

#### Exercise 1: Basic Try-Catch Practice
**Difficulty:** Beginner
**Objective:** Practice basic exception handling with try-catch blocks.

**Problem:** Create a program that safely performs different operations that might throw exceptions.

**Requirements:**
- Create method `safeDivide(int a, int b)` handling ArithmeticException
- Create method `safeArrayAccess(int[] arr, int index)` handling ArrayIndexOutOfBoundsException
- Create method `parseInteger(String str)` handling NumberFormatException
- Each method should catch exception, print error message, return default value
- Test all methods with valid and invalid inputs

**Example Output:**
```
=== Safe Division ===
10 / 2 = 5
10 / 0 = Error: Cannot divide by zero. Result: 0

=== Safe Array Access ===
Array[2] = 30
Array[10] = Error: Invalid index. Result: -1

=== Parse Integer ===
"123" = 123
"abc" = Error: Invalid number format. Result: 0
```

**Hint:** Use try-catch around risky operations, return default on exception.

---

#### Exercise 2: Multiple Catch Blocks
**Difficulty:** Easy
**Objective:** Practice handling multiple exception types with separate catch blocks.

**Problem:** Create a calculator that handles different types of exceptions separately.

**Requirements:**
- Create `Calculator` class with method `calculate(String operation, String num1, String num2)`
- Parse strings to integers (may throw NumberFormatException)
- Perform operation: add, subtract, multiply, divide (may throw ArithmeticException)
- Handle each exception type with specific error message
- Return result or error message

**Example Output:**
```
calculate("add", "10", "5") = 15
calculate("divide", "10", "0") = Error: Division by zero
calculate("add", "10", "abc") = Error: Invalid number format
calculate("multiply", "5", "3") = 15
```

**Hint:** Use multiple catch blocks ordered from specific to general exceptions.

---

#### Exercise 3: Finally Block Resource Cleanup
**Difficulty:** Easy
**Objective:** Practice using finally block for cleanup operations.

**Problem:** Create a program that opens a "resource" (simulated) and ensures it's closed in finally block.

**Requirements:**
- Create `Resource` class with methods `open()` and `close()`
- Create method `processResource(boolean shouldFail)` that:
  - Opens resource
  - Processes it (throws exception if shouldFail is true)
  - Closes resource in finally block
- Print messages showing when resource opens, processes, closes
- Test with both success and failure scenarios

**Example Output:**
```
=== Test 1: Success Scenario ===
Opening resource...
Processing resource...
Finally: Closing resource...
Process completed successfully

=== Test 2: Failure Scenario ===
Opening resource...
Processing resource...
Error occurred: Simulated processing failure
Finally: Closing resource...
Process failed but resource cleaned up
```

**Hint:** Finally block executes whether exception occurs or not.

---

#### Exercise 4: Try-With-Resources Practice
**Difficulty:** Medium
**Objective:** Practice automatic resource management with try-with-resources.

**Problem:** Create custom AutoCloseable resource and use try-with-resources for automatic cleanup.

**Requirements:**
- Create `DatabaseConnection` class implementing AutoCloseable
- Fields: connectionId, connected (boolean)
- Constructor opens connection, `close()` closes it
- Method `executeQuery(String query)` simulates query execution
- Use try-with-resources to ensure connection always closed
- Test with successful and failed queries

**Example Output:**
```
=== Test 1: Successful Query ===
Opening connection: CONN-001
Executing query: SELECT * FROM users
Query successful
Closing connection: CONN-001

=== Test 2: Failed Query ===
Opening connection: CONN-002
Executing query: INVALID SQL
Error: Query execution failed
Closing connection: CONN-002 (auto-closed despite error)
```

**Hint:** Try-with-resources automatically calls `close()` on AutoCloseable resources.

---

#### Exercise 5: Exception Message Formatting
**Difficulty:** Beginner
**Objective:** Practice creating meaningful exception messages with context.

**Problem:** Create a program that throws exceptions with detailed, informative messages.

**Requirements:**
- Create `BankAccount` class with field `balance`
- Method `withdraw(double amount)` that throws exception if:
  - Amount is negative (IllegalArgumentException with details)
  - Amount exceeds balance (custom InsufficientFundsException with balance and amount)
- Method `deposit(double amount)` throws exception if amount negative
- Exception messages include relevant values for debugging

**Example Output:**
```
=== Test 1: Negative Withdrawal ===
Error: Withdrawal amount must be positive. Received: -50.0

=== Test 2: Insufficient Funds ===
Error: Insufficient funds.
Balance: $100.0
Requested: $150.0
Shortfall: $50.0

=== Test 3: Successful Transaction ===
Deposited: $50.0
New Balance: $150.0
Withdrawn: $75.0
Final Balance: $75.0
```

**Hint:** Include actual values in exception messages for easier debugging.

---

#### Exercise 6: Nested Try-Catch Blocks
**Difficulty:** Medium
**Objective:** Practice using nested try-catch for complex error handling scenarios.

**Problem:** Create a file processor that handles exceptions at different levels.

**Requirements:**
- Outer try-catch handles FileNotFoundException
- Inner try-catch handles ParseException during line processing
- Continue processing remaining lines even if one line fails
- Count successful and failed lines
- Display summary at end

**Example Output:**
```
=== Processing File ===
Processing line 1: "123" - Success
Processing line 2: "456" - Success
Processing line 3: "abc" - Failed: Invalid number format
Processing line 4: "789" - Success
Processing line 5: "xyz" - Failed: Invalid number format

=== Summary ===
Total lines: 5
Successful: 3
Failed: 2
```

**Hint:** Inner try-catch handles line errors, outer try-catch handles file errors.

---

## 🎓 Key Takeaways

1. **Exceptions** disrupt normal program flow
2. **try-catch** blocks handle exceptions gracefully
3. **Multiple catch blocks** handle different exception types
4. **finally** block always executes (cleanup code)
5. **try-with-resources** automatically closes resources
6. **throw** keyword manually throws exceptions
7. **Specific exceptions** should be caught before general ones

---

## 📝 Summary

Today you learned:
- ✅ What exceptions are and why they occur
- ✅ Using try-catch blocks for exception handling
- ✅ Multiple catch blocks for different exceptions
- ✅ Finally block for cleanup code
- ✅ Try-with-resources for automatic resource management
- ✅ Throwing exceptions with throw keyword

---

## ⚠️ Common Mistakes

### 1. Try-Catch Basic Mistakes

#### ❌ Wrong - Empty Catch Block:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            // Empty catch - swallows exception silently!
        }
    }
}
```
**Issue:** Empty catch block hides errors; makes debugging impossible

#### ✅ Right:
```java
// CORRECT - Handle exception properly
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.err.println("Error: Cannot divide by zero");
            e.printStackTrace();  // Log for debugging

            // OR log properly
            // logger.error("Division by zero error", e);
        }
    }
}
```

**Why:** Always handle exceptions meaningfully; at minimum, log the error.

**💡 Tip:** Never leave catch blocks empty; always log, handle, or rethrow.

---

#### ❌ Wrong - Catching Exception Too Broadly:
```java
// WRONG - Catches everything, including programming errors
public class Main {
    public static void main(String[] args) {
        try {
            String str = null;
            System.out.println(str.length());  // NullPointerException
        } catch (Exception e) {  // Too broad!
            System.out.println("Something went wrong");
            // Can't tell what actually happened
        }
    }
}
```
**Issue:** Catching generic Exception masks specific problems; harder to debug

#### ✅ Right:
```java
// CORRECT - Catch specific exceptions
public class Main {
    public static void main(String[] args) {
        try {
            String str = null;
            System.out.println(str.length());
        } catch (NullPointerException e) {  // Specific exception
            System.out.println("String is null");
            e.printStackTrace();
        }
    }
}
```

**Why:** Specific exceptions enable targeted handling and better error messages.

**💡 Tip:** Catch the most specific exception possible; use Exception only as last resort.

---

#### ❌ Wrong - Not Using Exception Information:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array error");  // Generic message, no details
        }
    }
}
```
**Issue:** Doesn't use exception object's information; loses valuable debugging details

#### ✅ Right:
```java
// CORRECT - Use exception information
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: " + e.getMessage());  // Specific message
            System.out.println("Exception: " + e.toString());  // Full info
            e.printStackTrace();  // Stack trace for debugging
        }
    }
}
```

**Why:** Exception object contains valuable debugging information: message, type, stack trace.

**💡 Tip:** Use `getMessage()`, `toString()`, or `printStackTrace()` for debugging.

---

#### ❌ Wrong - Try Block Without Catch or Finally:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {  // Compilation error! Must have catch or finally
            int result = 10 / 0;
        }
        System.out.println("After try");
    }
}
```
**Issue:** Try block must be followed by catch, finally, or both

#### ✅ Right:
```java
// CORRECT - Try with catch
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // OR try with finally
        try {
            int result = 10 / 5;
        } finally {
            System.out.println("Cleanup");
        }

        // OR try with both
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Cleanup");
        }
    }
}
```

**Why:** Try must be paired with catch (to handle) or finally (to cleanup) or both.

**💡 Tip:** Try + (catch | finally | catch+finally) is the valid syntax.

---

### 2. Multiple Catch Block Mistakes

#### ❌ Wrong - Unreachable Catch Block:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (Exception e) {  // Catches everything first
            System.out.println("General exception");
        } catch (ArrayIndexOutOfBoundsException e) {  // Compilation error! Unreachable
            System.out.println("Array error");
        }
    }
}
```
**Issue:** General exception catches all subclasses; specific catch becomes unreachable

#### ✅ Right:
```java
// CORRECT - Specific exceptions first, general last
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {  // Specific first
            System.out.println("Array index error: " + e.getMessage());
        } catch (RuntimeException e) {  // Less specific
            System.out.println("Runtime error: " + e.getMessage());
        } catch (Exception e) {  // Most general last
            System.out.println("General error: " + e.getMessage());
        }
    }
}
```

**Why:** Exception hierarchy: child exceptions must be caught before parent exceptions.

**💡 Tip:** Order catch blocks from most specific to most general.

---

#### ❌ Wrong - Duplicate Catch Blocks:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("First catch");
        } catch (ArithmeticException e) {  // Compilation error! Duplicate
            System.out.println("Second catch");
        }
    }
}
```
**Issue:** Cannot have multiple catch blocks for same exception type

#### ✅ Right:
```java
// CORRECT - Catch each exception type once
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic error: " + e.getMessage());
            // Handle all arithmetic exceptions here
        }
    }
}
```

**Why:** Each exception type can only be caught once per try block.

**💡 Tip:** Consolidate handling logic for same exception type in one catch block.

---

#### ❌ Wrong - Not Handling All Possible Exceptions:
```java
// WRONG
public class Main {
    public static void processData(String str) {
        try {
            int num = Integer.parseInt(str);  // NumberFormatException
            int result = 100 / num;           // ArithmeticException
            System.out.println(result);
        } catch (ArithmeticException e) {  // Only handles one type!
            System.out.println("Division error");
        }
        // NumberFormatException not caught!
    }

    public static void main(String[] args) {
        processData("abc");  // Crashes with NumberFormatException!
    }
}
```
**Issue:** Code can throw multiple exception types; only one is caught

#### ✅ Right:
```java
// CORRECT - Handle all possible exceptions
public class Main {
    public static void processData(String str) {
        try {
            int num = Integer.parseInt(str);
            int result = 100 / num;
            System.out.println(result);
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + str);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }

    public static void main(String[] args) {
        processData("abc");   // Handles NumberFormatException
        processData("0");     // Handles ArithmeticException
    }
}
```

**Why:** Must handle all checked exceptions and foreseeable unchecked exceptions.

**💡 Tip:** Analyze code to identify all possible exception types; handle each.

---

### 3. Catch Block Order Mistakes

#### ❌ Wrong - Child Exception After Parent:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            System.out.println(arr[10]);
        } catch (RuntimeException e) {  // Parent first
            System.out.println("Runtime exception");
        } catch (ArrayIndexOutOfBoundsException e) {  // Compilation error! Child after parent
            System.out.println("Array error");
        }
    }
}
```
**Issue:** Parent exception catches child; subsequent child catch becomes unreachable

#### ✅ Right:
```java
// CORRECT - Child exceptions before parent
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException e) {  // Child first
            System.out.println("Array index error");
        } catch (RuntimeException e) {  // Parent after
            System.out.println("Other runtime error");
        } catch (Exception e) {  // Most general last
            System.out.println("General error");
        }
    }
}
```

**Why:** Exception hierarchy: ArrayIndexOutOfBoundsException → RuntimeException → Exception.

**💡 Tip:** Know exception hierarchy; always catch child before parent.

---

#### ❌ Wrong - Sibling Exceptions in Wrong Context:
```java
// WRONG expectation
public class Main {
    public static void main(String[] args) {
        try {
            String str = "123abc";
            int num = Integer.parseInt(str);  // NumberFormatException
        } catch (ArithmeticException e) {  // Won't catch NumberFormatException!
            System.out.println("Error");
        }
        // Program crashes because NumberFormatException not caught
    }
}
```
**Issue:** ArithmeticException and NumberFormatException are siblings; one doesn't catch the other

#### ✅ Right:
```java
// CORRECT - Catch the actual exception type
public class Main {
    public static void main(String[] args) {
        try {
            String str = "123abc";
            int num = Integer.parseInt(str);
        } catch (NumberFormatException e) {  // Correct exception type
            System.out.println("Invalid number format: " + e.getMessage());
        }

        // OR catch common parent if both could occur
        try {
            String str = "123";
            int num = Integer.parseInt(str);
            int result = 10 / 0;  // Could throw ArithmeticException
        } catch (RuntimeException e) {  // Catches both NumberFormatException and ArithmeticException
            System.out.println("Runtime error: " + e.getMessage());
        }
    }
}
```

**Why:** Sibling exceptions are independent; need common parent or individual catches.

**💡 Tip:** Understand exception hierarchy tree; siblings don't catch each other.

---

### 4. Finally Block Mistakes

#### ❌ Wrong - Return in Finally Overrides Try Return:
```java
// WRONG - Confusing behavior
public class Main {
    public static int getValue() {
        try {
            return 1;  // This return value is discarded!
        } finally {
            return 2;  // Finally return overrides try return
        }
    }

    public static void main(String[] args) {
        System.out.println(getValue());  // Prints 2, not 1
    }
}
```
**Issue:** Return in finally block overrides return from try/catch; confusing and bad practice

#### ✅ Right:
```java
// CORRECT - Avoid return in finally
public class Main {
    public static int getValue() {
        int result = 0;
        try {
            result = 1;
        } finally {
            // Cleanup only, no return
            System.out.println("Cleanup");
        }
        return result;  // Return after try-catch-finally
    }

    public static void main(String[] args) {
        System.out.println(getValue());  // Prints 1 (clear)
    }
}
```

**Why:** Finally should be for cleanup only; returning from finally is confusing.

**💡 Tip:** Never use return, break, or continue in finally block.

---

#### ❌ Wrong - Exception in Finally Masks Original Exception:
```java
// WRONG
public class Main {
    public static void process() {
        try {
            throw new RuntimeException("Original exception");
        } finally {
            throw new RuntimeException("Finally exception");  // Masks original!
        }
    }

    public static void main(String[] args) {
        try {
            process();
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());  // Prints "Finally exception"
            // Original exception is lost!
        }
    }
}
```
**Issue:** Exception thrown in finally block masks exception from try block

#### ✅ Right:
```java
// CORRECT - Avoid throwing exceptions in finally
public class Main {
    public static void process() {
        try {
            throw new RuntimeException("Original exception");
        } finally {
            // Cleanup that doesn't throw exceptions
            try {
                // Risky cleanup code
            } catch (Exception e) {
                // Log but don't rethrow
                System.err.println("Cleanup error: " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        try {
            process();
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());  // Prints "Original exception"
        }
    }
}
```

**Why:** Finally exceptions mask try/catch exceptions; original error is lost.

**💡 Tip:** Wrap risky finally code in try-catch; log but don't rethrow.

---

#### ❌ Wrong - Assuming Finally Always Executes:
```java
// WRONG assumption
public class Main {
    public static void process() {
        try {
            System.out.println("Try block");
            System.exit(0);  // Terminates JVM immediately
        } finally {
            System.out.println("Finally");  // Never executes!
        }
    }

    public static void main(String[] args) {
        process();
    }
}
```
**Issue:** Finally doesn't execute if JVM exits (System.exit(), crash, infinite loop, etc.)

#### ✅ Right:
```java
// CORRECT - Understand finally limitations
public class Main {
    public static void process() {
        try {
            System.out.println("Try block");
            // Don't use System.exit() unless necessary
            return;  // Finally executes before return
        } finally {
            System.out.println("Finally");  // Executes
        }
    }

    public static void main(String[] args) {
        process();
        // If you must exit:
        // System.exit(0);  // Do this after finally blocks complete
    }
}
```

**Why:** Finally runs almost always, but not if JVM exits or infinite loop/deadlock occurs.

**💡 Tip:** Finally executes for return, break, continue, exceptions; not for System.exit().

---

#### ❌ Wrong - Not Checking Null Before Closing in Finally:
```java
// WRONG
import java.io.*;

public class Main {
    public static void readFile() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            reader.close();  // NullPointerException if file not found in try!
        }
    }
}
```
**Issue:** If exception occurs before reader is initialized, finally tries to close null

#### ✅ Right:
```java
// CORRECT - Check null before closing
import java.io.*;

public class Main {
    public static void readFile() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            if (reader != null) {  // Check null first
                try {
                    reader.close();
                } catch (IOException e) {
                    System.err.println("Error closing: " + e.getMessage());
                }
            }
        }
    }
}
```

**Why:** Resources may be null if initialization fails; must check before closing.

**💡 Tip:** Always null-check resources before closing in finally.

---

### 5. Try-With-Resources Mistakes

#### ❌ Wrong - Not Implementing AutoCloseable:
```java
// WRONG
class MyResource {  // Doesn't implement AutoCloseable
    public void use() {
        System.out.println("Using resource");
    }

    public void cleanup() {
        System.out.println("Cleanup");
    }
}

public class Main {
    public static void main(String[] args) {
        try (MyResource res = new MyResource()) {  // Compilation error!
            res.use();
        }
    }
}
```
**Issue:** Try-with-resources requires AutoCloseable or Closeable implementation

#### ✅ Right:
```java
// CORRECT - Implement AutoCloseable
class MyResource implements AutoCloseable {
    public void use() {
        System.out.println("Using resource");
    }

    @Override
    public void close() {  // Must implement close()
        System.out.println("Cleanup");
    }
}

public class Main {
    public static void main(String[] args) {
        try (MyResource res = new MyResource()) {  // OK
            res.use();
        }  // close() called automatically
    }
}
```

**Why:** Try-with-resources only works with AutoCloseable/Closeable resources.

**💡 Tip:** Implement AutoCloseable and override close() for custom resources.

---

#### ❌ Wrong - Trying to Access Resource After Try Block:
```java
// WRONG
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // reader.close();  // Compilation error! reader out of scope
    }
}
```
**Issue:** Resources declared in try-with-resources are scoped to try block only

#### ✅ Right:
```java
// CORRECT - Resource scope limited to try block
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
            // All resource usage must be inside try block
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader is automatically closed and out of scope here
    }
}
```

**Why:** Try-with-resources resources are scoped to try block; auto-closed at end.

**💡 Tip:** Complete all resource operations within try block; resource unavailable after.

---

#### ❌ Wrong - Manually Closing Try-With-Resources Resource:
```java
// WRONG - Redundant
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
            reader.close();  // Manual close - redundant and risky!
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader.close() called again automatically - double close!
    }
}
```
**Issue:** Try-with-resources automatically closes; manual close causes double-close

#### ✅ Right:
```java
// CORRECT - Let try-with-resources handle closing
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
            // Don't manually close - automatic
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader.close() called automatically here
    }
}
```

**Why:** Try-with-resources manages closing; manual close is redundant and error-prone.

**💡 Tip:** Never manually close resources in try-with-resources; automatic closing is the point.

---

#### ❌ Wrong - Wrong Syntax for Multiple Resources:
```java
// WRONG
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (
            BufferedReader reader = new BufferedReader(new FileReader("input.txt")),  // Comma
            BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))  // No comma after last
        ) {
            String line = reader.readLine();
            writer.write(line);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
**Issue:** Actually this is CORRECT! But students often forget semicolons or use wrong separators

#### ✅ Right:
```java
// CORRECT - Semicolons separate resources
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (
            BufferedReader reader = new BufferedReader(new FileReader("input.txt"));  // Semicolon
            BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))   // No semicolon after last
        ) {
            String line = reader.readLine();
            writer.write(line);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// OR (Java 9+) - use var
try (var reader = new BufferedReader(new FileReader("input.txt"));
     var writer = new BufferedWriter(new FileWriter("output.txt"))) {
    // ...
}
```

**Why:** Multiple resources separated by semicolons; last resource has no separator.

**💡 Tip:** Semicolons between resources; no semicolon after last resource.

---

### 6. Throw Keyword Mistakes

#### ❌ Wrong - Throwing Without Try-Catch or throws Declaration:
```java
// WRONG
public class Main {
    public static void checkAge(int age) {
        if (age < 18) {
            throw new Exception("Too young");  // Compilation error! Checked exception
        }
    }

    public static void main(String[] args) {
        checkAge(15);  // Compilation error!
    }
}
```
**Issue:** Checked exceptions must be caught or declared with throws

#### ✅ Right:
```java
// CORRECT - Catch or declare
public class Main {
    // Option 1: Declare with throws
    public static void checkAge(int age) throws Exception {
        if (age < 18) {
            throw new Exception("Too young");
        }
    }

    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    // Option 2: Use unchecked exception (no throws needed)
    public static void validateAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Too young");  // Unchecked
        }
    }
}
```

**Why:** Checked exceptions require handling; unchecked don't (but should be documented).

**💡 Tip:** Use unchecked exceptions (RuntimeException) for programming errors.

---

#### ❌ Wrong - Throwing Null:
```java
// WRONG
public class Main {
    public static void process(boolean flag) {
        if (flag) {
            throw null;  // NullPointerException at runtime!
        }
    }

    public static void main(String[] args) {
        try {
            process(true);
        } catch (Exception e) {
            System.out.println("Caught: " + e);  // NullPointerException
        }
    }
}
```
**Issue:** Throwing null causes NullPointerException; meaningless error

#### ✅ Right:
```java
// CORRECT - Throw proper exception object
public class Main {
    public static void process(boolean flag) {
        if (flag) {
            throw new IllegalStateException("Invalid state");  // Proper exception
        }
    }

    public static void main(String[] args) {
        try {
            process(true);
        } catch (IllegalStateException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}
```

**Why:** Exceptions must be proper exception objects; null is invalid.

**💡 Tip:** Always throw new exception instances with descriptive messages.

---

#### ❌ Wrong - Losing Exception Information When Rethrowing:
```java
// WRONG
public class Main {
    public static void method1() {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            throw new RuntimeException("Error occurred");  // Lost original exception!
        }
    }

    public static void main(String[] args) {
        try {
            method1();
        } catch (RuntimeException e) {
            e.printStackTrace();  // Stack trace doesn't show original ArithmeticException
        }
    }
}
```
**Issue:** Creating new exception without cause loses original exception details

#### ✅ Right:
```java
// CORRECT - Preserve original exception
public class Main {
    public static void method1() {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            // Option 1: Rethrow original
            throw e;

            // Option 2: Wrap with cause
            // throw new RuntimeException("Error in method1", e);  // Preserves original
        }
    }

    public static void main(String[] args) {
        try {
            method1();
        } catch (RuntimeException e) {
            e.printStackTrace();  // Full stack trace with original exception
            Throwable cause = e.getCause();  // Can access original exception
        }
    }
}
```

**Why:** Preserving exception chain helps debugging; shows full error context.

**💡 Tip:** When wrapping exceptions, always pass original as cause parameter.

---

#### ❌ Wrong - Throwing Generic Exception:
```java
// WRONG - Too generic
public class Main {
    public static void processAge(int age) {
        if (age < 0) {
            throw new Exception("Invalid age");  // Too generic
        }
    }
}
```
**Issue:** Generic Exception provides no semantic meaning; harder to catch specifically

#### ✅ Right:
```java
// CORRECT - Use specific exception
public class Main {
    public static void processAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
    }

    // OR create custom exception for domain
    public static void validateUser(User user) {
        if (user.getAge() < 18) {
            throw new InvalidUserException("User must be 18 or older");
        }
    }
}

class InvalidUserException extends RuntimeException {
    public InvalidUserException(String message) {
        super(message);
    }
}
```

**Why:** Specific exceptions enable targeted handling and clearer semantics.

**💡 Tip:** Use most specific exception type; create custom exceptions for domain logic.

---

### 7. Exception Object Usage Mistakes

#### ❌ Wrong - Not Using getMessage():
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException("Invalid argument provided");
        } catch (IllegalArgumentException e) {
            System.out.println("Error occurred");  // Generic message, loses details
        }
    }
}
```
**Issue:** Doesn't use exception's specific message; loses valuable error details

#### ✅ Right:
```java
// CORRECT - Use exception information
public class Main {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException("Invalid argument provided");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());  // Specific message
            System.out.println("Type: " + e.getClass().getName());
            e.printStackTrace();  // Full stack trace
        }
    }
}
```

**Why:** Exception object contains detailed error information; use it for debugging.

**💡 Tip:** Use getMessage(), getClass(), printStackTrace() to extract exception details.

---

#### ❌ Wrong - Printing Exception Object Directly:
```java
// WRONG (poor practice)
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println(e);  // Prints toString() - not detailed enough
        }
    }
}
```
**Issue:** Printing exception directly gives basic info; misses stack trace

#### ✅ Right:
```java
// CORRECT - Use appropriate method
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            // For user-facing message
            System.out.println("Error: " + e.getMessage());

            // For debugging/logging
            e.printStackTrace();

            // OR use logger
            // logger.error("Arithmetic error", e);
        }
    }
}
```

**Why:** printStackTrace() provides full debugging info; getMessage() for user messages.

**💡 Tip:** Use getMessage() for users, printStackTrace() for developers/logs.

---

### 8. Resource Management Mistakes

#### ❌ Wrong - Not Closing Resources in Finally:
```java
// WRONG
import java.io.*;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = new BufferedReader(new FileReader("file.txt"));
        try {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader never closed - resource leak!
    }
}
```
**Issue:** Resources not closed; causes resource leaks and potential system issues

#### ✅ Right:
```java
// CORRECT - Close in finally or use try-with-resources
import java.io.*;

public class Main {
    // Option 1: Finally block
    public static void method1() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("file.txt"));
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    System.err.println("Error closing: " + e);
                }
            }
        }
    }

    // Option 2: Try-with-resources (preferred)
    public static void method2() {
        try (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Unclosed resources waste system resources and can cause failures.

**💡 Tip:** Always close resources; use try-with-resources for automatic management.

---

#### ❌ Wrong - Closing Resources in Wrong Order:
```java
// WRONG
import java.io.*;

public class Main {
    public static void main(String[] args) {
        FileInputStream fis = null;
        BufferedInputStream bis = null;
        try {
            fis = new FileInputStream("file.txt");
            bis = new BufferedInputStream(fis);
            // ... use bis
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fis.close();  // Close base first - WRONG!
                bis.close();  // May fail if fis already closed
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
**Issue:** Closing base stream before wrapper can cause issues

#### ✅ Right:
```java
// CORRECT - Close in reverse order (wrapper first)
import java.io.*;

public class Main {
    public static void main(String[] args) {
        FileInputStream fis = null;
        BufferedInputStream bis = null;
        try {
            fis = new FileInputStream("file.txt");
            bis = new BufferedInputStream(fis);
            // ... use bis
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bis != null) bis.close();  // Close wrapper first
                // fis.close() not needed - bis.close() closes underlying stream
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // OR use try-with-resources (handles order automatically)
        try (FileInputStream fis2 = new FileInputStream("file.txt");
             BufferedInputStream bis2 = new BufferedInputStream(fis2)) {
            // ... use bis2
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Why:** Wrapper streams close underlying streams; close in reverse construction order.

**💡 Tip:** Close wrappers first (they close underlying); or use try-with-resources.

---

### 9. Exception Handling Flow Mistakes

#### ❌ Wrong - Code After throw:
```java
// WRONG
public class Main {
    public static void process(int value) {
        if (value < 0) {
            throw new IllegalArgumentException("Negative value");
            System.out.println("After throw");  // Unreachable code - compilation error!
        }
    }
}
```
**Issue:** Code after throw is unreachable; won't compile

#### ✅ Right:
```java
// CORRECT - No code after throw
public class Main {
    public static void process(int value) {
        if (value < 0) {
            throw new IllegalArgumentException("Negative value");
        }
        System.out.println("Valid value: " + value);  // After if block - OK
    }
}
```

**Why:** throw terminates method execution; subsequent code unreachable.

**💡 Tip:** throw acts like return; no code after it in same block.

---

#### ❌ Wrong - Exception Handling Changes Program Logic:
```java
// WRONG - Using exceptions for control flow
public class Main {
    public static int findIndex(int[] arr, int target) {
        try {
            for (int i = 0; i < arr.length; i++) {
                if (arr[i] == target) {
                    throw new Exception();  // Using exception for control flow!
                }
            }
            return -1;
        } catch (Exception e) {
            return i;  // Wrong: i out of scope
        }
    }
}
```
**Issue:** Using exceptions for control flow is expensive and confusing

#### ✅ Right:
```java
// CORRECT - Use normal control flow
public class Main {
    public static int findIndex(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;  // Normal return
            }
        }
        return -1;  // Not found
    }
}
```

**Why:** Exceptions for exceptional conditions only; not for normal control flow.

**💡 Tip:** Exceptions are expensive; use return, break, continue for normal flow.

---

#### ❌ Wrong - Not Handling Exception at Right Level:
```java
// WRONG - Handle too high
public class Main {
    public static void main(String[] args) {
        try {
            processUsers();
            generateReport();
            sendEmails();
        } catch (Exception e) {  // Catches all exceptions from all methods
            System.out.println("Error");  // Can't tell which method failed
        }
    }
}
```
**Issue:** Handling exceptions too high up loses context; can't take specific action

#### ✅ Right:
```java
// CORRECT - Handle at appropriate level
public class Main {
    public static void main(String[] args) {
        // Handle each operation separately for specific recovery
        try {
            processUsers();
        } catch (UserException e) {
            System.out.println("User processing failed: " + e.getMessage());
            // Specific recovery for user errors
        }

        try {
            generateReport();
        } catch (ReportException e) {
            System.out.println("Report generation failed: " + e.getMessage());
            // Specific recovery for report errors
        }

        try {
            sendEmails();
        } catch (EmailException e) {
            System.out.println("Email sending failed: " + e.getMessage());
            // Specific recovery for email errors
        }
    }
}
```

**Why:** Handle exceptions where you have enough context for recovery.

**💡 Tip:** Catch exceptions at the level where you can meaningfully handle them.

---

### 10. Multi-Catch Mistakes

#### ❌ Wrong - Using Multi-Catch with Related Exceptions:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int[] arr = new int[5];
            System.out.println(arr[10]);
        } catch (ArrayIndexOutOfBoundsException | Exception e) {  // Compilation error!
            // Exception is parent of ArrayIndexOutOfBoundsException
        }
    }
}
```
**Issue:** Multi-catch cannot have parent-child relationship; redundant

#### ✅ Right:
```java
// CORRECT - Multi-catch with unrelated exceptions
public class Main {
    public static void main(String[] args) {
        try {
            String str = args[0];
            int num = Integer.parseInt(str);
            int result = 100 / num;
        } catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {
            // Both are RuntimeException siblings - OK
            System.out.println("Input error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Math error: " + e.getMessage());
        }
    }
}
```

**Why:** Multi-catch for independent exceptions with same handling; not parent-child.

**💡 Tip:** Use multi-catch for sibling exceptions with identical handling logic.

---

#### ❌ Wrong - Modifying Multi-Catch Exception Parameter:
```java
// WRONG
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException | NullPointerException e) {
            e = new RuntimeException();  // Compilation error! Implicitly final
            throw e;
        }
    }
}
```
**Issue:** Multi-catch exception parameter is implicitly final; cannot reassign

#### ✅ Right:
```java
// CORRECT - Don't reassign multi-catch parameter
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException | NullPointerException e) {
            // Use e directly; don't reassign
            System.out.println("Error: " + e.getMessage());
            throw e;  // Rethrow original - OK

            // If you need to wrap:
            // throw new RuntimeException("Wrapped error", e);
        }
    }
}
```

**Why:** Multi-catch parameters are final to prevent type confusion.

**💡 Tip:** Multi-catch exception parameters cannot be reassigned; use as-is.

---

#### ❌ Wrong - Overusing Multi-Catch:
```java
// WRONG - Different handling needed
public class Main {
    public static void main(String[] args) {
        try {
            String str = args[0];
            int num = Integer.parseInt(str);
            int[] arr = {1, 2, 3};
            System.out.println(arr[num]);
        } catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {
            // Problem: These need different messages/handling
            System.out.println("Error: " + e.getMessage());  // Generic
        }
    }
}
```
**Issue:** Using multi-catch when exceptions need different handling

#### ✅ Right:
```java
// CORRECT - Separate catches for different handling
public class Main {
    public static void main(String[] args) {
        try {
            String str = args[0];
            int num = Integer.parseInt(str);
            int[] arr = {1, 2, 3};
            System.out.println(arr[num]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid array index: " + e.getMessage());
            // Specific recovery: use default index
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + e.getMessage());
            // Specific recovery: use default number
        }
    }
}
```

**Why:** Use multi-catch only when handling logic is identical for all exception types.

**💡 Tip:** Multi-catch for same handling; separate catches for different handling.

---

This comprehensive list contains **40+ Exception Handling Part 1 mistakes** covering all fundamental concepts!

---

## 🔗 What's Next?

Tomorrow (Day 18), we'll learn about:
- throws keyword
- Checked vs unchecked exceptions
- Creating custom exceptions
- Exception hierarchy
- Best practices for exception handling

---

## 📚 Additional Resources

- [Oracle Exception Handling Tutorial](https://docs.oracle.com/javase/tutorial/essential/exceptions/)
- [Java Exception Hierarchy](https://www.geeksforgeeks.org/exceptions-in-java/)
- Practice exception handling on HackerRank