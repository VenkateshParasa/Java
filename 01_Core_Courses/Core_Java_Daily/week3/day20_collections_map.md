# Day 20: Collections Framework - Map & Utilities

## 📚 Learning Objectives
By the end of this lesson, you will be able to:
- Work with Map interface and implementations
- Use HashMap, LinkedHashMap, and TreeMap
- Understand Hashtable
- Use Collections utility class methods
- Implement Comparable and Comparator interfaces

---

## 🎯 Topics Covered

### 1. HashMap

#### Basic HashMap Operations
```java
import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        // Create HashMap
        HashMap<String, Integer> scores = new HashMap<>();
        
        // Add key-value pairs
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("Alice", 98);  // Updates existing value
        
        System.out.println("Scores: " + scores);
        
        // Get value
        System.out.println("Alice's score: " + scores.get("Alice"));
        System.out.println("David's score: " + scores.get("David"));  // null
        
        // Check if key/value exists
        System.out.println("Contains Bob: " + scores.containsKey("Bob"));
        System.out.println("Contains score 92: " + scores.containsValue(92));
        
        // Remove
        scores.remove("Bob");
        System.out.println("After removal: " + scores);
        
        // Size
        System.out.println("Size: " + scores.size());
    }
}
```

#### Iterating HashMap
```java
import java.util.*;

public class HashMapIteration {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);
        
        // Method 1: Using entrySet()
        System.out.println("Using entrySet:");
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }
        
        // Method 2: Using keySet()
        System.out.println("\nUsing keySet:");
        for (String key : map.keySet()) {
            System.out.println(key + " = " + map.get(key));
        }
        
        // Method 3: Using values()
        System.out.println("\nUsing values:");
        for (Integer value : map.values()) {
            System.out.println(value);
        }
        
        // Method 4: Using forEach (Java 8+)
        System.out.println("\nUsing forEach:");
        map.forEach((key, value) -> System.out.println(key + " = " + value));
    }
}
```

---

### 2. LinkedHashMap

#### Maintains Insertion Order
```java
import java.util.LinkedHashMap;

public class LinkedHashMapDemo {
    public static void main(String[] args) {
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        
        map.put("Third", 3);
        map.put("First", 1);
        map.put("Second", 2);
        
        // Maintains insertion order
        System.out.println("LinkedHashMap: " + map);
        // Output: {Third=3, First=1, Second=2}
        
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }
    }
}
```

---

### 3. TreeMap

#### Sorted Map
```java
import java.util.TreeMap;

public class TreeMapDemo {
    public static void main(String[] args) {
        TreeMap<String, Integer> map = new TreeMap<>();
        
        map.put("Charlie", 92);
        map.put("Alice", 95);
        map.put("Bob", 87);
        
        // Automatically sorted by keys
        System.out.println("TreeMap: " + map);
        // Output: {Alice=95, Bob=87, Charlie=92}
        
        // TreeMap-specific methods
        System.out.println("First key: " + map.firstKey());
        System.out.println("Last key: " + map.lastKey());
        System.out.println("Lower key than 'Bob': " + map.lowerKey("Bob"));
        System.out.println("Higher key than 'Bob': " + map.higherKey("Bob"));
        
        // Subset operations
        System.out.println("HeadMap (< 'Charlie'): " + map.headMap("Charlie"));
        System.out.println("TailMap (>= 'Bob'): " + map.tailMap("Bob"));
        System.out.println("SubMap ['Alice', 'Charlie'): " + 
                          map.subMap("Alice", "Charlie"));
    }
}
```

---

### 4. Hashtable

#### Thread-Safe HashMap
```java
import java.util.Hashtable;

public class HashtableDemo {
    public static void main(String[] args) {
        Hashtable<String, Integer> table = new Hashtable<>();
        
        table.put("A", 1);
        table.put("B", 2);
        table.put("C", 3);
        // table.put(null, 4);  // NullPointerException - no null keys
        // table.put("D", null);  // NullPointerException - no null values
        
        System.out.println("Hashtable: " + table);
        
        // Thread-safe but slower than HashMap
        // Use ConcurrentHashMap for better performance
    }
}
```

---

### 5. Collections Utility Class

#### Sorting
```java
import java.util.*;

public class CollectionsSorting {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));
        
        // Sort in natural order
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);
        
        // Sort in reverse order
        Collections.sort(numbers, Collections.reverseOrder());
        System.out.println("Reverse sorted: " + numbers);
        
        // Shuffle
        Collections.shuffle(numbers);
        System.out.println("Shuffled: " + numbers);
        
        // Reverse
        Collections.reverse(numbers);
        System.out.println("Reversed: " + numbers);
    }
}
```

#### Searching and Other Operations
```java
import java.util.*;

public class CollectionsOperations {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        
        // Binary search (list must be sorted)
        int index = Collections.binarySearch(numbers, 3);
        System.out.println("Index of 3: " + index);
        
        // Min and Max
        System.out.println("Min: " + Collections.min(numbers));
        System.out.println("Max: " + Collections.max(numbers));
        
        // Frequency
        List<String> words = Arrays.asList("a", "b", "a", "c", "a");
        System.out.println("Frequency of 'a': " + Collections.frequency(words, "a"));
        
        // Fill
        Collections.fill(numbers, 0);
        System.out.println("After fill: " + numbers);
        
        // Copy
        List<Integer> dest = new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0));
        List<Integer> src = Arrays.asList(1, 2, 3, 4, 5);
        Collections.copy(dest, src);
        System.out.println("Copied: " + dest);
        
        // Swap
        Collections.swap(dest, 0, 4);
        System.out.println("After swap: " + dest);
    }
}
```

