# Day 19: Collections Framework - List & Set

## 📚 Learning Objectives
By the end of this lesson, you will be able to:
- Understand the Collections Framework hierarchy
- Work with ArrayList and LinkedList
- Use Vector and Stack classes
- Understand Set interface and implementations
- Choose the right collection for your needs

---

## 🎯 Topics Covered

### 1. Collections Framework Overview

#### Hierarchy
```
Collection (Interface)
├── List (Interface) - Ordered, allows duplicates
│   ├── ArrayList
│   ├── LinkedList
│   ├── Vector
│   └── Stack
├── Set (Interface) - No duplicates
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet (SortedSet)
└── Queue (Interface)
    └── ...
```

---

### 2. ArrayList

#### Basic Operations
```java
import java.util.ArrayList;

public class ArrayListDemo {
    public static void main(String[] args) {
        // Create ArrayList
        ArrayList<String> fruits = new ArrayList<>();
        
        // Add elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Apple");  // Duplicates allowed
        
        System.out.println("Fruits: " + fruits);
        System.out.println("Size: " + fruits.size());
        
        // Access elements
        System.out.println("First: " + fruits.get(0));
        System.out.println("Last: " + fruits.get(fruits.size() - 1));
        
        // Modify elements
        fruits.set(1, "Mango");
        System.out.println("After modification: " + fruits);
        
        // Remove elements
        fruits.remove("Apple");  // Removes first occurrence
        fruits.remove(0);         // Remove by index
        System.out.println("After removal: " + fruits);
        
        // Check if exists
        System.out.println("Contains Orange: " + fruits.contains("Orange"));
        
        // Clear all
        fruits.clear();
        System.out.println("After clear: " + fruits.isEmpty());
    }
}
```

#### ArrayList Methods
```java
import java.util.*;

public class ArrayListMethods {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        
        // Add multiple elements
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.addAll(Arrays.asList(40, 50, 60));
        
        // Index operations
        System.out.println("Index of 30: " + numbers.indexOf(30));
        System.out.println("Last index of 30: " + numbers.lastIndexOf(30));
        
        // Sublist
        List<Integer> subList = numbers.subList(1, 4);
        System.out.println("Sublist: " + subList);
        
        // Convert to array
        Integer[] arr = numbers.toArray(new Integer[0]);
        
        // Iteration
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}
```

---

### 3. LinkedList

#### LinkedList vs ArrayList
```java
import java.util.*;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        
        // Add elements
        list.add("A");
        list.add("B");
        list.add("C");
        
        // Add at beginning/end
        list.addFirst("Start");
        list.addLast("End");
        
        System.out.println("List: " + list);
        
        // Get first/last
        System.out.println("First: " + list.getFirst());
        System.out.println("Last: " + list.getLast());
        
        // Remove first/last
        list.removeFirst();
        list.removeLast();
        
        System.out.println("After removal: " + list);
        
        // Use as Queue
        list.offer("X");  // Add to end
        list.poll();      // Remove from beginning
        
        // Use as Stack
        list.push("Y");   // Add to beginning
        list.pop();       // Remove from beginning
    }
}
```

---

### 4. Vector and Stack

#### Vector (Thread-Safe ArrayList)
```java
import java.util.Vector;

public class VectorDemo {
    public static void main(String[] args) {
        Vector<Integer> vector = new Vector<>();
        
        // Add elements
        vector.add(10);
        vector.add(20);
        vector.add(30);
        
        // Vector-specific methods
        vector.addElement(40);
        System.out.println("Capacity: " + vector.capacity());
        System.out.println("Size: " + vector.size());
        
        // Access
        System.out.println("Element at 0: " + vector.elementAt(0));
        System.out.println("First: " + vector.firstElement());
        System.out.println("Last: " + vector.lastElement());
        
        // Remove
        vector.removeElement(20);
        vector.removeElementAt(0);
        
        System.out.println("Vector: " + vector);
    }
}
```

#### Stack (LIFO)
```java
import java.util.Stack;

public class StackDemo {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();
        
        // Push elements
        stack.push("First");
        stack.push("Second");
        stack.push("Third");
        
        System.out.println("Stack: " + stack);
        
        // Peek (view top without removing)
        System.out.println("Top: " + stack.peek());
        
        // Pop (remove and return top)
        System.out.println("Popped: " + stack.pop());
        System.out.println("After pop: " + stack);
        
        // Check if empty
        System.out.println("Empty: " + stack.empty());
        
        // Search (returns position from top, 1-based)
        System.out.println("Position of 'First': " + stack.search("First"));
    }
}
```

