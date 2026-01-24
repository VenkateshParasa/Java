## Day 21: Collections Framework - Map & Utilities

### 🎯 Learning Objectives
By the end of Day 21, you will:
- Understand and use HashMap for key-value storage
- Perform HashMap operations (put, get, remove, iteration)
- Compare LinkedHashMap and TreeMap
- Use Collections utility class methods
- Implement Comparable and Comparator interfaces
- Build real-world applications using Maps and utilities

### 📚 Topics Covered
1. HashMap Basics
2. HashMap Operations and Iteration
3. LinkedHashMap vs TreeMap
4. Collections Utility Class
5. Comparable vs Comparator
6. Real-World Application (Inventory Management)

---

#### Exercise 1: HashMap Basics (20 minutes)

**What you'll learn:** How to use HashMap for key-value pair storage and basic operations

**Create class: `HashMapBasicsDemo`**

**Concept:** HashMap stores data as key-value pairs, allowing fast lookup, insertion, and deletion by key.

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapBasicsDemo {

    static void demonstrateBasicOperations() {
        System.out.println("\n--- HashMap Basic Operations ---");

        // Create HashMap
        HashMap<String, Integer> studentGrades = new HashMap<>();

        // put() - Add key-value pairs
        System.out.println("\nAdding students and grades:");
        studentGrades.put("Alice", 95);
        studentGrades.put("Bob", 87);
        studentGrades.put("Charlie", 92);
        studentGrades.put("Diana", 88);
        System.out.println("✅ Added 4 students");
        System.out.println("HashMap: " + studentGrades);

        // get() - Retrieve value by key
        System.out.println("\n--- Getting Values ---");
        String student = "Alice";
        Integer grade = studentGrades.get(student);
        System.out.println(student + "'s grade: " + grade);

        student = "Bob";
        System.out.println(student + "'s grade: " + studentGrades.get(student));

        // get() with non-existent key returns null
        student = "Eve";
        grade = studentGrades.get(student);
        System.out.println(student + "'s grade: " + grade + " (not found)");

        // containsKey() - Check if key exists
        System.out.println("\n--- Checking Keys ---");
        System.out.println("Contains 'Alice'? " + studentGrades.containsKey("Alice"));
        System.out.println("Contains 'Eve'? " + studentGrades.containsKey("Eve"));

        // containsValue() - Check if value exists
        System.out.println("\n--- Checking Values ---");
        System.out.println("Contains grade 95? " + studentGrades.containsValue(95));
        System.out.println("Contains grade 100? " + studentGrades.containsValue(100));

        // size() - Get number of entries
        System.out.println("\n--- Size ---");
        System.out.println("Total students: " + studentGrades.size());

        // Updating existing key (replaces value)
        System.out.println("\n--- Updating Value ---");
        System.out.println("Alice's old grade: " + studentGrades.get("Alice"));
        studentGrades.put("Alice", 98);  // Updates existing key
        System.out.println("Alice's new grade: " + studentGrades.get("Alice"));
    }

    static void demonstrateIteration() {
        System.out.println("\n--- HashMap Iteration ---");

        HashMap<String, String> capitals = new HashMap<>();
        capitals.put("USA", "Washington D.C.");
        capitals.put("UK", "London");
        capitals.put("France", "Paris");
        capitals.put("Japan", "Tokyo");
        capitals.put("India", "New Delhi");

        System.out.println("\nOriginal HashMap: " + capitals);

        // Method 1: Iterate using keySet()
        System.out.println("\n--- Method 1: Using keySet() ---");
        for (String country : capitals.keySet()) {
            String capital = capitals.get(country);
            System.out.println(country + " -> " + capital);
        }

        // Method 2: Iterate using entrySet() (RECOMMENDED)
        System.out.println("\n--- Method 2: Using entrySet() (Best) ---");
        for (Map.Entry<String, String> entry : capitals.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }

        // Method 3: Iterate using forEach (Java 8+)
        System.out.println("\n--- Method 3: Using forEach ---");
        capitals.forEach((country, capital) ->
            System.out.println(country + " -> " + capital)
        );
    }

    static void demonstrateGetOrDefault() {
        System.out.println("\n--- getOrDefault() Method ---");

        HashMap<String, Integer> inventory = new HashMap<>();
        inventory.put("Apples", 50);
        inventory.put("Bananas", 30);
        inventory.put("Oranges", 25);

        System.out.println("\nInventory: " + inventory);

        // getOrDefault() - Returns default if key not found
        System.out.println("\nApples: " + inventory.getOrDefault("Apples", 0));
        System.out.println("Grapes: " + inventory.getOrDefault("Grapes", 0) + " (default)");

        // Useful for counting
        System.out.println("\n--- Safe Increment Pattern ---");
        String item = "Apples";
        int current = inventory.getOrDefault(item, 0);
        inventory.put(item, current + 10);
        System.out.println("After adding 10 apples: " + inventory.get(item));
    }

    static void demonstratePutIfAbsent() {
        System.out.println("\n--- putIfAbsent() Method ---");

        HashMap<String, String> usernames = new HashMap<>();
        usernames.put("alice", "alice@example.com");
        usernames.put("bob", "bob@example.com");

        System.out.println("\nOriginal usernames: " + usernames);

        // putIfAbsent() - Only adds if key doesn't exist
        System.out.println("\n--- Testing putIfAbsent ---");

        String result = usernames.putIfAbsent("charlie", "charlie@example.com");
        System.out.println("Adding charlie: " + result + " (null = added)");

        result = usernames.putIfAbsent("alice", "newalice@example.com");
        System.out.println("Trying to add alice again: " + result + " (existing value)");

        System.out.println("\nFinal usernames: " + usernames);
    }

    public static void main(String[] args) {
        System.out.println("===== HASHMAP BASICS =====\n");

        // Basic operations
        demonstrateBasicOperations();

        // Iteration methods
        demonstrateIteration();

        // getOrDefault usage
        demonstrateGetOrDefault();

        // putIfAbsent usage
        demonstratePutIfAbsent();

        System.out.println("\n💡 HashMap Key Points:");
        System.out.println("   ✅ Stores key-value pairs");
        System.out.println("   ✅ Keys must be unique");
        System.out.println("   ✅ Fast lookup O(1) average");
        System.out.println("   ✅ Allows one null key");
        System.out.println("   ✅ Allows multiple null values");
        System.out.println("   ✅ No guaranteed order");

        System.out.println("\n💡 Common Methods:");
        System.out.println("   put(key, value) - Add/update");
        System.out.println("   get(key) - Retrieve value");
        System.out.println("   containsKey(key) - Check key");
        System.out.println("   remove(key) - Delete entry");
        System.out.println("   size() - Get count");
        System.out.println("   clear() - Remove all");

        System.out.println("\n=========================");
    }
}
```

**Expected Output:**
```
===== HASHMAP BASICS =====

--- HashMap Basic Operations ---

Adding students and grades:
✅ Added 4 students
HashMap: {Bob=87, Alice=95, Charlie=92, Diana=88}

--- Getting Values ---
Alice's grade: 95
Bob's grade: 87
Eve's grade: null (not found)

--- Checking Keys ---
Contains 'Alice'? true
Contains 'Eve'? false

--- Checking Values ---
Contains grade 95? true
Contains grade 100? false

--- Size ---
Total students: 4

--- Updating Value ---
Alice's old grade: 95
Alice's new grade: 98

--- HashMap Iteration ---

Original HashMap: {USA=Washington D.C., France=Paris, UK=London, Japan=Tokyo, India=New Delhi}

--- Method 1: Using keySet() ---
USA -> Washington D.C.
France -> Paris
UK -> London
Japan -> Tokyo
India -> New Delhi

--- Method 2: Using entrySet() (Best) ---
USA -> Washington D.C.
France -> Paris
UK -> London
Japan -> Tokyo
India -> New Delhi

--- Method 3: Using forEach ---
USA -> Washington D.C.
France -> Paris
UK -> London
Japan -> Tokyo
India -> New Delhi

--- getOrDefault() Method ---

Inventory: {Oranges=25, Apples=50, Bananas=30}

Apples: 50
Grapes: 0 (default)

--- Safe Increment Pattern ---
After adding 10 apples: 60

--- putIfAbsent() Method ---

Original usernames: {bob=bob@example.com, alice=alice@example.com}

--- Testing putIfAbsent ---
Adding charlie: null (null = added)
Trying to add alice again: alice@example.com (existing value)

Final usernames: {bob=bob@example.com, alice=alice@example.com, charlie=charlie@example.com}

💡 HashMap Key Points:
   ✅ Stores key-value pairs
   ✅ Keys must be unique
   ✅ Fast lookup O(1) average
   ✅ Allows one null key
   ✅ Allows multiple null values
   ✅ No guaranteed order

💡 Common Methods:
   put(key, value) - Add/update
   get(key) - Retrieve value
   containsKey(key) - Check key
   remove(key) - Delete entry
   size() - Get count
   clear() - Remove all

=========================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **HashMap** | Key-value pair storage structure |
| **Key** | Unique identifier for value |
| **Value** | Data associated with key |
| **put()** | Add or update entry |
| **get()** | Retrieve value by key |

**✅ Success Criteria:**
- [ ] Can create and populate HashMap
- [ ] Use put() and get() methods
- [ ] Check keys with containsKey()
- [ ] Iterate using different methods
- [ ] Use getOrDefault() for safe access
- [ ] Understand HashMap characteristics

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| `get()` without null check | Can cause NullPointerException | Use `getOrDefault()` or check null |
| Using keySet() for full iteration | Less efficient, two lookups | Use `entrySet()` |
| Mutable keys | Can break HashMap | Use immutable keys (String, Integer) |
| Expecting order | HashMap is unordered | Use LinkedHashMap for order |

**🎯 Challenge:**
1. Create phone book HashMap (name -> phone)
2. Add 5 contacts
3. Search by name
4. Count total contacts
5. List all names and numbers
6. Handle non-existent names gracefully

---

#### Exercise 2: HashMap Operations (20 minutes)

**What you'll learn:** Advanced HashMap operations including remove, keySet, values, and entrySet

**Create class: `HashMapOperationsDemo`**

**Concept:** HashMap provides various methods to manipulate and access data efficiently.

