### Day 23: Generics

---

#### Exercise 1: Introduction to Generics & Type Safety (20 minutes)

**What you'll learn:** Understanding the problem generics solve and basic type safety

**Create class: `GenericsIntro`**

**Concept:** **Generics** allow you to write code that works with any type while maintaining compile-time type safety. Before generics, you had to cast objects and couldn't catch type errors until runtime.

```
Without Generics (Old way):
  ArrayList list = new ArrayList();
  list.add("Hello");
  String s = (String) list.get(0);  // Manual cast needed
  list.add(123);                     // Oops! Mixed types allowed
  String x = (String) list.get(1);  // Runtime error!

With Generics (Modern way):
  ArrayList<String> list = new ArrayList<>();
  list.add("Hello");
  String s = list.get(0);           // No cast needed
  list.add(123);                     // Compile error! Type safe
```

**Why Generics?**
- **Type Safety**: Catch errors at compile-time, not runtime
- **No Casting**: Automatic type conversion
- **Reusability**: Write once, use with any type

**Step-by-Step:**

```java
import java.util.ArrayList;

public class GenericsIntro {
    public static void main(String[] args) {
        System.out.println("===== GENERICS & TYPE SAFETY =====\n");

        // ===== WITHOUT GENERICS (Old way) =====
        System.out.println("--- Without Generics (Raw Type) ---");
        ArrayList listOld = new ArrayList();  // No type specified

        listOld.add("Apple");
        listOld.add("Banana");
        listOld.add(100);        // Allows ANY type - dangerous!
        listOld.add(3.14);
        listOld.add(true);

        System.out.println("Raw ArrayList: " + listOld);
        System.out.println("Can add any type - no restriction!\n");

        // Getting items requires casting
        System.out.println("Getting items (requires casting):");
        String fruit = (String) listOld.get(0);  // Manual cast
        System.out.println("  Item 0: " + fruit);

        // Runtime error waiting to happen!
        try {
            String item = (String) listOld.get(2);  // Trying to cast 100 to String
            System.out.println("  Item 2: " + item);
        } catch (ClassCastException e) {
            System.out.println("  ❌ ERROR at item 2: " + e.getMessage());
            System.out.println("     (Can't cast Integer to String)");
        }
        System.out.println();

        // ===== WITH GENERICS (Modern way) =====
        System.out.println("--- With Generics (Type Safe) ---");
        ArrayList<String> listNew = new ArrayList<>();  // Only Strings allowed

        listNew.add("Apple");
        listNew.add("Banana");
        listNew.add("Cherry");
        // listNew.add(100);     // Compile error! Won't even run
        // listNew.add(3.14);    // Compile error!

        System.out.println("Generic ArrayList<String>: " + listNew);
        System.out.println("Only Strings allowed - type safe!\n");

        // No casting needed
        System.out.println("Getting items (no casting needed):");
        String item1 = listNew.get(0);  // Automatic type
        String item2 = listNew.get(1);
        System.out.println("  Item 0: " + item1);
        System.out.println("  Item 1: " + item2);
        System.out.println();

        // ===== DIFFERENT TYPES =====
        System.out.println("--- Different Generic Types ---\n");

        // Integer list
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        // numbers.add("40");  // Compile error!
        System.out.println("Integer list: " + numbers);

        // Double list
        ArrayList<Double> prices = new ArrayList<>();
        prices.add(19.99);
        prices.add(29.99);
        prices.add(39.99);
        System.out.println("Double list: " + prices);

        // Boolean list
        ArrayList<Boolean> flags = new ArrayList<>();
        flags.add(true);
        flags.add(false);
        flags.add(true);
        System.out.println("Boolean list: " + flags);
        System.out.println();

        // ===== TYPE SAFETY IN ACTION =====
        System.out.println("--- Type Safety Benefits ---\n");

        ArrayList<String> words = new ArrayList<>();
        words.add("Java");
        words.add("Python");
        words.add("JavaScript");

        System.out.println("Processing words (all guaranteed to be Strings):");
        for (String word : words) {
            // No cast needed, no runtime errors possible
            System.out.println("  " + word + " - Length: " + word.length());
        }
        System.out.println();

        // Calculate total with numbers
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(85);
        scores.add(92);
        scores.add(78);
        scores.add(95);

        int total = 0;
        for (Integer score : scores) {  // Guaranteed to be Integer
            total += score;  // No casting needed
        }
        System.out.println("Scores: " + scores);
        System.out.println("Total: " + total);
        System.out.println("Average: " + (total / scores.size()));

        System.out.println("\n===================================");
    }
}
```

**Expected Output:**
```
===== GENERICS & TYPE SAFETY =====

--- Without Generics (Raw Type) ---
Raw ArrayList: [Apple, Banana, 100, 3.14, true]
Can add any type - no restriction!

Getting items (requires casting):
  Item 0: Apple
  ❌ ERROR at item 2: java.lang.Integer cannot be cast to java.lang.String
     (Can't cast Integer to String)

--- With Generics (Type Safe) ---
Generic ArrayList<String>: [Apple, Banana, Cherry]
Only Strings allowed - type safe!

Getting items (no casting needed):
  Item 0: Apple
  Item 1: Banana

--- Different Generic Types ---

Integer list: [10, 20, 30]
Double list: [19.99, 29.99, 39.99]
Boolean list: [true, false, true]

--- Type Safety Benefits ---

Processing words (all guaranteed to be Strings):
  Java - Length: 4
  Python - Length: 6
  JavaScript - Length: 10

Scores: [85, 92, 78, 95]
Total: 350
Average: 87

===================================
```

**💡 Key Concepts:**

| Without Generics | With Generics | Benefit |
|-----------------|---------------|---------|
| `ArrayList list` | `ArrayList<String> list` | Type specified |
| `(String) list.get(0)` | `list.get(0)` | No casting |
| Runtime errors | Compile-time errors | Catch bugs early |
| Mixed types allowed | Only one type | Type safety |

**Generic Syntax:**
```java
// Declaration
ArrayList<Type> name = new ArrayList<>();
          ↑                           ↑
    Type Parameter              Diamond Operator
                              (empty, inferred from left)

// Examples:
ArrayList<String> names = new ArrayList<>();
ArrayList<Integer> numbers = new ArrayList<>();
ArrayList<Double> prices = new ArrayList<>();
```

**✅ Success Criteria:**
- Understand generics provide type safety
- Know how to declare generic collections
- Recognize the diamond operator `<>`
- Understand compile-time vs runtime errors
- Can use generics with different types

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| `ArrayList<int>` | Can't use primitives | `ArrayList<Integer>` |
| `new ArrayList<String>` without `<>` | Works but not recommended | `new ArrayList<>()` with diamond |
| Mixing raw and generic types | Loses type safety | Always use generics |

**🎯 Challenge:**
1. Create a `HashMap<String, Integer>` to store student grades
2. Add 5 students with scores
3. Calculate and print the average score
4. Find the student with the highest score

---

#### Exercise 2: Generic Classes - Box<T> Example (25 minutes)

**What you'll learn:** Creating your own generic classes with type parameters

**Create class: `GenericBox`**

**Concept:** **Generic Classes** use type parameters (usually `T`) to work with any type. The type is specified when you create an instance.

```
Generic Class Definition:
  class Box<T> {        // T is placeholder for any type
      private T item;   // T can be String, Integer, etc.
  }

Usage:
  Box<String> box1 = new Box<>();   // T becomes String
  Box<Integer> box2 = new Box<>();  // T becomes Integer
  Box<Apple> box3 = new Box<>();    // T becomes Apple
```

**Step-by-Step:**