---

### 6. Comparable Interface

#### Natural Ordering
```java
import java.util.*;

class Student implements Comparable<Student> {
    String name;
    int marks;
    
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
    
    @Override
    public int compareTo(Student other) {
        // Sort by marks (ascending)
        return this.marks - other.marks;
    }
    
    @Override
    public String toString() {
        return name + "(" + marks + ")";
    }
}

public class ComparableDemo {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 85));
        students.add(new Student("Bob", 92));
        students.add(new Student("Charlie", 78));
        
        System.out.println("Before sorting: " + students);
        
        Collections.sort(students);
        
        System.out.println("After sorting: " + students);
    }
}
```

---

### 7. Comparator Interface

#### Custom Ordering
```java
import java.util.*;

class Employee {
    String name;
    int age;
    double salary;
    
    public Employee(String name, int age, double salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    
    @Override
    public String toString() {
        return name + "(" + age + ", $" + salary + ")";
    }
}

public class ComparatorDemo {
    public static void main(String[] args) {
        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee("Alice", 30, 50000));
        employees.add(new Employee("Bob", 25, 60000));
        employees.add(new Employee("Charlie", 35, 55000));
        
        System.out.println("Original: " + employees);
        
        // Sort by name
        Collections.sort(employees, new Comparator<Employee>() {
            public int compare(Employee e1, Employee e2) {
                return e1.name.compareTo(e2.name);
            }
        });
        System.out.println("Sorted by name: " + employees);
        
        // Sort by age (using lambda)
        Collections.sort(employees, (e1, e2) -> e1.age - e2.age);
        System.out.println("Sorted by age: " + employees);
        
        // Sort by salary (descending)
        Collections.sort(employees, (e1, e2) -> 
            Double.compare(e2.salary, e1.salary));
        System.out.println("Sorted by salary (desc): " + employees);
        
        // Using Comparator.comparing (Java 8+)
        employees.sort(Comparator.comparing(e -> e.name));
        System.out.println("Sorted by name (Java 8): " + employees);
    }
}
```

---

## 💻 Practice Exercises

### Exercise 1: Word Frequency Counter
```java
import java.util.*;

public class WordFrequency {
    public static Map<String, Integer> countWords(String text) {
        Map<String, Integer> frequency = new HashMap<>();
        String[] words = text.toLowerCase().split("\\s+");
        
        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }
        
        return frequency;
    }
    
    public static void main(String[] args) {
        String text = "hello world hello java world";
        Map<String, Integer> freq = countWords(text);
        System.out.println("Word frequency: " + freq);
    }
}
```

### Exercise 2: Student Grade Manager
```java
import java.util.*;

public class GradeManager {
    private Map<String, List<Integer>> studentGrades;
    
    public GradeManager() {
        studentGrades = new HashMap<>();
    }
    
    public void addGrade(String student, int grade) {
        studentGrades.putIfAbsent(student, new ArrayList<>());
        studentGrades.get(student).add(grade);
    }
    
    public double getAverage(String student) {
        List<Integer> grades = studentGrades.get(student);
        if (grades == null || grades.isEmpty()) return 0;
        return grades.stream().mapToInt(Integer::intValue).average().orElse(0);
    }
    
    public void displayAll() {
        for (Map.Entry<String, List<Integer>> entry : studentGrades.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue() + 
                             " (Avg: " + getAverage(entry.getKey()) + ")");
        }
    }
    
    public static void main(String[] args) {
        GradeManager gm = new GradeManager();
        gm.addGrade("Alice", 85);
        gm.addGrade("Alice", 90);
        gm.addGrade("Bob", 78);
        gm.addGrade("Bob", 82);
        gm.displayAll();
    }
}
```

---

## 🎓 Key Takeaways

1. **HashMap**: Fast, no order, allows one null key
2. **LinkedHashMap**: Maintains insertion order
3. **TreeMap**: Sorted by keys
4. **Hashtable**: Thread-safe, no nulls (legacy)
5. **Collections class**: Utility methods for sorting, searching
6. **Comparable**: Natural ordering (one way)
7. **Comparator**: Custom ordering (multiple ways)

---

## 📝 Summary

Today you learned:
- ✅ Map interface and implementations
- ✅ HashMap, LinkedHashMap, TreeMap operations
- ✅ Collections utility class methods
- ✅ Sorting with Comparable and Comparator
- ✅ Choosing the right Map implementation

---

## 🔗 What's Next?

Tomorrow (Day 21), we'll learn about:
- Generics in Java
- Generic classes and methods
- Bounded type parameters
- Wildcards
- Type erasure

---

## 📚 Additional Resources

- [Oracle Map Tutorial](https://docs.oracle.com/javase/tutorial/collections/interfaces/map.html)
- [Comparable vs Comparator](https://www.baeldung.com/java-comparator-comparable)