```java
import java.util.*;

public class HashMapOperationsDemo {

    static void demonstrateRemoveOperations() {
        System.out.println("\n--- Remove Operations ---");

        HashMap<String, Double> prices = new HashMap<>();
        prices.put("Laptop", 999.99);
        prices.put("Mouse", 29.99);
        prices.put("Keyboard", 79.99);
        prices.put("Monitor", 299.99);
        prices.put("Headphones", 149.99);

        System.out.println("Original prices: " + prices);
        System.out.println("Size: " + prices.size());

        // remove(key) - Remove entry by key
        System.out.println("\n--- remove(key) ---");
        Double removed = prices.remove("Mouse");
        System.out.println("Removed Mouse: $" + removed);
        System.out.println("Updated prices: " + prices);
        System.out.println("Size: " + prices.size());

        // remove(key, value) - Remove only if value matches
        System.out.println("\n--- remove(key, value) ---");
        boolean success = prices.remove("Laptop", 999.99);
        System.out.println("Removed Laptop with exact price? " + success);

        success = prices.remove("Monitor", 199.99);  // Wrong price
        System.out.println("Removed Monitor with wrong price? " + success);

        System.out.println("Final prices: " + prices);
    }

    static void demonstrateKeySetOperations() {
        System.out.println("\n--- keySet() Operations ---");

        HashMap<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 35);
        ages.put("Diana", 28);

        System.out.println("Original ages: " + ages);

        // Get all keys
        Set<String> keys = ages.keySet();
        System.out.println("\nAll names (keys): " + keys);

        // Count keys
        System.out.println("Total people: " + keys.size());

        // Check if key exists
        System.out.println("\n--- Searching Keys ---");
        for (String name : new String[]{"Alice", "Eve", "Bob"}) {
            if (keys.contains(name)) {
                System.out.println("✅ " + name + " found, age: " + ages.get(name));
            } else {
                System.out.println("❌ " + name + " not found");
            }
        }

        // Convert keys to ArrayList
        System.out.println("\n--- Keys as ArrayList ---");
        ArrayList<String> nameList = new ArrayList<>(keys);
        Collections.sort(nameList);
        System.out.println("Sorted names: " + nameList);
    }

    static void demonstrateValuesOperations() {
        System.out.println("\n--- values() Operations ---");

        HashMap<String, Integer> scores = new HashMap<>();
        scores.put("Level1", 100);
        scores.put("Level2", 150);
        scores.put("Level3", 200);
        scores.put("Level4", 175);
        scores.put("Level5", 225);

        System.out.println("Game scores: " + scores);

        // Get all values
        Collection<Integer> values = scores.values();
        System.out.println("\nAll scores (values): " + values);

        // Calculate statistics
        int sum = 0;
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;

        for (int score : values) {
            sum += score;
            if (score > max) max = score;
            if (score < min) min = score;
        }

        double average = (double) sum / values.size();

        System.out.println("\n--- Score Statistics ---");
        System.out.println("Total Score: " + sum);
        System.out.println("Average Score: " + String.format("%.2f", average));
        System.out.println("Highest Score: " + max);
        System.out.println("Lowest Score: " + min);

        // Check if value exists
        System.out.println("\n--- Checking Values ---");
        System.out.println("Has score of 200? " + values.contains(200));
        System.out.println("Has score of 300? " + values.contains(300));
    }

    static void demonstrateEntrySetOperations() {
        System.out.println("\n--- entrySet() Operations ---");

        HashMap<String, String> employees = new HashMap<>();
        employees.put("E001", "Alice Smith");
        employees.put("E002", "Bob Johnson");
        employees.put("E003", "Charlie Brown");
        employees.put("E004", "Diana Prince");

        System.out.println("Employees: " + employees);

        // Get all entries
        Set<Map.Entry<String, String>> entries = employees.entrySet();

        System.out.println("\n--- Iterating Entries ---");
        for (Map.Entry<String, String> entry : entries) {
            String id = entry.getKey();
            String name = entry.getValue();
            System.out.println("Employee ID: " + id + ", Name: " + name);
        }

        // Modify values during iteration
        System.out.println("\n--- Adding Prefix to Names ---");
        for (Map.Entry<String, String> entry : entries) {
            String newValue = "Mr./Ms. " + entry.getValue();
            entry.setValue(newValue);
        }
        System.out.println("Updated employees: " + employees);

        // Filter and collect
        System.out.println("\n--- Filtering Entries ---");
        HashMap<String, String> filtered = new HashMap<>();
        for (Map.Entry<String, String> entry : entries) {
            if (entry.getValue().contains("Brown") || entry.getValue().contains("Smith")) {
                filtered.put(entry.getKey(), entry.getValue());
            }
        }
        System.out.println("Filtered (Smith/Brown): " + filtered);
    }

    static void demonstrateReplaceOperations() {
        System.out.println("\n--- replace() Operations ---");

        HashMap<String, Integer> inventory = new HashMap<>();
        inventory.put("Apples", 50);
        inventory.put("Bananas", 30);
        inventory.put("Oranges", 25);

        System.out.println("Original inventory: " + inventory);

        // replace(key, newValue) - Replace if key exists
        System.out.println("\n--- replace(key, newValue) ---");
        Integer oldValue = inventory.replace("Apples", 60);
        System.out.println("Replaced Apples: old=" + oldValue + ", new=60");

        oldValue = inventory.replace("Grapes", 40);  // Key doesn't exist
        System.out.println("Replace Grapes (doesn't exist): " + oldValue);

        // replace(key, oldValue, newValue) - Replace only if old value matches
        System.out.println("\n--- replace(key, oldValue, newValue) ---");
        boolean success = inventory.replace("Bananas", 30, 35);
        System.out.println("Replaced Bananas (30 -> 35): " + success);

        success = inventory.replace("Oranges", 20, 30);  // Wrong old value
        System.out.println("Replace Oranges (wrong old value): " + success);

        System.out.println("\nFinal inventory: " + inventory);

        // replaceAll() - Update all values
        System.out.println("\n--- replaceAll() - Add 10 to all ---");
        inventory.replaceAll((key, value) -> value + 10);
        System.out.println("After adding 10 to all: " + inventory);
    }

    static void demonstrateClearAndIsEmpty() {
        System.out.println("\n--- clear() and isEmpty() ---");

        HashMap<String, String> cache = new HashMap<>();
        cache.put("key1", "value1");
        cache.put("key2", "value2");
        cache.put("key3", "value3");

        System.out.println("Cache: " + cache);
        System.out.println("Is empty? " + cache.isEmpty());
        System.out.println("Size: " + cache.size());

        // Clear all entries
        cache.clear();
        System.out.println("\n--- After clear() ---");
        System.out.println("Cache: " + cache);
        System.out.println("Is empty? " + cache.isEmpty());
        System.out.println("Size: " + cache.size());
    }

    public static void main(String[] args) {
        System.out.println("===== HASHMAP OPERATIONS =====\n");

        // Remove operations
        demonstrateRemoveOperations();

        // KeySet operations
        demonstrateKeySetOperations();

        // Values operations
        demonstrateValuesOperations();

        // EntrySet operations
        demonstrateEntrySetOperations();

        // Replace operations
        demonstrateReplaceOperations();

        // Clear and isEmpty
        demonstrateClearAndIsEmpty();

        System.out.println("\n💡 HashMap Operation Summary:");
        System.out.println("   remove(key) - Remove by key");
        System.out.println("   remove(key, value) - Remove if value matches");
        System.out.println("   keySet() - Get all keys");
        System.out.println("   values() - Get all values");
        System.out.println("   entrySet() - Get all entries (best for iteration)");
        System.out.println("   replace(key, value) - Update if exists");
        System.out.println("   replaceAll() - Update all values");
        System.out.println("   clear() - Remove all entries");
        System.out.println("   isEmpty() - Check if empty");

        System.out.println("\n=============================");
    }
}
```

**Expected Output:**
```
===== HASHMAP OPERATIONS =====

--- Remove Operations ---
Original prices: {Headphones=149.99, Mouse=29.99, Monitor=299.99, Laptop=999.99, Keyboard=79.99}
Size: 5

--- remove(key) ---
Removed Mouse: $29.99
Updated prices: {Headphones=149.99, Monitor=299.99, Laptop=999.99, Keyboard=79.99}
Size: 4

--- remove(key, value) ---
Removed Laptop with exact price? true
Removed Monitor with wrong price? false
Final prices: {Headphones=149.99, Monitor=299.99, Keyboard=79.99}

--- keySet() Operations ---
Original ages: {Bob=30, Alice=25, Charlie=35, Diana=28}

All names (keys): [Bob, Alice, Charlie, Diana]
Total people: 4

--- Searching Keys ---
✅ Alice found, age: 25
❌ Eve not found
✅ Bob found, age: 30

--- Keys as ArrayList ---
Sorted names: [Alice, Bob, Charlie, Diana]

--- values() Operations ---
Game scores: {Level5=225, Level1=100, Level2=150, Level3=200, Level4=175}

All scores (values): [225, 100, 150, 200, 175]

--- Score Statistics ---
Total Score: 850
Average Score: 170.00
Highest Score: 225
Lowest Score: 100

--- Checking Values ---
Has score of 200? true
Has score of 300? false

--- entrySet() Operations ---
Employees: {E004=Diana Prince, E001=Alice Smith, E002=Bob Johnson, E003=Charlie Brown}

--- Iterating Entries ---
Employee ID: E004, Name: Diana Prince
Employee ID: E001, Name: Alice Smith
Employee ID: E002, Name: Bob Johnson
Employee ID: E003, Name: Charlie Brown

--- Adding Prefix to Names ---
Updated employees: {E004=Mr./Ms. Diana Prince, E001=Mr./Ms. Alice Smith, E002=Mr./Ms. Bob Johnson, E003=Mr./Ms. Charlie Brown}

--- Filtering Entries ---
Filtered (Smith/Brown): {E001=Mr./Ms. Alice Smith, E003=Mr./Ms. Charlie Brown}

--- replace() Operations ---
Original inventory: {Oranges=25, Apples=50, Bananas=30}

--- replace(key, newValue) ---
Replaced Apples: old=50, new=60
Replace Grapes (doesn't exist): null

--- replace(key, oldValue, newValue) ---
Replaced Bananas (30 -> 35): true
Replace Oranges (wrong old value): false

Final inventory: {Oranges=25, Apples=60, Bananas=35}

--- replaceAll() - Add 10 to all ---
After adding 10 to all: {Oranges=35, Apples=70, Bananas=45}

--- clear() and isEmpty() ---
Cache: {key1=value1, key2=value2, key3=value3}
Is empty? false
Size: 3

--- After clear() ---
Cache: {}
Is empty? true
Size: 0

💡 HashMap Operation Summary:
   remove(key) - Remove by key
   remove(key, value) - Remove if value matches
   keySet() - Get all keys
   values() - Get all values
   entrySet() - Get all entries (best for iteration)
   replace(key, value) - Update if exists
   replaceAll() - Update all values
   clear() - Remove all entries
   isEmpty() - Check if empty

=============================
```

**💡 Key Concepts:**

| Concept | Explanation |
|---------|-------------|
| **remove()** | Delete entry by key |
| **keySet()** | Returns Set of all keys |
| **values()** | Returns Collection of all values |
| **entrySet()** | Returns Set of key-value pairs |
| **replace()** | Update existing entries |

**✅ Success Criteria:**
- [ ] Can remove entries from HashMap
- [ ] Access keys using keySet()
- [ ] Access values using values()
- [ ] Use entrySet() for efficient iteration
- [ ] Replace values conditionally
- [ ] Clear and check isEmpty()

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Modifying map during keySet iteration | ConcurrentModificationException | Use Iterator or entrySet() |
| Not checking if remove succeeded | Assumes key exists | Check return value |
| Using values() for key lookup | Can't get key from value | Use entrySet() |
| Forgetting null check on remove | Can return null | Check return value |

**🎯 Challenge:**
1. Create student grades HashMap
2. Add 10 students with grades
3. Remove students with grade < 60
4. Calculate class average
5. Find highest and lowest grades
6. List all students who passed (>= 70)

---

#### Exercise 3: LinkedHashMap and TreeMap (25 minutes)

**What you'll learn:** Differences between HashMap, LinkedHashMap, and TreeMap

**Create class: `MapTypesDemo`**

**Concept:** LinkedHashMap maintains insertion order, TreeMap maintains sorted order, HashMap has no guaranteed order.

