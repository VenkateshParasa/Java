# Day 23: Advanced File Operations & NIO

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

By the end of Day 23, you will be able to:
- Use the Files class for advanced file operations
- Work with Path and Paths classes
- Understand the difference between java.io and java.nio
- Perform file operations like copy, move, and delete
- Read and write files using NIO.2 methods
- Work with file attributes and metadata
- Use DirectoryStream for efficient directory traversal

---

## 📚 Topics Covered

### 1. Introduction to NIO.2 (New I/O)

Java NIO.2 (introduced in Java 7) provides a more modern and efficient way to work with files.

#### Key Advantages:
- **Better Performance**: More efficient I/O operations
- **More Features**: Rich set of file operations
- **Better Error Handling**: More specific exceptions
- **Path Abstraction**: Platform-independent path handling
- **Symbolic Links**: Support for symbolic links

#### Main Classes:
```java
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
```

---

### 2. Path and Paths

The `Path` interface represents a file or directory path.

#### Creating Paths:

```java
import java.nio.file.Path;
import java.nio.file.Paths;

public class PathExample {
    public static void main(String[] args) {
        // Create Path using Paths.get()
        Path path1 = Paths.get("data.txt");
        Path path2 = Paths.get("C:\\Users\\Documents\\data.txt");
        Path path3 = Paths.get("folder", "subfolder", "file.txt");
        
        // Create Path using Path.of() (Java 11+)
        Path path4 = Path.of("data.txt");
        
        // Get current directory
        Path currentDir = Paths.get(".");
        
        System.out.println("Path 1: " + path1);
        System.out.println("Absolute path: " + path1.toAbsolutePath());
    }
}
```

#### Path Methods:

```java
import java.nio.file.Path;
import java.nio.file.Paths;

public class PathMethods {
    public static void main(String[] args) {
        Path path = Paths.get("folder/subfolder/file.txt");
        
        System.out.println("File name: " + path.getFileName());
        System.out.println("Parent: " + path.getParent());
        System.out.println("Root: " + path.getRoot());
        System.out.println("Name count: " + path.getNameCount());
        System.out.println("Absolute: " + path.isAbsolute());
        
        // Get individual path elements
        for (int i = 0; i < path.getNameCount(); i++) {
            System.out.println("Element " + i + ": " + path.getName(i));
        }
        
        // Resolve paths (combine paths)
        Path base = Paths.get("project");
        Path resolved = base.resolve("src/main.java");
        System.out.println("Resolved: " + resolved);
        
        // Normalize path (remove redundant elements)
        Path messy = Paths.get("folder/../folder/./file.txt");
        System.out.println("Normalized: " + messy.normalize());
    }
}
```

---

### 3. Files Class - Basic Operations

The `Files` class provides static methods for file operations.

#### Checking File Existence and Properties:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

public class FileChecks {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");
        
        // Check existence
        System.out.println("Exists: " + Files.exists(path));
        System.out.println("Not exists: " + Files.notExists(path));
        
        // Check type
        System.out.println("Is directory: " + Files.isDirectory(path));
        System.out.println("Is regular file: " + Files.isRegularFile(path));
        System.out.println("Is symbolic link: " + Files.isSymbolicLink(path));
        
        // Check permissions
        System.out.println("Is readable: " + Files.isReadable(path));
        System.out.println("Is writable: " + Files.isWritable(path));
        System.out.println("Is executable: " + Files.isExecutable(path));
        
