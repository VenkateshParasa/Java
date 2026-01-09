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

**🎉 Congratulations on completing Day 23!**

You've mastered advanced file operations with NIO.2. Tomorrow, we'll explore object serialization.

**Next**: [Day 24: Serialization →](day24_serialization.md)

---

*Last Updated: 2026-01-09*