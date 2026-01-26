### Day 25: File Handling - Part 2

---

#### Exercise 1: FileInputStream & FileOutputStream - Binary Files (25 minutes)

**What you'll learn:** Reading and writing binary data using byte streams

**Create class: `BinaryFileDemo`**

**Concept:** **FileInputStream** and **FileOutputStream** work with binary data (bytes). Unlike character streams (Reader/Writer), byte streams handle any type of file: images, videos, PDFs, etc.

```
Character Streams (Day 24) → Text files (.txt, .java, .csv)
Byte Streams (Today) → Binary files (images, PDFs, any file)

FileInputStream → Reads bytes from file
FileOutputStream → Writes bytes to file
```

**Why Byte Streams?**
- **Universal**: Works with ANY file type
- **Exact Copy**: Preserves file structure perfectly
- **Performance**: Direct byte manipulation
- **Images/Media**: Only way to handle non-text files

**Step-by-Step:**

```java
import java.io.*;

public class BinaryFileDemo {
    public static void main(String[] args) {
        System.out.println("===== BINARY FILE OPERATIONS =====\n");

        // Example 1: Writing bytes to a file
        System.out.println("--- Writing Binary Data ---");
        String outputFile = "binary_data.bin";

        try (FileOutputStream fos = new FileOutputStream(outputFile)) {
            // Write individual bytes
            fos.write(65);   // ASCII 'A'
            fos.write(66);   // ASCII 'B'
            fos.write(67);   // ASCII 'C'

            // Write byte array
            byte[] data = {72, 69, 76, 76, 79};  // HELLO
            fos.write(data);

            // Write string as bytes
            String message = " WORLD!";
            fos.write(message.getBytes());

            System.out.println("Binary data written to: " + outputFile);
            System.out.println("Bytes written: " + (3 + data.length + message.length()));

        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }

        // Example 2: Reading bytes from a file
        System.out.println("\n--- Reading Binary Data ---");

        try (FileInputStream fis = new FileInputStream(outputFile)) {
            System.out.println("Reading byte by byte:");

            int byteData;
            int count = 0;

            // Read byte by byte (-1 means end of file)
            while ((byteData = fis.read()) != -1) {
                count++;
                // Print as character and decimal value
                System.out.printf("Byte %d: '%c' (decimal: %d)%n",
                    count, (char)byteData, byteData);
            }

            System.out.println("\nTotal bytes read: " + count);

        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }

        // Example 3: Copying a binary file
        System.out.println("\n--- Copying Binary File ---");
        String sourceFile = "binary_data.bin";
        String destFile = "binary_data_copy.bin";

        try (FileInputStream fis = new FileInputStream(sourceFile);
             FileOutputStream fos = new FileOutputStream(destFile)) {

            byte[] buffer = new byte[1024];  // Read in chunks
            int bytesRead;
            int totalBytes = 0;

            while ((bytesRead = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
                totalBytes += bytesRead;
            }

            System.out.println("File copied successfully!");
            System.out.println("Source: " + sourceFile);
            System.out.println("Destination: " + destFile);
            System.out.println("Bytes copied: " + totalBytes);

        } catch (IOException e) {
            System.out.println("Error copying file: " + e.getMessage());
        }

        // Example 4: Appending to binary file
        System.out.println("\n--- Appending Binary Data ---");

        try (FileOutputStream fos = new FileOutputStream(outputFile, true)) {  // true = append
            String appendData = "\nAPPENDED DATA";
            fos.write(appendData.getBytes());
            System.out.println("Data appended successfully!");

        } catch (IOException e) {
            System.out.println("Error appending: " + e.getMessage());
        }

        System.out.println("\n==================================");
    }
}
```

**Expected Output:**
```
===== BINARY FILE OPERATIONS =====

--- Writing Binary Data ---
Binary data written to: binary_data.bin
Bytes written: 15

--- Reading Binary Data ---
Reading byte by byte:
Byte 1: 'A' (decimal: 65)
Byte 2: 'B' (decimal: 66)
Byte 3: 'C' (decimal: 67)
Byte 4: 'H' (decimal: 72)
Byte 5: 'E' (decimal: 69)
Byte 6: 'L' (decimal: 76)
Byte 7: 'L' (decimal: 76)
Byte 8: 'O' (decimal: 79)
Byte 9: ' ' (decimal: 32)
Byte 10: 'W' (decimal: 87)
Byte 11: 'O' (decimal: 79)
Byte 12: 'R' (decimal: 82)
Byte 13: 'L' (decimal: 76)
Byte 14: 'D' (decimal: 68)
Byte 15: '!' (decimal: 33)

Total bytes read: 15

--- Copying Binary File ---
File copied successfully!
Source: binary_data.bin
Destination: binary_data_copy.bin
Bytes copied: 15

--- Appending Binary Data ---
Data appended successfully!

==================================
```

**💡 Key Concepts:**

| Concept | Description | Example |
|---------|-------------|---------|
| **FileOutputStream** | Writes bytes to file | `fos.write(65)` writes byte 65 |
| **FileInputStream** | Reads bytes from file | `int b = fis.read()` reads one byte |
| **read() returns -1** | End of file indicator | `while ((b = fis.read()) != -1)` |
| **Byte array buffer** | Efficient chunk reading | `byte[] buffer = new byte[1024]` |
| **Append mode** | Add to existing file | `new FileOutputStream(file, true)` |
| **getBytes()** | Convert String to bytes | `"Hello".getBytes()` |

**✅ Success Criteria:**
- Understand byte streams work with ANY file type
- Can write individual bytes and byte arrays
- Know read() returns -1 at end of file
- Understand buffer usage for efficiency
- Can copy files using byte streams
- Know difference between write modes (overwrite vs append)

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Forgetting -1 check | read() returns -1 at EOF | `while ((b = read()) != -1)` |
| Not using buffer | Reading byte-by-byte is slow | Use `byte[] buffer = new byte[1024]` |
| Mixing streams | Using Reader with binary data | Use InputStream for binary |
| Not closing streams | Resource leak | Use try-with-resources |
| Wrong append flag | Overwrites instead of appends | `new FileOutputStream(file, true)` |

**🎯 Challenge:**
1. Create a file copier program that shows copy progress
2. Write a method that counts bytes in a file
3. Create a file splitter (split large file into chunks)
4. Implement file comparison (check if two files are identical)

---

#### Exercise 2: Object Serialization Basics (30 minutes)

**What you'll learn:** Converting objects to bytes for storage using Serialization

**Create classes: `Student` (Serializable), `SerializationDemo`**

**Concept:** **Serialization** converts objects into a byte stream so they can be saved to files or sent over networks. It's like "pickling" an object to preserve it exactly as it is.

```
Object → Serialization → Bytes → File
  ↑                                 ↓
  └────── Deserialization ← Bytes ←┘

Serialization = Object to Bytes (saving)
Deserialization = Bytes to Object (loading)
```

**Why Serialization?**
- **Persistence**: Save objects to disk, load them later
- **Networking**: Send objects between computers
- **Caching**: Store object state for quick access
- **Deep Copy**: Create exact copy of complex objects