        // Check if same file
        Path path2 = Paths.get("data.txt");
        try {
            System.out.println("Same file: " + 
                Files.isSameFile(path, path2));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### Creating Files and Directories:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

public class CreateFiles {
    public static void main(String[] args) {
        try {
            // Create file
            Path file = Paths.get("newfile.txt");
            Files.createFile(file);
            System.out.println("File created");
            
            // Create directory
            Path dir = Paths.get("newdir");
            Files.createDirectory(dir);
            System.out.println("Directory created");
            
            // Create directories (including parents)
            Path nestedDir = Paths.get("parent/child/grandchild");
            Files.createDirectories(nestedDir);
            System.out.println("Nested directories created");
            
            // Create temporary file
            Path tempFile = Files.createTempFile("temp", ".txt");
            System.out.println("Temp file: " + tempFile);
            
            // Create temporary directory
            Path tempDir = Files.createTempDirectory("tempdir");
            System.out.println("Temp directory: " + tempDir);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 4. Reading and Writing Files with NIO.2

#### Reading Files:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;

public class ReadFiles {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");
        
        try {
            // Read all lines into a List
            List<String> lines = Files.readAllLines(path);
            System.out.println("All lines:");
            for (String line : lines) {
                System.out.println(line);
            }
            
            // Read all content as String
            String content = Files.readString(path);
            System.out.println("\nContent:\n" + content);
            
            // Read all bytes
            byte[] bytes = Files.readAllBytes(path);
            System.out.println("\nBytes read: " + bytes.length);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Writing Files:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class WriteFiles {
    public static void main(String[] args) {
        Path path = Paths.get("output.txt");
        
        try {
            // Write string to file
            String content = "Hello, NIO.2!";
            Files.writeString(path, content);
            System.out.println("String written");
            
            // Write lines to file
            List<String> lines = Arrays.asList(
                "Line 1",
                "Line 2",
                "Line 3"
            );
            Files.write(path, lines);
            System.out.println("Lines written");
            
            // Append to file
            Files.writeString(path, "\nAppended line", 
                StandardOpenOption.APPEND);
            System.out.println("Content appended");
            
            // Write bytes
            byte[] bytes = "Binary data".getBytes();
            Files.write(path, bytes);
            System.out.println("Bytes written");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 5. File Operations: Copy, Move, Delete

#### Copying Files:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException;

public class CopyFiles {
    public static void main(String[] args) {
        Path source = Paths.get("source.txt");
        Path target = Paths.get("target.txt");
        
        try {
            // Simple copy
            Files.copy(source, target);
            System.out.println("File copied");
            
            // Copy with options
            Files.copy(source, target, 
                StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied (replaced)");
            
            // Copy directory
            Path sourceDir = Paths.get("sourceDir");
            Path targetDir = Paths.get("targetDir");
            Files.copy(sourceDir, targetDir);
            System.out.println("Directory copied");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Moving Files:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException;

public class MoveFiles {
    public static void main(String[] args) {
        Path source = Paths.get("oldname.txt");
        Path target = Paths.get("newname.txt");
        
        try {
            // Move/rename file
            Files.move(source, target);
            System.out.println("File moved");
            
            // Move with options
            Files.move(source, target,
                StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File moved (replaced)");
            
            // Atomic move (all or nothing)
            Files.move(source, target,
                StandardCopyOption.ATOMIC_MOVE);
            System.out.println("File moved atomically");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Deleting Files:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

public class DeleteFiles {
    public static void main(String[] args) {
        Path path = Paths.get("deleteme.txt");
        
        try {
            // Delete file (throws exception if doesn't exist)
            Files.delete(path);
            System.out.println("File deleted");
            
            // Delete if exists (returns boolean)
            boolean deleted = Files.deleteIfExists(path);
            System.out.println("Deleted: " + deleted);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 6. File Attributes

#### Getting File Attributes:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.io.IOException;

public class FileAttributes {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");
        
        try {
            // Get basic attributes
            BasicFileAttributes attrs = 
                Files.readAttributes(path, BasicFileAttributes.class);
            
            System.out.println("Creation time: " + attrs.creationTime());
            System.out.println("Last modified: " + attrs.lastModifiedTime());
            System.out.println("Last access: " + attrs.lastAccessTime());
            System.out.println("Size: " + attrs.size() + " bytes");
            System.out.println("Is directory: " + attrs.isDirectory());
            System.out.println("Is regular file: " + attrs.isRegularFile());
            System.out.println("Is symbolic link: " + attrs.isSymbolicLink());
            
            // Get individual attributes
            long size = Files.size(path);
            System.out.println("\nFile size: " + size + " bytes");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### 7. Directory Operations

#### Listing Directory Contents:

```java
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.stream.Stream;

public class ListDirectory {
    public static void main(String[] args) {
        Path dir = Paths.get(".");
        
        // Method 1: Using DirectoryStream
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            System.out.println("Directory contents:");
            for (Path entry : stream) {
                System.out.println(entry.getFileName());
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Method 2: Using Files.list()
        try (Stream<Path> stream = Files.list(dir)) {
            System.out.println("\nUsing Files.list():");
            stream.forEach(path -> System.out.println(path.getFileName()));
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Method 3: With filter
        try (DirectoryStream<Path> stream = 
                Files.newDirectoryStream(dir, "*.txt")) {
            System.out.println("\nText files only:");
            for (Path entry : stream) {
                System.out.println(entry.getFileName());
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Walking Directory Tree:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.stream.Stream;

public class WalkDirectory {
    public static void main(String[] args) {
        Path start = Paths.get(".");
        
        try {
            // Walk directory tree (limited depth)
            System.out.println("Files (max depth 2):");
            try (Stream<Path> stream = Files.walk(start, 2)) {
                stream.filter(Files::isRegularFile)
                      .forEach(System.out::println);
            }
            
            // Find files matching pattern
            System.out.println("\nJava files:");
            try (Stream<Path> stream = Files.find(start, 10,
                    (path, attrs) -> path.toString().endsWith(".java"))) {
                stream.forEach(System.out::println);
            }
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

## 💻 Practical Exercises

### Exercise 1: File Information Display
Create a program that displays comprehensive file information.

```java
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.io.IOException;

public class Exercise1 {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");
        
        try {
            if (Files.exists(path)) {
                BasicFileAttributes attrs = 
                    Files.readAttributes(path, BasicFileAttributes.class);
                
                System.out.println("=== File Information ===");
                System.out.println("Name: " + path.getFileName());
                System.out.println("Path: " + path.toAbsolutePath());
                System.out.println("Size: " + attrs.size() + " bytes");
                System.out.println("Created: " + attrs.creationTime());
                System.out.println("Modified: " + attrs.lastModifiedTime());
                System.out.println("Readable: " + Files.isReadable(path));
                System.out.println("Writable: " + Files.isWritable(path));
            } else {
                System.out.println("File does not exist");
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 2: File Copy Utility
Create a utility to copy files with progress indication.

```java
import java.nio.file.*;
import java.io.IOException;

public class Exercise2 {
    public static void main(String[] args) {
        Path source = Paths.get("source.txt");
        Path target = Paths.get("backup/source_backup.txt");
        
        try {
            // Create parent directory if needed
            Files.createDirectories(target.getParent());
            
            // Copy file
            Files.copy(source, target, 
                StandardCopyOption.REPLACE_EXISTING);
            
            System.out.println("File copied successfully");
            System.out.println("From: " + source.toAbsolutePath());
            System.out.println("To: " + target.toAbsolutePath());
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 3: Directory Listing
List all files in a directory with size information.

```java
import java.nio.file.*;
import java.io.IOException;

public class Exercise3 {
    public static void main(String[] args) {
        Path dir = Paths.get(".");
        
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            System.out.println("Directory contents:");
            System.out.println("Type\tSize\t\tName");
            System.out.println("----\t----\t\t----");
            
            for (Path entry : stream) {
                String type = Files.isDirectory(entry) ? "DIR" : "FILE";
                long size = Files.isRegularFile(entry) ? 
                    Files.size(entry) : 0;
                
                System.out.printf("%s\t%d bytes\t%s%n", 
                    type, size, entry.getFileName());
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 4: Text File Search
Search for a keyword in all text files in a directory.

```java
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class Exercise4 {
    public static void main(String[] args) {
        Path dir = Paths.get(".");
        String keyword = "Java";
        
        try (DirectoryStream<Path> stream = 
                Files.newDirectoryStream(dir, "*.txt")) {
            
            for (Path file : stream) {
                List<String> lines = Files.readAllLines(file);
                
                for (int i = 0; i < lines.size(); i++) {
                    if (lines.get(i).contains(keyword)) {
                        System.out.printf("Found in %s (line %d): %s%n",
                            file.getFileName(), i + 1, lines.get(i));
                    }
                }
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 5: File Organizer
Organize files by extension into subdirectories.

```java
import java.nio.file.*;
import java.io.IOException;

public class Exercise5 {
    public static void main(String[] args) {
        Path sourceDir = Paths.get("downloads");
        
        try (DirectoryStream<Path> stream = 
                Files.newDirectoryStream(sourceDir)) {
            
            for (Path file : stream) {
                if (Files.isRegularFile(file)) {
                    String fileName = file.getFileName().toString();
                    String extension = getExtension(fileName);
                    
                    if (!extension.isEmpty()) {
                        Path targetDir = sourceDir.resolve(extension);
                        Files.createDirectories(targetDir);
                        
                        Path target = targetDir.resolve(fileName);
                        Files.move(file, target, 
                            StandardCopyOption.REPLACE_EXISTING);
                        
                        System.out.println("Moved: " + fileName + 
                            " to " + extension + "/");
                    }
                }
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
    
    private static String getExtension(String fileName) {
        int lastDot = fileName.lastIndexOf('.');
        return (lastDot > 0) ? fileName.substring(lastDot + 1) : "";
    }
}
```

---

### Exercise 6: Duplicate File Finder
Find duplicate files based on size.

```java
import java.nio.file.*;
import java.io.IOException;
import java.util.*;

public class Exercise6 {
    public static void main(String[] args) {
        Path dir = Paths.get(".");
        Map<Long, List<Path>> sizeMap = new HashMap<>();
        
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path file : stream) {
                if (Files.isRegularFile(file)) {
                    long size = Files.size(file);
                    sizeMap.computeIfAbsent(size, k -> new ArrayList<>())
                           .add(file);
                }
            }
            
            System.out.println("Potential duplicates (same size):");
            for (Map.Entry<Long, List<Path>> entry : sizeMap.entrySet()) {
                if (entry.getValue().size() > 1) {
                    System.out.println("\nSize: " + entry.getKey() + " bytes");
                    for (Path file : entry.getValue()) {
                        System.out.println("  - " + file.getFileName());
                    }
                }
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 7: Batch File Rename
Rename multiple files with a pattern.

```java
import java.nio.file.*;
import java.io.IOException;

public class Exercise7 {
    public static void main(String[] args) {
        Path dir = Paths.get("photos");
        String prefix = "vacation_";
        int counter = 1;
        
        try (DirectoryStream<Path> stream = 
                Files.newDirectoryStream(dir, "*.jpg")) {
            
            for (Path file : stream) {
                String newName = String.format("%s%03d.jpg", 
                    prefix, counter++);
                Path target = file.getParent().resolve(newName);
                
                Files.move(file, target);
                System.out.println("Renamed: " + file.getFileName() + 
                    " -> " + newName);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 8: Directory Size Calculator
Calculate total size of all files in a directory.

```java
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Exercise8 {
    public static void main(String[] args) {
        Path dir = Paths.get(".");
        
        try (Stream<Path> stream = Files.walk(dir)) {
            long totalSize = stream
                .filter(Files::isRegularFile)
                .mapToLong(path -> {
                    try {
                        return Files.size(path);
                    } catch (IOException e) {
                        return 0;
                    }
                })
                .sum();
            
            System.out.println("Total size: " + totalSize + " bytes");
            System.out.println("Total size: " + (totalSize / 1024) + " KB");
            System.out.println("Total size: " + (totalSize / 1024 / 1024) + " MB");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 9: File Backup System
Create a simple backup system that copies files to a backup directory.

```java
import java.nio.file.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Exercise9 {
    public static void main(String[] args) {
        Path sourceDir = Paths.get("documents");
        String timestamp = LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        Path backupDir = Paths.get("backups/backup_" + timestamp);
        
        try {
            Files.createDirectories(backupDir);
            
            try (DirectoryStream<Path> stream = 
                    Files.newDirectoryStream(sourceDir)) {
                
                for (Path file : stream) {
                    if (Files.isRegularFile(file)) {
                        Path target = backupDir.resolve(file.getFileName());
                        Files.copy(file, target);
                        System.out.println("Backed up: " + file.getFileName());
                    }
                }
            }
            
            System.out.println("\nBackup completed to: " + backupDir);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

### Exercise 10: Log File Analyzer
Analyze log files and extract error messages.

```java
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class Exercise10 {
    public static void main(String[] args) {
        Path logFile = Paths.get("application.log");
        
        try {
            List<String> lines = Files.readAllLines(logFile);
            int errorCount = 0;
            int warningCount = 0;
            
            System.out.println("=== Log Analysis ===");
            for (String line : lines) {
                if (line.contains("ERROR")) {
                    errorCount++;
                    System.out.println("ERROR: " + line);
                } else if (line.contains("WARNING")) {
                    warningCount++;
                }
            }
            
            System.out.println("\n=== Summary ===");
            System.out.println("Total lines: " + lines.size());
            System.out.println("Errors: " + errorCount);
            System.out.println("Warnings: " + warningCount);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

## 🔑 Key Takeaways

1. **NIO.2 Advantages**: More efficient, feature-rich, better error handling
2. **Path Interface**: Platform-independent path representation
3. **Files Class**: Rich set of static methods for file operations
4. **Reading/Writing**: Simple methods like `readAllLines()`, `writeString()`
5. **File Operations**: Easy copy, move, delete with options
6. **Attributes**: Access file metadata and properties
7. **Directory Operations**: Efficient traversal with DirectoryStream
8. **Try-With-Resources**: Always use for automatic resource management
9. **Streams**: Use Java 8 streams for powerful file processing

---

## 📖 Additional Resources

### Official Documentation:
- [Java NIO.2 Tutorial](https://docs.oracle.com/javase/tutorial/essential/io/fileio.html)
- [Files Class Documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Files.html)
- [Path Interface Documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Path.html)

### Practice Platforms:
- [HackerRank Java](https://www.hackerrank.com/domains/java)
- [LeetCode](https://leetcode.com/)

---

## 🧭 Navigation

### Week 4 Progress:
- [Day 22: File I/O Basics](day22_file_io.md)
- **Day 23: File Operations & NIO** ← You are here
- [Day 24: Serialization](day24_serialization.md)
- [Day 25: Multithreading Basics](day25_multithreading_basics.md)
- [Day 26: Thread Synchronization](day26_thread_synchronization.md)
- [Day 27: Lambda Expressions](day27_lambda_expressions.md)
- [Day 28: Stream API](day28_stream_api.md)
- [Day 29: Date & Time API](day29_date_time_api.md)
- [Day 30: Final Review & Project](day30_final_review.md)

### Related Resources:
- [📝 Day 23 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day23.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Day 23 Checklist

Before moving to Day 24, ensure you can:
- [ ] Create and manipulate Path objects
- [ ] Use Files class for file operations
- [ ] Read and write files using NIO.2 methods
- [ ] Copy, move, and delete files
- [ ] Access file attributes and metadata
- [ ] List directory contents efficiently
- [ ] Walk directory trees
- [ ] Use DirectoryStream for iteration
- [ ] Apply filters when listing files
- [ ] Understand the advantages of NIO.2 over traditional I/O

---

## ⚠️ Common Mistakes

### 1. Path Creation Mistakes

#### ❌ Wrong - Confusing Paths.get() with Path.of():
```java
// WRONG - Not understanding they're equivalent (Java 11+)
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        // Student thinks these are different
        Path path1 = Paths.get("data.txt");
        Path path2 = Path.of("data.txt");

        // Tries to use Path.of() in Java 8 - compilation error!
        // Path path3 = Path.of("file.txt");  // Only Java 11+
    }
}
```
**Issue:** `Path.of()` is newer API (Java 11+); `Paths.get()` works in Java 7+

#### ✅ Right:
```java
// CORRECT - Understand equivalence and version compatibility
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        // Java 7+: Use Paths.get()
        Path path1 = Paths.get("data.txt");

        // Java 11+: Path.of() is equivalent, more direct
        Path path2 = Path.of("data.txt");

        // They create identical Path objects
        System.out.println(path1.equals(path2));  // true

        // Multiple path components
        Path path3 = Paths.get("folder", "subfolder", "file.txt");
        Path path4 = Path.of("folder", "subfolder", "file.txt");

        System.out.println(path3.equals(path4));  // true
    }
}
```

**Why:** `Path.of()` introduced in Java 11 as shorthand; functionally identical to `Paths.get()`.

**💡 Tip:** Use `Paths.get()` for Java 7-10 compatibility; `Path.of()` for Java 11+ projects.

---

#### ❌ Wrong - Creating Path with Wrong Separator:
```java
// WRONG - Hardcoded platform-specific separator
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        // Windows-style path on Unix - incorrect!
        Path path = Paths.get("C:\\Users\\Documents\\file.txt");  // Fails on Unix

        // Unix-style absolute path on Windows - may not work as expected
        Path path2 = Paths.get("/home/user/file.txt");  // Fails on Windows
    }
}
```
**Issue:** Hardcoded separators and drive letters are platform-specific

#### ✅ Right:
```java
// CORRECT - Use forward slashes or path components
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        // Option 1: Forward slashes work on ALL platforms
        Path path1 = Paths.get("folder/subfolder/file.txt");

        // Option 2: Use varargs for path components (best)
        Path path2 = Paths.get("folder", "subfolder", "file.txt");

        // Option 3: Use system property for user-specific paths
        String home = System.getProperty("user.home");
        Path path3 = Paths.get(home, "Documents", "file.txt");

        System.out.println("Path 1: " + path1);
        System.out.println("Path 2: " + path2);
        System.out.println("Path 3: " + path3.toAbsolutePath());
    }
}
```

**Why:** Forward slashes and varargs are platform-independent; Java converts automatically.

**💡 Tip:** Use forward slashes `/` or varargs; avoid backslashes and drive letters.

---

#### ❌ Wrong - Not Understanding Relative vs Absolute Paths:
```java
// WRONG - Assuming relative path behavior
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        // Student doesn't realize where this file is
        System.out.println("Is absolute: " + path.isAbsolute());  // false

        // Depends on current working directory!
        // May be different in IDE vs command line
    }
}
```
**Issue:** Relative paths depend on current working directory; unpredictable

#### ✅ Right:
```java
// CORRECT - Be explicit about path type
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path relativePath = Paths.get("data.txt");

        // Check if absolute
        System.out.println("Is absolute: " + relativePath.isAbsolute());

        // Convert to absolute path for clarity
        Path absolutePath = relativePath.toAbsolutePath();
        System.out.println("Absolute path: " + absolutePath);

        // Show current working directory
        System.out.println("Working directory: " +
            Paths.get(".").toAbsolutePath().normalize());

        // For clarity, use absolute paths or document assumptions
        System.out.println("File will be looked for at: " +
            absolutePath);
    }
}
```

**Why:** Converting to absolute path clarifies file location; helps debugging.

**💡 Tip:** Use `toAbsolutePath()` to see where relative paths resolve; document assumptions.

---

#### ❌ Wrong - Path.of() with Empty String:
```java
// WRONG - Creating path with empty string
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("");  // Empty string - confusing!

        System.out.println("Path: " + path);  // Prints empty
        System.out.println("Absolute: " + path.toAbsolutePath());  // Working directory
    }
}
```
**Issue:** Empty string creates confusing path; use "." for current directory

#### ✅ Right:
```java
// CORRECT - Use "." for current directory explicitly
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        // Explicit current directory
        Path currentDir = Paths.get(".");

        System.out.println("Current directory: " +
            currentDir.toAbsolutePath().normalize());

        // Get user's home directory
        Path homeDir = Paths.get(System.getProperty("user.home"));
        System.out.println("Home directory: " + homeDir);

        // Temp directory
        Path tempDir = Paths.get(System.getProperty("java.io.tmpdir"));
        System.out.println("Temp directory: " + tempDir);
    }
}
```

**Why:** "." explicitly represents current directory; system properties for user/temp directories.

**💡 Tip:** Use "." for current directory, system properties for standard locations.

---

### 2. Path Method Mistakes

#### ❌ Wrong - Confusing getFileName() and getName(i):
```java
// WRONG - Not understanding the difference
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("folder/subfolder/file.txt");

        // Student thinks these are the same
        System.out.println(path.getFileName());  // file.txt
        System.out.println(path.getName(0));     // folder (NOT file.txt!)
    }
}
```
**Issue:** `getFileName()` returns last element; `getName(i)` returns element at index i

#### ✅ Right:
```java
// CORRECT - Understand the difference
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("folder/subfolder/file.txt");

        // getFileName() - returns last element (file name)
        System.out.println("File name: " + path.getFileName());  // file.txt

        // getName(i) - returns element at index i
        System.out.println("Element 0: " + path.getName(0));  // folder
        System.out.println("Element 1: " + path.getName(1));  // subfolder
        System.out.println("Element 2: " + path.getName(2));  // file.txt

        // Get all elements
        System.out.println("Name count: " + path.getNameCount());  // 3
        for (int i = 0; i < path.getNameCount(); i++) {
            System.out.println("  [" + i + "]: " + path.getName(i));
        }
    }
}
```

**Why:** `getFileName()` = last element; `getName(i)` = element at index.

**💡 Tip:** `getFileName()` for file name; `getName(i)` to iterate path elements.

---

#### ❌ Wrong - Not Normalizing Paths Before Comparison:
```java
// WRONG - Comparing unnormalized paths
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path1 = Paths.get("folder/./subfolder/../file.txt");
        Path path2 = Paths.get("folder/file.txt");

        // Direct comparison fails!
        System.out.println(path1.equals(path2));  // false!
        System.out.println(path1);  // folder/./subfolder/../file.txt
        System.out.println(path2);  // folder/file.txt
    }
}
```
**Issue:** Unnormalized paths with `.` and `..` don't compare equal even when equivalent

#### ✅ Right:
```java
// CORRECT - Normalize before comparing
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path1 = Paths.get("folder/./subfolder/../file.txt");
        Path path2 = Paths.get("folder/file.txt");

        // Normalize removes . and .. elements
        Path normalized1 = path1.normalize();
        Path normalized2 = path2.normalize();

        System.out.println("Original path1: " + path1);
        System.out.println("Normalized path1: " + normalized1);  // folder/file.txt

        System.out.println("Are normalized paths equal: " +
            normalized1.equals(normalized2));  // true!

        // Or use toRealPath() for canonical path (resolves symlinks)
        // Note: file must exist for toRealPath()
    }
}
```

**Why:** `normalize()` resolves `.` and `..`; enables accurate comparison.

**💡 Tip:** Always normalize paths before comparison; use `toRealPath()` if files exist.

---

#### ❌ Wrong - Misusing resolve() with Absolute Paths:
```java
// WRONG - resolve() with absolute path
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path base = Paths.get("folder");
        Path absolute = Paths.get("/usr/local/file.txt");

        // resolve() with absolute path returns the absolute path!
        Path result = base.resolve(absolute);
        System.out.println(result);  // /usr/local/file.txt (NOT folder/usr/local/file.txt)
    }
}
```
**Issue:** `resolve()` with absolute path ignores base path; returns absolute path

#### ✅ Right:
```java
// CORRECT - Understand resolve() behavior
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path base = Paths.get("folder");

        // resolve() with relative path - combines paths
        Path relative = Paths.get("subfolder/file.txt");
        Path result1 = base.resolve(relative);
        System.out.println("Base + relative: " + result1);  // folder/subfolder/file.txt

        // resolve() with absolute path - returns absolute path
        Path absolute = Paths.get("/usr/local/file.txt");
        Path result2 = base.resolve(absolute);
        System.out.println("Base + absolute: " + result2);  // /usr/local/file.txt

        // resolve() with string
        Path result3 = base.resolve("file.txt");
        System.out.println("Base + string: " + result3);  // folder/file.txt

        // relativize() - opposite of resolve
        Path path1 = Paths.get("/home/user/docs");
        Path path2 = Paths.get("/home/user/docs/subfolder/file.txt");
        Path relative2 = path1.relativize(path2);
        System.out.println("Relative path: " + relative2);  // subfolder/file.txt
    }
}
```

**Why:** `resolve()` combines paths only if second is relative; returns absolute if absolute.

**💡 Tip:** `resolve()` for relative paths; absolute paths returned as-is.

---

#### ❌ Wrong - Not Checking getParent() for null:
```java
// WRONG - Assuming getParent() never returns null
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("file.txt");

        // Root path has no parent - returns null!
        Path parent = path.getParent();
        System.out.println("Parent length: " + parent.toString().length());  // NullPointerException!
    }
}
```
**Issue:** `getParent()` returns null for single-element paths or root

#### ✅ Right:
```java
// CORRECT - Check for null before using parent
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        testPath(Paths.get("file.txt"));  // Single element
        testPath(Paths.get("folder/file.txt"));  // Has parent
        testPath(Paths.get("/"));  // Root
    }

    public static void testPath(Path path) {
        System.out.println("\nPath: " + path);

        Path parent = path.getParent();
        if (parent != null) {
            System.out.println("Parent: " + parent);
        } else {
            System.out.println("No parent (single element or root)");
        }
    }
}
```

**Why:** Single-element relative paths and root have no parent; returns null.

**💡 Tip:** Always check `getParent() != null` before using result.

---

### 3. Files Existence Checking Mistakes

#### ❌ Wrong - Using exists() with Race Conditions:
```java
// WRONG - Time-of-check to time-of-use race condition
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("data.txt");

        // Check and use pattern - UNSAFE!
        if (Files.exists(path)) {
            // File could be deleted here by another process!
            byte[] data = Files.readAllBytes(path);  // May throw exception
        }
    }
}
```
**Issue:** File could change between check and use; race condition

#### ✅ Right:
```java
// CORRECT - Handle exception instead of checking
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        // Just try the operation - handle failure
        try {
            byte[] data = Files.readAllBytes(path);
            System.out.println("Read " + data.length + " bytes");
        } catch (NoSuchFileException e) {
            System.out.println("File doesn't exist: " + path);
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }

        // If you must check first, minimize window
        if (Files.exists(path)) {
            try {
                byte[] data = Files.readAllBytes(path);
            } catch (NoSuchFileException e) {
                // File disappeared between check and read
                System.out.println("File was deleted");
            } catch (IOException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
}
```

**Why:** TOCTOU (Time-Of-Check-Time-Of-Use) race condition; better to try and handle exception.

**💡 Tip:** Don't check then use; just try operation and handle specific exceptions.

---

#### ❌ Wrong - Confusing exists() and notExists():
```java
// WRONG - Not understanding three-valued logic
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        // Student assumes: if not exists(), then notExists()
        if (!Files.exists(path)) {
            // Not always true! Could be undetermined (e.g., permission denied)
            System.out.println("File doesn't exist");
        }
    }
}
```
**Issue:** `exists()` and `notExists()` can both return false (undetermined state)

#### ✅ Right:
```java
// CORRECT - Understand three-valued logic
import java.nio.file.*;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        // Three possible states:
        if (Files.exists(path)) {
            System.out.println("File definitely exists");
        } else if (Files.notExists(path)) {
            System.out.println("File definitely doesn't exist");
        } else {
            System.out.println("Existence is undetermined");
            // Could be: permission denied, I/O error, etc.
        }

        // For most use cases, just check exists()
        if (Files.exists(path)) {
            // Work with file
            System.out.println("Processing file");
        } else {
            // Handle non-existence (includes undetermined)
            System.out.println("File not accessible");
        }
    }
}
```

**Why:** `exists()` and `notExists()` can both be false (e.g., permission denied).

**💡 Tip:** Usually just check `exists()`; undetermined states treated as non-existent.

---

#### ❌ Wrong - Not Checking File Type Before Operations:
```java
// WRONG - Assuming path is a file
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get(".");

        // Could be directory!
        long size = Files.size(path);  // Works but returns 0 or platform-specific for directory
        System.out.println("Size: " + size);

        // Reading directory as file - error!
        byte[] data = Files.readAllBytes(path);  // IOException!
    }
}
```
**Issue:** Not checking if path is file vs directory before file operations

#### ✅ Right:
```java
// CORRECT - Check file type before operations
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get(".");

        if (Files.isRegularFile(path)) {
            try {
                long size = Files.size(path);
                System.out.println("File size: " + size + " bytes");

                byte[] data = Files.readAllBytes(path);
                System.out.println("Read " + data.length + " bytes");
            } catch (IOException e) {
                System.out.println("Error reading file: " + e.getMessage());
            }
        } else if (Files.isDirectory(path)) {
            System.out.println("Path is a directory");
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(path)) {
                for (Path entry : stream) {
                    System.out.println("  " + entry.getFileName());
                }
            } catch (IOException e) {
                System.out.println("Error listing directory: " + e.getMessage());
            }
        } else {
            System.out.println("Path is neither regular file nor directory");
        }
    }
}
```

**Why:** File operations on directories cause errors; check type first.

**💡 Tip:** Use `isRegularFile()` and `isDirectory()` before type-specific operations.

---

#### ❌ Wrong - Not Following Symbolic Links:
```java
// WRONG - Not understanding link behavior
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path link = Paths.get("link-to-file");

        // By default, Files methods follow links
        System.out.println("Is symlink: " + Files.isSymbolicLink(link));  // true
        System.out.println("Is regular file: " + Files.isRegularFile(link));  // true (follows link)

        // Student confused about behavior
    }
}
```
**Issue:** Not understanding when methods follow vs don't follow symbolic links

#### ✅ Right:
```java
// CORRECT - Understand link following behavior
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path link = Paths.get("link-to-file");

        // isSymbolicLink() - checks the link itself (doesn't follow)
        System.out.println("Is symlink: " + Files.isSymbolicLink(link));

        // isRegularFile() - follows links by default
        System.out.println("Is regular file: " + Files.isRegularFile(link));

        // Don't follow links
        System.out.println("Is regular file (no follow): " +
            Files.isRegularFile(link, LinkOption.NOFOLLOW_LINKS));

        // Read link target
        if (Files.isSymbolicLink(link)) {
            Path target = Files.readSymbolicLink(link);
            System.out.println("Link points to: " + target);
        }

        // Most operations follow links by default
        // Use LinkOption.NOFOLLOW_LINKS to prevent following
    }
}
```

**Why:** Most operations follow links by default; use `NOFOLLOW_LINKS` to prevent.

**💡 Tip:** `isSymbolicLink()` doesn't follow; most others do; use `LinkOption.NOFOLLOW_LINKS` to prevent.

---

### 4. Files Read/Write Mistakes

#### ❌ Wrong - Reading Large Files with readAllLines():
```java
// WRONG - Loading large file into memory
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("large_file.txt");  // 1 GB file

        // Loads entire file into memory - OutOfMemoryError!
        List<String> lines = Files.readAllLines(path);

        for (String line : lines) {
            System.out.println(line);
        }
    }
}
```
**Issue:** `readAllLines()` loads entire file into memory; fails for large files

#### ✅ Right:
```java
// CORRECT - Stream large files line by line
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("large_file.txt");

        // Stream lines - memory efficient
        try (Stream<String> lines = Files.lines(path)) {
            lines.forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Or use BufferedReader for more control
        try (var reader = Files.newBufferedReader(path)) {
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

**Why:** Streaming reads one line at a time; constant memory usage regardless of file size.

**💡 Tip:** Use `Files.lines()` or `BufferedReader` for large files; `readAllLines()` only for small files.

---

#### ❌ Wrong - Not Specifying Charset:
```java
// WRONG - Using platform default charset
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("data.txt");

        // Uses platform default charset - inconsistent across systems!
        List<String> lines = Files.readAllLines(path);

        // Writing with default charset
        Files.writeString(path, "Héllo Wörld");  // Encoding depends on platform!
    }
}
```
**Issue:** Default charset varies by platform; causes issues with non-ASCII characters

#### ✅ Right:
```java
// CORRECT - Explicitly specify UTF-8
import java.nio.file.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        try {
            // Read with explicit UTF-8
            List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);

            for (String line : lines) {
                System.out.println(line);
            }

            // Write with explicit UTF-8
            Files.writeString(path, "Héllo Wörld", StandardCharsets.UTF_8);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Explicit charset ensures consistent behavior across all platforms.

**💡 Tip:** Always specify `StandardCharsets.UTF_8` for text files; platform-independent.

---

#### ❌ Wrong - Overwriting Files Accidentally:
```java
// WRONG - write() overwrites by default
import java.nio.file.*;
import java.io.IOException;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("data.txt");

        // First write
        Files.write(path, Arrays.asList("Line 1", "Line 2"));

        // Second write - OVERWRITES first content!
        Files.write(path, Arrays.asList("Line 3"));

        // File now contains only "Line 3"!
    }
}
```
**Issue:** `write()` overwrites by default; previous content lost

#### ✅ Right:
```java
// CORRECT - Use APPEND option to add to file
import java.nio.file.*;
import java.io.IOException;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        try {
            // First write (create or overwrite)
            Files.write(path, Arrays.asList("Line 1", "Line 2"));

            // Append to file
            Files.write(path, Arrays.asList("Line 3"),
                StandardOpenOption.APPEND);

            // File now contains all three lines
            Files.readAllLines(path).forEach(System.out::println);

            // Or use writeString with APPEND
            Files.writeString(path, "\nLine 4",
                StandardOpenOption.APPEND);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Default behavior overwrites; use `StandardOpenOption.APPEND` to add content.

**💡 Tip:** Use `APPEND` option to add to existing files; default overwrites.

---

#### ❌ Wrong - Not Handling NoSuchFileException:
```java
// WRONG - Catching only IOException
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("missing.txt");

        try {
            byte[] data = Files.readAllBytes(path);
        } catch (IOException e) {
            // Can't distinguish between file not found and other I/O errors
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Catching generic IOException can't distinguish specific errors

#### ✅ Right:
```java
// CORRECT - Catch specific exceptions
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("missing.txt");

        try {
            byte[] data = Files.readAllBytes(path);
            System.out.println("Read " + data.length + " bytes");

        } catch (NoSuchFileException e) {
            System.out.println("File not found: " + e.getFile());
            // Create file or use default data

        } catch (AccessDeniedException e) {
            System.out.println("Access denied: " + e.getFile());
            // Check permissions

        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
            // General I/O error handling
        }
    }
}
```

**Why:** Specific exceptions enable targeted error handling and better user messages.

**💡 Tip:** Catch `NoSuchFileException`, `AccessDeniedException` before generic `IOException`.

---

### 5. File Copy/Move/Delete Mistakes

#### ❌ Wrong - Copy Without REPLACE_EXISTING:
```java
// WRONG - Assuming copy fails if target exists
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path source = Paths.get("source.txt");
        Path target = Paths.get("target.txt");

        // Fails if target already exists!
        Files.copy(source, target);  // FileAlreadyExistsException!
    }
}
```
**Issue:** `copy()` throws exception if target exists without `REPLACE_EXISTING`

#### ✅ Right:
```java
// CORRECT - Use REPLACE_EXISTING or check first
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path source = Paths.get("source.txt");
        Path target = Paths.get("target.txt");

        try {
            // Option 1: Replace if exists
            Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied (replaced if existed)");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Option 2: Check and handle
        try {
            if (Files.exists(target)) {
                System.out.println("Target exists, asking user...");
                // Ask user for confirmation
                // For now, just replace
            }
            Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `REPLACE_EXISTING` prevents exception; allows intentional overwriting.

**💡 Tip:** Use `REPLACE_EXISTING` to overwrite or check `exists()` first.

---

#### ❌ Wrong - Thinking copy() Copies Directory Contents:
```java
// WRONG - Expecting directory tree copy
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path sourceDir = Paths.get("sourceDir");
        Path targetDir = Paths.get("targetDir");

        // Only copies the directory itself, NOT contents!
        Files.copy(sourceDir, targetDir);

        // Contents not copied!
    }
}
```
**Issue:** `copy()` only copies directory structure, not contents; need recursive copy

#### ✅ Right:
```java
// CORRECT - Recursive copy for directories
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path sourceDir = Paths.get("sourceDir");
        Path targetDir = Paths.get("targetDir");

        try {
            copyDirectory(sourceDir, targetDir);
            System.out.println("Directory copied recursively");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static void copyDirectory(Path source, Path target) throws IOException {
        try (Stream<Path> stream = Files.walk(source)) {
            stream.forEach(src -> {
                try {
                    Path dest = target.resolve(source.relativize(src));
                    if (Files.isDirectory(src)) {
                        Files.createDirectories(dest);
                    } else {
                        Files.copy(src, dest, StandardCopyOption.REPLACE_EXISTING);
                    }
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
        }
    }
}
```

**Why:** `copy()` for directories only creates target dir; need `walk()` for recursive copy.

**💡 Tip:** Use `Files.walk()` with `copy()` to recursively copy directory trees.

---

#### ❌ Wrong - Not Understanding ATOMIC_MOVE:
```java
// WRONG - Assuming move() is always atomic
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path source = Paths.get("source.txt");
        Path target = Paths.get("/different/filesystem/target.txt");

        // Move is NOT atomic across filesystems!
        Files.move(source, target);  // Copy + delete, not atomic

        // If system crashes mid-operation, could lose data!
    }
}
```
**Issue:** `move()` across filesystems is copy+delete, not atomic; can fail partially

#### ✅ Right:
```java
// CORRECT - Request ATOMIC_MOVE or handle failure
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path source = Paths.get("source.txt");
        Path target = Paths.get("target.txt");  // Same filesystem

        try {
            // Request atomic move (fails if not possible)
            Files.move(source, target, StandardCopyOption.ATOMIC_MOVE);
            System.out.println("File moved atomically");

        } catch (AtomicMoveNotSupportedException e) {
            System.out.println("Atomic move not supported");
            // Fall back to regular move
            try {
                Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("File moved (non-atomic)");
            } catch (IOException ex) {
                System.out.println("Error: " + ex.getMessage());
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `ATOMIC_MOVE` ensures all-or-nothing operation; throws exception if impossible.

**💡 Tip:** Use `ATOMIC_MOVE` for safety; handle exception if not supported.

---

#### ❌ Wrong - Not Checking delete() vs deleteIfExists():
```java
// WRONG - delete() throws exception if file doesn't exist
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("maybe-exists.txt");

        // Throws NoSuchFileException if file doesn't exist!
        Files.delete(path);
    }
}
```
**Issue:** `delete()` throws exception if file doesn't exist; use `deleteIfExists()` for safety

#### ✅ Right:
```java
// CORRECT - Choose appropriate delete method
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("maybe-exists.txt");

        // Option 1: deleteIfExists() - no exception if doesn't exist
        try {
            boolean deleted = Files.deleteIfExists(path);
            if (deleted) {
                System.out.println("File deleted");
            } else {
                System.out.println("File didn't exist");
            }
        } catch (IOException e) {
            System.out.println("Error deleting: " + e.getMessage());
        }

        // Option 2: delete() - throws exception if doesn't exist
        try {
            Files.delete(path);
            System.out.println("File deleted");
        } catch (NoSuchFileException e) {
            System.out.println("File doesn't exist");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `deleteIfExists()` returns boolean, no exception; `delete()` throws if missing.

**💡 Tip:** Use `deleteIfExists()` when unsure if file exists; `delete()` when must exist.

---

### 6. File Attributes Mistakes

#### ❌ Wrong - Not Understanding FileTime:
```java
// WRONG - Comparing FileTime incorrectly
import java.nio.file.*;
import java.nio.file.attribute.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("data.txt");
        BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);

        // Getting as FileTime but treating as regular timestamp
        FileTime modified = attrs.lastModifiedTime();

        // Wrong comparison
        long millis = modified.toMillis();
        System.out.println(millis);  // Just prints number, not human-readable
    }
}
```
**Issue:** `FileTime` needs conversion for human-readable display

#### ✅ Right:
```java
// CORRECT - Convert FileTime properly
import java.nio.file.*;
import java.nio.file.attribute.*;
import java.io.IOException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        try {
            BasicFileAttributes attrs =
                Files.readAttributes(path, BasicFileAttributes.class);

            FileTime modified = attrs.lastModifiedTime();

            // Convert to millis
            long millis = modified.toMillis();
            System.out.println("Millis: " + millis);

            // Convert to Instant
            Instant instant = modified.toInstant();
            System.out.println("Instant: " + instant);

            // Format for display
            DateTimeFormatter formatter = DateTimeFormatter
                .ofPattern("yyyy-MM-dd HH:mm:ss")
                .withZone(ZoneId.systemDefault());
            System.out.println("Formatted: " + formatter.format(instant));

            // Compare FileTimes
            FileTime created = attrs.creationTime();
            if (modified.compareTo(created) > 0) {
                System.out.println("File was modified after creation");
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** `FileTime` has specific methods for conversion and comparison.

**💡 Tip:** Use `toInstant()` for conversion; `compareTo()` for comparison.

---

#### ❌ Wrong - Modifying Attributes Without Checking Support:
```java
// WRONG - Assuming all attributes can be modified
import java.nio.file.*;
import java.nio.file.attribute.*;
import java.io.IOException;
import java.time.Instant;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("data.txt");

        // Not all systems support setting creation time!
        FileTime newTime = FileTime.from(Instant.now());
        Files.setAttribute(path, "creationTime", newTime);  // May fail!
    }
}
```
**Issue:** Not all attributes modifiable on all platforms; may throw exception

#### ✅ Right:
```java
// CORRECT - Check support and handle exceptions
import java.nio.file.*;
import java.nio.file.attribute.*;
import java.io.IOException;
import java.time.Instant;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");
        FileTime newTime = FileTime.from(Instant.now().minusSeconds(86400));

        try {
            // Setting last modified time is widely supported
            Files.setLastModifiedTime(path, newTime);
            System.out.println("Modified time updated");

            // Creation time may not be supported on all systems
            try {
                Files.setAttribute(path, "creationTime", newTime);
                System.out.println("Creation time updated");
            } catch (UnsupportedOperationException e) {
                System.out.println("Creation time modification not supported");
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Attribute modification support varies by platform; handle exceptions.

**💡 Tip:** `setLastModifiedTime()` widely supported; others may not be; handle exceptions.

---

#### ❌ Wrong - Using size() on Directory:
```java
// WRONG - Thinking size() gives directory size
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path dir = Paths.get(".");

        // Returns 0 or platform-specific value for directory
        long size = Files.size(dir);
        System.out.println("Directory size: " + size);  // NOT total content size!
    }
}
```
**Issue:** `size()` on directory doesn't return total content size

#### ✅ Right:
```java
// CORRECT - Calculate directory size by walking tree
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path dir = Paths.get(".");

        try {
            long totalSize = calculateDirectorySize(dir);
            System.out.println("Total directory size: " + totalSize + " bytes");
            System.out.println("Total directory size: " + (totalSize / 1024) + " KB");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static long calculateDirectorySize(Path dir) throws IOException {
        try (Stream<Path> stream = Files.walk(dir)) {
            return stream
                .filter(Files::isRegularFile)
                .mapToLong(path -> {
                    try {
                        return Files.size(path);
                    } catch (IOException e) {
                        return 0L;
                    }
                })
                .sum();
        }
    }
}
```

**Why:** `size()` for directories returns metadata size; walk tree to sum file sizes.

**💡 Tip:** Use `Files.walk()` with `size()` to calculate total directory size.

---

#### ❌ Wrong - Ignoring File Permissions:
```java
// WRONG - Not checking if file is readable/writable
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("protected.txt");

        // May not have permission!
        byte[] data = Files.readAllBytes(path);  // AccessDeniedException!
    }
}
```
**Issue:** Not checking permissions before operations can cause exceptions

#### ✅ Right:
```java
// CORRECT - Check permissions before operations
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("protected.txt");

        // Check permissions
        if (!Files.isReadable(path)) {
            System.out.println("File is not readable");
            return;
        }

        if (!Files.isWritable(path)) {
            System.out.println("File is not writable (read-only)");
        }

        if (!Files.isExecutable(path)) {
            System.out.println("File is not executable");
        }

        // Now safe to read
        try {
            byte[] data = Files.readAllBytes(path);
            System.out.println("Read " + data.length + " bytes");
        } catch (AccessDeniedException e) {
            System.out.println("Access denied: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Checking permissions provides better error messages and user experience.

**💡 Tip:** Use `isReadable()`, `isWritable()`, `isExecutable()` before operations.

---

### 7. Directory Traversal Mistakes

#### ❌ Wrong - Not Closing DirectoryStream:
```java
// WRONG - Resource leak
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path dir = Paths.get(".");

        // Not using try-with-resources - resource leak!
        DirectoryStream<Path> stream = Files.newDirectoryStream(dir);
        for (Path entry : stream) {
            System.out.println(entry.getFileName());
        }
        // Forgot to close! Resource leak
    }
}
```
**Issue:** `DirectoryStream` must be closed to free resources

#### ✅ Right:
```java
// CORRECT - Always use try-with-resources
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path dir = Paths.get(".");

        // Try-with-resources ensures closure
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path entry : stream) {
                System.out.println(entry.getFileName());
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Stream automatically closed here
    }
}
```

**Why:** `DirectoryStream` implements `AutoCloseable`; must be closed to free resources.

**💡 Tip:** Always use try-with-resources for `DirectoryStream`.

---

#### ❌ Wrong - Unlimited walk() Depth:
```java
// WRONG - Walking entire tree without limit
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        Path start = Paths.get("/");

        // Walks ENTIRE filesystem - could take forever!
        try (Stream<Path> stream = Files.walk(start)) {
            stream.forEach(System.out::println);
        }
    }
}
```
**Issue:** Unlimited walk can traverse entire filesystem; very slow and risky

#### ✅ Right:
```java
// CORRECT - Limit walk depth
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path start = Paths.get(".");

        try {
            // Walk with depth limit (current + 2 levels)
            try (Stream<Path> stream = Files.walk(start, 2)) {
                stream.filter(Files::isRegularFile)
                      .forEach(path -> System.out.println(path.getFileName()));
            }

            // Or with depth limit and conditions
            try (Stream<Path> stream = Files.find(start, 3,
                    (path, attrs) -> attrs.isRegularFile() &&
                                     path.toString().endsWith(".txt"))) {
                stream.forEach(System.out::println);
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Depth limit prevents excessive traversal; improves performance and safety.

**💡 Tip:** Always specify reasonable depth limit for `walk()` and `find()`.

---

#### ❌ Wrong - Not Handling Exceptions in walk():
```java
// WRONG - Stream operations hiding exceptions
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        Path start = Paths.get(".");

        try (Stream<Path> stream = Files.walk(start)) {
            stream.forEach(path -> {
                try {
                    System.out.println(Files.size(path));  // May throw
                } catch (IOException e) {
                    // Swallowed! Walk continues but error invisible
                }
            });
        }
    }
}
```
**Issue:** Exceptions in stream operations can be silently swallowed

#### ✅ Right:
```java
// CORRECT - Properly handle exceptions in walk
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path start = Paths.get(".");

        try (Stream<Path> stream = Files.walk(start, 2)) {
            stream.forEach(path -> {
                try {
                    if (Files.isRegularFile(path)) {
                        long size = Files.size(path);
                        System.out.printf("%s: %d bytes%n",
                            path.getFileName(), size);
                    }
                } catch (IOException e) {
                    System.err.println("Error processing " + path + ": " +
                        e.getMessage());
                    // Log error but continue processing other files
                }
            });
        } catch (IOException e) {
            System.out.println("Error walking directory: " + e.getMessage());
        }
    }
}
```

**Why:** Proper error logging helps debugging; prevents silent failures.

**💡 Tip:** Log errors in stream operations; don't silently swallow exceptions.

---

#### ❌ Wrong - Modifying Directory While Iterating:
```java
// WRONG - Modifying directory during iteration
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path dir = Paths.get(".");

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path entry : stream) {
                if (entry.toString().endsWith(".tmp")) {
                    // Deleting while iterating - may cause issues!
                    Files.delete(entry);
                }
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Modifying directory while iterating can cause unpredictable behavior

#### ✅ Right:
```java
// CORRECT - Collect entries first, then modify
import java.nio.file.*;
import java.io.IOException;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Path dir = Paths.get(".");
        List<Path> toDelete = new ArrayList<>();

        // First pass: collect entries to delete
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir, "*.tmp")) {
            for (Path entry : stream) {
                toDelete.add(entry);
            }
        } catch (IOException e) {
            System.out.println("Error listing: " + e.getMessage());
            return;
        }

        // Second pass: delete collected entries
        for (Path entry : toDelete) {
            try {
                Files.deleteIfExists(entry);
                System.out.println("Deleted: " + entry.getFileName());
            } catch (IOException e) {
                System.out.println("Error deleting " + entry + ": " +
                    e.getMessage());
            }
        }
    }
}
```

**Why:** Collecting entries before modification prevents iterator issues.

**💡 Tip:** Collect entries first, then modify; don't modify during iteration.

---

### 8. Stream Resource Management Mistakes

#### ❌ Wrong - Not Closing Files.lines():
```java
// WRONG - Resource leak with Files.lines()
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("data.txt");

        // Creates stream but doesn't close - resource leak!
        Stream<String> lines = Files.lines(path);
        lines.forEach(System.out::println);
        // Stream not closed! Resource leak
    }
}
```
**Issue:** `Files.lines()` returns stream that must be closed to free file handle

#### ✅ Right:
```java
// CORRECT - Always close stream from Files.lines()
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        // Try-with-resources ensures stream closure
        try (Stream<String> lines = Files.lines(path)) {
            lines.forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Stream automatically closed, file handle released
    }
}
```

**Why:** `Files.lines()` holds file open; must close to release file handle.

**💡 Tip:** Always use try-with-resources for `Files.lines()`, `walk()`, `find()`, `list()`.

---

#### ❌ Wrong - Reusing Closed Stream:
```java
// WRONG - Trying to reuse closed stream
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        try (Stream<String> lines = Files.lines(path)) {
            long count = lines.count();
            System.out.println("Line count: " + count);

            // Stream already consumed and closed!
            lines.forEach(System.out::println);  // IllegalStateException!
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Streams can only be used once; closed after terminal operation

#### ✅ Right:
```java
// CORRECT - Create new stream for each operation
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        // First operation: count lines
        try (Stream<String> lines = Files.lines(path)) {
            long count = lines.count();
            System.out.println("Line count: " + count);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Second operation: print lines (new stream)
        try (Stream<String> lines = Files.lines(path)) {
            lines.forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** Streams single-use; create new stream for each operation.

**💡 Tip:** Can't reuse streams; create new stream for each terminal operation.

---

#### ❌ Wrong - Collecting Large Stream to List:
```java
// WRONG - Collecting large file stream to memory
import java.nio.file.*;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("huge_file.txt");  // 1 GB file

        try (Stream<String> lines = Files.lines(path)) {
            // Loads entire file into memory - OutOfMemoryError!
            List<String> allLines = lines.collect(Collectors.toList());

            for (String line : allLines) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Collecting large stream to list defeats streaming benefits; memory exhaustion

#### ✅ Right:
```java
// CORRECT - Process stream without collecting
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("huge_file.txt");

        // Process line by line without collecting
        try (Stream<String> lines = Files.lines(path)) {
            lines.filter(line -> line.contains("ERROR"))
                 .map(String::toUpperCase)
                 .forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Memory usage constant regardless of file size
    }
}
```

**Why:** Streaming processes one element at a time; constant memory usage.

**💡 Tip:** Don't collect large streams; process with `forEach()`, `reduce()`, etc.

---

#### ❌ Wrong - Not Handling Parallel Stream Exceptions:
```java
// WRONG - Parallel processing without proper error handling
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path dir = Paths.get(".");

        try (Stream<Path> stream = Files.walk(dir, 2)) {
            stream.parallel()
                  .filter(Files::isRegularFile)
                  .forEach(path -> {
                      // Exception in parallel stream - hard to debug!
                      try {
                          System.out.println(Files.size(path));
                      } catch (IOException e) {
                          throw new RuntimeException(e);  // Lost in parallel execution
                      }
                  });
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Exceptions in parallel streams harder to track and handle

#### ✅ Right:
```java
// CORRECT - Handle errors appropriately in parallel streams
import java.nio.file.*;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path dir = Paths.get(".");
        AtomicInteger errorCount = new AtomicInteger(0);

        try (Stream<Path> stream = Files.walk(dir, 2)) {
            stream.parallel()
                  .filter(Files::isRegularFile)
                  .forEach(path -> {
                      try {
                          long size = Files.size(path);
                          System.out.printf("%s: %d bytes%n",
                              path.getFileName(), size);
                      } catch (IOException e) {
                          errorCount.incrementAndGet();
                          System.err.println("Error processing " + path +
                              ": " + e.getMessage());
                      }
                  });

            if (errorCount.get() > 0) {
                System.err.println("Total errors: " + errorCount.get());
            }

        } catch (IOException e) {
            System.out.println("Error walking directory: " + e.getMessage());
        }
    }
}
```

**Why:** Proper error handling and tracking in parallel streams aids debugging.

**💡 Tip:** Use atomic counters for error tracking; log errors in parallel streams.

---

### 9. File Operation Exception Handling Mistakes

#### ❌ Wrong - Catching FileSystemException Too Broadly:
```java
// WRONG - Catching too broadly
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        try {
            byte[] data = Files.readAllBytes(path);
        } catch (Exception e) {  // Too broad!
            System.out.println("Error: " + e.getMessage());
            // Can't distinguish between different error types
        }
    }
}
```
**Issue:** Generic exception catching loses specific error information

#### ✅ Right:
```java
// CORRECT - Catch specific exceptions
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        try {
            byte[] data = Files.readAllBytes(path);
            System.out.println("Read " + data.length + " bytes");

        } catch (NoSuchFileException e) {
            System.out.println("File not found: " + e.getFile());
            // Create file or prompt user

        } catch (AccessDeniedException e) {
            System.out.println("Access denied to: " + e.getFile());
            // Check permissions or prompt for elevated access

        } catch (FileSystemException e) {
            System.out.println("File system error: " + e.getReason());
            // Handle other file system errors

        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
            // Handle general I/O errors
        }
    }
}
```

**Why:** Specific exceptions enable targeted error handling and better user messages.

**💡 Tip:** Catch specific exceptions first: `NoSuchFileException`, `AccessDeniedException`, then general `IOException`.

---

#### ❌ Wrong - Not Providing Context in Error Messages:
```java
// WRONG - Generic error messages
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void processFiles(String[] filenames) {
        for (String filename : filenames) {
            Path path = Paths.get(filename);
            try {
                byte[] data = Files.readAllBytes(path);
            } catch (IOException e) {
                System.out.println("Error");  // Which file? What error?
            }
        }
    }
}
```
**Issue:** Error messages lack context; can't identify which file or operation failed

#### ✅ Right:
```java
// CORRECT - Provide detailed context
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void processFiles(String[] filenames) {
        int successCount = 0;
        int errorCount = 0;

        for (String filename : filenames) {
            Path path = Paths.get(filename);
            try {
                byte[] data = Files.readAllBytes(path);
                System.out.println("Successfully read " + filename +
                    " (" + data.length + " bytes)");
                successCount++;

            } catch (NoSuchFileException e) {
                System.err.println("File not found: " + filename);
                errorCount++;

            } catch (AccessDeniedException e) {
                System.err.println("Access denied to: " + filename);
                errorCount++;

            } catch (IOException e) {
                System.err.println("Error reading " + filename + ": " +
                    e.getMessage());
                errorCount++;
            }
        }

        System.out.println("\nSummary: " + successCount + " succeeded, " +
            errorCount + " failed");
    }
}
```

**Why:** Detailed error messages with context enable faster debugging and better UX.

**💡 Tip:** Include filename, operation, and specific error details in messages.

---

#### ❌ Wrong - Silently Continuing After Critical Error:
```java
// WRONG - Continuing after critical error
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path configFile = Paths.get("config.properties");

        try {
            String config = Files.readString(configFile);
            // Parse config
        } catch (IOException e) {
            // Silently continue without config - may cause crashes later!
        }

        // Rest of application runs without proper configuration!
        System.out.println("Application started");
    }
}
```
**Issue:** Silently continuing after critical error causes failures later

#### ✅ Right:
```java
// CORRECT - Handle critical errors appropriately
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path configFile = Paths.get("config.properties");
        String config = null;

        try {
            config = Files.readString(configFile);
        } catch (NoSuchFileException e) {
            System.err.println("Configuration file not found: " + configFile);
            System.err.println("Creating default configuration...");
            config = createDefaultConfig();

        } catch (IOException e) {
            System.err.println("FATAL: Cannot read configuration: " +
                e.getMessage());
            System.err.println("Application cannot start without configuration");
            System.exit(1);  // Exit for critical errors
        }

        if (config == null || config.isEmpty()) {
            System.err.println("FATAL: Configuration is empty");
            System.exit(1);
        }

        System.out.println("Application started with valid configuration");
    }

    private static String createDefaultConfig() {
        // Create and return default configuration
        return "default=value";
    }
}
```

**Why:** Critical errors should prevent application from continuing in invalid state.

**💡 Tip:** Exit or throw for critical errors; don't silently continue.

---

#### ❌ Wrong - Not Cleaning Up on Error:
```java
// WRONG - Leaving partial files on error
import java.nio.file.*;
import java.io.IOException;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Path tempFile = Paths.get("temp_output.txt");
        Path finalFile = Paths.get("final_output.txt");

        try {
            Files.write(tempFile, Arrays.asList("Line 1"));

            // Something goes wrong here
            throw new RuntimeException("Processing error");

            // temp_output.txt left on disk!
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            // Forgot to clean up temp file!
        }
    }
}
```
**Issue:** Not cleaning up temporary files on error; disk clutter

#### ✅ Right:
```java
// CORRECT - Clean up on error
import java.nio.file.*;
import java.io.IOException;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Path tempFile = Paths.get("temp_output.txt");
        Path finalFile = Paths.get("final_output.txt");

        try {
            Files.write(tempFile, Arrays.asList("Line 1", "Line 2"));

            // Process data
            processData(tempFile);

            // Move temp to final on success
            Files.move(tempFile, finalFile, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Processing completed successfully");

        } catch (Exception e) {
            System.err.println("Error during processing: " + e.getMessage());

            // Clean up temporary file on error
            try {
                Files.deleteIfExists(tempFile);
                System.out.println("Cleaned up temporary file");
            } catch (IOException cleanupError) {
                System.err.println("Error cleaning up: " +
                    cleanupError.getMessage());
            }
        }
    }

    private static void processData(Path file) throws IOException {
        // Process file
    }
}
```

**Why:** Cleaning up temporary files on error prevents disk clutter and leaks.

**💡 Tip:** Always clean up temporary files in catch/finally blocks.

---

### 10. Performance Mistakes

#### ❌ Wrong - Opening File Multiple Times in Loop:
```java
// WRONG - Opening file repeatedly
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        for (int i = 0; i < 100; i++) {
            try {
                // Opening and reading file 100 times!
                List<String> lines = Files.readAllLines(path);
                processLines(lines);
            } catch (IOException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }

    private static void processLines(List<String> lines) {
        // Process lines
    }
}
```
**Issue:** Opening file repeatedly is extremely slow; huge I/O overhead

#### ✅ Right:
```java
// CORRECT - Read once, process multiple times
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        try {
            // Read file once
            List<String> lines = Files.readAllLines(path);

            // Process multiple times
            for (int i = 0; i < 100; i++) {
                processLines(lines);
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    private static void processLines(List<String> lines) {
        // Process lines
    }
}
```

**Why:** Reading once and caching dramatically improves performance.

**💡 Tip:** Read file once outside loop; cache and reuse data.

---

#### ❌ Wrong - Not Using NIO.2 When Available:
```java
// WRONG - Using old java.io when NIO.2 available
import java.io.*;

public class Main {
    public static void main(String[] args) {
        File source = new File("source.txt");
        File target = new File("target.txt");

        // Old way - verbose and less efficient
        try (FileInputStream in = new FileInputStream(source);
             FileOutputStream out = new FileOutputStream(target)) {

            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```
**Issue:** Old java.io is more verbose and often less efficient than NIO.2

#### ✅ Right:
```java
// CORRECT - Use NIO.2 for cleaner, more efficient code
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Path source = Paths.get("source.txt");
        Path target = Paths.get("target.txt");

        // NIO.2 way - simple and efficient
        try {
            Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied successfully");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** NIO.2 is cleaner, more efficient, and provides better abstractions.

**💡 Tip:** Use NIO.2 (`java.nio.file.*`) instead of old java.io when possible.

---

#### ❌ Wrong - Creating Unnecessary Intermediate Collections:
```java
// WRONG - Creating unnecessary intermediate lists
import java.nio.file.*;
import java.io.IOException;
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("data.txt");

        // Creates two intermediate lists!
        List<String> allLines = Files.readAllLines(path);
        List<String> filtered = allLines.stream()
            .filter(line -> line.startsWith("ERROR"))
            .collect(Collectors.toList());

        List<String> uppercased = filtered.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        uppercased.forEach(System.out::println);
    }
}
```
**Issue:** Creating intermediate collections wastes memory and time

#### ✅ Right:
```java
// CORRECT - Stream without intermediate collections
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path path = Paths.get("data.txt");

        // Stream directly without intermediate collections
        try (Stream<String> lines = Files.lines(path)) {
            lines.filter(line -> line.startsWith("ERROR"))
                 .map(String::toUpperCase)
                 .forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Memory efficient, single pass through data
    }
}
```

**Why:** Streaming without intermediate collections is more memory efficient.

**💡 Tip:** Use `Files.lines()` with stream operations; avoid intermediate collections.

---

#### ❌ Wrong - Not Using Efficient Directory Listing:
```java
// WRONG - Inefficient directory processing
import java.nio.file.*;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Path dir = Paths.get(".");

        // Loads all paths into array, then iterates
        Path[] paths = Files.list(dir).toArray(Path[]::new);

        for (Path path : paths) {
            if (Files.isRegularFile(path)) {
                System.out.println(path.getFileName());
            }
        }
    }
}
```
**Issue:** Converting stream to array wastes memory; unnecessary allocation

#### ✅ Right:
```java
// CORRECT - Use DirectoryStream or stream directly
import java.nio.file.*;
import java.io.IOException;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path dir = Paths.get(".");

        // Option 1: DirectoryStream (for-each friendly)
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
            for (Path path : stream) {
                if (Files.isRegularFile(path)) {
                    System.out.println(path.getFileName());
                }
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Option 2: Stream (functional style)
        try (Stream<Path> stream = Files.list(dir)) {
            stream.filter(Files::isRegularFile)
                  .map(Path::getFileName)
                  .forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Why:** DirectoryStream and Stream avoid intermediate allocations; more efficient.

**💡 Tip:** Use `DirectoryStream` or stream directly; don't convert to array/list unless needed.

---

This comprehensive list contains **40+ File Operations & NIO mistakes** covering all fundamental concepts!

---

**🎉 Congratulations on completing Day 23!**

You've mastered advanced file operations with NIO.2. Tomorrow, we'll explore object serialization.

**Next**: [Day 24: Serialization →](day24_serialization.md)

---

*Last Updated: 2026-01-09*