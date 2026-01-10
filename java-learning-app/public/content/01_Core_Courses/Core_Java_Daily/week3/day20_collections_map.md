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

## 💻 Practical Exercises

### Exercise 1: Word Frequency Counter with Sorting

**📝 Problem Statement:**
Create a word frequency counter that analyzes text input and counts word occurrences using HashMap for O(1) lookups, demonstrates getOrDefault() for clean counting logic, sorts results by frequency (highest first) using custom Comparator, handles case-insensitive counting, filters out common stop words, and displays results in multiple sorted orders (by frequency, alphabetically). The system should showcase practical HashMap usage patterns including iteration with entrySet(), value-based sorting despite HashMap being unordered, and the difference between HashMap (fast unsorted) vs TreeMap (sorted by keys).

**Requirements:**
- Create WordFrequencyCounter class using HashMap<String, Integer> for word counts
- Implement countWords(String text) method:
  - Convert text to lowercase for case-insensitive counting
  - Split text by whitespace using split("\\s+")
  - Use getOrDefault(word, 0) + 1 pattern for clean counting
  - Filter out stop words (the, a, an, is, are, was, were, in, on, at)
- Add getSortedByFrequency() returning List<Map.Entry<String, Integer>>:
  - Convert entrySet() to List for sorting
  - Sort by value (frequency) descending using Comparator.comparing()
  - Use Map.Entry.comparingByValue() with reversed()
- Implement getSortedAlphabetically() using TreeMap:
  - Create new TreeMap from HashMap for automatic key sorting
  - Demonstrate difference: HashMap fast but unordered, TreeMap sorted but slower
- Add getTopN(int n) returning top N most frequent words
- Create getTotalWords() and getUniqueWords() statistics methods
- Demonstrate entrySet() iteration for displaying results
- Show forEach() lambda iteration as modern alternative
- Use computeIfAbsent() pattern if extending to nested structures
- Handle empty text and null input gracefully

**Sample Test Cases:**
```
Input: "Hello world hello Java world Java programming"
Expected Output:
=== Word Frequency Counter ===

Original Text: "Hello world hello Java world Java programming"

Processing:
→ Converting to lowercase
→ Splitting by whitespace
→ Filtering stop words
→ Counting occurrences

Word Frequencies (Unsorted HashMap):
{programming=1, world=2, java=2, hello=2}

Sorted by Frequency (Highest First):
1. world: 2 occurrences
2. java: 2 occurrences
3. hello: 2 occurrences
4. programming: 1 occurrence

Sorted Alphabetically (TreeMap):
1. hello: 2
2. java: 2
3. programming: 1
4. world: 2

Statistics:
Total words processed: 7
Unique words: 4
Most frequent word: world (2 occurrences)

Input: "The quick brown fox jumps over the lazy dog the"
Expected Output:
=== Word Frequency Counter ===

After filtering stop words (the, a, an, is, are, was, were, in, on, at):

Word Frequencies:
{quick=1, brown=1, fox=1, jumps=1, over=1, lazy=1, dog=1}

Top 3 Most Frequent:
1. quick: 1
2. brown: 1
3. fox: 1

All words appear with equal frequency (1 occurrence each)
```

**Solution:**
```java
import java.util.*;
import java.util.stream.Collectors;

public class WordFrequencyCounter {
    private Map<String, Integer> wordCounts;
    private Set<String> stopWords;
    
    public WordFrequencyCounter() {
        this.wordCounts = new HashMap<>();
        this.stopWords = new HashSet<>(Arrays.asList(
            "the", "a", "an", "is", "are", "was", "were", "in", "on", "at"
        ));
    }
    
    public void countWords(String text) {
        if (text == null || text.trim().isEmpty()) {
            System.out.println("Empty or null text provided");
            return;
        }
        
        // Convert to lowercase and split by whitespace
        String[] words = text.toLowerCase().split("\\s+");
        
        System.out.println("\nProcessing:");
        System.out.println("→ Converting to lowercase");
        System.out.println("→ Splitting by whitespace");
        System.out.println("→ Filtering stop words");
        System.out.println("→ Counting occurrences\n");
        
        for (String word : words) {
            // Remove punctuation
            word = word.replaceAll("[^a-z]", "");
            
            // Skip empty strings and stop words
            if (!word.isEmpty() && !stopWords.contains(word)) {
                // getOrDefault pattern for clean counting
                wordCounts.put(word, wordCounts.getOrDefault(word, 0) + 1);
            }
        }
    }
    
    public List<Map.Entry<String, Integer>> getSortedByFrequency() {
        // Convert entrySet to List for sorting
        List<Map.Entry<String, Integer>> entries = new ArrayList<>(wordCounts.entrySet());
        
        // Sort by value (frequency) descending
        Collections.sort(entries, Map.Entry.<String, Integer>comparingByValue().reversed());
        
        return entries;
    }
    
    public Map<String, Integer> getSortedAlphabetically() {
        // TreeMap automatically sorts by keys
        return new TreeMap<>(wordCounts);
    }
    
    public List<Map.Entry<String, Integer>> getTopN(int n) {
        List<Map.Entry<String, Integer>> sorted = getSortedByFrequency();
        return sorted.subList(0, Math.min(n, sorted.size()));
    }
    
    public int getTotalWords() {
        return wordCounts.values().stream().mapToInt(Integer::intValue).sum();
    }
    
    public int getUniqueWords() {
        return wordCounts.size();
    }
    
    public String getMostFrequentWord() {
        if (wordCounts.isEmpty()) return "N/A";
        
        return Collections.max(wordCounts.entrySet(),
            Map.Entry.comparingByValue()).getKey();
    }
    
    public void displayResults() {
        System.out.println("Word Frequencies (Unsorted HashMap):");
        System.out.println(wordCounts);
        
        System.out.println("\nSorted by Frequency (Highest First):");
        List<Map.Entry<String, Integer>> byFrequency = getSortedByFrequency();
        int index = 1;
        for (Map.Entry<String, Integer> entry : byFrequency) {
            String plural = entry.getValue() == 1 ? "occurrence" : "occurrences";
            System.out.println(index++ + ". " + entry.getKey() + ": " +
                entry.getValue() + " " + plural);
        }
        
        System.out.println("\nSorted Alphabetically (TreeMap):");
        Map<String, Integer> alphabetical = getSortedAlphabetically();
        index = 1;
        for (Map.Entry<String, Integer> entry : alphabetical.entrySet()) {
            System.out.println(index++ + ". " + entry.getKey() + ": " + entry.getValue());
        }
        
        System.out.println("\nStatistics:");
        System.out.println("Total words processed: " + getTotalWords());
        System.out.println("Unique words: " + getUniqueWords());
        System.out.println("Most frequent word: " + getMostFrequentWord() +
            " (" + wordCounts.get(getMostFrequentWord()) + " occurrences)");
    }
    
    public static void main(String[] args) {
        System.out.println("=== Word Frequency Counter ===\n");
        
        String text = "Hello world hello Java world Java programming";
        System.out.println("Original Text: \"" + text + "\"");
        
        WordFrequencyCounter counter = new WordFrequencyCounter();
        counter.countWords(text);
        counter.displayResults();
        
        // Test with stop words
        System.out.println("\n\n=== Test with Stop Words ===\n");
        String text2 = "The quick brown fox jumps over the lazy dog the";
        System.out.println("Original Text: \"" + text2 + "\"");
        System.out.println("After filtering stop words (the, a, an, is, are, was, were, in, on, at):\n");
        
        WordFrequencyCounter counter2 = new WordFrequencyCounter();
        counter2.countWords(text2);
        
        System.out.println("Word Frequencies:");
        System.out.println(counter2.wordCounts);
        
        System.out.println("\nTop 3 Most Frequent:");
        List<Map.Entry<String, Integer>> top3 = counter2.getTopN(3);
        int idx = 1;
        for (Map.Entry<String, Integer> entry : top3) {
            System.out.println(idx++ + ". " + entry.getKey() + ": " + entry.getValue());
        }
    }
}
```

**💡 Tips:**
- HashMap.getOrDefault(key, 0) cleaner than manual null checking for counting patterns
- entrySet() iteration more efficient than keySet() + get() when needing both keys and values
- HashMap provides O(1) average case for put/get operations - fastest for unsorted data
- TreeMap provides O(log n) operations but maintains sorted order by keys automatically
- Sorting HashMap by values requires converting entrySet() to List then using Comparator
- Map.Entry.comparingByValue() creates Comparator for sorting by map values
- reversed() method inverts Comparator for descending order (highest frequency first)
- Stop words filtering demonstrates practical text processing with Set.contains() O(1) lookup
- Collections.max() with custom Comparator finds entry with highest value efficiently
- Stream API alternative: wordCounts.entrySet().stream().sorted(...).collect(...)
- computeIfAbsent() useful for nested maps: Map<String, List<String>> word to sentences
- forEach() lambda: wordCounts.forEach((k, v) -> System.out.println(k + ": " + v))

---

### Exercise 2: Student Grade Manager with Statistics

**📝 Problem Statement:**
Create a comprehensive student grade management system demonstrating HashMap with nested collections (Map<String, List<Integer>>), computeIfAbsent() for clean nested collection initialization, statistical calculations (average, min, max, median), sorting students by performance using custom Comparators, filtering students by grade thresholds, and practical usage of Collections utility methods. The system should showcase how HashMap enables O(1) student lookup while maintaining lists of grades per student, demonstrate the difference between putIfAbsent() vs computeIfAbsent(), and show how to sort and analyze data stored in nested HashMap structures.

**Requirements:**
- Create GradeManager class using HashMap<String, List<Integer>> for student grades
- Implement addGrade(String student, int grade) method:
  - Use computeIfAbsent(student, k -> new ArrayList<>()) for clean initialization
  - Validate grade range (0-100)
  - Add grade to student's list
- Create getAverage(String student) calculating mean grade:
  - Handle null/empty grade lists
  - Use stream().mapToInt().average() or manual calculation
  - Return 0.0 for students with no grades
- Implement getHighestGrade(String student) and getLowestGrade(String student)
- Add getMedian(String student) calculating middle value:
  - Sort grades copy to avoid modifying original
  - Handle even/odd list sizes for median calculation
- Create getStudentsSortedByAverage() returning List<Map.Entry<String, Double>>:
  - Calculate averages for all students
  - Sort by average descending using Comparator
- Implement getTopPerformers(int n) returning top N students by average
- Add getStudentsAboveThreshold(double threshold) filtering by minimum average
- Create displayStudentReport(String student) showing all statistics
- Implement displayAllStudents() with formatted output
- Use Collections.max/min for finding extremes
- Demonstrate entrySet() iteration patterns
- Show difference between putIfAbsent() and computeIfAbsent()

**Sample Test Cases:**
```
Input: Add grades for multiple students
Expected Output:
=== Student Grade Manager ===

Adding Grades:
✓ Added grade 85 for Alice
✓ Added grade 90 for Alice
✓ Added grade 78 for Bob
✓ Added grade 82 for Bob
✓ Added grade 88 for Bob
✓ Added grade 95 for Charlie
✓ Added grade 92 for Charlie

Total students: 3

Input: Get student report for Alice
Expected Output:
=== Student Report: Alice ===

Grades: [85, 90]
Number of grades: 2

Statistics:
  Average: 87.5
  Highest: 90
  Lowest: 85
  Median: 87.5
  Grade Range: 5 points

Performance: Above Average (87.5 >= 80.0)

Input: Get all students sorted by average
Expected Output:
=== Students Sorted by Average ===

1. Charlie - Average: 93.5 ⭐⭐⭐⭐⭐ (Excellent)
   Grades: [95, 92]
   
2. Bob - Average: 82.67 ⭐⭐⭐⭐ (Good)
   Grades: [78, 82, 88]
   
3. Alice - Average: 87.5 ⭐⭐⭐⭐ (Good)
   Grades: [85, 90]

Input: Get top 2 performers
Expected Output:
=== Top 2 Performers ===

🥇 1st Place: Charlie (93.5 average)
🥈 2nd Place: Alice (87.5 average)

Input: Get students above 85.0 threshold
Expected Output:
=== Students Above 85.0 Threshold ===

Qualified Students: 2

1. Charlie: 93.5 average
   → Exceeds threshold by 8.5 points
   
2. Alice: 87.5 average
   → Exceeds threshold by 2.5 points
```