**Requirements:**
1. Class must implement `Serializable` interface
2. All instance variables must be serializable
3. Use `ObjectOutputStream` to write objects
4. Use `ObjectInputStream` to read objects

**Step-by-Step:**

```java
import java.io.*;

// MUST implement Serializable to save objects
class Student implements Serializable {
    // serialVersionUID ensures compatibility
    private static final long serialVersionUID = 1L;

    // Instance variables - will be saved
    private String name;
    private int rollNumber;
    private double grade;

    // Constructor
    public Student(String name, int rollNumber, double grade) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.grade = grade;
    }

    // Getters
    public String getName() { return name; }
    public int getRollNumber() { return rollNumber; }
    public double getGrade() { return grade; }

    @Override
    public String toString() {
        return String.format("Student[Name: %s, Roll: %d, Grade: %.2f]",
            name, rollNumber, grade);
    }
}

public class SerializationDemo {
    public static void main(String[] args) {
        System.out.println("===== OBJECT SERIALIZATION =====\n");

        String filename = "student.ser";  // .ser = serialized file

        // Step 1: Create objects
        System.out.println("--- Creating Student Objects ---");
        Student student1 = new Student("Alice Johnson", 101, 92.5);
        Student student2 = new Student("Bob Smith", 102, 88.0);
        Student student3 = new Student("Charlie Brown", 103, 95.0);

        System.out.println("Created 3 students:");
        System.out.println("1. " + student1);
        System.out.println("2. " + student2);
        System.out.println("3. " + student3);

        // Step 2: Serialize objects (save to file)
        System.out.println("\n--- Serializing Objects ---");

        try (FileOutputStream fileOut = new FileOutputStream(filename);
             ObjectOutputStream objOut = new ObjectOutputStream(fileOut)) {

            // Write objects to file
            objOut.writeObject(student1);
            objOut.writeObject(student2);
            objOut.writeObject(student3);

            System.out.println("Successfully serialized 3 students to: " + filename);
            System.out.println("Objects converted to bytes and saved!");

        } catch (IOException e) {
            System.out.println("Serialization error: " + e.getMessage());
        }

        // Step 3: Check file was created
        File file = new File(filename);
        if (file.exists()) {
            System.out.println("File size: " + file.length() + " bytes");
        }

        // Demonstrate what serialization does
        System.out.println("\n--- Understanding Serialization ---");
        System.out.println("What happened:");
        System.out.println("1. Student objects converted to byte stream");
        System.out.println("2. All instance variables saved (name, rollNumber, grade)");
        System.out.println("3. Byte stream written to file: " + filename);
        System.out.println("4. File can be read later to recreate exact objects");

        // Example: Serializing single object with error handling
        System.out.println("\n--- Detailed Serialization Example ---");
        Student demoStudent = new Student("David Lee", 104, 89.5);
        String demoFile = "single_student.ser";

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(demoFile))) {

            out.writeObject(demoStudent);

            System.out.println("Original object: " + demoStudent);
            System.out.println("Serialized to: " + demoFile);

            // You can also write primitive data
            out.writeInt(2024);
            out.writeUTF("Academic Year 2024");

            System.out.println("Additional data also written!");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        System.out.println("\n==================================");
    }
}
```

**Expected Output:**
```
===== OBJECT SERIALIZATION =====

--- Creating Student Objects ---
Created 3 students:
1. Student[Name: Alice Johnson, Roll: 101, Grade: 92.50]
2. Student[Name: Bob Smith, Roll: 102, Grade: 88.00]
3. Student[Name: Charlie Brown, Roll: 103, Grade: 95.00]

--- Serializing Objects ---
Successfully serialized 3 students to: student.ser
Objects converted to bytes and saved!
File size: 357 bytes

--- Understanding Serialization ---
What happened:
1. Student objects converted to byte stream
2. All instance variables saved (name, rollNumber, grade)
3. Byte stream written to file: student.ser
4. File can be read later to recreate exact objects

--- Detailed Serialization Example ---
Original object: Student[Name: David Lee, Roll: 104, Grade: 89.50]
Serialized to: single_student.ser
Additional data also written!

==================================
```

**💡 Key Concepts:**

| Concept | Description | Example |
|---------|-------------|---------|
| **Serializable** | Marker interface for serialization | `class Student implements Serializable` |
| **serialVersionUID** | Version control for class | `private static final long serialVersionUID = 1L` |
| **ObjectOutputStream** | Writes objects to stream | `out.writeObject(student)` |
| **.ser extension** | Convention for serialized files | `student.ser` |
| **Byte conversion** | Object → bytes automatically | Handled by Java |
| **Multiple objects** | Can write many to same file | Call `writeObject()` multiple times |

**✅ Success Criteria:**
- Class implements Serializable interface
- Understand serialization converts objects to bytes
- Can use ObjectOutputStream to write objects
- Know .ser is common extension for serialized files
- Understand all instance variables are saved
- Can serialize multiple objects to one file

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Forgetting Serializable | Class won't serialize | `implements Serializable` |
| No serialVersionUID | Version mismatches cause errors | Add `serialVersionUID = 1L` |
| Serializing non-serializable | Causes NotSerializableException | All fields must be serializable |
| Wrong stream type | Can't write objects | Use ObjectOutputStream |
| Not closing stream | Data might not be written | Use try-with-resources |

**🎯 Challenge:**
1. Create a Product class and serialize inventory list
2. Add transient keyword to a field and observe it's not saved
3. Serialize an ArrayList of Student objects
4. Create a method that serializes any Serializable object

---

#### Exercise 3: Object Deserialization (25 minutes)

**What you'll learn:** Reading objects back from files using Deserialization

**Create class: `DeserializationDemo`**

**Concept:** **Deserialization** reads bytes from a file and reconstructs the original objects. It's the reverse of serialization - like "unpickling" preserved objects.

```
Serialization:   Object → writeObject() → File
Deserialization: File → readObject() → Object

Important: The class definition must exist when deserializing!
```

**Deserialization Process:**
1. Open file with FileInputStream
2. Wrap in ObjectInputStream
3. Call readObject() - returns Object type
4. Cast to specific type
5. Use the restored object

**Step-by-Step:**

