# Day 22: File I/O Basics

**Week 4: Advanced Java Concepts**

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

By the end of Day 22, you will be able to:
- Understand the File class and its methods
- Read data from files using FileReader and BufferedReader
- Write data to files using FileWriter and BufferedWriter
- Handle file-related exceptions properly
- Perform basic file operations (create, delete, check existence)
- Use try-with-resources for automatic resource management

---

## 📚 Topics Covered

### 1. Introduction to File I/O

File I/O (Input/Output) allows Java programs to read from and write to files on the file system.

#### Why File I/O is Important:
- **Data Persistence**: Store data permanently
- **Configuration**: Read application settings
- **Logging**: Write application logs
- **Data Exchange**: Share data between applications
- **Batch Processing**: Process large datasets

#### Java I/O Package:
```java
import java.io.*;  // Contains all I/O classes
```

---

### 2. The File Class

The `File` class represents file and directory pathnames in an abstract manner.

#### Creating File Objects:

```java
import java.io.File;

public class FileExample {
    public static void main(String[] args) {
        // Create File object for a file
        File file1 = new File("data.txt");
        
        // Create File object with path
        File file2 = new File("C:\\Users\\Documents\\data.txt");
        
        // Create File object for a directory
        File dir = new File("myFolder");
        
        // Create File object with parent and child
        File file3 = new File("myFolder", "data.txt");
    }
}
```

#### Common File Methods:

```java
import java.io.File;
import java.io.IOException;

public class FileMethods {
    public static void main(String[] args) throws IOException {
        File file = new File("example.txt");
        
        // Check if file exists
        if (file.exists()) {
            System.out.println("File exists!");
        }
        
        // Create new file
        if (file.createNewFile()) {
            System.out.println("File created successfully");
        }
        
        // Get file information
        System.out.println("File name: " + file.getName());
        System.out.println("Absolute path: " + file.getAbsolutePath());
        System.out.println("File size: " + file.length() + " bytes");
        System.out.println("Can read: " + file.canRead());
        System.out.println("Can write: " + file.canWrite());
        System.out.println("Is directory: " + file.isDirectory());
        System.out.println("Is file: " + file.isFile());
        
        // Delete file
        if (file.delete()) {
            System.out.println("File deleted successfully");
        }
    }
}
```

---

### 3. Reading Files

#### Using FileReader:

```java
import java.io.FileReader;
import java.io.IOException;

public class FileReaderExample {
    public static void main(String[] args) {
        try {
            FileReader reader = new FileReader("input.txt");
            int character;
            
            // Read character by character
            while ((character = reader.read()) != -1) {
                System.out.print((char) character);
            }
            
            reader.close();
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
```