**Solution:**
```java
import java.util.*;
import java.util.stream.Collectors;

public class GradeManager {
    private Map<String, List<Integer>> studentGrades;
    
    public GradeManager() {
        this.studentGrades = new HashMap<>();
    }
    
    public boolean addGrade(String student, int grade) {
        // Validate grade range
        if (grade < 0 || grade > 100) {
            System.out.println("✗ Invalid grade: " + grade + " (must be 0-100)");
            return false;
        }
        
        // computeIfAbsent: creates ArrayList only if key absent
        studentGrades.computeIfAbsent(student, k -> new ArrayList<>()).add(grade);
        
        System.out.println("✓ Added grade " + grade + " for " + student);
        return true;
    }
    
    public double getAverage(String student) {
        List<Integer> grades = studentGrades.get(student);
        if (grades == null || grades.isEmpty()) {
            return 0.0;
        }
        
        // Calculate average
        return grades.stream()
                    .mapToInt(Integer::intValue)
                    .average()
                    .orElse(0.0);
    }
    
    public int getHighestGrade(String student) {
        List<Integer> grades = studentGrades.get(student);
        if (grades == null || grades.isEmpty()) {
            return 0;
        }
        return Collections.max(grades);
    }
    
    public int getLowestGrade(String student) {
        List<Integer> grades = studentGrades.get(student);
        if (grades == null || grades.isEmpty()) {
            return 0;
        }
        return Collections.min(grades);
    }
    
    public double getMedian(String student) {
        List<Integer> grades = studentGrades.get(student);
        if (grades == null || grades.isEmpty()) {
            return 0.0;
        }
        
        // Create sorted copy to avoid modifying original
        List<Integer> sorted = new ArrayList<>(grades);
        Collections.sort(sorted);
        
        int size = sorted.size();
        if (size % 2 == 0) {
            // Even: average of two middle values
            return (sorted.get(size/2 - 1) + sorted.get(size/2)) / 2.0;
        } else {
            // Odd: middle value
            return sorted.get(size/2);
        }
    }
    
    public List<Map.Entry<String, Double>> getStudentsSortedByAverage() {
        // Calculate averages for all students
        Map<String, Double> averages = new HashMap<>();
        for (String student : studentGrades.keySet()) {
            averages.put(student, getAverage(student));
        }
        
        // Convert to list and sort by average descending
        List<Map.Entry<String, Double>> sorted = new ArrayList<>(averages.entrySet());
        Collections.sort(sorted, Map.Entry.<String, Double>comparingByValue().reversed());
        
        return sorted;
    }
    
    public List<Map.Entry<String, Double>> getTopPerformers(int n) {
        List<Map.Entry<String, Double>> sorted = getStudentsSortedByAverage();
        return sorted.subList(0, Math.min(n, sorted.size()));
    }
    
    public List<String> getStudentsAboveThreshold(double threshold) {
        List<String> qualified = new ArrayList<>();
        
        for (String student : studentGrades.keySet()) {
            if (getAverage(student) >= threshold) {
                qualified.add(student);
            }
        }
        
        // Sort by average descending
        qualified.sort((s1, s2) -> Double.compare(getAverage(s2), getAverage(s1)));
        
        return qualified;
    }
    
    public void displayStudentReport(String student) {
        List<Integer> grades = studentGrades.get(student);
        if (grades == null || grades.isEmpty()) {
            System.out.println("No grades found for " + student);
            return;
        }
        
        System.out.println("\n=== Student Report: " + student + " ===\n");
        System.out.println("Grades: " + grades);
        System.out.println("Number of grades: " + grades.size());
        
        double avg = getAverage(student);
        int highest = getHighestGrade(student);
        int lowest = getLowestGrade(student);
        double median = getMedian(student);
        
        System.out.println("\nStatistics:");
        System.out.println("  Average: " + String.format("%.2f", avg));
        System.out.println("  Highest: " + highest);
        System.out.println("  Lowest: " + lowest);
        System.out.println("  Median: " + String.format("%.2f", median));
        System.out.println("  Grade Range: " + (highest - lowest) + " points");
        
        String performance = avg >= 90 ? "Excellent" : avg >= 80 ? "Above Average" :
                           avg >= 70 ? "Average" : "Below Average";
        System.out.println("\nPerformance: " + performance +
            " (" + String.format("%.2f", avg) + " >= 80.0)");
    }
    
    public void displayAllStudents() {
        System.out.println("\n=== Students Sorted by Average ===\n");
        
        List<Map.Entry<String, Double>> sorted = getStudentsSortedByAverage();
        int index = 1;
        
        for (Map.Entry<String, Double> entry : sorted) {
            String student = entry.getKey();
            double avg = entry.getValue();
            
            String stars = avg >= 90 ? "⭐⭐⭐⭐⭐" : avg >= 80 ? "⭐⭐⭐⭐" :
                          avg >= 70 ? "⭐⭐⭐" : "⭐⭐";
            String level = avg >= 90 ? "Excellent" : avg >= 80 ? "Good" :
                          avg >= 70 ? "Average" : "Needs Improvement";
            
            System.out.println(index++ + ". " + student + " - Average: " +
                String.format("%.2f", avg) + " " + stars + " (" + level + ")");
            System.out.println("   Grades: " + studentGrades.get(student));
            System.out.println();
        }
    }
    
    public int getStudentCount() {
        return studentGrades.size();
    }
    
    public static void main(String[] args) {
        System.out.println("=== Student Grade Manager ===\n");
        
        GradeManager manager = new GradeManager();
        
        // Add grades
        System.out.println("Adding Grades:");
        manager.addGrade("Alice", 85);
        manager.addGrade("Alice", 90);
        manager.addGrade("Bob", 78);
        manager.addGrade("Bob", 82);
        manager.addGrade("Bob", 88);
        manager.addGrade("Charlie", 95);
        manager.addGrade("Charlie", 92);
        
        System.out.println("\nTotal students: " + manager.getStudentCount());
        
        // Display individual report
        manager.displayStudentReport("Alice");
        
        // Display all students
        manager.displayAllStudents();
        
        // Top performers
        System.out.println("=== Top 2 Performers ===\n");
        List<Map.Entry<String, Double>> top2 = manager.getTopPerformers(2);
        String[] medals = {"🥇 1st Place", "🥈 2nd Place"};
        for (int i = 0; i < top2.size(); i++) {
            Map.Entry<String, Double> entry = top2.get(i);
            System.out.println(medals[i] + ": " + entry.getKey() +
                " (" + String.format("%.2f", entry.getValue()) + " average)");
        }
        
        // Students above threshold
        System.out.println("\n=== Students Above 85.0 Threshold ===\n");
        List<String> qualified = manager.getStudentsAboveThreshold(85.0);
        System.out.println("Qualified Students: " + qualified.size() + "\n");
        
        int idx = 1;
        for (String student : qualified) {
            double avg = manager.getAverage(student);
            System.out.println(idx++ + ". " + student + ": " +
                String.format("%.2f", avg) + " average");
            System.out.println("   → Exceeds threshold by " +
                String.format("%.2f", avg - 85.0) + " points\n");
        }
    }
}
```

**💡 Tips:**
- computeIfAbsent() cleaner than manual null checking: creates value only if key absent
- putIfAbsent() returns existing value if present; computeIfAbsent() computes new value via lambda
- HashMap<String, List<Integer>> demonstrates nested collections - common pattern for grouping data
- Stream API average(): mapToInt(Integer::intValue).average().orElse(0.0) handles empty lists
- Collections.max/min work directly on List<Integer> using natural ordering
- Median calculation requires sorted copy: new ArrayList<>(grades) prevents modifying original
- Map.Entry.comparingByValue() creates Comparator for sorting map entries by values
- reversed() inverts Comparator for descending order (highest averages first)
- entrySet() iteration efficient when needing both keys and values from map
- Sorting by calculated values: create temporary map of averages, sort entries, extract keys
- subList(0, n) returns view of first n elements - useful for "top N" queries
- Custom Comparator with lambda: (s1, s2) -> Double.compare(getAverage(s2), getAverage(s1))

---

### Exercise 3: Phone Directory with Multiple Search and Sorting Capabilities

**📝 Problem Statement:**
Create a comprehensive phone directory system demonstrating practical usage of HashMap, TreeMap, and LinkedHashMap for contact management with multiple search methods, sorting capabilities, and recent contact tracking. The system should support adding/removing contacts, searching by name or phone number, displaying contacts in various sorted orders (alphabetical, by phone number), tracking recently added contacts in insertion order, and implementing custom Comparator for advanced sorting options including reverse alphabetical and by contact type.

**Requirements:**
- Create Contact class with: name, phoneNumber, email, contactType (PERSONAL, WORK, EMERGENCY)
- Implement PhoneDirectory class using three maps simultaneously:
  - HashMap<String, Contact> for fast name-based lookup (O(1))
  - TreeMap<String, Contact> for alphabetically sorted directory listing
  - LinkedHashMap<String, Contact> for recently added contacts (max 10, maintains insertion order)
- Support operations: addContact, removeContact, getContact, updateContact
- Implement searchByName(String name) using HashMap for O(1) lookup
- Create searchByPhoneNumber(String phone) scanning through all contacts
- Add getContactsSortedByName() returning TreeMap view (alphabetical order)
- Implement getContactsSortedByPhone() using custom Comparator sorting by phone number
- Create getRecentContacts() returning last N contacts in insertion order from LinkedHashMap
- Add getContactsByType(ContactType type) filtering contacts by type
- Implement custom Comparator: sortByNameReverse, sortByEmailDomain, sortByType
- Demonstrate Comparable implementation for Contact natural ordering (by name)
- Use Collections.sort() with various Comparators for flexible sorting
- Show Collections utility methods: frequency, max/min contact
- Implement merge operation combining two directories

**Sample Test Cases:**
```
Input: Add contacts to directory
Expected Output:
=== Phone Directory System ===

Adding Contacts:
✓ Contact added: Alice Johnson
  Phone: 555-1234 | Email: alice@email.com | Type: PERSONAL

✓ Contact added: Bob Smith
  Phone: 555-5678 | Email: bob@work.com | Type: WORK

✓ Contact added: Charlie Brown
  Phone: 555-9012 | Email: charlie@email.com | Type: PERSONAL

✓ Contact added: David Wilson
  Phone: 555-3456 | Email: david@work.com | Type: WORK

✓ Contact added: Emergency Services
  Phone: 911 | Email: emergency@911.com | Type: EMERGENCY

Total contacts: 5

Input: Search by name
Expected Output:
=== Search by Name: "Alice Johnson" ===
Found: Alice Johnson
Phone: 555-1234
Email: alice@email.com
Type: PERSONAL
Search time: O(1) HashMap lookup

Input: Get contacts sorted alphabetically
Expected Output:
=== Contacts Sorted Alphabetically (TreeMap) ===
1. Alice Johnson - 555-1234 (PERSONAL)
2. Bob Smith - 555-5678 (WORK)
3. Charlie Brown - 555-9012 (PERSONAL)
4. David Wilson - 555-3456 (WORK)
5. Emergency Services - 911 (EMERGENCY)

Input: Get contacts sorted by phone number
Expected Output:
=== Contacts Sorted by Phone Number (Custom Comparator) ===
1. Emergency Services - 911 (EMERGENCY)
2. Alice Johnson - 555-1234 (PERSONAL)
3. David Wilson - 555-3456 (WORK)
4. Bob Smith - 555-5678 (WORK)
5. Charlie Brown - 555-9012 (PERSONAL)

Input: Get recently added contacts
Expected Output:
=== Recently Added Contacts (LinkedHashMap) ===
Showing last 5 contacts in insertion order:
1. Alice Johnson - 555-1234
2. Bob Smith - 555-5678
3. Charlie Brown - 555-9012
4. David Wilson - 555-3456
5. Emergency Services - 911

Input: Filter by contact type
Expected Output:
=== Contacts by Type: WORK ===
1. Bob Smith - 555-5678 (bob@work.com)
2. David Wilson - 555-3456 (david@work.com)

Found 2 WORK contacts

Input: Sort by email domain (Custom Comparator)
Expected Output:
=== Sorted by Email Domain ===
1. Emergency Services - emergency@911.com (911.com domain)
2. Alice Johnson - alice@email.com (email.com domain)
3. Charlie Brown - charlie@email.com (email.com domain)
4. Bob Smith - bob@work.com (work.com domain)
5. David Wilson - david@work.com (work.com domain)
```