```java
import java.io.*;

// Same Student class as before (must be available)
class Student implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int rollNumber;
    private double grade;

    public Student(String name, int rollNumber, double grade) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.grade = grade;
    }

    public String getName() { return name; }
    public int getRollNumber() { return rollNumber; }
    public double getGrade() { return grade; }

    @Override
    public String toString() {
        return String.format("Student[Name: %s, Roll: %d, Grade: %.2f]",
            name, rollNumber, grade);
    }
}

public class DeserializationDemo {
    public static void main(String[] args) {
        System.out.println("===== OBJECT DESERIALIZATION =====\n");

        // First, serialize some data (so we have something to read)
        String filename = "students.ser";

        System.out.println("--- Creating and Serializing Data ---");
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(filename))) {

            out.writeObject(new Student("Alice Johnson", 101, 92.5));
            out.writeObject(new Student("Bob Smith", 102, 88.0));
            out.writeObject(new Student("Charlie Brown", 103, 95.0));

            System.out.println("3 students serialized to: " + filename);

        } catch (IOException e) {
            System.out.println("Serialization error: " + e.getMessage());
            return;
        }

        // Now deserialize (read objects back)
        System.out.println("\n--- Deserializing Objects ---");

        try (FileInputStream fileIn = new FileInputStream(filename);
             ObjectInputStream objIn = new ObjectInputStream(fileIn)) {

            System.out.println("Reading objects from file...\n");

            // Read first student
            Student student1 = (Student) objIn.readObject();  // CAST needed!
            System.out.println("Student 1: " + student1);

            // Read second student
            Student student2 = (Student) objIn.readObject();
            System.out.println("Student 2: " + student2);

            // Read third student
            Student student3 = (Student) objIn.readObject();
            System.out.println("Student 3: " + student3);

            System.out.println("\nSuccessfully deserialized 3 students!");

            // Now we can use these objects normally
            System.out.println("\n--- Using Deserialized Objects ---");
            System.out.println(student1.getName() + "'s grade: " + student1.getGrade());
            System.out.println(student2.getName() + "'s roll: " + student2.getRollNumber());

        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println("Student class not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Deserialization error: " + e.getMessage());
        }

        // Example: Reading all objects with loop
        System.out.println("\n--- Reading All Objects with Loop ---");

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(filename))) {

            int count = 0;

            // Keep reading until EOFException
            while (true) {
                try {
                    Student student = (Student) in.readObject();
                    count++;
                    System.out.println(count + ". " + student);
                } catch (EOFException e) {
                    // End of file reached - this is NORMAL
                    System.out.println("\nEnd of file reached.");
                    break;
                }
            }

            System.out.println("Total students read: " + count);

        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println("Class not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Demonstrate the power of serialization
        System.out.println("\n--- Serialization Benefits ---");
        System.out.println("✓ Objects saved exactly as they were");
        System.out.println("✓ All data preserved (name, rollNumber, grade)");
        System.out.println("✓ Can read back anytime - even after program restarts");
        System.out.println("✓ No need to parse or format data manually");

        System.out.println("\n==================================");
    }
}
```

**Expected Output:**
```
===== OBJECT DESERIALIZATION =====

--- Creating and Serializing Data ---
3 students serialized to: students.ser

--- Deserializing Objects ---
Reading objects from file...

Student 1: Student[Name: Alice Johnson, Roll: 101, Grade: 92.50]
Student 2: Student[Name: Bob Smith, Roll: 102, Grade: 88.00]
Student 3: Student[Name: Charlie Brown, Roll: 103, Grade: 95.00]

Successfully deserialized 3 students!

--- Using Deserialized Objects ---
Alice Johnson's grade: 92.5
Bob Smith's roll: 102

--- Reading All Objects with Loop ---
1. Student[Name: Alice Johnson, Roll: 101, Grade: 92.50]
2. Student[Name: Bob Smith, Roll: 102, Grade: 88.00]
3. Student[Name: Charlie Brown, Roll: 103, Grade: 95.00]

End of file reached.
Total students read: 3

--- Serialization Benefits ---
✓ Objects saved exactly as they were
✓ All data preserved (name, rollNumber, grade)
✓ Can read back anytime - even after program restarts
✓ No need to parse or format data manually

==================================
```

**💡 Key Concepts:**

| Concept | Description | Example |
|---------|-------------|---------|
| **ObjectInputStream** | Reads objects from stream | `in.readObject()` |
| **Type casting** | readObject() returns Object | `(Student) in.readObject()` |
| **EOFException** | Signals end of file | Catch to stop reading loop |
| **ClassNotFoundException** | Class definition missing | Ensure class is available |
| **Exact restoration** | Object recreated perfectly | All fields restored |
| **Same serialVersionUID** | Must match serialization | Ensures compatibility |

**✅ Success Criteria:**
- Can use ObjectInputStream to read objects
- Understand readObject() returns Object (need cast)
- Know to catch ClassNotFoundException
- Can handle EOFException for reading multiple objects
- Understand class definition must exist
- Can use deserialized objects normally

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Forgetting cast | readObject() returns Object | `(Student) in.readObject()` |
| Not catching ClassNotFoundException | Required exception | Add to try-catch |
| Wrong read order | Objects read in write order | Read in same sequence |
| Infinite loop reading | No EOF check | Catch EOFException |
| Class not found | Definition missing | Ensure class available |
| Version mismatch | Different serialVersionUID | Keep UIDs consistent |

**🎯 Challenge:**
1. Deserialize the Product inventory from previous challenge
2. Create a method that reads all objects into an ArrayList
3. Handle version mismatch gracefully with error message
4. Create a student grade analyzer from serialized data

---

#### Exercise 4: Try-with-Resources for File Operations (25 minutes)

**What you'll learn:** Automatic resource management with try-with-resources

**Create class: `TryWithResourcesDemo`**

**Concept:** **Try-with-Resources** automatically closes resources (files, streams, connections) even if exceptions occur. It's cleaner and safer than manual close() calls.

```
Old Way (Manual):
FileWriter fw = null;
try {
    fw = new FileWriter("file.txt");
    // use fw
} finally {
    if (fw != null) fw.close();  // Manual close
}

New Way (Try-with-Resources):
try (FileWriter fw = new FileWriter("file.txt")) {
    // use fw
}  // Automatically closed!
```

**Benefits:**
- **Automatic Cleanup**: No need for finally block
- **Exception Safe**: Closes even if exception thrown
- **Less Code**: Cleaner and more readable
- **Multiple Resources**: Can open several in one try

**Requirements:**
- Resource must implement `AutoCloseable` or `Closeable`
- Declare resources in try parentheses
- Resources closed in reverse order of creation

**Step-by-Step:**

