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

## 💻 Practical Exercises

### Exercise 1: Remove Duplicates While Preserving Order

**📝 Problem Statement:**
Create a utility method that removes duplicate elements from a list while preserving the original insertion order. The solution should demonstrate the practical use of LinkedHashSet for maintaining order while ensuring uniqueness, and show how to convert between different collection types efficiently.

**Requirements:**
- Implement removeDuplicates(List<Integer> list) method returning List<Integer>
- Method must preserve the order of first occurrence of each element
- Use LinkedHashSet internally to remove duplicates while maintaining order
- Return result as ArrayList for compatibility with List interface
- Handle null input by returning empty list
- Handle empty list by returning empty list
- Demonstrate with test cases showing: duplicates removed, order preserved, empty list, single element
- Show that LinkedHashSet maintains insertion order unlike HashSet
- Compare performance: O(n) time complexity using LinkedHashSet vs O(n²) using nested loops

**Sample Test Cases:**
```
Input: removeDuplicates([1, 2, 3, 2, 4, 1, 5, 3])
Expected Output:
Original: [1, 2, 3, 2, 4, 1, 5, 3]
Without duplicates: [1, 2, 3, 4, 5]
Order preserved: first occurrence kept

Input: removeDuplicates([5, 5, 5, 5])
Expected Output:
Original: [5, 5, 5, 5]
Without duplicates: [5]
All duplicates removed

Input: removeDuplicates([])
Expected Output:
Original: []
Without duplicates: []
Empty list handled

Input: removeDuplicates([1, 2, 3, 4, 5])
Expected Output:
Original: [1, 2, 3, 4, 5]
Without duplicates: [1, 2, 3, 4, 5]
No duplicates: list unchanged
```

**Solution:**
```java
import java.util.*;

public class RemoveDuplicates {
    public static List<Integer> removeDuplicates(List<Integer> list) {
        if (list == null || list.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(new LinkedHashSet<>(list));
    }
    
    public static void main(String[] args) {
        // Test 1: List with duplicates
        List<Integer> numbers = Arrays.asList(1, 2, 3, 2, 4, 1, 5, 3);
        System.out.println("Original: " + numbers);
        System.out.println("Without duplicates: " + removeDuplicates(numbers));
        System.out.println("Order preserved: first occurrence kept\n");
        
        // Test 2: All duplicates
        List<Integer> allDuplicates = Arrays.asList(5, 5, 5, 5);
        System.out.println("Original: " + allDuplicates);
        System.out.println("Without duplicates: " + removeDuplicates(allDuplicates));
        System.out.println("All duplicates removed\n");
        
        // Test 3: Empty list
        List<Integer> empty = new ArrayList<>();
        System.out.println("Original: " + empty);
        System.out.println("Without duplicates: " + removeDuplicates(empty));
        System.out.println("Empty list handled\n");
        
        // Test 4: No duplicates
        List<Integer> noDuplicates = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("Original: " + noDuplicates);
        System.out.println("Without duplicates: " + removeDuplicates(noDuplicates));
        System.out.println("No duplicates: list unchanged");
    }
}
```

**💡 Tips:**
- LinkedHashSet combines HashSet's uniqueness with insertion order preservation
- Constructor new LinkedHashSet<>(list) efficiently removes duplicates in O(n) time
- Wrapping in new ArrayList<>() converts Set back to List for return type compatibility
- Alternative O(n²) approach using nested loops: for each element, check if already seen
- LinkedHashSet uses hash table + doubly-linked list: O(1) add/contains, maintains order
- Order preservation crucial for many use cases: maintaining user input order, processing sequences
- HashSet would be O(n) but lose order; TreeSet would sort (O(n log n)) changing order
- Method handles edge cases: null input, empty list, single element, no duplicates

### Exercise 2: Find Common Elements Using Set Intersection

**📝 Problem Statement:**
Create a method that finds common elements between two lists using set operations. The solution should demonstrate the practical use of HashSet for efficient membership testing, the retainAll() method for set intersection, and the performance benefits of using sets over nested loops for finding common elements.

**Requirements:**
- Implement findCommon(List<Integer> list1, List<Integer> list2) returning Set<Integer>
- Convert both input lists to HashSet for O(1) lookup performance
- Use retainAll() method to perform set intersection operation
- Return Set containing only elements present in both lists
- Handle edge cases: empty lists, no common elements, all elements common
- Demonstrate that order doesn't matter in result (Set has no guaranteed order)
- Show performance advantage: O(n + m) using sets vs O(n * m) using nested loops
- Include test cases with: some common elements, no common elements, all common, duplicates in input

**Sample Test Cases:**
```
Input: findCommon([1, 2, 3, 4, 5], [4, 5, 6, 7, 8])
Expected Output:
List 1: [1, 2, 3, 4, 5]
List 2: [4, 5, 6, 7, 8]
Common: [4, 5]
Found 2 common elements

Input: findCommon([1, 2, 3], [4, 5, 6])
Expected Output:
List 1: [1, 2, 3]
List 2: [4, 5, 6]
Common: []
No common elements

Input: findCommon([1, 2, 3], [1, 2, 3])
Expected Output:
List 1: [1, 2, 3]
List 2: [1, 2, 3]
Common: [1, 2, 3]
All elements common

Input: findCommon([1, 2, 2, 3, 3], [2, 3, 3, 4])
Expected Output:
List 1: [1, 2, 2, 3, 3]
List 2: [2, 3, 3, 4]
Common: [2, 3]
Duplicates removed, common elements found
```

**Solution:**
```java
import java.util.*;

public class CommonElements {
    public static Set<Integer> findCommon(List<Integer> list1, List<Integer> list2) {
        if (list1 == null || list2 == null) {
            return new HashSet<>();
        }
        
        Set<Integer> set1 = new HashSet<>(list1);
        Set<Integer> set2 = new HashSet<>(list2);
        set1.retainAll(set2);  // Intersection - keeps only common elements
        return set1;
    }
    
    public static void main(String[] args) {
        // Test 1: Some common elements
        List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> list2 = Arrays.asList(4, 5, 6, 7, 8);
        Set<Integer> common = findCommon(list1, list2);
        System.out.println("List 1: " + list1);
        System.out.println("List 2: " + list2);
        System.out.println("Common: " + common);
        System.out.println("Found " + common.size() + " common elements\n");
        
        // Test 2: No common elements
        List<Integer> list3 = Arrays.asList(1, 2, 3);
        List<Integer> list4 = Arrays.asList(4, 5, 6);
        Set<Integer> noCommon = findCommon(list3, list4);
        System.out.println("List 1: " + list3);
        System.out.println("List 2: " + list4);
        System.out.println("Common: " + noCommon);
        System.out.println("No common elements\n");
        
        // Test 3: All elements common
        List<Integer> list5 = Arrays.asList(1, 2, 3);
        List<Integer> list6 = Arrays.asList(1, 2, 3);
        Set<Integer> allCommon = findCommon(list5, list6);
        System.out.println("List 1: " + list5);
        System.out.println("List 2: " + list6);
        System.out.println("Common: " + allCommon);
        System.out.println("All elements common\n");
        
        // Test 4: Lists with duplicates
        List<Integer> list7 = Arrays.asList(1, 2, 2, 3, 3);
        List<Integer> list8 = Arrays.asList(2, 3, 3, 4);
        Set<Integer> commonDupes = findCommon(list7, list8);
        System.out.println("List 1: " + list7);
        System.out.println("List 2: " + list8);
        System.out.println("Common: " + commonDupes);
        System.out.println("Duplicates removed, common elements found");
    }
}
```

**💡 Tips:**
- HashSet provides O(1) average time for contains() operation vs O(n) for ArrayList
- retainAll() performs set intersection: keeps only elements present in both sets
- Converting List to Set automatically removes duplicates from each list
- Time complexity: O(n + m) where n, m are list sizes; much better than O(n * m) nested loops
- Set operations: retainAll (intersection), addAll (union), removeAll (difference)
- Result is Set not List: no guaranteed order, no duplicates
- Alternative without retainAll: iterate set1, check if set2.contains(element), add to result
- HashSet uses hash table: fast membership testing crucial for intersection operation

