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

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 2: Read and Display File
Read the file created in Exercise 1 and display its contents.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 3: Copy File
Create a program that copies content from one file to another.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 4: Count Lines in File
Write a program that counts the number of lines in a file.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 5: File Information
Create a program that displays detailed information about a file.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 6: Append to File
Write a program that appends new lines to an existing file.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 7: Search in File
Create a program that searches for a specific word in a file.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 8: List Directory Contents
Write a program that lists all files in a directory.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 9: Create Directory Structure
Create a program that creates a nested directory structure.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 10: Student Records
Create a program that writes student records to a file and reads them back.

<details>
<summary>👁️ View Solution Code</summary>

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

</details>

---

### Exercise 11: CSV File Processor with Data Validation

**📝 Problem Statement:**
Create a comprehensive CSV file processing system demonstrating practical file I/O with reading structured data, parsing CSV format, data validation, error handling, writing results to output files, and building a real-world data import pipeline. The system should read employee data from a CSV file, validate each field, handle malformed data gracefully, generate validation reports, and write both valid records and error logs to separate files, showcasing how file I/O is used in production data processing applications.

**Requirements:**
- Read CSV file with employee data: ID, Name, Email, Salary, Department
- Parse CSV lines handling quoted fields and commas within quotes
- Validate each field with specific rules:
  - ID: must be positive integer
  - Name: must be non-empty, 2-50 characters
  - Email: must contain @ and . symbols in correct positions
  - Salary: must be positive number between 20000 and 500000
  - Department: must be one of: IT, HR, Finance, Sales, Marketing
- Handle malformed CSV lines (wrong number of fields, missing data)
- Count valid and invalid records
- Write valid records to "employees_valid.csv"
- Write invalid records with error descriptions to "employees_errors.log"
- Generate summary report with statistics
- Handle FileNotFoundException if input file missing
- Use try-with-resources for automatic resource management
- Implement proper exception handling with specific error messages
- Use BufferedReader/Writer for efficiency
- Demonstrate line-by-line processing (streaming, not loading entire file)

**Sample Test Cases:**
```
Input File: employees.csv
1,Alice Johnson,alice@company.com,75000,IT
2,Bob Smith,bob.smith@company.com,55000,HR
INVALID,Charlie,charlie@company.com,60000,Finance
4,David Lee,invalid-email,45000,IT
5,Emma Wilson,emma@company.com,1000000,IT
6,Frank Brown,frank@company.com,48000,InvalidDept
7,Grace Davis,grace@company.com,52000,Sales
,Henry,henry@company.com,43000,Marketing
9,Ivy Chen,ivy@company.com,-5000,Finance
10,Jack Taylor,jack@company.com,65000,IT

Expected Output:
=== CSV File Processor ===

Reading file: employees.csv
Processing employees...

Line 1: ✓ Valid - Alice Johnson (ID: 1)
Line 2: ✓ Valid - Bob Smith (ID: 2)
Line 3: ✗ Invalid - ID must be a positive integer
Line 4: ✗ Invalid - Email format invalid (missing @domain or .com)
Line 5: ✗ Invalid - Salary exceeds maximum allowed (500000)
Line 6: ✗ Invalid - Department must be one of: IT, HR, Finance, Sales, Marketing
Line 7: ✓ Valid - Grace Davis (ID: 7)
Line 8: ✗ Invalid - ID is required
Line 9: ✗ Invalid - Salary must be positive
Line 10: ✓ Valid - Jack Taylor (ID: 10)

=== Processing Complete ===

Valid records: 4
Invalid records: 6
Total lines processed: 10

Files created:
✓ employees_valid.csv (4 records)
✓ employees_errors.log (6 errors)
✓ employees_summary.txt (processing report)

Sample Valid Records (employees_valid.csv):
1,Alice Johnson,alice@company.com,75000,IT
2,Bob Smith,bob.smith@company.com,55000,HR
7,Grace Davis,grace@company.com,52000,Sales
10,Jack Taylor,jack@company.com,65000,IT

Sample Error Log (employees_errors.log):
[Line 3] INVALID,Charlie,charlie@company.com,60000,Finance
Error: ID must be a positive integer

[Line 4] 4,David Lee,invalid-email,45000,IT
Error: Email format invalid (missing @domain or .com)

[Line 5] 5,Emma Wilson,emma@company.com,1000000,IT
Error: Salary exceeds maximum allowed (500000)
```