```java
import java.io.*;
import java.util.*;

public class TryWithResourcesDemo {
    public static void main(String[] args) {
        System.out.println("===== TRY-WITH-RESOURCES =====\n");

        // Example 1: Traditional try-catch-finally (OLD WAY)
        System.out.println("--- Old Way: Manual Resource Management ---");

        FileWriter fw = null;
        BufferedWriter bw = null;

        try {
            fw = new FileWriter("old_way.txt");
            bw = new BufferedWriter(fw);

            bw.write("This is the old way\n");
            bw.write("Requires manual closing\n");

            System.out.println("File written using old way");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            // Manual cleanup - MUST remember!
            try {
                if (bw != null) bw.close();
                if (fw != null) fw.close();
            } catch (IOException e) {
                System.out.println("Error closing: " + e.getMessage());
            }
            System.out.println("Resources closed manually in finally block");
        }

        // Example 2: Try-with-resources (NEW WAY)
        System.out.println("\n--- New Way: Try-with-Resources ---");

        try (FileWriter writer = new FileWriter("new_way.txt");
             BufferedWriter buffered = new BufferedWriter(writer)) {

            buffered.write("This is the new way\n");
            buffered.write("Auto-closes automatically!\n");

            System.out.println("File written using try-with-resources");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // Resources automatically closed here!
        System.out.println("Resources closed automatically!");

        // Example 3: Multiple resources
        System.out.println("\n--- Multiple Resources ---");

        try (FileReader reader = new FileReader("new_way.txt");
             BufferedReader bufferedReader = new BufferedReader(reader);
             FileWriter writer = new FileWriter("copy.txt");
             BufferedWriter bufferedWriter = new BufferedWriter(writer)) {

            String line;
            int lineCount = 0;

            while ((line = bufferedReader.readLine()) != null) {
                lineCount++;
                bufferedWriter.write("Line " + lineCount + ": " + line);
                bufferedWriter.newLine();
            }

            System.out.println("Copied " + lineCount + " lines");
            System.out.println("4 resources managed automatically!");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 4: With serialization
        System.out.println("\n--- Try-with-Resources + Serialization ---");

        ArrayList<String> data = new ArrayList<>();
        data.add("Java");
        data.add("Python");
        data.add("JavaScript");

        // Serialize
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("list.ser"))) {

            out.writeObject(data);
            System.out.println("ArrayList serialized: " + data);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Deserialize
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("list.ser"))) {

            @SuppressWarnings("unchecked")
            ArrayList<String> loaded = (ArrayList<String>) in.readObject();
            System.out.println("ArrayList deserialized: " + loaded);

        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 5: Nested try-with-resources
        System.out.println("\n--- Reading and Processing File ---");

        try (Scanner scanner = new Scanner(new File("new_way.txt"))) {

            System.out.println("File contents:");
            int lineNum = 1;

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                System.out.println(lineNum++ + ". " + line);
            }

        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }

        // Demonstrate exception handling
        System.out.println("\n--- Exception Handling ---");

        try (FileReader reader = new FileReader("nonexistent.txt")) {

            System.out.println("This won't execute");

        } catch (FileNotFoundException e) {
            System.out.println("Caught exception: File not found");
            System.out.println("Resource was still auto-closed!");
        } catch (IOException e) {
            System.out.println("Other IO error: " + e.getMessage());
        }

        System.out.println("\n--- Benefits Summary ---");
        System.out.println("✓ No manual close() needed");
        System.out.println("✓ Automatically closes even with exceptions");
        System.out.println("✓ Less code, more readable");
        System.out.println("✓ Can't forget to close resources");
        System.out.println("✓ Multiple resources handled elegantly");

        System.out.println("\n==============================");
    }
}
```

**Expected Output:**
```
===== TRY-WITH-RESOURCES =====

--- Old Way: Manual Resource Management ---
File written using old way
Resources closed manually in finally block

--- New Way: Try-with-Resources ---
File written using try-with-resources
Resources closed automatically!

--- Multiple Resources ---
Copied 2 lines
4 resources managed automatically!

--- Try-with-Resources + Serialization ---
ArrayList serialized: [Java, Python, JavaScript]
ArrayList deserialized: [Java, Python, JavaScript]

--- Reading and Processing File ---
File contents:
1. This is the new way
2. Auto-closes automatically!

--- Exception Handling ---
Caught exception: File not found
Resource was still auto-closed!

--- Benefits Summary ---
✓ No manual close() needed
✓ Automatically closes even with exceptions
✓ Less code, more readable
✓ Can't forget to close resources
✓ Multiple resources handled elegantly

==============================
```

**💡 Key Concepts:**

| Concept | Description | Example |
|---------|-------------|---------|
| **Try-with-resources** | Auto-closes resources | `try (Resource r = ...) { }` |
| **AutoCloseable** | Interface for auto-close | Streams implement this |
| **Multiple resources** | Separate with semicolons | `try (R1 r1 = ...; R2 r2 = ...)` |
| **Reverse closing** | Last opened, first closed | Handles dependencies |
| **Exception safe** | Closes even if error | No resource leaks |
| **No finally needed** | Cleanup automatic | Cleaner code |

**✅ Success Criteria:**
- Understand try-with-resources syntax
- Can declare resources in try parentheses
- Know resources must be AutoCloseable
- Can use multiple resources in one try
- Understand automatic closing even with exceptions
- Prefer try-with-resources over manual close

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Resource outside try() | Won't auto-close | Declare in try parentheses |
| Forgetting semicolon | Syntax error with multiple | `try (R1 r1 = ...; R2 r2 = ...)` |
| Using non-closeable | Must implement AutoCloseable | Use proper stream classes |
| Manual close() call | Unnecessary | Let try-with-resources handle it |
| Finally block | Not needed anymore | Remove it |

**🎯 Challenge:**
1. Refactor all previous file exercises to use try-with-resources
2. Create a file merger using try-with-resources for 3+ files
3. Compare code length: old way vs try-with-resources
4. Create a custom class implementing AutoCloseable

---

#### Exercise 5: NIO.2 Basics - Path & Paths (25 minutes)

**What you'll learn:** Modern file handling with Path and Paths from NIO.2

**Create class: `PathBasicsDemo`**

**Concept:** **NIO.2** (New I/O 2) introduced in Java 7 provides modern, easier file operations. **Path** represents a file/directory location, and **Paths** creates Path objects.

```
Old Way (java.io.File):
File file = new File("data/file.txt");
String name = file.getName();

New Way (java.nio.file.Path):
Path path = Paths.get("data/file.txt");
String name = path.getFileName().toString();
```

**Why NIO.2?**
- **More Powerful**: Better file operations
- **Cleaner API**: More intuitive methods
- **Better Errors**: More detailed exceptions
- **Platform Independent**: Handles path separators automatically

**Step-by-Step:**