---

### 5. HashSet

#### Basic HashSet Operations
```java
import java.util.HashSet;

public class HashSetDemo {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
        
        // Add elements
        set.add("Apple");
        set.add("Banana");
        set.add("Orange");
        set.add("Apple");  // Duplicate - won't be added
        
        System.out.println("Set: " + set);
        System.out.println("Size: " + set.size());
        
        // Check if exists
        System.out.println("Contains Banana: " + set.contains("Banana"));
        
        // Remove
        set.remove("Banana");
        System.out.println("After removal: " + set);
        
        // Iteration (order not guaranteed)
        for (String fruit : set) {
            System.out.println(fruit);
        }
    }
}
```

---

### 6. LinkedHashSet

#### Maintains Insertion Order
```java
import java.util.LinkedHashSet;

public class LinkedHashSetDemo {
    public static void main(String[] args) {
        LinkedHashSet<Integer> set = new LinkedHashSet<>();
        
        set.add(30);
        set.add(10);
        set.add(20);
        set.add(10);  // Duplicate
        
        // Maintains insertion order
        System.out.println("LinkedHashSet: " + set);  // [30, 10, 20]
        
        for (int num : set) {
            System.out.print(num + " ");  // 30 10 20
        }
    }
}
```

---

### 7. TreeSet

#### Sorted Set
```java
import java.util.TreeSet;

public class TreeSetDemo {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>();
        
        set.add(30);
        set.add(10);
        set.add(20);
        set.add(40);
        
        // Automatically sorted
        System.out.println("TreeSet: " + set);  // [10, 20, 30, 40]
        
        // TreeSet-specific methods
        System.out.println("First: " + set.first());
        System.out.println("Last: " + set.last());
        System.out.println("Lower than 25: " + set.lower(25));
        System.out.println("Higher than 25: " + set.higher(25));
        
        // Subset operations
        System.out.println("HeadSet (< 30): " + set.headSet(30));
        System.out.println("TailSet (>= 20): " + set.tailSet(20));
        System.out.println("SubSet [10, 30): " + set.subSet(10, 30));
    }
}
```

---

## 💻 Practice Exercises

### Exercise 1: Remove Duplicates
```java
import java.util.*;

public class RemoveDuplicates {
    public static List<Integer> removeDuplicates(List<Integer> list) {
        return new ArrayList<>(new LinkedHashSet<>(list));
    }
    
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 2, 4, 1, 5, 3);
        System.out.println("Original: " + numbers);
        System.out.println("Without duplicates: " + removeDuplicates(numbers));
    }
}
```

### Exercise 2: Common Elements
```java
import java.util.*;

public class CommonElements {
    public static Set<Integer> findCommon(List<Integer> list1, List<Integer> list2) {
        Set<Integer> set1 = new HashSet<>(list1);
        Set<Integer> set2 = new HashSet<>(list2);
        set1.retainAll(set2);  // Intersection
        return set1;
    }
    
    public static void main(String[] args) {
        List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> list2 = Arrays.asList(4, 5, 6, 7, 8);
        System.out.println("Common: " + findCommon(list1, list2));
    }
}
```

---

## 🎓 Key Takeaways

1. **ArrayList**: Fast random access, slow insertion/deletion
2. **LinkedList**: Fast insertion/deletion, slow random access
3. **Vector**: Thread-safe ArrayList (slower)
4. **Stack**: LIFO data structure
5. **HashSet**: No duplicates, no order
6. **LinkedHashSet**: No duplicates, maintains insertion order
7. **TreeSet**: No duplicates, sorted order

---

## 📝 Summary

Today you learned:
- ✅ Collections Framework hierarchy
- ✅ ArrayList and LinkedList operations
- ✅ Vector and Stack usage
- ✅ Set implementations (HashSet, LinkedHashSet, TreeSet)
- ✅ Choosing the right collection

---

## 🔗 What's Next?

Tomorrow (Day 20), we'll learn about:
- Map interface and implementations
- HashMap, LinkedHashMap, TreeMap
- Collections utility class
- Comparable and Comparator

---

