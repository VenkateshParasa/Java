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

**🎉 Congratulations on completing Day 22!**

You've learned the fundamentals of file I/O in Java. Tomorrow, we'll explore advanced file operations and the NIO package.

**Next**: [Day 23: File Operations & NIO →](day23_file_operations.md)

---

*Last Updated: 2026-01-09*