```java
import java.nio.file.*;
import java.io.IOException;

public class PathBasicsDemo {
    public static void main(String[] args) {
        System.out.println("===== PATH & PATHS BASICS =====\n");

        // Example 1: Creating Path objects
        System.out.println("--- Creating Path Objects ---");

        // Method 1: Paths.get() - most common
        Path path1 = Paths.get("data/students.txt");
        System.out.println("Path 1: " + path1);

        // Method 2: Multiple path parts
        Path path2 = Paths.get("data", "files", "report.txt");
        System.out.println("Path 2: " + path2);

        // Method 3: Path.of() (Java 11+)
        Path path3 = Path.of("documents/notes.txt");
        System.out.println("Path 3: " + path3);

        // Method 4: Absolute path
        Path absolutePath = Paths.get("/Users/student/Documents/file.txt");
        System.out.println("Absolute: " + absolutePath);

        // Example 2: Path information
        System.out.println("\n--- Path Information ---");

        Path samplePath = Paths.get("project/src/main/java/App.java");

        System.out.println("Full path: " + samplePath);
        System.out.println("File name: " + samplePath.getFileName());
        System.out.println("Parent: " + samplePath.getParent());
        System.out.println("Root: " + samplePath.getRoot());
        System.out.println("Name count: " + samplePath.getNameCount());

        // Get individual path elements
        System.out.println("\nPath elements:");
        for (int i = 0; i < samplePath.getNameCount(); i++) {
            System.out.println("  [" + i + "] " + samplePath.getName(i));
        }

        // Example 3: Checking path properties
        System.out.println("\n--- Path Properties ---");

        Path testPath = Paths.get("test.txt");

        System.out.println("Path: " + testPath);
        System.out.println("Is absolute: " + testPath.isAbsolute());

        // Convert to absolute
        Path absPath = testPath.toAbsolutePath();
        System.out.println("Absolute path: " + absPath);
        System.out.println("Now is absolute: " + absPath.isAbsolute());

        // Example 4: Path manipulation
        System.out.println("\n--- Path Manipulation ---");

        Path base = Paths.get("project/src");
        Path resolved = base.resolve("Main.java");
        System.out.println("Base: " + base);
        System.out.println("Resolved: " + resolved);

        // Combine paths
        Path path = Paths.get("data");
        Path fullPath = path.resolve("users").resolve("profile.txt");
        System.out.println("Combined: " + fullPath);

        // Sibling path
        Path file = Paths.get("documents/report.txt");
        Path sibling = file.resolveSibling("summary.txt");
        System.out.println("Original: " + file);
        System.out.println("Sibling: " + sibling);

        // Example 5: Normalize and relativize
        System.out.println("\n--- Normalize and Relativize ---");

        // Normalize removes redundant elements
        Path messyPath = Paths.get("data/../data/./files/report.txt");
        Path cleanPath = messyPath.normalize();
        System.out.println("Messy: " + messyPath);
        System.out.println("Clean: " + cleanPath);

        // Relativize finds relative path between two paths
        Path start = Paths.get("project/src");
        Path end = Paths.get("project/docs/readme.txt");
        Path relative = start.relativize(end);
        System.out.println("Start: " + start);
        System.out.println("End: " + end);
        System.out.println("Relative: " + relative);

        // Example 6: Creating and checking paths
        System.out.println("\n--- Creating Actual Files ---");

        try {
            // Create a simple path
            Path newFile = Paths.get("test_file.txt");

            // Check if exists
            if (Files.exists(newFile)) {
                System.out.println(newFile + " already exists");
            } else {
                // Create the file
                Files.createFile(newFile);
                System.out.println("Created: " + newFile);
            }

            // Get more info
            System.out.println("Exists: " + Files.exists(newFile));
            System.out.println("Is regular file: " + Files.isRegularFile(newFile));
            System.out.println("Is directory: " + Files.isDirectory(newFile));
            System.out.println("Is readable: " + Files.isReadable(newFile));
            System.out.println("Is writable: " + Files.isWritable(newFile));

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 7: Comparing paths
        System.out.println("\n--- Comparing Paths ---");

        Path p1 = Paths.get("file.txt");
        Path p2 = Paths.get("file.txt");
        Path p3 = Paths.get("FILE.TXT");

        System.out.println("p1 equals p2: " + p1.equals(p2));
        System.out.println("p1 equals p3: " + p1.equals(p3));  // Case-sensitive!

        System.out.println("p1 == p2: " + (p1 == p2));  // Different objects

        // StartsWith and EndsWith
        Path longPath = Paths.get("project/src/main/java/App.java");
        System.out.println("Starts with 'project': " + longPath.startsWith("project"));
        System.out.println("Ends with 'App.java': " + longPath.endsWith("App.java"));

        System.out.println("\n--- Path vs File Comparison ---");
        System.out.println("\njava.io.File (Old)         | java.nio.file.Path (New)");
        System.out.println("---------------------------|---------------------------");
        System.out.println("new File(\"file.txt\")       | Paths.get(\"file.txt\")");
        System.out.println("file.getName()             | path.getFileName()");
        System.out.println("file.getParent()           | path.getParent()");
        System.out.println("file.exists()              | Files.exists(path)");
        System.out.println("file.delete()              | Files.delete(path)");

        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== PATH & PATHS BASICS =====

--- Creating Path Objects ---
Path 1: data/students.txt
Path 2: data/files/report.txt
Path 3: documents/notes.txt
Absolute: /Users/student/Documents/file.txt

--- Path Information ---
Full path: project/src/main/java/App.java
File name: App.java
Parent: project/src/main/java
Root: null
Name count: 5

Path elements:
  [0] project
  [1] src
  [2] main
  [3] java
  [4] App.java

--- Path Properties ---
Path: test.txt
Is absolute: false
Absolute path: /Users/venkateshparasa/Documents/Java/test.txt
Now is absolute: true

--- Path Manipulation ---
Base: project/src
Resolved: project/src/Main.java
Combined: data/users/profile.txt
Original: documents/report.txt
Sibling: documents/summary.txt

--- Normalize and Relativize ---
Messy: data/../data/./files/report.txt
Clean: data/files/report.txt
Start: project/src
End: project/docs/readme.txt
Relative: ../docs/readme.txt

--- Creating Actual Files ---
Created: test_file.txt
Exists: true
Is regular file: true
Is directory: false
Is readable: true
Is writable: true

--- Comparing Paths ---
p1 equals p2: true
p1 equals p3: false
p1 == p2: false
Starts with 'project': true
Ends with 'App.java': true

--- Path vs File Comparison ---

java.io.File (Old)         | java.nio.file.Path (New)
---------------------------|---------------------------
new File("file.txt")       | Paths.get("file.txt")
file.getName()             | path.getFileName()
file.getParent()           | path.getParent()
file.exists()              | Files.exists(path)
file.delete()              | Files.delete(path)

===============================
```

**💡 Key Concepts:**

| Concept | Description | Example |
|---------|-------------|---------|
| **Path** | Represents file/directory location | `Path p = Paths.get("file.txt")` |
| **Paths.get()** | Creates Path object | `Paths.get("dir", "file.txt")` |
| **getFileName()** | Gets file name | `path.getFileName()` |
| **getParent()** | Gets parent directory | `path.getParent()` |
| **resolve()** | Combines paths | `base.resolve("file.txt")` |
| **normalize()** | Cleans up path | Removes . and .. |
| **relativize()** | Finds relative path | `start.relativize(end)` |

**✅ Success Criteria:**
- Can create Path objects with Paths.get()
- Understand Path represents location, not file itself
- Know how to get path information (name, parent, etc.)
- Can manipulate paths (resolve, normalize)
- Understand difference between Path and File
- Know Files class is used for actual file operations

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Using File instead | Old API, less powerful | Use Path and Paths |
| Confusing Path with file | Path is location only | Use Files class for operations |
| Hard-coded separators | Platform-dependent | Let Path handle it |
| Not normalizing | Leaves .., . in path | Use `normalize()` |
| Using == for equality | Compares objects | Use `equals()` |

**🎯 Challenge:**
1. Create a directory tree explorer using Path
2. Write a method that finds all files with specific extension
3. Create a path validator (checks if path is safe/valid)
4. Build a utility to convert absolute paths to relative

---

#### Exercise 6: Files Class Utility Methods (25 minutes)

**What you'll learn:** Using Files class for common file operations

**Create class: `FilesUtilityDemo`**

**Concept:** The **Files** class provides static utility methods for file operations like reading, writing, copying, moving, and deleting. It's simpler than traditional stream-based I/O.

```
Traditional Way:
BufferedReader reader = new BufferedReader(new FileReader("file.txt"));
String line = reader.readLine();
...
reader.close();

Files Way:
List<String> lines = Files.readAllLines(Paths.get("file.txt"));
// Done! All lines read in one call
```

**Files Class Features:**
- **One-line operations**: Read/write entire files
- **Copying**: Copy files/directories easily
- **Moving**: Move or rename files
- **Deleting**: Delete files/directories
- **Checking**: Exists, readable, writable, etc.