## ⚠️ Common Mistakes

### 1. ArrayList Initialization and Capacity Mistakes

#### ❌ Wrong - Not Specifying Initial Capacity for Large Lists:
```java
// WRONG - Default capacity (10), multiple resizing operations
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();  // Default capacity 10
        for (int i = 0; i < 10000; i++) {
            list.add(i);  // Multiple array copies as it grows!
        }
    }
}
```
**Issue:** ArrayList starts with capacity 10, resizes multiple times for 10000 elements; each resize copies entire array

#### ✅ Right:
```java
// CORRECT - Specify initial capacity when size is known
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(10000);  // Pre-allocate
        for (int i = 0; i < 10000; i++) {
            list.add(i);  // No resizing needed
        }
    }
}
```

**Why:** Pre-allocating capacity avoids costly resize operations; each resize creates new array and copies all elements.

**💡 Tip:** Use `new ArrayList<>(expectedSize)` when you know approximate size upfront.

---

#### ❌ Wrong - Raw Type ArrayList:
```java
// WRONG - Raw type, no type safety
public class Main {
    public static void main(String[] args) {
        ArrayList list = new ArrayList();  // Raw type!
        list.add("String");
        list.add(123);
        list.add(45.67);

        String str = (String) list.get(1);  // ClassCastException at runtime!
    }
}
```
**Issue:** Raw types bypass type checking; errors only at runtime, not compile time

#### ✅ Right:
```java
// CORRECT - Use generics for type safety
public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();  // Type-safe
        list.add("String");
        // list.add(123);  // Compilation error - type mismatch!

        String str = list.get(0);  // No cast needed, type-safe
    }
}
```

**Why:** Generics provide compile-time type safety; catch errors before runtime.

**💡 Tip:** Always use generics with collections: `ArrayList<Type>`, never raw `ArrayList`.

---

#### ❌ Wrong - Incorrect Array to ArrayList Conversion:
```java
// WRONG - Arrays.asList creates fixed-size list
public class Main {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B", "C");
        list.add("D");  // UnsupportedOperationException! Fixed-size
        list.remove(0);  // UnsupportedOperationException!
    }
}
```
**Issue:** `Arrays.asList()` returns fixed-size list backed by array; can't add/remove elements

#### ✅ Right:
```java
// CORRECT - Create modifiable ArrayList
public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
        list.add("D");  // OK - modifiable
        list.remove(0);  // OK

        // OR use List.of() for truly immutable (Java 9+)
        List<String> immutable = List.of("A", "B", "C");
        // immutable.add("D");  // UnsupportedOperationException - expected
    }
}
```

**Why:** `Arrays.asList()` wraps array; new `ArrayList<>()` creates independent copy.

**💡 Tip:** `Arrays.asList()` = fixed-size; wrap in `new ArrayList<>()` for modifiable list.

---

#### ❌ Wrong - Using get() in Loop for LinkedList:
```java
// WRONG - O(n²) performance with LinkedList
public class Main {
    public static void main(String[] args) {
        List<Integer> list = new LinkedList<>();
        for (int i = 0; i < 10000; i++) {
            list.add(i);
        }

        // Bad: get(i) on LinkedList is O(n) - total O(n²)!
        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i));  // Slow!
        }
    }
}
```
**Issue:** `get(i)` on LinkedList traverses from start each time; O(n) per call

#### ✅ Right:
```java
// CORRECT - Use iterator or enhanced for-loop
public class Main {
    public static void main(String[] args) {
        List<Integer> list = new LinkedList<>();
        for (int i = 0; i < 10000; i++) {
            list.add(i);
        }

        // Good: Iterator is O(1) per element - total O(n)
        for (int num : list) {
            System.out.println(num);
        }
    }
}
```

**Why:** Enhanced for-loop uses iterator; O(1) per element for LinkedList.

**💡 Tip:** Never use indexed loop with LinkedList; use iterator or enhanced for-loop.

---

### 2. Modifying Collections During Iteration Mistakes

#### ❌ Wrong - Removing Elements While Iterating:
```java
// WRONG - ConcurrentModificationException
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        for (Integer num : list) {
            if (num % 2 == 0) {
                list.remove(num);  // ConcurrentModificationException!
            }
        }
    }
}
```
**Issue:** Modifying collection during enhanced for-loop throws `ConcurrentModificationException`