**Solution:**
```java
import java.util.*;
import java.util.stream.Collectors;

// ============= Contact Class with Comparable =============

enum ContactType {
    PERSONAL, WORK, EMERGENCY
}

class Contact implements Comparable<Contact> {
    private String name;
    private String phoneNumber;
    private String email;
    private ContactType type;

    public Contact(String name, String phoneNumber, String email, ContactType type) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.type = type;
    }

    public String getName() { return name; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getEmail() { return email; }
    public ContactType getType() { return type; }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setEmail(String email) { this.email = email; }
    public void setType(ContactType type) { this.type = type; }

    // Natural ordering: by name (alphabetical)
    @Override
    public int compareTo(Contact other) {
        return this.name.compareTo(other.name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contact contact = (Contact) o;
        return Objects.equals(name, contact.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return String.format("%s - %s (%s)", name, phoneNumber, type);
    }

    public String getEmailDomain() {
        return email.substring(email.indexOf("@") + 1);
    }
}

// ============= Phone Directory =============

class PhoneDirectory {
    private HashMap<String, Contact> contactMap;  // Fast O(1) lookup by name
    private TreeMap<String, Contact> sortedContacts;  // Auto-sorted by name
    private LinkedHashMap<String, Contact> recentContacts;  // Recent additions
    private static final int MAX_RECENT = 10;

    public PhoneDirectory() {
        this.contactMap = new HashMap<>();
        this.sortedContacts = new TreeMap<>();  // Natural ordering by key
        this.recentContacts = new LinkedHashMap<String, Contact>(MAX_RECENT, 0.75f, false) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, Contact> eldest) {
                return size() > MAX_RECENT;  // Auto-remove oldest when exceeds limit
            }
        };
    }

    public boolean addContact(Contact contact) {
        if (contactMap.containsKey(contact.getName())) {
            System.out.println("✗ Contact already exists: " + contact.getName());
            return false;
        }

        contactMap.put(contact.getName(), contact);
        sortedContacts.put(contact.getName(), contact);
        recentContacts.put(contact.getName(), contact);

        System.out.println("✓ Contact added: " + contact.getName());
        System.out.println("  Phone: " + contact.getPhoneNumber() +
            " | Email: " + contact.getEmail() + " | Type: " + contact.getType());
        System.out.println();

        return true;
    }

    public boolean removeContact(String name) {
        Contact removed = contactMap.remove(name);
        if (removed != null) {
            sortedContacts.remove(name);
            recentContacts.remove(name);
            System.out.println("✓ Contact removed: " + name);
            return true;
        }
        return false;
    }

    public Contact getContact(String name) {
        return contactMap.get(name);  // O(1) HashMap lookup
    }

    public Contact searchByPhoneNumber(String phone) {
        for (Contact contact : contactMap.values()) {
            if (contact.getPhoneNumber().equals(phone)) {
                return contact;
            }
        }
        return null;
    }

    // TreeMap automatically maintains sorted order
    public Map<String, Contact> getContactsSortedByName() {
        return new TreeMap<>(sortedContacts);
    }

    // Custom Comparator: sort by phone number
    public List<Contact> getContactsSortedByPhone() {
        List<Contact> contacts = new ArrayList<>(contactMap.values());
        Collections.sort(contacts, new Comparator<Contact>() {
            @Override
            public int compare(Contact c1, Contact c2) {
                return c1.getPhoneNumber().compareTo(c2.getPhoneNumber());
            }
        });
        return contacts;
    }

    // Recent contacts in insertion order
    public Map<String, Contact> getRecentContacts() {
        return new LinkedHashMap<>(recentContacts);
    }

    // Filter by contact type
    public List<Contact> getContactsByType(ContactType type) {
        List<Contact> filtered = new ArrayList<>();
        for (Contact contact : contactMap.values()) {
            if (contact.getType() == type) {
                filtered.add(contact);
            }
        }
        return filtered;
    }

    // Custom Comparator: reverse alphabetical
    public List<Contact> getContactsSortedReverse() {
        List<Contact> contacts = new ArrayList<>(contactMap.values());
        Collections.sort(contacts, Collections.reverseOrder());  // Uses Comparable
        return contacts;
    }

    // Custom Comparator: sort by email domain
    public List<Contact> getContactsSortedByEmailDomain() {
        List<Contact> contacts = new ArrayList<>(contactMap.values());
        Collections.sort(contacts, Comparator.comparing(Contact::getEmailDomain)
                                             .thenComparing(Contact::getName));
        return contacts;
    }

    // Custom Comparator: sort by type, then name
    public List<Contact> getContactsSortedByType() {
        List<Contact> contacts = new ArrayList<>(contactMap.values());
        Collections.sort(contacts, Comparator.comparing(Contact::getType)
                                             .thenComparing(Contact::getName));
        return contacts;
    }

    public int getContactCount() {
        return contactMap.size();
    }

    public void displayAllSorted() {
        System.out.println("\n=== All Contacts (Alphabetically) ===");
        int index = 1;
        for (Contact contact : sortedContacts.values()) {
            System.out.println(index++ + ". " + contact);
        }
    }

    // Collections utility methods
    public Contact getMostCommonType() {
        if (contactMap.isEmpty()) return null;

        Map<ContactType, Integer> typeCounts = new HashMap<>();
        for (Contact contact : contactMap.values()) {
            typeCounts.put(contact.getType(),
                typeCounts.getOrDefault(contact.getType(), 0) + 1);
        }

        ContactType mostCommon = Collections.max(typeCounts.entrySet(),
            Map.Entry.comparingByValue()).getKey();

        return contactMap.values().stream()
            .filter(c -> c.getType() == mostCommon)
            .findFirst().orElse(null);
    }
}

// ============= Demo Application =============

public class TestPhoneDirectory {
    public static void main(String[] args) {
        System.out.println("=== Phone Directory System ===\n");

        PhoneDirectory directory = new PhoneDirectory();

        // Add contacts
        System.out.println("Adding Contacts:");
        directory.addContact(new Contact("Alice Johnson", "555-1234", "alice@email.com", ContactType.PERSONAL));
        directory.addContact(new Contact("Bob Smith", "555-5678", "bob@work.com", ContactType.WORK));
        directory.addContact(new Contact("Charlie Brown", "555-9012", "charlie@email.com", ContactType.PERSONAL));
        directory.addContact(new Contact("David Wilson", "555-3456", "david@work.com", ContactType.WORK));
        directory.addContact(new Contact("Emergency Services", "911", "emergency@911.com", ContactType.EMERGENCY));

        System.out.println("Total contacts: " + directory.getContactCount());

        // Search by name (HashMap - O(1))
        System.out.println("\n=== Search by Name: \"Alice Johnson\" ===");
        Contact alice = directory.getContact("Alice Johnson");
        if (alice != null) {
            System.out.println("Found: " + alice.getName());
            System.out.println("Phone: " + alice.getPhoneNumber());
            System.out.println("Email: " + alice.getEmail());
            System.out.println("Type: " + alice.getType());
            System.out.println("Search time: O(1) HashMap lookup");
        }

        // Get sorted by name (TreeMap)
        System.out.println("\n=== Contacts Sorted Alphabetically (TreeMap) ===");
        Map<String, Contact> sorted = directory.getContactsSortedByName();
        int index = 1;
        for (Contact contact : sorted.values()) {
            System.out.println(index++ + ". " + contact);
        }

        // Get sorted by phone (Custom Comparator)
        System.out.println("\n=== Contacts Sorted by Phone Number (Custom Comparator) ===");
        List<Contact> byPhone = directory.getContactsSortedByPhone();
        index = 1;
        for (Contact contact : byPhone) {
            System.out.println(index++ + ". " + contact);
        }

        // Recent contacts (LinkedHashMap)
        System.out.println("\n=== Recently Added Contacts (LinkedHashMap) ===");
        Map<String, Contact> recent = directory.getRecentContacts();
        System.out.println("Showing last " + recent.size() + " contacts in insertion order:");
        index = 1;
        for (Contact contact : recent.values()) {
            System.out.println(index++ + ". " + contact.getName() + " - " + contact.getPhoneNumber());
        }

        // Filter by type
        System.out.println("\n=== Contacts by Type: WORK ===");
        List<Contact> workContacts = directory.getContactsByType(ContactType.WORK);
        index = 1;
        for (Contact contact : workContacts) {
            System.out.println(index++ + ". " + contact.getName() + " - " +
                contact.getPhoneNumber() + " (" + contact.getEmail() + ")");
        }
        System.out.println("\nFound " + workContacts.size() + " WORK contacts");

        // Sort by email domain
        System.out.println("\n=== Sorted by Email Domain ===");
        List<Contact> byDomain = directory.getContactsSortedByEmailDomain();
        index = 1;
        for (Contact contact : byDomain) {
            System.out.println(index++ + ". " + contact.getName() + " - " +
                contact.getEmail() + " (" + contact.getEmailDomain() + " domain)");
        }
    }
}
```

**💡 Tips:**
- HashMap for O(1) lookups: fastest for name-based searches, no ordering guarantees
- TreeMap auto-sorts: maintains sorted order by keys automatically, O(log n) operations
- LinkedHashMap tracks insertion order: useful for "recently added" features, combines HashMap speed with ordering
- Custom Comparator flexibility: same data sorted multiple ways without modifying original
- Comparable vs Comparator: Comparable for natural ordering, Comparator for multiple sorting strategies
- Collections.sort() works with Comparator: enables flexible sorting without modifying collection type
- TreeMap uses key natural order: stores by key's Comparable implementation (String alphabetical here)
- LinkedHashMap removeEldestEntry(): override for automatic size limiting (LRU cache pattern)
- Comparator.comparing() chaining: thenComparing() for secondary sort criteria
- Collections.max/min: works with custom Comparators for finding extremes
- Stream API integration: modern alternative to Collections utility methods
- Map.Entry.comparingByValue(): useful for sorting maps by values instead of keys
- Defensive copying: return new TreeMap/LinkedHashMap preventing external modification

---

### Exercise 4: Library Book Management with Comparable and Comparator

**📝 Problem Statement:**
Create a library book management system demonstrating comprehensive usage of Comparable, multiple Comparators, Collections utility methods, and different Map implementations for managing books with multiple sorting and search criteria. The system should support natural ordering by ISBN, custom sorting by title/author/year/rating, maintaining different views of the same data (HashMap for lookups, TreeMap for sorted views), and advanced Collections operations including binary search, finding min/max, frequency counting, and book recommendation algorithms based on ratings.

**Requirements:**
- Create Book class implementing Comparable<Book> with: isbn, title, author, publicationYear, rating (1-5), genre
- Natural ordering: books sorted by ISBN (Comparable implementation)
- Implement multiple Comparators:
  - sortByTitle: alphabetical by title
  - sortByAuthor: alphabetical by author, then by title for same author
  - sortByYear: chronological order, newest first
  - sortByRating: highest rating first, then by title
  - sortByGenre: grouped by genre, then by rating within genre
- Create LibrarySystem using HashMap<String, Book> for ISBN-based O(1) lookup
- Add getBooksSortedByISBN() returning TreeMap using natural ordering
- Implement searchBook(String isbn), findBooksByAuthor(String author), findBooksByGenre(String genre)
- Use Collections.binarySearch() on sorted lists for efficient searching
- Apply Collections.sort() with different Comparators for various views
- Implement getTopRatedBooks(int n) using Collections.sort with rating comparator
- Create getBooksByDecade() grouping books by publication decade
- Use Collections.max/min with Comparators to find highest/lowest rated, oldest/newest books
- Demonstrate Collections.frequency() for most popular genre
- Implement recommendBooks() suggesting books based on rating threshold and genre
- Show Comparator.thenComparing() for multi-level sorting