**Step-by-Step:**

```java
import java.nio.file.*;
import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

public class FilesUtilityDemo {
    public static void main(String[] args) {
        System.out.println("===== FILES UTILITY METHODS =====\n");

        // Example 1: Creating files and directories
        System.out.println("--- Creating Files and Directories ---");

        try {
            // Create a directory
            Path dir = Paths.get("test_directory");
            if (!Files.exists(dir)) {
                Files.createDirectory(dir);
                System.out.println("Created directory: " + dir);
            } else {
                System.out.println("Directory already exists: " + dir);
            }

            // Create nested directories
            Path nestedDir = Paths.get("parent/child/grandchild");
            Files.createDirectories(nestedDir);  // Creates all levels!
            System.out.println("Created nested directories: " + nestedDir);

            // Create a file
            Path file = Paths.get("test_directory/sample.txt");
            if (!Files.exists(file)) {
                Files.createFile(file);
                System.out.println("Created file: " + file);
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 2: Writing to files
        System.out.println("\n--- Writing to Files ---");

        try {
            Path file = Paths.get("test_directory/data.txt");

            // Write a string
            String content = "Hello, NIO.2!\nThis is line 2.\nThis is line 3.";
            Files.writeString(file, content);  // Java 11+
            System.out.println("Wrote string to: " + file);

            // Alternative: Write lines
            Path file2 = Paths.get("test_directory/lines.txt");
            List<String> lines = List.of(
                "First line",
                "Second line",
                "Third line"
            );
            Files.write(file2, lines);
            System.out.println("Wrote " + lines.size() + " lines to: " + file2);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 3: Reading from files
        System.out.println("\n--- Reading from Files ---");

        try {
            Path file = Paths.get("test_directory/data.txt");

            // Read entire file as string (Java 11+)
            String content = Files.readString(file);
            System.out.println("File content as string:");
            System.out.println(content);

            // Read all lines
            System.out.println("\nReading line by line:");
            List<String> lines = Files.readAllLines(file);
            for (int i = 0; i < lines.size(); i++) {
                System.out.println((i + 1) + ". " + lines.get(i));
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 4: Copying files
        System.out.println("\n--- Copying Files ---");

        try {
            Path source = Paths.get("test_directory/data.txt");
            Path target = Paths.get("test_directory/data_copy.txt");

            // Copy file (replace if exists)
            Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Copied: " + source + " → " + target);

            // Get file size
            long size = Files.size(target);
            System.out.println("Copy size: " + size + " bytes");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 5: Moving/Renaming files
        System.out.println("\n--- Moving/Renaming Files ---");

        try {
            Path source = Paths.get("test_directory/data_copy.txt");
            Path target = Paths.get("test_directory/renamed.txt");

            // Move/rename
            Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Moved: " + source + " → " + target);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 6: File information
        System.out.println("\n--- File Information ---");

        try {
            Path file = Paths.get("test_directory/data.txt");

            if (Files.exists(file)) {
                System.out.println("File: " + file);
                System.out.println("Size: " + Files.size(file) + " bytes");
                System.out.println("Is directory: " + Files.isDirectory(file));
                System.out.println("Is regular file: " + Files.isRegularFile(file));
                System.out.println("Is hidden: " + Files.isHidden(file));
                System.out.println("Is readable: " + Files.isReadable(file));
                System.out.println("Is writable: " + Files.isWritable(file));
                System.out.println("Is executable: " + Files.isExecutable(file));
                System.out.println("Last modified: " + Files.getLastModifiedTime(file));
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 7: Listing directory contents
        System.out.println("\n--- Listing Directory Contents ---");

        try {
            Path dir = Paths.get("test_directory");

            System.out.println("Contents of: " + dir);

            // List files in directory
            try (Stream<Path> paths = Files.list(dir)) {
                paths.forEach(path -> {
                    try {
                        String type = Files.isDirectory(path) ? "[DIR]" : "[FILE]";
                        long size = Files.isRegularFile(path) ? Files.size(path) : 0;
                        System.out.println("  " + type + " " + path.getFileName() +
                            (size > 0 ? " (" + size + " bytes)" : ""));
                    } catch (IOException e) {
                        System.out.println("  Error reading: " + path);
                    }
                });
            }

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 8: Deleting files
        System.out.println("\n--- Deleting Files ---");

        try {
            Path fileToDelete = Paths.get("test_directory/renamed.txt");

            if (Files.exists(fileToDelete)) {
                Files.delete(fileToDelete);
                System.out.println("Deleted: " + fileToDelete);
            }

            // Delete if exists (no exception if doesn't exist)
            Path mayNotExist = Paths.get("test_directory/maybe.txt");
            boolean deleted = Files.deleteIfExists(mayNotExist);
            System.out.println("Deleted maybe.txt: " + deleted);

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Example 9: Comparing files
        System.out.println("\n--- Comparing Files ---");

        try {
            Path file1 = Paths.get("test_directory/data.txt");
            Path file2 = Paths.get("test_directory/lines.txt");

            // Check if same file
            boolean same = Files.isSameFile(file1, file2);
            System.out.println("Are same file: " + same);

            // Compare content
            byte[] content1 = Files.readAllBytes(file1);
            byte[] content2 = Files.readAllBytes(file2);

            System.out.println("File1 size: " + content1.length + " bytes");
            System.out.println("File2 size: " + content2.length + " bytes");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }

        System.out.println("\n--- Files Class Benefits ---");
        System.out.println("✓ One-line operations (readString, writeString)");
        System.out.println("✓ No manual stream management");
        System.out.println("✓ Atomic operations (copy, move)");
        System.out.println("✓ Better error messages");
        System.out.println("✓ Works seamlessly with Path");

        System.out.println("\n=================================");
    }
}
```

**Expected Output:**
```
===== FILES UTILITY METHODS =====

--- Creating Files and Directories ---
Created directory: test_directory
Created nested directories: parent/child/grandchild
Created file: test_directory/sample.txt

--- Writing to Files ---
Wrote string to: test_directory/data.txt
Wrote 3 lines to: test_directory/lines.txt

--- Reading from Files ---
File content as string:
Hello, NIO.2!
This is line 2.
This is line 3.

Reading line by line:
1. Hello, NIO.2!
2. This is line 2.
3. This is line 3.

--- Copying Files ---
Copied: test_directory/data.txt → test_directory/data_copy.txt
Copy size: 43 bytes

--- Moving/Renaming Files ---
Moved: test_directory/data_copy.txt → test_directory/renamed.txt

--- File Information ---
File: test_directory/data.txt
Size: 43 bytes
Is directory: false
Is regular file: true
Is hidden: false
Is readable: true
Is writable: true
Is executable: false
Last modified: 2026-01-23T10:30:45.123456Z

--- Listing Directory Contents ---
Contents of: test_directory
  [FILE] data.txt (43 bytes)
  [FILE] lines.txt (35 bytes)
  [FILE] renamed.txt (43 bytes)
  [FILE] sample.txt (0 bytes)

--- Deleting Files ---
Deleted: test_directory/renamed.txt
Deleted maybe.txt: false

--- Comparing Files ---
Are same file: false
File1 size: 43 bytes
File2 size: 35 bytes

--- Files Class Benefits ---
✓ One-line operations (readString, writeString)
✓ No manual stream management
✓ Atomic operations (copy, move)
✓ Better error messages
✓ Works seamlessly with Path

=================================
```