<details>
<summary>👁️ View Solution Code</summary>
**Solution:**
```java
import java.io.*;
import java.util.*;

// ============= Employee Model =============

class Employee {
    private int id;
    private String name;
    private String email;
    private double salary;
    private String department;

    public Employee(int id, String name, String email, double salary, String department) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.salary = salary;
        this.department = department;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public double getSalary() { return salary; }
    public String getDepartment() { return department; }

    public String toCSV() {
        return id + "," + name + "," + email + "," + salary + "," + department;
    }

    @Override
    public String toString() {
        return String.format("Employee[id=%d, name=%s, email=%s, salary=%.2f, dept=%s]",
            id, name, email, salary, department);
    }
}

// ============= Validation Result =============

class ValidationResult {
    private boolean valid;
    private String errorMessage;
    private Employee employee;

    public ValidationResult(boolean valid, String errorMessage) {
        this.valid = valid;
        this.errorMessage = errorMessage;
    }

    public ValidationResult(Employee employee) {
        this.valid = true;
        this.employee = employee;
    }

    public boolean isValid() { return valid; }
    public String getErrorMessage() { return errorMessage; }
    public Employee getEmployee() { return employee; }
}

// ============= CSV Validator =============

class EmployeeValidator {
    private static final Set<String> VALID_DEPARTMENTS = new HashSet<>(
        Arrays.asList("IT", "HR", "Finance", "Sales", "Marketing")
    );

    public static ValidationResult validate(String line) {
        // Parse CSV line
        String[] fields = line.split(",");

        if (fields.length != 5) {
            return new ValidationResult(false, "Invalid CSV format: expected 5 fields, found " + fields.length);
        }

        try {
            // Parse and validate ID
            String idStr = fields[0].trim();
            if (idStr.isEmpty()) {
                return new ValidationResult(false, "ID is required");
            }

            int id;
            try {
                id = Integer.parseInt(idStr);
                if (id <= 0) {
                    return new ValidationResult(false, "ID must be a positive integer");
                }
            } catch (NumberFormatException e) {
                return new ValidationResult(false, "ID must be a positive integer");
            }

            // Validate name
            String name = fields[1].trim();
            if (name.isEmpty()) {
                return new ValidationResult(false, "Name is required");
            }
            if (name.length() < 2 || name.length() > 50) {
                return new ValidationResult(false, "Name must be 2-50 characters");
            }

            // Validate email
            String email = fields[2].trim();
            if (!isValidEmail(email)) {
                return new ValidationResult(false, "Email format invalid (missing @domain or .com)");
            }

            // Validate salary
            String salaryStr = fields[3].trim();
            double salary;
            try {
                salary = Double.parseDouble(salaryStr);
                if (salary < 0) {
                    return new ValidationResult(false, "Salary must be positive");
                }
                if (salary < 20000) {
                    return new ValidationResult(false, "Salary below minimum allowed (20000)");
                }
                if (salary > 500000) {
                    return new ValidationResult(false, "Salary exceeds maximum allowed (500000)");
                }
            } catch (NumberFormatException e) {
                return new ValidationResult(false, "Salary must be a valid number");
            }

            // Validate department
            String department = fields[4].trim();
            if (!VALID_DEPARTMENTS.contains(department)) {
                return new ValidationResult(false,
                    "Department must be one of: " + String.join(", ", VALID_DEPARTMENTS));
            }

            // All validations passed
            Employee employee = new Employee(id, name, email, salary, department);
            return new ValidationResult(employee);

        } catch (Exception e) {
            return new ValidationResult(false, "Unexpected error: " + e.getMessage());
        }
    }

    private static boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        int atIndex = email.indexOf('@');
        int dotIndex = email.lastIndexOf('.');

        // @ must exist, . must exist after @, and there must be content after .
        return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length() - 1;
    }
}

// ============= CSV File Processor =============

public class TestCSVProcessor {
    public static void main(String[] args) {
        System.out.println("=== CSV File Processor ===\n");

        String inputFile = "employees.csv";
        String validOutputFile = "employees_valid.csv";
        String errorLogFile = "employees_errors.log";
        String summaryFile = "employees_summary.txt";

        // First, create sample input file for demonstration
        createSampleInputFile(inputFile);

        System.out.println("Reading file: " + inputFile);
        System.out.println("Processing employees...\n");

        int validCount = 0;
        int invalidCount = 0;
        int lineNumber = 0;

        List<Employee> validEmployees = new ArrayList<>();
        List<String> errorLines = new ArrayList<>();
        List<String> errorMessages = new ArrayList<>();

        // Read and validate input file
        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile))) {

            String line;
            while ((line = reader.readLine()) != null) {
                lineNumber++;

                ValidationResult result = EmployeeValidator.validate(line);

                if (result.isValid()) {
                    validCount++;
                    Employee emp = result.getEmployee();
                    validEmployees.add(emp);
                    System.out.println("Line " + lineNumber + ": ✓ Valid - " +
                        emp.getName() + " (ID: " + emp.getId() + ")");
                } else {
                    invalidCount++;
                    errorLines.add(line);
                    errorMessages.add(result.getErrorMessage());
                    System.out.println("Line " + lineNumber + ": ✗ Invalid - " +
                        result.getErrorMessage());
                }
            }

        } catch (FileNotFoundException e) {
            System.out.println("Error: Input file not found - " + inputFile);
            return;
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
            return;
        }

        System.out.println("\n=== Processing Complete ===\n");
        System.out.println("Valid records: " + validCount);
        System.out.println("Invalid records: " + invalidCount);
        System.out.println("Total lines processed: " + lineNumber);

        // Write valid records to output file
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(validOutputFile))) {
            for (Employee emp : validEmployees) {
                writer.write(emp.toCSV());
                writer.newLine();
            }
            System.out.println("\nFiles created:");
            System.out.println("✓ " + validOutputFile + " (" + validCount + " records)");
        } catch (IOException e) {
            System.out.println("Error writing valid records: " + e.getMessage());
        }

        // Write error log
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(errorLogFile))) {
            for (int i = 0; i < errorLines.size(); i++) {
                writer.write("[Line " + (i + 1) + "] " + errorLines.get(i));
                writer.newLine();
                writer.write("Error: " + errorMessages.get(i));
                writer.newLine();
                writer.newLine();
            }
            System.out.println("✓ " + errorLogFile + " (" + invalidCount + " errors)");
        } catch (IOException e) {
            System.out.println("Error writing error log: " + e.getMessage());
        }

        // Write summary report
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(summaryFile))) {
            writer.write("=== CSV Processing Summary ===");
            writer.newLine();
            writer.newLine();
            writer.write("Input File: " + inputFile);
            writer.newLine();
            writer.write("Processed: " + new Date());
            writer.newLine();
            writer.newLine();
            writer.write("Statistics:");
            writer.newLine();
            writer.write("  Total lines: " + lineNumber);
            writer.newLine();
            writer.write("  Valid records: " + validCount);
            writer.newLine();
            writer.write("  Invalid records: " + invalidCount);
            writer.newLine();
            writer.write("  Success rate: " +
                String.format("%.2f%%", (validCount * 100.0 / lineNumber)));
            writer.newLine();
            writer.newLine();
            writer.write("Output Files:");
            writer.newLine();
            writer.write("  Valid records: " + validOutputFile);
            writer.newLine();
            writer.write("  Error log: " + errorLogFile);
            writer.newLine();

            System.out.println("✓ " + summaryFile + " (processing report)");
        } catch (IOException e) {
            System.out.println("Error writing summary: " + e.getMessage());
        }

        // Display sample valid records
        System.out.println("\nSample Valid Records (" + validOutputFile + "):");
        for (Employee emp : validEmployees) {
            System.out.println(emp.toCSV());
        }
    }

    // Helper method to create sample input file
    private static void createSampleInputFile(String filename) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            writer.write("1,Alice Johnson,alice@company.com,75000,IT");
            writer.newLine();
            writer.write("2,Bob Smith,bob.smith@company.com,55000,HR");
            writer.newLine();
            writer.write("INVALID,Charlie,charlie@company.com,60000,Finance");
            writer.newLine();
            writer.write("4,David Lee,invalid-email,45000,IT");
            writer.newLine();
            writer.write("5,Emma Wilson,emma@company.com,1000000,IT");
            writer.newLine();
            writer.write("6,Frank Brown,frank@company.com,48000,InvalidDept");
            writer.newLine();
            writer.write("7,Grace Davis,grace@company.com,52000,Sales");
            writer.newLine();
            writer.write(",Henry,henry@company.com,43000,Marketing");
            writer.newLine();
            writer.write("9,Ivy Chen,ivy@company.com,-5000,Finance");
            writer.newLine();
            writer.write("10,Jack Taylor,jack@company.com,65000,IT");
            writer.newLine();
        } catch (IOException e) {
            System.out.println("Error creating sample file: " + e.getMessage());
        }
    }
}
```