```java
// Generic class with type parameter T
class Box<T> {
    private T item;  // T can be any type

    // Constructor
    public Box(T item) {
        this.item = item;
    }

    // Getter
    public T getItem() {
        return item;
    }

    // Setter
    public void setItem(T item) {
        this.item = item;
    }

    // Display
    public void displayInfo() {
        if (item != null) {
            System.out.println("Box contains: " + item);
            System.out.println("Type: " + item.getClass().getSimpleName());
        } else {
            System.out.println("Box is empty");
        }
    }
}

// Generic class with multiple type parameters
class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() {
        return key;
    }

    public V getValue() {
        return value;
    }

    public void display() {
        System.out.println("Key: " + key + ", Value: " + value);
    }
}

// Generic class for storing any type of product
class Container<T> {
    private T[] items;
    private int size;

    @SuppressWarnings("unchecked")
    public Container(int capacity) {
        items = (T[]) new Object[capacity];  // Generic array creation
        size = 0;
    }

    public void add(T item) {
        if (size < items.length) {
            items[size++] = item;
            System.out.println("Added: " + item);
        } else {
            System.out.println("Container is full!");
        }
    }

    public T get(int index) {
        if (index >= 0 && index < size) {
            return items[index];
        }
        return null;
    }

    public int getSize() {
        return size;
    }

    public void displayAll() {
        System.out.println("Container contents (" + size + " items):");
        for (int i = 0; i < size; i++) {
            System.out.println("  [" + i + "] " + items[i]);
        }
    }
}

public class GenericBox {
    public static void main(String[] args) {
        System.out.println("===== GENERIC CLASSES =====\n");

        // ===== SINGLE TYPE PARAMETER =====
        System.out.println("--- Box<T> - Single Type Parameter ---\n");

        // Box for String
        Box<String> stringBox = new Box<>("Hello Generics!");
        System.out.println("String Box:");
        stringBox.displayInfo();
        System.out.println();

        // Box for Integer
        Box<Integer> intBox = new Box<>(12345);
        System.out.println("Integer Box:");
        intBox.displayInfo();
        System.out.println();

        // Box for Double
        Box<Double> doubleBox = new Box<>(99.99);
        System.out.println("Double Box:");
        doubleBox.displayInfo();
        System.out.println();

        // Changing content
        System.out.println("Changing Integer Box content:");
        System.out.println("Before: " + intBox.getItem());
        intBox.setItem(99999);
        System.out.println("After: " + intBox.getItem());
        System.out.println();

        // ===== MULTIPLE TYPE PARAMETERS =====
        System.out.println("--- Pair<K,V> - Multiple Type Parameters ---\n");

        // Different type combinations
        Pair<String, Integer> studentScore = new Pair<>("Alice", 95);
        Pair<Integer, String> idName = new Pair<>(101, "Bob");
        Pair<String, Double> productPrice = new Pair<>("Laptop", 999.99);

        System.out.println("Student Score:");
        studentScore.display();

        System.out.println("\nID to Name:");
        idName.display();

        System.out.println("\nProduct Price:");
        productPrice.display();
        System.out.println();

        // ===== GENERIC CONTAINER =====
        System.out.println("--- Container<T> - Generic Storage ---\n");

        // Container of Strings
        System.out.println("String Container:");
        Container<String> fruits = new Container<>(5);
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.displayAll();
        System.out.println();

        // Container of Integers
        System.out.println("Integer Container:");
        Container<Integer> numbers = new Container<>(4);
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.displayAll();
        System.out.println();

        // Accessing items
        System.out.println("Accessing items:");
        System.out.println("First fruit: " + fruits.get(0));
        System.out.println("Second number: " + numbers.get(1));
        System.out.println();

        // ===== TYPE SAFETY DEMONSTRATION =====
        System.out.println("--- Type Safety in Action ---\n");

        Box<String> nameBox = new Box<>("John");
        // nameBox.setItem(123);  // Compile error! Must be String

        Container<Double> prices = new Container<>(3);
        prices.add(19.99);
        prices.add(29.99);
        // prices.add("39.99");  // Compile error! Must be Double

        System.out.println("Type safety ensures:");
        System.out.println("  ✓ Only correct types can be added");
        System.out.println("  ✓ No casting needed when retrieving");
        System.out.println("  ✓ Errors caught at compile-time");

        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== GENERIC CLASSES =====

--- Box<T> - Single Type Parameter ---

String Box:
Box contains: Hello Generics!
Type: String

Integer Box:
Box contains: 12345
Type: Integer

Double Box:
Box contains: 99.99
Type: Double

Changing Integer Box content:
Before: 12345
After: 99999

--- Pair<K,V> - Multiple Type Parameters ---

Student Score:
Key: Alice, Value: 95

ID to Name:
Key: 101, Value: Bob

Product Price:
Key: Laptop, Value: 999.99

--- Container<T> - Generic Storage ---

String Container:
Added: Apple
Added: Banana
Added: Cherry
Container contents (3 items):
  [0] Apple
  [1] Banana
  [2] Cherry

Integer Container:
Added: 10
Added: 20
Added: 30
Container contents (3 items):
  [0] 10
  [1] 20
  [2] 30

Accessing items:
First fruit: Apple
Second number: 20

--- Type Safety in Action ---

Type safety ensures:
  ✓ Only correct types can be added
  ✓ No casting needed when retrieving
  ✓ Errors caught at compile-time

================================
```

**💡 Key Concepts:**

| Component | Syntax | Example | Purpose |
|-----------|--------|---------|---------|
| Type Parameter | `<T>` | `class Box<T>` | Placeholder for type |
| Multiple Types | `<K,V>` | `class Pair<K,V>` | Two type parameters |
| Instance Creation | `<Type>` | `new Box<String>()` | Specify actual type |
| Diamond Operator | `<>` | `new Box<>()` | Type inferred |

**Generic Class Structure:**
```java
class ClassName<T> {           // T is type parameter
    private T field;            // Use T for fields

    public ClassName(T param) { // Use T in constructor
        this.field = param;
    }

    public T getField() {       // Use T as return type
        return field;
    }

    public void setField(T param) {  // Use T as parameter type
        this.field = param;
    }
}
```

**Common Type Parameter Names:**
- `T` - Type (most common)
- `E` - Element (collections)
- `K` - Key (maps)
- `V` - Value (maps)
- `N` - Number

**✅ Success Criteria:**
- Can create generic classes with `<T>`
- Understand type parameters are placeholders
- Know how to use type parameters in fields, methods
- Can create instances with specific types
- Understand benefits of reusable code

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| `new T()` | Can't instantiate type parameter | Use factory method or pass instance |
| `T[] arr = new T[10]` | Can't create generic arrays directly | `(T[]) new Object[10]` |
| Using primitives | `Box<int>` won't work | Use wrapper: `Box<Integer>` |

**🎯 Challenge:**
1. Create `Stack<T>` with push(), pop(), peek()
2. Create `Queue<T>` with enqueue(), dequeue()
3. Test both with different types (String, Integer)
4. Add isEmpty() and isFull() methods

---

#### Exercise 3: Generic Methods (30 minutes)

**What you'll learn:** Creating methods that work with any type using type parameters

**Create class: `GenericMethods`**

**Concept:** **Generic Methods** have their own type parameters, independent of the class. The type is specified when you call the method.

```
Generic Method Definition:
  public <T> void printArray(T[] array) {
         ↑
    Type parameter for THIS method only

Usage:
  printArray(stringArray);   // T becomes String
  printArray(intArray);      // T becomes Integer
  printArray(doubleArray);   // T becomes Double
```

**Step-by-Step:**