#### ✅ Right:
```java
// CORRECT - Use Iterator.remove()
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            Integer num = it.next();
            if (num % 2 == 0) {
                it.remove();  // Safe removal via iterator
            }
        }
        System.out.println(list);  // [1, 3, 5]

        // OR use removeIf (Java 8+)
        list.removeIf(num -> num % 2 == 0);
    }
}
```

**Why:** Iterator.remove() safely removes current element; direct list.remove() invalidates iterator.

**💡 Tip:** Use `Iterator.remove()` or `removeIf()` to safely remove during iteration.

---

#### ❌ Wrong - Adding Elements While Iterating:
```java
// WRONG - ConcurrentModificationException
public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        for (String str : list) {
            list.add(str.toLowerCase());  // ConcurrentModificationException!
        }
    }
}
```
**Issue:** Adding to collection during iteration throws exception

#### ✅ Right:
```java
// CORRECT - Create new list or use index loop with size limit
public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        // Option 1: Create new list
        ArrayList<String> newList = new ArrayList<>();
        for (String str : list) {
            newList.add(str.toLowerCase());
        }
        list.addAll(newList);

        // Option 2: Use index loop with original size
        int originalSize = list.size();
        for (int i = 0; i < originalSize; i++) {
            list.add(list.get(i).toLowerCase());
        }
    }
}
```

**Why:** Iterate over copy or use index with fixed size; avoid modifying collection being iterated.

**💡 Tip:** To add during iteration, iterate over copy or use index loop with fixed size.

---

### 3. LinkedList vs ArrayList Choice Mistakes

#### ❌ Wrong - Using LinkedList for Random Access:
```java
// WRONG - LinkedList for frequent get() operations
public class Main {
    public static void processData() {
        List<Integer> data = new LinkedList<>();  // Bad choice!
        for (int i = 0; i < 1000; i++) {
            data.add(i);
        }

        // Frequent random access - O(n) each time!
        for (int i = 0; i < 100; i++) {
            int randomIndex = (int) (Math.random() * data.size());
            System.out.println(data.get(randomIndex));  // Slow!
        }
    }
}
```
**Issue:** LinkedList has O(n) random access; terrible performance for `get(index)`

#### ✅ Right:
```java
// CORRECT - Use ArrayList for random access
public class Main {
    public static void processData() {
        List<Integer> data = new ArrayList<>();  // Good choice!
        for (int i = 0; i < 1000; i++) {
            data.add(i);
        }

        // Frequent random access - O(1) each time
        for (int i = 0; i < 100; i++) {
            int randomIndex = (int) (Math.random() * data.size());
            System.out.println(data.get(randomIndex));  // Fast!
        }
    }
}
```

**Why:** ArrayList provides O(1) random access; LinkedList requires traversal.

**💡 Tip:** Use ArrayList for random access; LinkedList for frequent insertions/deletions.

---

#### ❌ Wrong - Using ArrayList for Frequent Insertions at Beginning:
```java
// WRONG - ArrayList for frequent insertions at start
public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();

        // Inserting at beginning - O(n) each time!
        for (int i = 0; i < 10000; i++) {
            list.add(0, i);  // Shifts all elements - slow!
        }
    }
}
```
**Issue:** ArrayList.add(0, element) shifts all elements right; O(n) operation

#### ✅ Right:
```java
// CORRECT - Use LinkedList for frequent insertions
public class Main {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();

        // Inserting at beginning - O(1)
        for (int i = 0; i < 10000; i++) {
            list.addFirst(i);  // Fast!
        }
    }
}
```

**Why:** LinkedList insertions at beginning/end are O(1); ArrayList must shift elements.

**💡 Tip:** Use LinkedList when frequently adding/removing from beginning or middle.

---

### 4. Vector and Stack Mistakes

#### ❌ Wrong - Using Vector When Synchronization Not Needed:
```java
// WRONG - Vector when ArrayList would suffice
public class Main {
    public static void main(String[] args) {
        Vector<String> names = new Vector<>();  // Unnecessary synchronization overhead
        names.add("Alice");
        names.add("Bob");
        // Single-threaded code - no need for Vector's synchronization
    }
}
```
**Issue:** Vector is synchronized (thread-safe) but slower; overkill for single-threaded code