```java
import java.util.*;

public class MapTypesDemo {

    static void compareMapTypes() {
        System.out.println("\n--- Comparing HashMap, LinkedHashMap, TreeMap ---");

        // Same data added in same order to all three maps
        String[] keys = {"Zebra", "Apple", "Mango", "Banana", "Orange"};
        int[] values = {5, 3, 4, 2, 1};

        // HashMap - No guaranteed order
        System.out.println("\n--- HashMap (No Order) ---");
        HashMap<String, Integer> hashMap = new HashMap<>();
        for (int i = 0; i < keys.length; i++) {
            hashMap.put(keys[i], values[i]);
        }
        System.out.println("HashMap: " + hashMap);
        System.out.print("Iteration order: ");
        for (String key : hashMap.keySet()) {
            System.out.print(key + " ");
        }
        System.out.println();

        // LinkedHashMap - Maintains insertion order
        System.out.println("\n--- LinkedHashMap (Insertion Order) ---");
        LinkedHashMap<String, Integer> linkedHashMap = new LinkedHashMap<>();
        for (int i = 0; i < keys.length; i++) {
            linkedHashMap.put(keys[i], values[i]);
        }
        System.out.println("LinkedHashMap: " + linkedHashMap);
        System.out.print("Iteration order: ");
        for (String key : linkedHashMap.keySet()) {
            System.out.print(key + " ");
        }
        System.out.println("\n✅ Same order as insertion!");

        // TreeMap - Maintains sorted order (natural ordering)
        System.out.println("\n--- TreeMap (Sorted Order) ---");
        TreeMap<String, Integer> treeMap = new TreeMap<>();
        for (int i = 0; i < keys.length; i++) {
            treeMap.put(keys[i], values[i]);
        }
        System.out.println("TreeMap: " + treeMap);
        System.out.print("Iteration order: ");
        for (String key : treeMap.keySet()) {
            System.out.print(key + " ");
        }
        System.out.println("\n✅ Alphabetically sorted!");
    }

    static void demonstrateLinkedHashMap() {
        System.out.println("\n--- LinkedHashMap Features ---");

        // Useful for maintaining insertion order
        LinkedHashMap<String, String> accessLog = new LinkedHashMap<>();

        System.out.println("\nAdding access logs in order:");
        accessLog.put("10:00 AM", "User Login");
        accessLog.put("10:15 AM", "View Dashboard");
        accessLog.put("10:30 AM", "Edit Profile");
        accessLog.put("10:45 AM", "Upload File");
        accessLog.put("11:00 AM", "User Logout");

        System.out.println("\n--- Access Log (Chronological) ---");
        for (Map.Entry<String, String> entry : accessLog.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }

        // Access order LinkedHashMap
        System.out.println("\n--- Access Order LinkedHashMap ---");
        LinkedHashMap<String, Integer> cache = new LinkedHashMap<>(16, 0.75f, true);

        cache.put("Page1", 100);
        cache.put("Page2", 200);
        cache.put("Page3", 300);

        System.out.println("Initial: " + cache);

        // Access Page1 (moves to end in access-order mode)
        cache.get("Page1");
        System.out.println("After accessing Page1: " + cache);

        cache.get("Page2");
        System.out.println("After accessing Page2: " + cache);
    }

    static void demonstrateTreeMap() {
        System.out.println("\n--- TreeMap Features ---");

        TreeMap<Integer, String> rankings = new TreeMap<>();

        // Add in random order
        System.out.println("\nAdding rankings in random order:");
        rankings.put(5, "Eve");
        rankings.put(1, "Alice");
        rankings.put(3, "Charlie");
        rankings.put(2, "Bob");
        rankings.put(4, "Diana");

        System.out.println("\nTreeMap (auto-sorted by key): " + rankings);

        // TreeMap specific methods
        System.out.println("\n--- TreeMap Specific Methods ---");
        System.out.println("First Entry: " + rankings.firstEntry());
        System.out.println("Last Entry: " + rankings.lastEntry());
        System.out.println("First Key: " + rankings.firstKey());
        System.out.println("Last Key: " + rankings.lastKey());

        // Range operations
        System.out.println("\n--- Range Operations ---");
        System.out.println("Rankings 2-4: " + rankings.subMap(2, 5));
        System.out.println("Rankings < 3: " + rankings.headMap(3));
        System.out.println("Rankings >= 3: " + rankings.tailMap(3));

        // Navigation methods
        System.out.println("\n--- Navigation Methods ---");
        System.out.println("Lower than 3: " + rankings.lowerEntry(3));
        System.out.println("Floor of 3: " + rankings.floorEntry(3));
        System.out.println("Ceiling of 3: " + rankings.ceilingEntry(3));
        System.out.println("Higher than 3: " + rankings.higherEntry(3));

        // Descending order
        System.out.println("\n--- Descending Order ---");
        NavigableMap<Integer, String> descending = rankings.descendingMap();
        System.out.println("Descending: " + descending);
    }

    static void demonstrateTreeMapWithComparator() {
        System.out.println("\n--- TreeMap with Custom Comparator ---");

        // TreeMap with reverse order
        TreeMap<String, Integer> reverseMap = new TreeMap<>(Collections.reverseOrder());

        reverseMap.put("Apple", 5);
        reverseMap.put("Banana", 3);
        reverseMap.put("Cherry", 8);
        reverseMap.put("Date", 2);

        System.out.println("\nReverse alphabetical order: " + reverseMap);

        // TreeMap with length-based sorting
        System.out.println("\n--- Sort by String Length ---");
        TreeMap<String, Integer> lengthMap = new TreeMap<>(
            (s1, s2) -> {
                int lenCompare = Integer.compare(s1.length(), s2.length());
                return lenCompare != 0 ? lenCompare : s1.compareTo(s2);
            }
        );

        lengthMap.put("Hi", 1);
        lengthMap.put("Hello", 2);
        lengthMap.put("Hey", 3);
        lengthMap.put("Greetings", 4);
        lengthMap.put("Hi!", 5);

        System.out.println("Sorted by length: " + lengthMap);
    }

    static void performanceComparison() {
        System.out.println("\n--- Performance Characteristics ---");

        System.out.println("\nHashMap:");
        System.out.println("  - Get: O(1) average");
        System.out.println("  - Put: O(1) average");
        System.out.println("  - Order: None");
        System.out.println("  - Use when: Need fastest operations, order doesn't matter");

        System.out.println("\nLinkedHashMap:");
        System.out.println("  - Get: O(1) average");
        System.out.println("  - Put: O(1) average");
        System.out.println("  - Order: Insertion order (or access order)");
        System.out.println("  - Use when: Need predictable iteration order");

        System.out.println("\nTreeMap:");
        System.out.println("  - Get: O(log n)");
        System.out.println("  - Put: O(log n)");
        System.out.println("  - Order: Sorted by keys");
        System.out.println("  - Use when: Need sorted order or range operations");
    }

    static void whenToUseWhich() {
        System.out.println("\n--- When to Use Which Map ---");

        System.out.println("\n✅ Use HashMap when:");
        System.out.println("   - You need fastest performance");
        System.out.println("   - Order doesn't matter");
        System.out.println("   - Most common choice");
        System.out.println("   Example: User session storage, cache");

        System.out.println("\n✅ Use LinkedHashMap when:");
        System.out.println("   - You need insertion order");
        System.out.println("   - Building LRU cache");
        System.out.println("   - Predictable iteration order needed");
        System.out.println("   Example: Access logs, recent items");

        System.out.println("\n✅ Use TreeMap when:");
        System.out.println("   - You need sorted keys");
        System.out.println("   - Need range operations");
        System.out.println("   - Need first/last operations");
        System.out.println("   Example: Rankings, sorted dictionary");
    }

    public static void main(String[] args) {
        System.out.println("===== MAP TYPES COMPARISON =====\n");

        // Compare all three types
        compareMapTypes();

        // LinkedHashMap features
        demonstrateLinkedHashMap();

        // TreeMap features
        demonstrateTreeMap();

        // TreeMap with custom comparator
        demonstrateTreeMapWithComparator();

        // Performance comparison
        performanceComparison();

        // Usage guidelines
        whenToUseWhich();

        System.out.println("\n💡 Quick Reference:");
        System.out.println("   HashMap - Fast, no order");
        System.out.println("   LinkedHashMap - Fast, insertion order");
        System.out.println("   TreeMap - Slower, sorted order");

        System.out.println("\n===============================");
    }
}
```

**Expected Output:**
```
===== MAP TYPES COMPARISON =====

--- Comparing HashMap, LinkedHashMap, TreeMap ---

--- HashMap (No Order) ---
HashMap: {Apple=3, Orange=1, Mango=4, Banana=2, Zebra=5}
Iteration order: Apple Orange Mango Banana Zebra

--- LinkedHashMap (Insertion Order) ---
LinkedHashMap: {Zebra=5, Apple=3, Mango=4, Banana=2, Orange=1}
Iteration order: Zebra Apple Mango Banana Orange
✅ Same order as insertion!

--- TreeMap (Sorted Order) ---
TreeMap: {Apple=3, Banana=2, Mango=4, Orange=1, Zebra=5}
Iteration order: Apple Banana Mango Orange Zebra
✅ Alphabetically sorted!

--- LinkedHashMap Features ---

Adding access logs in order:

--- Access Log (Chronological) ---
10:00 AM -> User Login
10:15 AM -> View Dashboard
10:30 AM -> Edit Profile
10:45 AM -> Upload File
11:00 AM -> User Logout

--- Access Order LinkedHashMap ---
Initial: {Page1=100, Page2=200, Page3=300}
After accessing Page1: {Page2=200, Page3=300, Page1=100}
After accessing Page2: {Page3=300, Page1=100, Page2=200}

--- TreeMap Features ---

Adding rankings in random order:

TreeMap (auto-sorted by key): {1=Alice, 2=Bob, 3=Charlie, 4=Diana, 5=Eve}

--- TreeMap Specific Methods ---
First Entry: 1=Alice
Last Entry: 5=Eve
First Key: 1
Last Key: 5

--- Range Operations ---
Rankings 2-4: {2=Bob, 3=Charlie, 4=Diana}
Rankings < 3: {1=Alice, 2=Bob}
Rankings >= 3: {3=Charlie, 4=Diana, 5=Eve}

--- Navigation Methods ---
Lower than 3: 2=Bob
Floor of 3: 3=Charlie
Ceiling of 3: 3=Charlie
Higher than 3: 4=Diana

--- Descending Order ---
Descending: {5=Eve, 4=Diana, 3=Charlie, 2=Bob, 1=Alice}

--- TreeMap with Custom Comparator ---

Reverse alphabetical order: {Date=2, Cherry=8, Banana=3, Apple=5}

--- Sort by String Length ---
Sorted by length: {Hi=1, Hi!=5, Hey=3, Hello=2, Greetings=4}

--- Performance Characteristics ---

HashMap:
  - Get: O(1) average
  - Put: O(1) average
  - Order: None
  - Use when: Need fastest operations, order doesn't matter

LinkedHashMap:
  - Get: O(1) average
  - Put: O(1) average
  - Order: Insertion order (or access order)
  - Use when: Need predictable iteration order

TreeMap:
  - Get: O(log n)
  - Put: O(log n)
  - Order: Sorted by keys
  - Use when: Need sorted order or range operations

--- When to Use Which Map ---

✅ Use HashMap when:
   - You need fastest performance
   - Order doesn't matter
   - Most common choice
   Example: User session storage, cache

✅ Use LinkedHashMap when:
   - You need insertion order
   - Building LRU cache
   - Predictable iteration order needed
   Example: Access logs, recent items

✅ Use TreeMap when:
   - You need sorted keys
   - Need range operations
   - Need first/last operations
   Example: Rankings, sorted dictionary

💡 Quick Reference:
   HashMap - Fast, no order
   LinkedHashMap - Fast, insertion order
   TreeMap - Slower, sorted order

===============================
```