**Sample Test Cases:**
```
Input: Add books to library
Expected Output:
=== Library Management System ===

Adding Books:
✓ Book added: [ISBN-001] The Great Gatsby
  Author: F. Scott Fitzgerald | Year: 1925 | Rating: 4.5 | Genre: FICTION

✓ Book added: [ISBN-002] To Kill a Mockingbird
  Author: Harper Lee | Year: 1960 | Rating: 4.8 | Genre: FICTION

✓ Book added: [ISBN-003] 1984
  Author: George Orwell | Year: 1949 | Rating: 4.7 | Genre: FICTION

✓ Book added: [ISBN-004] Clean Code
  Author: Robert Martin | Year: 2008 | Rating: 4.6 | Genre: TECHNOLOGY

✓ Book added: [ISBN-005] Sapiens
  Author: Yuval Noah Harari | Year: 2011 | Rating: 4.5 | Genre: HISTORY

Total books: 5

Input: Get books in natural order (by ISBN)
Expected Output:
=== Books Sorted by ISBN (Natural Order - Comparable) ===
1. [ISBN-001] The Great Gatsby by F. Scott Fitzgerald (1925) - Rating: 4.5
2. [ISBN-002] To Kill a Mockingbird by Harper Lee (1960) - Rating: 4.8
3. [ISBN-003] 1984 by George Orwell (1949) - Rating: 4.7
4. [ISBN-004] Clean Code by Robert Martin (2008) - Rating: 4.6
5. [ISBN-005] Sapiens by Yuval Noah Harari (2011) - Rating: 4.5

Input: Sort by rating (highest first)
Expected Output:
=== Books Sorted by Rating (Comparator) ===
1. To Kill a Mockingbird - Rating: 4.8 ⭐⭐⭐⭐⭐
2. 1984 - Rating: 4.7 ⭐⭐⭐⭐⭐
3. Clean Code - Rating: 4.6 ⭐⭐⭐⭐⭐
4. The Great Gatsby - Rating: 4.5 ⭐⭐⭐⭐
5. Sapiens - Rating: 4.5 ⭐⭐⭐⭐

Input: Sort by author (alphabetical)
Expected Output:
=== Books Sorted by Author (Comparator) ===
1. 1984 by George Orwell
2. To Kill a Mockingbird by Harper Lee
3. Clean Code by Robert Martin
4. The Great Gatsby by F. Scott Fitzgerald
5. Sapiens by Yuval Noah Harari

Input: Sort by publication year (newest first)
Expected Output:
=== Books Sorted by Year (Comparator - Descending) ===
1. Sapiens (2011)
2. Clean Code (2008)
3. To Kill a Mockingbird (1960)
4. 1984 (1949)
5. The Great Gatsby (1925)

Input: Find highest and lowest rated books
Expected Output:
=== Book Statistics (Collections.max/min) ===

Highest Rated Book:
  To Kill a Mockingbird by Harper Lee
  Rating: 4.8 ⭐⭐⭐⭐⭐
  Found using: Collections.max() with Rating Comparator

Lowest Rated Book:
  The Great Gatsby by F. Scott Fitzgerald
  Rating: 4.5 ⭐⭐⭐⭐
  Found using: Collections.min() with Rating Comparator

Oldest Book:
  The Great Gatsby (1925)

Newest Book:
  Sapiens (2011)

Input: Binary search for specific book
Expected Output:
=== Binary Search Demo ===
Searching for "1984" in sorted list...

List sorted by title first:
[1984, Clean Code, Sapiens, The Great Gatsby, To Kill a Mockingbird]

Creating search key: 1984 by (unknown)

Binary search result: Found at index 0
Book: 1984 by George Orwell (1949) - Rating: 4.7

Note: List must be sorted by same criteria as Comparator for binary search to work

Input: Get top 3 rated books
Expected Output:
=== Top 3 Rated Books ===
1. To Kill a Mockingbird - 4.8 ⭐⭐⭐⭐⭐
2. 1984 - 4.7 ⭐⭐⭐⭐⭐
3. Clean Code - 4.6 ⭐⭐⭐⭐⭐

Input: Group books by genre
Expected Output:
=== Books by Genre ===

FICTION: 3 books
  - To Kill a Mockingbird (4.8)
  - 1984 (4.7)
  - The Great Gatsby (4.5)

HISTORY: 1 book
  - Sapiens (4.5)

TECHNOLOGY: 1 book
  - Clean Code (4.6)

Most popular genre: FICTION (3 books)
Found using Collections.frequency()
```

**Solution:**
```java
import java.util.*;

// ============= Book Class with Comparable =============

enum Genre {
    FICTION, TECHNOLOGY, HISTORY, SCIENCE, BIOGRAPHY
}

class Book implements Comparable<Book> {
    private String isbn;
    private String title;
    private String author;
    private int publicationYear;
    private double rating;
    private Genre genre;

    public Book(String isbn, String title, String author, int publicationYear,
                double rating, Genre genre) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.rating = rating;
        this.genre = genre;
    }

    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public int getPublicationYear() { return publicationYear; }
    public double getRating() { return rating; }
    public Genre getGenre() { return genre; }

    // Natural ordering: by ISBN
    @Override
    public int compareTo(Book other) {
        return this.isbn.compareTo(other.isbn);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return Objects.equals(isbn, book.isbn);
    }

    @Override
    public int hashCode() {
        return Objects.hash(isbn);
    }

    @Override
    public String toString() {
        return String.format("[%s] %s by %s (%d) - Rating: %.1f",
            isbn, title, author, publicationYear, rating);
    }

    public String getRatingStars() {
        int stars = (int) Math.round(rating);
        return "⭐".repeat(stars);
    }
}

// ============= Custom Comparators =============

class BookComparators {
    // Sort by title (alphabetical)
    public static final Comparator<Book> BY_TITLE = Comparator.comparing(Book::getTitle);

    // Sort by author, then title
    public static final Comparator<Book> BY_AUTHOR =
        Comparator.comparing(Book::getAuthor).thenComparing(Book::getTitle);

    // Sort by year (newest first)
    public static final Comparator<Book> BY_YEAR =
        Comparator.comparing(Book::getPublicationYear).reversed();

    // Sort by rating (highest first), then by title
    public static final Comparator<Book> BY_RATING =
        Comparator.comparing(Book::getRating).reversed().thenComparing(Book::getTitle);

    // Sort by genre, then by rating within genre
    public static final Comparator<Book> BY_GENRE =
        Comparator.comparing(Book::getGenre).thenComparing(BY_RATING);
}

// ============= Library System =============

class LibrarySystem {
    private HashMap<String, Book> bookMap;  // Fast ISBN lookup

    public LibrarySystem() {
        this.bookMap = new HashMap<>();
    }

    public boolean addBook(Book book) {
        if (bookMap.containsKey(book.getIsbn())) {
            System.out.println("✗ Book already exists: " + book.getIsbn());
            return false;
        }

        bookMap.put(book.getIsbn(), book);
        System.out.println("✓ Book added: [" + book.getIsbn() + "] " + book.getTitle());
        System.out.println("  Author: " + book.getAuthor() +
            " | Year: " + book.getPublicationYear() +
            " | Rating: " + book.getRating() +
            " | Genre: " + book.getGenre());
        System.out.println();

        return true;
    }

    public Book searchBook(String isbn) {
        return bookMap.get(isbn);  // O(1) lookup
    }

    // TreeMap with natural ordering (by ISBN)
    public TreeMap<String, Book> getBooksSortedByISBN() {
        TreeMap<String, Book> sorted = new TreeMap<>();
        sorted.putAll(bookMap);
        return sorted;
    }

    public List<Book> getBooksSortedByTitle() {
        List<Book> books = new ArrayList<>(bookMap.values());
        Collections.sort(books, BookComparators.BY_TITLE);
        return books;
    }

    public List<Book> getBooksSortedByAuthor() {
        List<Book> books = new ArrayList<>(bookMap.values());
        Collections.sort(books, BookComparators.BY_AUTHOR);
        return books;
    }

    public List<Book> getBooksSortedByYear() {
        List<Book> books = new ArrayList<>(bookMap.values());
        Collections.sort(books, BookComparators.BY_YEAR);
        return books;
    }

    public List<Book> getBooksSortedByRating() {
        List<Book> books = new ArrayList<>(bookMap.values());
        Collections.sort(books, BookComparators.BY_RATING);
        return books;
    }

    public List<Book> findBooksByAuthor(String author) {
        List<Book> result = new ArrayList<>();
        for (Book book : bookMap.values()) {
            if (book.getAuthor().equalsIgnoreCase(author)) {
                result.add(book);
            }
        }
        Collections.sort(result, BookComparators.BY_YEAR);
        return result;
    }

    public List<Book> findBooksByGenre(Genre genre) {
        List<Book> result = new ArrayList<>();
        for (Book book : bookMap.values()) {
            if (book.getGenre() == genre) {
                result.add(book);
            }
        }
        Collections.sort(result, BookComparators.BY_RATING);
        return result;
    }

    // Collections utility methods
    public Book getHighestRatedBook() {
        if (bookMap.isEmpty()) return null;
        return Collections.max(bookMap.values(), BookComparators.BY_RATING);
    }

    public Book getLowestRatedBook() {
        if (bookMap.isEmpty()) return null;
        return Collections.min(bookMap.values(), BookComparators.BY_RATING);
    }

    public Book getOldestBook() {
        if (bookMap.isEmpty()) return null;
        return Collections.min(bookMap.values(), Comparator.comparing(Book::getPublicationYear));
    }

    public Book getNewestBook() {
        if (bookMap.isEmpty()) return null;
        return Collections.max(bookMap.values(), Comparator.comparing(Book::getPublicationYear));
    }

    public List<Book> getTopRatedBooks(int n) {
        List<Book> sorted = getBooksSortedByRating();
        return sorted.subList(0, Math.min(n, sorted.size()));
    }

    // Binary search demo (requires sorted list)
    public int binarySearchByTitle(String title) {
        List<Book> sorted = getBooksSortedByTitle();
        // Create dummy book for search
        Book searchKey = new Book("", title, "", 0, 0, Genre.FICTION);
        return Collections.binarySearch(sorted, searchKey, BookComparators.BY_TITLE);
    }

    // Group by genre
    public Map<Genre, List<Book>> getBooksByGenre() {
        Map<Genre, List<Book>> byGenre = new HashMap<>();

        for (Book book : bookMap.values()) {
            byGenre.computeIfAbsent(book.getGenre(), k -> new ArrayList<>()).add(book);
        }

        // Sort each genre's books by rating
        for (List<Book> books : byGenre.values()) {
            Collections.sort(books, BookComparators.BY_RATING);
        }

        return byGenre;
    }

    // Find most popular genre
    public Genre getMostPopularGenre() {
        if (bookMap.isEmpty()) return null;

        List<Genre> genres = new ArrayList<>();
        for (Book book : bookMap.values()) {
            genres.add(book.getGenre());
        }

        Genre mostPopular = null;
        int maxFrequency = 0;

        for (Genre genre : Genre.values()) {
            int frequency = Collections.frequency(genres, genre);
            if (frequency > maxFrequency) {
                maxFrequency = frequency;
                mostPopular = genre;
            }
        }

        return mostPopular;
    }

    public int getBookCount() {
        return bookMap.size();
    }
}

// ============= Demo Application =============

public class TestLibrarySystem {
    public static void main(String[] args) {
        System.out.println("=== Library Management System ===\n");

        LibrarySystem library = new LibrarySystem();

        // Add books
        System.out.println("Adding Books:");
        library.addBook(new Book("ISBN-001", "The Great Gatsby", "F. Scott Fitzgerald", 1925, 4.5, Genre.FICTION));
        library.addBook(new Book("ISBN-002", "To Kill a Mockingbird", "Harper Lee", 1960, 4.8, Genre.FICTION));
        library.addBook(new Book("ISBN-003", "1984", "George Orwell", 1949, 4.7, Genre.FICTION));
        library.addBook(new Book("ISBN-004", "Clean Code", "Robert Martin", 2008, 4.6, Genre.TECHNOLOGY));
        library.addBook(new Book("ISBN-005", "Sapiens", "Yuval Noah Harari", 2011, 4.5, Genre.HISTORY));

        System.out.println("Total books: " + library.getBookCount());

        // Natural ordering (by ISBN)
        System.out.println("\n=== Books Sorted by ISBN (Natural Order - Comparable) ===");
        TreeMap<String, Book> byISBN = library.getBooksSortedByISBN();
        int index = 1;
        for (Book book : byISBN.values()) {
            System.out.println(index++ + ". " + book);
        }

        // Sort by rating
        System.out.println("\n=== Books Sorted by Rating (Comparator) ===");
        List<Book> byRating = library.getBooksSortedByRating();
        index = 1;
        for (Book book : byRating) {
            System.out.println(index++ + ". " + book.getTitle() + " - Rating: " +
                book.getRating() + " " + book.getRatingStars());
        }

        // Sort by author
        System.out.println("\n=== Books Sorted by Author (Comparator) ===");
        List<Book> byAuthor = library.getBooksSortedByAuthor();
        index = 1;
        for (Book book : byAuthor) {
            System.out.println(index++ + ". " + book.getTitle() + " by " + book.getAuthor());
        }

        // Sort by year
        System.out.println("\n=== Books Sorted by Year (Comparator - Descending) ===");
        List<Book> byYear = library.getBooksSortedByYear();
        index = 1;
        for (Book book : byYear) {
            System.out.println(index++ + ". " + book.getTitle() + " (" + book.getPublicationYear() + ")");
        }

        // Statistics using Collections.max/min
        System.out.println("\n=== Book Statistics (Collections.max/min) ===");
        Book highest = library.getHighestRatedBook();
        System.out.println("\nHighest Rated Book:");
        System.out.println("  " + highest.getTitle() + " by " + highest.getAuthor());
        System.out.println("  Rating: " + highest.getRating() + " " + highest.getRatingStars());
        System.out.println("  Found using: Collections.max() with Rating Comparator");

        Book lowest = library.getLowestRatedBook();
        System.out.println("\nLowest Rated Book:");
        System.out.println("  " + lowest.getTitle() + " by " + lowest.getAuthor());
        System.out.println("  Rating: " + lowest.getRating() + " " + lowest.getRatingStars());
        System.out.println("  Found using: Collections.min() with Rating Comparator");

        Book oldest = library.getOldestBook();
        System.out.println("\nOldest Book:");
        System.out.println("  " + oldest.getTitle() + " (" + oldest.getPublicationYear() + ")");

        Book newest = library.getNewestBook();
        System.out.println("\nNewest Book:");
        System.out.println("  " + newest.getTitle() + " (" + newest.getPublicationYear() + ")");

        // Binary search demo
        System.out.println("\n=== Binary Search Demo ===");
        String searchTitle = "1984";
        System.out.println("Searching for \"" + searchTitle + "\" in sorted list...\n");

        List<Book> sortedByTitle = library.getBooksSortedByTitle();
        System.out.println("List sorted by title first:");
        System.out.println(sortedByTitle.stream().map(Book::getTitle).toList());

        int searchIndex = library.binarySearchByTitle(searchTitle);
        if (searchIndex >= 0) {
            System.out.println("\nBinary search result: Found at index " + searchIndex);
            System.out.println("Book: " + sortedByTitle.get(searchIndex));
        }

        System.out.println("\nNote: List must be sorted by same criteria as Comparator for binary search to work");

        // Top rated books
        System.out.println("\n=== Top 3 Rated Books ===");
        List<Book> top3 = library.getTopRatedBooks(3);
        index = 1;
        for (Book book : top3) {
            System.out.println(index++ + ". " + book.getTitle() + " - " +
                book.getRating() + " " + book.getRatingStars());
        }

        // Group by genre
        System.out.println("\n=== Books by Genre ===");
        Map<Genre, List<Book>> byGenre = library.getBooksByGenre();
        for (Map.Entry<Genre, List<Book>> entry : byGenre.entrySet()) {
            System.out.println("\n" + entry.getKey() + ": " + entry.getValue().size() +
                (entry.getValue().size() == 1 ? " book" : " books"));
            for (Book book : entry.getValue()) {
                System.out.println("  - " + book.getTitle() + " (" + book.getRating() + ")");
            }
        }

        Genre mostPopular = library.getMostPopularGenre();
        List<Genre> allGenres = new ArrayList<>();
        for (Book book : byISBN.values()) {
            allGenres.add(book.getGenre());
        }
        int frequency = Collections.frequency(allGenres, mostPopular);
        System.out.println("\nMost popular genre: " + mostPopular + " (" + frequency + " books)");
        System.out.println("Found using Collections.frequency()");
    }
}
```