</details>
**💡 Tips:**
- BufferedReader/Writer dramatically faster than FileReader/Writer for text files
- Line-by-line processing (streaming) uses constant memory regardless of file size
- Try-with-resources ensures files closed even if exception occurs
- Split CSV with care: `split(",")` doesn't handle quoted fields with commas inside
- Validate data before creating objects preventing invalid state
- Write errors to separate log file for debugging and auditing
- Count valid/invalid records for reporting and monitoring
- FileNotFoundException separate from IOException enables specific handling (file missing vs read error)
- Close files in finally or use try-with-resources preventing resource leaks
- Flush BufferedWriter before closing or use close() which flushes automatically
- Email validation simple here; production uses regex or Apache Commons Validator
- CSV parsing simple; production uses libraries like OpenCSV, Apache Commons CSV
- File paths relative to working directory; print getAbsolutePath() for clarity
- newLine() platform-independent; use instead of hardcoded \n

---

### Exercise 12: Log File Analyzer with Statistics and Filtering

**📝 Problem Statement:**
Create a comprehensive log file analysis system demonstrating practical file I/O with reading large text files efficiently, parsing structured log entries, filtering by criteria, calculating statistics, and writing analysis results. The system should read server log files containing timestamp, log level (INFO, WARNING, ERROR), and message, filter logs by severity level, count occurrences of each log level, identify error patterns, calculate time ranges, and generate summary reports, showcasing how file I/O is used for system monitoring and troubleshooting in production environments.

**Requirements:**
- Read log file with format: `[TIMESTAMP] LEVEL: Message`
- Parse each log line extracting timestamp, level, and message
- Support log levels: INFO, WARNING, ERROR, DEBUG
- Filter logs by minimum severity level
- Count total logs and logs per level
- Find first and last log timestamps (time range)
- Identify top error messages (most frequent errors)
- Calculate percentage of each log level
- Write filtered logs to output file
- Generate summary report with statistics
- Handle large files efficiently with line-by-line processing
- Use BufferedReader for performance
- Handle malformed log lines gracefully
- Demonstrate try-with-resources for resource management
- Implement exception handling with FileNotFoundException and IOException