#### Using BufferedReader (More Efficient):

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class BufferedReaderExample {
    public static void main(String[] args) {
        try {
            BufferedReader reader = new BufferedReader(
                new FileReader("input.txt")
            );
            
            String line;
            // Read line by line
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            reader.close();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Try-With-Resources (Recommended):

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TryWithResourcesExample {
    public static void main(String[] args) {
        // Automatically closes resources
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 4. Writing Files

#### Using FileWriter:

```java
import java.io.FileWriter;
import java.io.IOException;

public class FileWriterExample {
    public static void main(String[] args) {
        try {
            FileWriter writer = new FileWriter("output.txt");
            
            writer.write("Hello, World!\n");
            writer.write("This is a new line.\n");
            
            writer.close();
            System.out.println("File written successfully");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Append Mode:

```java
import java.io.FileWriter;
import java.io.IOException;

public class AppendExample {
    public static void main(String[] args) {
        try {
            // true parameter enables append mode
            FileWriter writer = new FileWriter("output.txt", true);
            
            writer.write("This line is appended.\n");
            
            writer.close();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Using BufferedWriter (More Efficient):

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferedWriterExample {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("output.txt"))) {
            
            writer.write("Line 1");
            writer.newLine();  // Platform-independent newline
            writer.write("Line 2");
            writer.newLine();
            writer.write("Line 3");
            
            System.out.println("File written successfully");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 5. Directory Operations

#### Creating Directories:

```java
import java.io.File;

public class DirectoryExample {
    public static void main(String[] args) {
        File dir = new File("myFolder");
        
        // Create single directory
        if (dir.mkdir()) {
            System.out.println("Directory created");
        }
        
        // Create directory with parent directories
        File nestedDir = new File("parent/child/grandchild");
        if (nestedDir.mkdirs()) {
            System.out.println("Nested directories created");
        }
    }
}
```

#### Listing Directory Contents:

```java
import java.io.File;

public class ListFiles {
    public static void main(String[] args) {
        File dir = new File(".");
        
        // List file names
        String[] files = dir.list();
        System.out.println("Files in current directory:");
        for (String file : files) {
            System.out.println(file);
        }
        
        // List File objects
        File[] fileObjects = dir.listFiles();
        System.out.println("\nDetailed file information:");
        for (File file : fileObjects) {
            if (file.isDirectory()) {
                System.out.println("[DIR] " + file.getName());
            } else {
                System.out.println("[FILE] " + file.getName() + 
                    " (" + file.length() + " bytes)");
            }
        }
    }
}
```

---

### 6. Exception Handling in File I/O

#### Common Exceptions:

```java
import java.io.*;

public class FileExceptionHandling {
    public static void main(String[] args) {
        try {
            // FileNotFoundException - file doesn't exist
            FileReader reader = new FileReader("nonexistent.txt");
            
            // IOException - general I/O error
            int data = reader.read();
            
            reader.close();
            
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        }
    }
}
```

#### Best Practice with Try-With-Resources:

```java
import java.io.*;

public class BestPracticeExample {
    public static void main(String[] args) {
        String inputFile = "input.txt";
        String outputFile = "output.txt";
        
        try (BufferedReader reader = new BufferedReader(
                new FileReader(inputFile));
             BufferedWriter writer = new BufferedWriter(
                new FileWriter(outputFile))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line.toUpperCase());
                writer.newLine();
            }
            
            System.out.println("File processed successfully");
            
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error processing file: " + e.getMessage());
        }
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: Create and Write to File
Write a program that creates a file and writes your name and age to it.

```java
import java.io.*;

public class Exercise1 {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("myinfo.txt"))) {
            
            writer.write("Name: John Doe");
            writer.newLine();
            writer.write("Age: 25");
            
            System.out.println("Information saved to file");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 2: Read and Display File
Read the file created in Exercise 1 and display its contents.

```java
import java.io.*;

public class Exercise2 {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("myinfo.txt"))) {
            
            String line;
            System.out.println("File contents:");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 3: Copy File
Create a program that copies content from one file to another.

```java
import java.io.*;

public class Exercise3 {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("source.txt"));
             BufferedWriter writer = new BufferedWriter(
                new FileWriter("destination.txt"))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();
            }
            
            System.out.println("File copied successfully");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 4: Count Lines in File
Write a program that counts the number of lines in a file.

```java
import java.io.*;

public class Exercise4 {
    public static void main(String[] args) {
        int lineCount = 0;
        
        try (BufferedReader reader = new BufferedReader(
                new FileReader("data.txt"))) {
            
            while (reader.readLine() != null) {
                lineCount++;
            }
            
            System.out.println("Number of lines: " + lineCount);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 5: File Information
Create a program that displays detailed information about a file.

```java
import java.io.File;

public class Exercise5 {
    public static void main(String[] args) {
        File file = new File("data.txt");
        
        if (file.exists()) {
            System.out.println("=== File Information ===");
            System.out.println("Name: " + file.getName());
            System.out.println("Path: " + file.getAbsolutePath());
            System.out.println("Size: " + file.length() + " bytes");
            System.out.println("Readable: " + file.canRead());
            System.out.println("Writable: " + file.canWrite());
            System.out.println("Is Directory: " + file.isDirectory());
            System.out.println("Is File: " + file.isFile());
        } else {
            System.out.println("File does not exist");
        }
    }
}
```

---

### Exercise 6: Append to File
Write a program that appends new lines to an existing file.

```java
import java.io.*;

public class Exercise6 {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("log.txt", true))) {
            
            writer.write("New log entry: " + 
                java.time.LocalDateTime.now());
            writer.newLine();
            
            System.out.println("Log entry added");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 7: Search in File
Create a program that searches for a specific word in a file.

```java
import java.io.*;

public class Exercise7 {
    public static void main(String[] args) {
        String searchWord = "Java";
        int count = 0;
        
        try (BufferedReader reader = new BufferedReader(
                new FileReader("document.txt"))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains(searchWord)) {
                    count++;
                    System.out.println("Found: " + line);
                }
            }
            
            System.out.println("\nTotal occurrences: " + count);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 8: List Directory Contents
Write a program that lists all files in a directory.

```java
import java.io.File;

public class Exercise8 {
    public static void main(String[] args) {
        File dir = new File(".");
        
        if (dir.isDirectory()) {
            File[] files = dir.listFiles();
            
            System.out.println("Contents of " + dir.getAbsolutePath());
            for (File file : files) {
                String type = file.isDirectory() ? "[DIR]" : "[FILE]";
                System.out.println(type + " " + file.getName());
            }
        }
    }
}
```

---

### Exercise 9: Create Directory Structure
Create a program that creates a nested directory structure.

```java
import java.io.File;

public class Exercise9 {
    public static void main(String[] args) {
        File dir = new File("project/src/main/java");
        
        if (dir.mkdirs()) {
            System.out.println("Directory structure created");
        } else {
            System.out.println("Failed to create directories");
        }
    }
}
```

---

### Exercise 10: Student Records
Create a program that writes student records to a file and reads them back.

```java
import java.io.*;

public class Exercise10 {
    public static void main(String[] args) {
        // Write student records
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("students.txt"))) {
            
            writer.write("ID,Name,Grade");
            writer.newLine();
            writer.write("1,Alice,A");
            writer.newLine();
            writer.write("2,Bob,B");
            writer.newLine();
            writer.write("3,Charlie,A");
            
            System.out.println("Records written");
            
        } catch (IOException e) {
            System.out.println("Error writing: " + e.getMessage());
        }
        
        // Read student records
        try (BufferedReader reader = new BufferedReader(
                new FileReader("students.txt"))) {
            
            String line;
            System.out.println("\nStudent Records:");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
        } catch (IOException e) {
            System.out.println("Error reading: " + e.getMessage());
        }
    }
}
```

---

## 🔑 Key Takeaways

1. **File Class**: Represents files and directories, provides methods for file operations
2. **FileReader/FileWriter**: Basic classes for reading/writing character files
3. **BufferedReader/BufferedWriter**: Efficient reading/writing with buffering
4. **Try-With-Resources**: Automatically closes resources, prevents resource leaks
5. **Exception Handling**: Always handle IOException and FileNotFoundException
6. **File Operations**: Create, delete, check existence, get information
7. **Directory Operations**: Create directories, list contents
8. **Best Practice**: Use BufferedReader/Writer with try-with-resources

---

## 📖 Additional Resources

### Official Documentation:
- [Java File I/O Tutorial](https://docs.oracle.com/javase/tutorial/essential/io/)
- [File Class Documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/File.html)
- [BufferedReader Documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/BufferedReader.html)

### Practice Platforms:
- [HackerRank Java](https://www.hackerrank.com/domains/java)
- [LeetCode](https://leetcode.com/)

### Video Tutorials:
- Search for "Java File I/O Tutorial" on YouTube
- Look for "Java BufferedReader BufferedWriter" tutorials

---

## 🧭 Navigation

### Week 4 Progress:
- **Day 22: File I/O Basics** ← You are here
- [Day 23: File Operations & NIO](day23_file_operations.md)
- [Day 24: Serialization](day24_serialization.md)
- [Day 25: Multithreading Basics](day25_multithreading_basics.md)
- [Day 26: Thread Synchronization](day26_thread_synchronization.md)
- [Day 27: Lambda Expressions](day27_lambda_expressions.md)
- [Day 28: Stream API](day28_stream_api.md)
- [Day 29: Date & Time API](day29_date_time_api.md)
- [Day 30: Final Review & Project](day30_final_review.md)

### Related Resources:
- [📝 Day 22 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day22.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 22 Checklist

Before moving to Day 23, ensure you can:
- [ ] Create File objects and use File class methods
- [ ] Read files using FileReader and BufferedReader
- [ ] Write files using FileWriter and BufferedWriter
- [ ] Use try-with-resources for resource management
- [ ] Handle file-related exceptions properly
- [ ] Perform basic file operations (create, delete, check)
- [ ] Work with directories (create, list contents)
- [ ] Understand the difference between FileReader and BufferedReader
- [ ] Append data to existing files
- [ ] Copy content from one file to another

---

## ⚠️ Common Mistakes

### 1. File Class Mistakes

#### ❌ Wrong - Not Checking if File Exists Before Operations:
```java
// WRONG - Attempting operations without checking existence
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        File file = new File("data.txt");

        // Assuming file exists
        System.out.println("File size: " + file.length());  // Returns 0 if doesn't exist

        FileReader reader = new FileReader(file);  // FileNotFoundException if doesn't exist!
    }
}
```
**Issue:** Not checking existence before operations; causes exceptions or incorrect results

#### ✅ Right:
```java
// CORRECT - Check existence first
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file = new File("data.txt");

        if (file.exists()) {
            System.out.println("File size: " + file.length() + " bytes");

            try (FileReader reader = new FileReader(file)) {
                // Process file
            } catch (IOException e) {
                System.out.println("Error reading file: " + e.getMessage());
            }
        } else {
            System.out.println("File does not exist");
        }
    }
}
```

**Why:** Checking existence prevents FileNotFoundException and provides better error handling.

**💡 Tip:** Always check `file.exists()` before operations that require the file to exist.

---

#### ❌ Wrong - Using Wrong Path Separator:
```java
// WRONG - Hardcoded platform-specific separator
import java.io.File;

public class Main {
    public static void main(String[] args) {
        // Fails on Unix/Linux (uses / not \)
        File file = new File("C:\\Users\\Documents\\data.txt");

        String path = "folder\\subfolder\\file.txt";  // Windows-only
    }
}
```
**Issue:** Hardcoded backslashes only work on Windows; fails on Unix/Linux/Mac

#### ✅ Right:
```java
// CORRECT - Use platform-independent separators
import java.io.File;

public class Main {
    public static void main(String[] args) {
        // Option 1: Use File.separator
        String path1 = "folder" + File.separator + "subfolder" +
                      File.separator + "file.txt";
        File file1 = new File(path1);

        // Option 2: Use forward slashes (works on all platforms)
        File file2 = new File("folder/subfolder/file.txt");

        // Option 3: Use File constructor with parent and child
        File parent = new File("folder/subfolder");
        File file3 = new File(parent, "file.txt");

        System.out.println("Platform separator: " + File.separator);
    }
}
```

**Why:** Forward slashes work on all platforms; `File.separator` ensures platform independence.

**💡 Tip:** Use `/` in paths (works everywhere) or `File.separator` for platform independence.

---

#### ❌ Wrong - Confusing createNewFile() Behavior:
```java
// WRONG - Not understanding createNewFile return value
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        File file = new File("test.txt");

        file.createNewFile();  // Ignoring return value
        file.createNewFile();  // Creates file twice? NO!

        // Student expects file to be created even if it exists
    }
}
```
**Issue:** Not checking return value; doesn't understand that it won't overwrite existing file

#### ✅ Right:
```java
// CORRECT - Check createNewFile return value
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file = new File("test.txt");

        try {
            if (file.createNewFile()) {
                System.out.println("File created successfully");
            } else {
                System.out.println("File already exists");
            }
        } catch (IOException e) {
            System.out.println("Error creating file: " + e.getMessage());
        }

        // createNewFile() returns:
        // - true: file created
        // - false: file already exists
        // - throws IOException: permission denied, disk full, etc.
    }
}
```

**Why:** `createNewFile()` returns false if file exists; doesn't overwrite.

**💡 Tip:** Check return value: `true` = created, `false` = already exists.

---

#### ❌ Wrong - Using File for File Content Operations:
```java
// WRONG - Trying to read/write with File class
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file = new File("data.txt");

        // File class doesn't have read/write methods for content!
        // file.read();   // No such method
        // file.write();  // No such method

        // Can only get metadata
        System.out.println(file.length());  // OK - metadata
    }
}
```
**Issue:** File class only provides metadata and operations; not for reading/writing content

#### ✅ Right:
```java
// CORRECT - Use File for metadata, Reader/Writer for content
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file = new File("data.txt");

        // File class: metadata and operations
        if (file.exists()) {
            System.out.println("Name: " + file.getName());
            System.out.println("Size: " + file.length());
            System.out.println("Path: " + file.getAbsolutePath());
        }

        // For content: use Reader/Writer
        try (BufferedReader reader = new BufferedReader(
                new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** File class for metadata/operations; FileReader/FileWriter for content.

**💡 Tip:** File = metadata; FileReader/FileWriter = content operations.

---

### 2. FileReader/FileWriter Mistakes

#### ❌ Wrong - Not Closing File Resources:
```java
// WRONG - Resource leak
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        FileWriter writer = new FileWriter("output.txt");
        writer.write("Hello World");
        // Forgot to close! Resource leak

        FileReader reader = new FileReader("input.txt");
        int data = reader.read();
        // Forgot to close! Resource leak
    }
}
```
**Issue:** Not closing resources causes resource leaks, file locks, data loss

#### ✅ Right:
```java
// CORRECT - Always close resources
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Option 1: Try-with-resources (recommended)
        try (FileWriter writer = new FileWriter("output.txt")) {
            writer.write("Hello World");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Option 2: Finally block (pre-Java 7)
        FileReader reader = null;
        try {
            reader = new FileReader("input.txt");
            int data = reader.read();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    System.out.println("Error closing: " + e.getMessage());
                }
            }
        }
    }
}
```

**Why:** Closing releases system resources, flushes buffers, releases file locks.

**💡 Tip:** Always use try-with-resources; resources closed automatically even if exception.

---

#### ❌ Wrong - Character Encoding Issues:
```java
// WRONG - Using platform default encoding
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // Uses platform default encoding (varies by system)
        FileWriter writer = new FileWriter("data.txt");
        writer.write("Héllo Wörld");  // Encoding depends on system!
        writer.close();

        FileReader reader = new FileReader("data.txt");
        // May not read correctly on different system
    }
}
```
**Issue:** Platform default encoding varies; causes issues with non-ASCII characters

#### ✅ Right:
```java
// CORRECT - Specify encoding explicitly
import java.io.*;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) {
        // Write with explicit UTF-8 encoding
        try (OutputStreamWriter writer = new OutputStreamWriter(
                new FileOutputStream("data.txt"),
                StandardCharsets.UTF_8)) {
            writer.write("Héllo Wörld");
        } catch (IOException e) {
            System.out.println("Error writing: " + e.getMessage());
        }

        // Read with explicit UTF-8 encoding
        try (InputStreamReader reader = new InputStreamReader(
                new FileInputStream("data.txt"),
                StandardCharsets.UTF_8)) {
            int data;
            while ((data = reader.read()) != -1) {
                System.out.print((char) data);
            }
        } catch (IOException e) {
            System.out.println("Error reading: " + e.getMessage());
        }
    }
}
```

**Why:** Explicit encoding ensures consistent behavior across all platforms.

**💡 Tip:** Always specify encoding (UTF-8 recommended); use `StandardCharsets.UTF_8`.

---

#### ❌ Wrong - Not Understanding Append Mode:
```java
// WRONG - Overwriting file when meaning to append
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // First write
        FileWriter writer1 = new FileWriter("log.txt");
        writer1.write("Log entry 1\n");
        writer1.close();

        // Second write - OVERWRITES first entry!
        FileWriter writer2 = new FileWriter("log.txt");
        writer2.write("Log entry 2\n");
        writer2.close();

        // File contains only "Log entry 2\n"
    }
}
```
**Issue:** FileWriter overwrites by default; previous content lost

#### ✅ Right:
```java
// CORRECT - Use append mode
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // First write
        try (FileWriter writer = new FileWriter("log.txt")) {
            writer.write("Log entry 1\n");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Second write - APPEND mode (true parameter)
        try (FileWriter writer = new FileWriter("log.txt", true)) {
            writer.write("Log entry 2\n");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // File now contains both entries
    }
}
```

**Why:** Append mode (`true` parameter) adds to end; default mode overwrites.

**💡 Tip:** Use `new FileWriter(file, true)` for append; omit or `false` for overwrite.

---

#### ❌ Wrong - Reading Character by Character for Large Files:
```java
// WRONG - Inefficient for large files
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        FileReader reader = new FileReader("large_file.txt");

        int character;
        // Reading one character at a time - VERY SLOW!
        while ((character = reader.read()) != -1) {
            System.out.print((char) character);
        }

        reader.close();
    }
}
```
**Issue:** Reading character-by-character is slow; many system calls

#### ✅ Right:
```java
// CORRECT - Use BufferedReader for efficiency
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // BufferedReader reads in chunks, much faster
        try (BufferedReader reader = new BufferedReader(
                new FileReader("large_file.txt"))) {

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** BufferedReader reads in chunks (default 8KB), dramatically faster.

**💡 Tip:** Always use BufferedReader/Writer for files; 10-100x faster than unbuffered.

---

### 3. BufferedReader/BufferedWriter Mistakes

#### ❌ Wrong - Not Flushing BufferedWriter:
```java
// WRONG - Not flushing before close
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedWriter writer = new BufferedWriter(
            new FileWriter("output.txt"));

        writer.write("Important data");

        // If program crashes here, data may be lost!
        // Buffer not flushed

        writer.close();  // close() flushes, but what if we don't reach here?
    }
}
```
**Issue:** Data stays in buffer; not written until flush or close

#### ✅ Right:
```java
// CORRECT - Flush explicitly for important data
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("output.txt"))) {

            writer.write("Important data");
            writer.flush();  // Force write to disk immediately

            // If program crashes after flush, data is safe

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `flush()` ensures data written to disk immediately; critical for important data.

**💡 Tip:** Flush after critical writes; try-with-resources auto-closes (which flushes).

---

#### ❌ Wrong - Using \n Instead of newLine():
```java
// WRONG - Hardcoded line separator
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedWriter writer = new BufferedWriter(
            new FileWriter("output.txt"));

        writer.write("Line 1\n");  // \n only on Unix, Windows uses \r\n
        writer.write("Line 2\n");

        writer.close();
    }
}
```
**Issue:** `\n` is Unix line separator; Windows uses `\r\n`; not portable

#### ✅ Right:
```java
// CORRECT - Use newLine() for portability
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("output.txt"))) {

            writer.write("Line 1");
            writer.newLine();  // Platform-independent newline
            writer.write("Line 2");
            writer.newLine();

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `newLine()` uses correct line separator for platform (`\n` or `\r\n`).

**💡 Tip:** Use `writer.newLine()` instead of `\n` for cross-platform compatibility.

---

#### ❌ Wrong - Forgetting readLine() Returns null at EOF:
```java
// WRONG - Not checking for null
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(
            new FileReader("input.txt"));

        String line = reader.readLine();
        System.out.println(line.length());  // NullPointerException if file empty!

        reader.close();
    }
}
```
**Issue:** `readLine()` returns `null` at end of file; causes NullPointerException

#### ✅ Right:
```java
// CORRECT - Always check for null
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {

            String line;
            while ((line = reader.readLine()) != null) {  // Check for null
                System.out.println(line.length());
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `readLine()` returns `null` when no more lines; must check before using.

**💡 Tip:** Always use `while ((line = reader.readLine()) != null)` pattern.

---

#### ❌ Wrong - Not Understanding readLine() Strips Newline:
```java
// WRONG - Expecting readLine() to include newline
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(
            new FileReader("input.txt"));
        BufferedWriter writer = new BufferedWriter(
            new FileWriter("output.txt"));

        String line;
        while ((line = reader.readLine()) != null) {
            writer.write(line);  // Lost newlines! All lines concatenated
        }

        reader.close();
        writer.close();
    }
}
```
**Issue:** `readLine()` strips newline; not added when writing

#### ✅ Right:
```java
// CORRECT - Add newline when writing
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"));
             BufferedWriter writer = new BufferedWriter(
                new FileWriter("output.txt"))) {

            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine();  // Add newline back
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `readLine()` removes line terminator; must add back when writing.

**💡 Tip:** After `readLine()`, use `newLine()` when writing to preserve line breaks.

---

### 4. Try-With-Resources Mistakes

#### ❌ Wrong - Not Using Try-With-Resources:
```java
// WRONG - Manual close with potential resource leak
import java.io.*;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("input.txt"));
            String line = reader.readLine();
            System.out.println(line);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
            // If exception here, reader never closed!
        }
        // Forgot finally block - resource leak!
    }
}
```
**Issue:** Without finally or try-with-resources, exceptions can cause resource leaks

#### ✅ Right:
```java
// CORRECT - Use try-with-resources
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Automatically closes even if exception occurs
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {

            String line = reader.readLine();
            System.out.println(line);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // reader closed automatically here
    }
}
```

**Why:** Try-with-resources guarantees close() called even if exception; prevents leaks.

**💡 Tip:** Always use try-with-resources for AutoCloseable resources (Java 7+).

---

#### ❌ Wrong - Wrong Order of Multiple Resources:
```java
// WRONG - Dependent resources declared out of order
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // WRONG: FileReader declared before BufferedReader
        try (FileReader fileReader = new FileReader("input.txt");
             BufferedReader reader = new BufferedReader(fileReader)) {

            String line = reader.readLine();

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // Closes in reverse order: reader, then fileReader
        // If reader.close() throws, fileReader may not close!
    }
}
```
**Issue:** Dependent resources closed in reverse order; if wrapper close fails, base may not close

#### ✅ Right:
```java
// CORRECT - Inline construction or understand close order
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Option 1: Inline (recommended)
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {

            String line = reader.readLine();

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Option 2: Separate declarations (if needed)
        // Closed in reverse order: reader closes (which closes fileReader)
        try (FileReader fileReader = new FileReader("input.txt");
             BufferedReader reader = new BufferedReader(fileReader)) {

            String line = reader.readLine();

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Inline construction cleaner; separate declarations closed in reverse order.

**💡 Tip:** Inline construction preferred; resources closed in reverse declaration order.

---

#### ❌ Wrong - Catching Exception from close() Incorrectly:
```java
// WRONG - Can't catch close() exception in same try
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {

            String line = reader.readLine();
            throw new IOException("Read error");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
            // If close() also throws, which exception is caught?
            // Answer: read error; close() exception suppressed
        }
    }
}
```
**Issue:** If both try block and close() throw, close() exception is suppressed

#### ✅ Right:
```java
// CORRECT - Access suppressed exceptions if needed
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {

            String line = reader.readLine();
            throw new IOException("Read error");

        } catch (IOException e) {
            System.out.println("Primary exception: " + e.getMessage());

            // Check for suppressed exceptions (from close())
            Throwable[] suppressed = e.getSuppressed();
            for (Throwable t : suppressed) {
                System.out.println("Suppressed: " + t.getMessage());
            }
        }
    }
}
```

**Why:** Try-with-resources suppresses close() exceptions; access via `getSuppressed()`.

**💡 Tip:** Primary exception thrown; close() exceptions suppressed, accessible via `getSuppressed()`.

---

#### ❌ Wrong - Trying to Use Resource After Try Block:
```java
// WRONG - Resource closed, can't use
import java.io.*;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader;

        try (reader = new BufferedReader(
                new FileReader("input.txt"))) {

            String line = reader.readLine();
            System.out.println(line);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // reader closed here
        reader.readLine();  // IOException: Stream closed!
    }
}
```
**Issue:** Resource automatically closed at end of try block; can't use after

#### ✅ Right:
```java
// CORRECT - Use resource only within try block
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {

            // Use reader only inside try block
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // reader no longer accessible here (out of scope)
    }
}
```

**Why:** Try-with-resources closes at end of try; resource unusable after.

**💡 Tip:** Use resources only within try block; they're closed automatically at block end.

---

### 5. Exception Handling Mistakes

#### ❌ Wrong - Catching Exception Too Broadly:
```java
// WRONG - Generic Exception catch loses specific info
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"));
            String line = reader.readLine();

        } catch (Exception e) {  // Too broad!
            System.out.println("Something went wrong");
            // Can't tell if file not found, permission denied, disk full, etc.
        }
    }
}
```
**Issue:** Catching generic Exception loses specific error information

#### ✅ Right:
```java
// CORRECT - Catch specific exceptions
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {

            String line = reader.readLine();

        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
            // Specific handling for missing file
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
            // Specific handling for other I/O errors
        }
    }
}
```

**Why:** Specific exceptions enable targeted error handling and better user messages.

**💡 Tip:** Catch FileNotFoundException separately, then IOException for other I/O errors.

---

#### ❌ Wrong - Empty Catch Block:
```java
// WRONG - Swallowing exceptions silently
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"));
            String line = reader.readLine();
            reader.close();
        } catch (IOException e) {
            // Empty catch - exception disappears!
        }

        System.out.println("Continuing...");  // User has no idea error occurred
    }
}
```
**Issue:** Empty catch blocks hide errors; debugging nightmare

#### ✅ Right:
```java
// CORRECT - Always handle or log exceptions
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("input.txt"))) {

            String line = reader.readLine();

        } catch (IOException e) {
            // At minimum: log error
            System.err.println("Error reading file: " + e.getMessage());
            e.printStackTrace();

            // Better: handle appropriately
            // - Inform user
            // - Try alternative
            // - Rethrow if can't handle
        }
    }
}
```

**Why:** Empty catch blocks mask problems; always log or handle exceptions.

**💡 Tip:** Never leave catch blocks empty; at minimum log with `e.printStackTrace()`.

---

#### ❌ Wrong - Not Handling FileNotFoundException Separately:
```java
// WRONG - Treating all IOExceptions the same
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader reader = new BufferedReader(
                new FileReader("config.txt"));
            // Process config

        } catch (IOException e) {
            // Can't distinguish between:
            // - File not found (may need to create default config)
            // - Permission denied (different error message)
            // - Disk full (can't help)
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Can't handle different I/O errors appropriately

#### ✅ Right:
```java
// CORRECT - Handle FileNotFoundException separately
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("config.txt"))) {

            // Process config

        } catch (FileNotFoundException e) {
            System.out.println("Config file not found. Using defaults.");
            // Create default config

        } catch (IOException e) {
            System.out.println("Error reading config: " + e.getMessage());
            // Different handling for other I/O errors
        }
    }
}
```

**Why:** FileNotFoundException often needs different handling (create, use defaults, etc.).

**💡 Tip:** Catch FileNotFoundException first for special handling, then IOException.

---

#### ❌ Wrong - Not Providing Context in Error Messages:
```java
// WRONG - Generic error messages
import java.io.*;

