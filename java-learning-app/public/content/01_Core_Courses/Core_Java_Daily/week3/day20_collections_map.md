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