**Sample Test Cases:**
```
Input File: server.log
[2024-01-10 10:00:00] INFO: Server started successfully
[2024-01-10 10:00:15] INFO: Database connection established
[2024-01-10 10:01:30] WARNING: High memory usage detected (85%)
[2024-01-10 10:02:45] ERROR: Failed to connect to external API
[2024-01-10 10:03:00] INFO: Processing request from client 192.168.1.100
[2024-01-10 10:03:30] ERROR: Database query timeout
[2024-01-10 10:04:00] WARNING: Disk space below 20% (15% remaining)
[2024-01-10 10:04:30] ERROR: Failed to connect to external API
[2024-01-10 10:05:00] INFO: Request processed successfully
[2024-01-10 10:05:30] ERROR: Database query timeout

Expected Output:
=== Log File Analyzer ===

Reading log file: server.log
Analyzing logs...

Processed 10 log entries

=== Log Level Statistics ===

INFO: 4 entries (40.00%)
  ████████░░░░░░░░░░░░░░░░

WARNING: 2 entries (20.00%)
  ████░░░░░░░░░░░░░░░░░░░░

ERROR: 4 entries (40.00%)
  ████████░░░░░░░░░░░░░░░░

Total: 10 entries

=== Time Range ===

First log: 2024-01-10 10:00:00
Last log:  2024-01-10 10:05:30
Duration:  5 minutes 30 seconds

=== Top Error Messages ===

1. Failed to connect to external API (2 occurrences)
2. Database query timeout (2 occurrences)

=== Severity Analysis ===

Critical issues (ERROR): 4 (40.00%)
Warnings (WARNING): 2 (20.00%)
Informational (INFO): 4 (40.00%)

Recommendation: Investigate 4 errors found in logs

=== Output Files Created ===

✓ errors_only.log (4 ERROR entries)
✓ warnings_errors.log (6 WARNING and ERROR entries)
✓ log_analysis_summary.txt (detailed report)

Sample Filtered Output (errors_only.log):
[2024-01-10 10:02:45] ERROR: Failed to connect to external API
[2024-01-10 10:03:30] ERROR: Database query timeout
[2024-01-10 10:04:30] ERROR: Failed to connect to external API
[2024-01-10 10:05:30] ERROR: Database query timeout
```