---

### Exercise 3: Task Management System with Priority and Categories

**📝 Problem Statement:**
Create a comprehensive task management system demonstrating practical usage of ArrayList, LinkedHashSet, and TreeSet for managing tasks with priorities, categories, and due dates. The system should support task creation with multiple attributes, categorization with unique tags, priority-based sorting, filtering by various criteria, and search operations. Implement features like marking tasks complete, updating priorities, managing categories, and generating sorted views of tasks by different criteria (priority, due date, category).

**Requirements:**
- Create Task class with fields: taskId, title, description, priority (1-5), dueDate, category, isCompleted
- Implement TaskManager class using ArrayList<Task> to store all tasks maintaining insertion order
- Use LinkedHashSet<String> for categories maintaining insertion order of unique categories
- Use TreeSet<Task> with custom Comparator for priority-based sorted view (high priority first)
- Support operations: addTask, removeTask, updateTask, markComplete, getAllTasks
- Implement getTasksByCategory(String category) returning filtered list
- Create getPendingTasks() and getCompletedTasks() separating by completion status
- Implement getTasksByPriority() returning TreeSet sorted by priority (5 to 1) then by due date
- Add searchTasks(String keyword) searching in title and description
- Create getTasksDueToday() filtering by current date
- Demonstrate adding duplicate categories (should be ignored by LinkedHashSet)
- Show category management: addCategory, removeCategory, getAllCategories (in insertion order)
- Implement getOverdueTasks() finding tasks past due date
- Show bulk operations: markAllComplete, deleteCompletedTasks
- Display tasks in multiple formats: by insertion order, by priority, by category

**Sample Test Cases:**
```
Input: Creating task manager and adding tasks
Expected Output:
=== Task Management System ===
Creating TaskManager...

Adding Tasks:
✓ Task added: [TASK-001] Complete project report
  Priority: 5 | Due: 2024-01-15 | Category: Work
✓ Task added: [TASK-002] Buy groceries
  Priority: 3 | Due: 2024-01-10 | Category: Personal
✓ Task added: [TASK-003] Review code
  Priority: 4 | Due: 2024-01-12 | Category: Work
✓ Task added: [TASK-004] Call dentist
  Priority: 2 | Due: 2024-01-11 | Category: Personal
✓ Task added: [TASK-005] Prepare presentation
  Priority: 5 | Due: 2024-01-14 | Category: Work

Categories: [Work, Personal]
Total Tasks: 5

Input: Get tasks by priority
Expected Output:
=== Tasks by Priority ===
1. [TASK-001] Complete project report
   Priority: 5 | Due: 2024-01-15 | Category: Work | Status: Pending

2. [TASK-005] Prepare presentation
   Priority: 5 | Due: 2024-01-14 | Category: Work | Status: Pending

3. [TASK-003] Review code
   Priority: 4 | Due: 2024-01-12 | Category: Work | Status: Pending

4. [TASK-002] Buy groceries
   Priority: 3 | Due: 2024-01-10 | Category: Personal | Status: Pending

5. [TASK-004] Call dentist
   Priority: 2 | Due: 2024-01-11 | Category: Personal | Status: Pending

Input: Filter by category "Work"
Expected Output:
=== Tasks in Category: Work ===
1. [TASK-001] Complete project report (Priority: 5)
2. [TASK-003] Review code (Priority: 4)
3. [TASK-005] Prepare presentation (Priority: 5)

Found 3 tasks in category 'Work'

Input: Mark task complete and get pending tasks
Expected Output:
✓ Task [TASK-002] marked as complete

=== Pending Tasks ===
1. [TASK-001] Complete project report - Priority: 5
2. [TASK-003] Review code - Priority: 4
3. [TASK-004] Call dentist - Priority: 2
4. [TASK-005] Prepare presentation - Priority: 5

Pending: 4 | Completed: 1

Input: Search for keyword "report"
Expected Output:
=== Search Results for: "report" ===
1. [TASK-001] Complete project report
   Description: Finish Q4 project report
   Priority: 5 | Category: Work

Found 1 matching task(s)

Input: Try adding duplicate category
Expected Output:
Adding category "Work"... Already exists (ignored)
Adding category "Personal"... Already exists (ignored)
Adding category "Health"... Added
Adding category "Work"... Already exists (ignored)

Categories (in insertion order): [Work, Personal, Health]
Total unique categories: 3
```

