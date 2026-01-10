# Day 30: Final Review & Comprehensive Project

**Week 4: Advanced Java Concepts - Course Completion**

---

## 📋 Table of Contents
- [Learning Objectives](#learning-objectives)
- [Course Review](#course-review)
- [Final Project](#final-project)
- [Key Concepts Summary](#key-concepts-summary)
- [Next Steps](#next-steps)
- [Additional Resources](#additional-resources)
- [Navigation](#navigation)

---

## 🎯 Learning Objectives

By the end of Day 30, you will be able to:
- Review all major Java concepts covered in the 30-day course
- Apply learned concepts in a comprehensive project
- Demonstrate proficiency in Core Java fundamentals
- Identify areas for further study
- Plan your next steps in Java development

---

## 📚 Course Review

### Week 1: Java Basics (Days 1-7)
- ✅ Java setup and first program
- ✅ Variables and data types
- ✅ Operators and expressions
- ✅ Control flow (if-else, switch)
- ✅ Loops (for, while, do-while)
- ✅ Arrays (single and multi-dimensional)

### Week 2: Object-Oriented Programming (Days 8-14)
- ✅ Classes and objects
- ✅ Constructors and this keyword
- ✅ Methods and method overloading
- ✅ Encapsulation
- ✅ Inheritance
- ✅ Polymorphism
- ✅ Abstraction

### Week 3: Advanced Concepts (Days 15-21)
- ✅ Strings and String manipulation
- ✅ Packages and static keyword
- ✅ Exception handling
- ✅ Collections (List, Set, Map)
- ✅ Generics

### Week 4: Modern Java (Days 22-30)
- ✅ File I/O operations
- ✅ NIO.2 and advanced file operations
- ✅ Object serialization
- ✅ Multithreading basics
- ✅ Thread synchronization
- ✅ Lambda expressions
- ✅ Stream API
- ✅ Date & Time API
- ✅ Final review and project

---

## 🚀 Final Project

### Project: Student Management System

Build a comprehensive Student Management System that demonstrates all concepts learned.

#### Requirements:

**1. Core Features:**
- Add, update, delete, and search students
- Store student information (ID, name, age, grades)
- Calculate average grades and GPA
- Generate reports

**2. Technical Requirements:**
- Use OOP principles (classes, inheritance, polymorphism)
- Implement exception handling
- Use Collections (ArrayList, HashMap)
- File I/O for data persistence
- Multithreading for concurrent operations
- Lambda expressions and Streams for data processing

#### Sample Implementation:

```java
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;
    private String name;
    private int age;
    private List<Double> grades;
    
    public Student(String id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.grades = new ArrayList<>();
    }
    
    public void addGrade(double grade) {
        grades.add(grade);
    }
    
    public double getAverageGrade() {
        return grades.stream()
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0.0);
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public List<Double> getGrades() { return grades; }
    
    @Override
    public String toString() {
        return String.format("Student[ID=%s, Name=%s, Age=%d, Avg=%.2f]",
            id, name, age, getAverageGrade());
    }
}

class StudentManager {
    private Map<String, Student> students;
    private final String DATA_FILE = "students.dat";
    
    public StudentManager() {
        students = new HashMap<>();
        loadData();
    }
    
    public void addStudent(Student student) {
        students.put(student.getId(), student);
        System.out.println("Student added: " + student.getName());
    }
    
    public Student getStudent(String id) {
        return students.get(id);
    }
    
    public void removeStudent(String id) {
        Student removed = students.remove(id);
        if (removed != null) {
            System.out.println("Student removed: " + removed.getName());
        }
    }
    
    public List<Student> getAllStudents() {
        return new ArrayList<>(students.values());
    }
    
    public List<Student> getTopStudents(int count) {
        return students.values().stream()
            .sorted((s1, s2) -> Double.compare(
                s2.getAverageGrade(), s1.getAverageGrade()))
            .limit(count)
            .collect(Collectors.toList());
    }
    
    public void saveData() {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(DATA_FILE))) {
            out.writeObject(students);
            System.out.println("Data saved successfully");
        } catch (IOException e) {
            System.err.println("Error saving data: " + e.getMessage());
        }
    }
    
    @SuppressWarnings("unchecked")
    private void loadData() {
        File file = new File(DATA_FILE);
        if (!file.exists()) {
            return;
        }
        
        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(DATA_FILE))) {
            students = (Map<String, Student>) in.readObject();
            System.out.println("Data loaded successfully");
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Error loading data: " + e.getMessage());
        }
    }
    
    public void generateReport() {
        System.out.println("\n=== Student Report ===");
        System.out.println("Total Students: " + students.size());
        
        double overallAverage = students.values().stream()
            .mapToDouble(Student::getAverageGrade)
            .average()
            .orElse(0.0);
        
        System.out.printf("Overall Average: %.2f%n", overallAverage);
        
        System.out.println("\nTop 3 Students:");
        getTopStudents(3).forEach(System.out::println);
    }
}

public class StudentManagementSystem {
    private static StudentManager manager = new StudentManager();
    private static Scanner scanner = new Scanner(System.in);
    
    public static void main(String[] args) {
        while (true) {
            displayMenu();
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline
            
            switch (choice) {
                case 1: addStudent(); break;
                case 2: viewStudent(); break;
                case 3: removeStudent(); break;
                case 4: listAllStudents(); break;
                case 5: generateReport(); break;
                case 6: 
                    manager.saveData();
                    System.out.println("Goodbye!");
                    return;
                default:
                    System.out.println("Invalid choice");
            }
        }
    }
    
    private static void displayMenu() {
        System.out.println("\n=== Student Management System ===");
        System.out.println("1. Add Student");
        System.out.println("2. View Student");
        System.out.println("3. Remove Student");
        System.out.println("4. List All Students");
        System.out.println("5. Generate Report");
        System.out.println("6. Exit");
        System.out.print("Enter choice: ");
    }
    
    private static void addStudent() {
        System.out.print("Enter ID: ");
        String id = scanner.nextLine();
        System.out.print("Enter Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Age: ");
        int age = scanner.nextInt();
        scanner.nextLine();
        
        Student student = new Student(id, name, age);
        
        System.out.print("Enter number of grades: ");
        int numGrades = scanner.nextInt();
        for (int i = 0; i < numGrades; i++) {
            System.out.print("Grade " + (i + 1) + ": ");
            student.addGrade(scanner.nextDouble());
        }
        scanner.nextLine();
        
        manager.addStudent(student);
    }
    
    private static void viewStudent() {
        System.out.print("Enter Student ID: ");
        String id = scanner.nextLine();
        Student student = manager.getStudent(id);
        
        if (student != null) {
            System.out.println(student);
            System.out.println("Grades: " + student.getGrades());
        } else {
            System.out.println("Student not found");
        }
    }
    
    private static void removeStudent() {
        System.out.print("Enter Student ID: ");
        String id = scanner.nextLine();
        manager.removeStudent(id);
    }
    
    private static void listAllStudents() {
        List<Student> students = manager.getAllStudents();
        if (students.isEmpty()) {
            System.out.println("No students found");
        } else {
            students.forEach(System.out::println);
        }
    }
    
    private static void generateReport() {
        manager.generateReport();
    }
}
```

---

## 🔑 Key Concepts Summary

### 1. Object-Oriented Programming
- **Encapsulation**: Data hiding using private fields
- **Inheritance**: Code reuse through parent-child relationships
- **Polymorphism**: One interface, multiple implementations
- **Abstraction**: Hiding implementation details

### 2. Collections Framework
- **List**: Ordered collection (ArrayList, LinkedList)
- **Set**: Unique elements (HashSet, TreeSet)
- **Map**: Key-value pairs (HashMap, TreeMap)

### 3. Exception Handling
- **try-catch-finally**: Handle exceptions gracefully
- **throw/throws**: Propagate exceptions
- **Custom exceptions**: Create domain-specific exceptions

### 4. File I/O
- **Streams**: Read and write data
- **Serialization**: Persist objects
- **NIO.2**: Modern file operations

### 5. Multithreading
- **Thread creation**: Extend Thread or implement Runnable
- **Synchronization**: Prevent race conditions
- **wait/notify**: Inter-thread communication

### 6. Modern Java Features
- **Lambda expressions**: Functional programming
- **Stream API**: Declarative data processing
- **Date & Time API**: Modern date handling

---

## 🎓 Next Steps

### 1. Advanced Java Topics
- **JDBC**: Database connectivity
- **Servlets & JSP**: Web development
- **Spring Framework**: Enterprise applications
- **Hibernate**: ORM framework

### 2. Specialized Areas
- **Android Development**: Mobile apps
- **JavaFX**: Desktop applications
- **Microservices**: Spring Boot, Spring Cloud
- **Testing**: JUnit, Mockito

### 3. Best Practices
- **Design Patterns**: Common solutions to recurring problems
- **Clean Code**: Write maintainable code
- **Version Control**: Git and GitHub
- **Build Tools**: Maven, Gradle

### 4. Continuous Learning
- Practice coding daily
- Contribute to open-source projects
- Build personal projects
- Join Java communities

---

## 📖 Additional Resources

### Official Documentation:
- [Java Documentation](https://docs.oracle.com/en/java/)
- [Java Tutorials](https://docs.oracle.com/javase/tutorial/)

### Books:
- "Effective Java" by Joshua Bloch
- "Clean Code" by Robert C. Martin
- "Head First Java" by Kathy Sierra

### Online Platforms:
- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)
- [Codecademy](https://www.codecademy.com/)

### Communities:
- Stack Overflow
- Reddit r/java
- Java User Groups

---

## 🧭 Navigation

### Week 4 Progress:
- [Day 22: File I/O Basics](day22_file_io.md)
- [Day 23: File Operations & NIO](day23_file_operations.md)
- [Day 24: Serialization](day24_serialization.md)
- [Day 25: Multithreading Basics](day25_multithreading_basics.md)
- [Day 26: Thread Synchronization](day26_thread_synchronization.md)
- [Day 27: Lambda Expressions](day27_lambda_expressions.md)
- [Day 28: Stream API](day28_stream_api.md)
- [Day 29: Date & Time API](day29_date_time_api.md)
- **Day 30: Final Review & Project** ← You are here

### Related Resources:
- [📝 Day 30 Assessment](../../../java-learning-app/src/data/assessments/java/week4/day30.js)
- [🏠 Back to Week 4 Overview](README.md)
- [📖 Course Overview](../../Java_Core_Fundamentals_30Day_Course.md)

---

## ✅ Course Completion Checklist

Congratulations on completing the 30-day Java Core Fundamentals course! Ensure you can:

### Week 1 - Basics
- [ ] Write and run Java programs
- [ ] Use variables and data types
- [ ] Implement control flow and loops
- [ ] Work with arrays

### Week 2 - OOP
- [ ] Create classes and objects
- [ ] Implement encapsulation
- [ ] Use inheritance and polymorphism
- [ ] Apply abstraction

### Week 3 - Advanced
- [ ] Manipulate strings
- [ ] Handle exceptions
- [ ] Use collections effectively
- [ ] Work with generics

### Week 4 - Modern Java
- [ ] Perform file I/O operations
- [ ] Serialize objects
- [ ] Create and synchronize threads
- [ ] Use lambda expressions and streams
- [ ] Work with modern Date & Time API

---

## 🎉 Congratulations!

**You've completed the 30-Day Java Core Fundamentals Course!**

You now have a solid foundation in Java programming. Continue practicing, building projects, and exploring advanced topics. The journey of learning never ends!

### What's Next?
1. **Build Projects**: Apply what you've learned
2. **Explore Frameworks**: Spring, Hibernate, etc.
3. **Contribute**: Open-source projects
4. **Specialize**: Choose your path (Web, Mobile, Enterprise)
5. **Never Stop Learning**: Technology evolves constantly

**Happy Coding! 🚀**

---

## ⚠️ Common Mistakes

### 1. Project Architecture Mistakes

#### ❌ Wrong - God Class with All Logic:
```java
// WRONG - Single class doing everything
public class StudentSystem {
    private Map<String, Student> students = new HashMap<>();

    public void addStudent(String id, String name, int age) {
        Student s = new Student(id, name, age);
        students.put(id, s);

        // File I/O directly in main class
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.dat"))) {
            out.writeObject(students);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // UI logic mixed with business logic
        System.out.println("Student added: " + name);

        // Validation logic mixed in
        if (age < 0 || age > 150) {
            System.out.println("Invalid age");
        }
    }

    // Everything crammed into one class - hard to test, maintain, extend
}
```
**Issue:** All logic (UI, business, data access, validation) in single class; violates Single Responsibility Principle

#### ✅ Right:
```java
// CORRECT - Separation of concerns with proper architecture
// Model layer
class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;
    private String name;
    private int age;

    public Student(String id, String name, int age) {
        validateAge(age);
        this.id = id;
        this.name = name;
        this.age = age;
    }

    private void validateAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be between 0 and 150");
        }
    }

    // Getters only (immutable after construction)
    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
}

// Data Access Layer
class StudentRepository {
    private final String dataFile;
    private Map<String, Student> students;

    public StudentRepository(String dataFile) {
        this.dataFile = dataFile;
        this.students = new HashMap<>();
        loadData();
    }

    public void save(Student student) {
        students.put(student.getId(), student);
    }

    public Optional<Student> findById(String id) {
        return Optional.ofNullable(students.get(id));
    }

    public List<Student> findAll() {
        return new ArrayList<>(students.values());
    }

    public void remove(String id) {
        students.remove(id);
    }

    public void persist() throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(dataFile))) {
            out.writeObject(students);
        }
    }

    @SuppressWarnings("unchecked")
    private void loadData() {
        File file = new File(dataFile);
        if (!file.exists()) return;

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(dataFile))) {
            students = (Map<String, Student>) in.readObject();
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Failed to load data: " + e.getMessage());
        }
    }
}

// Business Logic Layer
class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public void addStudent(String id, String name, int age) throws IllegalArgumentException {
        if (repository.findById(id).isPresent()) {
            throw new IllegalArgumentException("Student with ID " + id + " already exists");
        }

        Student student = new Student(id, name, age);
        repository.save(student);
    }

    public Student getStudent(String id) throws StudentNotFoundException {
        return repository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException("Student not found: " + id));
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public void removeStudent(String id) throws StudentNotFoundException {
        if (!repository.findById(id).isPresent()) {
            throw new StudentNotFoundException("Student not found: " + id);
        }
        repository.remove(id);
    }

    public void saveData() throws IOException {
        repository.persist();
    }
}

// Custom Exception
class StudentNotFoundException extends Exception {
    public StudentNotFoundException(String message) {
        super(message);
    }
}

// Presentation Layer
class StudentUI {
    private final StudentService service;
    private final Scanner scanner;

    public StudentUI(StudentService service) {
        this.service = service;
        this.scanner = new Scanner(System.in);
    }

    public void displayMenu() {
        System.out.println("\n=== Student Management ===");
        System.out.println("1. Add Student");
        System.out.println("2. View Student");
        System.out.println("3. Remove Student");
        System.out.println("4. Exit");
        System.out.print("Choice: ");
    }

    public void addStudent() {
        try {
            System.out.print("ID: ");
            String id = scanner.nextLine();
            System.out.print("Name: ");
            String name = scanner.nextLine();
            System.out.print("Age: ");
            int age = Integer.parseInt(scanner.nextLine());

            service.addStudent(id, name, age);
            System.out.println("✓ Student added successfully");
        } catch (IllegalArgumentException e) {
            System.out.println("✗ Error: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("✗ Invalid age format");
        }
    }

    // More UI methods...
}

// Main application
public class StudentManagementApp {
    public static void main(String[] args) {
        StudentRepository repository = new StudentRepository("students.dat");
        StudentService service = new StudentService(repository);
        StudentUI ui = new StudentUI(service);

        // Run application...
    }
}
```

**Why:** Layered architecture separates concerns; each class has single responsibility, easy to test, maintain, extend.

**💡 Tip:** Follow layered architecture: Model → Repository (Data Access) → Service (Business Logic) → UI; each layer depends only on layer below.

---

#### ❌ Wrong - No Package Structure:
```java
// WRONG - All classes in default package
// Student.java (default package)
public class Student { }

// StudentManager.java (default package)
public class StudentManager { }

// StudentManagementSystem.java (default package)
public class StudentManagementSystem { }

// No organization, no access control, hard to navigate
```
**Issue:** No package organization; no access control, hard to maintain, can't have same class names in different contexts

#### ✅ Right:
```java
// CORRECT - Proper package structure
// com/studentapp/model/Student.java
package com.studentapp.model;

public class Student implements Serializable {
    // Model classes
}

// com/studentapp/repository/StudentRepository.java
package com.studentapp.repository;

import com.studentapp.model.Student;
import java.util.*;

public class StudentRepository {
    // Data access logic
}

// com/studentapp/service/StudentService.java
package com.studentapp.service;

import com.studentapp.model.Student;
import com.studentapp.repository.StudentRepository;

public class StudentService {
    // Business logic
}

// com/studentapp/exception/StudentNotFoundException.java
package com.studentapp.exception;

public class StudentNotFoundException extends Exception {
    // Custom exceptions
}

// com/studentapp/ui/StudentUI.java
package com.studentapp.ui;

import com.studentapp.service.StudentService;
import com.studentapp.exception.*;

public class StudentUI {
    // Presentation logic
}

// com/studentapp/Main.java
package com.studentapp;

import com.studentapp.repository.StudentRepository;
import com.studentapp.service.StudentService;
import com.studentapp.ui.StudentUI;

public class Main {
    public static void main(String[] args) {
        // Application entry point
    }
}
```

**Why:** Package structure organizes code logically; enables access control, prevents naming conflicts, improves maintainability.

**💡 Tip:** Use packages to organize by feature or layer: com.yourapp.model, com.yourapp.service, com.yourapp.repository, com.yourapp.ui.

---

#### ❌ Wrong - Tight Coupling with Concrete Classes:
```java
// WRONG - Tight coupling to concrete implementations
public class StudentService {
    private FileStudentRepository repository;  // Concrete class!

    public StudentService() {
        this.repository = new FileStudentRepository();  // Hardcoded dependency
    }

    // Can't switch to database, can't test with mock, tightly coupled
}

class FileStudentRepository {
    // File-based implementation
}
```
**Issue:** Depends on concrete class; can't swap implementations, can't test with mocks, violates Dependency Inversion

#### ✅ Right:
```java
// CORRECT - Depend on abstractions (interfaces)
// Define interface
interface StudentRepository {
    void save(Student student);
    Optional<Student> findById(String id);
    List<Student> findAll();
    void remove(String id);
}

// File-based implementation
class FileStudentRepository implements StudentRepository {
    @Override
    public void save(Student student) {
        // File implementation
    }

    @Override
    public Optional<Student> findById(String id) {
        // File implementation
        return Optional.empty();
    }

    @Override
    public List<Student> findAll() {
        return new ArrayList<>();
    }

    @Override
    public void remove(String id) {
        // File implementation
    }
}

// In-memory implementation (for testing)
class InMemoryStudentRepository implements StudentRepository {
    private Map<String, Student> students = new HashMap<>();

    @Override
    public void save(Student student) {
        students.put(student.getId(), student);
    }

    @Override
    public Optional<Student> findById(String id) {
        return Optional.ofNullable(students.get(id));
    }

    @Override
    public List<Student> findAll() {
        return new ArrayList<>(students.values());
    }

    @Override
    public void remove(String id) {
        students.remove(id);
    }
}

// Service depends on interface, not implementation
public class StudentService {
    private final StudentRepository repository;  // Interface!

    // Dependency injection via constructor
    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    // Business logic uses interface methods
    public void addStudent(Student student) {
        repository.save(student);
    }
}

// Usage - inject implementation
public class Main {
    public static void main(String[] args) {
        // Production: use file repository
        StudentRepository repository = new FileStudentRepository();
        StudentService service = new StudentService(repository);

        // Testing: use in-memory repository
        // StudentRepository testRepo = new InMemoryStudentRepository();
        // StudentService testService = new StudentService(testRepo);
    }
}
```

**Why:** Depend on interfaces; can swap implementations, easy to test, follows Dependency Inversion Principle.

**💡 Tip:** Program to interfaces, not implementations; inject dependencies via constructor (Dependency Injection).

---

### 2. OOP Design Mistakes

#### ❌ Wrong - Anemic Domain Model (No Behavior):
```java
// WRONG - Classes are just data containers with getters/setters
public class Student {
    private String id;
    private String name;
    private List<Double> grades;

    // Just getters and setters - no behavior!
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<Double> getGrades() { return grades; }
    public void setGrades(List<Double> grades) { this.grades = grades; }
}

// All logic in service class
public class StudentService {
    public double calculateAverage(Student student) {
        List<Double> grades = student.getGrades();
        if (grades == null || grades.isEmpty()) return 0.0;
        return grades.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }

    public boolean isPassing(Student student) {
        return calculateAverage(student) >= 60.0;
    }

    // Student-related logic outside Student class - not OOP!
}
```
**Issue:** Classes have no behavior, just data; violates encapsulation, logic scattered across service classes

#### ✅ Right:
```java
// CORRECT - Rich domain model with behavior
public class Student {
    private final String id;
    private final String name;
    private final List<Double> grades;
    private static final double PASSING_GRADE = 60.0;

    public Student(String id, String name) {
        validateId(id);
        validateName(name);
        this.id = id;
        this.name = name;
        this.grades = new ArrayList<>();
    }

    // Behavior: Student knows how to add grade
    public void addGrade(double grade) {
        validateGrade(grade);
        grades.add(grade);
    }

    // Behavior: Student knows how to calculate its average
    public double getAverageGrade() {
        if (grades.isEmpty()) return 0.0;
        return grades.stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
    }

    // Behavior: Student knows if it's passing
    public boolean isPassing() {
        return getAverageGrade() >= PASSING_GRADE;
    }

    // Behavior: Student knows its letter grade
    public char getLetterGrade() {
        double avg = getAverageGrade();
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        if (avg >= 60) return 'D';
        return 'F';
    }

    // Validation is part of behavior
    private void validateId(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("ID cannot be empty");
        }
    }

    private void validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
    }

    private void validateGrade(double grade) {
        if (grade < 0 || grade > 100) {
            throw new IllegalArgumentException("Grade must be between 0 and 100");
        }
    }

    // Only expose what's needed - immutable ID
    public String getId() { return id; }
    public String getName() { return name; }

    // Defensive copy for grades (don't expose internal list)
    public List<Double> getGrades() {
        return Collections.unmodifiableList(grades);
    }
}

// Service only coordinates, doesn't contain Student logic
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public void addStudent(Student student) {
        repository.save(student);
    }

    public List<Student> getPassingStudents() {
        return repository.findAll().stream()
            .filter(Student::isPassing)  // Student knows if it's passing
            .collect(Collectors.toList());
    }

    public List<Student> getHonorRollStudents() {
        return repository.findAll().stream()
            .filter(s -> s.getAverageGrade() >= 90)  // Use Student's method
            .collect(Collectors.toList());
    }
}
```

**Why:** Objects encapsulate both data and behavior; logic lives where it belongs, easier to understand and maintain.

**💡 Tip:** Put behavior in domain objects; avoid anemic models with just getters/setters; ask "who should know this?"

---

#### ❌ Wrong - Not Using Inheritance When Appropriate:
```java
// WRONG - Duplicate code across similar classes
public class Student {
    private String id;
    private String name;
    private int age;
    private String email;

    // Common person attributes
    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
}

public class Teacher {
    private String id;
    private String name;
    private int age;
    private String email;

    // Same attributes duplicated!
    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
}

public class Administrator {
    private String id;
    private String name;
    private int age;
    private String email;

    // Same attributes again!
    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
}
```
**Issue:** Code duplication; violates DRY (Don't Repeat Yourself); changes must be made in multiple places

#### ✅ Right:
```java
// CORRECT - Use inheritance for common behavior
public abstract class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    protected final String id;
    protected final String name;
    protected final int age;
    protected final String email;

    public Person(String id, String name, int age, String email) {
        validateId(id);
        validateName(name);
        validateAge(age);
        validateEmail(email);

        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
    }

    // Common validation in parent
    private void validateId(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("ID cannot be empty");
        }
    }

    private void validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
    }

    private void validateAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Invalid age");
        }
    }

    private void validateEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }

    // Common getters
    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }

    // Abstract method - each subclass implements differently
    public abstract String getRole();

    @Override
    public String toString() {
        return String.format("%s[ID=%s, Name=%s, Age=%d, Email=%s]",
            getRole(), id, name, age, email);
    }
}

// Student extends Person, adds student-specific behavior
public class Student extends Person {
    private final List<Double> grades;
    private final String major;

    public Student(String id, String name, int age, String email, String major) {
        super(id, name, age, email);
        this.major = major;
        this.grades = new ArrayList<>();
    }

    public void addGrade(double grade) {
        grades.add(grade);
    }

    public double getAverageGrade() {
        return grades.stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
    }

    @Override
    public String getRole() {
        return "Student";
    }

    public String getMajor() { return major; }
    public List<Double> getGrades() { return Collections.unmodifiableList(grades); }
}

// Teacher extends Person, adds teacher-specific behavior
public class Teacher extends Person {
    private final String department;
    private final List<String> courses;

    public Teacher(String id, String name, int age, String email, String department) {
        super(id, name, age, email);
        this.department = department;
        this.courses = new ArrayList<>();
    }

    public void addCourse(String course) {
        courses.add(course);
    }

    @Override
    public String getRole() {
        return "Teacher";
    }

    public String getDepartment() { return department; }
    public List<String> getCourses() { return Collections.unmodifiableList(courses); }
}

// Administrator extends Person
public class Administrator extends Person {
    private final String accessLevel;

    public Administrator(String id, String name, int age, String email, String accessLevel) {
        super(id, name, age, email);
        this.accessLevel = accessLevel;
    }

    @Override
    public String getRole() {
        return "Administrator";
    }

    public String getAccessLevel() { return accessLevel; }
}

// Can now handle all Person types polymorphically
public class PersonRepository<T extends Person> {
    private Map<String, T> persons = new HashMap<>();

    public void save(T person) {
        persons.put(person.getId(), person);
    }

    public Optional<T> findById(String id) {
        return Optional.ofNullable(persons.get(id));
    }

    public List<T> findAll() {
        return new ArrayList<>(persons.values());
    }
}
```

**Why:** Inheritance eliminates duplication; common code in parent, specific code in children; polymorphism enables unified handling.

**💡 Tip:** Identify common attributes/behavior; create parent class; use inheritance for "is-a" relationships.

---

### 3. Exception Handling Mistakes

#### ❌ Wrong - Swallowing Exceptions:
```java
// WRONG - Catching and ignoring exceptions
public class StudentService {
    private StudentRepository repository;

    public void addStudent(Student student) {
        try {
            repository.save(student);
            repository.persist();  // Save to file
        } catch (IOException e) {
            // Silent failure! User doesn't know save failed
        }
    }

    public Student getStudent(String id) {
        try {
            return repository.findById(id).orElse(null);
        } catch (Exception e) {
            // Swallowing exception, returning null
            return null;
        }
    }
}
```
**Issue:** Exceptions silently swallowed; user doesn't know operation failed, hard to debug, data may be lost

#### ✅ Right:
```java
// CORRECT - Proper exception handling with logging/rethrowing
import java.util.logging.*;

public class StudentService {
    private static final Logger logger = Logger.getLogger(StudentService.class.getName());
    private StudentRepository repository;

    public void addStudent(Student student) throws ServiceException {
        try {
            repository.save(student);
            repository.persist();
            logger.info("Student added successfully: " + student.getId());
        } catch (IOException e) {
            // Log and rethrow as application-specific exception
            logger.log(Level.SEVERE, "Failed to save student: " + student.getId(), e);
            throw new ServiceException("Failed to save student data", e);
        }
    }

    public Student getStudent(String id) throws StudentNotFoundException {
        try {
            return repository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found: " + id));
        } catch (StudentNotFoundException e) {
            // Log and rethrow
            logger.log(Level.WARNING, "Student not found: " + id);
            throw e;
        } catch (Exception e) {
            // Unexpected exception - log and wrap
            logger.log(Level.SEVERE, "Unexpected error retrieving student: " + id, e);
            throw new ServiceException("Failed to retrieve student", e);
        }
    }

    public void removeStudent(String id) throws ServiceException {
        try {
            if (!repository.findById(id).isPresent()) {
                throw new StudentNotFoundException("Cannot remove - student not found: " + id);
            }
            repository.remove(id);
            repository.persist();
            logger.info("Student removed: " + id);
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Failed to remove student: " + id, e);
            throw new ServiceException("Failed to remove student", e);
        }
    }
}

// Custom application exceptions
class ServiceException extends Exception {
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

class StudentNotFoundException extends Exception {
    public StudentNotFoundException(String message) {
        super(message);
    }
}

// UI handles exceptions and displays to user
public class StudentUI {
    private StudentService service;

    public void addStudent() {
        try {
            // Get input...
            service.addStudent(student);
            System.out.println("✓ Student added successfully");
        } catch (ServiceException e) {
            System.err.println("✗ Error: " + e.getMessage());
            System.err.println("Please try again or contact support");
        }
    }
}
```

**Why:** Exceptions logged and handled appropriately; user informed of failures, developers can debug, data integrity maintained.

**💡 Tip:** Never swallow exceptions; log them, rethrow as application-specific exceptions, inform user of failures.

---

#### ❌ Wrong - Catching Exception Instead of Specific Types:
```java
// WRONG - Catching generic Exception
public void processStudent(String id) {
    try {
        Student student = repository.findById(id).orElseThrow();
        student.addGrade(85.0);
        repository.save(student);
        repository.persist();
    } catch (Exception e) {
        // Too broad! Catches everything - can't handle differently
        System.out.println("Error: " + e.getMessage());
    }
}
```
**Issue:** Catches all exceptions including unchecked; can't handle different failures differently, may catch errors you shouldn't

#### ✅ Right:
```java
// CORRECT - Catch specific exception types
public void processStudent(String id) {
    try {
        Student student = repository.findById(id)
            .orElseThrow(() -> new StudentNotFoundException("Student not found: " + id));

        student.addGrade(85.0);
        repository.save(student);
        repository.persist();

    } catch (StudentNotFoundException e) {
        // Handle not found specifically
        System.err.println("Student doesn't exist: " + e.getMessage());
        System.out.println("Please check the ID and try again");

    } catch (IllegalArgumentException e) {
        // Handle validation errors
        System.err.println("Invalid data: " + e.getMessage());
        System.out.println("Please correct the input");

    } catch (IOException e) {
        // Handle I/O errors
        System.err.println("Failed to save data: " + e.getMessage());
        System.out.println("Data may not have been persisted. Please retry.");

    } catch (RuntimeException e) {
        // Unexpected runtime exceptions
        System.err.println("Unexpected error: " + e.getMessage());
        throw e;  // Rethrow - don't swallow unexpected errors
    }
}
```

**Why:** Specific catches allow different handling; more precise error messages, better error recovery, doesn't catch unexpected errors.

**💡 Tip:** Catch specific exception types in order (most specific first); handle each appropriately; avoid catching Exception or Throwable.

---

### 4. Collections Usage Mistakes

#### ❌ Wrong - Wrong Collection Choice:
```java
// WRONG - Using ArrayList when need uniqueness or fast lookup
public class StudentManager {
    private List<Student> students = new ArrayList<>();

    public void addStudent(Student student) {
        // No uniqueness check - can add duplicates!
        students.add(student);
    }

    public Student findStudent(String id) {
        // O(n) linear search every time - slow!
        for (Student s : students) {
            if (s.getId().equals(id)) {
                return s;
            }
        }
        return null;
    }

    public boolean hasStudent(String id) {
        // Another O(n) search
        return findStudent(id) != null;
    }
}
```
**Issue:** ArrayList for frequent lookups is O(n); no duplicate prevention; inefficient for large datasets

#### ✅ Right:
```java
// CORRECT - Use appropriate collection for use case
public class StudentManager {
    // HashMap for O(1) lookup by ID
    private Map<String, Student> students = new HashMap<>();

    public void addStudent(Student student) {
        String id = student.getId();

        // Check for duplicates
        if (students.containsKey(id)) {
            throw new IllegalArgumentException("Student already exists: " + id);
        }

        students.put(id, student);
    }

    public Student findStudent(String id) {
        // O(1) lookup - fast!
        return students.get(id);
    }

    public boolean hasStudent(String id) {
        // O(1) check
        return students.containsKey(id);
    }

    public List<Student> getAllStudents() {
        // Return list when order needed
        return new ArrayList<>(students.values());
    }

    public Set<String> getAllStudentIds() {
        // Return set when uniqueness/membership checks needed
        return students.keySet();
    }
}

// If need sorted access, use TreeMap
public class SortedStudentManager {
    // TreeMap maintains sorted order by key
    private SortedMap<String, Student> students = new TreeMap<>();

    public void addStudent(Student student) {
        students.put(student.getId(), student);
    }

    // Get students in sorted order by ID
    public List<Student> getStudentsSorted() {
        return new ArrayList<>(students.values());
    }

    // Get students in ID range
    public List<Student> getStudentsInRange(String fromId, String toId) {
        return new ArrayList<>(students.subMap(fromId, toId).values());
    }
}
```

**Why:** HashMap provides O(1) lookups; TreeMap maintains sorted order; LinkedList for frequent insertions/deletions; choose collection based on use case.

**💡 Tip:** ArrayList for indexed access, HashMap for key lookups, TreeMap for sorted, LinkedHashMap for insertion order, HashSet for unique elements.

---

#### ❌ Wrong - Exposing Internal Collections:
```java
// WRONG - Returning internal collection directly
public class Student {
    private List<Double> grades = new ArrayList<>();

    // Exposes internal list! Caller can modify directly
    public List<Double> getGrades() {
        return grades;  // Direct reference!
    }
}

// Client code can break encapsulation
Student student = new Student();
student.getGrades().add(-100.0);  // Invalid grade added directly!
student.getGrades().clear();  // All grades deleted!
```
**Issue:** Internal collection exposed; caller can modify directly, bypassing validation, breaking encapsulation

#### ✅ Right:
```java
// CORRECT - Return unmodifiable view or defensive copy
public class Student {
    private final List<Double> grades = new ArrayList<>();

    // Option 1: Return unmodifiable view (best for reading)
    public List<Double> getGrades() {
        return Collections.unmodifiableList(grades);
    }

    // Option 2: Return defensive copy (if caller needs to modify)
    public List<Double> getGradesCopy() {
        return new ArrayList<>(grades);
    }

    // Controlled modification through methods
    public void addGrade(double grade) {
        validateGrade(grade);
        grades.add(grade);
    }

    public void removeGrade(int index) {
        if (index < 0 || index >= grades.size()) {
            throw new IndexOutOfBoundsException("Invalid grade index");
        }
        grades.remove(index);
    }

    private void validateGrade(double grade) {
        if (grade < 0 || grade > 100) {
            throw new IllegalArgumentException("Grade must be 0-100");
        }
    }
}

// Client can read but not modify
Student student = new Student();
List<Double> grades = student.getGrades();
// grades.add(100.0);  // UnsupportedOperationException!

// Must use controlled methods
student.addGrade(95.0);  // Validated
```

**Why:** Unmodifiable views prevent external modification; maintains encapsulation, enforces validation, prevents bugs.

**💡 Tip:** Return `Collections.unmodifiableList/Set/Map()` for collections; or defensive copies if caller needs to modify; provide controlled modification methods.

---

### 5. Resource Management Mistakes

#### ❌ Wrong - Not Closing Resources:
```java
// WRONG - Resources not closed on exception
public void saveStudent(Student student) throws IOException {
    ObjectOutputStream out = new ObjectOutputStream(
        new FileOutputStream("students.dat"));

    out.writeObject(student);
    out.close();  // Never reached if writeObject throws!
}

public List<Student> loadStudents() throws IOException, ClassNotFoundException {
    ObjectInputStream in = new ObjectInputStream(
        new FileInputStream("students.dat"));

    List<Student> students = (List<Student>) in.readObject();
    in.close();  // Never reached if readObject throws!

    return students;
}
```
**Issue:** Resources not closed if exception thrown; resource leaks, file handles exhausted, data corruption

#### ✅ Right:
```java
// CORRECT - Use try-with-resources
public void saveStudent(Student student) throws IOException {
    // Automatically closed even on exception
    try (ObjectOutputStream out = new ObjectOutputStream(
            new FileOutputStream("students.dat"))) {
        out.writeObject(student);
    }  // Auto-closed here
}

@SuppressWarnings("unchecked")
public List<Student> loadStudents() throws IOException, ClassNotFoundException {
    // Multiple resources - all auto-closed in reverse order
    try (FileInputStream fis = new FileInputStream("students.dat");
         ObjectInputStream in = new ObjectInputStream(fis)) {

        return (List<Student>) in.readObject();
    }  // Both streams auto-closed here
}

// For older code, use try-finally
public void saveStudentOldStyle(Student student) throws IOException {
    ObjectOutputStream out = null;
    try {
        out = new ObjectOutputStream(new FileOutputStream("students.dat"));
        out.writeObject(student);
    } finally {
        if (out != null) {
            try {
                out.close();
            } catch (IOException e) {
                // Log but don't throw - already in error path
                System.err.println("Failed to close stream: " + e.getMessage());
            }
        }
    }
}
```

**Why:** Try-with-resources guarantees closure; prevents resource leaks, simpler than finally, handles multiple resources.

**💡 Tip:** Always use try-with-resources for AutoCloseable resources; much simpler and safer than try-finally.

---

#### ❌ Wrong - Not Handling Resource Errors:
```java
// WRONG - Assuming file operations always succeed
public void saveData() {
    try (ObjectOutputStream out = new ObjectOutputStream(
            new FileOutputStream("data.dat"))) {
        out.writeObject(students);
        System.out.println("Data saved");
    } catch (IOException e) {
        // Just print - user thinks data saved!
        e.printStackTrace();
    }
}

public void loadData() {
    try (ObjectInputStream in = new ObjectInputStream(
            new FileInputStream("data.dat"))) {
        students = (Map<String, Student>) in.readObject();
    } catch (IOException | ClassNotFoundException e) {
        // Ignore - students remains null or old data
        e.printStackTrace();
    }
}
```
**Issue:** Errors printed but not handled; user not informed, data may be lost, application state inconsistent

#### ✅ Right:
```java
// CORRECT - Handle resource errors appropriately
import java.util.logging.*;

public class StudentRepository {
    private static final Logger logger = Logger.getLogger(StudentRepository.class.getName());
    private Map<String, Student> students = new HashMap<>();
    private final String dataFile;

    public StudentRepository(String dataFile) {
        this.dataFile = dataFile;
    }

    public void saveData() throws DataPersistenceException {
        // Create backup before saving
        File file = new File(dataFile);
        File backup = new File(dataFile + ".backup");

        if (file.exists()) {
            try {
                Files.copy(file.toPath(), backup.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                logger.warning("Failed to create backup: " + e.getMessage());
            }
        }

        // Save to temporary file first
        File tempFile = new File(dataFile + ".tmp");

        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(tempFile))) {

            out.writeObject(students);
            out.flush();

            // Atomic rename - safer than overwriting directly
            Files.move(tempFile.toPath(), file.toPath(),
                StandardCopyOption.REPLACE_EXISTING,
                StandardCopyOption.ATOMIC_MOVE);

            logger.info("Data saved successfully to " + dataFile);

        } catch (IOException e) {
            // Restore from backup if save failed
            if (backup.exists()) {
                try {
                    Files.copy(backup.toPath(), file.toPath(),
                        StandardCopyOption.REPLACE_EXISTING);
                    logger.info("Restored from backup after save failure");
                } catch (IOException restoreError) {
                    logger.severe("Failed to restore from backup: " + restoreError.getMessage());
                }
            }

            // Clean up temp file
            tempFile.delete();

            logger.log(Level.SEVERE, "Failed to save data", e);
            throw new DataPersistenceException("Failed to save student data", e);
        }
    }

    @SuppressWarnings("unchecked")
    public void loadData() throws DataPersistenceException {
        File file = new File(dataFile);

        if (!file.exists()) {
            logger.info("Data file not found, starting with empty data");
            students = new HashMap<>();
            return;
        }

        try (ObjectInputStream in = new ObjectInputStream(
                new FileInputStream(file))) {

            students = (Map<String, Student>) in.readObject();
            logger.info("Loaded " + students.size() + " students from " + dataFile);

        } catch (ClassNotFoundException e) {
            logger.log(Level.SEVERE, "Invalid data file format", e);
            throw new DataPersistenceException("Data file is corrupted or incompatible", e);

        } catch (IOException e) {
            // Try backup
            File backup = new File(dataFile + ".backup");
            if (backup.exists()) {
                logger.warning("Primary file failed, trying backup");
                try (ObjectInputStream in = new ObjectInputStream(
                        new FileInputStream(backup))) {
                    students = (Map<String, Student>) in.readObject();
                    logger.info("Loaded from backup successfully");
                    return;
                } catch (IOException | ClassNotFoundException backupError) {
                    logger.severe("Backup also failed: " + backupError.getMessage());
                }
            }

            logger.log(Level.SEVERE, "Failed to load data", e);
            throw new DataPersistenceException("Failed to load student data", e);
        }
    }
}

// Custom exception for data persistence errors
class DataPersistenceException extends Exception {
    public DataPersistenceException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

**Why:** Proper error handling with backups; atomic operations prevent corruption, errors logged and communicated, graceful degradation.

**💡 Tip:** Save to temp file then atomic rename; create backups; try backup on load failure; log errors; throw exceptions with context.

---

### 6. Input Validation Mistakes

#### ❌ Wrong - No Input Validation:
```java
// WRONG - Accepting any input without validation
public class Student {
    private String id;
    private String name;
    private int age;
    private List<Double> grades;

    public Student(String id, String name, int age) {
        // No validation!
        this.id = id;
        this.name = name;
        this.age = age;
        this.grades = new ArrayList<>();
    }

    public void addGrade(double grade) {
        // No validation!
        grades.add(grade);
    }
}

// Can create invalid students
Student s1 = new Student("", "", -50);  // Empty ID/name, negative age
Student s2 = new Student(null, null, 200);  // Nulls, invalid age
s2.addGrade(-100.0);  // Negative grade
s2.addGrade(150.0);  // Grade > 100
```
**Issue:** No validation; invalid data accepted, data integrity compromised, bugs hard to trace

#### ✅ Right:
```java
// CORRECT - Validate all input
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;

    private final String id;
    private final String name;
    private final int age;
    private final List<Double> grades;

    // Validation constants
    private static final int MIN_AGE = 0;
    private static final int MAX_AGE = 150;
    private static final double MIN_GRADE = 0.0;
    private static final double MAX_GRADE = 100.0;
    private static final int MAX_NAME_LENGTH = 100;
    private static final int MAX_ID_LENGTH = 20;

    public Student(String id, String name, int age) {
        // Validate all inputs
        this.id = validateId(id);
        this.name = validateName(name);
        this.age = validateAge(age);
        this.grades = new ArrayList<>();
    }

    private String validateId(String id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }

        String trimmed = id.trim();

        if (trimmed.isEmpty()) {
            throw new IllegalArgumentException("ID cannot be empty");
        }

        if (trimmed.length() > MAX_ID_LENGTH) {
            throw new IllegalArgumentException(
                "ID too long (max " + MAX_ID_LENGTH + " characters)");
        }

        // Check for valid characters (alphanumeric and dash only)
        if (!trimmed.matches("^[a-zA-Z0-9-]+$")) {
            throw new IllegalArgumentException(
                "ID can only contain letters, numbers, and dashes");
        }

        return trimmed;
    }

    private String validateName(String name) {
        if (name == null) {
            throw new IllegalArgumentException("Name cannot be null");
        }

        String trimmed = name.trim();

        if (trimmed.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }

        if (trimmed.length() > MAX_NAME_LENGTH) {
            throw new IllegalArgumentException(
                "Name too long (max " + MAX_NAME_LENGTH + " characters)");
        }

        // Check for at least one letter
        if (!trimmed.matches(".*[a-zA-Z].*")) {
            throw new IllegalArgumentException("Name must contain at least one letter");
        }

        return trimmed;
    }

    private int validateAge(int age) {
        if (age < MIN_AGE || age > MAX_AGE) {
            throw new IllegalArgumentException(
                "Age must be between " + MIN_AGE + " and " + MAX_AGE);
        }
        return age;
    }

    public void addGrade(double grade) {
        validateGrade(grade);
        grades.add(grade);
    }

    private void validateGrade(double grade) {
        if (Double.isNaN(grade) || Double.isInfinite(grade)) {
            throw new IllegalArgumentException("Grade must be a valid number");
        }

        if (grade < MIN_GRADE || grade > MAX_GRADE) {
            throw new IllegalArgumentException(
                "Grade must be between " + MIN_GRADE + " and " + MAX_GRADE);
        }
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public List<Double> getGrades() { return Collections.unmodifiableList(grades); }
}

// UI layer also validates before calling service
public class StudentUI {
    private final Scanner scanner;
    private final StudentService service;

    public void addStudent() {
        try {
            System.out.print("Enter ID: ");
            String id = readNonEmptyString();

            System.out.print("Enter Name: ");
            String name = readNonEmptyString();

            System.out.print("Enter Age: ");
            int age = readAge();

            Student student = new Student(id, name, age);
            service.addStudent(student);

            System.out.println("✓ Student added successfully");

        } catch (IllegalArgumentException e) {
            System.err.println("✗ Invalid input: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("✗ Error: " + e.getMessage());
        }
    }

    private String readNonEmptyString() {
        String input = scanner.nextLine().trim();
        if (input.isEmpty()) {
            throw new IllegalArgumentException("Input cannot be empty");
        }
        return input;
    }

    private int readAge() {
        try {
            int age = Integer.parseInt(scanner.nextLine().trim());
            if (age < 0) {
                throw new IllegalArgumentException("Age cannot be negative");
            }
            return age;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Age must be a valid number");
        }
    }
}
```

**Why:** Comprehensive validation prevents invalid data; clear error messages, data integrity maintained, bugs caught early.

**💡 Tip:** Validate at multiple layers (UI, domain objects); use constants for limits; provide clear error messages; validate type, range, format, and business rules.

---

### 7. Code Organization Mistakes

#### ❌ Wrong - Long Methods with Multiple Responsibilities:
```java
// WRONG - One huge method doing everything
public class StudentManager {
    public void processStudentData(String filename) throws Exception {
        // 200+ lines doing everything!

        // Read file
        List<String> lines = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new FileReader(filename));
        String line;
        while ((line = reader.readLine()) != null) {
            lines.add(line);
        }
        reader.close();

        // Parse students
        List<Student> students = new ArrayList<>();
        for (String dataLine : lines) {
            String[] parts = dataLine.split(",");
            if (parts.length >= 3) {
                try {
                    String id = parts[0].trim();
                    String name = parts[1].trim();
                    int age = Integer.parseInt(parts[2].trim());

                    Student student = new Student(id, name, age);

                    // Parse grades
                    for (int i = 3; i < parts.length; i++) {
                        try {
                            double grade = Double.parseDouble(parts[i].trim());
                            student.addGrade(grade);
                        } catch (NumberFormatException e) {
                            System.err.println("Invalid grade: " + parts[i]);
                        }
                    }

                    students.add(student);
                } catch (Exception e) {
                    System.err.println("Error parsing line: " + dataLine);
                }
            }
        }

        // Validate students
        List<Student> validStudents = new ArrayList<>();
        for (Student student : students) {
            if (student.getGrades().size() > 0 &&
                student.getAverageGrade() >= 0) {
                validStudents.add(student);
            }
        }

        // Calculate statistics
        double totalAverage = 0;
        for (Student student : validStudents) {
            totalAverage += student.getAverageGrade();
        }
        totalAverage /= validStudents.size();

        // Find top students
        List<Student> topStudents = new ArrayList<>(validStudents);
        topStudents.sort((s1, s2) ->
            Double.compare(s2.getAverageGrade(), s1.getAverageGrade()));
        topStudents = topStudents.subList(0, Math.min(5, topStudents.size()));

        // Generate report
        System.out.println("=== Student Report ===");
        System.out.println("Total: " + validStudents.size());
        System.out.printf("Average: %.2f%n", totalAverage);
        System.out.println("\nTop 5:");
        for (Student student : topStudents) {
            System.out.printf("%s - %.2f%n",
                student.getName(), student.getAverageGrade());
        }

        // Save results
        ObjectOutputStream out = new ObjectOutputStream(
            new FileOutputStream("processed.dat"));
        out.writeObject(validStudents);
        out.close();
    }
}
```
**Issue:** One method does everything; impossible to test parts, hard to understand, can't reuse, violates Single Responsibility

#### ✅ Right:
```java
// CORRECT - Break into small, focused methods
public class StudentDataProcessor {
    private static final int TOP_STUDENTS_COUNT = 5;

    public void processStudentData(String inputFile, String outputFile)
            throws IOException, DataProcessingException {

        // Each step is a focused method
        List<String> lines = readLines(inputFile);
        List<Student> students = parseStudents(lines);
        List<Student> validStudents = validateStudents(students);
        StudentStatistics stats = calculateStatistics(validStudents);
        List<Student> topStudents = findTopStudents(validStudents, TOP_STUDENTS_COUNT);

        generateReport(validStudents, stats, topStudents);
        saveResults(validStudents, outputFile);
    }

    // Each method has single, clear responsibility
    private List<String> readLines(String filename) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            return reader.lines().collect(Collectors.toList());
        }
    }

    private List<Student> parseStudents(List<String> lines) {
        return lines.stream()
            .map(this::parseStudentLine)
            .filter(Optional::isPresent)
            .map(Optional::get)
            .collect(Collectors.toList());
    }

    private Optional<Student> parseStudentLine(String line) {
        try {
            String[] parts = line.split(",");
            if (parts.length < 3) {
                return Optional.empty();
            }

            String id = parts[0].trim();
            String name = parts[1].trim();
            int age = Integer.parseInt(parts[2].trim());

            Student student = new Student(id, name, age);

            // Parse grades
            for (int i = 3; i < parts.length; i++) {
                parseAndAddGrade(student, parts[i]);
            }

            return Optional.of(student);

        } catch (Exception e) {
            System.err.println("Failed to parse line: " + line);
            return Optional.empty();
        }
    }

    private void parseAndAddGrade(Student student, String gradeStr) {
        try {
            double grade = Double.parseDouble(gradeStr.trim());
            student.addGrade(grade);
        } catch (NumberFormatException e) {
            System.err.println("Invalid grade: " + gradeStr);
        }
    }

    private List<Student> validateStudents(List<Student> students) {
        return students.stream()
            .filter(this::isValidStudent)
            .collect(Collectors.toList());
    }

    private boolean isValidStudent(Student student) {
        return !student.getGrades().isEmpty() &&
               student.getAverageGrade() >= 0;
    }

    private StudentStatistics calculateStatistics(List<Student> students) {
        if (students.isEmpty()) {
            return new StudentStatistics(0, 0.0);
        }

        double average = students.stream()
            .mapToDouble(Student::getAverageGrade)
            .average()
            .orElse(0.0);

        return new StudentStatistics(students.size(), average);
    }

    private List<Student> findTopStudents(List<Student> students, int count) {
        return students.stream()
            .sorted((s1, s2) -> Double.compare(
                s2.getAverageGrade(), s1.getAverageGrade()))
            .limit(count)
            .collect(Collectors.toList());
    }

    private void generateReport(List<Student> students,
                                StudentStatistics stats,
                                List<Student> topStudents) {
        System.out.println("=== Student Report ===");
        System.out.println("Total Students: " + stats.getCount());
        System.out.printf("Overall Average: %.2f%n", stats.getAverage());
        System.out.println("\nTop " + topStudents.size() + " Students:");

        topStudents.forEach(s ->
            System.out.printf("%s - %.2f%n", s.getName(), s.getAverageGrade()));
    }

    private void saveResults(List<Student> students, String filename)
            throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(filename))) {
            out.writeObject(students);
        }
    }
}

// Statistics value object
class StudentStatistics {
    private final int count;
    private final double average;

    public StudentStatistics(int count, double average) {
        this.count = count;
        this.average = average;
    }

    public int getCount() { return count; }
    public double getAverage() { return average; }
}

// Exception for data processing errors
class DataProcessingException extends Exception {
    public DataProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

**Why:** Small focused methods; each does one thing, easy to understand, testable, reusable, follows Single Responsibility.

**💡 Tip:** Extract method when method > 20 lines or does multiple things; each method should do one thing with clear name.

---

#### ❌ Wrong - Magic Numbers and Hardcoded Values:
```java
// WRONG - Magic numbers and hardcoded values everywhere
public class StudentService {
    public List<Student> getTopStudents(List<Student> students) {
        return students.stream()
            .filter(s -> s.getAverageGrade() >= 90.0)  // What is 90?
            .sorted((s1, s2) -> Double.compare(
                s2.getAverageGrade(), s1.getAverageGrade()))
            .limit(5)  // Why 5?
            .collect(Collectors.toList());
    }

    public boolean isValidAge(int age) {
        return age >= 0 && age <= 150;  // Magic numbers
    }

    public void saveData() {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("students.dat"))) {  // Hardcoded filename
            out.writeObject(students);
        }
    }
}
```
**Issue:** Magic numbers unclear; hardcoded values can't be changed easily, unclear meaning, error-prone

#### ✅ Right:
```java
// CORRECT - Named constants and configuration
public class StudentService {
    // Named constants with clear meaning
    private static final double HONOR_ROLL_THRESHOLD = 90.0;
    private static final int TOP_STUDENTS_COUNT = 5;
    private static final int MIN_VALID_AGE = 0;
    private static final int MAX_VALID_AGE = 150;
    private static final double PASSING_GRADE = 60.0;
    private static final double MIN_GRADE = 0.0;
    private static final double MAX_GRADE = 100.0;

    // Configuration from file/properties
    private final String dataFile;
    private final int maxStudents;

    public StudentService(StudentConfig config) {
        this.dataFile = config.getDataFile();
        this.maxStudents = config.getMaxStudents();
    }

    public List<Student> getHonorRollStudents(List<Student> students) {
        return students.stream()
            .filter(s -> s.getAverageGrade() >= HONOR_ROLL_THRESHOLD)
            .sorted((s1, s2) -> Double.compare(
                s2.getAverageGrade(), s1.getAverageGrade()))
            .limit(TOP_STUDENTS_COUNT)
            .collect(Collectors.toList());
    }

    public List<Student> getPassingStudents(List<Student> students) {
        return students.stream()
            .filter(s -> s.getAverageGrade() >= PASSING_GRADE)
            .collect(Collectors.toList());
    }

    public boolean isValidAge(int age) {
        return age >= MIN_VALID_AGE && age <= MAX_VALID_AGE;
    }

    public boolean isValidGrade(double grade) {
        return grade >= MIN_GRADE && grade <= MAX_GRADE;
    }

    public void saveData(List<Student> students) throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream(dataFile))) {
            out.writeObject(students);
        }
    }
}

// Configuration class
class StudentConfig {
    private final String dataFile;
    private final int maxStudents;
    private final String backupDir;

    // Load from properties file
    public static StudentConfig load(String configFile) throws IOException {
        Properties props = new Properties();
        try (InputStream in = new FileInputStream(configFile)) {
            props.load(in);
        }

        return new StudentConfig(
            props.getProperty("data.file", "students.dat"),
            Integer.parseInt(props.getProperty("max.students", "1000")),
            props.getProperty("backup.dir", "backup")
        );
    }

    private StudentConfig(String dataFile, int maxStudents, String backupDir) {
        this.dataFile = dataFile;
        this.maxStudents = maxStudents;
        this.backupDir = backupDir;
    }

    public String getDataFile() { return dataFile; }
    public int getMaxStudents() { return maxStudents; }
    public String getBackupDir() { return backupDir; }
}
```

**Why:** Named constants self-documenting; easy to change, DRY principle, configuration externalized, clear intent.

**💡 Tip:** Use named constants for all literal values; extract configuration to properties file; constants should be `private static final`.

---

### 8. Multithreading Mistakes in Projects

#### ❌ Wrong - Unsafe Concurrent Access:
```java
// WRONG - Not thread-safe
public class StudentManager {
    private Map<String, Student> students = new HashMap<>();

    // Multiple threads can call concurrently - race condition!
    public void addStudent(Student student) {
        students.put(student.getId(), student);  // Not thread-safe!
    }

    public Student getStudent(String id) {
        return students.get(id);  // Not thread-safe!
    }

    public int getCount() {
        return students.size();  // Not thread-safe!
    }
}

// Concurrent access causes problems
StudentManager manager = new StudentManager();

// Thread 1
new Thread(() -> {
    for (int i = 0; i < 1000; i++) {
        manager.addStudent(new Student("S" + i, "Name" + i, 20));
    }
}).start();

// Thread 2
new Thread(() -> {
    for (int i = 0; i < 1000; i++) {
        manager.addStudent(new Student("T" + i, "Name" + i, 20));
    }
}).start();

// Result: ConcurrentModificationException or lost updates!
```
**Issue:** HashMap not thread-safe; concurrent modifications cause exceptions, lost data, inconsistent state

#### ✅ Right:
```java
// CORRECT - Thread-safe implementation
import java.util.concurrent.*;

// Option 1: Use concurrent collection
public class ThreadSafeStudentManager {
    // ConcurrentHashMap is thread-safe
    private final ConcurrentMap<String, Student> students = new ConcurrentHashMap<>();

    public void addStudent(Student student) {
        students.put(student.getId(), student);  // Thread-safe
    }

    public Student getStudent(String id) {
        return students.get(id);  // Thread-safe
    }

    public int getCount() {
        return students.size();  // Thread-safe
    }

    public List<Student> getAllStudents() {
        return new ArrayList<>(students.values());
    }
}

// Option 2: Synchronize access
public class SynchronizedStudentManager {
    private final Map<String, Student> students = new HashMap<>();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    public void addStudent(Student student) {
        lock.writeLock().lock();
        try {
            students.put(student.getId(), student);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public Student getStudent(String id) {
        lock.readLock().lock();
        try {
            return students.get(id);
        } finally {
            lock.readLock().unlock();
        }
    }

    public List<Student> getAllStudents() {
        lock.readLock().lock();
        try {
            return new ArrayList<>(students.values());
        } finally {
            lock.readLock().unlock();
        }
    }
}

// Usage - now thread-safe
ThreadSafeStudentManager manager = new ThreadSafeStudentManager();

ExecutorService executor = Executors.newFixedThreadPool(10);

// Submit 1000 tasks concurrently
for (int i = 0; i < 1000; i++) {
    final int index = i;
    executor.submit(() -> {
        Student student = new Student("S" + index, "Name" + index, 20);
        manager.addStudent(student);
    });
}

executor.shutdown();
executor.awaitTermination(1, TimeUnit.MINUTES);

System.out.println("Total students: " + manager.getCount());  // Correct count
```

**Why:** ConcurrentHashMap handles concurrent access; ReadWriteLock allows multiple readers; no race conditions, thread-safe.

**💡 Tip:** Use concurrent collections (ConcurrentHashMap, CopyOnWriteArrayList); or synchronize with locks; never share mutable state without protection.

---

### 9. Stream API Misuse in Projects

#### ❌ Wrong - Side Effects in Streams:
```java
// WRONG - Side effects in stream operations
public class ReportGenerator {
    private int totalProcessed = 0;  // Mutable state

    public List<String> generateReport(List<Student> students) {
        return students.stream()
            .filter(s -> {
                totalProcessed++;  // Side effect! Not thread-safe in parallel
                return s.getAverageGrade() >= 60.0;
            })
            .map(s -> {
                System.out.println("Processing: " + s.getName());  // Side effect
                return String.format("%s: %.2f", s.getName(), s.getAverageGrade());
            })
            .collect(Collectors.toList());
    }
}
```
**Issue:** Side effects in stream pipeline; not thread-safe, unpredictable with parallel streams, violates functional principles

#### ✅ Right:
```java
// CORRECT - Functional approach without side effects
public class ReportGenerator {
    public ReportResult generateReport(List<Student> students) {
        // Filter passing students
        List<Student> passingStudents = students.stream()
            .filter(s -> s.getAverageGrade() >= 60.0)
            .collect(Collectors.toList());

        // Generate report lines
        List<String> reportLines = passingStudents.stream()
            .map(s -> String.format("%s: %.2f", s.getName(), s.getAverageGrade()))
            .collect(Collectors.toList());

        // Return result with statistics (no side effects during stream)
        return new ReportResult(reportLines, passingStudents.size());
    }

    // If logging needed, use peek (but only for debugging)
    public List<String> generateReportWithLogging(List<Student> students) {
        return students.stream()
            .filter(s -> s.getAverageGrade() >= 60.0)
            .peek(s -> System.out.println("Processing: " + s.getName()))
            .map(s -> String.format("%s: %.2f", s.getName(), s.getAverageGrade()))
            .collect(Collectors.toList());
    }
}

class ReportResult {
    private final List<String> lines;
    private final int count;

    public ReportResult(List<String> lines, int count) {
        this.lines = lines;
        this.count = count;
    }

    public List<String> getLines() { return lines; }
    public int getCount() { return count; }
}
```

**Why:** No side effects in streams; functional, thread-safe, works correctly with parallel streams, clear and testable.

**💡 Tip:** Keep streams functional; no side effects (modifying external state); use `collect()` to accumulate results; `peek()` only for debugging.

---

### 10. Documentation and Maintenance Mistakes

#### ❌ Wrong - No Documentation or Tests:
```java
// WRONG - No documentation, unclear what it does
public class StudentProcessor {
    public List<Student> process(List<Student> s, double t) {
        return s.stream()
            .filter(x -> x.getAverageGrade() >= t &&
                         x.getGrades().size() >= 3)
            .sorted((a, b) -> Double.compare(b.getAverageGrade(),
                                            a.getAverageGrade()))
            .collect(Collectors.toList());
    }

    // What does this do? What are the parameters? No tests!
}
```
**Issue:** No documentation; unclear purpose, parameters, behavior; no tests to verify correctness

#### ✅ Right:
```java
// CORRECT - Well-documented with clear contracts
/**
 * Processes student data to find qualifying students based on performance criteria.
 *
 * <p>This processor filters and ranks students based on their academic performance,
 * requiring a minimum number of grades and average score to qualify.</p>
 *
 * @author Your Name
 * @version 1.0
 * @since 2026-01-10
 */
public class StudentProcessor {

    /** Minimum number of grades required for a student to be eligible */
    private static final int MIN_GRADES_REQUIRED = 3;

    /**
     * Filters and sorts students who meet the performance threshold.
     *
     * <p>A student qualifies if they meet ALL of the following criteria:</p>
     * <ul>
     *   <li>Average grade is at or above the threshold</li>
     *   <li>Has at least {@value #MIN_GRADES_REQUIRED} recorded grades</li>
     * </ul>
     *
     * <p>Qualifying students are returned in descending order of average grade
     * (highest performing students first).</p>
     *
     * @param students the list of students to process; must not be null
     * @param threshold the minimum average grade required (0.0 - 100.0)
     * @return a new list containing qualifying students, sorted by performance;
     *         never null, but may be empty if no students qualify
     * @throws IllegalArgumentException if students is null or threshold is invalid
     *
     * @see Student#getAverageGrade()
     * @see #MIN_GRADES_REQUIRED
     */
    public List<Student> filterAndRankQualifyingStudents(
            List<Student> students,
            double threshold) {

        // Validate parameters
        if (students == null) {
            throw new IllegalArgumentException("Students list cannot be null");
        }

        if (threshold < 0.0 || threshold > 100.0) {
            throw new IllegalArgumentException(
                "Threshold must be between 0.0 and 100.0, got: " + threshold);
        }

        // Filter and sort
        return students.stream()
            .filter(student -> meetsQualificationCriteria(student, threshold))
            .sorted(byAverageGradeDescending())
            .collect(Collectors.toList());
    }

    /**
     * Checks if a student meets all qualification criteria.
     *
     * @param student the student to check
     * @param threshold the minimum average grade required
     * @return true if the student qualifies, false otherwise
     */
    private boolean meetsQualificationCriteria(Student student, double threshold) {
        return student.getAverageGrade() >= threshold &&
               student.getGrades().size() >= MIN_GRADES_REQUIRED;
    }

    /**
     * Returns a comparator that sorts students by average grade in descending order.
     *
     * @return a comparator for sorting students
     */
    private Comparator<Student> byAverageGradeDescending() {
        return (s1, s2) -> Double.compare(
            s2.getAverageGrade(),
            s1.getAverageGrade()
        );
    }
}

// Comprehensive unit tests
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.util.*;

class StudentProcessorTest {
    private StudentProcessor processor;
    private List<Student> students;

    @BeforeEach
    void setUp() {
        processor = new StudentProcessor();
        students = new ArrayList<>();
    }

    @Test
    @DisplayName("Should return empty list when no students qualify")
    void testNoQualifyingStudents() {
        Student s1 = new Student("S1", "Alice", 20);
        s1.addGrade(50.0);
        s1.addGrade(55.0);
        s1.addGrade(60.0);
        students.add(s1);

        List<Student> result = processor.filterAndRankQualifyingStudents(students, 80.0);

        assertTrue(result.isEmpty(), "Should return empty list when no students meet threshold");
    }

    @Test
    @DisplayName("Should filter students below threshold")
    void testFiltersBelowThreshold() {
        Student s1 = new Student("S1", "Alice", 20);
        s1.addGrade(90.0);
        s1.addGrade(85.0);
        s1.addGrade(95.0);

        Student s2 = new Student("S2", "Bob", 21);
        s2.addGrade(60.0);
        s2.addGrade(65.0);
        s2.addGrade(70.0);

        students.add(s1);
        students.add(s2);

        List<Student> result = processor.filterAndRankQualifyingStudents(students, 80.0);

        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getName());
    }

    @Test
    @DisplayName("Should require minimum 3 grades")
    void testRequiresMinimumGrades() {
        Student s1 = new Student("S1", "Alice", 20);
        s1.addGrade(100.0);
        s1.addGrade(100.0);
        // Only 2 grades - should not qualify

        students.add(s1);

        List<Student> result = processor.filterAndRankQualifyingStudents(students, 80.0);

        assertTrue(result.isEmpty(), "Should require at least 3 grades");
    }

    @Test
    @DisplayName("Should sort by average grade descending")
    void testSortsByGradeDescending() {
        Student s1 = new Student("S1", "Alice", 20);
        s1.addGrade(80.0);
        s1.addGrade(85.0);
        s1.addGrade(90.0);  // Avg: 85

        Student s2 = new Student("S2", "Bob", 21);
        s2.addGrade(95.0);
        s2.addGrade(90.0);
        s2.addGrade(100.0);  // Avg: 95

        Student s3 = new Student("S3", "Charlie", 22);
        s3.addGrade(70.0);
        s3.addGrade(80.0);
        s3.addGrade(90.0);  // Avg: 80

        students.add(s1);
        students.add(s2);
        students.add(s3);

        List<Student> result = processor.filterAndRankQualifyingStudents(students, 70.0);

        assertEquals(3, result.size());
        assertEquals("Bob", result.get(0).getName());  // Highest average
        assertEquals("Alice", result.get(1).getName());
        assertEquals("Charlie", result.get(2).getName());  // Lowest average
    }

    @Test
    @DisplayName("Should throw exception for null students list")
    void testNullStudentsListThrowsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            processor.filterAndRankQualifyingStudents(null, 80.0);
        });

        assertTrue(exception.getMessage().contains("cannot be null"));
    }

    @Test
    @DisplayName("Should throw exception for invalid threshold")
    void testInvalidThresholdThrowsException() {
        Exception exception1 = assertThrows(IllegalArgumentException.class, () -> {
            processor.filterAndRankQualifyingStudents(students, -10.0);
        });

        Exception exception2 = assertThrows(IllegalArgumentException.class, () -> {
            processor.filterAndRankQualifyingStudents(students, 150.0);
        });

        assertTrue(exception1.getMessage().contains("between 0.0 and 100.0"));
        assertTrue(exception2.getMessage().contains("between 0.0 and 100.0"));
    }
}
```

**Why:** Clear documentation explains purpose, parameters, behavior; tests verify correctness, prevent regressions, serve as examples.

**💡 Tip:** Write Javadoc for all public methods; include examples, parameter descriptions, return values, exceptions; write unit tests for all functionality.

---

This comprehensive list contains **40+ project mistakes** covering integration errors, real-world application issues, and best practices!

---

**🎉 Congratulations on completing Day 30 and the entire course!**

You've now learned all fundamental Java concepts and common mistakes. Use this knowledge to build amazing projects!

**Next Steps**: Continue practicing, build projects, contribute to open source, and keep learning!

---

*Last Updated: 2026-01-10*
*Course Completed: Day 30 of 30*