**💡 Key Concepts:**

| Map Type | Order | Performance | Use Case |
|----------|-------|-------------|----------|
| **HashMap** | No order | O(1) | General purpose |
| **LinkedHashMap** | Insertion order | O(1) | Ordered iteration |
| **TreeMap** | Sorted order | O(log n) | Sorted keys |

**✅ Success Criteria:**
- [ ] Understand HashMap has no guaranteed order
- [ ] Use LinkedHashMap for insertion order
- [ ] Use TreeMap for sorted order
- [ ] Know TreeMap navigation methods
- [ ] Choose appropriate Map type for task
- [ ] Understand performance trade-offs

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Using TreeMap for all cases | Slower than HashMap | Use HashMap unless sorting needed |
| Expecting HashMap order | Order is not guaranteed | Use LinkedHashMap |
| Non-comparable keys in TreeMap | ClassCastException | Provide Comparator or use Comparable |
| Null keys in TreeMap | NullPointerException | Use HashMap (allows 1 null key) |

**🎯 Challenge:**
1. Create three maps (HashMap, LinkedHashMap, TreeMap)
2. Add same data to all three
3. Compare iteration order
4. Use TreeMap range operations
5. Implement LRU cache with LinkedHashMap
6. Benchmark performance differences

---

#### Exercise 4: Collections Utility Class (20 minutes)

**What you'll learn:** How to use Collections utility class methods for common operations

**Create class: `CollectionsUtilityDemo`**

**Concept:** Collections class provides static utility methods for sorting, searching, and manipulating collections.

```java
import java.util.*;

public class CollectionsUtilityDemo {

    static void demonstrateSorting() {
        System.out.println("\n--- Collections.sort() ---");

        // Sort numbers
        ArrayList<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        System.out.println("Original numbers: " + numbers);

        Collections.sort(numbers);
        System.out.println("After sort (ascending): " + numbers);

        Collections.sort(numbers, Collections.reverseOrder());
        System.out.println("After sort (descending): " + numbers);

        // Sort strings
        ArrayList<String> names = new ArrayList<>(Arrays.asList("Charlie", "Alice", "Bob", "Diana"));
        System.out.println("\nOriginal names: " + names);

        Collections.sort(names);
        System.out.println("After sort (alphabetical): " + names);

        Collections.sort(names, Collections.reverseOrder());
        System.out.println("After sort (reverse): " + names);

        // Sort by length
        Collections.sort(names, (s1, s2) -> Integer.compare(s1.length(), s2.length()));
        System.out.println("After sort (by length): " + names);
    }

    static void demonstrateReverse() {
        System.out.println("\n--- Collections.reverse() ---");

        ArrayList<String> items = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Original: " + items);

        Collections.reverse(items);
        System.out.println("After reverse: " + items);

        Collections.reverse(items);
        System.out.println("After reverse again: " + items);
    }

    static void demonstrateShuffle() {
        System.out.println("\n--- Collections.shuffle() ---");

        ArrayList<Integer> deck = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            deck.add(i);
        }

        System.out.println("Original deck: " + deck);

        Collections.shuffle(deck);
        System.out.println("After shuffle 1: " + deck);

        Collections.shuffle(deck);
        System.out.println("After shuffle 2: " + deck);

        Collections.shuffle(deck);
        System.out.println("After shuffle 3: " + deck);
    }

    static void demonstrateMaxMin() {
        System.out.println("\n--- Collections.max() and min() ---");

        ArrayList<Integer> scores = new ArrayList<>(Arrays.asList(85, 92, 78, 95, 88, 76));
        System.out.println("Scores: " + scores);

        int max = Collections.max(scores);
        int min = Collections.min(scores);

        System.out.println("Highest score: " + max);
        System.out.println("Lowest score: " + min);

        // Max/min with custom comparator
        ArrayList<String> words = new ArrayList<>(Arrays.asList("Java", "Python", "C", "JavaScript"));
        System.out.println("\nWords: " + words);

        String shortest = Collections.min(words, (s1, s2) -> Integer.compare(s1.length(), s2.length()));
        String longest = Collections.max(words, (s1, s2) -> Integer.compare(s1.length(), s2.length()));

        System.out.println("Shortest word: " + shortest);
        System.out.println("Longest word: " + longest);
    }

    static void demonstrateFrequency() {
        System.out.println("\n--- Collections.frequency() ---");

        ArrayList<String> letters = new ArrayList<>(
            Arrays.asList("A", "B", "A", "C", "A", "B", "D", "A", "C", "A")
        );

        System.out.println("Letters: " + letters);
        System.out.println("Total elements: " + letters.size());

        // Count frequency of each element
        Set<String> uniqueLetters = new HashSet<>(letters);
        System.out.println("\n--- Frequency Count ---");
        for (String letter : uniqueLetters) {
            int count = Collections.frequency(letters, letter);
            System.out.println(letter + ": " + count + " times");
        }

        // Find most common
        String mostCommon = null;
        int maxFreq = 0;
        for (String letter : uniqueLetters) {
            int freq = Collections.frequency(letters, letter);
            if (freq > maxFreq) {
                maxFreq = freq;
                mostCommon = letter;
            }
        }
        System.out.println("\nMost common: " + mostCommon + " (appears " + maxFreq + " times)");
    }

    static void demonstrateBinarySearch() {
        System.out.println("\n--- Collections.binarySearch() ---");

        ArrayList<Integer> sortedNumbers = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50, 60, 70));
        System.out.println("Sorted list: " + sortedNumbers);

        System.out.println("\n--- Searching Elements ---");
        int[] searchFor = {30, 45, 10, 80};

        for (int target : searchFor) {
            int index = Collections.binarySearch(sortedNumbers, target);
            if (index >= 0) {
                System.out.println("Found " + target + " at index " + index);
            } else {
                System.out.println(target + " not found (would be inserted at " + (-index - 1) + ")");
            }
        }

        System.out.println("\n⚠️  Note: List MUST be sorted for binarySearch!");
    }

    static void demonstrateFill() {
        System.out.println("\n--- Collections.fill() ---");

        ArrayList<String> slots = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Original: " + slots);

        Collections.fill(slots, "X");
        System.out.println("After fill with 'X': " + slots);

        // Useful for resetting
        ArrayList<Integer> counters = new ArrayList<>(Arrays.asList(5, 10, 15, 20));
        System.out.println("\nCounters before reset: " + counters);
        Collections.fill(counters, 0);
        System.out.println("Counters after reset: " + counters);
    }

    static void demonstrateCopy() {
        System.out.println("\n--- Collections.copy() ---");

        ArrayList<String> source = new ArrayList<>(Arrays.asList("A", "B", "C"));
        ArrayList<String> dest = new ArrayList<>(Arrays.asList("X", "Y", "Z", "W", "V"));

        System.out.println("Source: " + source);
        System.out.println("Destination before: " + dest);

        Collections.copy(dest, source);
        System.out.println("Destination after: " + dest);
        System.out.println("✅ First 3 elements copied, rest unchanged");
    }

    static void demonstrateReplaceAll() {
        System.out.println("\n--- Collections.replaceAll() ---");

        ArrayList<String> items = new ArrayList<>(
            Arrays.asList("Apple", "Banana", "Apple", "Cherry", "Apple", "Date")
        );

        System.out.println("Original: " + items);

        boolean replaced = Collections.replaceAll(items, "Apple", "Orange");
        System.out.println("Replaced Apple with Orange: " + replaced);
        System.out.println("Updated: " + items);

        replaced = Collections.replaceAll(items, "Mango", "Peach");
        System.out.println("\nTried to replace Mango: " + replaced + " (doesn't exist)");
    }

    static void demonstrateRotate() {
        System.out.println("\n--- Collections.rotate() ---");

        ArrayList<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        System.out.println("Original: " + numbers);

        Collections.rotate(numbers, 2);
        System.out.println("After rotate(2): " + numbers);
        System.out.println("✅ Last 2 elements moved to front");

        Collections.rotate(numbers, -3);
        System.out.println("After rotate(-3): " + numbers);
        System.out.println("✅ First 3 elements moved to end");
    }

    static void demonstrateSwap() {
        System.out.println("\n--- Collections.swap() ---");

        ArrayList<String> items = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Original: " + items);

        Collections.swap(items, 1, 3);  // Swap positions 1 and 3
        System.out.println("After swap(1, 3): " + items);
        System.out.println("✅ Elements at index 1 and 3 swapped");
    }

    static void demonstrateAddAll() {
        System.out.println("\n--- Collections.addAll() ---");

        ArrayList<String> list = new ArrayList<>();
        System.out.println("Original (empty): " + list);

        Collections.addAll(list, "Java", "Python", "C++", "JavaScript");
        System.out.println("After addAll: " + list);
        System.out.println("✅ Convenient way to add multiple elements");
    }

    public static void main(String[] args) {
        System.out.println("===== COLLECTIONS UTILITY CLASS =====\n");

        // Sorting
        demonstrateSorting();

        // Reverse
        demonstrateReverse();

        // Shuffle
        demonstrateShuffle();

        // Max and Min
        demonstrateMaxMin();

        // Frequency
        demonstrateFrequency();

        // Binary Search
        demonstrateBinarySearch();

        // Fill
        demonstrateFill();

        // Copy
        demonstrateCopy();

        // ReplaceAll
        demonstrateReplaceAll();

        // Rotate
        demonstrateRotate();

        // Swap
        demonstrateSwap();

        // AddAll
        demonstrateAddAll();

        System.out.println("\n💡 Collections Utility Methods:");
        System.out.println("   sort() - Sort list");
        System.out.println("   reverse() - Reverse order");
        System.out.println("   shuffle() - Randomize order");
        System.out.println("   max() / min() - Find extremes");
        System.out.println("   frequency() - Count occurrences");
        System.out.println("   binarySearch() - Search sorted list");
        System.out.println("   fill() - Replace all with value");
        System.out.println("   copy() - Copy elements");
        System.out.println("   replaceAll() - Replace specific value");
        System.out.println("   rotate() - Rotate elements");
        System.out.println("   swap() - Swap two elements");
        System.out.println("   addAll() - Add multiple elements");

        System.out.println("\n====================================");
    }
}
```