```java
import java.util.ArrayList;

public class GenericMethods {

    // ===== GENERIC METHOD #1: Print Array =====
    // <T> means this method works with any type
    public static <T> void printArray(T[] array) {
        System.out.print("[");
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i]);
            if (i < array.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }

    // ===== GENERIC METHOD #2: Get First Element =====
    public static <T> T getFirst(T[] array) {
        if (array != null && array.length > 0) {
            return array[0];
        }
        return null;
    }

    // ===== GENERIC METHOD #3: Get Last Element =====
    public static <T> T getLast(T[] array) {
        if (array != null && array.length > 0) {
            return array[array.length - 1];
        }
        return null;
    }

    // ===== GENERIC METHOD #4: Check if Contains =====
    public static <T> boolean contains(T[] array, T element) {
        for (T item : array) {
            if (item.equals(element)) {
                return true;
            }
        }
        return false;
    }

    // ===== GENERIC METHOD #5: Swap Elements =====
    public static <T> void swap(T[] array, int i, int j) {
        if (i >= 0 && i < array.length && j >= 0 && j < array.length) {
            T temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // ===== GENERIC METHOD #6: Reverse Array =====
    public static <T> void reverse(T[] array) {
        int left = 0;
        int right = array.length - 1;

        while (left < right) {
            swap(array, left, right);
            left++;
            right--;
        }
    }

    // ===== GENERIC METHOD #7: Count Occurrences =====
    public static <T> int countOccurrences(T[] array, T element) {
        int count = 0;
        for (T item : array) {
            if (item.equals(element)) {
                count++;
            }
        }
        return count;
    }

    // ===== GENERIC METHOD #8: Find Index =====
    public static <T> int indexOf(T[] array, T element) {
        for (int i = 0; i < array.length; i++) {
            if (array[i].equals(element)) {
                return i;
            }
        }
        return -1;  // Not found
    }

    // ===== GENERIC METHOD #9: Compare Two Items =====
    public static <T> boolean areEqual(T item1, T item2) {
        return item1.equals(item2);
    }

    // ===== GENERIC METHOD #10: Print with Type Info =====
    public static <T> void printWithType(T item) {
        System.out.println("Value: " + item);
        System.out.println("Type: " + item.getClass().getSimpleName());
    }

    public static void main(String[] args) {
        System.out.println("===== GENERIC METHODS =====\n");

        // ===== TEST WITH STRING ARRAY =====
        System.out.println("--- String Array Operations ---\n");

        String[] fruits = {"Apple", "Banana", "Cherry", "Date", "Apple"};

        System.out.print("Array: ");
        printArray(fruits);

        System.out.println("First: " + getFirst(fruits));
        System.out.println("Last: " + getLast(fruits));
        System.out.println("Contains 'Cherry': " + contains(fruits, "Cherry"));
        System.out.println("Contains 'Grape': " + contains(fruits, "Grape"));
        System.out.println("'Apple' appears: " + countOccurrences(fruits, "Apple") + " times");
        System.out.println("Index of 'Date': " + indexOf(fruits, "Date"));
        System.out.println();

        // ===== TEST WITH INTEGER ARRAY =====
        System.out.println("--- Integer Array Operations ---\n");

        Integer[] numbers = {10, 20, 30, 40, 50, 20, 20};

        System.out.print("Array: ");
        printArray(numbers);

        System.out.println("First: " + getFirst(numbers));
        System.out.println("Last: " + getLast(numbers));
        System.out.println("Contains 30: " + contains(numbers, 30));
        System.out.println("Contains 100: " + contains(numbers, 100));
        System.out.println("20 appears: " + countOccurrences(numbers, 20) + " times");
        System.out.println("Index of 40: " + indexOf(numbers, 40));
        System.out.println();

        // ===== TEST WITH DOUBLE ARRAY =====
        System.out.println("--- Double Array Operations ---\n");

        Double[] prices = {19.99, 29.99, 39.99, 49.99};

        System.out.print("Array: ");
        printArray(prices);

        System.out.println("First price: $" + getFirst(prices));
        System.out.println("Last price: $" + getLast(prices));
        System.out.println();

        // ===== SWAP AND REVERSE =====
        System.out.println("--- Swap and Reverse ---\n");

        String[] colors = {"Red", "Green", "Blue", "Yellow"};

        System.out.print("Original: ");
        printArray(colors);

        swap(colors, 0, 3);
        System.out.print("After swap(0,3): ");
        printArray(colors);

        reverse(colors);
        System.out.print("After reverse: ");
        printArray(colors);
        System.out.println();

        // ===== COMPARISON =====
        System.out.println("--- Comparison ---\n");

        System.out.println("Comparing Strings:");
        System.out.println("  'Hello' == 'Hello': " + areEqual("Hello", "Hello"));
        System.out.println("  'Hello' == 'World': " + areEqual("Hello", "World"));

        System.out.println("\nComparing Integers:");
        System.out.println("  100 == 100: " + areEqual(100, 100));
        System.out.println("  100 == 200: " + areEqual(100, 200));
        System.out.println();

        // ===== TYPE INFORMATION =====
        System.out.println("--- Type Information ---\n");

        System.out.println("String:");
        printWithType("Hello");

        System.out.println("\nInteger:");
        printWithType(42);

        System.out.println("\nDouble:");
        printWithType(3.14159);

        System.out.println("\nBoolean:");
        printWithType(true);

        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== GENERIC METHODS =====

--- String Array Operations ---

Array: [Apple, Banana, Cherry, Date, Apple]
First: Apple
Last: Apple
Contains 'Cherry': true
Contains 'Grape': false
'Apple' appears: 2 times
Index of 'Date': 3

--- Integer Array Operations ---

Array: [10, 20, 30, 40, 50, 20, 20]
First: 10
Last: 20
Contains 30: true
Contains 100: false
20 appears: 3 times
Index of 40: 3

--- Double Array Operations ---

Array: [19.99, 29.99, 39.99, 49.99]
First price: $19.99
Last price: $49.99

--- Swap and Reverse ---

Original: [Red, Green, Blue, Yellow]
After swap(0,3): [Yellow, Green, Blue, Red]
After reverse: [Red, Blue, Green, Yellow]

--- Comparison ---

Comparing Strings:
  'Hello' == 'Hello': true
  'Hello' == 'World': false

Comparing Integers:
  100 == 100: true
  100 == 200: false

--- Type Information ---

String:
Value: Hello
Type: String

Integer:
Value: 42
Type: Integer

Double:
Value: 3.14159
Type: Double

Boolean:
Value: true
Type: Boolean

================================
```

**💡 Key Concepts:**

| Aspect | Generic Class | Generic Method |
|--------|---------------|----------------|
| Type parameter scope | Entire class | Just the method |
| Declaration | `class Name<T>` | `<T> returnType methodName()` |
| When type determined | Object creation | Method call |
| Example | `Box<String> box = new Box<>()` | `printArray(stringArray)` |

**Generic Method Syntax:**
```java
public <T> ReturnType methodName(T parameter) {
       ↑       ↑            ↑          ↑
   Type     Return      Method     Parameter
Parameter    Type        Name       using T

// Examples:
public <T> void print(T item)              // void return
public <T> T getFirst(T[] array)           // T return
public <T> boolean contains(T[] arr, T el) // boolean return
```

**✅ Success Criteria:**
- Understand generic methods have their own type parameters
- Know syntax: `<T>` before return type
- Can write methods that work with any type
- Understand type is inferred from arguments
- Can combine multiple generic parameters

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Missing `<T>` before return type | Not a generic method | `public <T> void method(T item)` |
| Using T without declaring it | T is undefined | Declare `<T>` first |
| Forgetting type parameter | Won't work generically | Always include `<T>` |