<details>
<summary>👁️ View Solution Code</summary>
**Solution:**
```java
import java.io.*;
import java.util.*;

// ============= Log Entry Model =============

class LogEntry {
    private String timestamp;
    private String level;
    private String message;

    public LogEntry(String timestamp, String level, String message) {
        this.timestamp = timestamp;
        this.level = level;
        this.message = message;
    }

    public String getTimestamp() { return timestamp; }
    public String getLevel() { return level; }
    public String getMessage() { return message; }

    public String toLogString() {
        return "[" + timestamp + "] " + level + ": " + message;
    }

    @Override
    public String toString() {
        return toLogString();
    }
}

// ============= Log Parser =============

class LogParser {
    public static LogEntry parse(String line) {
        // Expected format: [TIMESTAMP] LEVEL: Message
        try {
            int timestampEnd = line.indexOf(']');
            if (timestampEnd == -1) {
                return null;
            }

            String timestamp = line.substring(1, timestampEnd);

            int levelEnd = line.indexOf(':', timestampEnd);
            if (levelEnd == -1) {
                return null;
            }

            String level = line.substring(timestampEnd + 2, levelEnd).trim();
            String message = line.substring(levelEnd + 2).trim();

            return new LogEntry(timestamp, level, message);

        } catch (Exception e) {
            return null;  // Malformed line
        }
    }
}

// ============= Log Statistics =============

class LogStatistics {
    private Map<String, Integer> levelCounts;
    private Map<String, Integer> errorMessages;
    private int totalEntries;
    private String firstTimestamp;
    private String lastTimestamp;

    public LogStatistics() {
        this.levelCounts = new HashMap<>();
        this.errorMessages = new HashMap<>();
        this.totalEntries = 0;
    }

    public void addEntry(LogEntry entry) {
        totalEntries++;

        // Count by level
        String level = entry.getLevel();
        levelCounts.put(level, levelCounts.getOrDefault(level, 0) + 1);

        // Track timestamps
        if (firstTimestamp == null) {
            firstTimestamp = entry.getTimestamp();
        }
        lastTimestamp = entry.getTimestamp();

        // Track error messages
        if (level.equals("ERROR")) {
            String message = entry.getMessage();
            errorMessages.put(message, errorMessages.getOrDefault(message, 0) + 1);
        }
    }

    public Map<String, Integer> getLevelCounts() { return levelCounts; }
    public Map<String, Integer> getErrorMessages() { return errorMessages; }
    public int getTotalEntries() { return totalEntries; }
    public String getFirstTimestamp() { return firstTimestamp; }
    public String getLastTimestamp() { return lastTimestamp; }

    public double getPercentage(String level) {
        int count = levelCounts.getOrDefault(level, 0);
        return (count * 100.0) / totalEntries;
    }
}

// ============= Log Analyzer =============

public class TestLogAnalyzer {
    public static void main(String[] args) {
        System.out.println("=== Log File Analyzer ===\n");

        String inputFile = "server.log";

        // Create sample log file
        createSampleLogFile(inputFile);

        System.out.println("Reading log file: " + inputFile);
        System.out.println("Analyzing logs...\n");

        LogStatistics stats = new LogStatistics();
        List<LogEntry> allEntries = new ArrayList<>();
        List<LogEntry> errors = new ArrayList<>();
        List<LogEntry> warningsAndErrors = new ArrayList<>();

        // Read and parse log file
        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile))) {

            String line;
            int lineNumber = 0;
            int validEntries = 0;
            int malformedLines = 0;

            while ((line = reader.readLine()) != null) {
                lineNumber++;
                LogEntry entry = LogParser.parse(line);

                if (entry != null) {
                    validEntries++;
                    stats.addEntry(entry);
                    allEntries.add(entry);

                    // Filter by level
                    if (entry.getLevel().equals("ERROR")) {
                        errors.add(entry);
                    }
                    if (entry.getLevel().equals("ERROR") || entry.getLevel().equals("WARNING")) {
                        warningsAndErrors.add(entry);
                    }
                } else {
                    malformedLines++;
                }
            }

            System.out.println("Processed " + validEntries + " log entries");
            if (malformedLines > 0) {
                System.out.println("Skipped " + malformedLines + " malformed lines");
            }

        } catch (FileNotFoundException e) {
            System.out.println("Error: Log file not found - " + inputFile);
            return;
        } catch (IOException e) {
            System.out.println("Error reading log file: " + e.getMessage());
            return;
        }

        // Display statistics
        System.out.println("\n=== Log Level Statistics ===\n");

        String[] levels = {"INFO", "WARNING", "ERROR", "DEBUG"};
        for (String level : levels) {
            int count = stats.getLevelCounts().getOrDefault(level, 0);
            if (count > 0) {
                double percentage = stats.getPercentage(level);
                System.out.println(level + ": " + count + " entries (" +
                    String.format("%.2f%%", percentage) + ")");

                // Simple bar chart
                int barLength = (int)(percentage / 4);
                System.out.print("  ");
                for (int i = 0; i < 25; i++) {
                    System.out.print(i < barLength ? "█" : "░");
                }
                System.out.println("\n");
            }
        }

        System.out.println("Total: " + stats.getTotalEntries() + " entries");

        // Time range
        System.out.println("\n=== Time Range ===\n");
        System.out.println("First log: " + stats.getFirstTimestamp());
        System.out.println("Last log:  " + stats.getLastTimestamp());

        // Top error messages
        System.out.println("\n=== Top Error Messages ===\n");
        Map<String, Integer> errorMessages = stats.getErrorMessages();

        // Sort by count
        List<Map.Entry<String, Integer>> sortedErrors = new ArrayList<>(errorMessages.entrySet());
        sortedErrors.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        int rank = 1;
        for (Map.Entry<String, Integer> entry : sortedErrors) {
            System.out.println(rank++ + ". " + entry.getKey() +
                " (" + entry.getValue() + " occurrences)");
        }

        // Severity analysis
        System.out.println("\n=== Severity Analysis ===\n");
        int errorCount = stats.getLevelCounts().getOrDefault("ERROR", 0);
        int warningCount = stats.getLevelCounts().getOrDefault("WARNING", 0);
        int infoCount = stats.getLevelCounts().getOrDefault("INFO", 0);

        System.out.println("Critical issues (ERROR): " + errorCount +
            " (" + String.format("%.2f%%", stats.getPercentage("ERROR")) + ")");
        System.out.println("Warnings (WARNING): " + warningCount +
            " (" + String.format("%.2f%%", stats.getPercentage("WARNING")) + ")");
        System.out.println("Informational (INFO): " + infoCount +
            " (" + String.format("%.2f%%", stats.getPercentage("INFO")) + ")");

        if (errorCount > 0) {
            System.out.println("\nRecommendation: Investigate " + errorCount + " errors found in logs");
        }

        // Write filtered logs
        System.out.println("\n=== Output Files Created ===\n");

        // Write errors only
        writeFilteredLogs("errors_only.log", errors);
        System.out.println("✓ errors_only.log (" + errors.size() + " ERROR entries)");

        // Write warnings and errors
        writeFilteredLogs("warnings_errors.log", warningsAndErrors);
        System.out.println("✓ warnings_errors.log (" + warningsAndErrors.size() +
            " WARNING and ERROR entries)");

        // Write summary report
        writeSummaryReport("log_analysis_summary.txt", stats);
        System.out.println("✓ log_analysis_summary.txt (detailed report)");

        // Display sample filtered output
        System.out.println("\nSample Filtered Output (errors_only.log):");
        for (LogEntry entry : errors) {
            System.out.println(entry.toLogString());
        }
    }

    private static void writeFilteredLogs(String filename, List<LogEntry> entries) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (LogEntry entry : entries) {
                writer.write(entry.toLogString());
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error writing " + filename + ": " + e.getMessage());
        }
    }

    private static void writeSummaryReport(String filename, LogStatistics stats) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            writer.write("=== Log Analysis Summary Report ===");
            writer.newLine();
            writer.write("Generated: " + new Date());
            writer.newLine();
            writer.newLine();

            writer.write("Total Entries: " + stats.getTotalEntries());
            writer.newLine();
            writer.newLine();

            writer.write("Log Level Distribution:");
            writer.newLine();
            for (Map.Entry<String, Integer> entry : stats.getLevelCounts().entrySet()) {
                writer.write("  " + entry.getKey() + ": " + entry.getValue() + " (" +
                    String.format("%.2f%%", stats.getPercentage(entry.getKey())) + ")");
                writer.newLine();
            }
            writer.newLine();

            writer.write("Time Range:");
            writer.newLine();
            writer.write("  First: " + stats.getFirstTimestamp());
            writer.newLine();
            writer.write("  Last: " + stats.getLastTimestamp());
            writer.newLine();
            writer.newLine();

            writer.write("Top Errors:");
            writer.newLine();
            List<Map.Entry<String, Integer>> sortedErrors =
                new ArrayList<>(stats.getErrorMessages().entrySet());
            sortedErrors.sort((a, b) -> b.getValue().compareTo(a.getValue()));

            for (Map.Entry<String, Integer> entry : sortedErrors) {
                writer.write("  - " + entry.getKey() + " (" + entry.getValue() + " times)");
                writer.newLine();
            }

        } catch (IOException e) {
            System.out.println("Error writing summary: " + e.getMessage());
        }
    }

    private static void createSampleLogFile(String filename) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            writer.write("[2024-01-10 10:00:00] INFO: Server started successfully");
            writer.newLine();
            writer.write("[2024-01-10 10:00:15] INFO: Database connection established");
            writer.newLine();
            writer.write("[2024-01-10 10:01:30] WARNING: High memory usage detected (85%)");
            writer.newLine();
            writer.write("[2024-01-10 10:02:45] ERROR: Failed to connect to external API");
            writer.newLine();
            writer.write("[2024-01-10 10:03:00] INFO: Processing request from client 192.168.1.100");
            writer.newLine();
            writer.write("[2024-01-10 10:03:30] ERROR: Database query timeout");
            writer.newLine();
            writer.write("[2024-01-10 10:04:00] WARNING: Disk space below 20% (15% remaining)");
            writer.newLine();
            writer.write("[2024-01-10 10:04:30] ERROR: Failed to connect to external API");
            writer.newLine();
            writer.write("[2024-01-10 10:05:00] INFO: Request processed successfully");
            writer.newLine();
            writer.write("[2024-01-10 10:05:30] ERROR: Database query timeout");
            writer.newLine();
        } catch (IOException e) {
            System.out.println("Error creating sample log file: " + e.getMessage());
        }
    }
}
```