public class Main {
    public static void processFiles(String[] filenames) {
        for (String filename : filenames) {
            try (BufferedReader reader = new BufferedReader(
                    new FileReader(filename))) {

                String line = reader.readLine();

            } catch (IOException e) {
                System.out.println("Error");  // Which file? What error?
            }
        }
    }
}
```
**Issue:** Error messages lack context; can't tell which file or what error

#### ✅ Right:
```java
// CORRECT - Provide detailed context
import java.io.*;

public class Main {
    public static void processFiles(String[] filenames) {
        for (String filename : filenames) {
            try (BufferedReader reader = new BufferedReader(
                    new FileReader(filename))) {

                String line = reader.readLine();

            } catch (FileNotFoundException e) {
                System.out.println("File not found: " + filename);
            } catch (IOException e) {
                System.out.println("Error reading " + filename + ": " +
                                 e.getMessage());
            }
        }
    }
}
```

**Why:** Detailed error messages with context enable faster debugging.

**💡 Tip:** Include filename, operation, and error details in exception messages.

---

### 6. File Operations Mistakes

#### ❌ Wrong - Not Checking createNewFile Return Value:
```java
// WRONG - Assuming file was created
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        File file = new File("data.txt");
        file.createNewFile();  // Ignored return value

        // Assuming file was created, but it may already exist!
        FileWriter writer = new FileWriter(file);
        writer.write("New data");  // May overwrite existing data!
        writer.close();
    }
}
```
**Issue:** Not checking return value; can't tell if file was created or already existed

#### ✅ Right:
```java
// CORRECT - Check return value
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file = new File("data.txt");

        try {
            if (file.createNewFile()) {
                System.out.println("File created successfully");
                // File is new, safe to write
            } else {
                System.out.println("File already exists");
                // May want to prompt user before overwriting
            }

            // Now write if appropriate
            try (FileWriter writer = new FileWriter(file)) {
                writer.write("New data");
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Return value indicates if file was created or already existed.

**💡 Tip:** Always check `createNewFile()` return: `true` = created, `false` = exists.

---

#### ❌ Wrong - Not Checking delete() Success:
```java
// WRONG - Assuming delete succeeded
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File file = new File("temp.txt");
        file.delete();  // Ignored return value

        System.out.println("File deleted");  // Maybe not!
    }
}
```
**Issue:** `delete()` returns false if deletion fails; ignoring can cause issues

#### ✅ Right:
```java
// CORRECT - Check delete() return value
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File file = new File("temp.txt");

        if (file.exists()) {
            if (file.delete()) {
                System.out.println("File deleted successfully");
            } else {
                System.out.println("Failed to delete file");
                // Reasons: file in use, no permissions, doesn't exist
            }
        } else {
            System.out.println("File doesn't exist");
        }
    }
}
```

**Why:** `delete()` returns false on failure; must check for proper error handling.

**💡 Tip:** Always check `delete()` return value; false = deletion failed.

---

#### ❌ Wrong - Deleting Non-Empty Directory:
```java
// WRONG - Can't delete non-empty directory
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File dir = new File("myFolder");

        if (dir.delete()) {
            System.out.println("Deleted");
        } else {
            System.out.println("Failed");  // Fails if directory not empty!
        }
    }
}
```
**Issue:** `delete()` only works on empty directories; fails silently for non-empty

#### ✅ Right:
```java
// CORRECT - Delete directory contents first
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File dir = new File("myFolder");
        deleteDirectory(dir);
    }

    public static boolean deleteDirectory(File dir) {
        if (dir.isDirectory()) {
            File[] files = dir.listFiles();
            if (files != null) {
                for (File file : files) {
                    deleteDirectory(file);  // Recursive delete
                }
            }
        }

        boolean deleted = dir.delete();
        if (deleted) {
            System.out.println("Deleted: " + dir.getName());
        } else {
            System.out.println("Failed to delete: " + dir.getName());
        }
        return deleted;
    }
}
```

**Why:** Must delete contents before directory; requires recursive deletion.

**💡 Tip:** Delete directory contents first (recursively), then directory itself.

---

#### ❌ Wrong - Using deleteOnExit Incorrectly:
```java
// WRONG - deleteOnExit for regular file deletion
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        File temp = new File("temp.txt");
        temp.createNewFile();
        temp.deleteOnExit();  // Deleted on JVM exit, not immediately!

        // File still exists during program execution
        // If JVM crashes, file not deleted
    }
}
```
**Issue:** `deleteOnExit()` deletes on JVM shutdown, not immediately; if crash, not deleted

#### ✅ Right:
```java
// CORRECT - Use delete() for immediate deletion, deleteOnExit for temp files
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // For immediate deletion
        File temp1 = new File("temp1.txt");
        try {
            temp1.createNewFile();
            // Use file
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            if (temp1.exists()) {
                temp1.delete();  // Delete immediately
            }
        }

        // For temporary files (delete on normal JVM exit)
        File temp2 = new File("temp2.txt");
        try {
            temp2.createNewFile();
            temp2.deleteOnExit();  // Delete on JVM shutdown
            // Use file
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `delete()` for immediate; `deleteOnExit()` for temp files (normal exit only).

**💡 Tip:** Use `delete()` when done; `deleteOnExit()` only for temp files (cleanup on exit).

---

### 7. Directory Operations Mistakes

#### ❌ Wrong - mkdir vs mkdirs Confusion:
```java
// WRONG - mkdir for nested directories
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File dir = new File("parent/child/grandchild");

        if (dir.mkdir()) {  // Fails! Parent directories don't exist
            System.out.println("Directory created");
        } else {
            System.out.println("Failed to create directory");
        }
    }
}
```
**Issue:** `mkdir()` only creates single directory; fails if parent doesn't exist

#### ✅ Right:
```java
// CORRECT - Use mkdirs() for nested directories
import java.io.File;