**🎯 Challenge:**
1. Create `findMax(T[] array)` that returns largest element (needs Comparable)
2. Create `findMin(T[] array)` for smallest element
3. Create `removeDuplicates(T[] array)` returning unique elements
4. Create `merge(T[] arr1, T[] arr2)` combining two arrays

---

#### Exercise 4: Bounded Type Parameters - <T extends Number> (25 minutes)

**What you'll learn:** Restricting generic types to specific families

**Create class: `BoundedGenerics`**

**Concept:** **Bounded Type Parameters** restrict what types can be used with generics. Use `extends` to limit to a class and its subclasses.

```
Unbounded: Works with ANY type
  <T>                    // T can be anything

Bounded: Works with SPECIFIC types only
  <T extends Number>     // T must be Number or its subclass
                         // (Integer, Double, Float, etc.)

  <T extends Comparable<T>>  // T must implement Comparable
```

**Why Bounded Types?**
- **Access specific methods**: Call Number methods (doubleValue, etc.)
- **Type safety with guarantees**: Know T has certain capabilities
- **Mathematical operations**: Ensure numeric types only

**Step-by-Step:**

```java
// Generic class with bounded type - only Numbers allowed
class NumberBox<T extends Number> {
    private T value;

    public NumberBox(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    // Can call Number methods because T extends Number
    public double getAsDouble() {
        return value.doubleValue();
    }

    public int getAsInt() {
        return value.intValue();
    }

    public void displayInfo() {
        System.out.println("Value: " + value);
        System.out.println("As double: " + getAsDouble());
        System.out.println("As int: " + getAsInt());
    }
}

// Calculator with bounded type parameter
class Calculator<T extends Number> {

    // Add two numbers
    public double add(T num1, T num2) {
        return num1.doubleValue() + num2.doubleValue();
    }

    // Subtract
    public double subtract(T num1, T num2) {
        return num1.doubleValue() - num2.doubleValue();
    }

    // Multiply
    public double multiply(T num1, T num2) {
        return num1.doubleValue() * num2.doubleValue();
    }

    // Divide
    public double divide(T num1, T num2) {
        if (num2.doubleValue() == 0) {
            System.out.println("Cannot divide by zero!");
            return 0;
        }
        return num1.doubleValue() / num2.doubleValue();
    }
}

// Comparable bounded type - for sorting/comparing
class MinMaxFinder<T extends Comparable<T>> {

    public T findMin(T[] array) {
        if (array == null || array.length == 0) {
            return null;
        }

        T min = array[0];
        for (T item : array) {
            if (item.compareTo(min) < 0) {
                min = item;
            }
        }
        return min;
    }

    public T findMax(T[] array) {
        if (array == null || array.length == 0) {
            return null;
        }

        T max = array[0];
        for (T item : array) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }

    public void displayRange(T[] array) {
        System.out.println("Array: " + java.util.Arrays.toString(array));
        System.out.println("Min: " + findMin(array));
        System.out.println("Max: " + findMax(array));
    }
}

public class BoundedGenerics {

    // ===== BOUNDED GENERIC METHODS =====

    // Only works with Numbers
    public static <T extends Number> double sum(T[] numbers) {
        double total = 0;
        for (T num : numbers) {
            total += num.doubleValue();  // Can call doubleValue()!
        }
        return total;
    }

    // Only works with Numbers
    public static <T extends Number> double average(T[] numbers) {
        if (numbers.length == 0) return 0;
        return sum(numbers) / numbers.length;
    }

    // Only works with Comparable types
    public static <T extends Comparable<T>> T max(T a, T b) {
        return (a.compareTo(b) > 0) ? a : b;
    }

    // Only works with Comparable types
    public static <T extends Comparable<T>> T min(T a, T b) {
        return (a.compareTo(b) < 0) ? a : b;
    }

    // Multiple bounds: T must be Number AND Comparable
    public static <T extends Number & Comparable<T>> void printNumberInfo(T num) {
        System.out.println("Number: " + num);
        System.out.println("  As double: " + num.doubleValue());
        System.out.println("  As int: " + num.intValue());
        System.out.println("  Type: " + num.getClass().getSimpleName());
    }

    public static void main(String[] args) {
        System.out.println("===== BOUNDED TYPE PARAMETERS =====\n");

        // ===== NUMBER BOX =====
        System.out.println("--- NumberBox<T extends Number> ---\n");

        NumberBox<Integer> intBox = new NumberBox<>(100);
        System.out.println("Integer Box:");
        intBox.displayInfo();
        System.out.println();

        NumberBox<Double> doubleBox = new NumberBox<>(3.14159);
        System.out.println("Double Box:");
        doubleBox.displayInfo();
        System.out.println();

        // NumberBox<String> strBox = new NumberBox<>("Hello");
        // ☝️ Compile error! String is not a Number

        // ===== CALCULATOR =====
        System.out.println("--- Calculator<T extends Number> ---\n");

        Calculator<Integer> intCalc = new Calculator<>();
        System.out.println("Integer Calculator:");
        System.out.println("  10 + 20 = " + intCalc.add(10, 20));
        System.out.println("  50 - 15 = " + intCalc.subtract(50, 15));
        System.out.println("  6 × 7 = " + intCalc.multiply(6, 7));
        System.out.println("  100 ÷ 4 = " + intCalc.divide(100, 4));
        System.out.println();

        Calculator<Double> doubleCalc = new Calculator<>();
        System.out.println("Double Calculator:");
        System.out.println("  3.5 + 2.5 = " + doubleCalc.add(3.5, 2.5));
        System.out.println("  10.0 - 3.5 = " + doubleCalc.subtract(10.0, 3.5));
        System.out.println("  2.5 × 4.0 = " + doubleCalc.multiply(2.5, 4.0));
        System.out.println("  9.0 ÷ 2.0 = " + doubleCalc.divide(9.0, 2.0));
        System.out.println();

        // ===== BOUNDED METHODS WITH NUMBERS =====
        System.out.println("--- Bounded Generic Methods ---\n");

        Integer[] intArray = {10, 20, 30, 40, 50};
        System.out.println("Integer array: " + java.util.Arrays.toString(intArray));
        System.out.println("Sum: " + sum(intArray));
        System.out.println("Average: " + average(intArray));
        System.out.println();

        Double[] doubleArray = {1.5, 2.5, 3.5, 4.5};
        System.out.println("Double array: " + java.util.Arrays.toString(doubleArray));
        System.out.println("Sum: " + sum(doubleArray));
        System.out.println("Average: " + average(doubleArray));
        System.out.println();

        // ===== MIN/MAX FINDER =====
        System.out.println("--- MinMaxFinder<T extends Comparable<T>> ---\n");

        MinMaxFinder<Integer> intFinder = new MinMaxFinder<>();
        Integer[] numbers = {45, 12, 78, 23, 67, 89, 34};
        System.out.println("Integer Range:");
        intFinder.displayRange(numbers);
        System.out.println();

        MinMaxFinder<String> stringFinder = new MinMaxFinder<>();
        String[] words = {"Zebra", "Apple", "Mango", "Banana", "Cherry"};
        System.out.println("String Range:");
        stringFinder.displayRange(words);
        System.out.println();

        MinMaxFinder<Double> doubleFinder = new MinMaxFinder<>();
        Double[] prices = {19.99, 45.50, 12.75, 67.80, 23.25};
        System.out.println("Double Range:");
        doubleFinder.displayRange(prices);
        System.out.println();

        // ===== COMPARABLE METHODS =====
        System.out.println("--- Comparable Methods ---\n");

        System.out.println("Max of 100 and 200: " + max(100, 200));
        System.out.println("Min of 100 and 200: " + min(100, 200));
        System.out.println();

        System.out.println("Max of 'Apple' and 'Banana': " + max("Apple", "Banana"));
        System.out.println("Min of 'Apple' and 'Banana': " + min("Apple", "Banana"));
        System.out.println();

        // ===== MULTIPLE BOUNDS =====
        System.out.println("--- Multiple Bounds ---\n");

        System.out.println("Integer 42:");
        printNumberInfo(42);
        System.out.println();

        System.out.println("Double 3.14:");
        printNumberInfo(3.14);

        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== BOUNDED TYPE PARAMETERS =====

--- NumberBox<T extends Number> ---

Integer Box:
Value: 100
As double: 100.0
As int: 100

Double Box:
Value: 3.14159
As double: 3.14159
As int: 3

--- Calculator<T extends Number> ---

Integer Calculator:
  10 + 20 = 30.0
  50 - 15 = 35.0
  6 × 7 = 42.0
  100 ÷ 4 = 25.0

Double Calculator:
  3.5 + 2.5 = 6.0
  10.0 - 3.5 = 6.5
  2.5 × 4.0 = 10.0
  9.0 ÷ 2.0 = 4.5

--- Bounded Generic Methods ---

Integer array: [10, 20, 30, 40, 50]
Sum: 150.0
Average: 30.0

Double array: [1.5, 2.5, 3.5, 4.5]
Sum: 12.0
Average: 3.0

--- MinMaxFinder<T extends Comparable<T>> ---

Integer Range:
Array: [45, 12, 78, 23, 67, 89, 34]
Min: 12
Max: 89

String Range:
Array: [Zebra, Apple, Mango, Banana, Cherry]
Min: Apple
Max: Zebra

Double Range:
Array: [19.99, 45.5, 12.75, 67.8, 23.25]
Min: 12.75
Max: 67.8

--- Comparable Methods ---

Max of 100 and 200: 200
Min of 100 and 200: 100

Max of 'Apple' and 'Banana': Banana
Min of 'Apple' and 'Banana': Apple

--- Multiple Bounds ---

Integer 42:
Number: 42
  As double: 42.0
  As int: 42
  Type: Integer

Double 3.14:
Number: 3.14
  As double: 3.14
  As int: 3
  Type: Double

================================
```