**Solution:**
```java
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

// ============= Task Class =============

class Task {
    private String taskId;
    private String title;
    private String description;
    private int priority;  // 1 (low) to 5 (high)
    private LocalDate dueDate;
    private String category;
    private boolean isCompleted;

    public Task(String taskId, String title, String description, int priority,
                LocalDate dueDate, String category) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.category = category;
        this.isCompleted = false;
    }

    // Getters
    public String getTaskId() { return taskId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public int getPriority() { return priority; }
    public LocalDate getDueDate() { return dueDate; }
    public String getCategory() { return category; }
    public boolean isCompleted() { return isCompleted; }

    // Setters
    public void setPriority(int priority) { this.priority = priority; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public void setCategory(String category) { this.category = category; }
    public void setCompleted(boolean completed) { isCompleted = completed; }

    @Override
    public String toString() {
        return String.format("[%s] %s | Priority: %d | Due: %s | Category: %s | Status: %s",
            taskId, title, priority, dueDate, category, isCompleted ? "Completed" : "Pending");
    }
}

// ============= Task Manager =============

class TaskManager {
    private ArrayList<Task> tasks;  // Maintains insertion order
    private LinkedHashSet<String> categories;  // Unique categories in insertion order
    private int taskCounter;

    public TaskManager() {
        this.tasks = new ArrayList<>();
        this.categories = new LinkedHashSet<>();
        this.taskCounter = 1;
    }

    public Task addTask(String title, String description, int priority,
                        LocalDate dueDate, String category) {
        String taskId = String.format("TASK-%03d", taskCounter++);
        Task task = new Task(taskId, title, description, priority, dueDate, category);
        tasks.add(task);
        categories.add(category);  // Automatically handles duplicates

        System.out.println("✓ Task added: [" + taskId + "] " + title);
        System.out.println("  Priority: " + priority + " | Due: " + dueDate +
                          " | Category: " + category);

        return task;
    }

    public boolean removeTask(String taskId) {
        return tasks.removeIf(task -> task.getTaskId().equals(taskId));
    }

    public Task getTask(String taskId) {
        for (Task task : tasks) {
            if (task.getTaskId().equals(taskId)) {
                return task;
            }
        }
        return null;
    }

    public void markComplete(String taskId) {
        Task task = getTask(taskId);
        if (task != null) {
            task.setCompleted(true);
            System.out.println("✓ Task [" + taskId + "] marked as complete");
        }
    }

    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks);
    }

    public List<Task> getPendingTasks() {
        List<Task> pending = new ArrayList<>();
        for (Task task : tasks) {
            if (!task.isCompleted()) {
                pending.add(task);
            }
        }
        return pending;
    }

    public List<Task> getCompletedTasks() {
        List<Task> completed = new ArrayList<>();
        for (Task task : tasks) {
            if (task.isCompleted()) {
                completed.add(task);
            }
        }
        return completed;
    }

    public List<Task> getTasksByCategory(String category) {
        List<Task> categoryTasks = new ArrayList<>();
        for (Task task : tasks) {
            if (task.getCategory().equals(category)) {
                categoryTasks.add(task);
            }
        }
        return categoryTasks;
    }

    // TreeSet for priority-sorted view (high to low, then by due date)
    public TreeSet<Task> getTasksByPriority() {
        TreeSet<Task> sortedTasks = new TreeSet<>((t1, t2) -> {
            // Sort by priority (high to low)
            int priorityCompare = Integer.compare(t2.getPriority(), t1.getPriority());
            if (priorityCompare != 0) return priorityCompare;

            // If same priority, sort by due date (earlier first)
            int dateCompare = t1.getDueDate().compareTo(t2.getDueDate());
            if (dateCompare != 0) return dateCompare;

            // If same priority and date, sort by taskId to avoid duplicates
            return t1.getTaskId().compareTo(t2.getTaskId());
        });

        sortedTasks.addAll(tasks);
        return sortedTasks;
    }

    public List<Task> searchTasks(String keyword) {
        List<Task> results = new ArrayList<>();
        String lowerKeyword = keyword.toLowerCase();

        for (Task task : tasks) {
            if (task.getTitle().toLowerCase().contains(lowerKeyword) ||
                task.getDescription().toLowerCase().contains(lowerKeyword)) {
                results.add(task);
            }
        }

        return results;
    }

    public List<Task> getTasksDueToday() {
        LocalDate today = LocalDate.now();
        List<Task> dueToday = new ArrayList<>();

        for (Task task : tasks) {
            if (task.getDueDate().equals(today) && !task.isCompleted()) {
                dueToday.add(task);
            }
        }

        return dueToday;
    }

    public List<Task> getOverdueTasks() {
        LocalDate today = LocalDate.now();
        List<Task> overdue = new ArrayList<>();

        for (Task task : tasks) {
            if (task.getDueDate().isBefore(today) && !task.isCompleted()) {
                overdue.add(task);
            }
        }

        return overdue;
    }

    public void addCategory(String category) {
        boolean added = categories.add(category);
        if (added) {
            System.out.println("Adding category \"" + category + "\"... Added");
        } else {
            System.out.println("Adding category \"" + category + "\"... Already exists (ignored)");
        }
    }

    public boolean removeCategory(String category) {
        return categories.remove(category);
    }

    public Set<String> getAllCategories() {
        return new LinkedHashSet<>(categories);  // Return copy maintaining order
    }

    public void markAllComplete() {
        for (Task task : tasks) {
            task.setCompleted(true);
        }
        System.out.println("All tasks marked as complete");
    }

    public void deleteCompletedTasks() {
        int sizeBefore = tasks.size();
        tasks.removeIf(Task::isCompleted);
        int deleted = sizeBefore - tasks.size();
        System.out.println("Deleted " + deleted + " completed task(s)");
    }

    public void displayStats() {
        long pending = tasks.stream().filter(t -> !t.isCompleted()).count();
        long completed = tasks.stream().filter(Task::isCompleted).count();

        System.out.println("\nPending: " + pending + " | Completed: " + completed);
    }
}

// ============= Demo Application =============

public class TestTaskManagement {
    public static void main(String[] args) {
        System.out.println("=== Task Management System ===");
        System.out.println("Creating TaskManager...\n");

        TaskManager tm = new TaskManager();

        // Add tasks
        System.out.println("Adding Tasks:");
        tm.addTask("Complete project report", "Finish Q4 project report", 5,
            LocalDate.of(2024, 1, 15), "Work");
        tm.addTask("Buy groceries", "Milk, eggs, bread", 3,
            LocalDate.of(2024, 1, 10), "Personal");
        tm.addTask("Review code", "Review team's pull requests", 4,
            LocalDate.of(2024, 1, 12), "Work");
        tm.addTask("Call dentist", "Schedule appointment", 2,
            LocalDate.of(2024, 1, 11), "Personal");
        tm.addTask("Prepare presentation", "Q1 planning presentation", 5,
            LocalDate.of(2024, 1, 14), "Work");

        System.out.println("\nCategories: " + tm.getAllCategories());
        System.out.println("Total Tasks: " + tm.getAllTasks().size());

        // Get tasks by priority
        System.out.println("\n=== Tasks by Priority ===");
        TreeSet<Task> priorityTasks = tm.getTasksByPriority();
        int index = 1;
        for (Task task : priorityTasks) {
            System.out.println(index++ + ". " + task);
            System.out.println();
        }

        // Filter by category
        System.out.println("=== Tasks in Category: Work ===");
        List<Task> workTasks = tm.getTasksByCategory("Work");
        for (int i = 0; i < workTasks.size(); i++) {
            Task task = workTasks.get(i);
            System.out.println((i + 1) + ". [" + task.getTaskId() + "] " +
                task.getTitle() + " (Priority: " + task.getPriority() + ")");
        }
        System.out.println("\nFound " + workTasks.size() + " tasks in category 'Work'\n");

        // Mark complete and get pending
        tm.markComplete("TASK-002");

        System.out.println("\n=== Pending Tasks ===");
        List<Task> pending = tm.getPendingTasks();
        for (int i = 0; i < pending.size(); i++) {
            Task task = pending.get(i);
            System.out.println((i + 1) + ". [" + task.getTaskId() + "] " +
                task.getTitle() + " - Priority: " + task.getPriority());
        }
        tm.displayStats();

        // Search
        System.out.println("\n=== Search Results for: \"report\" ===");
        List<Task> results = tm.searchTasks("report");
        for (int i = 0; i < results.size(); i++) {
            Task task = results.get(i);
            System.out.println((i + 1) + ". [" + task.getTaskId() + "] " + task.getTitle());
            System.out.println("   Description: " + task.getDescription());
            System.out.println("   Priority: " + task.getPriority() + " | Category: " + task.getCategory());
        }
        System.out.println("\nFound " + results.size() + " matching task(s)\n");

        // Demonstrate LinkedHashSet behavior with duplicate categories
        System.out.println("=== Testing Category Uniqueness ===");
        tm.addCategory("Work");
        tm.addCategory("Personal");
        tm.addCategory("Health");
        tm.addCategory("Work");

        System.out.println("\nCategories (in insertion order): " + tm.getAllCategories());
        System.out.println("Total unique categories: " + tm.getAllCategories().size());
    }
}
```

**💡 Tips:**
- ArrayList maintains insertion order: tasks stored in order they were added, preserving chronological history
- LinkedHashSet for categories: automatically prevents duplicate categories while maintaining insertion order
- TreeSet with Comparator: provides dynamic sorted view without modifying original ArrayList
- Custom Comparator sorts by priority (high to low), then due date (early to late), then taskId (prevents duplicate removal)
- Stream API filter operations: `tasks.stream().filter(predicate)` creates filtered views without modifying original
- removeIf() method: safely removes elements matching predicate during iteration (avoids ConcurrentModificationException)
- LinkedHashSet.add() returns boolean: true if added (new), false if already exists (duplicate ignored)
- Returning new ArrayList<>(tasks): defensive copying prevents external modification of internal collection
- TreeSet automatically sorts: no need to manually sort, maintains sorted order as elements added/removed
- LocalDate comparison: compareTo() and isBefore()/isAfter() for date-based filtering
- Multiple sorted views possible: original ArrayList + TreeSet with different Comparators for different sort orders
- contains() with String: case-insensitive search using toLowerCase() for better UX
- Set operations advantage: O(1) add/contains for categories vs O(n) for List

---

### Exercise 4: Student Course Registration System with Enrollment and Waitlist

**📝 Problem Statement:**
Create a student course registration system demonstrating practical differences between HashSet, ArrayList, and LinkedHashSet for managing student enrollments, waitlists, and course prerequisites. The system should handle course capacity limits, maintain waitlist ordering, enforce unique student enrollments, check prerequisite requirements, and support registration operations including enrollment, dropping courses, and waitlist management. Implement set operations for finding common courses, checking prerequisites, and managing student conflicts.