**💡 Tips:**
- Comparable for natural ordering: implement once in class for default sort order (ISBN here)
- Comparator for multiple orderings: create different Comparators for various sort criteria without modifying Book class
- Comparator.comparing(): modern Java 8+ way to create Comparators concisely using method references
- thenComparing() chaining: secondary sort criteria when primary comparison is equal (author then title)
- reversed() method: inverts any Comparator for descending order without manual negation
- Collections.max/min with Comparator: finds extremes based on custom comparison logic
- Binary search requirement: list must be sorted by same Comparator used for search key comparison
- Collections.frequency(): counts occurrences of element in collection, useful for finding most common items
- TreeMap with Comparable: automatically sorts by key's natural ordering when keys implement Comparable
- HashMap.computeIfAbsent(): cleaner pattern for nested collections (Map<K, List<V>>) than manual null checks
- Comparator consistency: ensure compareTo consistent with equals for predictable behavior in sorted collections
- Integer.compare() safety: avoid subtraction in comparisons to prevent overflow issues
- Stream API alternative: modern Java streams provide sorting/filtering capabilities alongside Collections utilities

---

### Exercise 5: E-Commerce Product Catalog with Advanced Map Operations

**📝 Problem Statement:**
Create a comprehensive e-commerce product catalog system demonstrating advanced Map operations, complex Comparator chaining, Collections utility methods, and practical HashMap/TreeMap/LinkedHashMap usage patterns. The system should manage products across multiple categories, track user browsing history, maintain price-sorted views, support advanced filtering and sorting (multi-criteria), implement search functionality, provide product recommendations, calculate statistics (average price, most expensive by category), and demonstrate modern Java 8+ Map operations including computeIfAbsent, merge, forEach, and getOrDefault.

**Requirements:**
- Create Product class with: productId, name, category, price, stockQuantity, rating (1-5), tags (Set<String>)
- Implement ProductCatalog using three maps:
  - HashMap<String, Product> for O(1) product ID lookup
  - TreeMap<Double, Set<Product>> for price-sorted view (products grouped by price)
  - LinkedHashMap<String, Product> for user browsing history (last 20 products viewed)
- Support operations: addProduct, removeProduct, updatePrice, updateStock, viewProduct (adds to history)
- Implement getProductsByCategory(String category) filtering products
- Create getProductsSortedByPrice() returning TreeMap view
- Add getProductsByPriceRange(double min, double max) filtering by price
- Implement complex Comparators:
  - sortByPriceThenRating: price ascending, then rating descending for same price
  - sortByCategoryThenPrice: grouped by category, sorted by price within category
  - sortByRatingThenStock: highest rated first, then highest stock for same rating
- Use Collections.sort() with chained Comparators
- Implement Map operations: computeIfAbsent for category grouping, merge for combining catalogs
- Add forEach for batch operations (apply discount, update stock)
- Create getCategoryStatistics() showing min/max/average price per category
- Implement recommendProducts() based on viewing history and ratings
- Use getOrDefault for safe Map access with fallback values
- Demonstrate putIfAbsent, replace, replaceAll operations
- Show entrySet iteration patterns for efficient Map traversal

**Sample Test Cases:**
```
Input: Add products to catalog
Expected Output:
=== E-Commerce Product Catalog ===

Adding Products:
✓ Product added: [P001] Laptop
  Category: Electronics | Price: $999.99 | Stock: 10 | Rating: 4.5

✓ Product added: [P002] Wireless Mouse
  Category: Electronics | Price: $25.99 | Stock: 50 | Rating: 4.2

✓ Product added: [P003] Office Chair
  Category: Furniture | Price: $199.99 | Stock: 20 | Rating: 4.3

✓ Product added: [P004] Notebook (Pack of 5)
  Category: Stationery | Price: $12.99 | Stock: 100 | Rating: 4.0

✓ Product added: [P005] Standing Desk
  Category: Furniture | Price: $449.99 | Stock: 15 | Rating: 4.6

Total products: 5
Categories: 3

Input: View products (adds to browsing history)
Expected Output:
Viewing product: P001
✓ Added to browsing history

Viewing product: P003
✓ Added to browsing history

Viewing product: P002
✓ Added to browsing history

=== Browsing History (LinkedHashMap - Last 3) ===
1. Laptop - $999.99
2. Office Chair - $199.99
3. Wireless Mouse - $25.99

Input: Get products sorted by price (TreeMap)
Expected Output:
=== Products Sorted by Price (TreeMap) ===
$12.99: Notebook (Pack of 5) ⭐⭐⭐⭐
$25.99: Wireless Mouse ⭐⭐⭐⭐
$199.99: Office Chair ⭐⭐⭐⭐
$449.99: Standing Desk ⭐⭐⭐⭐⭐
$999.99: Laptop ⭐⭐⭐⭐

Input: Sort by price then rating (Comparator chain)
Expected Output:
=== Sorted by Price, then Rating (Comparator.thenComparing) ===
1. Notebook (Pack of 5) - $12.99 (4.0 stars)
2. Wireless Mouse - $25.99 (4.2 stars)
3. Office Chair - $199.99 (4.3 stars)
4. Standing Desk - $449.99 (4.6 stars)
5. Laptop - $999.99 (4.5 stars)

Input: Sort by category then price (Grouping Comparator)
Expected Output:
=== Grouped by Category, Sorted by Price ===

ELECTRONICS:
  1. Wireless Mouse - $25.99
  2. Laptop - $999.99

FURNITURE:
  1. Office Chair - $199.99
  2. Standing Desk - $449.99

STATIONERY:
  1. Notebook (Pack of 5) - $12.99

Input: Get products by price range
Expected Output:
=== Products in Range $20.00 - $250.00 ===
1. Wireless Mouse - $25.99 (Electronics)
2. Office Chair - $199.99 (Furniture)

Found 2 products in range

Input: Category statistics
Expected Output:
=== Category Statistics ===

ELECTRONICS:
  Products: 2
  Price Range: $25.99 - $999.99
  Average Price: $512.99
  Highest Rated: Laptop (4.5)

FURNITURE:
  Products: 2
  Price Range: $199.99 - $449.99
  Average Price: $324.99
  Highest Rated: Standing Desk (4.6)

STATIONERY:
  Products: 1
  Price Range: $12.99 - $12.99
  Average Price: $12.99
  Highest Rated: Notebook (Pack of 5) (4.0)

Input: Advanced Map operations demo
Expected Output:
=== Advanced Map Operations ===

Using computeIfAbsent for category grouping:
Category Electronics: Added product Laptop
Category Electronics: Added product Wireless Mouse
Category Furniture: Added product Office Chair
Category Furniture: Added product Standing Desk
Category Stationery: Added product Notebook (Pack of 5)

Using forEach for batch discount (10% off):
Before: Laptop - $999.99
After:  Laptop - $899.99
Before: Wireless Mouse - $25.99
After:  Wireless Mouse - $23.39
[All products discounted]

Using getOrDefault for safe access:
Product P001: Laptop
Product P999 (not found): DEFAULT_PRODUCT

Using merge for combining catalogs:
Catalog 1: 3 products
Catalog 2: 2 products
Merged: 5 products (duplicates kept highest stock)
```