**Expected Output:**
```
===== COLLECTIONS UTILITY CLASS =====

--- Collections.sort() ---
Original numbers: [5, 2, 8, 1, 9, 3]
After sort (ascending): [1, 2, 3, 5, 8, 9]
After sort (descending): [9, 8, 5, 3, 2, 1]

Original names: [Charlie, Alice, Bob, Diana]
After sort (alphabetical): [Alice, Bob, Charlie, Diana]
After sort (reverse): [Diana, Charlie, Bob, Alice]
After sort (by length): [Bob, Alice, Diana, Charlie]

--- Collections.reverse() ---
Original: [A, B, C, D, E]
After reverse: [E, D, C, B, A]
After reverse again: [A, B, C, D, E]

--- Collections.shuffle() ---
Original deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
After shuffle 1: [3, 7, 1, 9, 2, 10, 5, 4, 8, 6]
After shuffle 2: [8, 2, 10, 7, 4, 6, 1, 9, 5, 3]
After shuffle 3: [7, 1, 3, 5, 10, 2, 9, 6, 8, 4]

--- Collections.max() and min() ---
Scores: [85, 92, 78, 95, 88, 76]
Highest score: 95
Lowest score: 76

Words: [Java, Python, C, JavaScript]
Shortest word: C
Longest word: JavaScript

--- Collections.frequency() ---
Letters: [A, B, A, C, A, B, D, A, C, A]
Total elements: 10

--- Frequency Count ---
A: 5 times
B: 2 times
C: 2 times
D: 1 times

Most common: A (appears 5 times)

--- Collections.binarySearch() ---
Sorted list: [10, 20, 30, 40, 50, 60, 70]

--- Searching Elements ---
Found 30 at index 2
45 not found (would be inserted at 4)
Found 10 at index 0
80 not found (would be inserted at 7)

⚠️  Note: List MUST be sorted for binarySearch!

--- Collections.fill() ---
Original: [A, B, C, D, E]
After fill with 'X': [X, X, X, X, X]

Counters before reset: [5, 10, 15, 20]
Counters after reset: [0, 0, 0, 0]

--- Collections.copy() ---
Source: [A, B, C]
Destination before: [X, Y, Z, W, V]
Destination after: [A, B, C, W, V]
✅ First 3 elements copied, rest unchanged

--- Collections.replaceAll() ---
Original: [Apple, Banana, Apple, Cherry, Apple, Date]
Replaced Apple with Orange: true
Updated: [Orange, Banana, Orange, Cherry, Orange, Date]

Tried to replace Mango: false (doesn't exist)

--- Collections.rotate() ---
Original: [1, 2, 3, 4, 5]
After rotate(2): [4, 5, 1, 2, 3]
✅ Last 2 elements moved to front
After rotate(-3): [2, 3, 4, 5, 1]
✅ First 3 elements moved to end

--- Collections.swap() ---
Original: [A, B, C, D, E]
After swap(1, 3): [A, D, C, B, E]
✅ Elements at index 1 and 3 swapped

--- Collections.addAll() ---
Original (empty): []
After addAll: [Java, Python, C++, JavaScript]
✅ Convenient way to add multiple elements

💡 Collections Utility Methods:
   sort() - Sort list
   reverse() - Reverse order
   shuffle() - Randomize order
   max() / min() - Find extremes
   frequency() - Count occurrences
   binarySearch() - Search sorted list
   fill() - Replace all with value
   copy() - Copy elements
   replaceAll() - Replace specific value
   rotate() - Rotate elements
   swap() - Swap two elements
   addAll() - Add multiple elements

====================================
```

**💡 Key Concepts:**

| Method | Purpose | Example Use |
|--------|---------|-------------|
| **sort()** | Sort list | Alphabetical ordering |
| **shuffle()** | Randomize | Shuffle cards |
| **max()/min()** | Find extremes | Highest score |
| **frequency()** | Count occurrences | Letter frequency |
| **binarySearch()** | Fast search | Find in sorted list |

**✅ Success Criteria:**
- [ ] Can sort lists with Collections.sort()
- [ ] Use reverse() and shuffle()
- [ ] Find max and min elements
- [ ] Count frequency of elements
- [ ] Perform binary search
- [ ] Use fill, copy, and replaceAll

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| binarySearch on unsorted list | Wrong results | Always sort first |
| copy() with small destination | IndexOutOfBoundsException | Ensure dest size >= source |
| Expecting stable shuffle | Shuffle is random | Use sort for predictability |
| Modifying list during operations | ConcurrentModificationException | Complete operation first |

**🎯 Challenge:**
1. Create list of 20 random numbers
2. Find max, min, and average
3. Sort and use binary search
4. Shuffle and sort again
5. Count frequency of each number
6. Find most common number

---

#### Exercise 5: Comparable vs Comparator (25 minutes)

**What you'll learn:** How to implement custom sorting using Comparable and Comparator interfaces

**Create class: `ComparableVsComparatorDemo`**

**Concept:** Comparable defines natural ordering within class, Comparator defines external ordering.

```java
import java.util.*;

// Student class implementing Comparable (natural ordering by ID)
class Student implements Comparable<Student> {
    private int id;
    private String name;
    private double gpa;
    private int age;

    public Student(int id, String name, double gpa, int age) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.age = age;
    }

    // Comparable: defines natural ordering
    @Override
    public int compareTo(Student other) {
        // Natural ordering: by ID
        return Integer.compare(this.id, other.id);
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public double getGpa() { return gpa; }
    public int getAge() { return age; }

    @Override
    public String toString() {
        return String.format("Student[ID=%d, Name=%s, GPA=%.2f, Age=%d]",
            id, name, gpa, age);
    }
}

// Comparators for different sorting criteria
class StudentNameComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.getName().compareTo(s2.getName());
    }
}

class StudentGpaComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return Double.compare(s2.getGpa(), s1.getGpa());  // Descending
    }
}

class StudentAgeComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return Integer.compare(s1.getAge(), s2.getAge());
    }
}

public class ComparableVsComparatorDemo {

    static void demonstrateComparable() {
        System.out.println("\n--- Comparable Interface (Natural Ordering) ---");

        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student(103, "Charlie", 3.5, 21));
        students.add(new Student(101, "Alice", 3.8, 20));
        students.add(new Student(104, "Diana", 3.9, 22));
        students.add(new Student(102, "Bob", 3.2, 19));

        System.out.println("Before sorting:");
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Sort using natural ordering (Comparable)
        Collections.sort(students);

        System.out.println("\nAfter Collections.sort() [sorts by ID]:");
        for (Student s : students) {
            System.out.println("  " + s);
        }
        System.out.println("✅ Sorted by ID (natural ordering)");
    }

    static void demonstrateComparator() {
        System.out.println("\n--- Comparator Interface (External Ordering) ---");

        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student(103, "Charlie", 3.5, 21));
        students.add(new Student(101, "Alice", 3.8, 20));
        students.add(new Student(104, "Diana", 3.9, 22));
        students.add(new Student(102, "Bob", 3.2, 19));

        System.out.println("Original order:");
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Sort by Name using Comparator
        System.out.println("\n--- Sort by Name ---");
        Collections.sort(students, new StudentNameComparator());
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Sort by GPA using Comparator
        System.out.println("\n--- Sort by GPA (Descending) ---");
        Collections.sort(students, new StudentGpaComparator());
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Sort by Age using Comparator
        System.out.println("\n--- Sort by Age ---");
        Collections.sort(students, new StudentAgeComparator());
        for (Student s : students) {
            System.out.println("  " + s);
        }
    }

    static void demonstrateLambdaComparators() {
        System.out.println("\n--- Lambda Expression Comparators ---");

        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student(103, "Charlie", 3.5, 21));
        students.add(new Student(101, "Alice", 3.8, 20));
        students.add(new Student(104, "Diana", 3.9, 22));
        students.add(new Student(102, "Bob", 3.2, 19));

        // Sort by name using lambda
        System.out.println("\n--- Sort by Name (Lambda) ---");
        Collections.sort(students, (s1, s2) -> s1.getName().compareTo(s2.getName()));
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Sort by GPA descending using lambda
        System.out.println("\n--- Sort by GPA Descending (Lambda) ---");
        Collections.sort(students, (s1, s2) -> Double.compare(s2.getGpa(), s1.getGpa()));
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Sort by age using lambda
        System.out.println("\n--- Sort by Age (Lambda) ---");
        Collections.sort(students, (s1, s2) -> Integer.compare(s1.getAge(), s2.getAge()));
        for (Student s : students) {
            System.out.println("  " + s);
        }
    }

    static void demonstrateComparingMethods() {
        System.out.println("\n--- Comparator.comparing() Methods ---");

        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student(103, "Charlie", 3.5, 21));
        students.add(new Student(101, "Alice", 3.8, 20));
        students.add(new Student(104, "Diana", 3.9, 22));
        students.add(new Student(102, "Bob", 3.2, 19));

        // Using Comparator.comparing()
        System.out.println("\n--- Sort by Name (Comparator.comparing) ---");
        Collections.sort(students, Comparator.comparing(Student::getName));
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Using Comparator.comparingDouble()
        System.out.println("\n--- Sort by GPA (Comparator.comparingDouble) ---");
        Collections.sort(students, Comparator.comparingDouble(Student::getGpa));
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Reversed
        System.out.println("\n--- Sort by GPA Descending (reversed) ---");
        Collections.sort(students, Comparator.comparingDouble(Student::getGpa).reversed());
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Using Comparator.comparingInt()
        System.out.println("\n--- Sort by Age (Comparator.comparingInt) ---");
        Collections.sort(students, Comparator.comparingInt(Student::getAge));
        for (Student s : students) {
            System.out.println("  " + s);
        }
    }

    static void demonstrateThenComparing() {
        System.out.println("\n--- Multiple Level Sorting (thenComparing) ---");

        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student(103, "Charlie", 3.5, 21));
        students.add(new Student(101, "Alice", 3.8, 20));
        students.add(new Student(104, "Alice", 3.9, 22));
        students.add(new Student(102, "Bob", 3.5, 19));
        students.add(new Student(105, "Charlie", 3.5, 20));

        System.out.println("Original order:");
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Sort by Name, then by GPA descending
        System.out.println("\n--- Sort by Name, then by GPA (Descending) ---");
        Comparator<Student> multiLevelComparator = Comparator
            .comparing(Student::getName)
            .thenComparing(Comparator.comparingDouble(Student::getGpa).reversed());

        Collections.sort(students, multiLevelComparator);
        for (Student s : students) {
            System.out.println("  " + s);
        }

        // Sort by GPA descending, then by Age
        System.out.println("\n--- Sort by GPA (Desc), then by Age ---");
        multiLevelComparator = Comparator
            .comparingDouble(Student::getGpa).reversed()
            .thenComparingInt(Student::getAge);

        Collections.sort(students, multiLevelComparator);
        for (Student s : students) {
            System.out.println("  " + s);
        }
    }

    static void demonstrateNullHandling() {
        System.out.println("\n--- Handling Null Values ---");

        ArrayList<String> names = new ArrayList<>(Arrays.asList("Charlie", null, "Alice", "Bob", null, "Diana"));

        System.out.println("Original (with nulls): " + names);

        // Sort with nulls first
        System.out.println("\n--- Nulls First ---");
        Collections.sort(names, Comparator.nullsFirst(Comparator.naturalOrder()));
        System.out.println(names);

        // Sort with nulls last
        System.out.println("\n--- Nulls Last ---");
        Collections.sort(names, Comparator.nullsLast(Comparator.naturalOrder()));
        System.out.println(names);
    }

    static void compareComparableVsComparator() {
        System.out.println("\n--- Comparable vs Comparator Summary ---");

        System.out.println("\n✅ Comparable:");
        System.out.println("   - Interface: implements Comparable<T>");
        System.out.println("   - Method: compareTo(T other)");
        System.out.println("   - Purpose: Natural/default ordering");
        System.out.println("   - Location: Inside the class");
        System.out.println("   - Limitation: Only one natural ordering");
        System.out.println("   - Use: When there's obvious default order");
        System.out.println("   - Example: Student sorted by ID");

        System.out.println("\n✅ Comparator:");
        System.out.println("   - Interface: implements Comparator<T>");
        System.out.println("   - Method: compare(T o1, T o2)");
        System.out.println("   - Purpose: Custom/alternative ordering");
        System.out.println("   - Location: Separate class or lambda");
        System.out.println("   - Advantage: Multiple different orderings");
        System.out.println("   - Use: When need multiple sort options");
        System.out.println("   - Example: Student sorted by name, GPA, or age");

        System.out.println("\n💡 When to use:");
        System.out.println("   Comparable: One natural ordering (ID, name)");
        System.out.println("   Comparator: Multiple orderings needed");
        System.out.println("   Both: Natural ordering + alternatives");
    }

    public static void main(String[] args) {
        System.out.println("===== COMPARABLE VS COMPARATOR =====\n");

        // Demonstrate Comparable
        demonstrateComparable();

        // Demonstrate Comparator
        demonstrateComparator();

        // Lambda comparators
        demonstrateLambdaComparators();

        // Comparing methods
        demonstrateComparingMethods();

        // Multi-level sorting
        demonstrateThenComparing();

        // Null handling
        demonstrateNullHandling();

        // Compare both approaches
        compareComparableVsComparator();

        System.out.println("\n💡 Quick Reference:");
        System.out.println("   Comparable - One natural order");
        System.out.println("   Comparator - Multiple custom orders");
        System.out.println("   Lambda - (s1, s2) -> comparison");
        System.out.println("   comparing() - Comparator.comparing(getter)");
        System.out.println("   thenComparing() - Multi-level sorting");

        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== COMPARABLE VS COMPARATOR =====

--- Comparable Interface (Natural Ordering) ---
Before sorting:
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]

After Collections.sort() [sorts by ID]:
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]
✅ Sorted by ID (natural ordering)

--- Comparator Interface (External Ordering) ---
Original order:
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]

--- Sort by Name ---
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]

--- Sort by GPA (Descending) ---
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]

--- Sort by Age ---
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]

--- Lambda Expression Comparators ---

--- Sort by Name (Lambda) ---
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]

--- Sort by GPA Descending (Lambda) ---
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]

--- Sort by Age (Lambda) ---
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]

--- Comparator.comparing() Methods ---

--- Sort by Name (Comparator.comparing) ---
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]

--- Sort by GPA (Comparator.comparingDouble) ---
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]

--- Sort by GPA Descending (reversed) ---
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]

--- Sort by Age (Comparator.comparingInt) ---
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=104, Name=Diana, GPA=3.90, Age=22]

--- Multiple Level Sorting (thenComparing) ---
Original order:
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=104, Name=Alice, GPA=3.90, Age=22]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=105, Name=Charlie, GPA=3.50, Age=20]

--- Sort by Name, then by GPA (Descending) ---
  Student[ID=104, Name=Alice, GPA=3.90, Age=22]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=105, Name=Charlie, GPA=3.50, Age=20]

--- Sort by GPA (Desc), then by Age ---
  Student[ID=104, Name=Alice, GPA=3.90, Age=22]
  Student[ID=101, Name=Alice, GPA=3.80, Age=20]
  Student[ID=105, Name=Charlie, GPA=3.50, Age=20]
  Student[ID=103, Name=Charlie, GPA=3.50, Age=21]
  Student[ID=102, Name=Bob, GPA=3.20, Age=19]

--- Handling Null Values ---
Original (with nulls): [Charlie, null, Alice, Bob, null, Diana]

--- Nulls First ---
[null, null, Alice, Bob, Charlie, Diana]

--- Nulls Last ---
[Alice, Bob, Charlie, Diana, null, null]

--- Comparable vs Comparator Summary ---

✅ Comparable:
   - Interface: implements Comparable<T>
   - Method: compareTo(T other)
   - Purpose: Natural/default ordering
   - Location: Inside the class
   - Limitation: Only one natural ordering
   - Use: When there's obvious default order
   - Example: Student sorted by ID

✅ Comparator:
   - Interface: implements Comparator<T>
   - Method: compare(T o1, T o2)
   - Purpose: Custom/alternative ordering
   - Location: Separate class or lambda
   - Advantage: Multiple different orderings
   - Use: When need multiple sort options
   - Example: Student sorted by name, GPA, or age

💡 When to use:
   Comparable: One natural ordering (ID, name)
   Comparator: Multiple orderings needed
   Both: Natural ordering + alternatives

💡 Quick Reference:
   Comparable - One natural order
   Comparator - Multiple custom orders
   Lambda - (s1, s2) -> comparison
   comparing() - Comparator.comparing(getter)
   thenComparing() - Multi-level sorting

===================================
```