**Requirements:**
- Create Student class with: studentId, name, email, enrolledCourses (HashSet<String>)
- Create Course class with: courseId, name, capacity, enrolledStudents (HashSet<Student>), waitlist (ArrayList<Student>), prerequisites (LinkedHashSet<String>)
- Implement RegistrationSystem managing multiple courses and students
- enrolledStudents uses HashSet: prevents duplicate enrollments, O(1) contains check
- waitlist uses ArrayList: maintains order of registration (FIFO), allows iteration in order
- prerequisites uses LinkedHashSet: enforces order of prerequisite courses, prevents duplicates
- Support operations: registerForCourse, dropCourse, moveFromWaitlistToEnrolled
- Implement checkPrerequisites(Student, Course) verifying student completed prerequisites
- Create getEnrolledCourses(Student) returning set of courses student enrolled in
- Implement getAvailableSeats(Course) calculating capacity - enrolled count
- Add findCommonCourses(Student s1, Student s2) using set intersection
- Create getWaitlistPosition(Student, Course) finding position in ordered waitlist
- Demonstrate duplicate enrollment prevention by HashSet
- Show waitlist ordering maintenance through ArrayList
- Implement prerequisite checking with ordered LinkedHashSet
- Support bulk operations: enrollMultipleStudents, processWaitlist

**Sample Test Cases:**
```
Input: Creating courses with prerequisites
Expected Output:
=== Course Registration System ===

Creating Courses:
✓ Course created: [CS101] Introduction to Programming
  Capacity: 3 | Prerequisites: []

✓ Course created: [CS201] Data Structures
  Capacity: 2 | Prerequisites: [CS101]

✓ Course created: [CS301] Algorithms
  Capacity: 2 | Prerequisites: [CS101, CS201]

Input: Register students for CS101
Expected Output:
=== Registering for CS101 ===

Attempting to register: Alice (S001)
✓ Alice successfully enrolled in CS101
Current enrollment: 1/3

Attempting to register: Bob (S002)
✓ Bob successfully enrolled in CS101
Current enrollment: 2/3

Attempting to register: Charlie (S003)
✓ Charlie successfully enrolled in CS101
Current enrollment: 3/3 (FULL)

Attempting to register: David (S004)
⚠ CS101 is full. David added to waitlist (position: 1)

Attempting to register: Alice (S001)
✗ Alice is already enrolled in CS101

Enrolled: [Alice, Bob, Charlie]
Waitlist: [David]

Input: Check prerequisites for CS301
Expected Output:
=== Checking Prerequisites for CS301 ===

Student: Alice
Enrolled courses: [CS101]
Required prerequisites: [CS101, CS201]
✗ Missing prerequisites: [CS201]
Cannot register: Prerequisites not met

Student: Bob
Enrolled courses: [CS101, CS201]
Required prerequisites: [CS101, CS201]
✓ All prerequisites met
✓ Bob successfully enrolled in CS301

Input: Drop course and process waitlist
Expected Output:
=== Dropping Course ===

Charlie is dropping CS101
✓ Charlie dropped from CS101
Current enrollment: 2/3

Processing waitlist...
✓ David moved from waitlist to enrolled
Current enrollment: 3/3 (FULL)

New enrolled: [Alice, Bob, David]
Waitlist: []

Input: Find common courses between students
Expected Output:
=== Common Courses ===

Alice's courses: [CS101, CS201]
Bob's courses: [CS101, CS201, CS301]

Common courses: [CS101, CS201]
Found 2 common courses
```