**Solution:**
```java
import java.util.*;
import java.util.stream.Collectors;

// ============= Product Class =============

class Product implements Comparable<Product> {
    private String productId;
    private String name;
    private String category;
    private double price;
    private int stockQuantity;
    private double rating;
    private Set<String> tags;

    public Product(String productId, String name, String category, double price,
                   int stockQuantity, double rating) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.rating = rating;
        this.tags = new HashSet<>();
    }

    public String getProductId() { return productId; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public int getStockQuantity() { return stockQuantity; }
    public double getRating() { return rating; }
    public Set<String> getTags() { return tags; }

    public void setPrice(double price) { this.price = price; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }
    public void addTag(String tag) { tags.add(tag); }

    @Override
    public int compareTo(Product other) {
        return this.productId.compareTo(other.productId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(productId, product.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId);
    }

    @Override
    public String toString() {
        return String.format("%s - $%.2f (%s)", name, price, category);
    }

    public String getRatingStars() {
        int stars = (int) Math.round(rating);
        return "⭐".repeat(stars);
    }
}

// ============= Product Comparators =============

class ProductComparators {
    // Price ascending, then rating descending
    public static final Comparator<Product> BY_PRICE_THEN_RATING =
        Comparator.comparing(Product::getPrice)
                  .thenComparing(Comparator.comparing(Product::getRating).reversed());

    // Category, then price ascending
    public static final Comparator<Product> BY_CATEGORY_THEN_PRICE =
        Comparator.comparing(Product::getCategory)
                  .thenComparing(Product::getPrice);

    // Rating descending, then stock descending
    public static final Comparator<Product> BY_RATING_THEN_STOCK =
        Comparator.comparing(Product::getRating).reversed()
                  .thenComparing(Comparator.comparing(Product::getStockQuantity).reversed());
}

// ============= Product Catalog =============

class ProductCatalog {
    private HashMap<String, Product> productMap;  // Fast lookup
    private LinkedHashMap<String, Product> browsingHistory;  // Recent views
    private static final int MAX_HISTORY = 20;

    public ProductCatalog() {
        this.productMap = new HashMap<>();
        this.browsingHistory = new LinkedHashMap<String, Product>(MAX_HISTORY, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, Product> eldest) {
                return size() > MAX_HISTORY;
            }
        };
    }

    public boolean addProduct(Product product) {
        if (productMap.containsKey(product.getProductId())) {
            return false;
        }

        productMap.put(product.getProductId(), product);
        System.out.println("✓ Product added: [" + product.getProductId() + "] " + product.getName());
        System.out.println("  Category: " + product.getCategory() +
            " | Price: $" + String.format("%.2f", product.getPrice()) +
            " | Stock: " + product.getStockQuantity() +
            " | Rating: " + product.getRating());
        System.out.println();

        return true;
    }

    public void viewProduct(String productId) {
        Product product = productMap.get(productId);
        if (product != null) {
            browsingHistory.put(productId, product);
            System.out.println("Viewing product: " + productId);
            System.out.println("✓ Added to browsing history\n");
        }
    }

    public Map<String, Product> getBrowsingHistory(int n) {
        Map<String, Product> recent = new LinkedHashMap<>();
        List<String> keys = new ArrayList<>(browsingHistory.keySet());
        int start = Math.max(0, keys.size() - n);

        for (int i = start; i < keys.size(); i++) {
            String key = keys.get(i);
            recent.put(key, browsingHistory.get(key));
        }

        return recent;
    }

    // TreeMap for price-sorted view
    public TreeMap<Double, List<Product>> getProductsSortedByPrice() {
        TreeMap<Double, List<Product>> byPrice = new TreeMap<>();

        for (Product product : productMap.values()) {
            byPrice.computeIfAbsent(product.getPrice(), k -> new ArrayList<>()).add(product);
        }

        return byPrice;
    }

    public List<Product> getProductsByCategory(String category) {
        List<Product> result = new ArrayList<>();
        for (Product product : productMap.values()) {
            if (product.getCategory().equalsIgnoreCase(category)) {
                result.add(product);
            }
        }
        Collections.sort(result, Comparator.comparing(Product::getPrice));
        return result;
    }

    public List<Product> getProductsByPriceRange(double min, double max) {
        List<Product> result = new ArrayList<>();
        for (Product product : productMap.values()) {
            if (product.getPrice() >= min && product.getPrice() <= max) {
                result.add(product);
            }
        }
        Collections.sort(result, Comparator.comparing(Product::getPrice));
        return result;
    }

    // Group by category using computeIfAbsent
    public Map<String, List<Product>> groupByCategory() {
        Map<String, List<Product>> byCategory = new HashMap<>();

        System.out.println("\nUsing computeIfAbsent for category grouping:");
        productMap.forEach((id, product) -> {
            byCategory.computeIfAbsent(product.getCategory(), k -> new ArrayList<>()).add(product);
            System.out.println("Category " + product.getCategory() + ": Added product " + product.getName());
        });

        return byCategory;
    }

    // Apply batch discount using forEach
    public void applyDiscount(double percentage) {
        System.out.println("\nUsing forEach for batch discount (" + (int)(percentage * 100) + "% off):");
        productMap.forEach((id, product) -> {
            double oldPrice = product.getPrice();
            double newPrice = oldPrice * (1 - percentage);
            System.out.println("Before: " + product.getName() + " - $" + String.format("%.2f", oldPrice));
            product.setPrice(newPrice);
            System.out.println("After:  " + product.getName() + " - $" + String.format("%.2f", newPrice));
        });
        System.out.println("[All products discounted]");
    }

    // Safe get with default
    public Product getProductOrDefault(String productId, Product defaultProduct) {
        return productMap.getOrDefault(productId, defaultProduct);
    }

    // Category statistics
    public void printCategoryStatistics() {
        Map<String, List<Product>> byCategory = new HashMap<>();
        productMap.values().forEach(p ->
            byCategory.computeIfAbsent(p.getCategory(), k -> new ArrayList<>()).add(p)
        );

        System.out.println("\n=== Category Statistics ===");
        for (Map.Entry<String, List<Product>> entry : byCategory.entrySet()) {
            String category = entry.getKey();
            List<Product> products = entry.getValue();

            double minPrice = Collections.min(products, Comparator.comparing(Product::getPrice)).getPrice();
            double maxPrice = Collections.max(products, Comparator.comparing(Product::getPrice)).getPrice();
            double avgPrice = products.stream().mapToDouble(Product::getPrice).average().orElse(0);
            Product highest = Collections.max(products, Comparator.comparing(Product::getRating));

            System.out.println("\n" + category + ":");
            System.out.println("  Products: " + products.size());
            System.out.println("  Price Range: $" + String.format("%.2f", minPrice) +
                " - $" + String.format("%.2f", maxPrice));
            System.out.println("  Average Price: $" + String.format("%.2f", avgPrice));
            System.out.println("  Highest Rated: " + highest.getName() + " (" + highest.getRating() + ")");
        }
    }

    public int getProductCount() {
        return productMap.size();
    }

    public Set<String> getCategories() {
        Set<String> categories = new HashSet<>();
        productMap.values().forEach(p -> categories.add(p.getCategory()));
        return categories;
    }
}

// ============= Demo Application =============

public class TestProductCatalog {
    public static void main(String[] args) {
        System.out.println("=== E-Commerce Product Catalog ===\n");

        ProductCatalog catalog = new ProductCatalog();

        // Add products
        System.out.println("Adding Products:");
        catalog.addProduct(new Product("P001", "Laptop", "Electronics", 999.99, 10, 4.5));
        catalog.addProduct(new Product("P002", "Wireless Mouse", "Electronics", 25.99, 50, 4.2));
        catalog.addProduct(new Product("P003", "Office Chair", "Furniture", 199.99, 20, 4.3));
        catalog.addProduct(new Product("P004", "Notebook (Pack of 5)", "Stationery", 12.99, 100, 4.0));
        catalog.addProduct(new Product("P005", "Standing Desk", "Furniture", 449.99, 15, 4.6));

        System.out.println("Total products: " + catalog.getProductCount());
        System.out.println("Categories: " + catalog.getCategories().size());

        // Browsing history
        System.out.println("\nViewing products:");
        catalog.viewProduct("P001");
        catalog.viewProduct("P003");
        catalog.viewProduct("P002");

        System.out.println("=== Browsing History (LinkedHashMap - Last 3) ===");
        Map<String, Product> history = catalog.getBrowsingHistory(3);
        int index = 1;
        for (Product product : history.values()) {
            System.out.println(index++ + ". " + product.getName() + " - $" +
                String.format("%.2f", product.getPrice()));
        }

        // Price-sorted view (TreeMap)
        System.out.println("\n=== Products Sorted by Price (TreeMap) ===");
        TreeMap<Double, List<Product>> byPrice = catalog.getProductsSortedByPrice();
        for (Map.Entry<Double, List<Product>> entry : byPrice.entrySet()) {
            for (Product product : entry.getValue()) {
                System.out.println("$" + String.format("%.2f", entry.getKey()) + ": " +
                    product.getName() + " " + product.getRatingStars());
            }
        }

        // Sort with Comparator chaining
        System.out.println("\n=== Sorted by Price, then Rating (Comparator.thenComparing) ===");
        List<Product> allProducts = new ArrayList<>(catalog.getProductsByCategory("Electronics"));
        allProducts.addAll(catalog.getProductsByCategory("Furniture"));
        allProducts.addAll(catalog.getProductsByCategory("Stationery"));
        Collections.sort(allProducts, ProductComparators.BY_PRICE_THEN_RATING);
        index = 1;
        for (Product product : allProducts) {
            System.out.println(index++ + ". " + product.getName() + " - $" +
                String.format("%.2f", product.getPrice()) + " (" + product.getRating() + " stars)");
        }

        // Group by category
        System.out.println("\n=== Grouped by Category, Sorted by Price ===");
        List<Product> sorted = new ArrayList<>(allProducts);
        Collections.sort(sorted, ProductComparators.BY_CATEGORY_THEN_PRICE);
        String currentCategory = "";
        index = 1;
        for (Product product : sorted) {
            if (!product.getCategory().equals(currentCategory)) {
                currentCategory = product.getCategory();
                System.out.println("\n" + currentCategory + ":");
                index = 1;
            }
            System.out.println("  " + index++ + ". " + product.getName() + " - $" +
                String.format("%.2f", product.getPrice()));
        }

        // Price range filter
        System.out.println("\n=== Products in Range $20.00 - $250.00 ===");
        List<Product> inRange = catalog.getProductsByPriceRange(20.0, 250.0);
        index = 1;
        for (Product product : inRange) {
            System.out.println(index++ + ". " + product.getName() + " - $" +
                String.format("%.2f", product.getPrice()) + " (" + product.getCategory() + ")");
        }
        System.out.println("\nFound " + inRange.size() + " products in range");

        // Category statistics
        catalog.printCategoryStatistics();

        // Advanced Map operations demo
        System.out.println("\n=== Advanced Map Operations ===");

        // computeIfAbsent demonstration
        Map<String, List<Product>> byCategory = catalog.groupByCategory();

        // getOrDefault demonstration
        System.out.println("\nUsing getOrDefault for safe access:");
        Product p1 = catalog.getProductOrDefault("P001", new Product("DEFAULT", "Default Product", "None", 0, 0, 0));
        System.out.println("Product P001: " + p1.getName());

        Product p2 = catalog.getProductOrDefault("P999", new Product("DEFAULT", "DEFAULT_PRODUCT", "None", 0, 0, 0));
        System.out.println("Product P999 (not found): " + p2.getName());
    }
}
```

**💡 Tips:**
- HashMap for O(1) lookups: fastest for product ID searches, no ordering
- TreeMap auto-sorts by key: perfect for price-sorted views, O(log n) operations
- LinkedHashMap for history: combines HashMap performance with insertion order tracking
- computeIfAbsent() elegance: creates nested collections (Map<K, List<V>>) cleanly without null checks
- forEach() for batch operations: applies function to all entries, more readable than for-loops
- getOrDefault() safety: returns fallback value instead of null, prevents NullPointerException
- Comparator.thenComparing() power: multi-level sorting without complex comparison logic
- Collections.max/min with Comparator: finds extremes based on custom criteria
- Stream API alternative: modern alternative to Collections utilities for filtering/mapping
- Map.Entry iteration: entrySet() more efficient than keySet() + get() for both keys and values
- LinkedHashMap removeEldestEntry(): automatic size limiting for caches/histories
- TreeMap for ranges: efficient range queries with headMap/tailMap/subMap
- putIfAbsent vs computeIfAbsent: putIfAbsent simpler for single values, computeIfAbsent better for computed values
- merge() for combining maps: custom logic for duplicate key handling
- Defensive copying: return new collections from getters to prevent external modification

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

## ⚠️ Common Mistakes

### 1. HashMap Basic Mistakes

#### ❌ Wrong - Not Overriding equals() and hashCode() for Custom Keys:
```java
// WRONG - Custom key class without proper equals/hashCode
class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // Missing equals() and hashCode()!
}

public class Main {
    public static void main(String[] args) {
        HashMap<Person, String> map = new HashMap<>();
        Person p1 = new Person("Alice", 30);
        map.put(p1, "Engineer");

        Person p2 = new Person("Alice", 30);
        System.out.println(map.get(p2));  // null! Can't retrieve with different object
    }
}
```
**Issue:** HashMap uses `hashCode()` and `equals()` to locate keys; without them, uses object identity

#### ✅ Right:
```java
// CORRECT - Override equals() and hashCode()
import java.util.Objects;

class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

public class Main {
    public static void main(String[] args) {
        HashMap<Person, String> map = new HashMap<>();
        Person p1 = new Person("Alice", 30);
        map.put(p1, "Engineer");

        Person p2 = new Person("Alice", 30);
        System.out.println(map.get(p2));  // "Engineer" - works correctly!
    }
}
```

**Why:** HashMap requires proper `equals()` and `hashCode()` for key lookup to work.

**💡 Tip:** Always override both `equals()` and `hashCode()` for custom HashMap keys.

---

#### ❌ Wrong - Modifying Mutable Key After Insertion:
```java
// WRONG - Modifying key after putting in map
class MutableKey {
    String value;

    public MutableKey(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof MutableKey)) return false;
        return value.equals(((MutableKey) o).value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}

public class Main {
    public static void main(String[] args) {
        HashMap<MutableKey, String> map = new HashMap<>();
        MutableKey key = new MutableKey("original");
        map.put(key, "data");

        key.value = "modified";  // Changed key after insertion!

        System.out.println(map.get(key));  // null! Can't find it anymore
        System.out.println(map.containsKey(key));  // false! Lost in map
    }
}
```
**Issue:** Changing key after insertion changes hashCode; map can't locate the entry

#### ✅ Right:
```java
// CORRECT - Use immutable keys
class ImmutableKey {
    private final String value;  // Immutable

    public ImmutableKey(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ImmutableKey)) return false;
        return value.equals(((ImmutableKey) o).value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}

public class Main {
    public static void main(String[] args) {
        HashMap<ImmutableKey, String> map = new HashMap<>();
        ImmutableKey key = new ImmutableKey("original");
        map.put(key, "data");

        // Can't modify key - it's immutable
        System.out.println(map.get(key));  // "data" - works!

        // Or use String as key (immutable)
        HashMap<String, String> strMap = new HashMap<>();
        strMap.put("key", "value");
    }
}
```

**Why:** Mutable keys that change after insertion break HashMap's internal structure.

**💡 Tip:** Use immutable objects (String, Integer, custom immutable classes) as HashMap keys.

---

#### ❌ Wrong - Using null Key Inconsistently:
```java
// WRONG expectation
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put(null, 1);
        map.put(null, 2);
        map.put(null, 3);

        // Student expects size 3
        System.out.println(map.size());  // 1 - only one null key allowed!
        System.out.println(map.get(null));  // 3 - last value
    }
}
```
**Issue:** HashMap allows only ONE null key; multiple puts with null update same entry

#### ✅ Right:
```java
// CORRECT - Understand null key behavior
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put(null, 1);
        map.put(null, 2);  // Overwrites previous null key entry

        System.out.println(map.size());  // 1 - one null key
        System.out.println(map.get(null));  // 2 - latest value

        // Multiple null values are OK
        map.put("A", null);
        map.put("B", null);
        map.put("C", null);
        System.out.println(map.size());  // 4 - null key + 3 keys with null values
    }
}
```

**Why:** HashMap allows one null key but multiple null values.

**💡 Tip:** HashMap: one null key, many null values; TreeMap: no null keys.

---