**💡 Key Concepts:**

| Concept | Description | Example |
|---------|-------------|---------|
| **Files.readString()** | Read entire file as String | `Files.readString(path)` |
| **Files.writeString()** | Write String to file | `Files.writeString(path, content)` |
| **Files.copy()** | Copy file | `Files.copy(source, target)` |
| **Files.move()** | Move/rename file | `Files.move(source, target)` |
| **Files.delete()** | Delete file | `Files.delete(path)` |
| **Files.createDirectories()** | Create all dirs in path | `Files.createDirectories(path)` |
| **Files.list()** | List directory contents | `Files.list(dir)` |

**✅ Success Criteria:**
- Can read entire file in one line
- Can write strings/lines to files easily
- Know how to copy, move, delete files
- Can create files and directories
- Understand Files class vs traditional I/O
- Can get file metadata (size, permissions, etc.)

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Using createDirectory for nested | Only creates one level | Use `createDirectories()` |
| Not handling exceptions | File ops can fail | Wrap in try-catch |
| Forgetting REPLACE_EXISTING | Copy/move fails if exists | Add `StandardCopyOption.REPLACE_EXISTING` |
| delete() on non-empty dir | Throws exception | Delete contents first |
| Closing stream from Files.list() | Resource leak | Use try-with-resources |

**🎯 Challenge:**
1. Create a file organizer that sorts files by extension
2. Build a duplicate file finder using Files methods
3. Create a directory tree printer with sizes
4. Implement a file search utility by name/content

---

#### Exercise 7: Real-World Application - Student Record System with Persistence (35 minutes)

**What you'll learn:** Building a complete student management system with file-based persistence

**Create classes: `Student`, `StudentManager`, `StudentRecordSystemApp`**

**Concept:** This application demonstrates a **complete CRUD system** (Create, Read, Update, Delete) with data persistence using serialization. Data survives program restarts.

```
Application Flow:
1. Load existing data from file (if exists)
2. Display menu
3. Perform operations (add, view, update, delete)
4. Save data to file
5. Repeat until exit

Persistence = Data survives program restarts
```

**Real-World Use Cases:**
- **Student Management**: Schools, colleges
- **Inventory Systems**: Stores, warehouses
- **Contact Management**: Address books
- **Task Managers**: To-do apps

**Step-by-Step:**

```java
import java.io.*;
import java.nio.file.*;
import java.util.*;

// Student class - represents one student record
class Student implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private String name;
    private String email;
    private double gpa;
    private String major;

    public Student(int id, String name, String email, double gpa, String major) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.gpa = gpa;
        this.major = major;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public double getGpa() { return gpa; }
    public String getMajor() { return major; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setGpa(double gpa) { this.gpa = gpa; }
    public void setMajor(String major) { this.major = major; }

    @Override
    public String toString() {
        return String.format("ID: %d | Name: %-20s | Email: %-25s | GPA: %.2f | Major: %s",
            id, name, email, gpa, major);
    }
}

// Manager class - handles all student operations
class StudentManager {
    private ArrayList<Student> students;
    private Path dataFile;
    private int nextId;

    public StudentManager(String filename) {
        this.students = new ArrayList<>();
        this.dataFile = Paths.get(filename);
        this.nextId = 1;
        loadData();
    }

    // Load students from file
    @SuppressWarnings("unchecked")
    private void loadData() {
        if (Files.exists(dataFile)) {
            try (ObjectInputStream in = new ObjectInputStream(
                    new FileInputStream(dataFile.toFile()))) {

                students = (ArrayList<Student>) in.readObject();

                // Find next available ID
                for (Student s : students) {
                    if (s.getId() >= nextId) {
                        nextId = s.getId() + 1;
                    }
                }

                System.out.println("Loaded " + students.size() + " students from file.");

            } catch (IOException | ClassNotFoundException e) {
                System.out.println("No previous data found. Starting fresh.");
            }
        }
    }

    // Save students to file
    public void saveData() {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(dataFile.toFile()))) {

            out.writeObject(students);
            System.out.println("Data saved successfully!");

        } catch (IOException e) {
            System.out.println("Error saving data: " + e.getMessage());
        }
    }

    // Add new student
    public void addStudent(String name, String email, double gpa, String major) {
        Student student = new Student(nextId++, name, email, gpa, major);
        students.add(student);
        System.out.println("\n✓ Student added successfully!");
        System.out.println(student);
    }

    // View all students
    public void viewAllStudents() {
        if (students.isEmpty()) {
            System.out.println("\nNo students in the system.");
            return;
        }

        System.out.println("\n" + "=".repeat(100));
        System.out.println("ALL STUDENTS (" + students.size() + " total)");
        System.out.println("=".repeat(100));

        for (Student s : students) {
            System.out.println(s);
        }

        System.out.println("=".repeat(100));
    }

    // Search student by ID
    public Student findStudentById(int id) {
        for (Student s : students) {
            if (s.getId() == id) {
                return s;
            }
        }
        return null;
    }

    // Update student
    public void updateStudent(int id, String name, String email, double gpa, String major) {
        Student student = findStudentById(id);

        if (student == null) {
            System.out.println("\n✗ Student not found with ID: " + id);
            return;
        }

        student.setName(name);
        student.setEmail(email);
        student.setGpa(gpa);
        student.setMajor(major);

        System.out.println("\n✓ Student updated successfully!");
        System.out.println(student);
    }

    // Delete student
    public void deleteStudent(int id) {
        Student student = findStudentById(id);

        if (student == null) {
            System.out.println("\n✗ Student not found with ID: " + id);
            return;
        }

        students.remove(student);
        System.out.println("\n✓ Student deleted successfully!");
        System.out.println("Deleted: " + student);
    }

    // Get statistics
    public void showStatistics() {
        if (students.isEmpty()) {
            System.out.println("\nNo data available.");
            return;
        }

        double totalGpa = 0;
        double maxGpa = 0;
        double minGpa = 4.0;

        HashMap<String, Integer> majorCount = new HashMap<>();

        for (Student s : students) {
            totalGpa += s.getGpa();
            maxGpa = Math.max(maxGpa, s.getGpa());
            minGpa = Math.min(minGpa, s.getGpa());

            majorCount.put(s.getMajor(), majorCount.getOrDefault(s.getMajor(), 0) + 1);
        }

        System.out.println("\n" + "=".repeat(50));
        System.out.println("STATISTICS");
        System.out.println("=".repeat(50));
        System.out.println("Total Students: " + students.size());
        System.out.println("Average GPA: " + String.format("%.2f", totalGpa / students.size()));
        System.out.println("Highest GPA: " + String.format("%.2f", maxGpa));
        System.out.println("Lowest GPA: " + String.format("%.2f", minGpa));

        System.out.println("\nStudents by Major:");
        for (Map.Entry<String, Integer> entry : majorCount.entrySet()) {
            System.out.println("  " + entry.getKey() + ": " + entry.getValue());
        }
        System.out.println("=".repeat(50));
    }
}

// Main application
public class StudentRecordSystemApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        StudentManager manager = new StudentManager("students_data.ser");

        System.out.println("\n" + "=".repeat(60));
        System.out.println("    STUDENT RECORD MANAGEMENT SYSTEM");
        System.out.println("=".repeat(60));

        boolean running = true;

        while (running) {
            System.out.println("\n--- MENU ---");
            System.out.println("1. Add Student");
            System.out.println("2. View All Students");
            System.out.println("3. Update Student");
            System.out.println("4. Delete Student");
            System.out.println("5. View Statistics");
            System.out.println("6. Save & Exit");
            System.out.print("\nEnter choice (1-6): ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1: // Add Student
                    System.out.println("\n--- ADD STUDENT ---");
                    System.out.print("Name: ");
                    String name = scanner.nextLine();

                    System.out.print("Email: ");
                    String email = scanner.nextLine();

                    System.out.print("GPA (0.0-4.0): ");
                    double gpa = scanner.nextDouble();
                    scanner.nextLine();

                    System.out.print("Major: ");
                    String major = scanner.nextLine();

                    manager.addStudent(name, email, gpa, major);
                    break;

                case 2: // View All
                    manager.viewAllStudents();
                    break;

                case 3: // Update
                    System.out.println("\n--- UPDATE STUDENT ---");
                    System.out.print("Enter Student ID: ");
                    int updateId = scanner.nextInt();
                    scanner.nextLine();

                    Student existing = manager.findStudentById(updateId);
                    if (existing == null) {
                        System.out.println("\n✗ Student not found!");
                        break;
                    }

                    System.out.println("Current: " + existing);
                    System.out.println("\nEnter new details:");

                    System.out.print("Name: ");
                    String newName = scanner.nextLine();

                    System.out.print("Email: ");
                    String newEmail = scanner.nextLine();

                    System.out.print("GPA: ");
                    double newGpa = scanner.nextDouble();
                    scanner.nextLine();

                    System.out.print("Major: ");
                    String newMajor = scanner.nextLine();

                    manager.updateStudent(updateId, newName, newEmail, newGpa, newMajor);
                    break;

                case 4: // Delete
                    System.out.println("\n--- DELETE STUDENT ---");
                    System.out.print("Enter Student ID: ");
                    int deleteId = scanner.nextInt();
                    scanner.nextLine();

                    manager.deleteStudent(deleteId);
                    break;

                case 5: // Statistics
                    manager.showStatistics();
                    break;

                case 6: // Save & Exit
                    manager.saveData();
                    System.out.println("\nGoodbye!");
                    running = false;
                    break;

                default:
                    System.out.println("\nInvalid choice! Try again.");
            }
        }

        scanner.close();
    }
}
```