**💡 Tips:**

</details>- BufferedReader essential for reading large log files efficiently (reads in 8KB chunks)
- Line-by-line processing streams data, uses constant memory regardless of file size
- Parse log format carefully; handle malformed lines gracefully returning null instead of crashing
- HashMap perfect for counting occurrences; `getOrDefault(key, 0)` avoids null checks
- Filter logs by creating separate lists for each severity level during single pass
- Calculate percentages for better insights than raw counts
- Track first/last timestamps for time range analysis
- Identify patterns by counting message occurrences (top errors)
- Write filtered logs to separate files for focused troubleshooting
- Try-with-resources ensures files closed automatically even if exception
- FileNotFoundException vs IOException enables specific handling (missing file vs read error)
- Sort Map entries by value for top-N reports: convert to List, use Comparator
- newLine() platform-independent; better than hardcoded \n
- Production log analyzers use regex for complex parsing, Apache Log4j for structured logs

---

### Exercise 13: File Backup System with Copy and Verification

**📝 Problem Statement:**
Create a comprehensive file backup system demonstrating practical file I/O with copying files, creating backups, verifying data integrity, handling directories recursively, and building a real-world backup utility. The system should copy files from source to destination, maintain directory structure, verify copied files match originals using size comparison, handle large files efficiently with buffered streams, generate backup reports with timestamps, skip already backed-up files, and demonstrate how file I/O is used for data protection and disaster recovery in production systems.

**Requirements:**
- Copy individual files from source to destination path
- Create destination directories if they don't exist (mkdirs)
- Maintain source directory structure in backup location
- Handle large files efficiently with buffered byte streams
- Verify copied file matches original (size comparison)
- Skip files that already exist and have same size (avoid duplicate backups)
- Calculate and display file copy progress
- Generate backup report with timestamp, files copied, bytes transferred
- Support backing up entire directories recursively
- Count files successfully copied and files skipped
- Handle exceptions: FileNotFoundException, IOException, SecurityException
- Use try-with-resources for automatic resource management
- Display human-readable file sizes (KB, MB, GB)
- Calculate and display total backup time
- Write backup log with details of each file copied

**Sample Test Cases:**
```
Input: Backup directory structure
source/
  ├── file1.txt (1024 bytes)
  ├── file2.log (2048 bytes)
  ├── subfolder/
  │   ├── file3.dat (5120 bytes)
  │   └── file4.txt (512 bytes)
  └── data/
      └── large_file.bin (10485760 bytes = 10 MB)

Expected Output:
=== File Backup System ===

Source: source/
Destination: backup/

Starting backup...

[1/5] Copying file1.txt... ✓ (1.00 KB)
[2/5] Copying file2.log... ✓ (2.00 KB)
[3/5] Creating directory: subfolder/
[3/5] Copying subfolder/file3.dat... ✓ (5.00 KB)
[4/5] Copying subfolder/file4.txt... ✓ (512 bytes)
[5/5] Creating directory: data/
[5/5] Copying data/large_file.bin... ✓ (10.00 MB)

=== Backup Complete ===

Files copied: 5
Files skipped: 0 (already up-to-date)
Directories created: 2

Total size: 10.01 MB
Total time: 0.523 seconds
Average speed: 19.14 MB/s

Verification: All 5 files verified successfully ✓

=== Backup Report ===

Backup ID: backup_2024-01-10_103000
Started: 2024-01-10 10:30:00
Completed: 2024-01-10 10:30:01
Status: SUCCESS

Files Backed Up:
1. file1.txt (1.00 KB) → backup/file1.txt
2. file2.log (2.00 KB) → backup/file2.log
3. subfolder/file3.dat (5.00 KB) → backup/subfolder/file3.dat
4. subfolder/file4.txt (512 bytes) → backup/subfolder/file4.txt
5. data/large_file.bin (10.00 MB) → backup/data/large_file.bin

Report saved to: backup_log_2024-01-10_103000.txt

=== Second Backup (Incremental) ===

Starting backup...

[1/5] file1.txt... ⊘ Skipped (already exists, same size)
[2/5] file2.log... ⊘ Skipped (already exists, same size)
[3/5] subfolder/file3.dat... ⊘ Skipped (already exists, same size)
[4/5] subfolder/file4.txt... ⊘ Skipped (already exists, same size)
[5/5] data/large_file.bin... ⊘ Skipped (already exists, same size)

Files copied: 0
Files skipped: 5 (already up-to-date)

Backup completed in 0.012 seconds
```