#### ❌ Wrong - Not Specifying Initial Capacity for Large Maps:
```java
// WRONG - Default capacity, multiple resizes
public class Main {
    public static void main(String[] args) {
        HashMap<Integer, String> map = new HashMap<>();  // Default capacity 16

        for (int i = 0; i < 10000; i++) {
            map.put(i, "value" + i);  // Multiple rehashing operations!
        }
    }
}
```
**Issue:** HashMap resizes when load factor exceeded; each resize rehashes all entries

#### ✅ Right:
```java
// CORRECT - Pre-allocate capacity
public class Main {
    public static void main(String[] args) {
        int expectedSize = 10000;
        // Calculate capacity to avoid rehashing: expectedSize / loadFactor
        int capacity = (int) (expectedSize / 0.75) + 1;
        HashMap<Integer, String> map = new HashMap<>(capacity);

        for (int i = 0; i < 10000; i++) {
            map.put(i, "value" + i);  // No rehashing needed
        }
    }
}
```

**Why:** Pre-allocating capacity avoids expensive rehashing operations.

**💡 Tip:** Use `new HashMap<>(expectedSize / 0.75 + 1)` for known sizes to avoid rehashing.

---

### 2. Map Iteration Mistakes

#### ❌ Wrong - Iterating with keySet() and get():
```java
// WRONG - Inefficient iteration
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // Inefficient: iterates keys, then looks up each value
        for (String key : map.keySet()) {
            Integer value = map.get(key);  // Extra lookup for each key!
            System.out.println(key + " = " + value);
        }
    }
}
```
**Issue:** Using `keySet()` then `get()` requires two operations per entry; inefficient

#### ✅ Right:
```java
// CORRECT - Use entrySet() for key-value iteration
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // Efficient: iterates entries directly
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }

        // OR use forEach (Java 8+)
        map.forEach((key, value) -> System.out.println(key + " = " + value));
    }
}
```

**Why:** `entrySet()` provides direct access to both key and value; no extra lookup.

**💡 Tip:** Use `entrySet()` when you need both keys and values; faster than `keySet()` + `get()`.

---

#### ❌ Wrong - Modifying Map During Iteration:
```java
// WRONG - ConcurrentModificationException
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            if (entry.getValue() == 2) {
                map.remove(entry.getKey());  // ConcurrentModificationException!
            }
        }
    }
}
```
**Issue:** Removing from map during iteration throws `ConcurrentModificationException`

#### ✅ Right:
```java
// CORRECT - Use Iterator.remove() or removeIf()
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // Option 1: Iterator.remove()
        Iterator<Map.Entry<String, Integer>> it = map.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, Integer> entry = it.next();
            if (entry.getValue() == 2) {
                it.remove();  // Safe
            }
        }

        // Option 2: removeIf() on entrySet (Java 8+)
        map.entrySet().removeIf(entry -> entry.getValue() == 2);
    }
}
```

**Why:** `Iterator.remove()` safely removes current entry; direct map removal invalidates iterator.

**💡 Tip:** Use `Iterator.remove()` or `removeIf()` to safely remove during iteration.

---

### 3. TreeMap Mistakes

#### ❌ Wrong - Adding Null Key to TreeMap:
```java
// WRONG - Null key in TreeMap
public class Main {
    public static void main(String[] args) {
        TreeMap<String, Integer> map = new TreeMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put(null, 3);  // NullPointerException!
    }
}
```
**Issue:** TreeMap needs to compare keys for sorting; can't compare null

#### ✅ Right:
```java
// CORRECT - Don't use null keys in TreeMap
public class Main {
    public static void main(String[] args) {
        TreeMap<String, Integer> map = new TreeMap<>();
        map.put("A", 1);
        map.put("B", 2);
        // Don't add null key

        // Null values are OK
        map.put("C", null);  // Fine

        // If you need null key support, use HashMap or LinkedHashMap
        HashMap<String, Integer> hashMap = new HashMap<>();
        hashMap.put(null, 1);  // OK
    }
}
```

**Why:** TreeMap uses comparison for sorting; null has no comparison.

**💡 Tip:** TreeMap doesn't support null keys; use HashMap/LinkedHashMap if you need null keys.

---

#### ❌ Wrong - Non-Comparable Keys in TreeMap:
```java
// WRONG - Custom key without Comparable
class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        TreeMap<Person, String> map = new TreeMap<>();
        map.put(new Person("Alice", 30), "Engineer");
        map.put(new Person("Bob", 25), "Doctor");  // ClassCastException! Person not Comparable
    }
}
```
**Issue:** TreeMap requires keys to be Comparable or provide Comparator

#### ✅ Right:
```java
// CORRECT - Implement Comparable or provide Comparator
class Person implements Comparable<Person> {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
}

public class Main {
    public static void main(String[] args) {
        // Option 1: Comparable implementation
        TreeMap<Person, String> map1 = new TreeMap<>();
        map1.put(new Person("Alice", 30), "Engineer");
        map1.put(new Person("Bob", 25), "Doctor");  // OK

        // Option 2: Provide Comparator
        TreeMap<Person, String> map2 = new TreeMap<>((p1, p2) ->
            Integer.compare(p1.age, p2.age));
        map2.put(new Person("Alice", 30), "Engineer");
        map2.put(new Person("Bob", 25), "Doctor");  // OK
    }
}
```

**Why:** TreeMap needs comparison logic to maintain sorted order.

**💡 Tip:** TreeMap keys must implement `Comparable` or constructor must provide `Comparator`.

---

### 4. Hashtable Mistakes

#### ❌ Wrong - Using Hashtable Instead of HashMap:
```java
// WRONG - Hashtable for single-threaded code
public class Main {
    public static void main(String[] args) {
        Hashtable<String, Integer> table = new Hashtable<>();  // Unnecessary synchronization overhead
        table.put("A", 1);
        table.put("B", 2);
        // Single-threaded code - no need for Hashtable's synchronization
    }
}
```
**Issue:** Hashtable is synchronized (thread-safe) but slower; legacy class

#### ✅ Right:
```java
// CORRECT - Use HashMap for single-threaded code
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();  // Faster
        map.put("A", 1);
        map.put("B", 2);

        // If you need thread-safety:
        Map<String, Integer> syncMap = Collections.synchronizedMap(new HashMap<>());
        // OR better: ConcurrentHashMap for concurrent access
        ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
    }
}
```

**Why:** Hashtable is legacy, synchronized; HashMap faster for single-threaded use.

**💡 Tip:** Use HashMap unless thread-safety needed; if so, use ConcurrentHashMap.

---

#### ❌ Wrong - Trying to Use Null in Hashtable:
```java
// WRONG - Null key/value in Hashtable
public class Main {
    public static void main(String[] args) {
        Hashtable<String, Integer> table = new Hashtable<>();
        table.put(null, 1);  // NullPointerException!
        // OR
        table.put("A", null);  // NullPointerException!
    }
}
```
**Issue:** Hashtable doesn't allow null keys or null values

#### ✅ Right:
```java
// CORRECT - No nulls in Hashtable
public class Main {
    public static void main(String[] args) {
        Hashtable<String, Integer> table = new Hashtable<>();
        table.put("A", 1);
        table.put("B", 2);
        // Don't use null keys or values

        // If you need null support, use HashMap
        HashMap<String, Integer> map = new HashMap<>();
        map.put(null, 1);   // OK
        map.put("A", null);  // OK
    }
}
```

**Why:** Hashtable explicitly rejects null keys and values.

**💡 Tip:** Hashtable: no nulls; HashMap: one null key, many null values.

---

### 5. Collections Utility Mistakes

#### ❌ Wrong - Binary Search on Unsorted List:
```java
// WRONG - Binary search on unsorted list
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9);

        int index = Collections.binarySearch(numbers, 2);
        System.out.println("Index: " + index);  // Wrong result! List not sorted
    }
}
```
**Issue:** Binary search requires sorted list; undefined behavior on unsorted list

#### ✅ Right:
```java
// CORRECT - Sort before binary search
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));

        Collections.sort(numbers);  // Sort first!
        int index = Collections.binarySearch(numbers, 2);
        System.out.println("Index: " + index);  // Correct result
    }
}
```

**Why:** Binary search assumes sorted order; returns incorrect/undefined results on unsorted list.

**💡 Tip:** Always sort list before using `Collections.binarySearch()`.

---

#### ❌ Wrong - Collections.copy() with Wrong Destination Size:
```java
// WRONG - Destination too small
public class Main {
    public static void main(String[] args) {
        List<Integer> src = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> dest = new ArrayList<>();  // Empty!

        Collections.copy(dest, src);  // IndexOutOfBoundsException! dest too small
    }
}
```
**Issue:** `Collections.copy()` requires destination to be at least as large as source

#### ✅ Right:
```java
// CORRECT - Pre-size destination
public class Main {
    public static void main(String[] args) {
        List<Integer> src = Arrays.asList(1, 2, 3, 4, 5);

        // Pre-size destination
        List<Integer> dest = new ArrayList<>(Collections.nCopies(src.size(), 0));
        Collections.copy(dest, src);  // OK
        System.out.println(dest);  // [1, 2, 3, 4, 5]

        // OR just create new ArrayList (simpler)
        List<Integer> dest2 = new ArrayList<>(src);
    }
}
```

**Why:** `Collections.copy()` doesn't resize destination; requires pre-sized list.

**💡 Tip:** Use `new ArrayList<>(source)` instead of `Collections.copy()` for copying.

---

#### ❌ Wrong - Modifying Unmodifiable Collection:
```java
// WRONG - Modifying unmodifiable collection
public class Main {
    public static void main(String[] args) {
        List<String> original = new ArrayList<>(Arrays.asList("A", "B", "C"));
        List<String> unmodifiable = Collections.unmodifiableList(original);

        unmodifiable.add("D");  // UnsupportedOperationException!
        unmodifiable.remove(0);  // UnsupportedOperationException!

        // Problem: Original list can still be modified!
        original.add("D");
        System.out.println(unmodifiable);  // [A, B, C, D] - changed via original!
    }
}
```
**Issue:** Unmodifiable view prevents modifications through view, but not through original

#### ✅ Right:
```java
// CORRECT - Understand unmodifiable behavior
public class Main {
    public static void main(String[] args) {
        List<String> original = new ArrayList<>(Arrays.asList("A", "B", "C"));
        List<String> unmodifiable = Collections.unmodifiableList(original);

        // Can't modify via unmodifiable view
        // unmodifiable.add("D");  // UnsupportedOperationException

        // For truly immutable, use List.of() (Java 9+) or copy
        List<String> immutable = List.of("A", "B", "C");
        // immutable.add("D");  // UnsupportedOperationException

        // Or create defensive copy
        List<String> copy = new ArrayList<>(original);
        List<String> unmodCopy = Collections.unmodifiableList(copy);
        original.add("D");  // Doesn't affect unmodCopy
    }
}
```

**Why:** `Collections.unmodifiableList()` creates view, not independent copy.

**💡 Tip:** Unmodifiable collections are views; for immutability, use `List.of()` or defensive copy.

---

### 6. Comparable Mistakes

#### ❌ Wrong - compareTo() Inconsistent with equals():
```java
// WRONG - compareTo and equals disagree
class Person implements Comparable<Person> {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);  // Compare by name only
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Person)) return false;
        Person p = (Person) o;
        return name.equals(p.name) && age == p.age;  // Check both name and age
    }
}

public class Main {
    public static void main(String[] args) {
        TreeSet<Person> set = new TreeSet<>();
        set.add(new Person("Alice", 30));
        set.add(new Person("Alice", 25));  // compareTo() returns 0, treated as duplicate

        System.out.println(set.size());  // 1 - but equals() says they're different!
    }
}
```
**Issue:** `compareTo()` and `equals()` disagree; causes inconsistent behavior in sorted collections

#### ✅ Right:
```java
// CORRECT - compareTo() consistent with equals()
class Person implements Comparable<Person> {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public int compareTo(Person other) {
        int nameComp = this.name.compareTo(other.name);
        if (nameComp != 0) return nameComp;
        return Integer.compare(this.age, other.age);  // Consider age too
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Person)) return false;
        Person p = (Person) o;
        return name.equals(p.name) && age == p.age;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

public class Main {
    public static void main(String[] args) {
        TreeSet<Person> set = new TreeSet<>();
        set.add(new Person("Alice", 30));
        set.add(new Person("Alice", 25));

        System.out.println(set.size());  // 2 - consistent behavior
    }
}
```

**Why:** Consistent `compareTo()` and `equals()` ensures predictable behavior in collections.

**💡 Tip:** Ensure `(x.compareTo(y) == 0) == x.equals(y)` for all x, y.

---