**💡 Key Concepts:**

| Bound Type | Syntax | Allowed Types | Example |
|------------|--------|---------------|---------|
| Unbounded | `<T>` | Any type | `Box<T>` |
| Upper bound | `<T extends Class>` | Class and subclasses | `<T extends Number>` |
| Multiple bounds | `<T extends Class & Interface>` | Must satisfy both | `<T extends Number & Comparable<T>>` |
| Comparable | `<T extends Comparable<T>>` | Types that can compare | String, Integer, etc. |

**Benefits of Bounded Types:**
```java
// With bound:
class NumberBox<T extends Number> {
    public double getAsDouble() {
        return value.doubleValue();  // ✓ Number has this method
    }
}

// Without bound:
class Box<T> {
    public double getAsDouble() {
        return value.doubleValue();  // ✗ T might not have this
    }
}
```

**✅ Success Criteria:**
- Understand bounded types restrict allowed types
- Know `extends` works for both classes and interfaces
- Can use methods from the bound type
- Understand multiple bounds with `&`
- Know when to use Comparable bound

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| `<T super Number>` | No `super` for type parameters | Use `extends` only |
| `<T extends Number, Comparable>` | Wrong syntax | `<T extends Number & Comparable<T>>` |
| Forgetting wrapper types | `<T extends int>` | `<T extends Integer>` |

**🎯 Challenge:**
1. Create `Statistics<T extends Number>` with mean(), median(), mode()
2. Create `Sorter<T extends Comparable<T>>` with bubbleSort(), quickSort()
3. Test with Integer, Double, and String
4. Add standardDeviation() to Statistics

---

#### Exercise 5: Wildcards - ?, extends, super (30 minutes)

**What you'll learn:** Using wildcards for flexible method parameters

**Create class: `WildcardDemo`**

**Concept:** **Wildcards** (`?`) represent an unknown type. Use them in method parameters for maximum flexibility.

```
Three Types of Wildcards:

1. Unbounded: <?>
   - Accepts any type
   - Can only read as Object
   - Example: List<?>

2. Upper Bounded: <? extends Type>
   - Accepts Type and its subclasses
   - Can read as Type
   - Cannot add (except null)
   - Example: List<? extends Number>

3. Lower Bounded: <? super Type>
   - Accepts Type and its superclasses
   - Can add Type objects
   - Can only read as Object
   - Example: List<? super Integer>
```

**PECS Rule: Producer Extends, Consumer Super**
- **Producer (reading)**: Use `<? extends T>`
- **Consumer (writing)**: Use `<? super T>`

**Step-by-Step:**