**💡 Key Concepts:**

| Concept | Purpose | Usage |
|---------|---------|-------|
| **Comparable** | Natural ordering | Inside class, one order |
| **Comparator** | Custom ordering | External, multiple orders |
| **Lambda** | Quick comparator | Inline sorting logic |
| **comparing()** | Method reference | Clean, readable syntax |
| **thenComparing()** | Multi-level sort | Secondary sorting |

**✅ Success Criteria:**
- [ ] Understand Comparable interface
- [ ] Implement compareTo() method
- [ ] Create Comparator implementations
- [ ] Use lambda expressions for sorting
- [ ] Apply Comparator.comparing() methods
- [ ] Perform multi-level sorting

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Inconsistent compareTo() | Violates contract | Return consistent values |
| Not implementing Comparable | Can't use Collections.sort() | Implement or use Comparator |
| Comparing with subtraction | Integer overflow | Use Integer.compare() |
| Forgetting null checks | NullPointerException | Use nullsFirst/nullsLast |

**🎯 Challenge:**
1. Create Product class with name, price, rating
2. Implement Comparable for natural order
3. Create 3 different Comparators
4. Sort products using all methods
5. Implement multi-level sorting
6. Handle null values properly

---

#### Exercise 6: Real-World Application - Inventory Management System (30 minutes)

**What you'll learn:** Building a complete inventory management system using Map and utility classes

**Create class: `InventoryManagementSystem`**

**Concept:** Practical application combining HashMap operations, sorting, and Collections utilities.