public class Main {
    public static void main(String[] args) {
        // mkdir: single directory (parent must exist)
        File dir1 = new File("existing_parent/new_dir");
        if (dir1.mkdir()) {
            System.out.println("Single directory created");
        }

        // mkdirs: creates parent directories if needed
        File dir2 = new File("parent/child/grandchild");
        if (dir2.mkdirs()) {
            System.out.println("Nested directories created");
        }
    }
}
```

**Why:** `mkdir()` = single directory; `mkdirs()` = creates parent dirs too.

**💡 Tip:** Use `mkdir()` for single dir; `mkdirs()` for nested directories.

---

#### ❌ Wrong - Not Checking listFiles() for null:
```java
// WRONG - Not checking for null
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File dir = new File("myFolder");

        File[] files = dir.listFiles();
        for (File file : files) {  // NullPointerException if dir doesn't exist or isn't directory!
            System.out.println(file.getName());
        }
    }
}
```
**Issue:** `listFiles()` returns null if path is not a directory or I/O error

#### ✅ Right:
```java
// CORRECT - Check for null before iterating
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File dir = new File("myFolder");

        if (dir.isDirectory()) {
            File[] files = dir.listFiles();

            if (files != null) {  // Check for null
                for (File file : files) {
                    System.out.println(file.getName());
                }
            } else {
                System.out.println("Error reading directory");
            }
        } else {
            System.out.println("Not a directory");
        }
    }
}
```

**Why:** `listFiles()` returns null if not directory or I/O error; must check.

**💡 Tip:** Always check `listFiles() != null` before iterating; returns null on error.

---

#### ❌ Wrong - Listing All Files Without Filter:
```java
// WRONG - Listing all files when only need specific type
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File dir = new File("documents");
        File[] files = dir.listFiles();

        if (files != null) {
            for (File file : files) {
                // Manually filtering for .txt files
                if (file.getName().endsWith(".txt")) {
                    System.out.println(file.getName());
                }
            }
        }
    }
}
```
**Issue:** Inefficient to list all files then filter; `listFiles()` accepts filter

#### ✅ Right:
```java
// CORRECT - Use FileFilter or FilenameFilter
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File dir = new File("documents");

        // Option 1: FilenameFilter
        File[] txtFiles = dir.listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.endsWith(".txt");
            }
        });

        // Option 2: Lambda (Java 8+)
        File[] txtFiles2 = dir.listFiles(
            (dir2, name) -> name.endsWith(".txt")
        );

        // Option 3: FileFilter
        File[] txtFiles3 = dir.listFiles(new FileFilter() {
            public boolean accept(File file) {
                return file.isFile() && file.getName().endsWith(".txt");
            }
        });

        if (txtFiles != null) {
            for (File file : txtFiles) {
                System.out.println(file.getName());
            }
        }
    }
}
```

**Why:** Filtering during listing is more efficient; cleaner code.

**💡 Tip:** Use `listFiles(FilenameFilter)` or `listFiles(FileFilter)` to filter during listing.

---

#### ❌ Wrong - Not Distinguishing Files from Directories:
```java
// WRONG - Treating all File objects as files
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File dir = new File("myFolder");
        File[] files = dir.listFiles();

        if (files != null) {
            for (File file : files) {
                // Assuming all are files
                System.out.println("File: " + file.getName() +
                    " Size: " + file.length());  // Wrong for directories!
            }
        }
    }
}
```
**Issue:** Not checking if File is file or directory; incorrect processing

#### ✅ Right:
```java
// CORRECT - Check isFile() or isDirectory()
import java.io.File;