**Solution:**
```java
import java.util.*;

// ============= Student Class =============

class Student {
    private String studentId;
    private String name;
    private String email;
    private HashSet<String> enrolledCourses;  // Unique courses

    public Student(String studentId, String name, String email) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.enrolledCourses = new HashSet<>();
    }

    public String getStudentId() { return studentId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Set<String> getEnrolledCourses() { return new HashSet<>(enrolledCourses); }

    public void addCourse(String courseId) {
        enrolledCourses.add(courseId);
    }

    public void removeCourse(String courseId) {
        enrolledCourses.remove(courseId);
    }

    public boolean isEnrolledIn(String courseId) {
        return enrolledCourses.contains(courseId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(studentId, student.studentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentId);
    }

    @Override
    public String toString() {
        return name + " (" + studentId + ")";
    }
}

// ============= Course Class =============

class Course {
    private String courseId;
    private String name;
    private int capacity;
    private HashSet<Student> enrolledStudents;  // No duplicates
    private ArrayList<Student> waitlist;  // Maintains order (FIFO)
    private LinkedHashSet<String> prerequisites;  // Ordered prerequisites

    public Course(String courseId, String name, int capacity) {
        this.courseId = courseId;
        this.name = name;
        this.capacity = capacity;
        this.enrolledStudents = new HashSet<>();
        this.waitlist = new ArrayList<>();
        this.prerequisites = new LinkedHashSet<>();
    }

    public String getCourseId() { return courseId; }
    public String getName() { return name; }
    public int getCapacity() { return capacity; }
    public Set<Student> getEnrolledStudents() { return new HashSet<>(enrolledStudents); }
    public List<Student> getWaitlist() { return new ArrayList<>(waitlist); }
    public Set<String> getPrerequisites() { return new LinkedHashSet<>(prerequisites); }

    public void addPrerequisite(String courseId) {
        prerequisites.add(courseId);
    }

    public boolean isFull() {
        return enrolledStudents.size() >= capacity;
    }

    public int getAvailableSeats() {
        return capacity - enrolledStudents.size();
    }

    public boolean isEnrolled(Student student) {
        return enrolledStudents.contains(student);
    }

    public boolean isOnWaitlist(Student student) {
        return waitlist.contains(student);
    }

    public boolean enroll(Student student) {
        if (enrolledStudents.contains(student)) {
            return false;  // Already enrolled
        }
        return enrolledStudents.add(student);
    }

    public boolean drop(Student student) {
        return enrolledStudents.remove(student);
    }

    public boolean addToWaitlist(Student student) {
        if (waitlist.contains(student) || enrolledStudents.contains(student)) {
            return false;
        }
        return waitlist.add(student);
    }

    public Student removeFromWaitlist() {
        if (waitlist.isEmpty()) {
            return null;
        }
        return waitlist.remove(0);  // Remove first (FIFO)
    }

    public int getWaitlistPosition(Student student) {
        return waitlist.indexOf(student) + 1;  // 1-based position
    }

    @Override
    public String toString() {
        return String.format("[%s] %s (Enrolled: %d/%d, Waitlist: %d)",
            courseId, name, enrolledStudents.size(), capacity, waitlist.size());
    }
}

// ============= Registration System =============

class RegistrationSystem {
    private Map<String, Course> courses;
    private Map<String, Student> students;

    public RegistrationSystem() {
        this.courses = new HashMap<>();
        this.students = new HashMap<>();
    }

    public void addCourse(Course course) {
        courses.put(course.getCourseId(), course);
        System.out.println("✓ Course created: [" + course.getCourseId() + "] " + course.getName());
        System.out.println("  Capacity: " + course.getCapacity() +
            " | Prerequisites: " + course.getPrerequisites());
        System.out.println();
    }

    public void addStudent(Student student) {
        students.put(student.getStudentId(), student);
    }

    public boolean registerForCourse(String studentId, String courseId) {
        Student student = students.get(studentId);
        Course course = courses.get(courseId);

        if (student == null || course == null) {
            System.out.println("✗ Student or course not found");
            return false;
        }

        System.out.println("\nAttempting to register: " + student);

        // Check if already enrolled
        if (course.isEnrolled(student)) {
            System.out.println("✗ " + student.getName() + " is already enrolled in " + courseId);
            return false;
        }

        // Check prerequisites
        if (!checkPrerequisites(student, course)) {
            System.out.println("✗ Prerequisites not met for " + courseId);
            return false;
        }

        // Try to enroll
        if (!course.isFull()) {
            course.enroll(student);
            student.addCourse(courseId);
            System.out.println("✓ " + student.getName() + " successfully enrolled in " + courseId);
            System.out.println("Current enrollment: " + course.getEnrolledStudents().size() +
                "/" + course.getCapacity() +
                (course.isFull() ? " (FULL)" : ""));
            return true;
        } else {
            // Add to waitlist
            course.addToWaitlist(student);
            int position = course.getWaitlistPosition(student);
            System.out.println("⚠ " + courseId + " is full. " + student.getName() +
                " added to waitlist (position: " + position + ")");
            return false;
        }
    }

    public boolean checkPrerequisites(Student student, Course course) {
        Set<String> required = course.getPrerequisites();
        Set<String> enrolled = student.getEnrolledCourses();

        // Check if student has all prerequisites
        return enrolled.containsAll(required);
    }

    public Set<String> getMissingPrerequisites(Student student, Course course) {
        Set<String> required = new LinkedHashSet<>(course.getPrerequisites());
        Set<String> enrolled = student.getEnrolledCourses();

        required.removeAll(enrolled);  // Remove completed prerequisites
        return required;
    }

    public boolean dropCourse(String studentId, String courseId) {
        Student student = students.get(studentId);
        Course course = courses.get(courseId);

        if (student == null || course == null) {
            return false;
        }

        System.out.println("\n" + student.getName() + " is dropping " + courseId);

        if (course.drop(student)) {
            student.removeCourse(courseId);
            System.out.println("✓ " + student.getName() + " dropped from " + courseId);
            System.out.println("Current enrollment: " + course.getEnrolledStudents().size() +
                "/" + course.getCapacity());

            // Process waitlist
            processWaitlist(course);
            return true;
        }

        return false;
    }

    public void processWaitlist(Course course) {
        if (course.isFull() || course.getWaitlist().isEmpty()) {
            return;
        }

        System.out.println("\nProcessing waitlist...");

        while (!course.isFull() && !course.getWaitlist().isEmpty()) {
            Student student = course.removeFromWaitlist();
            if (student != null) {
                course.enroll(student);
                student.addCourse(course.getCourseId());
                System.out.println("✓ " + student.getName() + " moved from waitlist to enrolled");
                System.out.println("Current enrollment: " + course.getEnrolledStudents().size() +
                    "/" + course.getCapacity() +
                    (course.isFull() ? " (FULL)" : ""));
            }
        }
    }

    public Set<String> findCommonCourses(String studentId1, String studentId2) {
        Student s1 = students.get(studentId1);
        Student s2 = students.get(studentId2);

        if (s1 == null || s2 == null) {
            return new HashSet<>();
        }

        // Set intersection
        Set<String> common = new HashSet<>(s1.getEnrolledCourses());
        common.retainAll(s2.getEnrolledCourses());

        return common;
    }

    public void displayCourseInfo(String courseId) {
        Course course = courses.get(courseId);
        if (course == null) return;

        System.out.println("\n" + course);
        System.out.println("Enrolled: " + getStudentNames(course.getEnrolledStudents()));
        System.out.println("Waitlist: " + getStudentNames(new HashSet<>(course.getWaitlist())));
    }

    private List<String> getStudentNames(Set<Student> students) {
        List<String> names = new ArrayList<>();
        for (Student student : students) {
            names.add(student.getName());
        }
        return names;
    }

    public Course getCourse(String courseId) {
        return courses.get(courseId);
    }

    public Student getStudent(String studentId) {
        return students.get(studentId);
    }
}

// ============= Demo Application =============

public class TestCourseRegistration {
    public static void main(String[] args) {
        System.out.println("=== Course Registration System ===\n");

        RegistrationSystem system = new RegistrationSystem();

        // Create courses
        System.out.println("Creating Courses:");
        Course cs101 = new Course("CS101", "Introduction to Programming", 3);
        system.addCourse(cs101);

        Course cs201 = new Course("CS201", "Data Structures", 2);
        cs201.addPrerequisite("CS101");
        system.addCourse(cs201);

        Course cs301 = new Course("CS301", "Algorithms", 2);
        cs301.addPrerequisite("CS101");
        cs301.addPrerequisite("CS201");
        system.addCourse(cs301);

        // Create students
        Student alice = new Student("S001", "Alice", "alice@example.com");
        Student bob = new Student("S002", "Bob", "bob@example.com");
        Student charlie = new Student("S003", "Charlie", "charlie@example.com");
        Student david = new Student("S004", "David", "david@example.com");

        system.addStudent(alice);
        system.addStudent(bob);
        system.addStudent(charlie);
        system.addStudent(david);

        // Register for CS101
        System.out.println("=== Registering for CS101 ===");
        system.registerForCourse("S001", "CS101");
        system.registerForCourse("S002", "CS101");
        system.registerForCourse("S003", "CS101");
        system.registerForCourse("S004", "CS101");  // Full, goes to waitlist
        system.registerForCourse("S001", "CS101");  // Duplicate

        system.displayCourseInfo("CS101");

        // Register for CS201 (requires CS101)
        System.out.println("\n=== Registering for CS201 ===");
        system.registerForCourse("S001", "CS201");
        system.registerForCourse("S002", "CS201");

        // Check prerequisites for CS301
        System.out.println("\n=== Checking Prerequisites for CS301 ===");

        System.out.println("\nStudent: " + alice.getName());
        System.out.println("Enrolled courses: " + alice.getEnrolledCourses());
        System.out.println("Required prerequisites: " + cs301.getPrerequisites());
        Set<String> missing = system.getMissingPrerequisites(alice, cs301);
        if (!missing.isEmpty()) {
            System.out.println("✗ Missing prerequisites: " + missing);
            System.out.println("Cannot register: Prerequisites not met");
        }

        System.out.println("\nStudent: " + bob.getName());
        System.out.println("Enrolled courses: " + bob.getEnrolledCourses());
        System.out.println("Required prerequisites: " + cs301.getPrerequisites());
        System.out.println("✓ All prerequisites met");
        system.registerForCourse("S002", "CS301");

        // Drop and process waitlist
        System.out.println("\n=== Dropping Course ===");
        system.dropCourse("S003", "CS101");

        system.displayCourseInfo("CS101");

        // Find common courses
        System.out.println("\n=== Common Courses ===");
        System.out.println("\nAlice's courses: " + alice.getEnrolledCourses());
        System.out.println("Bob's courses: " + bob.getEnrolledCourses());

        Set<String> common = system.findCommonCourses("S001", "S002");
        System.out.println("\nCommon courses: " + common);
        System.out.println("Found " + common.size() + " common courses");
    }
}
```

**💡 Tips:**
- HashSet for enrolledStudents: O(1) contains() check prevents duplicate enrollments efficiently
- ArrayList for waitlist: maintains FIFO ordering for fair waitlist processing, indexed access for position queries
- LinkedHashSet for prerequisites: preserves order of prerequisite courses while preventing duplicates
- equals() and hashCode() in Student: required for HashSet to correctly identify duplicate students
- Set intersection with retainAll(): finds common courses between students using built-in set operation
- contains() vs indexOf(): HashSet.contains() is O(1), ArrayList.indexOf() is O(n) but needed for position
- removeAll() for set difference: finds missing prerequisites by removing completed courses from required
- Defensive copying: getEnrolledCourses() returns new HashSet<>() preventing external modification
- containsAll() for subset check: efficient way to verify student has all required prerequisites
- ArrayList.remove(0) for FIFO: removes first element for queue-like waitlist processing
- HashSet prevents duplicates automatically: enrolledStudents.add() returns false if student already enrolled
- LinkedHashSet maintains insertion order: prerequisites displayed/checked in order they were added
- Set operations advantages: retainAll (intersection), removeAll (difference), addAll (union) for course comparisons

---

### Exercise 5: Inventory Management with Performance Comparison

**📝 Problem Statement:**
Create an inventory management system demonstrating performance differences between ArrayList, LinkedList, HashSet, and TreeSet through practical operations. The system should manage products with CRUD operations, support multiple views (insertion order, sorted by price, unique product IDs), handle transaction history with frequent insertions, and include performance benchmarking for different collection types. Implement search, filter, sort operations and measure execution times to demonstrate when to use each collection type.

**Requirements:**
- Create Product class with: productId, name, category, price, quantity
- Implement Inventory class using multiple collection types simultaneously:
  - ArrayList<Product> for main product list (random access, maintains insertion order)
  - HashSet<String> for unique product IDs (O(1) contains check)
  - TreeSet<Product> for price-sorted view (automatic sorting)
  - LinkedList<Transaction> for transaction history (frequent head insertions)