```java
import java.util.ArrayList;
import java.util.List;

public class WildcardDemo {

    // ===== UNBOUNDED WILDCARD <?> =====
    // Accepts any type, but can only read as Object
    public static void printList(List<?> list) {
        System.out.print("[");
        for (Object item : list) {  // Must use Object
            System.out.print(item + " ");
        }
        System.out.println("]");
    }

    public static int getSize(List<?> list) {
        return list.size();  // Can call List methods
    }

    // ===== UPPER BOUNDED WILDCARD <? extends Number> =====
    // Accepts Number and all subclasses (Integer, Double, etc.)
    // Can READ as Number, but cannot ADD
    public static double sumNumbers(List<? extends Number> numbers) {
        double sum = 0;
        for (Number num : numbers) {  // Can read as Number
            sum += num.doubleValue();
        }
        return sum;
    }

    public static void printNumbers(List<? extends Number> numbers) {
        System.out.print("Numbers: ");
        for (Number num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static Number getFirstNumber(List<? extends Number> numbers) {
        if (!numbers.isEmpty()) {
            return numbers.get(0);  // Return as Number
        }
        return null;
    }

    // ===== LOWER BOUNDED WILDCARD <? super Integer> =====
    // Accepts Integer and all superclasses (Number, Object)
    // Can ADD Integer, but can only READ as Object
    public static void addIntegers(List<? super Integer> list) {
        list.add(10);    // ✓ Can add Integer
        list.add(20);
        list.add(30);
        // list.add(3.14);  // ✗ Cannot add Double
    }

    public static void addNumbers(List<? super Integer> list, int start, int count) {
        for (int i = 0; i < count; i++) {
            list.add(start + i);  // Can add Integers
        }
    }

    // ===== COMPARISON METHODS =====

    // Using specific type - INFLEXIBLE
    public static void printStringListOnly(List<String> list) {
        // Only works with List<String>
        System.out.println("Strings: " + list);
    }

    // Using wildcard - FLEXIBLE
    public static void printAnyList(List<?> list) {
        // Works with List of any type
        System.out.println("List: " + list);
    }

    // Copy from source (producer) to destination (consumer)
    public static <T> void copy(List<? extends T> source, List<? super T> dest) {
        for (T item : source) {
            dest.add(item);  // Read from source, write to dest
        }
    }

    // Find maximum in list
    public static <T extends Comparable<T>> T findMax(List<? extends T> list) {
        if (list.isEmpty()) {
            return null;
        }

        T max = list.get(0);
        for (T item : list) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        System.out.println("===== WILDCARDS =====\n");

        // ===== UNBOUNDED WILDCARD <?> =====
        System.out.println("--- Unbounded Wildcard <?> ---\n");

        List<String> strings = new ArrayList<>();
        strings.add("Apple");
        strings.add("Banana");
        strings.add("Cherry");

        List<Integer> integers = new ArrayList<>();
        integers.add(10);
        integers.add(20);
        integers.add(30);

        List<Double> doubles = new ArrayList<>();
        doubles.add(1.1);
        doubles.add(2.2);
        doubles.add(3.3);

        System.out.println("Printing different lists with <?>");
        printList(strings);   // Works!
        printList(integers);  // Works!
        printList(doubles);   // Works!

        System.out.println("\nSizes:");
        System.out.println("Strings: " + getSize(strings));
        System.out.println("Integers: " + getSize(integers));
        System.out.println("Doubles: " + getSize(doubles));
        System.out.println();

        // ===== UPPER BOUNDED <? extends Number> =====
        System.out.println("--- Upper Bounded <? extends Number> ---\n");

        List<Integer> intList = new ArrayList<>();
        intList.add(10);
        intList.add(20);
        intList.add(30);

        List<Double> doubleList = new ArrayList<>();
        doubleList.add(1.5);
        doubleList.add(2.5);
        doubleList.add(3.5);

        System.out.println("Sum of integers: " + sumNumbers(intList));
        System.out.println("Sum of doubles: " + sumNumbers(doubleList));
        System.out.println();

        printNumbers(intList);
        printNumbers(doubleList);
        System.out.println();

        System.out.println("First integer: " + getFirstNumber(intList));
        System.out.println("First double: " + getFirstNumber(doubleList));
        System.out.println();

        // Cannot add to upper bounded wildcard
        // sumNumbers method cannot do: numbers.add(100);
        // Why? List<? extends Number> could be List<Integer> or List<Double>
        // Java doesn't know which, so prevents adding

        // ===== LOWER BOUNDED <? super Integer> =====
        System.out.println("--- Lower Bounded <? super Integer> ---\n");

        List<Integer> integerList = new ArrayList<>();
        List<Number> numberList = new ArrayList<>();
        List<Object> objectList = new ArrayList<>();

        System.out.println("Adding integers to Integer list:");
        addIntegers(integerList);
        System.out.println(integerList);
        System.out.println();

        System.out.println("Adding integers to Number list:");
        addIntegers(numberList);
        System.out.println(numberList);
        System.out.println();

        System.out.println("Adding integers to Object list:");
        addIntegers(objectList);
        System.out.println(objectList);
        System.out.println();

        // ===== COMPARISON: SPECIFIC vs WILDCARD =====
        System.out.println("--- Specific Type vs Wildcard ---\n");

        List<String> stringList = new ArrayList<>();
        stringList.add("Hello");
        stringList.add("World");

        // Specific type - only works with exact match
        printStringListOnly(stringList);  // ✓ Works
        // printStringListOnly(integers);  // ✗ Compile error

        // Wildcard - works with any type
        printAnyList(stringList);  // ✓ Works
        printAnyList(integers);    // ✓ Works
        printAnyList(doubles);     // ✓ Works
        System.out.println();

        // ===== PECS: PRODUCER EXTENDS, CONSUMER SUPER =====
        System.out.println("--- PECS: Producer Extends, Consumer Super ---\n");

        List<Integer> source = new ArrayList<>();
        source.add(100);
        source.add(200);
        source.add(300);

        List<Number> destination = new ArrayList<>();

        System.out.println("Before copy:");
        System.out.println("Source: " + source);
        System.out.println("Destination: " + destination);

        copy(source, destination);  // Producer extends, Consumer super

        System.out.println("\nAfter copy:");
        System.out.println("Source: " + source);
        System.out.println("Destination: " + destination);
        System.out.println();

        // ===== FIND MAX WITH WILDCARDS =====
        System.out.println("--- Find Max with Wildcards ---\n");

        List<Integer> nums = new ArrayList<>();
        nums.add(45);
        nums.add(12);
        nums.add(89);
        nums.add(34);
        nums.add(67);

        List<String> words = new ArrayList<>();
        words.add("Zebra");
        words.add("Apple");
        words.add("Mango");
        words.add("Banana");

        System.out.println("Numbers: " + nums);
        System.out.println("Max: " + findMax(nums));
        System.out.println();

        System.out.println("Words: " + words);
        System.out.println("Max: " + findMax(words));

        System.out.println("\n================================");
    }
}
```

**Expected Output:**
```
===== WILDCARDS =====

--- Unbounded Wildcard <?> ---

Printing different lists with <?>
[Apple Banana Cherry ]
[10 20 30 ]
[1.1 2.2 3.3 ]

Sizes:
Strings: 3
Integers: 3
Doubles: 3

--- Upper Bounded <? extends Number> ---

Sum of integers: 60.0
Sum of doubles: 7.5

Numbers: 10 20 30
Numbers: 1.5 2.5 3.5

First integer: 10
First double: 1.5

--- Lower Bounded <? super Integer> ---

Adding integers to Integer list:
[10, 20, 30]

Adding integers to Number list:
[10, 20, 30]

Adding integers to Object list:
[10, 20, 30]

--- Specific Type vs Wildcard ---

Strings: [Hello, World]
List: [Hello, World]
List: [10, 20, 30]
List: [1.1, 2.2, 3.3]

--- PECS: Producer Extends, Consumer Super ---

Before copy:
Source: [100, 200, 300]
Destination: []

After copy:
Source: [100, 200, 300]
Destination: [100, 200, 300]

--- Find Max with Wildcards ---

Numbers: [45, 12, 89, 34, 67]
Max: 89

Words: [Zebra, Apple, Mango, Banana]
Max: Zebra

================================
```

**💡 Key Concepts:**

| Wildcard | Syntax | Use Case | Can Read | Can Write |
|----------|--------|----------|----------|-----------|
| Unbounded | `<?>` | Unknown type | As Object only | No (except null) |
| Upper Bounded | `<? extends T>` | Producer (read) | As T | No (except null) |
| Lower Bounded | `<? super T>` | Consumer (write) | As Object only | Yes, T objects |

**When to Use Each:**

```java
// Use <?>: When you don't care about type
void printSize(List<?> list) {
    System.out.println(list.size());
}

// Use <? extends T>: When READING (producing)
double sum(List<? extends Number> numbers) {
    // Read numbers, calculate sum
}

// Use <? super T>: When WRITING (consuming)
void addIntegers(List<? super Integer> list) {
    list.add(10);  // Add Integers
}
```

**PECS Mnemonic:**
- **Producer Extends**: If you're getting values OUT (producing), use `extends`
- **Consumer Super**: If you're putting values IN (consuming), use `super`

**✅ Success Criteria:**
- Understand three types of wildcards
- Know when to use each wildcard
- Understand PECS rule
- Know reading vs writing restrictions
- Can write flexible methods with wildcards

**❌ Common Mistakes:**

| Mistake | Why It's Wrong | Correct Way |
|---------|----------------|-------------|
| Adding to `<? extends T>` | Type might be subclass | Use `<? super T>` for adding |
| Reading as T from `<? super T>` | Type might be superclass | Can only read as Object |
| Using `<?>` when type matters | Too restrictive | Use bounded wildcard |

**🎯 Challenge:**
1. Create `addAll(List<? super T>, T[])` to add array to list
2. Create `max(List<? extends T>)` with Comparable bound
3. Create `reverse(List<?>)` to reverse any list
4. Test with Integer, String, and Double lists

---

#### Exercise 6: Real-World Application - Generic Data Store (30 minutes)

**What you'll learn:** Building a complete generic application combining all concepts

**Create classes: `DataStore<T>`, `Student`, `Product`, `GenericDataStoreApp`**

