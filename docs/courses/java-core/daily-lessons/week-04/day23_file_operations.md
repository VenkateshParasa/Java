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


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 2: File Copy Utility
Create a utility to copy files with progress indication.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 3: Directory Listing
List all files in a directory with size information.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 4: Text File Search
Search for a keyword in all text files in a directory.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 5: File Organizer
Organize files by extension into subdirectories.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 6: Duplicate File Finder
Find duplicate files based on size.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 7: Batch File Rename
Rename multiple files with a pattern.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 8: Directory Size Calculator
Calculate total size of all files in a directory.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 9: File Backup System
Create a simple backup system that copies files to a backup directory.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 10: Log File Analyzer
Analyze log files and extract error messages.


<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 11: File Manager with NIO.2 Operations

**📝 Problem Statement:**
Create a comprehensive file management system demonstrating advanced NIO.2 operations including copying files with options, moving files between directories, deleting files safely, reading and modifying file attributes, checking file properties, and building a production-grade file utility. The system should use Path and Files classes for all operations, handle symbolic links correctly, preserve file timestamps during copy, support atomic move operations, provide detailed file information including size, permissions, and timestamps, and demonstrate the advantages of NIO.2 over traditional java.io for file management tasks.

**Requirements:**
- Use Path and Paths (or Path.of) for file/directory references
- Copy files using Files.copy() with CopyOption (REPLACE_EXISTING, COPY_ATTRIBUTES)
- Move files using Files.move() with StandardCopyOption.ATOMIC_MOVE when possible
- Delete files using Files.delete() or Files.deleteIfExists()
- Check file existence, readability, writability using Files methods
- Read file attributes: size, creation time, last modified time, last access time
- Modify file attributes: set last modified time, set read-only
- Detect file type: regular file, directory, symbolic link
- Get file permissions and owner information
- Handle exceptions: FileAlreadyExistsException, NoSuchFileException, DirectoryNotEmptyException
- Demonstrate atomic operations where available
- Use try-with-resources where applicable
- Display human-readable file sizes and timestamps
- Support batch operations (copy/move/delete multiple files)