#### ✅ Right:
```java
// CORRECT - Use ArrayList for single-threaded code
public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();  // Faster
        names.add("Alice");
        names.add("Bob");

        // If you need thread-safety:
        List<String> syncList = Collections.synchronizedList(new ArrayList<>());
    }
}
```

**Why:** Vector synchronizes every operation; ArrayList faster for single-threaded use.

**💡 Tip:** Use ArrayList unless you need thread-safety; if so, use `Collections.synchronizedList()`.

---

#### ❌ Wrong - Using Stack Instead of Deque:
```java
// WRONG - Stack is legacy class
public class Main {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();  // Legacy, extends Vector
        stack.push(1);
        stack.push(2);
        stack.pop();
    }
}
```
**Issue:** Stack extends Vector; synchronized (slow), legacy class

#### ✅ Right:
```java
// CORRECT - Use Deque (ArrayDeque) for stack operations
import java.util.Deque;
import java.util.ArrayDeque;

public class Main {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();  // Modern, faster
        stack.push(1);
        stack.push(2);
        stack.pop();

        // ArrayDeque is faster and more flexible than Stack
    }
}
```

**Why:** Stack is legacy, synchronized; ArrayDeque faster, modern alternative.

**💡 Tip:** Use `Deque<T> stack = new ArrayDeque<>()` instead of `Stack<T>`.

---

### 5. HashSet Mistakes

#### ❌ Wrong - Expecting Order in HashSet:
```java
// WRONG - Expecting insertion order
public class Main {
    public static void main(String[] args) {
        HashSet<Integer> set = new HashSet<>();
        set.add(1);
        set.add(2);
        set.add(3);

        // Student expects: 1, 2, 3
        for (int num : set) {
            System.out.println(num);  // Order not guaranteed! Could be: 2, 1, 3
        }
    }
}
```
**Issue:** HashSet doesn't guarantee order; iteration order unpredictable

#### ✅ Right:
```java
// CORRECT - Use LinkedHashSet for insertion order
public class Main {
    public static void main(String[] args) {
        LinkedHashSet<Integer> set = new LinkedHashSet<>();  // Maintains order
        set.add(1);
        set.add(2);
        set.add(3);

        for (int num : set) {
            System.out.println(num);  // Guaranteed: 1, 2, 3
        }

        // OR use TreeSet for sorted order
        TreeSet<Integer> sortedSet = new TreeSet<>();
        sortedSet.add(3);
        sortedSet.add(1);
        sortedSet.add(2);

        for (int num : sortedSet) {
            System.out.println(num);  // Guaranteed: 1, 2, 3 (sorted)
        }
    }
}
```

**Why:** HashSet uses hash table; no order guarantee. LinkedHashSet maintains insertion order.

**💡 Tip:** HashSet = no order; LinkedHashSet = insertion order; TreeSet = sorted order.

---

#### ❌ Wrong - Not Overriding equals() and hashCode() for Custom Objects:
```java
// WRONG - Custom class without equals/hashCode
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
        HashSet<Person> set = new HashSet<>();
        set.add(new Person("Alice", 30));
        set.add(new Person("Alice", 30));  // Duplicate!

        System.out.println(set.size());  // 2 - duplicates not detected!
    }
}
```
**Issue:** Without proper `equals()` and `hashCode()`, HashSet uses object identity; duplicates added

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
        HashSet<Person> set = new HashSet<>();
        set.add(new Person("Alice", 30));
        set.add(new Person("Alice", 30));  // Duplicate detected!

        System.out.println(set.size());  // 1 - duplicate removed
    }
}
```

**Why:** HashSet relies on `hashCode()` and `equals()` to detect duplicates.

**💡 Tip:** Always override `equals()` and `hashCode()` for objects stored in HashSet/HashMap.

---

#### ❌ Wrong - Adding Multiple Nulls to HashSet:
```java
// WRONG expectation
public class Main {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
        set.add(null);
        set.add(null);
        set.add(null);

        // Student expects size 3
        System.out.println(set.size());  // 1 - only one null allowed!
    }
}
```
**Issue:** HashSet treats multiple nulls as duplicates; only one null stored

#### ✅ Right:
```java
// CORRECT - Understand null handling
public class Main {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
        set.add(null);
        set.add(null);

        System.out.println(set.size());  // 1 - null is a value, duplicates removed
        System.out.println(set.contains(null));  // true