**Expected Output (Sample Run):**
```
============================================================
    STUDENT RECORD MANAGEMENT SYSTEM
============================================================
Loaded 0 students from file.

--- MENU ---
1. Add Student
2. View All Students
3. Update Student
4. Delete Student
5. View Statistics
6. Save & Exit

Enter choice (1-6): 1

--- ADD STUDENT ---
Name: Alice Johnson
Email: alice.johnson@university.edu
GPA (0.0-4.0): 3.8
Major: Computer Science

✓ Student added successfully!
ID: 1 | Name: Alice Johnson        | Email: alice.johnson@university.edu | GPA: 3.80 | Major: Computer Science

--- MENU ---
1. Add Student
2. View All Students
3. Update Student
4. Delete Student
5. View Statistics
6. Save & Exit

Enter choice (1-6): 1

--- ADD STUDENT ---
Name: Bob Smith
Email: bob.smith@university.edu
GPA (0.0-4.0): 3.5
Major: Mathematics

✓ Student added successfully!
ID: 2 | Name: Bob Smith            | Email: bob.smith@university.edu      | GPA: 3.50 | Major: Mathematics

--- MENU ---
1. Add Student
2. View All Students
3. Update Student
4. Delete Student
5. View Statistics
6. Save & Exit

Enter choice (1-6): 2

====================================================================================================
ALL STUDENTS (2 total)
====================================================================================================
ID: 1 | Name: Alice Johnson        | Email: alice.johnson@university.edu | GPA: 3.80 | Major: Computer Science
ID: 2 | Name: Bob Smith            | Email: bob.smith@university.edu      | GPA: 3.50 | Major: Mathematics
====================================================================================================

--- MENU ---
1. Add Student
2. View All Students
3. Update Student
4. Delete Student
5. View Statistics
6. Save & Exit

Enter choice (1-6): 5

==================================================
STATISTICS
==================================================
Total Students: 2
Average GPA: 3.65
Highest GPA: 3.80
Lowest GPA: 3.50

Students by Major:
  Computer Science: 1
  Mathematics: 1
==================================================

--- MENU ---
1. Add Student
2. View All Students
3. Update Student
4. Delete Student
5. View Statistics
6. Save & Exit

Enter choice (1-6): 6
Data saved successfully!

Goodbye!
```

**💡 Key Concepts:**

| Concept | Description | Implementation |
|---------|-------------|----------------|
| **CRUD Operations** | Create, Read, Update, Delete | All 4 operations implemented |
| **Persistence** | Data survives program restart | Serialization to file |
| **Data Loading** | Read on startup | loadData() in constructor |
| **Data Saving** | Write on exit | saveData() before exit |
| **ID Management** | Auto-increment IDs | nextId variable |
| **Error Handling** | Validate operations | Check if student exists |
| **Statistics** | Data analysis | Calculate averages, counts |

**✅ Success Criteria:**
- Application loads existing data on startup
- Can add new student records
- Can view all students
- Can update student information
- Can delete students
- Shows meaningful statistics
- Saves data before exit
- Data persists across program runs

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Not loading on startup | Loses previous data | Load in constructor |
| Not saving on exit | Changes not persisted | Save before closing |
| No ID management | Duplicate IDs | Track nextId |
| Poor error handling | Crashes on invalid input | Validate before operations |
| No data validation | Bad data in system | Check GPA range, email format |
| Not closing Scanner | Resource leak | Close in finally or try-with-resources |

**🎯 Challenge:**
1. Add search by name functionality
2. Implement data export to CSV file
3. Add validation (email format, GPA range)
4. Create backup system (save to multiple files)
5. Add sorting (by name, GPA, major)
6. Implement undo/redo functionality
7. Add password protection for file access
8. Create a GUI version using Swing

---

**Day 25 Summary:**

Today you learned advanced file handling:
- **Binary Streams**: FileInputStream/FileOutputStream for any file type
- **Serialization**: Save objects to files
- **Deserialization**: Load objects from files
- **Try-with-Resources**: Automatic resource management
- **NIO.2 Path**: Modern path handling
- **Files Utility**: Simple file operations
- **Complete App**: Full CRUD system with persistence

**Total Concepts Mastered:** 7 major topics, 40+ methods, 1 real application

**Next Steps:**
- Practice with different file types
- Build more persistence applications
- Explore advanced NIO.2 features (file watching, async I/O)
- Learn database basics (next step from file storage)