public class Main {
    public static void main(String[] args) {
        File dir = new File("myFolder");
        File[] files = dir.listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    System.out.println("[FILE] " + file.getName() +
                        " (" + file.length() + " bytes)");
                } else if (file.isDirectory()) {
                    System.out.println("[DIR] " + file.getName());
                }
            }
        }
    }
}
```

**Why:** File objects represent both files and directories; must distinguish.

**💡 Tip:** Always use `isFile()` or `isDirectory()` to distinguish; `length()` is 0 for dirs.

---

### 8. Resource Management Mistakes

#### ❌ Wrong - Closing in Wrong Order:
```java
// WRONG - Closing base stream before wrapper
import java.io.*;

public class Main {
    public static void main(String[] args) {
        FileWriter fileWriter = null;
        BufferedWriter bufferedWriter = null;

        try {
            fileWriter = new FileWriter("output.txt");
            bufferedWriter = new BufferedWriter(fileWriter);

            bufferedWriter.write("Data");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (fileWriter != null) fileWriter.close();  // WRONG ORDER!
                if (bufferedWriter != null) bufferedWriter.close();
            } catch (IOException e) {
                System.out.println("Error closing: " + e.getMessage());
            }
        }
    }
}
```
**Issue:** Closing base before wrapper; wrapper may not flush, data loss

#### ✅ Right:
```java
// CORRECT - Close wrapper first (or use try-with-resources)
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Option 1: Try-with-resources (recommended) - handles order automatically
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("output.txt"))) {

            writer.write("Data");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Option 2: Manual close in correct order
        FileWriter fileWriter = null;
        BufferedWriter bufferedWriter = null;

        try {
            fileWriter = new FileWriter("output2.txt");
            bufferedWriter = new BufferedWriter(fileWriter);
            bufferedWriter.write("Data");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (bufferedWriter != null) bufferedWriter.close();  // Wrapper first
                // fileWriter closed by bufferedWriter.close()
            } catch (IOException e) {
                System.out.println("Error closing: " + e.getMessage());
            }
        }
    }
}
```

**Why:** Wrapper close flushes buffer and closes base; close wrapper first.

**💡 Tip:** Close wrappers first (flushes and closes base); try-with-resources handles automatically.

---

#### ❌ Wrong - Not Handling close() Exceptions in Finally:
```java
// WRONG - Uncaught exception in finally
import java.io.*;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = null;

        try {
            reader = new BufferedReader(new FileReader("input.txt"));
            String line = reader.readLine();

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            reader.close();  // Compilation error! IOException not caught
        }
    }
}
```
**Issue:** `close()` can throw IOException; must be caught in finally

#### ✅ Right:
```java
// CORRECT - Handle close() exceptions
import java.io.*;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = null;

        try {
            reader = new BufferedReader(new FileReader("input.txt"));
            String line = reader.readLine();

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            if (reader != null) {
                try {
                    reader.close();  // Caught here
                } catch (IOException e) {
                    System.out.println("Error closing: " + e.getMessage());
                }
            }
        }
    }
}
```

**Why:** `close()` can throw IOException; must be caught in finally.

**💡 Tip:** Use try-with-resources to avoid finally close() exception handling complexity.

---

#### ❌ Wrong - Sharing Streams Between Threads:
```java
// WRONG - Sharing FileWriter between threads
import java.io.*;

