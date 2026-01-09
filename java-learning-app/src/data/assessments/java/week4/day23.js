export default {
  title: "Day 23: File Handling - Part 2 Assessment",
  description: "Test your understanding of serialization, byte streams, and NIO.2",
  passingScore: 70,
  timeLimit: 30, // minutes
  modes: {
    quick: {
      questionCount: 9,
      timeLimit: 15,
      sections: ['section-a', 'section-b']
    },
    full: {
      questionCount: 12,
      timeLimit: 30,
      sections: ['section-a', 'section-b', 'section-c']
    }
  },
  sections: [
    {
      id: 'section-a',
      title: 'Multiple Choice Questions',
      questions: [
        {
          id: 'q1',
          type: 'mcq',
          question: 'What is serialization?',
          options: [
            'Converting object to bytes',
            'Converting bytes to object',
            'Writing to file',
            'Reading from file'
          ],
          correctAnswer: 0,
          points: 2,
          difficulty: 'easy',
          explanation: 'Serialization is the process of converting an object into a byte stream for storage or transmission.'
        },
        {
          id: 'q2',
          type: 'mcq',
          question: 'Which interface must a class implement to be serializable?',
          options: [
            'Serialization',
            'Serializable',
            'ObjectSerializable',
            'Writable'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'A class must implement the Serializable interface (marker interface) to be serializable.'
        },
        {
          id: 'q3',
          type: 'mcq',
          question: 'Which class is used to serialize objects?',
          options: [
            'ObjectWriter',
            'ObjectOutputStream',
            'FileOutputStream',
            'Serializer'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'ObjectOutputStream is used to write (serialize) objects to an output stream.'
        },
        {
          id: 'q4',
          type: 'mcq',
          question: 'Which class is used to deserialize objects?',
          options: [
            'ObjectReader',
            'ObjectInputStream',
            'FileInputStream',
            'Deserializer'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'easy',
          explanation: 'ObjectInputStream is used to read (deserialize) objects from an input stream.'
        },
        {
          id: 'q5',
          type: 'mcq',
          question: 'What does the transient keyword do?',
          options: [
            'Makes field final',
            'Skips field during serialization',
            'Makes field static',
            'Makes field volatile'
          ],
          correctAnswer: 1,
          points: 2,
          difficulty: 'medium',
          explanation: 'The transient keyword marks a field to be excluded from serialization. Transient fields are not saved.'
        },
        {
          id: 'q6',
          type: 'mcq',
          question: 'Which package contains NIO.2 classes?',
          options: [
            'java.io',
            'java.nio',
            'java.nio.file',
            'java.file'
          ],
          correctAnswer: 2,
          points: 2,
          difficulty: 'medium',
          explanation: 'The java.nio.file package contains NIO.2 (New I/O 2) classes like Files, Path, and Paths.'
        }
      ]
    },
    {
      id: 'section-b',
      title: 'Short Answer Questions',
      questions: [
        {
          id: 'q7',
          type: 'short',
          question: 'Explain the difference between byte streams and character streams.',
          sampleAnswer: 'Byte streams (InputStream/OutputStream) handle raw binary data, reading/writing 8-bit bytes. Used for all file types including images, videos, binary files. Character streams (Reader/Writer) handle text data, reading/writing 16-bit Unicode characters. They handle character encoding automatically. Use byte streams for binary data, character streams for text. Examples: FileInputStream vs FileReader, FileOutputStream vs FileWriter.',
          points: 3,
          difficulty: 'medium',
          keywords: ['byte stream', 'character stream', 'binary', 'text', 'InputStream', 'OutputStream', 'Reader', 'Writer', 'Unicode']
        },
        {
          id: 'q8',
          type: 'short',
          question: 'What is the purpose of serialization? Give a real-world use case.',
          sampleAnswer: 'Serialization converts objects to byte streams for: 1) Persistence - saving object state to disk. 2) Network transmission - sending objects over network. 3) Caching - storing objects in memory/disk cache. 4) Deep copying objects. Real-world use cases: Saving game state, session management in web apps, distributed computing (RMI), caching user preferences, storing shopping cart data, messaging systems.',
          points: 3,
          difficulty: 'medium',
          keywords: ['serialization', 'persistence', 'network', 'transmission', 'cache', 'save', 'state', 'use case']
        },
        {
          id: 'q9',
          type: 'short',
          question: 'What are the advantages of NIO.2 over old File API?',
          sampleAnswer: 'NIO.2 advantages: 1) Better exception handling - specific exceptions instead of boolean returns. 2) Symbolic link support. 3) File attributes access (permissions, timestamps). 4) Directory tree traversal. 5) Watch service for file changes. 6) Better performance. 7) Path interface more flexible than File. 8) Atomic file operations. 9) Memory-mapped files. 10) Non-blocking I/O. Overall more powerful and modern API.',
          points: 3,
          difficulty: 'hard',
          keywords: ['NIO.2', 'advantages', 'exception', 'Path', 'Files', 'performance', 'symbolic link', 'attributes', 'watch service']
        }
      ]
    },
    {
      id: 'section-c',
      title: 'Coding Problems',
      questions: [
        {
          id: 'q10',
          type: 'short',
          question: 'Write a program to serialize and deserialize a Student object.',
          sampleAnswer: `import java.io.*;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String name;
    private int rollNo;
    private double marks;
    
    public Student(String name, int rollNo, double marks) {
        this.name = name;
        this.rollNo = rollNo;
        this.marks = marks;
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', rollNo=" + rollNo + 
               ", marks=" + marks + "}";
    }
}

public class SerializationDemo {
    public static void main(String[] args) {
        String filename = "student.ser";
        
        // Serialization
        Student student = new Student("Alice", 101, 95.5);
        System.out.println("Original object: " + student);
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            oos.writeObject(student);
            System.out.println("Object serialized successfully!");
            
        } catch (IOException e) {
            System.out.println("Serialization error: " + e.getMessage());
        }
        
        // Deserialization
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(filename))) {
            Student deserializedStudent = (Student) ois.readObject();
            System.out.println("Object deserialized successfully!");
            System.out.println("Deserialized object: " + deserializedStudent);
            
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Deserialization error: " + e.getMessage());
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['Serializable', 'ObjectOutputStream', 'ObjectInputStream', 'serialize', 'deserialize', 'writeObject', 'readObject']
        },
        {
          id: 'q11',
          type: 'short',
          question: 'Create a class with transient field and demonstrate it is not serialized.',
          sampleAnswer: `import java.io.*;

class BankAccount implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String accountNumber;
    private String accountHolder;
    private double balance;
    
    // Transient field - will not be serialized
    private transient String password;
    
    // Static field - not serialized (belongs to class, not object)
    private static String bankName = "MyBank";
    
    public BankAccount(String accountNumber, String accountHolder, 
                      double balance, String password) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.password = password;
    }
    
    public void displayInfo() {
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Balance: $" + balance);
        System.out.println("Password: " + (password != null ? password : "null (not serialized)"));
        System.out.println("Bank Name: " + bankName);
    }
}

public class TransientDemo {
    public static void main(String[] args) {
        String filename = "account.ser";
        
        // Create and serialize
        BankAccount account = new BankAccount("ACC001", "John Doe", 
                                             5000.0, "secret123");
        
        System.out.println("Before Serialization:");
        account.displayInfo();
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            oos.writeObject(account);
            System.out.println("\\nAccount serialized!");
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(filename))) {
            BankAccount deserializedAccount = (BankAccount) ois.readObject();
            
            System.out.println("\\nAfter Deserialization:");
            deserializedAccount.displayInfo();
            System.out.println("\\nNotice: password is null (transient field not serialized)");
            
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['transient', 'Serializable', 'not serialized', 'password', 'security', 'static', 'ObjectOutputStream']
        },
        {
          id: 'q12',
          type: 'short',
          question: 'Write a program using Files class (NIO.2) to read all lines from a file.',
          sampleAnswer: `import java.nio.file.*;
import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

public class NIO2ReadDemo {
    public static void main(String[] args) {
        Path filePath = Paths.get("sample.txt");
        
        // Method 1: Read all lines at once
        System.out.println("Method 1: Read all lines");
        try {
            List<String> lines = Files.readAllLines(filePath);
            for (int i = 0; i < lines.size(); i++) {
                System.out.println((i + 1) + ": " + lines.get(i));
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        System.out.println("\\n" + "=".repeat(50) + "\\n");
        
        // Method 2: Stream lines (memory efficient for large files)
        System.out.println("Method 2: Stream lines");
        try (Stream<String> stream = Files.lines(filePath)) {
            stream.forEach(line -> System.out.println(line));
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        System.out.println("\\n" + "=".repeat(50) + "\\n");
        
        // Method 3: Read with filtering
        System.out.println("Method 3: Filter non-empty lines");
        try (Stream<String> stream = Files.lines(filePath)) {
            stream.filter(line -> !line.trim().isEmpty())
                  .forEach(line -> System.out.println(line));
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Additional NIO.2 operations
        demonstrateNIO2Operations(filePath);
    }
    
    public static void demonstrateNIO2Operations(Path path) {
        System.out.println("\\n" + "=".repeat(50));
        System.out.println("Additional NIO.2 Operations:");
        
        try {
            // Check if file exists
            System.out.println("File exists: " + Files.exists(path));
            
            // Get file size
            System.out.println("File size: " + Files.size(path) + " bytes");
            
            // Check if readable/writable
            System.out.println("Readable: " + Files.isReadable(path));
            System.out.println("Writable: " + Files.isWritable(path));
            
            // Get last modified time
            System.out.println("Last modified: " + 
                             Files.getLastModifiedTime(path));
            
            // Write to file using NIO.2
            Path outputPath = Paths.get("output_nio2.txt");
            List<String> content = List.of(
                "Line 1 using NIO.2",
                "Line 2 using NIO.2",
                "Line 3 using NIO.2"
            );
            Files.write(outputPath, content);
            System.out.println("\\nFile written using NIO.2: " + outputPath);
            
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          points: 5,
          difficulty: 'medium',
          keywords: ['NIO.2', 'Files', 'Path', 'Paths', 'readAllLines', 'lines', 'Stream', 'write', 'exists', 'size']
        }
      ]
    }
  ]
};