```java
import java.util.*;

class Product implements Comparable<Product> {
    private String id;
    private String name;
    private String category;
    private double price;
    private int quantity;
    private double rating;

    public Product(String id, String name, String category, double price, int quantity, double rating) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.rating = rating;
    }

    @Override
    public int compareTo(Product other) {
        return this.id.compareTo(other.id);
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public int getQuantity() { return quantity; }
    public double getRating() { return rating; }

    // Setters
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setPrice(double price) { this.price = price; }
    public void setRating(double rating) { this.rating = rating; }

    public double getTotalValue() {
        return price * quantity;
    }

    @Override
    public String toString() {
        return String.format("%-10s %-20s %-15s $%-8.2f Qty:%-5d Rating:%.1f",
            id, name, category, price, quantity, rating);
    }
}

class InventoryManager {
    private HashMap<String, Product> inventory;

    public InventoryManager() {
        this.inventory = new HashMap<>();
    }

    // Add product to inventory
    public boolean addProduct(Product product) {
        if (inventory.containsKey(product.getId())) {
            System.out.println("❌ Product ID already exists: " + product.getId());
            return false;
        }
        inventory.put(product.getId(), product);
        System.out.println("✅ Product added: " + product.getName());
        return true;
    }

    // Update product quantity
    public boolean updateQuantity(String productId, int newQuantity) {
        Product product = inventory.get(productId);
        if (product == null) {
            System.out.println("❌ Product not found: " + productId);
            return false;
        }

        int oldQuantity = product.getQuantity();
        product.setQuantity(newQuantity);
        System.out.println("✅ Updated " + product.getName() +
            ": Quantity " + oldQuantity + " -> " + newQuantity);
        return true;
    }

    // Update product price
    public boolean updatePrice(String productId, double newPrice) {
        Product product = inventory.get(productId);
        if (product == null) {
            System.out.println("❌ Product not found: " + productId);
            return false;
        }

        double oldPrice = product.getPrice();
        product.setPrice(newPrice);
        System.out.println("✅ Updated " + product.getName() +
            ": Price $" + oldPrice + " -> $" + newPrice);
        return true;
    }

    // Remove product
    public boolean removeProduct(String productId) {
        Product removed = inventory.remove(productId);
        if (removed == null) {
            System.out.println("❌ Product not found: " + productId);
            return false;
        }
        System.out.println("✅ Removed product: " + removed.getName());
        return true;
    }

    // Search product
    public Product searchProduct(String productId) {
        return inventory.get(productId);
    }

    // Get all products
    public Collection<Product> getAllProducts() {
        return inventory.values();
    }

    // Get products by category
    public ArrayList<Product> getProductsByCategory(String category) {
        ArrayList<Product> result = new ArrayList<>();
        for (Product product : inventory.values()) {
            if (product.getCategory().equalsIgnoreCase(category)) {
                result.add(product);
            }
        }
        return result;
    }

    // Get low stock products
    public ArrayList<Product> getLowStockProducts(int threshold) {
        ArrayList<Product> result = new ArrayList<>();
        for (Product product : inventory.values()) {
            if (product.getQuantity() < threshold) {
                result.add(product);
            }
        }
        return result;
    }

    // Get products sorted by price
    public ArrayList<Product> getProductsSortedByPrice(boolean ascending) {
        ArrayList<Product> products = new ArrayList<>(inventory.values());
        if (ascending) {
            Collections.sort(products, Comparator.comparingDouble(Product::getPrice));
        } else {
            Collections.sort(products, Comparator.comparingDouble(Product::getPrice).reversed());
        }
        return products;
    }

    // Get products sorted by rating
    public ArrayList<Product> getProductsSortedByRating() {
        ArrayList<Product> products = new ArrayList<>(inventory.values());
        Collections.sort(products, Comparator.comparingDouble(Product::getRating).reversed());
        return products;
    }

    // Get products sorted by total value
    public ArrayList<Product> getProductsSortedByValue() {
        ArrayList<Product> products = new ArrayList<>(inventory.values());
        Collections.sort(products, (p1, p2) -> Double.compare(p2.getTotalValue(), p1.getTotalValue()));
        return products;
    }

    // Calculate total inventory value
    public double getTotalInventoryValue() {
        double total = 0;
        for (Product product : inventory.values()) {
            total += product.getTotalValue();
        }
        return total;
    }

    // Get statistics by category
    public void displayCategoryStatistics() {
        // Group by category
        HashMap<String, ArrayList<Product>> byCategory = new HashMap<>();
        for (Product product : inventory.values()) {
            byCategory.computeIfAbsent(product.getCategory(), k -> new ArrayList<>()).add(product);
        }

        System.out.println("\n╔═══════════════════════════════════════════════════════╗");
        System.out.println("║           CATEGORY STATISTICS                          ║");
        System.out.println("╠═══════════════════════════════════════════════════════╣");

        for (Map.Entry<String, ArrayList<Product>> entry : byCategory.entrySet()) {
            String category = entry.getKey();
            ArrayList<Product> products = entry.getValue();

            int totalItems = 0;
            double totalValue = 0;

            for (Product p : products) {
                totalItems += p.getQuantity();
                totalValue += p.getTotalValue();
            }

            System.out.printf("║ %-20s Products: %-3d Items: %-4d Value: $%-10.2f ║%n",
                category, products.size(), totalItems, totalValue);
        }
        System.out.println("╚═══════════════════════════════════════════════════════╝");
    }

    // Display all products
    public void displayAllProducts() {
        if (inventory.isEmpty()) {
            System.out.println("\n❌ No products in inventory");
            return;
        }

        System.out.println("\n╔════════════════════════════════════════════════════════════════════════════════╗");
        System.out.println("║                          INVENTORY PRODUCTS                                     ║");
        System.out.println("╠════════════════════════════════════════════════════════════════════════════════╣");

        ArrayList<Product> sorted = new ArrayList<>(inventory.values());
        Collections.sort(sorted);

        for (Product product : sorted) {
            System.out.println("║ " + product + " ║");
        }

        System.out.println("╠════════════════════════════════════════════════════════════════════════════════╣");
        System.out.printf("║ Total Products: %-3d                    Total Value: $%-20.2f     ║%n",
            inventory.size(), getTotalInventoryValue());
        System.out.println("╚════════════════════════════════════════════════════════════════════════════════╝");
    }
}

public class InventoryManagementSystem {

    static void demonstrateBasicOperations() {
        System.out.println("\n=== BASIC INVENTORY OPERATIONS ===\n");

        InventoryManager manager = new InventoryManager();

        // Add products
        System.out.println("--- Adding Products ---");
        manager.addProduct(new Product("P001", "Laptop", "Electronics", 999.99, 15, 4.5));
        manager.addProduct(new Product("P002", "Mouse", "Electronics", 29.99, 50, 4.2));
        manager.addProduct(new Product("P003", "Desk", "Furniture", 299.99, 10, 4.0));
        manager.addProduct(new Product("P004", "Chair", "Furniture", 199.99, 20, 4.3));
        manager.addProduct(new Product("P005", "Monitor", "Electronics", 349.99, 12, 4.6));
        manager.addProduct(new Product("P006", "Keyboard", "Electronics", 79.99, 30, 4.1));

        // Try adding duplicate
        System.out.println();
        manager.addProduct(new Product("P001", "Duplicate", "Test", 0, 0, 0));

        // Display all
        manager.displayAllProducts();
    }

    static void demonstrateSearchAndUpdate() {
        System.out.println("\n=== SEARCH AND UPDATE OPERATIONS ===\n");

        InventoryManager manager = new InventoryManager();

        // Add products
        manager.addProduct(new Product("P001", "Laptop", "Electronics", 999.99, 15, 4.5));
        manager.addProduct(new Product("P002", "Mouse", "Electronics", 29.99, 50, 4.2));
        manager.addProduct(new Product("P003", "Desk", "Furniture", 299.99, 10, 4.0));

        // Search product
        System.out.println("\n--- Searching Products ---");
        Product found = manager.searchProduct("P002");
        if (found != null) {
            System.out.println("✅ Found: " + found);
        }

        found = manager.searchProduct("P999");
        if (found == null) {
            System.out.println("❌ Product P999 not found");
        }

        // Update operations
        System.out.println("\n--- Updating Products ---");
        manager.updateQuantity("P001", 20);
        manager.updatePrice("P002", 24.99);
        manager.updateQuantity("P999", 100);  // Non-existent

        manager.displayAllProducts();
    }

    static void demonstrateFiltering() {
        System.out.println("\n=== FILTERING OPERATIONS ===\n");

        InventoryManager manager = new InventoryManager();

        // Add products
        manager.addProduct(new Product("P001", "Laptop", "Electronics", 999.99, 15, 4.5));
        manager.addProduct(new Product("P002", "Mouse", "Electronics", 29.99, 3, 4.2));
        manager.addProduct(new Product("P003", "Desk", "Furniture", 299.99, 10, 4.0));
        manager.addProduct(new Product("P004", "Chair", "Furniture", 199.99, 2, 4.3));
        manager.addProduct(new Product("P005", "Monitor", "Electronics", 349.99, 12, 4.6));
        manager.addProduct(new Product("P006", "Keyboard", "Electronics", 79.99, 30, 4.1));

        // Filter by category
        System.out.println("--- Electronics Products ---");
        ArrayList<Product> electronics = manager.getProductsByCategory("Electronics");
        for (Product p : electronics) {
            System.out.println("  " + p);
        }

        // Low stock products
        System.out.println("\n--- Low Stock Products (< 5) ---");
        ArrayList<Product> lowStock = manager.getLowStockProducts(5);
        for (Product p : lowStock) {
            System.out.println("  ⚠️  " + p);
        }
    }

    static void demonstrateSorting() {
        System.out.println("\n=== SORTING OPERATIONS ===\n");

        InventoryManager manager = new InventoryManager();

        // Add products
        manager.addProduct(new Product("P001", "Laptop", "Electronics", 999.99, 15, 4.5));
        manager.addProduct(new Product("P002", "Mouse", "Electronics", 29.99, 50, 4.2));
        manager.addProduct(new Product("P003", "Desk", "Furniture", 299.99, 10, 4.0));
        manager.addProduct(new Product("P004", "Chair", "Furniture", 199.99, 20, 4.3));
        manager.addProduct(new Product("P005", "Monitor", "Electronics", 349.99, 12, 4.6));

        // Sort by price ascending
        System.out.println("--- Sorted by Price (Ascending) ---");
        ArrayList<Product> byPriceAsc = manager.getProductsSortedByPrice(true);
        for (Product p : byPriceAsc) {
            System.out.println("  " + p);
        }

        // Sort by price descending
        System.out.println("\n--- Sorted by Price (Descending) ---");
        ArrayList<Product> byPriceDesc = manager.getProductsSortedByPrice(false);
        for (Product p : byPriceDesc) {
            System.out.println("  " + p);
        }

        // Sort by rating
        System.out.println("\n--- Sorted by Rating (High to Low) ---");
        ArrayList<Product> byRating = manager.getProductsSortedByRating();
        for (Product p : byRating) {
            System.out.println("  " + p);
        }

        // Sort by total value
        System.out.println("\n--- Sorted by Total Value ---");
        ArrayList<Product> byValue = manager.getProductsSortedByValue();
        for (Product p : byValue) {
            System.out.printf("  %s - Total Value: $%.2f%n", p.getName(), p.getTotalValue());
        }
    }

    static void demonstrateStatistics() {
        System.out.println("\n=== STATISTICS AND ANALYTICS ===\n");

        InventoryManager manager = new InventoryManager();

        // Add products
        manager.addProduct(new Product("P001", "Laptop", "Electronics", 999.99, 15, 4.5));
        manager.addProduct(new Product("P002", "Mouse", "Electronics", 29.99, 50, 4.2));
        manager.addProduct(new Product("P003", "Desk", "Furniture", 299.99, 10, 4.0));
        manager.addProduct(new Product("P004", "Chair", "Furniture", 199.99, 20, 4.3));
        manager.addProduct(new Product("P005", "Monitor", "Electronics", 349.99, 12, 4.6));
        manager.addProduct(new Product("P006", "Keyboard", "Electronics", 79.99, 30, 4.1));
        manager.addProduct(new Product("P007", "Bookshelf", "Furniture", 149.99, 8, 3.9));

        // Display statistics
        manager.displayCategoryStatistics();

        // Total inventory value
        System.out.println("\n💰 Total Inventory Value: $" +
            String.format("%.2f", manager.getTotalInventoryValue()));

        // Count by category
        HashMap<String, Integer> categoryCount = new HashMap<>();
        for (Product p : manager.getAllProducts()) {
            categoryCount.put(p.getCategory(),
                categoryCount.getOrDefault(p.getCategory(), 0) + 1);
        }

        System.out.println("\n📊 Product Count by Category:");
        for (Map.Entry<String, Integer> entry : categoryCount.entrySet()) {
            System.out.println("  " + entry.getKey() + ": " + entry.getValue() + " products");
        }
    }

    static void demonstrateCompleteWorkflow() {
        System.out.println("\n=== COMPLETE INVENTORY WORKFLOW ===\n");

        InventoryManager manager = new InventoryManager();

        // Step 1: Add initial inventory
        System.out.println("📦 Step 1: Adding Initial Inventory");
        manager.addProduct(new Product("P001", "Laptop", "Electronics", 999.99, 15, 4.5));
        manager.addProduct(new Product("P002", "Mouse", "Electronics", 29.99, 50, 4.2));
        manager.addProduct(new Product("P003", "Desk", "Furniture", 299.99, 10, 4.0));

        manager.displayAllProducts();

        // Step 2: Process sales (reduce quantity)
        System.out.println("\n💳 Step 2: Processing Sales");
        manager.updateQuantity("P001", 12);  // Sold 3 laptops
        manager.updateQuantity("P002", 45);  // Sold 5 mice

        // Step 3: Restock low inventory
        System.out.println("\n📥 Step 3: Restocking Low Inventory");
        ArrayList<Product> lowStock = manager.getLowStockProducts(15);
        System.out.println("Items to restock:");
        for (Product p : lowStock) {
            System.out.println("  ⚠️  " + p.getName() + " (Qty: " + p.getQuantity() + ")");
            manager.updateQuantity(p.getId(), p.getQuantity() + 20);
        }

        // Step 4: Price adjustments
        System.out.println("\n💲 Step 4: Price Adjustments (10% off Electronics)");
        for (Product p : manager.getProductsByCategory("Electronics")) {
            double newPrice = p.getPrice() * 0.9;
            manager.updatePrice(p.getId(), newPrice);
        }

        // Step 5: Remove discontinued products
        System.out.println("\n🗑️  Step 5: Removing Discontinued Products");
        manager.removeProduct("P003");

        // Final state
        manager.displayAllProducts();
        manager.displayCategoryStatistics();
    }

    public static void main(String[] args) {
        System.out.println("╔═════════════════════════════════════════════════════╗");
        System.out.println("║     INVENTORY MANAGEMENT SYSTEM                     ║");
        System.out.println("╚═════════════════════════════════════════════════════╝");

        // Demonstrate all features
        demonstrateBasicOperations();
        demonstrateSearchAndUpdate();
        demonstrateFiltering();
        demonstrateSorting();
        demonstrateStatistics();
        demonstrateCompleteWorkflow();

        System.out.println("\n\n💡 System Features:");
        System.out.println("   ✅ Add/Remove/Update products");
        System.out.println("   ✅ Search by ID");
        System.out.println("   ✅ Filter by category");
        System.out.println("   ✅ Track low stock");
        System.out.println("   ✅ Sort by price/rating/value");
        System.out.println("   ✅ Category statistics");
        System.out.println("   ✅ Total inventory valuation");

        System.out.println("\n💡 Collections Used:");
        System.out.println("   HashMap - Fast product lookup by ID");
        System.out.println("   ArrayList - Dynamic product lists");
        System.out.println("   Collections.sort() - Sorting operations");
        System.out.println("   Comparator - Custom sorting");

        System.out.println("\n═══════════════════════════════════════════════════════");
    }
}
```