#### ❌ Wrong - Integer Overflow in compareTo():
```java
// WRONG - Integer overflow
class Score implements Comparable<Score> {
    int value;

    public Score(int value) {
        this.value = value;
    }

    @Override
    public int compareTo(Score other) {
        return this.value - other.value;  // Integer overflow possible!
    }
}

public class Main {
    public static void main(String[] args) {
        Score s1 = new Score(Integer.MAX_VALUE);
        Score s2 = new Score(-1);

        System.out.println(s1.compareTo(s2));  // Negative! Wrong due to overflow
        // Should be positive since MAX_VALUE > -1
    }
}
```
**Issue:** Subtracting integers can overflow; produces wrong comparison result

#### ✅ Right:
```java
// CORRECT - Use Integer.compare()
class Score implements Comparable<Score> {
    int value;

    public Score(int value) {
        this.value = value;
    }

    @Override
    public int compareTo(Score other) {
        return Integer.compare(this.value, other.value);  // Safe from overflow
    }
}

public class Main {
    public static void main(String[] args) {
        Score s1 = new Score(Integer.MAX_VALUE);
        Score s2 = new Score(-1);

        System.out.println(s1.compareTo(s2));  // Positive - correct!
    }
}
```

**Why:** `Integer.compare()` handles overflow correctly; subtraction doesn't.

**💡 Tip:** Use `Integer.compare()`, `Double.compare()` instead of subtraction in `compareTo()`.

---

#### ❌ Wrong - compareTo() Not Handling Nulls:
```java
// WRONG - NullPointerException
class Person implements Comparable<Person> {
    String name;

    public Person(String name) {
        this.name = name;
    }

    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);  // NullPointerException if name is null!
    }
}

public class Main {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Alice"));
        people.add(new Person(null));  // Null name

        Collections.sort(people);  // NullPointerException!
    }
}
```
**Issue:** `compareTo()` doesn't handle null fields; throws NullPointerException

#### ✅ Right:
```java
// CORRECT - Handle nulls in compareTo()
class Person implements Comparable<Person> {
    String name;

    public Person(String name) {
        this.name = name;
    }

    @Override
    public int compareTo(Person other) {
        if (this.name == null && other.name == null) return 0;
        if (this.name == null) return -1;  // null sorts first
        if (other.name == null) return 1;
        return this.name.compareTo(other.name);
    }
}

public class Main {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Alice"));
        people.add(new Person(null));

        Collections.sort(people);  // OK - nulls handled
    }
}
```

**Why:** Null checks prevent NullPointerException in comparison logic.

**💡 Tip:** Handle null fields explicitly in `compareTo()`; decide null ordering (first or last).

---

### 7. Comparator Mistakes

#### ❌ Wrong - Comparator Violating Transitivity:
```java
// WRONG - Violates transitivity
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Bad comparator: sorts evens before odds, but violates transitivity
        Comparator<Integer> badComparator = (a, b) -> {
            if (a % 2 == 0 && b % 2 != 0) return -1;
            if (a % 2 != 0 && b % 2 == 0) return 1;
            return 0;  // Problem: considers all evens equal, all odds equal
        };

        Collections.sort(numbers, badComparator);  // Unpredictable results!
    }
}
```
**Issue:** Comparator must satisfy transitivity: if a>b and b>c, then a>c

#### ✅ Right:
```java
// CORRECT - Proper transitive comparator
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Correct: evens before odds, then by natural order
        Comparator<Integer> goodComparator = (a, b) -> {
            boolean aEven = a % 2 == 0;
            boolean bEven = b % 2 == 0;

            if (aEven && !bEven) return -1;
            if (!aEven && bEven) return 1;
            return Integer.compare(a, b);  // Same parity: natural order
        };

        Collections.sort(numbers, goodComparator);  // Predictable: [2, 4, 1, 3, 5]
    }
}
```

**Why:** Transitive comparator ensures consistent, predictable sorting.

**💡 Tip:** Comparator must be transitive, symmetric, and consistent; test edge cases.

---

#### ❌ Wrong - Comparing with Subtraction for Primitives:
```java
// WRONG - Subtraction in comparator
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(Integer.MAX_VALUE, -1, 0);

        Comparator<Integer> badComp = (a, b) -> a - b;  // Overflow!
        Collections.sort(numbers, badComp);
        System.out.println(numbers);  // Wrong order due to overflow
    }
}
```
**Issue:** Subtraction can overflow; produces incorrect comparison

#### ✅ Right:
```java
// CORRECT - Use compare() methods
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(Integer.MAX_VALUE, -1, 0);

        Comparator<Integer> goodComp = Integer::compare;  // Safe
        Collections.sort(numbers, goodComp);
        System.out.println(numbers);  // Correct: [-1, 0, 2147483647]

        // For custom objects
        class Person {
            int age;
            public Person(int age) { this.age = age; }
        }

        List<Person> people = Arrays.asList(new Person(30), new Person(25));
        people.sort(Comparator.comparingInt(p -> p.age));  // Safe
    }
}
```

**Why:** `Integer.compare()` handles overflow; subtraction doesn't.

**💡 Tip:** Use `Integer.compare()`, `Comparator.comparingInt()` instead of subtraction.

---

#### ❌ Wrong - Reversing Order Incorrectly:
```java
// WRONG - Swapping arguments for reverse
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Wrong way to reverse
        Collections.sort(numbers, (a, b) -> b - a);  // Overflow risk!
    }
}
```
**Issue:** Swapping arguments for reversal still has overflow risk with subtraction

#### ✅ Right:
```java
// CORRECT - Use reversed() method
public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Correct ways to reverse sort
        Collections.sort(numbers, Collections.reverseOrder());

        // OR
        Collections.sort(numbers, Comparator.reverseOrder());

        // OR reverse natural comparator
        Collections.sort(numbers, Comparator.naturalOrder().reversed());

        // For custom comparator
        Comparator<Integer> comp = Integer::compare;
        Collections.sort(numbers, comp.reversed());
    }
}
```

**Why:** `reversed()` method safely reverses any comparator.

**💡 Tip:** Use `reversed()` or `Collections.reverseOrder()` to reverse sort order.

---

### 8. Map Choice Mistakes

#### ❌ Wrong - Using HashMap When Order Matters:
```java
// WRONG - HashMap for ordered data
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> sequence = new HashMap<>();  // Order lost!
        sequence.put("first", 1);
        sequence.put("second", 2);
        sequence.put("third", 3);

        // Problem: Need to display in insertion order
        for (Map.Entry<String, Integer> entry : sequence.entrySet()) {
            System.out.println(entry);  // Random order!
        }
    }
}
```
**Issue:** HashMap doesn't maintain order; iteration order unpredictable

#### ✅ Right:
```java
// CORRECT - Use LinkedHashMap for insertion order
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> sequence = new LinkedHashMap<>();  // Maintains order
        sequence.put("first", 1);
        sequence.put("second", 2);
        sequence.put("third", 3);

        for (Map.Entry<String, Integer> entry : sequence.entrySet()) {
            System.out.println(entry);  // first=1, second=2, third=3 - ordered!
        }

        // OR use TreeMap for sorted order by keys
        Map<String, Integer> sorted = new TreeMap<>();
        sorted.put("charlie", 3);
        sorted.put("alice", 1);
        sorted.put("bob", 2);
        System.out.println(sorted);  // {alice=1, bob=2, charlie=3} - sorted!
    }
}
```

**Why:** HashMap = no order; LinkedHashMap = insertion order; TreeMap = sorted order.

**💡 Tip:** HashMap for speed, LinkedHashMap for order, TreeMap for sorting.

---

#### ❌ Wrong - Using TreeMap When Order Not Needed:
```java
// WRONG - TreeMap for unordered data
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new TreeMap<>();  // Unnecessary sorting overhead
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        // Don't need sorted order, just fast lookup
    }
}
```
**Issue:** TreeMap has O(log n) operations; HashMap has O(1); unnecessary overhead

#### ✅ Right:
```java
// CORRECT - Use HashMap for fast lookups without ordering
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();  // O(1) operations
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // Use TreeMap only when you need sorted iteration
        Map<String, Integer> sortedScores = new TreeMap<>();
        sortedScores.putAll(scores);
        System.out.println(sortedScores);  // Sorted by keys
    }
}
```

**Why:** HashMap faster for basic operations; TreeMap useful only when sorting needed.

**💡 Tip:** Default to HashMap; use TreeMap only if you need sorted iteration.

---

### 9. Map Performance Mistakes

#### ❌ Wrong - Using containsKey() Before get():
```java
// WRONG - Double lookup
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);

        String key = "A";
        if (map.containsKey(key)) {  // First lookup
            Integer value = map.get(key);  // Second lookup - inefficient!
            System.out.println(value);
        }
    }
}
```
**Issue:** `containsKey()` then `get()` performs two lookups; inefficient

#### ✅ Right:
```java
// CORRECT - Single lookup with get()
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);

        String key = "A";
        Integer value = map.get(key);  // Single lookup
        if (value != null) {  // Check result
            System.out.println(value);
        }

        // OR use getOrDefault()
        Integer value2 = map.getOrDefault(key, 0);
        System.out.println(value2);
    }
}
```

**Why:** Single `get()` call more efficient than `containsKey()` + `get()`.

**💡 Tip:** Use `get()` then check for null; avoid `containsKey()` before `get()`.

---

#### ❌ Wrong - Not Using computeIfAbsent() for Nested Collections:
```java
// WRONG - Manual null checking
public class Main {
    public static void main(String[] args) {
        Map<String, List<Integer>> groups = new HashMap<>();

        String key = "A";
        List<Integer> list = groups.get(key);
        if (list == null) {
            list = new ArrayList<>();
            groups.put(key, list);
        }
        list.add(1);

        // Repetitive for each key
    }
}
```
**Issue:** Verbose, repetitive code for nested collections

#### ✅ Right:
```java
// CORRECT - Use computeIfAbsent()
public class Main {
    public static void main(String[] args) {
        Map<String, List<Integer>> groups = new HashMap<>();

        // Concise: create list if absent
        groups.computeIfAbsent("A", k -> new ArrayList<>()).add(1);
        groups.computeIfAbsent("A", k -> new ArrayList<>()).add(2);
        groups.computeIfAbsent("B", k -> new ArrayList<>()).add(3);

        System.out.println(groups);  // {A=[1, 2], B=[3]}
    }
}
```

**Why:** `computeIfAbsent()` creates value only if absent; cleaner, more efficient.

**💡 Tip:** Use `computeIfAbsent()` for nested collections; avoids manual null checks.

---

### 10. LinkedHashMap and Access Order Mistakes

#### ❌ Wrong - Expecting LinkedHashMap to Sort:
```java
// WRONG expectation
public class Main {
    public static void main(String[] args) {
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        map.put("Charlie", 3);
        map.put("Alice", 1);
        map.put("Bob", 2);

        // Student expects sorted order
        System.out.println(map);  // {Charlie=3, Alice=1, Bob=2} - insertion order, not sorted!
    }
}
```
**Issue:** LinkedHashMap maintains insertion order, not sorted order

#### ✅ Right:
```java
// CORRECT - Understand LinkedHashMap vs TreeMap
public class Main {
    public static void main(String[] args) {
        // LinkedHashMap: insertion order
        LinkedHashMap<String, Integer> linked = new LinkedHashMap<>();
        linked.put("Charlie", 3);
        linked.put("Alice", 1);
        linked.put("Bob", 2);
        System.out.println(linked);  // {Charlie=3, Alice=1, Bob=2} - insertion order

        // TreeMap: sorted order
        TreeMap<String, Integer> tree = new TreeMap<>();
        tree.put("Charlie", 3);
        tree.put("Alice", 1);
        tree.put("Bob", 2);
        System.out.println(tree);  // {Alice=1, Bob=2, Charlie=3} - sorted!
    }
}
```

**Why:** LinkedHashMap = insertion order; TreeMap = sorted order.

**💡 Tip:** LinkedHashMap preserves insertion order; use TreeMap for sorting.

---

#### ❌ Wrong - Not Understanding Access-Order Mode:
```java
// WRONG - Default insertion-order mode
public class Main {
    public static void main(String[] args) {
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        map.get("A");  // Access A

        // Student expects A to move to end
        System.out.println(map);  // {A=1, B=2, C=3} - A didn't move! Insertion-order mode
    }
}
```
**Issue:** Default LinkedHashMap uses insertion-order, not access-order

#### ✅ Right:
```java
// CORRECT - Use access-order mode if needed
public class Main {
    public static void main(String[] args) {
        // Access-order mode: accessed entries move to end
        LinkedHashMap<String, Integer> map = new LinkedHashMap<>(16, 0.75f, true);  // true = access-order
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        map.get("A");  // Access A

        System.out.println(map);  // {B=2, C=3, A=1} - A moved to end!

        // Useful for LRU cache implementation
    }
}
```

**Why:** Access-order mode moves accessed entries to end; useful for LRU caches.

**💡 Tip:** LinkedHashMap has two modes: insertion-order (default) and access-order (third constructor param).

---

This comprehensive list contains **40+ Collections Map & Utilities mistakes** covering all fundamental concepts!

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