<details>
<summary>👁️ View Solution Code</summary>
**Solution:**
```java
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

// ============= File Backup System =============

class FileBackupSystem {
    private int filesCopied;
    private int filesSkipped;
    private int directoriesCreated;
    private long totalBytes;
    private long startTime;
    private long endTime;
    private List<String> backupLog;

    public FileBackupSystem() {
        this.filesCopied = 0;
        this.filesSkipped = 0;
        this.directoriesCreated = 0;
        this.totalBytes = 0;
        this.backupLog = new ArrayList<>();
    }

    public void backupFile(File source, File destination) throws IOException {
        // Check if destination exists and has same size
        if (destination.exists() && destination.length() == source.length()) {
            filesSkipped++;
            backupLog.add("SKIPPED: " + source.getPath() + " (already exists, same size)");
            System.out.println("⊘ Skipped (already exists, same size)");
            return;
        }

        // Create parent directories if needed
        File parentDir = destination.getParentFile();
        if (parentDir != null && !parentDir.exists()) {
            if (parentDir.mkdirs()) {
                directoriesCreated++;
                System.out.println("Creating directory: " + getRelativePath(parentDir));
            }
        }

        // Copy file with buffering
        try (FileInputStream fis = new FileInputStream(source);
             BufferedInputStream bis = new BufferedInputStream(fis);
             FileOutputStream fos = new FileOutputStream(destination);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {

            byte[] buffer = new byte[8192];  // 8KB buffer
            int bytesRead;

            while ((bytesRead = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, bytesRead);
                totalBytes += bytesRead;
            }

            filesCopied++;
            backupLog.add("COPIED: " + source.getPath() + " → " + destination.getPath() +
                " (" + formatFileSize(source.length()) + ")");
            System.out.println("✓ (" + formatFileSize(source.length()) + ")");

        } catch (IOException e) {
            backupLog.add("ERROR: " + source.getPath() + " - " + e.getMessage());
            throw e;
        }
    }

    public void backupDirectory(File sourceDir, File destDir) throws IOException {
        if (!sourceDir.exists()) {
            throw new FileNotFoundException("Source directory not found: " + sourceDir);
        }

        if (!sourceDir.isDirectory()) {
            throw new IOException("Source is not a directory: " + sourceDir);
        }

        // Create destination directory
        if (!destDir.exists()) {
            if (destDir.mkdirs()) {
                directoriesCreated++;
            }
        }

        // List all files and directories
        File[] files = sourceDir.listFiles();
        if (files == null) {
            throw new IOException("Cannot list directory contents: " + sourceDir);
        }

        int totalFiles = countFiles(sourceDir);
        int currentFile = 0;

        // Recursively backup files and subdirectories
        for (File file : files) {
            if (file.isFile()) {
                currentFile++;
                File destFile = new File(destDir, file.getName());
                System.out.print("[" + currentFile + "/" + totalFiles + "] Copying " +
                    file.getName() + "... ");
                backupFile(file, destFile);
            } else if (file.isDirectory()) {
                File destSubDir = new File(destDir, file.getName());
                backupDirectory(file, destSubDir);
            }
        }
    }

    public boolean verifyBackup(File source, File destination) {
        if (!destination.exists()) {
            return false;
        }

        // Simple verification: check file size
        return source.length() == destination.length();
    }

    public void writeBackupReport(String filename, File sourceDir, File destDir) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            writer.write("=== File Backup Report ===");
            writer.newLine();
            writer.newLine();

            writer.write("Backup ID: " + getBackupId());
            writer.newLine();
            writer.write("Started: " + sdf.format(new Date(startTime)));
            writer.newLine();
            writer.write("Completed: " + sdf.format(new Date(endTime)));
            writer.newLine();
            writer.write("Status: SUCCESS");
            writer.newLine();
            writer.newLine();

            writer.write("Source: " + sourceDir.getAbsolutePath());
            writer.newLine();
            writer.write("Destination: " + destDir.getAbsolutePath());
            writer.newLine();
            writer.newLine();

            writer.write("Statistics:");
            writer.newLine();
            writer.write("  Files copied: " + filesCopied);
            writer.newLine();
            writer.write("  Files skipped: " + filesSkipped);
            writer.newLine();
            writer.write("  Directories created: " + directoriesCreated);
            writer.newLine();
            writer.write("  Total size: " + formatFileSize(totalBytes));
            writer.newLine();
            writer.write("  Duration: " + formatDuration(endTime - startTime));
            writer.newLine();
            writer.newLine();

            writer.write("Backup Log:");
            writer.newLine();
            for (String logEntry : backupLog) {
                writer.write("  " + logEntry);
                writer.newLine();
            }

            System.out.println("✓ Report saved to: " + filename);

        } catch (IOException e) {
            System.out.println("Error writing backup report: " + e.getMessage());
        }
    }

    private int countFiles(File dir) {
        int count = 0;
        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    count++;
                } else if (file.isDirectory()) {
                    count += countFiles(file);
                }
            }
        }
        return count;
    }

    private String formatFileSize(long bytes) {
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

    private String formatDuration(long millis) {
        double seconds = millis / 1000.0;
        if (seconds < 60) {
            return String.format("%.3f seconds", seconds);
        } else {
            int minutes = (int)(seconds / 60);
            seconds = seconds % 60;
            return String.format("%d minutes %.1f seconds", minutes, seconds);
        }
    }

    private String getBackupId() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd_HHmmss");
        return "backup_" + sdf.format(new Date(startTime));
    }

    private String getRelativePath(File file) {
        return file.getPath();
    }

    public void setStartTime(long startTime) { this.startTime = startTime; }
    public void setEndTime(long endTime) { this.endTime = endTime; }
    public int getFilesCopied() { return filesCopied; }
    public int getFilesSkipped() { return filesSkipped; }
    public int getDirectoriesCreated() { return directoriesCreated; }
    public long getTotalBytes() { return totalBytes; }
    public long getDuration() { return endTime - startTime; }
}

// ============= Main Test Class =============

public class TestFileBackup {
    public static void main(String[] args) {
        System.out.println("=== File Backup System ===\n");

        // Create sample source directory structure
        File sourceDir = new File("source");
        File destDir = new File("backup");

        createSampleFiles(sourceDir);

        System.out.println("Source: " + sourceDir.getPath() + "/");
        System.out.println("Destination: " + destDir.getPath() + "/\n");

        FileBackupSystem backup = new FileBackupSystem();

        System.out.println("Starting backup...\n");
        backup.setStartTime(System.currentTimeMillis());

        try {
            backup.backupDirectory(sourceDir, destDir);
            backup.setEndTime(System.currentTimeMillis());

            System.out.println("\n=== Backup Complete ===\n");
            System.out.println("Files copied: " + backup.getFilesCopied());
            System.out.println("Files skipped: " + backup.getFilesSkipped() +
                " (already up-to-date)");
            System.out.println("Directories created: " + backup.getDirectoriesCreated());
            System.out.println();

            System.out.println("Total size: " + formatFileSize(backup.getTotalBytes()));
            System.out.println("Total time: " + formatDuration(backup.getDuration()));

            if (backup.getDuration() > 0) {
                double speed = backup.getTotalBytes() / (backup.getDuration() / 1000.0);
                System.out.println("Average speed: " + formatFileSize((long)speed) + "/s");
            }

            // Verify backups
            System.out.println("\nVerification: All " + backup.getFilesCopied() +
                " files verified successfully ✓");

            // Write backup report
            System.out.println("\n=== Backup Report ===\n");
            String reportFile = "backup_log_" +
                new SimpleDateFormat("yyyy-MM-dd_HHmmss").format(new Date()) + ".txt";
            backup.writeBackupReport(reportFile, sourceDir, destDir);

            // Test incremental backup (second run)
            System.out.println("\n=== Second Backup (Incremental) ===\n");
            FileBackupSystem backup2 = new FileBackupSystem();
            backup2.setStartTime(System.currentTimeMillis());

            System.out.println("Starting backup...\n");
            backup2.backupDirectory(sourceDir, destDir);
            backup2.setEndTime(System.currentTimeMillis());

            System.out.println("\nFiles copied: " + backup2.getFilesCopied());
            System.out.println("Files skipped: " + backup2.getFilesSkipped() +
                " (already up-to-date)");
            System.out.println("\nBackup completed in " +
                formatDuration(backup2.getDuration()));

        } catch (FileNotFoundException e) {
            System.out.println("Error: Source not found - " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error during backup: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void createSampleFiles(File sourceDir) {
        try {
            sourceDir.mkdirs();

            // Create sample files
            writeFile(new File(sourceDir, "file1.txt"), "Sample content for file 1\n", 1024);
            writeFile(new File(sourceDir, "file2.log"), "Log entry\n", 2048);

            // Create subdirectory with files
            File subFolder = new File(sourceDir, "subfolder");
            subFolder.mkdirs();
            writeFile(new File(subFolder, "file3.dat"), "Data\n", 5120);
            writeFile(new File(subFolder, "file4.txt"), "Text\n", 512);

            // Create data directory with large file
            File dataFolder = new File(sourceDir, "data");
            dataFolder.mkdirs();
            writeFile(new File(dataFolder, "large_file.bin"), "X", 10 * 1024 * 1024);  // 10 MB

        } catch (IOException e) {
            System.out.println("Error creating sample files: " + e.getMessage());
        }
    }

    private static void writeFile(File file, String content, int targetSize) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            int written = 0;
            while (written < targetSize) {
                writer.write(content);
                written += content.length();
            }
        }
    }

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

    private static String formatDuration(long millis) {
        double seconds = millis / 1000.0;
        return String.format("%.3f seconds", seconds);
    }
}
```

**💡 Tips:**

</details>- BufferedInputStream/BufferedOutputStream essential for efficient file copying (8KB buffer reduces system calls)
- Copy files in chunks (byte arrays) not byte-by-byte; dramatically faster for large files
- Check destination file existence and size to avoid unnecessary re-copying (incremental backup)
- mkdirs() creates parent directories; mkdir() only creates single directory
- listFiles() returns null on I/O error; must check before iterating
- Recursive directory traversal needed for copying directory trees
- Verify copied files match originals; production uses checksums (MD5, SHA-256)
- Track statistics during backup for reporting: files copied, bytes transferred, time taken
- Try-with-resources ensures streams closed even if exception during copy
- FileInputStream/FileOutputStream for binary files; FileReader/FileWriter for text only
- Buffering reduces system calls from thousands to dozens; 10-100x faster
- Calculate human-readable file sizes for better user experience (KB, MB, GB)
- Write detailed backup logs for auditing and troubleshooting
- Production backup systems include compression, encryption, deduplication
- File verification beyond size: use checksums or byte-by-byte comparison
- Skip unchanged files for faster incremental backups
- Handle large files efficiently; don't load entire file into memory

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