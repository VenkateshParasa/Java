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

## 📚 Additional Resources

- [Oracle Collections Tutorial](https://docs.oracle.com/javase/tutorial/collections/)
- [Java Collections Framework](https://www.geeksforgeeks.org/collections-in-java-2/)