        // TreeSet doesn't allow null (NullPointerException)
        TreeSet<String> treeSet = new TreeSet<>();
        // treeSet.add(null);  // NullPointerException!
    }
}
```

**Why:** HashSet/LinkedHashSet allow one null; TreeSet doesn't allow null.

**💡 Tip:** HashSet allows one null; TreeSet throws NullPointerException for null.

---

### 6. TreeSet Mistakes

#### ❌ Wrong - Adding Null to TreeSet:
```java
// WRONG - Null in TreeSet
public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>();
        set.add(10);
        set.add(20);
        set.add(null);  // NullPointerException!
    }
}
```
**Issue:** TreeSet needs to compare elements for sorting; can't compare null

#### ✅ Right:
```java
// CORRECT - Don't add null to TreeSet
public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>();
        set.add(10);
        set.add(20);
        // Don't add null

        // If you need null support, use LinkedHashSet or filter nulls first
        LinkedHashSet<Integer> set2 = new LinkedHashSet<>();
        set2.add(10);
        set2.add(null);  // OK
        set2.add(20);
    }
}
```

**Why:** TreeSet uses comparison for sorting; null has no meaningful comparison.

**💡 Tip:** TreeSet doesn't support null; use HashSet/LinkedHashSet if you need null.

---

#### ❌ Wrong - Adding Non-Comparable Objects to TreeSet:
```java
// WRONG - Custom class without Comparable
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
        TreeSet<Person> set = new TreeSet<>();
        set.add(new Person("Alice", 30));
        set.add(new Person("Bob", 25));  // ClassCastException! Person not Comparable
    }
}
```
**Issue:** TreeSet requires elements to be Comparable or provide Comparator

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
        return Integer.compare(this.age, other.age);  // Sort by age
    }
}

public class Main {
    public static void main(String[] args) {
        TreeSet<Person> set = new TreeSet<>();
        set.add(new Person("Alice", 30));
        set.add(new Person("Bob", 25));  // OK

        // OR provide Comparator
        TreeSet<Person> set2 = new TreeSet<>((p1, p2) -> p1.name.compareTo(p2.name));
        set2.add(new Person("Alice", 30));
        set2.add(new Person("Bob", 25));
    }
}
```

**Why:** TreeSet needs comparison logic to maintain sorted order.

**💡 Tip:** TreeSet requires `Comparable` implementation or `Comparator` in constructor.

---

#### ❌ Wrong - Expecting TreeSet to Use equals() for Duplicates:
```java
// WRONG expectation
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
        set.add(new Person("Alice", 25));  // Student expects this to be added

        System.out.println(set.size());  // 1, not 2! compareTo() returns 0, treated as duplicate
    }
}
```
**Issue:** TreeSet uses `compareTo()`, not `equals()`, to check duplicates

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
        return Integer.compare(this.age, other.age);  // Compare age if names equal
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

        System.out.println(set.size());  // 2 - different ages, different people
    }
}
```

**Why:** TreeSet uses `compareTo()` to determine uniqueness; must be consistent with `equals()`.

**💡 Tip:** Ensure `compareTo()` consistent with `equals()` for TreeSet correctness.

---

### 7. List vs Set Choice Mistakes

#### ❌ Wrong - Using List When Uniqueness Required:
```java
// WRONG - List allows duplicates
public class Main {
    public static void main(String[] args) {
        List<String> usernames = new ArrayList<>();
        usernames.add("alice");
        usernames.add("bob");
        usernames.add("alice");  // Duplicate allowed!

        // Need to manually check for duplicates
        if (usernames.contains("alice")) {
            // This doesn't prevent duplicates effectively
        }

        System.out.println(usernames.size());  // 3 - duplicates present
    }
}
```
**Issue:** List allows duplicates; manual checking needed for uniqueness

#### ✅ Right:
```java
// CORRECT - Use Set for uniqueness
public class Main {
    public static void main(String[] args) {
        Set<String> usernames = new HashSet<>();
        usernames.add("alice");
        usernames.add("bob");
        usernames.add("alice");  // Automatically ignored

        System.out.println(usernames.size());  // 2 - duplicates removed

        // If order matters, use LinkedHashSet
        Set<String> orderedUsernames = new LinkedHashSet<>();
    }
}
```

**Why:** Set automatically enforces uniqueness; List requires manual duplicate checking.

**💡 Tip:** Use Set when uniqueness is required; List when duplicates allowed/needed.

---

#### ❌ Wrong - Using Set When Order/Duplicates Matter:
```java
// WRONG - Set for ordered data with possible duplicates
public class Main {
    public static void main(String[] args) {
        Set<Integer> scores = new HashSet<>();  // Lost order and duplicates!
        scores.add(85);
        scores.add(90);
        scores.add(85);  // Duplicate removed
        scores.add(78);

        // Problem: Need to keep all scores including duplicates, in order
        System.out.println(scores);  // Order random, duplicate lost
    }
}
```
**Issue:** Set removes duplicates and may not maintain order

#### ✅ Right:
```java
// CORRECT - Use List for ordered data with duplicates
public class Main {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>();  // Keeps all scores in order
        scores.add(85);
        scores.add(90);
        scores.add(85);  // Duplicate kept
        scores.add(78);