- Support operations: addProduct, removeProduct, updateProduct, getProduct
- Implement searchByName(String keyword) scanning through ArrayList
- Create getProductsByCategory(String category) filtering products
- Add getProductsSortedByPrice() returning TreeSet view
- Implement recordTransaction() adding to LinkedList head (recent first)
- Create performance comparison: measureSearchTime, measureInsertTime, measureIterationTime
- Compare ArrayList vs LinkedList for: iteration, random access, head insertion
- Compare ArrayList vs HashSet for: contains() operation
- Compare ArrayList vs TreeSet for: sorting and sorted iteration
- Demonstrate when ArrayList is best (random access, iteration)
- Show when LinkedList is best (frequent head/tail insertions)
- Prove HashSet superiority for membership testing
- Display TreeSet benefits for maintaining sorted order
- Include timing measurements in milliseconds for operations

**Sample Test Cases:**
```
Input: Add products to inventory
Expected Output:
=== Inventory Management System ===

Adding Products:
✓ Product added: [P001] Laptop
  Category: Electronics | Price: $999.99 | Quantity: 10

✓ Product added: [P002] Mouse
  Category: Electronics | Price: $25.50 | Quantity: 50

✓ Product added: [P003] Desk Chair
  Category: Furniture | Price: $150.00 | Quantity: 20

✓ Product added: [P004] Notebook
  Category: Stationery | Price: $5.99 | Quantity: 100

✓ Product added: [P005] Monitor
  Category: Electronics | Price: $299.99 | Quantity: 15

Total products: 5
Unique product IDs tracked: 5

Input: Try adding duplicate product ID
Expected Output:
Attempting to add product with ID P003...
✗ Product ID P003 already exists
Cannot add duplicate product ID

Input: Get products sorted by price
Expected Output:
=== Products Sorted by Price ===
1. [P004] Notebook - $5.99
2. [P002] Mouse - $25.50
3. [P005] Monitor - $299.99
4. [P003] Desk Chair - $150.00
5. [P001] Laptop - $999.99

Input: Record transactions
Expected Output:
=== Recording Transactions ===
Transaction recorded: SALE | P001 | Qty: 2 | Time: 10:30:45
Transaction recorded: PURCHASE | P002 | Qty: 20 | Time: 11:15:22
Transaction recorded: SALE | P004 | Qty: 5 | Time: 14:20:10

Recent Transactions (Most Recent First):
1. [14:20:10] SALE: P004 - Quantity: 5
2. [11:15:22] PURCHASE: P002 - Quantity: 20
3. [10:30:45] SALE: P001 - Quantity: 2

Input: Performance comparison - Search operation
Expected Output:
=== Performance Test: Search for Product ID ===

Dataset: 10,000 products

Test: Check if product ID exists

ArrayList contains():
  Time: 2.45 ms
  Complexity: O(n)

HashSet contains():
  Time: 0.003 ms
  Complexity: O(1)

Result: HashSet is 817x faster than ArrayList for membership testing

Input: Performance comparison - Iteration
Expected Output:
=== Performance Test: Iterate All Products ===

Dataset: 10,000 products

ArrayList iteration:
  Time: 1.2 ms
  Complexity: O(n)

LinkedList iteration (enhanced for):
  Time: 1.3 ms
  Complexity: O(n)

LinkedList iteration (get(i)):
  Time: 4523.7 ms
  Complexity: O(n²)

Result: ArrayList and LinkedList similar for iteration
Warning: Never use index-based loop with LinkedList!

Input: Performance comparison - Head insertion
Expected Output:
=== Performance Test: Insert at Beginning ===

Dataset: 10,000 insertions at index 0

ArrayList add(0, element):
  Time: 1245.8 ms
  Complexity: O(n) per insertion
  Reason: Shifts all elements right

LinkedList addFirst(element):
  Time: 2.1 ms
  Complexity: O(1) per insertion
  Reason: Just updates head pointer

Result: LinkedList is 593x faster for head insertion
```