**Sample Test Cases:**
```
Input: File operations on sample files
source/document.txt (1024 bytes, modified: 2024-01-10 10:00:00)
source/image.jpg (50 KB, read-only)
destination/ (empty directory)

Expected Output:
=== NIO.2 File Manager ===

=== File Information ===

Analyzing: source/document.txt
  Type: Regular File
  Size: 1.00 KB (1024 bytes)
  Readable: ✓ Yes
  Writable: ✓ Yes
  Executable: ✗ No
  Hidden: ✗ No
  Created: 2024-01-10 09:30:00
  Modified: 2024-01-10 10:00:00
  Accessed: 2024-01-10 10:15:00
  Owner: user@domain

Analyzing: source/image.jpg
  Type: Regular File
  Size: 50.00 KB (51200 bytes)
  Readable: ✓ Yes
  Writable: ✗ No (read-only)
  Executable: ✗ No
  Hidden: ✗ No
  Created: 2024-01-09 14:20:00
  Modified: 2024-01-09 14:20:00
  Accessed: 2024-01-10 10:15:00

=== Copy Operations ===

Copying source/document.txt → destination/document.txt
  Options: REPLACE_EXISTING, COPY_ATTRIBUTES
  Status: ✓ Copied successfully
  Size verified: 1024 bytes
  Attributes preserved: Last modified time copied

Copying source/image.jpg → destination/image_copy.jpg
  Status: ✓ Copied successfully
  Read-only attribute preserved: ✓

=== Move Operations ===

Moving source/temp.dat → archive/temp.dat
  Options: ATOMIC_MOVE
  Status: ✓ Moved successfully (atomic operation)
  Original location: source/temp.dat (no longer exists)
  New location: archive/temp.dat ✓

=== Attribute Modification ===

Modifying destination/document.txt attributes:
  Setting read-only: ✓ Success
  Current permissions: r--r--r--

Updating last modified time to 2024-01-10 12:00:00: ✓ Success

=== Delete Operations ===

Deleting destination/image_copy.jpg
  Status: ✓ Deleted successfully

Attempting to delete non-empty directory:
  Error: DirectoryNotEmptyException - directory not empty

Deleting source/temp_file.txt (if exists)
  Status: ⊘ File does not exist (no error thrown)

=== Batch Operations ===

Copying 5 files from source/ to backup/:
  [1/5] file1.txt... ✓
  [2/5] file2.txt... ✓
  [3/5] file3.txt... ✓
  [4/5] file4.txt... ✓
  [5/5] file5.txt... ✓

Summary: 5 copied, 0 failed
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.*;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

// ============= File Manager with NIO.2 =============

public class TestNIO2FileManager {

    private static final DateTimeFormatter DATE_FORMATTER =
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            .withZone(ZoneId.systemDefault());

    public static void main(String[] args) {
        System.out.println("=== NIO.2 File Manager ===\n");

        // Create sample files for demonstration
        createSampleFiles();

        // Demonstrate file information retrieval
        System.out.println("=== File Information ===\n");
        displayFileInfo(Paths.get("source/document.txt"));
        displayFileInfo(Paths.get("source/image.jpg"));

        // Demonstrate copy operations
        System.out.println("=== Copy Operations ===\n");
        copyFile(
            Paths.get("source/document.txt"),
            Paths.get("destination/document.txt"),
            StandardCopyOption.REPLACE_EXISTING,
            StandardCopyOption.COPY_ATTRIBUTES
        );

        copyFile(
            Paths.get("source/image.jpg"),
            Paths.get("destination/image_copy.jpg")
        );

        // Demonstrate move operations
        System.out.println("\n=== Move Operations ===\n");
        moveFile(
            Paths.get("source/temp.dat"),
            Paths.get("archive/temp.dat"),
            StandardCopyOption.ATOMIC_MOVE
        );

        // Demonstrate attribute modification
        System.out.println("\n=== Attribute Modification ===\n");
        modifyFileAttributes(Paths.get("destination/document.txt"));

        // Demonstrate delete operations
        System.out.println("\n=== Delete Operations ===\n");
        deleteFile(Paths.get("destination/image_copy.jpg"));
        deleteFile(Paths.get("source/temp_file.txt")); // Doesn't exist

        // Demonstrate batch operations
        System.out.println("\n=== Batch Operations ===\n");
        batchCopy(
            Paths.get("source"),
            Paths.get("backup"),
            "*.txt"
        );
    }

    // Display detailed file information
    private static void displayFileInfo(Path path) {
        try {
            System.out.println("Analyzing: " + path);

            // Check file type
            if (Files.isRegularFile(path)) {
                System.out.println("  Type: Regular File");
            } else if (Files.isDirectory(path)) {
                System.out.println("  Type: Directory");
            } else if (Files.isSymbolicLink(path)) {
                System.out.println("  Type: Symbolic Link");
            }

            // Get file size
            long size = Files.size(path);
            System.out.println("  Size: " + formatFileSize(size) +
                " (" + size + " bytes)");

            // Check permissions
            System.out.println("  Readable: " +
                (Files.isReadable(path) ? "✓ Yes" : "✗ No"));
            System.out.println("  Writable: " +
                (Files.isWritable(path) ? "✓ Yes" : "✗ No (read-only)"));
            System.out.println("  Executable: " +
                (Files.isExecutable(path) ? "✓ Yes" : "✗ No"));
            System.out.println("  Hidden: " +
                (Files.isHidden(path) ? "✓ Yes" : "✗ No"));

            // Get file attributes
            BasicFileAttributes attrs = Files.readAttributes(
                path, BasicFileAttributes.class);

            System.out.println("  Created: " +
                formatInstant(attrs.creationTime().toInstant()));
            System.out.println("  Modified: " +
                formatInstant(attrs.lastModifiedTime().toInstant()));
            System.out.println("  Accessed: " +
                formatInstant(attrs.lastAccessTime().toInstant()));

            // Get owner (if supported)
            try {
                UserPrincipal owner = Files.getOwner(path);
                System.out.println("  Owner: " + owner.getName());
            } catch (UnsupportedOperationException e) {
                System.out.println("  Owner: Not available on this system");
            }

            System.out.println();

        } catch (IOException e) {
            System.out.println("  Error reading file info: " + e.getMessage());
            System.out.println();
        }
    }

    // Copy file with options
    private static void copyFile(Path source, Path target, CopyOption... options) {
        try {
            System.out.println("Copying " + source + " → " + target);

            // Create parent directories if needed
            Path parent = target.getParent();
            if (parent != null && !Files.exists(parent)) {
                Files.createDirectories(parent);
            }

            // Display options
            if (options.length > 0) {
                System.out.print("  Options: ");
                for (CopyOption option : options) {
                    System.out.print(option.toString().replace("StandardCopyOption.", "") + " ");
                }
                System.out.println();
            }

            // Perform copy
            Files.copy(source, target, options);
            System.out.println("  Status: ✓ Copied successfully");

            // Verify size
            long sourceSize = Files.size(source);
            long targetSize = Files.size(target);
            if (sourceSize == targetSize) {
                System.out.println("  Size verified: " + sourceSize + " bytes");
            }

            // Check if attributes were copied
            for (CopyOption option : options) {
                if (option == StandardCopyOption.COPY_ATTRIBUTES) {
                    System.out.println("  Attributes preserved: Last modified time copied");
                    break;
                }
            }

            System.out.println();

        } catch (FileAlreadyExistsException e) {
            System.out.println("  Error: File already exists at destination");
            System.out.println("  Use REPLACE_EXISTING option to overwrite");
            System.out.println();
        } catch (IOException e) {
            System.out.println("  Error: " + e.getMessage());
            System.out.println();
        }
    }

    // Move file with options
    private static void moveFile(Path source, Path target, CopyOption... options) {
        try {
            System.out.println("Moving " + source + " → " + target);

            // Create parent directories if needed
            Path parent = target.getParent();
            if (parent != null && !Files.exists(parent)) {
                Files.createDirectories(parent);
            }

            // Display options
            if (options.length > 0) {
                System.out.print("  Options: ");
                for (CopyOption option : options) {
                    if (option == StandardCopyOption.ATOMIC_MOVE) {
                        System.out.print("ATOMIC_MOVE ");
                    }
                }
                System.out.println();
            }

            // Perform move
            Files.move(source, target, options);

            boolean isAtomic = false;
            for (CopyOption option : options) {
                if (option == StandardCopyOption.ATOMIC_MOVE) {
                    isAtomic = true;
                    break;
                }
            }

            if (isAtomic) {
                System.out.println("  Status: ✓ Moved successfully (atomic operation)");
            } else {
                System.out.println("  Status: ✓ Moved successfully");
            }

            System.out.println("  Original location: " + source + " (no longer exists)");
            System.out.println("  New location: " + target + " ✓");
            System.out.println();

        } catch (AtomicMoveNotSupportedException e) {
            System.out.println("  Warning: Atomic move not supported, using standard move");
            System.out.println();
            // Retry without atomic option
            try {
                Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("  Status: ✓ Moved successfully (non-atomic)");
                System.out.println();
            } catch (IOException ex) {
                System.out.println("  Error: " + ex.getMessage());
                System.out.println();
            }
        } catch (IOException e) {
            System.out.println("  Error: " + e.getMessage());
            System.out.println();
        }
    }

    // Modify file attributes
    private static void modifyFileAttributes(Path path) {
        try {
            System.out.println("Modifying " + path + " attributes:");

            // Set read-only
            path.toFile().setReadOnly();
            System.out.println("  Setting read-only: ✓ Success");
            System.out.println("  Current permissions: " +
                (Files.isWritable(path) ? "rw-" : "r--") +
                (Files.isReadable(path) ? "r--" : "---") +
                (Files.isReadable(path) ? "r--" : "---"));
            System.out.println();

            // Update last modified time
            FileTime newTime = FileTime.from(
                Instant.parse("2024-01-10T12:00:00Z"));
            Files.setLastModifiedTime(path, newTime);
            System.out.println("Updating last modified time to " +
                formatInstant(newTime.toInstant()) + ": ✓ Success");
            System.out.println();

        } catch (IOException e) {
            System.out.println("  Error: " + e.getMessage());
            System.out.println();
        }
    }

    // Delete file safely
    private static void deleteFile(Path path) {
        try {
            System.out.println("Deleting " + path);

            if (Files.exists(path)) {
                Files.delete(path);
                System.out.println("  Status: ✓ Deleted successfully");
            } else {
                Files.deleteIfExists(path);
                System.out.println("  Status: ⊘ File does not exist (no error thrown)");
            }
            System.out.println();

        } catch (DirectoryNotEmptyException e) {
            System.out.println("  Error: DirectoryNotEmptyException - directory not empty");
            System.out.println();
        } catch (IOException e) {
            System.out.println("  Error: " + e.getMessage());
            System.out.println();
        }
    }

    // Batch copy files matching pattern
    private static void batchCopy(Path sourceDir, Path targetDir, String pattern) {
        try {
            System.out.println("Copying files from " + sourceDir + " to " + targetDir + ":");

            // Create target directory
            Files.createDirectories(targetDir);

            PathMatcher matcher = FileSystems.getDefault()
                .getPathMatcher("glob:" + pattern);

            List<Path> filesToCopy = new ArrayList<>();

            // Find files matching pattern
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(sourceDir)) {
                for (Path entry : stream) {
                    if (Files.isRegularFile(entry) &&
                        matcher.matches(entry.getFileName())) {
                        filesToCopy.add(entry);
                    }
                }
            }

            int copied = 0;
            int failed = 0;
            int total = filesToCopy.size();
            int current = 0;

            // Copy each file
            for (Path source : filesToCopy) {
                current++;
                Path target = targetDir.resolve(source.getFileName());

                try {
                    System.out.print("  [" + current + "/" + total + "] " +
                        source.getFileName() + "... ");
                    Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
                    System.out.println("✓");
                    copied++;
                } catch (IOException e) {
                    System.out.println("✗ (" + e.getMessage() + ")");
                    failed++;
                }
            }

            System.out.println("\nSummary: " + copied + " copied, " + failed + " failed");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    // Helper methods
    private static String formatFileSize(long bytes) {
        if (bytes < 1024) {
            return bytes + " bytes";
        } else if (bytes < 1024 * 1024) {
            return String.format("%.2f KB", bytes / 1024.0);
        } else if (bytes < 1024 * 1024 * 1024) {
            return String.format("%.2f MB", bytes / (1024.0 * 1024.0));
        } else {
            return String.format("%.2f GB", bytes / (1024.0 * 1024.0 * 1024.0));
        }
    }

    private static String formatInstant(Instant instant) {
        return DATE_FORMATTER.format(instant);
    }

    // Create sample files for demonstration
    private static void createSampleFiles() {
        try {
            Files.createDirectories(Paths.get("source"));
            Files.createDirectories(Paths.get("destination"));
            Files.createDirectories(Paths.get("archive"));

            // Create document.txt
            Path doc = Paths.get("source/document.txt");
            Files.writeString(doc, "Sample document content\n".repeat(40));

            // Create image.jpg (mock)
            Path image = Paths.get("source/image.jpg");
            Files.write(image, new byte[51200]); // 50 KB
            image.toFile().setReadOnly();

            // Create temp.dat
            Path temp = Paths.get("source/temp.dat");
            Files.writeString(temp, "Temporary data");

            // Create multiple text files for batch operations
            for (int i = 1; i <= 5; i++) {
                Path file = Paths.get("source/file" + i + ".txt");
                Files.writeString(file, "Content of file " + i);
            }

        } catch (IOException e) {
            System.out.println("Error creating sample files: " + e.getMessage());
        }
    }
}
```