        System.out.println(scores);  // [85, 90, 85, 78] - order and duplicates maintained
    }
}
```

**Why:** List maintains insertion order and allows duplicates; Set doesn't.

**💡 Tip:** Use List when order matters or duplicates needed; Set for unique elements only.

---

### 8. Collection Conversion Mistakes

#### ❌ Wrong - Modifying Arrays.asList() Result:
```java
// WRONG - Trying to modify fixed-size list
public class Main {
    public static void main(String[] args) {
        String[] array = {"A", "B", "C"};
        List<String> list = Arrays.asList(array);

        list.set(0, "Z");  // OK - can modify existing elements
        list.add("D");     // UnsupportedOperationException! Can't change size

        // Problem: Changes to list affect original array
        array[1] = "X";
        System.out.println(list);  // [Z, X, C] - array change reflected!
    }
}
```
**Issue:** `Arrays.asList()` returns fixed-size list backed by array; can't add/remove

#### ✅ Right:
```java
// CORRECT - Create independent ArrayList
public class Main {
    public static void main(String[] args) {
        String[] array = {"A", "B", "C"};
        List<String> list = new ArrayList<>(Arrays.asList(array));  // Independent copy

        list.set(0, "Z");  // OK
        list.add("D");     // OK
        list.remove(1);    // OK

        // Changes to array don't affect list
        array[1] = "X";
        System.out.println(list);  // [Z, B, C, D] - independent
        System.out.println(array[1]);  // X
    }
}
```

**Why:** `new ArrayList<>()` creates independent copy; not backed by original array.

**💡 Tip:** Wrap `Arrays.asList()` in `new ArrayList<>()` for fully modifiable list.

---

#### ❌ Wrong - Using toArray() Without Parameter:
```java
// WRONG - Returns Object[], not String[]
public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        Object[] array = list.toArray();  // Returns Object[]
        // String[] strArray = list.toArray();  // Compilation error!

        // String str = array[0];  // Compilation error! array[0] is Object
        String str = (String) array[0];  // Need cast
    }
}
```
**Issue:** `toArray()` without parameter returns `Object[]`; not type-safe

#### ✅ Right:
```java
// CORRECT - Use toArray(T[] array) for type-safe conversion
public class Main {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        String[] array = list.toArray(new String[0]);  // Type-safe
        // OR (Java 11+)
        String[] array2 = list.toArray(String[]::new);

        String str = array[0];  // No cast needed
    }
}
```

**Why:** `toArray(new T[0])` returns correctly typed array; type-safe.

**💡 Tip:** Always use `toArray(new T[0])` or `toArray(T[]::new)` for type-safe array conversion.

---

### 9. Performance Mistakes

#### ❌ Wrong - Using contains() in Loop with List:
```java
// WRONG - O(n²) performance
public class Main {
    public static void main(String[] args) {
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();

        for (int i = 0; i < 10000; i++) {
            list1.add(i);
            list2.add(i * 2);
        }

        // Find common elements - O(n²)!
        List<Integer> common = new ArrayList<>();
        for (int num : list1) {
            if (list2.contains(num)) {  // O(n) for each element
                common.add(num);
            }
        }
    }
}
```
**Issue:** `contains()` on List is O(n); in loop becomes O(n²)

#### ✅ Right:
```java
// CORRECT - Use Set for O(1) lookups
public class Main {
    public static void main(String[] args) {
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();

        for (int i = 0; i < 10000; i++) {
            list1.add(i);
            list2.add(i * 2);
        }

        // Convert to Set for O(1) lookups - O(n) total
        Set<Integer> set2 = new HashSet<>(list2);
        List<Integer> common = new ArrayList<>();
        for (int num : list1) {
            if (set2.contains(num)) {  // O(1) lookup
                common.add(num);
            }
        }
    }
}
```

**Why:** Set.contains() is O(1); List.contains() is O(n).

**💡 Tip:** Use Set for frequent lookups; List.contains() is slow for large lists.

---

#### ❌ Wrong - Not Using Initial Capacity for Large ArrayList:
```java
// WRONG - Multiple resize operations
public class Main {
    public static List<Integer> generateNumbers(int count) {
        List<Integer> numbers = new ArrayList<>();  // Default capacity 10

        for (int i = 0; i < count; i++) {
            numbers.add(i);  // Resizes multiple times for large count
        }
        return numbers;
    }