**Solution:**
```java
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

// ============= Product Class =============

class Product {
    private String productId;
    private String name;
    private String category;
    private double price;
    private int quantity;

    public Product(String productId, String name, String category, double price, int quantity) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    public String getProductId() { return productId; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }

    public void setPrice(double price) { this.price = price; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    @Override
    public String toString() {
        return String.format("[%s] %s - $%.2f (Qty: %d, Category: %s)",
            productId, name, price, quantity, category);
    }
}

// ============= Transaction Class =============

class Transaction {
    private String transactionId;
    private String productId;
    private String type;  // SALE, PURCHASE, RETURN
    private int quantity;
    private LocalTime timestamp;

    public Transaction(String transactionId, String productId, String type, int quantity) {
        this.transactionId = transactionId;
        this.productId = productId;
        this.type = type;
        this.quantity = quantity;
        this.timestamp = LocalTime.now();
    }

    public String getProductId() { return productId; }
    public String getType() { return type; }
    public int getQuantity() { return quantity; }
    public LocalTime getTimestamp() { return timestamp; }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        return String.format("[%s] %s: %s - Quantity: %d",
            timestamp.format(formatter), type, productId, quantity);
    }
}

// ============= Inventory System =============

class Inventory {
    private ArrayList<Product> products;  // Main storage, insertion order
    private HashSet<String> productIds;  // O(1) duplicate check
    private LinkedList<Transaction> transactions;  // Frequent head insertion
    private int transactionCounter;

    public Inventory() {
        this.products = new ArrayList<>();
        this.productIds = new HashSet<>();
        this.transactions = new LinkedList<>();
        this.transactionCounter = 1;
    }

    public boolean addProduct(Product product) {
        // Check for duplicate using HashSet (O(1))
        if (productIds.contains(product.getProductId())) {
            System.out.println("✗ Product ID " + product.getProductId() + " already exists");
            System.out.println("Cannot add duplicate product ID\n");
            return false;
        }

        products.add(product);
        productIds.add(product.getProductId());

        System.out.println("✓ Product added: [" + product.getProductId() + "] " + product.getName());
        System.out.println("  Category: " + product.getCategory() +
            " | Price: $" + String.format("%.2f", product.getPrice()) +
            " | Quantity: " + product.getQuantity());
        System.out.println();

        return true;
    }

    public boolean removeProduct(String productId) {
        products.removeIf(p -> p.getProductId().equals(productId));
        return productIds.remove(productId);
    }

    public Product getProduct(String productId) {
        for (Product product : products) {
            if (product.getProductId().equals(productId)) {
                return product;
            }
        }
        return null;
    }

    public List<Product> searchByName(String keyword) {
        List<Product> results = new ArrayList<>();
        String lowerKeyword = keyword.toLowerCase();

        for (Product product : products) {
            if (product.getName().toLowerCase().contains(lowerKeyword)) {
                results.add(product);
            }
        }

        return results;
    }

    public List<Product> getProductsByCategory(String category) {
        List<Product> results = new ArrayList<>();

        for (Product product : products) {
            if (product.getCategory().equals(category)) {
                results.add(product);
            }
        }

        return results;
    }

    // TreeSet automatically sorts products by price
    public TreeSet<Product> getProductsSortedByPrice() {
        TreeSet<Product> sorted = new TreeSet<>((p1, p2) -> {
            int priceCompare = Double.compare(p1.getPrice(), p2.getPrice());
            if (priceCompare != 0) return priceCompare;
            return p1.getProductId().compareTo(p2.getProductId());  // Prevent duplicates
        });

        sorted.addAll(products);
        return sorted;
    }

    public void recordTransaction(String productId, String type, int quantity) {
        String txnId = String.format("TXN-%04d", transactionCounter++);
        Transaction transaction = new Transaction(txnId, productId, type, quantity);

        // Add to head of LinkedList (O(1))
        transactions.addFirst(transaction);

        System.out.println("Transaction recorded: " + type + " | " + productId +
            " | Qty: " + quantity + " | Time: " + transaction.getTimestamp().format(
                DateTimeFormatter.ofPattern("HH:mm:ss")));
    }

    public List<Transaction> getRecentTransactions(int count) {
        List<Transaction> recent = new ArrayList<>();
        int limit = Math.min(count, transactions.size());

        for (int i = 0; i < limit; i++) {
            recent.add(transactions.get(i));
        }

        return recent;
    }

    public int getProductCount() {
        return products.size();
    }

    public int getUniqueIdCount() {
        return productIds.size();
    }

    // Performance testing methods
    public long measureArrayListSearch(String productId, int iterations) {
        long start = System.nanoTime();

        for (int i = 0; i < iterations; i++) {
            boolean found = false;
            for (Product p : products) {
                if (p.getProductId().equals(productId)) {
                    found = true;
                    break;
                }
            }
        }

        long end = System.nanoTime();
        return (end - start) / 1_000_000;  // Convert to milliseconds
    }

    public long measureHashSetSearch(String productId, int iterations) {
        long start = System.nanoTime();

        for (int i = 0; i < iterations; i++) {
            productIds.contains(productId);
        }

        long end = System.nanoTime();
        return (end - start) / 1_000_000;
    }
}

// ============= Performance Tester =============

class PerformanceTester {
    public static void compareSearchPerformance() {
        System.out.println("\n=== Performance Test: Search for Product ID ===\n");

        Inventory inventory = new Inventory();
        int size = 10000;

        // Populate inventory
        System.out.println("Dataset: " + size + " products\n");
        for (int i = 0; i < size; i++) {
            Product p = new Product("P" + i, "Product" + i, "Category" + (i % 10),
                10.0 + i, 100);
            inventory.addProduct(p);
        }

        String searchId = "P" + (size - 1);  // Search for last item (worst case)
        int iterations = 10000;

        System.out.println("Test: Check if product ID exists\n");

        // ArrayList search
        long arrayListTime = inventory.measureArrayListSearch(searchId, iterations);
        System.out.println("ArrayList contains():");
        System.out.println("  Time: " + (arrayListTime / (double)iterations) + " ms");
        System.out.println("  Complexity: O(n)\n");

        // HashSet search
        long hashSetTime = inventory.measureHashSetSearch(searchId, iterations);
        System.out.println("HashSet contains():");
        System.out.println("  Time: " + (hashSetTime / (double)iterations) + " ms");
        System.out.println("  Complexity: O(1)\n");

        double speedup = arrayListTime / (double)Math.max(hashSetTime, 1);
        System.out.println("Result: HashSet is " + String.format("%.0f", speedup) +
            "x faster than ArrayList for membership testing");
    }

    public static void compareIteration() {
        System.out.println("\n=== Performance Test: Iterate All Products ===\n");

        int size = 10000;
        System.out.println("Dataset: " + size + " products\n");

        // ArrayList iteration
        ArrayList<Integer> arrayList = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            arrayList.add(i);
        }

        long start = System.nanoTime();
        for (int num : arrayList) {
            int x = num * 2;  // Simulated work
        }
        long arrayListTime = (System.nanoTime() - start) / 1_000_000;

        System.out.println("ArrayList iteration:");
        System.out.println("  Time: " + arrayListTime + " ms");
        System.out.println("  Complexity: O(n)\n");

        // LinkedList iteration (enhanced for)
        LinkedList<Integer> linkedList = new LinkedList<>(arrayList);

        start = System.nanoTime();
        for (int num : linkedList) {
            int x = num * 2;
        }
        long linkedListTime = (System.nanoTime() - start) / 1_000_000;

        System.out.println("LinkedList iteration (enhanced for):");
        System.out.println("  Time: " + linkedListTime + " ms");
        System.out.println("  Complexity: O(n)\n");

        // LinkedList iteration (index-based) - BAD
        start = System.nanoTime();
        for (int i = 0; i < Math.min(1000, linkedList.size()); i++) {  // Only 1000 for demo
            int x = linkedList.get(i) * 2;
        }
        long linkedListIndexTime = (System.nanoTime() - start) / 1_000_000;
        linkedListIndexTime = linkedListIndexTime * 10;  // Extrapolate

        System.out.println("LinkedList iteration (get(i)):");
        System.out.println("  Time: " + linkedListIndexTime + " ms (estimated)");
        System.out.println("  Complexity: O(n²)\n");

        System.out.println("Result: ArrayList and LinkedList similar for iteration");
        System.out.println("Warning: Never use index-based loop with LinkedList!");
    }

    public static void compareHeadInsertion() {
        System.out.println("\n=== Performance Test: Insert at Beginning ===\n");

        int size = 10000;
        System.out.println("Dataset: " + size + " insertions at index 0\n");

        // ArrayList head insertion
        ArrayList<Integer> arrayList = new ArrayList<>();
        long start = System.nanoTime();

        for (int i = 0; i < size; i++) {
            arrayList.add(0, i);  // Insert at beginning
        }

        long arrayListTime = (System.nanoTime() - start) / 1_000_000;

        System.out.println("ArrayList add(0, element):");
        System.out.println("  Time: " + arrayListTime + " ms");
        System.out.println("  Complexity: O(n) per insertion");
        System.out.println("  Reason: Shifts all elements right\n");

        // LinkedList head insertion
        LinkedList<Integer> linkedList = new LinkedList<>();
        start = System.nanoTime();

        for (int i = 0; i < size; i++) {
            linkedList.addFirst(i);
        }

        long linkedListTime = (System.nanoTime() - start) / 1_000_000;

        System.out.println("LinkedList addFirst(element):");
        System.out.println("  Time: " + linkedListTime + " ms");
        System.out.println("  Complexity: O(1) per insertion");
        System.out.println("  Reason: Just updates head pointer\n");

        double speedup = arrayListTime / (double)Math.max(linkedListTime, 1);
        System.out.println("Result: LinkedList is " + String.format("%.0f", speedup) +
            "x faster for head insertion");
    }
}

// ============= Demo Application =============

public class TestInventoryManagement {
    public static void main(String[] args) {
        System.out.println("=== Inventory Management System ===\n");

        Inventory inventory = new Inventory();

        // Add products
        System.out.println("Adding Products:");
        inventory.addProduct(new Product("P001", "Laptop", "Electronics", 999.99, 10));
        inventory.addProduct(new Product("P002", "Mouse", "Electronics", 25.50, 50));
        inventory.addProduct(new Product("P003", "Desk Chair", "Furniture", 150.00, 20));
        inventory.addProduct(new Product("P004", "Notebook", "Stationery", 5.99, 100));
        inventory.addProduct(new Product("P005", "Monitor", "Electronics", 299.99, 15));

        System.out.println("Total products: " + inventory.getProductCount());
        System.out.println("Unique product IDs tracked: " + inventory.getUniqueIdCount());
        System.out.println();

        // Try duplicate
        System.out.println("Attempting to add product with ID P003...");
        inventory.addProduct(new Product("P003", "Another Chair", "Furniture", 200.00, 5));

        // Get sorted by price
        System.out.println("=== Products Sorted by Price ===");
        TreeSet<Product> sorted = inventory.getProductsSortedByPrice();
        int index = 1;
        for (Product p : sorted) {
            System.out.println(index++ + ". [" + p.getProductId() + "] " +
                p.getName() + " - $" + String.format("%.2f", p.getPrice()));
        }

        // Record transactions
        System.out.println("\n=== Recording Transactions ===");
        inventory.recordTransaction("P001", "SALE", 2);
        inventory.recordTransaction("P002", "PURCHASE", 20);
        inventory.recordTransaction("P004", "SALE", 5);

        System.out.println("\nRecent Transactions (Most Recent First):");
        List<Transaction> recent = inventory.getRecentTransactions(3);
        for (int i = 0; i < recent.size(); i++) {
            System.out.println((i + 1) + ". " + recent.get(i));
        }

        // Performance comparisons
        PerformanceTester.compareSearchPerformance();
        PerformanceTester.compareIteration();
        PerformanceTester.compareHeadInsertion();
    }
}
```