**Concept:** This real-world application demonstrates how generics solve actual problems. We'll build a generic data storage system that works with any type.

**Step-by-Step:**

```java
import java.util.ArrayList;
import java.util.List;

// ===== GENERIC DATA STORE =====
class DataStore<T> {
    private List<T> items;
    private String storeName;

    public DataStore(String storeName) {
        this.storeName = storeName;
        this.items = new ArrayList<>();
    }

    // Add item
    public void add(T item) {
        items.add(item);
        System.out.println("✓ Added: " + item);
    }

    // Remove item
    public boolean remove(T item) {
        boolean removed = items.remove(item);
        if (removed) {
            System.out.println("✓ Removed: " + item);
        } else {
            System.out.println("✗ Not found: " + item);
        }
        return removed;
    }

    // Get item by index
    public T get(int index) {
        if (index >= 0 && index < items.size()) {
            return items.get(index);
        }
        return null;
    }

    // Check if contains
    public boolean contains(T item) {
        return items.contains(item);
    }

    // Get all items
    public List<T> getAll() {
        return new ArrayList<>(items);  // Return copy
    }

    // Size
    public int size() {
        return items.size();
    }

    // Is empty
    public boolean isEmpty() {
        return items.isEmpty();
    }

    // Clear all
    public void clear() {
        items.clear();
        System.out.println("✓ Cleared all items from " + storeName);
    }

    // Display all
    public void displayAll() {
        System.out.println("\n╔══════════════════════════════════════╗");
        System.out.println("  " + storeName);
        System.out.println("╚══════════════════════════════════════╝");

        if (items.isEmpty()) {
            System.out.println("  (Empty)");
        } else {
            System.out.println("  Total items: " + items.size());
            System.out.println("  ──────────────────────────────────");
            for (int i = 0; i < items.size(); i++) {
                System.out.println("  [" + i + "] " + items.get(i));
            }
        }
        System.out.println();
    }

    // Filter items (using bounded wildcard)
    public List<T> filter(Predicate<T> predicate) {
        List<T> filtered = new ArrayList<>();
        for (T item : items) {
            if (predicate.test(item)) {
                filtered.add(item);
            }
        }
        return filtered;
    }
}

// Simple predicate interface for filtering
interface Predicate<T> {
    boolean test(T item);
}

// ===== STUDENT CLASS =====
class Student {
    private String name;
    private int id;
    private double gpa;

    public Student(String name, int id, double gpa) {
        this.name = name;
        this.id = id;
        this.gpa = gpa;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public double getGpa() {
        return gpa;
    }

    @Override
    public String toString() {
        return String.format("Student{id=%d, name='%s', GPA=%.2f}", id, name, gpa);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Student)) return false;
        Student other = (Student) obj;
        return this.id == other.id;
    }
}

// ===== PRODUCT CLASS =====
class Product {
    private String name;
    private double price;
    private int stock;

    public Product(String name, double price, int stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    public void updateStock(int quantity) {
        this.stock += quantity;
    }

    @Override
    public String toString() {
        return String.format("Product{name='%s', price=$%.2f, stock=%d}",
                           name, price, stock);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Product)) return false;
        Product other = (Product) obj;
        return this.name.equals(other.name);
    }
}

// ===== UTILITY METHODS =====
class DataStoreUtils {

    // Count items matching condition (upper bounded wildcard)
    public static <T> int countMatching(DataStore<? extends T> store,
                                        Predicate<T> predicate) {
        int count = 0;
        for (T item : store.getAll()) {
            if (predicate.test(item)) {
                count++;
            }
        }
        return count;
    }

    // Transfer items between stores
    public static <T> void transfer(DataStore<T> source,
                                   DataStore<T> destination,
                                   int count) {
        int transferred = 0;
        while (transferred < count && !source.isEmpty()) {
            T item = source.get(0);
            source.remove(item);
            destination.add(item);
            transferred++;
        }
        System.out.println("✓ Transferred " + transferred + " items");
    }
}

// ===== MAIN APPLICATION =====
public class GenericDataStoreApp {
    public static void main(String[] args) {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   GENERIC DATA STORE APPLICATION      ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        // ===== STUDENT DATA STORE =====
        System.out.println("═══ STUDENT MANAGEMENT ═══\n");

        DataStore<Student> studentStore = new DataStore<>("Student Database");

        // Add students
        studentStore.add(new Student("Alice Johnson", 101, 3.8));
        studentStore.add(new Student("Bob Smith", 102, 3.5));
        studentStore.add(new Student("Charlie Brown", 103, 3.9));
        studentStore.add(new Student("Diana Prince", 104, 4.0));
        studentStore.add(new Student("Eve Adams", 105, 3.2));

        // Display all
        studentStore.displayAll();

        // Filter high achievers (GPA >= 3.7)
        System.out.println("High Achievers (GPA >= 3.7):");
        List<Student> highAchievers = studentStore.filter(new Predicate<Student>() {
            public boolean test(Student s) {
                return s.getGpa() >= 3.7;
            }
        });
        for (Student s : highAchievers) {
            System.out.println("  " + s);
        }
        System.out.println();

        // Count students with GPA > 3.5
        int count = DataStoreUtils.countMatching(studentStore, new Predicate<Student>() {
            public boolean test(Student s) {
                return s.getGpa() > 3.5;
            }
        });
        System.out.println("Students with GPA > 3.5: " + count);
        System.out.println();

        // ===== PRODUCT DATA STORE =====
        System.out.println("═══ PRODUCT INVENTORY ═══\n");

        DataStore<Product> productStore = new DataStore<>("Product Inventory");

        // Add products
        productStore.add(new Product("Laptop", 999.99, 15));
        productStore.add(new Product("Mouse", 29.99, 50));
        productStore.add(new Product("Keyboard", 79.99, 30));
        productStore.add(new Product("Monitor", 299.99, 20));
        productStore.add(new Product("Headphones", 149.99, 25));

        // Display all
        productStore.displayAll();

        // Filter expensive products (price >= 100)
        System.out.println("Expensive Products (>= $100):");
        List<Product> expensiveProducts = productStore.filter(new Predicate<Product>() {
            public boolean test(Product p) {
                return p.getPrice() >= 100.0;
            }
        });
        for (Product p : expensiveProducts) {
            System.out.println("  " + p);
        }
        System.out.println();

        // Low stock products
        System.out.println("Low Stock Products (< 20):");
        List<Product> lowStock = productStore.filter(new Predicate<Product>() {
            public boolean test(Product p) {
                return p.getStock() < 20;
            }
        });
        for (Product p : lowStock) {
            System.out.println("  " + p);
        }
        System.out.println();

        // ===== STRING DATA STORE =====
        System.out.println("═══ TASK MANAGER ═══\n");

        DataStore<String> taskStore = new DataStore<>("Task List");

        // Add tasks
        taskStore.add("Complete Java assignment");
        taskStore.add("Study for exam");
        taskStore.add("Buy groceries");
        taskStore.add("Call mom");
        taskStore.add("Exercise for 30 minutes");

        // Display all
        taskStore.displayAll();

        // Remove completed task
        System.out.println("Completing task:");
        taskStore.remove("Buy groceries");
        System.out.println();

        // Display updated list
        System.out.println("Updated tasks:");
        for (String task : taskStore.getAll()) {
            System.out.println("  ☐ " + task);
        }
        System.out.println();

        // ===== STATISTICS =====
        System.out.println("═══ STATISTICS ═══\n");

        System.out.println("Students: " + studentStore.size());
        System.out.println("Products: " + productStore.size());
        System.out.println("Tasks: " + taskStore.size());
        System.out.println();

        // ===== TRANSFER DEMONSTRATION =====
        System.out.println("═══ TRANSFER ITEMS ═══\n");

        DataStore<String> archiveTasks = new DataStore<>("Archived Tasks");

        System.out.println("Transferring 2 tasks to archive:");
        DataStoreUtils.transfer(taskStore, archiveTasks, 2);
        System.out.println();

        System.out.println("After transfer:");
        taskStore.displayAll();
        archiveTasks.displayAll();

        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║          SESSION COMPLETE             ║");
        System.out.println("╚════════════════════════════════════════╝");
    }
}
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   GENERIC DATA STORE APPLICATION      ║
╚════════════════════════════════════════╝

═══ STUDENT MANAGEMENT ═══

✓ Added: Student{id=101, name='Alice Johnson', GPA=3.80}
✓ Added: Student{id=102, name='Bob Smith', GPA=3.50}
✓ Added: Student{id=103, name='Charlie Brown', GPA=3.90}
✓ Added: Student{id=104, name='Diana Prince', GPA=4.00}
✓ Added: Student{id=105, name='Eve Adams', GPA=3.20}

╔══════════════════════════════════════╗
  Student Database
╚══════════════════════════════════════╝
  Total items: 5
  ──────────────────────────────────
  [0] Student{id=101, name='Alice Johnson', GPA=3.80}
  [1] Student{id=102, name='Bob Smith', GPA=3.50}
  [2] Student{id=103, name='Charlie Brown', GPA=3.90}
  [3] Student{id=104, name='Diana Prince', GPA=4.00}
  [4] Student{id=105, name='Eve Adams', GPA=3.20}

High Achievers (GPA >= 3.7):
  Student{id=101, name='Alice Johnson', GPA=3.80}
  Student{id=103, name='Charlie Brown', GPA=3.90}
  Student{id=104, name='Diana Prince', GPA=4.00}

Students with GPA > 3.5: 3

═══ PRODUCT INVENTORY ═══

✓ Added: Product{name='Laptop', price=$999.99, stock=15}
✓ Added: Product{name='Mouse', price=$29.99, stock=50}
✓ Added: Product{name='Keyboard', price=$79.99, stock=30}
✓ Added: Product{name='Monitor', price=$299.99, stock=20}
✓ Added: Product{name='Headphones', price=$149.99, stock=25}

╔══════════════════════════════════════╗
  Product Inventory
╚══════════════════════════════════════╝
  Total items: 5
  ──────────────────────────────────
  [0] Product{name='Laptop', price=$999.99, stock=15}
  [1] Product{name='Mouse', price=$29.99, stock=50}
  [2] Product{name='Keyboard', price=$79.99, stock=30}
  [3] Product{name='Monitor', price=$299.99, stock=20}
  [4] Product{name='Headphones', price=$149.99, stock=25}

Expensive Products (>= $100):
  Product{name='Laptop', price=$999.99, stock=15}
  Product{name='Monitor', price=$299.99, stock=20}
  Product{name='Headphones', price=$149.99, stock=25}

Low Stock Products (< 20):
  Product{name='Laptop', price=$999.99, stock=15}

═══ TASK MANAGER ═══

✓ Added: Complete Java assignment
✓ Added: Study for exam
✓ Added: Buy groceries
✓ Added: Call mom
✓ Added: Exercise for 30 minutes

╔══════════════════════════════════════╗
  Task List
╚══════════════════════════════════════╝
  Total items: 5
  ──────────────────────────────────
  [0] Complete Java assignment
  [1] Study for exam
  [2] Buy groceries
  [3] Call mom
  [4] Exercise for 30 minutes

Completing task:
✓ Removed: Buy groceries

Updated tasks:
  ☐ Complete Java assignment
  ☐ Study for exam
  ☐ Call mom
  ☐ Exercise for 30 minutes

═══ STATISTICS ═══

Students: 5
Products: 5
Tasks: 4

═══ TRANSFER ITEMS ═══

Transferring 2 tasks to archive:
✓ Removed: Complete Java assignment
✓ Added: Complete Java assignment
✓ Removed: Study for exam
✓ Added: Study for exam
✓ Transferred 2 items

After transfer:

╔══════════════════════════════════════╗
  Task List
╚══════════════════════════════════════╝
  Total items: 2
  ──────────────────────────────────
  [0] Call mom
  [1] Exercise for 30 minutes


╔══════════════════════════════════════╗
  Archived Tasks
╚══════════════════════════════════════╝
  Total items: 2
  ──────────────────────────────────
  [0] Complete Java assignment
  [1] Study for exam

╔════════════════════════════════════════╗
║          SESSION COMPLETE             ║
╚════════════════════════════════════════╝
```