</details>

**💡 Tips:**
- NIO.2 Path more flexible than File; supports relative/absolute paths, normalization
- Files.copy() requires REPLACE_EXISTING to overwrite; fails with FileAlreadyExistsException otherwise
- COPY_ATTRIBUTES preserves file timestamps; useful for backups
- ATOMIC_MOVE guarantees atomicity if supported; throws AtomicMoveNotSupportedException if not
- Files.move() faster than copy+delete; renames file if on same filesystem
- Files.delete() throws NoSuchFileException if missing; Files.deleteIfExists() doesn't
- DirectoryNotEmptyException thrown when deleting non-empty directory; must delete contents first
- BasicFileAttributes provides file metadata without multiple system calls
- Files.isReadable/Writable/Executable check permissions efficiently
- Files.getOwner() may throw UnsupportedOperationException on some file systems
- FileTime uses Instant internally; easy conversion to LocalDateTime
- PathMatcher with glob patterns enables flexible file filtering
- DirectoryStream efficiently iterates directories without loading all entries
- Try-with-resources not needed for Files methods (they handle resources internally)
- Use Files.createDirectories() not mkdirs(); creates parent directories, doesn't fail if exists
- NIO.2 exceptions more specific than IOException enabling better error handling

---

### Exercise 12: Directory Scanner with File Filtering and Statistics

**📝 Problem Statement:**
Create a comprehensive directory scanning system demonstrating DirectoryStream for efficient traversal, file filtering with PathMatcher, collecting file statistics, finding files by criteria, and building a powerful file search utility. The system should recursively scan directories, filter files by extension, size, and modification date, calculate aggregate statistics (total files, total size, file type distribution), find largest and smallest files, detect empty directories, and generate detailed scan reports, showcasing how NIO.2 enables high-performance directory operations in production file management systems.