public class Main {
    private static FileWriter writer;

    public static void main(String[] args) throws IOException {
        writer = new FileWriter("log.txt");

        // Multiple threads writing to same FileWriter - NOT thread-safe!
        Thread t1 = new Thread(() -> {
            try {
                writer.write("Thread 1\n");
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        Thread t2 = new Thread(() -> {
            try {
                writer.write("Thread 2\n");
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        t1.start();
        t2.start();
    }
}
```
**Issue:** File streams not thread-safe; concurrent writes cause data corruption

#### ✅ Right:
```java
// CORRECT - Synchronize access or use separate streams
import java.io.*;

public class Main {
    private static FileWriter writer;

    public static void main(String[] args) throws IOException {
        writer = new FileWriter("log.txt");

        // Option 1: Synchronized writes
        Thread t1 = new Thread(() -> {
            synchronized(writer) {
                try {
                    writer.write("Thread 1\n");
                    writer.flush();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized(writer) {
                try {
                    writer.write("Thread 2\n");
                    writer.flush();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });

        t1.start();
        t2.start();

        // Option 2: Each thread has own stream (append mode)
        // Better for high concurrency
    }
}
```

**Why:** File streams not thread-safe; synchronize access or use separate streams.

**💡 Tip:** Synchronize file stream access or use separate streams per thread with append mode.

---

#### ❌ Wrong - Not Checking Available Space Before Writing:
```java
// WRONG - Writing without checking disk space
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("large_file.txt"))) {

            // Writing large amount of data without checking available space
            for (int i = 0; i < 1000000; i++) {
                writer.write("Line " + i + "\n");
            }
            // May fail with IOException if disk full!

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Not checking available disk space before large writes; may fail mid-write

#### ✅ Right:
```java
// CORRECT - Check available space before large writes
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file = new File("large_file.txt");

        // Estimate required space
        long estimatedSize = 1000000 * 20;  // 20 bytes per line

        // Check available space
        long usableSpace = file.getUsableSpace();

        if (usableSpace < estimatedSize) {
            System.out.println("Insufficient disk space");
            System.out.println("Required: " + estimatedSize + " bytes");
            System.out.println("Available: " + usableSpace + " bytes");
            return;
        }

        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(file))) {

            for (int i = 0; i < 1000000; i++) {
                writer.write("Line " + i + "\n");
            }

            System.out.println("File written successfully");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Checking available space prevents mid-write failures and partial files.

**💡 Tip:** Use `file.getUsableSpace()` to check available disk space before large writes.

---

### 9. File Path Mistakes

#### ❌ Wrong - Hardcoding Absolute Paths:
```java
// WRONG - Hardcoded absolute path
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Only works on this specific machine!
        File file = new File("C:\\Users\\John\\Documents\\data.txt");

        try (BufferedReader reader = new BufferedReader(
                new FileReader(file))) {
            // Process file
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Hardcoded absolute paths not portable; breaks on other machines

#### ✅ Right:
```java
// CORRECT - Use relative paths or system properties
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Option 1: Relative path (relative to working directory)
        File file1 = new File("data/data.txt");

        // Option 2: User home directory
        String userHome = System.getProperty("user.home");
        File file2 = new File(userHome, "Documents/data.txt");

        // Option 3: Temporary directory
        String tempDir = System.getProperty("java.io.tmpdir");
        File file3 = new File(tempDir, "temp_data.txt");

        // Option 4: Application directory
        String currentDir = System.getProperty("user.dir");
        File file4 = new File(currentDir, "data.txt");

        System.out.println("User home: " + userHome);
        System.out.println("Temp dir: " + tempDir);
        System.out.println("Current dir: " + currentDir);
    }
}
```

**Why:** Relative paths or system properties ensure portability across machines.

**💡 Tip:** Use relative paths or system properties: `user.home`, `user.dir`, `java.io.tmpdir`.

---

#### ❌ Wrong - Not Understanding Relative vs Absolute Paths:
```java
// WRONG - Confusion about relative paths
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file = new File("data.txt");

        // Where is this file? Depends on working directory!
        // If run from IDE: project directory
        // If run from command line: current directory
        // Can cause FileNotFoundException on different environments

        try (BufferedReader reader = new BufferedReader(
                new FileReader(file))) {
            String line = reader.readLine();
        } catch (IOException e) {
            System.out.println("File not found");
            // Where to look?
        }
    }
}
```
**Issue:** Relative paths depend on working directory; unpredictable location

#### ✅ Right:
```java
// CORRECT - Use absolute path or clarify relative path
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file = new File("data.txt");

        System.out.println("Working directory: " +
            System.getProperty("user.dir"));
        System.out.println("Looking for file at: " +
            file.getAbsolutePath());

        if (!file.exists()) {
            System.out.println("File not found at: " +
                file.getAbsolutePath());
            System.out.println("Please place data.txt in working directory");
            return;
        }

        try (BufferedReader reader = new BufferedReader(
                new FileReader(file))) {
            String line = reader.readLine();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Showing absolute path helps users locate files; clarifies expectations.

**💡 Tip:** Print `file.getAbsolutePath()` to show where program looks for file.

---

#### ❌ Wrong - Not Handling Spaces in Paths:
```java
// WRONG - Assuming paths don't have spaces
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Path with spaces
        String path = "My Documents/My File.txt";

        // In command line or scripts, this may break
        // Runtime.getRuntime().exec("program " + path);  // WRONG!

        File file = new File(path);  // This is OK

        try (BufferedReader reader = new BufferedReader(
                new FileReader(file))) {
            String line = reader.readLine();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Spaces in paths need special handling in some contexts (exec, scripts)

#### ✅ Right:
```java
// CORRECT - Handle spaces properly
import java.io.*;

public class Main {
    public static void main(String[] args) {
        String path = "My Documents/My File.txt";
        File file = new File(path);

        // File operations handle spaces fine
        System.out.println("Path: " + file.getAbsolutePath());

        // For exec, use array form (handles spaces)
        try {
            ProcessBuilder pb = new ProcessBuilder("notepad",
                file.getAbsolutePath());
            pb.start();  // Handles spaces correctly
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Or quote paths when building commands
        String command = "program \"" + file.getAbsolutePath() + "\"";
    }
}
```

**Why:** Spaces in paths need quoting in exec/scripts; File class handles automatically.

**💡 Tip:** Use `ProcessBuilder` or quote paths; File class handles spaces automatically.

---

#### ❌ Wrong - Not Normalizing Paths:
```java
// WRONG - Not handling ./ and ../ in paths
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File file1 = new File("./data/../config/./settings.txt");
        File file2 = new File("config/settings.txt");

        // Both refer to same file, but paths look different
        System.out.println(file1.getPath());  // ./data/../config/./settings.txt
        System.out.println(file2.getPath());  // config/settings.txt

        // String comparison fails!
        System.out.println(file1.getPath().equals(file2.getPath()));  // false!
    }
}
```
**Issue:** Unnormalized paths with `./` and `../` don't compare equal

#### ✅ Right:
```java
// CORRECT - Normalize paths for comparison
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        File file1 = new File("./data/../config/./settings.txt");
        File file2 = new File("config/settings.txt");

        // Option 1: Use getCanonicalPath()
        System.out.println(file1.getCanonicalPath());
        System.out.println(file2.getCanonicalPath());
        System.out.println(file1.getCanonicalPath().equals(
            file2.getCanonicalPath()));  // true!

        // Option 2: Use getCanonicalFile()
        System.out.println(file1.getCanonicalFile().equals(
            file2.getCanonicalFile()));  // true!
    }
}
```

**Why:** Canonical paths resolve `.`, `..`, symlinks; enable accurate comparison.

**💡 Tip:** Use `getCanonicalPath()` or `getCanonicalFile()` to normalize paths for comparison.

---

### 10. Performance Mistakes

#### ❌ Wrong - Opening/Closing File in Loop:
```java
// WRONG - Opening file repeatedly
import java.io.*;

public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 1000; i++) {
            try (FileWriter writer = new FileWriter("log.txt", true)) {
                writer.write("Log entry " + i + "\n");
            } catch (IOException e) {
                System.out.println("Error: " + e.getMessage());
            }
            // Opening and closing file 1000 times! Very slow!
        }
    }
}
```
**Issue:** Opening/closing file repeatedly is extremely slow; huge overhead

#### ✅ Right:
```java
// CORRECT - Open once, write multiple times
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (FileWriter writer = new FileWriter("log.txt", true)) {
            for (int i = 0; i < 1000; i++) {
                writer.write("Log entry " + i + "\n");
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // Opens file once, writes 1000 times, closes once
        // Much faster!
    }
}
```

**Why:** Opening/closing has overhead; open once, write multiple times, close once.

**💡 Tip:** Open file once outside loop, write inside loop, close after loop.

---

#### ❌ Wrong - Not Using Buffering for Large Files:
```java
// WRONG - Unbuffered I/O for large file
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (FileReader reader = new FileReader("large_file.txt");
             FileWriter writer = new FileWriter("output.txt")) {

            int character;
            // Reading one character at a time - VERY SLOW for large files!
            while ((character = reader.read()) != -1) {
                writer.write(character);
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Unbuffered character-by-character I/O extremely slow; many system calls

#### ✅ Right:
```java
// CORRECT - Use buffering for large files
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("large_file.txt"));
             BufferedWriter writer = new BufferedWriter(
                new FileWriter("output.txt"))) {

            String line;
            // Reading line by line with buffering - MUCH faster!
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

**Why:** Buffering reduces system calls; reads/writes in chunks (typically 8KB).

**💡 Tip:** Always use BufferedReader/Writer for files; 10-100x faster than unbuffered.

---

#### ❌ Wrong - Reading Entire File into String:
```java
// WRONG - Loading entire large file into memory
import java.io.*;

public class Main {
    public static void main(String[] args) {
        StringBuilder content = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(
                new FileReader("large_file.txt"))) {

            String line;
            // Loading entire file into memory!
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }

            // OutOfMemoryError for large files!
            String fullContent = content.toString();

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Loading entire file into memory causes OutOfMemoryError for large files

#### ✅ Right:
```java
// CORRECT - Process file line by line (streaming)
import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new FileReader("large_file.txt"))) {

            String line;
            // Process each line individually - memory efficient
            while ((line = reader.readLine()) != null) {
                processLine(line);  // Process one line at a time
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static void processLine(String line) {
        // Process line (search, transform, write, etc.)
        System.out.println(line.toUpperCase());
    }
}
```

**Why:** Streaming (line-by-line) uses constant memory regardless of file size.

**💡 Tip:** Process files line-by-line; don't load entire file into memory.

---

#### ❌ Wrong - Creating Many Temporary Files:
```java
// WRONG - Creating many temp files without cleanup
import java.io.*;

public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 100; i++) {
            try {
                File temp = File.createTempFile("temp", ".txt");
                // temp.deleteOnExit();  // Forgot to mark for deletion!

                FileWriter writer = new FileWriter(temp);
                writer.write("Temp data " + i);
                writer.close();
            } catch (IOException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
        // 100 temp files left on disk!
    }
}
```
**Issue:** Temporary files not cleaned up; clutter temp directory

#### ✅ Right:
```java
// CORRECT - Clean up temporary files
import java.io.*;

public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 100; i++) {
            File temp = null;
            try {
                temp = File.createTempFile("temp", ".txt");
                temp.deleteOnExit();  // Delete on JVM exit

                try (FileWriter writer = new FileWriter(temp)) {
                    writer.write("Temp data " + i);
                }

                // Process temp file

                // Option: Delete immediately if done
                if (temp.delete()) {
                    System.out.println("Temp file deleted");
                }

            } catch (IOException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
}
```

**Why:** Temporary files should be cleaned up; use `deleteOnExit()` or delete immediately.

**💡 Tip:** Use `File.createTempFile()` + `deleteOnExit()`; or delete immediately when done.

---

This comprehensive list contains **40+ File I/O mistakes** covering all fundamental concepts!

---

**🎉 Congratulations on completing Day 22!**

You've learned the fundamentals of file I/O in Java. Tomorrow, we'll explore advanced file operations and the NIO package.

**Next**: [Day 23: File Operations & NIO →](day23_file_operations.md)

---

*Last Updated: 2026-01-09*