**💡 What This Demonstrates:**

| Concept | How It's Used | Benefit |
|---------|---------------|---------|
| Generic Class | `DataStore<T>` | Works with any type |
| Type Safety | Separate stores for each type | No mixing Students and Products |
| Bounded Wildcards | `countMatching(DataStore<? extends T>)` | Flexible utility methods |
| Reusability | Same code for Students, Products, Strings | Write once, use everywhere |
| Type Parameters | `transfer<T>` method | Type-safe transfers |

**Key Features:**
1. **Generic DataStore**: Single class handles any type
2. **Type Safety**: Can't accidentally mix types
3. **Filtering**: Predicate pattern for flexible queries
4. **Utilities**: Bounded wildcards for flexible operations
5. **Real-World**: Actual use cases (students, products, tasks)

**✅ Success Criteria:**
- Built complete generic application
- Used generic class with different types
- Implemented filtering with predicates
- Used bounded wildcards in utilities
- Demonstrated type safety benefits
- Created reusable, flexible code

**❌ Common Mistakes:**

| Mistake | Problem | Solution |
|---------|---------|----------|
| Mixing types | Adding Student to Product store | Type parameters prevent this |
| Raw types | Using DataStore without `<T>` | Always specify type |
| Unnecessary casting | Manual type conversion | Generics eliminate casting |

**🎯 Challenge:**
1. Add `sort(Comparator<T>)` method to DataStore
2. Create `findFirst(Predicate<T>)` method
3. Add `map(Function<T,R>)` to transform items
4. Create `merge(DataStore<T>, DataStore<T>)` utility
5. Add pagination with `getPage(int page, int size)`
6. Implement `search(String query)` for searchable items

---

**✅ Day 23 Complete!**

You've learned:
- ✅ Why generics are essential (type safety, no casting)
- ✅ Generic classes with type parameters (`<T>`)
- ✅ Generic methods independent of class type
- ✅ Bounded type parameters (`<T extends Number>`)
- ✅ Wildcards (?, extends, super) and PECS rule
- ✅ Real-world application combining all concepts

**Key Takeaways:**
```
1. Generics = Type Safety at Compile Time
   - Catch errors early
   - No casting needed
   - Better IDE support

2. Generic Classes
   - class Box<T>
   - Type specified at creation
   - Reusable with any type

3. Generic Methods
   - <T> before return type
   - Type inferred from arguments
   - Independent of class

4. Bounded Types
   - <T extends Type>
   - Access Type's methods
   - Restrict to specific families

5. Wildcards
   - <?> - unknown type
   - <? extends T> - producer (read)
   - <? super T> - consumer (write)
   - PECS: Producer Extends, Consumer Super
```

**🎯 Before moving to Day 24:**
- [ ] Understand why generics exist
- [ ] Can create generic classes
- [ ] Can write generic methods
- [ ] Know when to use bounded types
- [ ] Understand all three wildcards
- [ ] Can apply PECS rule
- [ ] Built complete generic application
- [ ] Comfortable with type parameters