**💡 Tips:**
- ArrayList best for: random access (get(i)), iteration, tail insertion (add()), general-purpose use
- LinkedList best for: frequent head/tail insertion (addFirst/addLast), queue/deque operations, never index-based loops
- HashSet best for: membership testing (contains), ensuring uniqueness, set operations (union/intersection)
- TreeSet best for: maintaining sorted order automatically, range queries (headSet/tailSet), no manual sorting
- ArrayList.contains() is O(n): scans entire list linearly, slow for large datasets
- HashSet.contains() is O(1): hash table lookup, 100-1000x faster than ArrayList for membership
- LinkedList.get(i) is O(n): traverses from head/tail to index, creates O(n²) complexity in loops
- Enhanced for-loop uses iterator: O(1) per element for all collection types, always preferred
- TreeSet uses Comparator: must compare all fields used in equals() to prevent unexpected duplicates
- System.nanoTime() for benchmarking: more precise than currentTimeMillis() for performance measurement
- Defensive copying importance: getRecentTransactions() returns new ArrayList preventing external modification
- Collection choice impacts performance: right collection makes orders of magnitude difference in speed
- Pre-allocation helps ArrayList: new ArrayList<>(expectedSize) reduces resize operations
- LinkedList for recent-first order: addFirst() + iteration gives natural chronological view

---

### Beginner Exercises

#### Exercise 1: ArrayList Practice - Student Grade Manager
**Difficulty:** Beginner

**Objective:** Practice basic ArrayList operations including add, remove, get, set, and iteration.

**Requirements:**
- Create an ArrayList to store student grades (Integer)
- Add 5 grades to the list: 85, 92, 78, 95, 88
- Display all grades using a for-each loop
- Calculate and display the average grade
- Find and display the highest grade using a loop
- Remove the lowest grade from the list
- Update the second grade to 90
- Display the final list

**Expected Outcome:**
```
Original Grades: [85, 92, 78, 95, 88]
Average Grade: 87.6
Highest Grade: 95
Lowest Grade: 78
After Removing Lowest: [85, 92, 95, 88]
After Updating Second Grade: [85, 90, 95, 88]
```

**Hints:**
- Use `Collections.max()` and `Collections.min()` to find highest/lowest
- Use `list.set(index, value)` to update an element
- Use `list.remove(Object)` to remove by value

---

#### Exercise 2: LinkedList Practice - Browser History
**Difficulty:** Beginner

**Objective:** Understand LinkedList operations and practice using it as a queue/deque.

**Requirements:**
- Create a LinkedList to simulate browser history
- Add these URLs in order: "google.com", "facebook.com", "twitter.com"
- Add a new URL at the beginning: "home.com"
- Add a new URL at the end: "linkedin.com"
- Display the first URL (current page) without removing it
- Display the last URL without removing it
- Go back by removing the current page (first element)
- Display the new current page
- Display all pages in history order

**Expected Outcome:**
```
Browser History: [home.com, google.com, facebook.com, twitter.com, linkedin.com]
Current Page: home.com
Last Page: linkedin.com
Going back...
New Current Page: google.com
Final History: [google.com, facebook.com, twitter.com, linkedin.com]
```

**Hints:**
- Use `addFirst()` and `addLast()` for beginning/end operations
- Use `getFirst()` and `getLast()` to view without removing
- Use `removeFirst()` to simulate going back

---

#### Exercise 3: HashSet Practice - Remove Duplicate Numbers
**Difficulty:** Easy

**Objective:** Practice HashSet to remove duplicates and understand Set properties.

**Requirements:**
- Create an ArrayList with duplicate numbers: [5, 2, 8, 2, 9, 5, 3, 8, 1]
- Display the original list
- Convert the ArrayList to a HashSet to remove duplicates
- Display the HashSet (notice the order)
- Convert back to ArrayList
- Sort the ArrayList using Collections.sort()
- Display the final sorted list without duplicates

**Expected Outcome:**
```
Original List: [5, 2, 8, 2, 9, 5, 3, 8, 1]
Original Size: 9
HashSet (duplicates removed): [1, 2, 3, 5, 8, 9]
HashSet Size: 6
Sorted List: [1, 2, 3, 5, 8, 9]
Duplicates removed: 3
```

**Hints:**
- Use `new HashSet<>(list)` to convert list to set
- Use `new ArrayList<>(set)` to convert set back to list
- Use `Collections.sort()` to sort the list

---

#### Exercise 4: LinkedHashSet Practice - Unique Words Tracker
**Difficulty:** Easy

**Objective:** Use LinkedHashSet to maintain unique elements in insertion order.

**Requirements:**
- Create a String: "Java is fun Java is powerful Java is everywhere"
- Split the string into words
- Store words in a LinkedHashSet to keep unique words in order
- Display the unique words in insertion order
- Display the count of unique words
- Check if "Java" exists in the set
- Remove the word "is" from the set
- Display the final unique words

**Expected Outcome:**
```
Original Text: Java is fun Java is powerful Java is everywhere
All Words: [Java, is, fun, Java, is, powerful, Java, is, everywhere]
Unique Words (insertion order): [Java, is, fun, powerful, everywhere]
Count of Unique Words: 5
Contains 'Java': true
After Removing 'is': [Java, fun, powerful, everywhere]
Final Count: 4
```

**Hints:**
- Use `split(" ")` to split the string
- Use LinkedHashSet to maintain insertion order
- Use `contains()` to check existence
- Use `remove()` to remove an element

---

#### Exercise 5: TreeSet Practice - Sorted Integer Operations
**Difficulty:** Medium

**Objective:** Practice TreeSet operations and understand automatic sorting.

**Requirements:**
- Create a TreeSet of Integer
- Add numbers in random order: 50, 20, 80, 10, 90, 30, 70, 40
- Display the TreeSet (notice automatic sorting)
- Display the first (smallest) and last (largest) elements
- Display all elements less than 50 using headSet()
- Display all elements from 40 onwards using tailSet()
- Display elements between 30 and 70 using subSet()
- Remove all elements less than 40
- Display the final TreeSet

**Expected Outcome:**
```
Original TreeSet: [10, 20, 30, 40, 50, 70, 80, 90]
First Element: 10
Last Element: 90
Elements < 50: [10, 20, 30, 40]
Elements >= 40: [40, 50, 70, 80, 90]
Elements between 30 and 70: [30, 40, 50]
After Removing < 40: [40, 50, 70, 80, 90]
```

**Hints:**
- TreeSet automatically sorts elements
- Use `first()` and `last()` for extremes
- Use `headSet(value)` for elements < value
- Use `tailSet(value)` for elements >= value
- Use `subSet(from, to)` for range [from, to)
- Use `removeIf()` or create subSet and clear

---

#### Exercise 6: List vs Set Comparison - Student Registration
**Difficulty:** Medium

**Objective:** Understand when to use List vs Set through a practical example.

**Requirements:**
- Create a scenario where students register for a course
- Use ArrayList to track all registration attempts (allows duplicates)
- Use HashSet to track unique students registered
- Add these registration attempts: "Alice", "Bob", "Alice", "Charlie", "Bob", "David"
- Display all registration attempts (ArrayList)
- Display unique registered students (HashSet)
- Show how many duplicate registrations were attempted
- Check if "Alice" is registered using both collections
- Display performance note about HashSet.contains() vs ArrayList.contains()

**Expected Outcome:**
```
=== Student Registration System ===

All Registration Attempts (ArrayList): [Alice, Bob, Alice, Charlie, Bob, David]
Total Attempts: 6

Unique Students Registered (HashSet): [Alice, Bob, Charlie, David]
Total Unique Students: 4

Duplicate Registrations: 2

Checking if Alice is registered:
- Using ArrayList.contains(): true (O(n) - checks each element)
- Using HashSet.contains(): true (O(1) - hash table lookup)

HashSet is faster for membership testing!
```

**Hints:**
- Compare ArrayList size vs HashSet size to find duplicates
- `contains()` works on both List and Set
- HashSet uses hashing for O(1) lookup
- ArrayList requires O(n) linear search

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