**Expected Output:**
```
╔═════════════════════════════════════════════════════╗
║     INVENTORY MANAGEMENT SYSTEM                     ║
╚═════════════════════════════════════════════════════╝

=== BASIC INVENTORY OPERATIONS ===

--- Adding Products ---
✅ Product added: Laptop
✅ Product added: Mouse
✅ Product added: Desk
✅ Product added: Chair
✅ Product added: Monitor
✅ Product added: Keyboard

❌ Product ID already exists: P001

╔════════════════════════════════════════════════════════════════════════════════╗
║                          INVENTORY PRODUCTS                                     ║
╠════════════════════════════════════════════════════════════════════════════════╣
║ P001       Laptop               Electronics     $999.99  Qty:15    Rating:4.5 ║
║ P002       Mouse                Electronics     $29.99   Qty:50    Rating:4.2 ║
║ P003       Desk                 Furniture       $299.99  Qty:10    Rating:4.0 ║
║ P004       Chair                Furniture       $199.99  Qty:20    Rating:4.3 ║
║ P005       Monitor              Electronics     $349.99  Qty:12    Rating:4.6 ║
║ P006       Keyboard             Electronics     $79.99   Qty:30    Rating:4.1 ║
╠════════════════════════════════════════════════════════════════════════════════╣
║ Total Products: 6                      Total Value: $25198.18                  ║
╚════════════════════════════════════════════════════════════════════════════════╝

=== SEARCH AND UPDATE OPERATIONS ===

--- Searching Products ---
✅ Found: P002       Mouse                Electronics     $29.99   Qty:50    Rating:4.2
❌ Product P999 not found

--- Updating Products ---
✅ Updated Laptop: Quantity 15 -> 20
✅ Updated Mouse: Price $29.99 -> $24.99
❌ Product not found: P999

╔════════════════════════════════════════════════════════════════════════════════╗
║                          INVENTORY PRODUCTS                                     ║
╠════════════════════════════════════════════════════════════════════════════════╣
║ P001       Laptop               Electronics     $999.99  Qty:20    Rating:4.5 ║
║ P002       Mouse                Electronics     $24.99   Qty:50    Rating:4.2 ║
║ P003       Desk                 Furniture       $299.99  Qty:10    Rating:4.0 ║
╠════════════════════════════════════════════════════════════════════════════════╣
║ Total Products: 3                      Total Value: $24248.30                  ║
╚════════════════════════════════════════════════════════════════════════════════╝

=== FILTERING OPERATIONS ===

--- Electronics Products ---
  P001       Laptop               Electronics     $999.99  Qty:15    Rating:4.5
  P002       Mouse                Electronics     $29.99   Qty:3     Rating:4.2
  P005       Monitor              Electronics     $349.99  Qty:12    Rating:4.6
  P006       Keyboard             Electronics     $79.99   Qty:30    Rating:4.1

--- Low Stock Products (< 5) ---
  ⚠️  P002       Mouse                Electronics     $29.99   Qty:3     Rating:4.2
  ⚠️  P004       Chair                Furniture       $199.99  Qty:2     Rating:4.3

=== SORTING OPERATIONS ===

--- Sorted by Price (Ascending) ---
  P002       Mouse                Electronics     $29.99   Qty:50    Rating:4.2
  P004       Chair                Furniture       $199.99  Qty:20    Rating:4.3
  P003       Desk                 Furniture       $299.99  Qty:10    Rating:4.0
  P005       Monitor              Electronics     $349.99  Qty:12    Rating:4.6
  P001       Laptop               Electronics     $999.99  Qty:15    Rating:4.5

--- Sorted by Price (Descending) ---
  P001       Laptop               Electronics     $999.99  Qty:15    Rating:4.5
  P005       Monitor              Electronics     $349.99  Qty:12    Rating:4.6
  P003       Desk                 Furniture       $299.99  Qty:10    Rating:4.0
  P004       Chair                Furniture       $199.99  Qty:20    Rating:4.3
  P002       Mouse                Electronics     $29.99   Qty:50    Rating:4.2

--- Sorted by Rating (High to Low) ---
  P005       Monitor              Electronics     $349.99  Qty:12    Rating:4.6
  P001       Laptop               Electronics     $999.99  Qty:15    Rating:4.5
  P004       Chair                Furniture       $199.99  Qty:20    Rating:4.3
  P002       Mouse                Electronics     $29.99   Qty:50    Rating:4.2
  P003       Desk                 Furniture       $299.99  Qty:10    Rating:4.0

--- Sorted by Total Value ---
  Laptop - Total Value: $14999.85
  Monitor - Total Value: $4199.88
  Chair - Total Value: $3999.80
  Desk - Total Value: $2999.90
  Mouse - Total Value: $1499.50

=== STATISTICS AND ANALYTICS ===

╔═══════════════════════════════════════════════════════╗
║           CATEGORY STATISTICS                          ║
╠═══════════════════════════════════════════════════════╣
║ Furniture            Products: 3   Items: 38   Value: $7199.62      ║
║ Electronics          Products: 4   Items: 107  Value: $20697.35     ║
╚═══════════════════════════════════════════════════════╝

💰 Total Inventory Value: $27896.97

📊 Product Count by Category:
  Furniture: 3 products
  Electronics: 4 products

=== COMPLETE INVENTORY WORKFLOW ===

📦 Step 1: Adding Initial Inventory
✅ Product added: Laptop
✅ Product added: Mouse
✅ Product added: Desk

╔════════════════════════════════════════════════════════════════════════════════╗
║                          INVENTORY PRODUCTS                                     ║
╠════════════════════════════════════════════════════════════════════════════════╣
║ P001       Laptop               Electronics     $999.99  Qty:15    Rating:4.5 ║
║ P002       Mouse                Electronics     $29.99   Qty:50    Rating:4.2 ║
║ P003       Desk                 Furniture       $299.99  Qty:10    Rating:4.0 ║
╠════════════════════════════════════════════════════════════════════════════════╣
║ Total Products: 3                      Total Value: $19498.35                  ║
╚════════════════════════════════════════════════════════════════════════════════╝

💳 Step 2: Processing Sales
✅ Updated Laptop: Quantity 15 -> 12
✅ Updated Mouse: Quantity 50 -> 45

📥 Step 3: Restocking Low Inventory
Items to restock:
  ⚠️  Laptop (Qty: 12)
✅ Updated Laptop: Quantity 12 -> 32
  ⚠️  Desk (Qty: 10)
✅ Updated Desk: Quantity 10 -> 30

💲 Step 4: Price Adjustments (10% off Electronics)
✅ Updated Laptop: Price $999.99 -> $899.99
✅ Updated Mouse: Price $29.99 -> $26.99

🗑️  Step 5: Removing Discontinued Products
✅ Removed product: Desk

╔════════════════════════════════════════════════════════════════════════════════╗
║                          INVENTORY PRODUCTS                                     ║
╠════════════════════════════════════════════════════════════════════════════════╣
║ P001       Laptop               Electronics     $899.99  Qty:32    Rating:4.5 ║
║ P002       Mouse                Electronics     $26.99   Qty:45    Rating:4.2 ║
╠════════════════════════════════════════════════════════════════════════════════╣
║ Total Products: 2                      Total Value: $30014.23                  ║
╚════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════╗
║           CATEGORY STATISTICS                          ║
╠═══════════════════════════════════════════════════════╣
║ Electronics          Products: 2   Items: 77   Value: $30014.23     ║
╚═══════════════════════════════════════════════════════╝


💡 System Features:
   ✅ Add/Remove/Update products
   ✅ Search by ID
   ✅ Filter by category
   ✅ Track low stock
   ✅ Sort by price/rating/value
   ✅ Category statistics
   ✅ Total inventory valuation

💡 Collections Used:
   HashMap - Fast product lookup by ID
   ArrayList - Dynamic product lists
   Collections.sort() - Sorting operations
   Comparator - Custom sorting

═══════════════════════════════════════════════════════
```

**💡 Key Concepts:**

| Feature | Implementation | Collections Used |
|---------|---------------|------------------|
| **Product Storage** | HashMap<ID, Product> | Fast O(1) lookup |
| **Filtering** | ArrayList with conditions | Dynamic lists |
| **Sorting** | Collections.sort + Comparator | Multiple sort orders |
| **Statistics** | Iteration + aggregation | Map operations |
| **Categories** | Group by category | HashMap grouping |

**✅ Success Criteria:**
- [ ] Implement complete CRUD operations
- [ ] Use HashMap for efficient lookups
- [ ] Filter products by criteria
- [ ] Sort using multiple Comparators
- [ ] Calculate statistics and analytics
- [ ] Handle edge cases properly
- [ ] Create user-friendly display

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|---------------|-------------|
| Linear search in HashMap | HashMap provides O(1) lookup | Use get(key) |
| Not checking null returns | NullPointerException | Always validate |
| Modifying during iteration | ConcurrentModificationException | Create new list |
| Forgetting to update totals | Incorrect statistics | Recalculate |

**🎯 Challenge:**
Extend the inventory system with:
1. Transaction history (LinkedHashMap for chronological order)
2. Supplier management (nested Maps)
3. Sales analytics (TreeMap for date-sorted records)
4. Export to file functionality
5. Import from file functionality
6. Search by name (contains/starts with)
7. Price history tracking
8. Automated reorder system (when stock < threshold)

---

### 🎓 Day 21 Summary: Collections Framework - Map & Utilities

**What You Learned:**
1. ✅ HashMap for key-value storage and operations
2. ✅ HashMap methods: put, get, remove, keySet, values, entrySet
3. ✅ LinkedHashMap (insertion order) vs TreeMap (sorted order)
4. ✅ Collections utility class methods
5. ✅ Comparable interface for natural ordering
6. ✅ Comparator interface for custom ordering
7. ✅ Real-world application development

**Key Takeaways:**

**HashMap:**
- Fast O(1) operations
- Stores key-value pairs
- Keys must be unique
- No guaranteed order
- Best for general-purpose key-value storage

**LinkedHashMap:**
- Maintains insertion order
- Same performance as HashMap
- Use for predictable iteration
- Good for LRU cache implementation

**TreeMap:**
- Maintains sorted order
- O(log n) operations
- Provides navigation methods
- Use when sorted keys needed

**Collections Utility:**
- sort() - Sort lists
- shuffle() - Randomize
- max()/min() - Find extremes
- frequency() - Count occurrences
- binarySearch() - Fast search
- reverse() - Reverse order

**Comparable vs Comparator:**
- Comparable: Natural ordering (one way)
- Comparator: Custom ordering (multiple ways)
- Lambda expressions for concise comparators
- comparing() methods for clean code
- thenComparing() for multi-level sorting

**Map Operations Checklist:**
```
✅ Use HashMap for fast lookup
✅ LinkedHashMap for order
✅ TreeMap for sorting
✅ iterate with entrySet()
✅ Check null with getOrDefault()
✅ Use Collections utility methods
✅ Implement Comparable for natural order
✅ Use Comparator for custom order
✅ Handle null values properly
```

**Real-World Applications:**
- Inventory management
- User session storage
- Cache implementation
- Configuration storage
- Ranking systems
- Word frequency counters
- Product catalogs
- Database-like operations

**Performance Summary:**
| Operation | HashMap | LinkedHashMap | TreeMap |
|-----------|---------|---------------|---------|
| get() | O(1) | O(1) | O(log n) |
| put() | O(1) | O(1) | O(log n) |
| Order | None | Insertion | Sorted |

**Next Steps:**
Continue practicing with Maps and Collections utilities. They are fundamental to Java programming and used extensively in real-world applications. Master these concepts before moving to advanced topics like Streams and Lambda expressions.

**Practice Projects:**
1. Phone book application
2. Library management system
3. Student grade tracker
4. E-commerce product catalog
5. Word frequency analyzer
6. Leaderboard system

---

**🎯 Day 21 Complete! You now understand Maps and Collections utilities!**

Ready for Day 22: File I/O and Serialization!

---