    public static void main(String[] args) {
        List<Integer> nums = generateNumbers(100000);  // Many resizes!
    }
}
```
**Issue:** ArrayList resizes when capacity exceeded; each resize copies all elements

#### ✅ Right:
```java
// CORRECT - Pre-allocate capacity
public class Main {
    public static List<Integer> generateNumbers(int count) {
        List<Integer> numbers = new ArrayList<>(count);  // Pre-allocate

        for (int i = 0; i < count; i++) {
            numbers.add(i);  // No resizing needed
        }
        return numbers;
    }

    public static void main(String[] args) {
        List<Integer> nums = generateNumbers(100000);  // One allocation!
    }
}
```

**Why:** Pre-allocating capacity avoids costly resize operations.

**💡 Tip:** Use `new ArrayList<>(expectedSize)` when size is known or predictable.

---

### 10. Iterator and Enhanced For-Loop Mistakes

#### ❌ Wrong - Using Index Loop When Iterator Would Be Better:
```java
// WRONG - Index loop with Set
public class Main {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>(Arrays.asList("A", "B", "C"));

        // Can't use index with Set!
        // for (int i = 0; i < set.size(); i++) {
        //     System.out.println(set.get(i));  // Set has no get(i)!
        // }
    }
}
```
**Issue:** Set doesn't support indexed access; no `get(i)` method

#### ✅ Right:
```java
// CORRECT - Use iterator or enhanced for-loop
public class Main {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>(Arrays.asList("A", "B", "C"));

        // Enhanced for-loop (recommended)
        for (String str : set) {
            System.out.println(str);
        }

        // OR explicit iterator
        Iterator<String> it = set.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}
```

**Why:** Set doesn't support random access; use iterator-based iteration.

**💡 Tip:** Use enhanced for-loop for Set; index loops only for List with random access.

---

#### ❌ Wrong - Calling remove() on Collection in Enhanced For-Loop:
```java
// WRONG - Direct collection removal in enhanced for-loop
public class Main {
    public static void main(String[] args) {
        Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));

        for (Integer num : set) {
            if (num % 2 == 0) {
                set.remove(num);  // ConcurrentModificationException!
            }
        }
    }
}
```
**Issue:** Enhanced for-loop uses iterator internally; direct removal invalidates iterator

#### ✅ Right:
```java
// CORRECT - Use Iterator.remove() or removeIf()
public class Main {
    public static void main(String[] args) {
        Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));

        // Option 1: Iterator.remove()
        Iterator<Integer> it = set.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) {
                it.remove();  // Safe
            }
        }

        // Option 2: removeIf() (Java 8+)
        set.removeIf(num -> num % 2 == 0);
    }
}
```

**Why:** `Iterator.remove()` safely removes current element; direct removal throws exception.

**💡 Tip:** Use `Iterator.remove()` or `removeIf()` to remove during iteration.

---

This comprehensive list contains **40+ Collections (List & Set) mistakes** covering all fundamental concepts!

---

## 🔗 What's Next?

Tomorrow (Day 20), we'll learn about:
- Map interface and implementations
- HashMap, LinkedHashMap, TreeMap
- Collections utility class
- Comparable and Comparator

---

## 📚 Additional Resources

- [Oracle Collections Tutorial](https://docs.oracle.com/javase/tutorial/collections/)
- [Java Collections Framework](https://www.geeksforgeeks.org/collections-in-java-2/)