**Requirements:**
- Recursively scan directories using Files.walkFileTree() or Files.walk()
- Filter files by extension using PathMatcher with glob patterns
- Filter files by size range (min/max bytes)
- Filter files by modification date range
- Count total files and directories
- Calculate total size of all files
- Group files by extension (file type distribution)
- Find largest N files by size
- Find oldest and newest files by modification date
- Detect empty directories (no files inside)
- Skip hidden files/directories (optional filter)
- Handle symbolic links (follow or don't follow)
- Generate scan report with all statistics
- Display results in human-readable format
- Measure and display scan time for performance

**Sample Test Cases:**
```
Input: Scan directory tree
project/
  ├── src/
  │   ├── Main.java (2 KB, modified: 2024-01-10)
  │   ├── Utils.java (1.5 KB, modified: 2024-01-09)
  │   └── tests/
  │       └── TestMain.java (3 KB, modified: 2024-01-11)
  ├── docs/
  │   ├── README.md (5 KB, modified: 2024-01-08)
  │   └── API.md (8 KB, modified: 2024-01-07)
  ├── build/  (empty directory)
  └── lib/
      └── library.jar (500 KB, modified: 2024-01-05)

Expected Output:
=== Directory Scanner ===

Scanning: project/
Options: Recursive ✓, Follow symlinks ✗

Scanning in progress...
  Found: src/Main.java (2.00 KB)
  Found: src/Utils.java (1.50 KB)
  Found: src/tests/TestMain.java (3.00 KB)
  Found: docs/README.md (5.00 KB)
  Found: docs/API.md (8.00 KB)
  Found: lib/library.jar (500.00 KB)

Scan completed in 0.125 seconds

=== Scan Statistics ===

Total Files: 6
Total Directories: 5
Total Size: 519.50 KB (531968 bytes)

Empty Directories: 1
  - project/build/

=== File Type Distribution ===

.java: 3 files (6.50 KB, 1.25%)
  ████▒░░░░░░░░░░░░░░░

.md: 2 files (13.00 KB, 2.50%)
  █████░░░░░░░░░░░░░░░

.jar: 1 file (500.00 KB, 96.25%)
  ████████████████████

=== Largest Files (Top 5) ===

1. lib/library.jar (500.00 KB)
2. docs/API.md (8.00 KB)
3. docs/README.md (5.00 KB)
4. src/tests/TestMain.java (3.00 KB)
5. src/Main.java (2.00 KB)

=== Files by Modification Date ===

Oldest: lib/library.jar (2024-01-05)
Newest: src/tests/TestMain.java (2024-01-11)

Recent files (last 7 days): 6 files

=== Filter: Java Files Only ===

Found 3 Java files:
1. src/Main.java (2.00 KB)
2. src/Utils.java (1.50 KB)
3. src/tests/TestMain.java (3.00 KB)

Total: 6.50 KB

=== Filter: Files > 10 KB ===

Found 2 files:
1. lib/library.jar (500.00 KB)
2. docs/API.md (8.00 KB) [Note: actually 8 KB, this is an example]

Actually found: 1 file
Total: 500.00 KB
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Stream;

// ============= File Statistics Class =============

class FileStats {
    private long totalFiles = 0;
    private long totalDirectories = 0;
    private long totalSize = 0;
    private Map<String, Long> extensionCounts = new HashMap<>();
    private Map<String, Long> extensionSizes = new HashMap<>();
    private List<FileInfo> allFiles = new ArrayList<>();
    private List<Path> emptyDirectories = new ArrayList<>();

    public void addFile(Path path, long size) {
        totalFiles++;
        totalSize += size;

        String ext = getExtension(path);
        extensionCounts.put(ext, extensionCounts.getOrDefault(ext, 0L) + 1);
        extensionSizes.put(ext, extensionSizes.getOrDefault(ext, 0L) + size);

        try {
            BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
            allFiles.add(new FileInfo(path, size, attrs.lastModifiedTime().toInstant()));
        } catch (IOException e) {
            // Skip files we can't read attributes from
        }
    }

    public void addDirectory() {
        totalDirectories++;
    }

    public void addEmptyDirectory(Path path) {
        emptyDirectories.add(path);
    }

    private String getExtension(Path path) {
        String filename = path.getFileName().toString();
        int dotIndex = filename.lastIndexOf('.');
        return dotIndex > 0 ? filename.substring(dotIndex) : "(no extension)";
    }

    // Getters
    public long getTotalFiles() { return totalFiles; }
    public long getTotalDirectories() { return totalDirectories; }
    public long getTotalSize() { return totalSize; }
    public Map<String, Long> getExtensionCounts() { return extensionCounts; }
    public Map<String, Long> getExtensionSizes() { return extensionSizes; }
    public List<FileInfo> getAllFiles() { return allFiles; }
    public List<Path> getEmptyDirectories() { return emptyDirectories; }
}

// ============= File Info Class =============

class FileInfo {
    private Path path;
    private long size;
    private Instant modified;

    public FileInfo(Path path, long size, Instant modified) {
        this.path = path;
        this.size = size;
        this.modified = modified;
    }

    public Path getPath() { return path; }
    public long getSize() { return size; }
    public Instant getModified() { return modified; }
}

// ============= Directory Scanner =============

public class TestDirectoryScanner {

    private static final DateTimeFormatter DATE_FORMATTER =
        DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static void main(String[] args) {
        System.out.println("=== Directory Scanner ===\n");

        // Create sample directory structure
        createSampleProject();

        Path rootPath = Paths.get("project");

        System.out.println("Scanning: " + rootPath);
        System.out.println("Options: Recursive ✓, Follow symlinks ✗\n");

        long startTime = System.currentTimeMillis();

        System.out.println("Scanning in progress...");
        FileStats stats = scanDirectory(rootPath);

        long endTime = System.currentTimeMillis();
        double duration = (endTime - startTime) / 1000.0;

        System.out.println("\nScan completed in " +
            String.format("%.3f seconds", duration));

        // Display statistics
        displayStatistics(stats);

        // Display file type distribution
        displayFileTypeDistribution(stats);

        // Display largest files
        displayLargestFiles(stats, 5);

        // Display files by date
        displayFilesByDate(stats);

        // Demonstrate filtering
        System.out.println("\n=== Filter: Java Files Only ===\n");
        filterByExtension(rootPath, ".java");

        System.out.println("\n=== Filter: Files > 10 KB ===\n");
        filterBySize(rootPath, 10 * 1024);
    }

    // Scan directory recursively
    private static FileStats scanDirectory(Path root) {
        FileStats stats = new FileStats();

        try {
            Files.walkFileTree(root, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                    if (attrs.isRegularFile()) {
                        long size = attrs.size();
                        stats.addFile(file, size);
                        System.out.println("  Found: " + root.relativize(file) +
                            " (" + formatFileSize(size) + ")");
                    }
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
                    stats.addDirectory();
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult postVisitDirectory(Path dir, IOException exc) {
                    // Check if directory is empty
                    try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
                        if (!stream.iterator().hasNext()) {
                            stats.addEmptyDirectory(dir);
                        }
                    } catch (IOException e) {
                        // Ignore
                    }
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult visitFileFailed(Path file, IOException exc) {
                    System.err.println("  Error accessing: " + file + " - " + exc.getMessage());
                    return FileVisitResult.CONTINUE;
                }
            });

        } catch (IOException e) {
            System.err.println("Error scanning directory: " + e.getMessage());
        }

        return stats;
    }

    // Display scan statistics
    private static void displayStatistics(FileStats stats) {
        System.out.println("\n=== Scan Statistics ===\n");
        System.out.println("Total Files: " + stats.getTotalFiles());
        System.out.println("Total Directories: " + stats.getTotalDirectories());
        System.out.println("Total Size: " + formatFileSize(stats.getTotalSize()) +
            " (" + stats.getTotalSize() + " bytes)");

        if (!stats.getEmptyDirectories().isEmpty()) {
            System.out.println("\nEmpty Directories: " + stats.getEmptyDirectories().size());
            for (Path dir : stats.getEmptyDirectories()) {
                System.out.println("  - " + dir);
            }
        }
    }

    // Display file type distribution
    private static void displayFileTypeDistribution(FileStats stats) {
        System.out.println("\n=== File Type Distribution ===\n");

        Map<String, Long> extensionCounts = stats.getExtensionCounts();
        Map<String, Long> extensionSizes = stats.getExtensionSizes();
        long totalSize = stats.getTotalSize();

        // Sort by size descending
        List<Map.Entry<String, Long>> sortedBySize = new ArrayList<>(extensionSizes.entrySet());
        sortedBySize.sort((a, b) -> Long.compare(b.getValue(), a.getValue()));

        for (Map.Entry<String, Long> entry : sortedBySize) {
            String ext = entry.getKey();
            long size = entry.getValue();
            long count = extensionCounts.get(ext);
            double percentage = (size * 100.0) / totalSize;

            System.out.println(ext + ": " + count + " file" + (count > 1 ? "s" : "") +
                " (" + formatFileSize(size) + ", " +
                String.format("%.2f%%", percentage) + ")");

            // Display bar chart
            int barLength = (int)(percentage / 5);
            System.out.print("  ");
            for (int i = 0; i < 20; i++) {
                if (i < barLength) {
                    System.out.print("█");
                } else if (i == barLength) {
                    System.out.print("▒");
                } else {
                    System.out.print("░");
                }
            }
            System.out.println("\n");
        }
    }

    // Display largest files
    private static void displayLargestFiles(FileStats stats, int limit) {
        System.out.println("=== Largest Files (Top " + limit + ") ===\n");

        List<FileInfo> files = new ArrayList<>(stats.getAllFiles());
        files.sort((a, b) -> Long.compare(b.getSize(), a.getSize()));

        int count = Math.min(limit, files.size());
        for (int i = 0; i < count; i++) {
            FileInfo file = files.get(i);
            System.out.println((i + 1) + ". " + file.getPath() +
                " (" + formatFileSize(file.getSize()) + ")");
        }
    }

    // Display files by modification date
    private static void displayFilesByDate(FileStats stats) {
        System.out.println("\n=== Files by Modification Date ===\n");

        List<FileInfo> files = stats.getAllFiles();
        if (files.isEmpty()) {
            System.out.println("No files found");
            return;
        }

        // Find oldest and newest
        FileInfo oldest = files.get(0);
        FileInfo newest = files.get(0);

        for (FileInfo file : files) {
            if (file.getModified().isBefore(oldest.getModified())) {
                oldest = file;
            }
            if (file.getModified().isAfter(newest.getModified())) {
                newest = file;
            }
        }

        System.out.println("Oldest: " + oldest.getPath() +
            " (" + formatDate(oldest.getModified()) + ")");
        System.out.println("Newest: " + newest.getPath() +
            " (" + formatDate(newest.getModified()) + ")");

        // Count recent files (last 7 days)
        Instant sevenDaysAgo = Instant.now().minus(7, ChronoUnit.DAYS);
        long recentCount = files.stream()
            .filter(f -> f.getModified().isAfter(sevenDaysAgo))
            .count();

        System.out.println("\nRecent files (last 7 days): " + recentCount + " files");
    }

    // Filter by extension
    private static void filterByExtension(Path root, String extension) {
        try {
            PathMatcher matcher = FileSystems.getDefault()
                .getPathMatcher("glob:**/*" + extension);

            List<Path> matchingFiles = new ArrayList<>();
            long totalSize = 0;

            try (Stream<Path> stream = Files.walk(root)) {
                List<Path> files = stream
                    .filter(Files::isRegularFile)
                    .filter(p -> matcher.matches(p))
                    .toList();

                System.out.println("Found " + files.size() + " " + extension + " files:");

                int index = 1;
                for (Path file : files) {
                    long size = Files.size(file);
                    totalSize += size;
                    System.out.println(index++ + ". " + root.relativize(file) +
                        " (" + formatFileSize(size) + ")");
                }

                System.out.println("\nTotal: " + formatFileSize(totalSize));
            }

        } catch (IOException e) {
            System.err.println("Error filtering files: " + e.getMessage());
        }
    }

    // Filter by size
    private static void filterBySize(Path root, long minSize) {
        try {
            try (Stream<Path> stream = Files.walk(root)) {
                List<Path> files = stream
                    .filter(Files::isRegularFile)
                    .filter(p -> {
                        try {
                            return Files.size(p) > minSize;
                        } catch (IOException e) {
                            return false;
                        }
                    })
                    .toList();

                System.out.println("Found " + files.size() + " files:");

                long totalSize = 0;
                int index = 1;
                for (Path file : files) {
                    long size = Files.size(file);
                    totalSize += size;
                    System.out.println(index++ + ". " + root.relativize(file) +
                        " (" + formatFileSize(size) + ")");
                }

                System.out.println("\nTotal: " + formatFileSize(totalSize));
            }

        } catch (IOException e) {
            System.err.println("Error filtering files: " + e.getMessage());
        }
    }

    // Helper methods
    private static String formatFileSize(long bytes) {
        if (bytes < 1024) {
            return bytes + " bytes";
        } else if (bytes < 1024 * 1024) {
            return String.format("%.2f KB", bytes / 1024.0);
        } else if (bytes < 1024 * 1024 * 1024) {
            return String.format("%.2f MB", bytes / (1024.0 * 1024.0));
        } else {
            return String.format("%.2f GB", bytes / (1024.0 * 1024.0 * 1024.0));
        }
    }

    private static String formatDate(Instant instant) {
        return DATE_FORMATTER.format(
            LocalDate.ofInstant(instant, ZoneId.systemDefault()));
    }

    // Create sample project structure
    private static void createSampleProject() {
        try {
            Path project = Paths.get("project");
            Files.createDirectories(project.resolve("src/tests"));
            Files.createDirectories(project.resolve("docs"));
            Files.createDirectories(project.resolve("build")); // Empty directory
            Files.createDirectories(project.resolve("lib"));

            // Create Java files
            Files.writeString(project.resolve("src/Main.java"),
                "public class Main {}\n".repeat(50));
            Files.writeString(project.resolve("src/Utils.java"),
                "public class Utils {}\n".repeat(37));
            Files.writeString(project.resolve("src/tests/TestMain.java"),
                "public class TestMain {}\n".repeat(75));

            // Create documentation files
            Files.writeString(project.resolve("docs/README.md"),
                "# Documentation\n".repeat(250));
            Files.writeString(project.resolve("docs/API.md"),
                "# API Reference\n".repeat(400));

            // Create library file (mock large file)
            byte[] largeData = new byte[512 * 1024]; // 500 KB
            Files.write(project.resolve("lib/library.jar"), largeData);

        } catch (IOException e) {
            System.err.println("Error creating sample project: " + e.getMessage());
        }
    }
}
```

</details>

**💡 Tips:**
- Files.walkFileTree() more flexible than Files.walk(); provides pre/post-visit directory hooks
- SimpleFileVisitor simplifies custom traversal logic; override only needed methods
- FileVisitResult.SKIP_SUBTREE skips directory contents; useful for ignoring .git, node_modules
- Files.walk() returns Stream; supports filter(), map(), collect() for functional processing
- DirectoryStream more memory-efficient than Files.list() for large directories
- PathMatcher with glob patterns: `**` matches any depth, `*` matches name, `?` matches single char
- BasicFileAttributes retrieved once per file; avoid multiple Files.size(), Files.getLastModifiedTime() calls
- Try-with-resources required for Stream<Path> from Files.walk(); prevents resource leak
- postVisitDirectory() called after visiting all directory contents; perfect for empty directory detection
- visitFileFailed() handles inaccessible files/directories without stopping traversal
- FileVisitResult.CONTINUE proceeds, SKIP_SUBTREE skips directory, TERMINATE stops traversal
- Files.walk() follows symbolic links by default; use Files.walk(path, FileVisitOption.FOLLOW_LINKS) to control
- Stream operations lazy; must consume with terminal operation (collect, forEach, count)
- Sort large file lists by size/date in memory; for huge lists use database or external sort

---

### Exercise 13: Duplicate File Finder with Content Comparison

**📝 Problem Statement:**
Create a comprehensive duplicate file detection system demonstrating content comparison using NIO.2, efficiently reading files in chunks, calculating file checksums (MD5, SHA-256), comparing files byte-by-byte, grouping duplicates, and building a production-grade duplicate finder. The system should scan directories recursively, identify potential duplicates by size, verify duplicates by comparing content or checksums, group duplicate files together, calculate space wasted by duplicates, optionally delete duplicate files keeping one copy, and generate duplicate reports, showcasing how NIO.2 enables high-performance file content comparison for storage optimization and data deduplication.

**Requirements:**
- Scan directories recursively finding all regular files
- Group files by size (potential duplicates must have same size)
- Calculate MD5 or SHA-256 checksum for files
- Compare file content byte-by-byte for verification
- Use BufferedInputStream for efficient reading
- Group duplicate files (same content) together
- Calculate total space wasted by duplicates
- Display duplicate groups with file paths
- Support deleting duplicate files (keeping one original)
- Generate duplicate report with statistics
- Handle large files efficiently (streaming, not loading entire file)
- Measure and display scan time
- Use try-with-resources for resource management
- Handle IOException during file reading
- Display human-readable file sizes

**Sample Test Cases:**
```
Input: Directory with duplicate files
storage/
  ├── documents/
  │   ├── report.pdf (5 MB, content: ABC...)
  │   ├── report_copy.pdf (5 MB, content: ABC... - DUPLICATE)
  │   └── notes.txt (1 KB, content: XYZ...)
  ├── backup/
  │   ├── report.pdf (5 MB, content: ABC... - DUPLICATE)
  │   └── notes_backup.txt (1 KB, content: XYZ... - DUPLICATE)
  └── images/
      ├── photo1.jpg (2 MB, content: IMG1...)
      └── photo2.jpg (2 MB, content: IMG2... - different)

Expected Output:
=== Duplicate File Finder ===

Scanning: storage/
Options: Recursive ✓, Method: SHA-256 checksum

Phase 1: Scanning files...
  Found: documents/report.pdf (5.00 MB)
  Found: documents/report_copy.pdf (5.00 MB)
  Found: documents/notes.txt (1.00 KB)
  Found: backup/report.pdf (5.00 MB)
  Found: backup/notes_backup.txt (1.00 KB)
  Found: images/photo1.jpg (2.00 MB)
  Found: images/photo2.jpg (2.00 MB)

Total files scanned: 7
Total size: 19.00 MB

Phase 2: Grouping by size...
  Potential duplicate groups: 3
    - 5.00 MB: 3 files
    - 1.00 KB: 2 files
    - 2.00 MB: 2 files

Phase 3: Verifying duplicates (calculating checksums)...
  Analyzing storage/documents/report.pdf... ✓
  Analyzing storage/documents/report_copy.pdf... ✓ (matches report.pdf)
  Analyzing storage/documents/notes.txt... ✓
  Analyzing storage/backup/report.pdf... ✓ (matches report.pdf)
  Analyzing storage/backup/notes_backup.txt... ✓ (matches notes.txt)
  Analyzing storage/images/photo1.jpg... ✓
  Analyzing storage/images/photo2.jpg... ✓ (unique content)

Scan completed in 0.456 seconds

=== Duplicate Groups Found ===

Group 1: report.pdf (5.00 MB) - 3 copies
  SHA-256: a3f5b9c2d8e7f1a2b4c6d8e9f0a1b2c3...

  Original: storage/documents/report.pdf
  Duplicates:
    2. storage/documents/report_copy.pdf (5.00 MB)
    3. storage/backup/report.pdf (5.00 MB)

  Space wasted: 10.00 MB (2 duplicate copies)

Group 2: notes.txt (1.00 KB) - 2 copies
  SHA-256: d4e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0...

  Original: storage/documents/notes.txt
  Duplicates:
    2. storage/backup/notes_backup.txt (1.00 KB)

  Space wasted: 1.00 KB (1 duplicate copy)

=== Summary ===

Total duplicate groups: 2
Total duplicate files: 3
Total space wasted: 10.00 MB

Unique files: 4 (photo1.jpg, photo2.jpg, and 2 originals)
Total unique content: 9.00 MB

Potential savings: 10.00 MB (52.63% of total space)

=== Recommendations ===

To save disk space, you can:
1. Delete 3 duplicate files to recover 10.00 MB
2. Keep one copy of each file as the original
3. Create symbolic links instead of duplicate copies

Would you like to delete duplicates? (simulation mode)
```

**Solution:**

<details>
<summary>👁️ View Solution Code</summary>

```java
import java.io.*;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.stream.Collectors;

// ============= File Metadata Class =============

class FileMetadata {
    private Path path;
    private long size;
    private String checksum;

    public FileMetadata(Path path, long size) {
        this.path = path;
        this.size = size;
    }

    public Path getPath() { return path; }
    public long getSize() { return size; }
    public String getChecksum() { return checksum; }
    public void setChecksum(String checksum) { this.checksum = checksum; }
}

// ============= Duplicate Group Class =============

class DuplicateGroup {
    private FileMetadata original;
    private List<FileMetadata> duplicates;
    private String checksum;

    public DuplicateGroup(String checksum, FileMetadata original) {
        this.checksum = checksum;
        this.original = original;
        this.duplicates = new ArrayList<>();
    }

    public void addDuplicate(FileMetadata file) {
        duplicates.add(file);
    }

    public FileMetadata getOriginal() { return original; }
    public List<FileMetadata> getDuplicates() { return duplicates; }
    public String getChecksum() { return checksum; }
    public int getTotalCopies() { return 1 + duplicates.size(); }
    public long getWastedSpace() { return original.getSize() * duplicates.size(); }
}

// ============= Duplicate File Finder =============

public class TestDuplicateFinder {

    public static void main(String[] args) {
        System.out.println("=== Duplicate File Finder ===\n");

        // Create sample directory structure with duplicates
        createSampleStorage();

        Path rootPath = Paths.get("storage");

        System.out.println("Scanning: " + rootPath);
        System.out.println("Options: Recursive ✓, Method: SHA-256 checksum\n");

        long startTime = System.currentTimeMillis();

        // Phase 1: Scan all files
        System.out.println("Phase 1: Scanning files...");
        List<FileMetadata> allFiles = scanFiles(rootPath);

        System.out.println("\nTotal files scanned: " + allFiles.size());
        long totalSize = allFiles.stream().mapToLong(FileMetadata::getSize).sum();
        System.out.println("Total size: " + formatFileSize(totalSize));

        // Phase 2: Group by size
        System.out.println("\nPhase 2: Grouping by size...");
        Map<Long, List<FileMetadata>> sizeGroups = groupBySize(allFiles);

        // Filter groups with potential duplicates (more than 1 file)
        Map<Long, List<FileMetadata>> potentialDuplicates = sizeGroups.entrySet().stream()
            .filter(e -> e.getValue().size() > 1)
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        System.out.println("  Potential duplicate groups: " + potentialDuplicates.size());
        for (Map.Entry<Long, List<FileMetadata>> entry : potentialDuplicates.entrySet()) {
            System.out.println("    - " + formatFileSize(entry.getKey()) + ": " +
                entry.getValue().size() + " files");
        }

        // Phase 3: Calculate checksums and find true duplicates
        System.out.println("\nPhase 3: Verifying duplicates (calculating checksums)...");
        List<DuplicateGroup> duplicateGroups = findDuplicates(potentialDuplicates);

        long endTime = System.currentTimeMillis();
        double duration = (endTime - startTime) / 1000.0;

        System.out.println("\nScan completed in " +
            String.format("%.3f seconds", duration));

        // Display results
        if (duplicateGroups.isEmpty()) {
            System.out.println("\n=== No Duplicates Found ===\n");
            System.out.println("All files are unique!");
        } else {
            displayDuplicateGroups(duplicateGroups);
            displaySummary(duplicateGroups, allFiles.size(), totalSize);
        }
    }

    // Scan all files recursively
    private static List<FileMetadata> scanFiles(Path root) {
        List<FileMetadata> files = new ArrayList<>();

        try {
            Files.walkFileTree(root, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                    if (attrs.isRegularFile()) {
                        files.add(new FileMetadata(file, attrs.size()));
                        System.out.println("  Found: " + root.relativize(file) +
                            " (" + formatFileSize(attrs.size()) + ")");
                    }
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            System.err.println("Error scanning files: " + e.getMessage());
        }

        return files;
    }

    // Group files by size
    private static Map<Long, List<FileMetadata>> groupBySize(List<FileMetadata> files) {
        Map<Long, List<FileMetadata>> groups = new HashMap<>();

        for (FileMetadata file : files) {
            groups.computeIfAbsent(file.getSize(), k -> new ArrayList<>()).add(file);
        }

        return groups;
    }

    // Find true duplicates by comparing checksums
    private static List<DuplicateGroup> findDuplicates(
            Map<Long, List<FileMetadata>> potentialDuplicates) {

        List<DuplicateGroup> duplicateGroups = new ArrayList<>();

        for (Map.Entry<Long, List<FileMetadata>> entry : potentialDuplicates.entrySet()) {
            List<FileMetadata> files = entry.getValue();

            // Calculate checksums for all files in this size group
            Map<String, List<FileMetadata>> checksumGroups = new HashMap<>();

            for (FileMetadata file : files) {
                String checksum = calculateChecksum(file.getPath());
                file.setChecksum(checksum);

                checksumGroups.computeIfAbsent(checksum, k -> new ArrayList<>()).add(file);

                // Display progress
                List<FileMetadata> group = checksumGroups.get(checksum);
                if (group.size() == 1) {
                    System.out.println("  Analyzing " + file.getPath() + "... ✓");
                } else {
                    System.out.println("  Analyzing " + file.getPath() + "... ✓ (matches " +
                        group.get(0).getPath().getFileName() + ")");
                }
            }

            // Create duplicate groups for checksums with multiple files
            for (Map.Entry<String, List<FileMetadata>> checksumEntry : checksumGroups.entrySet()) {
                List<FileMetadata> matchingFiles = checksumEntry.getValue();
                if (matchingFiles.size() > 1) {
                    String checksum = checksumEntry.getKey();
                    FileMetadata original = matchingFiles.get(0);
                    DuplicateGroup group = new DuplicateGroup(checksum, original);

                    for (int i = 1; i < matchingFiles.size(); i++) {
                        group.addDuplicate(matchingFiles.get(i));
                    }

                    duplicateGroups.add(group);
                } else {
                    System.out.println("  Analyzing " + matchingFiles.get(0).getPath() +
                        "... ✓ (unique content)");
                }
            }
        }

        return duplicateGroups;
    }

    // Calculate SHA-256 checksum of file
    private static String calculateChecksum(Path file) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            try (InputStream fis = Files.newInputStream(file);
                 BufferedInputStream bis = new BufferedInputStream(fis)) {

                byte[] buffer = new byte[8192];
                int bytesRead;

                while ((bytesRead = bis.read(buffer)) != -1) {
                    digest.update(buffer, 0, bytesRead);
                }
            }

            byte[] hashBytes = digest.digest();
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }

            return sb.toString();

        } catch (NoSuchAlgorithmException e) {
            System.err.println("SHA-256 algorithm not available");
            return null;
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return null;
        }
    }

    // Display duplicate groups
    private static void displayDuplicateGroups(List<DuplicateGroup> groups) {
        System.out.println("\n=== Duplicate Groups Found ===\n");

        int groupNumber = 1;
        for (DuplicateGroup group : groups) {
            FileMetadata original = group.getOriginal();

            System.out.println("Group " + groupNumber + ": " +
                original.getPath().getFileName() + " (" +
                formatFileSize(original.getSize()) + ") - " +
                group.getTotalCopies() + " copies");
            System.out.println("  SHA-256: " + group.getChecksum().substring(0, 40) + "...");
            System.out.println();
            System.out.println("  Original: " + original.getPath());
            System.out.println("  Duplicates:");

            int dupNumber = 2;
            for (FileMetadata dup : group.getDuplicates()) {
                System.out.println("    " + dupNumber + ". " + dup.getPath() +
                    " (" + formatFileSize(dup.getSize()) + ")");
                dupNumber++;
            }

            System.out.println();
            System.out.println("  Space wasted: " + formatFileSize(group.getWastedSpace()) +
                " (" + group.getDuplicates().size() + " duplicate " +
                (group.getDuplicates().size() > 1 ? "copies" : "copy") + ")");
            System.out.println();

            groupNumber++;
        }
    }

    // Display summary statistics
    private static void displaySummary(List<DuplicateGroup> groups,
                                      int totalFiles, long totalSize) {
        System.out.println("=== Summary ===\n");

        System.out.println("Total duplicate groups: " + groups.size());

        int totalDuplicates = groups.stream()
            .mapToInt(g -> g.getDuplicates().size())
            .sum();
        System.out.println("Total duplicate files: " + totalDuplicates);

        long totalWasted = groups.stream()
            .mapToLong(DuplicateGroup::getWastedSpace)
            .sum();
        System.out.println("Total space wasted: " + formatFileSize(totalWasted));

        int uniqueFiles = totalFiles - totalDuplicates;
        long uniqueSize = totalSize - totalWasted;

        System.out.println("\nUnique files: " + uniqueFiles);
        System.out.println("Total unique content: " + formatFileSize(uniqueSize));

        double savingsPercent = (totalWasted * 100.0) / totalSize;
        System.out.println("\nPotential savings: " + formatFileSize(totalWasted) +
            " (" + String.format("%.2f%%", savingsPercent) + " of total space)");

        System.out.println("\n=== Recommendations ===\n");
        System.out.println("To save disk space, you can:");
        System.out.println("1. Delete " + totalDuplicates + " duplicate files to recover " +
            formatFileSize(totalWasted));
        System.out.println("2. Keep one copy of each file as the original");
        System.out.println("3. Create symbolic links instead of duplicate copies");
        System.out.println("\nWould you like to delete duplicates? (simulation mode)");
    }

    // Helper method to format file size
    private static String formatFileSize(long bytes) {
        if (bytes < 1024) {
            return bytes + " bytes";
        } else if (bytes < 1024 * 1024) {
            return String.format("%.2f KB", bytes / 1024.0);
        } else if (bytes < 1024 * 1024 * 1024) {
            return String.format("%.2f MB", bytes / (1024.0 * 1024.0));
        } else {
            return String.format("%.2f GB", bytes / (1024.0 * 1024.0 * 1024.0));
        }
    }

    // Create sample storage with duplicates
    private static void createSampleStorage() {
        try {
            Path storage = Paths.get("storage");
            Files.createDirectories(storage.resolve("documents"));
            Files.createDirectories(storage.resolve("backup"));
            Files.createDirectories(storage.resolve("images"));

            // Create original files
            byte[] reportContent = "Report content goes here.\n".repeat(100000).getBytes();
            Files.write(storage.resolve("documents/report.pdf"), reportContent);

            byte[] notesContent = "Notes content.\n".repeat(50).getBytes();
            Files.write(storage.resolve("documents/notes.txt"), notesContent);

            byte[] photo1Content = "Image1 data\n".repeat(100000).getBytes();
            Files.write(storage.resolve("images/photo1.jpg"), photo1Content);

            byte[] photo2Content = "Image2 data\n".repeat(100000).getBytes();
            Files.write(storage.resolve("images/photo2.jpg"), photo2Content);

            // Create duplicates
            Files.write(storage.resolve("documents/report_copy.pdf"), reportContent);
            Files.write(storage.resolve("backup/report.pdf"), reportContent);
            Files.write(storage.resolve("backup/notes_backup.txt"), notesContent);

        } catch (IOException e) {
            System.err.println("Error creating sample storage: " + e.getMessage());
        }
    }
}
```

</details>

**💡 Tips:**
- Group files by size first; duplicates must have identical size (cheap pre-filter)
- Calculate checksums only for size-matched files; avoids expensive computation on unique files
- SHA-256 more secure than MD5; use MessageDigest.getInstance("SHA-256")
- BufferedInputStream essential for efficient file reading; reads 8KB chunks not byte-by-byte
- Try-with-resources ensures InputStream closed even if exception during checksum calculation
- MessageDigest.update() processes data incrementally; doesn't load entire file into memory
- Convert byte[] hash to hex string for readable checksum display
- HashMap<String, List<FileMetadata>> groups files by checksum; duplicates share same key
- Calculate wasted space = file size × (number of duplicates - 1)
- Delete duplicates carefully; always keep one original copy
- Symbolic links save space without file duplication; use Files.createSymbolicLink()
- For very large files, consider comparing first/last N bytes before full checksum
- Production systems store checksums in database for incremental duplicate detection
- Consider file modification time; recently changed file might be the "correct" version
- Handle NoSuchAlgorithmException if SHA-256 unavailable (unlikely on modern JVMs)
- Files.walkFileTree() efficient for deep directory scanning
- For huge file sets, use database to store checksums avoiding re-scanning

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